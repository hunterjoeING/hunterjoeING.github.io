// Shared Zero-Dependency Web Audio SFX & Local Highscore Manager
(function () {
  const STORE_KEY = 'arcade_scores_v1';
  const LEGACY_STORE_KEY = ['v2g', 'arcade', 'scores', 'v1'].join('_');
  const MUTE_KEY = 'arcade_muted';
  const LEGACY_MUTE_KEY = ['v2g', 'arcade', 'muted'].join('_');
  let ctx = null;
  let muted = false;
  let noiseBuf = null;

  try {
    const legacyMute = localStorage.getItem(LEGACY_MUTE_KEY);
    if (legacyMute !== null && localStorage.getItem(MUTE_KEY) === null) {
      localStorage.setItem(MUTE_KEY, legacyMute);
    }
    if (legacyMute !== null) localStorage.removeItem(LEGACY_MUTE_KEY);
    const legacyScores = localStorage.getItem(LEGACY_STORE_KEY);
    if (legacyScores && !localStorage.getItem(STORE_KEY)) {
      localStorage.setItem(STORE_KEY, legacyScores);
    }
    if (legacyScores !== null) localStorage.removeItem(LEGACY_STORE_KEY);
    muted = localStorage.getItem(MUTE_KEY) === '1';
  } catch (e) {}

  function ensureCtx() {
    if (muted) return null;
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function unlock() {
    const c = ensureCtx();
    if (c && c.state === 'suspended') c.resume().catch(() => {});
  }
  window.addEventListener('pointerdown', unlock, { passive: true });
  window.addEventListener('keydown', unlock, { passive: true });

  function getNoiseBuffer(c) {
    if (noiseBuf && noiseBuf.sampleRate === c.sampleRate) return noiseBuf;
    const len = Math.floor(c.sampleRate * 0.4);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    noiseBuf = buf;
    return buf;
  }

  function tone(freq, dur = 0.09, type = 'sine', vol = 0.14, freqEnd = null) {
    const c = ensureCtx();
    if (!c) return;
    const t0 = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (freqEnd !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), t0 + dur);
    }
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.01);
  }

  function noiseBurst(dur = 0.12, filterFreq = 1800, vol = 0.12, filterType = 'bandpass') {
    const c = ensureCtx();
    if (!c) return;
    const t0 = c.currentTime;
    const src = c.createBufferSource();
    src.buffer = getNoiseBuffer(c);
    src.loop = true;
    const filter = c.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.setValueAtTime(filterFreq, t0);
    const gain = c.createGain();
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);
    src.start(t0);
    src.stop(t0 + dur + 0.01);
  }

  window.ArcadeAudio = {
    isMuted: () => muted,
    toggleMute: (btnEl) => {
      muted = !muted;
      try { localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch (e) {}
      if (btnEl) {
        btnEl.textContent = muted ? '🔇' : '🔊';
        btnEl.classList.toggle('muted', muted);
      }
      if (!muted) tone(620, 0.06, 'sine', 0.1);
      return muted;
    },
    syncButton: (btnEl) => {
      if (!btnEl) return;
      btnEl.textContent = muted ? '🔇' : '🔊';
      btnEl.classList.toggle('muted', muted);
    },
    click: () => tone(580, 0.045, 'triangle', 0.09),
    pop: () => tone(420, 0.07, 'sine', 0.12, 760),
    laser: () => tone(920, 0.06, 'sawtooth', 0.05, 320),
    perkGood: () => {
      tone(523.25, 0.08, 'triangle', 0.12);
      setTimeout(() => tone(783.99, 0.12, 'triangle', 0.13), 65);
    },
    perkBad: () => tone(210, 0.18, 'sawtooth', 0.12, 95),
    explosion: () => {
      noiseBurst(0.24, 340, 0.18, 'lowpass');
      tone(115, 0.22, 'sawtooth', 0.15, 36);
    },
    coldGas: () => noiseBurst(0.09, 3200, 0.08, 'highpass'),
    win: () => {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        setTimeout(() => tone(f, 0.18, 'triangle', 0.14), i * 95);
      });
    },
    fail: () => {
      tone(300, 0.16, 'sawtooth', 0.13, 180);
      setTimeout(() => tone(190, 0.25, 'sawtooth', 0.13, 85), 140);
    },
    cardFlip: () => noiseBurst(0.045, 2400, 0.07, 'bandpass')
  };

  const API_BASE = 'https://hunterjoe-scores.hunterjoeing.workers.dev';
  const GLOBAL_CACHE_KEY = 'arcade_global_summary_v1';
  const NAME_KEY = 'arcade_player_name';

  const GAME_CATALOG = [
    { id: 'minesweeper', title: '3D Minesweeper', icon: '💣', lowerIsBetter: true },
    { id: 'roadster', title: 'Roadster Lander', icon: '🚀', lowerIsBetter: false },
    { id: 'zombie', title: 'Zombie Swarm', icon: '🧟', lowerIsBetter: false },
    { id: 'tower', title: 'Orbital Tower Defense', icon: '🛸', lowerIsBetter: false },
    { id: 'solitaire', title: 'Klondike Solitaire', icon: '🃏', lowerIsBetter: false },
    { id: 'p2048', title: '2048 Prism', icon: '🔷', lowerIsBetter: false },
    { id: 'quiz_emob', title: 'E-Mobilität & Tesla Quiz', icon: '⚡', lowerIsBetter: false },
    { id: 'quiz_pol', title: 'Politik & Ökonomie Quiz', icon: '⚖️', lowerIsBetter: false },
    { id: 'quiz_hist', title: 'Geschichte & Weltereignisse', icon: '🏛️', lowerIsBetter: false },
    { id: 'quiz_china', title: 'Neuere Chinesische Geschichte', icon: '🏯', lowerIsBetter: false },
    { id: 'quiz', title: 'Quiz Arena: Klassik', icon: '❓', lowerIsBetter: false }
  ];

  const GAME_MAP = Object.fromEntries(GAME_CATALOG.map(g => [g.id, g]));

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function detectGameId() {
    try {
      const p = (window.location.pathname || '').toLowerCase();
      if (p.includes('/games/2048')) return 'p2048';
      if (p.includes('/games/roadster')) return 'roadster';
      if (p.includes('/games/zombie')) return 'zombie';
      if (p.includes('/games/tower')) return 'tower';
      if (p.includes('/games/solitaire')) return 'solitaire';
      if (p.includes('/games/quiz-emobility')) return 'quiz_emob';
      if (p.includes('/games/quiz-politics')) return 'quiz_pol';
      if (p.includes('/games/quiz-history')) return 'quiz_hist';
      if (p.includes('/games/quiz-china')) return 'quiz_china';
      if (p.includes('/games/quiz')) return 'quiz';
      if (p.includes('/games/minesweeper')) return 'minesweeper';
    } catch (e) {}
    return null;
  }

  function readLocalScores() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {};
    } catch (e) {
      return {};
    }
  }

  function readCachedSummary() {
    try {
      const raw = JSON.parse(localStorage.getItem(GLOBAL_CACHE_KEY) || 'null');
      return raw && raw.games ? raw : null;
    } catch (e) {
      return null;
    }
  }

  let _summary = readCachedSummary();
  let _summaryLoaded = false;
  let _summaryPromise = null;
  let _lastSubmission = null;
  let _toastTimer = null;

  function cleanName(val) {
    return String(val || '')
      .replace(/[\u0000-\u001F\u007F]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 24);
  }

  function formatDateDe(iso) {
    if (!iso) return '';
    const d = String(iso).slice(0, 10);
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d);
    return m ? `${m[3]}.${m[2]}.${m[1]}` : d;
  }

  function syncPlayerButtons() {
    const hasCustom = !!cleanName(safeGet(NAME_KEY));
    const display = hasCustom ? cleanName(safeGet(NAME_KEY)) : 'Name setzen';
    document.querySelectorAll('#btn-arcade-player').forEach(btn => {
      btn.innerHTML = `👤 <span class="arcade-nav-label">${escapeHtml(display)}</span>`;
      btn.title = hasCustom
        ? `Spielername: ${display} (klicken zum Ändern)`
        : 'Spielernamen für globale Highscores festlegen';
    });
  }

  function safeGet(key) {
    try { return localStorage.getItem(key) || ''; } catch (e) { return ''; }
  }

  function syncTopBestDom() {
    const gameId = detectGameId();
    if (!gameId) return;
    const elTopBest = document.getElementById('top-best');
    if (elTopBest) {
      const b = window.ArcadeScores.getBest(gameId);
      elTopBest.textContent = b ? b.best : 0;
      const pill = elTopBest.closest('.pill-stat');
      if (pill) {
        pill.title = b && b.playerName
          ? `Weltrekord von ${b.playerName}: ${b.label} (klicken für Rangliste)`
          : 'Globale Bestenliste anzeigen';
        pill.classList.add('clickable');
        if (!pill.dataset.boardBound) {
          pill.dataset.boardBound = '1';
          pill.addEventListener('click', () => window.ArcadeScores.openLeaderboardModal(gameId));
        }
      }
    }
  }

  function emitScoresUpdated() {
    syncTopBestDom();
    try {
      window.dispatchEvent(new CustomEvent('arcade:scores-updated', { detail: _summary }));
    } catch (e) {}
  }

  function updateSummaryEntry(gameId, bestRow, plays, entries) {
    if (!_summary) {
      _summary = { ok: true, totalRecords: 0, totalPlays: 0, games: {} };
    }
    if (!_summary.games) _summary.games = {};
    const cfg = GAME_MAP[gameId] || { title: gameId, lowerIsBetter: false };
    _summary.games[gameId] = {
      gameId,
      title: cfg.title,
      lowerIsBetter: !!cfg.lowerIsBetter,
      plays: Number(plays || 0),
      entries: Number(entries || 0),
      best: bestRow || null
    };
    let rec = 0;
    let totPlays = 0;
    Object.values(_summary.games).forEach(g => {
      if (g && g.best) rec++;
      totPlays += Number(g?.plays || 0);
    });
    _summary.totalRecords = rec;
    _summary.totalPlays = totPlays;
    try { localStorage.setItem(GLOBAL_CACHE_KEY, JSON.stringify(_summary)); } catch (e) {}
  }

  function showToast(html) {
    if (!document.body) return;
    let el = document.getElementById('arcade-global-toast');
    if (el) el.remove();
    el = document.createElement('div');
    el.id = 'arcade-global-toast';
    el.className = 'arcade-toast';
    el.innerHTML = html;
    document.body.appendChild(el);
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => {
      if (el && el.parentNode) el.remove();
    }, 6500);
  }

  function removeModal() {
    const m = document.getElementById('arcade-modal-root');
    if (m) m.remove();
  }

  async function renderBoardContent(bodyEl, subEl, gameId, limit) {
    bodyEl.innerHTML = '<div style="text-align:center;padding:28px;color:#94a3b8;">Lade globale Bestenliste…</div>';
    if (subEl) subEl.innerHTML = '';
    try {
      const data = await window.ArcadeScores.fetchLeaderboard(gameId, limit);
      const myName = window.ArcadeScores.getPlayerName().toLowerCase();
      if (subEl) {
        subEl.innerHTML = `
          <span>🕹️ <strong>${Number(data.plays || 0)}</strong> gespielte Runden · <strong>${Number(data.entries || 0)}</strong> Einträge</span>
          <button type="button" class="arcade-toast-btn" id="arcade-board-edit-name">👤 Name: ${escapeHtml(window.ArcadeScores.getPlayerName())}</button>
        `;
        const editBtn = document.getElementById('arcade-board-edit-name');
        if (editBtn) {
          editBtn.addEventListener('click', () => {
            window.ArcadeScores.openPlayerNameModal(() => renderBoardContent(bodyEl, subEl, gameId, limit));
          });
        }
      }
      if (!data.top || data.top.length === 0) {
        bodyEl.innerHTML = '<div style="text-align:center;padding:30px;color:#94a3b8;">Noch keine globalen Einträge für dieses Spiel — sichere dir Platz #1!</div>';
        return;
      }
      const rowsHtml = data.top.map((row, idx) => {
        const medal = idx === 0 ? '🥇' : (idx === 1 ? '🥈' : (idx === 2 ? '🥉' : `#${idx + 1}`));
        const isMe = row.playerName && row.playerName.toLowerCase() === myName;
        return `
          <tr class="${isMe ? 'is-me' : ''}">
            <td class="arcade-board-rank">${medal}</td>
            <td class="arcade-board-name">${escapeHtml(row.playerName)}</td>
            <td class="arcade-board-val">${escapeHtml(row.label)}</td>
            <td class="arcade-board-date">${escapeHtml(formatDateDe(row.createdAt))}</td>
          </tr>
        `;
      }).join('');
      bodyEl.innerHTML = `
        <table class="arcade-board-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Spieler</th>
              <th style="text-align:right;">Score</th>
              <th style="text-align:right;">Datum</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      `;
    } catch (e) {
      bodyEl.innerHTML = '<div style="text-align:center;padding:28px;color:#fca5a5;">Bestenliste gerade nicht erreichbar. Bitte später erneut versuchen.</div>';
    }
  }

  window.ArcadeScores = {
    API_BASE,
    CATALOG: GAME_CATALOG,
    detectGameId,
    newRunId: (gameId) => {
      const prefix = String(gameId || 'run').replace(/[^a-zA-Z0-9_-]/g, '');
      return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    },
    getPlayerName: () => cleanName(safeGet(NAME_KEY)) || 'Spieler',
    hasCustomPlayerName: () => !!cleanName(safeGet(NAME_KEY)),
    setPlayerName: (name) => {
      const cleaned = cleanName(name);
      try {
        if (cleaned) localStorage.setItem(NAME_KEY, cleaned);
        else localStorage.removeItem(NAME_KEY);
      } catch (e) {}
      syncPlayerButtons();
      try { window.dispatchEvent(new CustomEvent('arcade:player-changed', { detail: cleaned || 'Spieler' })); } catch (e) {}

      // Retrospective update if user just finished a round right before setting name
      if (cleaned && _lastSubmission && (Date.now() - _lastSubmission.ts) < 120000) {
        const sub = _lastSubmission;
        fetch(`${API_BASE}/api/scores`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          body: JSON.stringify({
            gameId: sub.gameId,
            playerName: cleaned,
            score: sub.score,
            label: sub.label,
            runId: sub.runId,
            meta: sub.meta
          })
        })
          .then(r => r.ok ? r.json() : null)
          .then(res => {
            if (res && res.ok) {
              updateSummaryEntry(sub.gameId, res.best, res.plays, res.entries);
              emitScoresUpdated();
            }
          })
          .catch(() => {});
      }
      return cleaned || 'Spieler';
    },
    openPlayerNameModal: (onSave) => {
      removeModal();
      const current = cleanName(safeGet(NAME_KEY));
      const root = document.createElement('div');
      root.id = 'arcade-modal-root';
      root.className = 'arcade-modal-backdrop';
      root.innerHTML = `
        <div class="arcade-modal-card" style="width:min(420px,100%);">
          <div class="arcade-modal-head">
            <h3 class="arcade-modal-title">👤 Spielername festlegen</h3>
            <button type="button" class="icon-btn" id="arcade-modal-close">✕</button>
          </div>
          <div class="arcade-modal-body" style="padding-top:16px;">
            <p style="margin:0 0 12px;font-size:13px;color:#94a3b8;line-height:1.45;">
              Dieser Name erscheint weltweit in allen Bestenlisten (Spiele, 3D Minesweeper &amp; Quizze).
            </p>
            <input id="arcade-name-field" class="arcade-name-input" type="text" maxlength="24" placeholder="z. B. Johannes" value="${escapeHtml(current)}">
            <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px;">
              <button type="button" class="secondary-btn" id="arcade-name-cancel">Abbrechen</button>
              <button type="button" class="primary-btn" id="arcade-name-save">Speichern</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(root);
      const inp = document.getElementById('arcade-name-field');
      const close = () => removeModal();
      const save = () => {
        const next = window.ArcadeScores.setPlayerName(inp.value);
        close();
        if (typeof onSave === 'function') onSave(next);
      };
      document.getElementById('arcade-modal-close').addEventListener('click', close);
      document.getElementById('arcade-name-cancel').addEventListener('click', close);
      document.getElementById('arcade-name-save').addEventListener('click', save);
      root.addEventListener('click', e => { if (e.target === root) close(); });
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') save();
        if (e.key === 'Escape') close();
      });
      setTimeout(() => { inp.focus(); inp.select(); }, 25);
    },
    openLeaderboardModal: (gameId) => {
      removeModal();
      let activeId = GAME_MAP[gameId] ? gameId : (detectGameId() || 'minesweeper');
      const showTabs = !detectGameId() || !GAME_MAP[gameId];
      const root = document.createElement('div');
      root.id = 'arcade-modal-root';
      root.className = 'arcade-modal-backdrop';
      const tabsHtml = showTabs
        ? `<div class="arcade-modal-tabs" id="arcade-modal-tabs">
            ${GAME_CATALOG.map(g => `<button type="button" class="arcade-tab-btn ${g.id === activeId ? 'active' : ''}" data-gid="${g.id}">${g.icon} ${escapeHtml(g.title)}</button>`).join('')}
           </div>`
        : '';
      root.innerHTML = `
        <div class="arcade-modal-card">
          <div class="arcade-modal-head">
            <h3 class="arcade-modal-title" id="arcade-board-title">🏆 Globale Bestenliste${showTabs ? '' : ' · ' + escapeHtml(GAME_MAP[activeId]?.title || activeId)}</h3>
            <div style="display:flex;gap:6px;align-items:center;">
              <button type="button" class="icon-btn" id="arcade-board-refresh" title="Aktualisieren">↻</button>
              <button type="button" class="icon-btn" id="arcade-modal-close" title="Schließen">✕</button>
            </div>
          </div>
          ${tabsHtml}
          <div class="arcade-modal-sub" id="arcade-board-sub"></div>
          <div class="arcade-modal-body" id="arcade-board-body"></div>
        </div>
      `;
      document.body.appendChild(root);
      const bodyEl = document.getElementById('arcade-board-body');
      const subEl = document.getElementById('arcade-board-sub');
      const close = () => removeModal();
      document.getElementById('arcade-modal-close').addEventListener('click', close);
      document.getElementById('arcade-board-refresh').addEventListener('click', () => renderBoardContent(bodyEl, subEl, activeId, 25));
      root.addEventListener('click', e => { if (e.target === root) close(); });
      if (showTabs) {
        const tabsEl = document.getElementById('arcade-modal-tabs');
        tabsEl.addEventListener('click', e => {
          const btn = e.target.closest('.arcade-tab-btn');
          if (!btn) return;
          activeId = btn.dataset.gid;
          tabsEl.querySelectorAll('.arcade-tab-btn').forEach(b => b.classList.toggle('active', b === btn));
          renderBoardContent(bodyEl, subEl, activeId, 25);
        });
      }
      renderBoardContent(bodyEl, subEl, activeId, 25);
    },
    getSummaryCache: () => _summary,
    isSummaryLoaded: () => _summaryLoaded,
    fetchSummary: async (force = false) => {
      if (_summaryPromise && !force) return _summaryPromise;
      _summaryPromise = fetch(`${API_BASE}/api/summary`, { cache: 'no-store' })
        .then(r => {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(data => {
          if (data && data.ok && data.games) {
            _summary = data;
            _summaryLoaded = true;
            try { localStorage.setItem(GLOBAL_CACHE_KEY, JSON.stringify(data)); } catch (e) {}
            emitScoresUpdated();
          }
          return _summary;
        })
        .catch(() => _summary)
        .finally(() => { _summaryPromise = null; });
      return _summaryPromise;
    },
    fetchLeaderboard: async (gameId, limit = 25) => {
      const res = await fetch(`${API_BASE}/api/scores?game=${encodeURIComponent(gameId)}&limit=${encodeURIComponent(limit)}`, {
        cache: 'no-store'
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      if (data && data.ok) {
        updateSummaryEntry(gameId, data.best, data.plays, data.entries);
        emitScoresUpdated();
      }
      return data;
    },
    getAll: () => {
      if (_summary && _summary.games) {
        const out = {};
        Object.entries(_summary.games).forEach(([id, g]) => {
          if (g && g.best) {
            out[id] = {
              best: g.best.score,
              label: g.best.label,
              playerName: g.best.playerName,
              plays: g.plays || 0,
              updated: g.best.createdAt ? String(g.best.createdAt).slice(0, 10) : '',
              isGlobal: true
            };
          }
        });
        return out;
      }
      return readLocalScores();
    },
    getBest: (gameId) => {
      if (_summary && _summary.games && _summary.games[gameId]) {
        const g = _summary.games[gameId];
        if (!g.best) return null;
        return {
          best: g.best.score,
          label: g.best.label,
          playerName: g.best.playerName,
          plays: g.plays || 0,
          updated: g.best.createdAt ? String(g.best.createdAt).slice(0, 10) : '',
          isGlobal: true
        };
      }
      const local = readLocalScores();
      return local[gameId] || null;
    },
    record: (gameId, score, label, lowerIsBetter = false, opts = {}) => {
      let isPersonalBetter = false;
      try {
        const all = readLocalScores();
        const prev = all[gameId];
        const prevPlays = prev ? (prev.plays || 0) : 0;
        isPersonalBetter = !prev || prev.best === undefined
          ? true
          : (lowerIsBetter ? score < prev.best : score > prev.best);
        all[gameId] = {
          best: isPersonalBetter ? score : prev.best,
          label: isPersonalBetter ? label : prev.label,
          plays: opts.sync === false ? prevPlays : prevPlays + 1,
          updated: new Date().toISOString().slice(0, 10)
        };
        localStorage.setItem(STORE_KEY, JSON.stringify(all));
      } catch (e) {}

      if (opts.sync === false) {
        return isPersonalBetter;
      }

      const numScore = Number(score);
      if (!Number.isFinite(numScore) || numScore < 0 || (numScore === 0 && gameId !== 'minesweeper')) {
        return isPersonalBetter;
      }

      const playerName = window.ArcadeScores.getPlayerName();
      const runId = opts.runId || window.ArcadeScores.newRunId(gameId);
      const payload = {
        gameId,
        playerName,
        score: Math.round(numScore),
        label: String(label || numScore),
        runId,
        meta: opts.meta || undefined
      };
      _lastSubmission = { ...payload, ts: Date.now() };

      // Optimistic local-summary update if beating known global best
      const curBest = window.ArcadeScores.getBest(gameId);
      const beatsKnown = !curBest
        ? true
        : (lowerIsBetter ? payload.score < curBest.best : payload.score > curBest.best);
      if (beatsKnown) {
        updateSummaryEntry(
          gameId,
          { playerName, score: payload.score, label: payload.label, createdAt: new Date().toISOString() },
          (curBest?.plays || 0) + 1,
          (_summary?.games?.[gameId]?.entries || 0) + 1
        );
        emitScoresUpdated();
      }

      fetch(`${API_BASE}/api/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify(payload)
      })
        .then(r => r.ok ? r.json() : null)
        .then(res => {
          if (!res || !res.ok) return;
          updateSummaryEntry(gameId, res.best, res.plays, res.entries);
          emitScoresUpdated();

          if (!opts.silent) {
            const rankText = res.isGlobalRecord
              ? '🏆 GLOBALER WELTREKORD #1!'
              : `🌍 Platz #${res.rank} weltweit`;
            const nameCta = !window.ArcadeScores.hasCustomPlayerName()
              ? `<button type="button" class="arcade-toast-btn" id="toast-set-name">Name wählen</button>`
              : '';
            showToast(`
              <span>${rankText} als <strong>${escapeHtml(playerName)}</strong></span>
              ${nameCta}
              <button type="button" class="arcade-toast-btn" id="toast-open-board">Bestenliste</button>
            `);
            const btnName = document.getElementById('toast-set-name');
            if (btnName) {
              btnName.addEventListener('click', () => window.ArcadeScores.openPlayerNameModal());
            }
            const btnBoard = document.getElementById('toast-open-board');
            if (btnBoard) {
              btnBoard.addEventListener('click', () => window.ArcadeScores.openLeaderboardModal(gameId));
            }
          }
        })
        .catch(() => {});

      return isPersonalBetter;
    },
    getMinesweeperBest: () => {
      if (_summary && _summary.games && _summary.games.minesweeper) {
        const b = _summary.games.minesweeper.best;
        if (!b) return null;
        return {
          time: b.score,
          player: b.playerName,
          label: b.label,
          geo: b.meta?.geo || '',
          level: b.meta?.level || '',
          isGlobal: true
        };
      }
      try {
        const raw = JSON.parse(localStorage.getItem('ms3d_highscores_v1') || '[]');
        if (!Array.isArray(raw) || raw.length === 0) return null;
        return raw[0];
      } catch (e) {
        return null;
      }
    }
  };

  function initSharedChrome() {
    const topbarRight = document.querySelector('.arcade-topbar .topbar-right');
    const gameId = detectGameId();
    if (topbarRight && !document.getElementById('btn-arcade-board')) {
      const playerBtn = document.createElement('button');
      playerBtn.type = 'button';
      playerBtn.className = 'icon-btn arcade-nav-pill';
      playerBtn.id = 'btn-arcade-player';
      playerBtn.addEventListener('click', () => window.ArcadeScores.openPlayerNameModal());

      const boardBtn = document.createElement('button');
      boardBtn.type = 'button';
      boardBtn.className = 'icon-btn';
      boardBtn.id = 'btn-arcade-board';
      boardBtn.title = 'Globale Bestenliste';
      boardBtn.textContent = '🏆';
      boardBtn.addEventListener('click', () => window.ArcadeScores.openLeaderboardModal(gameId));

      const muteBtn = document.getElementById('btn-mute');
      if (muteBtn && muteBtn.parentNode === topbarRight) {
        topbarRight.insertBefore(playerBtn, muteBtn);
        topbarRight.insertBefore(boardBtn, muteBtn);
      } else {
        topbarRight.appendChild(playerBtn);
        topbarRight.appendChild(boardBtn);
      }
    }
    syncPlayerButtons();
    syncTopBestDom();
    window.ArcadeScores.fetchSummary();
  }

  window.ArcadeQuizPrefs = {
    isRelaxed: () => safeGet('arcade_quiz_relaxed') === '1',
    setRelaxed: (relaxed) => {
      try {
        localStorage.setItem('arcade_quiz_relaxed', relaxed ? '1' : '0');
      } catch (e) {}
      return !!relaxed;
    },
    getDurationSec: (diff) => {
      if (diff === 'pro' || diff === 'nerd') return 35;
      if (diff === 'mid') return 30;
      return 25;
    },
    initMenuBar: (barId) => {
      const bar = document.getElementById(barId || 'time-mode-bar');
      if (!bar) return;
      const sync = () => {
        const relaxed = window.ArcadeQuizPrefs.isRelaxed();
        bar.querySelectorAll('.time-mode-pill').forEach(btn => {
          btn.classList.toggle('active', (btn.dataset.relaxed === '1') === relaxed);
        });
      };
      bar.addEventListener('click', (e) => {
        const btn = e.target.closest('.time-mode-pill');
        if (!btn) return;
        window.ArcadeQuizPrefs.setRelaxed(btn.dataset.relaxed === '1');
        if (window.ArcadeAudio) window.ArcadeAudio.click();
        sync();
      });
      sync();
    },
    updateTimerUI: ({ btnEl, fillEl, jokerTimeEl, jokerTimeAvailable, timeLeft, maxTime, answered }) => {
      const relaxed = window.ArcadeQuizPrefs.isRelaxed();
      if (btnEl) {
        if (relaxed) {
          btnEl.textContent = '☕ Ohne Zeitlimit';
          btnEl.classList.add('relaxed');
        } else if (timeLeft <= 0) {
          btnEl.innerHTML = '☕ <span>In Ruhe (Bonus 0)</span>';
          btnEl.classList.add('relaxed');
        } else {
          btnEl.innerHTML = `⏱ <strong id="q-sec">${Math.ceil(timeLeft)}</strong>s`;
          btnEl.classList.remove('relaxed');
        }
      }
      if (fillEl) {
        if (relaxed) {
          fillEl.style.width = '100%';
          fillEl.style.background = 'linear-gradient(90deg, rgba(45, 212, 191, 0.52), rgba(56, 189, 248, 0.42))';
        } else if (timeLeft <= 0) {
          fillEl.style.width = '0%';
        } else {
          const pct = Math.max(0, Math.min(100, (timeLeft / (maxTime || 25)) * 100));
          fillEl.style.width = pct + '%';
          fillEl.style.background = timeLeft <= 6
            ? 'linear-gradient(90deg, #fb7185, #f59e0b)'
            : 'linear-gradient(90deg, #38bdf8, #4ade80)';
        }
      }
      if (jokerTimeEl) {
        jokerTimeEl.disabled = !!answered || relaxed || !jokerTimeAvailable;
        jokerTimeEl.title = relaxed
          ? 'Im Modus „Ohne Zeitlimit“ hast du bereits unbegrenzt Zeit'
          : '+10 Sekunden Zeitbonus-Nachschub';
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSharedChrome);
  } else {
    initSharedChrome();
  }
})();
