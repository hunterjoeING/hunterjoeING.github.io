// Procedural 3D Builder for UP Big Boy Chassis, Dynamic Track, Boxpok Wheels,
// Cutaway 603 mm Cylinders, Piston Valves & Dual Walschaerts/Heusinger Valve Gear.

import * as THREE from 'three';
import { BIG_BOY_SPECS, RADIUS_ROD_LENGTH } from './specs.js';

const { wheels, cylinder, valveGear, zPlanes, layout, track } = BIG_BOY_SPECS;

/**
 * Helper to orient a horizontal/2D bar mesh in the XY plane from (x1, y1) to (x2, y2) at fixed Z.
 * The bar geometry must be centered along local X from -0.5 to +0.5 (unit length) or exact length.
 */
function placeRodBetween(mesh, x1, y1, x2, y2, z, fixedLen = null) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  mesh.position.set((x1 + x2) * 0.5, (y1 + y2) * 0.5, z);
  mesh.rotation.set(0, 0, Math.atan2(dy, dx));
  if (fixedLen === null) {
    mesh.scale.set(Math.max(0.001, len), 1, 1);
  }
}

/**
 * Create a forged fluted I-beam connecting/coupling rod of unit length (scaled along X) or fixed length.
 */
function createFlutedRod(length, height, thick, mats, withEndBosses = true) {
  const group = new THREE.Group();
  // Main outer web
  const webGeo = new THREE.BoxGeometry(length, height, thick);
  const web = new THREE.Mesh(webGeo, mats.polishedSteel);
  web.castShadow = true;
  web.receiveShadow = true;
  group.add(web);

  // Machined dark I-beam recess flutes on both faces
  const fluteLen = Math.max(0.1, length - height * 1.4);
  const fluteH = height * 0.44;
  const fluteGeo = new THREE.BoxGeometry(fluteLen, fluteH, thick + 0.004);
  const flute = new THREE.Mesh(fluteGeo, mats.rodFluteDark);
  group.add(flute);

  if (withEndBosses) {
    const bossGeo = new THREE.CylinderGeometry(height * 0.72, height * 0.72, thick * 1.32, 16);
    bossGeo.rotateX(Math.PI / 2);
    const b1 = new THREE.Mesh(bossGeo, mats.polishedSteel);
    b1.position.x = -length * 0.5;
    const b2 = new THREE.Mesh(bossGeo, mats.polishedSteel);
    b2.position.x = length * 0.5;
    group.add(b1, b2);
  }
  return group;
}

/**
 * Create a single authentic 68-inch Boxpok Driving Wheel (ExtrudeGeometry with oval Boxpok cutouts,
 * heavy cast counterweight opposite crankpin, machined steel tire, flange & optional crisp whitewall!).
 */
function createBoxpokWheel(radius, isMainDriver, sideSign, mats) {
  const group = new THREE.Group();
  const tireThick = 0.072;
  const hubR = radius - tireThick;
  const width = wheels.driverTireWidth;

  // 1. Machined steel tire + inner rail flange
  const tireShape = new THREE.Shape();
  tireShape.absarc(0, 0, radius, 0, Math.PI * 2, false);
  const tireHole = new THREE.Path();
  tireHole.absarc(0, 0, hubR - 0.01, 0, Math.PI * 2, true);
  tireShape.holes.push(tireHole);
  const tireGeo = new THREE.ExtrudeGeometry(tireShape, {
    depth: width,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
    curveSegments: 36
  });
  tireGeo.translate(0, 0, -width * 0.5);
  const tire = new THREE.Mesh(tireGeo, mats.wheelTireSteel);
  tire.castShadow = true;
  tire.receiveShadow = true;
  group.add(tire);

  // Inner flange (toward track centerline: -sideSign)
  const flangeGeo = new THREE.CylinderGeometry(radius + wheels.driverFlangeHeight, radius + 0.004, 0.028, 36);
  flangeGeo.rotateX(Math.PI / 2);
  const flange = new THREE.Mesh(flangeGeo, mats.wheelTireSteel);
  flange.position.z = -sideSign * (width * 0.5 - 0.014);
  group.add(flange);

  // Classic UP #4014 crisp narrow whitewall tire edge ring (~24 mm)
  const wwGeo = new THREE.RingGeometry(radius - 0.032, radius - 0.008, 36);
  const ww = new THREE.Mesh(wwGeo, mats.wheelWhitewall);
  ww.position.z = sideSign * (width * 0.5 + 0.009);
  if (sideSign < 0) ww.rotation.y = Math.PI;
  ww.userData.isWhitewall = true;
  group.add(ww);

  // 2. Boxpok cast-steel center disc with authentic oval/crescent lightening pockets
  const discShape = new THREE.Shape();
  discShape.absarc(0, 0, hubR + 0.005, 0, Math.PI * 2, false);

  // Cut 6 signature Boxpok oval pockets around the upper/side perimeter (leaving counterweight solid at -X!)
  const pocketAngles = [-0.55, 0.0, 0.55, 1.12, -1.12, 1.65, -1.65];
  for (const ang of pocketAngles) {
    // Skip pocket directly on the crankpin (+X, ang === 0)
    if (Math.abs(ang) < 0.05) continue;
    const pR = hubR * 0.62;
    const cx = Math.cos(ang) * pR;
    const cy = Math.sin(ang) * pR;
    const hole = new THREE.Path();
    hole.absellipse(cx, cy, 0.105, 0.135, 0, Math.PI * 2, true, ang);
    discShape.holes.push(hole);
  }
  const discDepth = width * 0.68;
  const discGeo = new THREE.ExtrudeGeometry(discShape, {
    depth: discDepth,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.01,
    bevelSegments: 2,
    curveSegments: 28
  });
  discGeo.translate(0, 0, -discDepth * 0.5);
  const disc = new THREE.Mesh(discGeo, mats.castSteel);
  disc.castShadow = true;
  disc.receiveShadow = true;
  group.add(disc);

  // 3. Heavy crescent counterweight opposite crankpin (-X side!)
  const cwShape = new THREE.Shape();
  const cwArc = isMainDriver ? 1.18 : 0.92;
  cwShape.absarc(0, 0, hubR - 0.02, Math.PI - cwArc, Math.PI + cwArc, false);
  cwShape.absarc(0, 0, hubR * 0.44, Math.PI + cwArc, Math.PI - cwArc, true);
  cwShape.closePath();
  const cwGeo = new THREE.ExtrudeGeometry(cwShape, {
    depth: width * 0.84,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 2,
    curveSegments: 20
  });
  cwGeo.translate(0, 0, -width * 0.42);
  const cw = new THREE.Mesh(cwGeo, mats.castSteel);
  cw.castShadow = true;
  group.add(cw);

  // 4. Central axle hub boss & crankpin boss at (+crankRadius, 0)
  const axleHubGeo = new THREE.CylinderGeometry(0.19, 0.21, width * 1.12, 20);
  axleHubGeo.rotateX(Math.PI / 2);
  const axleHub = new THREE.Mesh(axleHubGeo, mats.castSteel);
  group.add(axleHub);

  const hubCapGeo = new THREE.CylinderGeometry(0.105, 0.105, width * 1.24, 16);
  hubCapGeo.rotateX(Math.PI / 2);
  group.add(new THREE.Mesh(hubCapGeo, mats.polishedSteel));

  // Crankpin boss at (+R_c, 0)
  const pinBossGeo = new THREE.CylinderGeometry(0.145, 0.16, width * 1.12, 18);
  pinBossGeo.rotateX(Math.PI / 2);
  const pinBoss = new THREE.Mesh(pinBossGeo, mats.castSteel);
  pinBoss.position.set(cylinder.crankRadius, 0, 0);
  group.add(pinBoss);

  // Polished steel crankpin extending outward to coupling/main rod Z-plane
  const pinTargetZ = isMainDriver ? zPlanes.eccentricCrankInner + 0.03 : zPlanes.couplingRod + 0.04;
  const pinLen = pinTargetZ - zPlanes.wheelCenter + 0.05;
  const pinGeo = new THREE.CylinderGeometry(isMainDriver ? 0.078 : 0.064, isMainDriver ? 0.078 : 0.064, pinLen, 16);
  pinGeo.rotateX(Math.PI / 2);
  const pin = new THREE.Mesh(pinGeo, mats.polishedSteel);
  pin.position.set(cylinder.crankRadius, 0, sideSign * (pinLen * 0.5 - 0.03));
  group.add(pin);

  return group;
}

