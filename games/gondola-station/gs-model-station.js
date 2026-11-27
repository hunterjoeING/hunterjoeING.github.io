// 3D Architecture, Alpine Snow Environment, Tower 1 (12-Roller Sheaves),
// Braided Steel Haul Rope & Color-Coded Velocity Overlay Builder

import * as THREE from 'three';
import { GS_SPECS } from './specs.js';

// Smooth mountain slope ground elevation Y(x, z)
export function evalTerrainY(x, z) {
  const { stationMaxX } = GS_SPECS.floors;
  const { tower1X, tower1GroundY } = GS_SPECS.track;
  if (x <= stationMaxX + 1.0) {
    // Flat valley plaza around the station with gentle snow berms outside ±12 m
    const bank = Math.max(0, Math.abs(z) - 11.5);
    return -0.05 + Math.min(4.2, bank * bank * 0.018);
  }
  const dx = x - (stationMaxX + 1.0);
  const span1 = tower1X - (stationMaxX + 1.0);
  // Smooth alpine ski slope rising through Tower 1 (5.4 m at X=36) up towards mountain ridge (~19.5 m at X=68)
  const t = dx / span1;
  const baseSlope = t <= 1
    ? tower1GroundY * (t * t * (1.85 - 0.85 * t))
    : tower1GroundY + (dx - span1) * 0.43;
  // Subtle natural terrain undulation & valley side walls
  const sideRise = Math.max(0, Math.abs(z) - 8.5) * 0.22;
  const wave = Math.sin(x * 0.09) * Math.cos(z * 0.07) * 0.38;
  return baseSlope + sideRise + wave;
}

export function buildAlpineEnvironment(mats, kin) {
  const group = new THREE.Group();
  group.name = 'AlpineEnvironment';

  // 1. Sculpted Alpine Snow Slope & Forecourt Mesh
  const geo = new THREE.PlaneGeometry(165, 130, 110, 72);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) + 32; // Shift so mesh spans X ∈ [-50.5, +114.5]
    const z = pos.getZ(i);
    pos.setX(i, x);
    pos.setY(i, evalTerrainY(x, z));
  }
  geo.computeVertexNormals();
  const terrain = new THREE.Mesh(geo, mats.snowTerrain);
  terrain.receiveShadow = true;
  group.add(terrain);

  // 2. Alpine Mountain Panorama Ring (dramatic snowy Tyrolean peaks framing Tower 1 & horizon)
  const peakGroup = new THREE.Group();
  const peakDefs = [
    { x: 108, z: -56, r: 40, h: 58 },
    { x: 122, z: -8, r: 46, h: 68 },
    { x: 106, z: 48, r: 40, h: 56 },
    { x: 64, z: -84, r: 38, h: 48 },
    { x: 60, z: 84, r: 38, h: 48 },
    { x: -16, z: -92, r: 44, h: 46 },
    { x: -24, z: 92, r: 42, h: 44 },
    { x: -82, z: -38, r: 46, h: 50 },
    { x: -86, z: 32, r: 44, h: 48 }
  ];
  for (const p of peakDefs) {
    const rockCone = new THREE.Mesh(
      new THREE.ConeGeometry(p.r, p.h, 7),
      mats.mountainRock
    );
    rockCone.position.set(p.x, p.h * 0.42 - 4, p.z);
    rockCone.rotation.y = (p.x * 0.13) % Math.PI;
    peakGroup.add(rockCone);

    // Broad alpine snow cap covering upper 70% of peak
    const snowCap = new THREE.Mesh(
      new THREE.ConeGeometry(p.r * 0.72, p.h * 0.68, 7),
      mats.snowTerrain
    );
    snowCap.position.set(p.x, p.h * 0.59 - 3.6, p.z);
    snowCap.rotation.y = rockCone.rotation.y;
    peakGroup.add(snowCap);
  }
  group.add(peakGroup);

  // 3. Subtle Alpine Pine Silhouettes flanking the piste (framing Tower 1)
  const pineMat = new THREE.MeshStandardMaterial({ color: 0x1e3a2f, roughness: 0.9 });
  const pinePositions = [
    [22, -16], [26, -19], [31, -17], [40, -18], [45, -15],
    [28, 19], [34, 18], [42, 19], [48, 16],
    [-14, -16], [-16, 16], [6, -18]
  ];
  for (const [px, pz] of pinePositions) {
    const py = evalTerrainY(px, pz);
    const tree = new THREE.Group();
    tree.position.set(px, py, pz);
    const hScale = 0.85 + ((Math.abs(px * 7 + pz * 13) % 10) / 16);
    const tier1 = new THREE.Mesh(new THREE.ConeGeometry(1.45 * hScale, 3.6 * hScale, 6), pineMat);
    tier1.position.y = 2.1 * hScale;
    const tier2 = new THREE.Mesh(new THREE.ConeGeometry(1.05 * hScale, 2.8 * hScale, 6), pineMat);
    tier2.position.y = 3.9 * hScale;
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.62 * hScale, 1.4 * hScale, 6), mats.snowTerrain);
    cap.position.y = 4.9 * hScale;
    tree.add(tier1, tier2, cap);
    group.add(tree);
  }

  // 4. Distant Mountain Ridge Funitel Twin-Rope Return Pylon (so cabins loop cleanly with ZERO teleports!)
  const topGroup = new THREE.Group();
  const topGround = evalTerrainY(kin.xTop, 0);
  const topY = GS_SPECS.track.mountainTopY;
  const mastH = Math.max(4, topY - topGround + 1.2);
  const topMast = new THREE.Mesh(
    new THREE.CylinderGeometry(0.65, 0.95, mastH, 10),
    mats.steelAnthracite
  );
  topMast.position.set(kin.xTop, topGround + mastH * 0.5 - 0.5, 0);
  topGroup.add(topMast);

  const returnWheel = new THREE.Group();
  returnWheel.position.set(kin.xTop, topY, 0);
  const rwInner = new THREE.Mesh(
    new THREE.TorusGeometry(GS_SPECS.track.innerRopeZ, 0.16, 10, 32),
    mats.doppelmayrRed
  );
  rwInner.rotation.x = Math.PI / 2;
  const rwOuter = new THREE.Mesh(
    new THREE.TorusGeometry(GS_SPECS.track.outerRopeZ, 0.14, 10, 36),
    mats.doppelmayrRed
  );
  rwOuter.rotation.x = Math.PI / 2;
  const returnHub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.82, 0.82, 0.55, 16),
    mats.steelAnthracite
  );
  returnWheel.add(rwInner, rwOuter, returnHub);
  topGroup.add(returnWheel);
  group.add(topGroup);

  return { group, returnWheel };
}

