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
const ZOOM = 2.4;
const PANE_GAP = 22;
const PANE_PAD = 12;

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
  const lensRef = useRef<HTMLDivElement | null>(null);
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
    const lens = lensRef.current;
    if (!frame || !stage || !lens) return;

    const rect = frame.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    if (rect.width < 8 || rect.height < 8) return;

    const lensW = lens.offsetWidth || 112;
    const lensH = lens.offsetHeight || 112;
    const halfW = lensW / 2;
    const halfH = lensH / 2;
    const cx = Math.min(
      Math.max(event.clientX - rect.left, halfW),
      Math.max(halfW, rect.width - halfW),
    );
    const cy = Math.min(
      Math.max(event.clientY - rect.top, halfH),
      Math.max(halfH, rect.height - halfH),
    );

    lens.style.left = `${cx}px`;
    lens.style.top = `${cy}px`;

    const bgW = `${rect.width * ZOOM}px`;
    const bgH = `${rect.height * ZOOM}px`;
    const bgPos = `${-cx * ZOOM + halfW}px ${-cy * ZOOM + halfH}px`;
    lens.style.backgroundSize = `${bgW} ${bgH}`;
    lens.style.backgroundPosition = bgPos;

    const pane = stage.querySelector<HTMLElement>(`.${styles.zoomPane}`);
    if (pane) {
      pane.style.backgroundSize = `${bgW} ${bgH}`;
      pane.style.backgroundPosition = bgPos;

      const paneW = pane.offsetWidth || 280;
      const paneH = pane.offsetHeight || 280;
      const localX = event.clientX - stageRect.left;
      const localY = event.clientY - stageRect.top;
      const preferRight = localX < stageRect.width * 0.5;
      let paneX = preferRight ? localX + PANE_GAP : localX - PANE_GAP - paneW;
      let paneY = localY - paneH / 2;
      paneX = Math.min(
        Math.max(PANE_PAD, paneX),
        Math.max(PANE_PAD, stageRect.width - paneW - PANE_PAD),
      );
      paneY = Math.min(
        Math.max(PANE_PAD, paneY),
        Math.max(PANE_PAD, stageRect.height - paneH - PANE_PAD),
      );
      stage.style.setProperty("--pane-x", `${Math.round(paneX)}px`);
      stage.style.setProperty("--pane-y", `${Math.round(paneY)}px`);
    }
  };

  return (
    <div
      ref={frameRef}
      className={styles.zoomFrame}
      data-swap={outgoing ? "out" : "in"}
      style={{ ["--zoom-image" as string]: `url("${shown.src}")` }}
      onMouseEnter={(event) => {
        if (outgoing) return;
        setZooming(true);
        onMove(event);
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
      <div
        ref={lensRef}
        className={styles.zoomLens}
        data-zoom-lens
        aria-hidden="true"
      />
    </div>
  );
}
