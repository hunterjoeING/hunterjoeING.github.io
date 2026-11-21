// Multi-Part PBR 3D Models & Object Pools for Zombie Horde: Gate Runner
// Shared geometries/materials + WeakMap-backed pools -> zero runtime allocations in loop.

import * as THREE from 'three';
import { getZBTextures } from './zb-textures.js';

let assets = null;

function stdMat(color, metalness = 0.5, roughness = 0.42, extra = {}) {
  const tex = getZBTextures();
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

export function getSharedAssets() {
  if (assets) return assets;
  const tex = getZBTextures();

  const g = {
    box: new THREE.BoxGeometry(1, 1, 1),
    cyl: new THREE.CylinderGeometry(1, 1, 1, 12),
    barrelCyl: new THREE.CylinderGeometry(0.42, 0.42, 1.02, 18),
    barrelRim: new THREE.TorusGeometry(0.425, 0.032, 8, 20),
    sphere: new THREE.SphereGeometry(1, 12, 10),
    cone: new THREE.ConeGeometry(1, 1, 8),
    ring: new THREE.RingGeometry(0.84, 1.0, 28),
    plane: new THREE.PlaneGeometry(1, 1)
  };

  const m = {
    // Shared Hit-Flash material (zero clone per frame)
    hitFlash: new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }),

    // Marine PBR materials
    marineArmor: stdMat(0x0284c7, 0.62, 0.32),
    marineDark: stdMat(0x0f172a, 0.72, 0.40),
    marineSlate: stdMat(0x334155, 0.60, 0.36),
    marineHelm: stdMat(0xe2e8f0, 0.45, 0.26),
    marineVisor: emissiveMat(0x67e8f9, 0x22d3ee, 1.85),
    marinePackCell: emissiveMat(0x7dd3fc, 0x38bdf8, 1.45),
    weaponSteel: stdMat(0x1e293b, 0.78, 0.28),
    weaponChrome: stdMat(0xcbd5e1, 0.85, 0.22),
    coreCyan: emissiveMat(0x67e8f9, 0x22d3ee, 1.9),
    coreOrange: emissiveMat(0xfdba74, 0xf97316, 2.0),
    coreMagenta: emissiveMat(0xf9a8d4, 0xf43f5e, 2.1),
    muzzleYellow: new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.95, toneMapped: false }),
    muzzleOrange: new THREE.MeshBasicMaterial({ color: 0xfb923c, transparent: true, opacity: 0.92, toneMapped: false }),
    muzzlePink: new THREE.MeshBasicMaterial({ color: 0xf472b6, transparent: true, opacity: 0.95, toneMapped: false }),

    // Zombie PBR materials (organic mottled skin & tattered cloth)
    zSkinNormal: stdMat(0x65a30d, 0.08, 0.68, { map: tex.zombieSkin }),
    zCoatNormal: stdMat(0x334155, 0.14, 0.78, { map: tex.zombieCloth }),
    zEyeRed: emissiveMat(0xfca5a5, 0xef4444, 2.2),

    zSkinFast: stdMat(0x06b6d4, 0.14, 0.55, { map: tex.zombieSkin, emissive: 0x083344, emissiveIntensity: 0.38 }),
    zCoatFast: stdMat(0x155e75, 0.22, 0.64, { map: tex.zombieCloth }),
    zEyeCyan: emissiveMat(0xa5f3fc, 0x22d3ee, 2.3),

    zSkinBrute: stdMat(0x9333ea, 0.14, 0.62, { map: tex.zombieSkin }),
    zCoatBrute: stdMat(0x3b0764, 0.30, 0.58, { map: tex.zombieCloth }),
    zArmorSteel: stdMat(0x64748b, 0.72, 0.34),
    zHazardGold: stdMat(0xfacc15, 0.45, 0.36, { noTex: true }),

    zSkinBoss: stdMat(0xe11d48, 0.18, 0.56, { map: tex.zombieSkin }),
    zCoatBoss: stdMat(0x450a0a, 0.34, 0.52, { map: tex.zombieCloth }),
    zBossHorn: stdMat(0xfef3c7, 0.30, 0.42, { noTex: true }),
    zBossGold: stdMat(0xfbbf24, 0.80, 0.25),
    zBossCore: emissiveMat(0xfef08a, 0xf97316, 2.3),
    zEyeGold: emissiveMat(0xfef08a, 0xfacc15, 2.4),
    zTeeth: stdMat(0xf8fafc, 0.1, 0.5, { noTex: true }),
    zMouth: new THREE.MeshBasicMaterial({ color: 0x1a0408 }),
    bossRing: new THREE.MeshBasicMaterial({
      color: 0xf43f5e, transparent: true, opacity: 0.62, side: THREE.DoubleSide, toneMapped: false
    }),

    // Barrel materials
    barrelBody: new THREE.MeshStandardMaterial({
      map: tex.barrelAlbedo, roughness: 0.48, metalness: 0.45
    }),
    barrelCap: stdMat(0x334155, 0.72, 0.36),
    beaconRed: emissiveMat(0xfca5a5, 0xef4444, 2.1),
    beaconYellow: emissiveMat(0xfef08a, 0xfacc15, 2.4),

    // Shared HP bar materials
    barBg: new THREE.MeshBasicMaterial({ color: 0x020617, transparent: true, opacity: 0.86, depthTest: false }),
    barGreen: new THREE.MeshBasicMaterial({ color: 0x4ade80, depthTest: false, toneMapped: false }),
    barYellow: new THREE.MeshBasicMaterial({ color: 0xfacc15, depthTest: false, toneMapped: false }),
    barBoss: new THREE.MeshBasicMaterial({ color: 0xf43f5e, depthTest: false, toneMapped: false })
  };

  assets = { g, m };
  return assets;
}

