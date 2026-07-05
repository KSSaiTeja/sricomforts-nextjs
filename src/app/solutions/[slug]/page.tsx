import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionsPage } from "@/components/solutions/SolutionsPage";
import { getSolutionPage, solutionSlugs } from "@/data/solutions";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSolutionPage(slug);
  if (!page) return {};

  return {
    title: page.meta.title,
    description: page.meta.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = getSolutionPage(slug);

  if (!page) {
    notFound();
  }

  return <SolutionsPage data={page} />;
}
