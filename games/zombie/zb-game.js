// Core Gameplay Logic & Input Controller for Zombie Horde: Gate Runner 3D
// Preserves 100% of original gate-runner mechanics, waves, collisions, and localStorage highscores.

import { ZBScene } from './zb-scene.js';
import { ZBAudio } from './zb-audio.js';

const canvas = document.getElementById('zCanvas');
const stage = document.getElementById('stage');
const zbScene = new ZBScene(canvas, stage);

const MAX_SQUAD = 50;
const MAX_RATE = 10.5;
const MAX_DMG = 3.5;
const MAX_SHIELD = 3;

let running = false;
let gameOver = false;
let playerU = 0; // -0.85 .. +0.85
let targetU = 0;
let squad = 1;
let fireRate = 4.5; // shots/sec per shooter
let spreadLevel = 1; // 1 = standard, 2 = 3-way spread, 3 = 5-way mega-spread
let pierceLevel = 0; // 0 = off, 1..2 = railgun pierce targets
let explosiveLevel = 0; // 0 = off, 1..2 = plasma splash radius
let dmgMult = 1.0;
let shield = 0;
let shieldGrace = 0;
let nextZombieId = 1;
let score = 0;
let kills = 0;
let wave = 1;
let elapsed = 0;
let roadScroll = 0;
let shootTimer = 0;
let gateTimer = 3.2;
let waveSpawnTimer = 0.6;
let bossCooldown = 16;
let sfxShotCd = 0;
let shakeAmt = 0;
let currentRunId = ArcadeScores.newRunId('zombie');

let bullets = [];
let zombies = [];
let gates = [];
let barrels = [];
let fx = [];
let floaters = [];

const keys = { left: false, right: false };
let pointerActive = false;

function spawnBurst(u, z, color, count = 8, spread = 0.08, big = false) {
  fx.push({
    u, z, ring: true,
    color: big ? '#fde047' : color,
    life: big ? 0.42 : 0.22,
    maxLife: big ? 0.42 : 0.22,
    maxR: big ? 76 : 26
  });
  for (let i = 0; i < count; i++) {
    const life = (big ? 0.44 : 0.24) + Math.random() * 0.16;
    fx.push({
      u, z,
      vu: (Math.random() - 0.5) * spread * 2.6,
      vz: (Math.random() - 0.35) * spread * 1.5,
      vy: -(20 + Math.random() * (big ? 58 : 30)),
      color: (big && i % 3 === 0) ? '#fef08a' : color,
      size: (big ? 3.8 : 2.2) + Math.random() * 2.2,
      life,
      maxLife: life
    });
  }
}

function refreshTopBest() {
  const b = ArcadeScores.getBest('zombie');
  document.getElementById('top-best').textContent = b ? b.best : 0;
}

function startGame() {
  ArcadeAudio.click();
  document.getElementById('overlay').classList.add('hidden');
  keys.left = false;
  keys.right = false;
  pointerActive = false;
  running = true;
  gameOver = false;
  playerU = 0;
  targetU = 0;
  squad = 1;
  fireRate = 4.5;
  spreadLevel = 1;
  pierceLevel = 0;
  explosiveLevel = 0;
  dmgMult = 1.0;
  shield = 0;
  shieldGrace = 0;
  score = 0;
  kills = 0;
  wave = 1;
  elapsed = 0;
  roadScroll = 0;
  shootTimer = 0;
  gateTimer = 1.4;
  waveSpawnTimer = 2.1;
  bossCooldown = 18;
  bullets = [];
  zombies = [];
  gates = [];
  barrels = [];
  fx = [];
  floaters = [];
  currentRunId = ArcadeScores.newRunId('zombie');
  spawnZombiePack(2);
  updateHUD();
}

