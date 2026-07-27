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

/** Desktop + fine pointer only — Lenis fights native touch scroll on phones. */
function shouldUseLenis() {
  return (
    window.matchMedia(`(min-width: ${breakpoints.lg}px)`).matches &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
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
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    registerGsap();

    const root = document.documentElement;
    const useLenis = shouldUseLenis();

    if (!useLenis) {
      root.classList.remove("lenis", "lenis-smooth");
      setLenis(null);
      setReady(true);
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    root.classList.add("lenis", "lenis-smooth");

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: false,
      // Never virtualize touch — phones keep native momentum scrolling.
      syncTouch: false,
    });

    lenisRef.current = instance;
    setLenis(instance);
    setReady(true);

    instance.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenisRef.current?.raf(time * 1000);
    };

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

    const onBreakpointChange = () => {
      // Hard reload path avoided — destroy Lenis if viewport becomes touch/small.
      if (!shouldUseLenis() && lenisRef.current) {
        gsap.ticker.remove(ticker);
        lenisRef.current.destroy();
        lenisRef.current = null;
        setLenis(null);
        root.classList.remove("lenis", "lenis-smooth");
        ScrollTrigger.scrollerProxy(document.documentElement, {});
        ScrollTrigger.refresh();
      }
    };

    const desktopMq = window.matchMedia(`(min-width: ${breakpoints.lg}px)`);
    desktopMq.addEventListener("change", onBreakpointChange);

    return () => {
      desktopMq.removeEventListener("change", onBreakpointChange);
      gsap.ticker.remove(ticker);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
      setReady(false);
      root.classList.remove("lenis", "lenis-smooth");
      ScrollTrigger.scrollerProxy(document.documentElement, {});
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
