// Procedural High-DPI Canvas Textures for 3D Spider Solitaire
// Generates 52 crisp 768x1075 high-contrast card faces, matte card back, dark calm felt, walnut rim, and slot decals.

import * as THREE from 'three';
import { SUITS, RANK_LABELS } from './sol3d-logic.js';

export const TABLE_THEME = {
  id: 'dark_felt',
  label: 'Dunkler Filz',
  center: '#153d2e',
  mid: '#0e2b20',
  edge: '#071710',
  bgHex: 0x07140f
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
    ctx.quadraticCurveTo(s * 0.28, -s * 0.28, s * 0.86, 0);
    ctx.quadraticCurveTo(s * 0.28, s * 0.28, 0, s * 0.96);
    ctx.quadraticCurveTo(-s * 0.28, s * 0.28, -s * 0.86, 0);
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

const PIP_LAYOUTS = {
  2: [[0.5, 0.22, false], [0.5, 0.78, true]],
  3: [[0.5, 0.2, false], [0.5, 0.5, false], [0.5, 0.8, true]],
  4: [[0.3, 0.22, false], [0.7, 0.22, false], [0.3, 0.78, true], [0.7, 0.78, true]],
  5: [[0.3, 0.22, false], [0.7, 0.22, false], [0.5, 0.5, false], [0.3, 0.78, true], [0.7, 0.78, true]],
  6: [[0.3, 0.2, false], [0.7, 0.2, false], [0.3, 0.5, false], [0.7, 0.5, false], [0.3, 0.8, true], [0.7, 0.8, true]],
  7: [
    [0.3, 0.2, false], [0.7, 0.2, false], [0.5, 0.35, false],
    [0.3, 0.5, false], [0.7, 0.5, false], [0.3, 0.8, true], [0.7, 0.8, true]
  ],
  8: [
    [0.3, 0.2, false], [0.7, 0.2, false], [0.5, 0.35, false],
    [0.3, 0.5, false], [0.7, 0.5, false], [0.5, 0.65, true],
    [0.3, 0.8, true], [0.7, 0.8, true]
  ],
  9: [
    [0.3, 0.18, false], [0.7, 0.18, false],
    [0.3, 0.39, false], [0.7, 0.39, false],
    [0.5, 0.5, false],
    [0.3, 0.61, true], [0.7, 0.61, true],
    [0.3, 0.82, true], [0.7, 0.82, true]
  ],
  10: [
    [0.3, 0.18, false], [0.7, 0.18, false], [0.5, 0.29, false],
    [0.3, 0.39, false], [0.7, 0.39, false],
    [0.3, 0.61, true], [0.7, 0.61, true],
    [0.5, 0.71, true],
    [0.3, 0.82, true], [0.7, 0.82, true]
  ]
};

function drawPaperBase(ctx, w, h) {
  // Clean bright matte white-ivory surface for maximum contrast with red & black inks
  const grad = ctx.createRadialGradient(w * 0.5, h * 0.45, w * 0.1, w * 0.5, h * 0.5, h * 0.75);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(1, '#f4f2ec');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Subtle top header tint band so stacked cards separate cleanly at a glance
  ctx.fillStyle = 'rgba(15, 23, 36, 0.03)';
  ctx.fillRect(0, 0, w, 178);
  ctx.fillRect(0, h - 178, w, 178);

  // Thin crisp header separator line
  ctx.strokeStyle = 'rgba(20, 28, 40, 0.11)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(22, 178);
  ctx.lineTo(w - 22, 178);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(22, h - 178);
  ctx.lineTo(w - 22, h - 178);
  ctx.stroke();

  // Crisp perimeter border so overlapping cards always show a sharp edge
  ctx.save();
  ctx.strokeStyle = 'rgba(18, 24, 34, 0.42)';
  ctx.lineWidth = 6;
  drawRoundedRectPath(ctx, 3, 3, w - 6, h - 6, 44);
  ctx.stroke();
  ctx.restore();
}

function drawCourtCardArt(ctx, w, h, rank, suitKey, suitColor, isRed) {
  const cx = w * 0.5;
  const cy = h * 0.5;
  const boxW = w * 0.64;
  const boxH = h * 0.54;
  const bx = cx - boxW * 0.5;
  const by = cy - boxH * 0.5;
  const gold = '#b38632';
  const goldLight = '#e4c377';
  const accentSoft = isRed ? 'rgba(216, 18, 32, 0.07)' : 'rgba(14, 20, 30, 0.06)';

  ctx.save();
  drawRoundedRectPath(ctx, bx, by, boxW, boxH, 20);
  ctx.fillStyle = accentSoft;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = gold;
  ctx.stroke();

  drawRoundedRectPath(ctx, bx + 12, by + 12, boxW - 24, boxH - 24, 14);
  ctx.lineWidth = 2;
  ctx.strokeStyle = suitColor;
  ctx.globalAlpha = 0.45;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Central medallion
  ctx.beginPath();
  ctx.arc(cx, cy, 114, 0, Math.PI * 2);
  ctx.fillStyle = '#fcfaf4';
  ctx.fill();
  ctx.lineWidth = 4.5;
  ctx.strokeStyle = gold;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, 98, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = suitColor;
  ctx.globalAlpha = 0.55;
  ctx.stroke();
  ctx.globalAlpha = 1;

  if (rank === 13) {
    // King: royal crown
    ctx.save();
    ctx.translate(cx, cy - 22);
    ctx.fillStyle = goldLight;
    ctx.strokeStyle = '#755215';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(-72, 32);
    ctx.lineTo(-80, -28);
    ctx.lineTo(-36, 4);
    ctx.lineTo(0, -52);
    ctx.lineTo(36, 4);
    ctx.lineTo(80, -28);
    ctx.lineTo(72, 32);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = suitColor;
    [[-80, -34], [0, -58], [80, -34]].forEach(([jx, jy]) => {
      ctx.beginPath();
      ctx.arc(jx, jy, 7.5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = gold;
    ctx.fillRect(-72, 32, 144, 18);
    ctx.strokeRect(-72, 32, 144, 18);
    ctx.restore();

    drawSuitPip(ctx, suitKey, cx, cy + 54, 62, suitColor);
  } else if (rank === 12) {
    // Queen: tiara
    ctx.save();
    ctx.translate(cx, cy - 20);
    ctx.fillStyle = goldLight;
    ctx.strokeStyle = '#755215';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(-64, 30);
    ctx.quadraticCurveTo(-66, -12, -32, -6);
    ctx.quadraticCurveTo(0, -54, 0, -54);
    ctx.quadraticCurveTo(0, -54, 32, -6);
    ctx.quadraticCurveTo(66, -12, 64, 30);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = suitColor;
    ctx.beginPath();
    ctx.arc(0, -22, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff9ec';
    [[-36, -6], [36, -6]].forEach(([px, py]) => {
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();

    drawSuitPip(ctx, suitKey, cx, cy + 50, 62, suitColor);
  } else {
    // Jack: knight shield
    ctx.save();
    ctx.translate(cx, cy - 6);
    ctx.fillStyle = '#f6eedb';
    ctx.strokeStyle = gold;
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(-54, -52);
    ctx.lineTo(54, -52);
    ctx.lineTo(54, 8);
    ctx.quadraticCurveTo(54, 60, 0, 82);
    ctx.quadraticCurveTo(-54, 60, -54, 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = suitColor;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(-42, -32);
    ctx.lineTo(42, 36);
    ctx.stroke();
    ctx.restore();

    drawSuitPip(ctx, suitKey, cx, cy + 4, 64, suitColor);
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
  const inkColor = isRed ? '#d81320' : '#0b0f17';
  const rankStr = RANK_LABELS[card.rank];

  // Generous high-contrast header indices (top 16.5% of card) so stacked columns remain effortlessly readable
  const drawHeader = (flipped) => {
    ctx.save();
    if (flipped) {
      ctx.translate(w, h);
      ctx.rotate(Math.PI);
    }

    ctx.fillStyle = inkColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Large bold rank on top-left
    ctx.save();
    const fontSize = card.rank === 10 ? 114 : 128;
    ctx.font = `800 ${fontSize}px "Outfit", "Plus Jakarta Sans", system-ui, -apple-system, sans-serif`;
    ctx.translate(card.rank === 10 ? 132 : 114, 92);
    if (card.rank === 10) {
      ctx.scale(0.86, 1);
    }
    ctx.fillText(rankStr, 0, 0);
    ctx.restore();

    // Crisp medium suit pip beside rank (center-left of header) and huge suit pip top-right
    drawSuitPip(ctx, card.suit, card.rank === 10 ? 268 : 242, 92, 74, inkColor);
    drawSuitPip(ctx, card.suit, w - 108, 92, 110, inkColor);

    ctx.restore();
  };

  drawHeader(false);
  drawHeader(true);

  // Center artwork (kept cleanly inside y = 205..870 away from header strips)
  if (card.rank === 1) {
    ctx.save();
    ctx.strokeStyle = 'rgba(179, 134, 50, 0.45)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, 148, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, 128, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(179, 134, 50, 0.22)';
    ctx.stroke();
    ctx.restore();
    drawSuitPip(ctx, card.suit, w * 0.5, h * 0.5, 224, inkColor);
  } else if (card.rank >= 11) {
    drawCourtCardArt(ctx, w, h, card.rank, card.suit, inkColor, isRed);
  } else {
    const pips = PIP_LAYOUTS[card.rank];
    const padX = 128;
    const padY = 175;
    const innerW = w - padX * 2;
    const innerH = h - padY * 2;
    const pipSize = card.rank <= 5 ? 104 : 92;
    for (const [nx, ny, inv] of pips) {
      const px = padX + nx * innerW;
      const py = padY + ny * innerH;
      ctx.save();
      ctx.translate(px, py);
      if (inv) ctx.rotate(Math.PI);
      drawSuitPip(ctx, card.suit, 0, 0, pipSize, inkColor);
      ctx.restore();
    }
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

  // Crisp ivory edge so stacked face-down cards clearly separate
  ctx.fillStyle = '#eceae3';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(15, 22, 32, 0.45)';
  ctx.lineWidth = 6;
  drawRoundedRectPath(ctx, 3, 3, w - 6, h - 6, 44);
  ctx.stroke();

  const m = 34;
  drawRoundedRectPath(ctx, m, m, w - m * 2, h - m * 2, 26);
  const bg = ctx.createRadialGradient(w * 0.5, h * 0.5, 60, w * 0.5, h * 0.5, h * 0.58);
  bg.addColorStop(0, '#1d3758');
  bg.addColorStop(1, '#0e1d32');
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

  // Center emblem
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

  // Calm dark high-contrast felt with soft radial shading and no distracting bright lines
  const grad = ctx.createRadialGradient(size * 0.5, size * 0.45, size * 0.08, size * 0.5, size * 0.5, size * 0.72);
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
  tex.repeat.set(5, 4);
  tex.needsUpdate = true;
  return tex;
}

function createWoodTexture(maxAnisotropy) {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#2c150c';
  ctx.fillRect(0, 0, size, size);

  for (let y = 0; y < size; y++) {
    const wave = Math.sin(y * 0.05) * 12 + Math.sin(y * 0.19) * 4;
    const tone = Math.sin(y * 0.09 + wave * 0.05);
    const r = Math.round(44 + tone * 12);
    const g = Math.round(22 + tone * 6);
    const b = Math.round(13 + tone * 4);
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
    ctx.font = '700 52px "Outfit", sans-serif';
    ctx.fillText('10×', w * 0.5, h * 0.5);
  } else if (kind === 'foundation') {
    ctx.font = '700 62px "Outfit", sans-serif';
    ctx.fillText('K–A', w * 0.5, h * 0.44);
    ctx.font = '500 32px serif';
    ctx.fillText('♠ ♥', w * 0.5, h * 0.62);
  } else if (kind === 'tableau') {
    ctx.font = '600 40px "Outfit", sans-serif';
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
