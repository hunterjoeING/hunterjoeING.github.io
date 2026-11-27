// Procedural High-Res Offscreen-Canvas PBR Texture & Snow-Corduroy Shader Generator
// Zero external image dependencies – 100% deterministic procedural PBR materials!

import * as THREE from 'three';
import { PB_SPECS } from './specs.js';

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function hash2D(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function toTexture(canvas, { srgb = true, repeatX = 1, repeatY = 1, anisotropy = 8 } = {}) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.anisotropy = anisotropy;
  tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.needsUpdate = true;
  return tex;
}

// 1. PistenBully Carmine Red Body + Frost Edge + Optional "800 W" Livery
function buildCarmineRedTextures(withLivery = false) {
  const w = 1024, h = 512;
  const col = makeCanvas(w, h);
  const rough = makeCanvas(w, h);
  const bump = makeCanvas(w, h);
  const cCtx = col.getContext('2d');
  const rCtx = rough.getContext('2d');
  const bCtx = bump.getContext('2d');

  // Rich Kässbohrer Carmine Red paint gradient
  const grad = cCtx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0.0, '#d81332');
  grad.addColorStop(0.55, '#c40f2c');
  grad.addColorStop(0.86, '#9f0c24');
  grad.addColorStop(1.0, '#8b162a');
  cCtx.fillStyle = grad;
  cCtx.fillRect(0, 0, w, h);

  // Smooth automotive semi-gloss roughness base
  rCtx.fillStyle = '#4c4c4c'; // ~0.30 roughness
  rCtx.fillRect(0, 0, w, h);

  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, w, h);

  // Subtle metallic micro-flake & panel seam lines
  for (let i = 0; i < 4200; i++) {
    const x = hash2D(i, 1.3) * w;
    const y = hash2D(i, 7.9) * h;
    const a = 0.03 + hash2D(i, 3.1) * 0.04;
    cCtx.fillStyle = i % 2 === 0 ? `rgba(255,255,255,${a})` : `rgba(40,0,10,${a})`;
    cCtx.fillRect(x, y, 2, 2);
  }

  // Crisp sheet-metal panel grooves
  cCtx.strokeStyle = 'rgba(20, 4, 8, 0.45)';
  cCtx.lineWidth = 3;
  bCtx.strokeStyle = '#303030';
  bCtx.lineWidth = 4;
  for (const px of [240, 620, 860]) {
    cCtx.beginPath(); cCtx.moveTo(px, 16); cCtx.lineTo(px, h - 16); cCtx.stroke();
    bCtx.beginPath(); bCtx.moveTo(px, 16); bCtx.lineTo(px, h - 16); bCtx.stroke();
  }

  // Livery graphics: bold "PistenBully 800 W" white & silver stripes
  if (withLivery) {
    // Sleek dark-anthracite accent stripe
    cCtx.fillStyle = '#151922';
    cCtx.beginPath();
    cCtx.moveTo(40, 295);
    cCtx.lineTo(960, 295);
    cCtx.lineTo(990, 348);
    cCtx.lineTo(40, 348);
    cCtx.closePath();
    cCtx.fill();

    // Signal silver-white hairline above stripe
    cCtx.fillStyle = '#f8fafc';
    cCtx.fillRect(42, 286, 916, 5);

    // Bold "PistenBully" wordmark
    cCtx.font = '700 54px "Outfit", "Arial", sans-serif';
    cCtx.fillStyle = '#ffffff';
    cCtx.fillText('PistenBully', 66, 255);

    // Iconic huge "800 W" badge
    cCtx.font = '800 132px "Outfit", "Arial Black", sans-serif';
    cCtx.fillStyle = '#ffffff';
    cCtx.fillText('800', 510, 260);
    cCtx.fillStyle = '#facc15'; // Winch "W" accent in crisp Kässbohrer yellow!
    cCtx.fillText('W', 782, 260);

    // Technical sub-badge in dark stripe
    cCtx.font = '600 24px "Plus Jakarta Sans", "Arial", sans-serif';
    cCtx.fillStyle = '#e2e8f0';
    cCtx.fillText('MAN D3876 · 540 PS · 4,7 t ACTIVE WINCH', 72, 330);

    // Slightly glossier over vinyl decals
    rCtx.fillStyle = '#383838';
    rCtx.fillRect(50, 140, 910, 210);
  }

  // Fine frozen snow-dust / frost crust along bottom rocker edge!
  const frostGrad = cCtx.createLinearGradient(0, h * 0.78, 0, h);
  frostGrad.addColorStop(0.0, 'rgba(226, 240, 255, 0.0)');
  frostGrad.addColorStop(0.55, 'rgba(226, 240, 255, 0.28)');
  frostGrad.addColorStop(1.0, 'rgba(241, 248, 255, 0.65)');
  cCtx.fillStyle = frostGrad;
  cCtx.fillRect(0, h * 0.78, w, h * 0.22);

  for (let i = 0; i < 1600; i++) {
    const x = hash2D(i, 11.7) * w;
    const y = h * (0.76 + hash2D(i, 19.3) * 0.24);
    const sz = 1 + hash2D(i, 23.1) * 5;
    cCtx.fillStyle = `rgba(240, 249, 255, ${0.15 + hash2D(i, 5.5) * 0.38})`;
    cCtx.fillRect(x, y, sz, sz * 0.7);
    rCtx.fillStyle = '#d6d6d6'; // Rough frost crystals
    rCtx.fillRect(x, y, sz, sz);
    bCtx.fillStyle = '#b4b4b4';
    bCtx.fillRect(x, y, sz, sz);
  }

  return {
    map: toTexture(col, { srgb: true }),
    roughnessMap: toTexture(rough, { srgb: false }),
    bumpMap: toTexture(bump, { srgb: false })
  };
}

