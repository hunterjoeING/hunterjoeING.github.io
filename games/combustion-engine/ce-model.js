import * as THREE from 'three';
import {
  DEFAULT_PROFILE,
  getEnginePartsForProfile,
  getCylinderStroke
} from './ce-data.js?v=0.4.0';
import { createExplosionSystem } from './ce-explosion.js?v=0.4.0';

const R_CRANK = 0.58;
const L_ROD = 1.92;
const PISTON_CROWN_OFFSET = 0.48;
const LOCAL_Y_ROOF = 3.33; // entspricht Y_ROOF 1.88 bei Y_CRANK -1.45
const R_BORE = 0.54;

/**
 * Erzeugt ein prozedurales Stirnrad (Zahnrad) um die Z-Achse,
 * das anschließend um Y rotiert auf die X-Achse montiert wird.
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
 * Nockenspitze zeigt bei rotX = 0 exakt nach unten (-Y, drückt das Ventil auf).
 */
function createCamLobeGeometry(baseR = 0.14, noseR = 0.27, width = 0.14) {
  const shape = new THREE.Shape();
  const segs = 28;
  for (let i = 0; i <= segs; i++) {
    const a = (i / segs) * Math.PI * 2;
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
  geo.rotateY(Math.PI / 2);
  return geo;
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
    if (child.geometry) geometries.add(child.geometry);
    if (child.material) {
      if (Array.isArray(child.material)) child.material.forEach(m => materials.add(m));
      else materials.add(child.material);
    }
  });
  geometries.forEach(g => g.dispose());
  materials.forEach(m => m.dispose());
}

