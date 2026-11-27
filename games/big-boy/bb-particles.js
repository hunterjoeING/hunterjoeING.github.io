// Procedural Soft-Sprite Particle & Thermodynamics Flow Visualization for UP Big Boy #4014
// - Twin-stack synchronized exhaust plumes (front & rear stacks triggered independently!)
// - Cylinder cock steam wisps & safety pop-valve wisps
// - Firebox sparks & glowing embers
// - Animated color-coded Thermodynamics Overlay particles (flue gas, boiling water/sat steam,
//   395 °C superheated steam through ball-joint pipe, exhaust steam into double blastpipe)

import * as THREE from 'three';
import { BIG_BOY_SPECS } from './specs.js';

const { layout } = BIG_BOY_SPECS;
const B = layout.boiler;

class SoftPuffPool {
  constructor(scene, texture, maxCount, additive = false) {
    this.maxCount = maxCount;
    this.particles = [];
    this.group = new THREE.Group();

    for (let i = 0; i < maxCount; i++) {
      const mat = new THREE.SpriteMaterial({
        map: texture,
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending
      });
      const sprite = new THREE.Sprite(mat);
      sprite.visible = false;
      this.group.add(sprite);
      this.particles.push({
        sprite,
        mat,
        active: false,
        age: 0,
        life: 1,
        vx: 0,
        vy: 0,
        vz: 0,
        startScale: 0.4,
        endScale: 2.2,
        baseOpacity: 0.5,
        rotSpeed: 0,
        drag: 0.98
      });
    }
    this.cursor = 0;
    scene.add(this.group);
  }

  spawn(opts) {
    const p = this.particles[this.cursor];
    this.cursor = (this.cursor + 1) % this.maxCount;
    p.active = true;
    p.age = 0;
    p.life = opts.life ?? 2.2;
    p.sprite.position.set(opts.x, opts.y, opts.z);
    p.vx = opts.vx ?? 0;
    p.vy = opts.vy ?? 2.0;
    p.vz = opts.vz ?? 0;
    p.startScale = opts.startScale ?? 0.45;
    p.endScale = opts.endScale ?? 2.6;
    p.baseOpacity = opts.opacity ?? 0.55;
    p.rotSpeed = (Math.random() - 0.5) * 1.4;
    p.drag = opts.drag ?? 0.97;
    p.mat.color.setHex(opts.color ?? 0xd8dee6);
    p.mat.rotation = Math.random() * Math.PI * 2;
    p.mat.opacity = 0;
    p.sprite.scale.setScalar(p.startScale);
    p.sprite.visible = true;
  }

  update(dt, windX = -1.5) {
    for (let i = 0; i < this.maxCount; i++) {
      const p = this.particles[i];
      if (!p.active) continue;
      p.age += dt;
      if (p.age >= p.life) {
        p.active = false;
        p.sprite.visible = false;
        continue;
      }
      const u = p.age / p.life;
      p.vx += (windX - p.vx) * Math.min(1, dt * 1.6);
      p.vy *= Math.pow(p.drag, dt * 60);
      p.sprite.position.x += p.vx * dt;
      p.sprite.position.y += p.vy * dt;
      p.sprite.position.z += p.vz * dt;

      const sc = p.startScale + (p.endScale - p.startScale) * Math.pow(u, 0.72);
      p.sprite.scale.setScalar(sc);
      p.mat.rotation += p.rotSpeed * dt;

      // Smooth fade-in then soft dissipation
      const fadeIn = Math.min(1, u / 0.12);
      const fadeOut = Math.pow(1 - u, 1.55);
      p.mat.opacity = p.baseOpacity * fadeIn * fadeOut;
    }
  }
}

