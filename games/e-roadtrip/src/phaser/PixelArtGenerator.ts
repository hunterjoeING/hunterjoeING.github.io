import * as Phaser from 'phaser';
import { VEHICLES } from '../data/vehicles';
import { ChargerNetwork, LandmarkKind, VehicleShape } from '../types';

function hexCss(col: number): string {
  return '#' + col.toString(16).padStart(6, '0');
}

function shadeHex(col: number, factor: number): string {
  const r = Math.min(255, Math.max(0, Math.round(((col >> 16) & 0xff) * factor)));
  const g = Math.min(255, Math.max(0, Math.round(((col >> 8) & 0xff) * factor)));
  const b = Math.min(255, Math.max(0, Math.round((col & 0xff) * factor)));
  return `rgb(${r},${g},${b})`;
}

function drawTopDownCarTexture(
  scene: Phaser.Scene,
  key: string,
  shape: VehicleShape,
  primaryColor: number,
  accentColor: number,
  options?: { isPolice?: boolean; isVan?: boolean }
): void {
  if (scene.textures.exists(key)) return;
  const w = 32;
  const h = 52;
  const tex = scene.textures.createCanvas(key, w, h);
  if (!tex) return;
  const ctx = tex.getContext();
  ctx.imageSmoothingEnabled = false;

  const body = hexCss(primaryColor);
  const darkBody = shadeHex(primaryColor, 0.72);
  const lightBody = shadeHex(primaryColor, 1.18);
  const accent = hexCss(accentColor);

  // Drop shadow
  ctx.fillStyle = 'rgba(0,0,0,0.34)';
  ctx.fillRect(5, 5, 24, 44);

  // Wheels (4 corners)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(2, 10, 4, 9);
  ctx.fillRect(26, 10, 4, 9);
  ctx.fillRect(2, 34, 4, 9);
  ctx.fillRect(26, 34, 4, 9);

  // Main chassis silhouette (facing UP = North)
  ctx.fillStyle = darkBody;
  ctx.fillRect(5, 4, 22, 44);
  ctx.fillStyle = body;
  ctx.fillRect(6, 5, 20, 42);

  // Hood highlight / nose styling
  ctx.fillStyle = lightBody;
  if (shape === 'sport') {
    ctx.fillRect(8, 5, 16, 12);
    ctx.fillStyle = darkBody;
    ctx.fillRect(10, 7, 12, 3); // aero hood vent
  } else if (shape === 'sedan_aero') {
    ctx.fillRect(7, 5, 18, 12);
  } else {
    ctx.fillRect(7, 6, 18, 10);
  }

  // Side mirrors
  ctx.fillStyle = darkBody;
  ctx.fillRect(3, 16, 3, 3);
  ctx.fillRect(26, 16, 3, 3);

  // Windshield & cabin glass
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(7, 15, 18, 7);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(8, 16, 16, 4);

  // Roof design by vehicle type
  if (options?.isVan) {
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(7, 22, 18, 22);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(9, 25, 14, 16);
  } else if (shape === 'hatchback') {
    ctx.fillStyle = accent; // contrasting black/white roof
    ctx.fillRect(8, 22, 16, 16);
    ctx.fillStyle = '#334155';
    ctx.fillRect(8, 39, 16, 4); // rear window
  } else if (shape === 'sedan_aero' || shape === 'sport') {
    // Panoramic dark glass roof
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(8, 22, 16, 17);
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(9, 23, 14, 14);
    if (shape === 'sport') {
      // Rear spoiler
      ctx.fillStyle = accent;
      ctx.fillRect(6, 44, 20, 3);
    }
  } else if (shape === 'suv' || shape === 'touring') {
    ctx.fillStyle = body;
    ctx.fillRect(8, 22, 16, 18);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(9, 24, 14, 11); // sunroof
    ctx.fillStyle = '#334155';
    ctx.fillRect(8, 41, 16, 4);
    // Roof rails
    ctx.fillStyle = accent;
    ctx.fillRect(7, 22, 1, 20);
    ctx.fillRect(24, 22, 1, 20);
  }

  // Police livery & lightbar
  if (options?.isPolice) {
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(6, 18, 20, 22);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(6, 25, 20, 2);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(9, 24, 6, 3);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(17, 24, 6, 3);
  }

  // Front LED headlights
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(7, 4, 4, 2);
  ctx.fillRect(21, 4, 4, 2);

  // Rear LED taillights / lightbar
  ctx.fillStyle = '#ef4444';
  if (shape === 'hatchback' || shape === 'sport') {
    ctx.fillRect(7, 46, 18, 2);
  } else {
    ctx.fillRect(7, 46, 5, 2);
    ctx.fillRect(20, 46, 5, 2);
  }

  tex.refresh();
}

