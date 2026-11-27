// Procedural High-Resolution PBR Texture & Material Generator (Offscreen Canvas)
// Zero external image dependencies — authentic alpine glass-steel & Doppelmayr D-Line materials!

import * as THREE from 'three';

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return { canvas: c, ctx: c.getContext('2d') };
}

function toTexture(canvas, { repeatX = 1, repeatY = 1, srgb = true, anisotropy = 8 } = {}) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.anisotropy = anisotropy;
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

// Seeded pseudo-random for crisp deterministic noise
function seededRand(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// 1. Braided 54 mm Steel Haul Rope (6x36 WS Helical Strands) — Albedo + Bump
function createSteelRopeTextures() {
  const w = 256;
  const h = 256;
  const { canvas: cAlb, ctx: ctxA } = makeCanvas(w, h);
  const { canvas: cBump, ctx: ctxB } = makeCanvas(w, h);

  // Base metallic steel grey
  ctxA.fillStyle = '#5a6675';
  ctxA.fillRect(0, 0, w, h);
  ctxB.fillStyle = '#404040';
  ctxB.fillRect(0, 0, w, h);

  // 6 helical strands diagonally wrapping across UV (seamless tiling!)
  const strands = 6;
  for (let k = -strands; k <= strands * 2; k++) {
    const x0 = (k / strands) * w;
    // Highlighted metallic ridge for each strand
    const gradA = ctxA.createLinearGradient(x0, 0, x0 + w / strands, 0);
    gradA.addColorStop(0.0, '#1e2530');
    gradA.addColorStop(0.22, '#64748b');
    gradA.addColorStop(0.48, '#cbd5e1');
    gradA.addColorStop(0.75, '#475569');
    gradA.addColorStop(1.0, '#1e2530');

    const gradB = ctxB.createLinearGradient(x0, 0, x0 + w / strands, 0);
    gradB.addColorStop(0.0, '#080808');
    gradB.addColorStop(0.5, '#f8f8f8');
    gradB.addColorStop(1.0, '#080808');

    ctxA.save();
    ctxA.strokeStyle = gradA;
    ctxA.lineWidth = (w / strands) * 0.88;
    ctxA.beginPath();
    ctxA.moveTo(x0, 0);
    ctxA.lineTo(x0 + w, h);
    ctxA.stroke();
    ctxA.restore();

    ctxB.save();
    ctxB.strokeStyle = gradB;
    ctxB.lineWidth = (w / strands) * 0.84;
    ctxB.beginPath();
    ctxB.moveTo(x0, 0);
    ctxB.lineTo(x0 + w, h);
    ctxB.stroke();
    ctxB.restore();
  }

  // Fine individual wire sub-grooves
  ctxA.strokeStyle = 'rgba(15,23,42,0.22)';
  ctxA.lineWidth = 1.5;
  for (let i = -24; i < 48; i++) {
    const x0 = i * 11;
    ctxA.beginPath();
    ctxA.moveTo(x0, 0);
    ctxA.lineTo(x0 + w, h);
    ctxA.stroke();
  }

  return {
    map: toTexture(cAlb, { repeatX: 280, repeatY: 1, srgb: true }),
    bumpMap: toTexture(cBump, { repeatX: 280, repeatY: 1, srgb: false })
  };
}

// 2. Architectural Exposed Concrete (Sichtbeton with formwork panels & tie holes)
function createConcreteTextures() {
  const w = 512;
  const h = 512;
  const { canvas: cAlb, ctx: ctxA } = makeCanvas(w, h);
  const { canvas: cBump, ctx: ctxB } = makeCanvas(w, h);
  const rand = seededRand(4011);

  ctxA.fillStyle = '#9aa3ad';
  ctxA.fillRect(0, 0, w, h);
  ctxB.fillStyle = '#808080';
  ctxB.fillRect(0, 0, w, h);

  // Subtle mineral grain & water streaks
  for (let i = 0; i < 4500; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = 1 + rand() * 3.5;
    const v = Math.floor(132 + (rand() - 0.5) * 46);
    ctxA.fillStyle = `rgba(${v},${v + 2},${v + 5},0.16)`;
    ctxA.fillRect(x, y, r, r);
    ctxB.fillStyle = `rgba(${v},${v},${v},0.22)`;
    ctxB.fillRect(x, y, r, r);
  }

  // Architectural formwork panel joints (2x2 grid)
  ctxA.strokeStyle = 'rgba(48,56,66,0.42)';
  ctxA.lineWidth = 3;
  ctxB.strokeStyle = '#1e1e1e';
  ctxB.lineWidth = 4;
  for (const pos of [0, 256]) {
    ctxA.beginPath(); ctxA.moveTo(pos, 0); ctxA.lineTo(pos, h); ctxA.stroke();
    ctxA.beginPath(); ctxA.moveTo(0, pos); ctxA.lineTo(w, pos); ctxA.stroke();
    ctxB.beginPath(); ctxB.moveTo(pos, 0); ctxB.lineTo(pos, h); ctxB.stroke();
    ctxB.beginPath(); ctxB.moveTo(0, pos); ctxB.lineTo(w, pos); ctxB.stroke();
  }

  // Tie-rod anchor holes
  const holes = [[64, 64], [192, 64], [64, 192], [192, 192], [320, 64], [448, 64], [320, 192], [448, 192],
                 [64, 320], [192, 320], [64, 448], [192, 448], [320, 320], [448, 320], [320, 448], [448, 448]];
  for (const [hx, hy] of holes) {
    ctxA.fillStyle = 'rgba(42,48,58,0.55)';
    ctxA.beginPath(); ctxA.arc(hx, hy, 5.5, 0, Math.PI * 2); ctxA.fill();
    ctxB.fillStyle = '#141414';
    ctxB.beginPath(); ctxB.arc(hx, hy, 6, 0, Math.PI * 2); ctxB.fill();
  }

  return {
    map: toTexture(cAlb, { repeatX: 4, repeatY: 3, srgb: true }),
    bumpMap: toTexture(cBump, { repeatX: 4, repeatY: 3, srgb: false })
  };
}

// 3. Yellow-Black Safety Hazard Stripe Texture (EG Boarding Edge)
function createHazardStripeTexture() {
  const w = 256;
  const h = 256;
  const { canvas, ctx } = makeCanvas(w, h);
  ctx.fillStyle = '#eab308';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#111827';
  const stripe = 36;
  for (let i = -w; i < w * 2; i += stripe * 2) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + stripe, 0);
    ctx.lineTo(i + stripe - h, h);
    ctx.lineTo(i - h, h);
    ctx.closePath();
    ctx.fill();
  }
  return toTexture(canvas, { repeatX: 12, repeatY: 1, srgb: true });
}

