declare global {
  interface Window {
    ArcadeAudio?: {
      isMuted: () => boolean;
      click: () => void;
      pop: () => void;
      win: () => void;
      fail: () => void;
      perkGood: () => void;
      perkBad: () => void;
    };
  }
}

class SoundFXManager {
  private ctx: AudioContext | null = null;

  private isMuted(): boolean {
    try {
      return !!(window.ArcadeAudio && window.ArcadeAudio.isMuted());
    } catch (_) {
      return false;
    }
  }

  private ensure(): AudioContext | null {
    if (this.isMuted()) return null;
    if (!this.ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private beep(freq: number, dur: number, type: OscillatorType, vol: number, freqEnd?: number): void {
    const c = this.ensure();
    if (!c) return;
    const t0 = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (freqEnd !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(30, freqEnd), t0 + dur);
    }
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.01);
  }

  horn(): void {
    this.beep(392, 0.14, 'sawtooth', 0.07);
    this.beep(494, 0.14, 'sawtooth', 0.06);
  }

  plugIn(): void {
    this.beep(320, 0.08, 'triangle', 0.1, 680);
    setTimeout(() => this.beep(880, 0.14, 'sine', 0.11, 1180), 80);
  }

  chargeDone(): void {
    this.beep(523.25, 0.1, 'triangle', 0.1);
    setTimeout(() => this.beep(659.25, 0.1, 'triangle', 0.1), 90);
    setTimeout(() => this.beep(1046.5, 0.18, 'triangle', 0.12), 180);
  }

  bump(): void {
    this.beep(125, 0.16, 'square', 0.11, 45);
  }

  alert(): void {
    this.beep(660, 0.09, 'triangle', 0.09);
    setTimeout(() => this.beep(520, 0.14, 'triangle', 0.09), 110);
  }

  click(): void {
    if (window.ArcadeAudio) window.ArcadeAudio.click();
    else this.beep(560, 0.04, 'triangle', 0.07);
  }

  win(): void {
    if (window.ArcadeAudio) window.ArcadeAudio.win();
    else {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
        setTimeout(() => this.beep(f, 0.18, 'triangle', 0.12), idx * 95);
      });
    }
  }
}

export const SoundFX = new SoundFXManager();
