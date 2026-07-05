"use client";

import { AboutSectionIntro } from "@/components/about/AboutSectionIntro";
import { AboutFeaturesGrid } from "@/components/about/AboutFeaturesGrid";
import { AboutLeaders } from "@/components/about/AboutLeaders";
import { AboutLogoGrid } from "@/components/about/AboutLogoGrid";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  aboutAdvisors,
  aboutAdvisoryIntro,
  aboutBrandLogos,
  aboutBrandPartners,
  aboutExecutiveLeaders,
  aboutFeaturesGrid,
  aboutLeadersIntro,
  aboutPartnersBackingIntro,
  aboutPartnersIntro,
  aboutSectionAnchors,
  aboutSectionIntro,
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
            <AboutSectionIntro data={aboutSectionIntro} />
            <AboutFeaturesGrid data={aboutFeaturesGrid} id={aboutSectionAnchors.work} />
            <AboutSectionIntro data={aboutStoryValues} />
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
          <SiteFooter static />
        </div>
      </main>
    </div>
  );
}
