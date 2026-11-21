// Procedural & Cached PBR Canvas Textures for Canyon Podracer 3D
// Generates desert sand, stratified canyon rock, brushed metal & boost-pad chevron maps once.

import * as THREE from 'three';

let cachedTextures = null;

function createCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

// Deterministic pseudo-random helper for crisp repeatable textures
function hash2d(x, y, seed) {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123;
  return n - Math.floor(n);
}

function buildSandTextures() {
  const size = 1024;
  const albedoC = createCanvas(size, size);
  const bumpC = createCanvas(size, size);
  const aCtx = albedoC.getContext('2d');
  const bCtx = bumpC.getContext('2d');

  const aImg = aCtx.createImageData(size, size);
  const bImg = bCtx.createImageData(size, size);
  const ad = aImg.data;
  const bd = bImg.data;

  for (let y = 0; y < size; y++) {
    const ny = (y / size) * Math.PI * 2;
    for (let x = 0; x < size; x++) {
      const nx = (x / size) * Math.PI * 2;
      // Asymmetric wind-carved sand ripples with crisp crests
      const phase = ny * 14 + Math.sin(nx * 2) * 1.2 + Math.cos(nx * 4 + ny * 2) * 0.35;
      const wave1 = Math.sin(phase);
      const crest = Math.pow(Math.max(0, wave1), 2.2) * 0.65 - Math.max(0, -wave1) * 0.35;
      const micro = Math.sin(ny * 36 - Math.cos(nx * 5) * 0.9) * 0.16;

      // Coarse multi-pixel gravel & pebble flecks so mipmaps stay crisp
      const gx = Math.floor(x / 3);
      const gy = Math.floor(y / 3);
      const pebble = hash2d(gx, gy, 3) > 0.965 ? -0.28 : (hash2d(gx, gy, 7) > 0.97 ? 0.22 : 0);
      const grain = (hash2d(x, y, 1) - 0.5) * 0.22;

      const h = Math.max(0, Math.min(1, 0.52 + crest * 0.32 + micro + pebble + grain));

      const idx = (y * size + x) * 4;
      ad[idx] = Math.min(255, Math.round(184 + h * 62));
      ad[idx + 1] = Math.min(255, Math.round(128 + h * 54));
      ad[idx + 2] = Math.min(255, Math.round(72 + h * 40));
      ad[idx + 3] = 255;

      const bv = Math.round(h * 255);
      bd[idx] = bv;
      bd[idx + 1] = bv;
      bd[idx + 2] = bv;
      bd[idx + 3] = 255;
    }
  }

  aCtx.putImageData(aImg, 0, 0);
  bCtx.putImageData(bImg, 0, 0);

  // Subtle darker skimmer track ruts & canyon edge shading
  const trackGrad = aCtx.createLinearGradient(0, 0, size, 0);
  trackGrad.addColorStop(0, 'rgba(110, 64, 30, 0.24)');
  trackGrad.addColorStop(0.18, 'rgba(255, 224, 178, 0.05)');
  trackGrad.addColorStop(0.36, 'rgba(120, 74, 36, 0.14)');
  trackGrad.addColorStop(0.5, 'rgba(255, 228, 185, 0.06)');
  trackGrad.addColorStop(0.64, 'rgba(120, 74, 36, 0.14)');
  trackGrad.addColorStop(0.82, 'rgba(255, 224, 178, 0.05)');
  trackGrad.addColorStop(1, 'rgba(110, 64, 30, 0.24)');
  aCtx.fillStyle = trackGrad;
  aCtx.fillRect(0, 0, size, size);

  const sandAlbedo = new THREE.CanvasTexture(albedoC);
  sandAlbedo.wrapS = THREE.RepeatWrapping;
  sandAlbedo.wrapT = THREE.RepeatWrapping;
  sandAlbedo.colorSpace = THREE.SRGBColorSpace;
  sandAlbedo.anisotropy = 16;

  const sandBump = new THREE.CanvasTexture(bumpC);
  sandBump.wrapS = THREE.RepeatWrapping;
  sandBump.wrapT = THREE.RepeatWrapping;
  sandBump.anisotropy = 16;

  return { sandAlbedo, sandBump };
}

