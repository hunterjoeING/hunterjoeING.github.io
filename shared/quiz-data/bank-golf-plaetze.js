// Unified quiz bank for "golf_plaetze" (75 questions: Legendäre Plätze, Begriffe & Kurioses)
(function () {
  const DATA = [
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Auf welchem schottischen Traditionsplatz gilt die historische 'Swilcan Bridge' als berühmtestes Fotomotiv?",
    "a": [
      "Auf dem Old Course in St Andrews",
      "Auf dem Ailsa Course in Turnberry",
      "Auf dem Championship Course in Carnoustie",
      "Auf dem Kings Course in Gleneagles"
    ],
    "correctIndex": 0,
    "exp": "Die über 700 Jahre alte Steinbrücke überquert das Flüsschen Swilcan Burn an Loch 18 des geschichtsträchtigen Old Course.",
    "explanation": "Die über 700 Jahre alte Steinbrücke überquert das Flüsschen Swilcan Burn an Loch 18 des geschichtsträchtigen Old Course."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Welche drei Löcher im Augusta National Golf Club werden weltweit ehrfürchtig als 'Amen Corner' bezeichnet?",
    "a": [
      "Die Löcher 11, 12 und 13 in Augusta",
      "Die Löcher 16, 17 und 18 in Augusta",
      "Die Löcher 1, 2 und 3 in Augusta",
      "Die Löcher 7, 8 und 9 in Augusta"
    ],
    "correctIndex": 0,
    "exp": "Amen Corner umfasst die zweite Hälfte von Loch 11, das tückische Par-3-Loch 12 über Rae's Creek und den Teeshot an Loch 13.",
    "explanation": "Amen Corner umfasst die zweite Hälfte von Loch 11, das tückische Par-3-Loch 12 über Rae's Creek und den Teeshot an Loch 13."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Welcher Golfplatz in Florida ist weltberühmt für sein spektakuläres Inselgrün an Loch 17?",
    "a": [
      "Der TPC Sawgrass Stadium Course",
      "Der Bay Hill Club von Arnold Palmer",
      "Der Doral Blue Monster Course",
      "Der PGA National Champion Course"
    ],
    "correctIndex": 0,
    "exp": "Loch 17 des TPC Sawgrass (Heimat von The Players) versenkt jedes Jahr über 100.000 Bälle im Wasser rund um das Inselgrün.",
    "explanation": "Loch 17 des TPC Sawgrass (Heimat von The Players) versenkt jedes Jahr über 100.000 Bälle im Wasser rund um das Inselgrün."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Welcher kalifornische Spitzenplatz verläuft atemberaubend entlang der Klippen des Pazifischen Ozeans?",
    "a": [
      "Pebble Beach Golf Links in Kalifornien",
      "Torrey Pines South Course in San Diego",
      "Spyglass Hill Golf Course in Monterey",
      "The Olympic Club Lake Course in San Francisco"
    ],
    "correctIndex": 0,
    "exp": "Pebble Beach auf der Halbinsel Monterey gilt als einer der schönsten und fotogensten Meisterschaftsplätze der Erde.",
    "explanation": "Pebble Beach auf der Halbinsel Monterey gilt als einer der schönsten und fotogensten Meisterschaftsplätze der Erde."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Was charakterisiert einen traditionellen 'Links-Golfplatz' in Großbritannien und Irland?",
    "a": [
      "Küstendünen, sandiger Boden und Seewind",
      "Dichter Wald und künstlich angelegte Teiche",
      "Flache Wiesen mit extrem weichem Moorboden",
      "Gebirgslandschaften mit künstlichen Terrassen"
    ],
    "correctIndex": 0,
    "exp": "Linksland bezeichnet den sandigen Küstenstreifen, der das Meer mit fruchtbarem Ackerland verbindet ('links the land to the sea').",
    "explanation": "Linksland bezeichnet den sandigen Küstenstreifen, der das Meer mit fruchtbarem Ackerland verbindet ('links the land to the sea')."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Wie nennt man im Golfsport ein Loch, dessen Spielbahn nach der Landezone scharf nach links oder rechts abknickt?",
    "a": [
      "Ein sogenanntes Dogleg",
      "Einen sogenannten Topfbunker",
      "Ein sogenanntes Inselgrün",
      "Ein sogenanntes Parkland-Loch"
    ],
    "correctIndex": 0,
    "exp": "Die Bezeichnung rührt von der charakteristischen Krümmung eines Hundehinterlaufs (Dog's leg) her.",
    "explanation": "Die Bezeichnung rührt von der charakteristischen Krümmung eines Hundehinterlaufs (Dog's leg) her."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Wie nennt man die kleinen, kreisrunden und extrem tiefen Sandbunker auf schottischen Links-Plätzen?",
    "a": [
      "Die typischen Topfbunker",
      "Die weitläufigen Sandflächen",
      "Die offenen Fairway-Mulden",
      "Die tiefen Kirchenbänke"
    ],
    "correctIndex": 0,
    "exp": "Topfbunker besitzen steile, aus Rasensoden aufgeschichtete Wände. Oft bleibt nur der Schlag rückwärts oder seitlich heraus.",
    "explanation": "Topfbunker besitzen steile, aus Rasensoden aufgeschichtete Wände. Oft bleibt nur der Schlag rückwärts oder seitlich heraus."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Auf welchem Himmelskörper schlug US-Astronaut Alan Shepard 1971 während der Apollo-14-Mission zwei Bälle?",
    "a": [
      "Auf der staubigen Oberfläche des Mondes",
      "An Bord der Internationalen Raumstation",
      "Im sonnigen Hochland des roten Planeten Mars",
      "In einer Raumkapsel im niedrigen Erdorbit"
    ],
    "correctIndex": 0,
    "exp": "Shepard montierte einen Eisen-6-Schlägerkopf an ein Bodenprobengerät und schlug dank 1/6-Erdanziehung 'miles and miles and miles'.",
    "explanation": "Shepard schlug 1971 auf dem Mond zwei Bälle und bewies die Physik der geringen Schwerkraft."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Warum besteht eine standardmäßige Golfrunde heute weltweit aus exakt 18 Spielbahnen?",
    "a": [
      "St Andrews reduzierte seine Bahnen 1764 auf 18",
      "Weil eine Flasche schottischer Whisky 18 Gläser hat",
      "Weil 18 Löcher genau zwei Stunden Spielzeit ergaben",
      "König James II. erließ ein Gesetz für 18 Löcher"
    ],
    "correctIndex": 0,
    "exp": "Der Old Course in St Andrews hatte einst 22 Löcher; 1764 wurden die vier kurzen Bahnen zu zwei zusammengelegt – seither gilt 18 weltweit als Norm.",
    "explanation": "Der Old Course in St Andrews reduzierte 1764 seine Löcher von 22 auf 18, was zum weltweiten Maßstab wurde."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Wie nennt man im traditionellen Golf-Slang einen Score von genau einem Schlag unter dem Par des Lochs?",
    "a": [
      "Einen wunderbaren Birdie-Schlag",
      "Einen glücklichen Bogey-Schlag",
      "Einen spektakulären Eagle-Schlag",
      "Einen seltenen Albatros-Schlag"
    ],
    "correctIndex": 0,
    "exp": "Der Ausdruck 'Birdie' stammt aus dem amerikanischen Slang des späten 19. Jahrhunderts ('bird' für etwas Ausgezeichnetes).",
    "explanation": "Der Ausdruck 'Birdie' bezeichnet einen Score von genau einem Schlag unter Par."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Wie nennt man im Golfsport einen Score von genau zwei Schlägen unter dem Par eines Lochs?",
    "a": [
      "Einen majestätischen Eagle",
      "Einen soliden Birdie-Score",
      "Ein schmerzhaftes Bogey",
      "Einen extremen Kondor-Schlag"
    ],
    "correctIndex": 0,
    "exp": "In Anlehnung an den 'kleinen Vogel' (Birdie) symbolisiert der größere Adler (Eagle) das noch wertvollere Ergebnis von zwei unter Par.",
    "explanation": "Ein Eagle bezeichnet ein Lochergebnis von zwei Schlägen unter Par."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Wie wird ein Score von genau drei Schlägen unter Par (z. B. 2 Schläge auf einem Par 5) genannt?",
    "a": [
      "Ein sensationeller Albatros",
      "Ein glücklicher Doppel-Eagle",
      "Ein normaler Eagle-Treffer",
      "Ein spektakulärer Ace-Treffer"
    ],
    "correctIndex": 0,
    "exp": "Ein Albatros (in den USA oft 'Double Eagle') ist statistisch weitaus seltener als ein gewöhnliches Hole-in-One auf einem Par 3.",
    "explanation": "Ein Albatros (drei unter Par) ist eines der seltensten Kunststücke auf einem Golfplatz."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Was versteht man im Freizeitgolf unter einem sogenannten 'Mulligan'?",
    "a": [
      "Einen straffrei wiederholten ersten Abschlag",
      "Einen Schlägerwechsel mitten auf der Runde",
      "Das Weiterspielen mit dem Ball des Partners",
      "Einen geschenkten langen Annäherungsschlag"
    ],
    "correctIndex": 0,
    "exp": "Ein Mulligan ist ein in Privatrunden geduldeter, nach den offiziellen Golfregeln jedoch streng unzulässiger zweiter Probeschuss vom ersten Tee.",
    "explanation": "Ein Mulligan bezeichnet das ungestrafte Wiederholen eines missglückten Abschlags in privaten Spaßrunden."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Was bezeichnet der Begriff 'Fried Egg' (Spiegelei) bei der Balllage in einem Sandbunker?",
    "a": [
      "Einen im Sandkrater halb versunkenen Ball",
      "Einen rissigen Ball mit beschädigter Schale",
      "Einen Ball, der direkt auf einer Harke liegt",
      "Einen Schlag, der meterhoch Sand aufwirbelt"
    ],
    "correctIndex": 0,
    "exp": "Liegt der weiße Ball wie ein Eigelb im Zentrum eines aufgeworfenen Sandkraters (Eiweiß), spricht man vom gefürchteten Spiegelei.",
    "explanation": "Ein Spiegelei bezeichnet einen tief im Bunkersand eingebetteten Ball mit aufgeworfenem Rand."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Was versteht man unter dem Begriff 'Texas Wedge' auf einem Golfplatz?",
    "a": [
      "Das Putten von außerhalb der Grünkante",
      "Ein extrem geschmiedetes Sand Wedge",
      "Einen Schlag aus trockenem Präriegras",
      "Einen Schläger mit verstellbarem Kopf"
    ],
    "correctIndex": 0,
    "exp": "Da texanische Fairways oft steinhart und sonnenverbrannt sind, nutzten Spieler wie Ben Hogan den Putter weit vor dem Grün ('Texas Wedge').",
    "explanation": "Der Texas Wedge bezeichnet das zweckmäßige Putten vom Vorgrün oder Fairway."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Was symbolisiert der Begriff 'Snowman' (Schneemann) auf der handschriftlichen Scorekarte?",
    "a": [
      "Eine ernüchternde Schlagzahl von 8",
      "Das Abbrechen des Spiels bei Eisregen",
      "Eine Runde mit acht gespielten Bogeys",
      "Das Auslassen von acht Wasserhindernissen"
    ],
    "correctIndex": 0,
    "exp": "Die Zahl 8 erinnert optisch an zwei aufeinandergesetzte Schneekugeln und wird im Club-Slang als 'Schneemann' gefürchtet.",
    "explanation": "Eine Acht auf der Scorekarte wird wegen ihrer Kugelform scherzhaft als Schneemann bezeichnet."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Aus welchem Grundmaterial bestanden die allerersten historischen Golfbälle ('Featheries') im 17. Jahrhundert?",
    "a": [
      "Aus lederner Hülle gefüllt mit Federn",
      "Aus massivem Buchen- und Eichenholz",
      "Aus gebranntem Steingut und Kieselstein",
      "Aus reinem Kautschuk vom Gummibaum"
    ],
    "correctIndex": 0,
    "exp": "Ein Zylinderhut voll nasser Hühner- oder Gänsefedern wurde in eine feuchte Lederkugel gestopft; beim Trocknen entstand ein steinharter Ball.",
    "explanation": "Featherie-Bälle bestanden aus stramm vernähtem Leder, das mit feuchten Vogelfedern prall gefüllt wurde."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Welcher andalusische Kurs war 1997 der erste Austragungsort des Ryder Cups auf dem europäischen Festland?",
    "a": [
      "Der Real Club Valderrama in Spanien",
      "Der Real Club de Golf Sotogrande",
      "Der PGA Catalunya Stadium Course",
      "Der Golf Santander Course in Madrid"
    ],
    "correctIndex": 0,
    "exp": "Unter Kapitän Seve Ballesteros siegte Europa 1997 in Valderrama vor begeisterten spanischen Fans mit 14,5 zu 13,5 gegen die USA.",
    "explanation": "Valderrama in Sotogrande schrieb 1997 als erster kontinentaleuropäischer Ryder-Cup-Schauplatz Geschichte."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Welcher deutsche Golfplatz bei Köln, designt von Jack Nicklaus, war Schauplatz zahlreicher European-Tour-Turniere?",
    "a": [
      "Der Golfclub Gut Lärchenhof bei Köln",
      "Der Kölner Golfclub im Grüngürtel",
      "Der Golf Club Hubbelrath bei Düsseldorf",
      "Der Düsseldorfer Golf Club in Ratingen"
    ],
    "correctIndex": 0,
    "exp": "Gut Lärchenhof in Pulheim ist der einzige Jack-Nicklaus-Designplatz in Deutschland und beherbergte jahrelang deutsche Profiturniere.",
    "explanation": "Gut Lärchenhof wurde von Jack Nicklaus entworfen und war langjähriger Austragungsort großer Turniere."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Was versteht man im Golfjargon unter einem sogenannten 'Lip-out'?",
    "a": [
      "Ein Schlag verfehlt das Vorgrün um Zentimeter",
      "Ein Ball dreht sich an der Lochkante heraus",
      "Ein Abschlag springt vom Baum ins Fairway",
      "Ein Spieler verweigert den nächsten Schlag"
    ],
    "correctIndex": 1,
    "exp": "Beim Lip-out rollt der Ball über die innere Kante des Lochs, dreht sich durch den Schwung um die Kurve und bleibt knapp daneben liegen.",
    "explanation": "Ein Lip-out beschreibt einen Putt, der die Lochlippe umrundet, ohne hineinzufallen."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Wie nennt man die Spielform, bei der auf jedem Loch ein Einsatz ('Skin') ausgespielt wird?",
    "a": [
      "Ein klassisches Chapman-Turnier",
      "Ein traditionelles Skins Game",
      "Ein schnelles Scramble-Match",
      "Ein vorgabewirksames Zählspiel"
    ],
    "correctIndex": 1,
    "exp": "Wird ein Loch geteilt, verbleibt der Einsatz im Topf und wandert auf das nächste Loch – oft geht es am Ende um riesige Jackpots.",
    "explanation": "Beim Skins Game gewinnt nur der alleinige Lochsieger den Punkt, andernfalls wird der Jackpot weitergetragen."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Was bedeutet der Begriff 'Fringe' (oder Vorgrün) auf einer Golfspielbahn?",
    "a": [
      "Die Böschung eines tiefen Wasserhindernisses",
      "Der kurz gemähte Rasenstreifen um das Grün",
      "Der Übergang vom Abschlag ins hohe Rough",
      "Die markierte Begrenzungslinie am Platzrand"
    ],
    "correctIndex": 1,
    "exp": "Das Fringe (auch Apron oder Collar) ist kürzer als das Fairway, aber länger als das Grün geschnitten; hier darf der Ball geputtet werden.",
    "explanation": "Das Vorgrün (Fringe/Collar) bildet den kurz gemähten Übergang vom Fairway zur Putting-Fläche."
  },
  {
    "cat": "golf_plaetze",
    "diff": "easy",
    "q": "Von welchem französischen Begriff für Hofjunge oder Page leitet sich das Wort 'Caddie' historisch ab?",
    "a": [
      "Vom französischen Begriff 'Chariot'",
      "Vom französischen Begriff 'Cadet'",
      "Vom französischen Begriff 'Baguette'",
      "Vom französischen Begriff 'Chevalier'"
    ],
    "correctIndex": 1,
    "exp": "Maria Stuart brachte das Spiel aus Frankreich nach Schottland; die Pagen, die ihre Schläger trugen, wurden als 'Cadets' bezeichnet.",
    "explanation": "Das Wort Caddie entstammt dem französischen 'Cadet' (jüngerer Sohn / Militärpage) an Maria Stuarts Hof."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Welches berühmte 17. Loch auf dem Old Course in St Andrews verlangt einen blinden Abschlag über Hotelschuppen?",
    "a": [
      "Die gefürchtete 'Postage Stamp'",
      "Das weltberühmte 'Road Hole'",
      "Der schmale 'Hogan's Alley'",
      "Das anspruchsvolle 'Railway Hole'"
    ],
    "correctIndex": 1,
    "exp": "Das Par-4-Loch 17 in St Andrews führt über die Schuppen des Old Course Hotels, vorbei am berüchtigten Road Hole Bunker und der Teerstraße.",
    "explanation": "Loch 17 (Road Hole) in St Andrews gilt als eines der anspruchsvollsten und berühmtesten Par-4-Löcher der Welt."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Wie heißt das winzige, von fünf tiefen Bunkern umgebene Par-3-Loch 8 auf dem Links-Kurs von Royal Troon?",
    "a": [
      "Der tückische 'Hell Bunker' der Küste",
      "Die legendäre 'Postage Stamp' (Briefmarke)",
      "Das schmale 'Devil's Cauldron' Loch",
      "Die berühmte 'Valley of Sin' Senke"
    ],
    "correctIndex": 1,
    "exp": "Mit nur rund 112 Metern Länge hat es ein so kleines Grün, dass Willie Park Jr. schrieb, es sei kaum größer als eine Briefmarke.",
    "explanation": "Die 'Briefmarke' (Postage Stamp) in Royal Troon bestraft jeden minimalen Fehlschlag mit tiefen Sandgräbern."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Welcher Golfplatzarchitekt entwarf den TPC Sawgrass und verwirklichte auf Rat seiner Frau Alice das Inselgrün?",
    "a": [
      "Alister MacKenzie in den Dünen",
      "Pete Dye gemeinsam mit Alice Dye",
      "Robert Trent Jones auf Sumpfland",
      "Donald Ross nach schottischem Vorbild"
    ],
    "correctIndex": 1,
    "exp": "Weil rund um Grün 17 aller Sand für den Platzbau abgegraben worden war, schlug Alice Dye vor: 'Warum füllt ihr es nicht einfach mit Wasser?'",
    "explanation": "Alice Dye rettete das 17. Loch von Sawgrass mit der genialen Idee des umspülten Inselgrüns."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Welcher Golfkurs in Nordirland vor den Bergen von Mourne wird regelmäßig zu den weltbesten Plätzen gezählt?",
    "a": [
      "Royal Portrush Dunluce Course",
      "Royal County Down Golf Club",
      "Portstewart Strand Course",
      "The K Club Palmer Course"
    ],
    "correctIndex": 1,
    "exp": "Royal County Down bietet dramatische Dünen, blühenden Ginster und grandiose Ausblicke auf das Irische Meer und die Mourne Mountains.",
    "explanation": "Royal County Down gilt unter Architekten als das Nonplusultra naturbelassenen Links-Designs."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was charakterisiert einen 'Heathland'-Golfplatz (Heideplatz) wie Sunningdale oder Walton Heath?",
    "a": [
      "Feuchte Sumpfebenen mit tiefen Wassergräben",
      "Sandiger Boden, Heidekraut, Ginster und Kiefern",
      "Strenge Parkanlagen ohne jeglichen Baumbestand",
      "Künstlich aufgeschüttete Dünen fernab der Natur"
    ],
    "correctIndex": 1,
    "exp": "Heideplätze im Umland von London kombinieren die Drainage von Links-Plätzen mit der Idylle von Kiefernwäldern und violettem Heidekraut.",
    "explanation": "Heathland-Plätze bieten federnden Sandboden, Heidekraut und offene Landschaften mit hoher strategischer Vielfalt."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was versteht man unter den berühmten 'Church Pews' (Kirchenbänke) im Oakmont Country Club?",
    "a": [
      "Eine hölzerne Sitzbank hinter dem Clubhaus am ersten Tee",
      "Einen riesigen Bunker mit acht grasbewachsenen Kämmen",
      "Eine Reihe von acht Zypressenbäumen entlang des Fairways",
      "Ein historisches Mahnmal für verstorbene Clubmeister"
    ],
    "correctIndex": 1,
    "exp": "Der 90 Meter lange Sandbunker zwischen den Bahnen 3 und 4 ist durch sieben Grasrücken unterteilt, die wie Kirchenbänke aussehen.",
    "explanation": "Die 'Church Pews' in Oakmont sind einer der berüchtigtsten Hinderniskomplexe der Golfarchitektur."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Welcher öffentliche Golfplatz im Bundesstaat New York warnt Spieler am ersten Tee mit einem berüchtigten Schild vor extremer Härte?",
    "a": [
      "Der Shinnecock Hills Golf Club",
      "Der Bethpage State Park Black Course",
      "Der Winged Foot West Course",
      "Der National Golf Links of America"
    ],
    "correctIndex": 1,
    "exp": "Das legendäre Schild verkündet: 'The Black Course Is An Extremely Difficult Course Which We Recommend Only For Highly Skilled Golfers.'",
    "explanation": "Bethpage Black warnt Golfer am Starter-Häuschen offiziell vor der brutalen Härte des A.W.-Tillinghast-Meisterwerks."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Welcher private Kurs in New Jersey gilt unter Kennern als der architektonisch vollkommenste Golfplatz der Welt?",
    "a": [
      "Baltusrol Golf Club Lower Course",
      "Pine Valley Golf Club in New Jersey",
      "Ridgewood Country Club in Paramus",
      "Somerset Hills Country Club in Bernards"
    ],
    "correctIndex": 1,
    "exp": "Pine Valley verbindet Parkland-, Heathland- und Sanddünen-Elemente; jedes einzelne Loch ist eine isolierte Insel der Perfektion.",
    "explanation": "Pine Valley führt seit Jahrzehnten die Weltranglisten führender Golfmagazine als ultimativer Kurs an."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was ist das architektonische Markenzeichen der Grüns auf dem berühmten Platz Pinehurst No. 2?",
    "a": [
      "Vollkommen ebene und quadratische Puttflächen",
      "Nach allen Seiten abfallende Schildkrötenrücken-Grüns",
      "Tiefe Wassergräben, die jedes Grün komplett umrunden",
      "Rasenflächen aus künstlichem Kunstrasenbelag"
    ],
    "correctIndex": 1,
    "exp": "Architekt Donald Ross gestaltete 'Inverted Saucers' (umgedrehte Untertassen): Jeder Ball, der nicht perfekt platziert wird, rollt 20 Meter vom Grün.",
    "explanation": "Die kuppelartigen Grüns von Pinehurst No. 2 verlangen meisterhafte Präzision und virtuoses Kurzspiel."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was versteht man unter dem Begriff 'Grain' auf mit Bermuda-Gras bewachsenen Grüns?",
    "a": [
      "Den Härtegrad des Sandes unterhalb der Grasnarbenschicht",
      "Die Wuchsrichtung der Halme, die den Balllauf bremst oder lenkt",
      "Die Düngemittelkörnchen, die auf dem Grün ausgestreut werden",
      "Die Schnitthöhe gemessen in Zehntel-Millimetern"
    ],
    "correctIndex": 1,
    "exp": "Bermuda wächst zur Sonne hin oder mit dem Wasserablauf. Ein Putt 'gegen den Strich' (Into the Grain) rollt drastisch langsamer.",
    "explanation": "Der Grain (Grasstrich) beeinflusst Tempo und Richtungsstabilität von Putts auf warmen Bermuda-Grüns massiv."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was bezeichnet in der klassischen Golfplatzarchitektur ein sogenanntes 'Redan'-Loch?",
    "a": [
      "Ein langes Par-5-Loch ohne einen einzigen Sandbunker",
      "Ein Par-3 mit einem schräg nach hinten links abfallenden Grün",
      "Ein Par-4 mit zwei völlig getrennten Grüns zur Auswahl",
      "Ein Grün, das komplett auf einer Insel im See errichtet wurde"
    ],
    "correctIndex": 1,
    "exp": "Das Original stammt aus North Berwick (Loch 15). Ein mächtiger Frontbunker schützt das Grün, das den Ball über eine Geländewelle nach hinten links leitet.",
    "explanation": "Das Redan-Design ist das meistkopierte und am meisten bewunderte Par-3-Konzept der Golfhistorie."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was ist das Besondere an einem 'Biarritz'-Grün in der historischen Golfarchitektur?",
    "a": [
      "Zwei Fahnenlöcher auf zwei verschiedenen Spielebenen",
      "Eine tiefe Quermulde (Swale) mitten durch die Puttfläche",
      "Eine vollständig von einer Mauer eingerahmte Rasenfläche",
      "Ein kreisrundes Grün, das wie ein Amphitheater gebaut ist"
    ],
    "correctIndex": 1,
    "exp": "Ein Biarritz-Grün (benannt nach dem Platz in Frankreich) ist bis zu 60 Meter lang und besitzt in der Mitte einen grabenartigen Graseinschnitt.",
    "explanation": "Ein Biarritz-Grün stellt Spieler bei unpassender Längendosierung vor extreme Putt-Herausforderungen über die tiefe Quermulde."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was versteht man unter einem 'Waste Bunker' (oder einer Waste Area) auf dem Golfplatz?",
    "a": [
      "Den Müllsammelplatz des Greenkeeping-Teams hinter Bahn 9",
      "Eine natürliche Sandfläche, die nicht als Hindernis gewertet wird",
      "Einen abgerissenen Bunker, der mit Schotter befüllt wurde",
      "Ein gesperrtes Biotop, das keinesfalls betreten werden darf"
    ],
    "correctIndex": 1,
    "exp": "In einer Waste Area (wie in Pinehurst) darf man im Gegensatz zum regulären Bunker den Schläger straflos im Sand aufsetzen.",
    "explanation": "Waste Bunkers sind natürliche Übergangsbereiche aus Sand; hier darf der Schläger vor dem Schlag den Boden berühren."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Welcher Sportjournalist prägte 1958 in Sports Illustrated den legendären Ausdruck 'Amen Corner' für Augusta?",
    "a": [
      "Grantland Rice",
      "Herbert Warren Wind",
      "Dan Jenkins",
      "Bernard Darwin"
    ],
    "correctIndex": 1,
    "exp": "Herbert Warren Wind suchte einen melodischen Namen für die dramatischen Geschehnisse um Arnold Palmer und entlehnte ihn einem Jazz-Titel.",
    "explanation": "Herbert Warren Wind erfand 1958 den Namen 'Amen Corner' in Anlehnung an das Jazz-Stück 'Shouting at Amen Corner'."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Wie nennt man die extrem seltene Schlagzahl von vier Schlägen unter Par (z. B. Ass auf einem Par 5)?",
    "a": [
      "Einen sogenannten Albatros-Plus",
      "Einen sogenannten Kondor (Condor)",
      "Einen sogenannten Super-Birdie",
      "Einen sogenannten Phönix-Treffer"
    ],
    "correctIndex": 1,
    "exp": "Ein Kondor (-4) wurde weltweit erst eine Handvoll Male erzielt – meist durch das Abschneiden extremer Doglegs auf Höhenplätzen.",
    "explanation": "Ein Kondor (vier unter Par) ist das statistisch unwahrscheinlichste Ergebnis im gesamten Golfsport."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was versteht man unter dem Naturharz 'Guttapercha', das ab 1848 die Golfballherstellung revolutionierte?",
    "a": [
      "Eine synthetische Kautschukmischung aus schottischen Laboren",
      "Ein Harz aus schottischen Kiefernwäldern an der Küste",
      "Einen getrockneten Pflanzensaft aus malaysischen Bäumen",
      "Einen Verbundstoff aus Walfischzähnen und Harzöl"
    ],
    "correctIndex": 2,
    "exp": "Das Naturharz des Palaquium-Gutta-Baums ließ sich in heißem Wasser erweichen und formen; Bälle wurden spottbillig und machten Golf zum Massensport.",
    "explanation": "Guttapercha-Bälle verdrängten die teuren Featheries und leiteten die Demokratisierung des Golfsports ein."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Welche kuriose Entdeckung im 19. Jahrhundert führte zur systematischen Einführung von Dimples auf Golfbällen?",
    "a": [
      "Vögel mieden Bälle mit unebener Oberflächenstruktur",
      "Gekerbte Bälle schwammen bei Regen besser auf Teichen",
      "Zerkratzte und verbeulte Bälle flogen stabiler und weiter",
      "Die Schläger nutzten sich an unebenen Bällen weniger ab"
    ],
    "correctIndex": 2,
    "exp": "Golfer bemerkten verblüfft, dass alte, von Schlägen gezeichnete 'Guttys' viel weiter flogen als nagelneue, glatte Exemplare; man begann, Muster einzufeilen.",
    "explanation": "Scharten und Kerben auf alten Bällen offenbarten zufällig die strömungsmechanischen Vorteile der Dimples."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Welcher US-amerikanische Erfinder patentierte 1898 den ersten modernen Wickelball mit Gummifadenkern?",
    "a": [
      "Karsten Solheim aus Seattle",
      "Arthur Spalding aus Chicago",
      "Coburn Haskell aus Cleveland",
      "Charles Goodyear aus New York"
    ],
    "correctIndex": 2,
    "exp": "Der 'Haskell-Ball' bestand aus einem festen Kern, umwickelt mit hunderten Metern gedehntem Gummifaden und einer Balata-Hülle; er flog 20 Meter weiter.",
    "explanation": "Coburn Haskells Erfindung des Gummikern-Wickelballs revolutionierte Schlagweiten und Platzarchitektur ab 1900."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Welcher schottische Monarch verbot Golf 1457 per Gesetz, weil Soldaten das Bogenschießen vernachlässigten?",
    "a": [
      "König Robert the Bruce",
      "König James IV. von Schottland",
      "König James II. von Schottland",
      "König Charles I. von England"
    ],
    "correctIndex": 2,
    "exp": "Das schottische Parlament verordnete, dass 'fute-ball and golfe be utterly cryed downe', um die Verteidigungsfähigkeit gegen England zu sichern.",
    "explanation": "König James II. untersagte 1457 Golf und Fußball, um die Bürger zum Üben des militärischen Bogenschießens zu zwingen."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Welche Königin spielte wenige Tage nach dem Mord an ihrem Ehemann Lord Darnley 1567 in Seton demonstrativ Golf?",
    "a": [
      "Königin Elizabeth I. von England",
      "Königin Victoria von Großbritannien",
      "Maria Stuart (Mary Queen of Scots)",
      "Königin Anne von Dänemark"
    ],
    "correctIndex": 2,
    "exp": "Maria Stuart war eine leidenschaftliche Golferin; ihre Gegner nutzten ihre Runde kurz nach Darnleys Ermordung als Beweis ihrer Hartherzigkeit.",
    "explanation": "Maria Stuart löste 1567 einen Skandal aus, als sie kurz nach dem gewaltsamen Tod ihres Gatten auf dem Golfplatz gesichtet wurde."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Welcher schottische Verein verfasste 1744 in Leith die ersten dreizehn geschriebenen Golfregeln der Welt?",
    "a": [
      "The Royal and Ancient Golf Club of St Andrews",
      "The Bruntsfield Links Golfing Society",
      "The Gentlemen Golfers of Leith (Muirfield)",
      "The Royal Burgess Golfing Society"
    ],
    "correctIndex": 2,
    "exp": "Zur Vergabe des 'Silver Club' schrieb der Club in Leith die 'Articles & Laws in Playing at Golf' nieder – das Ur-Regelwerk unseres heutigen Spiels.",
    "explanation": "Die Gentlemen Golfers of Leith formulierten 1744 das erste verbindliche Regelwerk mit 13 Paragrafen."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was besagte die historische 'Stymie'-Regel, die bis zu ihrer Abschaffung im Jahr 1952 im Lochspiel galt?",
    "a": [
      "Der Führende durfte den Abschlag des Gegners beliebig versetzen",
      "Man musste jeden Ball innerhalb einer Minute ohne Probeschwung spielen",
      "Lag der gegnerische Ball im Weg, durfte er nicht markiert werden",
      "Bunker durften während des Matches keinesfalls geharkt werden"
    ],
    "correctIndex": 2,
    "exp": "Lag der Ball des Gegners auf der Puttlinie, durfte er nicht aufgehoben werden. Man musste mit viel Spin um ihn herumkurven oder herüberchippen!",
    "explanation": "Die Stymie-Regel zwang Golfer im Lochspiel, blockierende Bälle des Gegners auf dem Grün spektakulär zu überspielen."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Welcher schottische Golfpionier (viermaliger Open-Sieger) gilt als Schöpfer von Prestwick und der ersten 18 Löcher in St Andrews?",
    "a": [
      "Young Tom Morris aus Prestwick",
      "Allan Robertson aus Fife",
      "Old Tom Morris aus St Andrews",
      "Willie Park Senior aus Musselburgh"
    ],
    "correctIndex": 2,
    "exp": "Old Tom Morris prägte Platzarchitektur, Schlägerbau und Regelwesen und gilt als Urvater des professionellen Golfsports.",
    "explanation": "Old Tom Morris gestaltete Legenden-Kurse in ganz Großbritannien und formte die 18-Loch-Norm in St Andrews."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "In welcher Filmkomödie von 1980 spielt Bill Murray den chaotischen Platzwart Carl Spackler auf Erdhörnchenjagd?",
    "a": [
      "Happy Gilmore (Ein Champ zum Verlieben)",
      "Tin Cup mit Kevin Costner",
      "Caddyshack (Wahnsinn ohne Handicap)",
      "The Legend of Bagger Vance"
    ],
    "correctIndex": 2,
    "exp": "Caddyshack mit Chevy Chase, Rodney Dangerfield und Bill Murray gilt als die größte Kult-Komödie der Golf- und Filmgeschichte.",
    "explanation": "Bill Murrays improvisierte Szenen als gopher-jagender Platzwart in Caddyshack sind unvergessener Kult."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Wo befindet sich mit den 'Nullarbor Links' (über 1.365 km Länge entlang einer Autobahn) der längste Golfkurs der Erde?",
    "a": [
      "In der afrikanischen Sahara",
      "In der weiten Steppe Patagoniens",
      "Im westaustralischen Outback",
      "Entlang der Transsibirischen Eisenbahn"
    ],
    "correctIndex": 2,
    "exp": "Die 18 Löcher der Nullarbor Links verteilen sich über Tankstellen und Roadhouses entlang des Eyre Highway über zwei australische Zeitzonen.",
    "explanation": "Nullarbor Links erstreckt sich über 1.365 Kilometer durch Australien; die Runde dauert per Auto oft eine knappe Woche."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Wo befindet sich der tiefstgelegene Golfplatz der Welt auf rund 65 Metern unter dem Meeresspiegel?",
    "a": [
      "Ein Oasenplatz am Ufer des Toten Meeres",
      "Ein Salzwüstenplatz im australischen Lake Eyre",
      "Furnace Creek im kalifornischen Death Valley",
      "Eine Oase in der Qattara-Senke in Ägypten"
    ],
    "correctIndex": 2,
    "exp": "Furnace Creek Golf Course liegt 65 Meter unter dem Meeresspiegel; Bälle fliegen in der dichteren Atmosphäre spürbar kürzer.",
    "explanation": "Furnace Creek im Death Valley liegt tief unter dem Meeresspiegel und fordert Spieler mit dichter Luft und Wüstenhitze."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Welcher britische Autor verewigte sein Heimat-Clubhaus Royal St George's in seinem Roman 'Goldfinger' als Royal St Mark's?",
    "a": [
      "Krimiautor Sir Arthur Conan Doyle",
      "Meistererzähler P.G. Wodehouse",
      "James-Bond-Schöpfer Ian Fleming",
      "Schriftsteller Rudyard Kipling"
    ],
    "correctIndex": 2,
    "exp": "Ian Fleming war Mitglied in Royal St George's in Sandwich; das Duell zwischen Bond und Auric Goldfinger zählt zu den besten Literaturszenen.",
    "explanation": "Ian Fleming spielte regelmäßig in Sandwich und machte den Platz zum Schauplatz des berühmtesten Golfbetrugs der Weltliteratur."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was versteht man unter dem Begriff 'Cape Hole' in der strategischen Platzarchitektur?",
    "a": [
      "Ein Loch, das auf einer Klippe ohne jeden Fairwayrasen endet",
      "Ein Inselgrün, das nur mit dem Putter bespielt werden darf",
      "Ein Loch, bei dem man diagonal über ein Gewässer abkürzt",
      "Eine Spielbahn, die bergab in eine tiefe Schlucht mündet"
    ],
    "correctIndex": 2,
    "exp": "Beim Cape Hole (erstmals an Loch 14 des National Golf Links) wählt der Golfer selbst, wie viel Wasserüberquerung er wagen möchte (Bite-off).",
    "explanation": "Das Cape Hole belohnt wagemutige Bälle über Wasser mit einem drastisch kürzeren Schlag ins Grün."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was bezeichnet der Begriff 'Punchbowl' bei der Konstruktion historischer Grüns?",
    "a": [
      "Ein Grün mit einem runden Wassergraben rund um die Fahne",
      "Ein vollkommen flaches Grün ohne jegliche Geländeneigung",
      "Ein trichterförmiges Grün umgeben von sammelnden Erdwällen",
      "Ein Grün auf dem Dach eines unterirdischen Schuppens"
    ],
    "correctIndex": 2,
    "exp": "Grüns in Form einer 'Bowleschüssel' leiten selbst unpräzise Bälle durch die nach innen geneigten Hänge zuverlässig zum Zentrum.",
    "explanation": "Punchbowl-Grüns nutzen trichterförmige Hänge, die Bälle zur Mitte der Puttfläche lenken."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was bedeutet der Begriff 'Down the Middle' im traditionellen Golf-Jargon?",
    "a": [
      "Ein Ball, der mitten im Schlägerkopf des Gegners zerschellt",
      "Ein Schlag, der exakt zwischen zwei Bäumen hindurchtaucht",
      "Ein perfekt platzierter Teeshot genau auf die Fairwaymitte",
      "Ein Putt, der ohne Brechung geradlinig ins Loch fällt"
    ],
    "correctIndex": 2,
    "exp": "'Right down the middle' ist das schönste Lob für einen schnurgeraden Drive, der das Fairway exakt halbiert.",
    "explanation": "Down the Middle beschreibt den perfekten, kerzengeraden Abschlag ins Fairwayzentrum."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was versteht man unter der Spielwette 'Nassau' bei einer privaten Golfrunde?",
    "a": [
      "Eine Wette, bei der nach jedem verlorenen Loch bezahlt wird",
      "Ein Spiel, bei dem nur Schläge aus dem Bunker gewertet werden",
      "Drei getrennte Wetten: Front Nine, Back Nine und Gesamtsieg",
      "Ein Match ohne Schlägerwechsel über alle 18 Löcher hinweg"
    ],
    "correctIndex": 2,
    "exp": "Die 1900 im Nassau Country Club erfundene Wette verhindert Frust: Wer die ersten 9 Löcher verliert, kann auf den zweiten 9 Löchern noch gewinnen.",
    "explanation": "Das Nassau-Format teilt die 18 Löcher in drei unabhängige Wetten (Löcher 1-9, Löcher 10-18 und 1-18)."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was bedeutet der Ausdruck 'Pin High' (oder Hole High) bei einer Annäherung ans Grün?",
    "a": [
      "Der Ball hat die Spitze des Flaggenstocks im Flug touchiert",
      "Der Ball liegt mindestens zehn Meter über dem Grünplateau",
      "Der Ball liegt exakt auf Höhe der Fahne, nur seitlich versetzt",
      "Der Ball rollt nach dem Aufprall über die hintere Kante"
    ],
    "correctIndex": 2,
    "exp": "'Pin High' bescheinigt dem Spieler eine makellose Längendosierung – die Distanz stimmte haargenau mit der Fahnenposition überein.",
    "explanation": "Pin High bedeutet, dass der Schlag die perfekte Distanz hatte und genau auf Fahnenhöhe zum Liegen kam."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was versteht man unter dem englischen Begriff 'Honour' (die Ehre) vor dem Abschlag?",
    "a": [
      "Das Verbeugen vor den Mitspielern vor Beginn der Golfrunde",
      "Das Tragen des Schlägerbags für den ältesten Clubspieler",
      "Das Vorrecht, als Sieger des vorherigen Lochs zuerst zu schlagen",
      "Das Überlassen der eigenen Bälle an den gastgebenden Club"
    ],
    "correctIndex": 2,
    "exp": "Wer das letzte Loch mit der niedrigsten Schlagzahl gewonnen hat, besitzt am nächsten Tee 'the Honour' und darf als Erster abschlagen.",
    "explanation": "Die Ehre (Honour) gebührt dem Spieler, der am vorangegangenen Loch den besten Score erzielt hat."
  },
  {
    "cat": "golf_plaetze",
    "diff": "mid",
    "q": "Was bezeichnet der Slang-Ausdruck 'Airmail' bei einem Annäherungsschlag?",
    "a": [
      "Einen Ball, der nach Bodenkontakt von einer Taube gepickt wird",
      "Einen extrem hohen Bunkerschlag, der steil ins Loch tropft",
      "Einen Ball, der das gesamte Grün deutlich im Flug übersegelt",
      "Einen Abschlag, der über die Baumwipfel das Clubhaus trifft"
    ],
    "correctIndex": 2,
    "exp": "'You airmailed the green!' sagt man, wenn ein Spieler zwei Schläger zu viel genommen hat und der Ball meilenweit hinter dem Grün landet.",
    "explanation": "Airmail beschreibt einen Annäherungsschlag, der das Grün weit überfliegt ('per Luftpost')."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Wie heißt der berühmt-berüchtigte, extrem tiefe Sandbunker an Loch 17 des Old Course in St Andrews?",
    "a": [
      "Der gewaltige 'Hell Bunker' an Bahn 14",
      "Der winzige 'Coffin Bunker' im Fairway",
      "Der tiefe 'Principal's Nose' Bunkerkomplex",
      "Der gefürchtete 'Road Hole Bunker'"
    ],
    "correctIndex": 3,
    "exp": "Auch bekannt als 'Sands of Nakajima', nachdem Tommy Nakajima 1978 vier Schläge brauchte, um die steile Sandwand zu bezwingen.",
    "explanation": "Der Road Hole Bunker hat schon unzählige Major-Siegeshoffnungen im schottischen St Andrews zunichte gemacht."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Welcher Golfplatz trug 1894 als allererster Platz außerhalb Schottlands The Open Championship aus?",
    "a": [
      "Royal Birkdale Golf Club in Southport",
      "Royal Lytham & St Annes in Lancashire",
      "Royal Liverpool Golf Club in Hoylake",
      "Royal St George's Golf Club in Kent"
    ],
    "correctIndex": 3,
    "exp": "John Henry Taylor gewann 1894 in Royal St George's in Sandwich; bis dahin war The Open nur in Prestwick, St Andrews und Musselburgh gespielt worden.",
    "explanation": "Royal St George's brach 1894 das schottische Monopol auf die Ausrichtung der Open Championship."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Welcher spektakuläre Platz in Südafrika bietet das 'Extreme 19th', erreichbar nur per Helikopter auf einer Felsklippe?",
    "a": [
      "Leopard Creek Country Club am Krüger-Nationalpark",
      "Fancourt Links Course an der berühmten Garden Route",
      "Gary Player Country Club im Vergnügungsresort Sun City",
      "Legend Golf & Safari Resort im Hanglip Mountain"
    ],
    "correctIndex": 3,
    "exp": "Das Tee liegt 430 Meter über dem afrikanisch geformten Grün; der Ball benötigt fast 30 Sekunden freie Flugzeit bis zum Aufprall.",
    "explanation": "Das Extreme 19th im Legend Golf Resort ist das spektakulärste und höchste Par-3-Loch der Erde."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Welcher Golfarchitekt gestaltete gemeinsam mit Bobby Jones den ursprünglichen Augusta National Golf Club?",
    "a": [
      "Harry Colt aus London",
      "A.W. Tillinghast aus Philadelphia",
      "C.B. Macdonald aus Chicago",
      "Dr. Alister MacKenzie aus Leeds"
    ],
    "correctIndex": 3,
    "exp": "MacKenzie, Schöpfer von Cypress Point und Royal Melbourne, verstarb im Januar 1934 – nur zwei Monate vor dem ersten Masters-Turnier.",
    "explanation": "Dr. Alister MacKenzie vollendete Augusta National 1933, erlebte die erste Austragung des Masters jedoch nicht mehr."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Welcher berühmte Bunker auf dem Old Course in St Andrews an Bahn 14 misst fast zwei Meter Tiefe?",
    "a": [
      "Der tückische 'Coffin Bunker'",
      "Der berüchtigte 'Strath Bunker'",
      "Der sogenannte 'Elysian Fields' Bunker",
      "Der legendäre 'Hell Bunker'"
    ],
    "correctIndex": 3,
    "exp": "Jack Nicklaus benötigte 1995 im Hell Bunker vier Schläge, um den Ball zu befreien; der gigantische Krater schluckt regelmäßig lange Drives.",
    "explanation": "Hell Bunker an Loch 14 des Old Course ist einer der größten und furchteinflößendsten Bunker Schottlands."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Was bezeichnet der Begriff 'Stimpmeter' bei der professionellen Platzpflege von Meisterschaftsgrüns?",
    "a": [
      "Ein elektronisches Messgerät für Bodenfeuchtigkeit in Wurzelhöhe",
      "Ein mechanisches Präzisionsbeil zum exakten Stechen der Löcher",
      "Ein optisches Laser-Nivelliergerät zur Erkennung von Gefälle",
      "Eine V-förmige Aluminiumschiene zur Grünschnelligkeitsmessung"
    ],
    "correctIndex": 3,
    "exp": "Edward Stimpson erfand das Gerät 1935. Rollt der Ball nach dem Freigeben 13 Fuß weit, spricht man von 'Stimp 13' (extrem schnelle Grüns).",
    "explanation": "Das Stimpmeter misst die Ausrollweite eines freigegebenen Balls zur Bestimmung des Graspflege-Tempos."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Welcher kalifornische Platz in Cypress Point an der 16 verlangt einen 210-Meter-Teeshot direkt über den tosenden Ozean?",
    "a": [
      "The Links at Spanish Bay am 17-Mile Drive",
      "Bandon Dunes Golf Resort an der Felsenküste",
      "Pasatiempo Golf Club in Santa Cruz",
      "Cypress Point Club auf der Monterey-Halbinsel"
    ],
    "correctIndex": 3,
    "exp": "Loch 16 in Cypress Point gilt unter Golf-Puristen als das dramatischste und bildgewaltigste Par 3 der gesamten Erde.",
    "explanation": "Cypress Point Loch 16 verlangt den ultimativen Schlag über das schäumende Meer auf ein winziges Felsengrün."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Welcher Platz in Pennsylvania gilt mit Grünschnelligkeiten von Stimp 14 als die härteste Grünkulisse der Major-Geschichte?",
    "a": [
      "Merion Golf Club East Course",
      "Aronimink Golf Club in Newtown",
      "Lancaster Country Club in Pennsylvania",
      "Oakmont Country Club bei Pittsburgh"
    ],
    "correctIndex": 3,
    "exp": "Die Grüns in Oakmont sind so onduliert und rasant, dass bergab gespielte Putts oft 20 Meter über die Grünkante hinausrollen.",
    "explanation": "Oakmonts Grüns gelten weltweit als der Maßstab für gnadenlose Härte und atemberaubende Puttschnelligkeit."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Welcher Kurs in New York, gestaltet von C.B. Macdonald 1911, gilt als Geburtsstätte des strategischen Platzdesigns in den USA?",
    "a": [
      "Shinnecock Hills Golf Club in Southampton",
      "Maidstone Club in East Hampton",
      "Fishers Island Club im Long Island Sound",
      "National Golf Links of America auf Long Island"
    ],
    "correctIndex": 3,
    "exp": "Charles Blair Macdonald kopierte die besten europäischen Lochdesigns (Alps, Redan, Eden, Sahara) und schuf ein historisches Meisterwerk.",
    "explanation": "National Golf Links of America etablierte die klassische britische Locharchitektur auf US-amerikanischem Boden."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Was versteht man unter dem Begriff 'Alps'-Loch (wie Loch 3 im Prestwick Golf Club)?",
    "a": [
      "Ein Par-3-Loch, das auf über 2.000 Metern Höhe angelegt ist",
      "Eine Spielbahn, die nur im Zickzack steil bergauf verläuft",
      "Ein Grün, das ringsum von Schnee und Eisbergen gesäumt ist",
      "Ein Loch mit einem blinden Schlag über eine gewaltige Sanddüne"
    ],
    "correctIndex": 3,
    "exp": "Bei Prestwicks berühmtem Alps-Loch schlägt man blind über eine haushohe Düne auf ein dahinter liegendes Grün mit dem 'Sahara'-Bunker.",
    "explanation": "Das Alps-Loch ist das klassische Vorbild für blinde Annäherungsschläge über riesige Dünenformationen."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Welche Grasart dominiert die legendär pfeilschnellen Grüns in Augusta National seit ihrer Umstellung 1980?",
    "a": [
      "Tifway 419 Bermuda Grass",
      "Fescue Grass (Rotschwingel)",
      "Poa Annua (Einjähriges Rispengras)",
      "Penncross Bentgrass (Straußgras)"
    ],
    "correctIndex": 3,
    "exp": "Augusta wechselte von langsamem Bermuda auf Bentgrass; ein ausgeklügeltes Sub-Air-System belüftet und kühlt die Graswurzeln von unten.",
    "explanation": "Bentgrass ermöglicht die glasartigen, pfeilschnellen Grüns, die das Masters-Turnier berühmt machten."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Welcher Fluss schlängelt sich durch die Amen Corner in Augusta und schluckte dort unzählige Bälle?",
    "a": [
      "Savannah River am Rand des Geländes",
      "Swilcan Burn quer durch das Fairway",
      "Barry Burn vor dem 18. Grünkomplex",
      "Rae's Creek vor den Grüns 12 und 13"
    ],
    "correctIndex": 3,
    "exp": "Benannt nach John Rae, dessen Festung 1765 hier stand. Rae's Creek hütet das Grün der 12 und schneidet die Spielbahn von Loch 13 ab.",
    "explanation": "Rae's Creek bildet die berüchtigte Wasserbarriere vor dem Grün von Loch 12 und entlang von Loch 13 in Augusta."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Welcher Golfplatz auf der hawaiianischen Insel Maui eröffnet die PGA-Tour-Saison traditionell mit The Sentry?",
    "a": [
      "Der Waialae Country Club in Honolulu",
      "Der Ko Olina Golf Club auf Oahu",
      "Der Mauna Kea Golf Course auf Big Island",
      "Der Plantation Course in Kapalua"
    ],
    "correctIndex": 3,
    "exp": "Kapalua bietet riesige Höhenunterschiede am Hang eines Vulkans; Loch 18 ist ein 600 Meter langes Par 5 mit Drives bergab über 400 Meter.",
    "explanation": "Der Plantation Course in Kapalua begeistert zum Jahresauftakt mit dramatischen Abfahrten und Pazifikblicken."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Wo befindet sich der nördlichste 18-Loch-Golfplatz der Welt, auf dem im Sommer unter der Mitternachtssonne gespielt wird?",
    "a": [
      "Lofoten Links in Gimsøysand",
      "Reykjavik Golf Club in Island",
      "Rovaniemi Santa Claus Golf in Finnland",
      "Tromsø Golfpark in Norwegen"
    ],
    "correctIndex": 3,
    "exp": "Auf 69 Grad nördlicher Breite gelegen, kann man in Tromsø von Ende Mai bis Ende Juli 24 Stunden am Tag bei vollem Tageslicht abschlagen.",
    "explanation": "Tromsø Golfpark liegt tief im Polarkreis und ist der nördlichste 18-Loch-Golfplatz unseres Planeten."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Welcher historische Golfplatz in der Grafschaft Down verfügt über die weltberühmten 'Bearded Bunkers' mit Schilfhaaren?",
    "a": [
      "Royal Dublin Golf Club auf Bull Island",
      "County Sligo Golf Club in Rosses Point",
      "Lahinch Golf Club an der Westküste Irlands",
      "Royal County Down an der Newcastle Bay"
    ],
    "correctIndex": 3,
    "exp": "Die Bunker in Royal County Down sind von dichtem Heidekraut, Ginster und herabhängendem Schwingelgras ('Bärten') umrahmt.",
    "explanation": "Die 'bärtigen Bunker' von Royal County Down sind mit wildem Heidekraut überwuchert und weltberühmt."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Welcher Par-3-Klassiker an Loch 4 im Riviera Country Club wurde von Ben Hogan als 'das beste Par 3 der Welt' gepriesen?",
    "a": [
      "Das Inselgrün mitten im tosenden Pazifik",
      "Das extrem steile Bergablauf-Loch ins Bachtal",
      "Das blinde Loch über den historischen Eisenbahndamm",
      "Das lange Eisen-Schlagloch mit der Sycamore-Palme"
    ],
    "correctIndex": 3,
    "exp": "Hogan nannte Riviera 'Hogan's Alley', weil er dort 1948 in 18 Monaten die Los Angeles Open zweimal und die US Open gewann.",
    "explanation": "Rivieras Loch 4 verlangt einen extrem präzisen Schlag mit dem langen Eisen gegen den Wind von der Pazifikküste."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Welche Besonderheit weist Loch 6 im Riviera Country Club in Pacific Palisades mitten auf dem Grün auf?",
    "a": [
      "Einen hundertjährigen Mammutbaum auf der Kante",
      "Ein Loch mit zwei völlig getrennten Ebenen",
      "Eine tiefe Schlucht mit Hängebrücke für Caddies",
      "Einen kleinen Sandbunker mitten im Grün"
    ],
    "correctIndex": 3,
    "exp": "George C. Thomas platzierte 1926 einen Bunker mitten in das Grün von Loch 6; landet man auf der falschen Seite, muss man manchmal über den Bunker chippen!",
    "explanation": "Loch 6 in Riviera besitzt einen berühmt-berüchtigten Topfbunker genau im Zentrum des Putting-Grüns."
  },
  {
    "cat": "golf_plaetze",
    "diff": "pro",
    "q": "Welcher Golfplatz auf Long Island trug 1896 die zweite U.S. Open aus und besitzt das älteste Clubhaus der USA (Stanford White)?",
    "a": [
      "Garden City Golf Club auf Long Island",
      "Sleepy Hollow Country Club am Hudson",
      "The Creek Club in Locust Valley",
      "Shinnecock Hills Golf Club in Southampton"
    ],
    "correctIndex": 3,
    "exp": "Shinnecock Hills wurde 1891 gegründet und war der erste Club der USA, der auch Frauen als Mitglieder aufnahm.",
    "explanation": "Shinnecock Hills verbindet ehrwürdige US-Golfgeschichte mit dem ältesten erhaltenen Clubhaus von Stanford White (1892)."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("golf_plaetze", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["golf_plaetze"] = DATA;
  }
})();
