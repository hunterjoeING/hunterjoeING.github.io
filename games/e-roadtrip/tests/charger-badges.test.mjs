import assert from 'node:assert/strict';

const NETWORKS = ['tesla', 'enbw', 'ewego', 'electra', 'ionity', 'ac_village', 'fastned', 'totalenergies',
  'ac_dorfladen', 'atlante', 'vianeo', 'a22', 'neogy'];

export default function register(test, game) {
  test('every charger network has a badge whose initials have glyphs', () => {
    const ctx = { fillStyle: '', fillRect() {} };
    const texture = { getContext: () => ctx, refresh() {} };
    const made = [];
    const scene = {
      textures: {
        exists: key => made.includes(key),
        createCanvas: key => { made.push(key); return texture; }
      }
    };
    for (const network of NETWORKS) {
      assert.doesNotThrow(() => game.drawChargerBadge(scene, network, '#fff'), network);
    }
    assert.equal(made.length, NETWORKS.length);
  });

  test('every planning filter chip has a visible charger on the level, including the local Level 3 providers', () => {
    for (const level of game.LEVELS.filter(level => level.playable)) {
      const edgeIds = new Set(level.routeOptions.flatMap(route => route.legs.map(leg => leg.edgeId)));
      const present = new Set(game.CHARGERS.filter(station => edgeIds.has(station.edgeId)).map(station => station.network));
      const chips = game.filterNetworksForLevel(level);
      for (const network of chips) {
        assert.ok(present.has(network), `${level.id}: ${network} has no charger`);
        const visibleOnSomeRoute = level.routeOptions.some(route => game.CHARGERS.some(station =>
          station.network === network && game.getMapChargerLegIndex(station, route.legs, 0) >= 0));
        assert.ok(visibleOnSomeRoute, `${level.id}: ${network} chip shows no station on any route`);
      }
      assert.equal(chips.includes('a22'), level.id === 'level_3_alps_winter');
      assert.equal(chips.includes('neogy'), level.id === 'level_3_alps_winter');
    }
    const l3 = game.LEVELS.find(level => level.id === 'level_3_alps_winter');
    for (const network of ['a22', 'neogy']) {
      for (const route of l3.routeOptions) {
        const stations = game.CHARGERS.filter(station => station.network === network
          && game.getMapChargerLegIndex(station, route.legs, 0) >= 0);
        assert.ok(stations.length >= 1, `${route.id}: no visible ${network} station`);
      }
    }
    assert.equal(game.CHARGERS.filter(station => station.network === 'a22').length, 3);
    assert.equal(game.CHARGERS.filter(station => station.network === 'neogy').length, 4);
  });

  test('providers without a matching subscription charge their own ad-hoc price and ignore the Tesla pass', () => {
    const stations = id => game.CHARGERS.find(station => station.id === `chg_${id}`);
    const mg4 = game.getVehicleById('mg4');
    const tesla = game.VEHICLES.find(vehicle => vehicle.isTesla);
    for (const id of ['schlern_a22', 'bozen_a22', 'paganella_a22', 'sterzing_neogy', 'schlanders_neogy', 'meran_neogy']) {
      const station = stations(id);
      assert.ok(station.baseAdhocEurPerKwh >= 0.69 && station.baseAdhocEurPerKwh <= 0.79, id);
      for (const [vehicle, subs] of [[mg4, []], [mg4, ['tesla_suc']], [mg4, ['tesla_suc', 'enbw_l', 'ionity_passport']], [tesla, ['tesla_suc']]]) {
        const quote = game.getBestPriceForStation(station, subs, vehicle);
        assert.equal(quote.pricePerKwh, station.baseAdhocEurPerKwh, `${id} ${vehicle.id} ${subs}`);
        assert.equal(quote.usedSubId, 'adhoc');
        assert.equal(quote.hasSubscriptionDiscount, false);
      }
    }
    const ionity = game.CHARGERS.find(station => station.network === 'ionity');
    assert.notEqual(game.getBestPriceForStation(ionity, ['tesla_suc'], mg4).usedSubId, 'tesla_suc');
  });
}
