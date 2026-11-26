import assert from 'node:assert/strict';
import { DomStub } from './dom-stub.mjs';
import { createFixtures } from './fixtures.mjs';

const graphicsNames = ['setDepth', 'fillStyle', 'fillRect', 'fillCircle', 'lineStyle', 'strokePoints', 'lineBetween'];
const graphics = Object.fromEntries(graphicsNames.map(name => [name, () => graphics]));
const painter = { add: { graphics: () => graphics } };

export default function register(test, game) {
  const {
    alpineLeg, ALPINE_PASS_PRESET, chainCheckOccurs, CHAIN_CHECK_CHANCE,
    BRAKE_COOLDOWN_MINUTES, BRAKE_OVERHEAT_STRESS, CHAIN_CHECK_FINE_EUR, CHAIN_CHECK_MINUTES, CHAIN_CHECK_STRESS,
    CHAIN_FITTING_MINUTES, alpineRoadEnergy, brakesOverheat, downhillBraking, passGrip, passTravelHeading,
    paintDrivingPlace, passRoadContains, passRoadPosition, passOnIce, passNavigation, vehicleCapsule,
    getLevelById, WINTER_LEVEL_ID, getActiveRouteLegs, getEdgeById, createDefaultPlan, EventModal,
    CityDriveScene, ERoadtripController, getChargerById, stopKey, predictLiveTripSoc, computeRouteSocBandSegments
  } = game;
  const { mkRun, mkScene, carImage, near, route1, route2 } = createFixtures(game);
  const level = getLevelById(WINTER_LEVEL_ID);
  const routes = level.routeOptions.slice(1);
  const mkPassRun = (route = routes[0]) => {
    const run = mkRun(level);
    run.plan = createDefaultPlan(level, run.plan.vehicleId, route.id);
    const legs = getActiveRouteLegs(level, run.plan);
    run.currentLegIndex = legs.length - 1;
    run.triggeredEventIds.push(...level.eventPoolIds);
    run.activeWeather = 'snow';
    const spec = legs[run.currentLegIndex];
    const edge = getEdgeById(spec.edgeId);
    return { run, spec, edge, ...alpineLeg(level.id, edge, spec) };
  };

  test('only Level 3 pass legs open the alpine preset and model large descents', () => {
    for (const [i, name] of ['Zirler Berg', 'Achenpass'].entries()) {
      const { edge, spec, pass, descent } = mkPassRun(routes[i]);
      assert.equal(pass.name, name);
      assert.ok(pass.entryKm < descent.startKm && descent.endKm < edge.distanceKm);
      assert.equal(descent.lossM, edge.elevationLossM);
      assert.equal(alpineLeg(route1.id, edge, spec), undefined);
      assert.equal(alpineLeg(route2.id, edge, spec), undefined);
      const reversed = alpineLeg(level.id, edge, { ...spec, reverse: true });
      assert.equal(reversed.pass, undefined);
      assert.equal(reversed.descent.lossM, edge.elevationGainM);
    }
    const mainRoute = mkPassRun(level.routeOptions[0]);
    assert.equal(mainRoute.pass, undefined);
    assert.equal(mainRoute.descent, undefined);
    const otherEdge = { ...mainRoute.edge, elevationLossM: 900 };
    assert.equal(alpineLeg(level.id, otherEdge, mainRoute.spec).descent.lossM, 900);
  });

  test('both alpine layouts can be driven to the summit with the city vehicle and chain grip', () => {
    for (const [i, name] of ['Zirler Berg', 'Achenpass'].entries()) {
      const place = paintDrivingPlace(painter, { preset: ALPINE_PASS_PRESET, passName: name, mobile: !i, light: !!i });
      const { spawn, targetZone, passRoad: road } = place;
      assert.equal(place.passThrough, true);
      assert.equal(place.zoneLabel, 'Passhöhe');
      assert.equal(place.traffic.length, 3);
      assert.ok(road.path.at(-1).alongPx > 5500);
      assert.equal(passOnIce(road, spawn), false);
      assert.ok(road.ice.every(([start]) => passOnIce(road, road.path.find(point => point.alongPx === start))));
      for (const route of place.traffic) {
        assert.ok(route.path.every(point => passRoadPosition(road, point).side < -30));
      }

      const scene = Object.assign(new CityDriveScene(), {
        carSpeed: 130, player: carImage(spawn.x, spawn.y, spawn.rot), place,
        worldW: place.worldW, worldH: place.worldH,
        bridge: { paused: false, onPropertyDamage: assert.fail }
      });
      let seconds = 0;
      const dt = 1 / 60;
      for (; seconds < 90; seconds += dt) {
        const { player } = scene;
        if (player.x >= targetZone.left && player.x <= targetZone.right &&
            player.y >= targetZone.top && player.y <= targetZone.bottom) break;
        const { aim } = passNavigation(road, player);
        const error = Math.atan2(aim.y - player.y, aim.x - player.x) + Math.PI / 2 - player.rotation;
        const arc = Math.atan2(Math.sin(error), Math.cos(error));
        const grip = passGrip(passOnIce(road, player), true);
        const turn = Math.max(-2.75 * grip, Math.min(2.75 * grip, arc * 4));
        assert.equal(scene.movePlayer(dt, turn, grip), true);
      }
      assert.ok(seconds >= 40 && seconds <= 90, `${name}: ${seconds} s`);
      assert.ok(passRoadContains(road, vehicleCapsule(scene.player.x, scene.player.y, scene.player.rotation)));
    }
  });

  test('ice and missing chains reduce grip and the motion vector follows steering with a lag', () => {
    assert.equal(passGrip(false, true), 1);
    assert.ok(passGrip(true, false) < passGrip(false, false));
    assert.ok(passGrip(true, false) < passGrip(true, true));
    assert.ok(passGrip(true, true) < passGrip(false, true));
    assert.ok(passGrip(false, false) < passGrip(false, true));
    const icy = passTravelHeading(0, Math.PI / 2, passGrip(true, false), 1 / 60);
    const chained = passTravelHeading(0, Math.PI / 2, passGrip(true, true), 1 / 60);
    assert.ok(icy > 0 && icy < chained && chained < Math.PI / 2);
    assert.ok(passTravelHeading(Math.PI - 0.05, -Math.PI + 0.05, 0.7, 0.1) > Math.PI - 0.05);
  });

  test('guard rails use all static damage tiers and oncoming traffic uses accident handling', () => {
    const place = paintDrivingPlace(painter, { preset: ALPINE_PASS_PRESET, mobile: true });
    const notice = [];
    const position = place.spawn;
    const scene = Object.assign(new CityDriveScene(), {
      player: carImage(position.x, position.y + 12.7, Math.PI), place,
      bridge: { paused: false, onPropertyDamage: damage => notice.push(damage) },
      physics: { world: { pause() {} } }
    });
    for (const [speed, euros] of [[29, 0], [30, 800], [75, 1300], [165, 5000]]) {
      scene.bridge.paused = false;
      scene.propertyContacts.clear();
      scene.player.setPosition(position.x, position.y + 12.7).setRotation(Math.PI);
      scene.carSpeed = speed;
      assert.equal(scene.movePlayer(1 / 60, 0), false);
      assert.equal(scene.carSpeed, 0);
      if (euros) assert.equal(notice.at(-1).lossEur, euros);
      else assert.equal(notice.length, 0);
    }
    assert.equal(notice.length, 3);

    const run = mkRun(level);
    scene.bridge = {
      paused: false, runState: run, onPropertyDamage: assert.fail,
      onCollisionEvent: info => assert.equal(info.kind, 'car')
    };
    scene.cameras = { main: { shake() {} } };
    scene.player.setPosition(position.x, position.y).setRotation(position.rot);
    scene.carSpeed = 110;
    scene.trafficCars = [{ sprite: carImage(position.x + 30, position.y, -Math.PI / 2), route: {}, currentSpeed: 100 }];
    assert.equal(scene.movePlayer(1 / 60, 0), false);
    assert.equal(scene.bridge.paused, true);
    assert.equal(run.collisionsCount, 1);
  });

  test('chain fitting takes two taps and reports completion once', () => {
    const modal = new DomStub();
    let fitted = 0;
    new EventModal(modal).showChainFitting(CHAIN_FITTING_MINUTES, () => fitted++);
    assert.match(modal.innerHTML, /Haltebucht · \+10 Min/);
    const button = modal.querySelector('#chain-click');
    button.click();
    assert.match(button.textContent, /Rechte Kette/);
    assert.equal(fitted, 0);
    button.click();
    button.click();
    assert.equal(fitted, 1);
  });

  test('fitting costs 10 minutes and skipping can produce one fine, stress increase and delay', t => {
    assert.equal(chainCheckOccurs(true, 0), false);
    assert.equal(chainCheckOccurs(false, CHAIN_CHECK_CHANCE - 0.001), true);
    assert.equal(chainCheckOccurs(false, CHAIN_CHECK_CHANCE), false);
    const random = Math.random;
    t.after(() => { Math.random = random; });
    for (const [fit, checked] of [[true, false], [false, false], [false, true]]) {
      Math.random = () => checked ? 0 : 1;
      const { run, pass } = mkPassRun();
      run.legProgressKm = pass.entryKm;
      const drive = [];
      let confirmFitting;
      const controller = Object.assign(Object.create(ERoadtripController.prototype), {
        level, bridge: { paused: true, runState: run },
        drivingHUD: { clearTouchStates() {} },
        enterCitySegment: preset => drive.push(preset),
        enterAutobahn: () => drive.push('highway'),
        eventModal: {
          showDynamicEvent(event, choose, resume) {
            if (event.id === 'evt_chain_requirement') choose(event.choices[Number(!fit)]);
            else {
              assert.equal(event.id, 'evt_chain_check');
              assert.equal(checked, true);
              choose(event.choices[0]);
            }
            resume();
          },
          showChainFitting(minutes, callback) {
            near(minutes, 10);
            confirmFitting = callback;
          }
        }
      });
      const initialStress = run.stress;
      controller.handleAlpineEvent({ kind: 'pass', name: pass.name });
      assert.equal(run.elapsedMinutes, 0);
      if (fit) {
        assert.deepEqual(drive, []);
        confirmFitting();
      }
      assert.equal(run.alpinePass.chainsFitted, fit);
      assert.deepEqual(drive, [ALPINE_PASS_PRESET]);
      controller.handleCitySegmentComplete(ALPINE_PASS_PRESET, true);
      controller.handleCitySegmentComplete(ALPINE_PASS_PRESET, true);
      assert.deepEqual(drive, [ALPINE_PASS_PRESET, 'highway']);
      assert.equal(run.incidentalCostEur, checked ? CHAIN_CHECK_FINE_EUR : 0);
      assert.equal(run.elapsedMinutes, fit ? CHAIN_FITTING_MINUTES : checked ? CHAIN_CHECK_MINUTES : 0);
      assert.equal(run.stress - initialStress, checked ? CHAIN_CHECK_STRESS : 0);
      assert.equal(run.legProgressKm, pass.entryKm);
    }
  });

  test('recuperation orders modes by strength, tapers at high SoC and sheds less brake heat with headroom', () => {
    const lossM = 810;
    const batteryKwh = 50.8;
    const coast = downhillBraking(lossM, 40, batteryKwh, 'coast');
    const normal = downhillBraking(lossM, 40, batteryKwh, 'normal');
    const strong = downhillBraking(lossM, 40, batteryKwh, 'strong');
    const nearFull = downhillBraking(lossM, 99, batteryKwh, 'strong');
    assert.ok(strong.recoveredKwh > normal.recoveredKwh && normal.recoveredKwh > coast.recoveredKwh);
    assert.ok(strong.brakeHeatM < normal.brakeHeatM && normal.brakeHeatM < coast.brakeHeatM);
    assert.ok(nearFull.recoveredKwh < strong.recoveredKwh / 10);
    assert.equal(downhillBraking(lossM, 100, batteryKwh, 'strong').recoveredKwh, 0);
    assert.ok(downhillBraking(lossM, 99.9, 10, 'strong').recoveredKwh <= 0.01 + 1e-8);
    assert.equal(brakesOverheat(coast.brakeHeatM), true);
    assert.equal(brakesOverheat(normal.brakeHeatM), false);
    assert.equal(brakesOverheat(nearFull.brakeHeatM), true);
  });

  test('grade recovery applies only within the descent and a depleted car cannot reach the downhill recovery', () => {
    const { descent } = mkPassRun();
    const { startKm, endKm } = descent;
    const inDescent = alpineRoadEnergy(descent, startKm, endKm, 3, 40, 50.8, 'strong');
    assert.ok(inDescent.netKwh < 0);
    for (const [start, end, baseKwh, soc] of [
      [0, startKm, 6, 50], [endKm, endKm + 2, 1, 50], [startKm - 10, endKm, 10, 2]
    ]) {
      const energy = alpineRoadEnergy(descent, start, end, baseKwh, soc, 50.8, 'strong');
      assert.deepEqual(energy, { netKwh: baseKwh, recoveredKwh: 0, brakeHeatM: 0 });
    }
  });

  test('at 15× the pass, descent and Achenkirch exit trigger at exact route positions', () => {
    const station = getChargerById('chg_achenkirch_enbw');
    const { run, edge, pass, descent } = mkPassRun(routes[1]);
    run.legProgressKm = pass.entryKm - 0.1;
    const pending = { chargerId: station.id, legIndex: run.currentLegIndex, targetSocPct: 95 };
    run.plan.plannedStops.push(pending);
    let { scene, fired } = mkScene(level, run);
    const modes = [];
    const attachAlpine = () => {
      scene.bridge.onAlpineEvent = event => { modes.push(event.kind); };
    };
    attachAlpine();
    scene.update(50, 50);
    assert.deepEqual(modes, ['pass']);
    assert.equal(run.legProgressKm, pass.entryKm);
    run.alpinePass = { legIndex: run.currentLegIndex, name: pass.name, chainsFitted: true, complete: true };
    run.legProgressKm = descent.startKm - 0.1;
    ({ scene, fired } = mkScene(level, run));
    attachAlpine();
    scene.update(100, 50);
    assert.deepEqual(modes, ['pass', 'descent']);
    assert.equal(run.legProgressKm, descent.startKm);
    run.alpineDescent = { legIndex: run.currentLegIndex, mode: 'coast', recoveredKwh: 0, brakeHeatM: 0, overheated: false };
    const descentState = run.alpineDescent;
    scene.bridge.paused = false;
    for (let i = 0; i < 20 && !scene.bridge.paused; i++) scene.update(150 + i * 50, 50);
    assert.deepEqual(fired, [station.id]);
    assert.equal(run.legProgressKm, edge.distanceKm * station.edgeProgress);
    const previousHeat = descentState.brakeHeatM;
    const previousRecovery = descentState.recoveredKwh;
    assert.ok(previousHeat > 0 && previousRecovery > 0);

    run.completedStopKeys.push(stopKey(run.currentLegIndex, station.id));
    run.socPct = 95;
    ({ scene, fired } = mkScene(level, run));
    const controller = Object.assign(Object.create(ERoadtripController.prototype), {
      bridge: scene.bridge, level,
      drivingHUD: { clearTouchStates() {} },
      eventModal: { showDynamicEvent(event, choose, resume) {
        assert.equal(event.id, 'evt_brake_overheat');
        const before = [run.elapsedMinutes, run.stress];
        choose(event.choices[0]);
        near(run.elapsedMinutes - before[0], BRAKE_COOLDOWN_MINUTES);
        near(run.stress - before[1], BRAKE_OVERHEAT_STRESS);
        resume();
      } }
    });
    scene.bridge.onAlpineEvent = event => {
      modes.push(event.kind);
      controller.handleAlpineEvent(event);
    };
    for (let i = 0; i < 80 && !scene.bridge.paused; i++) scene.update(1150 + i * 50, 50);
    assert.deepEqual(modes, ['pass', 'descent', 'overheat']);
    assert.equal(descentState, run.alpineDescent);
    assert.equal(descentState.overheated, true);
    assert.ok(descentState.brakeHeatM > previousHeat && descentState.recoveredKwh > previousRecovery);
    assert.deepEqual(fired, ['destination']);
  });

  test('live reserve uses Segeln before choice and reflects the chosen mode afterwards', () => {
    const { run, descent } = mkPassRun();
    run.legProgressKm = descent.startKm;
    const conservative = predictLiveTripSoc(level, run).exactArrivalNextSocPct;
    run.alpineDescent = { legIndex: run.currentLegIndex, mode: 'coast' };
    assert.equal(predictLiveTripSoc(level, run).exactArrivalNextSocPct, conservative);
    run.alpineDescent.mode = 'strong';
    assert.ok(predictLiveTripSoc(level, run).exactArrivalNextSocPct > conservative);
  });

  test('the planning SoC band clips the route correctly as the battery recovers downhill', () => {
    const { edge } = mkPassRun();
    const sections = [{ startSocPct: 7, endSocPct: 20, fromProgress: 0.5, toProgress: 0.75, reachableStart: true }];
    const [segment] = computeRouteSocBandSegments(edge, false, sections, 15, 10);
    assert.equal(segment.startSocPct, 10);
    assert.equal(segment.endSocPct, 15);
    assert.ok(segment.points.length >= 2);
  });
}
