import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  DRIVETRAIN_EXAMPLE,
  DRIVE_TOUR_EXAMPLE,
  ENGINE_SPECS,
  ENGINE_PARTS,
  ENGINE_TOUR_STEPS,
  TORQUE_NM_PER_BAR,
  computeEngineTelemetry,
  computeBsfcContours,
  computeDriveTourDemos,
  fullTorqueNm,
  roadLoadTorqueNm,
  speedKmh
} from './ce-data.js?v=0.3.0';
import { createCombustionEngineModel } from './ce-model.js?v=0.3.0';

const DEFAULT_CAMERA = {
  normal: { pos: [7.8, 2.5, 8.6], target: [0.0, 0.5, 0.0] },
  cutaway: { pos: [6.2, 2.0, 7.6], target: [0.0, 0.7, 0.0] },
  xray: { pos: [7.2, 2.4, 8.0], target: [0.0, 0.7, 0.0] },
  exploded: { pos: [13.2, 3.4, 14.8], target: [0.0, 1.0, 0.0] }
};

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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
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
  controls.maxDistance = 30;
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
  const d = 10;
  keyLight.shadow.camera.left = -d;
  keyLight.shadow.camera.right = d;
  keyLight.shadow.camera.top = d;
  keyLight.shadow.camera.bottom = -d;
  keyLight.shadow.bias = -0.0005;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xf97316, 0.85);
  rimLight.position.set(-12, 6, -10);
  scene.add(rimLight);

  const engine = createCombustionEngineModel();
  scene.add(engine.root);

  // =========================================================================
  // THEME SYNC (DARK / LIGHT)
  // =========================================================================
  function syncSceneTheme() {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const isDark = theme === 'dark';
    scene.background = new THREE.Color(isDark ? 0x0b1220 : 0xeef3fa);
    scene.fog = new THREE.Fog(isDark ? 0x0b1220 : 0xeef3fa, 24, 58);
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
    viewMode: 'cutaway',
    rpm: DRIVE_TOUR_EXAMPLE.cruiseRpm,
    load: DRIVE_TOUR_EXAMPLE.cruiseLoad,
    timeScale: 0.16,
    labelsVisible: false,
    flowVisible: true,
    selectedPart: null,
    tourActive: false,
    tourIndex: 0
  };

  let telemetry = computeEngineTelemetry(appState.rpm, appState.load);

  // =========================================================================
  // 3D-LABELS (PROJEKTION)
  // =========================================================================
  const labelEls = new Map();
  ENGINE_PARTS.forEach(part => {
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

  const projVec = new THREE.Vector3();
  function updateLabels() {
    const show = appState.labelsVisible || appState.viewMode === 'exploded';
    labelLayer.classList.toggle('is-visible', show);
    if (!show) return;

    const w = viewport.clientWidth;
    const h = viewport.clientHeight;
    for (const part of ENGINE_PARTS) {
      const el = labelEls.get(part.id);
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

  function xForRpm(rpm) {
    return pad.left + (rpm / ENGINE_SPECS.maxRpm) * plotW;
  }
  function yForPower(kw) {
    return pad.top + plotH - (kw / 165) * plotH;
  }
  function yForTorque(nm) {
    return pad.top + plotH - (nm / 300) * plotH;
  }

  function buildDynoChart() {
    if (!chartSvg) return;
    const samples = [];
    for (let rpm = 0; rpm <= ENGINE_SPECS.maxRpm; rpm += 100) {
      const t = computeEngineTelemetry(rpm);
      samples.push({ rpm, kw: t.powerKW, nm: t.torqueNm });
    }
    const powerPath = samples
      .map((s, i) => `${i === 0 ? 'M' : 'L'}${xForRpm(s.rpm).toFixed(1)},${yForPower(s.kw).toFixed(1)}`)
      .join(' ');
    const torquePath = samples
      .map((s, i) => `${i === 0 ? 'M' : 'L'}${xForRpm(s.rpm).toFixed(1)},${yForTorque(s.nm).toFixed(1)}`)
      .join(' ');
    const areaPath =
      `${powerPath} L${xForRpm(ENGINE_SPECS.maxRpm).toFixed(1)},${yForPower(0).toFixed(1)} ` +
      `L${xForRpm(0).toFixed(1)},${yForPower(0).toFixed(1)} Z`;

    const xRedline = xForRpm(ENGINE_SPECS.redlineRpm);

    chartSvg.innerHTML = `
      <defs>
        <linearGradient id="cePowerFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2563eb" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#2563eb" stop-opacity="0.02" />
        </linearGradient>
      </defs>
      <!-- Roter Drehzahlbereich -->
      <rect x="${xRedline.toFixed(1)}" y="${pad.top}" width="${(xForRpm(7000) - xRedline).toFixed(1)}" height="${plotH}" class="chart-zone-redline" />
      <!-- Hilfslinien -->
      ${[0, 50, 100, 150]
        .map(kw => {
          const y = yForPower(kw).toFixed(1);
          return `<line x1="${pad.left}" y1="${y}" x2="${chartW - pad.right}" y2="${y}" class="chart-grid" />
            <text x="${pad.left - 5}" y="${Number(y) + 3.5}" text-anchor="end" class="chart-axis-text power">${kw}</text>`;
        })
        .join('')}
      ${[0, 100, 200, 300]
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
      ${[0, 1, 2, 3, 4, 5, 6, 7]
        .map(k => `<text x="${xForRpm(k * 1000).toFixed(1)}" y="${chartH - 7}" text-anchor="middle" class="chart-axis-text">${k}k</text>`)
        .join('')}
      <text x="${pad.left + 2}" y="${pad.top + 9}" class="chart-unit-text power">kW</text>
      <text x="${chartW - pad.right - 2}" y="${pad.top + 9}" text-anchor="end" class="chart-unit-text torque">Nm</text>
      <!-- Live-Marker auf beiden Kurven -->
      <line id="ce-chart-vline" x1="0" y1="${pad.top}" x2="0" y2="${pad.top + plotH}" class="chart-live-guide" />
      <circle id="ce-dot-torque" cx="0" cy="0" r="4.2" class="chart-dot-torque" />
      <circle id="ce-dot-power" cx="0" cy="0" r="4.5" class="chart-dot-power" />
    `;

    let dragging = false;
    function scrub(e) {
      const rect = chartSvg.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / rect.width) * chartW;
      const ratio = Math.max(0, Math.min(1, (relX - pad.left) / plotW));
      setRpm(Math.round((ratio * ENGINE_SPECS.maxRpm) / 50) * 50);
    }
    chartSvg.addEventListener('pointerdown', e => {
      dragging = true;
      chartSvg.setPointerCapture(e.pointerId);
      scrub(e);
    });
    chartSvg.addEventListener('pointermove', e => {
      if (dragging) scrub(e);
    });
    chartSvg.addEventListener('pointerup', () => {
      dragging = false;
    });
  }

  function updateDynoMarkers() {
    const fullLoad = computeEngineTelemetry(telemetry.rpm);
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
  const mapTorqueMax = 300;
  let mapMarker;
  let mapRoadLoads = [];
  let mapOptimum;

  function yForMapTorque(torqueNm) {
    return mapBottom - torqueNm / mapTorqueMax * mapPlotH;
  }

  function mapPath(points) {
    return points.map(({ rpm, torqueNm }, i) => {
      return `${i === 0 ? 'M' : 'L'}${xForRpm(rpm).toFixed(2)},${yForMapTorque(torqueNm).toFixed(2)}`;
    }).join(' ');
  }

  function mapRoadLoadCurve(gear, rpmStep) {
    const { minCruiseKmh, maxSpeedKmh } = DRIVETRAIN_EXAMPLE;
    const speedPerRpm = speedKmh(1, gear);
    const start = Math.max(ENGINE_SPECS.minRunningRpm, minCruiseKmh / speedPerRpm);
    const end = Math.min(ENGINE_SPECS.maxRpm, maxSpeedKmh / speedPerRpm);
    const torqueAt = rpm => roadLoadTorqueNm(rpm, gear);
    if (start >= end || torqueAt(start) > fullTorqueNm(start)) return '';

    const points = [{ rpm: start, torqueNm: torqueAt(start) }];
    let lastRpm = start;
    while (lastRpm < end) {
      let nextRpm = Math.min(lastRpm + rpmStep, end);
      if (torqueAt(nextRpm) > fullTorqueNm(nextRpm)) {
        // Schnittpunkt der Fahrwiderstandskurve mit der Volllastgrenze verfeinern.
        while (nextRpm - lastRpm > 0.01) {
          const middle = (lastRpm + nextRpm) / 2;
          if (torqueAt(middle) <= fullTorqueNm(middle)) lastRpm = middle;
          else nextRpm = middle;
        }
        points.push({ rpm: lastRpm, torqueNm: torqueAt(lastRpm) });
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
    const { maxRpm, minRunningRpm, redlineRpm } = ENGINE_SPECS;
    const { contours, optimum } = computeBsfcContours();
    mapOptimum = optimum;
    const fullLoad = [{ rpm: minRunningRpm, torqueNm: 0 }];
    const rpmStep = 50;
    for (let rpm = minRunningRpm; rpm <= maxRpm; rpm += rpmStep) {
      fullLoad.push({ rpm, torqueNm: fullTorqueNm(rpm) });
    }

    const fullLoadPath = mapPath(fullLoad);
    const right = xForRpm(maxRpm);
    const left = xForRpm(0);
    const redline = xForRpm(redlineRpm);
    const areaPath = `${fullLoadPath} L${right},${mapBottom} Z`;
    const labels = [];
    const labelRpms = [3675, 1850, 3900, 4850, 5800, 3450];
    const contourPaths = contours.map(({ level, polylines }, i) => {
      const labelRpm = labelRpms[i];
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

    mapSvg.innerHTML = `
      <defs><clipPath id="ce-map-limits"><path d="${areaPath}" /></clipPath></defs>
      <rect x="${redline}" y="${mapTop}" width="${right - redline}" height="${mapPlotH}" class="chart-zone-redline" />
      <path d="${areaPath}" class="chart-map-area" />
      ${[0, 100, 200, 300].map(nm => {
        const y = yForMapTorque(nm);
        return `<line x1="${left}" y1="${y}" x2="${right}" y2="${y}" class="chart-grid" />
          <text x="${left - 5}" y="${y + 3.5}" text-anchor="end" class="chart-axis-text">${nm}</text>`;
      }).join('')}
      ${[0, 5, 10, 15].map(bar => {
        const y = yForMapTorque(bar * TORQUE_NM_PER_BAR);
        return `<line x1="${right}" x2="${right + 4}" y1="${y}" y2="${y}" class="chart-grid" />
          <text x="${right + 6}" y="${y + 3.5}" class="chart-axis-text">${bar}</text>`;
      }).join('')}
      <path d="M${left},${mapTop} V${mapBottom} H${right} V${mapTop}" class="chart-grid" fill="none" />
      <line x1="${redline}" x2="${redline}" y1="${mapTop}" y2="${mapBottom}" class="chart-marker-line danger" />
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(k =>
        `<text x="${xForRpm(k * 1000)}" y="186" text-anchor="middle" class="chart-axis-text">${k}k</text>`
      ).join('')}
      <text x="${chartW / 2}" y="198" text-anchor="middle" class="chart-axis-text">Drehzahl (U/min)</text>
      <text x="${left - 5}" y="13" text-anchor="end" class="chart-axis-text">Nm</text>
      <text x="${right + 6}" y="13" class="chart-axis-text">bar</text>
      <g clip-path="url(#ce-map-limits)">${contourPaths}</g>
      <path d="${fullLoadPath}" class="chart-map-limit" />
      ${[4, 5, 6].map(gear => mapRoadLoadCurve(gear, rpmStep)).join('')}
      ${labels.join('')}
      <path d="M${optimumX},${optimumY - 4} l4,7 h-8 Z" class="chart-map-optimum" />
      <text x="${optimumX - 43}" y="${optimumY - 17}" text-anchor="middle" class="chart-map-label">Optimum ~${contours[0].level}</text>
      <g id="ce-map-marker">
        <circle r="8" class="chart-map-halo" />
        <circle r="4.4" class="chart-map-dot" />
      </g>
    `;
    mapMarker = mapSvg.querySelector('#ce-map-marker');
    mapRoadLoads = mapSvg.querySelectorAll('[data-road-gear]');

    function scrubMap(e) {
      const matrix = mapSvg.getScreenCTM();
      if (!matrix) return;
      const point = new DOMPoint(e.clientX, e.clientY).matrixTransform(matrix.inverse());
      const ratio = THREE.MathUtils.clamp((point.x - left) / plotW, 0, 1);
      const rpm = Math.round(ratio * maxRpm / rpmStep) * rpmStep;
      const torqueNm = (mapBottom - point.y) / mapPlotH * mapTorqueMax;
      const fullTorque = fullTorqueNm(rpm);
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

  // =========================================================================
  // UI-UPDATES & STEUERUNG
  // =========================================================================
  const elRpmSlider = document.getElementById('ce-rpm-slider');
  const elRpmVal = document.getElementById('ce-rpm-val');
  const elLoadSlider = document.getElementById('ce-load-slider');
  const elLoadVal = document.getElementById('ce-load-val');
  const elGearSelector = document.getElementById('ce-gear-selector');
  const elGearInfo = document.getElementById('ce-gear-info');
  const gearPositions = Array.from(elGearSelector?.querySelectorAll('[data-gear]') ?? []);
  const ratioFormat = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2 });
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
  const fuelFormat = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const elMapEff = document.getElementById('ce-map-eff');
  const elMapBsfc = document.getElementById('ce-map-bsfc');
  const elInspector = document.getElementById('ce-inspector');
  const elTourCard = document.getElementById('ce-tour-card');
  const elTourStartBtn = document.getElementById('ce-btn-tour');
  let elTourLive;
  let tourDemos;
  let tourStartState;
  let tourPlayback;
  let tourFrame;
  const elLabelsToggle = document.getElementById('ce-btn-labels');
  const elFlowToggle = document.getElementById('ce-btn-flow');
  const elPanelDrawer = document.getElementById('ce-side-panel');
  const elDrawerToggle = document.getElementById('ce-mobile-panel-toggle');
  const cylStrokeEls = [0, 1, 2, 3].map(i => document.getElementById(`ce-cyl-badge-${i}`));

  function updateTelemetryUI() {
    telemetry = computeEngineTelemetry(appState.rpm, appState.load, tourFrame);
    if (elRpmSlider) {
      const sliderRpm = Math.round(telemetry.rpm / Number(elRpmSlider.step)) * Number(elRpmSlider.step);
      if (Number(elRpmSlider.value) !== sliderRpm) elRpmSlider.value = String(sliderRpm);
      elRpmSlider.setAttribute('aria-valuetext', `${Math.round(telemetry.rpm).toLocaleString('de-DE')} U/min`);
    }
    if (elRpmVal) elRpmVal.textContent = `${Math.round(telemetry.rpm).toLocaleString('de-DE')} U/min`;
    const loadPercent = Math.round(telemetry.load * 100);
    const loadText = `${loadPercent} %`;
    if (elLoadSlider) {
      elLoadSlider.value = String(loadPercent);
      elLoadSlider.setAttribute('aria-valuetext', loadText);
    }
    if (elLoadVal) elLoadVal.textContent = loadText;
    if (elStatusBadge) {
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
      const axle = ratioFormat.format(DRIVETRAIN_EXAMPLE.finalDrive);
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
      const neutralLabel = telemetry.status === 'off' ? telemetry.statusLabel : 'Leerlauf';
      elTelFuelNote.textContent = fuelL100Instant === null ? neutralLabel
        : driveMode === 'cruise' ? hourlyFuel : `momentan, ${driveModeLabel} · ${hourlyFuel}`;
    }
    if (elTourLive) elTourLive.textContent = `${speedText} · ${gearLabel} · ${driveModeLabel} · ${fuelText}`;
    if (elMapEff) elMapEff.textContent = effText;
    if (elMapBsfc) elMapBsfc.textContent = bsfcText;

    document.querySelectorAll('.ce-preset-btn').forEach(b => {
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
    appState.rpm = Math.max(0, Math.min(ENGINE_SPECS.maxRpm, Number(val) || 0));
    setLoad(load);
  }

  function setLoad(val) {
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

  function setViewMode(mode, shouldFly = true) {
    appState.viewMode = mode;
    engine.setViewMode(mode);
    document.querySelectorAll('[data-view-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.viewMode === mode);
    });
    if (mode === 'exploded') {
      appState.labelsVisible = true;
      if (elLabelsToggle) elLabelsToggle.classList.add('active');
    }
    if (shouldFly && DEFAULT_CAMERA[mode]) {
      flyCamera(DEFAULT_CAMERA[mode].pos, DEFAULT_CAMERA[mode].target);
    }
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  }

  function selectPart(partId, flyToPart = false) {
    appState.selectedPart = partId;
    engine.setSelectedPart(partId);
    const part = ENGINE_PARTS.find(p => p.id === partId);
    if (!elInspector) return;
    if (!part) {
      elInspector.innerHTML = `
        <div class="ce-inspector-empty">
          Klicke ein Bauteil im 3D-Motor oder aktiviere <strong>Labels</strong> / <strong>03 Exploded</strong>, um alle 12 Baugruppen im Detail zu erkunden.
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
      flyCamera(part.cameraPos, part.cameraTarget);
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
    appState.rpm = frame.rpm;
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
      appState.rpm = frame.rpm;
      appState.load = frame.load;
      updateTelemetryUI();
    } else if (demo.frames[index] !== tourFrame) {
      showTourFrame(demo.frames[index]);
    }
  }

  function renderTourStep() {
    clearTourPlayback();
    const step = ENGINE_TOUR_STEPS[appState.tourIndex];
    const total = ENGINE_TOUR_STEPS.length;
    if (step.demo) tourDemos ??= computeDriveTourDemos(mapOptimum);
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
      <p class="ce-tour-body">${demo?.body ?? step.body}</p>
      ${demo ? '<p class="ce-tour-live" id="ce-tour-live"></p>' : ''}
      <div class="ce-tour-footer">
        <div class="ce-tour-dots">
          ${ENGINE_TOUR_STEPS.map((_, idx) => `<button type="button" class="ce-tour-dot ${idx === appState.tourIndex ? 'active' : ''}" data-tour-goto="${idx}" aria-label="Schritt ${idx + 1}" ${idx === appState.tourIndex ? 'aria-current="step"' : ''}></button>`).join('')}
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
    const { rpm, load, timeScale, viewMode, labelsVisible, selectedPart } = appState;
    tourStartState = {
      rpm, load, timeScale, viewMode, labelsVisible, selectedPart,
      position: camera.position.clone(), target: controls.target.clone(),
      panelScrollTop: elPanelDrawer?.scrollTop
    };
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

  elRpmSlider?.addEventListener('input', e => setRpm(e.target.value));
  elLoadSlider?.addEventListener('input', e => setLoad(Number(e.target.value) / 100));

  const presetButtons = document.querySelectorAll('.ce-preset-btn');
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

  elFlowToggle?.addEventListener('click', () => {
    appState.flowVisible = !appState.flowVisible;
    engine.setFlowVisible(appState.flowVisible);
    elFlowToggle.classList.toggle('active', appState.flowVisible);
    if (window.ArcadeAudio) window.ArcadeAudio.click();
  });

  document.getElementById('ce-btn-reset')?.addEventListener('click', () => {
    const cam = DEFAULT_CAMERA[appState.viewMode] || DEFAULT_CAMERA.cutaway;
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
      elDrawerToggle.textContent = open ? '✕ Steuerung ausblenden' : '⚙️ Drehzahl, Last & Diagramme';
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

  // Initialisieren (Standard: 01 Cutaway)
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
    renderer.setSize(w, h, false);
  }
  handleResize();
  const resizeObs = new ResizeObserver(handleResize);
  resizeObs.observe(viewport);

  // =========================================================================
  // RENDER LOOP
  // =========================================================================
  let lastTime = performance.now();
  const lastStrokeKey = ['', '', '', ''];

  function animate(now) {
    requestAnimationFrame(animate);
    const dt = Math.min(0.25, (now - lastTime) / 1000);
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

    // 4-Zylinder-Taktanzeige nur bei Zustandswechsel im DOM anfassen
    for (let i = 0; i < 4; i++) {
      const st = sim.strokes[i];
      const key = telemetry.rpm < 200 ? 'off' : st.key;
      if (lastStrokeKey[i] !== key) {
        lastStrokeKey[i] = key;
        const el = cylStrokeEls[i];
        if (el) {
          el.dataset.stroke = key;
          const labelSpan = el.querySelector('.ce-cyl-stroke');
          if (labelSpan) labelSpan.textContent = telemetry.rpm < 200 ? 'Aus' : st.short;
        }
      }
    }

    renderer.render(scene, camera);
    updateLabels();
  }
  requestAnimationFrame(animate);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