export function createCombustionEngineModel(initialProfile = DEFAULT_PROFILE) {
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
    turboSpinRad: 0,
    selectedPart: null,
    showFlow: true,
    theme: 'light'
  };

  let built = null;

  function buildAssembly(profile) {
    if (built) {
      explosionSys.reset(built.partGroups, built.basePositions);
      disposeObjectTree(built.assemblyRoot);
      engineHolder.remove(built.assemblyRoot);
    }

    const { layout, concept } = profile;
    const isBoxer = layout.id === 'boxer4';
    const isV = layout.id === 'v6' || layout.id === 'v8';
    const isDiesel = concept.directInjection;
    const yCrank = isBoxer ? -0.35 : -1.45;
    const cylSpecs = layout.cylinderSpecs;
    const bankCount = layout.bankAnglesDeg.length;
    const partsMeta = getEnginePartsForProfile(profile);

    const assemblyRoot = new THREE.Group();
    engineHolder.add(assemblyRoot);

    const partGroups = new Map();
    const basePositions = new Map();
    const partAnchors = new Map();
    const cutawayMeshes = [];
    const cutawayGhostMeshes = [];
    const xrayRecords = [];
    const xrayWireframes = [];
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
      chainGold: new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.32, metalness: 0.84 })
    };

    const exhaustMat = new THREE.MeshStandardMaterial({
      color: 0x9a6b4c,
      roughness: 0.32,
      metalness: 0.82,
      emissive: new THREE.Color(0xea580c),
      emissiveIntensity: 0.05,
      transparent: true,
      opacity: 1
    });

    const cutEdgeMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      roughness: 0.38,
      metalness: 0.2,
      emissive: new THREE.Color(0xf97316),
      emissiveIntensity: 0.22,
      transparent: true,
      opacity: 0
    });

    const xrayShellMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.13,
      roughness: 0.14,
      metalness: 0.05,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    // Pro Baugruppe eigener Material-Pool (verhindert Cross-Part-Highlight-Leaks!)
    const partMatCache = new Map();
    function getPartMat(partId, templateKey) {
      const key = `${partId}:${templateKey}`;
      if (!partMatCache.has(key)) {
        const cloned = sharedTemplates[templateKey].clone();
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
    const blockSpanX = (xMax - xMin) + 1.55;

    // Zentrales Kurbelgehäuse (Hauptlagerböcke entlang X)
    const bearingCount = layout.id === 'v6' ? 4 : 5;
    for (let b = 0; b < bearingCount; b++) {
      const bx = xMin - 0.68 + (b / (bearingCount - 1)) * (blockSpanX - 0.18);
      const web = new THREE.Mesh(
        new THREE.BoxGeometry(0.20, isBoxer ? 1.35 : 1.15, isBoxer ? 1.75 : 1.48),
        getPartMat('block', 'darkMetal')
      );
      web.position.set(bx, yCrank + 0.1, isBoxer ? 0 : -0.05);
      blockGroup.add(web);
    }

    // Pro Zylinderbank: Blockwände + gehonte Laufbuchsen (Rückseite fest, Cutaway-Seite öffnet!)
    layout.bankAnglesDeg.forEach((bankDeg, bankIdx) => {
      const bf = blockBankFrames[bankIdx];
      const bankCyls = cylSpecs.filter(c => c.bankIndex === bankIdx);
      const bxMin = Math.min(...bankCyls.map(c => c.x));
      const bxMax = Math.max(...bankCyls.map(c => c.x));
      const bLen = (bxMax - bxMin) + 1.55;
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
        const endW = new THREE.Mesh(new THREE.BoxGeometry(0.28, 2.55, 1.66), getPartMat('block', 'castAlu').clone());
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
    const sparkFlashes = [];
    const dieselSprays = [];

    const chamberGeo = new THREE.CylinderGeometry(R_BORE - 0.03, R_BORE - 0.03, 1.0, 22);
    const pistonBodyGeo = new THREE.CylinderGeometry(R_BORE - 0.025, R_BORE - 0.03, 0.76, 26);
    const pistonRingGeo = new THREE.TorusGeometry(R_BORE - 0.015, 0.018, 8, 24);
    const pistonPinGeo = new THREE.CylinderGeometry(0.10, 0.10, 0.82, 14);
    const sparkBallGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const sprayConeGeo = new THREE.ConeGeometry(0.32, 0.58, 16, 1, true);

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
          new THREE.TorusGeometry(0.24, 0.055, 8, 20),
          getPartMat('pistons', 'pistonRing')
        );
        bowl.rotation.x = Math.PI / 2;
        bowl.position.y = 0.47;
        pNode.add(bowl);
      }

      [0.39, 0.30, 0.21].forEach(ry => {
        const ring = new THREE.Mesh(pistonRingGeo, getPartMat('pistons', 'pistonRing'));
        ring.rotation.x = Math.PI / 2;
        ring.position.y = ry;
        pNode.add(ring);
      });

      const pin = new THREE.Mesh(pistonPinGeo, getPartMat('pistons', 'machinedSteel'));
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

      // Otto-Zündfunke
      const sparkMat = new THREE.MeshBasicMaterial({
        color: 0xe0f2fe,
        transparent: true,
        opacity: 0,
        depthWrite: false
      });
      const sparkBall = new THREE.Mesh(sparkBallGeo, sparkMat);
      sparkBall.position.set(spec.x, LOCAL_Y_ROOF - 0.1, 0);
      gf.add(sparkBall);
      sparkFlashes.push({ mesh: sparkBall, mat: sparkMat, spec });

      // Diesel-Common-Rail-Einspritzkegel
      const sprayMat = new THREE.MeshBasicMaterial({
        color: 0xfde047,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      const sprayCone = new THREE.Mesh(sprayConeGeo, sprayMat);
      sprayCone.position.set(spec.x, LOCAL_Y_ROOF - 0.32, 0);
      gf.add(sprayCone);
      dieselSprays.push({ mesh: sprayCone, mat: sprayMat, spec });
    });

    // =========================================================================
    // 3. PLEUELSTANGEN (EXAKTER KURBELTRIEB IN BANK-KOORDINATEN)
    // =========================================================================
    const conrodsGroup = registerPartGroup('conrods', new THREE.Group(), isBoxer ? [-0.35, -0.35, 1.05] : [-0.35, -0.35, 0.15]);
    const conrodBankFrames = createBankFrames(conrodsGroup);
    const conrodNodes = [];

    const bigEndGeo = new THREE.CylinderGeometry(0.23, 0.23, 0.26, 18);
    const beamGeo = new THREE.BoxGeometry(0.13, L_ROD - 0.26, 0.17);
    const smallEndGeo = new THREE.CylinderGeometry(0.145, 0.145, 0.24, 16);

    cylSpecs.forEach(spec => {
      const bf = conrodBankFrames[spec.bankIndex];
      const rod = new THREE.Group();
      rod.position.set(spec.x, 0, 0);

      const bigEnd = new THREE.Mesh(bigEndGeo, getPartMat('conrods', 'conrodBronze'));
      bigEnd.rotation.z = Math.PI / 2;
      rod.add(bigEnd);

      const beam = new THREE.Mesh(beamGeo, getPartMat('conrods', 'conrodBronze'));
      beam.position.y = L_ROD * 0.5;
      rod.add(beam);

      const smallEnd = new THREE.Mesh(smallEndGeo, getPartMat('conrods', 'machinedSteel'));
      smallEnd.rotation.z = Math.PI / 2;
      smallEnd.position.y = L_ROD;
      rod.add(smallEnd);

      bf.add(rod);
      conrodNodes.push(rod);
    });

    // =========================================================================
    // 4. KURBELWELLE & GEGENGEWICHTE (EXAKTE HUBZAPFENWINKEL JE BAUFORM)
    // =========================================================================
    const crankGroup = registerPartGroup('crankshaft', new THREE.Group(), [0.6, yCrank, 0.1]);
    crankGroup.position.set(0, yCrank, 0);
    const crankSpin = new THREE.Group();
    crankGroup.add(crankSpin);

    const mainAxis = new THREE.Mesh(
      new THREE.CylinderGeometry(0.17, 0.17, layout.crankLength, 22),
      getPartMat('crankshaft', 'machinedSteel')
    );
    mainAxis.rotation.z = Math.PI / 2;
    crankSpin.add(mainAxis);

    // Hubzapfen + Kurbelwangen + Gegengewichte (für V8 gemeinsame Hubzapfen je Paar!)
    if (layout.id === 'v8') {
      for (let p = 0; p < 4; p++) {
        const cA = cylSpecs[p * 2];
        const cB = cylSpecs[p * 2 + 1];
        const midX = (cA.x + cB.x) * 0.5;
        const pinRad = THREE.MathUtils.degToRad(cA.crankPinAngleDeg);
        const throwHolder = new THREE.Group();
        throwHolder.position.set(midX, 0, 0);
        throwHolder.rotation.x = pinRad;

        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.72, 18), getPartMat('crankshaft', 'machinedSteel'));
        pin.rotation.z = Math.PI / 2;
        pin.position.set(0, R_CRANK, 0);
        throwHolder.add(pin);

        [-0.42, 0.42].forEach(dx => {
          const web = new THREE.Mesh(new THREE.BoxGeometry(0.13, R_CRANK + 0.34, 0.42), getPartMat('crankshaft', 'crankSteel'));
          web.position.set(dx, R_CRANK * 0.45, 0);
          throwHolder.add(web);

          const cw = new THREE.Mesh(
            new THREE.CylinderGeometry(0.45, 0.45, 0.14, 16, 1, false, 0, Math.PI),
            getPartMat('crankshaft', 'darkMetal')
          );
          cw.rotation.z = Math.PI / 2;
          cw.rotation.x = Math.PI;
          cw.position.set(dx, -0.14, 0);
          throwHolder.add(cw);
        });
        crankSpin.add(throwHolder);
      }
    } else {
      cylSpecs.forEach(spec => {
        const pinRad = THREE.MathUtils.degToRad(spec.crankPinAngleDeg);
        const throwHolder = new THREE.Group();
        throwHolder.position.set(spec.x, 0, 0);
        throwHolder.rotation.x = pinRad;

        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.40, 18), getPartMat('crankshaft', 'machinedSteel'));
        pin.rotation.z = Math.PI / 2;
        pin.position.set(0, R_CRANK, 0);
        throwHolder.add(pin);

        [-0.24, 0.24].forEach(dx => {
          const web = new THREE.Mesh(new THREE.BoxGeometry(0.12, R_CRANK + 0.34, 0.40), getPartMat('crankshaft', 'crankSteel'));
          web.position.set(dx, R_CRANK * 0.45, 0);
          throwHolder.add(web);

          const cw = new THREE.Mesh(
            new THREE.CylinderGeometry(0.44, 0.44, 0.13, 16, 1, false, 0, Math.PI),
            getPartMat('crankshaft', 'darkMetal')
          );
          cw.rotation.z = Math.PI / 2;
          cw.rotation.x = Math.PI;
          cw.position.set(dx, -0.14, 0);
          throwHolder.add(cw);
        });
        crankSpin.add(throwHolder);
      });
    }

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

    const lobeGeo = createCamLobeGeometry(0.13, 0.25, 0.12);

    layout.bankAnglesDeg.forEach((bankDeg, bankIdx) => {
      const bf = camBankFrames[bankIdx];
      const bankCyls = cylSpecs.filter(c => c.bankIndex === bankIdx);
      const bxMin = Math.min(...bankCyls.map(c => c.x));
      const bxMax = Math.max(...bankCyls.map(c => c.x));
      const camLen = (bxMax - bxMin) + 2.05;
      const bCenter = (bxMin + bxMax) * 0.5;
      // Bei V-Motoren liegt der Einlass innen im V!
      const intakeSideZ = isV ? (bankDeg > 0 ? -0.34 : 0.34) : -0.34;
      const exhaustSideZ = -intakeSideZ;

      const intakeCamSpin = new THREE.Group();
      intakeCamSpin.position.set(bCenter, 4.77, intakeSideZ);
      bf.add(intakeCamSpin);

      const exhaustCamSpin = new THREE.Group();
      exhaustCamSpin.position.set(bCenter, 4.77, exhaustSideZ);
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

        [-0.22, 0.22].forEach(dx => {
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
    const valveStemGeo = new THREE.CylinderGeometry(0.028, 0.028, 0.96, 10);
    const intakeHeadGeo = new THREE.CylinderGeometry(0.15, 0.18, 0.06, 14);
    const exhaustHeadGeo = new THREE.CylinderGeometry(0.14, 0.165, 0.06, 14);
    const valveAssemblies = [];

    cylSpecs.forEach((spec, cylIdx) => {
      const bf = valveBankFrames[spec.bankIndex];
      const bankDeg = spec.bankAngleDeg;
      const intakeSideSign = isV ? (bankDeg > 0 ? -1 : 1) : -1;
      const exhaustSideSign = -intakeSideSign;
      const cylValves = { intake: [], exhaust: [] };

      [-0.22, 0.22].forEach(dx => {
        // Einlassventil (blau)
        const iPivot = new THREE.Group();
        iPivot.position.set(spec.x + dx, 3.77, intakeSideSign * 0.25);
        iPivot.rotation.x = intakeSideSign * 0.18;

        const iMov = new THREE.Group();
        const iStem = new THREE.Mesh(valveStemGeo, getPartMat('valves', 'intakeValve'));
        iStem.position.y = 0.22;
        iMov.add(iStem);
        const iHead = new THREE.Mesh(intakeHeadGeo, getPartMat('valves', 'intakeValve'));
        iHead.position.y = -0.26;
        iMov.add(iHead);
        iPivot.add(iMov);

        const iSpring = new THREE.Mesh(springGeo, getPartMat('valves', 'machinedSteel'));
        iSpring.position.y = 0.24;
        iPivot.add(iSpring);

        bf.add(iPivot);
        cylValves.intake.push({ mover: iMov, spring: iSpring });

        // Auslassventil (bronze)
        const ePivot = new THREE.Group();
        ePivot.position.set(spec.x + dx, 3.77, exhaustSideSign * 0.25);
        ePivot.rotation.x = exhaustSideSign * 0.18;

        const eMov = new THREE.Group();
        const eStem = new THREE.Mesh(valveStemGeo, getPartMat('valves', 'exhaustValve'));
        eStem.position.y = 0.22;
        eMov.add(eStem);
        const eHead = new THREE.Mesh(exhaustHeadGeo, getPartMat('valves', 'exhaustValve'));
        eHead.position.y = -0.26;
        eMov.add(eHead);
        ePivot.add(eMov);

        const eSpring = new THREE.Mesh(springGeo, getPartMat('valves', 'machinedSteel'));
        eSpring.position.y = 0.24;
        ePivot.add(eSpring);

        bf.add(ePivot);
        cylValves.exhaust.push({ mover: eMov, spring: eSpring });
      });
      valveAssemblies[cylIdx] = cylValves;
    });

    // =========================================================================
    // 8. ZÜNDKERZEN (OTTO) ODER COMMON-RAIL-INJEKTOREN & GLÜHKERZEN (DIESEL)
    // =========================================================================
    const plugAnchor = isBoxer ? [1.1, 0.2, 4.45] : isV ? [1.1, 2.75, 2.2] : [1.1, 3.25, 0.0];
    const plugsGroup = registerPartGroup('sparkPlugs', new THREE.Group(), plugAnchor);
    const plugBankFrames = createBankFrames(plugsGroup);

    cylSpecs.forEach(spec => {
      const bf = plugBankFrames[spec.bankIndex];
      const unit = new THREE.Group();
      unit.position.set(spec.x, 4.20, 0);

      if (isDiesel) {
        // Hochdruck-Piezo-Injektor + seitliche Glühkerze
        const piezoHead = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.34, 0.22), getPartMat('sparkPlugs', 'darkMetal'));
        piezoHead.position.y = 0.85;
        unit.add(piezoHead);

        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.075, 1.05, 14), getPartMat('sparkPlugs', 'machinedSteel'));
        body.position.y = 0.18;
        unit.add(body);

        const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.032, 0.56, 12), getPartMat('sparkPlugs', 'chainGold'));
        nozzle.position.y = -0.60;
        unit.add(nozzle);

        // Glühkerze leicht schräg daneben
        const glow = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.028, 0.72, 10), getPartMat('sparkPlugs', 'exhaustValve'));
        glow.position.set(0.18, -0.35, 0.14);
        glow.rotation.z = 0.25;
        unit.add(glow);
      } else {
        // Klassische Zündkerze + Stabzündspule
        const coilCap = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.42, 14), getPartMat('sparkPlugs', 'darkMetal'));
        coilCap.position.y = 0.72;
        unit.add(coilCap);

        const insulator = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.65, 14), getPartMat('sparkPlugs', 'ceramic'));
        insulator.position.y = 0.18;
        unit.add(insulator);

        const thread = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.56, 12), getPartMat('sparkPlugs', 'machinedSteel'));
        thread.position.y = -0.45;
        unit.add(thread);

        const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.16, 8), getPartMat('sparkPlugs', 'chainGold'));
        tip.position.y = -0.80;
        unit.add(tip);
      }
      bf.add(unit);
    });

    // Common-Rail-Hochdruckleitung je Bank beim Turbodiesel
    if (isDiesel) {
      layout.bankAnglesDeg.forEach((_, bankIdx) => {
        const bf = plugBankFrames[bankIdx];
        const bankCyls = cylSpecs.filter(c => c.bankIndex === bankIdx);
        const bxMin = Math.min(...bankCyls.map(c => c.x));
        const bxMax = Math.max(...bankCyls.map(c => c.x));
        const rail = new THREE.Mesh(
          new THREE.CylinderGeometry(0.09, 0.09, (bxMax - bxMin) + 0.85, 16),
          getPartMat('sparkPlugs', 'chainGold')
        );
        rail.rotation.z = Math.PI / 2;
        rail.position.set((bxMin + bxMax) * 0.5, 5.22, -0.26);
        bf.add(rail);
      });
    }

    // =========================================================================
    // 9. ANSAUGTRAKT (+ DROSSELKLAPPE OTTO ODER TURBOLADER-VERDICHTER DIESEL)
    // =========================================================================
    const intakeAnchor = isBoxer ? [0, 1.55, 0.0] : isV ? [0, 2.7, 0.0] : [0, 2.25, -1.75];
    const intakeGroup = registerPartGroup('intakeManifold', new THREE.Group(), intakeAnchor);
    let throttlePlate = null;
    let compressorWheel = null;
    let turbineWheel = null;

    const plenumPos = isBoxer
      ? new THREE.Vector3(0, 1.45, 0)
      : isV
        ? new THREE.Vector3(0, 2.55, 0)
        : new THREE.Vector3(0, 1.85, -1.95);
    const plenumLen = Math.max(3.6, blockSpanX - 0.65);

    const plenum = new THREE.Mesh(
      new THREE.CylinderGeometry(0.36, 0.36, plenumLen, 20),
      getPartMat('intakeManifold', 'intakeMat')
    );
    plenum.rotation.z = Math.PI / 2;
    plenum.position.copy(plenumPos);
    intakeGroup.add(plenum);

    if (!isDiesel) {
      // Otto: Drosselklappe am Einlassende + Kraftstoffleiste & Saugrohreinspritzventile
      const throttleProfile = [
        [0.23, -0.275], [0.28, -0.275], [0.28, 0.275], [0.23, 0.275], [0.23, -0.275]
      ].map(([radius, height]) => new THREE.Vector2(radius, height));
      const throttleBody = new THREE.Mesh(
        new THREE.LatheGeometry(throttleProfile, 24),
        getPartMat('intakeManifold', 'machinedSteel')
      );
      throttleBody.rotation.z = Math.PI / 2;
      throttleBody.position.set(plenumPos.x - plenumLen * 0.5 - 0.27, plenumPos.y, plenumPos.z);
      intakeGroup.add(throttleBody);

      const throttlePlateGeo = new THREE.CylinderGeometry(0.225, 0.225, 0.025, 24).rotateZ(Math.PI / 2);
      throttlePlate = new THREE.Mesh(throttlePlateGeo, getPartMat('intakeManifold', 'chainGold'));
      throttlePlate.position.copy(throttleBody.position);
      intakeGroup.add(throttlePlate);

      // Kraftstoffleiste
      const fuelRail = new THREE.Mesh(
        new THREE.BoxGeometry(plenumLen * 0.9, 0.13, 0.16),
        getPartMat('intakeManifold', 'machinedSteel')
      );
      fuelRail.position.set(0, plenumPos.y + 0.85, isBoxer || isV ? 0 : -1.32);
      intakeGroup.add(fuelRail);
    }

    // Ansaugrohre vom Plenum zu jedem Zylinder (Weltkoordinaten aus Bankwinkel berechnet)
    const intakeRunnerCurves = [];
    const injectorGeo = new THREE.CylinderGeometry(0.085, 0.05, 0.38, 12);

    cylSpecs.forEach(spec => {
      const aRad = THREE.MathUtils.degToRad(spec.bankAngleDeg);
      const localInZ = isV ? (spec.bankAngleDeg > 0 ? -0.82 : 0.82) : (isBoxer ? (spec.bankAngleDeg < 0 ? 0.55 : -0.55) : -0.88);
      const localInY = 3.75;
      // Weltpunkt des Einlasskanals am Zylinderkopf
      const portY = yCrank + localInY * Math.cos(aRad) - localInZ * Math.sin(aRad);
      const portZ = localInY * Math.sin(aRad) + localInZ * Math.cos(aRad);

      const midY = (plenumPos.y + portY) * 0.5 + (isBoxer ? 0.55 : 0.45);
      const midZ = (plenumPos.z + portZ) * 0.5 + (isBoxer || isV ? 0 : -0.2);

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(spec.x * 0.88, plenumPos.y, plenumPos.z),
        new THREE.Vector3(spec.x, midY, midZ),
        new THREE.Vector3(spec.x, portY, portZ)
      ]);
      intakeRunnerCurves.push(curve);
      const runner = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 16, 0.165, 10, false),
        getPartMat('intakeManifold', 'intakeMat')
      );
      intakeGroup.add(runner);

      if (!isDiesel) {
        const pt = curve.getPoint(0.76);
        const inj = new THREE.Mesh(injectorGeo, getPartMat('intakeManifold', 'chainGold'));
        inj.position.set(pt.x, pt.y + 0.18, pt.z);
        inj.rotation.x = -0.3;
        intakeGroup.add(inj);
      }
    });

    // =========================================================================
    // 10. ABGASKRÜMMER (+ VTG-TURBOLADER BEIM DIESEL!)
    // =========================================================================
    const exhaustAnchor = isBoxer ? [0, -1.6, 2.2] : [0, 1.95, 2.1];
    const exhaustGroup = registerPartGroup('exhaustManifold', new THREE.Group(), exhaustAnchor);
    const exhaustRunnerCurves = [];

    const turboPos = isBoxer
      ? new THREE.Vector3(layout.flywheelX - 0.55, 1.15, 2.15)
      : new THREE.Vector3(layout.flywheelX - 0.85, 0.75, 2.25);

    cylSpecs.forEach(spec => {
      const aRad = THREE.MathUtils.degToRad(spec.bankAngleDeg);
      const localExZ = isV ? (spec.bankAngleDeg > 0 ? 0.86 : -0.86) : (isBoxer ? (spec.bankAngleDeg < 0 ? -0.68 : 0.68) : 0.88);
      const localExY = 3.72;
      const portY = yCrank + localExY * Math.cos(aRad) - localExZ * Math.sin(aRad);
      const portZ = localExY * Math.sin(aRad) + localExZ * Math.cos(aRad);

      const collectorTarget = isDiesel
        ? new THREE.Vector3(turboPos.x - 0.55, turboPos.y - 0.05, turboPos.z)
        : new THREE.Vector3(0, isBoxer ? -1.85 : 0.35, portZ >= 0 ? 2.2 : -2.2);

      const outZ = portZ + Math.sign(portZ || 1) * 0.85;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(spec.x, portY, portZ),
        new THREE.Vector3(spec.x, portY - (isBoxer ? 0.85 : 0.15), outZ),
        new THREE.Vector3((spec.x + collectorTarget.x) * 0.5, (portY + collectorTarget.y) * 0.5 - 0.35, (outZ + collectorTarget.z) * 0.55),
        collectorTarget
      ]);
      exhaustRunnerCurves.push(curve);
      const pipe = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.145, 10, false), exhaustMat);
      exhaustGroup.add(pipe);
      cutawayGhostMeshes.push(pipe);
      registerXrayShell(pipe);
    });

    if (isDiesel) {
      // 3D-Turbolader: heiße Abgasturbine (exhaustGroup) + kalter Verdichter & Ladeluftrohr (intakeGroup)
      const hotHousing = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.22, 14, 24), exhaustMat);
      hotHousing.rotation.y = Math.PI / 2;
      hotHousing.position.set(turboPos.x - 0.48, turboPos.y, turboPos.z);
      exhaustGroup.add(hotHousing);

      const hotDownpipe = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 1.55, 16), exhaustMat);
      hotDownpipe.position.set(turboPos.x - 0.82, turboPos.y - 0.88, turboPos.z);
      exhaustGroup.add(hotDownpipe);

      // Sichtbares Abgas-Turbinenrad
      turbineWheel = createImpellerGroup(12, 0.36, 0.11, 0.22, getPartMat('exhaustManifold', 'exhaustValve'));
      turbineWheel.position.set(turboPos.x - 0.48, turboPos.y, turboPos.z);
      exhaustGroup.add(turbineWheel);

      // Mittelgehäuse (Lagergehäuse / Welle)
      const chra = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 0.62, 16),
        getPartMat('intakeManifold', 'darkMetal')
      );
      chra.rotation.z = Math.PI / 2;
      chra.position.set(turboPos.x - 0.12, turboPos.y, turboPos.z);
      intakeGroup.add(chra);

      // Kaltes Verdichtergehäuse (Alu-Schnecke)
      const coldHousing = new THREE.Mesh(
        new THREE.TorusGeometry(0.50, 0.24, 14, 24),
        getPartMat('intakeManifold', 'turboColdMat')
      );
      coldHousing.rotation.y = Math.PI / 2;
      coldHousing.position.set(turboPos.x + 0.28, turboPos.y, turboPos.z);
      intakeGroup.add(coldHousing);

      // Sichtbares Verdichterrad (dreht sich mit Ladedruck/Drehzahl!)
      compressorWheel = createImpellerGroup(10, 0.39, 0.12, 0.24, getPartMat('intakeManifold', 'intakeValve'));
      compressorWheel.position.set(turboPos.x + 0.34, turboPos.y, turboPos.z);
      intakeGroup.add(compressorWheel);

      // Ladeluftrohr (Charge Pipe) vom Verdichter ins Ansaugplenum
      const chargeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(turboPos.x + 0.28, turboPos.y + 0.55, turboPos.z),
        new THREE.Vector3(turboPos.x + 0.35, plenumPos.y + 0.75, turboPos.z * 0.4),
        new THREE.Vector3(plenumPos.x + plenumLen * 0.42, plenumPos.y + 0.32, plenumPos.z),
        new THREE.Vector3(plenumPos.x + plenumLen * 0.35, plenumPos.y, plenumPos.z)
      ]);
      const chargePipe = new THREE.Mesh(
        new THREE.TubeGeometry(chargeCurve, 24, 0.19, 12, false),
        getPartMat('intakeManifold', 'chargePipeMat')
      );
      intakeGroup.add(chargePipe);
    } else {
      // Klassischer Sammler (1 Sammler bei R4, 2 bei V/Boxer)
      const collectorZList = bankCount > 1 ? [2.2, -2.2] : [2.15];
      collectorZList.forEach(cz => {
        const collector = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.21, 1.25, 16), exhaustMat);
        collector.position.set(0, isBoxer ? -2.35 : -0.35, cz);
        exhaustGroup.add(collector);
        cutawayGhostMeshes.push(collector);
        registerXrayShell(collector);
      });
    }

    // =========================================================================
    // 11. STEUERKETTE & STIRNRÄDER (1:2 ÜBERSETZUNG FÜR ALLE BÄNKE)
    // =========================================================================
    const tx = layout.timingX;
    const timingGroup = registerPartGroup('timingDrive', new THREE.Group(), [tx, yCrank + 1.8, 0]);
    const crankSprocket = new THREE.Mesh(
      createSprocketGeometry(12, 0.36, 0.29, 0.16, 0.12),
      getPartMat('timingDrive', 'chainGold')
    );
    crankSprocket.rotation.y = Math.PI / 2;
    crankSprocket.position.set(tx, yCrank, 0);
    timingGroup.add(crankSprocket);

    const camGears = [];
    layout.bankAnglesDeg.forEach(bankDeg => {
      const aRad = THREE.MathUtils.degToRad(bankDeg);
      const intakeSideZ = isV ? (bankDeg > 0 ? -0.38 : 0.38) : -0.38;
      const exhaustSideZ = -intakeSideZ;

      const worldCamPos = localZ => {
        const ly = 4.77;
        return new THREE.Vector3(
          tx,
          yCrank + ly * Math.cos(aRad) - localZ * Math.sin(aRad),
          ly * Math.sin(aRad) + localZ * Math.cos(aRad)
        );
      };

      const pIn = worldCamPos(intakeSideZ);
      const pEx = worldCamPos(exhaustSideZ);

      const gIn = new THREE.Mesh(createSprocketGeometry(24, 0.56, 0.48, 0.15, 0.11), getPartMat('timingDrive', 'intakeValve'));
      gIn.rotation.y = Math.PI / 2;
      gIn.position.copy(pIn);
      timingGroup.add(gIn);
      camGears.push(gIn);

      const gEx = new THREE.Mesh(createSprocketGeometry(24, 0.56, 0.48, 0.15, 0.11), getPartMat('timingDrive', 'exhaustValve'));
      gEx.rotation.y = Math.PI / 2;
      gEx.position.copy(pEx);
      timingGroup.add(gEx);
      camGears.push(gEx);

      // Geschlossene Steuerkette für diese Bank (Kurbel -> Einlassrad -> Auslassrad -> Kurbel)
      const pCrank = new THREE.Vector3(tx, yCrank, 0);
      const midIn = pCrank.clone().lerp(pIn, 0.5).add(new THREE.Vector3(0, 0, Math.sign(pIn.z - pEx.z || -1) * 0.42));
      const midEx = pCrank.clone().lerp(pEx, 0.5).add(new THREE.Vector3(0, 0, Math.sign(pEx.z - pIn.z || 1) * 0.42));
      const topOutIn = pIn.clone().add(new THREE.Vector3(0, 0.55 * Math.cos(aRad), 0.55 * Math.sin(aRad)));
      const topOutEx = pEx.clone().add(new THREE.Vector3(0, 0.55 * Math.cos(aRad), 0.55 * Math.sin(aRad)));
      const bottomCrank = new THREE.Vector3(tx, yCrank - 0.34, 0);

      const chainCurve = new THREE.CatmullRomCurve3(
        [bottomCrank, midEx, topOutEx, topOutIn, midIn],
        true
      );
      const chainMesh = new THREE.Mesh(
        new THREE.TubeGeometry(chainCurve, 64, 0.052, 8, true),
        getPartMat('timingDrive', 'chainGold')
      );
      timingGroup.add(chainMesh);
    });

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

    // Ölwanne unter dem Kurbelgehäuse
    const panW = blockSpanX + 0.12;
    const panY = yCrank - 0.96;
    const panBack = new THREE.Mesh(new THREE.BoxGeometry(panW, 1.05, 0.86), getPartMat('flywheelOilpan', 'darkMetal').clone());
    panBack.position.set(0, panY, -0.43);
    flywheelOilGroup.add(panBack);
    registerXrayShell(panBack);

    const panBottom = new THREE.Mesh(new THREE.BoxGeometry(panW, 0.18, 1.72), getPartMat('flywheelOilpan', 'darkMetal').clone());
    panBottom.position.set(0, panY - 0.48, 0);
    flywheelOilGroup.add(panBottom);

    const panFront = new THREE.Mesh(new THREE.BoxGeometry(panW, 1.05, 0.86), getPartMat('flywheelOilpan', 'darkMetalCut').clone());
    panFront.position.set(0, panY, 0.43);
    flywheelOilGroup.add(panFront);
    cutawayMeshes.push(panFront);
    registerXrayShell(panFront);

    // =========================================================================
    // ANIMIERTER GASFLUSS ENTLANG DER ECHTEN KRÜMMER-KURVEN
    // =========================================================================
    const flowGroup = new THREE.Group();
    const particleGeo = new THREE.SphereGeometry(0.072, 9, 9);
    const intakeParticles = [];
    const exhaustParticles = [];

    for (let c = 0; c < cylSpecs.length; c++) {
      for (let k = 0; k < 3; k++) {
        const iMat = new THREE.MeshBasicMaterial({ color: isDiesel ? 0x0ea5e9 : 0x38bdf8, transparent: true, opacity: 0.85 });
        const im = new THREE.Mesh(particleGeo, iMat);
        flowGroup.add(im);
        intakeParticles.push({ mesh: im, mat: iMat, cyl: c, offset: k / 3, curve: intakeRunnerCurves[c] });

        const eMat = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.85 });
        const em = new THREE.Mesh(particleGeo, eMat);
        flowGroup.add(em);
        exhaustParticles.push({ mesh: em, mat: eMat, cyl: c, offset: k / 3, curve: exhaustRunnerCurves[c] });
      }
    }
    assemblyRoot.add(flowGroup);

    // Tagging & Basispositionen
    for (const [id, group] of partGroups.entries()) {
      basePositions.set(id, group.position.clone());
      tagPart(group, id);
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
      xrayWireframes,
      highlightableByPart,
      exhaustMat,
      cutEdgeMat,
      xrayShellMat,
      pistonNodes,
      conrodNodes,
      crankSpin,
      flywheelSpin,
      crankSprocket,
      camSpins,
      camGears,
      valveAssemblies,
      gasMeshes,
      sparkFlashes,
      dieselSprays,
      throttlePlate,
      compressorWheel,
      turbineWheel,
      flowGroup,
      intakeParticles,
      exhaustParticles,
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

  function setSelectedPart(partId) {
    state.selectedPart = partId;
    if (!built) return;
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
    if (built) built.flowGroup.visible = visible;
  }

  function applyTheme(theme) {
    state.theme = theme;
    const isDark = theme === 'dark';
    basePlate.material.color.setHex(isDark ? 0x162033 : 0xdbe3ee);
    ringAccent.material.color.setHex(isDark ? 0xf97316 : 0xc2410c);
    if (built) {
      built.xrayShellMat.color.setHex(isDark ? 0x38bdf8 : 0x1d4ed8);
      built.xrayWireframes.forEach(m => m.color.setHex(isDark ? 0x38bdf8 : 0x1e40af));
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
  const colorExhaust = new THREE.Color(0x94a3b8);
  const tmpColor = new THREE.Color();

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
    built.xrayShellMat.opacity = 0.06 + state.xrayCurrent * 0.12;
    for (const rec of built.xrayRecords) {
      rec.mesh.material = useXray ? built.xrayShellMat : rec.normalMat;
    }
    for (const lineMat of built.xrayWireframes) {
      lineMat.opacity = state.xrayCurrent * 0.62;
    }

    const cutAlpha = 1 - state.cutawayCurrent;
    for (const mesh of built.cutawayMeshes) {
      if (useXray) {
        mesh.visible = true;
      } else {
        mesh.visible = cutAlpha > 0.04;
        if (mesh.material && mesh.material !== built.xrayShellMat) {
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

    const exhaustCutOpacity = 1 - state.cutawayCurrent * 0.82;
    for (const mesh of built.cutawayGhostMeshes) {
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
    built.cutEdgeMat.opacity = state.cutawayCurrent * (1 - state.xrayCurrent);

    // 2) Effektive Drehzahl (bei Motor aus = 0, bei Overrev = eskalierend, bei Motorschaden = blockiert!)
    const isBlown = explosion.phase === 'blown';
    const isOverrev = explosion.phase === 'overrev';
    const effectiveRpm = isBlown
      ? 0
      : isOverrev
        ? explosion.rpm
        : (telemetry.rpm < state.profile.specs.minRunningRpm ? 0 : telemetry.rpm);

    const effectiveScale = isOverrev ? Math.max(0.42, timeScale * 2.6) : timeScale;
    const visualDegPerSec = (effectiveRpm / 60) * 360 * 0.045 * (effectiveScale / 0.16);
    state.crankDeg = (state.crankDeg + visualDegPerSec * clampedDt) % 720;
    const crankRad = THREE.MathUtils.degToRad(state.crankDeg);

    // Kurbelwelle, Schwungrad, Steuertrieb & Nockenwellen
    built.crankSpin.rotation.x = crankRad;
    built.flywheelSpin.rotation.x = crankRad;
    built.crankSprocket.rotation.x = crankRad;
    for (const cam of built.camSpins) cam.rotation.x = crankRad * 0.5;
    for (const gear of built.camGears) gear.rotation.x = crankRad * 0.5;
    if (built.throttlePlate) {
      built.throttlePlate.rotation.y = (isOverrev ? 1 : telemetry.load) * Math.PI / 2;
    }

    // Turbolader-Schaufelräder (drehen sich rasant mit Ladedruck & Drehzahl!)
    if (built.compressorWheel && built.turbineWheel && !isBlown) {
      const turboSpeed = effectiveRpm > 0
        ? (6 + (telemetry.boostBar || 0) * 18 + (isOverrev ? 28 : 0))
        : 0;
      state.turboSpinRad = (state.turboSpinRad + turboSpeed * clampedDt) % (Math.PI * 2);
      built.compressorWheel.rotation.x = state.turboSpinRad;
      built.turbineWheel.rotation.x = state.turboSpinRad;
    }

    // Abgaskrümmer-Glühen (bei Overrev glüht der Krümmer weiß-orange!)
    const rpmNorm = Math.min(1.5, effectiveRpm / state.profile.specs.maxRpm);
    built.exhaustMat.emissiveIntensity = isOverrev
      ? 0.45 + (explosion.progress || 0) * 1.45
      : isBlown
        ? 0.08
        : 0.04 + Math.pow(rpmNorm, 2.1) * 0.58;

    // 3) Exakte 4-Takt-Kinematik pro Zylinder in Bank-Koordinaten
    const strokes = [];
    const engineRunning = effectiveRpm >= state.profile.specs.minRunningRpm;

    for (let i = 0; i < built.cylSpecs.length; i++) {
      const spec = built.cylSpecs[i];
      const stroke = getCylinderStroke(state.crankDeg, i, state.profile);
      strokes.push(stroke);

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
        iv.mover.position.y = -stroke.intakeLift * 0.24;
        iv.spring.scale.y = 1 - stroke.intakeLift * 0.32;
      }
      for (const ev of va.exhaust) {
        ev.mover.position.y = -stroke.exhaustLift * 0.24;
        ev.spring.scale.y = 1 - stroke.exhaustLift * 0.32;
      }

      // Volumetrischer Brennraum
      const crownY = localYp + PISTON_CROWN_OFFSET;
      const chamberH = Math.max(0.14, LOCAL_Y_ROOF - crownY);
      const gm = built.gasMeshes[i];
      gm.mesh.position.set(spec.x, crownY + chamberH * 0.5, 0);
      gm.mesh.scale.set(1, chamberH, 1);
      gm.mesh.visible = engineRunning && !isBlown;

      if (engineRunning && !isBlown) {
        if (stroke.key === 'intake') {
          gm.mat.color.copy(colorIntake);
          gm.mat.opacity = 0.16 + stroke.intakeMist * 0.28;
        } else if (stroke.key === 'compression') {
          const t = (stroke.cycle - 180) / 180;
          tmpColor.copy(colorIntake).lerp(colorCompress, t);
          gm.mat.color.copy(tmpColor);
          gm.mat.opacity = 0.28 + t * 0.44;
        } else if (stroke.key === 'power') {
          tmpColor.copy(built.isDiesel ? colorDieselFlame : colorFlame).lerp(colorCompress, 0.24);
          gm.mat.color.copy(tmpColor);
          gm.mat.opacity = 0.24 + stroke.flameIntensity * 0.72;
        } else {
          gm.mat.color.copy(colorExhaust);
          gm.mat.opacity = 0.15 + stroke.exhaustGas * 0.34;
        }
      }

      // Otto-Zündfunke
      const sf = built.sparkFlashes[i];
      const showSpark = engineRunning && !isBlown && !built.isDiesel && stroke.sparkIntensity > 0.05;
      sf.mesh.visible = showSpark;
      if (showSpark) {
        sf.mesh.position.set(spec.x, LOCAL_Y_ROOF - 0.08, 0);
        sf.mat.opacity = stroke.sparkIntensity;
        sf.mesh.scale.setScalar(0.6 + stroke.sparkIntensity * 1.15);
      }

      // Diesel-Direkteinspritzkegel
      const ds = built.dieselSprays[i];
      const showSpray = engineRunning && !isBlown && built.isDiesel && stroke.injectionIntensity > 0.05;
      ds.mesh.visible = showSpray;
      if (showSpray) {
        const s = 0.45 + stroke.injectionIntensity * 0.85;
        ds.mesh.position.set(spec.x, LOCAL_Y_ROOF - 0.28 * s, 0);
        ds.mesh.scale.set(s, s, s);
        ds.mat.opacity = stroke.injectionIntensity * 0.88;
      }
    }

    // 4) Animierter Gasfluss entlang der realen Krümmer-Kurven
    if (state.showFlow && engineRunning && !isBlown) {
      built.flowGroup.visible = true;
      for (const p of built.intakeParticles) {
        const st = strokes[p.cyl];
        const active = st.key === 'intake';
        p.mesh.visible = active;
        if (active) {
          const t = ((st.cycle / 180) + p.offset) % 1;
          p.curve.getPoint(t, p.mesh.position);
          p.mat.opacity = Math.sin(t * Math.PI) * 0.85;
        }
      }
      for (const p of built.exhaustParticles) {
        const st = strokes[p.cyl];
        const active = st.key === 'exhaust';
        p.mesh.visible = active;
        if (active) {
          const t = (((st.cycle - 540) / 180) + p.offset) % 1;
          p.curve.getPoint(t, p.mesh.position);
          p.mat.opacity = Math.sin(t * Math.PI) * 0.85;
        }
      }
    } else {
      built.flowGroup.visible = false;
    }

    return { crankDeg: state.crankDeg, strokes, explosion };
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
    applyTheme,
    getPartWorldAnchor,
    update
  };
}
