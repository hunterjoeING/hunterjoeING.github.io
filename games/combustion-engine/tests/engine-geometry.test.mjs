import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { registerHooks } from 'node:module';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { IGNITION_WINDOW_DEG, MIN_IGNITION_SECONDS, SPARK_SECONDS, buildEngineProfile, computeEngineTelemetry,
  getCylinderStroke, getTourStepsForProfile, ignitionWindow } from '../ce-data.js';
import { BASE_RADIUS, BUCKET_TOP, CAM_Y, CROWN_OFFSET, CRANK_RADIUS, MAX_LIFT, ROD_LENGTH, SEAT_Y,
  BELT_WIDTH, DRIVE_BORE, DRIVE_CLEARANCE, WHEEL_WIDTH, beltPoint, camOutline, crankshaftSections,
  displayCrankSpeed, timingDrive, timingMounts } from '../ce-mechanics.js';
import { buildPlumbing, passage } from '../ce-plumbing.js';

// Mirror the page's import map, including when running the real mesh builder.
const three = new URL('../../../shared/vendor/three-0.170.0/build/three.module.min.js', import.meta.url).href;
registerHooks({ resolve(id, context, next) {
  return id === 'three' ? { url: three, shortCircuit: true } : next(id, context);
} });
const { AdditiveBlending, Box3, Matrix4, PerspectiveCamera, Vector3, Raycaster, ShaderLib } = await import('three');
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
    const batch = createTracers(graph, tracerBudget({}, 390));
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
    const normal = displayCrankSpeed(profile.specs.maxRpm * 6 * 0.045);
    const fastest = displayCrankSpeed(profile.specs.maxRpm * 6 * 0.045 * 0.38 / 0.16);
    const fastWindow = ignitionWindow(fastest, normal);
    near(fastWindow / fastest, MIN_IGNITION_SECONDS);
    for (const speed of [normal, fastest]) {
      const sparkWindow = SPARK_SECONDS * speed;
      for (const spec of specs) {
        let samples = 0;
        for (let ms = -89.5; ms < 15; ms++) {
          const phase = start + speed * ms / 1000;
          const stroke = getCylinderStroke(phase - spec.phaseDeg, spec.index, profile, {}, fastWindow, undefined, sparkWindow);
          assert.equal(stroke.sparkIntensity > 0, !diesel && ms >= -80 && ms < 0);
          if (stroke.sparkIntensity) {
            samples++;
            assert.equal(stroke.flashIntensity, 0);
          }
        }
        near(samples, diesel ? 0 : SPARK_SECONDS * 1000, 1);
      }
    }
    for (const window of [IGNITION_WINDOW_DEG, fastWindow]) {
      const lit = [];
      let maxLit = 0;
      for (let degree = first; degree < first + 720; degree++) {
        let active = 0;
        for (const spec of specs) {
          const stroke = getCylinderStroke(degree, spec.index, profile, {}, window);
          assert.equal(stroke.flashIntensity > 0, stroke.cycle > start && stroke.cycle < start + window);
          if (stroke.flashIntensity > 0) active++;
          if (stroke.cycle === start + 1 && stroke.flashIntensity > 0) lit.push(spec.number);
          if (stroke.cycle === start + Math.round(window / 3)) assert.ok(stroke.flashIntensity > 0.9);
        }
        maxLit = Math.max(maxLit, active);
      }
      assert.deepEqual(lit, profile.layout.firingOrder.split(' – ').map(Number));
      assert.equal(maxLit, Math.ceil(window * specs.length / 720));
    }
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
    const savedWindow = globalThis.window;
    globalThis.window = { ArcadeAudio: { isMuted: () => true } };
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
      for (const name of ['sparkPlug','spark','sparkArc','sparkHalo','glowPlug','directInjector','sprayIgnition']) {
        const present = name.startsWith('spark') ? !diesel : diesel;
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
      const ignition = model.root.getObjectsByProperty('name', diesel ? 'sprayIgnition' : 'petrolFlame');
      const seen = new Set();
      const arcs = model.root.getObjectsByProperty('name', 'spark');
      const eye = new Vector3(...power.cameraPos);
      const nearBank = Math.max(...profile.layout.bankAnglesDeg);
      const focus = profile.layout.cylinderSpecs.find(c => c.bankAngleDeg === nearBank);
      const demoTelemetry = computeEngineTelemetry(power.demoRpm, 0.6, undefined, profile);
      let sawSparkGap = false;
      for (let i = 0; i < 100; i++) {
        const { strokes } = model.update(1 / 30, demoTelemetry, power.demoTimeScale);
        for (const arc of arcs) {
          const spec = profile.layout.cylinderSpecs.find(c => c.x === arc.parent.parent.position.x);
          assert.equal(arc.visible, strokes[spec.index].sparkIntensity > 0);
          assert.equal(arc.getObjectByName('sparkHalo').visible, arc.visible);
          if (arc.visible) {
            assert.equal(strokes[spec.index].flashIntensity, 0);
            if (spec === focus && !sawSparkGap) {
              model.root.updateMatrixWorld(true);
              const gap = arc.getObjectByName('sparkHalo').getWorldPosition(new Vector3());
              const ray = gap.sub(eye);
              const caster = new Raycaster(eye, ray.clone().normalize(), 0, ray.length());
              const blockers = caster.intersectObject(model.root, true).filter(({ object }) =>
                object.isMesh && object.visible && !object.material.transparent && object.parent !== arc);
              assert.equal(blockers.length, 0, 'Tour view into the electrode gap');
              sawSparkGap = true;
            }
          }
        }
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
      assert.equal(sawSparkGap, !diesel);
      assert.equal(seen.size, profile.layout.cylinders, 'Every chamber lights up during the ignition tour step');
      assert.deepEqual(steps.map(s => s.id).filter(Boolean), diesel
        ? ['legend','commonRail','turbocharger','intercooler','dpf','hpEgr','lpEgr'] : ['legend','portInjectors']);
      assert.deepEqual(steps.slice(-4).map(s => s.demo), ['pedal','equilibrium','gearing','map']);
      for (const s of steps) {
        assert.ok(parts.has(s.focusPart), s.title);
        if (s.id) assert.ok(s.cameraTarget.every(Number.isFinite));
      }
      model.triggerExplosion(telemetry.rpm);
      let detonation = false;
      for (let i = 0; i < 50; i++) {
        if (model.update(0.05, telemetry).explosion.justBlown) detonation = true;
      }
      assert.ok(detonation);
      model.update(0.05, telemetry);
      assert.ok([...ignition, ...arcs, cloud].every(o => !o.visible));
      assert.equal(model.root.getObjectByName('ignitionLight').intensity, 0);
      model.setViewMode('xray'); // Leaving the damaged view repairs the moving assembly.
      assert.equal(model.update(0.05, telemetry).explosion.phase, 'idle');
      assert.ok(cloud.visible);
      let relit = false;
      for (let i = 0; i < 32; i++) {
        model.update(0.05, telemetry);
        if (ignition.some(o => o.visible)) relit = true;
      }
      assert.ok(relit);
    } finally {
      if (savedWindow) globalThis.window = savedWindow;
      else delete globalThis.window;
      if (saved) globalThis.document = saved;
      else delete globalThis.document;
    }
  });
}

