"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getHeroFrameUrls } from "@/data/homepage";
import { preloadVideoSequence } from "@/lib/canvas/createVideoSequence";

/** Start hero frame fetch/decode as early as possible — only on homepage. */
export function HeroPreloadStarter() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const frames = getHeroFrameUrls(isDesktop);

    const firstFrame = frames[0];
    if (firstFrame) {
      const existing = document.querySelector(`link[data-hero-preload="${firstFrame}"]`);
      if (!existing) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = firstFrame;
        link.setAttribute("data-hero-preload", firstFrame);
        document.head.appendChild(link);
      }
    }

    preloadVideoSequence(frames);
  }, [pathname]);

  return null;
}
