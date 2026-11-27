import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import * as engine from '../ce-data.js';
import releaseCatalog from '../../../shared/releases.js';

const {
  DRIVETRAIN_EXAMPLE, DRIVE_SEQUENCE_EXAMPLE, DRIVE_TOUR_EXAMPLE, ENGINE_SPECS, ENGINE_TOUR_STEPS,
  computeBsfcContours, computeDriveTourDemos, computeDrivetrain, computeEngineTelemetry,
  constantSpeedPoint, fullTorqueNm, roadLoadTorqueNm, simulateDriveSequence, speedKmh
} = engine;
const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const html = read('../index.html');
const demos = computeDriveTourDemos();
const whole = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function near(actual, expected) {
  assert.ok(Math.abs(actual - expected) <= 1e-9, `${actual} ≠ ${expected}`);
}

test('Momentanverbrauch in allen Fahrmodi, l/100km für die Konstantfahrt bleibt erhalten', () => {
  for (const rpm of [4250, 5950]) {
    const point = computeEngineTelemetry(rpm, 1);
    assert.ok(point.fuelL100Instant > 0);
    near(point.fuelL100Instant, point.fuelLph * 100 / point.speedKmh);
    assert.equal(point.fuelL100, null);
  }
  const cruise = computeEngineTelemetry(DRIVE_TOUR_EXAMPLE.cruiseRpm, DRIVE_TOUR_EXAMPLE.cruiseLoad);
  assert.equal(cruise.fuelL100Instant, cruise.fuelL100);
  assert.equal(computeEngineTelemetry(ENGINE_SPECS.idleRpm, 0).fuelL100Instant, null);
  assert.equal(computeEngineTelemetry(3000, 0).fuelL100Instant, 0);
  const coast = computeEngineTelemetry(6500, 0.03);
  near(coast.fuelL100Instant, coast.fuelLph * 100 / coast.speedKmh);
  assert.equal(coast.fuelL100, null);
});

test('Die Gangwahlanzeige steht direkt nach dem Gaspedal und vor den Voreinstellungen', () => {
  const selector = html.match(/id="ce-load-slider"[^>]*>\s*<div\b[^>]*id="ce-gear-selector"[^>]*>([\s\S]*?)<\/div>\s*<p\b[^>]*id="ce-gear-info"[^>]*>[^<]*<\/p>\s*<div class="ce-preset-row">/);
  assert.ok(selector);
  const positions = [...selector[1].matchAll(/<span data-gear="(\d)"[^>]*>([^<]+)<\/span>/g)];
  assert.deepEqual(positions.map(([, gear, label]) => [gear, label]),
    ['N', '1', '2', '3', '4', '5', '6'].map((label, gear) => [String(gear), label]));
  assert.match(html, /Das Pedal öffnet die Drosselklappe und stellt hier zugleich die Motorlast ein\./);
  assert.match(selector[1], /data-gear="5" class="active" aria-current="true"/);
});

