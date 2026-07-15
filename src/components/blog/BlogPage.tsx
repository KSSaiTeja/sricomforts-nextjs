"use client";

import { ContactCta } from "@/components/shared/ContactCta";
import { BlogListing } from "@/components/blog/BlogListing";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { BlogCategorySlug } from "@/data/blog";
import { useSvh } from "@/hooks/useSvh";

type BlogPageProps = {
  initialCategory?: BlogCategorySlug;
  title?: string;
};

export function BlogPage({ initialCategory, title }: BlogPageProps) {
  useSvh();

  return (
    <div id="app" className="blog-page">
      <SiteHeader />
      <main>
        <div className="content-wrapper">
          <div className="content__wrapper">
            <BlogListing
              key={initialCategory ?? "all"}
              initialCategory={initialCategory}
              title={title}
            />
          </div>
          <ContactCta />
          <SiteFooter static />
        </div>
      </main>
    </div>
  );
}
