// 75 kuratierte Fragen: Napoli72H (Aachen), Neapolitanische Backkunst, Italien & Frankenberger Viertel
// Index 0 von a[] ist stets die richtige Antwort (wird im Spiel gemischt).
(function () {
  const QUESTIONS = [
  {
    "cat": "napoli72h",
    "diff": "easy",
    "q": "Wofür steht die Ziffernkombination „72H“ im Namen des Restaurants Napoli72H in Aachen?",
    "a": [
      "Für volle 72 Stunden kühle Teigruhe vor dem Backen",
      "Für exakt 72 Grad Celsius Ofentemperatur beim Vorwärmen",
      "Für 72 ausgewählte Zutaten auf der großen Speisekarte",
      "Für maximal 72 Minuten Liefergarantie im Stadtgebiet"
    ],
    "explanation": "Der Pizzateig ruht 72 Stunden lang kalt. Dadurch bauen Hefen und Enzyme Stärke ab, was den Teig leicht verdaulich und herrlich luftig macht.",
    "exp": "Der Pizzateig ruht 72 Stunden lang kalt. Dadurch bauen Hefen und Enzyme Stärke ab, was den Teig leicht verdaulich und herrlich luftig macht."
  },
  {
    "cat": "napoli72h",
    "diff": "easy",
    "q": "Wie lange verweilt eine echte neapolitanische Pizza bei Napoli72H im heißen Ofen?",
    "a": [
      "Rund 60 bis 90 Sekunden",
      "Ungefähr 5 bis 6 Minuten",
      "Etwa 10 bis 12 Minuten",
      "Knapp 15 bis 20 Minuten"
    ],
    "explanation": "Bei extremer Gluthitze von fast 485 Grad reicht eine Minute völlig aus, um den Rand aufzublähen, während der Belag frisch und saftig bleibt.",
    "exp": "Bei extremer Gluthitze von fast 485 Grad reicht eine Minute völlig aus, um den Rand aufzublähen, während der Belag frisch und saftig bleibt."
  },
  {
    "cat": "napoli72h",
    "diff": "easy",
    "q": "Bei welcher enormen Backtemperatur backen die Spezialöfen bei Napoli72H?",
    "a": [
      "Bei glühenden 485 Grad Celsius",
      "Bei klassischen 220 Grad Celsius",
      "Bei schonenden 160 Grad Celsius",
      "Bei mäßigen 320 Grad Celsius"
    ],
    "explanation": "Die traditionelle Pizza Napoletana verlangt Kuppeltemperaturen von rund 450 bis 485 Grad für den typischen 'Schockback'-Effekt.",
    "exp": "Die traditionelle Pizza Napoletana verlangt Kuppeltemperaturen von rund 450 bis 485 Grad für den typischen 'Schockback'-Effekt."
  },
  {
    "cat": "napoli72h",
    "diff": "easy",
    "q": "Welche Tomatensorte wächst auf den fruchtbaren vulkanischen Hängen des Vesuvs und bildet die Basis der Napoli72H-Soße?",
    "a": [
      "San-Marzano-Tomaten D.O.P.",
      "Ochsenherz-Salattomaten",
      "Holländische Rispentomaten",
      "Spanische Strauchtomaten"
    ],
    "explanation": "Die langgestreckte San-Marzano-Tomate besitzt wenig Kerne, milde Säure und ein tiefes, fruchtiges Aroma durch die Vulkanerde Kampaniens.",
    "exp": "Die langgestreckte San-Marzano-Tomate besitzt wenig Kerne, milde Säure und ein tiefes, fruchtiges Aroma durch die Vulkanerde Kampaniens."
  },
  {
    "cat": "napoli72h",
    "diff": "easy",
    "q": "Welcher geschmolzene Kuhmilch-Käse aus Kampanien wird bevorzugt statt Industriemozzarella als Belag verwendet?",
    "a": [
      "Fior di Latte di Agerola",
      "Geriebener Gouda jung",
      "Holländischer Edamer",
      "Pikanter Cheddarkäse"
    ],
    "explanation": "Fior di Latte ist ein frischer Filata-Käse aus Kuhmilch, der bei 485 Grad perfekt schmilzt, ohne zu verbrennen oder zu viel Wasser abzugeben.",
    "exp": "Fior di Latte ist ein frischer Filata-Käse aus Kuhmilch, der bei 485 Grad perfekt schmilzt, ohne zu verbrennen oder zu viel Wasser abzugeben."
  },
  {
    "cat": "napoli72h",
    "diff": "easy",
    "q": "In welchem charmanten Aachener Gründerzeitviertel liegt der erste Standort von Napoli72H?",
    "a": [
      "Im Frankenberger Viertel an der Oppenhoffallee",
      "Im Universitätsviertel am Ponttor",
      "Im Industriegebiet am Aachener Kreuz",
      "Im dörflichen Vorort Kornelimünster"
    ],
    "explanation": "Mitten im pulsierenden 'Franki' an der von Bäumen gesäumten Oppenhoffallee startete die Erfolgsgeschichte von Napoli72H.",
    "exp": "Mitten im pulsierenden 'Franki' an der von Bäumen gesäumten Oppenhoffallee startete die Erfolgsgeschichte von Napoli72H."
  },
  {
    "cat": "napoli72h",
    "diff": "easy",
    "q": "Welche feine Wurstspezialität aus Kalabrien sorgt bei der Pizza 'Diavola' oder pikanten Kreationen für die feurige Schärfe?",
    "a": [
      "'Nduja (streichfähige Chili-Salami)",
      "Mortadella mit ganzen Pistazien",
      "Gekochter toskanischer Rosmarinschinken",
      "Hauchdünne luftgetrocknete Bresaola"
    ],
    "explanation": "'Nduja ist eine herrlich würzige, streichfähige Rohwurst aus Kalabrien, die mit kalabrischen Chilischoten verfeinert wird und auf der Pizza schmilzt.",
    "exp": "'Nduja ist eine herrlich würzige, streichfähige Rohwurst aus Kalabrien, die mit kalabrischen Chilischoten verfeinert wird und auf der Pizza schmilzt."
  },
  {
    "cat": "napoli72h",
    "diff": "mid",
    "q": "Wo in der Aachener Innenstadt eröffnete Napoli72H seinen zweiten Standort mit großem Gastraum?",
    "a": [
      "In der Franzstraße nahe Marschiertor und Theater",
      "Direkt am Marktplatz gegenüber dem Rathaus",
      "Am Hansemannplatz an der Jülicher Straße",
      "In der Pontstraße unweit des RWTH-Audimax"
    ],
    "explanation": "Der zweite Standort in der Franzstraße verbindet urbane Aachener City-Lage mit authentischem neapolitanischem Flair.",
    "exp": "Der zweite Standort in der Franzstraße verbindet urbane Aachener City-Lage mit authentischem neapolitanischem Flair."
  },
  {
    "cat": "napoli72h",
    "diff": "mid",
    "q": "Warum verzichten die Pizzaioli bei Napoli72H beim Ausformen des Teigs strikt auf ein hölzernes Nudelholz?",
    "a": [
      "Weil ein Nudelholz die mühsam herangereiften Luftbläschen im Rand zerquetschen würde",
      "Weil Nudelholz-Klopfen laut neapolitanischer Tradition Unglück bringt",
      "Weil der Teig sonst zu viel Mehl von der Holzoberfläche aufsaugt",
      "Weil das Nudelholz bei 72 Stunden Reifung am kühlen Teig ankleben würde"
    ],
    "explanation": "Der Teig wird nur mit den Fingerballen von innen nach außen gedrückt. So wandern die Gärgase in den Rand ('Cornicione') und lassen ihn aufpuffen.",
    "exp": "Der Teig wird nur mit den Fingerballen von innen nach außen gedrückt. So wandern die Gärgase in den Rand ('Cornicione') und lassen ihn aufpuffen."
  },
  {
    "cat": "napoli72h",
    "diff": "mid",
    "q": "Welche zwei exquisiten Zutaten veredeln die beliebte Luxus-Pizza 'Tartufata' bei Napoli72H?",
    "a": [
      "Edle Trüffelcreme und aromatischer Trüffel",
      "Gekochte Artischocken und schwarze Oliven",
      "Gegrillte Auberginen und feine Pinienkerne",
      "Eingelegte Sardellenfilets und scharfe Kapern"
    ],
    "explanation": "Feine Trüffelcreme harmoniert perfekt mit dem mild-cremigen Fior di Latte und dem knusprig-fluffigen Teigrand.",
    "exp": "Feine Trüffelcreme harmoniert perfekt mit dem mild-cremigen Fior di Latte und dem knusprig-fluffigen Teigrand."
  },
  {
    "cat": "napoli72h",
    "diff": "mid",
    "q": "Aus welcher süditalienischen Region stammen die kunstvoll gemauerten Steinbacköfen von Napoli72H?",
    "a": [
      "Aus Neapel (Kampanien)",
      "Aus Palermo (Sizilien)",
      "Aus Mailand (Lombardei)",
      "Aus Florenz (Toskana)"
    ],
    "explanation": "Echte neapolitanische Öfen werden traditionell von spezialisierten Ofenbauern in Neapel aus speziellem Vulkangestein gefertigt.",
    "exp": "Echte neapolitanische Öfen werden traditionell von spezialisierten Ofenbauern in Neapel aus speziellem Vulkangestein gefertigt."
  },
  {
    "cat": "napoli72h",
    "diff": "mid",
    "q": "Was zeichnet den Pizzateig bei Napoli72H bezüglich seines Wassergehalts (Hydratation) aus?",
    "a": [
      "Ein hoher Feuchtigkeitsgehalt von rund 65 bis 70 Prozent",
      "Ein extrem trockener Teig mit unter 40 Prozent Wasser",
      "Ein Teig mit mehr Olivenöl als eigentlichem Trinkwasser",
      "Ein flüssiger Teig, der wie Pfannkuchenkuchen gegossen wird"
    ],
    "explanation": "Eine hohe Hydratation (Wasseranteil im Verhältnis zum Mehl) sorgt in Verbindung mit langer Gärung für die zarte, saftige Krume.",
    "exp": "Eine hohe Hydratation (Wasseranteil im Verhältnis zum Mehl) sorgt in Verbindung mit langer Gärung für die zarte, saftige Krume."
  },
  {
    "cat": "napoli72h",
    "diff": "mid",
    "q": "Welche feine Kombination aus Fleisch und Frucht macht die Gourmet-Kreation 'Parma' bei vielen Gästen so beliebt?",
    "a": [
      "Würziger Parmaschinken kombiniert mit cremigem Käse und Rucola",
      "Pikante Peperoniwurst kombiniert mit frischen Ananasstücken",
      "Geräucherter Speck kombiniert mit eingelegten Birnenscheiben",
      "Gegrilltes Rindfleisch kombiniert mit grünen Apfelspalten"
    ],
    "explanation": "Prosciutto di Parma wird erst nach dem Backen frisch auf die Pizza gelegt, damit sein nussiges, zartes Aroma erhalten bleibt.",
    "exp": "Prosciutto di Parma wird erst nach dem Backen frisch auf die Pizza gelegt, damit sein nussiges, zartes Aroma erhalten bleibt."
  },
  {
    "cat": "napoli72h",
    "diff": "mid",
    "q": "Welche cremige Käse-Spezialität mit flüssigem Stracciatella-Kern krönt viele moderne Napoli72H-Specials?",
    "a": [
      "Frische Burrata",
      "Gereifter Gorgonzola",
      "Hart gekochter Ricotta",
      "Würziger Fontina"
    ],
    "explanation": "Burrata stammt aus Apulien; schneidet man das Mozzarella-Säckchen an, fließt sahnige Stracciatella über die dampfende Pizza.",
    "exp": "Burrata stammt aus Apulien; schneidet man das Mozzarella-Säckchen an, fließt sahnige Stracciatella über die dampfende Pizza."
  },
  {
    "cat": "napoli72h",
    "diff": "pro",
    "q": "Warum schmeckt der Pizzateig nach vollen 72 Stunden Reifung deutlich aromatischer als nach nur zwei Stunden Gehzeit?",
    "a": [
      "Weil Enzyme Mehlstärke in aromatische Einfachzucker zerlegen und organische Säuren bilden",
      "Weil der Teig über drei Tage hinweg enorme Mengen Sauerstoff aus der Raumluft aufsaugt",
      "Weil das zugesetzte Backpulver erst nach dem dritten Tag seine Treibkraft entfaltet",
      "Weil der hohe Salzgehalt den Weizenkeimling im Teigballen zum Keimen anregt"
    ],
    "explanation": "Die Fermentation baut komplexe Kohlenhydrate langsam ab. Es entstehen milde Aromen, und der Teig karamellisiert im Ofen perfekt.",
    "exp": "Die Fermentation baut komplexe Kohlenhydrate langsam ab. Es entstehen milde Aromen, und der Teig karamellisiert im Ofen perfekt."
  },
  {
    "cat": "napoli72h",
    "diff": "pro",
    "q": "Welche Schaufel-Technik nutzt der Pizzaiolo, um die belegte Pizza vom Marmortisch in den Ofen zu befördern?",
    "a": [
      "Ein rascher Ruck auf die gelochte Aluminiumschaufel, um überschüssiges Mehl abzusieben",
      "Das Einrollen der Pizza auf ein Nadelkissen vor dem Abwurf auf den Stein",
      "Ein Schaufelblatt aus nassem Holz, an dem der Teig festgesaugt wird",
      "Das vorherige Einfrieren des Teigbodens für 30 Sekunden im Schockfroster"
    ],
    "explanation": "Gelochte Pizzaschaufeln lassen überschüssiges Streumehl durchfallen, damit es auf dem heißen Ofenstein nicht verbrennt und bitter schmeckt.",
    "exp": "Gelochte Pizzaschaufeln lassen überschüssiges Streumehl durchfallen, damit es auf dem heißen Ofenstein nicht verbrennt und bitter schmeckt."
  },
  {
    "cat": "napoli72h",
    "diff": "pro",
    "q": "Welche Rolle spielt die relative Luftfeuchtigkeit im Teigraum während der 72-stündigen Gärphase?",
    "a": [
      "Sie verhindert das Austrocknen und die Bildung einer harten Haut auf den Teigballen",
      "Sie lässt den Teig wie einen Badeschwamm zusätzliches Wasser aufsaugen",
      "Sie sorgt dafür, dass die Hefe ohne Nährstoffe Alkohol produzieren kann",
      "Sie verflüssigt den Teig für eine maschinelle Verarbeitung im Spritzbeutel"
    ],
    "explanation": "Trocknet die Oberfläche aus, reißt der Rand beim Backen ein und geht nicht auf; verschlossene Teigboxen halten die Feuchtigkeit konstant.",
    "exp": "Trocknet die Oberfläche aus, reißt der Rand beim Backen ein und geht nicht auf; verschlossene Teigboxen halten die Feuchtigkeit konstant."
  },
  {
    "cat": "napoli72h",
    "diff": "pro",
    "q": "Warum wird bei Napoli72H natives Olivenöl extra erst kurz vor oder nach dem Backen über die Pizza geträufelt?",
    "a": [
      "Weil hochwertige Aromen und Polyphenole bei zu langem Kochen im Ofen verfliegen würden",
      "Weil der Ofen sonst durch spritzendes Fett sofort in Brand geraten würde",
      "Weil kaltes Olivenöl die Temperatur des Pizzasteins um 100 Grad absenken würde",
      "Weil Olivenöl vor dem Backen den Tomatengeschmack neutralisieren würde"
    ],
    "explanation": "Eine feine Spirale frischen Olivenöls vollendet das Geschmackserlebnis, ohne dass die zarten Fruchtnoten durch die Hitze zerstört werden.",
    "exp": "Eine feine Spirale frischen Olivenöls vollendet das Geschmackserlebnis, ohne dass die zarten Fruchtnoten durch die Hitze zerstört werden."
  },
  {
    "cat": "napoli72h",
    "diff": "pro",
    "q": "Was unterscheidet die Pizza 'Margherita di Bufala' von der Standard-Margherita auf der Karte?",
    "a": [
      "Der Einsatz von echtem Büffelmozzarella D.O.P. mit seinem intensiveren, cremigen Aroma",
      "Die Verwendung von gelben statt roten Tomaten in der Sauce",
      "Ein Teigboden, der mit Büffelbutter statt Olivenöl geknetet wird",
      "Das ausschließliche Backen über glühenden Buchenholzscheiten"
    ],
    "explanation": "Mozzarella di Bufala Campana besitzt einen höheren Fettgehalt und ein unverwechselbar vollmundiges, leicht säuerlich-frisches Aroma.",
    "exp": "Mozzarella di Bufala Campana besitzt einen höheren Fettgehalt und ein unverwechselbar vollmundiges, leicht säuerlich-frisches Aroma."
  },
  {
    "cat": "handwerk",
    "diff": "easy",
    "q": "Wie nennen neapolitanische Pizzabäcker den typisch hohen, luftigen Teigrand der Pizza?",
    "a": [
      "Cornicione",
      "Panzerotto",
      "Calzone",
      "Crostata"
    ],
    "explanation": "Der 'Cornicione' (wörtlich: Gesims oder Rahmen) ist das Markenzeichen der echten Napoletana: außen kross, innen wolkenweich.",
    "exp": "Der 'Cornicione' (wörtlich: Gesims oder Rahmen) ist das Markenzeichen der echten Napoletana: außen kross, innen wolkenweich."
  },
  {
    "cat": "handwerk",
    "diff": "easy",
    "q": "Welches Mehl mit hohem Glutengehalt gilt als unverzichtbarer Goldstandard für neapolitanischen Pizzateig?",
    "a": [
      "Italienisches Weizenmehl Tipo 00",
      "Dunkles deutsches Roggenmehl Type 1150",
      "Reines Vollkorn-Buchweizenmehl",
      "Feines Maismehl zum Backen"
    ],
    "explanation": "Tipo 00 ist ein feinst vermahlenes Weichweizenmehl mit hohem Proteingehalt (starkes Klebergerüst für langes Aufgehen).",
    "exp": "Tipo 00 ist ein feinst vermahlenes Weichweizenmehl mit hohem Proteingehalt (starkes Klebergerüst für langes Aufgehen)."
  },
  {
    "cat": "handwerk",
    "diff": "easy",
    "q": "Wie nennt man die charakteristischen kleinen dunklen Röstflecken auf dem aufgegangenen Pizzateigrand?",
    "a": [
      "Leopardenmuster (Leoparding)",
      "Zebra-Streifenmuster",
      "Schachbrettmuster",
      "Marmorierung"
    ],
    "explanation": "Kleine, aromatische dunkle Bläschen zeugen von perfekter Teigfermentation und dem kurzen Schockbacken bei extremer Hitze.",
    "exp": "Kleine, aromatische dunkle Bläschen zeugen von perfekter Teigfermentation und dem kurzen Schockbacken bei extremer Hitze."
  },
  {
    "cat": "handwerk",
    "diff": "easy",
    "q": "Welcher feine Grieß wird auf der Arbeitsplatte verwendet, damit der Teigling sanft auf die Schaufel gleitet?",
    "a": [
      "Hartweizengrieß (Semola rimacinata)",
      "Grobes Paniermehl aus Weißbrot",
      "Feiner weißer Puderzucker",
      "Kartoffelstärkepulver"
    ],
    "explanation": "Semola rimacinata verbrennt im Ofen viel schwerer als normales Mehl und verleiht dem Boden einen herrlich knusprigen Biss.",
    "exp": "Semola rimacinata verbrennt im Ofen viel schwerer als normales Mehl und verleiht dem Boden einen herrlich knusprigen Biss."
  },
  {
    "cat": "handwerk",
    "diff": "mid",
    "q": "Aus welchem besonderen vulkanischen Material besteht der Boden traditioneller Pizzaöfen in Neapel?",
    "a": [
      "Aus neapolitanischem Vulkantuff (Biscotto di Sorrento)",
      "Aus poliertem Granit aus den Alpen",
      "Aus massivem feuerfestem Edelstahl",
      "Aus gebranntem blauem Schiefergestein"
    ],
    "explanation": "Biscotto di Sorrento leitet Hitze langsamer als normaler Schamottstein. So verbrennt der Teigboden selbst bei 485 Grad Hitze nicht.",
    "exp": "Biscotto di Sorrento leitet Hitze langsamer als normaler Schamottstein. So verbrennt der Teigboden selbst bei 485 Grad Hitze nicht."
  },
  {
    "cat": "handwerk",
    "diff": "mid",
    "q": "Was versteht man in der Teigführung unter den beiden Phasen 'Puntata' und 'Appretto'?",
    "a": [
      "Die Stockgare des gesamten Teigs und die Stückgare der einzelnen Teigballen",
      "Das anfängliche Mischen im Kneter und das Ausrollen mit den Händen",
      "Das Belegen mit Tomaten und das spätere Bestreuen mit Käse",
      "Das Vorheizen des Ofens und das anschließende Auskehren der Asche"
    ],
    "explanation": "Puntata bezeichnet die Ruhezeit des großen Teigklumpens; Appretto ist die Reifezeit, nachdem die Portionen zu runden Ballen geformt wurden.",
    "exp": "Puntata bezeichnet die Ruhezeit des großen Teigklumpens; Appretto ist die Reifezeit, nachdem die Portionen zu runden Ballen geformt wurden."
  },
  {
    "cat": "handwerk",
    "diff": "mid",
    "q": "Warum dreht der Pizzaiolo die Pizza nach rund 30 Sekunden im Ofen mit einer kleinen runden Schaufel (Palino)?",
    "a": [
      "Um die Pizza gleichmäßig zu bräunen, da die Glutseite des Ofens deutlich heißer strahlt",
      "Um den Teigboden mit kalter Luft von unten zu kühlen",
      "Damit das flüssige Fett vom Mozzarella zur Mitte abfließt",
      "Weil die Pizza sonst am Stein festbacken würde"
    ],
    "explanation": "Zur Feuerseite hin herrschen extreme Temperaturen; eine halbe Drehung garantiert eine rundum perfekte, gleichmäßige Kruste.",
    "exp": "Zur Feuerseite hin herrschen extreme Temperaturen; eine halbe Drehung garantiert eine rundum perfekte, gleichmäßige Kruste."
  },
  {
    "cat": "handwerk",
    "diff": "mid",
    "q": "Welchen Durchmesser schreibt die offizielle Verace-Pizza-Napoletana-Norm für eine klassische Pizza vor?",
    "a": [
      "Rund 30 bis 32 Zentimeter",
      "Maximal 20 Zentimeter",
      "Mindestens 45 Zentimeter",
      "Genau 50 Zentimeter"
    ],
    "explanation": "Eine traditionelle Napoletana misst etwa 30 bis 32 cm. Sie ist in der Mitte hauchdünn (ca. 3 mm) und am Rand bis zu 2 cm hoch.",
    "exp": "Eine traditionelle Napoletana misst etwa 30 bis 32 cm. Sie ist in der Mitte hauchdünn (ca. 3 mm) und am Rand bis zu 2 cm hoch."
  },
  {
    "cat": "handwerk",
    "diff": "mid",
    "q": "Warum legen Spitzen-Pizzabäcker frischen Mozzarella vor dem Belegen für einige Stunden in ein Sieb?",
    "a": [
      "Damit überschüssige Molke abtropft und die Pizza im Ofen nicht verwässert",
      "Damit der Käse an der Luft eine gelbe Kruste ansetzt",
      "Um den Fettgehalt des Käses chemisch zu halbieren",
      "Damit die Hefe aus der Luft den Käse fermentiert"
    ],
    "explanation": "Frischer Mozzarella enthält viel Flüssigkeit. Ungeseiht würde er die Pizza bei 485 Grad in eine wässrige Suppe verwandeln.",
    "exp": "Frischer Mozzarella enthält viel Flüssigkeit. Ungeseiht würde er die Pizza bei 485 Grad in eine wässrige Suppe verwandeln."
  },
  {
    "cat": "handwerk",
    "diff": "mid",
    "q": "Warum wird frisches Basilikum bei neapolitanischen Pizzaioli oft unter den Käse gelegt oder vor dem Ofen aufgelegt?",
    "a": [
      "Damit die empfindlichen ätherischen Öle des Krauts im Käseschutz ihr Aroma entfalten",
      "Damit das Basilikum durch die Hitze zu Asche verbrennt",
      "Weil rohe Basilikumblätter für Gäste unverdaulich wären",
      "Um das Rutschen der Tomatensoße mechanisch zu bremsen"
    ],
    "explanation": "Im heißen Ofen schützt der Käse das Blatt vor dem Verbrennen; die Hitze infundiert das Basilikumaroma tief in Sauce und Käse.",
    "exp": "Im heißen Ofen schützt der Käse das Blatt vor dem Verbrennen; die Hitze infundiert das Basilikumaroma tief in Sauce und Käse."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Warum benötigt man bei einer 72-stündigen kalten Teigführung nur einen winzigen Bruchteil normaler Frischhefe?",
    "a": [
      "Weil sich die Hefezellen über die lange Zeitspanne ausreichend vermehren und langsam arbeiten",
      "Weil Hefe bei Kälte giftige Stoffe freisetzen würde",
      "Weil der Teig sonst explodieren und die Gärbox sprengen würde",
      "Weil das Salz im Teig nach drei Tagen selbst als Hefe wirkt"
    ],
    "explanation": "Oft reicht weniger als 1 Gramm Hefe auf 1 Kilogramm Mehl. Zu viel Hefe würde den Teig bei langer Reifung ungenießbar übersäuern.",
    "exp": "Oft reicht weniger als 1 Gramm Hefe auf 1 Kilogramm Mehl. Zu viel Hefe würde den Teig bei langer Reifung ungenießbar übersäuern."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Welche zwei Proteine im Weizenmehl bilden beim Kneten mit Wasser das elastische Glutennetzwerk?",
    "a": [
      "Gliadin und Glutenin",
      "Kasein und Albumin",
      "Kollagen und Keratin",
      "Myosin und Aktin"
    ],
    "explanation": "Gliadin sorgt für die Dehnbarkeit des Teigs, Glutenin für seine Elastizität und Reißfestigkeit – zusammen formen sie das Klebegerüst.",
    "exp": "Gliadin sorgt für die Dehnbarkeit des Teigs, Glutenin für seine Elastizität und Reißfestigkeit – zusammen formen sie das Klebegerüst."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Was versteht man beim Brot- und Pizzabacken unter dem handwerklichen Schritt der 'Autolyse'?",
    "a": [
      "Das reine Ruhenlassen von Mehl und Wasser vor Zugabe von Hefe und Salz",
      "Das kräftige Durchkneten des Teigs mit heißem Dampf",
      "Das Einbrennen des Pizzasteins mit Speiseöl vor der Schicht",
      "Das sofortige Schockfrosten des gekneteten Teigklumpens"
    ],
    "explanation": "Während der Autolyse quellen die Mehlproteine vorab auf und Enzyme starten den Stärkeabbau. Das verkürzt die spätere Knetzeit massiv.",
    "exp": "Während der Autolyse quellen die Mehlproteine vorab auf und Enzyme starten den Stärkeabbau. Das verkürzt die spätere Knetzeit massiv."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Was bezeichnet der moderne neapolitanische Fachbegriff 'Pizza Canotto'?",
    "a": [
      "Eine Pizza mit extrem voluminösem, luftgefülltem Rand wie bei einem Schlauchboot",
      "Eine Pizza, die in Form eines kleinen Holzkanus gefaltet wird",
      "Eine viereckige Blechpizza für Schifffahrtsgesellschaften",
      "Eine Pizza, die auf einem schwimmenden Floß serviert wird"
    ],
    "explanation": "Canotto bedeutet Schlauchboot. Junge neapolitanische Pizzaioli perfektionierten Teige mit riesigen, hohlen Luftkammern im Rand.",
    "exp": "Canotto bedeutet Schlauchboot. Junge neapolitanische Pizzaioli perfektionierten Teige mit riesigen, hohlen Luftkammern im Rand."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Woran erkennt ein Pizzaiolo, dass ein Teigling nach 72 Stunden seine optimale Reife (Gärhöhepunkt) erreicht hat?",
    "a": [
      "Er federt bei sanftem Fingerdruck langsam zurück und fühlt sich wie ein samtiges Kissen an",
      "Er ist steinhart geworden und klingt hohl beim Anklopfen",
      "Er hat sich komplett verflüssigt und läuft vom Arbeitstisch",
      "Er verfärbt sich an der Oberseite tief dunkelgrün"
    ],
    "explanation": "Reifer Teig ist seidenweich, behält eine leichte Delle beim Eindrücken und lässt sich mühelos dehnen, ohne sich zusammenzuziehen.",
    "exp": "Reifer Teig ist seidenweich, behält eine leichte Delle beim Eindrücken und lässt sich mühelos dehnen, ohne sich zusammenzuziehen."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Welche W-Wert-Klassifikation beschreibt die Backstärke (Mehlstärke) eines echten neapolitanischen Pizzamehls?",
    "a": [
      "Ein hoher W-Wert von rund W 280 bis W 330",
      "Ein extrem niedriger W-Wert von unter W 100",
      "Ein W-Wert von exakt null für kleberfreie Teige",
      "Ein W-Wert von über W 800 wie bei Schießpulver"
    ],
    "explanation": "Der Alveograph misst mit dem W-Wert die Energie zur Verformung des Teigs. Hohe W-Werte stehen für ein stabiles Klebernetzwerk für Langzeitführung.",
    "exp": "Der Alveograph misst mit dem W-Wert die Energie zur Verformung des Teigs. Hohe W-Werte stehen für ein stabiles Klebernetzwerk für Langzeitführung."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Wieso darf eine echte neapolitanische Pizza Napoletana STG niemals mit Backfett oder Schmalz im Teig hergestellt werden?",
    "a": [
      "Weil das EU-Gütezeichen STG ausschließlich Wasser, Mehl, Hefe und Salz vorschreibt",
      "Weil Schmalz im 485-Grad-Ofen sofort dichte Rauchschwaden erzeugen würde",
      "Weil der Teig durch Fettzusatz seine Dehnbarkeit komplett verlieren würde",
      "Weil tierische Fette laut italienischem Gesetz in Pizzerien verboten sind"
    ],
    "explanation": "Die traditionelle neapolitanische Rezeptur ist puristisch: Nur 4 Grundzutaten garantieren die typische Bekömmlichkeit und Krumenstruktur.",
    "exp": "Die traditionelle neapolitanische Rezeptur ist puristisch: Nur 4 Grundzutaten garantieren die typische Bekömmlichkeit und Krumenstruktur."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Wie nennt man das handwerkliche Käsereifungs- und Ziehverfahren, zu dem Mozzarella, Provolone und Caciocavallo gehören?",
    "a": [
      "Pasta Filata (gebrühter und gekneteter Knetkäse)",
      "Blauschimmel-Kultivierung im Felsenkeller",
      "Gepresster Hartkäse nach Bergkäse-Art",
      "Frischer Rohmilch-Schichtkäse"
    ],
    "explanation": "Der Bruch wird mit heißem Wasser übergossen, zu Fäden ausgezogen (filare) und zu Kugeln abgedreht (mozzare) – daher der Name Mozzarella.",
    "exp": "Der Bruch wird mit heißem Wasser übergossen, zu Fäden ausgezogen (filare) und zu Kugeln abgedreht (mozzare) – daher der Name Mozzarella."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Warum wird Pizzateig im professionellen Spiralkneter idealerweise mit sehr kaltem Wasser geknetet?",
    "a": [
      "Weil die Reibungswärme der Knetspirale den Teig sonst vorzeitig über 24 Grad erhitzen würde",
      "Weil Hefe erst bei Temperaturen unter dem Gefrierpunkt ihre Arbeit beginnt",
      "Damit das Salz im kalten Wasser zu Kristallen gefriert",
      "Weil warmes Wasser das Klebereiweiß sofort auflösen würde"
    ],
    "explanation": "Wird der Teig beim Kneten zu warm, startet die Gärung unkontrolliert vor dem Ausformen; Knet-Endtemperaturen von 22 bis 24 °C sind ideal.",
    "exp": "Wird der Teig beim Kneten zu warm, startet die Gärung unkontrolliert vor dem Ausformen; Knet-Endtemperaturen von 22 bis 24 °C sind ideal."
  },
  {
    "cat": "italien",
    "diff": "easy",
    "q": "Welcher berühmte, aktive Vulkan prägt das Panorama am Golf von Neapel?",
    "a": [
      "Der Vesuv",
      "Der Ätna",
      "Der Stromboli",
      "Der Santorin"
    ],
    "explanation": "Der Vesuv brach im Jahr 79 n. Chr. dramatisch aus und begrub Pompeji und Herculaneum unter Asche; heute schenkt seine Erde fantastische Tomaten.",
    "exp": "Der Vesuv brach im Jahr 79 n. Chr. dramatisch aus und begrub Pompeji und Herculaneum unter Asche; heute schenkt seine Erde fantastische Tomaten."
  },
  {
    "cat": "italien",
    "diff": "easy",
    "q": "Was bedeutet der Name des italienischen Dessert-Klassikers 'Tiramisu' wörtlich ins Deutsche übersetzt?",
    "a": [
      "'Zieh mich hoch!' (im Sinne von: 'Muntere mich auf!')",
      "'Küss mich sanft!'",
      "'Süßer Himmelstraum'",
      "'Kalter Kaffeegenuss'"
    ],
    "explanation": "Espresso, Mascarpone und Löffelbiskuits sollten dem Genießer einen Muntermacher-Kick verleihen – 'Tira mi sù'.",
    "exp": "Espresso, Mascarpone und Löffelbiskuits sollten dem Genießer einen Muntermacher-Kick verleihen – 'Tira mi sù'."
  },
  {
    "cat": "italien",
    "diff": "easy",
    "q": "Aus welcher norditalienischen Region rund um die gleichnamige Stadt stammt der weltberühmte Parmaschinken?",
    "a": [
      "Emilia-Romagna",
      "Lombardei",
      "Toskana",
      "Piemont"
    ],
    "explanation": "Das milde Klima der Hügel um Parma und die Veredelung mit Meersalz machen den Prosciutto di Parma D.O.P. weltberühmt.",
    "exp": "Das milde Klima der Hügel um Parma und die Veredelung mit Meersalz machen den Prosciutto di Parma D.O.P. weltberühmt."
  },
  {
    "cat": "italien",
    "diff": "easy",
    "q": "Warum trinken traditionsbewusste Italiener nach 11 Uhr vormittags oder nach dem Essen keinen Cappuccino mehr?",
    "a": [
      "Weil warme Milch nach dem Essen als schwer verdaulich gilt; man trinkt stattdessen Espresso",
      "Weil Milchkaffee nach römischem Aberglauben Albträume erzeugt",
      "Weil Kaffeebohnen nachmittags ein anderes Koffein freisetzen",
      "Weil Milchverkäufer in Italien mittags ihre Läden schließen"
    ],
    "explanation": "Cappuccino ist in Italien ein reines Frühstücksgetränk; nach dem Essen schließt ein kurzer, heißer Espresso (Caffè) den Magen ab.",
    "exp": "Cappuccino ist in Italien ein reines Frühstücksgetränk; nach dem Essen schließt ein kurzer, heißer Espresso (Caffè) den Magen ab."
  },
  {
    "cat": "italien",
    "diff": "easy",
    "q": "Was verbirgt sich hinter der herzerwärmenden neapolitanischen Tradition des 'Caffè Sospeso'?",
    "a": [
      "Man bezahlt zwei Kaffees, trinkt einen und spendiert den zweiten anonym für einen Bedürftigen",
      "Man trinkt den Espresso im Stehen aus einer schwebenden Holztasse",
      "Man balanciert die heiße Kaffeetasse auf dem Zeigefinger",
      "Man verdünnt den Espresso mit eiskaltem Quellwasser"
    ],
    "explanation": "Der 'aufgeschobene Kaffee' ist ein Symbol neapolitanischer Solidarität: Jeder soll sich einen belebenden Espresso leisten können.",
    "exp": "Der 'aufgeschobene Kaffee' ist ein Symbol neapolitanischer Solidarität: Jeder soll sich einen belebenden Espresso leisten können."
  },
  {
    "cat": "italien",
    "diff": "easy",
    "q": "Was bedeutet das Gütesiegel 'Olio Extra Vergine di Oliva' bei hochwertigem Olivenöl?",
    "a": [
      "Natives Olivenöl der höchsten Güteklasse, rein mechanisch kalt gepresst ohne Chemie",
      "Olivenöl mit mindestens zehnprozentigem Zusatz von Sonnenblumenöl",
      "Gekochtes und gefiltertes Würzöl für Fritteusen",
      "Olivenöl, das aus bereits ausgepressten Olivenkernen destilliert wurde"
    ],
    "explanation": "Es darf einen Säuregehalt von maximal 0,8 % aufweisen und muss rein durch schonende mechanische Pressung bei unter 27 °C gewonnen werden.",
    "exp": "Es darf einen Säuregehalt von maximal 0,8 % aufweisen und muss rein durch schonende mechanische Pressung bei unter 27 °C gewonnen werden."
  },
  {
    "cat": "italien",
    "diff": "easy",
    "q": "Wie heißt die schnurkerzengerade historische Straße, die das Herz Neapels buchstäblich in zwei Hälften teilt?",
    "a": [
      "Spaccanapoli",
      "Via Toledo",
      "Corso Umberto",
      "Via Chiaia"
    ],
    "explanation": "Spaccanapoli ('Neapel-Spalter') folgt dem antiken Decumanus Inferior und bietet einen atemberaubenden Blick über die Altstadt.",
    "exp": "Spaccanapoli ('Neapel-Spalter') folgt dem antiken Decumanus Inferior und bietet einen atemberaubenden Blick über die Altstadt."
  },
  {
    "cat": "italien",
    "diff": "mid",
    "q": "Worin liegt der Unterschied zwischen Parmigiano Reggiano und Grana Padano?",
    "a": [
      "Parmigiano unterliegt strengeren Fütterungsvorschriften (kein Silofutter) und reift im Schnitt deutlich länger",
      "Grana Padano wird aus Schafsmilch hergestellt, Parmigiano aus Ziegenmilch",
      "Parmigiano darf nur im Winter produziert werden, Grana Padano nur im Sommer",
      "Grana Padano wird vor dem Reifen in Salzlake frittiert"
    ],
    "explanation": "Die Kühe für echten Parmigiano dürfen nur Heu und Gras fressen; Konservierungsstoffe sind absolut tabu.",
    "exp": "Die Kühe für echten Parmigiano dürfen nur Heu und Gras fressen; Konservierungsstoffe sind absolut tabu."
  },
  {
    "cat": "italien",
    "diff": "mid",
    "q": "Welche toskanische Wurstspezialität verführt Feinschmecker durch das Aroma wilder Fenchelsamen?",
    "a": [
      "Finocchiona",
      "Salsiccia calabrese",
      "Coppa di Parma",
      "Pancetta arrotolata"
    ],
    "explanation": "Finocchiona entstand im Mittelalter: Schlaue toskanische Bauern ersetzten damals teuren Pfeffer durch aromatischen Wildfenchel.",
    "exp": "Finocchiona entstand im Mittelalter: Schlaue toskanische Bauern ersetzten damals teuren Pfeffer durch aromatischen Wildfenchel."
  },
  {
    "cat": "italien",
    "diff": "mid",
    "q": "Warum schmeckt eine traditionelle neapolitanische 'Pizza Marinara' trotz ihres Namens überhaupt nicht nach Meeresfrüchten?",
    "a": [
      "Sie wurde für Seeleute gebacken und besteht nur aus lange haltbaren Zutaten: Tomaten, Knoblauch, Oregano und Öl",
      "Weil die Fischer damals den Fisch vor dem Backen heimlich vom Teig aßen",
      "Weil Meeresfrüchte im Ofen bei 485 Grad zu giftigen Dämpfen werden",
      "Weil 'Marinara' auf Neapolitanisch 'Kräutergarten' bedeutet"
    ],
    "explanation": "Fischer nahmen diese einfache Pizza mit auf See. Knoblauch und Oregano brauchten keine Kühlung und blieben tagelang aromatisch.",
    "exp": "Fischer nahmen diese einfache Pizza mit auf See. Knoblauch und Oregano brauchten keine Kühlung und blieben tagelang aromatisch."
  },
  {
    "cat": "italien",
    "diff": "mid",
    "q": "Welche seltene Eigenschaft macht die neapolitanische 'Piennolo del Vesuvio'-Tomate so legendär?",
    "a": [
      "Sie wird in Trauben an Schnüren aufgehängt und bleibt dank dicker Haut monatelang ohne Kühlung saftig",
      "Sie wächst vollständig unterirdisch in vulkanischen Erdhöhlen",
      "Sie ist von Natur aus tiefschwarz und schmeckt nach Kakao",
      "Sie blüht und reift ausschließlich bei Vollmond im August"
    ],
    "explanation": "Die kleinen Vesuv-Tomaten hängen in Bündeln ('Piennoli') an Scheunenwänden; mit der Zeit konzentriert sich ihr Fruchtfleisch zu pikanter Süße.",
    "exp": "Die kleinen Vesuv-Tomaten hängen in Bündeln ('Piennoli') an Scheunenwänden; mit der Zeit konzentriert sich ihr Fruchtfleisch zu pikanter Süße."
  },
  {
    "cat": "italien",
    "diff": "mid",
    "q": "Aus welchem klassischen ligurischen Originalrezept stammt das berühmte 'Pesto alla Genovese'?",
    "a": [
      "Aus Basilikum, Pinienkernen, Knoblauch, Meersalz, Parmigiano, Pecorino und nativem Olivenöl",
      "Aus Petersilie, Walnüssen, Schmand und gehackten Mandeln",
      "Aus Rosmarin, Sonnenblumenkernen und geschmolzener Butter",
      "Aus getrockneten Tomaten, Paprikapulver und Weinessig"
    ],
    "explanation": "Traditionell im Marmormörser mit Holzstößel kalt zerrieben, damit das Basilikum nicht oxidiert und dunkel wird.",
    "exp": "Traditionell im Marmormörser mit Holzstößel kalt zerrieben, damit das Basilikum nicht oxidiert und dunkel wird."
  },
  {
    "cat": "italien",
    "diff": "mid",
    "q": "Was bedeutet das geschützte europäische Siegel 'D.O.P.' (Denominazione d'Origine Protetta) auf italienischen Lebensmitteln?",
    "a": [
      "Geschützte Ursprungsbezeichnung: Alle Herstellungsschritte müssen in einer definierten Region nach Tradition erfolgen",
      "Garantiert zuckerfreies Produkt für Sportler",
      "Auszeichnung für Produkte, die ausschließlich per Hand verpackt wurden",
      "Prüfsiegel für Lebensmittel aus biologischer Gewächshauszucht"
    ],
    "explanation": "Vom Rohstoff bis zur Verarbeitung: Bei D.O.P. stammt alles nachweislich aus der historischen Herkunftsregion.",
    "exp": "Vom Rohstoff bis zur Verarbeitung: Bei D.O.P. stammt alles nachweislich aus der historischen Herkunftsregion."
  },
  {
    "cat": "italien",
    "diff": "pro",
    "q": "Welcher beliebte neapolitanische Streetfood-Klassiker wird in siedendem Öl frittiert statt im Steinofen gebacken?",
    "a": [
      "Pizza Fritta",
      "Pizza al Taglio",
      "Piadina Romagnola",
      "Focaccia di Recco"
    ],
    "explanation": "In der Nachkriegszeit fehlten vielen Familien Holzöfen. Hausfrauen füllten Teigtaschen mit Ricotta und Grieben und frittierten sie auf der Straße.",
    "exp": "In der Nachkriegszeit fehlten vielen Familien Holzöfen. Hausfrauen füllten Teigtaschen mit Ricotta und Grieben und frittierten sie auf der Straße."
  },
  {
    "cat": "italien",
    "diff": "pro",
    "q": "Was unterscheidet die weltberühmten Amalfi-Zitronen ('Sfusato Amalfitano') von gewöhnlichen Supermarkt-Zitronen?",
    "a": [
      "Ihre essbare, dicke Schale ist extrem reich an ätherischen Ölen und das Fruchtfleisch überraschend mild",
      "Sie besitzen keinerlei Fruchtfleisch und bestehen nur aus festem Holzkern",
      "Sie reifen erst, nachdem sie für drei Monate in Salzwasser eingelegt wurden",
      "Sie sind so sauer, dass man sie nicht unverdünnt anfassen darf"
    ],
    "explanation": "An den Steilhängen der Amalfiküste gereift, sind sie die Hauptzutat für echten Limoncello; man kann sie sogar wie Äpfel mit Schale essen.",
    "exp": "An den Steilhängen der Amalfiküste gereift, sind sie die Hauptzutat für echten Limoncello; man kann sie sogar wie Äpfel mit Schale essen."
  },
  {
    "cat": "italien",
    "diff": "pro",
    "q": "Warum galt Neapel im 18. und 19. Jahrhundert historisch als Welthauptstadt der Makkaroni- und Pasta-Liebhaber?",
    "a": [
      "Weil das warme, windige Klima am Golf ideale natürliche Bedingungen bot, um Pasta im Freien an Stangen zu trocknen",
      "Weil der König jeden Bürger köpfen ließ, der Reis statt Pasta aß",
      "Weil Pasta damals billiger war als gewöhnliches Trinkwasser",
      "Weil in Neapel der erste automatische Nudel-Computer erfunden wurde"
    ],
    "explanation": "Seeluft und Vesuvwinde trockneten Hartweizennudeln in Gragnano perfekt; Neapolitaner aßen lange Makkaroni damals spektakulär mit den bloßen Händen.",
    "exp": "Seeluft und Vesuvwinde trockneten Hartweizennudeln in Gragnano perfekt; Neapolitaner aßen lange Makkaroni damals spektakulär mit den bloßen Händen."
  },
  {
    "cat": "italien",
    "diff": "pro",
    "q": "Wie wird bei der Produktion von Parmaschinken garantiert, dass das Fleisch sein unvergleichlich mildes Aroma entwickelt?",
    "a": [
      "Die Schweine werden mit Getreide und der nahrhaften Molke aus der Parmigiano-Reggiano-Herstellung gefüttert",
      "Das Fleisch wird für sechs Monate in süßem Traubensaft mariniert",
      "Der Schinken wird täglich mit reinem Bienenhonig eingerieben",
      "Die Reifekammern werden mit heißem Kakaorauch bedampft"
    ],
    "explanation": "Käse und Schinken bilden eine Symbiose: Die Molke der Käsekessel verleiht dem Fleisch der Parmaschweine seine feine Marmorierung.",
    "exp": "Käse und Schinken bilden eine Symbiose: Die Molke der Käsekessel verleiht dem Fleisch der Parmaschweine seine feine Marmorierung."
  },
  {
    "cat": "italien",
    "diff": "pro",
    "q": "Welche historische Festung auf einer kleinen Felseninsel im Meer vor Neapel trägt den Namen 'Castel dell'Ovo'?",
    "a": [
      "Burg des Eies (nach einer Legende des Dichters Vergil über ein magisches Ei im Fundament)",
      "Burg der Olivenzweige",
      "Festung des Ozeans",
      "Kastell der aufgehenden Sonne"
    ],
    "explanation": "Der Dichter Vergil soll ein verzaubertes Ei im Fundament versteckt haben: Sollte das Ei zerbrechen, gehe Neapel im Meer unter.",
    "exp": "Der Dichter Vergil soll ein verzaubertes Ei im Fundament versteckt haben: Sollte das Ei zerbrechen, gehe Neapel im Meer unter."
  },
  {
    "cat": "italien",
    "diff": "pro",
    "q": "Welche Straße in Neapel ist weltberühmt für ihre ganzjährige, jahrhundertealte Handwerkskunst kunstvoller Weihnachtskrippen?",
    "a": [
      "Via San Gregorio Armeno",
      "Via Toledo",
      "Corso Vittorio Emanuele",
      "Piazza del Plebiscito"
    ],
    "explanation": "In den Werkstätten der Krippenbauer reihen sich heilige Figuren neben Karikaturen von Fußballgott Maradona und aktuellen Politikern.",
    "exp": "In den Werkstätten der Krippenbauer reihen sich heilige Figuren neben Karikaturen von Fußballgott Maradona und aktuellen Politikern."
  },
  {
    "cat": "aachen",
    "diff": "easy",
    "q": "Welches historische Bauwerk aus dem 13. Jahrhundert gibt dem Aachener 'Frankenberger Viertel' seinen Namen?",
    "a": [
      "Die Wasserburg Frankenberg",
      "Das Stadttor Ponttor",
      "Der Aachener Dom",
      "Das Grashaus am Markt"
    ],
    "explanation": "Die romantische Burg Frankenberg inmitten eines kleinen Parks war einst eine ritterliche Wasserburg und ist das Herz des Viertels.",
    "exp": "Die romantische Burg Frankenberg inmitten eines kleinen Parks war einst eine ritterliche Wasserburg und ist das Herz des Viertels."
  },
  {
    "cat": "aachen",
    "diff": "easy",
    "q": "Wie heißt der elegante, baumbestandene Prachtboulevard im Frankenberger Viertel, an dem Napoli72H zu Hause ist?",
    "a": [
      "Oppenhoffallee",
      "Trierer Straße",
      "Jülicher Straße",
      "Roermonder Straße"
    ],
    "explanation": "Benannt nach Aachens legendärem Oberbürgermeister Franz Oppenhoff, verbindet die Allee prächtige Gründerzeitfassaden mit lebendiger Gastronomie.",
    "exp": "Benannt nach Aachens legendärem Oberbürgermeister Franz Oppenhoff, verbindet die Allee prächtige Gründerzeitfassaden mit lebendiger Gastronomie."
  },
  {
    "cat": "aachen",
    "diff": "easy",
    "q": "Welches weltberühmte Bauwerk in Aachen wurde 1978 als allererstes deutsches Kulturdenkmal in die UNESCO-Welterbeliste aufgenommen?",
    "a": [
      "Der Aachener Dom mit der Pfalzkapelle",
      "Das historische Rathaus",
      "Das gotische Marschiertor",
      "Der Elisenbrunnen am Friedrich-Wilhelm-Platz"
    ],
    "explanation": "Karls Pfalzkapelle mit ihrem Oktogon galt über Jahrhunderte als architektonisches Wunderwerk des Frühmittelalters nördlich der Alpen.",
    "exp": "Karls Pfalzkapelle mit ihrem Oktogon galt über Jahrhunderte als architektonisches Wunderwerk des Frühmittelalters nördlich der Alpen."
  },
  {
    "cat": "aachen",
    "diff": "easy",
    "q": "Welches mächtige Stadttor der äußeren Stadtmauer liegt unweit der Franzstraße und zählt zu den größten erhaltenen Toren Europas?",
    "a": [
      "Das Marschiertor",
      "Das Ponttor",
      "Das Kölntor",
      "Das Jakobstor"
    ],
    "explanation": "Das riesige Marschiertor aus dem 13. Jahrhundert beherbergt heute das Stammquartier der Prinzengarde der Stadt Aachen.",
    "exp": "Das riesige Marschiertor aus dem 13. Jahrhundert beherbergt heute das Stammquartier der Prinzengarde der Stadt Aachen."
  },
  {
    "cat": "aachen",
    "diff": "easy",
    "q": "Wie lautet der traditionelle Gruß der Aachener, bei dem der rechte kleine Finger aufrecht emporgestreckt wird?",
    "a": [
      "Klenkes",
      "Öcher Alaaf",
      "Printe-Gruß",
      "Pferde-Huf"
    ],
    "explanation": "Aachen war die Hochburg der Nadelproduktion. Kinder sortierten fehlerhafte Stecknadeln mit dem kleinen Finger ('Klenkes') aus.",
    "exp": "Aachen war die Hochburg der Nadelproduktion. Kinder sortierten fehlerhafte Stecknadeln mit dem kleinen Finger ('Klenkes') aus."
  },
  {
    "cat": "aachen",
    "diff": "easy",
    "q": "Welche zwei Nachbarländer grenzen am berühmten 'Dreiländereck' auf dem Vaalserberg direkt an Aachen an?",
    "a": [
      "Belgien und die Niederlande",
      "Frankreich und Luxemburg",
      "Niederlande und Dänemark",
      "Schweiz und Österreich"
    ],
    "explanation": "Vom Aachener Stadtwald spaziert man in wenigen Minuten über den Vaalserberg nach Belgien und in die Niederlande.",
    "exp": "Vom Aachener Stadtwald spaziert man in wenigen Minuten über den Vaalserberg nach Belgien und in die Niederlande."
  },
  {
    "cat": "aachen",
    "diff": "easy",
    "q": "Welche süße Spezialität mit Kräutern und Zuckerkandis ist Aachens kulinarisches Aushängeschild?",
    "a": [
      "Aachener Printen",
      "Lütticher Waffeln",
      "Spekulatiusgebäck",
      "Marzipankartoffeln"
    ],
    "explanation": "Die Printe entwickelte sich aus dem belgischen Couque de Dinant; der Aachener Zuckersirup verlieh ihr ihre zähe, saftige Krume.",
    "exp": "Die Printe entwickelte sich aus dem belgischen Couque de Dinant; der Aachener Zuckersirup verlieh ihr ihre zähe, saftige Krume."
  },
  {
    "cat": "aachen",
    "diff": "easy",
    "q": "Was sprudelt mit markantem Schwefelgeruch und bis zu 52 Grad Hitze aus den Hähnen des Elisenbrunnens?",
    "a": [
      "Heilkräftiges Aachener Thermalwasser aus den vulkanischen Tiefen",
      "Mineralwasser aus einer kohlensäurehaltigen Gletscherquelle",
      "Reines Regenwasser aus dem Aachener Stadtwald",
      "Aufgewärmtes Flusswasser aus der nahen Wurm"
    ],
    "explanation": "Die heißen Thermalquellen machten Aachen schon bei Römern und Königen als 'Aquae Granni' zu einem weltberühmten Kurbad.",
    "exp": "Die heißen Thermalquellen machten Aachen schon bei Römern und Königen als 'Aquae Granni' zu einem weltberühmten Kurbad."
  },
  {
    "cat": "aachen",
    "diff": "mid",
    "q": "Welcher berühmte fränkische Herrscher wählte Aachen um 800 zu seiner festen Lieblingsresidenz und Hauptstadt seines Reiches?",
    "a": [
      "Karl der Große (Charlemagne)",
      "Friedrich Barbarossa",
      "Otto der Große",
      "Ludwig der Fromme"
    ],
    "explanation": "Karl schätzte die heißen Quellen für seine Rheumabeschwerden und ließ die Pfalzkapelle als Zentrum seines Riesenreiches errichten.",
    "exp": "Karl schätzte die heißen Quellen für seine Rheumabeschwerden und ließ die Pfalzkapelle als Zentrum seines Riesenreiches errichten."
  },
  {
    "cat": "aachen",
    "diff": "mid",
    "q": "Welche international renommierte Universität lockt zehntausende Studierende und Forscher aus aller Welt nach Aachen?",
    "a": [
      "RWTH Aachen University (Rheinisch-Westfälische Technische Hochschule)",
      "Technische Universität München",
      "Karlsruher Institut für Technologie",
      "Humboldt-Universität zu Berlin"
    ],
    "explanation": "Die RWTH gehört zu den führenden technischen Universitäten Europas und prägt das junge, pulsierende Stadtleben nachhaltig.",
    "exp": "Die RWTH gehört zu den führenden technischen Universitäten Europas und prägt das junge, pulsierende Stadtleben nachhaltig."
  },
  {
    "cat": "aachen",
    "diff": "mid",
    "q": "Welcher preußische Baumeister schuf den klassizistischen Elisenbrunnen in Aachen mit seinen markanten Säulen?",
    "a": [
      "Johann Peter Cremer (nach Entwürfen von Karl Friedrich Schinkel)",
      "Balthasar Neumann",
      "Gottfried Semper",
      "Leo von Klenze"
    ],
    "explanation": "Der 1827 vollendete Prachtbau mit seiner offenen Säulenhalle wurde zu Ehren der preußischen Kronprinzessin Elisabeth ('Elise') benannt.",
    "exp": "Der 1827 vollendete Prachtbau mit seiner offenen Säulenhalle wurde zu Ehren der preußischen Kronprinzessin Elisabeth ('Elise') benannt."
  },
  {
    "cat": "aachen",
    "diff": "mid",
    "q": "Welches sagenumwobene Fabelwesen soll nachts am 'Büchel' Betrunkenen auf den Rücken springen und schwerer werden?",
    "a": [
      "Der Bahkauv (Bachkalb)",
      "Der Lindwurm vom Lousberg",
      "Das Nachtgespenst von Burtscheid",
      "Der Wassermann von Frankenberg"
    ],
    "explanation": "Der Sage nach hauste das Untier in den Abwasserkanälen der heißen Quellen und bestrafte Zecher, die zu tief ins Glas geschaut hatten.",
    "exp": "Der Sage nach hauste das Untier in den Abwasserkanälen der heißen Quellen und bestrafte Zecher, die zu tief ins Glas geschaut hatten."
  },
  {
    "cat": "aachen",
    "diff": "mid",
    "q": "Wo in der Aachener Altstadt steht der berühmte Brunnen mit beweglichen Figuren (wie Marktfrau, Gelehrter, Domherr)?",
    "a": [
      "Am Puppenbrunnen in der Krämerstraße unweit des Doms",
      "Am Karlsbrunnen auf dem Marktplatz",
      "Am Hühnerdieb auf dem Hühnermarkt",
      "Am Fischpüddelchen am Fischmarkt"
    ],
    "explanation": "Bildhauer Bonifatius Stirnberg schuf die Bronzefiguren mit beweglichen Gelenken – ein Magnet für spielbegeisterte Kinder und Touristen.",
    "exp": "Bildhauer Bonifatius Stirnberg schuf die Bronzefiguren mit beweglichen Gelenken – ein Magnet für spielbegeisterte Kinder und Touristen."
  },
  {
    "cat": "aachen",
    "diff": "mid",
    "q": "Welche prestigeträchtige Auszeichnung für Verdienste um die europäische Einigung wird alljährlich im Aachener Rathaus verliehen?",
    "a": [
      "Der Internationale Karlspreis zu Aachen",
      "Der Europäische Friedensorden",
      "Die Goldene Europa-Medaille",
      "Der Aachener Kaiserring"
    ],
    "explanation": "Seit 1950 werden Staats- und Kirchenführer (von Churchill über Havel bis zum Papst) an Christi Himmelfahrt im Krönungssaal geehrt.",
    "exp": "Seit 1950 werden Staats- und Kirchenführer (von Churchill über Havel bis zum Papst) an Christi Himmelfahrt im Krönungssaal geehrt."
  },
  {
    "cat": "aachen",
    "diff": "pro",
    "q": "Warum entstand die Wasserburg Frankenberg historisch ausgerechnet im sumpfigen Bachtal der Bever?",
    "a": [
      "Sie diente den Grafen von Jülich als wehrhafter Vorposten zur Kontrolle der Reichsstadt Aachen",
      "Karl der Große wollte dort seine privaten Rennpferde züchten",
      "Sie war als Kloster für verbannte italienische Mönche gedacht",
      "Um das Trinkwasser für die städtische Bierbrauerei abzusichern"
    ],
    "explanation": "Das Herzogtum Jülich lag mit den freien Aachener Bürgern im Dauerstreit; Burg Frankenberg war strategischer Stachel im Fleisch der Stadt.",
    "exp": "Das Herzogtum Jülich lag mit den freien Aachener Bürgern im Dauerstreit; Burg Frankenberg war strategischer Stachel im Fleisch der Stadt."
  },
  {
    "cat": "aachen",
    "diff": "pro",
    "q": "Was erinnert im Park der Burg Frankenberg bis heute an das berühmte 'Aachener Flugpionier'-Kapitel?",
    "a": [
      "Hugo Junkers forschte an der RWTH Aachen und lebte zeitweise im Frankenberger Viertel",
      "Der erste Heißluftballon Deutschlands landete im Schlossteich",
      "Die Gebrüder Wright bauten dort ihren ersten Windkanal",
      "Ein Zeppelin war dort 1910 fest an einem Eichenbaum vertäut"
    ],
    "explanation": "Hugo Junkers lehrte als Professor für Thermodynamik an der RWTH und entwickelte in Aachen wegweisende Ganzmetallflugzeuge.",
    "exp": "Hugo Junkers lehrte als Professor für Thermodynamik an der RWTH und entwickelte in Aachen wegweisende Ganzmetallflugzeuge."
  },
  {
    "cat": "aachen",
    "diff": "pro",
    "q": "Welcher historische Platz erstreckt sich als prächtige Bühne direkt zwischen dem Aachener Dom und dem gotischen Rathaus?",
    "a": [
      "Der Katschhof",
      "Der Münsterplatz",
      "Der Holzgraben",
      "Der Kapuzinergraben"
    ],
    "explanation": "Der Katschhof war einst der Verbindungshof der karolingischen Pfalzanlage; heute finden dort stimmungsvolle Konzerte und der Weihnachtsmarkt statt.",
    "exp": "Der Katschhof war einst der Verbindungshof der karolingischen Pfalzanlage; heute finden dort stimmungsvolle Konzerte und der Weihnachtsmarkt statt."
  },
  {
    "cat": "aachen",
    "diff": "pro",
    "q": "Wie heißt der ehemalige Kursaal und Stadtgarten südlich von Frankenberg, der heute als renommiertes Kulturzentrum erstrahlt?",
    "a": [
      "Das Kurhaus Burtscheid",
      "Die Kurkolonnaden Ponttor",
      "Das Palais thermal Elisenbrunnen",
      "Die Kaisertherme am Lousberg"
    ],
    "explanation": "Burtscheid besaß eigene heiße Quellen und war bis 1897 eine eigenständige Kurstadt mit mondänem Kurhaus und Kurbädern.",
    "exp": "Burtscheid besaß eigene heiße Quellen und war bis 1897 eine eigenständige Kurstadt mit mondänem Kurhaus und Kurbädern."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === 'function') {
    window.ArcadeQuizEngine.registerBank('napoli72h', QUESTIONS);
  }
})();
