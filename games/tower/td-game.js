// Bastion 3D Tower Defense – Game Logic, Economy, Waves & HUD Controller
// 100% preserved balancing, mechanics & ArcadeScores integration; delegates 3D rendering to TDScene.

import { TDScene } from './td-scene.js';
import { TDAudio } from './td-audio.js';

const COLS = 14;
const ROWS = 9;
const MAX_TOWER_LVL = 3;
const OVERDRIVE_DUR = 4.5;
const OVERDRIVE_CD = 18.0;

const MAPS = [
  [[0, 1], [3, 1], [3, 4], [1, 4], [1, 7], [6, 7], [6, 2], [10, 2], [10, 6], [13, 6]],
  [[0, 4], [2, 4], [2, 1], [6, 1], [6, 7], [10, 7], [10, 2], [12, 2], [12, 5], [13, 5]],
  [[0, 0], [12, 0], [12, 8], [1, 8], [1, 2], [10, 2], [10, 6], [3, 6], [3, 4], [7, 4]]
];

const TOWER_TYPES = [
  { id: 'pulse', icon: '🔵', name: 'Puls-Turm', cost: 50, range: 2.55, rate: 2.8, dmg: 15, color: '#38bdf8', splash: 0, slow: 0, desc: 'Schnellfeuer · bricht Schilde' },
  { id: 'frost', icon: '❄️', name: 'Frost-Prisma', cost: 75, range: 2.1, rate: 1.15, dmg: 7, color: '#a5f3fc', splash: 0, slow: 0.36, desc: 'Kurz-Slow (kein Dauerfrost!)' },
  { id: 'mortar', icon: '💥', name: 'Plasma-Mörser', cost: 110, range: 3.05, rate: 0.85, dmg: 40, color: '#fb923c', splash: 1.45, slow: 0, desc: 'Flächen-Explosion vs Schwärme' },
  { id: 'rail', icon: '⚡', name: 'Railgun', cost: 150, range: 4.0, rate: 0.48, dmg: 78, color: '#f472b6', splash: 0, slow: 0, desc: 'Sniper vs Panzer (Schwach vs Schwarm)' }
];

const TARGET_MODES = [
  { id: 'first', label: '🎯 Erste' },
  { id: 'strong', label: '💪 Stärkste' },
  { id: 'fast', label: '🏃 Schnellste' }
];

const canvas = document.getElementById('tdCanvas');
const stage = document.getElementById('tdStage');

let mapIdx = 0;
let pathCells = new Set();
let waypoints = [];
let selectedType = 'pulse';
let selectedTower = null;
let hoverTile = null;
let pendingBuildTile = null;
let nextTowerId = 1;
let feedbackTimer = null;
let lastShopKey = '';
let lastInspectorKey = '';
let lastHudCtrlKey = '';
let waveWasOngoing = false;

let gold = 165;
let lives = 20;
let wave = 0;
let score = 0;
let speedMult = 1;
let autoWave = false;
let autoWaveTimer = 0;
let earlyWaveLockTimer = 0;
let overdriveTimer = 0;
let overdriveCooldown = 0;
let shakeTime = 0;
let shakeMag = 0;
let waveBanner = null;

let waveQueue = [];
let spawnCooldown = 0;
let gameOver = false;

let towers = [];
let enemies = [];
let projectiles = [];
let beams = [];
let particles = [];
let sparks = [];
let floatTexts = [];
let currentRunId = ArcadeScores.newRunId('tower');

const tdScene = new TDScene(canvas, stage, {
  onTileTap: (col, row, pointerType) => handleTileClick(col, row, pointerType),
  onTileHover: (tile) => { hoverTile = tile; }
});

function resolveFeedbackColor(color) {
  if (!(window.ArcadeTheme && ArcadeTheme.isLight())) return color;
  const map = {
    '#fbbf24': '#b45309',
    '#fde047': '#a16207',
    '#4ade80': '#15803d',
    '#7dd3fc': '#0369a1',
    '#fb7185': '#be123c',
    '#fb923c': '#c2410c'
  };
  return map[String(color || '').toLowerCase()] || '#0369a1';
}

function showFeedback(text, color = '#fbbf24') {
  const el = document.getElementById('td-feedback');
  if (!el) return;
  el.dataset.rawColor = color;
  el.style.color = resolveFeedbackColor(color);
  el.textContent = text || '';
  clearTimeout(feedbackTimer);
  if (text) {
    feedbackTimer = setTimeout(() => {
      if (el.textContent === text) el.textContent = '';
    }, 2600);
  }
}

function addFloatText(x, y, text, color = '#ffffff', scale = 1) {
  if (floatTexts.length > 36) floatTexts.shift();
  floatTexts.push({ x, y, text, color, scale, life: 0.95, maxLife: 0.95 });
}

function addSparkBurst(x, y, color, count = 6, speed = 2.6) {
  for (let i = 0; i < count; i++) {
    if (sparks.length >= 130) sparks.shift();
    const a = Math.random() * Math.PI * 2;
    const v = speed * (0.45 + Math.random() * 0.85);
    sparks.push({
      x, y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v,
      life: 0.25 + Math.random() * 0.2,
      maxLife: 0.45,
      color,
      size: 2.0 + Math.random() * 2.2
    });
  }
}

function triggerShake(mag = 4, dur = 0.16) {
  shakeMag = Math.max(shakeMag, mag);
  shakeTime = Math.max(shakeTime, dur);
}

function refreshTopBest() {
  const b = ArcadeScores.getBest('tower');
  const el = document.getElementById('top-best');
  if (el) el.textContent = b ? b.best : 0;
}

function buildPathSet(idx) {
  const pts = MAPS[idx] || MAPS[0];
  waypoints = pts.map(([c, r]) => ({ x: c + 0.5, y: r + 0.5 }));
  pathCells.clear();
  for (let i = 0; i < pts.length - 1; i++) {
    let [c0, r0] = pts[i];
    const [c1, r1] = pts[i + 1];
    const dc = Math.sign(c1 - c0);
    const dr = Math.sign(r1 - r0);
    pathCells.add(`${c0},${r0}`);
    while (c0 !== c1 || r0 !== r1) {
      c0 += dc;
      r0 += dr;
      pathCells.add(`${c0},${r0}`);
    }
  }
}

