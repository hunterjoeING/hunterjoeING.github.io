// Canyon Podracer 3D – Core Physics, Input, HUD, Escalating Laps & LocalStorage Leaderboard

import { PodScene } from './pod-scene.js';
import { PodAudio } from './pod-audio.js';
import { TRACK_HALF_WIDTH } from './pod-track.js';

const LOCAL_BOARD_KEY = 'podracer_leaderboard_v1';
const PILOT_NAME_KEY = 'podracer_pilot_name_v1';
const MAX_BOARD_ROWS = 8;

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function escHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function readBoard() {
  try {
    const raw = JSON.parse(localStorage.getItem(LOCAL_BOARD_KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch (e) {
    return [];
  }
}

function writeBoard(rows) {
  try {
    localStorage.setItem(LOCAL_BOARD_KEY, JSON.stringify(rows.slice(0, MAX_BOARD_ROWS)));
  } catch (e) {}
}

function getDefaultPilotName() {
  try {
    const localPilot = (localStorage.getItem(PILOT_NAME_KEY) || '').trim();
    if (localPilot) return localPilot;
  } catch (e) {}
  if (window.ArcadeScores && window.ArcadeScores.hasCustomPlayerName()) {
    return window.ArcadeScores.getPlayerName();
  }
  return '';
}

class PodracerGame {
  constructor() {
    this.canvas = document.getElementById('pod-canvas');
    this.stageEl = document.getElementById('pod-stage');

    this.elSpeed = document.getElementById('hud-speed');
    this.elLap = document.getElementById('hud-lap');
    this.elScore = document.getElementById('hud-score');
    this.elCombo = document.getElementById('hud-combo');
    this.elShieldBar = document.getElementById('hud-shield-bar');
    this.elShieldVal = document.getElementById('hud-shield-val');
    this.elBoostBar = document.getElementById('hud-boost-bar');
    this.elBoostVal = document.getElementById('hud-boost-val');
    this.elLapToast = document.getElementById('pod-lap-toast');

    this.elOverlay = document.getElementById('pod-overlay');
    this.elOvIcon = document.getElementById('ov-icon');
    this.elOvTitle = document.getElementById('ov-title');
    this.elOvSubtitle = document.getElementById('ov-subtitle');
    this.elOvStats = document.getElementById('ov-stats');
    this.elNameBox = document.getElementById('ov-name-box');
    this.elNameInput = document.getElementById('ov-name-input');
    this.elNameSaveBtn = document.getElementById('ov-name-save');
    this.elBoardBody = document.getElementById('ov-board-body');
    this.elStartBtn = document.getElementById('ov-start-btn');

    this.audio = new PodAudio();
    this.sceneCtrl = new PodScene(this.canvas, this.stageEl);

    this.mode = 'menu'; // 'menu' | 'playing' | 'gameover'
    this.keys = new Set();
    this.touchState = { left: false, right: false, boost: false };

    this.runId = null;
    this.lastRunEntryId = null;
    this.lapToastTimer = 0;

    this._resetState();
    this._bindEvents();
    this._renderBoard();
    this._updateHud();

    this._lastTime = performance.now();
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
  }

  _resetState() {
    this.s = 12;
    this.u = 0;
    this.lateralVel = 0;
    this.steerInput = 0;
    this.speed = 74;
    this.topKmh = 440;
    this.totalDist = 0;
    this.score = 0;
    this.lap = 1;
    this.shield = 100;
    this.boostEnergy = 100;
    this.boostLevel = 0;
    this.padBoostTimer = 0;
    this.invulnTimer = 0;
    this.wallCooldown = 0;
    this.shakeAmount = 0;
    this.hitWobble = 0;
    this.combo = 1;
    this.comboTimer = 0;
  }

  startGame() {
    this.audio.unlock();
    if (window.ArcadeAudio) window.ArcadeAudio.click();

    this._resetState();
    this.sceneCtrl.track.layoutForLap(1);
    this.mode = 'playing';
    this.runId = window.ArcadeScores ? window.ArcadeScores.newRunId('podracer') : null;
    this.lastRunEntryId = null;
    this.elOverlay.classList.add('hidden');
    this._showToast('🏁 RUNDE 1 · VOLLGAS!', 1.8);
    this._updateHud();
  }

  _showToast(msg, dur = 1.8) {
    if (!this.elLapToast) return;
    this.elLapToast.textContent = msg;
    this.elLapToast.classList.add('visible');
    this.lapToastTimer = dur;
  }

  _finishGame() {
    this.mode = 'gameover';
    this.audio.stopEngine();
    if (window.ArcadeAudio) window.ArcadeAudio.fail();

    const finalScore = Math.round(this.score);
    const defaultName = getDefaultPilotName() || 'Pilot';
    const entryId = `run_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    this.lastRunEntryId = entryId;

    const board = readBoard();
    board.push({
      id: entryId,
      name: defaultName,
      score: finalScore,
      laps: this.lap,
      topSpeed: Math.round(this.topKmh),
      date: new Date().toISOString().slice(0, 10)
    });
    board.sort((a, b) => b.score - a.score);
    writeBoard(board);

    if (window.ArcadeScores && finalScore > 0) {
      window.ArcadeScores.record(
        'podracer',
        finalScore,
        `${finalScore.toLocaleString('de-DE')} Pkt · R${this.lap}`,
        false,
        { runId: this.runId, meta: { laps: this.lap, topSpeed: Math.round(this.topKmh) } }
      );
    }

    this.elOvIcon.textContent = '💥';
    this.elOvTitle.textContent = 'Triebwerke ausgefallen!';
    this.elOvSubtitle.textContent =
      'Du kannst deinen Pilotennamen optional für die lokale Bestenliste eintragen oder direkt neu starten.';
    this.elOvStats.innerHTML = `
      <div class="ov-stat"><span>Punkte</span><strong>${finalScore.toLocaleString('de-DE')}</strong></div>
      <div class="ov-stat"><span>Runde</span><strong>${this.lap}</strong></div>
      <div class="ov-stat"><span>Top-Speed</span><strong>${Math.round(this.topKmh)} km/h</strong></div>
    `;
    this.elOvStats.classList.remove('hidden');
    this.elNameBox.classList.remove('hidden');
    this.elNameInput.value = getDefaultPilotName();
    this.elNameSaveBtn.textContent = '💾 Eintragen';
    this.elNameSaveBtn.disabled = false;
    this.elStartBtn.textContent = '🚀 Erneut starten';

    this._renderBoard();
    this.elOverlay.classList.remove('hidden');
  }

  _saveOptionalName() {
    if (!this.lastRunEntryId) return;
    const raw = (this.elNameInput.value || '').trim().slice(0, 20);
    const chosen = raw || 'Pilot';
    try {
      localStorage.setItem(PILOT_NAME_KEY, raw);
    } catch (e) {}

    const board = readBoard();
    const row = board.find((r) => r.id === this.lastRunEntryId);
    if (row) {
      row.name = chosen;
      writeBoard(board);
    }
    if (raw && window.ArcadeScores) {
      window.ArcadeScores.setPlayerName(raw);
    }
    if (window.ArcadeAudio) window.ArcadeAudio.perkGood();
    this.elNameSaveBtn.textContent = '✅ Gespeichert';
    this._renderBoard();
  }

  _renderBoard() {
    if (!this.elBoardBody) return;
    const board = readBoard();
    if (board.length === 0) {
      this.elBoardBody.innerHTML =
        '<tr><td colspan="4" class="board-empty">Noch keine lokalen Zeiten — starte deinen ersten Canyon-Lauf!</td></tr>';
      return;
    }
    this.elBoardBody.innerHTML = board
      .slice(0, 6)
      .map((row, idx) => {
        const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;
        const isCurrent = row.id && row.id === this.lastRunEntryId;
        return `
          <tr class="${isCurrent ? 'is-current' : ''}">
            <td>${medal}</td>
            <td>${escHtml(row.name || 'Pilot')}</td>
            <td style="text-align:right;">R${Number(row.laps || 1)} · ${Number(row.topSpeed || 0)} km/h</td>
            <td style="text-align:right;font-weight:700;">${Number(row.score || 0).toLocaleString('de-DE')}</td>
          </tr>
        `;
      })
      .join('');
  }

  _bindEvents() {
    window.addEventListener('resize', () => this.sceneCtrl.resize());
    window.addEventListener('arcade:theme-changed', () => {
      const isLight = window.ArcadeTheme ? window.ArcadeTheme.isLight() : true;
      this.sceneCtrl.applyTheme(isLight);
    });

    window.addEventListener('keydown', (e) => {
      const tag = e.target && e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
      this.keys.add(e.code);
      if (e.code === 'KeyR' && this.mode === 'playing') {
        this.startGame();
      } else if ((e.code === 'Enter' || e.code === 'Space') && this.mode !== 'playing') {
        if (!document.querySelector('.arcade-modal-backdrop')) {
          this.startGame();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
    });

    window.addEventListener('blur', () => {
      this.keys.clear();
      this.touchState.left = false;
      this.touchState.right = false;
      this.touchState.boost = false;
    });

    // Multi-touch responsive buttons (Left / Right / Boost)
    const bindHoldBtn = (el, key) => {
      if (!el) return;
      const activeIds = new Set();
      const sync = () => {
        this.touchState[key] = activeIds.size > 0;
        el.classList.toggle('active', activeIds.size > 0);
      };
      el.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.audio.unlock();
        activeIds.add(e.pointerId);
        try { el.setPointerCapture(e.pointerId); } catch (_) {}
        sync();
      });
      const release = (e) => {
        activeIds.delete(e.pointerId);
        sync();
      };
      el.addEventListener('pointerup', release);
      el.addEventListener('pointercancel', release);
      el.addEventListener('lostpointercapture', release);
    };

    bindHoldBtn(document.getElementById('touch-left'), 'left');
    bindHoldBtn(document.getElementById('touch-right'), 'right');
    bindHoldBtn(document.getElementById('touch-boost'), 'boost');

    if (this.elStartBtn) {
      this.elStartBtn.addEventListener('click', () => this.startGame());
    }
    const restartBtn = document.getElementById('btn-pod-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => this.startGame());
    }
    if (this.elNameSaveBtn) {
      this.elNameSaveBtn.addEventListener('click', () => this._saveOptionalName());
    }
    if (this.elNameInput) {
      this.elNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this._saveOptionalName();
        }
      });
    }
  }

  _stepPlaying(dt) {
    const leftHeld = this.keys.has('ArrowLeft') || this.keys.has('KeyA') || this.touchState.left;
    const rightHeld = this.keys.has('ArrowRight') || this.keys.has('KeyD') || this.touchState.right;
    const boostHeld =
      this.keys.has('Space') ||
      this.keys.has('KeyW') ||
      this.keys.has('ArrowUp') ||
      this.touchState.boost;

    const targetSteer = (rightHeld ? 1 : 0) - (leftHeld ? 1 : 0);
    this.steerInput += (targetSteer - this.steerInput) * Math.min(1, dt * 13);

    // Lateral acceleration & damping
    this.lateralVel += targetSteer * 82 * dt;
    this.lateralVel -= this.lateralVel * Math.min(1, 5.1 * dt);
    this.u += this.lateralVel * dt;

    // Canyon wall collision & bounce
    const maxU = TRACK_HALF_WIDTH - 1.35;
    if (this.wallCooldown > 0) this.wallCooldown -= dt;
    if (Math.abs(this.u) > maxU) {
      const sign = Math.sign(this.u);
      this.u = sign * maxU;
      const impactSpeed = Math.abs(this.lateralVel);
      this.lateralVel = -this.lateralVel * 0.42;

      if (impactSpeed > 6.5 && this.wallCooldown <= 0) {
        this.wallCooldown = 0.55;
        this.shield = Math.max(0, this.shield - 12);
        this.speed *= 0.88;
        this.shakeAmount = Math.max(this.shakeAmount, 0.36);
        this.hitWobble = 0.6;
        this.audio.playCrash();
        this.sceneCtrl.emitHitBurst();
        if (this.shield <= 0) {
          this._finishGame();
          return;
        }
      }
    }

    // Escalating base speed with laps and distance
    const baseSpeed = 74 + Math.min(48, (this.lap - 1) * 11.5) + Math.min(26, this.totalDist * 0.0016);

    // Manual Boost + Boost-Pad Overdrive
    let manualBoost = false;
    if (boostHeld && this.boostEnergy > 4) {
      manualBoost = true;
      this.boostEnergy = Math.max(0, this.boostEnergy - 28 * dt);
    } else {
      this.boostEnergy = Math.min(100, this.boostEnergy + 7.2 * dt);
    }

    if (this.padBoostTimer > 0) this.padBoostTimer = Math.max(0, this.padBoostTimer - dt);
    const padActive = this.padBoostTimer > 0;
    const targetBoostLvl = padActive ? 1.0 : manualBoost ? 0.78 : 0.0;
    this.boostLevel += (targetBoostLvl - this.boostLevel) * Math.min(1, dt * 8.5);

    const targetSpeed = baseSpeed * (1 + this.boostLevel * 0.48);
    this.speed += (targetSpeed - this.speed) * Math.min(1, dt * 4.5);

    const ds = this.speed * dt;
    const prevS = this.s;
    this.s += ds;
    this.totalDist += ds;

    const kmh = this.speed * 5.95;
    if (kmh > this.topKmh) this.topKmh = kmh;

    // Combo decay & continuous distance score
    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) this.combo = 1;
    }
    this.score += ds * (0.65 + this.boostLevel * 0.5) * (1 + (this.combo - 1) * 0.12);

    // Check Lap crossing
    const trackLen = this.sceneCtrl.track.totalLength;
    if (this.s >= trackLen) {
      this.s -= trackLen;
      this.lap += 1;
      const lapBonus = 1000 * (this.lap - 1);
      this.score += lapBonus;
      this.shield = Math.min(100, this.shield + 20);
      this.sceneCtrl.track.layoutForLap(this.lap);
      this.audio.playLap();
      this._showToast(`🔥 RUNDE ${this.lap}! +${lapBonus.toLocaleString('de-DE')} Pkt`, 2.2);
    }

    // Check Boost Pads
    const pads = this.sceneCtrl.track.boostPads;
    for (let i = 0; i < pads.length; i++) {
      const pad = pads[i];
      if (Math.abs(this.s - pad.s) < pad.halfL && Math.abs(this.u - pad.u) < pad.halfW) {
        if (this.padBoostTimer < 1.2) {
          this.padBoostTimer = 1.65;
          this.boostEnergy = Math.min(100, this.boostEnergy + 18);
          this.score += 150;
          this.shakeAmount = Math.max(this.shakeAmount, 0.22);
          this.audio.playBoostPad();
        }
      }
    }

    // Check Energy Pickups
    const pickups = this.sceneCtrl.track.pickups;
    for (let i = 0; i < pickups.length; i++) {
      const p = pickups[i];
      if (p.collected) continue;
      if (Math.abs(this.s - p.s) < 3.5 && Math.abs(this.u - p.u) < 2.6) {
        p.collected = true;
        this.boostEnergy = Math.min(100, this.boostEnergy + 28);
        this.shield = Math.min(100, this.shield + 10);
        this.combo = Math.min(8, this.combo + 1);
        this.comboTimer = 6.5;
        this.score += 100 * this.combo;
        this.audio.playPickup(this.combo);
        this.sceneCtrl.emitPickupBurst();
      }
    }

    // Check Boulder / Obstacle Collisions
    if (this.invulnTimer > 0) this.invulnTimer = Math.max(0, this.invulnTimer - dt);
    if (prevS <= this.s) {
      const boulders = this.sceneCtrl.track.boulders;
      for (let i = 0; i < boulders.length; i++) {
        const b = boulders[i];
        if (Math.abs(this.s - b.s) < 2.4 && Math.abs(this.u - b.u) < b.radius + 1.45) {
          if (this.invulnTimer <= 0) {
            this.invulnTimer = 1.25;
            this.shield = Math.max(0, this.shield - 34);
            this.speed *= 0.62;
            this.combo = 1;
            this.comboTimer = 0;
            this.shakeAmount = 0.68;
            this.hitWobble = 1.0;
            this.audio.playCrash();
            this.sceneCtrl.emitHitBurst();

            if (this.shield <= 0) {
              this._finishGame();
              return;
            }
          }
          break;
        }
      }
    }

    this.shakeAmount = Math.max(0, this.shakeAmount - dt * 1.9);
    this.hitWobble = Math.max(0, this.hitWobble - dt * 2.2);

    this.audio.updateEngine((this.speed - 40) / 85, this.boostLevel, Math.abs(this.steerInput), true);
  }

  _stepMenuIdle(dt, timeSec) {
    this.speed = 56;
    this.s = (this.s + this.speed * dt) % this.sceneCtrl.track.totalLength;
    const targetU = Math.sin(timeSec * 0.55) * 4.2;
    this.steerInput = (targetU - this.u) * 0.28;
    this.u += (targetU - this.u) * Math.min(1, dt * 2.2);
    this.boostLevel = 0.12 + Math.sin(timeSec * 1.4) * 0.08;
    this.audio.updateEngine(0, 0, 0, false);
  }

  _updateHud() {
    if (this.elSpeed) this.elSpeed.textContent = Math.round(this.speed * 5.95);
    if (this.elLap) this.elLap.textContent = this.lap;
    if (this.elScore) this.elScore.textContent = Math.round(this.score).toLocaleString('de-DE');
    if (this.elCombo) this.elCombo.textContent = `${this.combo}×`;

    const sh = Math.round(clamp(this.shield, 0, 100));
    const bo = Math.round(clamp(this.boostEnergy, 0, 100));
    if (this.elShieldBar) {
      this.elShieldBar.style.width = `${sh}%`;
      this.elShieldBar.classList.toggle('low', sh <= 35);
    }
    if (this.elShieldVal) this.elShieldVal.textContent = `${sh}%`;
    if (this.elBoostBar) this.elBoostBar.style.width = `${bo}%`;
    if (this.elBoostVal) this.elBoostVal.textContent = `${bo}%`;
  }

  _loop(now) {
    requestAnimationFrame(this._loop);
    const dt = Math.min(0.05, Math.max(0.001, (now - this._lastTime) * 0.001));
    this._lastTime = now;

    if (this.lapToastTimer > 0) {
      this.lapToastTimer -= dt;
      if (this.lapToastTimer <= 0 && this.elLapToast) {
        this.elLapToast.classList.remove('visible');
      }
    }

    if (this.mode === 'playing') {
      this._stepPlaying(dt);
      this._updateHud();
    } else {
      this._stepMenuIdle(dt, now * 0.001);
    }

    this.sceneCtrl.renderFrame(dt, {
      s: this.s,
      u: this.u,
      steerInput: this.steerInput,
      lateralVel: this.lateralVel,
      speedRatio: clamp((this.speed - 35) / 90, 0, 1.8),
      boostLevel: this.boostLevel,
      shakeAmount: this.shakeAmount,
      invulnTimer: this.invulnTimer,
      hitWobble: this.hitWobble,
      isPlaying: this.mode === 'playing'
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new PodracerGame();
});
