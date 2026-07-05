"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { buildMaskPath, MASK_PADDING } from "@/lib/svg/notchMask";
import type { Notch } from "@/types/notch";
import styles from "./preloader.module.css";

export type SvgMaskHandle = {
  updatePath: (notches: Notch[]) => void;
};

type SvgMaskProps = {
  notches: Notch[];
  useClip?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const SvgMask = forwardRef<SvgMaskHandle, SvgMaskProps>(function SvgMask(
  { notches, useClip = true, className, children },
  ref,
) {
  const maskId = useId().replace(/:/g, "");
  const slotRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const notchesRef = useRef(notches);
  const dimensionsRef = useRef({ width: 1, height: 1 });
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
  const [isReady, setIsReady] = useState(false);

  const applyPath = useCallback((nextNotches: Notch[], nextDimensions = dimensionsRef.current) => {
    pathRef.current?.setAttribute("d", buildMaskPath(nextNotches, nextDimensions));
  }, []);

  useImperativeHandle(ref, () => ({
    updatePath: (nextNotches: Notch[]) => {
      notchesRef.current = nextNotches;
      applyPath(nextNotches);
    },
  }));

  useEffect(() => {
    notchesRef.current = notches;
    applyPath(notches);
  }, [notches, applyPath]);

  useEffect(() => {
    const element = slotRef.current;
    if (!element) return;

    const update = () => {
      const next = {
        width: element.offsetWidth || 1,
        height: element.offsetHeight || 1,
      };
      dimensionsRef.current = next;
      setDimensions(next);
      setIsReady(true);
      applyPath(notchesRef.current, next);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [applyPath]);

  const clipUrl = `url(#clip-${maskId})`;

  return (
    <div className={`${styles.svgMask} svg-mask ${className ?? ""}`.trim()}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`${-MASK_PADDING} ${-MASK_PADDING} ${dimensions.width + MASK_PADDING * 2} ${dimensions.height + MASK_PADDING * 2}`}
        className={styles.svgMaskSvg}
        shapeRendering="geometricPrecision"
        aria-hidden
      >
        <defs>
          {useClip ? (
            <clipPath id={`clip-${maskId}`} clipPathUnits="userSpaceOnUse">
              <path ref={pathRef} />
            </clipPath>
          ) : (
            <mask id={`mask-${maskId}`}>
              <path ref={pathRef} fill="white" />
            </mask>
          )}
        </defs>
      </svg>
      <div
        ref={slotRef}
        className={`${styles.svgMaskSlot} slot ${isReady ? `${styles.svgMaskSlotReady} use-clip` : styles.svgMaskSlotSsr}`}
        style={isReady && useClip ? { clipPath: clipUrl } : undefined}
      >
        {children}
      </div>
    </div>
  );
});
