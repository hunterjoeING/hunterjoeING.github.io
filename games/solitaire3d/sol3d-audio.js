// Procedural Web Audio API synthesizer for warm, gentle 3D Solitaire tabletop sounds.
// Respects shared ArcadeAudio mute state and only unlocks after user interaction.

const PENTATONIC_HZ = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51];

export class SolitaireAudio {
  constructor() {
    this.ctx = null;
    this.noiseBuf = null;
    this.unlocked = false;
  }

  isMuted() {
    if (window.ArcadeAudio && typeof window.ArcadeAudio.isMuted === 'function') {
      return window.ArcadeAudio.isMuted();
    }
    try {
      return localStorage.getItem('arcade_muted') === '1';
    } catch (_) {
      return false;
    }
  }

  unlock() {
    if (this.isMuted()) return null;
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.unlocked = true;
    return this.ctx;
  }

  _ensureCtx() {
    if (this.isMuted()) return null;
    if (!this.unlocked) return null;
    if (!this.ctx) return this.unlock();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  _getNoiseBuffer(c) {
    if (this.noiseBuf && this.noiseBuf.sampleRate === c.sampleRate) {
      return this.noiseBuf;
    }
    const len = Math.floor(c.sampleRate * 0.35);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this.noiseBuf = buf;
    return buf;
  }

  _noise(dur, freqStart, freqEnd, filterType, vol, q = 1.2) {
    const c = this._ensureCtx();
    if (!c) return;
    const t0 = c.currentTime;
    const src = c.createBufferSource();
    src.buffer = this._getNoiseBuffer(c);
    src.loop = true;

    const filter = c.createBiquadFilter();
    filter.type = filterType;
    filter.Q.value = q;
    filter.frequency.setValueAtTime(freqStart, t0);
    if (freqEnd !== freqStart) {
      filter.frequency.exponentialRampToValueAtTime(Math.max(40, freqEnd), t0 + dur);
    }

    const gain = c.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(vol, t0 + Math.min(0.012, dur * 0.25));
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }

  _tone(freq, dur, type = 'sine', vol = 0.08, delay = 0, freqEnd = null) {
    const c = this._ensureCtx();
    if (!c) return;
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const gain = c.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (freqEnd !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(25, freqEnd), t0 + dur);
    }

    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(vol, t0 + 0.009);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  cardSnap() {
    this._noise(0.055, 2100, 950, 'bandpass', 0.055, 1.5);
    this._tone(165, 0.045, 'triangle', 0.032, 0, 95);
  }

  cardPickup() {
    this._noise(0.045, 1400, 2200, 'bandpass', 0.035, 1.0);
  }

  feltSlide() {
    this._noise(0.085, 760, 420, 'lowpass', 0.045, 0.7);
    this._tone(120, 0.06, 'sine', 0.025, 0, 75);
  }

  foundationChime(streak = 0) {
    const idx = Math.max(0, Math.min(PENTATONIC_HZ.length - 1, streak));
    const freq = PENTATONIC_HZ[idx];
    this._tone(freq, 0.34, 'sine', 0.075, 0);
    this._tone(freq * 2, 0.22, 'sine', 0.024, 0);
    this._noise(0.04, 1500, 900, 'lowpass', 0.025, 0.8);
  }

  invalid() {
    this._tone(135, 0.09, 'sine', 0.04, 0, 92);
  }

  hint() {
    this._tone(587.33, 0.16, 'sine', 0.04, 0);
    this._tone(880.0, 0.22, 'sine', 0.035, 0.07);
  }

  victory() {
    const chord = [523.25, 659.25, 783.99, 987.77, 1174.66];
    chord.forEach((freq, i) => {
      this._tone(freq, 0.65, 'sine', 0.07, i * 0.09);
      this._tone(freq * 2, 0.4, 'triangle', 0.018, i * 0.09);
    });
  }
}
