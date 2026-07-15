import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/blog/BlogArticlePage";
import { blogPosts, getBlogPost } from "@/data/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article | Sri\u00A0Comforts" };

  return {
    title: `${post.title} | Sri\u00A0Comforts`,
    description: post.excerpt || post.title,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return <BlogArticlePage post={post} />;
}
