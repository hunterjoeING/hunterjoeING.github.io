import * as THREE from 'three';
import { passage } from './ce-plumbing.js?v=0.5.0';
import { SEAT_Y } from './ce-mechanics.js?v=0.5.0';

const AIR = 0, FUEL = 1, BURNT = 2;
const colors = [0x389cff, 0xf03137, 0x75422c].map(c => new THREE.Color(c));

function timedRoute(edges, boost) {
  let duration = 0;
  const stops = edges.map(e => {
    let speed = e.speed;
    if (e.part === 'intercooler') speed /= 1 + boost * 0.42;
    duration += e.length / speed;
    return duration;
  });
  return { edges, stops, duration };
}

function trace(route, fraction, p, out) {
  const time = Math.min(1, Math.max(0, fraction)) * route.duration;
  let i = 0;
  while (i < route.stops.length - 1 && time > route.stops[i]) i++;
  const e = route.edges[i];
  const start = i ? route.stops[i - 1] : 0;
  const u = (time - start) / (route.stops[i] - start);
  const scaled = u * e.count, j = Math.min(e.count - 1, Math.floor(scaled));
  const t = scaled - j;
  out.lerpVectors(e.centers[j], e.centers[j + 1], t);
  // Narrow the strand inside fittings. Shared nodes meet exactly, including
  // branches whose cylindrical coordinate frames differ.
  const width = e.radius * Math.min(1, u * e.length * 6, (1 - u) * e.length * 6);
  out.addScaledVector(e.normals[j], p.laneX * width * (1 - t));
  out.addScaledVector(e.normals[j + 1], p.laneX * width * t);
  out.addScaledVector(e.binormals[j], p.laneZ * width * (1 - t));
  out.addScaledVector(e.binormals[j + 1], p.laneZ * width * t);
}

export function routesForSeat(g, cyl, seat, boost) {
  const run = (from, to, branch) => timedRoute(passage(g, from, to, branch), boost);
  return {
    air: run('filterMouth', seat.enter),
    fuel: run('pump', cyl.nozzle),
    port: g.diesel ? null : run(cyl.nozzle, seat.enter),
    tail: run(seat.leave, 'tail'),
    hp: g.diesel ? run(seat.leave, seat.enter, 'hpEgr') : null,
    lp: g.diesel ? run(seat.leave, seat.enter, 'lpEgr') : null,
    enter: new THREE.Vector3(...g.nodes[seat.enter]),
    nozzle: new THREE.Vector3(...g.nodes[cyl.nozzle]),
    leave: new THREE.Vector3(...g.nodes[seat.leave])
  };
}

export function tracerBudget(hardware = {}) {
  return (hardware.hardwareConcurrency ?? 8) <= 4 || (hardware.deviceMemory ?? 8) <= 4 ? 2304 : 6144;
}

const fract = x => x - Math.floor(x);
const clamp = x => Math.max(0, Math.min(1, x));

export function beginJourney(p, graph, load, boost) {
  const seed = fract(p.seed + p.trip * 0.61803398875);
  const gasAmount = graph.diesel ? 0.53 + 0.24 * load + 0.23 * boost : 0.27 + 0.73 * load;
  p.active = fract(seed * 237.131) < gasAmount;
  const fuelShare = graph.diesel ? 0.035 + 0.17 * load : 0.14 + 0.08 * clamp((load - 0.76) / 0.24);
  p.fuel = fract(seed * 137.413) < fuelShare;
  p.route = p.options[boost > 0.48 ? 1 : 0];
  const route = p.route;
  const share = fract(seed * 379.717);
  p.returnRoute = null;
  if (graph.diesel && share < 0.27 * (1 - load)) p.returnRoute = route.hp;
  else if (graph.diesel && share < 0.27 * (1 - load) + 0.06 + 0.13 * load) p.returnRoute = route.lp;
  p.arrival = p.fuel && graph.diesel ? 345 + p.rank * 14 : p.admit;
  p.inject = p.fuel && graph.diesel ? p.arrival : p.admit - 18 - 23 * p.rank;
  // Birth timing is spread over the complete intake cycle, while the valve
  // crossings converge on the corresponding cylinder's actual opening window.
  p.birth = Math.min(-220, p.arrival - (p.fuel ? route.fuel : route.air).duration * 73) - 540 * (1 - p.rank);
  p.second = p.returnRoute ? Math.ceil((p.release + p.returnRoute.duration * 78 - p.admit) / 720) * 720 : 0;
  p.end = p.second + p.release + route.tail.duration * 81;
}

// The chamber coordinates follow the piston. Blend from/to the very same valve
// points used by the ducts so a dot never jumps between the head and the bore.
function chamber(p, t, arrival, source, crown, out) {
  const h = SEAT_Y - crown;
  const localY = crown + 0.045 + p.height * (h - 0.085);
  out.set(p.cyl.spec.x + p.radialX, p.y0 + localY * p.cos - p.radialZ * p.sin,
    localY * p.sin + p.radialZ * p.cos);
  if (t < arrival + 33) out.lerp(source, 1 - clamp((t - arrival) / 33));
  else if (t > p.release - 38) out.lerp(p.route.leave, clamp((t - p.release + 38) / 38));
}

