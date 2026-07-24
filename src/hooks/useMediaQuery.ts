"use client";

import { useEffect, useState } from "react";

/** Mobile-first breakpoints — keep in sync with tokens.css `--bp-*` */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type BreakpointName = keyof typeof breakpoints;

export function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);

    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function useIsLargeViewport() {
  return useMediaQuery(`(min-width: ${breakpoints.lg}px)`, true);
}

export function useBreakpoint() {
  const isSm = useMediaQuery(`(min-width: ${breakpoints.sm}px)`);
  const isMd = useMediaQuery(`(min-width: ${breakpoints.md}px)`);
  const isLg = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);
  const isXl = useMediaQuery(`(min-width: ${breakpoints.xl}px)`);

  return {
    isMobile: !isSm,
    isTablet: isSm && !isLg,
    isDesktop: isLg,
    current: (isXl ? "xl" : isLg ? "lg" : isMd ? "md" : isSm ? "sm" : "base") as
      | "base"
      | BreakpointName,
  };
}