// 2. Brushed & Ice-Scratched Aluminum Track Grousers
function buildBrushedAluminumTextures() {
  const w = 512, h = 256;
  const col = makeCanvas(w, h);
  const rough = makeCanvas(w, h);
  const bump = makeCanvas(w, h);
  const cCtx = col.getContext('2d');
  const rCtx = rough.getContext('2d');
  const bCtx = bump.getContext('2d');

  cCtx.fillStyle = '#b9c4d0';
  cCtx.fillRect(0, 0, w, h);
  rCtx.fillStyle = '#606060';
  rCtx.fillRect(0, 0, w, h);
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, w, h);

  // Anisotropic brushed metal streaks + ice scratches
  for (let y = 0; y < h; y += 2) {
    const v = 168 + Math.floor(hash2D(y, 2.7) * 42);
    cCtx.fillStyle = `rgb(${v},${v + 5},${v + 12})`;
    cCtx.fillRect(0, y, w, 2);
    const rv = 70 + Math.floor(hash2D(y, 9.1) * 45);
    rCtx.fillStyle = `rgb(${rv},${rv},${rv})`;
    rCtx.fillRect(0, y, w, 2);
  }
  for (let i = 0; i < 420; i++) {
    const x = hash2D(i, 4.1) * w;
    const y = hash2D(i, 8.3) * h;
    const len = 18 + hash2D(i, 12.7) * 75;
    const ang = (hash2D(i, 15.9) - 0.5) * 0.25;
    cCtx.strokeStyle = i % 3 === 0 ? 'rgba(255,255,255,0.45)' : 'rgba(55,65,80,0.35)';
    cCtx.lineWidth = 1.2;
    cCtx.beginPath();
    cCtx.moveTo(x, y);
    cCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    cCtx.stroke();
    bCtx.strokeStyle = i % 3 === 0 ? '#a8a8a8' : '#585858';
    bCtx.beginPath();
    bCtx.moveTo(x, y);
    bCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    bCtx.stroke();
  }

  return {
    map: toTexture(col, { srgb: true, repeatX: 2, repeatY: 1 }),
    roughnessMap: toTexture(rough, { srgb: false, repeatX: 2, repeatY: 1 }),
    bumpMap: toTexture(bump, { srgb: false, repeatX: 2, repeatY: 1 })
  };
}

