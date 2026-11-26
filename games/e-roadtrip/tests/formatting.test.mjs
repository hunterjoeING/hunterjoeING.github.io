import assert from 'node:assert/strict';
export default function register(test, game) {
  test('consumption labels always use one decimal place', () => {
    const { formatConsumption, getLevelById, createDefaultPlan, evaluateTripPlan } = game;
    assert.equal(formatConsumption(25.744799999999998), '25.7 kWh/100km');
    assert.equal(formatConsumption(15.8), '15.8 kWh/100km');
    assert.equal(formatConsumption(9), '9.0 kWh/100km');
    assert.equal(formatConsumption(12.36), '12.4 kWh/100km');
    assert.equal(formatConsumption(12.34, 'kWh/100'), '12.3 kWh/100');
    assert.equal(formatConsumption(Number.NaN), '0.0 kWh/100km');
    assert.equal(formatConsumption(Infinity), '0.0 kWh/100km');

    const level = getLevelById('level_3_alps_winter');
    const plan = createDefaultPlan(level, 'mg4_standard');
    const forecast = evaluateTripPlan(level, plan);
    assert.match(formatConsumption(forecast.avgConsumptionKwh100), /^\d+\.\d kWh\/100km$/);
    for (const leg of forecast.legForecasts) {
      assert.match(formatConsumption(leg.consumptionKwh100), /^\d+\.\d kWh\/100km$/);
    }
    // Descent legs keep a precise internal value; only the label is rounded.
    assert.ok(forecast.legForecasts.some(leg => String(leg.consumptionKwh100).length > 6));
  });
}
