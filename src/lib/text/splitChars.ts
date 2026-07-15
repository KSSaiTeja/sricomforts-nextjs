import { keepBrandTogether } from "@/lib/brand";

/** Breaking whitespace only — excludes NBSP so "Sri Comforts" stays one word. */
const BREAKING_WHITESPACE = /([ \t\r\n\f\v]+)/;

export function splitIntoCharSpans(text: string): string[] {
  return [...text];
}

function tokenizeWords(text: string): string[] {
  return keepBrandTogether(text).split(BREAKING_WHITESPACE);
}

function isBreakingWhitespace(token: string): boolean {
  return /^[ \t\r\n\f\v]+$/.test(token);
}

export function wrapTextWithChars(
  element: HTMLElement,
  className = "--char",
  wordClassName = "--word",
): HTMLSpanElement[] {
  const text = element.textContent ?? "";
  element.textContent = "";
  element.setAttribute("aria-label", text);

  const chars: HTMLSpanElement[] = [];
  const tokens = tokenizeWords(text);

  for (const token of tokens) {
    if (!token) continue;

    if (isBreakingWhitespace(token)) {
      element.appendChild(document.createTextNode(token));
      continue;
    }

    const wordWrapper = document.createElement("span");
    wordWrapper.className = wordClassName;
    wordWrapper.setAttribute("aria-hidden", "true");

    for (const character of splitIntoCharSpans(token)) {
      const charSpan = document.createElement("span");
      charSpan.className = className;
      charSpan.setAttribute("aria-hidden", "true");
      charSpan.textContent = character;
      wordWrapper.appendChild(charSpan);
      chars.push(charSpan);
    }

    element.appendChild(wordWrapper);
  }

  return chars;
}

export function wrapElementWithSplitChars(
  element: HTMLElement,
  charClassName = "split-chars",
  wordClassName = "split-words",
): HTMLSpanElement[] {
  const text = element.textContent ?? "";
  element.textContent = "";

  const chars: HTMLSpanElement[] = [];
  const tokens = tokenizeWords(text);

  for (const token of tokens) {
    if (!token) continue;

    if (isBreakingWhitespace(token)) {
      element.appendChild(document.createTextNode(token));
      continue;
    }

    const wordWrapper = document.createElement("span");
    wordWrapper.className = wordClassName;
    wordWrapper.setAttribute("aria-hidden", "true");

    for (const character of splitIntoCharSpans(token)) {
      const charSpan = document.createElement("span");
      charSpan.className = charClassName;
      charSpan.setAttribute("aria-hidden", "true");
      charSpan.textContent = character;
      wordWrapper.appendChild(charSpan);
      chars.push(charSpan);
    }

    element.appendChild(wordWrapper);
  }

  return chars;
}
