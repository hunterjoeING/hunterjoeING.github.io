// Procedural Cached CanvasTextures for Zombie Horde: Gate Runner 3D
// Generated once at startup and reused across shared PBR materials.

import * as THREE from 'three';

let cache = null;

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function addNoise(ctx, w, h, alpha = 0.04, step = 3) {
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const v = 60 + Math.floor(Math.random() * 140);
      ctx.fillStyle = `rgba(${v},${v},${v},${alpha})`;
      ctx.fillRect(x, y, step, step);
    }
  }
}

function makeAsphaltTexture() {
  const w = 1024, h = 1024;
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');

  // Rich weathered tarmac base
  ctx.fillStyle = '#202736';
  ctx.fillRect(0, 0, w, h);

  // Tarmac aggregate speckle (crisp multi-scale stone grain)
  for (let i = 0; i < 16000; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const sz = 1 + Math.random() * 2.5;
    const v = 24 + Math.floor(Math.random() * 58);
    ctx.fillStyle = `rgba(${v},${v + 4},${v + 12},0.35)`;
    ctx.fillRect(x, y, sz, sz);
  }

  // Worn tire tracks on left & right lanes
  const drawTrack = (cx) => {
    const g = ctx.createLinearGradient(cx - 90, 0, cx + 90, 0);
    g.addColorStop(0, 'rgba(8, 12, 22, 0)');
    g.addColorStop(0.5, 'rgba(6, 10, 18, 0.44)');
    g.addColorStop(1, 'rgba(8, 12, 22, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(cx - 90, 0, 180, h);
  };
  drawTrack(w * 0.27);
  drawTrack(w * 0.73);

  // Subtle weathered asphalt cracks
  ctx.strokeStyle = 'rgba(8, 11, 18, 0.55)';
  ctx.lineWidth = 2;
  for (let k = 0; k < 6; k++) {
    let cx = 100 + Math.random() * (w - 200);
    let cy = Math.random() * h;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    for (let s = 0; s < 5; s++) {
      cx += (Math.random() - 0.5) * 48;
      cy += 24 + Math.random() * 34;
      ctx.lineTo(cx, cy);
    }
    ctx.stroke();
  }

  // Crisp edge shoulder lines
  ctx.fillStyle = 'rgba(226, 232, 240, 0.52)';
  ctx.fillRect(18, 0, 10, h);
  ctx.fillRect(w - 28, 0, 10, h);

  // Double-amber dashed center divider (high contrast)
  ctx.fillStyle = 'rgba(250, 204, 21, 0.78)';
  for (let y = 24; y < h; y += 256) {
    ctx.fillRect(w * 0.5 - 14, y, 10, 136);
    ctx.fillRect(w * 0.5 + 4, y, 10, 136);
  }

  // Steel expansion joint seams
  ctx.fillStyle = 'rgba(148, 163, 184, 0.28)';
  ctx.fillRect(0, 0, w, 6);
  ctx.fillRect(0, h * 0.5, w, 6);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 5);
  tex.anisotropy = 16;
  return tex;
}

function makeAsphaltBump() {
  const w = 512, h = 512;
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, w, h);
  addNoise(ctx, w, h, 0.22, 2);
  ctx.fillStyle = '#383838';
  ctx.fillRect(0, 0, w, 5);
  ctx.fillRect(0, h * 0.5, w, 5);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 5);
  tex.anisotropy = 16;
  return tex;
}

function makeCatwalkTexture() {
  const s = 512;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#273549';
  ctx.fillRect(0, 0, s, s);
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.32)';
  ctx.lineWidth = 3;
  for (let y = 0; y < s; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(s, y);
    ctx.stroke();
  }
  // Diamond-plate tread bumps & rivets
  ctx.fillStyle = 'rgba(203, 213, 225, 0.20)';
  for (let y = 12; y < s; y += 24) {
    for (let x = 12; x < s; x += 24) {
      ctx.fillRect(x, y, 8, 3);
      ctx.fillRect(x + 12, y + 12, 3, 8);
    }
  }
  ctx.fillStyle = 'rgba(245, 158, 11, 0.55)';
  ctx.fillRect(0, 0, 14, s);
  addNoise(ctx, s, s, 0.05, 4);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 14);
  tex.anisotropy = 16;
  return tex;
}

function makeCurbTexture() {
  const w = 64, h = 256;
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#f59e0b' : '#1e293b';
    ctx.fillRect(0, i * 64, w, 64);
  }
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.fillRect(0, 0, 8, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 12);
  tex.anisotropy = 8;
  return tex;
}

