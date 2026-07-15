"use client";

import Link from "next/link";
import { type CSSProperties } from "react";
import { contactCtaSection } from "@/data/contact";
import { useAnimatedStrong } from "@/hooks/useAnimatedStrong";

type ContactCtaProps = {
  paddingTop?: "none" | "lg" | "xl" | "header";
};

export function ContactCta({ paddingTop = "none" }: ContactCtaProps) {
  const { headerRef, sectionRef } = useAnimatedStrong<HTMLDivElement, HTMLDivElement>();
  const { title, subtitle, bullets, trusted, logoStripe, cta, panelTitle, panelBody } =
    contactCtaSection;

  return (
    <div
      ref={sectionRef}
      className={`form-reference form-reference--pt-${paddingTop} form-reference--pb-none`}
    >
      <div className="form-reference__container">
        <div className="form-wrapper form-wrapper--dark">
          <div ref={headerRef} className="form-title animated-strong">
            {title.map((line) => (
              <h2 key={line} className="title-h2">
                <strong>{line}</strong>
              </h2>
            ))}
          </div>

          <div className="form-content contact-cta__content">
            <div className="form-info-column">
              <div className="form-info animated-strong">
                <p>
                  <span>{subtitle}</span>
                </p>
                <ul className="unordered-list">
                  {bullets.map((bullet) => (
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
                  <span style={{ color: "#7F7F7F" }}>{trusted}</span>
                </p>
                <p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoStripe} alt="" />
                </p>
              </div>
            </div>

            <div className="form-section contact-cta__panel">
              <div className="contact-cta__panel-inner">
                <h3 className="contact-cta__panel-title title-h3">{panelTitle}</h3>
                <p className="contact-cta__panel-body">{panelBody}</p>
                <Link
                  href={cta.href}
                  className="button-send label-4 button input-button contact-cta__button"
                  style={
                    {
                      "--hover-bg": "var(--color-brand-accent)",
                      "--hover-color": "var(--color-neutral-white)",
                    } as CSSProperties
                  }
                >
                  {cta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
