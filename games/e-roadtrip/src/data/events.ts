import { GameEventDef, WifeDialogueDef } from '../types';

export const GAME_EVENTS: Record<string, GameEventDef> = {
  evt_accident_help: {
    id: 'evt_accident_help',
    title: 'Auffahrunfall auf der Nebenspur',
    category: 'accident',
    icon: '🚑',
    description:
      'Auf dem Standstreifen der A2 hat ein Kleinwagen eine Panne/Kollision mit Warnblinker, noch kein Rettungswagen vor Ort. Du kannst anhalten, absichern und Erste Hilfe leisten.',
    choices: [
      {
        id: 'help_stop',
        label: 'Anhalten, Warndreieck aufstellen & helfen',
        hint: '+22 Dynamik-Punkte · -14 Min Zeit · -2 % Akku (Warnblinker/Heizung)',
        timeDeltaMin: 14,
        socDeltaPct: -2,
        costDeltaEur: 0,
        stressDelta: 4,
        decisionPoints: 22,
        resultText: 'Vorbildlich! Der Fahrer ist unverletzt, die Polizei übernimmt nach 14 Minuten. Starke Aktion!'
      },
      {
        id: 'help_call',
        label: 'Notruf 112 per Freisprecheinrichtung absetzen & weiterrollen',
        hint: '+8 Dynamik-Punkte · +2 Min Zeit',
        timeDeltaMin: 2,
        socDeltaPct: 0,
        costDeltaEur: 0,
        stressDelta: 1,
        decisionPoints: 8,
        resultText: 'Du meldest den genauen Autobahnkilometer sofort an die Leitstelle.'
      }
    ]
  },

  evt_stau_kamen: {
    id: 'evt_stau_kamen',
    title: 'Vollsperrung / Stau vor dem Kreuz',
    category: 'traffic',
    icon: '🚧',
    description:
      'Vor dir stehen 8 km Rückstau wegen einer Tagesbaustelle. Das Navi schlägt eine Umleitung über kurvige Landstraßen (B1/B61) vor.',
    choices: [
      {
        id: 'wait_jam',
        label: 'Im Stau bleiben & Rekuperation nutzen',
        hint: '+24 Min Zeit · geringer Verbrauch · +14 Stress',
        timeDeltaMin: 24,
        socDeltaPct: -1,
        costDeltaEur: 0,
        stressDelta: 14,
        decisionPoints: 4,
        resultText: 'Stop-and-Go kostet 24 Minuten Nerven, aber der Verbrauch bleibt im Schneckentempo minimal.'
      },
      {
        id: 'detour_country',
        label: 'Umleitung über die Landstraße (80 km/h)',
        hint: '+11 Min Zeit · -3 % Akku (Mehrkilometer) · -2 Stress',
        timeDeltaMin: 11,
        socDeltaPct: -3,
        costDeltaEur: 0,
        stressDelta: -2,
        decisionPoints: 16,
        resultText: 'Gute Entscheidung! Über die Dörfer rollst du flüssig am Stau vorbei und sparst 13 Minuten.'
      }
    ]
  },

  evt_rain_front: {
    id: 'evt_rain_front',
    title: 'Starkregen-Front im Weserbergland',
    category: 'traffic',
    icon: '🌧️',
    description:
      'Dichter Regen setzt ein. Der Rollwiderstand steigt und die Scheibenwischer laufen auf Hochtouren (+12 % Verbrauch bei hohem Tempo).',
    choices: [
      {
        id: 'slow_cruise',
        label: 'Richtgeschwindigkeit auf 115 km/h senken',
        hint: 'Sicher & effizient · +8 Effizienz-Punkte · -6 Stress',
        timeDeltaMin: 5,
        socDeltaPct: 2,
        costDeltaEur: 0,
        stressDelta: -6,
        decisionPoints: 14,
        adjustSpeedKmh: 115,
        resultText: 'Vernünftig! Bei 115 km/h schwimmt nichts auf und der Akku dankt es dir spürbar.'
      },
      {
        id: 'push_through',
        label: 'Reisetempo beibehalten',
        hint: 'Kein Zeitverlust · -4 % Extra-Akku · +10 Stress',
        timeDeltaMin: 0,
        socDeltaPct: -4,
        costDeltaEur: 0,
        stressDelta: 10,
        decisionPoints: 2,
        resultText: 'Du hältst den Schnitt hoch, aber die Verbrauchsanzeige klettert merklich nach oben.'
      }
    ]
  },

  evt_wc_coffee: {
    id: 'evt_wc_coffee',
    title: 'Kaffee- & WC-Bedarf an Bord',
    category: 'family',
    icon: '☕',
    description:
      'Nach zweieinhalb Stunden auf der Autobahn meldet sich der Harndrang. Eine Raststätte mit Schnelllader liegt direkt voraus.',
    choices: [
      {
        id: 'quick_pitstop',
        label: 'Kurzer 8-Min-Raststätten-Stopp (ohne Laden)',
        hint: '+8 Min · 5,50 € Kaffee · -18 Stress',
        timeDeltaMin: 8,
        socDeltaPct: 0,
        costDeltaEur: 5.5,
        stressDelta: -18,
        decisionPoints: 10,
        resultText: 'Frischer Kaffee und kurze Beine-vertreten-Pause wirken Wunder für die Stimmung.'
      },
      {
        id: 'combine_charge',
        label: 'Direkt nächsten Schnelllader ansteuern',
        hint: 'Fügt Ladestopp ein · spart Gesamtzeit · -12 Stress',
        timeDeltaMin: 4,
        socDeltaPct: 0,
        costDeltaEur: 0,
        stressDelta: -12,
        decisionPoints: 16,
        insertNearestCharger: true,
        resultText: 'Clever kombiniert: Ladepause + WC auf einen Schlag!'
      },
      {
        id: 'hold_on',
        label: '„Wir halten durch bis zum nächsten Plan-Stopp!“',
        hint: '0 Min · +16 Stress',
        timeDeltaMin: 0,
        socDeltaPct: 0,
        costDeltaEur: 0,
        stressDelta: 16,
        decisionPoints: -4,
        resultText: 'Die Stimmung im Cockpit wird deutlich angespannter…'
      }
    ]
  },

  evt_speed_trap: {
    id: 'evt_speed_trap',
    title: 'Baustellen-Blitzer / Zivilstreife!',
    category: 'police',
    icon: '📸',
    description:
      'Plötzlich Tempo 100 wegen Fahrbahnschäden – dein Zieltempo war deutlich höher eingestellt!',
    requiresSpeeding: true,
    choices: [
      {
        id: 'brake_smooth',
        label: 'Sofort vom Strom & sanft auf 100 km/h rekuperieren',
        hint: 'Kein Bußgeld · +3 Min · +8 Dynamik-Punkte',
        timeDeltaMin: 3,
        socDeltaPct: 1,
        costDeltaEur: 0,
        stressDelta: 4,
        decisionPoints: 10,
        adjustSpeedKmh: 110,
        resultText: 'Rechtzeitig abgebremst – kein rotes Blitzlicht!'
      },
      {
        id: 'risk_ticket',
        label: 'Laufen lassen – vielleicht ist der Blitzer aus',
        hint: '65 % Risiko auf 70 € Bußgeld · 0 Min',
        timeDeltaMin: 0,
        socDeltaPct: 0,
        costDeltaEur: 0,
        stressDelta: 11,
        decisionPoints: -8,
        fineRisk: { probability: 0.65, amountEur: 70, label: 'Blitzer-Foto A2 (+24 km/h)' },
        resultText: 'Du hältst das Gaspedal unten…'
      }
    ]
  },

  evt_charger_defect: {
    id: 'evt_charger_defect',
    title: 'Ladesäule defekt / blockiert!',
    category: 'charger',
    icon: '🔌',
    description:
      'Am angefahrenen Ladepark zeigt eine Säule „Störung – Kommunikation fehlgeschlagen“, und ein Verbrenner blockiert eine weitere Bucht.',
    choices: [
      {
        id: 'wait_free_stall',
        label: 'Auf freiwerdenden Nachbar-Stall warten & Hotline anrufen',
        hint: '+11 Min Wartezeit · +6 Stress',
        timeDeltaMin: 11,
        socDeltaPct: 0,
        costDeltaEur: 0,
        stressDelta: 6,
        decisionPoints: 6,
        resultText: 'Nach 11 Minuten fährt ein anderer E-Fahrer weg und du kannst anstecken.'
      },
      {
        id: 'reroute_next_hub',
        label: 'Sofort weiter zum nächsten großen Ladepark',
        hint: 'Nutzt Restakku · +14 Dynamik-Punkte · Risiko bei niedrigem SoC',
        timeDeltaMin: 4,
        socDeltaPct: -4,
        costDeltaEur: 0,
        stressDelta: 8,
        decisionPoints: 14,
        insertNearestCharger: true,
        resultText: 'Du fährst zügig weiter zum Ausweich-Standort.'
      }
    ]
  },

  // Future-level ready event templates
  evt_border_nl_limit: {
    id: 'evt_border_nl_limit',
    title: 'Grenze Niederlande: Tempo 100 km/h',
    category: 'border',
    icon: '🇳🇱',
    description:
      'Willkommen in den Niederlanden! Tagsüber (06–19 Uhr) gilt strikt Tempo 100 km/h auf Autobahnen mit hohen Strafen.',
    choices: [
      {
        id: 'nl_100',
        label: 'Tempomat exakt auf 100 km/h stellen',
        hint: 'Extrem sparsam · 0 € Strafe · +12 Punkte',
        timeDeltaMin: 6,
        socDeltaPct: 4,
        costDeltaEur: 0,
        stressDelta: -4,
        decisionPoints: 12,
        adjustSpeedKmh: 100,
        resultText: 'Entspanntes Gleiten durch Holland bei Rekordverbrauch!'
      },
      {
        id: 'nl_125',
        label: 'Mit 125 km/h mitschwimmen',
        hint: '55 % Risiko auf 165 € NL-Bußgeld',
        timeDeltaMin: 0,
        socDeltaPct: -2,
        costDeltaEur: 0,
        stressDelta: 9,
        decisionPoints: -6,
        fineRisk: { probability: 0.55, amountEur: 165, label: 'Trajectcontrole Niederlande' },
        resultText: 'Hoffentlich waren die Abschnittskameras gnädig…'
      }
    ]
  },

  evt_vignette_check: {
    id: 'evt_vignette_check',
    title: 'Maut & Vignette / Pickerl-Entscheidung',
    category: 'toll',
    icon: '🎫',
    description:
      'Vor der Landesgrenze benötigst du eine Autobahn-Vignette (11,50 €). Alternativ lockt eine mautfreie Passstraße.',
    choices: [
      {
        id: 'buy_vignette',
        label: 'Digitale Vignette kaufen (11,50 €)',
        hint: 'Schnell & legal · keine Strafe',
        timeDeltaMin: 2,
        socDeltaPct: 0,
        costDeltaEur: 11.5,
        stressDelta: -3,
        decisionPoints: 10,
        resultText: 'Digital-Vignette in 2 Minuten aktiviert – freie Fahrt auf der Autobahn.'
      },
      {
        id: 'skip_vignette',
        label: 'Ohne Vignette durchschlüpfen',
        hint: '75 % Risiko auf 120 € Ersatzmaut',
        timeDeltaMin: 0,
        socDeltaPct: 0,
        costDeltaEur: 0,
        stressDelta: 15,
        decisionPoints: -10,
        fineRisk: { probability: 0.75, amountEur: 120, label: 'ASFINAG Mautkamera' },
        resultText: 'Die Kamerabrücke blitzt grün über der Spur…'
      }
    ]
  },

  evt_family_tablet: {
    id: 'evt_family_tablet',
    title: 'Rückbank-Alarm: „Sie hat mein Tablet genommen!“',
    category: 'family',
    icon: '👧',
    description:
      'Auf der Rückbank eskaliert ein Streit ums Tablet und der Hund bellt im Kofferraum.',
    requiresFamily: true,
    choices: [
      {
        id: 'family_stop',
        label: 'Kurzer Eis-/Snack-Stopp zur Schlichtung',
        hint: '+15 Min · 12 € · -24 Stress',
        timeDeltaMin: 15,
        socDeltaPct: 0,
        costDeltaEur: 12,
        stressDelta: -24,
        decisionPoints: 12,
        resultText: 'Nach 15 Minuten und zwei Kugeln Eis herrscht wieder himmlische Ruhe.'
      },
      {
        id: 'family_firm',
        label: 'Klar & ruhig ein Machtwort sprechen (weiterfahren)',
        hint: 'Nur bei niedrigem Stress sicher · 0 Min',
        timeDeltaMin: 0,
        socDeltaPct: 0,
        costDeltaEur: 0,
        stressDelta: 12,
        decisionPoints: 6,
        resultText: 'Es grummelt noch etwas hinten, aber die Fahrt geht ohne Zeitverlust weiter.'
      }
    ]
  },

  evt_carabinieri_trailer: {
    id: 'evt_carabinieri_trailer',
    title: 'Carabinieri-Kontrolle am Brenner / Italien',
    category: 'police',
    icon: '🚓',
    description:
      'Die italienische Polizei winkt dein Gespann heraus und prüft Stützlast, Anhängergewicht und Reifenprofil.',
    requiresTrailer: true,
    choices: [
      {
        id: 'polite_docs',
        label: 'Freundlich Papiere zeigen & ruhiges Gespräch auf Englisch/Italienisch',
        hint: '+10 Min · +15 Punkte · minimiert Bußgeldrisiko',
        timeDeltaMin: 10,
        socDeltaPct: 0,
        costDeltaEur: 0,
        stressDelta: 6,
        decisionPoints: 15,
        resultText: '„Tutto bene, buona strada!“ – Die Kontrolle endet freundlich ohne Bußgeld.'
      },
      {
        id: 'argue_police',
        label: 'Ungeduldig diskutieren & auf deutsche Vorschriften verweisen',
        hint: '60 % Risiko auf 180 € Vor-Ort-Strafe · +18 Stress',
        timeDeltaMin: 18,
        socDeltaPct: 0,
        costDeltaEur: 0,
        stressDelta: 18,
        decisionPoints: -12,
        fineRisk: { probability: 0.6, amountEur: 180, label: 'Verbale Carabinieri (Gespann)' },
        resultText: 'Die Carabinieri ziehen das volle Prüfprogramm durch…'
      }
    ]
  }
};

