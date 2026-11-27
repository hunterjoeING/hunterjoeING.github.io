import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import test from 'node:test';
import { IGNITION_WINDOW_DEG, buildEngineProfile, computeEngineTelemetry, getCylinderStroke, getTourStepsForProfile } from '../ce-data.js';
import { BASE_RADIUS, BUCKET_TOP, CAM_Y, CROWN_OFFSET, CRANK_RADIUS, MAX_LIFT, ROD_LENGTH, SEAT_Y,
  BELT_WIDTH, DRIVE_BORE, DRIVE_CLEARANCE, WHEEL_WIDTH, beltPoint, camOutline, crankshaftSections,
  displayCrankSpeed, timingDrive, timingMounts } from '../ce-mechanics.js';
import { buildPlumbing, passage } from '../ce-plumbing.js';

// Mirror the page's import map, including when running the real mesh builder.
const three = new URL('../../../shared/vendor/three-0.170.0/build/three.module.min.js', import.meta.url).href;
registerHooks({ resolve(id, context, next) {
  return id === 'three' ? { url: three, shortCircuit: true } : next(id, context);
} });
const { Box3, Matrix4, Vector3, Raycaster, ShaderLib } = await import('three');
const { preparePassages } = await import('../ce-ducts.js');
const { junctionGeometry } = await import('../ce-junctions.js');
const { createCombustionEngineModel } = await import('../ce-model.js');
const { createTracers, tracerBudget, routesForSeat, beginJourney, sampleJourney } = await import('../ce-tracers.js');

function near(a, b, tolerance = 1e-7) {
  assert.ok(Math.abs(a - b) <= tolerance, `${a} differs from ${b}`);
}
function continuous(path, from, to) {
  let at = from;
  for (const edge of path) {
    assert.equal(edge.from, at);
    at = edge.to;
  }
  assert.equal(at, to);
}

function checkFitting(rings) {
  const geometry = junctionGeometry(rings);
  const faces = geometry.index.array, edges = new Map();
  const vertices = geometry.attributes.position.count, sides = rings[0].length;
  function key(a, b) { return Math.min(a, b) * vertices + Math.max(a, b); }
  for (let i = 0; i < faces.length; i += 3) {
    for (let j = 0; j < 3; j++) {
      const edge = key(faces[i + j], faces[i + (j + 1) % 3]);
      edges.set(edge, (edges.get(edge) || 0) + 1);
    }
  }
  for (let i = 0; i < vertices; i++) {
    const rim = key(i, i % sides === sides - 1 ? i + 1 - sides : i + 1);
    assert.equal(edges.get(rim), 1, 'One fitting face meets each duct rim edge');
    edges.delete(rim);
  }
  for (const count of edges.values()) assert.equal(count, 2, 'Closed fitting wall');
  geometry.dispose();
}

test('The belt closes on tangent contacts, clears every other wheel and has an integral tooth count', () => {
  const { wheels, segments, length, teeth, pitch } = timingDrive();
  const [crank, tensioner, a, b] = wheels;
  near(a.radius, b.radius);
  near(a.radius, crank.radius * 2);
  assert.ok(Math.hypot(a.y - b.y, a.z - b.z) > a.radius + b.radius);
  assert.equal(tensioner.id, 'tensioner');
  near(teeth * pitch, length);
  for (const w of wheels) near(2 * Math.PI * w.radius / w.teeth, pitch);
  for (const [i, seg] of segments.entries()) {
    const end = beltPoint(seg, 1), next = beltPoint(segments[(i + 1) % segments.length], 0);
    for (const key of ['y', 'z', 'ny', 'nz']) near(end[key], next[key]);
    for (let j = 0; j <= 100; j++) {
      const p = beltPoint(seg, j / 100);
      for (const w of wheels) assert.ok(Math.hypot(p.y - w.y, p.z - w.z) >= w.radius - 1e-8);
    }
  }
});

