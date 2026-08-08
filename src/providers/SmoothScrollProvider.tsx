"use client";

import Lenis from "lenis";
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
  /** True once the scroll system has decided Lenis vs native. */
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
 * Phones / tablets keep native scroll — Lenis fights touch momentum and feels glitchy.
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
  root.classList.remove("lenis", "lenis-smooth", "lenis-scrolling", "lenis-stopped");
  root.style.removeProperty("overflow");
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("position");
  document.body.style.removeProperty("width");
  document.body.style.removeProperty("height");
  document.body.style.removeProperty("top");
}

type SmoothScrollProviderProps = {
  children: ReactNode;
  enabled?: boolean;
};

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
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.defaults({ scroller: undefined });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const setupLenis = () => {
      if (lenisRef.current || !shouldUseLenis()) return;

      const root = document.documentElement;
      root.classList.add("lenis", "lenis-smooth");

      const instance = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        autoRaf: false,
        // Never virtualize touch — phones keep native momentum scrolling.
        syncTouch: false,
        touchMultiplier: 1,
      });

      lenisRef.current = instance;
      setLenis(instance);

      instance.on("scroll", ScrollTrigger.update);

      const ticker = (time: number) => {
        lenisRef.current?.raf(time * 1000);
      };
      tickerRef.current = ticker;
      gsap.ticker.add(ticker);

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length && value !== undefined) {
            instance.scrollTo(value, { immediate: true });
          }
          return instance.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      ScrollTrigger.defaults({ scroller: document.documentElement });

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

    desktopMq.addEventListener("change", syncForViewport);
    pointerMq.addEventListener("change", syncForViewport);
    coarseMq.addEventListener("change", syncForViewport);

    return () => {
      desktopMq.removeEventListener("change", syncForViewport);
      pointerMq.removeEventListener("change", syncForViewport);
      coarseMq.removeEventListener("change", syncForViewport);
      destroyLenis();
      setReady(false);
    };
    // Lenis instance lives for the full session — enabled toggles start/stop only.
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
