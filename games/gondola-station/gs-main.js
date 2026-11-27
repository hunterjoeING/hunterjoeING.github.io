// Main Entry & 3D Orchestrator for 2-Etagen-Gondelstation (Galzigbahn-Prinzip & D-Line)
// Three.js 0.170.0 (local vendored) + RoomEnvironment PMREM + ACESFilmic + Selective UnrealBloomPass

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import { GS_SPECS, ZONE_META } from './specs.js';
import { GondolaKinematics } from './gs-kinematics.js';
import { GondolaPhysics } from './gs-physics.js';
import { createStationMaterials } from './gs-textures.js';
import { buildAlpineEnvironment, buildStationArchitecture } from './gs-model-station.js';
import {
  buildFerrisWheels,
  buildBullwheelDirectDrive,
  buildTireConveyors,
  buildCouplingZones,
  buildAllCabins
} from './gs-model-machinery.js';
import { GondolaDiagnostics } from './gs-diagnostics.js';
import { GondolaAudio } from './gs-audio.js';
import { GONDOLA_HOTSPOTS, GONDOLA_TOUR_STEPS } from './gs-data.js';

const DEFAULT_CAM_POS = new THREE.Vector3(27.5, 13.0, 25.5);
const DEFAULT_CAM_TARGET = new THREE.Vector3(7.6, 6.2, 0.0);

