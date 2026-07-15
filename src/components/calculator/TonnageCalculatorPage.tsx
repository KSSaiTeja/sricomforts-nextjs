"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TonnageCalculator } from "@/components/calculator/TonnageCalculator";
import { useSvh } from "@/hooks/useSvh";

export function TonnageCalculatorPage() {
  useSvh();

  return (
    <div id="app" className="tonnage-calculator__page">
      <SiteHeader />
      <main id="app-content">
        <header className="tonnage-calculator__intro">
          <p className="tonnage-calculator__intro-eyebrow">Resources</p>
          <h1 className="tonnage-calculator__intro-title">AC Tonnage Calculator</h1>
          <p className="tonnage-calculator__intro-body">
            Size cooling for a room in seconds. Adjust area, height, people, glass,
            and sun load. The estimate updates live so you can compare options before
            you buy or book a survey.
          </p>
        </header>
        <TonnageCalculator />
      </main>
      <SiteFooter static />
    </div>
  );
}
