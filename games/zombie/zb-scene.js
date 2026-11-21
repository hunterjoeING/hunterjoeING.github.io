// Three.js 3D Scene, Follower Camera, PBR Bridge Arena, Atmospheric Fog, Lighting & Post-Processing
// Strictly decoupled from gameplay rules; syncs state via syncAndRender().

import * as THREE from 'three';
import { EffectComposer } from 'EffectComposer';
import { RenderPass } from 'RenderPass';
import { UnrealBloomPass } from 'UnrealBloomPass';
import { OutputPass } from 'OutputPass';
import { getZBTextures } from './zb-textures.js';
import {
  getSharedAssets,
  ZBModelPools,
  updateMarineVisual
} from './zb-models.js';
import {
  ZBEffectsPool,
  BRIDGE_HALF_W,
  Z_NEAR,
  Z_SPAN,
  toWorldX,
  toWorldZ
} from './zb-effects.js';

export class ZBScene {
  constructor(canvas, stageEl) {
    this.canvas = canvas;
    this.stageEl = stageEl;
    this.tacticalCam = false;
    this.timeSec = 0;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(46, 16 / 10, 0.5, 130);

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
    this.renderer.toneMappingExposure = 1.08;

    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(800, 600), 0.30, 0.35, 0.82);
    this.outputPass = new OutputPass();
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.outputPass);

    this.camX = 0;
    this.camY = 10.6;
    this.camZ = 12.6;
    this.prevPlayerU = 0;

    this.envGroup = new THREE.Group();
    this.dynamicGroup = new THREE.Group();
    this.scene.add(this.envGroup, this.dynamicGroup);

    this.models = new ZBModelPools(this.dynamicGroup);
    this.effects = new ZBEffectsPool(this.dynamicGroup);

    this.pylons = [];
    this.shoulderProps = [];
    this.searchlights = [];
    this.skylineWindows = [];

    this._setupLights();
    this._buildBridgeArena();
    this._buildBackdropAndSkyline();
    this._buildShieldDome();

    this.applyTheme(window.ArcadeTheme ? window.ArcadeTheme.isLight() : false);
    this.resize();
  }

  _setupLights() {
    this.hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x0f172a, 0.78);
    this.scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xe2eeff, 1.55);
    this.sunLight.position.set(11, 22, 10);
    this.sunLight.castShadow = true;
    const isMobile = (window.innerWidth || 900) < 768;
    const smSize = isMobile ? 1024 : 1536;
    this.sunLight.shadow.mapSize.set(smSize, smSize);
    this.sunLight.shadow.camera.left = -10;
    this.sunLight.shadow.camera.right = 10;
    this.sunLight.shadow.camera.top = 18;
    this.sunLight.shadow.camera.bottom = -30;
    this.sunLight.shadow.camera.near = 2;
    this.sunLight.shadow.camera.far = 56;
    this.sunLight.shadow.bias = -0.0006;
    this.sunLight.shadow.normalBias = 0.03;
    this.scene.add(this.sunLight);

    this.rimLight = new THREE.DirectionalLight(0xfb7185, 0.62);
    this.rimLight.position.set(-8, 9, -28);
    this.scene.add(this.rimLight);

    // Squad Tactical Flashlight shining down the bridge
    this.flashLight = new THREE.SpotLight(0xe0f2fe, 14, 34, Math.PI * 0.24, 0.55, 1.3);
    this.flashLight.position.set(0, 2.3, Z_NEAR - 0.3);
    this.flashLight.target.position.set(0, 0.4, -14);
    this.scene.add(this.flashLight, this.flashLight.target);
  }

  _buildBridgeArena() {
    const tex = getZBTextures();
    const deckLen = 54;
    const deckMidZ = Z_NEAR - Z_SPAN * 0.5 - 2.0; // centered along bridge

    // Main roadway asphalt deck
    this.deckMat = new THREE.MeshStandardMaterial({
      map: tex.asphaltAlbedo,
      bumpMap: tex.asphaltBump,
      bumpScale: 0.035,
      roughness: 0.84,
      metalness: 0.12
    });
    const deck = new THREE.Mesh(new THREE.BoxGeometry(BRIDGE_HALF_W * 2, 0.4, deckLen), this.deckMat);
    deck.position.set(0, -0.2, deckMidZ);
    deck.receiveShadow = true;
    this.envGroup.add(deck);

    // Steel pedestrian catwalks flanking both sides
    this.catwalkMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      map: tex.catwalkAlbedo,
      roughness: 0.65,
      metalness: 0.48
    });
    [-1, 1].forEach((side) => {
      const cw = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.56, deckLen), this.catwalkMat);
      cw.position.set(side * (BRIDGE_HALF_W + 0.88), -0.08, deckMidZ);
      cw.receiveShadow = true;
      cw.castShadow = true;
      this.envGroup.add(cw);
    });

    // Alternating amber/dark hazard curbs + glowing neon guide rails
    this.curbMat = new THREE.MeshStandardMaterial({
      map: tex.curbAlbedo,
      roughness: 0.55,
      metalness: 0.25
    });
    this.railGlowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      toneMapped: false
    });
    [-1, 1].forEach((side) => {
      const curb = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.24, deckLen), this.curbMat);
      curb.position.set(side * (BRIDGE_HALF_W + 0.08), 0.12, deckMidZ);
      curb.receiveShadow = true;
      this.envGroup.add(curb);

      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.09, deckLen), this.railGlowMat);
      rail.position.set(side * (BRIDGE_HALF_W + 0.05), 0.27, deckMidZ);
      this.envGroup.add(rail);

      // Outer guardrail steel beam
      const outerRail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.48, deckLen), this.catwalkMat);
      outerRail.position.set(side * (BRIDGE_HALF_W + 1.68), 0.42, deckMidZ);
      this.envGroup.add(outerRail);
    });

    // Scrolling Bridge Shoulder Cover Details (Jersey Barriers, Supply Crates, Light Posts)
    const barrierGeo = new THREE.BoxGeometry(0.45, 0.58, 1.75);
    const crateGeo = new THREE.BoxGeometry(0.68, 0.56, 0.68);
    const postGeo = new THREE.CylinderGeometry(0.06, 0.08, 3.1, 8);
    const lampGeo = new THREE.BoxGeometry(0.42, 0.12, 0.22);
    const barrierMat = new THREE.MeshStandardMaterial({ color: 0x475569, map: tex.metalAlbedo, roughness: 0.65, metalness: 0.35 });
    const crateMat = new THREE.MeshStandardMaterial({ color: 0x3f6212, roughness: 0.72, metalness: 0.18 });
    const lampMat = new THREE.MeshBasicMaterial({ color: 0xfef08a, toneMapped: false });

    const propSlots = 7;
    for (let i = 0; i < propSlots; i++) {
      const slotGrp = new THREE.Group();
      const side = i % 2 === 0 ? -1 : 1;
      const sx = side * (BRIDGE_HALF_W + 0.92);

      const bar = new THREE.Mesh(barrierGeo, barrierMat);
      bar.position.set(side * (BRIDGE_HALF_W + 0.42), 0.49, 0);
      bar.castShadow = true;
      bar.receiveShadow = true;
      slotGrp.add(bar);

      if (i % 2 === 0) {
        const crate = new THREE.Mesh(crateGeo, crateMat);
        crate.position.set(sx, 0.48, 0.4);
        crate.rotation.y = 0.22 * side;
        crate.castShadow = true;
        crate.receiveShadow = true;
        slotGrp.add(crate);
      }

      const post = new THREE.Mesh(postGeo, barrierMat);
      post.position.set(side * (BRIDGE_HALF_W + 1.48), 1.65, 0);
      const lamp = new THREE.Mesh(lampGeo, lampMat);
      lamp.position.set(side * (BRIDGE_HALF_W + 1.24), 3.16, 0);
      slotGrp.add(post, lamp);

      this.envGroup.add(slotGrp);
      this.shoulderProps.push({ grp: slotGrp, offset: i / propSlots });
    }

    // 2 Massive Suspension Bridge Pylon Gantries scrolling along bridge
    const towerGeo = new THREE.BoxGeometry(0.95, 9.5, 0.95);
    const beamGeo = new THREE.BoxGeometry(BRIDGE_HALF_W * 2 + 4.4, 0.65, 0.85);
    const cableGeo = new THREE.CylinderGeometry(0.035, 0.035, 1, 6);
    const pylonMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, map: tex.metalAlbedo, roughness: 0.48, metalness: 0.62 });
    const cableMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.4, metalness: 0.7 });
    const beaconGeo = new THREE.SphereGeometry(0.19, 10, 8);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, toneMapped: false });

    for (let p = 0; p < 2; p++) {
      const grp = new THREE.Group();
      const px = BRIDGE_HALF_W + 1.45;
      const tL = new THREE.Mesh(towerGeo, pylonMat);
      tL.position.set(-px, 4.75, 0);
      tL.castShadow = true;
      const tR = new THREE.Mesh(towerGeo, pylonMat);
      tR.position.set(px, 4.75, 0);
      tR.castShadow = true;

      const sL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 8.8, 1.02), this.railGlowMat);
      sL.position.set(-px + 0.46, 4.6, 0);
      const sR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 8.8, 1.02), this.railGlowMat);
      sR.position.set(px - 0.46, 4.6, 0);

      const topBeam = new THREE.Mesh(beamGeo, pylonMat);
      topBeam.position.set(0, 9.1, 0);
      const midBeam = new THREE.Mesh(new THREE.BoxGeometry(BRIDGE_HALF_W * 2 + 3.2, 0.36, 0.55), pylonMat);
      midBeam.position.set(0, 6.8, 0);

      const bL = new THREE.Mesh(beaconGeo, beaconMat);
      bL.position.set(-px, 9.65, 0);
      const bR = new THREE.Mesh(beaconGeo, beaconMat);
      bR.position.set(px, 9.65, 0);

      // Diagonal suspension cables reaching forward & back
      for (let c = 1; c <= 3; c++) {
        const spanZ = c * 3.2;
        const cableLen = Math.hypot(8.6, spanZ);
        const angle = Math.atan2(spanZ, 8.6);
        [-px, px].forEach((cx) => {
          const cab = new THREE.Mesh(cableGeo, cableMat);
          cab.scale.set(1, cableLen, 1);
          cab.position.set(cx, 4.6, spanZ * 0.5);
          cab.rotation.x = angle;
          grp.add(cab);
        });
      }

      grp.add(tL, tR, sL, sR, topBeam, midBeam, bL, bR);
      this.envGroup.add(grp);
      this.pylons.push({ grp, offset: p * 0.5, bL, bR });
    }

    // River canyon water below bridge
    this.waterMat = new THREE.MeshStandardMaterial({
      color: 0x0f2744,
      map: tex.waterAlbedo,
      roughness: 0.28,
      metalness: 0.42
    });
    this.waterMesh = new THREE.Mesh(new THREE.PlaneGeometry(130, 120), this.waterMat);
    this.waterMesh.rotation.x = -Math.PI * 0.5;
    this.waterMesh.position.set(0, -4.4, deckMidZ - 8);
    this.envGroup.add(this.waterMesh);
  }

  _buildBackdropAndSkyline() {
    const tex = getZBTextures();
    // Distant city skyline silhouettes beyond bridge horizon
    this.skylineMat = new THREE.MeshStandardMaterial({ color: 0x0b1222, roughness: 0.85, metalness: 0.2 });
    const winMatCyan = new THREE.MeshBasicMaterial({ color: 0x38bdf8, toneMapped: false });
    const winMatAmber = new THREE.MeshBasicMaterial({ color: 0xfbbf24, toneMapped: false });

    for (let i = -9; i <= 9; i++) {
      if (Math.abs(i) <= 1) continue; // keep bridge center corridor clear
      const bw = 2.6 + ((Math.abs(i) * 7) % 3) * 1.1;
      const bh = 6 + ((Math.abs(i * 13) + 5) % 14);
      const bx = i * 4.1;
      const bz = -47 - ((Math.abs(i) * 5) % 10);
      const bldg = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bw), this.skylineMat);
      bldg.position.set(bx, bh * 0.5 - 4.4, bz);
      this.envGroup.add(bldg);

      // Lit window strips
      for (let w = 0; w < 3; w++) {
        const strip = new THREE.Mesh(
          new THREE.PlaneGeometry(bw * 0.55, 0.25),
          (i + w) % 2 === 0 ? winMatCyan : winMatAmber
        );
        strip.position.set(bx, bh * (0.35 + w * 0.22) - 4.4, bz + bw * 0.52);
        this.envGroup.add(strip);
        this.skylineWindows.push(strip);
      }
    }

    // Moon / Sun sphere + halo sprite
    this.celestialMat = new THREE.MeshBasicMaterial({ color: 0xfb7185, toneMapped: false });
    this.celestial = new THREE.Mesh(new THREE.SphereGeometry(2.6, 18, 14), this.celestialMat);
    this.celestial.position.set(16, 15.5, -56);
    this.celestialHaloMat = new THREE.SpriteMaterial({
      map: tex.glowSprite, color: 0xe11d48, transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, depthWrite: false
    });
    const halo = new THREE.Sprite(this.celestialHaloMat);
    halo.scale.set(14, 14, 1);
    this.celestial.add(halo);
    this.envGroup.add(this.celestial);

    // Sweeping anti-air searchlight cones (visible in dark mode)
    const coneGeo = new THREE.ConeGeometry(4.2, 28, 16, 1, true);
    coneGeo.translate(0, 14, 0);
    for (let s = 0; s < 2; s++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8, transparent: true, opacity: 0.08,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
      });
      const cone = new THREE.Mesh(coneGeo, mat);
      cone.position.set(s === 0 ? -16 : 16, -3.5, -45);
      this.envGroup.add(cone);
      this.searchlights.push(cone);
    }
  }

  _buildShieldDome() {
    this.shieldGroup = new THREE.Group();
    const domeGeo = new THREE.IcosahedronGeometry(1.75, 1);
    const domeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, transparent: true, opacity: 0.16, wireframe: true, toneMapped: false
    });
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9, transparent: true, opacity: 0.10, side: THREE.DoubleSide, depthWrite: false, toneMapped: false
    });
    this.shieldWire = new THREE.Mesh(domeGeo, domeMat);
    this.shieldShell = new THREE.Mesh(domeGeo, innerMat);
    this.shieldGroup.add(this.shieldWire, this.shieldShell);
    this.shieldGroup.visible = false;
    this.dynamicGroup.add(this.shieldGroup);
  }

  applyTheme(isLight) {
    if (isLight) {
      this.scene.background = new THREE.Color(0xcfe4f7);
      this.scene.fog = new THREE.FogExp2(0xcfe4f7, 0.0155);
      this.hemiLight.color.setHex(0xffffff);
      this.hemiLight.groundColor.setHex(0x64748b);
      this.hemiLight.intensity = 1.05;
      this.sunLight.color.setHex(0xfff7e6);
      this.sunLight.intensity = 1.95;
      this.rimLight.color.setHex(0xbae6fd);
      this.rimLight.intensity = 0.50;
      this.flashLight.intensity = 5.0;
      this.deckMat.color.setHex(0x94a3b8);
      this.catwalkMat.color.setHex(0x64748b);
      this.waterMat.color.setHex(0x0284c7);
      this.skylineMat.color.setHex(0x475569);
      this.railGlowMat.color.setHex(0x0284c7);
      this.celestialMat.color.setHex(0xfef08a);
      this.celestialHaloMat.color.setHex(0xfde047);
      this.celestialHaloMat.opacity = 0.65;
      this.searchlights.forEach(c => { c.visible = false; });
      this.bloomPass.strength = 0.18;
      this.bloomPass.threshold = 0.88;
    } else {
      this.scene.background = new THREE.Color(0x070b1a);
      this.scene.fog = new THREE.FogExp2(0x0d091f, 0.0185);
      this.hemiLight.color.setHex(0x7dd3fc);
      this.hemiLight.groundColor.setHex(0x090d16);
      this.hemiLight.intensity = 0.72;
      this.sunLight.color.setHex(0xe2eeff);
      this.sunLight.intensity = 1.45;
      this.rimLight.color.setHex(0xfb7185);
      this.rimLight.intensity = 0.68;
      this.flashLight.intensity = 14.0;
      this.deckMat.color.setHex(0x64748b);
      this.catwalkMat.color.setHex(0x334155);
      this.waterMat.color.setHex(0x091a33);
      this.skylineMat.color.setHex(0x090e1c);
      this.railGlowMat.color.setHex(0x38bdf8);
      this.celestialMat.color.setHex(0xfb7185);
      this.celestialHaloMat.color.setHex(0xe11d48);
      this.celestialHaloMat.opacity = 0.55;
      this.searchlights.forEach(c => { c.visible = true; });
      this.bloomPass.strength = 0.34;
      this.bloomPass.threshold = 0.80;
    }
  }

  toggleCameraAngle() {
    this.tacticalCam = !this.tacticalCam;
    return this.tacticalCam;
  }

  resize() {
    const r = this.stageEl.getBoundingClientRect();
    const w = Math.max(300, Math.floor(r.width));
    const h = Math.max(240, Math.floor(r.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);
    this.composer.setPixelRatio(dpr);
    this.composer.setSize(w, h);
    this.bloomPass.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  syncAndRender(dt, state) {
    this.timeSec += dt;
    const nowSec = this.timeSec;
    const tex = getZBTextures();
    const { m: sharedMats } = getSharedAssets();

    // 1. Scroll bridge asphalt, catwalk, curb, water, pylons & shoulder cover props
    const scrollUnit = state.roadScroll;
    tex.asphaltAlbedo.offset.y = -scrollUnit * 0.42;
    tex.asphaltBump.offset.y = -scrollUnit * 0.42;
    tex.catwalkAlbedo.offset.y = -scrollUnit * 0.85;
    tex.curbAlbedo.offset.y = -scrollUnit * 0.72;
    tex.waterAlbedo.offset.y = -scrollUnit * 0.16;
    tex.gateCurtain.offset.y = nowSec * 0.9;

    this.shoulderProps.forEach(sp => {
      const zFrac = 1 - ((scrollUnit * 0.16 + sp.offset) % 1);
      sp.grp.position.z = toWorldZ(zFrac);
    });

    this.pylons.forEach((py, idx) => {
      const zFrac = 1 - ((scrollUnit * 0.16 + py.offset) % 1);
      py.grp.position.z = toWorldZ(zFrac);
      const blink = Math.sin(nowSec * 3.4 + idx * 3.1) > -0.2;
      py.bL.visible = blink;
      py.bR.visible = blink;
    });

    this.searchlights.forEach((cone, idx) => {
      cone.rotation.z = Math.sin(nowSec * 0.75 + idx * 2.1) * 0.38;
    });

    // 2. Dynamic Follower Camera + Shake
    const playerWX = toWorldX(state.playerU);
    const leanAngle = Math.max(-1.2, Math.min(1.2, (state.playerU - this.prevPlayerU) / Math.max(0.008, dt) * 0.15));
    this.prevPlayerU = state.playerU;

    const targetCamX = playerWX * 0.44;
    const targetCamY = this.tacticalCam ? 16.8 : 10.6;
    const targetCamZ = this.tacticalCam ? 11.4 : 12.6;
    const damp = Math.min(1, dt * 8.5);
    this.camX += (targetCamX - this.camX) * damp;
    this.camY += (targetCamY - this.camY) * damp;
    this.camZ += (targetCamZ - this.camZ) * damp;

    const shake = state.shakeAmt > 0.2 ? state.shakeAmt * 0.025 : 0;
    const sx = shake ? (Math.random() - 0.5) * shake : 0;
    const sy = shake ? (Math.random() - 0.5) * shake : 0;

    this.camera.position.set(this.camX + sx, this.camY + sy, this.camZ);
    this.camera.lookAt(playerWX * 0.28, 0.75, this.tacticalCam ? -4.8 : -7.2);

    // Tactical Flashlight tracks squad
    this.flashLight.position.set(playerWX, 2.3, Z_NEAR - 0.3);
    this.flashLight.target.position.set(playerWX * 0.72, 0.3, -15);

    // 3. Squad Marines (up to 24 visible)
    const visCount = Math.min(24, state.squad);
    const firingGlow = state.running && state.shootTimer > (1 / Math.max(1, state.fireRate)) * 0.65;
    for (let s = 0; s < 24; s++) {
      const vis = this.models.marines[s];
      if (s >= visCount) {
        vis.root.visible = false;
        continue;
      }
      const row = Math.floor(s / 6);
      const colIdx = s % 6;
      const rowSize = Math.min(6, visCount - row * 6);
      const uOff = (colIdx - (rowSize - 1) * 0.5) * 0.095;
      vis.root.position.set(toWorldX(state.playerU + uOff), 0, toWorldZ(0.02 + row * 0.028));
      vis.root.visible = true;
      updateMarineVisual(vis, s, nowSec, state.spreadLevel, state.dmgMult, firingGlow, leanAngle);
    }

    // 4. Forcefield Shield Dome
    if (state.shield > 0 && state.squad > 0) {
      this.shieldGroup.visible = true;
      const spreadScale = 1 + Math.min(0.9, Math.max(0, visCount - 1) * 0.08);
      this.shieldGroup.position.set(playerWX, 0.65, Z_NEAR - 0.55);
      this.shieldGroup.scale.set(spreadScale, 0.85, 0.95);
      this.shieldWire.rotation.y = nowSec * 0.8;
    } else {
      this.shieldGroup.visible = false;
    }

    // 5. Pooled Entities: Gates, Barrels, Zombies
    this.models.beginFrame();

    for (let i = 0; i < state.gates.length; i++) {
      const g = state.gates[i];
      const vis = this.models.acquireGate();
      const midU = (g.uMin + g.uMax) * 0.5;
      const widthW = (g.uMax - g.uMin) * BRIDGE_HALF_W;
      vis.root.position.set(toWorldX(midU), 0, toWorldZ(g.z));
      vis.root.scale.set(widthW / 5.2, 1, 1);

      const good = g.kind === 'add' ? g.val >= 0 : g.kind === 'mult' ? true : (g.kind !== 'trap' && g.kind !== 'div' && g.kind !== 'rateBad');
      const mainHex = good ? 0x22d3ee : 0xfb7185;
      vis.trimMat.color.setHex(mainHex);
      vis.trimMat.emissive.setHex(mainHex);
      vis.curtainMat.color.setHex(mainHex);

      const baseText = g.kind === 'add' ? (g.val >= 0 ? `+${g.val}` : `${g.val}`)
        : g.kind === 'mult' ? `×${g.val}` : g.label;
      const text = (g.locked && g.kind === 'add') ? `🔒 ${baseText}` : baseText;
      if (vis.lastText !== text || vis.lastGood !== good) {
        vis.lastText = text;
        vis.lastGood = good;
        this._drawGateBadge(vis, text, good);
      }

      if (g.shootable && g.stepCost > 0) {
        const pct = g.val >= g.maxVal ? 1 : Math.max(0, Math.min(1, g.dmgAccum / g.stepCost));
        vis.progBg.visible = true;
        vis.progFill.visible = pct > 0.01;
        vis.progFill.scale.x = Math.max(0.01, 3.3 * pct);
        vis.progFill.position.x = -3.3 * (1 - pct) * 0.5;
        vis.progFillMat.color.setHex(g.val >= g.maxVal ? 0xfbbf24 : 0x4ade80);
      } else {
        vis.progBg.visible = false;
        vis.progFill.visible = false;
      }
    }

    for (let i = 0; i < state.barrels.length; i++) {
      const br = state.barrels[i];
      const vis = this.models.acquireBarrel();
      vis.root.position.set(toWorldX(br.u), 0, toWorldZ(br.z));
      vis.root.rotation.y = nowSec * 0.7 + br.u * 2;
      const blink = Math.sin(nowSec * 14) > 0;
      vis.beacon.material = blink ? sharedMats.beaconYellow : sharedMats.beaconRed;
      vis.beacon.scale.setScalar(blink ? 0.14 : 0.10);
    }

    for (let i = 0; i < state.zombies.length; i++) {
      const zm = state.zombies[i];
      const vis = this.models.acquireZombie(zm.kind);
      vis.root.position.set(toWorldX(zm.u), 0, toWorldZ(zm.z));

      // Gait & Arm Swing Animation
      const isFast = zm.kind === 'fast';
      const isBoss = zm.kind === 'boss';
      const gaitSpd = isFast ? 15 : (isBoss ? 7 : 9.5);
      const phase = nowSec * gaitSpd + zm.u * 11 + zm.z * 7;
      const stride = Math.sin(phase);
      vis.legL.rotation.x = stride * 0.58;
      vis.legR.rotation.x = -stride * 0.58;
      vis.armL.rotation.x = Math.sin(phase * 0.7) * 0.22;
      vis.armR.rotation.x = -Math.sin(phase * 0.7) * 0.22;
      vis.body.position.y = 0.48 + Math.abs(stride) * 0.05;
      vis.body.rotation.z = Math.cos(phase * 0.5) * 0.06;
      vis.headGroup.rotation.z = -Math.cos(phase * 0.5) * 0.08;
      if (vis.bossRing) {
        const pulse = 0.88 + 0.18 * Math.sin(nowSec * 5);
        vis.bossRing.scale.set(pulse, pulse, 1);
      }

      // Hit-flash material swap (zero allocations)
      const shouldFlash = zm.hitFlash > 0;
      if (shouldFlash !== vis.isFlashing) {
        vis.isFlashing = shouldFlash;
        for (let k = 0; k < vis.skinMeshes.length; k++) {
          vis.skinMeshes[k].material = shouldFlash ? sharedMats.hitFlash : vis.skinMat;
        }
        for (let k = 0; k < vis.armorMeshes.length; k++) {
          vis.armorMeshes[k].material = shouldFlash ? sharedMats.hitFlash : vis.coatMat;
        }
      }

      // Health Bar
      if (zm.hp < zm.maxHp || zm.kind === 'boss' || zm.kind === 'brute') {
        const ratio = Math.max(0, Math.min(1, zm.hp / zm.maxHp));
        vis.barGroup.visible = true;
        vis.barGroup.quaternion.copy(this.camera.quaternion);
        vis.barFill.scale.x = Math.max(0.01, vis.barW * ratio);
        vis.barFill.position.x = -vis.barW * (1 - ratio) * 0.5;
        vis.barFill.material = zm.kind === 'boss'
          ? sharedMats.barBoss
          : (ratio > 0.5 ? sharedMats.barGreen : sharedMats.barYellow);
      } else {
        vis.barGroup.visible = false;
      }
    }

    this.models.endFrame();

    // 6. Pooled VFX, Bullets, Dynamic Lights & Float Texts
    this.effects.sync(
      dt,
      state.bullets,
      state.fx,
      state.floaters,
      state.dmgMult,
      playerWX,
      firingGlow,
      state.spreadLevel
    );

    this.composer.render();
  }

  _drawGateBadge(vis, text, good) {
    const { labelCtx: ctx, labelCanvas: c, labelTex } = vis;
    ctx.clearRect(0, 0, c.width, c.height);

    const w = c.width - 16, h = c.height - 16;
    ctx.fillStyle = 'rgba(2, 6, 23, 0.86)';
    ctx.beginPath();
    ctx.roundRect(8, 8, w, h, 24);
    ctx.fill();

    ctx.strokeStyle = good ? '#22d3ee' : '#fb7185';
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.font = '900 54px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#020617';
    ctx.strokeText(text, c.width * 0.5, c.height * 0.52);
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(text, c.width * 0.5, c.height * 0.52);

    labelTex.needsUpdate = true;
  }
}