function drawTruckTexture(scene: Phaser.Scene): void {
  const key = 'npc_truck';
  if (scene.textures.exists(key)) return;
  const tex = scene.textures.createCanvas(key, 36, 92);
  if (!tex) return;
  const ctx = tex.getContext();
  ctx.imageSmoothingEnabled = false;

  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(5, 5, 28, 84);

  // Wheels
  ctx.fillStyle = '#0f172a';
  [10, 22, 54, 72].forEach(y => {
    ctx.fillRect(2, y, 4, 9);
    ctx.fillRect(30, y, 4, 9);
  });

  // Tractor cab (red/white)
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(6, 4, 24, 22);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(7, 5, 22, 19);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(8, 10, 20, 5); // windshield
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(7, 4, 5, 2);
  ctx.fillRect(24, 4, 5, 2);

  // Trailer body
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(5, 28, 26, 60);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(7, 30, 22, 56);
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(10, 42, 16, 30); // cargo stripe

  // Taillights
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(7, 86, 5, 2);
  ctx.fillRect(24, 86, 5, 2);
  tex.refresh();
}

function drawCyclistTexture(scene: Phaser.Scene, key: string, jerseyHex: string): void {
  if (scene.textures.exists(key)) return;
  const tex = scene.textures.createCanvas(key, 16, 26);
  if (!tex) return;
  const ctx = tex.getContext();
  ctx.imageSmoothingEnabled = false;

  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.fillRect(5, 4, 8, 20);
  // Bike tires & frame
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(7, 2, 2, 22);
  // Handlebars
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(3, 6, 10, 2);
  // Rider torso
  ctx.fillStyle = jerseyHex;
  ctx.fillRect(4, 9, 8, 9);
  // Helmet
  ctx.fillStyle = '#facc15';
  ctx.fillRect(5, 6, 6, 5);
  tex.refresh();
}

function drawPedestrianTexture(
  scene: Phaser.Scene,
  key: string,
  shirtHex: string,
  isChild: boolean
): void {
  if (scene.textures.exists(key)) return;
  const size = isChild ? 14 : 18;
  const tex = scene.textures.createCanvas(key, size, size);
  if (!tex) return;
  const ctx = tex.getContext();
  ctx.imageSmoothingEnabled = false;

  const c = Math.floor(size / 2);
  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.fillRect(c - 4, c - 3, 9, 9);
  // Shoulders
  ctx.fillStyle = shirtHex;
  ctx.fillRect(c - (isChild ? 4 : 5), c - 3, isChild ? 8 : 10, isChild ? 6 : 7);
  // Backpack for child
  if (isChild) {
    ctx.fillStyle = '#f97316';
    ctx.fillRect(c - 3, c + 2, 6, 3);
  }
  // Head
  ctx.fillStyle = '#fde68a';
  ctx.fillRect(c - 3, c - 5, 6, 5);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(c - 3, c - 6, 6, 2);
  tex.refresh();
}

function drawChargerStallTexture(scene: Phaser.Scene, net: ChargerNetwork): void {
  const key = `charger_${net}`;
  if (scene.textures.exists(key)) return;
  const tex = scene.textures.createCanvas(key, 20, 20);
  if (!tex) return;
  const ctx = tex.getContext();
  ctx.imageSmoothingEnabled = false;

  const colors: Record<ChargerNetwork, { body: string; accent: string }> = {
    tesla: { body: '#f8fafc', accent: '#dc2626' },
    enbw: { body: '#1d4ed8', accent: '#f97316' },
    ewego: { body: '#15803d', accent: '#facc15' },
    electra: { body: '#5b21b6', accent: '#22d3ee' },
    ionity: { body: '#0f172a', accent: '#ec4899' },
    ac_village: { body: '#334155', accent: '#4ade80' }
  };

  const c = colors[net];
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(4, 4, 14, 14);
  ctx.fillStyle = c.body;
  ctx.fillRect(3, 2, 14, 14);
  ctx.fillStyle = c.accent;
  ctx.fillRect(5, 4, 10, 4);
  // Glowing status bar
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(6, 11, 8, 2);
  tex.refresh();
}

