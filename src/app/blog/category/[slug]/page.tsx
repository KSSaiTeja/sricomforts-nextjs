import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPage } from "@/components/blog/BlogPage";
import { getBlogCategory, type BlogCategorySlug } from "@/data/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return [
    { slug: "sustainability" },
    { slug: "maintenance-and-tips" },
    { slug: "energy-efficiency" },
    { slug: "buying-guides" },
    { slug: "project-spotlights" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getBlogCategory(slug);
  if (!category) return { title: "Blog | Sri\u00A0Comforts" };

  return {
    title: `${category.label} | Sri\u00A0Comforts Blog`,
    description: `${category.label} articles from Sri\u00A0Comforts — HVAC insights for South India.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const category = getBlogCategory(slug);
  if (!category) notFound();

  return (
    <BlogPage
      initialCategory={category.slug as BlogCategorySlug}
      title={category.label}
    />
  );
}
