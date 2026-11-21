import { BreakActivityKind } from '../types';

export function playBreakPixelAnimation(
  canvas: HTMLCanvasElement,
  kind: BreakActivityKind,
  durationMs: number,
  onDone: () => void
): () => void {
  const w = 140;
  const h = 56;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    const t = window.setTimeout(onDone, 250);
    return () => window.clearTimeout(t);
  }
  ctx.imageSmoothingEnabled = false;

  const start = performance.now();
  let rafId = 0;
  let stopped = false;

  const drawChar = (x: number, y: number, shirt: string, hair = '#1e293b', walkTick = 0) => {
    const legOff = Math.sin(walkTick) > 0 ? 1 : -1;
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(x - 3, y + 8, 8, 2);
    // Legs
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x - 2, y + 4 + (walkTick ? Math.max(0, legOff) : 0), 2, 4);
    ctx.fillRect(x + 2, y + 4 + (walkTick ? Math.max(0, -legOff) : 0), 2, 4);
    // Torso
    ctx.fillStyle = shirt;
    ctx.fillRect(x - 3, y - 2, 8, 6);
    // Head
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(x - 2, y - 7, 6, 5);
    ctx.fillStyle = hair;
    ctx.fillRect(x - 2, y - 8, 6, 2);
  };

  const drawHeart = (x: number, y: number, col = '#f43f5e') => {
    ctx.fillStyle = col;
    ctx.fillRect(x - 2, y - 1, 2, 2);
    ctx.fillRect(x + 1, y - 1, 2, 2);
    ctx.fillRect(x - 1, y, 3, 2);
    ctx.fillRect(x, y + 2, 1, 1);
  };

  const renderFrame = (now: number) => {
    if (stopped) return;
    const elapsed = now - start;
    const p = Math.min(1, elapsed / durationMs);
    const tick = elapsed * 0.012;

    // Sky & ground backdrop
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, w, 36);
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 36, w, 20);
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, 36, w, 2);

    if (kind === 'eat') {
      // Cozy roadside bistro booth
      ctx.fillStyle = '#7c2d12';
      ctx.fillRect(14, 12, 48, 24);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(12, 9, 52, 5);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(32, 10, 12, 3);
      // Table + bench
      ctx.fillStyle = '#92400e';
      ctx.fillRect(78, 28, 36, 4);
      ctx.fillRect(84, 32, 4, 7);
      ctx.fillRect(104, 32, 4, 7);
      // Character seated
      drawChar(76, 26, '#0284c7');
      // Pixel burger & coffee
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(88, 24, 8, 4);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(88, 25, 8, 1);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(101, 23, 5, 5);
      // Animated steam
      const sy = Math.floor((tick * 1.4) % 8);
      ctx.fillStyle = 'rgba(226,232,240,0.75)';
      ctx.fillRect(102, 20 - sy, 1, 2);
      ctx.fillRect(104, 18 - sy, 1, 2);
      if (p > 0.35) drawHeart(96, 13 - Math.round(Math.sin(tick) * 2), '#4ade80');
    } else if (kind === 'toilet') {
      // Clean WC / Sanifair station
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(76, 10, 44, 28);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(74, 8, 48, 5);
      // WC label sign
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(86, 15, 24, 7);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(90, 17, 16, 3);
      // Door
      ctx.fillStyle = p > 0.35 && p < 0.78 ? '#0f172a' : '#475569';
      ctx.fillRect(92, 24, 12, 14);
      // Character walks to door, enters, exits refreshed
      if (p <= 0.35) {
        const cx = Math.round(24 + (p / 0.35) * 66);
        drawChar(cx, 32, '#0284c7', '#1e293b', tick);
      } else if (p < 0.75) {
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(108, 17, 4, 4);
      } else {
        const cx = Math.round(92 - ((p - 0.75) / 0.25) * 35);
        drawChar(cx, 32, '#0284c7', '#1e293b', tick);
        drawHeart(cx, 17, '#22c55e');
      }
    } else if (kind === 'dog') {
      // Grass park strip & trees
      ctx.fillStyle = '#14532d';
      ctx.fillRect(0, 34, w, 22);
      ctx.fillStyle = '#15803d';
      ctx.fillRect(0, 36, w, 18);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(110, 22, 5, 16);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(103, 10, 19, 14);
      // Hydrant
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(26, 31, 4, 7);

      const walkX = Math.round(28 + Math.sin(p * Math.PI) * 58);
      drawChar(walkX, 32, '#0284c7', '#1e293b', tick);
      // Leash
      const dogX = walkX + 18;
      const dogBob = Math.round(Math.abs(Math.sin(tick * 1.4)) * 2);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(walkX + 4, 33, 12, 1);
      // Cute pixel dog
      ctx.fillStyle = '#d97706';
      ctx.fillRect(dogX, 34 - dogBob, 10, 5);
      ctx.fillRect(dogX + 7, 31 - dogBob, 5, 4);
      ctx.fillRect(dogX + 1, 39 - dogBob, 2, 2);
      ctx.fillRect(dogX + 7, 39 - dogBob, 2, 2);
      // Wagging tail
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(dogX - 2, 32 - dogBob + (Math.sin(tick * 3) > 0 ? 0 : 1), 2, 2);
      drawHeart(dogX + 6, 22 - Math.round(Math.sin(tick) * 2));
    } else if (kind === 'children') {
      // Park turf & playground slide
      ctx.fillStyle = '#166534';
      ctx.fillRect(0, 35, w, 21);
      // Slide structure
      ctx.fillStyle = '#e11d48';
      ctx.fillRect(36, 16, 4, 22);
      ctx.fillStyle = '#facc15';
      for (let i = 0; i < 16; i++) {
        ctx.fillRect(40 + i * 2, 18 + i, 4, 3);
      }
      // Swing frame
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(95, 12, 28, 3);
      ctx.fillRect(95, 12, 3, 25);
      ctx.fillRect(120, 12, 3, 25);

      // Kid 1 sliding!
      const slideT = (p * 1.8) % 1;
      const k1x = Math.round(38 + slideT * 34);
      const k1y = Math.round(14 + slideT * 18);
      drawChar(k1x, k1y, '#f97316', '#fde047');

      // Kid 2 swinging!
      const swingOff = Math.round(Math.sin(tick * 1.5) * 6);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(108 + swingOff, 15, 1, 14);
      drawChar(108 + swingOff, 29, '#a855f7', '#78350f');
      drawHeart(76, 12 - Math.round(Math.sin(tick) * 2), '#facc15');
    } else if (kind === 'shopping') {
      // Boutique storefront
      ctx.fillStyle = '#4c1d95';
      ctx.fillRect(20, 8, 56, 30);
      ctx.fillStyle = '#f472b6';
      ctx.fillRect(18, 6, 60, 5);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(28, 15, 22, 12);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(54, 20, 14, 18);
      // Shop sign
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(26, 8, 28, 3);

      // Wife walking out with shopping bags
      const wx = Math.round(60 + p * 44);
      drawChar(wx, 32, '#ec4899', '#92400e', tick);
      // Shopping bags
      ctx.fillStyle = '#facc15';
      ctx.fillRect(wx - 7, 32, 4, 6);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(wx + 5, 32, 4, 6);
      drawHeart(wx, 17 - Math.round(Math.sin(tick) * 2), '#f472b6');
    }

    if (elapsed >= durationMs) {
      stopped = true;
      onDone();
      return;
    }
    rafId = window.requestAnimationFrame(renderFrame);
  };

  rafId = window.requestAnimationFrame(renderFrame);
  return () => {
    stopped = true;
    if (rafId) window.cancelAnimationFrame(rafId);
  };
}