test('The petrol arc and white light bridge the gap for 80 ms at fast playback and freeze with the crank', () => {
  const profile = buildEngineProfile('v8', 'otto');
  const saved = globalThis.document;
  globalThis.document = { createElement: () => ({ getContext: () => ({ fillRect() {} }) }) };
  let model;
  try { model = createCombustionEngineModel(profile); }
  finally { if (saved) globalThis.document = saved; else delete globalThis.document; }
  model.setFlowVisible(false);
  const arc = model.root.getObjectByName('spark'), flame = model.root.getObjectByName('petrolFlame');
  const halo = arc.getObjectByName('sparkHalo'), core = arc.getObjectByName('sparkArc');
  const light = model.root.getObjectByName('ignitionLight');
  const path = core.geometry.parameters.path;
  const first = path.getPoint(0), last = path.getPoint(1);
  assert.ok(first.distanceTo(last) > 0.12 && path.getLength() > first.distanceTo(last) * 1.15);
  assert.ok(core.geometry.parameters.radius >= 0.016);
  const hardware = arc.parent.parent;
  const tip = hardware.children.find(mesh => mesh.geometry?.parameters.radiusBottom === 0.03);
  const point = new Vector3();
  const high = computeEngineTelemetry(profile.specs.maxRpm, 1, undefined, profile);
  const dt = 1 / 500;
  for (const scale of [0.38, 0.06]) {
    let seen = false, elapsed = 0;
    for (let frame = 0; frame < 2000; frame++) {
      model.update(dt, high, scale);
      if (arc.visible) {
        elapsed += dt;
        assert.equal(flame.visible, false);
        assert.equal(light.color.getHex(), 0xeef6ff);
        assert.ok(light.intensity >= 1);
        assert.ok(light.getWorldPosition(point).distanceTo(halo.getWorldPosition(new Vector3())) < 1e-7);
        if (!seen) {
          const pulse = light.intensity;
          model.update(0.05, high, 0);
          assert.ok(arc.visible);
          near(light.intensity, pulse);
          // Centre pin end and the top of the ground strap bound the two ends.
          near(arc.parent.position.y + first.y, tip.position.y - tip.geometry.parameters.height / 2);
          const foot = arc.parent.children[1];
          near(last.y, foot.position.y + foot.geometry.parameters.height / 2);
          assert.ok(Math.abs(last.x - foot.position.x) < foot.geometry.parameters.width / 2);
          seen = true;
        }
      } else if (seen) {
        if (!flame.visible) continue; // A frame exactly on the boundary has zero flame intensity.
        const source = flame.material.uniforms.source.value.clone();
        flame.localToWorld(source);
        arc.localToWorld(point.copy(first).lerp(last, 0.5));
        assert.ok(source.distanceTo(point) < 1e-6, 'The flame starts in the visible spark gap');
        break;
      }
    }
    assert.ok(seen && flame.visible);
    if (scale === 0.38) near(elapsed, SPARK_SECONDS, dt);
    else assert.ok(elapsed > SPARK_SECONDS + dt);
  }
});

