import { Quaternion, Vector3 } from 'three';
import { DUCT_SIDES, TRACER_SIZE } from './ce-throttle.js?v=0.5.2';

const STRIDE = 9; // centre and two radius vectors per wall cross section
const apothem = Math.cos(Math.PI / DUCT_SIDES);
export const LANE_RADIUS = 0.74;

// Transport the same two lane coordinates along the selected route, including
// the common tilted section at a two-pipe coupling. Only build time uses vectors.
export function buildLanes(edges) {
  const tables = edges.map(e => new Float32Array((e.count + 1) * STRIDE));
  const rotation = new Quaternion(), normal = new Vector3(), across = new Vector3();
  let previousAxis = null;
  for (const [i, e] of edges.entries()) {
    const first = e.first ?? 0, last = e.last ?? e.count;
    for (let j = first; j <= last; j++) {
      const joint = j === 0 ? e.startJoint : j === e.count ? e.endJoint : null;
      const axis = joint?.axis ?? e.tangents[j];
      if (previousAxis) normal.applyQuaternion(rotation.setFromUnitVectors(previousAxis, axis));
      else normal.copy(e.normals[j]).addScaledVector(axis, -e.normals[j].dot(axis)).normalize();
      across.crossVectors(axis, normal);
      previousAxis = axis;
      const radius = joint?.radius ?? e.radius;
      let width = Math.min(radius, (apothem * radius - TRACER_SIZE / 2) / LANE_RADIUS);
      // The existing chamber hand-off is at a valve curtain or the injector tip.
      // Only true journey endpoints taper. A port injection is one joined route.
      if (i === 0) width *= Math.min(1, j * e.length / e.count * 6);
      if (i === edges.length - 1) width *= Math.min(1, (e.count - j) * e.length / e.count * 6);
      const k = j * STRIDE, table = tables[i];
      e.centers[j].toArray(table, k);
      for (let d = 0; d < 3; d++) {
        table[k + 3 + d] = width * normal.getComponent(d);
        table[k + 6 + d] = width * across.getComponent(d);
      }
    }
    if (first > 0) bridge(edges[i - 1], e, tables[i - 1], tables[i]);
  }
  return tables;
}

function bridge(a, b, left, right) {
  const start = a.last * STRIDE, end = b.first * STRIDE;
  const inStep = a.length / a.count, outStep = b.length / b.count;
  const approach = (a.count - a.last) * inStep;
  const span = approach + b.first * outStep;
  const entry = a.tangents[a.last], exit = b.tangents[b.first];
  function section(t, table, j) {
    const v = 1 - t, mix = t * t * (3 - 2 * t);
    for (let d = 0; d < STRIDE; d++) {
      // Cubic Bezier of matching lane points. Both tangent controls stay in
      // the convex cast fitting, so every lane and its interpolation stay in it.
      let value = left[start + d] * (1 - mix) + right[end + d] * mix;
      if (d < 3) value += 3 * t * v * (v * a.endHandle * entry.getComponent(d) - t * b.startHandle * exit.getComponent(d));
      table[j * STRIDE + d] = value;
    }
  }
  for (let j = a.last + 1; j <= a.count; j++) section((j - a.last) * inStep / span, left, j);
  for (let j = 0; j < b.first; j++) section((approach + j * outStep) / span, right, j);
}

export function sampleLane(table, scaled, p, out) {
  const j = Math.min(table.length / STRIDE - 2, Math.floor(scaled));
  const t = scaled - j, a = j * STRIDE, b = a + STRIDE;
  // Evaluate two adjacent affine sections and interpolate without temporaries.
  for (let d = 0; d < 3; d++) {
    const from = table[a + d] + table[a + d + 3] * p.laneX + table[a + d + 6] * p.laneZ;
    const to = table[b + d] + table[b + d + 3] * p.laneX + table[b + d + 6] * p.laneZ;
    out.setComponent(d, from + (to - from) * t);
  }
}
