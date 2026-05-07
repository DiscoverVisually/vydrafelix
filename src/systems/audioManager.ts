import Phaser from 'phaser';

export class AudioManager {
  private muted = false;

  constructor(private scene: Phaser.Scene) {}

  setMuted(muted: boolean) {
    this.muted = muted;
  }

  private beep(freq: number, durationMs: number, volume = 0.03) {
    if (this.muted) return;
    const ctx = this.scene.sound.context;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + durationMs / 1000);
  }

  collect() { this.beep(740, 80); }
  hit() { this.beep(190, 120, 0.04); }
  throwPebble() { this.beep(420, 60); }
  click() { this.beep(540, 70); }
  checkpoint() { this.beep(880, 120); }
  gameOver() { this.beep(140, 250, 0.05); }
}
