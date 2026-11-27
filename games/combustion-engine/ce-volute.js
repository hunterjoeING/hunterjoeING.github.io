import * as THREE from 'three';

// One continuous scroll casting. Its growing radial section opens into a
// rectangular throat and then a round tangential flange. The axial lip and
// the tangential lip reuse the neighbouring ducts' polygonal cross sections.
export function volute(center, cold, axialRing, tangentRing) {
  const front = cold ? -1 : 1, tangential = cold ? -1 : 1;
  const xyz = [], indices = [];
  const at = (x, y, z) => new THREE.Vector3(center.x + x, center.y + y, center.z + z);
  function strip(row, next) {
    const start = xyz.length / 3;
    for (let i = 0; i < row.length; i++) {
      xyz.push(...row[i].toArray(), ...next[i].toArray());
      const j = start + 2 * i, k = start + 2 * ((i + 1) % row.length);
      indices.push(j, k, k + 1, j, k + 1, j + 1);
    }
  }
  function angularOrder(ring, angle) {
    const tau = 2 * Math.PI;
    return ring.slice().sort((a, b) => {
      const normalized = p => (angle(p) + tau + 1e-8) % tau;
      return normalized(a) - normalized(b);
    });
  }
  const lip = angularOrder(axialRing, p => Math.atan2(tangential * (p.z - center.z), p.y - center.y));
  const small = 0.225, large = 0.455, width = 0.145;
  const sections = 36;
  let previous;
  for (let i = 0; i <= sections; i++) {
    const t = i / sections, a = t * 2 * Math.PI;
    const radial = (x, r) => at(x, r * Math.cos(a), tangential * r * Math.sin(a));
    const outer = small + (large - small) * t;
    const q = t * lip.length, j = Math.floor(q) % lip.length;
    const lipPoint = lip[j].clone().lerp(lip[(j + 1) % lip.length], q % 1);
    const row = [lipPoint, radial(front * width, small), radial(front * width, outer),
      radial(-front * width, outer), radial(-front * width, small), radial(-front * 0.20, 0.09)];
    if (previous) {
      // Across this section the central bore stays open. Close its rear face
      // against the bearing, leaving the wheel visible through the axial inlet.
      const start = xyz.length / 3;
      row.forEach((p, k) => xyz.push(...previous[k].toArray(), ...p.toArray()));
      for (let k = 0; k < row.length - 1; k++) {
        const n = start + k * 2;
        indices.push(n, n + 1, n + 2, n + 1, n + 3, n + 2);
      }
    }
    previous = row;
  }
  const portY = center.y + (small + large) / 2;
  const round = angularOrder(tangentRing, p => Math.atan2(p.y - portY, p.x - center.x));
  // Clock the rectangular rim by its corners. Every edge lies exactly on the
  // scroll seam, independent of the clocking of the round duct downstream.
  const mouth = [], throat = [];
  const startAngle = Math.PI / 4;
  for (let i = 0; i < round.length; i++) {
    const a = startAngle + 2 * Math.PI * i / round.length;
    const cosine = Math.cos(a), sine = Math.sin(a);
    const divisor = Math.max(Math.abs(cosine), Math.abs(sine));
    throat.push(at(width * cosine / divisor, 0.34 + (large - small) / 2 * sine / divisor, 0));
    mouth.push(round[(i + Math.round(round.length / 8)) % round.length]);
  }
  strip(throat, mouth);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(xyz, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
