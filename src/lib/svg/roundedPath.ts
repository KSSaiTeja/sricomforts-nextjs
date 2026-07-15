export type PathPoint = {
  x: number;
  y: number;
  radius?: number;
};

const format = (value: number) => Math.round(value * 100) / 100;

/** Handle length factor for a circular arc cubic approximation (90°). */
const CIRCULAR_KAPPA = 0.5522847498;

/**
 * Slightly above circular so notch shoulders read as continuous S-curves
 * (closer to squircle / continuous-curvature corners) instead of hard arcs.
 */
const SMOOTH_KAPPA = CIRCULAR_KAPPA * 1.18;

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

type CornerCurve = {
  startPoint: PathPoint;
  endPoint: PathPoint;
  control1: PathPoint;
  control2: PathPoint;
  isTooLarge: boolean;
};

const cornerCurve = (
  current: PathPoint,
  previous: PathPoint,
  next: PathPoint,
): CornerCurve => {
  const travelIn = normalize(subtract(current, previous));
  const travelOut = normalize(subtract(next, current));
  const dot = -(travelIn.x * travelOut.x + travelIn.y * travelOut.y);
  const halfAngle = Math.acos(Math.min(Math.max(dot, -1), 1)) / 2;
  const prevDistance = distance(previous, current);
  const nextDistance = distance(current, next);
  const maxRadius = Math.min(prevDistance, nextDistance) / 2;

  let radius = current.radius || 0;
  if (radius > maxRadius) radius = maxRadius;

  // Tangent points sit on the incoming / outgoing edges (not past the vertex).
  const startPoint = subtract(current, scale(travelIn, radius));
  const endPoint = add(current, scale(travelOut, radius));

  const turningAngle = Math.PI - 2 * halfAngle;
  const tanQuarter = Math.tan(turningAngle / 4);
  const isTooLarge = !Number.isFinite(tanQuarter) || Math.abs(tanQuarter) > 10;

  // Scale kappa by turn so non-90° corners stay smooth and tangent-continuous.
  const handle =
    radius * SMOOTH_KAPPA * (turningAngle > 0 ? tanQuarter / Math.tan(Math.PI / 8) : 1);

  return {
    startPoint,
    endPoint,
    control1: add(startPoint, scale(travelIn, handle)),
    control2: subtract(endPoint, scale(travelOut, handle)),
    isTooLarge,
  };
};

function appendCorner(path: string, curve: CornerCurve, includeLineToStart: boolean) {
  const start = `L ${format(curve.startPoint.x)},${format(curve.startPoint.y)}`;
  if (curve.isTooLarge) {
    return (
      path +
      (includeLineToStart ? start : "") +
      ` L ${format(curve.endPoint.x)},${format(curve.endPoint.y)}`
    );
  }

  const cubic = ` C ${format(curve.control1.x)},${format(curve.control1.y)} ${format(curve.control2.x)},${format(curve.control2.y)} ${format(curve.endPoint.x)},${format(curve.endPoint.y)}`;
  return path + (includeLineToStart ? start : "") + cubic;
}

export function pathFromPoints(
  points: PathPoint[],
  _bounds?: { width: number; height: number },
): string {
  if (points.length < 2) return "";

  const first = points[0];
  const last = points[points.length - 1];
  let path = "";

  if (first.radius && points.length > 2) {
    const curve = cornerCurve(first, last, points[1]);
    path = `M ${format(curve.startPoint.x)},${format(curve.startPoint.y)}`;
    path = appendCorner(path, curve, false);
  } else {
    path = `M ${format(first.x)},${format(first.y)}`;
  }

  for (let index = 1; index < points.length; index += 1) {
    const point = points[index];

    if (point.radius) {
      const previous = points[index - 1];
      const next = index === points.length - 1 ? points[0] : points[index + 1];
      const curve = cornerCurve(point, previous, next);
      path = appendCorner(path, curve, true);
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
