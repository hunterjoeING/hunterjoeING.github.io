import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import * as engine from '../ce-data.js';

const {
  ENGINE_LAYOUTS,
  ENGINE_CONCEPTS,
  buildEngineProfile,
  computeBsfcContours,
  computeDriveTourDemos,
  computeEngineTelemetry,
  getCylinderStroke,
  getEnginePartsForProfile,
  getTourStepsForProfile
} = engine;

const mod360 = deg => ((deg % 360) + 360) % 360;
const mod720 = deg => ((deg % 720) + 720) % 720;

test('Alle vier Bauformen erfüllen exakte Kurbelwellen-Phasenmathematik und gleichmäßige Zündabstände', () => {
  for (const layout of Object.values(ENGINE_LAYOUTS)) {
    const { cylinders, cylinderSpecs } = layout;
    assert.equal(cylinderSpecs.length, cylinders);

    // 1) Hubzapfen-Beziehung: (pinAngle - bankAngle) ≡ phaseDeg (mod 360)
    for (const c of cylinderSpecs) {
      assert.equal(
        mod360(c.crankPinAngleDeg - c.bankAngleDeg),
        mod360(c.phaseDeg),
        `${layout.id} Zyl ${c.number}: Hubzapfenwinkel passt nicht zu Bank- & Phasenwinkel`
      );
    }

    // 2) Gleichmäßiger Zündabstand über 720° (720 / Zylinderzahl)
    const fireAngles = cylinderSpecs
      .map(c => mod720(360 - c.phaseDeg))
      .sort((a, b) => a - b);
    const expectedStep = 720 / cylinders;
    for (let i = 1; i < fireAngles.length; i++) {
      assert.equal(fireAngles[i] - fireAngles[i - 1], expectedStep, `${layout.id} Zündabstand`);
    }
  }
});

test('Boxer-4 zeigt echte gegenläufige Box-Bewegung mit getrennten 180°-Hubzapfen', () => {
  const [c1, c2, c3, c4] = ENGINE_LAYOUTS.boxer4.cylinderSpecs;
  // Gegenüberliegende Bänke (-90° vs +90°)
  assert.equal(c1.bankAngleDeg, -90);
  assert.equal(c2.bankAngleDeg, 90);
  // Getrennte, um 180° versetzte Hubzapfen
  assert.equal(mod360(c1.crankPinAngleDeg - c2.crankPinAngleDeg), 180);
  assert.equal(mod360(c3.crankPinAngleDeg - c4.crankPinAngleDeg), 180);
  // Beide Kolben eines Paares erreichen OT exakt gleichzeitig!
  assert.equal(mod360(c1.crankPinAngleDeg - c1.bankAngleDeg), mod360(c2.crankPinAngleDeg - c2.bankAngleDeg));
  assert.equal(mod360(c3.crankPinAngleDeg - c3.bankAngleDeg), mod360(c4.crankPinAngleDeg - c4.bankAngleDeg));
});

test('V8 nutzt vier gemeinsame 90°-Crossplane-Hubzapfen je Zylinderpaar', () => {
  const specs = ENGINE_LAYOUTS.v8.cylinderSpecs;
  const pairPins = [];
  for (let p = 0; p < 4; p++) {
    assert.equal(specs[p * 2].crankPinAngleDeg, specs[p * 2 + 1].crankPinAngleDeg);
    pairPins.push(specs[p * 2].crankPinAngleDeg);
  }
  assert.deepEqual([...pairPins].sort((a, b) => a - b), [45, 135, 225, 315]);
});

test('Turbodiesel liefert Ladedruck, Direkteinspritzung, mehr Drehmoment und besseres BSFC-Optimum als Otto-Sauger', () => {
  const r4Otto = buildEngineProfile('r4', 'otto');
  const r4Diesel = buildEngineProfile('r4', 'diesel');

  assert.equal(r4Diesel.concept.hasTurbo, true);
  assert.equal(r4Diesel.concept.directInjection, true);
  assert.equal(r4Diesel.specs.redlineRpm, 4500);
  assert.ok(r4Diesel.specs.maxTorqueNm > r4Otto.specs.maxTorqueNm * 1.7);
  assert.ok(r4Diesel.specs.maxPowerKW > r4Otto.specs.maxPowerKW);

  const dieselFull = computeEngineTelemetry(2200, 1, undefined, r4Diesel);
  const ottoFull = computeEngineTelemetry(2200, 1, undefined, r4Otto);
  assert.ok(dieselFull.boostBar > 1.3 && dieselFull.boostBar < 1.9);
  assert.equal(ottoFull.boostBar, 0);
  assert.equal(computeEngineTelemetry(100, 1, undefined, r4Diesel).boostBar, 0);

  const dieselOpt = computeBsfcContours(undefined, r4Diesel).optimum;
  const ottoOpt = computeBsfcContours(undefined, r4Otto).optimum;
  assert.ok(dieselOpt.bsfc >= 185 && dieselOpt.bsfc <= 212, `Diesel Optimum: ${dieselOpt.bsfc}`);
  assert.ok(dieselOpt.bsfc < ottoOpt.bsfc - 30);

  // Diesel hat Direkteinspritzung statt Zündfunke bei OT
  const strokeDiesel = getCylinderStroke(355, 0, r4Diesel);
  assert.equal(strokeDiesel.sparkIntensity, 0);
  assert.ok(strokeDiesel.injectionIntensity > 0.5);
  const strokeOtto = getCylinderStroke(342, 0, r4Otto);
  assert.ok(strokeOtto.sparkIntensity > 0.5);
  assert.equal(strokeOtto.injectionIntensity, 0);
});

