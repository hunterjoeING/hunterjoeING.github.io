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
  const w = 512, h = 512;
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');

  // Base weathered asphalt
  ctx.fillStyle = '#252d3d';
  ctx.fillRect(0, 0, w, h);

  // Subtle worn tire tracks at left & right lanes
  const drawTrack = (cx) => {
    const g = ctx.createLinearGradient(cx - 48, 0, cx + 48, 0);
    g.addColorStop(0, 'rgba(8, 12, 22, 0)');
    g.addColorStop(0.5, 'rgba(8, 12, 22, 0.36)');
    g.addColorStop(1, 'rgba(8, 12, 22, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(cx - 48, 0, 96, h);
  };
  drawTrack(w * 0.27);
  drawTrack(w * 0.73);

  // Edge shoulder lines
  ctx.fillStyle = 'rgba(148, 163, 184, 0.38)';
  ctx.fillRect(10, 0, 5, h);
  ctx.fillRect(w - 15, 0, 5, h);

  // Dashed center divider (repeats seamlessly)
  ctx.fillStyle = 'rgba(226, 232, 240, 0.68)';
  for (let y = 16; y < h; y += 128) {
    ctx.fillRect(w * 0.5 - 5, y, 10, 68);
  }

  // Steel expansion joint seams
  ctx.fillStyle = 'rgba(148, 163, 184, 0.22)';
  ctx.fillRect(0, 0, w, 4);
  ctx.fillRect(0, h * 0.5, w, 4);

  addNoise(ctx, w, h, 0.07, 3);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 5);
  tex.anisotropy = 4;
  return tex;
}

function makeAsphaltBump() {
  const w = 256, h = 256;
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, w, h);
  addNoise(ctx, w, h, 0.16, 2);
  ctx.fillStyle = '#484848';
  ctx.fillRect(0, 0, w, 3);
  ctx.fillRect(0, h * 0.5, w, 3);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 5);
  tex.anisotropy = 4;
  return tex;
}

function makeCatwalkTexture() {
  const s = 256;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#2d3b52';
  ctx.fillRect(0, 0, s, s);
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
  ctx.lineWidth = 2;
  for (let y = 0; y < s; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(s, y);
    ctx.stroke();
  }
  ctx.fillStyle = 'rgba(203, 213, 225, 0.14)';
  for (let y = 8; y < s; y += 16) {
    for (let x = 8; x < s; x += 16) {
      ctx.fillRect(x, y, 5, 2);
    }
  }
  addNoise(ctx, s, s, 0.04, 4);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 14);
  tex.anisotropy = 4;
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
  tex.anisotropy = 4;
  return tex;
}

function makeBrushedMetalTexture() {
  const s = 256;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, 0, s, s);
  for (let y = 0; y < s; y += 2) {
    const lum = 182 + Math.floor(Math.random() * 48);
    ctx.fillStyle = `rgba(${lum},${lum + 4},${lum + 10},0.45)`;
    ctx.fillRect(0, y, s, 1);
  }
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.24)';
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, s - 8, s - 8);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
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
    glowSprite: makeGlowSprite()
  };
  return cache;
}
