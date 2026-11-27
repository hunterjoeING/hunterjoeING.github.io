import * as THREE from 'three';
import {
  DEFAULT_PROFILE,
  getEnginePartsForProfile,
  getCylinderStroke,
  ignitionWindow, SPARK_SECONDS,
  IGNITION_WINDOW_DEG
} from './ce-data.js?v=0.5.2';
import { createExplosionSystem } from './ce-explosion.js?v=0.5.2';

import { BASE_RADIUS, BUCKET_TOP, CAM_Y, CAM_Z, MAX_LIFT, SEAT_Y as LOCAL_Y_ROOF,
  CRANK_RADIUS as R_CRANK, ROD_LENGTH as L_ROD, CROWN_OFFSET as PISTON_CROWN_OFFSET,
  BLOCK_END_MARGIN, CAM_OVERHANG, END_WALL_WIDTH, NOSE_RADIUS, WHEEL_WIDTH,
  WRIST_PIN_RADIUS, camOutline, displayCrankSpeed, intakeSign, timingMounts } from './ce-mechanics.js?v=0.5.2';
import { buildConrods, installCrankshaft } from './ce-crankshaft.js?v=0.5.2';
import { createFlame, createSpark, PLUG_TIP_Y, updateIgnition, updateSpark } from './ce-ignition.js?v=0.5.2';
import { installBelts } from './ce-belt.js?v=0.5.2';
import { installOilPan } from './ce-oil-pan.js?v=0.5.2';
import { buildPlumbing, DIESEL_NOZZLE_Y } from './ce-plumbing.js?v=0.5.2';
import { installDucts } from './ce-ducts.js?v=0.5.2';
import { createTracers, tracerBudget } from './ce-tracers.js?v=0.5.2';
import { throttleAngle } from './ce-throttle.js?v=0.5.2';

const R_BORE = 0.54;
const BOWL_EDGE_RADIUS = 0.055;
const BOWL_EDGE_TOP = 0.47 + BOWL_EDGE_RADIUS;

/**
 * Erzeugt ein prozedurales Stirnrad (Zahnrad) um die Z-Achse,
 * das anschließend um Y rotiert auf die X-Achse montiert wird.
 */
function createSprocketGeometry(teeth, outerR, rootR, depth, boreR = 0.1, bevel = true) {
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
    bevelEnabled: bevel,
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
 * Nockenspitze zeigt bei rotX = 0 exakt nach unten (-Y, drückt das Ventil auf).
 */
function createCamLobeGeometry(width) {
  const shape = new THREE.Shape();
  for (const [i, p] of camOutline().entries()) {
    if (i === 0) shape.moveTo(-p.z, p.y);
    else shape.lineTo(-p.z, p.y);
  }
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, { depth: width, bevelEnabled: false })
    .translate(0, 0, -width / 2).rotateY(Math.PI / 2);
}

/**
 * Erzeugt eine Schraubenfeder (Ventilfeder) entlang der Y-Achse.
 */
