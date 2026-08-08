"use client";

import { useEffect, useRef, useState } from "react";
import { pathFromPoints, type PathPoint } from "@/lib/svg/roundedPath";
import { AnimatedPathLine } from "@/components/solutions/AnimatedPathLine";
import type { PathLineRefs } from "@/lib/svg/pathFollower";
import { useAnimatedPathLines } from "@/hooks/useAnimatedPathLines";
import { breakpoints, useMediaQuery } from "@/hooks/useMediaQuery";

type SectionsGridSvgProps = {
  itemCount: number;
  showBottomExtensions?: boolean;
  isDark?: boolean;
  sectionRef?: React.RefObject<HTMLElement | null>;
};

/** Desktop four-column dividers — coordinates use container height, not SVG height. */
function buildFourItemPaths(
  width: number,
  height: number,
  showBottomExtensions: boolean,
): PathPoint[][] {
  const left: PathPoint[] = [
    { x: width * 0.25, y: height * 0.05, radius: 0 },
    { x: width * 0.25, y: height * 0.2, radius: 50 },
    { x: width * 0.25, y: height * 0.75, radius: 50 },
    { x: width * 0.25, y: height, radius: 0 },
  ];
  const center: PathPoint[] = [
    { x: width * 0.5, y: height * 0.05, radius: 0 },
    { x: width * 0.5, y: height * 0.3, radius: 50 },
    { x: width * 0.5, y: height * 0.75, radius: 50 },
    { x: width * 0.5, y: height, radius: 0 },
  ];
  const right: PathPoint[] = [
    { x: width * 0.75, y: height * 0.05, radius: 0 },
    { x: width * 0.75, y: height * 0.2, radius: 50 },
    { x: width * 0.75, y: height * 0.75, radius: 50 },
    { x: width * 0.75, y: height, radius: 0 },
  ];

  if (showBottomExtensions) {
    left.push(
      { x: width * 0.25, y: height * 1.1, radius: 120 },
      { x: width * 0.5, y: height * 1.4, radius: 10 },
      { x: width * 0.5, y: height * 1.7, radius: 0 },
    );
    center.push(
      { x: width * 0.5, y: height * 1.1, radius: 120 },
      { x: width * 0.5, y: height * 1.4, radius: 10 },
      { x: width * 0.5, y: height * 1.7, radius: 0 },
    );
    right.push(
      { x: width * 0.75, y: height * 1.1, radius: 120 },
      { x: width * 0.5, y: height * 1.4, radius: 10 },
      { x: width * 0.5, y: height * 1.7, radius: 0 },
    );
  }

  return [left, center, right];
}

/** Mobile stacked layout — horizontal separators between items. */
function buildStackedPaths(width: number, height: number, itemCount: number): PathPoint[][] {
  if (itemCount < 2 || height <= 0 || width <= 0) return [];

  const paths: PathPoint[][] = [];
  for (let i = 1; i < itemCount; i++) {
    const y = (height / itemCount) * i;
    paths.push([
      { x: width * 0.06, y, radius: 0 },
      { x: width * 0.5, y, radius: 18 },
      { x: width * 0.94, y, radius: 0 },
    ]);
  }
  return paths;
}

export function SectionsGridSvg({
  itemCount,
  showBottomExtensions = false,
  isDark = true,
  sectionRef,
}: SectionsGridSvgProps) {
  // Match sections-grid.css four-column breakpoint (1280px), not lg (1024).
  const isFourColumn = useMediaQuery(`(min-width: ${breakpoints.xl}px)`, false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<PathLineRefs[]>([]);
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });

  const strokeMuted = isDark ? "var(--color-brand-neon)" : "var(--color-neutral-mid)";
  const strokeBright = isDark ? "var(--color-brand-neon)" : "var(--color-brand-ink)";
  const blobFill = isDark ? "var(--color-brand-neon)" : "var(--color-brand-accent-on-dark)";

  const containerHeight = dimensions.height;
  const containerWidth = dimensions.width;
  const svgHeight =
    isFourColumn && showBottomExtensions ? containerHeight * 1.8 : containerHeight * 1.25;

  const pathPoints =
    itemCount === 4 && isFourColumn
      ? buildFourItemPaths(containerWidth, containerHeight, showBottomExtensions)
      : buildStackedPaths(containerWidth, containerHeight, itemCount);

  const paths = pathPoints.map((points) =>
    pathFromPoints(points, { width: containerWidth, height: svgHeight }),
  );

  const triggerRef = sectionRef ?? containerRef;

  useAnimatedPathLines({
    triggerRef,
    paths: pathsRef,
    stagger: 0.5,
    config: {
      enterDuration: 3,
      loopDuration: 3,
      dashRatio: 0.12,
    },
  });

  useEffect(() => {
    const container = containerRef.current?.parentElement;
    if (!container) return;

    const update = () => {
      setDimensions({
        width: container.clientWidth || 1,
        height: container.clientHeight || 1,
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  if (paths.length === 0) {
    return <svg className="sections-grid__svg" aria-hidden />;
  }

  return (
    <div ref={containerRef} style={{ display: "contents" }}>
      <svg
        width={containerWidth}
        height={svgHeight}
        viewBox={`0 0 ${containerWidth} ${svgHeight}`}
        className="sections-grid__svg"
        aria-hidden
      >
        <defs>
          <filter
            id="sections-grid-glow"
            x="0"
            y="0"
            width="155"
            height="89"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="15" />
          </filter>
        </defs>
        {paths.map((path, index) => (
          <AnimatedPathLine
            key={`${isFourColumn ? "desktop" : "mobile"}-${index}`}
            d={path}
            index={index}
            pathsRef={pathsRef}
            strokeMuted={strokeMuted}
            strokeBright={strokeBright}
            blobFill={blobFill}
            markerStroke={strokeBright}
            filterId="sections-grid-glow"
            mutedOpacity={0.12}
          />
        ))}
      </svg>
    </div>
  );
}
