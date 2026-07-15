import { createGroq } from "@ai-sdk/groq";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import {
  CHAT_LIMITS,
  CHAT_PHONE_DISPLAY,
  DEFAULT_GROQ_MODEL,
} from "@/lib/chat/config";
import { retrieveKnowledge } from "@/lib/chat/kb";
import { buildChatInstructions } from "@/lib/chat/prompt";
import { checkRateLimit, getClientIp } from "@/lib/chat/rate-limit";

export const maxDuration = 30;

function lastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message.role !== "user") continue;
    const text = message.parts
      ?.filter((part): part is { type: "text"; text: string } => part.type === "text")
      .map((part) => part.text)
      .join("\n")
      .trim();
    if (text) return text;
  }
  return "";
}

function validateMessages(messages: unknown): messages is UIMessage[] {
  if (!Array.isArray(messages) || messages.length === 0) return false;
  if (messages.length > CHAT_LIMITS.maxMessages) return false;

  for (const message of messages) {
    if (!message || typeof message !== "object") return false;
    const role = (message as UIMessage).role;
    if (role !== "user" && role !== "assistant" && role !== "system") {
      return false;
    }
    const parts = (message as UIMessage).parts;
    if (!Array.isArray(parts)) return false;
    for (const part of parts) {
      if (part?.type === "text" && typeof part.text === "string") {
        if (part.text.length > CHAT_LIMITS.maxMessageChars) return false;
      }
    }
  }

  return true;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = checkRateLimit(`chat:${ip}`);
  if (!limit.ok) {
    return Response.json(
      {
        error: `Too many messages. Please wait a moment, or call ${CHAT_PHONE_DISPLAY}.`,
      },
      {
        status: 429,
        headers: limit.retryAfterSec
          ? { "Retry-After": String(limit.retryAfterSec) }
          : undefined,
      },
    );
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error: `Chat is temporarily unavailable. Please call ${CHAT_PHONE_DISPLAY} or use the contact form.`,
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = (body as { messages?: unknown })?.messages;
  if (!validateMessages(messages)) {
    return Response.json({ error: "Invalid messages payload." }, { status: 400 });
  }

  const history = messages.slice(-CHAT_LIMITS.maxHistoryMessages);
  const query = lastUserText(history);
  if (!query) {
    return Response.json({ error: "Missing user message." }, { status: 400 });
  }

  let retrieval;
  try {
    retrieval = retrieveKnowledge(query);
  } catch (error) {
    console.error("[chat] knowledge load failed", error);
    return Response.json(
      {
        error: `Chat knowledge is unavailable right now. Please call ${CHAT_PHONE_DISPLAY}.`,
      },
      { status: 500 },
    );
  }

  const groq = createGroq({ apiKey });
  const modelId = process.env.GROQ_MODEL?.trim() || DEFAULT_GROQ_MODEL;

  const result = streamText({
    model: groq(modelId),
    instructions: buildChatInstructions(
      retrieval.systemPrompt,
      retrieval.context,
    ),
    messages: await convertToModelMessages(history),
    temperature: 0.45,
    maxOutputTokens: 280,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: () =>
        `Something went wrong. Please try again, or call ${CHAT_PHONE_DISPLAY}.`,
    }),
  });
}