function spawnZombiePack(count) {
  const sideBias = Math.random() < 0.5 ? -0.45 : 0.45;
  const speedScale = 1 + Math.min(0.75, (wave - 1) * 0.075);
  const fastProb = wave >= 2 ? Math.min(0.36, 0.20 + wave * 0.025) : 0;
  const bruteProb = wave >= 3 ? Math.min(0.28, 0.12 + (wave - 2) * 0.025) : 0;
  const phalanx = wave >= 3 && Math.random() < 0.26;
  const normalHp = wave === 1 ? 1.85 : (1.8 + Math.pow(wave, 1.52) * 1.35 + squad * 0.14);

  for (let i = 0; i < count; i++) {
    const roll = Math.random();
    const brute = roll < bruteProb;
    const fast = !brute && roll < bruteProb + fastProb;
    const hpBase = brute ? normalHp * 2.7 : (fast ? normalHp * 0.65 : normalHp);
    const uPos = phalanx
      ? -0.78 + (1.56 * i) / Math.max(1, count - 1)
      : (Math.random() < 0.6 ? sideBias + (Math.random() - 0.5) * 0.65 : (Math.random() - 0.5) * 1.72);
    zombies.push({
      id: nextZombieId++,
      u: Math.max(-0.88, Math.min(0.88, uPos)),
      z: 0.95 + Math.random() * 0.13,
      speed: (fast ? 0.245 : (brute ? 0.115 : 0.165)) * speedScale,
      hp: hpBase,
      maxHp: hpBase,
      radius: brute ? 0.12 : 0.08,
      kind: brute ? 'brute' : (fast ? 'fast' : 'normal'),
      hitFlash: 0
    });
  }
  if (Math.random() < 0.38) {
    barrels.push({
      u: (Math.random() - 0.5) * 1.45,
      z: 0.98,
      hp: 2.2 + wave * 0.95,
      speed: 0.15 * speedScale
    });
  }
}

function spawnBoss() {
  const playerEstDps = squad * dmgMult * fireRate;
  const hp = Math.max(55 + wave * 42, playerEstDps * (3.6 + Math.min(2.2, wave * 0.22)));
  zombies.push({
    id: nextZombieId++,
    u: (Math.random() - 0.5) * 0.7,
    z: 1.0,
    speed: 0.095 + Math.min(0.055, wave * 0.0055),
    hp,
    maxHp: hp,
    radius: 0.17,
    kind: 'boss',
    hitFlash: 0
  });
  spawnZombiePack(2 + Math.min(5, wave));
  ZBAudio.bossSpawn();
  floaters.push({ u: 0, z: 0.75, text: `⚠️ BOSS WELLE ${wave}!`, color: '#fb7185', life: 1.5 });
}

function makeRandomGatePair() {
  const weaponTypes = [
    { op: 'rate', val: 0.25, label: '⚡ +25% Kadenz' },
    { op: 'spread', val: 1, label: '🔥 Streuschuss' },
    { op: 'pierce', val: 1, label: '⚡ Rail-Durchschlag' },
    { op: 'explosive', val: 1, label: '🚀 Explosiv-Plasma' },
    { op: 'dmg', val: 0.30, label: '💥 +30% Schaden' },
    { op: 'shield', val: 1, label: '🛡️ +1 EMP-Schild' }
  ];
  const stepCost = Math.round((2.0 + (wave - 1) * 1.45 + Math.sqrt(squad) * 1.05) * 10) / 10;
  const maxBoost = Math.min(20, 8 + wave * 2);

  const makeShootableGate = (side) => {
    const startNeg = wave >= 2 ? -(2 + Math.floor(Math.random() * Math.min(5, 2 + wave * 0.5))) : -(1 + Math.floor(Math.random() * 2));
    const val = Math.random() < 0.78 ? startNeg : 1;
    return {
      side,
      uMin: side < 0 ? -0.94 : 0,
      uMax: side < 0 ? 0 : 0.94,
      z: 1.0,
      kind: 'add',
      val,
      maxVal: maxBoost,
      dmgAccum: 0,
      stepCost,
      shootable: true,
      locked: false
    };
  };

  const makeHazardGate = (side) => {
    const hazards = [
      { op: 'add', val: -(2 + Math.min(5, wave)), label: null },
      { op: 'add', val: -(3 + Math.min(6, wave)), label: null }
    ];
    if (wave >= 3) {
      hazards.push({ op: 'rateBad', val: -0.20, label: '🔒 -20% Kadenz' });
      hazards.push({ op: 'div', val: 2, label: '🔒 ÷2 Trupp!' });
    }
    const h = hazards[Math.floor(Math.random() * hazards.length)];
    return {
      side,
      uMin: side < 0 ? -0.94 : 0,
      uMax: side < 0 ? 0 : 0.94,
      z: 1.0,
      kind: h.op,
      val: h.val,
      label: h.label,
      shootable: false,
      locked: true
    };
  };

  const makePerkOrMultGate = (side) => {
    if (wave >= 2 && squad <= 18 && Math.random() < 0.22) {
      return {
        side,
        uMin: side < 0 ? -0.94 : 0,
        uMax: side < 0 ? 0 : 0.94,
        z: 1.0,
        kind: 'mult',
        val: 2,
        shootable: false,
        locked: false
      };
    }
    const available = weaponTypes.filter(w =>
      !(w.op === 'spread' && spreadLevel >= 3) &&
      !(w.op === 'pierce' && pierceLevel >= 2) &&
      !(w.op === 'explosive' && explosiveLevel >= 2) &&
      !(w.op === 'rate' && fireRate >= MAX_RATE) &&
      !(w.op === 'dmg' && dmgMult >= MAX_DMG) &&
      !(w.op === 'shield' && shield >= MAX_SHIELD)
    );
    if (available.length === 0) return makeShootableGate(side);
    const wp = available[Math.floor(Math.random() * available.length)];
    return {
      side,
      uMin: side < 0 ? -0.94 : 0,
      uMax: side < 0 ? 0 : 0.94,
      z: 1.0,
      kind: wp.op,
      val: wp.val,
      label: wp.label,
      shootable: false,
      locked: false
    };
  };

  const leftSide = Math.random() < 0.5;
  const hazardChance = wave >= 2 ? Math.min(0.42, 0.18 + (wave - 1) * 0.05) : 0;
  const leftGate = makeShootableGate(leftSide ? -1 : 1);
  const rightGate = Math.random() < hazardChance
    ? makeHazardGate(leftSide ? 1 : -1)
    : (Math.random() < 0.62 ? makePerkOrMultGate(leftSide ? 1 : -1) : makeShootableGate(leftSide ? 1 : -1));
  gates.push(leftGate, rightGate);
}

