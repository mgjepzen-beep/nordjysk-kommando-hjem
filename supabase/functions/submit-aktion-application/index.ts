import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting map
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

// Input validation and sanitization
const validateAndSanitizeData = (data: any) => {
  const requiredFields = ['name', 'discordUsername', 'age', 'experience', 'motivation', 'specialSkills', 'availability'];
  
  for (const field of requiredFields) {
    if (!data[field] || typeof data[field] !== 'string') {
      throw new Error(`Invalid or missing field: ${field}`);
    }
  }
  
  // Sanitize and validate each field
  const sanitized = {
    name: data.name.trim().slice(0, 100).replace(/[<>]/g, ''),
    discordUsername: data.discordUsername.trim().slice(0, 32).replace(/[<>]/g, ''),
    age: data.age.toString().trim().slice(0, 3),
    experience: data.experience.trim().slice(0, 500).replace(/[<>]/g, ''),
    motivation: data.motivation.trim().slice(0, 1000).replace(/[<>]/g, ''),
    specialSkills: data.specialSkills.trim().slice(0, 1000).replace(/[<>]/g, ''),
    availability: data.availability.trim().slice(0, 500).replace(/[<>]/g, '')
  };
  
  // Basic validation
  if (sanitized.name.length < 2) throw new Error('Name too short');
  if (sanitized.discordUsername.length < 2) throw new Error('Discord username too short');
  if (!/^\d+$/.test(sanitized.age) || parseInt(sanitized.age) < 16 || parseInt(sanitized.age) > 99) {
    throw new Error('Invalid age');
  }
  if (sanitized.experience.length < 10) throw new Error('Experience too short');
  if (sanitized.motivation.length < 50) throw new Error('Motivation too short');
  if (sanitized.specialSkills.length < 50) throw new Error('Special skills too short');
  if (sanitized.availability.length < 10) throw new Error('Availability too short');
  
  return sanitized;
};

// Rate limiting check
const checkRateLimit = (identifier: string, maxRequests = 3, windowMs = 300000): boolean => {
  const now = Date.now();
  const existing = rateLimitMap.get(identifier);
  
  if (!existing || now - existing.lastReset > windowMs) {
    rateLimitMap.set(identifier, { count: 1, lastReset: now });
    return true;
  }
  
  if (existing.count >= maxRequests) {
    return false;
  }
  
  existing.count++;
  return true;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const startTime = Date.now();
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const clientIP = req.headers.get('x-forwarded-for') || 'unknown';

  try {
    console.log(`[${new Date().toISOString()}] Aktion application received from ${clientIP}`);
    
    // Rate limiting
    const rateLimitKey = `${clientIP}-${userAgent}`;
    if (!checkRateLimit(rateLimitKey)) {
      console.log(`[${new Date().toISOString()}] Rate limit exceeded for ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'For mange forsøg. Vent venligst før du prøver igen.' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 429,
        }
      );
    }

    const requestData = await req.json();
    const validatedData = validateAndSanitizeData(requestData);
    
    const webhookUrl = Deno.env.get('DISCORD_WEBHOOK_AKTION');
    
    if (!webhookUrl) {
      console.error('Discord webhook URL not configured');
      throw new Error('Service temporarily unavailable');
    }

    const embed = {
      title: "🎯 Ny Aktions Styrken Ansøgning",
      color: 0x9b59b6,
      fields: [
        { name: "👤 Navn", value: validatedData.name, inline: true },
        { name: "💬 Discord", value: validatedData.discordUsername, inline: true },
        { name: "🎂 Alder", value: validatedData.age, inline: true },
        { name: "⭐ Erfaring", value: validatedData.experience, inline: false },
        { name: "💭 Motivation", value: validatedData.motivation.slice(0, 500) + (validatedData.motivation.length > 500 ? '...' : ''), inline: false },
        { name: "🛡️ Særlige færdigheder", value: validatedData.specialSkills.slice(0, 500) + (validatedData.specialSkills.length > 500 ? '...' : ''), inline: false },
        { name: "📅 Tilgængelighed", value: validatedData.availability, inline: false }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: `NORDJYSK FIVEPD - AKS Ansøgning | IP: ${clientIP.slice(0, 10)}...`
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
      console.error(`Discord webhook failed: ${response.status} ${await response.text()}`);
      throw new Error('Failed to submit application');
    }

    const processingTime = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] Aktion application processed successfully in ${processingTime}ms for ${clientIP}`);

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error(`[${new Date().toISOString()}] Aktion application error (${processingTime}ms) for ${clientIP}:`, error);
    
    // Return safe error message
    const safeMessage = error.message.includes('Rate limit') || error.message.includes('too short') || error.message.includes('Invalid') 
      ? error.message 
      : 'Der opstod en serverfejl. Prøv venligst igen senere.';
    
    return new Response(
      JSON.stringify({ error: safeMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.message.includes('Rate limit') ? 429 : 400,
      },
    )
  }
})