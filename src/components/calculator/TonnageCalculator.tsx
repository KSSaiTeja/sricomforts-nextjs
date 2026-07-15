"use client";

import Link from "next/link";
import { type CSSProperties, useId, useMemo, useState } from "react";
import {
  calculateTonnage,
  defaultTonnageInputs,
  parseNumericInput,
} from "@/lib/tonnage";
import { siteContact } from "@/data/navigation";

function formatBtu(n: number) {
  return n.toLocaleString("en-IN");
}

function formatTons(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  inputMode?: "numeric" | "decimal";
  prefix?: string;
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
  prefix,
  suffix,
}: FieldProps) {
  return (
    <div className="tonnage-calculator__field">
      <label className="tonnage-calculator__field-label" htmlFor={id}>
        {label}
      </label>
      <div className="tonnage-calculator__input-wrapper">
        {prefix ? (
          <span className="tonnage-calculator__input-prefix">{prefix}</span>
        ) : null}
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

export function TonnageCalculator() {
  const uid = useId();
  const [area, setArea] = useState<string>(defaultTonnageInputs.areaSqFt);
  const [ceiling, setCeiling] = useState<string>(defaultTonnageInputs.ceilingHeightFt);
  const [occupants, setOccupants] = useState<string>(defaultTonnageInputs.occupants);
  const [windows, setWindows] = useState<string>(defaultTonnageInputs.windows);
  const [sun, setSun] = useState<number>(defaultTonnageInputs.sunExposure);

  const result = useMemo(
    () =>
      calculateTonnage({
        areaSqFt: parseNumericInput(area),
        ceilingHeightFt: parseNumericInput(ceiling),
        occupants: parseNumericInput(occupants),
        windows: parseNumericInput(windows),
        sunExposure: sun,
      }),
    [area, ceiling, occupants, windows, sun],
  );

  const sliderPct = ((sun - 1) / 9) * 100;

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
              id={`${uid}-occupants`}
              label="Occupants"
              value={occupants}
              onChange={setOccupants}
              placeholder="e.g. 3"
              maxLength={2}
            />
            <Field
              id={`${uid}-windows`}
              label="Windows / glass doors"
              value={windows}
              onChange={setWindows}
              placeholder="e.g. 2"
              maxLength={2}
            />
          </div>

          <div className="tonnage-calculator__field tonnage-calculator__field--full tonnage-calculator__field--slider">
            <label className="tonnage-calculator__field-label" htmlFor={`${uid}-sun`}>
              How much direct sun hits this room?
            </label>
            <div className="tonnage-calculator__slider-wrapper">
              <input
                id={`${uid}-sun`}
                type="range"
                min={1}
                max={10}
                step={1}
                value={sun}
                aria-valuemin={1}
                aria-valuemax={10}
                aria-valuenow={sun}
                aria-label="Sun exposure from shaded to harsh"
                className="tonnage-calculator__slider"
                style={
                  {
                    "--tonnage-slider-pct": `${sliderPct}%`,
                  } as CSSProperties
                }
                onChange={(e) => setSun(Number(e.target.value))}
              />
              <div className="tonnage-calculator__slider-labels">
                <span className="tonnage-calculator__slider-label">1 - SHADED</span>
                <span className="tonnage-calculator__slider-label tonnage-calculator__slider-label--center">
                  5 - TYPICAL
                </span>
                <span className="tonnage-calculator__slider-label tonnage-calculator__slider-label--end">
                  10 - HARSH
                </span>
              </div>
            </div>
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
                <p className="tonnage-calculator__results-amount">
                  {formatTons(result.standardSize)}{" "}
                  <span style={{ opacity: 0.75, fontSize: "0.55em" }}>Ton</span>
                </p>
                <div className="tonnage-calculator__results-meta">
                  <span className="tonnage-calculator__results-meta-label">
                    Est. load:
                  </span>
                  <span className="tonnage-calculator__results-meta-value">
                    {formatBtu(result.btu)} BTU
                  </span>
                </div>
              </div>
            </div>

            <div className="tonnage-calculator__results-breakdown">
              <p className="tonnage-calculator__results-breakdown-title">
                Load breakdown:
              </p>
              <div className="tonnage-calculator__results-items">
                <div className="tonnage-calculator__results-item">
                  <p className="tonnage-calculator__results-item-label">
                    Area & ceiling{" "}
                    <span className="tonnage-calculator__results-item-detail">
                      (base cooling)
                    </span>
                  </p>
                  <div className="tonnage-calculator__results-item-value">
                    {formatBtu(result.breakdown.baseBtu)} BTU
                  </div>
                </div>
                <div className="tonnage-calculator__results-item">
                  <p className="tonnage-calculator__results-item-label">
                    Occupancy load
                  </p>
                  <div className="tonnage-calculator__results-item-value">
                    {formatBtu(result.breakdown.occupancyBtu)} BTU
                  </div>
                </div>
                <div className="tonnage-calculator__results-item">
                  <p className="tonnage-calculator__results-item-label">
                    Glass / windows
                  </p>
                  <div className="tonnage-calculator__results-item-value">
                    {formatBtu(result.breakdown.windowsBtu)} BTU
                  </div>
                </div>
                <div className="tonnage-calculator__results-item">
                  <p className="tonnage-calculator__results-item-label">
                    Sun factor
                  </p>
                  <div className="tonnage-calculator__results-item-value">
                    ×{result.breakdown.sunMultiplier.toFixed(2)}
                  </div>
                </div>
              </div>
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