function buildRockTextures() {
  const size = 1024;
  const albedoC = createCanvas(size, size);
  const bumpC = createCanvas(size, size);
  const aCtx = albedoC.getContext('2d');
  const bCtx = bumpC.getContext('2d');

  // Crisp stratified sedimentary canyon bands
  const strataColors = [
    [164, 72, 40],
    [206, 118, 68],
    [130, 52, 32],
    [224, 152, 96],
    [148, 66, 40],
    [108, 42, 26],
    [192, 102, 58],
    [172, 84, 48],
    [214, 138, 82],
    [122, 48, 30]
  ];

  const aImg = aCtx.createImageData(size, size);
  const bImg = bCtx.createImageData(size, size);
  const ad = aImg.data;
  const bd = bImg.data;

  for (let y = 0; y < size; y++) {
    const ny = (y / size) * Math.PI * 2;
    for (let x = 0; x < size; x++) {
      const nx = (x / size) * Math.PI * 2;
      // Wavy geological strata with sharp bedding seams
      const warp = Math.sin(nx * 2) * 0.035 + Math.sin(nx * 6 + 1.3) * 0.014;
      const sy = ((y / size) + warp + 1) % 1;
      const bandPos = sy * strataColors.length;
      const bi = Math.floor(bandPos) % strataColors.length;
      const bn = (bi + 1) % strataColors.length;
      const bf = bandPos - Math.floor(bandPos);
      // Sharper step transition between strata layers
      const sharp = Math.pow(bf, 1.8);
      const seam = bf < 0.08 ? (1 - bf / 0.08) * 0.42 : 0;

      const c0 = strataColors[bi];
      const c1 = strataColors[bn];

      // Vertical erosion fissures & chiseled rock facets
      const crackA = Math.pow(Math.abs(Math.sin(nx * 8 + Math.sin(ny * 5) * 0.85)), 18);
      const crackB = Math.pow(Math.abs(Math.sin(nx * 19 - Math.cos(ny * 9) * 0.5)), 24) * 0.6;
      const crack = Math.min(1, crackA + crackB);

      const blockNoise = (hash2d(Math.floor(x / 4), Math.floor(y / 2), 11) - 0.5) * 26;
      const pit = (hash2d(x, y, 9) - 0.5) * 18 + blockNoise;
      const ridge = Math.sin(ny * 26 + Math.sin(nx * 5)) * 0.5 + 0.5;

      const idx = (y * size + x) * 4;
      const shade = 1 - crack * 0.45 - seam;
      ad[idx] = Math.max(0, Math.min(255, Math.round((c0[0] + (c1[0] - c0[0]) * sharp) * shade + pit)));
      ad[idx + 1] = Math.max(0, Math.min(255, Math.round((c0[1] + (c1[1] - c0[1]) * sharp) * shade + pit * 0.72)));
      ad[idx + 2] = Math.max(0, Math.min(255, Math.round((c0[2] + (c1[2] - c0[2]) * sharp) * shade + pit * 0.52)));
      ad[idx + 3] = 255;

      const bumpVal = Math.max(0, Math.min(255, Math.round((0.5 + ridge * 0.34 - crack * 0.48 - seam * 0.6) * 255 + pit * 1.5)));
      bd[idx] = bumpVal;
      bd[idx + 1] = bumpVal;
      bd[idx + 2] = bumpVal;
      bd[idx + 3] = 255;
    }
  }

  aCtx.putImageData(aImg, 0, 0);
  bCtx.putImageData(bImg, 0, 0);

  const rockAlbedo = new THREE.CanvasTexture(albedoC);
  rockAlbedo.wrapS = THREE.RepeatWrapping;
  rockAlbedo.wrapT = THREE.RepeatWrapping;
  rockAlbedo.colorSpace = THREE.SRGBColorSpace;
  rockAlbedo.anisotropy = 16;

  const rockBump = new THREE.CanvasTexture(bumpC);
  rockBump.wrapS = THREE.RepeatWrapping;
  rockBump.wrapT = THREE.RepeatWrapping;
  rockBump.anisotropy = 16;

  return { rockAlbedo, rockBump };
}