function checkMountedDrive(model, layout) {
  model.root.updateMatrixWorld(true);
  const bounds = mesh => new Box3().setFromObject(mesh, true);
  const mounts = timingMounts(layout);
  const nose = model.root.getObjectByName('crankNose');
  const shaft = bounds(nose);
  near(shaft.min.x, mounts.at(-1).x - WHEEL_WIDTH / 2);
  near(shaft.max.x, -layout.crankLength / 2);
  assert.ok(nose.geometry.parameters.radiusTop < DRIVE_BORE);

  const belts = model.root.getObjectsByProperty('name', 'timingBelt');
  assert.equal(belts.length, layout.bankAnglesDeg.length);
  const wideParts = ['crankshaft', 'camshafts', 'cylinderHead', 'block'];
  let front = Infinity;
  model.root.traverse(mesh => {
    if (mesh.isMesh && mesh !== nose && wideParts.includes(mesh.userData.partId)) {
      front = Math.min(front, bounds(mesh).min.x);
    }
  });
  for (const [bank, belt] of belts.entries()) {
    const { x } = mounts[bank];
    near(bounds(belt).min.x, x - BELT_WIDTH / 2);
    near(bounds(belt).max.x, x + BELT_WIDTH / 2);
    for (const id of ['crank', 'camA', 'camB', 'tensioner']) {
      const wheel = belt.parent.getObjectByName(id + 'Sprocket');
      const box = bounds(wheel);
      near(box.min.x, x - WHEEL_WIDTH / 2);
      near(box.max.x, x + WHEEL_WIDTH / 2);
      near(wheel.geometry.parameters.shapes.holes[0].curves[0].xRadius, DRIVE_BORE);
    }
    assert.ok(front - x - Math.max(BELT_WIDTH, WHEEL_WIDTH) / 2 >= DRIVE_CLEARANCE - 1e-6);
  }
}

function checkThrottleClearance(model, profile, graph, cloud) {
  const plate = model.root.getObjectByName('throttlePlate');
  assert.equal(Boolean(plate), !graph.diesel);
  assert.equal(Boolean(cloud.geometry.attributes.throttleScale), !graph.diesel);
  const shader = { ...ShaderLib.points };
  cloud.material.onBeforeCompile(shader);
  assert.equal(shader.vertexShader.includes('gl_PointSize = size * throttleScale;'), !graph.diesel);
  if (graph.diesel) return;
  const cyl = graph.cylinders[0];
  const route = routesForSeat(graph, cyl, cyl.seats[0], 0);
  const p = { seed: 0.013, trip: 0, rank: 0.5, admit: 88, release: 628, options: [route, route] };
  const out = new Vector3(), local = new Vector3();
  const center = new Vector3(...graph.nodes.throttle);
  const incoming = route.air.edges.findIndex(e => e.to === 'throttle');
  const bore = route.air.edges[incoming].radius * Math.cos(Math.PI / 12);
  const { height, radiusTop } = plate.geometry.parameters;
  for (const load of [0, 0.1, 0.3, 0.5, 0.8, 1]) {
    model.update(0, computeEngineTelemetry(1800, load, undefined, profile));
    plate.updateWorldMatrix(true, false);
    const inverse = new Matrix4().copy(plate.matrixWorld).invert();
    beginJourney(p, graph, load, 0);
    assert.ok(!p.fuel && p.active);
    for (let i = -5; i <= 5; i++) for (let j = -5; j <= 5; j++) {
      if (i * i + j * j > 25) continue;
      p.laneX = i / 5 * 0.74;
      p.laneZ = j / 5 * 0.74;
      for (let k = -48; k <= 48; k++) {
        const dz = k / 100;
        const speed = route.air.edges[incoming + (k > 0 ? 1 : 0)].speed;
        const time = route.air.stops[incoming] + dz / speed;
        sampleJourney(p, graph, p.birth + time / route.air.duration * (p.arrival - p.birth), 2, out);
        local.copy(out).applyMatrix4(inverse);
        const q = cloud.material.size * p.pointScale / 2;
        const radial = Math.max(0, Math.hypot(local.x, local.z) - radiusTop);
        const axial = Math.max(0, Math.abs(local.y) - height / 2);
        assert.ok(Math.hypot(radial, axial) >= q - 1e-7, 'Whole bead clears the rendered plate');
        const wallDistance = Math.hypot(out.x - center.x, out.y - center.y);
        assert.ok(wallDistance + q < bore + 1e-7, 'Whole bead stays inside the duct');
        if (k === 0) {
          near(out.z, center.z);
          assert.equal(out.y < center.y, j < 0, 'Both sides of the butterfly carry air');
          if (load === 0) assert.ok(wallDistance > 0.94 * bore);
          if (load === 1 && !i && !j) assert.ok(wallDistance < 0.25 * bore);
        }
        if (load === 0 && k === 2) assert.ok(out.z - center.z > 1.7 * dz, 'Idle jet accelerates in the gap');
      }
    }
  }
}

