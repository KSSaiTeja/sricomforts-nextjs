"use client";

import { type CSSProperties, type FormEvent, useCallback, useRef, useState } from "react";
import { formSection } from "@/data/homepage";
import { useAnimatedStrong } from "@/hooks/useAnimatedStrong";

type FieldConfig = {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "select";
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  width: "half" | "full";
  inputMode?: "numeric";
  options?: readonly string[];
};

const fields: FieldConfig[] = [
  {
    id: "f-name",
    name: "name",
    label: "Full Name",
    placeholder: "John Doe",
    required: true,
    autoComplete: "name",
    width: "half",
  },
  {
    id: "f-role_or_position",
    name: "role_or_position",
    label: "Role or position",
    placeholder: "Project manager",
    required: true,
    autoComplete: "organization-title",
    width: "half",
  },
  {
    id: "f-phone",
    name: "phone",
    label: "Phone number",
    type: "tel",
    placeholder: "+91 98486 29208",
    autoComplete: "tel",
    inputMode: "numeric",
    width: "half",
  },
  {
    id: "f-email",
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "name@email.com",
    required: true,
    autoComplete: "email",
    width: "half",
  },
  {
    id: "f-company",
    name: "company",
    label: "Company name",
    placeholder: "Acme",
    required: true,
    autoComplete: "organization",
    width: "full",
  },
  {
    id: "f-help",
    name: "help",
    label: "How Can We Help?",
    type: "select",
    required: true,
    width: "full",
    options: formSection.helpOptions,
  },
];

function RequiredMark({ required }: { required?: boolean }) {
  if (!required) return null;
  return <span> *</span>;
}

type FormReferenceProps = {
  paddingTop?: "none" | "lg" | "xl" | "header";
};

export function FormReference({ paddingTop = "none" }: FormReferenceProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectValues, setSelectValues] = useState<Record<string, string>>({});
  const { headerRef, sectionRef } = useAnimatedStrong<HTMLDivElement, HTMLDivElement>();

  const syncValidity = useCallback(() => {
    const form = formRef.current;
    setCanSubmit(Boolean(form?.checkValidity()));
  }, []);

  const handleSelectChange = useCallback(
    (fieldId: string, value: string) => {
      setSelectValues((current) => ({ ...current, [fieldId]: value }));
      requestAnimationFrame(() => syncValidity());
    },
    [syncValidity],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current?.checkValidity()) return;
    formRef.current.reset();
    setSelectValues({});
    setCanSubmit(false);
    setIsSubmitted(true);
  };

  const handleSubmitAnother = () => {
    setIsSubmitted(false);
  };

  return (
    <div
      ref={sectionRef}
      className={`form-reference form-reference--pt-${paddingTop} form-reference--pb-none`}
    >
      <div className="form-reference__container">
        <div className="form-wrapper form-wrapper--dark">
          <div ref={headerRef} className="form-title animated-strong">
            {formSection.title.map((line) => (
              <h2 key={line} className="title-h2">
                <strong>{line}</strong>
              </h2>
            ))}
          </div>

          <div className="form-content">
            <div className="form-info-column">
              <div className="form-info animated-strong">
                <p>
                  <span>{formSection.subtitle}</span>
                </p>
                <ul className="unordered-list">
                  {formSection.bullets.map((bullet) => (
                    <li key={bullet}>
                      <p>
                        <span>{bullet}</span>
                      </p>
                    </li>
                  ))}
                </ul>
                <p>
                  <br />
                  <br />
                  <span style={{ color: "#7F7F7F" }}>{formSection.trusted}</span>
                </p>
                <p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formSection.logoStripe} alt="" />
                </p>
              </div>
            </div>

            <div id="website-contact-form" className="form-section">
              {isSubmitted ? (
                <div className="message-full-replacement">
                  <div className="message-card message-card--success">
                    <p className="message-card__text">{formSection.successMessage}</p>
                    <button
                      type="button"
                      className="message-card__button message-card__button--secondary label-4"
                      onClick={handleSubmitAnother}
                    >
                      Submit another request
                    </button>
                  </div>
                </div>
              ) : (
              <form ref={formRef} onSubmit={handleSubmit} onInput={syncValidity} onChange={syncValidity}>
                <div className="step-content">
                  <div className="fields-grid">
                    {fields.map((field) => (
                      <div
                        key={field.id}
                        className={[
                          "field-col",
                          field.width === "full" ? "field-col--full" : "field-col--half",
                        ].join(" ")}
                      >
                        <div className="field-wrapper" data-width={field.width}>
                          <label className="label" htmlFor={field.id}>
                            {field.label}
                            <RequiredMark required={field.required} />
                          </label>
                          {field.type === "select" ? (
                            <select
                              id={field.id}
                              name={field.name}
                              className={[
                                "field",
                                "select-field",
                                selectValues[field.id] ? "picked" : "",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              required={field.required}
                              value={selectValues[field.id] ?? ""}
                              onChange={(event) =>
                                handleSelectChange(field.id, event.currentTarget.value)
                              }
                            >
                              <option value="" disabled hidden>
                                Select options
                              </option>
                              {field.options?.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              id={field.id}
                              name={field.name}
                              className="field"
                              type={field.type ?? "text"}
                              placeholder={field.placeholder}
                              required={field.required}
                              autoComplete={field.autoComplete}
                              inputMode={field.inputMode}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-navigation">
                  <div className="navigation-buttons">
                    <input
                      type="submit"
                      className="button-send label-4 button input-button"
                      value="SUBMIT"
                      disabled={!canSubmit}
                      data-form-id="website-contact-form"
                      style={
                        {
                          "--hover-bg": "var(--color-brand-accent)",
                          "--hover-color": "var(--color-neutral-white)",
                        } as CSSProperties
                      }
                    />
                  </div>
                </div>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