test('Die Referenzfahrt startet beim Cruise-Preset, schaltet hoch und erreicht im 6. Gang das Gleichgewicht', () => {
  const frames = demos.equilibrium.frames;
  const start = frames[0];
  const end = frames.at(-1);
  const cruise = computeEngineTelemetry(DRIVE_TOUR_EXAMPLE.cruiseRpm, DRIVE_TOUR_EXAMPLE.cruiseLoad);
  assert.equal(start.rpm, cruise.rpm);
  assert.equal(start.load, cruise.load);
  assert.equal(start.speedKmh, cruise.speedKmh);
  assert.equal(start.gear, cruise.gear);
  assert.equal(start.driveMode, 'cruise');
  assert.equal(frames[1].driveMode, 'accelerate');
  const rampEnd = frames.find(frame => frame.t >= DRIVE_SEQUENCE_EXAMPLE.loadRampS);
  assert.equal(rampEnd.load, 0.75);
  assert.equal(rampEnd.gear, 5);
  assert.ok(rampEnd.powerKw > 1.8 * rampEnd.roadLoadKw);
  assert.ok(demos.pedal.frames.at(-1).speedKmh > start.speedKmh + 3);
  assert.equal(end.gear, 6);
  assert.equal(end.driveMode, 'cruise');
  assert.equal(Math.round(end.speedKmh), 152);
  assert.ok(Math.abs(end.powerKw - end.roadLoadKw) / end.roadLoadKw < 0.03);
  assert.equal(end.t, DRIVE_TOUR_EXAMPLE.durationS);
  const regular = computeDrivetrain(end.rpm, end.load, end.powerKw);
  assert.equal(regular.gear, end.gear);
  assert.equal(regular.driveMode, end.driveMode);
  near(regular.speedKmh, end.speedKmh);

  for (const [index, frame] of frames.entries()) {
    const { t, rpm, speedKmh: speed, gear, load, powerKw, roadLoadKw } = frame;
    assert.ok([t, rpm, speed, gear, load, powerKw, roadLoadKw].every(Number.isFinite));
    assert.ok(rpm <= ENGINE_SPECS.redlineRpm && speed <= DRIVETRAIN_EXAMPLE.maxSpeedKmh);
    near(speed, speedKmh(rpm, gear));
    if (!index) continue;
    const previous = frames[index - 1];
    assert.ok(speed >= previous.speedKmh);
    assert.ok(gear === previous.gear || gear === previous.gear + 1);
    if (gear > previous.gear) {
      assert.ok(speed > speedKmh(DRIVE_SEQUENCE_EXAMPLE.partLoadShiftRpm, previous.gear));
      assert.ok(rpm >= DRIVE_SEQUENCE_EXAMPLE.minShiftRpm);
    }
  }
});

test('Die Kräftebilanz reagiert auf Gaswegnahme und respektiert Drehzahl- und Tempogrenzen', () => {
  const coast = simulateDriveSequence({
    startSpeedKmh: speedKmh(DRIVE_TOUR_EXAMPLE.cruiseRpm, 5), startGear: 5,
    startLoad: DRIVE_TOUR_EXAMPLE.cruiseLoad, targetLoad: 0, durationS: 4, dtS: 0.1
  });
  assert.equal(coast.at(-1).driveMode, 'coast');
  assert.ok(coast.at(-1).speedKmh < coast[0].speedKmh);
  const full = simulateDriveSequence({
    startSpeedKmh: speedKmh(6500, 1), startGear: 1, startLoad: 1, targetLoad: 1, durationS: 120, dtS: 0.1
  });
  const limited = simulateDriveSequence({
    startSpeedKmh: 250, startGear: 6, startLoad: 1, targetLoad: 1, durationS: 1, dtS: 0.1
  });
  assert.equal(limited[0].speedKmh, DRIVETRAIN_EXAMPLE.maxSpeedKmh);
  for (const frame of [...full, ...limited]) {
    assert.ok(frame.rpm <= ENGINE_SPECS.redlineRpm && frame.speedKmh <= DRIVETRAIN_EXAMPLE.maxSpeedKmh);
  }
});

test('Volllast beschleunigt in Gang eins und zwei und erreicht die Höchstgeschwindigkeit im fünften Gang', () => {
  const frames = simulateDriveSequence({
    startSpeedKmh: 20, startGear: 1, startLoad: 1, targetLoad: 1, durationS: 600, dtS: 0.1
  });
  assert.equal(frames[0].driveMode, 'accelerate');
  assert.equal(frames.find(frame => frame.gear === 2)?.driveMode, 'accelerate');
  const end = frames.at(-1);
  assert.equal(end.gear, 5);
  assert.equal(end.driveMode, 'cruise');
  assert.ok(end.speedKmh >= 200 && end.speedKmh <= 220);
  assert.ok(Math.abs(end.powerKw - end.roadLoadKw) < 0.01);
});

test('Bei 130 km/h sinken Drehzahl, BSFC und Streckenverbrauch mit höherem Gang', () => {
  const points = [3, 4, 5, 6].map(gear => constantSpeedPoint(130, gear));
  assert.deepEqual(demos.gearing.frames, points);
  for (const [i, point] of points.entries()) {
    assert.ok(point.load > 0 && point.load <= 1);
    near(point.powerKw, point.roadLoadKw);
    near(point.speedKmh, speedKmh(point.rpm, point.gear));
    if (!i) continue;
    const previous = points[i - 1];
    assert.ok(point.rpm < previous.rpm && point.load > previous.load);
    assert.ok(point.bsfc < previous.bsfc && point.fuelL100 < previous.fuelL100);
  }
  assert.ok(speedKmh(ENGINE_SPECS.redlineRpm, 1) < 70);
  assert.equal(constantSpeedPoint(130, 1), null);
});

