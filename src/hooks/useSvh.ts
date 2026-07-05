"use client";

import { useEffect } from "react";

export function useSvh() {
  useEffect(() => {
    const setSvh = () => {
      document.documentElement.style.setProperty("--svh", `${window.innerHeight * 0.01}px`);
    };

    setSvh();
    window.addEventListener("resize", setSvh);
    return () => window.removeEventListener("resize", setSvh);
  }, []);
}
