"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FullLogo } from "@/components/brand/FullLogo";
import { FooterPathBackground } from "@/components/layout/FooterPathBackground";
import { SvgMask } from "@/components/preloader/SvgMask";
import { footerSection } from "@/data/homepage";
import { useIsLargeViewport } from "@/hooks/useMediaQuery";
import { registerGsap } from "@/lib/gsap/register";
import { createNotch, NotchDirection, type Notch } from "@/types/notch";

type SiteFooterProps = {
  static?: boolean;
};

const NOTCH_OFFSET = 30;

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

export function SiteFooter({ static: isStatic = true }: SiteFooterProps) {
  const isDesktop = useIsLargeViewport();
  const heightHolderRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const footerWrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [notches, setNotches] = useState<Notch[]>(() => [
    createNotch(NotchDirection.top, {
      size: 0.65,
      position: 0.5,
      offset: NOTCH_OFFSET,
      radius: 40,
      notchWidth: 0.95,
    }),
  ]);

  useEffect(() => {
    if (isStatic || !isDesktop) return;

    registerGsap();

    const heightHolder = heightHolderRef.current;
    const overlay = overlayRef.current;
    const footerWrapper = footerWrapperRef.current;
    const footer = footerRef.current;

    if (!heightHolder || !overlay || !footerWrapper || !footer) return;

    const syncHeight = () => {
      heightHolder.style.height = `${footer.offsetHeight * 0.8}px`;
      ScrollTrigger.refresh();
    };

    syncHeight();

    const resizeObserver = new ResizeObserver(syncHeight);
    resizeObserver.observe(footer);

    const revealTrigger = ScrollTrigger.create({
      trigger: heightHolder,
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
      onUpdate: ({ progress }) => {
        footerWrapper.style.transform = `translate3d(0, ${lerp(100, 1, progress)}%, 0)`;
        overlay.style.opacity = String(lerp(0, 0.4, progress));
      },
    });

    const notchTrigger = ScrollTrigger.create({
      trigger: heightHolder,
      start: "top bottom",
      end: "top top",
      scrub: true,
      onUpdate: ({ progress }) => {
        setNotches((current) =>
          current.map((notch) =>
            notch.direction === NotchDirection.top
              ? { ...notch, offset: (progress * -2 + 1) * NOTCH_OFFSET }
              : notch,
          ),
        );
      },
    });

    return () => {
      resizeObserver.disconnect();
      revealTrigger.kill();
      notchTrigger.kill();
    };
  }, [isDesktop, isStatic]);

  const staticClass = isStatic ? "--static" : "";

  return (
    <div
      ref={heightHolderRef}
      className={`site-footer footer__height-holder ${staticClass}`.trim()}
    >
      <div
        ref={overlayRef}
        className={`overlay-sticky__wrapper ${staticClass}`.trim()}
        aria-hidden
      />
      <div
        ref={footerWrapperRef}
        className={`footer__wrapper ${staticClass}`.trim()}
      >
        <SvgMask notches={notches} useClip>
          <FooterPathBackground>
            <footer ref={footerRef} className="footer">
              <div className="footer-header">
                <div className="footer-title">
                  <h1>{footerSection.title}</h1>
                </div>
                <Link
                  href={footerSection.cta.href}
                  className="footer-context-cta label-4"
                >
                  {footerSection.cta.label}
                </Link>
              </div>

              <div className="content-wrapper">
                <div className="logo-section">
                  <span className="brand-logo-highlight">
                    <FullLogo className="brand-logo" />
                  </span>
                  <div className="credentials-section">
                    <p className="credentials-text">
                      {footerSection.credentials.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="footer-links">
                  <div className="links-wrapper">
                    <div className="links-list tech-list">
                      <p className="label label-4">
                        <span> Solutions </span>
                      </p>
                      <ul>
                        {footerSection.technologyLinks.map((link) => (
                          <li key={`${link.label}-${link.href}`} className="i-links">
                            <Link href={link.href} className="link link-active">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="links-list company-list">
                      <p className="label label-4">
                        <span> Company </span>
                      </p>
                      <ul>
                        {footerSection.companyLinks.map((link) => (
                          <li key={`${link.label}-${link.href}`} className="i-links">
                            <Link href={link.href} className="link link-active">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="footer-contact">
                  <div className="contact-col">
                    <p className="label label-4">
                      <span> REACH US </span>
                    </p>
                    <Link
                      href={footerSection.contact.href}
                      className="contact-link body-3 link-active"
                    >
                      {footerSection.contact.label}
                    </Link>
                    <Link
                      href={footerSection.contact.phoneHref}
                      className="contact-link body-3 link-active"
                    >
                      {footerSection.contact.phone}
                    </Link>
                    <p className="contact-text body-3">{footerSection.contact.text}</p>
                  </div>
                  <div className="networks">
                    <ul className="networks-list">
                      {footerSection.networks.map((network) => (
                        <li key={network.href} className="network-item">
                          <Link
                            href={network.href}
                            className="network-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={network.icon}
                              alt={network.label.trim() || "social"}
                              width={24}
                              height={24}
                            />
                            <span className="network-label link-active">{network.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="copyright">
                <p>{footerSection.copyright}</p>
                <Link href={footerSection.technicalIndexHref} className="technical-index-link">
                  Awards & Recognition
                </Link>
              </div>

              <div className="credits label-4">
                {footerSection.creditsHref ? (
                  <Link
                    href={footerSection.creditsHref}
                    className="credits-byline link-active"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {footerSection.creditsByline}
                  </Link>
                ) : (
                  <span className="credits-byline">{footerSection.creditsByline}</span>
                )}
              </div>
            </footer>
          </FooterPathBackground>
        </SvgMask>
      </div>
    </div>
  );
}
