// Main Entry & 3D Orchestrator for Kässbohrer PistenBully 800 W Explainer
// Three.js 0.170.0 (local vendored) + RoomEnvironment PMREM + ACESFilmic + Selective UnrealBloomPass

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import { PB_SPECS } from './specs.js';
import {
  solveBladeKinematics,
  solveTillerKinematics,
  solveWinchKinematics,
  degToRad
} from './pb-kinematics.js';
import { PistenBullyPhysics } from './pb-physics.js';
import { createPistenBullyMaterials } from './pb-textures.js';
import {
  buildAlpineEnvironment,
  buildTrackedUndercarriage,
  buildChassisAndHydraulics
} from './pb-model-chassis.js';
import {
  buildCabAndBody,
  buildBlade12Way,
  buildTillerAndFinisher,
  buildWinch47t,
  buildForceVectors
} from './pb-model-implements.js';
import { PistenBullyParticleSystem } from './pb-particles.js';
import { PistenBullyDiagnostics } from './pb-diagnostics.js';
import { PistenBullyAudio } from './pb-audio.js';
import { PISTENBULLY_PARTS, PISTENBULLY_TOUR_STEPS } from './pb-data.js';

const DEFAULT_CAM_LOCAL_POS = new THREE.Vector3(8.6, 4.1, 9.8);
const DEFAULT_CAM_LOCAL_TARGET = new THREE.Vector3(-0.3, 1.35, 0.0);

const BLADE_PRESETS = {
  grade: { lift: 0.06, angleDeg: 0, tiltDeg: 0, pitchDeg: 4, wingDeg: 14, snowLoad: 0.45 },
  push: { lift: 0.02, angleDeg: 0, tiltDeg: 0, pitchDeg: -6, wingDeg: 38, snowLoad: 0.92 },
  transport: { lift: 0.85, angleDeg: 0, tiltDeg: 0, pitchDeg: 12, wingDeg: -32, snowLoad: 0.0 }
};