// 3. Heavy Dark Painted Blade Steel with Polished Ice-Worn Scratches
function buildBladeSteelTextures() {
  const w = 512, h = 512;
  const col = makeCanvas(w, h);
  const rough = makeCanvas(w, h);
  const bump = makeCanvas(w, h);
  const cCtx = col.getContext('2d');
  const rCtx = rough.getContext('2d');
  const bCtx = bump.getContext('2d');

  // Heavy industrial charcoal-slate steel
  const g = cCtx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0.0, '#1f252e');
  g.addColorStop(0.76, '#272f3b');
  g.addColorStop(0.88, '#667486'); // Worn metal near cutting edge
  g.addColorStop(1.0, '#c8d3e0');  // Polished steel Schürfleiste
  cCtx.fillStyle = g;
  cCtx.fillRect(0, 0, w, h);

  const rg = rCtx.createLinearGradient(0, 0, 0, h);
  rg.addColorStop(0.0, '#969696');
  rg.addColorStop(0.76, '#848484');
  rg.addColorStop(1.0, '#303030'); // Shiny polished edge
  rCtx.fillStyle = rg;
  rCtx.fillRect(0, 0, w, h);

  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, w, h);

  // Vertical snow/ice abrasion streaks along blade curvature
  for (let i = 0; i < 650; i++) {
    const x = hash2D(i, 3.3) * w;
    const y0 = h * (0.35 + hash2D(i, 6.2) * 0.65);
    const len = 25 + hash2D(i, 9.8) * 140;
    cCtx.strokeStyle = `rgba(215, 228, 242, ${0.08 + hash2D(i, 1.9) * 0.25})`;
    cCtx.lineWidth = 1 + hash2D(i, 14.1) * 1.5;
    cCtx.beginPath(); cCtx.moveTo(x, y0); cCtx.lineTo(x + (hash2D(i, 2.2) - 0.5) * 10, y0 - len); cCtx.stroke();
    bCtx.strokeStyle = '#686868';
    bCtx.beginPath(); bCtx.moveTo(x, y0); bCtx.lineTo(x, y0 - len); bCtx.stroke();
  }

  // Structural reinforcement rib lines
  bCtx.fillStyle = '#a8a8a8';
  for (let rx = 64; rx < w; rx += 96) {
    bCtx.fillRect(rx, 0, 8, h * 0.8);
  }

  return {
    map: toTexture(col, { srgb: true }),
    roughnessMap: toTexture(rough, { srgb: false }),
    bumpMap: toTexture(bump, { srgb: false })
  };
}

// 4. Signal Yellow Ribbed Polyurethane Finisher ("Gelber Teppich")
function buildYellowFinisherTextures() {
  const w = 512, h = 512;
  const col = makeCanvas(w, h);
  const rough = makeCanvas(w, h);
  const bump = makeCanvas(w, h);
  const cCtx = col.getContext('2d');
  const rCtx = rough.getContext('2d');
  const bCtx = bump.getContext('2d');

  // Vibrant Kässbohrer Signal Yellow
  cCtx.fillStyle = '#facc15';
  cCtx.fillRect(0, 0, w, h);
  rCtx.fillStyle = '#b4b4b4'; // Matte polyurethane rubber (~0.70 roughness)
  rCtx.fillRect(0, 0, w, h);
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, w, h);

  // Longitudinal molded corduroy profiling ribs!
  const numRibs = 32;
  const ribW = w / numRibs;
  for (let i = 0; i < numRibs; i++) {
    const x = i * ribW;
    const grd = cCtx.createLinearGradient(x, 0, x + ribW, 0);
    grd.addColorStop(0.0, '#ca8a04');
    grd.addColorStop(0.35, '#fde047');
    grd.addColorStop(0.65, '#facc15');
    grd.addColorStop(1.0, '#b45309');
    cCtx.fillStyle = grd;
    cCtx.fillRect(x, 0, ribW, h);

    const bGrd = bCtx.createLinearGradient(x, 0, x + ribW, 0);
    bGrd.addColorStop(0.0, '#282828');
    bGrd.addColorStop(0.5, '#f0f0f0');
    bGrd.addColorStop(1.0, '#282828');
    bCtx.fillStyle = bGrd;
    bCtx.fillRect(x, 0, ribW, h);
  }

  // Subtle rubber molding micro-grain & snow dust on trailing edge
  for (let i = 0; i < 1800; i++) {
    const x = hash2D(i, 4.7) * w;
    const y = hash2D(i, 9.9) * h;
    cCtx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(90,50,0,0.08)';
    cCtx.fillRect(x, y, 2, 2);
  }
  const edgeFrost = cCtx.createLinearGradient(0, h * 0.80, 0, h);
  edgeFrost.addColorStop(0, 'rgba(241,248,255,0)');
  edgeFrost.addColorStop(1, 'rgba(241,248,255,0.42)');
  cCtx.fillStyle = edgeFrost;
  cCtx.fillRect(0, h * 0.80, w, h * 0.20);

  return {
    map: toTexture(col, { srgb: true, repeatX: 2, repeatY: 1 }),
    roughnessMap: toTexture(rough, { srgb: false, repeatX: 2, repeatY: 1 }),
    bumpMap: toTexture(bump, { srgb: false, repeatX: 2, repeatY: 1 })
  };
}