function createSpringGeometry(radius = 0.09, height = 0.42, turns = 4.5, tubeR = 0.015) {
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
 * Erzeugt ein Schaufelrad (Turbinen- oder Verdichterrad für den Turbolader).
 */
function createImpellerGroup(blades, outerR, hubR, depth, mat) {
  const g = new THREE.Group();
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(hubR * 0.72, hubR, depth, 16), mat);
  hub.rotation.z = Math.PI / 2;
  g.add(hub);
  const bladeGeo = new THREE.BoxGeometry(depth * 0.86, outerR - hubR * 0.6, 0.032);
  for (let i = 0; i < blades; i++) {
    const a = (i / blades) * Math.PI * 2;
    const holder = new THREE.Group();
    holder.rotation.x = a;
    const b = new THREE.Mesh(bladeGeo, mat);
    b.position.y = hubR * 0.55 + (outerR - hubR * 0.6) * 0.5;
    b.rotation.y = 0.45;
    holder.add(b);
    g.add(holder);
  }
  return g;
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

function disposeObjectTree(group) {
  const geometries = new Set();
  const materials = new Set();
  group.traverse(child => {
    if (child.isInstancedMesh) child.dispose();
    if (child.geometry) geometries.add(child.geometry);
    if (child.material) {
      if (Array.isArray(child.material)) child.material.forEach(m => materials.add(m));
      else materials.add(child.material);
    }
  });
  geometries.forEach(g => g.dispose());
  materials.forEach(m => m.dispose());
}

export function createCombustionEngineModel(initialProfile = DEFAULT_PROFILE, environment = null) {
  const root = new THREE.Group();
  const engineHolder = new THREE.Group();
  root.add(engineHolder);

  const aluTex = createMetalTexture('#b8c4d4');
  const ironTex = createMetalTexture('#475569');

  // Studio-Sockel (bleibt über Motorwechsel hinweg bestehen)
  const basePlate = new THREE.Mesh(
    new THREE.CylinderGeometry(7.2, 7.5, 0.24, 64),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.78, metalness: 0.15 })
  );
  basePlate.position.y = -3.65;
  basePlate.receiveShadow = true;
  root.add(basePlate);

  const ringAccent = new THREE.Mesh(
    new THREE.RingGeometry(6.72, 6.9, 64),
    new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
  );
  ringAccent.rotation.x = -Math.PI / 2;
  ringAccent.position.y = -3.52;
  root.add(ringAccent);

  const explosionSys = createExplosionSystem(root);

  const state = {
    profile: initialProfile,
    viewMode: 'cutaway',
    cutawayTarget: 1,
    cutawayCurrent: 1,
    xrayTarget: 0,
    xrayCurrent: 0,
    crankDeg: 25,
    crankClock: 25,
    turboSpinRad: 0,
    selectedPart: null,
    showFlow: true,
    gasDensity: 100,
    theme: 'light'
  };

  let built = null;

  function buildAssembly(profile) {
    if (built) {
      explosionSys.reset(built.partGroups, built.basePositions);
      built.belts.texture.dispose();
      // Dispose the original skins even if the outgoing assembly is in X-ray.
      for (const rec of built.xrayRecords) rec.mesh.material = rec.normalMat;
      built.xrayShellMat.dispose();
      built.xrayFocusMat.dispose();
      disposeObjectTree(built.assemblyRoot);
      engineHolder.remove(built.assemblyRoot);
    }

    const { layout, concept } = profile;
    const isBoxer = layout.id === 'boxer4';
    const isV = layout.id === 'v6' || layout.id === 'v8';
    const isDiesel = concept.directInjection;
    const plumbing = buildPlumbing(profile);
    const yCrank = plumbing.y0;
    const cylSpecs = layout.cylinderSpecs;
    const partsMeta = getEnginePartsForProfile(profile);

    const assemblyRoot = new THREE.Group();
    engineHolder.add(assemblyRoot);

    const partGroups = new Map();
    const basePositions = new Map();
    const partAnchors = new Map();
    const cutawayMeshes = [];
    const cutawayGhostMeshes = [];
    const xrayRecords = [];
    const highlightableByPart = new Map();

    // Basismaterialien (werden pro Baugruppe geklont, sodass Highlighting nie über Teile leckt!)
    const sharedTemplates = {
      castAlu: new THREE.MeshStandardMaterial({ color: 0xb8c4d4, map: aluTex, roughness: 0.42, metalness: 0.72 }),
      castAluCut: new THREE.MeshStandardMaterial({ color: 0xb8c4d4, map: aluTex, roughness: 0.42, metalness: 0.72, transparent: true, opacity: 1 }),
      darkMetal: new THREE.MeshStandardMaterial({ color: 0x334155, map: ironTex, roughness: 0.46, metalness: 0.78 }),
      darkMetalCut: new THREE.MeshStandardMaterial({ color: 0x334155, map: ironTex, roughness: 0.46, metalness: 0.78, transparent: true, opacity: 1 }),
      machinedSteel: new THREE.MeshStandardMaterial({ color: 0xe2e8f0, map: aluTex, roughness: 0.22, metalness: 0.90 }),
      pistonAlu: new THREE.MeshStandardMaterial({ color: isDiesel ? 0xcbd5e1 : 0xdbeafe, roughness: 0.26, metalness: 0.84 }),
      pistonRing: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35, metalness: 0.8 }),
      conrodBronze: new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.30, metalness: 0.86 }),
      crankSteel: new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.28, metalness: 0.88 }),
      valveCover: new THREE.MeshStandardMaterial({
        color: isDiesel ? 0x1d4ed8 : 0xb91c1c,
        roughness: 0.32,
        metalness: isDiesel ? 0.55 : 0.36,
        transparent: true,
        opacity: 1
      }),
      intakeValve: new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.26, metalness: 0.82 }),
      exhaustValve: new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.28, metalness: 0.82 }),
      ceramic: new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.18, metalness: 0.05 }),
      intakeMat: new THREE.MeshStandardMaterial({ color: isDiesel ? 0x0f4c81 : 0x1e3a5f, roughness: 0.38, metalness: 0.58 }),
      turboColdMat: new THREE.MeshStandardMaterial({ color: 0xdbeafe, map: aluTex, roughness: 0.22, metalness: 0.88 }),
      chargePipeMat: new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.28,
        metalness: 0.65,
        emissive: new THREE.Color(0x0284c7),
        emissiveIntensity: 0.08
      }),
      exhaustPipe: new THREE.MeshStandardMaterial({ color: 0x96684f, metalness: 0.57, roughness: 0.42, emissive: 0xea580c, emissiveIntensity: 0.05 }),
      fuelPipe: new THREE.MeshStandardMaterial({ color: 0xb78b55, metalness: 0.58, roughness: 0.40 }),
      chainGold: new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.32, metalness: 0.84 })
    };

    const cutEdgeMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      roughness: 0.38,
      metalness: 0.2,
      emissive: new THREE.Color(0xf97316),
      emissiveIntensity: 0.22,
      transparent: true,
      depthWrite: false,
      opacity: 0
    });

    // The built-in grayscale matcap gradient keeps curved housings readable
    // without picking up the warm rim light or the cool studio hemisphere.
    const xrayShellMat = new THREE.MeshMatcapMaterial({
      name: 'xraySmoke', color: 0x555555, transparent: true, opacity: 0.13,
      side: THREE.DoubleSide, forceSinglePass: true, depthWrite: false, fog: false
    });
    const xrayFocusMat = xrayShellMat.clone();
    xrayFocusMat.name = 'xrayFocus';
    const xrayEdgeMat = new THREE.LineBasicMaterial({
      name: 'xrayEdges', color: 0x727272, transparent: true, opacity: 0,
      depthWrite: false, fog: false
    });

    // Pro Baugruppe eigener Material-Pool (verhindert Cross-Part-Highlight-Leaks!)
    const partMatCache = new Map();
    function getPartMat(partId, templateKey, shell = false) {
      const key = `${partId}:${templateKey}:${shell}`;
      if (!partMatCache.has(key)) {
        const cloned = sharedTemplates[templateKey].clone();
        if (shell) cloned.side = THREE.DoubleSide;
        partMatCache.set(key, cloned);
        if (!highlightableByPart.has(partId)) highlightableByPart.set(partId, []);
        highlightableByPart.get(partId).push({
          mat: cloned,
          baseEmissiveHex: cloned.emissive ? cloned.emissive.getHex() : 0x000000,
          baseEmissiveIntensity: cloned.emissiveIntensity || 0
        });
      }
      return partMatCache.get(key);
    }

    function registerPartGroup(id, group, anchor) {
      partGroups.set(id, group);
      const meta = partsMeta.find(p => p.id === id);
      partAnchors.set(id, new THREE.Vector3(...(anchor || meta?.anchor || [0, 0, 0])));
      assemblyRoot.add(group);
      return group;
    }

    function registerXrayShell(mesh, outline = true) {
      let line = null;
      if (outline) {
        line = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 26), xrayEdgeMat);
        line.visible = false;
        mesh.add(line);
      }
      xrayRecords.push({ mesh, normalMat: mesh.material, line });
    }

    // Hilfsfunktion: Erzeugt pro Bank eine lokale Transformationsgruppe bei (0, yCrank, 0) rotiert um X
    function createBankFrames(parentGroup) {
      return layout.bankAnglesDeg.map(deg => {
        const g = new THREE.Group();
        g.position.set(0, yCrank, 0);
        g.rotation.x = THREE.MathUtils.degToRad(deg);
        parentGroup.add(g);
        return g;
      });
    }

    // Welche lokale Z-Seite (+1 oder -1) wird im Cutaway geöffnet, damit man optimal hineinsieht?
    function cutawaySideForBank(bankAngleDeg) {
      if (isBoxer) {
        // Bank -90°: +Z zeigt nach oben (+Y); Bank +90°: -Z zeigt nach oben (+Y)
        return bankAngleDeg < 0 ? 1 : -1;
      }
      // Für R4 & V6/V8 zeigt +Z nach vorne zum Betrachter
      return 1;
    }

    // =========================================================================
    // 1. ZYLINDERBLOCK & LAUFBUCHSEN (PARAMETRISCH PRO BANK)
    // =========================================================================
    const blockGroup = registerPartGroup('block', new THREE.Group(), isBoxer ? [0, -0.35, 1.35] : [0, 0.25, 0.85]);
    const blockBankFrames = createBankFrames(blockGroup);

    const xMin = Math.min(...cylSpecs.map(c => c.x));
    const xMax = Math.max(...cylSpecs.map(c => c.x));
    const blockSpanX = (xMax - xMin) + 2 * BLOCK_END_MARGIN;

    // Pro Zylinderbank: Blockwände + gehonte Laufbuchsen (Rückseite fest, Cutaway-Seite öffnet!)
    layout.bankAnglesDeg.forEach((bankDeg, bankIdx) => {
      const bf = blockBankFrames[bankIdx];
      const bankCyls = cylSpecs.filter(c => c.bankIndex === bankIdx);
      const bxMin = Math.min(...bankCyls.map(c => c.x));
      const bxMax = Math.max(...bankCyls.map(c => c.x));
      const bLen = (bxMax - bxMin) + 2 * BLOCK_END_MARGIN;
      const bCenter = (bxMin + bxMax) * 0.5;
      const cutSign = cutawaySideForBank(bankDeg); // +1 oder -1 in lokalem Z
      const solidSign = -cutSign;

      // Feste Rückwand der Bank
      const backW = new THREE.Mesh(new THREE.BoxGeometry(bLen, 2.55, 0.28), getPartMat('block', 'castAlu').clone());
      backW.position.set(bCenter, 2.0, solidSign * 0.78);
      bf.add(backW);
      registerXrayShell(backW);

      // Linke & rechte Stirnwand der Bank
      [-1, 1].forEach(side => {
        const endW = new THREE.Mesh(new THREE.BoxGeometry(END_WALL_WIDTH, 2.55, 1.66), getPartMat('block', 'castAlu').clone());
        endW.position.set(bCenter + side * (bLen * 0.5), 2.0, 0);
        bf.add(endW);
        registerXrayShell(endW);
      });

      // Vordere/Obere Cutaway-Wand (verschwindet im Cutaway!)
      const frontW = new THREE.Mesh(new THREE.BoxGeometry(bLen, 2.55, 0.26), getPartMat('block', 'castAluCut').clone());
      frontW.position.set(bCenter, 2.0, cutSign * 0.78);
      bf.add(frontW);
      cutawayMeshes.push(frontW);
      registerXrayShell(frontW);

      // Kühlrippen auf Cutaway-Wand
      for (let r = 0; r < 3; r++) {
        const rib = new THREE.Mesh(new THREE.BoxGeometry(bLen - 0.3, 0.08, 0.11), getPartMat('block', 'castAluCut').clone());
        rib.position.set(bCenter, 1.25 + r * 0.52, cutSign * 0.94);
        bf.add(rib);
        cutawayMeshes.push(rib);
        registerXrayShell(rib, false);
      }

      // Schnittkanten-Akzent
      [-1, 1].forEach(side => {
        const rim = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.55, 0.12), cutEdgeMat);
        rim.position.set(bCenter + side * (bLen * 0.5 - 0.12), 2.0, cutSign * 0.79);
        bf.add(rim);
      });

      // Gehonte Laufbuchsen je Zylinder dieser Bank
      bankCyls.forEach(c => {
        const backStart = cutSign > 0 ? Math.PI * 0.5 : -Math.PI * 0.5;
        const frontStart = cutSign > 0 ? -Math.PI * 0.5 : Math.PI * 0.5;

        const linerBack = new THREE.Mesh(
          new THREE.CylinderGeometry(R_BORE + 0.05, R_BORE + 0.05, 2.15, 26, 1, true, backStart, Math.PI),
          getPartMat('block', 'darkMetal').clone()
        );
        linerBack.material.side = THREE.DoubleSide;
        linerBack.position.set(c.x, 2.17, 0);
        bf.add(linerBack);
        registerXrayShell(linerBack, false);

        const linerFront = new THREE.Mesh(
          new THREE.CylinderGeometry(R_BORE + 0.05, R_BORE + 0.05, 2.15, 26, 1, true, frontStart, Math.PI),
          getPartMat('block', 'darkMetalCut').clone()
        );
        linerFront.material.side = THREE.DoubleSide;
        linerFront.position.set(c.x, 2.17, 0);
        bf.add(linerFront);
        cutawayMeshes.push(linerFront);
        registerXrayShell(linerFront);
      });
    });

    // =========================================================================
    // 2. KOLBEN, KOLBENRINGE, BRENNRÄUME & ZÜNDFUNKEN / DIESEL-SPRAY
    // =========================================================================
    const pistonsGroup = registerPartGroup('pistons', new THREE.Group(), isBoxer ? [-1.1, 0.0, 1.85] : [-1.1, 0.95, 0.1]);
    const pistonBankFrames = createBankFrames(pistonsGroup);
    const gasRootFrames = createBankFrames(assemblyRoot);

    const pistonNodes = [];
    const gasMeshes = [];
    const ignition = [], sparks = [];

    const chamberGeo = new THREE.CylinderGeometry(R_BORE - 0.03, R_BORE - 0.03, 1.0, 22);
    const pistonBodyGeo = new THREE.CylinderGeometry(R_BORE - 0.025, R_BORE - 0.03, 0.76, 26);
    const pistonRingGeo = new THREE.TorusGeometry(R_BORE - 0.015, 0.018, 8, 24);
    const pistonPinGeo = new THREE.CylinderGeometry(WRIST_PIN_RADIUS, WRIST_PIN_RADIUS, 0.82, 14);
    const flameGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    const ignitionLight = new THREE.PointLight(0xffffff, 0, 1.2, 1);
    ignitionLight.name = 'ignitionLight';
    assemblyRoot.add(ignitionLight);

    cylSpecs.forEach(spec => {
      const bf = pistonBankFrames[spec.bankIndex];
      const gf = gasRootFrames[spec.bankIndex];

      const pNode = new THREE.Group();
      pNode.position.set(spec.x, 1.9, 0);

      const body = new THREE.Mesh(pistonBodyGeo, getPartMat('pistons', 'pistonAlu'));
      body.position.y = 0.10;
      pNode.add(body);

      // Diesel-Muldenkolben-Akzent oben auf dem Kolbenboden
      if (isDiesel) {
        const bowl = new THREE.Mesh(
          new THREE.TorusGeometry(0.24, BOWL_EDGE_RADIUS, 8, 20),
          getPartMat('pistons', 'pistonRing')
        );
        bowl.rotation.x = Math.PI / 2;
        bowl.position.y = BOWL_EDGE_TOP - BOWL_EDGE_RADIUS;
        pNode.add(bowl);
      }

      [0.39, 0.30, 0.21].forEach(ry => {
        const ring = new THREE.Mesh(pistonRingGeo, getPartMat('pistons', 'pistonRing'));
        ring.rotation.x = Math.PI / 2;
        ring.position.y = ry;
        pNode.add(ring);
      });

      const pin = new THREE.Mesh(pistonPinGeo, getPartMat('pistons', 'machinedSteel'));
      pin.name = 'wristPin';
      pin.rotation.z = Math.PI / 2;
      pNode.add(pin);

      bf.add(pNode);
      pistonNodes.push(pNode);

      // Volumetrischer Brennraum
      const gasMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.25,
        depthWrite: false
      });
      const gasMesh = new THREE.Mesh(chamberGeo, gasMat);
      gasMesh.position.set(spec.x, 2.9, 0);
      gf.add(gasMesh);
      gasMeshes.push({ mesh: gasMesh, mat: gasMat, spec });

      const flash = createFlame(flameGeometry, isDiesel);
      flash.position.x = spec.x;
      flash.renderOrder = 1;
      flash.name = isDiesel ? 'sprayIgnition' : 'petrolFlame';
      flash.material.uniforms.seed.value = spec.index * 1.67;
      flash.visible = false;
      gf.add(flash);
      ignition.push(flash);
    });

    // =========================================================================
    // 3. PLEUELSTANGEN (EXAKTER KURBELTRIEB IN BANK-KOORDINATEN)
    // =========================================================================
    const conrodsGroup = registerPartGroup('conrods', new THREE.Group(), isBoxer ? [-0.35, -0.35, 1.05] : [-0.35, -0.35, 0.15]);
    const conrodBankFrames = createBankFrames(conrodsGroup);
    const conrodNodes = buildConrods(cylSpecs, conrodBankFrames, getPartMat);

    // =========================================================================
    // 4. KURBELWELLE & GEGENGEWICHTE (EXAKTE HUBZAPFENWINKEL JE BAUFORM)
    // =========================================================================
    const crankGroup = registerPartGroup('crankshaft', new THREE.Group(), [0.6, yCrank, 0.1]);
    crankGroup.position.set(0, yCrank, 0);
    const crankSpin = new THREE.Group();
    crankGroup.add(crankSpin);

    installCrankshaft(layout, crankSpin, blockGroup, yCrank, getPartMat);
    const mounts = timingMounts(layout);
    const noseStart = mounts.at(-1).x - WHEEL_WIDTH / 2;
    const crankFace = mounts[0].crankFace;
    const nose = new THREE.Mesh(
      new THREE.CylinderGeometry(NOSE_RADIUS, NOSE_RADIUS, crankFace - noseStart, 16),
      getPartMat('crankshaft', 'machinedSteel')
    );
    nose.name = 'crankNose';
    nose.rotation.z = Math.PI / 2;
    nose.position.x = (noseStart + crankFace) / 2;
    crankSpin.add(nose);

    // =========================================================================
    // 5. DOHC-ZYLINDERKÖPFE & VENTILDECKEL (PRO BANK)
    // =========================================================================
    const headAnchor = isBoxer ? [0, 0.35, 3.85] : isV ? [0, 2.1, 2.2] : [0, 2.35, 0.65];
    const headGroup = registerPartGroup('cylinderHead', new THREE.Group(), headAnchor);
    const headBankFrames = createBankFrames(headGroup);

    layout.bankAnglesDeg.forEach((bankDeg, bankIdx) => {
      const bf = headBankFrames[bankIdx];
      const bankCyls = cylSpecs.filter(c => c.bankIndex === bankIdx);
      const bxMin = Math.min(...bankCyls.map(c => c.x));
      const bxMax = Math.max(...bankCyls.map(c => c.x));
      const bLen = (bxMax - bxMin) + 1.60;
      const bCenter = (bxMin + bxMax) * 0.5;
      const cutSign = cutawaySideForBank(bankDeg);
      const solidSign = -cutSign;

      const headBack = new THREE.Mesh(new THREE.BoxGeometry(bLen, 0.98, 0.90), getPartMat('cylinderHead', 'castAlu').clone());
      headBack.position.set(bCenter, 3.81, solidSign * 0.44);
      bf.add(headBack);
      registerXrayShell(headBack);

      const headFront = new THREE.Mesh(new THREE.BoxGeometry(bLen, 0.98, 0.88), getPartMat('cylinderHead', 'castAluCut').clone());
      headFront.position.set(bCenter, 3.81, cutSign * 0.46);
      bf.add(headFront);
      cutawayMeshes.push(headFront);
      registerXrayShell(headFront);

      const vcBack = new THREE.Mesh(new THREE.BoxGeometry(bLen - 0.12, 0.86, 0.72), getPartMat('cylinderHead', 'valveCover').clone());
      vcBack.position.set(bCenter, 4.74, solidSign * 0.46);
      bf.add(vcBack);
      registerXrayShell(vcBack);

      const vcFront = new THREE.Mesh(new THREE.BoxGeometry(bLen - 0.12, 0.86, 0.82), getPartMat('cylinderHead', 'valveCover').clone());
      vcFront.position.set(bCenter, 4.74, cutSign * 0.34);
      bf.add(vcFront);
      cutawayMeshes.push(vcFront);
      registerXrayShell(vcFront);
    });

    // =========================================================================
    // 6. DOPPELTE NOCKENWELLEN JE BANK (DOHC, KORRIGIERTE NOCKENWINKEL!)
    // =========================================================================
    const camAnchor = isBoxer ? [0.4, 0.25, 4.65] : isV ? [0.4, 2.85, 2.55] : [0.4, 3.32, 0.0];
    const camsGroup = registerPartGroup('camshafts', new THREE.Group(), camAnchor);
    const camBankFrames = createBankFrames(camsGroup);
    const camSpins = [];

    const lobeGeo = createCamLobeGeometry(0.12);

    layout.bankAnglesDeg.forEach((bankDeg, bankIdx) => {
      const bf = camBankFrames[bankIdx];
      const bankCyls = cylSpecs.filter(c => c.bankIndex === bankIdx);
      const bxMin = Math.min(...bankCyls.map(c => c.x));
      const bxMax = Math.max(...bankCyls.map(c => c.x));
      const camLen = (bxMax - bxMin) + 2 * CAM_OVERHANG;
      const bCenter = (bxMin + bxMax) * 0.5;
      // Bei V-Motoren liegt der Einlass innen im V!
      const intakeSideZ = intakeSign(bankDeg) * CAM_Z;
      const exhaustSideZ = -intakeSideZ;

      const intakeCamSpin = new THREE.Group();
      intakeCamSpin.position.set(bCenter, CAM_Y, intakeSideZ);
      bf.add(intakeCamSpin);

      const exhaustCamSpin = new THREE.Group();
      exhaustCamSpin.position.set(bCenter, CAM_Y, exhaustSideZ);
      bf.add(exhaustCamSpin);

      const barGeo = new THREE.CylinderGeometry(0.095, 0.095, camLen, 16);
      barGeo.rotateZ(Math.PI / 2);
      intakeCamSpin.add(new THREE.Mesh(barGeo, getPartMat('camshafts', 'machinedSteel')));
      exhaustCamSpin.add(new THREE.Mesh(barGeo, getPartMat('camshafts', 'machinedSteel')));

      bankCyls.forEach(spec => {
        const phaseDeg = spec.phaseDeg;
        // Exakte Nockenwinkel (Nockenspitze zeigt bei totalRotX = 0 nach unten -Y):
        // Einlass-Peak bei cycle = 90° => crankDeg = 90 - phaseDeg => lobeAngle = +(phaseDeg - 90) * 0.5
        // Auslass-Peak bei cycle = 630° => crankDeg = 630 - phaseDeg => lobeAngle = +(phaseDeg - 630) * 0.5
        const intakeLobeAngle = THREE.MathUtils.degToRad((phaseDeg - 90) * 0.5);
        const exhaustLobeAngle = THREE.MathUtils.degToRad((phaseDeg - 630) * 0.5);

        [-0.20, 0.20].forEach(dx => {
          const iLobe = new THREE.Mesh(lobeGeo, getPartMat('camshafts', 'intakeValve'));
          iLobe.position.set(spec.x - bCenter + dx, 0, 0);
          iLobe.rotation.x = intakeLobeAngle;
          intakeCamSpin.add(iLobe);

          const eLobe = new THREE.Mesh(lobeGeo, getPartMat('camshafts', 'exhaustValve'));
          eLobe.position.set(spec.x - bCenter + dx, 0, 0);
          eLobe.rotation.x = exhaustLobeAngle;
          exhaustCamSpin.add(eLobe);
        });
      });

      camSpins.push(intakeCamSpin, exhaustCamSpin);
    });

    // =========================================================================
    // 7. VENTILE & VENTILFEDERN (16V / 24V / 32V)
    // =========================================================================
    const valveAnchor = isBoxer ? [-1.1, 0.15, 3.65] : isV ? [-1.1, 2.25, 2.0] : [-1.1, 2.55, 0.45];
    const valvesGroup = registerPartGroup('valves', new THREE.Group(), valveAnchor);
    const valveBankFrames = createBankFrames(valvesGroup);
    const springGeo = createSpringGeometry(0.09, 0.42, 4.5, 0.015);
    const stemBase = LOCAL_Y_ROOF + 0.023;
    const stemLength = BUCKET_TOP - 0.09 - stemBase;
    const valveStemGeo = new THREE.CylinderGeometry(0.027, 0.027, stemLength, 10);
    const bucketGeo = new THREE.CylinderGeometry(0.185, 0.185, 0.09, 20);
    const valveHeadGeo = new THREE.CylinderGeometry(0.093, 0.132, 0.052, 20);
    const valveAssemblies = cylSpecs.map(spec => {
      const bf = valveBankFrames[spec.bankIndex];
      const assembly = { intake: [], exhaust: [] };
      for (const type of ['intake', 'exhaust']) {
        const z = intakeSign(spec.bankAngleDeg) * CAM_Z * (type === 'intake' ? 1 : -1);
        const mat = getPartMat('valves', type + 'Valve');
        for (const dx of [-0.20, 0.20]) {
          const pivot = new THREE.Group();
          pivot.position.set(spec.x + dx, 0, z);
          const mover = new THREE.Group();
          const head = new THREE.Mesh(valveHeadGeo, mat);
          head.position.y = LOCAL_Y_ROOF + 0.002;
          const stem = new THREE.Mesh(valveStemGeo, mat);
          stem.position.y = stemBase + stemLength / 2;
          const bucket = new THREE.Mesh(bucketGeo, getPartMat('valves', 'machinedSteel'));
          bucket.position.y = CAM_Y - BASE_RADIUS - 0.045;
          mover.add(head, stem, bucket);
          const spring = new THREE.Mesh(springGeo, getPartMat('valves', 'machinedSteel'));
          spring.position.y = BUCKET_TOP - 0.09 - 0.42;
          pivot.add(mover, spring);
          bf.add(pivot);
          assembly[type].push({ mover, spring });
        }
      }
      return assembly;
    });

    // =========================================================================
    // 8. ZÜNDKERZEN (OTTO) ODER COMMON-RAIL-INJEKTOREN & GLÜHKERZEN (DIESEL)
    // =========================================================================
    const plugAnchor = isBoxer ? [1.1, 0.2, 4.45] : isV ? [1.1, 2.75, 2.2] : [1.1, 3.25, 0.0];
    const ignitionPart = isDiesel ? 'commonRail' : 'sparkPlugs';
    const plugsGroup = registerPartGroup(ignitionPart, new THREE.Group(), plugAnchor);
    const plugBankFrames = createBankFrames(plugsGroup);
    const sparkTemplate = isDiesel ? null : createSpark(getPartMat(ignitionPart, 'machinedSteel'));

    cylSpecs.forEach(spec => {
      const bf = plugBankFrames[spec.bankIndex];
      const unit = new THREE.Group();
      unit.name = isDiesel ? 'directInjector' : 'sparkPlug';
      unit.position.set(spec.x, 4.20, 0);

      if (isDiesel) {
        // Hochdruck-Piezo-Injektor + seitliche Glühkerze
        const piezoHead = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.34, 0.22), getPartMat(ignitionPart, 'darkMetal'));
        piezoHead.position.y = 0.85;
        unit.add(piezoHead);

        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.075, 1.05, 14), getPartMat(ignitionPart, 'machinedSteel', true));
        cutawayGhostMeshes.push(body);
        body.position.y = 0.18;
        unit.add(body);

        const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.032, 0.56, 12), getPartMat(ignitionPart, 'chainGold', true));
        cutawayGhostMeshes.push(nozzle);
        nozzle.position.y = DIESEL_NOZZLE_Y - unit.position.y + 0.28;
        unit.add(nozzle);

        // Glühkerze leicht schräg daneben
        const glow = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.028, 0.72, 10), getPartMat(ignitionPart, 'exhaustValve'));
        glow.name = 'glowPlug';
        glow.position.set(0.38, -0.54, 0.024);
        glow.rotation.z = -0.38;
        unit.add(glow);
      } else {
        // Klassische Zündkerze + Stabzündspule
        const coilCap = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.42, 14), getPartMat(ignitionPart, 'darkMetal'));
        coilCap.position.y = 0.72;
        unit.add(coilCap);

        const insulator = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.65, 14), getPartMat(ignitionPart, 'ceramic'));
        insulator.position.y = 0.18;
        unit.add(insulator);

        const thread = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.56, 12), getPartMat(ignitionPart, 'machinedSteel'));
        thread.position.y = -0.45;
        unit.add(thread);

        const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.16, 8), getPartMat(ignitionPart, 'chainGold'));
        tip.position.y = PLUG_TIP_Y - unit.position.y + 0.08;
        const electrode = sparkTemplate.clone();
        electrode.position.y = PLUG_TIP_Y - unit.position.y;
        sparks.push(electrode.getObjectByName('spark'));
        unit.add(tip, electrode);
      }
      bf.add(unit);
    });

    // The part anchors, housings, ducts and tracer strands share named ports.
    const anchors = {
      intakeManifold: 'in0', exhaustManifold: 'out0', portInjectors: 'nozzle0',
      turbocharger: 'compressorOut', intercooler: 'coolerOut', dpf: 'dpfIn',
      hpEgr: 'hpCoolOut', lpEgr: 'lpCoolOut'
    };
    for (const [part, port] of Object.entries(anchors)) {
      if (plumbing.nodes[port] && !(part === 'portInjectors' && isDiesel)) {
        registerPartGroup(part, new THREE.Group(), plumbing.nodes[port]);
      }
    }
    if (isDiesel) partAnchors.set('commonRail', new THREE.Vector3(...plumbing.nodes.rail0));
    const moving = installDucts(plumbing, id => partGroups.get(id), getPartMat, cutawayGhostMeshes, createImpellerGroup);
    const timingGroup = registerPartGroup('timingDrive', new THREE.Group(), [mounts[0].x, yCrank + 1.8, 0]);
    const belts = installBelts(createBankFrames(timingGroup), mounts, key => getPartMat('timingDrive', key), createSprocketGeometry);
    // =========================================================================
    // 12. SCHWUNGRAD & ÖLWANNE
    // =========================================================================
    const fx = layout.flywheelX;
    const flywheelOilGroup = registerPartGroup('flywheelOilpan', new THREE.Group(), [fx, yCrank, 0]);

    const flywheelSpin = new THREE.Group();
    flywheelSpin.position.set(fx, yCrank, 0);
    const fwGear = new THREE.Mesh(createSprocketGeometry(40, 1.48, 1.38, 0.28, 0.20), getPartMat('flywheelOilpan', 'darkMetal'));
    fwGear.rotation.y = Math.PI / 2;
    flywheelSpin.add(fwGear);
    const fwRing = new THREE.Mesh(new THREE.CylinderGeometry(1.12, 1.12, 0.32, 28), getPartMat('flywheelOilpan', 'machinedSteel'));
    fwRing.rotation.z = Math.PI / 2;
    flywheelSpin.add(fwRing);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.36, 12), getPartMat('flywheelOilpan', 'chainGold'));
      bolt.rotation.z = Math.PI / 2;
      bolt.position.set(0, Math.cos(a) * 0.72, Math.sin(a) * 0.72);
      flywheelSpin.add(bolt);
    }
    flywheelOilGroup.add(flywheelSpin);

    const updateOil = installOilPan(flywheelOilGroup, blockSpanX + 0.12, yCrank, getPartMat, registerXrayShell, cutawayMeshes, environment);
    for (const mesh of cutawayGhostMeshes) registerXrayShell(mesh, false);

    // =========================================================================
    const baseBudget = tracerBudget(globalThis.navigator);
    const tracers = createTracers(plumbing, baseBudget, state.gasDensity);
    assemblyRoot.add(tracers.cloud);

    // Tagging & Basispositionen
    for (const [id, group] of partGroups.entries()) {
      basePositions.set(id, group.position.clone());
      tagPart(group, id);
    }

    for (const spark of sparks) for (const effect of spark.children) {
      effect.castShadow = false;
      effect.raycast = () => {};
    }

    built = {
      profile,
      assemblyRoot,
      partGroups,
      basePositions,
      partAnchors,
      cutawayMeshes,
      cutawayGhostMeshes,
      xrayRecords,
      xrayEdgeMat, xrayFocusMat, useXray: false,
      highlightableByPart,
      exhaustMat: getPartMat('exhaustManifold', 'exhaustPipe', true),
      cutEdgeMat,
      xrayShellMat,
      pistonNodes,
      conrodNodes,
      crankSpin,
      flywheelSpin,
      updateOil,
      belts,
      camSpins,
      valveAssemblies,
      gasMeshes,
      ignition,
      ignitionLight,
      sparks,
      moving,
      plumbing, baseBudget,
      tracers,
      crowns: new Float32Array(cylSpecs.length),
      strokes: cylSpecs.map(() => ({})),
      cylSpecs,
      isDiesel
    };

    applyTheme(state.theme);
    setFlowVisible(state.showFlow);
    setSelectedPart(state.selectedPart);
  }

  buildAssembly(initialProfile);

  function setProfile(profile) {
    state.profile = profile;
    buildAssembly(profile);
  }

  function setViewMode(mode) {
    if (mode !== 'exploded' && explosionSys.state.phase !== 'idle') {
      resetExplosion();
    }
    state.viewMode = mode;
    // Bei 'exploded' bleiben wir optisch in Cutaway, damit man beim Überdrehen die Kolben fliegen sieht!
    state.cutawayTarget = mode === 'cutaway' || mode === 'exploded' ? 1 : 0;
    state.xrayTarget = mode === 'xray' ? 1 : 0;
  }

  function triggerExplosion(currentRpm) {
    state.viewMode = 'exploded';
    state.cutawayTarget = 1;
    state.xrayTarget = 0;
    explosionSys.trigger(
      currentRpm,
      state.profile.specs.redlineRpm,
      built.isDiesel,
      built.partGroups,
      built.basePositions
    );
  }

  function resetExplosion() {
    if (!built) return;
    explosionSys.reset(built.partGroups, built.basePositions);
    engineHolder.position.set(0, 0, 0);
  }

  function getExplosionState() {
    return explosionSys.state;
  }

  function syncXrayMaterials() {
    for (const { mesh, normalMat, line } of built.xrayRecords) {
      const focused = mesh.userData.partId === state.selectedPart;
      mesh.material = built.useXray ? (focused ? built.xrayFocusMat : built.xrayShellMat) : normalMat;
      mesh.castShadow = !built.useXray;
      if (line) line.visible = built.useXray;
    }
  }

  function setSelectedPart(partId) {
    state.selectedPart = partId;
    if (!built) return;
    if (built.useXray) syncXrayMaterials();
    for (const [id, entries] of built.highlightableByPart.entries()) {
      const active = Boolean(partId && id === partId);
      for (const rec of entries) {
        if (!rec.mat || !rec.mat.emissive) continue;
        if (active) {
          rec.mat.emissive.setHex(0xea580c);
          rec.mat.emissiveIntensity = 0.36;
        } else {
          rec.mat.emissive.setHex(rec.baseEmissiveHex);
          rec.mat.emissiveIntensity = rec.baseEmissiveIntensity;
        }
      }
    }
  }

  function setFlowVisible(visible) {
    state.showFlow = visible;
    if (built) built.tracers.cloud.visible = visible;
  }

  function setGasDensity(percent = state.gasDensity) {
    state.gasDensity = percent;
    const budget = tracerBudget(globalThis.navigator);
    if (budget === built.baseBudget) {
      built.tracers.setDensity(percent);
      return;
    }
    // Crossing the compact viewport threshold replaces only the point batch.
    const previous = built.tracers.cloud;
    built.tracers = createTracers(built.plumbing, budget, percent);
    built.baseBudget = budget;
    built.tracers.cloud.visible = previous.visible;
    built.assemblyRoot.add(built.tracers.cloud);
    previous.removeFromParent();
    previous.geometry.dispose();
    previous.material.dispose();
  }

  function applyTheme(theme) {
    state.theme = theme;
    const isDark = theme === 'dark';
    basePlate.material.color.setHex(isDark ? 0x162033 : 0xdbe3ee);
    ringAccent.material.color.setHex(isDark ? 0xf97316 : 0xc2410c);
    if (built) {
      built.xrayShellMat.color.setHex(isDark ? 0x808080 : 0x555555);
      built.xrayFocusMat.color.setHex(isDark ? 0xd4d4d4 : 0x989898);
      built.xrayEdgeMat.color.setHex(isDark ? 0xbcbcbc : 0x727272);
    }
  }

  const anchorTmp = new THREE.Vector3();
  const deltaTmp = new THREE.Vector3();
  function getPartWorldAnchor(partId) {
    if (!built) return anchorTmp.set(0, 0, 0);
    const anchor = built.partAnchors.get(partId);
    const group = built.partGroups.get(partId);
    const base = built.basePositions.get(partId);
    if (!anchor || !group || !base) return anchorTmp.set(0, 0, 0);
    deltaTmp.copy(group.position).sub(base);
    return anchorTmp.copy(anchor).add(deltaTmp);
  }

  const colorIntake = new THREE.Color(0x38bdf8);
  const colorCompress = new THREE.Color(0xfacc15);
  const colorFlame = new THREE.Color(0xff5500);
  const colorDieselFlame = new THREE.Color(0xff7b00);
  const colorExhaust = new THREE.Color(0x75422c);
  const tmpColor = new THREE.Color();

  const frame = { crankDeg: 0, strokes: null, explosion: null };
  function update(dt, telemetry, timeScale = 0.16) {
    const viewDt = Math.min(0.25, dt);
    const clampedDt = Math.min(0.05, dt);

    // 0) Explosions-Easter-Egg aktualisieren
    const explosion = explosionSys.update(clampedDt);
    engineHolder.position.copy(explosion.shake);

    // 1) Sanfte Übergänge Cutaway / X-Ray
    const lerp = Math.min(1, viewDt * 8.5);
    state.cutawayCurrent += (state.cutawayTarget - state.cutawayCurrent) * lerp;
    state.xrayCurrent += (state.xrayTarget - state.xrayCurrent) * lerp;
    if (Math.abs(state.cutawayTarget - state.cutawayCurrent) < 0.015) state.cutawayCurrent = state.cutawayTarget;
    if (Math.abs(state.xrayTarget - state.xrayCurrent) < 0.015) state.xrayCurrent = state.xrayTarget;

    const useXray = state.xrayCurrent > 0.18;
    built.xrayShellMat.opacity = 0.04 + state.xrayCurrent * 0.09;
    built.xrayFocusMat.opacity = built.xrayShellMat.opacity * 1.35;
    built.xrayEdgeMat.opacity = state.xrayCurrent * 0.48;
    if (useXray !== built.useXray) {
      built.useXray = useXray;
      syncXrayMaterials();
    }

    const cutAlpha = 1 - state.cutawayCurrent;
    for (const mesh of built.cutawayMeshes) {
      if (useXray) {
        mesh.visible = true;
      } else {
        mesh.visible = cutAlpha > 0.04;
        if (mesh.material) {
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

    const exhaustCutOpacity = 1 - state.cutawayCurrent * 0.84;
    if (!useXray) {
      const wantTrans = state.cutawayCurrent > 0.02;
      for (const mesh of built.cutawayGhostMeshes) {
        if (mesh.material.transparent !== wantTrans) {
          mesh.material.transparent = wantTrans;
          mesh.material.needsUpdate = true;
        }
        mesh.material.opacity = exhaustCutOpacity;
        mesh.material.depthWrite = !wantTrans;
      }
    }
    built.cutEdgeMat.opacity = state.cutawayCurrent * (1 - state.xrayCurrent);

    // 2) Blick auf den laufenden Motor bzw. den internen Überdrehzahlablauf.
    const isBlown = explosion.phase === 'blown';
    const isOverrev = explosion.phase === 'overrev';
    const effectiveRpm = isBlown
      ? 0
      : isOverrev
        ? explosion.rpm
        : telemetry.rpm;

    const effectiveScale = isOverrev ? Math.max(0.42, timeScale * 2.6) : timeScale;
    const internalView = state.viewMode === 'cutaway' || state.viewMode === 'xray';
    built.updateOil(internalView && !isBlown, clampedDt * effectiveScale / 0.16, effectiveRpm, state.profile.specs);
    const normalDegPerSec = effectiveRpm * 6 * 0.045;
    const visualDegPerSec = normalDegPerSec * (effectiveScale / 0.16);
    const crankSpeed = isOverrev ? visualDegPerSec : displayCrankSpeed(visualDegPerSec);
    const windowDeg = isOverrev ? IGNITION_WINDOW_DEG : ignitionWindow(crankSpeed, displayCrankSpeed(normalDegPerSec));
    const sparkWindowDeg = SPARK_SECONDS * Math.max(crankSpeed, displayCrankSpeed(normalDegPerSec));
    const advanceDeg = crankSpeed * clampedDt;
    state.crankClock += advanceDeg;
    state.crankDeg = state.crankClock % 720;
    const crankRad = THREE.MathUtils.degToRad(state.crankDeg);

    // Kurbelwelle, Schwungrad, Steuertrieb & Nockenwellen
    built.crankSpin.rotation.x = crankRad;
    built.flywheelSpin.rotation.x = crankRad;
    built.belts.update(crankRad);
    for (const cam of built.camSpins) cam.rotation.x = crankRad * 0.5;
    const { throttle, compressor, turbine, hpEgr, lpEgr } = built.moving;
    if (throttle) throttle.rotation.x = throttleAngle(telemetry.load);
    if (compressor && turbine && !isBlown) {
      const speed = effectiveRpm > 0 ? 6 + telemetry.boostBar * 18 : 0;
      state.turboSpinRad = (state.turboSpinRad + speed * clampedDt * effectiveScale / 0.16) % (Math.PI * 2);
      compressor.rotation.x = turbine.rotation.x = -state.turboSpinRad;
      hpEgr.rotation.x = (1 - telemetry.load) * 1.35;
      lpEgr.rotation.x = 0.35 + telemetry.load * 0.94;
    }

    // Abgaskrümmer-Glühen (bei Overrev glüht der Krümmer weiß-orange!)
    const rpmNorm = Math.min(1.5, effectiveRpm / state.profile.specs.maxRpm);
    built.exhaustMat.emissiveIntensity = isOverrev
      ? 0.45 + (explosion.progress || 0) * 1.45
      : isBlown
        ? 0.08
        : (state.selectedPart === 'exhaustManifold' ? 0.36 : 0.04) + Math.pow(rpmNorm, 2.1) * 0.35;

    // 3) Exakte 4-Takt-Kinematik pro Zylinder in Bank-Koordinaten
    const strokes = built.strokes;
    built.ignitionLight.intensity = 0;
    for (let i = 0; i < built.cylSpecs.length; i++) {
      const spec = built.cylSpecs[i];
      const stroke = getCylinderStroke(state.crankDeg, i, state.profile, strokes[i], windowDeg, advanceDeg, sparkWindowDeg);
      if (!built.isDiesel) updateSpark(built.sparks[i], isBlown ? 0 : stroke.sparkIntensity, internalView, built.ignitionLight);

      const thetaLocal = THREE.MathUtils.degToRad(state.crankDeg + spec.crankPinAngleDeg - spec.bankAngleDeg);
      const localZc = R_CRANK * Math.sin(thetaLocal);
      const localYc = R_CRANK * Math.cos(thetaLocal);
      const localYp = localYc + Math.sqrt(Math.max(0.01, L_ROD * L_ROD - localZc * localZc));
      const rodAngle = Math.atan2(-localZc, localYp - localYc);

      built.pistonNodes[i].position.y = localYp;
      built.conrodNodes[i].position.set(spec.x, localYc, localZc);
      built.conrodNodes[i].rotation.x = rodAngle;

      const va = built.valveAssemblies[i];
      for (const iv of va.intake) {
        iv.mover.position.y = -stroke.intakeLift * MAX_LIFT;
        iv.spring.scale.y = 1 - stroke.intakeLift * MAX_LIFT / 0.42;
      }
      for (const ev of va.exhaust) {
        ev.mover.position.y = -stroke.exhaustLift * MAX_LIFT;
        ev.spring.scale.y = 1 - stroke.exhaustLift * MAX_LIFT / 0.42;
      }

      // Volumetrischer Brennraum
      const crownY = localYp + PISTON_CROWN_OFFSET;
      built.crowns[i] = crownY;
      const chamberH = Math.max(0.14, LOCAL_Y_ROOF - crownY);
      const gm = built.gasMeshes[i];
      gm.mesh.position.set(spec.x, crownY + chamberH * 0.5, 0);
      gm.mesh.scale.set(1, chamberH, 1);
      gm.mesh.visible = !isBlown;

      if (!isBlown) {
        if (stroke.key === 'intake') {
          gm.mat.color.copy(colorIntake);
          gm.mat.opacity = 0.025 + stroke.intakeMist * 0.045;
        } else if (stroke.key === 'compression') {
          const t = (stroke.cycle - 180) / 180;
          tmpColor.copy(colorIntake).lerp(colorCompress, t);
          gm.mat.color.copy(tmpColor);
          gm.mat.opacity = 0.045 + t * 0.065;
        } else if (stroke.key === 'power') {
          tmpColor.copy(colorExhaust).lerp(built.isDiesel ? colorDieselFlame : colorFlame, stroke.flameIntensity);
          gm.mat.color.copy(tmpColor);
          gm.mat.opacity = 0.055 + stroke.flameIntensity * 0.24;
        } else {
          gm.mat.color.copy(colorExhaust);
          gm.mat.opacity = 0.04 + stroke.exhaustGas * 0.08;
        }
      }

      const crownTop = built.isDiesel ? localYp + BOWL_EDGE_TOP : crownY;
      updateIgnition(built.ignition[i], stroke, crownTop, R_BORE, built.isDiesel, !isBlown, built.ignitionLight);
    }

    built.tracers.cloud.visible = state.showFlow && !isBlown;
    if (built.tracers.cloud.visible) {
      built.tracers.update(state.crankClock, built.crowns, telemetry.load, telemetry.boostBar || 0);
    }

    frame.crankDeg = state.crankDeg;
    frame.strokes = strokes;
    frame.explosion = explosion;
    return frame;
  }

  return {
    root,
    setProfile,
    setViewMode,
    triggerExplosion,
    resetExplosion,
    getExplosionState,
    setSelectedPart,
    setFlowVisible,
    setGasDensity,
    applyTheme,
    getPartWorldAnchor,
    update
  };
}
