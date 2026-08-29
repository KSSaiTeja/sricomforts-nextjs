"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { AppPreloader } from "@/components/preloader/AppPreloader";
import { HeroPreloadStarter } from "@/components/preloader/HeroPreloadStarter";

type PreloaderContextValue = {
  isLoaded: boolean;
  isAnimating: boolean;
};

const PreloaderContext = createContext<PreloaderContextValue>({
  isLoaded: false,
  isAnimating: false,
});

const SESSION_KEY = "sc-preloader-ready";

function readSessionReady() {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function writeSessionReady() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Ignore private-mode / blocked storage.
  }
}

export function usePreloader() {
  return useContext(PreloaderContext);
}

/**
 * Show the branded splash once per browser tab session.
 * After that, hard reloads and route changes resolve immediately.
 */
export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sessionReady, setSessionReady] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bootChecked, setBootChecked] = useState(false);

  useLayoutEffect(() => {
    if (readSessionReady()) {
      setSessionReady(true);
      setIsAnimating(false);
    }
    setBootChecked(true);
  }, []);

  useEffect(() => {
    if (sessionReady) setIsAnimating(false);
  }, [pathname, sessionReady]);

  const handleLoaded = useCallback(() => {
    writeSessionReady();
    setIsAnimating(false);
    setSessionReady(true);
  }, []);

  const handleAnimate = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const value = useMemo(
    () => ({
      isLoaded: sessionReady,
      isAnimating: !sessionReady && isAnimating,
    }),
    [isAnimating, sessionReady],
  );

  return (
    <PreloaderContext.Provider value={value}>
      <HeroPreloadStarter />
      {children}
      {bootChecked && !sessionReady ? (
        <AppPreloader
          waitForHeroFrames={pathname === "/"}
          onLoaded={handleLoaded}
          onAnimate={handleAnimate}
        />
      ) : null}
    </PreloaderContext.Provider>
  );
}