function applyGate(g) {
  let msg = '';
  let good = true;
  if (g.kind === 'add') {
    const next = Math.max(0, squad + g.val);
    good = g.val >= 0;
    msg = (g.val >= 0 ? `+${g.val}` : `${g.val}`) + ' Schützen';
    squad = Math.min(MAX_SQUAD, next);
  } else if (g.kind === 'mult') {
    const bonus = Math.min(18, squad * (g.val - 1));
    squad = Math.min(MAX_SQUAD, squad + bonus);
    msg = `+${bonus} Trupp (×${g.val})!`;
  } else if (g.kind === 'div') {
    const lost = Math.max(1, Math.floor(squad / 2));
    squad = Math.max(0, squad - lost);
    good = false;
    msg = `÷2 (-${lost} Schützen)!`;
  } else if (g.kind === 'rate') {
    fireRate = Math.min(MAX_RATE, fireRate * (1 + g.val));
    msg = '⚡ Feuerrate!';
  } else if (g.kind === 'rateBad') {
    fireRate = Math.max(2.6, fireRate * (1 + g.val));
    good = false;
    msg = '⚠️ -20% Kadenz!';
  } else if (g.kind === 'spread') {
    spreadLevel = Math.min(3, spreadLevel + 1);
    msg = spreadLevel === 2 ? '🔥 3× Streuschuss!' : '🔥 5× Mega-Streu!';
  } else if (g.kind === 'pierce') {
    pierceLevel = Math.min(2, pierceLevel + 1);
    msg = pierceLevel === 1 ? '⚡ Rail-Durchschlag!' : '⚡ 2× Rail-Laser!';
  } else if (g.kind === 'explosive') {
    explosiveLevel = Math.min(2, explosiveLevel + 1);
    msg = explosiveLevel === 1 ? '🚀 Explosiv-Plasma!' : '🚀 Mega-Explosiv!';
  } else if (g.kind === 'dmg') {
    dmgMult = Math.min(MAX_DMG, dmgMult + g.val);
    msg = '💥 Stärkere Munition!';
  } else if (g.kind === 'shield') {
    shield = Math.min(MAX_SHIELD, shield + 1);
    shieldGrace = Math.max(shieldGrace, 0.35);
    msg = '🛡️ EMP-Schild bereit!';
  }

  if (squad <= 0) {
    squad = 0;
    updateHUD();
    triggerGameOver('Trupp durch rotes Tor auf 0 gefallen!');
    return;
  }
  if (good) ArcadeAudio.perkGood(); else ArcadeAudio.perkBad();
  floaters.push({ u: playerU, z: 0.08, text: msg, color: good ? '#4ade80' : '#fb7185', life: 1.1 });
  updateHUD();
}