function fmt(num, digits = 1) {
  return Number(num).toLocaleString('de-DE', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
}

function initGondolaStationApp() {
  const viewport = document.getElementById('gs-viewport');
  const canvas = document.getElementById('gs-canvas');
  const labelLayer = document.getElementById('gs-label-layer');
  if (!viewport || !canvas) return;

  // =========================================================================
  // 1. RENDERER, SCENE, PMREM HDRI, ALPINE LIGHTING & SELECTIVE BLOOM
  // =========================================================================
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.50;

  const camera = new THREE.PerspectiveCamera(42, 16 / 9, 0.12, 340);
  camera.position.copy(DEFAULT_CAM_POS);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.068;
  controls.minDistance = 1.35;
  controls.maxDistance = 88.0;
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.copy(DEFAULT_CAM_TARGET);
  controls.update();

  // --- Alpine Lighting Rig (Switchable: Blue Hour Floodlight vs Alpine Sunny Day) ---
  const hemiLight = new THREE.HemisphereLight(0x5280c8, 0x1b2942, 0.68);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xc2dcff, 1.35);
  sunLight.position.set(28, 38, 24);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.near = 4;
  sunLight.shadow.camera.far = 115;
  sunLight.shadow.camera.left = -28;
  sunLight.shadow.camera.right = 34;
  sunLight.shadow.camera.top = 28;
  sunLight.shadow.camera.bottom = -22;
  sunLight.shadow.bias = -0.00045;
  scene.add(sunLight);

  const rimLight = new THREE.DirectionalLight(0x7dd3fc, 0.85);
  rimLight.position.set(-24, 18, -22);
  scene.add(rimLight);

  // Warm Architectural Interior Station Lights (turns the 2-story glass hall into a glowing Swiss watch at Blue Hour!)
  const interiorLights = [];
  const addStationLight = (x, y, z, color, intensity, distance) => {
    const pt = new THREE.PointLight(color, intensity, distance, 1.5);
    pt.position.set(x, y, z);
    scene.add(pt);
    interiorLights.push({ light: pt, baseIntensity: intensity });
  };
  addStationLight(2.0, 4.8, 0.0, 0xffe4b5, 24, 24);      // EG Level Walk-In warm glow
  addStationLight(-3.5, 7.6, 0.0, 0xfff0d4, 30, 26);     // Giant Vertical Ferris Wheels spotlight
  addStationLight(4.4, 11.4, 0.0, 0xe0f2fe, 32, 26);     // OG Bullwheel & DirectDrive hall
  addStationLight(11.8, 11.4, 2.8, 0xfff5e0, 22, 16);    // Attach Ramp & Check Zone inspection light

  // Selective Bloom Post-Processing (High threshold > 1.38 so snow & glass glare stay crisp while LEDs & arrows glow!)
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(1280, 720), 0.28, 0.44, 1.38);
  const outputPass = new OutputPass();
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
  composer.addPass(outputPass);

  // =========================================================================
  // 2. CORE SIMULATION, MATERIALS & 3D ASSEMBLIES
  // =========================================================================
  const kinematics = new GondolaKinematics();
  const physics = new GondolaPhysics(kinematics);
  const mats = createStationMaterials();

  const alpine = buildAlpineEnvironment(mats, kinematics);
  scene.add(alpine.group);

  const station = buildStationArchitecture(mats, kinematics);
  scene.add(station.root);

  const ferris = buildFerrisWheels(mats);
  scene.add(ferris.group);

  const drive = buildBullwheelDirectDrive(mats);
  scene.add(drive.root);

  const conveyors = buildTireConveyors(mats, kinematics);
  scene.add(conveyors.group);

  const coupling = buildCouplingZones(mats);
  scene.add(coupling.group);

  const fleet = buildAllCabins(mats);
  scene.add(fleet.group);

  // Diagnostics & Procedural Web-Audio
  const diagnostics = new GondolaDiagnostics(document.getElementById('gs-diag-svg'), kinematics);
  const audio = new GondolaAudio();

  // =========================================================================
  // 3. APPLICATION STATE & VIEW MODES
  // =========================================================================
  const state = {
    lightingMode: 'blue_hour', // 'blue_hour' | 'alpine_day'
    showShell: true,           // Glass facade & roof visible (toggleable!)
    clampCutaway: false,       // Macro spring grip cutaway + force arrows
    driveXray: false,          // DirectDrive permanent magnet/stator + hydraulic accumulator X-Ray
    showZones: false,          // Color-coded speed & zone track ribbon
    showLabels: false,         // Clickable 3D component hotspots
    followCabin: false,        // Smoothly accompany Cabin #01 through full 2-story circuit
    timeScale: 1.0,            // 0 = Pause, 0.02..1.5
    prevTimeScale: 1.0,
    activeTourStep: -1,
    activeHotspotId: null
  };

  // Smooth camera transition tween
  const camTween = {
    active: false,
    startPos: new THREE.Vector3(),
    endPos: new THREE.Vector3(),
    startTarget: new THREE.Vector3(),
    endTarget: new THREE.Vector3(),
    progress: 0,
    duration: 0.95
  };

  function animateCameraTo(posArr, targetArr, duration = 0.95) {
    state.followCabin = false;
    camTween.active = true;
    camTween.startPos.copy(camera.position);
    camTween.endPos.set(posArr[0], posArr[1], posArr[2]);
    camTween.startTarget.copy(controls.target);
    camTween.endTarget.set(targetArr[0], targetArr[1], targetArr[2]);
    camTween.progress = 0;
    camTween.duration = Math.max(0.25, duration);
    syncUiControls();
  }

  // Cancel camera tween if user grabs OrbitControls manually
  controls.addEventListener('start', () => {
    camTween.active = false;
  });

  // --- Lighting Mode Switcher (Blue Hour Floodlight vs Alpine Sunny Day) ---
  function applyLightingMode(mode) {
    state.lightingMode = mode;
    const isNight = mode === 'blue_hour';

    if (isNight) {
      scene.background = new THREE.Color(0x09162d);
      scene.fog = new THREE.FogExp2(0x0b1a34, 0.0068);
      hemiLight.color.setHex(0x4e7cc6);
      hemiLight.groundColor.setHex(0x162238);
      hemiLight.intensity = 0.68;
      sunLight.color.setHex(0xbfd9ff);
      sunLight.intensity = 1.25;
      sunLight.position.set(26, 36, 22);
      rimLight.color.setHex(0x60a5fa);
      rimLight.intensity = 0.85;
      scene.environmentIntensity = 0.44;
      renderer.toneMappingExposure = 1.08;
      bloomPass.strength = 0.36;
      bloomPass.threshold = 1.28;
      mats.ledWarmStrip.emissiveIntensity = 1.95;
      mats.ledCoolStrip.emissiveIntensity = 1.75;
      mats.cabinInteriorLight.emissiveIntensity = 1.75;
      mats.facadeGlass.opacity = 0.34;
    } else {
      scene.background = new THREE.Color(0x8bc2f4);
      scene.fog = new THREE.FogExp2(0xbad9f7, 0.0046);
      hemiLight.color.setHex(0xdbeeff);
      hemiLight.groundColor.setHex(0x6b829e);
      hemiLight.intensity = 1.02;
      sunLight.color.setHex(0xfff6e5);
      sunLight.intensity = 2.45;
      sunLight.position.set(34, 46, 26);
      rimLight.color.setHex(0xbde0fe);
      rimLight.intensity = 0.65;
      scene.environmentIntensity = 0.78;
      renderer.toneMappingExposure = 1.02;
      bloomPass.strength = 0.16;
      bloomPass.threshold = 1.48;
      mats.ledWarmStrip.emissiveIntensity = 0.65;
      mats.ledCoolStrip.emissiveIntensity = 0.72;
      mats.cabinInteriorLight.emissiveIntensity = 0.55;
      mats.facadeGlass.opacity = 0.28;
    }

    for (const item of interiorLights) {
      item.light.intensity = isNight ? item.baseIntensity : item.baseIntensity * 0.26;
    }
    syncUiControls();
  }

  // --- Cutaway / X-Ray / Zone Visibility Application ---
  function applyVisualModes() {
    // 1. Glass facade & roof ("Dach/Fassade aufklappen")
    station.shellGroup.visible = state.showShell;

    // 2. DirectDrive & Hydraulic Accumulator X-Ray
    drive.motorOuterGroup.traverse((obj) => {
      if (obj.isMesh) {
        obj.material = state.driveXray ? mats.motorHousingXray : mats.motorHousing;
      }
    });
    drive.magFieldGroup.visible = state.driveXray;
    for (const acc of drive.accumulators) {
      acc.outer.material = state.driveXray ? mats.motorHousingXray : mats.machineBlue;
      acc.glow.visible = state.driveXray;
    }

    // 3. Velocity & Zone Color Ribbon Overlay
    station.zoneOverlayGroup.visible = state.showZones;

    // 4. 3D Hotspots Layer
    if (labelLayer) {
      labelLayer.classList.toggle('is-visible', state.showLabels);
    }

    // 5. Mode legend bar inside viewport
    const legendEl = document.getElementById('gs-mode-legend');
    if (legendEl) {
      if (state.showZones) {
        legendEl.classList.remove('hidden');
        legendEl.innerHTML = `
          <span><i style="background:#38bdf8"></i>0,30 m/s EG &amp; Riesenräder</span>
          <span><i style="background:#f59e0b"></i>Reifenförderer (a ≈ 1,35 m/s²)</span>
          <span><i style="background:#ef4444"></i>Ein-/Auskuppelstelle</span>
          <span><i style="background:#22c55e"></i>6,0 m/s Förderseil</span>
        `;
      } else if (state.clampCutaway) {
        legendEl.classList.remove('hidden');
        legendEl.innerHTML = `
          <span><i style="background:#f59e0b"></i>Tellerfedern gespannt (Klemme offen)</span>
          <span><i style="background:#22c55e"></i>28 kN Klemmkraft (Fail-Safe zu)</span>
          <span><i style="background:#ef4444"></i>Klemmfehler (&lt; 24 kN)</span>
        `;
      } else if (state.driveXray) {
        legendEl.classList.remove('hidden');
        legendEl.innerHTML = `
          <span><i style="background:#ea8a3c"></i>Kupfer-Statorwicklungen</span>
          <span><i style="background:#dc2626"></i>Permanentmagnet-Rotor (N/S)</span>
          <span><i style="background:#38bdf8"></i>Drehfeld &amp; 165-bar-Druckspeicher</span>
        `;
      } else {
        legendEl.classList.add('hidden');
      }
    }

    syncUiControls();
  }

  // =========================================================================
  // 4. 3D CLICKABLE HOTSPOTS (PROJECTED TO VIEWPORT)
  // =========================================================================
  const hotspotPins = [];
  if (labelLayer) {
    for (const hs of GONDOLA_HOTSPOTS) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gs-label-pin';
      btn.dataset.hsId = hs.id;
      btn.innerHTML = `<span class="gs-pin-num">${hs.num}</span><span>${hs.name}</span>`;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.activeHotspotId = hs.id;
        animateCameraTo(hs.camPos, hs.camTarget, 0.9);
        showHotspotCard(hs);
      });
      labelLayer.appendChild(btn);
      hotspotPins.push({ btn, hs, vec: new THREE.Vector3(hs.pos[0], hs.pos[1], hs.pos[2]) });
    }
  }

  const tourCardEl = document.getElementById('gs-tour-card');

  function showHotspotCard(hs) {
    state.activeTourStep = -1;
    if (!tourCardEl) return;
    tourCardEl.classList.remove('hidden');
    tourCardEl.innerHTML = `
      <div class="gs-tour-head">
        <span class="gs-tour-badge">Baugruppe #${hs.num}</span>
        <button type="button" class="gs-tour-close" id="gs-card-close" aria-label="Schließen">✕</button>
      </div>
      <h3 class="gs-tour-title">${hs.name}</h3>
      <p class="gs-tour-body">${hs.short}</p>
      <div class="gs-tour-actions">
        <button type="button" class="gs-tour-btn primary" id="gs-card-tour">🧭 Geführte Tour starten</button>
      </div>
    `;
    document.getElementById('gs-card-close')?.addEventListener('click', closeTourCard);
    document.getElementById('gs-card-tour')?.addEventListener('click', () => startTour(0));
  }

  function closeTourCard() {
    state.activeTourStep = -1;
    state.activeHotspotId = null;
    tourCardEl?.classList.add('hidden');
    syncUiControls();
  }

  function startTour(stepIdx) {
    const idx = Math.max(0, Math.min(GONDOLA_TOUR_STEPS.length - 1, stepIdx));
    state.activeTourStep = idx;
    const step = GONDOLA_TOUR_STEPS[idx];

    // Apply tour step presets automatically!
    state.showShell = step.modes.showShell;
    state.clampCutaway = step.modes.clampCutaway;
    state.driveXray = step.modes.driveXray;
    state.showZones = step.modes.showZones;
    state.timeScale = step.modes.timeScale;
    applyVisualModes();
    animateCameraTo(step.camPos, step.camTarget, 1.05);

    if (tourCardEl) {
      tourCardEl.classList.remove('hidden');
      tourCardEl.innerHTML = `
        <div class="gs-tour-head">
          <span class="gs-tour-badge">Station ${step.num} / ${GONDOLA_TOUR_STEPS.length}</span>
          <button type="button" class="gs-tour-close" id="gs-card-close" aria-label="Tour beenden">✕</button>
        </div>
        <h3 class="gs-tour-title">${step.title}</h3>
        <div class="gs-tour-sub">${step.subtitle}</div>
        <p class="gs-tour-body">${step.body}</p>
        <div class="gs-tour-actions">
          <button type="button" class="gs-tour-btn" id="gs-tour-prev" ${idx === 0 ? 'disabled' : ''}>← Zurück</button>
          <button type="button" class="gs-tour-btn primary" id="gs-tour-next">${idx === GONDOLA_TOUR_STEPS.length - 1 ? '✓ Beenden' : 'Weiter →'}</button>
        </div>
      `;
      document.getElementById('gs-card-close')?.addEventListener('click', closeTourCard);
      document.getElementById('gs-tour-prev')?.addEventListener('click', () => startTour(idx - 1));
      document.getElementById('gs-tour-next')?.addEventListener('click', () => {
        if (idx === GONDOLA_TOUR_STEPS.length - 1) closeTourCard();
        else startTour(idx + 1);
      });
    }
    syncUiControls();
  }

  function updateHotspotPositions() {
    if (!state.showLabels || !labelLayer) return;
    const w = viewport.clientWidth;
    const h = viewport.clientHeight;
    for (const item of hotspotPins) {
      const p = item.vec.clone().project(camera);
      const visible = p.z > -1 && p.z < 1;
      if (!visible) {
        item.btn.style.display = 'none';
        continue;
      }
      const x = (p.x * 0.5 + 0.5) * w;
      const y = (-p.y * 0.5 + 0.5) * h;
      if (x < -80 || x > w + 80 || y < -30 || y > h + 30) {
        item.btn.style.display = 'none';
        continue;
      }
      item.btn.style.display = 'inline-flex';
      item.btn.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      item.btn.classList.toggle('active', item.hs.id === state.activeHotspotId);
    }
  }

  // =========================================================================
  // 5. UI EVENT WIRING (DOCK, SIDE PANEL, FOLLOW-CAM, FAULT DEMO, MOBILE)
  // =========================================================================
  const workspaceEl = document.querySelector('.gs-workspace');
  const sidePanelEl = document.getElementById('gs-side-panel');
  const drawerBackdropEl = document.getElementById('gs-drawer-backdrop');
  const mobileToggleBtn = document.getElementById('gs-mobile-panel-toggle');
  const speedSlider = document.getElementById('gs-speed-slider');
  const speedValEl = document.getElementById('gs-speed-val');
  const faultBtn = document.getElementById('gs-btn-fault');
  const faultBannerEl = document.getElementById('gs-fault-banner');

  function setMobileDrawerOpen(open) {
    sidePanelEl?.classList.toggle('mobile-open', open);
    drawerBackdropEl?.classList.toggle('open', open);
    mobileToggleBtn?.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  mobileToggleBtn?.addEventListener('click', () => {
    const isOpen = sidePanelEl?.classList.contains('mobile-open');
    setMobileDrawerOpen(!isOpen);
  });
  document.getElementById('gs-drawer-close')?.addEventListener('click', () => setMobileDrawerOpen(false));
  drawerBackdropEl?.addEventListener('click', () => setMobileDrawerOpen(false));

  // Collapsible right panel on desktop
  document.getElementById('gs-btn-collapse')?.addEventListener('click', () => {
    const collapsed = workspaceEl?.classList.toggle('panel-collapsed');
    const btn = document.getElementById('gs-btn-collapse');
    if (btn) btn.textContent = collapsed ? '◧ Pult' : '◨ Vollbild';
    setTimeout(handleResize, 260);
  });

  // Topbar Blue Hour vs Alpine Day toggle
  document.getElementById('gs-btn-lighting')?.addEventListener('click', () => {
    applyLightingMode(state.lightingMode === 'blue_hour' ? 'alpine_day' : 'blue_hour');
  });

  // Mode Dock Toggles
  document.querySelectorAll('[data-gs-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.gsToggle;
      if (key === 'shell') {
        state.showShell = !state.showShell;
      } else if (key === 'clampCutaway') {
        state.clampCutaway = !state.clampCutaway;
        if (state.clampCutaway) {
          state.showShell = false;
          state.driveXray = false;
          // Gently focus macro close-up on Funitel Dual Attach Ramp (outer rope Z = +4.85 m) + slow-mo!
          animateCameraTo([11.55, 10.68, 7.35], [11.55, 10.12, 4.75], 0.9);
          if (state.timeScale > 0.35) state.timeScale = 0.15;
        }
      } else if (key === 'driveXray') {
        state.driveXray = !state.driveXray;
        if (state.driveXray) {
          state.showShell = false;
          state.clampCutaway = false;
          animateCameraTo([9.4, 11.8, 6.8], [4.4, 9.1, 0.0], 0.9);
        }
      } else if (key === 'showZones') {
        state.showZones = !state.showZones;
      } else if (key === 'showLabels') {
        state.showLabels = !state.showLabels;
      } else if (key === 'followCabin') {
        state.followCabin = !state.followCabin;
        if (state.followCabin) {
          camTween.active = false;
          state.activeTourStep = -1;
          tourCardEl?.classList.add('hidden');
        }
      }
      applyVisualModes();
    });
  });

  // Reset Camera
  document.getElementById('gs-btn-reset')?.addEventListener('click', () => {
    state.followCabin = false;
    state.clampCutaway = false;
    state.driveXray = false;
    state.showShell = true;
    applyVisualModes();
    animateCameraTo(
      [DEFAULT_CAM_POS.x, DEFAULT_CAM_POS.y, DEFAULT_CAM_POS.z],
      [DEFAULT_CAM_TARGET.x, DEFAULT_CAM_TARGET.y, DEFAULT_CAM_TARGET.z],
      0.85
    );
  });

  // Tour launcher
  document.getElementById('gs-btn-tour')?.addEventListener('click', () => {
    if (state.activeTourStep >= 0) closeTourCard();
    else startTour(0);
  });

  // Rope Speed Slider (0 .. 7.0 m/s) + Soft Stop / Nominal buttons
  speedSlider?.addEventListener('input', () => {
    const val = parseFloat(speedSlider.value);
    physics.setTargetSpeed(val);
    if (speedValEl) speedValEl.textContent = `${fmt(val, 1)} m/s (${fmt(val * 3.6, 1)} km/h)`;
  });
  document.getElementById('gs-btn-stop')?.addEventListener('click', () => {
    physics.setTargetSpeed(0);
    if (speedSlider) speedSlider.value = '0';
    if (speedValEl) speedValEl.textContent = '0,0 m/s (Sanft-Stopp)';
  });
  document.getElementById('gs-btn-nom')?.addEventListener('click', () => {
    if (physics.faultState === 'halted' || physics.faultState === 'alarm_braking') physics.resetFault();
    physics.setTargetSpeed(GS_SPECS.speeds.nominalRopeMs);
    if (speedSlider) speedSlider.value = String(GS_SPECS.speeds.nominalRopeMs);
    if (speedValEl) speedValEl.textContent = '6,0 m/s (21,6 km/h)';
  });

  // Simulation Time Scale (Pause, 0.02× Super-Slow-Mo, 0.15×, 0.5×, 1.0×, 1.5×) + Single Step!
  document.querySelectorAll('[data-gs-speed]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const s = parseFloat(btn.dataset.gsSpeed);
      if (s > 0) state.prevTimeScale = s;
      state.timeScale = s;
      syncUiControls();
    });
  });

  document.getElementById('gs-btn-step')?.addEventListener('click', () => {
    state.timeScale = 0;
    const snap = physics.step(0.04); // Exact 40 ms precision engineering step!
    applySnapshotToScene(snap, 0.04);
    syncUiControls();
  });

  // Safety Fault Simulation Button ("⚠️ Klemmfehler simulieren" / "↺ Störung quittieren & Anfahren")
  faultBtn?.addEventListener('click', () => {
    if (physics.faultState === 'normal') {
      physics.triggerClampFault();
      // Open cutaway & switch to Clamp Monitor tab so user watches the exact moment!
      state.showShell = false;
      state.clampCutaway = true;
      diagnostics.setTab('clamp');
      document.querySelectorAll('[data-gs-diag]').forEach((b) => {
        b.classList.toggle('active', b.dataset.gsDiag === 'clamp');
      });
      animateCameraTo([13.2, 11.1, 6.2], [12.6, 10.15, 2.8], 0.85);
      applyVisualModes();
    } else {
      physics.resetFault();
      if (speedSlider) speedSlider.value = String(physics.targetSpeedMs);
    }
    syncUiControls();
  });

  // Diagnostics Tabs
  document.querySelectorAll('[data-gs-diag]').forEach((btn) => {
    btn.addEventListener('click', () => {
      diagnostics.setTab(btn.dataset.gsDiag);
      document.querySelectorAll('[data-gs-diag]').forEach((b) => {
        b.classList.toggle('active', b === btn);
      });
      diagnostics.render(physics.getSnapshot());
    });
  });

  // Audio Toggle (Topbar + Side Panel)
  const toggleAudio = () => {
    const on = audio.toggle();
    const topMute = document.getElementById('btn-mute');
    const panelAudio = document.getElementById('gs-btn-audio');
    if (topMute) topMute.textContent = on ? '🔊' : '🔇';
    if (panelAudio) {
      panelAudio.textContent = on ? '🔊 Sound An' : '🔇 Sound Aus';
      panelAudio.classList.toggle('active', on);
    }
  };
  document.getElementById('btn-mute')?.addEventListener('click', toggleAudio);
  document.getElementById('gs-btn-audio')?.addEventListener('click', toggleAudio);

  // Version Pill -> Open Changelog Dialog via shared/update-banner.js
  document.getElementById('gs-version-btn')?.addEventListener('click', () => {
    if (window.ArcadeUpdateBanner?.openModal) {
      window.ArcadeUpdateBanner.openModal('gondola_station');
    }
  });

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if (e.code === 'Space') {
      e.preventDefault();
      state.timeScale = state.timeScale > 0 ? 0 : (state.prevTimeScale || 1.0);
      syncUiControls();
    } else if (e.key === '.') {
      state.timeScale = 0;
      const snap = physics.step(0.04);
      applySnapshotToScene(snap, 0.04);
      syncUiControls();
    } else if (e.key === 'r' || e.key === 'R') {
      document.getElementById('gs-btn-reset')?.click();
    } else if (e.key === 'f' || e.key === 'F') {
      state.followCabin = !state.followCabin;
      syncUiControls();
    }
  });

  function syncUiControls() {
    const lightBtn = document.getElementById('gs-btn-lighting');
    if (lightBtn) {
      const isNight = state.lightingMode === 'blue_hour';
      lightBtn.textContent = isNight ? '🌙 Blaue Stunde' : '☀️ Alpiner Tag';
      lightBtn.classList.toggle('active', isNight);
    }

    document.querySelectorAll('[data-gs-toggle]').forEach((btn) => {
      const k = btn.dataset.gsToggle;
      if (k === 'shell') {
        btn.classList.toggle('active', state.showShell);
        btn.textContent = state.showShell ? '🏛️ Glas-Station' : '🏛️ Dach Offen';
      }
      if (k === 'clampCutaway') btn.classList.toggle('active', state.clampCutaway);
      if (k === 'driveXray') btn.classList.toggle('active', state.driveXray);
      if (k === 'showZones') btn.classList.toggle('active', state.showZones);
      if (k === 'showLabels') btn.classList.toggle('active', state.showLabels);
      if (k === 'followCabin') btn.classList.toggle('active', state.followCabin);
    });

    document.querySelectorAll('[data-gs-speed]').forEach((btn) => {
      const v = parseFloat(btn.dataset.gsSpeed);
      btn.classList.toggle('active', Math.abs(v - state.timeScale) < 0.005);
    });

    if (faultBtn) {
      if (physics.faultState === 'normal') {
        faultBtn.textContent = '⚠️ Klemmfehler simulieren';
        faultBtn.classList.remove('reset-mode');
      } else if (physics.faultState === 'armed') {
        faultBtn.textContent = '⏳ Fehler-Kabine läuft ein… (Abbrechen)';
        faultBtn.classList.add('reset-mode');
      } else {
        faultBtn.textContent = '↺ Störung quittieren & Anfahren';
        faultBtn.classList.add('reset-mode');
      }
    }
  }

  // =========================================================================
  // 6. APPLY SIMULATION SNAPSHOT TO ALL 3D MESHES & TELEMETRY
  // =========================================================================
  const telEls = {
    speed: document.getElementById('gs-tel-speed'),
    speedSub: document.getElementById('gs-tel-speed-sub'),
    drive: document.getElementById('gs-tel-drive'),
    driveSub: document.getElementById('gs-tel-drive-sub'),
    tension: document.getElementById('gs-tel-tension'),
    tensionSub: document.getElementById('gs-tel-tension-sub'),
    clamp: document.getElementById('gs-tel-clamp'),
    clampSub: document.getElementById('gs-tel-clamp-sub'),
    cap: document.getElementById('gs-tel-cap'),
    capSub: document.getElementById('gs-tel-cap-sub'),
    brake: document.getElementById('gs-tel-brake'),
    brakeSub: document.getElementById('gs-tel-brake-sub')
  };

  let lastRopeSag = 0;
  let diagThrottle = 3;
  const followTargetVec = new THREE.Vector3();
  const followPosVec = new THREE.Vector3();

  function applySnapshotToScene(snap, simDt) {
    // 1. Rotate ALL FOUR Giant Vertical Ferris Wheels (2 Twin Pairs) + Counter-Rotate All 16 Carrier Forks!
    const { downTheta, upTheta, bullwheelTheta, ropeDistance } = snap.wheels;
    for (const p of ferris.wheels.down.pivots) p.rotation.z = downTheta;
    for (const arm of ferris.wheels.down.arms) arm.rotation.z = -downTheta;
    for (const p of ferris.wheels.up.pivots) p.rotation.z = upTheta;
    for (const arm of ferris.wheels.up.arms) arm.rotation.z = -upTheta;

    // 2. Coaxial Twin Bullwheels + DirectDrive Rotor + Rotating Magnetic Flux Field + Mountain Return Wheel
    drive.bullwheelPivot.rotation.y = bullwheelTheta;
    drive.rotorGroup.rotation.y = bullwheelTheta;
    drive.magFieldGroup.rotation.y = bullwheelTheta * 4.0;
    alpine.returnWheel.rotation.y = bullwheelTheta;

    // 3. Hydraulic Tension Carriage & Chrome Piston Rods + Pressure Accumulators
    const offsetM = snap.tensionCarriageOffsetM;
    drive.tensionCarriage.position.x = GS_SPECS.bullwheel.centerX + offsetM;
    for (const rod of drive.pistonRods) {
      rod.position.x = 2.45 + offsetM * 0.5;
      rod.scale.y = 1 + offsetM * 0.25;
    }
    const pressureScale = Math.max(0.45, Math.min(1.25, snap.hydraulicBar / 175));
    for (const acc of drive.accumulators) {
      acc.glow.scale.y = pressureScale;
    }

    // 4. Safety Disc Brake Calipers on Bullwheel
    const bEng = snap.brakeEngagement;
    for (const cal of drive.brakeCalipers) {
      cal.padTop.position.y = 0.12 - bEng * 0.065;
      cal.padBot.position.y = -0.12 + bEng * 0.065;
    }
    mats.brakeCaliperRed.emissive.setHex(bEng > 0.08 ? 0xff2200 : 0x000000);
    mats.brakeCaliperRed.emissiveIntensity = bEng * 1.4;

    // 5. All 4 Parallel Braided 54 mm Steel Ropes UV-Scroll + Tower 1 48 Sheaves!
    const uvScroll = -(ropeDistance * 1.55) % 1;
    mats.textures.ropeMap.offset.x = uvScroll;
    mats.textures.ropeBump.offset.x = uvScroll;

    const sheaveDeltaAngle = (snap.actualSpeedMs * simDt) / 0.22;
    for (const sh of station.towerSheaves) {
      sh.mesh.rotation.z -= sh.sideSign * sheaveDeltaAngle;
    }

    // 6. All 80 Dual-Rail Rubber Conveyor Tires (EXACT local ω_i = v(s_i) / r_tire!)
    for (const t of conveyors.allTires) {
      t.angle += t.spec.omegaNom * snap.speedFactor * simDt * (t.spec.sideSign > 0 ? -1 : 1);
      t.pivot.rotation.y = t.angle;
    }

    // 7. Dual-Rope Clamping Force & Rope Position Check Zone Beacon Lamps
    if (snap.sensorFlashState === 'fault') {
      const pulse = 0.65 + 0.35 * Math.sin(performance.now() * 0.016);
      coupling.sensorLampMat.color.setHex(0xef4444);
      coupling.sensorLampMat.emissive.setHex(0xff1e1e);
      coupling.sensorLampMat.emissiveIntensity = 1.6 + pulse * 1.2;
    } else if (snap.sensorFlashState === 'ok') {
      coupling.sensorLampMat.color.setHex(0x22c55e);
      coupling.sensorLampMat.emissive.setHex(0x22c55e);
      coupling.sensorLampMat.emissiveIntensity = 2.4;
    } else {
      coupling.sensorLampMat.color.setHex(0x16a34a);
      coupling.sensorLampMat.emissive.setHex(0x16a34a);
      coupling.sensorLampMat.emissiveIntensity = 0.45;
    }

    // 8. Update All 10 Cobalt-Blue 24er Funitel Cabins & ALL 4 Spring Grips per Cabin!
    for (let i = 0; i < fleet.cabins.length; i++) {
      const mesh = fleet.cabins[i];
      const c = snap.cabins[i];
      const isFaulted = i === snap.faultCabinIndex;

      mesh.root.position.set(c.x, c.y, c.z);
      mesh.root.rotation.set(0, c.yaw, 0);
      mesh.swingGroup.rotation.z = c.swingPitch || 0;

      const slide = c.doorOpen * 0.46;
      mesh.doorLeft.position.x = -mesh.doorBaseX - slide;
      mesh.doorRight.position.x = mesh.doorBaseX + slide;

      const g = c.grip;
      if (g.springCompression > 0.05) {
        mesh.springMat.color.setHex(0xf59e0b);
        mesh.springMat.emissive.setHex(0xf97316);
        mesh.springMat.emissiveIntensity = 0.5 + g.springCompression * 1.45;
      } else {
        mesh.springMat.color.setHex(0x94a3b8);
        mesh.springMat.emissive.setHex(0x000000);
        mesh.springMat.emissiveIntensity = 0.0;
      }

      const showArrows = state.clampCutaway && g.onRope && g.clampingForceKN > 1.0;
      if (showArrows) {
        const badForce = isFaulted && (c.zone === 'attach' || c.zone === 'check' || c.zone === 'rope_out');
        mesh.arrowMat.color.setHex(badForce ? 0xef4444 : 0x22c55e);
        mesh.arrowMat.emissive.setHex(badForce ? 0xff2222 : 0x22c55e);
        mesh.arrowMat.emissiveIntensity = badForce ? 2.2 : 1.7;
      }
      const sArrow = Math.max(0.55, g.clampingForceKN / GS_SPECS.cabin.gripNominalForceKN);

      // Animate all 4 Funitel spring grips (2 on inner rope + 2 on outer rope!)
      for (const u of mesh.gripUnits) {
        u.gripCover.visible = !state.clampCutaway;
        u.leverPivot.rotation.x = -g.rollerLift * 0.58;
        u.movableJawPivot.rotation.x = g.jawOpen * 0.72;
        u.springPack.scale.z = 1.0 - g.springCompression * 0.34;
        u.forceArrows.visible = showArrows;
        if (showArrows) u.forceArrows.scale.set(1, sArrow, 1);
      }
    }

    // 9. Animate EG Automatic Glass Boarding Gates synced to passing cabins!
    for (const gate of station.boardingGates) {
      let minDist = Infinity;
      for (const c of snap.cabins) {
        if (c.zone === 'eg_board' || c.zone === 'eg_turn') {
          const d = Math.hypot(c.x - gate.x, c.z - gate.z);
          if (d < minDist) minDist = d;
        }
      }
      const openFrac = minDist < 1.85 ? Math.max(0, Math.min(1, 1 - (minDist - 0.7) / 1.15)) : 0;
      gate.wingL.position.x = -0.27 - openFrac * 0.30;
      gate.wingR.position.x = 0.27 + openFrac * 0.30;
    }

    // 10. Subtle dynamic rope sag update for BOTH Funitel rope loops
    if (Math.abs(snap.dynamicSagOffsetM - lastRopeSag) > 0.04) {
      lastRopeSag = snap.dynamicSagOffsetM;
      const oldIn = station.ropeMesh.geometry;
      station.ropeMesh.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(station.buildInnerRopePoints(lastRopeSag), true), 300, 0.044, 8, true);
      oldIn.dispose();
      const oldOut = station.outerRopeMesh.geometry;
      station.outerRopeMesh.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(station.buildOuterRopePoints(lastRopeSag), true), 320, 0.044, 8, true);
      oldOut.dispose();
    }

    // 11. Follow-Cam ("Eine Gondel komplett begleiten" -> tracks Cabin #01 smoothly!)
    if (state.followCabin) {
      const c0 = snap.cabins[0];
      followTargetVec.set(c0.x, c0.y - 1.45, c0.z);
      const outSign = c0.z >= 0 ? 1 : -1;
      if (c0.zone === 'wheel_down' || c0.zone === 'wheel_up') {
        followPosVec.set(c0.x - 7.2, c0.y - 0.2, c0.z + outSign * 8.8);
      } else if (c0.zone === 'eg_turn' || c0.zone === 'eg_board' || c0.zone === 'eg_disembark') {
        followPosVec.set(c0.x + 5.2, 3.6, c0.z + outSign * 6.8);
      } else if (c0.zone === 'attach' || c0.zone === 'check') {
        followPosVec.set(c0.x - 1.8, c0.y + 0.65, c0.z + 4.8);
      } else {
        followPosVec.set(c0.x - 5.0, c0.y + 1.5, c0.z + outSign * 8.2);
      }
      camera.position.lerp(followPosVec, 0.065);
      controls.target.lerp(followTargetVec, 0.12);
    }

    // 12. Update Telemetry DOM & Live Fault Banner + Diagnostics
    diagThrottle++;
    if (diagThrottle % 4 === 0 || simDt === 0.04) {
      if (telEls.speed) telEls.speed.textContent = `${fmt(snap.actualSpeedMs, 2)} m/s`;
      if (telEls.speedSub) telEls.speedSub.textContent = `${fmt(snap.actualSpeedKmh, 1)} km/h · EG ${fmt(snap.slowSpeedMs, 2)} m/s`;
      if (telEls.drive) telEls.drive.textContent = `${fmt(snap.powerKw, 0)} kW`;
      if (telEls.driveSub) telEls.driveSub.textContent = `${fmt(snap.torqueKNm, 0)} kNm · ${fmt(snap.directDriveRpm, 1)} U/min`;
      if (telEls.tension) telEls.tension.textContent = `${fmt(snap.tensionForceKN, 0)} kN`;
      if (telEls.tensionSub) telEls.tensionSub.textContent = `${fmt(snap.hydraulicBar, 0)} bar · 2× Seilspannung`;
      if (telEls.clamp) {
        telEls.clamp.textContent = `4× ${fmt(snap.clampReadout.forceKN, 1)} kN`;
        telEls.clamp.classList.toggle('red', snap.faultState === 'alarm_braking' || snap.faultState === 'halted');
      }
      if (telEls.clampSub) telEls.clampSub.textContent = `Kabine #${String(snap.clampReadout.cabinNumber).padStart(2, '0')} · Σ ${fmt(snap.clampReadout.forceKN * 4, 0)} kN · Δv ${fmt(snap.clampReadout.deltaV, 2)}`;
      if (telEls.cap) telEls.cap.textContent = `${snap.capacityPph.toLocaleString('de-DE')} P/h`;
      if (telEls.capSub) telEls.capSub.textContent = `24er-Funitel · Folge ${snap.headwaySec > 0 ? fmt(snap.headwaySec, 1) + ' s' : '–'}`;
      if (telEls.brake) {
        telEls.brake.textContent = snap.brakeEngagement > 0.05 ? 'NOTHALT AKTIV' : 'Frei / Bereit';
        telEls.brake.classList.toggle('red', snap.brakeEngagement > 0.05);
      }
      if (telEls.brakeSub) {
        const zInfo = ZONE_META[snap.cabins[0].zone] || ZONE_META.rope_out;
        telEls.brakeSub.textContent = state.followCabin ? `Folgt #01: ${zInfo.label}` : 'Bullwheel-Scheibenbremse';
      }

      if (faultBannerEl) {
        if (snap.faultState === 'normal') {
          faultBannerEl.classList.add('hidden');
        } else {
          faultBannerEl.classList.remove('hidden');
          faultBannerEl.classList.toggle('is-alarm', snap.faultState === 'alarm_braking' || snap.faultState === 'halted');
          faultBannerEl.textContent = snap.faultReason;
        }
      }

      diagnostics.render(snap);
      syncUiControls();
    }

    audio.update(snap);
  }

  // =========================================================================
  // 7. RESIZE & MAIN 60-FPS RENDER LOOP
  // =========================================================================
  function handleResize() {
    const w = Math.max(1, viewport.clientWidth);
    const h = Math.max(1, viewport.clientHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    bloomPass.resolution.set(w, h);
  }
  window.addEventListener('resize', handleResize);
  handleResize();

  // Initialize default lighting & visual state
  applyLightingMode('blue_hour');
  applyVisualModes();

  // Initial synchronous snapshot before first frame
  applySnapshotToScene(physics.getSnapshot(), 0.016);

  // Expose lightweight debug hook for automated visual verification
  window.__GONDOLA_APP__ = {
    state,
    physics,
    kinematics,
    startTour,
    applyLightingMode,
    applyVisualModes,
    animateCameraTo
  };

  let lastFrameTs = performance.now();
  function animate(now) {
    requestAnimationFrame(animate);
    const rawDt = Math.min(0.05, Math.max(0.001, (now - lastFrameTs) / 1000));
    lastFrameTs = now;

    // Smooth camera tween
    if (camTween.active) {
      camTween.progress = Math.min(1, camTween.progress + rawDt / camTween.duration);
      const t = camTween.progress;
      const ease = t * t * (3 - 2 * t);
      camera.position.lerpVectors(camTween.startPos, camTween.endPos, ease);
      controls.target.lerpVectors(camTween.startTarget, camTween.endTarget, ease);
      if (t >= 1) camTween.active = false;
    }

    controls.update();

    // Advance simulation according to timeScale (0 = Pause, 0.02× super-slow-mo .. 1.5×)
    const simDt = rawDt * state.timeScale;
    const snap = simDt > 0 ? physics.step(simDt) : physics.getSnapshot();
    applySnapshotToScene(snap, simDt);

    updateHotspotPositions();
    composer.render();
  }
  requestAnimationFrame(animate);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGondolaStationApp);
} else {
  initGondolaStationApp();
}
