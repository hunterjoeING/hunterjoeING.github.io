import type { ChargerStation, EventChoice, GameEventDef } from '../types';
import {
  COLD_START_KM, QUEUE_MINUTES_PER_CAR, SNOWPLOUGH_SPEED_KMH, winterStartEffects
} from '../sim/WinterDriving';
import { TUNNEL_CLOSURE_EVENT_ID, TUNNEL_DETOUR_CHOICE_ID } from '../sim/WinterTunnel';

const precondition = winterStartEffects(true);

const choice = (id: string, label: string, hint: string, resultText: string, effects: Partial<EventChoice> = {}): EventChoice => ({
  id, label, hint, resultText, timeDeltaMin: 0, socDeltaPct: 0, costDeltaEur: 0,
  stressDelta: 0, decisionPoints: 0, ...effects
});

export const WINTER_START_EVENT: GameEventDef = {
  id: 'evt_winter_start',
  title: 'Kaltstart in München · 06:30 Uhr · −8 °C',
  icon: '❄️',
  category: 'family',
  description: 'Die Winterfahrt an den Gardasee beginnt. Vor der Abfahrt kannst du Akku und Innenraum vorwärmen.',
  choices: [
    choice('winter_precondition', 'Vorkonditionieren', `+${precondition.timeDeltaMin} Min · ${precondition.socDeltaPct} % Akku · warmer Innenraum`,
      'Akku und Innenraum sind warm. Ihr fahrt entspannt los.', precondition),
    choice('winter_cold_start', 'Kalt losfahren', `Sofort los · Mehrverbrauch auf den ersten ${COLD_START_KM} km · Kind friert`,
      'Ihr seid sofort unterwegs. Der Akku braucht noch eine Weile, bis er warm ist.', winterStartEffects(false))
  ]
};

