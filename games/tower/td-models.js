// Multi-Part PBR 3D Tower & Enemy Models with Shared Geometries & Materials
// Zero per-frame allocations: upgrade parts & status visuals are pre-built and toggled.

import * as THREE from 'three';
import { getTDTextures } from './td-textures.js';

let assets = null;

function stdMat(color, metalness = 0.55, roughness = 0.38, extra = {}) {
  const tex = getTDTextures();
  return new THREE.MeshStandardMaterial({
    color,
    metalness,
    roughness,
    map: extra.noTex ? null : tex.metalAlbedo,
    ...extra
  });
}

function emissiveMat(color, emissiveHex, intensity = 1.6) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: emissiveHex,
    emissiveIntensity: intensity,
    metalness: 0.25,
    roughness: 0.25,
    toneMapped: false
  });
}

export function getSharedModelAssets() {
  if (assets) return assets;

  const g = {
    octBase: new THREE.CylinderGeometry(0.38, 0.43, 0.14, 8),
    octCollar: new THREE.CylinderGeometry(0.31, 0.34, 0.08, 8),
    trimRing: new THREE.TorusGeometry(0.36, 0.022, 8, 24),
    pip: new THREE.SphereGeometry(0.036, 8, 8),
    box1: new THREE.BoxGeometry(1, 1, 1),
    cyl1: new THREE.CylinderGeometry(1, 1, 1, 12),
    cone1: new THREE.ConeGeometry(1, 1, 10),
    sphere1: new THREE.SphereGeometry(1, 14, 12),
    octa1: new THREE.OctahedronGeometry(1, 0),
    torusThin: new THREE.TorusGeometry(1, 0.09, 8, 24),
    hex1: new THREE.CylinderGeometry(1, 1, 1, 6),
    shieldSphere: new THREE.IcosahedronGeometry(0.42, 1),
    auraRing: new THREE.RingGeometry(0.30, 0.37, 20),
    barPlane: new THREE.PlaneGeometry(1, 1)
  };

  // Orient cylinder/cone defaults cleanly where needed
  const m = {
    gunmetal: stdMat(0x1e293b, 0.72, 0.34),
    darkSteel: stdMat(0x0f172a, 0.78, 0.40),
    slateArmor: stdMat(0x475569, 0.62, 0.38),
    chrome: stdMat(0xcbd5e1, 0.85, 0.22),
    goldTrim: stdMat(0xf59e0b, 0.84, 0.24, { emissive: 0x78350f, emissiveIntensity: 0.25 }),
    emeraldTrim: emissiveMat(0x4ade80, 0x22c55e, 1.35),
    pulseCore: emissiveMat(0x7dd3fc, 0x38bdf8, 1.8),
    pulseBody: stdMat(0x1e40af, 0.62, 0.32),
    frostBody: stdMat(0x0e7490, 0.55, 0.26),
    frostCrystal: new THREE.MeshStandardMaterial({
      color: 0xa5f3fc,
      emissive: 0x22d3ee,
      emissiveIntensity: 1.45,
      metalness: 0.2,
      roughness: 0.12,
      transparent: true,
      opacity: 0.92,
      toneMapped: false
    }),
    mortarBody: stdMat(0x7c2d12, 0.60, 0.38),
    mortarCore: emissiveMat(0xfdba74, 0xf97316, 1.85),
    railBody: stdMat(0x701a75, 0.68, 0.30),
    railCore: emissiveMat(0xf9a8d4, 0xec4899, 1.9),
    overdriveGlow: emissiveMat(0xfef08a, 0xfacc15, 2.1),

    // Preview ghost material
    previewValid: new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.48,
      roughness: 0.3
    }),
    previewInvalid: new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xe11d48,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.48,
      roughness: 0.3
    }),

    // Enemy materials
    enNormal: stdMat(0xe11d48, 0.52, 0.36),
    enFast: stdMat(0x9333ea, 0.58, 0.30),
    enSwarm: stdMat(0x65a30d, 0.45, 0.40),
    enTank: stdMat(0xd97706, 0.68, 0.34),
    enThermo: stdMat(0xea580c, 0.55, 0.32, { emissive: 0x9a3412, emissiveIntensity: 0.45 }),
    enSplitter: stdMat(0xa21caf, 0.52, 0.28),
    enShield: stdMat(0x0284c7, 0.64, 0.30),
    enBoss: stdMat(0x9f1239, 0.72, 0.30),

    visorCyan: emissiveMat(0x67e8f9, 0x22d3ee, 1.65),
    flameOrange: emissiveMat(0xfde047, 0xf97316, 1.8),
    flameViolet: emissiveMat(0xf0abfc, 0xc084fc, 1.6),
    bossCore: emissiveMat(0xfef08a, 0xfbbf24, 1.9),
    shieldBubble: new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.26,
      wireframe: true
    }),
    frostAura: new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.78,
      side: THREE.DoubleSide
    }),
    thawAura: new THREE.MeshBasicMaterial({
      color: 0xfb923c,
      transparent: true,
      opacity: 0.78,
      side: THREE.DoubleSide
    }),

    // HP bar materials (shared, zero runtime alloc)
    barBg: new THREE.MeshBasicMaterial({ color: 0x090f1e, transparent: true, opacity: 0.85, depthTest: false }),
    barHp: new THREE.MeshBasicMaterial({ color: 0x4ade80, depthTest: false }),
    barHpBoss: new THREE.MeshBasicMaterial({ color: 0xfbbf24, depthTest: false }),
    barShield: new THREE.MeshBasicMaterial({ color: 0x22d3ee, depthTest: false })
  };

  assets = { g, m };
  return assets;
}

