import { google } from "@ai-sdk/google";
import type { LanguageModel } from "ai";

const GATEWAY_DEFAULT = "google/gemini-3.8-flash";
const GOOGLE_DEFAULT = "gemini-2.5-flash";

export type ChatProvider = "google" | "gateway";

export function chatProvider(): ChatProvider | null {
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) return "google";
  if (process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN) return "gateway";
  return null;
}

export function resolveChatModel(): LanguageModel | string {
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    const id = process.env.GOOGLE_GENERATIVE_AI_MODEL || GOOGLE_DEFAULT;
    return google(id);
  }
  return process.env.AI_GATEWAY_MODEL || GATEWAY_DEFAULT;
}
