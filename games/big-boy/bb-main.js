// Main Entry & 3D Orchestrator for Union Pacific Big Boy (Class 4000 / #4014) Explainer
// Three.js 0.170.0 (local vendored) + RoomEnvironment PMREM + ACESFilmic + UnrealBloomPass

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import { BIG_BOY_SPECS } from './specs.js';
import { solveEngineUnitKinematics, solveArticulation } from './bb-kinematics.js';
import { BigBoyPhysics } from './bb-physics.js';
import { createBigBoyMaterials } from './bb-textures.js';
import { buildEngineUnit, buildBogieTruck, buildTrackSystem } from './bb-model-chassis.js';
import { buildBoilerAndSuperstructure, buildFrontPilotAssembly } from './bb-model-boiler.js';
import { BigBoyParticleSystem } from './bb-particles.js';
import { PVIndicatorChart } from './bb-pv-chart.js';
import { BigBoyAudio } from './bb-audio.js';
import { BIG_BOY_PARTS, BIG_BOY_TOUR_STEPS } from './bb-data.js';

const { layout, wheels } = BIG_BOY_SPECS;

const DEFAULT_CAMERA_POS = new THREE.Vector3(16.2, 5.1, 19.6);
const DEFAULT_CAMERA_TARGET = new THREE.Vector3(0.0, 2.0, 0.0);

function isDarkTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function fmt(num, digits = 1) {
  return Number(num).toLocaleString('de-DE', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
}

function initBigBoyApp() {
  const viewport = document.getElementById('bb-viewport');
  const canvas = document.getElementById('bb-canvas');
  const labelLayer = document.getElementById('bb-label-layer');
  if (!viewport || !canvas) return;

  // =========================================================================
  // 1. RENDERER, SCENE, PMREM HDRI, LIGHTING & POST-PROCESSING (BLOOM)
  // =========================================================================
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.85;

  const camera = new THREE.PerspectiveCamera(40, 16 / 9, 0.12, 220);
  camera.position.copy(DEFAULT_CAMERA_POS);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.065;
  controls.target.copy(DEFAULT_CAMERA_TARGET);
  controls.minDistance = 2.6;
  controls.maxDistance = 42.0;
  controls.maxPolarAngle = Math.PI * 0.495; // Keep camera cleanly above ground ballast

  // Studio / Dramatic Railway Depot Lighting Rig
  const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x3b2f28, 0.72);
  scene.add(hemiLight);

  // Warm sunlight / depot key light casting crisp soft shadows onto track & running gear
  const keyLight = new THREE.DirectionalLight(0xfff1dc, 2.55);
  keyLight.position.set(16, 22, 18);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.near = 2;
  keyLight.shadow.camera.far = 65;
  keyLight.shadow.camera.left = -22;
  keyLight.shadow.camera.right = 22;
  keyLight.shadow.camera.top = 12;
  keyLight.shadow.camera.bottom = -12;
  keyLight.shadow.bias = -0.0005;
  scene.add(keyLight);

  // Cool steel rim light behind locomotive to sculpt the massive UP black silhouette!
  const rimLight = new THREE.DirectionalLight(0x93c5fd, 1.35);
  rimLight.position.set(-14, 11, -18);
  scene.add(rimLight);

  // Gentle right-side fill light so cutaway cylinders & Walschaerts valve gear stay razor-sharp
  const gearFillLight = new THREE.DirectionalLight(0xe2e8f0, 0.85);
  gearFillLight.position.set(6, 4.5, 14);
  scene.add(gearFillLight);

  // Ground yard plane beneath track embankment
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x1e242c,
    roughness: 0.96,
    metalness: 0.04
  });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.50;
  ground.receiveShadow = true;
  scene.add(ground);

  // Post-Processing: EffectComposer + RenderPass + Subtle UnrealBloomPass + OutputPass
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(1280, 720), 0.34, 0.55, 0.96);
  const outputPass = new OutputPass();
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
  composer.addPass(outputPass);

  function syncThemeLighting() {
    const dark = isDarkTheme();
    const bgHex = dark ? 0x0b1018 : 0xeaf0f7;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, dark ? 0.011 : 0.0085);
    groundMat.color.setHex(dark ? 0x141922 : 0xcbd4e0);
    hemiLight.intensity = dark ? 0.62 : 1.05;
    keyLight.intensity = dark ? 2.5 : 2.9;
    rimLight.intensity = dark ? 1.55 : 1.15;
    gearFillLight.intensity = dark ? 0.85 : 1.1;
    scene.environmentIntensity = dark ? 0.78 : 1.05;
    bloomPass.strength = dark ? 0.32 : 0.14;
    bloomPass.threshold = dark ? 1.28 : 1.38;
    renderer.toneMappingExposure = dark ? 1.12 : 1.06;
  }

  // =========================================================================
  // 2. BUILD BIG BOY 4-8-8-4 LOCOMOTIVE, DYNAMIC TRACK & PARTICLE SYSTEMS
  // =========================================================================
  const mats = createBigBoyMaterials();
  const trackSys = buildTrackSystem(mats);
  scene.add(trackSys.group);

  const locoRoot = new THREE.Group();
  scene.add(locoRoot);

  // Rear 4-axle Engine Unit (rigidly attached to main frame, origin at world x = 0)
  const rearEngine = buildEngineUnit(layout.rearEngine, mats, 0);
  locoRoot.add(rearEngine.root);

  // Articulated Front 4-axle Engine Unit (pivots around hingeX = -0.70 m on curves!)
  const frontPivotGroup = new THREE.Group();
  frontPivotGroup.position.set(layout.hingeX, 0, 0);
  const frontEngine = buildEngineUnit(layout.frontEngine, mats, layout.hingeX);
  // Reset frontEngine.root.position.x since frontPivotGroup is already at hingeX
  frontEngine.root.position.x = 0;
  frontPivotGroup.add(frontEngine.root);

  // Front Pilot (Cowcatcher) & Boiler Bearer mounted on front articulated unit
  const frontPilot = buildFrontPilotAssembly(mats, layout.hingeX);
  frontPivotGroup.add(frontPilot);

  // Leading 2-axle truck mounted on front articulated unit at kingpinX
  const leadingTruck = buildBogieTruck(wheels.leadingRadius, layout.leadingTruck.axleOffsets, mats, 'articulated_chassis');
  leadingTruck.group.position.set(layout.leadingTruck.kingpinX - layout.hingeX, 0, 0);
  frontPivotGroup.add(leadingTruck.group);

  locoRoot.add(frontPivotGroup);

  // Trailing 2-axle truck under firebox & cab (pivots on rear frame)
  const trailingTruck = buildBogieTruck(wheels.trailingRadius, layout.trailingTruck.axleOffsets, mats, 'articulated_chassis');
  trailingTruck.group.position.set(layout.trailingTruck.kingpinX, 0, 0);
  locoRoot.add(trailingTruck.group);

  // Monumental Boiler, Graphite Smokebox, Firebox, Stoker, Superheater, Double Stack, Cab & Tender Front
  const boilerSys = buildBoilerAndSuperstructure(mats);
  locoRoot.add(boilerSys.root);

  // Soft-Sprite Exhaust Plumes, Sparks & Thermodynamics Overlay Particles
  const particleSys = new BigBoyParticleSystem(scene, mats);

  // =========================================================================
  // 3. PHYSICS, p-V INDICATOR DIAGRAM & WEB AUDIO STATE
  // =========================================================================
  const physics = new BigBoyPhysics();
  const pvChart = new PVIndicatorChart(document.getElementById('bb-pv-chart'));
  const audio = new BigBoyAudio();

  const state = {
    boilerCutaway: false,
    cylinderCutaway: false,
    xray: false,
    thermoOverlay: false,
    curveDemo: false,
    curveBlend: 0,
    rollerStand: false,
    asyncMode: true,
    showLabels: false,
    showGhostPV: true,
    timeScale: 0.65,
    paused: false,
    selectedPartId: 'articulated_chassis',
    tourIndex: -1
  };

  // =========================================================================
  // 4. SMOOTH CAMERA TRANSITIONS & 3D HOTSPOT PIN PROJECTION
  // =========================================================================
  const camAnim = {
    active: false,
    t: 0,
    dur: 0.95,
    fromPos: new THREE.Vector3(),
    toPos: new THREE.Vector3(),
    fromTarget: new THREE.Vector3(),
    toTarget: new THREE.Vector3()
  };

  function flyCameraTo(posArr, targetArr, duration = 0.95) {
    camAnim.active = true;
    camAnim.t = 0;
    camAnim.dur = duration;
    camAnim.fromPos.copy(camera.position);
    camAnim.toPos.set(posArr[0], posArr[1], posArr[2]);
    camAnim.fromTarget.copy(controls.target);
    camAnim.toTarget.set(targetArr[0], targetArr[1], targetArr[2]);
  }

  controls.addEventListener('start', () => {
    camAnim.active = false;
  });

  // Create clickable 3D Hotspot pins
  const hotspotPins = BIG_BOY_PARTS.map((part) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'bb-label-pin';
    btn.dataset.partId = part.id;
    btn.innerHTML = `<span class="bb-pin-num">${part.num}</span><span>${part.shortName}</span>`;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectPart(part.id, true);
    });
    labelLayer.appendChild(btn);
    return {
      part,
      el: btn,
      vec: new THREE.Vector3(part.anchor[0], part.anchor[1], part.anchor[2])
    };
  });

  const projVec = new THREE.Vector3();
  function updateHotspotPins() {
    labelLayer.classList.toggle('is-visible', state.showLabels);
    if (!state.showLabels) return;
    const w = viewport.clientWidth;
    const h = viewport.clientHeight;
    for (const item of hotspotPins) {
      projVec.copy(item.vec).project(camera);
      const visible = projVec.z >= -1 && projVec.z <= 1;
      item.el.style.display = visible ? 'inline-flex' : 'none';
      if (!visible) continue;
      const sx = (projVec.x * 0.5 + 0.5) * w;
      const sy = (-projVec.y * 0.5 + 0.5) * h;
      item.el.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0) translate(-50%, -50%)`;
      item.el.classList.toggle('active', item.part.id === state.selectedPartId);
    }
  }

  // Raycast clicking directly on 3D sub-assemblies
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let pointerDownPos = null;

  canvas.addEventListener('pointerdown', (e) => {
    pointerDownPos = { x: e.clientX, y: e.clientY };
  });

  canvas.addEventListener('pointerup', (e) => {
    if (!pointerDownPos) return;
    const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
    pointerDownPos = null;
    if (dist > 6) return; // Ignore orbit drags

    const rect = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(locoRoot, true);
    for (const hit of hits) {
      if (!hit.object.visible) continue;
      let cur = hit.object;
      while (cur) {
        if (cur.userData && cur.userData.partId) {
          selectPart(cur.userData.partId, false);
          return;
        }
        cur = cur.parent;
      }
    }
  });

  // =========================================================================
  // 5. UI WIRING (SIDEBAR, CUTAWAYS, SLIDERS, TELEMETRY, TOUR & MOBILE DRAWER)
  // =========================================================================
  const $ = (id) => document.getElementById(id);

  const elThrottle = $('bb-throttle-slider');
  const elThrottleVal = $('bb-throttle-val');
  const elCutoff = $('bb-cutoff-slider');
  const elCutoffVal = $('bb-cutoff-val');
  const elInspector = $('bb-inspector');
  const elTourCard = $('bb-tour-card');
  const elSidePanel = $('bb-side-panel');
  const elBackdrop = $('bb-drawer-backdrop');
  const elWorkspace = document.querySelector('.bb-workspace');

  function selectPart(partId, fly = false) {
    const part = BIG_BOY_PARTS.find((p) => p.id === partId) || BIG_BOY_PARTS[0];
    state.selectedPartId = part.id;
    if (elInspector) {
      elInspector.innerHTML = `
        <div class="bb-inspector-head">
          <span class="bb-inspector-badge">Baugruppe ${part.num}</span>
          <span class="bb-inspector-spec">${part.spec}</span>
        </div>
        <h3 class="bb-inspector-title">${part.name}</h3>
        <p class="bb-inspector-desc">${part.summary}</p>
      `;
    }
    if (fly) {
      const a = part.anchor;
      flyCameraTo([a[0] + 4.8, a[1] + 2.0, Math.max(5.5, a[2] + 5.8)], a, 0.85);
    }
  }

  function applyViewModes() {
    boilerSys.setBoilerCutaway(state.boilerCutaway);
    boilerSys.setXRay(state.xray);
    rearEngine.setCylinderCutaway(state.cylinderCutaway);
    frontEngine.setCylinderCutaway(state.cylinderCutaway);

    const anyCut = state.boilerCutaway || state.cylinderCutaway || state.xray;
    document.querySelectorAll('[data-bb-toggle]').forEach((btn) => {
      const key = btn.dataset.bbToggle;
      if (key === 'exterior') {
        btn.classList.toggle('active', !anyCut);
      } else {
        btn.classList.toggle('active', Boolean(state[key]));
      }
    });

    const legend = $('bb-thermo-legend');
    if (legend) legend.classList.toggle('hidden', !state.thermoOverlay && !state.boilerCutaway && !state.cylinderCutaway);
  }

  function syncSlidersToUI() {
    if (elThrottle) elThrottle.value = String(Math.round(physics.throttle * 100));
    if (elThrottleVal) elThrottleVal.textContent = `${Math.round(physics.throttle * 100)} %`;
    const cutPct = Math.round(physics.cutoff * 100);
    if (elCutoff) elCutoff.value = String(cutPct);
    if (elCutoffVal) {
      const dirLabel = cutPct > 2 ? 'Vorwärts' : cutPct < -2 ? 'Rückwärts' : 'Leerlauf';
      elCutoffVal.textContent = `${cutPct > 0 ? '+' : ''}${cutPct} % (${dirLabel})`;
    }
    document.querySelectorAll('[data-bb-speed]').forEach((btn) => {
      const sc = parseFloat(btn.dataset.bbSpeed);
      const isAct = state.paused ? sc === 0 : !state.paused && Math.abs(state.timeScale - sc) < 0.005;
      btn.classList.toggle('active', isAct);
    });
  }

  // Dock toggle buttons
  document.querySelectorAll('[data-bb-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.bbToggle;
      if (key === 'exterior') {
        state.boilerCutaway = false;
        state.cylinderCutaway = false;
        state.xray = false;
      } else if (key in state) {
        state[key] = !state[key];
        if (key === 'asyncMode') physics.asyncMode = state.asyncMode;
      }
      applyViewModes();
    });
  });

  // Camera reset
  $('bb-btn-reset')?.addEventListener('click', () => {
    flyCameraTo(
      [DEFAULT_CAMERA_POS.x, DEFAULT_CAMERA_POS.y, DEFAULT_CAMERA_POS.z],
      [DEFAULT_CAMERA_TARGET.x, DEFAULT_CAMERA_TARGET.y, DEFAULT_CAMERA_TARGET.z]
    );
  });

  // Desktop sidebar collapse toggle
  $('bb-btn-collapse')?.addEventListener('click', () => {
    if (!elWorkspace) return;
    const collapsed = elWorkspace.classList.toggle('panel-collapsed');
    $('bb-btn-collapse').textContent = collapsed ? '◧ Pult' : '◨ Vollbild';
    setTimeout(handleResize, 260);
  });

  // Throttle & Cut-Off sliders
  elThrottle?.addEventListener('input', () => {
    physics.throttle = Number(elThrottle.value) / 100;
    syncSlidersToUI();
  });

  elCutoff?.addEventListener('input', () => {
    physics.cutoff = Number(elCutoff.value) / 100;
    syncSlidersToUI();
  });

  // Quick operating presets (Anfahrt +75%, Marsch +25% Hooking Up, Leerlauf, Rückwärts)
  document.querySelectorAll('[data-bb-preset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      physics.throttle = parseFloat(btn.dataset.throttle);
      physics.cutoff = parseFloat(btn.dataset.cutoff);
      if (btn.dataset.speedMs !== undefined) {
        physics.speedMs = parseFloat(btn.dataset.speedMs);
      }
      syncSlidersToUI();
    });
  });

  // Time scale & Single Step controls
  document.querySelectorAll('[data-bb-speed]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sc = parseFloat(btn.dataset.bbSpeed);
      if (sc === 0) {
        state.paused = true;
      } else {
        state.paused = false;
        state.timeScale = sc;
      }
      syncSlidersToUI();
    });
  });

  let pendingSingleStep = false;
  $('bb-btn-step')?.addEventListener('click', () => {
    state.paused = true;
    pendingSingleStep = true;
    syncSlidersToUI();
  });

  // p-V Ghost Curve toggle
  $('bb-pv-ghost-toggle')?.addEventListener('change', (e) => {
    state.showGhostPV = e.target.checked;
    pvChart.setShowGhost(state.showGhostPV);
  });

  // Audio mute/unmute & Big Boy 5-Chime Whistle button!
  const elMuteBtn = $('btn-mute');
  function syncAudioButtons() {
    if (elMuteBtn) {
      elMuteBtn.textContent = audio.enabled ? '🔊' : '🔇';
      elMuteBtn.title = audio.enabled ? 'Dampf-Audio stummschalten' : 'Dampf-Audio aktivieren';
    }
    const pAudioBtn = $('bb-btn-audio');
    if (pAudioBtn) {
      pAudioBtn.classList.toggle('active', audio.enabled);
      pAudioBtn.textContent = audio.enabled ? '🔊 Sound An' : '🔇 Sound Aus';
    }
  }
  elMuteBtn?.addEventListener('click', () => {
    audio.toggle();
    syncAudioButtons();
  });
  $('bb-btn-audio')?.addEventListener('click', () => {
    audio.toggle();
    syncAudioButtons();
  });
  $('bb-btn-whistle')?.addEventListener('click', () => {
    audio.blowWhistle(1.7);
    syncAudioButtons();
  });

  // Mobile drawer open/close
  function setMobileDrawer(open) {
    elSidePanel?.classList.toggle('is-open', open);
    elBackdrop?.classList.toggle('is-open', open);
    $('bb-mobile-panel-toggle')?.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  $('bb-mobile-panel-toggle')?.addEventListener('click', () => {
    setMobileDrawer(!elSidePanel?.classList.contains('is-open'));
  });
  $('bb-drawer-close')?.addEventListener('click', () => setMobileDrawer(false));
  elBackdrop?.addEventListener('click', () => setMobileDrawer(false));

  // Version pill -> ArcadeUpdates changelog dialog
  $('bb-version-btn')?.addEventListener('click', () => {
    if (window.ArcadeUpdates && typeof window.ArcadeUpdates.openDialog === 'function') {
      window.ArcadeUpdates.openDialog('big_boy');
    }
  });

  // =========================================================================
  // 6. 8-STATION GUIDED ENGINEERING TOUR
  // =========================================================================
  function renderTourCard() {
    if (!elTourCard) return;
    if (state.tourIndex < 0) {
      elTourCard.classList.add('hidden');
      return;
    }
    const step = BIG_BOY_TOUR_STEPS[state.tourIndex];
    const total = BIG_BOY_TOUR_STEPS.length;
    elTourCard.classList.remove('hidden');
    elTourCard.innerHTML = `
      <div class="bb-tour-head">
        <span class="bb-tour-step-badge">Station ${step.num} / ${total}</span>
        <button type="button" class="bb-tour-close" id="bb-tour-close" aria-label="Tour beenden">✕</button>
      </div>
      <h3 class="bb-tour-title">${step.title}</h3>
      <p class="bb-tour-body">${step.body}</p>
      <div class="bb-tour-actions">
        <button type="button" class="bb-tour-nav" id="bb-tour-prev" ${state.tourIndex === 0 ? 'disabled' : ''}>← Zurück</button>
        <div class="bb-tour-dots">${BIG_BOY_TOUR_STEPS.map((_, idx) =>
          `<button type="button" class="bb-tour-dot ${idx === state.tourIndex ? 'active' : ''}" data-tour-dot="${idx}" aria-label="Station ${idx + 1}"></button>`
        ).join('')}</div>
        <button type="button" class="bb-tour-nav primary" id="bb-tour-next">${state.tourIndex === total - 1 ? 'Fertig ✓' : 'Weiter →'}</button>
      </div>
    `;

    $('bb-tour-close')?.addEventListener('click', () => closeTour());
    $('bb-tour-prev')?.addEventListener('click', () => goTourStep(state.tourIndex - 1));
    $('bb-tour-next')?.addEventListener('click', () => {
      if (state.tourIndex >= total - 1) closeTour();
      else goTourStep(state.tourIndex + 1);
    });
    elTourCard.querySelectorAll('[data-tour-dot]').forEach((dot) => {
      dot.addEventListener('click', () => goTourStep(Number(dot.dataset.tourDot)));
    });
  }

  function goTourStep(idx) {
    if (idx < 0 || idx >= BIG_BOY_TOUR_STEPS.length) return;
    state.tourIndex = idx;
    const step = BIG_BOY_TOUR_STEPS[idx];
    const p = step.preset || {};
    state.boilerCutaway = Boolean(p.boilerCutaway);
    state.cylinderCutaway = Boolean(p.cylinderCutaway);
    state.xray = false;
    state.thermoOverlay = Boolean(p.thermoOverlay);
    state.curveDemo = Boolean(p.curveDemo);
    state.paused = false;
    if (p.timeScale !== undefined) state.timeScale = p.timeScale;
    if (p.throttle !== undefined) physics.throttle = p.throttle;
    if (p.cutoff !== undefined) physics.cutoff = p.cutoff;
    if (p.asyncMode !== undefined) {
      state.asyncMode = p.asyncMode;
      physics.asyncMode = p.asyncMode;
    }

    applyViewModes();
    syncSlidersToUI();
    selectPart(step.partId, false);
    flyCameraTo(step.cameraPos, step.cameraTarget, 1.05);
    renderTourCard();
  }

  function closeTour() {
    state.tourIndex = -1;
    renderTourCard();
  }

  $('bb-btn-tour')?.addEventListener('click', () => {
    setMobileDrawer(false);
    if (state.tourIndex >= 0) closeTour();
    else goTourStep(0);
  });

  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if (e.code === 'Space') {
      e.preventDefault();
      state.paused = !state.paused;
      syncSlidersToUI();
    } else if (e.key === 'Escape' && state.tourIndex >= 0) {
      closeTour();
    } else if (e.key === 'ArrowRight' && state.tourIndex >= 0) {
      goTourStep(Math.min(BIG_BOY_TOUR_STEPS.length - 1, state.tourIndex + 1));
    } else if (e.key === 'ArrowLeft' && state.tourIndex >= 0) {
      goTourStep(Math.max(0, state.tourIndex - 1));
    }
  });

  // =========================================================================
  // 7. THEME SYNC & RESPONSIVE RESIZE
  // =========================================================================
  syncThemeLighting();
  const themeObserver = new MutationObserver(() => syncThemeLighting());
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  function handleResize() {
    const w = Math.max(1, viewport.clientWidth);
    const h = Math.max(1, viewport.clientHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    bloomPass.resolution.set(w, h);
  }
  handleResize();
  window.addEventListener('resize', handleResize);
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => handleResize()).observe(viewport);
  }

  // Initial UI sync
  selectPart('articulated_chassis', false);
  applyViewModes();
  syncSlidersToUI();
  syncAudioButtons();

  // Telemetry DOM refs
  const telSpeed = $('bb-tel-speed');
  const telSpeedSub = $('bb-tel-speed-sub');
  const telTE = $('bb-tel-te');
  const telPower = $('bb-tel-power');
  const telPowerSub = $('bb-tel-power-sub');
  const telBoiler = $('bb-tel-boiler');
  const telTemp = $('bb-tel-temp');
  const telCylP = $('bb-tel-cylp');
  const telSteamCoal = $('bb-tel-rates');
  const telDraft = $('bb-tel-draft');
  const telPhase = $('bb-tel-phase');

  let lastUiUpdate = 0;
  let lastNow = performance.now();
  let elapsed = 0;

  // =========================================================================
  // 8. MAIN 60 FPS REAL-TIME SIMULATION & RENDER LOOP
  // =========================================================================
  function animate(now) {
    requestAnimationFrame(animate);
    const rawDt = Math.min(0.05, Math.max(0.001, (now - lastNow) / 1000));
    lastNow = now;

    // Smoothly interpolate curved-track articulation demo
    const targetCurve = state.curveDemo ? 1 : 0;
    state.curveBlend += (targetCurve - state.curveBlend) * Math.min(1, rawDt * 2.8);
    const articulation = solveArticulation(state.curveBlend);

    // Compute simulation dt (respecting Pause, Single-Step & Super-Slow-Mo down to 0.02x)
    let simDt = 0;
    if (pendingSingleStep) {
      simDt = 0.035;
      pendingSingleStep = false;
    } else if (!state.paused) {
      simDt = rawDt * state.timeScale;
    }
    elapsed += simDt;

    // Step real-time thermodynamics & independent front/rear wheel motion
    const telemetry = physics.step(simDt, { rollerStand: state.rollerStand });

    // Solve exact kinematics for BOTH 4-axle engines (with 90° quartering & independent front/rear phase!)
    const rearKin = solveEngineUnitKinematics(layout.rearEngine, telemetry.rearCrankAngle, telemetry.cutoff);
    const frontKin = solveEngineUnitKinematics(layout.frontEngine, telemetry.frontCrankAngle, telemetry.cutoff);

    // Apply articulation yaw to Front Engine, Leading Truck & Trailing Truck!
    frontPivotGroup.rotation.y = articulation.frontYaw;
    leadingTruck.group.rotation.y = articulation.leadingTruckYaw;
    trailingTruck.group.rotation.y = articulation.trailingTruckYaw;

    // Spin Leading & Trailing truck wheelsets proportionally to ground speed
    const leadRotDelta = -(telemetry.speedMs * simDt) / wheels.leadingRadius;
    const trailRotDelta = -(telemetry.speedMs * simDt) / wheels.trailingRadius;
    for (const ws of leadingTruck.wheelsets) ws.rotation.z += leadRotDelta;
    for (const ws of trailingTruck.wheelsets) ws.rotation.z += trailRotDelta;

    // Update all rods, Boxpok wheels, Walschaerts valve gears & cutaway cylinders!
    rearEngine.updateKinematics(rearKin, telemetry.cylinders.rearFront, telemetry.cylinders.rearRear, state.thermoOverlay);
    frontEngine.updateKinematics(frontKin, telemetry.cylinders.frontFront, telemetry.cylinders.frontRear, state.thermoOverlay);

    // Update Boiler cutaway water waves, Stoker auger, Firebox glow & Articulated Ball-Joint Steam Pipes!
    boilerSys.update(simDt, elapsed, telemetry, articulation, state.thermoOverlay);

    // Update Dynamic Track Bed (bending rails/sleepers/ballast or Roller Test Stand)
    trackSys.update(simDt, telemetry.speedMs, articulation, state.rollerStand);

    // Update Soft-Sprite Dual-Stack Exhaust Plumes, Sparks & Thermodynamics Flow Particles
    particleSys.update(simDt > 0 ? simDt : rawDt * 0.15, telemetry, articulation, {
      boilerCutaway: state.boilerCutaway,
      cylinderCutaway: state.cylinderCutaway,
      thermoOverlay: state.thermoOverlay,
      rollerStand: state.rollerStand
    });

    // Synchronized Dual-Engine Web Audio Chuffs!
    if (telemetry.events.rearExhaust) {
      audio.triggerChuff('rear', telemetry.events.exhaustIntensity, telemetry.speedKmh);
    }
    if (telemetry.events.frontExhaust) {
      audio.triggerChuff('front', telemetry.events.exhaustIntensity, telemetry.speedKmh);
    }
    audio.updateAmbient(telemetry, state.paused);

    // Smooth camera animation
    if (camAnim.active) {
      camAnim.t = Math.min(1, camAnim.t + rawDt / camAnim.dur);
      const ease = 1 - Math.pow(1 - camAnim.t, 3);
      camera.position.lerpVectors(camAnim.fromPos, camAnim.toPos, ease);
      controls.target.lerpVectors(camAnim.fromTarget, camAnim.toTarget, ease);
      if (camAnim.t >= 1) camAnim.active = false;
    }
    controls.update();

    // Update p-V Indicator Diagram live at 60 FPS for buttery-smooth piston tracking!
    pvChart.update(telemetry.cutoff, telemetry.steamChestPressureBar, telemetry.cylinders.frontFront);

    // Update telemetry text readouts at ~12 Hz to keep DOM crisp and fast
    if (now - lastUiUpdate > 80) {
      lastUiUpdate = now;
      if (telSpeed) telSpeed.textContent = `${fmt(telemetry.speedKmh, 1)} km/h`;
      if (telSpeedSub) telSpeedSub.textContent = `${fmt(telemetry.speedMph, 1)} mph · ${fmt(telemetry.rpmDrivers, 0)} U/min`;
      if (telTE) telTE.textContent = `${fmt(telemetry.tractiveEffortKN, 0)} kN`;
      if (telPower) telPower.textContent = `${fmt(telemetry.indicatedPowerPS, 0)} PS`;
      if (telPowerSub) telPowerSub.textContent = `${fmt(telemetry.indicatedPowerKW, 0)} kW indiziert`;
      if (telBoiler) telBoiler.textContent = `${fmt(telemetry.boilerPressureBar, 1)} bar`;
      if (telTemp) telTemp.textContent = `${fmt(telemetry.steamTempC, 0)} °C`;
      if (telCylP) telCylP.textContent = `${fmt(telemetry.cylinders.frontFront.pressureBar, 1)} bar`;
      if (telSteamCoal) telSteamCoal.textContent = `${fmt(telemetry.steamRateTph, 1)} / ${fmt(telemetry.coalRateTph, 1)} t/h`;
      if (telDraft) telDraft.textContent = `${fmt(telemetry.draftVacuumKPa, 2)} kPa`;
      if (telPhase) telPhase.textContent = state.asyncMode ? `${telemetry.phaseOffsetDeg}° (8-Schlag)` : '0° (Synchron)';
    }

    updateHotspotPins();
    composer.render();
  }

  requestAnimationFrame(animate);

  // Expose lightweight debug hook for automated headless browser verification
  window.__BIG_BOY__ = {
    state,
    physics,
    goTourStep,
    closeTour,
    applyViewModes,
    syncSlidersToUI,
    flyCameraTo
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBigBoyApp);
} else {
  initBigBoyApp();
}