function drawLandmarkTexture(scene: Phaser.Scene, kind: LandmarkKind): void {
  const key = `landmark_${kind}`;
  if (scene.textures.exists(key)) return;
  const tex = scene.textures.createCanvas(key, 32, 32);
  if (!tex) return;
  const ctx = tex.getContext();
  ctx.imageSmoothingEnabled = false;

  if (kind === 'aachen_dom') {
    // Octagon + tall Gothic choir + spire
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(6, 18, 20, 11);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(9, 10, 14, 10);
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(14, 2, 4, 8);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(15, 1, 2, 2);
  } else if (kind === 'koeln_dom') {
    // Twin spires!
    ctx.fillStyle = '#64748b';
    ctx.fillRect(6, 16, 20, 13);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(8, 5, 5, 14);
    ctx.fillRect(19, 5, 5, 14);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(10, 2, 1, 4);
    ctx.fillRect(21, 2, 1, 4);
  } else if (kind === 'hermesturm') {
    // Hannover Messe tower
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(14, 4, 4, 25);
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(11, 8, 10, 4);
    ctx.fillStyle = '#f97316';
    ctx.fillRect(7, 22, 18, 7);
  } else if (kind === 'eiffel') {
    ctx.fillStyle = '#78716c';
    ctx.fillRect(15, 2, 2, 10);
    ctx.fillRect(13, 12, 6, 8);
    ctx.fillRect(9, 20, 14, 9);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(13, 23, 6, 6);
  } else if (kind === 'fernsehturm') {
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(15, 2, 2, 27);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(12, 8, 8, 6);
  } else if (kind === 'alps') {
    ctx.fillStyle = '#475569';
    ctx.fillRect(4, 18, 24, 11);
    ctx.fillRect(8, 11, 16, 9);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(11, 6, 10, 7);
    ctx.fillRect(14, 3, 4, 4);
  } else if (kind === 'nordkapp') {
    ctx.fillStyle = '#334155';
    ctx.fillRect(6, 20, 20, 9);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(11, 7, 10, 10);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(13, 9, 6, 6);
  } else if (kind === 'ferry') {
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(2, 22, 28, 7);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(6, 13, 20, 9);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(13, 8, 5, 5);
  } else if (kind === 'colosseum') {
    ctx.fillStyle = '#d6d3d1';
    ctx.fillRect(5, 13, 22, 16);
    ctx.fillStyle = '#78716c';
    ctx.fillRect(8, 17, 4, 6);
    ctx.fillRect(14, 17, 4, 6);
    ctx.fillRect(20, 17, 4, 6);
  } else {
    // highlands castle
    ctx.fillStyle = '#64748b';
    ctx.fillRect(6, 13, 20, 16);
    ctx.fillStyle = '#475569';
    ctx.fillRect(6, 9, 5, 6);
    ctx.fillRect(21, 9, 5, 6);
    ctx.fillStyle = '#15803d';
    ctx.fillRect(3, 25, 26, 4);
  }

  tex.refresh();
}

