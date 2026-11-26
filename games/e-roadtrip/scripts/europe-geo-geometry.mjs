// Geometry routines use [x, y] pairs in either degrees or projected pixels.
export function area(ring) {
  let twiceArea = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    twiceArea += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
  }
  return Math.abs(twiceArea) / 2;
}

function samePoint(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

function compact(points) {
  return points.filter((p, i) => i === 0 || !samePoint(p, points[i - 1]));
}

export function boundsOf(points) {
  return points.reduce(([left, bottom, right, top], [x, y]) =>
    [Math.min(left, x), Math.min(bottom, y), Math.max(right, x), Math.max(top, y)],
  [Infinity, Infinity, -Infinity, -Infinity]);
}

export function intersects(a, b) {
  return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];
}

function interpolation(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

// Sutherland–Hodgman against the four half-planes of a rectangle.
export function clipRing(ring, bbox) {
  let points = ring;
  for (const [axis, value, sign] of [[0, bbox[0], 1], [0, bbox[2], -1], [1, bbox[1], 1], [1, bbox[3], -1]]) {
    const next = [];
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const a = points[j];
      const b = points[i];
      const aInside = sign * (a[axis] - value) >= 0;
      const bInside = sign * (b[axis] - value) >= 0;
      if (aInside !== bInside) {
        const crossing = interpolation(a, b, (value - a[axis]) / (b[axis] - a[axis]));
        crossing[axis] = value;
        next.push(crossing);
      }
      if (bInside) next.push(b);
    }
    points = compact(next);
    if (points.length && samePoint(points[0], points.at(-1))) points.pop();
  }
  return points;
}

// Liang–Barsky clips each segment, keeping disconnected line pieces separate.
export function clipLine(points, [minX, minY, maxX, maxY]) {
  const runs = [];
  let run = [];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1], b = points[i];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    let enter = 0, exit = 1;
    for (const [p, q] of [[-dx, a[0] - minX], [dx, maxX - a[0]], [-dy, a[1] - minY], [dy, maxY - a[1]]]) {
      if (p < 0) enter = Math.max(enter, q / p);
      if (p > 0) exit = Math.min(exit, q / p);
      if (p === 0 && q < 0) exit = -1;
    }
    if (enter < exit) {
      const start = enter === 0 ? a : interpolation(a, b, enter);
      if (run.length && !samePoint(start, run.at(-1))) {
        runs.push(run);
        run = [];
      }
      if (!run.length) run.push(start);
      run.push(exit === 1 ? b : interpolation(a, b, exit));
    }
  }
  if (run.length) runs.push(run);
  return runs;
}

export function segmentDistanceSq([x, y], [ax, ay], [bx, by]) {
  const dx = bx - ax, dy = by - ay;
  const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1)));
  return (x - ax - dx * t) ** 2 + (y - ay - dy * t) ** 2;
}

// Iterative Douglas–Peucker. For rings, repeat the first point to close the last arc.
export function simplify(points, toleranceAt, closed = false) {
  if (points.length < 3) return points;
  const path = closed ? [...points, points[0]] : points;
  const last = path.length - 1;
  const keep = new Uint8Array(path.length);
  keep[0] = keep[last] = 1;
  const pending = [[0, last]];
  while (pending.length) {
    const [start, end] = pending.pop();
    let split = -1;
    let worst = 1;
    for (let i = start + 1; i < end; i++) {
      const score = segmentDistanceSq(path[i], path[start], path[end]) / toleranceAt(path[i]) ** 2;
      if (score > worst) {
        worst = score;
        split = i;
      }
    }
    if (split >= 0) {
      keep[split] = 1;
      pending.push([start, split], [split, end]);
    }
  }
  return path.filter((_, i) => keep[i] && (!closed || i < last));
}

export function roundPath(points, closed = false, precisionAt = () => 1) {
  const rounded = compact(points.map(point => {
    const precision = precisionAt(point);
    return point.map(n => Math.round(n * precision) / precision);
  }));
  if (closed && rounded.length && samePoint(rounded[0], rounded.at(-1))) rounded.pop();
  return rounded;
}

export function inRing([x, y], ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [ax, ay] = ring[i], [bx, by] = ring[j];
    if ((ay > y) !== (by > y) && x < ax + (bx - ax) * (y - ay) / (by - ay)) inside = !inside;
  }
  return inside;
}
