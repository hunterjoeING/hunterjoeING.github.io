import * as THREE from 'three';
import { passage } from './ce-plumbing.js?v=0.5.2';
import { SEAT_Y } from './ce-mechanics.js?v=0.5.2';
import { TRACER_SIZE, passThrottle, setThrottleOpening } from './ce-throttle.js?v=0.5.2';

import { buildLanes, LANE_RADIUS, sampleLane } from './ce-lanes.js?v=0.5.2';
import { gasDensityPercent } from './ce-settings.js?v=0.5.2';

const AIR = 0, FUEL = 1, BURNT = 2;
const colors = [0x389cff, 0xf03137, 0x75422c].map(c => new THREE.Color(c));

function timedRoute({ edges, lanes }, boost) {
  let duration = 0;
  let throttleTime = 0;
  const stops = edges.map(e => {
    let speed = e.speed;
    if (e.part === 'intercooler') speed /= 1 + boost * 0.42;
    duration += e.length / speed;
    if (e.to === 'throttle') throttleTime = duration;
    return duration;
  });
  return { edges, lanes, stops, duration, throttleFraction: throttleTime / duration };
}

export function trace(route, fraction, p, out) {
  const time = Math.min(1, Math.max(0, fraction)) * route.duration;
  let i = 0;
  while (i < route.stops.length - 1 && time > route.stops[i]) i++;
  const e = route.edges[i];
  const start = i ? route.stops[i - 1] : 0;
  const u = (time - start) / (route.stops[i] - start);
  sampleLane(route.lanes[i], Math.max(0, Math.min(1, u)) * e.count, p, out);
  if (e.throttle) passThrottle(e.throttle, p, out);
}

// Boost changes transit times only. Reuse the geometric lookup for every
// parcel, load band and seat that follows the same passage.
const preparedPaths = new WeakMap();
export function routesForSeat(g, cyl, seat, boost) {
  if (!preparedPaths.has(g)) preparedPaths.set(g, new Map());
  const cache = preparedPaths.get(g);
  function path(from, to, branch = '') {
    const key = from + '>' + to + '/' + branch;
    if (!cache.has(key)) {
      const edges = passage(g, from, to, branch);
      cache.set(key, { edges, lanes: buildLanes(edges) });
    }
    return cache.get(key);
  }
  // Petrol is metered at the nozzle. Keep the same transported lane across
  // that timing boundary, from the rail through the fitting into the runner.
  const fuel = path('pump', g.diesel ? cyl.nozzle : seat.enter);
  const split = g.diesel ? fuel.edges.length : fuel.edges.findIndex(e => e.from === cyl.nozzle);
  const run = (from, to, branch) => timedRoute(path(from, to, branch), boost);
  return {
    air: run('filterMouth', seat.enter),
    fuel: timedRoute({ edges: fuel.edges.slice(0, split), lanes: fuel.lanes.slice(0, split) }, boost),
    port: g.diesel ? null : timedRoute({ edges: fuel.edges.slice(split), lanes: fuel.lanes.slice(split) }, boost),
    tail: run(seat.leave, 'tail'),
    hp: g.diesel ? run(seat.leave, seat.enter, 'hpEgr') : null,
    lp: g.diesel ? run(seat.leave, seat.enter, 'lpEgr') : null,
    enter: new THREE.Vector3(...g.nodes[seat.enter]),
    nozzle: new THREE.Vector3(...g.nodes[cyl.nozzle]),
    leave: new THREE.Vector3(...g.nodes[seat.leave])
  };
}

export function tracerBudget(hardware = {}, viewportWidth = globalThis.innerWidth) {
  const compact = viewportWidth <= 768;
  const lowPower = (hardware.hardwareConcurrency ?? 8) <= 4 || (hardware.deviceMemory ?? 8) <= 4;
  return compact || lowPower ? 4032 : 10752;
}

const fract = x => x - Math.floor(x);
const clamp = x => Math.max(0, Math.min(1, x));

export function beginJourney(p, graph, load, boost) {
  const seed = fract(p.seed + p.trip * 0.61803398875);
  if (graph.throttle) setThrottleOpening(graph.throttle, load);
  const gasAmount = graph.throttle?.flow ?? (0.53 + 0.24 * load + 0.23 * boost);
  p.meterRank = fract(seed * 237.131);
  p.active = p.meterRank < gasAmount;
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
  if (graph.throttle) {
    p.metered = false;
    p.gate = p.fuel ? p.inject : p.birth + (p.arrival - p.birth) * route.air.throttleFraction;
  }
  p.second = p.returnRoute ? Math.ceil((p.release + p.returnRoute.duration * 78 - p.admit) / 720) * 720 : 0;
  p.end = p.second + p.release + route.tail.duration * 81;
}

function chamberPosition(p, crown, out) {
  const h = SEAT_Y - crown;
  const localY = crown + 0.045 + p.height * (h - 0.085);
  out.set(p.cyl.spec.x + p.radialX, p.y0 + localY * p.cos - p.radialZ * p.sin,
    localY * p.sin + p.radialZ * p.cos);
}

// Blend to the actual valve points so dots cross continuously between the ducts and bore.
function chamber(p, t, arrival, source, crown, out) {
  chamberPosition(p, crown, out);
  if (t < arrival + 33) out.lerp(source, 1 - clamp((t - arrival) / 33));
  else if (t > p.release - 38) out.lerp(p.route.leave, clamp((t - p.release + 38) / 38));
}

