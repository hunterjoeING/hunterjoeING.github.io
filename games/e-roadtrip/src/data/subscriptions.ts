import { ChargerNetwork, SubscriptionSpec } from '../types';

/**
 * Roaming is a fixed €/kWh rate per provider. Tariff tier (EnBW M vs L, etc.)
 * does not change it. HPC roaming sits roughly in the 0.69–0.89 €/kWh band.
 */
export const PROVIDER_ROAMING_EUR_PER_KWH: Record<ChargerNetwork, number> = {
  tesla: 0.61,
  enbw: 0.79,
  ewego: 0.75,
  electra: 0.84,
  ionity: 0.89,
  ac_village: 0.69,
  fastned: 0.79,
  totalenergies: 0.75,
  ac_dorfladen: 0.29,
  atlante: 0.69,
  vianeo: 0.72
};

export function roamingPriceForProvider(provider: SubscriptionSpec['provider']): number | null {
  if (provider === 'adhoc') return null;
  return PROVIDER_ROAMING_EUR_PER_KWH[provider];
}

export const SUBSCRIPTIONS: SubscriptionSpec[] = [
  {
    id: 'adhoc',
    name: 'Ohne Abo (Ad-hoc / Kreditkarte)',
    provider: 'adhoc',
    monthlyFeeEur: 0,
    tripShareFeeEur: 0,
    pricePerKwhOwn: 0.72,
    pricePerKwhRoaming: 0.79,
    bestFor: 'Spontanes Laden ohne Grundgebühr, aber teuer pro kWh.',
    description: 'Immer aktiv und nicht abwählbar. Keine Grundgebühr, der Säulen-Ad-hoc-Preis liegt meist bei 0,69–0,89 €/kWh.'
  },
  {
    id: 'tesla_suc',
    name: 'Tesla Supercharger Pass',
    provider: 'tesla',
    monthlyFeeEur: 9.99,
    tripShareFeeEur: 3.5,
    pricePerKwhOwn: 0.41,
    pricePerKwhRoaming: PROVIDER_ROAMING_EUR_PER_KWH.tesla,
    specialPerk: 'tesla_native',
    teslaFreeIncluded: true,
    bestFor: 'Viele Stalls, quasi kein Defektrisiko. Für Tesla-Fahrer automatisch gratis & Bestpreis!',
    description: 'Mit Tesla automatisch ohne Monatsgebühr inklusive (0,39–0,43 €/kWh). Model S lädt an Superchargern für 0,00 €. Für Fremdmarken 9,99 €/Monat, Roaming etwa 0,20 €/kWh über dem Abo-Preis (0,61 €). 800-V-Autos bleiben an der 400-V-Säule auf 150 kW begrenzt.'
  },
  {
    id: 'enbw_m',
    name: 'EnBW mobility+ M',
    provider: 'enbw',
    monthlyFeeEur: 5.99,
    tripShareFeeEur: 2.2,
    pricePerKwhOwn: 0.49,
    pricePerKwhRoaming: PROVIDER_ROAMING_EUR_PER_KWH.enbw,
    bestFor: 'Starke Autobahn-Abdeckung (EnBW-Hubs) bei geringer Grundgebühr.',
    description: '0,49 €/kWh an EnBW. Roaming ist fest 0,79 €/kWh – identisch mit Tarif L, das Abo-Level ändert den Roamingpreis nicht.'
  },
  {
    id: 'enbw_l',
    name: 'EnBW mobility+ L',
    provider: 'enbw',
    monthlyFeeEur: 17.99,
    tripShareFeeEur: 5.5,
    pricePerKwhOwn: 0.39,
    pricePerKwhRoaming: PROVIDER_ROAMING_EUR_PER_KWH.enbw,
    bestFor: 'Vielfahrer auf deutschen Autobahnen: bester EnBW-kWh-Preis (0,39 €).',
    description: 'Höhere Grundgebühr, 0,39 €/kWh im eigenen Netz. Roaming bleibt 0,79 €/kWh wie bei Tarif M.'
  },
  {
    id: 'ewe_go',
    name: 'EWE Go (inkl. McDonald’s Partner)',
    provider: 'ewego',
    monthlyFeeEur: 0,
    tripShareFeeEur: 0,
    pricePerKwhOwn: 0.52,
    pricePerKwhRoaming: PROVIDER_ROAMING_EUR_PER_KWH.ewego,
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
    pricePerKwhRoaming: PROVIDER_ROAMING_EUR_PER_KWH.electra,
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
    pricePerKwhRoaming: PROVIDER_ROAMING_EUR_PER_KWH.ionity,
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
    pricePerKwhRoaming: PROVIDER_ROAMING_EUR_PER_KWH.ac_village,
    specialPerk: 'ac_rural',
    bestFor: 'Langsame 11/22-kW-Dorflader in Schottland, Alpen & ländlichen Regionen.',
    description: 'Verhindert Wucherpreise an AC-Säulen abseits der Autobahn.'
  },
  {
    id: 'atlante_go',
    name: 'Atlante Go',
    provider: 'atlante',
    monthlyFeeEur: 4.99,
    tripShareFeeEur: 1.7,
    pricePerKwhOwn: 0.29,
    pricePerKwhRoaming: PROVIDER_ROAMING_EUR_PER_KWH.atlante,
    bestFor: 'Frankreich: 0,29 €/kWh an Atlante-HPC statt 0,54 € Ad-hoc.',
    description:
      'Aktionspreis 4,99 €/Monat (regulär 9,99 €) für Abschlüsse bis 31.12.2026, 0,29 €/kWh an Atlante in Frankreich. Quelle: atlante.energy/fr/myatlante-app. Ad-hoc DC 0,54 €/kWh nach meilleurecharge.fr, Stand Oktober 2026.'
  },
  {
    id: 'vianeo_pass',
    name: 'ENGIE Vianeo',
    provider: 'vianeo',
    monthlyFeeEur: 0,
    tripShareFeeEur: 0,
    pricePerKwhOwn: 0.33,
    pricePerKwhRoaming: PROVIDER_ROAMING_EUR_PER_KWH.vianeo,
    bestFor: 'Französische Autobahn: 0,33 €/kWh mit Abo, ab 0,54 € ohne.',
    description:
      'Mit Abonnement 0,33 €/kWh, ohne Abonnement ab 0,54 €/kWh auf Autobahnen, Kartenzahlung ab 0,60 €/kWh (Durchschnitt Karte 0,59 €). Eine feste Monatspauschale weist die Tarifseite nicht aus, im Spiel daher 0 €. Quelle: engie-vianeo.com/tarifs-recharge-voiture-electrique, Stand November 2026.'
  }
];

export function getSubscriptionById(id: string): SubscriptionSpec {
  return SUBSCRIPTIONS.find(s => s.id === id) || SUBSCRIPTIONS[0];
}
