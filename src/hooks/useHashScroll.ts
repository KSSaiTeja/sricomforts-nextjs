"use client";

import { useEffect } from "react";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";

const HEADER_OFFSET = -96;

export function useHashScroll(enabled = true) {
  const { lenis, ready } = useSmoothScroll();

  useEffect(() => {
    if (!enabled || !ready) return;

    const scrollToHash = (hash: string, immediate = false) => {
      const id = hash.replace(/^#/, "");
      if (!id) return;

      const attempt = (tries = 0) => {
        const target = document.getElementById(id);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target, { offset: HEADER_OFFSET, immediate });
          } else {
            const top =
              target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
            window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
          }
          return;
        }

        if (tries < 12) {
          requestAnimationFrame(() => attempt(tries + 1));
        }
      };

      attempt();
    };

    scrollToHash(window.location.hash, true);

    const onHashChange = () => {
      scrollToHash(window.location.hash);
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [enabled, lenis, ready]);
}
