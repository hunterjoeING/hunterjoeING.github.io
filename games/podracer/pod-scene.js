// Three.js Scene, Post-Processing (UnrealBloomPass), Warm Desert Sunlight, Dynamic Chase Camera & Speed Lines

import * as THREE from 'three';
import { EffectComposer } from 'EffectComposer';
import { RenderPass } from 'RenderPass';
import { UnrealBloomPass } from 'UnrealBloomPass';
import { OutputPass } from 'OutputPass';
import { CanyonTrack } from './pod-track.js';
import { PodracerModel, PodParticlePool } from './pod-craft.js';

const SPEED_LINE_COUNT = 44;

export class PodScene {
  constructor(canvas, stageEl) {
    this.canvas = canvas;
    this.stageEl = stageEl;
    this.timeSec = 0;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, 16 / 9, 0.4, 520);
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    const isMobile = (window.innerWidth || 900) < 768;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.6 : 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.06;

    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(800, 600), 0.34, 0.42, 0.82);
    this.outputPass = new OutputPass();
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.outputPass);

    this._setupLights();
    this._setupSpeedLines();

    this.track = new CanyonTrack(this.scene);
    this.craft = new PodracerModel();
    this.scene.add(this.craft.root);
    this.particles = new PodParticlePool(this.scene);

    // Camera & shadow tracking scratch objects
    this._camPos = new THREE.Vector3();
    this._camTarget = new THREE.Vector3();
    this._smoothCamPos = new THREE.Vector3();
    this._smoothLookAt = new THREE.Vector3();
    this._camInitialized = false;
    this._frameA = {
      pos: new THREE.Vector3(),
      tangent: new THREE.Vector3(),
      right: new THREE.Vector3(),
      up: new THREE.Vector3()
    };
    this._frameB = {
      pos: new THREE.Vector3(),
      tangent: new THREE.Vector3(),
      right: new THREE.Vector3(),
      up: new THREE.Vector3()
    };
    this._podPos = new THREE.Vector3();
    this._podQuat = new THREE.Quaternion();
    this._exhaustWorld = new THREE.Vector3();

    this.applyTheme(window.ArcadeTheme ? window.ArcadeTheme.isLight() : true);
    this.resize();
  }

  _setupLights() {
    this.hemiLight = new THREE.HemisphereLight(0xffe7c2, 0xb45309, 0.92);
    this.scene.add(this.hemiLight);

    // Warm golden desert sun following the Podracer for crisp shadows
    this.sunLight = new THREE.DirectionalLight(0xffe4b5, 2.25);
    const isMobile = (window.innerWidth || 900) < 768;
    const smSize = isMobile ? 1024 : 1536;
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(smSize, smSize);
    this.sunLight.shadow.camera.left = -28;
    this.sunLight.shadow.camera.right = 28;
    this.sunLight.shadow.camera.top = 28;
    this.sunLight.shadow.camera.bottom = -28;
    this.sunLight.shadow.camera.near = 4;
    this.sunLight.shadow.camera.far = 115;
    this.sunLight.shadow.bias = -0.0005;
    this.sunLight.shadow.normalBias = 0.035;
    this.scene.add(this.sunLight, this.sunLight.target);

    this.rimLight = new THREE.DirectionalLight(0xfb923c, 0.72);
    this.rimLight.position.set(-40, 25, -40);
    this.scene.add(this.rimLight);

    // Twin warm-cyan underglow light on the Podracer
    this.podGlow = new THREE.PointLight(0x38bdf8, 2.8, 12);
    this.scene.add(this.podGlow);
  }

  _setupSpeedLines() {
    // Peripheral 3D speed-streak lines in camera local space
    this.speedLineData = [];
    this.speedLinePos = new Float32Array(SPEED_LINE_COUNT * 6);
    for (let i = 0; i < SPEED_LINE_COUNT; i++) {
      const ang = (i / SPEED_LINE_COUNT) * Math.PI * 2 + Math.random() * 0.2;
      const rad = 2.8 + Math.random() * 4.8;
      const z = -4 - Math.random() * 34;
      this.speedLineData.push({
        x: Math.cos(ang) * rad * 1.35,
        y: Math.sin(ang) * rad * 0.85,
        z,
        speed: 38 + Math.random() * 34
      });
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.speedLinePos, 3));
    this.speedLineMat = new THREE.LineBasicMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      toneMapped: false
    });
    this.speedLines = new THREE.LineSegments(geo, this.speedLineMat);
    this.speedLines.frustumCulled = false;
    this.camera.add(this.speedLines);
  }

  _updateSpeedLines(dt, speedRatio, boostLevel) {
    const intensity = Math.max(0, Math.min(1, (speedRatio - 0.35) * 0.9 + boostLevel * 0.65));
    this.speedLineMat.opacity = intensity * 0.55;
    if (intensity <= 0.02) return;

    const streakLen = 1.6 + speedRatio * 2.4 + boostLevel * 3.8;
    const rate = 1.0 + speedRatio * 1.4 + boostLevel * 1.9;

    for (let i = 0; i < SPEED_LINE_COUNT; i++) {
      const d = this.speedLineData[i];
      d.z += d.speed * rate * dt;
      if (d.z > 1.0) {
        d.z = -36 - Math.random() * 10;
      }
      const idx = i * 6;
      this.speedLinePos[idx] = d.x;
      this.speedLinePos[idx + 1] = d.y;
      this.speedLinePos[idx + 2] = d.z;
      this.speedLinePos[idx + 3] = d.x;
      this.speedLinePos[idx + 4] = d.y;
      this.speedLinePos[idx + 5] = d.z - streakLen;
    }
    this.speedLines.geometry.attributes.position.needsUpdate = true;
  }

  applyTheme(isLight) {
    if (isLight) {
      // Sunlit golden desert canyon afternoon
      const skyHex = 0xebbd8d;
      this.scene.background = new THREE.Color(skyHex);
      this.scene.fog = new THREE.FogExp2(skyHex, 0.0046);
      this.hemiLight.color.setHex(0xfff1d6);
      this.hemiLight.groundColor.setHex(0xb45309);
      this.hemiLight.intensity = 0.98;
      this.sunLight.color.setHex(0xffe5b8);
      this.sunLight.intensity = 2.35;
      this.rimLight.color.setHex(0xf97316);
      this.rimLight.intensity = 0.65;
      this.bloomPass.strength = 0.32;
      this.renderer.toneMappingExposure = 1.06;
    } else {
      // Dramatic copper-twilight desert canyon dusk
      const duskHex = 0x24131c;
      this.scene.background = new THREE.Color(duskHex);
      this.scene.fog = new THREE.FogExp2(duskHex, 0.0052);
      this.hemiLight.color.setHex(0x93c5fd);
      this.hemiLight.groundColor.setHex(0x7c2d12);
      this.hemiLight.intensity = 0.72;
      this.sunLight.color.setHex(0xfdba74);
      this.sunLight.intensity = 1.75;
      this.rimLight.color.setHex(0x38bdf8);
      this.rimLight.intensity = 0.85;
      this.bloomPass.strength = 0.40;
      this.renderer.toneMappingExposure = 1.10;
    }
  }

  resize() {
    const w = Math.max(1, this.stageEl.clientWidth || window.innerWidth);
    const h = Math.max(1, this.stageEl.clientHeight || window.innerHeight);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
    this.bloomPass.setSize(w, h);
  }

  emitHitBurst() {
    this.particles.emitBurst(
      this._podPos.x,
      this._podPos.y + 0.8,
      this._podPos.z,
      26,
      2.2,
      1.1,
      0.25
    );
  }

  emitPickupBurst() {
    this.particles.emitBurst(
      this._podPos.x,
      this._podPos.y + 1.0,
      this._podPos.z,
      18,
      0.5,
      1.9,
      2.4
    );
  }

  renderFrame(dt, state) {
    this.timeSec += dt;
    const {
      s,
      u,
      speedRatio,
      boostLevel,
      shakeAmount,
      steerInput,
      isPlaying
    } = state;

    // Place Podracer on track
    this.track.trackToWorld(s, u, 0.35, this._podPos, this._podQuat);
    this.craft.root.position.copy(this._podPos);
    this.craft.root.quaternion.copy(this._podQuat);
    this.craft.updateVisuals(dt, this.timeSec, state);

    // Update dynamic underglow & sun shadow frustum around Podracer
    this.podGlow.position.copy(this._podPos).addScaledVector(this._frameA.up, 1.2);
    this.podGlow.intensity = 2.2 + boostLevel * 3.0;

    this.sunLight.position.set(
      this._podPos.x + 28,
      this._podPos.y + 44,
      this._podPos.z + 22
    );
    this.sunLight.target.position.copy(this._podPos);
    this.sunLight.target.updateMatrixWorld();

    // Emit pooled thruster exhaust & desert sand dust particles when racing
    if (isPlaying) {
      this.track.sampleAt(s, this._frameA);
      for (let side = -1; side <= 1; side += 2) {
        if (Math.random() < (0.55 + boostLevel * 0.45)) {
          this._exhaustWorld
            .copy(this._podPos)
            .addScaledVector(this._frameA.right, side * 1.42)
            .addScaledVector(this._frameA.up, 0.86)
            .addScaledVector(this._frameA.tangent, -0.55);

          this.particles.spawn(
            this._exhaustWorld.x + (Math.random() - 0.5) * 0.25,
            this._exhaustWorld.y + (Math.random() - 0.5) * 0.25,
            this._exhaustWorld.z + (Math.random() - 0.5) * 0.25,
            -this._frameA.tangent.x * 8 + (Math.random() - 0.5) * 2.5,
            (Math.random() - 0.3) * 2.2,
            -this._frameA.tangent.z * 8 + (Math.random() - 0.5) * 2.5,
            boostLevel > 0.4 ? 1.35 : 0.85,
            0.22 + Math.random() * 0.14,
            boostLevel > 0.4 ? 1.8 : 0.55,
            boostLevel > 0.4 ? 1.4 : 1.5,
            2.4
          );
        }
      }
    }

    this.particles.update(dt);
    this.track.animateEntities(this.timeSec, boostLevel);

    // Chase Camera in track coordinates (prevents canyon wall clipping)
    const camBack = 9.2 + boostLevel * 1.4;
    const camHeight = 3.85 - boostLevel * 0.35;
    this.track.sampleAt(s - camBack, this._frameA);
    this.track.sampleAt(s + 14.0, this._frameB);

    const camU = u * 0.72 + steerInput * -0.45;
    this._camPos
      .copy(this._frameA.pos)
      .addScaledVector(this._frameA.right, camU)
      .addScaledVector(this._frameA.up, camHeight);

    this._camTarget
      .copy(this._frameB.pos)
      .addScaledVector(this._frameB.right, u * 0.42)
      .addScaledVector(this._frameB.up, 1.45);

    if (!this._camInitialized) {
      this._smoothCamPos.copy(this._camPos);
      this._smoothLookAt.copy(this._camTarget);
      this._camInitialized = true;
    } else {
      const posAlpha = Math.min(1, dt * 11.5);
      const lookAlpha = Math.min(1, dt * 14.0);
      this._smoothCamPos.lerp(this._camPos, posAlpha);
      this._smoothLookAt.lerp(this._camTarget, lookAlpha);
    }

    // Apply boost micro-shake & collision jolt
    const totalShake = shakeAmount + boostLevel * 0.085;
    this.camera.position.copy(this._smoothCamPos);
    if (totalShake > 0.002) {
      this.camera.position.x += (Math.random() - 0.5) * totalShake;
      this.camera.position.y += (Math.random() - 0.5) * totalShake * 0.8;
    }
    this.camera.lookAt(this._smoothLookAt);

    // Dynamic FOV widening with speed & boost
    const targetFov = 58 + Math.min(1.5, speedRatio) * 14 + boostLevel * 10;
    this.camera.fov += (targetFov - this.camera.fov) * Math.min(1, dt * 7.5);
    this.camera.updateProjectionMatrix();

    this._updateSpeedLines(dt, speedRatio, boostLevel);
    this.composer.render();
  }
}