test('Die Otto-Tour hat elf Schritte und die Fahrbeispiele beziehen ihre Zahlen aus dem Modell', () => {
  assert.deepEqual(ENGINE_TOUR_STEPS.map(step => step.step), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  assert.ok(ENGINE_TOUR_STEPS.every(step => step.viewMode !== 'exploded' && !/Explosionsansicht/.test(step.title)));
  assert.deepEqual(ENGINE_TOUR_STEPS.filter(step => step.demo).map(step => step.title), [
    'Gas geben: Drosselklappe auf', 'Fahrwiderstand und Gleichgewicht', 'Warum ein Getriebe?', 'Die Muschelkurve lesen'
  ]);
  const ramp = demos.pedal.frames.find(frame => frame.t >= DRIVE_SEQUENCE_EXAMPLE.loadRampS);
  assert.ok(demos.pedal.body.includes(`${whole.format(ramp.load * fullTorqueNm(ramp.rpm))} Nm`));
  const end = demos.equilibrium.frames.at(-1);
  assert.ok(demos.equilibrium.body.includes(`${whole.format(end.speedKmh)} km/h im ${end.gear}. Gang`));
  assert.ok(demos.equilibrium.body.includes(`${decimal.format(end.roadLoadKw)} kW`));
  assert.ok(demos.gearing.body.includes(`${whole.format(speedKmh(ENGINE_SPECS.redlineRpm, 1))} km/h`));
  for (const point of [demos.gearing.frames[0], demos.gearing.frames.at(-1)]) {
    assert.ok(demos.gearing.body.includes(`${decimal.format(point.fuelL100)} l/100km`));
  }
  const { optimum } = computeBsfcContours();
  assert.equal(demos.map.frames[0].rpm, optimum.rpm);
  assert.equal(demos.map.frames[0].load, optimum.load);
  assert.equal(demos.map.frames[2], end);
  for (const frame of demos.map.frames) {
    const point = computeEngineTelemetry(frame.rpm, frame.load, frame);
    for (const value of [
      `${whole.format(point.bsfc)} g/kWh`, `η ${decimal.format(point.thermalEff * 100)} %`,
      `${decimal.format(point.powerKW)} kW`, `${decimal.format(point.fuelL100Instant)} l/100km`
    ]) {
      assert.ok(demos.map.body.includes(value), value);
    }
    if (frame.gear && frame.load >= 0.03) {
      near(point.fuelL100Instant, point.bsfc * point.powerKW / DRIVETRAIN_EXAMPLE.fuelDensityGL * 100 / frame.speedKmh);
    }
  }
});

test('Der Betriebspunkt bei 50 km/h braucht am wenigsten Kraftstoff pro Strecke und hat den niedrigsten Wirkungsgrad', () => {
  const [optimum, lowSpeed, end] = demos.map.frames.map(frame => computeEngineTelemetry(frame.rpm, frame.load, frame));
  assert.equal(lowSpeed.speedKmh, 50);
  assert.equal(lowSpeed.driveMode, 'cruise');
  assert.ok(lowSpeed.load < 0.2);
  assert.ok(optimum.load >= 0.75);
  for (const other of [optimum, end]) {
    assert.ok(lowSpeed.bsfc > other.bsfc && lowSpeed.thermalEff < other.thermalEff);
    assert.ok(lowSpeed.powerKW < other.powerKW && lowSpeed.fuelL100Instant < other.fuelL100Instant);
  }
  assert.ok(optimum.bsfc < end.bsfc && optimum.thermalEff > end.thermalEff);
});

// Kleines DOM mit Ereignissen und einer steuerbaren Render-Uhr für die echte ce-main.js.
function explainerUI() {
  let now = 0;
  let pendingFrame;
  let activeElement;
  class Element {
    constructor(attributes = {}) {
      this.attributes = attributes;
      this.id = attributes.id;
      this.value = attributes.value;
      this.step = attributes.step;
      this.disabled = 'disabled' in attributes;
      this.dataset = {};
      for (const [key, value] of Object.entries(attributes)) {
        if (key.startsWith('data-')) {
          const name = key.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
          this.dataset[name] = value;
        }
      }
      const classes = new Set((attributes.class ?? '').split(' '));
      this.classList = {
        add: name => classes.add(name),
        remove: name => classes.delete(name),
        contains: name => classes.has(name),
        toggle: (name, enabled = !classes.has(name)) => enabled ? classes.add(name) : classes.delete(name)
      };
      this.events = {};
      this.children = [];
      this.style = { setProperty() {} };
    }
    addEventListener(type, listener) { this.events[type] = listener; }
    emit(type, event = {}) { this.events[type]?.({ target: this, ...event }); }
    appendChild(child) { this.children.push(child); }
    setAttribute(name, value) { this.attributes[name] = value; }
    removeAttribute(name) { delete this.attributes[name]; }
    getAttribute(name) { return this.attributes[name]; }
    focus() { activeElement = this; }
    contains(element) { return this.children.includes(element); }
    setPointerCapture(id) { this.capturedPointer = id; }
    hasPointerCapture(id) { return this.capturedPointer === id; }
    getScreenCTM() { return { inverse: () => null }; }
    get innerHTML() { return this.markup; }
    set innerHTML(markup) {
      this.markup = markup;
      this.children = elements(markup);
    }
    querySelectorAll(selector) { return this.children.filter(el => matches(el, selector)); }
    querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; }
  }
  function elements(markup) {
    return [...markup.matchAll(/<[a-z][\w-]*\b([^>]+)>/g)].map(([, source]) => {
      const attributes = Object.fromEntries([...source.matchAll(/([\w-]+)="([^"]*)"/g)]
        .map(([, name, value]) => [name, value]));
      if (/\bdisabled\b/.test(source)) attributes.disabled = '';
      return new Element(attributes);
    });
  }
  function matches(el, selector) {
    if (selector.startsWith('#')) return el.id === selector.slice(1);
    if (selector.startsWith('.')) return el.classList.contains(selector.slice(1));
    const [, name, value] = selector.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);
    return name in el.attributes && (value === undefined || value === el.attributes[name]);
  }
  const page = new Element();
  page.innerHTML = html;
  const document = {
    documentElement: new Element(),
    get activeElement() { return activeElement; },
    querySelectorAll: selector => page.querySelectorAll(selector),
    getElementById: id => page.querySelector(`#${id}`) ??
      page.children.find(el => el.querySelector(`#${id}`))?.querySelector(`#${id}`),
    createElement: () => new Element()
  };
  const byId = id => document.getElementById(id);
  const positions = page.querySelectorAll('[data-gear]');
  byId('ce-gear-selector').children = positions;
  const window = new Element();

  class Vector {
    constructor(x, y, z) { this.set(x, y, z); }
    set(x, y, z) { Object.assign(this, { x, y, z }); }
    copy({ x, y, z }) { this.set(x, y, z); }
    clone() { return new Vector(this.x, this.y, this.z); }
    lerpVectors(start, end, t) {
      this.set(...['x', 'y', 'z'].map(axis => start[axis] + (end[axis] - start[axis]) * t));
    }
  }
  class SceneNode {
    position = new Vector();
    shadow = { mapSize: new Vector(), camera: {} };
    shadowMap = {};
    add() {}
    updateProjectionMatrix() {}
    setPixelRatio() {}
    setSize() {}
    render() {}
    fromScene() { return {}; }
  }
  class Controls extends Element {
    target = new Vector();
    update() {}
  }
  class Observer { observe() {} }
  const THREE = {
    WebGLRenderer: SceneNode, Scene: SceneNode, PMREMGenerator: SceneNode, PerspectiveCamera: SceneNode,
    HemisphereLight: SceneNode, DirectionalLight: SceneNode, Color: SceneNode, Fog: SceneNode,
    Raycaster: SceneNode, Vector2: Vector, Vector3: Vector,
    MathUtils: { clamp: (value, min, max) => Math.max(min, Math.min(max, value)) }
  };
  runInNewContext(read('../ce-main.js').replace(/^import [\s\S]*?;\n/gm, ''), {
    createEngineRenderer: () => ({ render() {}, resize() {} }),
    ...engine, document, window, THREE, OrbitControls: Controls, RoomEnvironment: SceneNode,
    MutationObserver: Observer, ResizeObserver: Observer,
    DOMPoint: class extends Vector { matrixTransform() { return this; } },
    createCombustionEngineModel: () => ({
      root: new SceneNode(), applyTheme() {}, setFlowVisible() {}, setSelectedPart() {}, setViewMode() {},
      update: () => ({ strokes: [0, 1, 2, 3].map(i => engine.getCylinderStroke(0, i)) })
    }),
    performance: { now: () => now },
    requestAnimationFrame: callback => {
      assert.equal(pendingFrame, undefined, 'Die Tour nutzt ausschließlich den bestehenden Render-Loop');
      pendingFrame = callback;
    }
  });

  return {
    window, byId, positions,
    preset: rpm => page.querySelectorAll('.ce-preset-btn').find(el => el.dataset.rpm === String(rpm)),
    view: mode => page.querySelector(`[data-view-mode="${mode}"]`),
    scale: scale => page.querySelector(`[data-scale="${scale}"]`),
    dot: step => byId('ce-tour-card').querySelector(`[data-tour-goto="${step - 1}"]`),
    advance(ms) {
      now += ms;
      const callback = pendingFrame;
      pendingFrame = undefined;
      callback(now);
    }
  };
}

