import * as Phaser from 'phaser';
import { type FinaleData, FINALE_HEIGHT, FINALE_WIDTH, mountFinale } from './DestinationFinale';

export class InnsbruckFinaleScene extends Phaser.Scene {
  private finale!: FinaleData;
  private landscape!: Phaser.GameObjects.Graphics;
  private actors!: Phaser.GameObjects.Graphics;
  private elapsed = 0;
  private finished = false;
  private light?: boolean;

  constructor() {
    super({ key: 'InnsbruckFinaleScene' });
  }

  init(data: FinaleData): void {
    this.finale = data;
    this.elapsed = 0;
    this.finished = false;
    this.light = undefined;
  }

  create(): void {
    this.landscape = this.add.graphics();
    this.actors = this.add.graphics();
    mountFinale(this, 'INNSBRUCK', [this.landscape, this.actors], () => {
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
      this.cameras.main.setBackgroundColor(light ? 0xb8d5e9 : 0x22334b);
      this.drawLandscape(light);
    }
    this.drawFamily(light);
  }

  private drawLandscape(light: boolean): void {
    const g = this.landscape.clear();
    g.fillStyle(light ? 0x91b8dd : 0x354765).fillRect(0, 0, FINALE_WIDTH, 56);
    g.fillStyle(light ? 0xc7d9eb : 0x546181).fillRect(0, 34, FINALE_WIDTH, 22);
    g.fillStyle(light ? 0xffe8b3 : 0xf6dca7).fillRect(155, 15, 10, 14).fillRect(153, 17, 14, 10);

    // Stepped silhouettes of the Nordkette, with a shaded side on each snowy ridge.
    for (const [peak, top, slope] of [[12, 35, 2.7], [43, 18, 2.2], [75, 27, 2.1], [112, 21, 2.4], [166, 34, 2.5]]) {
      for (let y = top; y < 58; y += 2) {
        const spread = Math.floor((y - top) * slope / 2) * 2 + 2;
        const snow = y - top < 13 + (spread % 5);
        const left = snow ? (light ? 0xf3f7fd : 0xb5c8de) : (light ? 0x7190a8 : 0x516480);
        const right = snow ? (light ? 0xc1d7e7 : 0x829ab7) : (light ? 0x54768f : 0x41536e);
        const leftEdge = Math.max(0, peak - spread);
        g.fillStyle(left).fillRect(leftEdge, y, peak - leftEdge, 2);
        g.fillStyle(right).fillRect(peak, y, Math.min(FINALE_WIDTH - peak, spread + 2), 2);
      }
    }
    g.fillStyle(light ? 0xe3eff8 : 0x839ab1).fillRect(0, 58, FINALE_WIDTH, FINALE_HEIGHT - 58);
    g.fillStyle(light ? 0xc2d6e6 : 0x617a93)
      .fillRect(0, 75, 76, 4).fillRect(16, 91, 57, 2).fillRect(82, 86, 110, 10)
      .fillRect(97, 82, 95, 4).fillRect(86, 96, 106, 2);
    for (const [x, y] of [[8, 67], [27, 62], [65, 65], [88, 60], [180, 70]]) {
      g.fillStyle(0x345865).fillRect(x + 5, y + 1, 2, 15).fillRect(x + 2, y + 8, 8, 4).fillRect(x, y + 12, 12, 3);
      g.fillStyle(light ? 0xf3f7fd : 0xb5c8de).fillRect(x + 5, y + 1, 2, 1).fillRect(x + 2, y + 8, 6, 1);
    }

    // Warm windows and a lit doorway remain readable against both snow palettes.
    g.fillStyle(light ? 0xb87b62 : 0x825e5c).fillRect(106, 53, 65, 27);
    g.fillStyle(light ? 0x9b625e : 0x60485a).fillRect(106, 71, 65, 9);
    g.fillStyle(0x453b52).fillRect(101, 52, 75, 4).fillRect(108, 47, 61, 5).fillRect(116, 42, 45, 5);
    g.fillStyle(light ? 0xf8fcff : 0xd6e7f8).fillRect(101, 51, 75, 2).fillRect(109, 46, 59, 2).fillRect(116, 41, 45, 2);
    g.fillStyle(0xffe1a0).fillRect(135, 68, 9, 13);
    for (const x of [111, 122, 151, 162]) {
      g.fillRect(x, 59, 5, 7);
    }
    g.fillStyle(0x3b3546).fillRect(129, 58, 20, 7).fillRect(139, 68, 1, 12);
    g.fillStyle(0xffe1a0).fillRect(133, 61, 2, 1).fillRect(137, 61, 4, 1).fillRect(143, 61, 2, 1);
  }

  private drawFamily(light: boolean): void {
    const g = this.actors.clear();
    const walk = Math.min(1, this.elapsed / 3900);
    const step = walk < 1 ? Math.floor(this.elapsed / 140) % 2 : 0;
    const lead = Math.round(36 + walk * 91);
    const feet = 91 - Math.round(walk * 7);
    this.drawWalker(lead, feet, 0xb3424d, step, false);
    this.drawWalker(lead - 12, feet + 1, 0xe38638, 1 - step, true);
    this.drawWalker(lead - 25, feet + 2, 0x35598e, step, false);

    g.fillStyle(light ? 0xffffff : 0xeaf4fd, 0.82);
    for (let i = 0; i < 22; i++) {
      const x = Math.floor((i * 37 + this.elapsed * (0.004 + i % 3 * 0.002)) % FINALE_WIDTH);
      const y = Math.floor((i * 23 + this.elapsed * (0.01 + i % 4 * 0.003)) % 95);
      g.fillRect(x, y, i % 5 === 0 ? 2 : 1, 1);
    }
  }

  private drawWalker(x: number, feet: number, coat: number, step: number, child: boolean): void {
    const g = this.actors;
    const top = feet - (child ? 10 : 14);
    g.fillStyle(0x405169, 0.52).fillRect(x - 4, feet, 9, 2);
    g.fillStyle(coat).fillRect(x - 2, top, 4, 2).fillRect(x - 3, top + 1, 6, 2);
    g.fillStyle(0xe8aa88).fillRect(x - 2, top + 3, 5, 3);
    g.fillStyle(0x3d3448).fillRect(x - 3, top + 6, 4, 1);
    g.fillStyle(coat).fillRect(x - 3, top + 7, 6, feet - top - 9);
    g.fillStyle(0x323c53).fillRect(x - 3 - step, feet - 2, 3, 2).fillRect(x + step, feet - 2, 3, 2);
  }
}
