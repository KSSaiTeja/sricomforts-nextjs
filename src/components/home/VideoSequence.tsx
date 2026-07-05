"use client";

import type { RefObject } from "react";
import { useVideoSequence } from "@/hooks/useVideoSequence";
import styles from "./video-carousel.module.css";

type VideoSequenceProps = {
  frames: string[];
  progress: number;
  scrollProgressRef?: RefObject<number>;
  fitTop?: number;
  fitLeft?: number;
};

export function VideoSequence({
  frames,
  progress,
  scrollProgressRef,
  fitTop,
  fitLeft,
}: VideoSequenceProps) {
  const { containerRef } = useVideoSequence({
    frames,
    progress,
    scrollProgressRef,
    fitTop,
    fitLeft,
  });

  return <div ref={containerRef} className={styles.videoSequence} aria-hidden />;
}
