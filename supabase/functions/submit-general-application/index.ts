import { createApplicationHandler, z, text, ageField } from "../_shared/application.ts";

const positionLabels = { police: "Politibetjent", fire: "Brandmand", ems: "Paramediciner" } as const;

const schema = z.object({
  fullName: text(2, 100),
  age: ageField,
  email: z.string().trim().email().max(255),
  discord: text(2, 37),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  position: z.enum(["police", "fire", "ems"]),
  experience: z.string().trim().max(1000).optional().or(z.literal("")),
  motivation: text(2, 1000),
  availability: z.string().trim().max(500).optional().or(z.literal("")),
});

Deno.serve(createApplicationHandler({
  scope: "general",
  webhookEnv: "DISCORD_WEBHOOK_URL",
  schema,
  content: "🆕 **Ny ansøgning modtaget!**",
  buildEmbed: (d, c) => ({
    title: "🔥 Ny Ansøgning - NORDJYSK FIVEPD",
    color: 0x3b82f6,
    fields: [
      { name: "📛 Navn", value: c(d.fullName), inline: true },
      { name: "🎂 Alder", value: String(d.age), inline: true },
      { name: "📧 Email", value: c(d.email), inline: true },
      { name: "💬 Discord", value: c(d.discord), inline: true },
      { name: "📱 Telefon", value: d.phone ? c(d.phone) : "Ikke angivet", inline: true },
      { name: "🚔 Ønsket Stilling", value: positionLabels[d.position], inline: true },
      { name: "💼 Erfaring", value: d.experience ? c(d.experience) : "Ingen erfaring angivet", inline: false },
      { name: "💡 Motivation", value: c(d.motivation), inline: false },
      { name: "🕒 Tilgængelighed", value: d.availability ? c(d.availability) : "Ikke angivet", inline: false },
    ],
    footer: { text: "NORDJYSK FIVEPD Rekruttering" },
  }),
}));
