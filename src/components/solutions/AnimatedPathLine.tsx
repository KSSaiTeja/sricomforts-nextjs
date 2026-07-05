"use client";

import { PathLineFollower } from "@/components/solutions/PathLineFollower";
import type { PathLineRefs } from "@/lib/svg/pathFollower";

type AnimatedPathLineProps = {
  d: string;
  index: number;
  pathsRef?: React.MutableRefObject<PathLineRefs[]>;
  strokeMuted: string;
  strokeBright: string;
  blobFill: string;
  markerStroke: string;
  filterId?: string;
  strokeWidth?: number;
  mutedOpacity?: number;
};

function registerPathLineRef(
  pathsRef: React.MutableRefObject<PathLineRefs[]> | undefined,
  index: number,
  kind: keyof PathLineRefs,
  el: SVGPathElement | SVGGElement | null,
) {
  if (!pathsRef) return;

  if (!pathsRef.current[index]) {
    pathsRef.current[index] = {
      fullPath: null,
      animatedPath: null,
      follower: null,
    };
  }

  pathsRef.current[index][kind] = el as never;
}

export function AnimatedPathLine({
  d,
  index,
  pathsRef,
  strokeMuted,
  strokeBright,
  blobFill,
  markerStroke,
  filterId,
  strokeWidth = 1.5,
  mutedOpacity = 0.2,
}: AnimatedPathLineProps) {
  return (
    <g className="animated-path-line">
      <path
        ref={(el) => registerPathLineRef(pathsRef, index, "fullPath", el)}
        d={d}
        fill="none"
        stroke={strokeMuted}
        strokeWidth={strokeWidth}
        strokeOpacity={mutedOpacity}
      />
      <path
        ref={(el) => registerPathLineRef(pathsRef, index, "animatedPath", el)}
        d={d}
        fill="none"
        stroke={strokeBright}
        strokeWidth={strokeWidth}
        strokeOpacity={0.8}
        strokeLinecap="round"
        filter={filterId ? `url(#${filterId})` : undefined}
        style={{ opacity: 0 }}
      />
      <g
        ref={(el) => registerPathLineRef(pathsRef, index, "follower", el)}
        className="path-line-follower"
        style={{ opacity: 0 }}
      >
        <PathLineFollower
          blobFill={blobFill}
          markerStroke={markerStroke}
          filterId={filterId}
        />
      </g>
    </g>
  );
}
