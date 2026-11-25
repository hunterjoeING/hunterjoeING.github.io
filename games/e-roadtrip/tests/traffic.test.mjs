import assert from 'node:assert/strict';

function sprite(x = 0, y = 0, texture = '') {
  const image = {
    x, y, rotation: 0, scale: 1, texture: { key: texture },
    body: { x: x - 8, y: y - 8, width: 16, height: 16 },
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
    capsuleOverlapsRect, circleAt, vehicleCapsule
  } = game;
  const dt = 1 / 60;

  function createCity(preset, station, mobile) {
    const city = new CityDriveScene();
    const images = [];
    city.add = {
      rectangle: () => sprite(),
      graphics: () => sprite(),
      text: () => sprite(),
      image: (...args) => {
        const image = sprite(...args);
        images.push(image);
        return image;
      }
    };
    city.physics = { add: { image: sprite } };
    city.place = paintDrivingPlace(city, { preset, station, mobile });
    city.worldW = city.place.worldW;
    city.worldH = city.place.worldH;
    city.spawnEnvironmentAndProps();
    city.spawnTrafficAndPedestrians();
    city.player = sprite(city.place.spawn.x, city.place.spawn.y).setRotation(city.place.spawn.rot);
    city.bridge = { paused: false };
    city.handleCollision = kind => { city.lastCollision = kind; };
    return { city, images };
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
        const { cityId, spawn, targetZone, buildings } = city.place;
        const description = `${station.id} ${cityId} mobile=${mobile}`;
        const props = images.filter(({ texture, scale }) =>
          texture.key.startsWith('charger_') || (texture.key.startsWith('npc_') && scale < 1)
        );
        for (const prop of props) {
          assert.ok(
            buildings.some(rect => capsuleOverlapsRect(circleAt(prop.x, prop.y, 2), rect)),
            `missing obstacle for ${prop.texture.key}: ${description}`
          );
        }
        assert.ok(!city.hitsObstacle(vehicleCapsule(spawn.x, spawn.y, spawn.rot)), `spawn: ${description}`);
        const parkedCar = vehicleCapsule(targetZone.centerX, targetZone.centerY, Math.PI);
        assert.ok(!city.hitsObstacle(parkedCar), `charging bay: ${description}`);
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

  test('City traffic clears intersections and completes its routes', t => {
    t.mock.method(Math, 'random', () => 0.5);
    for (const preset of ['aachen_start', 'koeln_ring', 'hannover_messe', 'aachen_finish', 'ferry_denmark']) {
      const { city } = createCity(preset);
      const laps = city.trafficCars.map(() => 0);
      for (let frame = 0; frame < 60 * 110; frame++) {
        const cycle = (frame / 60) % 14;
        const eastWest = cycle < 5.5 ? 'green' : cycle < 7 ? 'amber' : 'red';
        const northSouth = cycle < 7 ? 'red' : cycle < 12.5 ? 'green' : 'amber';
        city.intersections.forEach((intersection, index) => {
          intersection.ewPhase = index === 0 ? eastWest : northSouth;
          intersection.nsPhase = index === 0 ? northSouth : eastWest;
        });
        const before = city.trafficCars.map(car => car.wpIndex);
        city.stepTraffic(dt);
        city.trafficCars.forEach((car, index) => {
          if (car.wpIndex < before[index]) laps[index]++;
          if (car.route.tex === 'npc_compact_green' && car.vy < -90 && car.sprite.y < 620) {
            assert.ok(car.sprite.x > 1030, `northbound lane: ${preset}`);
          }
        });
      }
      assert.ok(laps.every(count => count >= 2), `city traffic stuck: ${preset} (${laps} laps)`);
    }
  });

  test('Charger posts and rotated traffic cars stop the player', t => {
    t.mock.method(Math, 'random', () => 0.5);
    const station = getChargerById('chg_herford_tesla');
    const { city, images } = createCity('charger_park', station, false);
    const post = images.find(image => image.texture.key === `charger_${station.network}`);

    function driveToContact() {
      for (let step = 0; step < 30; step++) {
        if (!city.movePlayer(dt, 0)) break;
      }
    }

    for (const [x, rotation] of [[post.x - 48, Math.PI / 2], [post.x + 48, -Math.PI / 2]]) {
      city.lastCollision = undefined;
      city.player.setPosition(x, post.y - 1).setRotation(rotation);
      city.carSpeed = 230;
      driveToContact();
      assert.equal(city.lastCollision, 'obstacle');
      assert.ok(Math.abs(city.player.x - post.x) > 27, 'car bumper stopped short of the charger');
    }
    city.player.setPosition(850, 45).setRotation(Math.PI / 2);
    city.trafficCars[0].sprite.setPosition(905, 45).setRotation(0);
    city.lastCollision = undefined;
    driveToContact();
    assert.equal(city.lastCollision, 'car');
  });
}