test('The spark halo stays centred and readable in the reset and tour cameras at desktop and phone sizes', () => {
  const profile = buildEngineProfile('r4', 'otto');
  const saved = globalThis.document;
  globalThis.document = { createElement: () => ({ getContext: () => ({ fillRect() {} }) }) };
  let model;
  try { model = createCombustionEngineModel(profile); }
  finally { if (saved) globalThis.document = saved; else delete globalThis.document; }
  const power = getTourStepsForProfile(profile).find(step => !step.id && step.focusPart === 'sparkPlugs');
  const telemetry = computeEngineTelemetry(power.demoRpm, 0.6, undefined, profile);
  model.setFlowVisible(false);
  const sparks = model.root.getObjectsByProperty('name', 'spark');
  const spark = sparks[0], halo = spark.getObjectByName('sparkHalo'), core = spark.getObjectByName('sparkArc');
  assert.ok(sparks.every(s => s.getObjectByName('sparkHalo').material === halo.material &&
    s.getObjectByName('sparkHalo').geometry === halo.geometry));
  const main = readFileSync(new URL('../ce-main.js', import.meta.url), 'utf8').replace(/^import [\s\S]*?;\n/gm, '');
  const resetCamera = runInNewContext(main + '\ncameraForLayout', {
    document: { readyState: 'loading', addEventListener() {} }
  });
  for (let i = 0; i < 600 && !spark.visible; i++) model.update(1 / 60, telemetry, power.demoTimeScale);
  assert.ok(spark.visible);
  for (const mode of ['normal', 'cutaway', 'xray', 'exploded']) {
    model.setViewMode(mode);
    model.update(0, telemetry, 0);
    const open = mode === 'cutaway' || mode === 'xray';
    assert.equal(halo.visible, open);
    assert.equal(core.material.depthTest, !open);
    if (!open) continue;
    halo.traverseAncestors(parent => assert.ok(parent.visible));
    assert.equal(halo.material.depthTest || halo.material.depthWrite, false);
    assert.equal(halo.material.blending, AdditiveBlending);
    assert.ok(core.renderOrder > halo.renderOrder && halo.renderOrder > 0);
    const center = halo.getWorldPosition(new Vector3());
    for (const [width, height] of [[906, 726], [390, 748]]) {
      const aspect = width / height;
      const reset = resetCamera(mode, profile, aspect);
      for (const [eye, look] of [[reset.pos, reset.target], [power.cameraPos, power.cameraTarget]]) {
        const camera = new PerspectiveCamera(42, aspect, 0.1, 120);
        camera.position.set(...eye);
        camera.lookAt(...look);
        camera.updateMatrixWorld(true);
        const ndc = center.clone().project(camera);
        assert.ok(Math.abs(ndc.x) < 1 && Math.abs(ndc.y) < 1 && Math.abs(ndc.z) < 1);
        halo.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, halo.matrixWorld);
        halo.material.onBeforeRender({ getSize: out => out.set(width, height) }, null, camera, halo.geometry, halo);
        const edge = center.clone().applyMatrix4(camera.matrixWorldInverse);
        edge.x += halo.material.uniforms.diameter.value / 2;
        const pixels = (edge.applyMatrix4(camera.projectionMatrix).x - ndc.x) * width;
        assert.ok(pixels >= 30 - 1e-6 && pixels <= 46 + 1e-6, `${pixels} CSS px`);
      }
    }
  }
  model.setViewMode(power.viewMode);
  const flame = model.root.getObjectByName('petrolFlame'), light = model.root.getObjectByName('ignitionLight');
  let transition = false, amber = false;
  for (let i = 0; i < 1200 && !amber; i++) {
    model.update(1 / 240, telemetry, power.demoTimeScale);
    if (!flame.visible) continue;
    assert.equal(spark.visible, false);
    const progress = flame.material.uniforms.progress.value;
    if (progress > 0.03 && progress < 0.10) {
      assert.ok(light.color.getHex() !== 0xeef6ff && light.color.getHex() !== 0xffab52);
      transition = true;
    }
    if (progress >= 0.14 && light.intensity > 0.1) {
      assert.equal(light.color.getHex(), 0xffab52);
      amber = true;
    }
  }
  assert.ok(transition && amber, 'The shared point light warms as the arc ignites the charge');
});

