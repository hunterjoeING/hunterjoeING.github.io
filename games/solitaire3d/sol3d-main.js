// Main controller for 3D Klondike Solitaire: HUD, Pointer/Touch Drag & Drop, Auto-Complete & Arcade Integration

import { KlondikeEngine } from './sol3d-logic.js';
import { SolitaireScene } from './sol3d-scene.js';
import { SolitaireAudio } from './sol3d-audio.js';
import { GardenTipsWidget } from './sol3d-garden.js';
import { FELT_THEMES } from './sol3d-textures.js';

const PREF_FELT_KEY = 'sol3d_felt_theme';
const PREF_CAM_KEY = 'sol3d_cam_preset';
const PREF_DRAW_KEY = 'sol3d_draw_mode';

function formatTime(sec) {
  const s = Math.max(0, Math.floor(sec));
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

function loadPref(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (_) {
    return fallback;
  }
}

function savePref(key, val) {
  try {
    localStorage.setItem(key, String(val));
  } catch (_) {}
}

function initSolitaire3D() {
  const canvas = document.getElementById('sol3d-canvas');
  const stageEl = document.getElementById('sol3d-stage');

  const elTime = document.getElementById('hud-time');
  const elMoves = document.getElementById('hud-moves');
  const elScore = document.getElementById('hud-score');
  const elDrawBadge = document.getElementById('hud-draw-badge');

  const btnUndo = document.getElementById('btn-undo');
  const btnHint = document.getElementById('btn-hint');
  const btnAuto = document.getElementById('btn-auto');
  const btnCam = document.getElementById('btn-cam');
  const btnMenu = document.getElementById('btn-menu');
  const menuPopover = document.getElementById('sol3d-popover');

  const btnNewRandom = document.getElementById('menu-new-random');
  const btnRepeatDeal = document.getElementById('menu-repeat-deal');
  const btnDraw1 = document.getElementById('menu-draw-1');
  const btnDraw3 = document.getElementById('menu-draw-3');
  const feltSwatches = document.querySelectorAll('[data-felt-theme]');

  const winOverlay = document.getElementById('sol3d-win');
  const winStatsEl = document.getElementById('win-stats');
  const btnWinNew = document.getElementById('btn-win-new');
  const btnWinRepeat = document.getElementById('btn-win-repeat');
  const btnWinDismiss = document.getElementById('btn-win-dismiss');

  const engine = new KlondikeEngine();
  const scene = new SolitaireScene(canvas, stageEl);
  const audio = new SolitaireAudio();

  const garden = new GardenTipsWidget({
    cardEl: document.getElementById('garden-card'),
    seasonEl: document.getElementById('garden-season'),
    textEl: document.getElementById('garden-text'),
    nextBtnEl: document.getElementById('btn-garden-next'),
    toggleBtnEl: document.getElementById('btn-garden-toggle')
  });

  // Restore user preferences
  const savedFelt = FELT_THEMES[loadPref(PREF_FELT_KEY, 'smaragd')] ? loadPref(PREF_FELT_KEY, 'smaragd') : 'smaragd';
  const savedCam = loadPref(PREF_CAM_KEY, '3d') === 'top' ? 'top' : '3d';
  const savedDraw = loadPref(PREF_DRAW_KEY, '1') === '3' ? 3 : 1;

  scene.setFeltTheme(savedFelt);
  scene.setCameraPreset(savedCam);

  let elapsedSec = 0;
  let timerStarted = false;
  let timerInterval = null;
  let autoCompleting = false;
  let autoTimer = null;
  let runId = null;

  let pointerSession = null;
  let pendingStockClick = false;

  function syncMenuUI() {
    if (elDrawBadge) {
      elDrawBadge.textContent = `${engine.drawMode}er`;
    }
    if (btnDraw1 && btnDraw3) {
      btnDraw1.classList.toggle('active', engine.drawMode === 1);
      btnDraw3.classList.toggle('active', engine.drawMode === 3);
    }
    feltSwatches.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.feltTheme === scene.feltTheme);
    });
    if (btnCam) {
      btnCam.textContent = scene.cameraPreset === 'top' ? '📐 Steil' : '📐 Tisch-3D';
      btnCam.classList.toggle('active', scene.cameraPreset === 'top');
    }
  }

  function syncHud() {
    elTime.textContent = formatTime(elapsedSec);
    elMoves.textContent = String(engine.moves);
    elScore.textContent = String(engine.score);
    btnUndo.disabled = !engine.canUndo() || autoCompleting;
    btnHint.disabled = engine.won || autoCompleting;

    const showAuto = !autoCompleting && engine.canAutoComplete();
    btnAuto.classList.toggle('hidden', !showAuto);
  }

  function startTimerIfNeeded() {
    if (timerStarted || engine.won) return;
    timerStarted = true;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (!engine.won) {
        elapsedSec += 1;
        elTime.textContent = formatTime(elapsedSec);
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function startNewGame({ seed = null, drawMode = engine.drawMode } = {}) {
    clearTimeout(autoTimer);
    autoCompleting = false;
    stopTimer();
    elapsedSec = 0;
    timerStarted = false;
    pointerSession = null;
    pendingStockClick = false;

    scene.stopWaterfall();
    winOverlay.classList.add('hidden');

    engine.newGame({ drawMode, seed });
    runId = window.ArcadeScores ? window.ArcadeScores.newRunId('solitaire3d') : null;

    scene.syncState(engine, { dealAnimate: true, staggerMs: 24 });
    syncMenuUI();
    syncHud();

    // Subtle soft deal audio cascade if audio already unlocked
    for (let i = 0; i < 6; i++) {
      setTimeout(() => audio.cardSnap(), i * 70);
    }
  }

  function handleWin() {
    stopTimer();
    autoCompleting = false;
    const timeBonus = Math.max(100, Math.round(60000 / Math.max(25, elapsedSec)));
    const finalScore = engine.score + timeBonus;
    engine.score = finalScore;
    syncHud();

    audio.victory();
    scene.startWaterfall(engine);

    const timeStr = formatTime(elapsedSec);
    winStatsEl.innerHTML = `
      <div><span>Zeit</span><strong>${timeStr}</strong></div>
      <div><span>Züge</span><strong>${engine.moves}</strong></div>
      <div><span>Zeitbonus</span><strong>+${timeBonus}</strong></div>
      <div><span>Gesamt</span><strong>${finalScore}</strong></div>
    `;
    winOverlay.classList.remove('hidden');

    if (window.ArcadeScores) {
      window.ArcadeScores.record(
        'solitaire3d',
        finalScore,
        `${finalScore} Pkt · ${timeStr}`,
        false,
        { runId, meta: { time: elapsedSec, moves: engine.moves, drawMode: engine.drawMode } }
      );
    }
  }

  function afterMove(moveRes) {
    startTimerIfNeeded();
    if (moveRes.toFoundation) {
      audio.foundationChime(Math.max(0, moveRes.foundationStreak - 1));
    } else {
      audio.feltSlide();
    }
    if (moveRes.flippedCardId !== null) {
      setTimeout(() => audio.cardSnap(), 85);
    }
    scene.syncState(engine);
    syncHud();

    if (moveRes.won) {
      handleWin();
    }
  }

  function handleDrawStock() {
    if (autoCompleting || engine.won) return;
    const res = engine.drawFromStock();
    if (!res.ok) {
      audio.invalid();
      return;
    }
    startTimerIfNeeded();
    if (res.recycled) {
      audio.feltSlide();
    } else {
      res.cardIds.forEach((_, idx) => {
        setTimeout(() => audio.cardSnap(), idx * 65);
      });
    }
    scene.syncState(engine);
    syncHud();
  }

  function handleUndo() {
    if (!engine.canUndo() || autoCompleting) return;
    const res = engine.undo();
    if (!res.ok) return;
    audio.cardSnap();
    scene.syncState(engine);
    syncHud();
  }

  function handleHint() {
    if (engine.won || autoCompleting) return;
    const hint = engine.findHint();
    if (!hint) {
      audio.invalid();
      return;
    }
    audio.hint();
    scene.triggerHintPulse(hint);
  }

  function startAutoComplete() {
    if (autoCompleting || !engine.canAutoComplete()) return;
    autoCompleting = true;
    startTimerIfNeeded();
    syncHud();

    const tick = () => {
      if (!autoCompleting || engine.won) return;
      const step = engine.stepAutoComplete();
      if (step.done) {
        autoCompleting = false;
        syncHud();
        return;
      }
      if (step.kind === 'move') {
        audio.foundationChime(Math.max(0, step.res.foundationStreak - 1));
      } else {
        audio.cardSnap();
      }
      scene.syncState(engine);
      syncHud();

      if (engine.won) {
        handleWin();
        return;
      }
      autoTimer = setTimeout(tick, 95);
    };
    tick();
  }

  // Pointer & Touch Drag-and-Drop + Click Smart-Move
  canvas.addEventListener('pointerdown', (e) => {
    audio.unlock();
    if (!menuPopover.classList.contains('hidden')) {
      menuPopover.classList.add('hidden');
    }
    if (autoCompleting || engine.won) return;
    if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;

    pendingStockClick = false;
    pointerSession = null;

    const { hits } = scene.raycastFromClient(e.clientX, e.clientY, scene.hitMeshes);
    if (hits.length > 0) {
      const topHit = hits[0];
      const { pile } = topHit.object.userData;
      if (!pile) return;

      if (pile.type === 'stock') {
        pendingStockClick = true;
        return;
      }

      const stack = engine.getMovableStack(pile.type, pile.idx, pile.cardIdx);
      if (stack.valid) {
        pointerSession = {
          pointerId: e.pointerId,
          startX: e.clientX,
          startY: e.clientY,
          pile,
          stack,
          dragging: false,
          validDests: null,
          lastTarget: null
        };
        try {
          canvas.setPointerCapture(e.pointerId);
        } catch (_) {}
        return;
      }
    }

    // Check empty stock slot click for recycling waste
    const slotRes = scene.raycastFromClient(e.clientX, e.clientY, scene.slotHitMeshes);
    if (slotRes.hits.length > 0) {
      const meta = slotRes.hits[0].object.userData.slotMeta;
      if (meta && meta.type === 'stock') {
        pendingStockClick = true;
      }
    }
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!pointerSession) {
      if (e.pointerType === 'mouse' && !engine.won && !autoCompleting) {
        const { hits } = scene.raycastFromClient(e.clientX, e.clientY, scene.hitMeshes);
        let grab = false;
        if (hits.length > 0) {
          const { pile } = hits[0].object.userData;
          if (pile && (pile.type === 'stock' || engine.getMovableStack(pile.type, pile.idx, pile.cardIdx).valid)) {
            grab = true;
          }
        }
        canvas.style.cursor = grab ? 'grab' : 'default';
      }
      return;
    }
    if (e.pointerId !== pointerSession.pointerId) return;

    const dx = e.clientX - pointerSession.startX;
    const dy = e.clientY - pointerSession.startY;
    if (!pointerSession.dragging && Math.hypot(dx, dy) >= 7) {
      const pt = scene.raycastDragPlane(e.clientX, e.clientY);
      if (!pt) return;
      pointerSession.dragging = true;
      canvas.style.cursor = 'grabbing';
      pointerSession.validDests = engine.getValidDestinations(
        pointerSession.stack.cards,
        pointerSession.stack.source
      );
      scene.startDrag(pointerSession.stack.cards, pt);
      scene.setValidDropTargets(pointerSession.validDests, null);
      audio.cardPickup();
    }

    if (pointerSession.dragging) {
      const pt = scene.raycastDragPlane(e.clientX, e.clientY);
      if (!pt) return;
      scene.updateDragPoint(pt);
      const best = scene.getBestDropTarget(pt, pointerSession.validDests, engine);
      pointerSession.lastTarget = best;
      scene.setValidDropTargets(pointerSession.validDests, best ? best.key : null);
    }
  });

  function finishPointer(e) {
    if (pendingStockClick) {
      pendingStockClick = false;
      handleDrawStock();
      return;
    }
    if (!pointerSession || e.pointerId !== pointerSession.pointerId) return;
    const sess = pointerSession;
    pointerSession = null;
    canvas.style.cursor = 'default';
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch (_) {}

    if (sess.dragging) {
      const pt = scene.raycastDragPlane(e.clientX, e.clientY);
      const target = pt ? scene.getBestDropTarget(pt, sess.validDests, engine) : sess.lastTarget;
      scene.endDrag();

      if (target) {
        const res = engine.executeMove(sess.stack.cards, sess.stack.source, target);
        if (res.ok) {
          afterMove(res);
          return;
        }
      }
      audio.invalid();
      scene.syncState(engine);
      return;
    }

    // Tap / Click without drag -> smart auto-move
    const smart = engine.findSmartTarget(sess.pile.type, sess.pile.idx, sess.pile.cardIdx);
    if (smart) {
      const res = engine.executeMove(smart.stack.cards, smart.stack.source, smart.target);
      if (res.ok) {
        afterMove(res);
        return;
      }
    }
    audio.invalid();
  }

  canvas.addEventListener('pointerup', finishPointer);
  canvas.addEventListener('pointercancel', finishPointer);

  // HUD & Menu Buttons
  btnUndo.addEventListener('click', () => {
    audio.unlock();
    handleUndo();
  });

  btnHint.addEventListener('click', () => {
    audio.unlock();
    handleHint();
  });

  btnAuto.addEventListener('click', () => {
    audio.unlock();
    startAutoComplete();
  });

  btnCam.addEventListener('click', () => {
    audio.unlock();
    const nextCam = scene.cameraPreset === '3d' ? 'top' : '3d';
    scene.setCameraPreset(nextCam);
    savePref(PREF_CAM_KEY, nextCam);
    syncMenuUI();
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  });

  btnMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    audio.unlock();
    menuPopover.classList.toggle('hidden');
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  });

  document.addEventListener('pointerdown', (e) => {
    if (!menuPopover.classList.contains('hidden')) {
      if (!menuPopover.contains(e.target) && e.target !== btnMenu && !btnMenu.contains(e.target)) {
        menuPopover.classList.add('hidden');
      }
    }
  });

  btnNewRandom.addEventListener('click', () => {
    menuPopover.classList.add('hidden');
    startNewGame({ seed: null });
  });

  btnRepeatDeal.addEventListener('click', () => {
    menuPopover.classList.add('hidden');
    startNewGame({ seed: engine.seed });
  });

  btnDraw1.addEventListener('click', () => {
    menuPopover.classList.add('hidden');
    if (engine.drawMode === 1) return;
    savePref(PREF_DRAW_KEY, '1');
    startNewGame({ drawMode: 1 });
  });

  btnDraw3.addEventListener('click', () => {
    menuPopover.classList.add('hidden');
    if (engine.drawMode === 3) return;
    savePref(PREF_DRAW_KEY, '3');
    startNewGame({ drawMode: 3 });
  });

  feltSwatches.forEach((btn) => {
    btn.addEventListener('click', () => {
      const themeId = btn.dataset.feltTheme;
      scene.setFeltTheme(themeId);
      savePref(PREF_FELT_KEY, themeId);
      syncMenuUI();
      if (window.ArcadeAudio) window.ArcadeAudio.click();
    });
  });

  btnWinNew.addEventListener('click', () => startNewGame({ seed: null }));
  btnWinRepeat.addEventListener('click', () => startNewGame({ seed: engine.seed }));
  btnWinDismiss.addEventListener('click', () => winOverlay.classList.add('hidden'));

  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    const ae = document.activeElement;
    if ((ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.tagName === 'SELECT')) ||
        document.querySelector('.arcade-modal-backdrop, #abm-drawer.open')) {
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      handleUndo();
    } else if (e.key.toLowerCase() === 'h') {
      handleHint();
    } else if (e.key === 'Escape') {
      menuPopover.classList.add('hidden');
    }
  });

  window.addEventListener('resize', () => scene.resize());
  if (window.ResizeObserver) {
    new ResizeObserver(() => scene.resize()).observe(stageEl);
  }

  // Start initial game & animation loop
  startNewGame({ drawMode: savedDraw });

  let lastTime = performance.now();
  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;
    scene.update(dt, now);
  }
  requestAnimationFrame(frame);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSolitaire3D);
} else {
  initSolitaire3D();
}
