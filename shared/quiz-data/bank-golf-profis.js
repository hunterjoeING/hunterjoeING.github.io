// Unified quiz bank for "golf_profis" (75 questions: Majors, Tour & Legenden)
(function () {
  const DATA = [
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welches der vier Herren-Major-Turniere wird als einziges jedes Jahr auf demselben Golfplatz ausgetragen?",
    "a": [
      "The Masters Tournament in Augusta",
      "Die U.S. Open Championship",
      "The Open Championship in Schottland",
      "Die jährliche PGA Championship"
    ],
    "correctIndex": 0,
    "exp": "The Masters findet seit seiner Gründung 1934 ausnahmslos auf dem heiligen Rasen des Augusta National Golf Club in Georgia statt.",
    "explanation": "The Masters findet seit seiner Gründung 1934 ausnahmslos auf dem heiligen Rasen des Augusta National Golf Club in Georgia statt."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welches berühmte Kleidungsstück erhält der Sieger des Masters Tournament in Augusta überreicht?",
    "a": [
      "Das traditionsreiche Green Jacket",
      "Eine elegante rote Krawatte",
      "Eine marineblaue Wollmütze",
      "Einen edlen weißen Kaschmirpullover"
    ],
    "correctIndex": 0,
    "exp": "Das Green Jacket wird seit 1949 an jeden Masters-Gewinner verliehen und symbolisiert die lebenslange Ehrenmitgliedschaft in Augusta.",
    "explanation": "Das Green Jacket wird seit 1949 an jeden Masters-Gewinner verliehen und symbolisiert die lebenslange Ehrenmitgliedschaft in Augusta."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welche ikonische Trophäe wird dem Gewinner der The Open Championship überreicht?",
    "a": [
      "Die silberne Weinkanne Claret Jug",
      "Die gewaltige Wanamaker Trophy",
      "Der gläserne Ryder Cup Wanderpokal",
      "Die goldene Havemeyer Trophy"
    ],
    "correctIndex": 0,
    "exp": "Die 'Golf Champion Trophy', weltweit bekannt als Claret Jug, wird seit 1872 an den 'Champion Golfer of the Year' überreicht.",
    "explanation": "Die 'Golf Champion Trophy', weltweit bekannt als Claret Jug, wird seit 1872 an den 'Champion Golfer of the Year' überreicht."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welcher deutsche Golfer gewann als allererster Deutscher ein Major-Turnier mit seinem Sieg beim Masters 1985?",
    "a": [
      "Bernhard Langer in Augusta",
      "Martin Kaymer in Whistling Straits",
      "Marcel Siem auf der European Tour",
      "Alex Cejka bei den US Open"
    ],
    "correctIndex": 0,
    "exp": "Bernhard Langer siegte 1985 und wiederholte diesen Meilenstein 1993, womit er zwei Green Jackets in seiner Karriere errang.",
    "explanation": "Bernhard Langer siegte 1985 und wiederholte diesen Meilenstein 1993, womit er zwei Green Jackets in seiner Karriere errang."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welcher Golfer hält mit 18 Major-Siegen den ewigen Allzeit-Rekord im Herren-Profigolf?",
    "a": [
      "Jack Nicklaus aus den USA",
      "Tiger Woods aus Kalifornien",
      "Arnold Palmer aus Latrobe",
      "Walter Hagen aus New York"
    ],
    "correctIndex": 0,
    "exp": "Der 'Golden Bear' Jack Nicklaus gewann zwischen 1962 und 1986 sagenhafte 18 Majors und wurde zudem 19 Mal Zweiter.",
    "explanation": "Der 'Golden Bear' Jack Nicklaus gewann zwischen 1962 und 1986 sagenhafte 18 Majors und wurde zudem 19 Mal Zweiter."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Wie viele Major-Titel konnte Tiger Woods in seiner spektakulären Profikarriere bisher erringen?",
    "a": [
      "Genau 15 Major-Titel",
      "Genau 18 Major-Titel",
      "Genau 12 Major-Titel",
      "Genau 20 Major-Titel"
    ],
    "correctIndex": 0,
    "exp": "Tiger Woods steht bei 15 Major-Siegen. Sein emotionaler 15. Titel beim Masters 2019 gilt als eines der größten Comebacks der Sportgeschichte.",
    "explanation": "Tiger Woods steht bei 15 Major-Siegen. Sein emotionaler 15. Titel beim Masters 2019 gilt als eines der größten Comebacks der Sportgeschichte."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welche beiden Kontinente bzw. Regionen treten beim traditionsreichen Ryder Cup gegeneinander an?",
    "a": [
      "Ein Team der USA gegen ein Team Europas",
      "Ein Team Großbritanniens gegen die USA",
      "Ein Team der USA gegen den Rest der Welt",
      "Ein Team Europas gegen ein Team aus Asien"
    ],
    "correctIndex": 0,
    "exp": "Ursprünglich spielten die USA gegen Großbritannien; seit 1979 tritt ganz Kontinentaleuropa gegen das US-Team an.",
    "explanation": "Ursprünglich spielten die USA gegen Großbritannien; seit 1979 tritt ganz Kontinentaleuropa gegen das US-Team an."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "In welchem zweijährigen Rhythmus findet das berühmte Kontinental-Duell des Ryder Cups statt?",
    "a": [
      "Regulär alle zwei Jahre",
      "Regulär jedes einzelne Jahr",
      "Regulär alle vier Jahre",
      "Regulär alle drei Jahre"
    ],
    "correctIndex": 0,
    "exp": "Der Ryder Cup wird im Zweijahresturnus ausgetragen, abwechselnd auf europäischen und US-amerikanischen Spitzenplätzen.",
    "explanation": "Der Ryder Cup wird im Zweijahresturnus ausgetragen, abwechselnd auf europäischen und US-amerikanischen Spitzenplätzen."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welcher deutsche Golfer gewann 2010 die PGA Championship und 2014 die U.S. Open?",
    "a": [
      "Martin Kaymer aus Mettmann",
      "Bernhard Langer aus Anhausen",
      "Maximilian Kieffer aus Bergisch Gladbach",
      "Yannik Paul aus Viernheim"
    ],
    "correctIndex": 0,
    "exp": "Martin Kaymer triumphierte 2010 in Whistling Straits und deklassierte 2014 das Feld in Pinehurst No. 2 mit acht Schlägen Vorsprung.",
    "explanation": "Martin Kaymer triumphierte 2010 in Whistling Straits und deklassierte 2014 das Feld in Pinehurst No. 2 mit acht Schlägen Vorsprung."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Wie heißt das traditionsreiche Damen-Pendant zum Ryder Cup zwischen den USA und Europa?",
    "a": [
      "Der Solheim Cup",
      "Der Curtis Cup",
      "Der Walker Cup",
      "Der Presidents Cup"
    ],
    "correctIndex": 0,
    "exp": "Der Solheim Cup wurde von Karsten Solheim (Gründer von PING) ins Leben gerufen und wird seit 1990 im Matchplay-Format gespielt.",
    "explanation": "Der Solheim Cup wurde von Karsten Solheim (Gründer von PING) ins Leben gerufen und wird seit 1990 im Matchplay-Format gespielt."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welche schwedische Golflegende gewann 72 LPGA-Turniere und 10 Damen-Majors?",
    "a": [
      "Annika Sörenstam aus Schweden",
      "Lydia Ko aus Neuseeland",
      "Karrie Webb aus Australien",
      "Inbee Park aus Südkorea"
    ],
    "correctIndex": 0,
    "exp": "Annika Sörenstam prägte das moderne Damengolf wie keine Zweite und spielte 2001 als einzige Frau eine historische 59er-Runde auf der LPGA Tour.",
    "explanation": "Annika Sörenstam prägte das moderne Damengolf wie keine Zweite und spielte 2001 als einzige Frau eine historische 59er-Runde auf der LPGA Tour."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welcher legendäre Golfer war bekannt als 'The King' und löste in den 1960ern 'Arnie's Army' aus?",
    "a": [
      "Arnold Palmer aus Latrobe (USA)",
      "Sam Snead aus Hot Springs (USA)",
      "Bobby Jones aus Atlanta (USA)",
      "Ben Hogan aus Stephenville (USA)"
    ],
    "correctIndex": 0,
    "exp": "Arnold Palmer begeisterte Millionen mit seinem kraftvollen Spielstil und machte Golf in den 1950er und 60er Jahren zum weltweiten Fernsehsport.",
    "explanation": "Arnold Palmer begeisterte Millionen mit seinem kraftvollen Spielstil und machte Golf in den 1950er und 60er Jahren zum weltweiten Fernsehsport."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welcher spanische Golf-Pionier gewann fünf Majors und begeisterte durch sein unvergleichliches Kurzspiel?",
    "a": [
      "Severiano 'Seve' Ballesteros",
      "José María Olazábal",
      "Sergio García Fernández",
      "Jon Rahm Rodríguez"
    ],
    "correctIndex": 0,
    "exp": "Seve Ballesteros war die charismatische Seele des europäischen Golfsports, gewann dreimal The Open und zweimal das Masters.",
    "explanation": "Seve Ballesteros war die charismatische Seele des europäischen Golfsports, gewann dreimal The Open und zweimal das Masters."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welches der vier Herren-Majors ist das historisch älteste Golfturnier der Welt?",
    "a": [
      "The Open Championship (1860)",
      "Die U.S. Open Championship",
      "Die PGA Championship",
      "The Masters Tournament"
    ],
    "correctIndex": 0,
    "exp": "The Open wurde erstmals 1860 im schottischen Prestwick Golf Club ausgetragen und ist das traditionsreichste Turnier des Sports.",
    "explanation": "The Open wurde erstmals 1860 im schottischen Prestwick Golf Club ausgetragen und ist das traditionsreichste Turnier des Sports."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Was versteht man im Profigolf unter dem Begriff 'Career Grand Slam'?",
    "a": [
      "Den Gewinn aller vier verschiedenen Major-Turniere",
      "Den Gewinn von vier Turnieren in einem einzigen Monat",
      "Das Erreichen von 100 Siegen auf der PGA Tour",
      "Vier Runden unter 65 Schlägen bei einer Meisterschaft"
    ],
    "correctIndex": 0,
    "exp": "Den Career Grand Slam schaffen nur Ausnahmespieler, die in ihrer Laufbahn Masters, PGA Championship, US Open und The Open gewinnen.",
    "explanation": "Den Career Grand Slam schaffen nur Ausnahmespieler, die in ihrer Laufbahn Masters, PGA Championship, US Open und The Open gewinnen."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welche deutsche Profigolferin gewann 2020 als erste Deutsche ein Damen-Major bei der AIG Women's Open?",
    "a": [
      "Sophia Popov in Royal Troon",
      "Caroline Masson in Evian",
      "Sandra Gal auf der LPGA Tour",
      "Helen Tamy Kreuzer in Sunningdale"
    ],
    "correctIndex": 0,
    "exp": "Sophia Popov reiste als Nummer 304 der Welt und ohne volle LPGA-Tourkarte nach Royal Troon und schaffte die sportliche Sensation.",
    "explanation": "Sophia Popov reiste als Nummer 304 der Welt und ohne volle LPGA-Tourkarte nach Royal Troon und schaffte die sportliche Sensation."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "In welchem Sommermonat wird traditionell The Open Championship auf britischen Links-Plätzen gespielt?",
    "a": [
      "Traditionell im Monat Juli",
      "Traditionell im Monat Mai",
      "Traditionell im Monat September",
      "Traditionell im Monat August"
    ],
    "correctIndex": 0,
    "exp": "The Open Championship bildet Mitte Juli den traditionellen Höhepunkt der Links-Golf-Saison in Großbritannien.",
    "explanation": "The Open Championship bildet Mitte Juli den traditionellen Höhepunkt der Links-Golf-Saison in Großbritannien."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Wie viele Gesamtpunkte werden im Verlauf eines kompletten Ryder Cups vergeben?",
    "a": [
      "Genau 28 Gesamtpunkte",
      "Genau 32 Gesamtpunkte",
      "Genau 24 Gesamtpunkte",
      "Genau 30 Gesamtpunkte"
    ],
    "correctIndex": 0,
    "exp": "Es gibt 28 Matches (je 4 Foursomes und Fourballs an den ersten beiden Tagen plus 12 Einzel). Bei 14:14 behält der Titelverteidiger den Pokal.",
    "explanation": "Es gibt 28 Matches (je 4 Foursomes und Fourballs an den ersten beiden Tagen plus 12 Einzel). Bei 14:14 behält der Titelverteidiger den Pokal."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welche Trophäe wird dem Gewinner der traditionsreichen PGA Championship überreicht?",
    "a": [
      "Die wuchtige Wanamaker Trophy",
      "Die kleine Claret Jug Weinkanne",
      "Der silbern glänzende Ryder Cup",
      "Die edle Harry Vardon Trophy"
    ],
    "correctIndex": 0,
    "exp": "Rodman Wanamaker stiftete die 12 Kilogramm schwere Trophäe 1916 zur Gründung der Professional Golfers' Association of America.",
    "explanation": "Rodman Wanamaker stiftete die 12 Kilogramm schwere Trophäe 1916 zur Gründung der Professional Golfers' Association of America."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welcher US-Star teilt sich mit Sam Snead den Allzeit-Rekord von 82 PGA-Tour-Titeln?",
    "a": [
      "Phil Mickelson aus San Diego",
      "Tiger Woods aus den USA",
      "Jack Nicklaus aus Ohio",
      "Ben Hogan aus Texas"
    ],
    "correctIndex": 1,
    "exp": "Tiger Woods zog 2019 bei der Zozo Championship in Japan mit seinem 82. Karrieresieg auf der PGA Tour mit Sam Snead gleich.",
    "explanation": "Tiger Woods zog 2019 bei der Zozo Championship in Japan mit seinem 82. Karrieresieg auf der PGA Tour mit Sam Snead gleich."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welche deutsche Golferin gewann bei den Olympischen Spielen 2024 in Paris sensationell die Silbermedaille?",
    "a": [
      "Alexandra Försterling aus Berlin",
      "Esther Henseleit aus Hamburg",
      "Olivia Cowan aus Homburg",
      "Sophia Popov aus Weingarten"
    ],
    "correctIndex": 1,
    "exp": "Esther Henseleit spielte im Le Golf National eine fabelhafte 66er-Schlussrunde und holte das erste deutsche Olympiasilber im Golf.",
    "explanation": "Esther Henseleit spielte im Le Golf National eine fabelhafte 66er-Schlussrunde und holte das erste deutsche Olympiasilber im Golf."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welcher Golfer gewann 2016 in Rio de Janeiro die erste olympische Goldmedaille im Herrengolf seit 112 Jahren?",
    "a": [
      "Henrik Stenson für Schweden",
      "Justin Rose für Großbritannien",
      "Matt Kuchar für die Vereinigten Staaten",
      "Bubba Watson für Nordamerika"
    ],
    "correctIndex": 1,
    "exp": "Justin Rose setzte sich in einem packenden Finish gegen Henrik Stenson durch und sicherte sich historisches Olympiagold.",
    "explanation": "Justin Rose setzte sich in einem packenden Finish gegen Henrik Stenson durch und sicherte sich historisches Olympiagold."
  },
  {
    "cat": "golf_profis",
    "diff": "easy",
    "q": "Welches legendäre Menü findet traditionell am Dienstag vor dem Masters in Augusta statt?",
    "a": [
      "Das offizielle Eröffnungs-Barbecue",
      "Das exklusive Champions Dinner",
      "Der traditionelle Afternoon Tea",
      "Das feierliche Club-Gala-Bankett"
    ],
    "correctIndex": 1,
    "exp": "Der amtierende Champion wählt und bezahlt das Menü für alle früheren Masters-Gewinner – von Haggis bis hin zu Wiener Schnitzel.",
    "explanation": "Der amtierende Champion wählt und bezahlt das Menü für alle früheren Masters-Gewinner – von Haggis bis hin zu Wiener Schnitzel."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Was vollbrachte Tiger Woods mit seinem historischen 'Tiger Slam' in den Jahren 2000 und 2001?",
    "a": [
      "Er gewann alle vier Herren-Majors in ein und demselben Kalenderjahr",
      "Er hielt alle vier Major-Trophäen gleichzeitig in seinen Händen",
      "Er blieb bei 100 aufeinanderfolgenden Turnieren ohne jeden Bogey-Schlag",
      "Er gewann zehn PGA-Tour-Turniere in ununterbrochener Folge hintereinander"
    ],
    "correctIndex": 1,
    "exp": "Da er die US Open, The Open und PGA Championship 2000 sowie das Masters 2001 gewann, hielt er alle vier Majors gleichzeitig – saisonübergreifend.",
    "explanation": "Da er die US Open, The Open und PGA Championship 2000 sowie das Masters 2001 gewann, hielt er alle vier Majors gleichzeitig – saisonübergreifend."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Mit welchem historischen Rekordvorsprung gewann Tiger Woods die U.S. Open 2000 in Pebble Beach?",
    "a": [
      "Mit unglaublichen 10 Schlägen Vorsprung",
      "Mit sensationellen 15 Schlägen Vorsprung",
      "Mit beachtlichen 8 Schlägen Vorsprung",
      "Mit exakt 12 Schlägen Vorsprung im Feld"
    ],
    "correctIndex": 1,
    "exp": "Tiger Woods spielte als einziger Teilnehmer unter Par (-12), deklassierte Miguel Ángel Jiménez und Ernie Els (beide +3) um 15 Schläge.",
    "explanation": "Tiger Woods spielte als einziger Teilnehmer unter Par (-12), deklassierte Miguel Ángel Jiménez und Ernie Els (beide +3) um 15 Schläge."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welcher historische Triumph wird beim Ryder Cup 2012 als 'Wunder von Medinah' bezeichnet?",
    "a": [
      "Die USA gewannen alle zwölf Einzelmatches am Schlusstag zu null",
      "Europa drehte einen 6:10-Rückstand am Finaltag zum Gesamtsieg",
      "Ein Rookie lochte am 18. Grün mit einem Albatros zum Unentschieden",
      "Das europäische Team spielte die ersten beiden Tage ohne Niederlage"
    ],
    "correctIndex": 1,
    "exp": "Unter Kapitän José María Olazábal und im Gedenken an Seve Ballesteros holte Europa am Schlusstag 8,5 von 12 Punkten und gewann 14,5 zu 13,5.",
    "explanation": "Unter Kapitän José María Olazábal und im Gedenken an Seve Ballesteros holte Europa am Schlusstag 8,5 von 12 Punkten und gewann 14,5 zu 13,5."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Wer lochte beim Ryder Cup 2012 in Medinah den entscheidenden Par-Putt gegen Steve Stricker zum Sieg ein?",
    "a": [
      "Bernhard Langer als Vize-Kapitän",
      "Martin Kaymer auf dem 18. Grün",
      "Ian Poulter nach perfektem Eisen",
      "Rory McIlroy nach spätem Eintreffen"
    ],
    "correctIndex": 1,
    "exp": "Martin Kaymer behielt die Nerven über einen 1,8-Meter-Putt, sicherte den 14. Punkt und damit den Verbleib der Trophäe in europäischen Händen.",
    "explanation": "Martin Kaymer behielt die Nerven über einen 1,8-Meter-Putt, sicherte den 14. Punkt und damit den Verbleib der Trophäe in europäischen Händen."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Wie viele Wochen stand Martin Kaymer im Frühjahr 2011 als Nummer 1 an der Spitze der Weltrangliste?",
    "a": [
      "Insgesamt genau zwanzig Wochen",
      "Insgesamt genau acht Wochen",
      "Insgesamt genau vierzehn Wochen",
      "Insgesamt genau zwei Wochen"
    ],
    "correctIndex": 1,
    "exp": "Kaymer übernahm nach dem Finale der WGC Accenture Match Play Championship den Thron von Lee Westwood und hielt ihn acht Wochen lang.",
    "explanation": "Kaymer übernahm nach dem Finale der WGC Accenture Match Play Championship den Thron von Lee Westwood und hielt ihn acht Wochen lang."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Wie viele Turniersiege feierte Bernhard Langer bis Ende 2024 auf der US-Seniorentour (PGA Tour Champions)?",
    "a": [
      "Exakt 38 Turniersiege",
      "Exakt 46 Turniersiege",
      "Exakt 52 Turniersiege",
      "Exakt 41 Turniersiege"
    ],
    "correctIndex": 1,
    "exp": "Mit 46 Siegen und 12 Senior-Majors überflügelte Bernhard Langer Hale Irwin (45 Siege) und ist der erfolgreichste Senior-Golfer der Geschichte.",
    "explanation": "Mit 46 Siegen und 12 Senior-Majors überflügelte Bernhard Langer Hale Irwin (45 Siege) und ist der erfolgreichste Senior-Golfer der Geschichte."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Wer ist der älteste Gewinner eines Herren-Major-Turniers in der gesamten Geschichte des Golfsports?",
    "a": [
      "Jack Nicklaus mit 46 Jahren",
      "Phil Mickelson mit 50 Jahren",
      "Julius Boros mit 48 Jahren",
      "Tom Watson mit 59 Jahren"
    ],
    "correctIndex": 1,
    "exp": "Phil Mickelson triumphierte bei der PGA Championship 2021 im Kiawah Island Ocean Course im Alter von 50 Jahren und 11 Monaten.",
    "explanation": "Phil Mickelson triumphierte bei der PGA Championship 2021 im Kiawah Island Ocean Course im Alter von 50 Jahren und 11 Monaten."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "In welchem Alter gewann Jack Nicklaus 1986 sein sechstes und letztes Masters Tournament in Augusta?",
    "a": [
      "Im Alter von genau 44 Jahren",
      "Im Alter von genau 46 Jahren",
      "Im Alter von genau 49 Jahren",
      "Im Alter von genau 42 Jahren"
    ],
    "correctIndex": 1,
    "exp": "Mit einer legendären 65er-Schlussrunde am Sonntag sicherte sich Nicklaus 1986 seinen 18. Major-Titel und wurde der älteste Masters-Champion.",
    "explanation": "Mit einer legendären 65er-Schlussrunde am Sonntag sicherte sich Nicklaus 1986 seinen 18. Major-Titel und wurde der älteste Masters-Champion."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Wer war 1997 mit 21 Jahren und 3 Monaten der jüngste Masters-Sieger aller Zeiten?",
    "a": [
      "Jordan Spieth in Augusta",
      "Tiger Woods in Augusta",
      "Rory McIlroy in Augusta",
      "Seve Ballesteros in Augusta"
    ],
    "correctIndex": 1,
    "exp": "Tiger Woods gewann das Masters 1997 mit 12 Schlägen Vorsprung und einem Gesamtergebnis von 18 unter Par bei seinem ersten Major als Profi.",
    "explanation": "Tiger Woods gewann das Masters 1997 mit 12 Schlägen Vorsprung und einem Gesamtergebnis von 18 unter Par bei seinem ersten Major als Profi."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welcher Amateur-Gentleman gewann 1930 als einziger Golfer den ursprünglichen Grand Slam in einem einzigen Kalenderjahr?",
    "a": [
      "Francis Ouimet aus Boston",
      "Bobby Jones aus Atlanta",
      "Walter Hagen aus New York",
      "Gene Sarazen aus New York"
    ],
    "correctIndex": 1,
    "exp": "Bobby Jones gewann 1930 die U.S. Open, The Open sowie die U.S. und British Amateur Championship, bevor er mit nur 28 Jahren unbesiegt abtrat.",
    "explanation": "Bobby Jones gewann 1930 die U.S. Open, The Open sowie die U.S. und British Amateur Championship, bevor er mit nur 28 Jahren unbesiegt abtrat."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Wer gründete Anfang der 1930er Jahre gemeinsam mit Clifford Roberts den legendären Augusta National Golf Club?",
    "a": [
      "Jack Nicklaus und Pete Dye",
      "Bobby Jones und Alister MacKenzie",
      "Arnold Palmer und Robert Trent Jones",
      "Ben Hogan und Donald Ross"
    ],
    "correctIndex": 1,
    "exp": "Bobby Jones erfüllte sich seinen Lebenstraum einer idealen Golfanlage und gestaltete Augusta zusammen mit Star-Architekt Alister MacKenzie.",
    "explanation": "Bobby Jones erfüllte sich seinen Lebenstraum einer idealen Golfanlage und gestaltete Augusta zusammen mit Star-Architekt Alister MacKenzie."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welcher südafrikanische Weltklasse-Golfer, bekannt als 'The Black Knight', vollendete als Dritter den Career Grand Slam?",
    "a": [
      "Ernie Els aus Johannesburg",
      "Gary Player aus Südafrika",
      "Retief Goosen aus Pietersburg",
      "Nick Price aus Simbabwe"
    ],
    "correctIndex": 1,
    "exp": "Gary Player gewann insgesamt neun Majors, reiste zig Millionen Flugkilometer um den Globus und legte extremen Wert auf Fitness und Ernährung.",
    "explanation": "Gary Player gewann insgesamt neun Majors, reiste zig Millionen Flugkilometer um den Globus und legte extremen Wert auf Fitness und Ernährung."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welcher englische Golfer dominierte um 1990 mit sechs Major-Siegen (3 Masters, 3 The Open) die Golfwelt?",
    "a": [
      "Ian Woosnam aus Wales",
      "Sir Nick Faldo aus England",
      "Sandy Lyle aus Schottland",
      "Lee Westwood aus Worksop"
    ],
    "correctIndex": 1,
    "exp": "Nick Faldo baute mit David Leadbetter seinen Schwung komplett um und wurde zu einer der präzisesten Ballschlag-Maschinen der Profigeschichte.",
    "explanation": "Nick Faldo baute mit David Leadbetter seinen Schwung komplett um und wurde zu einer der präzisesten Ballschlag-Maschinen der Profigeschichte."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welcher australische Superstar, bekannt als 'The Great White Shark', führte 331 Wochen lang die Weltrangliste an?",
    "a": [
      "Adam Scott aus Adelaide",
      "Greg Norman aus Queensland",
      "Jason Day aus Beaudesert",
      "Peter Thomson aus Melbourne"
    ],
    "correctIndex": 1,
    "exp": "Greg Norman dominierte die 1980er und 90er Jahre, gewann zweimal The Open, erlebte jedoch auch tragische Niederlagen am Finalsonntag in Augusta.",
    "explanation": "Greg Norman dominierte die 1980er und 90er Jahre, gewann zweimal The Open, erlebte jedoch auch tragische Niederlagen am Finalsonntag in Augusta."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welcher US-Star spielte 2015 eine historische Saison mit Siegen beim Masters und der U.S. Open?",
    "a": [
      "Justin Thomas aus Louisville",
      "Jordan Spieth aus Dallas",
      "Brooks Koepka aus Florida",
      "Dustin Johnson aus Columbia"
    ],
    "correctIndex": 1,
    "exp": "Spieth gewann 2015 die ersten beiden Majors, verfehlte das Playoff bei The Open um einen Schlag und wurde Zweiter bei der PGA Championship.",
    "explanation": "Spieth gewann 2015 die ersten beiden Majors, verfehlte das Playoff bei The Open um einen Schlag und wurde Zweiter bei der PGA Championship."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Wer erzielte bei The Open 2017 in Royal Birkdale mit einer 62 die historisch erste 62er-Runde bei einem Herren-Major?",
    "a": [
      "Henrik Stenson aus Schweden",
      "Phil Mickelson aus Kalifornien",
      "Branden Grace aus Südafrika",
      "Rickie Fowler aus Anaheim"
    ],
    "correctIndex": 2,
    "exp": "Nach hunderten gespielten Major-Turnieren war Branden Grace der allererste Spieler überhaupt, der eine Runde von 62 Schlägen ins Clubhaus brachte.",
    "explanation": "Nach hunderten gespielten Major-Turnieren war Branden Grace der allererste Spieler überhaupt, der eine Runde von 62 Schlägen ins Clubhaus brachte."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welcher US-Amerikaner holte bei den Olympischen Spielen 2020 in Tokio die Goldmedaille im Herren-Einzel?",
    "a": [
      "Rory Sabbatini für die Slowakei",
      "C.T. Pan für Chinesisch Taipeh",
      "Xander Schauffele für die USA",
      "Collin Morikawa für die USA"
    ],
    "correctIndex": 2,
    "exp": "Xander Schauffele, dessen Mutter in Japan aufwuchs, triumphierte im Kasumigaseki Country Club mit einem Schlag Vorsprung auf Rory Sabbatini.",
    "explanation": "Xander Schauffele, dessen Mutter in Japan aufwuchs, triumphierte im Kasumigaseki Country Club mit einem Schlag Vorsprung auf Rory Sabbatini."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welcher frühere Weltranglistenerste von den Fidschi-Inseln gewann drei Majors und trainierte legendär hart?",
    "a": [
      "K.J. Choi aus Wando",
      "Tony Finau aus Salt Lake",
      "Vijay Singh aus Lautoka",
      "Angel Cabrera aus Córdoba"
    ],
    "correctIndex": 2,
    "exp": "Vijay Singh verbrachte täglich zahllose Stunden auf der Driving Range und entthronte 2004 nach neun Saisonsiegen Tiger Woods von Platz 1.",
    "explanation": "Vijay Singh verbrachte täglich zahllose Stunden auf der Driving Range und entthronte 2004 nach neun Saisonsiegen Tiger Woods von Platz 1."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Wer besiegte 2009 bei der PGA Championship in Hazeltine sensationell Tiger Woods und wurde erster asiatischer Major-Sieger?",
    "a": [
      "Hideki Matsuyama aus Ehime",
      "Shingo Katayama aus Ibaraki",
      "Y.E. Yang aus Südkorea",
      "Byeong Hun An aus Seoul"
    ],
    "correctIndex": 2,
    "exp": "Y.E. Yang fügte Tiger Woods die erste Major-Niederlage seiner Karriere zu, nachdem Woods nach 54 Löchern in Führung gelegen hatte.",
    "explanation": "Y.E. Yang fügte Tiger Woods die erste Major-Niederlage seiner Karriere zu, nachdem Woods nach 54 Löchern in Führung gelegen hatte."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welcher japanische Weltklasse-Golfer gewann 2021 als erster männlicher Japaner das Masters in Augusta?",
    "a": [
      "Ryo Ishikawa aus Saitama",
      "Isao Aoki aus Abiko",
      "Hideki Matsuyama aus Japan",
      "Keita Nakajima aus Saitama"
    ],
    "correctIndex": 2,
    "exp": "Matsuyamas historischer Sieg löste in seiner golfbegeisterten Heimat Japan einen gewaltigen Jubelsturm in allen Medien aus.",
    "explanation": "Matsuyamas historischer Sieg löste in seiner golfbegeisterten Heimat Japan einen gewaltigen Jubelsturm in allen Medien aus."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welches traditionsreiche Kurzplatz-Turnier findet am Mittwoch der Masters-Woche in Augusta statt?",
    "a": [
      "Das Drive, Chip and Putt Finale",
      "Das Masters Long Drive Shootout",
      "Der Masters Par-3 Contest",
      "Das Bobby Jones Memorial Putting"
    ],
    "correctIndex": 2,
    "exp": "Auf dem Neun-Loch-Kurzplatz fungieren traditionell Kinder und Ehefrauen in weißen Caddie-Overalls als Caddies für die Profis.",
    "explanation": "Auf dem Neun-Loch-Kurzplatz fungieren traditionell Kinder und Ehefrauen in weißen Caddie-Overalls als Caddies für die Profis."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welcher legendäre Aberglaube haftet dem Sieger des Masters Par-3 Contests in Augusta an?",
    "a": [
      "Wer den Contest gewinnt, verpasst am Freitag garantiert den Cut",
      "Der Sieger muss sein gesamtes Preisgeld an wohltätige Zwecke spenden",
      "Der Sieger des Par-3 Contests gewann noch nie im selben Jahr das Masters",
      "Wer dort ein Hole-in-one schlägt, darf im Hauptturnier keinen Driver nutzen"
    ],
    "correctIndex": 2,
    "exp": "Der sogenannte 'Par 3 Curse' bewahrheitet sich seit Jahrzehnten: Noch kein Spieler konnte Par-3-Turnier und Masters in derselben Woche gewinnen.",
    "explanation": "Der sogenannte 'Par 3 Curse' bewahrheitet sich seit Jahrzehnten: Noch kein Spieler konnte Par-3-Turnier und Masters in derselben Woche gewinnen."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welche Auszeichnung erhält der beste Amateurspieler, der beim Masters Tournament den Cut übersteht?",
    "a": [
      "Eine vergoldete Golffahne",
      "Ein hellgraues Amateur-Sakko",
      "Den traditionsreichen Silver Cup",
      "Einen gravierten silbernen Teller"
    ],
    "correctIndex": 2,
    "exp": "Der 'Low Amateur' wird im Butler Cabin gemeinsam mit dem Turniersieger geehrt und erhält den silbernen Pokal für Amateure überreicht.",
    "explanation": "Der 'Low Amateur' wird im Butler Cabin gemeinsam mit dem Turniersieger geehrt und erhält den silbernen Pokal für Amateure überreicht."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welche Medaille erhält der beste Amateurspieler bei The Open Championship überreicht?",
    "a": [
      "Die bronzene Prestwick-Gedenkplakette",
      "Den gravierten Royal & Ancient Pin",
      "Die prestigeträchtige Silver Medal",
      "Das silberne Claret-Medaillon"
    ],
    "correctIndex": 2,
    "exp": "Schafft der beste Amateur den Cut bei The Open, wird er am 72. Loch bei der Siegerehrung mit der begehrten Silver Medal ausgezeichnet.",
    "explanation": "Schafft der beste Amateur den Cut bei The Open, wird er am 72. Loch bei der Siegerehrung mit der begehrten Silver Medal ausgezeichnet."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welcher spanische Profi mit Zigarre und Dehnübungen war auf der European Tour als 'Der Mechaniker' Kult?",
    "a": [
      "Gonzalo Fernández-Castaño",
      "Alvaro Quiros García",
      "Miguel Ángel Jiménez",
      "Pablo Larrazábal"
    ],
    "correctIndex": 2,
    "exp": "Miguel Ángel Jiménez begeisterte Fans weltweit mit seinem exzentrischen Aufwärmprogramm, Espresso, Rotwein und exzellentem Ballstriking.",
    "explanation": "Miguel Ángel Jiménez begeisterte Fans weltweit mit seinem exzentrischen Aufwärmprogramm, Espresso, Rotwein und exzellentem Ballstriking."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welcher US-Star gewann 1999 in Pinehurst die U.S. Open mit der legendären Siegerpose, kurz vor seinem tragischen Tod?",
    "a": [
      "Davis Love III in Pinehurst",
      "Corey Pavin in Shinnecock",
      "Payne Stewart in Knickerbockern",
      "Paul Azinger in Inverness"
    ],
    "correctIndex": 2,
    "exp": "Payne Stewart lochte am 72. Loch einen 4,5-Meter-Putt gegen Phil Mickelson. Eine Bronzestatue in Pinehurst verewigt seine ikonische Pose.",
    "explanation": "Payne Stewart lochte am 72. Loch einen 4,5-Meter-Putt gegen Phil Mickelson. Eine Bronzestatue in Pinehurst verewigt seine ikonische Pose."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welches historische Major-Duell zwischen Tom Watson und Jack Nicklaus ging als 'Duel in the Sun' in die Geschichte ein?",
    "a": [
      "Das Masters 1975 in Augusta",
      "Die U.S. Open 1982 in Pebble Beach",
      "The Open 1977 in Turnberry",
      "The Open 1984 in St Andrews"
    ],
    "correctIndex": 2,
    "exp": "Unter strahlender Sonne spielten Watson (65-65) und Nicklaus (65-66) am Wochenende Golf von einem anderen Stern; Watson siegte mit einem Schlag.",
    "explanation": "Unter strahlender Sonne spielten Watson (65-65) und Nicklaus (65-66) am Wochenende Golf von einem anderen Stern; Watson siegte mit einem Schlag."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Wie viele Siege bei The Open Championship feierte Tom Watson in seiner Karriere auf Links-Kursen?",
    "a": [
      "Genau drei Open-Siege",
      "Genau sechs Open-Siege",
      "Genau fünf Open-Siege",
      "Genau vier Open-Siege"
    ],
    "correctIndex": 2,
    "exp": "Tom Watson gewann die Claret Jug 1975, 1977, 1980, 1982 und 1983. 2009 verpasste er im Alter von 59 Jahren die Sensation erst im Playoff.",
    "explanation": "Tom Watson gewann die Claret Jug 1975, 1977, 1980, 1982 und 1983. 2009 verpasste er im Alter von 59 Jahren die Sensation erst im Playoff."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Wie viele Wochen verbrachte Tiger Woods insgesamt auf Platz 1 der offiziellen Weltrangliste (OWGR)?",
    "a": [
      "Genau 450 Wochen lang",
      "Exakt 520 Wochen lang",
      "Unglaubliche 683 Wochen",
      "Genau 331 Wochen lang"
    ],
    "correctIndex": 2,
    "exp": "683 Wochen entsprechen mehr als 13 Jahren an der Weltspitze – ein Rekord für die Ewigkeit (der Zweitplatzierte Greg Norman folgt mit 331).",
    "explanation": "683 Wochen entsprechen mehr als 13 Jahren an der Weltspitze – ein Rekord für die Ewigkeit (der Zweitplatzierte Greg Norman folgt mit 331)."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Wer gewann 1991 als neunter Nachrücker ohne Proberunde sensationell die PGA Championship in Crooked Stick?",
    "a": [
      "Fred Couples mit butterweichem Schwung",
      "Corey Pavin mit feinstem Gefühl",
      "John Daly mit 'Grip it and rip it'",
      "Hal Sutton mit enormer Eisenpräzision"
    ],
    "correctIndex": 2,
    "exp": "John Daly fuhr über Nacht mit dem Auto nach Indiana, schlug monströse Drives ohne Platzkenntnis und wurde über Nacht zum globalen Volkshelden.",
    "explanation": "John Daly fuhr über Nacht mit dem Auto nach Indiana, schlug monströse Drives ohne Platzkenntnis und wurde über Nacht zum globalen Volkshelden."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welcher Schwede gewann The Open 2016 in Royal Troon nach packendem Duell gegen Phil Mickelson mit 20 unter Par?",
    "a": [
      "Jesper Parnevik in Turnberry",
      "Robert Karlsson in Carnoustie",
      "Henrik Stenson in Royal Troon",
      "Alex Norén in St Andrews"
    ],
    "correctIndex": 2,
    "exp": "Stenson schoss am Finalsonntag eine atemberaubende 63 und stellte mit 264 Schlägen (-20) den damaligen Allzeit-Major-Rekord auf.",
    "explanation": "Stenson schoss am Finalsonntag eine atemberaubende 63 und stellte mit 264 Schlägen (-20) den damaligen Allzeit-Major-Rekord auf."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Wer war 1980 der allererste europäische Golfer, der das Masters Tournament in Augusta gewinnen konnte?",
    "a": [
      "Tony Jacklin aus Großbritannien",
      "Bernhard Langer aus Deutschland",
      "Severiano Ballesteros aus Spanien",
      "Sandy Lyle aus Schottland"
    ],
    "correctIndex": 2,
    "exp": "Mit erst 23 Jahren brach Seve Ballesteros 1980 die jahrzehntelange US-Dominanz in Augusta und ebnete den Weg für Europas goldene Generation.",
    "explanation": "Severiano Ballesteros aus Spanien brach 1980 die US-Dominanz in Augusta und ebnete den Weg für Europas goldene Generation."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Welcher südafrikanische Profigolfer, genannt 'The Big Easy', gewann vier Majors und bestach durch Eleganz?",
    "a": [
      "Louis Oosthuizen aus Mossel Bay",
      "Charl Schwartzel aus Johannesburg",
      "Ernie Els mit seidenweichem Schwung",
      "Trevor Immelman aus Somerset West"
    ],
    "correctIndex": 2,
    "exp": "Ernie Els gewann 1994 und 1997 die US Open sowie 2002 und 2012 The Open; sein scheinbar müheloser Schwung gilt als Idealbild.",
    "explanation": "Ernie Els gewann 1994 und 1997 die US Open sowie 2002 und 2012 The Open; sein scheinbar müheloser Schwung gilt als Idealbild."
  },
  {
    "cat": "golf_profis",
    "diff": "mid",
    "q": "Wer siegte bei der U.S. Open 2008 in Torrey Pines trotz Schienbeinfraktur und gerissenem Kreuzband nach 91 Löchern?",
    "a": [
      "Phil Mickelson gegen Lee Westwood",
      "Stewart Cink gegen Tom Watson",
      "Tiger Woods gegen Rocco Mediate",
      "Geoff Ogilvy gegen Colin Montgomerie"
    ],
    "correctIndex": 2,
    "exp": "Unter sichtbaren Qualen lochte Woods am 72. Loch einen Birdiepuff zum Playoff und gewann am Montag nach 19 Extralöchern seinen 14. Major-Titel.",
    "explanation": "Unter sichtbaren Qualen lochte Woods am 72. Loch einen Birdiepuff zum Playoff und gewann am Montag nach 19 Extralöchern seinen 14. Major-Titel."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Welcher Golfer überlebte 1949 einen Frontalzusammenstoß mit einem Greyhound-Bus und gewann danach noch sechs Majors?",
    "a": [
      "Sam Snead aus Virginia",
      "Byron Nelson aus Waxahachie",
      "Gene Sarazen aus Harrison",
      "Ben Hogan aus Texas"
    ],
    "correctIndex": 3,
    "exp": "Hogans Beine waren zertrümmert, Ärzte zweifelten am Gehen. 1953 vollbrachte er das 'Triple Crown' mit Siegen bei Masters, US Open und The Open.",
    "explanation": "Hogan überlebte den Busunfall 1949 und gewann 1953 das Triple Crown aus Masters, US Open und The Open."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Welche Golferin hält mit 88 Siegen den ewigen Rekord für die meisten Titel auf der Damen-Tour LPGA?",
    "a": [
      "Mickey Wright aus San Diego",
      "Patty Berg aus Minneapolis",
      "Betsy Rawls aus Spartanburg",
      "Kathy Whitworth aus den USA"
    ],
    "correctIndex": 3,
    "exp": "Kathy Whitworth gewann zwischen 1962 und 1985 sagenhafte 88 LPGA-Titel – mehr als Sam Snead oder Tiger Woods bei den Herren.",
    "explanation": "Kathy Whitworth gewann zwischen 1962 und 1985 sagenhafte 88 LPGA-Titel – mehr als Sam Snead oder Tiger Woods bei den Herren."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Welcher Schotte gewann die europäische Geldrangliste (Order of Merit) von 1993 bis 1999 siebenmal in Serie?",
    "a": [
      "Sandy Lyle aus Shrewsbury",
      "Paul Lawrie aus Aberdeen",
      "Sam Torrance aus Largs",
      "Colin Montgomerie aus Glasgow"
    ],
    "correctIndex": 3,
    "exp": "'Monty' dominierte Europa über fast ein Jahrzehnt, gewann insgesamt 31 Turniere auf der European Tour, blieb bei den Majors aber unvollendet.",
    "explanation": "'Monty' dominierte Europa über fast ein Jahrzehnt, gewann insgesamt 31 Turniere auf der European Tour, blieb bei den Majors aber unvollendet."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Welcher Ire gewann zwischen 2007 und 2008 innerhalb von 13 Monaten drei von sechs ausgetragenen Major-Turnieren?",
    "a": [
      "Darren Clarke aus Dungannon",
      "Graeme McDowell aus Portrush",
      "Paul McGinley aus Dublin",
      "Pádraig Harrington aus Dublin"
    ],
    "correctIndex": 3,
    "exp": "Harrington siegte bei The Open 2007 in Carnoustie, The Open 2008 in Birkdale und der PGA Championship 2008 in Oakland Hills.",
    "explanation": "Harrington siegte bei The Open 2007 in Carnoustie, The Open 2008 in Birkdale und der PGA Championship 2008 in Oakland Hills."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Welcher Nordire gewann bis zu seinem 25. Lebensjahr vier Majors (US Open 2011, PGA 2012 & 2014, The Open 2014)?",
    "a": [
      "Shane Lowry aus Clara",
      "Graeme McDowell aus Portrush",
      "Matthew Fitzpatrick aus Sheffield",
      "Rory McIlroy aus Holywood"
    ],
    "correctIndex": 3,
    "exp": "Rory McIlroy galt früh als Nachfolger von Tiger Woods; für den Career Grand Slam fehlt ihm bis heute einzig das Green Jacket in Augusta.",
    "explanation": "Rory McIlroy gewann vier Majors vor seinem 26. Geburtstag; einzig das Masters fehlt ihm noch zum Career Grand Slam."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Welche Spielerin trat 2003 bei der Colonial als erste Frau seit Babe Zaharias (1945) auf der Herren-PGA-Tour an?",
    "a": [
      "Michelle Wie (Kalifornien)",
      "Se Ri Pak (Südkorea / Seoul)",
      "Laura Davies (Coventry / UK)",
      "Annika Sörenstam (Schweden)"
    ],
    "correctIndex": 3,
    "exp": "Sörenstam spielte unter gewaltigem Medienrummel Runden von 71 und 74 Schlägen; sie verpasste den Cut nur um vier Schläge.",
    "explanation": "Sörenstam spielte bei der Colonial Runden von 71 und 74 Schlägen und verpasste den Cut auf der PGA Tour nur knapp."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Welcher Italiener holte 2018 in Carnoustie die Claret Jug und gewann im selben Jahr 5 von 5 Punkten im Ryder Cup?",
    "a": [
      "Costantino Rocca aus Bergamo",
      "Matteo Manassero aus Verona",
      "Edoardo Molinari aus Turin",
      "Francesco Molinari aus Turin"
    ],
    "correctIndex": 3,
    "exp": "Molinari spielte am Finaltag fehlerfrei an der Seite von Tiger Woods und bildete in Paris mit Tommy Fleetwood das Traumduo 'Moliwood'.",
    "explanation": "Molinari spielte am Finaltag fehlerfrei an der Seite von Tiger Woods und bildete in Paris mit Tommy Fleetwood das Traumduo 'Moliwood'."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Wer gewann 2017 das Masters im Playoff an Seve Ballesteros' 60. Geburtstag nach 73 vergeblichen Major-Starts?",
    "a": [
      "Jon Rahm gegen Brooks Koepka",
      "José María Olazábal gegen Davis Love",
      "Miguel Ángel Jiménez gegen Bernhard Langer",
      "Sergio García gegen Justin Rose"
    ],
    "correctIndex": 3,
    "exp": "Nach vielen bitteren Enttäuschungen erlöste sich 'El Niño' Sergio García am ersten Extraloch mit einem Birdie-Putt auf Grün 18.",
    "explanation": "Sergio García erlöste sich 2017 nach 73 Major-Starts an Seves Geburtstag mit dem Triumph in Augusta."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Welcher US-Profi stellte 1945 mit elf Turniersiegen in Serie auf der PGA Tour einen unerreichten Rekord auf?",
    "a": [
      "Sam Snead aus Virginia",
      "Ben Hogan aus Dublin",
      "Jimmy Demaret aus Houston",
      "Byron Nelson aus Texas"
    ],
    "correctIndex": 3,
    "exp": "'Lord Byron' Nelson gewann 1945 insgesamt 18 Turniere in einer einzigen Saison, darunter elf in Folge – ein Rekord für die Ewigkeit.",
    "explanation": "Byron Nelson siegte 1945 bei elf PGA-Tour-Events hintereinander und holte 18 Saisonsiege."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Wer hielt vor Branden Grace den gemeinsamen Rekord für die niedrigste Runde (63 Schläge) bei Herren-Majors?",
    "a": [
      "Ausschließlich Tiger Woods bei drei verschiedenen Gelegenheiten",
      "Nur die beiden Ausnahmespieler Jack Nicklaus und Tom Watson",
      "Lediglich fünf Spieler der modernen Ära seit dem Jahr 2000",
      "31 verschiedene Spieler (u. a. Miller, Nicklaus, Norman)"
    ],
    "correctIndex": 3,
    "exp": "Johnny Miller eröffnete den Club der 63er bei den US Open 1973 in Oakmont; bis zu Grace' 62er-Runde 2017 schafften 31 Spieler die 63.",
    "explanation": "Johnny Miller spielte 1973 die erste 63er-Major-Runde; 31 Spieler egalisierten diesen Wert, bis Branden Grace 2017 die 62 schoss."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Welcher Profigolfer verspielte 1999 bei The Open in Carnoustie an Loch 72 mit nackten Beinen im Bach Barry Burn die Claret Jug?",
    "a": [
      "Paul Lawrie aus Aberdeen (Schottland)",
      "Justin Leonard aus Dallas (Texas)",
      "Thomas Levet aus Paris (Frankreich)",
      "Jean van de Velde aus Frankreich"
    ],
    "correctIndex": 3,
    "exp": "Der Franzose Van de Velde benötigte an Loch 18 nur ein Triple-Bogey zum Sieg, ging mit den Füßen ins Wasser und unterlag im Playoff Paul Lawrie.",
    "explanation": "Jean van de Velde ging 1999 in die Geschichte ein, als er am 72. Loch eine Drei-Schläge-Führung mit einem Triple-Bogey verspielte."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Wer gewann 1913 als 20-jähriger Amateur sensationell die U.S. Open in Brookline gegen die britischen Superstars Vardon und Ray?",
    "a": [
      "Bobby Jones vor seinem Studienabschluss",
      "Walter Hagen als aufstrebender Club-Profi",
      "Chick Evans als Meister der Eisen",
      "Francis Ouimet mit seinem 10-jährigen Caddie"
    ],
    "correctIndex": 3,
    "exp": "Ouimets Sensationssieg als Arbeiterkind gegen die elitären Golfprofis begründete den ersten großen Golfboom in den USA ('The Greatest Game Ever Played').",
    "explanation": "Francis Ouimet schlug 1913 die britischen Stars Harry Vardon und Ted Ray im Playoff und machte Golf zum Volkssport in den USA."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Welcher Spieler gewann die US Open 2006 in Winged Foot, nachdem Mickelson und Montgomerie an Loch 18 scheiterten?",
    "a": [
      "Jim Furyk aus West Chester",
      "Padraig Harrington aus Dublin",
      "Kenneth Ferrie aus Ashington",
      "Geoff Ogilvy aus Australien"
    ],
    "correctIndex": 3,
    "exp": "Mickelson brauchte an Loch 18 nur ein Par, fabrizierte nach wildem Abschlag ein Doppelbogey und Geoff Ogilvy triumphierte mit +5.",
    "explanation": "Geoff Ogilvy triumphierte 2006 in Winged Foot, als Phil Mickelson und Colin Montgomerie am 72. Loch Nerven zeigten."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Wer ist der einzige Golfer, der die Harry Vardon Trophy (Gewinner der europäischen Geldrangliste) unter drei Flaggen gewann?",
    "a": [
      "Severiano Ballesteros für Spanien",
      "Rory McIlroy für Nordirland",
      "Bernhard Langer für Deutschland",
      "Ernie Els für Südafrika"
    ],
    "correctIndex": 3,
    "exp": "Ernie Els gewann den Order of Merit der European Tour in den Jahren 2003 und 2004 und feierte weltweite Erfolge auf allen großen Touren.",
    "explanation": "Ernie Els zählte über zwei Jahrzehnte zu den dominierenden Weltstars der European Tour und PGA Tour."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Welche Legende erfand den modernen Vardon-Griff (Overlapping Grip), der noch heute von den meisten Profis gespielt wird?",
    "a": [
      "Old Tom Morris aus St Andrews",
      "James Braid aus Fife",
      "John Henry Taylor aus Devon",
      "Harry Vardon aus Jersey"
    ],
    "correctIndex": 3,
    "exp": "Der sechsfache Open-Champion Harry Vardon legte den kleinen Finger der rechten Hand über den Zeigefinger der linken – der bis heute populärste Golfgriff.",
    "explanation": "Harry Vardon popularisierte den Overlapping Grip, der bis heute Standard unter Golflehrern und Tour-Pros ist."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Welcher US-Golfer gewann 2003 die PGA Championship in Oak Hill mit einem Schlag ins Loch aus 165 Metern am Schlusstag?",
    "a": [
      "Rich Beem im Duell mit Tiger",
      "David Toms mit klugem Vorlegen",
      "Mark Brooks im Stechen in Valhalla",
      "Shaun Micheel mit dem Eisen 7"
    ],
    "correctIndex": 3,
    "exp": "Micheels Eisen 7 an Loch 18 blieb fünf Zentimeter vor dem Loch liegen – einer der besten Annäherungsschläge der Major-Historie.",
    "explanation": "Shaun Micheel schlug 2003 an Loch 18 in Oak Hill ein sensationelles Eisen 7 bis auf wenige Zentimeter an die Fahne zum Sieg."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Wer war der erste Linkshänder der Geschichte, der ein Major-Turnier gewinnen konnte?",
    "a": [
      "Phil Mickelson beim Masters 2004",
      "Mike Weir beim Masters 2003",
      "Bubba Watson beim Masters 2012",
      "Bob Charles bei The Open 1963"
    ],
    "correctIndex": 3,
    "exp": "Der Neuseeländer Sir Bob Charles gewann The Open 1963 in Royal Lytham & St Annes und bewies, dass auch Linkshänder Majors gewinnen können.",
    "explanation": "Bob Charles siegte 1963 bei The Open und trug sich als erster Linkshänder in die Major-Siegerlisten ein."
  },
  {
    "cat": "golf_profis",
    "diff": "pro",
    "q": "Welcher US-Profi lochte 1982 bei den U.S. Open in Pebble Beach an Loch 17 aus tiefem Rough zum legendären Chip-in ein?",
    "a": [
      "Johnny Miller gegen Seve Ballesteros",
      "Ray Floyd gegen Lanny Wadkins",
      "Craig Stadler gegen Dan Pohl",
      "Tom Watson gegen Jack Nicklaus"
    ],
    "correctIndex": 3,
    "exp": "Watsons Caddie riet zum vorsichtigen Vorlegen, Watson entgegnete 'I'm gonna hole it' – und chipte zum Birdie ein, um Nicklaus zu schlagen.",
    "explanation": "Tom Watsons Chip-in an Loch 17 in Pebble Beach 1982 gilt als einer der dramatischsten Schläge der U.S.-Open-Geschichte."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("golf_profis", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["golf_profis"] = DATA;
  }
})();