test('Mobile and desktop tracer budgets both use a single preallocated batch', () => {
  assert.equal(tracerBudget({ hardwareConcurrency: 4 }), 4032);
  assert.equal(tracerBudget({ hardwareConcurrency: 8, deviceMemory: 2 }), 4032);
  assert.equal(tracerBudget({ hardwareConcurrency: 8, deviceMemory: 8 }, 390), 4032);
  assert.equal(tracerBudget({ hardwareConcurrency: 8, deviceMemory: 8 }, 1280), 10752);
});

test('The larger budgets increase the actual visible parcel density at idle and full load', () => {
  const graph = buildPlumbing(buildEngineProfile('r4', 'otto'));
  preparePassages(graph);
  const crowns = new Float32Array(4).fill(2);
  for (const [oldBudget, budget] of [[2304, tracerBudget({}, 390)], [6144, tracerBudget({}, 1280)]]) {
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
      assert.ok(ratio >= 1.60 && ratio <= 1.80, `visible density ratio ${ratio}`);
    }
  }
});

test('Each petrol chamber retains burnt charge at idle while the throttle still meters fresh air', () => {
  const graph = buildPlumbing(buildEngineProfile('v8', 'otto'));
  preparePassages(graph);
  const cap = tracerBudget({}, 390);
  const batch = createTracers(graph, cap);
  const { position, color } = batch.cloud.geometry.attributes;
  const crowns = new Float32Array(graph.cylinders.length);
  const counts = [];
  for (const load of [0, 1]) {
    let air = 0, total = 0;
    for (let frame = 0; frame < 96; frame++) {
      const clock = (frame + load * 96) * 90;
      for (const { spec } of graph.cylinders) {
        const phase = (clock + spec.phaseDeg) * Math.PI / 180;
        crowns[spec.index] = CROWN_OFFSET + CRANK_RADIUS * Math.cos(phase)
          + Math.sqrt(ROD_LENGTH ** 2 - (CRANK_RADIUS * Math.sin(phase)) ** 2);
      }
      batch.update(clock, crowns, load, 0);
      if (frame < 64) continue;
      for (const { spec } of graph.cylinders) {
        const a = spec.bankAngleDeg * Math.PI / 180, cos = Math.cos(a), sin = Math.sin(a);
        let spent = 0;
        for (let i = 0; i < batch.cloud.geometry.drawRange.count; i++) {
          const y = position.getY(i) - graph.y0, z = position.getZ(i);
          const height = y * cos + z * sin;
          if (height <= crowns[spec.index] || height >= SEAT_Y ||
              Math.hypot(position.getX(i) - spec.x, z * cos - y * sin) > 0.50) continue;
          total++;
          if (color.getZ(i) > 0.9) air++;
          else if (color.getX(i) < 0.5) spent++;
        }
        assert.ok(spent >= Math.floor(cap / (32 * graph.cylinders.length)), 'Residuals stay above every moving crown');
      }
    }
    counts.push({ total, air });
  }
  assert.ok(counts[0].air > 0 && counts[0].air < counts[1].air / 4);
  assert.ok(counts[0].total < counts[1].total);
});