test('Die Muschelkurve beschriftet das Modelloptimum und zeichnet die Fahrwiderstandslinien im fahrbaren Bereich', () => {
  const svg = explainerUI().byId('ce-bsfc-map').innerHTML;
  assert.match(svg, new RegExp(`>Optimum ${Math.round(computeBsfcContours([]).optimum.bsfc)}<`));
  const roads = [...svg.matchAll(/data-road-gear="(\d)">\s*<path d="([^"]+)"/g)];
  assert.deepEqual(roads.map(([, gear]) => Number(gear)), [4, 5, 6]);
  const rpmAtX = x => ENGINE_SPECS.idleRpm + (Number(x) - 34) / 254 * (ENGINE_SPECS.maxRpm - ENGINE_SPECS.idleRpm);
  for (const [, gear, path] of roads) {
    const points = [...path.matchAll(/[ML]([\d.]+),([\d.]+)/g)];
    assert.ok(points.length > 1);
    for (const [, x, y] of points) {
      const rpm = rpmAtX(x);
      const torqueNm = (172 - Number(y)) / 150 * 250;
      assert.ok(Math.abs(roadLoadTorqueNm(rpm, Number(gear)) - torqueNm) < 0.05);
      assert.ok(torqueNm <= fullTorqueNm(rpm) + 0.05);
      assert.ok(rpm <= ENGINE_SPECS.redlineRpm + 0.2);
    }
    const firstRpm = rpmAtX(points[0][1]);
    assert.ok(firstRpm === ENGINE_SPECS.idleRpm ||
      Math.abs(roadLoadTorqueNm(firstRpm, Number(gear)) - fullTorqueNm(firstRpm)) < 0.05);
  }
});

