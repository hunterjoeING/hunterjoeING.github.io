import * as THREE from 'three';

// The boundary of a cast Y/tee fitting is the convex hull of its port rings
// with the coplanar end caps omitted. Each port reuses the duct's actual rim.
export function junctionGeometry(rings) {
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
