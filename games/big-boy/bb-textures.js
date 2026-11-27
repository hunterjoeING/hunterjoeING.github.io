// Procedural High-Res PBR Texture & Material Factory for UP Big Boy (Class 4000 / #4014)
// Generates genuine Albedo, Roughness, Metalness & Bump maps via Offscreen/HTML Canvas – zero external assets.

import * as THREE from 'three';

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return { canvas: c, ctx: c.getContext('2d') };
}

// Deterministic pseudo-random for repeatable industrial surface textures
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function configureTexture(canvas, { repeatX = 1, repeatY = 1, srgb = false } = {}) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.anisotropy = 8;
  tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/**
 * 1. Union Pacific Satin Deep Black Boiler Steel (sheet seams, bands, oil/soot patina)
 */
function createBoilerBlackMaps() {
  const S = 512;
  const rand = mulberry32(40141);
  const { canvas: cCol, ctx: gCol } = makeCanvas(S, S);
  const { canvas: cRgh, ctx: gRgh } = makeCanvas(S, S);
  const { canvas: cBmp, ctx: gBmp } = makeCanvas(S, S);

  // Base satin UP black (#15181d – never pure 0x000000 so PBR reflections & form stay crisp!)
  gCol.fillStyle = '#181c22';
  gCol.fillRect(0, 0, S, S);
  gRgh.fillStyle = '#5a5a5a'; // ~0.35 roughness
  gRgh.fillRect(0, 0, S, S);
  gBmp.fillStyle = '#808080';
  gBmp.fillRect(0, 0, S, S);

  // Subtle sheet-metal grain & oily streaks
  for (let i = 0; i < 2400; i++) {
    const x = rand() * S;
    const y = rand() * S;
    const w = 6 + rand() * 34;
    const h = 1 + rand() * 3;
    const v = 18 + Math.floor(rand() * 20);
    gCol.fillStyle = `rgba(${v},${v + 2},${v + 5},0.16)`;
    gCol.fillRect(x, y, w, h);

    const rv = 62 + Math.floor(rand() * 64);
    gRgh.fillStyle = `rgba(${rv},${rv},${rv},0.22)`;
    gRgh.fillRect(x, y, w, h * 1.5);
  }

  // Soot & oil vertical runoff streaks
  for (let i = 0; i < 65; i++) {
    const x = rand() * S;
    const w = 4 + rand() * 14;
    const grad = gRgh.createLinearGradient(x, 0, x + w, S);
    grad.addColorStop(0, 'rgba(130,130,130,0.14)');
    grad.addColorStop(0.5, 'rgba(42,42,42,0.18)');
    grad.addColorStop(1, 'rgba(110,110,110,0.12)');
    gRgh.fillStyle = grad;
    gRgh.fillRect(x, 0, w, S);
  }

  // Boiler jacket bands & seam lines
  for (let x = 64; x < S; x += 128) {
    gCol.fillStyle = 'rgba(8,10,12,0.75)';
    gCol.fillRect(x - 2, 0, 4, S);
    gCol.fillStyle = 'rgba(72,80,92,0.28)';
    gCol.fillRect(x + 2, 0, 2, S);

    gBmp.fillStyle = '#404040';
    gBmp.fillRect(x - 2, 0, 3, S);
    gBmp.fillStyle = '#c8c8c8';
    gBmp.fillRect(x + 1, 0, 3, S);

    // Subtle rivet dots next to seams
    for (let y = 10; y < S; y += 22) {
      gBmp.fillStyle = '#dedede';
      gBmp.beginPath();
      gBmp.arc(x - 7, y, 2.2, 0, Math.PI * 2);
      gBmp.arc(x + 8, y, 2.2, 0, Math.PI * 2);
      gBmp.fill();
    }
  }

  return {
    map: configureTexture(cCol, { repeatX: 3, repeatY: 2, srgb: true }),
    roughnessMap: configureTexture(cRgh, { repeatX: 3, repeatY: 2 }),
    bumpMap: configureTexture(cBmp, { repeatX: 3, repeatY: 2 })
  };
}

/**
 * 2. US Heat-Resistant Silver-Graphite Coating (Smokebox & Firebox Exterior)
 */
