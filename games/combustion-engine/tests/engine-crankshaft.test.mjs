import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import test from 'node:test';
import { buildEngineProfile, computeEngineTelemetry } from '../ce-data.js';
import { CRANK_RADIUS, ROD_GEOMETRY, ROD_LENGTH, ROD_SIDE_CLEARANCE } from '../ce-mechanics.js';

const three = new URL('../../../shared/vendor/three-0.170.0/build/three.module.min.js', import.meta.url).href;
registerHooks({ resolve(id, context, next) {
  return id === 'three' ? { url: three, shortCircuit: true } : next(id, context);
} });
const { Box3, Raycaster, Vector3 } = await import('three');
const { createCombustionEngineModel } = await import('../ce-model.js');

function near(actual, expected, tolerance = 1e-6) {
  assert.ok(Math.abs(actual - expected) < tolerance, `Expected ${expected}, got ${actual}`);
}
const centre = mesh => mesh.getWorldPosition(new Vector3());
const bounds = mesh => new Box3().setFromObject(mesh, true);
const sorted = (root, name) => root.getObjectsByProperty('name', name).sort((a, b) => centre(a).x - centre(b).x);

function axialRay(mesh, y, z) {
  const origin = centre(mesh);
  origin.x -= 1;
  origin.y += y;
  origin.z += z;
  return new Raycaster(origin, new Vector3(1, 0, 0), 0, 2).intersectObject(mesh).length;
}

function checkBore(mesh, pinRadius) {
  assert.equal(axialRay(mesh, 0, 0), 0, mesh.name + ' has an open centre');
  for (let i = 0; i < 48; i++) {
    const angle = i * Math.PI / 24;
    assert.equal(axialRay(mesh, pinRadius * Math.cos(angle), pinRadius * Math.sin(angle)), 0);
  }
  assert.ok(axialRay(mesh, pinRadius + 0.025, 0), 'Material surrounds the bore');
}

function checkAxialStack(root, layout, pins, mains, webs) {
  const spin = pins[0].parent;
  const sections = [];
  spin.traverse(mesh => {
    if (mesh.isMesh && mesh.name !== 'crankNose') sections.push(bounds(mesh));
  });
  sections.sort((a, b) => a.min.x - b.min.x);
  let face = -layout.crankLength / 2;
  near(bounds(root.getObjectByName('crankNose')).max.x, face);
  for (const section of sections) {
    near(section.min.x, face);
    assert.ok(section.max.x > face);
    face = section.max.x;
  }
  near(face, layout.crankLength / 2);
  const bearings = sorted(root, 'mainBearing');
  assert.equal(bearings.length, mains.length);
  for (const [i, main] of mains.entries()) {
    near(centre(bearings[i]).distanceTo(centre(main)), 0);
    assert.ok(bounds(bearings[i]).min.x > bounds(main).min.x);
    assert.ok(bounds(bearings[i]).max.x < bounds(main).max.x);
    checkBore(bearings[i], main.geometry.parameters.radiusTop);
  }
  // Each end face of a crankpin joins solid cheek material at the pin axis.
  for (const pin of pins) {
    const span = bounds(pin);
    for (const edge of [span.min.x, span.max.x]) {
      const web = webs.find(w => Math.min(Math.abs(bounds(w).min.x - edge), Math.abs(bounds(w).max.x - edge)) < 1e-6);
      assert.ok(web, 'A web meets each pin end');
      const offset = centre(pin).sub(centre(web));
      assert.ok(axialRay(web, offset.y, offset.z), 'Pin bears on the web');
    }
  }
}

