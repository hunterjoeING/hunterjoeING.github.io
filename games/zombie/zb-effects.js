// Pooled 3D Bullets (InstancedMesh), Shockwave Rings, Sparks, Dynamic Explosion Lights & Float Texts
// Zero runtime geometry/material/canvas allocations inside requestAnimationFrame.

import * as THREE from 'three';
import { getZBTextures } from './zb-textures.js';

export const BRIDGE_HALF_W = 6.2;
export const Z_NEAR = 6.0;
export const Z_SPAN = 44.0;
export const toWorldX = (u) => u * BRIDGE_HALF_W;
export const toWorldZ = (z) => Z_NEAR - z * Z_SPAN;

const MAX_BULLETS = 220;
const MAX_RINGS = 28;
const MAX_SPARKS = 240;
const MAX_FLOATS = 20;
const MAX_BOOM_LIGHTS = 3;

export class ZBEffectsPool {
  constructor(parentGroup) {
    this.root = new THREE.Group();
    parentGroup.add(this.root);
    const tex = getZBTextures();

    this.tmpColor = new THREE.Color();
    this.tmpPos = new THREE.Vector3();
    this.tmpScale = new THREE.Vector3();
    this.tmpQuat = new THREE.Quaternion();
    this.tmpEuler = new THREE.Euler();
    this.tmpMat4 = new THREE.Matrix4();
    this.tmpDir = new THREE.Vector3();
    this.upVec = new THREE.Vector3(0, 1, 0);

    // 1. Instanced Plasma Tracer Bullets (2 draw calls total for 220 bullets)
    const boltGeo = new THREE.CylinderGeometry(0.055, 0.085, 1.05, 6);
    const boltMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.92,
      toneMapped: false
    });
    this.boltMesh = new THREE.InstancedMesh(boltGeo, boltMat, MAX_BULLETS);
    this.boltMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.boltMesh.frustumCulled = false;
    this.boltMesh.count = 0;

    const tipGeo = new THREE.SphereGeometry(0.11, 8, 6);
    const tipMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      toneMapped: false
    });
    this.tipMesh = new THREE.InstancedMesh(tipGeo, tipMat, MAX_BULLETS);
    this.tipMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.tipMesh.frustumCulled = false;
    this.tipMesh.count = 0;
    this.root.add(this.boltMesh, this.tipMesh);

    // 2. Shockwave Rings
    const ringGeo = new THREE.RingGeometry(0.76, 1.0, 28);
    this.ringPool = [];
    for (let i = 0; i < MAX_RINGS; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xfde047,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      });
      const mesh = new THREE.Mesh(ringGeo, mat);
      mesh.rotation.x = -Math.PI * 0.5;
      mesh.visible = false;
      this.root.add(mesh);
      this.ringPool.push({ mesh, mat });
    }

    // 3. Instanced 3D Sparks / Debris (1 draw call)
    const sparkGeo = new THREE.OctahedronGeometry(0.11, 0);
    const sparkMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      toneMapped: false
    });
    this.sparkMesh = new THREE.InstancedMesh(sparkGeo, sparkMat, MAX_SPARKS);
    this.sparkMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.sparkMesh.frustumCulled = false;
    this.sparkMesh.count = 0;
    this.root.add(this.sparkMesh);

    // 4. Dynamic Explosion Point Lights Pool
    this.boomLights = [];
    this.knownBigRings = new WeakSet();
    for (let i = 0; i < MAX_BOOM_LIGHTS; i++) {
      const light = new THREE.PointLight(0xfb923c, 0, 14, 1.8);
      light.position.set(0, 1.8, 0);
      this.root.add(light);
      this.boomLights.push({ light, life: 0, maxLife: 0.42, peak: 8 });
    }
    this.boomCursor = 0;

    // 5. Squad Muzzle Flash Dynamic PointLight
    this.muzzleLight = new THREE.PointLight(0x38bdf8, 0, 9, 1.8);
    this.muzzleLight.position.set(0, 1.2, Z_NEAR - 0.8);
    this.root.add(this.muzzleLight);

    // 6. Floating 3D Combat Texts (drawn once per floater spawn)
    this.floatPool = [];
    this.floatAssigned = new WeakMap();
    for (let i = 0; i < MAX_FLOATS; i++) {
      const c = document.createElement('canvas');
      c.width = 384;
      c.height = 84;
      const ctx = c.getContext('2d');
      const ftex = new THREE.CanvasTexture(c);
      ftex.colorSpace = THREE.SRGBColorSpace;
      const mat = new THREE.SpriteMaterial({
        map: ftex,
        transparent: true,
        depthTest: false,
        depthWrite: false
      });
      const sprite = new THREE.Sprite(mat);
      sprite.renderOrder = 30;
      sprite.visible = false;
      this.root.add(sprite);
      this.floatPool.push({ sprite, mat, canvas: c, ctx, tex: ftex, owner: null, glowTex: tex.glowSprite });
    }
  }

  triggerExplosionLight(wx, wz, colorHex = 0xfb923c, peak = 11) {
    const slot = this.boomLights[this.boomCursor];
    this.boomCursor = (this.boomCursor + 1) % MAX_BOOM_LIGHTS;
    slot.light.position.set(wx, 1.9, wz);
    slot.light.color.setHex(colorHex);
    slot.life = slot.maxLife;
    slot.peak = peak;
    slot.light.intensity = peak;
  }

  sync(dt, bullets, fx, floaters, dmgMult, squadX, firingGlow, spreadLevel) {
    // Muzzle flash light
    if (firingGlow) {
      const col = dmgMult >= 2 ? 0xf472b6 : (spreadLevel >= 2 ? 0xfb923c : 0x38bdf8);
      this.muzzleLight.color.setHex(col);
      this.muzzleLight.position.set(squadX, 1.35, Z_NEAR - 1.1);
      this.muzzleLight.intensity = 4.2;
    } else {
      this.muzzleLight.intensity = Math.max(0, this.muzzleLight.intensity - dt * 28);
    }

    // Update explosion point lights
    for (let i = 0; i < MAX_BOOM_LIGHTS; i++) {
      const bl = this.boomLights[i];
      if (bl.life > 0) {
        bl.life = Math.max(0, bl.life - dt);
        const f = bl.life / bl.maxLife;
        bl.light.intensity = bl.peak * f * f;
      } else {
        bl.light.intensity = 0;
      }
    }

    // 1. Bullets (InstancedMesh)
    const bCount = Math.min(bullets.length, MAX_BULLETS);
    for (let i = 0; i < bCount; i++) {
      const b = bullets[i];
      const wx = toWorldX(b.u);
      const wz = toWorldZ(b.z);
      const vx = b.du * BRIDGE_HALF_W;
      const vz = -b.dz * Z_SPAN;
      this.tmpDir.set(vx, 0, vz).normalize();
      this.tmpQuat.setFromUnitVectors(this.upVec, this.tmpDir);

      // Trail bolt shifted slightly behind tip
      this.tmpPos.set(wx - this.tmpDir.x * 0.48, 0.86, wz - this.tmpDir.z * 0.48);
      this.tmpScale.set(b.isSpread ? 1.15 : 1.0, 1.0, b.isSpread ? 1.15 : 1.0);
      this.tmpMat4.compose(this.tmpPos, this.tmpQuat, this.tmpScale);
      this.boltMesh.setMatrixAt(i, this.tmpMat4);

      const boltHex = b.isSpread
        ? (dmgMult >= 2 ? 0xfb7185 : 0xfb923c)
        : (dmgMult >= 2 ? 0xf472b6 : 0x38bdf8);
      this.tmpColor.setHex(boltHex);
      this.boltMesh.setColorAt(i, this.tmpColor);

      // Glowing tip
      this.tmpPos.set(wx, 0.86, wz);
      this.tmpScale.setScalar(1.0);
      this.tmpMat4.compose(this.tmpPos, this.tmpQuat, this.tmpScale);
      this.tipMesh.setMatrixAt(i, this.tmpMat4);
      this.tmpColor.setHex(b.isSpread ? 0xfef08a : 0xffffff);
      this.tipMesh.setColorAt(i, this.tmpColor);
    }
    this.boltMesh.count = bCount;
    this.tipMesh.count = bCount;
    if (bCount > 0) {
      this.boltMesh.instanceMatrix.needsUpdate = true;
      this.tipMesh.instanceMatrix.needsUpdate = true;
      if (this.boltMesh.instanceColor) this.boltMesh.instanceColor.needsUpdate = true;
      if (this.tipMesh.instanceColor) this.tipMesh.instanceColor.needsUpdate = true;
    }

    // 2. FX: Shockwave Rings + Instanced Sparks
    let ringIdx = 0;
    let sparkIdx = 0;
    for (let i = 0; i < fx.length; i++) {
      const f = fx[i];
      const wx = toWorldX(f.u);
      const wz = toWorldZ(Math.max(0, Math.min(1, f.z)));
      const maxL = f.maxLife || 0.35;
      const frac = Math.max(0, Math.min(1, f.life / maxL));

      if (f.ring) {
        if (f.maxR && f.maxR >= 50 && !this.knownBigRings.has(f)) {
          this.knownBigRings.add(f);
          this.triggerExplosionLight(wx, wz, f.color === '#38bdf8' ? 0x38bdf8 : 0xfb923c, 12);
        }
        if (ringIdx < MAX_RINGS) {
          const slot = this.ringPool[ringIdx++];
          const worldMaxR = (f.maxR || 26) * 0.068;
          const rad = Math.max(0.2, worldMaxR * (1.12 - frac * 0.85));
          slot.mesh.position.set(wx, 0.14, wz);
          slot.mesh.scale.set(rad, rad, 1);
          slot.mat.color.set(f.color);
          slot.mat.opacity = frac * 0.88;
          slot.mesh.visible = true;
        }
      } else if (sparkIdx < MAX_SPARKS) {
        const lift = f.vy !== undefined ? Math.max(0, -f.vy * (maxL - f.life) * 0.032) : 0;
        const wy = 0.72 + lift;
        const sc = Math.max(0.35, ((f.size || 2.5) / 3.0) * (0.4 + frac * 0.9));
        this.tmpPos.set(wx, wy, wz);
        this.tmpEuler.set(f.life * 8 + i, f.life * 11, 0);
        this.tmpQuat.setFromEuler(this.tmpEuler);
        this.tmpScale.setScalar(sc);
        this.tmpMat4.compose(this.tmpPos, this.tmpQuat, this.tmpScale);
        this.sparkMesh.setMatrixAt(sparkIdx, this.tmpMat4);
        this.tmpColor.set(f.color || '#ffffff');
        this.sparkMesh.setColorAt(sparkIdx, this.tmpColor);
        sparkIdx++;
      }
    }
    for (let i = ringIdx; i < MAX_RINGS; i++) {
      this.ringPool[i].mesh.visible = false;
    }
    this.sparkMesh.count = sparkIdx;
    if (sparkIdx > 0) {
      this.sparkMesh.instanceMatrix.needsUpdate = true;
      if (this.sparkMesh.instanceColor) this.sparkMesh.instanceColor.needsUpdate = true;
    }

    // 3. Floating Combat Texts
    const activeSet = new Set();
    const fCount = Math.min(floaters.length, MAX_FLOATS);
    for (let i = 0; i < fCount; i++) activeSet.add(floaters[i]);

    for (let i = 0; i < MAX_FLOATS; i++) {
      const slot = this.floatPool[i];
      if (slot.owner && !activeSet.has(slot.owner)) {
        slot.owner = null;
        slot.sprite.visible = false;
      }
    }

    for (let i = 0; i < fCount; i++) {
      const fl = floaters[i];
      let slot = this.floatAssigned.get(fl);
      if (!slot || slot.owner !== fl) {
        slot = this.floatPool.find(s => s.owner === null);
        if (!slot) continue;
        slot.owner = fl;
        this.floatAssigned.set(fl, slot);
        this._drawFloatText(slot, fl.text, fl.color);
      }
      const wx = toWorldX(fl.u);
      const wz = toWorldZ(fl.z);
      const alpha = Math.min(1, fl.life * 1.4);
      slot.sprite.position.set(wx, 2.55 + (1.2 - Math.min(1.2, fl.life)) * 0.9, wz);
      slot.sprite.scale.set(4.1, 0.9, 1);
      slot.mat.opacity = alpha;
      slot.sprite.visible = true;
    }
  }

  _drawFloatText(slot, text, color) {
    const { ctx, canvas, tex } = slot;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '800 32px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'rgba(2, 6, 23, 0.92)';
    ctx.strokeText(text, canvas.width * 0.5, canvas.height * 0.5);
    ctx.fillStyle = color || '#ffffff';
    ctx.fillText(text, canvas.width * 0.5, canvas.height * 0.5);
    tex.needsUpdate = true;
  }
}
