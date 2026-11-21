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
  const size = 512;
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
      // Seamless periodic wind-carved sand ripples across track
      const ripple =
        Math.sin(ny * 10 + Math.sin(nx * 2) * 1.15) * 0.52 +
        Math.sin(ny * 20 - Math.cos(nx * 3) * 0.6) * 0.24 +
        Math.sin(nx * 4 + ny * 6) * 0.14;
      const grain = (hash2d(x, y, 1) - 0.5) * 0.34;
      const h = Math.max(0, Math.min(1, 0.5 + ripple * 0.28 + grain * 0.25));

      const idx = (y * size + x) * 4;
      // Warm golden desert sand palette
      ad[idx] = Math.min(255, Math.round(196 + h * 46));
      ad[idx + 1] = Math.min(255, Math.round(142 + h * 40));
      ad[idx + 2] = Math.min(255, Math.round(84 + h * 30));
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

  // Subtle darker tire/skimmer track streaks down the center
  const trackGrad = aCtx.createLinearGradient(0, 0, size, 0);
  trackGrad.addColorStop(0, 'rgba(130, 82, 42, 0.16)');
  trackGrad.addColorStop(0.22, 'rgba(255, 224, 178, 0.04)');
  trackGrad.addColorStop(0.5, 'rgba(160, 108, 58, 0.08)');
  trackGrad.addColorStop(0.78, 'rgba(255, 224, 178, 0.04)');
  trackGrad.addColorStop(1, 'rgba(130, 82, 42, 0.16)');
  aCtx.fillStyle = trackGrad;
  aCtx.fillRect(0, 0, size, size);

  const sandAlbedo = new THREE.CanvasTexture(albedoC);
  sandAlbedo.wrapS = THREE.RepeatWrapping;
  sandAlbedo.wrapT = THREE.RepeatWrapping;
  sandAlbedo.colorSpace = THREE.SRGBColorSpace;
  sandAlbedo.anisotropy = 8;

  const sandBump = new THREE.CanvasTexture(bumpC);
  sandBump.wrapS = THREE.RepeatWrapping;
  sandBump.wrapT = THREE.RepeatWrapping;
  sandBump.anisotropy = 4;

  return { sandAlbedo, sandBump };
}

function buildRockTextures() {
  const size = 512;
  const albedoC = createCanvas(size, size);
  const bumpC = createCanvas(size, size);
  const aCtx = albedoC.getContext('2d');
  const bCtx = bumpC.getContext('2d');

  // Stratified sedimentary canyon bands
  const strataColors = [
    [168, 76, 44],
    [194, 106, 62],
    [142, 62, 38],
    [212, 138, 86],
    [156, 74, 46],
    [122, 52, 34],
    [186, 98, 56]
  ];

  const aImg = aCtx.createImageData(size, size);
  const bImg = bCtx.createImageData(size, size);
  const ad = aImg.data;
  const bd = bImg.data;

  for (let y = 0; y < size; y++) {
    const ny = (y / size) * Math.PI * 2;
    for (let x = 0; x < size; x++) {
      const nx = (x / size) * Math.PI * 2;
      // Wavy geological strata height
      const warp = Math.sin(nx * 2) * 0.05 + Math.sin(nx * 5 + 1.3) * 0.02;
      const sy = ((y / size) + warp + 1) % 1;
      const bandPos = sy * strataColors.length;
      const bi = Math.floor(bandPos) % strataColors.length;
      const bn = (bi + 1) % strataColors.length;
      const bf = bandPos - Math.floor(bandPos);
      const smooth = bf * bf * (3 - 2 * bf);

      const c0 = strataColors[bi];
      const c1 = strataColors[bn];

      const crack = Math.pow(Math.abs(Math.sin(nx * 6 + Math.sin(ny * 4) * 0.7)), 14);
      const pit = (hash2d(x, y, 9) - 0.5) * 24;
      const ridge = Math.sin(ny * 18 + Math.sin(nx * 4)) * 0.5 + 0.5;

      const idx = (y * size + x) * 4;
      const shade = 1 - crack * 0.34;
      ad[idx] = Math.max(0, Math.min(255, Math.round((c0[0] + (c1[0] - c0[0]) * smooth) * shade + pit)));
      ad[idx + 1] = Math.max(0, Math.min(255, Math.round((c0[1] + (c1[1] - c0[1]) * smooth) * shade + pit * 0.7)));
      ad[idx + 2] = Math.max(0, Math.min(255, Math.round((c0[2] + (c1[2] - c0[2]) * smooth) * shade + pit * 0.5)));
      ad[idx + 3] = 255;

      const bumpVal = Math.max(0, Math.min(255, Math.round((0.45 + ridge * 0.32 - crack * 0.42) * 255 + pit * 1.4)));
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
  rockAlbedo.anisotropy = 8;

  const rockBump = new THREE.CanvasTexture(bumpC);
  rockBump.wrapS = THREE.RepeatWrapping;
  rockBump.wrapT = THREE.RepeatWrapping;
  rockBump.anisotropy = 4;

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
