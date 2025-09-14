import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Civil application function called')
    const { name, discordUsername, age, experience, motivation, discretion, availability } = await req.json()
    console.log('Request data:', { name, discordUsername, age })
    
    const webhookUrl = Deno.env.get('DISCORD_WEBHOOK_CIVIL')
    console.log('Webhook URL configured:', !!webhookUrl)
    
    if (!webhookUrl) {
      console.error('Discord webhook URL not configured')
      throw new Error('Discord webhook URL not configured')
    }

    const embed = {
      title: "🕵️ Ny Civil Patruljen Ansøgning",
      color: 0x666666,
      fields: [
        { name: "👤 Navn", value: name, inline: true },
        { name: "💬 Discord", value: discordUsername, inline: true },
        { name: "🎂 Alder", value: age.toString(), inline: true },
        { name: "⭐ Erfaring", value: experience, inline: false },
        { name: "💭 Motivation", value: motivation, inline: false },
        { name: "🤫 Diskret arbejde", value: discretion, inline: false },
        { name: "📅 Tilgængelighed", value: availability, inline: false }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "NORDJYSK FIVEPD - CHARLIE Ansøgning"
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
      console.error('Discord webhook failed:', response.status, await response.text())
      throw new Error(`Discord webhook failed: ${response.status}`)
    }

    console.log('Application submitted successfully')
    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in civil application function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})