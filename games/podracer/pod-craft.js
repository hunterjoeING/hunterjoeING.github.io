// Multi-part 3D Podracer Model, Crackling Turbine Energy Bolts, Dynamic Cable Tethers & Pooled Particles
// Axes convention in local pod space: +X = Right, +Y = Up, -Z = Forward.

import * as THREE from 'three';
import { getPodTextures } from './pod-textures.js';

const BOLT_SEGMENTS = 22;
const TETHER_SEGMENTS = 8;
const PARTICLE_COUNT = 150;

export class PodracerModel {
  constructor() {
    const tex = getPodTextures();

    this.root = new THREE.Group();
    this.turbinesGroup = new THREE.Group();
    this.cockpitGroup = new THREE.Group();
    this.root.add(this.turbinesGroup, this.cockpitGroup);

    // Shared PBR materials
    this.hullMat = new THREE.MeshStandardMaterial({
      color: 0xdbe2ec,
      map: tex.metalAlbedo,
      roughnessMap: tex.metalRoughness,
      metalness: 0.78,
      roughness: 0.32
    });

    this.darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      map: tex.metalAlbedo,
      metalness: 0.85,
      roughness: 0.42
    });

    this.accentMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.45,
      roughness: 0.28
    });

    this.cobaltTrimMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      metalness: 0.55,
      roughness: 0.26
    });

    this.canopyMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x0c4a6e,
      emissiveIntensity: 0.35
    });

    this.nozzleGlowMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 2.2,
      roughness: 0.2,
      metalness: 0.1
    });

    this.flameOuterMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.35, 1.35, 2.2),
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    });

    this.flameCoreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(1.9, 2.2, 2.6),
      transparent: true,
      opacity: 0.94,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    });

    this.spinners = [];
    this.flameCones = [];
    this.flameCores = [];
    this.vanes = [];
    this.turbineAnchors = [];
    this.cockpitAnchors = [];

    this._buildTurbine(-1);
    this._buildTurbine(1);
    this._buildEnergyBolts();
    this._buildCockpit();
    this._buildTethers();

    // Scratch vectors for zero-GC updates
    this._vA = new THREE.Vector3();
    this._vB = new THREE.Vector3();
    this._boltTimer = 0;
  }

  _buildTurbine(side) {
    // side: -1 = left, +1 = right
    const turb = new THREE.Group();
    turb.position.set(side * 1.42, 0.86, -2.15);
    this.turbinesGroup.add(turb);

    // Main cylindrical nacelle aligned along Z
    const bodyGeo = new THREE.CylinderGeometry(0.42, 0.38, 2.3, 18);
    bodyGeo.rotateX(Math.PI / 2);
    const body = new THREE.Mesh(bodyGeo, this.hullMat);
    body.castShadow = true;
    body.receiveShadow = true;
    turb.add(body);

    // Forward tapered intake cowl (-Z)
    const cowlGeo = new THREE.CylinderGeometry(0.46, 0.43, 0.56, 18, 1, true);
    cowlGeo.rotateX(Math.PI / 2);
    const cowl = new THREE.Mesh(cowlGeo, this.accentMat);
    cowl.position.z = -1.28;
    cowl.castShadow = true;
    turb.add(cowl);

    // Cowl inner dark throat
    const throatGeo = new THREE.CylinderGeometry(0.39, 0.35, 0.52, 16);
    throatGeo.rotateX(Math.PI / 2);
    const throat = new THREE.Mesh(throatGeo, this.darkMetalMat);
    throat.position.z = -1.16;
    turb.add(throat);

    // Intake lip ring
    const lipGeo = new THREE.TorusGeometry(0.45, 0.045, 10, 22);
    const lip = new THREE.Mesh(lipGeo, this.cobaltTrimMat);
    lip.position.z = -1.55;
    turb.add(lip);

    // Rotating intake spinner + 6 fan blades
    const spinner = new THREE.Group();
    spinner.position.z = -1.36;
    const coneGeo = new THREE.ConeGeometry(0.16, 0.42, 12);
    coneGeo.rotateX(-Math.PI / 2); // Tip points forward (-Z)
    const cone = new THREE.Mesh(coneGeo, this.accentMat);
    spinner.add(cone);

    const bladeGeo = new THREE.BoxGeometry(0.36, 0.075, 0.024);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const bladeWrap = new THREE.Group();
      bladeWrap.rotation.z = a;
      const blade = new THREE.Mesh(bladeGeo, this.hullMat);
      blade.position.x = 0.21;
      blade.rotation.x = 0.48;
      bladeWrap.add(blade);
      spinner.add(bladeWrap);
    }
    turb.add(spinner);
    this.spinners.push(spinner);

    // Cooling fins (Kühlrippen) around mid-nacelle
    const finRingGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.05, 18);
    finRingGeo.rotateX(Math.PI / 2);
    for (let i = 0; i < 5; i++) {
      const fin = new THREE.Mesh(finRingGeo, this.darkMetalMat);
      fin.position.z = -0.42 + i * 0.22;
      turb.add(fin);
    }

    // Longitudinal radiator ribs on top & outer flank
    const ribGeo = new THREE.BoxGeometry(0.06, 0.11, 1.35);
    const topRib = new THREE.Mesh(ribGeo, this.cobaltTrimMat);
    topRib.position.set(0, 0.44, 0.05);
    turb.add(topRib);

    // Three angled stabilizer vanes (flare out near intake)
    const vaneGeo = new THREE.BoxGeometry(0.04, 0.54, 0.42);
    [0.5, 2.6, 4.4].forEach((ang) => {
      const pivot = new THREE.Group();
      pivot.position.set(0, 0, -0.78);
      pivot.rotation.z = side > 0 ? ang : -ang;
      const vane = new THREE.Mesh(vaneGeo, this.accentMat);
      vane.position.y = 0.56;
      vane.rotation.x = -0.22;
      vane.castShadow = true;
      pivot.add(vane);
      turb.add(pivot);
      this.vanes.push({ pivot, baseRotX: 0 });
    });

    // Inner Energy Binder Prong extending forward to carry crackling arc
    const prongGeo = new THREE.CylinderGeometry(0.035, 0.055, 0.58, 8);
    prongGeo.rotateX(-Math.PI / 2);
    const prong = new THREE.Mesh(prongGeo, this.darkMetalMat);
    prong.position.set(-side * 0.36, 0, -1.62);
    prong.rotation.y = side * 0.38;
    turb.add(prong);

    const tipGeo = new THREE.SphereGeometry(0.068, 10, 10);
    const tip = new THREE.Mesh(tipGeo, this.nozzleGlowMat);
    tip.position.set(-side * 0.46, 0, -1.88);
    turb.add(tip);

    // Rear exhaust nozzle (+Z)
    const nozzleGeo = new THREE.CylinderGeometry(0.32, 0.40, 0.44, 16);
    nozzleGeo.rotateX(Math.PI / 2);
    const nozzle = new THREE.Mesh(nozzleGeo, this.darkMetalMat);
    nozzle.position.z = 1.25;
    turb.add(nozzle);

    const glowDiscGeo = new THREE.CircleGeometry(0.28, 16);
    const glowDisc = new THREE.Mesh(glowDiscGeo, this.nozzleGlowMat);
    glowDisc.position.z = 1.475;
    turb.add(glowDisc);

    // Outer & Core Plasma Exhaust Flames pointing +Z
    const flameGeo = new THREE.ConeGeometry(0.30, 1.85, 14, 1, true);
    flameGeo.translate(0, 0.925, 0);
    flameGeo.rotateX(Math.PI / 2); // Base at z=0, tip extends toward +Z
    const flameOuter = new THREE.Mesh(flameGeo, this.flameOuterMat);
    flameOuter.position.z = 1.46;
    turb.add(flameOuter);
    this.flameCones.push(flameOuter);

    const coreGeo = new THREE.ConeGeometry(0.16, 1.15, 12);
    coreGeo.translate(0, 0.575, 0);
    coreGeo.rotateX(Math.PI / 2);
    const flameCore = new THREE.Mesh(coreGeo, this.flameCoreMat);
    flameCore.position.z = 1.46;
    turb.add(flameCore);
    this.flameCores.push(flameCore);

    // Rear anchor for tether cable to cockpit
    const anchor = new THREE.Object3D();
    anchor.position.set(-side * 0.18, -0.08, 1.05);
    turb.add(anchor);
    this.turbineAnchors.push(anchor);
  }

  _buildEnergyBolts() {
    // Two pre-allocated crackling energy lines arcing between left and right binder tips
    this.boltPositionsA = new Float32Array((BOLT_SEGMENTS + 1) * 3);
    this.boltPositionsB = new Float32Array((BOLT_SEGMENTS + 1) * 3);

    const geoA = new THREE.BufferGeometry();
    geoA.setAttribute('position', new THREE.BufferAttribute(this.boltPositionsA, 3));
    const matA = new THREE.LineBasicMaterial({
      color: new THREE.Color(1.4, 2.2, 2.8),
      transparent: true,
      opacity: 0.95,
      toneMapped: false
    });
    this.boltLineA = new THREE.Line(geoA, matA);
    this.turbinesGroup.add(this.boltLineA);

    const geoB = new THREE.BufferGeometry();
    geoB.setAttribute('position', new THREE.BufferAttribute(this.boltPositionsB, 3));
    const matB = new THREE.LineBasicMaterial({
      color: new THREE.Color(1.9, 1.1, 2.6),
      transparent: true,
      opacity: 0.82,
      toneMapped: false
    });
    this.boltLineB = new THREE.Line(geoB, matB);
    this.turbinesGroup.add(this.boltLineB);

    this._regenerateBolts(0);
  }

  _regenerateBolts(boostLevel) {
    // Prong tips in turbinesGroup space: x = ±0.96, y = 0.86, z = -4.03
    const startX = -0.96;
    const endX = 0.96;
    const baseY = 0.86;
    const baseZ = -4.03;
    const amp = 0.11 + boostLevel * 0.14;

    for (let i = 0; i <= BOLT_SEGMENTS; i++) {
      const t = i / BOLT_SEGMENTS;
      const envelope = Math.sin(t * Math.PI);
      const x = startX + (endX - startX) * t;

      const idx = i * 3;
      this.boltPositionsA[idx] = x;
      this.boltPositionsA[idx + 1] = baseY + (Math.random() - 0.5) * amp * 2 * envelope;
      this.boltPositionsA[idx + 2] = baseZ + (Math.random() - 0.5) * amp * 2 * envelope;

      this.boltPositionsB[idx] = x;
      this.boltPositionsB[idx + 1] = baseY + (Math.random() - 0.5) * amp * 2.4 * envelope;
      this.boltPositionsB[idx + 2] = baseZ + (Math.random() - 0.5) * amp * 2.4 * envelope;
    }
    this.boltLineA.geometry.attributes.position.needsUpdate = true;
    this.boltLineB.geometry.attributes.position.needsUpdate = true;

    // Color shifts brighter gold-cyan on boost
    this.boltLineB.material.color.setRGB(
      1.7 + boostLevel * 0.9,
      1.0 + boostLevel * 1.1,
      2.4 - boostLevel * 0.7
    );
  }

  _buildCockpit() {
    this.cockpitGroup.position.set(0, 0.72, 1.55);

    // Main fuselage pod
    const hullGeo = new THREE.CylinderGeometry(0.42, 0.52, 2.05, 16);
    hullGeo.rotateX(Math.PI / 2);
    const hull = new THREE.Mesh(hullGeo, this.hullMat);
    hull.scale.set(1.12, 0.86, 1);
    hull.castShadow = true;
    hull.receiveShadow = true;
    this.cockpitGroup.add(hull);

    // Sleek tapered nose cone (-Z)
    const noseGeo = new THREE.ConeGeometry(0.42, 0.92, 16);
    noseGeo.rotateX(-Math.PI / 2);
    const nose = new THREE.Mesh(noseGeo, this.accentMat);
    nose.position.z = -1.46;
    nose.scale.set(1.12, 0.84, 1);
    nose.castShadow = true;
    this.cockpitGroup.add(nose);

    // Glossy cockpit canopy
    const canopyGeo = new THREE.SphereGeometry(0.36, 16, 12);
    const canopy = new THREE.Mesh(canopyGeo, this.canopyMat);
    canopy.scale.set(0.95, 0.72, 2.15);
    canopy.position.set(0, 0.28, -0.05);
    this.cockpitGroup.add(canopy);

    // Side air pods & tail fins
    const finGeo = new THREE.BoxGeometry(0.06, 0.52, 0.72);
    [-1, 1].forEach((side) => {
      const podGeo = new THREE.BoxGeometry(0.28, 0.24, 1.15);
      const sidePod = new THREE.Mesh(podGeo, this.cobaltTrimMat);
      sidePod.position.set(side * 0.52, -0.04, 0.24);
      sidePod.castShadow = true;
      this.cockpitGroup.add(sidePod);

      const tailFin = new THREE.Mesh(finGeo, this.accentMat);
      tailFin.position.set(side * 0.44, 0.34, 0.74);
      tailFin.rotation.z = -side * 0.34;
      tailFin.rotation.x = -0.22;
      tailFin.castShadow = true;
      this.cockpitGroup.add(tailFin);

      const anchor = new THREE.Object3D();
      anchor.position.set(side * 0.28, 0.0, -1.05);
      this.cockpitGroup.add(anchor);
      this.cockpitAnchors.push(anchor);
    });

    // Rear repulsor vent glow
    const ventGeo = new THREE.BoxGeometry(0.48, 0.14, 0.14);
    const vent = new THREE.Mesh(ventGeo, this.nozzleGlowMat);
    vent.position.set(0, 0.02, 1.04);
    this.cockpitGroup.add(vent);
  }

  _buildTethers() {
    this.tetherBuffers = [];
    this.tetherLines = [];
    const tetherMat = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.88
    });

    for (let i = 0; i < 2; i++) {
      const buf = new Float32Array((TETHER_SEGMENTS + 1) * 3);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(buf, 3));
      const line = new THREE.Line(geo, tetherMat);
      this.root.add(line);
      this.tetherBuffers.push(buf);
      this.tetherLines.push(line);
    }
  }

  _updateTethers(timeSec) {
    this.root.updateMatrixWorld(true);
    const invRoot = this.root.matrixWorld.clone().invert();

    for (let k = 0; k < 2; k++) {
      this.turbineAnchors[k].getWorldPosition(this._vA).applyMatrix4(invRoot);
      this.cockpitAnchors[k].getWorldPosition(this._vB).applyMatrix4(invRoot);
      const buf = this.tetherBuffers[k];

      for (let i = 0; i <= TETHER_SEGMENTS; i++) {
        const t = i / TETHER_SEGMENTS;
        const sag = Math.sin(t * Math.PI) * 0.12;
        const vib = Math.sin(timeSec * 38 + t * 9 + k * 2) * 0.015 * Math.sin(t * Math.PI);
        const idx = i * 3;
        buf[idx] = this._vA.x + (this._vB.x - this._vA.x) * t;
        buf[idx + 1] = this._vA.y + (this._vB.y - this._vA.y) * t - sag + vib;
        buf[idx + 2] = this._vA.z + (this._vB.z - this._vA.z) * t;
      }
      this.tetherLines[k].geometry.attributes.position.needsUpdate = true;
    }
  }

  updateVisuals(dt, timeSec, state) {
    const {
      steerInput,
      lateralVel,
      speedRatio,
      boostLevel,
      invulnTimer,
      hitWobble
    } = state;

    // Hover bobbing (multi-frequency levitation)
    const turbBob = Math.sin(timeSec * 5.2) * 0.065 + Math.sin(timeSec * 11.4) * 0.02;
    const podBob = Math.sin(timeSec * 5.2 - 0.85) * 0.055 + Math.cos(timeSec * 9.8) * 0.018;

    // Dynamic banking & yaw lead: front turbines bank first, cockpit follows with lag
    const targetTurbRoll = -steerInput * 0.44 - lateralVel * 0.012;
    const targetPodRoll = -steerInput * 0.30 - lateralVel * 0.016;
    const targetTurbYaw = -steerInput * 0.14;
    const targetPodYaw = -steerInput * 0.07 + lateralVel * 0.005;

    const lerpT = Math.min(1, dt * 11);
    const lerpP = Math.min(1, dt * 6.5);

    this.turbinesGroup.position.y = turbBob;
    this.turbinesGroup.rotation.z += (targetTurbRoll - this.turbinesGroup.rotation.z) * lerpT;
    this.turbinesGroup.rotation.y += (targetTurbYaw - this.turbinesGroup.rotation.y) * lerpT;
    this.turbinesGroup.rotation.x = -boostLevel * 0.045 + Math.sin(timeSec * 28) * hitWobble * 0.16;

    this.cockpitGroup.position.y = 0.72 + podBob;
    this.cockpitGroup.position.x += (-steerInput * 0.16 - this.cockpitGroup.position.x) * lerpP;
    this.cockpitGroup.rotation.z += (targetPodRoll - this.cockpitGroup.rotation.z) * lerpP;
    this.cockpitGroup.rotation.y += (targetPodYaw - this.cockpitGroup.rotation.y) * lerpP;
    this.cockpitGroup.rotation.x = -boostLevel * 0.03;

    // Intake fan rotation
    const spinRate = (14 + speedRatio * 24 + boostLevel * 20) * dt;
    this.spinners[0].rotation.z += spinRate;
    this.spinners[1].rotation.z -= spinRate;

    // Stabilizer vane micro-flare during turns/boost
    for (let i = 0; i < this.vanes.length; i++) {
      this.vanes[i].pivot.rotation.x = boostLevel * 0.12 + Math.abs(steerInput) * 0.15;
    }

    // Engine flame scale & HDR glow intensity
    const flamePulse = 0.92 + Math.sin(timeSec * 52) * 0.08 + Math.cos(timeSec * 37) * 0.06;
    const flameLen = (0.75 + speedRatio * 0.55 + boostLevel * 1.15) * flamePulse;
    const flameRad = 0.88 + boostLevel * 0.34;
    for (let i = 0; i < 2; i++) {
      this.flameCones[i].scale.set(flameRad, flameRad, flameLen);
      this.flameCores[i].scale.set(flameRad * 0.95, flameRad * 0.95, flameLen * 0.95);
    }

    this.nozzleGlowMat.emissiveIntensity = 1.6 + boostLevel * 2.2;
    this.flameOuterMat.color.setRGB(
      0.32 + boostLevel * 0.95,
      1.25 + boostLevel * 0.55,
      2.2 + boostLevel * 0.4
    );

    // Crackling energy bolts (~36 Hz)
    this._boltTimer += dt;
    if (this._boltTimer >= 0.026) {
      this._boltTimer = 0;
      this._regenerateBolts(boostLevel);
    }

    // Update flexible tethers between cockpit & turbines
    this._updateTethers(timeSec);

    // Invulnerability blink after collision
    if (invulnTimer > 0) {
      this.root.visible = Math.floor(invulnTimer * 16) % 2 === 0;
    } else {
      this.root.visible = true;
    }
  }
}

