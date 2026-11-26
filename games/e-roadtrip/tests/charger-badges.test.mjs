import assert from 'node:assert/strict';

const NETWORKS = ['tesla', 'enbw', 'ewego', 'electra', 'ionity', 'ac_village', 'fastned', 'totalenergies',
  'ac_dorfladen', 'atlante', 'vianeo', 'a22', 'neogy'];

export default function register(test, game) {
  test('every charger network has a badge whose initials have glyphs', () => {
    const ctx = { fillStyle: '', fillRect() {} };
    const texture = { getContext: () => ctx, refresh() {} };
    const made = [];
    const scene = {
      textures: {
        exists: key => made.includes(key),
        createCanvas: key => { made.push(key); return texture; }
      }
    };
    for (const network of NETWORKS) {
      assert.doesNotThrow(() => game.drawChargerBadge(scene, network, '#fff'), network);
    }
    assert.equal(made.length, NETWORKS.length);
  });
}
