import type { CSSProperties } from "react";

export type CardNotchSide = "top" | "bottom" | "left" | "right";

export type CardNotchConfig = {
  side: CardNotchSide;
  positionPercent: number;
  halfWidth?: number;
  depth?: number;
  slope?: number;
  radius?: number;
  samples?: number;
};

const DEFAULT_CLIP =
  "polygon(0 0, calc(50% - 56px) 0, calc(50% - 48px) 16px, calc(50% + 48px) 16px, calc(50% + 56px) 0, 100% 0, 100% 100%, 0 100%)";

function buildNotchPoints({
  halfWidth,
  depth,
  slope,
  radius,
  samples,
}: {
  halfWidth: number;
  depth: number;
  slope: number;
  radius: number;
  samples: number;
}) {
  const left: [number, number] = [-(halfWidth + slope), 0];
  const innerLeft: [number, number] = [-halfWidth, depth];
  const innerRight: [number, number] = [halfWidth, depth];
  const right: [number, number] = [halfWidth + slope, 0];
  const length = Math.hypot(slope, depth) || 1;
  const dirIn: [number, number] = [slope / length, depth / length];
  const dirOut: [number, number] = [slope / length, -depth / length];
  const horizontal: [number, number] = [1, 0];
  const maxRadius = Math.min(halfWidth, length / 2, depth * 0.95);
  const r = Math.max(0, Math.min(radius, maxRadius));

  if (r < 0.5 || samples < 1) {
    return [left, innerLeft, innerRight, right];
  }

  const curve = (
    point: [number, number],
    from: [number, number],
    to: [number, number],
  ) => {
    const start: [number, number] = [point[0] - r * from[0], point[1] - r * from[1]];
    const end: [number, number] = [point[0] + r * to[0], point[1] + r * to[1]];
    const points: [number, number][] = [];

    for (let index = 0; index <= samples; index += 1) {
      const t = index / samples;
      const inverse = 1 - t;
      points.push([
        inverse * inverse * start[0] + 2 * inverse * t * point[0] + t * t * end[0],
        inverse * inverse * start[1] + 2 * inverse * t * point[1] + t * t * end[1],
      ]);
    }

    return points;
  };

  return [
    ...curve(left, horizontal, dirIn),
    ...curve(innerLeft, dirIn, horizontal),
    ...curve(innerRight, horizontal, dirOut),
    ...curve(right, dirOut, horizontal),
  ];
}

function formatPercent(value: number) {
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded) ? `${rounded}` : `${rounded}`;
}

function formatPosition(value: number, percent: number) {
  const label = formatPercent(percent);
  if (Math.abs(value) < 0.01) return `${label}%`;
  return value < 0
    ? `calc(${label}% - ${formatPercent(-value)}px)`
    : `calc(${label}% + ${formatPercent(value)}px)`;
}

function formatPx(value: number) {
  if (Math.abs(value) < 0.01) return "0";
  return `${formatPercent(value)}px`;
}

function formatHeight(value: number) {
  if (Math.abs(value) < 0.01) return "100%";
  return `calc(100% - ${formatPercent(value)}px)`;
}

export function buildCardClipPath({
  side,
  positionPercent,
  halfWidth = 48,
  depth = 16,
  slope = 8,
  radius = 0,
  samples = 4,
}: CardNotchConfig): string {
  const position = Math.min(100, Math.max(0, positionPercent));
  const points = buildNotchPoints({
    halfWidth: Math.max(0, halfWidth),
    depth: Math.max(0, depth),
    slope: Math.max(0, slope),
    radius: Math.max(0, radius),
    samples: Math.max(1, Math.floor(samples)),
  });

  let polygon: string[];

  switch (side) {
    case "top":
      polygon = [
        "0 0",
        ...points.map(([x, y]) => `${formatPosition(x, position)} ${formatPx(y)}`),
        "100% 0",
        "100% 100%",
        "0 100%",
      ];
      break;
    case "bottom":
      polygon = [
        "0 0",
        "100% 0",
        "100% 100%",
        ...[...points].reverse().map(([x, y]) => `${formatPosition(x, position)} ${formatHeight(y)}`),
        "0 100%",
      ];
      break;
    case "right":
      polygon = [
        "0 0",
        "100% 0",
        ...points.map(([x, y]) => `${formatHeight(y)} ${formatPosition(x, position)}`),
        "100% 100%",
        "0 100%",
      ];
      break;
    case "left":
      polygon = [
        "0 0",
        "100% 0",
        "100% 100%",
        "0 100%",
        ...[...points].reverse().map(([x, y]) => `${formatPx(y)} ${formatPosition(x, position)}`),
      ];
      break;
  }

  return `polygon(${polygon.join(", ")})`;
}

export function cardClipPathStyle(notch?: CardNotchConfig): CSSProperties {
  return {
    ["--card-clip-path" as string]: notch
      ? buildCardClipPath(notch)
      : DEFAULT_CLIP,
  };
}
