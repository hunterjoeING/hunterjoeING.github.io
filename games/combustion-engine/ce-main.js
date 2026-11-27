import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  DEFAULT_ENGINE_CONFIG,
  DEFAULT_PROFILE,
  DRIVETRAIN_EXAMPLE,
  DRIVE_TOUR_EXAMPLE,
  ENGINE_SPECS,
  ENGINE_PARTS,
  ENGINE_TOUR_STEPS,
  TORQUE_NM_PER_BAR,
  buildEngineProfile,
  clampOperatingRpm,
  computeEngineTelemetry,
  computeBsfcContours,
  computeDriveTourDemos,
  fullTorqueNm,
  getEnginePartsForProfile,
  getTourStepsForProfile,
  roadLoadTorqueNm,
  speedKmh
} from './ce-data.js?v=0.5.2';
import { createEngineRenderer } from './ce-ao.js?v=0.5.2';
import { createCombustionEngineModel } from './ce-model.js?v=0.5.2';

const DEFAULT_CAMERA = {
  normal: { pos: [-8.2, 4.5, 9.6], target: [0.85, 0.55, 0.30] },
  cutaway: { pos: [-7.1, 3.8, 8.6], target: [0.80, 0.65, 0.30] },
  xray: { pos: [-7.6, 3.8, 8.8], target: [0.80, 0.65, 0.30] },
  exploded: { pos: [7.8, 2.8, 9.6], target: [0.0, 0.7, 0.0] }
};

function cameraForLayout(mode, profile, aspect) {
  const base = DEFAULT_CAMERA[mode] || DEFAULT_CAMERA.cutaway;
  const portrait = Math.max(1, 0.98 / (aspect || 1));
  if (profile.layout.id === 'boxer4') {
    const scale = portrait * (mode === 'exploded' ? 1.15 : 1.0);
    return {
      pos: [-8.2 * scale, 7.4 * scale, 9.2 * scale],
      target: [0.85, 0.1, 0.12]
    };
  }
  const s = (profile.layout.cameraScale || 1) * portrait;
  return {
    pos: base.pos.map(v => Number((v * s).toFixed(2))),
    target: [...base.target]
  };
}

function niceStep(maxValue, targetTicks) {
  const raw = maxValue / targetTicks;
  const steps = [25, 30, 40, 50, 75, 100, 150, 200];
  return steps.find(s => s >= raw) || 200;
}

