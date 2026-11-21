// Unified quiz bank for "american_football_packers" (75 questions)
(function () {
  const DATA = [
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Wer gründete die Green Bay Packers im August 1919 gemeinsam mit George Whitney Calhoun?",
    "a": [
      "Earl 'Curly' Lambeau",
      "Vince Lombardi",
      "Bart Starr",
      "Don Hutson"
    ],
    "exp": "Curly Lambeau und Sportreporter George Whitney Calhoun gründeten das Team in der Redaktionsstube der 'Green Bay Press-Gazette'."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Woher stammt der Vereinsname 'Packers'?",
    "a": [
      "Von der Indian Packing Company, die 500 Dollar für die ersten Trikots spendete",
      "Von den Gepäckträgern am historischen Bahnhof von Green Bay",
      "Vom Verpacken riesiger Eisblöcke auf den zugefrorenen Seen Wisconsins",
      "Von einer örtlichen Kistenfabrik am Ufer des Fox River"
    ],
    "exp": "Lambeaus Arbeitgeber, die Fleischverpackungsfirma Indian Packing Company, stellte 500 $ für Trikots bereit – unter der Bedingung, dass das Team nach ihr benannt wird."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Was unterscheidet das Eigentümermodell der Packers von allen anderen US-Profisport-Franchises?",
    "a": [
      "Sie gehören über 530.000 Fan-Aktionären als gemeinnützige Aktiengesellschaft",
      "Das Team befindet sich im alleinigen Besitz der US-Bundesregierung",
      "Jeder Spieler wird bei Vertragsunterzeichnung automatisch Miteigentümer",
      "Das Franchise gehört zu 100 Prozent der Universität von Wisconsin"
    ],
    "exp": "Die Packers sind das einzige Fan-eigene Franchise der US-Major-Leagues. Es gibt keinen Milliardärs-Besitzer; Aktien werfen keine Dividende ab und sind unverkäuflich."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Warum trägt die Stadt Green Bay (rund 107.000 Einwohner) stolz den Beinamen 'Titletown'?",
    "a": [
      "Wegen der Rekordzahl von 13 NFL-Meisterschaften in der Clubgeschichte",
      "Weil dort die ersten Meisterschaftspokale aus Bronze gegossen wurden",
      "Weil kein anderes Team mehr College-Titel in Wisconsin errang",
      "Weil dort das offizielle Büro für US-Markenrechte seinen Sitz hatte"
    ],
    "exp": "Mit 13 NFL-Titeln (9 NFL Championships vor der Super-Bowl-Ära plus 4 Super Bowls) ist Green Bay die erfolgreichste Stadt der Football-Geschichte."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Was würde laut Vereinssatzung mit dem Vermögen geschehen, falls die Packers jemals aufgelöst werden sollten?",
    "a": [
      "Der gesamte Erlös ginge an die örtliche Kriegsveteranen-Stiftung 'Sullivan-Wallen Post'",
      "Das Vermögen würde gleichmäßig an alle Bürger der Stadt Green Bay verteilt",
      "Das Geld fiele automatisch an die National Football League in New York",
      "Der Betrag müsste für den Neubau einer Eishalle in Milwaukee verwendet werden"
    ],
    "exp": "Die Satzung schützt das Team vor Spekulanten: Niemand kann sich bereichern, ein Liquidationserlös flöße an die Veteranen-Organisation."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Wie lang ist die Warteliste für Dauerkarten im Lambeau Field mittlerweile rund?",
    "a": [
      "Über 140.000 Fans (Wartezeit oft über 30 bis 50 Jahre)",
      "Knapp 5.000 Fans (Wartezeit rund zwei Spielzeiten)",
      "Es gibt überhaupt keine Warteliste für Dauerkarten",
      "Genau 25.000 Fans (Wartezeit maximal fünf Jahre)"
    ],
    "exp": "In Green Bay werden Neugeborene oft sofort nach der Geburt auf die Warteliste gesetzt. Jedes Spiel seit 1960 ist restlos ausverkauft."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Wofür steht das berühmte weiße ovale 'G' auf den Helmen der Packers laut Original-Designer Dad Braisher?",
    "a": [
      "Es stand ursprünglich für 'Greatness' (Größe/Exzellenz)",
      "Es stand von Beginn an ausschließlich für die Stadt 'Green Bay'",
      "Es symbolisierte die Goldreserven des Bundesstaates Wisconsin",
      "Es war eine Hommage an Gründer George Whitney Calhoun"
    ],
    "exp": "Ausrüster Dad Braisher entwarf das Logo 1961 unter Vince Lombardi mit dem Leitgedanken 'Greatness' – heute steht es weltweit für Green Bay."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "In welchen Jahren gewannen die Packers ihre bisherigen vier Super-Bowl-Titel?",
    "a": [
      "Super Bowl I (1967), II (1968), XXXI (1997) und XLV (2011)",
      "Super Bowl III (1969), IV (1970), XX (1986) und L (2016)",
      "Super Bowl VI (1972), XII (1978), XXII (1988) und XXXII (1998)",
      "Super Bowl V (1971), X (1976), XXV (1991) und XLIX (2015)"
    ],
    "exp": "Die Packers gewannen die ersten beiden Super Bowls unter Lombardi, triumphierten 1997 mit Brett Favre und holten 2011 mit Aaron Rodgers den vierten Ring."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Wie lautet der berühmteste Schlachtruf und Anfeuerungsgesang der Fans im Lambeau Field?",
    "a": [
      "'Go Pack Go!'",
      "'Green and Gold forever!'",
      "'Packers rolling on!'",
      "'Hail to the Cheese!'"
    ],
    "exp": "Das eingängige 'Go Pack Go!' mit den markanten Fanfaren-Tönen ist einer der bekanntesten Fangesänge der gesamten Sportwelt."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welches Kopfbedeckungs-Utensil machten die Fans der Packers als Markenzeichen berühmt?",
    "a": [
      "Die dreieckigen gelben Schaumstoff-Käsehüte ('Cheeseheads')",
      "Grüne Wollmützen mit angenähten Widderhörnern",
      "Gelbe Schutzhelme aus den Sägewerken von Wisconsin",
      "Traditionelle bayerische Trachtenhüte mit Gamsbart"
    ],
    "exp": "Ralph Bruno erfand den 'Cheesehead' 1987 aus einer alten Schaumstoff-Couch, um den Spott von White-Sox-Fans über 'Käsefresser aus Wisconsin' mit Stolz zu tragen."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welche sympathische Tradition pflegen die Packers-Profis seit den 1950ern im sommerlichen Training Camp?",
    "a": [
      "Sie fahren auf Fahrrädern von einheimischen Kindern vom Stadion zum Trainingsplatz",
      "Sie backen gemeinsam Kirschkuchen für die Seniorenheime der Stadt",
      "Sie campieren gemeinsam in Zelten auf dem Rasen des Lambeau Fields",
      "Sie rudern im Kajak über den Fox River zur morgendlichen Taktiksitzung"
    ],
    "exp": "Kinder warten mit ihren Rädern vor der Kabine: Die Stars schnappen sich die kleinen Fahrräder, die Kinder tragen die Helme und laufen nebenher."
  },
  {
    "cat": "green_bay_packers",
    "diff": "pro",
    "q": "In welchen Original-Farben spielten die Packers in ihren Anfangsjahren unter Curly Lambeau?",
    "a": [
      "In Dunkelblau und Gold (Farben der University of Notre Dame)",
      "In Schwarz und Weiß (analog zur Acme Packing Company)",
      "In Rubinrot und Silber (Farben der regionalen Handelskammer)",
      "Von Beginn an exakt im heutigen Waldgrün und Sonnengelb"
    ],
    "exp": "Lambeau hatte für Knute Rocknes Notre Dame Fighting Irish gespielt und übernahm deren blau-goldene Farbkombination. Erst 1950 kam das heutige Grün."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welche Großstadt in Wisconsin trug von 1933 bis 1994 regelmäßig Heimspiele der Packers im County Stadium aus?",
    "a": [
      "Milwaukee",
      "Madison",
      "Kenosha",
      "Appleton"
    ],
    "exp": "Um wirtschaftlich im größeren Markt präsent zu sein, spielten die Packers 62 Jahre lang zwei bis drei Heimspiele pro Saison in Milwaukee."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Was war der 'Lombardi Time'-Grundsatz, den Trainerlegende Vince Lombardi von allen Spielern eisern einforderte?",
    "a": [
      "Wer nicht mindestens 15 Minuten vor dem Termin da war, galt als unentschuldigt zu spät",
      "Alle Uhren im Trainingszentrum wurden exakt nach der Atomuhr von Greenwich gestellt",
      "Nach 22:00 Uhr herrschte absolutes Ausgehverbot für Spieler und Assistenztrainer",
      "Jede Trainingseinheit musste auf die Sekunde genau 90 Minuten dauern"
    ],
    "exp": "'If you are 15 minutes early, you are on time. If you are on time, you are late!' Die 'Lombardi Time' prägte die Disziplin des Erfolgsteams."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Wie viele NFL-Meisterschaften errangen die Packers vor der Einführung des Super Bowls (1929–1965)?",
    "a": [
      "9 NFL Championships",
      "5 NFL Championships",
      "12 NFL Championships",
      "3 NFL Championships"
    ],
    "exp": "Curly Lambeau gewann 6 Titel (1929, 1930, 1931, 1936, 1939, 1944), Vince Lombardi legte vor dem Super Bowl drei weitere nach (1961, 1962, 1965)."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welche kulinarische Spezialität darf bei keinem Tailgating vor einem Packers-Spiel in Wisconsin fehlen?",
    "a": [
      "Bratwurst (in Bier und Zwiebeln pochiert und gegrillt) sowie Cheese Curds",
      "Clam Chowder Muschelsuppe im Sauerteigbrot",
      "Deep-Dish-Pizza nach Chicagoer Rezeptur",
      "Räucherlachs-Häppchen mit Frischkäse"
    ],
    "exp": "Wisconsin ist stark deutsch geprägt: Bier, 'Beer Brats' (Bratwürste) und frittierte 'Cheese Curds' (Käsebruch) sind das Herzstück der Fankultur."
  },
  {
    "cat": "green_bay_packers",
    "diff": "pro",
    "q": "Welches Packers-Trikot trug Ausnahmespieler Don Hutson, dessen Nummer als erste in der Clubgeschichte gesperrt wurde?",
    "a": [
      "Nummer 14",
      "Nummer 1",
      "Nummer 99",
      "Nummer 88"
    ],
    "exp": "Hutson fing 99 Touchdowns in einer Ära, als Passspiel noch eine Seltenheit war. Seine Nummer 14 wurde 1951 als erste Packers-Nummer offiziell 'retired'."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Wer ist der historische Hauptrivale der Green Bay Packers in der ältesten Fehde der NFL?",
    "a": [
      "Chicago Bears",
      "Minnesota Vikings",
      "Detroit Lions",
      "Dallas Cowboys"
    ],
    "exp": "Packers gegen Bears ist pure Football-Tradition. Seit 1921 lieferten sich beide Teams epische Schlachten um die Vorherrschaft im Mittleren Westen."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welchen eisigen Spitznamen trägt das Lambeau Field bei Frost und Winterspielen weltweit?",
    "a": [
      "'The Frozen Tundra'",
      "'The Arctic Dome'",
      "'The Ice Palace'",
      "'The Glacier Basin'"
    ],
    "exp": "NFL-Films-Legende John Facenda taufte das Stadion nach dem Ice Bowl von 1967 poetisch 'The Frozen Tundra'."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Wer erfand am 26. Dezember 1993 den berühmten 'Lambeau Leap' durch einen spontanen Sprung in die Fankurve?",
    "a": [
      "Safety LeRoy Butler",
      "Wide Receiver Sterling Sharpe",
      "Quarterback Brett Favre",
      "Defensive End Reggie White"
    ],
    "exp": "White eroberte einen Fumble und passte zu Butler: Nach dem Touchdown sprang Butler vor Freude in die Endzonen-Fans – der 'Lambeau Leap' war geboren!"
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welche extremen Wetterbedingungen herrschten am 31. Dezember 1967 beim legendären 'Ice Bowl' gegen Dallas?",
    "a": [
      "Minus 25 Grad Celsius (Windchill minus 44 Grad!) und gefrorener Rasen",
      "Ein meterhoher Schneesturm mit Nullsicht im gesamten Stadion",
      "Gefrierender Platzregen bei genau null Grad mit fingerdickem Glatteis",
      "Orkanböen von über 120 km/h, die beide Torpfosten umknickten"
    ],
    "exp": "Der Schiedsrichter-Pfeife fror am Mund fest und riss Haut von den Lippen ab. Die neu installierte Rasenheizung versagte und verwandelte das Feld in eine Eisbahn."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Wie erzielte Bart Starr 13 Sekunden vor dem Ende des 'Ice Bowl' den siegbringenden Touchdown zum 21:17?",
    "a": [
      "Mit einem Quarterback Sneak durch die Mitte hinter dem Block von Jerry Kramer",
      "Mit einem 40-Yard-Pass in die Ecke auf Boyd Dowler",
      "Durch einen verdeckten Handoff auf Fullback Chuck Mercein",
      "Durch ein artistisches 45-Yard-Field-Goal mit dem gefrorenen Ball"
    ],
    "exp": "Starr sprach den Spielzug in der Auszeit mit Lombardi ab: Statt zu passen, glitt er hinter Kramers perfektem Block über die Torlinie – Packers-Sieg!"
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Unter welchem Namen wurde das heutige Lambeau Field bei seiner Eröffnung 1957 ursprünglich eingeweiht?",
    "a": [
      "New City Stadium",
      "Packer Park",
      "Titletown Arena",
      "Fox River Stadium"
    ],
    "exp": "1965, wenige Monate nach dem Tod von Gründer Curly Lambeau, benannte die Stadt das Stadion zu seinen Ehren in 'Lambeau Field' um."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Was ist das Besondere an den meisten Zuschauer-Sitzplätzen im Lambeau Field im Vergleich zu modernen NFL-Arenen?",
    "a": [
      "Es sind durchgehende Aluminium-Sitzbänke ohne Einzelsitzschalen",
      "Die Tribünen bestehen aus massivem Granitstein aus Wisconsin",
      "Es gibt auf den Unterrängen ausschließlich Stehplätze für Dauerkarteninhaber",
      "Alle Sitze verfügen über integrierte elektrische Sitzheizungen"
    ],
    "exp": "Die Bänke bringen Nostalgie pur: Fans rücken im Winter eng zusammen und mieten sich am Eingang isolierende Schaumstoff-Rückenpolster."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welche beiden imposanten Bronzestatuen begrüßen die Fans vor dem Haupteingang des Lambeau Fields?",
    "a": [
      "Curly Lambeau und Vince Lombardi",
      "Bart Starr und Brett Favre",
      "Reggie White und Ray Nitschke",
      "Don Hutson und Paul Hornung"
    ],
    "exp": "Die überlebensgroßen Statuen von Gründer Curly Lambeau und Erfolgstrainer Vince Lombardi flankieren das Atrium des Stadions."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welchen unvergessenen Signature-Spielzug perfektionierten die Packers unter Vince Lombardi in den 60er Jahren?",
    "a": [
      "Den 'Lombardi Sweep' (Power Sweep mit vorblockenden Guards)",
      "Den 'Triple Option Option-Pitch' an die Außenlinie",
      "Die 'Hail Mary' über mehr als 60 Yards Flugdistanz",
      "Den 'Flea Flicker' Doppelpass zwischen Running Back und Quarterback"
    ],
    "exp": "Der Sweep war simpel, aber gnadenlos präzise: Die Guards Jerry Kramer und Fuzzy Thurston zogen nach außen und räumten alles für Jim Taylor und Paul Hornung ab."
  },
  {
    "cat": "green_bay_packers",
    "diff": "pro",
    "q": "Was passierte mit der unterirdischen Rasenheizung des Lambeau Fields in der Nacht vor dem Ice Bowl?",
    "a": [
      "Das Kondenswasser fror ein und verwandelte die Feuchtigkeit im Boden in spiegelglattes Eis",
      "Ein Stromausfall im gesamten Brown County legte die gesamte Anlage lahm",
      "Die Heizrohre explodierten unter dem Druck heißer Dampfschwaden",
      "Saboteure aus Dallas drehten heimlich die Hauptventile der Heizung zu"
    ],
    "exp": "Als die Plane morgens abgezogen wurde, traf die feuchte Luft auf arktische minus 25 Grad: Das Wasser gefror blitzartig zu einer Betonschicht aus Eis."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welche beiden Teams standen den Packers in Super Bowl I und Super Bowl II als AFL-Gegner gegenüber?",
    "a": [
      "Kansas City Chiefs (Super Bowl I) und Oakland Raiders (Super Bowl II)",
      "New York Jets und Miami Dolphins",
      "San Diego Chargers und Boston Patriots",
      "Buffalo Bills und Houston Oilers"
    ],
    "exp": "Die Packers schlugen die Chiefs mit 35:10 in Los Angeles und verteidigten den Titel ein Jahr später mit 33:14 gegen die Raiders in Miami."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welcher Packers-Receiver fing in Super Bowl I zwei Touchdowns, nachdem er die Nacht zuvor feuchtfröhlich durchgemacht hatte?",
    "a": [
      "Max McGee",
      "Carroll Dale",
      "Boyd Dowler",
      "Marv Fleming"
    ],
    "exp": "McGee dachte, er würde als Ersatz nie spielen, ging aus und trank. Als Boyd Dowler sich früh verletzte, glänzte der verkatert eingewechselte McGee mit 138 Yards und 2 TDs!"
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welches legendäre Zitat von Vince Lombardi über den unbedingten Siegeswillen ging in den US-Sprachgebrauch ein?",
    "a": [
      "'Winning isn't everything; it's the only thing.'",
      "'The best defense is a relentless offense.'",
      "'Show me a good loser and I show you a winner.'",
      "'Pain is temporary, a Packers ring is forever.'"
    ],
    "exp": "Obwohl das Zitat ursprünglich von UCLA-Coach Red Sanders stammte, machte Lombardi den Satz zur weltweiten Philosophie für Spitzenleistung."
  },
  {
    "cat": "green_bay_packers",
    "diff": "pro",
    "q": "Was antwortete Vince Lombardi auf die Frage, was er von Perfektion im Sport halte?",
    "a": [
      "'Perfection is not attainable, but if we chase perfection we can catch excellence.'",
      "'Perfection is what happens when talent works harder than luck.'",
      "'Perfection belongs to the angels, not to mortal football players.'",
      "'Perfection is boring; give me ten disciplined fighters instead.'"
    ],
    "exp": "'Perfektion ist unerreichbar, aber wenn wir Perfektion jagen, können wir Exzellenz einfangen.' Einer der schönsten Leitsätze der Sportgeschichte."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Warum dürfen gegnerische Spieler laut ungeschriebenem Gesetz nach einem Touchdown im Lambeau Field keinen Lambeau Leap machen?",
    "a": [
      "Sie werden von den Fans mit Bier überschüttet, weggestoßen oder ignoriert",
      "Die NFL verhängt dafür automatisch eine 15-Yard-Strafe wegen Verhöhnung",
      "Die Stadionordnung untersagt Gastspielern das Betreten der ersten Fanreihe",
      "Die Ordner erteilen dem gegnerischen Spieler sofortigen Stadionverweis"
    ],
    "exp": "Wer als Gegner den Sprung wagt, spürt die Härte von Green Bay: Vikings- oder Bears-Spieler werden von den Fans eiskalt weggeschubst oder mit Bier geduscht."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Wie viele Zuschauer fasst das traditionsreiche Lambeau Field nach seinen modernen Tribünenerweiterungen?",
    "a": [
      "Rund 81.440 Zuschauer (Platz 2 der gesamten NFL)",
      "Exakt 60.000 Zuschauer",
      "Über 105.000 Zuschauer",
      "Knapp 45.000 Zuschauer"
    ],
    "exp": "Mit 81.441 Plätzen ist das Lambeau Field nach dem MetLife Stadium das zweitgrößte Stadion der NFL – in einer Stadt mit kaum mehr Einwohnern als Plätzen!"
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welcher Quarterback der Bears wurde 1986 von Packers-Defensive-Tackle Charles Martin mit einem brutalen Body Slam verletzt?",
    "a": [
      "Jim McMahon",
      "Mike Tomczak",
      "Doug Flutie",
      "Jim Harbaugh"
    ],
    "exp": "Martin trug eine 'Todesliste' mit Spielernummern auf dem Handtuch und warf McMahon Sekunden nach dem Pass auf die Schulter – die giftigste Szene der Rivalität."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welcher charismatische Star-Quarterback führte die Packers in den 1990ern nach Jahrzehnten der Trostlosigkeit zurück zum Super-Bowl-Sieg?",
    "a": [
      "Brett Favre (Trikotnummer 4)",
      "Aaron Rodgers (Trikotnummer 12)",
      "Don Majkowski (Trikotnummer 7)",
      "Lynn Dickey (Trikotnummer 12)"
    ],
    "exp": "Favre kam 1992 per Trade aus Atlanta. Mit seiner Gunslinger-Mentalität, drei MVPs in Serie und dem Sieg in Super Bowl XXXI wurde er zum Helden von Wisconsin."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welchen scheinbar unbrechbaren 'Iron Man'-Rekord stellte Brett Favre in seiner Karriere auf?",
    "a": [
      "297 aufeinanderfolgende Starts als Quarterback in der regulären Saison (321 inkl. Playoffs)",
      "50 Spiele hintereinander ohne eine einzige Interception zu werfen",
      "15 Saisons in Folge mit jeweils über 40 Touchdown-Pässen",
      "100 Siege in Serie bei eisigen Temperaturen unter dem Gefrierpunkt"
    ],
    "exp": "Über 16 Jahre lang stand Favre jeden einzelnen Sonntag auf dem Feld – trotz gebrochener Daumen, Gehirnerschütterungen und Zerrungen. Unfassbare Härte."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welcher Star-Quarterback folgte nahtlos auf Brett Favre und führte Green Bay 2011 zum Triumph in Super Bowl XLV?",
    "a": [
      "Aaron Rodgers",
      "Matt Flynn",
      "Jordan Love",
      "Desmond Howard"
    ],
    "exp": "Rodgers saß drei Jahre geduldig hinter Favre auf der Bank, bevor er das Team übernahm, 4 MVPs gewann und in Super Bowl XLV gegen Pittsburgh brillierte."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welcher überragende Defensiv-Gigant ('The Minister of Defense') unterschrieb 1993 als erster Superstar der Free Agency in Green Bay?",
    "a": [
      "Reggie White",
      "Bruce Smith",
      "Cortez Kennedy",
      "Junior Seau"
    ],
    "exp": "White war gläubiger Pastor. Mike Holmgren rief ihn auf dem Anrufbeantworter an: 'Reggie, hier ist Gott. Komm nach Green Bay!' White unterschrieb und holte 1997 den Titel."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Wie viele Quarterback-Sacks erzielte Reggie White in der zweiten Halbzeit von Super Bowl XXXI gegen die Patriots?",
    "a": [
      "3 Sacks (ein bis heute gültiger Super-Bowl-Rekord)",
      "5 Sacks",
      "1 Sack",
      "4 Sacks"
    ],
    "exp": "White dominierte Patriots-Quarterback Drew Bledsoe nach Belieben und besiegelte mit 3 Sacks den 35:21-Triumph der Packers."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Wer wurde nach einem 99-Yard-Kickoff-Return-Touchdown zum MVP von Super Bowl XXXI gewählt?",
    "a": [
      "Desmond Howard (der einzige Special-Teams-Spieler der Historie als MVP)",
      "Brett Favre",
      "Reggie White",
      "Antonio Freeman"
    ],
    "exp": "Howard erstickte Neuenglands Aufholjagd mit seinem 99-Yard-Return im Keim und ging als einziger reiner Returner in die MVP-Geschichte ein."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welcher Linebacker mit furchterregender Zahnlücke war das Herzstück von Vince Lombardis eisenharter Abwehr?",
    "a": [
      "Ray Nitschke",
      "Dave Robinson",
      "Lee Roy Caffey",
      "Dan Currie"
    ],
    "exp": "Nitschke war der Inbegriff des knallharten Linebackers: Brille abseits des Feldes, Bestie auf dem Rasen. Seine Nummer 66 ist in Green Bay heilig."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welcher 'Golden Boy' der Packers erzielte 1960 den ewigen Rekord von 176 Punkten in einer einzigen Saison mit nur 12 Spielen?",
    "a": [
      "Paul Hornung (Halfback und Kicker in Personalunion)",
      "Jim Taylor",
      "Boyd Dowler",
      "Bart Starr"
    ],
    "exp": "Hornung lief Touchdowns, fing Pässe und verwandelte alle Kicks. Sein Punkteschnitt pro Spiel aus der 12-Spiele-Saison 1960 ist bis heute unübertroffen."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welcher Quarterback gewann als erster Spielmacher der Geschichte die ersten beiden Super Bowls (I und II) und wurde beide Male zum MVP gewählt?",
    "a": [
      "Bart Starr",
      "Len Dawson",
      "Johnny Unitas",
      "Joe Namath"
    ],
    "exp": "Starr war Lombardis verlängerter Arm auf dem Feld. Mit seiner Präzision und Führungsstärke führte er Green Bay zu fünf NFL-Titeln in den 60ern."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welcher Star-Cornerback wechselte 2006 von den Raiders zu den Packers und wurde 2009 NFL Defensive Player of the Year?",
    "a": [
      "Charles Woodson",
      "Al Harris",
      "Tramon Williams",
      "Sam Shields"
    ],
    "exp": "Woodson fand in Green Bay seine zweite Blüte, fing spektakuläre Interceptions, coachte die jungen Spieler und holte 2011 den Super-Bowl-Ring."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welcher sympathische Wide Receiver hält die ewigen Franchise-Rekorde der Packers für gefangene Pässe (743) und Receiving Yards (10.137)?",
    "a": [
      "Donald Driver",
      "Jordy Nelson",
      "James Lofton",
      "Davante Adams"
    ],
    "exp": "Der als 7.-Runden-Pick gedraftete Driver überwand Armut und Obdachlosigkeit in der Jugend und wurde mit seinem strahlenden Lächeln zur Club-Ikone."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welche magische Verbindung bildete Aaron Rodgers in Super Bowl XLV mit seinem Lieblingstarget Jordy Nelson?",
    "a": [
      "Nelson fing 9 Pässe für 140 Yards und erzielte den ersten Touchdown des Spiels",
      "Nelson fing einen 80-Yard-Touchdown im allerersten Spielzug des Spiels",
      "Nelson fing alle vier Touchdown-Pässe von Rodgers im Alleingang",
      "Nelson blockte den entscheidenden Pass der Steelers an der Goalline"
    ],
    "exp": "Rodgers und Nelson zerlegten die gefürchtete Steelers-Defense: Nelson eröffnete den Punktereigen mit einem 29-Yard-Traumfang zur 7:0-Führung."
  },
  {
    "cat": "green_bay_packers",
    "diff": "pro",
    "q": "Welcher herausragende Packers-Receiver musste seine Karriere 1994 wegen einer schweren Halswirbelverletzung tragisch beenden?",
    "a": [
      "Sterling Sharpe (Bruder von Hall-of-Famer Shannon Sharpe)",
      "Robert Brooks",
      "Antonio Freeman",
      "Bill Schroeder"
    ],
    "exp": "Sterling Sharpe war auf dem besten Weg in die Hall of Fame (führte die NFL mehrfach bei Catches und TDs an), als ein Halswirbelschaden seine Karriere stoppte."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welcher verlässliche Kicker ist mit 1.918 Punkten der Allzeit-Topscorer in der Geschichte der Green Bay Packers?",
    "a": [
      "Mason Crosby",
      "Ryan Longwell",
      "Chris Jacke",
      "Chester Marcol"
    ],
    "exp": "Von 2007 bis 2022 kickte Crosby 16 Spielzeiten lang im eisigen Lambeau Field und brach alle Punkterekorde der traditionsreichen Franchise."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welcher 330-Pfund-schwere Defensive Tackle erzielte im NFC Championship Game 2011 einen ikonischen Pick-Six-Touchdown gegen die Bears?",
    "a": [
      "B.J. Raji ('The Freezer')",
      "Gilbert Brown ('The Gravedigger')",
      "Cullen Jenkins",
      "Ryan Pickett"
    ],
    "exp": "Raji fing den Pass von Caleb Hanie ab, tanzte mit wackelnden Hüften in die Endzone und sicherte den Packers den Einzug in Super Bowl XLV."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welcher spektakuläre 'Miracle in Motown' Wurf von Aaron Rodgers gegen die Lions im Dezember 2015 ging in die NFL-Geschichte ein?",
    "a": [
      "Eine 61-Yard-Hail-Mary ohne verbleibende Spielzeit nach einer Facemask-Strafe auf Richard Rodgers",
      "Ein 90-Yard-Pass auf Randall Cobb nach einem doppelten Rückpass an der Goalline",
      "Ein Schuss mit dem Fuß aus vollem Lauf über die gegnerische Torlatte",
      "Ein Unterhandwurf im Hechtsprung über drei heranstürmende Linebacker"
    ],
    "exp": "Rodgers feuerte das Ei im Ford Field fast bis unter das Hallendach: Richard Rodgers fing die 61-Yard-Bogenlampe in der Traube zum 27:23-Sieg."
  },
  {
    "cat": "green_bay_packers",
    "diff": "pro",
    "q": "Was passierte 1980 bei Chester Marcols berühmtem 'Glasses Touchdown' gegen die Chicago Bears?",
    "a": [
      "Sein eigenes geblocktes Field Goal flog ihm direkt in die Arme und er lief zum Touchdown durch",
      "Er verlor seine dicke Brille im Schlamm und kickte das Siegtor völlig blind",
      "Er täuschte einen Schuss an und warf einen Rückpass auf den Center",
      "Ein Fan warf eine Brille aufs Feld, die den Ball ins Tor ablenkte"
    ],
    "exp": "Marcol lief zum Field Goal in der Overtime an: Der Ball prallte von der Bears-Brust direkt zurück in seine Arme – Marcol rannte mit Brille zum 12:6-Walk-Off-TD!"
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welcher junge Quarterback trat 2023 nach Rodgers' Abschied zu den Jets in die großen Fußstapfen und überzeugte sofort mit Playoff-Erfolgen?",
    "a": [
      "Jordan Love",
      "Sean Clifford",
      "Kurt Benkert",
      "Tim Boyle"
    ],
    "exp": "Wie zuvor Rodgers saß auch Jordan Love drei Jahre als Erstrundenpick auf der Bank und führte die junge Packers-Offense 2023 furios in die Playoffs."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welcher legendäre General Manager formte Anfang der 90er mit Favre, White und Holmgren die Renaissance der Packers?",
    "a": [
      "Ron Wolf",
      "Ted Thompson",
      "Brian Gutekunst",
      "Tony Canadeo"
    ],
    "exp": "Ron Wolf übernahm 1991 ein am Boden liegendes Team, fädelte den mutigen Favre-Trade ein, holte Reggie White und führte Green Bay zurück an die Weltspitze."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Was vollbrachte Brett Favre am 22. Dezember 2003 bei 'Monday Night Football' gegen die Raiders, nur einen Tag nach dem plötzlichen Tod seines Vaters?",
    "a": [
      "Er spielte das Spiel seines Lebens mit 399 Yards und 4 Touchdowns in der ersten Halbzeit",
      "Er kniete beim ersten Spielzug ab und verließ unter Tränen das Stadion",
      "Er erzielte als Kicker alle Punkte der Packers im Alleingang",
      "Er verzichtete erstmals nach 200 Spielen auf einen Startplatz"
    ],
    "exp": "'Ich wusste, dass mein Vater gewollt hätte, dass ich spiele.' Favre verzauberte die Welt mit fehlerfreien Pässen; selbst die berüchtigten Raiders-Fans applaudierten stehend."
  },
  {
    "cat": "green_bay_packers",
    "diff": "pro",
    "q": "Welcher Packers-Offensive-Lineman hielt laut Vince Lombardi den Titel als 'der beste Spieler, den ich je trainiert habe'?",
    "a": [
      "Forrest Gregg (Offensive Tackle)",
      "Jerry Kramer (Guard)",
      "Fuzzy Thurston (Guard)",
      "Ken Bowman (Center)"
    ],
    "exp": "Lombardi lobte selten überschwänglich, doch über Forrest Gregg sagte er: 'Forrest Gregg is the finest player I ever coached.' Gregg spielte 188 Spiele in Serie."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welcher berühmte Wide Receiver der Packers stellte 2020 mit 18 Touchdown-Fängen den modernen Franchise-Rekord auf?",
    "a": [
      "Davante Adams",
      "Jordy Nelson",
      "Greg Jennings",
      "James Jones"
    ],
    "exp": "Adams' elegante Fußarbeit und unnachahmliche Releases an der Line machten ihn 2020 zum dominantesten Receiver der Liga (115 Catches, 18 TDs)."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welcher Packers-Defensive-Tackle feierte Mitte der 90er jeden Tackle mit dem 'Gravedigger'-Grabschaufel-Tanz?",
    "a": [
      "Gilbert Brown (340 Pfund schwerer Fan-Liebling)",
      "Santana Dotson",
      "Sean Jones",
      "Cullen Jenkins"
    ],
    "exp": "Gilbert Brown stopfte Laufwege wie eine Wand und aß im lokalen Fast-Food-Laden den nach ihm benannten 'Gilbert Burger'. Sein Schaufel-Jubel war Kult."
  },
  {
    "cat": "green_bay_packers",
    "diff": "pro",
    "q": "Welches Packers-Urgestein trug als Running Back den Spitznamen 'The Gray Ghost' und hatte seine Nummer 3 gesperrt?",
    "a": [
      "Tony Canadeo",
      "Clarke Hinkle",
      "Johnny Blood (McNally)",
      "Verne Lewellen"
    ],
    "exp": "Canadeo ergraute bereits in jungen Jahren frühzeitig. Er war 1949 der erst dritte Spieler der NFL-Historie, der 1.000 Yards in einer Saison erlief."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welcher Cheftrainer führte die Packers ab 2019 zu drei aufeinanderfolgenden 13-Sieg-Spielzeiten als neuer NFL-Rekord?",
    "a": [
      "Matt LaFleur",
      "Mike McCarthy",
      "Mike Sherman",
      "Ray Rhodes"
    ],
    "exp": "LaFleur legte mit 39 Siegen in seinen ersten drei regulären Spielzeiten den besten Start eines Head Coaches in der gesamten NFL-Historie hin."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welcher Fluss fließt direkt durch Green Bay und mündet in die Bucht des Michigansees?",
    "a": [
      "Fox River",
      "Wisconsin River",
      "Mississippi River",
      "Rock River"
    ],
    "exp": "Der Fox River prägt das Stadtbild von Green Bay und war der historische Transportweg für die Holz- und Papierindustrie der Region."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Was verbirgt sich hinter dem 'Titletown District' unmittelbar westlich des Lambeau Fields?",
    "a": [
      "Ein modernes Fan-Areal mit öffentlichem Footballfeld, Eislaufbahn und Sommerpark",
      "Ein Hochsicherheits-Trainingsgelände ausschließlich für NFL-Scouts",
      "Ein Industriepark für Papierverpackungen und Milchwirtschaft",
      "Eine geschlossene Wohnsiedlung für aktive Spieler und deren Familien"
    ],
    "exp": "Die Packers investierten in den 'Titletown District': Im Winter rodeln Fans auf dem 'Ariens Hill', im Sommer spielen Kinder auf dem Football-Kunstrasen."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welches Maskottchen vertritt die Green Bay Packers an der Seitenlinie im Lambeau Field?",
    "a": [
      "Ein lebensgroßer, zotteliger Biber namens 'Packy'",
      "Ein stilisierter Muskelmann namens 'Packer Man'",
      "Ein animierter gelber Käselaib namens 'Cheddar'",
      "Die Packers haben traditionell gar kein offizielles Tier-Maskottchen"
    ],
    "exp": "Tatsächlich verzichten die Green Bay Packers aus puristischer Tradition als eines der ganz wenigen NFL-Teams auf ein albernes Kostüm-Maskottchen!"
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Aus welchem Bundesstaat stammen die Green Bay Packers?",
    "a": [
      "Wisconsin",
      "Minnesota",
      "Michigan",
      "Iowa"
    ],
    "exp": "Wisconsin ('The Dairy State') ist die Heimat der Packers. Die Verbundenheit zwischen dem ländlichen Staat und dem Team gilt als einzigartig."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Was geschieht mit Green Bays Straßen und Geschäften während eines Sonntagsspiels der Packers?",
    "a": [
      "Die Straßen sind wie leergefegt und Supermärkte übertragen den Radiokommentar über Lautsprecher",
      "Es gilt ein offizielles städtisches Fahrverbot für alle Fahrzeuge ohne Fan-Flagge",
      "Alle Brücken über den Fox River werden aus Sicherheitsgründen hochgeklappt",
      "Die Bürger versammeln sich im Rathaus zum gemeinsamen Fahnenschwenken"
    ],
    "exp": "Während des Spiels steht das öffentliche Leben komplett still. Wer nicht im Stadion ist, sitzt vor dem Fernseher oder hört das Radio von Wayne Larrivee."
  },
  {
    "cat": "green_bay_packers",
    "diff": "pro",
    "q": "Welcher legendäre Halbprofi der Packers nannte sich 'Johnny Blood' und war für waghalsige Hotel-Klettereien berühmt?",
    "a": [
      "John McNally",
      "Cal Hubbard",
      "Mike Michalske",
      "Arnie Herber"
    ],
    "exp": "McNally sah ein Kinoplakat des Films 'Blood and Sand' und meldete sich als 'Johnny Blood' an. Er kletterte über Hotelfassaden und feierte legendäre Partys."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Wie viele Personen umfasst der Verwaltungsrat ('Board of Directors') der Packers-Aktiengesellschaft?",
    "a": [
      "Rund 45 Mitglieder aus der lokalen Wirtschaft und Gemeinschaft (ehrenamtlich)",
      "Genau 3 Personen (vom Bürgermeister von Green Bay bestimmt)",
      "12 ehemalige Super-Bowl-Champions des Vereins",
      "Über 1.000 ausgeloste Dauerkarteninhaber"
    ],
    "exp": "Ein siebenköpfiges Exekutivkomitee um den Club-Präsidenten leitet das operative Geschäft, überwacht von einem ehrenamtlichen 45-köpfigen Aufsichtsrat."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welcher US-Präsident empfing die Packers nach ihrem ersten Super-Bowl-Titel 1967 noch gar nicht im Weißen Haus?",
    "a": [
      "Lyndon B. Johnson (der Brauch von Empfängen für Super-Bowl-Sieger entstand erst später)",
      "Richard Nixon",
      "John F. Kennedy",
      "Dwight D. Eisenhower"
    ],
    "exp": "Super-Bowl-Besuche im Weißen Haus wurden erst in den 1980ern unter Ronald Reagan zur festen Tradition – Lombardi und seine Sieger reisten damals nicht nach Washington."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Was passierte mit Vince Lombardis legendärem Original-Trenchcoat nach seinem Tod?",
    "a": [
      "Er wird in der Hall of Fame im Lambeau Field wie eine Reliquie ausgestellt",
      "Er wurde feierlich unter dem Mittelkreis des Lambeau Fields vergraben",
      "Er wurde für 5 Millionen Dollar an einen anonymen Sammler in New York versteigert",
      "Er ging als Schenkung an das Smithsonian Museum in Washington, D.C."
    ],
    "exp": "Lombardis beiger Trenchcoat, sein Fedora-Hut und seine Hornbrille sind Herzstücke der Packers Hall of Fame im Stadionatrium."
  },
  {
    "cat": "green_bay_packers",
    "diff": "pro",
    "q": "Welcher Packers-Spieler war gleichzeitig einer der gefürchtetsten Baseball-Schiedsrichter der Major League (Umpire)?",
    "a": [
      "Cal Hubbard (einziges Mitglied in der NFL- und Baseball-Hall-of-Fame)",
      "Clarke Hinkle",
      "Lavvie Dilweg",
      "Cub Buck"
    ],
    "exp": "Cal Hubbard war ein Koloss als Tackle für Green Bay und stand danach Jahrzehnte als Schiedsrichter in der MLB auf dem Platz – Doppel-Hall-of-Famer!"
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welcher Radiosprecher prägte bei jedem Packers-Touchdown den ikonischen Spruch 'There is your dagger!'?",
    "a": [
      "Wayne Larrivee",
      "Jim Irwin",
      "Max McGee",
      "Larry McCarren"
    ],
    "exp": "Larrivees Markenzeichen auf 'Packers Radio Network': Sobald der entscheidende Spielzug gelingt, ruft er emotional: 'There is your dagger!'"
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welcher deutsche TV-Experte und ehemalige NFL-Profi outete sich mehrfach öffentlich als glühender Packers-Fan?",
    "a": [
      "Björn Werner",
      "Patrick Esume",
      "Jan Stecker",
      "Sebastian Vollmer"
    ],
    "exp": "Björn Werner (ehemaliger Erstrundenpick der Colts) reiste mehrfach privat ins Lambeau Field und schwärmt in Podcasts von der Fankultur in Wisconsin."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Was schenkte Aaron Rodgers seinen Offensive Linemen traditionell zu Weihnachten als Dank für ihren Schutz?",
    "a": [
      "Maßgeschneiderte Luxus-Quads / ATVs oder teure Schweizer Chronometer",
      "Gefüllte Tiefkühltruhen mit feinstem Wisconsin-Cheddarkäse",
      "Goldene Repliken der Vince-Lombardi-Trophäe für das Wohnzimmer",
      "Jahresabonnements für die besten Golfplätze in Wisconsin"
    ],
    "exp": "Rodgers belohnte seine Beschützer königlich: Polaris-Quads, maßgeschneiderte Koffer und Luxus-Uhren gehörten zu seinen Weihnachtsgeschenken."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Wie viele Aktienanteile darf eine einzelne Person an den Green Bay Packers maximal besitzen?",
    "a": [
      "Maximal 200.000 Aktien (knapp 4 Prozent), um eine Übernahme auszuschließen",
      "Es gibt keinerlei Obergrenze für den Erwerb von Anteilen",
      "Genau eine einzige Aktie pro Person ist gesetzlich erlaubt",
      "Maximal 51 Prozent für den gewählten Präsidenten des Clubs"
    ],
    "exp": "Um jede feindliche Übernahme durch Milliardäre im Keim zu ersticken, begrenzt die Satzung den Besitz einer Einzelperson auf unter 4 Prozent."
  },
  {
    "cat": "green_bay_packers",
    "diff": "mid",
    "q": "Welcher Leitspruch prangt über dem Kabinenausgang des Lambeau Fields, den die Spieler beim Betreten des Rasens berühren?",
    "a": [
      "Das Schild 'Lambeau Field' mit den historischen Meisterschaftsjahren",
      "Der Spruch 'Play like a Champion today'",
      "Die Mahnung 'Defend the Frozen Tundra at all costs'",
      "Das Zitat 'Leave everything on this sacred turf'"
    ],
    "exp": "Beim Sprint durch den Spielertunnel tippen die Profis traditionsgemäß an die gelb-grüne Ehrentafel mit dem Packers-Logo und den 13 Titeln."
  },
  {
    "cat": "green_bay_packers",
    "diff": "easy",
    "q": "Welcher Erfolgscoach führte die Packers 1997 zum Triumph in Super Bowl XXXI und formte die 90er-Jahre-Ära?",
    "a": [
      "Mike Holmgren",
      "Mike McCarthy",
      "Ray Rhodes",
      "Dan Devine"
    ],
    "exp": "Mike Holmgren baute mit Brett Favre und Reggie White das Siegerteam der 90er auf und beendete 1997 eine 29-jährige Titeldurststrecke in Titletown."
  }
];

  DATA.forEach(q => {
    if (!q.explanation && q.exp) q.explanation = q.exp;
    if (!q.exp && q.explanation) q.exp = q.explanation;
  });

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("american_football_packers", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["american_football_packers"] = DATA;
  }
})();
