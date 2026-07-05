import { LOGO_WORDMARK } from "@/components/brand/logoDimensions";

/** Letter slice bounds in wordmark viewBox units (0 0 192 36) */
export const WORDMARK_VIEWBOX = {
  width: LOGO_WORDMARK.width,
  height: LOGO_WORDMARK.height,
} as const;

export type WordmarkSlice = {
  id: string;
  x: number;
  width: number;
};

export const WORDMARK_SLICES: WordmarkSlice[] = [
  { id: "s", x: 0, width: 24 },
  { id: "r", x: 24, width: 11 },
  { id: "i", x: 35, width: 18 },
  { id: "space", x: 53, width: 11 },
  { id: "c", x: 64, width: 28 },
  { id: "o1", x: 92, width: 22 },
  { id: "m", x: 114, width: 20 },
  { id: "f", x: 134, width: 24 },
  { id: "o2", x: 158, width: 12 },
  { id: "r2", x: 170, width: 10 },
  { id: "t", x: 180, width: 6 },
  { id: "s2", x: 186, width: 6 },
];
