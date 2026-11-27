import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import test from 'node:test';
import { buildEngineProfile, computeEngineTelemetry, getCylinderStroke, getTourStepsForProfile } from '../ce-data.js';
import { BASE_RADIUS, BUCKET_TOP, CAM_Y, CROWN_OFFSET, CRANK_RADIUS, MAX_LIFT, ROD_LENGTH, SEAT_Y,
  beltPoint, camOutline, timingDrive } from '../ce-mechanics.js';
import { buildPlumbing, passage } from '../ce-plumbing.js';

// Mirror the page's import map, including when running the real mesh builder.
const three = new URL('../../../shared/vendor/three-0.170.0/build/three.module.min.js', import.meta.url).href;
registerHooks({ resolve(id, context, next) {
  return id === 'three' ? { url: three, shortCircuit: true } : next(id, context);
} });
const { preparePassages } = await import('../ce-ducts.js');
const { junctionGeometry } = await import('../ce-junctions.js');
const { createCombustionEngineModel } = await import('../ce-model.js');
const { tracerBudget, routesForSeat, beginJourney, sampleJourney } = await import('../ce-tracers.js');

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

for (const layout of ['r4', 'boxer4', 'v6', 'v8']) for (const concept of ['otto', 'diesel']) {
  const profile = buildEngineProfile(layout, concept);
  const diesel = profile.concept.directInjection;
  const graph = buildPlumbing(profile);
  const { joints } = preparePassages(graph);

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
      const steps = getTourStepsForProfile(profile);
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
  assert.equal(tracerBudget({ hardwareConcurrency: 4 }), 2304);
  assert.equal(tracerBudget({ hardwareConcurrency: 8, deviceMemory: 2 }), 2304);
  assert.equal(tracerBudget({ hardwareConcurrency: 8, deviceMemory: 8 }), 6144);
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
