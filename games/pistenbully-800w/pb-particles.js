// Soft-Sprite Alpine Snow Wave, Tiller Snow-Dust Veil, Track-Slip Spray & Exhaust Vapor
// Built with single Points draw-calls for buttery-smooth 60 FPS on Desktop & Mobile!

import * as THREE from 'three';
import { PB_SPECS } from './specs.js';

function createSoftPointsPool(count, spriteTex, { size = 0.55, opacity = 0.72, colorHex = 0xeaf4ff, additive = false } = {}) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size,
    map: spriteTex,
    vertexColors: true,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    sizeAttenuation: true
  });

  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;

  const baseColor = new THREE.Color(colorHex);
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      active: false,
      age: 0,
      life: 1,
      x: 0, y: -99, z: 0,
      vx: 0, vy: 0, vz: 0
    });
    positions[i * 3 + 1] = -99;
    colors[i * 3] = baseColor.r;
    colors[i * 3 + 1] = baseColor.g;
    colors[i * 3 + 2] = baseColor.b;
  }

  return { points, geo, mat, positions, colors, particles, baseColor, cursor: 0 };
}

export class PistenBullyParticleSystem {
  constructor(parentGroup, mats) {
    this.group = new THREE.Group();
    parentGroup.add(this.group);

    // 1. Rolling Snow Wave & Side-Spill Spray ahead of 12-Way Blade
    this.bladePool = createSoftPointsPool(170, mats.particleSprite, {
      size: 0.42,
      opacity: 0.54,
      colorHex: 0xdbeeff
    });
    this.group.add(this.bladePool.points);

    // 2. Fine Illuminated Snow-Dust Veil behind spinning AlpinFlexFräse
    this.tillerPool = createSoftPointsPool(210, mats.particleSprite, {
      size: 0.46,
      opacity: 0.40,
      colorHex: 0xcbe4ff,
      additive: false
    });
    this.group.add(this.tillerPool.points);

    // 3. Track-Slip Snow Rooster-Tail Spray behind Rear Sprockets (spikes when winch is OFF!)
    this.slipPool = createSoftPointsPool(110, mats.particleSprite, {
      size: 0.38,
      opacity: 0.56,
      colorHex: 0xd8ecff
    });
    this.group.add(this.slipPool.points);

    // 4. Warm Exhaust Condensation Vapor from Vertical Exhaust Pipe
    this.exhaustPool = createSoftPointsPool(75, mats.particleSprite, {
      size: 0.36,
      opacity: 0.34,
      colorHex: 0xcbdcf0
    });
    this.group.add(this.exhaustPool.points);

    this.accumBlade = 0;
    this.accumTiller = 0;
    this.accumSlip = 0;
    this.accumExhaust = 0;
  }

  spawn(pool, x, y, z, vx, vy, vz, life) {
    const p = pool.particles[pool.cursor];
    pool.cursor = (pool.cursor + 1) % pool.particles.length;
    p.active = true;
    p.age = 0;
    p.life = life;
    p.x = x; p.y = y; p.z = z;
    p.vx = vx; p.vy = vy; p.vz = vz;
  }

  stepPool(pool, dt, gravityY, drag, nightTint) {
    const pos = pool.positions;
    const col = pool.colors;
    const bc = pool.baseColor;
    for (let i = 0; i < pool.particles.length; i++) {
      const p = pool.particles[i];
      if (!p.active) {
        pos[i * 3 + 1] = -99;
        continue;
      }
      p.age += dt;
      if (p.age >= p.life) {
        p.active = false;
        pos[i * 3 + 1] = -99;
        continue;
      }
      p.vy += gravityY * dt;
      p.vx *= (1 - drag * dt);
      p.vz *= (1 - drag * dt);
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.z += p.vz * dt;
      if (p.y < 0.04) p.y = 0.04;

      const u = p.age / p.life;
      const fade = Math.sin(Math.min(1, u) * Math.PI) * nightTint;
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;
      col[i * 3] = bc.r * fade;
      col[i * 3 + 1] = bc.g * fade;
      col[i * 3 + 2] = bc.b * fade;
    }
    pool.geo.attributes.position.needsUpdate = true;
    pool.geo.attributes.color.needsUpdate = true;
  }

