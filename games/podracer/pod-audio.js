// Procedural Web Audio Synthesizer for Canyon Podracer 3D
// Generates continuous twin-turbine roar, boost ignition, plasma pickups, lap fanfare & crashes.

export class PodAudio {
  constructor() {
    this.ctx = null;
    this.noiseBuffer = null;
    this.engineStarted = false;
    this.masterGain = null;
    this.oscA = null;
    this.oscB = null;
    this.subOsc = null;
    this.turbineFilter = null;
    this.turbineGain = null;
    this.airSrc = null;
    this.airFilter = null;
    this.airGain = null;
    this.lastBoostState = false;
  }

  isMuted() {
    return !!(window.ArcadeAudio && window.ArcadeAudio.isMuted());
  }

  _ensureCtx() {
    if (this.isMuted()) return null;
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.65;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  _getNoiseBuffer(c) {
    if (this.noiseBuffer && this.noiseBuffer.sampleRate === c.sampleRate) {
      return this.noiseBuffer;
    }
    const len = Math.floor(c.sampleRate * 1.0);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this.noiseBuffer = buf;
    return buf;
  }

  unlock() {
    this._ensureCtx();
  }

  startEngine() {
    const c = this._ensureCtx();
    if (!c || this.engineStarted) return;

    this.turbineFilter = c.createBiquadFilter();
    this.turbineFilter.type = 'lowpass';
    this.turbineFilter.frequency.value = 260;
    this.turbineFilter.Q.value = 2.6;

    this.turbineGain = c.createGain();
    this.turbineGain.gain.value = 0.0001;

    this.oscA = c.createOscillator();
    this.oscA.type = 'sawtooth';
    this.oscA.frequency.value = 62;

    this.oscB = c.createOscillator();
    this.oscB.type = 'sawtooth';
    this.oscB.frequency.value = 64.5;

    this.subOsc = c.createOscillator();
    this.subOsc.type = 'triangle';
    this.subOsc.frequency.value = 31;

    const subGain = c.createGain();
    subGain.gain.value = 0.45;

    this.oscA.connect(this.turbineFilter);
    this.oscB.connect(this.turbineFilter);
    this.subOsc.connect(subGain);
    subGain.connect(this.turbineFilter);

    this.turbineFilter.connect(this.turbineGain);
    this.turbineGain.connect(this.masterGain);

    // Turbine air intake rush
    this.airSrc = c.createBufferSource();
    this.airSrc.buffer = this._getNoiseBuffer(c);
    this.airSrc.loop = true;

    this.airFilter = c.createBiquadFilter();
    this.airFilter.type = 'bandpass';
    this.airFilter.frequency.value = 520;
    this.airFilter.Q.value = 1.4;

    this.airGain = c.createGain();
    this.airGain.gain.value = 0.0001;

    this.airSrc.connect(this.airFilter);
    this.airFilter.connect(this.airGain);
    this.airGain.connect(this.masterGain);

    const t0 = c.currentTime;
    this.oscA.start(t0);
    this.oscB.start(t0);
    this.subOsc.start(t0);
    this.airSrc.start(t0);
    this.engineStarted = true;
  }

  updateEngine(speedRatio, boostLevel, steerAbs, active) {
    if (this.isMuted() || !active) {
      if (this.engineStarted && this.ctx) {
        const t = this.ctx.currentTime;
        this.turbineGain.gain.setTargetAtTime(0.0001, t, 0.08);
        this.airGain.gain.setTargetAtTime(0.0001, t, 0.08);
      }
      this.lastBoostState = false;
      return;
    }

    if (!this.engineStarted) {
      this.startEngine();
    }
    const c = this.ctx;
    if (!c || !this.engineStarted) return;

    const t = c.currentTime;
    const clampedSpeed = Math.max(0, Math.min(1.6, speedRatio));
    const baseFreq = 54 + clampedSpeed * 64 + boostLevel * 28 + steerAbs * 5;

    this.oscA.frequency.setTargetAtTime(baseFreq, t, 0.05);
    this.oscB.frequency.setTargetAtTime(baseFreq * 1.032, t, 0.05);
    this.subOsc.frequency.setTargetAtTime(baseFreq * 0.5, t, 0.05);

    this.turbineFilter.frequency.setTargetAtTime(220 + clampedSpeed * 420 + boostLevel * 580, t, 0.06);
    this.turbineGain.gain.setTargetAtTime(0.095 + boostLevel * 0.055, t, 0.06);

    this.airFilter.frequency.setTargetAtTime(420 + clampedSpeed * 900 + boostLevel * 950, t, 0.06);
    this.airGain.gain.setTargetAtTime(0.035 + clampedSpeed * 0.04 + boostLevel * 0.065, t, 0.06);

    if (boostLevel > 0.5 && !this.lastBoostState) {
      this.playBoostIgnite();
    }
    this.lastBoostState = boostLevel > 0.5;
  }

  stopEngine() {
    if (!this.engineStarted || !this.ctx) return;
    const t = this.ctx.currentTime;
    this.turbineGain.gain.setTargetAtTime(0.0001, t, 0.07);
    this.airGain.gain.setTargetAtTime(0.0001, t, 0.07);
    this.lastBoostState = false;
  }

  playBoostIgnite() {
    const c = this._ensureCtx();
    if (!c) return;
    const t0 = c.currentTime;

    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, t0);
    osc.frequency.exponentialRampToValueAtTime(360, t0 + 0.18);
    osc.frequency.exponentialRampToValueAtTime(140, t0 + 0.36);

    g.gain.setValueAtTime(0.11, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.38);

    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(t0);
    osc.stop(t0 + 0.4);
  }

