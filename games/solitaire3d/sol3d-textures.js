// 100% Procedural High-DPI Canvas Textures for 3D Solitaire
// Generates 52 crisp 512x720 cards, ornamental back, linen bump, 3 felt themes, walnut wood grain, and slot decals.

import * as THREE from 'three';
import { SUITS, RANK_LABELS } from './sol3d-logic.js';

export const FELT_THEMES = {
  smaragd: {
    id: 'smaragd',
    label: 'Smaragd',
    center: '#195a41',
    mid: '#114230',
    edge: '#082319',
    dot: '#2b7a5a'
  },
  abendblau: {
    id: 'abendblau',
    label: 'Abendblau',
    center: '#1b3d63',
    mid: '#122b49',
    edge: '#091628',
    dot: '#305e91'
  },
  weinrot: {
    id: 'weinrot',
    label: 'Warmes Weinrot',
    center: '#611e2f',
    mid: '#441320',
    edge: '#230810',
    dot: '#843146'
  }
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
    ctx.quadraticCurveTo(s * 0.28, -s * 0.28, s * 0.84, 0);
    ctx.quadraticCurveTo(s * 0.28, s * 0.28, 0, s * 0.96);
    ctx.quadraticCurveTo(-s * 0.28, s * 0.28, -s * 0.84, 0);
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
  const grad = ctx.createRadialGradient(w * 0.5, h * 0.45, w * 0.15, w * 0.5, h * 0.5, h * 0.72);
  grad.addColorStop(0, '#fcfaf4');
  grad.addColorStop(1, '#f1eadc');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Subtle linen paper fibers
  ctx.save();
  ctx.strokeStyle = 'rgba(130, 112, 84, 0.035)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 6) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 6) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.restore();

  // Soft outer frame line
  ctx.save();
  ctx.strokeStyle = 'rgba(148, 128, 96, 0.24)';
  ctx.lineWidth = 2;
  drawRoundedRectPath(ctx, 14, 14, w - 28, h - 28, 22);
  ctx.stroke();
  ctx.restore();
}

