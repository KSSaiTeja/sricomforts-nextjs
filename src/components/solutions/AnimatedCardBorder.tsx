"use client";

import { useId } from "react";
import {
  VALUE_CARD_BORDER_PATHS,
  VALUE_CARD_CLIP_PATHS,
  VARIANT2_BORDER_PATHS,
} from "@/lib/svg/solutionsBorderPaths";
import { AnimatedPathLine } from "@/components/solutions/AnimatedPathLine";
import type { PathLineRefs } from "@/lib/svg/pathFollower";

type AnimatedCardBorderProps = {
  children: React.ReactNode;
  index: number;
  variant?: "value" | "variant2";
  className?: string;
  innerClassName?: string;
  pathsRef?: React.MutableRefObject<PathLineRefs[]>;
};

export function AnimatedCardBorder({
  children,
  index,
  variant = "value",
  className = "",
  innerClassName = "solutions-value__card-inner",
  pathsRef,
}: AnimatedCardBorderProps) {
  const uid = useId().replace(/:/g, "");
  const filterId = `glow-filter-${uid}-${index}`;
  const clipId = `card-clip-path-${uid}-${index}`;

  const isValue = variant === "value";
  const clipPath = VALUE_CARD_CLIP_PATHS[index % VALUE_CARD_CLIP_PATHS.length];
  const borderPath = isValue
    ? VALUE_CARD_BORDER_PATHS[index % VALUE_CARD_BORDER_PATHS.length]
    : VARIANT2_BORDER_PATHS[index % VARIANT2_BORDER_PATHS.length];
  const viewBox = isValue ? "0 0 730 531" : "0 0 563 310";
  const svgClass = isValue
    ? "solutions-value__card-border-animation"
    : "sections-grid-variant2__border-animation";

  return (
    <div className={className || undefined}>
      {isValue ? (
        <svg
          className="solutions-value__clip-svg"
          width="0"
          height="0"
          aria-hidden
          style={{ position: "absolute", pointerEvents: "none" }}
        >
          <defs>
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path d={clipPath} />
            </clipPath>
          </defs>
        </svg>
      ) : null}

      <div
        className={innerClassName}
        style={isValue ? { clipPath: `url(#${clipId})` } : undefined}
      >
        {children}
      </div>

      <svg
        className={svgClass}
        width="100%"
        height="100%"
        viewBox={viewBox}
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <filter
            id={filterId}
            x="0"
            y="0"
            width="155"
            height="89"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="17" />
          </filter>
        </defs>
        <AnimatedPathLine
          d={borderPath}
          index={index}
          pathsRef={pathsRef}
          strokeMuted="var(--color-brand-ink)"
          strokeBright="var(--color-brand-accent-on-dark)"
          blobFill="var(--color-brand-accent-on-dark)"
          markerStroke="var(--color-brand-ink)"
          filterId={filterId}
          mutedOpacity={0.2}
        />
      </svg>
    </div>
  );
}