function buildMetalTextures() {
  const size = 256;
  const albedoC = createCanvas(size, size);
  const roughC = createCanvas(size, size);
  const aCtx = albedoC.getContext('2d');
  const rCtx = roughC.getContext('2d');

  // Brushed titanium base
  aCtx.fillStyle = '#bcc5d1';
  aCtx.fillRect(0, 0, size, size);
  rCtx.fillStyle = '#5e5e5e';
  rCtx.fillRect(0, 0, size, size);

  // Fine anisotropic horizontal brush streaks
  for (let y = 0; y < size; y++) {
    const v = Math.round(170 + (hash2d(0, y, 17) - 0.5) * 44);
    aCtx.fillStyle = `rgba(${v}, ${v + 4}, ${v + 10}, 0.35)`;
    aCtx.fillRect(0, y, size, 1);

    const rv = Math.round(72 + hash2d(1, y, 23) * 48);
    rCtx.fillStyle = `rgb(${rv},${rv},${rv})`;
    rCtx.fillRect(0, y, size, 1);
  }

  // Aerospace panel seams & rivets
  aCtx.strokeStyle = 'rgba(30, 41, 59, 0.45)';
  aCtx.lineWidth = 2;
  aCtx.strokeRect(4, 4, size - 8, size * 0.5 - 6);
  aCtx.strokeRect(4, size * 0.5 + 2, size - 8, size * 0.5 - 6);

  aCtx.fillStyle = 'rgba(248, 250, 252, 0.65)';
  for (let x = 16; x < size - 12; x += 28) {
    aCtx.fillRect(x, 10, 3, 3);
    aCtx.fillRect(x, size * 0.5 - 10, 3, 3);
    aCtx.fillRect(x, size * 0.5 + 8, 3, 3);
    aCtx.fillRect(x, size - 12, 3, 3);
  }

  const metalAlbedo = new THREE.CanvasTexture(albedoC);
  metalAlbedo.wrapS = THREE.RepeatWrapping;
  metalAlbedo.wrapT = THREE.RepeatWrapping;
  metalAlbedo.colorSpace = THREE.SRGBColorSpace;
  metalAlbedo.anisotropy = 4;

  const metalRoughness = new THREE.CanvasTexture(roughC);
  metalRoughness.wrapS = THREE.RepeatWrapping;
  metalRoughness.wrapT = THREE.RepeatWrapping;

  return { metalAlbedo, metalRoughness };
}

function buildBoostPadTexture() {
  const w = 256;
  const h = 512;
  const c = createCanvas(w, h);
  const ctx = c.getContext('2d');

  // Dark metallic pad frame
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  // Side warning rails
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(8, 12, 12, h - 24);
  ctx.fillRect(w - 20, 12, 12, h - 24);

  // Glowing cyan energy chevrons pointing forward (-Y in canvas UV = forward)
  for (let i = 0; i < 4; i++) {
    const cy = 96 + i * 105;
    const grad = ctx.createLinearGradient(0, cy - 42, 0, cy + 42);
    grad.addColorStop(0, '#e0f2fe');
    grad.addColorStop(0.5, '#38bdf8');
    grad.addColorStop(1, '#0284c7');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(w * 0.5, cy - 44);
    ctx.lineTo(w - 36, cy + 16);
    ctx.lineTo(w - 36, cy + 46);
    ctx.lineTo(w * 0.5, cy - 12);
    ctx.lineTo(36, cy + 46);
    ctx.lineTo(36, cy + 16);
    ctx.closePath();
    ctx.fill();
  }

  const boostPadTex = new THREE.CanvasTexture(c);
  boostPadTex.colorSpace = THREE.SRGBColorSpace;
  boostPadTex.anisotropy = 4;
  return boostPadTex;
}

export function getPodTextures() {
  if (cachedTextures) return cachedTextures;
  const { sandAlbedo, sandBump } = buildSandTextures();
  const { rockAlbedo, rockBump } = buildRockTextures();
  const { metalAlbedo, metalRoughness } = buildMetalTextures();
  const boostPadTex = buildBoostPadTexture();

  cachedTextures = {
    sandAlbedo,
    sandBump,
    rockAlbedo,
    rockBump,
    metalAlbedo,
    metalRoughness,
    boostPadTex
  };
  return cachedTextures;
}