function updateWaveBannerDOM() {
  const el = document.getElementById('tdWaveBanner');
  if (!el) return;
  if (!waveBanner) {
    el.classList.add('hidden');
    return;
  }
  const fadeIn = Math.min(1, (waveBanner.maxTimer - waveBanner.timer) * 4);
  const fadeOut = Math.min(1, waveBanner.timer * 2.5);
  const alpha = Math.max(0, Math.min(fadeIn, fadeOut));
  el.classList.remove('hidden');
  el.style.opacity = alpha.toFixed(3);
  const titleEl = document.getElementById('wb-title');
  const subEl = document.getElementById('wb-sub');
  const bCol = resolveFeedbackColor(waveBanner.color);
  el.style.borderColor = bCol;
  if (titleEl) {
    titleEl.textContent = waveBanner.text;
    titleEl.style.color = bCol;
  }
  if (subEl) subEl.textContent = waveBanner.sub;
}

function resetTD(newMapIdx) {
  if (newMapIdx !== undefined) mapIdx = parseInt(newMapIdx, 10) || 0;
  currentRunId = ArcadeScores.newRunId('tower');
  buildPathSet(mapIdx);
  gold = 165;
  lives = 20;
  wave = 0;
  score = 0;
  autoWaveTimer = 0;
  earlyWaveLockTimer = 0;
  overdriveTimer = 0;
  overdriveCooldown = 0;
  shakeTime = 0;
  shakeMag = 0;
  waveBanner = null;
  waveQueue = [];
  towers = [];
  enemies = [];
  projectiles = [];
  beams = [];
  particles = [];
  sparks = [];
  floatTexts = [];
  selectedTower = null;
  pendingBuildTile = null;
  nextTowerId = 1;
  lastShopKey = '';
  lastInspectorKey = '';
  lastHudCtrlKey = '';
  waveWasOngoing = false;
  gameOver = false;

  tdScene.clearDynamic();
  tdScene.rebuildMap(pathCells, waypoints);
  tdScene.resetCamera();
  updateWaveBannerDOM();

  showFeedback('');
  document.getElementById('tdOverlay').classList.add('hidden');
  renderShop(true);
  renderInspector(true);
  updateHUD(true);
  ArcadeAudio.click();
}

function toggleSpeed() {
  speedMult = speedMult === 1 ? 2 : (speedMult === 2 ? 3 : 1);
  document.getElementById('btn-speed').textContent = `⏩ ${speedMult}×`;
  ArcadeAudio.click();
}

function toggleAutoWave() {
  autoWave = !autoWave;
  const btn = document.getElementById('btn-autowave');
  if (btn) {
    btn.classList.toggle('is-on', autoWave);
    btn.textContent = autoWave ? '🔁 Auto AN' : '🔁 Auto';
  }
  if (autoWave && wave === 0 && !gameOver) {
    sendNextWave();
  } else {
    ArcadeAudio.click();
  }
}

function triggerOverdrive() {
  if (gameOver || overdriveTimer > 0 || overdriveCooldown > 0) return;
  overdriveTimer = OVERDRIVE_DUR;
  overdriveCooldown = OVERDRIVE_CD;
  triggerShake(3.5, 0.18);
  TDAudio.overdrive();
  towers.forEach(tw => {
    particles.push({ x: tw.x, y: tw.y, maxR: tw.range * 0.55, life: 0.25, color: '#fbbf24', ring: true });
    addSparkBurst(tw.x, tw.y, '#fde047', 5, 2.2);
  });
  if (towers.length > 0) {
    addFloatText(towers[0].x, Math.max(0.8, towers[0].y - 0.5), '⚡ OVERDRIVE!', '#fde047', 1.25);
  } else {
    showFeedback('⚡ Overdrive aktiv (+65% Feuerrate & +20% Schaden)!', '#fde047');
  }
  updateHUD(true);
}

function getEarlyWaveBonus() {
  return 12 + wave * 3;
}

