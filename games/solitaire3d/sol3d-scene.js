// Three.js 3D Tabletop Scene for 4-Suit Spider Solitaire (104 cards, 10 columns, 5-deal stock, 8 completed slots)
// Steep close-up camera framing, dynamic vertical stacking, matte anti-glare cards, tight hitboxes & 8-slot victory waterfall.

import * as THREE from 'three';
import { createSolitaireAssets, TABLE_THEME } from './sol3d-textures.js';

export const CARD_W = 1.0;
export const CARD_H = 1.40;
export const CARD_THICK = 0.013;
export const CARD_CORNER = 0.060;

const NUM_CARDS = 104;
const COL_STEP = 1.06;
const TOP_ROW_Z = -2.90;
const TOP_SCALE = 0.74;
const TABLEAU_Z = -1.50;
const TABLE_CENTER_Z = -0.10;
const TABLE_W = 10.96;
const TABLE_D = 7.40;
const DRAG_LIFT_Y = 0.52;

function colX(col) {
  return (col - 4.5) * COL_STEP;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function seededJitter(cardId, salt) {
  const n = Math.sin((cardId + 1) * 12.9898 + (salt + 1) * 78.233) * 43758.5453;
  return ((n - Math.floor(n)) * 2 - 1) * (0.55 * Math.PI / 180); // subtle ±0.55°
}

function createRoundedCardGeometry(w, h, depth, r) {
  const hw = w * 0.5;
  const hh = h * 0.5;
  const shape = new THREE.Shape();
  shape.moveTo(-hw + r, -hh);
  shape.lineTo(hw - r, -hh);
  shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
  shape.lineTo(hw, hh - r);
  shape.quadraticCurveTo(hw, hh, hw - r, hh);
  shape.lineTo(-hw + r, hh);
  shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
  shape.lineTo(-hw, -hh + r);
  shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

  const raw = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: false,
    curveSegments: 8
  });
  raw.translate(0, 0, -depth * 0.5);

  const posAttr = raw.attributes.position;
  const normAttr = raw.attributes.normal;
  const count = posAttr.count;

  const g0 = []; // front (+Z)
  const g1 = []; // back (-Z)
  const g2 = []; // edges

  for (let i = 0; i < count; i += 3) {
    const nz = (normAttr.getZ(i) + normAttr.getZ(i + 1) + normAttr.getZ(i + 2)) / 3;
    if (nz > 0.7) {
      g0.push(i, i + 1, i + 2);
    } else if (nz < -0.7) {
      g1.push(i, i + 1, i + 2);
    } else {
      g2.push(i, i + 1, i + 2);
    }
  }

  const ordered = [...g0, ...g1, ...g2];
  const newPos = new Float32Array(count * 3);
  const newNorm = new Float32Array(count * 3);
  const newUv = new Float32Array(count * 2);

  for (let k = 0; k < count; k++) {
    const src = ordered[k];
    const x = posAttr.getX(src);
    const y = posAttr.getY(src);
    const z = posAttr.getZ(src);
    newPos[k * 3] = x;
    newPos[k * 3 + 1] = y;
    newPos[k * 3 + 2] = z;

    newNorm[k * 3] = normAttr.getX(src);
    newNorm[k * 3 + 1] = normAttr.getY(src);
    newNorm[k * 3 + 2] = normAttr.getZ(src);

    if (k < g0.length) {
      newUv[k * 2] = x / w + 0.5;
      newUv[k * 2 + 1] = y / h + 0.5;
    } else if (k < g0.length + g1.length) {
      newUv[k * 2] = 0.5 - x / w;
      newUv[k * 2 + 1] = y / h + 0.5;
    } else {
      newUv[k * 2] = 0.5;
      newUv[k * 2 + 1] = 0.5;
    }
  }

  raw.dispose();
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(newPos, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(newNorm, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(newUv, 2));
  geo.addGroup(0, g0.length, 0);
  geo.addGroup(g0.length, g1.length, 1);
  geo.addGroup(g0.length + g1.length, g2.length, 2);
  return geo;
}