for (const layout of ['r4', 'boxer4', 'v6', 'v8']) for (const concept of ['otto', 'diesel']) {
  const profile = buildEngineProfile(layout, concept);
  const diesel = profile.concept.directInjection;
  const graph = buildPlumbing(profile);
  const { joints } = preparePassages(graph);

  if (!diesel) test(profile.key + ' meters downstream air and cylinder charge as the pedal opens and closes', () => {
    const batch = createTracers(graph, 3072);
    const { geometry } = batch.cloud;
    const { position, color } = geometry.attributes;
    const [cx, cy, cz] = graph.nodes.throttle;
    const crowns = new Float32Array(profile.layout.cylinders).fill(2);
    const spec = profile.layout.cylinderSpecs[0];
    const bank = spec.bankAngleDeg * Math.PI / 180;
    let clock = 0;
    function downstreamCounts(load) {
      let duct = 0, chamber = 0;
      for (let frame = 0; frame < 96; frame++) {
        batch.update(clock += 90, crowns, load, 0);
        if (frame < 64) continue; // Let previously admitted parcels finish their journeys.
        for (let i = 0; i < geometry.drawRange.count; i++) {
          if (color.getZ(i) < 0.9) continue; // fresh blue air
          const x = position.getX(i), y = position.getY(i), z = position.getZ(i);
          if (z > cz + 0.22 && z < cz + 0.60 && Math.hypot(x - cx, y - cy) < 0.21) duct++;
          const h = (y - graph.y0) * Math.cos(bank) + z * Math.sin(bank);
          const lateral = z * Math.cos(bank) - (y - graph.y0) * Math.sin(bank);
          if (h > 2.05 && h < SEAT_Y - 0.04 && Math.hypot(x - spec.x, lateral) < 0.46) chamber++;
        }
      }
      return [duct, chamber];
    }
    const counts = [0, 0.25, 0.5, 0.75, 1, 0].map(downstreamCounts);
    for (let region = 0; region < 2; region++) {
      assert.ok(counts[0][region] > 0);
      for (let i = 1; i <= 4; i++) assert.ok(counts[i][region] > counts[i - 1][region]);
      assert.ok(counts[5][region] > 0 && counts[5][region] < counts[4][region] / 4);
    }
    const revision = position.version;
    batch.update(clock, crowns, 1, 0);
    assert.ok(position.version > revision, 'Moving the plate while paused reroutes nearby beads');
  });

  test(profile.key + ' leaves axial clearance for each throw throughout its rotation', () => {
    const { pins, webs, mains } = crankshaftSections(profile.layout);
    for (const { x } of timingMounts(profile.layout)) {
      const innerFace = x + Math.max(BELT_WIDTH, WHEEL_WIDTH) / 2;
      // The counterweights are integral with the webs. Rotation around X preserves these faces.
      for (const section of [...mains, ...pins, ...webs]) {
        assert.ok(section.minX - innerFace >= DRIVE_CLEARANCE - 1e-8);
      }
    }
  });

  test(profile.key + ' lights each chamber around compression TDC in firing order', () => {
    const start = diesel ? 356 : 348;
    const specs = profile.layout.cylinderSpecs;
    const first = start - specs[0].phaseDeg;
    const lit = [];
    for (let degree = first; degree < first + 720; degree++) {
      for (const spec of specs) {
        const stroke = getCylinderStroke(degree, spec.index, profile);
        assert.equal(stroke.flashIntensity > 0, stroke.cycle > start && stroke.cycle < start + IGNITION_WINDOW_DEG);
        if (stroke.cycle === start + 1 && stroke.flashIntensity > 0) lit.push(spec.number);
        if (stroke.cycle === start + 11) assert.ok(stroke.flashIntensity > 0.9);
      }
    }
    assert.deepEqual(lit, profile.layout.firingOrder.split(' – ').map(Number));
    const fastest = displayCrankSpeed(profile.specs.maxRpm * 6 * 0.045 * 0.38 / 0.16);
    assert.ok(IGNITION_WINDOW_DEG / fastest >= 0.060);
  });

  test(profile.key + ' connects every gas/fuel passage to the intended ports', () => {
    const sources = new Set(['filterMouth', 'pump']), sinks = new Set(['tail']);
    for (const c of graph.cylinders) {
      continuous(passage(graph, 'pump', c.nozzle), 'pump', c.nozzle);
      if (diesel) sinks.add(c.nozzle); // Central injector terminates inside the chamber.
      for (const { enter, leave } of c.seats) {
        sinks.add(enter);
        sources.add(leave);
        continuous(passage(graph, 'filterMouth', enter), 'filterMouth', enter);
        const exhaust = passage(graph, leave, 'tail');
        continuous(exhaust, leave, 'tail');
        if (!diesel) continuous(passage(graph, c.nozzle, enter), c.nozzle, enter);
        else {
          const destinations = exhaust.map(e => e.to);
          assert.ok(destinations.indexOf('turbineOut') < destinations.indexOf('dpfOut'));
          assert.ok(destinations.includes('lpTap'));
          for (const [branch, visits] of [
            ['hpEgr', ['hpTap', 'hpCoolIn', 'hpCoolOut', 'hpValve', 'hpMix']],
            ['lpEgr', ['turbineOut', 'dpfOut', 'lpTap', 'lpCoolIn', 'lpCoolOut', 'lpValve', 'lpMix', 'compressorOut', 'coolerOut']]
          ]) {
            const path = passage(graph, leave, enter, branch);
            continuous(path, leave, enter);
            assert.deepEqual(path.map(e => e.to).filter(k => visits.includes(k)), visits);
          }
        }
      }
    }
    const names = Object.keys(graph.nodes);
    assert.deepEqual(new Set(names.filter(k => !graph.edges.some(e => e.to === k))), sources);
    assert.deepEqual(new Set(names.filter(k => !graph.edges.some(e => e.from === k))), sinks);
    for (const e of graph.edges) {
      for (const [pt, name] of [[e.centers[0], e.from], [e.centers.at(-1), e.to]]) {
        pt.toArray().forEach((v, axis) => near(v, graph.nodes[name][axis]));
      }
    }
    for (const joint of joints.values()) if (joint.rings) checkFitting(joint.rings);
  });

  test(profile.key + ' keeps unrelated pipe walls and flywheel clear', () => {
    for (const [i, a] of graph.edges.entries()) {
      for (const p of a.centers) {
        if (Math.abs(p.x - profile.layout.flywheelX) < 0.16 + a.radius) {
          assert.ok(Math.hypot(p.y - graph.y0, p.z) > 1.49 + a.radius, a.from + ' crosses flywheel');
        }
      }
      for (const b of graph.edges.slice(0, i)) {
        if ([a.from, a.to].some(k => k === b.from || k === b.to)) continue;
        const min = (a.radius + b.radius) ** 2;
        for (const p of a.centers) for (const q of b.centers) {
          if (p.distanceToSquared(q) < min) assert.fail(a.from + '→' + a.to + ' intersects ' + b.from + '→' + b.to);
        }
      }
    }
  });

  test(profile.key + ' seats, flat followers and piston clearance agree over two revolutions', () => {
    const contour = camOutline();
    for (const spec of profile.layout.cylinderSpecs) {
      for (let cycle = 0; cycle < 720; cycle += 3) {
        const stroke = getCylinderStroke(cycle - spec.phaseDeg, spec.index, profile);
        const rad = cycle * Math.PI / 180;
        const crown = CROWN_OFFSET + CRANK_RADIUS * Math.cos(rad) + Math.sqrt(ROD_LENGTH ** 2 - (CRANK_RADIUS * Math.sin(rad)) ** 2);
        for (const [peak, lift] of [[90, stroke.intakeLift], [630, stroke.exhaustLift]]) {
          const angle = (cycle - peak) * Math.PI / 360;
          const lowest = Math.min(...contour.map(p => p.y * Math.cos(angle) - p.z * Math.sin(angle)));
          near(CAM_Y + lowest, BUCKET_TOP - lift * MAX_LIFT, 0.0003);
          assert.ok(SEAT_Y - 0.024 - lift * MAX_LIFT > crown + 0.045);
          if (cycle === peak) near(lift, 1);
          if (Math.abs(cycle - peak) >= 90) near(lift, 0);
        }
      }
    }
    near(BUCKET_TOP, CAM_Y - BASE_RADIUS);
  });

  test(profile.key + ' renders concept-specific hardware and follows the tour in gas-path order', () => {
    const saved = globalThis.document;
    globalThis.document = { createElement: () => ({ getContext: () => ({ fillRect() {} }) }) };
    try {
      const model = createCombustionEngineModel(profile);
      const telemetry = computeEngineTelemetry(2000, 0.6, undefined, profile);
      const parts = new Set(), names = [], clouds = [];
      model.root.traverse(node => {
        if (node.userData.partId) parts.add(node.userData.partId);
        if (node.name) names.push(node.name);
        if (node.isPoints) clouds.push(node);
      });
      assert.equal(clouds.length, 1);
      const cloud = clouds[0];
      for (const name of ['sparkPlug','spark','glowPlug','directInjector','sprayIgnition']) {
        const present = ['sparkPlug','spark'].includes(name) ? !diesel : diesel;
        assert.equal(names.filter(v => v === name).length, present ? profile.layout.cylinders : 0, name);
      }
      for (const part of ['commonRail','turbocharger','intercooler','hpEgr','lpEgr','dpf']) assert.equal(parts.has(part), diesel);
      assert.equal(parts.has('portInjectors'), !diesel);
      for (let j = 0; j < 65; j++) model.update(1 / 45, telemetry);
      assert.ok(cloud.geometry.drawRange.count > 600);
      const buffer = cloud.geometry.attributes.position;
      assert.ok(buffer.array.subarray(0, 3 * cloud.geometry.drawRange.count).every(Number.isFinite));
      const revision = buffer.version;
      model.update(0.05, telemetry, 0);
      assert.equal(buffer.version, revision, 'Pause holds the same particle buffer');
      checkMountedDrive(model, profile.layout);
      checkThrottleClearance(model, profile, graph, cloud);
      const idle = computeEngineTelemetry(0, 0, undefined, profile);
      const before = model.update(0, idle).crankDeg;
      assert.ok(model.update(0.04, idle).crankDeg !== before && buffer.version > revision);
      const steps = getTourStepsForProfile(profile);
      const power = steps.find(s => !s.id && s.focusPart === (diesel ? 'commonRail' : 'sparkPlugs'));
      const ignition = model.root.getObjectsByProperty('name', diesel ? 'sprayIgnition' : 'spark');
      const seen = new Set();
      const eye = new Vector3(...power.cameraPos);
      const nearBank = Math.max(...profile.layout.bankAnglesDeg);
      const focus = profile.layout.cylinderSpecs.find(c => c.bankAngleDeg === nearBank);
      const demoTelemetry = computeEngineTelemetry(power.demoRpm, 0.6, undefined, profile);
      for (let i = 0; i < 100; i++) {
        const { strokes } = model.update(1 / 30, demoTelemetry, power.demoTimeScale);
        for (const flash of ignition) {
          const spec = profile.layout.cylinderSpecs.find(c => c.x === flash.position.x);
          assert.equal(flash.visible, strokes[spec.index].flashIntensity > 0);
          if (flash.visible && flash.material.uniforms.brightness.value > 0.65) {
            assert.ok(flash.scale.x > 0.15 && flash.position.y + flash.scale.y <= SEAT_Y);
            if (spec === focus && !seen.has(spec.number)) {
              model.root.updateMatrixWorld(true);
              const ray = flash.getWorldPosition(new Vector3()).sub(eye);
              const caster = new Raycaster(eye, ray.clone().normalize(), 0, ray.length());
              const blockers = caster.intersectObject(model.root, true).filter(({ object }) =>
                object.isMesh && object.visible && object !== flash && object.material.opacity > 0.6);
              assert.equal(blockers.length, 0, 'Unobstructed view from the tour camera to the firing chamber');
            }
            seen.add(spec.number);
          }
        }
      }
      assert.equal(seen.size, profile.layout.cylinders, 'Every chamber lights up during the ignition tour step');
      assert.deepEqual(steps.map(s => s.id).filter(Boolean), diesel
        ? ['legend','commonRail','turbocharger','intercooler','dpf','hpEgr','lpEgr'] : ['legend','portInjectors']);
      assert.deepEqual(steps.slice(-4).map(s => s.demo), ['pedal','equilibrium','gearing','map']);
      for (const s of steps) {
        assert.ok(parts.has(s.focusPart), s.title);
        if (s.id) assert.ok(s.cameraTarget.every(Number.isFinite));
      }
    } finally {
      if (saved) globalThis.document = saved;
      else delete globalThis.document;
    }
  });
}

