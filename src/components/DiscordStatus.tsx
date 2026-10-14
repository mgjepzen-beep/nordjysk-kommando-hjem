import { useEffect, useState } from "react";

export const DISCORD_INVITE = "yKjacqBcEt";
export const DISCORD_URL = `https://discord.gg/${DISCORD_INVITE}`;

type Counts = { online: number; members: number };

const DiscordStatus = () => {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    let active = true;
    const load = () =>
      fetch(`https://discord.com/api/v10/invites/${DISCORD_INVITE}?with_counts=true`)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (active && d && typeof d.approximate_presence_count === "number") {
            setCounts({ online: d.approximate_presence_count, members: d.approximate_member_count });
          }
        })
        .catch(() => {});
    load();
    const id = setInterval(load, 60_000);
    return () => { active = false; clearInterval(id); };
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
