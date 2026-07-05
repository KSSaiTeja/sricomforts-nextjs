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
import { registerGsap } from "@/lib/gsap/register";

type SmoothScrollContextValue = {
  lenis: Lenis | null;
  scroll: number;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scroll: 0,
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
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
  const [scroll, setScroll] = useState(0);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLenis(null);
      return;
    }

    registerGsap();

    const instance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      autoRaf: false,
    });

    lenisRef.current = instance;
    setLenis(instance);

    instance.on("scroll", ({ scroll: currentScroll }: { scroll: number }) => {
      setScroll(currentScroll);
      ScrollTrigger.update();
    });

    const ticker = (time: number) => {
      lenisRef.current?.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

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

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.setTimeout(() => ScrollTrigger.refresh(), 0);
      });
    });

    return () => {
      gsap.ticker.remove(ticker);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
    };
  }, [enabled]);

  return (
    <SmoothScrollContext.Provider value={{ lenis, scroll }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