test('Mobile and desktop tracer budgets both use a single preallocated batch', () => {
  assert.equal(tracerBudget({ hardwareConcurrency: 4 }), 3072);
  assert.equal(tracerBudget({ hardwareConcurrency: 8, deviceMemory: 2 }), 3072);
  assert.equal(tracerBudget({ hardwareConcurrency: 8, deviceMemory: 8 }, 390), 3072);
  assert.equal(tracerBudget({ hardwareConcurrency: 8, deviceMemory: 8 }, 1280), 8192);
});

test('The larger budgets increase the actual visible parcel density at idle and full load', () => {
  const graph = buildPlumbing(buildEngineProfile('r4', 'otto'));
  preparePassages(graph);
  const crowns = new Float32Array(4).fill(2);
  for (const [oldBudget, budget] of [[2304, 3072], [6144, 8192]]) {
    for (const load of [0, 1]) {
      const counts = [oldBudget, budget].map(cap => {
        const batch = createTracers(graph, cap);
        const { geometry } = batch.cloud;
        const buffers = geometry.attributes;
        assert.ok(batch.cloud.isPoints && buffers.position.count === cap);
        let sum = 0;
        for (let clock = 0; clock < 720 * 24; clock += 90) {
          batch.update(clock, crowns, load, 0);
          assert.ok(geometry.drawRange.count <= cap);
          sum += geometry.drawRange.count;
        }
        return sum;
      });
      const ratio = counts[1] / counts[0];
      assert.ok(ratio >= 1.30 && ratio <= 1.50, `visible density ratio ${ratio}`);
    }
  }
});

