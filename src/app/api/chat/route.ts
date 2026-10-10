import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { chatProvider, resolveChatModel } from "@/lib/ai/chat-model";
import {
  conexaInstructions,
  isChatLang,
  safePathname,
  type ChatLang,
} from "@/lib/ai/conexa-prompt";

export const maxDuration = 30;
const MAX_MESSAGES = 16;
const MAX_TEXT = 2000;

type TextPart = { type: "text"; text: string };

function textParts(value: unknown): TextPart[] {
  if (!Array.isArray(value)) return [];
  const parts: TextPart[] = [];
  for (const part of value) {
    if (!part || typeof part !== "object") continue;
    const candidate = part as { type?: unknown; text?: unknown };
    if (candidate.type !== "text" || typeof candidate.text !== "string") continue;
    const text = candidate.text.trim().slice(0, MAX_TEXT);
    if (text) parts.push({ type: "text", text });
  }
  return parts;
}

function sanitizeMessages(value: unknown): UIMessage[] {
  if (!Array.isArray(value)) return [];
  const messages: UIMessage[] = [];
  for (const item of value.slice(-MAX_MESSAGES)) {
    if (!item || typeof item !== "object") continue;
    const candidate = item as { id?: unknown; role?: unknown; parts?: unknown };
    if (candidate.role !== "user" && candidate.role !== "assistant") continue;
    const parts = textParts(candidate.parts);
    if (parts.length === 0) continue;
    messages.push({
      id: typeof candidate.id === "string" ? candidate.id.slice(0, 80) : crypto.randomUUID(),
      role: candidate.role,
      parts,
    });
  }
  return messages;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  const payload = body && typeof body === "object" ? (body as { messages?: unknown; lang?: unknown; pathname?: unknown }) : {};
  const messages = sanitizeMessages(payload.messages);
  const last = messages.at(-1);
  if (!last || last.role !== "user") {
    return Response.json({ error: "invalid_messages" }, { status: 400 });
  }

  if (!chatProvider()) {
    return Response.json({ error: "missing_credentials" }, { status: 503 });
  }

  const lang: ChatLang = isChatLang(payload.lang) ? payload.lang : "es";

  try {
    const result = streamText({
      model: resolveChatModel(),
      instructions: conexaInstructions(lang, safePathname(payload.pathname)),
      messages: await convertToModelMessages(messages),
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        onError: (error) => {
          const message = error instanceof Error ? error.message : String(error);
          if (message.includes("credit card") || message.includes("customer_verification_required")) {
            return "billing_required";
          }
          return "error";
        },
      }),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const code = message.includes("credit card") || message.includes("customer_verification_required")
      ? "billing_required"
      : "provider_error";
    return Response.json({ error: code }, { status: 502 });
  }
}
