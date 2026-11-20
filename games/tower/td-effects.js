// Pooled 3D Projectiles, Glow Trails, Laser Beams, Shockwaves, Instanced Sparks & Float Texts
// Zero runtime geometry/material/texture creation during requestAnimationFrame.

import * as THREE from 'three';
import { getTDTextures } from './td-textures.js';

const COLS = 14;
const ROWS = 9;
const MAX_PROJ = 64;
const MAX_BEAMS = 16;
const MAX_RINGS = 28;
const MAX_SPARKS = 160;
const MAX_FLOATS = 24;

function bx(x) { return x - COLS * 0.5; }
function bz(y) { return y - ROWS * 0.5; }

export class TDEffectsPool {
  constructor(parentGroup) {
    this.root = new THREE.Group();
    parentGroup.add(this.root);
    const tex = getTDTextures();

    this.tmpColor = new THREE.Color();
    this.tmpVecA = new THREE.Vector3();
    this.tmpVecB = new THREE.Vector3();
    this.tmpQuat = new THREE.Quaternion();
    this.tmpMat4 = new THREE.Matrix4();
    this.upVec = new THREE.Vector3(0, 1, 0);
    this.rightVec = new THREE.Vector3(1, 0, 0);
    this.tmpEuler = new THREE.Euler();

    // 1. Projectiles + Glowing Trails
    const coreGeo = new THREE.SphereGeometry(0.085, 10, 8);
    const trailGeo = new THREE.CylinderGeometry(0.015, 0.055, 0.42, 6);
    this.projPool = [];
    for (let i = 0; i < MAX_PROJ; i++) {
      const grp = new THREE.Group();
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
      const core = new THREE.Mesh(coreGeo, coreMat);
      const trailMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      });
      const trail = new THREE.Mesh(trailGeo, trailMat);
      trail.rotation.z = Math.PI * 0.5;
      trail.position.x = -0.20;

