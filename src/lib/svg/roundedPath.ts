export type PathPoint = {
  x: number;
  y: number;
  radius?: number;
};

const format = (value: number) => Math.round(value * 100) / 100;

const subtract = (a: PathPoint, b: PathPoint) => ({ x: a.x - b.x, y: a.y - b.y });
const add = (a: PathPoint, b: PathPoint) => ({ x: a.x + b.x, y: a.y + b.y });
const scale = (point: PathPoint, factor: number) => ({
  x: point.x * factor,
  y: point.y * factor,
});

const normalize = (point: PathPoint) => {
  const length = Math.hypot(point.x, point.y);
  return length === 0 ? { x: 0, y: 0 } : { x: point.x / length, y: point.y / length };
};

const distance = (a: PathPoint, b: PathPoint) => Math.hypot(b.x - a.x, b.y - a.y);

const cornerArc = (
  current: PathPoint,
  previous: PathPoint,
  next: PathPoint,
  bounds?: { width: number; height: number },
) => {
  const toPrevious = normalize(subtract(current, previous));
  const toNext = normalize(subtract(next, current));
  const dot = -(toPrevious.x * toNext.x + toPrevious.y * toNext.y);
  const angle = Math.acos(Math.min(Math.max(dot, -1), 1)) / 2;
  const prevDistance = distance(previous, current);
  const nextDistance = distance(current, next);
  const maxRadius = Math.min(prevDistance, nextDistance) / 2;

  let radius = current.radius || 0;
  if (radius > maxRadius) radius = maxRadius;

  const tangent = radius * Math.tan(angle);
  const startPoint = add(current, scale(toPrevious, radius));
  const endPoint = add(current, scale(toNext, radius));
  const sweepFlag = toPrevious.x * toNext.y - toPrevious.y * toNext.x < 0 ? 0 : 1;

  if (bounds) {
    startPoint.x = clamp(startPoint.x, 0, bounds.width);
    startPoint.y = clamp(startPoint.y, 0, bounds.height);
    endPoint.x = clamp(endPoint.x, 0, bounds.width);
    endPoint.y = clamp(endPoint.y, 0, bounds.height);
  }

  return {
    startPoint,
    endPoint,
    actualRadius: tangent,
    sweepFlag,
    isTooLarge: tangent >= 1000,
  };
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function pathFromPoints(
  points: PathPoint[],
  bounds?: { width: number; height: number },
): string {
  if (points.length < 2) return "";

  const first = points[0];
  const last = points[points.length - 1];
  let path = "";

  if (first.radius && points.length > 2) {
    const arc = cornerArc(first, last, points[1], bounds);
    path = `M ${format(arc.startPoint.x)},${format(arc.startPoint.y)}`;
    path += arc.isTooLarge
      ? ` L ${format(arc.endPoint.x)},${format(arc.endPoint.y)}`
      : ` A ${format(arc.actualRadius)},${format(arc.actualRadius)} 0 0 ${arc.sweepFlag} ${format(arc.endPoint.x)},${format(arc.endPoint.y)}`;
  } else {
    path = `M ${format(first.x)},${format(first.y)}`;
  }

  for (let index = 1; index < points.length; index += 1) {
    const point = points[index];

    if (point.radius) {
      const previous = points[index - 1];
      const next = index === points.length - 1 ? points[0] : points[index + 1];
      const arc = cornerArc(point, previous, next, bounds);

      path += arc.isTooLarge
        ? ` L ${format(arc.startPoint.x)},${format(arc.startPoint.y)}`
        : ` L ${format(arc.startPoint.x)},${format(arc.startPoint.y)} A ${format(arc.actualRadius)},${format(arc.actualRadius)} 0 0 ${arc.sweepFlag} ${format(arc.endPoint.x)},${format(arc.endPoint.y)}`;
    } else {
      path += ` L ${format(point.x)},${format(point.y)}`;
    }
  }

  return path;
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}
