import assert from 'node:assert/strict';
import { createFixtures } from './fixtures.mjs';

function sprite(x = 0, y = 0, texture = '') {
  const image = {
    x, y, angle: 0, rotation: 0, scale: 1, texture: { key: texture },
    body: { x: x - 8, y: y - 8, width: 16, height: 16 },
    setText(text) { this.text = text; return this; },
    setVisible(visible) { this.visible = visible; return this; },
    setRotation(rotation) { this.rotation = rotation; return this; },
    setPosition(x, y) { Object.assign(this, { x, y }); return this; },
    setScale(scale) { this.scale = scale; return this; }
  };
  // Ignore rendering calls while preserving positions and rotations used by traffic.
  return new Proxy(image, {
    get(target, key, receiver) {
      return key in target ? Reflect.get(target, key, receiver) : () => receiver;
    }
  });
}

export default function register(test, game) {
  const {
    CityDriveScene, paintDrivingPlace, getLevelById, createDefaultPlan, getActiveRouteLegs,
    getChargerById, getChargersForEdge, getEdgeById, evaluateTripPlan, computeRouteSocBandSegments,
    HIGHWAY_PX_PER_KM, stepHighwayTraffic, countSpriteOverlaps, CHARGERS,
    capsuleOverlapsRect, circleAt, vehicleCapsule, evaluatePropertyDamage, evaluateRun
  } = game;
  const dt = 1 / 60;
  const { mkRun, route1 } = createFixtures(game);

  function createCity(preset, station, mobile, routeId, light, levelOrder) {
    const city = new CityDriveScene();
    const images = [];
    city.add = {
      rectangle: () => sprite(),
      triangle: () => sprite(),
      graphics: () => sprite(),
      renderTexture: () => Object.assign(sprite(), { texture: { setFilter() {} } }),
      text: () => sprite(),
      image: (...args) => {
        const image = sprite(...args);
        images.push(image);
        return image;
      }
    };
    city.physics = { add: { image: sprite }, world: { pause() {} } };
    city.place = paintDrivingPlace(city, { preset, station, mobile, routeId, light, levelOrder });
    city.worldW = city.place.worldW;
    city.worldH = city.place.worldH;
    city.zebras = city.place.zebras;
    city.spawnEnvironmentAndProps();
    city.spawnTrafficAndPedestrians();
    city.player = sprite(city.place.spawn.x, city.place.spawn.y).setRotation(city.place.spawn.rot);
    city.bridge = {
      paused: false,
      onPropertyDamage(damage) { city.damageEvents.push(damage); }
    };
    city.damageEvents = [];
    city.handleCollision = kind => { city.lastCollision = kind; };
    return { city, images };
  }

  function prepareCityUpdate(city, preset, level) {
    city.preset = preset;
    city.bridge.level = level;
    city.bridge.touch = { left: false, right: false, up: false, down: false, brake: false };
    city.targetZone = city.place.targetZone;
    city.passThrough = city.place.passThrough;
    city.scale = { width: 390, height: 480 };
    city.surface = { update() {} };
    city.updateLightingVisuals = () => {};
    city.pedestrians = [];
    const idle = { isDown: false };
    city.wasd = { W: idle, A: idle, S: idle, D: idle, SPACE: idle, H: idle };
    city.cursors = { up: idle, down: idle, left: idle, right: idle };
    city.setupNavIndicator();
  }

  function cycleLights(city, elapsed) {
    const cycle = elapsed % 14;
    const eastWest = cycle < 5.5 ? 'green' : cycle < 7 ? 'amber' : 'red';
    const northSouth = cycle < 7 ? 'red' : cycle < 12.5 ? 'green' : 'amber';
    city.intersections.forEach((intersection, index) => {
      intersection.ewPhase = index === 0 ? eastWest : northSouth;
      intersection.nsPhase = index === 0 ? northSouth : eastWest;
    });
  }

  test('The active-leg SoC band turns green again after charging at Herford', () => {
    const level = getLevelById('level_1_aachen_hannover');
    const plan = createDefaultPlan(level, 'mg4_standard');
    const legs = getActiveRouteLegs(level, plan);
    const station = getChargerById('chg_herford_tesla');
    const legIndex = legs.findIndex(leg => leg.edgeId === station.edgeId);
    assert.ok(legIndex >= 0);
    plan.plannedStops = [{ chargerId: station.id, legIndex, targetSocPct: 80 }];
    const forecast = evaluateTripPlan(level, plan);
    const nextLeg = legs[legIndex + 1];
    const nextForecast = forecast.legForecasts[legIndex + 1];
    assert.ok(forecast.legForecasts[legIndex].stopSummaries[0].arriveSoc < 10);
    assert.ok(nextForecast.startSocPct > 25 && nextForecast.endSocPct < 25);
    const greenSegments = computeRouteSocBandSegments(
      getEdgeById(nextLeg.edgeId), !!nextLeg.reverse, nextForecast.socSections, 25, 15
    );
    assert.ok(greenSegments.length > 0);

    // A stop below arrival SoC must preserve the section boundary on either stage.
    const firstCharger = getChargersForEdge(legs[0].edgeId).find(charger => !charger.fairStay);
    for (const [chargerId, index] of [[station.id, legIndex], [firstCharger.id, 0]]) {
      plan.plannedStops = [{ chargerId, legIndex: index, targetSocPct: 1 }];
      const [beforeStop, afterStop] = evaluateTripPlan(level, plan).legForecasts[index].socSections;
      assert.equal(beforeStop.endSocPct, afterStop.startSocPct);
    }
    const depleted = evaluateTripPlan(level, { ...plan, plannedStops: [] })
      .legForecasts.flatMap(leg => leg.socSections);
    assert.ok(depleted.some(section => section.startSocPct > 0 && section.endSocPct < 0));
    assert.ok(depleted.some(section => !section.reachableStart));
  });

  test('Highway gaps hold and an occupied target lane cancels the change', t => {
    t.mock.method(Math, 'random', () => 0.5);
    const makeCar = (lane, distancePx, speed = 100, overrides = {}) => ({
      sprite: {}, lanePos: lane, targetLane: lane, pendingLane: null, distanceKm: distancePx / HIGHWAY_PX_PER_KM,
      speedKmh: speed, baseDesired: speed, kind: 'car', blinkDir: 0, blinkHold: 0, reckless: false,
      cooldown: 100, pullTimer: 10, burstTimer: 10, braking: false, ...overrides
    });
    const separateLanes = [makeCar(0, 200), makeCar(1, 200)];
    stepHighwayTraffic(separateLanes, dt, 100, [0, 1], 500, 700, 0.2, true, 130);
    assert.ok(separateLanes.every(car => Math.abs(car.distanceKm * HIGHWAY_PX_PER_KM - 200) < 1e-9));

    const signal = { pendingLane: 1, blinkHold: 0.01, blinkDir: 1 };
    const blocked = makeCar(0, 200, 100, signal);
    stepHighwayTraffic([blocked, makeCar(1, 210)], dt, 100, [2], 500, 700, 0.2, true, 130);
    assert.equal(blocked.targetLane, 0);
    assert.equal(blocked.pendingLane, null);
    assert.equal(blocked.blinkDir, 0);
    const allowed = makeCar(0, 200, 100, signal);
    stepHighwayTraffic([allowed, makeCar(1, 480)], dt, 100, [2], 500, 700, 0.2, true, 130);
    assert.equal(allowed.targetLane, 1);
    assert.ok(allowed.lanePos > 0);

    const fastRear = makeCar(1, 120, 155);
    const slowFront = makeCar(1, 195, 65);
    const speed = stepHighwayTraffic([fastRear, slowFront], 0.05, 155, [1], 500, 700, 0.2, true, 155);
    assert.ok((slowFront.distanceKm - fastRear.distanceKm) * HIGHWAY_PX_PER_KM >= 74 - 1e-6);
    assert.ok(speed <= 155);

    for (const height of [280, 440, 860]) {
      const fast = { cooldown: 0, kind: 'fast' };
      const car = { cooldown: 0 };
      const truck = { cooldown: 0, kind: 'truck' };
      const traffic = [
        makeCar(0, 200, 155, fast), makeCar(0, -150, 160, fast),
        makeCar(1, 200, 120, car), makeCar(1, 90, 100, car),
        makeCar(2, 100, 90, truck), makeCar(2, -120, 88, truck)
      ];
      for (let frame = 0; frame < 4500; frame++) {
        const rightLaneOpen = frame < 1500 || frame > 2800;
        const playerLanes = frame < 300 ? [0, 1] : [1];
        stepHighwayTraffic(
          traffic, dt, rightLaneOpen ? 130 : 70, playerLanes,
          height * 0.72, height, 0.37, rightLaneOpen, rightLaneOpen ? 160 : 70
        );
        assert.ok(traffic.every(vehicle => Number.isFinite(vehicle.distanceKm)));
        assert.equal(countSpriteOverlaps(traffic, [1]), 0, `height=${height} frame=${frame}`);
      }
    }
  });

  test('Autohof traffic reverses into a bay and exits across station and screen variants', t => {
    t.mock.method(Math, 'random', () => 0.5);
    for (const station of CHARGERS) {
      for (const mobile of [true, false]) {
        const { city, images } = createCity('charger_park', station, mobile);
        const { cityId, spawn, chargingBays, buildings, parkedVehicles } = city.place;
        const description = `${station.id} ${cityId} mobile=${mobile}`;
        const props = images.filter(({ texture, scale }) =>
          texture.key.startsWith('charger_') || (texture.key.startsWith('npc_') && scale < 1)
        );
        for (const prop of props) {
          const footprintList = prop.texture.key.startsWith('charger_') ? buildings : parkedVehicles;
          assert.ok(
            footprintList.some(rect => capsuleOverlapsRect(circleAt(prop.x, prop.y, 2), rect)),
            `missing obstacle for ${prop.texture.key}: ${description}`
          );
        }
        assert.ok(!city.hitsObstacle(vehicleCapsule(spawn.x, spawn.y, spawn.rot)), `spawn: ${description}`);
        const freeBays = chargingBays.filter(bay => !bay.occupied);
        assert.ok(freeBays.length >= Math.min(2, chargingBays.length), description);
        assert.equal(images.filter(image => image.texture.key === `stall_badge_${station.network}`).length,
          chargingBays.length, description);
        for (const bay of freeBays) {
          const { x, y, w, h } = bay.bounds;
          const parkedCar = vehicleCapsule(x + w / 2, y + h / 2, Math.PI);
          assert.ok(!city.hitsObstacle(parkedCar), `charging bay: ${description}`);
        }
        const [visitor, passing] = city.trafficCars;
        let reversed = false;
        let parked = false;
        let visitorExited = false;
        let passingExited = false;
        for (let frame = 0; frame < 60 * 98; frame++) {
          const visitorX = visitor.sprite.x;
          const passingX = passing.sprite.x;
          city.stepTraffic(dt);
          reversed ||= visitor.vy < -40 && Math.cos(visitor.sprite.rotation) < -0.92;
          parked ||= visitor.holdLeft > 7.5;
          visitorExited ||= visitorX > city.worldW && visitor.sprite.x < 0;
          passingExited ||= passingX < 0 && passing.sprite.x > city.worldW;
          if (passing.currentSpeed) assert.ok(passing.vx < 0, `through lane direction: ${description}`);
          if (visitor.sprite.y > 140 && visitor.sprite.y < 150 &&
              visitor.currentSpeed && visitor.sprite.x > spawn.x + 70) {
            assert.ok(visitor.vx > 0, `visitor exit direction: ${description}`);
          }
        }
        assert.ok(reversed && parked && visitorExited, `visitor did not complete its stop: ${description}`);
        assert.ok(passingExited, `through vehicle did not exit: ${description}`);
      }
    }
  });

  test('Each free bay can initiate charging and occupied bays become available when vacated', () => {
    const station = { ...getChargerById('chg_herford_tesla'), occupancyRisk: 0.5 };
    const { city } = createCity('charger_park', station, false);
    const { chargingBays } = city.place;
    assert.ok(chargingBays.some(bay => bay.occupied));
    assert.ok(chargingBays.filter(bay => !bay.occupied).length > 1);
    for (const bay of chargingBays) {
      const { x, y, w, h } = bay.bounds;
      city.player.setPosition(x + w / 2, y + h / 2).setRotation(Math.PI);
      const { parked, nearest } = city.updateChargingBays();
      if (bay.parkedCar) {
        assert.equal(parked, undefined);
        assert.notEqual(nearest, bay);
      } else {
        assert.equal(parked?.pillar, bay.pillar);
        assert.equal(nearest, bay);
      }
    }
    const bay = chargingBays.find(candidate => !candidate.parkedCar);
    const { x, y, w, h } = bay.bounds;
    const visitor = city.trafficCars[0].sprite;
    const previous = { x: visitor.x, y: visitor.y };
    city.player.setPosition(x + w / 2, y + h / 2).setRotation(Math.PI);
    visitor.setPosition(city.player.x, city.player.y).setRotation(Math.PI);
    assert.equal(city.updateChargingBays().parked, undefined);
    assert.equal(bay.occupied, true);
    visitor.setPosition(previous.x, previous.y);
    assert.equal(city.updateChargingBays().parked, bay);
    assert.equal(bay.occupied, false);

    prepareCityUpdate(city, 'charger_park', getLevelById('level_1_aachen_hannover'));
    let connectedPillar;
    city.playDriverPlugInSequence = pillar => { connectedPillar = pillar; };

    const occupied = chargingBays.find(candidate => candidate.parkedCar);
    city.player.setPosition(occupied.bounds.x + occupied.bounds.w / 2,
      occupied.bounds.y + occupied.bounds.h / 2);
    city.update(0, 50);
    assert.equal(connectedPillar, undefined);

    const alternate = chargingBays.find(candidate => candidate !== bay && !candidate.occupied);
    city.player.setPosition(alternate.bounds.x + alternate.bounds.w / 2,
      alternate.bounds.y + alternate.bounds.h / 2);
    city.update(0, 50);
    assert.equal(connectedPillar, alternate.pillar);
  });

  test('Hannover, Köln and Hirtshals traffic clears crossings and completes its routes', t => {
    t.mock.method(Math, 'random', () => 0.5);
    for (const preset of ['koeln_ring', 'hannover_messe', 'ferry_denmark']) {
      const { city } = createCity(preset);
      city.player.setPosition(20, city.worldH - 20);
      const laps = city.trafficCars.map(() => 0);
      for (let frame = 0; frame < 60 * 110; frame++) {
        cycleLights(city, frame * dt);
        const before = city.trafficCars.map(car => car.wpIndex);
        city.stepTraffic(dt);
        city.trafficCars.forEach((car, index) => {
          if (car.wpIndex < before[index]) laps[index]++;
        });
      }
      assert.ok(laps.every(count => count >= 2), `city traffic stuck: ${preset} (${laps} laps)`);
    }
  });

  test('Aachen traffic completes its routes in daylight and at night', () => {
    for (const [preset, mobile] of [['aachen_start', true], ['aachen_finish', false]]) {
      const { city } = createCity(preset, undefined, mobile);
      assert.deepEqual(city.intersections.map(inter => inter.id), ['hansemannplatz', 'kaiserplatz']);
      assert.equal(city.signalVisuals.length, 8);
      const laps = city.trafficCars.map(() => 0);
      for (let frame = 0; frame < 60 * 170; frame++) {
        cycleLights(city, frame * dt);
        const before = city.trafficCars.map(car => car.wpIndex);
        city.stepTraffic(dt);
        city.trafficCars.forEach((car, index) => {
          if (car.wpIndex < before[index]) laps[index]++;
        });
      }
      assert.ok(laps.every(count => count >= 2), `${preset}: ${JSON.stringify(city.trafficCars.map((car, index) => ({
        laps: laps[index], x: Math.round(car.sprite.x), y: Math.round(car.sprite.y), wp: car.wpIndex,
        target: car.route.path[car.wpIndex],
        nearest: city.place.buildings.filter(area =>
          capsuleOverlapsRect(vehicleCapsule(car.sprite.x, car.sprite.y, car.sprite.rotation + 0.05, car.route.isCyclist), area))
      })))}`);
    }
  });

  test('Aachen roads can be driven to each motorway and the home parking lot', () => {
    for (const [preset, order] of [['aachen_start', 1], ['aachen_start', 2], ['aachen_finish', 1]]) {
      const { city } = createCity(preset, undefined, true, undefined, false, order);
      city.trafficCars = [];
      city.pedestrians = [];
      const { targetZone, cityGuide: { navigate } } = city.place;
      const hasArrived = () => city.player.x >= targetZone.left && city.player.x <= targetZone.right &&
        city.player.y >= targetZone.top && city.player.y <= targetZone.bottom;
      for (let frame = 0; frame < 3600 && !hasArrived(); frame++) {
        const { player } = city;
        const { aim } = navigate(player);
        const error = Math.atan2(aim.y - player.y, aim.x - player.x) + Math.PI / 2 - player.rotation;
        const arc = Math.atan2(Math.sin(error), Math.cos(error));
        const turn = Math.max(-2.75, Math.min(2.75, arc * 8));
        city.carSpeed = Math.abs(arc) > 0.35 ? 62 : 100;
        assert.ok(city.movePlayer(dt, turn), `${preset} Level ${order}: obstacle at ${player.x}, ${player.y}`);
      }
      assert.ok(hasArrived(), `${preset} Level ${order}: missed destination at ${city.player.x}, ${city.player.y}`);
    }
  });

  test('Aachen ignores wrong exits and triggers confetti only after parking at home', () => {
    const level1 = getLevelById('level_1_aachen_hannover');
    const level2 = getLevelById('level_2_family_summer');
    const start = createCity('aachen_start', undefined, true, level2.defaultRouteId, false, 2).city;
    prepareCityUpdate(start, 'aachen_start', level2);
    const completed = [];
    start.bridge.onCitySegmentComplete = (...args) => completed.push(args);
    const wrong = start.place.cityGuide.wrongExits.find(exit => exit.label.includes('Kreuz Aachen'));
    start.player.setPosition(wrong.x, wrong.y);
    start.update(0, 50);
    assert.equal(start.reverseHintText.text, 'Falsche Auffahrt · bitte wenden');
    assert.equal(start.reverseHintText.visible, true);
    assert.match(start.distText.text, /Zur A44 · Aachen-Brand/);
    assert.equal(start.cleanRun, true);
    assert.deepEqual(completed, []);
    start.player.setPosition(start.targetZone.centerX, start.targetZone.centerY);
    start.update(50, 50);
    assert.match(start.distText.text, /^A44 erreicht/);
    assert.deepEqual(completed, [['aachen_start', true]]);

    const finish = createCity('aachen_finish', undefined, true, level1.defaultRouteId, true).city;
    prepareCityUpdate(finish, 'aachen_finish', level1);
    let confetti = 0;
    finish.triggerArrivalConfetti = () => { confetti++; };
    finish.update(0, 50);
    assert.match(finish.distText.text, /Nach Hause · Pontviertel/);
    finish.player.setPosition(finish.targetZone.centerX, finish.targetZone.centerY);
    for (let frame = 0; frame < 11; frame++) finish.update(50 + frame * 50, 50);
    assert.equal(confetti, 0);
    for (let frame = 11; frame < 15; frame++) finish.update(50 + frame * 50, 50);
    assert.equal(confetti, 1);
  });

  test('Regional city steering reaches the signed targets and preserves their arrival rules', () => {
    const [a, b, c] = route1.routeOptions;
    const preview = getLevelById('level_7_nordkapp_ultimate');
    for (const [preset, level, route] of [
      ...[a, b, c].map(route => ['hannover_messe', route1, route]),
      ...[a, c].map(route => ['koeln_ring', route1, route]),
      ['ferry_denmark', preview, preview.routeOptions[0]]
    ]) {
      const { city } = createCity(preset, undefined, true, route.id, true);
      const { player, place: { cityGuide, targetZone } } = city;
      city.trafficCars = [];
      prepareCityUpdate(city, preset, level);
      const arrived = () => player.x >= targetZone.left && player.x <= targetZone.right &&
        player.y >= targetZone.top && player.y <= targetZone.bottom;
      for (let frame = 0; frame < 2400 && !arrived(); frame++) {
        const { aim } = cityGuide.navigate(player);
        const error = Math.atan2(aim.y - player.y, aim.x - player.x) + Math.PI / 2 - player.rotation;
        const arc = Math.atan2(Math.sin(error), Math.cos(error));
        city.carSpeed = Math.abs(arc) > 0.35 ? 62 : 110;
        assert.ok(city.movePlayer(dt, Math.max(-2.75, Math.min(2.75, arc * 8))),
          `${preset} ${route.id} hit an obstacle at ${player.x}, ${player.y}`);
      }
      assert.ok(arrived(), `${preset} ${route.id} missed the target at ${player.x}, ${player.y}`);
      const completions = [];
      city.bridge.onCitySegmentComplete = (...args) => completions.push(args);
      if (cityGuide.wrongExits.length) {
        const position = { x: player.x, y: player.y };
        for (const { x, y } of cityGuide.wrongExits) {
          player.setPosition(x, y);
          city.update(0, 50);
          assert.equal(city.reverseHintText.text, 'Falsche Auffahrt · bitte wenden');
          assert.equal(city.reverseHintText.visible, true);
        }
        player.setPosition(position.x, position.y);
      }
      if (preset === 'hannover_messe') city.carSpeed = 110;
      city.update(50, 50);
      if (preset === 'hannover_messe') {
        assert.deepEqual(completions, []);
        player.setPosition(targetZone.centerX, targetZone.centerY);
        city.carSpeed = 0;
        for (let frame = 0; frame < 11; frame++) city.update(100 + frame * 50, 50);
        assert.deepEqual(completions, []);
        for (let frame = 11; frame < 15; frame++) city.update(100 + frame * 50, 50);
      }
      assert.deepEqual(completions, [[preset, true]]);
      city.update(1000, 50);
      assert.equal(completions.length, 1);
    }
  });

  test('München and Innsbruck cars and cyclists complete their routes in both themes', () => {
    for (const preset of ['muenchen_start', 'innsbruck_finish']) {
      for (const light of [true, false]) {
        const routeId = light ? 'l3_route_b_zirler' : 'l3_route_c_achenpass';
        const { city } = createCity(preset, undefined, light, routeId, light);
        assert.ok(city.trafficCars.some(car => car.route.isCyclist));
        assert.ok(city.pedestrians.length > 0 && city.cones.length > 0);
        const laps = city.trafficCars.map(() => 0);
        for (let frame = 0; frame < 60 * 110; frame++) {
          const before = city.trafficCars.map(car => car.wpIndex);
          city.stepTraffic(dt);
          city.trafficCars.forEach((car, index) => {
            if (car.wpIndex < before[index]) laps[index]++;
          });
        }
        assert.ok(laps.every(count => count >= 2), `${preset} light=${light}: ${laps.join(', ')} laps`);
      }
    }
  });

  test('Only the selected München ramp completes departure and Innsbruck finishes once after parking', () => {
    const level = getLevelById('level_3_alps_winter');
    const start = createCity('muenchen_start', undefined, true, level.routeOptions[2].id, true).city;
    prepareCityUpdate(start, 'muenchen_start', level);
    const completed = [];
    start.bridge.onCitySegmentComplete = (...args) => completed.push(args);
    const wrong = start.place.cityGuide.wrongExits.find(exit => exit.label === 'A95 Garmisch');
    start.player.setPosition(wrong.x, wrong.y);
    start.update(0, 50);
    assert.equal(start.reverseHintText.visible, true);
    assert.match(start.reverseHintText.text, /Falsche Auffahrt/);
    assert.match(start.distText.text, /Ausfahrt Holzkirchen/);
    assert.equal(start.cleanRun, true);
    assert.deepEqual(completed, []);
    start.player.setPosition(start.targetZone.centerX, start.targetZone.centerY);
    start.update(50, 50);
    assert.equal(start.reverseHintText.visible, false);
    assert.deepEqual(completed, [['muenchen_start', true]]);

    const finish = createCity('innsbruck_finish', undefined, true, level.routeOptions[1].id, false).city;
    prepareCityUpdate(finish, 'innsbruck_finish', level);
    finish.bridge.onCitySegmentComplete = (...args) => completed.push(args);
    finish.update(0, 50);
    assert.match(finish.distText.text, /Innsbruck-West/);
    const { goal } = finish.place.cityGuide.approach;
    finish.player.setPosition(goal.x, goal.y);
    finish.update(50, 50);
    assert.match(finish.distText.text, /Hotelparkplatz/);
    finish.player.setPosition(finish.targetZone.centerX, finish.targetZone.centerY);
    for (let frame = 0; frame < 11; frame++) finish.update(100 + frame * 50, 50);
    assert.equal(completed.length, 1);
    for (let frame = 0; frame < 4; frame++) finish.update(650 + frame * 50, 50);
    assert.deepEqual(completed, [['muenchen_start', true], ['innsbruck_finish', true]]);
  });

  test('City steering follows both roads out of München and both ramps into Innsbruck', () => {
    for (const preset of ['muenchen_start', 'innsbruck_finish']) {
      for (const routeId of ['l3_route_b_zirler', 'l3_route_c_achenpass']) {
        const { city } = createCity(preset, undefined, false, routeId, false);
        city.trafficCars = [];
        city.pedestrians = [];
        const { targetZone, cityGuide: { approach, navigate } } = city.place;
        let approachReached = !approach;
        const hasArrived = () => city.player.x >= targetZone.left && city.player.x <= targetZone.right &&
          city.player.y >= targetZone.top && city.player.y <= targetZone.bottom;
        for (let frame = 0; frame < 3600 && !hasArrived(); frame++) {
          const { player } = city;
          if (approach && Math.hypot(approach.goal.x - player.x, approach.goal.y - player.y) < 54) approachReached = true;
          const { aim } = approachReached ? navigate(player) : approach.navigate(player);
          const error = Math.atan2(aim.y - player.y, aim.x - player.x) + Math.PI / 2 - player.rotation;
          const arc = Math.atan2(Math.sin(error), Math.cos(error));
          const turn = Math.max(-2.75, Math.min(2.75, arc * 8));
          city.carSpeed = Math.abs(arc) > 0.35 ? 62 : 100;
          assert.ok(city.movePlayer(dt, turn), `${preset} ${routeId} contact at ${player.x}, ${player.y}`);
        }
        assert.ok(hasArrived() && approachReached, `${preset} ${routeId} missed its destination`);
      }
    }
  });

  test('Static property damage uses absolute impact speed and three half-open tiers', () => {
    const scratch = { tier: 'scratch', lossEur: 800, stressDelta: 10 };
    const dent = { tier: 'dent', lossEur: 1300, stressDelta: 20 };
    const airbag = { tier: 'airbag', lossEur: 5000, stressDelta: 0 };
    for (const speed of [0, 16, -29.99]) assert.equal(evaluatePropertyDamage(speed), null, 'gentle touch only stops the car');
    for (const speed of [30, -30, 74.99]) assert.deepEqual(evaluatePropertyDamage(speed), scratch);
    for (const speed of [75, -115, 164.99]) assert.deepEqual(evaluatePropertyDamage(speed), dent);
    for (const speed of [165, -165, 230]) assert.deepEqual(evaluatePropertyDamage(speed), airbag);
  });

  test('Charger posts trigger property damage before the car bumper reaches the post', t => {
    t.mock.method(Math, 'random', () => 0.5);
    const station = getChargerById('chg_herford_tesla');
    for (const direction of [-1, 1]) {
      const { city, images } = createCity('charger_park', station, false);
      const post = images.find(image => image.texture.key === `charger_${station.network}`);
      city.player.setPosition(post.x - direction * 48, post.y - 1).setRotation(direction * Math.PI / 2);
      const driveIntoPost = speed => {
        city.bridge.paused = false;
        city.carSpeed = speed;
        for (let steps = 0; steps < 30; steps++) if (!city.movePlayer(dt, 0)) break;
      };

      driveIntoPost(230);
      assert.deepEqual(city.damageEvents.map(damage => damage.tier), ['airbag']);
      assert.ok(Math.abs(city.player.x - post.x) > 27, 'car bumper stopped short of the charger');
      assert.equal(city.lastCollision, undefined);
      driveIntoPost(230);
      assert.equal(city.damageEvents.length, 1);
    }
  });

  test('Reversing away rearms a building hit and world edges count as static property', () => {
    const { city } = createCity('aachen_start');
    city.obstacleRects = [{ x: 200, y: 90, w: 50, h: 60 }];
    city.obstacleCircles = [];
    city.trafficCars = [];
    city.pedestrians = [];
    city.player.setPosition(177, 120).setRotation(Math.PI / 2);
    const drive = (speed, steps) => {
      city.bridge.paused = false;
      city.carSpeed = speed;
      for (let i = 0; i < steps; i++) if (!city.movePlayer(dt, 0)) return false;
      return true;
    };
    assert.equal(drive(90, 1), false);
    assert.equal(drive(90, 1), false);
    assert.deepEqual(city.damageEvents.map(damage => damage.tier), ['dent']);
    assert.equal(drive(-100, 10), true);
    assert.equal(drive(53, 30), false);
    assert.deepEqual(city.damageEvents.map(damage => damage.tier), ['dent', 'scratch']);

    city.player.setPosition(24, 120).setRotation(-Math.PI / 2);
    assert.equal(drive(230, 1), false);
    assert.deepEqual(city.damageEvents.map(damage => damage.tier), ['dent', 'scratch', 'airbag']);
  });

  test('Parked and moving traffic still go through the opponent collision flow', t => {
    t.mock.method(Math, 'random', () => 0.5);
    const station = getChargerById('chg_herford_tesla');
    const { city } = createCity('charger_park', station, false);
    city.player.setPosition(850, 45).setRotation(Math.PI / 2);
    city.trafficCars[0].sprite.setPosition(905, 45).setRotation(0);
    city.carSpeed = 230;
    for (let steps = 0; steps < 30; steps++) if (!city.movePlayer(dt, 0)) break;
    assert.equal(city.lastCollision, 'car');
    assert.deepEqual(city.damageEvents, []);

    const parked = city.place.parkedVehicles[0];
    city.player.setPosition(parked.x + parked.w / 2, parked.y + parked.h + 22).setRotation(0);
    city.carSpeed = 230;
    assert.equal(city.movePlayer(dt, 0), false);
    assert.equal(city.lastCollision, 'obstacle');
    assert.deepEqual(city.damageEvents, []);
  });

  test('Cars, cyclists and pedestrians keep their fault handling and scoring path', () => {
    for (const [kind, speed, atFault] of [
      ['car', 0, false], ['car', 120, true], ['cyclist', 120, true], ['pedestrian', 120, true]
    ]) {
      const city = new CityDriveScene();
      const run = mkRun();
      let collision;
      city.bridge = {
        runState: run, paused: false, onCollisionEvent(info) { collision = info; },
        onPropertyDamage: assert.fail
      };
      city.player = sprite(100, 100);
      city.cameras = { main: { shake() {} } };
      city.physics = { world: { pause() {} } };
      city.carSpeed = speed;
      city.handleCollision(kind, 100, 85, 10);
      assert.equal(collision.kind, kind);
      assert.equal(collision.playerAtFault, atFault);
      assert.equal(city.bridge.paused, true);
      assert.equal(city.carSpeed, 0);
      assert.equal(run.collisionsCount, Number(atFault));
      assert.equal(run.propertyDamageEur, 0);
    }
  });

  test('Construction cones fling away, count once each, and only increase stress', () => {
    const { city, images } = createCity('aachen_start');
    const [first, second] = images.filter(image => image.texture.key === 'cone');
    const run = mkRun(route1);
    run.completed = false;
    city.bridge.runState = run;
    city.trafficCars = [];
    city.pedestrians = [];
    const flung = [];
    city.tweens = { add(tween) { flung.push(tween); } };
    const hit = cone => {
      city.player.setPosition(cone.x - 27, cone.y).setRotation(Math.PI / 2);
      city.carSpeed = 230;
      assert.equal(city.movePlayer(dt, 0), true);
      assert.ok(city.player.x > cone.x - 27);
      assert.equal(city.carSpeed, 230);
    };
    const original = structuredClone(run);
    const directScoring = current => evaluateRun(route1, current, true).subScores.decisions;
    hit(first);
    assert.deepEqual(run, { ...original, stress: 21, peakStress: 21 });
    hit(first);
    assert.deepEqual(run, { ...original, stress: 21, peakStress: 21 });
    hit(second);
    assert.deepEqual(run, { ...original, stress: 22, peakStress: 22 });
    assert.deepEqual(flung.map(tween => tween.targets), [first, second]);
    assert(flung.every(tween => tween.x !== tween.targets.x));
    assert.equal(directScoring(run), directScoring(original));
    assert.equal(city.bridge.paused, false);
    assert.equal(city.lastCollision, undefined);
    assert.deepEqual(city.damageEvents, []);
  });
}
