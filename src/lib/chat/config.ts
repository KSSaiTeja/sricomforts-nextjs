/** Shared chat product config (client + server). */

export const CHAT_PHONE_DISPLAY = "+91 40 2700 1342";
export const CHAT_PHONE_TEL = "+914027001342";

export const CHAT_LINKS = {
  contact: "/contact",
  serviceRequest: "/services/service-request",
  amc: "/services/amc",
  calculator: "/resources/ac-tonnage-calculator",
} as const;

/** Hide the chat launcher on these path prefixes. */
export const CHAT_HIDDEN_PREFIXES = [
  "/resources/ac-tonnage-calculator",
] as const;

export const CHAT_SUGGESTIONS = [
  "Which split AC do you recommend?",
  "AMC for your AC today",
  "Quick Service Options",
] as const;

export const CHAT_GREETING = "Hi! What can I help you with?";

/** Default Groq model — override with GROQ_MODEL env. llama-3.1-8b-instant shut down 16 Aug 2026. */
export const DEFAULT_GROQ_MODEL = "openai/gpt-oss-20b";

const RETIRED_GROQ_MODELS = new Set([
  "llama-3.1-8b-instant",
  "llama-3.3-70b-versatile",
]);

export function resolveGroqModel(envModel = process.env.GROQ_MODEL): string {
  const requested = envModel?.trim();
  if (!requested || RETIRED_GROQ_MODELS.has(requested)) {
    return DEFAULT_GROQ_MODEL;
  }
  return requested;
}

export const CHAT_RATE_LIMIT = {
  windowMs: 60_000,
  maxRequests: 20,
} as const;

export const CHAT_LIMITS = {
  maxMessages: 24,
  maxMessageChars: 2000,
  maxHistoryMessages: 12,
} as const;