function makeBrushedMetalTexture() {
  const s = 512;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, 0, s, s);
  for (let y = 0; y < s; y += 2) {
    const lum = 180 + Math.floor(Math.random() * 52);
    ctx.fillStyle = `rgba(${lum},${lum + 4},${lum + 10},0.42)`;
    ctx.fillRect(0, y, s, 1);
  }
  // Tactical armor panel seams & rivets
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.35)';
  ctx.lineWidth = 3;
  ctx.strokeRect(8, 8, s - 16, s * 0.5 - 12);
  ctx.strokeRect(8, s * 0.5 + 4, s - 16, s * 0.5 - 12);
  ctx.fillStyle = 'rgba(248, 250, 252, 0.72)';
  for (let x = 24; x < s - 16; x += 48) {
    ctx.fillRect(x, 16, 5, 5);
    ctx.fillRect(x, s * 0.5 - 18, 5, 5);
    ctx.fillRect(x, s * 0.5 + 14, 5, 5);
    ctx.fillRect(x, s - 20, 5, 5);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 16;
  return tex;
}

function makeBarrelTexture() {
  const w = 512, h = 256;
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#c2410c');
  g.addColorStop(0.5, '#ea580c');
  g.addColorStop(1, '#7c2d12');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // Yellow & black hazard stripe band
  ctx.fillStyle = '#facc15';
  ctx.fillRect(0, 44, w, 34);
  ctx.fillStyle = '#0f172a';
  for (let x = -32; x < w + 32; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 44);
    ctx.lineTo(x + 20, 44);
    ctx.lineTo(x + 6, 78);
    ctx.lineTo(x - 14, 78);
    ctx.closePath();
    ctx.fill();
  }

  // Steel reinforcing ribs
  ctx.fillStyle = '#334155';
  ctx.fillRect(0, 92, w, 12);
  ctx.fillRect(0, 184, w, 12);

  // TNT stencil repeated around drum
  ctx.font = '900 54px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let x = 128; x <= 384; x += 256) {
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#450a0a';
    ctx.strokeText('TNT', x, 140);
    ctx.fillStyle = '#fef08a';
    ctx.fillText('TNT', x, 140);
  }

  addNoise(ctx, w, h, 0.05, 4);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function makeWaterTexture() {
  const s = 256;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#1e3a5f';
  ctx.fillRect(0, 0, s, s);
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * s;
    const y = Math.random() * s;
    const rw = 16 + Math.random() * 44;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(125, 211, 252, 0.16)' : 'rgba(15, 23, 42, 0.24)';
    ctx.fillRect(x, y, rw, 3);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(10, 12);
  return tex;
}

function makeGateCurtainTexture() {
  const s = 256;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  ctx.fillRect(0, 0, s, s);
  ctx.strokeStyle = 'rgba(255,255,255,0.65)';
  ctx.lineWidth = 5;
  for (let y = -s; y < s * 2; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(s, y - 64);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

function makeGlowSprite() {
  const s = 128;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(s / 2, s / 2, 2, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.28, 'rgba(255,255,255,0.72)');
  g.addColorStop(0.65, 'rgba(255,255,255,0.16)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeZombieSkinTexture() {
  const s = 256;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#d4d4d8';
  ctx.fillRect(0, 0, s, s);
  for (let i = 0; i < 42; i++) {
    const x = Math.random() * s;
    const y = Math.random() * s;
    const r = 10 + Math.random() * 28;
    const g = ctx.createRadialGradient(x, y, 2, x, y, r);
    g.addColorStop(0, i % 3 === 0 ? 'rgba(60, 20, 30, 0.28)' : 'rgba(40, 65, 35, 0.24)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  ctx.strokeStyle = 'rgba(45, 18, 28, 0.26)';
  ctx.lineWidth = 1.5;
  for (let k = 0; k < 12; k++) {
    let vx = Math.random() * s;
    let vy = Math.random() * s;
    ctx.beginPath();
    ctx.moveTo(vx, vy);
    for (let j = 0; j < 4; j++) {
      vx += (Math.random() - 0.5) * 32;
      vy += (Math.random() - 0.5) * 32;
      ctx.lineTo(vx, vy);
    }
    ctx.stroke();
  }
  addNoise(ctx, s, s, 0.08, 3);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function makeZombieClothTexture() {
  const s = 256;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#b4bcc8';
  ctx.fillRect(0, 0, s, s);
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.16)';
  ctx.lineWidth = 1;
  for (let i = 0; i < s; i += 6) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(s, i);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, s);
    ctx.stroke();
  }
  for (let k = 0; k < 18; k++) {
    ctx.fillStyle = k % 2 === 0 ? 'rgba(30, 10, 15, 0.28)' : 'rgba(15, 23, 42, 0.32)';
    ctx.fillRect(Math.random() * s, Math.random() * s, 14 + Math.random() * 28, 4 + Math.random() * 14);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export function getZBTextures() {
  if (cache) return cache;
  cache = {
    asphaltAlbedo: makeAsphaltTexture(),
    asphaltBump: makeAsphaltBump(),
    catwalkAlbedo: makeCatwalkTexture(),
    curbAlbedo: makeCurbTexture(),
    metalAlbedo: makeBrushedMetalTexture(),
    barrelAlbedo: makeBarrelTexture(),
    waterAlbedo: makeWaterTexture(),
    gateCurtain: makeGateCurtainTexture(),
    glowSprite: makeGlowSprite(),
    zombieSkin: makeZombieSkinTexture(),
    zombieCloth: makeZombieClothTexture()
  };
  return cache;
}
