// Three.js 3D Scene, PBR Lighting, UnrealBloomPass, Map Builder & Camera Controls
// Strictly decoupled from game balancing/rules; syncs state via syncAndRender().

import * as THREE from 'three';
import { EffectComposer } from 'EffectComposer';
import { RenderPass } from 'RenderPass';
import { UnrealBloomPass } from 'UnrealBloomPass';
import { OutputPass } from 'OutputPass';
import { getTDTextures } from './td-textures.js';
import {
  createTowerMesh,
  updateTowerVisualLevel,
  createEnemyMesh,
  getSharedModelAssets
} from './td-models.js';
import { TDEffectsPool } from './td-effects.js';

const COLS = 14;
const ROWS = 9;
const bx = (x) => x - COLS * 0.5;
const bz = (y) => y - ROWS * 0.5;

export class TDScene {
  constructor(canvas, stageEl, callbacks = {}) {
    this.canvas = canvas;
    this.stageEl = stageEl;
    this.onTileTap = callbacks.onTileTap || (() => {});
    this.onTileHover = callbacks.onTileHover || (() => {});

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, 14 / 9, 0.5, 90);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.04;

    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(800, 500), 0.26, 0.35, 0.86);
    this.outputPass = new OutputPass();
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.outputPass);

    // Camera state (smoothly damped)
    this.cam = {
      targetX: 0, targetZ: 0.25,
      curTargetX: 0, curTargetZ: 0.25,
      yaw: 0, curYaw: 0,
      pitch: 0.94, curPitch: 0.94,
      dist: 13.8, curDist: 13.8
    };

    this.mapGroup = new THREE.Group();
    this.dynamicGroup = new THREE.Group();
    this.scene.add(this.mapGroup, this.dynamicGroup);

    this.effects = new TDEffectsPool(this.dynamicGroup);
    this.towerVisuals = new Map();
    this.enemyVisuals = new Map();
    this.pathDashes = [];
    this.waypoints = [];
    this.spawnGate = null;
    this.bastionCore = null;

    this._raycaster = new THREE.Raycaster();
    this._ndc = new THREE.Vector2();
    this._boardPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.09);
    this._hitPt = new THREE.Vector3();

    this._setupLightsAndEnvironment();
    this._setupOverlaysAndPreviews();
    this._setupInput();
    this.applyTheme(window.ArcadeTheme ? window.ArcadeTheme.isLight() : true);
    this.resize();
  }

  _setupLightsAndEnvironment() {
    const tex = getTDTextures();

    this.hemiLight = new THREE.HemisphereLight(0xf8fafc, 0x64748b, 0.85);
    this.scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xfff8ed, 1.85);
    this.sunLight.position.set(8.5, 15.5, 7.5);
    this.sunLight.castShadow = true;
    const isMobile = (window.innerWidth || 1000) < 768;
    const smSize = isMobile ? 1024 : 2048;
    this.sunLight.shadow.mapSize.set(smSize, smSize);
    this.sunLight.shadow.camera.left = -9.5;
    this.sunLight.shadow.camera.right = 9.5;
    this.sunLight.shadow.camera.top = 7.5;
    this.sunLight.shadow.camera.bottom = -7.5;
    this.sunLight.shadow.camera.near = 2;
    this.sunLight.shadow.camera.far = 34;
    this.sunLight.shadow.bias = -0.0005;
    this.sunLight.shadow.normalBias = 0.025;
    this.scene.add(this.sunLight);

    this.rimLight = new THREE.DirectionalLight(0x93c5fd, 0.55);
    this.rimLight.position.set(-9, 7, -8);
    this.scene.add(this.rimLight);

    // Surrounding courtyard floor
    this.groundMat = new THREE.MeshStandardMaterial({
      color: 0xdce4ef,
      map: tex.groundAlbedo,
      roughness: 0.92,
      metalness: 0.05
    });
    this.groundMesh = new THREE.Mesh(new THREE.PlaneGeometry(72, 72), this.groundMat);
    this.groundMesh.rotation.x = -Math.PI * 0.5;
    this.groundMesh.position.y = -0.14;
    this.groundMesh.receiveShadow = true;
    this.scene.add(this.groundMesh);

    // Shared board materials
    this.plinthMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      map: tex.metalAlbedo,
      roughness: 0.55,
      metalness: 0.45
    });
    this.tileEvenMat = new THREE.MeshStandardMaterial({
      map: tex.tileLightEven,
      bumpMap: tex.tileBump,
      bumpScale: 0.02,
      roughness: 0.72,
      metalness: 0.14
    });
    this.tileOddMat = new THREE.MeshStandardMaterial({
      map: tex.tileLightOdd,
      bumpMap: tex.tileBump,
      bumpScale: 0.02,
      roughness: 0.72,
      metalness: 0.14
    });
    this.pathMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      map: tex.pathAlbedo,
      bumpMap: tex.pathBump,
      bumpScale: 0.035,
      roughness: 0.85,
      metalness: 0.12
    });
    this.dashMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.72,
      toneMapped: false
    });
  }

  _setupOverlaysAndPreviews() {
    // Range ring (for selected tower or build preview)
    const ringGeo = new THREE.RingGeometry(0.97, 1.0, 64);
    this.rangeMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    this.rangeRing = new THREE.Mesh(ringGeo, this.rangeMat);
    this.rangeRing.rotation.x = -Math.PI * 0.5;
    this.rangeRing.position.y = 0.105;
    this.rangeRing.visible = false;
    this.scene.add(this.rangeRing);

    const fillGeo = new THREE.CircleGeometry(1.0, 64);
    this.rangeFillMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.10,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    this.rangeFill = new THREE.Mesh(fillGeo, this.rangeFillMat);
    this.rangeFill.rotation.x = -Math.PI * 0.5;
    this.rangeFill.position.y = 0.102;
    this.rangeFill.visible = false;
    this.scene.add(this.rangeFill);

    // Tile highlight square
    const hlGeo = new THREE.RingGeometry(0.46, 0.50, 4);
    this.tileHighlightMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    this.tileHighlight = new THREE.Mesh(hlGeo, this.tileHighlightMat);
    this.tileHighlight.rotation.set(-Math.PI * 0.5, 0, Math.PI * 0.25);
    this.tileHighlight.scale.setScalar(1.36);
    this.tileHighlight.position.y = 0.108;
    this.tileHighlight.visible = false;
    this.scene.add(this.tileHighlight);

    // Pre-built ghost preview meshes per tower type (zero runtime alloc)
    this.previewMeshes = {};
    for (const id of ['pulse', 'frost', 'mortar', 'rail']) {
      const vis = createTowerMesh(id, true);
      vis.root.visible = false;
      this.scene.add(vis.root);
      this.previewMeshes[id] = vis.root;
    }
  }

  applyTheme(isLight) {
    const tex = getTDTextures();
    if (isLight) {
      this.scene.background = new THREE.Color(0xe6ecf5);
      this.scene.fog = new THREE.FogExp2(0xe6ecf5, 0.017);
      this.groundMat.color.setHex(0xdce4ef);
      this.plinthMat.color.setHex(0x475569);
      this.tileEvenMat.map = tex.tileLightEven;
      this.tileOddMat.map = tex.tileLightOdd;
      this.pathMat.color.setHex(0x94a3b8);
      this.hemiLight.color.setHex(0xffffff);
      this.hemiLight.groundColor.setHex(0x94a3b8);
      this.hemiLight.intensity = 0.95;
      this.sunLight.color.setHex(0xfff8ed);
      this.sunLight.intensity = 1.9;
      this.bloomPass.strength = 0.22;
      this.bloomPass.threshold = 0.88;
    } else {
      this.scene.background = new THREE.Color(0x070d1b);
      this.scene.fog = new THREE.FogExp2(0x070d1b, 0.020);
      this.groundMat.color.setHex(0x0b1326);
      this.plinthMat.color.setHex(0x1e293b);
      this.tileEvenMat.map = tex.tileDarkEven;
      this.tileOddMat.map = tex.tileDarkOdd;
      this.pathMat.color.setHex(0x475569);
      this.hemiLight.color.setHex(0x93c5fd);
      this.hemiLight.groundColor.setHex(0x0f172a);
      this.hemiLight.intensity = 0.72;
      this.sunLight.color.setHex(0xe2eeff);
      this.sunLight.intensity = 1.65;
      this.bloomPass.strength = 0.34;
      this.bloomPass.threshold = 0.82;
    }
    this.tileEvenMat.needsUpdate = true;
    this.tileOddMat.needsUpdate = true;
  }

  rebuildMap(pathCells, waypoints) {
    this.waypoints = waypoints;
    while (this.mapGroup.children.length > 0) {
      const ch = this.mapGroup.children[0];
      this.mapGroup.remove(ch);
      if (ch.geometry && !ch.userData.sharedGeo) ch.geometry.dispose();
    }
    this.pathDashes = [];

    if (!this._mapGeos) {
      this._mapGeos = {
        plinth: new THREE.BoxGeometry(COLS + 0.65, 0.26, ROWS + 0.65),
        beacon: new THREE.BoxGeometry(0.32, 0.44, 0.32),
        tip: new THREE.BoxGeometry(0.18, 0.08, 0.18),
        build: new THREE.BoxGeometry(0.95, 0.10, 0.95),
        path: new THREE.BoxGeometry(1.0, 0.04, 1.0),
        dash: new THREE.BoxGeometry(0.24, 0.015, 0.08),
        tipMat: new THREE.MeshBasicMaterial({ color: 0x38bdf8, toneMapped: false })
      };
    }

    // Main Bastion plinth
    const plinth = new THREE.Mesh(this._mapGeos.plinth, this.plinthMat);
    plinth.userData.sharedGeo = true;
    plinth.position.set(0, -0.14, 0);
    plinth.receiveShadow = true;
    plinth.castShadow = true;
    this.mapGroup.add(plinth);

    // Corner beacons
    const corners = [
      [-COLS * 0.5 - 0.2, -ROWS * 0.5 - 0.2],
      [COLS * 0.5 + 0.2, -ROWS * 0.5 - 0.2],
      [-COLS * 0.5 - 0.2, ROWS * 0.5 + 0.2],
      [COLS * 0.5 + 0.2, ROWS * 0.5 + 0.2]
    ];
    for (const [cx, cz] of corners) {
      const b = new THREE.Mesh(this._mapGeos.beacon, this.plinthMat);
      b.userData.sharedGeo = true;
      b.position.set(cx, 0.06, cz);
      b.castShadow = true;
      b.receiveShadow = true;
      const tip = new THREE.Mesh(this._mapGeos.tip, this._mapGeos.tipMat);
      tip.userData.sharedGeo = true;
      tip.position.set(cx, 0.31, cz);
      this.mapGroup.add(b, tip);
    }

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const isPath = pathCells.has(`${col},${row}`);
        const mesh = new THREE.Mesh(
          isPath ? this._mapGeos.path : this._mapGeos.build,
          isPath ? this.pathMat : ((col + row) % 2 === 0 ? this.tileEvenMat : this.tileOddMat)
        );
        mesh.userData.sharedGeo = true;
        mesh.position.set(bx(col + 0.5), isPath ? -0.01 : 0.04, bz(row + 0.5));
        mesh.receiveShadow = true;
        if (!isPath) mesh.castShadow = true;
        this.mapGroup.add(mesh);
      }
    }

    // Animated path flow dashes along segments
    let totalLen = 0;
    const segs = [];
    for (let i = 0; i < waypoints.length - 1; i++) {
      const a = waypoints[i];
      const b = waypoints[i + 1];
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      segs.push({ a, b, len, ang: Math.atan2(b.y - a.y, b.x - a.x), startD: totalLen });
      totalLen += len;
    }
    this.pathSegments = segs;
    this.totalPathLen = totalLen;
    const dashCount = Math.max(10, Math.floor(totalLen * 1.15));
    for (let i = 0; i < dashCount; i++) {
      const d = new THREE.Mesh(this._mapGeos.dash, this.dashMat);
      d.userData.sharedGeo = true;
      d.position.y = 0.02;
      this.mapGroup.add(d);
      this.pathDashes.push({ mesh: d, offset: i / dashCount });
    }

    // Spawn Portal & Bastion Energy Core
    const sPt = waypoints[0];
    const ePt = waypoints[waypoints.length - 1];
    this.spawnGate = this._buildSpawnGate(bx(sPt.x), bz(sPt.y));
    this.bastionCore = this._buildBastionCore(bx(ePt.x), bz(ePt.y));
    this.mapGroup.add(this.spawnGate.root, this.bastionCore.root);
  }

  _buildSpawnGate(wx, wz) {
    const root = new THREE.Group();
    root.position.set(wx, 0.05, wz);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      emissive: 0xbe123c,
      emissiveIntensity: 1.35,
      metalness: 0.5,
      roughness: 0.25,
      toneMapped: false
    });
    const outer = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.04, 8, 4), frameMat);
    outer.position.y = 0.36;
    const inner = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.03, 8, 4), frameMat);
    inner.position.y = 0.36;
    const vortex = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.14, 0),
      new THREE.MeshBasicMaterial({ color: 0xfda4af, toneMapped: false })
    );
    vortex.position.y = 0.36;
    root.add(outer, inner, vortex);
    return { root, outer, inner, vortex };
  }

  _buildBastionCore(wx, wz) {
    const root = new THREE.Group();
    root.position.set(wx, 0.04, wz);
    const ped = new THREE.Mesh(
      new THREE.CylinderGeometry(0.34, 0.42, 0.14, 6),
      this.plinthMat
    );
    ped.position.y = 0.07;
    ped.castShadow = true;
    ped.receiveShadow = true;
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.32, 0.03, 8, 6),
      new THREE.MeshStandardMaterial({
        color: 0x4ade80,
        emissive: 0x16a34a,
        emissiveIntensity: 1.35,
        toneMapped: false
      })
    );
    ring.rotation.x = Math.PI * 0.5;
    ring.position.y = 0.16;
    const crystal = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.21, 0),
      new THREE.MeshStandardMaterial({
        color: 0x86efac,
        emissive: 0x22c55e,
        emissiveIntensity: 1.55,
        metalness: 0.2,
        roughness: 0.15,
        toneMapped: false
      })
    );
    crystal.position.y = 0.44;
    crystal.castShadow = true;
    root.add(ped, ring, crystal);
    return { root, ring, crystal };
  }

  _setupInput() {
    const pointers = new Map();
    let mode = 'idle'; // idle | down | pan | orbit | pinch
    let startPinchDist = 0;
    let startCamDist = this.cam.dist;
    let prevMid = null;
    let downPointerType = 'mouse';

    const getTileAtClient = (cx, cy) => {
      const rect = this.canvas.getBoundingClientRect();
      this._ndc.x = ((cx - rect.left) / rect.width) * 2 - 1;
      this._ndc.y = -((cy - rect.top) / rect.height) * 2 + 1;
      this._raycaster.setFromCamera(this._ndc, this.camera);

      // Check existing tower hitboxes first so clicking tall turrets selects their tile reliably
      const towerRoots = [];
      for (const vis of this.towerVisuals.values()) towerRoots.push(vis.root);
      if (towerRoots.length > 0) {
        const hits = this._raycaster.intersectObjects(towerRoots, true);
        if (hits.length > 0) {
          let obj = hits[0].object;
          while (obj && obj.userData.tdCol === undefined) obj = obj.parent;
          if (obj && obj.userData.tdCol !== undefined) {
            return { col: obj.userData.tdCol, row: obj.userData.tdRow };
          }
        }
      }

      if (this._raycaster.ray.intersectPlane(this._boardPlane, this._hitPt)) {
        const col = Math.floor(this._hitPt.x + COLS * 0.5);
        const row = Math.floor(this._hitPt.z + ROWS * 0.5);
        if (col >= 0 && col < COLS && row >= 0 && row < ROWS) {
          return { col, row };
        }
      }
      return null;
    };

    const clampCam = () => {
      this.cam.targetX = Math.max(-5.5, Math.min(5.5, this.cam.targetX));
      this.cam.targetZ = Math.max(-3.5, Math.min(3.5, this.cam.targetZ));
      this.cam.pitch = Math.max(0.52, Math.min(1.32, this.cam.pitch));
      this.cam.dist = Math.max(7.2, Math.min(23.0, this.cam.dist));
    };

    const panByScreenDelta = (dx, dy) => {
      const scale = this.cam.dist * 0.0018;
      const sy = Math.sin(this.cam.curYaw);
      const cy = Math.cos(this.cam.curYaw);
      this.cam.targetX -= (dx * cy + dy * sy) * scale;
      this.cam.targetZ -= (dy * cy - dx * sy) * scale;
      clampCam();
    };

    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    this.canvas.addEventListener('pointerdown', (e) => {
      downPointerType = e.pointerType || 'mouse';
      try { this.canvas.setPointerCapture(e.pointerId); } catch (_) {}
      pointers.set(e.pointerId, {
        x: e.clientX, y: e.clientY,
        startX: e.clientX, startY: e.clientY,
        btn: e.button
      });
      if (pointers.size === 1) {
        mode = (e.button === 2 || e.button === 1 || e.shiftKey) ? 'orbit' : 'down';
      } else if (pointers.size === 2) {
        mode = 'pinch';
        const pts = Array.from(pointers.values());
        startPinchDist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y) || 1;
        startCamDist = this.cam.dist;
        prevMid = { x: (pts[0].x + pts[1].x) * 0.5, y: (pts[0].y + pts[1].y) * 0.5 };
      }
    });

    this.canvas.addEventListener('pointermove', (e) => {
      const p = pointers.get(e.pointerId);
      if (!p) {
        if (e.pointerType && e.pointerType !== 'touch') {
          this.onTileHover(getTileAtClient(e.clientX, e.clientY));
        }
        return;
      }
      const dx = e.clientX - p.x;
      const dy = e.clientY - p.y;
      p.x = e.clientX;
      p.y = e.clientY;

      if (pointers.size === 2 && mode === 'pinch') {
        const pts = Array.from(pointers.values());
        const d = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y) || 1;
        const mid = { x: (pts[0].x + pts[1].x) * 0.5, y: (pts[0].y + pts[1].y) * 0.5 };
        this.cam.dist = startCamDist * (startPinchDist / d);
        if (prevMid) panByScreenDelta(mid.x - prevMid.x, mid.y - prevMid.y);
        prevMid = mid;
        clampCam();
        return;
      }

      if (mode === 'orbit') {
        this.cam.yaw -= dx * 0.0065;
        this.cam.pitch -= dy * 0.0055;
        clampCam();
      } else if (mode === 'down') {
        if (Math.hypot(p.x - p.startX, p.y - p.startY) > 9) {
          mode = 'pan';
          panByScreenDelta(dx, dy);
        }
      } else if (mode === 'pan') {
        panByScreenDelta(dx, dy);
      }
    });

    const onUp = (e) => {
      const p = pointers.get(e.pointerId);
      const wasTap = p && mode === 'down' && Math.hypot(p.x - p.startX, p.y - p.startY) <= 9 && p.btn === 0;
      pointers.delete(e.pointerId);
      if (pointers.size === 0) {
        if (wasTap) {
          const tile = getTileAtClient(e.clientX, e.clientY);
          if (tile) this.onTileTap(tile.col, tile.row, downPointerType);
        }
        mode = 'idle';
        prevMid = null;
      } else if (pointers.size === 1) {
        mode = 'pan';
      }
    };

    this.canvas.addEventListener('pointerup', onUp);
    this.canvas.addEventListener('pointercancel', onUp);
    this.canvas.addEventListener('pointerleave', () => this.onTileHover(null));

    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.cam.dist += e.deltaY * 0.009;
      clampCam();
    }, { passive: false });
  }

  zoomBy(delta) {
    this.cam.dist = Math.max(7.2, Math.min(23.0, this.cam.dist + delta));
  }

  toggleTilt() {
    this.cam.pitch = this.cam.pitch < 0.85 ? 1.08 : 0.72;
  }

  resetCamera() {
    const w = this.stageEl.clientWidth || 800;
    const h = this.stageEl.clientHeight || 500;
    const aspect = w / Math.max(1, h);
    this.cam.targetX = 0;
    this.cam.targetZ = 0.25;
    this.cam.yaw = 0;
    this.cam.pitch = 0.94;
    this.cam.dist = aspect < 1.3 ? 16.2 : 13.6;
  }

  resize() {
    const r = this.stageEl.getBoundingClientRect();
    const w = Math.max(320, Math.floor(r.width));
    const h = Math.max(200, Math.floor(r.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
    this.bloomPass.resolution.set(w, h);
    if (this.cam.dist === 13.8) this.resetCamera();
  }

  clearDynamic() {
    for (const vis of this.towerVisuals.values()) this.dynamicGroup.remove(vis.root);
    for (const vis of this.enemyVisuals.values()) this.dynamicGroup.remove(vis.root);
    this.towerVisuals.clear();
    this.enemyVisuals.clear();
    this.effects.clear();
  }

  syncAndRender(rawDt, state) {
    const nowSec = performance.now() * 0.001;
    const {
      towers, enemies, projectiles, beams, particles, sparks, floatTexts,
      selectedTower, pendingBuildTile, hoverTile, selectedType,
      towerDefs, pathCells, gold, overdriveTimer, shakeTime, shakeMag
    } = state;
    const overdriveActive = overdriveTimer > 0;

    // 1. Path dashes & gate/core animations
    const flowSpd = overdriveActive ? 0.14 : 0.085;
    for (const d of this.pathDashes) {
      const t = ((d.offset + nowSec * flowSpd) % 1) * this.totalPathLen;
      for (let s = 0; s < this.pathSegments.length; s++) {
        const seg = this.pathSegments[s];
        if (t <= seg.startD + seg.len || s === this.pathSegments.length - 1) {
          const f = Math.max(0, Math.min(1, (t - seg.startD) / Math.max(0.001, seg.len)));
          d.mesh.position.x = bx(seg.a.x + (seg.b.x - seg.a.x) * f);
          d.mesh.position.z = bz(seg.a.y + (seg.b.y - seg.a.y) * f);
          d.mesh.rotation.y = -seg.ang;
          break;
        }
      }
    }
    this.dashMat.color.setHex(overdriveActive ? 0xfacc15 : 0x38bdf8);

    if (this.spawnGate) {
      this.spawnGate.outer.rotation.z = nowSec * 1.3;
      this.spawnGate.inner.rotation.z = -nowSec * 2.1;
      this.spawnGate.vortex.rotation.y = nowSec * 2.4;
    }
    if (this.bastionCore) {
      this.bastionCore.ring.rotation.z = -nowSec * 0.9;
      this.bastionCore.crystal.rotation.y = nowSec * 1.1;
      this.bastionCore.crystal.position.y = 0.44 + Math.sin(nowSec * 2.6) * 0.04;
    }

    // 2. Sync Towers
    const activeTowers = new Set(towers);
    for (const [tw, vis] of this.towerVisuals.entries()) {
      if (!activeTowers.has(tw)) {
        this.dynamicGroup.remove(vis.root);
        this.towerVisuals.delete(tw);
      }
    }
    for (const tw of towers) {
      let vis = this.towerVisuals.get(tw);
      if (!vis) {
        vis = createTowerMesh(tw.def.id, false);
        vis.root.position.set(bx(tw.x), 0.09, bz(tw.y));
        vis.root.userData.tdCol = tw.col;
        vis.root.userData.tdRow = tw.row;
        this.dynamicGroup.add(vis.root);
        this.towerVisuals.set(tw, vis);
      }
      if (tw.def.id === 'frost' && vis.spinGroup) {
        vis.spinGroup.rotation.y = nowSec * 2.0;
        vis.spinGroup.rotation.x = Math.sin(nowSec * 1.4) * 0.2;
      } else {
        vis.headGroup.rotation.y = -tw.angle;
        vis.recoilGroup.position.x = -(tw.recoil || 0) * 0.14;
      }
      updateTowerVisualLevel(vis, tw.lvl, overdriveActive);
    }

    // 3. Sync Preview / Selection Range Ring
    for (const id of Object.keys(this.previewMeshes)) {
      this.previewMeshes[id].visible = false;
    }
    const previewTile = pendingBuildTile || hoverTile;
    const canPreview = previewTile &&
      !pathCells.has(`${previewTile.col},${previewTile.row}`) &&
      !towers.find(t => t.col === previewTile.col && t.row === previewTile.row);

    if (selectedTower) {
      const isMax = selectedTower.lvl >= 3;
      const colHex = isMax ? 0x22c55e : 0x0284c7;
      this.rangeRing.position.set(bx(selectedTower.x), 0.105, bz(selectedTower.y));
      this.rangeRing.scale.setScalar(selectedTower.range);
      this.rangeMat.color.setHex(colHex);
      this.rangeRing.visible = true;

      this.rangeFill.position.set(bx(selectedTower.x), 0.102, bz(selectedTower.y));
      this.rangeFill.scale.setScalar(selectedTower.range);
      this.rangeFillMat.color.setHex(colHex);
      this.rangeFill.visible = true;

      this.tileHighlight.position.set(bx(selectedTower.x), 0.108, bz(selectedTower.y));
      this.tileHighlightMat.color.setHex(colHex);
      this.tileHighlight.visible = true;
    } else if (canPreview) {
      const def = towerDefs.find(t => t.id === selectedType);
      const canAff = def && gold >= def.cost;
      const px = bx(previewTile.col + 0.5);
      const pz = bz(previewTile.row + 0.5);
      const colHex = canAff ? 0x38bdf8 : 0xf43f5e;
      const ghost = this.previewMeshes[selectedType];
      if (ghost) {
        const { m } = getSharedModelAssets();
        const gMat = canAff ? m.previewValid : m.previewInvalid;
        ghost.traverse((o) => { if (o.isMesh) o.material = gMat; });
        ghost.position.set(px, 0.09, pz);
        ghost.visible = true;
      }
      this.rangeRing.position.set(px, 0.105, pz);
      this.rangeRing.scale.setScalar(def ? def.range : 2);
      this.rangeMat.color.setHex(colHex);
      this.rangeRing.visible = true;

      this.rangeFill.position.set(px, 0.102, pz);
      this.rangeFill.scale.setScalar(def ? def.range : 2);
      this.rangeFillMat.color.setHex(colHex);
      this.rangeFill.visible = true;

      this.tileHighlight.position.set(px, 0.108, pz);
      this.tileHighlightMat.color.setHex(colHex);
      this.tileHighlight.visible = true;
    } else {
      this.rangeRing.visible = false;
      this.rangeFill.visible = false;
      this.tileHighlight.visible = false;
    }

    // 4. Sync Enemies
    const activeEnemies = new Set(enemies);
    for (const [en, vis] of this.enemyVisuals.entries()) {
      if (!activeEnemies.has(en)) {
        this.dynamicGroup.remove(vis.root);
        this.enemyVisuals.delete(en);
      }
    }
    for (const en of enemies) {
      let vis = this.enemyVisuals.get(en);
      if (!vis) {
        vis = createEnemyMesh(en.kind);
        this.dynamicGroup.add(vis.root);
        this.enemyVisuals.set(en, vis);
      }
      const tgt = this.waypoints[en.wp] || this.waypoints[this.waypoints.length - 1];
      const ang = tgt ? Math.atan2(tgt.y - en.y, tgt.x - en.x) : 0;

      vis.root.position.set(bx(en.x), 0.02, bz(en.y));
      vis.bodyGroup.rotation.y = -ang;

      if (vis.spinPart) vis.spinPart.rotation.y = nowSec * 3.2;
      if (vis.flamePart) {
        const flk = 0.85 + 0.35 * Math.sin(nowSec * 36 + en.progress * 4);
        const r = en.kind === 'thermo' ? 0.10 : 0.07;
        const h = en.kind === 'thermo' ? 0.28 : 0.20;
        vis.flamePart.scale.set(r, h * flk, r);
      }

      vis.shieldMesh.visible = en.shield > 0;
      if (en.shield > 0) vis.shieldMesh.rotation.y = nowSec * 1.4;
      vis.thawRing.visible = en.thawTimer > 0;
      vis.frostRing.visible = en.thawTimer <= 0 && en.slowTimer > 0;

      // Billboard HP & Shield bar toward camera
      vis.hpGroup.quaternion.copy(this.camera.quaternion);
      const hpFrac = Math.max(0, Math.min(1, en.hp / en.maxHp));
      vis.hpFill.scale.x = Math.max(0.001, vis.barWidth * hpFrac);
      vis.hpFill.position.x = -vis.barWidth * (1 - hpFrac) * 0.5;

      const hasSh = en.maxShield > 0 && en.shield > 0;
      vis.shBg.visible = hasSh;
      vis.shFill.visible = hasSh;
      if (hasSh) {
        const shFrac = Math.max(0, Math.min(1, en.shield / en.maxShield));
        vis.shFill.scale.x = Math.max(0.001, vis.barWidth * shFrac);
        vis.shFill.position.x = -vis.barWidth * (1 - shFrac) * 0.5;
      }
    }

    // 5. Sync Pooled Effects
    this.effects.sync(projectiles, beams, particles, sparks, floatTexts);

    // 6. Smooth Camera Damping + Screen Shake
    const damp = 1 - Math.exp(-12 * Math.min(0.05, rawDt));
    this.cam.curTargetX += (this.cam.targetX - this.cam.curTargetX) * damp;
    this.cam.curTargetZ += (this.cam.targetZ - this.cam.curTargetZ) * damp;
    this.cam.curYaw += (this.cam.yaw - this.cam.curYaw) * damp;
    this.cam.curPitch += (this.cam.pitch - this.cam.curPitch) * damp;
    this.cam.curDist += (this.cam.dist - this.cam.curDist) * damp;

    let sx = 0, sy = 0;
    if (shakeTime > 0 && shakeMag > 0) {
      sx = (Math.random() * 2 - 1) * shakeMag * 0.035;
      sy = (Math.random() * 2 - 1) * shakeMag * 0.035;
    }

    const horiz = Math.cos(this.cam.curPitch) * this.cam.curDist;
    const camY = Math.sin(this.cam.curPitch) * this.cam.curDist;
    const camX = this.cam.curTargetX + Math.sin(this.cam.curYaw) * horiz + sx;
    const camZ = this.cam.curTargetZ + Math.cos(this.cam.curYaw) * horiz + sy;

    this.camera.position.set(camX, camY, camZ);
    this.camera.lookAt(this.cam.curTargetX + sx, 0.1, this.cam.curTargetZ + sy);

    this.composer.render();
  }
}