function createGraphiteMaps() {
  const S = 512;
  const rand = mulberry32(40142);
  const { canvas: cCol, ctx: gCol } = makeCanvas(S, S);
  const { canvas: cRgh, ctx: gRgh } = makeCanvas(S, S);
  const { canvas: cBmp, ctx: gBmp } = makeCanvas(S, S);

  // Shimmering metallic graphite grey
  gCol.fillStyle = '#5c636c';
  gCol.fillRect(0, 0, S, S);
  gRgh.fillStyle = '#6c6c6c';
  gRgh.fillRect(0, 0, S, S);
  gBmp.fillStyle = '#808080';
  gBmp.fillRect(0, 0, S, S);

  // Metallic mica flake grain + subtle heat patina (bronze/bluish steel tint)
  for (let i = 0; i < 6500; i++) {
    const x = rand() * S;
    const y = rand() * S;
    const sz = 1 + rand() * 3.2;
    const base = 76 + Math.floor(rand() * 48);
    const warm = rand() > 0.72 ? 8 : 0;
    gCol.fillStyle = `rgba(${base + warm},${base + Math.floor(warm * 0.4)},${base + 6},0.35)`;
    gCol.fillRect(x, y, sz, sz);

    const rv = 70 + Math.floor(rand() * 85);
    gRgh.fillStyle = `rgba(${rv},${rv},${rv},0.28)`;
    gRgh.fillRect(x, y, sz * 1.4, sz * 1.4);

    const bv = 100 + Math.floor(rand() * 55);
    gBmp.fillStyle = `rgb(${bv},${bv},${bv})`;
    gBmp.fillRect(x, y, sz, sz);
  }

  // Subtle circumferential smokebox plate seam
  gBmp.fillStyle = '#484848';
  gBmp.fillRect(S * 0.5 - 2, 0, 4, S);
  gCol.fillStyle = 'rgba(25,28,32,0.45)';
  gCol.fillRect(S * 0.5 - 2, 0, 4, S);

  return {
    map: configureTexture(cCol, { repeatX: 2, repeatY: 2, srgb: true }),
    roughnessMap: configureTexture(cRgh, { repeatX: 2, repeatY: 2 }),
    bumpMap: configureTexture(cBmp, { repeatX: 2, repeatY: 2 })
  };
}

/**
 * 3. Brushed & Lightly Oiled Forged Steel (Main Rods, Coupling Rods, Walschaerts Gear)
 */
function createBrushedSteelMaps() {
  const S = 512;
  const rand = mulberry32(40143);
  const { canvas: cCol, ctx: gCol } = makeCanvas(S, S);
  const { canvas: cRgh, ctx: gRgh } = makeCanvas(S, S);
  const { canvas: cBmp, ctx: gBmp } = makeCanvas(S, S);

  gCol.fillStyle = '#ced4dc';
  gCol.fillRect(0, 0, S, S);
  gRgh.fillStyle = '#383838'; // ~0.22 brushed sheen
  gRgh.fillRect(0, 0, S, S);
  gBmp.fillStyle = '#808080';
  gBmp.fillRect(0, 0, S, S);

  // Fine horizontal machining & grinding streaks
  for (let i = 0; i < 1600; i++) {
    const y = rand() * S;
    const x = rand() * S;
    const len = 35 + rand() * 140;
    const shade = 185 + Math.floor(rand() * 58);
    gCol.fillStyle = `rgba(${shade},${shade + 3},${shade + 7},0.28)`;
    gCol.fillRect(x, y, len, 1.2);

    const rv = 35 + Math.floor(rand() * 55);
    gRgh.fillStyle = `rgba(${rv},${rv},${rv},0.25)`;
    gRgh.fillRect(x, y, len, 1.4);

    const bv = 105 + Math.floor(rand() * 48);
    gBmp.fillStyle = `rgba(${bv},${bv},${bv},0.35)`;
    gBmp.fillRect(x, y, len, 1.2);
  }

  // Slight warm oil film smudges
  for (let i = 0; i < 36; i++) {
    const x = rand() * S;
    const y = rand() * S;
    const r = 16 + rand() * 44;
    const grad = gCol.createRadialGradient(x, y, 2, x, y, r);
    grad.addColorStop(0, 'rgba(130,115,92,0.16)');
    grad.addColorStop(1, 'rgba(130,115,92,0)');
    gCol.fillStyle = grad;
    gCol.beginPath();
    gCol.arc(x, y, r, 0, Math.PI * 2);
    gCol.fill();
  }

  return {
    map: configureTexture(cCol, { repeatX: 2, repeatY: 1, srgb: true }),
    roughnessMap: configureTexture(cRgh, { repeatX: 2, repeatY: 1 }),
    bumpMap: configureTexture(cBmp, { repeatX: 2, repeatY: 1 })
  };
}

