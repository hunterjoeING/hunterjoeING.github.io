import * as Phaser from 'phaser';

export const FINALE_DURATION_MS = 6500;
export const FINALE_WIDTH = 192;
export const FINALE_HEIGHT = 108;

export interface FinaleData {
  isLightTheme: () => boolean;
  onComplete: () => void;
}

export function mountFinale(
  scene: Phaser.Scene, titleText: string, art: Phaser.GameObjects.Graphics[], onComplete: () => void
): void {
  const title = scene.add.text(FINALE_WIDTH / 2, 9, titleText, {
    fontFamily: 'monospace', fontSize: '10px', fontStyle: 'bold', color: '#fff9e8',
    stroke: '#263756', strokeThickness: 2
  }).setOrigin(0.5);
  const skip = scene.add.text(FINALE_WIDTH / 2, 101, 'Tippen oder Taste drücken · Überspringen', {
    fontFamily: 'monospace', fontSize: '7px', color: '#fff9e8', backgroundColor: '#263756',
    padding: { x: 3, y: 1 }
  }).setOrigin(0.5);
  const frame = scene.add.container(0, 0, [...art, title, skip]);
  const layout = () => {
    const { width, height } = scene.scale;
    const zoom = Math.min(width / FINALE_WIDTH, height / FINALE_HEIGHT);
    frame.setPosition(
      Math.round((width - FINALE_WIDTH * zoom) / 2), Math.round((height - FINALE_HEIGHT * zoom) / 2)
    );
    frame.setScale(zoom);
  };
  layout();
  scene.scale.on('resize', layout);

  let finished = false;
  const finish = (event?: KeyboardEvent) => {
    if (finished || event?.repeat || event?.key === 'Tab') return;
    finished = true;
    onComplete();
  };
  const tap = () => finish();
  scene.input.on('pointerup', tap);
  scene.input.keyboard?.on('keydown', finish);
  scene.time.delayedCall(FINALE_DURATION_MS, finish);
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    scene.scale.off('resize', layout);
    scene.input.off('pointerup', tap);
    scene.input.keyboard?.off('keydown', finish);
  });
}
