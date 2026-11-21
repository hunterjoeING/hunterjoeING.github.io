// Unified quiz bank for "fussball_werder" (75 questions)
(function () {
  const DATA = [
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "In welchem Jahr wurde der Sportverein Werder Bremen von fußballbegeisterten Schülern gegründet?",
    "a": [
      "1899",
      "1896",
      "1904",
      "1909"
    ],
    "explanation": "Am 4. Februar 1899 gründeten Schüler auf dem Stadtwerder den 'Fußballverein Werder von 1899'.",
    "exp": "Am 4. Februar 1899 gründeten Schüler auf dem Stadtwerder den 'Fußballverein Werder von 1899'."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Was bedeutet der altdeutsche Begriff 'Werder', der dem Verein und dem Stadion seinen Namen gab?",
    "a": [
      "Flussinsel oder Halbinsel",
      "Grüne Wiese am Deich",
      "Sturmflut-Schutzwall",
      "Schiffswerft am Hafen"
    ],
    "explanation": "Ein Werder bezeichnet historisch eine vom Fluss umspülte Insel oder das höher gelegene Uferland.",
    "exp": "Ein Werder bezeichnet historisch eine vom Fluss umspülte Insel oder das höher gelegene Uferland."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "In welchem Jahr feierte Werder Bremen unter Trainer Thomas Schaaf das legendäre Double aus Meisterschaft und DFB-Pokalsieg?",
    "a": [
      "2004",
      "1993",
      "1988",
      "2006"
    ],
    "explanation": "2004 dominierte Werder die Liga mit berauschendem Offensivfußball und siegte im Pokalfinale gegen Alemannia Aachen.",
    "exp": "2004 dominierte Werder die Liga mit berauschendem Offensivfußball und siegte im Pokalfinale gegen Alemannia Aachen."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Welcher brasilianische Torjäger wurde 2004 mit 28 Treffern Torschützenkönig und zu Deutschlands Fußballer des Jahres gewählt?",
    "a": [
      "Aílton",
      "Giovane Élber",
      "Diego",
      "Naldo"
    ],
    "explanation": "Der 'Kugelblitz' verzauberte die Fans mit seinem Antritt und schoss Werder im Münchner Olympiastadion zur Meisterschaft.",
    "exp": "Der 'Kugelblitz' verzauberte die Fans mit seinem Antritt und schoss Werder im Münchner Olympiastadion zur Meisterschaft."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Welcher peruanische Stürmer ist der älteste Bundesliga-Torschütze der Geschichte und erzielte für Werder über 100 Ligatore?",
    "a": [
      "Claudio Pizarro",
      "Jefferson Farfán",
      "Paolo Guerrero",
      "Nolberto Solano"
    ],
    "explanation": "'Pizza' traf im Mai 2019 im Alter von 40 Jahren und 227 Tagen für Werder gegen RB Leipzig.",
    "exp": "'Pizza' traf im Mai 2019 im Alter von 40 Jahren und 227 Tagen für Werder gegen RB Leipzig."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Wie wird das prestigeträchtige Nord-Duell zwischen Werder Bremen und dem Hamburger SV traditionell genannt?",
    "a": [
      "Nordderby",
      "Küstenderby",
      "Weser-Elbe-Klassiker",
      "Hanseatenderby"
    ],
    "explanation": "Das Nordderby ist das am häufigsten ausgetragene Traditionsduell im deutschen Profifußball.",
    "exp": "Das Nordderby ist das am häufigsten ausgetragene Traditionsduell im deutschen Profifußball."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Welche Band schuf mit 'Lebenslang Grün-Weiß' die offizielle Vereinshymne von Werder Bremen?",
    "a": [
      "Afterburner",
      "De Fofftig Penns",
      "Klaus & Klaus",
      "Torfrock"
    ],
    "explanation": "Der Rocksong von Afterburner ertönt vor jedem Heimspiel beim Einlaufen der Mannschaften im Weserstadion.",
    "exp": "Der Rocksong von Afterburner ertönt vor jedem Heimspiel beim Einlaufen der Mannschaften im Weserstadion."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Welcher Trainer prägte Werder von 1981 bis 1995 über 14 Jahre lang und wurde mit dem Klub zweimal Meister?",
    "a": [
      "Otto Rehhagel",
      "Willi Multhaup",
      "Felix Magath",
      "Aad de Mos"
    ],
    "explanation": "'König Otto' machte aus Werder den schärfsten Bayern-Rivalen der 1980er- und 1990er-Jahre.",
    "exp": "'König Otto' machte aus Werder den schärfsten Bayern-Rivalen der 1980er- und 1990er-Jahre."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "In welcher europäischen Stadt gewann Werder Bremen 1992 den Europapokal der Pokalsieger gegen den AS Monaco?",
    "a": [
      "Lissabon",
      "Rotterdam",
      "Paris",
      "Brüssel"
    ],
    "explanation": "Klaus Allofs und Wynton Rufer schossen die Grün-Weißen im Estádio da Luz zum 2:0-Triumph.",
    "exp": "Klaus Allofs und Wynton Rufer schossen die Grün-Weißen im Estádio da Luz zum 2:0-Triumph."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Welcher brasilianische Zauberer trug von 2006 bis 2009 die Nummer 10 bei Werder und schoss ein 60-Meter-Tor gegen Aachen?",
    "a": [
      "Diego",
      "Aílton",
      "Marcelinho",
      "Carlos Alberto"
    ],
    "explanation": "Diego traf im April 2007 aus der eigenen Hälfte in der Nachspielzeit ins verwaiste Aachener Tor.",
    "exp": "Diego traf im April 2007 aus der eigenen Hälfte in der Nachspielzeit ins verwaiste Aachener Tor."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Welcher französische Spielmacher war der geniale Taktgeber und Regisseur des Double-Erfolgs 2004?",
    "a": [
      "Johan Micoud",
      "Ludovic Magnin",
      "Valérien Ismaël",
      "Pekka Lagerblom"
    ],
    "explanation": "Micoud, von Fans und Mitspielern ehrfürchtig 'Le Chef' genannt, dirigierte das Bremer Rauten-Mittelfeld.",
    "exp": "Micoud, von Fans und Mitspielern ehrfürchtig 'Le Chef' genannt, dirigierte das Bremer Rauten-Mittelfeld."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Welches ungewöhnliche Requisit im Hamburger Volksparkstadion verhalf Werder 2009 zum Einzug ins UEFA-Cup-Finale?",
    "a": [
      "Eine zerknüllte Papierkugel",
      "Ein geworfener Schal",
      "Ein Regenschirm der Fans",
      "Ein Plastikbecher"
    ],
    "explanation": "HSV-Verteidiger Gravgaard stolperte über die Papierkugel, Werder bekam Ecke, und Baumann köpfte das 3:1.",
    "exp": "HSV-Verteidiger Gravgaard stolperte über die Papierkugel, Werder bekam Ecke, und Baumann köpfte das 3:1."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Welcher ehemalige Werder-Torwart hält mit 444 Einsätzen den ewigen Rekord für die meisten Bundesligaspiele des Klubs?",
    "a": [
      "Dieter Burdenski",
      "Oliver Reck",
      "Frank Rost",
      "Tim Wiese"
    ],
    "explanation": "'Budde' Burdenski stand zwischen 1972 und 1988 ununterbrochen für Werder zwischen den Pfosten.",
    "exp": "'Budde' Burdenski stand zwischen 1972 und 1988 ununterbrochen für Werder zwischen den Pfosten."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Welcher deutsche Nationalspieler hält mit 101 Treffern den Rekord für die meisten Bundesliga-Tore für Werder Bremen?",
    "a": [
      "Marco Bode",
      "Rudi Völler",
      "Claudio Pizarro",
      "Frank Neubarth"
    ],
    "explanation": "Bode spielte seine gesamte Profikarriere von 1989 bis 2002 nur für Werder und sah dabei nur 10 Gelbe Karten.",
    "exp": "Bode spielte seine gesamte Profikarriere von 1989 bis 2002 nur für Werder und sah dabei nur 10 Gelbe Karten."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Welcher Mittelfeldkämpfer und Vize-Weltmeister 2002 wurde an der Weser liebevoll 'Lutscher' genannt?",
    "a": [
      "Torsten Frings",
      "Jens Jeremies",
      "Frank Baumann",
      "Dieter Eilts"
    ],
    "explanation": "Frings gewann mit Werder 1999 und 2009 den DFB-Pokal und war das kämpferische Herz der Mannschaft.",
    "exp": "Frings gewann mit Werder 1999 und 2009 den DFB-Pokal und war das kämpferische Herz der Mannschaft."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "An welchem Fluss liegt das Weserstadion, sodass Fans sogar per Schiff oder Fähre zum Spiel anreisen können?",
    "a": [
      "Weser",
      "Elbe",
      "Aller",
      "Hunte"
    ],
    "explanation": "Das Weserstadion liegt direkt am Osterdeich und besitzt einen eigenen Fähranleger für Fans.",
    "exp": "Das Weserstadion liegt direkt am Osterdeich und besitzt einen eigenen Fähranleger für Fans."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Wer erzielte 2009 im DFB-Pokal-Finale in Berlin das 1:0-Siegtor für Werder Bremen gegen Bayer Leverkusen?",
    "a": [
      "Mesut Özil",
      "Diego",
      "Claudio Pizarro",
      "Hugo Almeida"
    ],
    "explanation": "Özil zog in der 58. Minute ab und fälschte den Ball unhaltbar für René Adler zur sechsten Pokaltrophäe ein.",
    "exp": "Özil zog in der 58. Minute ab und fälschte den Ball unhaltbar für René Adler zur sechsten Pokaltrophäe ein."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Welcher brasilianische Innenverteidiger war bei Werder für seine gefürchteten Freistoß-Hämmer mit über 120 km/h berühmt?",
    "a": [
      "Naldo",
      "Júlio César",
      "Denílson",
      "Baiano"
    ],
    "explanation": "Naldo bildete jahrelang mit Per Mertesacker das kopfballstärkste Innenverteidiger-Duo der Liga.",
    "exp": "Naldo bildete jahrelang mit Per Mertesacker das kopfballstärkste Innenverteidiger-Duo der Liga."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Welcher Stürmer aus Neuseeland gewann mit Werder die Meisterschaft 1993 und den Europapokal 1992?",
    "a": [
      "Wynton Rufer",
      "Shane Smeltz",
      "Chris Wood",
      "Rory Fallon"
    ],
    "explanation": "'Kiwi' Rufer galt als eiskalter Vollstrecker und verwandelte alle seine Europapokal-Elfmeter traumhaft sicher.",
    "exp": "'Kiwi' Rufer galt als eiskalter Vollstrecker und verwandelte alle seine Europapokal-Elfmeter traumhaft sicher."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Welcher Werder-Stürmer wurde 1983 Bundesliga-Torschützenkönig und später zum Weltmeister 1990?",
    "a": [
      "Rudi Völler",
      "Klaus Allofs",
      "Karl-Heinz Riedle",
      "Uwe Reinders"
    ],
    "explanation": "Völler schoss 1982/83 als Aufsteiger 23 Tore und wurde zum gefeierten Liebling der Kurve.",
    "exp": "Völler schoss 1982/83 als Aufsteiger 23 Tore und wurde zum gefeierten Liebling der Kurve."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Welcher Manager lieferte sich bei Werder Bremen über zwei Jahrzehnte legendäre Sprüche-Duelle mit Uli Hoeneß?",
    "a": [
      "Willi Lemke",
      "Klaus Allofs",
      "Frank Baumann",
      "Jürgen L. Born"
    ],
    "explanation": "Lemke und Hoeneß stritten leidenschaftlich über Finanzen, Transfers und Moral im deutschen Fußball.",
    "exp": "Lemke und Hoeneß stritten leidenschaftlich über Finanzen, Transfers und Moral im deutschen Fußball."
  },
  {
    "cat": "werder_bremen",
    "diff": "easy",
    "q": "Welcher Buchstabe ziert das grüne Vereinswappen in der unverwechselbaren Werder-Raute?",
    "a": [
      "Ein weißes W",
      "Ein goldenes B",
      "Ein weißes S",
      "Ein schwarzes W"
    ],
    "explanation": "Die grün-weiße Werder-Raute mit dem markanten W ist seit den Anfangsjahren das unverwechselbare Vereinssymbol.",
    "exp": "Die grün-weiße Werder-Raute mit dem markanten W ist seit den Anfangsjahren das unverwechselbare Vereinssymbol."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "In welchem Spiel drehte Werder 1993 in der Champions League nach 0:3-Rückstand in Minute 66 die Partie noch zu einem 5:3-Sieg?",
    "a": [
      "Gegen RSC Anderlecht",
      "Gegen Spartak Moskau",
      "Gegen BFC Dynamo",
      "Gegen Olympique Lyon"
    ],
    "explanation": "Bratseth, Hobsch, Bode und Rufer (Doppelpack) schossen das wohl spektakulärste 'Wunder von der Weser'.",
    "exp": "Bratseth, Hobsch, Bode und Rufer (Doppelpack) schossen das wohl spektakulärste 'Wunder von der Weser'."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Wie viele Nordderbys trugen Werder Bremen und der Hamburger SV im legendären Frühjahr 2009 binnen 19 Tagen aus?",
    "a": [
      "Vier Derbys",
      "Drei Derbys",
      "Fünf Derbys",
      "Zwei Derbys"
    ],
    "explanation": "Werder schaltete den HSV im DFB-Pokal-Halbfinale und im UEFA-Cup-Halbfinale aus und siegte auch in der Liga.",
    "exp": "Werder schaltete den HSV im DFB-Pokal-Halbfinale und im UEFA-Cup-Halbfinale aus und siegte auch in der Liga."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher Spieler verschoss am 33. Spieltag 1986 gegen Bayern München in der 89. Minute den Elfmeter zur Meisterschaft?",
    "a": [
      "Michael Kutzop",
      "Norbert Meier",
      "Rudi Völler",
      "Bruno Pezzey"
    ],
    "explanation": "Kutzop traf nur den rechten Pfosten – es war der einzige Strafstoß-Fehlschuss seiner gesamten Bundesligakarriere.",
    "exp": "Kutzop traf nur den rechten Pfosten – es war der einzige Strafstoß-Fehlschuss seiner gesamten Bundesligakarriere."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Wer wurde 1965 zum 1000-jährigen Stadtjubiläum Bremens überraschend erster Bundesliga-Meistertrainer mit Werder?",
    "a": [
      "Willi Multhaup",
      "Georg Knöpfle",
      "Fritz Langner",
      "Hans Tilkowski"
    ],
    "explanation": "'Fischken' Multhaup formte eine geschlossene Defensiv-Einheit um Torwart Bernard und Libero Schütz.",
    "exp": "'Fischken' Multhaup formte eine geschlossene Defensiv-Einheit um Torwart Bernard und Libero Schütz."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Mit welchem historischen Rekord von nur 22 Gegentoren holte Werder 1987/88 die zweite deutsche Meisterschaft?",
    "a": [
      "22 Gegentore",
      "18 Gegentore",
      "26 Gegentore",
      "15 Gegentore"
    ],
    "explanation": "Mit Torwart Oliver Reck und Abwehrchef Rune Bratseth stand die Bremer Defensive bombensicher.",
    "exp": "Mit Torwart Oliver Reck und Abwehrchef Rune Bratseth stand die Bremer Defensive bombensicher."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Wer köpfte 1999 im UEFA-Cup nach einem 0:3 in Lyon im Rückspiel das vorentscheidende 4:0 zum nächsten Weser-Wunder?",
    "a": [
      "Frank Baumann",
      "Claudio Pizarro",
      "Marco Bode",
      "Andreas Herzog"
    ],
    "explanation": "Baumann köpfte in der 80. Minute das erlösende 4:0, nachdem Bode, Herzog und Baumann das Spiel gedreht hatten.",
    "exp": "Baumann köpfte in der 80. Minute das erlösende 4:0, nachdem Bode, Herzog und Baumann das Spiel gedreht hatten."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher kroatische Stürmer feierte nach einer Nierentransplantation ein triumphales Comeback bei Werder Bremen?",
    "a": [
      "Ivan Klasnić",
      "Dado Pršo",
      "Ivica Olić",
      "Boško Balaban"
    ],
    "explanation": "Klasnić spielte mit einer Spenderniere seiner Mutter weiter und schoss Werder erneut in die Champions League.",
    "exp": "Klasnić spielte mit einer Spenderniere seiner Mutter weiter und schoss Werder erneut in die Champions League."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Wer hielt 1999 im DFB-Pokal-Finale im Elfmeterschießen gegen Bayern München den entscheidenden Schuss von Lothar Matthäus?",
    "a": [
      "Frank Rost",
      "Oliver Reck",
      "Dieter Burdenski",
      "Stefan Brasas"
    ],
    "explanation": "Rost trat selbst als Schütze an, traf souverän und lenkte Matthäus' Schuss um den Pfosten.",
    "exp": "Rost trat selbst als Schütze an, traf souverän und lenkte Matthäus' Schuss um den Pfosten."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher norwegische Libero, genannt 'Der Elch', war der elegante Abwehrchef der Meistermannschaften von 1988 und 1993?",
    "a": [
      "Rune Bratseth",
      "Per Egil Ahlsen",
      "Henning Berg",
      "Erik Thorstvedt"
    ],
    "explanation": "Bratseth galt wegen seiner enormen Schnelligkeit und fairen Spielweise als einer der besten Liberos Europas.",
    "exp": "Bratseth galt wegen seiner enormen Schnelligkeit und fairen Spielweise als einer der besten Liberos Europas."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher österreichische Spielmacher verzauberte das Bremer Publikum in den 1990ern mit seinem feinen linken Fuß?",
    "a": [
      "Andreas Herzog",
      "Toni Polster",
      "Heimo Pfeifenberger",
      "Dietmar Kühbauer"
    ],
    "explanation": "'Herzerl' schoss Werder 1993 mit Freistößen und Traumpässen zur dritten deutschen Meisterschaft.",
    "exp": "'Herzerl' schoss Werder 1993 mit Freistößen und Traumpässen zur dritten deutschen Meisterschaft."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Wie endete das dramatische Hinspiel im Europapokal der Landesmeister 1988 bei Spartak Moskau vor dem 6:2-Rückspielsieg?",
    "a": [
      "1:4 für Moskau",
      "0:3 für Moskau",
      "2:5 für Moskau",
      "0:2 für Moskau"
    ],
    "explanation": "Nach dem 1:4 in Moskau glaubte niemand mehr an Werder – im Weserstadion siegte Grün-Weiß nach Verlängerung 6:2.",
    "exp": "Nach dem 1:4 in Moskau glaubte niemand mehr an Werder – im Weserstadion siegte Grün-Weiß nach Verlängerung 6:2."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher deutsche Nationalstürmer holte 2005/06 im Werder-Trikot mit 25 Toren und 14 Assists die Torjägerkanone?",
    "a": [
      "Miroslav Klose",
      "Ivan Klasnić",
      "Nelson Valdez",
      "Aaron Hunt"
    ],
    "explanation": "Klose bildete mit Klasnić das 'K&K-Sturmduo', das ganz Europa mit Angriffsfußball begeisterte.",
    "exp": "Klose bildete mit Klasnić das 'K&K-Sturmduo', das ganz Europa mit Angriffsfußball begeisterte."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher Verein verlor 1988 im Europapokal der Landesmeister mit 0:5 im Weserstadion nach einem 3:0-Hinspielsieg?",
    "a": [
      "BFC Dynamo",
      "1. FC Lokomotive Leipzig",
      "Dynamo Dresden",
      "FC Carl Zeiss Jena"
    ],
    "explanation": "Das 5:0 gegen den DDR-Serienmeister BFC Dynamo zählt zu den größten Triumphen der Bremer Europapokalgeschichte.",
    "exp": "Das 5:0 gegen den DDR-Serienmeister BFC Dynamo zählt zu den größten Triumphen der Bremer Europapokalgeschichte."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher Mittelfeldspieler gewann 1996 mit Deutschland die EM und galt bei Werder als der Inbegriff des kampfstarken 'Grasfressers'?",
    "a": [
      "Dieter Eilts",
      "Miroslav Votava",
      "Thomas Wolter",
      "Marco Bode"
    ],
    "explanation": "Eilts räumte bei der EM 1996 im defensiven Mittelfeld alles ab und wurde ins All-Star-Team gewählt.",
    "exp": "Eilts räumte bei der EM 1996 im defensiven Mittelfeld alles ab und wurde ins All-Star-Team gewählt."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Wer erzielte am 32. Spieltag 2004 im Münchner Olympiastadion die drei Bremer Tore beim 3:1 zur vorzeitigen Meisterschaft?",
    "a": [
      "Klasnić, Micoud und Aílton",
      "Aílton, Charisteas und Ernst",
      "Micoud, Ismaël und Valdez",
      "Klasnić, Borowski und Stalteri"
    ],
    "explanation": "Oliver Kahn patzte gegen Klasnić, Micoud überlupfte ihn elegant, und Aílton schlenzte in den Winkel.",
    "exp": "Oliver Kahn patzte gegen Klasnić, Micoud überlupfte ihn elegant, und Aílton schlenzte in den Winkel."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher Bremer Torwart erzielte im März 2002 im Ligaspiel gegen Hansa Rostock in der 90. Minute den 3:3-Ausgleich per Fuß?",
    "a": [
      "Frank Rost",
      "Oliver Reck",
      "Dieter Burdenski",
      "Pascal Borel"
    ],
    "explanation": "Rost stürmte bei einem Eckball mit nach vorne und jagte den abgewehrten Ball volley ins Netz.",
    "exp": "Rost stürmte bei einem Eckball mit nach vorne und jagte den abgewehrten Ball volley ins Netz."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher Werder-Verteidiger, genannt 'Eisenfuß', absolvierte 420 Bundesligaspiele und wurde 1974 Weltmeister?",
    "a": [
      "Horst-Dieter Höttges",
      "Arnold Schütz",
      "Sepp Piontek",
      "Heinz Steinmann"
    ],
    "explanation": "Höttges war berühmt für seine kompromisslose Zweikampfführung und unbändigen Einsatzwillen.",
    "exp": "Höttges war berühmt für seine kompromisslose Zweikampfführung und unbändigen Einsatzwillen."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher Verein war Werders Gegner beim ersten Titelgewinn der Vereinsgeschichte im DFB-Pokal 1961?",
    "a": [
      "1. FC Kaiserslautern",
      "Karlsruher SC",
      "Fortuna Düsseldorf",
      "Borussia Dortmund"
    ],
    "explanation": "Werder schlug Kaiserslautern im Gelsenkirchener Glückauf-Kampfbahn-Stadion mit 2:0.",
    "exp": "Werder schlug Kaiserslautern im Gelsenkirchener Glückauf-Kampfbahn-Stadion mit 2:0."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher Torhüter parierte im DFB-Pokal-Halbfinale 2009 in Hamburg im Elfmeterschießen drei HSV-Schüsse?",
    "a": [
      "Tim Wiese",
      "Christian Vander",
      "Frank Rost",
      "Andreas Reinke"
    ],
    "explanation": "Wiese parierte gegen Boateng, Olić und Jansen und führte Werder ins Pokalfinale.",
    "exp": "Wiese parierte gegen Boateng, Olić und Jansen und führte Werder ins Pokalfinale."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher Werder-Spieler wurde 2002 als einziger Feldspieler der Bundesliga im WM-Kader Vizeweltmeister, ohne eine Gelbe Karte im Turnier?",
    "a": [
      "Marco Bode",
      "Torsten Frings",
      "Frank Baumann",
      "Miroslav Klose"
    ],
    "explanation": "Bode traf im Gruppenspiel gegen Kamerun in Unterzahl nach Traumpass von Klose zum 1:0.",
    "exp": "Bode traf im Gruppenspiel gegen Kamerun in Unterzahl nach Traumpass von Klose zum 1:0."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher tschechische Abwehrhüne köpfte Werder Bremen 1993 im Pokal gegen Hannover 96 ins Finale?",
    "a": [
      "Miroslav Kadlec",
      "Uwe Harttgen",
      "Dietmar Beiersdorfer",
      "Bernd Hobsch"
    ],
    "explanation": "Beiersdorfer köpfte das goldene Tor und schoss auch im Finale 1994 gegen Essen das Führungstor.",
    "exp": "Beiersdorfer köpfte das goldene Tor und schoss auch im Finale 1994 gegen Essen das Führungstor."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Gegen welches Team verlor Werder Bremen das UEFA-Cup-Finale 2009 in Istanbul unglücklich mit 1:2 nach Verlängerung?",
    "a": [
      "Schachtar Donezk",
      "ZSKA Moskau",
      "Zenit St. Petersburg",
      "Dynamo Kiew"
    ],
    "explanation": "Naldo glich per Freistoß aus, doch Jadson traf in der Verlängerung für die Ukrainer; Spielmacher Diego war gesperrt.",
    "exp": "Naldo glich per Freistoß aus, doch Jadson traf in der Verlängerung für die Ukrainer; Spielmacher Diego war gesperrt."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher Verein verhinderte 1995 am 34. Spieltag durch ein 3:1 gegen Werder die Titelverteidigung der Bremer?",
    "a": [
      "FC Bayern München",
      "Borussia Dortmund",
      "Borussia Mönchengladbach",
      "VfB Stuttgart"
    ],
    "explanation": "Werder verlor im Olympiastadion, sodass Borussia Dortmund an Werder vorbeizog und Meister wurde.",
    "exp": "Werder verlor im Olympiastadion, sodass Borussia Dortmund an Werder vorbeizog und Meister wurde."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher kanadische Rechtsverteidiger war Stammspieler beim Double-Gewinn 2004 und erzielte wichtige Weitschusstore?",
    "a": [
      "Paul Stalteri",
      "Kevin McKenna",
      "Julian de Guzman",
      "Atiba Hutchinson"
    ],
    "explanation": "Stalteri absolvierte in der Meistersaison 33 Partien und bildete mit Ümit Davala die rechte Seite.",
    "exp": "Stalteri absolvierte in der Meistersaison 33 Partien und bildete mit Ümit Davala die rechte Seite."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher Flügelspieler schoss 1982 ein legendäres Tor direkt nach einem Einwurf, weil Bayern-Torwart Pfaff den Ball berührte?",
    "a": [
      "Uwe Reinders",
      "Norbert Meier",
      "Klaus Wunder",
      "Frank Neubarth"
    ],
    "explanation": "Reinders warf den Ball scharf vors Tor – Pfaff berührte ihn mit den Fingerspitzen, weshalb das Tor zählte.",
    "exp": "Reinders warf den Ball scharf vors Tor – Pfaff berührte ihn mit den Fingerspitzen, weshalb das Tor zählte."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher deutsche Nationalspieler wechselte 2006 von Werder Bremen zum FC Arsenal und wurde 2014 Weltmeister?",
    "a": [
      "Per Mertesacker",
      "Mesut Özil",
      "Torsten Frings",
      "Tim Borowski"
    ],
    "explanation": "Mertesacker verbrachte fünf erfolgreiche Jahre an der Weser, ehe er nach London wechselte.",
    "exp": "Mertesacker verbrachte fünf erfolgreiche Jahre an der Weser, ehe er nach London wechselte."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher Spieler erzielte 1899 das allererste Tor in der Vereinsgeschichte des FV Werder gegen Ascotu?",
    "a": [
      "Willy Scharnow",
      "Bernhard Wessel",
      "Heinrich Cordes",
      "Hans Hackmack"
    ],
    "explanation": "Schüler Willy Scharnow traf beim 1:0-Sieg auf dem Stadtwerder und schrieb die erste Zeile Werder-Geschichte.",
    "exp": "Schüler Willy Scharnow traf beim 1:0-Sieg auf dem Stadtwerder und schrieb die erste Zeile Werder-Geschichte."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher Schiedsrichter pfiff 1967 das berüchtigte Bremer Nebelspiel gegen Bayern München trotz Sichtweiten unter 10 Metern an?",
    "a": [
      "Gerd Hennig",
      "Kurt Tschenscher",
      "Horst Herden",
      "Rudolf Kreitlein"
    ],
    "explanation": "Tore fielen unsichtbar im dichten Wesernebel; das Spiel wurde später wiederholt.",
    "exp": "Tore fielen unsichtbar im dichten Wesernebel; das Spiel wurde später wiederholt."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher Werder-Spieler wurde in der Meistersaison 1964/65 mit 11 Toren vereinsinterner Torschützenkönig?",
    "a": [
      "Arnold Schütz",
      "Gerhard Zebrowski",
      "Klaus Matischak",
      "Horst-Dieter Höttges"
    ],
    "explanation": "'Pico' Schütz verwandelte als Mittelfeldspieler eiskalt Elfmeter und Freistöße für die Meister-Elf.",
    "exp": "'Pico' Schütz verwandelte als Mittelfeldspieler eiskalt Elfmeter und Freistöße für die Meister-Elf."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Wer erzielte am 34. Spieltag 1993 in Stuttgart die beiden goldenen Tore zum 3:0-Sieg und der dritten Meisterschaft?",
    "a": [
      "Marco Bode",
      "Andreas Herzog",
      "Wynton Rufer",
      "Bernd Hobsch"
    ],
    "explanation": "Bode traf zweimal im Stuttgarter Neckarstadion, Bernd Hobsch setzte den Schlusspunkt zum Titel.",
    "exp": "Bode traf zweimal im Stuttgarter Neckarstadion, Bernd Hobsch setzte den Schlusspunkt zum Titel."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher brasilianische Mittelfeldspieler erzielte 1998 im UI-Cup-Finale gegen Vojvodina Novi Sad ein wichtiges Tor für Werder?",
    "a": [
      "Ratinho",
      "Aílton",
      "Júnior Baiano",
      "Dirceu"
    ],
    "explanation": "Der kleine Techniker Ratinho spielte 1998 kurzzeitig für Werder und sicherte den Einzug in den UEFA-Cup.",
    "exp": "Der kleine Techniker Ratinho spielte 1998 kurzzeitig für Werder und sicherte den Einzug in den UEFA-Cup."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher ehemalige Werder-Präsident und Kaufmann führte den Verein von 1970 bis 1999 fast drei Jahrzehnte lang?",
    "a": [
      "Franz Böhmert",
      "Klaus-Dieter Fischer",
      "Jürgen L. Born",
      "Alfred Ries"
    ],
    "explanation": "Dr. Franz Böhmert prägte Werders wirtschaftliche Solidität und die Verpflichtung von Otto Rehhagel.",
    "exp": "Dr. Franz Böhmert prägte Werders wirtschaftliche Solidität und die Verpflichtung von Otto Rehhagel."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher jüdische Sportfunktionär war vor und nach dem Zweiten Weltkrieg Werders bedeutendster Präsident?",
    "a": [
      "Alfred Ries",
      "Willy Scharnow",
      "Richard Wolff",
      "Ernst Fischer"
    ],
    "explanation": "Ries überlebte die Verfolgung im Exil und baute Werder nach dem Krieg als Ehrenpräsident wieder auf.",
    "exp": "Ries überlebte die Verfolgung im Exil und baute Werder nach dem Krieg als Ehrenpräsident wieder auf."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Wer erzielte 1991 im DFB-Pokal-Halbfinale bei Eintracht Frankfurt in der 90. Minute das legendäre Siegtor per Kopf?",
    "a": [
      "Rune Bratseth",
      "Wynton Rufer",
      "Klaus Allofs",
      "Günter Hermann"
    ],
    "explanation": "Bratseth schraubte sich nach einer Ecke von Allofs in die Höhe und köpfte Werder ins Berliner Finale.",
    "exp": "Bratseth schraubte sich nach einer Ecke von Allofs in die Höhe und köpfte Werder ins Berliner Finale."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher Werder-Stürmer erzielte 1989 im Europapokal gegen Napoli im San Paolo das zwischenzeitliche 1:1 gegen Maradona?",
    "a": [
      "Frank Neubarth",
      "Karl-Heinz Riedle",
      "Wynton Rufer",
      "Manfred Burgsmüller"
    ],
    "explanation": "Neubarth schockte Neapel vor 70.000 Tifosi; Werder schaltete Maradonas SSC Neapel sensationell mit 5:1 und 3:2 aus.",
    "exp": "Neubarth schockte Neapel vor 70.000 Tifosi; Werder schaltete Maradonas SSC Neapel sensationell mit 5:1 und 3:2 aus."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher Torhüter kassierte in der gesamten Meistersaison 1964/65 in 30 Spielen nur 29 Gegentore für Werder?",
    "a": [
      "Günter Bernard",
      "Klaus Lambertz",
      "Heinrich Kokartis",
      "Horst Wolter"
    ],
    "explanation": "Bernard war der herausragende Rückhalt der ersten Bremer Meisterelf und WM-Teilnehmer 1966.",
    "exp": "Bernard war der herausragende Rückhalt der ersten Bremer Meisterelf und WM-Teilnehmer 1966."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher finnische Innenverteidiger erzielte in der Champions League 2004/05 ein unvergessenes Freistoßtor gegen Valencia?",
    "a": [
      "Pekka Lagerblom",
      "Petri Pasanen",
      "Sami Hyypiä",
      "Hannu Tihinen"
    ],
    "explanation": "Pasanen hämmerte den Ball mit Vollspann ins Netz und sicherte das Weiterkommen im Mestalla.",
    "exp": "Pasanen hämmerte den Ball mit Vollspann ins Netz und sicherte das Weiterkommen im Mestalla."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher Stürmer erzielte im Europapokal der Pokalsieger 1991/92 auf dem Weg zum Titel in 9 Spielen 8 Tore für Werder?",
    "a": [
      "Wynton Rufer",
      "Klaus Allofs",
      "Stefan Kohn",
      "Manfred Bockenfeld"
    ],
    "explanation": "'Kiwi' Rufer wurde überlegener Torschützenkönig des gesamten europäischen Wettbewerbs.",
    "exp": "'Kiwi' Rufer wurde überlegener Torschützenkönig des gesamten europäischen Wettbewerbs."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher Werder-Spieler wurde 1985 für ein Handgemenge mit Bayerns Klaus Augenthaler für 10 Wochen gesperrt?",
    "a": [
      "Rudi Völler",
      "Norbert Meier",
      "Wolfgang Sidka",
      "Benno Möhlmann"
    ],
    "explanation": "Augenthaler foulte Völler schwer, der daraufhin monatelang wegen eines Adduktorenanrisses ausfiel.",
    "exp": "Augenthaler foulte Völler schwer, der daraufhin monatelang wegen eines Adduktorenanrisses ausfiel."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Wer erzielte 1993 im Weserstadion gegen Dynamo Dresden den schnellsten Hattrick der Werder-Bundesligageschichte (7 Minuten)?",
    "a": [
      "Bernd Hobsch",
      "Wynton Rufer",
      "Marco Bode",
      "Andreas Herzog"
    ],
    "explanation": "Neuzugang Hobsch traf zwischen der 35. und 42. Minute dreimal ins Dresdner Tor.",
    "exp": "Neuzugang Hobsch traf zwischen der 35. und 42. Minute dreimal ins Dresdner Tor."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher ungarische Trainer betreute Werder Bremen in den 1920er-Jahren und führte das moderne Flachpassspiel ein?",
    "a": [
      "Franz Konya",
      "Béla Guttmann",
      "Gyula Lóránt",
      "József Kiprich"
    ],
    "explanation": "Konya brachte als erster hauptamtlicher Trainer mitteleuropäische Taktik und Technik an den Osterdeich.",
    "exp": "Konya brachte als erster hauptamtlicher Trainer mitteleuropäische Taktik und Technik an den Osterdeich."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher Verein stieg 1980 gemeinsam mit Werder Bremen in die 2. Bundesliga Nord ab?",
    "a": [
      "Eintracht Braunschweig",
      "Hertha BSC",
      "Rot-Weiss Essen",
      "MSV Duisburg"
    ],
    "explanation": "Werder stieg unter Kuno Klötzer postwendend 1981 mit 68:16 Punkten und 102 Toren wieder auf.",
    "exp": "Werder stieg unter Kuno Klötzer postwendend 1981 mit 68:16 Punkten und 102 Toren wieder auf."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Wer köpfte 2007 im UEFA-Cup-Viertelfinale gegen AZ Alkmaar das vorentscheidende 3:1 für Werder Bremen?",
    "a": [
      "Miroslav Klose",
      "Tim Borowski",
      "Hugo Almeida",
      "Naldo"
    ],
    "explanation": "Nach 0:1-Rückstand drehten Tim Borowski, Klose und Almeida das Spiel vor ausverkaufter Ostkurve.",
    "exp": "Nach 0:1-Rückstand drehten Tim Borowski, Klose und Almeida das Spiel vor ausverkaufter Ostkurve."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher Abwehrspieler verwandelte beim Pokaltriumph 1991 in Berlin gegen den 1. FC Köln den entscheidenden Elfmeter?",
    "a": [
      "Uwe Harttgen",
      "Klaus Allofs",
      "Dieter Eilts",
      "Gunnar Sauer"
    ],
    "explanation": "Nachdem Oliver Reck gehalten hatte, schob der junge Harttgen den Ball an Bodo Illgner vorbei ins Netz.",
    "exp": "Nachdem Oliver Reck gehalten hatte, schob der junge Harttgen den Ball an Bodo Illgner vorbei ins Netz."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher Werder-Spieler wurde 1988 im Europapokalspiel gegen den BFC Dynamo nach einem Nasenbeinbruch mit Maske berühmt?",
    "a": [
      "Gunnar Sauer",
      "Thomas Schaaf",
      "Michael Kutzop",
      "Norbert Meier"
    ],
    "explanation": "Sauer spielte trotz Fraktur mit eigens angefertigter Karbonmaske und sicherte das legendäre 5:0.",
    "exp": "Sauer spielte trotz Fraktur mit eigens angefertigter Karbonmaske und sicherte das legendäre 5:0."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welches Bremer Original und Zeugwart betreute die Werder-Profis über 35 Jahre lang bis ins hohe Alter?",
    "a": [
      "Fritz Mesecke",
      "Hasso Hesse",
      "Klaus Funk",
      "Helmut Fahrenholz"
    ],
    "explanation": "Mesecke kannte alle Geheimnisse der Kabine und prägte Generationen von Werder-Spielern.",
    "exp": "Mesecke kannte alle Geheimnisse der Kabine und prägte Generationen von Werder-Spielern."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher dänische Mittelfeldregisseur spielte in den 1970er-Jahren für Werder und galt als 'König von Bremen'?",
    "a": [
      "Per Røntved",
      "Allan Simonsen",
      "Henning Jensen",
      "Ole Bjørnmose"
    ],
    "explanation": "Røntved war Dänemarks Rekordnationalspieler und Werders genialer Libero zwischen 1972 und 1979.",
    "exp": "Røntved war Dänemarks Rekordnationalspieler und Werders genialer Libero zwischen 1972 und 1979."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Wer erzielte 1999 beim 4:0 gegen Lyon das traumhafte 2:0 per Distanzschuss von der Strafraumgrenze?",
    "a": [
      "Andreas Herzog",
      "Marco Bode",
      "Frank Baumann",
      "Claudio Pizarro"
    ],
    "explanation": "Herzog nagelte den Ball unhaltbar unter die Querlatte und brachte das Weserstadion zum Kochen.",
    "exp": "Herzog nagelte den Ball unhaltbar unter die Querlatte und brachte das Weserstadion zum Kochen."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher Werder-Verteidiger köpfte 2004 im DFB-Pokal-Halbfinale in Gladbach in der 94. Minute das 2:2 vor dem Elfmetersieg?",
    "a": [
      "Valérien Ismaël",
      "Mladen Krstajić",
      "Frank Fahrenhorst",
      "Christian Schulz"
    ],
    "explanation": "Ismaël rettete Werder in extremis; im anschließenden Elfmeterschießen behielt Werder die Nerven.",
    "exp": "Ismaël rettete Werder in extremis; im anschließenden Elfmeterschießen behielt Werder die Nerven."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher junge Stürmer kam 1987 von Blau-Weiß 90 Berlin zu Werder und erzielte in der Meistersaison auf Anhieb 18 Tore?",
    "a": [
      "Karl-Heinz Riedle",
      "Frank Neubarth",
      "Manfred Burgsmüller",
      "Dieter Eilts"
    ],
    "explanation": "'Air' Riedle überzeugte mit enormer Sprungkraft und bildete mit Norbert Meier ein gefürchtetes Duo.",
    "exp": "'Air' Riedle überzeugte mit enormer Sprungkraft und bildete mit Norbert Meier ein gefürchtetes Duo."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Wer erzielte im September 2008 beim sensationellen 5:2-Kantersieg von Werder Bremen bei Bayern München zwei Tore?",
    "a": [
      "Markus Rosenberg",
      "Claudio Pizarro",
      "Mesut Özil",
      "Naldo"
    ],
    "explanation": "Rosenberg traf doppelt, zudem demütigten Özil, Pizarro und Naldo Jürgen Klinsmanns Bayern in München.",
    "exp": "Rosenberg traf doppelt, zudem demütigten Özil, Pizarro und Naldo Jürgen Klinsmanns Bayern in München."
  },
  {
    "cat": "werder_bremen",
    "diff": "mid",
    "q": "Welcher paraguayische Stürmer schoss Werder 2004 im Estadio Mestalla mit einem Doppelpack zum 2:0-Sieg über Valencia?",
    "a": [
      "Nelson Valdez",
      "Ivan Klasnić",
      "Angelos Charisteas",
      "Johan Micoud"
    ],
    "explanation": "Der eingewechselte Valdez konterte Valencia in der Schlussphase zweimal eiskalt aus.",
    "exp": "Der eingewechselte Valdez konterte Valencia in der Schlussphase zweimal eiskalt aus."
  },
  {
    "cat": "werder_bremen",
    "diff": "hard",
    "q": "Welcher Geflügel-Konzern sorgte 2012 als neuer Werder-Hauptsponsor für massive Fanproteste und Unterschriftenaktionen?",
    "a": [
      "Wiesenhof",
      "PHW-Gruppe",
      "Sprehe Feinkost",
      "Stolle Geflügel"
    ],
    "explanation": "Tausende Werder-Fans demonstrierten wegen Massentierhaltung gegen das Sponsoring am Trikot.",
    "exp": "Tausende Werder-Fans demonstrierten wegen Massentierhaltung gegen das Sponsoring am Trikot."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("fussball_werder", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["fussball_werder"] = DATA;
  }
})();