/**
 * Create a single solid spoked/rolled bogie wheel for leading (36") or trailing (42") trucks.
 */
function createTruckWheelset(radius, mats) {
  const group = new THREE.Group();
  const axleGeo = new THREE.CylinderGeometry(0.085, 0.085, zPlanes.wheelCenter * 2.15, 16);
  axleGeo.rotateX(Math.PI / 2);
  group.add(new THREE.Mesh(axleGeo, mats.castSteelDark));

  for (const side of [1, -1]) {
    const w = new THREE.Group();
    const tireGeo = new THREE.CylinderGeometry(radius, radius, 0.125, 28);
    tireGeo.rotateX(Math.PI / 2);
    w.add(new THREE.Mesh(tireGeo, mats.wheelTireSteel));

    const centerGeo = new THREE.CylinderGeometry(radius - 0.055, radius - 0.055, 0.132, 24);
    centerGeo.rotateX(Math.PI / 2);
    w.add(new THREE.Mesh(centerGeo, mats.castSteel));

    const flangeGeo = new THREE.CylinderGeometry(radius + 0.028, radius + 0.004, 0.025, 28);
    flangeGeo.rotateX(Math.PI / 2);
    const fl = new THREE.Mesh(flangeGeo, mats.wheelTireSteel);
    fl.position.z = -side * 0.055;
    w.add(fl);

    const wwGeo = new THREE.RingGeometry(radius - 0.055, radius - 0.008, 28);
    const ww = new THREE.Mesh(wwGeo, mats.wheelWhitewall);
    ww.position.z = side * 0.068;
    if (side < 0) ww.rotation.y = Math.PI;
    ww.userData.isWhitewall = true;
    w.add(ww);

    w.position.z = side * zPlanes.wheelCenter;
    group.add(w);
  }
  return group;
}

/**
 * Build a 2-axle Leading or Trailing Truck with cast bogie frame, axleboxes & coil springs.
 */
export function buildBogieTruck(radius, axleOffsets, mats, partId) {
  const group = new THREE.Group();
  group.userData.partId = partId;
  const wheelsets = [];

  for (const ox of axleOffsets) {
    const ws = createTruckWheelset(radius, mats);
    ws.position.set(ox, radius, 0);
    group.add(ws);
    wheelsets.push(ws);
  }

  const span = Math.abs(axleOffsets[0] - axleOffsets[1]) + 0.72;
  for (const side of [1, -1]) {
    const sideFrame = new THREE.Mesh(
      new THREE.BoxGeometry(span, 0.24, 0.095),
      mats.castSteel
    );
    sideFrame.position.set(0, radius + 0.06, side * (zPlanes.wheelCenter + 0.16));
    sideFrame.castShadow = true;
    group.add(sideFrame);

    for (const ox of axleOffsets) {
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.30, 0.15), mats.castSteelDark);
      box.position.set(ox, radius, side * (zPlanes.wheelCenter + 0.17));
      group.add(box);
      const spring = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.22, 12), mats.castSteelDark);
      spring.position.set(ox, radius + 0.22, side * (zPlanes.wheelCenter + 0.16));
      group.add(spring);
    }
  }

  // Central bolster
  const bolster = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.22, zPlanes.wheelCenter * 2.2), mats.castSteelDark);
  bolster.position.set(0, radius + 0.16, 0);
  group.add(bolster);

  return { group, wheelsets, radius };
}

/**
 * Build a High-Pressure 603 mm Cylinder + Upper 305 mm Piston-Valve Steam Chest Assembly
 * with clean switchable Longitudinal Cutaway on the Right (+Z) side!
 */
