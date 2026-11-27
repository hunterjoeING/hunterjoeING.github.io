import * as THREE from 'three';
import { LANE_RADIUS } from './ce-lanes.js?v=0.5.2';

// The boundary of a cast Y/tee fitting is the convex hull of its port rings
// with the coplanar end caps omitted. Each port reuses the duct's actual rim.
export function junctionGeometry(rings, ports = []) {
  const points = rings.flat();
  const n = rings[0].length;
  const tetra = [0, Math.floor(n / 3), Math.floor(2 * n / 3), n];
  const inside = new THREE.Vector3();
  tetra.forEach(i => inside.add(points[i]));
  inside.multiplyScalar(0.25);
  function face(a, b, c) {
    const v = points[a], w = points[b], u = points[c];
    const normal = new THREE.Vector3().subVectors(w, v).cross(new THREE.Vector3().subVectors(u, v)).normalize();
    if (normal.dot(inside) > normal.dot(v)) {
      normal.negate();
      [b, c] = [c, b];
    }
    return { a, b, c, normal, dot: normal.dot(v) };
  }
  const [a, b, c, d] = tetra;
  let faces = [face(a,b,c), face(a,b,d), face(b,c,d), face(c,a,d)];
  for (const [i, p] of points.entries()) {
    if (tetra.includes(i)) continue;
    const horizon = new Map();
    faces = faces.filter(f => {
      if (f.normal.dot(p) <= f.dot + 1e-8) return true;
      for (const [j, k] of [[f.a,f.b], [f.b,f.c], [f.c,f.a]]) {
        const key = Math.min(j, k) * points.length + Math.max(j, k);
        if (!horizon.delete(key)) horizon.set(key, [j, k]);
      }
      return false;
    });
    for (const [j, k] of horizon.values()) faces.push(face(j, k, i));
  }
  // A cubic lane leaves each trimmed port along its tangent. Clip the control
  // disc against the full hull (including caps), once, before sampling any route.
  for (const { edge, atStart } of ports) {
    const j = atStart ? edge.first : edge.last;
    const center = edge.centers[j], axis = edge.tangents[j];
    let handle = 0.65 * center.distanceTo(atStart ? edge.centers[0] : edge.centers[edge.count]);
    for (const plane of faces) {
      const dot = plane.normal.dot(axis);
      const rate = atStart ? -dot : dot;
      if (rate < 1e-7) continue;
      const support = (LANE_RADIUS + 0.01) * edge.radius * Math.sqrt(Math.max(0, 1 - dot * dot));
      handle = Math.min(handle, (plane.dot - plane.normal.dot(center) - support) / rate);
    }
    if (atStart) edge.startHandle = Math.max(0, handle);
    else edge.endHandle = Math.max(0, handle);
  }
  const indices = [];
  for (const f of faces) {
    const first = Math.floor(f.a / n);
    if (Math.floor(f.b / n) !== first || Math.floor(f.c / n) !== first) indices.push(f.a, f.b, f.c);
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
