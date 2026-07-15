"use client";

import { NotchSection } from "@/components/home/NotchSection";
import { SolutionsSectionIntro } from "@/components/solutions/SolutionsSectionIntro";
import { SolutionsSectionsGrid } from "@/components/solutions/SolutionsSectionsGrid";
import { SolutionsValue } from "@/components/solutions/SolutionsValue";
import { SolutionsFeaturesCarousel } from "@/components/solutions/SolutionsFeaturesCarousel";
import { SolutionsCaseStudy } from "@/components/solutions/SolutionsCaseStudy";
import { ContactCta } from "@/components/shared/ContactCta";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { AwardsAchievements } from "@/components/shared/AwardsAchievements";
import { type SolutionPageData } from "@/data/solutions";
import { useSvh } from "@/hooks/useSvh";

type SolutionsPageProps = {
  data: SolutionPageData;
};

export function SolutionsPage({ data }: SolutionsPageProps) {
  useSvh();

  return (
    <div id="app" className="solutions-page">
      <SiteHeader />
      <main>
        <div className="content-wrapper">
          <div className="content__wrapper">
            <NotchSection>
              <SolutionsSectionIntro data={data.hero} />
            </NotchSection>

            <NotchSection>
              <SolutionsSectionsGrid data={data.problem} />
            </NotchSection>

            <NotchSection>
              <SolutionsSectionIntro data={data.solutionIntro} />
            </NotchSection>

            <SolutionsValue data={data.value} />
            <SolutionsFeaturesCarousel data={data.features} />

            <NotchSection>
              <SolutionsSectionsGrid data={data.useCases} />
            </NotchSection>

            <NotchSection>
              <SolutionsCaseStudy data={data.caseStudy} />
            </NotchSection>

            <TestimonialsSection />
            <AwardsAchievements />
          </div>
          <ContactCta />
          <SiteFooter static />
        </div>
      </main>
    </div>
  );
}
