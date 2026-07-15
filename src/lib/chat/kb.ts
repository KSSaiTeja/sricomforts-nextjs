import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

export type KbChunk = {
  id: string;
  source: string;
  title: string;
  text: string;
  tokens: string[];
};

const KB_DIR = path.join(process.cwd(), "docs/chatbase-kb");
const KB_FILE_PATTERN = /^\d{2}-.+\.md$/;

let cachedChunks: KbChunk[] | null = null;
let cachedSystemPrompt: string | null = null;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+/.\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

function chunkMarkdown(source: string, content: string): KbChunk[] {
  const sections = content.split(/\n(?=## )/);
  const chunks: KbChunk[] = [];

  sections.forEach((section, index) => {
    const trimmed = section.trim();
    if (!trimmed) return;

    const titleMatch = trimmed.match(/^##?\s+(.+)$/m);
    const title = titleMatch?.[1]?.trim() ?? source;
    const text = trimmed.slice(0, 3500);
    const id = `${source}#${index}`;

    chunks.push({
      id,
      source,
      title,
      text,
      tokens: tokenize(`${title}\n${text}`),
    });
  });

  return chunks;
}

function loadCorpus(): { chunks: KbChunk[]; systemPrompt: string } {
  const useCache = process.env.NODE_ENV === "production";
  if (useCache && cachedChunks && cachedSystemPrompt) {
    return { chunks: cachedChunks, systemPrompt: cachedSystemPrompt };
  }

  const files = readdirSync(KB_DIR)
    .filter((name) => KB_FILE_PATTERN.test(name))
    .sort();

  const chunks: KbChunk[] = [];
  for (const file of files) {
    const content = readFileSync(path.join(KB_DIR, file), "utf8");
    chunks.push(...chunkMarkdown(file, content));
  }

  const systemPrompt = readFileSync(
    path.join(KB_DIR, "SYSTEM-PROMPT.md"),
    "utf8",
  ).trim();

  cachedChunks = chunks;
  cachedSystemPrompt = systemPrompt;
  return { chunks, systemPrompt };
}

function scoreChunk(chunk: KbChunk, queryTokens: string[]): number {
  if (queryTokens.length === 0) return 0;

  let score = 0;
  const titleLower = chunk.title.toLowerCase();
  const textLower = chunk.text.toLowerCase();
  const tokenSet = new Set(chunk.tokens);

  for (const token of queryTokens) {
    if (tokenSet.has(token)) score += 2;
    if (titleLower.includes(token)) score += 3;
    if (textLower.includes(token)) score += 1;
  }

  // Light boosts for high-value sources
  if (chunk.source.startsWith("05-")) score += 1;
  if (chunk.source.startsWith("02-")) score += 1;

  return score;
}

/**
 * Retrieve the most relevant KB chunks for a user query.
 * Falls back to contact + FAQ overview when scores are weak.
 */
export function retrieveKnowledge(query: string, limit = 6): {
  systemPrompt: string;
  context: string;
  sources: string[];
} {
  const { chunks, systemPrompt } = loadCorpus();
  const queryTokens = tokenize(query);

  const ranked = chunks
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, queryTokens) }))
    .sort((a, b) => b.score - a.score);

  const selected: KbChunk[] = [];
  const seen = new Set<string>();

  for (const { chunk, score } of ranked) {
    if (score <= 0 && selected.length >= 3) break;
    if (seen.has(chunk.id)) continue;
    selected.push(chunk);
    seen.add(chunk.id);
    if (selected.length >= limit) break;
  }

  // Ensure contact / escalation material is available for handoff
  const contact = chunks.find((c) => c.source.startsWith("02-"));
  if (contact && !seen.has(contact.id)) {
    selected.push(contact);
  }

  if (selected.length === 0) {
    selected.push(...chunks.slice(0, Math.min(4, chunks.length)));
  }

  const context = selected
    .map(
      (chunk, i) =>
        `[Source ${i + 1}: ${chunk.source} — ${chunk.title}]\n${chunk.text}`,
    )
    .join("\n\n---\n\n");

  const sources = [...new Set(selected.map((c) => c.source))];

  return { systemPrompt, context, sources };
}

/** Test helper / warm cache */
export function getKbChunkCount(): number {
  return loadCorpus().chunks.length;
}
