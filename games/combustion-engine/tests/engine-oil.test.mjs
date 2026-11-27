import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import test from 'node:test';
import { buildEngineProfile, computeEngineTelemetry } from '../ce-data.js';

const three = new URL('../../../shared/vendor/three-0.170.0/build/three.module.min.js', import.meta.url).href;
registerHooks({ resolve(id, context, next) {
  return id === 'three' ? { url: three, shortCircuit: true } : next(id, context);
} });
const { Box3, Color, Matrix4, PerspectiveCamera, Raycaster, Texture, Vector3 } = await import('three');
const { createCombustionEngineModel } = await import('../ce-model.js');

function fixture(layout, concept, environment) {
  const profile = buildEngineProfile(layout, concept), saved = globalThis.document;
  globalThis.document = { createElement: () => ({ getContext: () => ({ fillRect() {} }) }) };
  try {
    const model = createCombustionEngineModel(profile, environment);
    model.setFlowVisible(false);
    const telemetry = computeEngineTelemetry(profile.specs.idleRpm, 0.1, undefined, profile);
    model.update(0.05, telemetry);
    model.root.updateMatrixWorld(true);
    return { model, profile, telemetry, root: model.root, oil: model.root.getObjectByName('engineOil') };
  } finally {
    if (saved === undefined) delete globalThis.document; else globalThis.document = saved;
  }
}

function eachVertexIn(mesh, frame, visit) {
  const transform = new Matrix4().copy(frame.matrixWorld).invert().multiply(mesh.matrixWorld);
  const vertices = mesh.geometry.attributes.position, p = new Vector3();
  for (let i = 0; i < vertices.count; i++) visit(p.fromBufferAttribute(vertices, i).applyMatrix4(transform));
}

// Rigid crank vertices sweep circles about X. Every rod centreline runs from
// a pin to a wrist at or above the axis, including the two horizontal banks.
function crankLowerBound(root, layout) {
  const pins = root.getObjectsByProperty('name', 'crankPin'), spin = pins[0].parent;
  let sweep = 0, throwRadius = 0, rodMargin = 0;
  for (const mesh of spin.children) {
    eachVertexIn(mesh, spin, p => { sweep = Math.max(sweep, Math.hypot(p.y, p.z)); });
  }
  for (const pin of pins) throwRadius = Math.max(throwRadius, Math.hypot(pin.position.y, pin.position.z));
  assert.ok(layout.bankAnglesDeg.every(a => Math.abs(a) <= 90));
  for (const eye of root.getObjectsByProperty('name', 'bigEnd')) {
    const rod = eye.parent, length = rod.getObjectByName('smallEnd').position.y;
    assert.ok(length > throwRadius);
    for (const mesh of rod.children) eachVertexIn(mesh, rod, p => {
      const beyond = Math.max(0, -p.y, p.y - length);
      rodMargin = Math.max(rodMargin, Math.hypot(beyond, p.z));
    });
  }
  return spin.getWorldPosition(new Vector3()).y - Math.max(sweep, throwRadius + rodMargin);
}

for (const layout of ['r4', 'boxer4', 'v6', 'v8']) for (const concept of ['otto', 'diesel']) {
  test(`${concept}/${layout} contains the entire oil volume and clears the continuous crank and rod sweep`, () => {
    const { model, profile, root, oil, telemetry } = fixture(layout, concept);
    const back = root.getObjectByName('oilPanBack'), front = root.getObjectByName('oilPanFront');
    const floor = root.getObjectByName('oilPanFloor');
    assert.ok(oil.parent === front.parent && oil.parent === back.parent && oil.parent === floor.parent);
    const center = oil.getWorldPosition(new Vector3());
    // Rays from inside the liquid measure the inner faces of the actual hollow casting.
    const probe = center.clone().add(new Vector3(0.05, 0, 0.06));
    const innerFace = (axis, sign) => {
      const direction = new Vector3();
      direction[axis] = sign;
      const [hit] = new Raycaster(probe, direction).intersectObjects([front, back, floor], false);
      assert.ok(hit, axis + sign);
      return hit.point[axis];
    };
    const left = innerFace('x', -1), right = innerFace('x', 1);
    const rear = innerFace('z', -1), near = innerFace('z', 1), bottom = innerFace('y', -1);
    const surface = oil.getObjectByName('oilSurface');
    const point = new Vector3();
    let crest = -Infinity;
    for (const mesh of [oil, surface]) {
      const { position } = mesh.geometry.attributes, [cosine, sine] = mesh.geometry.morphAttributes.position;
      for (let i = 0; i < position.count; i++) {
        point.fromBufferAttribute(position, i).applyMatrix4(mesh.matrixWorld);
        const excursion = Math.hypot(cosine.getY(i), sine.getY(i)); // exact extremum over every wave phase
        assert.ok(excursion <= 0.072001 && point.y - excursion > bottom);
        assert.ok(cosine.getX(i) === 0 && sine.getX(i) === 0 && cosine.getZ(i) === 0 && sine.getZ(i) === 0);
        assert.ok(point.x > left && point.x < right && point.z > rear && point.z < near);
        crest = Math.max(crest, point.y + excursion);
      }
    }
    assert.ok(crankLowerBound(root, profile.layout) - crest >= 0.1679, 'Clearance includes the highest possible crest');
    assert.ok(crest < new Box3().setFromObject(back).max.y);
    assert.ok(oil.visible && !front.visible && oil.userData.partId === 'flywheelOilpan');
    // Trace the reset camera's sightlines through the complete assembly.
    for (const mode of ['cutaway', 'xray']) {
      model.setViewMode(mode);
      model.update(0.2, telemetry, 0);
      root.updateMatrixWorld(true);
      const camera = mode === 'cutaway' ? new Vector3(-7.1, 3.8, 8.6) : new Vector3(-7.6, 3.8, 8.8);
      camera.multiplyScalar(profile.layout.cameraScale);
      if (layout === 'boxer4') camera.set(-8.2, 7.4, 9.2);
      const opaque = [];
      root.traverseVisible(o => { if (o.isMesh && !o.material.transparent) opaque.push(o); });
      let visible = 0;
      for (let i = 0; i < 15; i++) for (let j = 0; j < 5; j++) {
        const target = new Vector3(left + (right - left) * (i + 0.5) / 15, bottom + 0.29, rear + (near - rear) * (j + 0.5) / 5);
        const [hit] = new Raycaster(camera, target.sub(camera).normalize()).intersectObjects(opaque, false);
        if (hit?.object === surface) visible++;
      }
      assert.ok(visible >= 3, mode + ' exposes the rippling upper face of the oil');
    }
  });
}

