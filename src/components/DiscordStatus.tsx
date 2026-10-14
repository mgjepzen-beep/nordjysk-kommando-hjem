import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const DISCORD_INVITE = "C5EQMTGJPT";
export const DISCORD_URL = `https://discord.gg/${DISCORD_INVITE}`;

type Counts = { online: number; members: number };

const isCounts = (v: unknown): v is Counts =>
  !!v &&
  typeof (v as Counts).online === "number" &&
  typeof (v as Counts).members === "number";

const DiscordStatus = () => {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    let active = true;

    const fromServer = async (): Promise<Counts | null> => {
      try {
        const { data, error } = await supabase.functions.invoke("discord-status", {
          method: "GET",
        });
        return !error && isCounts(data) ? data : null;
      } catch {
        return null;
      }
    };

    const fromDiscord = async (): Promise<Counts | null> => {
      try {
        const res = await fetch(
          `https://discord.com/api/v10/invites/${DISCORD_INVITE}?with_counts=true`,
        );
        if (!res.ok) return null;
        const d = await res.json();
        return typeof d?.approximate_presence_count === "number"
          ? { online: d.approximate_presence_count, members: d.approximate_member_count }
          : null;
      } catch {
        return null;
      }
    };

    const load = async () => {
      const next = (await fromServer()) ?? (await fromDiscord());
      if (active && next) setCounts(next);
    };

    load();
    const id = setInterval(load, 60_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  if (!counts) return null;

  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
      <span>
        <strong className="text-foreground">{counts.online}</strong> online på Discord lige nu
        {" · "}{counts.members} medlemmer
      </span>
    </p>
  );
};

export default DiscordStatus;