function part(geo, mat, sx, sy, sz, px = 0, py = 0, pz = 0, rx = 0, ry = 0, rz = 0, shadow = true) {
  const mesh = new THREE.Mesh(geo, mat);
  mesh.scale.set(sx, sy, sz);
  mesh.position.set(px, py, pz);
  if (rx || ry || rz) mesh.rotation.set(rx, ry, rz);
  mesh.castShadow = shadow;
  mesh.receiveShadow = shadow;
  return mesh;
}

export function createMarineModel() {
  const { g, m } = getSharedAssets();
  const root = new THREE.Group();

  // Legs (pivoted at hip y = 0.42) with rounded limbs & knee guards
  const legL = new THREE.Group();
  legL.position.set(-0.12, 0.42, 0);
  legL.add(
    part(g.cyl, m.marineDark, 0.075, 0.34, 0.075, 0, -0.17, 0),
    part(g.sphere, m.marineArmor, 0.082, 0.065, 0.082, 0, -0.17, -0.02),
    part(g.box, m.marineSlate, 0.16, 0.11, 0.22, 0, -0.36, -0.02)
  );

  const legR = new THREE.Group();
  legR.position.set(0.12, 0.42, 0);
  legR.add(
    part(g.cyl, m.marineDark, 0.075, 0.34, 0.075, 0, -0.17, 0),
    part(g.sphere, m.marineArmor, 0.082, 0.065, 0.082, 0, -0.17, -0.02),
    part(g.box, m.marineSlate, 0.16, 0.11, 0.22, 0, -0.36, -0.02)
  );
  root.add(legL, legR);

  // Upper torso assembly
  const body = new THREE.Group();
  body.position.set(0, 0.44, 0);
  root.add(body);

  // Torso, chest rig, belt, backpack + antenna & glowing cells
  body.add(
    part(g.box, m.marineArmor, 0.42, 0.44, 0.25, 0, 0.24, 0),
    part(g.box, m.marineSlate, 0.34, 0.24, 0.28, 0, 0.28, -0.02),
    part(g.box, m.marineDark, 0.44, 0.08, 0.28, 0, 0.04, 0),
    part(g.box, m.zBossGold, 0.08, 0.07, 0.29, 0, 0.04, 0),
    part(g.box, m.marineSlate, 0.34, 0.34, 0.16, 0, 0.25, 0.19),
    part(g.cyl, m.weaponChrome, 0.012, 0.24, 0.012, -0.13, 0.50, 0.22, -0.1, 0, 0),
    part(g.box, m.marinePackCell, 0.05, 0.19, 0.04, -0.09, 0.26, 0.28, 0, 0, 0, false),
    part(g.box, m.marinePackCell, 0.05, 0.19, 0.04, 0.09, 0.26, 0.28, 0, 0, 0, false),
    // Pauldrons
    part(g.sphere, m.marineArmor, 0.14, 0.13, 0.14, -0.25, 0.39, 0),
    part(g.sphere, m.marineArmor, 0.14, 0.13, 0.14, 0.25, 0.39, 0),
    // Left support arm (rounded)
    part(g.cyl, m.marineArmor, 0.058, 0.28, 0.058, -0.24, 0.22, -0.09, 0.85, 0, -0.22),
    // Helmet + rim + crest + glowing visor (facing -Z forward down the bridge)
    part(g.sphere, m.marineHelm, 0.20, 0.21, 0.21, 0, 0.62, 0),
    part(g.box, m.marineSlate, 0.25, 0.04, 0.22, 0, 0.69, -0.04),
    part(g.box, m.marineArmor, 0.07, 0.07, 0.24, 0, 0.78, 0.02),
    part(g.box, m.marineVisor, 0.24, 0.08, 0.12, 0, 0.63, -0.15, 0, 0, 0, false)
  );

  // Weapon & right arm group (faces -Z)
  const gunGroup = new THREE.Group();
  gunGroup.position.set(0.21, 0.25, -0.12);
  body.add(gunGroup);

  const gunChassis = part(g.box, m.weaponSteel, 0.12, 0.15, 0.50, 0, 0, -0.16);
  const gunScope = part(g.cyl, m.marineDark, 0.028, 0.16, 0.028, 0, 0.11, -0.14, Math.PI * 0.5, 0, 0);
  const gunBarrel = part(g.cyl, m.weaponChrome, 0.036, 0.34, 0.036, 0, 0.02, -0.45, Math.PI * 0.5, 0, 0);
  const gunCore = part(g.box, m.coreCyan, 0.06, 0.05, 0.30, 0, 0.07, -0.18, 0, 0, 0, false);
  gunGroup.add(gunScope);

  // Tier 2 upgrade: Twin side scatter barrels
  const spreadTwinL = part(g.cyl, m.weaponChrome, 0.028, 0.26, 0.028, -0.075, 0.01, -0.38, Math.PI * 0.5, 0, 0);
  const spreadTwinR = part(g.cyl, m.weaponChrome, 0.028, 0.26, 0.028, 0.075, 0.01, -0.38, Math.PI * 0.5, 0, 0);
  spreadTwinL.visible = false;
  spreadTwinR.visible = false;

  // Tier 3 upgrade: Heavy mega-spread emitter shroud
  const megaShroud = part(g.box, m.coreOrange, 0.17, 0.06, 0.24, 0, 0.09, -0.32, 0, 0, 0, false);
  megaShroud.visible = false;

  // Muzzle flash star (pre-built, zero alloc)
  const muzzleFlash = new THREE.Group();
  muzzleFlash.position.set(0, 0.02, -0.62);
  const flashCone = part(g.cone, m.muzzleYellow, 0.12, 0.26, 0.12, 0, 0, -0.10, -Math.PI * 0.5, 0, 0, false);
  const flashCrossA = part(g.plane, m.muzzleYellow, 0.34, 0.12, 1, 0, 0, 0, 0, 0, 0, false);
  const flashCrossB = part(g.plane, m.muzzleYellow, 0.12, 0.34, 1, 0, 0, 0, 0, 0, 0, false);
  muzzleFlash.add(flashCone, flashCrossA, flashCrossB);
  muzzleFlash.visible = false;

  gunGroup.add(gunChassis, gunBarrel, gunCore, spreadTwinL, spreadTwinR, megaShroud, muzzleFlash);

  return {
    root,
    legL,
    legR,
    body,
    gunGroup,
    gunCore,
    spreadTwinL,
    spreadTwinR,
    megaShroud,
    muzzleFlash,
    flashCone,
    flashCrossA,
    flashCrossB
  };
}

