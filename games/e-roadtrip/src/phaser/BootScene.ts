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
    const preview =
      typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('erpreview');
    this.bridge.onBootReady();
    if (preview) {
      this.scene.stop();
      return;
    }
    this.scene.start('EuropeMapScene', { bridge: this.bridge });
  }
}
