import { pathFromPoints, type PathPoint } from "@/lib/svg/roundedPath";
import { NotchDirection, type Notch, type NotchDirectionValue } from "@/types/notch";

const PADDING = 0.5;

type Dimensions = {
  width: number;
  height: number;
};

function notchOffset(notches: Notch[], direction: NotchDirectionValue) {
  return Math.abs(
    notches
      .filter((notch) => notch.direction === direction)
      .reduce((minimum, notch) => Math.min(minimum, notch.offset), 0),
  );
}

function buildNotchPoints(
  notch: Notch,
  dimensions: Dimensions,
  edgeOffset: number,
): PathPoint[] {
  const points: PathPoint[] = Array.from({ length: 4 }, () => ({
    x: 0,
    y: 0,
    radius: (40 / notch.size) * notch.radius * 0.01,
  }));

  const cornerInset = (1 - notch.notchWidth) * dimensions.width * 0.25;

  switch (notch.direction) {
    case NotchDirection.top: {
      const offset = edgeOffset;
      points[0].x = dimensions.width * (notch.position - notch.size * 0.5) - cornerInset;
      points[0].y = offset;
      points[1].x = dimensions.width * (notch.position - notch.size * 0.5) + cornerInset;
      points[1].y = offset + notch.offset;
      points[2].x = dimensions.width * (notch.position + notch.size * 0.5) - cornerInset;
      points[2].y = offset + notch.offset;
      points[3].x = dimensions.width * (notch.position + notch.size * 0.5) + cornerInset;
      points[3].y = offset;
      break;
    }
    case NotchDirection.right: {
      const offset = edgeOffset;
      points[0].x = dimensions.width - offset;
      points[0].y = dimensions.height * (notch.position - notch.size * 0.5) - cornerInset;
      points[1].x = dimensions.width - offset - notch.offset;
      points[1].y = dimensions.height * (notch.position - notch.size * 0.5) + cornerInset;
      points[2].x = dimensions.width - offset - notch.offset;
      points[2].y = dimensions.height * (notch.position + notch.size * 0.5) - cornerInset;
      points[3].x = dimensions.width - offset;
      points[3].y = dimensions.height * (notch.position + notch.size * 0.5) + cornerInset;
      break;
    }
    case NotchDirection.bottom: {
      const offset = edgeOffset;
      points[0].x = dimensions.width * (notch.position + notch.size * 0.5) + cornerInset;
      points[0].y = dimensions.height - offset;
      points[1].x = dimensions.width * (notch.position + notch.size * 0.5) - cornerInset;
      points[1].y = dimensions.height - offset - notch.offset;
      points[2].x = dimensions.width * (notch.position - notch.size * 0.5) + cornerInset;
      points[2].y = dimensions.height - offset - notch.offset;
      points[3].x = dimensions.width * (notch.position - notch.size * 0.5) - cornerInset;
      points[3].y = dimensions.height - offset;
      break;
    }
    case NotchDirection.left: {
      const offset = edgeOffset;
      points[0].x = offset;
      points[0].y = dimensions.height * (notch.position + notch.size * 0.5) + cornerInset;
      points[1].x = offset + notch.offset;
      points[1].y = dimensions.height * (notch.position + notch.size * 0.5) - cornerInset;
      points[2].x = offset + notch.offset;
      points[2].y = dimensions.height * (notch.position - notch.size * 0.5) + cornerInset;
      points[3].x = offset;
      points[3].y = dimensions.height * (notch.position - notch.size * 0.5) - cornerInset;
      break;
    }
  }

  return points;
}

function sortedNotches(notches: Notch[], direction: NotchDirectionValue) {
  const filtered = notches
    .filter((notch) => notch.direction === direction)
    .map((notch) => ({
      ...notch,
      radius: notch.radius ?? 8,
      notchWidth: notch.notchWidth ?? 0.9,
    }));

  if (direction === NotchDirection.bottom) {
    return filtered.sort((a, b) => b.position - a.position);
  }

  return filtered.sort((a, b) => a.position - b.position);
}

export function buildMaskPath(notches: Notch[], dimensions: Dimensions): string {
  const topOffset = notchOffset(notches, NotchDirection.top);
  const rightOffset = notchOffset(notches, NotchDirection.right);
  const bottomOffset = notchOffset(notches, NotchDirection.bottom);
  const leftOffset = notchOffset(notches, NotchDirection.left);

  const left = Math.max(-PADDING, leftOffset - PADDING);
  const top = Math.max(-PADDING, topOffset - PADDING);
  const right = Math.min(dimensions.width + PADDING, dimensions.width - rightOffset + PADDING);
  const bottom = Math.min(
    dimensions.height + PADDING,
    dimensions.height - bottomOffset + PADDING,
  );

  const points: PathPoint[] = [
    { x: left, y: top },
    ...sortedNotches(notches, NotchDirection.top).flatMap((notch) =>
      buildNotchPoints(notch, dimensions, topOffset),
    ),
    { x: right, y: top },
    ...sortedNotches(notches, NotchDirection.right).flatMap((notch) =>
      buildNotchPoints(notch, dimensions, rightOffset),
    ),
    { x: right, y: bottom },
    ...sortedNotches(notches, NotchDirection.bottom).flatMap((notch) =>
      buildNotchPoints(notch, dimensions, bottomOffset),
    ),
    { x: left, y: bottom },
    ...sortedNotches(notches, NotchDirection.left).flatMap((notch) =>
      buildNotchPoints(notch, dimensions, leftOffset),
    ),
    { x: left, y: top },
  ];

  return pathFromPoints(points.flat(), dimensions);
}

export { PADDING as MASK_PADDING };
