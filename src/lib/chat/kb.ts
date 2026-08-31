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

const RA_SERIES_CODES = [
  "ATKL",
  "ATKM",
  "FTHT",
  "FTKC",
  "FTKF",
  "FTKL",
  "FTKM",
  "FTKN",
  "FTKR",
  "FTKU",
  "FTXF",
  "GTHT",
  "GTKC",
  "GTKL",
  "GTKM",
  "GTKU",
  "JTKJ",
  "MTKL",
  "MTKM",
  "FTQ",
  "GTQ",
] as const;

function isProductQuery(query: string): boolean {
  const q = query.toLowerCase();
  if (
    /\b(ac|a\/c|split|inverter|tonnage|\d+(\.\d+)?\s*ton|iseer|wifi|wi-fi|daikin|idu|odu|waizu|heat ?pump|hot\s*(&|and)\s*cold|hi-?wall|which ac|best ac|recommend\b.*\bac|ac for|star rating|5-star|3-star)\b/i.test(
      query,
    )
  ) {
    return true;
  }
  if (RA_SERIES_CODES.some((code) => q.includes(code.toLowerCase()))) {
    return true;
  }
  return false;
}

function seriesCodesInQuery(query: string): string[] {
  const upper = query.toUpperCase();
  return RA_SERIES_CODES.filter((code) =>
    new RegExp(`\\b${code}`).test(upper),
  );
}

/** Series to prefer when the visitor describes a need, not a model code. */
function seriesCodesForIntent(query: string): string[] {
  const q = query.toLowerCase();
  const codes: string[] = [];
  if (/\b5[\s-]?star\b/.test(q) || /\bhighest iseer\b/.test(q)) {
    codes.push("FTKM", "FTKF", "FTKR", "JTKJ", "ATKM", "MTKM");
  }
  if (/\b3[\s-]?star\b/.test(q) || /\bvalue\b|\bbudget\b/.test(q)) {
    codes.push("FTKL", "FTKC", "ATKL", "MTKL");
  }
  if (/\bwifi|wi-fi|alexa|google home|app control/.test(q)) {
    codes.push("FTKR", "FTKN", "JTKJ");
  }
  if (/\bheat pump|hot\s*(&|and)\s*cold|\bwinter\b|\bheating\b/.test(q)) {
    codes.push("FTXF", "FTHT", "GTHT");
  }
  if (/\bflagship|waizu\b/.test(q)) {
    codes.push("JTKJ");
  }
  if (/\bnon-?inverter|fixed speed\b/.test(q)) {
    codes.push("FTQ", "GTQ");
  }
  return [...new Set(codes)];
}

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

    const titleMatch =
      trimmed.match(/^##\s+(.+)$/m) ?? trimmed.match(/^#\s+(.+)$/m);
    const title = titleMatch?.[1]?.trim() ?? source;
    const text = trimmed.slice(0, 4200);
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
    .filter((name) => KB_FILE_PATTERN.test(name) && !name.includes("README"))
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
  const productQuery = isProductQuery(query);
  const seriesHits = [
    ...seriesCodesInQuery(query),
    ...seriesCodesForIntent(query),
  ].filter((code, i, arr) => arr.indexOf(code) === i);
  const retrievalLimit = productQuery ? Math.max(limit, 8) : limit;

  const ranked = chunks
    .map((chunk) => {
      let score = scoreChunk(chunk, queryTokens);
      if (productQuery && chunk.source.startsWith("09-")) score += 6;
      if (productQuery && chunk.source.startsWith("10-")) score += 4;
      if (productQuery && chunk.source.startsWith("11-")) score += 2;
      const hay = `${chunk.title}\n${chunk.text}`.toUpperCase();
      for (const code of seriesHits) {
        if (chunk.title.toUpperCase().includes(code)) score += 14;
        else if (hay.includes(code)) score += 6;
      }
      return { chunk, score };
    })
    .sort((a, b) => b.score - a.score);

  const selected: KbChunk[] = [];
  const seen = new Set<string>();

  const pushChunk = (chunk: KbChunk | undefined) => {
    if (!chunk || seen.has(chunk.id)) return;
    selected.push(chunk);
    seen.add(chunk.id);
  };

  if (productQuery) {
    const voice = chunks.find(
      (c) => c.source.startsWith("09-") && c.title.toLowerCase().includes("talks"),
    );
    const picks = chunks.find(
      (c) => c.source.startsWith("09-") && c.title.toLowerCase().includes("picks"),
    );
    pushChunk(voice);
    pushChunk(picks);
    for (const code of seriesHits) {
      const modelChunk = chunks.find(
        (c) =>
          c.source.startsWith("10-") && c.title.toUpperCase().includes(code),
      );
      pushChunk(modelChunk);
    }
  }

  for (const { chunk, score } of ranked) {
    if (score <= 0 && selected.length >= 3) break;
    if (seen.has(chunk.id)) continue;
    selected.push(chunk);
    seen.add(chunk.id);
    if (selected.length >= retrievalLimit) break;
  }

  // Ensure contact / escalation material is available for handoff
  const contact = chunks.find((c) => c.source.startsWith("02-"));
  if (contact && !seen.has(contact.id)) {
    selected.push(contact);
    seen.add(contact.id);
  }

  // Always surface office hours + location chunks when those topics are asked
  const q = query.toLowerCase();
  const asksHours =
    /\b(hour|hours|timing|timings|open|opening|walk-?in|when are you)\b/.test(
      q,
    );
  const asksLocation =
    /\b(location|address|where|office|find you|based|map|directions?)\b/.test(
      q,
    );
  if (asksHours || asksLocation) {
    for (const chunk of chunks) {
      if (!chunk.source.startsWith("02-") && !chunk.source.startsWith("05-")) {
        continue;
      }
      const hay = `${chunk.title}\n${chunk.text}`.toLowerCase();
      const isHoursChunk =
        hay.includes("office timing") ||
        hay.includes("office hours") ||
        hay.includes("8:00");
      const isLocationChunk =
        hay.includes("head office") ||
        hay.includes("vijayapuri") ||
        hay.includes("where is your office");
      if (
        ((asksHours && isHoursChunk) || (asksLocation && isLocationChunk)) &&
        !seen.has(chunk.id)
      ) {
        selected.push(chunk);
        seen.add(chunk.id);
      }
    }
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
