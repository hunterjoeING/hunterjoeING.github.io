import type { EventChoice, GameEventDef, PassName, RegenMode } from '../types';
import {
  CHAIN_CHECK_FINE_EUR, CHAIN_CHECK_MINUTES, CHAIN_CHECK_STRESS, CHAIN_FITTING_MINUTES
} from '../sim/AlpineDriving';
import { BRAKE_COOLDOWN_MINUTES, BRAKE_OVERHEAT_STRESS, REGEN_MODES } from '../sim/AlpineDescent';

function choice(
  id: string, label: string, hint: string, resultText: string, effects: Partial<EventChoice> = {}
): EventChoice {
  return {
    id, label, hint, resultText, timeDeltaMin: 0, socDeltaPct: 0, costDeltaEur: 0,
    stressDelta: 0, decisionPoints: 0, ...effects
  };
}

export function chainFittingChoice(): EventChoice {
  return choice('fit_chains', 'In der Bucht Ketten aufziehen', `+${CHAIN_FITTING_MINUTES} Min · Mehr Halt in den Kehren`,
    'Beide Schneeketten sitzen. Auf Schnee hast du vollen Grip. Auf Glatteis bleibt der Bremsweg länger.',
    { timeDeltaMin: CHAIN_FITTING_MINUTES });
}

export function buildChainRequirement(name: PassName): GameEventDef {
  return {
    id: 'evt_chain_requirement', title: `Kettenpflicht · ${name}`, category: 'traffic', icon: '⛓️',
    description: 'Ab hier sind Schneeketten vorgeschrieben. Vor der ersten Kehre gibt es eine Haltebucht.',
    choices: [
      { ...chainFittingChoice(), resultText: 'Du hältst in der Bucht. Raste die beiden Ketten ein, bevor du losfährst.' },
      choice('skip_chains', 'Ohne Ketten weiter', 'Deutlich weniger Grip · Polizeikontrolle möglich',
        'Fahr vorsichtig. Auf Eis schiebt der Wagen beim Lenken nach außen.')
    ]
  };
}

export const CHAIN_CHECK_EVENT: GameEventDef = {
  id: 'evt_chain_check', title: 'Polizeikontrolle am Pass', category: 'police', icon: '🚓',
  description: 'Die Polizei kontrolliert am Passausgang die Schneeketten. Du bist ohne Ketten hochgefahren.',
  choices: [choice('chain_fine', 'Kontrolle abwarten',
    `${CHAIN_CHECK_FINE_EUR} € Bußgeld · +${CHAIN_CHECK_MINUTES} Min · +${CHAIN_CHECK_STRESS} Stress`,
    `Die Kontrolle kostet ${CHAIN_CHECK_FINE_EUR} € und ${CHAIN_CHECK_MINUTES} Min.`,
    { fineDeltaEur: CHAIN_CHECK_FINE_EUR, timeDeltaMin: CHAIN_CHECK_MINUTES, stressDelta: CHAIN_CHECK_STRESS })]
};

const regenHints: Record<RegenMode, [string, string]> = {
  coast: ['Wenig Rekuperation · Bremsen werden schneller heiß', 'Du segelst bergab. Die Bremsen übernehmen den größten Teil der Verzögerung.'],
  normal: ['Mittlere Rekuperation und Bremswirkung', 'Du fährst mit mittlerer Rekuperation bergab.'],
  strong: ['Stärkste Rekuperation · Entlastet die Bremsen', 'Du rekuperierst so stark, wie es der Akkustand zulässt.']
};

export const REGEN_EVENT: GameEventDef = {
  id: 'evt_regen_mode', title: 'Rekuperation bergab', category: 'traffic', icon: '🔋',
  description: 'Wähle die Rekuperation für das Gefälle. Bei fast vollem Akku passt kaum noch Energie hinein. Dann müssen die Bremsen mehr arbeiten.',
  choices: (Object.keys(REGEN_MODES) as RegenMode[]).map(mode => choice(mode, REGEN_MODES[mode].label, ...regenHints[mode]))
};

export const BRAKE_OVERHEAT_EVENT: GameEventDef = {
  id: 'evt_brake_overheat', title: 'Bremsen überhitzt', category: 'traffic', icon: '🌡️',
  description: 'Die Bremsen sind im Gefälle zu heiß geworden. Halte in der nächsten Bucht und lass sie abkühlen.',
  choices: [choice('cool_brakes', 'Bremsen abkühlen lassen',
    `+${BRAKE_COOLDOWN_MINUTES} Min · +${BRAKE_OVERHEAT_STRESS} Stress`,
    `Nach ${BRAKE_COOLDOWN_MINUTES} Min sind die Bremsen wieder einsatzbereit.`,
    { timeDeltaMin: BRAKE_COOLDOWN_MINUTES, stressDelta: BRAKE_OVERHEAT_STRESS })]
};