// 5. Perforated Black Engine Louver Grille
function buildLouverTextures() {
  const w = 256, h = 256;
  const col = makeCanvas(w, h);
  const bump = makeCanvas(w, h);
  const cCtx = col.getContext('2d');
  const bCtx = bump.getContext('2d');

  cCtx.fillStyle = '#0d1117';
  cCtx.fillRect(0, 0, w, h);
  bCtx.fillStyle = '#202020';
  bCtx.fillRect(0, 0, w, h);

  for (let y = 8; y < h; y += 16) {
    cCtx.fillStyle = '#262d38';
    cCtx.fillRect(10, y, w - 20, 8);
    cCtx.fillStyle = '#05070a';
    cCtx.fillRect(10, y + 8, w - 20, 4);
    bCtx.fillStyle = '#d8d8d8';
    bCtx.fillRect(10, y, w - 20, 7);
  }
  return {
    map: toTexture(col, { srgb: true }),
    bumpMap: toTexture(bump, { srgb: false })
  };
}

// 6. Illuminated Cockpit SNOWsat Touchscreen Display
function buildSnowsatScreenTexture() {
  const w = 512, h = 320;
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#07101f';
  ctx.fillRect(0, 0, w, h);

  // Mini SNOWsat LiDAR Heatmap Map on left
  const mapGrad = ctx.createLinearGradient(20, 50, 290, 280);
  mapGrad.addColorStop(0.0, '#1d4ed8');
  mapGrad.addColorStop(0.35, '#10b981');
  mapGrad.addColorStop(0.7, '#eab308');
  mapGrad.addColorStop(1.0, '#ef4444');
  ctx.fillStyle = mapGrad;
  ctx.fillRect(22, 52, 268, 240);

  // Contour lines
  ctx.strokeStyle = 'rgba(255,255,255,0.28)';
  ctx.lineWidth = 1.5;
  for (let g = 52; g <= 292; g += 30) {
    ctx.beginPath(); ctx.moveTo(22, g); ctx.lineTo(290, g); ctx.stroke();
  }
  // Vehicle icon in center of SNOWsat map
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(144, 152, 24, 34);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(148, 156, 16, 22);

  // Header & Live Metrics on right
  ctx.fillStyle = '#0f1d35';
  ctx.fillRect(0, 0, w, 40);
  ctx.font = '700 20px "Outfit", sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('SNOWsat LiDAR · PB 800 W', 18, 27);

  ctx.font = '700 22px "Outfit", sans-serif';
  ctx.fillStyle = '#f8fafc';
  ctx.fillText('SCHNEEHÖHE', 310, 82);
  ctx.font = '800 44px "Outfit", sans-serif';
  ctx.fillStyle = '#34d399';
  ctx.fillText('68 cm', 310, 128);

  ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('WINDE: 4,7 t AUTO', 310, 182);
  ctx.fillStyle = '#f87171';
  ctx.fillText('HYDR: 420 bar', 310, 218);
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('GNSS RTK: ±2 cm', 310, 254);

  return toTexture(c, { srgb: true });
}

// 7. Soft Radial Particle Sprite (Snow spray, exhaust condensation, spark glow)
export function createSoftParticleTexture() {
  const c = makeCanvas(128, 128);
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 2, 64, 64, 62);
  g.addColorStop(0.0, 'rgba(255,255,255,0.95)');
  g.addColorStop(0.32, 'rgba(236,246,255,0.58)');
  g.addColorStop(0.68, 'rgba(200,224,250,0.18)');
  g.addColorStop(1.0, 'rgba(200,224,250,0.0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return toTexture(c, { srgb: true });
}

