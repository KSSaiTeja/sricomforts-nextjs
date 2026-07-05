"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  filterProductCatalogItems,
  PRODUCT_BENTO_IMAGE,
  PRODUCT_VIEW_LABEL,
  productCatalogFilters,
  productCatalogItems,
  type ProductCatalogFilter,
  type ProductCatalogItem,
} from "@/data/productCatalog";
import { sectionIntros, type TitlePart } from "@/data/homepage";
import { useAnimatedStrong } from "@/hooks/useAnimatedStrong";
import styles from "@/components/home/product-catalog.module.css";

const intro = sectionIntros.productCatalog;

function renderTitle(title: string | TitlePart[]) {
  if (typeof title === "string") return title;

  return title.map((part, index) => {
    if (typeof part === "string") {
      return <span key={`${index}-${part}`}>{part}</span>;
    }

    return <strong key={`${index}-${part.strong}`}>{part.strong}</strong>;
  });
}

function ProductCard({ product }: { product: ProductCatalogItem }) {
  return (
    <Link
      href={product.href}
      className={styles.card}
      aria-label={`View ${product.name}`}
    >
      <div className={styles.imageWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.image}
          src={PRODUCT_BENTO_IMAGE}
          alt={product.imageAlt}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.viewCta} aria-hidden="true">
          <span className={styles.viewCtaText}>{PRODUCT_VIEW_LABEL}</span>
        </span>
      </div>
      <div className={styles.meta}>
        {product.isNewLaunch ? (
          <span className={styles.badge}>New Launch</span>
        ) : null}
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.tagline}>{product.tagline}</p>
      </div>
    </Link>
  );
}

export function ProductCatalog() {
  const [activeFilter, setActiveFilter] = useState<ProductCatalogFilter>("all");
  const { headerRef, sectionRef } = useAnimatedStrong<HTMLHeadingElement, HTMLElement>();

  const visibleProducts = useMemo(
    () => filterProductCatalogItems(productCatalogItems, activeFilter),
    [activeFilter],
  );

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="product-catalog-title"
    >
      <div className={styles.contentWindow}>
        <header className={styles.header}>
          <p className={`label label-5 ${styles.label}`}>{intro.label}</p>
          <h2
            id="product-catalog-title"
            ref={headerRef}
            className={`title-si animated-strong ${styles.title}`}
          >
            {renderTitle(intro.title)}
          </h2>
        </header>

        <div
          className={styles.filtersWrapper}
          role="tablist"
          aria-label="Product categories"
        >
          <div className={styles.filters}>
            {productCatalogFilters.map((filter) => {
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={[styles.filter, isActive ? styles.filterActive : ""]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.grid}>
          {visibleProducts.length ? (
            visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className={styles.empty}>
              No products match this filter yet. Try another category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
