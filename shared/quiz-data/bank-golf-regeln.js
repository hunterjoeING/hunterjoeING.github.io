// Unified quiz bank for "golf_regeln" (75 questions: Regeln, Etikette & Scoring)
(function () {
  const DATA = [
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Aus welcher Höhe muss ein Golfball bei einer Regelerleichterung seit der Regelreform fallen gelassen (gedroppt) werden?",
    "a": [
      "Aus Kniehöhe im aufrechten Stand",
      "Aus Schulterhöhe im aufrechten Stand",
      "Aus Hüfthöhe im aufrechten Stand",
      "Aus Knöchelhöhe im gebeugten Stand"
    ],
    "correctIndex": 0,
    "exp": "Seit der Reform 2019/2023 wird der Ball stets aus Kniehöhe im aufrechten Stand gedroppt, um ein Wegspringen zu minimieren.",
    "explanation": "Seit der Reform 2019/2023 wird der Ball stets aus Kniehöhe im aufrechten Stand gedroppt, um ein Wegspringen zu minimieren."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Wie viele Minuten darf ein Spieler maximal nach seinem Golfball suchen, bevor dieser offiziell als verloren gilt?",
    "a": [
      "Exakt 3 Minuten",
      "Exakt 5 Minuten",
      "Exakt 4 Minuten",
      "Exakt 2 Minuten"
    ],
    "correctIndex": 0,
    "exp": "Die Suchzeit wurde zur Beschleunigung des Spieltempos von ehemals fünf auf genau drei Minuten reduziert.",
    "explanation": "Die Suchzeit wurde zur Beschleunigung des Spieltempos von ehemals fünf auf genau drei Minuten reduziert."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Was gilt auf dem Grün, wenn ein Spieler puttet, während der Flaggenstock unbedient im Loch stecken bleibt?",
    "a": [
      "Der Schlag ist straflos, der Ball darf die Fahne berühren",
      "Der Spieler erhält zwei Strafschläge für das Nichtbedienen",
      "Der Schlag muss sofort wiederholt werden ohne jeden Strafschlag",
      "Der Spieler verliert im Lochspiel sofort dieses einzelne Loch"
    ],
    "correctIndex": 0,
    "exp": "Seit 2019 darf die Fahne beim Putten auf dem Grün im Loch bleiben. Trifft der Ball die Fahne, ist das völlig straflos.",
    "explanation": "Seit 2019 darf die Fahne beim Putten auf dem Grün im Loch bleiben. Trifft der Ball die Fahne, ist das völlig straflos."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Was passiert, wenn ein Spieler seinen ruhenden Ball auf dem Grün beim Entfernen eines Blattes versehentlich bewegt?",
    "a": [
      "Er muss straflos an die ursprüngliche Stelle zurücklegen",
      "Er erhält einen Strafschlag und spielt weiter",
      "Er erhält zwei Strafschläge und legt den Ball vor",
      "Er verliert das Loch automatisch bei einem Lochspiel"
    ],
    "correctIndex": 0,
    "exp": "Auf dem Grün ist das versehentliche Bewegen des Balls oder Ballmarkers straflos; der Ball muss an seine Ausgangsstelle zurückgelegt werden.",
    "explanation": "Auf dem Grün ist das versehentliche Bewegen des Balls oder Ballmarkers straflos; der Ball muss an seine Ausgangsstelle zurückgelegt werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Wie viele Golfschläger darf ein Spieler während einer regulären Runde maximal in seinem Golfbag mitführen?",
    "a": [
      "Maximal 14 Schläger",
      "Maximal 12 Schläger",
      "Maximal 15 Schläger",
      "Maximal 16 Schläger"
    ],
    "correctIndex": 0,
    "exp": "Die Obergrenze nach Regel 4.1b liegt bei maximal 14 Schlägern. Wer mehr mitführt, kassiert Strafschläge für jedes betroffene Loch.",
    "explanation": "Die Obergrenze nach Regel 4.1b liegt bei maximal 14 Schlägern. Wer mehr mitführt, kassiert Strafschläge für jedes betroffene Loch."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Welche Farbe haben die Pfähle, die eine normale Penalty Area (Hindernis) mit seitlicher Erleichterung begrenzen?",
    "a": [
      "Rote Markierungspfähle",
      "Gelbe Markierungspfähle",
      "Blaue Markierungspfähle",
      "Weiße Markierungspfähle"
    ],
    "correctIndex": 0,
    "exp": "Rote Pfähle oder Linien markieren seitliche Penalty Areas. Hier darf zusätzlich zwei Schlägerlängen seitlich gedroppt werden.",
    "explanation": "Rote Pfähle oder Linien markieren seitliche Penalty Areas. Hier darf zusätzlich zwei Schlägerlängen seitlich gedroppt werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Welche Bedeutung haben weiße Pfähle oder weiße Bodenlinien auf einem Golfplatz?",
    "a": [
      "Sie markieren die Aus-Grenze des Golfplatzes",
      "Sie markieren eine normale Penalty-Wasserzone",
      "Sie kennzeichnen einen Boden in Ausbesserung",
      "Sie weisen auf geschützte Biotope ohne Betreten"
    ],
    "correctIndex": 0,
    "exp": "Weiße Pfähle definieren das 'Aus' (Out of Bounds). Liegt der Ball im Aus, muss unter Schlag- und Distanzverlust neu gespielt werden.",
    "explanation": "Weiße Pfähle definieren das 'Aus' (Out of Bounds). Liegt der Ball im Aus, muss unter Schlag- und Distanzverlust neu gespielt werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Was versteht man im Golfsport unter einem sogenannten 'provisorischen Ball'?",
    "a": [
      "Einen Ersatzball bei möglichem Aus oder Ballverlust",
      "Einen Ball für schlechtes Regenwetter am Abschlag",
      "Einen Übungsball für Probeschwünge vor dem Schlag",
      "Einen besonders weichen Zweitball für schnelles Grün"
    ],
    "correctIndex": 0,
    "exp": "Glaubt der Spieler, dass sein Ball im Aus oder außerhalb einer Penalty Area verloren sein könnte, darf er zur Zeitersparnis einen provisorischen Ball spielen.",
    "explanation": "Glaubt der Spieler, dass sein Ball im Aus oder außerhalb einer Penalty Area verloren sein könnte, darf er zur Zeitersparnis einen provisorischen Ball spielen."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Dürfen lose Naturkörper wie Steine, Blätter oder Zweige in einem Bunker straflos entfernt werden?",
    "a": [
      "Ja, sie dürfen überall straflos entfernt werden",
      "Nein, Berühren im Bunker bringt zwei Strafschläge",
      "Nur Steine dürfen entfernt werden, Zweige nicht",
      "Nur wenn der Ball mindestens fünf Meter weg liegt"
    ],
    "correctIndex": 0,
    "exp": "Seit der Regelreform dürfen lose Naturkörper (Loose Impediments) überall auf dem Platz – auch im Bunker und in Penalty Areas – straflos entfernt werden.",
    "explanation": "Seit der Regelreform dürfen lose Naturkörper (Loose Impediments) überall auf dem Platz – auch im Bunker und in Penalty Areas – straflos entfernt werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Welche Erleichterung erhält ein Spieler, wenn sein Ball auf einem asphaltierten Cartweg zur Ruhe kommt?",
    "a": [
      "Straffreies Droppen innerhalb einer Schlägerlänge",
      "Zwei Schlägerlängen mit einem Strafschlag droppen",
      "Weiterspielen ohne Erleichterung direkt vom Weg",
      "Sofortiger Ballwechsel mit zwei Strafschlägen"
    ],
    "correctIndex": 0,
    "exp": "Künstlich befestigte Wege sind unbewegliche Hemmnisse. Der Spieler erhält straflose Erleichterung (Nearest Point of Complete Relief + 1 Schlägerlänge).",
    "explanation": "Künstlich befestigte Wege sind unbewegliche Hemmnisse. Der Spieler erhält straflose Erleichterung (Nearest Point of Complete Relief + 1 Schlägerlänge)."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Wie viele Netto-Stableford-Punkte erhält ein Golfer, wenn er an einem Loch genau sein persönliches Netto-Par erzielt?",
    "a": [
      "Exakt 2 Punkte",
      "Exakt 3 Punkte",
      "Exakt 1 Punkt",
      "Exakt 0 Punkte"
    ],
    "correctIndex": 0,
    "exp": "Beim Stableford-System bringt ein Netto-Par genau 2 Punkte, ein Netto-Bogey 1 Punkt und ein Netto-Birdie 3 Punkte ein.",
    "explanation": "Beim Stableford-System bringt ein Netto-Par genau 2 Punkte, ein Netto-Bogey 1 Punkt und ein Netto-Birdie 3 Punkte ein."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Was passiert im Stableford-Zählspiel, wenn ein Spieler an einem Loch ein Netto-Doppelbogey oder schlechter spielt?",
    "a": [
      "Er erhält null Punkte und sollte den Ball aufheben",
      "Er erhält einen Minuspunkt auf seiner Scorekarte",
      "Er muss das Loch zwingend bis ins Ziel zu Ende putten",
      "Er wird für die laufende Runde sofort disqualifiziert"
    ],
    "correctIndex": 0,
    "exp": "Schlechter als Netto-Doppelbogey gibt immer 0 Punkte. Zur Schonung des Spielflusses sollte der Ball dann sofort aufgehoben werden.",
    "explanation": "Schlechter als Netto-Doppelbogey gibt immer 0 Punkte. Zur Schonung des Spielflusses sollte der Ball dann sofort aufgehoben werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Welcher internationale Warnruf muss laut Golf-Etikette lautstark gerufen werden, wenn ein Ball andere Personen gefährdet?",
    "a": [
      "Fore!",
      "Achtung!",
      "Vorsicht!",
      "Head up!"
    ],
    "correctIndex": 0,
    "exp": "Der traditionelle Warnruf 'Fore!' warnt Mitspieler und Passanten sofort vor herannahenden, verirrten Golfbällen.",
    "explanation": "Der traditionelle Warnruf 'Fore!' warnt Mitspieler und Passanten sofort vor herannahenden, verirrten Golfbällen."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Was gehört zur grundlegenden Fairway-Etikette, nachdem ein Spieler mit einem Eisen ein Grasstück (Divot) herausgeschlagen hat?",
    "a": [
      "Das Divot zurücklegen und mit dem Schuh fest antreten",
      "Das Divot ignorieren und sofort zügig weitermarschieren",
      "Das Loch mit reichlich Bunkersand komplett auffüllen",
      "Einen Markierungsstab an die betroffene Stelle stecken"
    ],
    "correctIndex": 0,
    "exp": "Herausgeschlagene Rasenstücke müssen zeitnah zurückgelegt und festgetreten werden, damit die Grasnarbe schnell wieder anwächst.",
    "explanation": "Herausgeschlagene Rasenstücke müssen zeitnah zurückgelegt und festgetreten werden, damit die Grasnarbe schnell wieder anwächst."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Was sollte ein Spieler nach dem Verlassen eines Sandbunkers aus Respekt vor den Nachfolgern stets tun?",
    "a": [
      "Die eigenen Fußspuren mit der Harke sorgfältig glätten",
      "Den Bunkersand mit dem Schlägerkopf locker verteilen",
      "Den Bunker markieren und die Spielleitung verständigen",
      "Den Bunkersand mit Wasser befeuchten für mehr Härte"
    ],
    "correctIndex": 0,
    "exp": "Das saubere Harken des Bunkers nach dem Schlag stellt faire Bedingungen für alle nachfolgenden Spielgruppen sicher.",
    "explanation": "Das saubere Harken des Bunkers nach dem Schlag stellt faire Bedingungen für alle nachfolgenden Spielgruppen sicher."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Was ist eine Pitchmarke und wie muss ein Spieler auf dem Grün korrekt damit umgehen?",
    "a": [
      "Eine Rasenvertiefung, die mit der Pitchgabel repariert wird",
      "Ein Ballmarker, den man auf der Puttlinie liegen lässt",
      "Eine Begrenzungslinie, die man keinesfalls betreten darf",
      "Ein Lochdurchmesser, den man vor dem Putt nachmessen muss"
    ],
    "correctIndex": 0,
    "exp": "Pitchmarken sind Einschlagkrater von Bällen auf dem Grün. Sie müssen sofort mit einer Pitchgabel von den Rändern her angehoben und geglättet werden.",
    "explanation": "Pitchmarken sind Einschlagkrater von Bällen auf dem Grün. Sie müssen sofort mit einer Pitchgabel von den Rändern her angehoben und geglättet werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Darf ein Spieler seinen Ball auf dem Grün reinigen, wenn er ihn zuvor ordnungsgemäß markiert und aufgenommen hat?",
    "a": [
      "Ja, auf dem Grün darf der aufgenommene Ball gereinigt werden",
      "Nein, Bälle dürfen auf dem Grün niemals gesäubert werden",
      "Nur wenn der Mitspieler der Reinigung ausdrücklich zustimmt",
      "Nur mit einem vom Schiedsrichter gestempelten Spezialtuch"
    ],
    "correctIndex": 0,
    "exp": "Auf dem Grün aufgenommene Bälle dürfen ohne Einschränkung von Schmutz, Sand und Feuchtigkeit befreit werden.",
    "explanation": "Auf dem Grün aufgenommene Bälle dürfen ohne Einschränkung von Schmutz, Sand und Feuchtigkeit befreit werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Was bedeutet der Begriff 'Ready Golf' im modernen Amateursport?",
    "a": [
      "Jeder schlägt ab, sobald er sicher bereit ist",
      "Der Spieler mit dem besten Score schlägt stets zuerst",
      "Man muss innerhalb von zehn Sekunden den Schwung machen",
      "Man spielt ausschließlich mit zwei Bällen gleichzeitig"
    ],
    "correctIndex": 0,
    "exp": "Ready Golf ermutigt Spieler im Zählspiel, abweichend von der strengen Reihenfolge zu schlagen, sobald es sicher möglich ist, um Zeit zu sparen.",
    "explanation": "Ready Golf ermutigt Spieler im Zählspiel, abweichend von der strengen Reihenfolge zu schlagen, sobald es sicher möglich ist, um Zeit zu sparen."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Wie viele Strafschläge erhält ein Spieler standardmäßig, wenn er seinen Ball für unspielbar erklärt?",
    "a": [
      "Genau einen Strafschlag",
      "Genau zwei Strafschläge",
      "Keinen einzigen Strafschlag",
      "Genau drei Strafschläge"
    ],
    "correctIndex": 0,
    "exp": "Die Regelerleichterung für einen unspielbaren Ball (Regel 19) kostet stets genau einen Strafschlag.",
    "explanation": "Die Regelerleichterung für einen unspielbaren Ball (Regel 19) kostet stets genau einen Strafschlag."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Was kennzeichnet im Golfsport die Spielform des klassischen Lochspiels (Match Play)?",
    "a": [
      "Es gewinnt der Spieler mit den wenigsten Gesamtschlägen",
      "Es wird um gewonnene, geteilte oder verlorene Löcher gespielt",
      "Die Schlagzahl wird an jedem Loch mit dem Handicap dividiert",
      "Jeder Spieler muss an jedem Loch genau dieselbe Schlägerwahl treffen"
    ],
    "correctIndex": 1,
    "exp": "Im Lochspiel zählt nicht die Gesamtschlagzahl, sondern der direkte Lochgewinn gegen den Kontrahenten (z. B. '3 auf und 2 zu spielen').",
    "explanation": "Im Lochspiel zählt nicht die Gesamtschlagzahl, sondern der direkte Lochgewinn gegen den Kontrahenten (z. B. '3 auf und 2 zu spielen')."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Was bedeutet im Lochspiel der Ausruf 'Gimme' (geschenkter Putt)?",
    "a": [
      "Der Spieler darf seinen Ball um einen Meter näher verlegen",
      "Der Gegner schenkt den nächsten kurzen Schlag als eingelocht",
      "Der Schiedsrichter verdoppelt den Wert des aktuellen Lochs",
      "Der Mitspieler erhält einen zusätzlichen Strafschlag gutgeschrieben"
    ],
    "correctIndex": 1,
    "exp": "Ein Schenken ist nur im Match Play erlaubt. Der Putt gilt als mit dem nächsten Schlag verwandelt, ohne ausgeführt werden zu müssen.",
    "explanation": "Ein Schenken ist nur im Match Play erlaubt. Der Putt gilt als mit dem nächsten Schlag verwandelt, ohne ausgeführt werden zu müssen."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Darf ein Spieler seine Füße beim Abschlag außerhalb der Abschlagsmarkierungen platzieren?",
    "a": [
      "Nein, die Füße müssen stets innerhalb der Markierungen stehen",
      "Ja, solange der Ball selbst innerhalb der Abschlagszone liegt",
      "Nur wenn der Spieler mit der linken Hand den Abschlag ausführt",
      "Nur mit ausdrücklicher Genehmigung der gesamten Spielergruppe"
    ],
    "correctIndex": 1,
    "exp": "Entscheidend ist ausschließlich die Lage des Balls in der Abschlagszone; die Füße des Golfers dürfen sich problemlos außerhalb befinden.",
    "explanation": "Entscheidend ist ausschließlich die Lage des Balls in der Abschlagszone; die Füße des Golfers dürfen sich problemlos außerhalb befinden."
  },
  {
    "cat": "golf_regeln",
    "diff": "easy",
    "q": "Was passiert, wenn der Ball beim Ansprechen am Abschlag versehentlich vom Tee rollt, bevor der Schlag begann?",
    "a": [
      "Es zählt als ein Schlag und der Ball muss so gespielt werden",
      "Der Ball darf völlig straflos erneut aufgeteet werden",
      "Der Spieler erhält zwei Strafschläge für die Ballberührung",
      "Der Spieler muss vom Boden aus ohne Tee weiterspielen"
    ],
    "correctIndex": 1,
    "exp": "Solange der Spieler noch keinen Schlag mit der Absicht begonnen hat, den Ball zu treffen, ist der Ball noch nicht im Spiel und darf straflos aufgeteet werden.",
    "explanation": "Solange der Spieler noch keinen Schlag mit der Absicht begonnen hat, den Ball zu treffen, ist der Ball noch nicht im Spiel und darf straflos aufgeteet werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Welche Erleichterungsoption fehlt bei einer gelb markierten Penalty Area im Vergleich zu einer rot markierten?",
    "a": [
      "Die Option von Schlag und Distanzverlust am alten Ort",
      "Die seitliche Erleichterung von zwei Schlägerlängen",
      "Die Option, den Ball auf der Verlängerungslinie zu droppen",
      "Das Weiterspielen des Balls, wie er im Hindernis liegt"
    ],
    "correctIndex": 1,
    "exp": "Gelbe Penalty Areas bieten keine seitliche Erleichterung (2 Schlägerlängen). Es gibt nur 'Schlag und Distanz' oder 'Linie zurück'.",
    "explanation": "Gelbe Penalty Areas bieten keine seitliche Erleichterung (2 Schlägerlängen). Es gibt nur 'Schlag und Distanz' oder 'Linie zurück'."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Wie groß ist der zulässige Erleichterungsbereich beim seitlichen Droppen an einer roten Penalty Area?",
    "a": [
      "Genau eine Schlägerlänge vom Referenzpunkt",
      "Genau zwei Schlägerlängen, nicht näher zur Fahne",
      "Genau drei Schlägerlängen in beliebiger Richtung",
      "Beliebig weit, solange der Ball im Rough landet"
    ],
    "correctIndex": 1,
    "exp": "Die seitliche Erleichterung an roten Penalty Areas beträgt exakt zwei Schlägerlängen ab Kreuzungspunkt, nicht näher zum Loch.",
    "explanation": "Die seitliche Erleichterung an roten Penalty Areas beträgt exakt zwei Schlägerlängen ab Kreuzungspunkt, nicht näher zum Loch."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Was passiert, wenn ein Spieler einen zweiten Ball schlägt, ohne diesen ausdrücklich als 'provisorischen Ball' anzukündigen?",
    "a": [
      "Der Spieler erhält zwei Strafschläge und sucht den ersten Ball",
      "Der zweite Ball wird automatisch mit Strafschlag zum Ball im Spiel",
      "Der zweite Schlag wird annulliert und der Spieler wird verwarnt",
      "Der Spieler darf am Ende frei wählen, welchen Ball er spielen möchte"
    ],
    "correctIndex": 1,
    "exp": "Wird der Ball nicht klar vorab als provisorisch bezeichnet, gilt er automatisch unter Anrechnung von Schlag und Distanz als neuer Ball im Spiel.",
    "explanation": "Wird der Ball nicht klar vorab als provisorisch bezeichnet, gilt er automatisch unter Anrechnung von Schlag und Distanz als neuer Ball im Spiel."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Wann ist ein Golfball im allgemeinen Gelände (General Area) im Sinne der Regeln 'eingebettet'?",
    "a": [
      "Wenn er tiefer als fünf Zentimeter im weichen Sand liegt",
      "Wenn er in seinem eigenen Einschlagkrater unter Bodenniveau liegt",
      "Sobald er von herabgefallenen Blättern komplett verdeckt wird",
      "Wenn er nach einem weiten Schlag in hohem Fairwaygras liegt"
    ],
    "correctIndex": 1,
    "exp": "Ein Ball ist eingebettet, wenn er in seinem eigenen Einschlagloch liegt und ein Teil des Balls unter der Erdoberfläche liegt. Das gibt straflose Erleichterung.",
    "explanation": "Ein Ball ist eingebettet, wenn er in seinem eigenen Einschlagloch liegt und ein Teil des Balls unter der Erdoberfläche liegt. Das gibt straflose Erleichterung."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Wie ermittelt ein Spieler den korrekten Erleichterungsbereich bei Boden in Ausbesserung (GUR)?",
    "a": [
      "Nächster Punkt teilweiser Erleichterung plus zwei Schlägerlängen",
      "Nächster Punkt vollständiger Erleichterung plus eine Schlägerlänge",
      "Direkt an der Stelle des Balls genau zwei Schlägerlängen rückwärts",
      "Immer auf dem kurz gemähten Fairway innerhalb dreier Schlägerlängen"
    ],
    "correctIndex": 1,
    "exp": "Referenzpunkt ist der 'Nearest Point of Complete Relief' (keine Behinderung von Stand oder Schwung); von dort misst man eine Schlägerlänge, nicht näher zum Loch.",
    "explanation": "Referenzpunkt ist der 'Nearest Point of Complete Relief' (keine Behinderung von Stand oder Schwung); von dort misst man eine Schlägerlänge, nicht näher zum Loch."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Ein unbewegliches Hemmnis (z. B. ein Schild) behindert nur die Spiellinie, nicht aber Stand oder Schwung. Was gilt?",
    "a": [
      "Der Spieler darf stets zwei Schlägerlängen straflos droppen",
      "Es gibt standardmäßig keinerlei straflose Erleichterung",
      "Der Spieler darf das Hindernis vorübergehend demontieren",
      "Der Spieler erhält automatisch einen Freischlag gutgeschrieben"
    ],
    "correctIndex": 1,
    "exp": "Im Gelände gibt es für unbewegliche Hemmnisse nur Erleichterung bei Behinderung von Lage des Balls, Stand oder Schwung – nicht für die bloße Sicht- oder Fluglinie.",
    "explanation": "Im Gelände gibt es für unbewegliche Hemmnisse nur Erleichterung bei Behinderung von Lage des Balls, Stand oder Schwung – nicht für die bloße Sicht- oder Fluglinie."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Was passiert, wenn sich ein ruhender Ball im Gelände bewegt, während der Spieler ein störendes Blatt direkt daneben entfernt?",
    "a": [
      "Der Spieler erhält zwei Strafschläge und spielt von der neuen Stelle",
      "Der Spieler erhält einen Strafschlag und muss den Ball zurücklegen",
      "Das Bewegen ist straflos, der Ball wird von der neuen Stelle gespielt",
      "Das Bewegen ist straflos, der Ball muss zwingend zurückgelegt werden"
    ],
    "correctIndex": 1,
    "exp": "Verursacht das Entfernen eines losen Naturkörpers im Gelände eine Ballbewegung, gibt es einen Strafschlag und der Ball muss zurückgelegt werden.",
    "explanation": "Verursacht das Entfernen eines losen Naturkörpers im Gelände eine Ballbewegung, gibt es einen Strafschlag und der Ball muss zurückgelegt werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Welche vierte Option steht bei einem unspielbaren Ball im Bunker mit zwei Strafschlägen zur Verfügung?",
    "a": [
      "Droppen auf dem nächstgelegenen Grün innerhalb zweier Schlägerlängen",
      "Droppen außerhalb des Bunkers auf gerader Verlängerungslinie nach hinten",
      "Freies Weiterspielen mit dem Schläger eines beliebigen Mitspielers",
      "Automatisches Notieren eines Pars ohne weitere Schlagversuche"
    ],
    "correctIndex": 1,
    "exp": "Regel 19.3b erlaubt es, mit zwei Strafschlägen außerhalb des Bunkers auf der Linie Fahne-Ball beliebig weit nach hinten zu droppen.",
    "explanation": "Regel 19.3b erlaubt es, mit zwei Strafschlägen außerhalb des Bunkers auf der Linie Fahne-Ball beliebig weit nach hinten zu droppen."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Wie wird das versehentliche Treffen des Balls bei einem einzigen Schwung (Doppelkontakt / Double Hit) seit 2019 gewertet?",
    "a": [
      "Als zwei Schläge plus zusätzlich ein Strafschlag wegen Fehlers",
      "Als genau ein regulärer Schlag ohne jeglichen Strafschlag",
      "Als ungültiger Schlagversuch, der sofort wiederholt werden muss",
      "Als automatischer Lochverlust im Lochspiel für den Spieler"
    ],
    "correctIndex": 1,
    "exp": "Trifft der Schläger den Ball beim Durchschwung unabsichtlich mehrfach, zählt das seit 2019 als nur ein einziger Schlag ohne Strafe.",
    "explanation": "Trifft der Schläger den Ball beim Durchschwung unabsichtlich mehrfach, zählt das seit 2019 als nur ein einziger Schlag ohne Strafe."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Was passiert, wenn ein geschlagener Ball versehentlich den Spieler selbst oder sein eigenes Bag trifft?",
    "a": [
      "Der Spieler erhält sofort zwei Strafschläge im Zählspiel notiert",
      "Der Schlag ist straflos und der Ball wird gespielt, wie er liegt",
      "Der Spieler erhält einen Strafschlag und muss den Schlag wiederholen",
      "Der Schlag wird annulliert und straflos an gleicher Stelle wiederholt"
    ],
    "correctIndex": 1,
    "exp": "Wird der Spieler, seine Ausrüstung oder sein Caddie unabsichtlich vom eigenen Ball getroffen, gibt es seit 2019 keinen Strafschlag mehr.",
    "explanation": "Wird der Spieler, seine Ausrüstung oder sein Caddie unabsichtlich vom eigenen Ball getroffen, gibt es seit 2019 keinen Strafschlag mehr."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Was gilt, wenn ein ruhender Ball auf dem Grün durch einen Windstoß an eine neue Stelle gerollt wird?",
    "a": [
      "Er muss immer von der neuen Position weitergespielt werden",
      "Wurde er vorher markiert, muss er straflos zurückgelegt werden",
      "Der Spieler erhält einen Strafschlag wegen vorzeitiger Bewegung",
      "Der Schlag muss vom Abschlag des aktuellen Lochs wiederholt werden"
    ],
    "correctIndex": 1,
    "exp": "Wurde der Ball auf dem Grün bereits aufgenommen und zurückgelegt, muss er nach einer natürlichen Bewegung (Wind/Wasser) straflos zurückgelegt werden.",
    "explanation": "Wurde der Ball auf dem Grün bereits aufgenommen und zurückgelegt, muss er nach einer natürlichen Bewegung (Wind/Wasser) straflos zurückgelegt werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Ein Spieler schlägt im Zählspiel versehentlich den Ball eines anderen Spielers. Welche Strafe droht ihm?",
    "a": [
      "Genau ein Strafschlag und der Ball wird einfach weitergespielt",
      "Genau zwei Strafschläge und der Fehler muss korrigiert werden",
      "Sofortige Disqualifikation für den Rest der gesamten Spielrunde",
      "Keine Strafe, sofern der Irrtum vor dem Putten bemerkt wurde"
    ],
    "correctIndex": 1,
    "exp": "Das Spielen eines falschen Balls kostet zwei Strafschläge. Der Spieler muss den Fehler korrigieren, bevor er am nächsten Abschlag abschlägt.",
    "explanation": "Das Spielen eines falschen Balls kostet zwei Strafschläge. Der Spieler muss den Fehler korrigieren, bevor er am nächsten Abschlag abschlägt."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Welche Konsequenz hat das Spielen eines falschen Balls im klassischen Lochspiel (Match Play)?",
    "a": [
      "Der Spieler erhält zwei Strafschläge und spielt seinen Ball weiter",
      "Der betroffene Spieler verliert unmittelbar dieses einzelne Loch",
      "Das aktuelle Loch wird sofort als unentschieden geteilt gewertet",
      "Der Gegner darf den nächsten Abschlag um zehn Meter vorverlegen"
    ],
    "correctIndex": 1,
    "exp": "Im Match Play führt das Spielen eines falschen Balls (Regel 6.3c) zum sofortigen Verlust des Lochs.",
    "explanation": "Im Match Play führt das Spielen eines falschen Balls (Regel 6.3c) zum sofortigen Verlust des Lochs."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Was passiert, wenn ein Spieler im Zählspiel von außerhalb der vorgesehenen Abschlagszone abschlägt?",
    "a": [
      "Ein Strafschlag und der Ball muss von der neuen Stelle gespielt werden",
      "Zwei Strafschläge und er muss von innerhalb der Zone nachschlagen",
      "Keine Strafe, solange der Ball mindestens das Fairway erreicht hat",
      "Sofortige Disqualifikation wegen grober Unsportlichkeit am Abschlag"
    ],
    "correctIndex": 1,
    "exp": "Der Schlag von außerhalb der Abschlagszone zählt nicht, kostet zwei Strafschläge und muss von innerhalb der Markierungen korrigiert werden.",
    "explanation": "Der Schlag von außerhalb der Abschlagszone zählt nicht, kostet zwei Strafschläge und muss von innerhalb der Markierungen korrigiert werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Wie weit reicht die offizielle Abschlagszone (Teeing Area) hinter den vorderen Begrenzungsmarkierungen?",
    "a": [
      "Exakt eine Schlägerlänge nach hinten",
      "Exakt zwei Schlägerlängen nach hinten",
      "Exakt drei Schlägerlängen nach hinten",
      "Exakt vier Schlägerlängen nach hinten"
    ],
    "correctIndex": 1,
    "exp": "Die Abschlagszone ist ein Rechteck mit der Breite der vorderen Markierungen und einer Tiefe von genau zwei Schlägerlängen.",
    "explanation": "Die Abschlagszone ist ein Rechteck mit der Breite der vorderen Markierungen und einer Tiefe von genau zwei Schlägerlängen."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Was gilt, wenn ein Spieler voll zum Schlag ausholt, den Ball jedoch komplett verfehlt (sogenannter Luftschlag)?",
    "a": [
      "Der Schlagversuch wird ignoriert und darf straflos wiederholt werden",
      "Der Spieler erhält zwei Strafschläge wegen Spielverzögerung",
      "Der Versuch zählt voll als Schlag, der Ball ist nun im Spiel",
      "Der Spieler muss den nächsten Schlag mit einem Putter ausführen"
    ],
    "correctIndex": 2,
    "exp": "Ein Schlag ist die Vorwärtsbewegung des Schlägers mit der Absicht, den Ball zu treffen. Ein Luftschlag zählt daher als voller Schlag.",
    "explanation": "Ein Schlag ist die Vorwärtsbewegung des Schlägers mit der Absicht, den Ball zu treffen. Ein Luftschlag zählt daher als voller Schlag."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Wen darf ein Spieler während einer regulären Runde regelkonform um Schläger- oder Taktikrat fragen?",
    "a": [
      "Jeden beliebigen Mitspieler im gesamten Teilnehmerfeld",
      "Ausschließlich den neutralen Clubspielleiter am Streckenrand",
      "Ausschließlich den eigenen Caddie oder seinen Spielpartner",
      "Niemanden, jede Art von Kommunikation ist streng untersagt"
    ],
    "correctIndex": 2,
    "exp": "Rat (Advice) darf man nur vom eigenen Caddie oder Teampartner erbitten. Fragt man einen Gegner nach dem Schläger, drohen zwei Strafschläge.",
    "explanation": "Rat (Advice) darf man nur vom eigenen Caddie oder Teampartner erbitten. Fragt man einen Gegner nach dem Schläger, drohen zwei Strafschläge."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Welche Funktion an modernen Laser-Entfernungsmessern muss bei Turnieren zwingend deaktiviert sein?",
    "a": [
      "Die Vergrößerungsfunktion des optischen Zielfernrohrs",
      "Die digitale Anzeige der Restdistanz in vollen Metern",
      "Die Neigungsmessung zur Berechnung von Höhenunterschieden",
      "Die automatische Messbestätigung durch leichte Vibration"
    ],
    "correctIndex": 2,
    "exp": "Distanzmesser sind für reine Längen erlaubt. Funktionen wie 'Slope' (Höhenwinkelkompensation) oder Windberechnung müssen abgeschaltet sein.",
    "explanation": "Distanzmesser sind für reine Längen erlaubt. Funktionen wie 'Slope' (Höhenwinkelkompensation) oder Windberechnung müssen abgeschaltet sein."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Was gilt, wenn der Ball eines Spielers auf dem Grün eines falschen Lochs (Wrong Green) zur Ruhe kommt?",
    "a": [
      "Der Spieler darf den Ball mit einem Wedge vorsichtig chippen",
      "Der Spieler muss mit einem Strafschlag zurück auf das Fairway",
      "Das Weiterspielen vom falschen Grün ist streng untersagt",
      "Der Spieler muss sofort zur nächsten Spielbahn vorrücken"
    ],
    "correctIndex": 2,
    "exp": "Zum Schutz der Grüns verbietet Regel 13.1f das Weiterspielen von einem falschen Grün. Es muss zwingend straflose Erleichterung genommen werden.",
    "explanation": "Zum Schutz der Grüns verbietet Regel 13.1f das Weiterspielen von einem falschen Grün. Es muss zwingend straflose Erleichterung genommen werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Welche Konsequenz droht einem Golfer, wenn er im Zählspiel eine Scorekarte mit einem zu niedrigen Einzelergebnis unterschreibt?",
    "a": [
      "Der zu niedrige Score wird um genau zwei Strafschläge erhöht",
      "Der zu niedrige Score wird durch das durchschnittliche Par ersetzt",
      "Der Spieler wird für diesen Wettkampf vollständig disqualifiziert",
      "Der Zähler muss eine Geldstrafe an den Clubvorstand zahlen"
    ],
    "correctIndex": 2,
    "exp": "Wer wissentlich oder versehentlich einen zu niedrigen Score unterschreibt und einreicht, wird disqualifiziert (Regel 3.3b).",
    "explanation": "Wer wissentlich oder versehentlich einen zu niedrigen Score unterschreibt und einreicht, wird disqualifiziert (Regel 3.3b)."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Wie wird gewertet, wenn die eingereichte Schlagzahl auf der Scorekarte versehentlich höher ausfällt als tatsächlich gespielt?",
    "a": [
      "Die Spielleitung korrigiert den Score automatisch nach unten",
      "Der Spieler wird wegen fehlerhafter Scorekartenführung gesperrt",
      "Der eingereichte höhere Score bleibt verbindlich gewertet",
      "Das gesamte Loch wird aus der Wertung der Runde gestrichen"
    ],
    "correctIndex": 2,
    "exp": "Wird ein höherer Score eingereicht als tatsächlich gespielt, bleibt dieser höhere Score zu Ungunsten des Spielers bestehen.",
    "explanation": "Wird ein höherer Score eingereicht als tatsächlich gespielt, bleibt dieser höhere Score zu Ungunsten des Spielers bestehen."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Was bedeutet im Lochspiel (Match Play) der Zustand 'Dormie'?",
    "a": [
      "Beide Spieler liegen nach 18 gespielten Löchern exakt schlaggleich",
      "Das Spiel wurde wegen anhaltender Dunkelheit vorzeitig beendet",
      "Ein Spieler führt mit so vielen Löchern, wie noch zu spielen sind",
      "Ein Spieler hat drei Löcher in ununterbrochener Folge gewonnen"
    ],
    "correctIndex": 2,
    "exp": "'Dormie' bedeutet, dass der führende Spieler mindestens ein Unentschieden sicher hat, da seine Führung der Zahl der verbleibenden Löcher entspricht.",
    "explanation": "'Dormie' bedeutet, dass der führende Spieler mindestens ein Unentschieden sicher hat, da seine Führung der Zahl der verbleibenden Löcher entspricht."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Wie läuft der Schlagablauf beim sogenannten 'Chapman-Vierer' ab?",
    "a": [
      "Beide schlagen ab und spielen nur den jeweils besten eigenen Ball",
      "Ein Spieler schlägt alle geraden, der andere alle ungeraden Löcher",
      "Beide schlagen ab, spielen über Kreuz und wählen dann einen Ball",
      "Beide schlagen gleichzeitig denselben Ball mit zwei Schlägern ab"
    ],
    "correctIndex": 2,
    "exp": "Beim Chapman-Vierer schlagen beide Partner ab, spielen den Ball des Partners als zweiten Schlag und wählen danach einen Ball für abwechselnde Schläge.",
    "explanation": "Beim Chapman-Vierer schlagen beide Partner ab, spielen den Ball des Partners als zweiten Schlag und wählen danach einen Ball für abwechselnde Schläge."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Wie wird beim 'Klassischen Vierer' (Foursome) über die gesamte Runde hinweg gespielt?",
    "a": [
      "Beide Partner spielen eigene Bälle und der bessere Score zählt",
      "Jeder Partner darf nur maximal sieben Schläger im Bag verwenden",
      "Zwei Partner schlagen denselben Ball immer streng abwechselnd",
      "Nach jedem Schlag muss der Putter durchgewechselt werden"
    ],
    "correctIndex": 2,
    "exp": "Im Klassischen Vierer bilden zwei Golfer ein Team und schlagen abwechselnd denselben Ball, wobei die Abschläge aufgeteilt werden.",
    "explanation": "Im Klassischen Vierer bilden zwei Golfer ein Team und schlagen abwechselnd denselben Ball, wobei die Abschläge aufgeteilt werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Wie läuft die beliebte Team-Spielform 'Scramble' nach den Abschlägen typischerweise ab?",
    "a": [
      "Das Team muss zwingend immer den weitesten Abschlag weiterspielen",
      "Jeder Spieler muss an jedem Loch genau zwei Putts ausführen",
      "Alle schlagen ab, wählen den besten Ball und spielen von dort weiter",
      "Die Schläge aller vier Spieler werden zusammengezählt und halbiert"
    ],
    "correctIndex": 2,
    "exp": "Beim Scramble spielen alle Teammitglieder ihren Ball, wählen die beste Position und alle schlagen ihren nächsten Ball von diesem Ort.",
    "explanation": "Beim Scramble spielen alle Teammitglieder ihren Ball, wählen die beste Position und alle schlagen ihren nächsten Ball von diesem Ort."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Was drückt das 'Course Rating' (CR-Wert) eines 18-Loch-Golfplatzes aus?",
    "a": [
      "Die maximale Anzahl an Bunkern und Wasserhindernissen auf dem Kurs",
      "Den durchschnittlichen Zeitaufwand einer vierköpfigen Spielgruppe",
      "Die erwartete Schlagzahl eines Scratch-Golfers bei Normalbedingungen",
      "Die Steilheit der Fairways gemessen im Verhältnis zur Meereshöhe"
    ],
    "correctIndex": 2,
    "exp": "Das Course Rating gibt an, wie viele Schläge ein fehlerfreier Scratch-Golfer (Handicap 0,0) unter normalen Witterungsbedingungen benötigt.",
    "explanation": "Das Course Rating gibt an, wie viele Schläge ein fehlerfreier Scratch-Golfer (Handicap 0,0) unter normalen Witterungsbedingungen benötigt."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Welcher Slope-Wert gilt weltweit als der mathematische Standardwert für einen durchschnittlich schweren Golfplatz?",
    "a": [
      "Ein Slope-Wert von genau 100",
      "Ein Slope-Wert von genau 125",
      "Ein Slope-Wert von genau 113",
      "Ein Slope-Wert von genau 130"
    ],
    "correctIndex": 2,
    "exp": "Der Standardwert von 113 dient im World Handicap System als Basiswert für das Verhältnis von Scratch- zu Bogey-Golfern.",
    "explanation": "Der Standardwert von 113 dient im World Handicap System als Basiswert für das Verhältnis von Scratch- zu Bogey-Golfern."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Wie viele der letzten 20 Runden fließen im World Handicap System (WHS) in die Berechnung des Handicap-Index ein?",
    "a": [
      "Alle 20 Runden fließen zu gleichen Teilen ein",
      "Die besten 10 der letzten 20 gewerteten Runden",
      "Die besten 8 der letzten 20 gewerteten Runden",
      "Ausschließlich die letzten 5 gespielten Runden"
    ],
    "correctIndex": 2,
    "exp": "Der Handicap-Index basiert im WHS auf dem Durchschnitt der besten 8 Score Differentials aus den letzten 20 registrierten Runden.",
    "explanation": "Der Handicap-Index basiert im WHS auf dem Durchschnitt der besten 8 Score Differentials aus den letzten 20 registrierten Runden."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Was passiert, wenn der Ball während des Schlags in mehrere Bruchstücke zerbricht?",
    "a": [
      "Das größte Bruchstück muss an die Fahne gespielt werden",
      "Der Spieler erhält zwei Strafschläge für schlechtes Material",
      "Der Schlag wird annulliert und muss straflos wiederholt werden",
      "Der Ball gilt als unspielbar und muss mit Strafschlag gedroppt werden"
    ],
    "correctIndex": 2,
    "exp": "Zerbricht ein Ball infolge eines Schlags, zählt der Schlag nicht. Der Spieler legt einen neuen Ball an die alte Stelle und schlägt erneut.",
    "explanation": "Zerbricht ein Ball infolge eines Schlags, zählt der Schlag nicht. Der Spieler legt einen neuen Ball an die alte Stelle und schlägt erneut."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Ein Vogel greift sich den ruhenden Ball auf dem Fairway und fliegt damit davon. Wie wird verfahren?",
    "a": [
      "Der Ball gilt als verloren und muss vom Abschlag neu gespielt werden",
      "Der Spieler muss von der Stelle weiterspielen, wo der Vogel ihn fallen lässt",
      "Ein neuer Ball muss an die geschätzte alte Stelle gelegt werden",
      "Der Spieler erhält einen Strafschlag wegen Fremdeinwirkung durch Tiere"
    ],
    "correctIndex": 2,
    "exp": "Tiere sind 'äußere Einflüsse'. Wird ein ruhender Ball von ihnen bewegt, muss straflos ein Ball an die ursprüngliche Stelle zurückgelegt werden.",
    "explanation": "Tiere sind 'äußere Einflüsse'. Wird ein ruhender Ball von ihnen bewegt, muss straflos ein Ball an die ursprüngliche Stelle zurückgelegt werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Was gilt, wenn ein Spieler im Sandbunker vor dem Schlag den Sand direkt vor oder hinter dem Ball mit dem Schläger berührt?",
    "a": [
      "Das Berühren ist straffrei, solange der Ball sich nicht bewegt",
      "Er erhält genau einen Strafschlag und muss den Sand glätten",
      "Er erhält die Grundstrafe (zwei Strafschläge bzw. Lochverlust)",
      "Er wird für die laufende Runde umgehend disqualifiziert"
    ],
    "correctIndex": 2,
    "exp": "Das Aufsetzen des Schlägers direkt vor oder hinter dem Ball im Bunker ist weiterhin verboten und zieht die Grundstrafe nach sich.",
    "explanation": "Das Aufsetzen des Schlägers direkt vor oder hinter dem Ball im Bunker ist weiterhin verboten und zieht die Grundstrafe nach sich."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Darf ein Spieler Schäden auf dem Grün wie Spikemarken oder alte Lochpfropfen vor seinem Putt ausbessern?",
    "a": [
      "Nein, nur echte Einschlaglöcher von Golfbällen dürfen geglättet werden",
      "Nur wenn der gegnerische Zähler die Erlaubnis schriftlich erteilt",
      "Ja, fast alle Schäden auf dem Grün dürfen straflos repariert werden",
      "Nur Schäden, die mindestens zwei Meter von der Puttlinie entfernt sind"
    ],
    "correctIndex": 2,
    "exp": "Seit 2019 dürfen Spikemarken, Schuhschäden und Tierabdrücke auf dem Grün vor dem Putt straflos ausgebessert werden.",
    "explanation": "Seit 2019 dürfen Spikemarken, Schuhschäden und Tierabdrücke auf dem Grün vor dem Putt straflos ausgebessert werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Was passiert bei einer Spielunterbrechung wegen akuter Blitzgefahr durch einen Signalton der Spielleitung?",
    "a": [
      "Die Spieler dürfen das aktuelle Loch noch in Ruhe zu Ende spielen",
      "Es darf weitergespielt werden, sofern kein Regen niedergeht",
      "Das Spiel muss unverzüglich an Ort und Stelle unterbrochen werden",
      "Die Spieler müssen ihre Bälle sofort im nächsten Bunker vergraben"
    ],
    "correctIndex": 2,
    "exp": "Bei drohender Blitzgefahr (ein langer Signalton) muss das Spiel aus Sicherheitsgründen sofort gestoppt werden. Weiterspielen führt zur Disqualifikation.",
    "explanation": "Bei drohender Blitzgefahr (ein langer Signalton) muss das Spiel aus Sicherheitsgründen sofort gestoppt werden. Weiterspielen führt zur Disqualifikation."
  },
  {
    "cat": "golf_regeln",
    "diff": "mid",
    "q": "Was gilt, wenn ein Schläger während eines normalen Schlags unabsichtlich bricht?",
    "a": [
      "Er darf unter keinen Umständen im laufenden Spiel ersetzt werden",
      "Der Spieler muss die Runde mit nur 13 Schlägern beenden",
      "Er darf seit 2023 durch einen beliebigen Schläger ersetzt werden",
      "Der Spieler scheidet automatisch aus dem Turnier aus"
    ],
    "correctIndex": 2,
    "exp": "Nach der Regelreform 2023 darf ein während der Runde beschädigter Schläger ersetzt werden, sofern die Beschädigung nicht durch Wut entstand.",
    "explanation": "Nach der Regelreform 2023 darf ein während der Runde beschädigter Schläger ersetzt werden, sofern die Beschädigung nicht durch Wut entstand."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Was besagt die optionale 'Model Local Rule E-5' bei einem ins Aus geschlagenen oder verlorenen Ball?",
    "a": [
      "Ein Strafschlag und Drop auf der Mitte des aktuellen Fairways",
      "Strafloses Nachschlagen vom Abschlag ohne Verlust von Distanz",
      "Drei Strafschläge und freies Verlegen auf das Grün des Lochs",
      "Zwei Strafschläge und Drop am nächsten Fairwayrand zur Verluststelle"
    ],
    "correctIndex": 3,
    "exp": "Local Rule E-5 spart Zeit: Statt zurück zum Abschlag zu gehen, droppt man mit 2 Strafschlägen am Fairwayrand auf Höhe des Ballverlusts.",
    "explanation": "Local Rule E-5 spart Zeit: Statt zurück zum Abschlag zu gehen, droppt man mit 2 Strafschlägen am Fairwayrand auf Höhe des Ballverlusts."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Wo darf der Caddie eines Spielers ab dem Einnehmen der Standposition für den Schlag keinesfalls stehen?",
    "a": [
      "In einem Abstand von weniger als drei Metern seitlich des Spielers",
      "Auf dem Vorgrün, wenn der Spieler noch vom Fairway schlägt",
      "Hinter dem Flaggenstock auf der gegenüberliegenden Seite des Lochs",
      "Auf der rückwärtigen Verlängerung der Spiellinie hinter dem Spieler"
    ],
    "correctIndex": 3,
    "exp": "Regel 10.2b verbietet es dem Caddie, hinter dem Spieler zu stehen, um beim Ausrichten des Stands auf das Ziel zu helfen.",
    "explanation": "Regel 10.2b verbietet es dem Caddie, hinter dem Spieler zu stehen, um beim Ausrichten des Stands auf das Ziel zu helfen."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Was passiert, wenn ein Spieler im Zorn seinen Putter über das Knie biegt und damit weiterspielt?",
    "a": [
      "Er erhält zwei Strafschläge für das Verbiegen des Schlägerschafts",
      "Er darf straflos weiterspielen, solange der Schläger noch ganz ist",
      "Er muss das Loch aufgeben und erhält null Stableford-Punkte",
      "Er wird disqualifiziert, da absichtlich veränderte Schläger verboten sind"
    ],
    "correctIndex": 3,
    "exp": "Schläger, die vorsätzlich während der Runde beschädigt wurden, dürfen weder ersetzt noch für weitere Schläge benutzt werden (Disqualifikation).",
    "explanation": "Schläger, die vorsätzlich während der Runde beschädigt wurden, dürfen weder ersetzt noch für weitere Schläge benutzt werden (Disqualifikation)."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Wie viele Strafschläge drohen im Zählspiel maximal, wenn ein Spieler unbemerkt mit 15 Schlägern die Runde beginnt?",
    "a": [
      "Maximal 2 Strafschläge für die gesamte gespielte Runde",
      "Sofortige Disqualifikation beim Betreten des ersten Grüns",
      "Genau 6 Strafschläge, aufgeteilt auf die ersten drei Löcher",
      "Maximal 4 Strafschläge (zwei Schläge pro betroffenes Loch)"
    ],
    "correctIndex": 3,
    "exp": "Die Strafe beträgt zwei Schläge pro Loch, gedeckelt auf maximal vier Strafschläge pro Runde. Der überzählige Schläger muss sofort aus dem Spiel genommen werden.",
    "explanation": "Die Strafe beträgt zwei Schläge pro Loch, gedeckelt auf maximal vier Strafschläge pro Runde. Der überzählige Schläger muss sofort aus dem Spiel genommen werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Was gilt, wenn ein Spieler vor dem Putt absichtlich einen Ball über das Grün rollen lässt, um das Break zu testen?",
    "a": [
      "Das Testen ist straffrei, solange kein Schläger den Boden berührt",
      "Er erhält genau einen Strafschlag und muss den Ball säubern",
      "Er verliert das Anrecht auf die Nutzung eines Flaggenstocks",
      "Er erhält die Grundstrafe (zwei Strafschläge im Zählspiel)"
    ],
    "correctIndex": 3,
    "exp": "Das Testen der Oberfläche eines Grüns durch Reiben oder Rollenlassen eines Balls ist nach Regel 13.1e streng verboten (Grundstrafe).",
    "explanation": "Das Testen der Oberfläche eines Grüns durch Reiben oder Rollenlassen eines Balls ist nach Regel 13.1e streng verboten (Grundstrafe)."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Wann darf ein aufzunehmender Ball im Gelände ausnahmsweise NICHT gereinigt werden?",
    "a": [
      "Wenn er auf einem frisch besandeten Fairwayabschnitt liegt",
      "Wenn er vor dem Weiterspielen hinter einem Baum gedroppt wird",
      "Wenn er bei feuchtem Regenwetter aus dem Rough aufgenommen wird",
      "Wenn er zur Feststellung der eigenen Ballidentität aufgenommen wird"
    ],
    "correctIndex": 3,
    "exp": "Wird ein Ball nur aufgenommen, um zu prüfen, ob es der eigene Ball ist, darf er nur so weit gereinigt werden, wie zur Identifikation nötig.",
    "explanation": "Wird ein Ball nur aufgenommen, um zu prüfen, ob es der eigene Ball ist, darf er nur so weit gereinigt werden, wie zur Identifikation nötig."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Was muss ein Golfer tun, bevor er einen Ball im tiefen Rough zur Identifikation aufnimmt?",
    "a": [
      "Zwingend auf das Eintreffen eines lizenzierten Referees warten",
      "Den Ball mit dem Schlägerkopf drehen, ohne ihn hochzuheben",
      "Den Ball lautstark vor allen Mitspielern beim Namen rufen",
      "Seine Absicht ankündigen und die Lage des Balls vorher markieren"
    ],
    "correctIndex": 3,
    "exp": "Nach Regel 7.3 muss die Position vor dem Aufnehmen markiert werden. Die vorherige Ankündigung beugt Streitigkeiten vor.",
    "explanation": "Nach Regel 7.3 muss die Position vor dem Aufnehmen markiert werden. Die vorherige Ankündigung beugt Streitigkeiten vor."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Ein Ball prallt vom Baum ab und bleibt direkt in der Tasche des Mitspielers hängen. Wie geht es weiter?",
    "a": [
      "Der Ball muss mit einem Strafschlag vom Abschlag wiederholt werden",
      "Der Mitspieler erhält zwei Strafschläge wegen unerlaubter Behinderung",
      "Der Ball muss direkt aus der offenen Golftasche geschlagen werden",
      "Erleichterung unterhalb der Stelle des Bags bestimmen und straflos droppen"
    ],
    "correctIndex": 3,
    "exp": "Bleibt ein Ball in einem beweglichen Gegenstand zur Ruhe, droppt man straffrei im 1-Schlägerlängen-Bereich direkt unterhalb dieses Punkts.",
    "explanation": "Bleibt ein Ball in einem beweglichen Gegenstand zur Ruhe, droppt man straffrei im 1-Schlägerlängen-Bereich direkt unterhalb dieses Punkts."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Welche strenge Regelung gilt seit 2022 für sogenannte 'Green-Reading-Materials' auf der Profitour?",
    "a": [
      "Bücher mit handschriftlichen Notizen sind komplett untersagt",
      "Die Spieler dürfen auf dem Grün überhaupt keine Notizen ansehen",
      "Es dürfen nur noch digital geprüfte iPad-Apps genutzt werden",
      "Detaillierte Neigungskarten sind auf strenge Mindestmaßstäbe begrenzt"
    ],
    "correctIndex": 3,
    "exp": "Auf Profi-Touren wurden detaillierte Höhenlinien-Karten streng reglementiert, um das eigenständige Lesen der Grüns durch die Spieler zu fördern.",
    "explanation": "Auf Profi-Touren wurden detaillierte Höhenlinien-Karten streng reglementiert, um das eigenständige Lesen der Grüns durch die Spieler zu fördern."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Kann ein einmal mündlich ausgesprochenes Schenken im Lochspiel nachträglich zurückgenommen werden?",
    "a": [
      "Ja, solange der Ball noch nicht vom Grün aufgenommen wurde",
      "Ja, wenn der Spieler innerhalb von 30 Sekunden protestiert",
      "Nur wenn der Platzrichter dem Widerruf ausdrücklich zustimmt",
      "Nein, ein Schenken ist sofort endgültig und absolut bindend"
    ],
    "correctIndex": 3,
    "exp": "Ein Schenken eines Schlags oder Lochs ist nach Regel 3.2b unwiderruflich und kann nicht zurückgezogen werden.",
    "explanation": "Ein Schenken eines Schlags oder Lochs ist nach Regel 3.2b unwiderruflich und kann nicht zurückgezogen werden."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Was geschieht, wenn ein Spieler bei der Regelerleichterung versehentlich aus Hüfthöhe droppt und schlägt?",
    "a": [
      "Der Schlag ist straffrei, die Dropphöhe ist eine reine Empfehlung",
      "Er wird sofort für die gesamte Spielrunde disqualifiziert",
      "Der Schlag muss zwingend ohne Strafe wiederholt werden",
      "Er erhält einen Strafschlag für das Spielen vom falschen Ort"
    ],
    "correctIndex": 3,
    "exp": "Wird der Ball falsch gedroppt und nicht vor Ausführung des Schlags korrigiert, kassiert der Spieler einen Strafschlag nach Regel 14.3b.",
    "explanation": "Wird der Ball falsch gedroppt und nicht vor Ausführung des Schlags korrigiert, kassiert der Spieler einen Strafschlag nach Regel 14.3b."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Was bedeutet der Begriff 'Playing Handicap' im Vergleich zum offiziellen Handicap-Index?",
    "a": [
      "Die rein rechnerische Differenz zwischen Brutto- und Nettoergebnis",
      "Das historische Handicap, das ein Spieler in seiner Jugend hatte",
      "Die maximale Anzahl an Strafschlägen, die ein Golfer erhalten darf",
      "Die auf Course Rating und Slope des Platzes angepasste Schlagvorgabe"
    ],
    "correctIndex": 3,
    "exp": "Das Playing Handicap (Spielvorgabe) errechnet sich aus Handicap-Index, Slope Rating und Course Rating minus Par für den konkreten Platz.",
    "explanation": "Das Playing Handicap (Spielvorgabe) errechnet sich aus Handicap-Index, Slope Rating und Course Rating minus Par für den konkreten Platz."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Darf ein Spieler Tau, Reif oder Wasser auf seiner Puttlinie vor dem Schlag wegwischen?",
    "a": [
      "Ja, Tau und Reif gelten regeltechnisch als lose Naturkörper",
      "Nur mit einem feuchten Handtuch, nicht mit bloßen Händen",
      "Nur wenn der Putt länger als zehn Meter zum Loch entfernt ist",
      "Nein, das Beseitigen von Tau oder Reif ist streng verboten"
    ],
    "correctIndex": 3,
    "exp": "Tau, Reif und natürliches Wasser dürfen nach Regel 8.1 nicht auf der Spiellinie entfernt werden (Grundstrafe).",
    "explanation": "Tau, Reif und natürliches Wasser dürfen nach Regel 8.1 nicht auf der Spiellinie entfernt werden (Grundstrafe)."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Was passiert, wenn ein Spieler den Ball beim Suchen im hohen Rough versehentlich mit dem Fuß kickt?",
    "a": [
      "Er erhält einen Strafschlag und spielt den Ball von dort weiter",
      "Er erhält zwei Strafschläge für die unerlaubte Ballberührung",
      "Er muss den Ball aufnehmen und einen Strafschlag notieren",
      "Es ist straflos, der Ball muss an die ursprüngliche Stelle zurück"
    ],
    "correctIndex": 3,
    "exp": "Seit 2019 ist das versehentliche Bewegen des Balls während des Suchens nach Regel 7.4 völlig straflos; der Ball wird zurückgelegt.",
    "explanation": "Seit 2019 ist das versehentliche Bewegen des Balls während des Suchens nach Regel 7.4 völlig straflos; der Ball wird zurückgelegt."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Darf ein Spieler während des Schlags ein Hilfsmittel zur künstlichen Standstabilisierung nutzen?",
    "a": [
      "Ja, sofern der Boden im feuchten Gelände extrem rutschig ist",
      "Nur wenn der Spieler ein ärztliches Attest für Knieprobleme hat",
      "Nur wenn der Schläger kürzer als 35 Inch Gesamtlänge ist",
      "Nein, jede künstliche Standhilfe zieht die Grundstrafe nach sich"
    ],
    "correctIndex": 3,
    "exp": "Regel 10.2b untersagt das Errichten von Erhöhungen oder künstlichen Stützen für die Füße beim Schlag.",
    "explanation": "Regel 10.2b untersagt das Errichten von Erhöhungen oder künstlichen Stützen für die Füße beim Schlag."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Was gilt, wenn zwei Bälle auf dem Grün kollidieren, nachdem ein Spieler von außerhalb des Grüns chippte?",
    "a": [
      "Beide Spieler erhalten jeweils genau einen Strafschlag notiert",
      "Der Schlagende muss seinen Schlag vom Vorgrün aus wiederholen",
      "Der getroffene Ball wird von seiner neuen Lage weitergespielt",
      "Der Schlag ist straffrei, der ruhende Ball muss zurückgelegt werden"
    ],
    "correctIndex": 3,
    "exp": "Lag der getroffene Ball in Ruhe auf dem Grün, wird er straflos zurückgelegt; der gespielte Ball bleibt liegen, wie er liegt. Strafe gäbe es nur bei Putt zu Putt auf dem Grün.",
    "explanation": "Lag der getroffene Ball in Ruhe auf dem Grün, wird er straflos zurückgelegt; der gespielte Ball bleibt liegen, wie er liegt. Strafe gäbe es nur bei Putt zu Putt auf dem Grün."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Was passiert, wenn zwei Bälle kollidieren, wenn BEIDE vor dem Schlag bereits auf dem Grün lagen?",
    "a": [
      "Beide Spieler erhalten straffrei einen Wiederholungsschlag",
      "Der ruhende Ball wird straffrei aus dem Spiel genommen",
      "Beide Spieler teilen sich das Loch automatisch im Match Play",
      "Der Spieler, der puttete, erhält zwei Strafschläge im Zählspiel"
    ],
    "correctIndex": 3,
    "exp": "Liegen beide Bälle auf dem Grün und ein geputteter Ball trifft den anderen ruhenden Ball, kassiert der Puttende 2 Strafschläge (Regel 11.1a).",
    "explanation": "Liegen beide Bälle auf dem Grün und ein geputteter Ball trifft den anderen ruhenden Ball, kassiert der Puttende 2 Strafschläge (Regel 11.1a)."
  },
  {
    "cat": "golf_regeln",
    "diff": "pro",
    "q": "Wer ist nach Beendigung einer vorgabewirksamen Runde für die Richtigkeit der Lochergebnisse verantwortlich?",
    "a": [
      "Ausschließlich der angestellte Clubspielleiter im Sekretariat",
      "Ausschließlich der Spieler selbst, der Zähler haftet niemals",
      "Der Clubpräsident nach Einsicht aller digitaler Messdaten",
      "Sowohl der Spieler als auch sein designierter Zähler (Marker)"
    ],
    "correctIndex": 3,
    "exp": "Nach Regel 3.3b müssen sowohl der Zähler als auch der Spieler die Scorekarte abgleichen und mit ihrer Unterschrift bestätigen.",
    "explanation": "Nach Regel 3.3b müssen sowohl der Zähler als auch der Spieler die Scorekarte abgleichen und mit ihrer Unterschrift bestätigen."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("golf_regeln", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["golf_regeln"] = DATA;
  }
})();
