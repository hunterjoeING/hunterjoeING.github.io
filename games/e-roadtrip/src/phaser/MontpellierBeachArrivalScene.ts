import * as Phaser from 'phaser';
import { BEACH_ARRIVAL_DURATION_MS, BEACH_ARRIVAL_STAGE, beachArrivalFrame } from '../sim/BeachArrival';
import { bakeCoastalBackdrop, COASTAL_BACKGROUND, createSeaGlitter, drawCoastalShadow } from './CoastalEffects';
import { type FinaleData, FINALE_WIDTH as WIDTH, FINALE_HEIGHT as HEIGHT, mountFinale } from './DestinationFinale';

type Graphics = Phaser.GameObjects.Graphics;
type Runner = ReturnType<typeof beachArrivalFrame>['olderChild'];

interface BeachArrivalData extends Pick<FinaleData, 'onComplete'> {
  carColor: number;
}

export class MontpellierBeachArrivalScene extends Phaser.Scene {
  private arrival!: BeachArrivalData;
  private updateGlitter!: (seconds: number) => void;
  private actors!: Graphics;
  private elapsed = 0;

  constructor() {
    super({ key: 'MontpellierBeachArrivalScene' });
  }

  init(data: BeachArrivalData): void {
    this.arrival = data;
    this.elapsed = 0;
  }

  create(): void {
    this.cameras.main.setBackgroundColor(COASTAL_BACKGROUND);
    const art = this.add.graphics();
    this.drawBackdrop(art);
    const backdrop = bakeCoastalBackdrop(this, WIDTH, HEIGHT, art);
    const waterY = BEACH_ARRIVAL_STAGE.waterlineY + 2;
    const glitter = createSeaGlitter(this, { x: 6, y: waterY, w: WIDTH - 12, h: HEIGHT - waterY - 3 },
      this.scale.width < 640 ? 15 : 26, 1, 64);
    this.updateGlitter = glitter.update;
    this.actors = this.add.graphics();
    mountFinale(this, 'PALAVAS-LES-FLOTS', [backdrop, ...glitter.sprites, this.actors],
      this.arrival.onComplete, BEACH_ARRIVAL_DURATION_MS);
    this.update(0, 0);
  }

  update(_time: number, delta: number): void {
    this.elapsed += delta;
    this.updateGlitter(this.elapsed / 1000);
    this.drawFamily();
  }

  private drawBackdrop(g: Graphics): void {
    const { carX, carY, waterlineY } = BEACH_ARRIVAL_STAGE;
    g.fillStyle(0xf3cf91).fillRect(0, 0, WIDTH, HEIGHT);
    g.fillStyle(0x319fa6).fillRect(0, waterlineY, WIDTH, HEIGHT - waterlineY);
    g.fillStyle(0x72c1b3).fillRect(0, waterlineY, WIDTH, 8);
    g.fillStyle(0xffebb7);
    for (let x = 0; x < WIDTH; x += 14) g.fillRect(x, waterlineY - (x % 3), 9 + x % 5, 1);
    g.fillStyle(0x8bcebe, 0.65);
    for (let x = 2; x < WIDTH; x += 18) g.fillRect(x, 91 + x % 11, 13, 1);

    g.fillStyle(0x938776).fillRect(0, 18, WIDTH, 30);
    g.fillStyle(0xc9b59b).fillRect(0, 44, WIDTH, 10);
    g.fillStyle(0xf2dbac, 0.7).fillRect(0, 45, WIDTH, 2);
    g.fillStyle(0x82c78c).fillRect(carX - 10, carY - 10, 20, 24);
    g.fillStyle(0x4f595e).fillRect(carX - 9, carY - 9, 18, 22);
    drawCoastalShadow(g, 21, 34, 23, 29);
    g.fillStyle(0xf3d19e).fillRect(4, 19, 32, 20);
    g.fillStyle(0xb7634c).fillRect(2, 16, 36, 8);
    g.fillStyle(0xffdf99).fillRect(4, 24, 2, 15);
    g.fillStyle(0x317e83).fillRect(7, 27, 5, 6).fillRect(16, 27, 5, 6).fillRect(26, 27, 5, 11);
    g.fillStyle(0xf7f3cd).fillRect(48, 38, 6, 6);
    g.fillStyle(0x397a78).fillRect(49, 38, 4, 3);

    for (const [x, y] of [[26, 56], [106, 56], [165, 54]]) {
      drawCoastalShadow(g, x, y, 8, 23);
      g.fillStyle(0xa46e46).fillRect(x, y - 11, 3, 13);
      g.fillStyle(0x42834f).fillRect(x - 8, y - 13, 18, 3).fillRect(x - 2, y - 19, 6, 8);
      g.fillStyle(0x6ca561).fillRect(x - 10, y - 10, 7, 2).fillRect(x + 6, y - 10, 6, 2);
    }
    for (const [x, y, color] of [[55, 71, 0xd97772], [166, 70, 0x388f97]]) {
      drawCoastalShadow(g, x, y + 1, 10, 16);
      g.fillStyle(color).fillRect(x - 7, y - 4, 14, 7).fillRect(x - 4, y - 7, 8, 3);
      g.fillStyle(0xffe9b5).fillRect(x - 1, y - 6, 2, 8).fillRect(x + 13, y - 3, 4, 9);
    }

    drawCoastalShadow(g, carX, carY + 4, 12, 21);
    g.fillStyle(this.arrival.carColor).fillRect(carX - 6, carY - 8, 12, 17);
    g.fillStyle(0x293644).fillRect(carX - 4, carY - 5, 8, 4).fillRect(carX - 4, carY + 4, 8, 3);
    g.fillStyle(0xf9d5a9).fillRect(carX - 5, carY - 8, 2, 2).fillRect(carX + 3, carY - 8, 2, 2);
  }

