"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from "react";
import styles from "@/components/home/product-catalog.module.css";

const SWAP_MS = 180;

type ProductImageZoomProps = {
  src: string;
  alt: string;
  stageRef: RefObject<HTMLDivElement | null>;
};

export function ProductImageZoom({
  src,
  alt,
  stageRef,
}: ProductImageZoomProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState({ src, alt });
  const [outgoing, setOutgoing] = useState(false);
  const pendingRef = useRef({ src, alt });
  pendingRef.current = { src, alt };

  const setZooming = useCallback(
    (on: boolean) => {
      const stage = stageRef.current;
      const frame = frameRef.current;
      if (stage) {
        if (on) stage.setAttribute("data-zooming", "true");
        else stage.removeAttribute("data-zooming");
      }
      if (frame) {
        if (on) frame.setAttribute("data-zoom", "on");
        else frame.removeAttribute("data-zoom");
      }
    },
    [stageRef],
  );

  useEffect(() => {
    if (src === shown.src) {
      setShown((current) =>
        current.alt === alt ? current : { src: current.src, alt },
      );
      return;
    }

    // Preload next image, then swap without fading to empty (white/void flash).
    let cancelled = false;
    const next = { src, alt };
    pendingRef.current = next;
    setZooming(false);

    const commit = () => {
      if (cancelled) return;
      setShown(next);
      setOutgoing(false);
    };

    const probe = new window.Image();
    probe.decoding = "async";
    probe.onload = () => commit();
    probe.onerror = () => commit();
    probe.src = src;

    // If already cached, onload can fire sync — also cap wait.
    const timer = window.setTimeout(commit, SWAP_MS + 120);
    setOutgoing(true);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      probe.onload = null;
      probe.onerror = null;
    };
    // shown.src is the swap gate — including `shown` retriggers the wait loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, alt, setZooming]);

  useEffect(() => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    const zoomUrl = `url("${shown.src}")`;
    if (stage) stage.style.setProperty("--zoom-image", zoomUrl);
    if (frame) frame.style.setProperty("--zoom-image", zoomUrl);
  }, [shown.src, stageRef]);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (outgoing) return;
    const frame = frameRef.current;
    const stage = stageRef.current;
    if (!frame || !stage) return;

    const rect = frame.getBoundingClientRect();
    const lens = frame.querySelector<HTMLElement>("[data-zoom-lens]");
    const half = (lens?.offsetWidth ?? 112) / 2;
    const x = Math.min(
      Math.max(event.clientX - rect.left, half),
      Math.max(half, rect.width - half),
    );
    const y = Math.min(
      Math.max(event.clientY - rect.top, half),
      Math.max(half, rect.height - half),
    );
    const px = `${(x / rect.width) * 100}%`;
    const py = `${(y / rect.height) * 100}%`;

    frame.style.setProperty("--zx", px);
    frame.style.setProperty("--zy", py);
    stage.style.setProperty("--zx", px);
    stage.style.setProperty("--zy", py);
  };

  return (
    <div
      ref={frameRef}
      className={styles.zoomFrame}
      data-swap={outgoing ? "out" : "in"}
      style={{ ["--zoom-image" as string]: `url("${shown.src}")` }}
      onMouseEnter={() => {
        if (!outgoing) setZooming(true);
      }}
      onMouseMove={onMove}
      onMouseLeave={() => setZooming(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.stageImage}
        src={shown.src}
        alt={shown.alt}
        loading="eager"
        decoding="async"
      />
      <div className={styles.zoomLens} data-zoom-lens aria-hidden="true" />
    </div>
  );
}