function init() {
  const viewport = document.getElementById('ce-viewport');
  const canvas = document.getElementById('ce-canvas');
  const labelLayer = document.getElementById('ce-label-layer');
  if (!viewport || !canvas) return;

  // =========================================================================
  // THREE.JS RENDERER & STUDIO SCENE
  // =========================================================================
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(42, 16 / 9, 0.1, 120);
  camera.position.set(...DEFAULT_CAMERA.cutaway.pos);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.minDistance = 3.0;
  controls.maxDistance = 34;
  controls.maxPolarAngle = Math.PI * 0.72;
  controls.target.set(...DEFAULT_CAMERA.cutaway.target);

  // Studio-Beleuchtung
  const hemiLight = new THREE.HemisphereLight(0xf1f5f9, 0x334155, 1.0);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
  keyLight.position.set(10, 14, 12);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 42;
  const d = 11;
  keyLight.shadow.camera.left = -d;
  keyLight.shadow.camera.right = d;
  keyLight.shadow.camera.top = d;
  keyLight.shadow.camera.bottom = -d;
  keyLight.shadow.bias = -0.0005;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xf97316, 0.85);
  rimLight.position.set(-12, 6, -10);
  scene.add(rimLight);

  let activeProfile = DEFAULT_PROFILE;
  let activeParts = getEnginePartsForProfile(activeProfile);
  let activeTourSteps = getTourStepsForProfile(activeProfile);

  const engine = createCombustionEngineModel(activeProfile);
  scene.add(engine.root);
  const engineRenderer = createEngineRenderer(renderer, scene, camera);

  // =========================================================================
  // THEME SYNC (DARK / LIGHT)
  // =========================================================================
  let lastTheme = '';
  function syncSceneTheme() {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    if (theme === lastTheme) return;
    lastTheme = theme;
    const isDark = theme === 'dark';
    scene.background = new THREE.Color(isDark ? 0x0b1220 : 0xeef3fa);
    scene.fog = new THREE.Fog(isDark ? 0x0b1220 : 0xeef3fa, 24, 62);
    hemiLight.intensity = isDark ? 0.85 : 1.15;
    keyLight.intensity = isDark ? 2.0 : 2.2;
    rimLight.intensity = isDark ? 1.0 : 0.6;
    engine.applyTheme(theme);
  }
  syncSceneTheme();
  window.addEventListener('arcade:theme-changed', syncSceneTheme);
  const themeObs = new MutationObserver(syncSceneTheme);
  themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // =========================================================================
  // KAMERA-FLUG-INTERPOLATION
  // =========================================================================
  let camAnim = null;
  function flyCamera(posArr, targetArr, duration = 0.85) {
    camAnim = {
      startPos: camera.position.clone(),
      endPos: new THREE.Vector3(...posArr),
      startTarget: controls.target.clone(),
      endTarget: new THREE.Vector3(...targetArr),
      elapsed: 0,
      duration
    };
  }
  controls.addEventListener('start', () => {
    camAnim = null;
  });

  // =========================================================================
  // APP-STATE
  // =========================================================================
  const appState = {
    layout: DEFAULT_ENGINE_CONFIG.layout,
    concept: DEFAULT_ENGINE_CONFIG.concept,
    viewMode: 'cutaway',
    rpm: DRIVE_TOUR_EXAMPLE.cruiseRpm,
    load: DRIVE_TOUR_EXAMPLE.cruiseLoad,
    timeScale: 0.16,
    labelsVisible: false,
    flowVisible: true,
    selectedPart: null,
    tourActive: false,
    tourIndex: 0,
    explosionPhase: 'idle'
  };

  let telemetry = computeEngineTelemetry(appState.rpm, appState.load, undefined, activeProfile);

  // =========================================================================
  // 3D-LABELS (PROJEKTION)
  // =========================================================================
  const labelEls = new Map();
  function buildLabelPins() {
    labelEls.clear();
    if (!labelLayer) return;
    labelLayer.innerHTML = '';
    activeParts.forEach(part => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ce-label-pin';
      btn.dataset.partId = part.id;
      btn.innerHTML = `<span class="ce-pin-num">${part.number}</span><span class="ce-pin-text">${part.shortLabel}</span>`;
      btn.addEventListener('click', e => {
        e.stopPropagation();
        selectPart(part.id, true);
      });
      labelLayer.appendChild(btn);
      labelEls.set(part.id, btn);
    });
  }
  buildLabelPins();

  const projVec = new THREE.Vector3();
  function updateLabels() {
    const show = appState.labelsVisible && appState.explosionPhase === 'idle';
    labelLayer?.classList.toggle('is-visible', show);
    if (!show || !engine.getPartWorldAnchor) return;

    const w = viewport.clientWidth;
    const h = viewport.clientHeight;
    for (const part of activeParts) {
      const el = labelEls.get(part.id);
      if (!el) continue;
      const anchor = engine.getPartWorldAnchor(part.id);
      projVec.copy(anchor).project(camera);
      const visible = projVec.z > -1 && projVec.z < 1;
      if (!visible) {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        continue;
      }
      const x = (projVec.x * 0.5 + 0.5) * w;
      const y = (-projVec.y * 0.5 + 0.5) * h;
      const inBounds = x > 24 && x < w - 24 && y > 24 && y < h - 24;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      el.style.opacity = inBounds ? '1' : '0';
      el.style.pointerEvents = inBounds ? 'auto' : 'none';
      el.classList.toggle('active', appState.selectedPart === part.id);
    }
  }

  // =========================================================================
  // RAYCASTING (BAUTEILE DIREKT IM 3D ANKLICKEN)
  // =========================================================================
  const raycaster = new THREE.Raycaster();
  const pointerDownPos = new THREE.Vector2();
  const pointerNdc = new THREE.Vector2();

  canvas.addEventListener('pointerdown', e => {
    pointerDownPos.set(e.clientX, e.clientY);
  });

  canvas.addEventListener('pointerup', e => {
    if (appState.explosionPhase !== 'idle') return;
    if (Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y) > 6) return;
    const rect = canvas.getBoundingClientRect();
    pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointerNdc, camera);
    const hits = raycaster.intersectObjects(engine.root.children, true);
    const hit = hits.find(h => h.object.visible && h.object.userData && h.object.userData.partId);
    if (hit) {
      selectPart(hit.object.userData.partId, false);
    }
  });

  // =========================================================================
  // 05 INTERAKTIVES DYNO-DIAGRAMM (DREHMOMENT Nm & LEISTUNG kW)
  // =========================================================================
  const chartSvg = document.getElementById('ce-dyno-chart');
  const chartW = 320;
  const chartH = 158;
  const pad = { left: 34, right: 32, top: 14, bottom: 26 };
  const plotW = chartW - pad.left - pad.right;
  const plotH = chartH - pad.top - pad.bottom;

  let powerTicks = [];
  let torqueTicks = [];
  let torqueAxisMax = 250;

  function computeChartScales() {
    const isDefault = activeProfile.isDefaultR4Otto;
    const pStep = isDefault ? 30 : niceStep(activeProfile.specs.maxPowerKW, 4);
    const tStep = isDefault ? 50 : niceStep(activeProfile.specs.maxTorqueNm, 4);
    powerTicks = Array.from({ length: Math.floor(activeProfile.specs.maxPowerKW / pStep) + 2 }, (_, i) => i * pStep);
    torqueTicks = Array.from({ length: Math.floor(activeProfile.specs.maxTorqueNm / tStep) + 2 }, (_, i) => i * tStep);
    torqueAxisMax = torqueTicks.at(-1);
  }
  computeChartScales();

  function xForRpm(rpm) {
    const { idleRpm, maxRpm } = activeProfile.specs;
    return pad.left + (rpm - idleRpm) / (maxRpm - idleRpm) * plotW;
  }
  function rpmAtPlotX(x) {
    const { idleRpm, maxRpm } = activeProfile.specs;
    const fraction = THREE.MathUtils.clamp((x - pad.left) / plotW, 0, 1);
    return Math.round((idleRpm + fraction * (maxRpm - idleRpm)) / 50) * 50;
  }
  function rpmTickLabels(y) {
    const { idleRpm, maxRpm } = activeProfile.specs;
    const ticks = [idleRpm];
    for (let rpm = 2000; rpm <= maxRpm; rpm += 1000) ticks.push(rpm);
    return ticks.map(rpm => {
      const label = rpm === idleRpm ? rpm : rpm / 1000 + 'k';
      return `<text x="${xForRpm(rpm).toFixed(1)}" y="${y}" text-anchor="middle" class="chart-axis-text">${label}</text>`;
    }).join('');
  }
  function yForPower(kw) {
    return pad.top + plotH - (kw / powerTicks.at(-1)) * plotH;
  }
  function yForTorque(nm) {
    return pad.top + plotH - (nm / torqueAxisMax) * plotH;
  }

  let dynoPointerBound = false;
  function buildDynoChart() {
    if (!chartSvg) return;
    computeChartScales();
    const { idleRpm, maxRpm, redlineRpm } = activeProfile.specs;
    const samples = [];
    for (let rpm = idleRpm; rpm <= maxRpm; rpm += 50) {
      const t = computeEngineTelemetry(rpm, 1, undefined, activeProfile);
      samples.push({ rpm, kw: t.powerKW, nm: t.torqueNm });
    }
    const powerPath = samples
      .map((s, i) => `${i === 0 ? 'M' : 'L'}${xForRpm(s.rpm).toFixed(1)},${yForPower(s.kw).toFixed(1)}`)
      .join(' ');
    const torquePath = samples
      .map((s, i) => `${i === 0 ? 'M' : 'L'}${xForRpm(s.rpm).toFixed(1)},${yForTorque(s.nm).toFixed(1)}`)
      .join(' ');
    const areaPath =
      `${powerPath} L${xForRpm(maxRpm).toFixed(1)},${yForPower(0).toFixed(1)} ` +
      `L${xForRpm(idleRpm).toFixed(1)},${yForPower(0).toFixed(1)} Z`;

    const xRedline = xForRpm(redlineRpm);

    chartSvg.innerHTML = `
      <defs>
        <linearGradient id="cePowerFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2563eb" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#2563eb" stop-opacity="0.02" />
        </linearGradient>
      </defs>
      <!-- Roter Drehzahlbereich -->
      <rect x="${xRedline.toFixed(1)}" y="${pad.top}" width="${(xForRpm(maxRpm) - xRedline).toFixed(1)}" height="${plotH}" class="chart-zone-redline" />
      <!-- Hilfslinien -->
      ${powerTicks
        .map(kw => {
          const y = yForPower(kw).toFixed(1);
          return `<line x1="${pad.left}" y1="${y}" x2="${chartW - pad.right}" y2="${y}" class="chart-grid" />
            <text x="${pad.left - 5}" y="${Number(y) + 3.5}" text-anchor="end" class="chart-axis-text power">${kw}</text>`;
        })
        .join('')}
      ${torqueTicks
        .map(nm => {
          const y = yForTorque(nm).toFixed(1);
          return `<text x="${chartW - pad.right + 5}" y="${Number(y) + 3.5}" text-anchor="start" class="chart-axis-text torque">${nm}</text>`;
        })
        .join('')}
      <line x1="${xRedline.toFixed(1)}" y1="${pad.top}" x2="${xRedline.toFixed(1)}" y2="${pad.top + plotH}" class="chart-marker-line danger" />
      <!-- Kurven -->
      <path d="${areaPath}" fill="url(#cePowerFill)" />
      <path d="${torquePath}" fill="none" class="chart-torque-line" />
      <path d="${powerPath}" fill="none" class="chart-power-line" />
      <!-- X-Achse (Tsd. U/min) -->
      ${rpmTickLabels(chartH - 7)}
      <text x="${pad.left + 2}" y="${pad.top + 9}" class="chart-unit-text power">kW</text>
      <text x="${chartW - pad.right - 2}" y="${pad.top + 9}" text-anchor="end" class="chart-unit-text torque">Nm</text>
      <!-- Live-Marker auf beiden Kurven -->
      <line id="ce-chart-vline" x1="0" y1="${pad.top}" x2="0" y2="${pad.top + plotH}" class="chart-live-guide" />
      <circle id="ce-dot-torque" cx="0" cy="0" r="4.2" class="chart-dot-torque" />
      <circle id="ce-dot-power" cx="0" cy="0" r="4.5" class="chart-dot-power" />
    `;

    if (!dynoPointerBound) {
      dynoPointerBound = true;
      let dragging = false;
      function scrub(e) {
        const rect = chartSvg.getBoundingClientRect();
        const relX = ((e.clientX - rect.left) / rect.width) * chartW;
        setRpm(rpmAtPlotX(relX));
      }
      chartSvg.addEventListener('pointerdown', e => {
        dragging = true;
        chartSvg.setPointerCapture(e.pointerId);
        scrub(e);
      });
      chartSvg.addEventListener('pointermove', e => {
        if (dragging) scrub(e);
      });
      const stopDrag = () => { dragging = false; };
      chartSvg.addEventListener('pointerup', stopDrag);
      chartSvg.addEventListener('pointercancel', stopDrag);
      chartSvg.addEventListener('lostpointercapture', stopDrag);
    }
  }

  function updateDynoMarkers() {
    const fullLoad = computeEngineTelemetry(telemetry.rpm, 1, undefined, activeProfile);
    const cx = xForRpm(fullLoad.rpm).toFixed(1);
    const yp = yForPower(fullLoad.powerKW).toFixed(1);
    const yt = yForTorque(fullLoad.torqueNm).toFixed(1);
    const vline = document.getElementById('ce-chart-vline');
    const dotP = document.getElementById('ce-dot-power');
    const dotT = document.getElementById('ce-dot-torque');
    if (vline) {
      vline.setAttribute('x1', cx);
      vline.setAttribute('x2', cx);
    }
    if (dotP) {
      dotP.setAttribute('cx', cx);
      dotP.setAttribute('cy', yp);
    }
    if (dotT) {
      dotT.setAttribute('cx', cx);
      dotT.setAttribute('cy', yt);
    }
  }

  // 05b · Muschelkurve
  const mapSvg = document.getElementById('ce-bsfc-map');
  const mapTop = 22;
  const mapBottom = 172;
  const mapPlotH = mapBottom - mapTop;
  let mapMarker;
  let mapRoadLoads = [];
  let mapOptimum;
  let mapPointerBound = false;

  function yForMapTorque(torqueNm) {
    return mapBottom - torqueNm / torqueAxisMax * mapPlotH;
  }

  function mapPath(points) {
    return points.map(({ rpm, torqueNm }, i) => {
      return `${i === 0 ? 'M' : 'L'}${xForRpm(rpm).toFixed(2)},${yForMapTorque(torqueNm).toFixed(2)}`;
    }).join(' ');
  }

  function mapRoadLoadCurve(gear, rpmStep) {
    const { minCruiseKmh, maxSpeedKmh } = DRIVETRAIN_EXAMPLE;
    const speedPerRpm = speedKmh(1, gear, activeProfile);
    const start = Math.max(activeProfile.specs.idleRpm, minCruiseKmh / speedPerRpm);
    const end = Math.min(activeProfile.specs.redlineRpm, maxSpeedKmh / speedPerRpm);
    const torqueAt = rpm => roadLoadTorqueNm(rpm, gear, activeProfile);
    const canCruise = rpm => torqueAt(rpm) <= fullTorqueNm(rpm, activeProfile);

    function boundary(feasibleRpm, outsideRpm) {
      while (Math.abs(outsideRpm - feasibleRpm) > 0.01) {
        const middle = (feasibleRpm + outsideRpm) / 2;
        if (canCruise(middle)) feasibleRpm = middle;
        else outsideRpm = middle;
      }
      return feasibleRpm;
    }

    let firstRpm = start;
    while (firstRpm < end && !canCruise(firstRpm)) firstRpm = Math.min(firstRpm + rpmStep, end);
    if (firstRpm >= end) return '';
    if (firstRpm > start) firstRpm = boundary(firstRpm, firstRpm - rpmStep);
    const points = [{ rpm: firstRpm, torqueNm: torqueAt(firstRpm) }];
    let lastRpm = firstRpm;
    while (lastRpm < end) {
      const nextRpm = Math.min(lastRpm + rpmStep, end);
      if (!canCruise(nextRpm)) {
        const finalRpm = boundary(lastRpm, nextRpm);
        points.push({ rpm: finalRpm, torqueNm: torqueAt(finalRpm) });
        break;
      }
      lastRpm = nextRpm;
      points.push({ rpm: lastRpm, torqueNm: torqueAt(lastRpm) });
    }
    const { rpm, torqueNm } = points.at(-1);
    return `<g data-road-gear="${gear}">
      <path d="${mapPath(points)}" class="chart-road-load" clip-path="url(#ce-map-limits)" />
      <text x="${xForRpm(rpm) + 4}" y="${yForMapTorque(torqueNm) - 3}" class="chart-map-label chart-road-label">${gear}.</text>
    </g>`;
  }

  function buildBsfcMap() {
    if (!mapSvg) return;
    const { maxRpm, idleRpm, redlineRpm } = activeProfile.specs;
    const { contours, optimum } = computeBsfcContours(undefined, activeProfile);
    mapOptimum = optimum;
    const fullLoad = [];
    const rpmStep = 50;
    for (let rpm = idleRpm; rpm <= maxRpm; rpm += rpmStep) {
      fullLoad.push({ rpm, torqueNm: fullTorqueNm(rpm, activeProfile) });
    }

    const fullLoadPath = mapPath(fullLoad);
    const right = xForRpm(maxRpm);
    const left = xForRpm(idleRpm);
    const redline = xForRpm(redlineRpm);
    const areaPath = `${fullLoadPath} L${right},${mapBottom} L${left},${mapBottom} Z`;
    const labels = [];
    const labelRpms = activeProfile.contourLabelRpms;
    const contourPaths = contours.map(({ level, polylines }, i) => {
      const labelRpm = labelRpms[i] ?? (maxRpm * 0.55);
      const point = polylines.flat().reduce((closest, point) => {
        return !closest || Math.abs(point.rpm - labelRpm) < Math.abs(closest.rpm - labelRpm) ? point : closest;
      }, null);
      if (point) {
        labels.push(`<text x="${xForRpm(point.rpm)}" y="${yForMapTorque(point.torqueNm) - 3}" class="chart-map-label" text-anchor="middle">${level}</text>`);
      }
      return polylines.map(line => `<path d="${mapPath(line)}" class="chart-contour-line" />`).join('');
    }).join('');
    const optimumX = xForRpm(optimum.rpm);
    const optimumY = yForMapTorque(optimum.torqueNm);
    const nmPerBar = activeProfile.torqueNmPerBar;
    const maxBar = torqueAxisMax / nmPerBar;
    const barStep = maxBar > 22 ? 10 : 5;
    const barTicks = Array.from({ length: Math.floor(maxBar / barStep) + 1 }, (_, i) => i * barStep);
    const optLabelX = Math.max(left + 32, Math.min(right - 36, optimumX - (activeProfile.isDefaultR4Otto ? 43 : 10)));

    mapSvg.innerHTML = `
      <defs><clipPath id="ce-map-limits"><path d="${areaPath}" /></clipPath></defs>
      <rect x="${redline}" y="${mapTop}" width="${right - redline}" height="${mapPlotH}" class="chart-zone-redline" />
      <path d="${areaPath}" class="chart-map-area" />
      ${torqueTicks.map(nm => {
        const y = yForMapTorque(nm);
        return `<line x1="${left}" y1="${y}" x2="${right}" y2="${y}" class="chart-grid" />
          <text x="${left - 5}" y="${y + 3.5}" text-anchor="end" class="chart-axis-text">${nm}</text>`;
      }).join('')}
      ${barTicks.map(bar => {
        const y = yForMapTorque(bar * nmPerBar);
        return `<line x1="${right}" x2="${right + 4}" y1="${y}" y2="${y}" class="chart-grid" />
          <text x="${right + 6}" y="${y + 3.5}" class="chart-axis-text">${bar}</text>`;
      }).join('')}
      <path d="M${left},${mapTop} V${mapBottom} H${right} V${mapTop}" class="chart-grid" fill="none" />
      <line x1="${redline}" x2="${redline}" y1="${mapTop}" y2="${mapBottom}" class="chart-marker-line danger" />
      ${rpmTickLabels(186)}
      <text x="${chartW / 2}" y="198" text-anchor="middle" class="chart-axis-text">Drehzahl (U/min)</text>
      <text x="${left - 5}" y="13" text-anchor="end" class="chart-axis-text">Nm</text>
      <text x="${right + 6}" y="13" class="chart-axis-text">bar</text>
      <g clip-path="url(#ce-map-limits)">${contourPaths}</g>
      <path d="${fullLoadPath}" class="chart-map-limit" />
      ${[4, 5, 6].map(gear => mapRoadLoadCurve(gear, rpmStep)).join('')}
      ${labels.join('')}
      <path d="M${optimumX},${optimumY - 4} l4,7 h-8 Z" class="chart-map-optimum" />
      <text x="${optLabelX}" y="${optimumY - 17}" text-anchor="middle" class="chart-map-label">Optimum ${Math.round(optimum.bsfc)}</text>
      <g id="ce-map-marker">
        <circle r="8" class="chart-map-halo" />
        <circle r="4.4" class="chart-map-dot" />
      </g>
    `;
    mapMarker = mapSvg.querySelector('#ce-map-marker');
    mapRoadLoads = mapSvg.querySelectorAll('[data-road-gear]');

    if (!mapPointerBound) {
      mapPointerBound = true;
      function scrubMap(e) {
        const matrix = mapSvg.getScreenCTM();
        if (!matrix) return;
        const point = new DOMPoint(e.clientX, e.clientY).matrixTransform(matrix.inverse());
        const rpm = rpmAtPlotX(point.x);
        const torqueNm = (mapBottom - point.y) / mapPlotH * torqueAxisMax;
        const fullTorque = fullTorqueNm(rpm, activeProfile);
        setRpm(rpm, fullTorque ? torqueNm / fullTorque : 0);
      }

      mapSvg.addEventListener('pointerdown', e => {
        if (!e.isPrimary || e.button !== 0) return;
        mapSvg.setPointerCapture(e.pointerId);
        scrubMap(e);
      });
      mapSvg.addEventListener('pointermove', e => {
        if (mapSvg.hasPointerCapture(e.pointerId)) scrubMap(e);
      });
    }
  }

  // =========================================================================
  // UI-UPDATES & STEUERUNG
  // =========================================================================
  const elRpmSlider = document.getElementById('ce-rpm-slider');
  const elRpmVal = document.getElementById('ce-rpm-val');
  const elLoadSlider = document.getElementById('ce-load-slider');
  const elLoadVal = document.getElementById('ce-load-val');
  const elLoadHelp = document.getElementById('ce-load-help');
  const elGearSelector = document.getElementById('ce-gear-selector');
  const elGearInfo = document.getElementById('ce-gear-info');
  const gearPositions = Array.from(elGearSelector?.querySelectorAll('[data-gear]') ?? []);
  const ratioFormat = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2 });
  const boostFormat = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const elStatusBadge = document.getElementById('ce-status-badge');
  const elTelPower = document.getElementById('ce-tel-power');
  const elTelTorque = document.getElementById('ce-tel-torque');
  const elTelIgn = document.getElementById('ce-tel-ign');
  const elTelEff = document.getElementById('ce-tel-eff');
  const elTelEffNote = document.getElementById('ce-tel-eff-note');
  const elTelBsfc = document.getElementById('ce-tel-bsfc');
  const elTelGear = document.getElementById('ce-tel-gear');
  const elTelGearNote = document.getElementById('ce-tel-gear-note');
  const elTelSpeed = document.getElementById('ce-tel-speed');
  const elTelFuel = document.getElementById('ce-tel-fuel');
  const elTelFuelNote = document.getElementById('ce-tel-fuel-note');
  const elMetricBoost = document.getElementById('ce-metric-boost');
  const elTelBoost = document.getElementById('ce-tel-boost');
  const elDrivetrainNote = document.getElementById('ce-drivetrain-note');
  const fuelFormat = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const elMapEff = document.getElementById('ce-map-eff');
  const elMapBsfc = document.getElementById('ce-map-bsfc');
  const elMapNote = document.getElementById('ce-map-note');
  const elInspector = document.getElementById('ce-inspector');
  const elTourCard = document.getElementById('ce-tour-card');
  const elTourStartBtn = document.getElementById('ce-btn-tour');
  const elExplosionBanner = document.getElementById('ce-explosion-banner');
  const elEngineChip = document.getElementById('ce-engine-chip');
  const elEngineSpecTag = document.getElementById('ce-engine-spec-tag');
  const elEngineSubtitle = document.getElementById('ce-engine-subtitle');
  const elCylTitle = document.getElementById('ce-cyl-title');
  const elCylSpec = document.getElementById('ce-cyl-spec');
  const elCylGrid = document.getElementById('ce-cyl-grid');
  let elTourLive;
  let tourDemos;
  let tourStartState;
  let tourPlayback;
  let tourFrame;
  const elLabelsToggle = document.getElementById('ce-btn-labels');
  const elFlowToggle = document.getElementById('ce-btn-flow');
  const elPanelDrawer = document.getElementById('ce-side-panel');
  const elDrawerToggle = document.getElementById('ce-mobile-panel-toggle');
  const presetButtons = Array.from(document.querySelectorAll('.ce-preset-btn'));
  let cylStrokeEls = [0, 1, 2, 3].map(i => document.getElementById(`ce-cyl-badge-${i}`));
  let lastStrokeKey = ['', '', '', ''];

  function rebuildCylinderGrid() {
    const count = activeProfile.layout.cylinders;
    if (elCylTitle) elCylTitle.textContent = `4-Takt Live · Zündfolge ${activeProfile.layout.firingOrder}`;
    if (elCylSpec) elCylSpec.textContent = activeProfile.subtitle;
    if (elCylGrid) {
      elCylGrid.setAttribute('data-cyls', String(count));
      elCylGrid.innerHTML = Array.from({ length: count }, (_, i) =>
        `<div class="ce-cyl-pill" id="ce-cyl-badge-${i}" data-stroke="intake"><span class="ce-cyl-num">Zyl ${i + 1}</span><span class="ce-cyl-stroke">Ansaugen</span></div>`
      ).join('');
      cylStrokeEls = Array.from({ length: count }, (_, i) => document.getElementById(`ce-cyl-badge-${i}`));
    }
    lastStrokeKey = Array(count).fill('');
  }

  function syncVariantButtons() {
    document.querySelectorAll('[data-concept]').forEach(btn => {
      const active = btn.dataset.concept === appState.concept;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-layout]').forEach(btn => {
      const active = btn.dataset.layout === appState.layout;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    if (elEngineChip) {
      elEngineChip.textContent = activeProfile.badgeLabel;
      elEngineChip.classList.toggle('is-diesel', activeProfile.concept.id === 'diesel');
    }
    if (elEngineSpecTag) {
      const disp = `${activeProfile.specs.displacementL.toFixed(1).replace('.', ',')} l`;
      elEngineSpecTag.textContent = `${disp} · ${activeProfile.specs.valves}V`;
    }
    if (elEngineSubtitle) {
      const fuelText = activeProfile.concept.id === 'diesel'
        ? 'Common-Rail DI · VTG-Turbo'
        : 'Saugrohreinspritzung';
      elEngineSubtitle.textContent = `${activeProfile.subtitle} · ${fuelText}`;
    }
    if (elLoadHelp) elLoadHelp.textContent = activeProfile.concept.loadHelp;
    if (elMapNote) elMapNote.textContent = activeProfile.mapNote;
    if (elMetricBoost) elMetricBoost.hidden = !activeProfile.concept.hasTurbo;
    if (elDrivetrainNote) {
      const axle = ratioFormat.format(activeProfile.finalDrive);
      elDrivetrainNote.textContent = `Beispielwerte: 6-Gang-Automatik (4,04 … 0,69), Achsantrieb ${axle}, Reifen 225/45 R17, Kompaktklasse 1500 kg, cw·A 0,65 m².`;
    }
    if (elRpmSlider) {
      elRpmSlider.setAttribute('min', String(activeProfile.specs.idleRpm));
      elRpmSlider.setAttribute('max', String(activeProfile.specs.maxRpm));
    }
    activeProfile.presets.forEach((p, idx) => {
      const btn = presetButtons[idx];
      if (!btn) return;
      btn.dataset.rpm = String(p.rpm);
      btn.dataset.load = String(p.load);
      btn.setAttribute('data-rpm', String(p.rpm));
      btn.setAttribute('data-load', String(p.load));
    });
  }

  function switchEngineVariant(nextLayout, nextConcept) {
    if (nextLayout === appState.layout && nextConcept === appState.concept) return;
    if (appState.tourActive) stopTour();
    if (appState.explosionPhase !== 'idle') repairEngine(false);

    appState.layout = nextLayout;
    appState.concept = nextConcept;
    const wasIdle = appState.rpm === activeProfile.specs.idleRpm && appState.load === 0;
    activeProfile = buildEngineProfile(nextLayout, nextConcept);
    activeParts = getEnginePartsForProfile(activeProfile);
    activeTourSteps = getTourStepsForProfile(activeProfile);
    tourDemos = undefined;

    appState.rpm = wasIdle ? activeProfile.specs.idleRpm : clampOperatingRpm(appState.rpm, activeProfile);

    engine.setProfile?.(activeProfile);
    syncVariantButtons();
    rebuildCylinderGrid();
    buildLabelPins();
    buildDynoChart();
    buildBsfcMap();
    updateTelemetryUI();
    selectPart(activeParts.some(p => p.id === appState.selectedPart) ? appState.selectedPart : null, false);

    const cam = cameraForLayout(appState.viewMode, activeProfile, camera.aspect);
    flyCamera(cam.pos, cam.target, 0.9);
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  }

  function updateTelemetryUI() {
    telemetry = computeEngineTelemetry(appState.rpm, appState.load, tourFrame, activeProfile);
    if (elRpmSlider) {
      const step = Number(elRpmSlider.step) || 50;
      const sliderRpm = Math.round(telemetry.rpm / step) * step;
      if (Number(elRpmSlider.value) !== sliderRpm) elRpmSlider.value = String(sliderRpm);
      elRpmSlider.setAttribute('aria-valuetext', `${Math.round(telemetry.rpm).toLocaleString('de-DE')} U/min`);
    }
    if (elRpmVal && appState.explosionPhase === 'idle') {
      elRpmVal.textContent = `${Math.round(telemetry.rpm).toLocaleString('de-DE')} U/min`;
    }
    const loadPercent = Math.round(telemetry.load * 100);
    const loadText = `${loadPercent} %`;
    if (elLoadSlider) {
      elLoadSlider.value = String(loadPercent);
      elLoadSlider.setAttribute('aria-valuetext', loadText);
    }
    if (elLoadVal) elLoadVal.textContent = loadText;
    if (elStatusBadge && appState.explosionPhase === 'idle') {
      elStatusBadge.textContent = telemetry.statusLabel;
      elStatusBadge.dataset.status = telemetry.status;
    }
    if (elTelPower) elTelPower.textContent = `${Math.round(telemetry.powerKW)} kW (${Math.round(telemetry.powerPS)} PS)`;
    if (elTelTorque) elTelTorque.textContent = `${Math.round(telemetry.torqueNm)} Nm`;
    if (elTelIgn) elTelIgn.textContent = `${Math.round(telemetry.ignitionsPerSec)} / s`;
    const effText = `${Math.round(telemetry.thermalEff * 100)} %`;
    const bsfcText = telemetry.noUsefulPower ? '–' : `${Math.round(telemetry.bsfc).toLocaleString('de-DE')} g/kWh`;
    if (elTelEff) elTelEff.textContent = effText;
    if (elTelEffNote) elTelEffNote.hidden = !telemetry.noUsefulPower;
    if (elTelBsfc) elTelBsfc.textContent = bsfcText;
    if (elTelBoost && activeProfile.concept.hasTurbo) {
      elTelBoost.textContent = `${boostFormat.format(telemetry.boostBar)} bar`;
    }
    const { gear, gearLabel, driveMode, driveModeLabel, fuelL100Instant } = telemetry;
    if (elGearSelector && !gearPositions[gear]?.classList.contains('active')) {
      elGearSelector.style.setProperty('--ce-active-gear', String(gear));
      for (const position of gearPositions) {
        const active = Number(position.dataset.gear) === gear;
        position.classList.toggle('active', active);
        if (active) position.setAttribute('aria-current', 'true');
        else position.removeAttribute('aria-current');
      }
    }
    if (elGearInfo && gear) {
      const ratio = ratioFormat.format(DRIVETRAIN_EXAMPLE.gearRatios[gear - 1]);
      const axle = ratioFormat.format(activeProfile.finalDrive);
      elGearInfo.textContent = `${gearLabel} · i = ${ratio} · Achse ${axle} · ${driveModeLabel}`;
    } else if (elGearInfo) {
      elGearInfo.textContent = `${gearLabel} · ${driveModeLabel}`;
    }
    if (elTelGear) elTelGear.textContent = gearLabel;
    if (elTelGearNote) elTelGearNote.textContent = driveModeLabel;
    const speedText = `${Math.round(telemetry.speedKmh).toLocaleString('de-DE')} km/h`;
    if (elTelSpeed) elTelSpeed.textContent = speedText;
    const hourlyFuel = `${fuelFormat.format(telemetry.fuelLph)} l/h`;
    const fuelText = fuelL100Instant === null ? hourlyFuel : `${fuelFormat.format(fuelL100Instant)} l/100km`;
    if (elTelFuel) elTelFuel.textContent = fuelText;
    if (elTelFuelNote) {
      elTelFuelNote.textContent = fuelL100Instant === null ? 'Leerlauf'
        : driveMode === 'cruise' ? hourlyFuel : `momentan, ${driveModeLabel} · ${hourlyFuel}`;
    }
    if (elTourLive) elTourLive.textContent = `${speedText} · ${gearLabel} · ${driveModeLabel} · ${fuelText}`;
    if (elMapEff) elMapEff.textContent = effText;
    if (elMapBsfc) elMapBsfc.textContent = bsfcText;

    presetButtons.forEach(b => {
      const active = Math.abs(Number(b.dataset.rpm) - telemetry.rpm) <= 120
        && Math.abs(Number(b.dataset.load) - loadPercent) <= 3;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    updateDynoMarkers();
    mapMarker?.setAttribute('transform', `translate(${xForRpm(telemetry.rpm)} ${yForMapTorque(telemetry.torqueNm)})`);
    for (const curve of mapRoadLoads) {
      curve.classList.toggle('is-active', telemetry.driveMode === 'cruise' && Number(curve.dataset.roadGear) === telemetry.gear);
    }
  }

  function setRpm(val, load = appState.load) {
    if (appState.explosionPhase !== 'idle') repairEngine(false);
    appState.rpm = clampOperatingRpm(val, activeProfile);
    setLoad(load);
  }

  function setLoad(val) {
    if (appState.explosionPhase !== 'idle') repairEngine(false);
    clearTourPlayback();
    appState.load = Math.round(THREE.MathUtils.clamp(Number(val) || 0, 0, 1) * 100) / 100;
    updateTelemetryUI();
  }

  function setTimeScale(scale) {
    appState.timeScale = Number(scale);
    document.querySelectorAll('.ce-speed-btn').forEach(btn => {
      btn.classList.toggle('active', Math.abs(Number(btn.dataset.scale) - appState.timeScale) < 0.005);
    });
  }

  // =========================================================================
  // EXPLOSIONS-EASTER-EGG (ÜBERDREHEN -> MOTORSCHADEN -> REPARATUR)
  // =========================================================================
  function showOverrevBanner(rpm) {
    if (!elExplosionBanner) return;
    elExplosionBanner.classList.remove('hidden');
    elExplosionBanner.classList.add('is-overrev');
    elExplosionBanner.innerHTML = `
      <p class="ce-explosion-title">⚠️ DREHZAHLBEGRENZER AUS · ${Math.round(rpm).toLocaleString('de-DE')} U/min!</p>
      <p class="ce-explosion-sub">Öldruck kritisch – Ventiltrieb im kritischen Resonanzbereich …</p>
    `;
  }

  function showBlownBanner(peakRpm, quip) {
    if (!elExplosionBanner) return;
    elExplosionBanner.classList.remove('hidden');
    elExplosionBanner.classList.remove('is-overrev');
    elExplosionBanner.innerHTML = `
      <p class="ce-explosion-title">💥 Motorschaden bei ${Math.round(peakRpm).toLocaleString('de-DE')} U/min!</p>
      <p class="ce-explosion-sub">${quip}</p>
      <button type="button" class="ce-explosion-repair" id="ce-btn-repair">🔧 Neuen Motor einbauen</button>
    `;
    document.getElementById('ce-btn-repair')?.addEventListener('click', () => repairEngine(true));
  }

  function repairEngine(shouldFly = true) {
    appState.explosionPhase = 'idle';
    engine.resetExplosion?.();
    if (elExplosionBanner) {
      elExplosionBanner.classList.add('hidden');
      elExplosionBanner.classList.remove('is-overrev');
      elExplosionBanner.innerHTML = '';
    }
    if (appState.viewMode === 'exploded') {
      appState.viewMode = 'cutaway';
      engine.setViewMode('cutaway');
      document.querySelectorAll('[data-view-mode]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.viewMode === 'cutaway');
      });
    }
    appState.rpm = activeProfile.cruiseRpm;
    appState.load = activeProfile.cruiseLoad;
    updateTelemetryUI();
    if (shouldFly) {
      const cam = cameraForLayout('cutaway', activeProfile, camera.aspect);
      flyCamera(cam.pos, cam.target, 0.85);
    }
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  }

  function startExplosionSequence() {
    if (appState.tourActive) stopTour();
    setDrawerOpen(false);
    appState.viewMode = 'exploded';
    appState.explosionPhase = 'overrev';
    document.querySelectorAll('[data-view-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.viewMode === 'exploded');
    });
    engine.triggerExplosion?.(appState.rpm);
    const cam = cameraForLayout('exploded', activeProfile, camera.aspect);
    flyCamera(cam.pos, cam.target, 0.7);
    showOverrevBanner(Math.max(appState.rpm, activeProfile.specs.redlineRpm));
    if (elStatusBadge) {
      elStatusBadge.textContent = 'ÜBERDREHZAHL!';
      elStatusBadge.dataset.status = 'redline';
    }
  }

  function setViewMode(mode, shouldFly = true) {
    if (mode === 'exploded') {
      startExplosionSequence();
      return;
    }
    if (appState.explosionPhase !== 'idle') {
      appState.explosionPhase = 'idle';
      engine.resetExplosion?.();
      if (elExplosionBanner) {
        elExplosionBanner.classList.add('hidden');
        elExplosionBanner.classList.remove('is-overrev');
      }
      updateTelemetryUI();
    }
    appState.viewMode = mode;
    engine.setViewMode(mode);
    document.querySelectorAll('[data-view-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.viewMode === mode);
    });
    if (shouldFly && DEFAULT_CAMERA[mode]) {
      const cam = cameraForLayout(mode, activeProfile, camera.aspect);
      flyCamera(cam.pos, cam.target);
    }
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  }

  function selectPart(partId, flyToPart = false) {
    appState.selectedPart = partId;
    engine.setSelectedPart(partId);
    const part = activeParts.find(p => p.id === partId);
    if (!elInspector) return;
    if (!part) {
      elInspector.innerHTML = `
        <div class="ce-inspector-empty">
          Klicke ein Bauteil im 3D-Motor oder aktiviere <strong>Labels</strong>, um die Baugruppen im Detail zu erkunden.
        </div>`;
      return;
    }
    elInspector.innerHTML = `
      <div class="ce-inspector-head">
        <span class="ce-inspector-num">${part.number}</span>
        <div>
          <div class="ce-inspector-cat">${part.category}</div>
          <h3 class="ce-inspector-title">${part.name}</h3>
        </div>
        <button type="button" class="ce-inspector-close" id="ce-inspector-clear" aria-label="Auswahl aufheben">✕</button>
      </div>
      <div class="ce-inspector-stage">🔥 ${part.energyStage}</div>
      <p class="ce-inspector-desc">${part.description}</p>
      <div class="ce-inspector-spec">${part.spec}</div>
    `;
    document.getElementById('ce-inspector-clear')?.addEventListener('click', () => selectPart(null, false));
    if (flyToPart && part.cameraPos) {
      const s = activeProfile.layout.cameraScale || 1;
      flyCamera(part.cameraPos.map(v => v * s), part.cameraTarget);
    }
    if (window.ArcadeAudio) window.ArcadeAudio.pop();
  }

  // =========================================================================
  // 06 SCHRITT-FÜR-SCHRITT-TOUR
  // =========================================================================
  function clearTourPlayback() {
    if (tourPlayback) camAnim = null;
    tourPlayback = undefined;
    tourFrame = undefined;
  }

  function showTourFrame(frame) {
    tourFrame = frame;
    appState.rpm = clampOperatingRpm(frame.rpm, activeProfile);
    appState.load = frame.load;
    updateTelemetryUI();
  }

  function advanceTourPlayback(now) {
    const { demo, startMs } = tourPlayback;
    const elapsedS = (now - startMs) / 1000 - (demo.leadInS ?? 0);
    const progress = THREE.MathUtils.clamp(elapsedS / demo.playbackS, 0, 1) ** (demo.timeExponent ?? 1);
    const index = Math.min(demo.frames.length - 1, Math.floor(progress * demo.frames.length));
    if (elapsedS >= demo.playbackS + (demo.holdS ?? 0)) {
      const frame = demo.resetOnFinish ? demo.frames[0] : demo.frames.at(-1);
      clearTourPlayback();
      appState.rpm = clampOperatingRpm(frame.rpm, activeProfile);
      appState.load = frame.load;
      updateTelemetryUI();
    } else if (demo.frames[index] !== tourFrame) {
      showTourFrame(demo.frames[index]);
    }
  }

  function renderTourStep() {
    clearTourPlayback();
    const step = activeTourSteps[appState.tourIndex];
    const total = activeTourSteps.length;
    if (step.demo) tourDemos ??= computeDriveTourDemos(mapOptimum, activeProfile);
    const demo = step.demo ? tourDemos[step.demo] : null;
    const oldFocus = document.activeElement;
    const focusSelector = elTourCard.contains(oldFocus)
      ? oldFocus.dataset.tourGoto !== undefined ? `[data-tour-goto="${oldFocus.dataset.tourGoto}"]` : `#${oldFocus.id}`
      : null;
    elTourCard.classList.remove('hidden');
    elPanelDrawer?.classList.toggle('ce-drive-tour', Boolean(demo));
    if (demo && elPanelDrawer) elPanelDrawer.scrollTop = 0;
    elTourCard.innerHTML = `
      <div class="ce-tour-top">
        <span class="ce-tour-step-pill">Schritt ${step.step} / ${total}</span>
        <span class="ce-tour-badge">${step.badge}</span>
        <button type="button" class="ce-tour-close" id="ce-tour-end" aria-label="Tour beenden">✕</button>
      </div>
      <h3 class="ce-tour-title">${step.title}</h3>
      ${step.id === 'legend' ? '<div class="ce-flow-key" aria-hidden="true"><span>Luft</span><span>Kraftstoff</span><span>Abgas</span></div>' : ''}
      <p class="ce-tour-body">${demo?.body ?? step.body}</p>
      ${demo ? '<p class="ce-tour-live" id="ce-tour-live"></p>' : ''}
      <div class="ce-tour-footer">
        <div class="ce-tour-dots">
          ${activeTourSteps.map((_, idx) => `<button type="button" class="ce-tour-dot ${idx === appState.tourIndex ? 'active' : ''}" data-tour-goto="${idx}" aria-label="Schritt ${idx + 1}" ${idx === appState.tourIndex ? 'aria-current="step"' : ''}></button>`).join('')}
        </div>
        <div class="ce-tour-actions">
          <button type="button" class="ce-btn-ghost" id="ce-tour-prev" ${appState.tourIndex === 0 ? 'disabled' : ''}>← Zurück</button>
          <button type="button" class="ce-btn-primary" id="ce-tour-next">${appState.tourIndex === total - 1 ? 'Fertig ✓' : 'Weiter →'}</button>
        </div>
      </div>
    `;

    elTourLive = document.getElementById('ce-tour-live');
    setViewMode(step.viewMode, false);
    setTimeScale(step.demoTimeScale);
    if (demo) {
      tourPlayback = { demo, startMs: performance.now() };
      showTourFrame(demo.frames[0]);
    } else {
      setRpm(step.demoRpm, step.demoLoad ?? 0.6);
    }
    selectPart(step.focusPart, false);
    flyCamera(step.cameraPos, step.cameraTarget, 0.95);

    document.getElementById('ce-tour-end')?.addEventListener('click', () => stopTour());
    document.getElementById('ce-tour-prev')?.addEventListener('click', () => {
      if (appState.tourIndex > 0) {
        appState.tourIndex--;
        renderTourStep();
      }
    });
    document.getElementById('ce-tour-next')?.addEventListener('click', () => {
      if (appState.tourIndex < total - 1) {
        appState.tourIndex++;
        renderTourStep();
      } else {
        stopTour();
      }
    });
    elTourCard.querySelectorAll('[data-tour-goto]').forEach(btn => {
      btn.addEventListener('click', () => {
        appState.tourIndex = Number(btn.dataset.tourGoto);
        renderTourStep();
      });
    });
    const focusTarget = focusSelector && elTourCard.querySelector(focusSelector);
    (focusTarget && !focusTarget.disabled ? focusTarget : elTourCard.querySelector('#ce-tour-next'))?.focus();
  }

  function startTour(index = 0) {
    if (!elTourCard) return;
    if (appState.explosionPhase !== 'idle') repairEngine(false);
    const { rpm, load, timeScale, viewMode, labelsVisible, selectedPart } = appState;
    tourStartState = {
      rpm, load, timeScale, viewMode, labelsVisible, selectedPart, flowVisible: appState.flowVisible,
      position: camera.position.clone(), target: controls.target.clone(),
      panelScrollTop: elPanelDrawer?.scrollTop
    };
    setFlow(true);
    appState.tourActive = true;
    appState.tourIndex = index;
    elTourStartBtn?.classList.add('active');
    renderTourStep();
  }

  function stopTour() {
    clearTourPlayback();
    camAnim = null;
    appState.tourActive = false;
    elTourCard.classList.add('hidden');
    elTourLive = undefined;
    elPanelDrawer?.classList.remove('ce-drive-tour');
    const { rpm, load, timeScale, viewMode, labelsVisible, selectedPart, position, target, panelScrollTop } =
      tourStartState;
    setFlow(tourStartState.flowVisible);
    tourStartState = undefined;
    setRpm(rpm, load);
    setTimeScale(timeScale);
    setViewMode(viewMode, false);
    appState.labelsVisible = labelsVisible;
    elLabelsToggle?.classList.toggle('active', labelsVisible);
    selectPart(selectedPart, false);
    camera.position.copy(position);
    controls.target.copy(target);
    if (elPanelDrawer) elPanelDrawer.scrollTop = panelScrollTop;
    elTourStartBtn?.classList.remove('active');
    elTourStartBtn?.focus();
  }

  // Event-Bindings
  document.querySelectorAll('[data-view-mode]').forEach(btn => {
    btn.addEventListener('click', () => setViewMode(btn.dataset.viewMode, true));
  });

  document.querySelectorAll('[data-concept]').forEach(btn => {
    btn.addEventListener('click', () => switchEngineVariant(appState.layout, btn.dataset.concept));
  });

  document.querySelectorAll('[data-layout]').forEach(btn => {
    btn.addEventListener('click', () => switchEngineVariant(btn.dataset.layout, appState.concept));
  });

  elEngineChip?.addEventListener('click', () => {
    if (elPanelDrawer) {
      elPanelDrawer.scrollTop = 0;
      setDrawerOpen(true);
    }
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  });

  elRpmSlider?.addEventListener('input', e => setRpm(e.target.value));
  elLoadSlider?.addEventListener('input', e => setLoad(Number(e.target.value) / 100));

  const takeOver = () => {
    if (!tourPlayback) return;
    clearTourPlayback();
    updateTelemetryUI();
  };
  for (const btn of [elRpmSlider, elLoadSlider, ...presetButtons]) {
    btn?.addEventListener('pointerdown', takeOver);
    btn?.addEventListener('keydown', e => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown', 'Enter', ' ']
        .includes(e.key)) takeOver();
    });
  }

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setRpm(Number(btn.dataset.rpm), Number(btn.dataset.load) / 100);
      if (window.ArcadeAudio) window.ArcadeAudio.click();
    });
  });

  document.querySelectorAll('.ce-speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeScale(Number(btn.dataset.scale));
      if (window.ArcadeAudio) window.ArcadeAudio.click();
    });
  });

  elLabelsToggle?.addEventListener('click', () => {
    appState.labelsVisible = !appState.labelsVisible;
    elLabelsToggle.classList.toggle('active', appState.labelsVisible);
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  });

  function setFlow(visible) {
    appState.flowVisible = visible;
    engine.setFlowVisible(appState.flowVisible);
    elFlowToggle?.classList.toggle('active', appState.flowVisible);
  }

  elFlowToggle?.addEventListener('click', () => {
    setFlow(!appState.flowVisible);
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  });

  document.getElementById('ce-btn-reset')?.addEventListener('click', () => {
    if (appState.explosionPhase !== 'idle') {
      repairEngine(true);
      return;
    }
    const cam = cameraForLayout(appState.viewMode, activeProfile, camera.aspect);
    flyCamera(cam.pos, cam.target);
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  });

  elTourStartBtn?.addEventListener('click', () => {
    if (appState.tourActive) stopTour();
    else startTour(0);
  });

  const elDrawerBackdrop = document.getElementById('ce-drawer-backdrop');
  const elDrawerClose = document.getElementById('ce-drawer-close');

  function setDrawerOpen(open) {
    if (!elPanelDrawer) return;
    elPanelDrawer.classList.toggle('mobile-open', open);
    elDrawerBackdrop?.classList.toggle('visible', open);
    if (elDrawerToggle) {
      elDrawerToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      elDrawerToggle.textContent = open ? '✕ Steuerung ausblenden' : '⚙️ Motor, Last & Diagramme';
    }
  }

  elDrawerToggle?.addEventListener('click', () => {
    setDrawerOpen(!elPanelDrawer.classList.contains('mobile-open'));
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  });

  elDrawerClose?.addEventListener('click', () => {
    setDrawerOpen(false);
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  });

  elDrawerBackdrop?.addEventListener('click', () => setDrawerOpen(false));

  window.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (elPanelDrawer?.classList.contains('mobile-open')) setDrawerOpen(false);
    if (appState.tourActive) stopTour();
    if (appState.explosionPhase !== 'idle') repairEngine(true);
  });

  // Topbar Mute & Version Changelog
  const elMute = document.getElementById('btn-mute');
  if (elMute && window.ArcadeAudio) {
    window.ArcadeAudio.syncButton(elMute);
    elMute.addEventListener('click', () => window.ArcadeAudio.toggleMute(elMute));
  }
  const elVersionBtn = document.getElementById('ce-version-btn');
  if (elVersionBtn && window.ArcadeUpdates) {
    const latest = window.ArcadeUpdates.latest('combustion_engine');
    if (latest) elVersionBtn.textContent = `v${latest.version}`;
    elVersionBtn.addEventListener('click', () => window.ArcadeUpdates.openChangelog('combustion_engine', elVersionBtn));
  }

  // Initialisieren (Standard: R4 Otto-Sauger, 01 Cutaway)
  syncVariantButtons();
  buildDynoChart();
  buildBsfcMap();
  updateTelemetryUI();
  setTimeScale(appState.timeScale);
  selectPart(null, false);

  function handleResize() {
    const w = Math.max(1, viewport.clientWidth);
    const h = Math.max(1, viewport.clientHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    engineRenderer.resize(w, h);
  }
  handleResize();
  const initialView = cameraForLayout('cutaway', activeProfile, camera.aspect);
  camera.position.set(...initialView.pos);
  controls.target.set(...initialView.target);
  const resizeObs = new ResizeObserver(handleResize);
  resizeObs.observe(viewport);

  // =========================================================================
  // RENDER LOOP
  // =========================================================================
  let lastTime = performance.now();

  function animate(now) {
    requestAnimationFrame(animate);
    const frameSeconds = (now - lastTime) / 1000;
    const dt = Math.min(0.25, frameSeconds);
    lastTime = now;
    if (tourPlayback) advanceTourPlayback(now);

    if (camAnim) {
      camAnim.elapsed += dt;
      const t = Math.min(1, camAnim.elapsed / camAnim.duration);
      const ease = 1 - Math.pow(1 - t, 3);
      camera.position.lerpVectors(camAnim.startPos, camAnim.endPos, ease);
      controls.target.lerpVectors(camAnim.startTarget, camAnim.endTarget, ease);
      if (t >= 1) camAnim = null;
    }

    controls.update();
    const sim = engine.update(dt, telemetry, appState.timeScale);

    // Explosions-Easter-Egg HUD-Sync
    if (sim?.explosion) {
      if (sim.explosion.phase === 'overrev') {
        appState.explosionPhase = 'overrev';
        if (elRpmVal) elRpmVal.textContent = `${Math.round(sim.explosion.rpm).toLocaleString('de-DE')} U/min`;
        showOverrevBanner(sim.explosion.rpm);
      } else if (sim.explosion.justBlown) {
        appState.explosionPhase = 'blown';
        if (elRpmVal) elRpmVal.textContent = '0 U/min';
        if (elStatusBadge) {
          elStatusBadge.textContent = 'MOTORSCHADEN!';
          elStatusBadge.dataset.status = 'blown';
        }
        showBlownBanner(sim.explosion.peakBlowRpm, sim.explosion.quip);
      }
    }

    // Zylinder-Taktanzeige nur bei Zustandswechsel im DOM anfassen
    const cylCount = sim.strokes.length;
    const stopped = appState.explosionPhase === 'blown';
    for (let i = 0; i < cylCount; i++) {
      const st = sim.strokes[i];
      const key = stopped ? 'off' : st.key;
      if (lastStrokeKey[i] !== key) {
        lastStrokeKey[i] = key;
        const el = cylStrokeEls[i];
        if (el) {
          el.dataset.stroke = key;
          const labelSpan = el.querySelector('.ce-cyl-stroke');
          if (labelSpan) labelSpan.textContent = stopped ? 'Defekt' : st.short;
        }
      }
    }

    engineRenderer.render(frameSeconds);
    updateLabels();
  }
  requestAnimationFrame(animate);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