// 4. Perforated Safety Catwalk Metal Grating (OG Maintenance Walkways)
function createCatwalkGratingTextures() {
  const w = 256;
  const h = 256;
  const { canvas: cAlb, ctx: ctxA } = makeCanvas(w, h);
  const { canvas: cBump, ctx: ctxB } = makeCanvas(w, h);

  ctxA.fillStyle = '#334155';
  ctxA.fillRect(0, 0, w, h);
  ctxB.fillStyle = '#1a1a1a';
  ctxB.fillRect(0, 0, w, h);

  // Industrial diamond grid bars
  ctxA.strokeStyle = '#94a3b8';
  ctxA.lineWidth = 4;
  ctxB.strokeStyle = '#e5e5e5';
  ctxB.lineWidth = 4;
  const step = 24;
  for (let x = 0; x <= w; x += step) {
    ctxA.beginPath(); ctxA.moveTo(x, 0); ctxA.lineTo(x, h); ctxA.stroke();
    ctxB.beginPath(); ctxB.moveTo(x, 0); ctxB.lineTo(x, h); ctxB.stroke();
  }
  for (let y = 0; y <= h; y += step) {
    ctxA.beginPath(); ctxA.moveTo(0, y); ctxA.lineTo(w, y); ctxA.stroke();
    ctxB.beginPath(); ctxB.moveTo(0, y); ctxB.lineTo(w, y); ctxB.stroke();
  }
  return {
    map: toTexture(cAlb, { repeatX: 10, repeatY: 4, srgb: true }),
    bumpMap: toTexture(cBump, { repeatX: 10, repeatY: 4, srgb: false })
  };
}