export function updateMarineVisual(vis, idx, nowSec, spreadLevel, dmgMult, firingGlow, leanAngle) {
  const { m } = getSharedAssets();
  const stride = Math.sin(nowSec * 12 + idx * 1.3);
  vis.legL.rotation.x = stride * 0.52;
  vis.legR.rotation.x = -stride * 0.52;
  vis.body.position.y = 0.44 + Math.abs(stride) * 0.04;
  vis.body.rotation.z = -leanAngle * 0.16;
  vis.body.rotation.y = -leanAngle * 0.28;

  // Visible weapon tier upgrades
  vis.spreadTwinL.visible = spreadLevel >= 2;
  vis.spreadTwinR.visible = spreadLevel >= 2;
  vis.megaShroud.visible = spreadLevel >= 3;

  const coreMat = dmgMult >= 2.0 ? m.coreMagenta : (spreadLevel >= 2 ? m.coreOrange : m.coreCyan);
  if (vis.gunCore.material !== coreMat) vis.gunCore.material = coreMat;

  const flashMat = dmgMult >= 2.0 ? m.muzzlePink : (spreadLevel >= 2 ? m.muzzleOrange : m.muzzleYellow);
  const showFlash = firingGlow && ((idx + Math.floor(nowSec * 28)) % 2 === 0);
  vis.gunGroup.position.z = -0.12 + (firingGlow ? 0.065 : 0);
  vis.muzzleFlash.visible = showFlash;
  if (showFlash) {
    vis.muzzleFlash.rotation.z = nowSec * 19 + idx;
    const s = 0.85 + Math.sin(nowSec * 40 + idx) * 0.25;
    vis.muzzleFlash.scale.setScalar(s);
    if (vis.flashCone.material !== flashMat) {
      vis.flashCone.material = flashMat;
      vis.flashCrossA.material = flashMat;
      vis.flashCrossB.material = flashMat;
    }
  }
}