function drawMiscTextures(scene: Phaser.Scene): void {
  // Traffic light variants
  (['red', 'amber', 'green'] as const).forEach(state => {
    const key = `tlight_${state}`;
    if (scene.textures.exists(key)) return;
    const tex = scene.textures.createCanvas(key, 12, 24);
    if (!tex) return;
    const ctx = tex.getContext();
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(2, 1, 8, 22);
    ctx.fillStyle = state === 'red' ? '#ef4444' : '#450a0a';
    ctx.fillRect(4, 3, 4, 4);
    ctx.fillStyle = state === 'amber' ? '#facc15' : '#422006';
    ctx.fillRect(4, 10, 4, 4);
    ctx.fillStyle = state === 'green' ? '#22c55e' : '#052e16';
    ctx.fillRect(4, 17, 4, 4);
    tex.refresh();
  });

  // Construction cone
  if (!scene.textures.exists('cone')) {
    const tex = scene.textures.createCanvas('cone', 12, 12);
    if (tex) {
      const ctx = tex.getContext();
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(2, 2, 8, 8);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(4, 4, 4, 4);
      tex.refresh();
    }
  }

  // Tree
  if (!scene.textures.exists('pixel_tree')) {
    const tex = scene.textures.createCanvas('pixel_tree', 28, 28);
    if (tex) {
      const ctx = tex.getContext();
      ctx.fillStyle = 'rgba(0,0,0,0.28)';
      ctx.fillRect(6, 6, 20, 20);
      ctx.fillStyle = '#14532d';
      ctx.fillRect(4, 4, 20, 20);
      ctx.fillStyle = '#15803d';
      ctx.fillRect(6, 6, 16, 16);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(9, 8, 10, 10);
      tex.refresh();
    }
  }

  // McDonald's Pixel Kiosk
  if (!scene.textures.exists('mcd_kiosk')) {
    const tex = scene.textures.createCanvas('mcd_kiosk', 72, 48);
    if (tex) {
      const ctx = tex.getContext();
      ctx.fillStyle = 'rgba(0,0,0,0.32)';
      ctx.fillRect(4, 4, 66, 42);
      ctx.fillStyle = '#991b1b';
      ctx.fillRect(2, 2, 66, 40);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(5, 5, 60, 34);
      // Golden Arches "M"
      ctx.fillStyle = '#facc15';
      ctx.fillRect(22, 14, 5, 16);
      ctx.fillRect(32, 14, 5, 16);
      ctx.fillRect(42, 14, 5, 16);
      ctx.fillRect(22, 11, 25, 4);
      tex.refresh();
    }
  }

  // Rain drop & Confetti
  if (!scene.textures.exists('rain_drop')) {
    const tex = scene.textures.createCanvas('rain_drop', 2, 10);
    if (tex) {
      const ctx = tex.getContext();
      ctx.fillStyle = 'rgba(186, 230, 253, 0.72)';
      ctx.fillRect(0, 0, 2, 10);
      tex.refresh();
    }
  }

  if (!scene.textures.exists('confetti_px')) {
    const tex = scene.textures.createCanvas('confetti_px', 6, 6);
    if (tex) {
      const ctx = tex.getContext();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 6, 6);
      tex.refresh();
    }
  }
}

export function generateAllPixelTextures(scene: Phaser.Scene): void {
  VEHICLES.forEach(v => {
    drawTopDownCarTexture(scene, `car_${v.id}`, v.shape, v.primaryColor, v.accentColor);
  });

  drawTopDownCarTexture(scene, 'npc_sedan_blue', 'sedan_aero', 0x2563eb, 0x0f172a);
  drawTopDownCarTexture(scene, 'npc_compact_green', 'hatchback', 0x16a34a, 0xf8fafc);
  drawTopDownCarTexture(scene, 'npc_van_white', 'touring', 0xf1f5f9, 0x475569, { isVan: true });
  drawTopDownCarTexture(scene, 'npc_police', 'sedan_aero', 0xe2e8f0, 0x1d4ed8, { isPolice: true });
  drawTruckTexture(scene);

  drawCyclistTexture(scene, 'cyclist_0', '#ef4444');
  drawCyclistTexture(scene, 'cyclist_1', '#38bdf8');
  drawPedestrianTexture(scene, 'ped_adult_0', '#e11d48', false);
  drawPedestrianTexture(scene, 'ped_adult_1', '#0284c7', false);
  drawPedestrianTexture(scene, 'ped_child', '#facc15', true);

  (['tesla', 'enbw', 'ewego', 'electra', 'ionity', 'ac_village'] as ChargerNetwork[]).forEach(net => {
    drawChargerStallTexture(scene, net);
  });

  (
    [
      'aachen_dom',
      'koeln_dom',
      'hermesturm',
      'fernsehturm',
      'eiffel',
      'alps',
      'ferry',
      'nordkapp',
      'highlands',
      'colosseum'
    ] as LandmarkKind[]
  ).forEach(lm => drawLandmarkTexture(scene, lm));

  drawMiscTextures(scene);
}