/**
 * 4. Weathered Dark Wood Sleepers & Grey-Brown Crushed Granite Ballast
 */
function createTrackMaps() {
  const S = 512;
  const rand = mulberry32(40144);

  // Wood sleepers
  const { canvas: cWood, ctx: gWood } = makeCanvas(S, S);
  const { canvas: bWood, ctx: gbWood } = makeCanvas(S, S);
  gWood.fillStyle = '#332820';
  gWood.fillRect(0, 0, S, S);
  gbWood.fillStyle = '#808080';
  gbWood.fillRect(0, 0, S, S);
  for (let i = 0; i < 900; i++) {
    const y = rand() * S;
    const h = 1 + rand() * 3.5;
    const d = 32 + Math.floor(rand() * 34);
    gWood.fillStyle = `rgba(${d + 14},${d + 6},${d},0.42)`;
    gWood.fillRect(0, y, S, h);
    const bv = 70 + Math.floor(rand() * 110);
    gbWood.fillStyle = `rgba(${bv},${bv},${bv},0.4)`;
    gbWood.fillRect(0, y, S, h);
  }
  // Creosote cracks
  for (let i = 0; i < 45; i++) {
    const x = rand() * S;
    const y = rand() * S;
    gWood.fillStyle = 'rgba(12,9,7,0.65)';
    gWood.fillRect(x, y, 25 + rand() * 90, 1.5);
    gbWood.fillStyle = '#202020';
    gbWood.fillRect(x, y, 25 + rand() * 90, 1.5);
  }

  // Crushed stone ballast
  const { canvas: cBal, ctx: gBal } = makeCanvas(S, S);
  const { canvas: bBal, ctx: gbBal } = makeCanvas(S, S);
  gBal.fillStyle = '#4e4842';
  gBal.fillRect(0, 0, S, S);
  gbBal.fillStyle = '#606060';
  gbBal.fillRect(0, 0, S, S);
  for (let i = 0; i < 7500; i++) {
    const x = rand() * S;
    const y = rand() * S;
    const rx = 2 + rand() * 6.5;
    const ry = 2 + rand() * 5.5;
    const tone = 56 + Math.floor(rand() * 68);
    const warm = Math.floor((rand() - 0.35) * 18);
    gBal.fillStyle = `rgb(${tone + warm},${tone + Math.floor(warm * 0.5)},${tone - 4})`;
    gBal.beginPath();
    gBal.ellipse(x, y, rx, ry, rand() * Math.PI, 0, Math.PI * 2);
    gBal.fill();

    const bv = 85 + Math.floor(rand() * 155);
    gbBal.fillStyle = `rgb(${bv},${bv},${bv})`;
    gbBal.beginPath();
    gbBal.ellipse(x, y, rx * 0.9, ry * 0.9, rand() * Math.PI, 0, Math.PI * 2);
    gbBal.fill();
  }

  return {
    woodMap: configureTexture(cWood, { repeatX: 1, repeatY: 1, srgb: true }),
    woodBump: configureTexture(bWood, { repeatX: 1, repeatY: 1 }),
    ballastMap: configureTexture(cBal, { repeatX: 14, repeatY: 3, srgb: true }),
    ballastBump: configureTexture(bBal, { repeatX: 14, repeatY: 3 })
  };
}

/**
 * 5. Crisp Union Pacific Cab Side Numbering ("4014" + "UNION PACIFIC")
 */
