"use client";

import { useEffect, useRef, useState } from "react";
import { pathFromPoints, type PathPoint } from "@/lib/svg/roundedPath";
import { AnimatedPathLine } from "@/components/solutions/AnimatedPathLine";
import type { PathLineRefs } from "@/lib/svg/pathFollower";
import { useAnimatedPathLines } from "@/hooks/useAnimatedPathLines";
import { useIsLargeViewport } from "@/hooks/useMediaQuery";

type SectionsGridSvgProps = {
  itemCount: number;
  showBottomExtensions?: boolean;
  isDark?: boolean;
  sectionRef?: React.RefObject<HTMLElement | null>;
};

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

export function SectionsGridSvg({
  itemCount,
  showBottomExtensions = false,
  isDark = true,
  sectionRef,
}: SectionsGridSvgProps) {
  const isDesktop = useIsLargeViewport();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<PathLineRefs[]>([]);
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });

  const strokeMuted = isDark ? "var(--color-brand-neon)" : "var(--color-neutral-mid)";
  const strokeBright = isDark ? "var(--color-brand-neon)" : "var(--color-brand-ink)";
  const blobFill = isDark ? "var(--color-brand-neon)" : "var(--color-brand-accent-on-dark)";

  const svgHeight = dimensions.height * (showBottomExtensions ? 1.8 : 1.25);

  const pathPoints =
    itemCount === 4 && isDesktop
      ? buildFourItemPaths(dimensions.width, svgHeight, showBottomExtensions)
      : [];

  const paths = pathPoints.map((points) =>
    pathFromPoints(points, { width: dimensions.width, height: svgHeight }),
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
        width={dimensions.width}
        height={svgHeight}
        viewBox={`0 0 ${dimensions.width} ${svgHeight}`}
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
            key={index}
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
