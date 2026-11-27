// Procedural High-DPI Jumbo-Index Canvas Textures for 3D Spider Solitaire
// Generates 52 crisp 768x1075 high-contrast cards with oversized Jumbo header indices & simplified bold center symbols.

import * as THREE from 'three';
import { SUITS, RANK_LABELS } from './sol3d-logic.js';

export const TABLE_SURFACES = [
  { id: 'filz', label: 'Filz', roughness: 0.95, metalness: 0.0, bumpScale: 0.007 },
  { id: 'holz', label: 'Holz', roughness: 0.50, metalness: 0.02, bumpScale: 0.005 },
  { id: 'leder', label: 'Leder', roughness: 0.62, metalness: 0.02, bumpScale: 0.008 },
  { id: 'matt', label: 'Matt', roughness: 0.90, metalness: 0.0, bumpScale: 0.002 }
];

export const TABLE_COLOR_PRESETS = [
  { id: 'poker_green', label: 'Helles Poker-Grün', hex: '#227b4e' },
  { id: 'casino_green', label: 'Klassisches Kasino-Grün', hex: '#134d34' },
  { id: 'sage_green', label: 'Salbei-Grün', hex: '#739982' },
  { id: 'natural_wood', label: 'Helles Naturholz / Eiche', hex: '#c49f68' },
  { id: 'sand_cream', label: 'Warmes Sand / Creme', hex: '#ded3be' },
  { id: 'stone_gray', label: 'Helles Steingrau', hex: '#abb4ba' },
  { id: 'smoke_blue', label: 'Helles Rauchblau', hex: '#6889a5' },
  { id: 'anthracite', label: 'Dunkles Anthrazit', hex: '#20262c' }
];

export const DEFAULT_TABLE_SURFACE = 'filz';
export const DEFAULT_TABLE_COLOR = '#134d34';