export function sampleJourney(p, graph, t, crown, out) {
  const r = p.route;
  p.pointScale = 1;
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

export function createTracers(graph, budget = tracerBudget(globalThis.navigator), density = 100) {
  const capacity = 2 * budget;
  const positions = new THREE.BufferAttribute(new Float32Array(capacity * 3), 3).setUsage(THREE.DynamicDrawUsage);
  const rgb = new THREE.BufferAttribute(new Float32Array(capacity * 3), 3).setUsage(THREE.DynamicDrawUsage);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', positions);
  geometry.setAttribute('color', rgb);
  // A shaded circular point sprite reads as a bead even at medium zoom.
  const mat = new THREE.PointsMaterial({ size: TRACER_SIZE, vertexColors: true, toneMapped: false });
  const sizes = graph.throttle
    ? new THREE.BufferAttribute(new Float32Array(capacity), 1).setUsage(THREE.DynamicDrawUsage)
    : null;
  if (sizes) geometry.setAttribute('throttleScale', sizes);
  mat.customProgramCacheKey = () => sizes ? 'petrol-tracers' : 'diesel-tracers';
  mat.onBeforeCompile = shader => {
    if (sizes) {
      shader.vertexShader = 'attribute float throttleScale;\n' + shader.vertexShader
        .replace('gl_PointSize = size;', 'gl_PointSize = size * throttleScale;');
    }
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
  const residuals = [];
  const out = new THREE.Vector3();
  function addSlot(i) {
    const n = i % graph.cylinders.length, cyl = graph.cylinders[n];
    const lane = Math.floor(i / graph.cylinders.length);
    const rank = fract((lane + 0.5) * 0.61803398875);
    const radius = Math.sqrt(fract((i + 1) * 0.754877666));
    const angle = (i + 1) * 2.39996323, a = cyl.spec.bankAngleDeg * Math.PI / 180;
    const parcel = {
      n, cyl, rank, sin: Math.sin(a), cos: Math.cos(a), y0: graph.y0,
      height: 0.04 + 0.92 * fract(i * 0.56984029),
      radialX: 0.45 * radius * Math.cos(angle), radialZ: 0.45 * radius * Math.sin(angle)
    };
    // A small, evenly distributed charge stays in each chamber across cycles.
    // Its fixed slots precede the metered flow and never enter the intake.
    if (lane % 32 === 0) {
      residuals.push(parcel);
      return;
    }
    particles.push(Object.assign(parcel, {
      seed: fract((i + 0.5) * 0.414213562), trip: 0, initialized: false,
      meterRank: 0, metered: false, gate: 0, pointScale: 1,
      options: options[n][lane % 2], admit: 12 + rank * 152, release: 552 + rank * 153,
      burn: 360 + radius * 15,
      laneX: LANE_RADIUS * radius * Math.cos(angle), laneZ: LANE_RADIUS * radius * Math.sin(angle)
    }));
  }
  let activeParcels = 0, activeResiduals = 0, dirty = false;
  function setDensity(percent) {
    const cap = Math.round(budget * gasDensityPercent(percent) / 100);
    if (cap === activeParcels + activeResiduals) return;
    for (let i = particles.length + residuals.length; i < cap; i++) addSlot(i);
    // Each block starts with one residual per cylinder, followed by 31 travelling lanes.
    const cylinders = graph.cylinders.length, block = 32 * cylinders;
    const retained = Math.floor(cap / block) * cylinders + Math.min(cap % block, cylinders);
    for (let i = activeResiduals; i < retained; i++) {
      rgb.setXYZ(i, colors[BURNT].r, colors[BURNT].g, colors[BURNT].b);
      if (sizes) sizes.setX(i, 1);
    }
    activeResiduals = retained;
    for (let i = activeParcels; i < cap - retained; i++) particles[i].initialized = false;
    activeParcels = cap - retained;
    dirty = true;
  }
  setDensity(density);
  geometry.setDrawRange(0, 0);
  const triples = { start: 0, count: 0 }, singles = { start: 0, count: 0 };
  let lastClock = -Infinity;
  return {
    cloud, setDensity,
    get activeBudget() { return activeResiduals + activeParcels; },
    update(crankClock, crowns, load, boostBar) {
      if (!dirty && crankClock === lastClock && (!graph.throttle || load === graph.throttle.load)) return;
      dirty = false;
      if (graph.throttle) setThrottleOpening(graph.throttle, load);
      const refill = crankClock - lastClock > 1440;
      lastClock = crankClock;
      let count = 0;
      for (let i = 0; i < activeResiduals; i++) {
        const p = residuals[i];
        chamberPosition(p, crowns[p.n], out);
        positions.setXYZ(count++, out.x, out.y, out.z);
      }
      const boost = clamp(boostBar / 1.85);
      for (let i = 0; i < activeParcels; i++) {
        const p = particles[i];
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
        // A pedal change affects the next crossings. Parcels already admitted
        // finish their journeys, including the matching port-injected fuel.
        if (graph.throttle && !p.metered) {
          p.active = p.meterRank < graph.throttle.flow;
          p.metered = t >= p.gate;
        }
        if (!p.active || t < p.birth || t > p.end) continue;
        const color = colors[sampleJourney(p, graph, t, crowns[p.n], out)];
        positions.setXYZ(count, out.x, out.y, out.z);
        if (sizes) sizes.setX(count, p.pointScale);
        rgb.setXYZ(count++, color.r, color.g, color.b);
      }
      geometry.setDrawRange(0, count);
      triples.count = count * 3;
      positions.updateRanges[0] = rgb.updateRanges[0] = triples;
      positions.needsUpdate = rgb.needsUpdate = true;
      if (sizes) {
        singles.count = count;
        sizes.updateRanges[0] = singles;
        sizes.needsUpdate = true;
      }
    }
  };
}
