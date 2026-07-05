"use client";

import Image from "next/image";
import { type FormEvent, useId, useState } from "react";
import { promoBannerDownload } from "@/data/contact";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function triggerAssetDownload(url: string) {
  const filename = url.split("/").pop()?.split("?")[0] || "download";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch asset (${response.status})`);
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(objectUrl);
  } catch {
    window.open(url, "_blank", "noopener");
  }
}

export function PromoBannerDownload() {
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

    setIsSubmitted(true);
    setIsSubmitting(false);
    void triggerAssetDownload(promoBannerDownload.assetUrl);
  };

  return (
    <div className="promo-banner-card is-theme-light">
      <div className="promo-banner-card__inner">
        <div className="promo-banner-card__content">
          <p className="body-4">{promoBannerDownload.eyebrow}</p>
          <h3 className="title-h2">{promoBannerDownload.title}</h3>

          {isSubmitted ? (
            <div className="promo-banner-card__success" role="status">
              {promoBannerDownload.successMessage}
            </div>
          ) : (
            <form
              className="promo-banner-card__form"
              aria-busy={isSubmitting}
              noValidate
              onSubmit={handleSubmit}
              onInput={() => setError("")}
            >
              <div className="promo-banner-card__form-row">
                <div className="promo-banner-card__field">
                  <label htmlFor={inputId} className="promo-banner-card__label">
                    {promoBannerDownload.emailLabel} *
                  </label>
                  <input
                    id={inputId}
                    className="promo-banner-card__input"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    placeholder={promoBannerDownload.emailPlaceholder}
                    value={email}
                    aria-describedby={error ? messageId : undefined}
                    aria-invalid={error ? true : undefined}
                    disabled={isSubmitting}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                  />
                </div>
                <button
                  type="submit"
                  className={[
                    "promo-banner-card__submit",
                    "label-4",
                    isSubmitting ? "is-loading" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? promoBannerDownload.submittingLabel
                    : promoBannerDownload.submitLabel}
                </button>
              </div>
              {error ? (
                <span
                  id={messageId}
                  className="promo-banner-card__message is-error"
                  role="alert"
                >
                  {error}
                </span>
              ) : null}
            </form>
          )}
        </div>

        <div className="promo-banner-card__media" aria-hidden>
          <div className="media-el image">
            <picture className="media-wrapper lg">
              <Image
                src={promoBannerDownload.image.src}
                alt={promoBannerDownload.image.alt}
                width={1920}
                height={1080}
                className="promo-banner-card__image"
                sizes="(max-width: 1023px) 985px, 1920px"
                priority={false}
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
}
