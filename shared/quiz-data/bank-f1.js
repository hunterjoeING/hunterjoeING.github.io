// Unified quiz bank for "f1" (75 questions: Formel 1 Geschichte, Fahrer, Teams & Rekorde)
(function () {
  const DATA = [
  {
    "cat": "f1_legenden",
    "diff": "easy",
    "q": "Wie viele Weltmeistertitel gewann Michael Schumacher im Laufe seiner Formel-1-Karriere?",
    "a": [
      "Genau sieben Weltmeistertitel (1994, 1995 sowie von 2000 bis 2004)",
      "Genau sechs Weltmeistertitel (1994, 1995 sowie von 2001 bis 2004)",
      "Genau acht Weltmeistertitel (1994, 1995 sowie von 1999 bis 2004)",
      "Genau fünf Weltmeistertitel (1995 sowie ununterbrochen von 2000 bis 2003)"
    ],
    "explanation": "Michael Schumacher feierte 1994 und 1995 zwei Titel mit Benetton und dominierte danach von 2000 bis 2004 fünf Jahre in Serie für Ferrari.",
    "exp": "Michael Schumacher feierte 1994 und 1995 zwei Titel mit Benetton und dominierte danach von 2000 bis 2004 fünf Jahre in Serie für Ferrari."
  },
  {
    "cat": "f1_legenden",
    "diff": "easy",
    "q": "Mit wie vielen verschiedenen Teams gewann Juan Manuel Fangio in den 1950er-Jahren seine 5 WM-Titel?",
    "a": [
      "Mit vier verschiedenen Teams (Alfa Romeo, Maserati, Mercedes und Ferrari)",
      "Mit drei verschiedenen Teams (Alfa Romeo, Maserati sowie Scuderia Ferrari)",
      "Mit fünf verschiedenen Teams (Alfa Romeo, Maserati, Mercedes, Lancia, Ferrari)",
      "Mit zwei verschiedenen Teams (überwiegend für Maserati und Mercedes-Benz)"
    ],
    "explanation": "Fangios Rekord von fünf Titeln mit vier unterschiedlichen Rennställen (1951, 1954, 1955, 1956, 1957) ist bis heute unübertroffen.",
    "exp": "Fangios Rekord von fünf Titeln mit vier unterschiedlichen Rennställen (1951, 1954, 1955, 1956, 1957) ist bis heute unübertroffen."
  },
  {
    "cat": "f1_legenden",
    "diff": "easy",
    "q": "Wie viele Tage nach seinem lebensgefährlichen Feuerunfall 1976 saß Niki Lauda wieder im Ferrari-Cockpit?",
    "a": [
      "Bereits nach 42 Tagen beim Großen Preis von Italien in Monza",
      "Erst nach 180 Tagen beim Auftaktrennen der Folgesaison in Kyalami",
      "Nach genau 90 Tagen beim Saisonfinale auf dem Fuji Speedway in Japan",
      "Nach knapp 65 Tagen bei Testfahrten auf der Heimstrecke in Spielberg"
    ],
    "explanation": "Laudas blitzartiges Comeback in Monza mit noch blutenden Brandwunden gilt als eine der größten Willensleistungen der gesamten Sportgeschichte.",
    "exp": "Laudas blitzartiges Comeback in Monza mit noch blutenden Brandwunden gilt als eine der größten Willensleistungen der gesamten Sportgeschichte."
  },
  {
    "cat": "f1_legenden",
    "diff": "easy",
    "q": "Welcher Fahrer wurde 2010 mit 23 Jahren und 134 Tagen der jüngste Weltmeister der Formel-1-Geschichte?",
    "a": [
      "Sebastian Vettel beim packenden Saisonfinale in Abu Dhabi",
      "Lewis Hamilton nach dem dramatischen Regenfinale in Sao Paulo",
      "Fernando Alonso bei seinem vorzeitigen Titelgewinn in Brasilien",
      "Max Verstappen nach seinem ersten Titelerfolg auf dem Yas Marina Circuit"
    ],
    "explanation": "Vettel führte 2010 vor dem letzten Saisonrennen kein einziges Mal die WM-Tabelle an und fing Fernando Alonso erst im Finale von Abu Dhabi ab.",
    "exp": "Vettel führte 2010 vor dem letzten Saisonrennen kein einziges Mal die WM-Tabelle an und fing Fernando Alonso erst im Finale von Abu Dhabi ab."
  },
  {
    "cat": "f1_legenden",
    "diff": "easy",
    "q": "Für welches Formel-1-Team fuhr der Schotte Jim Clark während seiner gesamten Karriere von 1960 bis 1968?",
    "a": [
      "Ausschließlich für das Team Lotus unter Teamchef Colin Chapman",
      "Hauptsächlich für die Scuderia Ferrari unter Enzo Ferrari",
      "Durchgehend für das Cooper Car Company Werksteam von John Cooper",
      "Überwiegend für das Brabham Racing Team von Jack Brabham"
    ],
    "explanation": "Clark galt als technisches Naturtalent und gewann für Lotus zwei Weltmeisterschaften (1963 und 1965), bevor er 1968 in Hockenheim tödlich verunglückte.",
    "exp": "Clark galt als technisches Naturtalent und gewann für Lotus zwei Weltmeisterschaften (1963 und 1965), bevor er 1968 in Hockenheim tödlich verunglückte."
  },
  {
    "cat": "f1_legenden",
    "diff": "mid",
    "q": "Was geschah bei der weltberühmten Kollision zwischen Ayrton Senna und Alain Prost in Suzuka 1989?",
    "a": [
      "Prost lenkte vor der Schikane ein, Senna kürzte ab und wurde nach dem Sieg disqualifiziert",
      "Senna drehte Prost beim Start in Kurve eins um und beide schieden sofort aus",
      "Prost drängte Senna auf der Start-Ziel-Geraden ins Gras und erhielt eine schwarze Flagge",
      "Beide kollidierten in der Boxengasse und wurden vom Renndirektor für ein Rennen gesperrt"
    ],
    "explanation": "Senna ließ sich nach dem Crash von Streckenposten anschieben, gewann das Rennen, wurde jedoch wegen Abkürzens der Schikane disqualifiziert – Prost wurde Weltmeister.",
    "exp": "Senna ließ sich nach dem Crash von Streckenposten anschieben, gewann das Rennen, wurde jedoch wegen Abkürzens der Schikane disqualifiziert – Prost wurde Weltmeister."
  },
  {
    "cat": "f1_legenden",
    "diff": "mid",
    "q": "Mit welcher Aktion entschied Ayrton Senna die Revanche gegen Alain Prost in Suzuka 1990 für sich?",
    "a": [
      "Er hielt in Kurve eins voll drauf, kollidierte mit Prosts Ferrari und sicherte sich so den Titel",
      "Er überholte Prost in der allerletzten Schikane außen herum mit zwei Rädern im Kiesbett",
      "Er pokerte auf Regenreifen bei trockenem Asphalt und fuhr Prost auf nasser Piste auf und davon",
      "Er täuschte einen Boxenstopp an, blieb draußen und gewann das Rennen mit 0,1 Sekunden Vorsprung"
    ],
    "explanation": "Senna war wütend über die Startplatz-Verlegung auf die schmutzige Innenseite und räumte Prost bereits 9 Sekunden nach dem Start in Kurve eins kompromisslos ab.",
    "exp": "Senna war wütend über die Startplatz-Verlegung auf die schmutzige Innenseite und räumte Prost bereits 9 Sekunden nach dem Start in Kurve eins kompromisslos ab."
  },
  {
    "cat": "f1_legenden",
    "diff": "mid",
    "q": "Welcher Brite prägte maßgeblich die Durchsetzung von Integralhelmen und Streckenbarrieren in der Formel 1?",
    "a": [
      "Sir Jackie Stewart nach mehreren schweren Unfällen in Spa und am Nürburgring",
      "Sir Stirling Moss nach seinem verheerenden Rennunfall in Goodwood",
      "James Hunt nach dem dramatischen Saisonabschluss auf dem Fuji Speedway",
      "Graham Hill nach seinen Erfolgen bei der Triple Crown des Motorsports"
    ],
    "explanation": "Der dreifache Champion Jackie Stewart boykottierte gefährliche Strecken und rettete mit seinem Sicherheitskreuzzug unzähligen Fahrern das Leben.",
    "exp": "Der dreifache Champion Jackie Stewart boykottierte gefährliche Strecken und rettete mit seinem Sicherheitskreuzzug unzähligen Fahrern das Leben."
  },
  {
    "cat": "f1_legenden",
    "diff": "mid",
    "q": "Welcher Pilot war der überrundete Statist beim legendären Überholmanöver von Häkkinen gegen Schumacher in Spa 2000?",
    "a": [
      "Ricardo Zonta im BAR-Honda auf der langen Kemmel-Geraden",
      "Pedro Diniz im Sauber-Petronas kurz vor der Les-Combes-Schikane",
      "Jos Verstappen im Arrows-Supertec nach der Eau-Rouge-Kompression",
      "Alexander Wurz im Benetton-Playlife vor der Bus-Stop-Schikane"
    ],
    "explanation": "Schumacher zog links an Zonta vorbei, doch Häkkinen stach mit über 300 km/h rechts hinein – eines der spektakulärsten Manöver der Formel-1-Geschichte.",
    "exp": "Schumacher zog links an Zonta vorbei, doch Häkkinen stach mit über 300 km/h rechts hinein – eines der spektakulärsten Manöver der Formel-1-Geschichte."
  },
  {
    "cat": "f1_legenden",
    "diff": "mid",
    "q": "Mit welchem Punktevorsprung wurde Kimi Räikkönen in der Saison 2007 für Ferrari Weltmeister?",
    "a": [
      "Mit genau einem Punkt Vorsprung auf Lewis Hamilton und Fernando Alonso",
      "Mit exakt zwei Punkten Vorsprung auf den McLaren-Piloten Lewis Hamilton",
      "Mit drei Punkten Vorsprung nach Punktgleichheit im letzten Saisonrennen",
      "Mit fünf Punkten Vorsprung durch einen Sieg beim Finale in Sao Paulo"
    ],
    "explanation": "Räikkönen kam als lachender Dritter nach Brasilien: Er siegte, während McLaren sich verkalkulierte – Endstand: Kimi 110 Punkte, Hamilton und Alonso je 109 Punkte.",
    "exp": "Räikkönen kam als lachender Dritter nach Brasilien: Er siegte, während McLaren sich verkalkulierte – Endstand: Kimi 110 Punkte, Hamilton und Alonso je 109 Punkte."
  },
  {
    "cat": "f1_legenden",
    "diff": "mid",
    "q": "Wie alt war Max Verstappen bei seinem ersten Grand-Prix-Sieg in Barcelona 2016?",
    "a": [
      "Genau 18 Jahre und 228 Tage bei seinem Red-Bull-Debütrennen",
      "Genau 19 Jahre und 14 Tage nach seinem Wechsel von Toro Rosso",
      "Genau 17 Jahre und 350 Tage bei seinem zweiten Formel-1-Saisonstart",
      "Genau 20 Jahre und 45 Tage auf dem Circuit de Barcelona-Catalunya"
    ],
    "explanation": "Nach der teaminternen Kollision der beiden Mercedes-Piloten Hamilton und Rosberg siegte Verstappen direkt bei seiner Rennpremiere für Red Bull Racing.",
    "exp": "Nach der teaminternen Kollision der beiden Mercedes-Piloten Hamilton und Rosberg siegte Verstappen direkt bei seiner Rennpremiere für Red Bull Racing."
  },
  {
    "cat": "f1_legenden",
    "diff": "mid",
    "q": "Wann gab Nico Rosberg nach seinem gewonnenen Weltmeistertitel 2016 seinen Rücktritt bekannt?",
    "a": [
      "Bereits fünf Tage nach dem Saisonfinale bei der FIA-Gala in Wien",
      "Erst drei Monate später kurz vor den offiziellen Wintertestfahrten",
      "Genau am Abend des Rennsonntags während der Siegesfeier in Abu Dhabi",
      "Zwei Wochen nach dem Saisonende im Rahmen einer Mercedes-Pressekonferenz"
    ],
    "explanation": "Rosberg erklärte, er habe sein Lebensziel erreicht und sei nicht bereit, noch einmal denselben extremen mentalen und familiären Preis zu bezahlen.",
    "exp": "Rosberg erklärte, er habe sein Lebensziel erreicht und sei nicht bereit, noch einmal denselben extremen mentalen und familiären Preis zu bezahlen."
  },
  {
    "cat": "f1_legenden",
    "diff": "mid",
    "q": "Welcher Grand Prix ging als Ayrton Sennas legendäre „Runde der Götter“ in die Geschichte ein?",
    "a": [
      "Der Große Preis von Europa 1993 im strömenden Regen von Donington Park",
      "Der Große Preis von Monaco 1984 im unterlegenen Toleman-Hart-Rennwagen",
      "Der Große Preis von Portugal 1985 in Estoril bei seinem allerersten Grand-Prix-Sieg",
      "Der Große Preis von Brasilien 1991 in Interlagos mit klemmendem sechsten Gang"
    ],
    "explanation": "Senna fiel am Start auf Rang fünf zurück, überholte bei Nässe in der ersten Runde Schumacher, Wendlinger, Hill und Prost und führte das Feld souverän an.",
    "exp": "Senna fiel am Start auf Rang fünf zurück, überholte bei Nässe in der ersten Runde Schumacher, Wendlinger, Hill und Prost und führte das Feld souverän an."
  },
  {
    "cat": "f1_legenden",
    "diff": "pro",
    "q": "Warum erhielt Alain Prost während seiner aktiven Karriere den berühmten Spitznamen „Der Professor“?",
    "a": [
      "Wegen seiner analytischen Fahrweise, Fahrzeugschonung und perfekten Rennstrategie",
      "Weil er vor seiner Motorsportkarriere Mathematik an einer Universität lehrte",
      "Wegen seiner dicken Hornbrille, die er während der Pressekonferenzen trug",
      "Weil er bei Debriefings stundenlang theoretische Aerodynamik-Skizzen zeichnete"
    ],
    "explanation": "Prost schonte Bremsen, Reifen und Treibstoff wie kein Zweiter und fuhr stets nur so schnell wie unbedingt nötig, um den Sieg oder wertvolle WM-Punkte einzufahren.",
    "exp": "Prost schonte Bremsen, Reifen und Treibstoff wie kein Zweiter und fuhr stets nur so schnell wie unbedingt nötig, um den Sieg oder wertvolle WM-Punkte einzufahren."
  },
  {
    "cat": "f1_legenden",
    "diff": "pro",
    "q": "Welche Entscheidung traf Niki Lauda beim dramatischen WM-Saisonfinale 1976 auf dem Fuji Speedway?",
    "a": [
      "Er stellte seinen Ferrari nach zwei Runden im monsunartigen Regen freiwillig ab",
      "Er wechselte eigenmächtig auf Trockenreifen und schied durch Aquaplaning aus",
      "Er attackierte James Hunt bis zur Ziellinie und verlor die WM um einen Punkt",
      "Er boykottierte den Rennstart und trat die Heimreise nach Österreich an"
    ],
    "explanation": "Lauda sagte: „Mein Leben ist mehr wert als ein Titel.“ James Hunt fuhr im Regenchaos auf Platz drei und sicherte sich den WM-Titel mit einem Zähler Vorsprung.",
    "exp": "Lauda sagte: „Mein Leben ist mehr wert als ein Titel.“ James Hunt fuhr im Regenchaos auf Platz drei und sicherte sich den WM-Titel mit einem Zähler Vorsprung."
  },
  {
    "cat": "f1_legenden",
    "diff": "pro",
    "q": "In welchem Saisonrennen sicherte sich Michael Schumacher 2002 den frühesten WM-Titel der Historie?",
    "a": [
      "Bereits im 11. von 17 Saisonrennen beim Großen Preis von Frankreich in Magny-Cours",
      "Schon im 9. von 16 Saisonrennen beim Großen Preis von Großbritannien in Silverstone",
      "Erst im 13. von 17 Saisonrennen beim Heimrennen von Ferrari auf dem Autodromo di Monza",
      "Bereits im 10. von 17 Saisonrennen auf dem Nürburgring beim Großen Preis von Europa"
    ],
    "explanation": "Schumacher stand 2002 in allen 17 Saisonrennen auf dem Podium und krönte sich bereits am 21. Juli – sechs Rennen vor Saisonende – zum Weltmeister.",
    "exp": "Schumacher stand 2002 in allen 17 Saisonrennen auf dem Podium und krönte sich bereits am 21. Juli – sechs Rennen vor Saisonende – zum Weltmeister."
  },
  {
    "cat": "f1_legenden",
    "diff": "pro",
    "q": "Welcher Fahrer beendete 2005 die fünfjährige Serie aufeinanderfolgender WM-Titel von Michael Schumacher?",
    "a": [
      "Fernando Alonso im Renault R25 mit V10-Saugmotor und breitem Heckflügel",
      "Kimi Räikkönen im schnellen, aber technisch unzuverlässigen McLaren-Mercedes",
      "Juan Pablo Montoya nach mehreren Siegen für das Traditionsteam Williams-BMW",
      "Jenson Button im neu formierten Werksteam von British American Racing Honda"
    ],
    "explanation": "Fernando Alonso wurde 2005 mit 24 Jahren der damals jüngste Weltmeister der Geschichte und brach die Vormachtstellung von Schumacher und Ferrari.",
    "exp": "Fernando Alonso wurde 2005 mit 24 Jahren der damals jüngste Weltmeister der Geschichte und brach die Vormachtstellung von Schumacher und Ferrari."
  },
  {
    "cat": "f1_technik",
    "diff": "easy",
    "q": "Wofür steht die Abkürzung DRS in der modernen Formel 1?",
    "a": [
      "Drag Reduction System zur Verringerung des aerodynamischen Luftwiderstands",
      "Dynamic Recovery System zur Speicherung elektrischer Bremsenergie im Akku",
      "Downforce Regulation System zur stufenlosen Anpassung des Bodenabtriebs",
      "Driver Response System zur telemetrischen Überwachung der Pilotenreaktion"
    ],
    "explanation": "Das Drag Reduction System klappt ein Flügelelement am Heck auf, wodurch der Luftwiderstand sinkt und die Höchstgeschwindigkeit um 10 bis 15 km/h steigt.",
    "exp": "Das Drag Reduction System klappt ein Flügelelement am Heck auf, wodurch der Luftwiderstand sinkt und die Höchstgeschwindigkeit um 10 bis 15 km/h steigt."
  },
  {
    "cat": "f1_technik",
    "diff": "easy",
    "q": "Welche Farbe kennzeichnet seit 2019 die weichste Trockenreifenmischung (Soft) von Pirelli?",
    "a": [
      "Kräftiges Rot für den maximalen Grip bei kürzerer Reifenhaltbarkeit",
      "Leuchtendes Gelb für die ausgewogene mittlere Reifenmischung",
      "Klares Weiß für die härteste Mischung mit längster Lebensdauer",
      "Helles Grün für leicht feuchte und abtrocknende Asphaltbedingungen"
    ],
    "explanation": "Um Verwirrung zu vermeiden, nutzt Pirelli an jedem Rennwochenende die einheitlichen Farben Rot (Soft), Gelb (Medium) und Weiß (Hard).",
    "exp": "Um Verwirrung zu vermeiden, nutzt Pirelli an jedem Rennwochenende die einheitlichen Farben Rot (Soft), Gelb (Medium) und Weiß (Hard)."
  },
  {
    "cat": "f1_technik",
    "diff": "easy",
    "q": "Welche Farbe tragen die Intermediate-Reifen für feuchte und abtrocknende Pistenbedingungen?",
    "a": [
      "Kräftiges Grün mit Profilrillen zur Verdrängung geringer Wassermengen",
      "Tiefes Blau für extreme Regenbedingungen mit viel stehendem Wasser",
      "Helles Orange für abtrocknende Pisten mit vereinzelten Pfützen",
      "Reines Gelb für wechselhafte Bedingungen zwischen Niesel und Sonne"
    ],
    "explanation": "Intermediates sind an der grünen Reifenflanke erkennbar und verdrängen bei Höchstgeschwindigkeit rund 30 Liter Wasser pro Sekunde.",
    "exp": "Intermediates sind an der grünen Reifenflanke erkennbar und verdrängen bei Höchstgeschwindigkeit rund 30 Liter Wasser pro Sekunde."
  },
  {
    "cat": "f1_technik",
    "diff": "easy",
    "q": "Aus welchem extrem widerstandsfähigen Werkstoff besteht der 2018 eingeführte Halo-Cockpitschutz?",
    "a": [
      "Aus hochfestem Titan Grade 5 für maximale Stabilität bei minimalem Gewicht",
      "Aus reinem Karbonfasergewebe mit eingearbeiteten Aramid-Schutzfasern",
      "Aus gehärtetem Flugzeug-Aluminium mit innenliegenden Stahlverstrebungen",
      "Aus hochelastischem Magnesium-Guss mit bruchsicherer Schutzbeschichtung"
    ],
    "explanation": "Der rund 7 Kilogramm leichte Titan-Bügel hält einer statischen Belastung von 12 Tonnen stand – das entspricht dem Gewicht zweier Londoner Doppeldeckerbusse.",
    "exp": "Der rund 7 Kilogramm leichte Titan-Bügel hält einer statischen Belastung von 12 Tonnen stand – das entspricht dem Gewicht zweier Londoner Doppeldeckerbusse."
  },
  {
    "cat": "f1_technik",
    "diff": "easy",
    "q": "Welches Motorenkonzept treibt die Formel 1 seit der Saison 2014 im Reglement an?",
    "a": [
      "1,6-Liter-V6-Turbomotoren mit doppelter elektrischer Energierückgewinnung",
      "2,4-Liter-V8-Saugmotoren mit einfachem mechanischem KERS-Schwungradspeicher",
      "3,0-Liter-V10-Saugmotoren mit pneumatischer Ventilsteuerung ohne Hybridsystem",
      "2,0-Liter-V4-Biturbo-Aggregate mit rein elektrischem Allradantrieb an der Front"
    ],
    "explanation": "Die hochkomplexen Power Units erreichen dank MGU-K und MGU-H einen thermischen Wirkungsgrad von über 50 Prozent – Rekord im weltweiten Verbrennungsmotorenbau.",
    "exp": "Die hochkomplexen Power Units erreichen dank MGU-K und MGU-H einen thermischen Wirkungsgrad von über 50 Prozent – Rekord im weltweiten Verbrennungsmotorenbau."
  },
  {
    "cat": "f1_technik",
    "diff": "mid",
    "q": "Welche Betriebstemperatur benötigen Karbonbremsen in einem F1-Wagen für optimale Verzögerung?",
    "a": [
      "Rund 300 bis 1000 Grad Celsius bei extremen Bremsmanövern",
      "Rund 80 bis 150 Grad Celsius zur Schonung des Bremsbelags",
      "Rund 1500 bis 2200 Grad Celsius kurz vor dem physikalischen Schmelzpunkt",
      "Konstant etwa 150 bis 250 Grad Celsius durch aktive Wasserkühlung"
    ],
    "explanation": "Unter 300 Grad Celsius bieten Karbonscheiben kaum Reibwirkung; bei harter Bremsung glühen sie hellrot bei bis zu 1000 Grad Celsius auf.",
    "exp": "Unter 300 Grad Celsius bieten Karbonscheiben kaum Reibwirkung; bei harter Bremsung glühen sie hellrot bei bis zu 1000 Grad Celsius auf."
  },
  {
    "cat": "f1_technik",
    "diff": "mid",
    "q": "Welches physikalische Prinzip nutzt der Ground Effect zur Erzeugung von Abtrieb am Fahrzeugunterboden?",
    "a": [
      "Den Venturi-Effekt durch verengte Strömungskanäle und starken Unterdruck",
      "Den Magnus-Effekt durch rotierende Zylinder an den seitlichen Einlässen",
      "Den Coanda-Effekt durch Ablenkung der heißen Abgase auf den Heckflügel",
      "Den Bernoullischen Staudruckeffekt an der Stirnseite der vorderen Nase"
    ],
    "explanation": "Durch Verengung des Strömungsquerschnitts strömt die Luft unter dem Auto schneller, der statische Druck sinkt und saugt den Wagen förmlich auf die Fahrbahn.",
    "exp": "Durch Verengung des Strömungsquerschnitts strömt die Luft unter dem Auto schneller, der statische Druck sinkt und saugt den Wagen förmlich auf die Fahrbahn."
  },
  {
    "cat": "f1_technik",
    "diff": "mid",
    "q": "Welche revolutionäre Technik verhalf Brawn GP in der Saison 2009 zu einem dominanten Saisonstart?",
    "a": [
      "Ein doppelstöckiger Diffusor mit genial genutzten Lücken im Heckreglement",
      "Eine aktive Allradlenkung zur Minimierung von Untersteuern in langsamen Kurven",
      "Ein vollautomatisches Doppelkupplungsgetriebe ohne spürbare Schaltunterbrechung",
      "Flexible Frontflügel-Endplatten zur Umleitung des Reifen-Luftwirbels"
    ],
    "explanation": "Brawn GP fand eine Lücke in den Maßvorgaben des Diffusors, leitete zusätzliche Luftströme hindurch und erzeugte weit mehr Abtrieb als die Konkurrenz.",
    "exp": "Brawn GP fand eine Lücke in den Maßvorgaben des Diffusors, leitete zusätzliche Luftströme hindurch und erzeugte weit mehr Abtrieb als die Konkurrenz."
  },
  {
    "cat": "f1_technik",
    "diff": "mid",
    "q": "Was bewirkte das clevere DAS-System (Dual Axis Steering) von Mercedes in der Saison 2020?",
    "a": [
      "Verstellung der Vorspur der Vorderräder durch Drücken und Ziehen des Lenkrads",
      "Manuelle Neigung des Frontflügel-Winkels zur Erhöhung des Topspeeds auf Geraden",
      "Absenkung der Fahrwerkshöhe an der Hinterachse zur Reduzierung des Luftwiderstands",
      "Stufenlose Umschaltung der Bremskraftverteilung zwischen Vorder- und Hinterrädern"
    ],
    "explanation": "Auf den Geraden zogen Hamilton und Bottas das Lenkrad zu sich heran: Die Reifen standen parallel, wärmten gleichmäßiger an und rollten mit weniger Widerstand.",
    "exp": "Auf den Geraden zogen Hamilton und Bottas das Lenkrad zu sich heran: Die Reifen standen parallel, wärmten gleichmäßiger an und rollten mit weniger Widerstand."
  },
  {
    "cat": "f1_technik",
    "diff": "mid",
    "q": "Welche Energieform wandelt die MGU-H in der modernen Turbo-Hybrid-Power-Unit um?",
    "a": [
      "Thermische Abgasenergie des Turboladers in nutzbaren elektrischen Strom",
      "Kinetische Rotationsenergie der Hinterachse beim harten Anbremsen vor Kurven",
      "Hydraulischen Druck des Servosystems in mechanische Antriebsleistung",
      "Akustische Schwingungen des Auspuffkrümmers in zusätzliche Ladeleistung"
    ],
    "explanation": "Die MGU-H sitzt auf der Welle des Turboladers: Sie eliminiert das Turboloch und speist gewonnene Energie direkt in den Akku oder an die MGU-K ein.",
    "exp": "Die MGU-H sitzt auf der Welle des Turboladers: Sie eliminiert das Turboloch und speist gewonnene Energie direkt in den Akku oder an die MGU-K ein."
  },
  {
    "cat": "f1_technik",
    "diff": "mid",
    "q": "Was zeichnete den legendären Williams FW14B aus der Meistersaison 1992 technisch besonders aus?",
    "a": [
      "Eine hochentwickelte aktive Aufhängung mit hydraulischer Niveaukontrolle",
      "Ein revolutionäres stufenloses CVT-Getriebe ohne starre Zahnradstufen",
      "Ein Sechszylinder-Bi-Turbomotor mit variabler Turbinengeometrie",
      "Ein vollständiges Monocoque aus geschmiedetem Luftfahrt-Titan"
    ],
    "explanation": "Nigel Mansell dominierte 1992 nach Belieben: Das aktive Fahrwerk hielt den Wagen in jeder Kurve bei konstanter Bodenfreiheit auf maximalem Abtriebsniveau.",
    "exp": "Nigel Mansell dominierte 1992 nach Belieben: Das aktive Fahrwerk hielt den Wagen in jeder Kurve bei konstanter Bodenfreiheit auf maximalem Abtriebsniveau."
  },
  {
    "cat": "f1_technik",
    "diff": "mid",
    "q": "Warum könnte ein moderner Formel-1-Wagen bei ca. 200 km/h theoretisch kopfüber an einer Decke fahren?",
    "a": [
      "Weil der aerodynamische Abtrieb das Eigengewicht des Boliden bei weitem übersteigt",
      "Weil elektromagnetische Unterbodenleisten eisenhaltigen Spezialasphalt anziehen",
      "Weil die Zentrifugalkraft in Steilwandkurven den Anpressdruck vervierfacht",
      "Weil der Diffusor im geschlossenen Strömungskanal ein Vakuum erzeugen kann"
    ],
    "explanation": "Bei 200 km/h erzeugen die Flügel und der Unterboden über 1000 kg Abtrieb – mehr als das Mindestgewicht des Autos inklusive Fahrer (rund 798 kg).",
    "exp": "Bei 200 km/h erzeugen die Flügel und der Unterboden über 1000 kg Abtrieb – mehr als das Mindestgewicht des Autos inklusive Fahrer (rund 798 kg)."
  },
  {
    "cat": "f1_technik",
    "diff": "pro",
    "q": "Welche bizarre Konstruktion verhalf dem Brabham BT46B 1978 zu seinem einzigen Grand-Prix-Sieg?",
    "a": [
      "Ein riesiger Heckventilator, der Luft unter dem Wagen absaugte und Unterdruck schuf",
      "Zwei hintereinander montierte Heckflügel mit gegenläufiger Luftverwirbelung",
      "Vier schmale Vorderräder mit integrierten Scheibenbremsen in den Felgenbetten",
      "Ein hohler Heckdiffusor mit Einspritzung von komprimiertem Stickstoff"
    ],
    "explanation": "Gordon Murray deklarierte den Riesenlüfter offiziell als Kühllüfter, doch er saugte den Wagen auf den Asphalt. Nach Laudas Sieg in Anderstorp wurde er verboten.",
    "exp": "Gordon Murray deklarierte den Riesenlüfter offiziell als Kühllüfter, doch er saugte den Wagen auf den Asphalt. Nach Laudas Sieg in Anderstorp wurde er verboten."
  },
  {
    "cat": "f1_technik",
    "diff": "pro",
    "q": "Aus welchem aerodynamischen Grund baute Tyrrell 1976 den legendären sechsrädrigen P34?",
    "a": [
      "Vier winzige 10-Zoll-Vorderräder verringerten den schädlichen Luftwiderstand",
      "Zwei angetriebene Zwillings-Hinterachsen sollten das Durchdrehen der Räder stoppen",
      "Vier gelenkte Vorderräder sollten den Reifenverschleiß in engen Kurven halbieren",
      "Die Zusatzräder sollten Platz für zwei zusätzliche Wasserkühler in der Front schaffen"
    ],
    "explanation": "Konstrukteur Derek Gardner wollte die riesigen Vorderräder im Windschatten der Nase verstecken; Jody Scheckter gewann damit sogar den GP von Schweden 1976.",
    "exp": "Konstrukteur Derek Gardner wollte die riesigen Vorderräder im Windschatten der Nase verstecken; Jody Scheckter gewann damit sogar den GP von Schweden 1976."
  },
  {
    "cat": "f1_technik",
    "diff": "pro",
    "q": "Wie bediente der Fahrer das sogenannte F-Duct-System im McLaren MP4-25 der Saison 2010?",
    "a": [
      "Er verdeckte ein kleines Loch im Cockpit mit seinem linken Bein oder Knie",
      "Er betätigte ein verdecktes hydraulisches Fußpedal links neben der Bremse",
      "Er zog an einem Seilzug am Lenkrad, der die Klappe im Heckflügel öffnete",
      "Er veränderte die Sitzposition nach hinten zur Freigabe des Luftkanals"
    ],
    "explanation": "Durch das Abdecken des Lochs im Cockpit strömte Luft durch das Chassis zum Heckflügel und brachte den Flügelströmungsabriss – für bis zu 10 km/h mehr Topspeed.",
    "exp": "Durch das Abdecken des Lochs im Cockpit strömte Luft durch das Chassis zum Heckflügel und brachte den Flügelströmungsabriss – für bis zu 10 km/h mehr Topspeed."
  },
  {
    "cat": "f1_technik",
    "diff": "pro",
    "q": "Welches Drehzahllimit schreibt das FIA-Reglement für die V6-Turbo-Verbrennungsmotoren maximal vor?",
    "a": [
      "Maximal 15.000 Umdrehungen pro Minute (wird durch Benzin-Durchflusslimit kaum erreicht)",
      "Maximal 18.000 Umdrehungen pro Minute wie in den letzten Jahren der V8-Ära",
      "Maximal 20.000 Umdrehungen pro Minute wie zu Spitzenzeiten der V10-Motoren",
      "Maximal 12.000 Umdrehungen pro Minute zur Begrenzung der extremen Bauteilbelastung"
    ],
    "explanation": "Obwohl 15.000 U/min erlaubt sind, schalten die Piloten meist schon bei 12.000 bis 13.000 U/min, da der maximale Benzindurchfluss auf 100 kg/h begrenzt ist.",
    "exp": "Obwohl 15.000 U/min erlaubt sind, schalten die Piloten meist schon bei 12.000 bis 13.000 U/min, da der maximale Benzindurchfluss auf 100 kg/h begrenzt ist."
  },
  {
    "cat": "f1_strecken",
    "diff": "easy",
    "q": "Wo fand am 13. Mai 1950 der allererste Grand Prix der Formel-1-Weltmeisterschaft statt?",
    "a": [
      "Auf dem ehemaligen britischen Militärflugplatz von Silverstone",
      "Auf den legendären Straßen des Stadtkurses im Fürstentum Monaco",
      "Auf dem traditionsreichen Hochgeschwindigkeitskurs im königlichen Park von Monza",
      "Auf der anspruchsvollen Naturrennstrecke von Bremgarten in der Schweiz"
    ],
    "explanation": "Giuseppe Farina gewann das Eröffnungsrennen 1950 in Silverstone auf Alfa Romeo und krönte sich am Ende des Jahres auch zum ersten F1-Weltmeister.",
    "exp": "Giuseppe Farina gewann das Eröffnungsrennen 1950 in Silverstone auf Alfa Romeo und krönte sich am Ende des Jahres auch zum ersten F1-Weltmeister."
  },
  {
    "cat": "f1_strecken",
    "diff": "easy",
    "q": "Welche Kurvenkombination in Spa-Francorchamps gilt als eine der berühmtesten Mutpassagen der Welt?",
    "a": [
      "Die berüchtigte Eau-Rouge-Senke mit der anschließenden Raidillon-Bergaufpassage",
      "Die langgezogene Parabolica-Kurve mit Anbremszone auf die Zielgerade",
      "Die enge Rascasse-Haarnadelkurve direkt vor der Boxengasseneinfahrt",
      "Die legendäre Curva Grande mit maximalem Abtrieb im sechsten Gang"
    ],
    "explanation": "Die Fahrer tauchen bei über 300 km/h in die Senke ein, werden mit bis zu 4g in den Sitz gepresst und schießen blind über die Kuppe der Raidillon.",
    "exp": "Die Fahrer tauchen bei über 300 km/h in die Senke ein, werden mit bis zu 4g in den Sitz gepresst und schießen blind über die Kuppe der Raidillon."
  },
  {
    "cat": "f1_strecken",
    "diff": "easy",
    "q": "Welche Rennstrecke wird von Fahrern und Fans ehrfürchtig als „Temple of Speed“ bezeichnet?",
    "a": [
      "Das historische Autodromo Nazionale Monza im königlichen Park von Italien",
      "Der traditionsreiche Silverstone Circuit im Herzen des britischen Motorsports",
      "Der Circuit de Spa-Francorchamps in den dichten Wäldern der belgischen Ardennen",
      "Der Circuit Gilles-Villeneuve auf der künstlichen Flussinsel in Montreal"
    ],
    "explanation": "Monza besitzt den höchsten Vollgasanteil im gesamten Rennkalender (ca. 75 Prozent einer Runde) und hält alle Rekorde für die höchsten Durchschnittsgeschwindigkeiten.",
    "exp": "Monza besitzt den höchsten Vollgasanteil im gesamten Rennkalender (ca. 75 Prozent einer Runde) und hält alle Rekorde für die höchsten Durchschnittsgeschwindigkeiten."
  },
  {
    "cat": "f1_strecken",
    "diff": "easy",
    "q": "Welche Kurve auf dem Circuit de Monaco gilt als die langsamste Stelle im gesamten Rennkalender?",
    "a": [
      "Die Grand-Hotel-Haarnadelkurve (früher als Loews-Haarnadel bekannt)",
      "Die Sainte-Dévote-Rechtskurve unmittelbar nach dem Start-Ziel-Sprint",
      "Die Schwimmbad-Schikane im Hafensektor entlang der Luxusjachten",
      "Die Anthony-Noghès-Rechtskurve vor der Beschleunigung zur Ziellinie"
    ],
    "explanation": "Die berühmte Haarnadelkurve wird mit nur ca. 45 bis 50 km/h durchfahren – Teams müssen dafür eigens den maximalen Lenkeinschlag ihrer Boliden vergrößern.",
    "exp": "Die berühmte Haarnadelkurve wird mit nur ca. 45 bis 50 km/h durchfahren – Teams müssen dafür eigens den maximalen Lenkeinschlag ihrer Boliden vergrößern."
  },
  {
    "cat": "f1_strecken",
    "diff": "easy",
    "q": "Welche Besonderheit im Streckenverlauf macht den Suzuka International Racing Course weltweit einzigartig?",
    "a": [
      "Das Layout hat die Form einer Acht und überkreuzt sich über eine Brücke",
      "Die Rennstrecke wird im Gegensatz zu allen anderen Kursen gegen den Uhrzeigersinn befahren",
      "Die Boxengasse liegt vollständig unterirdisch unterhalb der Haupttribüne",
      "Start und Ziel befinden sich auf zwei vollkommen voneinander getrennten Geraden"
    ],
    "explanation": "Suzuka wurde von John Hugenholtz als Teststrecke für Honda entworfen und ist die einzige Grand-Prix-Strecke der Welt mit einer Brückenüberwerfung.",
    "exp": "Suzuka wurde von John Hugenholtz als Teststrecke für Honda entworfen und ist die einzige Grand-Prix-Strecke der Welt mit einer Brückenüberwerfung."
  },
  {
    "cat": "f1_strecken",
    "diff": "mid",
    "q": "Welcher Grand Prix schrieb 2008 Geschichte als das allererste Nachtrennen der Formel-1-Historie?",
    "a": [
      "Der Große Preis von Singapur auf dem spektakulären Marina Bay Street Circuit",
      "Der Große Preis von Bahrain auf dem hell erleuchteten Bahrain International Circuit",
      "Der Große Preis von Abu Dhabi mit seinem Start bei Sonnenuntergang in die Nacht",
      "Der Große Preis von Las Vegas auf dem berühmten Las Vegas Boulevard Strip"
    ],
    "explanation": "Über 1.500 Spezialscheinwerfer machten die Straßen von Singapur taghell – Fernando Alonso gewann das Premierenrennen nach dem berüchtigten Crashgate-Skandal.",
    "exp": "Über 1.500 Spezialscheinwerfer machten die Straßen von Singapur taghell – Fernando Alonso gewann das Premierenrennen nach dem berüchtigten Crashgate-Skandal."
  },
  {
    "cat": "f1_strecken",
    "diff": "mid",
    "q": "Welcher britische Champion prägte für die alte Nürburgring-Nordschleife den Begriff „Die Grüne Hölle“?",
    "a": [
      "Sir Jackie Stewart wegen der unbarmherzigen Härte und Gefährlichkeit des Eifelkurses",
      "Graham Hill nach seinem legendären Regensieg im Nebel des Eifelwaldes",
      "John Surtees als einziger Weltmeister auf zwei und vier Rädern",
      "James Hunt nach seinem packenden Duell gegen Niki Lauda im Sommer 1976"
    ],
    "explanation": "Stewart taufte den 22,8 Kilometer langen Kurs mit 73 Kurven „Green Hell“; nach Laudas Feuerunfall 1976 fuhr die Formel 1 nie wieder auf der Nordschleife.",
    "exp": "Stewart taufte den 22,8 Kilometer langen Kurs mit 73 Kurven „Green Hell“; nach Laudas Feuerunfall 1976 fuhr die Formel 1 nie wieder auf der Nordschleife."
  },
  {
    "cat": "f1_strecken",
    "diff": "mid",
    "q": "Warum wird die Außenmauer an der letzten Schikane in Montreal als „Wall of Champions“ bezeichnet?",
    "a": [
      "Weil dort 1999 mit Hill, Schumacher und Villeneuve drei Weltmeister im Rennen crashten",
      "Weil dort die Handabdrücke aller siegreichen Grand-Prix-Gewinner verewigt sind",
      "Weil Ayrton Senna dort 1988 mit gebrochener Radaufhängung seinen ersten Titel verlor",
      "Weil Michael Schumacher dort fünfmal in Folge die schnellste Rennrunde fuhr"
    ],
    "explanation": "Beim Grand Prix von Kanada 1999 schlugen Damon Hill, Michael Schumacher und Jacques Villeneuve nacheinander an exakt derselben Betonmauer ein.",
    "exp": "Beim Grand Prix von Kanada 1999 schlugen Damon Hill, Michael Schumacher und Jacques Villeneuve nacheinander an exakt derselben Betonmauer ein."
  },
  {
    "cat": "f1_strecken",
    "diff": "mid",
    "q": "Wie sicherte sich Lewis Hamilton beim GP von Brasilien 2008 in der allerletzten Kurve seinen ersten WM-Titel?",
    "a": [
      "Er überholte Timo Glock, der im strömenden Regen noch auf Trockenreifen unterwegs war",
      "Er profitierte vom Motorschaden des führenden Ferrari-Piloten Felipe Massa kurz vor dem Ziel",
      "Er fing Sebastian Vettel mit einem waghalsigen Ausbremsmanöver in der Juncao-Kurve ab",
      "Er erhielt den rettenden fünften Rang durch eine nachträgliche Zeitstrafe gegen Heikki Kovalainen"
    ],
    "explanation": "Massa überquerte die Ziellinie als gefühlter Weltmeister, doch Hamilton passierte Glock wenige hundert Meter vor dem Ziel, wurde Fünfter und Champion mit einem Punkt Vorsprung.",
    "exp": "Massa überquerte die Ziellinie als gefühlter Weltmeister, doch Hamilton passierte Glock wenige hundert Meter vor dem Ziel, wurde Fünfter und Champion mit einem Punkt Vorsprung."
  },
  {
    "cat": "f1_strecken",
    "diff": "mid",
    "q": "Welche weltberühmte Kurvenkombination auf dem Silverstone Circuit fordert über 5g Querbeschleunigung?",
    "a": [
      "Die Kurvenabfolge Maggotts, Becketts und Chapel",
      "Die flüssige Kombination Copse, Stowe und Club Corner",
      "Der langsame Stadionkomplex Luffield und Woodcote",
      "Die neu angelegte Schleife aus Abbey, Farm und Village"
    ],
    "explanation": "Mit über 270 km/h werfen die Fahrer das Auto von links nach rechts – aerodynamische Spitzenleistung von Fahrer und Bolide.",
    "exp": "Mit über 270 km/h werfen die Fahrer das Auto von links nach rechts – aerodynamische Spitzenleistung von Fahrer und Bolide."
  },
  {
    "cat": "f1_strecken",
    "diff": "mid",
    "q": "Welcher Rennkurs besitzt mit nur 7,6 Metern Breite die engste Streckenpassage im gesamten Rennkalender?",
    "a": [
      "Der Baku City Circuit an der historischen Festungsmauer der Altstadt",
      "Der Circuit de Monaco bei der engen Passage durch die Tunnelschikanen",
      "Der Jeddah Corniche Circuit entlang der engen Hafenmauer am Roten Meer",
      "Der Marina Bay Circuit bei der Durchfahrt unter der Anderson-Brücke"
    ],
    "explanation": "Die Altstadt-Sektion in Baku rund um Kurve 8 ist extrem schmal und verzeiht nicht den kleinsten Fahrfehler – Charles Leclerc crashte dort 2019 im Qualifying.",
    "exp": "Die Altstadt-Sektion in Baku rund um Kurve 8 ist extrem schmal und verzeiht nicht den kleinsten Fahrfehler – Charles Leclerc crashte dort 2019 im Qualifying."
  },
  {
    "cat": "f1_strecken",
    "diff": "pro",
    "q": "Zu Ehren welches verstorbenen Ferrari-Piloten wurde Monzas berühmte Parabolica-Kurve 2021 offiziell umbenannt?",
    "a": [
      "Zu Ehren des italienischen Vizeweltmeisters Michele Alboreto",
      "Zu Ehren der 1982 tödlich verunglückten Rennlegende Gilles Villeneuve",
      "Zu Ehren des zweifachen italienischen Weltmeisters Alberto Ascari",
      "Zu Ehren des langjährigen Ferrari-Piloten Lorenzo Bandini"
    ],
    "explanation": "Pünktlich zum 100-jährigen Bestehen der Strecke erhielt die berühmte Zielkurve den offiziellen Namen „Curva Alboreto“.",
    "exp": "Pünktlich zum 100-jährigen Bestehen der Strecke erhielt die berühmte Zielkurve den offiziellen Namen „Curva Alboreto“."
  },
  {
    "cat": "f1_strecken",
    "diff": "pro",
    "q": "Welcher gravierende Streckenumbau veränderte den Charakter des Hockenheimrings im Jahr 2002 radikal?",
    "a": [
      "Die kilometerlangen Waldgeraden wurden abgerissen und die Strecke fast halbiert",
      "Das historische Motodrom-Stadion wurde zugunsten neuer Auslaufzonen abgerissen",
      "Die Ostkurven-Schikane wurde entfernt und die Strecke zur Oval-Rennbahn umgebaut",
      "Die Start-Ziel-Gerade wurde um 800 Meter verlängert und erhielt eine Steilkurve"
    ],
    "explanation": "Hermann Tilke verkürzte den Highspeed-Kurs von 6,8 auf 4,5 km; die legendären Waldgeraden wurden renaturiert und Bäume gepflanzt.",
    "exp": "Hermann Tilke verkürzte den Highspeed-Kurs von 6,8 auf 4,5 km; die legendären Waldgeraden wurden renaturiert und Bäume gepflanzt."
  },
  {
    "cat": "f1_strecken",
    "diff": "pro",
    "q": "Welches Team feierte beim Saisonauftakt 2009 in Melbourne aus dem Stand einen sensationellen Doppelsieg?",
    "a": [
      "Brawn GP mit Jenson Button und Rubens Barrichello nach der Honda-Rettung",
      "Red Bull Racing mit Sebastian Vettel und Mark Webber auf dem neu designten RB5",
      "Toyota Racing mit Jarno Trulli und Timo Glock nach starker Wintertest-Form",
      "BMW Sauber mit Nick Heidfeld und Robert Kubica nach KERS-Entwicklungsvorsprung"
    ],
    "explanation": "Ross Brawn kaufte das bankrotte Honda-Team für ein britisches Pfund, baute einen Mercedes-Motor ein und gewann 2009 prompt beide Weltmeisterschaften.",
    "exp": "Ross Brawn kaufte das bankrotte Honda-Team für ein britisches Pfund, baute einen Mercedes-Motor ein und gewann 2009 prompt beide Weltmeisterschaften."
  },
  {
    "cat": "f1_strecken",
    "diff": "pro",
    "q": "Welche Kurve auf dem Autodromo José Carlos Pace (Interlagos) ehrt Brasiliens größten Nationalhelden?",
    "a": [
      "Das Bergab-S am Ende der Start-Ziel-Geraden („Senna S“)",
      "Die steile, überhöhte Zielkurve Curva do Cafe kurz vor der Startlinie",
      "Die langsame Doppelhaarnadel Bico de Pato im tiefsten Streckensektor",
      "Die schnelle Rechtskurve Curva do Sol vor der langen Gegengeraden"
    ],
    "explanation": "Ayrton Senna wirkte beim Streckenumbau 1989/90 persönlich an der Neugestaltung der ersten Kurvenkombination nach Start und Ziel mit.",
    "exp": "Ayrton Senna wirkte beim Streckenumbau 1989/90 persönlich an der Neugestaltung der ersten Kurvenkombination nach Start und Ziel mit."
  },
  {
    "cat": "f1_regeln",
    "diff": "easy",
    "q": "Wie funktioniert die offizielle Startampel-Prozedur bei einem regulären Formel-1-Grand-Prix?",
    "a": [
      "Fünf rote Ampeln gehen nacheinander an und erlöschen simultan",
      "Drei rote Ampeln schalten nach fünf Sekunden simultan auf grün um",
      "Fünf rote Lichter schalten nacheinander auf gelb und dann gemeinsam auf grün",
      "Eine digitale Ampel zählt von fünf auf null herunter, bevor die Flagge fällt"
    ],
    "explanation": "Sobald alle 5 roten Lichter leuchten, bestimmt ein Zufallsgenerator (zwischen 0,2 und 3 Sekunden), wann die Lichter ausgehen – das ist das Startsignal.",
    "exp": "Sobald alle 5 roten Lichter leuchten, bestimmt ein Zufallsgenerator (zwischen 0,2 und 3 Sekunden), wann die Lichter ausgehen – das ist das Startsignal."
  },
  {
    "cat": "f1_regeln",
    "diff": "easy",
    "q": "Was bedeutet die Blaue Flagge für einen Piloten während des Grand-Prix-Rennens?",
    "a": [
      "Ein schnellerer Wagen setzt zur Überrundung an und muss zügig vorbeigelassen werden",
      "Auf der Strecke befindet sich ein langsames Rettungs- oder Bergungsfahrzeug",
      "Die Strecke ist rutschig durch ausgelaufenes Motoröl oder herumliegende Trümmerteile",
      "Das Rennen wurde abgebrochen und alle Fahrzeuge müssen in die Boxengasse fahren"
    ],
    "explanation": "Ignoriert ein Fahrer drei aufeinanderfolgende Blaue Flaggen, wird er von den Rennkommissaren mit einer Zeitstrafe belegt.",
    "exp": "Ignoriert ein Fahrer drei aufeinanderfolgende Blaue Flaggen, wird er von den Rennkommissaren mit einer Zeitstrafe belegt."
  },
  {
    "cat": "f1_regeln",
    "diff": "easy",
    "q": "Wie viele WM-Punkte erhält der Sieger eines Formel-1-Grand-Prix seit der Saison 2010?",
    "a": [
      "Genau 25 Punkte für den ersten Platz (der Zweitplatzierte erhält 18 Punkte)",
      "Genau 20 Punkte für den Sieg (der Zweitplatzierte erhält 15 Punkte)",
      "Genau 10 Punkte für den Sieg wie in den klassischen Jahren bis 2009",
      "Genau 30 Punkte für den Sieger inklusive fünf Bonuspunkten für den Startplatz"
    ],
    "explanation": "Das Punktesystem belohnt Siege besonders stark: 25-18-15-12-10-8-6-4-2-1 für die ersten zehn Plätze.",
    "exp": "Das Punktesystem belohnt Siege besonders stark: 25-18-15-12-10-8-6-4-2-1 für die ersten zehn Plätze."
  },
  {
    "cat": "f1_regeln",
    "diff": "easy",
    "q": "Welche Reifenregel gilt verpflichtend bei einem vollständig trockenen Grand-Prix-Rennen?",
    "a": [
      "Einsatz von mindestens zwei unterschiedlichen Slick-Mischungen",
      "Jeder Fahrer muss zwingend alle drei mitgebrachten Reifenmischungen fahren",
      "Ein Boxenstopp ist nur erlaubt, wenn die Reifen mindestens 50 Prozent Abrieb aufweisen",
      "Die Startreifen müssen mindestens über die halbe Renndistanz gefahren werden"
    ],
    "explanation": "Die Pflicht zu zwei verschiedenen Trockenmischungen garantiert mindestens einen regulären Boxenstopp pro Rennen.",
    "exp": "Die Pflicht zu zwei verschiedenen Trockenmischungen garantiert mindestens einen regulären Boxenstopp pro Rennen."
  },
  {
    "cat": "f1_regeln",
    "diff": "mid",
    "q": "Was bedeutet der Begriff „Undercut“ in der modernen Formel-1-Rennstrategie?",
    "a": [
      "Früher als der direkte Rivale an die Box zu fahren, um auf frischen Reifen vorbeizuziehen",
      "Länger als die Konkurrenz draußen zu bleiben und auf eine Safety-Car-Phase zu hoffen",
      "Mit extrem flachem Heckflügel auf den Geraden durch geringeren Luftwiderstand zu überholen",
      "In der Bremszone innen hineinzustechen und dem Gegner die Kurvenlinie abzuschneiden"
    ],
    "explanation": "Auf neuen Pneus fährt der Fahrer sofort 1 bis 2 Sekunden schneller pro Runde. Stoppt der Gegner eine Runde später, kommt er meist hinter ihm heraus.",
    "exp": "Auf neuen Pneus fährt der Fahrer sofort 1 bis 2 Sekunden schneller pro Runde. Stoppt der Gegner eine Runde später, kommt er meist hinter ihm heraus."
  },
  {
    "cat": "f1_regeln",
    "diff": "mid",
    "q": "Was signalisiert die schwarz-orange Flagge (auch „Meatball Flag“ genannt) einem Fahrer?",
    "a": [
      "Sein Auto hat einen gefährlichen technischen Schaden und er muss sofort an die Box",
      "Er wurde wegen unsportlichen Verhaltens verwarnt und steht kurz vor der Disqualifikation",
      "Auf der Strecke befindet sich ein Tier oder ein ungesichertes Trümmerteil",
      "Er hat die Track Limits viermal übertreten und erhält eine 5-Sekunden-Zeitstrafe"
    ],
    "explanation": "Hängt beispielsweise ein Frontflügel lose herunter, zwingt die Flagge das Team zur unverzüglichen Reparatur in der Boxengasse.",
    "exp": "Hängt beispielsweise ein Frontflügel lose herunter, zwingt die Flagge das Team zur unverzüglichen Reparatur in der Boxengasse."
  },
  {
    "cat": "f1_regeln",
    "diff": "mid",
    "q": "Wie verhalten sich die Piloten während einer Virtual-Safety-Car-Phase (VSC) auf der Strecke?",
    "a": [
      "Tempo drosseln und ein vorgegebenes Delta am Lenkrad einhalten",
      "Sie müssen sich in einer geschlossenen Kolonne hinter dem Safety Car einreihen",
      "Sie dürfen auf der gesamten Strecke maximal mit Tempo 80 km/h fahren",
      "Sie müssen sofort in die Boxengasse abbiegen und auf den Neustart warten"
    ],
    "explanation": "Das VSC friert die Abstände digital ein: Die Fahrer müssen ihren Speed um ca. 35 bis 40 Prozent senken und ein positives Zeitdelta auf dem Display halten.",
    "exp": "Das VSC friert die Abstände digital ein: Die Fahrer müssen ihren Speed um ca. 35 bis 40 Prozent senken und ein positives Zeitdelta auf dem Display halten."
  },
  {
    "cat": "f1_regeln",
    "diff": "mid",
    "q": "Wann liegt laut aktuellem FIA-Reglement ein Verstoß gegen die sogenannten „Track Limits“ vor?",
    "a": [
      "Alle vier Räder überqueren die weiße Linie vollständig",
      "Sobald zwei Räder den rot-weißen Randstein auf der Kurvenaußenseite berühren",
      "Wenn der Frontflügel über die Fahrbahnbegrenzung in die Auslaufzone ragt",
      "Sobald der Unterboden des Boliden auf dem Kunstrasen Funkenflug erzeugt"
    ],
    "explanation": "Solange auch nur ein winziger Teil eines Reifens die weiße Linie von oben betrachtet berührt, gilt die Runde noch als regulär.",
    "exp": "Solange auch nur ein winziger Teil eines Reifens die weiße Linie von oben betrachtet berührt, gilt die Runde noch als regulär."
  },
  {
    "cat": "f1_regeln",
    "diff": "mid",
    "q": "Was bedeutet die Regelung des „Parc Fermé“ ab Beginn des Qualifyings für die Teams?",
    "a": [
      "Wesentliche Abstimmungsarbeiten und Umbauten am Auto sind streng untersagt",
      "Die Fahrzeuge dürfen bis zum Rennstart von niemandem mehr betreten oder berührt werden",
      "Die Motoren müssen ausgebaut und von der FIA auf Konformität geprüft werden",
      "Das gesamte Benzin muss abgelassen und neu gewogen werden"
    ],
    "explanation": "Erlaubt sind nur Routinechecks, Reifendruckanpassungen und minimale Frontflügeljustierungen – wer das Setup grundlegend ändert, muss aus der Boxengasse starten.",
    "exp": "Erlaubt sind nur Routinechecks, Reifendruckanpassungen und minimale Frontflügeljustierungen – wer das Setup grundlegend ändert, muss aus der Boxengasse starten."
  },
  {
    "cat": "f1_regeln",
    "diff": "mid",
    "q": "Wie viele Fahrzeuge scheiden im regulären K.o.-Qualifying jeweils nach Q1 und Q2 aus?",
    "a": [
      "Jeweils die fünf langsamsten Boliden nach Q1 und Q2",
      "Jeweils genau die vier langsamsten Boliden (12 Autos ziehen in Q3 ein)",
      "Jeweils genau die sechs langsamsten Boliden (nur 8 Fahrzeuge bestreiten Q3)",
      "In Q1 scheiden fünf Autos aus, in Q2 scheiden weitere sieben Fahrzeuge aus"
    ],
    "explanation": "Nach Q1 belegen die Plätze 16 bis 20 ihre Startpositionen, nach Q2 die Plätze 11 bis 15 – die Top 10 fahren im 12-minütigen Q3 um die Pole Position.",
    "exp": "Nach Q1 belegen die Plätze 16 bis 20 ihre Startpositionen, nach Q2 die Plätze 11 bis 15 – die Top 10 fahren im 12-minütigen Q3 um die Pole Position."
  },
  {
    "cat": "f1_regeln",
    "diff": "pro",
    "q": "Welches Team stellte beim Grand Prix von Katar 2023 den Weltrekord für den schnellsten Boxenstopp auf?",
    "a": [
      "McLaren mit einer Standzeit von 1,80 Sekunden bei Lando Norris",
      "Red Bull Racing mit einer Rekordzeit von 1,82 Sekunden an Max Verstappens Auto",
      "Ferrari mit einem fehlerfreien Reifenwechsel in 1,86 Sekunden an Charles Leclerc",
      "Williams mit einem sensationellen Stopp in 1,89 Sekunden an Alexander Albon"
    ],
    "explanation": "In nur 1,80 Sekunden hoben die Mechaniker den Wagen an, wechselten alle vier Räder und ließen das Auto wieder auf den Asphalt fallen.",
    "exp": "In nur 1,80 Sekunden hoben die Mechaniker den Wagen an, wechselten alle vier Räder und ließen das Auto wieder auf den Asphalt fallen."
  },
  {
    "cat": "f1_regeln",
    "diff": "pro",
    "q": "Ab welchem Streckenpunkt darf beim Safety-Car-Neustart nach aktuellen Regeln wieder überholt werden?",
    "a": [
      "Erst ab dem Überqueren der Start-Ziel-Linie durch das jeweilige Fahrzeug",
      "Sobald das Safety Car offiziell in die Boxengasseneinfahrt abgebogen ist",
      "Bereits ab der ersten Safety-Car-Linie am Ende der letzten Streckenkurve",
      "Erst nachdem der Führende in der ersten Kurve den Bremspunkt passiert hat"
    ],
    "explanation": "Bis zur Start-Ziel-Linie herrscht striktes Überholverbot; der Führende darf das Tempo bestimmen, sobald die Lichter des Safety Cars ausgehen.",
    "exp": "Bis zur Start-Ziel-Linie herrscht striktes Überholverbot; der Führende darf das Tempo bestimmen, sobald die Lichter des Safety Cars ausgehen."
  },
  {
    "cat": "f1_regeln",
    "diff": "pro",
    "q": "Was besagt die historische 107-Prozent-Regel im Formel-1-Qualifying?",
    "a": [
      "Qualifying-Zeit innerhalb von 107 Prozent der Q1-Bestzeit",
      "Das Gesamtgewicht des Wagens darf 107 Prozent des Mindestgewichts nicht überschreiten",
      "Der Heckflügel darf bei aktiviertem DRS maximal um 107 Millimeter geöffnet werden",
      "Die Renndistanz muss mindestens 107 Prozent der regulären Streckenlänge betragen"
    ],
    "explanation": "Die Regel wurde 1996 eingeführt, um hoffnungslos langsame und damit gefährliche Nachzügler-Teams von der Rennteilnahme auszuschließen.",
    "exp": "Die Regel wurde 1996 eingeführt, um hoffnungslos langsame und damit gefährliche Nachzügler-Teams von der Rennteilnahme auszuschließen."
  },
  {
    "cat": "f1_regeln",
    "diff": "pro",
    "q": "Welche Konsequenz hat das Zeigen der Schwarzen Flagge für einen Formel-1-Fahrer?",
    "a": [
      "Sofortige Disqualifikation und Boxenrückkehr binnen einer Runde",
      "Eine 10-Sekunden-Stop-and-Go-Strafe, die innerhalb von drei Runden abzusitzen ist",
      "Rückversetzung um zehn Startplätze beim darauffolgenden Grand-Prix-Wochenende",
      "Verlust aller im Qualifying herausgefahrenen Rundenzeiten wegen Regelverstoßes"
    ],
    "explanation": "Die Schwarze Flagge wird zusammen mit der Startnummer des Fahrers gezeigt und bedeutet das sofortige Rennende wegen grober Verstöße.",
    "exp": "Die Schwarze Flagge wird zusammen mit der Startnummer des Fahrers gezeigt und bedeutet das sofortige Rennende wegen grober Verstöße."
  },
  {
    "cat": "f1_teams",
    "diff": "easy",
    "q": "Welcher Rennstall ist das einzige Team, das seit 1950 an jeder einzelnen F1-Saison teilgenommen hat?",
    "a": [
      "Die Scuderia Ferrari",
      "Das Traditionsteam McLaren aus Woking",
      "Das traditionsreiche Williams-Team",
      "Das Mercedes-Werksteam der Silberpfeile"
    ],
    "explanation": "Ferrari ist der Mythos der Formel 1 schlechthin und hält alle historischen Rekorde für die meisten Rennstarts, Siege und Konstrukteurstitel.",
    "exp": "Ferrari ist der Mythos der Formel 1 schlechthin und hält alle historischen Rekorde für die meisten Rennstarts, Siege und Konstrukteurstitel."
  },
  {
    "cat": "f1_teams",
    "diff": "easy",
    "q": "Welche traditionelle Rennfarbe war Großbritannien bei den historischen Länderspielen zugeordnet?",
    "a": [
      "British Racing Green (Dunkelgrün)",
      "Rosso Corsa (feuriges Rot für italienische Sportwagen)",
      "Bleu de France (leuchtendes Mittelblau für Franzosen)",
      "Silbergrau (blankes Aluminium für deutsche Rennwagen)"
    ],
    "explanation": "Bis zur Einführung von Sponsorlackierungen Ende der 1960er-Jahre traten alle Teams in ihren traditionsreichen Nationalfarben an.",
    "exp": "Bis zur Einführung von Sponsorlackierungen Ende der 1960er-Jahre traten alle Teams in ihren traditionsreichen Nationalfarben an."
  },
  {
    "cat": "f1_teams",
    "diff": "easy",
    "q": "Aus welchem ehemaligen Formel-1-Team ging Ende 2004 das heutige Red Bull Racing hervor?",
    "a": [
      "Aus dem Werksteam Jaguar Racing (zuvor Stewart Grand Prix von Jackie Stewart)",
      "Aus dem Traditionsteam Benetton Formula des italienischen Modekonzerns",
      "Aus dem britischen Rennstall Tyrrell Racing des Holzgrosshändlers Ken Tyrrell",
      "Aus dem Schweizer Privatrennstall Sauber Motorsport aus Hinwil"
    ],
    "explanation": "Dietrich Mateschitz kaufte das kriselnde Jaguar-Team für einen symbolischen Dollar und formte daraus unter Christian Horner ein Weltmeister-Team.",
    "exp": "Dietrich Mateschitz kaufte das kriselnde Jaguar-Team für einen symbolischen Dollar und formte daraus unter Christian Horner ein Weltmeister-Team."
  },
  {
    "cat": "f1_teams",
    "diff": "easy",
    "q": "Welcher Kult-Funkspruch von Kimi Räikkönen in Abu Dhabi 2012 wurde weltberühmt?",
    "a": [
      "„Leave me alone, I know what to do!“ an seinen besorgten Renningenieur",
      "„No, Mikey, no, that was so not right!“ an den damaligen FIA-Renndirektor",
      "„GP2 engine, GP2, aagh!“ über die mangelnde Motorleistung seines Boliden",
      "„Multi 21, Seb, Multi 21!“ nach einem missachteten Teamorder-Überholmanöver"
    ],
    "explanation": "Räikkönen gewann das Rennen für Lotus und ließ kurz darauf 500 T-Shirts mit dem berühmten Zitat für die gesamte Boxenmannschaft drucken.",
    "exp": "Räikkönen gewann das Rennen für Lotus und ließ kurz darauf 500 T-Shirts mit dem berühmten Zitat für die gesamte Boxenmannschaft drucken."
  },
  {
    "cat": "f1_teams",
    "diff": "mid",
    "q": "Warum gingen beim Großen Preis der USA in Indianapolis 2005 nur sechs Autos an den Start?",
    "a": [
      "Alle 14 Michelin-Teams bogen wegen gefährlicher Reifenschäden nach der Aufwärmrunde ab",
      "Ein plötzlicher Streik der Fahrervereinigung GPDA legte das halbe Starterfeld lahm",
      "Ein riesiger Massencrash in der ersten Kurve zerstörte 14 Fahrzeuge irreparabel",
      "Der Zoll beschlagnahmte wegen fehlender Papiere die Motoren mehrerer europäischer Teams"
    ],
    "explanation": "Die Steilkurve in Indianapolis riss die Reifen von Michelin auf. Nur die Bridgestone-Teams Ferrari, Jordan und Minardi fuhren das bizarre Geisterrennen.",
    "exp": "Die Steilkurve in Indianapolis riss die Reifen von Michelin auf. Nur die Bridgestone-Teams Ferrari, Jordan und Minardi fuhren das bizarre Geisterrennen."
  },
  {
    "cat": "f1_teams",
    "diff": "mid",
    "q": "Welche Legende rankt sich um die Entstehung der Mercedes-„Silberpfeile“ im Jahr 1934 am Nürburgring?",
    "a": [
      "Neubauer ließ nachts die weiße Farbe abkratzen (750-kg-Limit)",
      "Die Autos wurden aus glänzendem Flugzeug-Aluminium gebaut, um Lackiergewicht zu sparen",
      "Ein Gewitterschauer wusch den frisch aufgetragenen Lack während der Anreise komplett ab",
      "Die silberne Farbe war eine Hommage an die glänzenden Zeppeline der damaligen Epoche"
    ],
    "explanation": "Angeblich wog der Mercedes W25 genau ein Kilo zu viel – durch das Abkratzen des weißen Bleiweiß-Lacks schimmerte das blanke Aluminium silbern.",
    "exp": "Angeblich wog der Mercedes W25 genau ein Kilo zu viel – durch das Abkratzen des weißen Bleiweiß-Lacks schimmerte das blanke Aluminium silbern."
  },
  {
    "cat": "f1_teams",
    "diff": "mid",
    "q": "Welche bizarre Panne kostete Eddie Irvine beim GP von Europa 1999 am Nürburgring wertvolle WM-Punkte?",
    "a": [
      "Mechaniker hatten den rechten Hinterreifen in der Garage verlegt",
      "Die Crew betankte das Auto versehentlich mit Dieselkraftstoff aus dem Lkw",
      "Der Tankschlauch klemmte fest und riss beim Losfahren die halbe Boxenmauer mit",
      "Der Wagenheber brach ab und das Auto lag 40 Sekunden auf der Bodenplatte"
    ],
    "explanation": "Irvine stand 48 Sekunden lang ratlos aufgebockt, während Mechaniker hektisch durch die Boxengasse rannten, um das vierte Rad zu suchen.",
    "exp": "Irvine stand 48 Sekunden lang ratlos aufgebockt, während Mechaniker hektisch durch die Boxengasse rannten, um das vierte Rad zu suchen."
  },
  {
    "cat": "f1_teams",
    "diff": "mid",
    "q": "Was machte das Team Lotus unter Colin Chapman in den 1960er- und 70er-Jahren so revolutionär?",
    "a": [
      "Alu-Monocoque, Ground-Effect und Sponsorenlackierung",
      "Die Erfindung des ersten vollelektronischen Antiblockiersystems für Rennwagen",
      "Die Einführung von permanentem Allradantrieb bei allen Grand-Prix-Rennen",
      "Die erstmalige Verwendung von Funkgeräten zwischen Box und Fahrer während der Fahrt"
    ],
    "explanation": "Chapmans Motto lautete: „Simplify, then add lightness.“ Lotus revolutionierte den Leichtbau, bezahlte das riskante Streben nach Leichtigkeit aber oft mit fatalen Defekten.",
    "exp": "Chapmans Motto lautete: „Simplify, then add lightness.“ Lotus revolutionierte den Leichtbau, bezahlte das riskante Streben nach Leichtigkeit aber oft mit fatalen Defekten."
  },
  {
    "cat": "f1_teams",
    "diff": "mid",
    "q": "Welcher kuriose Vorfall passierte Mercedes beim Doppelstopp von George Russell in Sachir 2020?",
    "a": [
      "Die Crew montierte versehentlich die Vorderreifen seines Teamkollegen Valtteri Bottas",
      "Beide Schlagschrauber fielen zeitgleich durch einen Stromausfall in der Boxengasse aus",
      "Russell fuhr los, während der vordere Wagenheber noch unter der Nase festhing",
      "Der Funk war gestört und Russell bog ab, obwohl die Reifen noch gar nicht bereitstanden"
    ],
    "explanation": "Ein Funkchaos führte zum Reifensalat: Russell musste eine Runde später erneut stoppen, um die falschen Reifen abzugeben, und verlor seinen Traumsieg.",
    "exp": "Ein Funkchaos führte zum Reifensalat: Russell musste eine Runde später erneut stoppen, um die falschen Reifen abzugeben, und verlor seinen Traumsieg."
  },
  {
    "cat": "f1_teams",
    "diff": "pro",
    "q": "Welches historische Kunststück gelang Jack Brabham in der Formel-1-Saison 1966 als einzigem Fahrer?",
    "a": [
      "Er wurde in einem selbst konstruierten und gebauten Rennwagen Weltmeister",
      "Er gewann alle Saisonrennen von der Pole Position aus mit Start-Ziel-Siegen",
      "Er erzielte den WM-Titel ohne einen einzigen Ausfall oder Motorenwechsel",
      "Er holte die Weltmeisterschaft, obwohl er die ersten drei Saisonläufe verpasste"
    ],
    "explanation": "Sir Jack Brabham gewann 1966 auf seinem Brabham BT19 mit Repco-V8-Motor – ein bis heute absolut unerreichter Meilenstein im Motorsport.",
    "exp": "Sir Jack Brabham gewann 1966 auf seinem Brabham BT19 mit Repco-V8-Motor – ein bis heute absolut unerreichter Meilenstein im Motorsport."
  },
  {
    "cat": "f1_teams",
    "diff": "pro",
    "q": "Welcher deutsche Pilot startete beim GP Deutschland 1977 illegal, schied aus und wurde disqualifiziert?",
    "a": [
      "Hans Heyer, der trotz verpasster Qualifikation einfach aus der Boxengasse losfuhr",
      "Jochen Mass, dessen Starterlaubnis wegen eines Protests kurzfristig widerrufen wurde",
      "Rolf Stommelen, der nach einem Trainingsunfall ohne medizinisches Attest antrat",
      "Manfred Winkelhock, dessen Rennwagen nicht den technischen Mindestmaßen entsprach"
    ],
    "explanation": "Heyer schlich sich auf die Strecke, rollte nach 9 Runden mit Getriebeschaden aus und kassierte den Eintrag: Nicht qualifiziert, ausgefallen und disqualifiziert!",
    "exp": "Heyer schlich sich auf die Strecke, rollte nach 9 Runden mit Getriebeschaden aus und kassierte den Eintrag: Nicht qualifiziert, ausgefallen und disqualifiziert!"
  },
  {
    "cat": "f1_teams",
    "diff": "pro",
    "q": "Welche persönliche Tragödie bewegte Jackie Stewart dazu, seine Karriere 1973 vor seinem 100. GP zu beenden?",
    "a": [
      "Tödlicher Unfall seines Teamkollegen Francois Cevert",
      "Eine schwere Handgelenksverletzung nach einem Trainingscrash in Watkins Glen",
      "Der plötzliche Herztod seines langjährigen Teamchefs und Mentors Ken Tyrrell",
      "Der Brand seines Elternhauses in Schottland kurz vor dem Saisonabschlussrennen"
    ],
    "explanation": "Cevert verunglückte im Training von Watkins Glen tödlich. Stewart, der bereits als Weltmeister feststand, verzichtete auf sein Jubiläumsrennen und trat sofort zurück.",
    "exp": "Cevert verunglückte im Training von Watkins Glen tödlich. Stewart, der bereits als Weltmeister feststand, verzichtete auf sein Jubiläumsrennen und trat sofort zurück."
  },
  {
    "cat": "f1_teams",
    "diff": "pro",
    "q": "Welcher Sponsor brachte 1968 auf dem Lotus 49B erstmals kommerzielle Tabakwerbung in die Formel 1?",
    "a": [
      "Gold Leaf mit rot-weiß-goldener Lackierung",
      "Marlboro mit den weltberühmten rot-weißen Winkeln auf Flügeln und Cockpit",
      "John Player Special mit dem legendären schwarz-goldenen Design von Colin Chapman",
      "Gitanes mit der ikonischen tanzenden Zigeunerin auf den blauen Seitenkästen"
    ],
    "explanation": "Colin Chapman brach mit der Tradition nationaler Farben und lackierte den Lotus in den Farben der Zigarettenmarke Gold Leaf – Beginn des modernen F1-Sponsorings.",
    "exp": "Colin Chapman brach mit der Tradition nationaler Farben und lackierte den Lotus in den Farben der Zigarettenmarke Gold Leaf – Beginn des modernen F1-Sponsorings."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("f1", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["f1"] = DATA;
  }
})();
