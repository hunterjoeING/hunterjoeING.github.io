import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import test from 'node:test';
import { buildEngineProfile } from '../ce-data.js';
import { DUCT_SIDES, TRACER_SIZE, setThrottleOpening } from '../ce-throttle.js';
import { buildPlumbing } from '../ce-plumbing.js';

const three = new URL('../../../shared/vendor/three-0.170.0/build/three.module.min.js', import.meta.url);
registerHooks({ resolve(id, context, next) {
  return id === 'three' ? { url: three.href, shortCircuit: true } : next(id, context);
} });
const { Plane, Vector3 } = await import('three');
const { preparePassages } = await import('../ce-ducts.js');
const { routesForSeat, trace } = await import('../ce-tracers.js');

function fittingPlanes({ geometry, rings }) {
  const points = geometry.attributes.position;
  const index = geometry.index.array;
  const vertex = i => new Vector3().fromBufferAttribute(points, i);
  const planes = [];
  for (let i = 0; i < index.length; i += 3) {
    planes.push(new Plane().setFromCoplanarPoints(vertex(index[i]), vertex(index[i+1]), vertex(index[i+2])));
  }
  const inner = rings.flat().reduce((sum, p) => sum.add(p), new Vector3())
    .divideScalar(rings.length * rings[0].length);
  for (const r of rings) {
    const cap = new Plane().setFromCoplanarPoints(r[0], r[4], r[8]);
    if (cap.distanceToPoint(inner) > 0) cap.negate();
    planes.push(cap);
  }
  return planes;
}

for (const layout of ['r4', 'boxer4', 'v6', 'v8']) for (const concept of ['otto', 'diesel']) {
  test(layout + ' ' + concept + ' carries separated lanes inside every cast junction and coupling', () => {
    const graph = buildPlumbing(buildEngineProfile(layout, concept));
    if (graph.throttle) setThrottleOpening(graph.throttle, 1);
    const { joints, ports } = preparePassages(graph);
    const expected = new Set(), visited = new Set();
    for (const [key, ends] of ports) {
      for (const a of ends.filter(p => !p.atStart)) for (const b of ends.filter(p => p.atStart)) {
        expected.add(a.edge.from + '/' + key + '/' + b.edge.to);
      }
    }
    const lane = { laneX: 0, laneZ: 0 };
    const out = new Vector3(), center = new Vector3();
    function check(inRoute, i, outRoute, k) {
      const a = inRoute.edges[i], b = outRoute.edges[k], key = a.to;
      assert.equal(b.from, key);
      const turn = a.from + '/' + key + '/' + b.to;
      if (visited.has(turn)) return;
      visited.add(turn);
      const joint = joints.get(key);
      const planes = joint.rings ? fittingPlanes(joint) : [];
      const arrive = inRoute.stops[i];
      const depart = k ? outRoute.stops[k-1] : 0;
      const duration = (r, n) => r.stops[n] - (n ? r.stops[n-1] : 0);
      const inbound = duration(inRoute, i) * (1 - (a.last ?? a.count) / a.count);
      const outbound = duration(outRoute, k) * (b.first ?? 0) / b.count;
      function sample(t, target) {
        if (t < 0) trace(inRoute, (arrive + t * inbound) / inRoute.duration, lane, target);
        else trace(outRoute, (depart + t * outbound) / outRoute.duration, lane, target);
      }
      const bore = Math.min(a.radius, b.radius);
      const minSpread = Math.min(0.23 * bore, 0.65 * (bore * Math.cos(Math.PI / DUCT_SIDES) - TRACER_SIZE / 2));
      for (let row = joint.rings ? -8 : 0; row <= (joint.rings ? 8 : 0); row++) {
        const t = row / 8;
        lane.laneX = lane.laneZ = 0;
        sample(t, center);
        for (let n = 0; n < 24; n++) {
          const angle = n * Math.PI / 12;
          lane.laneX = 0.74 * Math.cos(angle);
          lane.laneZ = 0.74 * Math.sin(angle);
          sample(t, out);
          const spread = out.distanceTo(center);
          assert.ok(spread > minSpread, turn + ' pinched a lane');
          if (joint.rings) {
            for (const plane of planes) assert.ok(plane.distanceToPoint(out) < 2e-6, turn + ' escaped fitting');
          } else {
            assert.ok(out.distanceTo(new Vector3(...graph.nodes[key])) <= joint.radius * Math.cos(Math.PI/12) + 1e-6);
            assert.ok(Math.abs(out.clone().sub(center).dot(joint.axis)) < 1e-6, turn + ' left flange plane');
          }
          if (row === 0) {
            const before = new Vector3();
            trace(inRoute, arrive / inRoute.duration, lane, before);
            assert.ok(out.distanceTo(before) < 2e-6, turn + ' jumps at flow hand-off');
          }
        }
      }
    }
    for (const c of graph.cylinders) for (const s of c.seats) {
      const r = routesForSeat(graph, c, s, 0);
      for (const route of [r.air, r.fuel, r.port, r.tail, r.hp, r.lp].filter(Boolean)) {
        for (let i = 1; i < route.edges.length; i++) check(route, i-1, route, i);
      }
      if (r.port) check(r.fuel, r.fuel.edges.length-1, r.port, 0);
    }
    assert.deepEqual(visited, expected);
  });
}
