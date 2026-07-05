"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AppPreloader } from "@/components/preloader/AppPreloader";

type PreloaderContextValue = {
  isLoaded: boolean;
  isAnimating: boolean;
};

const PreloaderContext = createContext<PreloaderContextValue>({
  isLoaded: false,
  isAnimating: false,
});

export function usePreloader() {
  return useContext(PreloaderContext);
}

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loadedPath, setLoadedPath] = useState<string | null>(null);
  const [animatingPath, setAnimatingPath] = useState<string | null>(null);

  const isLoaded = loadedPath === pathname;
  const isAnimating = animatingPath === pathname;

  const handleLoaded = useCallback(() => {
    setLoadedPath(pathname);
  }, [pathname]);

  const handleAnimate = useCallback(() => {
    setAnimatingPath(pathname);
  }, [pathname]);

  const value = useMemo(
    () => ({
      isLoaded,
      isAnimating,
    }),
    [isAnimating, isLoaded],
  );

  return (
    <PreloaderContext.Provider value={value}>
      {!isLoaded ? (
        <AppPreloader
          key={pathname}
          waitForHeroFrames={pathname === "/"}
          onLoaded={handleLoaded}
          onAnimate={handleAnimate}
        />
      ) : null}
      <div aria-hidden={!isLoaded}>{children}</div>
    </PreloaderContext.Provider>
  );
}
