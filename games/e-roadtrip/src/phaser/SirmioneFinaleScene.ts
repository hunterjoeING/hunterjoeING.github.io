import * as Phaser from 'phaser';
import { type FinaleData, FINALE_HEIGHT, FINALE_WIDTH, mountFinale } from './DestinationFinale';

interface SirmioneFinaleData extends FinaleData {
  relaxed: boolean;
  carColor: number;
}

export class SirmioneFinaleScene extends Phaser.Scene {
  private finale!: SirmioneFinaleData;
  private backdrop!: Phaser.GameObjects.Graphics;
  private actors!: Phaser.GameObjects.Graphics;
  private elapsed = 0;
  private light?: boolean;
  private finished = false;

  constructor() {
    super({ key: 'SirmioneFinaleScene' });
  }

  init(data: SirmioneFinaleData): void {
    this.finale = data;
    this.elapsed = 0;
    this.light = undefined;
    this.finished = false;
  }

  create(): void {
    this.backdrop = this.add.graphics();
    this.actors = this.add.graphics();
    mountFinale(this, 'SIRMIONE · GARDASEE', [this.backdrop, this.actors], () => {
      this.finished = true;
      this.finale.onComplete();
    });
    this.update(0, 0);
  }

  update(_time: number, delta: number): void {
    if (this.finished) return;
    this.elapsed += delta;
    const light = this.finale.isLightTheme();
    if (light !== this.light) {
      this.light = light;
      this.cameras.main.setBackgroundColor(light ? 0xc9e5ec : 0x233e53);
      this.drawBackdrop(light);
    }
    this.drawArrival(light);
  }

  private drawBackdrop(light: boolean): void {
    const g = this.backdrop.clear();
    g.fillStyle(light ? 0x92c7dc : 0x679fbf).fillRect(0, 0, FINALE_WIDTH, 48);
    g.fillStyle(light ? 0xdce8df : 0xb9d1d4).fillRect(0, 29, FINALE_WIDTH, 19);
    g.fillStyle(0xffe4a1).fillRect(157, 20, 12, 16).fillRect(155, 22, 16, 12);

    for (const [peak, top, slope] of [[12, 32, 2.5], [40, 18, 2.1], [63, 27, 2.7], [90, 24, 2.3], [128, 33, 2.8]]) {
      for (let y = top; y < 48; y += 2) {
        const spread = Math.floor((y - top) * slope / 2) * 2 + 2;
        const left = Math.max(0, peak - spread);
        g.fillStyle(y < top + 9 ? 0xeaf5f5 : 0x7899ac).fillRect(left, y, peak - left, 2);
        g.fillStyle(y < top + 7 ? 0xc1d9e3 : 0x567f96).fillRect(peak, y, Math.min(spread, FINALE_WIDTH - peak), 2);
      }
    }

    g.fillStyle(light ? 0x4389ad : 0x327297).fillRect(0, 48, FINALE_WIDTH, FINALE_HEIGHT - 48);
    g.fillStyle(light ? 0x54a0bc : 0x4288a7).fillRect(0, 48, FINALE_WIDTH, 8).fillRect(0, 87, FINALE_WIDTH, 21);
    for (let i = 0; i < 70; i++) {
      const x = (i * 47 + 3) % FINALE_WIDTH;
      const y = 49 + (i * 19) % 57;
      g.fillStyle(i % 5 ? 0x9bd0dd : 0xe0cc9c, 0.44).fillRect(x, y, Math.min(FINALE_WIDTH - x, 2 + i % 12), 1);
    }

    // The lake fills the castle's moat and lies on both sides of the causeway.
    g.fillStyle(0x385d68).fillRect(107, 68, 77, 12).fillRect(133, 55, 59, 19);
    g.fillStyle(0x7e8265).fillRect(113, 66, 70, 9).fillRect(137, 53, 55, 16);
    g.fillStyle(0x685c54).fillPoints([{ x: 0, y: 91 }, { x: 105, y: 65 }, { x: 119, y: 71 }, { x: 10, y: 108 }, { x: 0, y: 108 }], true);
    g.fillStyle(light ? 0xcbb291 : 0xb49d84).fillPoints(
      [{ x: 0, y: 90 }, { x: 105, y: 64 }, { x: 116, y: 69 }, { x: 6, y: 104 }, { x: 0, y: 104 }], true);
    g.fillStyle(0xe2c7a1).fillPoints([{ x: 0, y: 90 }, { x: 105, y: 64 }, { x: 108, y: 65 }, { x: 0, y: 93 }], true);

    this.drawWall(116, 43, 55, 27, light);
    this.drawWall(157, 25, 18, 45, light);
    this.drawWall(129, 34, 17, 35, light);
    this.drawWall(94, 42, 22, 32, light);
    g.fillStyle(0x463532).fillRect(100, 60, 9, 13).fillRect(102, 58, 5, 3);
    g.fillStyle(0x9c714e).fillPoints([{ x: 100, y: 73 }, { x: 109, y: 73 }, { x: 101, y: 78 }, { x: 91, y: 77 }], true);
    g.fillStyle(0x543c38).fillRect(163, 34, 2, 6).fillRect(138, 44, 2, 5).fillRect(103, 50, 2, 5);
  }

