import * as Phaser from 'phaser';
import { generateAllPixelTextures } from './PixelArtGenerator';
import { ERoadtripBridge } from './GameBridge';

export class BootScene extends Phaser.Scene {
  private bridge!: ERoadtripBridge;

  constructor() {
    super({ key: 'BootScene' });
  }

  init(data: { bridge: ERoadtripBridge }): void {
    this.bridge = data.bridge;
  }

  create(): void {
    generateAllPixelTextures(this);
    this.bridge.onBootReady();
    this.scene.start('EuropeMapScene', { bridge: this.bridge });
  }
}
