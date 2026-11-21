// Unified quiz bank for "airliners" (75 questions: Zivile Passagierflugzeuge)
(function () {
  const DATA = [
  {
    "cat": "widebody",
    "diff": "easy",
    "q": "Warum erhielt die legendäre Boeing 747 („Jumbo Jet“) Ende der 1960er Jahre ihren charakteristischen Buckel?",
    "a": [
      "Airbus A380-800",
      "Boeing 747-8 Intercontinental",
      "Airbus A340-600 Long Range",
      "Boeing 777-300ER Flagship"
    ],
    "explanation": "Boeing glaubte, dass Überschallflieger die 747 bald ablösen würden, und konstruierte sie von vornherein als zukunftssicheres Frachtflugzeug mit Bugklappe.",
    "exp": "Boeing glaubte, dass Überschallflieger die 747 bald ablösen würden, und konstruierte sie von vornherein als zukunftssicheres Frachtflugzeug mit Bugklappe."
  },
  {
    "cat": "widebody",
    "diff": "easy",
    "q": "Welcher Größenvergleich verdeutlicht die gigantischen Dimensionen des GE90-Triebwerks der Boeing 777?",
    "a": [
      "Airbus A300 (A300B2)",
      "Airbus A310 Extended Range",
      "Airbus A320 Single-Aisle",
      "Airbus A330-200 Twinjet"
    ],
    "explanation": "Mit einem Bläserdurchmesser von 3,25 Metern erreicht die Gondel des GE90-115B etwa den Rumpfdurchmesser (3,76 m) einer kompletten Boeing 737.",
    "exp": "Mit einem Bläserdurchmesser von 3,25 Metern erreicht die Gondel des GE90-115B etwa den Rumpfdurchmesser (3,76 m) einer kompletten Boeing 737."
  },
  {
    "cat": "widebody",
    "diff": "easy",
    "q": "Aus welchem Hauptgrund wurde die Produktion des Airbus A380 nach nur 251 gebauten Exemplaren eingestellt?",
    "a": [
      "Boeing 747-100",
      "Boeing 707-320",
      "Boeing 727-200",
      "Boeing 737-200"
    ],
    "explanation": "Statt Passagiere über Mega-Hubs mit dem A380 zu bündeln, fliegen moderne Twins wie A350 und Boeing 787 Passagiere heute nonstop und viel flexibler ans Ziel.",
    "exp": "Statt Passagiere über Mega-Hubs mit dem A380 zu bündeln, fliegen moderne Twins wie A350 und Boeing 787 Passagiere heute nonstop und viel flexibler ans Ziel."
  },
  {
    "cat": "widebody",
    "diff": "mid",
    "q": "Warum besitzt die Tragfläche des Airbus A380 eine für das reale Flugzeug eigentlich überdimensionierte Fläche?",
    "a": [
      "Queen of the Skies",
      "Flying Fortress Legend",
      "Silver Bullet Airliner",
      "Spruce Goose Classic"
    ],
    "explanation": "Airbus plante fest mit einer gestreckten Version für über 650 Passagiere – der Flügel wurde dafür gebaut, die Version kam jedoch nie.",
    "exp": "Airbus plante fest mit einer gestreckten Version für über 650 Passagiere – der Flügel wurde dafür gebaut, die Version kam jedoch nie."
  },
  {
    "cat": "widebody",
    "diff": "mid",
    "q": "Was unterscheidet die Passagierkabine der Boeing 787 Dreamliner und des Airbus A350 spürbar von älteren Jets?",
    "a": [
      "Singapore Airlines",
      "Emirates Airline",
      "Lufthansa Passage",
      "Air France KLM"
    ],
    "explanation": "Da Kohlefaserverbundwerkstoffe (CFK) nicht rosten, kann die Kabinenhöhe auf angenehme ~1.800 m statt ~2.400 m simuliert und feuchtere Luft genutzt werden.",
    "exp": "Da Kohlefaserverbundwerkstoffe (CFK) nicht rosten, kann die Kabinenhöhe auf angenehme ~1.800 m statt ~2.400 m simuliert und feuchtere Luft genutzt werden."
  },
  {
    "cat": "widebody",
    "diff": "mid",
    "q": "Welche kuriose Besonderheit besaß der Dreistrahler Lockheed L-1011 TriStar in der Bordküche?",
    "a": [
      "Airbus A340 und Boeing 777",
      "Airbus A330 und Boeing 767",
      "Boeing 757 und Tupolew Tu-204",
      "McDonnell Douglas DC-10 und MD-11"
    ],
    "explanation": "Die L-1011 war technisch extrem fortschrittlich – die Flugbegleiter fuhren mit Speisewagen im eigenen Lift zwischen Unterdeck und Kabine hin und her.",
    "exp": "Die L-1011 war technisch extrem fortschrittlich – die Flugbegleiter fuhren mit Speisewagen im eigenen Lift zwischen Unterdeck und Kabine hin und her."
  },
  {
    "cat": "widebody",
    "diff": "pro",
    "q": "Warum entschied sich Airbus beim A340 ursprünglich für vier relativ kleine Triebwerke statt zwei großer?",
    "a": [
      "Rumpf und Tragflächen aus kohlenstofffaserverstärktem Kunststoff (CFK)",
      "Ein komplett aus massivem Titan geschmiedeter Hauptpassagierrumpf",
      "Tragflächen aus einer ultraleichten Lithium-Beryllium-Legierung",
      "Ein Passagierdeck mit Fenstern aus unzerbrechlichem Panzerglas"
    ],
    "explanation": "Vor der Liberalisierung der ETOPS-Regeln durften zweistrahlige Jets maximal 120 Minuten vom nächsten Ausweichflughafen entfernt sein – Vierstrahler waren frei.",
    "exp": "Vor der Liberalisierung der ETOPS-Regeln durften zweistrahlige Jets maximal 120 Minuten vom nächsten Ausweichflughafen entfernt sein – Vierstrahler waren frei."
  },
  {
    "cat": "widebody",
    "diff": "pro",
    "q": "Was war ein berüchtigtes aerodynamisches Merkmal der McDonnell Douglas MD-11 im Vergleich zur DC-10?",
    "a": [
      "Boeing 777X (777-9)",
      "Airbus A350-1000",
      "Boeing 787-10",
      "Airbus A330-900neo"
    ],
    "explanation": "Um Kerosin zu sparen, verkleinerte Douglas das Leitwerk und glich die geringere Stabilität durch ein automatisches LSAS-Computersystem aus.",
    "exp": "Um Kerosin zu sparen, verkleinerte Douglas das Leitwerk und glich die geringere Stabilität durch ein automatisches LSAS-Computersystem aus."
  },
  {
    "cat": "widebody",
    "diff": "easy",
    "q": "Welcher Spitzname bürgerte sich weltweit für die Boeing 747 in der Popkultur ein?",
    "a": [
      "Airbus A350 XWB",
      "Boeing 777-200LR",
      "Airbus A340-500",
      "Boeing 787-9 Dreamliner"
    ],
    "explanation": "Über fünf Jahrzehnte lang war die 747 das unangefochtene Flaggschiff der weltweiten Zivilluftfahrt und prägte das Jet-Zeitalter.",
    "exp": "Über fünf Jahrzehnte lang war die 747 das unangefochtene Flaggschiff der weltweiten Zivilluftfahrt und prägte das Jet-Zeitalter."
  },
  {
    "cat": "widebody",
    "diff": "mid",
    "q": "Welche Innovation besitzen die Flügelenden der neuen Boeing 777X, um auf Standard-Flughäfen parken zu können?",
    "a": [
      "General Electric GE9X",
      "Rolls-Royce Trent 1000",
      "Pratt & Whitney PW4000",
      "Engine Alliance GP7200"
    ],
    "explanation": "Mit 72 Metern Spannweite im Flug benötigt die 777X für normale Gate-Kategorien (Code E) eingeklappte Spitzen (dann 65 Meter Spannweite).",
    "exp": "Mit 72 Metern Spannweite im Flug benötigt die 777X für normale Gate-Kategorien (Code E) eingeklappte Spitzen (dann 65 Meter Spannweite)."
  },
  {
    "cat": "widebody",
    "diff": "pro",
    "q": "Wie viele Räder besitzt das Hauptfahrwerk des Airbus A380 insgesamt, um das enorme Gewicht auf der Piste zu verteilen?",
    "a": [
      "Airbus A340-600",
      "Boeing 747-8I",
      "Airbus A350-1000",
      "Boeing 777-300ER"
    ],
    "explanation": "Zusammen mit den zwei Bugrädern rollt der A380 auf insgesamt 22 Rädern, damit Landebahnen und Rollwege nicht unter dem Gewicht einbrechen.",
    "exp": "Zusammen mit den zwei Bugrädern rollt der A380 auf insgesamt 22 Rädern, damit Landebahnen und Rollwege nicht unter dem Gewicht einbrechen."
  },
  {
    "cat": "widebody",
    "diff": "easy",
    "q": "Welche Airline betreibt mit Abstand die weltweit größte Flotte von Airbus A380-Großraumflugzeugen?",
    "a": [
      "De Havilland DH.106 Comet",
      "Sud Aviation Caravelle",
      "Boeing 707 Stratoliner",
      "Tupolew Tu-104 Camel"
    ],
    "explanation": "Emirates bestellte insgesamt über 120 Exemplare des Mega-Liners und baute sein gesamtes globales Drehkreuz in Dubai um das Flugzeug herum auf.",
    "exp": "Emirates bestellte insgesamt über 120 Exemplare des Mega-Liners und baute sein gesamtes globales Drehkreuz in Dubai um das Flugzeug herum auf."
  },
  {
    "cat": "widebody",
    "diff": "mid",
    "q": "Was war die Besonderheit der Fenster in der Boeing 787 Dreamliner bei ihrer Markteinführung?",
    "a": [
      "Rechteckige Fenster führten zu Metallermüdung durch Druckwechsel",
      "Die Triebwerke erstickten bei Reiseflughöhe an Sauerstoffmangel",
      "Der Treibstoff entzündete sich durch elektrostatische Reibung",
      "Die Holz-Sandwichbauweise hielt feuchter Tropenluft nicht stand"
    ],
    "explanation": "Die Fenster lassen sich stufenlos per elektrischer Spannung abdunkeln und sind rund 65 Prozent größer als bei herkömmlichen Passagierjets.",
    "exp": "Die Fenster lassen sich stufenlos per elektrischer Spannung abdunkeln und sind rund 65 Prozent größer als bei herkömmlichen Passagierjets."
  },
  {
    "cat": "widebody",
    "diff": "pro",
    "q": "Welches ungewöhnliche Trimmsystem nutzt der Airbus A340 und A330 zur Senkung des Treibstoffverbrauchs?",
    "a": [
      "Sitzanordnung im Rumpf: Zwei Mittelgänge statt nur einem Gang",
      "Mindestens drei Turbinen an Tragflächen oder am Flugzeugheck",
      "Zwei durchgehende Passagierdecks über die gesamte Rumpflänge",
      "Die Fähigkeit zu Nonstop-Flügen über mehr als zwölftausend Kilometer"
    ],
    "explanation": "Durch Umpumpen von Treibstoff ins Leitwerk wandert der Schwerpunkt nach hinten – das verringert den Abtrieb am Höhenruder und spart bis zu 1,5 % Kerosin.",
    "exp": "Durch Umpumpen von Treibstoff ins Leitwerk wandert der Schwerpunkt nach hinten – das verringert den Abtrieb am Höhenruder und spart bis zu 1,5 % Kerosin."
  },
  {
    "cat": "widebody",
    "diff": "easy",
    "q": "Welches Flugzeug hält den Rekord für den derzeit längsten regulären Nonstop-Linienflug der Welt (Singapur–New York)?",
    "a": [
      "McDonnell Douglas MD-11 Dreistrahler",
      "Lockheed L-1011 TriStar Großraumjet",
      "Airbus A340-300 Vierstrahlflugzeug",
      "Boeing 747-400 Langstrecken-Jumbo"
    ],
    "explanation": "Singapore Airlines bedient die rund 15.300 km lange Strecke in knapp 19 Stunden Flugzeit mit einer speziell konfigurierten A350-Ultra-Long-Range.",
    "exp": "Singapore Airlines bedient die rund 15.300 km lange Strecke in knapp 19 Stunden Flugzeit mit einer speziell konfigurierten A350-Ultra-Long-Range."
  },
  {
    "cat": "widebody",
    "diff": "mid",
    "q": "Warum besitzen viele Boeing 747-Frachter eine zusätzliche Seitentür hinter dem Flügel?",
    "a": [
      "1970er Jahre (1970)",
      "1960er Jahre (1964)",
      "1980er Jahre (1982)",
      "1950er Jahre (1958)"
    ],
    "explanation": "Während Standardfracht durch die Nase passt, können extrem hohe Frachtstücke nur durch das riesige seitliche Hauptdecktor verladen werden.",
    "exp": "Während Standardfracht durch die Nase passt, können extrem hohe Frachtstücke nur durch das riesige seitliche Hauptdecktor verladen werden."
  },
  {
    "cat": "widebody",
    "diff": "pro",
    "q": "Welches Triebwerkslayout machte die russische Iljuschin Il-62 in den 1960er Jahren so unverwechselbar?",
    "a": [
      "Airbus A320",
      "Boeing 737-300",
      "McDonnell Douglas MD-80",
      "Boeing 757-200"
    ],
    "explanation": "Durch die Hecktriebwerke blieben die Tragflächen aerodynamisch absolut sauber – am Boden benötigte die Il-62 jedoch eine ausfahrbare Stütze gegen Heckkippen.",
    "exp": "Durch die Hecktriebwerke blieben die Tragflächen aerodynamisch absolut sauber – am Boden benötigte die Il-62 jedoch eine ausfahrbare Stütze gegen Heckkippen."
  },
  {
    "cat": "widebody",
    "diff": "easy",
    "q": "Was bedeutet der Begriff „Widebody“ bei einem Verkehrsflugzeug im Unterschied zu einem „Narrowbody“?",
    "a": [
      "Boeing 737",
      "Airbus A320",
      "Bombardier CRJ",
      "Douglas DC-9"
    ],
    "explanation": "Widebodies (wie A330, A350, 777) haben zwei Gänge (Twin-Aisle), während Narrowbodies (wie A320, 737) nur einen einzigen Mittelgang besitzen.",
    "exp": "Widebodies (wie A330, A350, 777) haben zwei Gänge (Twin-Aisle), während Narrowbodies (wie A320, 737) nur einen einzigen Mittelgang besitzen."
  },
  {
    "cat": "widebody",
    "diff": "mid",
    "q": "Wie viele Passagiere durfte der Airbus A380 in einer theoretischen reinen All-Economy-Bestuhlung maximal befördern?",
    "a": [
      "Fly-by-Wire mit Sidestick-Steuerung",
      "Head-Up-Display für beide Piloten",
      "HUD-gestützte Infrarot-Nachtsicht",
      "Analoge Uhren-Instrumentierung"
    ],
    "explanation": "Zugelassen war der A380 für maximal 853 Passagiere – in der Praxis bestuhlten die meisten Airlines ihn mit 450 bis 520 Plätzen in 3 oder 4 Klassen.",
    "exp": "Zugelassen war der A380 für maximal 853 Passagiere – in der Praxis bestuhlten die meisten Airlines ihn mit 450 bis 520 Plätzen in 3 oder 4 Klassen."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "easy",
    "q": "Welches Flugzeugmodell ist das meistverkaufte und meistgebaute zivile Strahlverkehrsflugzeug der Geschichte?",
    "a": [
      "Airbus A320neo",
      "Boeing 737 MAX 8",
      "Airbus A220-300",
      "Embraer E195-E2"
    ],
    "explanation": "Die 737 fliegt seit 1967 und überschritt als erster Jet die Marke von 10.000 gebauten Exemplaren – die A320-Familie holte in den letzten Jahren rasant auf.",
    "exp": "Die 737 fliegt seit 1967 und überschritt als erster Jet die Marke von 10.000 gebauten Exemplaren – die A320-Familie holte in den letzten Jahren rasant auf."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "easy",
    "q": "Warum sind die Triebwerksgondeln der klassischen Boeing 737 unten auffällig abgeflacht?",
    "a": [
      "CFM International LEAP",
      "Pratt & Whitney JT8D",
      "Rolls-Royce RB211",
      "General Electric CF6"
    ],
    "explanation": "Die 737 wurde in den 1960ern für Treppen-freies Einsteigen tief gebaut; als modernere Turbofans kamen, mussten Nebenaggregate seitlich platziert werden.",
    "exp": "Die 737 wurde in den 1960ern für Treppen-freies Einsteigen tief gebaut; als modernere Turbofans kamen, mussten Nebenaggregate seitlich platziert werden."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "easy",
    "q": "Welche bahnbrechende Steuerungstechnologie führte der Airbus A320 im Jahr 1988 erstmals in der Zivilluftfahrt ein?",
    "a": [
      "Bombardier CSeries",
      "Fokker 130 NextGen",
      "Embraer E-Jets E2",
      "BAe Regional Jetliner"
    ],
    "explanation": "Der A320 ersetzte schwere Stahlseile durch Computer, die Pilotenbefehle elektronisch prüfen und gefährliche Flugzustände (Flight Envelope Protection) verhindern.",
    "exp": "Der A320 ersetzte schwere Stahlseile durch Computer, die Pilotenbefehle elektronisch prüfen und gefährliche Flugzustände (Flight Envelope Protection) verhindern."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "mid",
    "q": "Unter welchem ursprünglichen Namen wurde der heutige Airbus A220 entwickelt, bevor Airbus das Programm übernahm?",
    "a": [
      "Lufthansa",
      "Pan American World Airways",
      "United Airlines",
      "British Airways"
    ],
    "explanation": "Bombardier verhob sich finanziell an der hochmodernen Neuentwicklung; Airbus kaufte 2018 die Mehrheit für einen symbolischen Dollar und benannte sie in A220 um.",
    "exp": "Bombardier verhob sich finanziell an der hochmodernen Neuentwicklung; Airbus kaufte 2018 die Mehrheit für einen symbolischen Dollar und benannte sie in A220 um."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "mid",
    "q": "Welches System der Boeing 737 MAX war die primäre Ursache für die beiden tragischen Abstürze 2018 und 2019?",
    "a": [
      "MCAS, das fehlerhaft auf nur einen einzigen Anstellwinkelsensor vertraute",
      "Ein plötzlicher Ausfall der Hydraulikpumpen durch vereiste Kerosinfilter im Steigflug",
      "Die Verwechslung von Höhenmesser-Daten durch fehlerhafte metrische Software-Updates",
      "Ein unkontrollierter Riss in der Cockpitscheibe durch Überdruck bei maximaler Flughöhe"
    ],
    "explanation": "MCAS drückte die Nase des Flugzeugs wiederholt gegen den Willen der Piloten nach unten, weil ein einzelner defekter Sensor fälschlich Strömungsabriss meldete.",
    "exp": "MCAS drückte die Nase des Flugzeugs wiederholt gegen den Willen der Piloten nach unten, weil ein einzelner defekter Sensor fälschlich Strömungsabriss meldete."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "mid",
    "q": "Was macht den neuen Airbus A321XLR für viele Fluggesellschaften zum absoluten „Gamechanger“?",
    "a": [
      "Single-Aisle-Jet mit bis zu 8.700 km Reichweite – z. B. Berlin nach Washington",
      "Benötigt dank Raketen-Startstufen Landebahnen von weniger als vierhundert Metern Länge",
      "Kann während des gesamten Reiseflugs kerosinsparend vollständig im Segelflug gleiten",
      "Bietet regulär Platz für über vierhundert Passagiere auf zwei durchgehenden Hauptdecks"
    ],
    "explanation": "Dank eines integrierten Rumpftanks (Rear Centre Tank) erschließt der A321XLR dünne Langstreckenrouten, die für Großraumjets unrentabel wären.",
    "exp": "Dank eines integrierten Rumpftanks (Rear Centre Tank) erschließt der A321XLR dünne Langstreckenrouten, die für Großraumjets unrentabel wären."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "pro",
    "q": "Warum besitzen Regionalflugzeuge wie die ATR 72 oder Dash 8 Turboprop-Triebwerke statt reiner Turbofans?",
    "a": [
      "Auf extrem kurzen Strecken unter 500 km sind Turboprops massiv treibstoffsparender und tolerieren unbefestigte Pisten",
      "Weil internationale Gesetze Strahltriebwerke auf Flugplätzen mit weniger als drei Gates verbieten",
      "Weil Propeller bei Regenwetter zusätzlichen Sauerstoff in die Passagierkabine pressen",
      "Turboprops benötigen überhaupt kein Kerosin, sondern fliegen mit herkömmlichem Autobenzin"
    ],
    "explanation": "Bei Geschwindigkeiten bis 550 km/h hat der freie Propeller den höchsten Vortriebswirkungsgrad und spart auf Kurzstrecken enorm Betriebskosten.",
    "exp": "Bei Geschwindigkeiten bis 550 km/h hat der freie Propeller den höchsten Vortriebswirkungsgrad und spart auf Kurzstrecken enorm Betriebskosten."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "pro",
    "q": "Welche kuriose Eigenschaft besitzt der brasilianische Regionaljet Embraer E-Jets E2 im Cockpit?",
    "a": [
      "Ein sogenanntes Steuerhorn in „Fahrradlenker“-Form (Mutton-Leg / Ram Horn Yoke)",
      "Den kompletten Verzicht auf Fußpedale für die Steuerung des Seitenruders",
      "Analoge Zeigerinstrumente aus Messing für nostalgische Flugbegeisterung",
      "Einen Schleudersitz für den Flugkapitän bei unüberwindbaren Triebwerksbränden"
    ],
    "explanation": "Embraer hält am unverwechselbaren Mutton-Leg-Steuerhorn fest – die Steuerung selbst erfolgt jedoch über modernstes digitales Fly-by-Wire.",
    "exp": "Embraer hält am unverwechselbaren Mutton-Leg-Steuerhorn fest – die Steuerung selbst erfolgt jedoch über modernstes digitales Fly-by-Wire."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "easy",
    "q": "Was bezeichnet die Abkürzung „neo“ bei Flugzeugen der Airbus A320neo-Familie?",
    "a": [
      "New Engine Option",
      "Next Electronic Operation",
      "National European Overview",
      "Nonstop Extended Output"
    ],
    "explanation": "Mit moderneren Triebwerken (Pratt & Whitney GTF oder CFM LEAP) und Sharklets spart die neo-Generation rund 15 bis 20 Prozent Kerosin.",
    "exp": "Mit moderneren Triebwerken (Pratt & Whitney GTF oder CFM LEAP) und Sharklets spart die neo-Generation rund 15 bis 20 Prozent Kerosin."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "mid",
    "q": "Warum mussten die Triebwerke bei der Boeing 737 MAX weiter nach vorne und oben versetzt werden?",
    "a": [
      "Wegen des deutlich größeren Durchmessers der neuen CFM-LEAP-1B-Triebwerke bei unveränderter Fahrwerkshöhe",
      "Um den Schwerpunkt des Flugzeugs absichtlich für Kunstflugfiguren instabiler zu machen",
      "Damit Passagiere beim Blick aus dem Fenster einen besseren Blick auf die Wolken haben",
      "Weil der Brandschutz vorgeschrieben hatte, dass Turbinen keinen Kontakt zum Flügel haben dürfen"
    ],
    "explanation": "Weil Boeing das Fahrwerk der 737 nicht verlängern wollte, wanderte das Triebwerk nach oben und vorn – was bei hohen Anstellwinkeln Auftrieb erzeugte.",
    "exp": "Weil Boeing das Fahrwerk der 737 nicht verlängern wollte, wanderte das Triebwerk nach oben und vorn – was bei hohen Anstellwinkeln Auftrieb erzeugte."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "easy",
    "q": "Wie viele Sitze befinden sich in einer typischen Economy-Class-Reihe eines Standard-A320 oder einer Boeing 737?",
    "a": [
      "6 Sitze (3 links, Mittelgang, 3 rechts)",
      "4 Sitze (2 links, Mittelgang, 2 rechts)",
      "8 Sitze (4 links, Mittelgang, 4 rechts)",
      "5 Sitze (2 links, Mittelgang, 3 rechts)"
    ],
    "explanation": "Das 3-3-Layout ist seit der Boeing 707 der weltweite Standard für fast alle modernen Single-Aisle-Mittelstreckenjets.",
    "exp": "Das 3-3-Layout ist seit der Boeing 707 der weltweite Standard für fast alle modernen Single-Aisle-Mittelstreckenjets."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "mid",
    "q": "Welche charakteristische Sitzanordnung bietet der Airbus A220 in der Economy Class, die Passagiere besonders schätzen?",
    "a": [
      "2-3-Bestuhlung – das bedeutet nur einen einzigen Mittelsitz pro Sitzreihe",
      "1-2-1-Bestuhlung mit direktem Zugang zum Mittelgang für absolut jeden Passagier",
      "3-3-Bestuhlung mit extra schmalen Sitzen für extrem niedrige Ticketpreise",
      "Rückwärts gerichtete Sitze für erhöhte Sicherheit bei Bremsmanövern auf der Piste"
    ],
    "explanation": "Im A220 gibt es auf einer Seite des Gangs nur 2 Sitze (ideal für Paare) und auf der anderen 3 – die Chance auf den ungeliebten Mittelsitz sinkt von 33 % auf 20 %.",
    "exp": "Im A220 gibt es auf einer Seite des Gangs nur 2 Sitze (ideal für Paare) und auf der anderen 3 – die Chance auf den ungeliebten Mittelsitz sinkt von 33 % auf 20 %."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "pro",
    "q": "Was war der legendäre Spitzname der McDonnell Douglas MD-80 bei Piloten und Luftfahrt-Enthusiasten?",
    "a": [
      "Mad Dog",
      "Iron Bird",
      "Whispering Giant",
      "Flying Pencil"
    ],
    "explanation": "Wegen ihres lauten Fauchens der Hecktriebwerke und ihres anspruchsvollen, direkten Handlings nannten Generationen von Piloten die MD-80 liebevoll „Mad Dog“.",
    "exp": "Wegen ihres lauten Fauchens der Hecktriebwerke und ihres anspruchsvollen, direkten Handlings nannten Generationen von Piloten die MD-80 liebevoll „Mad Dog“."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "pro",
    "q": "Welches Flugzeug wird in Pilotenkreisen wegen seines extrem langen, dünnen Rumpfs oft als „Fliegender Bleistift“ bezeichnet?",
    "a": [
      "Boeing 757-300",
      "Airbus A318",
      "Bombardier CRJ-100",
      "Avro RJ85"
    ],
    "explanation": "Mit über 54 Metern Länge bei nur einem einzigen schmalen Gang wirkt die gestreckte Boeing 757-300 optisch extrem lang und dünn.",
    "exp": "Mit über 54 Metern Länge bei nur einem einzigen schmalen Gang wirkt die gestreckte Boeing 757-300 optisch extrem lang und dünn."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "easy",
    "q": "Welcher europäische Vierstrahler wurde speziell für steile Anflüge auf den Stadtflughafen London City Airport berühmt?",
    "a": [
      "BAe 146 / Avro RJ",
      "Fokker 70 Cityhopper",
      "Dassault Mercure 100",
      "Vickers Viscount Jet"
    ],
    "explanation": "Die vier kleinen, leisen Triebwerke und die gewaltige Heck-Luftbremse erlaubten dem „Jumbolino“ den steilen 5,5-Grad-Anflug mitten ins Londoner Bankenviertel.",
    "exp": "Die vier kleinen, leisen Triebwerke und die gewaltige Heck-Luftbremse erlaubten dem „Jumbolino“ den steilen 5,5-Grad-Anflug mitten ins Londoner Bankenviertel."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "mid",
    "q": "Warum hat die Boeing 737 bis heute keine geschlossenen Fahrwerksklappen für die Haupträder?",
    "a": [
      "Räder schließen bündig ab mit Radkappen – das spart Gewicht und Komplexität",
      "Damit die Reifen während des Flugs durch die eisige Höhenluft schneller abkühlen",
      "Weil der Hersteller in den 1960er Jahren vergessen hatte, Scharniere zu patentieren",
      "Um dem Piloten durch einen Bodenspion die visuelle Prüfung der Reifen zu ermöglichen"
    ],
    "explanation": "Spart Gewicht und wartungsintensive Hydraulik: Die Außenseite des Reifens bildet einfach die Außenhaut, ein Gummiring dichtet die Rumpföffnung ab.",
    "exp": "Spart Gewicht und wartungsintensive Hydraulik: Die Außenseite des Reifens bildet einfach die Außenhaut, ein Gummiring dichtet die Rumpföffnung ab."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "pro",
    "q": "Was unterscheidet die Getriebefan-Technologie (Geared Turbofan, z. B. Pratt & Whitney PW1000G) von herkömmlichen Turbofans?",
    "a": [
      "Ein Untersetzungsgetriebe lässt Bläser langsam und Niederdruckturbine schnell drehen",
      "Der Fanrotor wechselt im Flug je nach Windrichtung automatisch die Drehrichtung",
      "Das Triebwerk besitzt ein 6-Gang-Schaltgetriebe wie ein klassischer Sportwagen",
      "Der Treibstoff wird vor der Einspritzung über Zahnräder mechanisch zerkleinert"
    ],
    "explanation": "Bläser wollen aerodynamisch langsam drehen (weniger Lärm und Spitzenwiderstand), Turbinen schnell – das Getriebe entkoppelt beide Drehzahlen optimal.",
    "exp": "Bläser wollen aerodynamisch langsam drehen (weniger Lärm und Spitzenwiderstand), Turbinen schnell – das Getriebe entkoppelt beide Drehzahlen optimal."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "easy",
    "q": "Was ist die kleinste Variante aus der modernen Airbus-A320-Familie, die wegen geringer Nachfrage kaum gebaut wurde?",
    "a": [
      "Airbus A318",
      "Airbus A316",
      "Airbus A319",
      "Airbus A320"
    ],
    "explanation": "Der A318 bot nur rund 100 Sitze, war aber wegen des schweren Grundrumpfs der A320-Familie im Betrieb zu schwer und unwirtschaftlich für die meisten Airlines.",
    "exp": "Der A318 bot nur rund 100 Sitze, war aber wegen des schweren Grundrumpfs der A320-Familie im Betrieb zu schwer und unwirtschaftlich für die meisten Airlines."
  },
  {
    "cat": "narrowbody_regional",
    "diff": "mid",
    "q": "Welcher brasilianische Flugzeugbauer stieg neben Boeing und Airbus zur weltweiten Nummer 3 der Zivilluftfahrt auf?",
    "a": [
      "Embraer",
      "Bombardier",
      "Saab Aerospace",
      "Sukhoi Civil"
    ],
    "explanation": "Mit Sitz in São José dos Campos beherrscht Embraer mit seinen E-Jets und E2-Jets den weltweiten Markt für Zubringer- und Regionaljets bis 130 Sitze.",
    "exp": "Mit Sitz in São José dos Campos beherrscht Embraer mit seinen E-Jets und E2-Jets den weltweiten Markt für Zubringer- und Regionaljets bis 130 Sitze."
  },
  {
    "cat": "klassiker",
    "diff": "easy",
    "q": "Wie viel dehnte sich die Concorde während des Überschallflugs bei Mach 2 durch Reibungswärme in der Länge aus?",
    "a": [
      "Um rund 15 bis 25 Zentimeter",
      "Um exakt 2 bis 3 Millimeter",
      "Um über 1,5 Meter",
      "Gar nicht, da Titan sich unter Hitze überhaupt nicht verzieht"
    ],
    "explanation": "Die Außenhaut erhitzte sich auf bis zu 127 °C – zwischen Flugingenieurs-Pult und Schott öffnete sich ein Spalt, in den Piloten ihre Mütze stecken konnten.",
    "exp": "Die Außenhaut erhitzte sich auf bis zu 127 °C – zwischen Flugingenieurs-Pult und Schott öffnete sich ein Spalt, in den Piloten ihre Mütze stecken konnten."
  },
  {
    "cat": "klassiker",
    "diff": "easy",
    "q": "Warum durfte die Concorde auf Flügen zwischen London/Paris und New York erst über dem offenen Atlantik Überschall fliegen?",
    "a": [
      "Wegen des extrem lauten Überschallknalls (Sonic Boom) über bewohntem Festland",
      "Weil über Land zu wenig Sauerstoff für die Nachbrenner vorhanden war",
      "Aus Angst, dass Radaranlagen von Flughäfen durch Überschallwellen zerstört würden",
      "Weil die Passagiere bei Überschall über Land die Orientierung verloren hätten"
    ],
    "explanation": "Der Überschallknall zerbrach Fensterscheiben und verängstigte Nutztiere – die US-Luftfahrtbehörde FAA untersagte zivilen Überschall über Land strikt.",
    "exp": "Der Überschallknall zerbrach Fensterscheiben und verängstigte Nutztiere – die US-Luftfahrtbehörde FAA untersagte zivilen Überschall über Land strikt."
  },
  {
    "cat": "klassiker",
    "diff": "mid",
    "q": "Welcher fatale Konstruktionsfehler führte 1954 zum Absturz der ersten Düsenverkehrsflugzeuge De Havilland DH.106 Comet?",
    "a": [
      "Eckige Passagierfenster führten durch Druckwechsel zu Spannungsrissen und Materialermüdung",
      "Die Düsentriebwerke erstickten bei Flughöhen über 8.000 Metern an zu dünner Luft",
      "Der Holzleim in den Tragflächen löste sich durch tropische Luftfeuchtigkeit auf",
      "Die Ruderblockade durch gefrierendes Kondenswasser in den Steuerungsrohren"
    ],
    "explanation": "An den scharfen Ecken der viereckigen Fenster traten gewaltige Spannungsspitzen auf – nach wenigen hundert Druckzyklen riss die Rumpfhaut auf. Seitdem sind Flugzeugfenster rund.",
    "exp": "An den scharfen Ecken der viereckigen Fenster traten gewaltige Spannungsspitzen auf – nach wenigen hundert Druckzyklen riss die Rumpfhaut auf. Seitdem sind Flugzeugfenster rund."
  },
  {
    "cat": "klassiker",
    "diff": "easy",
    "q": "Welches legendäre Propellerflugzeug der 1930er Jahre begründete den wirtschaftlichen Passagierflugverkehr weltweit?",
    "a": [
      "Douglas DC-3",
      "Cessna 172 Skyhawk",
      "Boeing 247 Monomail",
      "Lockheed Vega 5B"
    ],
    "explanation": "Die DC-3 war das erste Flugzeug, mit dem Fluggesellschaften rein durch Passagiertickets ohne staatliche Post-Subventionen Gewinne erwirtschaften konnten.",
    "exp": "Die DC-3 war das erste Flugzeug, mit dem Fluggesellschaften rein durch Passagiertickets ohne staatliche Post-Subventionen Gewinne erwirtschaften konnten."
  },
  {
    "cat": "klassiker",
    "diff": "mid",
    "q": "Wie lautete der sowjetische Spitzname für das Überschall-Passagierflugzeug Tupolew Tu-144 im Westen?",
    "a": [
      "Concordski",
      "Iron Maiden",
      "Red Falcon",
      "Sputnik Jet"
    ],
    "explanation": "Wegen der verblüffenden äußeren Ähnlichkeit mit der anglo-französischen Concorde und Spionage-Gerüchten taufte die westliche Presse sie „Concordski“.",
    "exp": "Wegen der verblüffenden äußeren Ähnlichkeit mit der anglo-französischen Concorde und Spionage-Gerüchten taufte die westliche Presse sie „Concordski“."
  },
  {
    "cat": "klassiker",
    "diff": "pro",
    "q": "Warum flog die Tupolew Tu-144 im Gegensatz zur Concorde fast ihren gesamten Überschallflug mit eingeschalteten Nachbrennern?",
    "a": [
      "Triebwerke erzeugten ohne Nachbrenner nicht genug Schub für Dauer-Überschall",
      "Um die Tragflächen durch den heißen Abgasstrahl vor Vereisung im Polarflug zu schützen",
      "Weil sowjetische Vorschriften einen Sicherheitszuschlag von 50 Prozent Schub verlangten",
      "Damit Passagiere die blaue Flamme durch die Heckfenster als Attraktion sehen konnten"
    ],
    "explanation": "Die Concorde beherrschte „Supercruise“ (Mach 2 ohne Nachbrenner); die Tu-144 musste permanent nachbrennen, was die Kabine ohrenbetäubend laut machte und Treibstoff fraß.",
    "exp": "Die Concorde beherrschte „Supercruise“ (Mach 2 ohne Nachbrenner); die Tu-144 musste permanent nachbrennen, was die Kabine ohrenbetäubend laut machte und Treibstoff fraß."
  },
  {
    "cat": "klassiker",
    "diff": "mid",
    "q": "Welches dreifache Seitenleitwerk verlieh der Lockheed Constellation („Connie“) ihr unverwechselbares Aussehen?",
    "a": [
      "Damit das Flugzeug in bestehende Hangars passte",
      "Drei Seitenruder zur Kompensation von Triebwerksausfällen bei Wasserlandungen",
      "Ein optisches Design-Element, das vom Milliardär Howard Hughes verlangt wurde",
      "Ein Antennenträger für die ersten weltweiten UKW-Rundfunksendungen an Bord"
    ],
    "explanation": "Ein einzelnes Seitenruder für die nötige Richtungsstabilität wäre so hoch geworden, dass die Connie nicht mehr durch die Hangartore gepasst hätte.",
    "exp": "Ein einzelnes Seitenruder für die nötige Richtungsstabilität wäre so hoch geworden, dass die Connie nicht mehr durch die Hangartore gepasst hätte."
  },
  {
    "cat": "klassiker",
    "diff": "easy",
    "q": "Welches dreistrahlige US-Passagierflugzeug flog 1963 erstmals und wurde zum Liebling für Landungen auf kurzen Bahnen?",
    "a": [
      "Boeing 727",
      "Lockheed L-188 Electra",
      "Sud Aviation Caravelle",
      "Vickers VC10"
    ],
    "explanation": "Mit ihren drei Hecktriebwerken, ausgeklügelten Dreifach-Spaltklappen und eigener Hecktreppe flog die 727 auch die kleinsten Provinzflugplätze an.",
    "exp": "Mit ihren drei Hecktriebwerken, ausgeklügelten Dreifach-Spaltklappen und eigener Hecktreppe flog die 727 auch die kleinsten Provinzflugplätze an."
  },
  {
    "cat": "klassiker",
    "diff": "mid",
    "q": "Welche französische Maschine war 1955 das erste zivile Strahlverkehrsflugzeug mit Triebwerken am hinteren Rumpf?",
    "a": [
      "Sud Aviation Caravelle",
      "Dassault Falcon 20 Jetliner",
      "Aérospatiale Corvette Regional",
      "Breguet Deux-Ponts Passagier"
    ],
    "explanation": "Die Caravelle revolutionierte das Flugzeugdesign – sie nutzte sogar die vordere Rumpf- und Cockpitsektion der britischen Comet in Lizenz.",
    "exp": "Die Caravelle revolutionierte das Flugzeugdesign – sie nutzte sogar die vordere Rumpf- und Cockpitsektion der britischen Comet in Lizenz."
  },
  {
    "cat": "klassiker",
    "diff": "pro",
    "q": "Warum besaß die Concorde eine hydraulisch absenkbaren Flugzeugnase („Droop Nose“)?",
    "a": [
      "Wegen des extremen Anstellwinkels hätten Piloten sonst nur den Himmel gesehen",
      "Um den Luftwiderstand beim Durchbrechen der Schallmauer aktiv zu modulieren",
      "Damit Flughafen-Bodenpersonal den Schlepphaken im Sitzen einhängen konnte",
      "Um bei Regenwasser-Landungen die Cockpitscheiben vor Spritzwasser zu schützen"
    ],
    "explanation": "Wegen der Deltaflügel landete die Concorde mit steiler Nase nach oben – erst das Absenken um bis zu 12,5 Grad gab den Piloten den Blick auf die Piste frei.",
    "exp": "Wegen der Deltaflügel landete die Concorde mit steiler Nase nach oben – erst das Absenken um bis zu 12,5 Grad gab den Piloten den Blick auf die Piste frei."
  },
  {
    "cat": "klassiker",
    "diff": "easy",
    "q": "Welches Flugzeug begründete 1958 den weltweiten kommerziellen Durchbruch von Boeing im internationalen Jet-Zeitalter?",
    "a": [
      "Boeing 707",
      "Boeing 377 Stratocruiser",
      "Boeing 720 Cityjet",
      "Boeing Model 40A"
    ],
    "explanation": "Pan Am eröffnete im Oktober 1958 mit der 707 den regulären Transatlantik-Jetdienst und verkürzte die Reisezeit zwischen New York und Paris fast um die Hälfte.",
    "exp": "Pan Am eröffnete im Oktober 1958 mit der 707 den regulären Transatlantik-Jetdienst und verkürzte die Reisezeit zwischen New York und Paris fast um die Hälfte."
  },
  {
    "cat": "klassiker",
    "diff": "mid",
    "q": "Welcher legendäre Spitzname wurde der robusten dreimotorigen Junkers Ju 52 im Volksmund verliehen?",
    "a": [
      "Tante Ju",
      "Eiserne Lady",
      "Silbervogel",
      "Wellblech-Adler"
    ],
    "explanation": "Mit ihrer unverwüstlichen Wellblech-Haut aus Duraluminium flog die „Tante Ju“ über Jahrzehnte Passagiere und Fracht unter extremsten Bedingungen.",
    "exp": "Mit ihrer unverwüstlichen Wellblech-Haut aus Duraluminium flog die „Tante Ju“ über Jahrzehnte Passagiere und Fracht unter extremsten Bedingungen."
  },
  {
    "cat": "klassiker",
    "diff": "pro",
    "q": "Was war das fatale Problem des sowjetischen Tu-144-Absturzes auf der Pariser Luftfahrtschau in Le Bourget 1973?",
    "a": [
      "Ein abruptes Ausweichmanöver vor einer Mirage überlastete die Zelle",
      "Ein Strömungsabriss in beiden Nachbrennern durch versehentlich falsch betankten Kraftstoff",
      "Ein Ausfall aller Höhenruder durch den Bruch einer mechanischen Umlenkrolle im Leitwerk",
      "Die Explosion des vorderen Hilfsmotors durch Überhitzung im Langsamflug vor Zuschauern"
    ],
    "explanation": "Um einer filmenden Mirage auszuweichen, drückte der Pilot die Tu-144 schlagartig nach unten – beim anschließenden Abfangen brachen die Tragflächen unter g-Kräften ab.",
    "exp": "Um einer filmenden Mirage auszuweichen, drückte der Pilot die Tu-144 schlagartig nach unten – beim anschließenden Abfangen brachen die Tragflächen unter g-Kräften ab."
  },
  {
    "cat": "klassiker",
    "diff": "easy",
    "q": "Welches Flugboot von Howard Hughes besaß die größte Spannweite aller Zeiten bis zum Bau des Stratolaunch?",
    "a": [
      "Hughes H-4 Hercules",
      "Boeing 314 Clipper",
      "Dornier Do X Wal",
      "Martin JRM Mars"
    ],
    "explanation": "Die Spruce Goose (aus Birkenholz gebaut) flog nur ein einziges Mal im November 1947 für knapp eine Minute im Bodeneffekt über dem Hafen von Long Beach.",
    "exp": "Die Spruce Goose (aus Birkenholz gebaut) flog nur ein einziges Mal im November 1947 für knapp eine Minute im Bodeneffekt über dem Hafen von Long Beach."
  },
  {
    "cat": "klassiker",
    "diff": "mid",
    "q": "Was zeichnete das deutsche Flugboot Dornier Do X im Jahr 1929 aus?",
    "a": [
      "Es besaß 12 Siemens- bzw. Curtiss-Motoren in sechs Tandem-Gondeln auf dem Tragflügel",
      "Es war das erste Flugzeug mit einer geschlossenen Druckkabine für Stratosphärenflüge",
      "Es konnte auf dem Wasser landen und mit ausfahrbaren Ketten als Panzer an Land fahren",
      "Es beförderte bis zu 500 Passagiere in Schlafkabinen über den Pazifischen Ozean"
    ],
    "explanation": "Die Do X war das damals mit Abstand schwerste Flugzeug der Welt und transportierte 1929 bei einem Rundflug sensationelle 169 Passagiere.",
    "exp": "Die Do X war das damals mit Abstand schwerste Flugzeug der Welt und transportierte 1929 bei einem Rundflug sensationelle 169 Passagiere."
  },
  {
    "cat": "klassiker",
    "diff": "pro",
    "q": "Warum nutzte die britische Vickers VC10 vier Triebwerke am Heck statt unter den Flügeln?",
    "a": [
      "Um auf heißen, hoch gelegenen Plätzen maximale Auftriebshilfen am Flügel zu nutzen",
      "Weil unter den Tragflächen der Einbau von Schwimmern für Notwasserungen geplant war",
      "Damit Passagiere beim Einsteigen nicht unter laufenden Triebwerken hindurchlaufen mussten",
      "Weil der Hersteller keine Patente für Flügelpylonen von US-Konzernen erwerben durfte"
    ],
    "explanation": "Die VC10 war für Pisten in Nairobi oder Johannesburg konstruiert – saubere Tragflächen mit durchgehenden Vorflügeln ermöglichten unübertroffene Kurzstarteigenschaften.",
    "exp": "Die VC10 war für Pisten in Nairobi oder Johannesburg konstruiert – saubere Tragflächen mit durchgehenden Vorflügeln ermöglichten unübertroffene Kurzstarteigenschaften."
  },
  {
    "cat": "klassiker",
    "diff": "easy",
    "q": "Was war der letzte reguläre Passagierflug der Concorde vor ihrer endgültigen Außerdienststellung?",
    "a": [
      "Oktober 2003 (British Airways von New York JFK nach London Heathrow)",
      "Juli 2000 (unmittelbar nach dem tragischen Absturz bei Gonesse)",
      "Dezember 2011 (Sonderflug zum 50. Thronjubiläum von Queen Elizabeth II.)",
      "Mai 1995 (Flugzeugparade über Paris zum 50. Jahrestag des Kriegsendes)"
    ],
    "explanation": "Hohe Wartungskosten, steigende Kerosinpreise und der Buchungseinbruch nach dem 11. September 2003 besiegelten das Ende des zivilen Überschallflugs.",
    "exp": "Hohe Wartungskosten, steigende Kerosinpreise und der Buchungseinbruch nach dem 11. September 2003 besiegelten das Ende des zivilen Überschallflugs."
  },
  {
    "cat": "klassiker",
    "diff": "mid",
    "q": "Welches US-Verkehrsflugzeug der 1950er Jahre war für seine luxuriöse Schlafkabinen-Atmosphäre mit Bar im Unterdeck berühmt?",
    "a": [
      "Boeing 377 Stratocruiser",
      "Douglas DC-4 Skymaster Clipper",
      "Convair CV-240 Passagierflugzeug",
      "Martin 4-0-4 Skyliner Regional"
    ],
    "explanation": "Basierend auf dem B-29-Bomber bot der doppelstöckige Stratocruiser eine Wendeltreppe in eine gemütliche Lounge im unteren Rumpfdeck.",
    "exp": "Basierend auf dem B-29-Bomber bot der doppelstöckige Stratocruiser eine Wendeltreppe in eine gemütliche Lounge im unteren Rumpfdeck."
  },
  {
    "cat": "klassiker",
    "diff": "pro",
    "q": "Was war die Besonderheit des Pratt & Whitney R-4360 „Wasp Major“-Motors, der u. a. die Boeing 377 antrieb?",
    "a": [
      "Ein 28-Zylinder-Vierfach-Sternmotor („Wasp Major“) mit 56 Zündkerzen",
      "Ein Motor, der während des Flugs von Benzin auf gereinigtes Rohöl umgeschaltet werden konnte",
      "Der erste luftgekühlte Motor mit integrierter Gasturbine zur direkten Stromerzeugung",
      "Ein V16-Motor mit doppelter Kurbelwelle zur Vermeidung von Kreiseldrehmomenten"
    ],
    "explanation": "Der hubraumstärkste Flugkolbenmotor der Geschichte leistete bis zu 4.300 PS, war jedoch mechanisch extrem wartungsintensiv und störanfällig.",
    "exp": "Der hubraumstärkste Flugkolbenmotor der Geschichte leistete bis zu 4.300 PS, war jedoch mechanisch extrem wartungsintensiv und störanfällig."
  },
  {
    "cat": "technik_betrieb",
    "diff": "easy",
    "q": "Was bedeutet die luftfahrtrechtliche Zulassungsregel „ETOPS“ für zweistrahlige Passagierjets im Flugbetrieb?",
    "a": [
      "Wie viele Flugminuten ein Zweistrahler mit einem Triebwerk vom Ausweichort entfernt sein darf",
      "Die maximale Menge an Kerosin, die vor einer außerplanmäßigen Notlandung abgelassen werden muss",
      "Die erlaubte Anzahl an Flugstunden, die eine Besatzung ohne Pause am Stück im Cockpit verbringen darf",
      "Der Mindestabstand, den zwei Jets auf derselben Reiseflughöhe zueinander einhalten müssen"
    ],
    "explanation": "ETOPS (früher scherzhaft: „Engines Turn Or Passengers Swim“) reicht heute bis ETOPS-370 – die A350 darf über 6 Stunden mit einem Motor weiterfliegen.",
    "exp": "ETOPS (früher scherzhaft: „Engines Turn Or Passengers Swim“) reicht heute bis ETOPS-370 – die A350 darf über 6 Stunden mit einem Motor weiterfliegen."
  },
  {
    "cat": "technik_betrieb",
    "diff": "easy",
    "q": "Wofür steht die Abkürzung „APU“ (Auxiliary Power Unit) im Heck moderner Verkehrsflugzeuge?",
    "a": [
      "Hilfstriebwerk für Strom, Hydraulik und Druckluft am Boden",
      "Fallschirm-Notauslöser für das gesamte Flugzeug bei strukturellem Tragflächenversagen",
      "Automatischer Scheibenwischermotor für die vorderen Cockpitscheiben bei Platzregen",
      "Backup-Antenne für den weltweiten Empfang von Flugfunk über militärische Längstwellen"
    ],
    "explanation": "Dank der APU im Heck kann ein Jet am Gate autark klimatisiert und gestartet werden, ohne auf externe Bodenstromaggregate angewiesen zu sein.",
    "exp": "Dank der APU im Heck kann ein Jet am Gate autark klimatisiert und gestartet werden, ohne auf externe Bodenstromaggregate angewiesen zu sein."
  },
  {
    "cat": "technik_betrieb",
    "diff": "easy",
    "q": "Was ist eine „RAT“ (Ram Air Turbine) und wann kommt sie in einem Verkehrsflugzeug zum Einsatz?",
    "a": [
      "Kleiner Propeller, der bei totalem Triebwerksausfall Strom und Hydraulikdruck liefert",
      "Lasersensor am Bug, der Wirbelschleppen vorausfliegender Jets in Echtzeit scannt",
      "Kerosinpumpe, die Treibstoff mit Überschallgeschwindigkeit in die Brennkammer presst",
      "Entlüftungsventil auf der Oberseite der Tragflächen zur Druckentlastung bei Turbulenzen"
    ],
    "explanation": "Die RAT rettete u. a. dem „Gimli Glider“ (767) und dem „Miracle on the Hudson“ (A320) das Leben, indem sie die Cockpit-Instrumente mit Notstrom versorgte.",
    "exp": "Die RAT rettete u. a. dem „Gimli Glider“ (767) und dem „Miracle on the Hudson“ (A320) das Leben, indem sie die Cockpit-Instrumente mit Notstrom versorgte."
  },
  {
    "cat": "technik_betrieb",
    "diff": "mid",
    "q": "Was bewirken „Winglets“ bzw. „Sharklets“ an den äußeren Enden von Flugzeugtragflächen primär?",
    "a": [
      "Sie mindern den induzierten Widerstand durch Blockieren der Randwirbel",
      "Sie dienen als optische Begrenzungsmarkierungen für Flughafen-Bodenfahrzeuge beim Einparken",
      "Sie fangen Blitzschläge im Reiseflug auf und leiten die Hochspannung sicher in die Wolken ab",
      "Sie verhindern das Abrutschen von Enteisungsflüssigkeit vor dem Start am Boden"
    ],
    "explanation": "Luft strömt von der Unterseite mit Überdruck zur Oberseite mit Unterdruck – Winglets verringern diesen Wirbelverlust und sparen bis zu 5 % Kerosin.",
    "exp": "Luft strömt von der Unterseite mit Überdruck zur Oberseite mit Unterdruck – Winglets verringern diesen Wirbelverlust und sparen bis zu 5 % Kerosin."
  },
  {
    "cat": "technik_betrieb",
    "diff": "mid",
    "q": "Was bedeutet ein „Nebenstromverhältnis“ (Bypass Ratio) von 10:1 bei einem modernen Turbofan-Triebwerk?",
    "a": [
      "Zehn Teile Luft umströmen das Kerntriebwerk, ein Teil fließt durch die Brennkammer",
      "Das Triebwerk verbraucht zehn Liter Luft pro verbranntem Liter Kerosin im Reiseflug",
      "Zehn Prozent des erzeugten Schubs werden für den Antrieb der internen Generatoren verwendet",
      "Das Triebwerk beschleunigt zehnmal schneller auf Startschub als ein klassischer Turbojet"
    ],
    "explanation": "Moderne Turbofans erzeugen über 80 bis 90 % ihres Schubs rein über den kühlen Mantelstrom des Bläsers – das macht sie dramatisch leiser und sparsamer.",
    "exp": "Moderne Turbofans erzeugen über 80 bis 90 % ihres Schubs rein über den kühlen Mantelstrom des Bläsers – das macht sie dramatisch leiser und sparsamer."
  },
  {
    "cat": "technik_betrieb",
    "diff": "mid",
    "q": "Was passiert bei einer Notlandung mit „Autoland“ nach Instrumentenlandesystem-Kategorie IIIb (CAT IIIb)?",
    "a": [
      "Autopilot steuert Anflug, fängt Flugzeug ab und hält es beim Ausrollen auf der Mittellinie",
      "Fluglotsen übernehmen per Fernsteuerung vom Tower aus die vollständige Kontrolle über die Ruder",
      "Das Flugzeug landet auf einem automatischen Fangseil wie auf einem Flugzeugträger",
      "Alle Triebwerke schalten bei 100 Fuß Höhe automatisch ab, um ein Überrollen der Piste zu verhindern"
    ],
    "explanation": "CAT IIIb erlaubt Landungen bei praktisch null Metern Sicht (z. B. 75 m Pistensicht) – der Autopilot führt Flare und Rollout völlig autonom aus.",
    "exp": "CAT IIIb erlaubt Landungen bei praktisch null Metern Sicht (z. B. 75 m Pistensicht) – der Autopilot führt Flare und Rollout völlig autonom aus."
  },
  {
    "cat": "technik_betrieb",
    "diff": "pro",
    "q": "Was beschreibt der gefürchtete aerodynamische Begriff „Coffin Corner“ (Sargecke) in extremen Flughöhen?",
    "a": [
      "Der Bereich, in dem Mindestgeschwindigkeit (Stall) und Höchstgeschwindigkeit (Mach Tuck) fast deckungsgleich zusammenfallen",
      "Der tote Winkel hinter dem Cockpit, in dem Kollisionswarngeräte vorausfliegenden Verkehr nicht orten können",
      "Eine Lufttasche im Heckteil der Kabine, in der bei Druckabfall sofort Sauerstoffmangel eintritt",
      "Die gefährlichste Parkposition auf einem Vorfeld bei gleichzeitigem Betrieb von Enteisungsfahrzeugen"
    ],
    "explanation": "Fliegt man in großer Höhe nur wenige Knoten zu langsam, reißt die Strömung ab; fliegt man wenige Knoten schneller, bilden sich Stoßwellen mit Auftriebsverlust.",
    "exp": "Fliegt man in großer Höhe nur wenige Knoten zu langsam, reißt die Strömung ab; fliegt man wenige Knoten schneller, bilden sich Stoßwellen mit Auftriebsverlust."
  },
  {
    "cat": "technik_betrieb",
    "diff": "pro",
    "q": "Warum ertönt im Cockpit bei einer TCAS-Warnung (Traffic Alert and Collision Avoidance System) der Befehl: „Follow the RA!“?",
    "a": [
      "Piloten müssen der Resolution Advisory des TCAS zwingend vorrangig vor Anweisungen der Fluglotsen folgen",
      "Der Autopilot fordert die Piloten auf, die Radar-Höhenmesser-Sicherung im Sicherungskasten zu ziehen",
      "Das Flugzeug schaltet automatisch den Notfall-Transpondercode 7700 auf allen Funkkanälen frei",
      "Die Triebwerke werden vom System automatisch in den maximalen Leerlaufschub gedrosselt"
    ],
    "explanation": "TCAS stimmt Ausweichmanöver zwischen Flugzeugen sekundenschnell ab – die Flugkatastrophe von Überlingen 2002 passierte, weil Piloten dem Lotsen statt TCAS folgten.",
    "exp": "TCAS stimmt Ausweichmanöver zwischen Flugzeugen sekundenschnell ab – die Flugkatastrophe von Überlingen 2002 passierte, weil Piloten dem Lotsen statt TCAS folgten."
  },
  {
    "cat": "technik_betrieb",
    "diff": "easy",
    "q": "Warum wird bei Start und Landung in der Nacht die Kabinenbeleuchtung im Flugzeug abgedunkelt?",
    "a": [
      "Damit sich die Augen für Notevakuierungen an Dunkelheit gewöhnen",
      "Um den Stromverbrauch der Generatoren für den Betrieb der Landescheinwerfer zu drosseln",
      "Damit Personen am Boden den Flugzeugtyp anhand der Fensterreihe besser identifizieren können",
      "Weil grelles Licht bei den Piloten im Cockpit über die Cockpittür Reflexionen erzeugt"
    ],
    "explanation": "Die Anpassung des menschlichen Auges an Dunkelheit dauert bis zu 20 Minuten – im Ernstfall müssen Passagiere Notausgänge draußen sofort sehen können.",
    "exp": "Damit sich die Augen der Passagiere an die Dunkelheit gewöhnen, falls eine Notevakuierung nötig wird"
  },
  {
    "cat": "technik_betrieb",
    "diff": "easy",
    "q": "Was passiert mit den Kerosinmengen beim sogenannten „Fuel Dumping“ (Treibstoffschnellablass)?",
    "a": [
      "Kerosin wird durch Düsen an den Flügelspitzen abgelassen, um das maximale Landegewicht vor der Landung zu unterschreiten",
      "Treibstoff wird im Frachtraum in feuerfeste Zusatztanks umgepumpt, um die Balance zu halten",
      "Das Kerosin wird in den heißen Abgasstrahl gesprüht und verbrennt spektakulär in der Luft",
      "Der Treibstoff wird über Fallschirme in standardisierten Fässern auf unbewohntem Gebiet abgeworfen"
    ],
    "explanation": "Ein vollgetanktes Langstreckenflugzeug wiegt beim Start oft 50–100 Tonnen mehr als das Fahrwerk bei einer sicheren Landung aushalten könnte.",
    "exp": "Kerosin wird durch Düsen an den Flügelspitzen abgelassen, um das maximale Landegewicht vor der Landung zu unterschreiten"
  },
  {
    "cat": "technik_betrieb",
    "diff": "mid",
    "q": "Woraus wird der Atem-Sauerstoff für die Notfall-Masken über den Passagiersitzen chemisch erzeugt?",
    "a": [
      "Aus festen chemischen Natriumchlorat-Kerzen (Sauerstoff-Generatoren), die durch eine Zündschnur brennen",
      "Aus zentralen Hochdruck-Sauerstoffflaschen im Frachtraum über Kupferleitungen",
      "Durch direkte Verdichtung und Filterung der Außenluft aus den Triebwerkszapfluft-Leitungen",
      "Aus kleinen flüssigen Sauerstoff-Patronen unter jedem einzelnen Passagiersitz"
    ],
    "explanation": "Das Ziehen an der Maske löst mechanisch einen Schlagbolzen aus – die chemische Reaktion liefert für 12 bis 15 Minuten Sauerstoff, bis das Flugzeug auf 3.000 m gesunken ist.",
    "exp": "Aus festen chemischen Natriumchlorat-Kerzen (Sauerstoff-Generatoren), die durch eine Zündschnur brennen"
  },
  {
    "cat": "technik_betrieb",
    "diff": "mid",
    "q": "Was bedeutet die Start-Entscheidungsgeschwindigkeit „V1“ beim Startlauf auf der Startbahn?",
    "a": [
      "Start muss fortgesetzt werden – Abbruch auf der restlichen Piste ist nicht mehr sicher möglich",
      "Geschwindigkeit, bei der der Pilot die Steuersäule zieht und das Flugzeug abhebt",
      "Mindestgeschwindigkeit, ab der die Klimaanlage von Kabinenluft auf Außenluft umschaltet",
      "Geschwindigkeit, bei der die Flugbegleiter alle Service-Wagen verriegelt haben müssen"
    ],
    "explanation": "Fällt bei V1 ein Triebwerk aus, startet der Pilot trotzdem mit dem verbleibenden Motor und fliegt eine Platzrunde zur sicheren Landung.",
    "exp": "Nach Erreichen von V1 muss der Start fortgesetzt werden – ein Abbruch auf der verbleibenden Piste ist nicht mehr sicher möglich"
  },
  {
    "cat": "technik_betrieb",
    "diff": "pro",
    "q": "Warum haben moderne Turbofans wie das Trent XWB sichelförmig geschwungene Fan-Schaufeln aus Titan oder Kohlefaser?",
    "a": [
      "Überschall-Stoßwellen an Blattspitzen abmildern und Vibrationen minimieren",
      "Damit Vögel bei Triebwerksschlag automatisch nach außen geschleudert werden",
      "Weil gebogene Schaufeln bei der Herstellung im 3D-Drucker weniger Material verbrauchen",
      "Um das Triebwerk optisch an die aerodynamische Rumpfform des Flugzeugs anzupassen"
    ],
    "explanation": "Die Blattspitzen moderner Bläser durchbrechen im Reiseflug die Schallmauer – die geschwungene 3D-Aerodynamik verhindert drastische Wirkungsgradverluste.",
    "exp": "Um Überschall-Stoßwellen an den schnell rotierenden Blattspitzen abzumildern und Vibrationen zu minimieren"
  },
  {
    "cat": "technik_betrieb",
    "diff": "easy",
    "q": "Was zeigt das PAPI-Lichtsystem (Precision Approach Path Indicator) neben der Landebahn dem Piloten an?",
    "a": [
      "Ob das Flugzeug auf dem perfekten 3-Grad-Gleitpfad anfliegt",
      "Ob die Piste für die Landung frei ist oder sich noch Bodenfahrzeuge darauf befinden",
      "Die aktuelle Windrichtung und Windgeschwindigkeit in Knoten über farbige Blinkimpulse",
      "Den exakten Füllstand der Kerosintanks des landenden Flugzeugs über Laserabtastung"
    ],
    "explanation": "Vier weiße Lichter bedeuten „zu hoch“, vier rote Lichter bedeuten „zu tief („red on red, you are dead“) – zwei weiße und zwei rote zeigen den Idealpfad.",
    "exp": "Ob sich das Flugzeug im perfekten 3-Grad-Gleitpfad befindet (idealerweise zwei rote und zwei weiße Lichter)"
  },
  {
    "cat": "technik_betrieb",
    "diff": "mid",
    "q": "Wie funktioniert die Schubumkehr (Thrust Reverser) bei modernen Jet-Verkehrsflugzeugen?",
    "a": [
      "Klappen lenken den Nebenstrom der Triebwerke mechanisch nach schräg vorne um",
      "Das Triebwerk stoppt schlagartig und rotiert in die entgegengesetzte Drehrichtung",
      "Kleine Bremsfallschirme werden aus den Triebwerksauslässen auf die Piste geschossen",
      "Die Treibstoffeinspritzung wird gedrosselt und die Zündung zündet in umgekehrter Zündfolge"
    ],
    "explanation": "Turbinen können nicht rückwärts laufen – Kaskadenklappen im Mantelstrom leiten die gewaltige Luftmasse einfach nach vorne ab, um das Flugzeug abzubremsen.",
    "exp": "Klappen lenken den Nebenstrom der Triebwerke mechanisch nach schräg vorne um"
  },
  {
    "cat": "technik_betrieb",
    "diff": "pro",
    "q": "Was ist das Hauptziel von „RVSM“ (Reduced Vertical Separation Minimum) im weltweiten Luftraum?",
    "a": [
      "Die Halbierung des vertikalen Höhenabstands von 2.000 auf 1.000 Fuß für doppelte Luftraumkapazität",
      "Die automatische Reduktion des Startgewichts bei heißem Sommerwetter",
      "Die Pflicht zum Einbau von mindestens drei unabhängigen Autopiloten in Frachtmaschinen",
      "Das Verbot von Steigflügen mit mehr als 3.000 Fuß pro Minute in Flughafennähe"
    ],
    "explanation": "Dank hochpräziser digitaler Höhenmesser können Verkehrsflugzeuge seit den späten 1990ern sicher mit nur 300 Metern (1.000 Fuß) Höhenabstand übereinander fliegen.",
    "exp": "Die Halbierung des vertikalen Höhenabstands von 2.000 auf 1.000 Fuß für doppelte Luftraumkapazität"
  },
  {
    "cat": "technik_betrieb",
    "diff": "easy",
    "q": "Was zeichnet den Flugschreiber („Black Box“) in einem Passagierflugzeug optisch aus?",
    "a": [
      "Er ist leuchtend orange lackiert mit Reflektorstreifen",
      "Er ist tiefschwarz matt lackiert, um Lichtreflexionen im Cockpit zu verhindern",
      "Er besteht aus verchromtem Edelstahl mit eingravierter Flugzeugseriennummer",
      "Er ist in der Signalfarbe Neongrün gehalten mit rot blinkenden Warn-LEDs"
    ],
    "explanation": "Trotz des Namens „Black Box“ ist das Gehäuse leuchtend orange, damit Bergungskräfte ihn im Wrack oder am Meeresgrund schnell entdecken können.",
    "exp": "Er ist auffällig leuchtend orange lackiert und mit reflektierenden Streifen versehen"
  },
  {
    "cat": "technik_betrieb",
    "diff": "mid",
    "q": "Warum besitzen Passagierflugzeuge winzige Löcher in der mittleren Scheibe der Kabinenfenster?",
    "a": [
      "Druckausgleich und Vermeidung von Scheibenbeschlag",
      "Um im Notfall Sauerstoff aus der Kabine in den Rumpf entweichen zu lassen",
      "Damit Passagiere mit Spezialmikrofonen Flugzeuggeräusche aufnehmen können",
      "Als Sollbruchstelle für die Feuerwehr bei Rettungsarbeiten von außen"
    ],
    "explanation": "Das „Breather Hole“ sorgt dafür, dass die tragende äußere Scheibe den vollen Kabinendruck hält, während die innere Schirmscheibe vor Berührung schützt.",
    "exp": "Zum Druckausgleich zwischen den Scheiben und zur Verhinderung von Beschlag und Eisbildung"
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("airliners", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["airliners"] = DATA;
  }
})();