test('Regler und Voreinstellungen setzen Gangmarkierung, Übersetzung und Verbrauchstexte', () => {
  const { byId, positions, preset } = explainerUI();
  for (const [rpm, gear, gearInfo, fuel, fuelNote] of [
    [2400, 5, '5. Gang · i = 0,85 · Achse 3,2 · Konstantfahrt', '6,7 l/100km', '7,1 l/h'],
    [800, 0, 'N · Stillstand', '0,9 l/h', 'Leerlauf'],
    [4250, 1, '1. Gang · i = 4,04 · Achse 3,2 · beschleunigt', '77,6 l/100km', 'momentan, beschleunigt · 30,8 l/h'],
    [5950, 1, '1. Gang · i = 4,04 · Achse 3,2 · beschleunigt', '77,4 l/100km', 'momentan, beschleunigt · 43,0 l/h']
  ]) {
    preset(rpm).emit('click');
    assert.equal(byId('ce-gear-info').textContent, gearInfo);
    assert.equal(byId('ce-tel-fuel').textContent, fuel);
    assert.equal(byId('ce-tel-fuel-note').textContent, fuelNote);
    for (const [index, position] of positions.entries()) {
      assert.equal(position.classList.contains('active'), index === gear);
      assert.equal(position.getAttribute('aria-current'), index === gear ? 'true' : undefined);
    }
    positions[6].emit('click');
    assert.equal(byId('ce-gear-info').textContent, gearInfo);
  }
  const rpm = byId('ce-rpm-slider');
  rpm.value = '3000';
  rpm.emit('input');
  const load = byId('ce-load-slider');
  load.value = '0';
  load.emit('input');
  assert.equal(byId('ce-tel-fuel').textContent, '0,0 l/100km');
  assert.equal(byId('ce-tel-fuel-note').textContent, 'momentan, Schub · 0,0 l/h');
});

