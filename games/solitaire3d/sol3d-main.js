// Main controller for 3D Spider Solitaire (4 Suits): Fullscreen, Zoom, HUD, Pointer/Touch Drag & Drop & Arcade Integration

import { SpiderEngine, SUITS } from './sol3d-logic.js';
import { SolitaireScene } from './sol3d-scene.js';
import { SolitaireAudio } from './sol3d-audio.js';

const PREF_CAM_KEY = 'sol3d_cam_preset';
const PREF_ZOOM_KEY = 'sol3d_zoom';
const PREF_TABLE_SURFACE_KEY = 'sol3d_table_surface';
const PREF_TABLE_COLOR_KEY = 'sol3d_table_color';
const PREF_TARGET_HELP_KEY = 'sol3d_target_help';

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
  const elSeq = document.getElementById('hud-seq');
  const elToast = document.getElementById('sol3d-toast');

  const btnUndo = document.getElementById('btn-undo');
  const btnHint = document.getElementById('btn-hint');
  const btnTargetHelp = document.getElementById('btn-target-help');
  const btnDeal = document.getElementById('btn-deal');
  const elDealBadge = document.getElementById('hud-deal-badge');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const elZoomVal = document.getElementById('hud-zoom-val');
  const btnCam = document.getElementById('btn-cam');
  const btnTableTheme = document.getElementById('btn-table-theme');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const btnMenu = document.getElementById('btn-menu');
  const menuPopover = document.getElementById('sol3d-popover');

  const tablePopover = document.getElementById('sol3d-table-popover');
  const btnCloseTablePop = document.getElementById('btn-close-table-pop');
  const surfaceChips = document.querySelectorAll('.surface-chip');
  const colorSwatches = document.querySelectorAll('.color-swatch');
  const customColorInput = document.getElementById('table-custom-color');

  const btnNewRandom = document.getElementById('menu-new-random');
  const btnRepeatDeal = document.getElementById('menu-repeat-deal');

  const winOverlay = document.getElementById('sol3d-win');
  const winStatsEl = document.getElementById('win-stats');
  const btnWinNew = document.getElementById('btn-win-new');
  const btnWinRepeat = document.getElementById('btn-win-repeat');
  const btnWinDismiss = document.getElementById('btn-win-dismiss');

  let currentSurface = loadPref(PREF_TABLE_SURFACE_KEY, 'filz');
  let currentColor = loadPref(PREF_TABLE_COLOR_KEY, '#134d34');
  let targetHelpActive = loadPref(PREF_TARGET_HELP_KEY, '0') === '1'; // strictly false by default

  const engine = new SpiderEngine();
  const scene = new SolitaireScene(canvas, stageEl, currentSurface, currentColor);
  const audio = new SolitaireAudio();

  const savedCam = loadPref(PREF_CAM_KEY, '3d') === 'top' ? 'top' : '3d';
  const savedZoom = parseFloat(loadPref(PREF_ZOOM_KEY, '1.0'));
  scene.setCameraPreset(savedCam);
  if (!Number.isNaN(savedZoom)) {
    scene.setZoom(savedZoom);
  }
  scene.resize();

  let elapsedSec = 0;
  let timerStarted = false;
  let timerInterval = null;
  let runId = null;
  let toastTimer = null;

  let pointerSession = null;
  let pendingStockClick = null;

  function showToast(msg, durationMs = 2600) {
    if (!elToast) return;
    elToast.textContent = msg;
    elToast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      elToast.classList.add('hidden');
    }, durationMs);
  }

  function isNativeFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
  }

  function isFullscreenActive() {
    return isNativeFullscreen() || document.body.classList.contains('sol3d-pseudo-fs');
  }

  function syncFullscreenUI() {
    const active = isFullscreenActive();
    document.body.classList.toggle('sol3d-is-fs', isNativeFullscreen());
    if (btnFullscreen) {
      btnFullscreen.textContent = active ? '✕ Beenden' : '⛶ Vollbild';
      btnFullscreen.classList.toggle('active', active);
    }
    scene.resize();
    requestAnimationFrame(() => scene.resize());
    setTimeout(() => scene.resize(), 90);
  }

  async function toggleFullscreen() {
    if (isFullscreenActive()) {
      document.body.classList.remove('sol3d-pseudo-fs');
      if (isNativeFullscreen()) {
        try {
          if (document.exitFullscreen) await document.exitFullscreen();
          else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        } catch (_) {}
      }
      syncFullscreenUI();
      return;
    }

    const target = document.documentElement;
    let enteredNative = false;
    try {
      if (target.requestFullscreen) {
        await target.requestFullscreen();
        enteredNative = true;
      } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen();
        enteredNative = true;
      }
    } catch (_) {
      enteredNative = false;
    }

    if (!enteredNative) {
      document.body.classList.add('sol3d-pseudo-fs');
    }
    syncFullscreenUI();
  }

  function syncTargetHelpUI() {
    if (btnTargetHelp) {
      btnTargetHelp.textContent = targetHelpActive ? '🎯 Hilfe aktiv' : '🎯 Hilfe aktivieren';
      btnTargetHelp.classList.toggle('active', targetHelpActive);
    }
  }

  function syncTableThemeUI() {
    surfaceChips.forEach((chip) => {
      chip.classList.toggle('active', chip.dataset.surface === currentSurface);
    });
    colorSwatches.forEach((swatch) => {
      swatch.classList.toggle('active', swatch.dataset.color.toLowerCase() === currentColor.toLowerCase());
    });
    if (customColorInput) {
      customColorInput.value = currentColor;
    }
  }

  function syncMenuUI() {
    if (btnCam) {
      btnCam.textContent = scene.cameraPreset === 'top' ? '📐 Steil' : '📐 3D';
      btnCam.classList.toggle('active', scene.cameraPreset === 'top');
    }
    const z = scene.getZoom();
    if (elZoomVal) {
      elZoomVal.textContent = `${Math.round(z * 100)}%`;
    }
    if (btnZoomOut) btnZoomOut.disabled = z <= 0.855;
    if (btnZoomIn) btnZoomIn.disabled = z >= 1.195;
    syncTargetHelpUI();
    syncTableThemeUI();
  }

  function syncHud() {
    elTime.textContent = formatTime(elapsedSec);
    elMoves.textContent = String(engine.moves);
    elScore.textContent = String(engine.score);
    if (elSeq) {
      elSeq.textContent = `${engine.getCompletedCount()}/8`;
    }
    const dealsLeft = engine.getStockDealsRemaining();
    if (elDealBadge) {
      elDealBadge.textContent = String(dealsLeft);
    }
    if (btnDeal) {
      btnDeal.disabled = engine.won || dealsLeft === 0;
    }
    btnUndo.disabled = !engine.canUndo();
    btnHint.disabled = engine.won;
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

  let winTimer = null;

  function startNewGame({ seed = null } = {}) {
    clearTimeout(winTimer);
    winTimer = null;
    stopTimer();
    elapsedSec = 0;
    timerStarted = false;
    pointerSession = null;
    pendingStockClick = null;

    scene.stopWaterfall();
    winOverlay.classList.add('hidden');
    if (elToast) elToast.classList.add('hidden');

    engine.newGame({ seed });
    runId = window.ArcadeScores ? window.ArcadeScores.newRunId('solitaire3d') : null;

    scene.syncState(engine, { dealAnimate: true, staggerMs: 14 });
    syncMenuUI();
    syncHud();

    for (let i = 0; i < 6; i++) {
      setTimeout(() => audio.cardSnap(), i * 65);
    }
  }

  function handleWin() {
    winTimer = null;
    if (!engine.won) return;
    stopTimer();
    const timeBonus = Math.max(100, Math.round(60000 / Math.max(30, elapsedSec)));
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
        { runId, meta: { time: elapsedSec, moves: engine.moves, mode: 'spider-4-suits' } }
      );
    }
  }

  function notifyClearedSequences(clearedSequences) {
    if (!clearedSequences || clearedSequences.length === 0) return;
    const completed = engine.getCompletedCount();
    const suitInfo = SUITS[clearedSequences[0].suitIdx];
    const suitLabel = suitInfo ? `${suitInfo.sym} ${suitInfo.name}` : '';
    setTimeout(() => audio.foundationChime(Math.max(0, completed - 1)), 120);
    if (!engine.won) {
      showToast(`✨ ${suitLabel}-Sequenz (K–A) abgeräumt! (${completed}/8)`, 2800);
    }
  }

  function afterMove(moveRes) {
    startTimerIfNeeded();
    audio.feltSlide();
    if (moveRes.flippedCardId !== null) {
      setTimeout(() => audio.cardSnap(), 80);
    }
    scene.syncState(engine, { clearedSequences: moveRes.clearedSequences });
    syncHud();

    if (moveRes.clearedSequences && moveRes.clearedSequences.length > 0) {
      notifyClearedSequences(moveRes.clearedSequences);
    }

    if (moveRes.won) {
      clearTimeout(winTimer);
      winTimer = setTimeout(() => handleWin(), 420);
    }
  }

  function handleDrawStock() {
    if (engine.won) return;
    const res = engine.drawFromStock();
    if (!res.ok) {
      audio.invalid();
      if (res.reason === 'empty_column') {
        scene.flashEmptyColumns(res.emptyCols);
        showToast('Stock austeilen nicht möglich: Bitte zuerst alle leeren Spalten belegen.', 3000);
      } else if (res.reason === 'empty') {
        showToast('Der Nachziehstapel ist bereits aufgebraucht.', 2200);
      }
      return;
    }

    startTimerIfNeeded();
    res.dealtCards.forEach((_, idx) => {
      setTimeout(() => audio.cardSnap(), idx * 32);
    });
    scene.syncState(engine, { clearedSequences: res.clearedSequences });
    syncHud();

    if (res.clearedSequences && res.clearedSequences.length > 0) {
      notifyClearedSequences(res.clearedSequences);
    }
    if (res.won) {
      clearTimeout(winTimer);
      winTimer = setTimeout(() => handleWin(), 450);
    }
  }

  function handleUndo() {
    if (!engine.canUndo()) return;
    scene.completeAllAnimations();
    const res = engine.undo();
    if (!res.ok) return;
    audio.cardSnap();
    scene.syncState(engine);
    syncHud();
  }

  function handleHint() {
    if (engine.won) return;
    const hint = engine.findHint();
    if (!hint) {
      audio.invalid();
      showToast('Kein offensichtlicher Zug gefunden – prüfe leere Spalten oder nutze Zurück.', 2600);
      return;
    }
    audio.hint();
    scene.triggerHintPulse(hint);
  }

  function adjustZoom(delta) {
    const next = scene.setZoom(Math.round((scene.getZoom() + delta) * 100) / 100);
    savePref(PREF_ZOOM_KEY, next);
    syncMenuUI();
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  }

  let longPressTimer = null;

  // Pointer & Touch Drag-and-Drop + Click Smart-Move + Target Help
  canvas.addEventListener('pointerdown', (e) => {
    audio.unlock();
    if (!menuPopover.classList.contains('hidden')) {
      menuPopover.classList.add('hidden');
    }
    if (tablePopover && !tablePopover.classList.contains('hidden')) {
      tablePopover.classList.add('hidden');
    }
    if (engine.won) return;
    if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;

    clearTimeout(longPressTimer);
    pendingStockClick = null;
    pointerSession = null;

    const { hits } = scene.raycastFromClient(e.clientX, e.clientY, scene.hitMeshes);
    if (hits.length > 0) {
      const topHit = hits[0];
      const { pile } = topHit.object.userData;
      if (!pile) return;

      if (pile.type === 'stock') {
        pendingStockClick = { pointerId: e.pointerId, x: e.clientX, y: e.clientY };
        return;
      }

      if (pile.type === 'foundation') {
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

        // Requirement 2: Only show long-press destination help if explicitly enabled by user
        if (targetHelpActive) {
          clearTimeout(longPressTimer);
          longPressTimer = setTimeout(() => {
            if (pointerSession && !pointerSession.dragging && pointerSession.pointerId === e.pointerId) {
              pointerSession.validDests = engine.getValidDestinations(
                pointerSession.stack.cards,
                pointerSession.stack.source
              );
              scene.setValidDropTargets(pointerSession.validDests, null);
              audio.hint();
            }
          }, 320);
        }
        return;
      }

      if (stack.blockedReason === 'mixed_or_gap') {
        audio.invalid();
        showToast('Nur lückenlos absteigende Folgen derselben Farbe können zusammen verschoben werden.', 2500);
        return;
      }
    }

    const slotRes = scene.raycastFromClient(e.clientX, e.clientY, scene.slotHitMeshes);
    if (slotRes.hits.length > 0) {
      const meta = slotRes.hits[0].object.userData.slotMeta;
      if (meta && meta.type === 'stock') {
        pendingStockClick = { pointerId: e.pointerId, x: e.clientX, y: e.clientY };
      }
    }
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!pointerSession) {
      if (e.pointerType === 'mouse' && !engine.won) {
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
    if (Math.hypot(dx, dy) >= 6) {
      clearTimeout(longPressTimer);
    }

    if (!pointerSession.dragging && Math.hypot(dx, dy) >= 6) {
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
      const best = scene.getBestDropTarget(pt, pointerSession.validDests);
      pointerSession.lastTarget = best;
      scene.setValidDropTargets(pointerSession.validDests, best ? best.key : null);
    }
  });

  function finishPointer(e) {
    clearTimeout(longPressTimer);
    const isCancel = e.type === 'pointercancel';

    if (pendingStockClick && e.pointerId === pendingStockClick.pointerId) {
      const dist = Math.hypot(e.clientX - pendingStockClick.x, e.clientY - pendingStockClick.y);
      pendingStockClick = null;
      if (!isCancel && dist < 18) {
        handleDrawStock();
      }
      return;
    }
    if (!pointerSession || e.pointerId !== pointerSession.pointerId) return;
    const sess = pointerSession;
    pointerSession = null;
    canvas.style.cursor = 'default';
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch (_) {}

    if (isCancel) {
      if (sess.dragging) scene.endDrag();
      scene.setValidDropTargets(null, null);
      scene.syncState(engine);
      return;
    }

    if (sess.dragging) {
      const pt = scene.raycastDragPlane(e.clientX, e.clientY);
      const target = pt ? scene.getBestDropTarget(pt, sess.validDests) : sess.lastTarget;
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

    // Single tap/click release: clear target glows if any were active from long-press
    scene.setValidDropTargets(null, null);

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

  // Requirement 3: Dual fast-click binding on Undo button for instant mobile/fullscreen responsiveness
  let lastUndoTriggerTime = 0;
  function triggerUndo(e) {
    if (e) {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
    }
    const now = performance.now();
    if (now - lastUndoTriggerTime < 80) return; // avoid double trigger
    lastUndoTriggerTime = now;
    audio.unlock();
    handleUndo();
  }

  btnUndo.addEventListener('pointerup', (e) => {
    if (e.pointerType === 'touch' || e.pointerType === 'pen') {
      triggerUndo(e);
    }
  });

  btnUndo.addEventListener('click', (e) => {
    triggerUndo(e);
  });

  btnHint.addEventListener('click', () => {
    audio.unlock();
    handleHint();
  });

  // Requirement 2: Toggle Target Card Help
  if (btnTargetHelp) {
    btnTargetHelp.addEventListener('click', () => {
      audio.unlock();
      targetHelpActive = !targetHelpActive;
      savePref(PREF_TARGET_HELP_KEY, targetHelpActive ? '1' : '0');
      syncTargetHelpUI();
      if (targetHelpActive) {
        showToast('🎯 Hilfe aktiv: Langes Drücken auf eine Karte zeigt mögliche Zielstapel.', 2800);
      } else {
        scene.setValidDropTargets(null, null);
      }
      if (window.ArcadeAudio) window.ArcadeAudio.click();
    });
  }

  if (btnDeal) {
    btnDeal.addEventListener('click', () => {
      audio.unlock();
      handleDrawStock();
    });
  }

  if (btnZoomOut) {
    btnZoomOut.addEventListener('click', () => {
      audio.unlock();
      adjustZoom(-0.05);
    });
  }

  if (btnZoomIn) {
    btnZoomIn.addEventListener('click', () => {
      audio.unlock();
      adjustZoom(0.05);
    });
  }

  btnCam.addEventListener('click', () => {
    audio.unlock();
    const nextCam = scene.cameraPreset === '3d' ? 'top' : '3d';
    scene.setCameraPreset(nextCam);
    savePref(PREF_CAM_KEY, nextCam);
    syncMenuUI();
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  });

  // Requirement 1: Table Surface & Color Popover Controls
  if (btnTableTheme) {
    btnTableTheme.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.unlock();
      menuPopover.classList.add('hidden');
      if (tablePopover) {
        tablePopover.classList.toggle('hidden');
      }
      if (window.ArcadeAudio) window.ArcadeAudio.click();
    });
  }

  if (btnCloseTablePop) {
    btnCloseTablePop.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.unlock();
      if (tablePopover) tablePopover.classList.add('hidden');
    });
  }

  surfaceChips.forEach((chip) => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.unlock();
      currentSurface = chip.dataset.surface;
      savePref(PREF_TABLE_SURFACE_KEY, currentSurface);
      scene.setTableTheme(currentSurface, currentColor);
      syncTableThemeUI();
      if (window.ArcadeAudio) window.ArcadeAudio.click();
    });
  });

  colorSwatches.forEach((swatch) => {
    swatch.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.unlock();
      currentColor = swatch.dataset.color;
      savePref(PREF_TABLE_COLOR_KEY, currentColor);
      scene.setTableTheme(currentSurface, currentColor);
      syncTableThemeUI();
      if (window.ArcadeAudio) window.ArcadeAudio.click();
    });
  });

  if (customColorInput) {
    let colorDebounceTimer = null;
    const applyCustomColor = (val) => {
      currentColor = val;
      savePref(PREF_TABLE_COLOR_KEY, currentColor);
      scene.setTableTheme(currentSurface, currentColor);
      syncTableThemeUI();
    };
    customColorInput.addEventListener('input', (e) => {
      const val = e.target.value;
      clearTimeout(colorDebounceTimer);
      colorDebounceTimer = setTimeout(() => applyCustomColor(val), 150);
    });
    customColorInput.addEventListener('change', (e) => {
      clearTimeout(colorDebounceTimer);
      applyCustomColor(e.target.value);
    });
  }

  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      audio.unlock();
      toggleFullscreen();
      if (window.ArcadeAudio) window.ArcadeAudio.click();
    });
  }

  document.addEventListener('fullscreenchange', syncFullscreenUI);
  document.addEventListener('webkitfullscreenchange', syncFullscreenUI);

  btnMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    audio.unlock();
    if (tablePopover) tablePopover.classList.add('hidden');
    menuPopover.classList.toggle('hidden');
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  });

  document.addEventListener('pointerdown', (e) => {
    if (!menuPopover.classList.contains('hidden')) {
      if (!menuPopover.contains(e.target) && e.target !== btnMenu && !btnMenu.contains(e.target)) {
        menuPopover.classList.add('hidden');
      }
    }
    if (tablePopover && !tablePopover.classList.contains('hidden')) {
      if (!tablePopover.contains(e.target) && e.target !== btnTableTheme && !btnTableTheme.contains(e.target)) {
        tablePopover.classList.add('hidden');
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
    } else if (e.key.toLowerCase() === 'd' || e.key === ' ') {
      e.preventDefault();
      handleDrawStock();
    } else if (e.key.toLowerCase() === 'f') {
      toggleFullscreen();
    } else if (e.key === '+' || e.key === '=') {
      adjustZoom(0.05);
    } else if (e.key === '-') {
      adjustZoom(-0.05);
    } else if (e.key === 'Escape') {
      menuPopover.classList.add('hidden');
      if (tablePopover) tablePopover.classList.add('hidden');
      if (document.body.classList.contains('sol3d-pseudo-fs')) {
        document.body.classList.remove('sol3d-pseudo-fs');
        syncFullscreenUI();
      }
    }
  });

  window.addEventListener('resize', () => scene.resize());
  if (window.ResizeObserver) {
    new ResizeObserver(() => scene.resize()).observe(stageEl);
  }

  if (window.ArcadeAudio) {
    window.ArcadeAudio.syncButton(document.getElementById('btn-mute'));
  }
  startNewGame();

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