export const WIFE_DIALOGUES: Record<string, WifeDialogueDef> = {
  dlg_diesel_remark: {
    id: 'dlg_diesel_remark',
    speaker: 'Partnerin (Beifahrer / Telefon)',
    quote: '„Mit einem Diesel wäre das viel besser gegangen! Jetzt fällt der Akku und vorne staut es sich auch noch!“',
    contextHint:
      'Du kannst während dieses Dialogs rechts/unten die Alternativen auf der Karte prüfen (z. B. +15 Min Sicherheits-Zwischenladung vs. optimierte Geschwindigkeit) und dann ruhig antworten.',
    suggestedQuickStopMinutes: 14,
    choices: [
      {
        id: 'calm_confident',
        text: '„Ich verstehe dich total – schau, die Kurve ist exakt berechnet. Wenn es dir lieber ist, machen wir kurz einen 14-Min-Kaffeestopp am nächsten Schnelllader.“',
        tone: 'calming',
        stressDelta: -22,
        decisionPoints: 20,
        replyText: '„Okay… danke, dass du meine Sorge ernst nimmst und einen klaren Plan hast. Dann trinken wir kurz einen Kaffee.“'
      },
      {
        id: 'data_reassure',
        text: '„Kein Grund zur Sorge: Mit 120 km/h verbrauchen wir 25 % weniger und kommen sicher mit Puffer an. Ich habe jede Ladesäule im Blick.“',
        tone: 'confident',
        stressDelta: -14,
        decisionPoints: 16,
        replyText: '„Na gut, du hast die Zahlen im Griff. Aber fahr bitte nicht wieder unnötig 160!“'
      },
      {
        id: 'defensive_snap',
        text: '„Der Diesel hätte heute auch nicht gezaubert – die Reichweite reicht locker, vertrau mir einfach!“',
        tone: 'defensive',
        stressDelta: 14,
        decisionPoints: -10,
        replyText: '„Na toll, wehe wir bleiben nachher mit 0 % auf dem Standstreifen stehen!“'
      }
    ]
  },

  dlg_tight_buffer: {
    id: 'dlg_tight_buffer',
    speaker: 'Partnerin (Zeitdruck-Check)',
    quote: '„Wir haben kaum noch Puffer bis zum Termin! Wenn die nächste Ladesäule voll ist, wird das richtig eng!“',
    contextHint:
      'Prüfe die Belegungsrisiken der nächsten Stationen auf der Karte oder justiere dein Reisetempo.',
    suggestedQuickStopMinutes: 10,
    choices: [
      {
        id: 'proactive_plan',
        text: '„Ich habe bewusst den großen 20-Stall-Ladepark gewählt – kaum Wartezeit, und wir laden nur genau so viel, wie wir bis zum Ziel brauchen.“',
        tone: 'calming',
        stressDelta: -18,
        decisionPoints: 18,
        replyText: '„Stimmt, so verlieren wir keine Zeit beim Vollladen auf 100 %. Gute Strategie!“'
      },
      {
        id: 'speed_push',
        text: '„Dann fahren wir jetzt schneller und laden dafür später kürzer nach – das holen wir locker auf!“',
        tone: 'risky',
        stressDelta: 8,
        decisionPoints: 4,
        replyText: '„Mir wird bei dem Tempo und niedrigem Akku echt mulmig…“'
      }
    ]
  }
};

export function getEventById(id: string): GameEventDef | undefined {
  return GAME_EVENTS[id];
}

export function getWifeDialogueById(id: string): WifeDialogueDef | undefined {
  return WIFE_DIALOGUES[id];
}
