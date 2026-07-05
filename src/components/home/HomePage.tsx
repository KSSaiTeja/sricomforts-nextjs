"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SeparatorNotch } from "@/components/home/SeparatorNotch";
import { LogoWall } from "@/components/home/LogoWall";
import { SectionIntroduction } from "@/components/home/SectionIntroduction";
import { FeaturesSteps } from "@/components/home/FeaturesSteps";
import { LogoGrid } from "@/components/home/LogoGrid";
import { FormReference } from "@/components/home/FormReference";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { VideoCarousel } from "@/components/home/VideoCarousel";
import { sectionIntros } from "@/data/homepage";
import { useSvh } from "@/hooks/useSvh";

export function HomePage() {
  useSvh();

  return (
    <div id="app">
      <SiteHeader />
      <main id="app-content">
        <VideoCarousel />
        <SeparatorNotch />
        <LogoWall />
        <SectionIntroduction data={sectionIntros.bridge} />
        <FeaturesSteps />
        <SectionIntroduction data={sectionIntros.industry} />
        <LogoGrid />
        <FormReference />
      </main>
      <SiteFooter static />
    </div>
  );
}
