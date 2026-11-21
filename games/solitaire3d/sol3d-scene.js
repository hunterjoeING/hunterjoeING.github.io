// Three.js 3D Tabletop Scene, Rounded 3D Cards, Animations, Drag Tilt, Drop Highlights & Victory Waterfall

import * as THREE from 'three';
import { createSolitaireAssets, FELT_THEMES } from './sol3d-textures.js';

export const CARD_W = 1.0;
export const CARD_H = 1.42;
export const CARD_THICK = 0.016;
export const CARD_CORNER = 0.068;

const COL_STEP = 1.18;
const TOP_ROW_Z = -2.65;
const TABLEAU_Z = -0.82;
const TABLE_CENTER_Z = 0.42;
const TABLE_W = 9.8;
const TABLE_D = 8.6;
const DRAG_LIFT_Y = 0.56;

function colX(col) {
  return (col - 3) * COL_STEP;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function seededJitter(cardId, salt) {
  const n = Math.sin((cardId + 1) * 12.9898 + (salt + 1) * 78.233) * 43758.5453;
  return ((n - Math.floor(n)) * 2 - 1) * (0.9 * Math.PI / 180); // max ±0.9°
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

function createGlowTexture() {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  const cx = size * 0.5;
  const cy = size * 0.5;
  const r = 24;
  const m = 18;
  ctx.clearRect(0, 0, size, size);

  ctx.save();
  ctx.shadowColor = 'rgba(250, 210, 110, 0.95)';
  ctx.shadowBlur = 22;
  ctx.strokeStyle = 'rgba(255, 224, 140, 0.95)';
  ctx.lineWidth = 7;
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
    this.cameraPreset = '3d'; // '3d' or 'top'
    this.feltTheme = 'smaragd';

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#0a1510');

    this.camera = new THREE.PerspectiveCamera(38, 16 / 10, 0.5, 90);
    this.camCurPos = new THREE.Vector3(0, 13.5, 8.2);
    this.camTargetPos = new THREE.Vector3(0, 13.5, 8.2);
    this.camCurLook = new THREE.Vector3(0, 0, TABLE_CENTER_Z);
    this.camTargetLook = new THREE.Vector3(0, 0, TABLE_CENTER_Z);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.04;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();
    this.assets = createSolitaireAssets(maxAniso);

    this.cardGeo = createRoundedCardGeometry(CARD_W, CARD_H, CARD_THICK, CARD_CORNER);
    this.glowTex = createGlowTexture();
    this.sparkTex = createSparkTexture();

    this.cardVisuals = []; // 52 objects
    this.hitMeshes = [];   // 52 card meshes for raycasting
    this.slotHitMeshes = []; // empty pile slots for raycasting
    this.targetGlows = {}; // key -> glow mesh
    this.hintMarkers = [];

    this.dragState = null;
    this.animations = new Map(); // cardId -> anim object
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
    const hemi = new THREE.HemisphereLight(0xfff5e4, 0x16241b, 0.72);
    this.scene.add(hemi);

    const ambient = new THREE.AmbientLight(0xfff0d8, 0.24);
    this.scene.add(ambient);

    // Warm overhead tabletop lamp spotlight
    const spot = new THREE.SpotLight(0xfff1d6, 95, 42, Math.PI * 0.34, 0.72, 1.35);
    spot.position.set(0.4, 14.5, 1.8);
    spot.target.position.set(0, 0, TABLE_CENTER_Z);
    spot.castShadow = true;
    spot.shadow.mapSize.set(2048, 2048);
    spot.shadow.camera.near = 4;
    spot.shadow.camera.far = 26;
    spot.shadow.bias = -0.0004;
    spot.shadow.normalBias = 0.015;
    this.scene.add(spot);
    this.scene.add(spot.target);

    // Soft cool-warm rim fill from back-left so beveled wooden edges & card stacks catch soft relief
    const fill = new THREE.DirectionalLight(0xffe9ca, 0.34);
    fill.position.set(-6, 8, -7);
    this.scene.add(fill);
  }

  _buildTable() {
    const tableGroup = new THREE.Group();

    // Felt surface
    const feltGeo = new THREE.PlaneGeometry(TABLE_W, TABLE_D);
    this.feltMat = new THREE.MeshStandardMaterial({
      map: this.assets.feltTextures[this.feltTheme],
      bumpMap: this.assets.feltBump,
      bumpScale: 0.008,
      roughness: 0.92,
      metalness: 0.02
    });
    const feltMesh = new THREE.Mesh(feltGeo, this.feltMat);
    feltMesh.rotation.x = -Math.PI / 2;
    feltMesh.position.set(0, 0, TABLE_CENTER_Z);
    feltMesh.receiveShadow = true;
    tableGroup.add(feltMesh);

    // Subtle brass inlay border between felt & walnut rail
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xc59f52,
      roughness: 0.38,
      metalness: 0.72
    });
    const railW = 0.56;
    const railH = 0.24;
    const brassT = 0.045;

    const addBrassStrip = (w, d, x, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.012, d), brassMat);
      m.position.set(x, 0.004, z);
      m.receiveShadow = true;
      tableGroup.add(m);
    };
    addBrassStrip(TABLE_W + brassT * 2, brassT, 0, TABLE_CENTER_Z - TABLE_D * 0.5 - brassT * 0.5);
    addBrassStrip(TABLE_W + brassT * 2, brassT, 0, TABLE_CENTER_Z + TABLE_D * 0.5 + brassT * 0.5);
    addBrassStrip(brassT, TABLE_D, -TABLE_W * 0.5 - brassT * 0.5, TABLE_CENTER_Z);
    addBrassStrip(brassT, TABLE_D, TABLE_W * 0.5 + brassT * 0.5, TABLE_CENTER_Z);

    // Mahogany / Walnut rounded wooden rails
    const woodMat = new THREE.MeshStandardMaterial({
      map: this.assets.woodTex,
      roughness: 0.36,
      metalness: 0.06
    });

    const outerW = TABLE_W + brassT * 2 + railW * 2;
    const outerD = TABLE_D + brassT * 2 + railW * 2;
    const innerW = TABLE_W + brassT * 2;
    const innerD = TABLE_D + brassT * 2;

    const frameShape = new THREE.Shape();
    const ox = outerW * 0.5;
    const oy = outerD * 0.5;
    const cr = 0.42;
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
    const ir = 0.14;
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
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.055,
      curveSegments: 12
    });
    const frameMesh = new THREE.Mesh(frameGeo, woodMat);
    frameMesh.rotation.x = -Math.PI / 2;
    frameMesh.position.set(0, -0.15, TABLE_CENTER_Z);
    frameMesh.castShadow = true;
    frameMesh.receiveShadow = true;
    tableGroup.add(frameMesh);

    this.scene.add(tableGroup);
  }

  _buildSlots() {
    const slotGeo = new THREE.PlaneGeometry(CARD_W * 1.02, CARD_H * 1.02);
    const hitGeo = new THREE.PlaneGeometry(CARD_W * 1.15, CARD_H * 1.18);
    const glowGeo = new THREE.PlaneGeometry(CARD_W * 1.24, CARD_H * 1.2);

    const createSlot = (key, x, z, tex, meta) => {
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
        opacity: 0.88
      });
      const decal = new THREE.Mesh(slotGeo, mat);
      decal.rotation.x = -Math.PI / 2;
      decal.position.set(x, 0.003, z);
      this.scene.add(decal);

      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
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
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.rotation.x = -Math.PI / 2;
      glowMesh.position.set(x, 0.012, z);
      this.scene.add(glowMesh);
      this.targetGlows[key] = { mesh: glowMesh, baseZ: z, active: false, hovered: false };
    };

    createSlot('stock', colX(0), TOP_ROW_Z, this.assets.slotTextures.stock, { type: 'stock', idx: 0 });
    createSlot('waste', colX(1), TOP_ROW_Z, this.assets.slotTextures.waste, { type: 'waste', idx: 0 });
    for (let f = 0; f < 4; f++) {
      createSlot(`foundation_${f}`, colX(3 + f), TOP_ROW_Z, this.assets.slotTextures.foundation, {
        type: 'foundation',
        idx: f
      });
    }
    for (let c = 0; c < 7; c++) {
      createSlot(`tableau_${c}`, colX(c), TABLEAU_Z, this.assets.slotTextures.tableau, {
        type: 'tableau',
        idx: c
      });
    }
  }

  _buildCardPool() {
    const backMat = new THREE.MeshStandardMaterial({
      map: this.assets.backTex,
      bumpMap: this.assets.linenBump,
      bumpScale: 0.004,
      roughness: 0.56,
      metalness: 0.04
    });

    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0xe6dfd0,
      roughness: 0.78,
      metalness: 0.02
    });

    for (let id = 0; id < 52; id++) {
      const frontMat = new THREE.MeshStandardMaterial({
        map: this.assets.faceTextures[id],
        bumpMap: this.assets.linenBump,
        bumpScale: 0.004,
        roughness: 0.58,
        metalness: 0.03
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
        curTiltX: 0,
        curTiltZ: 0
      };
      this.hitMeshes.push(mesh);
    }
  }

  _buildWaterfallPool() {
    const backMat = new THREE.MeshStandardMaterial({
      map: this.assets.backTex,
      roughness: 0.56,
      metalness: 0.04
    });
    const edgeMat = new THREE.MeshStandardMaterial({ color: 0xe6dfd0, roughness: 0.78 });

    for (let i = 0; i < 24; i++) {
      const frontMat = new THREE.MeshStandardMaterial({
        map: this.assets.faceTextures[0],
        roughness: 0.55,
        metalness: 0.04
      });
      const mesh = new THREE.Mesh(this.cardGeo, [frontMat, backMat, edgeMat]);
      mesh.castShadow = true;
      mesh.visible = false;
      this.scene.add(mesh);
      this.waterfallPool.push({ mesh, frontMat, inUse: false });
    }
  }

  _buildSparksSystem() {
    const maxSparks = 220;
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
      if (this.sparks.length >= 220) this.sparks.shift();
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

  setFeltTheme(themeId) {
    if (!FELT_THEMES[themeId]) return;
    this.feltTheme = themeId;
    this.feltMat.map = this.assets.feltTextures[themeId];
    this.feltMat.needsUpdate = true;

    const bgColors = {
      smaragd: 0x091611,
      abendblau: 0x08111f,
      weinrot: 0x18080e
    };
    this.scene.background.setHex(bgColors[themeId] || 0x091611);
  }

  setCameraPreset(preset) {
    this.cameraPreset = preset === 'top' ? 'top' : '3d';
    this._updateCameraTargets();
  }

  _updateCameraTargets() {
    const w = this.containerEl.clientWidth || window.innerWidth;
    const h = this.containerEl.clientHeight || window.innerHeight;
    const aspect = Math.max(0.42, w / Math.max(1, h));

    const isTop = this.cameraPreset === 'top';
    const pitchDeg = isTop ? 82 : (aspect < 0.85 ? 64 : 60);
    const pitch = THREE.MathUtils.degToRad(pitchDeg);
    const vFovRad = THREE.MathUtils.degToRad(this.camera.fov);
    const tanV = Math.tan(vFovRad * 0.5);
    const tanH = tanV * aspect;

    // Fit entire wooden table comfortably in viewport
    const needW = aspect < 0.9 ? 9.4 : 10.6;
    const needD = aspect < 0.9 ? 9.6 : 9.4;

    const distH = (needW * 0.5) / tanH;
    const distV = ((needD * Math.sin(pitch)) * 0.5) / tanV;
    const dist = Math.max(distH, distV) * (aspect < 0.75 ? 1.04 : 1.03);

    const lookZ = aspect < 0.78 ? 0.55 : TABLE_CENTER_Z;
    this.camTargetLook.set(0, 0, lookZ);
    this.camTargetPos.set(
      0,
      Math.sin(pitch) * dist,
      lookZ + Math.cos(pitch) * dist
    );
  }

  resize() {
    const w = this.containerEl.clientWidth || window.innerWidth;
    const h = this.containerEl.clientHeight || window.innerHeight;
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    this._updateCameraTargets();
  }

  getTableauStep(colLen) {
    // Dynamically tighten face-up spacing slightly when a column grows very long so cards stay on table
    if (colLen <= 10) return 0.34;
    if (colLen <= 13) return 0.29;
    return 0.24;
  }

  computePileSlotPositions(engine) {
    const targets = new Map();

    // Stock
    for (let i = 0; i < engine.stock.length; i++) {
      const cid = engine.stock[i];
      targets.set(cid, {
        pos: new THREE.Vector3(colX(0), 0.015 + i * CARD_THICK, TOP_ROW_Z),
        faceUp: false,
        yaw: seededJitter(cid, 1) * 0.5,
        pile: { type: 'stock', idx: 0, cardIdx: i }
      });
    }

    // Waste (draw-3 fans up to top 3 visible cards horizontally)
    const wLen = engine.waste.length;
    const fanCount = engine.drawMode === 3 ? Math.min(3, wLen) : 1;
    const fanStart = Math.max(0, wLen - fanCount);
    for (let i = 0; i < wLen; i++) {
      const cid = engine.waste[i];
      const fanOffset = i >= fanStart ? (i - fanStart) * 0.24 : 0;
      targets.set(cid, {
        pos: new THREE.Vector3(colX(1) + fanOffset, 0.015 + i * CARD_THICK, TOP_ROW_Z),
        faceUp: true,
        yaw: seededJitter(cid, 2),
        pile: { type: 'waste', idx: 0, cardIdx: i }
      });
    }

    // Foundations
    for (let f = 0; f < 4; f++) {
      const pile = engine.foundations[f];
      for (let i = 0; i < pile.length; i++) {
        const cid = pile[i];
        targets.set(cid, {
          pos: new THREE.Vector3(colX(3 + f), 0.015 + i * CARD_THICK, TOP_ROW_Z),
          faceUp: true,
          yaw: seededJitter(cid, 3 + f) * 0.6,
          pile: { type: 'foundation', idx: f, cardIdx: i }
        });
      }
    }

    // Tableau
    for (let c = 0; c < 7; c++) {
      const col = engine.tableau[c];
      const faceUpStep = this.getTableauStep(col.length);
      let zCursor = TABLEAU_Z;
      for (let r = 0; r < col.length; r++) {
        const cid = col[r];
        const card = engine.getCard(cid);
        targets.set(cid, {
          pos: new THREE.Vector3(colX(c), 0.015 + r * CARD_THICK, zCursor),
          faceUp: card.faceUp,
          yaw: seededJitter(cid, 10 + c),
          pile: { type: 'tableau', idx: c, cardIdx: r }
        });
        zCursor += card.faceUp ? faceUpStep : 0.14;
      }
    }

    return targets;
  }

  syncState(engine, { dealAnimate = false, staggerMs = 26, instant = false } = {}) {
    const targets = this.computePileSlotPositions(engine);

    for (let id = 0; id < 52; id++) {
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
        this._applyVisual(vis);
        continue;
      }

      const targetFlip = t.faceUp ? 0 : Math.PI;
      const posMoved = vis.targetPos.distanceToSquared(t.pos) > 0.0001;
      const flipChanged = Math.abs(vis.targetFlip - targetFlip) > 0.01;

      if (dealAnimate) {
        // Start from stock position and stagger arc to target
        vis.curPos.set(colX(0), 0.35, TOP_ROW_Z);
        vis.curFlip = Math.PI;
        vis.curYaw = 0;
        this._applyVisual(vis);

        const delay = t.pile.type === 'tableau'
          ? (t.pile.cardIdx * 7 + t.pile.idx) * staggerMs
          : 0;
        const dur = t.pile.type === 'tableau' ? 420 : 120;
        if (t.pile.type === 'tableau') {
          this.animateCardTo(id, t.pos, targetFlip, t.yaw, dur, delay, 0.72);
        } else {
          vis.curPos.copy(t.pos);
          vis.targetPos.copy(t.pos);
          vis.curFlip = targetFlip;
          vis.targetFlip = targetFlip;
          vis.curYaw = t.yaw;
          vis.targetYaw = t.yaw;
          this._applyVisual(vis);
        }
      } else if (posMoved || flipChanged) {
        const dist = vis.curPos.distanceTo(t.pos);
        const dur = Math.max(220, Math.min(400, 190 + dist * 34));
        const arc = Math.max(flipChanged ? 0.42 : 0.14, Math.min(0.85, dist * 0.16));
        this.animateCardTo(id, t.pos, targetFlip, t.yaw, dur, 0, arc);
      } else {
        vis.targetYaw = t.yaw;
      }
    }

    // Update target glow anchors to top of tableau columns
    for (let c = 0; c < 7; c++) {
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

  animateCardTo(cardId, toPos, toFlip, toYaw, durationMs = 280, delayMs = 0, arcHeight = 0.45) {
    const vis = this.cardVisuals[cardId];
    if (!vis) return;
    vis.targetPos.copy(toPos);
    vis.targetFlip = toFlip;
    vis.targetYaw = toYaw;

    this.animations.set(cardId, {
      startTime: performance.now() + delayMs,
      duration: durationMs,
      fromPos: vis.curPos.clone(),
      toPos: toPos.clone(),
      fromFlip: vis.curFlip,
      toFlip,
      fromYaw: vis.curYaw,
      toYaw,
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
        offsetZ: vis.curPos.z - hitPoint.z + i * 0.01,
        stackIdx: i
      };
    });

    this.dragState = {
      items,
      planePoint: hitPoint.clone(),
      prevX: hitPoint.x,
      prevZ: hitPoint.z,
      velX: 0,
      velZ: 0,
      validDests: null
    };
  }

  setValidDropTargets(validDests, hoveredKey = null) {
    for (const [key, g] of Object.entries(this.targetGlows)) {
      let active = false;
      if (validDests) {
        if (key.startsWith('foundation_')) {
          const f = Number(key.split('_')[1]);
          active = validDests.foundations.includes(f);
        } else if (key.startsWith('tableau_')) {
          const c = Number(key.split('_')[1]);
          active = validDests.tableau.includes(c);
        }
      }
      g.active = active;
      g.hovered = active && key === hoveredKey;
    }
  }

  updateDragPoint(point) {
    if (!this.dragState) return;
    this.dragState.planePoint.copy(point);
  }

  endDrag() {
    this.dragState = null;
    this.setValidDropTargets(null, null);
  }

  getBestDropTarget(point, validDests, engine) {
    if (!validDests) return null;
    let best = null;
    let bestDist = Infinity;

    for (const f of validDests.foundations) {
      const dx = point.x - colX(3 + f);
      const dz = point.z - TOP_ROW_Z;
      const dist = Math.hypot(dx, dz);
      if (dist < 1.15 && dist < bestDist) {
        bestDist = dist;
        best = { type: 'foundation', idx: f, key: `foundation_${f}` };
      }
    }

    for (const c of validDests.tableau) {
      const col = engine.tableau[c];
      const glow = this.targetGlows[`tableau_${c}`];
      const targetZ = glow ? glow.baseZ : TABLEAU_Z;
      const dx = Math.abs(point.x - colX(c));
      // Generous vertical tolerance along the column
      const dz = Math.max(0, Math.abs(point.z - targetZ) - 0.65);
      const dist = Math.hypot(dx, dz);
      if (dx < 0.92 && point.z > TABLEAU_Z - 1.1 && dist < bestDist) {
        bestDist = dist;
        best = { type: 'tableau', idx: c, key: `tableau_${c}` };
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

    // Build launch order: Kings -> Aces across 4 foundations
    for (let r = 12; r >= 0; r--) {
      for (let f = 0; f < 4; f++) {
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
    this.waterfallQueue.push(next); // loop gracefully until player starts new game

    poolObj.inUse = true;
    poolObj.frontMat.map = this.assets.faceTextures[next.cardId];
    poolObj.frontMat.needsUpdate = true;
    poolObj.mesh.visible = true;
    poolObj.mesh.position.set(colX(3 + next.fIdx), 0.25, TOP_ROW_Z);
    poolObj.mesh.rotation.set(-Math.PI / 2, 0, (Math.random() - 0.5) * 0.25);

    const dirX = next.fIdx < 2 ? -(1.5 + Math.random() * 3.8) : (1.5 + Math.random() * 3.8);
    this.waterfallCards.push({
      poolObj,
      vx: dirX + (Math.random() - 0.5) * 2.2,
      vy: 3.2 + Math.random() * 2.6,
      vz: 2.8 + Math.random() * 4.4,
      spinZ: (Math.random() - 0.5) * 2.4,
      age: 0
    });

    this._spawnSparks(colX(3 + next.fIdx), 0.35, TOP_ROW_Z, 8);
  }

  _applyVisual(vis) {
    vis.root.position.copy(vis.curPos);
    vis.root.rotation.y = vis.curYaw;
    vis.tiltPivot.rotation.x = vis.curTiltX;
    vis.tiltPivot.rotation.z = vis.curTiltZ;
    vis.mesh.rotation.y = vis.curFlip;
  }

  update(dt, nowMs) {
    // 1. Smooth camera transitions
    const camAlpha = 1 - Math.exp(-8.5 * dt);
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
      // Cubic-like smooth arc along Y
      const arc = Math.sin(t * Math.PI) * anim.arcHeight;
      vis.curPos.lerpVectors(anim.fromPos, anim.toPos, ePos);
      vis.curPos.y += arc;
      vis.curFlip = THREE.MathUtils.lerp(anim.fromFlip, anim.toFlip, eFlip);
      vis.curYaw = THREE.MathUtils.lerp(anim.fromYaw, anim.toYaw, ePos);
      vis.curTiltX = THREE.MathUtils.lerp(vis.curTiltX, 0, 0.25);
      vis.curTiltZ = THREE.MathUtils.lerp(vis.curTiltZ, 0, 0.25);

      if (t >= 1) {
        vis.curPos.copy(anim.toPos);
        vis.curFlip = anim.toFlip;
        vis.curYaw = anim.toYaw;
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
      const targetTiltZ = THREE.MathUtils.clamp(-dx * invDt * 0.016, -0.22, 0.22);
      const targetTiltX = THREE.MathUtils.clamp(dz * invDt * 0.016, -0.22, 0.22);

      for (const item of ds.items) {
        const vis = item.vis;
        const tx = ds.planePoint.x + item.offsetX;
        const tz = ds.planePoint.z + item.offsetZ + item.stackIdx * 0.30;
        const ty = DRAG_LIFT_Y + item.stackIdx * (CARD_THICK + 0.003);

        vis.curPos.x = THREE.MathUtils.lerp(vis.curPos.x, tx, 0.48);
        vis.curPos.z = THREE.MathUtils.lerp(vis.curPos.z, tz, 0.48);
        vis.curPos.y = THREE.MathUtils.lerp(vis.curPos.y, ty, 0.36);
        vis.curYaw = THREE.MathUtils.lerp(vis.curYaw, 0, 0.28);
        vis.curTiltX = THREE.MathUtils.lerp(vis.curTiltX, targetTiltX, 0.22);
        vis.curTiltZ = THREE.MathUtils.lerp(vis.curTiltZ, targetTiltZ, 0.22);
      }
    }

    // 4. Target glow & hint pulses
    const pulse = 0.55 + 0.45 * Math.sin(nowMs * 0.0065);
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

    for (const [key, g] of Object.entries(this.targetGlows)) {
      let targetOpacity = 0;
      if (g.hovered) targetOpacity = 0.92;
      else if (g.active) targetOpacity = 0.35 + 0.16 * pulse;
      else if (hintTargetKey === key) targetOpacity = 0.45 + 0.45 * pulse;

      g.mesh.material.opacity = THREE.MathUtils.lerp(g.mesh.material.opacity, targetOpacity, 0.22);
    }

    // Apply transforms to all 52 cards (including subtle hint hover lift)
    for (let id = 0; id < 52; id++) {
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
        this.waterfallSpawnTimer = 0.24;
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
          this._spawnSparks(m.position.x, 0.08, m.position.z, 9);
        }

        if (wc.age > 6.5 || m.position.z > 9 || Math.abs(m.position.x) > 10) {
          wc.poolObj.inUse = false;
          wc.poolObj.mesh.visible = false;
          this.waterfallCards.splice(i, 1);
        }
      }
    }

    // Update sparks
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
