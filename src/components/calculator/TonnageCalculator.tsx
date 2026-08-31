"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import {
  calculateTonnage,
  defaultTonnageInputs,
  parseNumericInput,
} from "@/lib/tonnage";
import { siteContact } from "@/data/navigation";

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

export function TonnageCalculator() {
  const uid = useId();
  const [length, setLength] = useState<string>(defaultTonnageInputs.lengthFt);
  const [width, setWidth] = useState<string>(defaultTonnageInputs.widthFt);
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(
    () =>
      calculateTonnage({
        lengthFt: parseNumericInput(length),
        widthFt: parseNumericInput(width),
      }),
    [length, width],
  );

  return (
    <div className="tonnage-calculator">
      <div className="tonnage-calculator__form">
        <div className="tonnage-calculator__header">
          <p className="tonnage-calculator__label">Calculator</p>
          <h2 className="tonnage-calculator__title">Enter room dimensions:</h2>
        </div>

        <div className="tonnage-calculator__fields">
          <div className="tonnage-calculator__row">
            <Field
              id={`${uid}-length`}
              label="Room Length"
              value={length}
              onChange={setLength}
              placeholder="e.g. 15"
              maxLength={5}
              inputMode="decimal"
              suffix="ft"
            />
            <Field
              id={`${uid}-width`}
              label="Room Width"
              value={width}
              onChange={setWidth}
              placeholder="e.g. 12"
              maxLength={5}
              inputMode="decimal"
              suffix="ft"
            />
          </div>

          <div className="tonnage-calculator__actions">
            <button
              type="button"
              className="tonnage-calculator__calculate-button"
              onClick={() => setHasCalculated(true)}
            >
              Calculate AC Capacity
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
                  {result.requiresHigherCapacity ? (
                    <p className="tonnage-calculator__results-amount">Contact Us</p>
                  ) : result.recommendedCapacity ? (
                    <p className="tonnage-calculator__results-amount">
                      {result.recommendedCapacity}
                    </p>
                  ) : (
                    <p className="tonnage-calculator__results-amount">—</p>
                  )}
                  <div className="tonnage-calculator__results-meta">
                    <span className="tonnage-calculator__results-meta-label">
                      {result.requiresHigherCapacity
                        ? "Capacity note:"
                        : "Calculated room area:"}
                    </span>
                    <span className="tonnage-calculator__results-meta-value">
                      {result.requiresHigherCapacity
                        ? "Higher Capacity Required"
                        : `${result.areaSqFt} sq.ft`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="tonnage-calculator__results-breakdown">
                <p className="tonnage-calculator__results-breakdown-title">
                  {result.requiresHigherCapacity
                    ? "Rooms above 260 sq.ft need custom engineering assessment."
                    : "Calculation summary:"}
                </p>
                {!result.requiresHigherCapacity && result.isValidInput ? (
                  <div className="tonnage-calculator__results-items">
                    <div className="tonnage-calculator__results-item">
                      <p className="tonnage-calculator__results-item-label">
                        Room Dimensions
                      </p>
                      <div className="tonnage-calculator__results-item-value">
                        {length || 0} ft × {width || 0} ft
                      </div>
                    </div>
                    <div className="tonnage-calculator__results-item">
                      <p className="tonnage-calculator__results-item-label">
                        Total Room Area
                      </p>
                      <div className="tonnage-calculator__results-item-value">
                        {result.areaSqFt} sq.ft
                      </div>
                    </div>
                    <div className="tonnage-calculator__results-item">
                      <p className="tonnage-calculator__results-item-label">
                        Available Capacity Match
                      </p>
                      <div className="tonnage-calculator__results-item-value">
                        {result.recommendedCapacity}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="tonnage-calculator__cta">
                <div className="tonnage-calculator__cta-header">
                  <p className="tonnage-calculator__cta-title">Want a site assessment?</p>
                  <p className="tonnage-calculator__cta-description">
                    For multi-room homes, offices, or specialized commercial spaces,
                    Sri Comforts engineers verify heat loads on-site.
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
