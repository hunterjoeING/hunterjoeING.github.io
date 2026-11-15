// Schweizer Eisenbahnloks (ca. 1970–Heute · 24 Fotos)
(function () {
const DATA = [
    // ==================== KLASSIKER & GOTTHARD-LEGENDEN (1-8) ====================
    {
      id: 1,
      cat: 'klassiker',
      eraLabel: 'Baujahre 1964–1985',
      img: './img/lok-01.jpg',
      q: 'Welche SBB-Lokomotive wurde mit 277 gebauten Exemplaren zur größten Baureihe der SBB-Geschichte und prägte über Jahrzehnte Schnell- und Güterzüge?',
      a: ['SBB Re 4/4 II (Re 420)', 'SBB Ae 8/14', 'SBB Be 4/6', 'BLS Re 485'],
      wasDasIst: {
        title: 'SBB Re 4/4 II (UIC: Re 420)',
        nick: '„Bo’Bo’“ („Bobò“)',
        operator: 'SBB CFF FFS (später teils BLS / SOB)',
        built: '1964 (Prototypen), Serie 1967–1985',
        builder: 'SLM Winterthur · BBC / MFO / SAAS',
        power: '4.700 kW (ca. 6.390 PS)',
        vmax: '140 km/h',
        system: '15 kV / 16,7 Hz AC · Normalspur (1.435 mm)',
        trivia: 'Das Foto zeigt Lok 11153 der ersten Serie – gut erkennbar am einzelnen Einholm-Stromabnehmer und den runden Stirnlampen. Durch ihre hohe Zuverlässigkeit und Zugkraft ist die Bo’Bo’ seit über 50 Jahren ein vertrautes Bild am Gotthard wie im Mittelland.'
      },
      credit: {
        artist: 'JoachimKohler-HB',
        license: 'CC BY-SA 4.0',
        commons: 'File:SBB Re 4-4 II Nr. 11153 bei Tägerwilen TG (2016).jpg'
      }
    },
    {
      id: 2,
      cat: 'klassiker',
      eraLabel: 'Baujahre 1972–1980',
      img: './img/lok-02.jpg',
      q: 'Welche Gotthard-Kraftmaschine läuft als Besonderheit auf drei getrennten zweiachsigen Drehgestellen (Bo’Bo’Bo’) statt auf zwei dreiachsigen Drehgestellen?',
      a: ['SBB Re 6/6 (Re 620)', 'SBB Ae 6/6 (Ae 610)', 'SBB Re 4/4 II (Re 420)', 'SBB Re 460'],
      wasDasIst: {
        title: 'SBB Re 6/6 (UIC: Re 620)',
        nick: '„Gotthard-Königin“',
        operator: 'SBB CFF FFS / SBB Cargo',
        built: '1972 (Prototypen), Serie 1975–1980 (89 Loks)',
        builder: 'SLM Winterthur · BBC / SAAS',
        power: '7.850 kW (10.670 PS Stundenleistung)',
        vmax: '140 km/h',
        system: '15 kV / 16,7 Hz AC · Normalspur (1.435 mm)',
        trivia: 'Damit eine sechsachsige Lok die engen Kurven der Gotthard-Rampen gleisschonend meistert, erhielt sie drei bewegliche zweiachsige Drehgestelle – beim zweiten Blick ins Foto deutlich zu sehen. In Doppeltraktion mit einer Re 4/4 II bildete sie legendäre „Re 10/10“-Gespanne.'
      },
      credit: {
        artist: 'JoachimKohler-HB',
        license: 'CC BY-SA 4.0',
        commons: 'File:Re 6-6 (Re 620) Nr. 11631 "Dulliken" in Bellinzona.jpg'
      }
    },
    {
      id: 3,
      cat: 'klassiker',
      eraLabel: 'Im Dienst 1952–2013',
      img: './img/lok-03.jpg',
      q: 'Welche schwere Gotthard-Lokomotive trug traditionell Kantons- oder Gemeindewappen (hier „Brugg“), silberne Zierstreifen und diente bei den SBB bis 2013?',
      a: ['SBB Ae 6/6 (Ae 610)', 'SBB Ce 6/8 II („Krokodil“)', 'SBB Re 450', 'RhB Ge 6/6 II'],
      wasDasIst: {
        title: 'SBB Ae 6/6 (UIC: Ae 610)',
        nick: '„Kantonslok“ / „Städtelok“',
        operator: 'SBB CFF FFS / SBB Cargo',
        built: '1952–1966 (120 Stück, im Dienst bis 2013)',
        builder: 'SLM Winterthur · BBC / MFO',
        power: '4.300 kW (ca. 5.850 PS)',
        vmax: '125 km/h',
        system: '15 kV / 16,7 Hz AC · Normalspur (1.435 mm)',
        trivia: 'Die ersten 25 Maschinen erhielten die Wappen der Schweizer Kantone plus silbernen „Schnauz“ (Zierstreifen), die übrigen 95 bekamen Stadtwappen wie hier die 11470 „Brugg“. Bis in die 2010er-Jahre zog sie noch Güterzüge durch die ganze Schweiz.'
      },
      credit: {
        artist: 'JoachimKohler-HB',
        license: 'CC BY-SA 4.0',
        commons: 'File:SBB Ae 6-6 Nr. 11470 "Brugg" in Weinfelden (2011).jpg'
      }
    },
    {
      id: 4,
      cat: 'klassiker',
      eraLabel: 'Baujahre 1991–1997',
      img: './img/lok-04.jpg',
      q: 'Welche SBB-Schnellzuglok der 1990er Jahre („Lok 2000“) entwarf das italienische Designstudio Pininfarina speziell für das Konzept Bahn 2000?',
      a: ['SBB Re 460', 'SBB Re 4/4 IV', 'SBB Am 843', 'SBB Re 482'],
      wasDasIst: {
        title: 'SBB Re 460 („Lok 2000“)',
        nick: '„Lok 2000“ / „Werbelok“',
        operator: 'SBB CFF FFS',
        built: '1991–1997 (119 Loks)',
        builder: 'SLM Winterthur · ABB (Umrichtertechnik)',
        power: '6.100 kW',
        vmax: '200 km/h (Auslegung bis 230 km/h)',
        system: '15 kV / 16,7 Hz AC · Normalspur (1.435 mm)',
        trivia: 'Mit ihrem markanten roten Pininfarina-Kasten, Drehstrom-Asynchronmotoren und der Wendezugsteuerung für Doppelstock-IC2000-Kompositionen wurde die Re 460 ab den 1990ern das Rückgrat des Schweizer InterCity-Verkehrs.'
      },
      credit: {
        artist: 'Bahnfrend',
        license: 'CC BY-SA 4.0',
        commons: 'File:Re 460 058-1 + IC 2000 St. Gallen, 2014 (1).JPG'
      }
    },
    {
      id: 5,
      cat: 'klassiker',
      eraLabel: 'Baujahre 1989–1997',
      img: './img/lok-05.jpg',
      q: 'Welche SBB-Lokomotive hat ab Werk nur einen einzigen Führerstand plus Gepäckabteil und wurde maßgeschneidert für die Doppelstock-Pendelzüge der S-Bahn Zürich gebaut?',
      a: ['SBB Re 450 (DPZ)', 'SBB Re 420', 'SBB Ee 922', 'BLS Re 465'],
      wasDasIst: {
        title: 'SBB Re 450 (Doppelstock-Pendelzug)',
        nick: '„DPZ-Lok“',
        operator: 'SBB CFF FFS (S-Bahn Zürich / ZVV)',
        built: '1989–1997 (115 Stück)',
        builder: 'SLM · ABB · SIG · SWP',
        power: '3.200 kW',
        vmax: '130 km/h',
        system: '15 kV / 16,7 Hz AC · Normalspur (1.435 mm)',
        trivia: 'Die markant blau-weiß-gelben S-Bahn-Züge fahren seit 1990 im Raum Zürich: Weil ein Doppelstock-Pendelzug (DPZ) immer fest gekuppelt bleibt und am anderen Ende ein Steuerwagen hängt, konnte die Re 450 mit nur einem Führerstand und einem praktischen Gepäck-/Postraum ausgestattet werden.'
      },
      credit: {
        artist: 'Kabelleger / David Gubler',
        license: 'CC BY-SA 3.0',
        commons: 'File:SBB Re 450 060 ZVV Pfäffikon - Kempten.jpg'
      }
    },
    {
      id: 6,
      cat: 'klassiker',
      eraLabel: 'Baujahre 1984–1996',
      img: './img/lok-06.jpg',
      q: 'Welchen Spitznamen trug dieser farbenfrohe Regionalzug-Triebwagen (SBB RBDe 560, „Neuer Pendelzug“) wegen seines blauen, roten und gelben Anstrichs im Volksmund?',
      a: ['„Kolibri“', '„Roter Pfeil“', '„Gotthard-Fuchs“', '„Glacier-Zwerg“'],
      wasDasIst: {
        title: 'SBB RBDe 560 (NPZ – Neuer Pendelzug)',
        nick: '„Kolibri“ (heute modernisiert als „Domino“)',
        operator: 'SBB CFF FFS · Regionalverkehr',
        built: '1984–1996 (Modernisierung zu „Domino“ 2008–2013)',
        builder: 'FFA · SIG · SWP · BBC / ABB',
        power: '1.650 kW',
        vmax: '140 km/h',
        system: '15 kV / 16,7 Hz AC · Normalspur (1.435 mm)',
        trivia: 'Wegen seiner grauen Wände, blauen Streifen, roten Fronten und knallgelben Einstiegstüren nannte ihn die Schweiz liebevoll „Kolibri“. Später bekamen viele Triebwagen neue Niederflur-Zwischenwagen und fahren seither modernisiert als „Domino“.'
      },
      credit: {
        artist: 'NAC',
        license: 'CC BY-SA 4.0',
        commons: 'File:FFS RBDe 560 100-9 Wohlen 111110.jpg'
      }
    },
    {
      id: 7,
      cat: 'klassiker',
      eraLabel: 'Im Dienst 1959–2014',
      img: './img/lok-07.jpg',
      q: 'Dieser äußerst spurtstarke Personentriebwagen zog bis 2014 ganze Regional- und Schnellzug-Pendel – welche offizielle SBB-Bezeichnung trägt er?',
      a: ['SBB RBe 4/4 (später RBe 540)', 'SBB De 4/4', 'SBB Ae 3/6 I', 'SBB RABDe 12/12'],
      wasDasIst: {
        title: 'SBB RBe 4/4 (UIC: RBe 540)',
        nick: '„Seetal-Sprinter“ / Klassischer Pendel-Triebwagen',
        operator: 'SBB CFF FFS (bis 2014)',
        built: '1959–1966 (82 Triebwagen, Umbau ab 1992 zu RBe 540)',
        builder: 'SIG · SWS · BBC · MFO',
        power: '1.988 kW (ca. 2.700 PS)',
        vmax: '125 km/h',
        system: '15 kV / 16,7 Hz AC · Normalspur (1.435 mm)',
        trivia: 'Mit knapp 2.000 kW auf nur vier angetriebenen Achsen bot der RBe 4/4 sowohl Sitzplätze als auch die Zugkraft einer kleinen Lok – bis weit in die 2000er Jahre blieb er auf Neben- und Hauptlinien unverzichtbar. Der hier abgebildete 1405 ist historisch erhalten.'
      },
      credit: {
        artist: 'Markus Eigenheer',
        license: 'CC BY-SA 2.0',
        commons: 'File:Ex SBB CFF FFS RBe 4 4 1405 2019-07-21.jpg'
      }
    },
    {
      id: 8,
      cat: 'klassiker',
      eraLabel: 'Baujahr 1982 (4 Prototypen)',
      img: './img/lok-08.jpg',
      q: 'Von der Versuchslok SBB Re 4/4 IV (10101–10104) entstanden 1982 nur vier Stück. An welche Privatbahn verkauften die SBB alle vier Loks ab 1994 (heute Re 446)?',
      a: ['Schweizerische Südostbahn (SOB)', 'Rhätische Bahn (RhB)', 'Appenzeller Bahnen (AB)', 'Zentralbahn (zb)'],
      wasDasIst: {
        title: 'SBB Re 4/4 IV · heute SOB Re 446',
        nick: '„Bahn-2000-Prototyp“',
        operator: 'SBB (bis 1994), seither Südostbahn (SOB) / EDG',
        built: '1982 (nur 4 Exemplare: 10101–10104)',
        builder: 'SLM Winterthur · BBC',
        power: '4.960 kW',
        vmax: '160 km/h',
        system: '15 kV / 16,7 Hz AC · Normalspur (1.435 mm)',
        trivia: 'Mit Thyristor-Phasenanschnittsteuerung und 160 km/h ebnete die Re 4/4 IV den Weg für moderne Hochleistungsloks, doch statt ihr folgte in Großserie schon bald die noch fortschrittlichere Drehstrom-Re 460. Bei der SOB bewährten sich alle vier Exemplare über Jahrzehnte am steilen Voralpen-Express (bis zu 50 ‰ Steigung!).'
      },
      credit: {
        artist: 'Joachim Lutz',
        license: 'CC BY-SA 4.0',
        commons: 'File:SBB Re 4-4 IV (10103 A W).jpg'
      }
    },

    // ==================== MODERNE TRIEBZÜGE & SCHNELLVERKEHR (9-16) ====================
    {
      id: 9,
      cat: 'modern',
      eraLabel: 'Baujahre 1999–2005',
      img: './img/lok-09.jpg',
      q: 'Welcher siebenteilige Schweizer Neigezug (Neigung bis 8°) wurde für die Expo.02 in Betrieb genommen und prägt die kurvige Jurasüdfuß-Linie sowie lange Zeit den Gotthard?',
      a: ['SBB RABDe 500 („ICN“)', 'SBB RABe 501 („Giruno“)', 'SBB RABe 511 („KISS“)', 'BLS RABe 535 („Lötschberger“)'],
      wasDasIst: {
        title: 'SBB RABDe 500 („ICN“ – InterCity-Neigezug)',
        nick: '„ICN“',
        operator: 'SBB CFF FFS',
        built: '1999–2005 (44 Züge)',
        builder: 'Adtranz / Bombardier · Alstom · Design: Pininfarina',
        power: '5.200 kW',
        vmax: '200 km/h',
        system: '15 kV / 16,7 Hz AC · Normalspur (1.435 mm)',
        trivia: 'Dank aktiver hydraulischer Neigetechnik bis 8° (wie auf dem Foto schön in der Kurve am Bielersee zu sehen) verkürzte der ICN die Fahrzeiten zwischen Genf, Biel, Basel, Zürich und St. Gallen spürbar. Zurzeit erhalten alle Züge eine umfassende Modernisierung für weitere Betriebsjahre.'
      },
      credit: {
        artist: 'Kabelleger / David Gubler',
        license: 'CC BY-SA 4.0',
        commons: 'File:SBB RABDe 500 Twann - Ligerz.jpg'
      }
    },
    {
      id: 10,
      cat: 'modern',
      eraLabel: 'Seit 2017 / Einsatz ab 2019',
      img: './img/lok-10.jpg',
      q: 'Welcher elfteilige 250-km/h-Schnellzug von Stadler Rail fährt seit 2019/2020 als moderner Gotthard-Basistunnel-Zug bis nach Mailand (und teils nach Deutschland)?',
      a: ['SBB RABe 501 („Giruno“)', 'SBB RABe 503 („Astoro“)', 'SBB RABe 502 („FV-Dosto“)', 'SOB RABe 526 („Traverso“)'],
      wasDasIst: {
        title: 'SBB RABe 501 („Giruno“ / Stadler SMILE)',
        nick: '„Giruno“ (rätoromanisch: Mäusebussard)',
        operator: 'SBB CFF FFS',
        built: 'seit 2017 (29 + nachbestellte Züge)',
        builder: 'Stadler Rail (Thurgau)',
        power: '6.000 kW Max. (4.720 kW Dauer)',
        vmax: '250 km/h',
        system: '3 Stromsysteme (CH/DE 15 kV AC · IT 3 kV DC & 25 kV AC)',
        trivia: 'Der über 200 m lange Giruno war der erste in Serie gebaute Hochgeschwindigkeitszug von Stadler und verbindet komplett niederflurigen Einstieg bei 55/76 cm Bahnsteighöhe mit druckertüchtigtem Wagenkasten für die 57 km lange Röhre des Gotthard-Basistunnels.'
      },
      credit: {
        artist: 'Nelso Silva',
        license: 'CC BY-SA 2.0',
        commons: 'File:SBB RABe 501 017.jpg'
      }
    },
    {
      id: 11,
      cat: 'modern',
      eraLabel: 'Baujahre 2015–2022',
      img: './img/lok-11.jpg',
      q: 'Welcher InterCity-Doppelstockzug von Bombardier sorgt mit seinen wuchtigen Fronten auf den Linien zwischen Genf, Bern, Zürich und St. Gallen für hohe Sitzplatzkapazität?',
      a: ['SBB RABe 502 („FV-Dosto“ / Twindexx)', 'SBB RABe 511 („KISS“)', 'SBB RABe 523 („FLIRT“)', 'SBB Re 450 (DPZ)'],
      wasDasIst: {
        title: 'SBB RABe 502 („FV-Dosto“ / Twindexx Swiss Express)',
        nick: '„FV-Dosto“',
        operator: 'SBB CFF FFS',
        built: '2015–2022 (62 Züge: IC200 / IR200 / IR100)',
        builder: 'Bombardier Transportation (heute Alstom)',
        power: '3.750 kW (4-teilig) bzw. 7.500 kW (8-teilig)',
        vmax: '200 km/h',
        system: '15 kV / 16,7 Hz AC · Normalspur (1.435 mm)',
        trivia: 'Nach einem holprigen Start bei Software und Wankkompensation fahren die Doppelstöcker heute zuverlässig auf den meistbefahrenen InterCity- und InterRegio-Achsen der Schweiz – mit bis zu über 600 Sitzplätzen in einer 200-Meter-Einheit.'
      },
      credit: {
        artist: 'Kabelleger / David Gubler',
        license: 'CC BY-SA 4.0',
        commons: 'File:SBB RABe 502 203 Ossingen.jpg'
      }
    },
    {
      id: 12,
      cat: 'modern',
      eraLabel: 'Seit 2007 (SBB 2. Serie ab 2014)',
      img: './img/lok-12.jpg',
      q: 'Welcher internationale 250-km/h-Neigezug aus der Pendolino-Familie verkehrt für die SBB grenzüberschreitend über den Gotthard und Simplon Richtung Mailand sowie bis Frankfurt?',
      a: ['SBB RABe 503 / ETR 610 („Astoro“)', 'SBB RABDe 500 („ICN“)', 'BLS RABe 528 („MIKA“)', 'SBB RABe 501 („Giruno“)'],
      wasDasIst: {
        title: 'SBB RABe 503 / ETR 610 („Astoro“)',
        nick: '„Astoro“ (lat. „Habicht“ / „New Pendolino“)',
        operator: 'SBB CFF FFS (anfangs teils Cisalpino) · Trenitalia',
        built: 'seit 2007 (1. Serie ETR 610) / 2014–2017 (2. Serie RABe 503)',
        builder: 'Alstom (Savigliano, ehemals Fiat Ferroviaria)',
        power: '5.500 kW',
        vmax: '250 km/h',
        system: '4 Stromsysteme (CH/DE/AT/IT) · Normalspur',
        trivia: 'Dank aktiver Neigetechnik und Viersystemausrüstung verbindet der Astoro die Schweiz nicht nur mit Mailand und Venedig, sondern fährt am anderen Ende des Korridors auch durch das Rheintal bis nach Frankfurt am Main.'
      },
      credit: {
        artist: 'Chme82',
        license: 'CC BY-SA 4.0',
        commons: 'File:SBB ETR 610-013 Astoro Brig.jpg'
      }
    },
    {
      id: 13,
      cat: 'modern',
      eraLabel: 'Baujahre 2010–2016',
      img: './img/lok-13.jpg',
      q: 'Stadler benannte diesen modernen Doppelstockzug (SBB RABe 511) „KISS“. Wofür steht dieses bekannte Schweizer Eisenbahn-Kürzel?',
      a: ['Komfortabler Innovativer Spurtstarker S-Bahn-Zug', 'Kraftvoller Internationaler Schnell-Sprinter', 'Kurvenfähiger Intercity-Systemzug Schweiz', 'Kompakter Interregio-Sonder-Schlitten'],
      wasDasIst: {
        title: 'SBB RABe 511 (Stadler „KISS“)',
        nick: '„KISS“ / „Regio-Dosto“',
        operator: 'SBB CFF FFS (S-Bahn & RegioExpress)',
        built: '2010–2016 (und Folgebestellungen)',
        builder: 'Stadler Rail',
        power: '4.000 kW Dauer / 6.000 kW Stundenleistung',
        vmax: '160 km/h',
        system: '15 kV / 16,7 Hz AC · Normalspur (1.435 mm)',
        trivia: 'Ursprünglich noch nüchtern „DOSTO“ genannt, landete Stadler mit „KISS“ („Komfortabler Innovativer Spurtstarker S-Bahn-Zug“) einen Marketing-Volltreffer: Durch hohe Beschleunigung macht der Zweistöcker auch bei vielen kurzen S-Bahn-Halten ordentlich Boden gut.'
      },
      credit: {
        artist: 'Remontees',
        license: 'CC BY-SA 4.0',
        commons: 'File:Rabe-511-kiss-gare-annemasse1.jpg'
      }
    },
    {
      id: 14,
      cat: 'modern',
      eraLabel: 'Seit 2004 (Globaler Bestseller)',
      img: './img/lok-14.jpg',
      q: 'Welche Baureihe des Thurgauer Herstellers Stadler Rail (hier als SBB RABe 523) wurde mit über 2.500 verkauften Zügen zu einem der weltweit erfolgreichsten Regionalzüge?',
      a: ['FLIRT (Flinker Leichter Innovativer Regional-Triebzug)', 'ICN (InterCity-Neigezug)', 'KISS (Komfortabler Innovativer S-Bahn-Zug)', 'GTW (Gelenktriebwagen)'],
      wasDasIst: {
        title: 'SBB RABe 523 (Stadler „FLIRT“)',
        nick: '„FLIRT“',
        operator: 'SBB CFF FFS (Stadtbahn Zug, Léman Express, TILO, S-Bahnen)',
        built: 'seit 2004 in mehreren Generationen',
        builder: 'Stadler Rail (Bussnang)',
        power: '2.000 kW (2.600 kW Max.)',
        vmax: '160 km/h',
        system: '15 kV / 16,7 Hz AC (u. a. auch Zweisystem CH/FR oder CH/IT)',
        trivia: '2004 debütierte der FLIRT bei den SBB für die Stadtbahn Zug – heute fährt er in über 20 Ländern von Norwegen bis in die USA. Charakteristisch sind die beiden starken End-Drehgestelle unter den Führerständen und dazwischen liegende Jacobs-Drehgestelle.'
      },
      credit: {
        artist: 'JoachimKohler-HB',
        license: 'CC BY-SA 4.0',
        commons: 'File:Bahnhof Yverdon-les-Bains mit SBB RABe 523 109 (2026).jpg'
      }
    },
    {
      id: 15,
      cat: 'modern',
      eraLabel: 'Bau ab 2017 · Einsatz ab 2019',
      img: './img/lok-15.jpg',
      q: 'Unter welchem Namen verkehrt dieser markant kupferfarbene Fernverkehrszug der Südostbahn (SOB RABe 526) als „Voralpen-Express“ und „Treno Gottardo“ über die alte Gotthard-Bergstrecke?',
      a: ['„Traverso“', '„Allegra“', '„MIKA“', '„Astoro“'],
      wasDasIst: {
        title: 'SOB RABe 526 („Traverso“ · Stadler FLIRT 3)',
        nick: '„Traverso“ (ital./rätorom. „Querung“)',
        operator: 'Schweizerische Südostbahn (SOB)',
        built: 'ab 2017, Einsatz ab 2019/2020',
        builder: 'Stadler Rail',
        power: '4.000 kW Stunde (5.200 kW Max.)',
        vmax: '160 km/h',
        system: '15 kV / 16,7 Hz AC · Normalspur (1.435 mm)',
        trivia: 'Während Fernzüge heute meist unten durch den Gotthard-Basistunnel rauschen, schraubt sich der kupfergoldene Traverso bewusst über die historische Panoramastrecke mit den Kehrtunnels bei Wassen und der Kirche von Göschenen (wie hier im Bild!).'
      },
      credit: {
        artist: 'NAC',
        license: 'CC BY-SA 4.0',
        commons: 'File:SOB RABe 526 121 Goeschenen 021223.jpg'
      }
    },
    {
      id: 16,
      cat: 'modern',
      eraLabel: 'Seit 2020/2021',
      img: './img/lok-16.jpg',
      q: 'Aus welcher bewährten Stadler-Triebzugfamilie stammt der moderne bordeauxrote „MIKA“ (BLS RABe 528) für RegioExpress und S-Bahn Bern?',
      a: ['Stadler FLIRT (4. / neueste Generation)', 'Stadler KISS Doppelstockfamilie', 'Bombardier Twindexx Plattform', 'Alstom Coradia Duplex'],
      wasDasIst: {
        title: 'BLS RABe 528 („MIKA“ – Moderner Innovativer Kompakter Alleskönner)',
        nick: '„MIKA“',
        operator: 'BLS AG',
        built: 'seit 2020/2021 (RegioExpress- und S-Bahn-Varianten)',
        builder: 'Stadler Rail',
        power: '2.000 kW am Rad',
        vmax: '160 km/h',
        system: '15 kV / 16,7 Hz AC · Normalspur (1.435 mm)',
        trivia: 'Die BLS beschafft gleich 58+ MIKA-Züge auf Basis der modernisierten FLIRT-Generation (unter anderem mit der neuen crashoptimierten Kopfform und Bistrozone im RegioExpress) als Nachfolger alter Re-465-/EW-III- und NINA-Flotten.'
      },
      credit: {
        artist: 'Vsler',
        license: 'CC BY-SA 4.0',
        commons: 'File:BLS MIKA 105 Burgdorf.jpg'
      }
    },

    // ==================== BLS, RHÄTISCHE BAHN, GÜTER & DIESEL (17-24) ====================
    {
      id: 17,
      cat: 'spezial',
      eraLabel: 'Baujahre 1964–1983',
      img: './img/lok-17.jpg',
      q: 'Auf welcher berühmten Schweizer Alpen-Transversale schrieb diese legendäre braune BLS-Lokomotive (Re 4/4 bzw. Re 425, 6.800 PS!) über Jahrzehnte Eisenbahngeschichte?',
      a: ['Lötschberg-Simplon-Bergstrecke', 'Albula-Bernina-Schmalspurstrecke', 'Brünigbahn über den Brünigpass', 'Gotthard-Südrampe der RhB'],
      wasDasIst: {
        title: 'BLS Re 4/4 (UIC: Re 425)',
        nick: '„Braune BLS“ / „Bruneli“',
        operator: 'Bern-Lötschberg-Simplon-Bahn (BLS)',
        built: '1964–1983 (35 Loks)',
        builder: 'SLM Winterthur · BBC',
        power: '4.990 kW (ca. 6.785 PS)',
        vmax: '140 km/h',
        system: '15 kV / 16,7 Hz AC · Normalspur (1.435 mm)',
        trivia: 'Obwohl sie wie die SBB Re 4/4 II nur vier Achsen besaß, kitzelten die BLS-Ingenieure dank höherem Reibungsgewicht und Silizium-Gleichrichtertechnik (Spannungsregelung mit feinstufigen Wellenstrom-Motoren) nochmals mehr Leistung heraus – ideal für steile 27-‰-Lötschberg-Züge.'
      },
      credit: {
        artist: 'NAC',
        license: 'CC BY-SA 4.0',
        commons: 'File:5 BLS Re 4-4 180 Kandersteg 120818.jpg'
      }
    },
    {
      id: 18,
      cat: 'spezial',
      eraLabel: 'Baujahre 1994–1997',
      img: './img/lok-18.jpg',
      q: 'Worin unterschied sich die dunkelblaue BLS Re 465 technisch entscheidend von ihrer äußerlich fast gleichen Schwesterlok, der roten SBB Re 460?',
      a: ['Einzelachssteuerung & stärkere Leistung (7.000 kW Stunde) für schwere Güterzüge', 'Sie besaß einen Diesel-Hilfsmotor statt Stromabnehmer', 'Sie wurde schmalspurig für 1.000 mm gebaut', 'Sie hatte statt Drehstrom noch mechanische Stufenschalter'],
      wasDasIst: {
        title: 'BLS Re 465',
        nick: '„Blaue Lok 2000“ / Alpenlok',
        operator: 'BLS / BLS Cargo (18 Loks)',
        built: '1994–1997',
        builder: 'SLM Winterthur · ABB',
        power: '6.400 kW Dauer / 7.000 kW Stunde',
        vmax: '160 km/h (Auslegung 230 km/h)',
        system: '15 kV / 16,7 Hz AC · Normalspur (1.435 mm)',
        trivia: 'Während bei der SBB Re 460 je ein Umrichter ein ganzes Drehgestell speist, lässt sich bei der BLS Re 465 jede der vier Achsen einzeln ansteuern (Einzelachsregelung). So schöpft sie beim Anfahren schwerer Güterzüge auf nassen Bergschienen noch mehr Zugkraft heraus.'
      },
      credit: {
        artist: 'Titane8226',
        license: 'CC BY 3.0',
        commons: 'File:Re465 012-3.jpg'
      }
    },
    {
      id: 19,
      cat: 'spezial',
      eraLabel: 'Baujahre 1973 & 1984–1985',
      img: './img/lok-19.jpg',
      q: 'Auf welcher Spurweite und unter welchem Bahnstrom-System arbeitet diese rote Gebirgslokomotive (Ge 4/4 II) der Rhätischen Bahn in Graubünden?',
      a: ['1.000 mm Meterspur · 11 kV / 16,7 Hz Wechselstrom', '1.435 mm Normalspur · 15 kV / 16,7 Hz Wechselstrom', '800 mm Schmalspur · 1.500 V Gleichstrom', '1.000 mm Meterspur · 3.000 V Gleichstrom'],
      wasDasIst: {
        title: 'RhB Ge 4/4 II (Nr. 611–633)',
        nick: '„Bündner Bo’Bo’“',
        operator: 'Rhätische Bahn (RhB · Stammnetz)',
        built: '1973 (1. Serie) und 1984–1985 (2. Serie, 23 Loks)',
        builder: 'SLM Winterthur · BBC',
        power: '1.700 kW (ca. 2.310 PS)',
        vmax: '90 km/h',
        system: '11 kV / 16,7 Hz AC · Meterspur (1.000 mm)',
        trivia: 'Das Bündner Stammnetz nutzt wie die SBB Einphasen-Wechselstrom mit 16,7 Hz, jedoch mit 11.000 Volt statt 15.000 Volt – angepasst an enge Tunnels und das 1.000-mm-Schmalspurgleis. Alle 23 Loks tragen Namen Bündner Gemeinden oder Berge.'
      },
      credit: {
        artist: 'Valo139',
        license: 'CC BY-SA 4.0',
        commons: 'File:RhB - Ge 4-4 II 632 (valo139).jpg'
      }
    },
    {
      id: 20,
      cat: 'spezial',
      eraLabel: 'Baujahre 1993–1999',
      img: './img/lok-20.jpg',
      q: 'Welches weltberühmte Schweizer Eisenbahn-Bauwerk überquert diese RhB Ge 4/4 III („Lok 2000 für Schmalspur“) hier direkt vor dem Landwassertunnel?',
      a: ['Landwasserviadukt bei Filisur (Albulabahn)', 'Brusio-Kreisviadukt (Berninabahn)', 'Bietschtalbrücke (Lötschberg-Südrampe)', 'Grandfey-Viadukt bei Fribourg'],
      wasDasIst: {
        title: 'RhB Ge 4/4 III (Nr. 641–652)',
        nick: '„Kleine Lok 2000“',
        operator: 'Rhätische Bahn (RhB)',
        built: '1993–1999 (12 Stück)',
        builder: 'SLM Winterthur · ABB / Adtranz',
        power: '2.400 kW Dauer (3.100 kW Max.)',
        vmax: '100 km/h',
        system: '11 kV / 16,7 Hz AC · Meterspur (1.000 mm)',
        trivia: 'Die elegant geschwungene 65 Meter hohe Kalksteinbrücke aus dem Jahr 1902 ist das Wahrzeichen der UNESCO-Albulabahn: Die Gleise biegen im Radius von 100 Metern direkt in den senkrechten Fels des Landwassertunnels. Die 1990er-Ge 4/4 III übertrug die Drehstromtechnik der SBB Re 460 erstmals auf Schmalspur (Glacier Express, Autozug Vereina).'
      },
      credit: {
        artist: 'Kabelleger / David Gubler',
        license: 'CC BY-SA 3.0',
        commons: 'File:RhB Ge 4-4 III UNESCO Weltkulturerbe auf Landwasserviadukt.jpg'
      }
    },
    {
      id: 21,
      cat: 'spezial',
      eraLabel: 'Baujahre 2009–2010',
      img: './img/lok-21.jpg',
      q: 'Wie bezwingt dieser rote RhB-Triebzug („Allegra“ ABe 8/12) sogar die bis zu 70 ‰ steilen Rampen am Berninapass komplett ohne Zahnrad?',
      a: ['Als Zweisystem-Triebzug (11 kV AC & 1.000 V DC) mit 8 von 12 Achsen angetrieben', 'Durch zuschaltbare Düsentriebwerke im Gepäckabteil', 'Er fährt auf dem Bernina nur talwärts', 'Mit Hilfe einer magnetischen Linearschiene im Gleisbett'],
      wasDasIst: {
        title: 'RhB ABe 8/12 („Allegra“)',
        nick: '„Allegra“ (rätorom. Begrüßung)',
        operator: 'Rhätische Bahn (RhB · Bernina & Stammnetz)',
        built: '2009–2010 (15 dreiteilige Züge)',
        builder: 'Stadler Rail',
        power: 'ca. 2.600 kW unter 11 kV AC · ca. 2.320 kW Dauer',
        vmax: '100 km/h',
        system: 'Zweisystem: 11 kV AC (Stammnetz) & 1.000 V DC (Bernina) · 1.000 mm',
        trivia: 'Damit Züge von Chur oder St. Moritz ohne Lokwechsel über den 2.253 m hohen Ospizio Bernina (auf 1.000 V Gleichstrom!) bis Tirano durchfahren können, vereint der Allegra beide Stromsysteme. Mit 8 angetriebenen Achsen zieht er zusätzlich noch klassische Panoramawagen die 70-‰-Steigung hinauf.'
      },
      credit: {
        artist: 'Kabelleger / David Gubler',
        license: 'CC BY-SA 3.0',
        commons: 'File:RhB ABe 8-12 Allegra between Lagalb and Ospizio Bernina.jpg'
      }
    },
    {
      id: 22,
      cat: 'spezial',
      eraLabel: 'Baujahre 2002–2006',
      img: './img/lok-22.jpg',
      q: 'Zu welcher in ganz Europa verbreiteten Lokomotivfamilie gehört diese Güterlok von SBB Cargo (Re 482) für den grenzüberschreitenden Verkehr nach Deutschland?',
      a: ['Bombardier TRAXX (F140 AC)', 'Siemens EuroSprinter / Taurus', 'Alstom Prima', 'SLM Lok 2000'],
      wasDasIst: {
        title: 'SBB Cargo Re 482 (Bombardier TRAXX F140 AC)',
        nick: '„TRAXX“ / DE-Güterlok',
        operator: 'SBB Cargo (50 Stück)',
        built: '2002–2006',
        builder: 'Bombardier Transportation (Kassel)',
        power: '5.600 kW',
        vmax: '140 km/h',
        system: '15 kV / 16,7 Hz AC (Zulassung CH & DE)',
        trivia: 'Um Güterzüge von Basel oder Zürich ohne Umspannen bis ins Ruhrgebiet oder nach Hamburg fahren zu können, bestellte SBB Cargo ab 2002 die zweiländertaugliche TRAXX-Plattform mit Schweizer und deutschen Zugsicherungen (ETCS / Integra / PZB / LZB).'
      },
      credit: {
        artist: 'Kabelleger / David Gubler',
        license: 'CC BY-SA 3.0',
        commons: 'File:Re 482 mit Containerzug bei Oberrüti.jpg'
      }
    },
    {
      id: 23,
      cat: 'spezial',
      eraLabel: 'Seit 2016 im Einsatz',
      img: './img/lok-23.jpg',
      q: 'Welcher Hersteller liefert diese Mehrsystem-Güterlokomotive Re 475 („Die Alpinisten“) für den Nord-Süd-Transitverkehr der BLS Cargo zwischen Rotterdam und Italien?',
      a: ['Siemens Mobility (Siemens Vectron MS)', 'Stadler Rail (EuroDual)', 'Bombardier (TRAXX 3)', 'SLM Winterthur (Lok 2000)'],
      wasDasIst: {
        title: 'BLS Cargo Re 475 (Siemens Vectron MS)',
        nick: '„Die Alpinisten“ / Vectron',
        operator: 'BLS Cargo',
        built: 'seit 2016 (kontinuierlich nachbestellt)',
        builder: 'Siemens Mobility (München-Allach)',
        power: '6.400 kW',
        vmax: '160–200 km/h (Güterzug-Zulassung meist 160)',
        system: 'Mehrsystem (15 kV AC · 25 kV AC · 3 kV DC · 1,5 kV DC)',
        trivia: 'Mit vier Stromabnehmern auf dem Dach und den Ländersignalen für D-A-CH-I-NL (später teils auch Belgien) rollt die Re 475 von Nordseehäfen ohne Lokwechsel durch den Lötschberg- und Gotthard-Basistunnel bis nach Norditalien.'
      },
      credit: {
        artist: 'Nelso Silva from Porto, Portugal',
        license: 'CC BY-SA 2.0',
        commons: 'File:BLS Cargo Re 475 402 (51422211111).jpg'
      }
    },
    {
      id: 24,
      cat: 'spezial',
      eraLabel: 'Baujahre 2003–2009',
      img: './img/lok-24.jpg',
      q: 'Wofür stehen im traditionellen Schweizer Bezeichnungsschema die beiden Buchstaben „Am“ auf dieser roten 1.500-kW-Maschine (Am 843 / MaK G 1700 BB)?',
      a: ['Diesellokomotive (Verbrennungsmotor) mit über 80 km/h Höchstgeschwindigkeit', 'Zahnrad-Schmalspurlokomotive für reine Bergbahnen', 'Akku-Arbeitsfahrzeug ohne eigenen Führerstand', 'Wechselstrom-Schnellzuglok mit 200 km/h'],
      wasDasIst: {
        title: 'SBB Am 843 (Vossloh / MaK G 1700 BB)',
        nick: '„Schwere Rangier- & Baulok“',
        operator: 'SBB Cargo & SBB Infrastruktur (73+ Loks)',
        built: '2003–2009',
        builder: 'Vossloh Locomotives (Kiel)',
        power: '1.500 kW (Caterpillar V12 Diesel)',
        vmax: '100 km/h',
        system: 'Dieselhydraulisch · Normalspur (1.435 mm)',
        trivia: 'In der Schweiz bedeutet „A“ (früher für schnelle Hauptstreckenloks > 80 km/h, während reine Rangierloks „E“ tragen) kombiniert mit „m“ für motorbetrieben (Verbrennungsmotor) schlicht eine schnelle Diesellok: Mit Partikelfilter und Funkfernsteuerung zieht die Am 843 Bauzüge, Cargo-Übergaben und Rangiereinsätze.'
      },
      credit: {
        artist: 'Lord Koxinga',
        license: 'CC BY-SA 3.0',
        commons: 'File:Rotkreuz Am 843 MaK 1700 3283.JPG'
      }
    }
  ];
  window.ArcadeQuizEngine.registerBank('swiss-trains', DATA);
})();
