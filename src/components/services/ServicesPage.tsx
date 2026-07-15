"use client";

import { NotchSection } from "@/components/home/NotchSection";
import { ContactCta } from "@/components/shared/ContactCta";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ServicesFeaturesCarouselExpandable } from "@/components/services/ServicesFeaturesCarouselExpandable";
import { ServicesFeaturesGrid } from "@/components/services/ServicesFeaturesGrid";
import { ServicesSectionIntro } from "@/components/services/ServicesSectionIntro";
import { SolutionsValue } from "@/components/solutions/SolutionsValue";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { AwardsAchievements } from "@/components/shared/AwardsAchievements";
import { type ServicePageData } from "@/data/services";
import { useSvh } from "@/hooks/useSvh";

type ServicesPageProps = {
  data: ServicePageData;
};

export function ServicesPage({ data }: ServicesPageProps) {
  useSvh();

  return (
    <div id="app" className="services-page">
      <SiteHeader />
      <main>
        <div className="content-wrapper">
          <div className="content__wrapper">
            <NotchSection>
              <ServicesSectionIntro data={data.hero} />
            </NotchSection>

            <NotchSection top={{ from: -1, to: 1 }}>
              <ServicesSectionIntro data={data.darkIntro} />
            </NotchSection>

            <NotchSection>
              <ServicesSectionIntro data={data.breakdownIntro} />
            </NotchSection>

            <ServicesFeaturesGrid data={data.featuresGrid} />
            <ServicesFeaturesCarouselExpandable data={data.platformCarousel} />
            <SolutionsValue data={data.value} />
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
