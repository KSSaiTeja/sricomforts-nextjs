"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BLOG_PAGE_SIZE,
  blogCategories,
  blogPosts,
  formatBlogDate,
  getCategoryLabel,
  type BlogCategorySlug,
  type BlogPost,
} from "@/data/blog";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="blog-card">
      <div className="blog-card__wrapper">
        <Link
          href={`/blog/${post.slug}`}
          className="blog-card__image-link"
          aria-label={`Read more about ${post.title}`}
        >
          <div className="blog-card__image-wrap">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              sizes="(max-width: 1023px) 100vw, (max-width: 1679px) 33vw, 25vw"
              className="blog-card__image"
            />
            <span className="blog-card__button label-4">
              <span className="link-active">Read More</span>
            </span>
          </div>
        </Link>
        <div className="blog-card__content">
          <p className="blog-card__category">{getCategoryLabel(post.category)}</p>
          <Link href={`/blog/${post.slug}`} className="blog-card__title-link">
            <h3 className="blog-card__title">{post.title}</h3>
          </Link>
          {post.excerpt ? <p className="blog-card__excerpt">{post.excerpt}</p> : null}
          <time className="blog-card__date" dateTime={post.date}>
            {formatBlogDate(post.date)}
          </time>
        </div>
      </div>
    </article>
  );
}

type BlogListingProps = {
  initialCategory?: BlogCategorySlug;
  title?: string;
};

export function BlogListing({
  initialCategory,
  title = "All Articles",
}: BlogListingProps) {
  const [category, setCategory] = useState<BlogCategorySlug | "all">(
    initialCategory ?? "all",
  );
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [topicOpen, setTopicOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = submittedQuery.trim().toLowerCase();
    let list = blogPosts.filter((post) => {
      const categoryOk = category === "all" || post.category === category;
      const queryOk =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return categoryOk && queryOk;
    });

    list = [...list].sort((a, b) => {
      const diff = a.date.localeCompare(b.date);
      return sort === "newest" ? -diff : diff;
    });

    return list;
  }, [category, sort, submittedQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / BLOG_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * BLOG_PAGE_SIZE,
    safePage * BLOG_PAGE_SIZE,
  );

  const topicLabel =
    category === "all"
      ? "Topic"
      : blogCategories.find((c) => c.slug === category)?.label ?? "Topic";

  return (
    <section className="blog-listing">
      <div className="blog-listing__header">
        <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
          <ol className="blog-breadcrumbs__list">
            <li className="blog-breadcrumbs__item">
              <span>Resources</span>
              <span className="blog-breadcrumbs__sep" aria-hidden="true">
                /
              </span>
            </li>
            <li className="blog-breadcrumbs__item">
              <span className="blog-breadcrumbs__current" aria-current="page">
                {title}
              </span>
            </li>
          </ol>
        </nav>
        <h1 className="blog-listing__title">{title}</h1>
      </div>

      <div className="blog-listing__bar">
        <div className="blog-listing__topic">
          <button
            type="button"
            className="blog-listing__topic-btn label-4"
            aria-haspopup="listbox"
            aria-expanded={topicOpen}
            onClick={() => setTopicOpen((open) => !open)}
          >
            <span className="link-active">{topicLabel}</span>
          </button>
          {topicOpen ? (
            <ul className="blog-listing__topic-menu" role="listbox">
              <li role="option" aria-selected={category === "all"}>
                <button
                  type="button"
                  onClick={() => {
                    setCategory("all");
                    setPage(1);
                    setTopicOpen(false);
                  }}
                >
                  All topics
                </button>
              </li>
              {blogCategories.map((item) => (
                <li key={item.slug} role="option" aria-selected={category === item.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setCategory(item.slug);
                      setPage(1);
                      setTopicOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="blog-listing__sort" role="group" aria-label="Sort by date">
          <button
            type="button"
            className={["blog-listing__sort-opt", sort === "newest" ? "is-active" : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => {
              setSort("newest");
              setPage(1);
            }}
          >
            Newest
          </button>
          <button
            type="button"
            className={["blog-listing__sort-opt", sort === "oldest" ? "is-active" : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => {
              setSort("oldest");
              setPage(1);
            }}
          >
            Oldest
          </button>
        </div>

        <form
          className="blog-listing__search"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmittedQuery(query);
            setPage(1);
          }}
        >
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <input
            id="blog-search"
            type="search"
            placeholder="Search"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="blog-listing__content">
        {pageItems.length === 0 ? (
          <p className="blog-listing__empty">No articles match your filters.</p>
        ) : (
          <div className="blog-listing__grid">
            {pageItems.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        <nav className="blog-listing__pagination" aria-label="Blog pagination">
          <button
            type="button"
            className="blog-listing__page-btn"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <span className="blog-listing__page-info">
            Page {safePage} of {totalPages} ({filtered.length} posts)
          </span>
          <button
            type="button"
            className="blog-listing__page-btn"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </nav>
      </div>
    </section>
  );
}