function buildWaveQueue(w) {
  const list = [];
  const lateSurge = Math.max(0, w - 5);
  const baseHp = 26 + w * 18 + Math.pow(w, 1.48) * 4.2 + Math.pow(lateSurge, 1.92) * 11;
  const baseSpacing = Math.max(0.20, 0.50 - w * 0.024);
  const spdMult = Math.min(1.48, 1 + lateSurge * 0.032);
  const count = 8 + w * 3;
  const isBossWave = w % 5 === 0;
  const goldBonus = Math.min(7, Math.floor(w * 0.4));
  let swarmStreak = 0;

  for (let i = 0; i < count; i++) {
    let kind = 'normal';
    if (w >= 6 && i % 6 === 5) {
      kind = 'shield';
    } else if (w >= 5 && i % 7 === 3) {
      kind = 'splitter';
    } else if (w >= 4 && i % 5 === 1) {
      kind = 'thermo';
    } else if (w >= 3 && (i % 8 === 4 || swarmStreak > 0)) {
      kind = 'swarm';
      swarmStreak = swarmStreak > 0 ? swarmStreak - 1 : (w >= 8 ? 3 : 2);
    } else if (w >= 3 && i % 6 === 4) {
      kind = 'tank';
    } else if (w >= 2 && i % 4 === 2) {
      kind = 'fast';
    }

    if (kind === 'swarm') {
      list.push({
        kind: 'swarm', hp: baseHp * 0.35, shield: 0, speed: 2.38 * spdMult,
        reward: 4 + Math.min(4, Math.floor(w * 0.25)), slowResist: 0, frostImmune: false,
        delay: Math.max(0.15, 0.21 - lateSurge * 0.005)
      });
    } else if (kind === 'thermo') {
      list.push({
        kind: 'thermo', hp: baseHp * 1.0, shield: 0, speed: 2.18 * spdMult,
        reward: 12 + goldBonus, slowResist: 1, frostImmune: true, delay: baseSpacing * 0.88
      });
    } else if (kind === 'splitter') {
      list.push({
        kind: 'splitter', hp: baseHp * 1.48, shield: 0, speed: 1.18 * spdMult,
        reward: 14 + goldBonus, slowResist: 0.15, frostImmune: false, delay: baseSpacing * 1.15
      });
    } else if (kind === 'shield') {
      const sh = baseHp * (0.9 + Math.min(0.45, lateSurge * 0.04));
      list.push({
        kind: 'shield', hp: baseHp * 1.28, shield: sh, speed: 1.08 * spdMult,
        reward: 16 + goldBonus, slowResist: 0.25, frostImmune: false, delay: baseSpacing * 1.25
      });
    } else if (kind === 'tank') {
      list.push({
        kind: 'tank', hp: baseHp * 2.28, shield: 0, speed: 0.94 * spdMult,
        reward: 14 + goldBonus, slowResist: w >= 5 ? 0.35 : 0.15, frostImmune: false,
        delay: Math.max(0.42, baseSpacing * 1.3)
      });
    } else if (kind === 'fast') {
      list.push({
        kind: 'fast', hp: baseHp * 0.68, shield: 0, speed: 2.25 * spdMult,
        reward: 9 + Math.min(5, Math.floor(w * 0.35)), slowResist: 0, frostImmune: false,
        delay: baseSpacing * 0.76
      });
    } else {
      list.push({
        kind: 'normal', hp: baseHp, shield: 0, speed: 1.42 * spdMult,
        reward: 9 + Math.min(5, Math.floor(w * 0.35)), slowResist: 0, frostImmune: false,
        delay: baseSpacing
      });
    }
  }

  if (isBossWave) {
    const bossCount = w >= 15 ? 2 : 1;
    const bossHp = Math.max((30 + w * 21) * 7.0, baseHp * 7.6);
    const bossShield = w >= 10 ? bossHp * 0.45 : 0;
    for (let b = 0; b < bossCount; b++) {
      list.push({
        kind: 'boss', hp: bossHp, shield: bossShield, speed: 0.78 * Math.min(1.3, spdMult),
        reward: 65 + Math.min(80, w * 4), slowResist: 0.70, frostImmune: false, delay: 0.85
      });
    }
  }
  return list;
}

function sendNextWave() {
  if (gameOver) return;
  const isOngoing = wave > 0 && (waveQueue.length > 0 || enemies.length > 0);
  if (isOngoing && earlyWaveLockTimer > 0) return;

  if (isOngoing) {
    const bonus = getEarlyWaveBonus();
    gold += bonus;
    score += bonus * 3;
    addFloatText(waypoints[0].x + 1.2, waypoints[0].y, `⚡ +${bonus}💰 VORZIEH-BONUS`, '#fde047', 1.15);
    showFeedback(`⚡ Welle vorgezogen! +${bonus} Gold Bonus!`, '#fde047');
    ArcadeAudio.perkGood();
  }

  wave++;
  autoWaveTimer = 0;
  earlyWaveLockTimer = 1.05;
  const nextList = buildWaveQueue(wave);
  waveQueue.push(...nextList);
  waveWasOngoing = true;
  spawnCooldown = Math.min(spawnCooldown, 0.14);

  TDAudio.waveStart(wave % 5 === 0);

  let headline = `🌊 Welle ${wave}`;
  let sub = `${nextList.length} Einheiten rücken vor!`;
  let bColor = '#38bdf8';
  if (wave % 5 === 0) {
    headline = `💀 Welle ${wave} · DREADNOUGHT BOSS!`;
    sub = wave >= 10 ? 'Boss mit Energieschild + Spalter im Anmarsch!' : '70% Frost-Resistenz + Hydra-Spalter!';
    bColor = '#fb7185';
    triggerShake(3, 0.15);
  } else if (wave === 6) {
    headline = `🛡️ Welle 6 · Aegis-Kreuzer!`;
    sub = 'Energieschilde brechen Railgun-Bursts – Puls & Mörser kontern!';
    bColor = '#22d3ee';
  } else if (wave === 5) {
    headline = `🧬 Welle 5 · Hydra-Spalter & Boss!`;
    sub = 'Spalter teilen sich beim Tod in schnelle Schwarm-Drohnen!';
    bColor = '#e879f9';
  } else if (wave === 4) {
    headline = `🔥 Welle 4 · Thermo-Sprinter!`;
    sub = '100% Frost-immun – sie stürmen durch jedes Frost-Prisma!';
    bColor = '#fb923c';
  } else if (wave === 3) {
    headline = `⚡ Welle 3 · Drohnen-Schwarm!`;
    sub = 'Schnelle Gruppen – Plasma-Mörser & Puls-Türme glänzen!';
    bColor = '#a3e635';
  } else if (wave === 2) {
    headline = `🟣 Welle 2 · Abfangjäger!`;
    sub = 'Schnelle Einheiten testen deine Kurven-Abdeckung!';
    bColor = '#c084fc';
  }
  waveBanner = { text: headline, sub, color: bColor, timer: 2.9, maxTimer: 2.9 };
  updateWaveBannerDOM();
  updateHUD(true);
}

function renderShop(force = false) {
  const affordSig = TOWER_TYPES.map(t => gold >= t.cost ? '1' : '0').join('');
  const shopKey = `${selectedTower ? 'inspect' : selectedType}|${affordSig}`;
  if (!force && shopKey === lastShopKey) return;
  lastShopKey = shopKey;
  const wrap = document.getElementById('tower-shop');
  const head = document.getElementById('shop-head');
  if (head) {
    head.textContent = selectedTower
      ? '🛠️ Neuen Turm zum Bauen wählen'
      : '🛠️ Türme bauen (Feld anklicken)';
  }
  wrap.innerHTML = TOWER_TYPES.map(t => `
    <button type="button" class="tower-btn ${!selectedTower && selectedType === t.id ? 'selected' : ''} ${gold < t.cost ? 'cant-afford' : ''}"
      onclick="selectShopTower('${t.id}')">
      <span class="tower-name">${t.icon} ${t.name}</span>
      <span class="tower-cost">💰 ${t.cost}</span>
      <span class="tower-desc">${t.desc}</span>
    </button>
  `).join('');
}