test('Die Tour wechselt die Live-Daten und gibt bei Reglern, Kennfeld, Navigation und Beenden die Kontrolle zurück', () => {
  const { byId, dot, preset, view, scale, window, advance } = explainerUI();
  preset(4250).emit('click');
  view('normal').emit('click');
  scale(0.38).emit('click');
  const rpm = byId('ce-rpm-slider');
  const load = byId('ce-load-slider');
  const marker = byId('ce-map-marker');
  const tour = byId('ce-btn-tour');
  const checkRestored = () => {
    advance(10000);
    assert.ok(byId('ce-tour-card').classList.contains('hidden'));
    assert.equal(rpm.value, '4250');
    assert.equal(load.value, '100');
    assert.ok(view('normal').classList.contains('active'));
    assert.ok(scale(0.38).classList.contains('active'));
    assert.equal(byId('ce-tel-gear').textContent, '1. Gang');
  };

  const demoStep = id => ENGINE_TOUR_STEPS.find(step => step.demo === id).step;
  tour.emit('click');
  dot(demoStep('pedal')).emit('click');
  const startMarker = marker.getAttribute('transform');
  advance(1200);
  assert.equal(load.value, '75');
  assert.equal(byId('ce-tel-gear').textContent, '5. Gang');
  assert.equal(byId('ce-tel-gear-note').textContent, 'beschleunigt');
  assert.notEqual(marker.getAttribute('transform'), startMarker);
  rpm.emit('pointerdown');
  rpm.value = '2800';
  rpm.emit('input');
  advance(9000);
  assert.equal(rpm.value, '2800');
  assert.equal(byId('ce-tel-gear').textContent, computeEngineTelemetry(2800, 0.75).gearLabel);

  byId('ce-tour-next').emit('click');
  assert.equal(byId('ce-tel-gear').textContent, '5. Gang');
  advance(2400);
  assert.equal(byId('ce-tel-gear').textContent, '6. Gang');
  advance(6800);
  assert.equal(byId('ce-tel-gear-note').textContent, 'Konstantfahrt');
  assert.ok(byId('ce-tour-live').textContent.startsWith(`${whole.format(demos.equilibrium.frames.at(-1).speedKmh)} km/h`));
  byId('ce-tour-prev').emit('click');
  assert.equal(load.value, '38');

  dot(demoStep('gearing')).emit('click');
  assert.equal(byId('ce-tel-gear').textContent, '3. Gang');
  advance(2100);
  assert.equal(byId('ce-tel-gear').textContent, '4. Gang');
  load.emit('keydown', { key: 'End' });
  load.value = '100';
  load.emit('input');
  advance(8000);
  assert.equal(load.value, '100');

  dot(demoStep('map')).emit('click');
  advance(2200);
  assert.equal(byId('ce-tel-speed').textContent, '50 km/h');
  byId('ce-bsfc-map').emit('pointerdown', { isPrimary: true, button: 0, pointerId: 1, clientX: 90, clientY: 130 });
  const manualRpm = rpm.value;
  advance(10000);
  assert.equal(rpm.value, manualRpm);
  assert.notEqual(byId('ce-tel-speed').textContent, '50 km/h');
  dot(demoStep('equilibrium')).emit('click');
  preset(800).emit('click');
  advance(10000);
  assert.equal(byId('ce-tel-gear').textContent, 'N');
  dot(demoStep('equilibrium')).emit('click');
  byId('ce-mobile-panel-toggle').emit('click');
  window.emit('keydown', { key: 'Escape' });
  assert.ok(!byId('ce-side-panel').classList.contains('mobile-open'));
  checkRestored();

  for (const [step, closeId] of [[demoStep('equilibrium'), 'ce-tour-end'], [demoStep('map'), 'ce-tour-next']]) {
    tour.emit('click');
    dot(step).emit('click');
    byId(closeId).emit('click');
    checkRestored();
  }
});