// Pre-allocated InstancedMesh Particle Pool (Thruster Plasma, Sand Dust & Crash Sparks)
export class PodParticlePool {
  constructor(parentScene) {
    const geo = new THREE.OctahedronGeometry(0.14, 0);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      toneMapped: false
    });

    this.mesh = new THREE.InstancedMesh(geo, mat, PARTICLE_COUNT);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;

    this.particles = [];
    this.dummy = new THREE.Object3D();
    this.cursor = 0;

    const initColor = new THREE.Color(0x38bdf8);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      this.particles.push({
        active: false,
        life: 0,
        maxLife: 1,
        x: 0,
        y: -999,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        scale: 0.1
      });
      this.dummy.position.set(0, -999, 0);
      this.dummy.scale.setScalar(0.001);
      this.dummy.updateMatrix();
      this.mesh.setMatrixAt(i, this.dummy.matrix);
      this.mesh.setColorAt(i, initColor);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;

    parentScene.add(this.mesh);
  }

  spawn(x, y, z, vx, vy, vz, scale, maxLife, r, g, b) {
    const p = this.particles[this.cursor];
    this.cursor = (this.cursor + 1) % PARTICLE_COUNT;

    p.active = true;
    p.life = maxLife;
    p.maxLife = maxLife;
    p.x = x;
    p.y = y;
    p.z = z;
    p.vx = vx;
    p.vy = vy;
    p.vz = vz;
    p.scale = scale;

    this.mesh.setColorAt((this.cursor + PARTICLE_COUNT - 1) % PARTICLE_COUNT, _scratchColor.setRGB(r, g, b));
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }

  emitBurst(x, y, z, count, r, g, b) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const spd = 4 + Math.random() * 14;
      this.spawn(
        x + (Math.random() - 0.5) * 0.8,
        y + (Math.random() - 0.5) * 0.5,
        z + (Math.random() - 0.5) * 0.8,
        Math.cos(a) * spd,
        2 + Math.random() * 9,
        Math.sin(a) * spd,
        1.1 + Math.random() * 1.1,
        0.35 + Math.random() * 0.35,
        r, g, b
      );
    }
  }

  update(dt) {
    let anyChanged = false;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = this.particles[i];
      if (!p.active) continue;
      anyChanged = true;

      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        this.dummy.position.set(0, -999, 0);
        this.dummy.scale.setScalar(0.001);
        this.dummy.updateMatrix();
        this.mesh.setMatrixAt(i, this.dummy.matrix);
        continue;
      }

      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.z += p.vz * dt;
      const frac = p.life / p.maxLife;
      this.dummy.position.set(p.x, p.y, p.z);
      this.dummy.scale.setScalar(Math.max(0.01, p.scale * frac));
      this.dummy.rotation.set(p.life * 6, p.life * 4, 0);
      this.dummy.updateMatrix();
      this.mesh.setMatrixAt(i, this.dummy.matrix);
    }
    if (anyChanged) {
      this.mesh.instanceMatrix.needsUpdate = true;
    }
  }
}

const _scratchColor = new THREE.Color();
