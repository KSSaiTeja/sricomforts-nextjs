"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import {
  calculateTonnage,
  defaultTonnageInputs,
  parseNumericInput,
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

const SUN_OPTIONS: { value: SunExposureLevel; label: string }[] = [
  { value: "low", label: "Low (+0.00)" },
  { value: "medium", label: "Medium (+0.10)" },
  { value: "high", label: "High (+0.20)" },
];

export function TonnageCalculator() {
  const uid = useId();
  const [length, setLength] = useState<string>(defaultTonnageInputs.lengthFt);
  const [width, setWidth] = useState<string>(defaultTonnageInputs.widthFt);
  const [occupants, setOccupants] = useState<string>(defaultTonnageInputs.occupants);
  const [sun, setSun] = useState<SunExposureLevel>(defaultTonnageInputs.sunExposure);
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(
    () =>
      calculateTonnage({
        lengthFt: parseNumericInput(length),
        widthFt: parseNumericInput(width),
        occupants: parseNumericInput(occupants),
        sunExposure: sun,
      }),
    [length, width, occupants, sun],
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
              id={`${uid}-length`}
              label="Length"
              value={length}
              onChange={setLength}
              placeholder="e.g. 15"
              maxLength={5}
              inputMode="decimal"
              suffix="ft"
            />
            <Field
              id={`${uid}-width`}
              label="Width"
              value={width}
              onChange={setWidth}
              placeholder="e.g. 12"
              maxLength={5}
              inputMode="decimal"
              suffix="ft"
            />
          </div>

          <div className="tonnage-calculator__row">
            <Field
              id={`${uid}-occupants`}
              label="Occupancy"
              value={occupants}
              onChange={setOccupants}
              placeholder="e.g. 3"
              maxLength={2}
            />
            <SelectField
              id={`${uid}-sun`}
              label="Exposure"
              value={sun}
              onChange={setSun}
              options={SUN_OPTIONS}
            />
          </div>

          <div className="tonnage-calculator__actions">
            <button
              type="button"
              className="tonnage-calculator__calculate-button"
              onClick={() => setHasCalculated(true)}
            >
              Calculate
            </button>
          </div>
        </div>
      </div>

      {hasCalculated ? (
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
                    <p className="tonnage-calculator__results-amount">Site survey</p>
                  ) : (
                    <p className="tonnage-calculator__results-amount">
                      {formatTons(result.standardSize)}{" "}
                      <span style={{ opacity: 0.75, fontSize: "0.55em" }}>Ton</span>
                    </p>
                  )}
                  <div className="tonnage-calculator__results-meta">
                    <span className="tonnage-calculator__results-meta-label">
                      {result.needsSeparateCalculation
                        ? "Area over 450 sq ft:"
                        : "Calculated load:"}
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
                          ({formatTons(breakdown.areaSqFt)} sq ft)
                        </span>
                      </p>
                      <div className="tonnage-calculator__results-item-value">
                        {formatTons(breakdown.baseTons)} Ton
                      </div>
                    </div>
                    <div className="tonnage-calculator__results-item">
                      <p className="tonnage-calculator__results-item-label">Occupancy</p>
                      <div className="tonnage-calculator__results-item-value">
                        {formatAdj(breakdown.occupantsAdd)}
                      </div>
                    </div>
                    <div className="tonnage-calculator__results-item">
                      <p className="tonnage-calculator__results-item-label">Exposure</p>
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
      ) : null}
    </div>
  );
}
