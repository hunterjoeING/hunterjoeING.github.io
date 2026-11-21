// Unified quiz bank for "fussball_regeln" (75 questions)
(function () {
  const DATA = [
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "In welcher Spielsituation ist die Abseitsregel laut den offiziellen IFAB-Fußballregeln komplett aufgehoben?",
    "a": [
      "Direkt nach einem Einwurf",
      "Nach einem indirekten Freistoß",
      "Nach einem Abpraller von der Latte",
      "Wenn der Schiedsrichter im Weg steht"
    ],
    "explanation": "Bei Einwurf, Eckstoß und Abstoß kann ein Spieler niemals im strafbaren Abseits stehen.",
    "exp": "Bei Einwurf, Eckstoß und Abstoß kann ein Spieler niemals im strafbaren Abseits stehen."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "In welchem Jahr wurde die revolutionäre Rückpassregel eingeführt, um defensives Zeitspiel zu verhindern?",
    "a": [
      "1992",
      "1986",
      "1998",
      "2004"
    ],
    "explanation": "Nach der defensiven EM 1992 durften Torhüter gezielte Fußpässe von Mitspielern nicht mehr mit den Händen aufnehmen.",
    "exp": "Nach der defensiven EM 1992 durften Torhüter gezielte Fußpässe von Mitspielern nicht mehr mit den Händen aufnehmen."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Wodurch ließ sich Schiedsrichter-Legende Ken Aston zur Erfindung der Gelben und Roten Karten inspirieren?",
    "a": [
      "Durch Verkehrsampeln",
      "Durch bunte Warnflaggen",
      "Durch Spielkarten im Casino",
      "Durch farbige Eisenbahnsignale"
    ],
    "explanation": "An einer Londoner Straßenkreuzung kam Aston an einer Ampel die Idee für eine international verständliche Farbsprache.",
    "exp": "An einer Londoner Straßenkreuzung kam Aston an einer Ampel die Idee für eine international verständliche Farbsprache."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Welche Maße hat ein reguläres Fußballtor nach den offiziellen IFAB-Regeln (in Metern)?",
    "a": [
      "7,32 m breit und 2,44 m hoch",
      "7,50 m breit und 2,50 m hoch",
      "7,20 m breit und 2,40 m hoch",
      "7,40 m breit und 2,45 m hoch"
    ],
    "explanation": "Die krummen Metermaße resultieren aus den traditionellen englischen Maßeinheiten: 8 Yards breit und 8 Feet hoch.",
    "exp": "Die krummen Metermaße resultieren aus den traditionellen englischen Maßeinheiten: 8 Yards breit und 8 Feet hoch."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Welcher legendäre Trainer prägte 1998 bei Bayern München die Wutrede mit den Worten 'Ich habe fertig!'?",
    "a": [
      "Giovanni Trapattoni",
      "Otto Rehhagel",
      "Erich Ribbeck",
      "Ottmar Hitzfeld"
    ],
    "explanation": "Trapattonis Abrechnung ('Was erlauben Strunz?', 'Schwach wie eine Flasche leer') wurde zum Kult-Klassiker.",
    "exp": "Trapattonis Abrechnung ('Was erlauben Strunz?', 'Schwach wie eine Flasche leer') wurde zum Kult-Klassiker."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Wie lautet das berühmte Bonmot von Gary Lineker über Fußball und die deutsche Nationalmannschaft?",
    "a": [
      "Am Ende gewinnen immer die Deutschen",
      "Gegen Deutschland braucht man 12 Spieler",
      "Deutsche Tore zählen im Zweifel doppelt",
      "Ein Spiel dauert 90 Minuten und Elfmeter"
    ],
    "explanation": "Linekers Zitat von 1990: 'Fußball ist ein Spiel, bei dem 22 Männer dem Ball nachjagen, und am Ende gewinnen immer die Deutschen.'",
    "exp": "Linekers Zitat von 1990: 'Fußball ist ein Spiel, bei dem 22 Männer dem Ball nachjagen, und am Ende gewinnen immer die Deutschen.'"
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Was passiert laut Regelwerk, wenn ein Einwurf direkt und ohne weitere Berührung im gegnerischen Tor landet?",
    "a": [
      "Abstoß für den Gegner",
      "Tor wird anerkannt",
      "Eckstoß für den Einwerfer",
      "Wiederholung des Einwurfs"
    ],
    "explanation": "Aus einem Einwurf kann niemals direkt ein gültiges Tor erzielt werden – es geht mit Abstoß weiter.",
    "exp": "Aus einem Einwurf kann niemals direkt ein gültiges Tor erzielt werden – es geht mit Abstoß weiter."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Welcher ehemalige Nationalspieler schuf die legendäre Weisheit 'Zuerst hatten wir kein Glück, und dann kam auch noch Pech dazu'?",
    "a": [
      "Jürgen Wegmann",
      "Andreas Brehme",
      "Mario Basler",
      "Horst Hrubesch"
    ],
    "explanation": "'Kobra' Wegmann war für seine entwaffnend ehrlichen Sprüche nach den Spielen bekannt.",
    "exp": "'Kobra' Wegmann war für seine entwaffnend ehrlichen Sprüche nach den Spielen bekannt."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Welcher Schiedsrichter-Assistent darf seit 2018 bei klaren Fehlentscheidungen per Funk eingreifen?",
    "a": [
      "Video Assistant Referee (VAR)",
      "Vierter Offizieller",
      "Torlinien-Richter",
      "Technischer Delegierter"
    ],
    "explanation": "Der Videoassistent prüft Tore, Rote Karten, Strafstöße und Spielerverwechslungen.",
    "exp": "Der Videoassistent prüft Tore, Rote Karten, Strafstöße und Spielerverwechslungen."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Welcher Taktik-Begriff beschreibt das sofortige Attackieren des Gegners direkt nach eigenem Ballverlust?",
    "a": [
      "Gegenpressing",
      "Catenaccio",
      "Tiki-Taka",
      "Manndeckung"
    ],
    "explanation": "Jürgen Klopp perfektionierte das Gegenpressing und nannte es den 'besten Spielmacher der Welt'.",
    "exp": "Jürgen Klopp perfektionierte das Gegenpressing und nannte es den 'besten Spielmacher der Welt'."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Wie viele Spieler müssen laut Fußballregelwerk mindestens pro Mannschaft auf dem Platz stehen, damit ein Spiel fortgesetzt wird?",
    "a": [
      "Mindestens 7 Spieler",
      "Mindestens 8 Spieler",
      "Mindestens 6 Spieler",
      "Mindestens 9 Spieler"
    ],
    "explanation": "Sinkt eine Mannschaft durch Platzverweise oder Verletzungen unter 7 Spieler, muss der Schiedsrichter abbrechen.",
    "exp": "Sinkt eine Mannschaft durch Platzverweise oder Verletzungen unter 7 Spieler, muss der Schiedsrichter abbrechen."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Welcher deutsche Weltmeister prägte den trockenen Spruch 'Haste Scheiße am Fuß, haste Scheiße am Fuß!'?",
    "a": [
      "Andreas Brehme",
      "Lothar Matthäus",
      "Rudi Völler",
      "Olaf Thon"
    ],
    "explanation": "Brehme brachte mit diesem Zitat eine anhaltende Pechsträhne treffsicher auf den Punkt.",
    "exp": "Brehme brachte mit diesem Zitat eine anhaltende Pechsträhne treffsicher auf den Punkt."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Wie weit muss die Abwehrmauer bei einem Freistoß mindestens vom Ball entfernt stehen?",
    "a": [
      "9,15 Meter",
      "10,00 Meter",
      "8,50 Meter",
      "9,50 Meter"
    ],
    "explanation": "9,15 Meter entsprechen exakt dem englischen Maß von 10 Yards.",
    "exp": "9,15 Meter entsprechen exakt dem englischen Maß von 10 Yards."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Welche Taktik beschreibt einen nominellen Mittelstürmer, der sich ins Mittelfeld fallen lässt, um Räume zu öffnen?",
    "a": [
      "Falsche Neun",
      "Flügelflitzer",
      "Stoßstürmer",
      "Abfangjäger"
    ],
    "explanation": "Pep Guardiola setzte Lionel Messi bei Barcelona weltberühmt als hängende 'Falsche Neun' ein.",
    "exp": "Pep Guardiola setzte Lionel Messi bei Barcelona weltberühmt als hängende 'Falsche Neun' ein."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Welche Strafe gibt es, wenn der Torwart einen absichtlichen Rückpass mit dem Fuß unerlaubt mit den Händen aufnimmt?",
    "a": [
      "Indirekter Freistoß",
      "Strafstoß (Elfmeter)",
      "Direkter Freistoß",
      "Gelbe Karte und Abstoß"
    ],
    "explanation": "Der indirekte Freistoß wird an dem Ort ausgeführt, an dem der Torwart den Ball berührt hat.",
    "exp": "Der indirekte Freistoß wird an dem Ort ausgeführt, an dem der Torwart den Ball berührt hat."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Welches TV-Duo überbrückte beim 'Torfall von Madrid' 1998 76 Minuten lang unterhaltsam die Sendezeit?",
    "a": [
      "Günther Jauch und Marcel Reif",
      "Gerhard Delling und Günter Netzer",
      "Reinhold Beckmann und Pelé",
      "Johannes B. Kerner und Franz Beckenbauer"
    ],
    "explanation": "Reifs Satz 'Noch nie hätte ein Tor dem Spiel so gutgetan' brachte den beiden den Bayerischen Fernsehpreis ein.",
    "exp": "Reifs Satz 'Noch nie hätte ein Tor dem Spiel so gutgetan' brachte den beiden den Bayerischen Fernsehpreis ein."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Welches Spielsystem mit freiem Ausputzer hinter der Abwehr dominierte bis in die 1990er-Jahre den deutschen Fußball?",
    "a": [
      "Libero-System",
      "Viererkette",
      "Flache Vier",
      "Tiki-Taka"
    ],
    "explanation": "Franz Beckenbauer interpretierte den Libero offensiv, während Klaus Augenthaler oder Matthäus den Posten perfektionierten.",
    "exp": "Franz Beckenbauer interpretierte den Libero offensiv, während Klaus Augenthaler oder Matthäus den Posten perfektionierten."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Darf ein Spieler einen Strafstoß (Elfmeter) regelkonform als Pass zu einem Mitspieler ausführen?",
    "a": [
      "Ja, wenn der Ball nach vorne rollt",
      "Nein, Direktschuss ist zwingend",
      "Nur in der regulären Nachspielzeit",
      "Nur wenn der Torwart zustimmt"
    ],
    "explanation": "Cruyff und Olsen 1982 sowie Messi und Suárez 2016 führten den Elfmeter-Doppelpass berühmt vor.",
    "exp": "Cruyff und Olsen 1982 sowie Messi und Suárez 2016 führten den Elfmeter-Doppelpass berühmt vor."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Welche Farbe hat der Ball, wenn im Winter auf schneebedecktem Rasen gespielt werden muss?",
    "a": [
      "Kräftiges Orange oder Gelb",
      "Leuchtendes Blau",
      "Dunkles Rot",
      "Neongrün"
    ],
    "explanation": "Farbige Winterbälle sorgen bei Schneefall für den notwendigen Kontrast für Spieler und TV-Zuschauer.",
    "exp": "Farbige Winterbälle sorgen bei Schneefall für den notwendigen Kontrast für Spieler und TV-Zuschauer."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Welcher Begriff bezeichnet das extrem defensive italienische Taktiksystem der 1960er-Jahre mit Riegel und Kontern?",
    "a": [
      "Catenaccio",
      "Totalvoetbal",
      "Jogo Bonito",
      "Tiki-Taka"
    ],
    "explanation": "Catenaccio bedeutet wörtlich 'Türriegel' und wurde von Helenio Herrera bei Inter Mailand perfektioniert.",
    "exp": "Catenaccio bedeutet wörtlich 'Türriegel' und wurde von Helenio Herrera bei Inter Mailand perfektioniert."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Wie viele Auswechslungen sind seit der Regeländerung während der Corona-Pandemie pro Mannschaft im Spiel erlaubt?",
    "a": [
      "Fünf Auswechslungen",
      "Drei Auswechslungen",
      "Vier Auswechslungen",
      "Sechs Auswechslungen"
    ],
    "explanation": "Die fünf Wechsel müssen innerhalb von maximal drei Wechselfenstern (zuzüglich der Halbzeitpause) vollzogen werden.",
    "exp": "Die fünf Wechsel müssen innerhalb von maximal drei Wechselfenstern (zuzüglich der Halbzeitpause) vollzogen werden."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "easy",
    "q": "Was muss der Schiedsrichter entscheiden, wenn ein Auswechselspieler auf den Platz läuft und einen torgefährlichen Ball berührt?",
    "a": [
      "Direkter Freistoß und Rote Karte",
      "Schiedsrichterball und Gelbe Karte",
      "Wiederholung des Spielzugs",
      "Indirekter Freistoß und Verwarnung"
    ],
    "explanation": "Seit einer Regelnovelle zieht der unberechtigte Eingriff eines Teamoffiziellen oder Spielers einen direkten Freistoß nach sich.",
    "exp": "Seit einer Regelnovelle zieht der unberechtigte Eingriff eines Teamoffiziellen oder Spielers einen direkten Freistoß nach sich."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welcher Torwart erzielte 2004 für Schalke einen Elfmeter und kassierte beim Zurücklaufen direkt ein Gegentor von Mike Hanke?",
    "a": [
      "Hans-Jörg Butt",
      "Frank Rost",
      "Oliver Reck",
      "Christofer Heimeroth"
    ],
    "explanation": "Butt klatschte noch mit Mitspielern ab, während Hanke vom Anstoßkreis direkt ins verwaiste Schalker Tor traf.",
    "exp": "Butt klatschte noch mit Mitspielern ab, während Hanke vom Anstoßkreis direkt ins verwaiste Schalker Tor traf."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welcher Trainer wechselte 1995 bei Bayern München versehentlich vier Vertragsamateure ein, worauf das Spiel gewertet wurde?",
    "a": [
      "Otto Rehhagel",
      "Giovanni Trapattoni",
      "Franz Beckenbauer",
      "Klaus Augenthaler"
    ],
    "explanation": "Rehhagel brachte Hamann, Nerlinger, Zickler und Dreher – damals waren nur drei Amateure gleichzeitig erlaubt.",
    "exp": "Rehhagel brachte Hamann, Nerlinger, Zickler und Dreher – damals waren nur drei Amateure gleichzeitig erlaubt."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Was passiert laut Regelwerk, wenn ein Spieler den Ball beim eigenen Abstoß direkt ins eigene Tor schießt?",
    "a": [
      "Eckstoß für den Gegner",
      "Eigentor zählt",
      "Wiederholung des Abstoßes",
      "Indirekter Freistoß"
    ],
    "explanation": "Aus einem Abstoß oder Freistoß kann niemals ein direktes Eigentor entstehen; es gibt Eckstoß für den Gegner.",
    "exp": "Aus einem Abstoß oder Freistoß kann niemals ein direktes Eigentor entstehen; es gibt Eckstoß für den Gegner."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welcher Spieler erlitt 1981 nach einem Foul von Norbert Siegmann eine 25 cm lange Fleischwunde am Oberschenkel?",
    "a": [
      "Ewald Lienen",
      "Paul Breitner",
      "Karl-Heinz Rummenigge",
      "Bernd Schuster"
    ],
    "explanation": "Trotz offener Wunde sprang Lienen auf und rannte wutentbrannt zu Bremens Trainerbank zu Otto Rehhagel.",
    "exp": "Trotz offener Wunde sprang Lienen auf und rannte wutentbrannt zu Bremens Trainerbank zu Otto Rehhagel."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Was entschied Schiedsrichter Ahlenfelder 1975, nachdem er die erste Halbzeit nach 32 Minuten abgepfiffen hatte?",
    "a": [
      "Er ließ 13 Minuten weiterspielen",
      "Er brach das Spiel endgültig ab",
      "Er gab eine 30-Minuten-Pause",
      "Er pfiff sofort die 2. Halbzeit an"
    ],
    "explanation": "Auf Hinweis seines Linienrichters ließ Ahlenfelder die verbleibenden 13 Minuten bis zur echten Pause nachholen.",
    "exp": "Auf Hinweis seines Linienrichters ließ Ahlenfelder die verbleibenden 13 Minuten bis zur echten Pause nachholen."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welcher Chelsea-Star trat 2013 im Ligapokal gegen Swansea City nach einem Balljungen und sah dafür glatt Rot?",
    "a": [
      "Eden Hazard",
      "Fernando Torres",
      "Frank Lampard",
      "John Terry"
    ],
    "explanation": "Der Balljunge lag absichtlich auf dem Ball, um Zeit zu schinden – Hazard wollte den Ball unter ihm hervorstochern.",
    "exp": "Der Balljunge lag absichtlich auf dem Ball, um Zeit zu schinden – Hazard wollte den Ball unter ihm hervorstochern."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Darf ein Abwehrspieler den Ball per Kopf zum Torwart zurückspielen, nachdem er ihn sich selbst mit dem Fuß hochgelegt hat?",
    "a": [
      "Nein, unsportliche Regelumgehung",
      "Ja, Rückpässe per Kopf sind frei",
      "Nur außerhalb des eigenen 16ers",
      "Ja, wenn kein Gegner stört"
    ],
    "explanation": "Das bewusste Umgehen der Rückpassregel durch Hochlegen des Balls wird mit indirektem Freistoß und Gelb geahndet.",
    "exp": "Das bewusste Umgehen der Rückpassregel durch Hochlegen des Balls wird mit indirektem Freistoß und Gelb geahndet."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welcher Schiedsrichter zog 2006 bei der WM in Deutschland die berühmten 16 Gelben und 4 Roten Karten in einem Spiel?",
    "a": [
      "Walentin Iwanow",
      "Graham Poll",
      "Markus Merk",
      "Kim Milton Nielsen"
    ],
    "explanation": "Das Achtelfinale zwischen Portugal und den Niederlanden ging als 'Schlacht von Nürnberg' in die Geschichte ein.",
    "exp": "Das Achtelfinale zwischen Portugal und den Niederlanden ging als 'Schlacht von Nürnberg' in die Geschichte ein."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Was passiert, wenn der Ball während des laufenden Spiels platzt und die Luft verliert?",
    "a": [
      "Schiedsrichterball mit neuem Ball",
      "Abstoß von der Auswechselbank",
      "Einwurf für das letzte Ball-Team",
      "Freistoß für das Heim-Team"
    ],
    "explanation": "Das Spiel wird unterbrochen und mit dem ausgetauschten Ball per Schiedsrichterball fortgesetzt.",
    "exp": "Das Spiel wird unterbrochen und mit dem ausgetauschten Ball per Schiedsrichterball fortgesetzt."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Wie viele Sekunden darf ein Torhüter den Ball laut Regelwerk maximal in den Händen halten, bevor er ihn freigeben muss?",
    "a": [
      "6 Sekunden",
      "10 Sekunden",
      "4 Sekunden",
      "8 Sekunden"
    ],
    "explanation": "Hält der Torhüter den Ball länger als 6 Sekunden, kann der Schiri auf indirekten Freistoß entscheiden.",
    "exp": "Hält der Torhüter den Ball länger als 6 Sekunden, kann der Schiri auf indirekten Freistoß entscheiden."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welches berühmte Zitat über Trainer stammt von Bayern-Legende Mario Basler?",
    "a": [
      "Mich interessiert nicht, wer unter mir Trainer ist",
      "Der Trainer ist das schwächste Glied im Bett",
      "Taktik ist was für Leute ohne Talent",
      "Ein guter Trainer wechselt mich niemals aus"
    ],
    "explanation": "Baslers selbstbewusster Spruch unterstrich seinen Ruf als genialer Freigeist und Schreck aller Trainer.",
    "exp": "Baslers selbstbewusster Spruch unterstrich seinen Ruf als genialer Freigeist und Schreck aller Trainer."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welche Regelung gilt beim Elfmeterschießen, wenn eine Mannschaft vor Beginn durch Platzverweise weniger Spieler hat?",
    "a": [
      "Der Gegner muss angleichen",
      "Der Gegner darf Schützen wählen",
      "Das Team mit weniger Spielern scheidet aus",
      "Es wird ganz normal ohne Angleich geschossen"
    ],
    "explanation": "Die gegnerische Mannschaft muss die Spieleranzahl reduzieren, damit beide Teams mit gleich vielen Schützen antreten.",
    "exp": "Die gegnerische Mannschaft muss die Spieleranzahl reduzieren, damit beide Teams mit gleich vielen Schützen antreten."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Was passiert, wenn ein Schiedsrichter den Ball versehentlich berührt und dadurch ein vielversprechender Angriff eingeleitet wird?",
    "a": [
      "Schiedsrichterball",
      "Weiterspielen ('Schiri ist Luft')",
      "Indirekter Freistoß",
      "Einwurf für die Verteidiger"
    ],
    "explanation": "Früher galt der Schiedsrichter als 'Luft'; seit der Regelreform 2019 gibt es bei Ballbesitzwechsel Schiedsrichterball.",
    "exp": "Früher galt der Schiedsrichter als 'Luft'; seit der Regelreform 2019 gibt es bei Ballbesitzwechsel Schiedsrichterball."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welcher brasilianische Fußballbegriff beschreibt die Philosophie des schönen, kunstvollen Straßenfußballs?",
    "a": [
      "Jogo Bonito",
      "Ginga",
      "Catenaccio",
      "Samba-Kick"
    ],
    "explanation": "'O Jogo Bonito' ('Das schöne Spiel') wurde durch Pelé und die Seleção der 1970er weltweit zum Mythos.",
    "exp": "'O Jogo Bonito' ('Das schöne Spiel') wurde durch Pelé und die Seleção der 1970er weltweit zum Mythos."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welche Bedingung muss der Torwart beim Strafstoß seit den neuesten Regelanpassungen auf der Torlinie einhalten?",
    "a": [
      "Ein Fuß auf oder hinter der Linie",
      "Beide Füße müssen die Linie berühren",
      "Er darf die Arme nicht heben",
      "Er muss sich auf Knien befinden"
    ],
    "explanation": "Der Torhüter darf nicht vor die Linie springen; mindestens ein Teil eines Fußes muss auf/hinter der Linie sein.",
    "exp": "Der Torhüter darf nicht vor die Linie springen; mindestens ein Teil eines Fußes muss auf/hinter der Linie sein."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welcher Schiedsrichter gab 2013 das berüchtigte Phantom-Tor von Stefan Kießling für Bayer Leverkusen?",
    "a": [
      "Felix Brych",
      "Wolfgang Stark",
      "Manuel Gräfe",
      "Florian Meyer"
    ],
    "explanation": "Brych sah den Ball im Tornetz liegen und konnte das Loch im Außennetz aus seiner Position nicht erkennen.",
    "exp": "Brych sah den Ball im Tornetz liegen und konnte das Loch im Außennetz aus seiner Position nicht erkennen."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Was passiert laut Regelwerk, wenn zwei Bälle gleichzeitig auf dem Spielfeld sind und einer das Spielgeschehen stört?",
    "a": [
      "Unterbrechung und Schiedsrichterball",
      "Weiterspielen bis zum nächsten Toraus",
      "Sofortiger Eckstoß für die Abwehr",
      "Freistoß für das ballführende Team"
    ],
    "explanation": "Greift der zweite Ball aktiv ins Spiel ein, muss der Schiri sofort unterbrechen und mit Schiedsrichterball fortsetzen.",
    "exp": "Greift der zweite Ball aktiv ins Spiel ein, muss der Schiri sofort unterbrechen und mit Schiedsrichterball fortsetzen."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welcher Bundestrainer antwortete Reportern: 'Wenn ich über's Wasser laufe, sagen meine Kritiker: Nicht mal schwimmen kann er'?",
    "a": [
      "Berti Vogts",
      "Erich Ribbeck",
      "Jürgen Klinsmann",
      "Sepp Herberger"
    ],
    "explanation": "Trotz des EM-Titels 1996 stand Vogts bei den deutschen Medien fast dauerhaft in scharfer Kritik.",
    "exp": "Trotz des EM-Titels 1996 stand Vogts bei den deutschen Medien fast dauerhaft in scharfer Kritik."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Was entschied das IFAB zur Torjubel-Verwarnung: Warum wird das Ausziehen des Trikots zwingend mit Gelb bestraft?",
    "a": [
      "Unsittlichkeit und Sponsorenschutz",
      "Gefahr von Unterkühlung",
      "Verstoß gegen Textilnormen",
      "Verzögerung bei der Trikotwäsche"
    ],
    "explanation": "Die FIFA begründete die Regel mit dem Schutz vor provokanten Unterhemd-Botschaften und Sponsoreninteressen.",
    "exp": "Die FIFA begründete die Regel mit dem Schutz vor provokanten Unterhemd-Botschaften und Sponsoreninteressen."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welches Spielsystem erfand Trainer Ernst Happel beim Hamburger SV, das mit extrem hohem Aufrücken die Gegner einschnürte?",
    "a": [
      "Die moderne Abseitsfalle",
      "Den defensiven Riegel",
      "Die Dreier-Kette",
      "Das Pendel-Mittelfeld"
    ],
    "explanation": "Happel ließ Kaltz, Hieronymus und Jakobs geschlossen nach vorne sprinten und stellte jeden Gegner ins Abseits.",
    "exp": "Happel ließ Kaltz, Hieronymus und Jakobs geschlossen nach vorne sprinten und stellte jeden Gegner ins Abseits."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welcher österreichische Stürmer formulierte den Satz 'Man hetzt die Leute auf mit Tatsachen, die nicht der Wahrheit entsprechen'?",
    "a": [
      "Toni Polster",
      "Andreas Herzog",
      "Hans Krankl",
      "Herbert Prohaska"
    ],
    "explanation": "Polsters legendäre linguistische Verwirrung im TV-Interview erlangte absoluten Kultstatus.",
    "exp": "Polsters legendäre linguistische Verwirrung im TV-Interview erlangte absoluten Kultstatus."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Darf ein Schiedsrichter einem Trainer oder Betreuer auf der Bank seit 2019 Gelbe und Rote Karten zeigen?",
    "a": [
      "Ja, genau wie Feldspielern",
      "Nein, nur mündliche Verweise",
      "Nur in internationalen Spielen",
      "Nur nach Rücksprache mit dem DFB"
    ],
    "explanation": "Seit der Saison 2019/20 werden Gelbe und Rote Karten offiziell auch für Teamoffizielle an der Seitenlinie genutzt.",
    "exp": "Seit der Saison 2019/20 werden Gelbe und Rote Karten offiziell auch für Teamoffizielle an der Seitenlinie genutzt."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Was passiert, wenn der Schiedsrichter versehentlich vor Ablauf der regulären 90 Minuten zur Pause oder zum Spielende abpfeift?",
    "a": [
      "Fehlende Zeit muss nachgeholt werden",
      "Spiel wird automatisch wiederholt",
      "Das Ergebnis wird sofort eingefroren",
      "Der Schiedsrichter wird gesperrt"
    ],
    "explanation": "Bemerkt der Schiedsrichter seinen Irrtum, solange sich die Teams auf dem Platz befinden, pfeift er wieder an.",
    "exp": "Bemerkt der Schiedsrichter seinen Irrtum, solange sich die Teams auf dem Platz befinden, pfeift er wieder an."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welcher Kult-Spruch über Taktik und Fitness stammt vom legendären Trainer Max Merkel?",
    "a": [
      "Das Training war heute wie Urlaub",
      "Die Mannschaft hat kein Alibi",
      "Taktik ist nur was für die Tafel",
      "Immer schön locker durch die Hose"
    ],
    "explanation": "Merkel schimpfte über seine Spieler oft derb ('Die wissen nicht mal, wo der Ball aufgepumpt wird').",
    "exp": "Merkel schimpfte über seine Spieler oft derb ('Die wissen nicht mal, wo der Ball aufgepumpt wird')."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welche Körperteile zählen bei der Abseitsbeurteilung eines angreifenden Spielers explizit NICHT mit?",
    "a": [
      "Hände und Arme",
      "Kopf und Schultern",
      "Knie und Füße",
      "Hüfte und Gesäß"
    ],
    "explanation": "Körperteile, mit denen regulär kein Tor erzielt werden darf (Hände und Arme), zählen bei der Abseitslinie nicht.",
    "exp": "Körperteile, mit denen regulär kein Tor erzielt werden darf (Hände und Arme), zählen bei der Abseitslinie nicht."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Was passiert, wenn ein Spieler beim Elfmeter anläuft, kurz vor dem Ball komplett abstoppt und eine Schusstäuschung macht?",
    "a": [
      "Verwarnung (Gelb) und indirekter Freistoß",
      "Wiederholung des Strafstoßes",
      "Keine Strafe, Täuschung ist erlaubt",
      "Direkter Freistoß für die Abwehr"
    ],
    "explanation": "Eine Schussfinte am Ende des Anlaufs gilt als unsportliche Täuschung; Finte während des Anlaufs ist dagegen erlaubt.",
    "exp": "Eine Schussfinte am Ende des Anlaufs gilt als unsportliche Täuschung; Finte während des Anlaufs ist dagegen erlaubt."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Welcher Schiedsrichter stellte 1978 bei Schalke gegen Frankfurt Schalkes Rüdiger Abramczik wegen Meckerns vom Platz?",
    "a": [
      "Wolf-Dieter Ahlenfelder",
      "Walter Eschweiler",
      "Gert Meuser",
      "Dieter Heitmann"
    ],
    "explanation": "Eschweiler pfiff damals legendär und stürzte 1982 bei der WM in Spanien nach einem Rempler spektakulär zu Boden.",
    "exp": "Eschweiler pfiff damals legendär und stürzte 1982 bei der WM in Spanien nach einem Rempler spektakulär zu Boden."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "mid",
    "q": "Was passiert, wenn ein Abwehrspieler den Ball bei einem gegnerischen Torschuss mit einer geworfenen Trinkflasche abwehrt?",
    "a": [
      "Strafstoß (Elfmeter) und Rote Karte",
      "Indirekter Freistoß und Gelbe Karte",
      "Schiedsrichterball und Ermahnung",
      "Wiederholung des Schusses"
    ],
    "explanation": "Gegenstände gelten als Verlängerung der Hand – die Torverhinderung im 16er zieht Elfmeter und Rot nach sich.",
    "exp": "Gegenstände gelten als Verlängerung der Hand – die Torverhinderung im 16er zieht Elfmeter und Rot nach sich."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Wie groß ist der offizielle Radius des Anstoßkreises und des Strafraum-Teilkreises laut IFAB-Regeln?",
    "a": [
      "9,15 Meter",
      "10,00 Meter",
      "9,50 Meter",
      "8,50 Meter"
    ],
    "explanation": "Auch hier liegt das britische Maß zugrunde: 10 Yards = 9,144 Meter, gerundet auf 9,15 m.",
    "exp": "Auch hier liegt das britische Maß zugrunde: 10 Yards = 9,144 Meter, gerundet auf 9,15 m."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Welcher Schiedsrichter stürzte bei der WM 1982 nach einem Zusammenprall mit dem peruanischen Spieler Velásquez?",
    "a": [
      "Walter Eschweiler",
      "Abraham Klein",
      "Paolo Casarin",
      "Nicolae Rainea"
    ],
    "explanation": "Eschweiler verlor seine Pfeife und Karten im Rasen, rappelte sich aber unter dem Jubel der Zuschauer sofort wieder auf.",
    "exp": "Eschweiler verlor seine Pfeife und Karten im Rasen, rappelte sich aber unter dem Jubel der Zuschauer sofort wieder auf."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Was muss der Schiedsrichter entscheiden, wenn ein Torhüter den Ball nach einem regulären Einwurf direkt mit den Händen fängt?",
    "a": [
      "Indirekter Freistoß für den Gegner",
      "Weiterspielen, Einwurf ist kein Fußpass",
      "Direkter Freistoß und Gelbe Karte",
      "Strafstoß für den Gegner"
    ],
    "explanation": "Auch Einwürfe von eigenen Mitspielern darf der Torwart laut Rückpassregel nicht mit den Händen aufnehmen.",
    "exp": "Auch Einwürfe von eigenen Mitspielern darf der Torwart laut Rückpassregel nicht mit den Händen aufnehmen."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Welcher Schiedsrichter zeigte dem spanischen Spieler Migueli 1977 die Rote Karte, steckte sie aber nach Protesten wieder ein?",
    "a": [
      "Robert Wurtz",
      "Károly Palotai",
      "Clive Thomas",
      "Erich Linemayr"
    ],
    "explanation": "Der französische Schiedsrichter Wurtz ('Nurejew des Fußballs') war für seine theatralischen Gesten berühmt.",
    "exp": "Der französische Schiedsrichter Wurtz ('Nurejew des Fußballs') war für seine theatralischen Gesten berühmt."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Darf ein Spieler den Ball beim Anstoß direkt nach hinten spielen, ohne dass er vorher die Mittellinie überquert hat?",
    "a": [
      "Ja, seit der Regeländerung 2016",
      "Nein, Ball muss nach vorne rollen",
      "Nur wenn zwei Spieler anstoßen",
      "Nur nach einer Torerzielung"
    ],
    "explanation": "Seit 2016 darf der Ball beim Anstoß in jede beliebige Richtung gespielt werden, weshalb oft nur ein Spieler anstößt.",
    "exp": "Seit 2016 darf der Ball beim Anstoß in jede beliebige Richtung gespielt werden, weshalb oft nur ein Spieler anstößt."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Welche Strafe droht einem Torhüter, der den Pfosten oder die Torlatte vor Ausführung eines Elfmeters absichtlich wackeln lässt?",
    "a": [
      "Ermahnung und bei Wiederholung Gelb",
      "Sofortige Rote Karte",
      "Wiederholung als indirekter Freistoß",
      "Elfmeter wird um 2 Meter vorgezogen"
    ],
    "explanation": "Seit 2023 verbietet das IFAB Torhütern ungebührliches Verhalten wie das Berühren der Torpfosten zur Verunsicherung.",
    "exp": "Seit 2023 verbietet das IFAB Torhütern ungebührliches Verhalten wie das Berühren der Torpfosten zur Verunsicherung."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Was passiert, wenn ein Spieler einen Freistoß vor dem eigenen Tor direkt und ohne Berührung ins eigene Tor schlägt?",
    "a": [
      "Eckstoß für den Gegner",
      "Eigentor wird anerkannt",
      "Wiederholung des Freistoßes",
      "Schiedsrichterball am Strafraum"
    ],
    "explanation": "Aus einem Vorteil kann keine direkte Bestrafung entstehen – das Regelwerk sieht hier zwingend Eckstoß vor.",
    "exp": "Aus einem Vorteil kann keine direkte Bestrafung entstehen – das Regelwerk sieht hier zwingend Eckstoß vor."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Welcher brasilianische Schiedsrichter zog in einem einzigen Spiel 2005 sagenhafte 22 Rote Karten nach einer Massenschlägerei?",
    "a": [
      "Paulo César de Oliveira",
      "Arnaldo Cézar Coelho",
      "Romualdo Arppi Filho",
      "Carlos Eugênio Simon"
    ],
    "explanation": "Im Derby zwischen Botafogo und Flamengo verlor der Unparteiische nach Faustschlägen die Geduld und verwies 22 Spieler.",
    "exp": "Im Derby zwischen Botafogo und Flamengo verlor der Unparteiische nach Faustschlägen die Geduld und verwies 22 Spieler."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Was muss der Schiedsrichter entscheiden, wenn ein Hund auf das Spielfeld rennt und einen Schuss auf der Torlinie abwehrt?",
    "a": [
      "Schiedsrichterball am Ort des Kontakts",
      "Tor wird trotzdem anerkannt",
      "Wiederholung des Schusses",
      "Strafstoß für das Angriffsteam"
    ],
    "explanation": "Tiere und Zuschauer gelten als 'äußere Einflüsse'; das Spiel muss mit Schiedsrichterball fortgesetzt werden.",
    "exp": "Tiere und Zuschauer gelten als 'äußere Einflüsse'; das Spiel muss mit Schiedsrichterball fortgesetzt werden."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Welche Mindest- und Höchstlänge schreibt die FIFA für internationale Spielfelder offiziell vor?",
    "a": [
      "100 bis 110 Meter",
      "90 bis 120 Meter",
      "105 bis 115 Meter",
      "95 bis 105 Meter"
    ],
    "explanation": "Standard sind exakt 105 × 68 Meter, international erlaubt ist eine Spanne von 100 bis 110 Metern Länge.",
    "exp": "Standard sind exakt 105 × 68 Meter, international erlaubt ist eine Spanne von 100 bis 110 Metern Länge."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Darf ein Spieler die Eckfahne während der Ausführung eines Eckballs aus dem Boden ziehen, um mehr Platz zu haben?",
    "a": [
      "Nein, Eckfahnen dürfen nicht entfernt werden",
      "Ja, wenn er sie danach wieder einsteckt",
      "Nur mit Genehmigung des Schiedsrichters",
      "Ja, wenn der Schiedsrichterassistent hilft"
    ],
    "explanation": "Das Entfernen der Eckstange ist verboten und zieht eine Verwarnung wegen unsportlichen Verhaltens nach sich.",
    "exp": "Das Entfernen der Eckstange ist verboten und zieht eine Verwarnung wegen unsportlichen Verhaltens nach sich."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Was passiert, wenn der Schiedsrichter bei Spielende das Feld verlässt und danach einen schweren Tätlichkeitsschlag bemerkt?",
    "a": [
      "Er kann im Spielbericht Rot notieren",
      "Er hat nach Schlusspfiff keine Befugnis mehr",
      "Das Spiel muss 5 Minuten nachgespielt werden",
      "Die Polizei übernimmt das Verfahren allein"
    ],
    "explanation": "Der Schiedsrichter kann auch nach Verlassen des Feldes Disziplinarstrafen im offiziellen Spielbericht verhängen.",
    "exp": "Der Schiedsrichter kann auch nach Verlassen des Feldes Disziplinarstrafen im offiziellen Spielbericht verhängen."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Welche technische Neuerung verhinderte 2014 erstmals Phantom-Tore bei Weltmeisterschaften durch Funksignale an die Schiri-Uhr?",
    "a": [
      "GoalControl (Torlinientechnologie)",
      "Der Video-Schiedsrichter (VAR)",
      "Chip-Ball von Adidas",
      "Hochgeschwindigkeits-Drohnen"
    ],
    "explanation": "Sieben Hochgeschwindigkeitskameras pro Tor überwachten die Linie auf Millimeterbruchteile genau.",
    "exp": "Sieben Hochgeschwindigkeitskameras pro Tor überwachten die Linie auf Millimeterbruchteile genau."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Was geschieht, wenn ein Spieler den Ball beim Einwurf regelkonform einwirft, der Ball aber vor dem Überqueren der Linie zu Boden fällt?",
    "a": [
      "Wiederholung durch dieselbe Mannschaft",
      "Einwurf für die gegnerische Mannschaft",
      "Schiedsrichterball am Spielfeldrand",
      "Freistoß für das gegnerische Team"
    ],
    "explanation": "War der Ball noch nicht im Spiel (über der Linie), wird der Einwurf vom selben Spieler wiederholt.",
    "exp": "War der Ball noch nicht im Spiel (über der Linie), wird der Einwurf vom selben Spieler wiederholt."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Welcher niederländische Trainer prägte 2000 den legendären Begriff von der 'Gläsernen Decke' und verweigerte Interviews?",
    "a": [
      "Louis van Gaal",
      "Dick Advocaat",
      "Co Adriaanse",
      "Huub Stevens"
    ],
    "explanation": "Co Adriaanse prägte im niederländischen Fußball zahlreiche eigene Wortschöpfungen wie 'Woonwagenvoetbal'.",
    "exp": "Co Adriaanse prägte im niederländischen Fußball zahlreiche eigene Wortschöpfungen wie 'Woonwagenvoetbal'."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Was passiert laut Regelwerk, wenn der Torwart den Ball bei einem Abstoß mit dem Fuß stoppt und danach nochmals mit der Hand aufnimmt?",
    "a": [
      "Indirekter Freistoß für den Gegner",
      "Strafstoß (Elfmeter) für den Gegner",
      "Wiederholung des Abstoßes",
      "Kein Verstoß, Torwart darf alles"
    ],
    "explanation": "Berührt der Torwart den Ball nach Freigabe ein zweites Mal mit der Hand, gibt es indirekten Freistoß.",
    "exp": "Berührt der Torwart den Ball nach Freigabe ein zweites Mal mit der Hand, gibt es indirekten Freistoß."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Welcher Schiedsrichter leitete 1974 das WM-Finale zwischen Deutschland und den Niederlanden und pfiff nach 55 Sekunden Elfmeter?",
    "a": [
      "Jack Taylor",
      "Rudi Glöckner",
      "Kurt Tschenscher",
      "Doğan Babacan"
    ],
    "explanation": "Der englische Metzger Jack Taylor zögerte keine Sekunde und pfiff den ersten Final-Elfmeter der WM-Geschichte.",
    "exp": "Der englische Metzger Jack Taylor zögerte keine Sekunde und pfiff den ersten Final-Elfmeter der WM-Geschichte."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Welche Strafe droht einem Auswechselspieler, der sich ohne Erlaubnis aufwärmt und den Ball auf dem Feld stoppt?",
    "a": [
      "Direkter Freistoß und Gelbe Karte",
      "Indirekter Freistoß ohne Karte",
      "Schiedsrichterball und Ermahnung",
      "Sofortige Rote Karte"
    ],
    "explanation": "Ein unerlaubtes Eingreifen von Auswechselspielern ins laufende Spiel wird seit 2016 mit direktem Freistoß bestraft.",
    "exp": "Ein unerlaubtes Eingreifen von Auswechselspielern ins laufende Spiel wird seit 2016 mit direktem Freistoß bestraft."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Welche Besonderheit galt für das 'Silver Goal', das die UEFA Anfang der 2000er-Jahre kurzzeitig einführte?",
    "a": [
      "Spiel endete nach 15 Minuten Halbzeit",
      "Spiel endete sofort beim ersten Tor",
      "Tore zählten in Verlängerung doppelt",
      "Nur Kopfballtore beendeten die Partie"
    ],
    "explanation": "Beim Silver Goal wurde die angebrochene 15-Minuten-Verlängerungshälfte noch zu Ende gespielt, ehe abgepfiffen wurde.",
    "exp": "Beim Silver Goal wurde die angebrochene 15-Minuten-Verlängerungshälfte noch zu Ende gespielt, ehe abgepfiffen wurde."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Welcher deutsche Nationalspieler sagte nach dem WM-Aus 1998: 'Wir haben uns alle in die Hose geschissen'?",
    "a": [
      "Jürgen Kohler",
      "Christian Wörns",
      "Olaf Thon",
      "Lothar Matthäus"
    ],
    "explanation": "Kohler sprach nach dem 0:3 im Viertelfinale gegen Kroatien Klartext über das Versagen der Altherren-Truppe.",
    "exp": "Kohler sprach nach dem 0:3 im Viertelfinale gegen Kroatien Klartext über das Versagen der Altherren-Truppe."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Was passiert laut Regelwerk, wenn eine Mannschaft während des laufenden Spiels unerlaubt 12 Feldspieler auf dem Platz hat?",
    "a": [
      "Unterbrechung, Gelb für den zwölften Mann",
      "Sofortige Wertung für den Gegner",
      "Rote Karte für den Mannschaftskapitän",
      "Wiederholung des gesamten Spiels"
    ],
    "explanation": "Das Spiel wird unterbrochen, der überzählige Spieler verwarnt und mit indirektem Freistoß fortgesetzt.",
    "exp": "Das Spiel wird unterbrochen, der überzählige Spieler verwarnt und mit indirektem Freistoß fortgesetzt."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Welcher Schiedsrichter brach 1976 das Länderspiel zwischen der DDR und England wegen dichten Nebels in Leipzig ab?",
    "a": [
      "Rudi Glöckner",
      "Adolf Prokop",
      "Heinz Aldinger",
      "Klaus Scheurell"
    ],
    "explanation": "Die Sichtweite im Leipziger Zentralstadion betrug weniger als 15 Meter, sodass Glöckner abbrechen musste.",
    "exp": "Die Sichtweite im Leipziger Zentralstadion betrug weniger als 15 Meter, sodass Glöckner abbrechen musste."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Darf ein Torwart den Ball beim Abschlag aus der Hand volley direkt ins gegnerische Tor schießen und das Tor zählt?",
    "a": [
      "Ja, ein direktes Tor ist voll gültig",
      "Nein, Torhüter dürfen keine Tore schießen",
      "Nur wenn der Ball vorher einmal aufdotzt",
      "Nein, es gibt Abstoß für den Gegner"
    ],
    "explanation": "Aus dem laufenden Spiel heraus darf jeder Spieler (auch der Torhüter) direkt ein Tor erzielen.",
    "exp": "Aus dem laufenden Spiel heraus darf jeder Spieler (auch der Torhüter) direkt ein Tor erzielen."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Welcher Spieler sah 2002 die Gelbe Karte, weil er den Schiedsrichter mit einer Schwalbe täuschen wollte, obwohl er gefoult wurde?",
    "a": [
      "Rivaldo",
      "Thierry Henry",
      "El Hadji Diouf",
      "Deco"
    ],
    "explanation": "Rivaldo täuschte bei der WM 2002 eine Gesichtsverletzung nach einem Ballwurf an die Beine vor und wurde bestraft.",
    "exp": "Rivaldo täuschte bei der WM 2002 eine Gesichtsverletzung nach einem Ballwurf an die Beine vor und wurde bestraft."
  },
  {
    "cat": "regeln_kurioses",
    "diff": "hard",
    "q": "Was passiert, wenn der Schiedsrichter nach einem Tor bemerkt, dass das Tornetz ein unbemerktes Loch hatte?",
    "a": [
      "Tor zählt, wenn der Ball die Linie überquerte",
      "Tor wird automatisch aberkannt",
      "Schiedsrichterball am Mittelkreis",
      "Wiederholung der letzten 5 Minuten"
    ],
    "explanation": "Entscheidend ist einzig das vollständige Überqueren der Torlinie zwischen Pfosten und Latte.",
    "exp": "Entscheidend ist einzig das vollständige Überqueren der Torlinie zwischen Pfosten und Latte."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("fussball_regeln", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["fussball_regeln"] = DATA;
  }
})();