function createGlowTexture(colorStr = 'rgba(255, 214, 110, 0.95)') {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  const r = 24;
  const m = 18;
  ctx.clearRect(0, 0, size, size);

  ctx.save();
  ctx.shadowColor = colorStr;
  ctx.shadowBlur = 22;
  ctx.strokeStyle = colorStr;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(m + r, m);
  ctx.lineTo(size - m - r, m);
  ctx.quadraticCurveTo(size - m, m, size - m, m + r);
  ctx.lineTo(size - m, size - m - r);
  ctx.quadraticCurveTo(size - m, size - m, size - m - r, size - m);
  ctx.lineTo(m + r, size - m);
  ctx.quadraticCurveTo(m, size - m, m, size - m - r);
  ctx.lineTo(m, m + r);
  ctx.quadraticCurveTo(m, m, m + r, m);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createSparkTexture() {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 1, 32, 32, 30);
  g.addColorStop(0, 'rgba(255, 250, 225, 1)');
  g.addColorStop(0.35, 'rgba(250, 204, 90, 0.85)');
  g.addColorStop(1, 'rgba(250, 180, 50, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class SolitaireScene {
  constructor(canvas, containerEl) {
    this.canvas = canvas;
    this.containerEl = containerEl;
    this.cameraPreset = '3d'; // '3d' (steep playable) or 'top' (near-orthographic)

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(TABLE_THEME.bgHex);

    // Narrower FOV (34 deg) reduces perspective distortion across all 10 columns
    this.camera = new THREE.PerspectiveCamera(34, 16 / 10, 0.5, 90);
    this.camCurPos = new THREE.Vector3(0, 10.8, 2.8);
    this.camTargetPos = new THREE.Vector3(0, 10.8, 2.8);
    this.camCurLook = new THREE.Vector3(0, 0, -0.10);
    this.camTargetLook = new THREE.Vector3(0, 0, -0.10);
    this.camInitialized = false;
    this.maxBottomCenterZ = 2.60;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();
    this.assets = createSolitaireAssets(maxAniso);

    this.cardGeo = createRoundedCardGeometry(CARD_W, CARD_H, CARD_THICK, CARD_CORNER);
    this.glowTex = createGlowTexture('rgba(255, 214, 110, 0.95)');
    this.warnGlowTex = createGlowTexture('rgba(255, 115, 95, 0.95)');
    this.sparkTex = createSparkTexture();

    this.cardVisuals = []; // 104 objects
    this.hitMeshes = [];   // 104 card meshes
    this.slotHitMeshes = [];
    this.targetGlows = {}; // key -> glow state
    this.warnColumns = null;

    this.dragState = null;
    this.animations = new Map();
    this.hintPulse = null;
    this.waterfallActive = false;
    this.waterfallCards = [];
    this.waterfallPool = [];
    this.waterfallSpawnTimer = 0;
    this.waterfallQueue = [];
    this.sparks = [];
    this.sparkGeo = null;
    this.sparkPoints = null;

    this._buildLighting();
    this._buildTable();
    this._buildSlots();
    this._buildCardPool();
    this._buildWaterfallPool();
    this._buildSparksSystem();

    this.resize();
  }

  _buildLighting() {
    // Diffused, even tabletop lighting with no specular hotspots
    const hemi = new THREE.HemisphereLight(0xfffdf8, 0x16281f, 0.92);
    this.scene.add(hemi);

    const ambient = new THREE.AmbientLight(0xffffff, 0.24);
    this.scene.add(ambient);

    const dir = new THREE.DirectionalLight(0xfffaf0, 0.44);
    dir.position.set(1.8, 13.5, 3.6);
    dir.target.position.set(0, 0, TABLE_CENTER_Z);
    dir.castShadow = true;
    dir.shadow.mapSize.set(2048, 2048);
    dir.shadow.camera.left = -6.2;
    dir.shadow.camera.right = 6.2;
    dir.shadow.camera.top = 5.0;
    dir.shadow.camera.bottom = -5.0;
    dir.shadow.camera.near = 4;
    dir.shadow.camera.far = 24;
    dir.shadow.bias = -0.0004;
    dir.shadow.normalBias = 0.012;
    this.scene.add(dir);
    this.scene.add(dir.target);
  }

  _buildTable() {
    const tableGroup = new THREE.Group();

    const feltGeo = new THREE.PlaneGeometry(TABLE_W, TABLE_D);
    this.feltMat = new THREE.MeshStandardMaterial({
      map: this.assets.feltTex,
      bumpMap: this.assets.feltBump,
      bumpScale: 0.006,
      roughness: 0.98,
      metalness: 0.0
    });
    const feltMesh = new THREE.Mesh(feltGeo, this.feltMat);
    feltMesh.rotation.x = -Math.PI / 2;
    feltMesh.position.set(0, 0, TABLE_CENTER_Z);
    feltMesh.receiveShadow = true;
    tableGroup.add(feltMesh);

    // Slim dark walnut wood border
    const woodMat = new THREE.MeshStandardMaterial({
      map: this.assets.woodTex,
      roughness: 0.62,
      metalness: 0.03
    });

    const railW = 0.26;
    const railH = 0.20;
    const outerW = TABLE_W + railW * 2;
    const outerD = TABLE_D + railW * 2;
    const innerW = TABLE_W;
    const innerD = TABLE_D;

    const frameShape = new THREE.Shape();
    const ox = outerW * 0.5;
    const oy = outerD * 0.5;
    const cr = 0.28;
    frameShape.moveTo(-ox + cr, -oy);
    frameShape.lineTo(ox - cr, -oy);
    frameShape.quadraticCurveTo(ox, -oy, ox, -oy + cr);
    frameShape.lineTo(ox, oy - cr);
    frameShape.quadraticCurveTo(ox, oy, ox - cr, oy);
    frameShape.lineTo(-ox + cr, oy);
    frameShape.quadraticCurveTo(-ox, oy, -ox, oy - cr);
    frameShape.lineTo(-ox, -oy + cr);
    frameShape.quadraticCurveTo(-ox, -oy, -ox + cr, -oy);

    const hole = new THREE.Path();
    const ix = innerW * 0.5;
    const iy = innerD * 0.5;
    const ir = 0.10;
    hole.moveTo(-ix + ir, -iy);
    hole.lineTo(ix - ir, -iy);
    hole.quadraticCurveTo(ix, -iy, ix, -iy + ir);
    hole.lineTo(ix, iy - ir);
    hole.quadraticCurveTo(ix, iy, ix - ir, iy);
    hole.lineTo(-ix + ir, iy);
    hole.quadraticCurveTo(-ix, iy, -ix, iy - ir);
    hole.lineTo(-ix, -iy + ir);
    hole.quadraticCurveTo(-ix, -iy, -ix + ir, -iy);
    frameShape.holes.push(hole);

    const frameGeo = new THREE.ExtrudeGeometry(frameShape, {
      depth: railH,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
      curveSegments: 10
    });
    const frameMesh = new THREE.Mesh(frameGeo, woodMat);
    frameMesh.rotation.x = -Math.PI / 2;
    frameMesh.position.set(0, -0.13, TABLE_CENTER_Z);
    frameMesh.castShadow = true;
    frameMesh.receiveShadow = true;
    tableGroup.add(frameMesh);

    this.scene.add(tableGroup);
  }

  _buildSlots() {
    const topSlotGeo = new THREE.PlaneGeometry(CARD_W * TOP_SCALE * 1.02, CARD_H * TOP_SCALE * 1.02);
    const topHitGeo = new THREE.PlaneGeometry(CARD_W * 1.55, CARD_H * TOP_SCALE * 1.28);
    const tabSlotGeo = new THREE.PlaneGeometry(CARD_W * 1.01, CARD_H * 1.01);
    const tabHitGeo = new THREE.PlaneGeometry(CARD_W * 1.05, CARD_H * 1.25);
    const glowGeo = new THREE.PlaneGeometry(CARD_W * 1.16, CARD_H * 1.16);
    const topGlowGeo = new THREE.PlaneGeometry(CARD_W * TOP_SCALE * 1.22, CARD_H * TOP_SCALE * 1.22);

    const createSlot = (key, x, z, tex, meta, isTopRow = false) => {
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
        opacity: 0.85
      });
      const decal = new THREE.Mesh(isTopRow ? topSlotGeo : tabSlotGeo, mat);
      decal.rotation.x = -Math.PI / 2;
      decal.position.set(x, 0.003, z);
      this.scene.add(decal);

      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(isTopRow ? topHitGeo : tabHitGeo, hitMat);
      hitMesh.rotation.x = -Math.PI / 2;
      hitMesh.position.set(x, 0.006, z);
      hitMesh.userData = { slotMeta: meta };
      this.scene.add(hitMesh);
      this.slotHitMeshes.push(hitMesh);

      const glowMat = new THREE.MeshBasicMaterial({
        map: this.glowTex,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const glowMesh = new THREE.Mesh(isTopRow ? topGlowGeo : glowGeo, glowMat);
      glowMesh.rotation.x = -Math.PI / 2;
      glowMesh.position.set(x, 0.012, z);
      this.scene.add(glowMesh);
      this.targetGlows[key] = { mesh: glowMesh, baseZ: z, active: false, hovered: false };
    };

    // Stock on top-left (spanning col 0..1 visually via 5 fanned piles)
    createSlot('stock', colX(0), TOP_ROW_Z, this.assets.slotTextures.stock, { type: 'stock', idx: 0 }, true);

    // 8 Completed sequence slots on top-right (cols 2..9)
    for (let f = 0; f < 8; f++) {
      createSlot(`foundation_${f}`, colX(2 + f), TOP_ROW_Z, this.assets.slotTextures.foundation, {
        type: 'foundation',
        idx: f
      }, true);
    }

    // 10 Tableau columns
    for (let c = 0; c < 10; c++) {
      createSlot(`tableau_${c}`, colX(c), TABLEAU_Z, this.assets.slotTextures.tableau, {
        type: 'tableau',
        idx: c
      }, false);
    }
  }

  _buildCardPool() {
    // Matte materials (high roughness, 0 metalness) prevent light reflections from washing out values
    const backMat = new THREE.MeshStandardMaterial({
      map: this.assets.backTex,
      roughness: 0.90,
      metalness: 0.0
    });

    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0xbdb5a6,
      roughness: 0.88,
      metalness: 0.0
    });

    for (let id = 0; id < NUM_CARDS; id++) {
      const faceIndex = id % 52;
      const frontMat = new THREE.MeshStandardMaterial({
        map: this.assets.faceTextures[faceIndex],
        roughness: 0.94,
        metalness: 0.0
      });

      const root = new THREE.Group();
      const tiltPivot = new THREE.Group();
      const flipPivot = new THREE.Group();
      flipPivot.rotation.x = -Math.PI / 2;

      const mesh = new THREE.Mesh(this.cardGeo, [frontMat, backMat, edgeMat]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { cardId: id };

      flipPivot.add(mesh);
      tiltPivot.add(flipPivot);
      root.add(tiltPivot);
      this.scene.add(root);

      this.cardVisuals[id] = {
        id,
        root,
        tiltPivot,
        flipPivot,
        mesh,
        frontMat,
        curPos: new THREE.Vector3(colX(0), 0.1, TOP_ROW_Z),
        targetPos: new THREE.Vector3(colX(0), 0.1, TOP_ROW_Z),
        curFlip: Math.PI,
        targetFlip: Math.PI,
        curYaw: 0,
        targetYaw: 0,
        curScale: TOP_SCALE,
        targetScale: TOP_SCALE,
        curTiltX: 0,
        curTiltZ: 0
      };
      this.hitMeshes.push(mesh);
    }
  }

  _buildWaterfallPool() {
    const backMat = new THREE.MeshStandardMaterial({
      map: this.assets.backTex,
      roughness: 0.90,
      metalness: 0.0
    });
    const edgeMat = new THREE.MeshStandardMaterial({ color: 0xbdb5a6, roughness: 0.88 });

    for (let i = 0; i < 28; i++) {
      const frontMat = new THREE.MeshStandardMaterial({
        map: this.assets.faceTextures[0],
        roughness: 0.92,
        metalness: 0.0
      });
      const mesh = new THREE.Mesh(this.cardGeo, [frontMat, backMat, edgeMat]);
      mesh.castShadow = true;
      mesh.visible = false;
      this.scene.add(mesh);
      this.waterfallPool.push({ mesh, frontMat, inUse: false });
    }
  }

  _buildSparksSystem() {
    const maxSparks = 240;
    const positions = new Float32Array(maxSparks * 3);
    const colors = new Float32Array(maxSparks * 3);
    this.sparkGeo = new THREE.BufferGeometry();
    this.sparkGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.sparkGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.sparkGeo.setDrawRange(0, 0);

    const mat = new THREE.PointsMaterial({
      size: 0.24,
      map: this.sparkTex,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.sparkPoints = new THREE.Points(this.sparkGeo, mat);
    this.sparkPoints.frustumCulled = false;
    this.scene.add(this.sparkPoints);
  }

  _spawnSparks(x, y, z, count = 10) {
    for (let i = 0; i < count; i++) {
      if (this.sparks.length >= 240) this.sparks.shift();
      const angle = Math.random() * Math.PI * 2;
      const spd = 0.8 + Math.random() * 2.6;
      this.sparks.push({
        x,
        y: Math.max(0.05, y),
        z,
        vx: Math.cos(angle) * spd,
        vy: 1.5 + Math.random() * 2.8,
        vz: Math.sin(angle) * spd,
        life: 0,
        maxLife: 0.55 + Math.random() * 0.45
      });
    }
  }

  setCameraPreset(preset) {
    this.cameraPreset = preset === 'top' ? 'top' : '3d';
    this._updateCameraTargets(false);
  }

  _updateCameraTargets(snap = false) {
    const w = this.containerEl.clientWidth || window.innerWidth;
    const h = this.containerEl.clientHeight || window.innerHeight;
    const aspect = Math.max(0.42, w / Math.max(1, h));

    const isTop = this.cameraPreset === 'top';
    const pitchDeg = isTop ? 85 : (aspect < 0.9 ? 76 : 74);
    const pitch = THREE.MathUtils.degToRad(pitchDeg);
    const vFovRad = THREE.MathUtils.degToRad(this.camera.fov);
    const tanV = Math.tan(vFovRad * 0.5);
    const tanH = tanV * aspect;

    // Frame all 10 columns nearly edge-to-edge (minimal side margins)
    const needW = aspect < 1.0 ? 10.74 : 10.90;
    // Active playfield depth from top of Stock/Foundations (-3.42) to bottom of Tableau (+3.25)
    const needD = 6.82;

    const distH = (needW * 0.5) / tanH;
    const distV = ((needD * Math.sin(pitch)) * 0.5) / tanV;
    const dist = Math.max(distH, distV) * 1.01;

    // On portrait / taller screens we get extra vertical room so columns can expand further down before compressing
    const visibleWorldH = (2 * dist * tanV) / Math.sin(pitch);
    const extraVert = Math.max(0, visibleWorldH - needD);
    this.maxBottomCenterZ = Math.min(3.55, 2.55 + extraVert * 0.36);

    const portraitBiasZ = aspect < 0.85 ? Math.min(1.8, extraVert * 0.16) : 0;
    const lookZ = -0.09 + portraitBiasZ;
    this.camTargetLook.set(0, 0, lookZ);
    this.camTargetPos.set(
      0,
      Math.sin(pitch) * dist,
      lookZ + Math.cos(pitch) * dist
    );

    if (snap || !this.camInitialized) {
      this.camCurPos.copy(this.camTargetPos);
      this.camCurLook.copy(this.camTargetLook);
      this.camera.position.copy(this.camCurPos);
      this.camera.lookAt(this.camCurLook);
      this.camInitialized = true;
    }
  }

  resize() {
    const w = this.containerEl.clientWidth || window.innerWidth;
    const h = this.containerEl.clientHeight || window.innerHeight;
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    this._updateCameraTargets(true);
  }

  _computeColumnSteps(col, engine) {
    let fdCount = 0;
    let fuCount = 0;
    for (let r = 0; r < col.length - 1; r++) {
      if (engine.getCard(col[r]).faceUp) fuCount++;
      else fdCount++;
    }

    const availSpan = Math.max(3.2, this.maxBottomCenterZ - TABLEAU_Z);
    let fdStep = 0.11;
    let fuStep = 0.35;

    if (fdCount * fdStep + fuCount * fuStep > availSpan) {
      fdStep = 0.07;
      const remaining = Math.max(0.8, availSpan - fdCount * fdStep);
      fuStep = fuCount > 0 ? Math.max(0.165, Math.min(0.35, remaining / fuCount)) : 0.35;
    }

    return { fdStep, fuStep };
  }

  computePileSlotPositions(engine) {
    const targets = new Map();

    // Stock: 5 deals of 10 cards fanned horizontally across col 0..1
    const sLen = engine.stock.length;
    const totalBatches = Math.ceil(sLen / 10);
    for (let i = 0; i < sLen; i++) {
      const cid = engine.stock[i];
      const batchIdx = Math.floor(i / 10); // 0 = deepest (dealt last), 4 = top (dealt first)
      const inBatch = i % 10;
      const xOffset = -0.14 + batchIdx * 0.15;
      targets.set(cid, {
        pos: new THREE.Vector3(colX(0) + xOffset, 0.014 + batchIdx * 0.025 + inBatch * 0.0025, TOP_ROW_Z),
        faceUp: false,
        scale: TOP_SCALE,
        yaw: seededJitter(cid, 1) * 0.4,
        pile: { type: 'stock', idx: 0, cardIdx: i }
      });
    }

    // 8 Completed Sequence Foundations (top-right slots over cols 2..9)
    for (let f = 0; f < 8; f++) {
      const pile = engine.foundations[f];
      for (let i = 0; i < pile.length; i++) {
        const cid = pile[i];
        targets.set(cid, {
          pos: new THREE.Vector3(colX(2 + f), 0.014 + i * (CARD_THICK * 0.55), TOP_ROW_Z),
          faceUp: true,
          scale: TOP_SCALE,
          yaw: seededJitter(cid, 3 + f) * 0.35,
          pile: { type: 'foundation', idx: f, cardIdx: i }
        });
      }
    }

    // 10 Tableau columns with dynamic vertical compression
    for (let c = 0; c < 10; c++) {
      const col = engine.tableau[c];
      const { fdStep, fuStep } = this._computeColumnSteps(col, engine);
      let zCursor = TABLEAU_Z;
      for (let r = 0; r < col.length; r++) {
        const cid = col[r];
        const card = engine.getCard(cid);
        targets.set(cid, {
          pos: new THREE.Vector3(colX(c), 0.015 + r * CARD_THICK, zCursor),
          faceUp: card.faceUp,
          scale: 1.0,
          yaw: seededJitter(cid, 10 + c),
          pile: { type: 'tableau', idx: c, cardIdx: r }
        });
        zCursor += card.faceUp ? fuStep : fdStep;
      }
    }

    return targets;
  }

  syncState(engine, { dealAnimate = false, staggerMs = 18, instant = false, clearedSequences = null } = {}) {
    const targets = this.computePileSlotPositions(engine);
    const clearedDelayMap = new Map();

    if (clearedSequences && clearedSequences.length > 0) {
      for (const seq of clearedSequences) {
        seq.cards.forEach((cid, idx) => {
          // Peel from top card down (or reversed) so they arc smoothly into the foundation slot
          clearedDelayMap.set(cid, idx * 24);
        });
      }
    }

    for (let id = 0; id < NUM_CARDS; id++) {
      const vis = this.cardVisuals[id];
      const t = targets.get(id);
      if (!t) continue;

      vis.mesh.visible = true;
      vis.mesh.userData.pile = t.pile;

      if (instant) {
        this.animations.delete(id);
        vis.curPos.copy(t.pos);
        vis.targetPos.copy(t.pos);
        vis.curFlip = t.faceUp ? 0 : Math.PI;
        vis.targetFlip = vis.curFlip;
        vis.curYaw = t.yaw;
        vis.targetYaw = t.yaw;
        vis.curScale = t.scale;
        vis.targetScale = t.scale;
        this._applyVisual(vis);
        continue;
      }

      const targetFlip = t.faceUp ? 0 : Math.PI;
      const posMoved = vis.targetPos.distanceToSquared(t.pos) > 0.0001;
      const flipChanged = Math.abs(vis.targetFlip - targetFlip) > 0.01;
      const scaleChanged = Math.abs(vis.targetScale - t.scale) > 0.005;

      if (dealAnimate) {
        vis.curPos.set(colX(0) + 0.46, 0.25, TOP_ROW_Z);
        vis.curFlip = Math.PI;
        vis.curYaw = 0;
        vis.curScale = TOP_SCALE;
        this._applyVisual(vis);

        if (t.pile.type === 'tableau') {
          const delay = (t.pile.cardIdx * 10 + t.pile.idx) * staggerMs;
          this.animateCardTo(id, t.pos, targetFlip, t.yaw, t.scale, 360, delay, 0.58);
        } else {
          vis.curPos.copy(t.pos);
          vis.targetPos.copy(t.pos);
          vis.curFlip = targetFlip;
          vis.targetFlip = targetFlip;
          vis.curYaw = t.yaw;
          vis.targetYaw = t.yaw;
          vis.curScale = t.scale;
          vis.targetScale = t.scale;
          this._applyVisual(vis);
        }
      } else if (posMoved || flipChanged || scaleChanged) {
        const dist = vis.curPos.distanceTo(t.pos);
        const delay = clearedDelayMap.get(id) || 0;
        const dur = clearedDelayMap.has(id)
          ? 340
          : Math.max(190, Math.min(360, 175 + dist * 28));
        const arc = clearedDelayMap.has(id)
          ? 0.72
          : Math.max(flipChanged ? 0.36 : 0.12, Math.min(0.75, dist * 0.14));
        this.animateCardTo(id, t.pos, targetFlip, t.yaw, t.scale, dur, delay, arc);
      } else {
        vis.targetYaw = t.yaw;
      }
    }

    // Update target glow anchors to top card of each tableau column
    for (let c = 0; c < 10; c++) {
      const col = engine.tableau[c];
      const glow = this.targetGlows[`tableau_${c}`];
      if (!glow) continue;
      if (col.length === 0) {
        glow.baseZ = TABLEAU_Z;
        glow.mesh.position.y = 0.012;
      } else {
        const topTarget = targets.get(col[col.length - 1]);
        if (topTarget) {
          glow.baseZ = topTarget.pos.z;
          glow.mesh.position.y = topTarget.pos.y + 0.012;
        }
      }
      glow.mesh.position.z = glow.baseZ;
    }
  }

  animateCardTo(cardId, toPos, toFlip, toYaw, toScale, durationMs = 260, delayMs = 0, arcHeight = 0.42) {
    const vis = this.cardVisuals[cardId];
    if (!vis) return;
    vis.targetPos.copy(toPos);
    vis.targetFlip = toFlip;
    vis.targetYaw = toYaw;
    vis.targetScale = toScale;

    this.animations.set(cardId, {
      startTime: performance.now() + delayMs,
      duration: durationMs,
      fromPos: vis.curPos.clone(),
      toPos: toPos.clone(),
      fromFlip: vis.curFlip,
      toFlip,
      fromYaw: vis.curYaw,
      toYaw,
      fromScale: vis.curScale,
      toScale,
      arcHeight
    });
  }

  startDrag(cardIds, hitPoint) {
    const items = cardIds.map((id, i) => {
      const vis = this.cardVisuals[id];
      this.animations.delete(id);
      return {
        id,
        vis,
        offsetX: vis.curPos.x - hitPoint.x,
        offsetZ: vis.curPos.z - hitPoint.z,
        stackIdx: i
      };
    });

    this.dragState = {
      items,
      planePoint: hitPoint.clone(),
      prevX: hitPoint.x,
      prevZ: hitPoint.z
    };
  }

  setValidDropTargets(validDests, hoveredKey = null) {
    for (const [key, g] of Object.entries(this.targetGlows)) {
      let active = false;
      if (validDests && key.startsWith('tableau_')) {
        const c = Number(key.split('_')[1]);
        active = validDests.tableau.includes(c);
      }
      g.active = active;
      g.hovered = active && key === hoveredKey;
    }
  }

  flashEmptyColumns(colIndices) {
    if (!colIndices || colIndices.length === 0) return;
    this.warnColumns = {
      cols: new Set(colIndices),
      start: performance.now(),
      duration: 1400
    };
  }

  updateDragPoint(point) {
    if (!this.dragState) return;
    this.dragState.planePoint.copy(point);
  }

  endDrag() {
    this.dragState = null;
    this.setValidDropTargets(null, null);
  }

  getBestDropTarget(point, validDests) {
    if (!validDests) return null;
    let best = null;
    let bestScore = Infinity;

    for (const c of validDests.tableau) {
      const glow = this.targetGlows[`tableau_${c}`];
      const targetZ = glow ? glow.baseZ : TABLEAU_Z;
      const dx = Math.abs(point.x - colX(c));
      const dz = Math.max(0, Math.abs(point.z - targetZ) - 0.72);
      // Tight horizontal capture window tailored for 10 columns (COL_STEP = 1.06)
      if (dx < 0.78 && point.z > TABLEAU_Z - 1.1) {
        const score = Math.hypot(dx * 1.4, dz * 0.55);
        if (score < bestScore) {
          bestScore = score;
          best = { type: 'tableau', idx: c, key: `tableau_${c}` };
        }
      }
    }

    return best;
  }

  triggerHintPulse(hint) {
    if (!hint) return;
    this.hintPulse = {
      start: performance.now(),
      duration: 1800,
      hint
    };
  }

  raycastFromClient(clientX, clientY, targets) {
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, this.camera);
    return {
      raycaster,
      hits: raycaster.intersectObjects(targets, false)
    };
  }

  raycastDragPlane(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, this.camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -DRAG_LIFT_Y);
    const pt = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, pt);
    return pt;
  }

  startWaterfall(engine) {
    this.waterfallActive = true;
    this.waterfallQueue = [];
    this.waterfallSpawnTimer = 0.05;

    for (let r = 12; r >= 0; r--) {
      for (let f = 0; f < 8; f++) {
        const pile = engine.foundations[f];
        if (pile[r] !== undefined) {
          this.waterfallQueue.push({ cardId: pile[r], fIdx: f });
        }
      }
    }
  }

  stopWaterfall() {
    this.waterfallActive = false;
    this.waterfallQueue = [];
    for (const item of this.waterfallCards) {
      item.poolObj.inUse = false;
      item.poolObj.mesh.visible = false;
    }
    this.waterfallCards = [];
    this.sparks = [];
    if (this.sparkGeo) this.sparkGeo.setDrawRange(0, 0);
  }

  _spawnWaterfallCard() {
    if (this.waterfallQueue.length === 0) return;
    const poolObj = this.waterfallPool.find((p) => !p.inUse);
    if (!poolObj) return;

    const next = this.waterfallQueue.shift();
    this.waterfallQueue.push(next);

    poolObj.inUse = true;
    poolObj.frontMat.map = this.assets.faceTextures[next.cardId % 52];
    poolObj.frontMat.needsUpdate = true;
    poolObj.mesh.visible = true;
    poolObj.mesh.scale.setScalar(TOP_SCALE);
    poolObj.mesh.position.set(colX(2 + next.fIdx), 0.25, TOP_ROW_Z);
    poolObj.mesh.rotation.set(-Math.PI / 2, 0, (Math.random() - 0.5) * 0.25);

    const dirX = next.fIdx < 4 ? -(1.2 + Math.random() * 3.4) : (1.2 + Math.random() * 3.4);
    this.waterfallCards.push({
      poolObj,
      vx: dirX + (Math.random() - 0.5) * 2.0,
      vy: 3.0 + Math.random() * 2.4,
      vz: 2.6 + Math.random() * 4.2,
      spinZ: (Math.random() - 0.5) * 2.2,
      age: 0
    });

    this._spawnSparks(colX(2 + next.fIdx), 0.35, TOP_ROW_Z, 7);
  }

  _applyVisual(vis) {
    vis.root.position.copy(vis.curPos);
    vis.root.rotation.y = vis.curYaw;
    vis.root.scale.setScalar(vis.curScale);
    vis.tiltPivot.rotation.x = vis.curTiltX;
    vis.tiltPivot.rotation.z = vis.curTiltZ;
    vis.mesh.rotation.y = vis.curFlip;
  }

  update(dt, nowMs) {
    // 1. Smooth camera transitions
    const camAlpha = 1 - Math.exp(-9.0 * dt);
    this.camCurPos.lerp(this.camTargetPos, camAlpha);
    this.camCurLook.lerp(this.camTargetLook, camAlpha);
    this.camera.position.copy(this.camCurPos);
    this.camera.lookAt(this.camCurLook);

    // 2. Active card Bezier & Flip animations
    const draggedIds = new Set(this.dragState ? this.dragState.items.map((i) => i.id) : []);

    for (const [id, anim] of this.animations.entries()) {
      if (draggedIds.has(id)) {
        this.animations.delete(id);
        continue;
      }
      if (nowMs < anim.startTime) continue;

      const t = Math.min(1, (nowMs - anim.startTime) / anim.duration);
      const ePos = easeOutCubic(t);
      const eFlip = easeInOutCubic(t);

      const vis = this.cardVisuals[id];
      const arc = Math.sin(t * Math.PI) * anim.arcHeight;
      vis.curPos.lerpVectors(anim.fromPos, anim.toPos, ePos);
      vis.curPos.y += arc;
      vis.curFlip = THREE.MathUtils.lerp(anim.fromFlip, anim.toFlip, eFlip);
      vis.curYaw = THREE.MathUtils.lerp(anim.fromYaw, anim.toYaw, ePos);
      vis.curScale = THREE.MathUtils.lerp(anim.fromScale, anim.toScale, ePos);
      vis.curTiltX = THREE.MathUtils.lerp(vis.curTiltX, 0, 0.25);
      vis.curTiltZ = THREE.MathUtils.lerp(vis.curTiltZ, 0, 0.25);

      if (t >= 1) {
        vis.curPos.copy(anim.toPos);
        vis.curFlip = anim.toFlip;
        vis.curYaw = anim.toYaw;
        vis.curScale = anim.toScale;
        vis.curTiltX = 0;
        vis.curTiltZ = 0;
        this.animations.delete(id);
      }
    }

    // 3. Dragged stack inertia & lift
    if (this.dragState) {
      const ds = this.dragState;
      const dx = ds.planePoint.x - ds.prevX;
      const dz = ds.planePoint.z - ds.prevZ;
      ds.prevX = ds.planePoint.x;
      ds.prevZ = ds.planePoint.z;

      const invDt = 1 / Math.max(0.008, dt);
      const targetTiltZ = THREE.MathUtils.clamp(-dx * invDt * 0.014, -0.18, 0.18);
      const targetTiltX = THREE.MathUtils.clamp(dz * invDt * 0.014, -0.18, 0.18);

      for (const item of ds.items) {
        const vis = item.vis;
        const tx = ds.planePoint.x + item.offsetX;
        const tz = ds.planePoint.z + item.offsetZ + item.stackIdx * 0.26;
        const ty = DRAG_LIFT_Y + item.stackIdx * (CARD_THICK + 0.003);

        vis.curPos.x = THREE.MathUtils.lerp(vis.curPos.x, tx, 0.52);
        vis.curPos.z = THREE.MathUtils.lerp(vis.curPos.z, tz, 0.52);
        vis.curPos.y = THREE.MathUtils.lerp(vis.curPos.y, ty, 0.40);
        vis.curYaw = THREE.MathUtils.lerp(vis.curYaw, 0, 0.30);
        vis.curScale = THREE.MathUtils.lerp(vis.curScale, 1.0, 0.35);
        vis.curTiltX = THREE.MathUtils.lerp(vis.curTiltX, targetTiltX, 0.24);
        vis.curTiltZ = THREE.MathUtils.lerp(vis.curTiltZ, targetTiltZ, 0.24);
      }
    }

    // 4. Target glow, empty column warning, & hint pulses
    const pulse = 0.55 + 0.45 * Math.sin(nowMs * 0.007);
    let hintSrcId = null;
    let hintTargetKey = null;
    if (this.hintPulse) {
      if (nowMs - this.hintPulse.start > this.hintPulse.duration) {
        this.hintPulse = null;
      } else if (this.hintPulse.hint.action === 'draw') {
        hintTargetKey = 'stock';
      } else if (this.hintPulse.hint.action === 'move') {
        hintSrcId = this.hintPulse.hint.cards[0];
        hintTargetKey = `${this.hintPulse.hint.target.type}_${this.hintPulse.hint.target.idx}`;
      }
    }

    if (this.warnColumns && nowMs - this.warnColumns.start > this.warnColumns.duration) {
      this.warnColumns = null;
    }

    for (const [key, g] of Object.entries(this.targetGlows)) {
      let targetOpacity = 0;
      let useWarn = false;
      if (g.hovered) targetOpacity = 0.92;
      else if (g.active) targetOpacity = 0.34 + 0.16 * pulse;
      else if (hintTargetKey === key) targetOpacity = 0.45 + 0.45 * pulse;
      else if (this.warnColumns && key.startsWith('tableau_')) {
        const colIdx = Number(key.split('_')[1]);
        if (this.warnColumns.cols.has(colIdx)) {
          useWarn = true;
          targetOpacity = 0.48 + 0.48 * pulse;
        }
      }

      const desiredTex = useWarn ? this.warnGlowTex : this.glowTex;
      if (g.mesh.material.map !== desiredTex) {
        g.mesh.material.map = desiredTex;
        g.mesh.material.needsUpdate = true;
      }
      g.mesh.material.opacity = THREE.MathUtils.lerp(g.mesh.material.opacity, targetOpacity, 0.25);
    }

    for (let id = 0; id < NUM_CARDS; id++) {
      const vis = this.cardVisuals[id];
      if (!draggedIds.has(id) && !this.animations.has(id)) {
        vis.curTiltX = THREE.MathUtils.lerp(vis.curTiltX, 0, 0.18);
        vis.curTiltZ = THREE.MathUtils.lerp(vis.curTiltZ, 0, 0.18);
      }
      this._applyVisual(vis);
      if (hintSrcId === id) {
        vis.root.position.y += 0.12 * pulse;
      }
    }

    // 5. Victory 3D Card Waterfall & Golden Sparks
    if (this.waterfallActive) {
      this.waterfallSpawnTimer -= dt;
      if (this.waterfallSpawnTimer <= 0) {
        this._spawnWaterfallCard();
        this.waterfallSpawnTimer = 0.20;
      }

      for (let i = this.waterfallCards.length - 1; i >= 0; i--) {
        const wc = this.waterfallCards[i];
        wc.age += dt;
        wc.vy -= 14.5 * dt;
        const m = wc.poolObj.mesh;
        m.position.x += wc.vx * dt;
        m.position.y += wc.vy * dt;
        m.position.z += wc.vz * dt;
        m.rotation.z += wc.spinZ * dt;

        if (m.position.y <= 0.04 && wc.vy < 0) {
          m.position.y = 0.04;
          wc.vy = Math.abs(wc.vy) * 0.76;
          this._spawnSparks(m.position.x, 0.08, m.position.z, 8);
        }

        if (wc.age > 6.5 || m.position.z > 8 || Math.abs(m.position.x) > 10) {
          wc.poolObj.inUse = false;
          wc.poolObj.mesh.visible = false;
          this.waterfallCards.splice(i, 1);
        }
      }
    }

    if (this.sparks.length > 0) {
      const posArr = this.sparkGeo.attributes.position.array;
      const colArr = this.sparkGeo.attributes.color.array;
      for (let i = this.sparks.length - 1; i >= 0; i--) {
        const s = this.sparks[i];
        s.life += dt;
        if (s.life >= s.maxLife) {
          this.sparks.splice(i, 1);
          continue;
        }
        s.vy -= 7.5 * dt;
        s.x += s.vx * dt;
        s.y = Math.max(0.02, s.y + s.vy * dt);
        s.z += s.vz * dt;
      }
      for (let i = 0; i < this.sparks.length; i++) {
        const s = this.sparks[i];
        const fade = 1 - s.life / s.maxLife;
        posArr[i * 3] = s.x;
        posArr[i * 3 + 1] = s.y;
        posArr[i * 3 + 2] = s.z;
        colArr[i * 3] = 1.0 * fade;
        colArr[i * 3 + 1] = 0.84 * fade;
        colArr[i * 3 + 2] = 0.42 * fade;
      }
      this.sparkGeo.attributes.position.needsUpdate = true;
      this.sparkGeo.attributes.color.needsUpdate = true;
      this.sparkGeo.setDrawRange(0, this.sparks.length);
    } else if (this.sparkGeo) {
      this.sparkGeo.setDrawRange(0, 0);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
