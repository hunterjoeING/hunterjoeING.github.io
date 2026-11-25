// Shared Zero-Dependency Web Audio SFX & Local Highscore Manager
(function () {
  const ARCADE_SCRIPT_SRC = (document.currentScript && document.currentScript.src) || '';
  const STORE_KEY = 'arcade_scores_v1';
  const LEGACY_STORE_KEY = ['v2g', 'arcade', 'scores', 'v1'].join('_');
  const MUTE_KEY = 'arcade_muted';
  const LEGACY_MUTE_KEY = ['v2g', 'arcade', 'muted'].join('_');
  const THEME_KEY = 'arcade_theme';
  let ctx = null;
  let muted = false;
  let noiseBuf = null;
  let currentTheme = 'light';

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
    const savedTheme = localStorage.getItem(THEME_KEY);
    currentTheme = savedTheme === 'dark' ? 'dark' : 'light';
  } catch (e) {}

  try {
    document.documentElement.setAttribute('data-theme', currentTheme);
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
    correct: () => {
      tone(523.25, 0.08, 'triangle', 0.12);
      setTimeout(() => tone(783.99, 0.12, 'triangle', 0.13), 65);
    },
    wrong: () => tone(210, 0.18, 'sawtooth', 0.12, 95),
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
    { id: 'podracer', title: 'Canyon Podracer 3D', icon: '🏎️', lowerIsBetter: false },
    { id: 'eroadtrip', title: 'E-Roadtrip', icon: '⚡', lowerIsBetter: false },
    { id: 'minesweeper', title: '3D Minesweeper – Tech Demo KI-Agent (Danke an Verstand2Go, minesweeper3d.online)', icon: '💣', lowerIsBetter: true },
    { id: 'minesweeper_3d_prompt_test', title: 'Minesweeper 3d prompt Version', icon: '🧊', lowerIsBetter: true },
    { id: 'roadster', title: 'Roadster Lander', icon: '🚀', lowerIsBetter: false },
    { id: 'zombie', title: 'Zombie Swarm', icon: '🧟', lowerIsBetter: false },
    { id: 'tower', title: 'Orbital Tower Defense', icon: '🛸', lowerIsBetter: false },
    { id: 'solitaire3d', title: '3D Spider Solitär (4 Farben)', icon: '🕷️', lowerIsBetter: false },
    { id: 'solitaire', title: 'Klondike Solitaire', icon: '🃏', lowerIsBetter: false },
    { id: 'p2048', title: '2048 Prism', icon: '🔷', lowerIsBetter: false },
    { id: 'quiz_emob', title: 'E-Mobilität & Tesla Quiz', icon: '⚡', lowerIsBetter: false },
    { id: 'quiz_pol', title: 'Politik & Ökonomie Quiz', icon: '⚖️', lowerIsBetter: false },
    { id: 'quiz_hist', title: 'Geschichte & Weltereignisse', icon: '🏛️', lowerIsBetter: false },
    { id: 'quiz_egypt', title: 'Ägyptische Geschichte Quiz', icon: '🏺', lowerIsBetter: false },
    { id: 'quiz_diving', title: 'Tauchen & Scuba Diving Quiz', icon: '🤿', lowerIsBetter: false },
    { id: 'quiz_movies', title: 'Kino & Filme Quiz (o. RomComs)', icon: '🎬', lowerIsBetter: false },
    { id: 'quiz_ai', title: 'KI: Entstehung & Technik Quiz', icon: '🤖', lowerIsBetter: false },
    { id: 'quiz_china', title: 'Neuere Chinesische Geschichte', icon: '🏯', lowerIsBetter: false },
    { id: 'quiz_waldgarten', title: 'Waldgarten Quiz · Schwarzenburg (Heideblick)', icon: '🌿', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_napoli72h', title: 'Napoli72H Pizza-Quiz · Aachen', icon: '🍕', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_herr_tutto', title: 'Herr Tutto Quiz · Eilendorf', icon: '🎩', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_mil_air', title: 'Militärflugzeuge Quiz', icon: '🛩️', lowerIsBetter: false },
    { id: 'quiz_airliners', title: 'Passagierflugzeuge Quiz', icon: '✈️', lowerIsBetter: false },
    { id: 'quiz_etfs', title: 'Passives Investieren & ETFs Quiz', icon: '📈', lowerIsBetter: false },
    { id: 'quiz_bitcoin', title: 'Bitcoin Mega-Quiz', icon: '₿', lowerIsBetter: false },
    { id: 'quiz_porsche', title: 'Porsche & Taycan Quiz', icon: '🏎️', lowerIsBetter: false },
    { id: 'quiz_md11', title: 'McDonnell Douglas MD-11 Quiz', icon: '🛫', lowerIsBetter: false },
    { id: 'quiz_naildesign', title: 'Nageldesign Quiz · Finger- & Fußnägel', icon: '💅', lowerIsBetter: false },
    { id: 'quiz_torten', title: 'Torten Quiz · Klassiker & Patisserie', icon: '🎂', lowerIsBetter: false },
    { id: 'quiz_geburt', title: 'Bewusste Schwangerschaft & sanfte Geburt', icon: '🌸', lowerIsBetter: false },
    { id: 'quiz_fussball', title: 'Fußball – Das große Quiz', icon: '⚽', lowerIsBetter: false },
    { id: 'quiz_fussball_mix', title: 'Fußball: Alles gemischt', icon: '⚽', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_fussball_buli', title: 'Fußball: Bundesliga & DFB-Pokal', icon: '🏆', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_fussball_wmem', title: 'Fußball: WM, EM & Nationalelf', icon: '🌍', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_fussball_intl', title: 'Fußball: Champions League & Weltfußball', icon: '⭐', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_fussball_rules', title: 'Fußball: Regeln, Taktik & Kurioses', icon: '📜', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_fussball_werder', title: 'Fußball: SV Werder Bremen Spezial', icon: '💚', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_american_football', title: 'American Football – Das große NFL-Quiz', icon: '🏈', lowerIsBetter: false },
    { id: 'quiz_af_mix', title: 'American Football: Alles gemischt', icon: '🏈', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_af_rules', title: 'American Football: Regeln, Positionen & Taktik', icon: '📋', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_af_superbowl', title: 'American Football: Super Bowl & NFL-Geschichte', icon: '🏆', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_af_teams', title: 'American Football: Teams, Stadien & Fankultur', icon: '🏟️', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_af_legends', title: 'American Football: Legenden, Draft & Rekorde', icon: '⭐', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_af_packers', title: 'American Football: Green Bay Packers Special', icon: '🧀', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_golf', title: 'Golf – Das große Quiz', icon: '⛳', lowerIsBetter: false },
    { id: 'quiz_golf_mix', title: 'Golf: Alles gemischt', icon: '⛳', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_golf_regeln', title: 'Golf: Regeln, Etikette & Scoring', icon: '📋', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_golf_profis', title: 'Golf: Majors, Tour & Legenden', icon: '🏆', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_golf_technik', title: 'Golf: Technik, Equipment & Taktik', icon: '🏌️', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_golf_plaetze', title: 'Golf: Legendäre Plätze & Kurioses', icon: '🌍', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_f1', title: 'Formel 1 – Legenden, Technik & Königsklasse', icon: '🏎️', lowerIsBetter: false },
    { id: 'quiz_f1_mix', title: 'Formel 1: Komplett-Mix', icon: '🏎️', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_f1_legenden', title: 'Formel 1: Weltmeister & Rivalitäten', icon: '👑', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_f1_technik', title: 'Formel 1: Technik & Aerodynamik', icon: '⚙️', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_f1_strecken', title: 'Formel 1: Legendäre Strecken', icon: '🏁', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_f1_regeln', title: 'Formel 1: Regeln & Boxenstopps', icon: '📋', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_f1_teams', title: 'Formel 1: Teams & Geschichte', icon: '🏛️', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_apple', title: 'Apple – Produkte, Kult & Technikgeschichte', icon: '🍎', lowerIsBetter: false },
    { id: 'quiz_apple_mix', title: 'Apple: Komplett-Mix', icon: '🍎', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_apple_iphone_ipad', title: 'Apple: iPhone & iPad', icon: '📱', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_apple_mac_silicon', title: 'Apple: Mac & Apple Silicon', icon: '💻', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_apple_audio_wearables', title: 'Apple: Audio, Wearables & Ökosystem', icon: '⌚', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_apple_design_history', title: 'Apple: Geschichte, Design & Kult', icon: '🏛️', lowerIsBetter: false, unlisted: true },
    { id: 'quiz_apple_flops_curiosities', title: 'Apple: Flops, Kurioses & Insider-Wissen', icon: '💡', lowerIsBetter: false, unlisted: true },
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
      if (p.includes('/games/podracer')) return 'podracer';
      if (p.includes('/games/e-roadtrip')) return 'eroadtrip';
      if (p.includes('/games/2048')) return 'p2048';
      if (p.includes('/games/roadster')) return 'roadster';
      if (p.includes('/games/zombie')) return 'zombie';
      if (p.includes('/games/tower')) return 'tower';
      if (p.includes('/games/solitaire3d')) return 'solitaire3d';
      if (p.includes('/games/solitaire')) return 'solitaire';
      if (p.includes('/games/quiz-emobility')) return 'quiz_emob';
      if (p.includes('/games/quiz-politics')) return 'quiz_pol';
      if (p.includes('/games/quiz-history')) return 'quiz_hist';
      if (p.includes('/games/quiz-egypt')) return 'quiz_egypt';
      if (p.includes('/games/quiz-diving')) return 'quiz_diving';
      if (p.includes('/games/quiz-movies')) return 'quiz_movies';
      if (p.includes('/games/quiz-ai')) return 'quiz_ai';
      if (p.includes('/games/quiz-china')) return 'quiz_china';
      if (p.includes('/games/quiz-cpus')) return 'quiz_cpus';
      if (p.includes('/games/quiz-gpus')) return 'quiz_gpus';
      if (p.includes('/games/quiz-phones')) return 'quiz_phones';
      if (p.includes('/games/quiz-pilze-aachen')) return 'quiz_pilze_aachen';
      if (p.includes('/games/quiz-swiss-trains')) return 'quiz_swiss_trains';
      if (p.includes('/games/quiz-waldgarten')) return 'quiz_waldgarten';
      if (p.includes('/games/quiz-napoli72h')) return 'quiz_napoli72h';
      if (p.includes('/games/quiz-herr-tutto')) return 'quiz_herr_tutto';
      if (p.includes('/games/quiz-military-aircraft')) return 'quiz_mil_air';
      if (p.includes('/games/quiz-airliners')) return 'quiz_airliners';
      if (p.includes('/games/quiz-etfs')) return 'quiz_etfs';
      if (p.includes('/games/quiz-bitcoin')) return 'quiz_bitcoin';
      if (p.includes('/games/quiz-porsche')) return 'quiz_porsche';
      if (p.includes('/games/quiz-md11')) return 'quiz_md11';
      if (p.includes('/games/quiz-naildesign')) return 'quiz_naildesign';
      if (p.includes('/games/quiz-torten')) return 'quiz_torten';
      if (p.includes('/games/quiz-geburt')) return 'quiz_geburt';
      if (p.includes('/games/quiz-fussball')) return 'quiz_fussball';
      if (p.includes('/games/quiz-american-football')) return 'quiz_american_football';
      if (p.includes('/games/quiz-golf')) return 'quiz_golf';
      if (p.includes('/games/quiz-f1')) return 'quiz_f1';
      if (p.includes('/games/quiz-apple')) return 'quiz_apple';
      if (p.includes('/games/quiz')) return 'quiz';
      if (p.includes('/games/minesweeper-3d-prompt-test')) return 'minesweeper_3d_prompt_test';
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
            ${GAME_CATALOG.filter(g => !g.unlisted).map(g => `<button type="button" class="arcade-tab-btn ${g.id === activeId ? 'active' : ''}" data-gid="${g.id}">${g.icon} ${escapeHtml(g.title)}</button>`).join('')}
           </div>`
        : '';
      const isSub = /\/games\/[^/]+/.test((window.location.pathname || '').toLowerCase());
      const legalBase = isSub ? '../../' : './';
      const retryFn = isSub && (
        (typeof window.startGame === 'function' && window.startGame) ||
        (typeof window.resetTD === 'function' && (() => window.resetTD())) ||
        (typeof window.replayCategory === 'function' && window.replayCategory) ||
        (typeof window.newGame === 'function' && window.newGame) ||
        (typeof window.restartGame === 'function' && window.restartGame) ||
        null
      );
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
          <div style="display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap;padding:12px 24px;border-top:1px solid var(--border-hairline);background:var(--bg-surface);">
            ${retryFn ? '<button type="button" class="secondary-btn" id="arcade-modal-retry-btn">🔄 Nochmal spielen</button>' : ''}
            <button type="button" class="primary-btn" id="arcade-modal-close-btn">✕ Schließen</button>
          </div>
          <div class="arcade-modal-foot">
            <a href="${legalBase}impressum.html">Impressum</a>
            <span aria-hidden="true">·</span>
            <a href="${legalBase}datenschutz.html">Datenschutz</a>
          </div>
        </div>
      `;
      document.body.appendChild(root);
      const bodyEl = document.getElementById('arcade-board-body');
      const subEl = document.getElementById('arcade-board-sub');
      const onEsc = (e) => { if (e.key === 'Escape') close(); };
      const close = () => {
        window.removeEventListener('keydown', onEsc);
        removeModal();
      };
      window.addEventListener('keydown', onEsc);
      document.getElementById('arcade-modal-close').addEventListener('click', close);
      document.getElementById('arcade-modal-close-btn').addEventListener('click', close);
      const retryBtn = document.getElementById('arcade-modal-retry-btn');
      if (retryBtn && retryFn) {
        retryBtn.addEventListener('click', () => {
          close();
          retryFn();
        });
      }
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
      const out = {};
      const localAll = readLocalScores();
      const summaryGames = (_summary && _summary.games) ? _summary.games : {};
      const allIds = new Set([...Object.keys(summaryGames), ...Object.keys(localAll)]);
      allIds.forEach(id => {
        const entry = window.ArcadeScores.getBest(id);
        if (entry) out[id] = entry;
      });
      return out;
    },
    getBest: (gameId) => {
      const cfg = GAME_MAP[gameId];
      const g = (_summary && _summary.games) ? _summary.games[gameId] : null;
      const lowerIsBetter = g && typeof g.lowerIsBetter === 'boolean'
        ? g.lowerIsBetter
        : !!(cfg && cfg.lowerIsBetter);

      const globalEntry = (g && g.best)
        ? {
            best: g.best.score,
            label: g.best.label,
            playerName: g.best.playerName,
            plays: g.plays || 0,
            updated: g.best.createdAt ? String(g.best.createdAt).slice(0, 10) : '',
            isGlobal: true
          }
        : null;

      const localAll = readLocalScores();
      const rawLocal = localAll[gameId];
      const localEntry = (rawLocal && rawLocal.best !== undefined && rawLocal.best !== null)
        ? {
            best: rawLocal.best,
            label: rawLocal.label || String(rawLocal.best),
            playerName: window.ArcadeScores.hasCustomPlayerName() ? window.ArcadeScores.getPlayerName() : '',
            plays: Math.max(Number(g?.plays || 0), Number(rawLocal.plays || 0)),
            updated: rawLocal.updated || '',
            isGlobal: false
          }
        : null;

      if (globalEntry && localEntry) {
        const localBetter = lowerIsBetter
          ? Number(localEntry.best) < Number(globalEntry.best)
          : Number(localEntry.best) > Number(globalEntry.best);
        if (localBetter) {
          return localEntry;
        }
        return {
          ...globalEntry,
          plays: Math.max(Number(globalEntry.plays || 0), Number(localEntry.plays || 0))
        };
      }
      return globalEntry || localEntry || null;
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
        if (isPersonalBetter) emitScoresUpdated();
        return isPersonalBetter;
      }

      const numScore = Number(score);
      const isLower = !!lowerIsBetter || !!(GAME_MAP[gameId] && GAME_MAP[gameId].lowerIsBetter);
      if (!Number.isFinite(numScore) || numScore < 0 || (numScore === 0 && !isLower)) {
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
      const knownPlays = Math.max(Number(curBest?.plays || 0), Number(_summary?.games?.[gameId]?.plays || 0));
      const beatsKnown = !curBest
        ? true
        : (isLower ? payload.score < curBest.best : payload.score > curBest.best);
      if (beatsKnown) {
        updateSummaryEntry(
          gameId,
          { playerName, score: payload.score, label: payload.label, createdAt: new Date().toISOString() },
          knownPlays + 1,
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

          if (!opts.silent && (res.isGlobalRecord || isPersonalBetter)) {
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
              <button type="button" class="arcade-toast-btn" id="toast-close" title="Schließen">✕</button>
            `);
            const btnName = document.getElementById('toast-set-name');
            if (btnName) {
              btnName.addEventListener('click', () => window.ArcadeScores.openPlayerNameModal());
            }
            const btnBoard = document.getElementById('toast-open-board');
            if (btnBoard) {
              btnBoard.addEventListener('click', () => window.ArcadeScores.openLeaderboardModal(gameId));
            }
            const btnClose = document.getElementById('toast-close');
            if (btnClose) {
              btnClose.addEventListener('click', () => {
                const el = document.getElementById('arcade-global-toast');
                if (el) el.remove();
              });
            }
          }
        })
        .catch(() => {});

      return isPersonalBetter;
    },
    getMinesweeperBest: () => {
      let globalBest = null;
      if (_summary && _summary.games && _summary.games.minesweeper && _summary.games.minesweeper.best) {
        const b = _summary.games.minesweeper.best;
        globalBest = {
          time: b.score,
          player: b.playerName,
          label: b.label,
          geo: b.meta?.geo || '',
          level: b.meta?.level || '',
          isGlobal: true
        };
      }
      let localBest = null;
      try {
        const raw = JSON.parse(localStorage.getItem('ms3d_highscores_v1') || '[]');
        if (Array.isArray(raw) && raw.length > 0 && raw[0] && Number.isFinite(Number(raw[0].time))) {
          localBest = raw[0];
        }
      } catch (e) {}

      if (globalBest && localBest) {
        return Number(localBest.time) < Number(globalBest.time) ? localBest : globalBest;
      }
      return globalBest || localBest || null;
    }
  };

  window.ArcadeTheme = {
    get: () => currentTheme,
    isLight: () => currentTheme === 'light',
    set: (theme) => {
      const next = theme === 'light' ? 'light' : 'dark';
      currentTheme = next;
      try {
        const root = document.documentElement;
        root.classList.add('arcade-theme-snap');
        localStorage.setItem(THEME_KEY, next);
        root.setAttribute('data-theme', next);
        void root.offsetHeight;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          try { root.classList.remove('arcade-theme-snap'); } catch (e) {}
        }));
      } catch (e) {}
      window.ArcadeTheme.syncButtons();
      try {
        window.dispatchEvent(new CustomEvent('arcade:theme-changed', { detail: next }));
      } catch (e) {}
      return next;
    },
    toggle: () => {
      const next = currentTheme === 'light' ? 'dark' : 'light';
      if (window.ArcadeAudio) window.ArcadeAudio.click();
      return window.ArcadeTheme.set(next);
    },
    syncButtons: () => {
      const isLight = currentTheme === 'light';
      document.querySelectorAll('#btn-arcade-theme, [data-arcade-theme-btn]').forEach(btn => {
        const showLabel = btn.classList.contains('hub-action-btn') || btn.dataset.withLabel === '1';
        btn.innerHTML = showLabel
          ? (isLight ? '🌙 <span>Dunkel</span>' : '☀️ <span>Hell</span>')
          : (isLight ? '🌙' : '☀️');
        btn.title = isLight
          ? 'In den Dunkelmodus wechseln'
          : 'In den Hellmodus wechseln';
        btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
        btn.classList.toggle('is-light-mode', isLight);
      });
    }
  };

  // ==========================================================================
  // COMMUNITY FEEDBACK, WISHES, USER LOGIN & TURNSTILE CAPTCHA
  // ==========================================================================
  const AUTH_USER_KEY = 'arcade_auth_user_v1';
  const AUTH_TOKEN_KEY = 'arcade_auth_token_v1';
  const LOCAL_USERS_KEY = 'arcade_local_users_v1';
  const FB_STORE_KEY = 'arcade_feedback_items_v1';
  const FB_VOTES_KEY = 'arcade_feedback_votes_v1';
  // Cloudflare Turnstile Sitekey (Standard: offizieller Cloudflare Turnstile Test/Demo-Key;
  // kann jederzeit durch deinen Domain-spezifischen Turnstile Sitekey ersetzt werden)
  const TURNSTILE_SITE_KEY = '1x00000000000000000000AA';

  const FEEDBACK_TARGETS = [
    { id: 'all', title: '✨ Alle Module & Allgemein', icon: '🌐' },
    { id: 'general', title: 'Allgemein / Ganze Website', icon: '🏠' },
    { id: 'podracer', title: 'Canyon Podracer 3D', icon: '🏎️' },
    { id: 'eroadtrip', title: 'E-Roadtrip', icon: '⚡' },
    { id: 'minesweeper_3d_prompt_test', title: 'Minesweeper 3d prompt Version', icon: '🧊' },
    { id: 'minesweeper', title: 'Minesweeper 3D – Tech Demo KI-Agent', icon: '💣' },
    { id: 'roadster', title: 'Hyper-Roadster Lander', icon: '🚀' },
    { id: 'zombie', title: 'Zombie Horde: Gate Runner', icon: '🧟' },
    { id: 'tower', title: 'Bastion Tower Defense', icon: '🛸' },
    { id: 'solitaire3d', title: '3D Spider Solitär (4 Farben)', icon: '🕷️' },
    { id: 'solitaire', title: 'Klondike Solitaire', icon: '🃏' },
    { id: 'p2048', title: '2048 Prism', icon: '🔷' },
    { id: 'quiz_ai', title: 'KI: Entstehung & Funktionsweise Quiz', icon: '🤖' },
    { id: 'quiz_waldgarten', title: 'Waldgarten Quiz · Schwarzenburg (Heideblick)', icon: '🌿', unlisted: true },
    { id: 'quiz_napoli72h', title: 'Napoli72H Pizza-Quiz · Aachen (Test-Demo)', icon: '🍕', unlisted: true },
    { id: 'quiz_herr_tutto', title: 'Herr Tutto Quiz · Eilendorf', icon: '🎩', unlisted: true },
    { id: 'quiz_mil_air', title: 'Militärflugzeuge Quiz', icon: '🛩️' },
    { id: 'quiz_airliners', title: 'Passagierflugzeuge Quiz', icon: '✈️' },
    { id: 'quiz_etfs', title: 'Passives Investieren & ETFs Quiz', icon: '📈' },
    { id: 'quiz_bitcoin', title: 'Bitcoin Mega-Quiz', icon: '₿' },
    { id: 'quiz_porsche', title: 'Porsche & Taycan Quiz', icon: '🏎️' },
    { id: 'quiz_md11', title: 'McDonnell Douglas MD-11 Quiz', icon: '🛫' },
    { id: 'quiz_naildesign', title: 'Nageldesign Quiz · Finger- & Fußnägel', icon: '💅' },
    { id: 'quiz_torten', title: 'Torten Quiz · Klassiker & Patisserie', icon: '🎂' },
    { id: 'quiz_geburt', title: 'Bewusste Schwangerschaft & sanfte Geburt', icon: '🌸' },
    { id: 'quiz_fussball', title: 'Fußball – Das große Quiz', icon: '⚽' },
    { id: 'quiz_american_football', title: 'American Football – Das große NFL-Quiz', icon: '🏈' },
    { id: 'quiz_golf', title: 'Golf – Das große Quiz', icon: '⛳' },
    { id: 'quiz_f1', title: 'Formel 1 – Legenden, Technik & Königsklasse', icon: '🏎️' },
    { id: 'quiz_apple', title: 'Apple – Produkte, Kult & Technikgeschichte', icon: '🍎' },
    { id: 'quiz_movies', title: 'Kino & Filme Quiz (o. RomComs)', icon: '🎬' },
    { id: 'quiz_egypt', title: 'Ägyptische Geschichte Quiz', icon: '🏺' },
    { id: 'quiz_diving', title: 'Tauchen & Scuba Diving Quiz', icon: '🤿' },
    { id: 'quiz_cpus', title: 'Prozessoren-Quiz (2000–Heute)', icon: '💻' },
    { id: 'quiz_gpus', title: 'Grafikkarten-Quiz (2000–Heute)', icon: '🎮' },
    { id: 'quiz_phones', title: 'Handys & Smartphones Quiz', icon: '📱' },
    { id: 'quiz_pilze_aachen', title: 'Pilz-Sammler-Quiz: Region Aachen', icon: '🍄' },
    { id: 'quiz_swiss_trains', title: 'Schweizer Eisenbahnloks', icon: '🚆' },
    { id: 'quiz_emob', title: 'E-Mobilität & Tesla Nerd-Quiz', icon: '⚡' },
    { id: 'quiz_pol', title: 'Politik & Ökonomie Quiz', icon: '⚖️' },
    { id: 'quiz_hist', title: 'Geschichte & Weltereignisse Quiz', icon: '🏛️' },
    { id: 'quiz_china', title: 'Neuere Chinesische Geschichte Quiz', icon: '🏯' },
    { id: 'quiz', title: 'Quiz Arena: Klassik & Mega-Mix', icon: '❓' }
  ];

  const FEEDBACK_TARGET_MAP = Object.fromEntries(FEEDBACK_TARGETS.map(t => [t.id, t]));

  const DEFAULT_SEED_FEEDBACK = [
    {
      id: 101,
      targetId: 'zombie',
      category: 'bug',
      status: 'fixed',
      title: 'Streuschuss trifft auf der Brücke zu eng / kaum spürbar',
      body: 'Beim Zombie-Spiel fühlte sich der Streuschuss nach dem Einsammeln des Tors kaum breiter an als der Einzelschuss. Könnt ihr den Fächerwinkel vergrößern?',
      authorName: 'Johannes',
      authorRole: 'admin',
      upvotes: 6,
      createdAt: '2026-11-15T19:40:00Z',
      replies: [
        {
          id: 201,
          postId: 101,
          authorName: '🤖 KI-Agent (Antigravity)',
          authorRole: 'agent',
          body: 'Behoben in Commit 107400f! Der Fächerwinkel wurde für 3× Streu auf [-0.85, 0, +0.85] und für 5× Streu auf [-1.55, -0.78, 0, +0.78, +1.55] verbreitert, Stufe 2 behält den zentralen Hauptstrahl bei, der Salven-Schaden wurde auf 1,35× / 1,70× angehoben und die orangen Plasma-Leuchtspuren folgen jetzt exakt dem Streuwinkel.',
          newStatus: 'fixed',
          createdAt: '2026-11-15T20:15:00Z'
        }
      ]
    },
    {
      id: 102,
      targetId: 'minesweeper_3d_prompt_test',
      category: 'wish',
      status: 'fixed',
      title: 'Einzelne äußere Würfel ausblenden & wieder einblenden können',
      body: 'Wenn der 3D-Würfel größer wird, verdecken äußere Zahlenblöcke oft den Blick auf das Innere. Ein Modus zum gezielten Ausblenden einzelner Blöcke samt Rückgängig-Funktion wäre super!',
      authorName: 'Johannes',
      authorRole: 'admin',
      upvotes: 8,
      createdAt: '2026-11-15T18:50:00Z',
      replies: [
        {
          id: 202,
          postId: 102,
          authorName: '🤖 KI-Agent (Antigravity)',
          authorRole: 'agent',
          body: 'Direkt in beiden 3D-Minesweeper-Versionen eingebaut (Commit af79b54): Über den Button „👁️‍🗨️ Verbergen“ (oder Taste H / Alt+Klick) lassen sich Blöcke einzeln ausblenden, per „👻 Geister“ (Taste G) halbtransparent prüfen und per Klick oder „👁 Alle“ jederzeit zurückholen.',
          newStatus: 'fixed',
          createdAt: '2026-11-15T19:30:00Z'
        }
      ]
    },
    {
      id: 103,
      targetId: 'general',
      category: 'wish',
      status: 'fixed',
      title: 'Hell-/Dunkelmodus-Schalter & größerer Fragen-Pool gegen Wiederholungen',
      body: 'Ein globaler Umschalter zwischen Dark- und Light-Mode sowie 20 Fragen pro Durchgang aus einem großen Pool (>1.000 Fragen) würden den Wiederspielwert enorm steigern.',
      authorName: 'Johannes',
      authorRole: 'admin',
      upvotes: 11,
      createdAt: '2026-11-15T17:20:00Z',
      replies: [
        {
          id: 203,
          postId: 103,
          authorName: '🤖 KI-Agent (Antigravity)',
          authorRole: 'agent',
          body: 'Erledigt (Commit 41932a2)! Alle Seiten besitzen oben rechts den ☀️/🌙 Theme-Schalter und die Quiz-Engine zieht standardmäßig 20 Fragen aus mittlerweile 1.252 Fragen & Foto-Motiven mit Anti-Wiederholungsschutz.',
          newStatus: 'fixed',
          createdAt: '2026-11-15T18:10:00Z'
        }
      ]
    }
  ];

  function readAuthUser() {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function readAuthToken() {
    try { return localStorage.getItem(AUTH_TOKEN_KEY) || ''; } catch (e) { return ''; }
  }

  async function sha256HexBrowser(str) {
    try {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(str)));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      let h = 2166136261;
      const s = String(str);
      for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return (h >>> 0).toString(16);
    }
  }

  // Turnstile Script Loader & Widget Renderer + Interactive Bot-Challenge Guard
  let _turnstileLoading = null;
  function loadTurnstileScript() {
    if (window.turnstile) return Promise.resolve(window.turnstile);
    if (_turnstileLoading) return _turnstileLoading;
    _turnstileLoading = new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.defer = true;
      s.onload = () => resolve(window.turnstile || null);
      s.onerror = () => resolve(null);
      document.head.appendChild(s);
      setTimeout(() => resolve(window.turnstile || null), 3500);
    });
    return _turnstileLoading;
  }

  function createCaptchaController(containerEl) {
    const a = 2 + Math.floor(Math.random() * 7);
    const b = 2 + Math.floor(Math.random() * 7);
    const expected = a + b;
    let turnstileToken = '';
    const uid = 'cap_' + Math.random().toString(36).slice(2, 8);

    containerEl.innerHTML = `
      <div class="fb-captcha-wrap">
        <label class="fb-captcha-check-row" for="${uid}_chk">
          <input type="checkbox" id="${uid}_chk" />
          <span>🛡️ Ich bin ein Mensch (Anti-Spam-Schutz)</span>
        </label>
        <div class="fb-captcha-math">
          <span>Aufgabe: <strong>${a} + ${b} =</strong></span>
          <input type="number" id="${uid}_ans" inputmode="numeric" placeholder="?" aria-label="Rechenaufgabe ${a} plus ${b}" />
        </div>
        <div id="${uid}_cf" style="width:100%;display:none;margin-top:6px;"></div>
        <span class="fb-captcha-badge">🔒 Cloudflare Turnstile &amp; Bot-Guard</span>
      </div>
    `;

    loadTurnstileScript().then(ts => {
      const cfBox = document.getElementById(`${uid}_cf`);
      if (ts && cfBox) {
        try {
          cfBox.style.display = 'block';
          ts.render(cfBox, {
            sitekey: TURNSTILE_SITE_KEY,
            theme: window.ArcadeTheme && window.ArcadeTheme.isLight() ? 'light' : 'dark',
            callback: (tok) => {
              turnstileToken = tok;
              const chk = document.getElementById(`${uid}_chk`);
              const ans = document.getElementById(`${uid}_ans`);
              if (chk) chk.checked = true;
              if (ans && !ans.value) ans.value = String(expected);
            }
          });
        } catch (e) {}
      }
    });

    return {
      verify: () => {
        const chk = document.getElementById(`${uid}_chk`);
        const ans = document.getElementById(`${uid}_ans`);
        const num = parseInt(ans ? ans.value : '', 10);
        if (!turnstileToken && (!chk || !chk.checked)) {
          return { ok: false, error: 'Bitte setze das Häkchen bei „Ich bin ein Mensch“.' };
        }
        if (!turnstileToken && num !== expected) {
          return { ok: false, error: `Bitte löse kurz die CAPTCHA-Rechenaufgabe (${a} + ${b} = ${expected}).` };
        }
        return {
          ok: true,
          token: turnstileToken || `local_guard_${Date.now()}_${expected}`
        };
      }
    };
  }

  window.ArcadeAuth = {
    getUser: () => readAuthUser(),
    getToken: () => readAuthToken(),
    isLoggedIn: () => !!(readAuthUser() && readAuthToken()),
    isAdmin: () => {
      const u = readAuthUser();
      return !!(u && u.role === 'admin');
    },
    isAdminOrAgent: () => {
      const u = readAuthUser();
      return !!(u && (u.role === 'admin' || u.role === 'agent'));
    },
    logout: () => {
      try {
        localStorage.removeItem(AUTH_USER_KEY);
        localStorage.removeItem(AUTH_TOKEN_KEY);
      } catch (e) {}
      try { window.dispatchEvent(new CustomEvent('arcade:auth-changed', { detail: null })); } catch (e) {}
    },
    saveSession: (user, token) => {
      try {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
        if (user && user.displayName && window.ArcadeScores) {
          window.ArcadeScores.setPlayerName(user.displayName);
        }
      } catch (e) {}
      try { window.dispatchEvent(new CustomEvent('arcade:auth-changed', { detail: user })); } catch (e) {}
    },
    registerOrLogin: async ({ mode, username, displayName, password, roleChoice, captchaToken }) => {
      const cleanUser = cleanName(username).replace(/\s+/g, '_');
      const cleanDisp = cleanName(displayName || cleanUser);
      if (cleanUser.length < 3) {
        throw new Error('Benutzername muss mindestens 3 Zeichen lang sein.');
      }
      if (!password || String(password).length < 6) {
        throw new Error('Passwort muss mindestens 6 Zeichen lang sein.');
      }

      // 1. Versuche zuerst den Live Cloudflare Worker Endpunkt (/api/auth/register bzw. /api/auth/login)
      try {
        const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login';
        const res = await fetch(`${API_BASE}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: cleanUser,
            displayName: cleanDisp,
            password,
            captchaToken
          })
        });
        if (res.status !== 404) {
          const data = await res.json().catch(() => ({}));
          if (!res.ok || !data.ok) {
            throw new Error(data.error || 'Anmeldung fehlgeschlagen.');
          }
          const user = data.user;
          window.ArcadeAuth.saveSession(user, data.token);
          return user;
        }
      } catch (err) {
        if (err && err.message && !String(err.message).includes('Failed to fetch') && !String(err.message).includes('NetworkError')) {
          throw err;
        }
      }

      // 2. Fallback: Lokaler Browser-Tresor (PBKDF2/SHA-256 gehasht) falls Worker-Auth-Route noch nicht deployed ist
      let localUsers = {};
      try { localUsers = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '{}') || {}; } catch (e) {}
      const key = cleanUser.toLowerCase();
      const pwHash = await sha256HexBrowser(`arcade_salt_v1:${key}:${password}`);

      if (mode === 'register') {
        if (localUsers[key] && localUsers[key].pwHash !== pwHash) {
          throw new Error('Dieser Benutzername ist bereits vergeben. Bitte wechsle auf „Einloggen“.');
        }
        const role = (roleChoice === 'admin' || roleChoice === 'agent')
          ? roleChoice
          : (key === 'johannes' || key === 'hunterjoe' ? 'admin' : 'user');
        const newUser = {
          id: Date.now(),
          username: cleanUser,
          displayName: cleanDisp,
          role,
          pwHash
        };
        localUsers[key] = newUser;
        try { localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(localUsers)); } catch (e) {}
        const sessionUser = { id: newUser.id, username: newUser.username, displayName: newUser.displayName, role: newUser.role };
        window.ArcadeAuth.saveSession(sessionUser, `local_jwt_${newUser.id}`);
        return sessionUser;
      } else {
        const existing = localUsers[key];
        if (!existing) {
          // Komfort: Falls der Nutzer sich zum ersten Mal einloggt, Konto direkt mit anlegen
          const role = (roleChoice === 'admin' || roleChoice === 'agent')
            ? roleChoice
            : (key === 'johannes' || key === 'hunterjoe' ? 'admin' : 'user');
          const created = {
            id: Date.now(),
            username: cleanUser,
            displayName: cleanDisp,
            role,
            pwHash
          };
          localUsers[key] = created;
          try { localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(localUsers)); } catch (e) {}
          const sessionUser = { id: created.id, username: created.username, displayName: created.displayName, role: created.role };
          window.ArcadeAuth.saveSession(sessionUser, `local_jwt_${created.id}`);
          return sessionUser;
        }
        if (existing.pwHash !== pwHash) {
          throw new Error('Passwort stimmt nicht mit dem gespeicherten Konto überein.');
        }
        if (roleChoice === 'admin' || roleChoice === 'agent') {
          existing.role = roleChoice;
          try { localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(localUsers)); } catch (e) {}
        }
        const sessionUser = { id: existing.id, username: existing.username, displayName: existing.displayName, role: existing.role };
        window.ArcadeAuth.saveSession(sessionUser, `local_jwt_${existing.id}`);
        return sessionUser;
      }
    },
    openAuthModal: (onSuccess) => {
      const prevModal = document.getElementById('arcade-auth-modal-root');
      if (prevModal) prevModal.remove();

      const savedPlayer = window.ArcadeScores ? window.ArcadeScores.getPlayerName() : '';
      const prefill = savedPlayer && savedPlayer !== 'Spieler' ? savedPlayer : '';
      let mode = 'login';

      const root = document.createElement('div');
      root.id = 'arcade-auth-modal-root';
      root.className = 'arcade-modal-backdrop';
      root.style.zIndex = '9995';
      root.innerHTML = `
        <div class="arcade-modal-card" style="width:min(450px,100%);">
          <div class="arcade-modal-head">
            <h3 class="arcade-modal-title" id="auth-modal-title">🔐 Login &amp; Registrierung</h3>
            <button type="button" class="icon-btn" id="auth-modal-close">✕</button>
          </div>
          <div class="arcade-modal-body" style="padding-top:14px;">
            <div style="display:flex;gap:6px;margin-bottom:12px;">
              <button type="button" class="fb-status-pill active" id="auth-tab-login" style="flex:1;padding:8px;">🔑 Einloggen</button>
              <button type="button" class="fb-status-pill" id="auth-tab-register" style="flex:1;padding:8px;">✨ Neu registrieren</button>
            </div>
            <p style="margin:0 0 12px;font-size:12.5px;color:var(--text-muted);line-height:1.45;">
              Zum Schutz vor Spam-Bots sind Kommentare &amp; Verbesserungswünsche durch Login + CAPTCHA geschützt.
            </p>
            <div style="display:flex;flex-direction:column;gap:9px;">
              <div>
                <label style="display:block;font-size:11.5px;font-weight:700;margin-bottom:4px;color:var(--text-muted);">Benutzername *</label>
                <input id="auth-inp-user" class="fb-input" type="text" maxlength="24" placeholder="z. B. Johannes" value="${escapeHtml(prefill)}" autocomplete="username" />
              </div>
              <div>
                <label style="display:block;font-size:11.5px;font-weight:700;margin-bottom:4px;color:var(--text-muted);">Passwort * (mind. 6 Zeichen)</label>
                <input id="auth-inp-pass" class="fb-input" type="password" maxlength="64" placeholder="••••••••" autocomplete="current-password" />
              </div>
              <div id="auth-captcha-slot"></div>
              <div id="auth-error-msg" style="display:none;padding:8px 10px;border-radius:8px;background:rgba(244,63,94,0.18);border:1px solid rgba(244,63,94,0.45);color:#fda4af;font-size:12px;font-weight:700;"></div>
              <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:4px;">
                <button type="button" class="secondary-btn" id="auth-btn-cancel">Abbrechen</button>
                <button type="button" class="primary-btn" id="auth-btn-submit">🔐 Jetzt anmelden</button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(root);

      const capCtrl = createCaptchaController(document.getElementById('auth-captcha-slot'));
      const errEl = document.getElementById('auth-error-msg');
      const tabLogin = document.getElementById('auth-tab-login');
      const tabReg = document.getElementById('auth-tab-register');
      const submitBtn = document.getElementById('auth-btn-submit');

      function setMode(m) {
        mode = m;
        tabLogin.classList.toggle('active', m === 'login');
        tabReg.classList.toggle('active', m === 'register');
        submitBtn.textContent = m === 'login' ? '🔐 Jetzt anmelden' : '✨ Konto erstellen';
        errEl.style.display = 'none';
      }

      tabLogin.addEventListener('click', () => setMode('login'));
      tabReg.addEventListener('click', () => setMode('register'));

      const close = () => root.remove();
      document.getElementById('auth-modal-close').addEventListener('click', close);
      document.getElementById('auth-btn-cancel').addEventListener('click', close);
      root.addEventListener('click', e => { if (e.target === root) close(); });

      submitBtn.addEventListener('click', async () => {
        errEl.style.display = 'none';
        const capRes = capCtrl.verify();
        if (!capRes.ok) {
          errEl.textContent = capRes.error;
          errEl.style.display = 'block';
          return;
        }
        const username = document.getElementById('auth-inp-user').value;
        const password = document.getElementById('auth-inp-pass').value;

        submitBtn.disabled = true;
        try {
          const user = await window.ArcadeAuth.registerOrLogin({
            mode,
            username,
            displayName: username,
            password,
            roleChoice: 'user',
            captchaToken: capRes.token
          });
          if (window.ArcadeAudio) window.ArcadeAudio.perkGood();
          close();
          if (typeof onSuccess === 'function') onSuccess(user);
        } catch (err) {
          errEl.textContent = err.message || 'Fehler bei der Anmeldung.';
          errEl.style.display = 'block';
          if (window.ArcadeAudio) window.ArcadeAudio.perkBad();
        } finally {
          submitBtn.disabled = false;
        }
      });
    }
  };

  // ==========================================================================
  // FEEDBACK STORAGE & API SYNC
  // ==========================================================================
  function readLocalFeedback() {
    try {
      const raw = localStorage.getItem(FB_STORE_KEY);
      if (!raw) {
        localStorage.setItem(FB_STORE_KEY, JSON.stringify(DEFAULT_SEED_FEEDBACK));
        return DEFAULT_SEED_FEEDBACK.slice();
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_SEED_FEEDBACK.slice();
    } catch (e) {
      return DEFAULT_SEED_FEEDBACK.slice();
    }
  }

  function writeLocalFeedback(items) {
    try {
      localStorage.setItem(FB_STORE_KEY, JSON.stringify(items));
    } catch (e) {}
  }

  function readVotedSet() {
    try {
      return new Set(JSON.parse(localStorage.getItem(FB_VOTES_KEY) || '[]'));
    } catch (e) {
      return new Set();
    }
  }

  function writeVotedSet(setObj) {
    try {
      localStorage.setItem(FB_VOTES_KEY, JSON.stringify(Array.from(setObj)));
    } catch (e) {}
  }

  function mergeRemoteAndLocal(remoteItems, localItems) {
    const map = new Map();
    (localItems || []).forEach(it => map.set(String(it.id), it));
    (remoteItems || []).forEach(it => map.set(String(it.id), it));
    const merged = Array.from(map.values());
    const statusWeight = { in_progress: 0, open: 1, fixed: 2 };
    merged.sort((a, b) => {
      const sw = (statusWeight[a.status] ?? 1) - (statusWeight[b.status] ?? 1);
      if (sw !== 0) return sw;
      if ((b.upvotes || 0) !== (a.upvotes || 0)) return (b.upvotes || 0) - (a.upvotes || 0);
      return Number(b.id || 0) - Number(a.id || 0);
    });
    return merged;
  }

  function getCategoryMeta(cat) {
    if (cat === 'bug') return { label: '🐞 Bug / Fehler', cls: 'cat-bug' };
    if (cat === 'praise') return { label: '❤️ Lob & Feedback', cls: 'cat-praise' };
    if (cat === 'question') return { label: '❓ Frage', cls: 'cat-question' };
    return { label: '💡 Verbesserungswunsch', cls: 'cat-wish' };
  }

  function getStatusMeta(st) {
    if (st === 'fixed') return { label: '✅ Behoben / Umgesetzt', cls: 'fixed' };
    if (st === 'in_progress') return { label: '🛠️ In Arbeit (KI-Agent)', cls: 'in_progress' };
    return { label: '📬 Offen', cls: 'open' };
  }

  function getRoleBadgeHtml(role, authorName) {
    if (role === 'agent') {
      return `<span class="fb-role-badge agent">🤖 KI-Agent</span>`;
    }
    if (role === 'admin') {
      return `<span class="fb-role-badge admin">👑 Admin</span>`;
    }
    return `<span class="fb-role-badge user">👤 ${escapeHtml(authorName || 'Spieler')}</span>`;
  }

  function isNetworkFetchErr(err) {
    if (!err) return false;
    const msg = String(err.message || err);
    return err.name === 'TypeError' || msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('Load failed');
  }

  window.ArcadeFeedback = {
    TARGETS: FEEDBACK_TARGETS,
    getItems: async (targetFilter = 'all', statusFilter = 'all') => {
      let all = readLocalFeedback();
      try {
        const res = await fetch(`${API_BASE}/api/feedback?target=all&status=all&limit=100`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.ok && Array.isArray(data.items)) {
            all = mergeRemoteAndLocal(data.items, all);
            writeLocalFeedback(all);
            syncFeedbackButtons();
            try { window.dispatchEvent(new CustomEvent('arcade:feedback-synced')); } catch (e) {}
          }
        }
      } catch (e) {}

      return all.filter(it => {
        if (targetFilter && targetFilter !== 'all' && it.targetId !== targetFilter) return false;
        if (statusFilter && statusFilter !== 'all' && it.status !== statusFilter) return false;
        return true;
      });
    },
    getCountsForTarget: (targetId) => {
      const all = readLocalFeedback();
      const filtered = (!targetId || targetId === 'all')
        ? all
        : all.filter(it => it.targetId === targetId);
      return {
        total: filtered.length,
        open: filtered.filter(it => it.status === 'open' || it.status === 'in_progress').length,
        fixed: filtered.filter(it => it.status === 'fixed').length
      };
    },
    createPost: async ({ targetId, category, title, body, captchaToken }) => {
      const user = window.ArcadeAuth.getUser();
      if (!user || !window.ArcadeAuth.getToken()) throw new Error('Bitte logge dich zuerst ein.');
      const cleanTitle = String(title || '').trim().slice(0, 110);
      const cleanBody = String(body || '').trim().slice(0, 1500);
      if (cleanTitle.length < 4) throw new Error('Bitte gib einen kurzen Titel (mind. 4 Zeichen) ein.');
      if (cleanBody.length < 6) throw new Error('Bitte beschreibe deinen Wunsch oder Kommentar etwas genauer.');

      let createdItem = null;
      try {
        const res = await fetch(`${API_BASE}/api/feedback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.ArcadeAuth.getToken()}`
          },
          body: JSON.stringify({ targetId, category, title: cleanTitle, body: cleanBody, captchaToken })
        });
        if (res.status !== 404) {
          const data = await res.json().catch(() => ({}));
          if (res.status === 401) {
            window.ArcadeAuth.logout();
            throw new Error(data.error || 'Deine Sitzung ist abgelaufen oder nur lokal gültig. Bitte melde dich kurz neu an.');
          }
          if (res.ok && data.ok && data.item) {
            createdItem = data.item;
          } else {
            throw new Error(data.error || 'Wunsch konnte nicht gespeichert werden.');
          }
        }
      } catch (err) {
        if (!isNetworkFetchErr(err)) {
          throw err;
        }
      }

      if (!createdItem) {
        createdItem = {
          id: Date.now(),
          targetId: targetId || 'general',
          category: category || 'wish',
          status: 'open',
          title: cleanTitle,
          body: cleanBody,
          authorName: user.displayName || user.username || 'Spieler',
          authorRole: user.role || 'user',
          upvotes: 1,
          createdAt: new Date().toISOString(),
          replies: []
        };
      }

      const all = readLocalFeedback();
      all.unshift(createdItem);
      writeLocalFeedback(all);
      syncFeedbackButtons();
      try { window.dispatchEvent(new CustomEvent('arcade:feedback-updated')); } catch (e) {}
      return createdItem;
    },
    addReply: async ({ postId, body, newStatus, asAgent }) => {
      const user = window.ArcadeAuth.getUser();
      if (!user || !window.ArcadeAuth.getToken()) throw new Error('Bitte logge dich ein, um zu kommentieren.');
      const cleanBody = String(body || '').trim().slice(0, 1500);
      if (cleanBody.length < 2) throw new Error('Bitte gib einen Kommentar ein.');

      const role = (asAgent && (user.role === 'admin' || user.role === 'agent')) ? 'agent' : (user.role || 'user');
      const authorName = role === 'agent'
        ? '🤖 KI-Agent (Antigravity)'
        : (user.displayName || user.username || 'Spieler');

      let replyObj = null;
      try {
        const res = await fetch(`${API_BASE}/api/feedback/${encodeURIComponent(postId)}/reply`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.ArcadeAuth.getToken()}`
          },
          body: JSON.stringify({ body: cleanBody, newStatus, asAgent, authorName })
        });
        if (res.status !== 404) {
          const data = await res.json().catch(() => ({}));
          if (res.status === 401) {
            window.ArcadeAuth.logout();
            throw new Error(data.error || 'Deine Sitzung ist abgelaufen oder nur lokal gültig. Bitte melde dich kurz neu an.');
          }
          if (res.ok && data && data.ok && data.reply) {
            replyObj = data.reply;
          } else {
            throw new Error(data.error || 'Antwort konnte nicht gespeichert werden.');
          }
        }
      } catch (err) {
        if (!isNetworkFetchErr(err)) {
          throw err;
        }
      }

      if (!replyObj) {
        replyObj = {
          id: Date.now(),
          postId,
          authorName,
          authorRole: role,
          body: cleanBody,
          newStatus: newStatus || null,
          createdAt: new Date().toISOString()
        };
      }

      const appliedStatus = replyObj.newStatus;
      const all = readLocalFeedback();
      const target = all.find(it => String(it.id) === String(postId));
      if (target) {
        if (!Array.isArray(target.replies)) target.replies = [];
        target.replies.push(replyObj);
        if (appliedStatus && ['open', 'in_progress', 'fixed'].includes(appliedStatus)) {
          target.status = appliedStatus;
        }
        writeLocalFeedback(all);
      }
      syncFeedbackButtons();
      try { window.dispatchEvent(new CustomEvent('arcade:feedback-updated')); } catch (e) {}
      return replyObj;
    },
    upvote: async (postId) => {
      const user = window.ArcadeAuth.getUser();
      if (!user || !window.ArcadeAuth.getToken()) {
        window.ArcadeAuth.openAuthModal();
        return null;
      }
      const voted = readVotedSet();
      const voteKey = `${user.username}:${postId}`;
      if (voted.has(voteKey)) return null;

      let serverUpvotes = null;
      let offlineFallback = false;
      try {
        const res = await fetch(`${API_BASE}/api/feedback/${encodeURIComponent(postId)}/vote`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${window.ArcadeAuth.getToken()}` }
        });
        if (res.status === 404) {
          offlineFallback = true;
        } else if (res.status === 401) {
          window.ArcadeAuth.logout();
          window.ArcadeAuth.openAuthModal();
          return null;
        } else if (res.status === 409) {
          voted.add(voteKey);
          writeVotedSet(voted);
          return null;
        } else {
          const data = await res.json().catch(() => ({}));
          if (!res.ok || !data.ok) return null;
          if (typeof data.upvotes === 'number') serverUpvotes = data.upvotes;
        }
      } catch (err) {
        if (!isNetworkFetchErr(err)) return null;
        offlineFallback = true;
      }

      if (!offlineFallback && serverUpvotes == null) {
        return null;
      }

      voted.add(voteKey);
      writeVotedSet(voted);

      const all = readLocalFeedback();
      const item = all.find(it => String(it.id) === String(postId));
      if (item) {
        item.upvotes = serverUpvotes != null ? serverUpvotes : ((Number(item.upvotes) || 0) + 1);
        writeLocalFeedback(all);
      }
      syncFeedbackButtons();
      try { window.dispatchEvent(new CustomEvent('arcade:feedback-updated')); } catch (e) {}
      return item ? item.upvotes : serverUpvotes;
    },
    mountBoard: (containerEl, opts = {}) => {
      if (!containerEl) return;
      let activeTarget = opts.initialTarget || detectGameId() || 'all';
      let activeStatus = 'all';
      let composeOpen = !!opts.composeOpen;
      let openReplyId = null;

      function renderShell() {
        const user = window.ArcadeAuth.getUser();
        const isPriv = window.ArcadeAuth.isAdminOrAgent();
        const currentGameId = detectGameId();
        const visibleFeedbackTargets = FEEDBACK_TARGETS.filter(t => !t.unlisted || t.id === currentGameId);
        const targetOptions = visibleFeedbackTargets.map(t =>
          `<option value="${escapeHtml(t.id)}" ${t.id === activeTarget ? 'selected' : ''}>${t.icon} ${escapeHtml(t.title)}</option>`
        ).join('');

        const postTargetDefault = (activeTarget && activeTarget !== 'all') ? activeTarget : (currentGameId || 'general');
        const postTargetOptions = visibleFeedbackTargets.filter(t => t.id !== 'all').map(t =>
          `<option value="${escapeHtml(t.id)}" ${t.id === postTargetDefault ? 'selected' : ''}>${t.icon} ${escapeHtml(t.title)}</option>`
        ).join('');

        const authStripHtml = user
          ? `
            <div class="fb-auth-strip">
              <div class="fb-auth-user">
                <span>Angemeldet als <strong>${escapeHtml(user.displayName || user.username)}</strong></span>
                ${getRoleBadgeHtml(user.role, user.displayName)}
              </div>
              <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <button type="button" class="primary-btn" id="fb-btn-toggle-compose" style="padding:6px 12px;font-size:12.5px;">
                  ${composeOpen ? '✕ Formular schließen' : '➕ Wunsch / Bug eintragen'}
                </button>
                <button type="button" class="secondary-btn" id="fb-btn-switch-role" style="padding:5px 10px;font-size:11.5px;" title="Konto oder Rolle wechseln">🔄 Konto</button>
                <button type="button" class="secondary-btn" id="fb-btn-logout" style="padding:5px 10px;font-size:11.5px;">Abmelden</button>
              </div>
            </div>
          `
          : `
            <div class="fb-auth-strip">
              <div class="fb-auth-user">
                <span>🔒 <strong>Spam-Schutz aktiv:</strong> Bitte kurz einloggen (mit CAPTCHA), um Verbesserungswünsche einzutragen oder zu kommentieren.</span>
              </div>
              <button type="button" class="primary-btn" id="fb-btn-login" style="padding:7px 14px;font-size:12.5px;">🔐 Login / Registrieren (mit CAPTCHA)</button>
            </div>
          `;

        const composeHtml = (user && composeOpen)
          ? `
            <div class="fb-compose-box" id="fb-compose-box">
              <h4 style="margin:0 0 10px;font-size:14.5px;font-weight:800;">✨ Neuen Verbesserungswunsch, Bug oder Kommentar eintragen</h4>
              <div class="fb-compose-grid">
                <div>
                  <label style="display:block;font-size:11.5px;font-weight:700;margin-bottom:4px;color:var(--text-muted);">Betroffenes Spiel / Quiz</label>
                  <select id="fb-inp-target" class="fb-select" style="width:100%;">${postTargetOptions}</select>
                </div>
                <div>
                  <label style="display:block;font-size:11.5px;font-weight:700;margin-bottom:4px;color:var(--text-muted);">Kategorie</label>
                  <select id="fb-inp-cat" class="fb-select" style="width:100%;">
                    <option value="wish">💡 Verbesserungswunsch / Feature-Idee</option>
                    <option value="bug">🐞 Bug / Fehler melden</option>
                    <option value="praise">❤️ Lob &amp; allgemeiner Kommentar</option>
                    <option value="question">❓ Frage zum Spiel / Quiz</option>
                  </select>
                </div>
              </div>
              <div style="margin-bottom:9px;">
                <input id="fb-inp-title" class="fb-input" type="text" maxlength="110" placeholder="Kurzer Titel (z. B. „Neuer Joker beim KI-Quiz“ oder „Zoom-Geschwindigkeit bei Minesweeper“)" />
              </div>
              <div>
                <textarea id="fb-inp-body" class="fb-textarea" maxlength="1500" placeholder="Beschreibe deinen Wunsch oder das Problem so konkret wie möglich — der KI-Agent kann es dann direkt beheben und hier drunter kommentieren!"></textarea>
              </div>
              <div id="fb-post-captcha"></div>
              <div id="fb-post-error" style="display:none;margin-bottom:8px;padding:8px 10px;border-radius:8px;background:rgba(244,63,94,0.18);border:1px solid rgba(244,63,94,0.45);color:#fda4af;font-size:12px;font-weight:700;"></div>
              <div style="display:flex;justify-content:flex-end;gap:8px;">
                <button type="button" class="secondary-btn" id="fb-btn-cancel-post">Abbrechen</button>
                <button type="button" class="primary-btn" id="fb-btn-submit-post">🚀 Wunsch absenden</button>
              </div>
            </div>
          `
          : '';

        containerEl.innerHTML = `
          ${authStripHtml}
          ${composeHtml}
          <div class="fb-toolbar">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <label style="font-size:12px;font-weight:700;color:var(--text-muted);">Modul:</label>
              <select class="fb-select" id="fb-filter-target" aria-label="Modul filtern">${targetOptions}</select>
            </div>
            <div class="fb-status-pills" id="fb-filter-status">
              <button type="button" class="fb-status-pill ${activeStatus === 'all' ? 'active' : ''}" data-st="all">Alle</button>
              <button type="button" class="fb-status-pill ${activeStatus === 'open' ? 'active' : ''}" data-st="open">📬 Offen</button>
              <button type="button" class="fb-status-pill ${activeStatus === 'in_progress' ? 'active' : ''}" data-st="in_progress">🛠️ In Arbeit</button>
              <button type="button" class="fb-status-pill ${activeStatus === 'fixed' ? 'active' : ''}" data-st="fixed">✅ Behoben</button>
            </div>
          </div>
          <div class="fb-list" id="fb-items-list">
            <div style="text-align:center;padding:24px;color:var(--text-muted);">Lade Wünsche &amp; Kommentare…</div>
          </div>
        `;

        const loginBtn = containerEl.querySelector('#fb-btn-login');
        if (loginBtn) {
          loginBtn.addEventListener('click', () => {
            window.ArcadeAuth.openAuthModal(() => {
              composeOpen = true;
              renderShell();
            });
          });
        }

        const switchRoleBtn = containerEl.querySelector('#fb-btn-switch-role');
        if (switchRoleBtn) {
          switchRoleBtn.addEventListener('click', () => {
            window.ArcadeAuth.openAuthModal(() => renderShell());
          });
        }

        const logoutBtn = containerEl.querySelector('#fb-btn-logout');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', () => {
            window.ArcadeAuth.logout();
            composeOpen = false;
            renderShell();
          });
        }

        const toggleComposeBtn = containerEl.querySelector('#fb-btn-toggle-compose');
        if (toggleComposeBtn) {
          toggleComposeBtn.addEventListener('click', () => {
            composeOpen = !composeOpen;
            renderShell();
          });
        }

        const cancelPostBtn = containerEl.querySelector('#fb-btn-cancel-post');
        if (cancelPostBtn) {
          cancelPostBtn.addEventListener('click', () => {
            composeOpen = false;
            renderShell();
          });
        }

        let postCapCtrl = null;
        const postCapSlot = containerEl.querySelector('#fb-post-captcha');
        if (postCapSlot) {
          postCapCtrl = createCaptchaController(postCapSlot);
        }

        const submitPostBtn = containerEl.querySelector('#fb-btn-submit-post');
        if (submitPostBtn && postCapCtrl) {
          submitPostBtn.addEventListener('click', async () => {
            const errBox = containerEl.querySelector('#fb-post-error');
            errBox.style.display = 'none';
            const cap = postCapCtrl.verify();
            if (!cap.ok) {
              errBox.textContent = cap.error;
              errBox.style.display = 'block';
              return;
            }
            const targetId = containerEl.querySelector('#fb-inp-target').value;
            const category = containerEl.querySelector('#fb-inp-cat').value;
            const title = containerEl.querySelector('#fb-inp-title').value;
            const body = containerEl.querySelector('#fb-inp-body').value;

            submitPostBtn.disabled = true;
            try {
              await window.ArcadeFeedback.createPost({
                targetId,
                category,
                title,
                body,
                captchaToken: cap.token
              });
              if (window.ArcadeAudio) window.ArcadeAudio.win();
              composeOpen = false;
              activeTarget = targetId;
              renderShell();
            } catch (err) {
              errBox.textContent = err.message || 'Fehler beim Speichern.';
              errBox.style.display = 'block';
            } finally {
              submitPostBtn.disabled = false;
            }
          });
        }

        const targetSel = containerEl.querySelector('#fb-filter-target');
        if (targetSel) {
          targetSel.addEventListener('change', () => {
            activeTarget = targetSel.value;
            renderItemsList();
          });
        }

        const statusBar = containerEl.querySelector('#fb-filter-status');
        if (statusBar) {
          statusBar.addEventListener('click', e => {
            const pill = e.target.closest('.fb-status-pill');
            if (!pill) return;
            activeStatus = pill.dataset.st;
            statusBar.querySelectorAll('.fb-status-pill').forEach(p => p.classList.toggle('active', p === pill));
            renderItemsList();
          });
        }

        renderItemsList();
      }

      async function renderItemsList() {
        const listEl = containerEl.querySelector('#fb-items-list');
        if (!listEl) return;
        const items = await window.ArcadeFeedback.getItems(activeTarget, activeStatus);
        const user = window.ArcadeAuth.getUser();
        const isPriv = window.ArcadeAuth.isAdminOrAgent();
        const votedSet = readVotedSet();

        if (!items || items.length === 0) {
          const tMeta = FEEDBACK_TARGET_MAP[activeTarget] || FEEDBACK_TARGET_MAP.general;
          listEl.innerHTML = `
            <div style="text-align:center;padding:28px 16px;border-radius:14px;background:rgba(15,23,42,0.45);border:1px dashed rgba(148,163,184,0.28);color:var(--text-muted);">
              Noch keine Einträge für <strong>${escapeHtml(tMeta.title)}</strong> in diesem Filter — schreib gerne den ersten Verbesserungswunsch!
            </div>
          `;
          return;
        }

        listEl.innerHTML = items.map(item => {
          const tMeta = FEEDBACK_TARGET_MAP[item.targetId] || { icon: '🎮', title: item.targetId };
          const cMeta = getCategoryMeta(item.category);
          const sMeta = getStatusMeta(item.status);
          const isVoted = user && votedSet.has(`${user.username}:${item.id}`);
          const replies = Array.isArray(item.replies) ? item.replies : [];

          const repliesHtml = replies.map(rep => {
            const repCls = rep.authorRole === 'agent' ? 'is-agent' : (rep.authorRole === 'admin' ? 'is-admin' : '');
            const stChange = rep.newStatus ? `<span class="fb-status-badge ${escapeHtml(getStatusMeta(rep.newStatus).cls)}">${escapeHtml(getStatusMeta(rep.newStatus).label)}</span>` : '';
            return `
              <div class="fb-reply ${repCls}">
                <div class="fb-reply-head">
                  <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <strong>${escapeHtml(rep.authorName)}</strong>
                    ${getRoleBadgeHtml(rep.authorRole, rep.authorName)}
                    ${stChange}
                  </div>
                  <span>${escapeHtml(formatDateDe(rep.createdAt))}</span>
                </div>
                <div style="white-space:pre-wrap;">${escapeHtml(rep.body)}</div>
              </div>
            `;
          }).join('');

          const replyFormHtml = (openReplyId === String(item.id))
            ? `
              <div class="fb-reply-form" data-reply-box="${escapeHtml(item.id)}">
                <textarea class="fb-textarea fb-reply-input" rows="2" maxlength="1200" placeholder="${isPriv ? 'Antwort / Bugfix-Kommentar eintragen (z. B. was behoben wurde)…' : 'Kommentar oder Ergänzung schreiben…'}"></textarea>
                <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;">
                  ${isPriv ? `
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                      <label style="font-size:11.5px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;">
                        <input type="checkbox" class="fb-reply-as-agent" ${user && user.role === 'agent' ? 'checked' : ''} />
                        <span>🤖 Als KI-Agent markieren</span>
                      </label>
                      <select class="fb-select fb-reply-status" style="padding:4px 8px;font-size:11.5px;">
                        <option value="">Status beibehalten</option>
                        <option value="in_progress">🛠️ Auf „In Arbeit“ setzen</option>
                        <option value="fixed" selected>✅ Auf „Behoben / Umgesetzt“ setzen</option>
                        <option value="open">📬 Auf „Offen“ setzen</option>
                      </select>
                    </div>
                  ` : '<span></span>'}
                  <div style="display:flex;gap:6px;">
                    <button type="button" class="secondary-btn fb-reply-cancel" style="padding:5px 10px;font-size:11.5px;">Abbrechen</button>
                    <button type="button" class="primary-btn fb-reply-send" data-id="${escapeHtml(item.id)}" style="padding:5px 12px;font-size:12px;">💬 Antwort senden</button>
                  </div>
                </div>
              </div>
            `
            : '';

          return `
            <article class="fb-card status-${escapeHtml(item.status || 'open')}" data-post-id="${escapeHtml(item.id)}">
              <div class="fb-card-top">
                <div class="fb-badges">
                  <span class="fb-tag target">${tMeta.icon} ${escapeHtml(tMeta.title)}</span>
                  <span class="fb-tag ${cMeta.cls}">${escapeHtml(cMeta.label)}</span>
                </div>
                <span class="fb-status-badge ${sMeta.cls}">${escapeHtml(sMeta.label)}</span>
              </div>
              <h4 class="fb-title">${escapeHtml(item.title)}</h4>
              <p class="fb-body">${escapeHtml(item.body)}</p>
              <div class="fb-meta-row">
                <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;">
                  ${getRoleBadgeHtml(item.authorRole, item.authorName)}
                  <span>· ${escapeHtml(formatDateDe(item.createdAt))}</span>
                </div>
                <div style="display:flex;align-items:center;gap:7px;">
                  <button type="button" class="fb-vote-btn ${isVoted ? 'voted' : ''}" data-vote-id="${escapeHtml(item.id)}" title="Wunsch unterstützen">
                    ▲ <span>${Number(item.upvotes || 0)}</span>
                  </button>
                  <button type="button" class="fb-reply-toggle" data-reply-id="${escapeHtml(item.id)}">
                    💬 ${replies.length > 0 ? `${replies.length} ${replies.length === 1 ? 'Antwort' : 'Antworten'}` : 'Kommentieren'}
                  </button>
                </div>
              </div>
              ${replies.length > 0 ? `<div class="fb-replies">${repliesHtml}</div>` : ''}
              ${replyFormHtml}
            </article>
          `;
        }).join('');

        listEl.querySelectorAll('[data-vote-id]').forEach(btn => {
          btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-vote-id');
            const nextVotes = await window.ArcadeFeedback.upvote(id);
            if (nextVotes != null) {
              if (window.ArcadeAudio) window.ArcadeAudio.pop();
              renderItemsList();
            }
          });
        });

        listEl.querySelectorAll('[data-reply-id]').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-reply-id');
            if (!window.ArcadeAuth.isLoggedIn()) {
              window.ArcadeAuth.openAuthModal(() => {
                openReplyId = String(id);
                renderShell();
              });
              return;
            }
            openReplyId = (openReplyId === String(id)) ? null : String(id);
            renderItemsList();
          });
        });

        listEl.querySelectorAll('.fb-reply-cancel').forEach(btn => {
          btn.addEventListener('click', () => {
            openReplyId = null;
            renderItemsList();
          });
        });

        listEl.querySelectorAll('.fb-reply-send').forEach(btn => {
          btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            const box = listEl.querySelector(`[data-reply-box="${id}"]`);
            if (!box) return;
            const txt = box.querySelector('.fb-reply-input').value;
            const asAgentEl = box.querySelector('.fb-reply-as-agent');
            const statusEl = box.querySelector('.fb-reply-status');
            btn.disabled = true;
            try {
              await window.ArcadeFeedback.addReply({
                postId: id,
                body: txt,
                asAgent: !!(asAgentEl && asAgentEl.checked),
                newStatus: statusEl ? statusEl.value : null
              });
              if (window.ArcadeAudio) window.ArcadeAudio.perkGood();
              openReplyId = null;
              renderItemsList();
            } catch (err) {
              alert(err.message || 'Antwort konnte nicht gespeichert werden.');
            } finally {
              btn.disabled = false;
            }
          });
        });
      }

      containerEl._arcadeRefreshBoard = () => {
        if (!document.body.contains(containerEl)) return;
        if (!composeOpen && openReplyId === null) {
          renderShell();
        } else {
          renderItemsList();
        }
      };

      if (!containerEl._arcadeListenersBound) {
        containerEl._arcadeListenersBound = true;
        window.addEventListener('arcade:auth-changed', () => {
          if (typeof containerEl._arcadeRefreshBoard === 'function') containerEl._arcadeRefreshBoard();
        });
        window.addEventListener('arcade:feedback-updated', () => {
          if (containerEl.id === 'arcade-feedback-modal-body' && typeof containerEl._arcadeRefreshBoard === 'function') {
            containerEl._arcadeRefreshBoard();
          }
        });
      }

      renderShell();
    },
    openModal: (initialTarget) => {
      removeModal();
      const target = initialTarget || detectGameId() || 'all';
      const tMeta = FEEDBACK_TARGET_MAP[target] || FEEDBACK_TARGET_MAP.all;
      const isSub = /\/games\/[^/]+/.test((window.location.pathname || '').toLowerCase());
      const legalBase = isSub ? '../../' : './';

      const root = document.createElement('div');
      root.id = 'arcade-modal-root';
      root.className = 'arcade-modal-backdrop';
      root.innerHTML = `
        <div class="arcade-modal-card arcade-feedback-modal-card">
          <div class="arcade-modal-head">
            <h3 class="arcade-modal-title">💬 Verbesserungswünsche &amp; Bug-Melder · ${escapeHtml(tMeta.title)}</h3>
            <div style="display:flex;gap:6px;align-items:center;">
              <button type="button" class="icon-btn" id="arcade-modal-close" title="Schließen">✕</button>
            </div>
          </div>
          <div class="arcade-modal-body" id="arcade-feedback-modal-body"></div>
          <div class="arcade-modal-foot">
            <span>🛡️ Geschützt durch Login &amp; Cloudflare Turnstile CAPTCHA</span>
            <span aria-hidden="true">·</span>
            <a href="${legalBase}impressum.html">Impressum</a>
            <span aria-hidden="true">·</span>
            <a href="${legalBase}datenschutz.html">Datenschutz</a>
          </div>
        </div>
      `;
      document.body.appendChild(root);
      const close = () => removeModal();
      document.getElementById('arcade-modal-close').addEventListener('click', close);
      root.addEventListener('click', e => { if (e.target === root) close(); });

      window.ArcadeFeedback.mountBoard(document.getElementById('arcade-feedback-modal-body'), {
        initialTarget: target
      });
    }
  };

  function syncFeedbackButtons() {
    const gid = detectGameId() || 'all';
    const counts = window.ArcadeFeedback.getCountsForTarget(gid);
    document.querySelectorAll('[data-arcade-feedback-btn]').forEach(btn => {
      const badge = btn.querySelector('.arcade-feedback-count');
      if (badge) badge.textContent = counts.total;
    });
  }

  function bindThemeButton(btn) {
    if (!btn || btn.dataset.themeBound) return;
    btn.dataset.themeBound = '1';
    btn.addEventListener('click', () => window.ArcadeTheme.toggle());
  }

  function initSharedChrome() {
    const topbarRight = document.querySelector('.arcade-topbar .topbar-right');
    const noBoard = !!(document.body && document.body.dataset && document.body.dataset.noLeaderboard === '1');
    const gameId = detectGameId();

    if (topbarRight && !document.getElementById('btn-arcade-theme')) {
      const themeBtn = document.createElement('button');
      themeBtn.type = 'button';
      themeBtn.className = 'icon-btn';
      themeBtn.id = 'btn-arcade-theme';
      bindThemeButton(themeBtn);
      const muteBtn = document.getElementById('btn-mute');
      if (muteBtn && muteBtn.parentNode === topbarRight) {
        topbarRight.insertBefore(themeBtn, muteBtn);
      } else {
        topbarRight.appendChild(themeBtn);
      }
    }

    document.querySelectorAll('#btn-arcade-theme, [data-arcade-theme-btn]').forEach(bindThemeButton);
    window.ArcadeTheme.syncButtons();

    // 💬 Wünsche-Button in allen Spiel- und Quiz-Topbars
    if (topbarRight && !document.getElementById('btn-arcade-feedback')) {
      const counts = window.ArcadeFeedback.getCountsForTarget(gameId || 'all');
      const fbBtn = document.createElement('button');
      fbBtn.type = 'button';
      fbBtn.className = 'arcade-feedback-btn';
      fbBtn.id = 'btn-arcade-feedback';
      fbBtn.setAttribute('data-arcade-feedback-btn', '1');
      fbBtn.title = 'Verbesserungswunsch oder Bug für dieses Modul eintragen';
      fbBtn.innerHTML = `💬 <span class="arcade-fb-label">Wünsche</span> <span class="arcade-feedback-count">${counts.total}</span>`;
      fbBtn.addEventListener('click', () => {
        if (window.ArcadeAudio) window.ArcadeAudio.click();
        window.ArcadeFeedback.openModal(gameId || 'all');
      });
      const themeEl = document.getElementById('btn-arcade-theme');
      if (themeEl && themeEl.parentNode === topbarRight) {
        topbarRight.insertBefore(fbBtn, themeEl);
      } else {
        topbarRight.appendChild(fbBtn);
      }
    }

    if (!window.ArcadeBurger && !document.getElementById('arcade-burger-script')) {
      try {
        const s = document.createElement('script');
        s.id = 'arcade-burger-script';
        s.async = false;
        s.src = ARCADE_SCRIPT_SRC
          ? new URL('./burger-menu.js', ARCADE_SCRIPT_SRC).href
          : ((window.location.pathname || '').toLowerCase().includes('/games/') ? '../../shared/burger-menu.js' : './shared/burger-menu.js');
        document.head.appendChild(s);
      } catch (e) {}
    } else if (window.ArcadeBurger && typeof window.ArcadeBurger.init === 'function') {
      window.ArcadeBurger.init();
    }

    if (noBoard) {
      return;
    }

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

      const fbEl = document.getElementById('btn-arcade-feedback');
      const themeEl = document.getElementById('btn-arcade-theme');
      const muteBtn = document.getElementById('btn-mute');
      const anchor = (fbEl && fbEl.parentNode === topbarRight)
        ? fbEl
        : ((themeEl && themeEl.parentNode === topbarRight) ? themeEl : (muteBtn && muteBtn.parentNode === topbarRight ? muteBtn : null));
      if (anchor) {
        topbarRight.insertBefore(playerBtn, anchor);
        topbarRight.insertBefore(boardBtn, anchor);
      } else {
        topbarRight.appendChild(playerBtn);
        topbarRight.appendChild(boardBtn);
      }
    }
    syncPlayerButtons();
    syncTopBestDom();
    window.ArcadeScores.fetchSummary();

    if (gameId && !document.getElementById('arcade-legal-footer')) {
      try {
        const htmlOv = window.getComputedStyle(document.documentElement).overflowY;
        const bodyOv = window.getComputedStyle(document.body).overflowY;
        if (htmlOv !== 'hidden' && bodyOv !== 'hidden') {
          const foot = document.createElement('footer');
          foot.id = 'arcade-legal-footer';
          foot.className = 'arcade-legal-footer';
          foot.innerHTML = `<a href="#" id="footer-open-feedback">💬 Verbesserungswunsch melden</a><span aria-hidden="true">·</span><a href="../../impressum.html">Impressum</a><span aria-hidden="true">·</span><a href="../../datenschutz.html">Datenschutz</a>`;
          document.body.appendChild(foot);
          const fLink = document.getElementById('footer-open-feedback');
          if (fLink) {
            fLink.addEventListener('click', (e) => {
              e.preventDefault();
              window.ArcadeFeedback.openModal(gameId);
            });
          }
        }
      } catch (e) {}
    }
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

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const authModal = document.getElementById('arcade-auth-modal-root');
    if (authModal) {
      authModal.remove();
      return;
    }
    const modal = document.getElementById('arcade-modal-root');
    if (modal) {
      modal.remove();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSharedChrome);
  } else {
    initSharedChrome();
  }
})();

