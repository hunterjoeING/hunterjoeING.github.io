// Unified quiz bank for "fussball_bundesliga" (75 questions)
(function () {
  const DATA = [
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "In welchem Jahr wurde die deutsche Fußball-Bundesliga gegründet und startete in ihre erste Spielzeit?",
    "a": [
      "1963",
      "1954",
      "1968",
      "1972"
    ],
    "explanation": "Am 24. August 1963 startete die Bundesliga mit 16 Gründungsmitgliedern in ihre Premierensaison.",
    "exp": "Am 24. August 1963 startete die Bundesliga mit 16 Gründungsmitgliedern in ihre Premierensaison."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Welcher Verein sicherte sich 1963/64 die allererste Bundesliga-Meisterschaft der Geschichte?",
    "a": [
      "1. FC Köln",
      "Hamburger SV",
      "FC Schalke 04",
      "Werder Bremen"
    ],
    "explanation": "Die Kölner um Trainer Georg Knöpfle dominierten die Premierensaison und wurden erster Meister.",
    "exp": "Die Kölner um Trainer Georg Knöpfle dominierten die Premierensaison und wurden erster Meister."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Wer erzielte am 24. August 1963 für Borussia Dortmund das historisch allererste Tor der Bundesliga?",
    "a": [
      "Timo Konietzka",
      "Uwe Seeler",
      "Gerd Müller",
      "Charly Dörfel"
    ],
    "explanation": "Bereits nach 58 Sekunden traf Konietzka in Bremen gegen Werder – es gab damals noch keine TV-Kameras am Platz.",
    "exp": "Bereits nach 58 Sekunden traf Konietzka in Bremen gegen Werder – es gab damals noch keine TV-Kameras am Platz."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Welche Trophäe wird dem deutschen Fußballmeister am Ende einer erfolgreichen Bundesliga-Saison überreicht?",
    "a": [
      "Die Meisterschale",
      "Der Meisterpokal",
      "Die Bundeskrone",
      "Der DFB-Adler"
    ],
    "explanation": "Die Meisterschale wurde 1949 von Kunstprofessorin Elisabeth Treskow an den Kölner Werkschulen entworfen.",
    "exp": "Die Meisterschale wurde 1949 von Kunstprofessorin Elisabeth Treskow an den Kölner Werkschulen entworfen."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Wie viele Tore erzielte Gerd Müller in der legendären Rekordsaison 1971/72 für den FC Bayern München?",
    "a": [
      "40 Tore",
      "36 Tore",
      "44 Tore",
      "48 Tore"
    ],
    "explanation": "Dieser Fabelrekord von 40 Treffern hielt fast ein halbes Jahrhundert lang bis zum Mai 2021.",
    "exp": "Dieser Fabelrekord von 40 Treffern hielt fast ein halbes Jahrhundert lang bis zum Mai 2021."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Wer knackte in der Saison 2020/21 am 34. Spieltag in letzter Sekunde Gerd Müllers 40-Tore-Rekord mit 41 Treffern?",
    "a": [
      "Robert Lewandowski",
      "Erling Haaland",
      "Pierre-Emerick Aubameyang",
      "Claudio Pizarro"
    ],
    "explanation": "In der 90. Minute gegen den FC Augsburg staubte Lewandowski zum 41. Saisontor ab.",
    "exp": "In der 90. Minute gegen den FC Augsburg staubte Lewandowski zum 41. Saisontor ab."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Welcher Spieler hält mit 602 Partien für Eintracht Frankfurt den ewigen Rekord für die meisten Bundesliga-Einsätze?",
    "a": [
      "Charly Körbel",
      "Manfred Kaltz",
      "Oliver Kahn",
      "Klaus Fichtel"
    ],
    "explanation": "Körbel bestritt zwischen 1972 und 1991 alle seine 602 Spiele für ein und denselben Verein.",
    "exp": "Körbel bestritt zwischen 1972 und 1991 alle seine 602 Spiele für ein und denselben Verein."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Welcher Verein feierte 1998 als einziger Aufsteiger der Bundesliga-Historie direkt im Anschluss die Meisterschaft?",
    "a": [
      "1. FC Kaiserslautern",
      "Borussia Mönchengladbach",
      "VfB Stuttgart",
      "Hannover 96"
    ],
    "explanation": "Unter Trainer Otto Rehhagel marschierte der FCK direkt aus der 2. Bundesliga zum Meistertitel.",
    "exp": "Unter Trainer Otto Rehhagel marschierte der FCK direkt aus der 2. Bundesliga zum Meistertitel."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Wie wird das traditionsreiche Duell zwischen Borussia Dortmund und dem FC Schalke 04 genannt?",
    "a": [
      "Revierderby",
      "Rheinderby",
      "Nordderby",
      "Frankenderby"
    ],
    "explanation": "Das Duell der beiden Ruhrpott-Schwergewichte gilt als das emotionalste Derby im deutschen Vereinsfußball.",
    "exp": "Das Duell der beiden Ruhrpott-Schwergewichte gilt als das emotionalste Derby im deutschen Vereinsfußball."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "In welcher Stadt wird seit 1985 traditionell jedes Jahr das Endspiel des DFB-Pokals ausgetragen?",
    "a": [
      "Berlin",
      "München",
      "Frankfurt",
      "Stuttgart"
    ],
    "explanation": "Seit 1985 ist das Berliner Olympiastadion die feste Heimat des deutschen Pokalfinales.",
    "exp": "Seit 1985 ist das Berliner Olympiastadion die feste Heimat des deutschen Pokalfinales."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Welcher bayerische Verein stieg 1965 gemeinsam mit dem FC Bayern München in die Bundesliga auf und wurde 1966 Meister?",
    "a": [
      "TSV 1860 München",
      "1. FC Nürnberg",
      "SpVgg Fürth",
      "FC Augsburg"
    ],
    "explanation": "Die 'Löwen' sicherten sich 1966 unter Max Merkel den Titel und waren damals Bayerns Nummer eins.",
    "exp": "Die 'Löwen' sicherten sich 1966 unter Max Merkel den Titel und waren damals Bayerns Nummer eins."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Welcher Verein errang 1967 sensationell mit nur 27 Gegentoren die deutsche Meisterschaft?",
    "a": [
      "Eintracht Braunschweig",
      "MSV Duisburg",
      "Rot-Weiss Essen",
      "Hannover 96"
    ],
    "explanation": "Unter Helmuth Johannsen kassierten die Braunschweiger in 34 Saisonspielen nur 27 Gegentore.",
    "exp": "Unter Helmuth Johannsen kassierten die Braunschweiger in 34 Saisonspielen nur 27 Gegentore."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Welche berühmte Stehtribüne im Dortmunder Signal Iduna Park gilt als die größte Stehplatz-Tribüne Europas?",
    "a": [
      "Die Gelbe Wand",
      "Die Rote Kurve",
      "Der Grüne Block",
      "Die Weiße Wand"
    ],
    "explanation": "Die Dortmunder Südtribüne bietet Platz für knapp 25.000 leidenschaftlich stehende Fans.",
    "exp": "Die Dortmunder Südtribüne bietet Platz für knapp 25.000 leidenschaftlich stehende Fans."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Welcher Torhüter kassierte in der Bundesliga die meisten Gegentore der Ligageschichte?",
    "a": [
      "Eike Immel",
      "Oliver Kahn",
      "Uli Stein",
      "Bodo Illgner"
    ],
    "explanation": "In 534 Bundesligaspielen musste Eike Immel insgesamt 829 Mal hinter sich greifen.",
    "exp": "In 534 Bundesligaspielen musste Eike Immel insgesamt 829 Mal hinter sich greifen."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Für welche artistische Spezialdisziplin war Bundesliga-Rekordtorschütze Klaus Fischer berühmt?",
    "a": [
      "Fallrückzieher",
      "Direktabnahmen",
      "Kopfballtore",
      "Spitzkicks"
    ],
    "explanation": "Fischers Fallrückzieher 1977 gegen die Schweiz wurde zum deutschen 'Tor des Jahrhunderts' gewählt.",
    "exp": "Fischers Fallrückzieher 1977 gegen die Schweiz wurde zum deutschen 'Tor des Jahrhunderts' gewählt."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Welcher Verein gewann 1992 als Zweitligist überraschend das Finale des DFB-Pokals gegen Borussia Mönchengladbach?",
    "a": [
      "Hannover 96",
      "Stuttgarter Kickers",
      "SC Freiburg",
      "SV Waldhof Mannheim"
    ],
    "explanation": "Torwart Jörg Sievers hielt im Elfmeterschießen zwei Schüsse und verwandelte selbst den entscheidenden Ball.",
    "exp": "Torwart Jörg Sievers hielt im Elfmeterschießen zwei Schüsse und verwandelte selbst den entscheidenden Ball."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Welcher Rekordspieler erzielte in einem einzigen Bundesligaspiel unglaubliche 6 Tore für den 1. FC Köln?",
    "a": [
      "Dieter Müller",
      "Klaus Allofs",
      "Hannes Löhr",
      "Pierre Littbarski"
    ],
    "explanation": "Beim 7:2-Sieg der Kölner gegen Werder Bremen im August 1977 traf Müller sechsmal – bis heute unerreicht.",
    "exp": "Beim 7:2-Sieg der Kölner gegen Werder Bremen im August 1977 traf Müller sechsmal – bis heute unerreicht."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Wer wurde 2004 als erster ausländischer Profi zu Deutschlands Fußballer des Jahres gewählt?",
    "a": [
      "Aílton",
      "Giovane Élber",
      "Claudio Pizarro",
      "Tomáš Rosický"
    ],
    "explanation": "Der brasilianische 'Kugelblitz' schoss Werder Bremen mit 28 Treffern zum Meistertitel und Pokalsieg.",
    "exp": "Der brasilianische 'Kugelblitz' schoss Werder Bremen mit 28 Treffern zum Meistertitel und Pokalsieg."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Welcher Traditionsverein spielte von 1963 bis zu seinem ersten Abstieg 2018 ununterbrochen in der Bundesliga?",
    "a": [
      "Hamburger SV",
      "1. FC Nürnberg",
      "VfB Stuttgart",
      "Eintracht Frankfurt"
    ],
    "explanation": "Der HSV galt als 'Bundesliga-Dino', dessen Stadion-Stadionuhr 54 Jahre lang die Ligazugehörigkeit zählte.",
    "exp": "Der HSV galt als 'Bundesliga-Dino', dessen Stadion-Stadionuhr 54 Jahre lang die Ligazugehörigkeit zählte."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Welcher Trainer gewann mit drei verschiedenen Klubs (Bayern, Gladbach, Barcelona) Meistertitel und Europapokale?",
    "a": [
      "Udo Lattek",
      "Hennes Weisweiler",
      "Ottmar Hitzfeld",
      "Branko Zebec"
    ],
    "explanation": "Lattek holte 8 deutsche Meistertitel und ist der erfolgreichste Vereinstrainer der Bundesliga-Geschichte.",
    "exp": "Lattek holte 8 deutsche Meistertitel und ist der erfolgreichste Vereinstrainer der Bundesliga-Geschichte."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Wie viele Punkte erhielt eine Mannschaft in der Bundesliga für einen Sieg vor der Einführung der Drei-Punkte-Regel 1995?",
    "a": [
      "2 Punkte",
      "1 Punkt",
      "3 Punkte",
      "4 Punkte"
    ],
    "explanation": "Bis zur Saison 1994/95 galt das klassische Zwei-Punkte-System mit Wertungen wie 2:0 oder 1:1 Punkten.",
    "exp": "Bis zur Saison 1994/95 galt das klassische Zwei-Punkte-System mit Wertungen wie 2:0 oder 1:1 Punkten."
  },
  {
    "cat": "bundesliga",
    "diff": "easy",
    "q": "Welcher Torjäger erzielte im September 2015 nach Einwechslung gegen den VfL Wolfsburg 5 Tore in knapp 9 Minuten?",
    "a": [
      "Robert Lewandowski",
      "Mario Götze",
      "Thomas Müller",
      "Arjen Robben"
    ],
    "explanation": "Zwischen der 51. und 60. Minute erzielte der Pole den schnellsten Hattrick, Vierer- und Fünferpack der Ligageschichte.",
    "exp": "Zwischen der 51. und 60. Minute erzielte der Pole den schnellsten Hattrick, Vierer- und Fünferpack der Ligageschichte."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Wer erzielte 1994 gegen Nürnberg das berühmt-berüchtigte 'Phantom-Tor', das fälschlicherweise anerkannt wurde?",
    "a": [
      "Thomas Helmer",
      "Lothar Matthäus",
      "Christian Ziege",
      "Mehmet Scholl"
    ],
    "explanation": "Helmers Ball kullerte am Pfosten vorbei ins Aus, Schiedsrichter Osmers entschied auf Tor – das Spiel wurde wiederholt.",
    "exp": "Helmers Ball kullerte am Pfosten vorbei ins Aus, Schiedsrichter Osmers entschied auf Tor – das Spiel wurde wiederholt."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Durch welches kuriose Loch im Außennetz erzielte Stefan Kießling 2013 für Leverkusen ein Phantom-Tor gegen Hoffenheim?",
    "a": [
      "Loch im Außennetz",
      "Unter der Latte durch",
      "Riss an der Torlinie",
      "Loch im Pfostenfuß"
    ],
    "explanation": "Kießlings Kopfball flog neben das Tor, rutschte durch ein Netzloch nach innen und zählte mangels VAR.",
    "exp": "Kießlings Kopfball flog neben das Tor, rutschte durch ein Netzloch nach innen und zählte mangels VAR."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welches legendäre Ereignis führte im April 1971 zum Abbruch der Partie zwischen Borussia Mönchengladbach und Werder Bremen?",
    "a": [
      "Bruch des Torpfostens",
      "Ausfall des Flutlichts",
      "Einsturz der Bande",
      "Riss des Tornetzes"
    ],
    "explanation": "Stürmer Herbert Laumen stürzte ins Netz, woraufhin der Holzpfosten abbrach – das Spiel wurde für Bremen gewertet.",
    "exp": "Stürmer Herbert Laumen stürzte ins Netz, woraufhin der Holzpfosten abbrach – das Spiel wurde für Bremen gewertet."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Schiedsrichter pfiff 1975 die erste Halbzeit von Werder gegen Braunschweig schon nach 32 Minuten zur Pause ab?",
    "a": [
      "Wolf-Dieter Ahlenfelder",
      "Walter Eschweiler",
      "Markus Merk",
      "Aron Schmidhuber"
    ],
    "explanation": "Ahlenfelder hatte vor dem Spiel etwas Schnaps getrunken und bemerkte seinen frühen Pausenpfiff erst nach Protesten.",
    "exp": "Ahlenfelder hatte vor dem Spiel etwas Schnaps getrunken und bemerkte seinen frühen Pausenpfiff erst nach Protesten."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Klub durfte sich am 19. Mai 2001 für genau vier Minuten als deutscher Meister fühlen, bevor Patrik Andersson traf?",
    "a": [
      "FC Schalke 04",
      "Borussia Dortmund",
      "Bayer 04 Leverkusen",
      "Hertha BSC"
    ],
    "explanation": "Schalke feierte bereits im Parkstadion, ehe Andersson in Hamburg per indirektem Freistoß in Minute 94 traf.",
    "exp": "Schalke feierte bereits im Parkstadion, ehe Andersson in Hamburg per indirektem Freistoß in Minute 94 traf."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Amateurverein aus Franken warf den FC Bayern München 1994 in der ersten DFB-Pokal-Runde mit 1:0 aus dem Wettbewerb?",
    "a": [
      "TSV Vestenbergsgreuth",
      "SC Pfullendorf",
      "SpVgg Bayreuth",
      "FC Schweinfurt 05"
    ],
    "explanation": "Roland Stein köpfte das goldene Tor gegen Giovanni Trapattonis Bayern und schrieb Pokalgeschichte.",
    "exp": "Roland Stein köpfte das goldene Tor gegen Giovanni Trapattonis Bayern und schrieb Pokalgeschichte."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Regionalligist schaltete 1997 nacheinander sowohl Borussia Dortmund als auch Schalke 04 und Bayern München aus?",
    "a": [
      "Eintracht Trier",
      "Kickers Offenbach",
      "Energie Cottbus",
      "SSV Reutlingen"
    ],
    "explanation": "Trier warf den Champions-League-Sieger BVB und die Bayern raus und scheiterte erst im Halbfinale.",
    "exp": "Trier warf den Champions-League-Sieger BVB und die Bayern raus und scheiterte erst im Halbfinale."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Viertligist schaffte es 2019/20 als erster Regionalligist der DFB-Pokal-Historie bis ins Halbfinale?",
    "a": [
      "1. FC Saarbrücken",
      "SV Elversberg",
      "Rot-Weiss Essen",
      "VfB Lübeck"
    ],
    "explanation": "Torwart Daniel Batz hielt im Viertelfinale gegen Fortuna Düsseldorf sagenhafte fünf Elfmeter.",
    "exp": "Torwart Daniel Batz hielt im Viertelfinale gegen Fortuna Düsseldorf sagenhafte fünf Elfmeter."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Verein stieg 1969 als amtierender deutscher Meister sensationell direkt wieder in die zweite Liga ab?",
    "a": [
      "1. FC Nürnberg",
      "Eintracht Braunschweig",
      "TSV 1860 München",
      "Rot-Weiss Essen"
    ],
    "explanation": "Nach dem Meistertitel 1968 verlor der 'Club' wichtige Stammkräfte und stieg prompt auf Platz 17 ab.",
    "exp": "Nach dem Meistertitel 1968 verlor der 'Club' wichtige Stammkräfte und stieg prompt auf Platz 17 ab."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Wer schoss im August 1989 für Bayern München das 'Tor des Jahrzehnts' per Weitschuss aus der eigenen Spielhälfte?",
    "a": [
      "Klaus Augenthaler",
      "Stefan Reuter",
      "Hans Dorfner",
      "Roland Wohlfarth"
    ],
    "explanation": "Gegen Eintracht Frankfurt sah Augenthaler Torwart Uli Stein zu weit vor dem Kasten und traf aus 50 Metern.",
    "exp": "Gegen Eintracht Frankfurt sah Augenthaler Torwart Uli Stein zu weit vor dem Kasten und traf aus 50 Metern."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welche beiden Spieler teilen sich mit jeweils 6 Eigentoren den ewigen Negativrekord der Bundesliga?",
    "a": [
      "Manfred Kaltz und Nikolce Noveski",
      "Charly Körbel und Jens Nowotny",
      "Per Mertesacker und Mats Hummels",
      "Willi Neuberger und Bernard Dietz"
    ],
    "explanation": "Noveski erzielte 2005 für Mainz gegen Frankfurt sogar zwei Eigentore innerhalb von 90 Minuten.",
    "exp": "Noveski erzielte 2005 für Mainz gegen Frankfurt sogar zwei Eigentore innerhalb von 90 Minuten."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Wer erzielte in der Saison 2014/15 nach exakt 9 Sekunden für Leverkusen das damals schnellste Tor der Bundesligageschichte?",
    "a": [
      "Karim Bellarabi",
      "Kevin Volland",
      "Paul Freier",
      "Son Heung-min"
    ],
    "explanation": "Bellarabi traf in Dortmund nach 9 Sekunden; Kevin Volland glich diese Marke 2015 für Hoffenheim aus.",
    "exp": "Bellarabi traf in Dortmund nach 9 Sekunden; Kevin Volland glich diese Marke 2015 für Hoffenheim aus."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Spieler wurde im November 2020 einen Tag nach seinem 16. Geburtstag zum jüngsten Bundesliga-Spieler aller Zeiten?",
    "a": [
      "Youssoufa Moukoko",
      "Nuri Sahin",
      "Florian Wirtz",
      "Jamal Musiala"
    ],
    "explanation": "Moukoko debütierte für Borussia Dortmund gegen Hertha BSC mit exakt 16 Jahren und einem Tag.",
    "exp": "Moukoko debütierte für Borussia Dortmund gegen Hertha BSC mit exakt 16 Jahren und einem Tag."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Rekordhalter flog in seiner Bundesligakarriere insgesamt achtmal mit Rot oder Gelb-Rot vom Platz?",
    "a": [
      "Jens Nowotny",
      "Torsten Frings",
      "Stefan Effenberg",
      "Maik Franz"
    ],
    "explanation": "Nowotny und Luiz Gustavo teilen sich den Rekord mit jeweils 8 Platzverweisen in der Liga.",
    "exp": "Nowotny und Luiz Gustavo teilen sich den Rekord mit jeweils 8 Platzverweisen in der Liga."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Trainer wechselte sich im DFB-Pokal-Finale 1973 gegen den 1. FC Köln selbst ein und erzielte das Siegtor?",
    "a": [
      "Günter Netzer",
      "Hennes Weisweiler",
      "Jupp Heynckes",
      "Herbert Laumen"
    ],
    "explanation": "Netzer saß zunächst auf der Bank, sagte vor der Verlängerung 'Ich spiel dann jetzt' und traf zum 2:1.",
    "exp": "Netzer saß zunächst auf der Bank, sagte vor der Verlängerung 'Ich spiel dann jetzt' und traf zum 2:1."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "In welchem Stadion feierte der 1. FC Kaiserslautern seine legendären Aufholjagden bei typischem 'Fritz-Walter-Wetter'?",
    "a": [
      "Fritz-Walter-Stadion",
      "Südweststadion",
      "Wildparkstadion",
      "Ludwigsparkstadion"
    ],
    "explanation": "Das Stadion auf dem Betzenberg galt wegen der extremen Lautstärke als gefürchtete Festung.",
    "exp": "Das Stadion auf dem Betzenberg galt wegen der extremen Lautstärke als gefürchtete Festung."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Mit welchem historischen Endstand endete das Revierderby 2017 in Dortmund, nachdem der BVB bereits 4:0 geführt hatte?",
    "a": [
      "4:4 Unentschieden",
      "5:4 für Dortmund",
      "4:3 für Schalke",
      "5:5 Unentschieden"
    ],
    "explanation": "Naldo köpfte in der 94. Minute das 4:4 für Schalke nach einem sensationellen 0:4-Rückstand.",
    "exp": "Naldo köpfte in der 94. Minute das 4:4 für Schalke nach einem sensationellen 0:4-Rückstand."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Traditionsverein wurde 2007 unter Armin Veh überraschend deutscher Meister mit den 'jungen Wilden'?",
    "a": [
      "VfB Stuttgart",
      "Werder Bremen",
      "Hamburger SV",
      "Bayer 04 Leverkusen"
    ],
    "explanation": "Mit Talenten wie Mario Gomez, Sami Khedira und Serdar Tasci sicherte sich der VfB am 34. Spieltag die Schale.",
    "exp": "Mit Talenten wie Mario Gomez, Sami Khedira und Serdar Tasci sicherte sich der VfB am 34. Spieltag die Schale."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher brasilianische Stürmer erzielte 1999 für Bayern München ein unnachahmliches Tor von der Eckfahne gegen Hansa Rostock?",
    "a": [
      "Giovane Élber",
      "Paulo Sérgio",
      "Aílton",
      "Marcelinho"
    ],
    "explanation": "Élber schlenzte den Ball aus spitzestem Winkel von der Torauslinie über Torwart Perry Bräutigam ins Netz.",
    "exp": "Élber schlenzte den Ball aus spitzestem Winkel von der Torauslinie über Torwart Perry Bräutigam ins Netz."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Bundesliga-Profi hält mit 114 Gelben Karten den ewigen Rekord für die meisten Verwarnungen?",
    "a": [
      "Stefan Effenberg",
      "Torsten Frings",
      "David Jarolim",
      "Christian Wörns"
    ],
    "explanation": "Der 'Tiger' kassierte in 370 Bundesligaspielen 114 Gelbe Karten, flog aber nur dreimal mit Rot vom Platz.",
    "exp": "Der 'Tiger' kassierte in 370 Bundesligaspielen 114 Gelbe Karten, flog aber nur dreimal mit Rot vom Platz."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welches Team stellte 1977/78 mit einem 12:0 gegen Borussia Dortmund den Rekord für den höchsten Bundesliga-Sieg auf?",
    "a": [
      "Borussia Mönchengladbach",
      "FC Bayern München",
      "1. FC Köln",
      "Hamburger SV"
    ],
    "explanation": "Jupp Heynckes erzielte beim 12:0 im Düsseldorfer Rheinstadion alleine fünf Tore für Gladbach.",
    "exp": "Jupp Heynckes erzielte beim 12:0 im Düsseldorfer Rheinstadion alleine fünf Tore für Gladbach."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Torhüter parierte in seiner Bundesligakarriere sensationelle 17 Elfmeter und hält damit den Ligarekord?",
    "a": [
      "Rudi Kargus",
      "Oliver Kahn",
      "Toni Schumacher",
      "Norbert Nigbur"
    ],
    "explanation": "Kargus parierte beim Hamburger SV und Karlsruher SC fast jeden dritten Strafstoß gegen sich.",
    "exp": "Kargus parierte beim Hamburger SV und Karlsruher SC fast jeden dritten Strafstoß gegen sich."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Klub gewann 1970 als Zweitligist den DFB-Pokal, weil das Finale wegen der WM 1970 erst im Spätsommer stattfand?",
    "a": [
      "Kickers Offenbach",
      "Fortuna Düsseldorf",
      "Alemannia Aachen",
      "Schwarz-Weiß Essen"
    ],
    "explanation": "Offenbach spielte als Zweitligist das Turnier und war beim Finalsieg gegen Köln bereits frisch aufgestiegen.",
    "exp": "Offenbach spielte als Zweitligist das Turnier und war beim Finalsieg gegen Köln bereits frisch aufgestiegen."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Wolfsburger Stürmer bildete 2008/09 mit Grafite das torgefährlichste Sturmduo der Bundesligageschichte (54 Tore)?",
    "a": [
      "Edin Džeko",
      "Zvjezdan Misimović",
      "Kevin De Bruyne",
      "Ivica Olić"
    ],
    "explanation": "Grafite (28 Tore) und Džeko (26 Tore) schossen die 'Wölfe' unter Felix Magath zur Sensationsmeisterschaft.",
    "exp": "Grafite (28 Tore) und Džeko (26 Tore) schossen die 'Wölfe' unter Felix Magath zur Sensationsmeisterschaft."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Spieler erzielte mit 40 Jahren und 227 Tagen das historisch älteste Tor der Bundesliga-Historie?",
    "a": [
      "Claudio Pizarro",
      "Mirko Votava",
      "Manfred Burgsmüller",
      "Morten Olsen"
    ],
    "explanation": "Im Mai 2019 traf Pizarro für Werder Bremen gegen RB Leipzig und verbesserte seinen eigenen Altersrekord.",
    "exp": "Im Mai 2019 traf Pizarro für Werder Bremen gegen RB Leipzig und verbesserte seinen eigenen Altersrekord."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Verein stellte in der Saison 2023/24 mit 28 Siegen und 6 Remis die erste ungeschlagene Bundesligasaison auf?",
    "a": [
      "Bayer 04 Leverkusen",
      "FC Bayern München",
      "Borussia Dortmund",
      "RB Leipzig"
    ],
    "explanation": "Unter Trainer Xabi Alonso blieb Leverkusen die gesamte Bundesligasaison ohne eine einzige Niederlage.",
    "exp": "Unter Trainer Xabi Alonso blieb Leverkusen die gesamte Bundesligasaison ohne eine einzige Niederlage."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher legendäre Torjäger hält hinter Gerd Müller und Robert Lewandowski mit 268 Treffern Platz 3 der ewigen Torschützenliste?",
    "a": [
      "Klaus Fischer",
      "Jupp Heynckes",
      "Manfred Burgsmüller",
      "Ulf Kirsten"
    ],
    "explanation": "Fischer traf vor allem für Schalke 04, den 1. FC Köln, 1860 München und den VfL Bochum.",
    "exp": "Fischer traf vor allem für Schalke 04, den 1. FC Köln, 1860 München und den VfL Bochum."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Torhüter blieb in der Saison 2002/03 beim VfB Stuttgart 884 Minuten am Stück ohne jedes Gegentor?",
    "a": [
      "Timo Hildebrand",
      "Oliver Kahn",
      "Manuel Neuer",
      "Jens Lehmann"
    ],
    "explanation": "Hildebrands Rekord von fast zehn Partien ohne Gegentreffer ist bis heute unübertroffen.",
    "exp": "Hildebrands Rekord von fast zehn Partien ohne Gegentreffer ist bis heute unübertroffen."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Traditionsverein gewann 1993 und 1995 unter Ottmar Hitzfeld zwei Meistertitel in Folge mit den Schweizern Chapuisat und Sammer?",
    "a": [
      "Borussia Dortmund",
      "SV Werder Bremen",
      "1. FC Kaiserslautern",
      "Hamburger SV"
    ],
    "explanation": "Borussia Dortmund holte 1995 nach 32 Jahren Wartezeit endlich wieder die Meisterschale an den Borsigplatz.",
    "exp": "Borussia Dortmund holte 1995 nach 32 Jahren Wartezeit endlich wieder die Meisterschale an den Borsigplatz."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Bundesligist schloss die Saison 1965/66 auf Platz 2 ab und spielte damals im traditionsreichen Stadion Rote Erde?",
    "a": [
      "Borussia Dortmund",
      "FC Schalke 04",
      "Hannover 96",
      "Meidericher SV"
    ],
    "explanation": "Vor dem Bau des Westfalenstadions zur WM 1974 trug der BVB seine Heimspiele in der Roten Erde aus.",
    "exp": "Vor dem Bau des Westfalenstadions zur WM 1974 trug der BVB seine Heimspiele in der Roten Erde aus."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher dänische Offensivstar brillierte in den 1970er-Jahren bei Borussia Mönchengladbach und gewann 1977 den Ballon d'Or?",
    "a": [
      "Allan Simonsen",
      "Henning Jensen",
      "Per Røntved",
      "Preben Elkjær Larsen"
    ],
    "explanation": "Der wendige Stürmer ist der einzige Däne, der jemals zu Europas Fußballer des Jahres gekürt wurde.",
    "exp": "Der wendige Stürmer ist der einzige Däne, der jemals zu Europas Fußballer des Jahres gekürt wurde."
  },
  {
    "cat": "bundesliga",
    "diff": "mid",
    "q": "Welcher Bundesligist trug seine Heimspiele früher im legendären Parkstadion mit über 70.000 Plätzen aus?",
    "a": [
      "FC Schalke 04",
      "VfL Bochum",
      "Rot-Weiss Essen",
      "MSV Duisburg"
    ],
    "explanation": "Das Parkstadion wurde 1973 eröffnet und war bis zum Bau der modernen Arena AufSchalke 2001 Schalkes Heimat.",
    "exp": "Das Parkstadion wurde 1973 eröffnet und war bis zum Bau der modernen Arena AufSchalke 2001 Schalkes Heimat."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Welcher Verein kassierte in der Saison 1965/66 mit nur 8 Pluspunkten und 112 Gegentoren die schwächste Bilanz der Historie?",
    "a": [
      "Tasmania Berlin",
      "SpVgg Greuther Fürth",
      "Blau-Weiß 90 Berlin",
      "Wuppertaler SV"
    ],
    "explanation": "Tasmania sprang damals extrem kurzfristig für Hertha BSC ein und hält fast alle Negativrekorde der Liga.",
    "exp": "Tasmania sprang damals extrem kurzfristig für Hertha BSC ein und hält fast alle Negativrekorde der Liga."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Wer schoss am 1. Spieltag der Bundesliga 1963 das erste Tor für den späteren Premierensieger 1. FC Köln?",
    "a": [
      "Wolfgang Overath",
      "Hans Schäfer",
      "Karl-Heinz Thielen",
      "Christian Müller"
    ],
    "explanation": "Der 19-jährige Wolfgang Overath traf beim 2:0-Auswärtssieg in Saarbrücken zum 1:0 für Köln.",
    "exp": "Der 19-jährige Wolfgang Overath traf beim 2:0-Auswärtssieg in Saarbrücken zum 1:0 für Köln."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Wer flog im August 1986 im Spiel Bayern gegen Dortmund vom Platz, weil er Schiedsrichter Roth die Gelbe Karte wegschnappte?",
    "a": [
      "Marcel Răducanu",
      "Norbert Dickel",
      "Frank Mill",
      "Thomas Helmer"
    ],
    "explanation": "Roth zog Gelb gegen Răducanu, der BVB-Spieler nahm ihm die Karte aus der Hand und sah glatt Rot.",
    "exp": "Roth zog Gelb gegen Răducanu, der BVB-Spieler nahm ihm die Karte aus der Hand und sah glatt Rot."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Welcher Spieler traf 1976 für den MSV Duisburg nach nur 5 Sekunden gegen Frankfurt, ehe der Treffer aberkannt wurde?",
    "a": [
      "Bernard Dietz",
      "Kurt Jara",
      "Ronnie Worm",
      "Rudolf Seliger"
    ],
    "explanation": "Dietz schoss direkt vom Anstoßkreis ins Netz, doch Schiedsrichter Quindeau hatte den Ball noch nicht freigegeben.",
    "exp": "Dietz schoss direkt vom Anstoßkreis ins Netz, doch Schiedsrichter Quindeau hatte den Ball noch nicht freigegeben."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Welcher Verein führte 1973 als erster Klub der Bundesliga Trikotwerbung ein (mit dem Hirsch-Logo von Jägermeister)?",
    "a": [
      "Eintracht Braunschweig",
      "Fortuna Düsseldorf",
      "Borussia Mönchengladbach",
      "Kickers Offenbach"
    ],
    "explanation": "Um das Verbot des DFB zu umgehen, änderte Braunschweig offiziell sein Vereinswappen in das Jägermeister-Logo.",
    "exp": "Um das Verbot des DFB zu umgehen, änderte Braunschweig offiziell sein Vereinswappen in das Jägermeister-Logo."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Welcher Trainer erfand bei Eintracht Frankfurt 1993 die berühmte 'Mittelfeld-Raute' im deutschen Profifußball?",
    "a": [
      "Klaus Toppmöller",
      "Jörg Berger",
      "Dragoslav Stepanović",
      "Horst Heese"
    ],
    "explanation": "Toppmöller ließ mit Gaudino, Bein, Okocha und Falkenmayer zaubern, ehe die Eintracht knapp die Meisterschaft verpasste.",
    "exp": "Toppmöller ließ mit Gaudino, Bein, Okocha und Falkenmayer zaubern, ehe die Eintracht knapp die Meisterschaft verpasste."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Welcher Torhüter erzielte 1997 für Schalke 04 in Dortmund das erste Kopfballtor eines Keepers aus dem laufenden Spiel?",
    "a": [
      "Jens Lehmann",
      "Frank Rost",
      "Oliver Reck",
      "Hans-Jörg Butt"
    ],
    "explanation": "In der 90. Minute köpfte Lehmann nach einer Ecke von Olaf Thon zum 2:2-Ausgleich im Westfalenstadion ein.",
    "exp": "In der 90. Minute köpfte Lehmann nach einer Ecke von Olaf Thon zum 2:2-Ausgleich im Westfalenstadion ein."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Welcher Bundesliga-Torhüter verwandelte in seiner gesamten Karriere insgesamt 26 Elfmeter in der Bundesliga?",
    "a": [
      "Hans-Jörg Butt",
      "Jens Lehmann",
      "Toni Schumacher",
      "Andreas Köpke"
    ],
    "explanation": "Butt traf für den Hamburger SV, Bayer Leverkusen und Bayern München zuverlässig vom Elfmeterpunkt.",
    "exp": "Butt traf für den Hamburger SV, Bayer Leverkusen und Bayern München zuverlässig vom Elfmeterpunkt."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Welcher Bundesligist schoss in der Saison 1981/82 sensationelle 102 Tore, verpasste aber trotzdem die Meisterschaft?",
    "a": [
      "1. FC Köln",
      "Hamburger SV",
      "FC Bayern München",
      "Borussia Dortmund"
    ],
    "explanation": "Kölns Trainer Rinus Michels ließ spektakulär stürmen, doch Meister wurde der Hamburger SV unter Ernst Happel.",
    "exp": "Kölns Trainer Rinus Michels ließ spektakulär stürmen, doch Meister wurde der Hamburger SV unter Ernst Happel."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Wer erzielte 1986 im dramatischen Spiel gegen Bayern das berühmt-berüchtigte Pfostentor, als er am leeren Tor vorbeischoss?",
    "a": [
      "Frank Mill",
      "Michael Zorc",
      "Norbert Dickel",
      "Daniel Simmes"
    ],
    "explanation": "Mill umkurvte Bayern-Keeper Jean-Marie Pfaff, zögerte zu lange und schoss den Ball freistehend an den linken Pfosten.",
    "exp": "Mill umkurvte Bayern-Keeper Jean-Marie Pfaff, zögerte zu lange und schoss den Ball freistehend an den linken Pfosten."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Welcher Verein gewann 1985 das DFB-Pokal-Finale gegen Bayern München, nachdem Bayern-Star Hoeneß den Wechsel bereits verkündet hatte?",
    "a": [
      "Bayer 05 Uerdingen",
      "Fortuna Düsseldorf",
      "1. FC Saarbrücken",
      "Stuttgarter Kickers"
    ],
    "explanation": "Uerdingen triumphierte mit 2:1 gegen die favorisierten Bayern im ersten Berliner Finale der Neuzeit.",
    "exp": "Uerdingen triumphierte mit 2:1 gegen die favorisierten Bayern im ersten Berliner Finale der Neuzeit."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Welcher ausländische Trainer führte den Hamburger SV 1982 und 1983 zu zwei deutschen Meisterschaften und dem Europapokal der Landesmeister?",
    "a": [
      "Ernst Happel",
      "Branko Zebec",
      "Krunoslav Jurcic",
      "Tomislav Ivic"
    ],
    "explanation": "Der geniale österreichische Taktiker Happel prägte die goldene Ära des HSV mit Hrubesch, Kaltz und Magath.",
    "exp": "Der geniale österreichische Taktiker Happel prägte die goldene Ära des HSV mit Hrubesch, Kaltz und Magath."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Welcher Spieler absolvierte 420 Bundesligaspiele in Serie, ohne jemals auch nur eine einzige Gelbe Karte zu sehen?",
    "a": [
      "Heinz Flohe",
      "Franz Beckenbauer",
      "Gerd Müller",
      "Willi Neuberger"
    ],
    "explanation": "Flohe galt beim 1. FC Köln als hochtalentierter Techniker und extrem fairer Sportsmann.",
    "exp": "Flohe galt beim 1. FC Köln als hochtalentierter Techniker und extrem fairer Sportsmann."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "In welchem Bundesligaspiel fielen 1982 im Frankfurter Waldstadion sagenhafte 11 Tore bei einem 9:2-Heimsieg?",
    "a": [
      "Eintracht Frankfurt gegen Werder Bremen",
      "Eintracht Frankfurt gegen Bayern München",
      "Eintracht Frankfurt gegen Schalke 04",
      "Eintracht Frankfurt gegen VfB Stuttgart"
    ],
    "explanation": "Bum-kun Cha und Norbert Nachtweih zerlegten Werder Bremen beim legendären 9:2 im November 1982.",
    "exp": "Bum-kun Cha und Norbert Nachtweih zerlegten Werder Bremen beim legendären 9:2 im November 1982."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Welcher Verein kassierte im DFB-Pokal-Halbfinale 1984 gegen Schalke 04 ein spektakuläres 6:6 nach Verlängerung?",
    "a": [
      "FC Bayern München",
      "Borussia Mönchengladbach",
      "Hamburger SV",
      "Werder Bremen"
    ],
    "explanation": "Der 18-jährige Olaf Thon traf dreimal für Zweitligist Schalke, Bayern siegte erst im Wiederholungsspiel.",
    "exp": "Der 18-jährige Olaf Thon traf dreimal für Zweitligist Schalke, Bayern siegte erst im Wiederholungsspiel."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Welcher Spieler hält mit 19 verwandelten Strafstößen ohne einen einzigen Fehlschuss den Rekord für die beste Elfmeterquote?",
    "a": [
      "Hans-Joachim Abel",
      "Paul Breitner",
      "Manfred Kaltz",
      "Lothar Matthäus"
    ],
    "explanation": "Abel trat für Fortuna Düsseldorf und Schalke 04 zu 19 Bundesligastrafstößen an und traf jedes einzelne Mal.",
    "exp": "Abel trat für Fortuna Düsseldorf und Schalke 04 zu 19 Bundesligastrafstößen an und traf jedes einzelne Mal."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Wer erzielte 1999 am 34. Spieltag in der 89. Minute das 3:2 für Frankfurt gegen Lautern, das Frankfurt vor dem Abstieg rettete?",
    "a": [
      "Jan Åge Fjørtoft",
      "Chen Yang",
      "Uwe Bindewald",
      "Marco Gebhardt"
    ],
    "explanation": "Fjørtofts legendärer Übersteiger und Schlenzer zum 5:1 rettete die Eintracht und schickte Nürnberg in Tränen runter.",
    "exp": "Fjørtofts legendärer Übersteiger und Schlenzer zum 5:1 rettete die Eintracht und schickte Nürnberg in Tränen runter."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Welcher Schiedsrichter leitete 1971 das Spiel Gladbach gegen Bremen, bei dem der Torpfosten am Bökelberg brach?",
    "a": [
      "Gert Meuser",
      "Ferdinand Biwersi",
      "Rudolf Frickel",
      "Heinz Aldinger"
    ],
    "explanation": "Meuser wartete vergeblich auf Ersatz für das Holztor und brach die Partie nach zwölf Minuten Unterbrechung ab.",
    "exp": "Meuser wartete vergeblich auf Ersatz für das Holztor und brach die Partie nach zwölf Minuten Unterbrechung ab."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Welcher Spieler schoss 1979 für Eintracht Braunschweig gegen Bayern ein Eigentor mit dem Hintern aus 25 Metern?",
    "a": [
      "Reiner Hollmann",
      "Franz Merkhoffer",
      "Hasse Borg",
      "Dieter Zembski"
    ],
    "explanation": "Hollmann wollte eine Flanke klären, fälschte den Ball unglücklich ab und überwand seinen eigenen Keeper.",
    "exp": "Hollmann wollte eine Flanke klären, fälschte den Ball unglücklich ab und überwand seinen eigenen Keeper."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Welcher Bundesliga-Verein schaffte 1999 mit 0:3-Rückstand zur Pause am 34. Spieltag noch ein 3:3 und blieb dadurch erstklassig?",
    "a": [
      "SSV Ulm 1846",
      "Hansa Rostock",
      "SC Freiburg",
      "VfL Bochum"
    ],
    "explanation": "Hansa Rostock rettete sich am letzten Spieltag im Fernduell durch einen dramatischen 3:2-Sieg in Bochum.",
    "exp": "Hansa Rostock rettete sich am letzten Spieltag im Fernduell durch einen dramatischen 3:2-Sieg in Bochum."
  },
  {
    "cat": "bundesliga",
    "diff": "hard",
    "q": "Wer erzielte in der Premierensaison 1963/64 mit 30 Toren für den Hamburger SV die allererste Bundesliga-Torjägerkanone?",
    "a": [
      "Uwe Seeler",
      "Timo Konietzka",
      "Rudolf Brunnenmeier",
      "Friedhelm Konietzka"
    ],
    "explanation": "'Uns Uwe' Seeler traf 30 Mal in 30 Spielen und war der herausragende Star der ersten Bundesligasaison.",
    "exp": "'Uns Uwe' Seeler traf 30 Mal in 30 Spielen und war der herausragende Star der ersten Bundesligasaison."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("fussball_bundesliga", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["fussball_bundesliga"] = DATA;
  }
})();