function buildCylinderAssembly(cylX, sideSign, mats, isCutawayTarget, engineId) {
  const group = new THREE.Group();
  group.position.set(cylX, 0, 0);
  group.userData.partId = engineId === 'front' ? 'cylinders_front' : 'cylinders_rear';

  const zCyl = sideSign * zPlanes.cylinderCenter;
  const zVal = sideSign * zPlanes.steamChestCenter;
  const rOut = cylinder.boreRadius + 0.095;
  const rIn = cylinder.boreRadius;
  const len = cylinder.barrelLength;
  const innerLen = cylinder.innerLength;

  // Saddle connection from track centerline out to cylinder
  const saddle = new THREE.Mesh(
    new THREE.BoxGeometry(len * 0.92, 1.05, Math.abs(zCyl) * 0.95),
    mats.castSteel
  );
  saddle.position.set(0, cylinder.centerY + 0.28, sideSign * Math.abs(zCyl) * 0.45);
  saddle.castShadow = true;
  group.add(saddle);

  // ---- OUTER SOLID SHELL (hidden when cylinder cutaway is active on right side!) ----
  const outerShellGroup = new THREE.Group();

  const mainShellGeo = new THREE.CylinderGeometry(rOut, rOut, len, 28);
  mainShellGeo.rotateZ(Math.PI / 2);
  const mainShell = new THREE.Mesh(mainShellGeo, mats.boilerBlack);
  mainShell.position.set(0, cylinder.centerY, zCyl);
  mainShell.castShadow = true;
  mainShell.receiveShadow = true;
  outerShellGroup.add(mainShell);

  // Cylinder front & rear end covers with bolt ring
  for (const endSign of [1, -1]) {
    const capGeo = new THREE.CylinderGeometry(rOut * 0.96, rOut * 1.01, 0.075, 24);
    capGeo.rotateZ(Math.PI / 2);
    const cap = new THREE.Mesh(capGeo, mats.smokeboxGraphite);
    cap.position.set(endSign * (len * 0.5 + 0.02), cylinder.centerY, zCyl);
    outerShellGroup.add(cap);
  }

  // Upper piston-valve steam chest outer casing
  const vOut = cylinder.valveRadius + 0.068;
  const vShellGeo = new THREE.CylinderGeometry(vOut, vOut, cylinder.valveChestLength, 24);
  vShellGeo.rotateZ(Math.PI / 2);
  const vShell = new THREE.Mesh(vShellGeo, mats.boilerBlack);
  vShell.position.set(0, cylinder.steamChestY, zVal);
  vShell.castShadow = true;
  outerShellGroup.add(vShell);

  for (const endSign of [1, -1]) {
    const vCapGeo = new THREE.CylinderGeometry(vOut * 0.94, vOut * 0.98, 0.06, 20);
    vCapGeo.rotateZ(Math.PI / 2);
    const vCap = new THREE.Mesh(vCapGeo, mats.smokeboxGraphite);
    vCap.position.set(endSign * (cylinder.valveChestLength * 0.5 + 0.02), cylinder.steamChestY, zVal);
    outerShellGroup.add(vCap);
  }

  // Steam passage web connecting steam chest to main cylinder
  const neck = new THREE.Mesh(
    new THREE.BoxGeometry(len * 0.84, cylinder.steamChestY - cylinder.centerY, vOut * 1.55),
    mats.castSteel
  );
  neck.position.set(0, (cylinder.centerY + cylinder.steamChestY) * 0.5, (zCyl + zVal) * 0.5);
  outerShellGroup.add(neck);

  // Cylinder cocks (underneath)
  const cockGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.14, 10);
  for (const ex of [-0.32, 0.32]) {
    const cock = new THREE.Mesh(cockGeo, mats.brass);
    cock.position.set(ex, cylinder.centerY - rOut - 0.05, zCyl);
    group.add(cock);
  }

  group.add(outerShellGroup);

  // ---- CUTAWAY INTERIOR (Only built in high detail on Right +Z side!) ----
  let cutawayRefs = null;
  if (isCutawayTarget) {
    const cutGroup = new THREE.Group();
    cutGroup.visible = false;

    // Half-cylinder outer casing (rear half, z < zCyl, open facing +Z camera!)
    // CylinderGeometry around Y, then rotateZ(PI/2): local +Y -> -X, local +X -> +Y, local +Z -> +Z
    // thetaStart = PI/2, thetaLength = PI covers -Z hemisphere!
    const halfMainGeo = new THREE.CylinderGeometry(rOut, rOut, len, 28, 1, false, Math.PI * 0.5, Math.PI);
    halfMainGeo.rotateZ(Math.PI / 2);
    const halfMain = new THREE.Mesh(halfMainGeo, mats.boilerBlack);
    halfMain.position.set(0, cylinder.centerY, zCyl);
    cutGroup.add(halfMain);

    // Honed cylinder liner (half-cylinder)
    const halfLinerGeo = new THREE.CylinderGeometry(rIn, rIn, innerLen, 28, 1, true, Math.PI * 0.5, Math.PI);
    halfLinerGeo.rotateZ(Math.PI / 2);
    const halfLiner = new THREE.Mesh(halfLinerGeo, mats.cylinderLiner);
    halfLiner.position.set(0, cylinder.centerY, zCyl);
    cutGroup.add(halfLiner);

    // Distinct red machined cut-section walls (top & bottom longitudinal cut bars + end walls)
    const wallT = rOut - rIn;
    const topWall = new THREE.Mesh(new THREE.BoxGeometry(len, wallT, 0.014), mats.cutSectionRed);
    topWall.position.set(0, cylinder.centerY + rIn + wallT * 0.5, zCyl + 0.002);
    const botWall = new THREE.Mesh(new THREE.BoxGeometry(len, wallT, 0.014), mats.cutSectionRed);
    botWall.position.set(0, cylinder.centerY - rIn - wallT * 0.5, zCyl + 0.002);
    const frontWall = new THREE.Mesh(new THREE.BoxGeometry((len - innerLen) * 0.5, rOut * 2, 0.014), mats.cutSectionRed);
    frontWall.position.set((len + innerLen) * 0.25, cylinder.centerY, zCyl + 0.002);
    const rearWall = new THREE.Mesh(new THREE.BoxGeometry((len - innerLen) * 0.5, rOut * 2, 0.014), mats.cutSectionRed);
    rearWall.position.set(-(len + innerLen) * 0.25, cylinder.centerY, zCyl + 0.002);
    cutGroup.add(topWall, botWall, frontWall, rearWall);

    // Upper steam chest cutaway (half-cylinder)
    const halfValveOuterGeo = new THREE.CylinderGeometry(vOut, vOut, cylinder.valveChestLength, 24, 1, false, Math.PI * 0.5, Math.PI);
    halfValveOuterGeo.rotateZ(Math.PI / 2);
    const halfValveOuter = new THREE.Mesh(halfValveOuterGeo, mats.boilerBlack);
    halfValveOuter.position.set(0, cylinder.steamChestY, zVal);
    cutGroup.add(halfValveOuter);

    const halfValveLinerGeo = new THREE.CylinderGeometry(cylinder.valveRadius, cylinder.valveRadius, cylinder.valveChestLength - 0.14, 24, 1, true, Math.PI * 0.5, Math.PI);
    halfValveLinerGeo.rotateZ(Math.PI / 2);
    const halfValveLiner = new THREE.Mesh(halfValveLinerGeo, mats.cylinderLiner);
    halfValveLiner.position.set(0, cylinder.steamChestY, zVal);
    cutGroup.add(halfValveLiner);

    const vWallT = vOut - cylinder.valveRadius;
    const vTopWall = new THREE.Mesh(new THREE.BoxGeometry(cylinder.valveChestLength, vWallT, 0.012), mats.cutSectionRed);
    vTopWall.position.set(0, cylinder.steamChestY + cylinder.valveRadius + vWallT * 0.5, zVal + 0.002);
    const vBotWall = new THREE.Mesh(new THREE.BoxGeometry(cylinder.valveChestLength, vWallT, 0.012), mats.cutSectionRed);
    vBotWall.position.set(0, cylinder.steamChestY - cylinder.valveRadius - vWallT * 0.5, zVal + 0.002);
    cutGroup.add(vTopWall, vBotWall);

    // Live-steam center chamber glow inside steam chest (between the two spools!)
    const centerLiveMat = mats.liveSteamGlow.clone();
    const centerLiveMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(cylinder.valveRadius * 0.88, cylinder.valveRadius * 0.88, 0.34, 16, 1, false, Math.PI * 0.5, Math.PI),
      centerLiveMat
    );
    centerLiveMesh.rotation.z = Math.PI / 2;
    centerLiveMesh.position.set(0, cylinder.steamChestY, zVal - 0.01);
    cutGroup.add(centerLiveMesh);

    // Front (+X) & Rear (-X) steam transfer ports connecting steam chest to cylinder ends!
    const frontPortMat = mats.liveSteamGlow.clone();
    const rearPortMat = mats.exhaustSteamGlow.clone();
    const portH = cylinder.steamChestY - cylinder.centerY - rIn - cylinder.valveRadius + 0.12;
    const portY = (cylinder.centerY + rIn + cylinder.steamChestY - cylinder.valveRadius) * 0.5;

    const frontPortMesh = new THREE.Mesh(new THREE.BoxGeometry(0.085, portH, 0.10), frontPortMat);
    frontPortMesh.position.set(cylinder.portHalfSpacing, portY, (zCyl + zVal) * 0.5);
    const rearPortMesh = new THREE.Mesh(new THREE.BoxGeometry(0.085, portH, 0.10), rearPortMat);
    rearPortMesh.position.set(-cylinder.portHalfSpacing, portY, (zCyl + zVal) * 0.5);
    cutGroup.add(frontPortMesh, rearPortMesh);

    // ---- ANIMATED 603 mm PISTON + 3 BRASS PISTON RINGS ----
    const pistonGroup = new THREE.Group();
    const pBodyGeo = new THREE.CylinderGeometry(rIn * 0.96, rIn * 0.96, cylinder.pistonThickness, 24);
    pBodyGeo.rotateZ(Math.PI / 2);
    const pBody = new THREE.Mesh(pBodyGeo, mats.pistonSteel);
    pistonGroup.add(pBody);
    for (const rx of [-0.042, 0, 0.042]) {
      const ringGeo = new THREE.TorusGeometry(rIn * 0.965, 0.0085, 8, 28);
      ringGeo.rotateY(Math.PI / 2);
      const ring = new THREE.Mesh(ringGeo, mats.pistonRingBrass);
      ring.position.x = rx;
      pistonGroup.add(ring);
    }
    pistonGroup.position.set(0, cylinder.centerY, zCyl);
    cutGroup.add(pistonGroup);

    // Dynamic front & rear working-steam volumes inside cylinder (colored live by pressure!)
    const frontChamberMat = mats.liveSteamGlow.clone();
    const rearChamberMat = mats.exhaustSteamGlow.clone();
    const chamberGeo = new THREE.CylinderGeometry(rIn * 0.92, rIn * 0.92, 1.0, 20);
    chamberGeo.rotateZ(Math.PI / 2);
    const frontChamber = new THREE.Mesh(chamberGeo, frontChamberMat);
    frontChamber.position.set(0.2, cylinder.centerY, zCyl - 0.02);
    const rearChamber = new THREE.Mesh(chamberGeo, rearChamberMat);
    rearChamber.position.set(-0.2, cylinder.centerY, zCyl - 0.02);
    cutGroup.add(frontChamber, rearChamber);

    // ---- ANIMATED INSIDE-ADMISSION PISTON VALVE (DUAL SPOOLS) ----
    const valveGroup = new THREE.Group();
    const vStemGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.72, 12);
    vStemGeo.rotateZ(Math.PI / 2);
    valveGroup.add(new THREE.Mesh(vStemGeo, mats.polishedSteel));

    const spoolGeo = new THREE.CylinderGeometry(cylinder.valveRadius * 0.94, cylinder.valveRadius * 0.94, cylinder.valveSpoolWidth, 20);
    spoolGeo.rotateZ(Math.PI / 2);
    for (const sx of [-cylinder.valveSpoolCenterHalf, cylinder.valveSpoolCenterHalf]) {
      const sp = new THREE.Mesh(spoolGeo, mats.pistonSteel);
      sp.position.x = sx;
      valveGroup.add(sp);
      for (const ro of [-0.055, 0.055]) {
        const vr = new THREE.Mesh(new THREE.TorusGeometry(cylinder.valveRadius * 0.945, 0.006, 8, 22), mats.pistonRingBrass);
        vr.rotation.y = Math.PI / 2;
        vr.position.x = sx + ro;
        valveGroup.add(vr);
      }
    }
    valveGroup.position.set(0, cylinder.steamChestY, zVal);
    cutGroup.add(valveGroup);

    group.add(cutGroup);
    cutawayRefs = {
      outerShellGroup,
      cutGroup,
      pistonGroup,
      valveGroup,
      frontChamber,
      rearChamber,
      frontChamberMat,
      rearChamberMat,
      frontPortMat,
      rearPortMat,
      centerLiveMat,
      innerHalfLen: innerLen * 0.5,
      pistonHalfThick: cylinder.pistonThickness * 0.5
    };
  }

  return { group, outerShellGroup, cutawayRefs };
}