function fireVolley() {
  const streams = Math.min(8, squad);
  const dmgPerBullet = (1.0 * dmgMult) * (squad / streams);
  // Real, wide 3D fan angles across the bridge width
  const spreadAngles = spreadLevel === 1
    ? [0]
    : (spreadLevel === 2 ? [-2.35, 0, 2.35] : [-4.2, -2.1, 0, 2.1, 4.2]);
  const volleyMult = spreadLevel === 1 ? 1.0 : (spreadLevel === 2 ? 1.65 : 2.25);
  const pelletDmg = (dmgPerBullet * volleyMult) / spreadAngles.length;
  const span = Math.min(0.26, (streams - 1) * 0.042);
  for (let i = 0; i < streams; i++) {
    const uOff = streams === 1 ? 0 : -span + (2 * span * i) / (streams - 1);
    for (const du of spreadAngles) {
      bullets.push({
        u: playerU + uOff,
        z: 0.04,
        du,
        dz: 1.45,
        dmg: pelletDmg,
        isSpread: du !== 0,
        pierceLeft: pierceLevel,
        explosive: explosiveLevel,
        hitIds: pierceLevel > 0 ? [] : null
      });
    }
  }
  if (sfxShotCd <= 0) {
    ZBAudio.shot(spreadLevel, dmgMult);
    sfxShotCd = 0.095;
  }
}

function triggerGameOver(reason) {
  running = false;
  gameOver = true;
  ArcadeAudio.fail();
  const isNew = ArcadeScores.record('zombie', score, `${score} Pkt (Welle ${wave})`, false, { runId: currentRunId });
  refreshTopBest();
  document.getElementById('ov-emoji').textContent = isNew ? '🏆' : '💀';
  document.getElementById('ov-title').textContent = isNew ? 'Neuer Zombie-Rekord!' : 'Überrannt!';
  document.getElementById('ov-desc').innerHTML = `${reason}<br><br>Welle: <strong>${wave}</strong> · Erledigte Zombies: <strong>${kills}</strong> · Punkte: <strong>${score}</strong>`;
  document.getElementById('ov-btn').textContent = '🔄 Nochmal kämpfen!';
  const boardBtn = document.getElementById('ov-board-btn');
  if (boardBtn) boardBtn.classList.remove('hidden');
  document.getElementById('overlay').classList.remove('hidden');
}

function updateHUD() {
  document.getElementById('hud-squad').textContent = squad;
  document.getElementById('hud-wave').textContent = wave;
  document.getElementById('hud-rate').textContent = (fireRate / 4.5).toFixed(1) + '×';
  const parts = [];
  if (spreadLevel >= 3) parts.push('5× Streu');
  else if (spreadLevel === 2) parts.push('3× Streu');
  if (pierceLevel > 0) parts.push(pierceLevel >= 2 ? '2× Rail' : 'Rail');
  if (explosiveLevel > 0) parts.push(explosiveLevel >= 2 ? 'Mega-Expl' : 'Explosiv');
  document.getElementById('hud-weapon').textContent = parts.length ? parts.join(' + ') : 'Karabiner';
  document.getElementById('hud-shield').textContent = shield;
  document.getElementById('hud-score').textContent = score;
  const bar = document.getElementById('hud-squad-bar');
  if (bar) {
    const pct = Math.max(0, Math.min(100, (squad / MAX_SQUAD) * 100));
    bar.style.width = `${pct}%`;
  }
}

