/**
 * Sri Comforts residential split-AC tonnage calculator.
 *
 * Formula (AC_Tonnage_Calculator_Logic.pdf):
 *   Recommended AC = Base + all adjustments
 *   Round to nearest available size: 1, 1.5, 2, 2.5, 3, 4, 5 Ton
 *
 * Area > 450 SFT → needs separate engineering calculation.
 */

export type RoomDirection = "north" | "south" | "east" | "west";
export type FloorType = "ground" | "middle" | "top";
export type RoofType = "insulated_rcc" | "normal_rcc" | "metal_asbestos";
export type SunExposureLevel = "low" | "medium" | "high";

export type TonnageInputs = {
  /** Room area in square feet (Length × Width). */
  areaSqFt: number;
  direction: RoomDirection;
  floor: FloorType;
  /** Outdoor temperature in °C. */
  temperatureC: number;
  occupants: number;
  windows: number;
  roof: RoofType;
  ceilingHeightFt: number;
  sunExposure: SunExposureLevel;
};

export type TonnageBreakdown = {
  baseTons: number;
  directionAdd: number;
  floorAdd: number;
  temperatureAdd: number;
  occupantsAdd: number;
  windowsAdd: number;
  roofAdd: number;
  ceilingAdd: number;
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

const DIRECTION_ADD: Record<RoomDirection, number> = {
  north: 0,
  south: 0.05,
  east: 0.1,
  west: 0.2,
};

const FLOOR_ADD: Record<FloorType, number> = {
  ground: 0,
  middle: 0.05,
  top: 0.2,
};

const ROOF_ADD: Record<RoofType, number> = {
  insulated_rcc: 0,
  normal_rcc: 0.1,
  metal_asbestos: 0.3,
};

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
  if (area <= 450) return 4.0;
  return null;
}

function temperatureAdd(tempC: number): number {
  if (tempC < 30) return 0;
  if (tempC <= 35) return 0.1;
  if (tempC <= 40) return 0.2;
  return 0.3;
}

function occupantsAdd(occupants: number): number {
  const n = Math.max(0, Math.floor(occupants));
  if (n <= 2) return 0;
  if (n <= 4) return 0.1;
  return 0.2; // 5–6 (and 7+ capped at documented max)
}

function windowsAdd(windows: number): number {
  const n = Math.max(0, Math.floor(windows));
  if (n <= 1) return 0;
  if (n === 2) return 0.05;
  if (n === 3) return 0.1;
  return 0.2; // 4+
}

function ceilingAdd(heightFt: number): number {
  if (heightFt <= 10) return 0;
  if (heightFt <= 12) return 0.1;
  return 0.2;
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
  const area = Math.max(0, inputs.areaSqFt);
  const base = baseTonsFromArea(area);
  const needsSeparateCalculation = base === null;

  const directionAdd = DIRECTION_ADD[inputs.direction];
  const floorAdd = FLOOR_ADD[inputs.floor];
  const tempAdd = temperatureAdd(inputs.temperatureC);
  const occAdd = occupantsAdd(inputs.occupants);
  const winAdd = windowsAdd(inputs.windows);
  const roofAdd = ROOF_ADD[inputs.roof];
  const ceilAdd = ceilingAdd(inputs.ceilingHeightFt);
  const sunAdd = SUN_ADD[inputs.sunExposure];

  const totalAdjustments = roundTons(
    directionAdd + floorAdd + tempAdd + occAdd + winAdd + roofAdd + ceilAdd + sunAdd,
  );

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
      baseTons,
      directionAdd,
      floorAdd,
      temperatureAdd: tempAdd,
      occupantsAdd: occAdd,
      windowsAdd: winAdd,
      roofAdd,
      ceilingAdd: ceilAdd,
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
  areaSqFt: "180",
  direction: "south" as RoomDirection,
  floor: "middle" as FloorType,
  temperatureC: "35",
  occupants: "3",
  windows: "2",
  roof: "normal_rcc" as RoofType,
  ceilingHeightFt: "10",
  sunExposure: "medium" as SunExposureLevel,
} as const;