for (const concept of ['otto', 'diesel']) {
  test(concept + ' V8 overlaps independent flames, holds them on pause and slows their fade in slow motion', () => {
    const profile = buildEngineProfile('v8', concept);
    const saved = globalThis.document;
    globalThis.document = { createElement: () => ({ getContext: () => ({ fillRect() {} }) }) };
    let model;
    try {
      model = createCombustionEngineModel(profile);
    } finally {
      if (saved) globalThis.document = saved;
      else delete globalThis.document;
    }
    model.setFlowVisible(false);
    const kernels = model.root.getObjectsByProperty('name', concept === 'otto' ? 'petrolFlame' : 'sprayIgnition');
    assert.equal(new Set(kernels.map(k => k.material)).size, 8);
    assert.equal(new Set(kernels.map(k => k.geometry)).size, 1);
    const [light] = model.root.getObjectsByProperty('isPointLight', true);
    assert.equal(model.root.getObjectsByProperty('isPointLight', true).length, 1);
    assert.ok(light.distance <= 1.5 && !light.castShadow);
    const pin = model.root.getObjectsByProperty('name', 'wristPin')
      .find(p => p.parent.position.x === kernels[0].position.x);
    const crownHeight = Math.max(...pin.parent.children.map(mesh => {
      mesh.updateMatrix();
      mesh.geometry.computeBoundingBox();
      return mesh.geometry.boundingBox.clone().applyMatrix4(mesh.matrix).max.y;
    }));
    const high = computeEngineTelemetry(profile.specs.maxRpm, 0.9, undefined, profile);
    const dt = 1 / 240;
    for (const scale of [0.38, 0.06]) {
      model.update(0, high, scale); // Ignore a burn already underway when the model was opened.
      let elapsed = 0, bright = 0, started = false, complete = false, paused = false;
      let previous = kernels[0].visible, filled = false;
      for (let frame = 0; frame < 1600 && !complete; frame++) {
        model.update(dt, high, scale);
        const k = kernels[0];
        if (k.visible && !previous) started = true;
        if (started && k.visible) {
          elapsed += dt;
          if (k.material.uniforms.brightness.value > 0.12) bright += dt;
          const crown = pin.parent.position.y + crownHeight;
          const floor = k.position.y - k.scale.y;
          assert.ok(floor >= crown && k.position.y + k.scale.y <= SEAT_Y && k.scale.x < 0.54);
          if (floor < crown + 0.055 && k.scale.x > 0.50 && k.material.uniforms.brightness.value > 0.60) filled = true;
          const active = kernels.filter(other => other.visible);
          if (active.length === 2 && light.intensity > 0.015 && !paused) {
            const world = light.getWorldPosition(new Vector3());
            const arc = model.root.getObjectsByProperty('name', 'spark').find(other => other.visible);
            const sources = arc ? [arc.getObjectByName('sparkHalo')] : active;
            assert.ok(sources.some(other => other.getWorldPosition(new Vector3()).distanceTo(world) < 1e-7));
            assert.notEqual(active[0].material.uniforms.progress.value, active[1].material.uniforms.progress.value);
            const snapshot = () => kernels.map(other => [other.visible, other.scale.y, other.material.uniforms.brightness.value]);
            const frozen = snapshot(), intensity = light.intensity;
            model.update(0.05, high, 0);
            assert.deepEqual(snapshot(), frozen);
            near(light.intensity, intensity);
            paused = true;
          }
        }
        if (started && previous && !k.visible) complete = true;
        previous = k.visible;
      }
      assert.ok(complete && filled && paused, 'A complete near-bore burn overlaps a separate lit chamber');
      assert.ok(bright >= 0.150, 'Perceptible brightness persists for at least 150 ms');
      if (scale === 0.38) near(elapsed, MIN_IGNITION_SECONDS, dt * 1.01);
      else assert.ok(elapsed > MIN_IGNITION_SECONDS + dt);
    }
  });

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
        near(out.distanceTo(out.clone().fromArray(graph.nodes[p.fuel ? 'pump' : 'filterMouth'])), 0, 5e-7);
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
        near(out.distanceTo(out.clone().fromArray(graph.nodes.tail)), 0, 5e-7);
      }
      counts.push({ active, fraction: fuel / active });
    }
    assert.equal(cases.size, graph.diesel ? 6 : 2);
    assert.ok(counts[1].active > counts[0].active);
    assert.ok(counts[1].fraction > counts[0].fraction);
  });
}