function step(dt) {
  if (!running) return;
  elapsed += dt;
  roadScroll = (roadScroll + dt * 1.35) % 1000;
  sfxShotCd -= dt;
  shieldGrace = Math.max(0, shieldGrace - dt);
  shakeAmt = Math.max(0, shakeAmt - dt * 30);

  const moveSpd = 1.45;
  if (keys.left) targetU -= moveSpd * dt;
  if (keys.right) targetU += moveSpd * dt;
  targetU = Math.max(-0.78, Math.min(0.78, targetU));

  // Smooth, damped lateral motion (prevents instant teleporting across the bridge)
  const maxLateralSpeed = 1.85;
  const diffU = targetU - playerU;
  const desiredStep = diffU * (1 - Math.exp(-9.0 * dt));
  const maxStep = maxLateralSpeed * dt;
  playerU += Math.max(-maxStep, Math.min(maxStep, desiredStep));

  // Wave progression
  const newWave = 1 + Math.floor(elapsed / 12);
  if (newWave > wave) {
    wave = newWave;
    ZBAudio.waveUp();
    floaters.push({ u: 0, z: 0.65, text: `🌊 WELLE ${wave}!`, color: '#38bdf8', life: 1.3 });
    updateHUD();
  }

  // Auto-fire
  shootTimer -= dt;
  if (shootTimer <= 0) {
    fireVolley();
    shootTimer = 1 / fireRate;
  }

  // Spawns
  gateTimer -= dt;
  if (gateTimer <= 0) {
    makeRandomGatePair();
    gateTimer = Math.max(4.4, 5.4 - wave * 0.12);
  }
  waveSpawnTimer -= dt;
  if (waveSpawnTimer <= 0) {
    const packSz = wave === 1
      ? (2 + (Math.random() < 0.35 ? 1 : 0))
      : (3 + Math.min(10, Math.floor(wave * 1.0 + Math.random() * 2.2)));
    spawnZombiePack(packSz);
    waveSpawnTimer = wave === 1 ? 2.15 : Math.max(0.58, 2.0 - wave * 0.14);
  }
  bossCooldown -= dt;
  if (bossCooldown <= 0) {
    spawnBoss();
    bossCooldown = Math.max(13, 18 - Math.floor(wave * 0.5));
  }

  // Update Gates
  for (let i = gates.length - 1; i >= 0; i--) {
    const g = gates[i];
    g.z -= 0.195 * dt;
    if (g.z <= 0.05) {
      const hit = playerU >= g.uMin && playerU <= g.uMax;
      if (hit) applyGate(g);
      gates.splice(i, 1);
      if (gameOver) return;
    }
  }

  // Update Barrels
  for (let i = barrels.length - 1; i >= 0; i--) {
    const b = barrels[i];
    b.z -= b.speed * dt;
    if (b.z <= 0.04) {
      barrels.splice(i, 1);
    }
  }

  // Update Bullets + Collisions
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.u += b.du * dt;
    b.z += b.dz * dt;
    if (b.z > 1.05 || Math.abs(b.u) > 1.1) {
      bullets.splice(i, 1);
      continue;
    }
    let consumed = false;

    for (let gi = 0; gi < gates.length; gi++) {
      const g = gates[gi];
      if (g.shootable && Math.abs(b.z - g.z) < 0.045 && b.u >= g.uMin && b.u <= g.uMax) {
        consumed = true;
        if (g.val < g.maxVal) {
          g.dmgAccum += b.dmg;
          while (g.dmgAccum >= g.stepCost && g.val < g.maxVal) {
            g.dmgAccum -= g.stepCost;
            g.val += 1;
            ZBAudio.gateTick(g.val >= 0);
          }
          if (g.val >= g.maxVal) g.dmgAccum = g.stepCost;
        }
        fx.push({ u: b.u, z: g.z, color: g.val >= 0 ? '#4ade80' : '#38bdf8', life: 0.16, maxLife: 0.16 });
        break;
      }
    }
    if (consumed) { bullets.splice(i, 1); continue; }

    for (let bi = barrels.length - 1; bi >= 0; bi--) {
      const br = barrels[bi];
      if (Math.abs(b.z - br.z) < 0.055 && Math.abs(b.u - br.u) < 0.11) {
        br.hp -= b.dmg;
        consumed = true;
        if (br.hp <= 0) {
          ZBAudio.barrelExplosion();
          shakeAmt = Math.max(shakeAmt, 10);
          spawnBurst(br.u, br.z, '#fb923c', 16, 0.24, true);
          spawnBurst(br.u, br.z, '#fde047', 8, 0.14, false);
          for (let zi = zombies.length - 1; zi >= 0; zi--) {
            const zm = zombies[zi];
            if (Math.hypot(zm.u - br.u, (zm.z - br.z) * 1.8) < 0.55) {
              zm.hp -= (12 + wave * 6.5);
              zm.hitFlash = 0.15;
            }
          }
          barrels.splice(bi, 1);
        }
        break;
      }
    }
    if (consumed) { bullets.splice(i, 1); continue; }

    for (let zi = zombies.length - 1; zi >= 0; zi--) {
      const zm = zombies[zi];
      if (zm.hp <= 0) continue;
      if (b.hitIds && b.hitIds.includes(zm.id)) continue;
      if (Math.abs(b.z - zm.z) < 0.055 && Math.abs(b.u - zm.u) < zm.radius + 0.04) {
        zm.hp -= b.dmg;
        zm.hitFlash = 0.08;
        const bloodCol = zm.kind === 'fast' ? '#22d3ee' : (zm.kind === 'brute' ? '#c084fc' : '#4ade80');
        spawnBurst(b.u, zm.z, b.explosive ? '#fb923c' : bloodCol, b.explosive ? 6 : 4, b.explosive ? 0.12 : 0.06, false);

        if (b.explosive > 0) {
          const splashR = b.explosive >= 2 ? 0.34 : 0.24;
          const splashDmg = b.dmg * (b.explosive >= 2 ? 0.72 : 0.48);
          for (let sj = zombies.length - 1; sj >= 0; sj--) {
            const z2 = zombies[sj];
            if (z2 === zm || z2.hp <= 0) continue;
            if (Math.hypot(z2.u - zm.u, (z2.z - zm.z) * 1.8) < splashR) {
              z2.hp -= splashDmg;
              z2.hitFlash = 0.08;
            }
          }
        }

        if (b.pierceLeft > 0) {
          b.pierceLeft--;
          if (b.hitIds) b.hitIds.push(zm.id);
        } else {
          consumed = true;
          break;
        }
      }
    }
    if (consumed) bullets.splice(i, 1);
  }

  // Process dead or breaching Zombies
  const visCols = Math.min(5, squad);
  const squadHalfW = 0.22 + Math.max(0, visCols - 1) * 0.036;
  for (let i = zombies.length - 1; i >= 0; i--) {
    const zm = zombies[i];
    if (zm.hp <= 0) {
      kills++;
      const pts = zm.kind === 'boss' ? 400 : (zm.kind === 'brute' ? 45 : 15);
      score += pts;
      if (zm.kind === 'boss') {
        ZBAudio.bossDefeat();
        dmgMult = Math.min(MAX_DMG, dmgMult + 0.15);
        shakeAmt = Math.max(shakeAmt, 12);
        floaters.push({ u: zm.u, z: zm.z, text: `🏆 BOSS BESIEGT +${pts}`, color: '#fbbf24', life: 1.4 });
      } else {
        ZBAudio.zombieKill(zm.kind);
      }
      spawnBurst(zm.u, zm.z, zm.kind === 'boss' ? '#fb7185' : '#ef4444', zm.kind === 'boss' ? 20 : 8, zm.kind === 'boss' ? 0.22 : 0.1, zm.kind === 'boss');
      zombies.splice(i, 1);
      updateHUD();
      continue;
    }
    zm.z -= zm.speed * dt;
    if (zm.z < 0.72 && zm.z > 0.06) {
      const trackSpd = zm.kind === 'fast' ? 0.24 : (zm.kind === 'boss' ? 0.12 : (zm.kind === 'brute' ? 0.09 : 0.14));
      const du = playerU - zm.u;
      if (Math.abs(du) > 0.04) {
        zm.u += Math.sign(du) * Math.min(Math.abs(du), trackSpd * dt);
      }
    }
    zm.hitFlash = Math.max(0, zm.hitFlash - dt);
    if (zm.z <= 0.045) {
      if (Math.abs(zm.u - playerU) < squadHalfW + zm.radius) {
        if (shieldGrace > 0) {
          spawnBurst(zm.u, 0.05, '#38bdf8', 5, 0.08, false);
          zombies.splice(i, 1);
          continue;
        }
        if (shield > 0) {
          shield--;
          shieldGrace = 0.90;
          ZBAudio.shieldBlock();
          shakeAmt = Math.max(shakeAmt, 8);
          spawnBurst(playerU, 0.06, '#38bdf8', 18, 0.24, true);
          floaters.push({ u: playerU, z: 0.09, text: '🛡️ EMP-SCHILD!', color: '#38bdf8', life: 1.0 });
          // EMP blast clears or heavily damages nearby front-line zombies
          const empDmg = 18 + wave * 8;
          for (let zi = zombies.length - 1; zi >= 0; zi--) {
            if (zi === i) continue;
            const zNear = zombies[zi];
            if (zNear.z < 0.24 && Math.abs(zNear.u - playerU) < 0.78) {
              zNear.hp -= empDmg;
              zNear.hitFlash = 0.15;
            }
          }
        } else {
          const loss = zm.kind === 'boss' ? Math.max(4, Math.ceil(squad * 0.55)) : (zm.kind === 'brute' ? 2 : 1);
          squad -= loss;
          ArcadeAudio.perkBad();
          shakeAmt = Math.max(shakeAmt, 9);
          spawnBurst(playerU, 0.04, '#fb7185', 8, 0.1, false);
          floaters.push({ u: playerU, z: 0.08, text: `-${loss} Trupp!`, color: '#fb7185', life: 0.9 });
        }
        zombies.splice(i, 1);
        updateHUD();
        if (squad <= 0) {
          squad = 0;
          updateHUD();
          triggerGameOver('Die Zombie-Horde hat deinen Trupp überrannt!');
          return;
        }
      } else {
        zombies.splice(i, 1);
      }
    }
  }

  for (let i = fx.length - 1; i >= 0; i--) {
    const f = fx[i];
    f.life -= dt;
    if (f.vu) f.u += f.vu * dt;
    if (f.vz) f.z += f.vz * dt;
    if (f.vy !== undefined) f.vy += 120 * dt;
    if (f.life <= 0) fx.splice(i, 1);
  }
  for (let i = floaters.length - 1; i >= 0; i--) {
    floaters[i].life -= dt;
    floaters[i].z += 0.04 * dt;
    if (floaters[i].life <= 0) floaters.splice(i, 1);
  }
}