export function sampleJourney(p, graph, t, crown, out) {
  const r = p.route;
  if (t < p.arrival) {
    if (p.fuel && !graph.diesel && t > p.inject) trace(r.port, (t - p.inject) / (p.arrival - p.inject), p, out);
    else {
      const end = p.fuel ? p.inject : p.arrival;
      trace(p.fuel ? r.fuel : r.air, (t - p.birth) / (end - p.birth), p, out);
    }
  } else if (t < p.release) {
    chamber(p, t, p.arrival, p.fuel && graph.diesel ? r.nozzle : r.enter, crown, out);
  } else if (p.second && t < p.second + p.admit) {
    trace(p.returnRoute, (t - p.release) / (p.second + p.admit - p.release), p, out);
  } else if (p.second && t < p.second + p.release) {
    chamber(p, t - p.second, p.admit, r.enter, crown, out);
  } else {
    const exit = p.second + p.release;
    trace(r.tail, (t - exit) / (p.end - exit), p, out);
  }
  return t >= p.burn ? BURNT : p.fuel ? FUEL : AIR;
}

export function createTracers(graph, budget = tracerBudget(globalThis.navigator)) {
  const positions = new THREE.BufferAttribute(new Float32Array(budget * 3), 3).setUsage(THREE.DynamicDrawUsage);
  const rgb = new THREE.BufferAttribute(new Float32Array(budget * 3), 3).setUsage(THREE.DynamicDrawUsage);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', positions);
  geometry.setAttribute('color', rgb);
  // A shaded circular point sprite reads as a bead even at medium zoom.
  const mat = new THREE.PointsMaterial({ size: 0.044, vertexColors: true, toneMapped: false });
  mat.onBeforeCompile = shader => {
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `
      #include <color_fragment>
      vec2 disk = gl_PointCoord * 2.0 - 1.0;
      float r2 = dot(disk, disk);
      if (r2 > 1.0) discard;
      vec3 n = vec3(disk, sqrt(1.0 - r2));
      diffuseColor.rgb *= 0.67 + 0.44 * max(0.0, dot(n, vec3(-0.40, -0.56, 0.72)));
    `);
  };
  const cloud = new THREE.Points(geometry, mat);
  cloud.frustumCulled = false;
  cloud.raycast = () => {};
  const options = graph.cylinders.map(c => c.seats.map(s => [0, 1].map(b => routesForSeat(graph, c, s, b))));
  const particles = [];
  const out = new THREE.Vector3();
  for (let i = 0; i < budget; i++) {
    const n = i % graph.cylinders.length, cyl = graph.cylinders[n];
    const lane = Math.floor(i / graph.cylinders.length);
    const rank = fract((lane + 0.5) * 0.61803398875);
    const radius = Math.sqrt(fract((i + 1) * 0.754877666));
    const angle = (i + 1) * 2.39996323, a = cyl.spec.bankAngleDeg * Math.PI / 180;
    particles.push({
      n, cyl, rank, sin: Math.sin(a), cos: Math.cos(a), y0: graph.y0,
      seed: fract((i + 0.5) * 0.414213562), trip: 0, initialized: false,
      options: options[n][lane % 2], admit: 12 + rank * 152, release: 552 + rank * 153,
      burn: 360 + radius * 15, height: 0.04 + 0.92 * fract(i * 0.56984029),
      radialX: 0.45 * radius * Math.cos(angle), radialZ: 0.45 * radius * Math.sin(angle),
      laneX: 0.74 * radius * Math.cos(angle), laneZ: 0.74 * radius * Math.sin(angle)
    });
  }
  let lastClock = -Infinity;
  return {
    cloud,
    update(crankClock, crowns, load, boostBar) {
      if (crankClock === lastClock) return;
      const refill = crankClock - lastClock > 1440;
      lastClock = crankClock;
      let count = 0;
      const boost = clamp(boostBar / 1.85);
      for (const p of particles) {
        const local = crankClock + p.cyl.spec.phaseDeg;
        if (!p.initialized || refill) {
          beginJourney(p, graph, load, boost);
          const cycles = Math.ceil((p.end - p.birth) / 720);
          p.epoch = (Math.floor((local - p.birth) / 720) - Math.floor(p.seed * cycles)) * 720;
          p.initialized = true;
        }
        if (local - p.epoch > p.end) {
          const lastExit = p.epoch + p.end;
          p.trip++;
          beginJourney(p, graph, load, boost);
          p.epoch = Math.ceil((lastExit - p.birth) / 720) * 720;
        }
        const t = local - p.epoch;
        if (!p.active || t < p.birth || t > p.end) continue;
        const color = colors[sampleJourney(p, graph, t, crowns[p.n], out)];
        positions.setXYZ(count, out.x, out.y, out.z);
        rgb.setXYZ(count++, color.r, color.g, color.b);
      }
      geometry.setDrawRange(0, count);
      positions.needsUpdate = rgb.needsUpdate = true;
    }
  };
}