test('The oil surface speeds up with rpm, follows playback speed and holds its shape when paused', () => {
  const { model, profile, oil, telemetry: idle } = fixture('r4', 'otto');
  const high = computeEngineTelemetry(profile.specs.maxRpm, 1, undefined, profile);
  const weights = oil.morphTargetInfluences, pos = oil.geometry.attributes.position;
  const phase = () => Math.atan2(weights[1], weights[0]);
  function measure(telemetry, scale) {
    const before = phase();
    model.update(0.025, telemetry, scale);
    const radians = phase() - before;
    return Math.atan2(Math.sin(radians), Math.cos(radians)) / (2 * Math.PI * 0.025);
  }
  assert.ok(Math.abs(measure(idle, 0.16) - 0.8) < 1e-7);
  assert.ok(Math.abs(Math.hypot(...weights) * 0.072 - 0.003) < 1e-7);
  assert.ok(Math.abs(measure(high, 0.16) - 3.2) < 1e-7);
  assert.ok(Math.abs(Math.hypot(...weights) - 1) < 1e-7);
  assert.ok(Math.abs(measure(high, 0.08) - 1.6) < 1e-7);
  const frozen = [...weights];
  model.update(0.05, idle, 0);
  assert.deepEqual(weights, frozen);
  assert.equal(pos.version, 0);
  for (const mode of ['normal', 'xray', 'exploded', 'cutaway']) {
    model.setViewMode(mode);
    model.update(0.2, idle, 0);
    assert.equal(oil.visible, mode === 'cutaway' || mode === 'xray');
    assert.equal(model.root.getObjectByName('oilPanCutLip').visible, mode === 'cutaway');
  }
});

test('The exposed oil has a glossy dielectric surface, an amber depth gradient and a continuous wet edge', () => {
  const environment = new Texture();
  const { oil } = fixture('r4', 'otto', environment), top = oil.getObjectByName('oilSurface');
  assert.ok(top.material.isMeshPhysicalMaterial && top.material.metalness === 0);
  assert.equal(top.material.color.getHex(), 0x3a2108);
  assert.equal(top.material.envMap, environment);
  assert.ok(top.material.roughness < 0.16 && top.material.clearcoat > 0 && top.material.clearcoatRoughness < 0.1);
  assert.ok(top.material.ior > 1.4 && top.material.ior < 1.5);
  assert.ok(oil.material.isMeshLambertMaterial && oil.material.vertexColors);
  const { color, position } = oil.geometry.attributes;
  const deep = new Color().fromBufferAttribute(color, 0), rim = new Color().fromBufferAttribute(color, 1);
  for (const channel of ['r', 'g', 'b']) {
    assert.ok(deep[channel] < rim[channel]);
  }
  assert.ok(rim.r > rim.g && rim.g > rim.b && deep.r > deep.g && deep.g > deep.b);
  assert.equal(oil.morphTargetInfluences, top.morphTargetInfluences);
  const { widthSegments, heightSegments } = top.geometry.parameters;
  const verts = top.geometry.attributes.position, coord = (attr, i) => attr.getX(i).toFixed(5) + '/' + attr.getZ(i).toFixed(5);
  const edge = new Map();
  for (let i = 0; i < verts.count; i++) {
    const x = i % (widthSegments + 1), z = Math.floor(i / (widthSegments + 1));
    if (x === 0 || x === widthSegments || z === 0 || z === heightSegments) edge.set(coord(verts, i), i);
  }
  const joined = new Set();
  for (let i = 0; i < position.count; i++) {
    if (position.getY(i) < 0) continue;
    const j = edge.get(coord(position, i));
    assert.ok(Number.isInteger(j));
    joined.add(j);
    assert.equal(verts.getY(j), position.getY(i));
    for (let k = 0; k < 2; k++) {
      assert.ok(Math.abs(top.geometry.morphAttributes.position[k].getY(j) - oil.geometry.morphAttributes.position[k].getY(i)) < 1e-6);
    }
  }
  assert.equal(joined.size, edge.size);
});

