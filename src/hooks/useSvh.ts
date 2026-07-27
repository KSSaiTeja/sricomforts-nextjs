"use client";

import { useEffect } from "react";

/**
 * Sets `--svh` once for layout math that still uses the custom property.
 * Do NOT refresh on every `resize` — mobile browser chrome show/hide changes
 * `innerHeight` mid-scroll and causes the page to jump / feel jittery.
 */
export function useSvh() {
  useEffect(() => {
    const setSvh = () => {
      document.documentElement.style.setProperty(
        "--svh",
        `${window.innerHeight * 0.01}px`,
      );
    };

    setSvh();
    window.addEventListener("orientationchange", setSvh);
    return () => window.removeEventListener("orientationchange", setSvh);
  }, []);
}