test('Alle 8 Motorkombinationen erzeugen gültige Konturen, Tour-Beispiele und Baugruppen-Metadaten', () => {
  for (const layoutId of Object.keys(ENGINE_LAYOUTS)) {
    for (const conceptId of Object.keys(ENGINE_CONCEPTS)) {
      const profile = buildEngineProfile(layoutId, conceptId);
      const { contours, optimum } = computeBsfcContours(undefined, profile);
      assert.ok(Number.isFinite(optimum.bsfc) && optimum.bsfc > 170 && optimum.bsfc < 260, profile.key);
      assert.equal(contours.length, 6, profile.key);
      assert.ok(contours.every(c => c.polylines.length > 0), profile.key);

      const demos = computeDriveTourDemos(optimum, profile);
      assert.ok(demos.pedal.frames.length > 2, profile.key);
      assert.ok(demos.equilibrium.frames.length > 10, profile.key);
      assert.ok(demos.gearing.frames.length >= 2, profile.key);
      assert.equal(demos.map.frames.length, 3, profile.key);

      const parts = getEnginePartsForProfile(profile);
      assert.equal(parts.length, conceptId === 'diesel' ? 17 : 13);
      const steps = getTourStepsForProfile(profile);
      assert.equal(steps.length, conceptId === 'diesel' ? 16 : 11);

      // Zündungen/Sek. skalieren mit Zylinderzahl
      const tel = computeEngineTelemetry(2400, 0.5, undefined, profile);
      assert.equal(tel.ignitionsPerSec, (2400 / 60) * (profile.specs.cylinders / 2));
    }
  }
});

