import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  bsfcMap,
  computeBsfcContours,
  computeEngineTelemetry,
  fullTorqueNm,
  thermalEfficiencyFromBsfc
} from '../ce-data.js';
import releaseCatalog from '../../../shared/releases.js';

function near(actual, expected, tolerance) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `Erwartet ${expected} ± ${tolerance}, erhalten ${actual}`);
}

test('Leerlauf und ausgeschalteter Motor liefern keine Nutzleistung', () => {
  const idle = computeEngineTelemetry(850, 0);
  assert.equal(idle.load, 0);
  assert.equal(idle.torqueNm, 0);
  assert.equal(idle.powerKW, 0);
  assert.equal(idle.powerPS, 0);
  assert.equal(idle.bmepBar, 0);
  assert.equal(idle.bsfc, null);
  assert.equal(idle.thermalEff, 0);
  assert.equal(idle.noUsefulPower, true);
  assert.match(idle.statusLabel, /keine Nutzleistung/);
  assert.ok(idle.ignitionsPerSec > 0);

  const off = computeEngineTelemetry(199, 1);
  assert.equal(off.status, 'off');
  assert.equal(off.statusLabel, 'Motor aus');
  assert.equal(off.ignitionsPerSec, 0);
  for (const key of ['torqueNm', 'powerKW', 'powerPS', 'bmepBar', 'thermalEff']) {
    assert.equal(off[key], 0, key);
  }
  assert.equal(off.bsfc, null);
  assert.equal(off.noUsefulPower, true);
});

test('Statusmeldungen folgen den Drehzahl- und Lastgrenzen', () => {
  const cases = [
    [850, 0.02, 'idle', 'Leerlauf · keine Nutzleistung'],
    [1199, 0.03, 'idle', 'Niedrige Drehzahl'],
    [1200, 0.02, 'idle', 'Schubbetrieb · keine Nutzleistung'],
    [2400, 0.30, 'cruise', 'Teillast'],
    [4200, 0.89, 'cruise', 'Teillast'],
    [6200, 0.89, 'cruise', 'Teillast'],
    [2400, 0.9, 'cruise', 'Volllast'],
    [3400, 0.9, 'peakTorque', 'Volllast · max. Drehmoment-Bereich'],
    [5000, 1, 'peakTorque', 'Volllast · max. Drehmoment-Bereich'],
    [5500, 1, 'peakPower', 'Volllast · Nennleistungs-Bereich'],
    [6500, 1, 'peakPower', 'Volllast · Nennleistungs-Bereich'],
    [6501, 0, 'redline', 'Drehzahlbegrenzer (> 6.500)']
  ];
  for (const [rpm, load, status, statusLabel] of cases) {
    const result = computeEngineTelemetry(rpm, load);
    assert.equal(result.status, status);
    assert.equal(result.statusLabel, statusLabel);
  }
  for (let rpm = 0; rpm <= 7000; rpm += 50) {
    assert.doesNotMatch(computeEngineTelemetry(rpm).statusLabel, /Teillast/);
  }
});

test('Nutzmoment und Leistung skalieren mit begrenzter Last, Zündfrequenz mit Drehzahl', () => {
  for (const rpm of [200, 850, 2400, 4200, 6200, 7000]) {
    const fullLoad = computeEngineTelemetry(rpm);
    assert.equal(fullLoad.torqueNm, fullTorqueNm(rpm));
    assert.equal(fullLoad.load, 1);
    for (const [input, expectedLoad] of [[-0.1, 0], [0.01, 0.01], [0.3, 0.3], [0.8, 0.8], [1.1, 1]]) {
      const point = computeEngineTelemetry(rpm, input);
      const torque = expectedLoad * fullLoad.torqueNm;
      assert.equal(point.load, expectedLoad);
      near(point.torqueNm, torque, 1e-9);
      near(point.powerKW, torque * 2 * Math.PI * rpm / 60000, 1e-9);
      near(point.powerPS, point.powerKW * 1.35962, 1e-9);
      near(point.bmepBar, torque / 15.915, 1e-9);
      assert.equal(point.ignitionsPerSec, fullLoad.ignitionsPerSec);
      assert.equal(point.noUsefulPower, expectedLoad === 0);
    }
  }
  assert.ok(fullTorqueNm(7000) < fullTorqueNm(6500));
});

test('Cruise, hohe Teillast und Volllast treffen die Zielwerte des Beispiels', () => {
  const cruise = computeEngineTelemetry(2400, 0.30);
  const highPartLoad = computeEngineTelemetry(2400, 0.80);
  const maxTorque = computeEngineTelemetry(4200, 1);
  const maxPower = computeEngineTelemetry(6200, 1);
  assert.ok(cruise.thermalEff < highPartLoad.thermalEff);
  assert.ok(cruise.thermalEff >= 0.24 && cruise.thermalEff <= 0.29);
  near(cruise.torqueNm, 63, 1);
  near(cruise.powerKW, 16, 1);
  for (const [point, eta, bsfc] of [
    [cruise, 0.266, 317], [highPartLoad, 0.36, 235], [maxTorque, 0.337, 250], [maxPower, 0.29, 290]
  ]) {
    near(point.thermalEff, eta, 0.015);
    near(point.bsfc, bsfc, 5);
  }
});

