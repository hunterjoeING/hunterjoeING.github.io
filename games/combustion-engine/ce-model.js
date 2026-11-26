import * as THREE from 'three';
import { ENGINE_PARTS, CYLINDER_PHASE_OFFSETS, getCylinderStroke } from './ce-data.js?v=0.2.0';

const CYL_X = [-2.1, -0.7, 0.7, 2.1];
const Y_CRANK = -1.45;
const R_CRANK = 0.58;
const L_ROD = 1.92;
const PISTON_CROWN_OFFSET = 0.48;
const Y_ROOF = 1.88;
const R_BORE = 0.54;

/**
 * Erzeugt ein prozedurales Stirnrad (Zahnrad) um die Z-Achse,
 * das anschließend um Y rotiert auf die X-Achse (Kurbel-/Nockenwelle) montiert wird.
 */
function createSprocketGeometry(teeth, outerR, rootR, depth, boreR = 0.1) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const a1 = a0 + step * 0.22;
    const a2 = a0 + step * 0.34;
    const a3 = a0 + step * 0.62;
    const a4 = a0 + step * 0.74;
    if (i === 0) shape.moveTo(Math.cos(a0) * rootR, Math.sin(a0) * rootR);
    else shape.lineTo(Math.cos(a0) * rootR, Math.sin(a0) * rootR);
    shape.lineTo(Math.cos(a1) * rootR, Math.sin(a1) * rootR);
    shape.lineTo(Math.cos(a2) * outerR, Math.sin(a2) * outerR);
    shape.lineTo(Math.cos(a3) * outerR, Math.sin(a3) * outerR);
    shape.lineTo(Math.cos(a4) * rootR, Math.sin(a4) * rootR);
  }
  shape.closePath();
  if (boreR > 0.01) {
    const hole = new THREE.Path();
    hole.absarc(0, 0, boreR, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.014,
    bevelSegments: 2,
    curveSegments: 6
  });
  geo.center();
  return geo;
}

/**
 * Erzeugt eine eiförmige Nocke (Cam Lobe) in der YZ-Ebene, extrudiert entlang X.
 */
function createCamLobeGeometry(baseR = 0.14, noseR = 0.27, width = 0.14) {
  const shape = new THREE.Shape();
  const segs = 28;
  for (let i = 0; i <= segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    // Nockenspitze zeigt bei a = -PI/2 nach unten (-Y)
    const diff = Math.cos(a + Math.PI / 2);
    const lift = diff > 0 ? Math.pow(diff, 2.4) * (noseR - baseR) : 0;
    const r = baseR + lift;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: width,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.01,
    bevelSegments: 2
  });
  geo.center();
  geo.rotateY(Math.PI / 2); // Normale entlang X-Achse
  return geo;
}

/**
 * Erzeugt eine Schraubenfeder (Ventilfeder) entlang der Y-Achse.
 */
function createSpringGeometry(radius = 0.11, height = 0.42, turns = 4.5, tubeR = 0.018) {
  const pts = [];
  const total = 44;
  for (let i = 0; i <= total; i++) {
    const t = i / total;
    const ang = t * turns * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(ang) * radius, t * height, Math.sin(ang) * radius));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  return new THREE.TubeGeometry(curve, 44, tubeR, 7, false);
}

/**
 * Erzeugt gebürstete Metall-Textur für Alu-Guss & Stahl.
 */