  playBoostPad() {
    const c = this._ensureCtx();
    if (!c) return;
    const t0 = c.currentTime;
    [330, 495, 660].forEach((freq, i) => {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t0 + i * 0.035);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.45, t0 + i * 0.035 + 0.22);
      g.gain.setValueAtTime(0.11, t0 + i * 0.035);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + i * 0.035 + 0.25);
      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(t0 + i * 0.035);
      osc.stop(t0 + i * 0.035 + 0.27);
    });
  }

  playPickup(combo = 1) {
    const c = this._ensureCtx();
    if (!c) return;
    const t0 = c.currentTime;
    const base = 520 * Math.pow(1.06, Math.min(8, combo - 1));
    [base, base * 1.25].forEach((freq, idx) => {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t0 + idx * 0.045);
      g.gain.setValueAtTime(0.13, t0 + idx * 0.045);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + idx * 0.045 + 0.14);
      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(t0 + idx * 0.045);
      osc.stop(t0 + idx * 0.045 + 0.16);
    });
  }

  playCrash() {
    const c = this._ensureCtx();
    if (!c) return;
    const t0 = c.currentTime;

    const src = c.createBufferSource();
    src.buffer = this._getNoiseBuffer(c);
    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(950, t0);
    filter.frequency.exponentialRampToValueAtTime(140, t0 + 0.34);

    const ng = c.createGain();
    ng.gain.setValueAtTime(0.28, t0);
    ng.gain.exponentialRampToValueAtTime(0.001, t0 + 0.36);

    src.connect(filter);
    filter.connect(ng);
    ng.connect(this.masterGain);
    src.start(t0);
    src.stop(t0 + 0.38);

    const osc = c.createOscillator();
    const og = c.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(125, t0);
    osc.frequency.exponentialRampToValueAtTime(34, t0 + 0.28);
    og.gain.setValueAtTime(0.22, t0);
    og.gain.exponentialRampToValueAtTime(0.001, t0 + 0.3);
    osc.connect(og);
    og.connect(this.masterGain);
    osc.start(t0);
    osc.stop(t0 + 0.32);
  }

  playLap() {
    const c = this._ensureCtx();
    if (!c) return;
    const t0 = c.currentTime;
    [440, 554.37, 659.25, 880].forEach((freq, i) => {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t0 + i * 0.075);
      g.gain.setValueAtTime(0.14, t0 + i * 0.075);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + i * 0.075 + 0.26);
      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(t0 + i * 0.075);
      osc.stop(t0 + i * 0.075 + 0.28);
    });
  }
}