function makePart(geo, mat, sx = 1, sy = 1, sz = 1, px = 0, py = 0, pz = 0, rx = 0, ry = 0, rz = 0, shadow = true) {
  const mesh = new THREE.Mesh(geo, mat);
  mesh.scale.set(sx, sy, sz);
  mesh.position.set(px, py, pz);
  if (rx || ry || rz) mesh.rotation.set(rx, ry, rz);
  mesh.castShadow = shadow;
  mesh.receiveShadow = shadow;
  return mesh;
}

export function createTowerMesh(typeId, preview = false) {
  const { g, m } = getSharedModelAssets();
  const root = new THREE.Group();

  const baseMesh = makePart(g.octBase, preview ? m.previewValid : m.gunmetal, 1, 1, 1, 0, 0.07, 0);
  const collarMesh = makePart(g.octCollar, preview ? m.previewValid : m.darkSteel, 1, 1, 1, 0, 0.16, 0);
  const trimRing = makePart(g.trimRing, preview ? m.previewValid : m.chrome, 1, 1, 1, 0, 0.145, 0, Math.PI * 0.5, 0, 0, false);
  root.add(baseMesh, collarMesh, trimRing);

  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.24, 0);
  root.add(headGroup);

  const recoilGroup = new THREE.Group();
  headGroup.add(recoilGroup);

  const lvl2Group = new THREE.Group();
  const lvl3Group = new THREE.Group();
  lvl2Group.visible = false;
  lvl3Group.visible = false;
  recoilGroup.add(lvl2Group, lvl3Group);

  const pips = [];
  if (!preview) {
    for (let i = 0; i < 3; i++) {
      const pip = makePart(g.pip, m.goldTrim, 1, 1, 1, (i - 1) * 0.11, 0.08, 0.39, 0, 0, 0, false);
      pip.visible = i === 0;
      root.add(pip);
      pips.push(pip);
    }
  }

  let coreMesh = null;
  let spinGroup = null;
  const accentMeshes = [];

  if (typeId === 'frost') {
    const ped = makePart(g.hex1, m.frostBody, 0.22, 0.12, 0.22, 0, 0.02, 0);
    const crystal = makePart(g.octa1, m.frostCrystal, 0.18, 0.30, 0.18, 0, 0.28, 0);
    spinGroup = new THREE.Group();
    spinGroup.position.set(0, 0.28, 0);
    const ringA = makePart(g.torusThin, m.frostCrystal, 0.26, 0.26, 0.26, 0, 0, 0, Math.PI * 0.35, 0, 0, false);
    const ringB = makePart(g.torusThin, m.chrome, 0.31, 0.31, 0.31, 0, 0, 0, -Math.PI * 0.35, Math.PI * 0.25, 0, false);
    spinGroup.add(ringA, ringB);
    recoilGroup.add(ped, crystal, spinGroup);
    coreMesh = crystal;
    accentMeshes.push(crystal, ringA);

    // Lvl 2: 3 cryo fins around base
    for (let k = 0; k < 3; k++) {
      const a = (k / 3) * Math.PI * 2;
      const fin = makePart(g.box1, m.frostBody, 0.06, 0.24, 0.12, Math.cos(a) * 0.24, 0.14, Math.sin(a) * 0.24, 0, -a, -0.25);
      lvl2Group.add(fin);
    }
    // Lvl 3: Crown halo + orbiting shards
    const crown = makePart(g.torusThin, m.goldTrim, 0.22, 0.22, 0.22, 0, 0.56, 0, Math.PI * 0.5, 0, 0);
    lvl3Group.add(crown);
    for (let k = 0; k < 3; k++) {
      const a = (k / 3) * Math.PI * 2;
      const shard = makePart(g.octa1, m.frostCrystal, 0.055, 0.11, 0.055, Math.cos(a) * 0.28, 0.44, Math.sin(a) * 0.28, 0, 0, 0, false);
      lvl3Group.add(shard);
    }
  } else if (typeId === 'mortar') {
    const hull = makePart(g.box1, m.mortarBody, 0.44, 0.22, 0.40, -0.02, 0.08, 0);
    const barrel = makePart(g.cyl1, m.slateArmor, 0.13, 0.44, 0.13, 0.18, 0.24, 0, 0, 0, -Math.PI * 0.32);
    const muzzle = makePart(g.cyl1, m.darkSteel, 0.16, 0.10, 0.16, 0.34, 0.33, 0, 0, 0, -Math.PI * 0.32);
    const chamber = makePart(g.sphere1, m.mortarCore, 0.13, 0.13, 0.13, -0.08, 0.20, 0);
    recoilGroup.add(hull, barrel, muzzle, chamber);
    coreMesh = chamber;
    accentMeshes.push(chamber);

    // Lvl 2: Side cheek armor + coolant tanks
    lvl2Group.add(
      makePart(g.box1, m.chrome, 0.34, 0.14, 0.07, -0.02, 0.10, 0.24),
      makePart(g.box1, m.chrome, 0.34, 0.14, 0.07, -0.02, 0.10, -0.24)
    );
    // Lvl 3: Gold artillery collar + twin side rocket pods
    lvl3Group.add(
      makePart(g.torusThin, m.goldTrim, 0.16, 0.16, 0.16, 0.30, 0.31, 0, 0, Math.PI * 0.5, -Math.PI * 0.32),
      makePart(g.cyl1, m.mortarCore, 0.05, 0.22, 0.05, 0.08, 0.24, 0.26, 0, 0, -Math.PI * 0.35),
      makePart(g.cyl1, m.mortarCore, 0.05, 0.22, 0.05, 0.08, 0.24, -0.26, 0, 0, -Math.PI * 0.35)
    );
  } else if (typeId === 'rail') {
    const body = makePart(g.box1, m.railBody, 0.40, 0.16, 0.34, -0.04, 0.07, 0);
    const railL = makePart(g.box1, m.chrome, 0.66, 0.06, 0.055, 0.24, 0.10, -0.10);
    const railR = makePart(g.box1, m.chrome, 0.66, 0.06, 0.055, 0.24, 0.10, 0.10);
    const beamCore = makePart(g.box1, m.railCore, 0.52, 0.032, 0.04, 0.22, 0.10, 0, 0, 0, 0, false);
    const rearCap = makePart(g.cyl1, m.railCore, 0.11, 0.16, 0.11, -0.18, 0.15, 0);
    recoilGroup.add(body, railL, railR, beamCore, rearCap);
    coreMesh = beamCore;
    accentMeshes.push(beamCore, rearCap);

    // Lvl 2: Mid focusing ring + side fins
    lvl2Group.add(
      makePart(g.torusThin, m.railCore, 0.13, 0.13, 0.13, 0.28, 0.10, 0, 0, Math.PI * 0.5, 0, false),
      makePart(g.box1, m.darkSteel, 0.28, 0.04, 0.46, -0.04, 0.07, 0)
    );
    // Lvl 3: Gold dorsal rail + front accelerator ring
    lvl3Group.add(
      makePart(g.box1, m.goldTrim, 0.48, 0.04, 0.07, 0.14, 0.18, 0),
      makePart(g.torusThin, m.goldTrim, 0.13, 0.13, 0.13, 0.48, 0.10, 0, 0, Math.PI * 0.5, 0, false)
    );
  } else {
    // Pulse tower
    const housing = makePart(g.box1, m.pulseBody, 0.34, 0.18, 0.34, -0.02, 0.08, 0);
    const barrelL = makePart(g.cyl1, m.chrome, 0.042, 0.38, 0.042, 0.24, 0.08, -0.095, 0, 0, Math.PI * 0.5);
    const barrelR = makePart(g.cyl1, m.chrome, 0.042, 0.38, 0.042, 0.24, 0.08, 0.095, 0, 0, Math.PI * 0.5);
    const tipL = makePart(g.cyl1, m.pulseCore, 0.048, 0.09, 0.048, 0.42, 0.08, -0.095, 0, 0, Math.PI * 0.5, false);
    const tipR = makePart(g.cyl1, m.pulseCore, 0.048, 0.09, 0.048, 0.42, 0.08, 0.095, 0, 0, Math.PI * 0.5, false);
    const dome = makePart(g.sphere1, m.pulseCore, 0.15, 0.13, 0.15, -0.02, 0.18, 0);
    recoilGroup.add(housing, barrelL, barrelR, tipL, tipR, dome);
    coreMesh = dome;
    accentMeshes.push(dome, tipL, tipR);

    // Lvl 2: Armored side pauldrons + energy bar
    lvl2Group.add(
      makePart(g.box1, m.slateArmor, 0.26, 0.14, 0.07, -0.02, 0.09, 0.21),
      makePart(g.box1, m.slateArmor, 0.26, 0.14, 0.07, -0.02, 0.09, -0.21)
    );
    // Lvl 3: Gold crown fin + twin upper auxiliary emitters
    lvl3Group.add(
      makePart(g.box1, m.goldTrim, 0.28, 0.05, 0.10, -0.06, 0.26, 0),
      makePart(g.cyl1, m.pulseCore, 0.03, 0.26, 0.03, 0.16, 0.18, 0.14, 0, 0, Math.PI * 0.5, false),
      makePart(g.cyl1, m.pulseCore, 0.03, 0.26, 0.03, 0.16, 0.18, -0.14, 0, 0, Math.PI * 0.5, false)
    );
  }

  if (preview) {
    root.traverse((obj) => {
      if (obj.isMesh) {
        obj.material = m.previewValid;
        obj.castShadow = false;
        obj.receiveShadow = false;
      }
    });
  }

  return {
    root,
    baseMesh,
    trimRing,
    headGroup,
    recoilGroup,
    lvl2Group,
    lvl3Group,
    pips,
    coreMesh,
    spinGroup,
    accentMeshes
  };
}

