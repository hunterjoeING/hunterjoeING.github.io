// Procedural Web Audio Sound Effects for Bastion 3D Tower Defense
// Respects global ArcadeAudio mute state and throttles rapid-fire sounds cleanly.

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
  const len = Math.floor(c.sampleRate * 0.35);
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
  gain.gain.linearRampToValueAtTime(vol, t0 + Math.min(0.012, dur * 0.25));
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

export const TDAudio = {
  pulseShot() {
    if (!canPlay('pulse', 65)) return;
    playTone(680, 290, 0.055, 'triangle', 0.042);
  },
  frostPulse() {
    if (!canPlay('frost', 140)) return;
    playTone(1180, 1620, 0.09, 'sine', 0.036);
    playNoise(0.08, 'highpass', 2600, 4200, 0.025);
  },
  mortarLaunch() {
    if (!canPlay('mortar_fire', 120)) return;
    playTone(170, 68, 0.11, 'sine', 0.075);
  },
  mortarImpact() {
    if (!canPlay('mortar_hit', 90)) return;
    playNoise(0.18, 'lowpass', 480, 90, 0.09);
    playTone(110, 42, 0.16, 'triangle', 0.065);
  },
  railShot() {
    if (!canPlay('rail', 110)) return;
    playTone(1240, 210, 0.11, 'sawtooth', 0.045);
    playTone(540, 140, 0.09, 'triangle', 0.04, 0.01);
  },
  shieldBreak() {
    if (!canPlay('shield', 120)) return;
    playTone(960, 1520, 0.07, 'sine', 0.05);
    playTone(1520, 680, 0.11, 'triangle', 0.04, 0.04);
  },
  enemySplit() {
    if (!canPlay('split', 140)) return;
    playTone(390, 740, 0.08, 'sine', 0.045);
  },
  bossDefeat() {
    if (!canPlay('boss_kill', 200)) return;
    playNoise(0.28, 'lowpass', 520, 70, 0.11);
    playTone(220, 55, 0.28, 'sawtooth', 0.07);
    playTone(440, 660, 0.18, 'triangle', 0.06, 0.12);
  },
  build() {
    playTone(320, 520, 0.07, 'triangle', 0.075);
    playTone(640, 780, 0.06, 'sine', 0.05, 0.035);
  },
  upgrade() {
    playTone(523.25, 523.25, 0.08, 'triangle', 0.075);
    playTone(659.25, 659.25, 0.09, 'triangle', 0.075, 0.06);
    playTone(783.99, 1046.5, 0.14, 'sine', 0.07, 0.12);
  },
  sell() {
    playTone(660, 440, 0.08, 'sine', 0.065);
  },
  waveStart(isBoss) {
    if (isBoss) {
      playTone(196, 146.8, 0.22, 'sawtooth', 0.07);
      playTone(293.66, 220, 0.24, 'triangle', 0.065, 0.12);
    } else {
      playTone(392, 523.25, 0.12, 'triangle', 0.065);
    }
  },
  overdrive() {
    playTone(330, 880, 0.22, 'triangle', 0.08);
    playTone(495, 1320, 0.24, 'sine', 0.065, 0.05);
  }
};
