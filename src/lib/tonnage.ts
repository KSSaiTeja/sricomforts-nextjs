/** Rule-of-thumb AC tonnage for residential South India (Hyderabad climate baseline). */

export type TonnageInputs = {
  areaSqFt: number;
  ceilingHeightFt: number;
  occupants: number;
  windows: number;
  /** 1 (shaded / north-facing) → 10 (harsh afternoon sun) */
  sunExposure: number;
};

export type TonnageBreakdown = {
  baseBtu: number;
  occupancyBtu: number;
  windowsBtu: number;
  sunMultiplier: number;
  totalBtu: number;
};

export type TonnageResult = {
  rawTons: number;
  /** Rounded for display (1 decimal). */
  recommendedTons: number;
  /** Nearest commonly sold split-AC size. */
  standardSize: number;
  standardLabel: string;
  btu: number;
  breakdown: TonnageBreakdown;
};

const STANDARD_SIZES = [0.8, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5] as const;

const BTU_PER_TON = 12_000;
/** Baseline BTU/sq.ft for ~9 ft ceilings in warm inland South India. */
const BASE_BTU_PER_SQFT = 70;
const STANDARD_CEILING_FT = 9;
const BTU_PER_OCCUPANT = 600;
const BTU_PER_WINDOW = 1000;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function nearestStandard(tons: number): number {
  let best: number = STANDARD_SIZES[0];
  let bestDist = Math.abs(tons - best);
  for (const size of STANDARD_SIZES) {
    const dist = Math.abs(tons - size);
    if (dist < bestDist || (dist === bestDist && size >= tons)) {
      best = size;
      bestDist = dist;
    }
  }
  // Prefer sizing up when undersized by more than ~5%
  if (best < tons * 0.95) {
    const idx = STANDARD_SIZES.findIndex((s) => s === best);
    const next = idx === -1 ? STANDARD_SIZES.length - 1 : Math.min(idx + 1, STANDARD_SIZES.length - 1);
    return STANDARD_SIZES[next];
  }
  return best;
}

function formatSize(tons: number): string {
  return Number.isInteger(tons) ? `${tons}` : tons.toFixed(1);
}

export function calculateTonnage(inputs: TonnageInputs): TonnageResult {
  const area = Math.max(0, inputs.areaSqFt);
  const height = clamp(inputs.ceilingHeightFt || STANDARD_CEILING_FT, 7, 16);
  const occupants = Math.max(0, inputs.occupants);
  const windows = Math.max(0, inputs.windows);
  const sun = clamp(inputs.sunExposure || 5, 1, 10);

  const heightFactor = height / STANDARD_CEILING_FT;
  const baseBtu = area * BASE_BTU_PER_SQFT * heightFactor;
  const occupancyBtu = occupants * BTU_PER_OCCUPANT;
  const windowsBtu = windows * BTU_PER_WINDOW;
  // 1 → 0.90, 5 → ~1.06, 10 → 1.25
  const sunMultiplier = 0.9 + ((sun - 1) / 9) * 0.35;

  const totalBtu = (baseBtu + occupancyBtu + windowsBtu) * sunMultiplier;
  const rawTons = totalBtu / BTU_PER_TON;
  const recommendedTons = Math.round(rawTons * 10) / 10;
  const standardSize = nearestStandard(Math.max(rawTons, 0.8));

  return {
    rawTons,
    recommendedTons,
    standardSize,
    standardLabel: `${formatSize(standardSize)} Ton`,
    btu: Math.round(totalBtu),
    breakdown: {
      baseBtu: Math.round(baseBtu),
      occupancyBtu: Math.round(occupancyBtu),
      windowsBtu: Math.round(windowsBtu),
      sunMultiplier: Math.round(sunMultiplier * 100) / 100,
      totalBtu: Math.round(totalBtu),
    },
  };
}

export function parseNumericInput(value: string): number {
  const cleaned = value.replace(/[^\d.]/g, "");
  if (!cleaned) return 0;
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export const defaultTonnageInputs = {
  areaSqFt: "180",
  ceilingHeightFt: "10",
  occupants: "3",
  windows: "2",
  sunExposure: 5,
} as const;
