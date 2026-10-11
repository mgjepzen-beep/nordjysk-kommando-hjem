import { z } from "npm:zod@3.23.8";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MAX_BODY_BYTES = 16_000;

const text = (min: number, max: number) => z.string().trim().min(min).max(max);
const ageField = z.coerce.number().int().min(16).max(99);

export const baseFields = {
  name: text(2, 100).regex(/^[\p{L}\s'-]+$/u),
  discordUsername: text(2, 32).regex(/^[a-zA-Z0-9._]+$/),
  age: ageField,
  experience: text(10, 500),
  motivation: text(50, 1000),
  availability: text(10, 500),
};

export { z, text, ageField };

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function sha256(input: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function allowRequest(scope: string, req: Request): Promise<boolean> {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return true; // fail open only if platform env missing
  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const hashed = await sha256(`${scope}:${ip}`);
  const res = await fetch(`${url}/rest/v1/rpc/check_application_rate_limit`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ _key: hashed, _max: 3, _window_seconds: 600 }),
  });
  if (!res.ok) return true;
  return (await res.json()) === true;
}

/** Escape Discord mention/markdown abuse in user text. */
const clean = (v: string) => v.replace(/@(everyone|here)/gi, "@\u200b$1").slice(0, 1024);

export interface HandlerOptions<T extends z.ZodRawShape> {
  scope: string;
  webhookEnv: string;
  schema: z.ZodObject<T>;
  buildEmbed: (data: z.infer<z.ZodObject<T>>, c: typeof clean) => Record<string, unknown>;
  content?: string;
}

export function createApplicationHandler<T extends z.ZodRawShape>(opts: HandlerOptions<T>) {
  return async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
    if (req.method !== "POST") return json({ error: "Metode ikke tilladt" }, 405);

    try {
      const raw = await req.text();
      if (raw.length > MAX_BODY_BYTES) return json({ error: "Ansøgningen er for stor" }, 413);

      let body: unknown;
      try { body = JSON.parse(raw); } catch { return json({ error: "Ugyldig forespørgsel" }, 400); }

      const parsed = opts.schema.strict().safeParse(body);
      if (!parsed.success) {
        return json({ error: "Ugyldige felter", fields: Object.keys(parsed.error.flatten().fieldErrors) }, 400);
      }

      if (!(await allowRequest(opts.scope, req))) {
        return json({ error: "For mange forsøg. Prøv igen om lidt." }, 429);
      }

      const webhookUrl = Deno.env.get(opts.webhookEnv);
      if (!webhookUrl) {
        console.error(`[${opts.scope}] webhook not configured`);
        return json({ error: "Tjenesten er midlertidigt utilgængelig" }, 503);
      }

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: opts.content,
          allowed_mentions: { parse: [] },
          embeds: [{ ...opts.buildEmbed(parsed.data, clean), timestamp: new Date().toISOString() }],
        }),
      });
      if (!res.ok) {
        console.error(`[${opts.scope}] webhook failed with status ${res.status}`);
        return json({ error: "Ansøgningen kunne ikke sendes. Prøv igen senere." }, 502);
      }
      return json({ success: true }, 200);
    } catch (_e) {
      console.error(`[${opts.scope}] unexpected error`);
      return json({ error: "Der opstod en fejl. Prøv igen senere." }, 500);
    }
  };
}
