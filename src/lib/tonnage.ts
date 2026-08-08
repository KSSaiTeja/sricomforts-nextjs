/**
 * Sri Comforts residential split-AC tonnage calculator.
 *
 * Simplified inputs: length × width → area, plus occupancy and sun exposure.
 *   Recommended AC = Base(area) + occupancy + exposure adjustments
 *   Round to nearest available size: 1, 1.5, 2, 2.5, 3, 4, 5 Ton
 *
 * Area > 450 SFT → needs separate engineering calculation.
 */

export type SunExposureLevel = "low" | "medium" | "high";

export type TonnageInputs = {
  /** Room length in feet. */
  lengthFt: number;
  /** Room width in feet. */
  widthFt: number;
  occupants: number;
  sunExposure: SunExposureLevel;
};

export type TonnageBreakdown = {
  areaSqFt: number;
  baseTons: number;
  occupantsAdd: number;
  sunAdd: number;
  totalAdjustments: number;
};

export type TonnageResult = {
  /** Base + all adjustments (before rounding). */
  rawTons: number;
  /** Rounded for display (1 decimal). */
  recommendedTons: number;
  /** Nearest commonly sold split-AC size. */
  standardSize: number;
  standardLabel: string;
  /** Equivalent BTU for display (1 Ton ≈ 12,000 BTU). */
  btu: number;
  breakdown: TonnageBreakdown;
  /** Area above 450 SFT — calculator not applicable. */
  needsSeparateCalculation: boolean;
};

const STANDARD_SIZES = [1, 1.5, 2, 2.5, 3, 4, 5] as const;
const BTU_PER_TON = 12_000;
const MAX_CALCULATOR_AREA = 450;

const SUN_ADD: Record<SunExposureLevel, number> = {
  low: 0,
  medium: 0.1,
  high: 0.2,
};

/** Base AC capacity from area (SFT). Returns null when area > 450. */
export function baseTonsFromArea(areaSqFt: number): number | null {
  const area = Math.max(0, areaSqFt);
  if (area <= 0) return 0;
  if (area <= 100) return 1.0;
  if (area <= 150) return 1.5;
  if (area <= 220) return 2.0;
  if (area <= 300) return 2.5;
  if (area <= 380) return 3.0;
  if (area <= MAX_CALCULATOR_AREA) return 4.0;
  return null;
}

function occupantsAdd(occupants: number): number {
  const n = Math.max(0, Math.floor(occupants));
  if (n <= 2) return 0;
  if (n <= 4) return 0.1;
  return 0.2; // 5–6 (and 7+ capped at documented max)
}

/** Avoid float noise on 0.05 / 0.10 / 0.20 ton steps. */
function roundTons(n: number): number {
  return Math.round(n * 100) / 100;
}

function nearestStandard(tons: number): number {
  let best: number = STANDARD_SIZES[0];
  let bestDist = Math.abs(tons - best);
  for (const size of STANDARD_SIZES) {
    const dist = Math.abs(tons - size);
    // On a tie, prefer the larger size (safer cooling).
    if (dist < bestDist || (dist === bestDist && size > best)) {
      best = size;
      bestDist = dist;
    }
  }
  return best;
}

function formatSize(tons: number): string {
  return Number.isInteger(tons) ? `${tons}` : tons.toFixed(1);
}

export function calculateTonnage(inputs: TonnageInputs): TonnageResult {
  const length = Math.max(0, inputs.lengthFt);
  const width = Math.max(0, inputs.widthFt);
  const area = roundTons(length * width);
  const base = baseTonsFromArea(area);
  const needsSeparateCalculation = base === null;

  const occAdd = occupantsAdd(inputs.occupants);
  const sunAdd = SUN_ADD[inputs.sunExposure];
  const totalAdjustments = roundTons(occAdd + sunAdd);

  const baseTons = base ?? 0;
  const rawTons = needsSeparateCalculation ? 0 : roundTons(baseTons + totalAdjustments);
  const recommendedTons = Math.round(rawTons * 10) / 10;
  const standardSize = needsSeparateCalculation
    ? 0
    : nearestStandard(Math.max(rawTons, STANDARD_SIZES[0]));

  return {
    rawTons,
    recommendedTons,
    standardSize,
    standardLabel: needsSeparateCalculation
      ? "Site survey required"
      : `${formatSize(standardSize)} Ton`,
    btu: needsSeparateCalculation ? 0 : Math.round(standardSize * BTU_PER_TON),
    breakdown: {
      areaSqFt: area,
      baseTons,
      occupantsAdd: occAdd,
      sunAdd,
      totalAdjustments,
    },
    needsSeparateCalculation,
  };
}

export function parseNumericInput(value: string): number {
  const cleaned = value.replace(/[^\d.]/g, "");
  if (!cleaned) return 0;
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export const defaultTonnageInputs = {
  lengthFt: "15",
  widthFt: "12",
  occupants: "3",
  sunExposure: "medium" as SunExposureLevel,
} as const;
