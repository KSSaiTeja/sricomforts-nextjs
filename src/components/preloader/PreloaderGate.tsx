"use client";

import { usePreloader } from "@/components/preloader/PreloaderProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";

export function PreloaderGate({ children }: { children: React.ReactNode }) {
  const { isLoaded, isAnimating } = usePreloader();

  return (
    <SmoothScrollProvider enabled={isLoaded || isAnimating}>
      {children}
    </SmoothScrollProvider>
  );
}
