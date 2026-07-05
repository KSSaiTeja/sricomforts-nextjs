"use client";

import { PATH_BLOB_CENTER, PATH_BLOB_D } from "@/lib/svg/pathFollower";

type PathLineFollowerProps = {
  blobFill: string;
  markerStroke: string;
  filterId?: string;
};

export function PathLineFollower({
  blobFill,
  markerStroke,
  filterId,
}: PathLineFollowerProps) {
  return (
    <>
      <path
        d={PATH_BLOB_D}
        fill={blobFill}
        fillOpacity={0.6}
        filter={filterId ? `url(#${filterId})` : undefined}
        transform={`translate(${-PATH_BLOB_CENTER.x} ${-PATH_BLOB_CENTER.y})`}
      />
      <line
        x1={0}
        y1={0}
        x2={12}
        y2={0}
        stroke={markerStroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </>
  );
}
