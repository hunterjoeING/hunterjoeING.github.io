import * as THREE from 'three';
import { volute } from './ce-volute.js?v=0.5.2';
import { junctionGeometry } from './ce-junctions.js?v=0.5.2';
import { DISC_RADIUS, DISC_THICKNESS, DUCT_SIDES as SIDES } from './ce-throttle.js?v=0.5.2';

// Fillet the design polyline without spline overshoot. Both the wall and the
// tracer lookup use these same equally spaced cross sections.
function sections(edge) {
  const points = edge.points.map(p => new THREE.Vector3(...p));
  const curve = new THREE.CurvePath();
  let start = points[0];
  for (let i = 1; i < points.length - 1; i++) {
    const corner = points[i], next = points[i + 1];
    const before = corner.distanceTo(start), after = corner.distanceTo(next);
    const trim = Math.min(before * 0.46, after * 0.46, 0.38);
    if (trim < 0.00001) continue;
    const entry = corner.clone().lerp(start, trim / before);
    const exit = corner.clone().lerp(next, trim / after);
    curve.add(new THREE.LineCurve3(start, entry));
    curve.add(new THREE.QuadraticBezierCurve3(entry, corner, exit));
    start = exit;
  }
  curve.add(new THREE.LineCurve3(start, points.at(-1)));
  const length = curve.getLength();
  const count = Math.max(4, Math.ceil(length * 13));
  const centers = curve.getSpacedPoints(count);
  const frames = curve.computeFrenetFrames(count, false);
  return { centers, ...frames, length, count };
}

function ringPoints(edge, j, joint) {
  const axis = joint?.axis || edge.tangents[j];
  let n = edge.normals[j].clone().addScaledVector(axis, -edge.normals[j].dot(axis)).normalize();
  if (joint?.normal) {
    // Select the nearest vertex of the common ring to avoid twisting the wall.
    const across = new THREE.Vector3().crossVectors(axis, joint.normal);
    const step = 2 * Math.PI / SIDES;
    const turns = Math.round(Math.atan2(n.dot(across), n.dot(joint.normal)) / step);
    n = joint.normal.clone().applyAxisAngle(axis, turns * step);
  }
  const b = new THREE.Vector3().crossVectors(axis, n);
  const radius = joint?.radius ?? edge.radius;
  return Array.from({ length: SIDES }, (_, k) => {
    const a = k * 2 * Math.PI / SIDES;
    return edge.centers[j].clone().addScaledVector(n, radius * Math.cos(a)).addScaledVector(b, radius * Math.sin(a));
  });
}

