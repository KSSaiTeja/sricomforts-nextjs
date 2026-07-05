import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicesPage } from "@/components/services/ServicesPage";
import { getServicePage, serviceSlugs } from "@/data/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};

  return {
    title: page.meta.title,
    description: page.meta.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = getServicePage(slug);

  if (!page) {
    notFound();
  }

  return <ServicesPage data={page} />;
}
