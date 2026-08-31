/**
 * Sri Comforts AC Tonnage Calculator Logic
 *
 * Available AC Capacities: 1 TR, 1.5 TR, 1.8 TR, and 2 TR
 *
 * Calculation Rules:
 *  Step 1: Room Area = Length × Width
 *  Step 2: Recommendation:
 *    - IF Area <= 120 sq.ft -> Recommend 1 TR
 *    - ELSE IF Area <= 180 sq.ft -> Recommend 1.5 TR
 *    - ELSE IF Area <= 220 sq.ft -> Recommend 1.8 TR
 *    - ELSE IF Area <= 260 sq.ft -> Recommend 2 TR
 *    - ELSE -> Contact Us / Higher Capacity Required
 */

export type AvailableCapacity = "1 TR" | "1.5 TR" | "1.8 TR" | "2 TR";

export type TonnageInputs = {
  /** Room length in feet. */
  lengthFt: number;
  /** Room width in feet. */
  widthFt: number;
};

export type TonnageResult = {
  /** Calculated room area in sq.ft (length × width). */
  areaSqFt: number;
  /** Recommended capacity string (e.g. "1.5 TR") or null when exceeding 260 sq.ft. */
  recommendedCapacity: AvailableCapacity | null;
  /** Numeric tonnage value (1, 1.5, 1.8, 2) or null if > 260 sq.ft. */
  tonnageValue: number | null;
  /** Display label for the recommendation. */
  displayLabel: string;
  /** True when area > 260 sq.ft, requiring higher capacity / custom assessment. */
  requiresHigherCapacity: boolean;
  /** True if inputs are valid positive numbers. */
  isValidInput: boolean;
};

export const MAX_CALCULATOR_AREA = 260;

/**
 * Calculates recommended AC capacity according to the standard rules:
 * - Up to 120 sq.ft  -> 1 TR
 * - 121–180 sq.ft   -> 1.5 TR
 * - 181–220 sq.ft   -> 1.8 TR
 * - 221–260 sq.ft   -> 2 TR
 * - Above 260 sq.ft -> Contact Us / Higher Capacity Required
 */
export function calculateTonnage(inputs: TonnageInputs): TonnageResult {
  const length = Math.max(0, inputs.lengthFt);
  const width = Math.max(0, inputs.widthFt);
  const area = Math.round(length * width * 100) / 100;
  const isValidInput = length > 0 && width > 0;

  if (!isValidInput || area <= 0) {
    return {
      areaSqFt: 0,
      recommendedCapacity: null,
      tonnageValue: null,
      displayLabel: "—",
      requiresHigherCapacity: false,
      isValidInput: false,
    };
  }

  if (area <= 120) {
    return {
      areaSqFt: area,
      recommendedCapacity: "1 TR",
      tonnageValue: 1.0,
      displayLabel: "1 TR",
      requiresHigherCapacity: false,
      isValidInput: true,
    };
  }

  if (area <= 180) {
    return {
      areaSqFt: area,
      recommendedCapacity: "1.5 TR",
      tonnageValue: 1.5,
      displayLabel: "1.5 TR",
      requiresHigherCapacity: false,
      isValidInput: true,
    };
  }

  if (area <= 220) {
    return {
      areaSqFt: area,
      recommendedCapacity: "1.8 TR",
      tonnageValue: 1.8,
      displayLabel: "1.8 TR",
      requiresHigherCapacity: false,
      isValidInput: true,
    };
  }

  if (area <= 260) {
    return {
      areaSqFt: area,
      recommendedCapacity: "2 TR",
      tonnageValue: 2.0,
      displayLabel: "2 TR",
      requiresHigherCapacity: false,
      isValidInput: true,
    };
  }

  // Above 260 sq.ft
  return {
    areaSqFt: area,
    recommendedCapacity: null,
    tonnageValue: null,
    displayLabel: "Contact Us / Higher Capacity Required",
    requiresHigherCapacity: true,
    isValidInput: true,
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
} as const;