export class BigBoyParticleSystem {
  constructor(scene, mats) {
    this.smokePool = new SoftPuffPool(scene, mats.smokeSpriteTex, 150, false);
    this.sparkPool = new SoftPuffPool(scene, mats.sparkSpriteTex, 48, true);

    this._ambientTimer = 0;
    this._cockTimer = 0;
    this._sparkTimer = 0;

    // ---- THERMODYNAMICS OVERLAY FLOW PARTICLES (Points with custom soft sprite!) ----
    this.thermoCount = 260;
    const positions = new Float32Array(this.thermoCount * 3);
    const colors = new Float32Array(this.thermoCount * 3);
    this.thermoAgents = [];

    // 4 distinct thermodynamic circuits:
    //  0: Flue Gas (Firebox -> Firetubes -> Smokebox -> Double Stack) [White-Yellow -> Orange -> Dark Grey]
    //  1: Boiling Water & Saturated Steam (Boiler -> Steam Dome) [Deep Blue -> Cyan]
    //  2: Superheated Live Steam 395°C (Steam Dome -> Superheater -> Rear & Front Ball-Joint Cylinders!) [Deep Glowing Red]
    //  3: Exhaust Steam 115°C (Front & Rear Cylinders -> Double Blastpipe -> Double Stack) [Light Grey / White]
    for (let i = 0; i < this.thermoCount; i++) {
      let type = 0;
      if (i < 78) type = 0;
      else if (i < 130) type = 1;
      else if (i < 204) type = 2;
      else type = 3;

      this.thermoAgents.push({
        type,
        branch: i % 2, // 0 = rear engine / upper path, 1 = front engine / lower path
        u: Math.random(),
        speed: 0.16 + Math.random() * 0.14,
        jitterY: (Math.random() - 0.5) * 0.55,
        jitterZ: -0.10 - Math.random() * 0.65
      });
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.thermoGeo = geo;

    const mat = new THREE.PointsMaterial({
      size: 0.34,
      map: mats.sparkSpriteTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    this.thermoPoints = new THREE.Points(geo, mat);
    this.thermoPoints.visible = false;
    scene.add(this.thermoPoints);
  }

  /**
   * Emit a powerful synchronized exhaust puff from either the FRONT or REAR stack of the double chimney!
   */
  emitStackChuff(stackWhich, intensity, speedMs, coalRateTph) {
    const stackX = stackWhich === 'front' ? B.stackFrontX : B.stackRearX;
    const stackY = B.stackTopY + 0.08;
    // Darker coal smoke under heavy stoker firing, whiter steam at light load
    const darkMix = Math.min(1, coalRateTph / 10.5);
    const shade = Math.round(230 - darkMix * 125);
    const hexColor = (shade << 16) | ((shade + 3) << 8) | (shade + 7);

    const count = intensity > 0.55 ? 4 : 2;
    for (let i = 0; i < count; i++) {
      this.smokePool.spawn({
        x: stackX + (Math.random() - 0.5) * 0.18,
        y: stackY + i * 0.14,
        z: (Math.random() - 0.5) * 0.18,
        vx: -Math.abs(speedMs) * 0.32 + (Math.random() - 0.5) * 0.6,
        vy: 3.4 + intensity * 4.4 + Math.random() * 1.1,
        vz: (Math.random() - 0.5) * 0.55,
        startScale: 0.42 + intensity * 0.28,
        endScale: 2.8 + intensity * 2.2,
        opacity: 0.48 + intensity * 0.30,
        life: 1.9 + Math.random() * 1.1,
        color: hexColor,
        drag: 0.965
      });
    }
  }

  update(dt, telemetry, articulation, flags) {
    const { boilerCutaway, cylinderCutaway, thermoOverlay, rollerStand } = flags;
    const windX = rollerStand ? -1.4 : -(Math.max(1.8, Math.abs(telemetry.speedMs) * 0.65));

    // 1. Trigger independent FRONT and REAR exhaust chuffs synchronized to exact cylinder release!
    if (telemetry.events.rearExhaust) {
      this.emitStackChuff('rear', telemetry.events.exhaustIntensity, telemetry.speedMs, telemetry.coalRateTph);
    }
    if (telemetry.events.frontExhaust) {
      this.emitStackChuff('front', telemetry.events.exhaustIntensity, telemetry.speedMs, telemetry.coalRateTph);
    }

    // 2. Continuous gentle draft smoke drift when idling or moving slowly
    this._ambientTimer += dt;
    if (this._ambientTimer > 0.16) {
      this._ambientTimer = 0;
      const sx = Math.random() > 0.5 ? B.stackFrontX : B.stackRearX;
      this.smokePool.spawn({
        x: sx + (Math.random() - 0.5) * 0.15,
        y: B.stackTopY + 0.05,
        z: (Math.random() - 0.5) * 0.15,
        vx: windX * 0.35,
        vy: 1.5 + telemetry.draftVacuumKPa * 0.45,
        vz: (Math.random() - 0.5) * 0.25,
        startScale: 0.38,
        endScale: 2.0,
        opacity: 0.24,
        life: 2.4,
        color: 0xb8c2cc
      });
    }

    // 3. Cylinder cock wisps at low speed & safety pop-valve wisps near 20.7 bar
    this._cockTimer += dt;
    if (this._cockTimer > 0.24) {
      this._cockTimer = 0;
      if (telemetry.speedKmh < 24 && telemetry.throttle > 0.08) {
        for (const isFront of [false, true]) {
          const basePt = isFront ? articulation.livePipe.end : { x: layout.rearEngine.cylinderX, z: 0 };
          const side = Math.random() > 0.5 ? 1 : -1;
          this.smokePool.spawn({
            x: basePt.x + (Math.random() - 0.5) * 0.35,
            y: 0.42,
            z: basePt.z + side * 1.15,
            vx: windX * 0.2,
            vy: 0.35,
            vz: side * (1.2 + Math.random() * 0.6),
            startScale: 0.22,
            endScale: 1.15,
            opacity: 0.26,
            life: 1.1,
            color: 0xf1f5f9
          });
        }
      }
      // Safety pop valve whisper when pressure is at max 20.7 bar
      if (telemetry.boilerPressureBar >= 20.68) {
        this.smokePool.spawn({
          x: -4.55,
          y: B.centerY + B.barrelRearRadius + 0.32,
          z: 0,
          vx: windX * 0.25,
          vy: 3.6,
          vz: 0,
          startScale: 0.16,
          endScale: 0.95,
          opacity: 0.32,
          life: 0.85,
          color: 0xffffff
        });
      }
    }

    // 4. Firebox glowing sparks rising inside cutaway firebox!
    this._sparkTimer += dt;
    if (boilerCutaway && this._sparkTimer > 0.07) {
      this._sparkTimer = 0;
      this.sparkPool.spawn({
        x: -10.1 + Math.random() * 4.4,
        y: B.fireboxGrateY + 0.26,
        z: -0.15 - Math.random() * 0.8,
        vx: 1.6 + telemetry.draftVacuumKPa * 0.9,
        vy: 1.2 + Math.random() * 1.4,
        vz: (Math.random() - 0.5) * 0.4,
        startScale: 0.10,
        endScale: 0.03,
        opacity: 0.95,
        life: 0.55 + Math.random() * 0.4,
        color: 0xffb347,
        drag: 0.99
      });
    }

    this.smokePool.update(dt, windX);
    this.sparkPool.update(dt, 1.5);

    // 5. Update Thermodynamics Overlay Flow Particles
    const showThermo = thermoOverlay || boilerCutaway || cylinderCutaway;
    this.thermoPoints.visible = showThermo;
    if (showThermo) {
      this.thermoPoints.material.opacity = thermoOverlay ? 0.94 : 0.52;
      this.thermoPoints.material.size = thermoOverlay ? 0.38 : 0.26;
      const pos = this.thermoGeo.attributes.position.array;
      const col = this.thermoGeo.attributes.color.array;
      const flowSpeedMult = 0.45 + 1.45 * telemetry.fireIntensity;

      for (let i = 0; i < this.thermoCount; i++) {
        const a = this.thermoAgents[i];
        a.u = (a.u + dt * a.speed * flowSpeedMult) % 1;
        const u = a.u;
        let x = 0, y = 3, z = -0.3;
        let r = 1, g = 1, b = 1;

        if (a.type === 0) {
          // FLUE GAS: Firebox (-10.2) -> Firetubes (-5.4..+6.0) -> Smokebox (+8.0) -> Stack (+4.9)
          if (u < 0.22) {
            const t = u / 0.22;
            x = -10.2 + t * 4.8;
            y = B.fireboxGrateY + 0.35 + t * 1.1 + a.jitterY * 0.35;
            z = a.jitterZ;
            // White-yellow ~1400°C -> bright orange
            r = 1.0; g = 0.95 - t * 0.38; b = 0.72 - t * 0.62;
          } else if (u < 0.80) {
            const t = (u - 0.22) / 0.58;
            x = -5.4 + t * 11.4;
            y = B.centerY - 0.20 + a.jitterY * 0.85;
            z = a.jitterZ;
            // Orange -> dull reddish-grey as heat transfers to boiler water!
            r = 0.98 - t * 0.56; g = 0.54 - t * 0.16; b = 0.10 + t * 0.32;
          } else {
            const t = (u - 0.80) / 0.20;
            const sx = a.branch === 0 ? B.stackRearX : B.stackFrontX;
            x = 6.0 + t * (sx - 6.0);
            y = B.centerY + t * (B.stackTopY - B.centerY);
            z = a.jitterZ * (1 - t);
            // Exhaust flue gas dark warm grey
            r = 0.45 + t * 0.15; g = 0.45 + t * 0.15; b = 0.48 + t * 0.15;
          }
        } else if (a.type === 1) {
          // WATER & SATURATED STEAM (~216 °C, 20.7 bar): Deep Blue -> Cyan rising to Steam Dome!
          if (u < 0.62) {
            const t = u / 0.62;
            x = -4.8 + ((i * 0.73) % 10.0);
            y = (B.centerY - 0.85) + t * 1.45;
            z = a.jitterZ;
            r = 0.05 + t * 0.10; g = 0.48 + t * 0.44; b = 0.95;
          } else {
            const t = (u - 0.62) / 0.38;
            const startX = -4.8 + ((i * 0.73) % 10.0);
            x = startX + (B.steamDomeX - startX) * t;
            y = B.waterLevelY + 0.15 + t * 0.72;
            z = a.jitterZ * (1 - t * 0.7);
            r = 0.18; g = 0.90; b = 1.0;
          }
        } else if (a.type === 2) {
          // SUPERHEATED LIVE STEAM (~395 °C, 20.7 bar): Glowing Deep Red!
          // Dome -> Superheater -> Branch 0: Rear Cylinders, Branch 1: Articulated Ball-Joint Pipe -> Front Cylinders!
          r = 1.0; g = 0.16; b = 0.06;
          if (u < 0.38) {
            const t = u / 0.38;
            x = B.steamDomeX + t * (B.smokeboxRearX + 0.5 - B.steamDomeX);
            y = B.centerY + 0.82 - t * 0.22;
            z = -0.18;
          } else if (a.branch === 0) {
            // To Rear Cylinders (-1.35)
            const t = (u - 0.38) / 0.62;
            x = (B.smokeboxRearX + 0.5) + t * (layout.rearEngine.cylinderX - (B.smokeboxRearX + 0.5));
            y = (B.centerY + 0.6) + t * (1.48 - (B.centerY + 0.6));
            z = -0.18 + t * 1.25;
          } else {
            // Through Articulated Ball-Joint Live Pipe to Swinging Front Cylinders!
            const t = (u - 0.38) / 0.62;
            const pA = articulation.livePipe.start;
            const pB = articulation.livePipe.end;
            if (t < 0.35) {
              const s = t / 0.35;
              x = (B.smokeboxRearX + 0.5) + s * (pA.x - (B.smokeboxRearX + 0.5));
              y = (B.centerY + 0.6) + s * (pA.y - (B.centerY + 0.6));
              z = -0.18 + s * (pA.z - (-0.18));
            } else {
              const s = (t - 0.35) / 0.65;
              x = pA.x + s * (pB.x - pA.x);
              y = pA.y + s * (pB.y - pA.y);
              z = pA.z + s * (pB.z - pA.z);
            }
          }
        } else {
          // EXHAUST STEAM (~115 °C, 1.35 bar): Light Grey / White rushing into Double Blastpipe -> Double Stack!
          r = 0.85; g = 0.90; b = 0.96;
          if (a.branch === 0) {
            // Rear Cylinders -> Rear Blastpipe (stackRearX)
            if (u < 0.55) {
              const t = u / 0.55;
              x = layout.rearEngine.cylinderX + t * (B.stackRearX - layout.rearEngine.cylinderX);
              y = 1.65 + t * (B.centerY - 0.55 - 1.65);
              z = 0.65 * (1 - t);
            } else {
              const t = (u - 0.55) / 0.45;
              x = B.stackRearX;
              y = (B.centerY - 0.55) + t * (B.stackTopY - (B.centerY - 0.55));
              z = 0;
            }
          } else {
            // Articulated Front Cylinders -> Front Blastpipe (stackFrontX)
            const pA = articulation.exhaustPipe.start;
            const pB = articulation.exhaustPipe.end;
            if (u < 0.45) {
              const t = u / 0.45;
              x = pA.x + t * (pB.x - pA.x);
              y = pA.y + t * (pB.y - pA.y);
              z = pA.z + t * (pB.z - pA.z);
            } else {
              const t = (u - 0.45) / 0.55;
              x = B.stackFrontX;
              y = pB.y + t * (B.stackTopY - pB.y);
              z = 0;
            }
          }
        }

        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;
        col[i * 3] = r;
        col[i * 3 + 1] = g;
        col[i * 3 + 2] = b;
      }
      this.thermoGeo.attributes.position.needsUpdate = true;
      this.thermoGeo.attributes.color.needsUpdate = true;
    }
  }
}
