import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  computeEngineTelemetry,
  DRIVETRAIN_EXAMPLE,
  DRIVE_TOUR_EXAMPLE,
  roadLoadPowerKw,
  roadLoadTorqueNm,
  speedKmh
} from '../ce-data.js';
import releaseCatalog from '../../../shared/releases.js';

function near(actual, expected, tolerance) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `Erwartet ${expected} ± ${tolerance}, erhalten ${actual}`);
}

test('Übersetzungen ergeben die erwarteten Geschwindigkeiten und sind streng monoton', () => {
  near(speedKmh(2400, 1), 22, 0.5);
  near(speedKmh(2400, 5), 106.6, 0.5);
  near(speedKmh(2400, 6), 131, 1);
  assert.equal(speedKmh(2400, 0), 0);
  for (let gear = 1; gear < 6; gear++) {
    assert.ok(speedKmh(2400, gear) < speedKmh(2400, gear + 1));
  }
});

test('Fahrwiderstand am Motor ist als Leistung und als Moment konsistent', () => {
  near(roadLoadPowerKw(106.6 / 3.6), 16.2, 0.5);
  for (let gear = 1; gear <= 6; gear++) {
    const rpm = 2400;
    const torque = roadLoadTorqueNm(rpm, gear);
    near(torque * 2 * Math.PI * rpm / 60000, roadLoadPowerKw(speedKmh(rpm, gear) / 3.6), 1e-9);
  }
});

test('Cruise passt zum fünften Gang und der Verbrauch stimmt mit dem Kennfeld überein', () => {
  const point = computeEngineTelemetry(DRIVE_TOUR_EXAMPLE.cruiseRpm, DRIVE_TOUR_EXAMPLE.cruiseLoad);
  assert.equal(point.gear, 5);
  assert.equal(point.gearLabel, '5. Gang');
  assert.equal(point.driveMode, 'cruise');
  assert.equal(point.driveModeLabel, 'Konstantfahrt');
  near(point.speedKmh, 106.6, 0.5);
  near(point.fuelL100, 6.7, 0.3);
  near(point.fuelLph, 7.1, 0.3);
  near(point.fuelL100, point.bsfc * point.powerKW / (745 * point.speedKmh) * 100, 1e-6);
  near(point.roadLoadKw, roadLoadPowerKw(point.speedKmh / 3.6), 1e-9);
  near(point.torqueNm, roadLoadTorqueNm(point.rpm, 5), 1);
});

test('Hohe Teillast bleibt mit Leistungsreserve im sechsten Gang', () => {
  const point = computeEngineTelemetry(2350, 0.85);
  assert.equal(point.gear, 6);
  assert.equal(point.driveMode, 'cruise');
  near(point.speedKmh, 128, 1);
  const ratio = point.powerKW / point.roadLoadKw;
  assert.ok(ratio > DRIVETRAIN_EXAMPLE.maxCruiseRatio && ratio <= DRIVETRAIN_EXAMPLE.topGearCruiseRatio);
  assert.equal(computeEngineTelemetry(2350, 0.89).driveMode, 'accelerate');
});

test('Leerlauf verbraucht Kraftstoff im Stand, auch bei einer Eingabe unter dem Minimum', () => {
  for (const point of [computeEngineTelemetry(800, 0), computeEngineTelemetry(199, 0)]) {
    assert.equal(point.gear, 0);
    assert.equal(point.gearLabel, 'N');
    assert.equal(point.speedKmh, 0);
    assert.equal(point.driveMode, 'neutral');
    assert.equal(point.driveModeLabel, 'Stillstand');
    assert.equal(point.fuelL100, null);
    assert.equal(point.roadLoadKw, null);
  }
  const idleFuel = computeEngineTelemetry(800, 0).fuelLph;
  assert.ok(idleFuel >= 0.8 && idleFuel <= 1.0);
  assert.equal(computeEngineTelemetry(199, 0).fuelLph, idleFuel);
  assert.equal(computeEngineTelemetry(1199, 0.029).driveMode, 'neutral');
  assert.equal(computeEngineTelemetry(1200, 0.029).driveMode, 'coast');
});

