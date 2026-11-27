import { bankPoint, buildPlumbing } from './ce-plumbing.js?v=0.5.1';
import { SEAT_Y } from './ce-mechanics.js?v=0.5.1';

const topics = {
  legend: {
    name: 'Was zeigen die Kügelchen?', spec: 'Blau · Rot · Dunkelbraun', part: 'intakeManifold', port: 'in0',
    description: 'Blau steht für Luft, Rot für Kraftstoff und Dunkelbraun für Abgas. Im Gemisch siehst du rote und blaue Kügelchen nebeneinander. Engere Abstände zeigen höhere Gasdichte an, etwa beim Verdichten. Die Farben und Mengen sind schematisch.'
  },
  portInjectors: {
    name: 'Saugrohreinspritzung', shortLabel: 'Einspritzleiste', port: 'nozzle0', spec: 'Eine Düse je Zylinder',
    description: 'Im Leerlauf strömt wenig Luft am Rand der Drosselklappe vorbei. Mit dem Gaspedal öffnest du den Durchlass. Kurz vor dem Einlassventil spritzt die Düse Benzin in den Luftstrom. Beim Öffnen des Ventils strömt das Gemisch ein. Bei Volllast steigt hier der Kraftstoffanteil.'
  },
  commonRail: {
    name: 'Vom Common Rail in den Brennraum', port: 'rail0', spec: 'Hochdruckpumpe · Speicher · Injektor',
    description: 'Die Pumpe füllt das Common Rail. Kurz vor dem oberen Totpunkt spritzt der zentrale Injektor Diesel in die heiße, verdichtete Luft. Der Strahl entzündet sich nach kurzem Zündverzug selbst. Die seitliche Glühkerze unterstützt den Kaltstart.'
  },
  turbocharger: {
    name: 'Turbine und Verdichter', shortLabel: 'Turbolader', port: 'turbineIn', spec: 'Zwei Laufräder auf einer Welle',
    description: 'Im Turbineneinlass beschleunigt das heiße Abgas. Es expandiert und treibt das Turbinenrad an. Hinter der Turbine ist es weniger dicht. Auf derselben Welle saugt das Verdichterrad Frischluft an und erhöht ihren Druck.'
  },
  intercooler: {
    name: 'Warum die Ladeluft kühlen?', shortLabel: 'Ladeluftkühler', port: 'coolerIn', spec: 'Zwischen Verdichter und Saugrohr',
    description: 'Verdichten erwärmt die Luft. Der Ladeluftkühler gibt Wärme über Lamellen ab. Bei ähnlichem Druck steigt die Dichte, mehr Sauerstoff passt in den Zylinder. Die kühlere Ladung kann Temperaturspitzen und damit die Bildung von Stickoxiden mindern.'
  },
  dpf: {
    name: 'Dieselpartikelfilter', shortLabel: 'DPF', port: 'dpfIn', spec: 'Abgasnachbehandlung hinter der Turbine',
    description: 'Der DPF hält Ruß in porösen Filterwänden zurück. Das gereinigte Abgas strömt zum Auspuff oder über die Niederdruck-AGR zurück. Braun kennzeichnet auch gefiltertes Abgas.'
  },
  hpEgr: {
    name: 'Hochdruck-AGR auf kurzem Weg', shortLabel: 'HD-AGR', port: 'hpCoolOut', spec: 'Krümmer → Kühler und Ventil → Saugrohr',
    description: 'Vor der Turbine zweigt heißes Abgas ab. Das Ventil dosiert die Rückführung hinter den Ladeluftkühler. Der kurze Weg reagiert bei niedriger Last schnell. Im Warmlauf kann ein Kühlerbypass die Wärme erhalten. Abgas in der Ladung senkt Verbrennungsspitzen und NOₓ.'
  },
  lpEgr: {
    name: 'Niederdruck-AGR nach dem Filter', shortLabel: 'ND-AGR', port: 'lpCoolOut', spec: 'Nach DPF → Kühler und Ventil → vor den Verdichter',
    description: 'Kühleres, rußarmes Abgas gelangt hinter Turbine und DPF zurück zum Verdichtereinlass. Die Turbine erhält den vollen Abgasstrom dieses Pfads, auch bei höherer Last. Der lange Weg reagiert träger und kann Kondensat bilden. Euro-6-Diesel kombinieren beide Wege je nach Betriebspunkt.'
  }
};

export function flowParts(diesel) {
  const ids = diesel ? ['turbocharger', 'intercooler', 'dpf', 'hpEgr', 'lpEgr'] : ['portInjectors'];
  return ids.map((id, i) => ({
    ...topics[id], id, number: String(13 + i), category: 'Stoffwege',
    energyStage: topics[id].shortLabel
  }));
}

export function flowTour(profile, strokesAndDrive) {
  const graph = buildPlumbing(profile);
  function station(id, demoLoad) {
    const topic = topics[id], part = topic.part ?? id;
    const target = graph.nodes[topic.port];
    const intakeSide = topic.port === 'in0' || topic.port === 'nozzle0' || topic.port === 'rail0';
    const dx = intakeSide ? -3.2 : 5.6;
    const dz = target[2] < 0 ? -4.0 : intakeSide ? 4.0 : 5.4;
    // Tour-Karte liegt unten: Ziel etwas tiefer setzen, damit das Bauteil im oberen Bildteil sichtbar bleibt.
    const look = intakeSide ? target : [target[0], target[1] - 1.1, target[2]];
    return {
      id, title: topic.name, body: topic.description, focusPart: part, badge: topic.spec,
      viewMode: 'cutaway', demoRpm: 1550, demoTimeScale: 0.065, demoLoad,
      cameraTarget: look, cameraPos: [target[0] + dx, target[1] + (intakeSide ? 2.3 : 2.6), target[2] + dz]
    };
  }
  const intro = [station('legend', 0.48), station(graph.diesel ? 'commonRail' : 'portInjectors', 0.6)];
  const exhaust = graph.diesel ? [
    station('turbocharger', 0.76), station('intercooler', 0.82),
    station('dpf', 0.6), station('hpEgr', 0.18), station('lpEgr', 0.72)
  ] : [];
  // Look into the open near bank, from above on the flat boxer.
  const angle = Math.max(...profile.layout.bankAnglesDeg);
  const spec = profile.layout.cylinderSpecs.find(c => c.bankAngleDeg === angle);
  const [x, y, z] = bankPoint(angle, graph.y0, spec.x, SEAT_Y - 0.14, 0);
  const boxer = profile.layout.id === 'boxer4';
  const strokes = strokesAndDrive.slice(0, 4);
  strokes[2] = {
    ...strokes[2],
    cameraPos: [x + 0.8, y + (boxer ? 5.1 : 0.55), z + (boxer ? 2.0 : 5.3)],
    cameraTarget: [x, y - 0.52, z + (boxer ? 0.66 : 0)]
  };
  return [...intro, ...strokes, ...exhaust, ...strokesAndDrive.slice(4)]
    .map((s, i) => ({ ...s, step: i + 1 }));
}
