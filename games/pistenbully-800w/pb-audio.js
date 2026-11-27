// Procedural Web Audio Engine for Kässbohrer PistenBully 800 W (Muted by Default)
// Synthesizes: Deep 6-cyl MAN D3876 Diesel, 450-bar Hydrostatic Whine, Tiller Snow Rush & Reverse Beeper

export class PistenBullyAudio {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.nodes = null;
    this.beepTimer = 0;
  }

  toggle() {
    if (!this.enabled) {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
      this.enabled = true;
    } else {
      this.enabled = false;
      if (this.nodes && this.ctx) {
        this.nodes.master.gain.setTargetAtTime(0.0, this.ctx.currentTime, 0.08);
      }
    }
    return this.enabled;
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const master = ctx.createGain();
    master.gain.value = 0.0;
    master.connect(ctx.destination);

    // 1. Deep 6-Cylinder Inline MAN D3876 Diesel (firing freq = 3 * RPM / 60)
    const dieselOsc1 = ctx.createOscillator();
    dieselOsc1.type = 'sawtooth';
    dieselOsc1.frequency.value = 52;
    const dieselOsc2 = ctx.createOscillator();
    dieselOsc2.type = 'triangle';
    dieselOsc2.frequency.value = 26;
    const dieselFilter = ctx.createBiquadFilter();
    dieselFilter.type = 'lowpass';
    dieselFilter.frequency.value = 175;
    dieselFilter.Q.value = 2.4;
    const dieselGain = ctx.createGain();
    dieselGain.gain.value = 0.24;

    dieselOsc1.connect(dieselFilter);
    dieselOsc2.connect(dieselFilter);
    dieselFilter.connect(dieselGain);
    dieselGain.connect(master);
    dieselOsc1.start();
    dieselOsc2.start();

    // 2. Characteristic High-Pressure Hydrostatic Hydraulic Whine (450 bar axial-piston pumps)
    const hydroOsc = ctx.createOscillator();
    hydroOsc.type = 'sine';
    hydroOsc.frequency.value = 340;
    const hydroGain = ctx.createGain();
    hydroGain.gain.value = 0.02;
    hydroOsc.connect(hydroGain);
    hydroGain.connect(master);
    hydroOsc.start();

    // 3. AlpinFlexFräse Snow-Milling Rush (Bandpass White Noise)
    const bufLen = ctx.sampleRate * 2;
    const noiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const ch = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) ch[i] = Math.random() * 2 - 1;
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuf;
    noiseSrc.loop = true;

    const tillerFilter = ctx.createBiquadFilter();
    tillerFilter.type = 'bandpass';
    tillerFilter.frequency.value = 620;
    tillerFilter.Q.value = 0.9;
    const tillerGain = ctx.createGain();
    tillerGain.gain.value = 0.0;

    noiseSrc.connect(tillerFilter);
    tillerFilter.connect(tillerGain);
    tillerGain.connect(master);
    noiseSrc.start();

    // 4. Reverse Warning Beeper Oscillator
    const beepOsc = ctx.createOscillator();
    beepOsc.type = 'square';
    beepOsc.frequency.value = 1280;
    const beepGain = ctx.createGain();
    beepGain.gain.value = 0.0;
    beepOsc.connect(beepGain);
    beepGain.connect(master);
    beepOsc.start();

    this.ctx = ctx;
    this.nodes = {
      master,
      dieselOsc1,
      dieselOsc2,
      dieselFilter,
      dieselGain,
      hydroOsc,
      hydroGain,
      tillerFilter,
      tillerGain,
      beepGain
    };
  }

  update(telemetry, dt, paused) {
    if (!this.enabled || !this.ctx || !this.nodes) return;
    const now = this.ctx.currentTime;
    const n = this.nodes;

    if (paused) {
      n.master.gain.setTargetAtTime(0.0, now, 0.08);
      return;
    }
    n.master.gain.setTargetAtTime(0.32, now, 0.08);

    // 6-cyl 4-stroke firing frequency = 3 * (RPM / 60)
    const fireHz = Math.max(32, (telemetry.engineRpm / 60) * 3.0);
    const loadNorm = telemetry.engineLoadPct / 100;
    n.dieselOsc1.frequency.setTargetAtTime(fireHz, now, 0.08);
    n.dieselOsc2.frequency.setTargetAtTime(fireHz * 0.5, now, 0.08);
    n.dieselFilter.frequency.setTargetAtTime(140 + loadNorm * 190, now, 0.1);
    n.dieselGain.gain.setTargetAtTime(0.18 + loadNorm * 0.14, now, 0.1);

    // Hydrostatic pump whine tracks working pressure (bar)
    const pNorm = telemetry.pressuresBar.drive / 450;
    n.hydroOsc.frequency.setTargetAtTime(280 + pNorm * 420, now, 0.08);
    n.hydroGain.gain.setTargetAtTime(0.012 + pNorm * 0.042, now, 0.1);

    // Tiller snow milling rush
    const tillerActive = telemetry.tillerRpm > 100;
    const tillerLevel = tillerActive ? (0.04 + (telemetry.pressuresBar.tiller / 400) * 0.10) : 0.0;
    n.tillerFilter.frequency.setTargetAtTime(480 + (telemetry.tillerRpm / 1300) * 440, now, 0.1);
    n.tillerGain.gain.setTargetAtTime(tillerLevel, now, 0.1);

    // Reverse warning beeper when reversing (< -0.5 km/h)
    if (telemetry.targetSpeedKmh < -0.5) {
      this.beepTimer = (this.beepTimer + dt) % 0.85;
      const beepOn = this.beepTimer < 0.38;
      n.beepGain.gain.setTargetAtTime(beepOn ? 0.045 : 0.0, now, 0.015);
    } else {
      this.beepTimer = 0;
      n.beepGain.gain.setTargetAtTime(0.0, now, 0.02);
    }
  }
}
