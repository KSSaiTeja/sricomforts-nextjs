"use client";

import { AboutHero } from "@/components/about/AboutHero";
import { AboutSectionIntro } from "@/components/about/AboutSectionIntro";
import { AboutFeaturesGrid } from "@/components/about/AboutFeaturesGrid";
import { AboutLeaders } from "@/components/about/AboutLeaders";
import { AboutLogoGrid } from "@/components/about/AboutLogoGrid";
import { AboutStoryValues } from "@/components/about/AboutStoryValues";
import { ContactCta } from "@/components/shared/ContactCta";
import { StatsBento } from "@/components/home/StatsBento";
import { AwardsAchievements } from "@/components/shared/AwardsAchievements";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  aboutAdvisors,
  aboutAdvisoryIntro,
  aboutBrandLogos,
  aboutBrandPartners,
  aboutExecutiveLeaders,
  aboutFeaturesGrid,
  aboutHero,
  aboutLeadersIntro,
  aboutPartnersBackingIntro,
  aboutPartnersIntro,
  aboutSectionAnchors,
  aboutStoryValues,
  aboutTeamCta,
} from "@/data/about";
import { useHashScroll } from "@/hooks/useHashScroll";
import { useSvh } from "@/hooks/useSvh";

export function AboutPage() {
  useSvh();
  useHashScroll();

  return (
    <div id="app" className="about-page">
      <SiteHeader />
      <main>
        <div className="content-wrapper">
          <div className="content__wrapper">
            <AboutHero data={aboutHero} />
            <AboutFeaturesGrid data={aboutFeaturesGrid} id={aboutSectionAnchors.work} />
            <AboutStoryValues data={aboutStoryValues} />
            <StatsBento />
            <AboutSectionIntro data={aboutLeadersIntro} />
            <AboutLeaders data={aboutExecutiveLeaders} />
            <AboutSectionIntro data={aboutPartnersIntro} />
            <AboutLeaders data={aboutBrandPartners} />
            <AboutSectionIntro data={aboutPartnersBackingIntro} />
            <AboutLogoGrid data={aboutBrandLogos} />
            <AboutSectionIntro data={aboutAdvisoryIntro} />
            <AboutLeaders data={aboutAdvisors} />
            <AboutSectionIntro data={aboutTeamCta} />
          </div>
          <TestimonialsSection />
          <AwardsAchievements id={aboutSectionAnchors.awards} />
          <ContactCta />
          <SiteFooter static />
        </div>
      </main>
    </div>
  );
}
