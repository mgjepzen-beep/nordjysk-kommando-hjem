import { createApplicationHandler, z, text, ageField } from "../_shared/application.ts";

const schema = z.object({
  name: text(2, 100),
  discordUsername: text(2, 37),
  age: ageField,
  experience: text(2, 1000),
  motivation: text(2, 1000),
  stressHandling: text(2, 1000),
  availability: text(2, 500),
});

Deno.serve(createApplicationHandler({
  scope: "reaktions",
  webhookEnv: "DISCORD_WEBHOOK_REAKTIONS",
  schema,
  buildEmbed: (d, c) => ({
    title: "⚡ Ny Reaktions Patruljen Ansøgning",
    color: 0xff0000,
    fields: [
      { name: "👤 Navn", value: c(d.name), inline: true },
      { name: "💬 Discord", value: c(d.discordUsername), inline: true },
      { name: "🎂 Alder", value: String(d.age), inline: true },
      { name: "⭐ Erfaring", value: c(d.experience), inline: false },
      { name: "💭 Motivation", value: c(d.motivation), inline: false },
      { name: "💪 Stress håndtering", value: c(d.stressHandling), inline: false },
      { name: "📅 Tilgængelighed", value: c(d.availability), inline: false },
    ],
    footer: { text: "NORDJYSK FIVEPD - ROMEO Ansøgning" },
  }),
}));