export function createZombieModel(kind) {
  const { g, m } = getSharedAssets();
  const root = new THREE.Group();
  const isBoss = kind === 'boss';
  const isBrute = kind === 'brute';
  const isFast = kind === 'fast';

  const skinMat = isBoss ? m.zSkinBoss : (isBrute ? m.zSkinBrute : (isFast ? m.zSkinFast : m.zSkinNormal));
  const coatMat = isBoss ? m.zCoatBoss : (isBrute ? m.zCoatBrute : (isFast ? m.zCoatFast : m.zCoatNormal));
  const eyeMat = isBoss ? m.zEyeGold : (isFast ? m.zEyeCyan : m.zEyeRed);
  const scale = isBoss ? 2.15 : (isBrute ? 1.42 : (isFast ? 0.98 : 1.08));

  const modelRoot = new THREE.Group();
  modelRoot.scale.setScalar(scale);
  root.add(modelRoot);

  // Boss threat ring at ground level
  let bossRing = null;
  if (isBoss) {
    bossRing = part(g.ring, m.bossRing, 0.95, 0.95, 1, 0, 0.03, 0, -Math.PI * 0.5, 0, 0, false);
    modelRoot.add(bossRing);
  }

  // Legs (facing +Z toward player squad!)
  const legL = new THREE.Group();
  legL.position.set(-0.14, 0.46, 0);
  const legLMesh = part(g.cyl, coatMat, 0.078, 0.42, 0.078, 0, -0.21, 0);
  const bootLMesh = part(g.box, m.marineDark, 0.17, 0.10, 0.22, 0, -0.41, 0.03);
  legL.add(legLMesh, bootLMesh);

  const legR = new THREE.Group();
  legR.position.set(0.14, 0.46, 0);
  const legRMesh = part(g.cyl, coatMat, 0.078, 0.42, 0.078, 0, -0.21, 0);
  const bootRMesh = part(g.box, m.marineDark, 0.17, 0.10, 0.22, 0, -0.41, 0.03);
  legR.add(legRMesh, bootRMesh);
  modelRoot.add(legL, legR);

  // Torso (slightly hunched forward for zombie silhouette)
  const body = new THREE.Group();
  body.position.set(0, 0.48, 0);
  body.rotation.x = isFast ? 0.16 : 0.08;
  modelRoot.add(body);

  const torsoW = isBrute || isBoss ? 0.54 : (isFast ? 0.36 : 0.44);
  const torsoMesh = part(g.box, coatMat, torsoW, 0.52, 0.30, 0, 0.26, 0);
  body.add(torsoMesh);

  // Kind-specific chest / shoulder armor
  const armorMeshes = [torsoMesh, legLMesh, legRMesh];
  if (isBoss) {
    const core = part(g.sphere, m.zBossCore, 0.14, 0.14, 0.10, 0, 0.28, 0.15, 0, 0, 0, false);
    const pL = part(g.sphere, m.zCoatBoss, 0.20, 0.18, 0.20, -0.34, 0.46, 0);
    const pR = part(g.sphere, m.zCoatBoss, 0.20, 0.18, 0.20, 0.34, 0.46, 0);
    const spikeL = part(g.cone, m.zBossGold, 0.07, 0.22, 0.07, -0.38, 0.62, 0, 0, 0, 0.35);
    const spikeR = part(g.cone, m.zBossGold, 0.07, 0.22, 0.07, 0.38, 0.62, 0, 0, 0, -0.35);
    body.add(core, pL, pR, spikeL, spikeR);
    armorMeshes.push(pL, pR);
  } else if (isBrute) {
    const pL = part(g.box, m.zArmorSteel, 0.18, 0.16, 0.26, -0.34, 0.44, 0);
    const pR = part(g.box, m.zArmorSteel, 0.18, 0.16, 0.26, 0.34, 0.44, 0);
    const belt = part(g.box, m.zHazardGold, 0.56, 0.07, 0.32, 0, 0.05, 0);
    body.add(pL, pR, belt);
    armorMeshes.push(pL, pR);
  }

  // Reaching clawed arms (+Z toward player)
  const armL = new THREE.Group();
  armL.position.set(-torsoW * 0.62, 0.44, 0.04);
  const armLMesh = part(g.cyl, skinMat, 0.062, 0.42, 0.062, 0, -0.05, 0.22, -Math.PI * 0.42, 0, 0);
  const clawL = part(g.cone, m.zTeeth, 0.045, 0.10, 0.045, 0, -0.08, 0.44, Math.PI * 0.5, 0, 0);
  armL.add(armLMesh, clawL);

  const armR = new THREE.Group();
  armR.position.set(torsoW * 0.62, 0.44, 0.04);
  const armRMesh = part(g.cyl, skinMat, 0.062, 0.42, 0.062, 0, -0.05, 0.22, -Math.PI * 0.42, 0, 0);
  const clawR = part(g.cone, m.zTeeth, 0.045, 0.10, 0.045, 0, -0.08, 0.44, Math.PI * 0.5, 0, 0);
  armR.add(armRMesh, clawR);
  body.add(armL, armR);

  // Head + Brow + Jaw + Fangs + Glowing Eyes
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.68, isFast ? 0.08 : 0.02);
  body.add(headGroup);

  const cranium = part(g.sphere, skinMat, 0.22, 0.23, 0.22, 0, 0, 0);
  const brow = part(g.box, skinMat, 0.26, 0.055, 0.10, 0, 0.07, 0.16);
  const jaw = part(g.box, skinMat, 0.22, 0.15, 0.19, 0, -0.12, 0.05);
  const mouth = part(g.box, m.zMouth, 0.16, 0.065, 0.04, 0, -0.10, 0.15, 0, 0, 0, false);
  const fangL = part(g.cone, m.zTeeth, 0.022, 0.055, 0.022, -0.05, -0.08, 0.16, Math.PI, 0, 0, false);
  const fangR = part(g.cone, m.zTeeth, 0.022, 0.055, 0.022, 0.05, -0.08, 0.16, Math.PI, 0, 0, false);
  const eyeL = part(g.sphere, eyeMat, 0.042, 0.036, 0.035, -0.08, 0.03, 0.19, 0, 0, 0, false);
  const eyeR = part(g.sphere, eyeMat, 0.042, 0.036, 0.035, 0.08, 0.03, 0.19, 0, 0, 0, false);
  headGroup.add(cranium, brow, jaw, mouth, fangL, fangR, eyeL, eyeR);

  if (isBoss) {
    headGroup.add(
      part(g.cone, m.zBossHorn, 0.06, 0.24, 0.06, -0.16, 0.20, -0.02, -0.2, 0, 0.42),
      part(g.cone, m.zBossHorn, 0.06, 0.24, 0.06, 0.16, 0.20, -0.02, -0.2, 0, -0.42),
      part(g.cone, m.zBossGold, 0.05, 0.13, 0.05, 0, 0.24, 0.05)
    );
  } else if (isBrute) {
    headGroup.add(part(g.box, m.zArmorSteel, 0.36, 0.08, 0.26, 0, 0.11, 0.04));
  }

  // Floating 3D Health Bar above zombie
  const barGroup = new THREE.Group();
  barGroup.position.set(0, (isBoss ? 1.52 : 1.38) * scale, 0);
  const barW = isBoss ? 1.55 : (isBrute ? 1.02 : 0.78);
  const barBg = part(g.plane, m.barBg, barW + 0.06, 0.14, 1, 0, 0, 0, 0, 0, 0, false);
  barBg.renderOrder = 19;
  const barFill = part(g.plane, isBoss ? m.barBoss : m.barGreen, barW, 0.09, 1, 0, 0, 0.01, 0, 0, 0, false);
  barFill.renderOrder = 20;
  barGroup.add(barBg, barFill);
  barGroup.visible = false;
  root.add(barGroup);

  return {
    root,
    kind,
    legL,
    legR,
    armL,
    armR,
    body,
    headGroup,
    bossRing,
    skinMeshes: [cranium, jaw, armLMesh, armRMesh],
    armorMeshes,
    skinMat,
    coatMat,
    barGroup,
    barFill,
    barW,
    isFlashing: false
  };
}