test('UI schaltet auf Turbodiesel, Boxer/V6/V8 um und steuert das Explosions-Easter-Egg samt Reparatur', () => {
  const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
  const html = read('../index.html');

  let now = 0;
  let pendingFrame;
  let activeElement;
  let currentProfile = engine.DEFAULT_PROFILE;
  let explosionState = { phase: 'idle', rpm: 2400, peakBlowRpm: 10500, quip: 'Pleuel #2 hat den Chat verlassen.' };
  let triggerCount = 0;
  let resetCount = 0;

  class Element {
    constructor(attributes = {}) {
      this.attributes = attributes;
      this.id = attributes.id;
      this.value = attributes.value;
      this.step = attributes.step;
      this.disabled = 'disabled' in attributes;
      this.hidden = 'hidden' in attributes;
      this.dataset = {};
      for (const [key, value] of Object.entries(attributes)) {
        if (key.startsWith('data-')) {
          const name = key.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
          this.dataset[name] = value;
        }
      }
      const classes = new Set((attributes.class ?? '').split(' ').filter(Boolean));
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
    emit(type, event = {}) { this.events[type]?.({ target: this, stopPropagation() {}, ...event }); }
    appendChild(child) { this.children.push(child); }
    setAttribute(name, value) { this.attributes[name] = value; }
    removeAttribute(name) { delete this.attributes[name]; }
    getAttribute(name) { return this.attributes[name]; }
    focus() { activeElement = this; }
    contains(element) { return this.children.includes(element); }
    setPointerCapture(id) { this.capturedPointer = id; }
    hasPointerCapture(id) { return this.capturedPointer === id; }
    getScreenCTM() { return { inverse: () => null }; }
    getBoundingClientRect() { return { left: 0, width: 320 }; }
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
      if (/\bhidden\b/.test(source)) attributes.hidden = '';
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
  byId('ce-gear-selector').children = page.querySelectorAll('[data-gear]');
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

  let mockBlowNext = false;
  runInNewContext(read('../ce-main.js').replace(/^import [\s\S]*?;\n/gm, ''), {
    createEngineRenderer: () => ({ render() {}, resize() {} }),
    ...engine, document, window, THREE, OrbitControls: Controls, RoomEnvironment: SceneNode,
    MutationObserver: Observer, ResizeObserver: Observer,
    DOMPoint: class extends Vector { matrixTransform() { return this; } },
    createCombustionEngineModel: () => ({
      root: new SceneNode(),
      applyTheme() {},
      setSelectedPart() {},
      setViewMode() {},
      setProfile(p) { currentProfile = p; },
      triggerExplosion(rpm) {
        triggerCount++;
        explosionState = { phase: 'overrev', rpm: Math.max(rpm, 5000), peakBlowRpm: 7300, quip: 'Test-Quip', justBlown: false };
      },
      resetExplosion() {
        resetCount++;
        explosionState = { phase: 'idle', rpm: null, justBlown: false };
      },
      update: () => {
        const exp = { ...explosionState };
        if (mockBlowNext) {
          mockBlowNext = false;
          explosionState.phase = 'blown';
          exp.phase = 'blown';
          exp.justBlown = true;
        }
        return {
          strokes: currentProfile.layout.cylinderSpecs.map((_, i) => engine.getCylinderStroke(0, i, currentProfile)),
          explosion: exp
        };
      }
    }),
    performance: { now: () => now },
    requestAnimationFrame: cb => { pendingFrame = cb; }
  });

  const advance = ms => {
    now += ms;
    const cb = pendingFrame;
    pendingFrame = undefined;
    cb(now);
  };

  // Standard: Otto -> Boost-Kachel versteckt
  assert.equal(byId('ce-metric-boost').hidden, true);

  const slider = byId('ce-rpm-slider');
  const idlePreset = page.querySelectorAll('.ce-preset-btn')[0];
  for (const [concept, idleSpeeds] of [['otto', [800, 750, 700, 650]], ['diesel', [750, 750, 700, 600]]]) {
    page.querySelector(`[data-concept="${concept}"]`).emit('click');
    for (const [i, layout] of ['r4', 'boxer4', 'v6', 'v8'].entries()) {
      page.querySelector(`[data-layout="${layout}"]`).emit('click');
      const idle = idleSpeeds[i];
      assert.equal(currentProfile.specs.idleRpm, idle);
      assert.ok(idle >= 600 && idle <= 800);
      assert.equal(Number(slider.getAttribute('min')), idle);
      assert.equal(Number(idlePreset.dataset.rpm), idle);
      idlePreset.emit('click');
      for (const input of ['0', String(idle - 50)]) {
        slider.value = input;
        slider.emit('input');
        assert.equal(Number(slider.value), idle);
        assert.equal(byId('ce-rpm-val').textContent, idle + ' U/min');
        assert.equal(byId('ce-status-badge').dataset.status, 'idle');
      }
      const leftEdge = { clientX: -20, clientY: 172, isPrimary: true, button: 0, pointerId: 1 };
      for (const id of ['ce-dyno-chart', 'ce-bsfc-map']) {
        slider.value = '2400';
        slider.emit('input');
        byId(id).emit('pointerdown', leftEdge);
        assert.equal(Number(slider.value), idle);
      }
      const point = computeEngineTelemetry(-1, 0, undefined, currentProfile);
      assert.equal(point.rpm, idle);
      assert.ok(point.ignitionsPerSec > 0 && point.fuelLph > 0);
    }
  }
  // Keep an ordinary operating point, clamping only when a new limit requires it.
  slider.value = '650';
  slider.emit('input');
  page.querySelector('[data-layout="r4"]').emit('click');
  assert.equal(slider.value, '750');
  slider.value = '3000';
  slider.emit('input');
  page.querySelector('[data-concept="otto"]').emit('click');
  assert.equal(slider.value, '3000');

  // Wechsel auf Turbodiesel
  page.querySelector('[data-concept="diesel"]').emit('click');
  assert.equal(currentProfile.concept.id, 'diesel');
  assert.equal(byId('ce-metric-boost').hidden, false);
  assert.equal(byId('ce-rpm-slider').getAttribute('max'), '5000');
  assert.match(byId('ce-tel-boost').textContent, /bar$/);

  // Wechsel auf Boxer & V8
  page.querySelector('[data-layout="boxer4"]').emit('click');
  assert.equal(currentProfile.layout.id, 'boxer4');
  assert.match(byId('ce-cyl-title').textContent, /1 – 3 – 2 – 4/);

  page.querySelector('[data-layout="v8"]').emit('click');
  assert.equal(currentProfile.layout.id, 'v8');
  assert.equal(byId('ce-cyl-grid').getAttribute('data-cyls'), '8');
  assert.equal(byId('ce-cyl-grid').querySelectorAll('.ce-cyl-pill').length, 8);

  // Explosions-Easter-Egg auslösen -> Overrev -> Motorschaden -> Reparatur
  page.querySelector('[data-view-mode="exploded"]').emit('click');
  assert.equal(triggerCount, 1);
  assert.equal(byId('ce-explosion-banner').classList.contains('hidden'), false);
  advance(200);
  mockBlowNext = true;
  advance(200);
  assert.equal(byId('ce-status-badge').textContent, 'MOTORSCHADEN!');
  assert.match(byId('ce-explosion-banner').innerHTML, /Neuen Motor einbauen/);

  byId('ce-btn-repair').emit('click');
  assert.equal(resetCount, 1);
  assert.equal(byId('ce-explosion-banner').classList.contains('hidden'), true);
});
