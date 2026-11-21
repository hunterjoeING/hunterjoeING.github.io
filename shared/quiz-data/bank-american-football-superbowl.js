// Unified quiz bank for "american_football_superbowl" (75 questions)
(function () {
  const DATA = [
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "In welchem US-Bundesstaat wurde die NFL im Jahr 1920 ursprünglich als 'American Professional Football Association' gegründet?",
    "a": [
      "In Canton, Ohio (in einem Autohaus)",
      "In Pittsburgh, Pennsylvania (in einer Stahlgießerei)",
      "In Chicago, Illinois (in einem Hotel am Lake Michigan)",
      "In New York City, New York (im Madison Square Garden)"
    ],
    "exp": "Die Liga wurde am 17. September 1920 im Autohaus von Ralph Hay in Canton (Ohio) gegründet. Deshalb steht dort die Pro Football Hall of Fame."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Wer war der legendäre Allround-Athlet und Ureinwohner Amerikas, der 1920 zum ersten Präsidenten der NFL ernannt wurde?",
    "a": [
      "Jim Thorpe",
      "Red Grange",
      "Curly Lambeau",
      "George Halas"
    ],
    "exp": "Olympiasieger Jim Thorpe war der bekannteste Sportler seiner Zeit und verlieh der neugegründeten Liga sofort nationale Glaubwürdigkeit."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "In welchem Jahr benannte sich die 'American Professional Football Association' offiziell in 'National Football League' (NFL) um?",
    "a": [
      "1922",
      "1925",
      "1930",
      "1933"
    ],
    "exp": "Nach den ersten beiden Anfangsjahren nahm die Liga im Juni 1922 ihren bis heute gültigen Namen 'National Football League' an."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Welche Konkurrenzliga gründete Lamar Hunt im Jahr 1960, die schließlich zur Entstehung des Super Bowls führte?",
    "a": [
      "AFL (American Football League)",
      "USFL (United States Football League)",
      "WFL (World Football League)",
      "XFL (Extreme Football League)"
    ],
    "exp": "Hunt gründete die AFL, nachdem die NFL ihm ein Expansion-Team verwehrt hatte. Die AFL revolutionierte das Passspiel und das TV-Business."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Wann einigten sich die rivalisierenden Ligen NFL und AFL offiziell auf ihren historischen Zusammenschluss (Merger)?",
    "a": [
      "1966 (vollständig umgesetzt zur Saison 1970)",
      "1960 (vollständig umgesetzt zur Saison 1963)",
      "1972 (vollständig umgesetzt zur Saison 1975)",
      "1978 (vollständig umgesetzt zur Saison 1980)"
    ],
    "exp": "Der Merger wurde 1966 vereinbart, woraufhin ab Januar 1967 das erste gemeinsame Endspiel ausgetragen und 1970 die Ligen fusioniert wurden."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welcher renommierte Juwelier stellt die berühmte Vince Lombardi Trophy für den Super-Bowl-Sieger seit 1967 in Handarbeit her?",
    "a": [
      "Tiffany & Co.",
      "Cartier",
      "Bulgari",
      "Chopard"
    ],
    "exp": "Tiffany & Co. fertigt den Pokal aus 925er Sterlingsilber. Oscar Riedener zeichnete den ersten Entwurf 1966 spontan auf eine Papierserviette."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Nach wem ist die begehrte Meistertrophäe des Super Bowls benannt?",
    "a": [
      "Vince Lombardi",
      "George Halas",
      "Don Shula",
      "Pete Rozelle"
    ],
    "exp": "Nach dem Krebstod von Trainerlegende Vince Lombardi im Jahr 1970 wurde die Trophäe ihm zu Ehren offiziell 'Vince Lombardi Trophy' getauft."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Wodurch ließ sich AFL-Gründer Lamar Hunt zum bis heute genutzten Namen 'Super Bowl' inspirieren?",
    "a": [
      "Durch das Hüpfball-Spielzeug seiner Kinder ('Super Ball')",
      "Durch die riesige Schüssel-Architektur des Rose Bowl Stadions",
      "Durch den Comic-Helden Superman und dessen Festung der Einsamkeit",
      "Durch eine Werbekampagne einer großen kalifornischen Supermarktkette"
    ],
    "exp": "Hunt beobachtete seine Kinder beim Spielen mit einem 'Super Ball'-Gummiball. Die Kombination mit dem Begriff 'Bowl Game' ergab den 'Super Bowl'."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Welche Zahlen verwendet die NFL traditionell zur offiziellen Zählung ihrer Super Bowls?",
    "a": [
      "Römische Zahlen (z. B. Super Bowl LVIII)",
      "Arabische Jahreszahlen (z. B. Super Bowl 2024)",
      "Buchstaben des griechischen Alphabets",
      "Fortlaufende Buchstabenkombinationen"
    ],
    "exp": "Seit Super Bowl V nutzt die NFL römische Ziffern, um Verwirrung zu vermeiden, da das Endspiel stets im Folgejahr der Saison stattfindet."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Bei welchem einzigen Jubiläums-Super-Bowl verzichtete die NFL aus Designgründen auf die römische Zahl 'L'?",
    "a": [
      "Super Bowl 50 (im Jahr 2016)",
      "Super Bowl 40 (im Jahr 2006)",
      "Super Bowl 30 (im Jahr 1996)",
      "Super Bowl 60 (im Jahr 2026)"
    ],
    "exp": "Ein einzelnes 'L' im Logo wirkte wie das Symbol für 'Loser'. Daher vermarktete die NFL das goldene Jubiläum 2016 ausnahmsweise als 'Super Bowl 50'."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "In wie viele Conferences und Divisions ist die NFL mit ihren 32 Teams heute gegliedert?",
    "a": [
      "2 Conferences (AFC und NFC) mit je 4 Divisions",
      "4 Conferences mit jeweils 2 Divisions zu 4 Teams",
      "2 Conferences (Eastern und Western) mit je 3 Divisions",
      "8 Divisionen ohne übergeordnete Conferences"
    ],
    "exp": "Jede der beiden Conferences (AFC und NFC) besteht aus 4 Divisions (North, South, East, West) mit jeweils exakt 4 Mannschaften."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Wie viele Teams pro Conference qualifizieren sich im aktuellen NFL-Playoff-Format für die Postseason?",
    "a": [
      "7 Teams (nur der No. 1 Seed erhält eine Bye Week)",
      "6 Teams (die beiden besten Seeds erhalten eine Bye Week)",
      "8 Teams (alle spielen in der ersten Playoff-Runde)",
      "5 Teams (die drei Divisionssieger plus zwei Wildcards)"
    ],
    "exp": "Seit der Saison 2020 qualifizieren sich 14 Teams (7 pro Conference). Nur noch das beste Team jeder Conference hat in Runde 1 spielfrei."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "pro",
    "q": "Welches legendäre Spiel im Dezember 1958 wird in den USA als 'The Greatest Game Ever Played' bezeichnet?",
    "a": [
      "NFL Championship Game 1958: Baltimore Colts gegen New York Giants",
      "Super Bowl I: Green Bay Packers gegen Kansas City Chiefs",
      "Das Thanksgiving-Spiel 1958: Detroit Lions gegen Green Bay Packers",
      "Das Ice-Bowl-Halbfinale 1958: Cleveland Browns gegen Chicago Bears"
    ],
    "exp": "Das Spiel war das erste mit Sudden-Death-Overtime der NFL-Geschichte. Vor 45 Millionen TV-Zuschauern machten die Colts Football zur US-Sportart Nr. 1."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "pro",
    "q": "Welche drei alteingesessenen NFL-Teams wechselten beim Merger 1970 freiwillig in die neue AFC, um die Ligen auszugleichen?",
    "a": [
      "Cleveland Browns, Pittsburgh Steelers und Baltimore Colts",
      "Green Bay Packers, Chicago Bears und Detroit Lions",
      "New York Giants, Philadelphia Eagles und Washington Redskins",
      "Los Angeles Rams, San Francisco 49ers und Dallas Cowboys"
    ],
    "exp": "Da die AFL nur 10 Teams hatte, wechselten Cleveland, Pittsburgh und Baltimore gegen eine Prämie von je 3 Millionen Dollar in die AFC."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "An welchem Wochentag wird der Super Bowl seit seiner Erstaustragung traditionell zelebriert?",
    "a": [
      "Am Sonntag ('Super Bowl Sunday')",
      "Am Samstagabend zur Primetime",
      "Am US-Feiertag Memorial Day",
      "Am ersten Freitag im Februar"
    ],
    "exp": "Der Super Bowl Sunday gilt in den USA als inoffizieller Nationalfeiertag und ist nach Thanksgiving der Tag mit dem höchsten Lebensmittelkonsum."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Welches historische Comeback vollbrachten die New England Patriots in Super Bowl LI gegen die Atlanta Falcons?",
    "a": [
      "Sie drehten einen 3:28-Rückstand und siegten mit 34:28 nach Overtime",
      "Sie holten in den letzten zwei Minuten mit drei Field Goals einen 0:17-Rückstand auf",
      "Sie erzielten vier Touchdowns im ersten Viertel nach einem 0:14-Start",
      "Sie siegten durch einen geblockten Extrapunkt in der regulären Schlusssekunde"
    ],
    "exp": "Das legendäre '28-3' ging in die Sportgeschichte ein: Tom Brady und die Patriots drehten das scheinbar verlorene Spiel im ersten Overtime-Super-Bowl."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Was war der berühmte 'Helmet Catch' von David Tyree in Super Bowl XLII?",
    "a": [
      "Er klemmte den Pass von Eli Manning im Sprung mit einer Hand an seinen Helm",
      "Er riss dem Pass-Rusher im Zweikampf den Helm vom Kopf und lief zum Touchdown",
      "Er blockte das entscheidende gegnerische Field Goal mit der Helm-Krone ab",
      "Er warf seinen Helm über die Goalline, um das First Down zu markieren"
    ],
    "exp": "Tyrees sensationeller Catch im Schlussdrive besiegelte den Sieg der Giants und zerstörte die 'Perfect Season' (18-0) der New England Patriots."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Was geschah beim legendären Spielzug 'Philly Special' in Super Bowl LII?",
    "a": [
      "Quarterback Nick Foles fing selbst einen Touchdown-Pass von Tight End Trey Burton",
      "Kicker Jake Elliott kickte ein 61-Yard-Field-Goal mit verbundenen Augen",
      "Die Eagles wechselten vor dem Snap alle elf Offensivspieler geschlossen aus",
      "Defensive Tackle Fletcher Cox trug einen Fumble über 80 Yards in die Endzone"
    ],
    "exp": "Bei 4th & Goal kurz vor der Halbzeit tricksten die Philadelphia Eagles die Patriots aus: Foles schlich sich frei und fing den TD-Pass zum Titelgewinn."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welches Team schaffte 1972 als einziges Team der NFL-Historie eine absolut perfekte Saison ohne jede Niederlage ('Perfect Season')?",
    "a": [
      "Miami Dolphins (17-0 Bilanz unter Coach Don Shula)",
      "Pittsburgh Steelers (unter Head Coach Chuck Noll)",
      "Dallas Cowboys (unter Head Coach Tom Landry)",
      "Oakland Raiders (unter Head Coach John Madden)"
    ],
    "exp": "Die Dolphins gewannen 1972 alle 14 Hauptrundenspiele, zwei Playoff-Partien und Super Bowl VII (14:7 gegen Washington) – eine bis heute unerreichte 17-0-Bilanz."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Welche kühne Garantie gab Quarterback Joe Namath vor Super Bowl III im Januar 1969 ab?",
    "a": [
      "Er garantierte öffentlich den Sieg seiner Außenseiter-Jets über die Baltimore Colts",
      "Er garantierte mindestens fünf Touchdown-Pässe in der ersten Halbzeit",
      "Er versprach den Fans, nach einem Sieg seine Karriere sofort zu beenden",
      "Er garantierte, dass die gegnerische Offense keine 50 Yards Raumgewinn erzielt"
    ],
    "exp": "'We're gonna win Sunday. I guarantee it!' Namaths New York Jets schlugen die Colts sensationell mit 16:7 und etablierten die AFL als vollwertige Liga."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welcher Schicksals-Moment kostete die Buffalo Bills in Super Bowl XXV gegen die Giants den Sieg ('Wide Right')?",
    "a": [
      "Kicker Scott Norwood setzte ein 47-Yard-Field-Goal in letzter Sekunde knapp rechts vorbei",
      "Quarterback Jim Kelly verlor den Ball beim Handoff kurz vor der gegnerischen Goalline",
      "Wide Receiver Andre Reed trat beim spielentscheidenden Touchdown auf die Auslinie",
      "Running Back Thurman Thomas fand vor dem Eröffnungs-Snap seinen Helm nicht"
    ],
    "exp": "Norwoods Kick segelte wenige Sekunden vor Schluss um Zentimeter rechts an den Stangen vorbei (19:20). Es war die erste von vier Bills-Super-Bowl-Pleiten in Serie."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Welche dramatische Szene entschied Super Bowl XLIX zwischen den Patriots und den Seattle Seahawks an der 1-Yard-Linie?",
    "a": [
      "Malcolm Butler fing den Pass von Russell Wilson an der Goalline per Interception ab",
      "Marshawn Lynch lief ungehindert mit dem Ball in die Endzone zum Sieg",
      "Tom Brady wurde in der eigenen Endzone gesackt und kassierte einen Safety",
      "Der Kicker der Seahawks rutschte beim spielentscheidenden Field Goal weg"
    ],
    "exp": "Statt den wuchtigen Marshawn Lynch laufen zu lassen, passte Seattle: Rookie-Cornerback Malcolm Butler las den Spielzug perfekt und sicherte Neuengland den Titel."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Was geschah in der dramatischen Schlusssekunde von Super Bowl XXXIV ('One Yard Short')?",
    "a": [
      "Rams-Linebacker Mike Jones stoppte Titans-Receiver Kevin Dyson exakt einen Yard vor der Endzone",
      "Titans-Quarterback Steve McNair warf eine Interception über die ausgestreckte Hand des Safeties",
      "Der Schiedsrichter pfiff das Spiel wegen einer Zeitüberschreitung an der 2-Yard-Linie ab",
      "Der Kicker der Rams blockte einen Verzweiflungspunt der Titans kurz vor der Goalline"
    ],
    "exp": "Dyson streckte mit letzter Kraft den Arm aus, berührte aber mit dem Knie einen Yard vor der Goalline den Rasen. Die St. Louis Rams gewannen 23:16."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welchen Rekord-Spielzug zeigte James Harrison für die Steelers in Super Bowl XLIII gegen die Cardinals?",
    "a": [
      "Einen 100-Yard-Interception-Return-Touchdown mit ablaufender Halbzeituhr",
      "Einen 95-Yard-Punt-Return-Touchdown nach einem verpatzten Befreiungskick",
      "Drei Quarterback-Sacks innerhalb einer einzigen gegnerischen Angriffsserie",
      "Ein geblocktes Field Goal mit anschließendem 80-Yard-Lauf in die Endzone"
    ],
    "exp": "Harrison fing den Pass von Kurt Warner in der eigenen Endzone ab und tankte sich mit Ablauf der ersten Halbzeit über unglaubliche 100 Yards zum Touchdown durch."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Wie erzielte Santonio Holmes wenige Sekunden vor Ende von Super Bowl XLIII den Siegtouchdown für Pittsburgh?",
    "a": [
      "Mit einem sensationellen 'Toe-Tap'-Catch in der hinteren rechten Ecke der Endzone",
      "Durch einen kraftvollen 1-Yard-Quarterback-Sneak durch die Mitte der Defensive Line",
      "Nach einem fallengelassenen Fumble des Cornerbacks an der vorderen Pylone",
      "Durch einen spektakulären Rückwärtssalto über zwei gegnerische Abwehrspieler"
    ],
    "exp": "Holmes hielt den Pass von Ben Roethlisberger fest und berührte mit beiden Zehenspitzen hauchdünn den Boden im Feld vor der Auslinie – Steelers-Sieg mit 27:23."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Was gelang Devin Hester von den Chicago Bears im Eröffnungsspielzug von Super Bowl XLI gegen die Colts?",
    "a": [
      "Er trug den allerersten Kickoff des Spiels über 92 Yards direkt zum Touchdown zurück",
      "Er fing eine Interception im ersten Passversuch von Peyton Manning ab",
      "Er blockte den ersten Punt der Colts und sicherte den Ball in der Endzone",
      "Er erzielte das schnellste Field Goal der NFL-Super-Bowl-Historie"
    ],
    "exp": "Hester sorgte nach nur 14 Sekunden für den schnellsten Touchdown der Super-Bowl-Geschichte – der einzige Eröffnungs-Kickoff-Return-TD im Endspiel überhaupt."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "pro",
    "q": "Welcher ikonische Spielzug entschied das NFC Championship Game 1982 ('The Catch') zwischen 49ers und Cowboys?",
    "a": [
      "Joe Montana warf im Rückwärtslaufen auf Dwight Clark, der den Ball mit den Fingerspitzen fing",
      "Roger Staubach warf eine 60-Yard-Hail-Mary auf Drew Pearson in letzter Sekunde",
      "Jerry Rice fing einen kurzen Screen Pass und sprintete über 85 Yards an allen vorbei",
      "Franco Harris fing einen abgefälschten Ball Zentimeter über dem Kunstrasen ab"
    ],
    "exp": "Montana wurde von drei Cowboys gejagt und warf hoch in die Ecke: Clark sprang empor und fing den Pass. Der Moment markierte den Beginn der 49ers-Dynastie."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "pro",
    "q": "Was geschah bei der legendären 'Immaculate Reception' im Playoff-Spiel der Steelers gegen die Raiders 1972?",
    "a": [
      "Franco Harris fing einen hart abprallenden Pass Zentimeter vor dem Rasen und lief zum TD",
      "Terry Bradshaw warf einen 99-Yard-Touchdown-Pass ohne Handschuhe im Schneesturm",
      "Die Defense der Steelers eroberte vier Fumbles innerhalb von nur zwei Minuten",
      "Ein Schiedsrichter fing versehentlich einen Pass und übergab ihn an den Running Back"
    ],
    "exp": "Bradshaws Pass prallte von Jack Tatum ab: Franco Harris schnappte sich das Ei knapp über dem Boden und sprintete zum 13:7-Sieg – eines der berühmtesten Plays aller Zeiten."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Wie begann Super Bowl XLVIII für Peyton Manning und die Denver Broncos gegen die Seattle Seahawks?",
    "a": [
      "Der allererste Snap flog über Mannings Kopf in die Endzone zum Safety nach 12 Sekunden",
      "Manning warf im ersten Spielzug eine Interception direkt in die Hände von Richard Sherman",
      "Der Eröffnungs-Kickoff der Seahawks wurde von Denver bis an die 1-Yard-Linie getragen",
      "Drei Broncos-Linemen begingen gleichzeitig ein False-Start-Foul vor dem Snap"
    ],
    "exp": "Center Manny Ramirez snappte den Ball versehentlich vorzeitig. Der Ball rollte in die Endzone: Safety nach 12 Sekunden, Auftakt zu Seattles 43:8-Kantersieg."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Welche beiden Franchises teilen sich mit jeweils 6 Siegen den Rekord für die meisten Super-Bowl-Titel?",
    "a": [
      "New England Patriots und Pittsburgh Steelers",
      "Dallas Cowboys und San Francisco 49ers",
      "Green Bay Packers und Kansas City Chiefs",
      "New York Giants und Denver Broncos"
    ],
    "exp": "Sowohl die Pittsburgh Steelers (1975, 1976, 1979, 1980, 2006, 2009) als auch die New England Patriots (2002, 2004, 2005, 2015, 2017, 2019) haben 6 Ringe."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Welcher Popstar begründete mit seinem Auftritt 1993 (Super Bowl XXVII) die Ära der modernen Mega-Halftime-Shows?",
    "a": [
      "Michael Jackson",
      "Prince",
      "Madonna",
      "Bruce Springsteen"
    ],
    "exp": "Zuvor traten meist Marschkapellen auf. Jackson stand zunächst 90 Sekunden regungslos auf der Bühne und erzielte höhere TV-Quoten als das Spiel selbst."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Welcher Vorfall ging 2004 bei der Halftime-Show von Janet Jackson und Justin Timberlake als 'Nipplegate' um die Welt?",
    "a": [
      "Timberlake riss am Ende der Show ein Stoffteil von Jacksons Oberteil ab ('Wardrobe Malfunction')",
      "Die Audio-Anlage fiel während der Live-Übertragung für über 5 Minuten komplett aus",
      "Zwei Background-Tänzer sprangen versehentlich von der Bühne in die Coaching-Zone",
      "Das Feuerwerk entzündete Teile der Bühnenverkleidung auf dem Spielfeld"
    ],
    "exp": "Der Vorfall löste in den USA eine nationale Debatte über Zensur aus und führte zur Einführung der 5-Sekunden-TV-Verzögerung bei US-Liveübertragungen."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Unter welchen spektakulären Wetterbedingungen performte Musiklegende Prince seinen Hit 'Purple Rain' in Super Bowl XLI?",
    "a": [
      "Im strömenden tropischen Platzregen im Open-Air-Stadion von Miami",
      "Bei minus 15 Grad im dichten Schneetreiben im Soldier Field von Chicago",
      "Bei einem plötzlichen Wüsten-Sandsturm im State Farm Stadium von Phoenix",
      "Während eines orkanartigen Gewittersturms mit mehrmaligem Blitzeinschlag"
    ],
    "exp": "Als die Produzenten ihn vor dem Regen warnten, fragte Prince nur: 'Könnt ihr es noch stärker regnen lassen?' Sein Auftritt gilt als eine der besten Shows aller Zeiten."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welche irische Rockband rührte die Welt in Super Bowl XXXVI (2002) mit einer Hommage an die Opfer von 9/11 zu Tränen?",
    "a": [
      "U2 (mit Frontmann Bono)",
      "The Rolling Stones",
      "Aerosmith",
      "Coldplay"
    ],
    "exp": "Auf einem riesigen Banner wurden die Namen aller Opfer der Anschläge vom 11. September 2001 eingeblendet; Bono öffnete seine Jacke mit US-Flagge im Futter."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welche Hip-Hop-Ikonen gestalteten gemeinsam die gefeierte Halftime-Show von Super Bowl LVI (2022) in Los Angeles?",
    "a": [
      "Dr. Dre, Snoop Dogg, Eminem, Mary J. Blige und Kendrick Lamar",
      "Jay-Z, Kanye West, Drake, Lil Wayne und Nicki Minaj",
      "Outkast, 50 Cent, Ludacris, Busta Rhymes und Missy Elliott",
      "Tupac Hologramm, Ice Cube, The Game, Eazy-E Erben und Post Malone"
    ],
    "exp": "Die kalifornische Hip-Hop-Show im SoFi Stadium gewann drei Primetime Emmy Awards und feierte die Rap-Kultur der Westküste im TV-Milliardenpublikum."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Welche kuriose Tänzer-Panne ging während der Halftime-Show von Katy Perry im Jahr 2015 viral?",
    "a": [
      "Der unkoordinierte Haifisch-Tänzer auf der linken Seite ('Left Shark')",
      "Ein als Palme verkleideter Akrobat verlor im Rückwärtssalto seine Hose",
      "Eine riesige mechanische Löwenfigur blieb mitten auf dem Rasen stecken",
      "Ein Trompeter stolperte über das Kabel des Hauptmikrofons von Katy Perry"
    ],
    "exp": "Der Tänzer im linken Hai-Kostüm vergaß seine Choreografie und tanzte völlig aus dem Takt frei Schnauze – das Internet feierte ihn als 'Left Shark'."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Wie eröffnete Lady Gaga ihren spektakulären Auftritt bei der Halftime-Show von Super Bowl LI (2017)?",
    "a": [
      "Sie sprang scheinbar vom Dach des NRG Stadiums an Seilen herab",
      "Sie fuhr auf einem überdimensionalen vergoldeten Motorrad ins Stadion",
      "Sie stieg aus einer riesigen beleuchteten Weltkugel im Mittelkreis empor",
      "Sie landete mit einem Fallschirm punktgenau auf der 50-Yard-Linie"
    ],
    "exp": "Mit hunderten beleuchteten Intel-Drohnen am Nachthimmel sang sie 'God Bless America' und schwebte anschließend an Seilen auf das Spielfeld."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Was kündigte Pop-Ikone Rihanna während ihrer Halftime-Show bei Super Bowl LVII (2023) auf schwebenden Plattformen an?",
    "a": [
      "Ihre zweite Schwangerschaft (präsentiert im knallroten Overall)",
      "Ihren sofortigen Abschied aus der Musikindustrie für eine Filmkarriere",
      "Den Kauf eines Minderheitsanteils an den Kansas City Chiefs",
      "Eine gemeinsame Welttournee mit Rapper ASAP Rocky im folgenden Sommer"
    ],
    "exp": "Ganz in Rot auf schwebenden Acryl-Plattformen performte Rihanna solo und zeigte der Welt dabei stolz ihren Babybauch."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welcher legendäre TV-Werbespot von Apple unter Regie von Ridley Scott wurde bei Super Bowl XVIII (1984) ausgestrahlt?",
    "a": [
      "Der '1984'-Spot zur Einführung des revolutionären Macintosh-Computers",
      "Der 'Think Different'-Spot mit historischen Aufnahmen von Albert Einstein",
      "Der 'Silhouette'-Tanzspot zur weltweiten Markteinführung des Apple iPod",
      "Der erste 'Get a Mac'-Vergleichsspot zwischen Windows-PC und Apple Mac"
    ],
    "exp": "Eine Hammerwerferin zerschlägt den Bildschirm des 'Big Brother': Der dystopische 60-Sekunden-Spot lief nur ein einziges Mal und schrieb Werbegeschichte."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Wie viel kostet ein einzelner 30-sekündiger Werbespot während der US-Super-Bowl-Liveübertragung mittlerweile rund?",
    "a": [
      "Über 7 Millionen US-Dollar",
      "Rund 1,5 Millionen US-Dollar",
      "Knapp 3 Millionen US-Dollar",
      "Etwa 15 Millionen US-Dollar"
    ],
    "exp": "Wegen der gigantischen Reichweite von über 120 Millionen US-Zuschauern stieg der Preis für 30 Sekunden Werbung auf über 7 Millionen Dollar."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Welches Ritual führen siegreiche Spieler traditionell nach dem Gewinn des Super Bowls mit ihrem Cheftrainer durch?",
    "a": [
      "Die 'Gatorade Shower' (sie übergießen ihn mit einem Eimer Sportgetränk)",
      "Sie schneiden feierlich die Maschen der beiden Football-Tornetze ab",
      "Sie rasieren dem Head Coach im Konfettiregen eine Glatze auf dem Podium",
      "Sie werfen den Trainer zehnmal hintereinander hoch in die Luft"
    ],
    "exp": "Die Gatorade Shower wurde Mitte der 1980er Jahre von Jim Burt und Harry Carson bei den New York Giants für Bill Parcells berühmt gemacht."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Welchen berühmten Satz ruft der MVP des Super Bowls traditionell direkt nach Spielende in die TV-Kamera?",
    "a": [
      "'I'm going to Disney World!'",
      "'The trophy is finally coming home!'",
      "'Viva Las Vegas, baby!'",
      "'Football is family forever!'"
    ],
    "exp": "Phil Simms rief 1987 als Erster diesen gesponserten Satz für Disney in die Kamera – seither ein fester Bestandteil der Super-Bowl-Folklore."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Was bekommen alle Spieler und Trainer des Siegerteams neben der Lombardi Trophy persönlich überreicht?",
    "a": [
      "Einen individuell angefertigten, diamantenbesetzten Super-Bowl-Ring",
      "Eine vergoldete Nachbildung des offiziellen Spielballs 'The Duke'",
      "Einen lebenslangen Ehrenpass für alle regulären Spiele der NFL",
      "Ein massives goldenes Schild mit eingravierter Mannschaftsaufstellung"
    ],
    "exp": "Die Ringe sind extrem aufwendig gestaltet, oft mit hunderten Diamanten besetzt, und besitzen für Sammler und Spieler unbezahlbaren Wert."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Wann und wo fand das allererste reguläre Saisonspiel der NFL auf deutschem Boden statt?",
    "a": [
      "Am 13. November 2022 in der Allianz Arena in München",
      "Am 25. Oktober 2020 im Berliner Olympiastadion",
      "Am 18. September 2021 im Volksparkstadion in Hamburg",
      "Am 5. November 2023 im Deutsche Bank Park in Frankfurt"
    ],
    "exp": "Die Tampa Bay Buccaneers mit Tom Brady besiegten die Seattle Seahawks mit 21:16 vor 69.811 begeisterten Fans in der Münchner Allianz Arena."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Welches Lied sangen die deutschen Fans beim München-Spiel 2022 minutenlang im Chor und begeisterten damit die US-Kommentatoren?",
    "a": [
      "'Take Me Home, Country Roads' von John Denver",
      "'Sweet Caroline' von Neil Diamond",
      "'Seven Nation Army' von The White Stripes",
      "'Major Tom (Völlig losgelöst)' von Peter Schilling"
    ],
    "exp": "Die Gesänge der deutschen Fans bei 'Country Roads' sorgten weltweit für Gänsehaut und wurden von US-Reportern als elektrisierend gefeiert."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welche beiden NFL-Spiele wurden im November 2023 in Frankfurt am Main ausgetragen?",
    "a": [
      "Chiefs vs. Dolphins und Patriots vs. Colts",
      "Packers vs. Bears und Cowboys vs. Eagles",
      "Seahawks vs. 49ers und Bills vs. Jets",
      "Ravens vs. Steelers und Buccaneers vs. Saints"
    ],
    "exp": "Im Frankfurter Waldstadion feierten die Fans zwei Wochen in Folge NFL-Feste: Kansas City schlug Miami mit 21:14, die Colts besiegten die Patriots mit 10:6."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welches Frankfurter Team gewann viermal den World Bowl in der ehemaligen 'NFL Europe'?",
    "a": [
      "Frankfurt Galaxy",
      "Rhein Fire",
      "Berlin Thunder",
      "Cologne Centurions"
    ],
    "exp": "Frankfurt Galaxy war das Aushängeschild der NFL Europe (1995–2007) und gewann 1995, 1999, 2003 und 2006 den World Bowl."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "In welcher europäischen Metropole trägt die NFL seit 2007 regelmäßig mehrere 'International Series'-Saisonspiele pro Jahr aus?",
    "a": [
      "In London (im Wembley und Tottenham Hotspur Stadium)",
      "In Paris (im Stade de France in Saint-Denis)",
      "In Madrid (im Estadio Santiago Bernabéu)",
      "In Amsterdam (in der Johan Cruyff Arena)"
    ],
    "exp": "Seit dem ersten Spiel der Giants gegen die Dolphins 2007 im Wembley-Stadion ist London der wichtigste internationale Stützpunkt der NFL."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Wo fand im Oktober 2005 das allererste offizielle reguläre NFL-Saisonspiel außerhalb der USA statt?",
    "a": [
      "Im Aztekenstadion in Mexiko-Stadt vor über 103.000 Zuschauern",
      "Im Rogers Centre in Toronto (Kanada) vor 50.000 Zuschauern",
      "Im Tokyo Dome in Tokio (Japan) vor 45.000 Zuschauern",
      "Im Olympiastadion in Sydney (Australien) vor 80.000 Zuschauern"
    ],
    "exp": "Die Arizona Cardinals schlugen die San Francisco 49ers am 2. Oktober 2005 im Aztekenstadion vor der damaligen Rekordkulisse von 103.467 Fans."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "In welchem südamerikanischen Land trug die NFL im September 2024 ihr historisches Premieren-Saisonspiel aus?",
    "a": [
      "In Brasilien (São Paulo, Corinthians Arena)",
      "In Argentinien (Buenos Aires, Estadio Monumental)",
      "In Kolumbien (Bogotá, Estadio El Campín)",
      "In Chile (Santiago, Estadio Nacional)"
    ],
    "exp": "Die Philadelphia Eagles besiegten die Green Bay Packers in São Paulo mit 34:29 im ersten regulären NFL-Spiel auf südamerikanischem Boden."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "pro",
    "q": "Welches europäische Stadion wurde als Austragungsort für ein NFL-Saisonspiel 2025 in Spanien ausgewählt?",
    "a": [
      "Estadio Santiago Bernabéu in Madrid",
      "Camp Nou in Barcelona",
      "Estadio Metropolitano in Madrid",
      "Estadio Ramón Sánchez-Pizjuán in Sevilla"
    ],
    "exp": "Die NFL expandiert weiter: Für 2025 wurde das modernisierte Bernabéu-Stadion von Real Madrid als Spielstätte auserkoren."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Welcher deutsche TV-Sender brachte den Football-Hype mit der Sendung 'ran Football' ab 2015 maßgeblich in deutsche Wohnzimmer?",
    "a": [
      "ProSieben MAXX / ProSieben",
      "RTL / Nitro",
      "ZDF Sportstudio",
      "Sport1 (ehemals DSF)"
    ],
    "exp": "Mit Frank Buschmann, Patrick Esume, Jan Stecker und 'Icke' Dommisch machte 'ran Football' auf ProSieben MAXX den Sport in Deutschland massentauglich."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Welcher ehemalige deutsche Football-Spieler gewann als Offensive Tackle zwei Super-Bowl-Ringe mit den New England Patriots?",
    "a": [
      "Sebastian Vollmer",
      "Markus Kuhn",
      "Björn Werner",
      "Moritz Böhringer"
    ],
    "exp": "Vollmer ('Sea Bass') war jahrelang Tom Bradys verlässlicher Beschützer als Right Tackle und holte die Titel in Super Bowl XLIX und LI."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Wer erzielte 2015 als erster Deutscher der NFL-Geschichte einen Touchdown in der regulären Saison?",
    "a": [
      "Markus Kuhn (Fumble-Return-Touchdown für die New York Giants)",
      "Sebastian Vollmer (nach einem gemeldeten Tackle-Eligible-Pass)",
      "Amon-Ra St. Brown (Receiver-Touchdown für die Detroit Lions)",
      "Jakob Johnson (Fullback-Touchdown für die New England Patriots)"
    ],
    "exp": "Am 7. Dezember 2014 eroberte Defensive Tackle Markus Kuhn gegen Tennessee einen gegnerischen Fumble und trug ihn in die Endzone."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Welcher deutsch-amerikanische Star-Receiver brilliert bei den Detroit Lions und spricht fließend Deutsch?",
    "a": [
      "Amon-Ra St. Brown",
      "Equanimeous St. Brown",
      "Kasim Edebali",
      "Marcel Dabo"
    ],
    "exp": "Amon-Ra wuchs mit einer deutschen Mutter auf, spricht perfekt Deutsch und gehört zu den absoluten Top-Wide-Receivern der gesamten NFL."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Was versteht man unter dem 'NFL International Player Pathway Program' (IPP)?",
    "a": [
      "Ein Programm, das internationalen Athleten einen zusätzlichen Trainings-Kaderplatz in der NFL ermöglicht",
      "Ein Austauschprogramm für US-College-Spieler an europäischen Universitäten",
      "Eine weltweite Scouting-Tour zur Entdeckung junger Cheerleaderinnen für den Super Bowl",
      "Ein medizinisches Nachsorgeprogramm für im Ausland verletzte NFL-Profis"
    ],
    "exp": "Das IPP-Programm gibt Sportlern weltweit (wie Jakob Johnson oder Louis Rees-Zammit) die Chance, ohne College-Erfahrung in die NFL zu kommen."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "pro",
    "q": "Wie viele Teams traten 1991 in der ersten Saison der 'World League of American Football' (später NFL Europe) an?",
    "a": [
      "10 Teams (aus den USA, Kanada und Europa)",
      "6 Teams (ausschließlich aus Deutschland und England)",
      "12 Teams (jeweils sechs aus Nordamerika und Europa)",
      "8 Teams (aus vier europäischen Metropolen)"
    ],
    "exp": "Die WLAF startete 1991 mit 10 Teams: 7 aus Nordamerika sowie London Monarchs, Barcelona Dragons und Frankfurt Galaxy aus Europa."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Wie wird der Spieler traditionell genannt, der im jährlichen NFL Draft an allerletzter Stelle ausgewählt wird?",
    "a": [
      "Mr. Irrelevant",
      "The Last Warrior",
      "Bench Warmer Kid",
      "Lucky Seventh"
    ],
    "exp": "Der letzte Pick erhält den Titel 'Mr. Irrelevant'. Berühmtestes Beispiel: Brock Purdy, der 2022 als letzter Pick zum Star-QB der 49ers avancierte."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "In welcher Reihenfolge wählen die NFL-Teams standardmäßig in jeder Runde des NFL Drafts aus?",
    "a": [
      "Das schlechteste Team der Vorsaison wählt zuerst, der Super-Bowl-Champion zuletzt",
      "Die Reihenfolge wird jedes Jahr per Losverfahren und Roulette-Kugel bestimmt",
      "Das Team mit den meisten Fan-Zuschauern im Stadion erhält das erste Wahlrecht",
      "Die Mannschaften wählen abwechselnd nach dem Alphabet ihrer Städtenamen"
    ],
    "exp": "Das Draft-System garantiert Chancengleichheit ('Parity'): Wer sportlich am schwächsten war, bekommt den Zugriff auf die besten Nachwuchstalente."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welcher Quarterback weigerte sich 2004 öffentlich, für die San Diego Chargers zu spielen, und erzwang einen Draft-Trade?",
    "a": [
      "Eli Manning",
      "Ben Roethlisberger",
      "Philip Rivers",
      "Matt Ryan"
    ],
    "exp": "Manning wurde von San Diego an Position 1 gewählt, wechselte aber noch am Draft-Tag im Tausch gegen Philip Rivers zu den New York Giants."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "pro",
    "q": "Welcher gigantische Trade aus dem Jahr 1989 zwischen Cowboys und Vikings leitete die Dallas-Dynastie der 90er ein?",
    "a": [
      "Der Herschel-Walker-Trade (Dallas erhielt 8 Draft-Picks und legte die Basis für 3 Super Bowls)",
      "Der Joe-Montana-Trade (San Francisco tauschte Montana nach Kansas City)",
      "Der Ricky-Williams-Trade (Mike Ditka opferte den gesamten Saints-Draft)",
      "Der Eric-Dickerson-Trade (ein Drei-Team-Megadeal zwischen Rams, Colts und Bills)"
    ],
    "exp": "Dallas schickte Star-Running-Back Herschel Walker nach Minnesota und baute aus der Flut an Draft-Picks das Team um Troy Aikman und Emmitt Smith auf."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welches Team verlor zwischen 1991 und 1994 vier Super Bowls in Serie (XXV, XXVI, XXVII, XXVIII)?",
    "a": [
      "Buffalo Bills",
      "Minnesota Vikings",
      "Denver Broncos",
      "Cincinnati Bengals"
    ],
    "exp": "Unter Coach Marv Levy und Quarterback Jim Kelly erreichten die Bills viermal hintereinander das Endspiel – und verloren tragischerweise alle vier."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Was war der 'AFL-NFL World Championship Game', bevor der Begriff Super Bowl offiziell auf Tickets gedruckt wurde?",
    "a": [
      "Die offizielle Bezeichnung für die ersten vier Super Bowls von 1967 bis 1970",
      "Ein jährliches Hallenspiel zwischen den beiden Meistern im Madison Square Garden",
      "Ein All-Star-Match der besten Spieler vor Beginn der gemeinsamen Preseason",
      "Ein College-Bowl-Turnier zur Ermittlung der besten Draft-Picks der AFL"
    ],
    "exp": "Erst ab Super Bowl IV bzw. rückwirkend für die ersten drei Spiele wurde der Name 'Super Bowl' auf offiziellen Eintrittskarten und Trophäen verwendet."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Wie heißt der offizielle Spielball der National Football League, der von Wilson in Ohio handgefertigt wird?",
    "a": [
      "'The Duke' (benannt nach Wellington Mara)",
      "'The Chief' (benannt nach Art Rooney)",
      "'The Boss' (benannt nach George Steinbrenner)",
      "'The King' (benannt nach Don Shula)"
    ],
    "exp": "Der Ball ehrt Wellington Mara, den langjährigen Mitbesitzer der New York Giants, dessen Spitzname 'The Duke' lautete."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welcher Head Coach hielt mit 347 Karriere-Siegen bis heute den ewigen NFL-Rekord für die meisten Siege?",
    "a": [
      "Don Shula",
      "Bill Belichick",
      "George Halas",
      "Tom Landry"
    ],
    "exp": "Don Shula coachte die Baltimore Colts und Miami Dolphins über 33 Spielzeiten und feierte inklusive Playoffs unerreichte 347 Siege."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "pro",
    "q": "Was war das sogenannte 'Heidi Game' aus dem Jahr 1968, das das US-Fernsehen nachhaltig veränderte?",
    "a": [
      "NBC schaltete das Spiel Raiders vs. Jets kurz vor Schluss ab, um pünktlich den Spielfilm 'Heidi' zu zeigen",
      "Eine Schweizer Schauspielerin rannte im Dirndl über das Spielfeld des Super Bowls",
      "Das Spiel musste wegen Schneeverwehungen in den Schweizer Alpen für 24 Stunden verschoben werden",
      "Ein Werbespot für Schweizer Schokolade unterbrach versehentlich den siegbringenden Touchdown"
    ],
    "exp": "Beim Stand von 32:29 für die Jets blendete NBC um 19:00 Uhr pünktlich zu 'Heidi' ab. Oakland drehte das Spiel in 60 Sekunden mit 2 Touchdowns – niemand sah es live!"
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "Wie viele Teams spielten in der Saison 2002 erstmals in der heutigen 32-Team-Konstellation mit den Houston Texans?",
    "a": [
      "32 Teams",
      "30 Teams",
      "34 Teams",
      "28 Teams"
    ],
    "exp": "Mit dem Beitritt der Houston Texans als 32. Franchise im Jahr 2002 wurde die Liga perfekt in zwei Conferences mit je vier 4er-Divisions eingeteilt."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "pro",
    "q": "Welcher Super Bowl hält mit einem Endergebnis von 13:3 den Minusrekord für die wenigsten erzielten Punkte?",
    "a": [
      "Super Bowl LIII (New England Patriots gegen Los Angeles Rams)",
      "Super Bowl IX (Pittsburgh Steelers gegen Minnesota Vikings)",
      "Super Bowl VII (Miami Dolphins gegen Washington Redskins)",
      "Super Bowl XX (Chicago Bears gegen New England Patriots)"
    ],
    "exp": "In Super Bowl LIII (Februar 2019 in Atlanta) stand es bis ins vierte Viertel 3:3. Die Patriots gewannen mit 13:3 in einer zähen Defensiv-Schlacht."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welches Stadion war Gastgeber für die meisten Super Bowls in der NFL-Geschichte?",
    "a": [
      "Der Caesars Superdome in New Orleans (Louisiana)",
      "Das Rose Bowl Stadium in Pasadena (Kalifornien)",
      "Das Hard Rock Stadium in Miami Gardens (Florida)",
      "Das AT&T Stadium in Arlington (Texas)"
    ],
    "exp": "New Orleans und Miami sind die beliebtesten Austragungsorte: Allein der Superdome in New Orleans trug den Super Bowl bereits achtmal aus."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welches Team schaffte als allererste Franchise einen Heimsieg im eigenen Stadion beim Super Bowl?",
    "a": [
      "Tampa Bay Buccaneers (Super Bowl LV im Raymond James Stadium)",
      "Los Angeles Rams (Super Bowl LVI im SoFi Stadium)",
      "Miami Dolphins (Super Bowl X im Orange Bowl)",
      "Minnesota Vikings (Super Bowl LII im U.S. Bank Stadium)"
    ],
    "exp": "Über 54 Jahre lang gelang es keinem Team: 2021 siegten die Buccaneers um Tom Brady im eigenen Heimstadion in Tampa; ein Jahr später zogen die Rams nach."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welcher ikonische Lauf von John Riggins bei 4th & 1 ('70 Chip') entschied Super Bowl XVII für Washington?",
    "a": [
      "Er brach einen Tackle an der Linie und sprintete über 43 Yards zum Touchdown durch",
      "Er sprang mit einem Hechtsprung über die Defensive Line direkt an die Pylone",
      "Er warf einen überraschenden Halfback-Pass auf seinen Wide Receiver in der Endzone",
      "Er schob mit Unterstützung seiner Linemen das gesamte Knäuel 15 Yards nach vorn"
    ],
    "exp": "Riggins wuchtiger 43-Yard-Touchdown gegen Miami im vierten Viertel brachte Washington die Führung und ihm den Super Bowl MVP-Titel."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "mid",
    "q": "Welcher sensationelle Fang von Julian Edelman rettete den Ausgleichs-Drive der Patriots in Super Bowl LI?",
    "a": [
      "Ein Catch zwischen drei Verteidigern, bei dem der Ball Millimeter vor dem Boden schwebte",
      "Ein einhändiger Hechtsprung-Catch über die Schulter an der hinteren Auslinie",
      "Ein Catch, bei dem er den Ball mit beiden Oberschenkeln im Fallen festklemmte",
      "Ein Tip-Drill-Fang nach einer dreifachen Abfälschung durch die gegnerischen Safeties"
    ],
    "exp": "Der Ball wurde abgefälscht und prallte an Beinen ab: Edelman tauchte ab und sicherte das Ei mit den Fingerspitzen hauchdünn vor dem Rasen."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "easy",
    "q": "In welcher glitzernden Wüsten-Metropole wurde im Februar 2024 erstmals ein Super Bowl (LVIII) ausgetragen?",
    "a": [
      "In Las Vegas, Nevada (im Allegiant Stadium)",
      "In Phoenix, Arizona (im State Farm Stadium)",
      "In San Diego, Kalifornien (im Snapdragon Stadium)",
      "In Dallas, Texas (im AT&T Stadium)"
    ],
    "exp": "Super Bowl LVIII im hochmodernen Allegiant Stadium in Las Vegas endete mit einem dramatischen Overtime-Sieg der Chiefs über die 49ers."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "pro",
    "q": "Welche berüchtigte Schiedsrichter-Entscheidung im Schneesturm 2002 ebnete den Weg für Tom Bradys ersten Super Bowl ('Tuck Rule Game')?",
    "a": [
      "Ein scheinbarer Fumble von Brady gegen die Raiders wurde als unvollständiger Pass gewertet",
      "Ein Field Goal im Schneesturm zählte, obwohl der Ball die Stange nur von außen streifte",
      "Ein Interception-Return von Charles Woodson wurde wegen einer Phantom-Strafe aberkannt",
      "Ein Kickoff wurde wegen zu dichter Schneedecke um 20 Yards nach vorne verlegt"
    ],
    "exp": "Da Brady beim Fumble versuchte, den Ball wieder an seinen Körper heranzuziehen (tuck), galt die Wurfbewegung laut damaliger Regel noch als Passversuch."
  },
  {
    "cat": "superbowl_geschichte",
    "diff": "pro",
    "q": "Welcher Quarterback warf in Super Bowl XXIV (1990) beim 55:10-Rekordsieg der 49ers gegen Denver 5 Touchdown-Pässe?",
    "a": [
      "Joe Montana",
      "Steve Young",
      "Dan Marino",
      "John Elway"
    ],
    "exp": "Montanas 49ers deklassierten Elways Broncos mit 55:10 – der höchste Sieg und die meisten Punkte eines einzelnen Teams in der Super-Bowl-Geschichte."
  }
];

  DATA.forEach(q => {
    if (!q.explanation && q.exp) q.explanation = q.exp;
    if (!q.exp && q.explanation) q.exp = q.explanation;
  });

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("american_football_superbowl", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["american_football_superbowl"] = DATA;
  }
})();
