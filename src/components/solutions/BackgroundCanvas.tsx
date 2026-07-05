"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsap } from "@/lib/gsap/register";

type BackgroundCanvasProps = {
  theme?: "white" | "dark" | "green";
  mode?: "wave" | "pulse";
};

const CELL = 48;
const GAP = 3;
const PAD = 13;
const BLOB = 15;

const THEMES = {
  white: { line: "rgb(222, 222, 222)", rect: "rgb(173, 173, 173)", bg: "var(--color-neutral-white)" },
  dark: { line: "rgb(75, 75, 75)", rect: "rgb(132, 132, 132)", bg: "#020202" },
  green: { line: "rgb(38, 80, 29)", rect: "rgb(105, 166, 16)", bg: "var(--color-brand-ink)" },
} as const;

function mod(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function waveMask(width: number, height: number, time: number, reverse = false) {
  const image = new ImageData(BLOB, BLOB);
  const data = image.data;
  const aspect = width / height;

  for (let y = 0; y < BLOB; y++) {
    for (let x = 0; x < BLOB; x++) {
      data[(y * BLOB + x) * 4 + 3] = 0;
    }
  }

  const waves = 3;
  for (let i = 0; i < waves; i++) {
    const cx = Math.cos(time + i * 0.6) * BLOB * (reverse ? 0.35 : 0.2) + BLOB * 0.5;
    const cy = Math.sin(time + i * 0.6) * BLOB * 0.35 + BLOB * 0.5;
    const radius = BLOB * 0.55 * (reverse ? 0.7 : 1) * lerp(1, 0.5, i / (waves - 1));

    for (let y = 0; y < BLOB; y++) {
      for (let x = 0; x < BLOB; x++) {
        const dx = Math.abs(x - cx) * aspect;
        const dy = Math.abs(y - cy);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = clamp(1 - dist / radius, 0, 1) * 255;
        const idx = (y * BLOB + x) * 4 + 3;
        data[idx] = Math.min(255, data[idx] + alpha);
      }
    }
  }

  return image;
}

export function BackgroundCanvas({ theme = "white", mode = "wave" }: BackgroundCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    registerGsap();
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = THEMES[theme];
    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d");
    const compositeCanvas = document.createElement("canvas");
    const compositeCtx = compositeCanvas.getContext("2d");
    if (!maskCtx || !compositeCtx) return;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let offsetX = 0;
    let offsetY = 0;

    const resize = () => {
      width = wrapper.clientWidth;
      height = wrapper.clientHeight;
      if (!width || !height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      maskCanvas.width = width * dpr;
      maskCanvas.height = height * dpr;
      compositeCanvas.width = width * dpr;
      compositeCanvas.height = height * dpr;
      maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      compositeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const step = GAP + CELL + PAD * 2;
      cols = Math.ceil(width / step);
      rows = Math.ceil(height / step);
      offsetX = mod(width, step);
      offsetY = mod(height, step);
    };

    const drawRects = (context: CanvasRenderingContext2D) => {
      context.fillStyle = colors.rect;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * (GAP + CELL + PAD * 2) + GAP * 0.5 + offsetX * 0.5;
          const y = row * (GAP + CELL + PAD * 2) + GAP * 0.5 + offsetY * 0.5;
          context.fillRect(x, y, GAP, GAP);
        }
      }
    };

    const drawLines = (context: CanvasRenderingContext2D) => {
      context.strokeStyle = colors.line;
      context.lineWidth = 1;
      context.fillStyle = colors.line;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * (GAP + CELL + PAD * 2) + GAP * 0.5 + offsetX * 0.5;
          const y = row * (GAP + CELL + PAD * 2) + GAP * 0.5 + offsetY * 0.5;

          if (col !== cols - 1) {
            const x1 = x + PAD + GAP * 0.5;
            const x2 = x + PAD + GAP + CELL;
            context.fillRect(x1, y, x2 - x1, 1);
          }

          if (row !== rows - 1) {
            const y1 = y + PAD + GAP * 0.5;
            const y2 = y + PAD + GAP + CELL;
            context.fillRect(x, y1, 1, y2 - y1);
          }
        }
      }
    };

    const render = (time: number) => {
      if (!width || !height) return;

      const phase = time * 0.001;
      const mask = waveMask(width, height, phase, mode === "wave");

      compositeCtx.clearRect(0, 0, width, height);
      drawRects(compositeCtx);

      maskCtx.clearRect(0, 0, width, height);
      drawLines(maskCtx);
      maskCtx.putImageData(mask, 0, 0);

      compositeCtx.globalCompositeOperation = "destination-in";
      compositeCtx.drawImage(maskCanvas, 0, 0, width, height);
      compositeCtx.globalCompositeOperation = "source-over";

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(compositeCanvas, 0, 0, width, height);

      ctx.strokeStyle = "var(--color-brand-accent)";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.35;
      drawLines(ctx);
      ctx.globalAlpha = 1;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrapper);

    const tween = gsap.ticker.add(render);

    return () => {
      observer.disconnect();
      gsap.ticker.remove(render);
      void tween;
    };
  }, [mode, theme]);

  return (
    <div
      ref={wrapperRef}
      className={["bg-canvas__wrapper", theme].filter(Boolean).join(" ")}
      style={{ backgroundColor: THEMES[theme].bg }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