// 5. Rubber Conveyor Tire Tread Texture
function createRubberTireTextures() {
  const w = 256;
  const h = 128;
  const { canvas: cAlb, ctx: ctxA } = makeCanvas(w, h);
  const { canvas: cBump, ctx: ctxB } = makeCanvas(w, h);

  ctxA.fillStyle = '#1a1d24';
  ctxA.fillRect(0, 0, w, h);
  ctxB.fillStyle = '#484848';
  ctxB.fillRect(0, 0, w, h);

  // Chevron tread lugs so tire rotation is unmistakably visible!
  ctxA.fillStyle = '#2d323e';
  ctxB.fillStyle = '#e0e0e0';
  for (let x = 0; x < w; x += 24) {
    ctxA.fillRect(x + 3, 8, 12, h - 16);
    ctxB.fillRect(x + 3, 8, 12, h - 16);
    // Subtle white wear indicator mark on one tread rib so rotation speed pops!
    if (x === 0 || x === 120) {
      ctxA.fillStyle = '#94a3b8';
      ctxA.fillRect(x + 5, 16, 6, h - 32);
      ctxA.fillStyle = '#2d323e';
    }
  }
  return {
    map: toTexture(cAlb, { repeatX: 2, repeatY: 1, srgb: true }),
    bumpMap: toTexture(cBump, { repeatX: 2, repeatY: 1, srgb: false })
  };
}

// 6. Copper Stator Windings Texture (for DirectDrive X-Ray)
function createCopperWindingTextures() {
  const w = 256;
  const h = 256;
  const { canvas: cAlb, ctx: ctxA } = makeCanvas(w, h);
  const { canvas: cBump, ctx: ctxB } = makeCanvas(w, h);

  ctxA.fillStyle = '#7c2d12';
  ctxA.fillRect(0, 0, w, h);
  ctxB.fillStyle = '#202020';
  ctxB.fillRect(0, 0, w, h);

  // Tightly wound enamelled copper coils
  for (let y = 0; y < h; y += 6) {
    const grad = ctxA.createLinearGradient(0, y, 0, y + 6);
    grad.addColorStop(0, '#5a200d');
    grad.addColorStop(0.45, '#ea8a3c');
    grad.addColorStop(0.75, '#f6b36b');
    grad.addColorStop(1, '#4c1a0a');
    ctxA.fillStyle = grad;
    ctxA.fillRect(0, y, w, 5.5);

    ctxB.fillStyle = '#d4d4d4';
    ctxB.fillRect(0, y + 1, w, 3.5);
  }
  // Vertical stator slot dividers
  ctxA.fillStyle = '#1e293b';
  for (let x = 0; x < w; x += 32) {
    ctxA.fillRect(x, 0, 5, h);
    ctxB.fillStyle = '#080808';
    ctxB.fillRect(x, 0, 5, h);
  }

  return {
    map: toTexture(cAlb, { repeatX: 6, repeatY: 1, srgb: true }),
    bumpMap: toTexture(cBump, { repeatX: 6, repeatY: 1, srgb: false })
  };
}

// 7. Permanent Magnet Rotor Poles Texture (Alternating N/S crimson/blue poles)
function createMagnetPolesTexture() {
  const w = 512;
  const h = 128;
  const { canvas, ctx } = makeCanvas(w, h);
  const poles = 16;
  const pw = w / poles;
  for (let i = 0; i < poles; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#dc2626' : '#2563eb';
    ctx.fillRect(i * pw + 2, 6, pw - 4, h - 12);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(i * pw, 0, 2, h);
    ctx.fillStyle = '#f8fafc';
    ctx.font = '700 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(i % 2 === 0 ? 'N' : 'S', i * pw + pw * 0.5, h * 0.5);
  }
  return toTexture(canvas, { repeatX: 2, repeatY: 1, srgb: true });
}

