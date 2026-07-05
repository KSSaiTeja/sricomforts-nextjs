"use client";

import { type FormEvent, useId, useState } from "react";
import { ContactWaysCardBase } from "@/components/contact/ContactWaysCardBase";
import type { CardNotchConfig } from "@/lib/svg/cardClipPath";

type ContactWaysCardSubscribeProps = {
  title: string;
  theme: "light" | "dark";
  emailLabel: string;
  emailPlaceholder: string;
  submitLabel: string;
  successMessage: string;
  notch?: CardNotchConfig;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactWaysCardSubscribe({
  title,
  theme,
  emailLabel,
  emailPlaceholder,
  submitLabel,
  successMessage,
  notch,
}: ContactWaysCardSubscribeProps) {
  const inputId = useId();
  const messageId = useId();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    await new Promise((resolve) => {
      window.setTimeout(resolve, 400);
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className={`contact-ways-card-subscribe is-theme-${theme}`}>
      <ContactWaysCardBase
        theme={theme}
        title={title}
        showArrow={false}
        notch={notch}
      >
        {isSubmitted ? (
          <p className="contact-ways-card-subscribe__success" role="status">
            {successMessage}
          </p>
        ) : (
          <form
            className="contact-ways-card-subscribe__form"
            aria-busy={isSubmitting}
            noValidate
            onSubmit={handleSubmit}
            onInput={() => setError("")}
          >
            <label htmlFor={inputId} className="contact-ways-card-subscribe__label">
              {emailLabel}
            </label>
            <div className="contact-ways-card-subscribe__row">
              <input
                id={inputId}
                className="contact-ways-card-subscribe__input"
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder={emailPlaceholder}
                value={email}
                aria-describedby={error ? messageId : undefined}
                aria-invalid={error ? true : undefined}
                disabled={isSubmitting}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
              <button
                type="submit"
                className="contact-ways-card-subscribe__submit label-4"
                disabled={isSubmitting}
              >
                {submitLabel}
              </button>
            </div>
            {error ? (
              <span
                id={messageId}
                className="contact-ways-card-subscribe__message"
                role="alert"
              >
                {error}
              </span>
            ) : null}
          </form>
        )}
      </ContactWaysCardBase>
    </div>
  );
}