export function createBarrelModel() {
  const { g, m } = getSharedAssets();
  const root = new THREE.Group();
  const drum = part(g.barrelCyl, m.barrelBody, 1, 1, 1, 0, 0.51, 0);
  const topCap = part(g.cyl, m.barrelCap, 0.41, 0.04, 0.41, 0, 1.02, 0);
  const rimTop = part(g.barrelRim, m.barrelCap, 1, 1, 1, 0, 0.99, 0, Math.PI * 0.5, 0, 0);
  const rimBot = part(g.barrelRim, m.barrelCap, 1, 1, 1, 0, 0.04, 0, Math.PI * 0.5, 0, 0);
  const beacon = part(g.sphere, m.beaconRed, 0.11, 0.11, 0.11, 0, 1.09, 0, 0, 0, 0, false);
  root.add(drum, topCap, rimTop, rimBot, beacon);
  return { root, beacon };
}

export function createGateModel() {
  const { g, m } = getSharedAssets();
  const tex = getZBTextures();
  const root = new THREE.Group();

  const pylonMat = stdMat(0x0f172a, 0.72, 0.35);
  const trimMat = emissiveMat(0x22d3ee, 0x22d3ee, 1.4);
  const curtainMat = new THREE.MeshBasicMaterial({
    color: 0x22d3ee,
    map: tex.gateCurtain,
    transparent: true,
    opacity: 0.36,
    side: THREE.DoubleSide,
    depthWrite: false,
    toneMapped: false
  });

  const pylonL = part(g.box, pylonMat, 0.24, 2.35, 0.28, -2.5, 1.18, 0);
  const pylonR = part(g.box, pylonMat, 0.24, 2.35, 0.28, 2.5, 1.18, 0);
  const trimL = part(g.box, trimMat, 0.10, 2.1, 0.32, -2.5, 1.18, 0, 0, 0, 0, false);
  const trimR = part(g.box, trimMat, 0.10, 2.1, 0.32, 2.5, 1.18, 0, 0, 0, 0, false);
  const lintel = part(g.box, pylonMat, 5.2, 0.20, 0.30, 0, 2.35, 0);
  const lintelGlow = part(g.box, trimMat, 5.0, 0.08, 0.33, 0, 2.35, 0, 0, 0, 0, false);
  const curtain = part(g.plane, curtainMat, 4.9, 2.2, 1, 0, 1.14, 0, 0, 0, 0, false);

  // Label badge canvas (redrawn ONLY when text/color changes!)
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 512;
  labelCanvas.height = 160;
  const labelCtx = labelCanvas.getContext('2d');
  const labelTex = new THREE.CanvasTexture(labelCanvas);
  labelTex.colorSpace = THREE.SRGBColorSpace;
  const labelMat = new THREE.MeshBasicMaterial({
    map: labelTex, transparent: true, depthWrite: false, toneMapped: false
  });
  const labelMesh = part(g.plane, labelMat, 3.6, 1.12, 1, 0, 1.32, 0.08, 0, 0, 0, false);
  labelMesh.renderOrder = 15;

  // Shootable progress bar at bottom of gate
  const progBg = part(g.plane, m.barBg, 3.4, 0.20, 1, 0, 0.28, 0.08, 0, 0, 0, false);
  const progFillMat = new THREE.MeshBasicMaterial({ color: 0x4ade80, depthTest: false, toneMapped: false });
  const progFill = part(g.plane, progFillMat, 3.3, 0.13, 1, 0, 0.28, 0.10, 0, 0, 0, false);
  progBg.renderOrder = 14;
  progFill.renderOrder = 15;

  root.add(pylonL, pylonR, trimL, trimR, lintel, lintelGlow, curtain, labelMesh, progBg, progFill);

  return {
    root,
    pylonL,
    pylonR,
    trimL,
    trimR,
    lintel,
    lintelGlow,
    curtain,
    trimMat,
    curtainMat,
    labelMesh,
    labelCanvas,
    labelCtx,
    labelTex,
    progBg,
    progFill,
    progFillMat,
    lastText: '',
    lastGood: null
  };
}

