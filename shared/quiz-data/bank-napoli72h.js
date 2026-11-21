// Unified quiz bank for "napoli72h" (75 questions: Napoli72H Pizza & Frankenberger Viertel Aachen)
(function () {
  const DATA = [
  {
    "cat": "napoli72h",
    "diff": "easy",
    "q": "Wofür steht die Ziffernkombination „72H“ im Namen des Restaurants Napoli72H in Aachen?",
    "a": [
      "Für 72 Stunden kontrollierte kalte Teiggare",
      "Für 72 Grad Backtemperatur im Kuppelofen",
      "Für 72 Gramm frische Hefe je Pizzateig",
      "Für 72 Sekunden Rührzeit im Teigkneter"
    ],
    "explanation": "Der Pizzateig ruht 72 Stunden lang kalt. Dadurch bauen Hefen und Enzyme Stärke ab, was den Teig leicht verdaulich und herrlich luftig macht.",
    "exp": "Der Pizzateig ruht 72 Stunden lang kalt. Dadurch bauen Hefen und Enzyme Stärke ab, was den Teig leicht verdaulich und herrlich luftig macht."
  },
  {
    "cat": "napoli72h",
    "diff": "easy",
    "q": "Wie lange verweilt eine echte neapolitanische Pizza bei Napoli72H im heißen Ofen?",
    "a": [
      "Rund 60 bis 90 Sekunden lang",
      "Etwa 3 bis 4 Minuten im Ofen",
      "Genau 5 bis 7 Minuten Backzeit",
      "Knapp 10 bis 12 Minuten Dauer"
    ],
    "explanation": "Bei extremer Gluthitze von fast 485 Grad reicht eine Minute völlig aus, um den Rand aufzublähen, während der Belag frisch und saftig bleibt.",
    "exp": "Bei extremer Gluthitze von fast 485 Grad reicht eine Minute völlig aus, um den Rand aufzublähen, während der Belag frisch und saftig bleibt."
  },
  {
    "cat": "napoli72h",
    "diff": "easy",
    "q": "Bei welcher enormen Backtemperatur backen die Spezialöfen bei Napoli72H?",
    "a": [
      "Bei heißen 450 bis 485 Grad Celsius",
      "Bei rund 200 bis 220 Grad Celsius",
      "Bei maximal 300 bis 320 Grad Celsius",
      "Bei schonenden 160 bis 180 Grad Celsius"
    ],
    "explanation": "Die traditionelle Pizza Napoletana verlangt Kuppeltemperaturen von rund 450 bis 485 Grad für den typischen 'Schockback'-Effekt.",
    "exp": "Die traditionelle Pizza Napoletana verlangt Kuppeltemperaturen von rund 450 bis 485 Grad für den typischen 'Schockback'-Effekt."
  },
  {
    "cat": "napoli72h",
    "diff": "easy",
    "q": "Welche Tomatensorte wächst auf den fruchtbaren vulkanischen Hängen des Vesuvs und bildet die Basis der Napoli72H-Soße?",
    "a": [
      "Echte San-Marzano-Tomaten D.O.P.",
      "Klassische Ochsenherz-Tomaten",
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
      "Geriebener junger Gouda",
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
      "Im Aachener Frankenberger Viertel",
      "Im Universitätsviertel am Ponttor",
      "Im Gewerbegebiet Aachener Kreuz",
      "Im Stadtteil Kornelimünster"
    ],
    "explanation": "Mitten im pulsierenden 'Franki' an der von Bäumen gesäumten Oppenhoffallee startete die Erfolgsgeschichte von Napoli72H.",
    "exp": "Mitten im pulsierenden 'Franki' an der von Bäumen gesäumten Oppenhoffallee startete die Erfolgsgeschichte von Napoli72H."
  },
  {
    "cat": "napoli72h",
    "diff": "easy",
    "q": "Welche feine Wurstspezialität aus Kalabrien sorgt bei der Pizza 'Diavola' oder pikanten Kreationen für die feurige Schärfe?",
    "a": [
      "Pikante, streichfähige Nduja di Spilinga",
      "Milde Mortadella aus der Region Bologna",
      "Feine Fenchelsalami aus Mittelitalien",
      "Deutscher geräucherter Landschinken"
    ],
    "explanation": "'Nduja ist eine herrlich würzige, streichfähige Rohwurst aus Kalabrien, die mit kalabrischen Chilischoten verfeinert wird und auf der Pizza schmilzt.",
    "exp": "'Nduja ist eine herrlich würzige, streichfähige Rohwurst aus Kalabrien, die mit kalabrischen Chilischoten verfeinert wird und auf der Pizza schmilzt."
  },
  {
    "cat": "napoli72h",
    "diff": "mid",
    "q": "Wo in der Aachener Innenstadt eröffnete Napoli72H seinen zweiten Standort mit großem Gastraum?",
    "a": [
      "In der Franzstraße",
      "Am belebten Marktplatz",
      "Am Hansemannplatz",
      "In der oberen Pontstraße"
    ],
    "explanation": "Der zweite Standort in der Franzstraße verbindet urbane Aachener City-Lage mit authentischem neapolitanischem Flair.",
    "exp": "Der zweite Standort in der Franzstraße verbindet urbane Aachener City-Lage mit authentischem neapolitanischem Flair."
  },
  {
    "cat": "napoli72h",
    "diff": "mid",
    "q": "Warum verzichten die Pizzaioli bei Napoli72H beim Ausformen des Teigs strikt auf ein hölzernes Nudelholz?",
    "a": [
      "Weil ein Nudelholz die Luftbläschen im Rand zerquetschen würde",
      "Weil Nudelholz-Klopfen laut neapolitanischer Tradition Unglück bringt",
      "Weil der Pizzateig sonst zu viel Mehl von der Arbeitsfläche aufsaugt",
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
      "Feine Trüffelcreme und frische Pilze",
      "Gekochter Hinterschinken und süßer Mais",
      "Gebratene Garnelen und exotische Ananas",
      "Würzige Paprikastreifen und rote Zwiebeln"
    ],
    "explanation": "Feine Trüffelcreme harmoniert perfekt mit dem mild-cremigen Fior di Latte und dem knusprig-fluffigen Teigrand.",
    "exp": "Feine Trüffelcreme harmoniert perfekt mit dem mild-cremigen Fior di Latte und dem knusprig-fluffigen Teigrand."
  },
  {
    "cat": "napoli72h",
    "diff": "mid",
    "q": "Aus welcher süditalienischen Region stammen die kunstvoll gemauerten Steinbacköfen von Napoli72H?",
    "a": [
      "Aus der süditalienischen Region Kampanien",
      "Aus der sonnigen Weinregion Toskana",
      "Aus der wohlhabenden Region Lombardei",
      "Aus dem alpinen Piemont im Norden"
    ],
    "explanation": "Echte neapolitanische Öfen werden traditionell von spezialisierten Ofenbauern in Neapel aus speziellem Vulkangestein gefertigt.",
    "exp": "Echte neapolitanische Öfen werden traditionell von spezialisierten Ofenbauern in Neapel aus speziellem Vulkangestein gefertigt."
  },
  {
    "cat": "napoli72h",
    "diff": "mid",
    "q": "Was zeichnet den Pizzateig bei Napoli72H bezüglich seines Wassergehalts (Hydratation) aus?",
    "a": [
      "Extrem bekömmlich, luftig und kross",
      "Besonders fest, schwer und teigig",
      "Auffallend trocken und sandig-mürbe",
      "Ungewöhnlich zäh und gummiartig im Biss"
    ],
    "explanation": "Eine hohe Hydratation (Wasseranteil im Verhältnis zum Mehl) sorgt in Verbindung mit langer Gärung für die zarte, saftige Krume.",
    "exp": "Eine hohe Hydratation (Wasseranteil im Verhältnis zum Mehl) sorgt in Verbindung mit langer Gärung für die zarte, saftige Krume."
  },
  {
    "cat": "napoli72h",
    "diff": "mid",
    "q": "Welche feine Kombination aus Fleisch und Frucht macht die Gourmet-Kreation 'Parma' bei vielen Gästen so beliebt?",
    "a": [
      "Würziger Parmaschinken, cremig-frischer Käse und knackiger Rucola",
      "Pikante Peperoniwurst, getrocknete Ananasstücke und milder Gouda",
      "Geräucherter Speck, eingelegte Birnenscheiben und gereifter Bergkäse",
      "Gegrilltes Rindfleisch, grüne Apfelspalten und scharfer Senfkäse"
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
      "Enzyme zerlegen Mehlstärke in Einfachzucker und organische Säuren",
      "Der Teig saugt über drei Tage hinweg enorme Mengen Sauerstoff auf",
      "Zugesetztes Backpulver entfaltet erst nach drei Tagen Treibkraft",
      "Hoher Salzgehalt regt den Weizenkeimling im Teigballen zum Keimen an"
    ],
    "explanation": "Die Fermentation baut komplexe Kohlenhydrate langsam ab. Es entstehen milde Aromen, und der Teig karamellisiert im Ofen perfekt.",
    "exp": "Die Fermentation baut komplexe Kohlenhydrate langsam ab. Es entstehen milde Aromen, und der Teig karamellisiert im Ofen perfekt."
  },
  {
    "cat": "napoli72h",
    "diff": "pro",
    "q": "Welche Schaufel-Technik nutzt der Pizzaiolo, um die belegte Pizza vom Marmortisch in den Ofen zu befördern?",
    "a": [
      "Ein kurzer Ruck auf der gelochten Schaufel siebt Mehl ab",
      "Das Einrollen der Pizza auf ein spezielles Nadelkissen vor dem Ofen",
      "Ein Schaufelblatt aus nassem Holz saugt den feuchten Teigboden an",
      "Das vorherige Einfrieren des Teigbodens für dreißig Sekunden im Froster"
    ],
    "explanation": "Gelochte Pizzaschaufeln lassen überschüssiges Streumehl durchfallen, damit es auf dem heißen Ofenstein nicht verbrennt und bitter schmeckt.",
    "exp": "Gelochte Pizzaschaufeln lassen überschüssiges Streumehl durchfallen, damit es auf dem heißen Ofenstein nicht verbrennt und bitter schmeckt."
  },
  {
    "cat": "napoli72h",
    "diff": "pro",
    "q": "Welche Rolle spielt die relative Luftfeuchtigkeit im Teigraum während der 72-stündigen Gärphase?",
    "a": [
      "Sie verhindert das Austrocknen und eine harte Haut auf den Ballen",
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
      "Hochwertige Aromen und Polyphenole verfliegen bei Ofenhitze rasch",
      "Der Ofen würde durch spritzendes Olivenöl sofort in Brand geraten",
      "Kaltes Olivenöl senkt die Temperatur des Pizzasteins um hundert Grad",
      "Olivenöl vor dem Backen neutralisiert den fruchtigen Tomatengeschmack"
    ],
    "explanation": "Eine feine Spirale frischen Olivenöls vollendet das Geschmackserlebnis, ohne dass die zarten Fruchtnoten durch die Hitze zerstört werden.",
    "exp": "Eine feine Spirale frischen Olivenöls vollendet das Geschmackserlebnis, ohne dass die zarten Fruchtnoten durch die Hitze zerstört werden."
  },
  {
    "cat": "napoli72h",
    "diff": "pro",
    "q": "Was unterscheidet die Pizza 'Margherita di Bufala' von der Standard-Margherita auf der Karte?",
    "a": [
      "Echter Büffelmozzarella D.O.P. mit intensiv-cremigem Aroma",
      "Verwendung von gelben Datteltomaten statt roter San-Marzano",
      "Ein Teigboden mit frischer Büffelbutter statt feinem Olivenöl",
      "Ausschließliches Backen über frisch geschlagenen Buchenholzscheiten"
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
      "Calzone napoletano",
      "Crostata rustica"
    ],
    "explanation": "Der 'Cornicione' (wörtlich: Gesims oder Rahmen) ist das Markenzeichen der echten Napoletana: außen kross, innen wolkenweich.",
    "exp": "Der 'Cornicione' (wörtlich: Gesims oder Rahmen) ist das Markenzeichen der echten Napoletana: außen kross, innen wolkenweich."
  },
  {
    "cat": "handwerk",
    "diff": "easy",
    "q": "Welches Mehl mit hohem Glutengehalt gilt als unverzichtbarer Goldstandard für neapolitanischen Pizzateig?",
    "a": [
      "Italienisches Tipo 00 Mehl mit hohem W-Wert",
      "Deutsches Weizenmehl Type 405 für Kuchen",
      "Dunkles Vollkorn-Roggenmehl Type 1150",
      "Reines Buchweizen-Spezialmehl ohne Gluten"
    ],
    "explanation": "Tipo 00 ist ein feinst vermahlenes Weichweizenmehl mit hohem Proteingehalt (starkes Klebergerüst für langes Aufgehen).",
    "exp": "Tipo 00 ist ein feinst vermahlenes Weichweizenmehl mit hohem Proteingehalt (starkes Klebergerüst für langes Aufgehen)."
  },
  {
    "cat": "handwerk",
    "diff": "easy",
    "q": "Wie nennt man die charakteristischen kleinen dunklen Röstflecken auf dem aufgegangenen Pizzateigrand?",
    "a": [
      "Leopardenmuster",
      "Zebra-Streifenmuster",
      "Schachbrettmuster",
      "Marmoriertes Röstmuster"
    ],
    "explanation": "Kleine, aromatische dunkle Bläschen zeugen von perfekter Teigfermentation und dem kurzen Schockbacken bei extremer Hitze.",
    "exp": "Kleine, aromatische dunkle Bläschen zeugen von perfekter Teigfermentation und dem kurzen Schockbacken bei extremer Hitze."
  },
  {
    "cat": "handwerk",
    "diff": "easy",
    "q": "Welcher feine Grieß wird auf der Arbeitsplatte verwendet, damit der Teigling sanft auf die Schaufel gleitet?",
    "a": [
      "Hartweizengrieß (Semola)",
      "Paniermehl aus Weißbrot",
      "Weißes Kartoffelstärkemehl",
      "Feiner Puderzucker"
    ],
    "explanation": "Semola rimacinata verbrennt im Ofen viel schwerer als normales Mehl und verleiht dem Boden einen herrlich knusprigen Biss.",
    "exp": "Semola rimacinata verbrennt im Ofen viel schwerer als normales Mehl und verleiht dem Boden einen herrlich knusprigen Biss."
  },
  {
    "cat": "handwerk",
    "diff": "mid",
    "q": "Aus welchem besonderen vulkanischen Material besteht der Boden traditioneller Pizzaöfen in Neapel?",
    "a": [
      "Aus neapolitanischem Vulkantuff",
      "Aus poliertem Alpen-Granit",
      "Aus feuerfestem Edelstahl",
      "Aus gebranntem Schiefergestein"
    ],
    "explanation": "Biscotto di Sorrento leitet Hitze langsamer als normaler Schamottstein. So verbrennt der Teigboden selbst bei 485 Grad Hitze nicht.",
    "exp": "Biscotto di Sorrento leitet Hitze langsamer als normaler Schamottstein. So verbrennt der Teigboden selbst bei 485 Grad Hitze nicht."
  },
  {
    "cat": "handwerk",
    "diff": "mid",
    "q": "Was versteht man in der Teigführung unter den beiden Phasen 'Puntata' und 'Appretto'?",
    "a": [
      "Die Stockgare des Teigs und die Stückgare der Ballen",
      "Das anfängliche Kneten und das spätere Formen von Hand",
      "Das Belegen mit Tomaten und das Bestreuen mit Käse",
      "Das Vorheizen des Ofens und das Auskehren der Asche"
    ],
    "explanation": "Puntata bezeichnet die Ruhezeit des großen Teigklumpens; Appretto ist die Reifezeit, nachdem die Portionen zu runden Ballen geformt wurden.",
    "exp": "Puntata bezeichnet die Ruhezeit des großen Teigklumpens; Appretto ist die Reifezeit, nachdem die Portionen zu runden Ballen geformt wurden."
  },
  {
    "cat": "handwerk",
    "diff": "mid",
    "q": "Warum dreht der Pizzaiolo die Pizza nach rund 30 Sekunden im Ofen mit einer kleinen runden Schaufel (Palino)?",
    "a": [
      "Für eine gleichmäßige Bräunung, da die Glutseite heißer strahlt",
      "Um den Teigboden mit kalter Zugluft von unten sanft zu kühlen",
      "Damit das flüssige Fett vom Mozzarella genau zur Mitte hin abfließt",
      "Weil der Pizzateig sonst am porösen Steinboden festbacken würde"
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
      "Maximal 20 bis 22 Zentimeter",
      "Mindestens 45 bis 48 Zentimeter",
      "Genau 50 bis 52 Zentimeter"
    ],
    "explanation": "Eine traditionelle Napoletana misst etwa 30 bis 32 cm. Sie ist in der Mitte hauchdünn (ca. 3 mm) und am Rand bis zu 2 cm hoch.",
    "exp": "Eine traditionelle Napoletana misst etwa 30 bis 32 cm. Sie ist in der Mitte hauchdünn (ca. 3 mm) und am Rand bis zu 2 cm hoch."
  },
  {
    "cat": "handwerk",
    "diff": "mid",
    "q": "Warum legen Spitzen-Pizzabäcker frischen Mozzarella vor dem Belegen für einige Stunden in ein Sieb?",
    "a": [
      "Damit Molke abtropft und die Pizza im Ofen nicht verwässert",
      "Damit der Käse an der Luft eine gelbe Schutzschicht ansetzt",
      "Um den Fettgehalt des Käses vor dem Backen chemisch zu halbieren",
      "Damit die Hefe aus der Umgebungsluft den Käse fermentiert"
    ],
    "explanation": "Frischer Mozzarella enthält viel Flüssigkeit. Ungeseiht würde er die Pizza bei 485 Grad in eine wässrige Suppe verwandeln.",
    "exp": "Frischer Mozzarella enthält viel Flüssigkeit. Ungeseiht würde er die Pizza bei 485 Grad in eine wässrige Suppe verwandeln."
  },
  {
    "cat": "handwerk",
    "diff": "mid",
    "q": "Warum wird frisches Basilikum bei neapolitanischen Pizzaioli oft unter den Käse gelegt oder vor dem Ofen aufgelegt?",
    "a": [
      "Die ätherischen Öle entfalten im Käseschutz ihr volles Aroma",
      "Das Basilikum verbrennt durch die Ofenhitze sonst zu feiner Asche",
      "Rohe Basilikumblätter wären für die Gäste vollkommen unverdaulich",
      "Die Blätter bremsen das Verlaufen der Tomatensoße mechanisch ab"
    ],
    "explanation": "Im heißen Ofen schützt der Käse das Blatt vor dem Verbrennen; die Hitze infundiert das Basilikumaroma tief in Sauce und Käse.",
    "exp": "Im heißen Ofen schützt der Käse das Blatt vor dem Verbrennen; die Hitze infundiert das Basilikumaroma tief in Sauce und Käse."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Warum benötigt man bei einer 72-stündigen kalten Teigführung nur einen winzigen Bruchteil normaler Frischhefe?",
    "a": [
      "Hefezellen vermehren sich über die lange Zeitspanne ausreichend",
      "Hefe setzt bei kühler Temperatur giftige Gärstoffe frei",
      "Der Teig würde sonst explodieren und die Gärbehälter sprengen",
      "Das Speisesalz im Teig wirkt nach drei Tagen selbst als Treibmittel"
    ],
    "explanation": "Oft reicht weniger als 1 Gramm Hefe auf 1 Kilogramm Mehl. Zu viel Hefe würde den Teig bei langer Reifung ungenießbar übersäuern.",
    "exp": "Oft reicht weniger als 1 Gramm Hefe auf 1 Kilogramm Mehl. Zu viel Hefe würde den Teig bei langer Reifung ungenießbar übersäuern."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Welche zwei Proteine im Weizenmehl bilden beim Kneten mit Wasser das elastische Glutennetzwerk?",
    "a": [
      "Gliadin und Glutenin im Mehl",
      "Kasein und Albumin der Milch",
      "Kollagen und Keratin der Haut",
      "Myosin und Aktin im Muskel"
    ],
    "explanation": "Gliadin sorgt für die Dehnbarkeit des Teigs, Glutenin für seine Elastizität und Reißfestigkeit – zusammen formen sie das Klebegerüst.",
    "exp": "Gliadin sorgt für die Dehnbarkeit des Teigs, Glutenin für seine Elastizität und Reißfestigkeit – zusammen formen sie das Klebegerüst."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Was versteht man beim Brot- und Pizzabacken unter dem handwerklichen Schritt der 'Autolyse'?",
    "a": [
      "Ruhenlassen von Mehl und Wasser vor Zugabe von Hefe und Salz",
      "Kräftiges Durchkneten des Teiges mit heißem Wasserdampf",
      "Einbrennen des Pizzasteins mit Speiseöl vor Schichtbeginn",
      "Sofortiges Schockfrosten des fertig gekneteten Teigklumpens"
    ],
    "explanation": "Während der Autolyse quellen die Mehlproteine vorab auf und Enzyme starten den Stärkeabbau. Das verkürzt die spätere Knetzeit massiv.",
    "exp": "Während der Autolyse quellen die Mehlproteine vorab auf und Enzyme starten den Stärkeabbau. Das verkürzt die spätere Knetzeit massiv."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Was bezeichnet der moderne neapolitanische Fachbegriff 'Pizza Canotto'?",
    "a": [
      "Pizza mit extrem voluminösem, luftgefülltem Rand",
      "Pizza in der Form eines kleinen gefalteten Holzkanus",
      "Viereckige Blechpizza für Schifffahrtsgesellschaften",
      "Flache Pizza, die auf einem Holzfloß serviert wird"
    ],
    "explanation": "Canotto bedeutet Schlauchboot. Junge neapolitanische Pizzaioli perfektionierten Teige mit riesigen, hohlen Luftkammern im Rand.",
    "exp": "Canotto bedeutet Schlauchboot. Junge neapolitanische Pizzaioli perfektionierten Teige mit riesigen, hohlen Luftkammern im Rand."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Woran erkennt ein Pizzaiolo, dass ein Teigling nach 72 Stunden seine optimale Reife (Gärhöhepunkt) erreicht hat?",
    "a": [
      "Federt bei Fingerdruck langsam zurück und fühlt sich kissenartig an",
      "Wird vollkommen steinhart und klingt beim leichten Anklopfen hohl",
      "Verflüssigt sich fast vollständig und zerfließt auf der Arbeitsplatte",
      "Verfärbt sich an der gesamten Oberseite durchgehend dunkelgrün"
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
      "Das Gütezeichen STG erlaubt nur Wasser, Mehl, Hefe und Salz",
      "Schmalz erzeugt im 485-Grad-Ofen dichte und beißende Rauchschwaden",
      "Der Teig verliert durch Fettzusatz seine elastische Dehnbarkeit",
      "Tierische Fette sind laut italienischem Gastronomiegesetz verboten"
    ],
    "explanation": "Die traditionelle neapolitanische Rezeptur ist puristisch: Nur 4 Grundzutaten garantieren die typische Bekömmlichkeit und Krumenstruktur.",
    "exp": "Die traditionelle neapolitanische Rezeptur ist puristisch: Nur 4 Grundzutaten garantieren die typische Bekömmlichkeit und Krumenstruktur."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Wie nennt man das handwerkliche Käsereifungs- und Ziehverfahren, zu dem Mozzarella, Provolone und Caciocavallo gehören?",
    "a": [
      "Pasta Filata (Brüh- und Knetkäse)",
      "Blauschimmel-Kultivierung im Felsenkeller",
      "Gepresster Hartkäse nach Bergkäse-Art",
      "Traditioneller Rohmilch-Schichtkäse"
    ],
    "explanation": "Der Bruch wird mit heißem Wasser übergossen, zu Fäden ausgezogen (filare) und zu Kugeln abgedreht (mozzare) – daher der Name Mozzarella.",
    "exp": "Der Bruch wird mit heißem Wasser übergossen, zu Fäden ausgezogen (filare) und zu Kugeln abgedreht (mozzare) – daher der Name Mozzarella."
  },
  {
    "cat": "handwerk",
    "diff": "pro",
    "q": "Warum wird Pizzateig im professionellen Spiralkneter idealerweise mit sehr kaltem Wasser geknetet?",
    "a": [
      "Reibungswärme der Knetspirale würde den Teig über 24 Grad erwärmen",
      "Hefen beginnen ihre Gärtätigkeit erst unter dem Gefrierpunkt",
      "Das grobe Meersalz gefriert im kalten Wasser zu feinen Kristallen",
      "Warmes Wasser löst das Klebereiweiß im Mehl sofort irreversibel auf"
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
      "Zieh mich hoch!",
      "Küss mich sanft!",
      "Süßer Himmelstraum",
      "Kalter Kaffeegenuss"
    ],
    "explanation": "Espresso, Mascarpone und Löffelbiskuits sollten dem Genießer einen Muntermacher-Kick verleihen – 'Tira mi sù'.",
    "exp": "Espresso, Mascarpone und Löffelbiskuits sollten dem Genießer einen Muntermacher-Kick verleihen – 'Tira mi sù'."
  },
  {
    "cat": "italien",
    "diff": "easy",
    "q": "Aus welcher norditalienischen Region rund um die gleichnamige Stadt stammt der weltberühmte Parmaschinken?",
    "a": [
      "Aus der Region Emilia-Romagna",
      "Aus der Region Lombardei",
      "Aus der sonnigen Toskana",
      "Aus dem nördlichen Piemont"
    ],
    "explanation": "Das milde Klima der Hügel um Parma und die Veredelung mit Meersalz machen den Prosciutto di Parma D.O.P. weltberühmt.",
    "exp": "Das milde Klima der Hügel um Parma und die Veredelung mit Meersalz machen den Prosciutto di Parma D.O.P. weltberühmt."
  },
  {
    "cat": "italien",
    "diff": "easy",
    "q": "Warum trinken traditionsbewusste Italiener nach 11 Uhr vormittags oder nach dem Essen keinen Cappuccino mehr?",
    "a": [
      "Warme Milch nach dem Essen gilt als schwer verdaulich",
      "Milchkaffee erzeugt nach altem Volksglauben böse Träume",
      "Kaffeebohnen setzen am Nachmittag anderes Koffein frei",
      "Milchgeschäfte schließen in Italien mittags ihre Pforten"
    ],
    "explanation": "Cappuccino ist in Italien ein reines Frühstücksgetränk; nach dem Essen schließt ein kurzer, heißer Espresso (Caffè) den Magen ab.",
    "exp": "Cappuccino ist in Italien ein reines Frühstücksgetränk; nach dem Essen schließt ein kurzer, heißer Espresso (Caffè) den Magen ab."
  },
  {
    "cat": "italien",
    "diff": "easy",
    "q": "Was verbirgt sich hinter der herzerwärmenden neapolitanischen Tradition des 'Caffè Sospeso'?",
    "a": [
      "Man bezahlt zwei Kaffees und spendiert einen für Bedürftige",
      "Man trinkt den Espresso im Stehen aus einer Holztasse",
      "Man balanciert die heiße Espressotasse auf dem Zeigefinger",
      "Man verdünnt den heißen Espresso mit eiskaltem Quellwasser"
    ],
    "explanation": "Der 'aufgeschobene Kaffee' ist ein Symbol neapolitanischer Solidarität: Jeder soll sich einen belebenden Espresso leisten können.",
    "exp": "Der 'aufgeschobene Kaffee' ist ein Symbol neapolitanischer Solidarität: Jeder soll sich einen belebenden Espresso leisten können."
  },
  {
    "cat": "italien",
    "diff": "easy",
    "q": "Was bedeutet das Gütesiegel 'Olio Extra Vergine di Oliva' bei hochwertigem Olivenöl?",
    "a": [
      "Natives Olivenöl höchster Güteklasse, mechanisch kalt gepresst",
      "Olivenöl mit mindestens zehnprozentigem Zusatz von Sonnenblumenöl",
      "Gekochtes und gefiltertes Speiseöl für gewerbliche Hochleistungsfritteusen",
      "Olivenöl, das aus bereits ausgepressten Restkernen heiß destilliert wurde"
    ],
    "explanation": "Es darf einen Säuregehalt von maximal 0,8 % aufweisen und muss rein durch schonende mechanische Pressung bei unter 27 °C gewonnen werden.",
    "exp": "Es darf einen Säuregehalt von maximal 0,8 % aufweisen und muss rein durch schonende mechanische Pressung bei unter 27 °C gewonnen werden."
  },
  {
    "cat": "italien",
    "diff": "easy",
    "q": "Wie heißt die schnurkerzengerade historische Straße, die das Herz Neapels buchstäblich in zwei Hälften teilt?",
    "a": [
      "Die Spaccanapoli",
      "Die berühmte Via Toledo",
      "Der breite Corso Umberto",
      "Die historische Via Tribunali"
    ],
    "explanation": "Spaccanapoli ('Neapel-Spalter') folgt dem antiken Decumanus Inferior und bietet einen atemberaubenden Blick über die Altstadt.",
    "exp": "Spaccanapoli ('Neapel-Spalter') folgt dem antiken Decumanus Inferior und bietet einen atemberaubenden Blick über die Altstadt."
  },
  {
    "cat": "italien",
    "diff": "mid",
    "q": "Worin liegt der Unterschied zwischen Parmigiano Reggiano und Grana Padano?",
    "a": [
      "Parmigiano verbietet Silofutter und reift im Schnitt deutlich länger",
      "Grana Padano wird aus Schafsmilch hergestellt, Parmigiano aus Ziegenmilch",
      "Parmigiano darf nur im Winter produziert werden, Grana Padano nur im Sommer",
      "Grana Padano wird vor dem Einlagern in heißer Salzlake kurz frittiert"
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
      "Gebacken für Seeleute mit haltbaren Zutaten: Tomate, Knoblauch, Öl",
      "Fischer aßen damals den frischen Fisch heimlich vor dem Backen auf",
      "Meeresfrüchte verwandeln sich im Ofen bei 485 Grad in giftige Dämpfe",
      "Marinara bedeutet im neapolitanischen Dialekt schlichter Gemüsegarten"
    ],
    "explanation": "Fischer nahmen diese einfache Pizza mit auf See. Knoblauch und Oregano brauchten keine Kühlung und blieben tagelang aromatisch.",
    "exp": "Fischer nahmen diese einfache Pizza mit auf See. Knoblauch und Oregano brauchten keine Kühlung und blieben tagelang aromatisch."
  },
  {
    "cat": "italien",
    "diff": "mid",
    "q": "Welche seltene Eigenschaft macht die neapolitanische 'Piennolo del Vesuvio'-Tomate so legendär?",
    "a": [
      "Sie wird in Trauben aufgehängt und bleibt monatelang saftig frisch",
      "Sie wächst vollständig unterirdisch in dunklen vulkanischen Erdhöhlen",
      "Sie ist von Natur aus tiefschwarz gefärbt und schmeckt intensiv nach Kakao",
      "Sie blüht und reift im Freiland ausschließlich bei Vollmond im August"
    ],
    "explanation": "Die kleinen Vesuv-Tomaten hängen in Bündeln ('Piennoli') an Scheunenwänden; mit der Zeit konzentriert sich ihr Fruchtfleisch zu pikanter Süße.",
    "exp": "Die kleinen Vesuv-Tomaten hängen in Bündeln ('Piennoli') an Scheunenwänden; mit der Zeit konzentriert sich ihr Fruchtfleisch zu pikanter Süße."
  },
  {
    "cat": "italien",
    "diff": "mid",
    "q": "Aus welchem klassischen ligurischen Originalrezept stammt das berühmte 'Pesto alla Genovese'?",
    "a": [
      "Basilikum, Pinienkerne, Knoblauch, Salz, Hartkäse und Olivenöl",
      "Petersilie, Walnusskerne, Crème fraîche und gehackte Mandeln",
      "Rosmarinnadeln, Sonnenblumenkerne, Meersalz und geschmolzene Butter",
      "Getrocknete Strauchtomaten, edelsüßes Paprikapulver und Weinessig"
    ],
    "explanation": "Traditionell im Marmormörser mit Holzstößel kalt zerrieben, damit das Basilikum nicht oxidiert und dunkel wird.",
    "exp": "Traditionell im Marmormörser mit Holzstößel kalt zerrieben, damit das Basilikum nicht oxidiert und dunkel wird."
  },
  {
    "cat": "italien",
    "diff": "mid",
    "q": "Was bedeutet das geschützte europäische Siegel 'D.O.P.' (Denominazione d'Origine Protetta) auf italienischen Lebensmitteln?",
    "a": [
      "Geschützte Ursprungsbezeichnung: Alle Schritte in einer Region",
      "Garantiert zuckerfreies Lebensmittel für sportliche Ernährung",
      "Auszeichnung für Produkte, die ausschließlich per Hand verpackt wurden",
      "Staatliches Prüfsiegel für Erzeugnisse aus biologischer Gewächshauszucht"
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
      "Dicke Schale reich an ätherischen Ölen und mildes Fruchtfleisch",
      "Völlig kernloses Fruchtfleisch mit einem festen verholzten Innenkern",
      "Frucht reift erst nach dreimonatigem Einlegen in kaltem Salzwasser",
      "Fruchtsaft ist so sauer, dass man die Früchte nicht pur berühren darf"
    ],
    "explanation": "An den Steilhängen der Amalfiküste gereift, sind sie die Hauptzutat für echten Limoncello; man kann sie sogar wie Äpfel mit Schale essen.",
    "exp": "An den Steilhängen der Amalfiküste gereift, sind sie die Hauptzutat für echten Limoncello; man kann sie sogar wie Äpfel mit Schale essen."
  },
  {
    "cat": "italien",
    "diff": "pro",
    "q": "Warum galt Neapel im 18. und 19. Jahrhundert historisch als Welthauptstadt der Makkaroni- und Pasta-Liebhaber?",
    "a": [
      "Warmes, windiges Klima bot ideale Bedingungen für die Freilufttrocknung",
      "Der neapolitanische König bestrafte den Verzehr von Reis drakonisch",
      "Frische Hartweizenpasta war damals billiger als gefiltertes Trinkwasser",
      "In den Gassen Neapels wurde die erste mechanische Teigpresse konstruiert"
    ],
    "explanation": "Seeluft und Vesuvwinde trockneten Hartweizennudeln in Gragnano perfekt; Neapolitaner aßen lange Makkaroni damals spektakulär mit den bloßen Händen.",
    "exp": "Seeluft und Vesuvwinde trockneten Hartweizennudeln in Gragnano perfekt; Neapolitaner aßen lange Makkaroni damals spektakulär mit den bloßen Händen."
  },
  {
    "cat": "italien",
    "diff": "pro",
    "q": "Wie wird bei der Produktion von Parmaschinken garantiert, dass das Fleisch sein unvergleichlich mildes Aroma entwickelt?",
    "a": [
      "Fütterung der Schweine mit Getreide und Molke aus der Käserei",
      "Sechsmonatiges Marinieren des Fleisches in süßem Traubensaft",
      "Tägliches Einreiben des gesamten Schinkens mit flüssigem Bienenhonig",
      "Permanentes Bedampfen der Reifekammern mit heißem Zigarrenrauch"
    ],
    "explanation": "Käse und Schinken bilden eine Symbiose: Die Molke der Käsekessel verleiht dem Fleisch der Parmaschweine seine feine Marmorierung.",
    "exp": "Käse und Schinken bilden eine Symbiose: Die Molke der Käsekessel verleiht dem Fleisch der Parmaschweine seine feine Marmorierung."
  },
  {
    "cat": "italien",
    "diff": "pro",
    "q": "Welche historische Festung auf einer kleinen Felseninsel im Meer vor Neapel trägt den Namen 'Castel dell'Ovo'?",
    "a": [
      "Castel dell Ovo (Burg des Eies)",
      "Castel Nuovo (Maschio Angioino)",
      "Castel Sant Elmo auf dem Vomero",
      "Castel Capuano an der Pforte"
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
      "Corso Vittorio Emanuele",
      "Piazza del Plebiscito",
      "Via Toledo Einkaufspromenade"
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
      "Das alte Aachener Ponttor",
      "Der historische Aachener Dom",
      "Das Grashaus am Marktplatz"
    ],
    "explanation": "Die romantische Burg Frankenberg inmitten eines kleinen Parks war einst eine ritterliche Wasserburg und ist das Herz des Viertels.",
    "exp": "Die romantische Burg Frankenberg inmitten eines kleinen Parks war einst eine ritterliche Wasserburg und ist das Herz des Viertels."
  },
  {
    "cat": "aachen",
    "diff": "easy",
    "q": "Wie heißt der elegante, baumbestandene Prachtboulevard im Frankenberger Viertel, an dem Napoli72H zu Hause ist?",
    "a": [
      "Oppenhoffallee im Viertel",
      "Kaiserplatz am Stadttheater",
      "Blücherplatz im Ostviertel",
      "Neumarkt vor der Burg"
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
      "Das nördliche Ponttor",
      "Das historische Kölntor",
      "Das befestigte Jakobstor"
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
      "Schweiz und das Fürstentum"
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
      "Heilkräftiges Aachener Thermalwasser aus vulkanischen Tiefen",
      "Mineralwasser aus einer kohlensäurehaltigen artesischen Gebirgsquelle",
      "Reines, gefiltertes Oberflächenwasser aus dem Aachener Stadtwald",
      "Aufgewärmtes Flusswasser aus dem unterirdischen Bett der nahen Wurm"
    ],
    "explanation": "Die heißen Thermalquellen machten Aachen schon bei Römern und Königen als 'Aquae Granni' zu einem weltberühmten Kurbad.",
    "exp": "Die heißen Thermalquellen machten Aachen schon bei Römern und Königen als 'Aquae Granni' zu einem weltberühmten Kurbad."
  },
  {
    "cat": "aachen",
    "diff": "mid",
    "q": "Welcher berühmte fränkische Herrscher wählte Aachen um 800 zu seiner festen Lieblingsresidenz und Hauptstadt seines Reiches?",
    "a": [
      "Karl der Große",
      "Friedrich Barbarossa",
      "Kaiser Otto der Große",
      "König Ludwig der Fromme"
    ],
    "explanation": "Karl schätzte die heißen Quellen für seine Rheumabeschwerden und ließ die Pfalzkapelle als Zentrum seines Riesenreiches errichten.",
    "exp": "Karl schätzte die heißen Quellen für seine Rheumabeschwerden und ließ die Pfalzkapelle als Zentrum seines Riesenreiches errichten."
  },
  {
    "cat": "aachen",
    "diff": "mid",
    "q": "Welche international renommierte Universität lockt zehntausende Studierende und Forscher aus aller Welt nach Aachen?",
    "a": [
      "RWTH Aachen University",
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
      "Johann Peter Cremer",
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
      "Am Puppenbrunnen in der Aachener Krämerstraße",
      "Am Karlsbrunnen auf dem historischen Markt",
      "Am Hühnerdieb auf dem Aachener Hühnermarkt",
      "Am Fischpüddelchen auf dem Fischmarkt"
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
      "Der Europäische Friedensorden für Kultur",
      "Die Goldene Verdienstmedaille der Union",
      "Der Aachener Ehren-Kaiserring für Bürger"
    ],
    "explanation": "Seit 1950 werden Staats- und Kirchenführer (von Churchill über Havel bis zum Papst) an Christi Himmelfahrt im Krönungssaal geehrt.",
    "exp": "Seit 1950 werden Staats- und Kirchenführer (von Churchill über Havel bis zum Papst) an Christi Himmelfahrt im Krönungssaal geehrt."
  },
  {
    "cat": "aachen",
    "diff": "pro",
    "q": "Warum entstand die Wasserburg Frankenberg historisch ausgerechnet im sumpfigen Bachtal der Bever?",
    "a": [
      "Wehrhafter Vorposten der Grafen von Jülich gegen Aachen",
      "Karl der Große wollte dort seine privaten Rennpferde züchten",
      "Klosteranlage für verbannte italienische Wandermönche",
      "Schutz der Wasserversorgung für die städtischen Brauereien"
    ],
    "explanation": "Das Herzogtum Jülich lag mit den freien Aachener Bürgern im Dauerstreit; Burg Frankenberg war strategischer Stachel im Fleisch der Stadt.",
    "exp": "Das Herzogtum Jülich lag mit den freien Aachener Bürgern im Dauerstreit; Burg Frankenberg war strategischer Stachel im Fleisch der Stadt."
  },
  {
    "cat": "aachen",
    "diff": "pro",
    "q": "Was erinnert im Park der Burg Frankenberg bis heute an das berühmte 'Aachener Flugpionier'-Kapitel?",
    "a": [
      "Hugo Junkers forschte an der RWTH und lebte im Viertel",
      "Der erste Heißluftballon Deutschlands landete im Schlossteich",
      "Die Gebrüder Wright bauten dort ihren ersten Test-Windkanal",
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

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("napoli72h", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["napoli72h"] = DATA;
  }
})();
