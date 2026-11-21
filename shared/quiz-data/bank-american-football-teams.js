// Unified quiz bank for "american_football_teams" (75 questions)
(function () {
  const DATA = [
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Auf welchen historischen Industriezweig geht der Name und das Helm-Logo der Pittsburgh Steelers zurück?",
    "a": [
      "Auf die traditionsreiche Stahlindustrie in Pittsburgh ('Steel City')",
      "Auf die historische Kohleförderung im Westen von Pennsylvania",
      "Auf die frühe Lokomotiv- und Eisenbahnfertigung an den drei Flüssen",
      "Auf die ersten Brückenbauunternehmen der amerikanischen Ostküste"
    ],
    "exp": "Pittsburgh war das weltweite Zentrum der Stahlproduktion. Das Logo basiert auf dem 'Steelmark' des American Iron and Steel Institute."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welches historische Großereignis des Jahres 1849 stand Pate für den Namen der San Francisco 49ers?",
    "a": [
      "Der kalifornische Goldrausch (die Goldsucher wurden 'Forty-Niners' genannt)",
      "Die offizielle Ausrufung Kaliforniens zum 49. Bundesstaat der USA",
      "Die Gründung der ersten transkontinentalen Eisenbahngesellschaft 1849",
      "Das verheerende Erdbeben vor der Bucht von San Francisco im Jahr 1849"
    ],
    "exp": "Zehntausende Glücksritter strömten 1849 nach Kalifornien, um Gold zu schürfen. Zu ihren Ehren wählte das Team 1946 den Namen 49ers."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Warum benannte Teambesitzer George Halas sein Chicagoer Team 1922 von 'Staleys' in 'Bears' um?",
    "a": [
      "Weil das Team im Stadion der Baseball 'Cubs' spielte und Footballer größer als Bärenjunge sind",
      "Weil der Schwarzbär das offizielle Wappentier des Bundesstaates Illinois darstellt",
      "Als Hommage an einen berühmten Zirkusbären im damaligen Chicagoer Stadtpark",
      "Weil die gegnerische Abwehr die Trikots als 'Bärenfelle' verspottet hatte"
    ],
    "exp": "Die Chicago Cubs (Bärenjunge) spielten Baseball im Wrigley Field. Halas folgerte: Da Footballspieler größer und kräftiger sind, heißen sie 'Bears'."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Nach welcher berühmten historischen Persönlichkeit des Wilden Westens sind die Buffalo Bills benannt?",
    "a": [
      "Buffalo Bill Cody (Büffeljäger und berühmter Wild-West-Showman)",
      "Billy the Kid (legendärer Gesetzloser und Revolverheld in New Mexico)",
      "Bill Pickett (Erfinder des modernen Rodeos und Stier-Wrestlings)",
      "Bill Donovan (hochdekorierter US-General und Gründer des Geheimdienstes)"
    ],
    "exp": "Ein Fanwettbewerb 1947 brachte den Namen hervor – als Wortspiel mit der Stadt Buffalo und dem berühmten Showman Buffalo Bill Cody."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Auf welches kulturelle Erbe der Bevölkerung in Minnesota bezieht sich der Name der 'Minnesota Vikings'?",
    "a": [
      "Auf die zahlreichen Einwanderer skandinavischer und nordischer Herkunft",
      "Auf die Wikinger-Schiffe, die einst über die Großen Seen gesegelt waren",
      "Auf ein beliebtes Wikinger-Schauspielhaus im Zentrum von Minneapolis",
      "Auf die ersten Pelzhändler aus Norwegen an den Ufern des Mississippi"
    ],
    "exp": "Minnesota und die Nachbarstaaten wurden stark von skandinavischen Siedlern geprägt, weshalb der Wikinger als Symbol perfekt passte."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welches berühmte Werk der Weltliteratur inspirierte den Teamnamen der Baltimore Ravens?",
    "a": [
      "Das Gedicht 'Der Rabe' ('The Raven') von Edgar Allan Poe",
      "Der Roman 'Moby Dick' von Herman Melville über den weißen Wal",
      "Das Schauer-Gedicht 'Der Geistervogel' von Washington Irving",
      "Die viktorianische Erzählung 'Der Rabe am Fluss' von Charles Dickens"
    ],
    "exp": "Edgar Allan Poe lebte, heiratete und starb in Baltimore. Nach dem Umzug aus Cleveland wählten die Fans 1996 begeistert den Namen 'Ravens'."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welcher Vogel diente den Seattle Seahawks bei ihrer Gründung 1975 als Namensgeber?",
    "a": [
      "Der Fischadler (Osprey), der an der rauen Pazifikküste heimisch ist",
      "Der Wanderfalke aus den schneebedeckten Gebirgszügen der Kaskaden",
      "Die Sturmmöwe, die als Wahrzeichen der Puget-Sound-Bucht gilt",
      "Der Weißkopfseeadler aus den dichten Regenwäldern von Washington State"
    ],
    "exp": "'Seahawk' ist der volkstümliche Name für den Fischadler (Osprey). Das Teamlogo wurde zudem von traditionellen Holzschnitzereien der Nordwest-Indianer inspiriert."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Aus welchem historischen Grund wählte das Team aus Boston/Massachusetts 1960 den Namen 'Patriots'?",
    "a": [
      "Wegen der historischen Rolle Neuenglands im Amerikanischen Unabhängigkeitskrieg",
      "Als Dank an die patriotischen Spender der ersten Stadion-Tribünen in Foxborough",
      "Zur Erinnerung an die Verfassungsunterzeichnung im Rathaus von Philadelphia",
      "Als Hommage an das gleichnamige Schlachtschiff der US-Marine im Bostoner Hafen"
    ],
    "exp": "Boston war die Wiege der Amerikanischen Revolution (Boston Tea Party, Paul Revere). Die 'Patriots' trugen anfangs den Revolutionskämpfer 'Pat Patriot' im Logo."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Wodurch ließ sich Bert Bell 1933 bei der Wahl des Namens 'Philadelphia Eagles' inspirieren?",
    "a": [
      "Durch den 'Blue Eagle', das Symbol des 'New Deal' zur Bekämpfung der Wirtschaftskrise",
      "Durch die zahlreichen Seeadler, die über dem Delaware River nisteten",
      "Durch das Wappentier auf der historischen Unabhängigkeitsglocke in Philadelphia",
      "Durch die Kunstfliegerstaffel des US-Militärs auf dem Stützpunkt Willow Grove"
    ],
    "exp": "Franklin D. Roosevelts 'National Recovery Act' nutzte einen blauen Adler als Hoffnungszeichen mitten in der Großen Depression – Bell wählte den Adler als Symbol."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Nach wem sind die Cleveland Browns als eines der ganz wenigen Profiteams direkt benannt?",
    "a": [
      "Nach ihrem legendären ersten Head Coach und Mitgründer Paul Brown",
      "Nach dem berühmten Bürgerrechtler und Freiheitskämpfer John Brown",
      "Nach der charakteristischen braunen Farbe der ersten Lederbälle",
      "Nach dem ehemaligen Gouverneur von Ohio, James Brown"
    ],
    "exp": "Paul Brown revolutionierte das Coaching (Playbooks, Filmanalyse, Funk im Helm) und war in Ohio so verehrt, dass die Fans das Team nach ihm benannten."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Warum heißt das NFL-Team aus New Orleans ausgerechnet 'Saints'?",
    "a": [
      "Das Franchise wurde offiziell an Allerheiligen (All Saints' Day, 1. November) gegründet",
      "Wegen der zahlreichen katholischen Kirchen in der historischen Altstadt",
      "Als Anspielung auf die Heiligsprechung der Stadtgründerin von Louisiana",
      "Weil der erste Teambesitzer ein geweihter Priester der Erzdiözese war"
    ],
    "exp": "Die Franchise-Vergabe erfolgte am 1. November 1966. Die berühmte Jazz-Hymne 'When the Saints Go Marching In' wurde sofort zum Erkennungszeichen."
  },
  {
    "cat": "teams_stadien",
    "diff": "pro",
    "q": "Warum trug das älteste durchgehend bestehende Team der NFL, die Arizona Cardinals, den Namen 'Cardinals'?",
    "a": [
      "Wegen der kardinalsroten Farbe gebrauchter Trikots der Universität von Chicago",
      "Weil der Kardinalvogel der offizielle Staatsvogel des Gründerstaates Illinois war",
      "Weil Teambesitzer Chris O’Brien ein enger Freund des Kardinals von Chicago war",
      "Als Anspielung auf die rote Wüstenlandschaft im späteren Zielort Arizona"
    ],
    "exp": "O’Brien kaufte 1901 verblichene kastanienbraune Trikots der University of Chicago. Als jemand sagte, die seien rot, entgegnete er: 'Das ist Kardinalsrot!'"
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welche maritime Tradition spiegelt sich im Namen und Vereinswappen der Tampa Bay Buccaneers wider?",
    "a": [
      "Die Piraten-Legenden um Jose Gaspar an der Golfküste von Florida",
      "Die historischen spanischen Handelsschiffe im Hafen von Tampa",
      "Die Schwammtaucher-Kolonie griechischer Auswanderer in Tarpon Springs",
      "Die ersten Walfänger, die im 18. Jahrhundert vor Florida kreuzten"
    ],
    "exp": "Tampa feiert jedes Jahr das Gasparilla Pirate Festival zu Ehren des legendären Piraten Gaspar. Die 'Bucs' zelebrieren dieses Erbe mit Totenkopf und Piratenschiff."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welches Team trägt den inoffiziellen Ehrentitel 'America's Team', der durch NFL Films geprägt wurde?",
    "a": [
      "Dallas Cowboys",
      "New England Patriots",
      "Washington Commanders",
      "New York Giants"
    ],
    "exp": "In einem Saisonrückblick von 1978 nannte Sprecher John Facenda die Cowboys erstmals 'America's Team' – wegen ihrer landesweiten Fanbasis und Cheerleader."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welchen Namen trug das heutige Franchise der Tennessee Titans bis zu ihrem Umzug nach Nashville im Jahr 1997?",
    "a": [
      "Houston Oilers (bekannt für ihre hellblauen 'Columbia Blue'-Trikots)",
      "Dallas Texans (spätere Kansas City Chiefs)",
      "Baltimore Colts (vor dem Nacht-und-Nebel-Umzug)",
      "Boston Yanks (früheres Team der NFL-Anfangsjahre)"
    ],
    "exp": "Die Oilers spielten von 1960 bis 1996 in Houston. Nach dem Umzug nach Tennessee spielten sie kurz als Tennessee Oilers, bevor sie sich 1999 in Titans umbenannten."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Warum heißen die Kansas City Chiefs 'Chiefs'?",
    "a": [
      "Zu Ehren des Bürgermeisters H. Roe Bartle, dessen Spitzname 'The Chief' lautete",
      "Nach einem berühmten Stammesführer der indigenen Kansas-Indianer",
      "Weil der Chefkoch des ersten Vereinslokals die Trikots gesponsert hatte",
      "Als Anspielung auf die Feuerwehrmänner ('Fire Chiefs') der Stadt"
    ],
    "exp": "Bürgermeister Bartle ('The Chief') holte das Team 1963 von Dallas nach Kansas City. Aus Dankbarkeit taufte Teambesitzer Lamar Hunt die Mannschaft 'Chiefs'."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welcher Hintergrund führte zur Namensgebung der Miami Dolphins im Jahr 1965?",
    "a": [
      "Ein Fanwettbewerb mit fast 20.000 Einsendungen belohnte den Delfin als kluges Meerestier",
      "Die Rettung eines verletzten Delfins im Hafenbecken von Miami durch den Head Coach",
      "Eine Kooperation mit dem örtlichen Meeresaquarium 'Miami Seaquarium'",
      "Ein berühmter Zeichentrick-Delfin im regionalen Kinderfernsehen Floridas"
    ],
    "exp": "Teambesitzer Joe Robbie wählte aus über 1.000 Namensvorschlägen die Dolphins aus, da der Delfin als schnellstes und schlaustes Tier der Meere galt."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Auf welchen Spitznamen von Nashville als 'Athen des Südens' geht der Name 'Titans' zurück?",
    "a": [
      "Auf die Titanen der griechischen Mythologie passend zum Nachbau des Parthenon in Nashville",
      "Auf die gigantischen Titan-Vorkommen in den Hügeln der Cumberland Mountains",
      "Auf die riesigen Frachtschiffe auf dem Mississippi River vor Memphis",
      "Auf die Titan-Raketen der NASA, die in Huntsville montiert wurden"
    ],
    "exp": "Nashville besitzt den weltweit einzigen originalgetreuen Nachbau des antiken Parthenon. Der Name 'Titans' aus der griechischen Mythologie passte ideal."
  },
  {
    "cat": "teams_stadien",
    "diff": "pro",
    "q": "Warum wählten die New York Jets 1963 ihren Namen nach dem Umzug aus dem Polo Grounds Stadion?",
    "a": [
      "Wegen der Nähe des Shea Stadiums zum LaGuardia Airport und dem Beginn des Jet-Zeitalters",
      "Weil Teambesitzer Sonny Werblin eine Flotte privater Geschäftsreise-Jets besaß",
      "Zur Würdigung der US-Luftwaffe im damaligen Vietnam-Konflikt",
      "Weil die Spieler für ihre 'jet-schnellen' Sprintzeiten auf Kunstrasen berühmt waren"
    ],
    "exp": "Das Team hieß zuvor Titans of New York. Im neuen Shea Stadium flogen ständig Flugzeuge vom nahen LaGuardia Airport über den Rasen – perfekt für 'Jets'."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welche Pferderenn-Tradition spiegelte der Name der Baltimore Colts wider, bevor das Team nach Indianapolis zog?",
    "a": [
      "Die Vollblutzucht in Maryland und das traditionsreiche 'Preakness Stakes'-Rennen",
      "Die Kavallerie-Regimenter des US-Bürgerkriegs in Fort McHenry",
      "Die legendären Wildpferde von der Insel Assateague vor Maryland",
      "Die berühmten Polizeipferde der Hafenpolizei von Baltimore"
    ],
    "exp": "Baltimore ist Austragungsort der Preakness Stakes (zweiter Lauf der Triple Crown). 'Colt' bezeichnet ein junges männliches Rennpferd."
  },
  {
    "cat": "teams_stadien",
    "diff": "pro",
    "q": "Welchen Namen trug das Washingtoner Franchise vor seiner Umbenennung in 'Commanders' in der Übergangszeit 2020–2021?",
    "a": [
      "Washington Football Team",
      "Washington Monuments",
      "Washington Presidents",
      "Washington Redtails"
    ],
    "exp": "Nach Ablegung des alten Namens spielte die Franchise zwei Spielzeiten lang schlicht und puristisch als 'Washington Football Team' mit Nummern auf den Helmen."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Woran erinnert der Teamname der Denver Broncos?",
    "a": [
      "An die ungezähmten Wildpferde (Broncos) der Rocky Mountains und des Wilden Westens",
      "An die ersten Dampflokomotiven der transkontinentalen Gebirgsbahn",
      "An die spanischen Konquistadoren, die das Hochland von Colorado erkundeten",
      "An ein historisches Rodeo-Fest, das seit 1880 in Denver stattfindet"
    ],
    "exp": "Ein Bronco ist ein bockendes Wildpferd. Das Team wählte den Namen 1960 bei seiner Gründung in der AFL als Symbol für Kampfgeist und Ausdauer."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welches Stadion hält mit gemessenen 142,2 Dezibel den Guinness-Weltrekord als lautestes Freiluftstadion der Welt?",
    "a": [
      "GEHA Field at Arrowhead Stadium (Kansas City Chiefs)",
      "Lumen Field (Seattle Seahawks)",
      "Highmark Stadium (Buffalo Bills)",
      "Lincoln Financial Field (Philadelphia Eagles)"
    ],
    "exp": "Am 29. September 2014 erreichte das Arrowhead Stadium gegen die Patriots ohrenbetäubende 142,2 dB – lauter als ein startender Düsenjet!"
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welches ist das älteste noch genutzte Stadion in der gesamten National Football League?",
    "a": [
      "Soldier Field in Chicago (Eröffnung 1924)",
      "Lambeau Field in Green Bay (Eröffnung 1957)",
      "Arrowhead Stadium in Kansas City (Eröffnung 1972)",
      "Hard Rock Stadium in Miami (Eröffnung 1987)"
    ],
    "exp": "Das Soldier Field wurde 1924 als Denkmal für US-Soldaten eröffnet. Die Bears zogen allerdings erst 1971 vom Wrigley Field dorthin um."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Wie wird das gigantische, über 1,3 Milliarden Dollar teure AT&T Stadium der Dallas Cowboys im Volksmund genannt?",
    "a": [
      "'Jerry World' (nach Cowboys-Eigentümer Jerry Jones)",
      "'The Star Dome' (nach dem Cowboys-Stern)",
      "'The Lone Star Palace' (nach dem Bundesstaat Texas)",
      "'Big Tex Arena' (nach der Riesenstatue der State Fair)"
    ],
    "exp": "Jerry Jones ließ den Prachtbau in Arlington mit riesigen Glas-Schiebetoren und einem gewaltigen Videowürfel errichten – daher der Spitzname 'Jerry World'."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Warum ist das Lumen Field der Seattle Seahawks für gegnerische Teams akustisch so gefürchtet?",
    "a": [
      "Die muschelförmigen Freischwinger-Dächer reflektieren den Schall der Fans direkt aufs Feld",
      "Das Stadion verfügt über verdeckte Lautsprecheranlagen unter den gegnerischen Trainerbänken",
      "Der Rasen liegt 50 Meter unter dem Meeresspiegel in einem natürlichen Echotrichter",
      "Die Fans trommeln während gegnerischer Spielzüge auf meterlangen Aluminiumplatten"
    ],
    "exp": "Architekt Paul Allen ließ die Dächer so konstruieren, dass der Lärm der '12s' gebündelt und wie in einem Hohlspiegel auf das Spielfeld zurückgeworfen wird."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welches seismologische Phänomen lösten die Fans der Seahawks 2011 beim 'Beast Quake' Touchdown von Marshawn Lynch aus?",
    "a": [
      "Ihr Jubel erzeugte eine Erschütterung, die von nahegelegenen Erdbeben-Messstationen registriert wurde",
      "Die Tribünen schwankten so stark, dass die Flutlichtmasten für 10 Minuten ausfielen",
      "Der Lärmpegel ließ die Scheiben der umliegenden Bürohochhäuser in Seattle zerspringen",
      "Die Schallwellen brachten den Videowürfel unter dem Stadiondach zum Einsturz"
    ],
    "exp": "Lynch brach neun Tackles gegen die Saints: Der Jubel der Fans ließ ein lokales Seismometer der University of Washington ausschlagen ('Beast Quake')."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welchen Heimvorteil nutzen die Denver Broncos im Empower Field at Mile High traditionell aus?",
    "a": [
      "Das Stadion liegt exakt eine Meile (5.280 Fuß / 1.609 m) über dem Meeresspiegel bei dünnerer Luft",
      "Der Rasen wird im Winter mit warmem Quellwasser aus den Bergen künstlich erwärmt",
      "Die Auswärtskabine verfügt absichtlich über keine Klimaanlage und keine warmen Duschen",
      "Das Stadion ist so ausgerichtet, dass der gegnerische Kicker stets gegen Fallwinde antritt"
    ],
    "exp": "In 1.609 Metern Höhe ermüden Gegner schneller wegen geringerem Sauerstoffgehalt. Zudem fliegen Punts und Kicks durch den geringeren Luftwiderstand spürbar weiter."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welche Rolle spielte der Superdome in New Orleans im August 2005 während des Hurrikans Katrina?",
    "a": [
      "Er diente zehntausenden Menschen als Notunterkunft bei der Überflutung der Stadt",
      "Er wurde als Hauptquartier für die Evakuierung der US-Küstenwache genutzt",
      "Er fungierte als provisorisches Krankenhaus für verletzte NFL-Spieler",
      "Er wurde durch die Sturmflut des Lake Pontchartrain vollständig weggeschwemmt"
    ],
    "exp": "Rund 30.000 Menschen suchten im schwer beschädigten Superdome Schutz vor den Fluten. Das Wiedereröffnungsspiel 2006 gegen Atlanta wurde zum Symbol für den Wiederaufbau."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welches gigantische, rund 5 Milliarden Dollar teure Stadion teilen sich die Los Angeles Rams und Los Angeles Chargers?",
    "a": [
      "SoFi Stadium in Inglewood",
      "Los Angeles Memorial Coliseum",
      "Rose Bowl Stadium in Pasadena",
      "Dignity Health Sports Park"
    ],
    "exp": "Das hochmoderne SoFi Stadium wurde 2020 eröffnet und verfügt über ein lichtdurchlässiges ETFE-Dach und den 360-Grad-Oval-Screen 'The Infinity Screen'."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welchen futuristischen Spitznamen gaben die Fans dem schwarz glänzenden Allegiant Stadium der Las Vegas Raiders?",
    "a": [
      "'The Death Star' (Der Todesstern)",
      "'The Black Diamond'",
      "'The Desert Fortress'",
      "'The Silver Palace'"
    ],
    "exp": "Eigentümer Mark Davis taufte die pechschwarze, domartige Arena direkt am Strip wegen ihrer dunklen Science-Fiction-Optik 'The Death Star'."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welches Stadion ist berüchtigt für den 'Lake-Effect Snow' und extreme Schneestürme im Dezember und Januar?",
    "a": [
      "Highmark Stadium der Buffalo Bills in Orchard Park",
      "FirstEnergy Stadium der Cleveland Browns",
      "Ford Field der Detroit Lions",
      "Gillette Stadium der New England Patriots"
    ],
    "exp": "Kaltluft über dem Lake Erie sorgt in Buffalo regelmäßig für meterhohen Schnee. Fans schaufeln oft gemeinsam vor Spielbeginn die Tribünen frei."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Was befindet sich auf der Tribüne des Raymond James Stadium der Tampa Bay Buccaneers und feuert bei Punkten Kanonensalven ab?",
    "a": [
      "Ein 31 Meter langes, begehbares Piratenschiff aus Stahl und Beton",
      "Ein historischer Leuchtturm mit funktionierendem Drehfunkfeuer",
      "Eine riesige spanische Schatzkiste mit goldenen Konfetti-Kanonen",
      "Ein nachgebautes Fort mit originalen Bürgerkriegs-Mörsern"
    ],
    "exp": "Bei jedem Touchdown und Eintritt in die Red Zone feuern die Kanonen des Piratenschiffs im Nord-Endbereich lautstark Salven ab."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "An welchem markanten Fluss-Zusammenfluss liegt das Acrisure Stadium (ehemals Heinz Field) der Pittsburgh Steelers?",
    "a": [
      "Am Zusammenfluss von Allegheny und Monongahela zum Ohio River ('Three Rivers')",
      "Am Treffpunkt von Mississippi River und Missouri River",
      "An der Mündung des Delaware River in die Chesapeake Bay",
      "Am Zusammenfluss von Schuylkill River und Hudson River"
    ],
    "exp": "Pittsburgh wird als 'Stadt der drei Flüsse' bezeichnet. Das frühere Stadion hieß passenderweise 'Three Rivers Stadium'."
  },
  {
    "cat": "teams_stadien",
    "diff": "pro",
    "q": "Was geschieht mit dem Naturrasen des State Farm Stadiums der Arizona Cardinals unter der Woche?",
    "a": [
      "Die gesamte Rasenwanne wird auf Schienen aus dem Stadion ins Freie in die Wüstensonne gefahren",
      "Der Rasen wird nachts mit speziellen unterirdischen Wärmelampen bestrahlt",
      "Er wird täglich mit aufbereitetem Salzwasser aus dem Golf von Kalifornien besprüht",
      "Er wird in transportable Quadratmeter-Stücke zerlegt und in einem Gewächshaus gelagert"
    ],
    "exp": "Das Stadion in Glendale besitzt ein fahrbares Rasenfeld: Die 8.600 Tonnen schwere Schale rollt per Knopfdruck nach draußen, um Sonne zu tanken."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welches Stadion besitzt das weltgrößte durchsichtige ETFE-Dach und erinnert in seiner Form an ein Wikingerschiff?",
    "a": [
      "U.S. Bank Stadium in Minneapolis (Minnesota Vikings)",
      "Lucas Oil Stadium in Indianapolis (Colts)",
      "Mercedes-Benz Stadium in Atlanta (Falcons)",
      "NRG Stadium in Houston (Texans)"
    ],
    "exp": "Das U.S. Bank Stadium trotzt Minnesotas arktischen Wintern mit 5 riesigen schwenkbaren Glastüren und einem lichtdurchfluteten Dach, das an Wikingerschiffe erinnert."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welches Stadion zeichnet sich durch ein einzigartiges, kamera-blendenartiges Faltdach ('Petal Roof') aus?",
    "a": [
      "Mercedes-Benz Stadium in Atlanta (Atlanta Falcons)",
      "Caesars Superdome in New Orleans",
      "Hard Rock Stadium in Miami Gardens",
      "Ford Field in Detroit"
    ],
    "exp": "Das Dach in Atlanta besteht aus 8 dreieckigen Lamellen, die sich wie die Blende einer Fotokamera synchron öffnen und schließen."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "In welchem Bundesstaat tragen die New York Giants und New York Jets ihre Heimspiele im MetLife Stadium tatsächlich aus?",
    "a": [
      "In New Jersey (in East Rutherford)",
      "In New York (im Stadtteil Queens)",
      "In Connecticut (in Stamford)",
      "In Pennsylvania (in Bethlehem)"
    ],
    "exp": "Obwohl beide Teams 'New York' im Namen führen, liegt ihr gemeinsames Stadion in den Meadowlands von East Rutherford im Bundesstaat New Jersey."
  },
  {
    "cat": "teams_stadien",
    "diff": "pro",
    "q": "Welches NFL-Team spielt als einziges Franchise seine Heimspiele tatsächlich innerhalb des Bundesstaates New York?",
    "a": [
      "Buffalo Bills (in Orchard Park, New York)",
      "New York Giants (in Manhattan)",
      "New York Jets (auf Long Island)",
      "Albany Empire (im State Capitol)"
    ],
    "exp": "Bills-Fans betonen dies stolz mit dem Slogan 'The only real New York team', da Giants und Jets im Nachbarstaat New Jersey spielen."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Wie viele Teams in der NFL spielen heute in komplett überdachten Hallenstadien (Domes oder feste Dächer)?",
    "a": [
      "8 Teams (Vikings, Lions, Saints, Falcons, Texans, Colts, Cowboys, Raiders, Rams/Chargers teils mit Schiebedach)",
      "Nur 2 Teams (Saints und Lions)",
      "Genau 16 Teams (exakt die Hälfte der Liga)",
      "Kein einziges Team spielt mehr in einer geschlossenen Halle"
    ],
    "exp": "Rund ein Viertel der Liga spielt unter schützenden Kuppeln oder Schiebedächern, um Wetterunbilden wie Kälte, Regen oder sengende Wüstenhitze auszuschließen."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welcher riesige See liegt direkt neben dem Cleveland Browns Stadium und beschert den Spielern unberechenbare Windböen?",
    "a": [
      "Lake Erie",
      "Lake Michigan",
      "Lake Ontario",
      "Lake Superior"
    ],
    "exp": "Das Stadion liegt direkt am Ufer des Lake Erie. Die unberechenbaren Winde vom See machen Field Goals und Punts dort zu einer echten Lotterie."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Warum installierten die Miami Dolphins bei der Modernisierung des Hard Rock Stadiums ein riesiges Vordach?",
    "a": [
      "Um 90 % der Zuschauerplätze vor der sengenden Sonne und tropischen Regengüssen Floridas zu schützen",
      "Weil die NFL offene Stadien in der Nähe von Flughäfen gesetzlich verboten hatte",
      "Um den Lärmpegel der Auswärtsfans gezielt ins Stadioninnere zu schlucken",
      "Um Schneeablagerungen im sonnigen Süden der USA von vornherein auszuschließen"
    ],
    "exp": "Das Vordach beschattet fast alle Zuschauerränge vor der Tropensonne, lässt aber die Mitte offen, sodass der Naturrasen perfekt im Sonnenlicht wachsen kann."
  },
  {
    "cat": "teams_stadien",
    "diff": "pro",
    "q": "Was ist das Besondere am Naturrasen im Heinz Field / Acrisure Stadium der Pittsburgh Steelers?",
    "a": [
      "Es handelt sich um einen mit Kunstrasenfasern verstärkten Hybridrasen ('DDGrassMaster')",
      "Der Rasen wird wöchentlich mit gelber Lebensmittelfarbe nachgetönt",
      "Er wird vollständig ohne Erde direkt auf einer Schicht aus Stahlschlacke angebaut",
      "Es ist die einzige Rasenfläche der NFL, die nie gemäht werden muss"
    ],
    "exp": "Um dem harten Football-Herbst und Highschool-Spielen standzuhalten, setzt Pittsburgh auf einen robusten, faserverstärkten Hybridrasen."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welches Stadion war der Schauplatz für den legendären 'Music City Miracle' Spielzug im Januar 2000?",
    "a": [
      "Nissan Stadium (damals Adelphia Coliseum) der Tennessee Titans",
      "Astrodome in Houston (Texas)",
      "Vanderbilt Stadium in Nashville",
      "Liberty Bowl Memorial Stadium in Memphis"
    ],
    "exp": "Dyson trug einen Lateral-Pass von Frank Wycheck über 75 Yards zum Touchdown gegen Buffalo – das legendärste Play in der Geschichte des Stadions in Nashville."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Was war der 'Astrodome' in Houston, der 1965 eröffnet wurde?",
    "a": [
      "Das weltweit erste voll überdachte, klimatisierte Mehrzweck-Kuppelstadion ('8. Weltwunder')",
      "Eine Startrampe der NASA für suborbitale Forschungsraketen bei Footballspielen",
      "Das erste Footballstadion mit ausfahrbaren hydraulischen Zuschauertribünen",
      "Eine unterirdische Trainingsanlage der Houston Oilers für schlechtes Wetter"
    ],
    "exp": "Der Astrodome revolutionierte die Sportwelt. Weil der Naturrasen ohne Sonnenlicht einging, wurde dort auch der erste Kunstrasen ('AstroTurf') erfunden."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Was versteht man in der US-Sportkultur unter dem Phänomen des 'Tailgating' vor einem Spiel?",
    "a": [
      "Stundenlanges Grillen, Feiern und Beisammensein auf den Stadionparkplätzen an der Heckklappe",
      "Ein Fangwettbewerb für heruntergefallene Football-Bälle hinter den Torpfosten",
      "Das gemeinsame Einsingen von Fanhymnen in den U-Bahnen auf dem Weg zum Spiel",
      "Eine offizielle Parade der Spielerfrauen über das Spielfeld vor Spielbeginn"
    ],
    "exp": "Tailgating (von der Heckklappe / Tailgate des Pickups) ist fester Kult: Fans reisen oft 5 Stunden vor Kickoff an, werfen Smoker an und trinken Bier."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welches gelbe Fanutensil schwenken die Anhänger der Pittsburgh Steelers bei jedem Spiel ('The Terrible Towel')?",
    "a": [
      "Ein gelbes Frotteetuch mit schwarzer Aufschrift",
      "Eine überdimensionale gelbe Schaumstoffhand mit Zeigefinger",
      "Eine gelbe Plastikratsche aus den örtlichen Stahlwerken",
      "Eine gelbe Piratenflagge mit gekreuzten Bergmannshämmern"
    ],
    "exp": "Radiomoderator Myron Cope erfand das Tuch 1975. Alle Erlöse aus dem Verkauf des 'Terrible Towel' gehen an die Schule für geistig behinderte Kinder 'Allegheny Valley School'."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welches Ritual zelebrieren die Fans der Minnesota Vikings mit dem gigantischen 'Gjallarhorn'?",
    "a": [
      "Den rhythmischen 'Skol!'-Chant mit über den Kopf geklatschten Händen",
      "Den gemeinsamen 'Haka'-Kriegstanz auf den Stehplatztribünen",
      "Das Verbrennen einer gegnerischen Teamflagge im Mittelkreis",
      "Ein lautes Pfeifkonzert, das an arktische Blizzard-Stürme erinnert"
    ],
    "exp": "Inspiriert vom isländischen Fanjubel ertönt das riesige Wikingerhorn und zehntausende Fans rufen synchron 'Skol!' unter dumpfem Trommelschlag."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Für welche skurrile Tradition ist die berühmt-berüchtigte 'Bills Mafia' in Buffalo bekannt?",
    "a": [
      "Sie springen beim Parkplatz-Tailgating von Autos durch brennende oder normale Klapptische",
      "Sie werfen vor jedem vierten Versuch getrocknete Maiskolben auf das Spielfeld",
      "Sie trinken Bier ausschließlich aus den Helmen der gegnerischen Maskottchen",
      "Sie verkleiden sich geschlossen als italienische Mafia-Bosse der 1920er Jahre"
    ],
    "exp": "Das Zertrümmern von Klapptischen ('Folding Tables') durch wagemutige Sprünge ist legendär. Gleichzeitig spendet die 'Bills Mafia' millionenfach für wohltätige Zwecke."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Wie wird der lautstarke Fanblock in der Ostkurve der Cleveland Browns genannt?",
    "a": [
      "'The Dawg Pound'",
      "'The Steel Cage'",
      "'The Brown Kennel'",
      "'The Barking Section'"
    ],
    "exp": "Cornerback Hanford Dixon nannte die Defense 1985 'Dawgs'. Fans in der Ostkurve zogen Hundemasken an, bellten Gegenspieler an und warfen Knochen."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welche gefürchtete Fankurve mit Nieten, Totenkopfmasken und Kriegsbemalung machten die Fans der Raiders berühmt?",
    "a": [
      "'The Black Hole'",
      "'The Pirate Bay'",
      "'The Raider Pit'",
      "'The Dark Dungeon'"
    ],
    "exp": "In Oakland war 'The Black Hole' in der Südkurve der wildeste Fanblock der NFL: Dystopische Mad-Max-Kostüme, Totenköpfe und martialisches Auftreten."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welchen berühmten Schlachtruf rufen die Fans der New Orleans Saints im Chor?",
    "a": [
      "'Who dat? Who dat? Who dat say dey gonna beat dem Saints?'",
      "'Geaux Saints! Geaux Big or Geaux Home!'",
      "'Bourbon Street Pride, take them for a ride!'",
      "'Saint Peter, Saint Paul, we want it all!'"
    ],
    "exp": "Der 'Who Dat?'-Chant hat seine Wurzeln im Vaudeville und Minstrel-Gesang des späten 19. Jahrhunderts und ist die offizielle Fan-DNA von New Orleans."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welche Vereinshymne schmettern die Fans der Philadelphia Eagles nach jedem Touchdown?",
    "a": [
      "'Fly, Eagles, Fly, on the road to victory!'",
      "'Rocky's Theme (Gonna Fly Now)'",
      "'Brotherly Love, Green from Above!'",
      "'Philadelphia Freedom (Elton John Cover)'"
    ],
    "exp": "'Fly, Eagles, Fly' wird nach jedem Touchdown im Lincoln Financial Field von über 65.000 Kehlen gesungen, gefolgt vom Buchstabieren 'E-A-G-L-E-S - EAGLES!'"
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welche Trikotnummer vergibt das Team der Seattle Seahawks zu Ehren seiner Fans nicht mehr?",
    "a": [
      "Die Nummer 12 ('The 12th Man')",
      "Die Nummer 00 ('The Crowd')",
      "Die Nummer 1 ('The First Fan')",
      "Die Nummer 100 ('Century Fans')"
    ],
    "exp": "Die Seahawks schützten die Nummer 12 ('12th Man' bzw. 'The 12s') und zogen das Trikot 1984 offiziell zurück; vor jedem Spiel hisst ein Prominenter die 12er-Flagge."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welcher Zwischenfall mit einem Weihnachtsmann im Jahr 1968 brachte den Fans der Philadelphia Eagles ihren berüchtigten Ruf ein?",
    "a": [
      "Sie bewarfen einen verkaterten Ersatz-Weihnachtsmann mit Schneebällen",
      "Sie entführten den Schlitten des Weihnachtsmanns in die Umkleidekabine",
      "Sie stimmten im Chor ein Trauerlied statt 'Jingle Bells' an",
      "Sie stahlen den Geschenkesack und verteilten den Inhalt auf dem Rasen"
    ],
    "exp": "Bei einem frustrierenden Spiel im Schneematsch sprang ein dünner Fan im Nikolauskostüm ein: Die frustrierten Eagles-Fans deckten ihn mit Schneebällen ein."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welches ist die älteste und traditionsreichste Rivalität der gesamten NFL-Geschichte mit über 200 Duellen?",
    "a": [
      "Green Bay Packers gegen Chicago Bears (seit 1921)",
      "Pittsburgh Steelers gegen Baltimore Ravens (seit 1996)",
      "Dallas Cowboys gegen Philadelphia Eagles (seit 1960)",
      "New York Giants gegen New York Jets (seit 1970)"
    ],
    "exp": "Packers gegen Bears ist der Inbegriff des 'Black and Blue Football'. Seit dem ersten Treffen 1921 kämpfen beide um die Krone im Mittleren Westen."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welche Fehde in der AFC North gilt als die physisch härteste und giftigste Rivalität der modernen NFL?",
    "a": [
      "Pittsburgh Steelers gegen Baltimore Ravens",
      "Cleveland Browns gegen Cincinnati Bengals",
      "Indianapolis Colts gegen Tennessee Titans",
      "Miami Dolphins gegen Buffalo Bills"
    ],
    "exp": "Harte Hits, Ray Lewis gegen Hines Ward, Troy Polamalu gegen Joe Flacco: Steelers vs. Ravens definierte über Jahrzehnte knochenharte Defensiv-Schlachten."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Was feierten die Fans der Miami Dolphins jahrzehntelang traditionell, sobald das letzte ungeschlagene Team einer NFL-Saison verlor?",
    "a": [
      "Sie stießen mit Champagner auf das Fortbestehen ihrer 1972er 'Perfect Season' an",
      "Sie warfen lebende Fische von den Brücken von Key Biscayne ins Meer",
      "Sie hissten eine schwarze Piratenflagge auf dem Dach des Stadions",
      "Sie verteilten kostenlose Dauerkarten an die ältesten Einwohner Floridas"
    ],
    "exp": "Der Legende nach öffneten Coach Don Shula und Spieler der 1972er Dolphins jedes Jahr Champagnerflaschen, sobald das letzte Team die erste Niederlage kassierte."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welches Team trägt als einziges in der NFL überhaupt kein Logo auf seinen Spielhelmen?",
    "a": [
      "Cleveland Browns (schlichter oranger Helm mit weiß-braunem Streifen)",
      "Pittsburgh Steelers (nur eine Seite bedruckt)",
      "Washington Commanders (reine Trikotnummern)",
      "Cincinnati Bengals (nur gestreifte Helme ohne Schrift)"
    ],
    "exp": "Die Cleveland Browns tragen traditionell einen einfarbig orangefarbenen Helm ganz ohne Wappen oder Logo – einzigartig im US-Profisport."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Warum tragen die Pittsburgh Steelers ihr berühmtes 'Steelmark'-Logo nur auf der rechten Seite des Helms?",
    "a": [
      "1962 wollte man erst testen, wie das Logo auf den Helmen wirkt – und behielt es aus Tradition bei",
      "Weil die linke Helmseite laut Stadtsatzung für den Bergbauverband reserviert war",
      "Weil der Quarterback bei Spielzügen nur von rechts gefilmt werden durfte",
      "Als Tribut an die Einbahnstraßenregelung im historischen Zentrum von Pittsburgh"
    ],
    "exp": "Die Steelers wussten 1962 nicht, ob das Logo auf den damals goldenen Helmen gut aussieht. Nach einer Erfolgssaison wurde die Asymmetrie zum ewigen Markenzeichen."
  },
  {
    "cat": "teams_stadien",
    "diff": "pro",
    "q": "Wer bemalte 1948 als erster Spieler der Footballgeschichte Helme mit einem Logo (Widderhörner der Rams)?",
    "a": [
      "Fred Gehrke (Halfback und studierter Kunstmaler)",
      "Curly Lambeau (Coach und Trikotgestalter)",
      "Jim Thorpe (Allround-Athlet und Präsident)",
      "Red Grange (der 'Galloping Ghost')"
    ],
    "exp": "Gehrke malte für einen Dollar pro Helm Widderhörner auf die Lederhelme der Los Angeles Rams. Damit erfand er die moderne Helm-Grafik im Football."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Warum spielen die Dallas Cowboys bei Heimspielen traditionell in weißen Trikots statt in ihren blauen Vereinsfarben?",
    "a": [
      "Aus Aberglauben vor einem 'Fluch' der blauen Trikots und zur Entlastung bei Texas-Hitze",
      "Weil die NFL weiße Trikots für texanische Teams gesetzlich vorgeschrieben hatte",
      "Weil Teambesitzer Clint Murchison weiße Trikots im Fernsehen schöner fand",
      "Weil man den gegnerischen Fans ihre farbigen Heimtrikots präsentieren wollte"
    ],
    "exp": "Texanische Sonne und eine Serie bitterer Niederlagen in Blau machten das blaue Jersey als 'Jinx' berüchtigt. Dallas spielt fast immer in Weiß."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welches legendäre Trikot-Design der Tampa Bay Buccaneers aus den 70ern wird von Fans liebevoll als 'Creamsicle' bezeichnet?",
    "a": [
      "Die hellorangefarbenen Trikots mit dem Piraten 'Buccaneer Bruce' mit Dolch im Mund",
      "Die neongrünen Auswärtstrikots mit Palmenmuster an den Ärmeln",
      "Die komplett schwarzen Piratenuniformen mit silbernen Totenköpfen",
      "Die karibisch-türkisen Trikots mit orangefarbenen Blocknummern"
    ],
    "exp": "Das pastellfarbene Orange ('Creamsicle') galt lange als Verlierer-Look, erlebte aber als Kult-Throwback ein gefeiertes Comeback in Tampa."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welches Trikotgrün der Philadelphia Eagles aus der Randall-Cunningham-Ära genießt bis heute gigantischen Kultstatus?",
    "a": [
      "'Kelly Green' (ein sattes, helleres Waldgrün)",
      "'Midnight Green' (das spätere dunkle Blaugrün)",
      "'Lime Green' (ein grelles Neongrün)",
      "'Hunter Green' (ein mattes Militärgrün)"
    ],
    "exp": "'Kelly Green' war von 1935 bis 1995 die Farbe der Eagles. Die Rückkehr der Kelly-Green-Trikots als Alternativuniform löste einen wahren Kaufrausch aus."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welches Tier ist das offizielle lebende Maskottchen der Baltimore Ravens und fliegt vor Spielen durchs Stadion?",
    "a": [
      "Ein echter trainierter Rabe namens 'Rise' (oder 'Conquer')",
      "Ein Weißkopfseeadler namens 'Warbird'",
      "Ein dressierter Jagdfalke namens 'Shadow'",
      "Ein schwarzer Uhu namens 'Nightflight'"
    ],
    "exp": "Neben den Plüschmaskottchen Poe besitzen die Ravens afrikanische Raben, die bei Heimspielen über die Köpfe der Fans gleiten."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Was zeichnet die Trikots der Cincinnati Bengals seit 1981 unverwechselbar aus?",
    "a": [
      "Das Tigermuster aus schwarzen und orangenen Streifen auf Helm und Trikotschultern",
      "Eine aufgedruckte Tigerkralle, die scheinbar das Trikot zerreißt",
      "Ein echter Pelzbesatz am Kragen zur Erinnerung an sibirische Tiger",
      "Reflektierende orangefarbene Streifen, die im Flutlicht leuchten"
    ],
    "exp": "Paul Brown führte die Tigerstreifen 1981 ein. Sowohl der Helm als auch die Schulterpartien sind seither unverkennbar gestreift."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welche berüchtigte Tradition pflegten die Fans der New York Jets mit dem Fan-Anführer 'Fireman Ed'?",
    "a": [
      "Er stieg im Feuerwehrhelm auf die Schultern anderer Fans und dirigierte den 'J-E-T-S!'-Chant",
      "Er spritzte nach jedem Touchdown mit einem Feuerwehrschlauch Wasser in die Menge",
      "Er zündete bei Frost ein kleines Lagerfeuer auf dem Stadionparkplatz an",
      "Er läutete eine historische Messing-Feuerwehrglocke bei jedem dritten Versuch"
    ],
    "exp": "Ed Anzalone ('Fireman Ed'), ein echter New Yorker Feuerwehrmann, feuerte mit seinem legendären 'J-E-T-S! Jets! Jets! Jets!' das ganze Stadion an."
  },
  {
    "cat": "teams_stadien",
    "diff": "pro",
    "q": "Welche Franchise hält den Rekord für die längste Playoff-Durststrecke der NFL-Historie (26 Jahre ohne Postseason-Sieg von 1991 bis 2024)?",
    "a": [
      "Detroit Lions",
      "Cleveland Browns",
      "New York Jets",
      "Arizona Cardinals"
    ],
    "exp": "Von Januar 1992 bis Januar 2024 warteten die leidtragenden Lions-Fans auf einen Playoff-Sieg – bis Jared Goff die Durststrecke gegen die Rams beendete."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welcher Bundesstaat beheimatet gleich drei aktive NFL-Teams?",
    "a": [
      "Florida (Dolphins, Buccaneers, Jaguars)",
      "Texas (Cowboys, Texans, Oilers)",
      "Ohio (Browns, Bengals, Buckeyes)",
      "Pennsylvania (Steelers, Eagles, Miners)"
    ],
    "exp": "Sowohl Florida (Miami, Tampa Bay, Jacksonville) als auch Kalifornien (49ers, Rams, Chargers) stellen jeweils drei aktive NFL-Franchises."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welches Ritual führen Spieler der Arizona Cardinals bei Touchdowns am Spielfeldrand auf, wenn sie die Wüste ehren?",
    "a": [
      "Sie posieren in der starren Kaktus-Pose mit angewinkelten Armen",
      "Sie schütten echten Wüstensand aus ihren Schuhen auf den Rasen",
      "Sie simulieren das Kriechen einer giftigen Klapperschlange im Gras",
      "Sie trinken im Kreis Kakteensaft aus einer gemeinsamen Feldflasche"
    ],
    "exp": "Die Kaktus-Pose mit beiden rechtwinklig nach oben gehaltenen Armen ist eine augenzwinkernde Verbeugung vor den Saguaros der Sonora-Wüste."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Aus welchem geschäftlichen Grund wählte Hotelier Barron Hilton 1960 den Namen 'Chargers' für sein Team?",
    "a": [
      "Wegen der Werbewirkung für seine Carte-Blanche-Kreditkarte und des Fanrufs 'Charge!'",
      "Weil die Mannschaftsbusse als erste mit Elektrobatterien betrieben wurden",
      "Als Tribut an die berittenen Kavallerie-Truppen des mexikanisch-amerikanischen Krieges",
      "Weil die Spieler für blitzschnelle Tackles mit Vollgas bekannt sein sollten"
    ],
    "exp": "Hilton mochte den Trompeten-Fanruf 'Charge!' und nutzte die Namensähnlichkeit geschickt für seine neue Carte-Blanche-Kreditkarte ('Charge Card')."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welches NFL-Team trägt seit 1934 ununterbrochen jedes Jahr am US-Feiertag Thanksgiving ein Heimspiel aus?",
    "a": [
      "Detroit Lions",
      "Chicago Bears",
      "Cleveland Browns",
      "Philadelphia Eagles"
    ],
    "exp": "Eigentümer George A. Richards erfand das Thanksgiving-Spiel 1934, um Fans ins Stadion zu locken. Seitdem ist das Lions-Spiel ein fester Feiertagskult."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Welches zweite Team sicherte sich 1966 das dauerhafte Recht auf ein jährliches Thanksgiving-Heimspiel?",
    "a": [
      "Dallas Cowboys",
      "New York Giants",
      "Pittsburgh Steelers",
      "San Francisco 49ers"
    ],
    "exp": "Tex Schramm meldete die Cowboys 1966 für das Feiertagsspiel an, als niemand sonst wollte. Seither spielen Lions und Cowboys jedes Thanksgiving zu Hause."
  },
  {
    "cat": "teams_stadien",
    "diff": "mid",
    "q": "Welcher legendäre Touchdown-Tanz von Running Back Jamal Anderson wurde 1998 zum Kult der Atlanta Falcons?",
    "a": [
      "The 'Dirty Bird' (mit schlagenden Ellenbogen-Flügeln und wiegendem Körper)",
      "The 'Falcon Glide' (mit waagerecht ausgebreiteten Armen im Gleitflug)",
      "The 'Georgia Shuffle' (ein schneller Stepptanz an den Torstangen)",
      "The 'Peach Drop' (ein vorgetäuschter Fallwurf rückwärts in die Polster)"
    ],
    "exp": "Anderson erfand den 'Dirty Bird': Mit gebeugten Knien und schlagenden Armen imitierte er einen flatternden Vogel – ganz Atlanta tanzte mit bis zum Super Bowl."
  },
  {
    "cat": "teams_stadien",
    "diff": "easy",
    "q": "Wofür stehen die leuchtenden Vereinsfarben Aqua und Orange der Miami Dolphins symbolisch?",
    "a": [
      "Für das türkisfarbene Meerwasser und die strahlenden Sonnenuntergänge Floridas",
      "Für die tropischen Papageien und die Korallenriffe der Florida Keys",
      "Für die historische Orangen-Ernte und das Quellwasser der Everglades",
      "Für die Warnbojen und Leuchttürme entlang des Atlantischen Ozeans"
    ],
    "exp": "Die Farbkombination spiegelt das tropische Lebensgefühl Südfloridas wider: Aqua steht für den Atlantischen Ozean, Orange für die Sonne Floridas."
  }
];

  DATA.forEach(q => {
    if (!q.explanation && q.exp) q.explanation = q.exp;
    if (!q.exp && q.explanation) q.exp = q.explanation;
  });

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("american_football_teams", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["american_football_teams"] = DATA;
  }
})();
