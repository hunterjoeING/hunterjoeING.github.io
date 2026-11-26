import * as Phaser from 'phaser';
import {
  type FinaleData, FINALE_WIDTH as WIDTH, FINALE_HEIGHT as HEIGHT, mountFinale
} from './DestinationFinale';

interface BeachFinaleData extends FinaleData {
  relaxed: boolean;
}

export class MontpellierFinaleScene extends Phaser.Scene {
  private dataForFinale!: BeachFinaleData;
  private beach!: Phaser.GameObjects.Graphics;
  private actors!: Phaser.GameObjects.Graphics;
  private elapsed = 0;
  private finished = false;

  constructor() {
    super({ key: 'MontpellierFinaleScene' });
  }

  init(data: BeachFinaleData): void {
    this.dataForFinale = data;
    this.elapsed = 0;
    this.finished = false;
  }

  create(): void {
    this.beach = this.add.graphics();
    this.actors = this.add.graphics();
    mountFinale(this, 'MONTPELLIER', [this.beach, this.actors], () => {
      this.finished = true;
      this.dataForFinale.onComplete();
    });
    this.update(0, 0);
  }

  update(_time: number, delta: number): void {
    if (this.finished) return;
    this.elapsed += delta;
    const light = this.dataForFinale.isLightTheme();
    this.cameras.main.setBackgroundColor(light ? 0xead69f : 0x253550);
    this.drawBeach(light);
    this.drawFamily();
  }

  private drawBeach(light: boolean): void {
    const g = this.beach.clear();
    g.fillStyle(light ? 0x84d2ea : 0x526f9e).fillRect(0, 0, WIDTH, 29);
    g.fillStyle(light ? 0xffe286 : 0xf8c67e)
      .fillRect(142, 7, 12, 16).fillRect(140, 9, 16, 12).fillRect(138, 12, 20, 6);
    g.fillStyle(light ? 0xc2e9ea : 0x8798b5)
      .fillRect(19, 13, 25, 3).fillRect(24, 11, 13, 2).fillRect(67, 20, 18, 2);
    g.fillStyle(light ? 0x258dac : 0x306887).fillRect(0, 29, WIDTH, 35);
    g.fillStyle(light ? 0x369faf : 0x429298).fillRect(0, 41, WIDTH, 23);
    g.fillStyle(light ? 0x62bbb8 : 0x68b3ad).fillRect(0, 52, WIDTH, 13);
    const wash = Math.round(Math.sin(this.elapsed / 330) * 2);
    g.fillStyle(light ? 0xe0b47d : 0xc68d69).fillRect(0, 59 + wash, WIDTH, HEIGHT - 59 - wash);
    g.fillStyle(light ? 0xf6d78d : 0xe3b47d).fillRect(0, 67 + wash, WIDTH, HEIGHT - 67 - wash);
    g.fillStyle(light ? 0xeeefd0 : 0xe6d8ae);
    for (let i = 0; i < 12; i++) {
      const x = i * 17 - 2;
      const next = x + Math.round(Math.sin(this.elapsed / 380 + i) * 3);
      g.fillRect(x, 58 + wash - (i % 3), 9 + (i % 4), 2);
      g.fillRect(next, 33 + (i * 7) % 21, 5 + i % 7, 1);
    }
    g.fillStyle(0x9b6f5a, 0.45)
      .fillRect(14, 93, 3, 1).fillRect(70, 88, 3, 1).fillRect(175, 94, 4, 1)
      .fillRect(99, 74, 2, 1).fillRect(44, 81, 3, 1).fillRect(165, 69, 3, 1);
  }