function createCabDecalTexture() {
  const { canvas, ctx } = makeCanvas(512, 256);
  ctx.clearRect(0, 0, 512, 256);

  // Subtle metallic silver-white UP lettering
  ctx.fillStyle = '#edf2f7';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Crisp UP 4014 numerals
  ctx.font = '700 112px "Outfit", "Arial Narrow", sans-serif';
  ctx.fillText('4014', 256, 118);

  ctx.font = '700 28px "Outfit", sans-serif';
  ctx.fillStyle = 'rgba(226, 232, 240, 0.9)';
  ctx.fillText('UNION PACIFIC', 256, 200);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/**
 * 6. Glowing Angled Numberboard ("4014")
 */
function createNumberboardTexture() {
  const { canvas, ctx } = makeCanvas(256, 96);
  ctx.fillStyle = '#090b0e';
  ctx.fillRect(0, 0, 256, 96);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 248, 88);

  ctx.fillStyle = '#fff8dc';
  ctx.font = '700 66px "Outfit", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('4014', 128, 52);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * 7. Iconic Historic Chalk "Big Boy" Lettering on Smokebox Door
 */
function createChalkBigBoyTexture() {
  const { canvas, ctx } = makeCanvas(512, 256);
  ctx.clearRect(0, 0, 512, 256);

  ctx.save();
  ctx.translate(256, 132);
  ctx.rotate(-0.07);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Soft chalky double-stroke look
  ctx.font = 'italic 700 84px "Georgia", serif';
  ctx.fillStyle = 'rgba(241, 245, 249, 0.72)';
  ctx.fillText('Big Boy', 0, 0);
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.35)';
  ctx.lineWidth = 2.5;
  ctx.strokeText('Big Boy', 1.5, 1.5);
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * 8. Glowing Firebox Coal Bed Texture
 */
function createCoalBedTexture() {
  const S = 512;
  const rand = mulberry32(40148);
  const { canvas: cCol, ctx: gCol } = makeCanvas(S, S);
  const { canvas: cEmi, ctx: gEmi } = makeCanvas(S, S);

  gCol.fillStyle = '#140c0a';
  gCol.fillRect(0, 0, S, S);
  gEmi.fillStyle = '#380900';
  gEmi.fillRect(0, 0, S, S);

  // Hot glowing gaps beneath dark coal chunks
  for (let i = 0; i < 240; i++) {
    const x = rand() * S;
    const y = rand() * S;
    const r = 10 + rand() * 34;
    const grad = gEmi.createRadialGradient(x, y, 2, x, y, r);
    grad.addColorStop(0, '#fff7c2');
    grad.addColorStop(0.35, '#ff7b00');
    grad.addColorStop(0.75, '#b91c1c');
    grad.addColorStop(1, 'rgba(40, 5, 0, 0)');
    gEmi.fillStyle = grad;
    gEmi.beginPath();
    gEmi.arc(x, y, r, 0, Math.PI * 2);
    gEmi.fill();
  }

  // Dark coal nuggets sitting on top
  for (let i = 0; i < 700; i++) {
    const x = rand() * S;
    const y = rand() * S;
    const rx = 5 + rand() * 14;
    const ry = 4 + rand() * 11;
    const shade = 14 + Math.floor(rand() * 24);
    gCol.fillStyle = `rgb(${shade + 8},${shade + 2},${shade})`;
    gCol.beginPath();
    gCol.ellipse(x, y, rx, ry, rand() * Math.PI, 0, Math.PI * 2);
    gCol.fill();

    gEmi.fillStyle = 'rgba(18, 4, 0, 0.72)';
    gEmi.beginPath();
    gEmi.ellipse(x, y, rx * 0.85, ry * 0.85, rand() * Math.PI, 0, Math.PI * 2);
    gEmi.fill();
  }

  return {
    map: configureTexture(cCol, { repeatX: 2, repeatY: 1, srgb: true }),
    emissiveMap: configureTexture(cEmi, { repeatX: 2, repeatY: 1, srgb: true })
  };
}

/**
 * 9. Soft Procedural Puff Sprite Texture (for realistic steam, smoke & glowing sparks)
 */
export function createSoftPuffTexture(mode = 'smoke') {
  const S = 128;
  const { canvas, ctx } = makeCanvas(S, S);
  const rand = mulberry32(mode === 'spark' ? 999 : 777);

  ctx.clearRect(0, 0, S, S);
  if (mode === 'spark') {
    const g = ctx.createRadialGradient(S / 2, S / 2, 1, S / 2, S / 2, S / 2);
    g.addColorStop(0, 'rgba(255, 255, 235, 1)');
    g.addColorStop(0.28, 'rgba(255, 180, 60, 0.92)');
    g.addColorStop(0.65, 'rgba(235, 65, 10, 0.35)');
    g.addColorStop(1, 'rgba(200, 20, 0, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
  } else {
    // Layered soft cloud lobes for volumetric billowing steam/smoke
    for (let i = 0; i < 14; i++) {
      const ang = (i / 14) * Math.PI * 2 + rand() * 0.4;
      const dist = (i === 0 ? 0 : 8 + rand() * 20);
      const cx = S / 2 + Math.cos(ang) * dist;
      const cy = S / 2 + Math.sin(ang) * dist;
      const rad = 26 + rand() * 24;
      const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, rad);
      g.addColorStop(0, 'rgba(255, 255, 255, 0.42)');
      g.addColorStop(0.55, 'rgba(240, 244, 248, 0.18)');
      g.addColorStop(1, 'rgba(220, 228, 236, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Create the complete PBR material library shared cleanly across all 3D builders.
 */
export function createBigBoyMaterials() {
  const boilerMaps = createBoilerBlackMaps();
  const graphiteMaps = createGraphiteMaps();
  const steelMaps = createBrushedSteelMaps();
  const trackMaps = createTrackMaps();
  const coalMaps = createCoalBedTexture();

  const mats = {
    boilerBlack: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: boilerMaps.map,
      roughnessMap: boilerMaps.roughnessMap,
      bumpMap: boilerMaps.bumpMap,
      bumpScale: 0.015,
      metalness: 0.58,
      roughness: 0.42,
      side: THREE.DoubleSide
    }),
    boilerInterior: new THREE.MeshStandardMaterial({
      color: 0x262c34,
      roughness: 0.62,
      metalness: 0.48,
      side: THREE.DoubleSide
    }),
    smokeboxGraphite: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: graphiteMaps.map,
      roughnessMap: graphiteMaps.roughnessMap,
      bumpMap: graphiteMaps.bumpMap,
      bumpScale: 0.02,
      metalness: 0.72,
      roughness: 0.36,
      side: THREE.DoubleSide
    }),
    castSteel: new THREE.MeshStandardMaterial({
      color: 0x22272f,
      roughnessMap: boilerMaps.roughnessMap,
      bumpMap: boilerMaps.bumpMap,
      bumpScale: 0.014,
      metalness: 0.64,
      roughness: 0.48
    }),
    castSteelDark: new THREE.MeshStandardMaterial({
      color: 0x161a20,
      metalness: 0.55,
      roughness: 0.58
    }),
    polishedSteel: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: steelMaps.map,
      roughnessMap: steelMaps.roughnessMap,
      bumpMap: steelMaps.bumpMap,
      bumpScale: 0.008,
      metalness: 0.92,
      roughness: 0.22
    }),
    rodFluteDark: new THREE.MeshStandardMaterial({
      color: 0x5c6674,
      metalness: 0.82,
      roughness: 0.38
    }),
    wheelTireSteel: new THREE.MeshStandardMaterial({
      color: 0xd8dee6,
      map: steelMaps.map,
      metalness: 0.94,
      roughness: 0.20
    }),
    wheelWhitewall: new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      metalness: 0.05,
      roughness: 0.72
    }),
    brass: new THREE.MeshStandardMaterial({
      color: 0xd8a848,
      metalness: 0.88,
      roughness: 0.26
    }),
    copper: new THREE.MeshStandardMaterial({
      color: 0xc87448,
      metalness: 0.86,
      roughness: 0.28
    }),
    cutSectionRed: new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      metalness: 0.25,
      roughness: 0.42,
      side: THREE.DoubleSide
    }),
    cutSectionSteel: new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.78,
      roughness: 0.28,
      side: THREE.DoubleSide
    }),
    cylinderLiner: new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.86,
      roughness: 0.24,
      side: THREE.DoubleSide
    }),
    pistonSteel: new THREE.MeshStandardMaterial({
      color: 0xdbe3ec,
      metalness: 0.9,
      roughness: 0.22
    }),
    pistonRingBrass: new THREE.MeshStandardMaterial({
      color: 0xeab308,
      metalness: 0.85,
      roughness: 0.28
    }),
    fireTubeSteel: new THREE.MeshStandardMaterial({
      color: 0x8b6f5c,
      metalness: 0.72,
      roughness: 0.44
    }),
    superheaterPipe: new THREE.MeshStandardMaterial({
      color: 0xe05a2b,
      emissive: new THREE.Color(0x991b1b),
      emissiveIntensity: 0.42,
      metalness: 0.65,
      roughness: 0.34
    }),
    brickArch: new THREE.MeshStandardMaterial({
      color: 0x9a3412,
      emissive: new THREE.Color(0x7c2d12),
      emissiveIntensity: 0.35,
      roughness: 0.85,
      metalness: 0.05
    }),
    coalBed: new THREE.MeshStandardMaterial({
      map: coalMaps.map,
      emissive: new THREE.Color(0xff5a00),
      emissiveMap: coalMaps.emissiveMap,
      emissiveIntensity: 2.2,
      roughness: 0.9,
      metalness: 0.05
    }),
    boilerWater: new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      emissive: new THREE.Color(0x0369a1),
      emissiveIntensity: 0.32,
      roughness: 0.14,
      metalness: 0.08,
      transparent: true,
      opacity: 0.56,
      depthWrite: false,
      side: THREE.DoubleSide
    }),
    liveSteamGlow: new THREE.MeshStandardMaterial({
      color: 0xff3b1f,
      emissive: new THREE.Color(0xff2a0a),
      emissiveIntensity: 1.45,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: 0.68,
      depthWrite: false
    }),
    exhaustSteamGlow: new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      emissive: new THREE.Color(0x94a3b8),
      emissiveIntensity: 0.35,
      roughness: 0.6,
      metalness: 0.0,
      transparent: true,
      opacity: 0.44,
      depthWrite: false
    }),
    headlightGlass: new THREE.MeshStandardMaterial({
      color: 0xfffbeb,
      emissive: new THREE.Color(0xffdfa0),
      emissiveIntensity: 3.4,
      roughness: 0.1,
      metalness: 0.1
    }),
    numberboard: new THREE.MeshStandardMaterial({
      map: createNumberboardTexture(),
      emissive: new THREE.Color(0xffe8b0),
      emissiveMap: createNumberboardTexture(),
      emissiveIntensity: 1.4,
      roughness: 0.25
    }),
    cabDecal: new THREE.MeshStandardMaterial({
      map: createCabDecalTexture(),
      transparent: true,
      alphaTest: 0.05,
      roughness: 0.35,
      metalness: 0.25,
      depthWrite: false
    }),
    chalkDecal: new THREE.MeshStandardMaterial({
      map: createChalkBigBoyTexture(),
      transparent: true,
      alphaTest: 0.04,
      roughness: 0.85,
      metalness: 0.05,
      depthWrite: false
    }),
    cabWindowGlass: new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      roughness: 0.12,
      metalness: 0.15,
      transparent: true,
      opacity: 0.32
    }),
    sleeperWood: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: trackMaps.woodMap,
      bumpMap: trackMaps.woodBump,
      bumpScale: 0.03,
      roughness: 0.88,
      metalness: 0.04
    }),
    ballast: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: trackMaps.ballastMap,
      bumpMap: trackMaps.ballastBump,
      bumpScale: 0.055,
      roughness: 0.94,
      metalness: 0.02
    }),
    railWebRust: new THREE.MeshStandardMaterial({
      color: 0x5c3824,
      roughness: 0.78,
      metalness: 0.45
    }),
    railHeadSteel: new THREE.MeshStandardMaterial({
      color: 0xdbe4ee,
      map: steelMaps.map,
      metalness: 0.94,
      roughness: 0.18
    }),
    xrayShell: new THREE.MeshPhysicalMaterial({
      color: 0x64748b,
      roughness: 0.35,
      metalness: 0.15,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
      side: THREE.DoubleSide
    }),
    smokeSpriteTex: createSoftPuffTexture('smoke'),
    sparkSpriteTex: createSoftPuffTexture('spark')
  };

  mats._ballastMap = trackMaps.ballastMap;
  mats._ballastBump = trackMaps.ballastBump;

  return mats;
}
