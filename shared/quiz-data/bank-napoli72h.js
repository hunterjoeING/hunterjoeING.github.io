// 160 kuratierte Fragen: Napoli72H (Aachen), Neapolitanische Backkunst, Italien & Frankenberger Viertel
// Index 0 von a[] ist stets die richtige Antwort (wird im Spiel gemischt).
(function () {
  const QUESTIONS = [
    // =========================================================================
    // KATEGORIE 1: NAPOLI72H & SPEISEKARTE (40 Fragen)
    // =========================================================================
    {
      id: 1,
      cat: 'napoli72h',
      diff: 'easy',
      q: 'Wofür steht die „72H“ im Namen von Napoli72H?',
      a: [
        '72 Stunden Teigruhe vor der Zubereitung',
        '72 °C Ofentemperatur beim Vorwärmen',
        '72 Zutaten auf der großen Party-Pizza',
        '72 Minuten Lieferzeit innerhalb Aachens'
      ],
      exp: 'Der Pizzateig bei Napoli72H ruht volle 72 Stunden, bevor er ausgerollt und frisch belegt wird – das macht ihn besonders luftig und bekömmlich.'
    },
    {
      id: 2,
      cat: 'napoli72h',
      diff: 'easy',
      q: 'Wie lange backt eine neapolitanische Pizza bei Napoli72H im Originalofen aus Neapel?',
      a: [
        'Etwa 60 Sekunden',
        'Etwa 6 Minuten',
        'Etwa 12 Minuten',
        'Etwa 30 Sekunden bei Unterhitze'
      ],
      exp: '72 Stunden Teigruhe, 485 °C Hitze und exakt rund 60 Sekunden Backzeit sorgen dafür, dass der Teig aufgeht und der Belag frisch bleibt.'
    },
    {
      id: 3,
      cat: 'napoli72h',
      diff: 'easy',
      q: 'Bei welcher Ofentemperatur wird bei Napoli72H gebacken?',
      a: [
        'Bei 485 °C Hitze',
        'Bei 240 °C Umluft',
        'Bei 320 °C Oberhitze',
        'Bei 180 °C im Steinbackrahmen'
      ],
      exp: 'Der Originalofen aus Neapel erreicht rund 485 °C – diese extreme Strahlungshitze löst winzige Explosionen im Teig aus.'
    },
    {
      id: 4,
      cat: 'napoli72h',
      diff: 'easy',
      q: 'In welchem Aachener Stadtviertel wurde der erste Standort von Napoli72H eröffnet?',
      a: [
        'Im Frankenberger Viertel (Oppenhoffallee)',
        'Im Pontviertel an der Pontstraße',
        'In Burtscheid am Abteitor',
        'In Laurensberg am Rathausplatz'
      ],
      exp: 'An der Oppenhoffallee 9–15 im Frankenberger Viertel startete Napoli72H – unter dem Motto „Vier Viertel für dein Viertel“.'
    },
    {
      id: 5,
      cat: 'napoli72h',
      diff: 'easy',
      q: 'Auf welcher zweiten Aachener Straße findest du inzwischen einen weiteren Standort von Napoli72H?',
      a: [
        'Auf der Franzstraße (Hausnummer 21–23)',
        'Auf dem Templergraben beim SuperC',
        'Auf der Vaalser Straße nahe Westbahnhof',
        'Auf der Jülicher Straße im Ostviertel'
      ],
      exp: 'Neben der Oppenhoffallee im Frankenberger Viertel serviert Napoli72H seine neapolitanischen Pizzen auch in der Franzstraße 21–23.'
    },
    {
      id: 6,
      cat: 'napoli72h',
      diff: 'easy',
      q: 'Welche zwei Grundzutaten bilden die klassische Basis fast jeder Pizza auf der Napoli72H-Karte?',
      a: [
        'Italienische San-Marzano-Tomatensoße und Fior di Latte Mozzarella',
        'Passierte Strauchtomaten aus Holland und geriebener Gouda',
        'Crème fraîche und gereifter Emmentaler',
        'Marinara-Basissoße und Emmentaler-Mischkäse'
      ],
      exp: 'Herzhafte San-Marzano-Tomaten aus Italien und frischer Kuhmilch-Mozzarella Fior di Latte bilden das authentische Fundament.'
    },
    {
      id: 7,
      cat: 'napoli72h',
      diff: 'easy',
      q: 'Wie kannst du bei Napoli72H verfolgen, wie dein Pizzateig geformt und gebacken wird?',
      a: [
        'Durch die offene Küche direkt im Gastraum',
        'Über einen Livestream auf der Tischkarte',
        'Durch ein Guckloch am Straßenverkauf',
        'Gar nicht – die Küche liegt im Hinterhof'
      ],
      exp: 'Durch die offene Küche siehst du live, wie deine Teigkugel per Hand gedehnt, belegt und für 60 Sekunden in den Ofen geschoben wird.'
    },
    {
      id: 8,
      cat: 'napoli72h',
      diff: 'easy',
      q: 'Was gehört bei Napoli72H von Montag bis Freitag (12:00–15:00 Uhr) zum Mittagsmenü?',
      a: [
        'Pizza oder Salat von der Karte plus ein 0,33l-Getränk und ein Espresso',
        'Nur eine Mini-Pizza ohne Getränk zum Mitnehmen',
        'Drei Vorspeisenteller plus Tiramisu-Buffet',
        'Zwei halbe Pizzen ohne Heißgetränk'
      ],
      exp: 'Ideal für die Mittagspause: Mo–Fr von 12 bis 15 Uhr gibt es Pizza oder Salat von der Karte samt 0,33l-Getränk und Espresso.'
    },
    {
      id: 9,
      cat: 'napoli72h',
      diff: 'easy',
      q: 'Welcher augenzwinkernde Spruch begegnet dir auf der Website und Speisekarte von Napoli72H immer wieder?',
      a: [
        '„Ohlala willst du eine Pizza?“',
        '„Pizza macht schön und schnell“',
        '„Kein Ketchup, keine Kompromisse“',
        '„Buongiorno Kaiserstadt!“'
      ],
      exp: '„Ohlala willst du eine Pizza?“ – mit dieser lockeren Begrüßung empfängt Napoli72H seine Gäste online wie vor Ort.'
    },
    {
      id: 10,
      cat: 'napoli72h',
      diff: 'easy',
      q: 'Wie lautet das Viertel-Motto auf der Startseite von Napoli72H?',
      a: [
        '„Vier Viertel für dein Viertel“',
        '„Acht Ecken für acht Gäste“',
        '„Sieben Tage, sieben Soßen“',
        '„Zwei Öfen für ganz NRW“'
      ],
      exp: '„Vier Viertel für dein Viertel“ schlägt die Brücke zwischen der gevierteilten Pizza und dem Frankenberger Viertel in Aachen.'
    },
    {
      id: 11,
      cat: 'napoli72h',
      diff: 'easy',
      q: 'Welche klassische Pizza bei Napoli72H kommt ganz ohne Käse aus und ist von Haus aus vegan?',
      a: [
        'Marinara (San-Marzano-Tomaten, Kapern, Cherrytomaten, Oregano, Knoblauchöl)',
        'Bufala (mit Basilikumpesto und Cherrytomaten)',
        'Stallone (mit Burrata, Parmesan und Pinienkernen)',
        'Ham Bääm (mit Champignons und Kochschinken)'
      ],
      exp: 'Die Marinara verzichtet traditionell auf Käse und glänzt mit San-Marzano-Tomaten, Kapern, Cherrytomaten, Oregano und Knoblauchöl.'
    },
    {
      id: 12,
      cat: 'napoli72h',
      diff: 'easy',
      q: 'Welche drei süßen Klassiker (plus Brownie) krönen die Dessert-Rubrik auf der Napoli72H-Karte?',
      a: [
        'Tiramisu, Pizza Nutella und Schokotörtchen mit flüssigem Kern',
        'Panna Cotta, Apfelstrudel und Gelato-Waffel',
        'Cannoli Siciliani, Crème Brûlée und Obstsalat',
        'Kaiserschmarrn, Zabaglione und Profiteroles'
      ],
      exp: 'Zum krönenden Abschluss stehen unter „END“ unter anderem Brownie Brown, Tiramisu, Pizza Nutella und Schokotörtchen mit flüssigem Kern bereit.'
    },
    {
      id: 13,
      cat: 'napoli72h',
      diff: 'easy',
      q: 'Woran erinnert das charakteristische Fleckenmuster auf dem knusprigen Rand einer Napoli72H-Pizza?',
      a: [
        'An das Fellmuster eines Leoparden („Leoparding“)',
        'An konzentrische Baumringe im Holz',
        'An das Schachbrettmuster einer Tischdecke',
        'An das Wellenmuster der Nordsee'
      ],
      exp: 'Die 485 °C Hitze lässt Luftbläschen blitzschnell aufplatzen und punktuell karamellisieren – das typische Leoparden-Fleckenmuster.'
    },
    {
      id: 14,
      cat: 'napoli72h',
      diff: 'easy',
      q: 'Wann öffnet Napoli72H an allen sieben Tagen der Woche seine Türen?',
      a: [
        'Täglich ab 12:00 Uhr mittags',
        'Werktags erst ab 17:00 Uhr abends',
        'Morgens ab 09:00 Uhr zum Frühstück',
        'Dienstags bis sonntags ab 14:30 Uhr'
      ],
      exp: 'Ob Mittagspause oder späte Pizza: Napoli72H öffnet täglich ab 12:00 Uhr (Mo–Do & So bis 22:00 Uhr, Fr & Sa bis 23:00 Uhr).'
    },
    {
      id: 15,
      cat: 'napoli72h',
      diff: 'easy',
      q: 'Welche Zutat macht die Pizza „Ham Bääm“ bei Napoli72H aus?',
      a: [
        'Kochschinken und Champignons auf San-Marzano-Tomaten & Fior di Latte',
        'Parmaschinken, Rucola und gehobelter Parmesan',
        'Black Angus Bresaola und Ziegenkäse',
        'Salami Calabrese, Peperoni und Rote Zwiebeln'
      ],
      exp: 'Die „Ham Bääm“ ist die saftige neapolitanische Interpretation des Klassikers mit Kochschinken und Champignons.'
    },
    {
      id: 16,
      cat: 'napoli72h',
      diff: 'mid',
      q: 'Aus welcher historischen Jahreszahl stammt laut Napoli72H „Nonnas Original Rezept“?',
      a: [
        'Aus dem Jahr 1804',
        'Aus dem Jahr 1889',
        'Aus dem Jahr 1927',
        'Aus dem Jahr 1954'
      ],
      exp: '„Nach Nonnas Original Rezept von 1804“ – so verbindet Napoli72H alte Familientradition aus Neapel mit frischem Aachener Handwerk.'
    },
    {
      id: 17,
      cat: 'napoli72h',
      diff: 'mid',
      q: 'Welche zwei Beläge verleihen der Pizza „Don Tito“ ihren spanisch-feurigen Twist mit süßer Note?',
      a: [
        'Chorizo Ibérico und Bio-Chilihonig',
        'Salami Napoli und frische Feigen',
        '’Nduja aus Kalabrien und Pinienkerne',
        'Südtiroler Bacon und Balsamicocreme'
      ],
      exp: 'Die „Don Tito“ vereint würzige Chorizo Ibérico, cremigen Fior di Latte und einen Schuss Bio-Chilihonig auf San-Marzano-Soße.'
    },
    {
      id: 18,
      cat: 'napoli72h',
      diff: 'mid',
      q: 'Wie heißt die fruchtig-cremige Pizza mit Feigen, Ziegenkäse und Honig auf der Karte?',
      a: [
        'Fichi',
        'Capra',
        'Mäh',
        'Veggie'
      ],
      exp: '„Fichi“ (italienisch für Feigen) kombiniert süße Feigen, cremigen Ziegenkäse, Honig, San-Marzano-Tomaten und Fior di Latte.'
    },
    {
      id: 19,
      cat: 'napoli72h',
      diff: 'mid',
      q: 'Was liegt neben Ziegenkäse und Bio-Chilihonig auf der vegetarischen Pizza „Mäh“?',
      a: [
        'Babyspinat, Walnüsse und Cherrytomaten',
        'Feigen, Rucola und Pinienkerne',
        'Artischocken, Aubergine und Kalamata-Oliven',
        'Trüffelcreme, Champignons und Parmesan'
      ],
      exp: 'Die „Mäh“ spielt charmant auf den Ziegenkäse an und ergänzt ihn mit Babyspinat, knackigen Walnüssen, Cherrytomaten und Bio-Chilihonig.'
    },
    {
      id: 20,
      cat: 'napoli72h',
      diff: 'mid',
      q: 'Welche vegetarische Signatur-Pizza verzichtet auf rote Tomatensoße und startet stattdessen mit Basilikum-Pesto & Burrata?',
      a: [
        'Stallone',
        'Bufala',
        'Focaccia',
        'Parma 72'
      ],
      exp: 'Die „Stallone“ setzt auf eine cremige Basis aus Basilikum-Pesto und ganzer Burrata, abgerundet mit Parmesan, Cherrytomaten und Pinienkernen.'
    },
    {
      id: 21,
      cat: 'napoli72h',
      diff: 'mid',
      q: 'Welche zwei Zutaten sorgen bei der Pizza „Al Pacino“ für kräftige, herzhafte Röstaromen?',
      a: [
        'Provolone-Käse und Südtiroler Bacon (mit Champignons)',
        'Chorizo Ibérico und rote Zwiebeln',
        'Parmaschinken und Rucola',
        'Black Angus Bresaola und Parmesan'
      ],
      exp: 'Neben San-Marzano-Tomaten, Fior di Latte und Champignons geben würziger Provolone und Südtiroler Speck der „Al Pacino“ ihren Charakter.'
    },
    {
      id: 22,
      cat: 'napoli72h',
      diff: 'mid',
      q: 'Welche spezielle Salami aus Italien veredelt die Pizza „Salami Fino“?',
      a: [
        'Toskanische Fenchel-Salami',
        'Scharfe kalabrische Streichwurst ’Nduja',
        'Gepökelte Mailänder Knoblauchsalami',
        'Geräucherte ungarische Paprikasalami'
      ],
      exp: 'Auf der „Salami Fino“ trifft Fior di Latte auf aromatische Fenchel-Salami aus der Toskana – würzig, aber mit milder Fenchelnote.'
    },
    {
      id: 23,
      cat: 'napoli72h',
      diff: 'mid',
      q: 'Welche Pizza kombiniert Meer und Kräutergarten mit Lachs, Avocado und Pesto?',
      a: [
        'Pizza Avocado',
        'Pizza Gamberoni',
        'Pizza White Tuna',
        'Pizza Vegano'
      ],
      exp: 'Die Pizza „Avocado“ belegt die Tomaten-Fior-di-Latte-Basis mit Cherrytomaten, feinem Lachs, frischer Avocado und aromatischem Pesto.'
    },
    {
      id: 24,
      cat: 'napoli72h',
      diff: 'mid',
      q: 'Worin unterscheiden sich die Pizzen „Parma 72“ und „Bresaola“ bei sonst fast identischem Finish?',
      a: [
        'Luftgetrockneter Parmaschinken vs. zartes Black-Angus-Bresaola-Rindfleisch',
        'Büffelmozzarella vs. Provolone auf Weißweinsoße',
        'Babyspinat und Walnüsse vs. Rucola und Pinienkerne',
        'Tomatenbasis vs. weiße Trüffelcremebasis'
      ],
      exp: 'Beide tragen Rucola, Parmesan, Olivenöl und Cherrytomaten – die „Parma 72“ setzt auf Parmaschinken, die „Bresaola“ auf luftgetrocknetes Black Angus Beef.'
    },
    {
      id: 25,
      cat: 'napoli72h',
      diff: 'mid',
      q: 'Welche schlotzig-cremige Pasta-Filata-Spezialität steht bei den Vorspeisen gleich neben Parmaschinken und hausgemachtem Pesto?',
      a: [
        'Burrata (im Gericht „Burrata & Parma“)',
        'Ricotta al Forno (mit Zitronenzeste)',
        'Stracchino (mit gerösteten Haselnüssen)',
        'Gorgonzola Dolce (mit Birnen)'
      ],
      exp: 'Die Vorspeise „Burrata & Parma“ kombiniert einen frischen Burrata-Kern mit Parmaschinken, Basilikum, Pesto, Cherrytomaten und Olio Extra Vergine.'
    },
    {
      id: 26,
      cat: 'napoli72h',
      diff: 'mid',
      q: 'Welches ist das große gemischte Antipasti-Brett zum Teilen mit Parmaschinken, Salami, Bresaola, Speck, Büffelmozzarella und Provolone?',
      a: [
        'Antipasti Finito',
        'Antipasti Veggitalia',
        'Bruschetta 72',
        'Insalata Capra'
      ],
      exp: '„Antipasti Finito“ fährt eine ganze Wurst- und Käseplatte italienischer Spezialitäten plus warmes Focaccia auf.'
    },
    {
      id: 27,
      cat: 'napoli72h',
      diff: 'mid',
      q: 'Was ist das Besondere an der Vorspeise „Bruschetta 72“ laut Speisekarte?',
      a: [
        'Es wird auf hausgemachtem Brot mit Tomaten, Basilikum & Knoblauch serviert',
        'Es besteht aus 72 kleinen gerösteten Baguettescheiben',
        'Es wird statt Tomaten mit Avocado und Lachstatar belegt',
        'Es enthält zwingend Büffelmozzarella und Sardellenfilets'
      ],
      exp: 'Anders als manche Restaurantketten backt Napoli72H auch das Brot für die Bruschetta selbst – darauf kommen reife Tomaten, Basilikum und Knoblauch.'
    },
    {
      id: 28,
      cat: 'napoli72h',
      diff: 'mid',
      q: 'Welcher Salat von Napoli72H passt perfekt zu Fans der Ziegenkäse-Honig-Pizza „Fichi“ oder „Mäh“?',
      a: [
        'Salat Capra (mit karamellisiertem Ziegenkäse, Walnüssen und Honig)',
        'Salat Caesar (mit Hähnchenbrust und Parmesan)',
        'Salat Gambas (mit Riesengarnelen und Avocado)',
        'Salat Mista (mit Kalamata-Oliven und roten Zwiebeln)'
      ],
      exp: 'Der vegetarische Salat „Capra“ setzt auf karamellisierten Ziegenkäse, knackige Walnüsse, Honig, Cherrytomaten, Gurke und Brot.'
    },
    {
      id: 29,
      cat: 'napoli72h',
      diff: 'mid',
      q: 'Welche zwei Zutaten machen die Pizza „Gamberoni“ so aromatisch?',
      a: [
        'Gambas auf Babyspinat mit feinem Knoblauchöl',
        'Thunfischfilet mit Kapern und Oregano',
        'Lachsfilet mit Trüffelcreme und Rucola',
        'Sardellen mit Oliven und scharfen Peperoni'
      ],
      exp: 'Bei der „Gamberoni“ gesellen sich zu San-Marzano-Tomaten und Fior di Latte saftige Gambas, Babyspinat und Knoblauchöl.'
    },
    {
      id: 30,
      cat: 'napoli72h',
      diff: 'mid',
      q: 'Wie wird bei Napoli72H die luxuriöse Pizza „Oh Tartufo“ aufgebaut?',
      a: [
        'Mit Trüffelcreme, Fior di Latte, frischem Trüffel und Parmesan (ohne Tomatensoße)',
        'Mit San-Marzano-Tomaten, Champignons und Trüffelöl',
        'Mit weißer Burrata, Walnüssen und schwarzem Knoblauch',
        'Mit Kochschinken, Steinpilzen und Provolone'
      ],
      exp: 'Als Pizza Bianca verzichtet die „Oh Tartufo“ bewusst auf Tomatensoße, damit Trüffelcreme, frischer Trüffel, Fior di Latte und Parmesan voll zur Geltung kommen.'
    },
    {
      id: 31,
      cat: 'napoli72h',
      diff: 'pro',
      q: 'Welche drei Extras lassen sich laut Napoli72H-Speisekarte auf Wunsch direkt unter der Pizza „Marinara“ dazubuchen?',
      a: [
        'Fior di Latte Mozzarella, Büffelmozzarella oder Sardellen',
        'Gorgonzola, Kapernapfel oder Trüffelbutter',
        'Parmaschinken, Walnüsse oder Honig',
        'Gambas, Lachsfilet oder Avocado'
      ],
      exp: 'Aus der puren Marinara wird im Handumdrehen deine Wunschpizza: Die Karte bietet dort direkt Fior di Latte, Büffelmozzarella und Sardellen als Upgrade.'
    },
    {
      id: 32,
      cat: 'napoli72h',
      diff: 'pro',
      q: 'Wie unterscheidet sich die Pizza „Bufala“ bei Napoli72H geschmacklich von einer klassischen Margherita?',
      a: [
        'Sie nutzt Büffelmozzarella, Basilikumpesto und Cherrytomaten statt nur Fior di Latte & ganzer Blätter',
        'Sie wird ganz ohne Tomatensoße als Pizza Bianca gebacken',
        'Sie ersetzt das Olivenöl durch scharfen Chilihonig',
        'Sie wird vor dem Backen zweimal übereinandergefaltet wie eine Calzone'
      ],
      exp: 'Die „Bufala“ punktet nicht nur mit echtem Büffelmozzarella, sondern bringt zusätzlich aromatisches Basilikumpesto und süße Cherrytomaten mit.'
    },
    {
      id: 33,
      cat: 'napoli72h',
      diff: 'pro',
      q: 'Welcher Belag ist auf der vegetarischen Pizza „Veggie“ laut Karte enthalten, fehlt jedoch bei der veganen Schwester „Vegano“?',
      a: [
        'Paprika (während beide Artischocke, Zucchini, Aubergine und Knoblauchöl teilen)',
        'Champignons und rote Zwiebeln',
        'Babyspinat und Kapern',
        'Kalamata-Oliven und getrocknete Tomaten'
      ],
      exp: 'Ein feiner Karten-Detailblick: „Veggie“ listet Artischocke, Zucchini, Aubergine, Paprika & Knoblauchöl; „Vegano“ kombiniert veganen Bio-Mozzarella mit Artischocke, Zucchini, Aubergine & Knoblauchöl.'
    },
    {
      id: 34,
      cat: 'napoli72h',
      diff: 'pro',
      q: 'Wie lange hat Napoli72H am Freitag- und Samstagabend länger geöffnet als von Sonntag bis Donnerstag?',
      a: [
        'Eine Stunde länger (bis 23:00 Uhr statt 22:00 Uhr)',
        'Zwei Stunden länger (bis Mitternacht statt 22:00 Uhr)',
        'Halbstündlich länger (bis 22:30 Uhr statt 22:00 Uhr)',
        'Gar nicht – die Schließzeit liegt immer bei 22:00 Uhr'
      ],
      exp: 'Sonntag bis Donnerstag schließt der Ofen um 22:00 Uhr, am Wochenende (Freitag & Samstag) brennt er eine Stunde länger bis 23:00 Uhr.'
    },
    {
      id: 35,
      cat: 'napoli72h',
      diff: 'pro',
      q: 'Welches Dressing begleitet den Garnelen-Avocado-Salat „Gambas“ bei Napoli72H?',
      a: [
        'Ein Honig-Senf-Dressing',
        'Ein klassisches Caesar-Dressing mit Sardellen',
        'Ein dunkler Balsamico-Olivenöl-Mix',
        'Ein Zitronen-Pesto-Dressing'
      ],
      exp: 'Während „Mista“ und „Capra“ auf Balsamico & Olivenöl setzen, rundet beim Salat „Gambas“ ein mild-würziges Honig-Senf-Dressing Avocado und Garnelen ab.'
    },
    {
      id: 36,
      cat: 'napoli72h',
      diff: 'pro',
      q: 'Welche zwei roten Wurstsorten trennen die Pizzen „Salami Napo“ und „Diavolo“ auf der Napoli72H-Karte?',
      a: [
        'Milde Salami Napoli vs. scharfe Salami Calabrese mit Peperoni',
        'Fenchel-Salami vs. Chorizo Ibérico mit Chili',
        'Black Angus Bresaola vs. Südtiroler Bacon',
        'Mailänder Salami vs. kalabrische Streichwurst ’Nduja'
      ],
      exp: '„Salami Napo“ steht für klassische neapolitanische Salami, während „Diavolo“ mit feuriger Salami Calabrese und Peperoni ordentlich Dampf macht.'
    },
    {
      id: 37,
      cat: 'napoli72h',
      diff: 'pro',
      q: 'Welche Zutat sorgt beim Salat „Caesar“ von Napoli72H neben Parmesan und Hähnchenbrust für den Knusperfaktor?',
      a: [
        'Kleine Bread Rolls plus ein Stück frisches Brot',
        'Geröstete Pinienkerne und Walnüsse',
        'Karamellisierte Focaccia-Stangen mit Bacon',
        'Gebackene Grana-Chips aus dem Pizzaofen'
      ],
      exp: 'Auf der Karte kombiniert der „Caesar“ bunte Blattsalate, Cherrytomaten und Gurken mit Hähnchenbruststreifen, Bread Rolls, Parmesan, Caesar-Dressing und Brot.'
    },
    {
      id: 38,
      cat: 'napoli72h',
      diff: 'pro',
      q: 'Welcher Fisch bzw. welche Zwiebelsorte steckt auf der Pizza „White Tuna“?',
      a: [
        'Thunfischfilet und rote Zwiebeln',
        'Weißer Thunfischbauch und Frühlingslauch',
        'Sardellenfilet und karamellisierte Schalotten',
        'Geräucherter Lachs und eingelegte Silberzwiebeln'
      ],
      exp: 'Die „White Tuna“ setzt auf hochwertiges Thunfischfilet kombiniert mit aromatischen roten Zwiebeln auf Fior di Latte und San-Marzano-Soße.'
    },
    {
      id: 39,
      cat: 'napoli72h',
      diff: 'pro',
      q: 'Welches feine Detail verbindet die vegane Vorspeise „Antipasti Veggitalia“ mit der vegetarischen Pizza „Veggie“?',
      a: [
        'Beide vereinen gegrillte bzw. eingelegte Zucchini, Aubergine, Paprika und Artischocken',
        'Beide werden zwingend mit Bio-Chilihonig abgeschmeckt',
        'Beide nutzen eine Basis aus Trüffelcreme und Rucola',
        'Beide enthalten Kalamata-Oliven und getrocknete Kapern'
      ],
      exp: 'Zucchini, Aubergine, Paprika und Artischocken bilden das bunte mediterrane Quartett beider Gerichte (Antipasti Veggitalia ergänzt um Oliven & getrocknete Tomaten).'
    },
    {
      id: 40,
      cat: 'napoli72h',
      diff: 'pro',
      q: 'Wie sind Pizza-Reservierungen laut Website von Napoli72H aktuell organisiert?',
      a: [
        'Ausschließlich telefonisch über die beiden Nummern der Filialen',
        'Ausschließlich über ein QR-Formular am Eingang',
        'Gar nicht – es gilt striktes Walk-in-Prinzip',
        'Nur per Direktnachricht auf Instagram 48 Stunden vorab'
      ],
      exp: 'Für Oppenhoffallee (0241 99030091) und Franzstraße (0241 95713670) nimmt Napoli72H Tischreservierungen direkt per Anruf entgegen.'
    },

    // =========================================================================
    // KATEGORIE 2: KUNST DER PIZZA NAPOLETANA (40 Fragen)
    // =========================================================================
    {
      id: 41,
      cat: 'handwerk',
      diff: 'easy',
      q: 'Wie nennen italienische Pizzaioli den typisch hohen, luftigen Rand einer neapolitanischen Pizza?',
      a: [
        'Cornicione (das „Gesims“)',
        'Canotto (das Schlauchboot für Extras)',
        'Biga (der Vorteig)',
        'Pala (die Ofenschaufel)'
      ],
      exp: '„Cornicione“ bedeutet wörtlich Gesims – beim richtigen Ausbreiten schiebt man die Gärluft gezielt in diesen äußeren Kranz.'
    },
    {
      id: 42,
      cat: 'handwerk',
      diff: 'easy',
      q: 'Warum kommt bei echter Pizza Napoletana beim Ausrollen niemals ein Nudelholz zum Einsatz?',
      a: [
        'Es würde die feinen Gärbläschen zerdrücken, sodass der Rand platt bliebe',
        'Holz würde an dem 72h-Teig chemisch kleben bleiben',
        'Nudelhölzer sind in Kampanien per Gesetz verboten',
        'Weil der Teig dadurch zu viel Salz verlieren würde'
      ],
      exp: 'Beim Hand-Dehnen (Stesura) wandert die während 72 Stunden entstandene Luft behutsam nach außen in den Cornicione – ein Nudelholz würde sie herauspressen.'
    },
    {
      id: 43,
      cat: 'handwerk',
      diff: 'easy',
      q: 'Welcher italienische Weichmehl-Typ („Mahlgrad“) ist der Standard für neapolitanischen Pizzateig?',
      a: [
        'Tipo 00 (sehr fein ausgemahlenes Weichweizenmehl)',
        'Tipo 1050 (dunkles Mischbrotmehl)',
        'Hartweizengrieß Semola di Grano Duro zu 100 %',
        'Roggenmehl Type 1150'
      ],
      exp: 'Tipo 00 bezeichnet extrem feines, aschearmes Weizenmehl aus dem inneren Mehlkern, das besonders elastischen und samtigen Teig ermöglicht.'
    },
    {
      id: 44,
      cat: 'handwerk',
      diff: 'easy',
      q: 'Welche berühmte Tomatensorte wächst auf vulkanischen Böden am Vesuv und wird für echte Napoletana zerdrückt?',
      a: [
        'San-Marzano-Tomate (DOP)',
        'Ochsenherztomate aus Ligurien',
        'Strauchtomate aus Almería',
        'Grüne Tomatillo aus Mittelamerika'
      ],
      exp: 'Die längliche San-Marzano-Tomate aus dem Agro Sarnese-Nocerino nahe dem Vesuv besitzt viel Fruchtfleisch, wenig Kerne und eine ausgewogene Süße.'
    },
    {
      id: 45,
      cat: 'handwerk',
      diff: 'easy',
      q: 'Worin liegt der wesentliche Vorteil einer langen, kalten Teigführung über 48–72 Stunden?',
      a: [
        'Enzyme und Hefen spalten komplexe Zucker & Stärke vor, der Teig wird bekömmlicher und aromatischer',
        'Das Salz verdunstet dabei komplett aus dem Teig',
        'Man spart komplett die Zugabe von Wasser ein',
        'Die Pizza braucht anschließend keinen Ofen mehr'
      ],
      exp: 'Durch die lange Reifezeit werden schwer verdauliche Zucker (FODMAPs) abgebaut und feine Aminosäuren entstehen – das berühmte „Schwere-los“-Gefühl nach dem Essen.'
    },
    {
      id: 46,
      cat: 'handwerk',
      diff: 'easy',
      q: 'Warum trocknet die Tomatensoße bei 485 °C und 60 Sekunden Backzeit nicht aus?',
      a: [
        'Weil sie so kurz backt, dass ihr Wasseranteil nur leicht eindickt, statt zu verkochen',
        'Weil sie erst nach dem Backen kalt aufgepinselt wird',
        'Weil dem Ofen permanent kalter Wasserdampf zugeführt wird',
        'Weil man neapolitanische Tomaten vorher frittiert'
      ],
      exp: 'In normalen Elektroöfen (10–15 Min.) verdampft zu viel Feuchtigkeit; die Blitzhitze von 60 Sekunden gart Boden und Belag zugleich punktgenau.'
    },
    {
      id: 47,
      cat: 'handwerk',
      diff: 'easy',
      q: 'Was genau ist „Fior di Latte“ auf einer Pizzaspeisekarte?',
      a: [
        'Frischer Mozzarella aus pasteurisierter Kuhmilch',
        'Gereifter Hartkäse aus Schafsmilch',
        'Gesüßte Sahne für italienische Desserts',
        'Frischer Ziegenfrischkäse in Olivenöl'
      ],
      exp: '„Fior di Latte“ („Milchblüte“) ist Mozzarella aus Kuhmilch: Er gibt beim 485-°C-Backen weniger Molke ab als Büffelmozzarella und schmilzt herrlich gleichmäßig.'
    },
    {
      id: 48,
      cat: 'handwerk',
      diff: 'easy',
      q: 'Welche vier Zutaten gehören klassischerweise NUR in einen traditionellen neapolitanischen Pizzateig?',
      a: [
        'Mehl, Wasser, Salz und Hefe (kein Öl, kein Zucker)',
        'Mehl, Milch, Butter und Backpulver',
        'Mehl, Eier, Olivenöl und Honig',
        'Mehl, Weißwein, Schmalz und Natron'
      ],
      exp: 'Strenge neapolitanische Tradition: Nur Wasser, Tipo-00-Mehl, Meersalz und eine winzige Prise Hefe – weder Olivenöl noch Zucker wandern in den Teig!'
    },
    {
      id: 49,
      cat: 'handwerk',
      diff: 'easy',
      q: 'Welche drei Farben symbolisieren auf einer klassischen Pizza Margherita angeblich die italienische Flagge?',
      a: [
        'Grün (Basilikum), Weiß (Mozzarella) und Rot (Tomate)',
        'Grün (Rucola), Gelb (Ei) und Schwarz (Oliven)',
        'Weiß (Ricotta), Gold (Honig) und Rot (Chili)',
        'Grün (Pesto), Blau (Käse) und Rot (Salami)'
      ],
      exp: 'Der Legende nach widmete Neapels Pizzabäcker Raffaele Esposito 1889 Königin Margherita eine Pizza im „Tricolore“-Design.'
    },
    {
      id: 50,
      cat: 'handwerk',
      diff: 'easy',
      q: 'Was bezeichnet bei Pizzabäckern der Begriff „Hydration“ (Hydratation)?',
      a: [
        'Das Gewichtsverhältnis von Wasser zu Mehl in Prozent',
        'Das Befeuchten der Steinplatte mit dem Wischmopp',
        'Die Luftfeuchtigkeit im Kühlraum bei 72 Stunden Gare',
        'Die Menge an Olivenöl auf dem fertigen Pizzarand'
      ],
      exp: 'Bei 1.000 g Mehl und 650 g Wasser spricht man von 65 % Hydration – je höher sie ist, desto luftiger, aber auch klebriger wird der Teig.'
    },
    {
      id: 51,
      cat: 'handwerk',
      diff: 'easy',
      q: 'Wieso dürfen italienische Pizza-Ofenkuppeln traditionell niedrig gewölbt sein?',
      a: [
        'Um intensive Oberhitze direkt auf Belag und Rand zurückzustrahlen',
        'Damit weniger Brennholz hineinpasst',
        'Damit der Pizzaiolo nicht in die Flamme schauen muss',
        'Um die Pizza automatisch umzudrehen'
      ],
      exp: 'Das niedrige Kuppeldach speichert enorme Hitze und reflektiert Infrarotstrahlung unmittelbar auf Mozzarella und Cornicione.'
    },
    {
      id: 52,
      cat: 'handwerk',
      diff: 'easy',
      q: 'Was ist das Markenzeichen beim Schneiden einer echten neapolitanischen Pizza – wie isst man sie in Neapel klassisch auch ohne Messer?',
      a: [
        'Weicher, biegsamer Boden („a portafoglio“ – doppelt gefaltet wie ein Portemonnaie)',
        'Brett-harter Boden, der beim Aufstoßen wie ein Keks zerbricht',
        'Löffelweise aus einer tiefen gusseisernen Pfanne',
        'Aufgerollt zu einem langen Baguette-Zopf'
      ],
      exp: 'Die „Pizza a portafoglio“ wird in Neapels Straßen gleich zweimal gefaltet wie eine Brieftasche – deshalb bleibt die Mitte geschmeidig weich statt knäckebrothart.'
    },
    {
      id: 53,
      cat: 'handwerk',
      diff: 'easy',
      q: 'Wann wurde die traditionelle Kunst der neapolitanischen „Pizzaiuoli“ von der UNESCO zum Immateriellen Kulturerbe ernannt?',
      a: [
        'Im Jahr 2017',
        'Im Jahr 1995',
        'Im Jahr 2004',
        'Im Jahr 2023'
      ],
      exp: 'Am 7. Dezember 2017 nahm die UNESCO die Kunst der neapolitanischen Pizzabäcker offiziell in die Liste des Immateriellen Kulturerbes der Menschheit auf.'
    },
    {
      id: 54,
      cat: 'handwerk',
      diff: 'easy',
      q: 'Was trägt der Pizzaiolo auf die Holz- oder Alu-Schaufel auf, damit die frische Pizza nicht daran kleben bleibt, bevor sie in den Ofen rutscht?',
      a: [
        'Etwas Mehl oder feinen Hartweizengrieß (Semola)',
        'Eine großzügige Schicht Sonnenblumenöl',
        'Kaltes Backpapier in runder Form',
        'Salzwasser mit einem Rosmarinzweig'
      ],
      exp: 'Feine Semola (Hartweizengrieß) wirkt wie mikroskopisch kleine Kügelchen unter dem Teig und verbrennt im Ofen deutlich langsamer als feines Weizenmehl.'
    },
    {
      id: 55,
      cat: 'handwerk',
      diff: 'easy',
      q: 'Wieso wird die rohe neapolitanische Tomatensoße vor dem Backen meistens NICHT extra im Topf eingekocht?',
      a: [
        'Damit sie im 485-°C-Ofen nicht doppelt gart und ihren frisch-fruchtigen Geschmack behält',
        'Weil gekochte Tomaten im Steinofen flüssig würden wie Suppe',
        'Um Gas in der Küche zu sparen',
        'Weil man rohe Tomaten sonst nicht salzen könnte'
      ],
      exp: 'Zerdrückte San-Marzano-Tomaten + etwas Meersalz wandern roh auf den Teig – der 485-°C-Ofen gart sie frisch auf den Punkt.'
    },
    {
      id: 56,
      cat: 'handwerk',
      diff: 'mid',
      q: 'Was misst der sogenannte „W-Wert“ auf italienischen Pizza-Mehlpackungen (z. B. W 280–320)?',
      a: [
        'Die Backstärke bzw. Dehnarbeit des Gluten-Netzwerks für lange Gärzeiten',
        'Den Wassergehalt in Gewichtsprozent beim Mahlen',
        'Die maximale Wattzahl des empfohlenen Steinofens',
        'Den Weißheitsgrad des Auszugsmehls im Lichtspektrum'
      ],
      exp: 'Der Chopin-Alveograph bestimmt den W-Wert: Für 48–72 Stunden lange Teigführung braucht man ein kräftiges Mehl (meist W 280 bis W 340), sonst reißt das Glutengerüst.'
    },
    {
      id: 57,
      cat: 'handwerk',
      diff: 'mid',
      q: 'Welche zwei Aufgaben erfüllt das Salz im Pizzateig neben dem Geschmack?',
      a: [
        'Es festigt das Glutennetzwerk und bremst die Hefeaktivität kontrolliert ab',
        'Es färbt den Boden weiß und verhindert Bräunung',
        'Es ersetzt bei über 65 % Hydration das Olivenöl',
        'Es senkt die Backtemperatur des Steinofens um 80 °C'
      ],
      exp: 'Salz stärkt die Elastizität der Kleberstränge und zügelt die Gärung – käme es direkt auf Trockenhefe, könnte es diese allerdings hemmen.'
    },
    {
      id: 58,
      cat: 'handwerk',
      diff: 'mid',
      q: 'Wie nennt man bei mehrstufiger Pizza-Teigführung den festen, eher trockenen italienischen Vorteig (ca. 45–50 % Wasser), der lange reift?',
      a: [
        'Biga',
        'Poolish',
        'Pasta Madre',
        'Lievito'
      ],
      exp: 'Biga ist ein trockener, bröckeliger italienischer Vorteig für enorme Aromatik und luftige Krume – im Gegensatz zum flüssigen, 1:1 gemischten Poolish.'
    },
    {
      id: 59,
      cat: 'handwerk',
      diff: 'mid',
      q: 'Warum wird der Ofenboden in Neapel oft aus vulkanischer Terracotta („Biscotto di Sorrento“) gefertigt?',
      a: [
        'Der poröse Stein gibt Wärme sanfter ab, sodass der Boden trotz 485 °C in 60s nicht verbrennt',
        'Weil gewöhnlicher Granit bei über 200 °C schmilzt',
        'Damit sich Rauch- und Tomatenreste für immer einbrennen',
        'Weil Biscotto-Ton deutlich schwerer ist und sich leichter feucht wischt'
      ],
      exp: 'Schamotte würde bei 485 °C die Unterseite zu schnell verkohlen; der poröse Biscotto aus Sorrent/Caserta drosselt die Wärmeleitung genau richtig.'
    },
    {
      id: 60,
      cat: 'handwerk',
      diff: 'mid',
      q: 'Warum legen Spitzen-Pizzaioli den frischen Büffelmozzarella (Mozzarella di Bufala) oft abgetropft oder gar erst halb gegart auf?',
      a: [
        'Weil Büffelmilch-Mozzarella deutlich mehr Wasser enthält und sonst die Mitte aufweicht',
        'Weil Büffelmozzarella bei über 100 °C bitter wird',
        'Weil er sonst zu festen Fäden wie Emmentaler aushärtet',
        'Weil er erst bei Kälte weiß wird'
      ],
      exp: 'Büffelmozzarella ist ein feuchter Frischkäse – gut in Streifen vorab abgetropft, behält die Pizza trotz cremiger Pfützen ihre Struktur.'
    },
    {
      id: 61,
      cat: 'handwerk',
      diff: 'mid',
      q: 'Was versteht man unter „Puntata“ und „Appretto“ bei einem 72-Stunden-Pizzateig?',
      a: [
        'Stockgare (als Gesamtteig) gefolgt von Stückgare (als einzelne geformte Teigballen/Panetti)',
        'Erstes Einschießen gefolgt vom Wenden im Ofen',
        'Kneten mit der Hand gefolgt vom Falten in der Maschine',
        'Auftragen der Tomate gefolgt vom Träufeln von Olivenöl'
      ],
      exp: 'Erst reift der große Teigklumpen (Puntata), später ruhen die abgestochenen Einzelballen (Panetti) in der Gärbox (Appretto) bis zum Backen.'
    },
    {
      id: 62,
      cat: 'handwerk',
      diff: 'mid',
      q: 'Wofür steht die Kürzel-Organisation „AVPN“ in Neapel?',
      a: [
        'Associazione Verace Pizza Napoletana (Hüterin der strengen Originalregeln)',
        'Accademia Vitivinicola della Pasta e Noci',
        'Agenzia per Forni Elettrici Napoletani',
        'Alleanza dei Produttori di Vini Nobili'
      ],
      exp: 'Die AVPN wurde 1984 in Neapel gegründet, um Rezeptur, Zutaten, Ofenwärme und Handarbeit der „Verace Pizza Napoletana“ weltweit zu schützen.'
    },
    {
      id: 63,
      cat: 'handwerk',
      diff: 'mid',
      q: 'Warum dreht der Pizzaiolo die Pizza nach ~30 Sekunden mit einer kleinen runden Metallschaufel („Palino“) einmal im Ofen?',
      a: [
        'Da die Hitzequelle an einer Seite (hinten/links) am stärksten strahlt, sorgt Drehen für gleichmäßige Bräunung',
        'Damit die Luftblasen auf der Unterseite entweichen',
        'Weil der Mozzarella sonst auf eine Seite rutscht',
        'Damit sich das Salz aus dem Stein gleichmäßiger verteilt'
      ],
      exp: 'Die Seite zur offenen Flamme bzw. zum Brenner bräunt schneller – der erfahrene Pizzaiolo dreht den Teig blitzschnell per Palino um 180°.'
    },
    {
      id: 64,
      cat: 'handwerk',
      diff: 'mid',
      q: 'Weshalb streichen Spitzenbäcker eine feine Spirale natives Olivenöl („a filo“, meist als „6“) über die Pizza?',
      a: [
        'Für Fruchtigkeit, besseren Wärmeübergang auf den Käse und samtigen Glanz ohne Fettlachen',
        'Um verbrannte Stellen auf dem Boden zu kaschieren',
        'Damit das Mehl am Pizzarand hart wie Keks wird',
        'Weil Olivenöl den Teig im Nachhinein aufgehen lässt'
      ],
      exp: 'Die berühmte traditionelle „6“-Bewegung (oder Spirale) verteilt genau den richtigen Schuss Extra-Vergine-Öl für Aroma und Schutz vor Austrocknung.'
    },
    {
      id: 65,
      cat: 'handwerk',
      diff: 'mid',
      q: 'Welchen Durchmesser schreibt die traditionelle Verace-Pizza-Napoletana-Norm etwa vor (mit ~1–2 cm Cornicione)?',
      a: [
        'Rund 28 bis 35 cm bei ca. 220–280 g Teigballengewicht',
        'Genau 18 cm wie ein Kuchenteller',
        'Mindestens 45 cm Blechmaß',
        'Exakt 20 × 40 cm als Rechteck (Pala Romana)'
      ],
      exp: 'Mit typischen 250–280 g schweren Teigballen (Panetti) entstehen luftige Einzelpizzen von rund 28–33 cm Durchmesser.'
    },
    {
      id: 66,
      cat: 'handwerk',
      diff: 'mid',
      q: 'Was passiert chemisch bei der extremen Hitze an den dunklen Leoparden-Punkten des Pizzarandes?',
      a: [
        'Maillard-Reaktion (zwischen Aminosäuren und Zuckern) plus beginnende Karamellisierung',
        'Reine Alkohol-Verdampfung von Hefe ohne Bräunung',
        'Oxidation von Tomatensäure am Teigrand',
        'Schmelzen der Weizenkleie unter 100 °C'
      ],
      exp: 'Bei langer 72h-Fermentation entstehen reichlich freie Zucker & Aminosäuren – bei 485 °C springt die Maillard-Bräunung an den hauchdünnen Gasbläschen sofort an.'
    },
    {
      id: 67,
      cat: 'handwerk',
      diff: 'mid',
      q: 'Warum wird frischer Basilikum auf klassischer Napoletana oft unter oder mit dem Öl bzw. erst direkt beim Servieren platziert?',
      a: [
        'Trockene 485-°C-Strahlung würde freiliegende Blätter sofort verkohlen lassen',
        'Roher Basilikum schmeckt erst ab 500 °C süßlich',
        'Weil Basilikum den Mozzarella grün verfärbt',
        'Damit sich das Pesto automatisch von selbst bildet'
      ],
      exp: 'Ein Hauch Olivenöl schützt das Blatt vor dem Ofen, oder frische Blätter wandern direkt aus der Hand des Pizzaiolo auf die dampfende Pizza.'
    },
    {
      id: 68,
      cat: 'handwerk',
      diff: 'mid',
      q: 'Was zeichnet eine „Pizza Bianca“ (weiße Pizza) aus?',
      a: [
        'Sie verzichtet komplett auf Tomatensoße auf dem Boden (wie etwa die „Oh Tartufo“ oder „Stallone“)',
        'Sie wird ausschließlich aus gebleichtem Reismehl gebacken',
        'Sie bleibt roh und wird nur kalt serviert',
        'Auf ihr liegen ausschließlich fünf Sorten weißer Fisch'
      ],
      exp: 'Bei der Pizza Bianca bleibt der Teig ohne Tomaten-Unterlage – ideal für feine Aromen wie Trüffelcreme, Pesto, Burrata oder Kartoffel.'
    },
    {
      id: 69,
      cat: 'handwerk',
      diff: 'mid',
      q: 'Welche Temperatur sollten die „Panetti“ (Teigballen) kurz vor dem Öffnen idealerweise haben, nachdem sie aus der 72h-Kaltgare kommen?',
      a: [
        'Raumtemperatur (ca. 18–22 °C) nach rechtzeitigem Akklimatisieren',
        'Eiskalte 2 °C direkt aus dem Kühlschrank',
        'Leicht gefrorene −4 °C für krosseren Boden',
        'Handwarme 42 °C aus dem Wasserbad'
      ],
      exp: 'Eiskalter Teig zieht sich wie Gummi immer wieder zusammen („Snap-back“); bei Raumtemperatur lässt er sich mühelos zu einer hauchdünnen Mitte öffnen.'
    },
    {
      id: 70,
      cat: 'handwerk',
      diff: 'mid',
      q: 'Was ist der typische Unterschied zwischen klassischer Pizza Napoletana und knuspriger römischer Tonda („Scrocchiarella“)?',
      a: [
        'Napoletana: hoher weicher Rand & weiche Mitte (60s bei ~485 °C); Römer: hauchdünn, oft mit Öl & Holzrolle keks-knusprig (~350 °C)',
        'Römer nutzen Hefe, Neapolitaner gar kein Triebmittel',
        'Napoletana wird immer eckig am Meter verkauft, Römer nur rund',
        'Römische Pizza kennt grundsätzlich keinen Mozzarella'
      ],
      exp: '„Scrocchiarella“ leitet sich vom Knack-Geräusch beim Abbeißen ab – während Neapel Weichheit („morbidezza“) und wolkenartigen Cornicione feiert.'
    },
    {
      id: 71,
      cat: 'handwerk',
      diff: 'pro',
      q: 'Warum braucht man bei 72 Stunden kalter Teigführung nur extrem wenig Frischhefe (oft unter 0,2 % bezogen aufs Mehl)?',
      a: [
        'Weil sich die Hefezellen über drei Tage langsam vermehren; mehr Hefe würde den Teig vorzeitig überfermentieren lassen',
        'Weil Mehl bei 4 °C von allein Kohlensäure produziert',
        'Weil Tipo-00-Mehl schon mit Backpulver vorgemischt ist',
        'Weil Salz bei 72 Stunden als alleiniges Treibmittel arbeitet'
      ],
      exp: 'Zu viel Hefe würde das Glutengerüst in 72h übersäuern und zum Kollabieren bringen – winzige Promille-Mengen genügen für langsame, saubere Gärung.'
    },
    {
      id: 72,
      cat: 'handwerk',
      diff: 'pro',
      q: 'Welche Rolle spielt das Protein „Glutenin“ neben „Gliadin“ beim Kneten des Pizzateigs?',
      a: [
        'Glutenin gibt dem Teig elastische Rückstellkraft, Gliadin sorgt für Dehnbarkeit',
        'Beide geben ausschließlich dem Belag rote Farbe',
        'Glutenin ersetzt beim Backen die Maillard-Zucker',
        'Beide lösen das Salz erst oberhalb von 60 °C auf'
      ],
      exp: 'Erst das richtige Gleichgewicht aus Gliadin (Viskosität/Dehnung) und Glutenin (Elastizität) lässt den Teig hauchdünn werden, ohne zu reißen.'
    },
    {
      id: 73,
      cat: 'handwerk',
      diff: 'pro',
      q: 'Was passiert beim „Autolyse“-Schritt, wenn Mehl und Wasser zunächst 30–60 Minuten ohne Salz und Hefe ruhen?',
      a: [
        'Mehlproteine saugen sich spannungsfrei mit Wasser voll; erste Kleberbrücken bilden sich ganz ohne mechanischen Stress',
        'Die Hefe verdoppelt sich vorab explosionsartig',
        'Die Teigtemperatur sinkt chemisch um zehn Grad',
        'Alle Enzyme im Mehl werden komplett deaktiviert'
      ],
      exp: 'Autolyse verkürzt die nötige Knetzeit deutlich und macht hoch-hydrierte Teige geschmeidiger und dehnbarer.'
    },
    {
      id: 74,
      cat: 'handwerk',
      diff: 'pro',
      q: 'Wieso gilt „Pizza a libretto“ oder „Pizza Canotto“ (extrem voluminöser, schlauchbootartiger Rand) als moderner Neapel-Trend neben der klassischen „Ruota di carro“?',
      a: [
        '„Canotto“ betont mit hoher Hydration & langer Reife einen extra dicken Schlauchboot-Rand, während die traditionelle „Ruota di carro“ riesig und flacher über den Teller ragt',
        '„Canotto“ wird aus Buchweizenmehl gebacken',
        '„Ruota di carro“ bezeichnet ausschließlich zusammengeklappte Calzone',
        'Beides sind reine Dessert-Pizzen mit Nutella-Rand'
      ],
      exp: 'In Neapel diskutiert man leidenschaftlich zwischen „Contemporanea/Canotto“ (riesige Waben im Rand) und der historischen „Ruota di carro“ (Wagenrad-Größe).'
    },
    {
      id: 75,
      cat: 'handwerk',
      diff: 'pro',
      q: 'Wodurch vermeidet man beim Einschießen einer gut belegten 65-%-Hydration-Pizza das berüchtigte Kleben auf der Schaufel („Accidente“)?',
      a: [
        'Trockener Arbeitstisch, Semola zum Öffnen, zügiges Belegen unter 45s und kurzer Gleit-Check mit der Hand',
        'Indem man Wasser auf die Aluschaufel gießt',
        'Indem man zuerst Käse und zuletzt die Soße auf den Stein kippt',
        'Indem man den Teig erst nach 10 Minuten Wartezeit auf der Schaufel schiebt'
      ],
      exp: 'Feuchtigkeit aus Tomate & Mozzarella weicht ruhenden Teig auf der Schaufel rasch durch – deshalb sitzen Handgriffe in der offenen Küche schnell und trocken.'
    },
    {
      id: 76,
      cat: 'handwerk',
      diff: 'pro',
      q: 'Was besagt beim neapolitanischen Teig das berühmte „Laminieren / Fenstertest (Windowpane Test)“?',
      a: [
        'Ein Stück Teig lässt sich hauchdünn durchscheinend ziehen, ohne zu reißen – Zeichen für perfekt ausgeknetetes Gluten',
        'Man schaut durch das Ofenfenster, bis der Boden durchsichtig wird',
        'Der Käse muss sich über die ganze Scheibe ziehen lassen',
        'Man prüft die Helligkeit der San-Marzano-Soße im Glas'
      ],
      exp: 'Beim Windowpane-Test verrät das feine, lichtdurchlässige Teighäutchen ohne Löcher, dass das Glutengerüst bereit für 72h Reife ist.'
    },
    {
      id: 77,
      cat: 'handwerk',
      diff: 'pro',
      q: 'Warum wird Pizzateig im Kneter idealerweise kalt (mit kühlem Wasser) geknetet, sodass die Teigendtemperatur nicht über ~23–25 °C klettert?',
      a: [
        'Reibungswärme sonst die Hefe frühzeitig antreibt und das Glutennetz überhitzt/schmiert',
        'Weil Wasser unter 15 °C doppelt so viel Sauerstoff speichert',
        'Weil Weizenstärke erst ab 26 °C gefriert',
        'Damit sich später größere Tomatenstücke bilden'
      ],
      exp: 'Gerade in großen Spiralknetern erwärmt Reibung den Teig rapide – Pizzaioli berechnen sogar Eiswasser anhand von Raum- und Mehltemperatur.'
    },
    {
      id: 78,
      cat: 'handwerk',
      diff: 'pro',
      q: 'Wie nennt man beim Käsereifungs-Typ von Mozzarella und Provolone das typische Heißwasser-Knetverfahren?',
      a: [
        'Pasta-Filata-Verfahren („gezogener Teig“)',
        'Cagliata-Secca-Verfahren',
        'Fermentazione Lattica Fredda',
        'Salatura a Secco'
      ],
      exp: 'Beim „Pasta Filata“ wird der gesäuerte Käsebruch in ~80 °C heißem Wasser überbrüht und zu faserigen Strängen gezogen – daher stammt auch „mozzare“ (abkneifen)!'
    },
    {
      id: 79,
      cat: 'handwerk',
      diff: 'pro',
      q: 'Warum darf bei einer echten STG/AVPN-Pizza Napoletana niemals ein elektrischer Heißluftofen als authentischer Ersatz durchgehen?',
      a: [
        'Konvektion/Umluft trocknet bei ~250–300 °C den Teig minutenlang aus, statt durch hohe Boden- & Strahlungshitze (~485 °C) in 60–90s schlagartig aufzublasen („Oven Spring“)',
        'Weil Strom im Ofen dem Mozzarella die Laktose entzieht',
        'Weil ein Pizzastein in keinem Elektrobackofen heiß werden kann',
        'Weil Umluft-Gebläse den Oregano vom Blech wehen'
      ],
      exp: 'Das Geheimnis von 60–90 Sekunden liegt in Wärmestrahlung und Kontakthitze (Ofenstein): Wasserdampf expandiert explosionsartig (Oven Spring), bevor die Krume austrocknet.'
    },
    {
      id: 80,
      cat: 'handwerk',
      diff: 'pro',
      q: 'Woran erkennt ein Kenner sofort, ob ein Teig nach 72 Stunden „Untergare“ vs. idealer Reife gebacken wurde?',
      a: [
        'Untergare: zäher, blasser Rand mit wenigen riesigen Brandblasen und schwerem Mundgefühl; ideal: feine gleichmäßige Leopardenpunkte und wolkige Porung innen',
        'Untergare schmeckt extrem salzig, ideale Reife schmeckt nach Zimt',
        'Untergare färbt die Tomatensoße violett',
        'Ideale Reife erzeugt stets eine komplett schwarze Unterseite'
      ],
      exp: 'Bei zu wenig Gare fehlt im Inneren das gleichmäßige CO₂-Wabenmuster; bei sauber gereiftem 72h-Teig entsteht jene samtige Luftigkeit im Cornicione.'
    },

    // =========================================================================
    // KATEGORIE 3: NEAPEL, ZUTATEN & GENUSSKULTUR (40 Fragen)
    // =========================================================================
    {
      id: 81,
      cat: 'italien',
      diff: 'easy',
      q: 'Welcher berühmte Vulkan wacht majestätisch am Golf von Neapel über der Heimatstadt der Pizza?',
      a: [
        'Der Vesuv',
        'Der Ätna',
        'Der Stromboli',
        'Der Mont Blanc'
      ],
      exp: 'Die fruchtbaren Vulkanböden am Fuße des Vesuv schenken San-Marzano-Tomaten ihren unverwechselbaren Mineralreichtum.'
    },
    {
      id: 82,
      cat: 'italien',
      diff: 'easy',
      q: 'Aus welchem Käse-Verwandten besteht eine Kugel echte „Burrata“?',
      a: [
        'Außen eine feste Mozzarella-Hülle, innen cremige Rahm-Fäden („Stracciatella“)',
        'Außen eine Parmesankruste, innen würziger Blauschimmelkäse',
        'Außen Frischkäse aus Ziegenmilch, innen geräucherter Provolone',
        'Reiner Büffelricotta in Öl eingelegt'
      ],
      exp: 'Der Name „Burrata“ kommt von „burro“ (Butter): Schneidet man die weiße Kugel auf, ergießt sich samtige Stracciatella-Sahne auf den Teller.'
    },
    {
      id: 83,
      cat: 'italien',
      diff: 'easy',
      q: 'Was ist das italienische Dessert „Tiramisu“ übersetzt ins Deutsche?',
      a: [
        '„Zieh mich hoch!“ (Muntermacher aus Kaffee, Mascarpone & Löffelbiskuits)',
        '„Kühle Schokolade“',
        '„Schicht um Schicht im Glas“',
        '„Großmutters Sonntagskuchen“'
      ],
      exp: 'Espresso und eine Prise Kakao auf samtigem Mascarpone sollten früher ganz wörtlich neuen Schwung schenken: „Tirami sù!“'
    },
    {
      id: 84,
      cat: 'italien',
      diff: 'easy',
      q: 'Wie heißt das charakteristische rote scharfe Chili-Gewürz auf der kalabrischen Streichwurst „’Nduja“?',
      a: [
        'Peperoncino (kalabrische Chilischoten)',
        'Grüner Pfeffer aus Kampot',
        'Szechuan-Pfeffer',
        'Wasabi-Pulver'
      ],
      exp: '’Nduja aus dem kalabrischen Ort Spilinga ist berühmt für ihre feurige, streichzarte Konsistenz mit sonnengetrocknetem Kalabrien-Chili.'
    },
    {
      id: 85,
      cat: 'italien',
      diff: 'easy',
      q: 'Was genau sind die kleinen grünen „Kapern“, die unter anderem eine würzige Pizza Marinara schmücken?',
      a: [
        'Die noch geschlossenen Blütenknospen des Kapernstrauchs',
        'Unreife kleine grüne Oliven',
        'Die eingelegten Samen der Zucchini-Blüte',
        'Kleine wilde Küstenbeeren aus Südfrankreich'
      ],
      exp: 'Kapern werden von Hand gepflückt, bevor sich die Blüte öffnet, und meist in Meersalz oder Lake eingelegt.'
    },
    {
      id: 86,
      cat: 'italien',
      diff: 'easy',
      q: 'Aus welcher norditalienischen Region stammt echter Prosciutto di Parma (Parmaschinken)?',
      a: [
        'Aus der Emilia-Romagna rund um die Stadt Parma',
        'Aus Apulien ganz im Süden am Absatz des Stiefels',
        'Aus Sizilien an der Küste bei Palermo',
        'Aus dem Aostatal an der französischen Grenze'
      ],
      exp: 'Die Region Emilia-Romagna („Food Valley“ Italiens) ist Heimat gleich zweier Weltstars der Speisekarte: Parmaschinken und Parmigiano Reggiano!'
    },
    {
      id: 87,
      cat: 'italien',
      diff: 'easy',
      q: 'Warum bestellen Italiener nach einem Essen wie einer Pizza oder im Mittagsmenü fast immer einen kurzen Espresso statt eines großen Milchkaffees?',
      a: [
        'Milchschaum gilt in Italien als zu sättigend nach warmen Mahlzeiten – Espresso fördert den Abschluss',
        'Weil Espresso nach 12 Uhr gesetzlich steuerfrei ist',
        'Weil Cappuccino-Maschinen mittags abgeschaltet werden',
        'Weil in Italien nachmittags keine frische Milch verkauft wird'
      ],
      exp: '„Cappuccino nur bis zum Vormittag“ – nach Pasta oder Pizza rundet ein kurzer, aromatischer „Caffè“ (Espresso) das Essen ab.'
    },
    {
      id: 88,
      cat: 'italien',
      diff: 'easy',
      q: 'Aus welcher Fleischsorte entsteht das zarte, tiefrote „Bresaola“ (z. B. Black Angus Bresaola auf der Napoli72H-Karte)?',
      a: [
        'Aus magerem, luftgetrocknetem Rindfleisch',
        'Aus besonders fettem Schweinenacken',
        'Aus geräucherter Entenbrust',
        'Aus Lammkeule in Rotweinmarinade'
      ],
      exp: 'Bresaola kommt traditionell aus dem Valtellina-Tal in der Lombardei: mageres Rindfleisch wird trocken eingesalzen, gewürzt und wochenlang luftgetrocknet.'
    },
    {
      id: 89,
      cat: 'italien',
      diff: 'easy',
      q: 'Wozu gehört „Prosciutto“ in der italienischen Küche, während „Salame“ die Wurst bezeichnet?',
      a: [
        'Schinken (aus der Schweinekeule am Stück, roh luftgetrocknet oder gekocht)',
        'Alle geräucherten Fischspezialitäten',
        'Hartkäse über 24 Monate Reife',
        'Geröstetes Fladenbrot vom Blech'
      ],
      exp: '„Prosciutto crudo“ ist luftgetrockneter Rohschinken (z. B. Parma), „Prosciutto cotto“ ist saftiger Kochschinken.'
    },
    {
      id: 90,
      cat: 'italien',
      diff: 'easy',
      q: 'Was verbirgt sich hinter der neapolitanischen Geste des „Caffè sospeso“ („aufgeschobener Kaffee“)?',
      a: [
        'Man zahlt zwei Espressi, trinkt einen – und der zweite wartet kostenlos auf jemanden, der ihn braucht',
        'Man lässt den Kaffee kalt werden, bevor man ihn auf Eis gießt',
        'Man bestellt Espresso im Stehen am Bahnhof ohne Untertasse',
        'Man trinkt Espresso mit einem Spritzer Olivenöl statt Zucker'
      ],
      exp: 'Diese warmherzige Kaffeehaustradition entstand in Neapels historischen Bars – ein kleines Zeichen von Solidarität am Tresen.'
    },
    {
      id: 91,
      cat: 'italien',
      diff: 'easy',
      q: 'Woher stammt ursprünglich die kräftige Paprikawurst „Chorizo Ibérico“, die auf der Pizza Don Tito liegt?',
      a: [
        'Aus Spanien (mit geräuchertem Pimentón-Paprika)',
        'Aus Sardinien (mit wildem Bergfenchel)',
        'Aus Südtirol (über Buchenholz geräuchert)',
        'Aus dem Piemont (mit Barolo-Rotwein)'
      ],
      exp: 'Chorizo Ibérico vom spanischen Iberico-Schwein bezieht ihre tiefrote Farbe und leichte Rauchnote aus edlem Pimentón de la Vera.'
    },
    {
      id: 92,
      cat: 'italien',
      diff: 'easy',
      q: 'Was bedeutet „Olio Extra Vergine di Oliva“ bei hochwertigem Olivenöl?',
      a: [
        'Natives Olivenöl extra – erste Güteklasse, rein mechanisch kalt gepresst mit sehr geringer Säure',
        'Raffiniertes Pomace-Öl für tiefe Fritteusen',
        'Mit Knoblauchessenz gemischtes Rapsöl',
        'Olivenöl, das vor der Flaschenabfüllung aufgekocht wurde'
      ],
      exp: 'Nur Öle mit höchstens 0,8 % freier Fettsäure (Ölsäure) und makellosem Geschmack tragen die Bezeichnung „Extra Vergine“.'
    },
    {
      id: 93,
      cat: 'italien',
      diff: 'easy',
      q: 'Wie heißt das würzige grüne Blattgemüse bzw. Salat-Kraut mit leicht nussig-scharfer Senfnote auf der Pizza Parma 72?',
      a: [
        'Rucola (Rauke)',
        'Brunnenkresse',
        'Römischer Mangold',
        'Kerbel'
      ],
      exp: 'Frischer Rucola wandert erst nach dem Backen auf die heiße Pizza, damit er knackig bleibt und mit Parmaschinken sowie Parmesan harmoniert.'
    },
    {
      id: 94,
      cat: 'italien',
      diff: 'easy',
      q: 'Welche zwei italienischen Worte stehen beim Gericht „Bruschetta“ wörtlich im Ursprung?',
      a: [
        '„Bruscare“ – über Kohlen rösten',
        '„Brusco“ – kalt schneiden',
        '„Briciola“ – krümeln mit Käse',
        '„Burro“ – in Butter schwenken'
      ],
      exp: 'Geröstetes Brot wird traditionell direkt mit einer aufgeschnittenen Knoblauchzehe abgerieben und mit frischen Tomaten, Basilikum und Olivenöl getoppt.'
    },
    {
      id: 95,
      cat: 'italien',
      diff: 'easy',
      q: 'Was genau ist die schnurkerzengerade Straße „Spaccanapoli“ mitten durch die Altstadt Neapels?',
      a: [
        'Eine schmale historische Hauptachse, die Neapels Altstadt buchstäblich in zwei Hälften „spaltet“',
        'Ein Tunnel unter dem Hafen bis nach Capri',
        'Die älteste Pizzafabrik Europas von 1962',
        'Eine Bergbahn hinauf bis in den Vesuv-Krater'
      ],
      exp: 'Entlang der „Spaccanapoli“ (inklusive Via dei Tribunali) schlägt seit Jahrhunderten das lebendige Straßenessen-Herz Neapels.'
    },
    {
      id: 96,
      cat: 'italien',
      diff: 'mid',
      q: 'Worin liegt der Hauptunterschied zwischen Parmigiano Reggiano (DOP) und Grana Padano (DOP)?',
      a: [
        'Parmigiano reift länger mind. 12 Monate ohne Konservierungsmittel aus Heu-/Grasfütterung in strenger Region; Grana Padano darf Lysozym nutzen und deckt ein größeres Gebiet ab',
        'Parmigiano besteht aus Ziegenmilch, Grana Padano aus Schafsmilch',
        'Grana Padano ist weich wie Mozzarella',
        'Parmigiano wird in Neapel hergestellt, Grana Padano in Rom'
      ],
      exp: 'Echter Parmigiano Reggiano kommt nur aus fünf Provinzen (u.a. Parma, Reggio Emilia, Modena) und enthält ausschließlich Rohmilch, Lab und Salz.'
    },
    {
      id: 97,
      cat: 'italien',
      diff: 'mid',
      q: 'Wie heißt die toskanische Spezialität hinter der „Fenchel-Salami“ auf der Pizza Salami Fino in Italien?',
      a: [
        'Finocchiona (IGP)',
        'Soppressata di Calabria',
        'Mortadella di Bologna',
        'Cotechino di Modena'
      ],
      exp: '„Finocchio“ heißt Fenchel – der Legende nach ersetzten toskanische Metzger einst teuren schwarzen Pfeffer geschickt durch aromatische Fenchelsamen.'
    },
    {
      id: 98,
      cat: 'italien',
      diff: 'mid',
      q: 'Warum wird guter Südtiroler Speck im Gegensatz zu rein geräuchertem Schwarzwaldschinken milder wahrgenommen?',
      a: [
        'Er verbindet kurzes Kalträuchern unter 20 °C mit monatelanger frischer Berglufttrocknung',
        'Er wird vor dem Schneiden eine Stunde in Weißwein gekocht',
        'Er stammt nicht vom Schwein, sondern vom Rind',
        'Er reift komplett unter Wasser in Salzsole'
      ],
      exp: 'Das berühmte Südtiroler Rezept lautet „wenig Salz, wenig Rauch und viel gute Luft“ – perfekt für Pizza Al Pacino oder Antipasti!'
    },
    {
      id: 99,
      cat: 'italien',
      diff: 'mid',
      q: 'Aus welcher bekannten griechischen Region stammen die auf vielen Karten beliebten violett-schwarzen „Kalamata-Oliven“?',
      a: [
        'Von der Halbinsel Peloponnes im Süden Griechenlands',
        'Von den Klippen nahe Salerno',
        'Aus der Toskana bei Siena',
        'Von den Balearen'
      ],
      exp: 'Mandelförmig, fleischig und fruchtig-salzig – echte Kalamata-Oliven wachsen rund um das gleichnamige Städtchen auf dem Peloponnes.'
    },
    {
      id: 100,
      cat: 'italien',
      diff: 'mid',
      q: 'Woher gewinnt man Pinienkerne, die auf Salaten oder einer Pizza Stallone mit Basilikumpesto landen?',
      a: [
        'Als geschälte essbare Samen aus den verholzten Zapfen der Mittelmeer-Pinie',
        'Aus getrockneten Blüten der Zypressen',
        'Aus gerösteten Kernen von Grünen Oliven',
        'Aus kleinen unterirdischen Knollen in Ligurien'
      ],
      exp: 'Die aufwendige Ernte und das Knacken der Steinschalen erklärt, warum echte Mittelmeer-Pinienkerne so kostbar und aromatisch sind.'
    },
    {
      id: 101,
      cat: 'italien',
      diff: 'mid',
      q: 'Welche Stadt am Golf von Neapel trägt den Spitznamen einer berühmten Pizza – war aber historisch eher Vorort für Seefahrer & Pizza fritta?',
      a: [
        'Neapel selbst – mit „Marinara“ („Seefahrer-Pizza“, ohne schnell verderblichen Käse)',
        'Genua – für die Erfindung der Pizza Diavolo',
        'Bologna – Heimat der Hawaii-Pizza',
        'Mailand – für die Erfindung der Focaccia marinara'
      ],
      exp: 'Die älteste dokumentierte Pizza-Variante „Marinara“ (um 1734) hieß so, weil Seeleute sie mit Tomaten, Knoblauch und Oregano auch nach der Rückkehr im Hafen preiswert genießen konnten.'
    },
    {
      id: 102,
      cat: 'italien',
      diff: 'mid',
      q: 'Warum schmeckt italienische Pizza Marinara oft unerwartet intensiv, obwohl sie ohne Käse belegt wird?',
      a: [
        'Getrockneter Berg-Oregano, süß-fruchtige San-Marzano-Tomaten, Knoblauchöl & würzige Kapern ergeben reines Umami',
        'Die Tomaten werden zuvor mit Käsepulver bestäubt',
        'Der Teig wird eine Woche in Käsemolke geknetet',
        'In jedem Bissen stecken unsichtbare Sardellenpaste-Schichten'
      ],
      exp: 'Ohne schmelzenden Mozzarella konzentriert der 485-°C-Ofen die Süße und Säure der Tomaten zusammen mit Knoblauchöl und Oregano besonders klar.'
    },
    {
      id: 103,
      cat: 'italien',
      diff: 'mid',
      q: 'Welche Milchsorte wird traditionell für den weißen Mozzarella „di Bufala Campana DOP“ verwendet?',
      a: [
        'Milch italienischer Mittelmeer-Wasserbüffel',
        'Alpen-Braunvieh-Milch aus Norditalien',
        'Schafsmilch wie bei echtem Pecorino Romano',
        'Mischmilch aus Kuh und Ziege zu gleichen Teilen'
      ],
      exp: 'Wasserbüffelmilch besitzt fast doppelt so viel Fett und mehr Proteine als Kuhmilch – daher der unverwechselbare porzellanweiße Glanz.'
    },
    {
      id: 104,
      cat: 'italien',
      diff: 'mid',
      q: 'Mit welchem ungefähren Pumpendruck und in welcher Extraktionszeit entsteht in Italien ein perfekter klassischer Espresso?',
      a: [
        'Rund 9 bar Druck in ca. 25 bis 30 Sekunden für etwa 25–30 ml',
        'Exakt 1 bar Filterdruck in 4 Minuten',
        'Rund 25 bar für einen halben Liter Kanne',
        'Ohne Druck durch kaltes Tropfen über 6 Stunden'
      ],
      exp: '9 bar heißes Wasser bei ~90–94 °C lösen in gut 25 Sekunden rund ein Viertel der Kaffeestoffe und erzeugen die feinporige haselnussbraune Crema.'
    },
    {
      id: 105,
      cat: 'italien',
      diff: 'mid',
      q: 'Was ist der kleine aber feine Unterschied zwischen einer „Antipasto“-Vorspeise und einem „Primo Piatto“ in Italien?',
      a: [
        'Antipasto = kalter/warmer Auftakt vorweg (Bruschetta, Burrata); Primo Piatto = erstes warmes Hauptgericht (oft Pasta oder Risotto)',
        'Antipasto steht für Kaffee und Likör, Primo für Salat',
        'Antipasto wird zwingend mit der Hand im Stehen gegessen',
        'Primo Piatto bedeutet immer Dessert mit Tiramisu'
      ],
      exp: 'Eine klassische italienische Menüfolge geht über Antipasti (Vor-Speise), Primi (Pasta/Suppe), Secondi (Fisch/Fleisch) hin zum Dolce.'
    },
    {
      id: 106,
      cat: 'italien',
      diff: 'mid',
      q: 'Aus welchem klassischen ligurischen Rezept besteht echtes „Pesto alla Genovese“?',
      a: [
        'Basilikum, Pinienkerne, Knoblauch, Parmigiano/Pecorino, grobes Meersalz und Natives Olivenöl',
        'Petersilie, Sonnenblumenkerne, Sahne und Essig',
        'Rucola, Mandeln, Tomatenmark und Butter',
        'Spinat, Cashews, Kurkuma und Zitronensaft'
      ],
      exp: 'Der Name stammt von „pestare“ (zerstoßen im Mörser) – genau so entsteht jenes samtige Basilikumpesto für Bufala, Stallone oder Burrata.'
    },
    {
      id: 107,
      cat: 'italien',
      diff: 'mid',
      q: 'Woher stammen „Schwarze Trüffel“ wie in der italienischen Küche traditionell häufig, neben dem piemontesischen weißen Alba-Trüffel?',
      a: [
        'Vor allem aus Umbrien (Norcia) sowie den Abruzzen, Marken und dem Périgord',
        'Ausschließlich von künstlichen Plastikbeeten in Mailand',
        'Von den Gipfeln der Sizilianischen Zitronenbäume',
        'Aus tiefen Küstengrotten vor Capri'
      ],
      exp: 'Umbrien rund um Norcia ist berühmt für seinen schwarzen Wintertrüffel (Tuber melanosporum) und Sommertrüffel (Scorzone).'
    },
    {
      id: 108,
      cat: 'italien',
      diff: 'mid',
      q: 'Was bedeutet „Focaccia“ sprachlich ursprünglich aus dem Lateinischen („focus“)?',
      a: [
        '„In der Herdasche / auf dem Feuerstein gebackenes Fladenbrot“',
        '„Mit Käse gefüllte Falttasche“',
        '„Doppelt gekochtes Hefeküchlein“',
        '„Gewürzte Tomatenstange“'
      ],
      exp: 'Von „focus“ (Herdstelle/Feuer) entwickelte sich schon in der Antike die Bezeichnung für das beliebte ligurisch-italienische Fladenbrot.'
    },
    {
      id: 109,
      cat: 'italien',
      diff: 'mid',
      q: 'Welchen Wein- oder Likör-Anteil enthalten klassische italienische Tiramisu-Rezepte oft ganz dezent zum Tränken der Löffelbiskuits neben dem Espresso?',
      a: [
        'Einen Schuss Marsala-Dessertwein oder Amaretto',
        'Einen Schuss trockenen Apfelcidre',
        'Reinen Grappa pur über die ganze Sahneschicht',
        'Rotwein-Essig aus Modena'
      ],
      exp: 'Je nach Haushalt wird kalter, starker Espresso entweder alkoholfrei genutzt oder mit einem Hauch Marsala bzw. Amaretto abgerundet.'
    },
    {
      id: 110,
      cat: 'italien',
      diff: 'mid',
      q: 'Was charakterisiert echten „Provolone“ aus Süd- und Norditalien?',
      a: [
        'Ein halbfester bis würziger Pasta-Filata-Käse (oft birnen- oder zylinderförmig, Typ „Dolce“ mild oder „Piccante“ gereift)',
        'Ein bröckeliger Frischkäse in Salzlake aus Zypern',
        'Ein flüssiger Schimmelkäse aus dem Piemont',
        'Ein süßer Dessert-Quark mit Vanille'
      ],
      exp: 'Provolone wird genau wie Mozzarella gebrüht und gezogen, anschließend aber geformt, gebunden und gereift – perfekt schmelzend im 485-°C-Ofen.'
    },
    {
      id: 111,
      cat: 'italien',
      diff: 'pro',
      q: 'Wie nennt man in Neapel die schon im 18. Jahrhundert historisch dokumentierten Vorläufer-Pizzen mit Schweineschmalz, Käse und Basilikum – noch GANZ ohne Tomaten?',
      a: [
        'Pizza Mastunicola (oder „Mastro Nicola“)',
        'Pizza Carbonara Verace',
        'Pizza Quattrostagioni 1700',
        'Pizza Marinara Bianca'
      ],
      exp: 'Bevor die aus Amerika stammende Tomate in Neapel populär wurde, genoss man um 1660–1730 bereits die würzige „Mastunicola“ mit Schmalz („strutto“), Käse, Pfeffer und Basilikum.'
    },
    {
      id: 112,
      cat: 'italien',
      diff: 'pro',
      q: 'Weshalb heißt eines der berühmten Wahrzeichen direkt am Wasser in Neapel „Castel dell’Ovo“ („Eierburg“)?',
      a: [
        'Laut einer mittelalterlichen Sage soll der Dichter Vergil dort ein magisches Ei im Fundament versteckt haben, an dem das Wohl der Stadt hängt',
        'Weil der Grundriss die Form eines Spiegeleis hat',
        'Weil dort einst der erste Eierschneider erfunden wurde',
        'Weil neapolitanische Bäcker dort im 15. Jahrhundert Eier verkauften'
      ],
      exp: 'Bricht das angebliche Zauber-Ei unter dem Castel dell’Ovo, so heißt es in der Legende, stürzt Neapel ein – zum Glück steht die Burg schon fast ein Jahrtausend fest.'
    },
    {
      id: 113,
      cat: 'italien',
      diff: 'pro',
      q: 'Welche zwei Reifungsstufen unterscheidet der Begriff „Stravecchio“ bei Parmigiano Reggiano typischerweise?',
      a: [
        'Eine besonders lange Reifung von rund 30 bis 36+ Monaten mit intensiven Eiweiß-Kristallen (Tyrosin)',
        'Einen jungen Frischkäse unter 30 Tagen',
        'Einen geräucherten Parmigiano in Eichenfässern',
        'Käse, der zweimal in Rotwein gewendet wurde'
      ],
      exp: 'Je älter der Parmigiano wird (24, 30 oder 36 Monate = Stravecchio), desto mürber wird sein Gefüge und desto knuspriger knacken die kleinen weißen Tyrosinkristalle.'
    },
    {
      id: 114,
      cat: 'italien',
      diff: 'pro',
      q: 'Warum genießt man in Neapel eine traditionelle „Pizza Fritta“ (im heißen Öl ausgebackene Teigtasche) traditionell nachmittags oder als Streetfood?',
      a: [
        'Nach dem 2. Weltkrieg fehlten oft Holz und teure Holzöfen oder Mozzarella – die mit Ricotta & Cicoli gefüllte frittierte Pizza war erschwinglicher Genuss für das Volk',
        'Weil sie als kühle Sommerspeise mit Eis serviert wurde',
        'Weil der Vesuv im Sommer alle Backöfen abschaltete',
        'Weil in Neapel montags Backverbot für Weizen herrschte'
      ],
      exp: 'Unsterblich verewigt wurde die neapolitanische Pizza Fritta 1954 auch durch Sophia Loren in „L’Oro di Napoli“.'
    },
    {
      id: 115,
      cat: 'italien',
      diff: 'pro',
      q: 'Was unterscheidet echte italienische „Amalfi“-Zitronen (Sfusato Amalfitano) von Supermarkt-Zitronen aus Intensivkulturen?',
      a: [
        'Große dicke, aber kaum bittere weiße Schale (Albedo), extrem duftendes ätherisches Schalenöl und unbehandelte Zesten',
        'Sie sind stets komplett rot statt gelb',
        'Sie wachsen vollständig kernlos unter Wasser in Buchten',
        'Sie schmecken deutlich schärfer als Chilis'
      ],
      exp: 'Entlang der steilen Terrassen von Amalfi und Sorrent schenken Sonne und Meeresbrise Zitronen, deren dicke Schale sogar roh in dünnen Scheiben gegessen wird.'
    },
    {
      id: 116,
      cat: 'italien',
      diff: 'pro',
      q: 'Warum galt die Stadt Neapel jahrhundertelang als „Stadt des alten Europas“, deren arme Viertel die „Lazzaroni“ prägten – und welche Verbindung hat das zur Pizza?',
      a: [
        'Die hart arbeitenden Tagelöhner („Lazzaroni“) brauchten eine schnelle, kalorienreiche und extrem günstige warme Mahlzeit auf die Hand – so entstand die moderne Straßenpizza',
        '„Lazzaroni“ waren reiche Adlige, die Pizza nur mit goldenen Gabeln aßen',
        'So hießen die ersten Ofenbauer aus Berlin in Neapel',
        'Sie verboten in Neapel jegliches Brotbacken bis 1900'
      ],
      exp: 'Die „Pizza“ war lange Zeit echte Arbeiter- und Volksküche in Neapels Gassen, oft auf Abzahlung („a otto“, Zahlung erst acht Tage später).'
    },
    {
      id: 117,
      cat: 'italien',
      diff: 'pro',
      q: 'Was steckt hinter der Bezeichnung „D.O.P.“ auf italienischen Tomaten, Käsen und Schinken (z. B. San Marzano DOP)?',
      a: [
        'Denominazione d’Origine Protetta – strengstes EU-Qualitätssiegel (Erzeugung, Verarbeitung UND Veredelung in derselben Region)',
        'Diretta Origine della Pizzeria – Markenzeichen für Restaurants',
        'Doppelt Ofen-Prämiert nach italienischem Backrecht',
        'Datenbank Offener Produzenten für Lieferservices'
      ],
      exp: 'Im Unterschied zu I.G.P. (wo ein Produktionsschritt in der Region genügt) verlangt D.O.P., dass alle Stufen im genau festgelegten Ursprungsgebiet stattfinden.'
    },
    {
      id: 118,
      cat: 'italien',
      diff: 'pro',
      q: 'Welche traditionelle Stadtstraße in Neapel bildet das Herzstück gleich mehrerer berühmter Jahrhunderte alter Pizzerien wie Da Michele oder Sorbillo?',
      a: [
        'Via dei Tribunali (samt Seitengassen wie Via Cesare Sersale)',
        'Via Monte Napoleone',
        'Via Condotti',
        'Strada Nuova'
      ],
      exp: 'Zwischen Dom und Spaccanapoli reiht sich an der Via dei Tribunali eine historische Backstube an die nächste – Weltkulturerbe zum Schmecken!'
    },
    {
      id: 119,
      cat: 'italien',
      diff: 'pro',
      q: 'Welche Besonderheit macht die „Piennolo del Vesuvio“-Tomate für italienische Pizzakünstler so begehrt?',
      a: [
        'Die dickschaligen kleinen Spitz-Tomaten werden zu Trauben („Piennolo“) gebunden aufgehängt und bleiben ohne Kühlung monatelang süß-konzentriert',
        'Sie wachsen ausschließlich bei unter 0 °C im Winter',
        'Sie sind leuchtend blau und kernlos',
        'Man schält sie bereits vier Wochen vor der Ernte am Strauch'
      ],
      exp: 'Durch die dicke Schale und wenig Wasser trocknen die aufgehängten Vesuv-Tomaten langsam leicht an und konzentrieren ihre Süße und Würze bis tief in den Winter.'
    },
    {
      id: 120,
      cat: 'italien',
      diff: 'pro',
      q: 'Wie wird beim Gericht „Parmaschinken“ garantiert, dass die Keulen traditionell aromatisch und ohne künstliche Konservierungsstoffe reifen?',
      a: [
        'Nur Schweinekeule und Meersalz – geräuchert wird gar nicht; trockene Hügelwinde aus dem Apennin übernehmen mindestens 12+ Monate die Reifung',
        'Sie wird vorab drei Wochen in Essig eingelegt',
        'Sie wird ausschließlich über Olivenholz heißgeräuchert',
        'Man presst jeden Schinken mit Pfeffer und Chili ein'
      ],
      exp: 'In Langhirano und den Hügeln südlich von Parma weht der duftende „Marino“-Wind über die Reifehallen – allein Meersalz, Geduld und Luft machen den Geschmack.'
    },

    // =========================================================================
    // KATEGORIE 4: AACHEN & FRANKENBERGER VIERTEL (40 Fragen)
    // =========================================================================
    {
      id: 121,
      cat: 'aachen',
      diff: 'easy',
      q: 'Welches mittelalterliche Bauwerk gibt dem gesamten „Frankenberger Viertel“ unweit der Oppenhoffallee seinen Namen?',
      a: [
        'Die Burg Frankenberg im Frankenberger Park',
        'Das Frankfurter Tor am Ring',
        'Die Frankenburg am Lousberg',
        'Das Frankenkloster an der Franzstraße'
      ],
      exp: 'Unweit der Oppenhoffallee thronen die Türme der mittelalterlichen Wasserburg Frankenberg mitten im grünen Park.'
    },
    {
      id: 122,
      cat: 'aachen',
      diff: 'easy',
      q: 'Wie heißt der markante grüne Boulevard im Frankenberger Viertel, auf dem auch Napoli72H zu Hause ist?',
      a: [
        'Oppenhoffallee',
        'Kaiserallee von Burtscheid',
        'Monheimsallee',
        'Seffenter Weg'
      ],
      exp: 'Die von Bäumen gesäumte Oppenhoffallee mit Mittelpromenade prägt das Herz des Frankenberger Viertels – und beherbergt die erste Napoli72H-Filiale.'
    },
    {
      id: 123,
      cat: 'aachen',
      diff: 'easy',
      q: 'Welches Aachener Wahrzeichen wurde 1978 als allererstes deutsches Kulturdenkmal in die UNESCO-Welterbeliste aufgenommen?',
      a: [
        'Der Aachener Dom',
        'Das Marschiertor',
        'Der Elisenbrunnen',
        'Das Ludwig Forum'
      ],
      exp: 'Mit seinem achteckigen Zentralbau (Pfalzkapelle Karls des Großen) setzte der Aachener Dom 1978 ein weltweites Ausrufezeichen.'
    },
    {
      id: 124,
      cat: 'aachen',
      diff: 'easy',
      q: 'Welches mächtige historische Stadttor liegt unweit des südlichen Endes der Franzstraße?',
      a: [
        'Das Marschiertor',
        'Das Ponttor',
        'Das Kölntor',
        'Das Jakobstor'
      ],
      exp: 'Wer von Napoli72H an der Franzstraße ein paar Schritte südwärts spaziert, steht vor einem der größten erhaltenen Stadttore Westeuropas: dem Marschiertor.'
    },
    {
      id: 125,
      cat: 'aachen',
      diff: 'easy',
      q: 'Wie heißt der traditionelle Öcher Gruß, bei dem man die rechte Hand zum kleinen Finger reckt?',
      a: [
        'Der „Klenkes“',
        'Der „Pletsch“',
        'Der „Büchel“',
        'Der „Printen-Wink“'
      ],
      exp: 'Früher sortierten Aachener Fabrikarbeiter fehlerhafte Nadeln mit dem abgespreizten kleinen Finger aus – heute erkennt man echte Öcher weltweit am „Klenkes“.'
    },
    {
      id: 126,
      cat: 'aachen',
      diff: 'easy',
      q: 'Welche zwei Nachbarländer grenzen direkt bei Aachen am Vaalserberg („Dreiländereck“) an Deutschland?',
      a: [
        'Belgien und die Niederlande',
        'Luxemburg und Frankreich',
        'Belgien und Dänemark',
        'Niederlande und Schweiz'
      ],
      exp: 'Keine Viertelstunde vom Stadtzentrum treffen Deutschland, Belgien und die Niederlande aufeinander – idealer Dreiländer-Spirit.'
    },
    {
      id: 127,
      cat: 'aachen',
      diff: 'easy',
      q: 'Welcher Aachener Gebäckklassiker darf weit über Weihnachten hinaus in keiner Stadtgeschichte fehlen?',
      a: [
        'Aachener Printen',
        'Dresdner Stollen',
        'Nürnberger Elisenlebkuchen',
        'Lübecker Marzipanbrot'
      ],
      exp: 'Mit Zuckerrübensirup statt nur Honig sowie geheimen Gewürzmischungen wie Zimt, Nelken und Koriander haben die Aachener Printen geschützte Herkunft.'
    },
    {
      id: 128,
      cat: 'aachen',
      diff: 'easy',
      q: 'Was sprudelt aus den Wasserhähnen des historischen Elisenbrunnens mitten in der Aachener Innenstadt?',
      a: [
        'Warmes, deutlich nach Schwefel riechendes Thermal-Mineralwasser (über 50 °C)',
        'Eiskaltes Gletscherwasser aus der Rur-Talsperre',
        'Leicht gesüßtes Limonadenwasser für Gäste',
        'Künstlich blau gefärbtes Zierwasser'
      ],
      exp: 'Schon die Römer badeten hier in den bis über 70 °C heißen Thermalquellen („Aquae Granni“), die Aachen zu „Bad Aachen“ machen.'
    },
    {
      id: 129,
      cat: 'aachen',
      diff: 'easy',
      q: 'Welches weltberühmte Reitsport-Turnier lockt jeden Sommer Zehntausende Pferdefans in die Aachener Soers?',
      a: [
        'Der CHIO Aachen („Weltfest des Pferdesports“)',
        'Der Große Preis von Spa-Soers',
        'Das Derby von Karlshorst',
        'Die Equitana der Kaiserstadt'
      ],
      exp: 'Der Concours Hippique International Officiel (CHIO) verwandelt die Aachener Soers alljährlich in das Wimbledon des Pferdesports.'
    },
    {
      id: 130,
      cat: 'aachen',
      diff: 'easy',
      q: 'Wie heißt das Traditionsstadion des Fußballvereins Alemannia Aachen?',
      a: [
        'Tivoli',
        'San Siro am Lousberg',
        'Bökelberg',
        'Carl-Diem-Arena'
      ],
      exp: 'Schwarz-gelb schlägt das Herz auf dem Tivoli an der Krefelder Straße – benannt nach dem italienischen Vorbild Tivoli bei Rom!'
    },
    {
      id: 131,
      cat: 'aachen',
      diff: 'easy',
      q: 'Welcher geschichtsträchtige Herrscher machte Aachen Ende des 8. Jahrhunderts zur bevorzugten Pfalz und Hauptresidenz seines Reiches?',
      a: [
        'Karl der Große',
        'Friedrich Barbarossa',
        'Otto von Bismarck',
        'Napoleon III.'
      ],
      exp: 'Karl der Große schätzte Aachens heiße Quellen und zentrale Lage – heute zeugen davon das Aachener Rathaus und der Dom mit dem Karlsschrein.'
    },
    {
      id: 132,
      cat: 'aachen',
      diff: 'easy',
      q: 'Welche große technische Exzellenz-Universität prägt die Studentenszene – auch im Frankenberger Viertel und entlang der Franzstraße?',
      a: [
        'Die RWTH Aachen',
        'Die TU Rhein-Maas',
        'Die Universität der Kaiserstadt Köln-Aachen',
        'Die Westdeutsche Bergakademie'
      ],
      exp: 'Zehntausende Studierende und Forschende der RWTH (plus FH Aachen) füllen Restaurants, Cafés und Abende zwischen Pontviertel und Frankenberg.'
    },
    {
      id: 133,
      cat: 'aachen',
      diff: 'easy',
      q: 'Wie heißt der bekannte, baumbestandene Hügel im Norden der Stadt, um den sich sogar eine Aachener Teufelssage rankt?',
      a: [
        'Der Lousberg',
        'Der Schneeberg',
        'Der Vaalser Kogel',
        'Der Venusberg'
      ],
      exp: 'Der Sage nach ließ der Teufel verärgert einen riesigen Sandsack fallen, als die Aachener ihn beim Dombau überlisteten – so entstand der Lousberg!'
    },
    {
      id: 134,
      cat: 'aachen',
      diff: 'easy',
      q: 'Wie heißt der alte Stadtteil südlich der Frankenberger Parkanlagen, der selbst für noch heißere Thermalquellen bekannt ist?',
      a: [
        'Burtscheid',
        'Kornelimünster',
        'Eilendorf',
        'Richterich'
      ],
      exp: 'Burtscheid schließt direkt südlich ans Frankenberger Viertel an – dort sprudelt mit über 74 °C die heißeste Thermalquelle Mitteleuropas!'
    },
    {
      id: 135,
      cat: 'aachen',
      diff: 'easy',
      q: 'Welche historische Grenze bildete einst die elegante Gründerzeit-Bebauung des Frankenberger Viertels direkt hinter dem ehemaligen Bahnhof?',
      a: [
        'Das Viertel zwischen historischer Innenstadt/Bahnhof Rothe Erde und dem heutigen Viktoriaallee-Bereich',
        'Ein reiner Hafenkanal für Lastkähne bis zum Rhein',
        'Ein militärisches Sperrgebiet außerhalb der Landesgrenze bis 1989',
        'Eine reine Industriemülldeponie bis 1995'
      ],
      exp: 'Rund um 1870–1910 entstanden im Frankenberger Viertel die prachtvollen Altbau-Alleen wie Oppenhoffallee, Bismarckstraße und Schlossstraße.'
    },
    {
      id: 136,
      cat: 'aachen',
      diff: 'mid',
      q: 'Welchen historischen Namen trug die heutige „Oppenhoffallee“ vor ihrer Umbenennung zu Ehren des Aachener Oberbürgermeisters Franz Oppenhoff?',
      a: [
        'Kaiserallee',
        'Goethe-Promenade',
        'Kurfürstenring',
        'Brüsseler Boulevard'
      ],
      exp: 'Nach dem Zweiten Weltkrieg wurde die prächtige Kaiserallee nach Franz Oppenhoff benannt, dem ersten Nachkriegs-OB, der 1945 von einem NS-Kommando ermordet wurde.'
    },
    {
      id: 137,
      cat: 'aachen',
      diff: 'mid',
      q: 'Welches berühmte architektonische Werk schuf der preußische Star-Architekt Karl Friedrich Schinkel 1827 im Herzen Aachens?',
      a: [
        'Die Wandelhalle und Portikus-Fassade des Elisenbrunnens',
        'Das moderne Ludwig Forum für Internationale Kunst',
        'Den Aachener Hauptbahnhof',
        'Die Haupttribüne auf dem alten Tivoli'
      ],
      exp: 'Johann Peter Cremer und Karl Friedrich Schinkel entwarfen den klassizistischen Elisenbrunnen, benannt nach Kronprinzessin Elisabeth von Bayern.'
    },
    {
      id: 138,
      cat: 'aachen',
      diff: 'mid',
      q: 'Wieso verlor Aachen eine ganze Zeit lang seine direkte Grenze an einer vierten Nachbarschaft „Neutral-Moresnet“?',
      a: [
        'Zwischen 1816 und 1920 bildete Moresnet (heute Kelmis in Belgien) wegen eines Zinkerzbergwerks ein eigenes neutrales Minigebiet westlich von Aachen',
        'Weil der Fluss Wurm sich 1830 ein neues Bett grub',
        'Weil dort ein freier Pizza-Freihandelshafen lag',
        'Das ist ein rein erfundenes Märchen aus dem Karneval'
      ],
      exp: 'Über 100 Jahre lang lag vor den Toren Aachens (bei Kelmis) das kuriose „Vierländereck“ mit dem winzigen Neutral-Moresnet – sogar fast mit Esperanto als Staatssprache!'
    },
    {
      id: 139,
      cat: 'aachen',
      diff: 'mid',
      q: 'Welches fabelhafte Ungetüm soll nachts am „Büchel“ in der Aachener Altstadt auf betrunkene Bürger gewartet haben?',
      a: [
        'Das Bahkauv (ein Kalb-ähnliches Wasserwesen mit spitzen Zähnen)',
        'Der Elisen-Drache vom Kaiserplatz',
        'Der Ponttor-Golem aus Printenteig',
        'Der Soerser Schimmelreiter'
      ],
      exp: 'In den Thermalwasserkanälen unterm Büchel hauste der Sage nach das schwere „Bahkauv“, das heimkehrenden Männern auf den Rücken sprang!'
    },
    {
      id: 140,
      cat: 'aachen',
      diff: 'mid',
      q: 'Wo befindet sich in Aachen der berühmte, bewegliche „Puppenbrunnen“ von Bonifatius Stirnberg?',
      a: [
        'In der Krämerstraße nahe Dom und Markt',
        'Im Innenhof der Burg Frankenberg',
        'Vor der Hauptbibliothek am Templergraben',
        'Am Bahnhof Aachen-Schanz'
      ],
      exp: 'Tuchhändler, Marktfrau, Professor, Reiter und Modepuppe haben bewegliche Glieder – Kinder wie Erwachsene stellen die Bronzefiguren beim Vorbeigehen gern neu ein.'
    },
    {
      id: 141,
      cat: 'aachen',
      diff: 'mid',
      q: 'Welche internationale Auszeichnung wird alljährlich an Christi Himmelfahrt im Krönungssaal des Aachener Rathauses verliehen?',
      a: [
        'Der Internationale Karlspreis zu Aachen (für Verdienste um die europäische Einigung)',
        'Der Europäische Baukultur-Orden der RWTH',
        'Der Goldene Printen-Stern von NRW',
        'Der Große Preis der Euregio Maas-Rhein'
      ],
      exp: 'Seit 1950 ehrt der Internationale Karlspreis Persönlichkeiten und Institutionen für Freiheit, Demokratie und Zusammenhalt in Europa.'
    },
    {
      id: 142,
      cat: 'aachen',
      diff: 'mid',
      q: 'Wieso trägt die zentrale Aachener Straße „Franzstraße“ ihren Namen?',
      a: [
        'Nach dem nahegelegenen ehemaligen Franziskanerkloster und einer wichtigen mittelalterlichen Ausfallstraße Richtung Süden',
        'Nach Kaiser Franz Joseph II. bei seinem Besuch 1905',
        'Nach der französischen Besatzung um 1919',
        'Nach Franz Beckenbauers Abschiedsspiel am Tivoli'
      ],
      exp: 'Die Franzstraße verbindet seit Jahrhunderten die Altstadt mit dem Marschiertor – heute verbindet sie historische Gassen mit moderner Gastronomie wie Napoli72H.'
    },
    {
      id: 143,
      cat: 'aachen',
      diff: 'mid',
      q: 'Welche zwei mittelalterlichen Stadttore Aachens sind bis heute aus dem alten doppelten Mauerring stolz erhalten geblieben?',
      a: [
        'Das Marschiertor und das Ponttor',
        'Das Jakobstor und das Adalbertstor',
        'Das Burtscheider Tor und das Sandkaul-Tor',
        'Das Junkerstor und das Vaalser Tor'
      ],
      exp: 'Von einst elf Stadttoren überstanden nur das nördliche Ponttor und das mächtige südliche Marschiertor die Jahrhunderte.'
    },
    {
      id: 144,
      cat: 'aachen',
      diff: 'mid',
      q: 'In welches alte Produktionsgebäude mit Industriecharme zog das bekannte „Ludwig Forum für Internationale Kunst“ an der Jülicher Straße?',
      a: [
        'In eine ehemalige Schirmfabrik (Gebr. Brauer)',
        'In eine historische Printenbäckerei',
        'In ein altes Straßenbahndepot am Elisenbrunnen',
        'In eine ehemalige Textilfärberei in der Franzstraße'
      ],
      exp: 'Architekt Fritz Eller verwandelte die markante Bauhaus-Schirmfabrik Brauer Anfang der 1990er Jahre in das weltweit geschätzte Pop-Art- und Gegenwartsmuseum.'
    },
    {
      id: 145,
      cat: 'aachen',
      diff: 'mid',
      q: 'Was verbirgt sich hinter dem Öcher Ausruf „Oche alaaf!“ im Vergleich zum Kölner Ruf?',
      a: [
        'Er stammt vom alten Ausspruch „Oche all af“ / „All av“ („Aachen über alles!“ – Treueschwur auf die Stadt)',
        'Er war ursprünglich der Ruf nach einem halben Glas Altbier',
        'Er bedeutet übersetzt „Ab aufs Land“',
        'Er leitet sich vom französischen „à la fin“ ab'
      ],
      exp: 'Schon vor Jahrhunderten war der Trinkspruch „All af“ im Rheinland verbreitet und lebt bis heute in der Aachener Lebensfreude weiter.'
    },
    {
      id: 146,
      cat: 'aachen',
      diff: 'mid',
      q: 'Wie nannten schon die Römer ihren warmen Bade- und Kurort, aus dem später der Name „Aachen“ (franz. Aix-la-Chapelle) hervorging?',
      a: [
        'Aquae Granni (nach dem keltisch-römischen Heilgott Grannus)',
        'Aquisgranum Caroli (nach Karl dem Großen)',
        'Thermae Rhenanae',
        'Civitas Frankenburgia'
      ],
      exp: 'Von lateinisch „Aquae“ (= Wasser) entwickelte sich im Althochdeutschen „Ahha“, schließlich unser heutiges Aachen (und französisch Aix-la-Chapelle).'
    },
    {
      id: 147,
      cat: 'aachen',
      diff: 'mid',
      q: 'Welches eindrucksvolle Museum direkt am Rathaus/Markt zeigt in der früheren „Grashaus“-Ecke und im Couvenhaus bürgerliches Leben & Geschichte?',
      a: [
        'Das Centre Charlemagne (Neues Stadtmuseum am Katschhof) sowie das Couven Museum am Hühnermarkt',
        'Das Deutsche Eisenbahnmuseum am Frankenberger Park',
        'Das Schokoladenmuseum von Eilendorf',
        'Das Kaiserliche Luftfahrtmuseum im Pontviertel'
      ],
      exp: 'Direkt zwischen Dom und Rathaus liegt am Katschhof das Centre Charlemagne; um die Ecke am Hühnermarkt lädt das Couven Museum in bürgerliche Rokoko-Wohnkultur ein.'
    },
    {
      id: 148,
      cat: 'aachen',
      diff: 'mid',
      q: 'Welches große Waldgebiet erstreckt sich im Süden und Südwesten der Stadt entlang der belgischen Grenze bis hoch zum Dreiländereck?',
      a: [
        'Der Aachener Wald („Öcher Bösch“)',
        'Die Lüneburger Eifelheide',
        'Der Reichswald am Tivoli',
        'Der Königsforst Burtscheid'
      ],
      exp: 'Der Öcher Bösch lädt mit weitläufigen Buchenwäldern, Mountainbike-Trails, dem Dreiländerpunkt und der Waldschänke zur Auszeit ein.'
    },
    {
      id: 149,
      cat: 'aachen',
      diff: 'mid',
      q: 'Was erinnert am Ende der Oppenhoffallee im Frankenberger Park ganz besonders an die einstige Adelszeit der Burg Frankenberg?',
      a: [
        'Die historische Vorburg, die Gräfte (Wassergraben) und Sage vom verliebten König Karl mit Fastradas Ring',
        'Ein noch aktives Freilicht-Ritterturnier jeden Dienstag',
        'Die größte mittelalterliche Hafenmauer von NRW',
        'Ein erhaltenes römisches Amphitheater hinter der Wiese'
      ],
      exp: 'Der Legende nach konnte Karl der Große vor Trauer um seine Gemahlin Fastrada am Frankenberg kaum von ihrem Zauberring lassen – bis Erzbischof Turpin ihn in den Burgteich warf!'
    },
    {
      id: 150,
      cat: 'aachen',
      diff: 'mid',
      q: 'Was ist der Aachener „Katschhof“ zwischen Dom und Rathaus heute für ein zentraler Platz?',
      a: [
        'Der historische Innenhof der ehemaligen Kaiserpfalz, wo heute u.a. Konzerte und der Weihnachtsmarkt stattfinden',
        'Ein alter Tennisplatz aus den 1920ern („Katsch“)',
        'Der frühere Verladebahnhof für Aachener Printen',
        'Eine Grünanlage tief unten im Frankenberger Viertel'
      ],
      exp: 'Der Begriff geht wohl auf den alten „Kaks“ (Pranger) zurück – heute verbindet der Katschhof als lebendiges Herzstück Dom und Rathaus.'
    },
    {
      id: 151,
      cat: 'aachen',
      diff: 'pro',
      q: 'Wieso entstand die schmucke Wasserburg Frankenberg ausgerechnet an der Grenze zwischen Aachen und Burtscheid?',
      a: [
        'Sie diente den Vögten/Herren von Frankenberg als befestigter Herrensitz auf einem kleinen Felsen inmitten der sumpfigen Quellbäche',
        'Sie schützte die Aachener Schokoladenflotte vor Schiffspiraten',
        'Karl der Große baute sie 788 als Backhaus für seine Reiterei',
        'Sie entstand erst 1902 als neugotische Kulisse für Theaterstücke'
      ],
      exp: 'Bereits 1282 erwähnt, erhob sich die Burg auf einer kleinen Erhebung im Quellgebiet von Gilles- und Beverbach – heute das beliebte Freizeit-Herz von Frankenberg.'
    },
    {
      id: 152,
      cat: 'aachen',
      diff: 'pro',
      q: 'Welche historische Besonderheit verbindet das Frankenberger Viertel rund um die Bismarck- und Oppenhoffallee um 1880 mit der Industrialisierung?',
      a: [
        'Tuchfabrikanten und Nadelindustrielle errichteten dort repräsentative Gründerzeit-Stadtvillen und Etagenhäuser im Park-Viertel außerhalb des engen Stadtkern-Rings',
        'Das Viertel war bis 1950 ein abgeschottetes Fischerdorf am Stausee',
        'Dort standen ausschließlich Hochöfen und Zechentürme',
        'Die Straße diente bis 1930 nur als Flugfeld für Zeppeline'
      ],
      exp: 'Viele der kunstvoll stuckverzierten Altbau-Fassaden im „Franki“, die dem Viertel heute sein Flair geben, stammen genau aus jener Gründerzeit-Wohlstandsphase.'
    },
    {
      id: 153,
      cat: 'aachen',
      diff: 'pro',
      q: 'Welche seltene architektonische Grundform besitzt der innerste Kern des Aachener Doms („Pfalzkapelle“), den Karl der Große um 796 bauen ließ?',
      a: [
        'Ein sechzehneckiger Außenmantel um ein imposantes inneres Achteck („Oktogon“) nach byzantinischem Vorbild von San Vitale in Ravenna',
        'Eine dreischiffige Holzkirche nach skandinavischem Vorbild',
        'Ein kreisrunder Glasbau ohne Stützpfeiler',
        'Eine quadratische Halle mit fünf Zwiebeltürmen'
      ],
      exp: 'Über Ravenna gelangte direkt italienisch-byzantinische Baukunst nach Aachen – das imposante Oktogon bildet bis heute eine Brücke zwischen Mittelmeer und Rhein-Maas!'
    },
    {
      id: 154,
      cat: 'aachen',
      diff: 'pro',
      q: 'Welche zwei „Aachener“ Begriffe tragen ganz verschiedene Bedeutungen im lokalen „Öcher Platt“: „Pötschke“ vs. „Printe“?',
      a: [
        '„Pötschke“ (Küsschen / Bussi) hat mit dem würzigen Printen-Gebäck nichts zu tun',
        '„Pötschke“ bezeichnet genau eine zerbrochene Hartprinte',
        '„Printe“ bedeutet im Öcher Platt ein kleines Kind',
        'Beides sind Öcher Wörter für einen runden Pizza-Teigballen'
      ],
      exp: 'Wer im Öcher Platt „e Pötschke“ kriegt, freut sich über ein Küsschen – und wer Printen möchte, bestellt beim Bäcker (urspr. von engl./ndl. „print“ für gedrucktes Bildgebäck).'
    },
    {
      id: 155,
      cat: 'aachen',
      diff: 'pro',
      q: 'Welcher kuriose Streit um die höchste Erhebung der Niederlande und des Stadtgebiets spielt sich am Vaalserberg ab?',
      a: [
        'Mit 322,4 m ist der Vaalserberg gleichzeitig der höchste Punkt der europäischen Niederlande – direkt an Aachens westlichem Waldrand',
        'Der Vaalserberg liegt exakt auf Meereshöhe bei 0 Metern',
        'Nur ein einziger Quadratmeter davon gehört geografisch zu Luxemburg',
        'Auf dem Gipfel stehen zwei verschiedene Zeitzonen-Uhren mit 1 Stunde Versatz'
      ],
      exp: 'Während die Holländer stolz auf ihren „höchsten Berg“ (322,4 m) klettern, geht Aachen in Richtung Nordeifel mit über 400 m sogar noch höher!'
    },
    {
      id: 156,
      cat: 'aachen',
      diff: 'pro',
      q: 'Welchen offiziellen lateinischen Ehrentitel führt Aachen („Urbs Aquensis“) in seiner bekannten mittelalterlichen Stadthymne?',
      a: [
        '„Urbs Aquensis, urbs regalis“ (Kaiserstadt / Königsstadt, Krönungsort vieler deutscher Könige)',
        '„Urbs Mercatoria Maxima“ (größte Hafenstadt am Rhein)',
        '„Urbs Vini et Olivarum“ (Weinhauptstadt Nordeuropas)',
        '„Urbs Silvarum Nigra“ (Schwarzwald-Residenz)'
      ],
      exp: 'Mehr als 30 deutsche Könige und Königinnen wurden zwischen 936 und 1531 im Aachener Dom gekrönt – und „Urbs Aquensis“ erklingt bis heute feierlich in der Stadt.'
    },
    {
      id: 157,
      cat: 'aachen',
      diff: 'pro',
      q: 'Was ist das Besondere an dem berühmten „Theater Aachen“, das nur wenige Gehminuten von Napoli72H Franzstraße entfernt liegt?',
      a: [
        'Es wurde bereits 1825 als klassizistisches Bürger- & Stadttheater eröffnet (Fassade nach Plänen von Cremer & Schinkel) und besitzt 8 prächtige Säulen',
        'Es war Europas erstes reines Open-Air-Autokino',
        'Dort durften bis 1980 ausschließlich italienische Opern aufgeführt werden',
        'Es steht vollständig auf hölzernen Pfählen im Frankenberger Burggraben'
      ],
      exp: 'Das traditionsreiche Theater am Theaterplatz liegt fast um die Ecke der Franzstraße – ideal für eine frisch gebackene Pizza vor oder nach der Vorstellung!'
    },
    {
      id: 158,
      cat: 'aachen',
      diff: 'pro',
      q: 'Wie heißt das Aachener Viertel-Original rund um das Frankenberger Viertel, wenn die Einheimischen den Namen liebevoll abkürzen?',
      a: [
        '„Franki“ (oder schlicht „et Frankeberjer“) – beliebt für Altbauten, Kneipen, Eisläden und entspannte Mittagspausen',
        '„Klein-Madrid“',
        '„Burtscheid-Nord-Ost-Sektor“',
        '„Der Kaiser-Campus“'
      ],
      exp: '„Im Franki“ kennt man sich beim Namen, genießt auf den Bänken rund um den Park sein Mittagessen oder trifft sich abends auf ein kaltes Getränk.'
    },
    {
      id: 159,
      cat: 'aachen',
      diff: 'pro',
      q: 'Warum spielten ausgerechnet die heißen Quellen Aachens im 17., 18. und 19. Jahrhundert eine Rolle als eleganter Treffpunkt für Gäste aus ganz Europa?',
      a: [
        'Als mondäner „Königs-Kurort“ zog Bad Aachen Adlige, Musiker (wie Händel) und Kaufleute aus Paris, Brüssel und London zum Baden und Promenieren an',
        'Man nutzte die heißen Quellen nur zur Dampflok-Betankung im Bergbau',
        'Es war Europas einziger Ort mit ganzjährig offenem Meerwasserstrand',
        'Alle Bäder wurden kostenlos nur für Schulklassen reserviert'
      ],
      exp: 'Unter Kurfürsten und Königen gehörte das Aachener Kurleben in derselben Liga wie Bath oder Spa – und bis heute liebt die Stadt gutes Essen und Gastlichkeit.'
    },
    {
      id: 160,
      cat: 'aachen',
      diff: 'pro',
      q: 'Welche zwei völlig unterschiedlichen „Aachener Spezialitäten“ liegen auf dem Weg zwischen Napoli72H Oppenhoffallee und Napoli72H Franzstraße etwa nur ~1,5 km auseinander?',
      a: [
        'Das grüne Gründerzeit-Flair im Frankenberger Viertel und das historische Zentrum rund um Marschiertor, Theaterplatz & Dom',
        'Der Seehafen am Rhein und die Nordseeküste',
        'Die Ski-Sprungschanze am Tivoli und das Wattenmeer',
        'Der Kölner Zoo und das Dortmunder U'
      ],
      exp: 'Vom entspannten „Franki“ spaziert man gemütlich durch den Neumarkt-Kiez und über das Theater direkt in die Innenstadt – mitten zwischen beiden Napoli72H-Öfen!'
    }
  ];

  ArcadeQuizEngine.registerBank('napoli72h', QUESTIONS);
})();
