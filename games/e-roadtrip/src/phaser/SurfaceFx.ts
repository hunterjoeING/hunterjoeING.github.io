import * as Phaser from 'phaser';
import { Rect } from './PlaceStyles';

export interface SurfaceSample {
  x: number;
  y: number;
  rotation: number;
  speed: number;
  onGrass: boolean;
  wetRoad: boolean;
  snowyRoad?: boolean;
  dt: number;
}

interface Puff {
  sprite: Phaser.GameObjects.Image;
  vx: number;
  vy: number;
  life: number;
  max: number;
}

/**
 * Persistent dirty tyre marks on grass, plus short-lived grass clods and wet-road spray.
 * Marks are redrawn only when the buffer overflows, so the per-frame cost stays small.
 */
export class SurfaceFx {
  private readonly trackG: Phaser.GameObjects.Graphics;
  private readonly stamps: Array<{ x: number; y: number; rot: number }> = [];
  private readonly puffs: Puff[] = [];
  private readonly free: Phaser.GameObjects.Image[] = [];
  private accum = 0;
  private readonly maxStamps: number;
  private readonly maxPuffs: number;
  private readonly mobile: boolean;

  constructor(scene: Phaser.Scene, mobile: boolean) {
    this.mobile = mobile;
    this.maxStamps = mobile ? 42 : 100;
    this.maxPuffs = mobile ? 14 : 32;
    this.trackG = scene.add.graphics().setDepth(1.15);
  }

  update(scene: Phaser.Scene, sample: SurfaceSample): void {
    const moving = Math.abs(sample.speed) > 26;
    this.accum += sample.dt;
    const interval = this.mobile ? 0.085 : 0.05;
    if (moving && this.accum >= interval) {
      this.accum = 0;
      if (sample.onGrass) {
        this.addStamp(sample);
        this.burst(scene, 'grass_clod', sample, Math.abs(sample.speed) > 120 ? 3 : 2, 46, 0.42);
      } else if (sample.snowyRoad || (sample.wetRoad && Math.abs(sample.speed) > 55)) {
        const fast = Math.abs(sample.speed) > 150;
        this.burst(scene, 'spray_puff', sample, fast ? (this.mobile ? 2 : 4) : this.mobile ? 1 : 2, 90 + Math.abs(sample.speed) * 0.3, 0.62);
      }
    }
    this.stepPuffs(sample.dt);
  }

  private addStamp(sample: SurfaceSample): void {
    const fx = Math.sin(sample.rotation);
    const fy = -Math.cos(sample.rotation);
    const rx = Math.cos(sample.rotation);
    const ry = Math.sin(sample.rotation);
    const back = sample.speed >= 0 ? -12 : 12;
    const cx = sample.x + fx * back;
    const cy = sample.y + fy * back;
    this.stamps.push({ x: cx - rx * 7, y: cy - ry * 7, rot: sample.rotation });
    this.stamps.push({ x: cx + rx * 7, y: cy + ry * 7, rot: sample.rotation });
    if (this.stamps.length > this.maxStamps) {
      this.stamps.splice(0, this.stamps.length - this.maxStamps);
      this.redraw();
      return;
    }
    this.drawOne(this.stamps[this.stamps.length - 2]);
    this.drawOne(this.stamps[this.stamps.length - 1]);
  }

  private redraw(): void {
    this.trackG.clear();
    for (const s of this.stamps) this.drawOne(s);
  }

  private drawOne(s: { x: number; y: number; rot: number }): void {
    const fx = Math.sin(s.rot);
    const fy = -Math.cos(s.rot);
    this.trackG.lineStyle(7, 0x4a2c0a, 0.72);
    this.trackG.lineBetween(s.x - fx * 8, s.y - fy * 8, s.x + fx * 9, s.y + fy * 9);
    this.trackG.lineStyle(3, 0x1c1917, 0.85);
    this.trackG.lineBetween(s.x - fx * 6, s.y - fy * 6, s.x + fx * 7, s.y + fy * 7);
  }

  private burst(scene: Phaser.Scene, key: string, sample: SurfaceSample, count: number, kick: number, life: number): void {
    if (!scene.textures.exists(key) || this.puffs.length >= this.maxPuffs) return;
    const fx = Math.sin(sample.rotation);
    const fy = -Math.cos(sample.rotation);
    const rx = Math.cos(sample.rotation);
    const ry = Math.sin(sample.rotation);
    const back = sample.speed >= 0 ? -1 : 1;
    for (let i = 0; i < count && this.puffs.length < this.maxPuffs; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const sprite = this.free.pop() || scene.add.image(0, 0, key).setDepth(9);
      sprite.setTexture(key);
      sprite.setVisible(true);
      sprite.setPosition(sample.x - fx * 8 * back + rx * side * 8, sample.y - fy * 8 * back + ry * side * 8);
      sprite.setAlpha(key === 'spray_puff' ? 0.55 : 0.9);
      sprite.setScale(key === 'spray_puff' ? 0.45 + Math.min(0.8, Math.abs(sample.speed) / 280) : 1);
      if (key === 'grass_clod') sprite.setTint(i % 2 === 0 ? 0x65a30d : 0x854d0e);
      else if (sample.snowyRoad) sprite.setTint(0xf0f8ff);
      else sprite.clearTint();
      const spray = key === 'spray_puff';
      this.puffs.push({
        sprite,
        vx: (-fx * back * (spray ? 0.35 : 0.15) + rx * side) * kick,
        vy: (-fy * back * (spray ? 0.35 : 0.15) + ry * side) * kick - (spray ? 10 : 28),
        life,
        max: life
      });
    }
  }

  private stepPuffs(dt: number): void {
    for (let i = this.puffs.length - 1; i >= 0; i--) {
      const p = this.puffs[i];
      p.life -= dt;
      p.sprite.x += p.vx * dt;
      p.sprite.y += p.vy * dt;
      p.vy += 40 * dt;
      p.sprite.setAlpha(Math.max(0, p.life / p.max) * 0.75);
      if (p.life <= 0) {
        p.sprite.setVisible(false);
        this.free.push(p.sprite);
        this.puffs.splice(i, 1);
      }
    }
  }
}

export function isGrassSurface(x: number, y: number, grass: Rect[], asphalt: Rect[], blocked: Rect[]): boolean {
  const inside = (r: Rect) => x >= r.x && y >= r.y && x < r.x + r.w && y < r.y + r.h;
  if (!grass.some(inside)) return false;
  if (asphalt.some(inside)) return false;
  if (blocked.some(inside)) return false;
  return true;
}
