// Unified quiz bank for "american_football_legenden" (75 questions)
(function () {
  const DATA = [
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "An welcher Position wurde Superstar Tom Brady im NFL Draft 2000 von den Patriots ausgewählt?",
    "a": [
      "An Position 199 in der 6. Runde",
      "An Position 1 in der 1. Runde",
      "An Position 64 in der 2. Runde",
      "Er wurde überhaupt nicht gedraftet"
    ],
    "exp": "Brady galt als unbeweglich und schmächtig. Der 199. Pick der Patriots entwickelte sich zum erfolgreichsten Quarterback der Geschichte (7 Super-Bowl-Ringe)."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welchen Spitznamen trug 49ers-Legende Joe Montana wegen seiner unerschütterlichen Ruhe in Drucksituationen?",
    "a": [
      "'Joe Cool'",
      "'The Golden Arm'",
      "'The Miracle Kid'",
      "'Captain Comeback'"
    ],
    "exp": "Legendär: Vor dem siegbringenden 92-Yard-Drive in Super Bowl XXIII zeigte Montana in der Huddle lässig auf die Tribüne: 'Hey, ist das da drüben nicht John Candy?'"
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welcher Ausnahme-Receiver hält bis heute die ewigen NFL-Rekorde für Fänge, Touchdowns und Receiving Yards?",
    "a": [
      "Jerry Rice",
      "Randy Moss",
      "Terrell Owens",
      "Larry Fitzgerald"
    ],
    "exp": "Jerry Rice fing unfassbare 1.549 Pässe, erzielte 22.895 Receiving Yards und 208 Touchdowns – Rekorde für die Ewigkeit."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welchen akustischen Signalruf machte Quarterback Peyton Manning an der Line of Scrimmage weltweit berühmt?",
    "a": [
      "'Omaha!'",
      "'Chicago!'",
      "'Dallas!'",
      "'Atlanta!'"
    ],
    "exp": "Mannings 'Omaha!'-Rufe vor dem Snap waren ein weltweites Markenzeichen. Dahinter verbargen sich Richtungsänderungen oder ein variierender Snap-Count."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welcher gefürchtete Linebacker der New York Giants revolutionierte den Pass-Rush und wurde 1986 als Verteidiger zum NFL-MVP gewählt?",
    "a": [
      "Lawrence Taylor ('LT')",
      "Ray Lewis",
      "Dick Butkus",
      "Mike Singletary"
    ],
    "exp": "Lawrence Taylor terrorisierte gegnerische Quarterbacks mit beispielloser Wucht. Er ist einer von nur zwei Defensivspielern der Geschichte, die zum MVP gewählt wurden."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Warum trat Ausnahmeläufer Barry Sanders 1999 völlig überraschend auf dem absoluten Höhepunkt seiner Karriere zurück?",
    "a": [
      "Er verlor die Motivation, weil die Detroit Lions keine Chance auf Meisterschaften boten",
      "Wegen eines irreparablen Kreuzbandrisses im letzten Trainingslager",
      "Um eine erfolgreiche Zweitkarriere im professionellen Baseball zu starten",
      "Weil sein Vertrag vom Teambesitzer wegen einer Gehaltsobergrenze gekündigt wurde"
    ],
    "exp": "Sanders brauchte nur noch 1.457 Yards für den Allzeit-Rekord. Frustriert über das fehlende Sieger-Gen der Lions verkündete er per Fax seinen Rücktritt."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welcher ikonische Spitzname beschrieb den eleganten Laufstil von Bears-Legende Walter Payton?",
    "a": [
      "'Sweetness'",
      "'The Bus'",
      "'The Beast'",
      "'The Galloping Ghost'"
    ],
    "exp": "Payton verband tänzerische Eleganz mit kompromissloser Härte. Die NFL benannte ihre wichtigste Auszeichnung für soziales Engagement nach ihm ('Man of the Year')."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Quarterback warf 1984 als erster Spieler der Historie über 5.000 Pass-Yards und 48 Touchdowns in einer Saison?",
    "a": [
      "Dan Marino (Miami Dolphins)",
      "Joe Montana (San Francisco 49ers)",
      "Warren Moon (Houston Oilers)",
      "Dan Fouts (San Diego Chargers)"
    ],
    "exp": "Marino revolutionierte mit seinem extrem schnellen Wurfarm ('Quick Release') das Passspiel der NFL, blieb in seiner Karriere aber tragischerweise ohne Super-Bowl-Sieg."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher spektakuläre Hechtsprung von Quarterback John Elway in Super Bowl XXXII ging als 'The Helicopter' in die Geschichte ein?",
    "a": [
      "Er sprang bei 3rd Down furchtlos in zwei Verteidiger und drehte sich in der Luft um die eigene Achse",
      "Er sprang über die gesamte Defensive Line und landete auf dem Rücken des Centers",
      "Er sprang an der Seitenlinie im Salto über den heranstürmenden Head Coach",
      "Er hechtete über die Pylone und warf den Ball im Fallen zu seinem Tight End"
    ],
    "exp": "Der 37-jährige Elway opferte seinen Körper für das First Down: Er wurde in der Luft getroffen, wie ein Hubschrauber-Rotor gedreht – und sicherte Denver den Titel."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welcher zweisportliche Superstar spielte 1992 am selben Tag ein Playoff-Spiel im Baseball und ein NFL-Footballspiel?",
    "a": [
      "Deion Sanders ('Prime Time')",
      "Bo Jackson",
      "Brian Jordan",
      "Herschel Walker"
    ],
    "exp": "Deion Sanders flog per Hubschrauber zwischen den Atlanta Falcons (NFL) und den Atlanta Braves (MLB) hin und her – der spektakulärste Doppelprofi aller Zeiten."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welchen bis heute unerreichten Rekord hält Ausnahmesprinter Randy Moss aus der Saison 2007?",
    "a": [
      "23 gefangene Touchdown-Pässe in einer einzigen regulären Saison",
      "300 Receiving Yards in einem einzigen Spielviertel",
      "Drei gefangene Touchdowns in vier aufeinanderfolgenden Spielen",
      "100 gefangene Pässe ohne einen einzigen liegengelassenen Ball (Drop)"
    ],
    "exp": "Als kongenialer Partner von Tom Brady fing Moss 2007 sagenhafte 23 Touchdown-Pässe und stellte eine historische Bestmarke für Wide Receiver auf."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "pro",
    "q": "Wer erfand in den 1960er Jahren den Begriff 'Sack' für das Zu-Boden-Bringen des Quarterbacks?",
    "a": [
      "Deacon Jones (Defensive End der Los Angeles Rams)",
      "Dick Butkus (Linebacker der Chicago Bears)",
      "Ernie Stautner (Tackle der Pittsburgh Steelers)",
      "Gino Marchetti (End der Baltimore Colts)"
    ],
    "exp": "Deacon Jones begründete den Begriff: 'Wie wenn man eine Stadt plündert und in Schutt und Asche legt – man packt den Quarterback in einen Sack (sack a city).'"
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Star-Running-Back dominierte die 1950er und 60er Jahre so sehr, dass er in jedem einzelnen Karrierejahr zum Pro Bowl gewählt wurde?",
    "a": [
      "Jim Brown (Cleveland Browns)",
      "Gale Sayers (Chicago Bears)",
      "O.J. Simpson (Buffalo Bills)",
      "Earl Campbell (Houston Oilers)"
    ],
    "exp": "Jim Brown gewann in 8 seiner 9 NFL-Jahre die Rushing-Krone, hielt einen Schnitt von 104,3 Yards pro Spiel und trat auf dem Höhepunkt ab, um Filmschauspieler zu werden."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Mit welchen spektakulären Wurftechniken revolutionierte Patrick Mahomes die moderne Quarterback-Position?",
    "a": [
      "No-Look-Pässe, Baseball-Sidearm-Würfe und Pässe mit der schwachen linken Hand",
      "Dropkicks aus vollem Lauf über die gegnerische Defensive Line",
      "Rückwärtspässe durch die eigenen Beine direkt zum Running Back",
      "Pässe, die er mit der Fußspitze in die Arme seiner Receiver lupft"
    ],
    "exp": "Mahomes nutzte seine Baseball-Vergangenheit für unkonventionelle Wurfwinkel, schaute Verteidiger ins Leere und feierte 3 Super-Bowl-Siege vor seinem 29. Geburtstag."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welches Markenzeichen trug Quarterback-Legende Johnny Unitas in den 1950er und 60er Jahren?",
    "a": [
      "Einen markanten Bürstenschnitt und klassische schwarze High-Top-Schuhe",
      "Einen Bart im Holzfäller-Stil und abgeschnittene Trikotärmel",
      "Zwei verschiedene Schuhfarben als Protest gegen Rassentrennung",
      "Einen Lederhelm ohne Gesichtsgitter bis zu seinem Karriereende"
    ],
    "exp": "Unitas war der Prototyp des modernen Quarterbacks: Bürstenfrisur, schwarze hohe Schuhe und ein eisernes Gespür für den Two-Minute-Drill."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Pass-Rusher hält mit 200 Karrieresacks den ewigen Rekord der NFL-Geschichte?",
    "a": [
      "Bruce Smith (Buffalo Bills)",
      "Reggie White (Packers & Eagles)",
      "Kevin Greene (Rams & Steelers)",
      "Julius Peppers (Panthers & Bears)"
    ],
    "exp": "Bruce Smith terrorisierte über zwei Jahrzehnte hinweg die gegnerischen Offensiven und knackte als einziger Spieler der NFL-Historie die 200-Sack-Marke."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welchen emotionalen Tanz zelebrierte Linebacker Ray Lewis vor jedem Heimspiel der Baltimore Ravens beim Einlauf?",
    "a": [
      "Den 'Squirrel Dance' (unter ohrenbetäubendem Jubel und Pyro-Effekten)",
      "Den 'Raven Glide' mit weit ausgebreiteten Armen",
      "Den 'Baltimore Bounce' auf der 50-Yard-Linie",
      "Einen irischen Stepptanz mit seinen Mitspielern"
    ],
    "exp": "Lewis rutschte auf die Knie, riss Gras aus dem Rasen und schrie: Der martialische 'Squirrel Dance' brachte das M&T Bank Stadium jedes Mal zum Kochen."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "pro",
    "q": "Welcher legendäre Free Safety der Ravens war berühmt dafür, Quarterbacks mit absichtlichen Fehlstellungen in Interceptions zu locken?",
    "a": [
      "Ed Reed",
      "Troy Polamalu",
      "Rod Woodson",
      "Darren Sharper"
    ],
    "exp": "Ed Reed studierte Videos wie kein Zweiter: Er täuschte bewusst Deckungsfehler an, um Quarterbacks zu riskanten Pässen zu verleiten – und fing sie eiskalt ab."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Running Back hält mit 18.355 Yards den Allzeit-Rekord für die meisten erlaufenen Yards der NFL-Geschichte?",
    "a": [
      "Emmitt Smith (Dallas Cowboys)",
      "Walter Payton (Chicago Bears)",
      "Frank Gore (San Francisco 49ers)",
      "Adrian Peterson (Minnesota Vikings)"
    ],
    "exp": "Hinter der bärenstarken Cowboys-Offensive Line der 90er Jahre überholte Emmitt Smith im Oktober 2002 Walter Payton und setzte den Meilenstein auf 18.355 Yards."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welcher Quarterback gewann als einziger Spieler in der NFL-Geschichte 5-mal die Auszeichnung als wertvollster Spieler (MVP)?",
    "a": [
      "Peyton Manning",
      "Tom Brady",
      "Aaron Rodgers",
      "Brett Favre"
    ],
    "exp": "Manning wurde 2003, 2004, 2008, 2009 (mit den Colts) und 2013 (mit den Broncos) zum MVP gekürt – ein unübertroffener Rekord."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Ausnahmeathlet brach 2012 nur neun Monate nach einem Kreuzbandriss fast den Rushing-Rekord (2.097 Yards)?",
    "a": [
      "Adrian Peterson (Minnesota Vikings)",
      "Chris Johnson (Tennessee Titans)",
      "Le'Veon Bell (Pittsburgh Steelers)",
      "Marshawn Lynch (Seattle Seahawks)"
    ],
    "exp": "Peterson ('All Day') kehrte nach schwerer Knieverletzung wie ein Übermensch zurück, verpasste Eric Dickersons Rekord um nur 8 Yards und wurde MVP."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "pro",
    "q": "Welcher legendäre Running Back der Rams hält seit 1984 den Rekord für die meisten Rushing-Yards in einer einzigen Saison (2.105 Yards)?",
    "a": [
      "Eric Dickerson",
      "O.J. Simpson",
      "Terrell Davis",
      "Jamal Lewis"
    ],
    "exp": "Mit seiner markanten Brille und aufrechtem Galopp-Laufstil stellte Dickerson 1984 die Fabelmarke von 2.105 Yards auf, die bis heute Bestand hat."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welcher Tight End bildete mit Tom Brady bei den Patriots und Buccaneers eines der dominantesten Touchdown-Duos der Geschichte?",
    "a": [
      "Rob Gronkowski ('Gronk')",
      "Travis Kelce",
      "Tony Gonzalez",
      "Antonio Gates"
    ],
    "exp": "'Gronk' war mit seiner Wucht und Fangtechnik nicht zu stoppen. Seine Touchdown-Feiern ('Gronk Spike') wurden zum Kult der gesamten NFL."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Spieler hält den ewigen Rekord für die meisten gefangenen Bälle eines Tight Ends in der NFL-Historie (1.325 Catches)?",
    "a": [
      "Tony Gonzalez",
      "Jason Witten",
      "Shannon Sharpe",
      "Greg Olsen"
    ],
    "exp": "Der ehemalige College-Basketballer Tony Gonzalez definierte die Tight-End-Position völlig neu und fing in 17 Saisons 1.325 Pässe für 111 Touchdowns."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Steelers-Safety war für sein wildes, langes Haar und seine instinktiven Hechtsprünge über die Line of Scrimmage berühmt?",
    "a": [
      "Troy Polamalu",
      "Rodney Harrison",
      "John Lynch",
      "Steve Atwater"
    ],
    "exp": "Polamalus lockige Mähne war von Head & Shoulders für eine Million Dollar versichert. Seine Fähigkeit, den Snap zu antizipieren, machte ihn zur Legende."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welcher physische Sprint-Test gilt beim jährlichen NFL Scouting Combine in Indianapolis als Königsdisziplin?",
    "a": [
      "Der 40-Yard-Dash (Sprint über rund 36,6 Meter)",
      "Der 100-Meter-Hürdenlauf auf Kunstrasen",
      "Der 60-Yard-Pendellauf mit Richtungswechsel",
      "Der 20-Yard-Schlittensprint gegen Widerstand"
    ],
    "exp": "Beim 40-Yard-Dash entscheiden Hundertstelsekunden über Millionenverträge und Draft-Positionen. Scouts messen Beschleunigung und Höchstgeschwindigkeit."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welche Fabelzeit im 40-Yard-Dash stellte Xavier Worthy beim NFL Combine 2024 als neuen Allzeit-Rekord auf?",
    "a": [
      "4,21 Sekunden",
      "4,12 Sekunden",
      "4,32 Sekunden",
      "4,05 Sekunden"
    ],
    "exp": "Worthy unterbot die bisherige Bestmarke von John Ross (4,22 s) um eine Hundertstelsekunde und wurde kurz darauf von den Kansas City Chiefs gedraftet."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welches standardisierte Gewicht müssen NFL-Talente beim 'Bench Press'-Test (Bankdrücken) so oft wie möglich stemmen?",
    "a": [
      "225 Pfund (rund 102 Kilogramm)",
      "200 Pfund (rund 90,7 Kilogramm)",
      "250 Pfund (rund 113,4 Kilogramm)",
      "180 Pfund (rund 81,6 Kilogramm)"
    ],
    "exp": "Die Athleten drücken 225 lbs (102 kg) auf Wiederholungen. Kräftige Offensive Linemen schaffen hierbei oft über 35 bis 40 Wiederholungen."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welches markante Kleidungsstück erhalten neu aufgenommene Legenden bei der Zeremonie der Pro Football Hall of Fame?",
    "a": [
      "Ein maßgeschneidertes goldenes Sakko ('Gold Jacket')",
      "Einen schweren silbernen Siegelring mit Rubinbesatz",
      "Eine bestickte Krawatte mit dem Wappen von Ohio",
      "Einen weißen Seidenschal mit goldener Rückennummer"
    ],
    "exp": "Das berühmte 'Gold Jacket' und die lebensgroße Bronzebüste in Canton (Ohio) sind die höchsten Weihen, die ein Footballspieler erreichen kann."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "In welcher Stadt im US-Bundesstaat Ohio steht die offizielle Pro Football Hall of Fame?",
    "a": [
      "Canton",
      "Cleveland",
      "Cincinnati",
      "Columbus"
    ],
    "exp": "In Canton wurde die NFL 1920 gegründet. Seit 1963 pilgern Fans aus aller Welt in das dortige Hall of Fame Museum."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welcher Quarterback schrieb als 'Mr. Irrelevant' des Drafts 2022 Geschichte, indem er die 49ers direkt in den Super Bowl führte?",
    "a": [
      "Brock Purdy",
      "Trey Lance",
      "Gardner Minshew",
      "Sam Darnold"
    ],
    "exp": "Als Pick Nr. 262 an allerletzter Stelle ausgewählt, nutzte Purdy Verletzungen seiner Konkurrenten und etablierte sich sensationell als Elite-Quarterback."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Quarterback gilt neben Ryan Leaf als einer der größten 'Draft Busts' der Historie, nachdem ihn die Raiders 2007 an Position 1 zogen?",
    "a": [
      "JaMarcus Russell",
      "Akili Smith",
      "David Carr",
      "Vince Young"
    ],
    "exp": "Russell kassierte Millionen, erschien übergewichtig und schaute keine Taktikvideos (Coaches gaben ihm leere DVDs, was er nicht bemerkte). Nach 3 Jahren war Schluss."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher kognitive Test mit 50 Fragen in 12 Minuten wurde jahrzehntelang beim NFL Combine zur Messung der Auffassungsgabe genutzt?",
    "a": [
      "Der Wonderlic-Test",
      "Der Stanford-Binet-Test",
      "Der Raven-Matrizen-Test",
      "Der Wechsler-Intelligenztest"
    ],
    "exp": "Der Wonderlic-Test testete schnelles logisches Denken unter Zeitdruck. Punter Pat McInally schaffte als einziger Spieler jemals die perfekte Punktzahl von 50."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "pro",
    "q": "Welcher legendäre Head Coach der Cowboys revolutionierte den NFL Draft in den 60ern durch den ersten Einsatz von Großrechnern?",
    "a": [
      "Tom Landry",
      "Vince Lombardi",
      "Don Shula",
      "Chuck Noll"
    ],
    "exp": "Landry nutzte IBM-Computer zur Analyse von Scouting-Daten und fand so unterschätzte Athleten aus kleineren Colleges oder anderen Sportarten."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Wie viele reguläre Runden umfasst der NFL Draft im modernen Format seit 1994?",
    "a": [
      "7 Runden",
      "5 Runden",
      "10 Runden",
      "12 Runden"
    ],
    "exp": "Früher gab es bis zu 30 Runden (1943). Seit 1994 ist der Draft auf 7 Runden begrenzt, gefolgt von der Verpflichtung 'Undrafted Free Agents'."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Was sind sogenannte 'Compensatory Picks' im NFL Draft?",
    "a": [
      "Zusatz-Draftpicks am Ende der Runden 3 bis 7 für Teams, die wertvolle Free Agents verloren haben",
      "Straf-Picks, die Teams nach groben Regelverstößen an den Gegner abtreten müssen",
      "Sonder-Wahlrechte für Mannschaften, deren Stadion renoviert werden muss",
      "Garantierte Erstrunden-Picks für Teams mit mehr als fünf verletzten Stammspielern"
    ],
    "exp": "Verliert ein Team mehr teure Free Agents als es verpflichtet, vergibt die NFL nach einer Geheimformel Ausgleichs-Picks (Compensatory Picks)."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "pro",
    "q": "Welcher berühmte Draft Pick wurde 1989 an Position 2 als 'The Incredible Bulk' gefeiert, entpuppte sich aber als gigantischer Flop?",
    "a": [
      "Tony Mandarich (Offensive Tackle)",
      "Brian Bosworth (Linebacker)",
      "Charles Rogers (Wide Receiver)",
      "Courtney Brown (Defensive End)"
    ],
    "exp": "Zwischen Troy Aikman (#1), Barry Sanders (#3), Derrick Thomas (#4) und Deion Sanders (#5) wählten die Packers Mandarich – einer der berühmtesten Draft-Fehlgriffe."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Wie lange hat ein Team in der ersten Runde des NFL Drafts Zeit auf der Uhr, um seinen Pick offiziell einzureichen?",
    "a": [
      "10 Minuten (früher 15 Minuten)",
      "5 Minuten",
      "15 Minuten",
      "20 Minuten"
    ],
    "exp": "In Runde 1 hat jedes Team 10 Minuten Zeit. In Runde 2 sinkt die Zeit auf 7 Minuten, in den Runden 3 bis 7 auf 5 bzw. 4 Minuten."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welcher Star-Quarterback wurde im Draft 1998 an Position 1 gewählt, während Ryan Leaf an Position 2 abstürzte?",
    "a": [
      "Peyton Manning (von den Indianapolis Colts)",
      "Tom Brady (von den New England Patriots)",
      "Donovan McNabb (von den Philadelphia Eagles)",
      "Kurt Warner (aus der Arena Football League)"
    ],
    "exp": "Vor dem Draft stritt die Football-Welt: Manning oder Leaf? Die Colts wählten Manning (Hall of Fame), Leaf scheiterte dramatisch bei den Chargers."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welche berührende Geste zeichnet die Aufnahmezeremonie in Canton aus, wenn ein lebender Laudator den Spieler vorstellt?",
    "a": [
      "Das feierliche Enthüllen der eigenen Bronzebüste vor Familie und Fans",
      "Das Überreichen eines gravierten Football-Helms aus reinem Platin",
      "Das traditionelle Zerschneiden des Meistertrikots auf der Bühne",
      "Ein gemeinsamer Ehrenlauf über die 100 Yards des Hall of Fame Stadions"
    ],
    "exp": "Der Moment, in dem das Tuch von der Bronzebüste gezogen wird und die Legende ihr metallenes Ebenbild erblickt, ist der emotionale Höhepunkt der Zeremonie."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "pro",
    "q": "Wie viele Jahre nach seinem offiziellen Rücktritt ist ein NFL-Spieler frühestens für die Hall of Fame wählbar?",
    "a": [
      "Mindestens 5 Jahre",
      "Mindestens 3 Jahre",
      "Mindestens 10 Jahre",
      "Sofort nach Saisonende"
    ],
    "exp": "Ein Spieler muss 5 aufeinanderfolgende Spielzeiten inaktiv gewesen sein, bevor das Auswahlkomitee über seine Aufnahme beraten darf."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Kicker wurde als erst dritter reiner Kicker der Geschichte in die Pro Football Hall of Fame aufgenommen?",
    "a": [
      "Morten Andersen (nach Jan Stenerud)",
      "Adam Vinatieri",
      "Gary Anderson",
      "Jason Hanson"
    ],
    "exp": "Der Däne Morten Andersen ('The Great Dane') erzielte 2.544 Punkte und wurde 2017 in die Hall of Fame gewählt."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welcher Supermarkt-Mitarbeiter schaffte es über die Arena League in die NFL und wurde zweimal Liga-MVP und Super-Bowl-Champion?",
    "a": [
      "Kurt Warner",
      "Jake Delhomme",
      "Jeff Garcia",
      "Rich Gannon"
    ],
    "exp": "Kurt Warner räumte Regale bei 'Hy-Vee' in Iowa ein, bevor er 1999 die St. Louis Rams ('Greatest Show on Turf') zum Super Bowl führte – eine Hollywood-Story!"
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Star-Cornerback der Seahawks prägte mit Richard Sherman, Kam Chancellor und Earl Thomas die 'Legion of Boom'?",
    "a": [
      "Richard Sherman",
      "Patrick Peterson",
      "Aqib Talib",
      "Chris Harris Jr."
    ],
    "exp": "Die 'Legion of Boom' der Seahawks dominierte die Liga ab 2012 mit brutaler Physis, Trash-Talk und überragender Zonen-Deckung bis zum Super-Bowl-Titel."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "pro",
    "q": "Welcher Spieler hält den Rekord für die meisten Touchdowns in einem einzigen NFL-Spiel (6 Touchdowns)?",
    "a": [
      "Ernie Nevers, Dub Jones, Gale Sayers und Alvin Kamara (jeweils 6 TDs)",
      "Jerry Rice, Randy Moss und Terrell Owens",
      "Walter Payton, Emmitt Smith und Barry Sanders",
      "Tom Brady, Peyton Manning und Patrick Mahomes"
    ],
    "exp": "Alvin Kamara schaffte das Kunststück an Heiligabend 2020 gegen die Vikings und zog mit den Legenden Nevers (1929), Jones (1951) und Sayers (1965) gleich."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Was versteht man unter dem popkulturellen Phänomen des 'Madden Curse'?",
    "a": [
      "Dass Stars auf dem Cover des Videospiels 'Madden NFL' in der Folgesaison Verletzungen oder Formkrisen erleiden",
      "Dass Teams nach einer Niederlage gegen John Madden fünf Jahre lang kein Playoff-Spiel gewannen",
      "Dass Kommentator John Madden vor laufender Kamera versehentlich Spielzüge verriet",
      "Dass Stadien mit schlechtem Rasen nach Madden-Kritik abgerissen werden mussten"
    ],
    "exp": "Garrison Hearst, Daunte Culpepper, Michael Vick, Shaun Alexander, Peyton Hillis: Zahlreiche Cover-Stars verletzten sich schwer oder stürzten sportlich ab."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welche Slapstick-Panne ging an Thanksgiving 2012 als 'Butt Fumble' in die Football-Geschichte ein?",
    "a": [
      "Jets-Quarterback Mark Sanchez rannte direkt in das Gesäß seines eigenen Lineman und verlor den Ball",
      "Ein Center snappte den Ball versehentlich durch die eigenen Beine ins Gesicht des Schiedsrichters",
      "Ein Kicker rutschte beim Anlauf aus und beförderte den Ball mit dem Hosenboden ins Seitenaus",
      "Ein Returner setzte sich beim Fangen auf den Ball und rutschte ungebremst in die Endzone"
    ],
    "exp": "Sanchez kollidierte frontal mit dem Hintern von Lineman Brandon Moore: Fumble, die Patriots trugen den Ball zum Touchdown – das ewige Spott-Video von ESPN."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welche Rekord-Distanz stellte Justin Tucker von den Baltimore Ravens 2021 für das längste Field Goal der NFL-Geschichte auf?",
    "a": [
      "66 Yards (der Ball prallte von der Querlatte ins Ziel)",
      "63 Yards (in dünner Höhenluft von Denver)",
      "70 Yards (unterstützt von starkem Rückenwind)",
      "60 Yards (nach abgelaufener regulärer Spielzeit)"
    ],
    "exp": "Gegen Detroit hämmerte Tucker das Ei mit Ablauf der Uhr aus unglaublichen 66 Yards ab. Der Ball traf die Querstange, sprang hoch und fiel drüber – Sieg!"
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welche kuriose Panne unterlief Leon Lett von den Dallas Cowboys in Super Bowl XXVII kurz vor der Goalline?",
    "a": [
      "Er jubelte zu früh und Bills-Receiver Don Beebe schlug ihm den Ball von hinten aus der Hand",
      "Er stolperte über die ausgestreckte Kamera eines Spielfeldfotografen",
      "Er warf den Ball 2 Yards vor der Endzone vor lauter Freude ins Publikum",
      "Er kniete vor der Goalline ab, weil er dachte, das Spiel sei bereits vorbei"
    ],
    "exp": "Lett hielt den Ball arrogant mit einer Hand zur Seite. Der herangesprintete Don Beebe schlug ihm das Ei Zentimeter vor der Linie ins Aus – Touchback statt TD!"
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Fauxpas passierte demselben Leon Lett im Schneesturm an Thanksgiving 1993 gegen die Dolphins?",
    "a": [
      "Er rutschte in ein bereits geblocktes Field Goal und machte den Ball wieder frei für Miami",
      "Er warf einen Schneeball nach dem gegnerischen Kicker und kassierte 15 Yards Strafe",
      "Er vertauschte in der Kälte seine Schuhe und spielte mit zwei linken Stollen",
      "Er vergaß vor dem entscheidenden Spielzug seinen Helm in der Umkleidekabine"
    ],
    "exp": "Dallas hatte das Field Goal geblockt und das Spiel gewonnen. Lett schlitterte unglücklich in den Ball, Miami eroberte das Ei und traf im zweiten Versuch zum Sieg!"
  },
  {
    "cat": "legenden_rekorde",
    "diff": "pro",
    "q": "Welchen legendären Fehler beging Jim Marshall von den Minnesota Vikings im Oktober 1964 gegen San Francisco?",
    "a": [
      "Er eroberte einen Fumble und sprintete über 66 Yards in die falsche Endzone zum Safety",
      "Er warf den Spielball nach einem Tackle versehentlich dem gegnerischen Coach zu",
      "Er tackelte seinen eigenen Quarterback an der 1-Yard-Linie",
      "Er blockte einen Punt und warf den Ball danach selbst durch die eigenen Torstangen"
    ],
    "exp": "Marshall schnappte sich den Ball und rannte triumphierend 66 Yards in die eigene Endzone. Er warf den Ball jubelnd weg – und schenkte dem Gegner 2 Punkte (Safety)."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Was war der berüchtigte 'Fog Bowl' im Playoff-Spiel zwischen den Bears und den Eagles im Dezember 1988?",
    "a": [
      "Dichter Seenebel vom Lake Michigan zog auf, sodass Spieler und Zuschauer kaum 10 Meter weit sahen",
      "Rauchbomben unzufriedener Fans hüllten das gesamte Spielfeld für 45 Minuten ein",
      "Eine defekte Heißluftanlage füllte die Halle mit undurchdringlichem Wasserdampf",
      "Ein plötzlicher Temperatursturz erzeugte eine Dampfwolke über dem warmen Naturrasen"
    ],
    "exp": "Im Soldier Field zog dichter Nebel auf: TV-Kameras sahen nichts mehr, Schiedsrichter mussten Spielern zurufen, wo der Ball gelandet war. Chicago gewann 20:12."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welche maximale Länge kann ein Touchdown-Spielzug in der NFL theoretisch und praktisch betragen?",
    "a": [
      "109 Yards (vom hintersten Punkt der eigenen Endzone bis zur gegnerischen Endzone)",
      "100 Yards (nur die Distanz zwischen den beiden Goallines zählt)",
      "120 Yards (die gesamte Spielfläche inklusive beider Endzonen)",
      "105 Yards (gemessen ab der eigenen 5-Yard-Linie)"
    ],
    "exp": "Antonio Cromartie (2007) und Jamal Agnew (2021) trugen jeweils verfehlte Field Goals über die maximale Rekorddistanz von 109 Yards zum Touchdown zurück."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Warum feierten die Philadelphia Eagles 2022 und 2023 mit dem Spielzug 'Tush Push' ('Brotherly Shove') weltweite Schlagzeilen?",
    "a": [
      "Zwei Spieler schieben Quarterback Jalen Hurts bei kurzen Distanzen mit aller Kraft von hinten an",
      "Die gesamte Offensive Line hebt den Running Back über die Köpfe der gegnerischen Abwehr",
      "Der Kicker schießt den Ball mit der Ferse nach hinten auf den heranstürmenden Safety",
      "Der Quarterback wirft sich auf den Boden und rollt wie ein Fass über die Goalline"
    ],
    "exp": "Der fast unaufhaltsame Quarterback Sneak der Eagles (Erfolgsquote über 90 %) löste heiße Debatten über ein mögliches Verbot des Anschiebens aus."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welches Spiel wird von Fans der New England Patriots als 'Snow Bowl' (Tuck Rule Game) 2002 gefeiert?",
    "a": [
      "Das AFC-Divisional-Playoff im dichten Schneetreiben gegen die Oakland Raiders",
      "Das Regular-Season-Spiel im Eisregen gegen die Miami Dolphins",
      "Das AFC Championship Game im Schneesturm bei den Pittsburgh Steelers",
      "Der Super Bowl XXXVI gegen die St. Louis Rams in New Orleans"
    ],
    "exp": "Im letzten Spiel im alten Foxboro Stadium kickte Adam Vinatieri im tiefen Schnee zwei legendäre Field Goals zum Sieg nach Tom Bradys umstrittenem 'Tuck'."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "pro",
    "q": "Was war der 'Snowplow Game' der New England Patriots gegen die Miami Dolphins im Jahr 1982?",
    "a": [
      "Ein Sträfling auf einem Schneepflug räumte mitten im Spiel eine freie Stelle für das siegbringende Field Goal frei",
      "Ein Schneepflug rammte versehentlich den Mannschaftsbus der gegnerischen Dolphins",
      "Die Schiedsrichter unterbrachen das Spiel, damit Fans mit Schaufeln die Goalline freilegen konnten",
      "Ein Schneesturm wehte das Tornetz weg, woraufhin ein Pflug als Ersatzpfosten diente"
    ],
    "exp": "Mark Henderson fuhr mit seinem John-Deere-Pflug aufs Feld und räumte auf Geheiß von Coach Ron Meyer exakt die Stelle für Kickers John Smiths 3:0-Siegkick frei."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welcher Kicker erzielte die meisten Karriere-Punkte in der Geschichte der National Football League (2.673 Punkte)?",
    "a": [
      "Adam Vinatieri",
      "Morten Andersen",
      "Gary Anderson",
      "Jason Elam"
    ],
    "exp": "Vinatieri ('Mr. Clutch') kickte entscheidende Super-Bowl-Siege für die Patriots und brillierte später bei den Colts – unerreichte 2.673 Punkte in 24 Jahren."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Head Coach gewann mit den New England Patriots sechs Super-Bowl-Titel und trug stets abgeschnittene Kapuzenpullover ('Hoodies')?",
    "a": [
      "Bill Belichick",
      "Andy Reid",
      "Pete Carroll",
      "Bill Cowher"
    ],
    "exp": "Belichicks mürrische Pressekonferenzen und seine zerschnittenen grauen Hoodies wurden zum Kult-Markenzeichen der erfolgreichsten Dynastie der NFL."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Star-Cornerback prägte das Zitat 'You play to win the game!' während einer legendären Pressekonferenz?",
    "a": [
      "Herm Edwards (damals Head Coach der New York Jets)",
      "Deion Sanders",
      "Darrelle Revis",
      "Charles Woodson"
    ],
    "exp": "Edwards' emotionale Brandrede aus dem Jahr 2002: 'Hello? You play to win the game! You don't play just to play it!' ist einer der berühmtesten O-Töne der Sportwelt."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Was bezeichnet der Begriff 'Revis Island' im Zusammenhang mit Cornerback Darrelle Revis?",
    "a": [
      "Dass gegnerische Top-Receiver in seiner 1-gegen-1-Deckung komplett isoliert und abgemeldet waren",
      "Eine private Südseeinsel, die Revis nach seinem ersten Mega-Vertrag kaufte",
      "Ein spezielles Reha-Zentrum für verletzte Abwehrspieler in New York",
      "Einen Strafbereich auf der Trainerbank für unkonzentrierte Passverteidiger"
    ],
    "exp": "Revis deckte die besten Receiver der Welt ohne Safety-Hilfe ab. Wer gegen ihn spielte, war auf 'Revis Island' gefangen und sah keinen einzigen Ball."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Quarterback warf 2019 als erster Spieler der NFL-Historie 30 Touchdowns und 30 Interceptions in einer einzigen Saison?",
    "a": [
      "Jameis Winston (Tampa Bay Buccaneers)",
      "Brett Favre (New York Jets)",
      "Ryan Fitzpatrick (Miami Dolphins)",
      "Carson Palmer (Arizona Cardinals)"
    ],
    "exp": "Winstons wilde Saison endete passenderweise mit einem Pick-Six in der Overtime – der erste '30/30-Club' der Football-Geschichte."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "pro",
    "q": "Welcher legendäre Trainer erfand den 'West Coast Offense'-Angriffsstil mit kurzen, präzisen Pässen statt langen Würfen?",
    "a": [
      "Bill Walsh (San Francisco 49ers)",
      "Don Coryell (San Diego Chargers)",
      "Jimmy Johnson (Dallas Cowboys)",
      "Joe Gibbs (Washington Redskins)"
    ],
    "exp": "Bill Walsh nutzte kurze Pässe als Ersatz für den Lauf ('Horizontales Passspiel'). Mit Joe Montana und Jerry Rice dominierte er damit die 1980er Jahre."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Spieler hält mit 14 aufeinanderfolgenden Pro-Bowl-Teilnahmen den ewigen Rekord der NFL?",
    "a": [
      "Tom Brady",
      "Jerry Rice",
      "Ray Lewis",
      "Lawrence Taylor"
    ],
    "exp": "Fünf Spieler teilen sich die Rekordmarke von 14 Pro-Bowl-Nominierungen – Tom Brady erreichte diesen Meilenstein durch seine beispiellose Beständigkeit."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Welcher Quarterback gewann 2024 seinen dritten Super Bowl MVP und zog damit mit Joe Montana gleich?",
    "a": [
      "Patrick Mahomes",
      "Aaron Rodgers",
      "Matthew Stafford",
      "Russell Wilson"
    ],
    "exp": "Mahomes führte die Chiefs in Super Bowl LVIII zum Overtime-Triumph und sicherte sich seinen 3. MVP-Award – nur Tom Brady (5) hat mehr."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "pro",
    "q": "Was war der 'Holy Roller' Spielzug im September 1978 zwischen den Raiders und den Chargers?",
    "a": [
      "Raiders-QB Ken Stabler rollte den Ball kurz vor dem Sack absichtlich nach vorn, Mitspieler kickten ihn zum TD ins Ziel",
      "Ein Schiedsrichter rollte sich über den Rasen, um einen Fumble unter seinem Körper zu schützen",
      "Der Kicker schoss ein Field Goal flach über den Boden durch die Beine der Abwehr",
      "Zwei Spieler rollten den verletzten Quarterback an den Beinen aus der gegnerischen Endzone"
    ],
    "exp": "Stabler 'fumblierte' absichtlich nach vorne, Pete Banaszak und Dave Casper schoben das Ei in die Endzone: Touchdown! Die NFL verbot danach das Vorwärtsrollen bei Fumbles."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Spieler hält den Rekord für die meisten abgefangenen Pässe (Interceptions) in einer einzigen Saison (14 Interceptions 1952)?",
    "a": [
      "Dick 'Night Train' Lane (Los Angeles Rams)",
      "Paul Krause (Minnesota Vikings)",
      "Mel Blount (Pittsburgh Steelers)",
      "Emlen Tunnell (New York Giants)"
    ],
    "exp": "Als Rookie stellte 'Night Train' Lane 1952 in nur 12 Spielen den Fabelrekord von 14 Interceptions auf – eine Bestmarke, die bis heute unberührt blieb."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welcher Spieler hält mit 81 Interceptions den ewigen NFL-Karriere-Rekord für die meisten abgefangenen Pässe?",
    "a": [
      "Paul Krause",
      "Emlen Tunnell",
      "Rod Woodson",
      "Ed Reed"
    ],
    "exp": "Krause fing für Washington und die 'Purple People Eaters' der Minnesota Vikings 81 Pässe ab und wurde 1998 in die Hall of Fame aufgenommen."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "pro",
    "q": "Welcher Ausnahmespieler wurde als allererster reiner Punter der NFL-Geschichte in die Pro Football Hall of Fame aufgenommen?",
    "a": [
      "Ray Guy (Oakland Raiders)",
      "Shane Lechler (Houston Texans)",
      "Sammy Baugh (Washington Redskins)",
      "Johnny Hekker (St. Louis Rams)"
    ],
    "exp": "Ray Guy war so dominant, dass er 2014 als erster reiner Punter überhaupt in die Hall of Fame gewählt wurde; die Auszeichnung für den besten College-Punter trägt seinen Namen."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Was rief Running Back Marshawn Lynch auf einer berühmt gewordenen Super-Bowl-Pressekonferenz 29-mal hintereinander?",
    "a": [
      "'I'm just here so I won't get fined.'",
      "'No comment, ask my coach.'",
      "'Beast Mode all day long.'",
      "'Talk to my agent, please.'"
    ],
    "exp": "Um der drohenden NFL-Geldstrafe von 500.000 Dollar zu entgehen, erschien Lynch pünktlich – und antwortete auf ausnahmslos jede Frage mit demselben Satz."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welche kuriose Glücks-Sitte pflegte Quarterback Brett Favre vor fast jedem seiner Spiele?",
    "a": [
      "Er aß zwei Hot Dogs mit Ketchup und trank einen großen Becher Schokomilch",
      "Er zog seine Socken absichtlich falsch herum an",
      "Er berührte dreimal das Stadioneingangstor mit seiner Stirn",
      "Er ließ sich vor dem Aufwärmen von seinem Center die Hände tapen"
    ],
    "exp": "Favre liebte bodenständige Rituale: Vor dem Kickoff gehörten Fast Food und lockere Scherze in der Kabine fest zu seiner mentalen Spielvorbereitung."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Was gelang Dan Marino 1994 im legendären 'Fake Spike Play' gegen die New York Jets?",
    "a": [
      "Er täuschte das Stoppen der Uhr an, warf stattdessen aber den siegbringenden Touchdown-Pass",
      "Er täuschte einen Kniefall an und sprintete selbst über 20 Yards in die gegnerische Endzone",
      "Er warf den Ball absichtlich gegen den Helm des Schiedsrichters, um Zeit zu gewinnen",
      "Er übergab den Ball verdeckt durch die Beine an den bereitstehenden Fullback"
    ],
    "exp": "Marino signalisierte 'Clock, Clock!', doch statt den Ball zu spiken, feuerte er einen Pass auf Mark Ingram zum 28:24-Comeback-Sieg – genialer Trickspielzug!"
  },
  {
    "cat": "legenden_rekorde",
    "diff": "easy",
    "q": "Was vollbrachte John Elway im AFC Championship Game 1987 in Cleveland ('The Drive')?",
    "a": [
      "Er führte die Broncos in 5 Minuten über 98 Yards zum Ausgleich und schließlich zum Sieg",
      "Er warf vier Touchdown-Pässe innerhalb der letzten zwei Spielminuten des vierten Viertels",
      "Er fing eine entscheidende Interception in der eigenen Endzone als Ersatz-Safety",
      "Er erzielte ein 55-Yard-Field-Goal mit links nach einer Verletzung des Stammkickers"
    ],
    "exp": "Mit dem Rücken zur Wand startete Elway an der eigenen 2-Yard-Linie und marschierte über 98 Yards in 15 Spielzügen zum 20:20 – ein Meisterwerk der NFL-Historie."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welchen Meilenstein erreichte Devin Hester 2024 mit seiner Aufnahme in die Hall of Fame?",
    "a": [
      "Er wurde als allererster reiner Return-Specialist der NFL-Geschichte nach Canton gewählt",
      "Er wurde zum jüngsten Mitglied aller Zeiten in der Pro Football Hall of Fame",
      "Er trat als einziger Spieler ohne einen einzigen regulären Offense-Snap ein",
      "Er wurde von allen Stimmberechtigten im allerersten Wahlgang einstimmig gewählt"
    ],
    "exp": "Mit 20 Return-Touchdowns (14 Punts, 5 Kickoffs, 1 missed FG) ist Hester der beste Returner aller Zeiten und krönte seine Karriere mit dem Hall-of-Fame-Einzug."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Was geschah, als Bo Jackson 1987 bei 'Monday Night Football' einen 91-Yard-Touchdown gegen Seattle erlief?",
    "a": [
      "Er lief ungebremst durch die Endzone und verschwand im Spielertunnel des Kingdome",
      "Er sprang über die 2 Meter hohe Werbebande direkt auf die Tribüne der Seahawks-Fans",
      "Er warf den Ball aus vollem Lauf über das geschlossene Hallendach des Stadions",
      "Er überrollte auf der Goalline drei Schiedsrichter und zwei Kameramänner gleichzeitig"
    ],
    "exp": "Bo Jackson war so schnell, dass er im Kingdome nicht rechtzeitig bremsen konnte und einfach durch den Ausgangstunnel weiter in die Katakomben sprintete."
  },
  {
    "cat": "legenden_rekorde",
    "diff": "mid",
    "q": "Welchen Uralt-Rekord von Johnny Unitas brach Drew Brees im Jahr 2012 bei den Saints?",
    "a": [
      "Er warf in 54 aufeinanderfolgenden Spielen mindestens einen Touchdown-Pass",
      "Er absolvierte 100 Spiele in Serie ohne einen einzigen verletzungsbedingten Ausfall",
      "Er erzielte 50 Touchdowns in Folge ausschließlich im heimischen Hallenstadion",
      "Er vollendete 30 Pässe in Serie ohne eine einzige Incompletion in einem Spiel"
    ],
    "exp": "Unitas' Rekord von 47 Spielen aus den 1950ern galt als unknackbar, bis Drew Brees die Serie auf sagenhafte 54 Spiele ausbaute."
  }
];

  DATA.forEach(q => {
    if (!q.explanation && q.exp) q.explanation = q.exp;
    if (!q.exp && q.explanation) q.exp = q.explanation;
  });

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("american_football_legenden", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["american_football_legenden"] = DATA;
  }
})();
