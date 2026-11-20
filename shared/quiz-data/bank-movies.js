// Unified quiz bank for "movies" (75 questions: Kino & Film)
(function () {
  const DATA = [
  {
    "cat": "action_scifi",
    "diff": "easy",
    "q": "Welcher Regisseur inszenierte 1993 den Dino-Klassiker 'Jurassic Park' und setzte damit Meilensteine bei CGI und Animatronics?",
    "a": [
      "Steven Spielberg",
      "James Cameron",
      "Ridley Scott",
      "Robert Zemeckis"
    ],
    "explanation": "Industrial Light & Magic (ILM) kreierte die bahnbrechenden digitalen Dinos, während Stan Winstons Team riesige lebensgroße Robotersaurier baute.",
    "exp": "Industrial Light & Magic (ILM) kreierte die bahnbrechenden digitalen Dinos, während Stan Winstons Team riesige lebensgroße Robotersaurier baute."
  },
  {
    "cat": "action_scifi",
    "diff": "easy",
    "q": "In welcher Farbe ist die Pille gehalten, die der Hacker Neo in 'Matrix' (1999) schluckt, um die grausame Realität zu erfahren?",
    "a": [
      "Rot",
      "Blau",
      "Grün",
      "Silbern"
    ],
    "explanation": "Morpheus bot Neo die Wahl: Die blaue Pille führt zurück in die Illusion, die rote Pille enthüllt die Wahrheit über die Maschinenwelt.",
    "exp": "Morpheus bot Neo die Wahl: Die blaue Pille führt zurück in die Illusion, die rote Pille enthüllt die Wahrheit über die Maschinenwelt."
  },
  {
    "cat": "action_scifi",
    "diff": "easy",
    "q": "Welcher deutsche Filmkomponist schuf die legendären Soundtracks zu 'Gladiator', 'Inception', 'Interstellar' und 'Dune'?",
    "a": [
      "Hans Zimmer",
      "John Williams",
      "Howard Shore",
      "Klaus Badelt"
    ],
    "explanation": "Hans Zimmer revolutionierte die moderne Filmmusik durch mächtige Synthesizer-Klangwände, tickende Rhythmen und dramatische Orchesterwellen.",
    "exp": "Hans Zimmer revolutionierte die moderne Filmmusik durch mächtige Synthesizer-Klangwände, tickende Rhythmen und dramatische Orchesterwellen."
  },
  {
    "cat": "action_scifi",
    "diff": "easy",
    "q": "Aus welchem Alltagsgegenstand erzeugte Sound-Designer Ben Burtt das unverkennbare Summen der Lichtschwerter in 'Star Wars'?",
    "a": [
      "Aus dem Brummton alter Röhrenprojektoren und der Rückkopplung einer Fernseh-Bildröhre",
      "Aus dem Zirpen von kalifornischen Grillen im Mischpult",
      "Aus dem Schleifen von Küchenmessern an einer Metallspüle",
      "Aus dem Leerlauf eines defekten Kühlschrankkompressors"
    ],
    "explanation": "Burtt mischte das tiefe Summen zweier Filmprojektoren mit dem hochfrequenten Pfeifen eines alten Fernsehers, an dem er ein Mikrofon vorbeischwenkte.",
    "exp": "Burtt mischte das tiefe Summen zweier Filmprojektoren mit dem hochfrequenten Pfeifen eines alten Fernsehers, an dem er ein Mikrofon vorbeischwenkte."
  },
  {
    "cat": "action_scifi",
    "diff": "easy",
    "q": "Welcher Arnold-Schwarzenegger-Klassiker von 1991 begründete durch den flüssigen T-1000 den Durchbruch computergenerierter Morphing-Effekte?",
    "a": [
      "Terminator 2: Tag der Abrechnung",
      "Total Recall – Die totale Erinnerung",
      "Predator",
      "Last Action Hero"
    ],
    "explanation": "James Cameron und ILM schufen den Quecksilber-Killer T-1000, der selbst durch Gitterstäbe fließen und seine Gestalt beliebig verändern konnte.",
    "exp": "James Cameron und ILM schufen den Quecksilber-Killer T-1000, der selbst durch Gitterstäbe fließen und seine Gestalt beliebig verändern konnte."
  },
  {
    "cat": "action_scifi",
    "diff": "mid",
    "q": "Warum verzichtete Christopher Nolan bei den monumentalen Aufnahmen von 'Oppenheimer' (2023) komplett auf CGI-Effekte?",
    "a": [
      "Er wollte den Atombombentest mit realen Explosionen, Schwarzpulver, Magnesium und Spezialbrennstoffen filmen",
      "Weil die US-Zensurbehörde jegliche digitale Darstellung von Atomwaffen verbot",
      "Weil kein Computereffekt auf das 70-mm-IMAX-Filmformat hochskaliert werden konnte",
      "Aus reinem Zeitmangel, da die Spezialeffekt-Studios im Streik waren"
    ],
    "explanation": "Nolan ließ für die Trinity-Explosion ein Gemisch aus Flugbenzin, Diesel, Magnesium und Phosphor am Boden zünden, um greifbare Lichteffekte einzufangen.",
    "exp": "Nolan ließ für die Trinity-Explosion ein Gemisch aus Flugbenzin, Diesel, Magnesium und Phosphor am Boden zünden, um greifbare Lichteffekte einzufangen."
  },
  {
    "cat": "action_scifi",
    "diff": "mid",
    "q": "Welche ikonische Requisite aus 'Mad Max: Fury Road' (2015) funktionierte tatsächlich in echt während der Wüstenfahrt?",
    "a": [
      "Die E-Gitarre des 'Doof Warrior', die auf Knopfdruck meterhohe Flammen spuckte",
      "Ein funktionierender Nuklearreaktor auf dem Dach des War Rigs",
      "Die bionische Roboterhand von Imperator Furiosa mit Laserpointer",
      "Ein echtes Kettenfahrzeug mit Flugzeugtriebwerk auf dem Verdeck"
    ],
    "explanation": "Musiker iOTA spielte auf einer 60 Kilo schweren Doppelhals-Gitarre, deren Flammenwerfer per Whammy-Bar-Hebel echtes Gas abfeuerte.",
    "exp": "Musiker iOTA spielte auf einer 60 Kilo schweren Doppelhals-Gitarre, deren Flammenwerfer per Whammy-Bar-Hebel echtes Gas abfeuerte."
  },
  {
    "cat": "action_scifi",
    "diff": "mid",
    "q": "Mit welcher bahnbrechenden Kameratechnik filmte Wachowskis Team die legendäre 'Bullet Time' in 'Matrix'?",
    "a": [
      "Mit einem kreisförmigen Ring aus 120 Standbildkameras, die im Millisekundentakt nacheinander auslösten",
      "Mit einer einzelnen Hochgeschwindigkeitskamera auf einer Raketenschlitten-Schiene",
      "Rein digital durch nachträgliche 3D-Klonung von Keanu Reeves am Computer",
      "Durch extremes Verlangsamen der analogen Filmspule in einer Handkamera"
    ],
    "explanation": "Über 120 Fotoapparate fotografierten Neo aus allen Blickwinkeln gleichzeitig. Zusammengesetzt ergab das eine flüssige 360-Grad-Kameradrehung in gefrorener Zeit.",
    "exp": "Über 120 Fotoapparate fotografierten Neo aus allen Blickwinkeln gleichzeitig. Zusammengesetzt ergab das eine flüssige 360-Grad-Kameradrehung in gefrorener Zeit."
  },
  {
    "cat": "action_scifi",
    "diff": "mid",
    "q": "Welches ungewöhnliche Requisit diente Ridley Scott in 'Alien' (1979) zur Konstruktion der schleimigen Xenomorph-Eier?",
    "a": [
      "Tierische Innereien, Rinderherzen und Kuhmägen aus einem Schlachthof",
      "Geformter Bauschaum mit grünem Limettengelee",
      "Aufgeblasene Luftballons mit gefärbtem Tapetenkleister",
      "Schlangenhäute mit warmer Kondensmilch"
    ],
    "explanation": "Für das unheimliche Pulsieren im Inneren der Eier bewegte Scott echte Kalbsherzen und Tiereingeweide unter einer Schicht Kunstschleim.",
    "exp": "Für das unheimliche Pulsieren im Inneren der Eier bewegte Scott echte Kalbsherzen und Tiereingeweide unter einer Schicht Kunstschleim."
  },
  {
    "cat": "action_scifi",
    "diff": "mid",
    "q": "Welche reale wissenschaftliche Entdeckung inspirierte Christopher Nolan und Physiker Kip Thorne bei der Darstellung des Schwarzen Lochs 'Gargantua' in 'Interstellar'?",
    "a": [
      "Die gravitative Lichtkrümmung und Akkretionsscheiben-Verzerrung durch Einsteins Allgemeine Relativitätstheorie",
      "Die angebliche Zeitreise-Eigenschaft von Neutronensternen im Orion-Nebel",
      "Die Entdeckung von flüssigem Wasser auf der Oberfläche von Kometen",
      "Die Radiointerferenz-Signale aus dem Zentrum unserer Milchstraße"
    ],
    "explanation": "Thornes physikalische Gleichungen wurden von CGI-Rechnern gerendert. Das berechnete Bild sagte das reale Teleskop-Foto von M87 von 2019 verblüffend exakt voraus.",
    "exp": "Thornes physikalische Gleichungen wurden von CGI-Rechnern gerendert. Das berechnete Bild sagte das reale Teleskop-Foto von M87 von 2019 verblüffend exakt voraus."
  },
  {
    "cat": "action_scifi",
    "diff": "mid",
    "q": "Wie drehte Christopher Nolan die berühmte Schwerelosigkeits-Flur-Kampfszene in 'Inception' (2010)?",
    "a": [
      "In einem 30 Meter langen, rotierenden Zentrifugen-Tunnel, der Schauspieler und Kamera um 360 Grad drehte",
      "In einem echten Parabelflug-Flugzeug der NASA bei freiem Fall",
      "Vollständig vor einem Green-Screen mit digital ersetzten Körpern",
      "Durch Aufhängen des gesamten Filmsets an einem riesigen Hafenkran"
    ],
    "explanation": "Der Flur war eine gigantische rotierende Trommel. Joseph Gordon-Levitt trainierte wochenlang, um im drehenden Raum akrobatisch zu kämpfen.",
    "exp": "Der Flur war eine gigantische rotierende Trommel. Joseph Gordon-Levitt trainierte wochenlang, um im drehenden Raum akrobatisch zu kämpfen."
  },
  {
    "cat": "action_scifi",
    "diff": "mid",
    "q": "Aus welchem Grund leuchtet das Blut des außerirdischen Jägers in 'Predator' (1987) neongrün?",
    "a": [
      "Die Crew mischte die fluoreszierende Flüssigkeit aus Knicklichtern mit Gleitmittel",
      "Es wurde im Computer nachträglich mit grünem Laserlicht übermalt",
      "Man verwendete echte radioaktiv gefärbte Leuchtfarbe aus Uhrenzeigern",
      "Es handelte sich um flüssigen Wasabi-Kren mit Apfelsaft"
    ],
    "explanation": "Um das Leuchten im finsteren Dschungel ohne CGI sichtbar zu machen, knackten die Requisiteure Leuchtstäbe (Glowsticks) und rührten K-Y-Jelly unter.",
    "exp": "Um das Leuchten im finsteren Dschungel ohne CGI sichtbar zu machen, knackten die Requisiteure Leuchtstäbe (Glowsticks) und rührten K-Y-Jelly unter."
  },
  {
    "cat": "action_scifi",
    "diff": "pro",
    "q": "Warum explodierte der Todesstern in George Lucas' 'Star Wars' (1977) mit einer markanten Schockwellen-Ringscheibe bei der Special Edition 1997?",
    "a": [
      "Als Hommage an die 'Praxis-Schockwelle' aus 'Star Trek VI: Das unentdeckte Land' von 1991",
      "Weil Albert Einstein bewiesen hatte, dass Antimaterie in Scheiben detoniert",
      "Um das dahinterliegende Filmset vor Lichtreflexen zu verbergen",
      "Weil der Computer beim Rendern versehentlich einen horizontalen Grafikfehler erzeugte"
    ],
    "explanation": "Die sogenannte Praxis-Welle aus Star Trek VI gefiel Lucas so sehr, dass er seine eigenen Supernova-Explosionen digital mit demselben Ring nachrüstete.",
    "exp": "Die sogenannte Praxis-Welle aus Star Trek VI gefiel Lucas so sehr, dass er seine eigenen Supernova-Explosionen digital mit demselben Ring nachrüstete."
  },
  {
    "cat": "action_scifi",
    "diff": "pro",
    "q": "Was diente in James Camerons 'Aliens' (1986) als Geräusch für den Abzug der berüchtigten M41A-Pulsladungsgewehre?",
    "a": [
      "Eine Thompson-Maschinenpistole kombiniert mit einem gezielten Schrotflintenschuss",
      "Das Schlagen einer schweren Tresortür mit elektronischem Nachhall",
      "Das Zischen eines Presslufthammers im Tonstudio",
      "Eine modifizierte Aufnahme von prasselndem Popcorn in einer Pfanne"
    ],
    "explanation": "Die Sounddesigner schichteten das rhythmische Rattern einer Tommy Gun mit dem wuchtigen Bass einer Remington-Pumpgun übereinander.",
    "exp": "Die Sounddesigner schichteten das rhythmische Rattern einer Tommy Gun mit dem wuchtigen Bass einer Remington-Pumpgun übereinander."
  },
  {
    "cat": "action_scifi",
    "diff": "pro",
    "q": "Wie erzeugte Stanley Kubrick 1968 in '2001: Odyssee im Weltraum' die fließenden kosmischen Schlitzscan-Farben beim Flug durch das Sternentor?",
    "a": [
      "Douglas Trumbull bewegte eine Langzeitbelichtungs-Kamera mechanisch vor einem winzigen beleuchteten Spalt (Slit-Scan)",
      "Durch Tropfen von Farbölen auf heiße Glasplatten unter einem Projektor",
      "Durch direktes Ritzen und Bemalen des 70-mm-Filmstreifens mit Nadeln",
      "Mit dem weltweit ersten elektronischen Computergrafik-Röhrenrechner"
    ],
    "explanation": "Die Slit-Scan-Maschine belichtete jedes Einzelbild über Minuten hinweg mit bewegten Grafiken und erzeugte den psychedelischen Hyperraum-Tunnel.",
    "exp": "Die Slit-Scan-Maschine belichtete jedes Einzelbild über Minuten hinweg mit bewegten Grafiken und erzeugte den psychedelischen Hyperraum-Tunnel."
  },
  {
    "cat": "action_scifi",
    "diff": "pro",
    "q": "Welches reale Flugzeugwrack ließ Christopher Nolan für eine Actionszene in 'Tenet' (2020) tatsächlich in ein Gebäude krachen?",
    "a": [
      "Eine ausgemusterte Boeing 747 auf dem Flughafen von Victorville",
      "Einen echten Airbus A380 im Hangar von Toulouse",
      "Eine russische Antonow An-225 auf einem Flugplatz in Estland",
      "Eine McDonnell Douglas DC-10 vor einer echten Fabrikhalle"
    ],
    "explanation": "Nolan stellte fest, dass der Kauf und das reale Crashen einer alten 747 billiger und realistischer waren als teure CGI-Modelle im Computer.",
    "exp": "Nolan stellte fest, dass der Kauf und das reale Crashen einer alten 747 billiger und realistischer waren als teure CGI-Modelle im Computer."
  },
  {
    "cat": "action_scifi",
    "diff": "pro",
    "q": "Woraus bestand der Sound der gigantischen Sandwürmer ('Shai-Hulud') in Denis Villeneuves 'Dune' (2021)?",
    "a": [
      "Aus unterirdischen Hydrofon-Aufnahmen von vibrierendem Wüstensand und trockenem Gebälk",
      "Aus verlangsamtem Röhren von afrikanischen Elefantenbullen",
      "Aus den Abgasströmen von startenden Falcon-9-Raketen",
      "Aus digitalen Synthesizer-Bässen ohne jedes Naturgeräusch"
    ],
    "explanation": "Sounddesigner Mark Mangini vergrub Spezialmikrofone im Sand der Mojave-Wüste und nahm das dumpfe Reiben tektonischer Sandbewegungen auf.",
    "exp": "Sounddesigner Mark Mangini vergrub Spezialmikrofone im Sand der Mojave-Wüste und nahm das dumpfe Reiben tektonischer Sandbewegungen auf."
  },
  {
    "cat": "action_scifi",
    "diff": "pro",
    "q": "Welches Design-Detail an Deckard's Pistole in Ridley Scotts 'Blade Runner' (1982) verblüfft Waffen- und Filmexperten bis heute?",
    "a": [
      "Sie wurde aus Teilen eines Steyr-Mannlicher-.222-Jagdgewehrs und eines Charter-Arms-.44-Revolvers zusammengebaut",
      "Sie verschoss tatsächlich echte Laserimpulse auf die Requisitenwand",
      "Sie stammte vollständig aus einem 1950er-Jahre-Toaster",
      "Sie war eine exakte Replik einer Wehrmachts-Luger mit roter Glühbirne"
    ],
    "explanation": "Der legendäre 'PKD-Blaster' besaß zwei Abzüge und ein doppeltes Schloss, kombiniert aus einem echten Gewehr und einem Revolverrumpf.",
    "exp": "Der legendäre 'PKD-Blaster' besaß zwei Abzüge und ein doppeltes Schloss, kombiniert aus einem echten Gewehr und einem Revolverrumpf."
  },
  {
    "cat": "action_scifi",
    "diff": "pro",
    "q": "Warum dauerte das Rendern eines einzigen Frames für die Wasser-Pseudopod-Szene in James Camerons 'Abyss' (1989) bis zu mehreren Stunden?",
    "a": [
      "Weil Raytracing für Lichtbrechung und Kaustik auf damaligen SGI-Workstations Neuland war",
      "Weil der Film auf Disketten mit nur 1,44 MB Speicherplatz gerechnet wurde",
      "Weil der Computer nach jedem gerenderten Pixel manuell neu gestartet werden musste",
      "Weil Cameron darauf bestand, den Sauerstoffgehalt des Wassers zu simulieren"
    ],
    "explanation": "ILM musste für den flüssigen Tentakel völlig neue Algorithmen schreiben; die Szene ebnete den Weg für den T-1000 in Terminator 2.",
    "exp": "ILM musste für den flüssigen Tentakel völlig neue Algorithmen schreiben; die Szene ebnete den Weg für den T-1000 in Terminator 2."
  },
  {
    "cat": "thriller_horror",
    "diff": "easy",
    "q": "Welcher Psycho-Thriller von Alfred Hitchcock schrieb 1960 mit der berüchtigten Duschszene und schrillen Geigen Filmgeschichte?",
    "a": [
      "Psycho",
      "Die Vögel",
      "Das Fenster zum Hof",
      "Vertigo – Aus dem Reich der Toten"
    ],
    "explanation": "Bernard Herrmanns kreischende Streichinstrumente machten den Duschmord an Marion Crane zu einer der berühmtesten Szenen aller Zeiten.",
    "exp": "Bernard Herrmanns kreischende Streichinstrumente machten den Duschmord an Marion Crane zu einer der berühmtesten Szenen aller Zeiten."
  },
  {
    "cat": "thriller_horror",
    "diff": "easy",
    "q": "Welche ikonische Gerichtsmedizinerin und FBI-Anwärterin befragt in 'Das Schweigen der Lämmer' (1991) den kannibalischen Dr. Hannibal Lecter?",
    "a": [
      "Clarice Starling (gespielt von Jodie Foster)",
      "Dana Scully (gespielt von Gillian Anderson)",
      "Catherine Tramell (gespielt von Sharon Stone)",
      "Sarah Connor (gespielt von Linda Hamilton)"
    ],
    "explanation": "Jodie Foster und Anthony Hopkins lieferten sich ein nervenzerreißendes Psychoduell; der Film gewann alle fünf Haupt-Oscars (Big Five).",
    "exp": "Jodie Foster und Anthony Hopkins lieferten sich ein nervenzerreißendes Psychoduell; der Film gewann alle fünf Haupt-Oscars (Big Five)."
  },
  {
    "cat": "thriller_horror",
    "diff": "easy",
    "q": "Welche berüchtigte Zeile brüllt Jack Nicholson in Stanley Kubricks Horrormeisterwerk 'Shining' (1980) durch das Loch in der Badezimmertür?",
    "a": [
      "'Hier ist Jacky!' ('Here's Johnny!')",
      "'Komm heraus, Liebling!'",
      "'Wer klopft an meine Tür?'",
      "'Ich habe euch vermisst!'"
    ],
    "explanation": "Nicholson improvisierte die Begrüßungsfloskel aus Johnny Carsons US-Late-Night-Show, während er die Tür mit einer echten Axt zertrümmerte.",
    "exp": "Nicholson improvisierte die Begrüßungsfloskel aus Johnny Carsons US-Late-Night-Show, während er die Tür mit einer echten Axt zertrümmerte."
  },
  {
    "cat": "thriller_horror",
    "diff": "easy",
    "q": "Was befindet sich am Ende von David Finchers düsterem Thriller 'Sieben' (1995) in dem mysteriösen Paket in der Wüste?",
    "a": [
      "Der Kopf von Detektiv Mills' schwangerer Ehefrau Tracy",
      "Ein Tonband mit den Geständnissen aller Morde",
      "Eine goldene Nachbildung der Zehn Gebote",
      "Ein Haufen Geld als Schweigegeld für die Polizisten"
    ],
    "explanation": "Serienmörder John Doe vollendet damit die Todsünde des Zorns, indem er Mills (Brad Pitt) provoziert, ihn aus Rache zu erschießen.",
    "exp": "Serienmörder John Doe vollendet damit die Todsünde des Zorns, indem er Mills (Brad Pitt) provoziert, ihn aus Rache zu erschießen."
  },
  {
    "cat": "thriller_horror",
    "diff": "easy",
    "q": "Welcher maskierte Mörder terrorisiert Jugendliche im Horror-Klassiker 'Halloween' (1978) von John Carpenter?",
    "a": [
      "Michael Myers",
      "Jason Voorhees",
      "Freddy Krueger",
      "Leatherface"
    ],
    "explanation": "Die weiße Maske von Michael Myers war in Wirklichkeit eine billige Zwei-Dollar-Gummi-Maske von Captain Kirk (William Shatner) aus Star Trek.",
    "exp": "Die weiße Maske von Michael Myers war in Wirklichkeit eine billige Zwei-Dollar-Gummi-Maske von Captain Kirk (William Shatner) aus Star Trek."
  },
  {
    "cat": "thriller_horror",
    "diff": "mid",
    "q": "Welches Filmblut verwendete Alfred Hitchcock für die Duschszene in 'Psycho', weil es auf Schwarzweißfilm echter wirkte als Kunstblut?",
    "a": [
      "Bosco-Schokoladensirup",
      "Eingekochte Johannisbeermarmelade",
      "Dunkle Rinderbouillon",
      "Rotes Tomatenketchup"
    ],
    "explanation": "Schokoladensirup hatte auf damaligem Schwarzweiß-Filmmaterial genau die richtige Dichte, Viskosität und dunkle Tönung für Blut.",
    "exp": "Schokoladensirup hatte auf damaligem Schwarzweiß-Filmmaterial genau die richtige Dichte, Viskosität und dunkle Tönung für Blut."
  },
  {
    "cat": "thriller_horror",
    "diff": "mid",
    "q": "Wie erzeugte William Friedkin in 'Der Exorzist' (1973) den echten Atemhauch der Darsteller im Schlafzimmer des besessenen Mädchens?",
    "a": [
      "Das Schlafzimmer-Set wurde mit Industrie-Kühlanlagen auf minus 5 Grad Celsius heruntergekühlt",
      "Die Schauspieler rauchten direkt vor dem Take Trockeneisdämpfe ein",
      "Der Atem wurde im Zeichentrick-Verfahren Bild für Bild eingemalt",
      "Mit feinst zerstäubtem Mehlstaub aus Düsen an der Decke"
    ],
    "explanation": "Es war am Set so eisig kalt, dass sich morgens eine dünne Eisschicht auf den Möbeln bildete – der Atem der Schauspieler war absolut echt.",
    "exp": "Es war am Set so eisig kalt, dass sich morgens eine dünne Eisschicht auf den Möbeln bildete – der Atem der Schauspieler war absolut echt."
  },
  {
    "cat": "thriller_horror",
    "diff": "mid",
    "q": "Warum blinzelt Anthony Hopkins in 'Das Schweigen der Lämmer' (1991) während seiner Szenen als Hannibal Lecter fast nie?",
    "a": [
      "Er wollte Lecters reptilische, unerbittliche Wachsamkeit und Dominanz über Clarice unterstreichen",
      "Weil er am Set spezielle harte Kontaktlinsen trug, die das Blinzeln schmerzhaft machten",
      "Weil Kubrick ihm diesen Ratschlag in einem Telefonat gegeben hatte",
      "Um zu signalisieren, dass Lecter in Trance hypnotisiert war"
    ],
    "explanation": "Hopkins studierte Videoaufnahmen von Mördern wie Charles Manson und übernahm deren starren Blick ohne Wimpernschlag für die Kamera.",
    "exp": "Hopkins studierte Videoaufnahmen von Mördern wie Charles Manson und übernahm deren starren Blick ohne Wimpernschlag für die Kamera."
  },
  {
    "cat": "thriller_horror",
    "diff": "mid",
    "q": "Was macht das Low-Budget-Meisterwerk 'Blair Witch Project' (1999) zu einem Meilenstein des modernen Horrorkinos?",
    "a": [
      "Es begründete den weltweiten Hype um das 'Found Footage'-Genre und virales Internet-Marketing",
      "Es war der erste Horrorfilm, der vollständig in 3D-Brillentechnik gedreht wurde",
      "Es zeigte das Monster 90 Minuten lang ununterbrochen in Nahaufnahme",
      "Es wurde mit einem 100-Millionen-Dollar-Budget von Disney finanziert"
    ],
    "explanation": "Mit minimalem Budget (rund 60.000 Dollar) gedreht, suggerierte eine Fake-Website, dass die Studenten im Wald tatsächlich verschwunden seien.",
    "exp": "Mit minimalem Budget (rund 60.000 Dollar) gedreht, suggerierte eine Fake-Website, dass die Studenten im Wald tatsächlich verschwunden seien."
  },
  {
    "cat": "thriller_horror",
    "diff": "mid",
    "q": "Welches Geräusch diente Sound-Designer Ben Burtt in 'Alien' und vielen Thrillern als Vorlage für fleischige Stiche und Messerangriffe?",
    "a": [
      "Das Hineinstechen eines Messers in eine reife Honigmelone oder einen Kohlkopf",
      "Das Zerquetschen von nassen Schwämmen in einer Schüssel",
      "Das Zerschlagen von gefrorenem Rindfleisch mit einem Baseballschläger",
      "Das Abreißen von Klettverschlüssen unter Wasser"
    ],
    "explanation": "Melonen, rohe Steaks und knackige Kohlköpfe gehören im Tonstudio zu den beliebtesten Requisiten für schmatzende Einstiche.",
    "exp": "Melonen, rohe Steaks und knackige Kohlköpfe gehören im Tonstudio zu den beliebtesten Requisiten für schmatzende Einstiche."
  },
  {
    "cat": "thriller_horror",
    "diff": "mid",
    "q": "Was ist der berühmte Twist am Ende von M. Night Shyamalans Psychothriller 'The Sixth Sense' (1999)?",
    "a": [
      "Kinderpsychologe Dr. Malcolm Crowe (Bruce Willis) ist selbst die ganze Zeit über ein Geist",
      "Der kleine Cole bildet sich alle Toten nur unter Drogenwirkung ein",
      "Die Mutter des Jungen hat ihren Sohn vergiftet",
      "Der Psychologe ist in Wirklichkeit der gesuchte Serienmörder"
    ],
    "explanation": "Malcolm wurde zu Filmbeginn erschossen; nur der kleine Junge ('Ich sehe tote Menschen') konnte ihn die ganze Zeit über sehen und hören.",
    "exp": "Malcolm wurde zu Filmbeginn erschossen; nur der kleine Junge ('Ich sehe tote Menschen') konnte ihn die ganze Zeit über sehen und hören."
  },
  {
    "cat": "thriller_horror",
    "diff": "mid",
    "q": "Welcher Kult-Regisseur drehte den Zombie-Meilenstein 'Dawn of the Dead' (1978) in einem riesigen US-Einkaufszentrum als Konsumkritik?",
    "a": [
      "George A. Romero",
      "Sam Raimi",
      "Lucio Fulci",
      "Wes Craven"
    ],
    "explanation": "In der Monroeville Mall in Pennsylvania verbarrikadieren sich die Überlebenden zwischen Boutiquen, während Zombies instinktiv zum Konsumtempel pilgern.",
    "exp": "In der Monroeville Mall in Pennsylvania verbarrikadieren sich die Überlebenden zwischen Boutiquen, während Zombies instinktiv zum Konsumtempel pilgern."
  },
  {
    "cat": "thriller_horror",
    "diff": "pro",
    "q": "Welcher optische Kameraeffekt wurde von Alfred Hitchcock in 'Vertigo' (1958) erfunden, um Höhenangst visuell greifbar zu machen?",
    "a": [
      "Der Dolly-Zoom (gleichzeitiges Zurückfahren der Kamera bei gleichzeitigem Vorwärtszoomen)",
      "Der rotierende Fisheye-Spiegel im Objektiv",
      "Die doppelte Belichtung mit invertierten Farbnegativen",
      "Die stufenlose Verlangsamung der Verschlusszeit auf 1/2 Sekunde"
    ],
    "explanation": "Beim Dolly-Zoom bleibt das Hauptmotiv gleich groß, während der Hintergrund optisch dramatisch in die Tiefe stürzt oder heranrückt.",
    "exp": "Beim Dolly-Zoom bleibt das Hauptmotiv gleich groß, während der Hintergrund optisch dramatisch in die Tiefe stürzt oder heranrückt."
  },
  {
    "cat": "thriller_horror",
    "diff": "pro",
    "q": "Was war das Geheimnis der Puppe 'Billy' auf dem Dreirad in James Wans Schocker 'Saw' (2004)?",
    "a": [
      "Regisseur James Wan bastelte die Puppe selbst aus Pappmaché, Tischtennisbällen und Papiertüchern",
      "Sie war eine unbezahlbare antike Bauchrednerpuppe aus dem 19. Jahrhundert",
      "Sie wurde vollständig per Computeranimation nachträglich eingefügt",
      "Sie stammte aus dem Schaufenster eines verlassenen Kaufhauses in Prag"
    ],
    "explanation": "Wan und Co-Autor Leigh Whannell hatten kaum Budget; Wan formte Billys Gesicht eigenhändig aus Modelliermasse und Küchenpapier.",
    "exp": "Wan und Co-Autor Leigh Whannell hatten kaum Budget; Wan formte Billys Gesicht eigenhändig aus Modelliermasse und Küchenpapier."
  },
  {
    "cat": "thriller_horror",
    "diff": "pro",
    "q": "Welche ungewöhnliche Methode wendete David Fincher bei den Dreharbeiten zu 'Zodiac' (2007) an, um historische Authentizität zu erzwingen?",
    "a": [
      "Er verlangte bis zu 70 bis 90 Takes pro Szene und ließ Polizeiberichte minutiös nachstellen",
      "Er ließ die echten Mordopfer-Angehörigen am Set die Regieanweisungen geben",
      "Er drehte ausschließlich bei Neumond ohne Scheinwerferlicht",
      "Er sperrte die Hauptdarsteller für Wochen in echte Gefängniszellen"
    ],
    "explanation": "Finchers legendäre Detailbesessenheit trieb Jake Gyllenhaal und Mark Ruffalo an ihre psychischen Grenzen – schuf aber ein hyperpräzises Zeitdokument.",
    "exp": "Finchers legendäre Detailbesessenheit trieb Jake Gyllenhaal und Mark Ruffalo an ihre psychischen Grenzen – schuf aber ein hyperpräzises Zeitdokument."
  },
  {
    "cat": "thriller_horror",
    "diff": "pro",
    "q": "Was war das Besondere an der Maske von Leatherface im Original 'The Texas Chain Saw Massacre' (1974)?",
    "a": [
      "Darsteller Gunnar Hansen trug drei verschiedene Masken: die 'Killing Mask', die 'Old Lady Mask' und die 'Pretty Woman Mask'",
      "Die Maske bestand aus der echten Haut eines verstorbenen Statisten",
      "Sie wurde bei jedem Schnitt des Films mit neuem Rinderblut getränkt",
      "Sie besaß eingebaute Lautsprecher für furchteinflößendes Flüstern"
    ],
    "explanation": "Tobe Hooper gab Leatherface drei Persönlichkeiten, die sich in Kleidung und Menschenhaut-Maske je nach häuslicher Situation unterschieden.",
    "exp": "Tobe Hooper gab Leatherface drei Persönlichkeiten, die sich in Kleidung und Menschenhaut-Maske je nach häuslicher Situation unterschieden."
  },
  {
    "cat": "thriller_horror",
    "diff": "pro",
    "q": "Aus welchem Grund wurde der Schock-Thriller 'Der weiße Hai' (1975) für Steven Spielberg fast zum finanziellen und nervlichen Ruin?",
    "a": [
      "Der mechanische Riesenhai 'Bruce' versagte im salzigen Meerwasser ständig und sank wiederholt auf den Meeresboden",
      "Echte Haie bissen mehrere Kameramänner während der Unterwasseraufnahmen",
      "Die US-Küstenwache beschlagnahmte das Filmboot wegen fehlender Schiffspapiere",
      "Die Schauspieler weigerten sich, ohne Trockentauchanzüge ins Wasser zu gehen"
    ],
    "explanation": "Weil Bruce nie funktionierte, musste Spielberg den Hai mit Musik und Bojen andeuten – und erfand damit unfreiwillig den perfekten Suspense.",
    "exp": "Weil Bruce nie funktionierte, musste Spielberg den Hai mit Musik und Bojen andeuten – und erfand damit unfreiwillig den perfekten Suspense."
  },
  {
    "cat": "thriller_horror",
    "diff": "pro",
    "q": "Welche berüchtigte Subfrequenz nutzte der französische Regisseur Gaspar Noé im Skandalfilm 'Irreversibel' (2002)?",
    "a": [
      "Einen konstanten Infraschall-Ton von 28 Hertz in den ersten 30 Minuten zur Erzeugung von Übelkeit und Schwindel",
      "Ein hochfrequentes Pfeifen bei 19.000 Hertz zur Vertreibung von Jugendlichen",
      "Eine geheime Rückwärts-Tonspur mit hypnotischen Flüsterstimmen",
      "Die Herzfrequenz eines versterbenden Patienten im Hintergrundrauschen"
    ],
    "explanation": "Der 28-Hz-Infraschall ist kaum hörbar, löst aber im menschlichen Innenohr spürbare Beklemmung, Angstgefühle und körperliche Übelkeit aus.",
    "exp": "Der 28-Hz-Infraschall ist kaum hörbar, löst aber im menschlichen Innenohr spürbare Beklemmung, Angstgefühle und körperliche Übelkeit aus."
  },
  {
    "cat": "thriller_horror",
    "diff": "pro",
    "q": "Welcher deutsche Stummfilm-Klassiker von 1922 gilt als die erste, nicht autorisierte Verfilmung von Bram Stokers 'Dracula'?",
    "a": [
      "Nosferatu – Eine Symphonie des Grauens (von F. W. Murnau)",
      "Das Cabinet des Dr. Caligari (von Robert Wiene)",
      "Der Golem, wie er in die Welt kam (von Paul Wegener)",
      "Metropolis (von Fritz Lang)"
    ],
    "explanation": "Murnau änderte Namen (Graf Orlok statt Dracula), verlor jedoch den Urheberrechtsprozess gegen Stokers Witwe – fast alle Kopien sollten vernichtet werden.",
    "exp": "Murnau änderte Namen (Graf Orlok statt Dracula), verlor jedoch den Urheberrechtsprozess gegen Stokers Witwe – fast alle Kopien sollten vernichtet werden."
  },
  {
    "cat": "drama_anim",
    "diff": "easy",
    "q": "Welcher Pixar-Film von 1995 schrieb Kinogeschichte als erster vollständig computeranimierte Langspielfilm der Welt?",
    "a": [
      "Toy Story",
      "Das große Krabbeln",
      "Findet Nemo",
      "Die Monster AG"
    ],
    "explanation": "Unter der Regie von John Lasseter bewies Pixar, dass ein kompletter 81-minütiger Spielfilm aus dem Computer die Herzen von Millionen rühren kann.",
    "exp": "Unter der Regie von John Lasseter bewies Pixar, dass ein kompletter 81-minütiger Spielfilm aus dem Computer die Herzen von Millionen rühren kann."
  },
  {
    "cat": "drama_anim",
    "diff": "easy",
    "q": "Welches Gefängnisdrama von 1994 nach einer Stephen-King-Novelle belegt seit Jahren unangefochten Platz 1 der IMDb-Top-250-Filmliste?",
    "a": [
      "Die Verurteilten (The Shawshank Redemption)",
      "The Green Mile",
      "Flucht von Alcatraz",
      "Midnight Express"
    ],
    "explanation": "Frank Darabonts Geschichte um Andy Dufresne (Tim Robbins) und Red (Morgan Freeman) floppte anfangs im Kino, wurde aber auf Video zum Kult.",
    "exp": "Frank Darabonts Geschichte um Andy Dufresne (Tim Robbins) und Red (Morgan Freeman) floppte anfangs im Kino, wurde aber auf Video zum Kult."
  },
  {
    "cat": "drama_anim",
    "diff": "easy",
    "q": "Welches legendäre japanische Animationsstudio schuf Meisterwerke wie 'Chihiros Reise ins Zauberland' und 'Prinzessin Mononoke'?",
    "a": [
      "Studio Ghibli (von Hayao Miyazaki)",
      "Toei Animation",
      "Madhouse Studios",
      "Kyoto Animation"
    ],
    "explanation": "Miyazakis handgezeichnete Meisterwerke gewannen Weltruhm und 2003 den Oscar für den besten animierten Spielfilm.",
    "exp": "Miyazakis handgezeichnete Meisterwerke gewannen Weltruhm und 2003 den Oscar für den besten animierten Spielfilm."
  },
  {
    "cat": "drama_anim",
    "diff": "easy",
    "q": "Welches dreistündige Mafia-Epos von Francis Ford Coppola aus dem Jahr 1972 schildert den Aufstieg der Corleone-Familie?",
    "a": [
      "Der Pate (The Godfather)",
      "GoodFellas – Drei Jahrzehnte in der Mafia",
      "Casino",
      "Scarface"
    ],
    "explanation": "Marlon Brando und Al Pacino schrieben mit Zitaten wie 'Ich mache ihm ein Angebot, das er nicht ablehnen kann' Filmgeschichte.",
    "exp": "Marlon Brando und Al Pacino schrieben mit Zitaten wie 'Ich mache ihm ein Angebot, das er nicht ablehnen kann' Filmgeschichte."
  },
  {
    "cat": "drama_anim",
    "diff": "easy",
    "q": "Welcher Disney-Klassiker von 1994 erzählte die afrikanische Savannen-Geschichte um den jungen Löwen Simba?",
    "a": [
      "Der König der Löwen",
      "Tarzan",
      "Das Dschungelbuch",
      "Aladdin"
    ],
    "explanation": "Mit der Musik von Elton John und Hans Zimmer wurde der Film zum erfolgreichsten traditionell gezeichneten Animationsfilm der Geschichte.",
    "exp": "Mit der Musik von Elton John und Hans Zimmer wurde der Film zum erfolgreichsten traditionell gezeichneten Animationsfilm der Geschichte."
  },
  {
    "cat": "drama_anim",
    "diff": "mid",
    "q": "Warum erteilte das Studio Paramount Marlon Brando für die Rolle des Paten erst nach harten Bedingungen eine Zusage?",
    "a": [
      "Er galt als unberechenbar und musste sich für den Casting-Test Papiertaschentücher in die Wangen stopfen",
      "Er verlangte das gesamte Budget des Films als persönliche Gage",
      "Er weigerte sich, im Film italienische Wörter auszusprechen",
      "Er hatte seit über zwanzig Jahren in keinem Film mehr mitgespielt"
    ],
    "explanation": "Paramount-Chef Robert Evans verlangte ein Demotape. Brando schwärzte seine Haare mit Schuhcreme und stopfte Watte in die Wangen – die Rolle war seine.",
    "exp": "Paramount-Chef Robert Evans verlangte ein Demotape. Brando schwärzte seine Haare mit Schuhcreme und stopfte Watte in die Wangen – die Rolle war seine."
  },
  {
    "cat": "drama_anim",
    "diff": "mid",
    "q": "Wie viele Einzelbilder mussten für den Stop-Motion-Film 'Nightmare Before Christmas' (1993) per Hand Bild für Bild animiert werden?",
    "a": [
      "Über 100.000 einzelne Fotoaufnahmen bei 24 Bildern pro Sekunde",
      "Exakt 1.200 Bilder, der Rest wurde kopiert",
      "Nur rund 5.000 Bilder dank mechanischer Zeitschaltuhren",
      "Kein einziges, der Film war komplett digitale CGI-Animation"
    ],
    "explanation": "Für eine einzige Minute Film benötigte das Team unter Regisseur Henry Selick oft eine ganze Arbeitswoche akribischer Puppenfeinarbeit.",
    "exp": "Für eine einzige Minute Film benötigte das Team unter Regisseur Henry Selick oft eine ganze Arbeitswoche akribischer Puppenfeinarbeit."
  },
  {
    "cat": "drama_anim",
    "diff": "mid",
    "q": "Welches tragische historische Ereignis thematisiert Steven Spielbergs mit 7 Oscars prämierter Schwarzweiß-Film 'Schindlers Liste' (1993)?",
    "a": [
      "Die Rettung von über 1.100 jüdischen Zwangsarbeitern vor dem Holocaust durch den Industriellen Oskar Schindler",
      "Die Flucht von Zivilisten aus der belagerten Stadt Stalingrad",
      "Die Nürnberger Prozesse gegen die Hauptkriegsverbrecher",
      "Die Entschlüsselung der deutschen Enigma-Chiffriermaschine"
    ],
    "explanation": "Spielberg verzichtete auf sein Regiehonorar ('Blutgeld') und schuf ein erschütterndes Mahnmal, in dem nur der rote Mantel eines Mädchens Farbe trug.",
    "exp": "Spielberg verzichtete auf sein Regiehonorar ('Blutgeld') und schuf ein erschütterndes Mahnmal, in dem nur der rote Mantel eines Mädchens Farbe trug."
  },
  {
    "cat": "drama_anim",
    "diff": "mid",
    "q": "Welche technische Hürde meisterte Pixar im Animationsfilm 'Die Monster AG' (2001) bei der Figur von Sulley?",
    "a": [
      "Die physikalische Simulation von über 2,3 Millionen einzelnen, im Wind wehenden Fellhaaren",
      "Die Darstellung von gläsernen Zähnen im Dunkeln",
      "Das Rendern von feinsten Schweißtropfen auf blauem Leder",
      "Die Berechnung von Schatten in spiegelnden Pfützen"
    ],
    "explanation": "Pixar entwickelte dafür die Spezialsoftware 'Fiz-T', die jedes einzelne Haar von Sulleys blauem Pelz auf Wind und Bewegung reagieren ließ.",
    "exp": "Pixar entwickelte dafür die Spezialsoftware 'Fiz-T', die jedes einzelne Haar von Sulleys blauem Pelz auf Wind und Bewegung reagieren ließ."
  },
  {
    "cat": "drama_anim",
    "diff": "mid",
    "q": "Welcher südkoreanische Film schrieb 2020 Geschichte, als er als erster nicht-englischsprachiger Film den Oscar für den 'Besten Film' gewann?",
    "a": [
      "Parasite (von Bong Joon-ho)",
      "Oldboy (von Park Chan-wook)",
      "Burning (von Lee Chang-dong)",
      "Train to Busan (von Yeon Sang-ho)"
    ],
    "explanation": "Bong Joon-hos bitterböse Gesellschaftssatire über soziale Ungleichheit triumphierte sensationell bei den 92. Academy Awards.",
    "exp": "Bong Joon-hos bitterböse Gesellschaftssatire über soziale Ungleichheit triumphierte sensationell bei den 92. Academy Awards."
  },
  {
    "cat": "drama_anim",
    "diff": "mid",
    "q": "Welcher Schauspieler aß in Martin Scorseses 'Taxi Driver' (1976) Tabletten und improvisierte vor dem Spiegel die berühmte Zeile 'You talkin' to me?'?",
    "a": [
      "Robert De Niro",
      "Al Pacino",
      "Harvey Keitel",
      "Joe Pesci"
    ],
    "explanation": "Im Drehbuch von Paul Schrader stand lediglich: 'Travis betrachtet sich im Spiegel.' De Niro erfand den gesamten Monolog spontan am Set.",
    "exp": "Im Drehbuch von Paul Schrader stand lediglich: 'Travis betrachtet sich im Spiegel.' De Niro erfand den gesamten Monolog spontan am Set."
  },
  {
    "cat": "drama_anim",
    "diff": "mid",
    "q": "Welches Studio brachte mit 'Spider-Man: A New Universe' (2018) einen revolutionären Comic-Look mit variablen Bildraten ins Kino?",
    "a": [
      "Sony Pictures Animation",
      "Walt Disney Animation Studios",
      "DreamWorks Animation",
      "Illumination Entertainment"
    ],
    "explanation": "Der Film kombinierte 3D-CGI mit handgezeichneten Linien, Rasterpunkten und animierte Miles Morales anfangs absichtlich nur auf 12 Bildern/s (on twos).",
    "exp": "Der Film kombinierte 3D-CGI mit handgezeichneten Linien, Rasterpunkten und animierte Miles Morales anfangs absichtlich nur auf 12 Bildern/s (on twos)."
  },
  {
    "cat": "drama_anim",
    "diff": "pro",
    "q": "Welches Geheimnis steckt hinter der legendären Orange in Francis Ford Coppolas 'Der Pate'-Trilogie?",
    "a": [
      "Jedes Mal, wenn eine Orange im Bild auftaucht oder gegessen wird, kündigt dies einen nahenden Tod oder Anschlag an",
      "Orangen waren damals die billigste Requisite auf den Obstmärkten von New York",
      "Coppola hatte eine persönliche Wette mit der Requisitenabteilung laufen",
      "Sie symbolisierten die Reinheit der katholischen Kirche in Sizilien"
    ],
    "explanation": "Ob Don Vito vor dem Attentat Orangen kauft oder vor seinem Tod im Garten eine Orangenschale im Mund trägt: Die Frucht ist der Bote des Todes.",
    "exp": "Ob Don Vito vor dem Attentat Orangen kauft oder vor seinem Tod im Garten eine Orangenschale im Mund trägt: Die Frucht ist der Bote des Todes."
  },
  {
    "cat": "drama_anim",
    "diff": "pro",
    "q": "Wie viele Zeichnungen zeichnete Hayao Miyazaki für seine Studio-Ghibli-Filme zeitlebens eigenhändig Korrektur?",
    "a": [
      "Zehntausende Schlüsselbilder pro Film wurden von ihm persönlich mit dem Pinsel überarbeitet",
      "Er zeichnete grundsätzlich nur das Titelbild und überließ alles dem Computer",
      "Exakt 500 Bilder pro Film, der Rest entstand per Rotoskopie",
      "Er zeichnete ausschließlich die Hintergründe, niemals Charaktere"
    ],
    "explanation": "Miyazaki ist berüchtigt dafür, fast jedes Key-Frame seiner Animatoren mit feinsten Strichen nachzubessern, um perfekte Mimik zu garantieren.",
    "exp": "Miyazaki ist berüchtigt dafür, fast jedes Key-Frame seiner Animatoren mit feinsten Strichen nachzubessern, um perfekte Mimik zu garantieren."
  },
  {
    "cat": "drama_anim",
    "diff": "pro",
    "q": "Welcher Regisseur drehte mit 'Boyhood' (2014) ein einzigartiges Langzeitdrama mit denselben Schauspielern über einen Zeitraum von 12 realen Jahren?",
    "a": [
      "Richard Linklater",
      "Paul Thomas Anderson",
      "Wes Anderson",
      "Terrence Malick"
    ],
    "explanation": "Linklater traf sich von 2002 bis 2013 jedes Jahr für wenige Drehtage mit Ellar Coltrane und Ethan Hawke, um das echte Altern einzufangen.",
    "exp": "Linklater traf sich von 2002 bis 2013 jedes Jahr für wenige Drehtage mit Ellar Coltrane und Ethan Hawke, um das echte Altern einzufangen."
  },
  {
    "cat": "drama_anim",
    "diff": "pro",
    "q": "Welche Animationstechnik begründete 1937 Disneys 'Schneewittchen und die sieben Zwerge' zur Erzeugung räumlicher Tiefe?",
    "a": [
      "Die Multiplan-Kamera (Multiplane Camera)",
      "Das digitale Compositing",
      "Die Stereoskopie-Doppellinse",
      "Die Rotoskop-Lichtpause"
    ],
    "explanation": "Mehrere Glasschichten mit gemalten Vordergründen, Figuren und Hintergründen wurden übereinandergelegt und in unterschiedlichem Tempo bewegt.",
    "exp": "Mehrere Glasschichten mit gemalten Vordergründen, Figuren und Hintergründen wurden übereinandergelegt und in unterschiedlichem Tempo bewegt."
  },
  {
    "cat": "drama_anim",
    "diff": "pro",
    "q": "Warum schnitt Regisseur Walter Murch in 'Der englische Patient' und 'Apocalypse Now' nach der berühmten 'Rule of Six'?",
    "a": [
      "Emotion wiegt mit 51 Prozent schwerer als Raumgeometrie, Anschlüsse oder Story-Rhythmus",
      "Ein Schnitt darf niemals länger als exakt sechs Sekunden stehen bleiben",
      "Jeder Dialog muss aus mindestens sechs verschiedenen Kamerawinkeln gefilmt sein",
      "Es dürfen maximal sechs Figuren in einem Bildkader stehen"
    ],
    "explanation": "Murchs 'Rule of Six' besagt: Stimmt das emotionale Gefühl im Schnittmoment, verzeiht der Zuschauer jeden noch so groben Anschlussfehler im Raum.",
    "exp": "Murchs 'Rule of Six' besagt: Stimmt das emotionale Gefühl im Schnittmoment, verzeiht der Zuschauer jeden noch so groben Anschlussfehler im Raum."
  },
  {
    "cat": "drama_anim",
    "diff": "pro",
    "q": "Welche reale Tragödie ereignete sich während der Entstehung von Disneys 'Der König der Löwen' (1994) in Kalifornien?",
    "a": [
      "Das verheerende Northridge-Erdbeben zerstörte Teile der Studios, sodass Zeichner zu Hause weiterarbeiten mussten",
      "Ein Großbrand vernichtete die Originalaufnahmen der Tonspuren von Elton John",
      "Ein Tsunami überflutete das Archiv mit den Farbfolien",
      "Ein Hackerangriff löschte die gesamte Rohfassung der Stampede-Szene"
    ],
    "explanation": "Das Erdbeben im Januar 1994 legte das Hauptgebäude lahm; die Animatoren bauten provisorische Zeichentische in ihren Garagen und Wohnzimmern auf.",
    "exp": "Das Erdbeben im Januar 1994 legte das Hauptgebäude lahm; die Animatoren bauten provisorische Zeichentische in ihren Garagen und Wohnzimmern auf."
  },
  {
    "cat": "drama_anim",
    "diff": "pro",
    "q": "Was zeichnet den russischen Kunstfilm 'Russian Ark' (2002) von Aleksandr Sokurov filmhistorisch aus?",
    "a": [
      "Er wurde in einer einzigen, ungeschnittenen 96-Minuten-Plansequenz durch die 33 Säle der Petersburger Eremitage gedreht",
      "Er wurde auf einer echten Raumstation im Erdorbit gefilmt",
      "Er verwendete ausschließlich Gemälde anstelle von Schauspielern",
      "Er wurde komplett ohne Kamera nur durch Laser-Scans projiziert"
    ],
    "explanation": "Kameramann Tilman Büttner trug eine Steadicam samt digitaler Festplatte anderthalb Stunden am Stück an über 2.000 Schauspielern vorbei.",
    "exp": "Kameramann Tilman Büttner trug eine Steadicam samt digitaler Festplatte anderthalb Stunden am Stück an über 2.000 Schauspielern vorbei."
  },
  {
    "cat": "craft_history",
    "diff": "easy",
    "q": "Mit welcher Standard-Bildrate pro Sekunde (fps) werden Kinofilme seit der Einführung des Tonfilms traditionell projiziert?",
    "a": [
      "24 Bilder pro Sekunde (fps)",
      "60 Bilder pro Sekunde (fps)",
      "12 Bilder pro Sekunde (fps)",
      "100 Bilder pro Sekunde (fps)"
    ],
    "explanation": "24 fps erwiesen sich in den späten 1920ern als idealer Kompromiss zwischen flüssiger Bewegung, Tonqualität auf der Lichtspur und teurem Filmverbrauch.",
    "exp": "24 fps erwiesen sich in den späten 1920ern als idealer Kompromiss zwischen flüssiger Bewegung, Tonqualität auf der Lichtspur und teurem Filmverbrauch."
  },
  {
    "cat": "craft_history",
    "diff": "easy",
    "q": "Wie nennt man die Filmklappe (Clapperboard), die vor jeder Szene am Filmset vor die Linse geschlagen wird?",
    "a": [
      "Klappe zur optischen und akustischen Bild-Ton-Synchronisation",
      "Requisite zur Beruhigung der nervösen Schauspieler",
      "Zensurschild für unpassende Gesichtsausdrücke",
      "Werkzeug zur Messung der Farbtemperatur des Lichts"
    ],
    "explanation": "Das Zusammenschlagen des Holzschenkels erzeugt einen scharfen Knall auf der Tonspur und ein exakt sichtbares Schließ-Frame auf dem Film zur Synchronisation.",
    "exp": "Das Zusammenschlagen des Holzschenkels erzeugt einen scharfen Knall auf der Tonspur und ein exakt sichtbares Schließ-Frame auf dem Film zur Synchronisation."
  },
  {
    "cat": "craft_history",
    "diff": "easy",
    "q": "Was versteht man in der Filmproduktion unter einem 'MacGuffin' (geprägt von Alfred Hitchcock)?",
    "a": [
      "Ein Objekt oder Geheimnis, das die Handlung vorantreibt, für den Zuschauer selbst aber nebensächlich ist",
      "Ein spezieller Scheinwerfer für Nahaufnahmen",
      "Ein Stuntman, der gefährliche Explosionen überlebt",
      "Ein unerwarteter Regenguss während der Außenaufnahmen"
    ],
    "explanation": "Ob geheime Dokumente, Geldkoffer oder Zauberringe: Der MacGuffin motiviert die Figuren, ist inhaltlich aber oft austauschbar.",
    "exp": "Ob geheime Dokumente, Geldkoffer oder Zauberringe: Der MacGuffin motiviert die Figuren, ist inhaltlich aber oft austauschbar."
  },
  {
    "cat": "craft_history",
    "diff": "easy",
    "q": "Welches berühmte Studio in Rom gilt als die historische Traumfabrik des italienischen Kinos (u. a. für Fellini und Sergio Leone)?",
    "a": [
      "Cinecittà",
      "Babelsberg",
      "Pinewood",
      "Barrandov"
    ],
    "explanation": "In den legendären Cinecittà-Studios entstanden Meilensteine wie 'Ben Hur', 'La Dolce Vita' und unzählige Spaghetti-Western.",
    "exp": "In den legendären Cinecittà-Studios entstanden Meilensteine wie 'Ben Hur', 'La Dolce Vita' und unzählige Spaghetti-Western."
  },
  {
    "cat": "craft_history",
    "diff": "mid",
    "q": "Warum wählte Stanley Kubrick für 'Barry Lyndon' (1975) extrem lichtstarke Carl-Zeiss-Objektive mit f/0,7?",
    "a": [
      "Um historische Innenaufnahmen ausschließlich bei echtem Kerzenlicht ohne Scheinwerfer zu drehen",
      "Um das Filmset vor gefährlichen Hitzeschäden zu schützen",
      "Weil diese Objektive für den Dreh unter Wasser gedacht waren",
      "Um das Bild wie ein modernes Smartphone-Video wirken zu lassen"
    ],
    "explanation": "Die Linsen wurden ursprünglich für das Apollo-Mondprogramm der NASA gebaut. Kubrick ließ Spezialkameras umbauen, um bei Kerzenschein zu filmen.",
    "exp": "Die Linsen wurden ursprünglich für das Apollo-Mondprogramm der NASA gebaut. Kubrick ließ Spezialkameras umbauen, um bei Kerzenschein zu filmen."
  },
  {
    "cat": "craft_history",
    "diff": "mid",
    "q": "Welcher Hollywood-Kameramann erfand 1975 das tragbare Kamerastabilisierungssystem 'Steadicam'?",
    "a": [
      "Garrett Brown",
      "Roger Deakins",
      "Vittorio Storaro",
      "Emmanuel Lubezki"
    ],
    "explanation": "Brown balancierte die Kamera über ein gefedertes Parallelogramm-Armsystem am Körper des Operateurs und revolutionierte Verfolgungsaufnahmen.",
    "exp": "Brown balancierte die Kamera über ein gefedertes Parallelogramm-Armsystem am Körper des Operateurs und revolutionierte Verfolgungsaufnahmen."
  },
  {
    "cat": "craft_history",
    "diff": "mid",
    "q": "Was besagt die fundamentale '180-Grad-Regel' (Achsensprung) bei Dialogszenen in der Filmregie?",
    "a": [
      "Die Kamera darf eine gedachte Achse zwischen den Personen nicht überspringen, da sonst deren Blickrichtungen vertauscht werden",
      "Die Schauspieler müssen sich alle 180 Sekunden um die eigene Achse drehen",
      "Das Hauptlicht muss immer exakt von der gegenüberliegenden Wand strahlen",
      "Der Kameramann muss nach jedem Satz um 180 Grad nach oben schwenken"
    ],
    "explanation": "Wird die Handlungsachse übersprungen, schauen plötzlich beide Gesprächspartner in dieselbe Richtung statt zueinander, was den Zuschauer verwirrt.",
    "exp": "Wird die Handlungsachse übersprungen, schauen plötzlich beide Gesprächspartner in dieselbe Richtung statt zueinander, was den Zuschauer verwirrt."
  },
  {
    "cat": "craft_history",
    "diff": "mid",
    "q": "Welcher Ton-Effekt-Klassiker wurde seit 1951 in über 400 Filmen als Running Gag für stürzende oder getroffene Statisten eingebaut?",
    "a": [
      "Der Wilhelmsschrei (Wilhelm Scream)",
      "Der Hollywood-Heuler",
      "Das Warner-Schluchzen",
      "Der Tarzan-Jodler"
    ],
    "explanation": "Ursprünglich aus dem Western 'Distant Drums' stammend, bauten Tonmeister wie Ben Burtt den Schrei in Star Wars, Indiana Jones und Herr der Ringe ein.",
    "exp": "Ursprünglich aus dem Western 'Distant Drums' stammend, bauten Tonmeister wie Ben Burtt den Schrei in Star Wars, Indiana Jones und Herr der Ringe ein."
  },
  {
    "cat": "craft_history",
    "diff": "mid",
    "q": "Was zeichnet anamorphe Objektive (Cinemascope) optisch gegenüber sphärischen Linsen aus?",
    "a": [
      "Sie stauchen das Breitbild horizontal auf den Film und erzeugen ovale Unschärfekreise (Bokeh) sowie blaue Lichtstreifen (Flares)",
      "Sie machen alle Gesichter im Bild kreisrund und verzerrungsfrei",
      "Sie filmen ausschließlich in Schwarzweiß ohne Farbinformationen",
      "Sie benötigen keine Linsen und arbeiten rein mit Spiegeln"
    ],
    "explanation": "Anamorphe Linsen bündeln ein extrem breites Sichtfeld auf Standard-35mm-Film. Die charakteristischen horizontalen Flares prägen den echten Hollywood-Look.",
    "exp": "Anamorphe Linsen bündeln ein extrem breites Sichtfeld auf Standard-35mm-Film. Die charakteristischen horizontalen Flares prägen den echten Hollywood-Look."
  },
  {
    "cat": "craft_history",
    "diff": "mid",
    "q": "Welches Filmstudio in Potsdam-Babelsberg gilt als das älteste Großfilmstudio der Welt?",
    "a": [
      "Studio Babelsberg (gegründet 1912)",
      "Bavaria Filmstadt",
      "UFA Studios Berlin-Mitte",
      "Cinephon Filmwerke"
    ],
    "explanation": "In Babelsberg drehten Fritz Lang ('Metropolis') und Josef von Sternberg ('Der blaue Engel'); heute entstehen dort internationale Megaproduktionen.",
    "exp": "In Babelsberg drehten Fritz Lang ('Metropolis') und Josef von Sternberg ('Der blaue Engel'); heute entstehen dort internationale Megaproduktionen."
  },
  {
    "cat": "craft_history",
    "diff": "pro",
    "q": "Was beschreibt der filmpsychologische 'Kuleschow-Effekt' aus den 1920er-Jahren?",
    "a": [
      "Zuschauer projizieren Emotionen in ein ausdrucksloses Gesicht, je nachdem, welches Bild (Suppe, Sarg, Frau) danach geschnitten wird",
      "Bilder mit hohem Kontrast erzeugen im Gehirn automatisch Glückshormone",
      "Schnelle Kameraschwenks führen zu temporärem Gedächtnisverlust",
      "Dunkle Szenen werden vom Gehirn immer 20 Prozent lauter wahrgenommen als helle"
    ],
    "explanation": "Lew Kuleschow bewies: Erst die Montage zweier aufeinanderfolgender Bilder erzeugt die eigentliche Bedeutung und Emotion im Kopf des Betrachters.",
    "exp": "Lew Kuleschow bewies: Erst die Montage zweier aufeinanderfolgender Bilder erzeugt die eigentliche Bedeutung und Emotion im Kopf des Betrachters."
  },
  {
    "cat": "craft_history",
    "diff": "pro",
    "q": "Warum revolutionierte Gregg Toland 1941 in Orson Welles' 'Citizen Kane' die Bildgestaltung mit 'Deep Focus'?",
    "a": [
      "Er hielt durch extreme Abblendung und Weitwinkellinsen Vordergrund, Mittelgrund und Hintergrund gleichzeitig gestochen scharf",
      "Er ließ die Kamera während des gesamten Films niemals stillstehen",
      "Er filmte alle Szenen ausschließlich durch gefüllte Wassergläser",
      "Er beleuchtete die Schauspieler nur mit Taschenlampen von unten"
    ],
    "explanation": "Deep Focus erlaubte es den Schauspielern, sich frei im Raum zu bewegen, ohne dass der Fokus nachgeführt werden musste, was enorme Szenentiefe schuf.",
    "exp": "Deep Focus erlaubte es den Schauspielern, sich frei im Raum zu bewegen, ohne dass der Fokus nachgeführt werden musste, was enorme Szenentiefe schuf."
  },
  {
    "cat": "craft_history",
    "diff": "pro",
    "q": "Was war das streng geheime 'Dreistreifen-Technicolor-Verfahren' (Technicolor Process 4), das Filme wie 'Der Zauberer von Oz' (1939) berühmt machte?",
    "a": [
      "Ein Strahlenteilerprisma belichtete drei separate Schwarzweiß-Filmstreifen gleichzeitig für Rot, Grün und Blau",
      "Drei Kameras standen übereinander auf einem massiven Stahlgerüst",
      "Der Filmstreifen wurde dreimal hintereinander durch denselben Projektor gejagt",
      "Farbpigmente wurden mit winzigen Düsen während der Aufnahme auf das Zelluloid gesprüht"
    ],
    "explanation": "Die gigantische Technicolor-Kamera wog hunderte Kilo. Die drei Farbmatrizen wurden im Dye-Transfer-Verfahren mit Farbstoffen auf den Positivfilm geprägt.",
    "exp": "Die gigantische Technicolor-Kamera wog hunderte Kilo. Die drei Farbmatrizen wurden im Dye-Transfer-Verfahren mit Farbstoffen auf den Positivfilm geprägt."
  },
  {
    "cat": "craft_history",
    "diff": "pro",
    "q": "Welches Diktat erlegte das dänische Filmmanifest 'Dogma 95' (von Lars von Trier und Thomas Vinterberg) den Regisseuren auf?",
    "a": [
      "Nur Originalschauplätze, Handkamera, Naturton, kein künstliches Licht, keine nachträgliche Musik und kein Genrefilm",
      "Ausschließlich Drehs bei Nacht ohne gesprochene Worte",
      "Jeder Film musste in exakt 95 Minuten ohne Schnitt durchlaufen",
      "Alle Darsteller mussten echte Geschwister sein"
    ],
    "explanation": "Das 'Keuschheitsgelübde' von Dogma 95 sollte das Kino von teuren Hollywood-Effekten und Illusionen reinigen und auf das pure Schauspiel zurückwerfen.",
    "exp": "Das 'Keuschheitsgelübde' von Dogma 95 sollte das Kino von teuren Hollywood-Effekten und Illusionen reinigen und auf das pure Schauspiel zurückwerfen."
  },
  {
    "cat": "craft_history",
    "diff": "pro",
    "q": "Wie funktionierte das legendäre Schüfftan-Verfahren (entwickelt von Eugen Schüfftan für Fritz Langs 'Metropolis' 1927)?",
    "a": [
      "Ein im 45-Grad-Winkel platzierter Spiegel spiegelte Miniaturmodelle in die Kamera, während an abgekratzten Stellen echte Schauspieler agierten",
      "Schauspieler wurden vor bemalten Glaswänden auf Stelzen gesetzt",
      "Zwei Filmstreifen wurden im Projektor mit Zangen zusammengepresst",
      "Kameramänner schauten durch ein Periskop aus dem Fußboden"
    ],
    "explanation": "Das Schüfftan-Verfahren sparte gewaltige Baukosten: Riesige futuristische Wolkenkratzer existierten nur als tischgroße Modelle im Spiegel.",
    "exp": "Das Schüfftan-Verfahren sparte gewaltige Baukosten: Riesige futuristische Wolkenkratzer existierten nur als tischgroße Modelle im Spiegel."
  },
  {
    "cat": "craft_history",
    "diff": "pro",
    "q": "Was bezeichnet der 'Dutch Angle' (schräge Kameraperspektive) in der Filmsprache, berühmt geworden im Film Noir und 'Der dritte Mann' (1949)?",
    "a": [
      "Das Kippen der Kamera um die Rollachse, um Unbehagen, Verwirrung oder moralische Instabilität visuell zu signalisieren",
      "Das Filmen aus einem Graben senkrecht nach oben",
      "Die ausschließliche Verwendung von gelben Filtern vor der Linse",
      "Eine Kamerafahrt auf einem runden Karussell"
    ],
    "explanation": "Der Begriff leitet sich von 'Deutsch' (Expressionismus der Weimarer Republik) ab. Die schiefe Horizontlinie signalisiert, dass die Welt aus den Fugen ist.",
    "exp": "Der Begriff leitet sich von 'Deutsch' (Expressionismus der Weimarer Republik) ab. Die schiefe Horizontlinie signalisiert, dass die Welt aus den Fugen ist."
  },
  {
    "cat": "craft_history",
    "diff": "pro",
    "q": "Warum gilt der Ton-Schnitt im Film als 'unsichtbare Kunst', für die Walter Murch den Begriff 'Sound Design' für 'Apocalypse Now' (1979) schuf?",
    "a": [
      "Weil über 70 Prozent der Atmosphäre im Kino unbewusst über vielschichtige Audio-Ebenen und Räumlichkeit wahrgenommen werden",
      "Weil Tontechniker während der Filmpremieren unter der Leinwand versteckt sitzen",
      "Weil Schallwellen im Gegensatz zu Filmkadern keine Pixel besitzen",
      "Weil Tonaufnahmen im Weltall physikalisch nicht existieren können"
    ],
    "explanation": "Murch baute für Coppolas Kriegsepos ein revolutionäres 5.1-Surround-Klanggewebe auf, in dem Hubschraubergeräusche mit Insektensummen verschmolzen.",
    "exp": "Murch baute für Coppolas Kriegsepos ein revolutionäres 5.1-Surround-Klanggewebe auf, in dem Hubschraubergeräusche mit Insektensummen verschmolzen."
  },
  {
    "cat": "craft_history",
    "diff": "pro",
    "q": "Was war das Geheimnis hinter der legendären 210-Sekunden-Steadicam-Eröffnungsfahrt in Martin Scorseses 'GoodFellas' (1990) durch den Copacabana-Club?",
    "a": [
      "Kameramann Larry McConkey folgte Henry und Karen ohne Schnitt durch Hinterküchen, Gänge und Servierräume bis an ihren Tisch",
      "Die Szene bestand aus 14 geschickt getarnten Schnitten hinter Kellnerrücken",
      "Die Kamera hing an Schienen, die unter der Küchendecke montiert waren",
      "Die Schauspieler wurden auf einem motorisierten Teppich durch den Club gezogen"
    ],
    "explanation": "Scorsese durfte wegen fehlender Drehgenehmigung nicht durch den Haupteingang. Die Plansequenz durch die Küche wurde zum Inbegriff von Coolness und Luxus.",
    "exp": "Scorsese durfte wegen fehlender Drehgenehmigung nicht durch den Haupteingang. Die Plansequenz durch die Küche wurde zum Inbegriff von Coolness und Luxus."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === 'function') {
    window.ArcadeQuizEngine.registerBank('movies', DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS['movies'] = DATA;
  }
})();