function drawCourtCardArt(ctx, w, h, rank, suitKey, suitColor) {
  const cx = w * 0.5;
  const cy = h * 0.5;
  const boxW = w * 0.56;
  const boxH = h * 0.62;
  const bx = cx - boxW * 0.5;
  const by = cy - boxH * 0.5;
  const gold = '#b88f44';
  const goldLight = '#dfc17b';
  const accentSoft = suitColor === '#b91c1c' ? 'rgba(185, 28, 28, 0.07)' : 'rgba(20, 25, 35, 0.06)';

  ctx.save();
  // Ornate double court frame
  drawRoundedRectPath(ctx, bx, by, boxW, boxH, 14);
  ctx.fillStyle = accentSoft;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = gold;
  ctx.stroke();

  drawRoundedRectPath(ctx, bx + 8, by + 8, boxW - 16, boxH - 16, 10);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = suitColor;
  ctx.globalAlpha = 0.45;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Subtle diagonal lattice inside court frame
  ctx.save();
  drawRoundedRectPath(ctx, bx + 10, by + 10, boxW - 20, boxH - 20, 8);
  ctx.clip();
  ctx.strokeStyle = 'rgba(184, 143, 68, 0.14)';
  ctx.lineWidth = 1;
  for (let d = -boxH; d < boxW + boxH; d += 22) {
    ctx.beginPath();
    ctx.moveTo(bx + d, by);
    ctx.lineTo(bx + d - boxH * 0.6, by + boxH);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bx + d - boxH * 0.6, by);
    ctx.lineTo(bx + d, by + boxH);
    ctx.stroke();
  }
  ctx.restore();

  // Central heraldic medallion
  ctx.beginPath();
  ctx.arc(cx, cy, 78, 0, Math.PI * 2);
  ctx.fillStyle = '#fbf7ee';
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = gold;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, 68, 0, Math.PI * 2);
  ctx.lineWidth = 1.4;
  ctx.strokeStyle = suitColor;
  ctx.globalAlpha = 0.55;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Emblem by rank (J / Q / K)
  if (rank === 13) {
    // King: 5-point royal crown + crossed scepter accents
    ctx.save();
    ctx.translate(cx, cy - 16);
    ctx.fillStyle = goldLight;
    ctx.strokeStyle = '#7c591c';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-48, 22);
    ctx.lineTo(-54, -18);
    ctx.lineTo(-24, 2);
    ctx.lineTo(0, -34);
    ctx.lineTo(24, 2);
    ctx.lineTo(54, -18);
    ctx.lineTo(48, 22);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Crown jewels
    ctx.fillStyle = suitColor;
    [[-54, -22], [0, -38], [54, -22]].forEach(([jx, jy]) => {
      ctx.beginPath();
      ctx.arc(jx, jy, 5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = gold;
    ctx.fillRect(-48, 22, 96, 12);
    ctx.strokeRect(-48, 22, 96, 12);
    ctx.restore();

    drawSuitPip(ctx, suitKey, cx, cy + 36, 42, suitColor);
  } else if (rank === 12) {
    // Queen: Elegant tiara + botanical petals
    ctx.save();
    ctx.translate(cx, cy - 14);
    ctx.fillStyle = goldLight;
    ctx.strokeStyle = '#7c591c';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(-42, 20);
    ctx.quadraticCurveTo(-44, -8, -22, -4);
    ctx.quadraticCurveTo(0, -36, 0, -36);
    ctx.quadraticCurveTo(0, -36, 22, -4);
    ctx.quadraticCurveTo(44, -8, 42, 20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Rose / pearl dots
    ctx.fillStyle = suitColor;
    ctx.beginPath();
    ctx.arc(0, -14, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff9ec';
    [[-24, -4], [24, -4]].forEach(([px, py]) => {
      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();

    drawSuitPip(ctx, suitKey, cx, cy + 34, 42, suitColor);
  } else {
    // Jack: Knight shield crest + plume
    ctx.save();
    ctx.translate(cx, cy - 4);
    ctx.fillStyle = '#f5ebd6';
    ctx.strokeStyle = gold;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-36, -34);
    ctx.lineTo(36, -34);
    ctx.lineTo(36, 6);
    ctx.quadraticCurveTo(36, 40, 0, 54);
    ctx.quadraticCurveTo(-36, 40, -36, 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Shield diagonal band
    ctx.strokeStyle = suitColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-28, -22);
    ctx.lineTo(28, 24);
    ctx.stroke();
    ctx.restore();

    drawSuitPip(ctx, suitKey, cx, cy + 2, 42, suitColor);
  }

  // Top & bottom small suit accents inside court frame
  drawSuitPip(ctx, suitKey, cx, by + 34, 24, suitColor);
  ctx.save();
  ctx.translate(cx, by + boxH - 34);
  ctx.rotate(Math.PI);
  drawSuitPip(ctx, suitKey, 0, 0, 24, suitColor);
  ctx.restore();

  ctx.restore();
}

function createCardFaceTexture(card, maxAnisotropy) {
  const w = 512;
  const h = 720;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  drawPaperBase(ctx, w, h);

  const inkColor = card.color === 'red' ? '#b91c1c' : '#141923';
  const rankStr = RANK_LABELS[card.rank];

  // Top-left & bottom-right corner indices (generous for instant legibility on stacked tableau)
  const drawCorner = (flipped) => {
    ctx.save();
    if (flipped) {
      ctx.translate(w, h);
      ctx.rotate(Math.PI);
    }
    ctx.fillStyle = inkColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const fontSize = card.rank === 10 ? 52 : 58;
    ctx.font = `700 ${fontSize}px "Outfit", "Plus Jakarta Sans", Georgia, serif`;
    ctx.fillText(rankStr, 54, 58);
    drawSuitPip(ctx, card.suit, 54, 112, 34, inkColor);

    // Extra crisp top-right pip so stacked cards are readable from both corners
    drawSuitPip(ctx, card.suit, w - 54, 58, 36, inkColor);
    ctx.restore();
  };

  drawCorner(false);
  drawCorner(true);

  // Center artwork
  if (card.rank === 1) {
    // Ornate Ace centerpiece
    ctx.save();
    ctx.strokeStyle = 'rgba(184, 143, 68, 0.42)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, 96, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, 84, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(184, 143, 68, 0.22)';
    ctx.stroke();
    ctx.restore();
    drawSuitPip(ctx, card.suit, w * 0.5, h * 0.5, 134, inkColor);
  } else if (card.rank >= 11) {
    drawCourtCardArt(ctx, w, h, card.rank, card.suit, inkColor);
  } else {
    const pips = PIP_LAYOUTS[card.rank];
    const padX = 96;
    const padY = 82;
    const innerW = w - padX * 2;
    const innerH = h - padY * 2;
    const pipSize = card.rank <= 5 ? 64 : 56;
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
  tex.needsUpdate = true;
  return tex;
}

function createCardBackTexture(maxAnisotropy) {
  const w = 512;
  const h = 720;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  // Warm ivory outer margin
  ctx.fillStyle = '#f8f4ea';
  ctx.fillRect(0, 0, w, h);

  // Inner royal sapphire-navy field
  const m = 24;
  drawRoundedRectPath(ctx, m, m, w - m * 2, h - m * 2, 18);
  const bg = ctx.createRadialGradient(w * 0.5, h * 0.5, 40, w * 0.5, h * 0.5, h * 0.56);
  bg.addColorStop(0, '#1f3a5f');
  bg.addColorStop(1, '#0f2037');
  ctx.fillStyle = bg;
  ctx.fill();

  // Clip inner filigree
  ctx.save();
  drawRoundedRectPath(ctx, m + 8, m + 8, w - (m + 8) * 2, h - (m + 8) * 2, 14);
  ctx.clip();

  // Delicate diamond botanical lattice
  ctx.strokeStyle = 'rgba(218, 184, 114, 0.28)';
  ctx.lineWidth = 1.6;
  const step = 36;
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

  // Tiny gold intersection dots
  ctx.fillStyle = 'rgba(232, 202, 134, 0.35)';
  for (let gx = m + 18; gx < w - m; gx += step) {
    for (let gy = m + 18; gy < h - m; gy += step) {
      ctx.beginPath();
      ctx.arc(gx, gy, 2.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  // Double gold border frame
  ctx.strokeStyle = '#d6b36c';
  ctx.lineWidth = 3.5;
  drawRoundedRectPath(ctx, m + 10, m + 10, w - (m + 10) * 2, h - (m + 10) * 2, 12);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(214, 179, 108, 0.65)';
  ctx.lineWidth = 1.4;
  drawRoundedRectPath(ctx, m + 18, m + 18, w - (m + 18) * 2, h - (m + 18) * 2, 8);
  ctx.stroke();

  // Central botanical / compass rosette
  const cx = w * 0.5;
  const cy = h * 0.5;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = '#132844';
  ctx.beginPath();
  ctx.arc(0, 0, 74, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#d6b36c';
  ctx.stroke();

  // 8-petal rosette
  for (let i = 0; i < 8; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 4);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(16, -28, 0, -56);
    ctx.quadraticCurveTo(-16, -28, 0, 0);
    ctx.fillStyle = i % 2 === 0 ? 'rgba(214, 179, 108, 0.85)' : 'rgba(214, 179, 108, 0.42)';
    ctx.fill();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#f3e1b2';
  ctx.fill();
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

function createLinenBumpTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  for (let y = 0; y < size; y += 2) {
    for (let x = 0; x < size; x += 2) {
      const weave = ((x + y) % 4 === 0 ? 18 : -14) + (Math.random() - 0.5) * 14;
      const v = Math.max(0, Math.min(255, Math.round(128 + weave)));
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(x, y, 2, 2);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 4);
  tex.needsUpdate = true;
  return tex;
}

function createFeltTexture(themeCfg, maxAnisotropy) {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Rich radial vignette across the tabletop felt
  const grad = ctx.createRadialGradient(size * 0.5, size * 0.44, size * 0.08, size * 0.5, size * 0.5, size * 0.72);
  grad.addColorStop(0, themeCfg.center);
  grad.addColorStop(0.55, themeCfg.mid);
  grad.addColorStop(1, themeCfg.edge);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Subtle wool/felt fibers
  for (let i = 0; i < 24000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const alpha = Math.random() * 0.055;
    ctx.fillStyle = i % 3 === 0 ? `rgba(255,255,255,${alpha * 0.45})` : `rgba(0,0,0,${alpha})`;
    ctx.fillRect(x, y, 1.8, 1.8);
  }

  // Subtle decorative table line inset
  ctx.strokeStyle = 'rgba(218, 188, 120, 0.14)';
  ctx.lineWidth = 3;
  drawRoundedRectPath(ctx, 42, 42, size - 84, size - 84, 34);
  ctx.stroke();

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
  for (let i = 0; i < 18000; i++) {
    const v = 100 + Math.floor(Math.random() * 56);
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

  ctx.fillStyle = '#3b1c10';
  ctx.fillRect(0, 0, size, size);

  for (let y = 0; y < size; y++) {
    const wave = Math.sin(y * 0.05) * 14 + Math.sin(y * 0.19) * 5;
    const tone = Math.sin(y * 0.09 + wave * 0.05);
    const r = Math.round(58 + tone * 16);
    const g = Math.round(28 + tone * 8);
    const b = Math.round(16 + tone * 5);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, y, size, 1.5);
  }

  // Fine dark grain streaks
  ctx.strokeStyle = 'rgba(18, 7, 3, 0.25)';
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 140; i++) {
    const y0 = Math.random() * size;
    ctx.beginPath();
    ctx.moveTo(0, y0);
    ctx.bezierCurveTo(size * 0.33, y0 + (Math.random() - 0.5) * 18, size * 0.66, y0 + (Math.random() - 0.5) * 18, size, y0 + (Math.random() - 0.5) * 10);
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

  // Subtle sunken slot fill + soft gold outline
  drawRoundedRectPath(ctx, 8, 8, w - 16, h - 16, 18);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(222, 194, 128, 0.34)';
  ctx.stroke();

  ctx.fillStyle = 'rgba(222, 194, 128, 0.36)';
  ctx.strokeStyle = 'rgba(222, 194, 128, 0.42)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (kind === 'stock') {
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, 42, 0.35, Math.PI * 1.85);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w * 0.5 + 32, h * 0.5 - 32);
    ctx.lineTo(w * 0.5 + 52, h * 0.5 - 12);
    ctx.lineTo(w * 0.5 + 22, h * 0.5 - 8);
    ctx.closePath();
    ctx.fill();
  } else if (kind === 'foundation') {
    ctx.font = '600 64px "Outfit", Georgia, serif';
    ctx.fillText('A', w * 0.5, h * 0.42);
    ctx.font = '400 38px serif';
    ctx.fillText('♠ ♥ ♣ ♦', w * 0.5, h * 0.61);
  } else if (kind === 'tableau') {
    ctx.font = '600 54px "Outfit", Georgia, serif';
    ctx.fillText('K', w * 0.5, h * 0.5);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  tex.needsUpdate = true;
  return tex;
}

export function createSolitaireAssets(maxAnisotropy = 4) {
  const aniso = Math.min(8, maxAnisotropy || 4);
  const linenBump = createLinenBumpTexture();
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

  const feltTextures = {};
  for (const key of Object.keys(FELT_THEMES)) {
    feltTextures[key] = createFeltTexture(FELT_THEMES[key], aniso);
  }

  return {
    faceTextures,
    backTex,
    linenBump,
    feltTextures,
    feltBump: createFeltBumpTexture(),
    woodTex: createWoodTexture(aniso),
    slotTextures: {
      stock: createSlotDecalTexture('stock', aniso),
      waste: createSlotDecalTexture('waste', aniso),
      foundation: createSlotDecalTexture('foundation', aniso),
      tableau: createSlotDecalTexture('tableau', aniso)
    }
  };
}