test('Volllast wählt den niedrigsten für das Beschleunigungsbeispiel geeigneten Gang', () => {
  for (const [rpm, speed, fuel] of [[4250, 40, 30.8], [5950, 56, 43.0]]) {
    const point = computeEngineTelemetry(rpm, 1);
    assert.equal(point.driveMode, 'accelerate');
    assert.equal(point.driveModeLabel, 'beschleunigt');
    assert.equal(point.gear, 1);
    near(point.speedKmh, speed, 3);
    near(point.fuelLph, fuel, 0.3);
    assert.equal(point.fuelL100, null);
  }
  const launch = computeEngineTelemetry(350, 1);
  assert.equal(launch.driveMode, 'accelerate');
  assert.equal(launch.rpm, 800);
  assert.ok(launch.speedKmh >= DRIVETRAIN_EXAMPLE.minAccelerationKmh);
  assert.ok(speedKmh(launch.rpm, launch.gear - 1) < DRIVETRAIN_EXAMPLE.minAccelerationKmh);
  const second = computeEngineTelemetry(1700, 1);
  assert.equal(second.driveMode, 'accelerate');
  assert.equal(second.gear, 2);
});

test('Schub wählt den höchsten geeigneten Gang und schaltet Kraftstoff nur unter 3 % ab', () => {
  const cutoff = computeEngineTelemetry(3000, 0);
  assert.equal(cutoff.gear, 6);
  assert.equal(cutoff.driveMode, 'coast');
  assert.equal(cutoff.driveModeLabel, 'Schub');
  assert.equal(cutoff.fuelLph, 0);
  assert.equal(cutoff.fuelL100, null);

  const loaded = computeEngineTelemetry(6500, 0.03);
  assert.equal(loaded.gear, 4);
  assert.equal(loaded.driveMode, 'coast');
  assert.ok(loaded.fuelLph > 0);
  assert.equal(loaded.fuelL100, null);
});

test('Telemetrieraster liefert endliche Werte und bleibt innerhalb der Ganggrenzen', () => {
  const { minCruiseKmh, maxSpeedKmh } = DRIVETRAIN_EXAMPLE;
  for (let rpm = 200; rpm <= 7000; rpm += 50) {
    for (let percent = 3; percent <= 100; percent++) {
      const point = computeEngineTelemetry(rpm, percent / 100);
      const context = `${rpm} U/min, ${percent} % Last`;
      assert.ok(Number.isInteger(point.gear) && point.gear >= 1 && point.gear <= 6, context);
      assert.equal(point.gearLabel, `${point.gear}. Gang`);
      assert.ok(point.driveModeLabel, context);
      assert.ok(Number.isFinite(point.speedKmh) && point.speedKmh <= maxSpeedKmh, context);
      assert.ok(point.speedKmh >= minCruiseKmh || (point.gear === 1 && rpm < 1200), context);
      assert.ok(Number.isFinite(point.fuelLph) && point.fuelLph > 0, context);
      assert.ok(Number.isFinite(point.roadLoadKw) && point.roadLoadKw > 0, context);
      if (point.driveMode === 'cruise') {
        assert.ok(Number.isFinite(point.fuelL100) && point.fuelL100 > 0, context);
      } else {
        assert.equal(point.fuelL100, null, context);
      }
    }
  }
});

test('Version 0.2.0 nennt Gang, Geschwindigkeit und Verbrauch in einem Stichpunkt', () => {
  const release = releaseCatalog.releases.find(({ app, version }) => app === 'combustion_engine' && version === '0.2.0');
  assert.ok(release.highlights.length <= 5);
  assert.ok(release.highlights.some(line => ['Gang', 'Geschwindigkeit', 'Verbrauch'].every(word => line.includes(word))));
});

test('Die drei neuen Kacheln enthalten befüllte Telemetriefelder für den Startzustand', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  for (const [id, value] of [
    ['gear', '5. Gang'], ['gear-note', 'Konstantfahrt'], ['speed', '106 km/h'],
    ['fuel', '6,7 l/100km'], ['fuel-note', '7,1 l/h']
  ]) {
    assert.ok(html.includes(`id="ce-tel-${id}">${value}</div>`), id);
  }
});