test('Kennfeldgrenzen, Rückrechnung und Optimum gelten auf dem ganzen Raster', () => {
  let optimum = { thermalEff: 0 };
  for (let rpm = 0; rpm <= 7000; rpm += 50) {
    for (let percent = 0; percent <= 100; percent++) {
      const point = computeEngineTelemetry(rpm, percent / 100);
      assert.ok(point.thermalEff >= 0 && point.thermalEff <= 0.40);
      if (point.noUsefulPower) {
        assert.equal(point.bsfc, null);
        assert.equal(point.thermalEff, 0);
      } else {
        assert.ok(point.bsfc >= 225);
        near(point.thermalEff, 3600 / (point.bsfc * 42.7), 1e-9);
      }
      if (rpm >= 1000 && rpm <= 6500 && percent >= 5 && point.thermalEff > optimum.thermalEff) {
        optimum = point;
      }
    }
  }
  assert.ok(optimum.rpm >= 2000 && optimum.rpm <= 3000);
  assert.ok(optimum.load >= 0.70 && optimum.load <= 0.90);
  assert.ok(optimum.thermalEff >= 0.34 && optimum.thermalEff <= 0.40);
  assert.ok(optimum.bsfc >= 225 && optimum.bsfc <= 245);
});

test('Muschellinien bilden zusammen mit der Kennfeldgrenze wachsende Verbrauchsbereiche', () => {
  const levels = [235, 250, 270, 300, 350, 450];
  const { contours, optimum } = computeBsfcContours(levels);
  assert.deepEqual(contours.map(contour => contour.level), levels);
  assert.ok(optimum.bsfc >= 225 && optimum.bsfc < levels[0]);
  near(thermalEfficiencyFromBsfc(optimum.bsfc), computeEngineTelemetry(optimum.rpm, optimum.load).thermalEff, 1e-9);

  let previousBoxArea = 0;
  for (const { level, polylines } of contours) {
    assert.ok(polylines.length > 0);
    assert.ok(polylines.every(line => line.length >= 2));
    const points = polylines.flat();
    for (const { rpm, torqueNm } of points) {
      const fullTorque = fullTorqueNm(rpm);
      assert.ok(rpm >= 0 && rpm <= 7000);
      assert.ok(torqueNm >= 0 && torqueNm <= fullTorque + 2);
      near(bsfcMap(rpm, torqueNm / fullTorque), level, 1);
    }

    // Offene Isolinien schließen den Bereich bis zur Volllastgrenze ein.
    for (let rpm = 200; rpm <= 7000; rpm += 10) {
      if (bsfcMap(rpm, 1) <= level) points.push({ rpm, torqueNm: fullTorqueNm(rpm) });
    }
    const rpms = points.map(point => point.rpm);
    const torques = points.map(point => point.torqueNm);
    const boxArea = (Math.max(...rpms) - Math.min(...rpms)) * (Math.max(...torques) - Math.min(...torques));
    assert.ok(boxArea > previousBoxArea, `Bounding-Box bei ${level} g/kWh muss wachsen`);
    previousBoxArea = boxArea;
  }
});

test('Die vier HTML-Voreinstellungen setzen die vorgesehenen Paare aus Drehzahl und Last', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const presets = [...html.matchAll(/<button\b([^>]*\bce-preset-btn\b[^>]*)>([^<]+)<\/button>/g)]
    .map(([, attributes, label]) => [
      label.trim(),
      Number(attributes.match(/\bdata-rpm="(\d+)"/)?.[1]),
      Number(attributes.match(/\bdata-load="(\d+)"/)?.[1])
    ]);
  assert.deepEqual(presets, [
    ['Leerlauf', 850, 0], ['Cruise', 2400, 30], ['Max Nm', 4200, 100], ['Max kW', 6200, 100]
  ]);
});

test('Öffentlicher Release v0.2.0 enthält die vorgesehenen Metadaten und Hinweise', () => {
  const release = releaseCatalog.releases.find(entry => entry.app === 'combustion_engine' && entry.version === '0.2.0');
  assert.equal(release.version, '0.2.0');
  assert.equal(release.date, '2026-11-27');
  assert.equal(release.type, 'feature');
  assert.equal(release.author, 'Michi');
  assert.equal(release.model, 'Sol 6.2');
  assert.ok(release.highlights.length >= 3 && release.highlights.length <= 5);
  assert.doesNotMatch([release.title, release.author, release.model, ...release.highlights].join(' '),
    /\b(?:codex|cursor|antigravity|cli|gta(?:-?2)?)\b/i);
});
