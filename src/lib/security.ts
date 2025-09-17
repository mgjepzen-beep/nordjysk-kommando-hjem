// Security utility functions

export interface SecurityEvent {
  type: 'auth_attempt' | 'auth_success' | 'auth_failure' | 'application_submit' | 'rate_limit_exceeded';
  userId?: string;
  ip?: string;
  userAgent?: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

// Simple in-memory logging (in production, this should use a proper logging service)
const securityLog: SecurityEvent[] = [];

export const logSecurityEvent = (event: SecurityEvent): void => {
  securityLog.push(event);
  
  // Keep only last 1000 events in memory
  if (securityLog.length > 1000) {
    securityLog.shift();
  }
  
  // Log to console for development
  console.log(`[SECURITY] ${event.type}:`, event);
};

export const getSecurityLog = (): SecurityEvent[] => {
  return [...securityLog];
};

// Check for suspicious patterns
export const detectSuspiciousActivity = (events: SecurityEvent[]): boolean => {
  const recentEvents = events.filter(e => Date.now() - e.timestamp < 300000); // Last 5 minutes
  
  // Multiple failed auth attempts
  const failedAuthAttempts = recentEvents.filter(e => e.type === 'auth_failure').length;
  if (failedAuthAttempts > 5) {
    return true;
  }
  
  // Too many application submissions
  const appSubmissions = recentEvents.filter(e => e.type === 'application_submit').length;
  if (appSubmissions > 10) {
    return true;
  }
  
  return false;
};

// Error message sanitization - never expose internal details
export const sanitizeErrorMessage = (error: any): string => {
  // Default safe error messages
  const safeMessages = {
    validation: "Ugyldige data. Kontroller venligst dine indtastninger.",
    authentication: "Godkendelse mislykkedes. Prøv venligst igen.",
    network: "Netværksfejl. Prøv venligst igen senere.",
    server: "Der opstod en serverfejl. Prøv venligst igen senere.",
    rate_limit: "For mange forsøg. Vent venligst før du prøver igen.",
    generic: "Der opstod en uventet fejl. Prøv venligst igen senere."
  };
  
  if (typeof error === 'string' && error.includes('validation')) {
    return safeMessages.validation;
  }
  
  if (typeof error === 'string' && error.includes('auth')) {
    return safeMessages.authentication;
  }
  
  if (typeof error === 'string' && error.includes('rate')) {
    return safeMessages.rate_limit;
  }
  
  return safeMessages.generic;
};

// Content Security Policy headers for enhanced security
export const getSecurityHeaders = () => ({
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://cajpphadwotolpjizrfw.supabase.co wss://cajpphadwotolpjizrfw.supabase.co;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
});
