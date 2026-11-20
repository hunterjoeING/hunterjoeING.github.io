import { SubscriptionSpec } from '../types';

export const SUBSCRIPTIONS: SubscriptionSpec[] = [
  {
    id: 'adhoc',
    name: 'Ohne Abo (Ad-hoc / Kreditkarte)',
    provider: 'adhoc',
    monthlyFeeEur: 0,
    tripShareFeeEur: 0,
    pricePerKwhOwn: 0.72,
    pricePerKwhRoaming: 0.75,
    bestFor: 'Spontanes Laden ohne Grundgebühr, aber teuer pro kWh.',
    description: 'Immer aktivierbar. Kostet nichts monatlich, schlägt aber mit 0,69–0,79 €/kWh zu Buche.'
  },
  {
    id: 'tesla_suc',
    name: 'Tesla Supercharger Pass',
    provider: 'tesla',
    monthlyFeeEur: 9.99,
    tripShareFeeEur: 3.5,
    pricePerKwhOwn: 0.41,
    pricePerKwhRoaming: 0.72,
    specialPerk: 'tesla_native',
    teslaFreeIncluded: true,
    bestFor: 'Viele Stalls, quasi kein Defektrisiko. Für Tesla-Fahrer automatisch gratis & Bestpreis!',
    description: 'Mit Tesla automatisch ohne Monatsgebühr inklusive (0,39–0,43 €/kWh). Für Fremdmarken 9,99 €/Monat.'
  },
  {
    id: 'enbw_m',
    name: 'EnBW mobility+ M',
    provider: 'enbw',
    monthlyFeeEur: 5.99,
    tripShareFeeEur: 2.2,
    pricePerKwhOwn: 0.49,
    pricePerKwhRoaming: 0.59,
    bestFor: 'Starke Autobahn-Abdeckung (EnBW-Hubs + Roaming) bei geringer Grundgebühr.',
    description: '0,49 €/kWh an EnBW-Schnellladern, solides Roaming an Fremdsäulen.'
  },
  {
    id: 'enbw_l',
    name: 'EnBW mobility+ L',
    provider: 'enbw',
    monthlyFeeEur: 17.99,
    tripShareFeeEur: 5.5,
    pricePerKwhOwn: 0.39,
    pricePerKwhRoaming: 0.52,
    bestFor: 'Vielfahrer auf deutschen Autobahnen: bester EnBW-kWh-Preis (0,39 €).',
    description: 'Höhere Grundgebühr, lohnt sich ab ~90 kWh auf langen Tagestrips.'
  },
  {
    id: 'ewe_go',
    name: 'EWE Go (inkl. McDonald’s Partner)',
    provider: 'ewego',
    monthlyFeeEur: 0,
    tripShareFeeEur: 0,
    pricePerKwhOwn: 0.52,
    pricePerKwhRoaming: 0.62,
    specialPerk: 'mcdonalds_comfort',
    bestFor: '0 € Grundgebühr + McDonald’s-Ladeparks mit WC/Snack-Bonus (-10 Stress!).',
    description: 'Kein Monatsbeitrag! Starkes Ladenetz direkt bei McDonald’s – senkt Kinder-/Partner-Stress.'
  },
  {
    id: 'electra_plus',
    name: 'Electra+ Fast Pass',
    provider: 'electra',
    monthlyFeeEur: 9.99,
    tripShareFeeEur: 3.5,
    pricePerKwhOwn: 0.41,
    pricePerKwhRoaming: 0.60,
    specialPerk: 'fast_hubs',
    bestFor: 'Moderne 300–400 kW Urban/Autobahn-Hubs mit Buchungs-Sicherheit.',
    description: '0,41 €/kWh an Electra-Hubs (z. B. Hannover/Ruhrgebiet), niedrige Belegungsquote.'
  },
  {
    id: 'ionity_passport',
    name: 'IONITY Passport Power',
    provider: 'ionity',
    monthlyFeeEur: 11.99,
    tripShareFeeEur: 4.0,
    pricePerKwhOwn: 0.39,
    pricePerKwhRoaming: 0.64,
    specialPerk: 'fast_hubs',
    bestFor: '350-kW-Autobahnkorridor quer durch Europa für 800V-Fahrzeuge.',
    description: 'Ideal für Kia EV6, Porsche Taycan und europäische Fernstrecken.'
  },
  {
    id: 'ac_rural_pass',
    name: 'Euro-AC Dorf & Stadt Pass',
    provider: 'ac_village',
    monthlyFeeEur: 3.99,
    tripShareFeeEur: 1.5,
    pricePerKwhOwn: 0.46,
    pricePerKwhRoaming: 0.58,
    specialPerk: 'ac_rural',
    bestFor: 'Langsame 11/22-kW-Dorflader in Schottland, Alpen & ländlichen Regionen.',
    description: 'Verhindert Wucherpreise an AC-Säulen abseits der Autobahn.'
  }
];

export function getSubscriptionById(id: string): SubscriptionSpec {
  return SUBSCRIPTIONS.find(s => s.id === id) || SUBSCRIPTIONS[0];
}
