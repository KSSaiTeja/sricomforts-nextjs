"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { breakpoints } from "@/hooks/useMediaQuery";
import { registerGsap } from "@/lib/gsap/register";

type SmoothScrollContextValue = {
  lenis: Lenis | null;
  /** True once scroll mode (Lenis or native) has been decided. */
  ready: boolean;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  ready: false,
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

/**
 * Desktop + fine pointer only.
 * Phones / tablets keep native momentum — Lenis + touch feels glitchy.
 */
function shouldUseLenis() {
  if (typeof window === "undefined") return false;

  const wideEnough = window.matchMedia(
    `(min-width: ${breakpoints.md}px)`,
  ).matches;
  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const coarseTouch = window.matchMedia("(pointer: coarse)").matches;

  return wideEnough && finePointer && !coarseTouch && !reduceMotion;
}

function clearLenisDomState() {
  const root = document.documentElement;
  root.classList.remove(
    "lenis",
    "lenis-smooth",
    "lenis-scrolling",
    "lenis-stopped",
  );
}

type SmoothScrollProviderProps = {
  children: ReactNode;
  enabled?: boolean;
};

/**
 * Lenis + GSAP ScrollTrigger — official single-ticker wiring.
 *
 * Critical rules (from Lenis / GSAP guidance):
 * 1. `autoRaf: false` — Lenis must NOT run its own rAF loop
 * 2. Drive `lenis.raf` from `gsap.ticker` so both share one clock
 * 3. `lenis.on("scroll", ScrollTrigger.update)` keeps scrub/pin in sync
 * 4. `gsap.ticker.lagSmoothing(0)` while Lenis is active
 * 5. NO `ScrollTrigger.scrollerProxy` for document-root Lenis
 *    (proxy was the prior fight: double scroll authority → sticky/jank)
 */
export function SmoothScrollProvider({
  children,
  enabled = true,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const tickerRef = useRef<((time: number) => void) | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    registerGsap();

    const destroyLenis = () => {
      if (tickerRef.current) {
        gsap.ticker.remove(tickerRef.current);
        tickerRef.current = null;
      }

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      setLenis(null);
      clearLenisDomState();
      // Restore default lag smoothing when not using Lenis.
      gsap.ticker.lagSmoothing(500, 33);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const setupLenis = () => {
      if (lenisRef.current || !shouldUseLenis()) return;

      const instance = new Lenis({
        // Snappier than 0.1 — low lerp on this canvas/pin page feels “stuck”.
        lerp: 0.22,
        wheelMultiplier: 1,
        smoothWheel: true,
        autoRaf: false,
        syncTouch: false,
        touchMultiplier: 1,
        // Prevent Lenis from stealing focus inside overlays / drawers.
        prevent: (node) => {
          if (!(node instanceof HTMLElement)) return false;
          return (
            node.hasAttribute("data-lenis-prevent") ||
            Boolean(node.closest("[data-lenis-prevent]"))
          );
        },
      });

      lenisRef.current = instance;
      setLenis(instance);

      // ScrollTrigger reads Lenis scroll each frame of motion.
      instance.on("scroll", ScrollTrigger.update);

      // One shared RAF clock — do not also enable Lenis autoRaf.
      const ticker = (time: number) => {
        lenisRef.current?.raf(time * 1000);
      };
      tickerRef.current = ticker;
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      if (!enabled) {
        instance.stop();
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    if (shouldUseLenis()) {
      setupLenis();
    } else {
      destroyLenis();
    }

    setReady(true);

    const syncForViewport = () => {
      if (shouldUseLenis()) {
        if (!lenisRef.current) setupLenis();
      } else if (lenisRef.current) {
        destroyLenis();
      }
    };

    const desktopMq = window.matchMedia(`(min-width: ${breakpoints.md}px)`);
    const pointerMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const coarseMq = window.matchMedia("(pointer: coarse)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    desktopMq.addEventListener("change", syncForViewport);
    pointerMq.addEventListener("change", syncForViewport);
    coarseMq.addEventListener("change", syncForViewport);
    motionMq.addEventListener("change", syncForViewport);

    return () => {
      desktopMq.removeEventListener("change", syncForViewport);
      pointerMq.removeEventListener("change", syncForViewport);
      coarseMq.removeEventListener("change", syncForViewport);
      motionMq.removeEventListener("change", syncForViewport);
      destroyLenis();
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const instance = lenisRef.current;
    if (!instance) return;

    if (enabled) {
      instance.start();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    } else {
      instance.stop();
    }
  }, [enabled]);

  return (
    <SmoothScrollContext.Provider value={{ lenis, ready }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
