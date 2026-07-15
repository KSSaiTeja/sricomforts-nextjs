"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SeparatorNotch } from "@/components/home/SeparatorNotch";
import { LogoWall } from "@/components/home/LogoWall";
import { SectionIntroduction } from "@/components/home/SectionIntroduction";
import { StatsBento } from "@/components/home/StatsBento";
import { FeaturesSteps } from "@/components/home/FeaturesSteps";
import { ProductCatalog } from "@/components/home/ProductCatalog";
import { ProjectsCarousel } from "@/components/home/ProjectsCarousel";
import { FormReference } from "@/components/home/FormReference";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { AwardsAchievements } from "@/components/shared/AwardsAchievements";
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
        <ProductCatalog />
        <StatsBento />
        <SectionIntroduction data={sectionIntros.bridge} />
        <FeaturesSteps />
        <SectionIntroduction data={sectionIntros.industry} />
        <ProjectsCarousel />
        <TestimonialsSection />
        <AwardsAchievements />
        <FormReference />
      </main>
      <SiteFooter static />
    </div>
  );
}