// ============================================================================
// CUSTOM SNOW SLOPE MATERIAL WITH DYNAMIC ZONES, CORDUROY, SPARKLE & SNOWSAT
// ============================================================================
export function createSnowSlopeMaterial() {
  const uniforms = {
    uScrollX: { value: 0.0 },
    uBladeX: { value: 3.45 },
    uFinisherX: { value: -4.45 },
    uFinisherHalfW: { value: PB_SPECS.identity.finisherTotalWidthM * 0.5 },
    uTillerActive: { value: 1.0 },
    uSlip: { value: 0.05 },
    uSnowsat: { value: 0.0 },
    uNightMode: { value: 1.0 },
    uTime: { value: 0.0 },
    uRibSpacing: { value: PB_SPECS.tiller.ribSpacing }
  };

  const mat = new THREE.MeshStandardMaterial({
    color: 0xeaf4ff,
    roughness: 0.62,
    metalness: 0.02
  });

  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float uScrollX;
        uniform float uBladeX;
        uniform float uFinisherX;
        uniform float uFinisherHalfW;
        uniform float uTillerActive;
        uniform float uSlip;
        uniform float uRibSpacing;
        varying vec3 vSlopePos;
        varying vec2 vScrollPos;
        varying float vZoneCorduroy;
        varying float vZoneUntouched;

        float pbHash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        float pbNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(pbHash(i + vec2(0.0, 0.0)), pbHash(i + vec2(1.0, 0.0)), u.x),
            mix(pbHash(i + vec2(0.0, 1.0)), pbHash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        // PlaneGeometry rotated -PI/2 around X has local position in XY -> world-in-slopeRoot is (position.x, 0, -position.y)
        float sx = position.x;
        float sz = -position.y;
        vec2 scrollCoord = vec2(sx + uScrollX, sz);
        vScrollPos = scrollCoord;

        // Zone masks:
        // 1. Untouched rough/rutted ski piste ahead of 12-way blade (or outside working width)
        float inBladeW = 1.0 - smoothstep(2.45, 2.95, abs(sz));
        float aheadMask = smoothstep(uBladeX - 0.35, uBladeX + 0.55, sx);
        float outsideGroom = smoothstep(uFinisherHalfW - 0.15, uFinisherHalfW + 0.35, abs(sz));
        float untouched = clamp(max(aheadMask, outsideGroom * (1.0 - inBladeW * (1.0 - aheadMask))), 0.0, 1.0);

        // 2. Razor-sharp Corduroy zone directly behind yellow finisher!
        float behindFinisher = 1.0 - smoothstep(uFinisherX - 0.20, uFinisherX + 0.12, sx);
        float inFinisherW = 1.0 - smoothstep(uFinisherHalfW - 0.08, uFinisherHalfW + 0.08, abs(sz));
        float cordMask = behindFinisher * inFinisherW * uTillerActive;

        // Subtle vertex height relief: choppy moguls ahead, crisp slight corduroy grooves behind
        float mogul = (pbNoise(scrollCoord * 0.42) - 0.5) * 0.22 + (pbNoise(scrollCoord * 1.15) - 0.5) * 0.09;
        float skiRuts = sin(scrollCoord.y * 5.2 + pbNoise(scrollCoord * 0.35) * 4.5) * 0.035;
        float cordH = sin(sz * (6.2831853 / uRibSpacing)) * 0.014;

        // Track impressions under vehicle (between blade and finisher)
        float underVehicle = (1.0 - aheadMask) * (1.0 - behindFinisher);
        float inTrack = smoothstep(0.42, 0.52, abs(sz)) * (1.0 - smoothstep(2.04, 2.16, abs(sz)));
        float grouserWave = sin(scrollCoord.x * 33.0) * (0.012 + uSlip * 0.045);

        float disp = untouched * (mogul + skiRuts)
                   + cordMask * cordH
                   - underVehicle * inTrack * (0.025 + uSlip * 0.045 - grouserWave);

        transformed.z += disp;
        vSlopePos = vec3(sx, disp, sz);
        vZoneCorduroy = cordMask;
        vZoneUntouched = untouched;`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float uScrollX;
        uniform float uBladeX;
        uniform float uFinisherX;
        uniform float uFinisherHalfW;
        uniform float uTillerActive;
        uniform float uSlip;
        uniform float uSnowsat;
        uniform float uNightMode;
        uniform float uTime;
        uniform float uRibSpacing;
        varying vec3 vSlopePos;
        varying vec2 vScrollPos;
        varying float vZoneCorduroy;
        varying float vZoneUntouched;

        float pbFHash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        float pbFNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(pbFHash(i), pbFHash(i + vec2(1.0, 0.0)), u.x),
            mix(pbFHash(i + vec2(0.0, 1.0)), pbFHash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        vec3 snowsatPalette(float depthCm) {
          // Red (<25cm critical) -> Yellow (40cm) -> Emerald Green (65cm optimal) -> Deep Glacier Blue (>105cm surplus)
          vec3 cRed = vec3(0.94, 0.22, 0.24);
          vec3 cYel = vec3(0.96, 0.78, 0.14);
          vec3 cGrn = vec3(0.10, 0.80, 0.45);
          vec3 cBlu = vec3(0.14, 0.48, 0.96);
          if (depthCm < 40.0) return mix(cRed, cYel, clamp((depthCm - 15.0) / 25.0, 0.0, 1.0));
          if (depthCm < 75.0) return mix(cYel, cGrn, clamp((depthCm - 40.0) / 35.0, 0.0, 1.0));
          return mix(cGrn, cBlu, clamp((depthCm - 75.0) / 40.0, 0.0, 1.0));
        }`
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        float sz = vSlopePos.z;
        float sx = vSlopePos.x;

        // 1. Base alpine snow albedo: rich twilight glacier-blue in Blue Hour so LED beams & yellow finisher pop!
        vec3 snowClean = mix(vec3(0.86, 0.91, 0.96), vec3(0.52, 0.64, 0.80), uNightMode);
        vec3 snowShadowBlue = mix(vec3(0.54, 0.68, 0.86), vec3(0.28, 0.42, 0.64), uNightMode);

        // 2. Untouched ski-tracked piste ahead of blade (patchy icy ruts & mogul shading)
        float nRough = pbFNoise(vScrollPos * 0.85) * 0.65 + pbFNoise(vScrollPos * 3.1) * 0.35;
        float skiTrack = smoothstep(0.52, 0.95, abs(sin(vScrollPos.y * 4.8 + pbFNoise(vScrollPos * 0.4) * 5.0)));
        vec3 untouchedCol = mix(snowClean, snowShadowBlue, 0.16 + nRough * 0.22 + skiTrack * 0.20);

        // 3. Track grouser imprints under vehicle (between blade and finisher)
        float inTrackLane = smoothstep(0.44, 0.50, abs(sz)) * (1.0 - smoothstep(2.06, 2.12, abs(sz)));
        float underMask = (1.0 - vZoneUntouched) * (1.0 - vZoneCorduroy);
        float grouserBar = smoothstep(0.25, 0.85, sin(vScrollPos.x * 33.0));
        float churnNoise = pbFNoise(vScrollPos * 4.5);
        float trackDarken = inTrackLane * underMask * (0.12 + grouserBar * 0.12 + uSlip * (0.30 * churnNoise + 0.15));

        // 4. Razor-sharp Corduroy ridges directly behind the yellow Finisher!
        float ribPhase = sz * (6.2831853 / uRibSpacing);
        float ribWave = sin(ribPhase);
        // Strong sculptural groove shading so every parallel corduroy rib stands out crisply!
        float cordShade = mix(0.68, 1.08, ribWave * 0.5 + 0.5);
        vec3 cordCol = mix(snowShadowBlue * 0.88, snowClean * 1.12, smoothstep(-0.75, 0.75, ribWave)) * cordShade;

        vec3 finalSnow = mix(snowClean, untouchedCol, vZoneUntouched);
        finalSnow *= (1.0 - trackDarken);
        finalSnow = mix(finalSnow, cordCol, vZoneCorduroy);

        // 5. SNOWsat GNSS/LiDAR Snow-Depth Heatmap Overlay (ahead & around machine)
        if (uSnowsat > 0.01) {
          float depthNoise = pbFNoise(vScrollPos * 0.16) * 78.0 + pbFNoise(vScrollPos * 0.45) * 32.0 + 12.0;
          float depthCm = depthNoise + sin(vScrollPos.y * 0.25) * 18.0 + 10.0;
          vec3 heatCol = snowsatPalette(depthCm);
          float gridX = smoothstep(0.93, 0.99, abs(cos(vScrollPos.x * 1.5708)));
          float gridZ = smoothstep(0.93, 0.99, abs(cos(vScrollPos.y * 1.5708)));
          float grid = max(gridX, gridZ) * 0.35;
          float scanDist = abs(fract((sx - uTime * 4.0) * 0.06) - 0.5);
          float scanLine = (1.0 - smoothstep(0.0, 0.025, scanDist)) * 0.45;
          float heatArea = (1.0 - smoothstep(10.0, 17.5, abs(sz))) * smoothstep(-8.0, -3.5, sx) * (1.0 - smoothstep(20.0, 28.0, sx));
          vec3 overlayCol = heatCol + vec3(grid + scanLine);
          finalSnow = mix(finalSnow, overlayCol, uSnowsat * heatArea * 0.74);
        }

        diffuseColor.rgb = finalSnow;`
      )
      .replace(
        '#include <normal_fragment_maps>',
        `#include <normal_fragment_maps>
        // Analytical normal perturbation for dramatic Corduroy grooves & choppy mogul relief!
        float ribAngle = vSlopePos.z * (6.2831853 / uRibSpacing);
        float dCordDz = cos(ribAngle) * 0.72 * vZoneCorduroy;
        float dRoughX = (pbFNoise(vScrollPos * 2.2 + vec2(0.08, 0.0)) - pbFNoise(vScrollPos * 2.2 - vec2(0.08, 0.0))) * 1.65 * vZoneUntouched;
        float dRoughZ = (pbFNoise(vScrollPos * 2.2 + vec2(0.0, 0.08)) - pbFNoise(vScrollPos * 2.2 - vec2(0.0, 0.08))) * 1.65 * vZoneUntouched;
        float inTrk = smoothstep(0.44, 0.50, abs(vSlopePos.z)) * (1.0 - smoothstep(2.06, 2.12, abs(vSlopePos.z)));
        float dGrouserX = cos(vScrollPos.x * 33.0) * (0.28 + uSlip * 0.85) * inTrk * (1.0 - vZoneUntouched) * (1.0 - vZoneCorduroy);

        vec3 localPerturb = normalize(vec3(-(dRoughX + dGrouserX), 1.0, -(dCordDz + dRoughZ)));
        // Blend perturbation smoothly in view-aligned tangent frame
        vec3 nBase = normalize(normal);
        normal = normalize(mix(nBase, normalize(nBase + vec3(localPerturb.x, 0.0, localPerturb.z) * 0.55), 0.85));`
      )
      .replace(
        '#include <dithering_fragment>',
        `// Micro-Sparkle / Crystalline Snow Glint Effect (view-dependent crystalline twinkles!)
        vec2 cell = floor(vScrollPos * 16.0);
        float rnd1 = pbFHash(cell);
        float rnd2 = pbFHash(cell + vec2(17.3, 41.9));
        vec3 viewDirW = normalize(vViewPosition);
        float glintPhase = sin(rnd1 * 62.8 + dot(viewDirW.xz, vec2(19.0, 23.0)) + rnd2 * 12.0);
        float sparkle = pow(max(0.0, glintPhase), 38.0) * step(0.84, rnd1);
        float nearVehicle = 1.0 - smoothstep(5.0, 22.0, length(vSlopePos.xz));
        gl_FragColor.rgb += vec3(0.88, 0.96, 1.0) * sparkle * (0.28 + 0.52 * nearVehicle);
        #include <dithering_fragment>`
      );
  };

  mat.userData.snowUniforms = uniforms;
  return mat;
}

