// Optional Procedural Web-Audio Soundscape for 2-Etagen-Gondelstation (Muted by default)
// Synthesizes:
// - Deep gearless DirectDrive synchronous motor hum (frequency scales smoothly with RPM)
// - Soft rubber tire conveyor rolling ambience
// - Crisp metallic coupling ramp clack when a cabin grip opens/closes
// - Industrial safety alarm chime + hydraulic brake hiss on simulated Clamp Fault / Emergency Stop

export class GondolaAudio {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.masterGain = null;
    this.driveOsc1 = null;
    this.driveOsc2 = null;
    this.driveGain = null;
    this.tireGain = null;
    this.lastAlarmAt = 0;
  }

  toggle() {
    if (this.enabled) {
      this.disable();
    } else {
      this.enable();
    }
    return this.enabled;
  }

  enable() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this._buildGraph();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.enabled = true;
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(0.32, this.ctx.currentTime, 0.08);
    }
    return true;
  }

  disable() {
    this.enabled = false;
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.08);
    }
  }

  _buildGraph() {
    const ctx = this.ctx;
    this.masterGain = ctx.createGain();
    this.masterGain.gain.value = 0.0001;
    this.masterGain.connect(ctx.destination);

    // 1. DirectDrive Deep Synchronous Hum (fundamental + soft 3rd harmonic)
    this.driveGain = ctx.createGain();
    this.driveGain.gain.value = 0.0;
    const driveFilter = ctx.createBiquadFilter();
    driveFilter.type = 'lowpass';
    driveFilter.frequency.value = 260;

    this.driveOsc1 = ctx.createOscillator();
    this.driveOsc1.type = 'sine';
    this.driveOsc1.frequency.value = 54;

    this.driveOsc2 = ctx.createOscillator();
    this.driveOsc2.type = 'triangle';
    this.driveOsc2.frequency.value = 108;

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.value = 0.18;

    this.driveOsc1.connect(driveFilter);
    this.driveOsc2.connect(osc2Gain);
    osc2Gain.connect(driveFilter);
    driveFilter.connect(this.driveGain);
    this.driveGain.connect(this.masterGain);
    this.driveOsc1.start();
    this.driveOsc2.start();

    // 2. Soft Band-Limited Noise for Rubber Tire Conveyors
    const bufLen = ctx.sampleRate * 2;
    const noiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.45;
    }
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuf;
    noiseSrc.loop = true;

    const tireFilter = ctx.createBiquadFilter();
    tireFilter.type = 'bandpass';
    tireFilter.frequency.value = 210;
    tireFilter.Q.value = 1.4;

    this.tireGain = ctx.createGain();
    this.tireGain.gain.value = 0.0;

    noiseSrc.connect(tireFilter);
    tireFilter.connect(this.tireGain);
    this.tireGain.connect(this.masterGain);
    noiseSrc.start();
  }

  // Crisp metallic grip-clamp clack when roller hits/exits coupling cam ramp
  playClampClack(isAttach = true) {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isAttach ? 620 : 480, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.075);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Safety alarm beep + brake clamp thump on simulated Clamp Fault
  playEmergencyAlarm() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    if (now - this.lastAlarmAt < 0.4) return;
    this.lastAlarmAt = now;

    // Two-tone industrial safety warning chime
    for (let k = 0; k < 2; k++) {
      const t0 = now + k * 0.24;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(k === 0 ? 880 : 660, t0);

      const filt = this.ctx.createBiquadFilter();
      filt.type = 'lowpass';
      filt.frequency.value = 1800;

      gain.gain.setValueAtTime(0.24, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.20);

      osc.connect(filt);
      filt.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t0);
      osc.stop(t0 + 0.21);
    }
  }

  update(snap) {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const sf = snap.speedFactor;

    // DirectDrive synchronous hum smoothly tracks speed
    const baseFreq = 38 + sf * 38;
    this.driveOsc1.frequency.setTargetAtTime(baseFreq, now, 0.06);
    this.driveOsc2.frequency.setTargetAtTime(baseFreq * 2.0, now, 0.06);
    this.driveGain.gain.setTargetAtTime(sf > 0.02 ? 0.14 + sf * 0.16 : 0.0001, now, 0.08);
    this.tireGain.gain.setTargetAtTime(sf > 0.02 ? sf * 0.09 : 0.0001, now, 0.08);

    // Handle discrete mechanical events
    for (const ev of snap.events) {
      if (ev.type === 'clamp_clack') {
        this.playClampClack(ev.zone === 'attach');
      } else if (ev.type === 'emergency_stop') {
        this.playEmergencyAlarm();
      }
    }
  }
}
