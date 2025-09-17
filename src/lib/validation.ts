import { z } from "zod";

// Base validation schemas
export const applicationBaseSchema = z.object({
  name: z
    .string()
    .min(2, "Navn skal være mindst 2 tegn")
    .max(100, "Navn må ikke overstige 100 tegn")
    .regex(/^[a-zA-ZæøåÆØÅ\s'-]+$/, "Navn må kun indeholde bogstaver, mellemrum, bindestreg og apostrof"),
  
  discordUsername: z
    .string()
    .min(2, "Discord brugernavn skal være mindst 2 tegn")
    .max(32, "Discord brugernavn må ikke overstige 32 tegn")
    .regex(/^[a-zA-Z0-9._]+$/, "Discord brugernavn må kun indeholde bogstaver, tal, punktum og underscore"),
  
  age: z
    .string()
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 16 && num <= 99;
    }, "Alder skal være mellem 16 og 99 år"),
  
  experience: z
    .string()
    .min(10, "Erfaring skal være mindst 10 tegn")
    .max(500, "Erfaring må ikke overstige 500 tegn"),
  
  motivation: z
    .string()
    .min(50, "Motivation skal være mindst 50 tegn")
    .max(1000, "Motivation må ikke overstige 1000 tegn"),
  
  availability: z
    .string()
    .min(10, "Tilgængelighed skal være mindst 10 tegn")
    .max(500, "Tilgængelighed må ikke overstige 500 tegn")
});

// Specific application schemas
export const aktionApplicationSchema = applicationBaseSchema.extend({
  specialSkills: z
    .string()
    .min(50, "Særlige færdigheder skal være mindst 50 tegn")
    .max(1000, "Særlige færdigheder må ikke overstige 1000 tegn")
});

export const civilApplicationSchema = applicationBaseSchema.extend({
  discretion: z
    .string()
    .min(50, "Diskret arbejde beskrivelse skal være mindst 50 tegn")
    .max(1000, "Diskret arbejde beskrivelse må ikke overstige 1000 tegn")
});

export const indsatslederApplicationSchema = applicationBaseSchema.extend({
  leadership: z
    .string()
    .min(50, "Ledererfaring skal være mindst 50 tegn")
    .max(1000, "Ledererfaring må ikke overstige 1000 tegn")
});

export const reaktionsApplicationSchema = applicationBaseSchema.extend({
  stressHandling: z
    .string()
    .min(50, "Stress håndtering skal være mindst 50 tegn")
    .max(1000, "Stress håndtering må ikke overstige 1000 tegn")
});

export const motorcykelApplicationSchema = applicationBaseSchema.extend({
  drivingExperience: z
    .string()
    .min(30, "Køreerfaring skal være mindst 30 tegn")
    .max(1000, "Køreerfaring må ikke overstige 1000 tegn")
});

export const hundeforerApplicationSchema = applicationBaseSchema.extend({
  // Add specific validation for dog handler applications if needed
});

// Input sanitization function
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 2000); // Hard limit on input length
};

// Rate limiting state (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export const checkRateLimit = (identifier: string, maxRequests = 5, windowMs = 60000): boolean => {
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

export type AktionApplicationData = z.infer<typeof aktionApplicationSchema>;
export type CivilApplicationData = z.infer<typeof civilApplicationSchema>;
export type IndsatslederApplicationData = z.infer<typeof indsatslederApplicationSchema>;
export type ReaktionsApplicationData = z.infer<typeof reaktionsApplicationSchema>;
export type MotorcykelApplicationData = z.infer<typeof motorcykelApplicationSchema>;
export type HundeforerApplicationData = z.infer<typeof hundeforerApplicationSchema>;