let last = performance.now();
function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  step(dt);
  zbScene.syncAndRender(dt, {
    running, playerU, squad, fireRate, spreadLevel, pierceLevel, explosiveLevel, dmgMult, shield, shieldGrace,
    roadScroll, shootTimer, shakeAmt,
    bullets, zombies, gates, barrels, fx, floaters
  });
  requestAnimationFrame(loop);
}

// Relative pointer drag on stage steers smoothly without teleporting on tap
let dragStartX = 0;
let dragStartU = 0;

function updateDragU(clientX) {
  const r = stage.getBoundingClientRect();
  const deltaRel = (clientX - dragStartX) / Math.max(1, r.width);
  targetU = Math.max(-0.78, Math.min(0.78, dragStartU + deltaRel * 2.1));
}

stage.addEventListener('pointerdown', (e) => {
  if (!running || e.target.closest('.zb-cam-btn, #overlay')) return;
  pointerActive = true;
  dragStartX = e.clientX;
  dragStartU = targetU;
  try { stage.setPointerCapture(e.pointerId); } catch (_) {}
});
stage.addEventListener('pointermove', (e) => {
  if (pointerActive && running) updateDragU(e.clientX);
});
window.addEventListener('pointerup', () => { pointerActive = false; });
window.addEventListener('pointercancel', () => { pointerActive = false; });

