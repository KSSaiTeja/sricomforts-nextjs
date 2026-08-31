/** Display name — non-breaking space keeps "Sri Comforts" on one line. */
export const BRAND_NAME = "Sri\u00A0Comforts";

const SKIP_LOCK_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"]);

/** Keep the brand name from wrapping mid-name in any copy string. */
export function keepBrandTogether(text: string): string {
  return text.replace(/Sri[\u00A0 ]Comforts/g, BRAND_NAME);
}

function textContainsBrand(text: string): boolean {
  return text.includes("Sri Comforts") || text.includes(BRAND_NAME);
}

/** Wrap visible brand names so SplitText / overflow-wrap cannot split them. */
export function lockBrandNameInElement(root: HTMLElement): void {
  if (typeof document === "undefined") return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (SKIP_LOCK_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest(".brand-nowrap")) return NodeFilter.FILTER_REJECT;
      if (!textContainsBrand(node.textContent ?? "")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const targets: Text[] = [];
  while (walker.nextNode()) {
    targets.push(walker.currentNode as Text);
  }

  for (const node of targets) {
    const text = node.data;
    const fragment = document.createDocumentFragment();
    const pattern = /Sri[\u00A0 ]Comforts/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text))) {
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      const span = document.createElement("span");
      span.className = "brand-nowrap";
      span.textContent = BRAND_NAME;
      fragment.appendChild(span);
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    node.parentNode?.replaceChild(fragment, node);
  }
}
