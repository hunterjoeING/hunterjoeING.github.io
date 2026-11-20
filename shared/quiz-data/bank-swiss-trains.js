// Schweizer Eisenbahnloks (ca. 1970–Heute · 24 Fotos)
(function () {
  const DATA = [
  {
    "id": 1,
    "cat": "klassiker",
    "eraLabel": "Baujahre 1964–1985",
    "img": "./img/lok-01.jpg",
    "q": "Welche Schweizer Universallokomotive wurde mit 277 Exemplaren zur meistgebauten Baureihe der SBB-Geschichte und prägt seit den 1960ern Schnell- wie Güterzüge?",
    "a": [
      "SBB Re 4/4 II (Re 420)",
      "SBB Ae 6/6 (Ae 610)",
      "BLS Re 4/4 (Re 425)",
      "SBB Re 4/4 IV (Re 440)"
    ],
    "wasDasIst": {
      "title": "SBB Re 4/4 II (UIC: Re 420)",
      "nick": "„Bo’Bo’“ („Bobò“)",
      "operator": "SBB CFF FFS (später teils BLS / SOB)",
      "built": "1964 (Prototypen), Serie 1967–1985",
      "builder": "SLM Winterthur · BBC / MFO / SAAS",
      "power": "4.700 kW (ca. 6.390 PS)",
      "vmax": "140 km/h",
      "system": "15 kV / 16,7 Hz AC · Normalspur (1.435 mm)",
      "trivia": "Wusstest du, dass die liebevoll „Bo’Bo’“ genannte Lok seit über 50 Jahren im täglichen Dauereinsatz steht? Mit bis zu 140 km/h und extrem zuverlässiger Schweizer Relais- und Stufenschaltertechnik gilt sie als unzerstörbares Arbeitspferd der Alpenbahn!"
    },
    "credit": {
      "artist": "JoachimKohler-HB",
      "license": "CC BY-SA 4.0",
      "commons": "File:SBB Re 4-4 II Nr. 11153 bei Tägerwilen TG (2016).jpg"
    },
    "explanation": "Wusstest du, dass die liebevoll „Bo’Bo’“ genannte Lok seit über 50 Jahren im täglichen Dauereinsatz steht? Mit bis zu 140 km/h und extrem zuverlässiger Schweizer Relais- und Stufenschaltertechnik gilt sie als unzerstörbares Arbeitspferd der Alpenbahn!",
    "exp": "Wusstest du, dass die liebevoll „Bo’Bo’“ genannte Lok seit über 50 Jahren im täglichen Dauereinsatz steht? Mit bis zu 140 km/h und extrem zuverlässiger Schweizer Relais- und Stufenschaltertechnik gilt sie als unzerstörbares Arbeitspferd der Alpenbahn!"
  },
  {
    "id": 2,
    "cat": "klassiker",
    "eraLabel": "Baujahre 1972–1980",
    "img": "./img/lok-02.jpg",
    "q": "Welche über 10.600 PS starke Gotthard-Lokomotive läuft als seltene Besonderheit auf drei zweiachsigen Drehgestellen (Bo’Bo’Bo’), um die engen Kurven der Gebirgsrampen zu schonen?",
    "a": [
      "SBB Re 6/6 (Re 620)",
      "SBB Ae 6/6 (Ae 610)",
      "SBB Re 4/4 II (Re 420)",
      "BLS Re 465 (Lok 2000)"
    ],
    "wasDasIst": {
      "title": "SBB Re 6/6 (UIC: Re 620)",
      "nick": "„Gotthard-Königin“",
      "operator": "SBB CFF FFS / SBB Cargo",
      "built": "1972 (Prototypen), Serie 1975–1980 (89 Loks)",
      "builder": "SLM Winterthur · BBC / SAAS",
      "power": "7.850 kW (10.670 PS Stundenleistung)",
      "vmax": "140 km/h",
      "system": "15 kV / 16,7 Hz AC · Normalspur (1.435 mm)",
      "trivia": "Statt starrer dreiachsiger Drehgestelle erhielt die „Gotthard-Königin“ drei gelenkige Zweiachser mit elastischer Querverbindung. In Doppeltraktion mit einer Re 4/4 II bildete sie als „Re 10/10“ das stärkste Gespann für schwerste Transitgüterzüge!"
    },
    "credit": {
      "artist": "JoachimKohler-HB",
      "license": "CC BY-SA 4.0",
      "commons": "File:Re 6-6 (Re 620) Nr. 11631 \"Dulliken\" in Bellinzona.jpg"
    },
    "explanation": "Statt starrer dreiachsiger Drehgestelle erhielt die „Gotthard-Königin“ drei gelenkige Zweiachser mit elastischer Querverbindung. In Doppeltraktion mit einer Re 4/4 II bildete sie als „Re 10/10“ das stärkste Gespann für schwerste Transitgüterzüge!",
    "exp": "Statt starrer dreiachsiger Drehgestelle erhielt die „Gotthard-Königin“ drei gelenkige Zweiachser mit elastischer Querverbindung. In Doppeltraktion mit einer Re 4/4 II bildete sie als „Re 10/10“ das stärkste Gespann für schwerste Transitgüterzüge!"
  },
  {
    "id": 3,
    "cat": "klassiker",
    "eraLabel": "Im Dienst 1952–2013",
    "img": "./img/lok-03.jpg",
    "q": "Welche schwere Gotthard-Legende der Nachkriegszeit trug traditionell stolze Kantons- und Gemeindewappen, verchromte Zierstreifen („Schnauz“) und blieb bis 2013 im Dienst?",
    "a": [
      "SBB Ae 6/6 (Ae 610)",
      "SBB Ce 6/8 II („Krokodil“)",
      "RhB Ge 6/6 II (Meterspur)",
      "SBB Be 4/6 (Stangenlok)"
    ],
    "wasDasIst": {
      "title": "SBB Ae 6/6 (UIC: Ae 610)",
      "nick": "„Kantonslok“ / „Städtelok“",
      "operator": "SBB CFF FFS / SBB Cargo",
      "built": "1952–1966 (120 Stück, im Dienst bis 2013)",
      "builder": "SLM Winterthur · BBC / MFO",
      "power": "4.300 kW (ca. 5.850 PS)",
      "vmax": "125 km/h",
      "system": "15 kV / 16,7 Hz AC · Normalspur (1.435 mm)",
      "trivia": "Die ersten 25 Exemplare trugen die Wappen der Schweizer Kantone, alle weiteren 95 die Wappen bedeutender Städte. Wegen ihrer enormen Zugkraft machte sie Dampf- und Altbau-Loks am Gotthard mit einem Schlag überflüssig!"
    },
    "credit": {
      "artist": "JoachimKohler-HB",
      "license": "CC BY-SA 4.0",
      "commons": "File:SBB Ae 6-6 Nr. 11470 \"Brugg\" in Weinfelden (2011).jpg"
    },
    "explanation": "Die ersten 25 Exemplare trugen die Wappen der Schweizer Kantone, alle weiteren 95 die Wappen bedeutender Städte. Wegen ihrer enormen Zugkraft machte sie Dampf- und Altbau-Loks am Gotthard mit einem Schlag überflüssig!",
    "exp": "Die ersten 25 Exemplare trugen die Wappen der Schweizer Kantone, alle weiteren 95 die Wappen bedeutender Städte. Wegen ihrer enormen Zugkraft machte sie Dampf- und Altbau-Loks am Gotthard mit einem Schlag überflüssig!"
  },
  {
    "id": 4,
    "cat": "klassiker",
    "eraLabel": "Baujahre 1991–1997",
    "img": "./img/lok-04.jpg",
    "q": "Welche 200 km/h schnelle Schnellzuglokomotive der 1990er Jahre wurde vom italienischen Stardesigner Pininfarina gestaltet und zum Aushängeschild des Projekts „Bahn 2000“?",
    "a": [
      "SBB Re 460 („Lok 2000“)",
      "SBB Re 4/4 IV (Prototyp)",
      "SBB Re 482 (Traxx AC)",
      "BLS Re 485 (Cargo-Lok)"
    ],
    "wasDasIst": {
      "title": "SBB Re 460 („Lok 2000“)",
      "nick": "„Lok 2000“ / „Werbelok“",
      "operator": "SBB CFF FFS",
      "built": "1991–1997 (119 Loks)",
      "builder": "SLM Winterthur · ABB (Umrichtertechnik)",
      "power": "6.100 kW",
      "vmax": "200 km/h (Auslegung bis 230 km/h)",
      "system": "15 kV / 16,7 Hz AC · Normalspur (1.435 mm)",
      "trivia": "Die aerodynamische Schnauze entwarf Ferraris Hausdesigner Pininfarina in Turin! Mit ihren Drehstrom-Asynchronmotoren und computergesteuerten GTO-Umrichtern schiebt und zieht die Re 460 bis heute die IC2000-Doppelstockzüge im Stundentakt quer durch die Schweiz."
    },
    "credit": {
      "artist": "Bahnfrend",
      "license": "CC BY-SA 4.0",
      "commons": "File:Re 460 058-1 + IC 2000 St. Gallen, 2014 (1).JPG"
    },
    "explanation": "Die aerodynamische Schnauze entwarf Ferraris Hausdesigner Pininfarina in Turin! Mit ihren Drehstrom-Asynchronmotoren und computergesteuerten GTO-Umrichtern schiebt und zieht die Re 460 bis heute die IC2000-Doppelstockzüge im Stundentakt quer durch die Schweiz.",
    "exp": "Die aerodynamische Schnauze entwarf Ferraris Hausdesigner Pininfarina in Turin! Mit ihren Drehstrom-Asynchronmotoren und computergesteuerten GTO-Umrichtern schiebt und zieht die Re 460 bis heute die IC2000-Doppelstockzüge im Stundentakt quer durch die Schweiz."
  },
  {
    "id": 5,
    "cat": "klassiker",
    "eraLabel": "Baujahre 1989–1997",
    "img": "./img/lok-05.jpg",
    "q": "Welche kompakte SBB-Lokomotive besitzt ab Werk nur einen einzigen Führerstand und wurde speziell für die ersten Doppelstockzüge der Zürcher S-Bahn konstruiert?",
    "a": [
      "SBB Re 450 (DPZ-Lok)",
      "SBB Re 420 (Lion-S-Bahn)",
      "BLS Re 465 (Lötschberg)",
      "SBB Ee 922 (Rangierlok)"
    ],
    "wasDasIst": {
      "title": "SBB Re 450 (Doppelstock-Pendelzug)",
      "nick": "„DPZ-Lok“",
      "operator": "SBB CFF FFS (S-Bahn Zürich / ZVV)",
      "built": "1989–1997 (115 Stück)",
      "builder": "SLM · ABB · SIG · SWP",
      "power": "3.200 kW",
      "vmax": "130 km/h",
      "system": "15 kV / 16,7 Hz AC · Normalspur (1.435 mm)",
      "trivia": "Weil der Doppelstock-Pendelzug als feste Einheit verkehrt und am anderen Zugende ein Steuerwagen sitzt, sparte die SBB den zweiten Führerstand ein. Stattdessen nutzt der Lokführer den hinteren Raum als Gepäck- und Postabteil!"
    },
    "credit": {
      "artist": "Kabelleger / David Gubler",
      "license": "CC BY-SA 3.0",
      "commons": "File:SBB Re 450 060 ZVV Pfäffikon - Kempten.jpg"
    },
    "explanation": "Weil der Doppelstock-Pendelzug als feste Einheit verkehrt und am anderen Zugende ein Steuerwagen sitzt, sparte die SBB den zweiten Führerstand ein. Stattdessen nutzt der Lokführer den hinteren Raum als Gepäck- und Postabteil!",
    "exp": "Weil der Doppelstock-Pendelzug als feste Einheit verkehrt und am anderen Zugende ein Steuerwagen sitzt, sparte die SBB den zweiten Führerstand ein. Stattdessen nutzt der Lokführer den hinteren Raum als Gepäck- und Postabteil!"
  },
  {
    "id": 6,
    "cat": "klassiker",
    "eraLabel": "Baujahre 1984–1996",
    "img": "./img/lok-06.jpg",
    "q": "Welchen bunten Spitznamen erhielt dieser Regionaltriebwagen der SBB wegen seiner ursprünglichen Farbgebung aus silbergrauer Wand, blauen Streifen und sonnengelben Türen?",
    "a": [
      "„Kolibri“ (Neuer Pendelzug)",
      "„Roter Pfeil“ (Schnelltriebwagen)",
      "„Gotthard-Fuchs“ (Bergzug)",
      "„Goldküstenexpress“ (Mirage)"
    ],
    "wasDasIst": {
      "title": "SBB RBDe 560 (NPZ – Neuer Pendelzug)",
      "nick": "„Kolibri“ (heute modernisiert als „Domino“)",
      "operator": "SBB CFF FFS · Regionalverkehr",
      "built": "1984–1996 (Modernisierung zu „Domino“ 2008–2013)",
      "builder": "FFA · SIG · SWP · BBC / ABB",
      "power": "1.650 kW",
      "vmax": "140 km/h",
      "system": "15 kV / 16,7 Hz AC · Normalspur (1.435 mm)",
      "trivia": "Die Schweizer Taufe als „Kolibri“ verdankte der Zug seinen auffälligen Signalfarben im grauen Eisenbahnalltag der 1980er. Nach einer umfassenden Modernisierung mit klimatisierten Niederflur-Zwischenwagen fährt die Flotte heute als „Domino“!"
    },
    "credit": {
      "artist": "NAC",
      "license": "CC BY-SA 4.0",
      "commons": "File:FFS RBDe 560 100-9 Wohlen 111110.jpg"
    },
    "explanation": "Die Schweizer Taufe als „Kolibri“ verdankte der Zug seinen auffälligen Signalfarben im grauen Eisenbahnalltag der 1980er. Nach einer umfassenden Modernisierung mit klimatisierten Niederflur-Zwischenwagen fährt die Flotte heute als „Domino“!",
    "exp": "Die Schweizer Taufe als „Kolibri“ verdankte der Zug seinen auffälligen Signalfarben im grauen Eisenbahnalltag der 1980er. Nach einer umfassenden Modernisierung mit klimatisierten Niederflur-Zwischenwagen fährt die Flotte heute als „Domino“!"
  },
  {
    "id": 7,
    "cat": "klassiker",
    "eraLabel": "Im Dienst 1959–2014",
    "img": "./img/lok-07.jpg",
    "q": "Welcher 1959 eingeführte Hochleistungstriebwagen mit vier Fahrmotoren und 125 km/h Spitze war so zugkräftig, dass er schwere Schnellzüge über steile Gebirgsrampen zog?",
    "a": [
      "SBB RBe 4/4 (RBe 540)",
      "SBB De 4/4 (Gepäcktriebwagen)",
      "SBB BDe 4/4 (Nahverkehr)",
      "BLS Ce 4/4 (Dekoventil)"
    ],
    "wasDasIst": {
      "title": "SBB RBe 4/4 (UIC: RBe 540)",
      "nick": "„Seetal-Sprinter“ / Klassischer Pendel-Triebwagen",
      "operator": "SBB CFF FFS (bis 2014)",
      "built": "1959–1966 (82 Triebwagen, Umbau ab 1992 zu RBe 540)",
      "builder": "SIG · SWS · BBC · MFO",
      "power": "1.988 kW (ca. 2.700 PS)",
      "vmax": "125 km/h",
      "system": "15 kV / 16,7 Hz AC · Normalspur (1.435 mm)",
      "trivia": "Mit 2.000 Kilowatt war dieser Triebwagen stärker als viele echte Lokomotiven seiner Ära! Er zog problemlos bis zu sechs voll besetzte Schnellzugwagen über steilste Rampen und hielt sich über 50 Jahre lang im SBB-Bestand."
    },
    "credit": {
      "artist": "Markus Eigenheer",
      "license": "CC BY-SA 2.0",
      "commons": "File:Ex SBB CFF FFS RBe 4 4 1405 2019-07-21.jpg"
    },
    "explanation": "Mit 2.000 Kilowatt war dieser Triebwagen stärker als viele echte Lokomotiven seiner Ära! Er zog problemlos bis zu sechs voll besetzte Schnellzugwagen über steilste Rampen und hielt sich über 50 Jahre lang im SBB-Bestand.",
    "exp": "Mit 2.000 Kilowatt war dieser Triebwagen stärker als viele echte Lokomotiven seiner Ära! Er zog problemlos bis zu sechs voll besetzte Schnellzugwagen über steilste Rampen und hielt sich über 50 Jahre lang im SBB-Bestand."
  },
  {
    "id": 8,
    "cat": "klassiker",
    "eraLabel": "Baujahr 1982 (4 Prototypen)",
    "img": "./img/lok-08.jpg",
    "q": "Von welcher seltenen 160-km/h-Versuchslok mit geriffelten Seitenwänden bauten die SBB Anfang der 1980er nur vier Prototypen, bevor sie an die Schweizerische Südostbahn (SOB) gingen?",
    "a": [
      "SBB Re 4/4 IV (SOB Re 446)",
      "SBB Ae 4/7 (Buchli-Antrieb)",
      "SBB Am 841 (Diesellok)",
      "BLS Re 4/4 (Braune BLS)"
    ],
    "wasDasIst": {
      "title": "SBB Re 4/4 IV · heute SOB Re 446",
      "nick": "„Bahn-2000-Prototyp“",
      "operator": "SBB (bis 1994), seither Südostbahn (SOB) / EDG",
      "built": "1982 (nur 4 Exemplare: 10101–10104)",
      "builder": "SLM Winterthur · BBC",
      "power": "4.960 kW",
      "vmax": "160 km/h",
      "system": "15 kV / 16,7 Hz AC · Normalspur (1.435 mm)",
      "trivia": "Die vier Prototypen dienten den SBB als Testträger für moderne Thyristor-Stromrichtertechnik. Bei der Südostbahn wurden sie mit ihren bunten Werbebeklebungen (u. a. für Märklin und Voralpen-Express) zu echten Fan-Lieblingen!"
    },
    "credit": {
      "artist": "Joachim Lutz",
      "license": "CC BY-SA 4.0",
      "commons": "File:SBB Re 4-4 IV (10103 A W).jpg"
    },
    "explanation": "Die vier Prototypen dienten den SBB als Testträger für moderne Thyristor-Stromrichtertechnik. Bei der Südostbahn wurden sie mit ihren bunten Werbebeklebungen (u. a. für Märklin und Voralpen-Express) zu echten Fan-Lieblingen!",
    "exp": "Die vier Prototypen dienten den SBB als Testträger für moderne Thyristor-Stromrichtertechnik. Bei der Südostbahn wurden sie mit ihren bunten Werbebeklebungen (u. a. für Märklin und Voralpen-Express) zu echten Fan-Lieblingen!"
  },
  {
    "id": 9,
    "cat": "modern",
    "eraLabel": "Baujahre 1999–2005",
    "img": "./img/lok-09.jpg",
    "q": "Welcher siebenteilige InterCity-Neigezug mit aerodynamischer Walfisch-Front kurvt seit dem Jahr 2000 mit bis zu 200 km/h aktiv geneigt um die engen Kurven der Schweizer Jura-Südfußlinie?",
    "a": [
      "SBB RABDe 500 („ICN“)",
      "SBB RABe 501 („Giruno“)",
      "SBB RABe 502 („FV-Dosto“)",
      "SBB RABe 503 („Astoro“)"
    ],
    "wasDasIst": {
      "title": "SBB RABDe 500 („ICN“ – InterCity-Neigezug)",
      "nick": "„ICN“",
      "operator": "SBB CFF FFS",
      "built": "1999–2005 (44 Züge)",
      "builder": "Adtranz / Bombardier · Alstom · Design: Pininfarina",
      "power": "5.200 kW",
      "vmax": "200 km/h",
      "system": "15 kV / 16,7 Hz AC · Normalspur (1.435 mm)",
      "trivia": "Dank aktiver Neigetechnik legt sich der ICN bis zu 8 Grad in die Kurven und fährt auf kurvenreichen Strecken bis zu 20 % schneller als gewöhnliche Züge. Er verkürzte die Reisezeit zwischen Genf, Biel, Zürich und St. Gallen spürbar!"
    },
    "credit": {
      "artist": "Kabelleger / David Gubler",
      "license": "CC BY-SA 4.0",
      "commons": "File:SBB RABDe 500 Twann - Ligerz.jpg"
    },
    "explanation": "Dank aktiver Neigetechnik legt sich der ICN bis zu 8 Grad in die Kurven und fährt auf kurvenreichen Strecken bis zu 20 % schneller als gewöhnliche Züge. Er verkürzte die Reisezeit zwischen Genf, Biel, Zürich und St. Gallen spürbar!",
    "exp": "Dank aktiver Neigetechnik legt sich der ICN bis zu 8 Grad in die Kurven und fährt auf kurvenreichen Strecken bis zu 20 % schneller als gewöhnliche Züge. Er verkürzte die Reisezeit zwischen Genf, Biel, Zürich und St. Gallen spürbar!"
  },
  {
    "id": 10,
    "cat": "modern",
    "eraLabel": "Seit 2017 / Einsatz ab 2019",
    "img": "./img/lok-10.jpg",
    "q": "Welcher elfteilige 250-km/h-Hochgeschwindigkeitszug von Stadler Rail wurde für den Gotthard-Basistunnel gebaut und nach dem rätoromanischen Wort für „Mäusebussard“ benannt?",
    "a": [
      "SBB RABe 501 („Giruno“)",
      "SBB RABDe 500 („ICN“)",
      "SBB ETR 610 („Cisalpino“)",
      "Stadler SMILE 300"
    ],
    "wasDasIst": {
      "title": "SBB RABe 501 („Giruno“ / Stadler SMILE)",
      "nick": "„Giruno“ (rätoromanisch: Mäusebussard)",
      "operator": "SBB CFF FFS",
      "built": "seit 2017 (29 + nachbestellte Züge)",
      "builder": "Stadler Rail (Thurgau)",
      "power": "6.000 kW Max. (4.720 kW Dauer)",
      "vmax": "250 km/h",
      "system": "3 Stromsysteme (CH/DE 15 kV AC · IT 3 kV DC & 25 kV AC)",
      "trivia": "„Giruno“ ist Rätoromanisch für Mäusebussard – passend zum rasanten Flug durch den längsten Eisenbahntunnel der Welt (57 km Gotthard-Basistunnel). Er bietet stufenlose Einstiege und verbindet die Schweiz im Hochtempo mit Mailand und Frankfurt!"
    },
    "credit": {
      "artist": "Nelso Silva",
      "license": "CC BY-SA 2.0",
      "commons": "File:SBB RABe 501 017.jpg"
    },
    "explanation": "„Giruno“ ist Rätoromanisch für Mäusebussard – passend zum rasanten Flug durch den längsten Eisenbahntunnel der Welt (57 km Gotthard-Basistunnel). Er bietet stufenlose Einstiege und verbindet die Schweiz im Hochtempo mit Mailand und Frankfurt!",
    "exp": "„Giruno“ ist Rätoromanisch für Mäusebussard – passend zum rasanten Flug durch den längsten Eisenbahntunnel der Welt (57 km Gotthard-Basistunnel). Er bietet stufenlose Einstiege und verbindet die Schweiz im Hochtempo mit Mailand und Frankfurt!"
  },
  {
    "id": 11,
    "cat": "modern",
    "eraLabel": "Baujahre 2015–2022",
    "img": "./img/lok-11.jpg",
    "q": "Welcher InterCity-Doppelstockzug von Bombardier sorgte wegen anfänglicher Softwareprobleme der Wankkompensation für Schlagzeilen, bildet heute aber das Rückgrat auf Schweizer Magistralen?",
    "a": [
      "SBB RABe 502 („FV-Dosto“)",
      "SBB RABe 511 („KISS“)",
      "SBB Re 450 („DPZ Plus“)",
      "BLS RABe 515 („MUTZ“)"
    ],
    "wasDasIst": {
      "title": "SBB RABe 502 („FV-Dosto“ / Twindexx Swiss Express)",
      "nick": "„FV-Dosto“",
      "operator": "SBB CFF FFS",
      "built": "2015–2022 (62 Züge: IC200 / IR200 / IR100)",
      "builder": "Bombardier Transportation (heute Alstom)",
      "power": "3.750 kW (4-teilig) bzw. 7.500 kW (8-teilig)",
      "vmax": "200 km/h",
      "system": "15 kV / 16,7 Hz AC · Normalspur (1.435 mm)",
      "trivia": "Seine elektromechanische Wankkompensation gleicht Fliehkräfte in Kurven aus, damit Reisende auch bei höherem Tempo im Doppelstockwagen nicht ins Schwanken geraten. Nach anfänglichen Kinderkrankheiten rollen die Züge heute zuverlässig als IC-Rückgrat."
    },
    "credit": {
      "artist": "Kabelleger / David Gubler",
      "license": "CC BY-SA 4.0",
      "commons": "File:SBB RABe 502 203 Ossingen.jpg"
    },
    "explanation": "Seine elektromechanische Wankkompensation gleicht Fliehkräfte in Kurven aus, damit Reisende auch bei höherem Tempo im Doppelstockwagen nicht ins Schwanken geraten. Nach anfänglichen Kinderkrankheiten rollen die Züge heute zuverlässig als IC-Rückgrat.",
    "exp": "Seine elektromechanische Wankkompensation gleicht Fliehkräfte in Kurven aus, damit Reisende auch bei höherem Tempo im Doppelstockwagen nicht ins Schwanken geraten. Nach anfänglichen Kinderkrankheiten rollen die Züge heute zuverlässig als IC-Rückgrat."
  },
  {
    "id": 12,
    "cat": "modern",
    "eraLabel": "Seit 2007 (SBB 2. Serie ab 2014)",
    "img": "./img/lok-12.jpg",
    "q": "Welcher elegante 250-km/h-Neigezug aus der Alstom-Pendolino-Familie verbindet die Schweiz unter drei Stromsystemen grenzüberschreitend mit Deutschland und Italien?",
    "a": [
      "SBB RABe 503 / ETR 610 („Astoro“)",
      "SBB RABe 501 („Giruno“)",
      "FS Frecciarossa 1000",
      "DB ICE 4 (Baureihe 412)"
    ],
    "wasDasIst": {
      "title": "SBB RABe 503 / ETR 610 („Astoro“)",
      "nick": "„Astoro“ (lat. „Habicht“ / „New Pendolino“)",
      "operator": "SBB CFF FFS (anfangs teils Cisalpino) · Trenitalia",
      "built": "seit 2007 (1. Serie ETR 610) / 2014–2017 (2. Serie RABe 503)",
      "builder": "Alstom (Savigliano, ehemals Fiat Ferroviaria)",
      "power": "5.500 kW",
      "vmax": "250 km/h",
      "system": "4 Stromsysteme (CH/DE/AT/IT) · Normalspur",
      "trivia": "Nach dem Debakel um die unzuverlässigen Cisalpino-Vorgänger ETR 470 übernahmen die SBB und Trenitalia die modernen ETR 610. Der Zug beherrscht Schweizer Wechselstrom, deutsches Bahnnetz und italienischen Gleichstrom gleichermaßen!"
    },
    "credit": {
      "artist": "Chme82",
      "license": "CC BY-SA 4.0",
      "commons": "File:SBB ETR 610-013 Astoro Brig.jpg"
    },
    "explanation": "Nach dem Debakel um die unzuverlässigen Cisalpino-Vorgänger ETR 470 übernahmen die SBB und Trenitalia die modernen ETR 610. Der Zug beherrscht Schweizer Wechselstrom, deutsches Bahnnetz und italienischen Gleichstrom gleichermaßen!",
    "exp": "Nach dem Debakel um die unzuverlässigen Cisalpino-Vorgänger ETR 470 übernahmen die SBB und Trenitalia die modernen ETR 610. Der Zug beherrscht Schweizer Wechselstrom, deutsches Bahnnetz und italienischen Gleichstrom gleichermaßen!"
  },
  {
    "id": 13,
    "cat": "modern",
    "eraLabel": "Baujahre 2010–2016",
    "img": "./img/lok-13.jpg",
    "q": "Wofür steht das pfiffige Akronym „KISS“ bei diesem doppelstöckigen Stadler-Triebzug, der unter anderem in der S-Bahn Zürich und im RegioExpress-Netz eingesetzt wird?",
    "a": [
      "Komfortabler Innovativer Spurtstarker S-Bahn-Zug",
      "Kompakter Interregio-Schnellzug Schweiz",
      "Klimatisierter Moderner Doppelstock-Triebwagen",
      "Kombinierter Nahverkehrszug für Städte"
    ],
    "wasDasIst": {
      "title": "SBB RABe 511 (Stadler „KISS“)",
      "nick": "„KISS“ / „Regio-Dosto“",
      "operator": "SBB CFF FFS (S-Bahn & RegioExpress)",
      "built": "2010–2016 (und Folgebestellungen)",
      "builder": "Stadler Rail",
      "power": "4.000 kW Dauer / 6.000 kW Stundenleistung",
      "vmax": "160 km/h",
      "system": "15 kV / 16,7 Hz AC · Normalspur (1.435 mm)",
      "trivia": "Stadler Rail taufte den Doppelstockzug mit feinem Humor „KISS“ – passend zum Schwestermodell „FLIRT“. Mit bis zu 160 km/h und gewaltiger Anfahrbeschleunigung bewältigt er größte Fahrgastmassen im Schweizer Mittelland!"
    },
    "credit": {
      "artist": "Remontees",
      "license": "CC BY-SA 4.0",
      "commons": "File:Rabe-511-kiss-gare-annemasse1.jpg"
    },
    "explanation": "Stadler Rail taufte den Doppelstockzug mit feinem Humor „KISS“ – passend zum Schwestermodell „FLIRT“. Mit bis zu 160 km/h und gewaltiger Anfahrbeschleunigung bewältigt er größte Fahrgastmassen im Schweizer Mittelland!",
    "exp": "Stadler Rail taufte den Doppelstockzug mit feinem Humor „KISS“ – passend zum Schwestermodell „FLIRT“. Mit bis zu 160 km/h und gewaltiger Anfahrbeschleunigung bewältigt er größte Fahrgastmassen im Schweizer Mittelland!"
  },
  {
    "id": 14,
    "cat": "modern",
    "eraLabel": "Seit 2004 (Globaler Bestseller)",
    "img": "./img/lok-14.jpg",
    "q": "Welche weltweit erfolgreiche Triebzugfamilie von Stadler Rail verdankt ihren Namen dem Akronym „Flinker Leichter Innovativer Regional-Triebzug“?",
    "a": [
      "FLIRT (RABe 521–524)",
      "KISS (Doppelstock-Triebzug)",
      "GTW (Gelenktriebwagen)",
      "WINK (Zweikraft-Triebzug)"
    ],
    "wasDasIst": {
      "title": "SBB RABe 523 (Stadler „FLIRT“)",
      "nick": "„FLIRT“",
      "operator": "SBB CFF FFS (Stadtbahn Zug, Léman Express, TILO, S-Bahnen)",
      "built": "seit 2004 in mehreren Generationen",
      "builder": "Stadler Rail (Bussnang)",
      "power": "2.000 kW (2.600 kW Max.)",
      "vmax": "160 km/h",
      "system": "15 kV / 16,7 Hz AC (u. a. auch Zweisystem CH/FR oder CH/IT)",
      "trivia": "Weil die Antriebe auf den Endwagen sitzen und die Zwischenwagen auf Jakobs-Drehgestellen ruhen, ist der FLIRT extrem leicht und spurtstark. Stadler verkaufte bisher über 2.500 Einheiten in mehr als 20 Länder weltweit!"
    },
    "credit": {
      "artist": "JoachimKohler-HB",
      "license": "CC BY-SA 4.0",
      "commons": "File:Bahnhof Yverdon-les-Bains mit SBB RABe 523 109 (2026).jpg"
    },
    "explanation": "Weil die Antriebe auf den Endwagen sitzen und die Zwischenwagen auf Jakobs-Drehgestellen ruhen, ist der FLIRT extrem leicht und spurtstark. Stadler verkaufte bisher über 2.500 Einheiten in mehr als 20 Länder weltweit!",
    "exp": "Weil die Antriebe auf den Endwagen sitzen und die Zwischenwagen auf Jakobs-Drehgestellen ruhen, ist der FLIRT extrem leicht und spurtstark. Stadler verkaufte bisher über 2.500 Einheiten in mehr als 20 Länder weltweit!"
  },
  {
    "id": 15,
    "cat": "modern",
    "eraLabel": "Bau ab 2017 · Einsatz ab 2019",
    "img": "./img/lok-15.jpg",
    "q": "Unter welchem klangvollen Namen verkehrt dieser kupferfarbene Luxus-FLIRT-3 der Südostbahn auf der Panoramastrecke des „Voralpen-Express“ und am Gotthard?",
    "a": [
      "„Traverso“ (SOB FLIRT 3)",
      "„Giruno“ (Basistunnel-Zug)",
      "„Treno Gottardo“ (Triebzug)",
      "„Mika“ (Lötschberg-Sprinter)"
    ],
    "wasDasIst": {
      "title": "SOB RABe 526 („Traverso“ · Stadler FLIRT 3)",
      "nick": "„Traverso“ (ital./rätorom. „Querung“)",
      "operator": "Schweizerische Südostbahn (SOB)",
      "built": "ab 2017, Einsatz ab 2019/2020",
      "builder": "Stadler Rail",
      "power": "4.000 kW Stunde (5.200 kW Max.)",
      "vmax": "160 km/h",
      "system": "15 kV / 16,7 Hz AC · Normalspur (1.435 mm)",
      "trivia": "Sein edler kupferroter Metalliclack und Panoramafenster machen den Traverso zum Hingucker zwischen St. Gallen und Luzern. Er überwindet als Voralpen-Express mühelos bis zu 50 Promille Steigung ganz ohne Zahnrad!"
    },
    "credit": {
      "artist": "NAC",
      "license": "CC BY-SA 4.0",
      "commons": "File:SOB RABe 526 121 Goeschenen 021223.jpg"
    },
    "explanation": "Sein edler kupferroter Metalliclack und Panoramafenster machen den Traverso zum Hingucker zwischen St. Gallen und Luzern. Er überwindet als Voralpen-Express mühelos bis zu 50 Promille Steigung ganz ohne Zahnrad!",
    "exp": "Sein edler kupferroter Metalliclack und Panoramafenster machen den Traverso zum Hingucker zwischen St. Gallen und Luzern. Er überwindet als Voralpen-Express mühelos bis zu 50 Promille Steigung ganz ohne Zahnrad!"
  },
  {
    "id": 16,
    "cat": "modern",
    "eraLabel": "Seit 2020/2021",
    "img": "./img/lok-16.jpg",
    "q": "Unter welchem pfiffigen Akronym („Moderner Innovativer Kompakter Alleskönner“) setzt die BLS seit 2021 die vierte Generation des Stadler FLIRT im Berner Oberland ein?",
    "a": [
      "„MIKA“ (RABe 528)",
      "„MUTZ“ (RABe 515)",
      "„NINA“ (RABe 525)",
      "„LÖTSCHI“ (RABe 535)"
    ],
    "wasDasIst": {
      "title": "BLS RABe 528 („MIKA“ – Moderner Innovativer Kompakter Alleskönner)",
      "nick": "„MIKA“",
      "operator": "BLS AG",
      "built": "seit 2020/2021 (RegioExpress- und S-Bahn-Varianten)",
      "builder": "Stadler Rail",
      "power": "2.000 kW am Rad",
      "vmax": "160 km/h",
      "system": "15 kV / 16,7 Hz AC · Normalspur (1.435 mm)",
      "trivia": "Die BLS taufte den Zug „MIKA“ für „Moderner, Innovativer, Kompakter Alleskönner“. Als modularer Sechsteiler ersetzt er gleich drei ältere Baureihen auf den anspruchsvollen Strecken über den Lötschberg und ins Wallis."
    },
    "credit": {
      "artist": "Vsler",
      "license": "CC BY-SA 4.0",
      "commons": "File:BLS MIKA 105 Burgdorf.jpg"
    },
    "explanation": "Die BLS taufte den Zug „MIKA“ für „Moderner, Innovativer, Kompakter Alleskönner“. Als modularer Sechsteiler ersetzt er gleich drei ältere Baureihen auf den anspruchsvollen Strecken über den Lötschberg und ins Wallis.",
    "exp": "Die BLS taufte den Zug „MIKA“ für „Moderner, Innovativer, Kompakter Alleskönner“. Als modularer Sechsteiler ersetzt er gleich drei ältere Baureihen auf den anspruchsvollen Strecken über den Lötschberg und ins Wallis."
  },
  {
    "id": 17,
    "cat": "spezial",
    "eraLabel": "Baujahre 1964–1983",
    "img": "./img/lok-17.jpg",
    "q": "Auf welcher berühmten Schweizer Gebirgstransversale zog diese markant kantige braune BLS-Lokomotive mit Diodengleichrichtern über 50 Jahre lang schwere Güterzüge?",
    "a": [
      "Lötschberg-Simplon-Bergstrecke",
      "Albulabahn der Rhätischen Bahn",
      "Gotthard-Südrampe der SBB",
      "Centovalli-Schmalspurbahn"
    ],
    "wasDasIst": {
      "title": "BLS Re 4/4 (UIC: Re 425)",
      "nick": "„Braune BLS“ / „Bruneli“",
      "operator": "Bern-Lötschberg-Simplon-Bahn (BLS)",
      "built": "1964–1983 (35 Loks)",
      "builder": "SLM Winterthur · BBC",
      "power": "4.990 kW (ca. 6.785 PS)",
      "vmax": "140 km/h",
      "system": "15 kV / 16,7 Hz AC · Normalspur (1.435 mm)",
      "trivia": "Dank stufenloser Thyristor- und Diodensteuerung nutzte die braune BLS-Maschine die Reibung auf nassen Schienen perfekt aus und zog schwere Züge steilste Rampen hinauf, an denen andere Loks hilflos durchdrehten!"
    },
    "credit": {
      "artist": "NAC",
      "license": "CC BY-SA 4.0",
      "commons": "File:5 BLS Re 4-4 180 Kandersteg 120818.jpg"
    },
    "explanation": "Dank stufenloser Thyristor- und Diodensteuerung nutzte die braune BLS-Maschine die Reibung auf nassen Schienen perfekt aus und zog schwere Züge steilste Rampen hinauf, an denen andere Loks hilflos durchdrehten!",
    "exp": "Dank stufenloser Thyristor- und Diodensteuerung nutzte die braune BLS-Maschine die Reibung auf nassen Schienen perfekt aus und zog schwere Züge steilste Rampen hinauf, an denen andere Loks hilflos durchdrehten!"
  },
  {
    "id": 18,
    "cat": "spezial",
    "eraLabel": "Baujahre 1994–1997",
    "img": "./img/lok-18.jpg",
    "q": "Worin unterschied sich die dunkelblaue BLS-Lokomotive Re 465 technisch wesentlich von ihrer roten SBB-Schwester Re 460 („Lok 2000“)?",
    "a": [
      "Einzelachssteuerung & höhere Leistung für schwere Güterzüge",
      "Reiner Gleichstromantrieb für den Tunnel",
      "Zusätzlicher Dieselmotor für Rangierfahrten",
      "Dreiachsige Drehgestelle für Gebirgsstrecken"
    ],
    "wasDasIst": {
      "title": "BLS Re 465",
      "nick": "„Blaue Lok 2000“ / Alpenlok",
      "operator": "BLS / BLS Cargo (18 Loks)",
      "built": "1994–1997",
      "builder": "SLM Winterthur · ABB",
      "power": "6.400 kW Dauer / 7.000 kW Stunde",
      "vmax": "160 km/h (Auslegung 230 km/h)",
      "system": "15 kV / 16,7 Hz AC · Normalspur (1.435 mm)",
      "trivia": "Statt Drehgestell-Steuerung besitzt die Re 465 vier getrennte Stromrichter für jedes einzelne Radpaar. Dadurch bringt sie ihre gewaltigen 7.000 Kilowatt am Lötschberg auch bei Eis und Schnee schlupffrei aufs Gleis!"
    },
    "credit": {
      "artist": "Titane8226",
      "license": "CC BY 3.0",
      "commons": "File:Re465 012-3.jpg"
    },
    "explanation": "Statt Drehgestell-Steuerung besitzt die Re 465 vier getrennte Stromrichter für jedes einzelne Radpaar. Dadurch bringt sie ihre gewaltigen 7.000 Kilowatt am Lötschberg auch bei Eis und Schnee schlupffrei aufs Gleis!",
    "exp": "Statt Drehgestell-Steuerung besitzt die Re 465 vier getrennte Stromrichter für jedes einzelne Radpaar. Dadurch bringt sie ihre gewaltigen 7.000 Kilowatt am Lötschberg auch bei Eis und Schnee schlupffrei aufs Gleis!"
  },
  {
    "id": 19,
    "cat": "spezial",
    "eraLabel": "Baujahre 1973 & 1984–1985",
    "img": "./img/lok-19.jpg",
    "q": "Auf welcher Spurweite und unter welchem Bahnstromsystem verkehrt diese schwere rote Universallokomotive der Rhätischen Bahn im Kanton Graubünden?",
    "a": [
      "1.000 mm Meterspur · 11 kV / 16,7 Hz Wechselstrom",
      "1.435 mm Normalspur · 15 kV / 16,7 Hz Wechselstrom",
      "1.000 mm Meterspur · 1.500 V Gleichstrom",
      "750 mm Schmalspur · Diesel-hydraulisch"
    ],
    "wasDasIst": {
      "title": "RhB Ge 4/4 II (Nr. 611–633)",
      "nick": "„Bündner Bo’Bo’“",
      "operator": "Rhätische Bahn (RhB · Stammnetz)",
      "built": "1973 (1. Serie) und 1984–1985 (2. Serie, 23 Loks)",
      "builder": "SLM Winterthur · BBC",
      "power": "1.700 kW (ca. 2.310 PS)",
      "vmax": "90 km/h",
      "system": "11 kV / 16,7 Hz AC · Meterspur (1.000 mm)",
      "trivia": "Obwohl sie auf schmaler 1.000-mm-Meterspur balanciert, leistet die Ge 4/4 II beachtliche 2.300 PS. Sie zieht den berühmten Glacier Express und Bernina Express durch Eis und Schnee über steilste Albulapässe!"
    },
    "credit": {
      "artist": "Valo139",
      "license": "CC BY-SA 4.0",
      "commons": "File:RhB - Ge 4-4 II 632 (valo139).jpg"
    },
    "explanation": "Obwohl sie auf schmaler 1.000-mm-Meterspur balanciert, leistet die Ge 4/4 II beachtliche 2.300 PS. Sie zieht den berühmten Glacier Express und Bernina Express durch Eis und Schnee über steilste Albulapässe!",
    "exp": "Obwohl sie auf schmaler 1.000-mm-Meterspur balanciert, leistet die Ge 4/4 II beachtliche 2.300 PS. Sie zieht den berühmten Glacier Express und Bernina Express durch Eis und Schnee über steilste Albulapässe!"
  },
  {
    "id": 20,
    "cat": "spezial",
    "eraLabel": "Baujahre 1993–1999",
    "img": "./img/lok-20.jpg",
    "q": "Über welches UNESCO-Welterbe-Bauwerk der Albulabahn überquert diese moderne RhB-Drehstromlokomotive auf dem Foto in schwindelerregender Höhe das Tal bei Filisur?",
    "a": [
      "Landwasserviadukt bei Filisur",
      "Wiesener Viadukt bei Davos",
      "Soliser Viadukt im Schams",
      "Brusio-Kreisviadukt"
    ],
    "wasDasIst": {
      "title": "RhB Ge 4/4 III (Nr. 641–652)",
      "nick": "„Kleine Lok 2000“",
      "operator": "Rhätische Bahn (RhB)",
      "built": "1993–1999 (12 Stück)",
      "builder": "SLM Winterthur · ABB / Adtranz",
      "power": "2.400 kW Dauer (3.100 kW Max.)",
      "vmax": "100 km/h",
      "system": "11 kV / 16,7 Hz AC · Meterspur (1.000 mm)",
      "trivia": "Das spektakuläre Landwasserviadukt steht auf 65 Meter hohen Pfeilern mitten im Felsabgrund und führt direkt in einen Tunnel. Die Ge 4/4 III stellte 2022 den Weltrekord für den längsten Schmalspur-Passagierzug der Erde auf!"
    },
    "credit": {
      "artist": "Kabelleger / David Gubler",
      "license": "CC BY-SA 3.0",
      "commons": "File:RhB Ge 4-4 III UNESCO Weltkulturerbe auf Landwasserviadukt.jpg"
    },
    "explanation": "Das spektakuläre Landwasserviadukt steht auf 65 Meter hohen Pfeilern mitten im Felsabgrund und führt direkt in einen Tunnel. Die Ge 4/4 III stellte 2022 den Weltrekord für den längsten Schmalspur-Passagierzug der Erde auf!",
    "exp": "Das spektakuläre Landwasserviadukt steht auf 65 Meter hohen Pfeilern mitten im Felsabgrund und führt direkt in einen Tunnel. Die Ge 4/4 III stellte 2022 den Weltrekord für den längsten Schmalspur-Passagierzug der Erde auf!"
  },
  {
    "id": 21,
    "cat": "spezial",
    "eraLabel": "Baujahre 2009–2010",
    "img": "./img/lok-21.jpg",
    "q": "Wie bewältigt der dreiteilige RhB-Triebzug „Allegra“ den extremen Wechsel zwischen Albulabahn (Wechselstrom) und der steilen Berninabahn (Gleichstrom)?",
    "a": [
      "Als Zweisystem-Triebzug (11 kV AC & 1.000 V DC) mit 8 angetriebenen Achsen",
      "Durch einen integrierten Biodiesel-Hilfsmotor für Steilstrecken",
      "Mit automatischem Lokwechsel an der Scheitelstation Ospizio Bernina",
      "Über einen umschaltbaren Akku-Speicher im Mittelwagen"
    ],
    "wasDasIst": {
      "title": "RhB ABe 8/12 („Allegra“)",
      "nick": "„Allegra“ (rätorom. Begrüßung)",
      "operator": "Rhätische Bahn (RhB · Bernina & Stammnetz)",
      "built": "2009–2010 (15 dreiteilige Züge)",
      "builder": "Stadler Rail",
      "power": "ca. 2.600 kW unter 11 kV AC · ca. 2.320 kW Dauer",
      "vmax": "100 km/h",
      "system": "Zweisystem: 11 kV AC (Stammnetz) & 1.000 V DC (Bernina) · 1.000 mm",
      "trivia": "Mit 8 angetriebenen Achsen und Zweisystemtechnik klettert der Allegra ohne Zahnstange auf bis zu 70 Promille Steigung hinauf auf 2.253 Meter über Meer – die höchste offene Bahnüberquerung der Alpen!"
    },
    "credit": {
      "artist": "Kabelleger / David Gubler",
      "license": "CC BY-SA 3.0",
      "commons": "File:RhB ABe 8-12 Allegra between Lagalb and Ospizio Bernina.jpg"
    },
    "explanation": "Mit 8 angetriebenen Achsen und Zweisystemtechnik klettert der Allegra ohne Zahnstange auf bis zu 70 Promille Steigung hinauf auf 2.253 Meter über Meer – die höchste offene Bahnüberquerung der Alpen!",
    "exp": "Mit 8 angetriebenen Achsen und Zweisystemtechnik klettert der Allegra ohne Zahnstange auf bis zu 70 Promille Steigung hinauf auf 2.253 Meter über Meer – die höchste offene Bahnüberquerung der Alpen!"
  },
  {
    "id": 22,
    "cat": "spezial",
    "eraLabel": "Baujahre 2002–2006",
    "img": "./img/lok-22.jpg",
    "q": "Zu welcher in ganz Europa bewährten Lokomotivfamilie von Bombardier gehört dieses zweisystemfähige Kraftpaket von SBB Cargo für den alpenquerenden Gütertransit?",
    "a": [
      "Bombardier TRAXX (F140 AC)",
      "Siemens EuroSprinter (ES64)",
      "Alstom Prima II (Multi-System)",
      "Stadler EURODUAL (Hybrid)"
    ],
    "wasDasIst": {
      "title": "SBB Cargo Re 482 (Bombardier TRAXX F140 AC)",
      "nick": "„TRAXX“ / DE-Güterlok",
      "operator": "SBB Cargo (50 Stück)",
      "built": "2002–2006",
      "builder": "Bombardier Transportation (Kassel)",
      "power": "5.600 kW",
      "vmax": "140 km/h",
      "system": "15 kV / 16,7 Hz AC (Zulassung CH & DE)",
      "trivia": "Die Re 482 ist für das deutsche und schweizerische 15-kV-Netz zugelassen und kann Güterzüge von Hamburg oder Rotterdam ohne Lokwechsel direkt bis an die Schweizer Alpentore befördern!"
    },
    "credit": {
      "artist": "Kabelleger / David Gubler",
      "license": "CC BY-SA 3.0",
      "commons": "File:Re 482 mit Containerzug bei Oberrüti.jpg"
    },
    "explanation": "Die Re 482 ist für das deutsche und schweizerische 15-kV-Netz zugelassen und kann Güterzüge von Hamburg oder Rotterdam ohne Lokwechsel direkt bis an die Schweizer Alpentore befördern!",
    "exp": "Die Re 482 ist für das deutsche und schweizerische 15-kV-Netz zugelassen und kann Güterzüge von Hamburg oder Rotterdam ohne Lokwechsel direkt bis an die Schweizer Alpentore befördern!"
  },
  {
    "id": 23,
    "cat": "spezial",
    "eraLabel": "Seit 2016 im Einsatz",
    "img": "./img/lok-23.jpg",
    "q": "Von welchem Hersteller stammt diese hochmoderne Mehrsystemlokomotive von BLS Cargo, die Güterzüge unter vier verschiedenen europäischen Stromsystemen zieht?",
    "a": [
      "Siemens Mobility (Siemens Vectron MS)",
      "Bombardier Transportation (TRAXX 3)",
      "Stadler Rail (Euro9000)",
      "Alstom Transport (Traxx MS3)"
    ],
    "wasDasIst": {
      "title": "BLS Cargo Re 475 (Siemens Vectron MS)",
      "nick": "„Die Alpinisten“ / Vectron",
      "operator": "BLS Cargo",
      "built": "seit 2016 (kontinuierlich nachbestellt)",
      "builder": "Siemens Mobility (München-Allach)",
      "power": "6.400 kW",
      "vmax": "160–200 km/h (Güterzug-Zulassung meist 160)",
      "system": "Mehrsystem (15 kV AC · 25 kV AC · 3 kV DC · 1,5 kV DC)",
      "trivia": "Der Vectron ist der Bestseller des modernen europäischen Schienengüterverkehrs: Dank Viersystemausrüstung fährt er nahtlos von den Nordseehäfen durch Deutschland, die Schweiz und Österreich bis nach Italien durch!"
    },
    "credit": {
      "artist": "Nelso Silva from Porto, Portugal",
      "license": "CC BY-SA 2.0",
      "commons": "File:BLS Cargo Re 475 402 (51422211111).jpg"
    },
    "explanation": "Der Vectron ist der Bestseller des modernen europäischen Schienengüterverkehrs: Dank Viersystemausrüstung fährt er nahtlos von den Nordseehäfen durch Deutschland, die Schweiz und Österreich bis nach Italien durch!",
    "exp": "Der Vectron ist der Bestseller des modernen europäischen Schienengüterverkehrs: Dank Viersystemausrüstung fährt er nahtlos von den Nordseehäfen durch Deutschland, die Schweiz und Österreich bis nach Italien durch!"
  },
  {
    "id": 24,
    "cat": "spezial",
    "eraLabel": "Baujahre 2003–2009",
    "img": "./img/lok-24.jpg",
    "q": "Wofür steht nach traditioneller Schweizer Eisenbahn-Nomenklatur das Kürzel „Am“ bei dieser schweren Vossloh-Diesellokomotive der SBB?",
    "a": [
      "Diesellokomotive (Verbrennungsmotor) mit über 80 km/h Höchstgeschwindigkeit",
      "Elektrische Rangierlokomotive für den Güterbahnhof",
      "Zweikraft-Rangiertraktor für Akku- und Fahrleitungsbetrieb",
      "Akkumulatoren-Lokomotive für feuergefährdete Tunnelanlagen"
    ],
    "wasDasIst": {
      "title": "SBB Am 843 (Vossloh / MaK G 1700 BB)",
      "nick": "„Schwere Rangier- & Baulok“",
      "operator": "SBB Cargo & SBB Infrastruktur (73+ Loks)",
      "built": "2003–2009",
      "builder": "Vossloh Locomotives (Kiel)",
      "power": "1.500 kW (Caterpillar V12 Diesel)",
      "vmax": "100 km/h",
      "system": "Dieselhydraulisch · Normalspur (1.435 mm)",
      "trivia": "Im Schweizer System steht das „A“ für Höchstgeschwindigkeiten über 80 km/h und das kleine „m“ für thermischen Verbrennungsmotor. Mit 1.500 kW Caterpillar-Dieselmotor zieht die Am 843 schwere Übergabezüge und rangiert auf Rangierbahnhöfen!"
    },
    "credit": {
      "artist": "Lord Koxinga",
      "license": "CC BY-SA 3.0",
      "commons": "File:Rotkreuz Am 843 MaK 1700 3283.JPG"
    },
    "explanation": "Im Schweizer System steht das „A“ für Höchstgeschwindigkeiten über 80 km/h und das kleine „m“ für thermischen Verbrennungsmotor. Mit 1.500 kW Caterpillar-Dieselmotor zieht die Am 843 schwere Übergabezüge und rangiert auf Rangierbahnhöfen!",
    "exp": "Im Schweizer System steht das „A“ für Höchstgeschwindigkeiten über 80 km/h und das kleine „m“ für thermischen Verbrennungsmotor. Mit 1.500 kW Caterpillar-Dieselmotor zieht die Am 843 schwere Übergabezüge und rangiert auf Rangierbahnhöfen!"
  }
];
  window.ArcadeQuizEngine.registerBank('swiss-trains', DATA);
})();