  private drawFamily(): void {
    const frame = beachArrivalFrame(this.elapsed);
    const { carX, carY } = BEACH_ARRIVAL_STAGE;
    const g = this.actors.clear();
    if (frame.doorOpen) {
      g.fillStyle(this.arrival.carColor).fillRect(carX + 6, carY - 2, 5, 2).fillRect(carX - 10, carY + 1, 5, 2);
    }

    const { x, y, visible, step } = frame.parents;
    if (visible) {
      this.person(x - 4, y, 0x426085, 0x573945, 12, step);
      this.person(x + 5, y + 2, 0xbd5071, 0x70434c, 11, 1 - step);
    }
    this.child(frame.olderChild, 0xf37a50, 0x684044);
    this.child(frame.youngerChild, 0x46a299, 0x8a573e);

    const dog = frame.dog;
    if (dog.visible) {
      const bounce = dog.moving ? dog.step : 0;
      drawCoastalShadow(g, dog.x, dog.y, 5, 8);
      g.fillStyle(0x8c5a39).fillRect(dog.x - 3, dog.y - 6 - bounce, 7, 4)
        .fillRect(dog.x + 3, dog.y - 8 - bounce, 4, 4).fillRect(dog.x - 5, dog.y - 8 + bounce, 2, 4);
      g.fillStyle(0x593a35).fillRect(dog.x - 3, dog.y - 3, 2, 2).fillRect(dog.x + 3, dog.y - 3, 2, 2);
      this.splash(dog);
    }
  }

  private child(runner: Runner, shirt: number, hair: number): void {
    if (!runner.visible) return;
    this.person(runner.x, runner.y, shirt, hair, 9, runner.moving ? runner.step : 0);
    this.splash(runner);
  }

  private person(x: number, y: number, shirt: number, hair: number, height: number, step: number): void {
    const g = this.actors;
    const head = y - height - step;
    drawCoastalShadow(g, x, y, 4, height + 3);
    g.fillStyle(hair).fillRect(x - 2, head, 5, 3);
    g.fillStyle(0xeea678).fillRect(x - 2, head + 2, 5, 2).fillRect(x + 2, head + 5 - step, 3, 2);
    g.fillStyle(shirt).fillRect(x - 2, head + 4, 5, height - 6);
    g.fillStyle(0x4b4656).fillRect(x - 2 - step, head + height - 2, 2, 2)
      .fillRect(x + 1 + step, head + height - 2, 2, 2);
  }

  private splash({ x, y, splashing, step }: Runner): void {
    if (!splashing) return;
    this.actors.fillStyle(0xd4efe2).fillRect(x - 6 - step, y - 2, 3, 1)
      .fillRect(x + 6 + step, y - 3 - step, 2, 1);
  }
}
