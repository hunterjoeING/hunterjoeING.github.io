// Procedural Web Audio SFX for Zombie Horde: Gate Runner 3D
// Respects global ArcadeAudio mute state and throttles rapid-fire audio cleanly.

let ctx = null;
let noiseBuf = null;
const lastPlayed = Object.create(null);

function isMuted() {
  try {
    if (window.ArcadeAudio && typeof window.ArcadeAudio.isMuted === 'function') {
      return window.ArcadeAudio.isMuted();
    }
    return localStorage.getItem('arcade_muted') === '1';
  } catch (_) {
    return false;
  }
}

function getCtx() {
  if (isMuted()) return null;
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

function canPlay(key, minGapMs) {
  const now = performance.now();
  const prev = lastPlayed[key] || 0;
  if (now - prev < minGapMs) return false;
  lastPlayed[key] = now;
  return true;
}

function getNoiseBuffer(c) {
  if (noiseBuf && noiseBuf.sampleRate === c.sampleRate) return noiseBuf;
  const len = Math.floor(c.sampleRate * 0.4);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  noiseBuf = buf;
  return buf;
}

function playTone(freqStart, freqEnd, dur, type = 'sine', vol = 0.08, delay = 0) {
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(Math.max(24, freqStart), t0);
  if (freqEnd !== null && freqEnd !== freqStart) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(24, freqEnd), t0 + dur);
  }
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.linearRampToValueAtTime(vol, t0 + Math.min(0.01, dur * 0.25));
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.015);
}

function playNoise(dur, filterType, freqStart, freqEnd, vol = 0.07) {
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime;
  const src = c.createBufferSource();
  src.buffer = getNoiseBuffer(c);
  src.loop = true;

  const filter = c.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.setValueAtTime(freqStart, t0);
  if (freqEnd !== null && freqEnd !== freqStart) {
    filter.frequency.exponentialRampToValueAtTime(Math.max(40, freqEnd), t0 + dur);
  }

  const gain = c.createGain();
  gain.gain.setValueAtTime(vol, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  src.connect(filter);
  filter.connect(gain);
  gain.connect(c.destination);
  src.start(t0);
  src.stop(t0 + dur + 0.015);
}

export const ZBAudio = {
  shot(spreadLevel = 1, dmgMult = 1) {
    if (!canPlay('shot', 85)) return;
    const baseFreq = dmgMult >= 2 ? 720 : (spreadLevel >= 2 ? 840 : 940);
    const endFreq = dmgMult >= 2 ? 220 : 300;
    playTone(baseFreq, endFreq, 0.052, spreadLevel >= 2 ? 'sawtooth' : 'triangle', 0.036);
    if (spreadLevel >= 3) {
      playNoise(0.035, 'bandpass', 2400, 1200, 0.02);
    }
  },
  gateTick(positive = true) {
    if (!canPlay('gate', 70)) return;
    playTone(positive ? 660 : 480, positive ? 880 : 620, 0.06, 'sine', 0.045);
  },
  zombieKill(kind = 'normal') {
    if (!canPlay('kill', 55)) return;
    if (kind === 'brute') {
      playTone(180, 72, 0.11, 'triangle', 0.06);
      playNoise(0.08, 'lowpass', 720, 180, 0.045);
    } else {
      playTone(kind === 'fast' ? 520 : 360, 140, 0.065, 'triangle', 0.038);
    }
  },
  barrelExplosion() {
    if (!canPlay('boom', 110)) return;
    playNoise(0.28, 'lowpass', 580, 75, 0.14);
    playTone(130, 38, 0.24, 'sawtooth', 0.10);
  },
  shieldBlock() {
    if (!canPlay('shield', 120)) return;
    playTone(880, 1480, 0.08, 'sine', 0.06);
    playTone(1320, 620, 0.12, 'triangle', 0.05, 0.04);
  },
  bossSpawn() {
    if (!canPlay('boss_spawn', 400)) return;
    playTone(165, 118, 0.28, 'sawtooth', 0.075);
    playTone(247, 175, 0.30, 'triangle', 0.065, 0.12);
  },
  bossDefeat() {
    if (!canPlay('boss_kill', 200)) return;
    playNoise(0.32, 'lowpass', 540, 70, 0.13);
    playTone(220, 55, 0.30, 'sawtooth', 0.08);
    playTone(523.25, 783.99, 0.22, 'triangle', 0.065, 0.14);
  },
  waveUp() {
    if (!canPlay('wave', 400)) return;
    playTone(440, 587.33, 0.11, 'triangle', 0.055);
    playTone(587.33, 880, 0.15, 'sine', 0.05, 0.08);
  }
};
