// Procedural High-DPI Jumbo-Index Canvas Textures for 3D Spider Solitaire
// Generates 52 crisp 768x1075 high-contrast cards with oversized Jumbo header indices & simplified bold center symbols.

import * as THREE from 'three';
import { SUITS, RANK_LABELS } from './sol3d-logic.js';

export const TABLE_THEME = {
  id: 'dark_felt',
  label: 'Dunkler Filz',
  center: '#133a2b',
  mid: '#0c271d',
  edge: '#06150f',
  bgHex: 0x06130e
};

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
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

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
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

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

function createFeltTexture(themeCfg, maxAnisotropy) {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(size * 0.5, size * 0.38, size * 0.08, size * 0.5, size * 0.5, size * 0.72);
  grad.addColorStop(0, themeCfg.center);
  grad.addColorStop(0.58, themeCfg.mid);
  grad.addColorStop(1, themeCfg.edge);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 20000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const alpha = Math.random() * 0.045;
    ctx.fillStyle = i % 3 === 0 ? `rgba(255,255,255,${alpha * 0.35})` : `rgba(0,0,0,${alpha})`;
    ctx.fillRect(x, y, 1.8, 1.8);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  tex.needsUpdate = true;
  return tex;
}

function createFeltBumpTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 14000; i++) {
    const v = 104 + Math.floor(Math.random() * 48);
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.fillRect(Math.random() * size, Math.random() * size, 2, 2);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 5);
  tex.needsUpdate = true;
  return tex;
}

function createWoodTexture(maxAnisotropy) {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#29130b';
  ctx.fillRect(0, 0, size, size);

  for (let y = 0; y < size; y++) {
    const wave = Math.sin(y * 0.05) * 12 + Math.sin(y * 0.19) * 4;
    const tone = Math.sin(y * 0.09 + wave * 0.05);
    const r = Math.round(41 + tone * 11);
    const g = Math.round(20 + tone * 6);
    const b = Math.round(12 + tone * 4);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, y, size, 1.5);
  }

  ctx.strokeStyle = 'rgba(12, 5, 2, 0.28)';
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 120; i++) {
    const y0 = Math.random() * size;
    ctx.beginPath();
    ctx.moveTo(0, y0);
    ctx.bezierCurveTo(
      size * 0.33,
      y0 + (Math.random() - 0.5) * 16,
      size * 0.66,
      y0 + (Math.random() - 0.5) * 16,
      size,
      y0 + (Math.random() - 0.5) * 10
    );
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = maxAnisotropy;
  tex.needsUpdate = true;
  return tex;
}

function createSlotDecalTexture(kind, maxAnisotropy) {
  const w = 256;
  const h = 360;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, w, h);

  drawRoundedRectPath(ctx, 8, 8, w - 16, h - 16, 18);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(218, 224, 214, 0.24)';
  ctx.stroke();

  ctx.fillStyle = 'rgba(220, 226, 216, 0.32)';
  ctx.strokeStyle = 'rgba(220, 226, 216, 0.32)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (kind === 'stock') {
    ctx.font = '700 58px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('10×', w * 0.5, h * 0.5);
  } else if (kind === 'foundation') {
    ctx.font = '700 66px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('K–A', w * 0.5, h * 0.44);
    ctx.font = '500 34px serif';
    ctx.fillText('♠ ♥', w * 0.5, h * 0.64);
  } else if (kind === 'tableau') {
    ctx.font = '600 42px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('—', w * 0.5, h * 0.5);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  tex.needsUpdate = true;
  return tex;
}

export function createSolitaireAssets(maxAnisotropy = 4) {
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
    feltTex: createFeltTexture(TABLE_THEME, aniso),
    feltBump: createFeltBumpTexture(),
    woodTex: createWoodTexture(aniso),
    slotTextures: {
      stock: createSlotDecalTexture('stock', aniso),
      foundation: createSlotDecalTexture('foundation', aniso),
      tableau: createSlotDecalTexture('tableau', aniso)
    }
  };
}
