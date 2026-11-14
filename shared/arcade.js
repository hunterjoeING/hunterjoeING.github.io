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

  window.ArcadeScores = {
    getAll: () => {
      try {
        return JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      } catch (e) {
        return {};
      }
    },
    getBest: (gameId) => {
      const all = window.ArcadeScores.getAll();
      return all[gameId] || null;
    },
    record: (gameId, score, label, lowerIsBetter = false) => {
      try {
        const all = window.ArcadeScores.getAll();
        const prev = all[gameId];
        const prevPlays = prev ? (prev.plays || 0) : 0;
        const isBetter = !prev || prev.best === undefined
          ? true
          : (lowerIsBetter ? score < prev.best : score > prev.best);
        all[gameId] = {
          best: isBetter ? score : prev.best,
          label: isBetter ? label : prev.label,
          plays: prevPlays + 1,
          updated: new Date().toISOString().slice(0, 10)
        };
        localStorage.setItem(STORE_KEY, JSON.stringify(all));
        return isBetter;
      } catch (e) {
        return false;
      }
    },
    getMinesweeperBest: () => {
      try {
        const raw = JSON.parse(localStorage.getItem('ms3d_highscores_v1') || '[]');
        if (!Array.isArray(raw) || raw.length === 0) return null;
        return raw[0];
      } catch (e) {
        return null;
      }
    }
  };
})();