test('At 6500 rpm the moving oil edge is visible from the 1280px side close-up', () => {
  const { model, oil, profile, telemetry: idle } = fixture('r4', 'otto');
  const top = oil.getObjectByName('oilSurface'), { widthSegments, heightSegments } = top.geometry.parameters;
  const camera = new PerspectiveCamera(42, 906 / 726, 0.1, 120);
  camera.position.set(-2.6, -1.2, 3.6);
  camera.lookAt(0.3, -2.5, 0);
  camera.updateMatrixWorld();
  function excursion(telemetry) {
    const columns = [];
    for (let x = 0; x <= widthSegments; x++) {
      const index = heightSegments * (widthSegments + 1) + x;
      const ndc = top.localToWorld(top.getVertexPosition(index, new Vector3())).project(camera);
      if (Math.abs(ndc.x) < 0.9 && Math.abs(ndc.y) < 0.9) columns.push({ index, min: Infinity, max: -Infinity });
    }
    assert.ok(columns.length >= 10);
    const p = new Vector3();
    for (let frame = 0; frame < 80; frame++) {
      model.update(1 / 60, telemetry);
      for (const c of columns) {
        const y = top.localToWorld(top.getVertexPosition(c.index, p)).project(camera).y * 726 / 2;
        c.min = Math.min(c.min, y);
        c.max = Math.max(c.max, y);
      }
    }
    return columns.reduce((sum, c) => sum + c.max - c.min, 0) / columns.length;
  }
  const idlePixels = excursion(idle);
  const highPixels = excursion(computeEngineTelemetry(6500, 0.38, undefined, profile));
  assert.ok(idlePixels > 0 && idlePixels < 2);
  assert.ok(highPixels > 10 && highPixels > 15 * idlePixels);
});

for (const concept of ['otto', 'diesel']) {
  test(`${concept} uses neutral X-ray skins, edges and selection in both themes and restores the original materials`, () => {
    const { model, root, oil, telemetry } = fixture('v8', concept);
    const record = [];
    root.traverse(o => { if (o.isMesh) record.push([o, o.material]); });
    const ghosts = record.filter(([o, m]) => o.userData.partId && m.transparent && Math.abs(m.opacity - 0.16) < 1e-6);
    assert.ok(ghosts.length > 20);
    const pan = root.getObjectByName('oilPanFront'), edge = pan.children[0], oilMaterial = oil.material;
    const effects = record.filter(([o]) => ['sparkArc', 'sparkHalo', 'petrolFlame', 'sprayIgnition'].includes(o.name));
    const cloud = root.getObjectByProperty('isPoints', true), particleMaterial = cloud.material;
    model.setViewMode('xray');
    model.update(0.2, telemetry, 0);
    for (const theme of ['light', 'dark']) {
      model.applyTheme(theme);
      model.setSelectedPart('intakeManifold');
      const focus = ghosts.find(([mesh]) => mesh.userData.partId === 'intakeManifold')[0].material;
      const smoke = pan.material;
      assert.ok(focus.color.r > smoke.color.r && edge.material.color.r > smoke.color.r);
      assert.ok(focus.opacity > smoke.opacity && smoke.opacity <= 0.14);
      assert.ok(edge.visible && !pan.castShadow && oil.visible && oil.material === oilMaterial);
      assert.ok(effects.length && effects.every(([mesh, original]) => mesh.material === original));
      assert.equal(cloud.material, particleMaterial);
      for (const mat of new Set([smoke, focus, edge.material, ...ghosts.map(([o]) => o.material)])) {
        assert.equal(mat.color.getHSL({}).s, 0);
        assert.ok(mat.transparent && !mat.depthWrite && !mat.fog);
      }
    }
    model.setSelectedPart(null);
    model.setViewMode('cutaway');
    model.update(0.2, telemetry, 0);
    for (const [mesh, original] of record) assert.equal(mesh.material, original);
    assert.ok(!edge.visible && pan.castShadow);
  });
}
