"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import {
  calculateTonnage,
  defaultTonnageInputs,
  parseNumericInput,
  type FloorType,
  type RoofType,
  type RoomDirection,
  type SunExposureLevel,
} from "@/lib/tonnage";
import { siteContact } from "@/data/navigation";

function formatTons(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function formatAdj(n: number) {
  if (n === 0) return "—";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(2)} Ton`;
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  inputMode?: "numeric" | "decimal";
  suffix?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  inputMode = "numeric",
  suffix,
}: FieldProps) {
  return (
    <div className="tonnage-calculator__field">
      <label className="tonnage-calculator__field-label" htmlFor={id}>
        {label}
      </label>
      <div className="tonnage-calculator__input-wrapper">
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          inputMode={inputMode}
          maxLength={maxLength}
          className="tonnage-calculator__input"
          placeholder={placeholder}
        />
        {suffix ? (
          <span className="tonnage-calculator__input-prefix">{suffix}</span>
        ) : null}
      </div>
      <div className="tonnage-calculator__field-line" />
    </div>
  );
}

type SelectFieldProps<T extends string> = {
  id: string;
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
};

function SelectField<T extends string>({
  id,
  label,
  value,
  onChange,
  options,
}: SelectFieldProps<T>) {
  return (
    <div className="tonnage-calculator__field">
      <label className="tonnage-calculator__field-label" htmlFor={id}>
        {label}
      </label>
      <div className="tonnage-calculator__input-wrapper">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className="tonnage-calculator__input tonnage-calculator__select"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="tonnage-calculator__field-line" />
    </div>
  );
}

const DIRECTION_OPTIONS: { value: RoomDirection; label: string }[] = [
  { value: "north", label: "North (+0.00)" },
  { value: "south", label: "South (+0.05)" },
  { value: "east", label: "East (+0.10)" },
  { value: "west", label: "West (+0.20)" },
];

const FLOOR_OPTIONS: { value: FloorType; label: string }[] = [
  { value: "ground", label: "Ground (+0.00)" },
  { value: "middle", label: "Middle (+0.05)" },
  { value: "top", label: "Top (+0.20)" },
];

const ROOF_OPTIONS: { value: RoofType; label: string }[] = [
  { value: "insulated_rcc", label: "Insulated RCC (+0.00)" },
  { value: "normal_rcc", label: "Normal RCC (+0.10)" },
  { value: "metal_asbestos", label: "Metal / Asbestos (+0.30)" },
];

const SUN_OPTIONS: { value: SunExposureLevel; label: string }[] = [
  { value: "low", label: "Low (+0.00)" },
  { value: "medium", label: "Medium (+0.10)" },
  { value: "high", label: "High (+0.20)" },
];

export function TonnageCalculator() {
  const uid = useId();
  const [area, setArea] = useState<string>(defaultTonnageInputs.areaSqFt);
  const [direction, setDirection] = useState<RoomDirection>(
    defaultTonnageInputs.direction,
  );
  const [floor, setFloor] = useState<FloorType>(defaultTonnageInputs.floor);
  const [temperature, setTemperature] = useState<string>(
    defaultTonnageInputs.temperatureC,
  );
  const [occupants, setOccupants] = useState<string>(defaultTonnageInputs.occupants);
  const [windows, setWindows] = useState<string>(defaultTonnageInputs.windows);
  const [roof, setRoof] = useState<RoofType>(defaultTonnageInputs.roof);
  const [ceiling, setCeiling] = useState<string>(defaultTonnageInputs.ceilingHeightFt);
  const [sun, setSun] = useState<SunExposureLevel>(defaultTonnageInputs.sunExposure);

  const result = useMemo(
    () =>
      calculateTonnage({
        areaSqFt: parseNumericInput(area),
        direction,
        floor,
        temperatureC: parseNumericInput(temperature),
        occupants: parseNumericInput(occupants),
        windows: parseNumericInput(windows),
        roof,
        ceilingHeightFt: parseNumericInput(ceiling),
        sunExposure: sun,
      }),
    [area, direction, floor, temperature, occupants, windows, roof, ceiling, sun],
  );

  const { breakdown } = result;

  return (
    <div className="tonnage-calculator">
      <div className="tonnage-calculator__form">
        <div className="tonnage-calculator__header">
          <p className="tonnage-calculator__label">Calculator</p>
          <h2 className="tonnage-calculator__title">Tell us about your room:</h2>
        </div>

        <div className="tonnage-calculator__fields">
          <div className="tonnage-calculator__row">
            <Field
              id={`${uid}-area`}
              label="Room area"
              value={area}
              onChange={setArea}
              placeholder="e.g. 180"
              maxLength={5}
              suffix="sq ft"
            />
            <Field
              id={`${uid}-ceiling`}
              label="Ceiling height"
              value={ceiling}
              onChange={setCeiling}
              placeholder="e.g. 10"
              maxLength={4}
              inputMode="decimal"
              suffix="ft"
            />
          </div>

          <div className="tonnage-calculator__row">
            <Field
              id={`${uid}-temp`}
              label="Outdoor temperature"
              value={temperature}
              onChange={setTemperature}
              placeholder="e.g. 35"
              maxLength={4}
              inputMode="decimal"
              suffix="°C"
            />
            <Field
              id={`${uid}-occupants`}
              label="Occupants"
              value={occupants}
              onChange={setOccupants}
              placeholder="e.g. 3"
              maxLength={2}
            />
          </div>

          <div className="tonnage-calculator__row">
            <Field
              id={`${uid}-windows`}
              label="Windows / glass doors"
              value={windows}
              onChange={setWindows}
              placeholder="e.g. 2"
              maxLength={2}
            />
            <SelectField
              id={`${uid}-direction`}
              label="Room direction"
              value={direction}
              onChange={setDirection}
              options={DIRECTION_OPTIONS}
            />
          </div>

          <div className="tonnage-calculator__row">
            <SelectField
              id={`${uid}-floor`}
              label="Floor"
              value={floor}
              onChange={setFloor}
              options={FLOOR_OPTIONS}
            />
            <SelectField
              id={`${uid}-roof`}
              label="Roof type"
              value={roof}
              onChange={setRoof}
              options={ROOF_OPTIONS}
            />
          </div>

          <div className="tonnage-calculator__row">
            <SelectField
              id={`${uid}-sun`}
              label="Sun exposure"
              value={sun}
              onChange={setSun}
              options={SUN_OPTIONS}
            />
          </div>
        </div>
      </div>

      <div className="tonnage-calculator__results-notch">
        <div className="tonnage-calculator__results">
          <div className="tonnage-calculator__results-bg" aria-hidden />
          <div className="tonnage-calculator__results-content">
            <div className="tonnage-calculator__results-header">
              <div className="tonnage-calculator__results-headline">
                <span className="tonnage-calculator__results-headline-primary">
                  Recommended capacity{" "}
                </span>
                <span className="tonnage-calculator__results-headline-secondary">
                  for this room
                </span>
              </div>
              <div className="tonnage-calculator__results-total">
                {result.needsSeparateCalculation ? (
                  <p className="tonnage-calculator__results-amount">
                    Site survey
                  </p>
                ) : (
                  <p className="tonnage-calculator__results-amount">
                    {formatTons(result.standardSize)}{" "}
                    <span style={{ opacity: 0.75, fontSize: "0.55em" }}>Ton</span>
                  </p>
                )}
                <div className="tonnage-calculator__results-meta">
                  <span className="tonnage-calculator__results-meta-label">
                    {result.needsSeparateCalculation ? "Area over 450 sq ft:" : "Calculated load:"}
                  </span>
                  <span className="tonnage-calculator__results-meta-value">
                    {result.needsSeparateCalculation
                      ? "Calculate separately"
                      : `${formatTons(result.recommendedTons)} Ton`}
                  </span>
                </div>
              </div>
            </div>

            <div className="tonnage-calculator__results-breakdown">
              <p className="tonnage-calculator__results-breakdown-title">
                {result.needsSeparateCalculation
                  ? "Rooms above 450 sq ft need an engineer assessment."
                  : "Load breakdown:"}
              </p>
              {!result.needsSeparateCalculation ? (
                <div className="tonnage-calculator__results-items">
                  <div className="tonnage-calculator__results-item">
                    <p className="tonnage-calculator__results-item-label">
                      Base capacity{" "}
                      <span className="tonnage-calculator__results-item-detail">
                        (from area)
                      </span>
                    </p>
                    <div className="tonnage-calculator__results-item-value">
                      {formatTons(breakdown.baseTons)} Ton
                    </div>
                  </div>
                  <div className="tonnage-calculator__results-item">
                    <p className="tonnage-calculator__results-item-label">Direction</p>
                    <div className="tonnage-calculator__results-item-value">
                      {formatAdj(breakdown.directionAdd)}
                    </div>
                  </div>
                  <div className="tonnage-calculator__results-item">
                    <p className="tonnage-calculator__results-item-label">Floor</p>
                    <div className="tonnage-calculator__results-item-value">
                      {formatAdj(breakdown.floorAdd)}
                    </div>
                  </div>
                  <div className="tonnage-calculator__results-item">
                    <p className="tonnage-calculator__results-item-label">Temperature</p>
                    <div className="tonnage-calculator__results-item-value">
                      {formatAdj(breakdown.temperatureAdd)}
                    </div>
                  </div>
                  <div className="tonnage-calculator__results-item">
                    <p className="tonnage-calculator__results-item-label">Occupants</p>
                    <div className="tonnage-calculator__results-item-value">
                      {formatAdj(breakdown.occupantsAdd)}
                    </div>
                  </div>
                  <div className="tonnage-calculator__results-item">
                    <p className="tonnage-calculator__results-item-label">Windows</p>
                    <div className="tonnage-calculator__results-item-value">
                      {formatAdj(breakdown.windowsAdd)}
                    </div>
                  </div>
                  <div className="tonnage-calculator__results-item">
                    <p className="tonnage-calculator__results-item-label">Roof</p>
                    <div className="tonnage-calculator__results-item-value">
                      {formatAdj(breakdown.roofAdd)}
                    </div>
                  </div>
                  <div className="tonnage-calculator__results-item">
                    <p className="tonnage-calculator__results-item-label">Ceiling height</p>
                    <div className="tonnage-calculator__results-item-value">
                      {formatAdj(breakdown.ceilingAdd)}
                    </div>
                  </div>
                  <div className="tonnage-calculator__results-item">
                    <p className="tonnage-calculator__results-item-label">Sun exposure</p>
                    <div className="tonnage-calculator__results-item-value">
                      {formatAdj(breakdown.sunAdd)}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="tonnage-calculator__cta">
              <div className="tonnage-calculator__cta-header">
                <p className="tonnage-calculator__cta-title">Want a precise design?</p>
                <p className="tonnage-calculator__cta-description">
                  This is a room-level estimate. For multi-room homes and commercial loads,
                  our engineers size systems from a site survey.
                </p>
              </div>
              <div className="tonnage-calculator__cta-form">
                <Link
                  href={siteContact.contactHref}
                  className="tonnage-calculator__cta-button"
                >
                  BOOK ASSESSMENT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