function selectShopTower(id) {
  selectedType = id;
  selectedTower = null;
  pendingBuildTile = null;
  showFeedback('');
  renderShop(true);
  renderInspector(true);
  ArcadeAudio.click();
}

function deselectTower() {
  selectedTower = null;
  pendingBuildTile = null;
  renderShop(true);
  renderInspector(true);
  ArcadeAudio.click();
}

function setTowerTargetMode(mode) {
  if (!selectedTower) return;
  selectedTower.targetMode = mode;
  renderInspector(true);
  ArcadeAudio.click();
}

function upgradeCost(tw) {
  if (!tw || tw.lvl >= MAX_TOWER_LVL) return null;
  return Math.round(tw.def.cost * (0.75 * tw.lvl));
}

function getNextUpgradeStats(tw) {
  const id = tw.def.id;
  const dmgMult = id === 'mortar' ? 1.50 : (id === 'pulse' ? 1.48 : (id === 'rail' ? 1.44 : 1.42));
  const rangeAdd = id === 'mortar' ? 0.28 : (id === 'pulse' ? 0.25 : 0.22);
  const rateMult = id === 'pulse' ? 1.15 : (id === 'mortar' ? 1.13 : 1.10);
  const nextSlow = id === 'frost' ? Math.min(0.48, (tw.slow || 0.36) + 0.06) : 0;
  return {
    dmg: tw.dmg * dmgMult,
    range: tw.range + rangeAdd,
    rate: tw.rate * rateMult,
    slow: nextSlow
  };
}