// 8. Brushed Galvanized Steel / Painted Industrial Steel Grain
function createBrushedMetalBump() {
  const w = 256;
  const h = 256;
  const { canvas, ctx } = makeCanvas(w, h);
  const rand = seededRand(8801);
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 1400; i++) {
    const y = rand() * h;
    const v = Math.floor(105 + rand() * 50);
    ctx.fillStyle = `rgba(${v},${v},${v},0.35)`;
    ctx.fillRect(0, y, w, 1.2);
  }
  return toTexture(canvas, { repeatX: 3, repeatY: 3, srgb: false });
}

// 9. Alpine Sparkling Snow Terrain Texture (groomed piste + subtle crystal glint bump)
function createAlpineSnowTextures() {
  const w = 512;
  const h = 512;
  const { canvas: cAlb, ctx: ctxA } = makeCanvas(w, h);
  const { canvas: cBump, ctx: ctxB } = makeCanvas(w, h);
  const rand = seededRand(9921);

  ctxA.fillStyle = '#e7f0fa';
  ctxA.fillRect(0, 0, w, h);
  ctxB.fillStyle = '#7c7c7c';
  ctxB.fillRect(0, 0, w, h);

  // Soft snow drifts & cool alpine shadow undertones
  for (let i = 0; i < 240; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const rx = 20 + rand() * 75;
    const ry = 8 + rand() * 28;
    const grad = ctxA.createRadialGradient(x, y, 2, x, y, rx);
    grad.addColorStop(0, rand() > 0.5 ? 'rgba(255,255,255,0.22)' : 'rgba(186,214,244,0.18)');
    grad.addColorStop(1, 'rgba(230,240,250,0)');
    ctxA.fillStyle = grad;
    ctxA.fillRect(x - rx, y - ry, rx * 2, ry * 2);
  }

  // Micro snow crystals for crisp grazing specular sparkle!
  for (let i = 0; i < 7000; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const b = rand() > 0.92 ? 255 : Math.floor(96 + rand() * 72);
    ctxB.fillStyle = `rgb(${b},${b},${b})`;
    ctxB.fillRect(x, y, 1.8, 1.8);
  }

  return {
    map: toTexture(cAlb, { repeatX: 16, repeatY: 16, srgb: true }),
    bumpMap: toTexture(cBump, { repeatX: 20, repeatY: 20, srgb: false })
  };
}

// 10. Illuminated Cabin Number Plate (01 .. 10)
export function createCabinNumberTexture(num) {
  const { canvas, ctx } = makeCanvas(128, 64);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 128, 64);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 120, 56);
  ctx.fillStyle = '#f8fafc';
  ctx.font = '700 38px "Outfit", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(num).padStart(2, '0'), 64, 34);
  return toTexture(canvas, { repeatX: 1, repeatY: 1, srgb: true });
}

// 11. Station Architectural Fascia Sign ("D-LINE · GALZIG 2-ETAGEN · DIRECTDRIVE")
export function createStationSignTexture() {
  const { canvas, ctx } = makeCanvas(1024, 160);
  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(0.5, '#1e293b');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 160);

  // Signal red architectural accent stripe
  ctx.fillStyle = '#c8102e';
  ctx.fillRect(0, 0, 1024, 10);
  ctx.fillRect(0, 150, 1024, 10);

  // Left badge
  ctx.fillStyle = '#c8102e';
  ctx.fillRect(28, 34, 148, 92);
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 36px "Outfit", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('D-LINE', 102, 82);

  // Main title (sized to fit comfortably inside 1024 px with clean right margin)
  ctx.fillStyle = '#f8fafc';
  ctx.font = '700 35px "Outfit", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('ALPIN-EXPRESS · 2-ETAGEN-TALSTATION', 202, 66);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 19px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('RIESENRAD-FÖRDERUNG · LEVEL WALK-IN · DIRECTDRIVE 900 kW · AURO', 202, 110);

  return toTexture(canvas, { repeatX: 1, repeatY: 1, srgb: true });
}

