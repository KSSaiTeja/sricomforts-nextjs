"use client";

import { FormReference } from "@/components/home/FormReference";
import { ContactMap } from "@/components/contact/ContactMap";
import { ContactWaysGrid } from "@/components/contact/ContactWaysGrid";
import { PromoBannerDownload } from "@/components/contact/PromoBannerDownload";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useSvh } from "@/hooks/useSvh";

export function ContactPage() {
  useSvh();

  return (
    <div id="app">
      <SiteHeader />
      <main id="app-content">
        <FormReference paddingTop="header" />
        <ContactMap />
        <PromoBannerDownload />
        <ContactWaysGrid />
      </main>
      <SiteFooter static />
    </div>
  );
}