export function parseHexColor(hex) {
  let c = String(hex || '#134d34').replace('#', '').trim();
  if (c.length === 3) {
    c = c.split('').map((ch) => ch + ch).join('');
  }
  const num = parseInt(c, 16);
  if (Number.isNaN(num)) return { r: 19, g: 77, b: 52 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

export function adjustRgb(rgb, factor) {
  return {
    r: Math.max(0, Math.min(255, Math.round(rgb.r * factor))),
    g: Math.max(0, Math.min(255, Math.round(rgb.g * factor))),
    b: Math.max(0, Math.min(255, Math.round(rgb.b * factor)))
  };
}

export function rgbToCss(rgb, alpha = 1) {
  if (alpha < 1) {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
  }
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function drawRoundedRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function drawSuitPip(ctx, suitKey, cx, cy, size, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = color;
  ctx.beginPath();

  const s = size * 0.5;
  if (suitKey === 'hearts') {
    ctx.moveTo(0, s * 0.88);
    ctx.bezierCurveTo(-s * 1.15, s * 0.12, -s * 1.08, -s * 0.88, -s * 0.45, -s * 0.88);
    ctx.bezierCurveTo(-s * 0.14, -s * 0.88, 0, -s * 0.56, 0, -s * 0.42);
    ctx.bezierCurveTo(0, -s * 0.56, s * 0.14, -s * 0.88, s * 0.45, -s * 0.88);
    ctx.bezierCurveTo(s * 1.08, -s * 0.88, s * 1.15, s * 0.12, 0, s * 0.88);
  } else if (suitKey === 'diamonds') {
    ctx.moveTo(0, -s * 0.96);
    ctx.quadraticCurveTo(s * 0.28, -s * 0.28, s * 0.88, 0);
    ctx.quadraticCurveTo(s * 0.28, s * 0.28, 0, s * 0.96);
    ctx.quadraticCurveTo(-s * 0.28, s * 0.28, -s * 0.88, 0);
    ctx.quadraticCurveTo(-s * 0.28, -s * 0.28, 0, -s * 0.96);
  } else if (suitKey === 'spades') {
    ctx.moveTo(0, -s * 0.96);
    ctx.bezierCurveTo(s * 1.1, -s * 0.1, s * 1.05, s * 0.64, s * 0.42, s * 0.64);
    ctx.bezierCurveTo(s * 0.18, s * 0.64, s * 0.08, s * 0.48, s * 0.06, s * 0.42);
    ctx.quadraticCurveTo(s * 0.12, s * 0.78, s * 0.34, s * 0.94);
    ctx.lineTo(-s * 0.34, s * 0.94);
    ctx.quadraticCurveTo(-s * 0.12, s * 0.78, -s * 0.06, s * 0.42);
    ctx.bezierCurveTo(-s * 0.08, s * 0.48, -s * 0.18, s * 0.64, -s * 0.42, s * 0.64);
    ctx.bezierCurveTo(-s * 1.05, s * 0.64, -s * 1.1, -s * 0.1, 0, -s * 0.96);
  } else {
    // clubs
    const r = s * 0.38;
    ctx.arc(0, -s * 0.42, r, 0, Math.PI * 2);
    ctx.moveTo(-s * 0.42 + r, s * 0.16);
    ctx.arc(-s * 0.42, s * 0.16, r, 0, Math.PI * 2);
    ctx.moveTo(s * 0.42 + r, s * 0.16);
    ctx.arc(s * 0.42, s * 0.16, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.1);
    ctx.quadraticCurveTo(s * 0.1, s * 0.68, s * 0.34, s * 0.94);
    ctx.lineTo(-s * 0.34, s * 0.94);
    ctx.quadraticCurveTo(-s * 0.1, s * 0.68, 0, -s * 0.1);
  }

  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawPaperBase(ctx, w, h) {
  // Pure bright white matte paper for maximum contrast
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);

  // Subtle cool-neutral header band for instant visual separation of stacked cards
  ctx.fillStyle = 'rgba(15, 23, 36, 0.045)';
  ctx.fillRect(0, 0, w, 224);
  ctx.fillRect(0, h - 224, w, 224);

  // Crisp header divider line
  ctx.strokeStyle = 'rgba(18, 26, 38, 0.16)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(20, 224);
  ctx.lineTo(w - 20, 224);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(20, h - 224);
  ctx.lineTo(w - 20, h - 224);
  ctx.stroke();

  // Sharp dark outer border so every overlapping card casts a crisp silhouette edge
  ctx.save();
  ctx.strokeStyle = 'rgba(12, 18, 28, 0.62)';
  ctx.lineWidth = 8;
  drawRoundedRectPath(ctx, 4, 4, w - 8, h - 8, 42);
  ctx.stroke();
  ctx.restore();
}

function drawCourtCardArt(ctx, w, h, rank, suitKey, suitColor, isRed) {
  const cx = w * 0.5;
  const cy = h * 0.5;
  const boxW = w * 0.72;
  const boxH = h * 0.48;
  const bx = cx - boxW * 0.5;
  const by = cy - boxH * 0.5;
  const gold = '#b38632';
  const goldLight = '#e8c87d';
  const accentSoft = isRed ? 'rgba(217, 15, 28, 0.06)' : 'rgba(11, 15, 23, 0.05)';

  ctx.save();
  drawRoundedRectPath(ctx, bx, by, boxW, boxH, 24);
  ctx.fillStyle = accentSoft;
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = gold;
  ctx.stroke();

  if (rank === 13) {
    // Bold King crown + large suit symbol
    ctx.save();
    ctx.translate(cx, cy - 92);
    ctx.fillStyle = goldLight;
    ctx.strokeStyle = '#6b4a10';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(-96, 42);
    ctx.lineTo(-108, -36);
    ctx.lineTo(-48, 8);
    ctx.lineTo(0, -68);
    ctx.lineTo(48, 8);
    ctx.lineTo(108, -36);
    ctx.lineTo(96, 42);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = suitColor;
    [[-108, -42], [0, -76], [108, -42]].forEach(([jx, jy]) => {
      ctx.beginPath();
      ctx.arc(jx, jy, 10, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = gold;
    ctx.fillRect(-96, 42, 192, 22);
    ctx.strokeRect(-96, 42, 192, 22);
    ctx.restore();

    drawSuitPip(ctx, suitKey, cx, cy + 104, 210, suitColor);
  } else if (rank === 12) {
    // Bold Queen tiara + large suit symbol
    ctx.save();
    ctx.translate(cx, cy - 88);
    ctx.fillStyle = goldLight;
    ctx.strokeStyle = '#6b4a10';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(-88, 38);
    ctx.quadraticCurveTo(-92, -16, -44, -8);
    ctx.quadraticCurveTo(0, -72, 0, -72);
    ctx.quadraticCurveTo(0, -72, 44, -8);
    ctx.quadraticCurveTo(92, -16, 88, 38);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = suitColor;
    ctx.beginPath();
    ctx.arc(0, -28, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fffaf0';
    [[-48, -8], [48, -8]].forEach(([px, py]) => {
      ctx.beginPath();
      ctx.arc(px, py, 9.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();

    drawSuitPip(ctx, suitKey, cx, cy + 104, 210, suitColor);
  } else {
    // Bold Jack shield + large suit symbol
    ctx.save();
    ctx.translate(cx, cy - 82);
    ctx.fillStyle = '#f6eedb';
    ctx.strokeStyle = gold;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-68, -62);
    ctx.lineTo(68, -62);
    ctx.lineTo(68, 12);
    ctx.quadraticCurveTo(68, 72, 0, 96);
    ctx.quadraticCurveTo(-68, 72, -68, 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = suitColor;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-50, -36);
    ctx.lineTo(50, 44);
    ctx.stroke();
    ctx.restore();

    drawSuitPip(ctx, suitKey, cx, cy + 106, 200, suitColor);
  }

  ctx.restore();
}

function createCardFaceTexture(card, maxAnisotropy) {
  const w = 768;
  const h = 1075;
  const texW = 512;
  const texH = 716;
  const canvas = document.createElement('canvas');
  canvas.width = texW;
  canvas.height = texH;
  const ctx = canvas.getContext('2d');
  ctx.scale(texW / w, texH / h);

  drawPaperBase(ctx, w, h);

  const isRed = card.color === 'red';
  const inkColor = isRed ? '#d90f1c' : '#090d14';
  const rankStr = RANK_LABELS[card.rank];

  // Jumbo-Index Header: giant sans-serif bold Rank + giant Suit Pip side-by-side in top 20.8% strip
  const drawHeader = (flipped) => {
    ctx.save();
    if (flipped) {
      ctx.translate(w, h);
      ctx.rotate(Math.PI);
    }

    ctx.fillStyle = inkColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.save();
    const isTen = card.rank === 10;
    const fontSize = isTen ? 182 : 196;
    ctx.font = `900 ${fontSize}px "Plus Jakarta Sans", "Outfit", Arial, sans-serif`;
    ctx.translate(isTen ? 190 : 178, 118);
    if (isTen) {
      ctx.scale(0.80, 1);
    }
    ctx.fillText(rankStr, 0, 0);
    ctx.restore();

    // Giant Suit Symbol clearly next to Rank
    drawSuitPip(ctx, card.suit, w - 182, 114, 174, inkColor);

    ctx.restore();
  };

  drawHeader(false);
  drawHeader(true);

  // Simplified, crystal-clear center symbol (no tiny cluttered pips)
  if (card.rank === 1) {
    ctx.save();
    ctx.strokeStyle = 'rgba(179, 134, 50, 0.45)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, 210, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    drawSuitPip(ctx, card.suit, w * 0.5, h * 0.5, 360, inkColor);
  } else if (card.rank >= 11) {
    drawCourtCardArt(ctx, w, h, card.rank, card.suit, inkColor, isRed);
  } else {
    // Clean single oversized central suit symbol for 2-10
    ctx.save();
    ctx.strokeStyle = isRed ? 'rgba(217, 15, 28, 0.14)' : 'rgba(9, 13, 20, 0.12)';
    ctx.lineWidth = 4;
    drawRoundedRectPath(ctx, w * 0.16, 260, w * 0.68, h - 520, 24);
    ctx.stroke();
    ctx.restore();
    drawSuitPip(ctx, card.suit, w * 0.5, h * 0.5, 320, inkColor);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

function createCardBackTexture(maxAnisotropy) {
  const w = 768;
  const h = 1075;
  const texW = 512;
  const texH = 716;
  const canvas = document.createElement('canvas');
  canvas.width = texW;
  canvas.height = texH;
  const ctx = canvas.getContext('2d');
  ctx.scale(texW / w, texH / h);

  // Crisp bright edge for clear separation between stacked face-down cards
  ctx.fillStyle = '#eff2f5';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(12, 18, 28, 0.55)';
  ctx.lineWidth = 8;
  drawRoundedRectPath(ctx, 4, 4, w - 8, h - 8, 42);
  ctx.stroke();

  const m = 34;
  drawRoundedRectPath(ctx, m, m, w - m * 2, h - m * 2, 26);
  const bg = ctx.createRadialGradient(w * 0.5, h * 0.5, 60, w * 0.5, h * 0.5, h * 0.58);
  bg.addColorStop(0, '#1d3758');
  bg.addColorStop(1, '#0d1b30');
  ctx.fillStyle = bg;
  ctx.fill();

  ctx.save();
  drawRoundedRectPath(ctx, m + 12, m + 12, w - (m + 12) * 2, h - (m + 12) * 2, 20);
  ctx.clip();

  ctx.strokeStyle = 'rgba(196, 174, 124, 0.25)';
  ctx.lineWidth = 2.2;
  const step = 52;
  for (let x = -h; x < w + h; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + h, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x - h, h);
    ctx.stroke();
  }
  ctx.restore();

  ctx.strokeStyle = '#c4a664';
  ctx.lineWidth = 4.5;
  drawRoundedRectPath(ctx, m + 14, m + 14, w - (m + 14) * 2, h - (m + 14) * 2, 18);
  ctx.stroke();

  const cx = w * 0.5;
  const cy = h * 0.5;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = '#122640';
  ctx.beginPath();
  ctx.arc(0, 0, 102, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#c4a664';
  ctx.stroke();

  for (let i = 0; i < 8; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 4);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(22, -38, 0, -78);
    ctx.quadraticCurveTo(-22, -38, 0, 0);
    ctx.fillStyle = i % 2 === 0 ? 'rgba(212, 182, 114, 0.85)' : 'rgba(212, 182, 114, 0.38)';
    ctx.fill();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.fillStyle = '#efe0b4';
  ctx.fill();
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

export function createTableTexture(surfaceType = 'filz', colorHex = '#134d34', maxAnisotropy = 4) {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const baseRgb = parseHexColor(colorHex);
  const centerRgb = adjustRgb(baseRgb, 1.14);
  const midRgb = adjustRgb(baseRgb, 0.98);
  const edgeRgb = adjustRgb(baseRgb, 0.68);

  const grad = ctx.createRadialGradient(size * 0.5, size * 0.40, size * 0.08, size * 0.5, size * 0.5, size * 0.72);
  grad.addColorStop(0, rgbToCss(centerRgb));
  grad.addColorStop(0.55, rgbToCss(midRgb));
  grad.addColorStop(1, rgbToCss(edgeRgb));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  if (surfaceType === 'filz') {
    // Dense fine felt fibers & micro-stippling (matte & anti-glare)
    for (let i = 0; i < 28000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const alpha = Math.random() * 0.048;
      ctx.fillStyle = i % 3 === 0 ? `rgba(255,255,255,${alpha * 0.32})` : `rgba(0,0,0,${alpha})`;
      ctx.fillRect(x, y, 1.7, 1.7);
    }
  } else if (surfaceType === 'holz') {
    // Natural wood grain: wavy growth rings & elongated grain pores
    for (let y = 0; y < size; y++) {
      const wave = Math.sin(y * 0.038) * 14 + Math.sin(y * 0.12) * 5;
      const tone = Math.sin(y * 0.065 + wave * 0.04);
      const factor = 1.0 + tone * 0.08;
      const r = Math.round(Math.min(255, baseRgb.r * factor));
      const g = Math.round(Math.min(255, baseRgb.g * factor));
      const b = Math.round(Math.min(255, baseRgb.b * factor));
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, y, size, 1.5);
    }
    // Subtle wood grain streaks
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 220; i++) {
      const y0 = Math.random() * size;
      const alpha = 0.04 + Math.random() * 0.08;
      ctx.strokeStyle = i % 2 === 0 ? `rgba(0,0,0,${alpha})` : `rgba(255,255,255,${alpha * 0.35})`;
      ctx.beginPath();
      ctx.moveTo(0, y0);
      ctx.bezierCurveTo(
        size * 0.33,
        y0 + (Math.random() - 0.5) * 16,
        size * 0.66,
        y0 + (Math.random() - 0.5) * 16,
        size,
        y0 + (Math.random() - 0.5) * 12
      );
      ctx.stroke();
    }
  } else if (surfaceType === 'leder') {
    // Nappa leather pebble cells & soft crevices
    const cellSize = 14;
    const cols = Math.ceil(size / cellSize);
    for (let py = 0; py < cols; py++) {
      for (let px = 0; px < cols; px++) {
        const cx = px * cellSize + (Math.random() - 0.5) * 4;
        const cy = py * cellSize + (Math.random() - 0.5) * 4;
        const rad = (cellSize * 0.52) * (0.8 + Math.random() * 0.4);
        const cellGrad = ctx.createRadialGradient(cx, cy, 1, cx, cy, rad);
        cellGrad.addColorStop(0, 'rgba(255,255,255,0.06)');
        cellGrad.addColorStop(0.7, 'rgba(255,255,255,0.01)');
        cellGrad.addColorStop(1, 'rgba(0,0,0,0.11)');
        ctx.fillStyle = cellGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else {
    // 'matt': ultra-smooth with delicate anti-banding dither
    for (let i = 0; i < 12000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const alpha = Math.random() * 0.022;
      ctx.fillStyle = i % 2 === 0 ? `rgba(255,255,255,${alpha * 0.3})` : `rgba(0,0,0,${alpha})`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

export function createTableBumpTexture(surfaceType = 'filz') {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  if (surfaceType === 'filz') {
    for (let i = 0; i < 18000; i++) {
      const v = 106 + Math.floor(Math.random() * 44);
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(Math.random() * size, Math.random() * size, 2, 2);
    }
  } else if (surfaceType === 'holz') {
    for (let y = 0; y < size; y++) {
      const v = Math.round(128 + Math.sin(y * 0.09) * 22 + Math.sin(y * 0.22) * 8);
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(0, y, size, 1.5);
    }
  } else if (surfaceType === 'leder') {
    const cellSize = 12;
    const cols = Math.ceil(size / cellSize);
    for (let py = 0; py < cols; py++) {
      for (let px = 0; px < cols; px++) {
        const cx = px * cellSize;
        const cy = py * cellSize;
        const rad = cellSize * 0.55;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, 'rgb(148,148,148)');
        g.addColorStop(1, 'rgb(112,112,112)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else {
    // 'matt'
    for (let i = 0; i < 6000; i++) {
      const v = 124 + Math.floor(Math.random() * 8);
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(Math.random() * size, Math.random() * size, 1.5, 1.5);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  tex.needsUpdate = true;
  return tex;
}

function createWoodTexture(maxAnisotropy) {
  return createTableTexture('holz', '#29130b', maxAnisotropy);
}

function createSlotDecalTexture(kind, maxAnisotropy) {
  const w = 256;
  const h = 360;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, w, h);

  // Dark semi-transparent base so slot is clearly visible on white/sand as well as dark felt
  drawRoundedRectPath(ctx, 8, 8, w - 16, h - 16, 20);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.30)';
  ctx.fill();

  // Dark outer outline
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.52)';
  ctx.stroke();

  // Crisp inner light outline
  drawRoundedRectPath(ctx, 11, 11, w - 22, h - 22, 17);
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.42)';
  ctx.stroke();

  // Centered labels with drop shadow for universal legibility
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (kind === 'stock') {
    ctx.font = '800 58px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('10×', w * 0.5, h * 0.5);
  } else if (kind === 'foundation') {
    ctx.font = '800 66px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('K–A', w * 0.5, h * 0.43);
    ctx.font = '600 36px serif';
    ctx.fillText('♠ ♥', w * 0.5, h * 0.65);
  } else if (kind === 'tableau') {
    ctx.font = '700 46px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('—', w * 0.5, h * 0.5);
  }
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  tex.needsUpdate = true;
  return tex;
}

export function createSolitaireAssets(maxAnisotropy = 4, surfaceType = DEFAULT_TABLE_SURFACE, colorHex = DEFAULT_TABLE_COLOR) {
  const aniso = Math.min(16, maxAnisotropy || 4);
  const backTex = createCardBackTexture(aniso);

  const faceTextures = [];
  let id = 0;
  for (let s = 0; s < 4; s++) {
    for (let r = 1; r <= 13; r++) {
      faceTextures[id] = createCardFaceTexture(
        { id, suit: SUITS[s].key, color: SUITS[s].color, rank: r },
        aniso
      );
      id++;
    }
  }

  return {
    faceTextures,
    backTex,
    tableTex: createTableTexture(surfaceType, colorHex, aniso),
    tableBump: createTableBumpTexture(surfaceType),
    woodTex: createWoodTexture(aniso),
    slotTextures: {
      stock: createSlotDecalTexture('stock', aniso),
      foundation: createSlotDecalTexture('foundation', aniso),
      tableau: createSlotDecalTexture('tableau', aniso)
    }
  };
}