  private drawWall(x: number, y: number, width: number, height: number, light: boolean): void {
    const g = this.backdrop;
    g.fillStyle(light ? 0xe2be91 : 0xc8a07a).fillRect(x, y, width, height);
    g.fillStyle(0x957358).fillRect(x + width - 5, y, 5, height).fillRect(x, y + height - 4, width, 4);
    for (let slot = 0; slot + 3 <= width; slot += 6) {
      g.fillStyle(light ? 0xeacaa2 : 0xd3ac87).fillRect(x + slot, y - 4, 4, 5);
    }
    for (let row = 0; row < height - 3; row += 4) {
      for (let col = (row % 3) + 3; col < width - 6; col += 9) {
        g.fillStyle(0xad8967, 0.52).fillRect(x + col, y + row, 4, 1);
      }
    }
  }

  private drawArrival(light: boolean): void {
    const g = this.actors.clear();
    for (let i = 0; i < 8; i++) {
      const x = 131 + (i * 9 + Math.floor(this.elapsed / 170)) % 52;
      const y = 82 + (i * 7) % 17;
      g.fillStyle(0xffdfa0, (light ? 0.6 : 0.44) * (0.5 + 0.5 * Math.sin(i + this.elapsed / 430)))
        .fillRect(x, y, 2 + i % 5, 1);
    }

    const progress = Math.min(1, this.elapsed / 2100);
    const x = Math.round(-22 + progress * 80);
    const y = Math.round(99 - progress * 17);
    g.fillStyle(0x3c4344, 0.55).fillRect(x - 2, y + 2, 23, 4);
    g.fillStyle(0x24313d).fillRect(x + 2, y + 1, 4, 4).fillRect(x + 15, y, 4, 4);
    g.fillStyle(this.finale.carColor).fillRect(x, y - 4, 21, 7).fillRect(x + 4, y - 8, 12, 4);
    g.fillStyle(0x9eccda).fillRect(x + 5, y - 7, 5, 3).fillRect(x + 12, y - 7, 4, 3);
    g.fillStyle(0xffefc1).fillRect(x + 19, y - 3, 2, 2);

    const relaxed = this.finale.relaxed;
    for (const [i, coat] of [0xbf4b48, 0x275977, 0xe3a740].entries()) {
      const time = this.elapsed - (relaxed ? 2250 : 2900) - i * 260;
      if (time < 0) continue;
      const step = Math.min(1, time / (relaxed ? 1900 : 2550));
      const feetX = 66 + Math.round(step * (24 - i * 5));
      const feetY = 86 - Math.round(step * (8 - i));
      const head = feetY - (i === 2 ? 7 : 10);
      const stride = step < 1 ? Math.floor(time / 135) % 2 : 0;
      g.fillStyle(0x6a5953, 0.48).fillRect(feetX - 3, feetY, 8, 2);
      g.fillStyle(0x353849).fillRect(feetX - 1 - stride, feetY - 3, 2, 3).fillRect(feetX + 1 + stride, feetY - 3, 2, 3);
      g.fillStyle(coat).fillRect(feetX - 2, head + 3, 5, feetY - head - 5).fillRect(feetX - 2, head - 1, 5, 2);
      g.fillStyle(0xf0bd91).fillRect(feetX - 1, head + 1, 4, 2);
    }
  }
}
