import * as Phaser from 'phaser';
import { bakeCoastalBackdrop, COASTAL_BACKGROUND, createSeaGlitter, drawCoastalShadow } from './CoastalEffects';
import {
  type FinaleData, FINALE_WIDTH as WIDTH, FINALE_HEIGHT as HEIGHT, mountFinale
} from './DestinationFinale';

interface BeachFinaleData extends Pick<FinaleData, 'onComplete'> {
  relaxed: boolean;
}

export class MontpellierFinaleScene extends Phaser.Scene {
  private dataForFinale!: BeachFinaleData;
  private updateGlitter!: (seconds: number) => void;
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
    this.cameras.main.setBackgroundColor(COASTAL_BACKGROUND);
    const art = this.add.graphics();
    this.drawBeach(art);
    const backdrop = bakeCoastalBackdrop(this, WIDTH, HEIGHT, art);
    const glitter = createSeaGlitter(this, { x: 9, y: 30, w: 155, h: 27 },
      this.scale.width < 640 ? 16 : 30, 1, 49);
    this.updateGlitter = glitter.update;
    this.actors = this.add.graphics();
    mountFinale(this, 'MONTPELLIER', [backdrop, ...glitter.sprites, this.actors], () => {
      this.finished = true;
      this.dataForFinale.onComplete();
    });
    this.update(0, 0);
  }

  update(_time: number, delta: number): void {
    if (this.finished) return;
    this.elapsed += delta;
    this.updateGlitter(this.elapsed / 1000);
    this.drawFamily();
  }

  private drawBeach(g: Phaser.GameObjects.Graphics): void {
    g.fillStyle(0x87cbe0).fillRect(0, 0, WIDTH, 29);
    g.fillStyle(0xc6d8c8).fillRect(0, 17, WIDTH, 5);
    g.fillStyle(0xf1d4a8).fillRect(0, 22, WIDTH, 7);
    g.fillStyle(0xffd58b, 0.5).fillRect(28, 14, 30, 15);
    g.fillStyle(0xffecac)
      .fillRect(37, 15, 12, 14).fillRect(34, 18, 18, 11).fillRect(32, 21, 22, 6);
    g.fillStyle(0x258dac).fillRect(0, 29, WIDTH, 35);
    g.fillStyle(0x369faf).fillRect(0, 41, WIDTH, 23);
    g.fillStyle(0x62bbb8).fillRect(0, 52, WIDTH, 13);
    g.fillStyle(0xe0b47d).fillRect(0, 59, WIDTH, HEIGHT - 59);
    g.fillStyle(0xf6d78d).fillRect(0, 67, WIDTH, HEIGHT - 67);
    g.fillStyle(0xffe9bd);
    for (let i = 0; i < 12; i++) {
      const x = i * 17 - 2;
      g.fillRect(x, 58 - (i % 3), 9 + (i % 4), 2);
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
    drawCoastalShadow(g, loungerX + 13, 91, 25, 28);
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
    drawCoastalShadow(g, x, feet, 5, child ? 14 : 21);
    g.fillStyle(hair).fillRect(x - 3, head, 6, 4).fillRect(x - 3 * facing, head + 2, 2, 4);
    g.fillStyle(0xeaa779).fillRect(x - 2, head + 2, 5, 4).fillRect(x + 3 * facing, head + 3, 1, 2);
    g.fillStyle(0x4c3044).fillRect(x + facing, head + 3, 1, 1);
    g.fillStyle(0xffedc5).fillRect(x + facing, head + 5, 2, 1);
    g.fillStyle(shirt).fillRect(x - 3, head + 6, 7, feet - head - 9);
    g.fillStyle(0xeaa779).fillRect(x + 3 * facing, head + 7 - step, 3, 2);
    g.fillStyle(0x3d384d).fillRect(x - 2 - step, feet - 3, 2, 3).fillRect(x + 1 + step, feet - 3, 2, 3);
  }
}