function fmt(num, digits = 1) {
  return Number(num).toLocaleString('de-DE', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
}

function initPistenBullyApp() {
  const viewport = document.getElementById('pb-viewport');
  const canvas = document.getElementById('pb-canvas');
  const labelLayer = document.getElementById('pb-label-layer');
  const forceLabelLayer = document.getElementById('pb-force-label-layer');
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
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.52;

  const camera = new THREE.PerspectiveCamera(42, 16 / 9, 0.12, 260);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.065;
  controls.minDistance = 3.2;
  controls.maxDistance = 36.0;
  controls.maxPolarAngle = Math.PI * 0.56;

  // Alpine Hemisphere + Key Moon/Sun + Glacier Rim Light
  const hemiLight = new THREE.HemisphereLight(0x4c78b8, 0x1e2c44, 0.72);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xc2dcff, 1.35);
  keyLight.position.set(16, 24, 15);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.near = 2;
  keyLight.shadow.camera.far = 75;
  keyLight.shadow.camera.left = -16;
  keyLight.shadow.camera.right = 16;
  keyLight.shadow.camera.top = 14;
  keyLight.shadow.camera.bottom = -14;
  keyLight.shadow.bias = -0.0004;
  scene.add(keyLight);

  // Subtle rim light to sculpt the crimson red PistenBully & yellow finisher against blue alpine dusk!
  const rimLight = new THREE.DirectionalLight(0x7dd3fc, 0.95);
  rimLight.position.set(-14, 11, -16);
  scene.add(rimLight);

  // Post-Processing: EffectComposer + RenderPass + Selective UnrealBloomPass + OutputPass
  // High threshold (> 1.32) ensures ONLY LEDs, amber beacons, cockpit HUD & snow sparkles bloom — snow never blows out!
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(1280, 720), 0.36, 0.52, 1.34);
  const outputPass = new OutputPass();
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
  composer.addPass(outputPass);

  // =========================================================================
  // 2. BUILD ALPINE WORLD & PISTENBULLY 800 W ASSEMBLIES
  // =========================================================================
  const mats = createPistenBullyMaterials();
  const env = buildAlpineEnvironment(mats);
  scene.add(env.horizonGroup);
  scene.add(env.slopeGroup);

  const vehicleRoot = new THREE.Group();
  env.slopeGroup.add(vehicleRoot);

  const tracksSys = buildTrackedUndercarriage(mats);
  const chassisSys = buildChassisAndHydraulics(mats);
  const cabSys = buildCabAndBody(mats);
  const bladeSys = buildBlade12Way(mats);
  const tillerSys = buildTillerAndFinisher(mats);
  const winchSys = buildWinch47t(mats);
  const forceSys = buildForceVectors();

  vehicleRoot.add(
    tracksSys.root,
    chassisSys.root,
    cabSys.root,
    bladeSys.root,
    tillerSys.root,
    winchSys.root,
    forceSys.root
  );

  const particleSys = new PistenBullyParticleSystem(env.slopeGroup, mats);

  // =========================================================================
  // 3. PHYSICS, DIAGNOSTICS, AUDIO & INTERACTIVE STATE
  // =========================================================================
  const physics = new PistenBullyPhysics();
  const diagnostics = new PistenBullyDiagnostics(document.getElementById('pb-diag-svg'));
  const audio = new PistenBullyAudio();

  const state = {
    nightMode: true,          // Default: "Nachtpräparierung / Blaue Stunde"!
    hydraulicsXray: false,
    sinterCutaway: false,
    showForces: false,
    snowsatHeatmap: false,
    snowsatBlend: 0,
    showLabels: false,
    paused: false,
    timeScale: 0.85,
    currentSlopeRad: degToRad(physics.slopeDeg),
    blade: { ...BLADE_PRESETS.grade },
    bladePreset: 'grade',
    tiller: {
      active: true,
      downpressure: 0.68,
      wingsFolded: false
    },
    winch: {
      mode: 'auto',
      manualTonnes: 3.2,
      turretYawDeg: 0
    },
    diagTab: 'slope',
    selectedPartId: 'tracks_undercarriage',
    tourActive: false,
    tourIndex: 0
  };

  // =========================================================================
  // 4. LIGHTING MODE (BLUE HOUR NIGHT GROOMING vs. ALPINE SUNNY DAY)
  // =========================================================================
  function syncSceneLighting() {
    const isNight = state.nightMode;
    env.setLightingMode(isNight);
    cabSys.setLightingMode(isNight);

    if (isNight) {
      scene.background = new THREE.Color(0x061022);
      scene.fog = new THREE.FogExp2(0x0b1933, 0.011);
      hemiLight.color.setHex(0x4c79bd);
      hemiLight.groundColor.setHex(0x132038);
      hemiLight.intensity = 0.42;
      keyLight.color.setHex(0x9ec5f8);
      keyLight.intensity = 0.68;
      keyLight.position.set(14, 22, 14);
      rimLight.color.setHex(0x60a5fa);
      rimLight.intensity = 0.65;
      scene.environmentIntensity = 0.36;
      bloomPass.strength = 0.28;
      bloomPass.threshold = 1.65;
      renderer.toneMappingExposure = 1.02;
    } else {
      scene.background = new THREE.Color(0x7cc4fa);
      scene.fog = new THREE.FogExp2(0xc7e6fc, 0.0065);
      hemiLight.color.setHex(0xdbeafe);
      hemiLight.groundColor.setHex(0x7aa5cc);
      hemiLight.intensity = 0.85;
      keyLight.color.setHex(0xfff7e6);
      keyLight.intensity = 2.05;
      keyLight.position.set(22, 30, 18);
      rimLight.color.setHex(0x93c5fd);
      rimLight.intensity = 0.65;
      scene.environmentIntensity = 0.68;
      bloomPass.strength = 0.10;
      bloomPass.threshold = 1.85;
      renderer.toneMappingExposure = 0.94;
    }
  }

  // =========================================================================
  // 5. CAMERA FLY-TO (SLOPE-AWARE!)
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

  function localToSlopedWorld(v, slopeRad) {
    const c = Math.cos(slopeRad), s = Math.sin(slopeRad);
    return new THREE.Vector3(v.x * c - v.y * s, v.x * s + v.y * c, v.z);
  }

  function flyCameraLocal(localPosArr, localTargetArr, duration = 0.9) {
    const sRad = degToRad(physics.slopeDeg);
    const wTarget = localToSlopedWorld(new THREE.Vector3(...localTargetArr), sRad);
    const wPos = localToSlopedWorld(new THREE.Vector3(...localPosArr), sRad);
    // Keep camera smoothly above ground surface
    wPos.y = Math.max(wPos.y, wTarget.y + 0.45);
    camAnim.fromPos.copy(camera.position);
    camAnim.toPos.copy(wPos);
    camAnim.fromTarget.copy(controls.target);
    camAnim.toTarget.copy(wTarget);
    camAnim.t = 0;
    camAnim.dur = duration;
    camAnim.active = true;
  }

  function setInitialCamera() {
    const sRad = state.currentSlopeRad;
    const isPortrait = viewport.clientHeight > viewport.clientWidth * 1.1;
    const camLocal = isPortrait
      ? DEFAULT_CAM_LOCAL_POS.clone().multiplyScalar(1.42)
      : DEFAULT_CAM_LOCAL_POS;
    const p = localToSlopedWorld(camLocal, sRad);
    const tg = localToSlopedWorld(DEFAULT_CAM_LOCAL_TARGET, sRad);
    camera.position.copy(p);
    controls.target.copy(tg);
    controls.update();
  }
  setInitialCamera();

  controls.addEventListener('start', () => {
    camAnim.active = false;
  });

  // =========================================================================
  // 6. DOM HELPERS, VIEW MODES, INSPECTOR, HOTSPOTS & 8-STATION TOUR
  // =========================================================================
  const $ = (id) => document.getElementById(id);

  const legendEl = $('pb-mode-legend');
  function applyViewModes() {
    cabSys.setXray(state.hydraulicsXray);

    const exteriorActive = !state.hydraulicsXray && !state.sinterCutaway;
    document.querySelectorAll('[data-pb-toggle]').forEach((btn) => {
      const key = btn.getAttribute('data-pb-toggle');
      if (key === 'exterior') btn.classList.toggle('active', exteriorActive);
      else btn.classList.toggle('active', Boolean(state[key]));
    });

    const lightBtn = $('pb-btn-lighting');
    if (lightBtn) {
      lightBtn.textContent = state.nightMode ? '🌙 Blaue Stunde' : '☀️ Alpiner Tag';
      lightBtn.classList.toggle('active', state.nightMode);
    }

    if (labelLayer) labelLayer.classList.toggle('is-visible', state.showLabels);
    if (forceLabelLayer) forceLabelLayer.classList.toggle('is-visible', state.showForces);

    // Dynamic contextual legend
    if (legendEl) {
      const badges = [];
      if (state.hydraulicsXray) {
        badges.push(
          '<span><i style="background:#ef4444"></i>Hochdruck-Vorlauf (bis 450 bar)</span>',
          '<span><i style="background:#06b6d4"></i>Rücklauf (~25 bar)</span>',
          '<span><i style="background:#f59e0b"></i>Fräsenkreis</span>',
          '<span><i style="background:#a855f7"></i>4,7-t-Winde</span>'
        );
      }
      if (state.sinterCutaway) {
        badges.push(
          '<span><i style="background:#93c5fd"></i>Eisbrocken (vor Fräse)</span>',
          '<span><i style="background:#f59e0b"></i>Fräs-Reibungswärme</span>',
          '<span><i style="background:#facc15"></i>Gelber Finisher</span>',
          '<span><i style="background:#38bdf8"></i>Eisbrücken (Sintern)</span>'
        );
      }
      if (state.snowsatHeatmap) {
        badges.push(
          '<span><i style="background:#ef4444"></i>&lt; 25 cm kritisch</span>',
          '<span><i style="background:#eab308"></i>40 cm flach</span>',
          '<span><i style="background:#10b981"></i>65 cm optimal</span>',
          '<span><i style="background:#2563eb"></i>&gt; 100 cm Depot</span>'
        );
      }
      if (state.showForces) {
        badges.push(
          '<span><i style="background:#94a3b8"></i>FG Gewicht</span>',
          '<span><i style="background:#ef4444"></i>FH Hangabtrieb</span>',
          '<span><i style="background:#38bdf8"></i>FN Normalkraft</span>',
          '<span><i style="background:#facc15"></i>FW Seilwinde</span>',
          '<span><i style="background:#22c55e"></i>FT Kettenschub</span>'
        );
      }
      legendEl.innerHTML = badges.join('');
      legendEl.classList.toggle('hidden', badges.length === 0);
    }

    syncSceneLighting();
  }

  // Clickable Part Inspector
  const inspectorEl = $('pb-inspector');
  function selectPart(partId, fly = false) {
    const part = PISTENBULLY_PARTS[partId];
    if (!part) return;
    state.selectedPartId = partId;
    if (inspectorEl) {
      const specsHtml = part.specs.map(([k, v]) =>
        `<div class="pb-spec-row"><span>${k}</span><strong>${v}</strong></div>`
      ).join('');
      inspectorEl.innerHTML = `
        <div class="pb-insp-head">
          <span class="pb-insp-num">0${part.num}</span>
          <div>
            <div class="pb-insp-title">${part.name}</div>
            <div class="pb-insp-sub">${part.subtitle}</div>
          </div>
        </div>
        <p class="pb-insp-body">${part.summary}</p>
        <div class="pb-spec-list">${specsHtml}</div>
      `;
    }
    document.querySelectorAll('.pb-label-pin').forEach((p) => {
      p.classList.toggle('active', p.dataset.partId === partId);
    });
    if (fly) {
      const a = part.anchor;
      flyCameraLocal([a[0] + 4.4, a[1] + 2.2, a[2] + 5.2], a, 0.8);
    }
  }

  // Build 3D Hotspot Pins
  const hotspotPins = [];
  if (labelLayer) {
    for (const part of Object.values(PISTENBULLY_PARTS)) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pb-label-pin';
      btn.dataset.partId = part.id;
      btn.innerHTML = `<span class="pb-pin-num">${part.num}</span><span>${part.name.split(' (')[0]}</span>`;
      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        selectPart(part.id, true);
      });
      labelLayer.appendChild(btn);
      hotspotPins.push({ el: btn, anchor: new THREE.Vector3(...part.anchor) });
    }
  }

  // Build 3D Force Vector Floating Labels
  const forceBadgeDefs = [
    { key: 'fg', label: 'FG', color: '#cbd5e1' },
    { key: 'fh', label: 'FH', color: '#f87171' },
    { key: 'fn', label: 'FN', color: '#38bdf8' },
    { key: 'fw', label: 'FW', color: '#fde047' },
    { key: 'ft', label: 'FT', color: '#4ade80' },
    { key: 'fb', label: 'FB', color: '#d8b4fe' }
  ];
  const forceBadges = {};
  if (forceLabelLayer) {
    for (const def of forceBadgeDefs) {
      const span = document.createElement('div');
      span.className = 'pb-force-badge';
      span.style.borderColor = def.color;
      span.style.color = def.color;
      span.textContent = def.label;
      forceLabelLayer.appendChild(span);
      forceBadges[def.key] = span;
    }
  }

  const _projV = new THREE.Vector3();
  function projectToViewport(localPt, outEl, show) {
    if (!show || !outEl) return;
    _projV.copy(localPt);
    env.slopeGroup.localToWorld(_projV);
    _projV.project(camera);
    if (_projV.z > 1 || _projV.z < -1) {
      outEl.style.opacity = '0';
      return;
    }
    const x = (_projV.x * 0.5 + 0.5) * viewport.clientWidth;
    const y = (-_projV.y * 0.5 + 0.5) * viewport.clientHeight;
    outEl.style.opacity = '1';
    outEl.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
  }

  function updateFloatingLabels(telemetry) {
    if (state.showLabels) {
      for (const pin of hotspotPins) {
        projectToViewport(pin.anchor, pin.el, true);
      }
    }
    if (state.showForces) {
      forceBadges.fg.textContent = `FG ${fmt(telemetry.weightKN, 0)} kN`;
      forceBadges.fh.textContent = `FH ${fmt(telemetry.downhillKN, 0)} kN`;
      forceBadges.fn.textContent = `FN ${fmt(telemetry.normalKN, 0)} kN`;
      forceBadges.fw.textContent = telemetry.winchForceKN > 0.5 ? `FW ${fmt(telemetry.winchForceKN, 0)} kN` : '';
      forceBadges.ft.textContent = `FT ${fmt(Math.abs(telemetry.trackThrustKN), 0)} kN`;
      forceBadges.fb.textContent = telemetry.bladeResistanceKN > 1.5 ? `FB ${fmt(telemetry.bladeResistanceKN, 0)} kN` : '';

      for (const def of forceBadgeDefs) {
        const badge = forceBadges[def.key];
        const hasText = Boolean(badge.textContent);
        badge.style.display = hasText ? 'block' : 'none';
        if (hasText) {
          projectToViewport(forceSys.labelAnchors[def.key], badge, true);
        }
      }
    }
  }

  // Raycast click-to-inspect on 3D canvas
  const raycaster = new THREE.Raycaster();
  const pointerDown = { x: 0, y: 0 };
  canvas.addEventListener('pointerdown', (e) => {
    pointerDown.x = e.clientX;
    pointerDown.y = e.clientY;
  });
  canvas.addEventListener('pointerup', (e) => {
    if (Math.hypot(e.clientX - pointerDown.x, e.clientY - pointerDown.y) > 6) return;
    const rect = canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects(vehicleRoot.children, true);
    for (const h of hits) {
      if (h.object && h.object.visible && h.object.userData.partId) {
        selectPart(h.object.userData.partId, false);
        break;
      }
    }
  });

  // =========================================================================
  // 7. CONTROL PANEL SYNC & EVENT WIRING
  // =========================================================================
  function syncSlidersToUI() {
    const slopeSlider = $('pb-slope-slider');
    const slopeVal = $('pb-slope-val');
    if (slopeSlider) slopeSlider.value = String(Math.round(physics.slopeDeg));
    const pct = Math.tan(degToRad(physics.slopeDeg)) * 100;
    if (slopeVal) slopeVal.textContent = `${fmt(physics.slopeDeg, 0)}° (${fmt(pct, 0)} %)`;

    const speedSlider = $('pb-speed-slider');
    const speedVal = $('pb-speed-val');
    if (speedSlider) speedSlider.value = String(physics.targetSpeedKmh.toFixed(1));
    if (speedVal) speedVal.textContent = `${physics.targetSpeedKmh >= 0 ? '+' : ''}${fmt(physics.targetSpeedKmh, 1)} km/h`;

    // Winch controls
    document.querySelectorAll('[data-pb-winch]').forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-pb-winch') === state.winch.mode);
    });
    const winchSlider = $('pb-winch-slider');
    const winchVal = $('pb-winch-val');
    if (winchSlider) {
      winchSlider.disabled = state.winch.mode !== 'manual';
      winchSlider.value = String(state.winch.manualTonnes.toFixed(1));
    }
    if (winchVal) {
      if (state.winch.mode === 'off') winchVal.textContent = 'Aus (0,0 t)';
      else if (state.winch.mode === 'auto') winchVal.textContent = `Auto (${fmt(physics.telemetry.winchForceTonnes, 1)} t)`;
      else winchVal.textContent = `${fmt(state.winch.manualTonnes, 1)} t (${fmt(state.winch.manualTonnes * 10, 0)} kN)`;
    }

    // Blade sliders & presets
    document.querySelectorAll('[data-pb-blade-preset]').forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-pb-blade-preset') === state.bladePreset);
    });
    if ($('pb-blade-lift')) $('pb-blade-lift').value = String(Math.round(state.blade.lift * 100));
    if ($('pb-blade-lift-val')) $('pb-blade-lift-val').textContent = `${Math.round(state.blade.lift * 100)} %`;
    if ($('pb-blade-angle')) $('pb-blade-angle').value = String(Math.round(state.blade.angleDeg));
    if ($('pb-blade-angle-val')) $('pb-blade-angle-val').textContent = `${Math.round(state.blade.angleDeg)}°`;
    if ($('pb-blade-wing')) $('pb-blade-wing').value = String(Math.round(state.blade.wingDeg));
    if ($('pb-blade-wing-val')) $('pb-blade-wing-val').textContent = `${Math.round(state.blade.wingDeg)}°`;
    if ($('pb-blade-pitch')) $('pb-blade-pitch').value = String(Math.round(state.blade.pitchDeg));
    if ($('pb-blade-pitch-val')) $('pb-blade-pitch-val').textContent = `${Math.round(state.blade.pitchDeg)}°`;

    // Tiller controls
    const tillerToggle = $('pb-tiller-toggle');
    if (tillerToggle) {
      tillerToggle.textContent = state.tiller.active ? '● Fräse Aktiv' : '○ Fräse Gehoben';
      tillerToggle.classList.toggle('active', state.tiller.active);
    }
    const wingsToggle = $('pb-wings-toggle');
    if (wingsToggle) {
      wingsToggle.textContent = state.tiller.wingsFolded ? 'Flügel: 4,3 m Geklappt' : 'Flügel: 6,3 m Breit';
      wingsToggle.classList.toggle('active', !state.tiller.wingsFolded);
    }
    if ($('pb-tiller-press')) $('pb-tiller-press').value = String(Math.round(state.tiller.downpressure * 100));
    if ($('pb-tiller-press-val')) $('pb-tiller-press-val').textContent = `${Math.round(state.tiller.downpressure * 100)} %`;

    // Time scale buttons
    document.querySelectorAll('[data-pb-speed]').forEach((b) => {
      const sp = parseFloat(b.getAttribute('data-pb-speed'));
      const isActive = sp === 0 ? state.paused : (!state.paused && Math.abs(state.timeScale - sp) < 0.01);
      b.classList.toggle('active', isActive);
    });

    // Diagnostics tab buttons
    document.querySelectorAll('[data-pb-diag]').forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-pb-diag') === state.diagTab);
    });
  }

  // Bind View Mode Dock buttons
  document.querySelectorAll('[data-pb-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-pb-toggle');
      if (key === 'exterior') {
        state.hydraulicsXray = false;
        state.sinterCutaway = false;
      } else {
        state[key] = !state[key];
      }
      applyViewModes();
    });
  });

  if ($('pb-btn-lighting')) {
    $('pb-btn-lighting').addEventListener('click', () => {
      state.nightMode = !state.nightMode;
      applyViewModes();
    });
  }

  if ($('pb-btn-reset')) {
    $('pb-btn-reset').addEventListener('click', () => {
      flyCameraLocal(DEFAULT_CAM_LOCAL_POS.toArray(), DEFAULT_CAM_LOCAL_TARGET.toArray(), 0.85);
    });
  }

  // Collapsible Sidebar & Mobile Drawer
  const workspaceEl = document.querySelector('.pb-workspace');
  const sidePanelEl = $('pb-side-panel');
  const backdropEl = $('pb-drawer-backdrop');
  const collapseBtn = $('pb-btn-collapse');
  const mobileToggleBtn = $('pb-mobile-panel-toggle');

  function setMobileDrawer(open) {
    if (!sidePanelEl) return;
    sidePanelEl.classList.toggle('drawer-open', open);
    if (backdropEl) backdropEl.classList.toggle('visible', open);
    if (mobileToggleBtn) mobileToggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (collapseBtn && workspaceEl) {
    collapseBtn.addEventListener('click', () => {
      const collapsed = workspaceEl.classList.toggle('panel-collapsed');
      collapseBtn.classList.toggle('active', collapsed);
      collapseBtn.textContent = collapsed ? '◧ Pult' : '◨ Vollbild';
      setTimeout(handleResize, 260);
    });
  }
  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', () => setMobileDrawer(!sidePanelEl.classList.contains('drawer-open')));
  if ($('pb-drawer-close')) $('pb-drawer-close').addEventListener('click', () => setMobileDrawer(false));
  if (backdropEl) backdropEl.addEventListener('click', () => setMobileDrawer(false));

  // Sliders & Controls
  if ($('pb-slope-slider')) {
    $('pb-slope-slider').addEventListener('input', (e) => {
      physics.setSlopeDeg(parseFloat(e.target.value));
      syncSlidersToUI();
    });
  }
  if ($('pb-speed-slider')) {
    $('pb-speed-slider').addEventListener('input', (e) => {
      physics.setTargetSpeedKmh(parseFloat(e.target.value));
      syncSlidersToUI();
    });
  }
  document.querySelectorAll('[data-pb-speed]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = parseFloat(btn.getAttribute('data-pb-speed'));
      if (val === 0) state.paused = !state.paused;
      else {
        state.paused = false;
        state.timeScale = val;
      }
      syncSlidersToUI();
    });
  });

  // Winch buttons & manual tension slider
  document.querySelectorAll('[data-pb-winch]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.winch.mode = btn.getAttribute('data-pb-winch');
      physics.setWinch(state.winch.mode, state.winch.manualTonnes);
      syncSlidersToUI();
    });
  });
  if ($('pb-winch-slider')) {
    $('pb-winch-slider').addEventListener('input', (e) => {
      state.winch.manualTonnes = parseFloat(e.target.value);
      state.winch.mode = 'manual';
      physics.setWinch('manual', state.winch.manualTonnes);
      syncSlidersToUI();
    });
  }

  // Implement Sub-Tabs (12-Wege-Schild vs. AlpinFlexFräse)
  document.querySelectorAll('[data-pb-impl-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-pb-impl-tab');
      document.querySelectorAll('[data-pb-impl-tab]').forEach((t) => t.classList.toggle('active', t === tab));
      if ($('pb-impl-blade')) $('pb-impl-blade').classList.toggle('hidden', target !== 'blade');
      if ($('pb-impl-tiller')) $('pb-impl-tiller').classList.toggle('hidden', target !== 'tiller');
    });
  });

  function applyBladePreset(key) {
    const p = BLADE_PRESETS[key];
    if (!p) return;
    state.bladePreset = key;
    state.blade = { ...p };
    physics.bladeSnowLoad = p.snowLoad;
    syncSlidersToUI();
  }
  document.querySelectorAll('[data-pb-blade-preset]').forEach((btn) => {
    btn.addEventListener('click', () => applyBladePreset(btn.getAttribute('data-pb-blade-preset')));
  });

  const bindBladeSlider = (id, prop, isNorm = false) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener('input', (e) => {
      const v = parseFloat(e.target.value);
      state.blade[prop] = isNorm ? v / 100 : v;
      state.bladePreset = '';
      physics.bladeSnowLoad = state.blade.lift < 0.28 ? (0.45 + Math.max(0, state.blade.wingDeg / 45) * 0.45) : 0.0;
      syncSlidersToUI();
    });
  };
  bindBladeSlider('pb-blade-lift', 'lift', true);
  bindBladeSlider('pb-blade-angle', 'angleDeg', false);
  bindBladeSlider('pb-blade-wing', 'wingDeg', false);
  bindBladeSlider('pb-blade-pitch', 'pitchDeg', false);

  if ($('pb-tiller-toggle')) {
    $('pb-tiller-toggle').addEventListener('click', () => {
      state.tiller.active = !state.tiller.active;
      physics.tillerActive = state.tiller.active;
      syncSlidersToUI();
    });
  }
  if ($('pb-wings-toggle')) {
    $('pb-wings-toggle').addEventListener('click', () => {
      state.tiller.wingsFolded = !state.tiller.wingsFolded;
      physics.tillerWorkingWidthM = state.tiller.wingsFolded
        ? PB_SPECS.identity.finisherFoldedWidthM
        : PB_SPECS.identity.finisherTotalWidthM;
      syncSlidersToUI();
    });
  }
  if ($('pb-tiller-press')) {
    $('pb-tiller-press').addEventListener('input', (e) => {
      state.tiller.downpressure = parseFloat(e.target.value) / 100;
      physics.tillerDownpressure = state.tiller.downpressure;
      syncSlidersToUI();
    });
  }

  // Diagnostics Tabs
  document.querySelectorAll('[data-pb-diag]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.diagTab = btn.getAttribute('data-pb-diag');
      diagnostics.setMode(state.diagTab);
      diagnostics.update(physics.telemetry);
      syncSlidersToUI();
    });
  });

  // Audio Toggle Buttons
  function syncAudioButtons() {
    const on = audio.enabled;
    if ($('btn-mute')) $('btn-mute').textContent = on ? '🔊' : '🔇';
    if ($('pb-btn-audio')) {
      $('pb-btn-audio').textContent = on ? '🔊 Sound Ein' : '🔇 Sound Aus';
      $('pb-btn-audio').classList.toggle('active', on);
    }
  }
  const toggleAudio = () => {
    audio.toggle();
    syncAudioButtons();
  };
  if ($('btn-mute')) $('btn-mute').addEventListener('click', toggleAudio);
  if ($('pb-btn-audio')) $('pb-btn-audio').addEventListener('click', toggleAudio);

  // Version Pill -> Shared Release Changelog Modal
  if ($('pb-version-btn')) {
    $('pb-version-btn').addEventListener('click', () => {
      if (window.ArcadeUpdateBanner && typeof window.ArcadeUpdateBanner.openModal === 'function') {
        window.ArcadeUpdateBanner.openModal('pistenbully_800w');
      }
    });
  }

  // Keyboard shortcuts (Space = Pause, Escape = close tour/drawer)
  window.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.code === 'Space') {
      e.preventDefault();
      state.paused = !state.paused;
      syncSlidersToUI();
    } else if (e.code === 'Escape') {
      if (state.tourActive) closeTour();
      setMobileDrawer(false);
    }
  });

  // =========================================================================
  // 8. 8-STATION GUIDED ENGINEERING TOUR
  // =========================================================================
  const tourCardEl = $('pb-tour-card');
  const tourLauncherBtn = $('pb-btn-tour');

  function renderTourCard() {
    if (!tourCardEl) return;
    const step = PISTENBULLY_TOUR_STEPS[state.tourIndex];
    const total = PISTENBULLY_TOUR_STEPS.length;
    tourCardEl.innerHTML = `
      <div class="pb-tour-top">
        <span class="pb-tour-step">Station ${step.num} / ${total} · ${step.badge}</span>
        <button type="button" class="pb-tour-close" id="pb-tour-x" aria-label="Tour beenden">✕</button>
      </div>
      <h3 class="pb-tour-title">${step.title}</h3>
      <p class="pb-tour-body">${step.body}</p>
      <div class="pb-tour-nav">
        <button type="button" class="pb-tour-nav-btn" id="pb-tour-prev" ${state.tourIndex === 0 ? 'disabled' : ''}>← Zurück</button>
        <div class="pb-tour-dots">${PISTENBULLY_TOUR_STEPS.map((_, i) =>
          `<button type="button" class="pb-tour-dot ${i === state.tourIndex ? 'active' : ''}" data-dot="${i}" aria-label="Station ${i + 1}"></button>`
        ).join('')}</div>
        <button type="button" class="pb-tour-nav-btn primary" id="pb-tour-next">${state.tourIndex === total - 1 ? 'Fertig ✓' : 'Weiter →'}</button>
      </div>
    `;
    tourCardEl.classList.remove('hidden');

    $('pb-tour-x').addEventListener('click', closeTour);
    $('pb-tour-prev').addEventListener('click', () => goTourStep(state.tourIndex - 1));
    $('pb-tour-next').addEventListener('click', () => {
      if (state.tourIndex >= total - 1) closeTour();
      else goTourStep(state.tourIndex + 1);
    });
    tourCardEl.querySelectorAll('[data-dot]').forEach((d) => {
      d.addEventListener('click', () => goTourStep(parseInt(d.getAttribute('data-dot'), 10)));
    });
  }

  function goTourStep(idx) {
    if (idx < 0 || idx >= PISTENBULLY_TOUR_STEPS.length) return;
    state.tourActive = true;
    state.tourIndex = idx;
    const step = PISTENBULLY_TOUR_STEPS[idx];
    const s = step.setup || {};

    if (typeof s.slopeDeg === 'number') physics.setSlopeDeg(s.slopeDeg);
    if (typeof s.speedKmh === 'number') physics.setTargetSpeedKmh(s.speedKmh);
    if (s.winchMode) {
      state.winch.mode = s.winchMode;
      physics.setWinch(s.winchMode, state.winch.manualTonnes);
    }
    if (s.bladePreset) applyBladePreset(s.bladePreset);
    if (typeof s.tillerActive === 'boolean') {
      state.tiller.active = s.tillerActive;
      physics.tillerActive = s.tillerActive;
    }
    if (typeof s.tillerDownpressure === 'number') {
      state.tiller.downpressure = s.tillerDownpressure;
      physics.tillerDownpressure = s.tillerDownpressure;
    }
    if (typeof s.tillerWingsFolded === 'boolean') {
      state.tiller.wingsFolded = s.tillerWingsFolded;
      physics.tillerWorkingWidthM = s.tillerWingsFolded
        ? PB_SPECS.identity.finisherFoldedWidthM
        : PB_SPECS.identity.finisherTotalWidthM;
    }
    if (typeof s.hydraulicsXray === 'boolean') state.hydraulicsXray = s.hydraulicsXray;
    if (typeof s.sinterCutaway === 'boolean') state.sinterCutaway = s.sinterCutaway;
    if (typeof s.showForces === 'boolean') state.showForces = s.showForces;
    if (typeof s.snowsatHeatmap === 'boolean') state.snowsatHeatmap = s.snowsatHeatmap;
    if (typeof s.timeScale === 'number') {
      state.paused = false;
      state.timeScale = s.timeScale;
    }
    if (s.diagTab) {
      state.diagTab = s.diagTab;
      diagnostics.setMode(s.diagTab);
    }

    selectPart(step.partId, false);
    applyViewModes();
    syncSlidersToUI();
    renderTourCard();
    flyCameraLocal(step.cameraPos, step.cameraTarget, 1.0);
  }

  function closeTour() {
    state.tourActive = false;
    if (tourCardEl) tourCardEl.classList.add('hidden');
  }

  if (tourLauncherBtn) {
    tourLauncherBtn.addEventListener('click', () => {
      if (state.tourActive) closeTour();
      else goTourStep(0);
    });
  }

  // =========================================================================
  // 9. RESIZE & THEME OBSERVER
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
  handleResize();
  window.addEventListener('resize', handleResize);
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => handleResize()).observe(viewport);
  }

  // Re-render SVG diagnostics when global ArcadeTheme switches Light <-> Dark
  const themeObserver = new MutationObserver(() => {
    diagnostics.update(physics.telemetry);
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Initial sync
  selectPart('tracks_undercarriage', false);
  applyViewModes();
  syncSlidersToUI();
  syncAudioButtons();

  // Telemetry DOM references
  const telSlope = $('pb-tel-slope');
  const telSlopeSub = $('pb-tel-slope-sub');
  const telSpeed = $('pb-tel-speed');
  const telSpeedSub = $('pb-tel-speed-sub');
  const telEngine = $('pb-tel-engine');
  const telEngineSub = $('pb-tel-engine-sub');
  const telHydro = $('pb-tel-hydro');
  const telHydroSub = $('pb-tel-hydro-sub');
  const telWinch = $('pb-tel-winch');
  const telWinchSub = $('pb-tel-winch-sub');
  const telSlip = $('pb-tel-slip');
  const telSlipSub = $('pb-tel-slip-sub');
  const telTiller = $('pb-tel-tiller');
  const telTillerSub = $('pb-tel-tiller-sub');
  const telGround = $('pb-tel-ground');
  const telGroundSub = $('pb-tel-ground-sub');

  let lastNow = performance.now();
  let lastUiUpdate = 0;
  let elapsed = 0;

  // =========================================================================
  // 10. MAIN 60 FPS REAL-TIME SIMULATION & RENDER LOOP
  // =========================================================================
  function animate(now) {
    requestAnimationFrame(animate);
    const rawDt = Math.min(0.05, Math.max(0.001, (now - lastNow) / 1000));
    lastNow = now;

    const simDt = state.paused ? 0 : rawDt * state.timeScale;
    elapsed += simDt;

    // Step physics engine
    const telemetry = physics.step(simDt);

    // Smoothly pitch entire steep-slope world around Z!
    const targetSlopeRad = telemetry.slopeRad;
    state.currentSlopeRad += (targetSlopeRad - state.currentSlopeRad) * Math.min(1, rawDt * 5.0);
    env.slopeGroup.rotation.z = state.currentSlopeRad;

    // Smooth SNOWsat heatmap fade
    const targetHeat = state.snowsatHeatmap ? 1 : 0;
    state.snowsatBlend += (targetHeat - state.snowsatBlend) * Math.min(1, rawDt * 4.5);

    // Solve exact kinematics for 12-Way Blade, AlpinFlexFräse/Finisher & 4.7-t Winch
    const bladeKin = solveBladeKinematics(state.blade);
    const tillerKin = solveTillerKinematics(state.tiller);
    const winchKin = solveWinchKinematics(state.winch, telemetry.winchForceKN);

    // Update all 3D assemblies!
    tracksSys.update(telemetry, elapsed);
    chassisSys.update(telemetry, state.hydraulicsXray, elapsed);
    cabSys.update(telemetry, state.nightMode);
    bladeSys.update(bladeKin);
    tillerSys.update(tillerKin, telemetry, state.sinterCutaway, elapsed);
    winchSys.update(winchKin, telemetry);
    forceSys.update(state.showForces, telemetry, winchKin, bladeKin);
    env.update(telemetry, bladeKin, tillerKin, state.snowsatBlend, state.nightMode, elapsed);

    // Update snow wave, tiller dust veil, track-slip spray & exhaust vapor
    particleSys.update(simDt > 0 ? simDt : rawDt * 0.08, telemetry, bladeKin, tillerKin, state.nightMode);

    // Update optional Web Audio synthesizer
    audio.update(telemetry, rawDt, state.paused);

    // Smooth camera fly-to animation
    if (camAnim.active) {
      camAnim.t = Math.min(1, camAnim.t + rawDt / camAnim.dur);
      const ease = 1 - Math.pow(1 - camAnim.t, 3);
      camera.position.lerpVectors(camAnim.fromPos, camAnim.toPos, ease);
      controls.target.lerpVectors(camAnim.fromTarget, camAnim.toTarget, ease);
      if (camAnim.t >= 1) camAnim.active = false;
    }
    controls.update();

    // Update floating 3D hotspot pins & force vector badges
    updateFloatingLabels(telemetry);

    // Update DOM telemetry & SVG diagnostic charts at ~12 Hz
    if (now - lastUiUpdate > 85) {
      lastUiUpdate = now;
      diagnostics.update(telemetry);

      if (telSlope) telSlope.textContent = `${fmt(telemetry.slopeDeg, 0)}° / ${fmt(telemetry.slopePercent, 0)} %`;
      if (telSlopeSub) telSlopeSub.textContent = `FH ${fmt(telemetry.downhillKN, 1)} kN Hangabtrieb`;
      if (telSpeed) telSpeed.textContent = `${fmt(telemetry.groundSpeedKmh, 1)} km/h`;
      if (telSpeedSub) telSpeedSub.textContent = `Fläche ${fmt(telemetry.areaCoverageHaH, 2)} ha/h`;
      if (telEngine) telEngine.textContent = `${fmt(telemetry.engineRpm, 0)} U/min`;
      if (telEngineSub) telEngineSub.textContent = `${fmt(telemetry.totalPowerKW, 0)} kW · ${fmt(telemetry.engineLoadPct, 0)} % Last`;
      if (telHydro) telHydro.textContent = `${fmt(telemetry.pressuresBar.drive, 0)} / ${fmt(telemetry.pressuresBar.tiller, 0)} bar`;
      if (telHydroSub) telHydroSub.textContent = 'Fahrantrieb / Fräse';
      if (telWinch) telWinch.textContent = `${fmt(telemetry.winchForceKN, 1)} kN`;
      if (telWinchSub) telWinchSub.textContent = `${fmt(telemetry.winchForceTonnes, 2)} t (max. 4,7 t)`;
      if (telSlip) {
        telSlip.textContent = `${fmt(telemetry.slipPct, 1)} %`;
        telSlip.classList.toggle('danger', telemetry.tractionExceeded);
      }
      if (telSlipSub) telSlipSub.textContent = telemetry.tractionExceeded ? '⚠ Haftung überschritten!' : 'Sauberer Griff im Schnee';
      if (telTiller) telTiller.textContent = telemetry.tillerRpm > 0 ? `${fmt(telemetry.tillerRpm, 0)} U/min` : 'Aus';
      if (telTillerSub) telTillerSub.textContent = `Sintern ${fmt(telemetry.sinterQualityPct, 0)} % · ${fmt(tillerKin.workingWidthM, 1)} m`;
      if (telGround) telGround.textContent = `${fmt(telemetry.groundPressureGCm2, 0)} g/cm²`;
      if (telGroundSub) telGroundSub.textContent = 'Skischuh ~250 g/cm²';

      if (state.winch.mode === 'auto' && $('pb-winch-val')) {
        $('pb-winch-val').textContent = `Auto (${fmt(telemetry.winchForceTonnes, 1)} t)`;
      }
    }

    composer.render();
  }

  requestAnimationFrame(animate);

  // Expose lightweight debug hook for automated Playwright verification
  window.__PISTENBULLY__ = {
    state,
    physics,
    goTourStep,
    closeTour,
    applyViewModes,
    applyBladePreset,
    syncSlidersToUI,
    flyCameraLocal
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPistenBullyApp);
} else {
  initPistenBullyApp();
}
