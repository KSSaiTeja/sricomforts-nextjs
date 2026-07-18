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
            Size cooling for a room in seconds. Enter area, direction, floor, outdoor
            temperature, occupants, windows, roof, ceiling height, and sun exposure.
            The estimate updates live from our residential split-AC rules.
          </p>
        </header>
        <TonnageCalculator />
      </main>
      <SiteFooter static />
    </div>
  );
}
