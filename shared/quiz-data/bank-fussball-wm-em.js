// Unified quiz bank for "fussball_wm_em" (75 questions)
(function () {
  const DATA = [
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "In welcher Schweizer Stadt gewann die deutsche Nationalmannschaft 1954 überraschend das 'Wunder von Bern'?",
    "a": [
      "Bern",
      "Basel",
      "Zürich",
      "Genf"
    ],
    "explanation": "Im Berner Wankdorfstadion besiegte die DFB-Elf die als unschlagbar geltenden Ungarn mit 3:2.",
    "exp": "Im Berner Wankdorfstadion besiegte die DFB-Elf die als unschlagbar geltenden Ungarn mit 3:2."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Welcher deutsche Stürmer erzielte 1954 im WM-Finale gegen Ungarn das legendäre Siegtor zum 3:2?",
    "a": [
      "Helmut Rahn",
      "Fritz Walter",
      "Max Morlock",
      "Hans Schäfer"
    ],
    "explanation": "Herbert Zimmermanns Radiokommentar 'Aus dem Hintergrund müsste Rahn schießen – Rahn schießt – Tor!' ist unsterblich.",
    "exp": "Herbert Zimmermanns Radiokommentar 'Aus dem Hintergrund müsste Rahn schießen – Rahn schießt – Tor!' ist unsterblich."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Welcher deutsche Bundestrainer führte das Team 1954 zum ersten Weltmeistertitel der Geschichte?",
    "a": [
      "Sepp Herberger",
      "Helmut Schön",
      "Otto Nerz",
      "Franz Beckenbauer"
    ],
    "explanation": "Herberger prägte Klassiker wie 'Der Ball ist rund' und 'Das nächste Spiel ist immer das schwerste'.",
    "exp": "Herberger prägte Klassiker wie 'Der Ball ist rund' und 'Das nächste Spiel ist immer das schwerste'."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Wer schoss im WM-Finale 1974 im Münchner Olympiastadion das 2:1-Siegtor gegen die Niederlande?",
    "a": [
      "Gerd Müller",
      "Paul Breitner",
      "Franz Beckenbauer",
      "Uli Hoeneß"
    ],
    "explanation": "Mit einer blitzschnellen Drehung im Strafraum erzielte der 'Bomber der Nation' kurz vor der Pause das 2:1.",
    "exp": "Mit einer blitzschnellen Drehung im Strafraum erzielte der 'Bomber der Nation' kurz vor der Pause das 2:1."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Wer verwandelte 1990 im WM-Finale in Rom in der 85. Minute den entscheidenden Elfmeter gegen Argentinien?",
    "a": [
      "Andreas Brehme",
      "Lothar Matthäus",
      "Jürgen Klinsmann",
      "Rudi Völler"
    ],
    "explanation": "Weil Kapitän Matthäus wegen eines Schuhwechsels unsicher war, schoss Brehme souverän mit rechts ins Eck.",
    "exp": "Weil Kapitän Matthäus wegen eines Schuhwechsels unsicher war, schoss Brehme souverän mit rechts ins Eck."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Wer erzielte 2014 im Maracanã-Stadion in der 113. Minute das Siegtor zum vierten deutschen WM-Titel?",
    "a": [
      "Mario Götze",
      "Thomas Müller",
      "André Schürrle",
      "Miroslav Klose"
    ],
    "explanation": "Nach einer maßgenauen Flanke von Schürrle vollendete Götze mit Brustannahme und Linksschuss.",
    "exp": "Nach einer maßgenauen Flanke von Schürrle vollendete Götze mit Brustannahme und Linksschuss."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Mit 16 Treffern hält welcher deutsche Stürmer den ewigen Rekord für die meisten Tore bei Fußball-Weltmeisterschaften?",
    "a": [
      "Miroslav Klose",
      "Gerd Müller",
      "Ronaldo Nazário",
      "Jürgen Klinsmann"
    ],
    "explanation": "Klose überholte beim legendären 7:1 gegen Brasilien im WM-Halbfinale 2014 den Brasilianer Ronaldo.",
    "exp": "Klose überholte beim legendären 7:1 gegen Brasilien im WM-Halbfinale 2014 den Brasilianer Ronaldo."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Welche Nation gewann 1930 die allererste Fußball-Weltmeisterschaft im eigenen Land?",
    "a": [
      "Uruguay",
      "Argentinien",
      "Brasilien",
      "Italien"
    ],
    "explanation": "Uruguay bezwang im Finale in Montevideo den Nachbarn Argentinien mit 4:2 und wurde Premierensieger.",
    "exp": "Uruguay bezwang im Finale in Montevideo den Nachbarn Argentinien mit 4:2 und wurde Premierensieger."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Mit welchem sensationellen Ergebnis deklassierte Deutschland Gastgeber Brasilien im WM-Halbfinale 2014?",
    "a": [
      "7:1 für Deutschland",
      "5:0 für Deutschland",
      "6:1 für Deutschland",
      "4:0 für Deutschland"
    ],
    "explanation": "Schon nach 29 Minuten führte das Team von Joachim Löw im Mineirão von Belo Horizonte mit 5:0.",
    "exp": "Schon nach 29 Minuten führte das Team von Joachim Löw im Mineirão von Belo Horizonte mit 5:0."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Wer erzielte 1996 im EM-Finale in Wembley das erste 'Golden Goal' der internationalen Fußballgeschichte?",
    "a": [
      "Oliver Bierhoff",
      "Jürgen Klinsmann",
      "Stefan Kuntz",
      "Mehmet Scholl"
    ],
    "explanation": "Bierhoff kam als Joker von der Bank, glich zunächst aus und traf in der Verlängerung zum Titel.",
    "exp": "Bierhoff kam als Joker von der Bank, glich zunächst aus und traf in der Verlängerung zum Titel."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Welcher deutsche Stürmer wurde 1980 mit einem Final-Doppelpack gegen Belgien zum 'Kopfballungeheuer' der EM?",
    "a": [
      "Horst Hrubesch",
      "Klaus Allofs",
      "Karl-Heinz Rummenigge",
      "Hansi Müller"
    ],
    "explanation": "Hrubesch traf zweimal in Rom – das Siegtor in der 88. Minute per wuchtigem Kopfball nach Ecke von Rummenigge.",
    "exp": "Hrubesch traf zweimal in Rom – das Siegtor in der 88. Minute per wuchtigem Kopfball nach Ecke von Rummenigge."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Welche Nation holte bei der Europameisterschaft 1992 völlig überraschend direkt aus dem Sommerurlaub den Titel?",
    "a": [
      "Dänemark",
      "Schweden",
      "Griechenland",
      "Niederlande"
    ],
    "explanation": "Dänemark rückte kurzfristig für das gesperrte Jugoslawien nach und schlug im Finale Deutschland mit 2:0.",
    "exp": "Dänemark rückte kurzfristig für das gesperrte Jugoslawien nach und schlug im Finale Deutschland mit 2:0."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Welcher deutsche Trainer schaffte 2004 mit Außenseiter Griechenland die größte EM-Sensation aller Zeiten?",
    "a": [
      "Otto Rehhagel",
      "Berti Vogts",
      "Christoph Daum",
      "Winfried Schäfer"
    ],
    "explanation": "'König Otto' ließ kompromisslose Defensive spielen und bezwang Gastgeber Portugal im Finale mit 1:0.",
    "exp": "'König Otto' ließ kompromisslose Defensive spielen und bezwang Gastgeber Portugal im Finale mit 1:0."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Welcher französische Stürmer hält mit 13 Toren bei der WM 1958 den ewigen Rekord für eine einzige Endrunde?",
    "a": [
      "Just Fontaine",
      "Raymond Kopa",
      "Michel Platini",
      "Jean-Pierre Papin"
    ],
    "explanation": "Fontaine erzielte seine 13 Turniertore in nur sechs Partien mit geliehenen Fußballschuhen.",
    "exp": "Fontaine erzielte seine 13 Turniertore in nur sechs Partien mit geliehenen Fußballschuhen."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Welcher brasilianische Star gewann als einziger Fußballer der Geschichte drei Weltmeistertitel (1958, 1962, 1970)?",
    "a": [
      "Pelé",
      "Garrincha",
      "Jairzinho",
      "Mário Zagallo"
    ],
    "explanation": "Edson Arantes do Nascimento, genannt Pelé, debütierte 1958 in Schweden mit erst 17 Jahren.",
    "exp": "Edson Arantes do Nascimento, genannt Pelé, debütierte 1958 in Schweden mit erst 17 Jahren."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Wie nannte Diego Maradona sein irreguläres Tor mit der Hand im WM-Viertelfinale 1986 gegen England?",
    "a": [
      "Die Hand Gottes",
      "Das Himmels-Tor",
      "Der Engelsstreich",
      "Der Faustschlag"
    ],
    "explanation": "Maradona behauptete schelmisch, der Ball sei teils mit seinem Kopf und teils mit der Hand Gottes erzielt worden.",
    "exp": "Maradona behauptete schelmisch, der Ball sei teils mit seinem Kopf und teils mit der Hand Gottes erzielt worden."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Welcher deutsche Torhüter nutzte im WM-Viertelfinale 2006 gegen Argentinien einen handgeschriebenen Spickzettel?",
    "a": [
      "Jens Lehmann",
      "Oliver Kahn",
      "Timo Hildebrand",
      "Andreas Köpke"
    ],
    "explanation": "Torwarttrainer Köpke hatte Lehmanns Notizen auf Hotelpapier notiert – Lehmann parierte zwei Elfmeter.",
    "exp": "Torwarttrainer Köpke hatte Lehmanns Notizen auf Hotelpapier notiert – Lehmann parierte zwei Elfmeter."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Wer erzielte im Eröffnungsspiel des 'Sommermärchens' 2006 in München das spektakuläre 1:0 gegen Costa Rica?",
    "a": [
      "Philipp Lahm",
      "Torsten Frings",
      "Miroslav Klose",
      "Bastian Schweinsteiger"
    ],
    "explanation": "Lahm zog von links nach innen und zirkelte den Ball traumhaft in den rechten oberen Winkel.",
    "exp": "Lahm zog von links nach innen und zirkelte den Ball traumhaft in den rechten oberen Winkel."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Welches afrikanische Land trug im Sommer 2010 die allererste Fußball-Weltmeisterschaft auf dem Kontinent aus?",
    "a": [
      "Südafrika",
      "Nigeria",
      "Ägypten",
      "Marokko"
    ],
    "explanation": "Das Turnier wurde von den durchdringenden Klängen der Plastik-Tröte Vuvuzela akustisch geprägt.",
    "exp": "Das Turnier wurde von den durchdringenden Klängen der Plastik-Tröte Vuvuzela akustisch geprägt."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Welche europäische Nation gewann 2010 in Südafrika durch ein 1:0 n.V. gegen die Niederlande ihren ersten WM-Titel?",
    "a": [
      "Spanien",
      "Portugal",
      "England",
      "Frankreich"
    ],
    "explanation": "Andrés Iniesta traf in der 116. Minute zum Titel für die amtierenden Europameister.",
    "exp": "Andrés Iniesta traf in der 116. Minute zum Titel für die amtierenden Europameister."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Wer spazierte nach dem WM-Triumph 1990 in Rom minutenlang versonnen und ganz alleine über den Rasen?",
    "a": [
      "Franz Beckenbauer",
      "Lothar Matthäus",
      "Rudi Völler",
      "Berti Vogts"
    ],
    "explanation": "Die TV-Bilder des einsamen 'Teamchefs' Beckenbauer im Scheinwerferlicht brannten sich ins Gedächtnis ein.",
    "exp": "Die TV-Bilder des einsamen 'Teamchefs' Beckenbauer im Scheinwerferlicht brannten sich ins Gedächtnis ein."
  },
  {
    "cat": "wm_em",
    "diff": "easy",
    "q": "Welcher französische Kapitän sah im WM-Finale 2006 in Berlin nach einem Kopfstoß gegen Materazzi die Rote Karte?",
    "a": [
      "Zinédine Zidane",
      "Thierry Henry",
      "Patrick Vieira",
      "Fabien Barthez"
    ],
    "explanation": "In der 110. Minute verlor Zidane nach einer Provokation die Beherrschung und beendete so seine Karriere.",
    "exp": "In der 110. Minute verlor Zidane nach einer Provokation die Beherrschung und beendete so seine Karriere."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welcher Erfinder rüstete die deutsche Elf 1954 in Bern mit den revolutionären Schraubstollen aus?",
    "a": [
      "Adi Dassler",
      "Rudolf Dassler",
      "Sepp Herberger",
      "Fritz Walter"
    ],
    "explanation": "Auf dem tiefen Schlammboden boten die flexibel wechselbaren Stollen den entscheidenden Halt.",
    "exp": "Auf dem tiefen Schlammboden boten die flexibel wechselbaren Stollen den entscheidenden Halt."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Wie viele Sekunden dauerte es im WM-Finale 1974, bis Schiedsrichter Taylor Elfmeter für die Niederlande pfiff?",
    "a": [
      "55 Sekunden",
      "25 Sekunden",
      "95 Sekunden",
      "120 Sekunden"
    ],
    "explanation": "Johan Cruyff drang in den Strafraum ein und wurde gefoult, ohne dass ein deutscher Spieler den Ball berührt hatte.",
    "exp": "Johan Cruyff drang in den Strafraum ein und wurde gefoult, ohne dass ein deutscher Spieler den Ball berührt hatte."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "In welchem dramatischen WM-Halbfinale 1970 spielte Franz Beckenbauer mit ausgekugelter Schulter und Armschlinge?",
    "a": [
      "Jahrhundertspiel in Mexiko",
      "Nacht von Sevilla",
      "Wasserschlacht Frankfurt",
      "Schlacht von Santiago"
    ],
    "explanation": "Beim 3:4 nach Verlängerung gegen Italien biss Beckenbauer auf die Zähne, weil das Wechselkontingent erschöpft war.",
    "exp": "Beim 3:4 nach Verlängerung gegen Italien biss Beckenbauer auf die Zähne, weil das Wechselkontingent erschöpft war."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welcher deutsche Italien-Legionär rettete die DFB-Elf im Jahrhundertspiel 1970 in der 90. Minute in die Verlängerung?",
    "a": [
      "Karl-Heinz Schnellinger",
      "Gerd Müller",
      "Uwe Seeler",
      "Wolfgang Overath"
    ],
    "explanation": "Ernst Huberty rief live ins Mikrofon: 'Ausgerechnet Schnellinger!' – es war sein einziges Länderspieltor.",
    "exp": "Ernst Huberty rief live ins Mikrofon: 'Ausgerechnet Schnellinger!' – es war sein einziges Länderspieltor."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Aus welchem Land stammte Linienrichter Tofiq Bəhramov, der 1966 das umstrittene Wembley-Tor für England anerkannte?",
    "a": [
      "Sowjetunion (Aserbaidschan)",
      "Ungarn",
      "Jugoslawien",
      "Tschechoslowakei"
    ],
    "explanation": "Hauptschiedsrichter Gottfried Dienst aus der Schweiz konsultierte Bəhramov, der energisch auf Tor entschied.",
    "exp": "Hauptschiedsrichter Gottfried Dienst aus der Schweiz konsultierte Bəhramov, der energisch auf Tor entschied."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welches war das allererste Elfmeterschießen der WM-Geschichte, das 1982 in Spanien ausgetragen wurde?",
    "a": [
      "Deutschland gegen Frankreich",
      "Italien gegen Brasilien",
      "Argentinien gegen England",
      "Polen gegen Sowjetunion"
    ],
    "explanation": "In der dramatischen 'Nacht von Sevilla' siegte Deutschland nach einem 3:3 mit 5:4 im Elfmeterschießen.",
    "exp": "In der dramatischen 'Nacht von Sevilla' siegte Deutschland nach einem 3:3 mit 5:4 im Elfmeterschießen."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Wer überlupfte Sepp Maier im EM-Finale 1976 im Elfmeterschießen mit einem genial-frechen Heber in die Tormitte?",
    "a": [
      "Antonín Panenka",
      "Zdeněk Nehoda",
      "Ivo Viktor",
      "Karol Dobiaš"
    ],
    "explanation": "Dieser Heber ging weltweit als 'Panenka-Elfmeter' in die Fußballsprache ein und brachte der ČSSR den Titel.",
    "exp": "Dieser Heber ging weltweit als 'Panenka-Elfmeter' in die Fußballsprache ein und brachte der ČSSR den Titel."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welcher deutsche Torhüter hielt 1974 in der Frankfurter 'Wasserschlacht' gegen Polen spektakulär den Finaleinzug fest?",
    "a": [
      "Sepp Maier",
      "Wolfgang Kleff",
      "Norbert Nigbur",
      "Horst Wolter"
    ],
    "explanation": "Auf unbespielbarem, vollgelaufenem Rasen parierte Maier glänzend, ehe Gerd Müller das 1:0 erzielte.",
    "exp": "Auf unbespielbarem, vollgelaufenem Rasen parierte Maier glänzend, ehe Gerd Müller das 1:0 erzielte."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welcher Stürmer tanzte bei der WM 1990 mit 38 Jahren nach jedem seiner vier Jokertore an der Eckfahne?",
    "a": [
      "Roger Milla",
      "François Omam-Biyik",
      "Cyrille Makanaky",
      "Thomas N'Kono"
    ],
    "explanation": "Milla führte Kamerun als erstes afrikanisches Team ins WM-Viertelfinale und traf 1994 sogar mit 42 Jahren.",
    "exp": "Milla führte Kamerun als erstes afrikanisches Team ins WM-Viertelfinale und traf 1994 sogar mit 42 Jahren."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welcher italienische Torwart wurde 1982 in Spanien mit 40 Jahren zum ältesten Weltmeister der Fußballgeschichte?",
    "a": [
      "Dino Zoff",
      "Gianluigi Buffon",
      "Walter Zenga",
      "Enrico Albertosi"
    ],
    "explanation": "Zoff führte die 'Squadra Azzurra' als unumstrittener Kapitän zum 3:1-Finalsieg gegen Deutschland.",
    "exp": "Zoff führte die 'Squadra Azzurra' als unumstrittener Kapitän zum 3:1-Finalsieg gegen Deutschland."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welches historische Trauma erlebte Brasilien bei der Heim-WM 1950 im Maracanã durch die 1:2-Niederlage gegen Uruguay?",
    "a": [
      "Maracanaço",
      "Mineirazo",
      "Cordobazo",
      "Aztecazo"
    ],
    "explanation": "Vor fast 200.000 Zuschauern reichte Brasilien ein Remis, doch Alcides Ghiggia schoss Uruguay zum Titel.",
    "exp": "Vor fast 200.000 Zuschauern reichte Brasilien ein Remis, doch Alcides Ghiggia schoss Uruguay zum Titel."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welcher Stürmerstar erzielte bei der EM 1984 in Frankreich den Fabelrekord von 9 Toren in nur 5 Spielen?",
    "a": [
      "Michel Platini",
      "Alain Giresse",
      "Jean Tigana",
      "Bernard Lacombe"
    ],
    "explanation": "Platini erzielte unter anderem zwei lupenreine Hattricks und führte Frankreich zum ersten Titel.",
    "exp": "Platini erzielte unter anderem zwei lupenreine Hattricks und führte Frankreich zum ersten Titel."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Mit welchem legendären Volleyschuss aus spitzestem Winkel besiegelte Marco van Basten das EM-Finale 1988?",
    "a": [
      "Volley aus spitzem Winkel",
      "Heber über die Mauer",
      "Distanzschuss aus 30m",
      "Kopfball an den Innenpfosten"
    ],
    "explanation": "Van Bastens Traumtor im Münchner Olympiastadion gegen die Sowjetunion gilt als eines der schönsten Tore überhaupt.",
    "exp": "Van Bastens Traumtor im Münchner Olympiastadion gegen die Sowjetunion gilt als eines der schönsten Tore überhaupt."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welcher Kolumbianer lenkte 1994 ein tragisches Eigentor ins eigene Netz und wurde kurz nach der Heimkehr ermordet?",
    "a": [
      "Andrés Escobar",
      "Carlos Valderrama",
      "Faustino Asprilla",
      "René Higuita"
    ],
    "explanation": "Das Eigentor gegen die USA besiegelte Kolumbiens WM-Aus; Escobar wurde Tage später in Medellín erschossen.",
    "exp": "Das Eigentor gegen die USA besiegelte Kolumbiens WM-Aus; Escobar wurde Tage später in Medellín erschossen."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welcher Trainer gewann als einziger Mensch die Weltmeisterschaft sowohl als Spieler (1974) als auch als Teamchef (1990)?",
    "a": [
      "Franz Beckenbauer",
      "Mário Zagallo",
      "Didier Deschamps",
      "Helmut Schön"
    ],
    "explanation": "Beckenbauer, Zagallo und Deschamps sind das einzige Trio der Geschichte mit diesem doppelten WM-Triumph.",
    "exp": "Beckenbauer, Zagallo und Deschamps sind das einzige Trio der Geschichte mit diesem doppelten WM-Triumph."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Wer erzielte bei der WM 2002 im Finale gegen Deutschland beide Treffer für Brasilien zum 2:0-Sieg?",
    "a": [
      "Ronaldo Nazário",
      "Rivaldo",
      "Ronaldinho",
      "Kafú"
    ],
    "explanation": "Ronaldo nutzte einen Abpraller von Oliver Kahn und schob später nach einer Finte von Rivaldo trocken ein.",
    "exp": "Ronaldo nutzte einen Abpraller von Oliver Kahn und schob später nach einer Finte von Rivaldo trocken ein."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Wer köpfte im EM-Finale 2004 in Lissabon das 1:0-Siegtor für Otto Rehhagels Griechen gegen Portugal?",
    "a": [
      "Angelos Charisteas",
      "Theodoros Zagorakis",
      "Traianos Dellas",
      "Giorgos Karagounis"
    ],
    "explanation": "Der Werder-Bremen-Profi Charisteas nutzte eine Ecke von Angelos Basinas zum sensationellen Titelgewinn.",
    "exp": "Der Werder-Bremen-Profi Charisteas nutzte eine Ecke von Angelos Basinas zum sensationellen Titelgewinn."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welcher deutsche Spieler verlor im WM-Finale 1966 bei einem strittigen Zweikampf das Gleichgewicht vor dem 2:2?",
    "a": [
      "Wolfgang Weber",
      "Willi Schulz",
      "Horst-Dieter Höttges",
      "Karl-Heinz Schnellinger"
    ],
    "explanation": "Weber rettete Deutschland in der 89. Minute in die Verlängerung, ehe das legendäre Wembley-Tor fiel.",
    "exp": "Weber rettete Deutschland in der 89. Minute in die Verlängerung, ehe das legendäre Wembley-Tor fiel."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Wie viele Spieler schickte Schiedsrichter Walentin Iwanow im WM-Achtelfinale 2006 ('Schlacht von Nürnberg') mit Gelb-Rot vom Platz?",
    "a": [
      "4 Platzverweise",
      "2 Platzverweise",
      "6 Platzverweise",
      "3 Platzverweise"
    ],
    "explanation": "Beim 1:0 der Portugiesen gegen die Niederlande verteilte Iwanow 16 Gelbe und 4 Gelb-Rote Karten.",
    "exp": "Beim 1:0 der Portugiesen gegen die Niederlande verteilte Iwanow 16 Gelbe und 4 Gelb-Rote Karten."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Wer führte die deutsche Nationalmannschaft 1972 als Kapitän zum souveränen 3:0-Finalsieg gegen die UdSSR bei der EM?",
    "a": [
      "Franz Beckenbauer",
      "Gerd Müller",
      "Günter Netzer",
      "Sepp Maier"
    ],
    "explanation": "Die 'Wembley-Elf' von 1972 gilt unter Fußballexperten als die spielerisch stärkste DFB-Auswahl aller Zeiten.",
    "exp": "Die 'Wembley-Elf' von 1972 gilt unter Fußballexperten als die spielerisch stärkste DFB-Auswahl aller Zeiten."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welcher Schiedsrichter pfiff das WM-Finale 2014 im Maracanã zwischen Deutschland und Argentinien?",
    "a": [
      "Nicola Rizzoli",
      "Howard Webb",
      "Pierluigi Collina",
      "Markus Merk"
    ],
    "explanation": "Der Italiener Rizzoli leitete die umkämpfte Partie über 120 Minuten souverän.",
    "exp": "Der Italiener Rizzoli leitete die umkämpfte Partie über 120 Minuten souverän."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welcher niederländische Mittelfeldspieler trat Xabi Alonso im WM-Finale 2010 mit den Stollen brutal gegen die Brust?",
    "a": [
      "Nigel de Jong",
      "Mark van Bommel",
      "Wesley Sneijder",
      "John Heitinga"
    ],
    "explanation": "De Jongs Kung-Fu-Tritt wurde von Schiedsrichter Webb erstaunlicherweise nur mit der Gelben Karte geahndet.",
    "exp": "De Jongs Kung-Fu-Tritt wurde von Schiedsrichter Webb erstaunlicherweise nur mit der Gelben Karte geahndet."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welcher deutsche Spieler wurde bei der WM 2002 als einziger Torhüter der Geschichte zum besten Spieler des Turniers gewählt?",
    "a": [
      "Oliver Kahn",
      "Jens Lehmann",
      "Bodo Illgner",
      "Andreas Köpke"
    ],
    "explanation": "Kahn kassierte bis zum Finale nur ein einziges Gegentor und erhielt den Goldenen Ball der FIFA.",
    "exp": "Kahn kassierte bis zum Finale nur ein einziges Gegentor und erhielt den Goldenen Ball der FIFA."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welche Überraschungsmannschaft erreichte bei der WM 2002 als Co-Gastgeber sensationell das Halbfinale gegen Deutschland?",
    "a": [
      "Südkorea",
      "Japan",
      "Senegal",
      "USA"
    ],
    "explanation": "Unter Trainer Guus Hiddink schaltete Südkorea Italien und Spanien aus, ehe Michael Ballack traf.",
    "exp": "Unter Trainer Guus Hiddink schaltete Südkorea Italien und Spanien aus, ehe Michael Ballack traf."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Wer erzielte im EM-Finale 2008 in Wien das Siegtor zum 1:0 für Spanien gegen die deutsche Nationalelf?",
    "a": [
      "Fernando Torres",
      "David Villa",
      "Xavi Hernández",
      "Cesc Fàbregas"
    ],
    "explanation": "Torres setzte sich gegen Philipp Lahm durch und spitzelte den Ball über Torhüter Jens Lehmann ins Tor.",
    "exp": "Torres setzte sich gegen Philipp Lahm durch und spitzelte den Ball über Torhüter Jens Lehmann ins Tor."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welcher Verband trat bei der WM 1974 in Deutschland mit Spielern wie Grzegorz Lato und Kazimierz Deyna auf Platz 3?",
    "a": [
      "Polen",
      "Schweden",
      "Jugoslawien",
      "DDR"
    ],
    "explanation": "Grzegorz Lato wurde mit 7 Treffern Torschützenkönig der Weltmeisterschaft 1974.",
    "exp": "Grzegorz Lato wurde mit 7 Treffern Torschützenkönig der Weltmeisterschaft 1974."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Welcher DDR-Stürmer erzielte 1974 in Hamburg das historische 1:0 im einzigen deutsch-deutschen WM-Duell?",
    "a": [
      "Jürgen Sparwasser",
      "Joachim Streich",
      "Hans-Jürgen Kreische",
      "Peter Ducke"
    ],
    "explanation": "Sparwassers Siegtor in der 77. Minute bescherte der DDR den Gruppensieg vor der bundesdeutschen Elf.",
    "exp": "Sparwassers Siegtor in der 77. Minute bescherte der DDR den Gruppensieg vor der bundesdeutschen Elf."
  },
  {
    "cat": "wm_em",
    "diff": "mid",
    "q": "Wer schoss im dramatischen WM-Viertelfinale 1986 nach seinem Handspiel-Tor das 60-Meter-'Tor des Jahrhunderts'?",
    "a": [
      "Diego Maradona",
      "Jorge Valdano",
      "Jorge Burruchaga",
      "Claudio Caniggia"
    ],
    "explanation": "Maradona ließ in einem atemberaubenden Sololauf fünf englische Feldspieler und Torhüter Shilton stehen.",
    "exp": "Maradona ließ in einem atemberaubenden Sololauf fünf englische Feldspieler und Torhüter Shilton stehen."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher Spieler erzielte 1994 für Russland gegen Kamerun sensationelle fünf Tore in einem einzigen WM-Spiel?",
    "a": [
      "Oleg Salenko",
      "Dmitri Radtschenko",
      "Waleri Karpin",
      "Alexander Mostowoi"
    ],
    "explanation": "Salenkos Fünferpack beim 6:1-Sieg in Stanford ist bis heute ein ungebrochener WM-Rekord.",
    "exp": "Salenkos Fünferpack beim 6:1-Sieg in Stanford ist bis heute ein ungebrochener WM-Rekord."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher Schiedsrichter zeigte dem Kroaten Josip Šimunić bei der WM 2006 versehentlich drei Gelbe Karten in einem Spiel?",
    "a": [
      "Graham Poll",
      "Valentin Ivanov",
      "Horacio Elizondo",
      "Carlos Simon"
    ],
    "explanation": "Der Engländer Poll vergaß nach der zweiten Verwarnung den Platzverweis und notierte Gelb falsch.",
    "exp": "Der Engländer Poll vergaß nach der zweiten Verwarnung den Platzverweis und notierte Gelb falsch."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Wer erzielte bei der WM 2002 im Spiel um Platz 3 gegen Südkorea nach nur 10,8 Sekunden das schnellste WM-Tor?",
    "a": [
      "Hakan Şükür",
      "İlhan Mansız",
      "Hasan Şaş",
      "Emre Belözoğlu"
    ],
    "explanation": "Şükür nutzte einen Abwehrfehler der Koreaner direkt nach dem Anstoß und traf nach knapp elf Sekunden.",
    "exp": "Şükür nutzte einen Abwehrfehler der Koreaner direkt nach dem Anstoß und traf nach knapp elf Sekunden."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher französische Spieler erlitt 1982 in Sevilla nach dem Zusammenprall mit Toni Schumacher einen Wirbelanbruch?",
    "a": [
      "Patrick Battiston",
      "Manuel Amoros",
      "Didier Six",
      "Maxime Bossis"
    ],
    "explanation": "Battiston verlor zwei Zähne und das Bewusstsein; Schumacher kam ohne jede Verwarnung davon.",
    "exp": "Battiston verlor zwei Zähne und das Bewusstsein; Schumacher kam ohne jede Verwarnung davon."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher mexikanische Torwart trat bei der WM 1994 in den USA in selbstentworfenen, grellbunten Neontrikots an?",
    "a": [
      "Jorge Campos",
      "Pablo Larios",
      "Oswaldo Sánchez",
      "Guillermo Ochoa"
    ],
    "explanation": "Campos war nur 1,73 Meter groß, spielte im Verein auch als Stürmer und schneiderte seine bunten Outfits selbst.",
    "exp": "Campos war nur 1,73 Meter groß, spielte im Verein auch als Stürmer und schneiderte seine bunten Outfits selbst."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher Spieler schoss 1938 im WM-Spiel Polen gegen Brasilien vier Tore bei einer 5:6-Niederlage?",
    "a": [
      "Ernst Willimowski",
      "Leonidas da Silva",
      "Gerard Wodarz",
      "Friedrich Scherfke"
    ],
    "explanation": "Der Oberschlesier Willimowski traf viermal, auf brasilianischer Seite glänzte Leônidas barfuß im Matsch.",
    "exp": "Der Oberschlesier Willimowski traf viermal, auf brasilianischer Seite glänzte Leônidas barfuß im Matsch."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher Schiedsrichter leitete das berühmt-berüchtigte Spiel 'Schlacht von Santiago' bei der WM 1962 in Chile?",
    "a": [
      "Ken Aston",
      "Arthur Ellis",
      "Leo Horn",
      "Nikolaj Latyschew"
    ],
    "explanation": "Die Brutalität dieses Spiels brachte Aston später auf die Idee, Gelbe und Rote Karten einzuführen.",
    "exp": "Die Brutalität dieses Spiels brachte Aston später auf die Idee, Gelbe und Rote Karten einzuführen."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher deutsche Nationalspieler trug 1996 im EM-Halbfinale gegen England das Kapitänsband, weil Klinsmann verletzt fehlte?",
    "a": [
      "Andreas Möller",
      "Thomas Häßler",
      "Dieter Eilts",
      "Stefan Reuter"
    ],
    "explanation": "Möller verwandelte den entscheidenden Elfmeter gegen Seaman und posierte jubelnd wie Paul Gascoigne.",
    "exp": "Möller verwandelte den entscheidenden Elfmeter gegen Seaman und posierte jubelnd wie Paul Gascoigne."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher brasilianische Verteidiger flog im WM-Halbfinale 1962 vom Platz, durfte aber im Finale trotzdem spielen?",
    "a": [
      "Garrincha",
      "Djalma Santos",
      "Mauro Ramos",
      "Zito"
    ],
    "explanation": "Die FIFA begnadigte den genialen Flügelstürmer Garrincha nach diplomatischer Intervention rechtzeitig zum Finale.",
    "exp": "Die FIFA begnadigte den genialen Flügelstürmer Garrincha nach diplomatischer Intervention rechtzeitig zum Finale."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher Spieler erzielte 1982 für Nordirland den 1:0-Siegtreffer gegen WM-Gastgeber Spanien?",
    "a": [
      "Gerry Armstrong",
      "Norman Whiteside",
      "Pat Jennings",
      "Billy Hamilton"
    ],
    "explanation": "Armstrongs Tor in Valencia schockte ganz Spanien und brachte Nordirland den Gruppensieg.",
    "exp": "Armstrongs Tor in Valencia schockte ganz Spanien und brachte Nordirland den Gruppensieg."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Wer wurde 1982 bei der WM in Spanien mit 17 Jahren und 41 Tagen zum jüngsten WM-Spieler aller Zeiten?",
    "a": [
      "Norman Whiteside",
      "Pelé",
      "Samuel Eto'o",
      "Femi Opabunmi"
    ],
    "explanation": "Der Nordire Whiteside unterbot Pelés Altersrekord aus dem Jahr 1958 um wenige Monate.",
    "exp": "Der Nordire Whiteside unterbot Pelés Altersrekord aus dem Jahr 1958 um wenige Monate."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher ungarische Star erzielte im WM-Finale 1954 trotz einer Knöchelverletzung das frühe 1:0 gegen Deutschland?",
    "a": [
      "Ferenc Puskás",
      "Zoltán Czibor",
      "Nándor Hidegkuti",
      "Sándor Kocsis"
    ],
    "explanation": "Puskás traf bereits nach sechs Minuten und erzielte kurz vor Schluss noch ein knappes Abseitstor.",
    "exp": "Puskás traf bereits nach sechs Minuten und erzielte kurz vor Schluss noch ein knappes Abseitstor."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher Schiedsrichter gab 1978 bei der WM in Argentinien ein Tor nicht, weil er während des Fluges des Eckballs abpfiff?",
    "a": [
      "Clive Thomas",
      "Abraham Klein",
      "Nicolae Rainea",
      "Sergio Gonella"
    ],
    "explanation": "Der Waliser Thomas pfiff Brasilien gegen Schweden exakt ab, als Zicos Kopfball ins Tor segelte.",
    "exp": "Der Waliser Thomas pfiff Brasilien gegen Schweden exakt ab, als Zicos Kopfball ins Tor segelte."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher kuwaitische Scheich stürmte bei der WM 1982 aufs Feld und erwirkte die Rücknahme eines Tores von Frankreich?",
    "a": [
      "Fahad Al-Ahmed Al-Jaber Al-Sabah",
      "Dschabir al-Ahmad al-Dschabir",
      "Saad al-Abdullah al-Salim",
      "Sabah al-Ahmad al-Dschabir"
    ],
    "explanation": "Weil ein Pfiff aus dem Publikum die Spieler irritierte, drohte der Scheich mit Spielabbruch – Schiedsrichter Stupar gab nach.",
    "exp": "Weil ein Pfiff aus dem Publikum die Spieler irritierte, drohte der Scheich mit Spielabbruch – Schiedsrichter Stupar gab nach."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Wer verschoss im WM-Finale 1994 im Rose Bowl in Pasadena den entscheidenden Elfmeter für Italien gegen Brasilien?",
    "a": [
      "Roberto Baggio",
      "Franco Baresi",
      "Daniele Massaro",
      "Roberto Donadoni"
    ],
    "explanation": "Das 'Göttliche Zöpfchen' schoss den Ball weit über die Latte und besiegelte Brasiliens vierten Titel.",
    "exp": "Das 'Göttliche Zöpfchen' schoss den Ball weit über die Latte und besiegelte Brasiliens vierten Titel."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher Spieler flog 1986 nach nur 56 Sekunden vom Platz und hält damit den Rekord für die schnellste Rote Karte bei einer WM?",
    "a": [
      "José Batista",
      "Claudio Caniggia",
      "Rigobert Song",
      "Wayne Rooney"
    ],
    "explanation": "Der Uruguayer Batista senste den Schotten Gordon Strachan rücksichtslos um und flog sofort.",
    "exp": "Der Uruguayer Batista senste den Schotten Gordon Strachan rücksichtslos um und flog sofort."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Wer erzielte bei der WM 2010 im Achtelfinale das berühmte 'Nicht-Tor' für England gegen Deutschland, als der Ball hinter der Linie war?",
    "a": [
      "Frank Lampard",
      "Steven Gerrard",
      "Wayne Rooney",
      "Jermain Defoe"
    ],
    "explanation": "Der Ball sprang von der Latte klar hinter Manuel Neuers Torlinie, doch Schiedsrichter Larrionda ließ weiterspielen.",
    "exp": "Der Ball sprang von der Latte klar hinter Manuel Neuers Torlinie, doch Schiedsrichter Larrionda ließ weiterspielen."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher afrikanische Staat erreichte 1990 als erstes Team des Kontinents das Viertelfinale einer Weltmeisterschaft?",
    "a": [
      "Kamerun",
      "Senegal",
      "Ghana",
      "Marokko"
    ],
    "explanation": "Die 'Unzähmbaren Löwen' schlugen im Eröffnungsspiel Titelverteidiger Argentinien und scheiterten erst an England.",
    "exp": "Die 'Unzähmbaren Löwen' schlugen im Eröffnungsspiel Titelverteidiger Argentinien und scheiterten erst an England."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher Spieler verwandelte 2016 im EM-Viertelfinale Deutschland gegen Italien nach 18 Elfmetern den entscheidenden Schuss?",
    "a": [
      "Jonas Hector",
      "Joshua Kimmich",
      "Jérôme Boateng",
      "Mats Hummels"
    ],
    "explanation": "Kölns Linksverteidiger Hector schob den Ball an Gianluigi Buffon vorbei flach ins rechte Eck.",
    "exp": "Kölns Linksverteidiger Hector schob den Ball an Gianluigi Buffon vorbei flach ins rechte Eck."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher Spieler parierte im Viertelfinale der WM 2010 auf der Linie absichtlich mit beiden Händen und flog mit Rot vom Platz?",
    "a": [
      "Luis Suárez",
      "Diego Forlán",
      "Diego Lugano",
      "Egidio Arévalo Ríos"
    ],
    "explanation": "Ghanas Asamoah Gyan traf im Anschluss nur die Latte, und Uruguay siegte im Elfmeterschießen.",
    "exp": "Ghanas Asamoah Gyan traf im Anschluss nur die Latte, und Uruguay siegte im Elfmeterschießen."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Wer erzielte im EM-Finale 2016 in Paris in der Verlängerung das 1:0-Siegtor für Außenseiter Portugal gegen Frankreich?",
    "a": [
      "Éder",
      "Nani",
      "Renato Sanches",
      "Ricardo Quaresma"
    ],
    "explanation": "Nach Cristianos Ronaldos früher Verletzung traf der eingewechselte Stürmer Éder per Distanzschuss.",
    "exp": "Nach Cristianos Ronaldos früher Verletzung traf der eingewechselte Stürmer Éder per Distanzschuss."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher legendäre Torwart bestritt bei fünf verschiedenen Weltmeisterschaften insgesamt 25 Endrundenspiele?",
    "a": [
      "Lothar Matthäus",
      "Antonio Carbajal",
      "Gianluigi Buffon",
      "Rafael Márquez"
    ],
    "explanation": "Matthäus stand bei 25 WM-Spielen auf dem Feld; erst 2022 wurde er von Lionel Messi mit 26 Einsätzen überholt.",
    "exp": "Matthäus stand bei 25 WM-Spielen auf dem Feld; erst 2022 wurde er von Lionel Messi mit 26 Einsätzen überholt."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Wer schoss 1970 im Spiel um Platz 3 gegen Uruguay in der 26. Minute das einzige Tor für Deutschland?",
    "a": [
      "Wolfgang Overath",
      "Uwe Seeler",
      "Reinhard Libuda",
      "Hannes Löhr"
    ],
    "explanation": "Overath sicherte Deutschland nach Vorarbeit von Libuda die Bronzemedaille bei der Hitze-WM in Mexiko.",
    "exp": "Overath sicherte Deutschland nach Vorarbeit von Libuda die Bronzemedaille bei der Hitze-WM in Mexiko."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welcher Schiedsrichter pfiff das legendäre WM-Endspiel 1954 zwischen Deutschland und Ungarn in Bern?",
    "a": [
      "William Ling",
      "Benjamin Griffiths",
      "Vincenzo Orlandini",
      "Sandy Griffiths"
    ],
    "explanation": "Der Brite William Ling leitete das Finale, unterstützt von Linienrichter Griffiths aus Wales.",
    "exp": "Der Brite William Ling leitete das Finale, unterstützt von Linienrichter Griffiths aus Wales."
  },
  {
    "cat": "wm_em",
    "diff": "hard",
    "q": "Welches Land gewann 1968 die Europameisterschaft im eigenen Land, nachdem das Halbfinale per Münzwurf entschieden worden war?",
    "a": [
      "Italien",
      "Jugoslawien",
      "England",
      "Sowjetunion"
    ],
    "explanation": "Nach einem 0:0 gegen die UdSSR brachte ein Münzwurf Italien ins Finale, wo das Wiederholungsspiel 2:0 endete.",
    "exp": "Nach einem 0:0 gegen die UdSSR brachte ein Münzwurf Italien ins Finale, wo das Wiederholungsspiel 2:0 endete."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("fussball_wm_em", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["fussball_wm_em"] = DATA;
  }
})();