function renderInspector(force = false) {
  const box = document.getElementById('inspector');
  if (selectedTower && !towers.includes(selectedTower)) selectedTower = null;
  if (!selectedTower) {
    box.classList.remove('is-maxed');
    const def = TOWER_TYPES.find(t => t.id === selectedType);
    const pend = pendingBuildTile ? `${pendingBuildTile.col},${pendingBuildTile.row}` : '';
    const key = `build|${selectedType}|${gold >= def.cost}|${pend}`;
    if (!force && key === lastInspectorKey) return;
    lastInspectorKey = key;

    if (pendingBuildTile) {
      const canAff = gold >= def.cost;
      box.innerHTML = `
        <div class="insp-title">📍 Bauplatz (${pendingBuildTile.col + 1}, ${pendingBuildTile.row + 1}): ${def.icon} ${def.name}</div>
        <div class="insp-stats">Schaden: <b>${def.dmg}</b> · Reichweite: <b>${def.range.toFixed(1)}</b> · Tempo: <b>${def.rate.toFixed(1)}/s</b></div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
          <button type="button" class="primary-btn" style="padding:6px 11px;font-size:12px;" onclick="confirmPendingBuild()" ${canAff ? '' : 'disabled'}>✅ Hier bauen (${def.cost}💰)</button>
          <button type="button" class="secondary-btn" style="padding:6px 10px;font-size:12px;" onclick="deselectTower()">✕ Abbrechen</button>
        </div>`;
      return;
    }
    box.innerHTML = `<div class="insp-title">Bau-Modus: ${def.icon} ${def.name}</div>
      <div class="insp-stats">Klicke oder tippe auf ein freies Gitterfeld neben dem Pfad, um diesen Turm für ${def.cost} Gold zu bauen.</div>`;
    return;
  }

  const tw = selectedTower;
  const isMaxed = tw.lvl >= MAX_TOWER_LVL;
  const uCost = upgradeCost(tw);
  const canAfford = uCost !== null && gold >= uCost;
  const sellVal = Math.round(tw.spent * 0.75);
  const tMode = tw.targetMode || 'first';
  const key = `tw|${tw.id}|${tw.lvl}|${tw.spent}|${tw.kills || 0}|${tMode}|${canAfford}`;
  if (!force && key === lastInspectorKey) return;
  lastInspectorKey = key;

  box.classList.toggle('is-maxed', isMaxed);
  const nxt = getNextUpgradeStats(tw);
  const slowTxt = tw.def.id === 'frost'
    ? ` · Slow: <b>${Math.round((tw.slow || 0.36) * 100)}%</b>${!isMaxed ? ` → ${Math.round(nxt.slow * 100)}%` : ''}`
    : '';

  box.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
      <strong>${tw.def.icon} ${tw.def.name} (Stufe ${tw.lvl}/${MAX_TOWER_LVL})</strong>
      <button type="button" class="secondary-btn" style="padding:2px 7px;font-size:11px;" onclick="deselectTower()" title="Zurück in den Bau-Modus">✕</button>
    </div>
    <div class="insp-stats">
      Schaden: <b>${Math.round(tw.dmg)}</b>${!isMaxed ? ` → ${Math.round(nxt.dmg)}` : ''} · Reichw.: <b>${tw.range.toFixed(2)}</b>${!isMaxed ? ` → ${nxt.range.toFixed(2)}` : ''}${slowTxt} · Kills: <b>${tw.kills || 0}</b>
    </div>
    <div class="tgt-pills" role="group" aria-label="Zielpriorität">
      ${TARGET_MODES.map(m => `<button type="button" class="tgt-btn ${tMode === m.id ? 'active' : ''}" onclick="setTowerTargetMode('${m.id}')">${m.label}</button>`).join('')}
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
      ${!isMaxed
        ? `<button type="button" class="primary-btn" style="padding:6px 10px;font-size:12px;" onclick="upgradeSelected(${tw.id})" ${canAfford ? '' : 'disabled'}>⬆ Upgrade (${uCost}💰)</button>`
        : `<button type="button" class="primary-btn max-lvl-btn" style="padding:6px 10px;font-size:12px;" disabled aria-disabled="true">★ Voll (Max-Stufe)</button>`}
      <button type="button" class="secondary-btn" style="padding:6px 10px;font-size:12px;" onclick="sellSelected()">💸 Verkaufen (+${sellVal})</button>
    </div>
  `;
}

function upgradeSelected(expectedId) {
  if (!selectedTower) return;
  if (expectedId !== undefined && selectedTower.id !== expectedId) return;
  if (!Number.isFinite(selectedTower.lvl) || selectedTower.lvl >= MAX_TOWER_LVL) {
    selectedTower.lvl = MAX_TOWER_LVL;
    showFeedback('Turm ist bereits voll (Max-Stufe 3/3)!', '#4ade80');
    ArcadeAudio.perkBad();
    renderInspector(true);
    return;
  }
  const cost = upgradeCost(selectedTower);
  if (cost === null || gold < cost) {
    showFeedback(`Nicht genug Gold für Upgrade (${gold}/${cost}💰)!`, '#fb7185');
    ArcadeAudio.perkBad();
    renderInspector(true);
    return;
  }
  gold -= cost;
  selectedTower.spent += cost;
  selectedTower.lvl = Math.min(MAX_TOWER_LVL, selectedTower.lvl + 1);
  const nxt = getNextUpgradeStats(selectedTower);
  selectedTower.dmg = nxt.dmg;
  selectedTower.range = nxt.range;
  selectedTower.rate = nxt.rate;
  if (selectedTower.def.id === 'frost') selectedTower.slow = nxt.slow;

  particles.push({ x: selectedTower.x, y: selectedTower.y, maxR: 0.72, life: 0.24, color: '#4ade80', ring: true });
  addSparkBurst(selectedTower.x, selectedTower.y, '#fbbf24', 8, 2.5);
  TDAudio.upgrade();
  showFeedback(
    selectedTower.lvl >= MAX_TOWER_LVL ? '★ Max-Stufe (3/3) erreicht!' : `⬆ Stufe ${selectedTower.lvl}/3 erreicht!`,
    '#4ade80'
  );
  renderShop(true);
  renderInspector(true);
  updateHUD(true);
}

function sellSelected() {
  if (!selectedTower) return;
  const refund = Math.round(selectedTower.spent * 0.75);
  gold += refund;
  towers = towers.filter(t => t !== selectedTower);
  selectedTower = null;
  pendingBuildTile = null;
  showFeedback(`💸 Turm verkauft (+${refund}💰)`, '#7dd3fc');
  TDAudio.sell();
  renderShop(true);
  renderInspector(true);
  updateHUD(true);
}

function buildTowerAt(col, row) {
  if (gameOver) return false;
  if (pathCells.has(`${col},${row}`)) return false;
  if (towers.find(t => t.col === col && t.row === row)) return false;
  const def = TOWER_TYPES.find(t => t.id === selectedType);
  if (!def || gold < def.cost) {
    showFeedback(`Nicht genug Gold für ${def ? def.name : 'Turm'} (${gold}/${def ? def.cost : 0}💰)!`, '#fb7185');
    ArcadeAudio.perkBad();
    return false;
  }
  gold -= def.cost;
  const newTw = {
    id: nextTowerId++,
    col, row,
    x: col + 0.5, y: row + 0.5,
    def, lvl: 1, spent: def.cost,
    dmg: def.dmg, range: def.range, rate: def.rate, slow: def.slow || 0,
    targetMode: def.id === 'rail' ? 'strong' : 'first',
    kills: 0, recoil: 0, cd: 0, angle: 0
  };
  towers.push(newTw);
  selectedTower = newTw;
  pendingBuildTile = null;
  particles.push({ x: newTw.x, y: newTw.y, maxR: 0.65, life: 0.22, color: def.color, ring: true });
  showFeedback('');
  TDAudio.build();
  renderShop(true);
  renderInspector(true);
  updateHUD(true);
  return true;
}

function confirmPendingBuild() {
  if (!pendingBuildTile) return;
  buildTowerAt(pendingBuildTile.col, pendingBuildTile.row);
}

function updateHUD(force = false) {
  document.getElementById('hud-gold').textContent = gold;
  document.getElementById('hud-lives').textContent = lives;
  document.getElementById('hud-wave').textContent = wave;
  document.getElementById('hud-score').textContent = score;

  const ongoing = wave > 0 && (waveQueue.length > 0 || enemies.length > 0);
  const locked = ongoing && earlyWaveLockTimer > 0;
  const odState = overdriveTimer > 0
    ? `active:${Math.ceil(overdriveTimer)}`
    : (overdriveCooldown > 0 ? `cd:${Math.ceil(overdriveCooldown)}` : 'ready');
  const ctrlKey = `${wave}|${ongoing}|${locked}|${odState}`;

  if (force || ctrlKey !== lastHudCtrlKey) {
    lastHudCtrlKey = ctrlKey;
    const waveBtn = document.getElementById('btn-wave');
    if (waveBtn) {
      if (ongoing) {
        waveBtn.disabled = locked;
        waveBtn.classList.toggle('is-early', !locked);
        waveBtn.textContent = locked
          ? `🌊 Welle ${wave} läuft...`
          : `⚡ Welle ${wave + 1} vorziehen (+${getEarlyWaveBonus()}💰)`;
      } else {
        waveBtn.disabled = false;
        waveBtn.classList.remove('is-early');
        waveBtn.textContent = `▶ Welle ${wave + 1} starten`;
      }
    }
    const odBtn = document.getElementById('btn-overdrive');
    if (odBtn) {
      odBtn.classList.toggle('is-active', overdriveTimer > 0);
      odBtn.classList.toggle('is-cd', overdriveTimer <= 0 && overdriveCooldown > 0);
      odBtn.disabled = gameOver || overdriveTimer > 0 || overdriveCooldown > 0;
      if (overdriveTimer > 0) {
        odBtn.textContent = `🔥 Overdrive ${overdriveTimer.toFixed(1)}s`;
      } else if (overdriveCooldown > 0) {
        odBtn.textContent = `⏳ Overdrive ${Math.ceil(overdriveCooldown)}s`;
      } else {
        odBtn.textContent = '⚡ Overdrive BEREIT';
      }
    }
  }
  renderShop();
}

function handleTileClick(col, row, pointerType) {
  if (gameOver) return;
  const existing = towers.find(t => t.col === col && t.row === row);
  if (existing) {
    selectedTower = existing;
    pendingBuildTile = null;
    showFeedback('');
    renderShop(true);
    renderInspector(true);
    ArcadeAudio.click();
    return;
  }

  if (pathCells.has(`${col},${row}`)) {
    selectedTower = null;
    pendingBuildTile = null;
    showFeedback('Auf dem Gegner-Pfad kann kein Turm stehen.', '#fb7185');
    renderShop(true);
    renderInspector(true);
    return;
  }

  const def = TOWER_TYPES.find(t => t.id === selectedType);
  if (!def || gold < def.cost) {
    pendingBuildTile = null;
    showFeedback(`Nicht genug Gold für ${def ? def.name : 'Turm'} (${gold}/${def ? def.cost : 0}💰)!`, '#fb7185');
    ArcadeAudio.perkBad();
    renderInspector(true);
    return;
  }

  if (pointerType === 'touch') {
    if (!pendingBuildTile || pendingBuildTile.col !== col || pendingBuildTile.row !== row) {
      selectedTower = null;
      pendingBuildTile = { col, row };
      showFeedback(`Vorschau: Nochmal tippen oder "Hier bauen" (${def.cost}💰)`, '#7dd3fc');
      ArcadeAudio.click();
      renderShop(true);
      renderInspector(true);
      return;
    }
  }

  buildTowerAt(col, row);
}

function spawnEnemyFromTemplate(tpl, customPos = null) {
  enemies.push({
    x: customPos ? customPos.x : waypoints[0].x,
    y: customPos ? customPos.y : waypoints[0].y,
    wp: customPos ? customPos.wp : 1,
    hp: tpl.hp,
    maxHp: tpl.hp,
    shield: tpl.shield || 0,
    maxShield: tpl.shield || 0,
    speed: tpl.speed,
    reward: tpl.reward,
    kind: tpl.kind,
    slowResist: tpl.slowResist || 0,
    frostImmune: !!tpl.frostImmune,
    noSplit: !!tpl.noSplit,
    slowTimer: 0,
    slowFactor: 1,
    chillAccum: 0,
    thawTimer: 0,
    immunTextCd: 0,
    progress: customPos ? customPos.progress : 0,
    _countedKill: false
  });
}

function applyDamageToEnemy(en, rawDmg, sourceType, sourceTower) {
  if (!en || en.hp <= 0) return;
  let dmg = rawDmg * (overdriveTimer > 0 ? 1.2 : 1.0);

  if (en.shield > 0) {
    const shieldMult = sourceType === 'pulse' ? 1.28 : (sourceType === 'mortar' ? 1.15 : 1.0);
    let sDmg = dmg * shieldMult;
    if (sourceType === 'rail') sDmg = Math.min(sDmg, 46);
    if (en.shield > sDmg) {
      en.shield -= sDmg;
      addSparkBurst(en.x, en.y, '#22d3ee', 2, 1.8);
      return;
    }
    const spill = sourceType === 'rail' ? 0 : (sDmg - en.shield) * 0.55;
    en.shield = 0;
    TDAudio.shieldBreak();
    particles.push({ x: en.x, y: en.y, maxR: 0.72, life: 0.22, color: '#22d3ee', ring: true });
    addSparkBurst(en.x, en.y, '#67e8f9', 8, 3.0);
    addFloatText(en.x, en.y - 0.3, 'SCHILD WEG!', '#67e8f9', 0.9);
    if (spill > 0) en.hp -= spill;
  } else {
    if (sourceType === 'rail' && (en.kind === 'tank' || en.kind === 'boss')) {
      dmg *= 1.20;
    }
    en.hp -= dmg;
  }

  if (en.hp <= 0 && !en._countedKill) {
    en._countedKill = true;
    if (sourceTower) sourceTower.kills = (sourceTower.kills || 0) + 1;
  }
}

function spawnSplitChildren(en) {
  const splitCount = wave >= 9 ? 3 : 2;
  const prevWp = waypoints[Math.max(0, en.wp - 1)];
  const backDx = prevWp.x - en.x;
  const backDy = prevWp.y - en.y;
  const backLen = Math.hypot(backDx, backDy) || 1;
  const ux = backDx / backLen;
  const uy = backDy / backLen;
  for (let k = 0; k < splitCount; k++) {
    const distBack = Math.min(backLen * 0.85, 0.14 * k);
    spawnEnemyFromTemplate(
      {
        kind: 'swarm',
        hp: Math.max(12, en.maxHp * 0.24),
        shield: 0,
        speed: 2.38,
        reward: 4,
        slowResist: 0,
        frostImmune: false,
        noSplit: true
      },
      {
        x: en.x + ux * distBack,
        y: en.y + uy * distBack,
        wp: en.wp,
        progress: Math.max(0, en.progress - distBack)
      }
    );
  }
  TDAudio.enemySplit();
  particles.push({ x: en.x, y: en.y, maxR: 0.65, life: 0.24, color: '#e879f9', ring: true });
  addSparkBurst(en.x, en.y, '#e879f9', 8, 2.8);
  addFloatText(en.x, en.y - 0.35, `🧬 SPALTUNG x${splitCount}!`, '#f0abfc', 0.9);
}

function stepTD(rawDt) {
  if (gameOver) return;
  const dt = rawDt * speedMult;
  let hudTickDirty = false;

  if (shakeTime > 0) {
    shakeTime = Math.max(0, shakeTime - rawDt);
    if (shakeTime === 0) shakeMag = 0;
  }
  if (waveBanner) {
    waveBanner.timer -= rawDt;
    if (waveBanner.timer <= 0) waveBanner = null;
    updateWaveBannerDOM();
  }
  if (earlyWaveLockTimer > 0) {
    earlyWaveLockTimer = Math.max(0, earlyWaveLockTimer - dt);
    hudTickDirty = true;
  }
  if (overdriveTimer > 0) {
    overdriveTimer = Math.max(0, overdriveTimer - dt);
    hudTickDirty = true;
  }
  if (overdriveCooldown > 0) {
    overdriveCooldown = Math.max(0, overdriveCooldown - dt);
    hudTickDirty = true;
  }

  if (waveQueue.length > 0) {
    spawnCooldown -= dt;
    while (waveQueue.length > 0 && spawnCooldown <= 0) {
      const tpl = waveQueue.shift();
      spawnEnemyFromTemplate(tpl);
      spawnCooldown += (tpl.delay || 0.42);
    }
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    const en = enemies[i];
    en.immunTextCd = Math.max(0, en.immunTextCd - dt);

    if (en.thawTimer > 0) {
      en.thawTimer = Math.max(0, en.thawTimer - dt);
      en.slowTimer = 0;
      en.slowFactor = 1;
    } else if (en.slowTimer > 0) {
      en.slowTimer = Math.max(0, en.slowTimer - dt);
      if (en.kind !== 'boss') {
        en.chillAccum += dt;
        if (en.chillAccum >= 2.8) {
          en.chillAccum = 0;
          en.slowTimer = 0;
          en.slowFactor = 1;
          en.thawTimer = 2.4;
          particles.push({ x: en.x, y: en.y, maxR: 0.5, life: 0.22, color: '#fbbf24', ring: true });
          addFloatText(en.x, en.y - 0.28, 'TAUEN!', '#fbbf24', 0.85);
        }
      }
      if (en.slowTimer === 0) en.slowFactor = 1;
    }

    const spd = en.speed * (en.slowTimer > 0 ? (en.slowFactor || 0.64) : 1);
    let rem = spd * dt;
    en.progress += rem;

    while (rem > 0 && en.wp < waypoints.length) {
      const tgt = waypoints[en.wp];
      const dx = tgt.x - en.x;
      const dy = tgt.y - en.y;
      const dist = Math.hypot(dx, dy);
      if (dist <= rem) {
        en.x = tgt.x;
        en.y = tgt.y;
        en.wp++;
        rem -= dist;
      } else {
        en.x += (dx / dist) * rem;
        en.y += (dy / dist) * rem;
        rem = 0;
      }
    }
    if (en.wp >= waypoints.length) {
      enemies.splice(i, 1);
      const dmgLives = en.kind === 'boss' ? 5 : 1;
      lives = Math.max(0, lives - dmgLives);
      addFloatText(waypoints[waypoints.length - 1].x - 0.35, waypoints[waypoints.length - 1].y - 0.2, `-${dmgLives}❤️`, '#fb7185', 1.15);
      triggerShake(en.kind === 'boss' ? 6 : 3.5, 0.18);
      ArcadeAudio.perkBad();
      updateHUD(true);
      if (lives <= 0) {
        gameOver = true;
        ArcadeAudio.fail();
        const isNew = ArcadeScores.record('tower', score, `${score} Pkt (Welle ${wave})`, false, { runId: currentRunId });
        refreshTopBest();
        document.getElementById('ov-emoji').textContent = isNew ? '🏆' : '💥';
        document.getElementById('ov-title').textContent = isNew ? 'Neuer Bastion-Rekord!' : 'Basis überrannt!';
        document.getElementById('ov-desc').textContent = `Erreicht: Welle ${wave} · Gesamtpunkte: ${score}`;
        document.getElementById('tdOverlay').classList.remove('hidden');
        return;
      }
    }
  }

  const rateMult = overdriveTimer > 0 ? 1.65 : 1.0;
  towers.forEach(tw => {
    tw.recoil = Math.max(0, (tw.recoil || 0) - dt * 6.5);
    tw.cd = Math.max(0, tw.cd - dt);
    if (tw.cd > 0) return;

    let best = null;
    const mode = tw.targetMode || 'first';
    enemies.forEach(en => {
      if (Math.hypot(en.x - tw.x, en.y - tw.y) <= tw.range) {
        if (!best) {
          best = en;
          return;
        }
        if (mode === 'strong') {
          const effBest = best.hp + best.shield;
          const effEn = en.hp + en.shield;
          if (effEn > effBest || (effEn === effBest && en.progress > best.progress)) best = en;
        } else if (mode === 'fast') {
          if (en.speed > best.speed || (en.speed === best.speed && en.progress > best.progress)) best = en;
        } else {
          if (en.progress > best.progress) best = en;
        }
      }
    });
    if (!best) return;
    tw.angle = Math.atan2(best.y - tw.y, best.x - tw.x);
    tw.cd = 1 / (tw.rate * rateMult);
    tw.recoil = 1.0;

    if (tw.def.id === 'frost') {
      const baseSlow = tw.slow || 0.36;
      enemies.forEach(en => {
        if (Math.hypot(en.x - tw.x, en.y - tw.y) <= tw.range) {
          if (en.frostImmune) {
            applyDamageToEnemy(en, tw.dmg * 0.5, 'frost', tw);
            if (en.immunTextCd <= 0) {
              en.immunTextCd = 1.6;
              addFloatText(en.x, en.y - 0.3, 'IMMUN!', '#fb923c', 0.85);
              addSparkBurst(en.x, en.y, '#fb923c', 4, 2.1);
            }
          } else if (en.thawTimer > 0) {
            applyDamageToEnemy(en, tw.dmg, 'frost', tw);
          } else {
            applyDamageToEnemy(en, tw.dmg, 'frost', tw);
            const effSlow = baseSlow * (1 - (en.slowResist || 0));
            const slowMult = Math.max(0.42, 1 - effSlow);
            en.slowTimer = en.kind === 'boss' ? 0.65 : 1.15;
            en.slowFactor = Math.min(en.slowFactor || 1, slowMult);
          }
        }
      });
      particles.push({ x: tw.x, y: tw.y, maxR: tw.range, life: 0.24, color: '#a5f3fc', ring: true });
      TDAudio.frostPulse();
    } else if (tw.def.id === 'rail') {
      applyDamageToEnemy(best, tw.dmg, 'rail', tw);
      beams.push({ x0: tw.x, y0: tw.y, x1: best.x, y1: best.y, life: 0.16, color: overdriveTimer > 0 ? '#fde047' : '#f472b6' });
      addSparkBurst(best.x, best.y, '#f472b6', 5, 2.8);
      TDAudio.railShot();
    } else {
      projectiles.push({
        x: tw.x, y: tw.y, target: best, tx: best.x, ty: best.y,
        speed: tw.def.id === 'mortar' ? 8.2 : 11.2,
        dmg: tw.dmg, splash: tw.def.splash,
        color: overdriveTimer > 0 ? '#fde047' : tw.def.color,
        sourceType: tw.def.id,
        sourceTower: tw
      });
      if (tw.def.id === 'mortar') TDAudio.mortarLaunch();
      else TDAudio.pulseShot();
    }
  });

  for (let i = projectiles.length - 1; i >= 0; i--) {
    const pr = projectiles[i];
    if (pr.target && pr.target.hp > 0) { pr.tx = pr.target.x; pr.ty = pr.target.y; }
    const dx = pr.tx - pr.x;
    const dy = pr.ty - pr.y;
    const dist = Math.hypot(dx, dy);
    if (dist < pr.speed * dt + 0.12) {
      if (pr.splash > 0) {
        let hitCount = 0;
        enemies.forEach(en => {
          if (Math.hypot(en.x - pr.tx, en.y - pr.ty) <= pr.splash) {
            applyDamageToEnemy(en, pr.dmg, pr.sourceType || 'mortar', pr.sourceTower);
            hitCount++;
          }
        });
        particles.push({ x: pr.tx, y: pr.ty, maxR: pr.splash, life: 0.24, color: '#fb923c', ring: true });
        addSparkBurst(pr.tx, pr.ty, '#fb923c', 7, 3.0);
        TDAudio.mortarImpact();
        if (hitCount >= 4) triggerShake(2.2, 0.1);
      } else if (pr.target && pr.target.hp > 0) {
        applyDamageToEnemy(pr.target, pr.dmg, pr.sourceType || 'pulse', pr.sourceTower);
        addSparkBurst(pr.tx, pr.ty, pr.color, 3, 1.8);
      }
      projectiles.splice(i, 1);
    } else {
      pr.x += (dx / dist) * pr.speed * dt;
      pr.y += (dy / dist) * pr.speed * dt;
    }
  }

  let changedStats = false;
  for (let i = enemies.length - 1; i >= 0; i--) {
    const en = enemies[i];
    if (en.hp <= 0) {
      gold += en.reward;
      score += en.reward * 5;
      particles.push({ x: en.x, y: en.y, maxR: en.kind === 'boss' ? 1.15 : 0.48, life: 0.24, color: en.kind === 'boss' ? '#fbbf24' : '#4ade80', ring: en.kind === 'boss' });
      addSparkBurst(en.x, en.y, en.kind === 'boss' ? '#fb7185' : (en.kind === 'thermo' ? '#fb923c' : '#4ade80'), en.kind === 'boss' ? 16 : 6, en.kind === 'boss' ? 4.2 : 2.5);
      if (en.kind === 'boss') {
        TDAudio.bossDefeat();
        triggerShake(5.5, 0.24);
        addFloatText(en.x, en.y - 0.3, `💀 +${en.reward}💰 BOSS!`, '#fde047', 1.3);
      } else if (en.reward >= 13) {
        addFloatText(en.x, en.y - 0.2, `+${en.reward}💰`, '#fde047', 0.9);
      }
      enemies.splice(i, 1);
      if (en.kind === 'splitter' && !en.noSplit) spawnSplitChildren(en);
      changedStats = true;
    }
  }

  const isOngoingNow = wave > 0 && (waveQueue.length > 0 || enemies.length > 0);
  if (isOngoingNow) waveWasOngoing = true;
  if (!isOngoingNow && wave > 0) {
    if (waveWasOngoing) {
      waveWasOngoing = false;
      ArcadeScores.record('tower', score, `${score} Pkt (Welle ${wave})`, false, { runId: currentRunId, silent: true });
      refreshTopBest();
      changedStats = true;
    }
    if (autoWave) {
      autoWaveTimer += dt;
      if (autoWaveTimer >= 0.65) {
        autoWaveTimer = 0;
        sendNextWave();
      }
    }
  }

  if (changedStats || hudTickDirty) {
    updateHUD();
    if (changedStats) renderInspector();
  }

  for (let i = beams.length - 1; i >= 0; i--) {
    beams[i].life -= dt;
    if (beams[i].life <= 0) beams.splice(i, 1);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].life -= dt;
    if (particles[i].life <= 0) particles.splice(i, 1);
  }
  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i];
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    s.vx *= 0.92;
    s.vy *= 0.92;
    s.life -= dt;
    if (s.life <= 0) sparks.splice(i, 1);
  }
  for (let i = floatTexts.length - 1; i >= 0; i--) {
    const ft = floatTexts[i];
    ft.y -= 0.72 * dt;
    ft.life -= dt;
    if (ft.life <= 0) floatTexts.splice(i, 1);
  }
}

let last = performance.now();
function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  stepTD(dt);
  tdScene.syncAndRender(dt, {
    towers, enemies, projectiles, beams, particles, sparks, floatTexts,
    selectedTower, pendingBuildTile, hoverTile, selectedType,
    towerDefs: TOWER_TYPES, pathCells, gold, overdriveTimer, shakeTime, shakeMag
  });
  requestAnimationFrame(loop);
}

window.addEventListener('resize', () => tdScene.resize());
window.addEventListener('arcade:theme-changed', (e) => {
  tdScene.applyTheme(e.detail === 'light');
  updateWaveBannerDOM();
});

// Expose UI controls cleanly to DOM handlers
Object.assign(window, {
  resetTD,
  toggleSpeed,
  toggleAutoWave,
  triggerOverdrive,
  sendNextWave,
  selectShopTower,
  deselectTower,
  setTowerTargetMode,
  upgradeSelected,
  sellSelected,
  confirmPendingBuild,
  tdCamZoom: (delta) => tdScene.zoomBy(delta),
  tdCamReset: () => tdScene.resetCamera(),
  tdCamTilt: () => tdScene.toggleTilt()
});

ArcadeAudio.syncButton(document.getElementById('btn-mute'));
refreshTopBest();
resetTD(0);
requestAnimationFrame(loop);
