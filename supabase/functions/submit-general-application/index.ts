import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, age, email, discord, phone, position, experience, motivation, availability } = await req.json();

    // Validate required fields
    if (!fullName || !age || !email || !discord || !position || !motivation) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get Discord webhook URL from environment
    const webhookUrl = Deno.env.get('DISCORD_WEBHOOK_URL');
    if (!webhookUrl) {
      console.error('Discord webhook URL not configured');
      return new Response(
        JSON.stringify({ error: 'Service configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Map position values to display labels
    const positionLabels: Record<string, string> = {
      'police': 'Politibetjent',
      'fire': 'Brandmand',
      'ems': 'Paramediciner'
    };

    // Create Discord embed
    const embed = {
      title: "🔥 Ny Ansøgning - NORDJYSK FIVEPD",
      color: 0x3b82f6,
      fields: [
        { name: "📛 Navn", value: fullName, inline: true },
        { name: "🎂 Alder", value: age.toString(), inline: true },
        { name: "📧 Email", value: email, inline: true },
        { name: "💬 Discord", value: discord, inline: true },
        { name: "📱 Telefon", value: phone || "Ikke angivet", inline: true },
        { name: "🚔 Ønsket Stilling", value: positionLabels[position] || position, inline: true },
        { name: "💼 Erfaring", value: experience || "Ingen erfaring angivet", inline: false },
        { name: "💡 Motivation", value: motivation, inline: false },
        { name: "🕒 Tilgængelighed", value: availability || "Ikke angivet", inline: false }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "NORDJYSK FIVEPD Rekruttering"
      }
    };

    // Send to Discord
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: "🆕 **Ny ansøgning modtaget!**",
        embeds: [embed]
      }),
    });

    if (!discordResponse.ok) {
      console.error('Failed to send to Discord:', await discordResponse.text());
      throw new Error('Failed to send to Discord');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing application:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
})