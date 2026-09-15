/**
 * Pure Web Audio API Sound Generator
 * Zero external audio assets needed — fully synthetic, ultra-lightweight, works offline.
 * Creates an authentic aerospace / telemetry tactile soundscape.
 */

class SoundSystem {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isMuted: boolean = true;
  private oscDrone: OscillatorNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.initCtx();
    if (!this.ctx) return false;

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbient();
      this.playChime();
    } else {
      this.stopAmbient();
    }

    return !this.isMuted;
  }

  public getIsPlaying(): boolean {
    return !this.isMuted;
  }

  public startAmbient() {
    if (!this.ctx || this.isMuted) return;

    try {
      if (this.oscDrone) {
        this.oscDrone.stop();
        this.oscDrone.disconnect();
      }

      // 55Hz (A1 note) sub-bass deep space drone
      this.oscDrone = this.ctx.createOscillator();
      this.oscDrone.type = 'sine';
      this.oscDrone.frequency.setValueAtTime(55, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 3);

      this.oscDrone.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.oscDrone.start();
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  public stopAmbient() {
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        if (this.oscDrone) {
          try {
            this.oscDrone.stop();
            this.oscDrone.disconnect();
            this.oscDrone = null;
          } catch (e) {}
        }
      }, 900);
    }
  }

  public playTick() {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  public playTelemetryPing() {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1600, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch (e) {}
  }

  public playChime() {
    if (!this.ctx || this.isMuted) return;
    try {
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0.03, this.ctx!.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + i * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(this.ctx!.currentTime + i * 0.08);
        osc.stop(this.ctx!.currentTime + i * 0.08 + 0.6);
      });
    } catch (e) {}
  }
}

export const soundFx = new SoundSystem();