test('v0.5.2 ist als Patch vor den bisherigen Releases eingetragen', () => {
  const [patch52, patch51, flow, patch41, latest, patch31, feature, previous] = releaseCatalog.releases.filter(entry => entry.app === 'combustion_engine');
  assert.deepEqual([patch52.version, patch52.type, patch52.date, patch52.author, patch52.model, patch52.banner],
    ['0.5.2', 'patch', '2026-11-27', 'Michi', 'Astra 6.2', false]);
  assert.ok(patch52.highlights.length >= 1 && patch52.highlights.length <= 3);
  assert.deepEqual([patch51.version, patch51.type, patch51.date, patch51.author, patch51.model],
    ['0.5.1', 'patch', '2026-11-27', 'Michi', 'Astra 6.2']);
  assert.ok(patch51.highlights.length >= 1 && patch51.highlights.length <= 3);
  assert.deepEqual([flow.version, flow.type, flow.date, flow.author, flow.model], ['0.5.0', 'feature', '2026-11-27', 'Michi', 'Astra 6.2']);
  assert.notEqual(flow.banner, false);
  assert.ok(flow.highlights.length >= 3 && flow.highlights.length <= 5);
  assert.equal(patch41.version, '0.4.1');
  assert.equal(patch41.date, '2026-11-27');
  assert.equal(patch41.type, 'patch');
  assert.equal(patch41.author, 'Joe');
  assert.equal(patch41.model, 'Neon');
  assert.ok(patch41.highlights.length >= 1 && patch41.highlights.length <= 3);
  assert.equal(latest.version, '0.4.0');
  assert.equal(latest.date, '2026-11-27');
  assert.equal(latest.type, 'feature');
  assert.equal(latest.author, 'Joe');
  assert.equal(latest.model, 'Neon');
  assert.ok(latest.highlights.length >= 3 && latest.highlights.length <= 5);
  assert.doesNotMatch([patch52.title, ...patch52.highlights, patch51.title, ...patch51.highlights, flow.title, ...flow.highlights, patch41.title, ...patch41.highlights, latest.title, latest.author, latest.model, ...latest.highlights].join(' '),
    /\b(?:codex|cursor|antigravity|cli|gta(?:-?2)?|easter|motorschaden|explodier|überdreh)\b/i);
  assert.match(html, /id="ce-version-btn"[^>]*>v0\.5\.2</);

  assert.equal(patch31.version, '0.3.1');
  assert.equal(patch31.date, '2026-11-27');
  assert.equal(patch31.type, 'patch');
  assert.equal(patch31.author, 'Michi');
  assert.equal(patch31.model, 'Sol 6.2');
  assert.ok(patch31.highlights.length >= 2 && patch31.highlights.length <= 3);
  assert.deepEqual(feature, {
    app: 'combustion_engine', version: '0.3.0', date: '2026-11-27', type: 'feature', title: 'Getriebe und Tour zur Fahrlogik',
    author: 'Michi', model: 'Sol 6.2',
    highlights: [
      'Die Gangwahlanzeige unter dem Gaspedal zeigt den aktiven Gang und seine Übersetzung.',
      'Der Momentanverbrauch erscheint auch beim Beschleunigen und im Schub in l/100km.',
      'Die Tour zeigt live, wie sich Gaspedal, Fahrwiderstand und Hochschalten auf die Fahrt auswirken.',
      'Vergleiche verschiedene Gänge bei gleichem Tempo und lerne, die Muschelkurve zu lesen.'
    ]
  });
  assert.equal(previous.version, '0.2.0');
  assert.deepEqual(previous.highlights, [
    'Mit dem Gaspedal stellst du die Motorlast ein.',
    'Ein Beispielkennfeld liefert Wirkungsgrad und spezifischen Verbrauch für den gewählten Betriebspunkt.',
    'Drehzahl und Gaspedal bestimmen Gang, Geschwindigkeit und Verbrauch eines Beispielautos.',
    'In der interaktiven Muschelkurve siehst und verschiebst du den aktuellen Betriebspunkt.',
    'Die Voreinstellungen setzen Drehzahl und Last gemeinsam.'
  ]);
});