function tube(edge, joints) {
  const xyz = [], indices = [];
  const first = edge.first ?? 0, last = edge.last ?? edge.count;
  for (let j = first; j <= last; j++) {
    const joint = j === 0 ? joints.get(edge.from) : j === edge.count ? joints.get(edge.to) : null;
    const ring = ringPoints(edge, j, joint);
    for (let k = 0; k < SIDES; k++) {
      const pt = ring[k];
      xyz.push(pt.x, pt.y, pt.z);
      if (j > first) {
        const i = (j - first) * SIDES + k, next = (j - first) * SIDES + (k + 1) % SIDES;
        indices.push(i - SIDES, next - SIDES, next, i - SIDES, next, i);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(xyz, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

export function preparePassages(graph) {
  const ports = new Map();
  for (const edge of graph.edges) {
    Object.assign(edge, sections(edge));
    for (const [key, t] of [[edge.from, 0], [edge.to, edge.count]]) {
      if (!ports.has(key)) ports.set(key, []);
      ports.get(key).push({ edge, tangent: edge.tangents[t], atStart: t === 0 });
    }
  }
  const joints = new Map();
  for (const [key, ends] of ports) {
    if (ends.length >= 3) {
      const dirs = ends.map(({ edge, tangent }) => tangent.clone().multiplyScalar(edge.from === key ? 1 : -1));
      const r = Math.max(...ends.map(e => e.edge.radius));
      const rings = ends.map(({ edge }, i) => {
        let distance = 1.20 * r;
        for (let j = 0; j < dirs.length; j++) {
          if (j !== i) distance = Math.max(distance, 1.2 * r / Math.tan(dirs[i].angleTo(dirs[j]) / 2));
        }
        const trim = Math.max(1, Math.min(Math.floor(edge.count * 0.45), Math.ceil(distance / edge.length * edge.count)));
        const index = edge.from === key ? (edge.first = trim) : (edge.last = edge.count - trim);
        return ringPoints(edge, index);
      });
      joints.set(key, { rings, geometry: junctionGeometry(rings, ends) });
      continue;
    }
    if (ends.length !== 2) continue;
    const [a, b] = ends;
    if (a.edge.to !== b.edge.from && b.edge.to !== a.edge.from) continue;
    const axis = a.tangent.clone().add(b.tangent).normalize();
    const normal = a.edge.normals[0].clone();
    if (Math.abs(normal.dot(axis)) > 0.95) normal.copy(a.edge.binormals[0]);
    normal.addScaledVector(axis, -normal.dot(axis)).normalize();
    const joint = { axis, normal, radius: a.edge.kind === 'housing' ? b.edge.radius : b.edge.kind === 'housing' ? a.edge.radius : Math.min(a.edge.radius, b.edge.radius) };
    joints.set(key, joint);
    for (const { edge, atStart } of ends) edge[atStart ? 'startJoint' : 'endJoint'] = joint;
  }
  return { ports, joints };
}

export function installDucts(graph, getGroup, getMat, ghost, impeller) {
  const { ports, joints } = preparePassages(graph);
  const moving = {};
  const pos = key => new THREE.Vector3(...graph.nodes[key]);
  const up = new THREE.Vector3(0, 1, 0);
  function mesh(part, geometry, key, center, direction, translucent = false) {
    const m = new THREE.Mesh(geometry, getMat(part, key, translucent));
    m.position.copy(center);
    if (direction) m.quaternion.setFromUnitVectors(up, direction);
    getGroup(part).add(m);
    if (translucent) ghost.push(m);
    return m;
  }
  const metal = 'machinedSteel';
  function sleeve(part, p, dir, r, length, key = metal) {
    return mesh(part, new THREE.CylinderGeometry(r, r, length, 24, 1, true), key, p, dir, true);
  }
  function ring(part, p, dir, r, thick = 0.021) {
    const g = new THREE.TorusGeometry(r, thick, 6, 24).rotateX(Math.PI / 2);
    return mesh(part, g, metal, p, dir);
  }
  for (const e of graph.edges) {
    let key = 'intakeMat';
    if (e.part === 'exhaustManifold' || e.part === 'dpf' || e.part.endsWith('Egr')) key = 'exhaustPipe';
    if (e.part === 'intercooler') key = 'chargePipeMat';
    if (e.part === 'commonRail' || e.part === 'portInjectors') key = 'fuelPipe';
    if (e.kind === 'housing' || e.kind === 'injector') continue;
    mesh(e.part, tube(e, joints), key, new THREE.Vector3(), null, true);
    if (e.kind === 'nozzle') {
      const j = Math.floor(e.count * 0.39);
      sleeve(e.part, e.centers[j], e.tangents[j], 0.078, 0.22, 'chainGold');
      ring(e.part, e.centers[j], e.tangents[j], 0.08);
    }
  }
  for (const [name, ends] of ports) {
    if (ends.length < 3) continue;
    const largest = ends.reduce((a, b) => a.edge.radius >= b.edge.radius ? a : b).edge;
    const key = largest.part === 'exhaustManifold' ? 'exhaustPipe' : metal;
    mesh(largest.part, joints.get(name).geometry, key, new THREE.Vector3(), null, true);
  }
  mesh(graph.diesel ? 'commonRail' : 'portInjectors', new THREE.BoxGeometry(0.38, 0.34, 0.38),
    'darkMetal', pos('pump'));

  for (const d of graph.devices) {
    const start = pos(d.from), end = pos(d.to);
    const length = start.distanceTo(end);
    const dir = end.clone().sub(start).normalize();
    const mid = start.clone().lerp(end, 0.5);
    if (d.type === 'compressor' || d.type === 'turbine') {
      const cold = d.type === 'compressor';
      const axial = cold ? start : end;
      const center = axial.clone();
      center.x += cold ? 0.25 : -0.25;
      const axis = new THREE.Vector3(1, 0, 0);
      const key = cold ? 'turboColdMat' : 'exhaustPipe';
      const portRing = name => {
        const e = ports.get(name).find(p => p.edge.kind !== 'housing').edge;
        return ringPoints(e, e.from === name ? 0 : e.count, joints.get(name));
      };
      const tangentPort = cold ? end : start;
      const scroll = volute(center, cold, portRing(cold ? d.from : d.to), portRing(cold ? d.to : d.from));
      mesh(d.part, scroll, key, new THREE.Vector3(), null, true);
      ring(d.part, tangentPort, new THREE.Vector3(0, 0, 1), 0.17);
      ring(d.part, axial, axis, cold ? 0.19 : 0.20);
      const wheel = impeller(11, 0.214, 0.066, 0.11, getMat(d.part, cold ? 'intakeValve' : 'exhaustValve'));
      wheel.position.copy(center);
      getGroup(d.part).add(wheel);
      moving[d.type] = wheel;
      if (cold) {
        const bearing = center.clone();
        bearing.x += 0.40;
        mesh(d.part, new THREE.CylinderGeometry(0.095, 0.095, 0.80, 16), metal, bearing, axis);
      }
    } else if (d.type === 'valve' || d.type === 'throttle') {
      const pivot = new THREE.Group();
      pivot.position.copy(end);
      pivot.quaternion.setFromUnitVectors(up, dir);
      getGroup(d.part).add(pivot);
      const isThrottle = d.type === 'throttle';
      const radius = isThrottle ? DISC_RADIUS : d.size * 0.87;
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, isThrottle ? DISC_THICKNESS : 0.024, 18),
        getMat(d.part, 'chainGold'));
      if (isThrottle) disc.name = 'throttlePlate';
      pivot.add(disc);
      moving[d.type === 'throttle' ? 'throttle' : d.part] = disc;
      ring(d.part, end, dir, d.size + (isThrottle ? 0.024 : 0.015));
    } else {
      const r = d.size;
      const round = d.type === 'filterDPF';
      const holeR = graph.edges.find(e => e.from === d.from && e.to === d.to).radius * 1.01;
      // Fins are punched around the passage. End plates leave both ports open.
      const shape = new THREE.Shape();
      if (round) shape.absarc(0, 0, r, 0, 2 * Math.PI, false);
      else {
        shape.moveTo(-r, -r * 0.85); shape.lineTo(r, -r * 0.85);
        shape.lineTo(r, r * 0.85); shape.lineTo(-r, r * 0.85); shape.closePath();
      }
      const bore = new THREE.Path();
      bore.absarc(0, 0, holeR, 0, 2 * Math.PI, true);
      shape.holes.push(bore);
      const fin = new THREE.ExtrudeGeometry(shape, { depth: 0.025, bevelEnabled: false, curveSegments: 10 });
      fin.translate(0, 0, -0.0125).rotateX(-Math.PI / 2);
      const plates = new THREE.InstancedMesh(fin, getMat(d.part, metal), 11);
      const transform = new THREE.Object3D();
      transform.quaternion.setFromUnitVectors(up, dir);
      for (let i = 0; i < plates.count; i++) {
        transform.position.copy(start).lerp(end, i / (plates.count - 1));
        transform.updateMatrix();
        plates.setMatrixAt(i, transform.matrix);
      }
      getGroup(d.part).add(plates);
      sleeve(d.part, mid, dir, round ? r : holeR + 0.016, length, round ? 'exhaustPipe' : 'darkMetal');
      ring(d.part, start, dir, holeR); ring(d.part, end, dir, holeR);
    }
  }
  return moving;
}
