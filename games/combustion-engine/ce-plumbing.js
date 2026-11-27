import { CAM_Z, SEAT_Y, intakeSign } from './ce-mechanics.js?v=0.5.1';
import { INTAKE_RADIUS, setThrottleOpening } from './ce-throttle.js?v=0.5.1';

export function bankPoint(angle, crankY, x, y, z) {
  const a = angle * Math.PI / 180;
  return [x, crankY + y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
}

export function buildPlumbing(profile) {
  const { layout, concept } = profile;
  const diesel = concept.directInjection;
  const y0 = layout.id === 'boxer4' ? -0.35 : -1.45;
  const fx = layout.flywheelX;
  const nodes = {}, edges = [], devices = [], cylinders = [];
  let throttle = null;
  function node(id, xyz) {
    nodes[id] = xyz;
    return id;
  }
  function edge(from, to, part, radius, speed, via = [], kind = 'pipe') {
    const e = { from, to, part, radius, speed, kind, points: [nodes[from], ...via, nodes[to]] };
    edges.push(e);
    return e;
  }
  function device(type, part, from, to, size) {
    devices.push({ type, part, from, to, size });
  }
  const inlet = 'intakeManifold', exhaust = 'exhaustManifold';
  const fuel = diesel ? 'commonRail' : 'portInjectors';
  const cx = fx + 1.40, hx = cx + 0.80, ty = 1.35, tz = 2.0;
  const headerY = layout.id === 'boxer4' ? 2.15 : 3.10;
  node('distribution', [fx + 0.28, headerY, -0.55]);
  node('collector', [fx + 0.55, 0.63, 2.88]);
  node('tail', [hx + 0.75, -2.30, -1.55]);
  node('pump', [fx - 0.62, headerY + 1.05, -0.55]);

  if (diesel) {
    const turbo = 'turbocharger', cooler = 'intercooler';
    node('filterMouth', [cx - 0.55, ty, tz + 2.05]);
    node('filterBack', [cx - 0.55, ty, tz + 1.55]);
    node('lpMix', [cx - 0.55, ty, tz + 0.88]);
    node('compressorIn', [cx - 0.25, ty, tz]);
    node('compressorOut', [cx, ty + 0.34, tz - 0.56]);
    node('coolerIn', [cx, ty + 0.34, 0.65]);
    node('coolerOut', [cx, ty + 0.34, -0.55]);
    node('hpMix', [cx, headerY, -1.22]);
    node('hpTap', [hx, 0.84, tz + 1.23]);
    node('turbineIn', [hx, ty + 0.34, tz + 0.56]);
    node('turbineOut', [hx + 0.25, ty, tz]);
    node('dpfIn', [hx + 0.75, 0.45, tz]);
    node('dpfOut', [hx + 0.75, -0.56, tz]);
    node('lpTap', [hx + 0.75, -1.12, tz]);
    edge('filterMouth', 'filterBack', inlet, 0.23, 1);
    edge('filterBack', 'lpMix', inlet, 0.22, 1);
    edge('lpMix', 'compressorIn', inlet, 0.19, 1.1, [[cx - 0.55, ty, tz]]);
    edge('compressorIn', 'compressorOut', turbo, 0.12, 1.2,
      [[cx, ty, tz], [cx, ty + 0.18, tz + 0.13], [cx, ty + 0.34, tz]], 'housing');
    edge('compressorOut', 'coolerIn', cooler, 0.17, 0.76);
    edge('coolerIn', 'coolerOut', cooler, 0.21, 0.56);
    edge('coolerOut', 'hpMix', cooler, 0.18, 0.67, [[cx, ty + 0.34, -1.22]]);
    edge('hpMix', 'distribution', inlet, 0.21, 0.69, [[cx, headerY, -0.55]]);
    edge('collector', 'hpTap', exhaust, 0.21, 1.05, [[hx - 0.34, 0.63, tz + 1.23]]);
    edge('hpTap', 'turbineIn', exhaust, 0.17, 1.25, [[hx, ty + 0.34, tz + 0.95]]);
    edge('turbineIn', 'turbineOut', turbo, 0.12, 1.5,
      [[hx, ty + 0.34, tz], [hx, ty + 0.15, tz - 0.16], [hx, ty, tz]], 'housing');
    edge('turbineOut', 'dpfIn', exhaust, 0.20, 1.85, [[hx + 0.75, ty, tz]]);
    edge('dpfIn', 'dpfOut', 'dpf', 0.24, 1.3);
    edge('dpfOut', 'lpTap', exhaust, 0.21, 1.6);
    edge('lpTap', 'tail', exhaust, 0.21, 1.6, [[hx + 0.75, -2.30, tz]]);
    device('filter', inlet, 'filterMouth', 'filterBack', 0.32);
    device('compressor', turbo, 'compressorIn', 'compressorOut', 0.43);
    device('turbine', turbo, 'turbineIn', 'turbineOut', 0.43);
    device('fins', cooler, 'coolerIn', 'coolerOut', 0.36);
    device('filterDPF', 'dpf', 'dpfIn', 'dpfOut', 0.32);

    // Short high-pressure bypass above the turbo, long clean-gas return below it.
    node('hpCoolIn', [hx, headerY + 0.48, 2.62]);
    node('hpCoolOut', [hx, headerY + 0.48, 1.65]);
    node('hpValve', [hx, headerY + 0.48, 1.26]);
    edge('hpTap', 'hpCoolIn', 'hpEgr', 0.105, 0.79, [[hx, 0.84, tz + 1.75], [hx, headerY + 0.48, tz + 1.75]]);
    edge('hpCoolIn', 'hpCoolOut', 'hpEgr', 0.11, 0.65);
    edge('hpCoolOut', 'hpValve', 'hpEgr', 0.105, 0.81);
    edge('hpValve', 'hpMix', 'hpEgr', 0.105, 0.81, [[hx, headerY + 0.48, -1.22]]);
    node('lpCoolIn', [cx + 0.48, -1.12, tz + 2.24]);
    node('lpCoolOut', [cx - 0.5, -1.12, tz + 2.24]);
    node('lpValve', [cx - 0.90, -1.12, tz + 2.24]);
    edge('lpTap', 'lpCoolIn', 'lpEgr', 0.115, 1.05, [[hx + 0.75, -1.12, tz + 2.24]]);
    edge('lpCoolIn', 'lpCoolOut', 'lpEgr', 0.12, 0.78);
    edge('lpCoolOut', 'lpValve', 'lpEgr', 0.115, 0.94);
    edge('lpValve', 'lpMix', 'lpEgr', 0.115, 0.94,
      [[cx - 0.90, ty + 0.72, tz + 2.24], [cx - 0.55, ty + 0.72, tz + 0.88]]);
    for (const p of ['hp', 'lp']) {
      device('fins', p + 'Egr', p + 'CoolIn', p + 'CoolOut', 0.19);
      device('valve', p + 'Egr', p + 'CoolOut', p + 'Valve', 0.13);
    }
  } else {
    node('filterMouth', [fx + 0.95, headerY, -3.06]);
    node('filterBack', [fx + 0.95, headerY, -2.55]);
    node('throttle', [fx + 0.95, headerY, -1.62]);
    edge('filterMouth', 'filterBack', inlet, 0.23, 1);
    throttle = { center: nodes.throttle };
    setThrottleOpening(throttle, 0);
    edge('filterBack', 'throttle', inlet, INTAKE_RADIUS, 1).throttle = throttle;
    edge('throttle', 'distribution', inlet, INTAKE_RADIUS, 0.9, [[fx + 0.95, headerY, -0.55]]).throttle = throttle;
    device('filter', inlet, 'filterMouth', 'filterBack', 0.32);
    device('throttle', inlet, 'filterBack', 'throttle', INTAKE_RADIUS);
    edge('collector', 'tail', exhaust, 0.21, 1.45,
      [[hx, 0.63, 2.88], [hx + 0.75, -0.6, 2.88], [hx + 0.75, -2.30, tz]]);
  }

  layout.bankAnglesDeg.forEach((angle, b) => {
    const sign = intakeSign(angle);
    const local = (x, y, z) => bankPoint(angle, y0, x, y, z * sign);
    const specs = layout.cylinderSpecs.filter(c => c.bankIndex === b).sort((a, b) => b.x - a.x);
    let supply = 'distribution', returnNode = 'collector', rail = 'pump';
    for (const [i, spec] of specs.entries()) {
      const { x, index: c } = spec;
      const intake = node('in' + c, local(x, 3.80, 1.58));
      const out = node('out' + c, local(x, 3.58, -1.65));
      const feed = node('rail' + c, diesel ? local(x, 5.34, 0.66) : local(x, 4.32, 1.21));
      edge(supply, intake, inlet, 0.19, 0.78, i ? [] : [local(fx - 0.18, 3.80, 1.58)]);
      edge(out, returnNode, exhaust, 0.18, 1.12, i ? [] : [local(fx + 0.27, 3.58, -1.65)]);
      const feedBend = local(fx - 0.65, diesel ? 5.34 : 4.32, diesel ? 0.66 : 1.21);
      const feedPath = [[fx - 0.65, headerY + 1.04, feedBend[2]], feedBend];
      edge(rail, feed, fuel, 0.077, 0.44, i ? [] : feedPath);
      supply = intake;
      returnNode = out;
      rail = feed;
      const nozzle = node('nozzle' + c, diesel ? local(x, SEAT_Y - 0.018, 0) : local(x, 3.68, 1.11));
      const fork = node('fork' + c, local(x, 3.60, 0.65));
      const merge = node('merge' + c, local(x, 3.60, -0.65));
      if (diesel) {
        edge(intake, fork, inlet, 0.14, 1.14, [local(x, 3.72, 1.05)]);
        const union = node('union' + c, local(x, 5.04, 0));
        edge(feed, union, fuel, 0.039, 1.24, [local(x, 5.52, 0.30)]);
        edge(union, nozzle, fuel, 0.028, 1.45, [], 'injector');
      } else {
        edge(intake, nozzle, inlet, 0.14, 1.12);
        edge(nozzle, fork, inlet, 0.14, 1.12);
        edge(feed, nozzle, fuel, 0.056, 1.25, [], 'nozzle');
      }
      edge(merge, out, exhaust, 0.14, 1.32, [local(x, 3.69, -1.02)]);
      const seats = [];
      for (const side of [-1, 1]) {
        const dx = 0.20 * side;
        // Follow the inboard edge of the valve curtain, outside the moving disc.
        const enter = node('enter' + c + '/' + side, local(x + dx, SEAT_Y - 0.012, CAM_Z - 0.155));
        const leave = node('leave' + c + '/' + side, local(x + dx, SEAT_Y - 0.012, -CAM_Z + 0.155));
        edge(fork, enter, inlet, 0.088, 1.38, [local(x + dx, 3.53, 0.36)]);
        edge(leave, merge, exhaust, 0.088, 1.55, [local(x + dx, 3.53, -0.36)]);
        seats.push({ enter, leave });
      }
      cylinders[c] = { spec, nozzle, seats, sign };
    }
  });
  return { nodes, edges, devices, cylinders, diesel, throttle, y0 };
}

// Directed passages are selected once per build. Reaching a valve terminates
// this search. Chamber residence and combustion have their own crank-angle clock.
export function passage(graph, from, to, allowEgr = '') {
  if (from === to) return [];
  const queue = [[from, []]], visited = new Set([from]);
  for (let i = 0; i < queue.length; i++) {
    const [current, path] = queue[i];
    for (const e of graph.edges) {
      if (e.from !== current || visited.has(e.to)) continue;
      if (e.part.endsWith('Egr') && e.part !== allowEgr) continue;
      const next = [...path, e];
      if (e.to === to) return next;
      visited.add(e.to);
      queue.push([e.to, next]);
    }
  }
  throw new Error('Disconnected engine passage: ' + from + ' → ' + to);
}
