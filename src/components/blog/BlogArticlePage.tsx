"use client";

import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/shared/ContactCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  formatBlogDate,
  getCategoryLabel,
  type BlogPost,
} from "@/data/blog";
import { useSvh } from "@/hooks/useSvh";

type BlogArticlePageProps = {
  post: BlogPost;
};

export function BlogArticlePage({ post }: BlogArticlePageProps) {
  useSvh();

  return (
    <div id="app" className="blog-page">
      <SiteHeader />
      <main>
        <div className="content-wrapper">
          <div className="content__wrapper">
            <article className="blog-article">
              <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
                <ol className="blog-breadcrumbs__list">
                  <li className="blog-breadcrumbs__item">
                    <Link href="/blog" className="blog-breadcrumbs__link">
                      All Articles
                    </Link>
                    <span className="blog-breadcrumbs__sep" aria-hidden="true">
                      /
                    </span>
                  </li>
                  <li className="blog-breadcrumbs__item">
                    <Link
                      href={`/blog/category/${post.category}`}
                      className="blog-breadcrumbs__link"
                    >
                      {getCategoryLabel(post.category)}
                    </Link>
                    <span className="blog-breadcrumbs__sep" aria-hidden="true">
                      /
                    </span>
                  </li>
                  <li className="blog-breadcrumbs__item">
                    <span className="blog-breadcrumbs__current" aria-current="page">
                      Article
                    </span>
                  </li>
                </ol>
              </nav>

              <p className="blog-article__category">{getCategoryLabel(post.category)}</p>
              <h1 className="blog-article__title">{post.title}</h1>
              <time className="blog-article__date" dateTime={post.date}>
                {formatBlogDate(post.date)}
              </time>

              <div className="blog-article__hero">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 960px"
                  className="blog-article__image"
                />
              </div>

              <div className="blog-article__body">
                {post.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>

              <Link href="/blog" className="blog-article__back label-4">
                <span className="link-active">Back to all articles</span>
              </Link>
            </article>
          </div>
          <ContactCta />
          <SiteFooter static />
        </div>
      </main>
    </div>
  );
}
