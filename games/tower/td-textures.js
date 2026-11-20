// Procedural Canvas Textures for Bastion 3D Tower Defense
// All textures are generated once at startup and cached for 60 FPS performance.

import * as THREE from 'three';

let cache = null;

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function addMicroNoise(ctx, w, h, alpha = 0.04, step = 2) {
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const v = Math.floor(Math.random() * 255);
      ctx.fillStyle = `rgba(${v},${v},${v},${alpha})`;
      ctx.fillRect(x, y, step, step);
    }
  }
}

function makeTileTexture(baseHex, innerHex, borderHex, boltHex) {
  const s = 256;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');

  ctx.fillStyle = borderHex;
  ctx.fillRect(0, 0, s, s);

  const grad = ctx.createLinearGradient(0, 0, s, s);
  grad.addColorStop(0, baseHex);
  grad.addColorStop(1, innerHex);
  ctx.fillStyle = grad;
  ctx.fillRect(10, 10, s - 20, s - 20);

  // Subtle chamfer highlight
  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 3;
  ctx.strokeRect(12, 12, s - 24, s - 24);

  // Inner technical recess
  ctx.strokeStyle = 'rgba(15,23,42,0.18)';
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 32, s - 64, s - 64);

  // Corner anchor bolts
  const bolts = [
    [22, 22], [s - 22, 22], [22, s - 22], [s - 22, s - 22]
  ];
  ctx.fillStyle = boltHex;
  for (const [bx, by] of bolts) {
    ctx.beginPath();
    ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
    ctx.fill();
  }

  addMicroNoise(ctx, s, s, 0.035, 4);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function makeTileBumpTexture() {
  const s = 256;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#909090';
  ctx.fillRect(0, 0, s, s);

  // Raised center deck
  ctx.fillStyle = '#dcdcdc';
  ctx.fillRect(12, 12, s - 24, s - 24);

  // Subtle recessed inner groove
  ctx.strokeStyle = '#686868';
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 32, s - 64, s - 64);

  addMicroNoise(ctx, s, s, 0.06, 4);

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}

function makePathTexture() {
  const s = 256;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#334155';
  ctx.fillRect(0, 0, s, s);

  // Stone/slate paver slabs
  const rows = 4;
  const cols = 4;
  const rw = s / cols;
  const rh = s / rows;
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const shade = 52 + ((r * 7 + col * 13) % 16);
      ctx.fillStyle = `rgb(${shade}, ${shade + 10}, ${shade + 24})`;
      ctx.fillRect(col * rw + 3, r * rh + 3, rw - 6, rh - 6);
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(col * rw + 4, r * rh + 4, rw - 8, rh - 8);
    }
  }

  addMicroNoise(ctx, s, s, 0.045, 4);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

function makePathBumpTexture() {
  const s = 256;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#686868';
  ctx.fillRect(0, 0, s, s);

  const rows = 4;
  const cols = 4;
  const rw = s / cols;
  const rh = s / rows;
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const val = 175 + ((r * 11 + col * 5) % 35);
      ctx.fillStyle = `rgb(${val},${val},${val})`;
      ctx.fillRect(col * rw + 4, r * rh + 4, rw - 8, rh - 8);
    }
  }

  addMicroNoise(ctx, s, s, 0.08, 4);

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

function makeBrushedMetalTexture() {
  const s = 256;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#c8d1de';
  ctx.fillRect(0, 0, s, s);

  // Horizontal brushed grain lines
  for (let y = 0; y < s; y += 2) {
    const lum = 185 + Math.floor(Math.random() * 44);
    ctx.fillStyle = `rgba(${lum},${lum + 4},${lum + 10},0.42)`;
    ctx.fillRect(0, y, s, 1);
  }

  // Subtle panel seam
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.22)';
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, s - 8, s - 8);
  ctx.beginPath();
  ctx.moveTo(0, s * 0.5);
  ctx.lineTo(s, s * 0.5);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

function makeGroundTexture() {
  const s = 512;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#dde5f0';
  ctx.fillRect(0, 0, s, s);

  // Editorial architectural grid
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.06)';
  ctx.lineWidth = 2;
  const step = 64;
  for (let i = 0; i <= s; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(s, i);
    ctx.stroke();
  }

  addMicroNoise(ctx, s, s, 0.025, 4);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  tex.anisotropy = 4;
  return tex;
}

function makeGlowSpriteTexture() {
  const s = 128;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(s / 2, s / 2, 2, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.28, 'rgba(255,255,255,0.72)');
  g.addColorStop(0.65, 'rgba(255,255,255,0.18)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function getTDTextures() {
  if (cache) return cache;
  cache = {
    tileLightEven: makeTileTexture('#ffffff', '#edf2f8', '#cbd5e1', '#64748b'),
    tileLightOdd: makeTileTexture('#f1f5fa', '#e2e8f0', '#cbd5e1', '#64748b'),
    tileDarkEven: makeTileTexture('#1a2847', '#131f39', '#0f172a', '#38bdf8'),
    tileDarkOdd: makeTileTexture('#14203b', '#0f182e', '#091020', '#38bdf8'),
    tileBump: makeTileBumpTexture(),
    pathAlbedo: makePathTexture(),
    pathBump: makePathBumpTexture(),
    metalAlbedo: makeBrushedMetalTexture(),
    groundAlbedo: makeGroundTexture(),
    glowSprite: makeGlowSpriteTexture()
  };
  return cache;
}
