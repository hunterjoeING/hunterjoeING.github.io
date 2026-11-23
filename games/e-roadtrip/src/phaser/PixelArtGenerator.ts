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

function drawNetworkLogoTexture(scene: Phaser.Scene, net: ChargerNetwork): void {
  const key = `logo_${net}`;
  if (scene.textures.exists(key)) return;
  const tex = scene.textures.createCanvas(key, 28, 28);
  if (!tex) return;
  const ctx = tex.getContext();
  ctx.imageSmoothingEnabled = false;

  // Crisp rounded-pixel badge frame
  const bgMap: Record<ChargerNetwork, string> = {
    tesla: '#dc2626',
    enbw: '#1d4ed8',
    ewego: '#15803d',
    electra: '#6d28d9',
    ionity: '#0f172a',
    ac_village: '#0f766e'
  };

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(1, 1, 26, 26);
  ctx.fillStyle = bgMap[net];
  ctx.fillRect(2, 2, 24, 24);
  ctx.fillStyle = 'rgba(255,255,255,0.16)';
  ctx.fillRect(2, 2, 24, 3);

  if (net === 'tesla') {
    // Crisp white Tesla "T" emblem
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(6, 6, 16, 2);
    ctx.fillRect(8, 9, 12, 2);
    ctx.fillRect(12, 10, 4, 12);
    ctx.fillRect(13, 21, 2, 2);
  } else if (net === 'enbw') {
    // Blue badge with orange/yellow lightning + E bar
    ctx.fillStyle = '#f97316';
    ctx.fillRect(4, 19, 20, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(7, 6, 4, 11);
    ctx.fillRect(7, 6, 10, 2);
    ctx.fillRect(7, 10, 8, 2);
    ctx.fillRect(7, 15, 10, 2);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(19, 6, 3, 5);
    ctx.fillRect(17, 10, 4, 3);
    ctx.fillRect(18, 13, 3, 4);
  } else if (net === 'ewego') {
    // Green badge with bright yellow plug / EWE bars
    ctx.fillStyle = '#facc15';
    ctx.fillRect(6, 7, 16, 3);
    ctx.fillRect(6, 12, 12, 3);
    ctx.fillRect(6, 17, 16, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(20, 11, 3, 6);
  } else if (net === 'electra') {
    // Purple badge with neon cyan stylized bolt/E
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(13, 5, 6, 3);
    ctx.fillRect(10, 8, 6, 3);
    ctx.fillRect(8, 11, 11, 3);
    ctx.fillRect(12, 14, 6, 3);
    ctx.fillRect(10, 17, 5, 5);
  } else if (net === 'ionity') {
    // Dark navy badge with magenta/cyan IONITY ring
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(8, 5, 12, 3);
    ctx.fillRect(8, 20, 12, 3);
    ctx.fillRect(5, 8, 3, 12);
    ctx.fillRect(20, 8, 3, 12);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(12, 10, 4, 8);
  } else {
    // AC Village: white AC plug & green "AC" indicator
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(9, 6, 3, 5);
    ctx.fillRect(16, 6, 3, 5);
    ctx.fillRect(7, 11, 14, 7);
    ctx.fillRect(12, 18, 4, 5);
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(10, 13, 8, 3);
  }

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
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(6, 18, 20, 11);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(9, 10, 14, 10);
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(14, 2, 4, 8);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(15, 1, 2, 2);
  } else if (kind === 'koeln_dom') {
    ctx.fillStyle = '#64748b';
    ctx.fillRect(6, 16, 20, 13);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(8, 5, 5, 14);
    ctx.fillRect(19, 5, 5, 14);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(10, 2, 1, 4);
    ctx.fillRect(21, 2, 1, 4);
  } else if (kind === 'hermesturm') {
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
  } else if (kind === 'frankfurt_skyline') {
    ctx.fillStyle = '#475569';
    ctx.fillRect(5, 14, 6, 15);
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(12, 5, 7, 24);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(15, 2, 1, 3);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(20, 11, 7, 18);
  } else if (kind === 'hamburger_michel') {
    ctx.fillStyle = '#b45309';
    ctx.fillRect(10, 16, 12, 13);
    ctx.fillStyle = '#14b8a6';
    ctx.fillRect(12, 7, 8, 9);
    ctx.fillRect(15, 3, 2, 4);
  } else if (kind === 'munich_frauenkirche') {
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(7, 15, 18, 14);
    ctx.fillStyle = '#15803d';
    ctx.fillRect(9, 8, 4, 7);
    ctx.fillRect(19, 8, 4, 7);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(10, 6, 2, 2);
    ctx.fillRect(20, 6, 2, 2);
  } else if (kind === 'atomium') {
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(14, 5, 4, 22);
    ctx.fillRect(7, 14, 18, 3);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(13, 4, 6, 5);
    ctx.fillRect(6, 13, 5, 5);
    ctx.fillRect(21, 13, 5, 5);
    ctx.fillRect(13, 22, 6, 5);
  } else if (kind === 'windmills_nl') {
    ctx.fillStyle = '#92400e';
    ctx.fillRect(12, 14, 8, 15);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(15, 4, 2, 16);
    ctx.fillRect(8, 11, 16, 2);
  } else if (kind === 'big_ben') {
    ctx.fillStyle = '#d97706';
    ctx.fillRect(12, 7, 8, 22);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(13, 10, 6, 5);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(14, 2, 4, 5);
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

  // Confetti
  if (!scene.textures.exists('confetti_px')) {
    const tex = scene.textures.createCanvas('confetti_px', 6, 6);
    if (tex) {
      const ctx = tex.getContext();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 6, 6);
      tex.refresh();
    }
  }

  // Pixel Driver Character (exits car to plug in charging cable)
  if (!scene.textures.exists('ped_driver')) {
    const tex = scene.textures.createCanvas('ped_driver', 18, 18);
    if (tex) {
      const ctx = tex.getContext();
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(5, 6, 9, 9);
      // Jacket (bright blue/cyan)
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(4, 6, 10, 7);
      // Arms
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(3, 7, 2, 5);
      ctx.fillRect(13, 7, 2, 5);
      // Head
      ctx.fillStyle = '#fde68a';
      ctx.fillRect(6, 4, 6, 5);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(6, 3, 6, 2);
      tex.refresh();
    }
  }

  // Streetlamp pole + lamp head
  if (!scene.textures.exists('streetlamp')) {
    const tex = scene.textures.createCanvas('streetlamp', 16, 16);
    if (tex) {
      const ctx = tex.getContext();
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = '#475569';
      ctx.fillRect(7, 6, 2, 9);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(5, 3, 6, 4);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(6, 4, 4, 2);
      tex.refresh();
    }
  }

  // Wheel stop bumper for head-in charging bays
  if (!scene.textures.exists('wheel_stop')) {
    const tex = scene.textures.createCanvas('wheel_stop', 28, 6);
    if (tex) {
      const ctx = tex.getContext();
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 28, 6);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(2, 1, 6, 4);
      ctx.fillRect(11, 1, 6, 4);
      ctx.fillRect(20, 1, 6, 4);
      tex.refresh();
    }
  }

  // Park fountain
  if (!scene.textures.exists('park_fountain')) {
    const tex = scene.textures.createCanvas('park_fountain', 48, 48);
    if (tex) {
      const ctx = tex.getContext();
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = 'rgba(0,0,0,0.28)';
      ctx.fillRect(6, 6, 38, 38);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(4, 4, 40, 40);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(8, 8, 32, 32);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(14, 14, 20, 20);
      ctx.fillStyle = '#e0f2fe';
      ctx.fillRect(21, 21, 6, 6);
      tex.refresh();
    }
  }

  // Bistro / Coffee Shop Kiosk
  if (!scene.textures.exists('bistro_kiosk')) {
    const tex = scene.textures.createCanvas('bistro_kiosk', 64, 44);
    if (tex) {
      const ctx = tex.getContext();
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(4, 4, 58, 38);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(2, 2, 58, 36);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(5, 5, 52, 30);
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(10, 10, 42, 6);
      ctx.fillStyle = '#f97316';
      ctx.fillRect(12, 20, 14, 10);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(32, 20, 18, 10);
      tex.refresh();
    }
  }

  // GTA2 additive soft radial glow sprite (tinted per light source)
  if (!scene.textures.exists('light_glow_soft')) {
    const tex = scene.textures.createCanvas('light_glow_soft', 128, 128);
    if (tex) {
      const ctx = tex.getContext();
      const grad = ctx.createRadialGradient(64, 64, 2, 64, 64, 64);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.22, 'rgba(255, 255, 255, 0.72)');
      grad.addColorStop(0.55, 'rgba(255, 255, 255, 0.22)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      tex.refresh();
    }
  }

  // GTA2 additive dual-headlight volumetric beam cone (pointing UP / North)
  if (!scene.textures.exists('headlight_cone')) {
    const tex = scene.textures.createCanvas('headlight_cone', 96, 176);
    if (tex) {
      const ctx = tex.getContext();
      const drawBeam = (ox: number) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(ox - 3, 170);
        ctx.lineTo(ox + 3, 170);
        ctx.lineTo(ox + 30, 8);
        ctx.lineTo(ox - 30, 8);
        ctx.closePath();
        const grad = ctx.createLinearGradient(ox, 172, ox, 6);
        grad.addColorStop(0, 'rgba(255, 252, 224, 0.92)');
        grad.addColorStop(0.32, 'rgba(254, 240, 138, 0.45)');
        grad.addColorStop(0.75, 'rgba(254, 249, 195, 0.14)');
        grad.addColorStop(1, 'rgba(254, 249, 195, 0)');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      };
      drawBeam(38);
      drawBeam(58);
      // Soft merged outer halo
      const halo = ctx.createRadialGradient(48, 152, 4, 48, 108, 66);
      halo.addColorStop(0, 'rgba(255, 253, 232, 0.38)');
      halo.addColorStop(0.55, 'rgba(254, 240, 138, 0.12)');
      halo.addColorStop(1, 'rgba(254, 240, 138, 0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, 96, 176);
      tex.refresh();
    }
  }

  // Wet-asphalt elongated specular shimmer reflection
  if (!scene.textures.exists('wet_shimmer')) {
    const tex = scene.textures.createCanvas('wet_shimmer', 48, 96);
    if (tex) {
      const ctx = tex.getContext();
      const grad = ctx.createRadialGradient(24, 48, 2, 24, 48, 46);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.35)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.save();
      ctx.translate(24, 48);
      ctx.scale(0.55, 1);
      ctx.beginPath();
      ctx.arc(0, 0, 46, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      // Subtle wet ripple horizontal streaks
      ctx.globalCompositeOperation = 'destination-out';
      for (let y = 6; y < 92; y += 5) {
        ctx.fillStyle = 'rgba(0,0,0,0.42)';
        ctx.fillRect(0, y, 48, 2);
      }
      ctx.globalCompositeOperation = 'source-over';
      tex.refresh();
    }
  }

  // Crisp angled rain streak for GTA2 wet streets
  if (!scene.textures.exists('rain_streak')) {
    const tex = scene.textures.createCanvas('rain_streak', 6, 26);
    if (tex) {
      const ctx = tex.getContext();
      const grad = ctx.createLinearGradient(5, 0, 1, 26);
      grad.addColorStop(0, 'rgba(186, 230, 253, 0)');
      grad.addColorStop(0.55, 'rgba(186, 230, 253, 0.55)');
      grad.addColorStop(1, 'rgba(224, 242, 254, 0.95)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(1, 26);
      ctx.stroke();
      tex.refresh();
    }
  }

  // Wet-asphalt rain splash ripple
  if (!scene.textures.exists('rain_splash')) {
    const tex = scene.textures.createCanvas('rain_splash', 14, 14);
    if (tex) {
      const ctx = tex.getContext();
      ctx.imageSmoothingEnabled = false;
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.85)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(7, 7, 5, 0, Math.PI * 2);
      ctx.stroke();
      tex.refresh();
    }
  }

  paintSoftSpot(scene, 'grass_clod', 8, 8, ctx => {
    ctx.fillStyle = '#4d7c0f';
    ctx.fillRect(1, 2, 5, 4);
    ctx.fillStyle = '#365314';
    ctx.fillRect(2, 1, 3, 2);
    ctx.fillStyle = '#a16207';
    ctx.fillRect(3, 5, 3, 2);
  });
  paintSoftSpot(scene, 'spray_puff', 32, 32, ctx => {
    const g = ctx.createRadialGradient(16, 16, 2, 16, 16, 15);
    g.addColorStop(0, 'rgba(224,242,254,0.9)');
    g.addColorStop(1, 'rgba(186,230,253,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(16, 16, 15, 0, Math.PI * 2);
    ctx.fill();
  });
  paintSoftSpot(scene, 'turbine_blades', 64, 64, ctx => {
    ctx.translate(32, 32);
    ctx.fillStyle = '#e2e8f0';
    for (let i = 0; i < 3; i++) {
      ctx.rotate((Math.PI * 2) / 3);
      ctx.fillRect(-3, -2, 6, 28);
    }
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();
  });
  paintSoftSpot(scene, 'blink_lamp', 12, 12, ctx => {
    const g = ctx.createRadialGradient(6, 6, 1, 6, 6, 6);
    g.addColorStop(0, 'rgba(251,191,36,0.95)');
    g.addColorStop(1, 'rgba(251,191,36,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 12, 12);
  });
  paintSoftSpot(scene, 'beacon_lamp', 14, 14, ctx => {
    const g = ctx.createRadialGradient(7, 7, 1, 7, 7, 7);
    g.addColorStop(0, 'rgba(250,204,21,1)');
    g.addColorStop(0.45, 'rgba(249,115,22,0.8)');
    g.addColorStop(1, 'rgba(249,115,22,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 14, 14);
  });
  paintSoftSpot(scene, 'baustelle_bake', 12, 22, ctx => {
    ctx.fillStyle = '#f97316';
    ctx.fillRect(1, 0, 10, 22);
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(1, 6);
    ctx.lineTo(11, 0);
    ctx.lineTo(11, 6);
    ctx.lineTo(1, 12);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(1, 16);
    ctx.lineTo(11, 10);
    ctx.lineTo(11, 16);
    ctx.lineTo(1, 22);
    ctx.fill();
  });
}

function paintSoftSpot(
  scene: Phaser.Scene,
  key: string,
  w: number,
  h: number,
  draw: (ctx: CanvasRenderingContext2D) => void
): void {
  if (scene.textures.exists(key)) return;
  const tex = scene.textures.createCanvas(key, w, h);
  if (!tex) return;
  draw(tex.getContext());
  tex.refresh();
}

export function generateAllPixelTextures(scene: Phaser.Scene): void {
  VEHICLES.forEach(v => {
    drawTopDownCarTexture(scene, `car_${v.id}`, v.shape, v.primaryColor, v.accentColor);
  });

  drawTopDownCarTexture(scene, 'npc_sedan_blue', 'sedan_aero', 0x2563eb, 0x0f172a);
  drawTopDownCarTexture(scene, 'npc_compact_green', 'hatchback', 0x16a34a, 0xf8fafc);
  drawTopDownCarTexture(scene, 'npc_van_white', 'touring', 0xf1f5f9, 0x475569, { isVan: true });
  drawTopDownCarTexture(scene, 'npc_police', 'sedan_aero', 0xe2e8f0, 0x1d4ed8, { isPolice: true });
  drawTopDownCarTexture(scene, 'npc_fast_red', 'sport', 0xdc2626, 0x111827);
  drawTopDownCarTexture(scene, 'npc_fast_black', 'sedan_aero', 0x111827, 0xef4444);
  drawTruckTexture(scene);

  drawCyclistTexture(scene, 'cyclist_0', '#ef4444');
  drawCyclistTexture(scene, 'cyclist_1', '#38bdf8');
  drawPedestrianTexture(scene, 'ped_adult_0', '#e11d48', false);
  drawPedestrianTexture(scene, 'ped_adult_1', '#0284c7', false);
  drawPedestrianTexture(scene, 'ped_child', '#facc15', true);

  (['tesla', 'enbw', 'ewego', 'electra', 'ionity', 'ac_village'] as ChargerNetwork[]).forEach(net => {
    drawChargerStallTexture(scene, net);
    drawNetworkLogoTexture(scene, net);
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
      'colosseum',
      'frankfurt_skyline',
      'hamburger_michel',
      'munich_frauenkirche',
      'atomium',
      'windmills_nl',
      'big_ben'
    ] as LandmarkKind[]
  ).forEach(lm => drawLandmarkTexture(scene, lm));

  drawMiscTextures(scene);

  // Preserve crisp nearest-neighbor filtering on pixel-art sprites even when global antialias is on
  const nearestKeys = [
    ...VEHICLES.map(v => `car_${v.id}`),
    'npc_sedan_blue',
    'npc_compact_green',
    'npc_van_white',
    'npc_police',
    'npc_fast_red',
    'npc_fast_black',
    'npc_truck',
    'grass_clod',
    'turbine_blades',
    'baustelle_bake',
    'cyclist_0',
    'cyclist_1',
    'ped_adult_0',
    'ped_adult_1',
    'ped_child',
    'ped_driver',
    'streetlamp',
    'wheel_stop',
    'park_fountain',
    'bistro_kiosk',
    'tlight_red',
    'tlight_amber',
    'tlight_green',
    'cone',
    'pixel_tree',
    'mcd_kiosk',
    'rain_drop',
    'confetti_px'
  ];
  nearestKeys.forEach(k => {
    const tex = scene.textures.get(k);
    if (tex && tex.key !== '__MISSING') {
      tex.setFilter(Phaser.Textures.FilterMode.NEAREST);
    }
  });
}
