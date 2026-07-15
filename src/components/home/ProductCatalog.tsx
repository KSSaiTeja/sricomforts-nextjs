"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
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
import { useHorizontalDragScroll } from "@/hooks/useHorizontalDragScroll";
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

function formatIndex(value: number) {
  return String(value).padStart(2, "0");
}

function categoryLabel(id: string) {
  return (
    productCatalogFilters.find((filter) => filter.id === id)?.label ?? id
  );
}

export function ProductCatalog() {
  const [activeFilter, setActiveFilter] = useState<ProductCatalogFilter>("all");
  const [activeId, setActiveId] = useState(productCatalogItems[0]?.id ?? "");
  const activeIndexButtonRef = useRef<HTMLButtonElement | null>(null);
  const indexListRef = useRef<HTMLUListElement | null>(null);
  const { headerRef, sectionRef } =
    useAnimatedStrong<HTMLHeadingElement, HTMLElement>();

  useHorizontalDragScroll(indexListRef, { snap: false });

  const visibleProducts = useMemo(
    () => filterProductCatalogItems(productCatalogItems, activeFilter),
    [activeFilter],
  );

  const activeIndex = Math.max(
    0,
    visibleProducts.findIndex((product) => product.id === activeId),
  );
  const activeProduct: ProductCatalogItem | undefined =
    visibleProducts[activeIndex] ?? visibleProducts[0];

  useEffect(() => {
    if (!visibleProducts.length) {
      setActiveId("");
      return;
    }

    if (!visibleProducts.some((product) => product.id === activeId)) {
      setActiveId(visibleProducts[0].id);
    }
  }, [activeId, visibleProducts]);

  useEffect(() => {
    activeIndexButtonRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "nearest",
      block: "nearest",
    });
  }, [activeId]);

  const selectByOffset = useCallback(
    (offset: number) => {
      if (!visibleProducts.length) return;
      const next =
        (activeIndex + offset + visibleProducts.length) %
        visibleProducts.length;
      setActiveId(visibleProducts[next].id);
    },
    [activeIndex, visibleProducts],
  );

  const onStageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectByOffset(1);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectByOffset(-1);
    }
  };

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

        {activeProduct ? (
          <div
            className={styles.showroom}
            tabIndex={0}
            onKeyDown={onStageKeyDown}
            aria-label="Product showroom. Use arrow keys to browse."
          >
            <aside className={styles.index} aria-label="Product list">
              <p className={styles.indexMeta}>
                <span>{formatIndex(activeIndex + 1)}</span>
                <span className={styles.indexMetaSep}>/</span>
                <span>{formatIndex(visibleProducts.length)}</span>
              </p>

              <ul
                ref={indexListRef}
                className={styles.indexList}
                role="listbox"
              >
                {visibleProducts.map((product, index) => {
                  const isActive = product.id === activeProduct.id;

                  return (
                    <li key={product.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        className={[
                          styles.indexItem,
                          isActive ? styles.indexItemActive : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => setActiveId(product.id)}
                        ref={isActive ? activeIndexButtonRef : undefined}
                      >
                        <span className={styles.indexNum}>
                          {formatIndex(index + 1)}
                        </span>
                        <span className={styles.indexName}>{product.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            <div
              className={styles.stage}
              key={activeProduct.id}
              data-tone={activeProduct.categories[0]}
            >
              <div className={styles.stageGlow} aria-hidden="true" />

              <div className={styles.stageTop}>
                {activeProduct.isNewLaunch ? (
                  <span className={styles.badge}>New launch</span>
                ) : (
                  <span className={styles.badgeQuiet}>In catalog</span>
                )}
                <div className={styles.stageNav}>
                  <button
                    type="button"
                    className={styles.navBtn}
                    aria-label="Previous product"
                    onClick={() => selectByOffset(-1)}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className={styles.navBtn}
                    aria-label="Next product"
                    onClick={() => selectByOffset(1)}
                  >
                    ↓
                  </button>
                </div>
              </div>

              <div className={styles.stageVisual}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.stageImage}
                  src={PRODUCT_BENTO_IMAGE}
                  alt={activeProduct.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className={styles.stageCopy}>
                <div className={styles.stageTags}>
                  {activeProduct.categories.slice(0, 2).map((category) => (
                    <span key={category} className={styles.tag}>
                      {categoryLabel(category)}
                    </span>
                  ))}
                </div>
                <h3 className={styles.stageTitle}>{activeProduct.name}</h3>
                <p className={styles.stageTagline}>{activeProduct.tagline}</p>

                <dl className={styles.specs} aria-label={`${activeProduct.name} specifications`}>
                  {activeProduct.specs.map((spec, index) => (
                    <div
                      key={spec.label}
                      className={[
                        styles.spec,
                        index === 0 ? styles.specHero : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <dd className={styles.specValue}>{spec.value}</dd>
                      <dt className={styles.specLabel}>{spec.label}</dt>
                    </div>
                  ))}
                </dl>

                <Link href={activeProduct.href} className={styles.stageCta}>
                  <span>{PRODUCT_VIEW_LABEL}</span>
                  <span className={styles.stageCtaArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p className={styles.empty}>
            No products match this filter yet. Try another category.
          </p>
        )}
      </div>
    </section>
  );
}
