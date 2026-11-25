import type { Scene } from 'phaser';
import type { ChargerNetwork } from '../types';

const initials: Record<ChargerNetwork, string> = {
  tesla: 'TS', enbw: 'EN', ewego: 'EW', electra: 'EL', ionity: 'IO', ac_village: 'AC',
  fastned: 'FN', totalenergies: 'TE', ac_dorfladen: 'DL', atlante: 'AT', vianeo: 'VI'
};

// Each digit encodes one three-pixel row of a five-row letter.
const glyphs: Record<string, string> = {
  A: '25755', C: '34443', D: '65556', E: '74647', F: '74644', I: '72227',
  L: '44447', N: '55755', O: '25552', S: '34216', T: '72222', V: '55552', W: '55775'
};

export function drawChargerBadge(scene: Scene, network: ChargerNetwork, accent: string): void {
  const key = `stall_badge_${network}`;
  if (scene.textures.exists(key)) return;
  const texture = scene.textures.createCanvas(key, 20, 14);
  if (!texture) return;
  const ctx = texture.getContext();
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 20, 14);
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, 20, 1);
  ctx.fillRect(0, 13, 20, 1);
  ctx.fillStyle = '#f8fafc';
  [...initials[network]].forEach((letter, index) => {
    [...glyphs[letter]].forEach((row, y) => {
      for (let x = 0; x < 3; x++) {
        if (Number(row) & (4 >> x)) ctx.fillRect(3 + index * 8 + x * 2, 2 + y * 2, 2, 2);
      }
    });
  });
  texture.refresh();
}