// ============================================================================
// MASTER MATERIAL PALETTE FACTORY
// ============================================================================
export function createPistenBullyMaterials() {
  const redPlainTex = buildCarmineRedTextures(false);
  const redLiveryTex = buildCarmineRedTextures(true);
  const alumTex = buildBrushedAluminumTextures();
  const bladeTex = buildBladeSteelTextures();
  const yellowTex = buildYellowFinisherTextures();
  const louverTex = buildLouverTextures();
  const snowsatTex = buildSnowsatScreenTexture();

  const redBody = new THREE.MeshPhysicalMaterial({
    map: redPlainTex.map,
    roughnessMap: redPlainTex.roughnessMap,
    bumpMap: redPlainTex.bumpMap,
    bumpScale: 0.008,
    roughness: 0.34,
    metalness: 0.14,
    clearcoat: 0.55,
    clearcoatRoughness: 0.22
  });

  const redLivery = new THREE.MeshPhysicalMaterial({
    map: redLiveryTex.map,
    roughnessMap: redLiveryTex.roughnessMap,
    bumpMap: redLiveryTex.bumpMap,
    bumpScale: 0.008,
    roughness: 0.32,
    metalness: 0.12,
    clearcoat: 0.58,
    clearcoatRoughness: 0.20
  });

  // Sleek smoked neutral glass shell material for Hydraulics X-Ray cutaway mode
  const xrayShell = new THREE.MeshPhysicalMaterial({
    color: 0x64748b,
    roughness: 0.24,
    metalness: 0.12,
    transparent: true,
    opacity: 0.11,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const cabGlass = new THREE.MeshPhysicalMaterial({
    color: 0x0f1f36,
    roughness: 0.08,
    metalness: 0.15,
    transmission: 0.45,
    transparent: true,
    opacity: 0.58,
    ior: 1.5,
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06
  });

  const darkChassis = new THREE.MeshStandardMaterial({
    color: 0x1b212b,
    roughness: 0.62,
    metalness: 0.55
  });

  const louverBlack = new THREE.MeshStandardMaterial({
    map: louverTex.map,
    bumpMap: louverTex.bumpMap,
    bumpScale: 0.02,
    roughness: 0.72,
    metalness: 0.35
  });

  const aluminumGrouser = new THREE.MeshStandardMaterial({
    map: alumTex.map,
    roughnessMap: alumTex.roughnessMap,
    bumpMap: alumTex.bumpMap,
    bumpScale: 0.012,
    roughness: 0.38,
    metalness: 0.82
  });

  const steelSpike = new THREE.MeshStandardMaterial({
    color: 0x333c48,
    roughness: 0.34,
    metalness: 0.88
  });

  const rubberBelt = new THREE.MeshStandardMaterial({
    color: 0x15181e,
    roughness: 0.90,
    metalness: 0.04
  });

  const sprocketYellow = new THREE.MeshStandardMaterial({
    color: 0xeab308,
    roughness: 0.42,
    metalness: 0.35
  });

  const bladeSteel = new THREE.MeshStandardMaterial({
    map: bladeTex.map,
    roughnessMap: bladeTex.roughnessMap,
    bumpMap: bladeTex.bumpMap,
    bumpScale: 0.018,
    roughness: 0.52,
    metalness: 0.68
  });

  const cuttingEdge = new THREE.MeshStandardMaterial({
    color: 0xdbe5f0,
    roughness: 0.22,
    metalness: 0.94
  });

  const chromeRod = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.09,
    metalness: 0.98
  });

  const cylBarrel = new THREE.MeshStandardMaterial({
    color: 0x181e28,
    roughness: 0.42,
    metalness: 0.65
  });

  const hoseBlack = new THREE.MeshStandardMaterial({
    color: 0x11141a,
    roughness: 0.78,
    metalness: 0.12
  });

  const yellowFinisher = new THREE.MeshStandardMaterial({
    map: yellowTex.map,
    roughnessMap: yellowTex.roughnessMap,
    bumpMap: yellowTex.bumpMap,
    bumpScale: 0.025,
    roughness: 0.70,
    metalness: 0.02,
    side: THREE.DoubleSide
  });

  const tillerRed = new THREE.MeshPhysicalMaterial({
    color: 0xc8102e,
    roughness: 0.38,
    metalness: 0.22,
    clearcoat: 0.35
  });

  const winchSteel = new THREE.MeshStandardMaterial({
    color: 0x222935,
    roughness: 0.46,
    metalness: 0.72
  });

  const steelCable = new THREE.MeshStandardMaterial({
    color: 0xb8c5d4,
    roughness: 0.28,
    metalness: 0.92
  });

  // Emissive LED worklights, amber beacons, taillights & cockpit HUD (tuned for selective Bloom!)
  const ledWhite = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xe6f4ff,
    emissiveIntensity: 3.4,
    roughness: 0.12
  });

  const beaconAmber = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xff8c00,
    emissiveIntensity: 3.8,
    roughness: 0.18,
    transparent: true,
    opacity: 0.92
  });

  const tailRed = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xff1e2d,
    emissiveIntensity: 2.8,
    roughness: 0.2
  });

  const snowsatScreen = new THREE.MeshStandardMaterial({
    map: snowsatTex,
    emissiveMap: snowsatTex,
    emissive: 0xffffff,
    emissiveIntensity: 1.45,
    roughness: 0.15
  });

  // Drivetrain & Hydraulics X-Ray internal materials
  const engineBlock = new THREE.MeshStandardMaterial({
    color: 0x3b4454,
    roughness: 0.52,
    metalness: 0.74
  });
  const engineValveCover = new THREE.MeshStandardMaterial({
    color: 0x1e2530,
    roughness: 0.38,
    metalness: 0.60
  });
  const pumpGold = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    roughness: 0.36,
    metalness: 0.75
  });
  const planetarySteel = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    roughness: 0.34,
    metalness: 0.85
  });
  const hydroHighPressure = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xf97316,
    emissiveIntensity: 1.65,
    roughness: 0.28,
    metalness: 0.25
  });
  const hydroLowReturn = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    emissive: 0x0ea5e9,
    emissiveIntensity: 1.25,
    roughness: 0.30,
    metalness: 0.22
  });
  const hydroTillerLine = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xfacc15,
    emissiveIntensity: 1.55,
    roughness: 0.28,
    metalness: 0.25
  });
  const hydroWinchLine = new THREE.MeshStandardMaterial({
    color: 0xa855f7,
    emissive: 0xc084fc,
    emissiveIntensity: 1.45,
    roughness: 0.28,
    metalness: 0.25
  });

  const snowSlope = createSnowSlopeMaterial();
  const particleSprite = createSoftParticleTexture();

  return {
    redBody,
    redLivery,
    xrayShell,
    cabGlass,
    darkChassis,
    louverBlack,
    aluminumGrouser,
    steelSpike,
    rubberBelt,
    sprocketYellow,
    bladeSteel,
    cuttingEdge,
    chromeRod,
    cylBarrel,
    hoseBlack,
    yellowFinisher,
    tillerRed,
    winchSteel,
    steelCable,
    ledWhite,
    beaconAmber,
    tailRed,
    snowsatScreen,
    engineBlock,
    engineValveCover,
    pumpGold,
    planetarySteel,
    hydroHighPressure,
    hydroLowReturn,
    hydroTillerLine,
    hydroWinchLine,
    snowSlope,
    particleSprite
  };
}
