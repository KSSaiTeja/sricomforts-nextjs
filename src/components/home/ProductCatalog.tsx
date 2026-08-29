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
import { ProductImageZoom } from "@/components/home/ProductImageZoom";
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
import { useIsLargeViewport } from "@/hooks/useMediaQuery";
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
  const [variantIndex, setVariantIndex] = useState(0);
  const activeIndexButtonRef = useRef<HTMLButtonElement | null>(null);
  const indexListRef = useRef<HTMLUListElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsLargeViewport();
  const { headerRef, sectionRef } =
    useAnimatedStrong<HTMLHeadingElement, HTMLElement>();

  useHorizontalDragScroll(indexListRef, {
    snap: false,
    enabled: !isDesktop,
  });

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

  const variants = activeProduct?.variants ?? [];
  const activeVariant = variants[variantIndex];
  const displayImage =
    activeVariant?.image ?? activeProduct?.image ?? PRODUCT_BENTO_IMAGE;
  const displayAlt =
    activeVariant?.imageAlt ?? activeProduct?.imageAlt ?? "";
  const displayTagline =
    activeVariant?.tagline ?? activeProduct?.tagline ?? "";
  const displaySpecs = activeVariant?.specs ?? activeProduct?.specs ?? [];

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
    setVariantIndex(0);
  }, [activeId]);

  useEffect(() => {
    const list = indexListRef.current;
    const button = activeIndexButtonRef.current;
    if (!list || !button) return;

    // Scroll only the index rail — never the page (scrollIntoView jumps mobile).
    const listRect = list.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const nextLeft =
      list.scrollLeft + (buttonRect.left - listRect.left) - (listRect.width - buttonRect.width) / 2;

    list.scrollTo({ left: Math.max(0, nextLeft), behavior: "smooth" });
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

  const cycleVariant = useCallback(
    (offset: number) => {
      if (variants.length < 2) return;
      setVariantIndex(
        (current) => (current + offset + variants.length) % variants.length,
      );
    },
    [variants.length],
  );

  const onStageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      selectByOffset(1);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      selectByOffset(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (variants.length > 1) cycleVariant(1);
      else selectByOffset(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (variants.length > 1) cycleVariant(-1);
      else selectByOffset(-1);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="product-catalog-title"
      data-motion-ignore
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
              ref={stageRef}
              data-tone={activeProduct.categories[0]}
            >
              <div className={styles.stageGlow} aria-hidden="true" />
              <div
                className={styles.zoomPane}
                aria-hidden="true"
                role="presentation"
              />

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
                {variants.length > 1 ? (
                  <button
                    type="button"
                    className={`${styles.variantBtn} ${styles.variantBtnPrev}`}
                    aria-label={`Previous, ${variants[(variantIndex - 1 + variants.length) % variants.length].name}`}
                    onClick={() => cycleVariant(-1)}
                  >
                    ‹
                  </button>
                ) : null}

                <ProductImageZoom
                  src={displayImage}
                  alt={displayAlt}
                  stageRef={stageRef}
                />

                {variants.length > 1 ? (
                  <button
                    type="button"
                    className={`${styles.variantBtn} ${styles.variantBtnNext}`}
                    aria-label={`Next, ${variants[(variantIndex + 1) % variants.length].name}`}
                    onClick={() => cycleVariant(1)}
                  >
                    ›
                  </button>
                ) : null}

                {activeVariant ? (
                  <p className={styles.variantLabel}>
                    {activeVariant.name}
                    <span className={styles.variantCount}>
                      {formatIndex(variantIndex + 1)}/{formatIndex(variants.length)}
                    </span>
                  </p>
                ) : null}
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
                <p className={styles.stageTagline}>{displayTagline}</p>

                <dl className={styles.specs} aria-label={`${activeProduct.name} specifications`}>
                  {displaySpecs.map((spec, index) => (
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
