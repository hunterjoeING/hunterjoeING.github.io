import assert from 'node:assert/strict';

export function createFixtures(m) {
  const near = (a, b, tol = 1e-7) => assert.ok(Math.abs(a - b) < tol, `${a} != ${b}`);
  const route1 = m.getLevelById('level_1_aachen_hannover');
  const route2 = m.getLevelById('level_2_family_summer');
  const mkRun = (level = route1, v = 'mg4_standard') => ({
    levelId: level.id, plan: m.createDefaultPlan(level, v), currentLegIndex: 0, legProgressKm: 0,
    socPct: 80, elapsedMinutes: 0, stress: 20, peakStress: 20, bladderNeed: 70, hungerNeed: 90,
    distanceDrivenKm: 0, energyUsedKwh: 0, chargingCostEur: 0, subscriptionCostEur: 0,
    tollsEur: 0, paidTollLegIndices: [], incidentalCostEur: 0, propertyDamageEur: 0, lodgingCostEur: 0, pauseCostEur: 0,
    collisionsCount: 0, replanCount: 0, goodReplanCount: 0, chargingEfficiencyBonus: 0,
    decisionScoreAccum: 0, triggeredEventIds: [], completedStopKeys: [], skippedStopKeys: [],
    incidentLog: [], activeWeather: 'clear', currentSpeedKmh: 130, isNight: false
  });
  const carImage = (x = 0, y = 0, rotation = 0) => ({
    x, y, rotation, alpha: 0, scale: 1,
    setPosition(x, y) { this.x = x; this.y = y; return this; },
    setRotation(a) { this.rotation = a; return this; },
    setAlpha(a) { this.alpha = a; return this; },
    setScale(s) { this.scale = s; return this; }
  });

  function mkScene(level, run) {
    const fired = [];
    const scene = new m.AutobahnScene();
    scene.bridge = { runState: run, level, paused: false, timeScale: 15,
      onAutobahnHudTick() {}, onDynamicEventTrigger(id) { fired.push(id); },
      onDestinationArrival() { fired.push('destination'); },
      onTriggerCitySegment(id) { fired.push(id); }, onTriggerChargerSegment(station) { fired.push(station.id); },
      onWifeDialogueTrigger(id) { fired.push(id); }, onBatteryDepleted() { fired.push('leer'); } };
    scene.scale = { width: 390, height: 370 };
    scene.drawRoad = () => {};
    scene.rebuildTraffic = () => {};
    scene.playerCar = carImage();
    scene.playerHeadlight = carImage();
    scene.nightOverlay = carImage();
    scene.builtLeg = run.currentLegIndex;
    scene.laneCooldown = 4;
    return { scene, fired };
  }
  const npc = (lane, speed, gapPx = 87) => ({
    sprite: carImage(), lanePos: lane, targetLane: lane, pendingLane: null, distanceKm: gapPx / m.HIGHWAY_PX_PER_KM,
    kind: 'car', speedKmh: speed, baseDesired: speed, blinkHold: 0, blinkDir: 0, cooldown: 4,
    pullTimer: 10, burstTimer: 10, braking: false, reckless: false
  });
  return { near, route1, route2, mkRun, carImage, mkScene, npc };
}