/**
 * Build one complete 4-Axle Engine Unit (Front or Rear) including:
 * - Heavy cast steel bar frame, suspension springs, motion brackets, guide bars
 * - 4 Boxpok driving wheelsets (8 wheels)
 * - 2 identical 603 mm cylinders + piston-valve chests (right side cutaway-capable)
 * - Complete Left & Right coupling rods, main rods, crossheads & Walschaerts valve gears
 */
export function buildEngineUnit(engineSpec, mats, pivotOriginX = 0) {
  const root = new THREE.Group();
  root.position.set(pivotOriginX, 0, 0);
  // All child coordinates are expressed in straight-track world X minus pivotOriginX!
  const toLocalX = (wx) => wx - pivotOriginX;

  const cylLocalX = toLocalX(engineSpec.cylinderX);
  const driverLocalXs = engineSpec.driverXs.map(toLocalX);
  const mainLocalX = driverLocalXs[engineSpec.mainAxleIndex];
  const yAxle = wheels.driverRadius;

  // 1. Heavy Cast Bar Frame & Leaf/Coil Suspension Rigging
  const frameFrontX = cylLocalX + 0.65;
  const frameRearX = driverLocalXs[3] - 0.95;
  const frameLen = frameFrontX - frameRearX;
  const frameMidX = (frameFrontX + frameRearX) * 0.5;

  for (const side of [1, -1]) {
    const beam = new THREE.Mesh(
      new THREE.BoxGeometry(frameLen, 0.34, zPlanes.frameThick),
      mats.castSteelDark
    );
    beam.position.set(frameMidX, yAxle + 0.18, side * zPlanes.frameHalf);
    beam.castShadow = true;
    beam.receiveShadow = true;
    root.add(beam);

    // Leaf & coil suspension springs above every driving axle
    for (const ax of driverLocalXs) {
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.11, 0.11), mats.castSteel);
      leaf.position.set(ax, yAxle + 0.52, side * zPlanes.frameHalf);
      root.add(leaf);
      const hanger = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.24, 8), mats.castSteelDark);
      hanger.position.set(ax + 0.42, yAxle + 0.38, side * zPlanes.frameHalf);
      root.add(hanger);
      // Brake shoe behind each driver
      const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.36, 0.13), mats.castSteelDark);
      shoe.position.set(ax - wheels.driverRadius - 0.04, yAxle - 0.06, side * zPlanes.wheelCenter);
      root.add(shoe);
    }
  }

  // Frame cross-ties
  for (let i = 0; i < 3; i++) {
    const tx = (driverLocalXs[i] + driverLocalXs[i + 1]) * 0.5;
    const cross = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, zPlanes.frameHalf * 2), mats.castSteelDark);
    cross.position.set(tx, yAxle + 0.20, 0);
    root.add(cross);
  }

  // 2. Four 68-inch Boxpok Driving Wheelsets (with 90° left-right quartering baked into each axle!)
  const wheelsets = [];
  for (let i = 0; i < 4; i++) {
    const axleGroup = new THREE.Group();
    axleGroup.position.set(driverLocalXs[i], yAxle, 0);
    axleGroup.userData.partId = 'boxpok_drivers';

    const axleShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.145, 0.145, zPlanes.wheelCenter * 2.05, 18),
      mats.castSteelDark
    );
    axleShaft.rotation.x = Math.PI / 2;
    axleGroup.add(axleShaft);

    const isMain = i === engineSpec.mainAxleIndex;
    const rightWheel = createBoxpokWheel(wheels.driverRadius, isMain, +1, mats);
    rightWheel.position.z = zPlanes.wheelCenter;
    axleGroup.add(rightWheel);

    const leftWheel = createBoxpokWheel(wheels.driverRadius, isMain, -1, mats);
    leftWheel.position.z = -zPlanes.wheelCenter;
    // Left crank leads Right crank by +90° (theta_L = theta_R + pi/2 -> rotZ = -theta_R - pi/2)
    leftWheel.rotation.z = -Math.PI / 2;
    axleGroup.add(leftWheel);

    root.add(axleGroup);
    wheelsets.push(axleGroup);
  }

  // 3. Left & Right 603 mm High-Pressure Cylinders + Piston-Valve Chests
  const rightCyl = buildCylinderAssembly(cylLocalX, +1, mats, true, engineSpec.id);
  const leftCyl = buildCylinderAssembly(cylLocalX, -1, mats, false, engineSpec.id);
  root.add(rightCyl.group, leftCyl.group);

  // 4. Complete Driving Rods & Walschaerts/Heusinger Valve Gear for BOTH sides!
  const gearSides = {};
  for (const sideName of ['right', 'left']) {
    const s = sideName === 'right' ? 1 : -1;
    const gGroup = new THREE.Group();
    gGroup.userData.partId = 'walschaerts_gear';

    // Slidebars (Gleitbahnen) & Motion Bracket supporting expansion link trunnion
    const chMidLocalX = mainLocalX + valveGear.mainRodLength;
    const guideLen = cylinder.stroke + 0.56;
    const upperGuide = new THREE.Mesh(new THREE.BoxGeometry(guideLen, 0.065, 0.085), mats.polishedSteel);
    upperGuide.position.set(chMidLocalX, yAxle + 0.165, s * zPlanes.mainRod);
    const lowerGuide = new THREE.Mesh(new THREE.BoxGeometry(guideLen, 0.055, 0.085), mats.polishedSteel);
    lowerGuide.position.set(chMidLocalX, yAxle - 0.165, s * zPlanes.mainRod);
    gGroup.add(upperGuide, lowerGuide);

    // Motion bracket supporting the expansion link trunnion & guide bar rear end
    const linkPivotLocalX = mainLocalX + valveGear.linkPivotDx;
    const linkPivotY = yAxle + valveGear.linkPivotDy;
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.92, 0.14), mats.castSteel);
    bracket.position.set(linkPivotLocalX, linkPivotY + 0.18, s * (zPlanes.expansionLink - 0.14));
    gGroup.add(bracket);

    // Trunnion pin
    const trunnionGeo = new THREE.CylinderGeometry(0.048, 0.048, 0.24, 14);
    trunnionGeo.rotateX(Math.PI / 2);
    const trunnion = new THREE.Mesh(trunnionGeo, mats.brass);
    trunnion.position.set(linkPivotLocalX, linkPivotY, s * (zPlanes.expansionLink - 0.03));
    gGroup.add(trunnion);

    // 4-Axle Coupling Rod (Kuppelstange spanning all 4 driving axles!)
    const couplingSpan = driverLocalXs[0] - driverLocalXs[3];
    const couplingRod = createFlutedRod(couplingSpan, 0.125, zPlanes.couplingRodThick, mats, true);
    // Add intermediate axle pin bosses along the coupling rod
    for (let i = 1; i <= 2; i++) {
      const bossGeo = new THREE.CylinderGeometry(0.095, 0.095, zPlanes.couplingRodThick * 1.35, 16);
      bossGeo.rotateX(Math.PI / 2);
      const b = new THREE.Mesh(bossGeo, mats.polishedSteel);
      b.position.x = driverLocalXs[i] - (driverLocalXs[0] + driverLocalXs[3]) * 0.5;
      couplingRod.add(b);
    }
    gGroup.add(couplingRod);

    // Main Connecting Rod (Treibstange: Main Crankpin -> Crosshead)
    const mainRod = createFlutedRod(valveGear.mainRodLength, 0.155, zPlanes.mainRodThick, mats, true);
    gGroup.add(mainRod);

    // Crosshead (Alligator / Multiple-Bearing Crosshead) + Drop Arm + Piston Rod
    const crosshead = new THREE.Group();
    const chBody = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 0.13), mats.polishedSteel);
    chBody.castShadow = true;
    const chPin = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.18, 14), mats.brass);
    chPin.rotation.x = Math.PI / 2;
    const dropArm = new THREE.Mesh(new THREE.BoxGeometry(0.085, Math.abs(valveGear.unionLinkDropDy) + 0.08, 0.05), mats.polishedSteel);
    dropArm.position.set(0, valveGear.unionLinkDropDy * 0.5, s * (zPlanes.combinationLever - zPlanes.mainRod));
    crosshead.add(chBody, chPin, dropArm);
    gGroup.add(crosshead);

    // Piston Rod (Crosshead -> Piston inside cylinder)
    const pistonRodLen = cylLocalX - chMidLocalX;
    const pistonRodGeo = new THREE.CylinderGeometry(cylinder.pistonRodRadius, cylinder.pistonRodRadius, pistonRodLen, 14);
    pistonRodGeo.rotateZ(Math.PI / 2);
    const pistonRod = new THREE.Mesh(pistonRodGeo, mats.polishedSteel);
    gGroup.add(pistonRod);

    // Eccentric Crank (Gegenkurbel) – Main Pin -> Eccentric Pin
    const eccCrank = createFlutedRod(1.0, 0.072, 0.042, mats, true);
    gGroup.add(eccCrank);

    // Eccentric Rod (Schwingenstange) – Eccentric Pin -> Expansion Link Tail
    const eccRod = createFlutedRod(1.0, 0.058, 0.032, mats, true);
    gGroup.add(eccRod);

    // Curved Expansion Link (Schwinge / Kulisse) rotating around linkPivot
    const expLink = new THREE.Group();
    const slotHalf = valveGear.linkSlotHalfSpan + 0.055;
    // Build curved slotted link shape matching RADIUS_ROD_LENGTH
    const linkOuter = new THREE.Shape();
    const segs = 12;
    const halfW = 0.055;
    for (let i = 0; i <= segs; i++) {
      const sy = -slotHalf + (i / segs) * (2 * slotHalf);
      const sag = RADIUS_ROD_LENGTH - Math.sqrt(Math.max(1e-4, RADIUS_ROD_LENGTH * RADIUS_ROD_LENGTH - sy * sy));
      const lx = -sag - halfW;
      if (i === 0) linkOuter.moveTo(lx, sy);
      else linkOuter.lineTo(lx, sy);
    }
    for (let i = segs; i >= 0; i--) {
      const sy = -slotHalf + (i / segs) * (2 * slotHalf);
      const sag = RADIUS_ROD_LENGTH - Math.sqrt(Math.max(1e-4, RADIUS_ROD_LENGTH * RADIUS_ROD_LENGTH - sy * sy));
      linkOuter.lineTo(-sag + halfW, sy);
    }
    linkOuter.closePath();

    // Inner curved slot cutout!
    const slotHole = new THREE.Path();
    const slotInnerHalf = valveGear.linkSlotHalfSpan + 0.015;
    const slotW = 0.022;
    for (let i = 0; i <= segs; i++) {
      const sy = -slotInnerHalf + (i / segs) * (2 * slotInnerHalf);
      const sag = RADIUS_ROD_LENGTH - Math.sqrt(Math.max(1e-4, RADIUS_ROD_LENGTH * RADIUS_ROD_LENGTH - sy * sy));
      if (i === 0) slotHole.moveTo(-sag - slotW, sy);
      else slotHole.lineTo(-sag - slotW, sy);
    }
    for (let i = segs; i >= 0; i--) {
      const sy = -slotInnerHalf + (i / segs) * (2 * slotInnerHalf);
      const sag = RADIUS_ROD_LENGTH - Math.sqrt(Math.max(1e-4, RADIUS_ROD_LENGTH * RADIUS_ROD_LENGTH - sy * sy));
      slotHole.lineTo(-sag + slotW, sy);
    }
    slotHole.closePath();
    linkOuter.holes.push(slotHole);

    const linkGeo = new THREE.ExtrudeGeometry(linkOuter, {
      depth: 0.048,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.004,
      bevelSegments: 1
    });
    linkGeo.translate(0, 0, -0.024);
    const linkMesh = new THREE.Mesh(linkGeo, mats.polishedSteel);
    linkMesh.castShadow = true;
    expLink.add(linkMesh);

    // Link tail hanging down to -linkTailLength
    const tailBar = new THREE.Mesh(new THREE.BoxGeometry(0.068, valveGear.linkTailLength - slotHalf + 0.08, 0.042), mats.polishedSteel);
    tailBar.position.set(0, -(slotHalf + valveGear.linkTailLength) * 0.5, 0);
    expLink.add(tailBar);

    const tailPin = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.10, 12), mats.brass);
    tailPin.rotation.x = Math.PI / 2;
    tailPin.position.set(0, -valveGear.linkTailLength, s * 0.03);
    expLink.add(tailPin);

    expLink.position.set(linkPivotLocalX, linkPivotY, s * zPlanes.expansionLink);
    gGroup.add(expLink);

    // Die Block (Kulissenstein) – bright brass sliding block inside the curved slot!
    const dieBlock = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.072, 0.078), mats.brass);
    gGroup.add(dieBlock);

    // Radius Rod (Schieberschubstange) – Die Block -> Combination Lever fulcrum
    const radiusRod = createFlutedRod(1.0, 0.056, 0.032, mats, true);
    gGroup.add(radiusRod);

    // Reverser Lifting Arm, Lifting Link & Reverse-Shaft Bearing Bracket
    const liftArm = createFlutedRod(1.0, 0.05, 0.032, mats, true);
    const liftLink = createFlutedRod(1.0, 0.04, 0.026, mats, true);
    const revShaftBracket = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.38, 12), mats.castSteel);
    revShaftBracket.rotation.x = Math.PI / 2;
    revShaftBracket.position.set(linkPivotLocalX + 0.55, linkPivotY + 0.62, s * (zPlanes.radiusRod - 0.18));
    gGroup.add(liftArm, liftLink, revShaftBracket);

    // Combination Lever (Voreilhebel) – Valve Stem (TOP) -> Radius Rod -> Union Link (BOTTOM)
    const combLever = createFlutedRod(1.0, 0.062, 0.036, mats, true);
    gGroup.add(combLever);

    // Union Link – Crosshead Drop Arm -> Bottom of Combination Lever
    const unionLink = createFlutedRod(1.0, 0.048, 0.030, mats, true);
    gGroup.add(unionLink);

    // Valve Stem Crosshead & Stem into Steam Chest
    const valveStemLen = 0.88;
    const valveStemGeo = new THREE.CylinderGeometry(0.032, 0.032, valveStemLen, 12);
    valveStemGeo.rotateZ(Math.PI / 2);
    const valveStem = new THREE.Mesh(valveStemGeo, mats.polishedSteel);
    const valveCrosshead = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.11), mats.polishedSteel);
    gGroup.add(valveStem, valveCrosshead);

    root.add(gGroup);
    gearSides[sideName] = {
      s,
      couplingRod,
      mainRod,
      crosshead,
      pistonRod,
      pistonRodLen,
      eccCrank,
      eccRod,
      expLink,
      dieBlock,
      radiusRod,
      liftArm,
      liftLink,
      combLever,
      unionLink,
      valveStem,
      valveCrosshead
    };
  }

  // Update function applying exact kinematic pose & thermodynamic cylinder coloring every frame!
  const tmpColor = new THREE.Color();
  function pressureToSteamColor(pBar, outColor) {
    const pNorm = Math.max(0, Math.min(1, (pBar - 1.3) / 19.4));
    // 1.0 (20.7 bar, 395°C) = glowing deep red (#ff2400)
    // 0.55 = bright orange (#ff8800)
    // 0.25 = warm yellow (#facc15)
    // 0.0  (1.35 bar, 115°C) = pale exhaust white-grey (#cbd5e1)
    if (pNorm > 0.55) {
      const t = (pNorm - 0.55) / 0.45;
      outColor.setRGB(1.0, 0.14 + 0.40 * (1 - t), 0.02);
    } else if (pNorm > 0.22) {
      const t = (pNorm - 0.22) / 0.33;
      outColor.setRGB(0.98, 0.54 + 0.28 * (1 - t), 0.08 + 0.08 * (1 - t));
    } else {
      const t = pNorm / 0.22;
      outColor.setRGB(0.80 + 0.18 * t, 0.84 - 0.02 * t, 0.88 - 0.72 * t);
    }
    return pNorm;
  }

  function updateKinematics(unitKin, cylThermoFront, cylThermoRear, thermoOverlay) {
    // Rotate all 4 wheelsets together (left wheel already quartered by -PI/2 inside axleGroup)
    const rotZ = unitKin.right.wheelRotZ;
    for (const ws of wheelsets) ws.rotation.z = rotZ;

    for (const sideName of ['right', 'left']) {
      const k = unitKin[sideName];
      const g = gearSides[sideName];
      const s = g.s;

      const p0x = toLocalX(k.crankPins[0].x);
      const p3x = toLocalX(k.crankPins[3].x);
      const pY = k.crankPins[0].y;
      g.couplingRod.position.set((p0x + p3x) * 0.5, pY, s * zPlanes.couplingRod);

      const mpX = toLocalX(k.mainPin.x);
      const chX = toLocalX(k.crosshead.x);
      placeRodBetween(g.mainRod, mpX, k.mainPin.y, chX, k.crosshead.y, s * zPlanes.mainRod, valveGear.mainRodLength);

      g.crosshead.position.set(chX, k.crosshead.y, s * zPlanes.mainRod);
      g.pistonRod.position.set(chX + g.pistonRodLen * 0.5, k.crosshead.y, s * zPlanes.mainRod);

      const eccX = toLocalX(k.eccentricPin.x);
      placeRodBetween(g.eccCrank, mpX, k.mainPin.y, eccX, k.eccentricPin.y, s * zPlanes.eccentricCrankInner);

      const tailX = toLocalX(k.linkTail.x);
      placeRodBetween(g.eccRod, eccX, k.eccentricPin.y, tailX, k.linkTail.y, s * zPlanes.eccentricRod);

      g.expLink.rotation.z = k.linkAngle;

      const dieX = toLocalX(k.dieBlock.x);
      g.dieBlock.position.set(dieX, k.dieBlock.y, s * zPlanes.expansionLink);
      g.dieBlock.rotation.z = k.linkAngle;

      const radX = toLocalX(k.radiusRodPin.x);
      placeRodBetween(g.radiusRod, dieX, k.dieBlock.y, radX, k.radiusRodPin.y, s * zPlanes.radiusRod);

      placeRodBetween(
        g.liftArm,
        toLocalX(k.liftArmPivot.x),
        k.liftArmPivot.y,
        toLocalX(k.liftArmTip.x),
        k.liftArmTip.y,
        s * (zPlanes.radiusRod - 0.04)
      );
      placeRodBetween(
        g.liftLink,
        toLocalX(k.liftArmTip.x),
        k.liftArmTip.y,
        toLocalX(k.liftLinkAttach.x),
        k.liftLinkAttach.y,
        s * (zPlanes.radiusRod - 0.02)
      );

      const vsX = toLocalX(k.valveStemPin.x);
      const cbX = toLocalX(k.combBottomPin.x);
      placeRodBetween(g.combLever, vsX, k.valveStemPin.y, cbX, k.combBottomPin.y, s * zPlanes.combinationLever);

      const daX = toLocalX(k.dropArmPin.x);
      placeRodBetween(g.unionLink, daX, k.dropArmPin.y, cbX, k.combBottomPin.y, s * zPlanes.combinationLever);

      g.valveCrosshead.position.set(vsX, k.valveStemPin.y, s * zPlanes.steamChestCenter);
      g.valveStem.position.set(vsX + 0.44, k.valveStemPin.y, s * zPlanes.steamChestCenter);
    }

    // Update right-side cutaway piston, piston valve, steam ports & dynamic chamber pressure colors!
    const cut = rightCyl.cutawayRefs;
    if (cut && cut.cutGroup.visible) {
      const kR = unitKin.right;
      cut.pistonGroup.position.x = kR.pistonDisp;
      cut.valveGroup.position.x = kR.valveDisp;

      // Dynamic front & rear chamber volumes snugly fill space between piston faces and cylinder covers
      const frontStart = kR.pistonDisp + cut.pistonHalfThick;
      const frontLen = Math.max(0.02, cut.innerHalfLen - frontStart);
      cut.frontChamber.scale.set(frontLen, 1, 1);
      cut.frontChamber.position.x = frontStart + frontLen * 0.5;

      const rearEnd = kR.pistonDisp - cut.pistonHalfThick;
      const rearLen = Math.max(0.02, rearEnd - (-cut.innerHalfLen));
      cut.rearChamber.scale.set(rearLen, 1, 1);
      cut.rearChamber.position.x = -cut.innerHalfLen + rearLen * 0.5;

      const boost = thermoOverlay ? 1.55 : 0.95;
      const pFrontNorm = pressureToSteamColor(cylThermoFront.pressureBar, tmpColor);
      cut.frontChamberMat.color.copy(tmpColor);
      cut.frontChamberMat.emissive.copy(tmpColor);
      cut.frontChamberMat.emissiveIntensity = (0.35 + 1.15 * pFrontNorm) * boost;
      cut.frontChamberMat.opacity = (thermoOverlay ? 0.45 : 0.28) + 0.45 * pFrontNorm;

      const pRearNorm = pressureToSteamColor(cylThermoRear.pressureBar, tmpColor);
      cut.rearChamberMat.color.copy(tmpColor);
      cut.rearChamberMat.emissive.copy(tmpColor);
      cut.rearChamberMat.emissiveIntensity = (0.35 + 1.15 * pRearNorm) * boost;
      cut.rearChamberMat.opacity = (thermoOverlay ? 0.45 : 0.28) + 0.45 * pRearNorm;

      // Port glow: bright live-steam red when admitting, soft pale exhaust when exhausting!
      const setPortColor = (mat, adm, exh) => {
        if (adm > 0.02) {
          mat.color.setHex(0xff2a0a);
          mat.emissive.setHex(0xff2a0a);
          mat.emissiveIntensity = (0.7 + 1.2 * adm) * boost;
          mat.opacity = 0.45 + 0.45 * adm;
        } else if (exh > 0.02) {
          mat.color.setHex(0xdbeafe);
          mat.emissive.setHex(0x94a3b8);
          mat.emissiveIntensity = 0.35 * boost;
          mat.opacity = 0.32 + 0.35 * exh;
        } else {
          mat.color.setHex(0xf59e0b);
          mat.emissive.setHex(0xb45309);
          mat.emissiveIntensity = 0.25;
          mat.opacity = 0.22;
        }
      };
      setPortColor(cut.frontPortMat, kR.ports.frontAdmissionOpen, kR.ports.frontExhaustOpen);
      setPortColor(cut.rearPortMat, kR.ports.rearAdmissionOpen, kR.ports.rearExhaustOpen);
      cut.centerLiveMat.emissiveIntensity = thermoOverlay ? 1.85 : 1.15;
    }
  }

  function setCylinderCutaway(enabled) {
    if (!rightCyl.cutawayRefs) return;
    rightCyl.cutawayRefs.outerShellGroup.visible = !enabled;
    rightCyl.cutawayRefs.cutGroup.visible = enabled;
  }

  return {
    root,
    wheelsets,
    rightCyl,
    leftCyl,
    updateKinematics,
    setCylinderCutaway
  };
}

