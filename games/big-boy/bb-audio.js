// Procedural Web Audio Synthesizer for UP Big Boy #4014
// - Muted by default; activates cleanly on user click
// - Dual-engine synchronized steam chuffs (front & rear slightly detuned for realistic phasing!)
// - Continuous boiler hiss / draft roar scaled to smokebox vacuum
// - Iconic deep UP Big Boy 5-Chime Steam Whistle & Brass Bell

export class BigBoyAudio {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.masterGain = null;
    this.noiseBuffer = null;
    this.hissGain = null;
    this.hissFilter = null;
  }

  _initContext() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.38;
    this.masterGain.connect(this.ctx.destination);

    // Pre-generate 2 seconds of white noise for steam chuffs & boiler draft hiss
    const sr = this.ctx.sampleRate;
    const len = sr * 2;
    this.noiseBuffer = this.ctx.createBuffer(1, len, sr);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    // Continuous subtle boiler hiss & firebox draft roar
    const hissSrc = this.ctx.createBufferSource();
    hissSrc.buffer = this.noiseBuffer;
    hissSrc.loop = true;

    this.hissFilter = this.ctx.createBiquadFilter();
    this.hissFilter.type = 'bandpass';
    this.hissFilter.frequency.value = 620;
    this.hissFilter.Q.value = 0.85;

    this.hissGain = this.ctx.createGain();
    this.hissGain.gain.value = 0.0;

    hissSrc.connect(this.hissFilter);
    this.hissFilter.connect(this.hissGain);
    this.hissGain.connect(this.masterGain);
    hissSrc.start();
  }

  setEnabled(on) {
    this.enabled = Boolean(on);
    if (this.enabled) {
      this._initContext();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } else if (this.hissGain && this.ctx) {
      this.hissGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.06);
    }
  }

  toggle() {
    this.setEnabled(!this.enabled);
    return this.enabled;
  }

  updateAmbient(telemetry, paused) {
    if (!this.enabled || !this.ctx || !this.hissGain) return;
    const now = this.ctx.currentTime;
    const targetGain = paused ? 0.02 : 0.03 + Math.min(0.14, telemetry.draftVacuumKPa * 0.025);
    this.hissGain.gain.setTargetAtTime(targetGain, now, 0.12);
    this.hissFilter.frequency.setTargetAtTime(420 + telemetry.draftVacuumKPa * 180, now, 0.15);
  }

  /**
   * Trigger a deep, punchy steam exhaust chuff for either the 'front' or 'rear' engine!
   */
  triggerChuff(which, intensity, speedKmh) {
    if (!this.enabled || !this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const dur = Math.max(0.065, Math.min(0.24, 0.22 - speedKmh * 0.0016));

    // Filtered noise burst (blastpipe steam jet)
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    // Rear engine slightly deeper resonance, front engine subtly crisper -> audible phasing!
    const baseFreq = which === 'rear' ? 195 : 235;
    filter.frequency.setValueAtTime(baseFreq + intensity * 190, now);
    filter.frequency.exponentialRampToValueAtTime(baseFreq * 0.65, now + dur);
    filter.Q.value = 1.15;

    const env = this.ctx.createGain();
    const peak = (0.18 + intensity * 0.36) * (which === 'rear' ? 1.0 : 0.92);
    env.gain.setValueAtTime(0.001, now);
    env.gain.linearRampToValueAtTime(peak, now + 0.014);
    env.gain.exponentialRampToValueAtTime(0.001, now + dur);

    src.connect(filter);
    filter.connect(env);
    env.connect(this.masterGain);
    src.start(now, Math.random() * 1.2, dur + 0.03);

    // Subtle low-end chest thump (stack resonance)
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(which === 'rear' ? 66 : 74, now);
    osc.frequency.exponentialRampToValueAtTime(36, now + dur * 0.85);
    const thumpGain = this.ctx.createGain();
    thumpGain.gain.setValueAtTime(0.001, now);
    thumpGain.gain.linearRampToValueAtTime(peak * 0.35, now + 0.01);
    thumpGain.gain.exponentialRampToValueAtTime(0.001, now + dur * 0.85);
    osc.connect(thumpGain);
    thumpGain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + dur);
  }

  /**
   * Iconic Deep Union Pacific Big Boy #4014 5-Chime Steam Whistle (rich harmonic minor/sixth chord + breathy steam)
   */
  blowWhistle(durationSec = 1.65) {
    if (!this.enabled) this.setEnabled(true);
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // Deep Hancock / UP 5-chime chord frequencies (Hz)
    const freqs = [246.9, 293.7, 369.9, 440.0, 587.3];
    const chordGain = this.ctx.createGain();
    chordGain.gain.setValueAtTime(0.001, now);
    chordGain.gain.linearRampToValueAtTime(0.24, now + 0.14);
    chordGain.gain.setValueAtTime(0.22, now + durationSec - 0.32);
    chordGain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1450;
    chordGain.connect(lp);
    lp.connect(this.masterGain);

    for (const f of freqs) {
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      // Authentic slight pitch bend upward as whistle steam valve opens
      osc.frequency.setValueAtTime(f * 0.96, now);
      osc.frequency.exponentialRampToValueAtTime(f, now + 0.18);
      osc.frequency.setValueAtTime(f, now + durationSec - 0.25);
      osc.frequency.exponentialRampToValueAtTime(f * 0.97, now + durationSec);

      const g = this.ctx.createGain();
      g.gain.value = 0.22;
      osc.connect(g);
      g.connect(chordGain);
      osc.start(now);
      osc.stop(now + durationSec + 0.05);
    }

    // Breathy steam hiss layer on the whistle
    if (this.noiseBuffer) {
      const n = this.ctx.createBufferSource();
      n.buffer = this.noiseBuffer;
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 1100;
      bp.Q.value = 2.0;
      const ng = this.ctx.createGain();
      ng.gain.setValueAtTime(0.001, now);
      ng.gain.linearRampToValueAtTime(0.08, now + 0.12);
      ng.gain.exponentialRampToValueAtTime(0.001, now + durationSec);
      n.connect(bp);
      bp.connect(ng);
      ng.connect(this.masterGain);
      n.start(now, 0.2, durationSec + 0.05);
    }
  }
}