      const haloMat = new THREE.SpriteMaterial({
        map: tex.glowSprite,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const halo = new THREE.Sprite(haloMat);
      halo.scale.set(0.48, 0.48, 1);

      grp.add(core, trail, halo);
      grp.visible = false;
      this.root.add(grp);
      this.projPool.push({ grp, coreMat, trail, trailMat, haloMat });
    }

    // 2. Railgun Beams
    const beamOuterGeo = new THREE.CylinderGeometry(0.065, 0.065, 1, 8, 1, true);
    const beamInnerGeo = new THREE.CylinderGeometry(0.022, 0.022, 1, 6, 1, true);
    this.beamPool = [];
    for (let i = 0; i < MAX_BEAMS; i++) {
      const grp = new THREE.Group();
      const outerMat = new THREE.MeshBasicMaterial({
        color: 0xf472b6,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      });
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      });
      const outer = new THREE.Mesh(beamOuterGeo, outerMat);
      const inner = new THREE.Mesh(beamInnerGeo, innerMat);
      grp.add(outer, inner);
      grp.visible = false;
      this.root.add(grp);
      this.beamPool.push({ grp, outer, inner, outerMat, innerMat });
    }

    // 3. Shockwave / Frost Rings
    const ringGeo = new THREE.RingGeometry(0.82, 1.0, 28);
    this.ringPool = [];
    for (let i = 0; i < MAX_RINGS; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.8,
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

    // 4. Instanced Sparks (1 draw call!)
    const sparkGeo = new THREE.OctahedronGeometry(0.055, 0);
    const sparkMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      toneMapped: false
    });
    this.sparkMesh = new THREE.InstancedMesh(sparkGeo, sparkMat, MAX_SPARKS);
    this.sparkMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.sparkMesh.frustumCulled = false;
    this.sparkMesh.count = 0;
    this.root.add(this.sparkMesh);

    // 5. Floating Texts (reusable canvas slots, redrawn only once on spawn)
    this.floatPool = [];
    this.floatAssigned = new WeakMap();
    for (let i = 0; i < MAX_FLOATS; i++) {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 64;
      const cctx = c.getContext('2d');
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
      this.floatPool.push({ sprite, mat, canvas: c, ctx: cctx, tex: ftex, owner: null });
    }
  }

  sync(projectiles, beams, particles, sparks, floatTexts) {
    // 1. Projectiles
    const pCount = Math.min(projectiles.length, MAX_PROJ);
    for (let i = 0; i < MAX_PROJ; i++) {
      const slot = this.projPool[i];
      if (i >= pCount) {
        slot.grp.visible = false;
        continue;
      }
      const pr = projectiles[i];
      if (pr._sx === undefined) {
        pr._sx = pr.x;
        pr._sy = pr.y;
        pr._px = pr.x;
        pr._py = pr.y;
      }
      const wx = bx(pr.x);
      const wz = bz(pr.y);
      let wy = 0.36;

      if (pr.splash > 0) {
        const totalD = Math.max(0.25, Math.hypot(pr.tx - pr._sx, pr.ty - pr._sy));
        const remD = Math.hypot(pr.tx - pr.x, pr.ty - pr.y);
        const t = Math.max(0, Math.min(1, 1 - remD / totalD));
        const arcH = Math.min(1.75, 0.55 + totalD * 0.22);
        wy = 0.34 + Math.sin(t * Math.PI) * arcH;
      }

      const prevWy = pr._prevWy !== undefined ? pr._prevWy : wy;
      const dx = wx - bx(pr._px);
      const dz = wz - bz(pr._py);
      const dy = wy - prevWy;

      slot.grp.position.set(wx, wy, wz);
      if (dx * dx + dy * dy + dz * dz > 1e-6) {
        this.tmpVecA.set(dx, dy, dz).normalize();
        this.tmpQuat.setFromUnitVectors(this.rightVec, this.tmpVecA);
        slot.grp.quaternion.copy(this.tmpQuat);
      }

      pr._px = pr.x;
      pr._py = pr.y;
      pr._prevWy = wy;

      const scale = pr.splash > 0 ? 1.35 : 0.92;
      slot.grp.scale.setScalar(scale);
      slot.trailMat.color.set(pr.color);
      slot.haloMat.color.set(pr.color);
      slot.coreMat.color.set(pr.splash > 0 ? '#fed7aa' : '#ffffff');
      slot.grp.visible = true;
    }

    // 2. Beams
    const bCount = Math.min(beams.length, MAX_BEAMS);
    for (let i = 0; i < MAX_BEAMS; i++) {
      const slot = this.beamPool[i];
      if (i >= bCount) {
        slot.grp.visible = false;
        continue;
      }
      const b = beams[i];
      this.tmpVecA.set(bx(b.x0), 0.35, bz(b.y0));
      this.tmpVecB.set(bx(b.x1), 0.24, bz(b.y1));
      const len = this.tmpVecA.distanceTo(this.tmpVecB);
      const alpha = Math.max(0, Math.min(1, b.life / 0.16));

      slot.grp.position.copy(this.tmpVecA).lerp(this.tmpVecB, 0.5);
      this.tmpVecB.sub(this.tmpVecA).normalize();
      slot.grp.quaternion.setFromUnitVectors(this.upVec, this.tmpVecB);

      const widthScale = 0.4 + alpha * 0.9;
      slot.outer.scale.set(widthScale, len, widthScale);
      slot.inner.scale.set(widthScale, len, widthScale);
      slot.outerMat.color.set(b.color);
      slot.outerMat.opacity = 0.82 * alpha;
      slot.innerMat.opacity = 0.95 * alpha;
      slot.grp.visible = true;
    }

    // 3. Shockwave & Frost Rings
    const rCount = Math.min(particles.length, MAX_RINGS);
    for (let i = 0; i < MAX_RINGS; i++) {
      const slot = this.ringPool[i];
      if (i >= rCount) {
        slot.mesh.visible = false;
        continue;
      }
      const p = particles[i];
      const a = Math.max(0, Math.min(1, p.life / 0.25));
      const rad = Math.max(0.08, p.maxR * (1.06 - a * 0.48));
      slot.mesh.position.set(bx(p.x), 0.11, bz(p.y));
      slot.mesh.scale.set(rad, rad, 1);
      slot.mat.color.set(p.color);
      slot.mat.opacity = a * 0.85;
      slot.mesh.visible = true;
    }

    // 4. Instanced Sparks
    const sCount = Math.min(sparks.length, MAX_SPARKS);
    this.sparkMesh.count = sCount;
    for (let i = 0; i < sCount; i++) {
      const s = sparks[i];
      const a = Math.max(0.05, Math.min(1, s.life / s.maxLife));
      const sc = (s.size || 2.5) * 0.042 * a;
      const wy = 0.22 + (1 - a) * 0.35;
      this.tmpVecA.set(bx(s.x), wy, bz(s.y));
      this.tmpEuler.set(i * 0.7 + a * 4, i * 1.1, a * 3);
      this.tmpQuat.setFromEuler(this.tmpEuler);
      this.tmpVecB.set(sc, sc, sc);
      this.tmpMat4.compose(this.tmpVecA, this.tmpQuat, this.tmpVecB);
      this.sparkMesh.setMatrixAt(i, this.tmpMat4);
      this.tmpColor.set(s.color);
      this.sparkMesh.setColorAt(i, this.tmpColor);
    }
    this.sparkMesh.instanceMatrix.needsUpdate = true;
    if (this.sparkMesh.instanceColor) this.sparkMesh.instanceColor.needsUpdate = true;

    // 5. Floating Texts
    for (let i = 0; i < MAX_FLOATS; i++) {
      const slot = this.floatPool[i];
      if (slot.owner && !floatTexts.includes(slot.owner)) {
        slot.owner = null;
        slot.sprite.visible = false;
      }
    }

    for (let i = 0; i < floatTexts.length; i++) {
      const ft = floatTexts[i];
      let slot = this.floatAssigned.get(ft);
      if (!slot) {
        slot = this.floatPool.find(s => !s.owner);
        if (!slot) continue;
        slot.owner = ft;
        this.floatAssigned.set(ft, slot);
        this.drawFloatCanvas(slot, ft);
      }
      const a = Math.max(0, Math.min(1, (ft.life / ft.maxLife) * 1.4));
      const lift = (1 - ft.life / ft.maxLife) * 0.65;
      slot.sprite.position.set(bx(ft.x), 0.78 + lift, bz(ft.y));
      const sc = 1.65 * (ft.scale || 1);
      slot.sprite.scale.set(sc, sc * 0.25, 1);
      slot.mat.opacity = a;
      slot.sprite.visible = true;
    }
  }

  drawFloatCanvas(slot, ft) {
    const { ctx, canvas, tex } = slot;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '800 28px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(7, 13, 27, 0.92)';
    ctx.strokeText(ft.text, canvas.width * 0.5, canvas.height * 0.5);
    ctx.fillStyle = ft.color || '#ffffff';
    ctx.fillText(ft.text, canvas.width * 0.5, canvas.height * 0.5);
    tex.needsUpdate = true;
  }

  clear() {
    for (const s of this.projPool) s.grp.visible = false;
    for (const s of this.beamPool) s.grp.visible = false;
    for (const s of this.ringPool) s.mesh.visible = false;
    for (const s of this.floatPool) {
      s.owner = null;
      s.sprite.visible = false;
    }
    this.sparkMesh.count = 0;
  }
}