export class ZBModelPools {
  constructor(parentGroup) {
    this.parent = parentGroup;
    this.marines = [];
    for (let i = 0; i < 24; i++) {
      const m = createMarineModel();
      m.root.visible = false;
      parentGroup.add(m.root);
      this.marines.push(m);
    }

    this.zombiePools = {
      normal: this._makePool(() => createZombieModel('normal'), 54),
      fast: this._makePool(() => createZombieModel('fast'), 32),
      brute: this._makePool(() => createZombieModel('brute'), 22),
      boss: this._makePool(() => createZombieModel('boss'), 4)
    };
    this.barrelPool = this._makePool(() => createBarrelModel(), 12);
    this.gatePool = this._makePool(() => createGateModel(), 10);
  }

  _makePool(factory, count) {
    const items = [];
    for (let i = 0; i < count; i++) {
      const item = factory();
      item.root.visible = false;
      this.parent.add(item.root);
      items.push(item);
    }
    return { items, cursor: 0, factory };
  }

  beginFrame() {
    for (const k in this.zombiePools) this.zombiePools[k].cursor = 0;
    this.barrelPool.cursor = 0;
    this.gatePool.cursor = 0;
  }

  acquireZombie(kind) {
    const pool = this.zombiePools[kind] || this.zombiePools.normal;
    if (pool.cursor >= pool.items.length) {
      const extra = pool.factory();
      this.parent.add(extra.root);
      pool.items.push(extra);
    }
    const item = pool.items[pool.cursor++];
    item.root.visible = true;
    return item;
  }

  acquireBarrel() {
    const pool = this.barrelPool;
    if (pool.cursor >= pool.items.length) {
      const extra = pool.factory();
      this.parent.add(extra.root);
      pool.items.push(extra);
    }
    const item = pool.items[pool.cursor++];
    item.root.visible = true;
    return item;
  }

  acquireGate() {
    const pool = this.gatePool;
    if (pool.cursor >= pool.items.length) {
      const extra = pool.factory();
      this.parent.add(extra.root);
      pool.items.push(extra);
    }
    const item = pool.items[pool.cursor++];
    item.root.visible = true;
    return item;
  }

  endFrame() {
    for (const k in this.zombiePools) {
      const p = this.zombiePools[k];
      for (let i = p.cursor; i < p.items.length; i++) p.items[i].root.visible = false;
    }
    for (let i = this.barrelPool.cursor; i < this.barrelPool.items.length; i++) {
      this.barrelPool.items[i].root.visible = false;
    }
    for (let i = this.gatePool.cursor; i < this.gatePool.items.length; i++) {
      this.gatePool.items[i].root.visible = false;
    }
  }
}