function createMetalTexture(baseHex = '#94a3b8') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 2) {
    const alpha = (Math.random() - 0.5) * 0.09;
    ctx.fillStyle = alpha > 0 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${-alpha})`;
    ctx.fillRect(0, y, 256, 1);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function tagPart(obj, partId) {
  obj.traverse(child => {
    if (child.isMesh) {
      child.userData.partId = partId;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}

export function createCombustionEngineModel() {
  const root = new THREE.Group();
  const partGroups = new Map();
  const basePositions = new Map();
  const explodeOffsets = new Map();
  const cutawayMeshes = [];
  const cutawayGhostMeshes = [];
  const xrayRecords = [];
  const xrayWireframes = [];
  const allPartMeshes = new Map();

  const aluTex = createMetalTexture('#b8c4d4');
  const ironTex = createMetalTexture('#475569');

  const mats = {
    castAlu: new THREE.MeshStandardMaterial({
      color: 0xb8c4d4,
      map: aluTex,
      roughness: 0.42,
      metalness: 0.72
    }),
    castAluCut: new THREE.MeshStandardMaterial({
      color: 0xb8c4d4,
      map: aluTex,
      roughness: 0.42,
      metalness: 0.72,
      transparent: true,
      opacity: 1
    }),
    darkMetal: new THREE.MeshStandardMaterial({
      color: 0x334155,
      map: ironTex,
      roughness: 0.46,
      metalness: 0.78
    }),
    darkMetalCut: new THREE.MeshStandardMaterial({
      color: 0x334155,
      map: ironTex,
      roughness: 0.46,
      metalness: 0.78,
      transparent: true,
      opacity: 1
    }),
    machinedSteel: new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      map: aluTex,
      roughness: 0.22,
      metalness: 0.90
    }),
    pistonAlu: new THREE.MeshStandardMaterial({
      color: 0xdbeafe,
      roughness: 0.26,
      metalness: 0.84
    }),
    pistonRing: new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.35,
      metalness: 0.8
    }),
    conrodBronze: new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.30,
      metalness: 0.86
    }),
    crankSteel: new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.28,
      metalness: 0.88
    }),
    valveCoverRed: new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      roughness: 0.34,
      metalness: 0.36,
      transparent: true,
      opacity: 1
    }),
    intakeValve: new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.26,
      metalness: 0.82
    }),
    exhaustValve: new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.28,
      metalness: 0.82
    }),
    ceramic: new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.18,
      metalness: 0.05
    }),
    intakeMat: new THREE.MeshStandardMaterial({
      color: 0x1e3a5f,
      roughness: 0.42,
      metalness: 0.55
    }),
    exhaustMat: new THREE.MeshStandardMaterial({
      color: 0x9a6b4c,
      roughness: 0.32,
      metalness: 0.82,
      emissive: new THREE.Color(0xea580c),
      emissiveIntensity: 0.05,
      transparent: true,
      opacity: 1
    }),
    chainGold: new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.32,
      metalness: 0.84
    }),
    cutEdge: new THREE.MeshStandardMaterial({
      color: 0xf97316,
      roughness: 0.38,
      metalness: 0.2,
      emissive: new THREE.Color(0xf97316),
      emissiveIntensity: 0.22,
      transparent: true,
      opacity: 0
    }),
    xrayShell: new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.13,
      roughness: 0.14,
      metalness: 0.05,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  };

  function registerPartGroup(id, group) {
    partGroups.set(id, group);
    const meta = ENGINE_PARTS.find(p => p.id === id);
    explodeOffsets.set(id, new THREE.Vector3(...(meta?.explodeOffset || [0, 0, 0])));
    root.add(group);
    return group;
  }

  function registerXrayShell(mesh) {
    xrayRecords.push({ mesh, normalMat: mesh.material });
    const edges = new THREE.EdgesGeometry(mesh.geometry, 26);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      depthWrite: false
    });
    const line = new THREE.LineSegments(edges, lineMat);
    mesh.add(line);
    xrayWireframes.push(lineMat);
  }

  // =========================================================================
  // 1. ZYLINDERBLOCK & LAUFBUCHSEN
  // =========================================================================
  const blockGroup = registerPartGroup('block', new THREE.Group());

  // Rückwand & Seitenwände des Motorblocks (bleiben im Cutaway stehen!)
  const blockBackWall = new THREE.Mesh(new THREE.BoxGeometry(5.8, 2.75, 0.34), mats.castAlu.clone());
  blockBackWall.position.set(0, 0.45, -0.78);
  blockGroup.add(blockBackWall);
  registerXrayShell(blockBackWall);

  const blockLeftWall = new THREE.Mesh(new THREE.BoxGeometry(0.32, 2.75, 1.72), mats.castAlu.clone());
  blockLeftWall.position.set(-2.92, 0.45, 0);
  blockGroup.add(blockLeftWall);
  registerXrayShell(blockLeftWall);

  const blockRightWall = new THREE.Mesh(new THREE.BoxGeometry(0.32, 2.75, 1.72), mats.castAlu.clone());
  blockRightWall.position.set(2.92, 0.45, 0);
  blockGroup.add(blockRightWall);
  registerXrayShell(blockRightWall);

  // 4 gehonte Zylinderlaufbuchsen (rückseitige Halbschalen immer sichtbar, vordere im Cutaway offen!)
  CYL_X.forEach(cx => {
    const linerBack = new THREE.Mesh(
      new THREE.CylinderGeometry(R_BORE + 0.05, R_BORE + 0.05, 2.15, 28, 1, true, Math.PI * 0.5, Math.PI),
      mats.darkMetal.clone()
    );
    linerBack.material.side = THREE.DoubleSide;
    linerBack.position.set(cx, 0.72, 0);
    blockGroup.add(linerBack);

    const linerFront = new THREE.Mesh(
      new THREE.CylinderGeometry(R_BORE + 0.05, R_BORE + 0.05, 2.15, 28, 1, true, -Math.PI * 0.5, Math.PI),
      mats.darkMetalCut.clone()
    );
    linerFront.material.side = THREE.DoubleSide;
    linerFront.position.set(cx, 0.72, 0);
    blockGroup.add(linerFront);
    cutawayMeshes.push(linerFront);
    registerXrayShell(linerFront);
  });

  // Hauptlager-Stege unten im Block (5 Lagerböcke)
  [-2.8, -1.4, 0, 1.4, 2.8].forEach(bx => {
    const web = new THREE.Mesh(new THREE.BoxGeometry(0.20, 1.15, 1.48), mats.darkMetal);
    web.position.set(bx, -1.35, -0.05);
    blockGroup.add(web);
  });

  // Vordere Blockwand (verschwindet im Cutaway!)
  const blockFrontWall = new THREE.Mesh(new THREE.BoxGeometry(5.8, 2.75, 0.30), mats.castAluCut.clone());
  blockFrontWall.position.set(0, 0.45, 0.78);
  blockGroup.add(blockFrontWall);
  cutawayMeshes.push(blockFrontWall);
  registerXrayShell(blockFrontWall);

  // Kühlrippen auf Vorderwand (gehören zur Cutaway-Front)
  for (let r = 0; r < 4; r++) {
    const rib = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.08, 0.12), mats.castAluCut.clone());
    rib.position.set(0, -0.25 + r * 0.48, 0.96);
    blockGroup.add(rib);
    cutawayMeshes.push(rib);
  }

  // Schnittkanten-Akzent links/rechts am Block
  const blockCutRimL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.75, 0.14), mats.cutEdge);
  blockCutRimL.position.set(-2.78, 0.45, 0.80);
  blockGroup.add(blockCutRimL);
  const blockCutRimR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.75, 0.14), mats.cutEdge);
  blockCutRimR.position.set(2.78, 0.45, 0.80);
  blockGroup.add(blockCutRimR);

  // =========================================================================
  // 2. KOLBEN & KOLBENRINGE (4×) + VOLUMETRISCHE BRENNRÄUME
  // =========================================================================
  const pistonsGroup = registerPartGroup('pistons', new THREE.Group());
  const pistonNodes = [];
  const gasMeshes = [];
  const sparkFlashes = [];

  const chamberGeo = new THREE.CylinderGeometry(R_BORE - 0.03, R_BORE - 0.03, 1.0, 24);

  CYL_X.forEach((cx, idx) => {
    const pNode = new THREE.Group();
    pNode.position.set(cx, 0.5, 0);

    // Kolbenkörper
    const body = new THREE.Mesh(new THREE.CylinderGeometry(R_BORE - 0.025, R_BORE - 0.03, 0.76, 28), mats.pistonAlu);
    body.position.y = 0.10;
    pNode.add(body);

    // 3 Kolbenringe
    [0.39, 0.30, 0.21].forEach(ry => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(R_BORE - 0.015, 0.018, 8, 28), mats.pistonRing);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = ry;
      pNode.add(ring);
    });

    // Kolbenbolzen
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 0.82, 16), mats.machinedSteel);
    pin.rotation.z = Math.PI / 2;
    pNode.add(pin);

    pistonsGroup.add(pNode);
    pistonNodes.push(pNode);

    // Dynamisches Gas-/Verbrennungsvolumen über dem Kolben
    const gasMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      depthWrite: false
    });
    const gasMesh = new THREE.Mesh(chamberGeo, gasMat);
    gasMesh.position.set(cx, 1.6, 0);
    root.add(gasMesh);
    gasMeshes.push({ mesh: gasMesh, mat: gasMat, cx });

    // Zündfunken-Glühkugel + Lichtblitz pro Zylinder
    const sparkMat = new THREE.MeshBasicMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0,
      depthWrite: false
    });
    const sparkBall = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), sparkMat);
    sparkBall.position.set(cx, Y_ROOF - 0.10, 0);
    root.add(sparkBall);
    sparkFlashes.push({ mesh: sparkBall, mat: sparkMat, idx });
  });

  // =========================================================================
  // 3. PLEUELSTANGEN (4× EXAKTER KURBELTRIEB)
  // =========================================================================
  const conrodsGroup = registerPartGroup('conrods', new THREE.Group());
  const conrodNodes = [];

  CYL_X.forEach(cx => {
    const rod = new THREE.Group();
    rod.position.set(cx, Y_CRANK, 0);

    // Pleuelfuß (Big End um den Hubzapfen bei y = 0)
    const bigEnd = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.28, 20), mats.conrodBronze);
    bigEnd.rotation.z = Math.PI / 2;
    rod.add(bigEnd);

    // I-Profil-Schaft von y = 0 bis y = L_ROD
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.14, L_ROD - 0.26, 0.18), mats.conrodBronze);
    beam.position.y = L_ROD * 0.5;
    rod.add(beam);

    // Pleuelauge (Small End am Kolbenbolzen bei y = L_ROD)
    const smallEnd = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.24, 16), mats.machinedSteel);
    smallEnd.rotation.z = Math.PI / 2;
    smallEnd.position.y = L_ROD;
    rod.add(smallEnd);

    conrodsGroup.add(rod);
    conrodNodes.push(rod);
  });

  // =========================================================================
  // 4. KURBELWELLE & GEGENGEWICHTE (0° - 180° - 180° - 0°)
  // =========================================================================
  const crankGroup = registerPartGroup('crankshaft', new THREE.Group());
  crankGroup.position.set(0, Y_CRANK, 0);
  const crankSpin = new THREE.Group();
  crankGroup.add(crankSpin);

  // Hauptwelle (5 Hauptlagerzapfen)
  const mainAxis = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 6.45, 22), mats.machinedSteel);
  mainAxis.rotation.z = Math.PI / 2;
  crankSpin.add(mainAxis);

  // 4 Hubzapfen + Kurbelwangen + Gegengewichte (180°-Flat-Plane: +1, -1, -1, +1)
  const crankSign = [1, -1, -1, 1];
  CYL_X.forEach((cx, i) => {
    const s = crankSign[i];
    // Hubzapfen bei y = s * R_CRANK
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.44, 18), mats.machinedSteel);
    pin.rotation.z = Math.PI / 2;
    pin.position.set(cx, s * R_CRANK, 0);
    crankSpin.add(pin);

    // Zwei Kurbelwangen + Gegengewichte links & rechts vom Hubzapfen
    [-0.28, 0.28].forEach(dx => {
      const web = new THREE.Mesh(new THREE.BoxGeometry(0.13, R_CRANK + 0.36, 0.42), mats.crankSteel);
      web.position.set(cx + dx, s * (R_CRANK * 0.45), 0);
      crankSpin.add(web);

      const cw = new THREE.Mesh(
        new THREE.CylinderGeometry(0.46, 0.46, 0.14, 16, 1, false, 0, Math.PI),
        mats.darkMetal
      );
      cw.rotation.z = Math.PI / 2;
      cw.rotation.x = s > 0 ? Math.PI : 0;
      cw.position.set(cx + dx, -s * 0.14, 0);
      crankSpin.add(cw);
    });
  });

  // =========================================================================
  // 5. DOHC-ZYLINDERKOPF & VENTILDECKEL
  // =========================================================================
  const headGroup = registerPartGroup('cylinderHead', new THREE.Group());

  // Zylinderkopf-Rückhälfte (immer sichtbar)
  const headBack = new THREE.Mesh(new THREE.BoxGeometry(5.85, 0.98, 0.92), mats.castAlu.clone());
  headBack.position.set(0, 2.36, -0.44);
  headGroup.add(headBack);
  registerXrayShell(headBack);

  // Zylinderkopf-Vorderhälfte (Cutaway!)
  const headFront = new THREE.Mesh(new THREE.BoxGeometry(5.85, 0.98, 0.88), mats.castAluCut.clone());
  headFront.position.set(0, 2.36, 0.46);
  headGroup.add(headFront);
  cutawayMeshes.push(headFront);
  registerXrayShell(headFront);

  // Roter DOHC-Ventildeckel (Rückteil bleibt, Vorderteil öffnet im Cutaway!)
  const vcBack = new THREE.Mesh(new THREE.BoxGeometry(5.72, 0.88, 0.72), mats.valveCoverRed.clone());
  vcBack.position.set(0, 3.30, -0.46);
  headGroup.add(vcBack);
  registerXrayShell(vcBack);

  const vcFront = new THREE.Mesh(new THREE.BoxGeometry(5.72, 0.88, 0.82), mats.valveCoverRed.clone());
  vcFront.position.set(0, 3.30, 0.34);
  headGroup.add(vcFront);
  cutawayMeshes.push(vcFront);
  registerXrayShell(vcFront);

  // =========================================================================
  // 6. DOPPELTE NOCKENWELLEN (DOHC: EINLASS -Z & AUSLASS +Z)
  // =========================================================================
  const camsGroup = registerPartGroup('camshafts', new THREE.Group());
  const intakeCamSpin = new THREE.Group();
  intakeCamSpin.position.set(0, 3.32, -0.34);
  camsGroup.add(intakeCamSpin);

  const exhaustCamSpin = new THREE.Group();
  exhaustCamSpin.position.set(0, 3.32, 0.34);
  camsGroup.add(exhaustCamSpin);

  const camBarGeo = new THREE.CylinderGeometry(0.095, 0.095, 6.25, 16);
  camBarGeo.rotateZ(Math.PI / 2);
  intakeCamSpin.add(new THREE.Mesh(camBarGeo, mats.machinedSteel));
  exhaustCamSpin.add(new THREE.Mesh(camBarGeo, mats.machinedSteel));

  const lobeGeo = createCamLobeGeometry(0.13, 0.25, 0.12);
  CYL_X.forEach((cx, i) => {
    const phaseDeg = CYLINDER_PHASE_OFFSETS[i];
    // Einlass-Maximum bei cycle = 90° => camDeg = -phase/2 + 45°
    const intakeLobeAngle = THREE.MathUtils.degToRad(-(phaseDeg + 90) * 0.5);
    // Auslass-Maximum bei cycle = 630° => camDeg = -(phase + 630)/2
    const exhaustLobeAngle = THREE.MathUtils.degToRad(-(phaseDeg + 630) * 0.5);

    [-0.22, 0.22].forEach(dx => {
      const iLobe = new THREE.Mesh(lobeGeo, mats.intakeValve);
      iLobe.position.set(cx + dx, 0, 0);
      iLobe.rotation.x = intakeLobeAngle;
      intakeCamSpin.add(iLobe);

      const eLobe = new THREE.Mesh(lobeGeo, mats.exhaustValve);
      eLobe.position.set(cx + dx, 0, 0);
      eLobe.rotation.x = exhaustLobeAngle;
      exhaustCamSpin.add(eLobe);
    });
  });

  // =========================================================================
  // 7. 16 VENTILE & VENTILFEDERN
  // =========================================================================
  const valvesGroup = registerPartGroup('valves', new THREE.Group());
  const springGeo = createSpringGeometry(0.09, 0.42, 4.5, 0.015);
  const valveAssemblies = [];

  CYL_X.forEach((cx, cylIdx) => {
    const cylValves = { intake: [], exhaust: [] };
    [-0.22, 0.22].forEach(dx => {
      // Einlassventil (hinten -z, blau)
      const iPivot = new THREE.Group();
      iPivot.position.set(cx + dx, 2.32, -0.25);
      iPivot.rotation.x = -0.18;

      const iMov = new THREE.Group();
      const iStem = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.96, 10), mats.intakeValve);
      iStem.position.y = 0.22;
      iMov.add(iStem);
      const iHead = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 0.06, 16), mats.intakeValve);
      iHead.position.y = -0.26;
      iMov.add(iHead);
      iPivot.add(iMov);

      const iSpring = new THREE.Mesh(springGeo, mats.machinedSteel);
      iSpring.position.y = 0.24;
      iPivot.add(iSpring);

      valvesGroup.add(iPivot);
      cylValves.intake.push({ mover: iMov, spring: iSpring });

      // Auslassventil (vorne +z, bronze)
      const ePivot = new THREE.Group();
      ePivot.position.set(cx + dx, 2.32, 0.25);
      ePivot.rotation.x = 0.18;

      const eMov = new THREE.Group();
      const eStem = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.96, 10), mats.exhaustValve);
      eStem.position.y = 0.22;
      eMov.add(eStem);
      const eHead = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.165, 0.06, 16), mats.exhaustValve);
      eHead.position.y = -0.26;
      eMov.add(eHead);
      ePivot.add(eMov);

      const eSpring = new THREE.Mesh(springGeo, mats.machinedSteel);
      eSpring.position.y = 0.24;
      ePivot.add(eSpring);

      valvesGroup.add(ePivot);
      cylValves.exhaust.push({ mover: eMov, spring: eSpring });
    });
    valveAssemblies[cylIdx] = cylValves;
  });

  // =========================================================================
  // 8. ZÜNDKERZEN (4× ZENTRAL ÜBER JEDEM ZYLINDER)
  // =========================================================================
  const plugsGroup = registerPartGroup('sparkPlugs', new THREE.Group());
  CYL_X.forEach(cx => {
    const plug = new THREE.Group();
    plug.position.set(cx, 2.75, 0);

    const coilCap = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.42, 14), mats.darkMetal);
    coilCap.position.y = 0.72;
    plug.add(coilCap);

    const insulator = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.65, 14), mats.ceramic);
    insulator.position.y = 0.18;
    plug.add(insulator);

    const thread = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.56, 12), mats.machinedSteel);
    thread.position.y = -0.45;
    plug.add(thread);

    const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.16, 8), mats.chainGold);
    tip.position.y = -0.80;
    plug.add(tip);

    plugsGroup.add(plug);
  });

  // =========================================================================
  // 9. ANSAUGKRÜMMER & DROSSELKLAPPE (-Z SEITE)
  // =========================================================================
  const intakeGroup = registerPartGroup('intakeManifold', new THREE.Group());

  // Sammelplenum hinten
  const plenum = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 4.9, 20), mats.intakeMat);
  plenum.rotation.z = Math.PI / 2;
  plenum.position.set(0, 1.85, -1.95);
  intakeGroup.add(plenum);

  // Drosselklappe am Einlassende
  const throttleBody = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.55, 18), mats.machinedSteel);
  throttleBody.rotation.z = Math.PI / 2;
  throttleBody.position.set(-2.72, 1.85, -1.95);
  intakeGroup.add(throttleBody);

  // 4 gebogene Ansaug-Schwingrohre
  CYL_X.forEach(cx => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(cx, 1.85, -1.95),
      new THREE.Vector3(cx, 2.55, -1.65),
      new THREE.Vector3(cx, 2.38, -0.88)
    ]);
    const runner = new THREE.Mesh(new THREE.TubeGeometry(curve, 18, 0.18, 12, false), mats.intakeMat);
    intakeGroup.add(runner);
  });

  // =========================================================================
  // 10. FÄCHERKRÜMMER / ABGASKRÜMMER (+Z SEITE, WIRD IM CUTAWAY GHOSTED!)
  // =========================================================================
  const exhaustGroup = registerPartGroup('exhaustManifold', new THREE.Group());
  const exhaustMeshes = [];

  CYL_X.forEach(cx => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(cx, 2.26, 0.88),
      new THREE.Vector3(cx, 2.12, 1.72),
      new THREE.Vector3(cx * 0.42, 1.15, 2.02),
      new THREE.Vector3(0.0, 0.35, 2.15)
    ]);
    const pipe = new THREE.Mesh(new THREE.TubeGeometry(curve, 22, 0.155, 12, false), mats.exhaustMat);
    exhaustGroup.add(pipe);
    exhaustMeshes.push(pipe);
    cutawayGhostMeshes.push(pipe);
    registerXrayShell(pipe);
  });

  // 4-in-1 Sammler + Abgasrohr
  const collector = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 1.35, 16), mats.exhaustMat);
  collector.position.set(0, -0.35, 2.15);
  exhaustGroup.add(collector);
  exhaustMeshes.push(collector);
  cutawayGhostMeshes.push(collector);
  registerXrayShell(collector);

  // =========================================================================
  // 11. STEUERKETTE & STIRNRÄDER (FRONT X = -3.18, 1:2 ÜBERSETZUNG)
  // =========================================================================
  const timingGroup = registerPartGroup('timingDrive', new THREE.Group());

  // Kurbelwellen-Ritzel (12 Zähne)
  const crankSprocket = new THREE.Mesh(createSprocketGeometry(12, 0.36, 0.29, 0.16, 0.12), mats.chainGold);
  crankSprocket.rotation.y = Math.PI / 2;
  crankSprocket.position.set(-3.16, Y_CRANK, 0);
  timingGroup.add(crankSprocket);

  // Zwei doppelt so große Nockenwellen-Stirnräder (24 Zähne -> exakte 1:2 Untersetzung!)
  const intakeCamGear = new THREE.Mesh(createSprocketGeometry(24, 0.60, 0.52, 0.16, 0.12), mats.intakeValve);
  intakeCamGear.rotation.y = Math.PI / 2;
  intakeCamGear.position.set(-3.16, 3.32, -0.38);
  timingGroup.add(intakeCamGear);

  const exhaustCamGear = new THREE.Mesh(createSprocketGeometry(24, 0.60, 0.52, 0.16, 0.12), mats.exhaustValve);
  exhaustCamGear.rotation.y = Math.PI / 2;
  exhaustCamGear.position.set(-3.16, 3.32, 0.38);
  timingGroup.add(exhaustCamGear);

  // Geschlossene Steuerketten-Kontur um alle 3 Räder
  const chainCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-3.16, Y_CRANK - 0.35, 0.0),
      new THREE.Vector3(-3.16, Y_CRANK + 0.12, 0.38),
      new THREE.Vector3(-3.16, 1.15, 0.66),
      new THREE.Vector3(-3.16, 3.35, 0.96),
      new THREE.Vector3(-3.16, 3.92, 0.38),
      new THREE.Vector3(-3.16, 3.92, -0.38),
      new THREE.Vector3(-3.16, 3.35, -0.96),
      new THREE.Vector3(-3.16, 1.15, -0.66),
      new THREE.Vector3(-3.16, Y_CRANK + 0.12, -0.38)
    ],
    true
  );
  const chainMesh = new THREE.Mesh(new THREE.TubeGeometry(chainCurve, 72, 0.055, 8, true), mats.chainGold);
  timingGroup.add(chainMesh);

  // Kettenspanner-Rolle
  const tensioner = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 0.18, 16), mats.darkMetal);
  tensioner.rotation.z = Math.PI / 2;
  tensioner.position.set(-3.16, 0.85, 0.82);
  timingGroup.add(tensioner);

  // =========================================================================
  // 12. SCHWUNGRAD & ÖLWANNE
  // =========================================================================
  const flywheelOilGroup = registerPartGroup('flywheelOilpan', new THREE.Group());

  // Verzahntes Schwungrad am hinteren Kurbelwellenende (x = +3.28)
  const flywheelSpin = new THREE.Group();
  flywheelSpin.position.set(3.32, Y_CRANK, 0);
  const fwGear = new THREE.Mesh(createSprocketGeometry(40, 1.48, 1.38, 0.28, 0.20), mats.darkMetal);
  fwGear.rotation.y = Math.PI / 2;
  flywheelSpin.add(fwGear);
  const fwRing = new THREE.Mesh(new THREE.CylinderGeometry(1.12, 1.12, 0.32, 28), mats.machinedSteel);
  fwRing.rotation.z = Math.PI / 2;
  flywheelSpin.add(fwRing);
  // 6 Entlastungsbohrungen optisch als Kontrast-Bolzen
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.36, 12), mats.chainGold);
    bolt.rotation.z = Math.PI / 2;
    bolt.position.set(0, Math.cos(a) * 0.72, Math.sin(a) * 0.72);
    flywheelSpin.add(bolt);
  }
  flywheelOilGroup.add(flywheelSpin);

  // Ölwanne unter dem Kurbelgehäuse (hintere Hälfte bleibt, vordere öffnet im Cutaway!)
  const panBack = new THREE.Mesh(new THREE.BoxGeometry(5.9, 1.12, 0.84), mats.darkMetal.clone());
  panBack.position.set(0, -2.42, -0.42);
  flywheelOilGroup.add(panBack);
  registerXrayShell(panBack);

  const panBottom = new THREE.Mesh(new THREE.BoxGeometry(5.9, 0.18, 1.68), mats.darkMetal.clone());
  panBottom.position.set(0, -2.92, 0);
  flywheelOilGroup.add(panBottom);

  const panFront = new THREE.Mesh(new THREE.BoxGeometry(5.9, 1.12, 0.84), mats.darkMetalCut.clone());
  panFront.position.set(0, -2.42, 0.42);
  flywheelOilGroup.add(panFront);
  cutawayMeshes.push(panFront);
  registerXrayShell(panFront);

  // =========================================================================
  // ANIMIERTER GASFLUSS (FRISCHLUFT BLAU & ABGAS ORANGE)
  // =========================================================================
  const flowGroup = new THREE.Group();
  const particleGeo = new THREE.SphereGeometry(0.075, 10, 10);
  const intakeParticles = [];
  const exhaustParticles = [];

  for (let c = 0; c < 4; c++) {
    for (let k = 0; k < 4; k++) {
      const iMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });
      const im = new THREE.Mesh(particleGeo, iMat);
      flowGroup.add(im);
      intakeParticles.push({ mesh: im, mat: iMat, cyl: c, offset: k / 4 });

      const eMat = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.85 });
      const em = new THREE.Mesh(particleGeo, eMat);
      flowGroup.add(em);
      exhaustParticles.push({ mesh: em, mat: eMat, cyl: c, offset: k / 4 });
    }
  }
  root.add(flowGroup);

  // =========================================================================
  // STUDIO-SOCKEL
  // =========================================================================
  const basePlate = new THREE.Mesh(
    new THREE.CylinderGeometry(6.8, 7.1, 0.24, 64),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.78, metalness: 0.15 })
  );
  basePlate.position.y = -3.65;
  basePlate.receiveShadow = true;
  root.add(basePlate);

  const ringAccent = new THREE.Mesh(
    new THREE.RingGeometry(6.35, 6.52, 64),
    new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
  );
  ringAccent.rotation.x = -Math.PI / 2;
  ringAccent.position.y = -3.52;
  root.add(ringAccent);

  // Tag alle Baugruppen für Klick-Raycasting + Basispositionen sichern
  for (const [id, group] of partGroups.entries()) {
    basePositions.set(id, group.position.clone());
    tagPart(group, id);
    const meshes = [];
    group.traverse(child => {
      if (child.isMesh) meshes.push(child);
    });
    allPartMeshes.set(id, meshes);
  }

  // Zustand
  const state = {
    viewMode: 'cutaway',
    explodeTarget: 0,
    explodeCurrent: 0,
    cutawayTarget: 1,
    cutawayCurrent: 1,
    xrayTarget: 0,
    xrayCurrent: 0,
    crankDeg: 25,
    selectedPart: null,
    showFlow: true
  };

  function setViewMode(mode) {
    state.viewMode = mode;
    state.explodeTarget = mode === 'exploded' ? 1 : 0;
    state.cutawayTarget = mode === 'cutaway' ? 1 : 0;
    state.xrayTarget = mode === 'xray' ? 1 : 0;
  }

  function setSelectedPart(partId) {
    state.selectedPart = partId;
    for (const [id, meshes] of allPartMeshes.entries()) {
      const active = partId && id === partId;
      for (const m of meshes) {
        if (!m.material || !m.material.emissive) continue;
        if (m.material === mats.exhaustMat || m.material === mats.cutEdge) continue;
        if (active) {
          m.material.emissive.setHex(0xea580c);
          m.material.emissiveIntensity = 0.36;
        } else {
          m.material.emissive.setHex(0x000000);
          m.material.emissiveIntensity = 0;
        }
      }
    }
  }

  function setFlowVisible(visible) {
    state.showFlow = visible;
    flowGroup.visible = visible;
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    basePlate.material.color.setHex(isDark ? 0x162033 : 0xdbe3ee);
    ringAccent.material.color.setHex(isDark ? 0xf97316 : 0xc2410c);
    mats.xrayShell.color.setHex(isDark ? 0x38bdf8 : 0x1d4ed8);
    xrayWireframes.forEach(m => m.color.setHex(isDark ? 0x38bdf8 : 0x1e40af));
  }

  function getPartWorldAnchor(partId) {
    const meta = ENGINE_PARTS.find(p => p.id === partId);
    const group = partGroups.get(partId);
    if (!meta || !group) return new THREE.Vector3();
    const base = basePositions.get(partId);
    const delta = group.position.clone().sub(base);
    return new THREE.Vector3(...meta.anchor).add(delta);
  }

  const colorIntake = new THREE.Color(0x38bdf8);
  const colorCompress = new THREE.Color(0xfacc15);
  const colorFlame = new THREE.Color(0xff5500);
  const colorExhaust = new THREE.Color(0x94a3b8);
  const tmpColor = new THREE.Color();

  function update(dt, telemetry, timeScale = 0.16) {
    const viewDt = Math.min(0.25, dt);
    const clampedDt = Math.min(0.05, dt);

    // 1) Sanfte, zügige Übergänge Cutaway / X-Ray / Exploded
    const lerp = Math.min(1, viewDt * 8.5);
    state.explodeCurrent += (state.explodeTarget - state.explodeCurrent) * lerp;
    state.cutawayCurrent += (state.cutawayTarget - state.cutawayCurrent) * lerp;
    state.xrayCurrent += (state.xrayTarget - state.xrayCurrent) * lerp;
    if (Math.abs(state.explodeTarget - state.explodeCurrent) < 0.015) state.explodeCurrent = state.explodeTarget;
    if (Math.abs(state.cutawayTarget - state.cutawayCurrent) < 0.015) state.cutawayCurrent = state.cutawayTarget;
    if (Math.abs(state.xrayTarget - state.xrayCurrent) < 0.015) state.xrayCurrent = state.xrayTarget;

    for (const [id, group] of partGroups.entries()) {
      const base = basePositions.get(id);
      const off = explodeOffsets.get(id);
      group.position.copy(base).addScaledVector(off, state.explodeCurrent);
    }

    const useXray = state.xrayCurrent > 0.18;
    mats.xrayShell.opacity = 0.06 + state.xrayCurrent * 0.12;
    for (const rec of xrayRecords) {
      rec.mesh.material = useXray ? mats.xrayShell : rec.normalMat;
    }
    for (const lineMat of xrayWireframes) {
      lineMat.opacity = state.xrayCurrent * 0.62;
    }

    const cutAlpha = 1 - state.cutawayCurrent;
    for (const mesh of cutawayMeshes) {
      if (useXray) {
        mesh.visible = true;
      } else {
        mesh.visible = cutAlpha > 0.04;
        if (mesh.material && mesh.material !== mats.xrayShell) {
          const wantTrans = state.cutawayCurrent > 0.01;
          if (mesh.material.transparent !== wantTrans) {
            mesh.material.transparent = wantTrans;
            mesh.material.needsUpdate = true;
          }
          mesh.material.opacity = cutAlpha;
          mesh.material.depthWrite = !wantTrans;
        }
      }
    }

    // Fächerkrümmer wird im Cutaway halbtransparent "geghosted", damit die 4 Zylinder frei sichtbar bleiben!
    const exhaustCutOpacity = 1 - state.cutawayCurrent * 0.86;
    for (const mesh of cutawayGhostMeshes) {
      if (!useXray) {
        const wantTrans = state.cutawayCurrent > 0.02;
        if (mesh.material.transparent !== wantTrans) {
          mesh.material.transparent = wantTrans;
          mesh.material.needsUpdate = true;
        }
        mesh.material.opacity = exhaustCutOpacity;
        mesh.material.depthWrite = !wantTrans;
      }
    }
    mats.cutEdge.opacity = state.cutawayCurrent * (1 - state.xrayCurrent);

    // 2) Kurbelwinkel fortschreiben (RPM * 6 deg/s * timeScale für perfekte Sichtbarkeit)
    // Bei 2400 RPM & timeScale 0.15 => 2160 deg/s * ... -> wir nutzen eine sanfte Explainer-Kurve:
    // ~1.4 bis 6.5 U/s visuell * timeScale, proportional zur realen Drehzahl!
    const visualDegPerSec = (telemetry.rpm / 60) * 360 * 0.045 * (timeScale / 0.16);
    state.crankDeg = (state.crankDeg + visualDegPerSec * clampedDt) % 720;
    const crankRad = THREE.MathUtils.degToRad(state.crankDeg);

    // Kurbelwelle, Schwungrad & Steuertrieb (exakte 1:2 Übersetzung!)
    crankSpin.rotation.x = crankRad;
    flywheelSpin.rotation.x = crankRad;
    crankSprocket.rotation.x = crankRad;
    intakeCamSpin.rotation.x = crankRad * 0.5;
    exhaustCamSpin.rotation.x = crankRad * 0.5;
    intakeCamGear.rotation.x = crankRad * 0.5;
    exhaustCamGear.rotation.x = crankRad * 0.5;

    // Abgaskrümmer glüht bei hohen Drehzahlen subtil wärmer
    const rpmNorm = telemetry.rpm / 7000;
    mats.exhaustMat.emissiveIntensity = 0.04 + Math.pow(rpmNorm, 2.2) * 0.55;

    // 3) Exakte 4-Takt-Kinematik pro Zylinder (Kolben, Pleuel, Ventile, Brennraum, Funke)
    const strokes = [];
    const pistonDeltaY = pistonsGroup.position.y - basePositions.get('pistons').y;
    const headDeltaY = headGroup.position.y - basePositions.get('cylinderHead').y;

    for (let i = 0; i < 4; i++) {
      const stroke = getCylinderStroke(state.crankDeg, i);
      strokes.push(stroke);

      const theta = THREE.MathUtils.degToRad(state.crankDeg + CYLINDER_PHASE_OFFSETS[i]);
      const zc = R_CRANK * Math.sin(theta);
      const yc = Y_CRANK + R_CRANK * Math.cos(theta);
      const yp = yc + Math.sqrt(Math.max(0.01, L_ROD * L_ROD - zc * zc));
      const rodAngle = Math.atan2(-zc, yp - yc);

      // Kolben
      pistonNodes[i].position.y = yp;

      // Pleuel (Fuß am Hubzapfen, Neigung exakt zum Kolbenbolzen)
      conrodNodes[i].position.set(CYL_X[i], yc, zc);
      conrodNodes[i].rotation.x = rodAngle;

      // Ventile & Ventilfedern
      const va = valveAssemblies[i];
      for (const iv of va.intake) {
        iv.mover.position.y = -stroke.intakeLift * 0.24;
        iv.spring.scale.y = 1 - stroke.intakeLift * 0.32;
      }
      for (const ev of va.exhaust) {
        ev.mover.position.y = -stroke.exhaustLift * 0.24;
        ev.spring.scale.y = 1 - stroke.exhaustLift * 0.32;
      }

      // Volumetrische Brennraum-Visualisierung (passt sich exakt zwischen Kolbenboden & Zylinderkopf an!)
      const crownWorldY = yp + PISTON_CROWN_OFFSET + pistonDeltaY * 0.5;
      const roofWorldY = Y_ROOF + headDeltaY * 0.25;
      const chamberH = Math.max(0.14, roofWorldY - crownWorldY);
      const gm = gasMeshes[i];
      gm.mesh.position.set(CYL_X[i], crownWorldY + chamberH * 0.5, 0);
      gm.mesh.scale.set(1, chamberH, 1);

      const engineRunning = telemetry.rpm >= 200;
      gm.mesh.visible = engineRunning && state.explodeCurrent < 0.72;
      if (engineRunning) {
        if (stroke.key === 'intake') {
          gm.mat.color.copy(colorIntake);
          gm.mat.opacity = 0.16 + stroke.intakeMist * 0.28;
        } else if (stroke.key === 'compression') {
          const t = (stroke.cycle - 180) / 180;
          tmpColor.copy(colorIntake).lerp(colorCompress, t);
          gm.mat.color.copy(tmpColor);
          gm.mat.opacity = 0.28 + t * 0.42;
        } else if (stroke.key === 'power') {
          tmpColor.copy(colorFlame).lerp(colorCompress, 0.25);
          gm.mat.color.copy(tmpColor);
          gm.mat.opacity = 0.22 + stroke.flameIntensity * 0.72;
        } else {
          gm.mat.color.copy(colorExhaust);
          gm.mat.opacity = 0.15 + stroke.exhaustGas * 0.34;
        }
      }

      // Zündfunken-Blitz
      const sf = sparkFlashes[i];
      const showSpark = engineRunning && stroke.sparkIntensity > 0.05 && state.explodeCurrent < 0.7;
      sf.mesh.visible = showSpark;
      if (showSpark) {
        sf.mesh.position.set(CYL_X[i], roofWorldY - 0.08, 0);
        sf.mat.opacity = stroke.sparkIntensity;
        sf.mesh.scale.setScalar(0.6 + stroke.sparkIntensity * 1.15);
      }
    }

    // 4) Animierte Frischgas- & Abgas-Partikel in den Krümmern
    if (state.showFlow && telemetry.rpm >= 200 && state.explodeCurrent < 0.55) {
      flowGroup.visible = true;
      for (const p of intakeParticles) {
        const st = strokes[p.cyl];
        const active = st.key === 'intake';
        p.mesh.visible = active;
        if (active) {
          const t = ((st.cycle / 180) + p.offset) % 1;
          const z = -1.95 + t * 1.75;
          const y = 2.0 + Math.sin(t * Math.PI) * 0.42 - t * 0.25;
          p.mesh.position.set(CYL_X[p.cyl], y, z);
          p.mat.opacity = Math.sin(t * Math.PI) * 0.85;
        }
      }
      for (const p of exhaustParticles) {
        const st = strokes[p.cyl];
        const active = st.key === 'exhaust';
        p.mesh.visible = active;
        if (active) {
          const t = (((st.cycle - 540) / 180) + p.offset) % 1;
          const x = CYL_X[p.cyl] * (1 - t * 0.92);
          const z = 0.75 + t * 1.42;
          const y = 2.24 - t * 2.4;
          p.mesh.position.set(x, y, z);
          p.mat.opacity = Math.sin(t * Math.PI) * 0.85;
        }
      }
    } else {
      flowGroup.visible = false;
    }

    return { crankDeg: state.crankDeg, strokes };
  }

  return {
    root,
    setViewMode,
    setSelectedPart,
    setFlowVisible,
    applyTheme,
    getPartWorldAnchor,
    update
  };
}
