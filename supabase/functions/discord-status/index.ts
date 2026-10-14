const INVITE_CODE = "C5EQMTGJPT";
const CACHE_MS = 30_000;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

let cache: { at: number; body: string } | null = null;

async function fetchCounts(): Promise<{ online: number; members: number } | null> {
  if (cache && Date.now() - cache.at < CACHE_MS) {
    return JSON.parse(cache.body);
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(
      `https://discord.com/api/v10/invites/${INVITE_CODE}?with_counts=true`,
      { signal: controller.signal, headers: { "User-Agent": "projekt-bla-blink-status" } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (typeof data?.approximate_presence_count !== "number") return null;
    const counts = { online: data.approximate_presence_count, members: data.approximate_member_count };
    cache = { at: Date.now(), body: JSON.stringify(counts) };
    return counts;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Metoden er ikke tilladt" }), {
      status: 405,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const counts = await fetchCounts();
  if (!counts) {
    // Return the last known good numbers if Discord is briefly unreachable.
    if (cache) {
      return new Response(cache.body, {
        status: 200,
        headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "no-store" },
      });
    }
    return new Response(JSON.stringify({ error: "Tal kunne ikke hentes" }), {
      status: 502,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(counts), {
    status: 200,
    headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
});