/**
 * Build the Dynamic Track Bed (crushed ballast embankment, InstancedMesh wood sleepers,
 * dynamically bending steel rails + optional Roller Test Stand rollers!)
 */
export function buildTrackSystem(mats) {
  const group = new THREE.Group();
  const halfLen = track.length * 0.5;
  const segsX = 64;

  // 1. Trapezoidal Crushed Ballast Embankment (vertex-deformable along curve!)
  const ballastGeo = new THREE.BoxGeometry(track.length, track.ballastHeight, 4.6, segsX, 1, 2);
  // Taper top width to 3.2 m for authentic railway embankment profile
  const bPos = ballastGeo.attributes.position;
  const bBase = new Float32Array(bPos.array.length);
  for (let i = 0; i < bPos.count; i++) {
    const y = bPos.getY(i);
    const z = bPos.getZ(i);
    if (y > 0) {
      bPos.setZ(i, z * 0.72);
    }
    bBase[i * 3] = bPos.getX(i);
    bBase[i * 3 + 1] = bPos.getY(i);
    bBase[i * 3 + 2] = bPos.getZ(i);
  }
  ballastGeo.computeVertexNormals();
  const ballastMesh = new THREE.Mesh(ballastGeo, mats.ballast);
  ballastMesh.position.y = track.ballastTopY - track.ballastHeight * 0.5;
  ballastMesh.receiveShadow = true;
  group.add(ballastMesh);

  // 2. Instanced Weathered Wood Sleepers (scrolls smoothly in driving mode & follows curve!)
  const sleeperCount = Math.ceil(track.length / track.sleeperSpacing) + 2;
  const sleeperGeo = new THREE.BoxGeometry(track.sleeperDepth, track.sleeperHeight, track.sleeperWidth);
  const sleeperInst = new THREE.InstancedMesh(sleeperGeo, mats.sleeperWood, sleeperCount);
  sleeperInst.receiveShadow = true;
  sleeperInst.castShadow = true;
  group.add(sleeperInst);

  // 3. Deformable Left & Right Steel Rails (rusty web + polished rail head)
  function makeRailRibbon(width, height, yCenter, mat) {
    const geo = new THREE.BoxGeometry(track.length, height, width, segsX, 1, 1);
    const pos = geo.attributes.position;
    const base = new Float32Array(pos.array);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = yCenter;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return { mesh, geo, pos, base };
  }

  const rails = [];
  for (const side of [1, -1]) {
    const web = makeRailRibbon(0.044, track.railHeight * 0.76, -track.railHeight * 0.62, mats.railWebRust);
    const head = makeRailRibbon(track.railHeadWidth, track.railHeight * 0.28, -track.railHeight * 0.14, mats.railHeadSteel);
    group.add(web.mesh, head.mesh);
    rails.push({ side, web, head });
  }

  // 4. Optional Roller Test Stand (Rollenprüfstand) steel dynamometer rollers under all 8 driving axles!
  const rollerGroup = new THREE.Group();
  rollerGroup.visible = false;
  const rollerMeshes = [];
  const allDriverXs = [...layout.rearEngine.driverXs, ...layout.frontEngine.driverXs];
  const rollerR = 0.34;
  for (const dx of allDriverXs) {
    const rAxle = new THREE.Group();
    rAxle.position.set(dx, -rollerR, 0);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.95, 14), mats.castSteelDark);
    shaft.rotation.x = Math.PI / 2;
    rAxle.add(shaft);
    for (const side of [1, -1]) {
      const drum = new THREE.Mesh(new THREE.CylinderGeometry(rollerR, rollerR, 0.17, 24), mats.polishedSteel);
      drum.rotation.x = Math.PI / 2;
      drum.position.z = side * zPlanes.wheelCenter;
      rAxle.add(drum);
      const ped = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.45, 0.20), mats.cutSectionRed);
      ped.position.set(dx, -rollerR - 0.12, side * (zPlanes.wheelCenter + 0.24));
      rollerGroup.add(ped);
    }
    rollerGroup.add(rAxle);
    rollerMeshes.push(rAxle);
  }
  group.add(rollerGroup);

  const dummy = new THREE.Object3D();
  let lastCurveBlend = -1;
  let scrollDistance = 0;

  function deformRibbon(ribbon, zOffset, trackPoint) {
    const { pos, base, geo } = ribbon;
    for (let i = 0; i < pos.count; i++) {
      const bx = base[i * 3];
      const by = base[i * 3 + 1];
      const bz = base[i * 3 + 2] + zOffset;
      const tp = trackPoint(bx);
      const c = Math.cos(tp.yaw);
      const sn = Math.sin(tp.yaw);
      // Local lateral normal for +yaw (turning +X toward -Z): right normal (+Z) rotates to (+sin yaw, +cos yaw)
      pos.setXYZ(i, tp.x + bz * sn, by, tp.z + bz * c);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  }

  function update(dt, speedMs, articulation, rollerStand) {
    rollerGroup.visible = rollerStand;
    if (rollerStand) {
      // Spin dynamometer rollers counter to driving wheels!
      const dRot = (speedMs * dt) / rollerR;
      for (const r of rollerMeshes) r.rotation.z += dRot;
    } else {
      scrollDistance += speedMs * dt;
      // Scroll ballast texture seamlessly along X
      mats._ballastMap.offset.x = (scrollDistance / track.length) * 14;
      mats._ballastBump.offset.x = (scrollDistance / track.length) * 14;
    }

    // Re-deform ballast & rail meshes only when curveBlend changes
    if (Math.abs(articulation.blend - lastCurveBlend) > 1e-4) {
      lastCurveBlend = articulation.blend;
      deformRibbon({ pos: bPos, base: bBase, geo: ballastGeo }, 0, articulation.trackPoint);
      for (const r of rails) {
        deformRibbon(r.web, r.side * track.railCenterHalf, articulation.trackPoint);
        deformRibbon(r.head, r.side * track.railCenterHalf, articulation.trackPoint);
      }
    }

    // Place instanced sleepers along curve with smooth scroll offset
    const offset = rollerStand
      ? 0
      : (((-scrollDistance) % track.sleeperSpacing) + track.sleeperSpacing) % track.sleeperSpacing;
    for (let i = 0; i < sleeperCount; i++) {
      const sx = -halfLen + i * track.sleeperSpacing + offset;
      const tp = articulation.trackPoint(sx);
      dummy.position.set(tp.x, track.ballastTopY - 0.04, tp.z);
      dummy.rotation.set(0, tp.yaw, 0);
      dummy.updateMatrix();
      sleeperInst.setMatrixAt(i, dummy.matrix);
    }
    sleeperInst.instanceMatrix.needsUpdate = true;
  }

  return { group, update };
}
