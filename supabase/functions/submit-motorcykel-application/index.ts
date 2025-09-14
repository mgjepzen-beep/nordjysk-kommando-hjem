import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, discordUsername, age, experience, motivation, drivingExperience, availability } = await req.json()
    
    const webhookUrl = Deno.env.get('DISCORD_WEBHOOK_MOTORCYKEL')
    
    if (!webhookUrl) {
      throw new Error('Discord webhook URL not configured')
    }

    const embed = {
      title: "🏍️ Ny Motorcykel Betjent Ansøgning",
      color: 0x0099ff,
      fields: [
        { name: "👤 Navn", value: name, inline: true },
        { name: "💬 Discord", value: discordUsername, inline: true },
        { name: "🎂 Alder", value: age.toString(), inline: true },
        { name: "⭐ Erfaring", value: experience, inline: false },
        { name: "💭 Motivation", value: motivation, inline: false },
        { name: "🏍️ Køreerfaring", value: drivingExperience, inline: false },
        { name: "📅 Tilgængelighed", value: availability, inline: false }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "NORDJYSK FIVEPD - MIKE Ansøgning"
      }
    }

    const payload = {
      embeds: [embed]
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`)
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})