  private drawFamily(): void {
    const g = this.actors.clear();
    const seconds = this.elapsed / 1000;
    const relax = this.dataForFinale.relaxed;
    const loungerX = 129;
    g.fillStyle(0xb88661, 0.55).fillRect(loungerX - 3, 91, 39, 3);
    g.fillStyle(0x853f4c).fillRect(loungerX, 83, 4, 8).fillRect(loungerX + 28, 88, 4, 4);
    g.fillStyle(0xeff5cc).fillRect(loungerX, 83, 34, 5).fillRect(loungerX + 23, 80, 9, 3);
    g.fillStyle(0x388b99).fillRect(loungerX + 7, 83, 4, 5).fillRect(loungerX + 17, 83, 4, 5);

    const play = Math.sin(seconds * 4);
    const step = Math.floor(seconds * 10) % 2;
    const kid1 = Math.round(41 + play * 8);
    const kid2 = Math.round(87 + Math.sin(seconds * 4 + 1.5) * 6);
    this.drawPerson(kid1, 75 - step, 1, 0xf37a50, 0x684044, true, step);
    this.drawPerson(kid2, 77 - (1 - step), -1, 0x46a299, 0x8a573e, true, 1 - step);
    const ballX = Math.round(64 + Math.sin(seconds * 4 - 0.5) * 14);
    const ballY = Math.round(71 - Math.abs(Math.sin(seconds * 4 - 0.5)) * 11);
    g.fillStyle(0xe26d66).fillRect(ballX, ballY, 5, 4);
    g.fillStyle(0xffe7b0).fillRect(ballX + 1, ballY, 2, 2);

    const approach = Math.max(0, Math.min(1, (seconds - 0.8) / 2.2));
    const wifeX = relax ? Math.round(111 + approach * 13) : 111;
    this.drawPerson(wifeX, 86, relax ? 1 : -1, 0xbd5071, 0x70434c, false,
      relax && approach < 1 ? step : 0);
    if (relax) {
      this.drawPerson(132, 86, -1, 0x426085, 0x573945, false, 0);
      if (approach === 1) {
        const y = 61 - Math.floor((seconds - 3) * 4) % 10;
        g.fillStyle(0xd94365).fillRect(124, y, 3, 3).fillRect(128, y, 3, 3)
          .fillRect(124, y + 2, 7, 2).fillRect(125, y + 4, 5, 1)
          .fillRect(126, y + 5, 3, 1).fillRect(127, y + 6, 1, 1);
      }
    } else {
      // Bent head, drooping arm, knees and shoes hang over the edge of the lounger.
      g.fillStyle(0x426085).fillRect(139, 74, 8, 9).fillRect(137, 80, 10, 3);
      g.fillStyle(0x573945).fillRect(135, 68, 7, 3);
      g.fillStyle(0xeaa779).fillRect(135, 71, 6, 4).fillRect(137, 77, 2, 5);
      g.fillStyle(0x37324a).fillRect(135, 83, 10, 3).fillRect(134, 85, 3, 5)
        .fillRect(131, 89, 6, 2);
    }
  }

  private drawPerson(
    x: number, feet: number, facing: number, shirt: number, hair: number, child: boolean, step: number
  ): void {
    const g = this.actors;
    const head = feet - (child ? 13 : 17);
    g.fillStyle(0xb88661, 0.6).fillRect(x - 5, feet, 11, 2);
    g.fillStyle(hair).fillRect(x - 3, head, 6, 4).fillRect(x - 3 * facing, head + 2, 2, 4);
    g.fillStyle(0xeaa779).fillRect(x - 2, head + 2, 5, 4).fillRect(x + 3 * facing, head + 3, 1, 2);
    g.fillStyle(0x4c3044).fillRect(x + facing, head + 3, 1, 1);
    g.fillStyle(0xffedc5).fillRect(x + facing, head + 5, 2, 1);
    g.fillStyle(shirt).fillRect(x - 3, head + 6, 7, feet - head - 9);
    g.fillStyle(0xeaa779).fillRect(x + 3 * facing, head + 7 - step, 3, 2);
    g.fillStyle(0x3d384d).fillRect(x - 2 - step, feet - 3, 2, 3).fillRect(x + 1 + step, feet - 3, 2, 3);
  }
}