export function buildStationArchitecture(mats, kin) {
  const root = new THREE.Group();
  root.name = 'StationArchitecture';

  const F = GS_SPECS.floors;
  const T = GS_SPECS.track;
  const W = GS_SPECS.wheels;
  const lenX = F.stationMaxX - F.stationMinX; // 23.8 m
  const midX = 0.5 * (F.stationMinX + F.stationMaxX); // +3.3 m
  const widthZ = F.stationHalfZ * 2; // 13.1 m

  // =========================================================================
  // 1. GROUND FLOOR (EG, Y = 0.0 m) — LEVEL WALK-IN BOARDING AREA
  // =========================================================================
  const egGroup = new THREE.Group();
  egGroup.name = 'EG_LevelWalkIn';

  // Main architectural concrete foundation & Level Walk-In floor slab
  const baseSlab = new THREE.Mesh(
    new THREE.BoxGeometry(lenX + 3.2, 0.48, widthZ + 3.0),
    mats.egPlatformDeck
  );
  baseSlab.position.set(midX + 0.5, -0.24, 0);
  baseSlab.receiveShadow = true;
  egGroup.add(baseSlab);

  // Outer snow-cleared alpine access ramp leading directly onto EG floor (zero steps!)
  const accessApron = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 0.14, 7.6),
    mats.concrete
  );
  accessApron.position.set(F.stationMaxX + 2.8, -0.05, 0);
  accessApron.receiveShadow = true;
  egGroup.add(accessApron);

  // Yellow-black safety hazard boarding strips along EG cabin U-turn
  const hazardStraightLen = T.egTurnCenterX - W.centerX + 0.6;
  for (const sgn of [-1, 1]) {
    const strip = new THREE.Mesh(
      new THREE.PlaneGeometry(hazardStraightLen, 0.36),
      mats.hazardStripe
    );
    strip.rotation.x = -Math.PI / 2;
    strip.position.set(0.5 * (W.centerX + T.egTurnCenterX), 0.014, sgn * (T.egTurnRadius + 1.02));
    egGroup.add(strip);
  }
  // Curved hazard arc around the EG 180° U-turn apex
  const hazardArc = new THREE.Mesh(
    new THREE.RingGeometry(T.egTurnRadius + 0.86, T.egTurnRadius + 1.22, 40, 1, -Math.PI / 2, Math.PI),
    mats.hazardStripe
  );
  hazardArc.rotation.x = -Math.PI / 2;
  hazardArc.position.set(T.egTurnCenterX, 0.015, 0);
  egGroup.add(hazardArc);

  // Central EG architectural island (separates disembark & boarding streams, holds LED guide ring)
  const islandRadius = 2.05;
  const islandDisc = new THREE.Mesh(
    new THREE.CylinderGeometry(islandRadius, islandRadius + 0.12, 0.18, 32),
    mats.concrete
  );
  islandDisc.position.set(T.egTurnCenterX, 0.09, 0);
  islandDisc.receiveShadow = true;
  egGroup.add(islandDisc);

  const islandLedRing = new THREE.Mesh(
    new THREE.TorusGeometry(islandRadius + 0.02, 0.045, 8, 48),
    mats.ledCoolStrip
  );
  islandLedRing.rotation.x = Math.PI / 2;
  islandLedRing.position.set(T.egTurnCenterX, 0.18, 0);
  egGroup.add(islandLedRing);

  // Automatic Glass Boarding Gates (Zugangsschranken) on EG Boarding Side (+Z)
  const boardingGates = [];
  const gatePositionsX = [-0.8, 1.2, 3.2];
  for (const gx of gatePositionsX) {
    const gateUnit = new THREE.Group();
    gateUnit.position.set(gx, 0, T.egTurnRadius + 1.48);

    // Left & right stainless gate bollards
    for (const bx of [-0.62, 0.62]) {
      const bollard = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 1.12, 0.24),
        mats.steelAnthracite
      );
      bollard.position.set(bx, 0.56, 0);
      bollard.castShadow = true;
      gateUnit.add(bollard);

      const ledTop = new THREE.Mesh(
        new THREE.BoxGeometry(0.10, 0.05, 0.18),
        mats.ledCoolStrip
      );
      ledTop.position.set(bx, 1.14, 0);
      gateUnit.add(ledTop);
    }

    // Two sliding glass wings (animated open when a cabin is adjacent!)
    const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.92, 0.04), mats.boardingGateGlass);
    const wingR = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.92, 0.04), mats.boardingGateGlass);
    wingL.position.set(-0.27, 0.55, 0);
    wingR.position.set(0.27, 0.55, 0);
    gateUnit.add(wingL, wingR);

    boardingGates.push({ group: gateUnit, wingL, wingR, x: gx, z: T.egTurnRadius });
    egGroup.add(gateUnit);
  }

  // Mechanical Door Actuation Rail (Türbetätigungsschiene) on EG ceiling/rail level
  const doorRailCurvePts = [];
  for (let i = 0; i <= 40; i++) {
    const psi = -Math.PI * 0.5 + Math.PI * (i / 40);
    doorRailCurvePts.push(new THREE.Vector3(
      T.egTurnCenterX + (T.egTurnRadius + 0.52) * Math.cos(psi),
      F.egRailY - 0.52,
      (T.egTurnRadius + 0.52) * Math.sin(psi)
    ));
  }
  const doorActRail = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(doorRailCurvePts), 48, 0.045, 8, false),
    mats.safetyYellow
  );
  egGroup.add(doorActRail);

  root.add(egGroup);

  // =========================================================================
  // 2. UPPER FLOOR (OG, Y = 7.0 m) — OPEN MACHINERY HALL & CATWALKS
  // =========================================================================
  const ogGroup = new THREE.Group();
  ogGroup.name = 'OG_MachineryHall';

  // Central Structural Machinery Deck (Y = 7.0 m) supporting Bullwheel, DirectDrive & Tensioning
  // Sized carefully (Z ∈ [-2.55, +2.55], X ∈ [-1.2, +11.8]) so cabins at |Z|=3.90 & Ferris wheels have TOTAL clearance!
  const ogDeck = new THREE.Mesh(
    new THREE.BoxGeometry(13.2, 0.36, 4.9),
    mats.concrete
  );
  ogDeck.position.set(5.4, F.ogFloorY - 0.18, 0);
  ogDeck.castShadow = true;
  ogDeck.receiveShadow = true;
  ogGroup.add(ogDeck);

  // Perforated Steel Maintenance Catwalk overlay + Safety Yellow Railings around OG Machinery Deck
  const catwalkTop = new THREE.Mesh(
    new THREE.BoxGeometry(12.8, 0.06, 4.6),
    mats.catwalkGrating
  );
  catwalkTop.position.set(5.4, F.ogFloorY + 0.03, 0);
  catwalkTop.receiveShadow = true;
  ogGroup.add(catwalkTop);

  // Heavy structural steel columns supporting the OG deck from EG (inside the EG U-turn island!)
  const pillarCoords = [
    [0.5, -1.7], [0.5, 1.7],
    [4.4, -1.7], [4.4, 1.7],
    [9.8, -1.9], [9.8, 1.9],
    [13.6, -2.0], [13.6, 2.0]
  ];
  for (const [cx, cz] of pillarCoords) {
    const col = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, F.ogFloorY, 0.42),
      mats.steelAnthracite
    );
    col.position.set(cx, F.ogFloorY * 0.5, cz);
    col.castShadow = true;
    col.receiveShadow = true;
    ogGroup.add(col);
  }

  // Yellow Maintenance Railings along OG Machinery Deck perimeter
  const addRailingSegment = (x1, z1, x2, z2, yBase) => {
    const len = Math.hypot(x2 - x1, z2 - z1);
    const angle = Math.atan2(z2 - z1, x2 - x1);
    const railGrp = new THREE.Group();
    railGrp.position.set(0.5 * (x1 + x2), yBase, 0.5 * (z1 + z2));
    railGrp.rotation.y = -angle;
    for (const ry of [0.55, 1.05]) {
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, len, 6), mats.safetyYellow);
      bar.rotation.z = Math.PI / 2;
      bar.position.y = ry;
      railGrp.add(bar);
    }
    const posts = Math.max(2, Math.round(len / 1.8) + 1);
    for (let i = 0; i < posts; i++) {
      const px = -len * 0.5 + (len * i) / (posts - 1);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 1.08, 6), mats.safetyYellow);
      post.position.set(px, 0.54, 0);
      railGrp.add(post);
    }
    ogGroup.add(railGrp);
  };
  addRailingSegment(-1.0, -2.35, 11.8, -2.35, F.ogFloorY);
  addRailingSegment(-1.0, 2.35, 11.8, 2.35, F.ogFloorY);
  addRailingSegment(-1.0, -2.35, -1.0, 2.35, F.ogFloorY);
  addRailingSegment(11.8, -2.35, 11.8, 2.35, F.ogFloorY);

  // Overhead Heavy Steel Portal Frame supporting OG Guide Rails & Tire Conveyors
  const frameXs = [-7.8, -3.0, 1.6, 6.4, 11.2, 14.8];
  for (const fx of frameXs) {
    // Left & right main vertical steel H-columns at Z = ±6.35 m
    for (const sgn of [-1, 1]) {
      const col = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, F.roofY, 0.44),
        mats.steelAnthracite
      );
      col.position.set(fx, F.roofY * 0.5, sgn * (F.stationHalfZ - 0.18));
      col.castShadow = true;
      ogGroup.add(col);
    }
    // Overhead roof steel truss beam spanning widthZ
    const roofBeam = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.46, widthZ + 0.6),
      mats.steelAnthracite
    );
    roofBeam.position.set(fx, F.roofY - 0.22, 0);
    roofBeam.castShadow = true;
    ogGroup.add(roofBeam);

    // Subtle LED light strip under each steel roof truss (gorgeous at Blue Hour!)
    const ledStrip = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.05, widthZ - 1.2),
      mats.ledWarmStrip
    );
    ledStrip.position.set(fx, F.roofY - 0.48, 0);
    ogGroup.add(ledStrip);
  }

  // Longitudinal upper steel crane/rail stringers at Z = ±5.8 m
  for (const sgn of [-1, 1]) {
    const stringer = new THREE.Mesh(
      new THREE.BoxGeometry(lenX + 0.4, 0.34, 0.26),
      mats.steelAnthracite
    );
    stringer.position.set(midX, F.roofY - 0.42, sgn * (F.stationHalfZ - 0.22));
    ogGroup.add(stringer);
  }

  // Overhead Fixed Galvanized Steel Guide Rail (Führungsschiene) for OG conveyors + EG U-turn!
  const buildRailTube = (points, radius = 0.075, mat = mats.steelGalvanized) => {
    const curve = new THREE.CatmullRomCurve3(points);
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(24, points.length * 2), radius, 8, false), mat);
    mesh.castShadow = true;
    ogGroup.add(mesh);
  };

  // Extract continuous station rail points from kin.loop for Decel, EG loop, and Accel
  const decelPts = [];
  const egPts = [];
  const accelPts = [];
  for (const p of kin.loop.pts) {
    if (p.zone === 'decel' || p.zone === 'detach') decelPts.push(new THREE.Vector3(p.x, p.y + 0.16, p.z));
    if (p.zone === 'eg_disembark' || p.zone === 'eg_turn' || p.zone === 'eg_board') {
      egPts.push(new THREE.Vector3(p.x, p.y + 0.16, p.z));
    }
    if (p.zone === 'accel' || p.zone === 'attach' || p.zone === 'check') {
      accelPts.push(new THREE.Vector3(p.x, p.y + 0.16, p.z));
    }
  }
  buildRailTube(decelPts, 0.085, mats.steelGalvanized);
  buildRailTube(egPts, 0.075, mats.steelPolishedRail);
  buildRailTube(accelPts, 0.085, mats.steelGalvanized);

  // Suspension hangers attaching EG rail to OG ceiling beams
  for (let i = 0; i < egPts.length; i += 14) {
    const pt = egPts[i];
    const hangerH = F.ogFloorY - pt.y;
    if (hangerH > 0.5 && Math.abs(pt.z) < 4.5 && pt.x > -2.5) {
      const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, hangerH, 8),
        mats.steelAnthracite
      );
      rod.position.set(pt.x, pt.y + hangerH * 0.5, pt.z);
      ogGroup.add(rod);
    }
  }

  root.add(ogGroup);

  // =========================================================================
  // 3. ARCHITECTURAL GLASS FACADE & CANTILEVERED ROOF (TOGGLEABLE SHELL)
  // =========================================================================
  const shellGroup = new THREE.Group();
  shellGroup.name = 'GlassFacadeAndRoof';

  // Sleek cantilevered architectural roof canopy with dark soffit & snow edge
  const roofDeck = new THREE.Mesh(
    new THREE.BoxGeometry(lenX + 2.8, 0.34, widthZ + 2.2),
    mats.roofGlass
  );
  roofDeck.position.set(midX + 0.3, F.roofY + 0.18, 0);
  roofDeck.castShadow = true;
  roofDeck.receiveShadow = true;
  shellGroup.add(roofDeck);

  // Subtle snow layer resting on top of the flat alpine roof
  const roofSnow = new THREE.Mesh(
    new THREE.BoxGeometry(lenX + 2.4, 0.14, widthZ + 1.8),
    mats.snowTerrain
  );
  roofSnow.position.set(midX + 0.3, F.roofY + 0.42, 0);
  roofSnow.receiveShadow = true;
  shellGroup.add(roofSnow);

  // Architectural Fascia Signs on BOTH sides + Front Portal ("D-LINE · ALPIN-EXPRESS · 2-ETAGEN-TALSTATION")
  for (const sgn of [-1, 1]) {
    const sideSign = new THREE.Mesh(
      new THREE.PlaneGeometry(13.2, 1.15),
      mats.stationSign
    );
    sideSign.position.set(midX + 0.3, F.roofY + 0.08, sgn * (F.stationHalfZ + 1.12));
    sideSign.rotation.y = sgn > 0 ? 0 : Math.PI;
    shellGroup.add(sideSign);
  }
  const frontSign = new THREE.Mesh(
    new THREE.PlaneGeometry(10.4, 1.15),
    mats.stationSign
  );
  frontSign.position.set(F.stationMaxX + 1.72, F.roofY + 0.08, 0);
  frontSign.rotation.y = Math.PI / 2;
  shellGroup.add(frontSign);

  // Huge panoramic semi-transparent glass curtain walls (Left, Right, Back)
  for (const sgn of [-1, 1]) {
    const glassWall = new THREE.Mesh(
      new THREE.PlaneGeometry(lenX, F.roofY - 0.4),
      mats.facadeGlass
    );
    glassWall.position.set(midX, F.roofY * 0.5, sgn * F.stationHalfZ);
    shellGroup.add(glassWall);

    // Slim horizontal glass transom mullions at EG/OG floor line (Y = 7.0 m) & Y = 3.5 m
    for (const my of [3.5, F.ogFloorY]) {
      const mullion = new THREE.Mesh(
        new THREE.BoxGeometry(lenX, 0.12, 0.12),
        mats.steelAnthracite
      );
      mullion.position.set(midX, my, sgn * F.stationHalfZ);
      shellGroup.add(mullion);
    }
  }

  // Back panoramic glass wall (behind the two giant vertical Ferris wheels!)
  const backGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(widthZ, F.roofY - 0.4),
    mats.facadeGlass
  );
  backGlass.rotation.y = Math.PI / 2;
  backGlass.position.set(F.stationMinX, F.roofY * 0.5, 0);
  shellGroup.add(backGlass);

  // Front glass upper portal flanking the open ropeway exit slot
  const frontGlassLower = new THREE.Mesh(
    new THREE.PlaneGeometry(4.2, F.ogFloorY - 0.3),
    mats.facadeGlass
  );
  frontGlassLower.rotation.y = Math.PI / 2;
  frontGlassLower.position.set(F.stationMaxX, (F.ogFloorY - 0.3) * 0.5, -4.4);
  shellGroup.add(frontGlassLower);

  const frontGlassLowerR = frontGlassLower.clone();
  frontGlassLowerR.position.z = 4.4;
  shellGroup.add(frontGlassLowerR);

  root.add(shellGroup);

  // =========================================================================
  // 4. FIRST FUNITEL LINE TOWER (STÜTZE 1 AT X = +36.0 m) — 4×12 = 48 SHEAVES!
  // =========================================================================
  const towerGroup = new THREE.Group();
  towerGroup.name = 'Tower1_FunitelStuetze1';
  const towerSheaves = [];

  const t1X = T.tower1X;
  const t1Ground = evalTerrainY(t1X, 0);
  const t1TopY = T.tower1SheaveY;
  const mastHeight = t1TopY - t1Ground + 0.5;

  // Concrete Alpine Foundation
  const t1Found = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 1.9, 4.2),
    mats.concrete
  );
  t1Found.position.set(t1X, t1Ground + 0.3, 0);
  t1Found.castShadow = true;
  t1Found.receiveShadow = true;
  towerGroup.add(t1Found);

  // Heavy Tapered Funitel Tubular Steel Mast
  const t1Mast = new THREE.Mesh(
    new THREE.CylinderGeometry(0.56, 0.94, mastHeight, 8),
    mats.steelGalvanized
  );
  t1Mast.position.set(t1X, t1Ground + mastHeight * 0.5 + 0.4, 0);
  t1Mast.castShadow = true;
  towerGroup.add(t1Mast);

  // Maintenance ladder running up the mast
  const ladderRail = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, mastHeight - 1.2, 0.38),
    mats.steelAnthracite
  );
  ladderRail.position.set(t1X - 0.78, t1Ground + mastHeight * 0.5 + 0.3, 0);
  towerGroup.add(ladderRail);

  // Extra-Wide Funitel Crossarm (Querhaupt spanning ±5.6 m for all 4 parallel haul ropes!)
  const crossarm = new THREE.Mesh(
    new THREE.BoxGeometry(0.76, 0.64, 11.4),
    mats.steelGalvanized
  );
  crossarm.position.set(t1X, t1TopY + 0.42, 0);
  crossarm.castShadow = true;
  towerGroup.add(crossarm);

  // Diagonal under-bracing struts supporting the wide Funitel crossarm
  for (const sgn of [-1, 1]) {
    const brace = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.16, 4.8, 8),
      mats.steelGalvanized
    );
    brace.position.set(t1X, t1TopY - 1.1, sgn * 2.1);
    brace.rotation.x = sgn * 0.88;
    towerGroup.add(brace);
  }

  // Yellow service platform & handrail atop Tower 1
  const t1Walk = new THREE.Mesh(
    new THREE.BoxGeometry(0.78, 0.08, 11.0),
    mats.catwalkGrating
  );
  t1Walk.position.set(t1X - 0.60, t1TopY + 0.80, 0);
  towerGroup.add(t1Walk);

  const t1Rail = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.06, 11.0),
    mats.safetyYellow
  );
  t1Rail.position.set(t1X - 0.96, t1TopY + 1.62, 0);
  towerGroup.add(t1Rail);

  // FOUR 12-Roller Rocking Sheave Batteries (4 × 12 = 48 Tragrollen) at Z = -4.85, -2.95, +2.95, +4.85 m!
  const slopeAngle = Math.atan(0.295);
  const sheaveGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.09, 14);
  sheaveGeo.rotateX(Math.PI / 2);
  const sheaveRimGeo = new THREE.TorusGeometry(0.22, 0.032, 8, 16);

  const ropeZPlanes = [
    { z: -T.outerRopeZ, sideSign: -1 },
    { z: -T.innerRopeZ, sideSign: -1 },
    { z: T.innerRopeZ, sideSign: +1 },
    { z: T.outerRopeZ, sideSign: +1 }
  ];

  for (const rp of ropeZPlanes) {
    const battery = new THREE.Group();
    battery.position.set(t1X, t1TopY - 0.16, rp.z);
    battery.rotation.z = slopeAngle;

    const mainBeam = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 0.22, 0.16),
      mats.doppelmayrRed
    );
    mainBeam.position.set(0, -0.30, -rp.sideSign * 0.14);
    mainBeam.castShadow = true;
    battery.add(mainBeam);

    const count = T.tower1RollersPerRope;
    for (let i = 0; i < count; i++) {
      const sx = -2.1 + (4.2 * i) / (count - 1);
      const wheel = new THREE.Group();
      wheel.position.set(sx, -0.08, 0);
      const disc = new THREE.Mesh(sheaveGeo, mats.steelGalvanized);
      const rim = new THREE.Mesh(sheaveRimGeo, mats.rubberLiner);
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.04, 0.11), mats.steelAnthracite);
      wheel.add(disc, rim, spoke);
      battery.add(wheel);
      towerSheaves.push({ mesh: wheel, sideSign: rp.sideSign });
    }
    towerGroup.add(battery);
  }
  root.add(towerGroup);

  // =========================================================================
  // 5. FOUR PARALLEL BRAIDED 54 mm FUNITEL STEEL HAUL ROPES (2 CONTINUOUS LOOPS!)
  // =========================================================================
  const ropeGroup = new THREE.Group();
  ropeGroup.name = 'FunitelTwinSteelRopes';

  // Inner Funitel rope loop (Z = ±2.95 m -> directly wraps Lower Bullwheel at Y = 10.10 m)
  const buildInnerRopePoints = (sagOffset = 0) => {
    const pts = [];
    const rB = GS_SPECS.bullwheel.radius; // 2.95 m
    const xB = GS_SPECS.bullwheel.centerX;
    const yOG = F.ogRailY;

    for (let i = 0; i <= 24; i++) {
      const ang = -Math.PI * 0.5 - Math.PI * (i / 24);
      pts.push(new THREE.Vector3(xB + rB * Math.cos(ang), yOG, rB * Math.sin(ang)));
    }
    for (let i = 1; i <= 12; i++) {
      const x = xB + (T.portalDeflectorX - xB) * (i / 12);
      pts.push(new THREE.Vector3(x, yOG, T.innerRopeZ));
    }
    for (let i = 1; i <= 42; i++) {
      const x = T.portalDeflectorX + (kin.xTop - T.portalDeflectorX) * (i / 42);
      pts.push(new THREE.Vector3(x, kin.sampleMountainY(x, sagOffset).y, T.innerRopeZ));
    }
    for (let i = 1; i <= 16; i++) {
      const psi = Math.PI * 0.5 - Math.PI * (i / 16);
      pts.push(new THREE.Vector3(kin.xTop + T.innerRopeZ * Math.cos(psi), T.mountainTopY, T.innerRopeZ * Math.sin(psi)));
    }
    for (let i = 1; i <= 42; i++) {
      const x = kin.xTop + (T.portalDeflectorX - kin.xTop) * (i / 42);
      pts.push(new THREE.Vector3(x, kin.sampleMountainY(x, sagOffset).y, -T.innerRopeZ));
    }
    for (let i = 1; i <= 12; i++) {
      const x = T.portalDeflectorX + (xB - T.portalDeflectorX) * (i / 12);
      pts.push(new THREE.Vector3(x, yOG, -T.innerRopeZ));
    }
    return pts;
  };

  // Outer Funitel rope loop (Z = ±4.85 m on mountain line & coupling zones -> deflected via Ablenkscheiben onto Upper Coaxial Bullwheel Y = 10.68 m!)
  const buildOuterRopePoints = (sagOffset = 0) => {
    const pts = [];
    const rB = GS_SPECS.bullwheel.radius; // 2.95 m
    const xB = GS_SPECS.bullwheel.centerX;
    const yUp = GS_SPECS.bullwheel.upperCenterY; // 10.68 m
    const yOG = F.ogRailY;

    // 1. Wrap 180° around Upper Coaxial Bullwheel (Z = -2.95 -> +2.95 at Y = 10.68 m)
    for (let i = 0; i <= 24; i++) {
      const ang = -Math.PI * 0.5 - Math.PI * (i / 24);
      pts.push(new THREE.Vector3(xB + rB * Math.cos(ang), yUp, rB * Math.sin(ang)));
    }
    // 2. Deflect outward via horizontal Funitel deflector sheaves (X = 6.6 -> 9.6 m, Z = +2.95 -> +4.85 m, Y = 10.68 -> 10.10 m)
    pts.push(new THREE.Vector3(6.6, yUp, T.innerRopeZ));
    pts.push(new THREE.Vector3(9.6, yOG, T.outerRopeZ));
    // 3. Outgoing Attach & Check straight (Z = +4.85 m, X = 10.4 -> 15.0 m)
    for (let i = 1; i <= 8; i++) {
      const x = 9.8 + (T.portalDeflectorX - 9.8) * (i / 8);
      pts.push(new THREE.Vector3(x, yOG, T.outerRopeZ));
    }
    // 4. Outgoing mountain catenary (Z = +4.85 m)
    for (let i = 1; i <= 42; i++) {
      const x = T.portalDeflectorX + (kin.xTop - T.portalDeflectorX) * (i / 42);
      pts.push(new THREE.Vector3(x, kin.sampleMountainY(x, sagOffset).y, T.outerRopeZ));
    }
    // 5. Mountain top outer 180° return sheave (R = 4.85 m)
    for (let i = 1; i <= 16; i++) {
      const psi = Math.PI * 0.5 - Math.PI * (i / 16);
      pts.push(new THREE.Vector3(kin.xTop + T.outerRopeZ * Math.cos(psi), T.mountainTopY, T.outerRopeZ * Math.sin(psi)));
    }
    // 6. Incoming mountain catenary (Z = -4.85 m)
    for (let i = 1; i <= 42; i++) {
      const x = kin.xTop + (T.portalDeflectorX - kin.xTop) * (i / 42);
      pts.push(new THREE.Vector3(x, kin.sampleMountainY(x, sagOffset).y, -T.outerRopeZ));
    }
    // 7. Incoming Detach straight (Z = -4.85 m, X = 15.0 -> 9.6 m)
    for (let i = 1; i <= 8; i++) {
      const x = T.portalDeflectorX + (9.6 - T.portalDeflectorX) * (i / 8);
      pts.push(new THREE.Vector3(x, yOG, -T.outerRopeZ));
    }
    // 8. Deflect inward onto Upper Coaxial Bullwheel (-4.85 -> -2.95 m, Y = 10.10 -> 10.68 m)
    pts.push(new THREE.Vector3(6.6, yUp, -T.innerRopeZ));
    return pts;
  };

  const ropeMesh = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(buildInnerRopePoints(0), true), 300, 0.044, 8, true),
    mats.steelRope
  );
  ropeMesh.castShadow = true;
  ropeGroup.add(ropeMesh);

  const outerRopeMesh = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(buildOuterRopePoints(0), true), 320, 0.044, 8, true),
    mats.steelRope
  );
  outerRopeMesh.castShadow = true;
  ropeGroup.add(outerRopeMesh);

  // Station Portal Deflector Sheaves for ALL 4 parallel ropes at X = +15.0 m!
  for (const rp of ropeZPlanes) {
    const defl = new THREE.Group();
    defl.position.set(T.portalDeflectorX, F.ogRailY - 0.25, rp.z);
    const dWheel = new THREE.Mesh(sheaveGeo, mats.steelGalvanized);
    const dRim = new THREE.Mesh(sheaveRimGeo, mats.rubberLiner);
    defl.add(dWheel, dRim);
    ropeGroup.add(defl);
    towerSheaves.push({ mesh: defl, sideSign: rp.sideSign });
  }

  // 4 Funitel Horizontal Deflector Sheaves (Ablenkscheiben) routing outer ropes (±4.85 m) onto Upper Bullwheel (±2.95 m)!
  const ablGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.14, 18);
  for (const sgn of [-1, 1]) {
    for (const [ax, ay, az] of [
      [9.6, F.ogRailY, sgn * T.outerRopeZ],
      [6.6, GS_SPECS.bullwheel.upperCenterY, sgn * T.innerRopeZ]
    ]) {
      const abl = new THREE.Mesh(ablGeo, mats.doppelmayrRed);
      abl.position.set(ax, ay, az);
      ropeGroup.add(abl);
    }
  }
  root.add(ropeGroup);

  // =========================================================================
  // 6. COLOR-CODED VELOCITY & ZONE OVERLAY (TOGGLEABLE LUMINOUS RIBBON)
  // =========================================================================
  const zoneOverlayGroup = new THREE.Group();
  zoneOverlayGroup.name = 'VelocityZoneOverlay';
  zoneOverlayGroup.visible = false;

  const zoneColors = {
    slow: new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0ea5e9, emissiveIntensity: 1.55, roughness: 0.2 }),
    trans: new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 1.55, roughness: 0.2 }),
    fast: new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x22c55e, emissiveIntensity: 1.65, roughness: 0.2 }),
    couple: new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 1.85, roughness: 0.2 })
  };

  const categoryOf = (zone) => {
    if (zone === 'attach' || zone === 'detach') return 'couple';
    if (zone === 'decel' || zone === 'accel') return 'trans';
    if (zone === 'rope_in' || zone === 'rope_out' || zone === 'check') return 'fast';
    return 'slow';
  };

  const loopPts = kin.loop.pts;
  let runCat = null;
  let runPts = [];
  const flushRun = () => {
    if (runPts.length >= 2) {
      const c = new THREE.CatmullRomCurve3(runPts);
      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(c, Math.max(12, runPts.length * 2), 0.115, 8, false),
        zoneColors[runCat]
      );
      zoneOverlayGroup.add(tube);
    }
  };
  for (let i = 0; i < loopPts.length; i++) {
    const p = loopPts[i];
    if (p.x > 40) continue;
    const cat = categoryOf(p.zone);
    const v3 = new THREE.Vector3(p.x, p.y + 0.34, p.z);
    if (cat !== runCat) {
      if (runPts.length) {
        runPts.push(v3.clone());
        flushRun();
      }
      runCat = cat;
      runPts = [v3];
    } else {
      runPts.push(v3);
    }
  }
  flushRun();
  root.add(zoneOverlayGroup);

  return {
    root,
    shellGroup,
    zoneOverlayGroup,
    boardingGates,
    towerSheaves,
    ropeMesh,
    outerRopeMesh,
    buildInnerRopePoints,
    buildOuterRopePoints
  };
}