export function updateTowerVisualLevel(vis, lvl, overdriveActive) {
  const { m } = getSharedModelAssets();
  vis.lvl2Group.visible = lvl >= 2;
  vis.lvl3Group.visible = lvl >= 3;
  for (let i = 0; i < vis.pips.length; i++) {
    vis.pips[i].visible = i < lvl;
    vis.pips[i].material = lvl >= 3 ? m.emeraldTrim : m.goldTrim;
  }
  if (overdriveActive) {
    vis.trimRing.material = m.overdriveGlow;
  } else {
    vis.trimRing.material = lvl >= 3 ? m.goldTrim : m.chrome;
  }
}

export function createEnemyMesh(kind) {
  const { g, m } = getSharedModelAssets();
  const root = new THREE.Group();
  const bodyGroup = new THREE.Group();
  root.add(bodyGroup);

  let spinPart = null;
  let flamePart = null;
  let barY = 0.58;

  if (kind === 'boss') {
    barY = 0.96;
    const trackL = makePart(g.box1, m.darkSteel, 0.68, 0.16, 0.16, 0, 0.10, -0.28);
    const trackR = makePart(g.box1, m.darkSteel, 0.68, 0.16, 0.16, 0, 0.10, 0.28);
    const hull = makePart(g.box1, m.enBoss, 0.60, 0.24, 0.44, -0.02, 0.22, 0);
    const prow = makePart(g.cone1, m.goldTrim, 0.22, 0.24, 0.22, 0.36, 0.22, 0, 0, 0, -Math.PI * 0.5);
    const turret = makePart(g.octBase, m.darkSteel, 0.48, 0.9, 0.48, -0.05, 0.40, 0);
    const cannonL = makePart(g.cyl1, m.chrome, 0.045, 0.42, 0.045, 0.26, 0.36, -0.10, 0, 0, Math.PI * 0.5);
    const cannonR = makePart(g.cyl1, m.chrome, 0.045, 0.42, 0.045, 0.26, 0.36, 0.10, 0, 0, Math.PI * 0.5);
    const core = makePart(g.sphere1, m.bossCore, 0.13, 0.13, 0.13, -0.05, 0.48, 0, 0, 0, 0, false);
    bodyGroup.add(trackL, trackR, hull, prow, turret, cannonL, cannonR, core);
    spinPart = core;
  } else if (kind === 'tank') {
    barY = 0.68;
    const tL = makePart(g.box1, m.darkSteel, 0.48, 0.11, 0.11, 0, 0.07, -0.18);
    const tR = makePart(g.box1, m.darkSteel, 0.48, 0.11, 0.11, 0, 0.07, 0.18);
    const hull = makePart(g.box1, m.enTank, 0.42, 0.16, 0.28, 0, 0.16, 0);
    const turret = makePart(g.cyl1, m.slateArmor, 0.13, 0.10, 0.13, -0.02, 0.28, 0);
    const barrel = makePart(g.cyl1, m.darkSteel, 0.035, 0.30, 0.035, 0.18, 0.28, 0, 0, 0, Math.PI * 0.5);
    bodyGroup.add(tL, tR, hull, turret, barrel);
  } else if (kind === 'shield') {
    barY = 0.70;
    const hex = makePart(g.hex1, m.enShield, 0.26, 0.16, 0.26, 0, 0.18, 0);
    const prow = makePart(g.box1, m.chrome, 0.20, 0.10, 0.28, 0.16, 0.18, 0);
    const emitter = makePart(g.sphere1, m.visorCyan, 0.10, 0.12, 0.10, 0, 0.29, 0, 0, 0, 0, false);
    bodyGroup.add(hex, prow, emitter);
  } else if (kind === 'thermo') {
    barY = 0.62;
    const hull = makePart(g.cone1, m.enThermo, 0.19, 0.44, 0.19, 0.04, 0.19, 0, 0, 0, -Math.PI * 0.5);
    const fin = makePart(g.box1, m.darkSteel, 0.24, 0.14, 0.05, -0.05, 0.27, 0);
    const core = makePart(g.sphere1, m.flameOrange, 0.09, 0.09, 0.09, 0.05, 0.22, 0, 0, 0, 0, false);
    const flame = makePart(g.cone1, m.flameOrange, 0.10, 0.28, 0.10, -0.26, 0.19, 0, 0, 0, Math.PI * 0.5, false);
    bodyGroup.add(hull, fin, core, flame);
    flamePart = flame;
  } else if (kind === 'splitter') {
    barY = 0.66;
    const core = makePart(g.octa1, m.enSplitter, 0.21, 0.21, 0.21, 0, 0.24, 0);
    spinPart = new THREE.Group();
    spinPart.position.set(0, 0.24, 0);
    const podA = makePart(g.sphere1, m.visorCyan, 0.07, 0.07, 0.07, 0.23, 0, 0, 0, 0, 0, false);
    const podB = makePart(g.sphere1, m.visorCyan, 0.07, 0.07, 0.07, -0.23, 0, 0, 0, 0, 0, false);
    spinPart.add(podA, podB);
    bodyGroup.add(core, spinPart);
  } else if (kind === 'swarm') {
    barY = 0.44;
    const body = makePart(g.cone1, m.enSwarm, 0.11, 0.26, 0.11, 0.02, 0.16, 0, 0, 0, -Math.PI * 0.5);
    const wing = makePart(g.box1, m.chrome, 0.08, 0.03, 0.26, -0.04, 0.16, 0);
    const eye = makePart(g.sphere1, m.flameOrange, 0.05, 0.05, 0.05, 0.07, 0.18, 0, 0, 0, 0, false);
    bodyGroup.add(body, wing, eye);
  } else if (kind === 'fast') {
    barY = 0.56;
    const fuselage = makePart(g.cone1, m.enFast, 0.14, 0.42, 0.14, 0.04, 0.18, 0, 0, 0, -Math.PI * 0.5);
    const wing = makePart(g.box1, m.enFast, 0.16, 0.035, 0.40, -0.06, 0.17, 0);
    const visor = makePart(g.sphere1, m.visorCyan, 0.07, 0.05, 0.055, 0.08, 0.22, 0, 0, 0, 0, false);
    const flame = makePart(g.cone1, m.flameViolet, 0.07, 0.20, 0.07, -0.22, 0.18, 0, 0, 0, Math.PI * 0.5, false);
    bodyGroup.add(fuselage, wing, visor, flame);
    flamePart = flame;
  } else {
    // Normal
    barY = 0.56;
    const hull = makePart(g.cone1, m.enNormal, 0.16, 0.36, 0.16, 0.03, 0.18, 0, 0, 0, -Math.PI * 0.5);
    const wing = makePart(g.box1, m.enNormal, 0.14, 0.04, 0.36, -0.05, 0.17, 0);
    const visor = makePart(g.sphere1, m.visorCyan, 0.075, 0.06, 0.065, 0.06, 0.22, 0, 0, 0, 0, false);
    bodyGroup.add(hull, wing, visor);
  }

  // Shield dome
  const shieldScale = kind === 'boss' ? 1.45 : (kind === 'shield' ? 0.92 : 0.78);
  const shieldMesh = makePart(g.shieldSphere, m.shieldBubble, shieldScale, shieldScale, shieldScale, 0, 0.22, 0, 0, 0, 0, false);
  shieldMesh.visible = false;
  root.add(shieldMesh);

  // Frost / Thaw rings
  const ringScale = kind === 'boss' ? 1.55 : (kind === 'swarm' ? 0.65 : 1.0);
  const frostRing = makePart(g.auraRing, m.frostAura, ringScale, ringScale, 1, 0, 0.04, 0, -Math.PI * 0.5, 0, 0, false);
  frostRing.visible = false;
  const thawRing = makePart(g.auraRing, m.thawAura, ringScale, ringScale, 1, 0, 0.045, 0, -Math.PI * 0.5, 0, 0, false);
  thawRing.visible = false;
  root.add(frostRing, thawRing);

  // Billboarded 3D Health + Shield Bar (zero texture allocation!)
  const barWidth = kind === 'boss' ? 0.92 : (kind === 'swarm' ? 0.42 : 0.58);
  const hpGroup = new THREE.Group();
  hpGroup.position.set(0, barY, 0);
  const hpBg = makePart(g.barPlane, m.barBg, barWidth + 0.04, 0.085, 1, 0, 0, 0, 0, 0, 0, false);
  const hpFill = makePart(g.barPlane, kind === 'boss' ? m.barHpBoss : m.barHp, barWidth, 0.055, 1, 0, 0, 0.004, 0, 0, 0, false);
  const shBg = makePart(g.barPlane, m.barBg, barWidth + 0.04, 0.055, 1, 0, 0.08, 0, 0, 0, 0, false);
  const shFill = makePart(g.barPlane, m.barShield, barWidth, 0.036, 1, 0, 0.08, 0.004, 0, 0, 0, false);
  hpBg.renderOrder = 20;
  hpFill.renderOrder = 21;
  shBg.renderOrder = 20;
  shFill.renderOrder = 21;
  shBg.visible = false;
  shFill.visible = false;
  hpGroup.add(hpBg, hpFill, shBg, shFill);
  root.add(hpGroup);

  return {
    root,
    bodyGroup,
    spinPart,
    flamePart,
    shieldMesh,
    frostRing,
    thawRing,
    hpGroup,
    hpFill,
    shBg,
    shFill,
    barWidth
  };
}
