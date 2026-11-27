import * as THREE from 'three';

// Local heights are measured from the inside face of the sump floor.
const HALF_DEPTH = 0.86, WALL = 0.075, WALL_HEIGHT = 0.915;
const FILL = 0.30, INSET = 0.004, MAX_WAVE = 0.072;
const OIL_HEIGHT = FILL - INSET, NX = 48, NZ = 20;
const TAU = 2 * Math.PI;

function halfWall(width) {
  const x = width / 2, inner = x - WALL, z = HALF_DEPTH;
  const outline = new THREE.Shape();
  outline.moveTo(-x, 0);
  outline.lineTo(-x, z);
  outline.lineTo(x, z);
  outline.lineTo(x, 0);
  outline.lineTo(inner, 0);
  outline.lineTo(inner, z - WALL);
  outline.lineTo(-inner, z - WALL);
  outline.lineTo(-inner, 0);
  outline.closePath();
  return new THREE.ExtrudeGeometry(outline, { depth: WALL_HEIGHT, bevelEnabled: false }).rotateX(-Math.PI / 2);
}

// The opened casting exposes a section through the liquid. Its amber edge
// darkens towards the floor as the light travels through more oil.
function sectionGeometry(width, depth) {
  const x = width / 2, z = depth / 2, h = OIL_HEIGHT / 2;
  const corners = [[-x, z], [x, z], [x, -z], [-x, -z]];
  const bottom = new THREE.Color(0x301a07), rim = new THREE.Color(0x57310f);
  const positions = [], colors = [], indices = [];
  for (let face = 0; face < 4; face++) {
    const [x0, z0] = corners[face], [x1, z1] = corners[(face + 1) % 4];
    const count = face % 2 === 0 ? NX : NZ;
    for (let i = 0; i <= count; i++) {
      const px = THREE.MathUtils.lerp(x0, x1, i / count), pz = THREE.MathUtils.lerp(z0, z1, i / count);
      const j = positions.length / 3;
      positions.push(px, -h, pz, px, h, pz);
      colors.push(bottom.r, bottom.g, bottom.b, rim.r, rim.g, rim.b);
      if (i < count) indices.push(j, j + 2, j + 1, j + 2, j + 3, j + 1);
    }
  }
  const floor = positions.length / 3;
  for (const [px, pz] of corners) {
    positions.push(px, -h, pz);
    colors.push(bottom.r, bottom.g, bottom.b);
  }
  indices.push(floor, floor + 2, floor + 1, floor, floor + 3, floor + 2);
  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  return geometry;
}

function addWaves(geometry, width, depth, surface) {
  const { position } = geometry.attributes;
  const heights = [], slopes = [];
  // Quadrature pairs let two crossing waves travel along the free surface.
  // The upper side-wall vertices follow the same rim. The floor stays fixed.
  const ax = TAU * 1.35 / width, az = TAU * 0.6 / depth;
  const bx = TAU * 2.75 / width, bz = -TAU * 1.8 / depth;
  for (let i = 0; i < 2; i++) {
    const dy = new THREE.BufferAttribute(new Float32Array(position.count * 3), 3);
    const dn = surface ? new THREE.BufferAttribute(new Float32Array(position.count * 3), 3) : null;
    for (let j = 0; j < position.count; j++) {
      if (position.getY(j) < 0) continue;
      const x = position.getX(j), z = position.getZ(j);
      const a = ax * x + az * z + i * Math.PI / 2;
      const b = bx * x + bz * z - i * Math.PI / 2;
      dy.setY(j, MAX_WAVE * (0.7 * Math.sin(a) + 0.3 * Math.sin(b)));
      if (dn) {
        const da = MAX_WAVE * 0.7 * Math.cos(a), db = MAX_WAVE * 0.3 * Math.cos(b);
        dn.setXYZ(j, -ax * da - bx * db, 0, -az * da - bz * db);
      }
    }
    heights.push(dy);
    if (dn) slopes.push(dn);
  }
  geometry.morphTargetsRelative = true;
  geometry.morphAttributes.position = heights;
  if (surface) geometry.morphAttributes.normal = slopes;
}

function oilVolume(width, environment) {
  const depth = 2 * (HALF_DEPTH - WALL - INSET);
  const section = sectionGeometry(width, depth);
  const top = new THREE.PlaneGeometry(width, depth, NX, NZ).rotateX(-Math.PI / 2).translate(0, OIL_HEIGHT / 2, 0);
  addWaves(section, width, depth, false);
  addWaves(top, width, depth, true);
  const mesh = new THREE.Mesh(section, new THREE.MeshLambertMaterial({ vertexColors: true }));
  const surface = new THREE.Mesh(top, new THREE.MeshPhysicalMaterial({
    color: 0x3a2108, metalness: 0, ior: 1.47, roughness: 0.11,
    specularIntensity: 0.70, clearcoat: 0.30, clearcoatRoughness: 0.07,
    envMap: environment, envMapIntensity: 0.48
  }));
  // Catch a studio light panel in the sump opening at a grazing view angle.
  surface.material.envMapRotation.set(-0.30, -0.22, 0);
  surface.name = 'oilSurface';
  surface.morphTargetInfluences = mesh.morphTargetInfluences;
  mesh.add(surface);
  mesh.name = 'engineOil';
  mesh.position.y = (FILL + INSET) / 2;
  return mesh;
}

export function installOilPan(group, width, axisY, getPartMat, registerXrayShell, cutawayMeshes, environment) {
  const pan = new THREE.Group();
  pan.position.y = axisY - 1.35;
  const metal = getPartMat('flywheelOilpan', 'darkMetal');
  const floor = new THREE.Mesh(new THREE.BoxGeometry(width, 0.18, 2 * HALF_DEPTH), metal);
  floor.name = 'oilPanFloor';
  floor.position.y = -0.09;
  const wall = halfWall(width);
  const back = new THREE.Mesh(wall, metal);
  back.name = 'oilPanBack';
  const front = new THREE.Mesh(wall, getPartMat('flywheelOilpan', 'darkMetalCut'));
  front.name = 'oilPanFront';
  front.rotation.y = Math.PI;
  // Keep a low metal lip in front of the cut face once the upper wall is open.
  const lip = new THREE.Mesh(wall, metal);
  lip.name = 'oilPanCutLip';
  lip.rotation.y = Math.PI;
  lip.scale.y = 0.105 / WALL_HEIGHT;
  lip.visible = false;
  const oil = oilVolume(width - 2 * (WALL + INSET), environment);
  pan.add(floor, back, front, lip, oil);
  group.add(pan);
  cutawayMeshes.push(front);
  registerXrayShell(back);
  registerXrayShell(front);
  registerXrayShell(floor, false);

  let phase = 0;
  return function updateOil(visible, seconds, rpm, specs) {
    oil.visible = visible;
    lip.visible = visible && !front.visible;
    if (!visible || seconds <= 0 || rpm <= 0) return;
    const speed = THREE.MathUtils.clamp((rpm - specs.idleRpm) / (specs.maxRpm - specs.idleRpm), 0, 1);
    phase = (phase + TAU * (0.8 + 2.4 * speed) * seconds) % TAU;
    const amplitude = THREE.MathUtils.lerp(0.003 / MAX_WAVE, 1, speed);
    oil.morphTargetInfluences[0] = amplitude * Math.cos(phase);
    oil.morphTargetInfluences[1] = amplitude * Math.sin(phase);
  };
}
