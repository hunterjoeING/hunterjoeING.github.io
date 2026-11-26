import * as Phaser from 'phaser';
import type { CityRect } from '../data/cityLayouts/types';
import { MONTPELLIER_LIGHTING } from '../sim/CoastalLight';

const SHADOW_SLOPE = -0.42; // North-up: shadows extend east-northeast from the low west-southwest sun.
const SHADOW_COLOR = 0x76503f;
export const COASTAL_BACKGROUND = 0xc89162;

export function drawCoastalShadow(
  g: Phaser.GameObjects.Graphics, x: number, y: number, width: number, length: number
): void {
  for (const [spread, reach, alpha] of [[1.35, 1, 0.12], [1, 0.86, 0.23]]) {
    const dx = length * reach;
    const dy = dx * SHADOW_SLOPE;
    const half = width * spread / 2;
    g.fillStyle(SHADOW_COLOR, alpha).fillPoints([
      { x: x - half, y: y + half * 0.3 },
      { x: x - half + dx, y: y + half * 0.3 + dy },
      { x: x + half + dx, y: y - half * 0.3 + dy },
      { x: x + half, y: y - half * 0.3 }
    ], true);
  }
}

export function followCoastalShadow(
  scene: Phaser.Scene, actor: Phaser.GameObjects.Image, length: number, width: number
): () => void {
  const shadow = scene.add.ellipse(0, 0, length, width, SHADOW_COLOR, 0.28)
    .setOrigin(0.22, 0.5).setRotation(Math.atan(SHADOW_SLOPE)).setDepth(2.8);
  const update = () => shadow.setPosition(actor.x, actor.y + width * 0.18).setVisible(actor.visible);
  update();
  return update;
}

export function createSeaGlitter(
  scene: Phaser.Scene, area: CityRect, count: number, pixelSize: number, focusX = area.x + area.w / 2
) {
  const sprites = Array.from({ length: count }, (_, index) => {
    const row = (index + 0.5) / count;
    const spread = ((index * 0.61803398875) % 1 - 0.5) * area.w;
    const x = Phaser.Math.Clamp(focusX + spread * (0.45 + 0.55 * row), area.x, area.x + area.w);
    const y = area.y + row * area.h;
    const width = pixelSize * (2 + index % 5);
    return scene.add.rectangle(Math.round(x), Math.round(y), width, pixelSize, 0xffe9ae)
      .setDepth(1);
  });
  const update = (seconds: number) => {
    sprites.forEach((sprite, index) => {
      const shimmer = (1 + Math.sin(seconds * (2.2 + index % 4 * 0.29) + index * 2.4)) / 2;
      sprite.setAlpha(0.09 + shimmer ** 3 * 0.75);
    });
  };
  update(0);
  return { sprites, update };
}

export function bakeCoastalBackdrop(scene: Phaser.Scene, width: number, height: number, art: Phaser.GameObjects.Graphics) {
  art.fillStyle(MONTPELLIER_LIGHTING.ambientColor, MONTPELLIER_LIGHTING.ambientAlpha).fillRect(0, 0, width, height);
  const backdrop = scene.add.renderTexture(0, 0, width, height).setOrigin(0).draw(art);
  backdrop.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
  art.destroy();
  return backdrop;
}
