// Procedural 3D Builder for UP Big Boy #4014 Boiler, Cutaway Internals, Stoker, Superheater,
// Double Blastpipe & Double Smokestack, Articulated Ball-Joint Steam Pipes, Cab, Tender Front & Pilot.

import * as THREE from 'three';
import { BIG_BOY_SPECS } from './specs.js';

const { layout, zPlanes, wheels } = BIG_BOY_SPECS;
const B = layout.boiler;

/**
 * Helper to create a curved longitudinal half-cylinder (left -Z side, open toward +Z viewer for cutaway).
 */
function makeHalfCylinder(rFront, rRear, length, segs, mat, openEnded = false) {
  // CylinderGeometry axis = Y; after rotateZ(PI/2), +Y -> -X, +X -> +Y, +Z -> +Z
  // thetaStart = PI/2, thetaLength = PI keeps z <= 0 (-Z rear/left hemisphere)
  const geo = new THREE.CylinderGeometry(rRear, rFront, length, segs, 1, openEnded, Math.PI * 0.5, Math.PI);
  geo.rotateZ(Math.PI / 2);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/**
 * Helper to create a right-half (+Z) removable cutaway lid for a cylinder.
 */
function makeRightLidCylinder(rFront, rRear, length, segs, mat) {
  // thetaStart = -PI/2, thetaLength = PI keeps z >= 0 (+Z right hemisphere facing viewer!)
  const geo = new THREE.CylinderGeometry(rRear, rFront, length, segs, 1, false, -Math.PI * 0.5, Math.PI);
  geo.rotateZ(Math.PI / 2);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/**
 * Build the Front Pilot (Cowcatcher), Front Coupler & Sliding Boiler Bearer mounted on the
 * FRONT articulated engine unit so the pilot swings with the front drivers on curves!
 */
export function buildFrontPilotAssembly(mats, hingeX) {
  const group = new THREE.Group();
  group.userData.partId = 'articulated_chassis';
  const toLocalX = (wx) => wx - hingeX;

  // Heavy cast-steel pilot deck beam
  const deckX = toLocalX(10.65);
  const deck = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.34, 2.86), mats.castSteel);
  deck.position.set(deckX, 1.15, 0);
  deck.castShadow = true;
  deck.receiveShadow = true;
  group.add(deck);

  // Tapered iconic Big Boy cowcatcher / ribbed pilot nose
  const pilotShape = new THREE.Shape();
  pilotShape.moveTo(0, -1.35);
  pilotShape.lineTo(1.38, -0.36);
  pilotShape.lineTo(1.38, 0.36);
  pilotShape.lineTo(0, 1.35);
  pilotShape.closePath();
  const pilotGeo = new THREE.ExtrudeGeometry(pilotShape, {
    depth: 0.72,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelSegments: 2
  });
  pilotGeo.rotateX(Math.PI / 2);
  const pilotMesh = new THREE.Mesh(pilotGeo, mats.boilerBlack);
  pilotMesh.position.set(toLocalX(10.75), 0.96, 0);
  pilotMesh.castShadow = true;
  group.add(pilotMesh);

  // Horizontal steel reinforcement bars across pilot face
  for (let i = 0; i < 5; i++) {
    const t = i / 4;
    const barW = 2.55 - t * 1.45;
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.045, barW), mats.castSteel);
    bar.position.set(toLocalX(11.15 + t * 0.92), 0.32 + t * 0.56, 0);
    group.add(bar);
  }

  // Front knuckle coupler & air hose
  const coupler = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.24, 0.26), mats.castSteelDark);
  coupler.position.set(toLocalX(12.22), 0.92, 0);
  group.add(coupler);

  // Pilot steps & handrails
  for (const side of [1, -1]) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.06, 0.28), mats.castSteel);
    step.position.set(toLocalX(10.95), 0.42, side * 1.36);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.45, 8), mats.polishedSteel);
    pole.position.set(toLocalX(11.30), 1.65, side * 1.28);
    group.add(step, pole);
  }

  // Sliding boiler bearing shoe (Boiler Bearer) supporting the swinging smokebox!
  const bearer = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.34, 1.65), mats.brass);
  bearer.position.set(toLocalX(4.20), 1.62, 0);
  group.add(bearer);

  return group;
}

/**
 * Build the Monumental Boiler, Graphite Smokebox, Firebox, Stoker, Superheater, Double Blastpipe,
 * Double Smokestack, Cab, Tender Front Stub, Instanced Rivets, Lights & Articulated Steam Pipes!
 */