export function createStationMaterials() {
  const ropeTex = createSteelRopeTextures();
  const concreteTex = createConcreteTextures();
  const hazardTex = createHazardStripeTexture();
  const gratingTex = createCatwalkGratingTextures();
  const tireTex = createRubberTireTextures();
  const copperTex = createCopperWindingTextures();
  const magnetTex = createMagnetPolesTexture();
  const brushedBump = createBrushedMetalBump();
  const snowTex = createAlpineSnowTextures();

  return {
    textures: {
      ropeMap: ropeTex.map,
      ropeBump: ropeTex.bumpMap,
      snowMap: snowTex.map
    },

    // --- Architectural Materials ---
    concrete: new THREE.MeshStandardMaterial({
      map: concreteTex.map,
      bumpMap: concreteTex.bumpMap,
      bumpScale: 0.03,
      roughness: 0.84,
      metalness: 0.06
    }),
    egPlatformDeck: new THREE.MeshStandardMaterial({
      color: 0xd5dce6,
      map: concreteTex.map,
      bumpMap: concreteTex.bumpMap,
      bumpScale: 0.02,
      roughness: 0.72,
      metalness: 0.08
    }),
    hazardStripe: new THREE.MeshStandardMaterial({
      map: hazardTex,
      roughness: 0.55,
      metalness: 0.08
    }),
    steelAnthracite: new THREE.MeshStandardMaterial({
      color: 0x222c3a,
      bumpMap: brushedBump,
      bumpScale: 0.012,
      roughness: 0.38,
      metalness: 0.78
    }),
    steelGalvanized: new THREE.MeshStandardMaterial({
      color: 0xb8c5d6,
      bumpMap: brushedBump,
      bumpScale: 0.016,
      roughness: 0.30,
      metalness: 0.88
    }),
    steelPolishedRail: new THREE.MeshStandardMaterial({
      color: 0xe6eef8,
      roughness: 0.14,
      metalness: 0.96
    }),
    chromePiston: new THREE.MeshStandardMaterial({
      color: 0xf4f8ff,
      roughness: 0.08,
      metalness: 0.98
    }),

    // Architectural curtain wall glass (crisp clearcoat Fresnel reflections, 60-FPS mobile-friendly)
    facadeGlass: new THREE.MeshPhysicalMaterial({
      color: 0xaad4f5,
      roughness: 0.06,
      metalness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      transparent: true,
      opacity: 0.28,
      ior: 1.52,
      reflectivity: 0.9,
      depthWrite: false,
      side: THREE.DoubleSide
    }),
    roofGlass: new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      roughness: 0.28,
      metalness: 0.45,
      transparent: true,
      opacity: 0.94
    }),
    boardingGateGlass: new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.08,
      metalness: 0.05,
      transparent: true,
      opacity: 0.48,
      depthWrite: false
    }),

    // --- Doppelmayr High-Tech Machinery Coatings ---
    doppelmayrRed: new THREE.MeshPhysicalMaterial({
      color: 0xc8102e,
      bumpMap: brushedBump,
      bumpScale: 0.008,
      roughness: 0.24,
      metalness: 0.42,
      clearcoat: 0.65,
      clearcoatRoughness: 0.18
    }),
    machineBlue: new THREE.MeshPhysicalMaterial({
      color: 0x1d4ed8,
      bumpMap: brushedBump,
      bumpScale: 0.008,
      roughness: 0.26,
      metalness: 0.48,
      clearcoat: 0.55,
      clearcoatRoughness: 0.2
    }),
    safetyYellow: new THREE.MeshStandardMaterial({
      color: 0xeab308,
      roughness: 0.36,
      metalness: 0.32
    }),
    catwalkGrating: new THREE.MeshStandardMaterial({
      map: gratingTex.map,
      bumpMap: gratingTex.bumpMap,
      bumpScale: 0.035,
      roughness: 0.52,
      metalness: 0.68
    }),
    rubberTire: new THREE.MeshStandardMaterial({
      map: tireTex.map,
      bumpMap: tireTex.bumpMap,
      bumpScale: 0.035,
      roughness: 0.86,
      metalness: 0.05
    }),
    rubberLiner: new THREE.MeshStandardMaterial({
      color: 0x15181e,
      roughness: 0.92,
      metalness: 0.04
    }),

    // --- DirectDrive, Brakes & Hydraulics ---
    motorHousing: new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      bumpMap: brushedBump,
      bumpScale: 0.018,
      roughness: 0.42,
      metalness: 0.72
    }),
    motorHousingXray: new THREE.MeshPhysicalMaterial({
      color: 0x64748b,
      roughness: 0.22,
      metalness: 0.2,
      transparent: true,
      opacity: 0.16,
      depthWrite: false
    }),
    copperWindings: new THREE.MeshStandardMaterial({
      map: copperTex.map,
      bumpMap: copperTex.bumpMap,
      bumpScale: 0.03,
      roughness: 0.26,
      metalness: 0.88
    }),
    magnetPoles: new THREE.MeshStandardMaterial({
      map: magnetTex,
      roughness: 0.32,
      metalness: 0.65
    }),
    brakeCaliperRed: new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0x000000,
      emissiveIntensity: 0.0,
      roughness: 0.30,
      metalness: 0.45
    }),
    brakeDiscSteel: new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      bumpMap: brushedBump,
      bumpScale: 0.015,
      roughness: 0.22,
      metalness: 0.92
    }),

    // --- Braided Steel Haul Rope ---
    steelRope: new THREE.MeshStandardMaterial({
      map: ropeTex.map,
      bumpMap: ropeTex.bumpMap,
      bumpScale: 0.045,
      roughness: 0.34,
      metalness: 0.86
    }),

    // --- 10er Panorama Cabin Materials ---
    cabinBodySilver: new THREE.MeshPhysicalMaterial({
      color: 0xdce4ee,
      roughness: 0.20,
      metalness: 0.62,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12
    }),
    cabinAccentRed: new THREE.MeshPhysicalMaterial({
      color: 0xb91c1c,
      roughness: 0.22,
      metalness: 0.48,
      clearcoat: 0.75,
      clearcoatRoughness: 0.16
    }),
    cabinFrameDark: new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.32,
      metalness: 0.65
    }),
    cabinGlass: new THREE.MeshPhysicalMaterial({
      color: 0x0f253e,
      roughness: 0.06,
      metalness: 0.12,
      transparent: true,
      opacity: 0.44,
      reflectivity: 0.9,
      depthWrite: false
    }),
    cabinInteriorLight: new THREE.MeshStandardMaterial({
      color: 0xfff5d6,
      emissive: 0xffd27d,
      emissiveIntensity: 1.55,
      roughness: 0.3
    }),
    cabinSeatBench: new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.72,
      metalness: 0.06
    }),

    // --- Emissive LEDs, Sensors & Force Indicators ---
    ledWarmStrip: new THREE.MeshStandardMaterial({
      color: 0xfff8e7,
      emissive: 0xffe0a3,
      emissiveIntensity: 1.85,
      roughness: 0.2
    }),
    ledCoolStrip: new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      emissive: 0x7dd3fc,
      emissiveIntensity: 1.65,
      roughness: 0.2
    }),
    sensorLamp: new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x22c55e,
      emissiveIntensity: 0.6,
      roughness: 0.2
    }),
    springSteel: new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.0,
      roughness: 0.24,
      metalness: 0.88
    }),
    forceArrowGreen: new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x22c55e,
      emissiveIntensity: 1.75,
      roughness: 0.25
    }),
    forceArrowRed: new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xef4444,
      emissiveIntensity: 1.95,
      roughness: 0.25
    }),
    magFieldRing: new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.62,
      side: THREE.DoubleSide,
      depthWrite: false
    }),

    // --- Alpine Snow & Mountain Rock ---
    snowTerrain: new THREE.MeshStandardMaterial({
      color: 0xe8f1fc,
      map: snowTex.map,
      bumpMap: snowTex.bumpMap,
      bumpScale: 0.035,
      roughness: 0.62,
      metalness: 0.06
    }),
    mountainRock: new THREE.MeshStandardMaterial({
      color: 0x3a485e,
      roughness: 0.90,
      metalness: 0.04
    }),
    stationSign: new THREE.MeshStandardMaterial({
      map: createStationSignTexture(),
      emissiveMap: createStationSignTexture(),
      emissive: 0xffffff,
      emissiveIntensity: 0.42,
      roughness: 0.32,
      metalness: 0.2
    })
  };
}