for (const layoutId of ['r4', 'boxer4', 'v6', 'v8']) for (const concept of ['otto', 'diesel']) {
  test(`${concept}/${layoutId} keeps both rod eyes on their pins and the beam clear through 720°`, () => {
    const profile = buildEngineProfile(layoutId, concept);
    const saved = globalThis.document;
    globalThis.document = { createElement: () => ({ getContext: () => ({ fillRect() {} }) }) };
    let model;
    try {
      model = createCombustionEngineModel(profile);
    } finally {
      if (saved === undefined) delete globalThis.document;
      else globalThis.document = saved;
    }
    const { layout } = profile;
    const { root } = model;
    model.setFlowVisible(false);
    const telemetry = computeEngineTelemetry(1600, 0.3, undefined, profile);
    const speed = telemetry.rpm * 6 * 0.045;
    model.update(5 / speed, telemetry); // Initial crank angle 25° → first sample at 30°.
    root.updateMatrixWorld(true);
    const pins = sorted(root, 'crankPin'), mains = sorted(root, 'mainJournal'), webs = sorted(root, 'crankWeb');
    assert.equal(pins.length, layoutId === 'v8' ? 4 : layout.cylinders);
    assert.equal(mains.length, layoutId === 'v6' ? 4 : 5);
    assert.equal(webs.length, layoutId === 'v6' ? 9 : 8);
    checkAxialStack(root, layout, pins, mains, webs);
    const forbidden = [...mains, ...webs, ...sorted(root, 'mainBearing')].map(bounds);
    const eyes = sorted(root, 'bigEnd'), wrists = sorted(root, 'wristPin');
    const axis = centre(mains[0]);
    const rods = eyes.map((eye, i) => {
      const pin = pins[layoutId === 'v8' ? Math.floor(i / 2) : i];
      const small = eye.parent.getObjectByName('smallEnd');
      const beam = eye.parent.getObjectByName('rodBeam');
      checkBore(eye, pin.geometry.parameters.radiusTop);
      checkBore(small, wrists[i].geometry.parameters.radiusTop);
      return { spec: layout.cylinderSpecs[i], eye, small, beam, pin, wrist: wrists[i], min: Infinity, max: -Infinity };
    });
    assert.equal(rods.length, layout.cylinders);
    for (let angle = 30; angle <= 750; angle += 15) {
      const frame = model.update(angle === 30 ? 0 : 15 / speed, telemetry);
      near(frame.crankDeg % 360, angle % 360);
      root.updateMatrixWorld(true);
      for (const rod of rods) {
        const { spec, eye, small, beam, wrist, pin } = rod;
        const big = centre(eye), little = centre(wrist);
        const theta = (angle + spec.crankPinAngleDeg) * Math.PI / 180;
        near(big.x, spec.x);
        near(big.y - axis.y, CRANK_RADIUS * Math.cos(theta));
        near(big.z - axis.z, CRANK_RADIUS * Math.sin(theta));
        // Along the shared V8 pin each eye has its own axial station.
        const onPin = pin.worldToLocal(big.clone());
        near(Math.hypot(onPin.x, onPin.z), 0);
        const span = bounds(eye), pinSpan = bounds(pin);
        near(span.max.x - span.min.x, ROD_GEOMETRY.bigEnd.width);
        assert.ok(span.min.x >= pinSpan.min.x + ROD_SIDE_CLEARANCE - 1e-6);
        assert.ok(span.max.x <= pinSpan.max.x - ROD_SIDE_CLEARANCE + 1e-6);
        if (spec.index > 0) assert.ok(bounds(eyes[spec.index - 1]).max.x < span.min.x);
        const beamSpan = bounds(beam);
        for (const obstacle of forbidden) {
          for (const part of [span, beamSpan]) {
            assert.ok(part.max.x < obstacle.min.x || obstacle.max.x < part.min.x,
              'Eye and beam are axially clear of all webs, counterweights, main journals and saddles');
          }
        }
        near(centre(small).distanceTo(little), 0);
        near(big.distanceTo(little), ROD_LENGTH);
        const direction = little.clone().sub(big).normalize();
        for (const side of [-1, 1]) {
          const end = beam.localToWorld(new Vector3(0, side * beam.geometry.parameters.height / 2, 0));
          const offset = end.clone().sub(big);
          near(offset.clone().cross(direction).length(), 0);
          const endEye = side === -1 ? ROD_GEOMETRY.bigEnd : ROD_GEOMETRY.smallEnd;
          const radius = end.distanceTo(side === -1 ? big : little);
          assert.ok(radius > endEye.bore && radius < endEye.radius, 'The beam joins each eye outside its bore');
        }
        const bank = spec.bankAngleDeg * Math.PI / 180;
        const travel = (little.y - axis.y) * Math.cos(bank) + (little.z - axis.z) * Math.sin(bank);
        rod.min = Math.min(rod.min, travel);
        rod.max = Math.max(rod.max, travel);
      }
    }
    for (const rod of rods) near((rod.max - rod.min) / 2, CRANK_RADIUS);
  });
}