window.addEventListener('keydown', (e) => {
  const ae = document.activeElement;
  if ((e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT')) ||
      (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.tagName === 'SELECT')) ||
      document.querySelector('.arcade-modal-backdrop, #abm-drawer.open')) {
    return;
  }
  if (['ArrowLeft', 'a', 'A'].includes(e.key)) keys.left = true;
  if (['ArrowRight', 'd', 'D'].includes(e.key)) keys.right = true;
});
window.addEventListener('keyup', (e) => {
  if (['ArrowLeft', 'a', 'A'].includes(e.key)) keys.left = false;
  if (['ArrowRight', 'd', 'D'].includes(e.key)) keys.right = false;
});
window.addEventListener('blur', () => {
  keys.left = false;
  keys.right = false;
  pointerActive = false;
});

window.addEventListener('resize', () => zbScene.resize());
if (window.ResizeObserver) new ResizeObserver(() => zbScene.resize()).observe(stage);
window.addEventListener('arcade:theme-changed', (e) => {
  zbScene.applyTheme(e.detail === 'light');
});

window.startGame = startGame;
window.toggleZBCam = () => {
  const tac = zbScene.toggleCameraAngle();
  const btn = document.getElementById('btn-cam');
  if (btn) btn.classList.toggle('active', tac);
};

ArcadeAudio.syncButton(document.getElementById('btn-mute'));
refreshTopBest();
requestAnimationFrame(loop);