  update(dt, telemetry, bladeKin, tillerKin, isNight) {
    if (dt <= 0) return;

    const fwdSpeed = Math.max(0, telemetry.groundSpeedMs);
    const absSpeed = Math.abs(telemetry.groundSpeedMs);
    const nightTint = isNight ? 1.05 : 0.92;

    // 1. Snow Wave & Side-Spill ahead of 12-Way Blade
    if (bladeKin.snowContact && fwdSpeed > 0.25) {
      const bladeRate = 28 + fwdSpeed * 22;
      this.accumBlade += dt * bladeRate;
      const halfW = bladeKin.effectiveWidthM * 0.46;
      const bx = bladeKin.cuttingEdgeCenter.x + 0.14;
      const sinAng = Math.sin(bladeKin.angleRad);
      while (this.accumBlade >= 1) {
        this.accumBlade -= 1;
        const rz = (Math.random() * 2 - 1) * halfW;
        const spillSign = Math.abs(sinAng) > 0.08 ? Math.sign(sinAng) : Math.sign(rz || 1);
        this.spawn(
          this.bladePool,
          bx + (Math.random() - 0.5) * 0.28,
          0.16 + Math.random() * 0.34,
          rz,
          -fwdSpeed * 0.35 + (Math.random() - 0.3) * 0.8,
          0.45 + Math.random() * 0.85,
          spillSign * (0.45 + Math.random() * 1.15),
          0.55 + Math.random() * 0.55
        );
      }
    }

    // 2. Illuminated Snow-Dust Veil behind AlpinFlexFräse
    if (tillerKin.active && telemetry.tillerRpm > 100) {
      const tillerRate = 34 + absSpeed * 18 + tillerKin.downpressure * 26;
      this.accumTiller += dt * tillerRate;
      const tx = tillerKin.shaftCenter.x - 0.28;
      const halfW = tillerKin.finisherHalfWidth * 0.94;
      while (this.accumTiller >= 1) {
        this.accumTiller -= 1;
        this.spawn(
          this.tillerPool,
          tx + (Math.random() - 0.5) * 0.45,
          0.14 + Math.random() * 0.28,
          (Math.random() * 2 - 1) * halfW,
          -Math.max(1.2, fwdSpeed * 0.9 + 1.1) - Math.random() * 1.2,
          0.35 + Math.random() * 0.95,
          (Math.random() - 0.5) * 0.9,
          0.75 + Math.random() * 0.85
        );
      }
    }

    // 3. Track-Slip Snow Spray behind Rear Sprockets (dramatic feedback when winch is OFF on steep slopes!)
    if (telemetry.slipRatio > 0.14 && Math.abs(telemetry.trackSpeedLeftMs) > 0.3) {
      const slipRate = 18 + telemetry.slipRatio * 95;
      this.accumSlip += dt * slipRate;
      const t = PB_SPECS.tracks;
      while (this.accumSlip >= 1) {
        this.accumSlip -= 1;
        const side = Math.random() < 0.5 ? -1 : 1;
        this.spawn(
          this.slipPool,
          t.sprocketCenter.x - 0.25 + (Math.random() - 0.5) * 0.4,
          0.18 + Math.random() * 0.22,
          side * (t.centerZ + (Math.random() - 0.5) * t.width * 0.75),
          -2.0 - telemetry.slipRatio * 4.5 - Math.random() * 1.5,
          0.75 + telemetry.slipRatio * 2.1 + Math.random() * 0.6,
          (Math.random() - 0.5) * 0.9,
          0.45 + Math.random() * 0.45
        );
      }
    }

    // 4. Warm Exhaust Condensation Vapor rising in cold alpine air
    const ex = PB_SPECS.chassis.exhaustTip;
    const exRate = 12 + (telemetry.engineLoadPct / 100) * 18;
    this.accumExhaust += dt * exRate;
    while (this.accumExhaust >= 1) {
      this.accumExhaust -= 1;
      this.spawn(
        this.exhaustPool,
        ex.x + (Math.random() - 0.5) * 0.08,
        ex.y + 0.06,
        ex.z + (Math.random() - 0.5) * 0.08,
        -0.55 - fwdSpeed * 0.22 + (Math.random() - 0.5) * 0.3,
        0.95 + (telemetry.engineLoadPct / 100) * 0.65 + Math.random() * 0.35,
        (Math.random() - 0.5) * 0.35,
        1.25 + Math.random() * 0.85
      );
    }

    this.stepPool(this.bladePool, dt, -2.4, 1.3, nightTint);
    this.stepPool(this.tillerPool, dt, -0.7, 1.1, nightTint);
    this.stepPool(this.slipPool, dt, -4.2, 0.8, nightTint);
    this.stepPool(this.exhaustPool, dt, 0.22, 0.9, isNight ? 0.72 : 0.55);
  }
}
