// Countries represented in the European gazetteer, including countries straddling the map.
const cityCountries = new Set((
  'AL AD AT BY BE BA BG HR CY CZ DK EE FI FR DE GR HU IS IE IT XK LV LI LT LU MT MD MC ME NL MK NO PL PT RO RU SM RS SK SI ES SE CH TR UA GB VA'
).split(' '));

const cityNames = {
  Vienna: 'Wien', Prague: 'Prag', Warsaw: 'Warschau', Milan: 'Mailand', Moscow: 'Moskau',
  Kyiv: 'Kiew', Kiev: 'Kiew', Bucharest: 'Bukarest', Belgrade: 'Belgrad', Athens: 'Athen',
  Lisbon: 'Lissabon', Seville: 'Sevilla', Naples: 'Neapel', Florence: 'Florenz', Genoa: 'Genua',
  Turin: 'Turin', Geneva: 'Genf', Zurich: 'Zürich', Bern: 'Bern', Brussels: 'Brüssel',
  'St. Petersburg': 'Sankt Petersburg', 'Saint Petersburg': 'Sankt Petersburg',
  'Nizhny Novgorod': 'Nischni Nowgorod', Yekaterinburg: 'Jekaterinburg',
  Odesa: 'Odessa', Oporto: 'Porto', Krakow: 'Krakau', 'Kraków': 'Krakau', Wroclaw: 'Breslau',
  'Wrocław': 'Breslau', Gdansk: 'Danzig', 'Gdańsk': 'Danzig', Pilsen: 'Pilsen', Pizen: 'Pilsen',
  Bratislava: 'Bratislava', Copenhagen: 'Kopenhagen', Gothenburg: 'Göteborg', Antwerp: 'Antwerpen',
  "The Hague": 'Den Haag', Luxembourg: 'Luxemburg', 'Luxembourg City': 'Luxemburg',
  'Thessaloniki': 'Thessaloniki', 'Vatican City': 'Vatikanstadt', Nicosia: 'Nikosia',
  Valencia: 'Valencia', Reykjavik: 'Reykjavík', Goteborg: 'Göteborg', Malmo: 'Malmö',
  Basel: 'Basel', Nice: 'Nizza', Rome: 'Rom', Cologne: 'Köln', Munich: 'München',
  'København': 'Kopenhagen', DenHaag: 'Den Haag'
};

export function countryCode(properties) {
  return properties.ISO_A2_EH === '-99'
    ? (properties.ADM0_A3 === 'KOS' ? 'XK' : properties.POSTAL)
    : properties.ISO_A2_EH;
}

export function buildCountryLabels(countries, mapPoint, insideMap) {
  return countries.flatMap(({ properties: p }) => {
    const code = countryCode(p);
    if (!cityCountries.has(code) && !['MA', 'DZ', 'TN', 'GE', 'AM', 'AZ'].includes(code)) return [];
    // The continental label anchors for these countries fall outside the crop.
    const coastalLabels = { RU: [46, 60], MA: [-6.15, 34.42], DZ: [3.33, 35.65], TN: [9.12, 35.4] };
    const coords = coastalLabels[code] || [p.LABEL_X, p.LABEL_Y];
    const point = mapPoint(coords);
    if (!insideMap(point)) return [];
    const small = p.TINY >= 0 || code === 'BA' || code === 'CZ' || code === 'SK';
    return [[(small ? code : p.NAME_DE || p.NAME).toLocaleUpperCase('de'), ...point, small ? 1 : 0]];
  });
}

export function buildMajorCities(places, gameCities, mapPoint, insideMap, onLand) {
  const byCountry = new Map();
  for (const { properties: p, geometry } of places) {
    const code = p.adm0_a3 === 'KOS' ? 'XK' : p.iso_a2;
    if (!cityCountries.has(code)) continue;
    const point = mapPoint(geometry.coordinates);
    if (!insideMap(point) || !onLand(point)) continue;
    const name = cityNames[p.name] || cityNames[p.nameascii] || p.name;
    byCountry.set(code, [...(byCountry.get(code) || []), { name, point, capital: p.adm0cap === 1, population: p.pop_max }]);
  }

  return [...byCountry.entries()].sort(([a], [b]) => a.localeCompare(b)).flatMap(([country, cities]) => {
    cities.sort((a, b) => Number(b.capital) - Number(a.capital) || b.population - a.population || a.name.localeCompare(b.name));
    const selected = [];
    for (const city of cities) {
      if (selected.length === 4) break;
      // The Natural Earth position may be on the other side of town (e.g. the Hannover fairgrounds).
      if ([...gameCities, ...selected].some(other =>
        (other.country === country && other.name === city.name) ||
        Math.hypot(other.point[0] - city.point[0], other.point[1] - city.point[1]) < 7)) continue;
      selected.push(city);
    }
    return selected.map(c => [c.name, ...c.point, c.capital ? 1 : 0, c.population, country]);
  });
}