for (const concept of ['otto', 'diesel']) {
  test(concept + ' parcels cross ports continuously, change colour in-cylinder and reach the tailpipe', () => {
    const graph = buildPlumbing(buildEngineProfile('r4', concept));
    preparePassages(graph);
    const cyl = graph.cylinders[0], seat = cyl.seats[0];
    const options = [0, 1].map(boost => routesForSeat(graph, cyl, seat, boost));
    const out = options[0].enter.clone();
    const p = { cyl, options, trip: 0, rank: 0.5, admit: 88, release: 628, burn: 365, sin: 0, cos: 1,
      y0: graph.y0, height: 0.8, radialX: 0.12, radialZ: 0.16, laneX: 0.43, laneZ: -0.38 };
    const cases = new Set(), counts = [];
    function sample(t) {
      const rad = t * Math.PI / 180;
      const crown = CROWN_OFFSET + CRANK_RADIUS * Math.cos(rad) + Math.sqrt(ROD_LENGTH ** 2 - (CRANK_RADIUS * Math.sin(rad)) ** 2);
      return sampleJourney(p, graph, t, crown, out);
    }
    for (const load of [0.18, 1]) {
      let active = 0, fuel = 0;
      for (let i = 0; i < 2400; i++) {
        p.seed = i / 2400;
        beginJourney(p, graph, load, load);
        if (!p.active) continue;
        active++;
        if (p.fuel) fuel++;
        const key = [p.fuel, p.returnRoute === p.route.hp, p.returnRoute === p.route.lp].join('/');
        if (cases.has(key)) continue;
        cases.add(key);
        assert.equal(sample(p.birth), p.fuel ? 1 : 0);
        near(out.distanceTo(out.clone().fromArray(graph.nodes[p.fuel ? 'pump' : 'filterMouth'])), 0);
        sample(p.arrival);
        near(out.distanceTo(p.fuel && graph.diesel ? p.route.nozzle : p.route.enter), 0);
        assert.equal(sample(p.burn - 0.001), p.fuel ? 1 : 0);
        assert.equal(sample(p.burn + 0.001), 2);
        if (p.returnRoute) {
          assert.equal(sample(p.second + p.admit), 2);
          near(out.distanceTo(p.route.enter), 0);
        }
        for (const t of [p.inject, p.arrival, p.burn, p.release, p.second + p.admit, p.second + p.release]) {
          if (t <= p.birth || t >= p.end) continue;
          sample(t - 0.001);
          const before = out.clone();
          sample(t + 0.001);
          assert.ok(out.distanceTo(before) < 0.001, 'Continuous at crank angle ' + t);
        }
        assert.equal(sample(p.end), 2);
        near(out.distanceTo(out.clone().fromArray(graph.nodes.tail)), 0);
      }
      counts.push({ active, fraction: fuel / active });
    }
    assert.equal(cases.size, graph.diesel ? 6 : 2);
    assert.ok(counts[1].active > counts[0].active);
    assert.ok(counts[1].fraction > counts[0].fraction);
  });
}
