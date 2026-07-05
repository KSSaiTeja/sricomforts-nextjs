import { VALUE_CARD_BLOB_PATH } from "@/lib/svg/solutionsBorderPaths";

/** Approximate center of the glow blob path (matches clone motionPath alignOrigin). */
export const PATH_BLOB_CENTER = { x: 55, y: 44 } as const;

export const PATH_BLOB_D = VALUE_CARD_BLOB_PATH;

export type PathTangent = {
  point: DOMPoint;
  angle: number;
};

export function getPathTangent(path: SVGPathElement, distance: number): PathTangent {
  const length = path.getTotalLength();
  const clamped = Math.max(0, Math.min(distance, length));
  const delta = Math.max(0.75, length * 0.004);

  const point = path.getPointAtLength(clamped);
  const ahead = path.getPointAtLength(Math.min(length, clamped + delta));
  const behind = path.getPointAtLength(Math.max(0, clamped - delta));
  const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;

  return { point, angle };
}

export function applyPathFollower(
  follower: SVGGElement | null,
  path: SVGPathElement | null,
  progress: number,
  visible: boolean,
) {
  if (!follower || !path) return;

  const length = path.getTotalLength();
  if (!length) return;

  const { point, angle } = getPathTangent(path, progress * length);

  follower.setAttribute(
    "transform",
    `translate(${point.x}, ${point.y}) rotate(${angle})`,
  );
  follower.style.opacity = visible ? "1" : "0";
}

export type PathLineRefs = {
  fullPath: SVGPathElement | null;
  animatedPath: SVGPathElement | null;
  follower: SVGGElement | null;
};

export type PathLineAnimationConfig = {
  enterDuration: number;
  loopDuration: number;
  dashRatio?: number;
};

export function updatePathLineAnimation(
  refs: PathLineRefs,
  playhead: number,
  { enterDuration, loopDuration, dashRatio = 0.15 }: PathLineAnimationConfig,
) {
  const { fullPath, animatedPath, follower } = refs;
  if (!fullPath || !animatedPath) return;

  const length = fullPath.getTotalLength();
  if (!length) return;

  const enterProgress = Math.min(Math.max(playhead, 0) / enterDuration, 1);
  fullPath.style.strokeDasharray = `${length}`;
  fullPath.style.strokeDashoffset = `${length * (1 - enterProgress)}`;

  const loopTime = Math.max(0, playhead - enterDuration);
  const loopProgress = (loopTime % loopDuration) / loopDuration;
  const dash = length * dashRatio;

  animatedPath.style.strokeDasharray = `${dash} ${length}`;
  animatedPath.style.strokeDashoffset = `${length * (1 - loopProgress)}`;
  animatedPath.style.opacity = playhead >= enterDuration * 0.5 ? "1" : "0";

  applyPathFollower(follower, fullPath, loopProgress, playhead >= enterDuration);
}