export function buildBoilerAndSuperstructure(mats) {
  const root = new THREE.Group();
  const exteriorRemovable = []; // Right-half (+Z) meshes hidden during Boiler Cutaway
  const cutawayOnly = [];       // Machined section edges & interior components visible in Boiler Cutaway
  const xrayTargets = [];       // Exterior shells swapped to X-Ray material when X-Ray mode is toggled

  const cy = B.centerY;
  const barrelLen = B.barrelFrontX - B.barrelRearX; // 11.40 m
  const barrelMidX = (B.barrelFrontX + B.barrelRearX) * 0.5;
  const smokeLen = B.smokeboxFrontX - B.smokeboxRearX; // 3.75 m
  const smokeMidX = (B.smokeboxFrontX + B.smokeboxRearX) * 0.5;
  const fbLen = B.fireboxFrontX - B.fireboxRearX; // 5.35 m
  const fbMidX = (B.fireboxFrontX + B.fireboxRearX) * 0.5;

  // =========================================================================
  // 1. BOILER BARREL (Left Permanent Half + Right Removable Cutaway Lid)
  // =========================================================================
  const boilerGroup = new THREE.Group();
  boilerGroup.userData.partId = 'boiler_superheater';

  const barrelLeft = makeHalfCylinder(B.barrelFrontRadius, B.barrelRearRadius, barrelLen, 36, mats.boilerBlack);
  barrelLeft.position.set(barrelMidX, cy, 0);
  const barrelRight = makeRightLidCylinder(B.barrelFrontRadius, B.barrelRearRadius, barrelLen, 36, mats.boilerBlack);
  barrelRight.position.set(barrelMidX, cy, 0);
  boilerGroup.add(barrelLeft, barrelRight);
  exteriorRemovable.push(barrelRight);
  xrayTargets.push(barrelLeft, barrelRight);

  // Boiler steel bands (straps) wrapped around barrel
  for (let bx = B.barrelRearX + 1.0; bx < B.barrelFrontX - 0.5; bx += 1.65) {
    const t = (bx - B.barrelRearX) / barrelLen;
    const r = B.barrelRearRadius + (B.barrelFrontRadius - B.barrelRearRadius) * t + 0.014;
    const bandLeft = makeHalfCylinder(r, r, 0.065, 32, mats.castSteel);
    bandLeft.position.set(bx, cy, 0);
    const bandRight = makeRightLidCylinder(r, r, 0.065, 32, mats.castSteel);
    bandRight.position.set(bx, cy, 0);
    boilerGroup.add(bandLeft, bandRight);
    exteriorRemovable.push(bandRight);
  }

  // Cutaway section wall rims along barrel (top & bottom longitudinal crimson/steel cut strips)
  const barrelCutWallGroup = new THREE.Group();
  const topSlopeLen = Math.hypot(barrelLen, B.barrelRearRadius - B.barrelFrontRadius);
  const topSlopeAng = Math.atan2(B.barrelFrontRadius - B.barrelRearRadius, barrelLen);
  const avgR = (B.barrelFrontRadius + B.barrelRearRadius) * 0.5;
  const topCutStrip = new THREE.Mesh(new THREE.BoxGeometry(topSlopeLen, 0.065, 0.025), mats.cutSectionRed);
  topCutStrip.position.set(barrelMidX, cy + avgR - 0.02, 0.005);
  topCutStrip.rotation.z = topSlopeAng;
  const botCutStrip = new THREE.Mesh(new THREE.BoxGeometry(topSlopeLen, 0.065, 0.025), mats.cutSectionRed);
  botCutStrip.position.set(barrelMidX, cy - avgR + 0.02, 0.005);
  botCutStrip.rotation.z = -topSlopeAng;
  barrelCutWallGroup.add(topCutStrip, botCutStrip);
  boilerGroup.add(barrelCutWallGroup);
  cutawayOnly.push(barrelCutWallGroup);

  root.add(boilerGroup);

  // =========================================================================
  // 2. GRAPHITE SMOKEBOX, FRONT DOOR, HEADLIGHT, NUMBERBOARDS & AIR COMPRESSORS
  // =========================================================================
  const smokeboxGroup = new THREE.Group();
  smokeboxGroup.userData.partId = 'smokebox_blastpipe';

  const smokeLeft = makeHalfCylinder(B.smokeboxRadius, B.smokeboxRadius, smokeLen, 36, mats.smokeboxGraphite);
  smokeLeft.position.set(smokeMidX, cy, 0);
  const smokeRight = makeRightLidCylinder(B.smokeboxRadius, B.smokeboxRadius, smokeLen, 36, mats.smokeboxGraphite);
  smokeRight.position.set(smokeMidX, cy, 0);
  smokeboxGroup.add(smokeLeft, smokeRight);
  exteriorRemovable.push(smokeRight);
  xrayTargets.push(smokeLeft, smokeRight);

  // Smokebox cutaway section strips
  const smokeCutGroup = new THREE.Group();
  for (const sy of [B.smokeboxRadius - 0.02, -B.smokeboxRadius + 0.02]) {
    const strip = new THREE.Mesh(new THREE.BoxGeometry(smokeLen, 0.06, 0.025), mats.cutSectionRed);
    strip.position.set(smokeMidX, cy + sy, 0.006);
    smokeCutGroup.add(strip);
  }
  smokeboxGroup.add(smokeCutGroup);
  cutawayOnly.push(smokeCutGroup);

  // Front smokebox dished door
  const doorRing = new THREE.Mesh(
    new THREE.CylinderGeometry(B.smokeboxRadius * 0.96, B.smokeboxRadius * 1.0, 0.14, 32),
    mats.smokeboxGraphite
  );
  doorRing.rotation.z = Math.PI / 2;
  doorRing.position.set(B.smokeboxFrontX + 0.05, cy, 0);
  const innerDoor = new THREE.Mesh(
    new THREE.CylinderGeometry(B.smokeboxRadius * 0.78, B.smokeboxRadius * 0.84, 0.16, 28),
    mats.smokeboxGraphite
  );
  innerDoor.rotation.z = Math.PI / 2;
  innerDoor.position.set(B.smokeboxFrontX + 0.12, cy, 0);
  smokeboxGroup.add(doorRing, innerDoor);

  // Historic subtle chalk "Big Boy" lettering on smokebox door!
  const chalkPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.18, 0.56), mats.chalkDecal);
  chalkPlane.rotation.y = Math.PI / 2;
  chalkPlane.position.set(B.smokeboxFrontX + 0.21, cy - 0.42, 0);
  smokeboxGroup.add(chalkPlane);

  // Central Big Boy Headlight housing + glowing lens + warm volumetric beam cone
  const hlBody = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.36, 20), mats.boilerBlack);
  hlBody.rotation.z = Math.PI / 2;
  hlBody.position.set(B.headlightX + 0.25, B.headlightY + 0.16, 0);
  const hlLens = new THREE.Mesh(new THREE.CircleGeometry(0.21, 20), mats.headlightGlass);
  hlLens.rotation.y = Math.PI / 2;
  hlLens.position.set(B.headlightX + 0.435, B.headlightY + 0.16, 0);
  const hlRim = new THREE.Mesh(new THREE.TorusGeometry(0.225, 0.025, 10, 24), mats.polishedSteel);
  hlRim.rotation.y = Math.PI / 2;
  hlRim.position.set(B.headlightX + 0.43, B.headlightY + 0.16, 0);
  smokeboxGroup.add(hlBody, hlLens, hlRim);

  // Soft volumetric headlight cone
  const coneGeo = new THREE.ConeGeometry(2.1, 10.5, 24, 1, true);
  coneGeo.translate(0, -5.25, 0);
  coneGeo.rotateZ(Math.PI / 2);
  const coneMat = new THREE.MeshBasicMaterial({
    color: 0xffe6b0,
    transparent: true,
    opacity: 0.075,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });
  const headlightCone = new THREE.Mesh(coneGeo, coneMat);
  headlightCone.position.set(B.headlightX + 0.44, B.headlightY + 0.16, 0);
  smokeboxGroup.add(headlightCone);

  // Angled illuminated "4014" Numberboards on both sides of smokebox front (angled outward for 3/4 visibility)
  for (const side of [1, -1]) {
    const nbBox = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.28, 0.66), mats.boilerBlack);
    nbBox.position.set(B.smokeboxFrontX - 0.28, cy + 0.68, side * 0.96);
    nbBox.rotation.y = side * 0.98;
    const nbFace = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.21), mats.numberboard);
    nbFace.position.set(0.072, 0, 0);
    nbFace.rotation.y = Math.PI / 2;
    nbBox.add(nbFace);
    smokeboxGroup.add(nbBox);
  }

  // Iconic Twin Cross-Compound Air Compressors + Finned Aftercooler Radiator mounted on smokebox front!
  const compGroup = new THREE.Group();
  const compShelf = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.12, 2.35), mats.castSteel);
  compShelf.position.set(B.smokeboxFrontX + 0.36, cy - 1.24, 0);
  compGroup.add(compShelf);
  for (const side of [1, -1]) {
    // Two stacked compressor cylinders per side
    for (const cyOff of [0.16, 0.56]) {
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.42, 16), mats.castSteelDark);
      cyl.position.set(B.smokeboxFrontX + 0.44, cy - 1.15 + cyOff, side * 0.66);
      compGroup.add(cyl);
    }
    // Cooling radiator louver shield (Aftercooler) in front of compressors
    const shield = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.72, 0.68), mats.smokeboxGraphite);
    shield.position.set(B.smokeboxFrontX + 0.72, cy - 0.80, side * 0.66);
    compGroup.add(shield);
    for (let f = 0; f < 7; f++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.025, 0.62), mats.polishedSteel);
      fin.position.set(B.smokeboxFrontX + 0.74, cy - 1.08 + f * 0.095, side * 0.66);
      compGroup.add(fin);
    }
  }
  smokeboxGroup.add(compGroup);

  // Massive Elongated DOUBLE SMOKESTACK (Doppelschornstein) housing both front & rear exhaust stacks!
  const stackMidX = (B.stackFrontX + B.stackRearX) * 0.5;
  const stackH = B.stackTopY - (cy + B.smokeboxRadius - 0.12);
  const stackBaseY = cy + B.smokeboxRadius - 0.12;
  const stackCasing = new THREE.Mesh(new THREE.BoxGeometry(1.42, stackH, 0.66), mats.smokeboxGraphite);
  stackCasing.position.set(stackMidX, stackBaseY + stackH * 0.5, 0);
  stackCasing.castShadow = true;
  smokeboxGroup.add(stackCasing);

  // Rounded front & rear lips of double stack + twin circular bore openings!
  for (const sx of [B.stackFrontX, B.stackRearX]) {
    const outerCol = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.36, stackH, 20), mats.smokeboxGraphite);
    outerCol.position.set(sx, stackBaseY + stackH * 0.5, 0);
    const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.12, 20), mats.castSteelDark);
    bore.position.set(sx, B.stackTopY - 0.03, 0);
    smokeboxGroup.add(outerCol, bore);
  }

  // Brass Bell behind double smokestack!
  const bellGroup = new THREE.Group();
  bellGroup.position.set(B.stackRearX - 0.82, cy + B.smokeboxRadius + 0.28, 0);
  const bellYoke = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.38, 0.34), mats.castSteel);
  const bellBody = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.19, 0.28, 20), mats.brass);
  bellBody.position.y = -0.04;
  bellGroup.add(bellYoke, bellBody);
  smokeboxGroup.add(bellGroup);

  root.add(smokeboxGroup);

  // =========================================================================
  // 3. GIGANTIC FIREBOX JACKET, CAB (#4014) & TENDER FRONT STUB
  // =========================================================================
  const fireboxGroup = new THREE.Group();
  fireboxGroup.userData.partId = 'firebox_stoker';

  // Firebox outer wrapper (rounded Belpaire/radial-stay top + wide lower mudring)
  const fbTopLeft = makeHalfCylinder(B.barrelRearRadius, B.barrelRearRadius * 0.96, fbLen, 28, mats.smokeboxGraphite);
  fbTopLeft.position.set(fbMidX, cy, 0);
  const fbTopRight = makeRightLidCylinder(B.barrelRearRadius, B.barrelRearRadius * 0.96, fbLen, 28, mats.smokeboxGraphite);
  fbTopRight.position.set(fbMidX, cy, 0);

  const fbLowerH = 1.48;
  const fbLowerLeft = new THREE.Mesh(new THREE.BoxGeometry(fbLen, fbLowerH, B.fireboxWidth * 0.5), mats.smokeboxGraphite);
  fbLowerLeft.position.set(fbMidX, cy - fbLowerH * 0.5, -B.fireboxWidth * 0.25);
  const fbLowerRight = new THREE.Mesh(new THREE.BoxGeometry(fbLen, fbLowerH, B.fireboxWidth * 0.5), mats.smokeboxGraphite);
  fbLowerRight.position.set(fbMidX, cy - fbLowerH * 0.5, B.fireboxWidth * 0.25);

  fireboxGroup.add(fbTopLeft, fbTopRight, fbLowerLeft, fbLowerRight);
  exteriorRemovable.push(fbTopRight, fbLowerRight);
  xrayTargets.push(fbTopLeft, fbTopRight, fbLowerLeft, fbLowerRight);

  // Ashpan underneath firebox (allows warm firebox glow to peek out underneath!)
  const ashpan = new THREE.Mesh(new THREE.BoxGeometry(fbLen * 0.84, 0.42, 1.55), mats.castSteelDark);
  ashpan.position.set(fbMidX, B.fireboxGrateY - 0.34, 0);
  fireboxGroup.add(ashpan);

  // Cutaway crimson rim around firebox opening
  const fbCutRim = new THREE.Group();
  const fbCutTop = new THREE.Mesh(new THREE.BoxGeometry(fbLen, 0.065, 0.025), mats.cutSectionRed);
  fbCutTop.position.set(fbMidX, cy + B.barrelRearRadius - 0.02, 0.008);
  const fbCutBot = new THREE.Mesh(new THREE.BoxGeometry(fbLen, 0.065, 0.025), mats.cutSectionRed);
  fbCutBot.position.set(fbMidX, B.fireboxGrateY - 0.06, 0.008);
  const fbCutBack = new THREE.Mesh(new THREE.BoxGeometry(0.065, 2.75, 0.025), mats.cutSectionRed);
  fbCutBack.position.set(B.fireboxRearX + 0.03, cy + 0.02, 0.008);
  fbCutRim.add(fbCutTop, fbCutBot, fbCutBack);
  fireboxGroup.add(fbCutRim);
  cutawayOnly.push(fbCutRim);

  root.add(fireboxGroup);

  // ---- CAB (Führerhaus with "4014 UNION PACIFIC" lettering & interior details) ----
  const cabGroup = new THREE.Group();
  cabGroup.userData.partId = 'cab_controls';
  const cabLen = B.cabFrontX - B.cabRearX; // 2.40 m
  const cabMidX = (B.cabFrontX + B.cabRearX) * 0.5;
  const cabW = 3.12;
  const cabFloorY = 2.02;
  const cabH = B.cabTopY - cabFloorY;

  // Cab floor & arched steel roof
  const cabFloor = new THREE.Mesh(new THREE.BoxGeometry(cabLen + 0.35, 0.14, cabW), mats.castSteelDark);
  cabFloor.position.set(cabMidX, cabFloorY, 0);
  const cabRoof = new THREE.Mesh(new THREE.BoxGeometry(cabLen + 0.55, 0.12, cabW + 0.14), mats.boilerBlack);
  cabRoof.position.set(cabMidX - 0.05, B.cabTopY, 0);
  cabRoof.castShadow = true;
  cabGroup.add(cabFloor, cabRoof);

  // Left & Right cab side walls (right side wall hides in boiler cutaway to reveal backhead & stoker!)
  for (const side of [1, -1]) {
    const sideGroup = new THREE.Group();
    const lowerWall = new THREE.Mesh(new THREE.BoxGeometry(cabLen, cabH * 0.52, 0.08), mats.boilerBlack);
    lowerWall.position.set(cabMidX, cabFloorY + cabH * 0.26, side * (cabW * 0.5));
    const pillarFront = new THREE.Mesh(new THREE.BoxGeometry(0.22, cabH * 0.48, 0.08), mats.boilerBlack);
    pillarFront.position.set(B.cabFrontX - 0.11, cabFloorY + cabH * 0.76, side * (cabW * 0.5));
    const pillarMid = new THREE.Mesh(new THREE.BoxGeometry(0.14, cabH * 0.48, 0.08), mats.boilerBlack);
    pillarMid.position.set(cabMidX, cabFloorY + cabH * 0.76, side * (cabW * 0.5));
    const pillarRear = new THREE.Mesh(new THREE.BoxGeometry(0.22, cabH * 0.48, 0.08), mats.boilerBlack);
    pillarRear.position.set(B.cabRearX + 0.11, cabFloorY + cabH * 0.76, side * (cabW * 0.5));
    const winGlass = new THREE.Mesh(new THREE.BoxGeometry(cabLen - 0.35, cabH * 0.40, 0.03), mats.cabWindowGlass);
    winGlass.position.set(cabMidX, cabFloorY + cabH * 0.74, side * (cabW * 0.5));
    const sunVisor = new THREE.Mesh(new THREE.BoxGeometry(cabLen - 0.2, 0.04, 0.18), mats.boilerBlack);
    sunVisor.position.set(cabMidX, B.cabTopY - 0.08, side * (cabW * 0.5 + 0.08));

    // Crisp silver-white "4014 / UNION PACIFIC" cab side lettering
    const decal = new THREE.Mesh(new THREE.PlaneGeometry(1.75, 0.88), mats.cabDecal);
    decal.position.set(cabMidX, cabFloorY + cabH * 0.28, side * (cabW * 0.5 + 0.045));
    if (side < 0) decal.rotation.y = Math.PI;

    sideGroup.add(lowerWall, pillarFront, pillarMid, pillarRear, winGlass, sunVisor, decal);
    cabGroup.add(sideGroup);
    if (side > 0) exteriorRemovable.push(sideGroup);
    xrayTargets.push(lowerWall);
  }

  // Cab front bulkhead + brass backhead pressure gauges & throttle lever inside cab!
  const bulkhead = new THREE.Mesh(new THREE.BoxGeometry(0.10, cabH, cabW), mats.castSteelDark);
  bulkhead.position.set(B.cabFrontX, cabFloorY + cabH * 0.5, 0);
  cabGroup.add(bulkhead);

  // Brass steam gauges & throttle quadrant on cab backhead
  for (const gz of [-0.45, 0.0, 0.45]) {
    const gauge = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.06, 16), mats.brass);
    gauge.rotation.z = Math.PI / 2;
    gauge.position.set(B.cabFrontX - 0.09, cabFloorY + 1.55, gz);
    cabGroup.add(gauge);
  }
  const throttleLever = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.65, 0.04), mats.polishedSteel);
  throttleLever.position.set(B.cabFrontX - 0.35, cabFloorY + 1.45, 0.68);
  throttleLever.rotation.z = 0.28;
  cabGroup.add(throttleLever);

  // ---- TENDER FRONT STUB (Centipede Tender connection with Coal Bunker & Stoker Trough!) ----
  const tenderGroup = new THREE.Group();
  tenderGroup.userData.partId = 'firebox_stoker';
  const tLen = B.tenderFrontX - B.tenderStubRearX; // 2.10 m
  const tMidX = (B.tenderFrontX + B.tenderStubRearX) * 0.5;
  const tBody = new THREE.Mesh(new THREE.BoxGeometry(tLen, 2.55, 3.06), mats.boilerBlack);
  tBody.position.set(tMidX, 2.45, 0);
  tBody.castShadow = true;
  const tFrame = new THREE.Mesh(new THREE.BoxGeometry(tLen + 0.3, 0.38, 2.95), mats.castSteelDark);
  tFrame.position.set(tMidX, 1.02, 0);
  // Coal pile mound peeking out of top of tender front
  const coalMound = new THREE.Mesh(new THREE.SphereGeometry(1.15, 16, 12), mats.castSteelDark);
  coalMound.scale.set(0.85, 0.55, 1.05);
  coalMound.position.set(tMidX, 3.72, 0);
  // Drawbar coupling & tender front gangway bridge
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.08, 2.15), mats.castSteel);
  bridge.position.set((B.cabRearX + B.tenderFrontX) * 0.5, cabFloorY - 0.04, 0);
  tenderGroup.add(tBody, tFrame, coalMound, bridge);
  root.add(cabGroup, tenderGroup);

  // =========================================================================
  // 4. DOMES, WHISTLE, SAFETY VALVES, RUNNING BOARDS & INSTANCED RIVETS
  // =========================================================================
  const fittingsGroup = new THREE.Group();
  fittingsGroup.userData.partId = 'boiler_superheater';

  // Twin Sand Domes & Steam Dome along top of boiler
  const domeSpecs = [
    { x: B.frontSandDomeX, r: 0.54, h: 0.54, name: 'front_sand' },
    { x: B.steamDomeX, r: 0.62, h: 0.60, name: 'steam_dome' },
    { x: B.rearSandDomeX, r: 0.54, h: 0.52, name: 'rear_sand' }
  ];
  for (const d of domeSpecs) {
    const t = Math.max(0, Math.min(1, (d.x - B.barrelRearX) / barrelLen));
    const rBoiler = B.barrelRearRadius + (B.barrelFrontRadius - B.barrelRearRadius) * t;
    const baseY = cy + rBoiler - 0.14;
    const domeLeft = new THREE.Mesh(
      new THREE.CylinderGeometry(d.r * 0.88, d.r, d.h, 24, 1, false, Math.PI * 0.5, Math.PI),
      mats.boilerBlack
    );
    domeLeft.position.set(d.x, baseY + d.h * 0.5, 0);
    const domeRight = new THREE.Mesh(
      new THREE.CylinderGeometry(d.r * 0.88, d.r, d.h, 24, 1, false, -Math.PI * 0.5, Math.PI),
      mats.boilerBlack
    );
    domeRight.position.set(d.x, baseY + d.h * 0.5, 0);
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(d.r * 0.88, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.5),
      mats.boilerBlack
    );
    cap.scale.y = 0.42;
    cap.position.set(d.x, baseY + d.h, 0);
    fittingsGroup.add(domeLeft, domeRight, cap);
    if (d.name === 'steam_dome') {
      exteriorRemovable.push(domeRight);
    }
  }

  // Brass 5-Chime Big Boy Steam Whistle & Trio of Brass Safety Pop Valves
  const whistleGroup = new THREE.Group();
  whistleGroup.position.set(-3.85, cy + B.barrelRearRadius + 0.25, -0.45);
  const wCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.52, 16), mats.brass);
  const wBase = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.06, 0.16, 12), mats.copper);
  wBase.position.y = -0.32;
  whistleGroup.add(wCyl, wBase);
  fittingsGroup.add(whistleGroup);

  for (let i = 0; i < 3; i++) {
    const pop = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.065, 0.28, 12), mats.brass);
    pop.position.set(-4.35 - i * 0.20, cy + B.barrelRearRadius + 0.12, 0.16 * (i - 1));
    fittingsGroup.add(pop);
  }

  // Running Boards (Umlaufbleche), Handrails & Air Brake Reservoirs on both sides
  for (const side of [1, -1]) {
    const rbGroup = new THREE.Group();
    const rbLen = B.smokeboxFrontX - B.cabFrontX - 0.5;
    const rbMidX = (B.smokeboxFrontX + B.cabFrontX) * 0.5;
    const rb = new THREE.Mesh(new THREE.BoxGeometry(rbLen, 0.08, 0.44), mats.castSteel);
    rb.position.set(rbMidX, 2.18, side * (zPlanes.runningBoardOuter - 0.16));
    rb.castShadow = true;
    rbGroup.add(rb);

    // Classic white-edged running board trim
    const rbEdge = new THREE.Mesh(new THREE.BoxGeometry(rbLen, 0.04, 0.025), mats.wheelWhitewall);
    rbEdge.position.set(rbMidX, 2.18, side * (zPlanes.runningBoardOuter + 0.06));
    rbGroup.add(rbEdge);

    // Boiler handrail + stanchions
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, rbLen + 0.4, 10), mats.polishedSteel);
    rail.rotation.z = Math.PI / 2;
    rail.position.set(rbMidX, cy + 0.48, side * 1.44);
    rbGroup.add(rail);

    // Main air brake reservoir tank tucked under running board
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 3.2, 16), mats.castSteelDark);
    tank.rotation.z = Math.PI / 2;
    tank.position.set(-0.5, 1.88, side * 1.32);
    rbGroup.add(tank);

    // Copper boiler feedwater & sand pipes
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, rbLen * 0.72, 10), mats.copper);
    pipe.rotation.z = Math.PI / 2;
    pipe.position.set(rbMidX - 1.2, 2.38, side * 1.38);
    rbGroup.add(pipe);

    fittingsGroup.add(rbGroup);
    if (side > 0) exteriorRemovable.push(rbGroup);
  }

  // InstancedMesh Rivet Rows along Smokebox Front Ring & Boiler Seams (High Detail, 1 Draw Call!)
  const rivetGeo = new THREE.SphereGeometry(0.018, 6, 5);
  const rivetPositions = [];
  // Smokebox front circumference rivets
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * Math.PI * 2;
    rivetPositions.push([
      B.smokeboxFrontX + 0.02,
      cy + Math.sin(a) * (B.smokeboxRadius - 0.06),
      Math.cos(a) * (B.smokeboxRadius - 0.06)
    ]);
  }
  // Boiler seam rivets (left hemisphere so always cleanly attached)
  for (let bx = B.barrelRearX + 1.0; bx < B.smokeboxFrontX - 0.4; bx += 1.65) {
    const t = Math.max(0, Math.min(1, (bx - B.barrelRearX) / barrelLen));
    const r = bx > B.barrelFrontX ? B.smokeboxRadius : B.barrelRearRadius + (B.barrelFrontRadius - B.barrelRearRadius) * t;
    for (let i = 0; i < 16; i++) {
      const a = Math.PI * 0.55 + (i / 15) * Math.PI * 0.9;
      rivetPositions.push([bx + 0.07, cy + Math.cos(a) * (r + 0.008), -Math.sin(a) * (r + 0.008)]);
    }
  }
  const rivetInst = new THREE.InstancedMesh(rivetGeo, mats.smokeboxGraphite, rivetPositions.length);
  const rDummy = new THREE.Object3D();
  rivetPositions.forEach((p, idx) => {
    rDummy.position.set(p[0], p[1], p[2]);
    rDummy.updateMatrix();
    rivetInst.setMatrixAt(idx, rDummy.matrix);
  });
  rivetInst.instanceMatrix.needsUpdate = true;
  fittingsGroup.add(rivetInst);

  root.add(fittingsGroup);

  // =========================================================================
  // 5. BOILER CUTAWAY INTERNALS (Firebox, Stoker Auger, Water, Firetubes,
  //    Elesco Superheater, Steam Dome Regulator, Double Blastpipe!)
  // =========================================================================
  const internalsGroup = new THREE.Group();
  cutawayOnly.push(internalsGroup);

  // 5a. Firebox Grate, Glowing Coal Bed & Brick Arch (Feuerbrücke)
  const grateMesh = new THREE.Mesh(
    new THREE.BoxGeometry(fbLen - 0.45, 0.12, B.fireboxWidth * 0.46),
    mats.castSteelDark
  );
  grateMesh.position.set(fbMidX, B.fireboxGrateY, -B.fireboxWidth * 0.22);
  internalsGroup.add(grateMesh);

  const coalBedMesh = new THREE.Mesh(
    new THREE.BoxGeometry(fbLen - 0.55, 0.24, B.fireboxWidth * 0.44),
    mats.coalBed
  );
  coalBedMesh.position.set(fbMidX, B.fireboxGrateY + 0.16, -B.fireboxWidth * 0.22);
  internalsGroup.add(coalBedMesh);

  // Sloped Refractory Brick Arch forcing flames up and back around the combustion chamber!
  const brickArch = new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.18, B.fireboxWidth * 0.42), mats.brickArch);
  brickArch.position.set(B.fireboxFrontX - 1.35, B.fireboxGrateY + 0.85, -B.fireboxWidth * 0.22);
  brickArch.rotation.z = -0.34;
  internalsGroup.add(brickArch);

  // ---- ANIMATED MECHANICAL COAL STOKER AUGER SCREW (Förderschnecke: Tender -> Firebox!) ----
  const stokerGroup = new THREE.Group();
  stokerGroup.position.set(-12.1, B.fireboxGrateY + 0.22, -0.32);
  const stokerTrough = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 4.2, 16, 1, true, Math.PI * 0.5, Math.PI),
    mats.castSteel
  );
  stokerTrough.rotation.z = Math.PI / 2;
  stokerGroup.add(stokerTrough);

  // Helical auger screw mesh that spins continuously proportional to coal rate!
  const augerSpinGroup = new THREE.Group();
  const augerShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 4.3, 12), mats.polishedSteel);
  augerShaft.rotation.z = Math.PI / 2;
  augerSpinGroup.add(augerShaft);

  // Build helical blade flights using Curve + TubeGeometry
  const helixPts = [];
  const turns = 11;
  for (let i = 0; i <= 110; i++) {
    const u = i / 110;
    const x = -2.05 + u * 4.1;
    const ang = u * turns * Math.PI * 2;
    helixPts.push(new THREE.Vector3(x, Math.sin(ang) * 0.135, Math.cos(ang) * 0.135));
  }
  const helixCurve = new THREE.CatmullRomCurve3(helixPts);
  const helixGeo = new THREE.TubeGeometry(helixCurve, 130, 0.026, 6, false);
  const helixMesh = new THREE.Mesh(helixGeo, mats.polishedSteel);
  augerSpinGroup.add(helixMesh);
  stokerGroup.add(augerSpinGroup);
  internalsGroup.add(stokerGroup);

  // 5b. Rear & Front Tube Sheets (Rohrwände) + Instanced Firetubes (Heizrohre) & Flue Tubes!
  for (const tx of [B.barrelRearX + 0.12, B.barrelFrontX - 0.12]) {
    const rSheet = tx < 0 ? B.barrelRearRadius - 0.12 : B.barrelFrontRadius - 0.12;
    const sheetGeo = new THREE.CylinderGeometry(rSheet, rSheet, 0.08, 28, 1, false, Math.PI * 0.5, Math.PI);
    sheetGeo.rotateZ(Math.PI / 2);
    const sheet = new THREE.Mesh(sheetGeo, mats.cutSectionSteel);
    sheet.position.set(tx, cy, 0);
    internalsGroup.add(sheet);
  }

  // Instanced horizontal firetubes spanning the entire 11.1 m boiler barrel
  const tubeLen = barrelLen - 0.30;
  const tubeGeo = new THREE.CylinderGeometry(0.042, 0.042, tubeLen, 8);
  tubeGeo.rotateZ(Math.PI / 2);
  const tubeOffsets = [];
  for (let row = -5; row <= 2; row++) {
    const ty = cy + row * 0.165 - 0.10;
    for (let col = 0; col <= 4; col++) {
      const tz = -0.14 - col * 0.19;
      const dist = Math.hypot(ty - cy, tz);
      if (dist < B.barrelFrontRadius - 0.22) {
        tubeOffsets.push([ty, tz]);
      }
    }
  }
  const firetubeInst = new THREE.InstancedMesh(tubeGeo, mats.fireTubeSteel, tubeOffsets.length);
  tubeOffsets.forEach(([ty, tz], idx) => {
    rDummy.position.set(barrelMidX, ty, tz);
    rDummy.rotation.set(0, 0, 0);
    rDummy.updateMatrix();
    firetubeInst.setMatrixAt(idx, rDummy.matrix);
  });
  firetubeInst.instanceMatrix.needsUpdate = true;
  internalsGroup.add(firetubeInst);

  // 5c. ELESCO SUPERHEATER ELEMENTS (glowing red-orange hairpin loops inside upper flue tubes!)
  const superheaterGroup = new THREE.Group();
  const shHeader = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.42, 1.35), mats.superheaterPipe);
  shHeader.position.set(B.smokeboxRearX + 0.55, cy + 0.65, -0.35);
  superheaterGroup.add(shHeader);

  for (let i = 0; i < 5; i++) {
    const sy = cy + 0.18 + (i % 3) * 0.19;
    const sz = -0.16 - Math.floor(i / 2) * 0.28;
    const loopPts = [
      new THREE.Vector3(B.smokeboxRearX + 0.55, sy + 0.04, sz),
      new THREE.Vector3(B.barrelRearX + 0.85, sy + 0.04, sz),
      new THREE.Vector3(B.barrelRearX + 0.68, sy, sz - 0.04),
      new THREE.Vector3(B.barrelRearX + 0.85, sy - 0.04, sz),
      new THREE.Vector3(B.smokeboxRearX + 0.55, sy - 0.04, sz)
    ];
    const shTube = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(loopPts), 36, 0.032, 8, false),
      mats.superheaterPipe
    );
    superheaterGroup.add(shTube);
  }
  internalsGroup.add(superheaterGroup);

  // 5d. Animated Boiling Water Surface inside Boiler Barrel (subdivided plane with wave motion!)
  const waterGeo = new THREE.PlaneGeometry(barrelLen - 0.35, B.barrelFrontRadius * 0.92, 36, 6);
  waterGeo.rotateX(-Math.PI / 2);
  const waterBaseY = new Float32Array(waterGeo.attributes.position.count);
  for (let i = 0; i < waterBaseY.length; i++) waterBaseY[i] = waterGeo.attributes.position.getY(i);
  const waterMesh = new THREE.Mesh(waterGeo, mats.boilerWater);
  waterMesh.position.set(barrelMidX, B.waterLevelY, -B.barrelFrontRadius * 0.46);
  internalsGroup.add(waterMesh);

  // Translucent front water-bath cross-section face so 216 °C water surrounding firetubes reads clearly side-on
  const waterBathH = B.waterLevelY - (cy - B.barrelFrontRadius + 0.08);
  const waterSideMat = mats.boilerWater.clone();
  waterSideMat.opacity = 0.24;
  const waterSidePlane = new THREE.Mesh(new THREE.PlaneGeometry(barrelLen - 0.35, waterBathH), waterSideMat);
  waterSidePlane.position.set(barrelMidX, B.waterLevelY - waterBathH * 0.5, -0.04);
  internalsGroup.add(waterSidePlane);

  // 5e. Steam Dome Regulator Valve & Main Dry Steam Pipe (Dampfdom -> Überhitzer -> Zylinder!)
  const regPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.92, 14), mats.brass);
  regPipe.position.set(B.steamDomeX, cy + B.barrelRearRadius + 0.08, -0.18);
  const regValveHead = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.16, 0.24, 16), mats.copper);
  regValveHead.position.set(B.steamDomeX, cy + B.barrelRearRadius + 0.45, -0.18);
  const dryPipeLen = (B.smokeboxRearX + 0.55) - B.steamDomeX;
  const dryPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.105, dryPipeLen, 14), mats.superheaterPipe);
  dryPipe.rotation.z = Math.PI / 2;
  dryPipe.position.set((B.steamDomeX + B.smokeboxRearX + 0.55) * 0.5, cy + 0.85, -0.18);
  internalsGroup.add(regPipe, regValveHead, dryPipe);

  // Superheated live-steam branch pipe dropping down from superheater header to rear cylinder manifold
  const mainDropPts = [
    new THREE.Vector3(B.smokeboxRearX + 0.48, cy + 0.60, -0.22),
    new THREE.Vector3(B.smokeboxRearX + 0.20, cy - 0.30, -0.30),
    new THREE.Vector3(2.8, 1.98, -0.28),
    new THREE.Vector3(-0.92, 1.85, 0.0)
  ];
  const mainDropPipe = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(mainDropPts), 28, 0.11, 12, false),
    mats.superheaterPipe
  );
  internalsGroup.add(mainDropPipe);

  // 5f. DOUBLE BLASTPIPE (Doppel-Blasrohr) inside Smokebox!
  // Rear blastpipe (at stackRearX = 7.35) & Front blastpipe (at stackFrontX = 8.20)
  for (const [idx, sx] of [B.stackRearX, B.stackFrontX].entries()) {
    const nozzle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.22, 1.15, 16),
      idx === 0 ? mats.castSteel : mats.copper
    );
    nozzle.position.set(sx, cy - 0.52, -0.05);
    const petticoat = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.34, 0.92, 18, 1, true),
      mats.smokeboxGraphite
    );
    petticoat.position.set(sx, cy + 0.55, -0.05);
    internalsGroup.add(nozzle, petticoat);
  }
  // Spark arrestor diaphragm baffle plate in smokebox
  const baffle = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.05, 1.10), mats.castSteel);
  baffle.position.set(B.smokeboxRearX + 0.72, cy + 0.15, -0.55);
  baffle.rotation.z = -0.55;
  internalsGroup.add(baffle);

  root.add(internalsGroup);

  // =========================================================================
  // 6. ARTICULATED BALL-JOINT & SLIP-JOINT STEAM PIPES (Live & Exhaust!)
  //    Always visible underneath boiler (and highlighted in cutaway/thermo!)
  // =========================================================================
  const articulatedPipesGroup = new THREE.Group();
  articulatedPipesGroup.userData.partId = 'ball_joint_pipes';

  function makeTelescopicPipe(radius, pipeMat, jointMat) {
    const g = new THREE.Group();
    const ballStart = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.52, 16, 14), jointMat);
    const ballEnd = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.52, 16, 14), jointMat);
    // Outer sleeve + inner sliding tube oriented along +Z (for lookAt!)
    const outerSleeve = new THREE.Mesh(new THREE.CylinderGeometry(radius * 1.16, radius * 1.16, 1.0, 14), pipeMat);
    outerSleeve.rotation.x = Math.PI / 2;
    const innerTube = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.94, radius * 0.94, 1.0, 14), jointMat);
    innerTube.rotation.x = Math.PI / 2;
    const body = new THREE.Group();
    body.add(outerSleeve, innerTube);
    g.add(ballStart, ballEnd, body);
    return { group: g, ballStart, ballEnd, body, outerSleeve, innerTube };
  }

  const liveSteamPipe = makeTelescopicPipe(0.115, mats.superheaterPipe, mats.brass);
  const exhaustSteamPipe = makeTelescopicPipe(0.145, mats.smokeboxGraphite, mats.polishedSteel);
  articulatedPipesGroup.add(liveSteamPipe.group, exhaustSteamPipe.group);
  root.add(articulatedPipesGroup);

  // =========================================================================
  // 7. DYNAMIC FIREBOX GLOW LIGHT & HEADLIGHT SPOT
  // =========================================================================
  const fireboxLight = new THREE.PointLight(0xff6b1a, 8.5, 11.5, 1.6);
  fireboxLight.position.set(fbMidX, B.fireboxGrateY + 0.55, 0.35);
  root.add(fireboxLight);

  const ashpanGlowLight = new THREE.PointLight(0xff4d00, 3.2, 5.2, 1.8);
  ashpanGlowLight.position.set(fbMidX, 0.72, 0.25);
  root.add(ashpanGlowLight);

  // =========================================================================
  // UPDATE & CUTAWAY CONTROL METHODS
  // =========================================================================
  const vStart = new THREE.Vector3();
  const vEnd = new THREE.Vector3();
  const vMid = new THREE.Vector3();

  function placeTelescopic(pipeObj, startPt, endPt) {
    vStart.set(startPt.x, startPt.y, startPt.z);
    vEnd.set(endPt.x, endPt.y, endPt.z);
    const len = vStart.distanceTo(vEnd);
    pipeObj.ballStart.position.copy(vStart);
    pipeObj.ballEnd.position.copy(vEnd);

    vMid.addVectors(vStart, vEnd).multiplyScalar(0.5);
    pipeObj.body.position.copy(vStart);
    pipeObj.body.lookAt(vEnd);

    // Outer sleeve covers first 60% from start, inner sliding tube extends smoothly to end!
    const sleeveLen = len * 0.58;
    const innerLen = len * 0.52;
    pipeObj.outerSleeve.scale.set(1, sleeveLen, 1);
    pipeObj.outerSleeve.position.set(0, 0, sleeveLen * 0.5);
    pipeObj.innerTube.scale.set(1, innerLen, 1);
    pipeObj.innerTube.position.set(0, 0, len - innerLen * 0.5);
  }

  let boilerCutawayActive = false;
  let xrayActive = false;
  const origMaterials = new Map();
  for (const m of xrayTargets) origMaterials.set(m, m.material);

  function setBoilerCutaway(enabled) {
    boilerCutawayActive = enabled;
    for (const obj of exteriorRemovable) obj.visible = !enabled;
    for (const obj of cutawayOnly) obj.visible = enabled || xrayActive;
  }

  function setXRay(enabled) {
    xrayActive = enabled;
    for (const m of xrayTargets) {
      m.material = enabled ? mats.xrayShell : origMaterials.get(m);
    }
    for (const obj of cutawayOnly) obj.visible = boilerCutawayActive || enabled;
  }

  // Initialize to exterior mode cleanly
  setBoilerCutaway(false);

  function update(dt, elapsed, telemetry, articulation, thermoOverlay) {
    // Update articulated ball-joint live & exhaust pipes every frame!
    placeTelescopic(liveSteamPipe, articulation.livePipe.start, articulation.livePipe.end);
    placeTelescopic(exhaustSteamPipe, articulation.exhaustPipe.start, articulation.exhaustPipe.end);

    // Spin mechanical coal stoker auger screw proportional to firing rate!
    augerSpinGroup.rotation.x += dt * telemetry.stokerSpeed * 2.6;

    // Flickering firebox embers & dynamic warm light proportional to draft-fanned fire intensity
    const flicker =
      0.86 +
      0.14 * Math.sin(elapsed * 19.3) * Math.cos(elapsed * 11.7) +
      0.06 * Math.sin(elapsed * 37.1);
    const fire = telemetry.fireIntensity * flicker;
    mats.coalBed.emissiveIntensity = 1.4 + fire * 2.8;
    fireboxLight.intensity = (boilerCutawayActive || xrayActive ? 14.0 : 4.0) * fire;
    ashpanGlowLight.intensity = 2.6 * fire;

    // Superheater glow intensity boosts with steam temp & thermo overlay
    mats.superheaterPipe.emissiveIntensity = thermoOverlay ? 1.55 : 0.35 + 0.45 * fire;

    // Gently ripple water surface inside cutaway boiler!
    if (internalsGroup.visible) {
      const pos = waterGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const wave =
          Math.sin(x * 1.45 + elapsed * 3.8) * 0.022 +
          Math.cos(z * 3.2 - elapsed * 2.9) * 0.014;
        pos.setY(i, waterBaseY[i] + wave * (0.5 + 0.7 * telemetry.fireIntensity));
      }
      pos.needsUpdate = true;
    }
  }

  return {
    root,
    setBoilerCutaway,
    setXRay,
    update,
    headlightCone
  };
}
