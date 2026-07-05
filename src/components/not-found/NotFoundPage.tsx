"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BackgroundCanvas } from "@/components/solutions/BackgroundCanvas";
import { CrossFlicker } from "@/components/home/CrossFlicker";
import { NotchSection } from "@/components/home/NotchSection";
import { PathBackground } from "@/components/preloader/PathBackground";
import { usePreloader } from "@/components/preloader/PreloaderProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useAnimatedStrong } from "@/hooks/useAnimatedStrong";
import { useSvh } from "@/hooks/useSvh";
import { registerGsap } from "@/lib/gsap/register";

function CornerCrosses() {
  return (
    <div className="not-found__crosses" aria-hidden>
      <div className="cross__wrapper top-left">
        <CrossFlicker />
      </div>
      <div className="cross__wrapper top-right">
        <CrossFlicker />
      </div>
      <div className="cross__wrapper bottom-right">
        <CrossFlicker />
      </div>
      <div className="cross__wrapper bottom-left">
        <CrossFlicker />
      </div>
    </div>
  );
}

export function NotFoundPage() {
  useSvh();
  const { isLoaded } = usePreloader();
  const { headerRef, sectionRef } = useAnimatedStrong<HTMLElement, HTMLDivElement>();
  const codeRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    registerGsap();

    const code = codeRef.current;
    const content = contentRef.current;
    if (!code || !content) return;

    const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });
    timeline.fromTo(code, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0);
    timeline.fromTo(
      content.children,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 },
      0.15,
    );

    return () => {
      timeline.kill();
    };
  }, [isLoaded]);

  return (
    <div id="app" className="not-found-page">
      <SiteHeader />
      <main>
        <div className="content-wrapper">
          <NotchSection>
            <section className="is-fullscreen section__wrapper">
              <div className="background-canvas-wrapper has-background-image" aria-hidden>
                <BackgroundCanvas theme="white" mode="wave" />
              </div>

              <div className="not-found__path" aria-hidden>
                <PathBackground />
              </div>

              <CornerCrosses />

              <div
                ref={sectionRef}
                className="section-introduction si-big"
                aria-labelledby="not-found-label"
              >
                <div ref={contentRef} className="content-wrapper">
                  <div className="section-content">
                    <p id="not-found-label" className="label label-5" role="text">
                      404 — Page not found
                    </p>

                    <p ref={codeRef} className="not-found__code" aria-hidden>
                      404
                    </p>

                    <header
                      ref={headerRef}
                      className="header animated-strong spacing"
                    >
                      <h1 className="title-si">
                        This page <strong>isn&apos;t in our system</strong>
                      </h1>
                    </header>

                    <div className="paragraphs-wrapper">
                      <p className="paragraph body-4">
                        The link may be broken, outdated, or the page may have moved. Let us help
                        you get back to comfort.
                      </p>
                    </div>

                    <nav className="buttons buttons-underlined" aria-label="404 actions">
                      <Link href="/" className="button--underlined link-active-full button label-4">
                        <span className="link-active">Back to Home</span>
                      </Link>
                      <Link
                        href="/contact"
                        className="button--underlined link-active-full button label-4"
                      >
                        <span className="link-active">Contact Us</span>
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>
            </section>
          </NotchSection>
          <SiteFooter static />
        </div>
      </main>
    </div>
  );
}