export const WINTER_EVENTS: Record<string, GameEventDef> = {
  [WINTER_START_EVENT.id]: WINTER_START_EVENT,
  evt_child_cold: {
    id: 'evt_child_cold', title: '„Mir ist kalt“', icon: '🧣', category: 'family',
    description: 'Dein Kind zieht hinten die Jacke enger. Machst du die Heizung stärker an?',
    choices: [
      choice('winter_heat_cabin', 'Innenraum heizen', '−2 % Akku · weniger Stress',
        'Warme Luft kommt hinten an. Dein Kind entspannt sich.', { socDeltaPct: -2, stressDelta: -9, decisionPoints: 6 }),
      choice('winter_save_battery', 'Akku sparen', 'Akku unverändert · mehr Stress',
        'Dein Kind bibbert weiter und fragt, wann ihr endlich ankommt.', { stressDelta: 8, decisionPoints: -4 })
    ]
  },
  evt_inntal_ski_jam: {
    id: 'evt_inntal_ski_jam', title: 'Stau am Inntaldreieck', icon: '🚗', category: 'traffic',
    description: 'Skiurlauber stauen sich am Autobahndreieck. Über die Nebenstraße kommst du zur nächsten Auffahrt.',
    choices: [
      choice('winter_jam_wait', 'Auf der Autobahn bleiben', '+18 Min · kein Mehrverbrauch',
        'Nach 18 Minuten löst sich der Stau auf.', { timeDeltaMin: 18, stressDelta: 5 }),
      choice('winter_jam_detour', 'Über die Nebenstraße fahren', '+6 km · +9 Min · braucht Akku',
        'Nach 6 Kilometern auf der Nebenstraße bist du wieder auf der geplanten Route.',
        { timeDeltaMin: 9, winterDetourKm: 6, stressDelta: 2, decisionPoints: 3 })
    ]
  },
  evt_snowplough_convoy: {
    id: 'evt_snowplough_convoy', title: 'Schneepflug-Kolonne', icon: '🚜', category: 'traffic',
    description: 'Vor euch räumen Schneepflüge die Passstraße. Dahinter ist die Fahrbahn frisch geräumt.',
    choices: [
      choice('winter_follow_plough', 'Hinter den Schneepflügen bleiben', `12 km mit höchstens ${SNOWPLOUGH_SPEED_KMH} km/h · weniger Verbrauch und Stress`,
        'Ihr folgt der Kolonne, bis die Räumfahrzeuge abbiegen.', { snowploughKm: 12, stressDelta: -4, decisionPoints: 5 }),
      choice('winter_wait_plough', 'In der Ausbuchtung warten', '+16 Min · danach im eigenen Tempo',
        'Die Pflüge ziehen weiter. Du kannst in deinem Tempo weiterfahren.', { timeDeltaMin: 16, stressDelta: -6, decisionPoints: 3 })
    ]
  },
  evt_avalanche_closure: {
    id: 'evt_avalanche_closure', title: 'Lawinensperrung', icon: '🏔️', category: 'traffic',
    description: 'Die Passstraße ist vorübergehend gesperrt. Der Räumdienst lotst euch über eine ausgeschilderte Umleitung.',
    choices: [
      choice('winter_avalanche_detour', 'Umleitung nehmen', '+12 km · +14 Min · braucht Akku',
        'Die Umleitung führt euch hinter der Sperrung auf die Passstraße zurück.',
        { timeDeltaMin: 14, winterDetourKm: 12, stressDelta: 3, decisionPoints: 4 }),
      choice('winter_avalanche_wait', 'Auf die Freigabe warten', '+25 Min · kein Mehrverbrauch',
        'Nach 25 Minuten gibt der Räumdienst die Passstraße wieder frei.',
        { timeDeltaMin: 25, stressDelta: 1, decisionPoints: 4 })
    ]
  },
  [TUNNEL_CLOSURE_EVENT_ID]: {
    id: TUNNEL_CLOSURE_EVENT_ID,
    title: 'Tunnelsperrung im Inntal',
    icon: '🚧',
    category: 'traffic',
    description: 'Die Ampel am Tunnelportal steht auf Rot. Ihr könnt auf die Freigabe warten oder über die Landstraße fahren.',
    choices: [
      choice('winter_tunnel_wait', 'Auf die Freigabe warten', '+18 Min Wartezeit',
        'Nach 18 Minuten springt die Ampel auf Grün.', { timeDeltaMin: 18, stressDelta: 2 }),
      choice(TUNNEL_DETOUR_CHOICE_ID, 'Der Umleitung folgen', '9 km Landstraße · 12 Min · braucht Akku',
        'Hinter dem Tunnel fahrt ihr wieder auf die Autobahn.', { timeDeltaMin: 12, winterDetourKm: 9, stressDelta: 3 })
    ]
  }
};

export function buildWinterQueueEvent(
  station: ChargerStation, cars: number, canSkip: boolean, alternative?: ChargerStation
): GameEventDef {
  const minutes = cars * QUEUE_MINUTES_PER_CAR;
  const choices = [
    choice('winter_queue_wait', 'Warten', `+${minutes} Min bis zur Einfahrt`,
      `Nach ${minutes} Minuten seid ihr dran.`, { timeDeltaMin: minutes, stressDelta: 3 })
  ];
  if (canSkip) {
    choices.push(choice('winter_queue_skip', 'Weiterfahren', 'Ladestopp auslassen',
      'Ihr fahrt ohne diesen Ladestopp weiter.'));
  }
  if (alternative) {
    choices.push(choice('winter_queue_alternative', 'Langsameren Lader nehmen',
      `${alternative.name} · ${alternative.maxKw} kW`,
      `Ihr fahrt stattdessen zu „${alternative.name}“.`));
  }
  return {
    id: 'evt_winter_charger_queue',
    title: `Warteschlange · ${station.name}`,
    icon: '🔌',
    category: 'charger',
    description: `${cars} Autos warten vor euch. ${canSkip ? 'Laut Prognose ist das nächste Ziel erreichbar.' : 'Für die Weiterfahrt ohne Ladestopp reicht die Akku-Reserve laut Prognose nicht.'}`,
    choices
  };
}
