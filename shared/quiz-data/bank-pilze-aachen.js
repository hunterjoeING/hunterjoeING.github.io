// Pilz-Sammler-Quiz: Region Aachen & Eifel (24 Arten)
(function () {
  const DATA = [
  {
    "id": 1,
    "cat": "speisepilze",
    "habitat": "📍 Aachener Wald (Öcher Bösch), Preuswald & Hürtgenwald · Buchen & Fichten",
    "season": "Juli–November",
    "img": "./img/pilz-01.jpg",
    "nameQ": "Welcher begehrte Röhrling mit dickbauchigem Stiel und feinem weißem Stielnetz wächst nach warmen Sommerregen unter Buchen und Fichten im Aachener Wald?",
    "nameOpts": [
      "Gemeiner Steinpilz (Boletus edulis)",
      "Gallenröhrling (Tylopilus felleus)",
      "Maronen-Röhrling (Imleria badia)",
      "Satans-Röhrling (Rubroboletus satanas)"
    ],
    "toxClass": "edible",
    "toxBadge": "🟢 Vorzüglicher Speisepilz (essbar)",
    "toxOpts": [
      "🟢 Vorzüglicher Speisepilz – mild-nussig, festfleischig (auch getrocknet ein Klassiker)",
      "🟠 Ungenießbar wegen extremer Galle-Bitterkeit – verdirbt jedes Gericht",
      "🔴 Stark Magen-Darm-giftig – verursacht heftiges Erbrechen",
      "☠️ Tödlich giftig durch hitzestabile Amatoxine (Leberschäden)"
    ],
    "details": {
      "title": "Gemeiner Steinpilz",
      "latin": "Boletus edulis",
      "features": "Hut hasel- bis dunkelbraun mit hellem Rand; Röhren jung weiß, später gelbgrünlich; Stiel mit feinem weißem Netz auf hellem Grund; Fleisch bleibt im Anschnitt weiß.",
      "lookalike": "Gallenröhrling (Tylopilus felleus): Hat ein grobes dunkles (!) Stielnetz, schmutzig-rosa werdende Röhren und schmeckt extrem bitter (ungefährlich, aber ungenießbar).",
      "trivia": "Wusstest du, dass Steinpilze mit Baumwurzeln ein unterirdisches Nährstoffnetzwerk bilden? Ohne lebende Partnerbäume wie Eichen oder Fichten lassen sie sich bis heute nicht künstlich züchten!"
    },
    "credit": {
      "artist": "Holger Krisp",
      "license": "CC BY 3.0",
      "commons": "File:(Gemeine Steinpilz) Boletus edulis.jpg"
    },
    "q": "Welcher begehrte Röhrling mit dickbauchigem Stiel und feinem weißem Stielnetz wächst nach warmen Sommerregen unter Buchen und Fichten im Aachener Wald?",
    "a": [
      "Gemeiner Steinpilz (Boletus edulis)",
      "Gallenröhrling (Tylopilus felleus)",
      "Maronen-Röhrling (Imleria badia)",
      "Satans-Röhrling (Rubroboletus satanas)"
    ],
    "explanation": "Wusstest du, dass Steinpilze mit Baumwurzeln ein unterirdisches Nährstoffnetzwerk bilden? Ohne lebende Partnerbäume wie Eichen oder Fichten lassen sie sich bis heute nicht künstlich züchten!",
    "exp": "Wusstest du, dass Steinpilze mit Baumwurzeln ein unterirdisches Nährstoffnetzwerk bilden? Ohne lebende Partnerbäume wie Eichen oder Fichten lassen sie sich bis heute nicht künstlich züchten!"
  },
  {
    "id": 2,
    "cat": "speisepilze",
    "habitat": "📍 Aachener Sand, Vichtbachtal & Hürtgenwald · Saure Nadel- & Mischwälder",
    "season": "August–November",
    "img": "./img/pilz-02.jpg",
    "nameQ": "Welcher beliebte Speisepilz der Eifeler Nadelwälder besitzt einen kastanienbraunen Hut, einen netzlosen Stiel und blaut bei Druck sofort an den gelben Röhren?",
    "nameOpts": [
      "Maronen-Röhrling (Imleria badia)",
      "Gemeiner Steinpilz (Boletus edulis)",
      "Kahler Krempling (Paxillus involutus)",
      "Schönfuß-Röhrling (Caloboletus calopus)"
    ],
    "toxClass": "edible",
    "toxBadge": "🟢 Sehr guter Speisepilz (gut durcherhitzen)",
    "toxOpts": [
      "🟢 Sehr guter, milder Speisepilz (die Blaufärbung der Röhren ist völlig unbedenklich)",
      "☠️ Tödlich giftig durch das Orellanus-Syndrom (Nierenversagen)",
      "🔴 Stark giftig – enthält Fliegenpilz-Neurotoxine (Ibotensäure)",
      "🟠 Ungenießbar hart und korkig wie ein Baumpilz"
    ],
    "details": {
      "title": "Maronen-Röhrling (Braunkappe)",
      "latin": "Imleria badia (Syn. Boletus badius)",
      "features": "Kastanienbrauner Hut (bei Nässe leicht schmierig); blassgelbe Röhren, die auf Druck sofort blaugrün anlaufen; Stiel bräunlich überfasert OHNE Netz.",
      "lookalike": "Gallenröhrling (blaut nicht, hat dunkles Stielnetz & rosa Röhren) sowie Rotfußröhrlinge (ebenfalls essbar, aber weichfleischiger).",
      "trivia": "Die auffällige Blaufärbung bei Berührung entsteht durch enzymatische Oxidation an der Luft. Sobald die Marone in der heißen Bratpfanne landet, verschwindet das Blau wieder vollständig!"
    },
    "credit": {
      "artist": "Jean-Pol GRANDMONT",
      "license": "CC BY 3.0",
      "commons": "File:Boletus badius JPG1.jpg"
    },
    "q": "Welcher beliebte Speisepilz der Eifeler Nadelwälder besitzt einen kastanienbraunen Hut, einen netzlosen Stiel und blaut bei Druck sofort an den gelben Röhren?",
    "a": [
      "Maronen-Röhrling (Imleria badia)",
      "Gemeiner Steinpilz (Boletus edulis)",
      "Kahler Krempling (Paxillus involutus)",
      "Schönfuß-Röhrling (Caloboletus calopus)"
    ],
    "explanation": "Die auffällige Blaufärbung bei Berührung entsteht durch enzymatische Oxidation an der Luft. Sobald die Marone in der heißen Bratpfanne landet, verschwindet das Blau wieder vollständig!",
    "exp": "Die auffällige Blaufärbung bei Berührung entsteht durch enzymatische Oxidation an der Luft. Sobald die Marone in der heißen Bratpfanne landet, verschwindet das Blau wieder vollständig!"
  },
  {
    "id": 3,
    "cat": "speisepilze",
    "habitat": "📍 Aachener Wald & Rureifel · Moosige, saure Buchen- & Fichtenwälder",
    "season": "Juni–Oktober",
    "img": "./img/pilz-03.jpg",
    "nameQ": "Welcher dottergelbe Speisepilz duftet aromatisch nach Aprikosen und besitzt an der Hutunterseite feste, gegabelte Leisten statt ablösbarer Lamellen?",
    "nameOpts": [
      "Echter Pfifferling (Cantharellus cibarius)",
      "Falscher Pfifferling (Hygrophoropsis aurantiaca)",
      "Ölbaumtrichterling (Omphalotus olearius)",
      "Spitzgebuckelter Raukopf (Cortinarius rubellus)"
    ],
    "toxClass": "edible",
    "toxBadge": "🟢 Vorzüglicher Speisepilz (essbar)",
    "toxOpts": [
      "🟢 Vorzüglicher Speisepilz – pfeffrig-würzig und nahezu nie madig",
      "☠️ Tödlich giftig – zerstört Leber und Nieren bereits in kleinster Menge",
      "🔴 Stark halluzinogen und nervengiftig",
      "🟠 Extrem bitter – ein Exemplar macht das Essen ungenießbar"
    ],
    "details": {
      "title": "Echter Pfifferling (Eierschwämmchen)",
      "latin": "Cantharellus cibarius",
      "features": "Dottergelb; Hutunterseite mit aderig verbundenen, gegabelten Leisten, die weit am Stiel herablaufen (nicht wie dünne Blätter vom Hutfleisch ablösbar); Fleisch innen weißlich, Geruch nach Aprikose.",
      "lookalike": "Falscher Pfifferling (Hygrophoropsis aurantiaca, ungenießbar/leicht Magen-Darm-giftig): Hat dünne, dicht stehende, tieforange echte Lamellen und weiches, schlaffes Fleisch ohne Aprikosengeruch.",
      "trivia": "Pfifferlinge besitzen an der Unterseite gar keine echten Lamellen, sondern feste Adern (Leisten). Dank ihrer natürlichen Schutzstoffe gegen Parasiten sind sie nahezu niemals madig!"
    },
    "credit": {
      "artist": "Wikimedia Commons",
      "license": "CC BY-SA 3.0",
      "commons": "File:Chanterelle Cantharellus cibarius.jpg"
    },
    "q": "Welcher dottergelbe Speisepilz duftet aromatisch nach Aprikosen und besitzt an der Hutunterseite feste, gegabelte Leisten statt ablösbarer Lamellen?",
    "a": [
      "Echter Pfifferling (Cantharellus cibarius)",
      "Falscher Pfifferling (Hygrophoropsis aurantiaca)",
      "Ölbaumtrichterling (Omphalotus olearius)",
      "Spitzgebuckelter Raukopf (Cortinarius rubellus)"
    ],
    "explanation": "Pfifferlinge besitzen an der Unterseite gar keine echten Lamellen, sondern feste Adern (Leisten). Dank ihrer natürlichen Schutzstoffe gegen Parasiten sind sie nahezu niemals madig!",
    "exp": "Pfifferlinge besitzen an der Unterseite gar keine echten Lamellen, sondern feste Adern (Leisten). Dank ihrer natürlichen Schutzstoffe gegen Parasiten sind sie nahezu niemals madig!"
  },
  {
    "id": 4,
    "cat": "speisepilze",
    "habitat": "📍 Waldränder um Kornelimünster, Raeren, Lousberg & Eifel-Wiesen",
    "season": "Juli–November",
    "img": "./img/pilz-04.jpg",
    "nameQ": "Welcher bis zu 30 cm hohe Großpilz an Waldrändern fällt durch einen geschuppten Schirm, einen frei verschiebbaren Doppelring und einen genatterten Stiel auf?",
    "nameOpts": [
      "Parasol (Macrolepiota procera)",
      "Pantherpilz (Amanita pantherina)",
      "Gift-Safranschirmling (Chlorophyllum brunneum)",
      "Grüner Knollenblätterpilz (Amanita phalloides)"
    ],
    "toxClass": "edible",
    "toxBadge": "🟢 Sehr guter Speisepilz (Hut gebraten)",
    "toxOpts": [
      "🟢 Sehr guter Speisepilz – der große Hut schmeckt paniert wie ein Schnitzel",
      "☠️ Tödlich giftig – enthält Amatoxine wie der Knollenblätterpilz",
      "🔴 Schwer giftig – löst das lebensbedrohliche Pantherina-Syndrom aus",
      "🟠 Völlig ungenießbar durch brennend scharfen Milchsaft"
    ],
    "details": {
      "title": "Parasol (Gemeiner Riesenschirmling)",
      "latin": "Macrolepiota procera",
      "features": "Jung trommelschlegelförmig, später riesiger Schirm mit dunklem Buckel; Stiel braun genattert (wie Schlangenhaut!); großer, am Stiel frei verschiebbarer Laufring; Stielbasis knollig OHNE Scheide; Fleisch rötet nicht.",
      "lookalike": "Gift-Riesenschirmling (Chlorophyllum brunneum, auf Kompost/Gärten: Stiel glatt/ungenattert, Fleisch rötet!) sowie tödliche Schirmlinge (Lepiota-Arten, die jedoch deutlich kleiner unter 10 cm Hutdurchmesser bleiben).",
      "trivia": "Mit bis zu 40 Zentimetern Spannweite ist der Parasol ein Riese des Waldes. Sein riesiger Schirm wird von Feinschmeckern gern paniert wie ein echtes Schnitzel gebraten!"
    },
    "credit": {
      "artist": "Chrumps",
      "license": "CC BY-SA 4.0",
      "commons": "File:Macrolepiota-procera.jpg"
    },
    "q": "Welcher bis zu 30 cm hohe Großpilz an Waldrändern fällt durch einen geschuppten Schirm, einen frei verschiebbaren Doppelring und einen genatterten Stiel auf?",
    "a": [
      "Parasol (Macrolepiota procera)",
      "Pantherpilz (Amanita pantherina)",
      "Gift-Safranschirmling (Chlorophyllum brunneum)",
      "Grüner Knollenblätterpilz (Amanita phalloides)"
    ],
    "explanation": "Mit bis zu 40 Zentimetern Spannweite ist der Parasol ein Riese des Waldes. Sein riesiger Schirm wird von Feinschmeckern gern paniert wie ein echtes Schnitzel gebraten!",
    "exp": "Mit bis zu 40 Zentimetern Spannweite ist der Parasol ein Riese des Waldes. Sein riesiger Schirm wird von Feinschmeckern gern paniert wie ein echtes Schnitzel gebraten!"
  },
  {
    "id": 5,
    "cat": "speisepilze",
    "habitat": "📍 Aachener Wald (Preuswald / Dreiländereck) & Hürtgenwald · Am Fuß alter Kiefern",
    "season": "August–November",
    "img": "./img/pilz-05.jpg",
    "nameQ": "Welcher blumenkohl- oder badeschwammartige Speisepilz wächst direkt am Stammfuß alter Kiefern und verströmt einen harzig-nussigen Waldduft?",
    "nameOpts": [
      "Krause Glucke (Sparassis crispa)",
      "Bauchweh-Koralle (Ramaria formosa)",
      "Schwefelporling (Laetiporus sulphureus)",
      "Eichen-Leberreischling (Fistulina hepatica)"
    ],
    "toxClass": "edible",
    "toxBadge": "🟢 Guter, würziger Speisepilz (essbar)",
    "toxOpts": [
      "🟢 Guter, nussig-würziger Speisepilz – fast unverwechselbar am Fuß von Kiefern",
      "☠️ Tödlich giftig – zerstört die Nieren innerhalb weniger Tage",
      "🔴 Stark giftig – führt zu schweren Kreislaufzusammenbrüchen",
      "🟠 Extrem scharf und brennend auf der Zunge"
    ],
    "details": {
      "title": "Krause Glucke (Fette Henne)",
      "latin": "Sparassis crispa",
      "features": "Bis 30 cm großer, kugelig-gehirnartiger Fruchtkörper aus hunderten bandförmig abgeflachten, krausen Ästchen; creme- bis ockergelb; wächst am Fuß von Kiefern.",
      "lookalike": "Breitblättrige Glucke (Sparassis brevipes, an Eichen/Tannen, gröbere Bänder, ebenfalls essbar). Giftige Korallenpilze (Ramaria) haben drehrunde, fingerartig aufstrebende Äste mit stumpfen Spitzen statt gewellter Bänder.",
      "trivia": "Dieser bizarre Parasit kann mehrere Kilo wiegen und wächst jahrelang an derselben Kiefer nach. In Butter geschmort gilt die Krause Glucke wegen ihres nussigen Aromas als Delikatesse!"
    },
    "credit": {
      "artist": "Dominicus Johannes Bergsma",
      "license": "CC0",
      "commons": "File:Grote sponszwam (Sparassis crispa). 09-11-2023. (d.j.b).jpg"
    },
    "q": "Welcher blumenkohl- oder badeschwammartige Speisepilz wächst direkt am Stammfuß alter Kiefern und verströmt einen harzig-nussigen Waldduft?",
    "a": [
      "Krause Glucke (Sparassis crispa)",
      "Bauchweh-Koralle (Ramaria formosa)",
      "Schwefelporling (Laetiporus sulphureus)",
      "Eichen-Leberreischling (Fistulina hepatica)"
    ],
    "explanation": "Dieser bizarre Parasit kann mehrere Kilo wiegen und wächst jahrelang an derselben Kiefer nach. In Butter geschmort gilt die Krause Glucke wegen ihres nussigen Aromas als Delikatesse!",
    "exp": "Dieser bizarre Parasit kann mehrere Kilo wiegen und wächst jahrelang an derselben Kiefer nach. In Butter geschmort gilt die Krause Glucke wegen ihres nussigen Aromas als Delikatesse!"
  },
  {
    "id": 6,
    "cat": "speisepilze",
    "habitat": "📍 Wiesen, Waldränder & Parkwege in Aachen (Lousberg, Soers, Seffent)",
    "season": "Mai–November",
    "img": "./img/pilz-06.jpg",
    "nameQ": "Welcher zylinderförmige, weiß geschuppte Wiesenpilz ist jung ein delikater Speisepilz, löst sich bei Reife aber von selbst in schwarze Flüssigkeit auf?",
    "nameOpts": [
      "Schopftintling (Coprinus comatus)",
      "Faltentintling (Coprinopsis atramentaria)",
      "Kegelhütiger Knollenblätterpilz (Amanita virosa)",
      "Fransiger Wulstling (Amanita strobiliformis)"
    ],
    "toxClass": "edible",
    "toxBadge": "🟢 Jung vorzüglicher Speisepilz (nur reinweiß!)",
    "toxOpts": [
      "🟢 Jung (solange Lamellen reinweiß sind) sehr guter Speisepilz – muss am Sammeltag frisch zubereitet werden",
      "☠️ Tödlich giftig – verursacht schweres Leberversagen",
      "🔴 Stark giftig – enthält Muskarin und führt zu Schweißausbrüchen",
      "🟠 Ungenießbar hart und holzig"
    ],
    "details": {
      "title": "Schopftintling (Spargelpilz)",
      "latin": "Coprinus comatus",
      "features": "Walzen- bis glockenförmiger weißer Hut mit abstehenden, bräunlichen Fransenschuppen; Lamellen jung reinweiß, dann rosa, schließlich schwarz zerfließend (Autolyse); Stiel hohl mit schmalem Ring, OHNE Scheide an der Basis.",
      "lookalike": "Faltentintling (Coprinopsis atramentaria): Grau-braun, fast glatter/gefalteter Hut ohne weiße Fransenschuppen – enthält Coprin und ist in Verbindung mit Alkohol (auch Tage später!) stark giftig (Antabus-Syndrom).",
      "trivia": "Der Schopftintling verdaut sich durch Autolyse binnen weniger Stunden selbst zu pechschwarzer Tinte, um seine Sporen freizusetzen. Früher nutzte man diese Flüssigkeit tatsächlich zum Schreiben!"
    },
    "credit": {
      "artist": "A. Uciechowska",
      "license": "CC BY-SA 3.0",
      "commons": "File:Coprinus comatus.jpg"
    },
    "q": "Welcher zylinderförmige, weiß geschuppte Wiesenpilz ist jung ein delikater Speisepilz, löst sich bei Reife aber von selbst in schwarze Flüssigkeit auf?",
    "a": [
      "Schopftintling (Coprinus comatus)",
      "Faltentintling (Coprinopsis atramentaria)",
      "Kegelhütiger Knollenblätterpilz (Amanita virosa)",
      "Fransiger Wulstling (Amanita strobiliformis)"
    ],
    "explanation": "Der Schopftintling verdaut sich durch Autolyse binnen weniger Stunden selbst zu pechschwarzer Tinte, um seine Sporen freizusetzen. Früher nutzte man diese Flüssigkeit tatsächlich zum Schreiben!",
    "exp": "Der Schopftintling verdaut sich durch Autolyse binnen weniger Stunden selbst zu pechschwarzer Tinte, um seine Sporen freizusetzen. Früher nutzte man diese Flüssigkeit tatsächlich zum Schreiben!"
  },
  {
    "id": 7,
    "cat": "erhitzen_spezial",
    "habitat": "📍 Aachener Wald & Eifel · Sehr häufig unter Buchen & Fichten auf saurem Boden",
    "season": "Mai–November",
    "img": "./img/pilz-07.jpg",
    "nameQ": "Welcher Speisepilz mit dunkelbraunem Samthut, roten Röhrenmündungen und rot beflocktem Stiel läuft beim Anschneiden sekundenschnell intensiv indigoblau an?",
    "nameOpts": [
      "Flockenstieliger Hexen-Röhrling (Neoboletus erythropus)",
      "Satans-Röhrling (giftiger Rubroboletus satanas)",
      "Netzstieliger Hexen-Röhrling (Suillellus luridus)",
      "Schönfuß-Röhrling (bitterer Caloboletus calopus)"
    ],
    "toxClass": "cooked",
    "toxBadge": "🟡 Roh giftig · Gut durcherhitzt vorzüglich!",
    "toxOpts": [
      "🟡 Roh stark Magen-Darm-giftig, aber gut durcherhitzt (mind. 15 Min.) ein vorzüglicher, festfleischiger Speisepilz!",
      "☠️ Auch gekocht tödlich giftig – niemals verzehren!",
      "🟢 Sogar roh im Salat bedenkenlos essbar",
      "🟠 Wegen extremer Bitterkeit komplett ungenießbar"
    ],
    "details": {
      "title": "Flockenstieliger Hexen-Röhrling („Flocki“)",
      "latin": "Neoboletus erythropus (Syn. Boletus luridiformis)",
      "features": "Dunkelbrauner, samtiger Hut; karmin- bis orangerote Poren; gelber Stiel dicht mit feinen roten Flöckchen besetzt (KEIN Stielnetz!); gelbes Fleisch läuft im Anschnitt blitzschnell schwarzblau an.",
      "lookalike": "Satans-Röhrling (Rubroboletus satanas, stark giftig!): Hat einen kreideweißen bis silbergrauen Hut, ein deutliches Stielnetz und wächst nur auf Kalkboden (z. B. Raum Stolberg/Kalkeifel). Netzstieliger Hexen-Röhrling hat ein dunkles Stielnetz.",
      "trivia": "Wegen seiner rasanten Blaufärbung und roten Poren hielt der Volksglaube ihn für ein Hexenwerk. Gut durchgegart gilt der „Flocki“ heute jedoch als einer der schmackhaftesten Speisepilze überhaupt!"
    },
    "credit": {
      "artist": "Wikimedia Commons",
      "license": "CC BY-SA 3.0",
      "commons": "File:Boletus erythropus 01.jpg"
    },
    "q": "Welcher Speisepilz mit dunkelbraunem Samthut, roten Röhrenmündungen und rot beflocktem Stiel läuft beim Anschneiden sekundenschnell intensiv indigoblau an?",
    "a": [
      "Flockenstieliger Hexen-Röhrling (Neoboletus erythropus)",
      "Satans-Röhrling (giftiger Rubroboletus satanas)",
      "Netzstieliger Hexen-Röhrling (Suillellus luridus)",
      "Schönfuß-Röhrling (bitterer Caloboletus calopus)"
    ],
    "explanation": "Wegen seiner rasanten Blaufärbung und roten Poren hielt der Volksglaube ihn für ein Hexenwerk. Gut durchgegart gilt der „Flocki“ heute jedoch als einer der schmackhaftesten Speisepilze überhaupt!",
    "exp": "Wegen seiner rasanten Blaufärbung und roten Poren hielt der Volksglaube ihn für ein Hexenwerk. Gut durchgegart gilt der „Flocki“ heute jedoch als einer der schmackhaftesten Speisepilze überhaupt!"
  },
  {
    "id": 8,
    "cat": "erhitzen_spezial",
    "habitat": "📍 Aachener Wald & Hürtgenwald · Sehr häufig in Laub- und Nadelwäldern",
    "season": "Juni–November",
    "img": "./img/pilz-08.jpg",
    "nameQ": "Welcher essbare Wulstling verrät sich durch weinrötlich anlaufende Fraßstellen, eine geriefte Manschette und das Fehlen einer häutigen Stielscheide?",
    "nameOpts": [
      "Perlpilz (Amanita rubescens)",
      "Pantherpilz (Amanita pantherina)",
      "Grauer Wulstling (Amanita excelsa)",
      "Fliegenpilz (Amanita muscaria)"
    ],
    "toxClass": "cooked",
    "toxBadge": "🟡 Roh giftig (Hämolysine) · Nur gut erhitzt essbar!",
    "toxOpts": [
      "🟡 Roh giftig (blutauflösende Hämolysine), nur gut durcherhitzt essbar – wegen Verwechslungsgefahr mit dem Pantherpilz nur für erfahrene Sammler!",
      "🟢 Roh wie gekocht völlig harmlos für Anfänger",
      "☠️ Auch gekocht tödlich giftig durch Amatoxine",
      "🟠 Ungenießbar zäh und holzig"
    ],
    "details": {
      "title": "Perlpilz (Rötender Wulstling)",
      "latin": "Amanita rubescens",
      "features": "Rötlich-brauner Hut mit grauen bis rötlichen Hüllflocken; Manschette oberseits deutlich gerieft (wie ein Zahnrad/Kamm); Fleisch und Madengänge in der Stielbasis laufen weinrot bis fleischrosa an; Rübenknolle ohne „Bergsteigersöckchen“.",
      "lookalike": "Pantherpilz (Amanita pantherina, schwer giftig!): Reinweiße Flocken auf braunem Hut, rötet NIEMALS, Manschette meist glatt/ungerieft, Knolle mit scharf abgesetztem Ringwulst („Bergsteigersöckchen“).",
      "trivia": "Als einziger genießbarer Wulstling rötet sein Fleisch bei Verletzung langsam wie roher Schinken nach. Da er roh giftige Magen-Darm-Reizstoffe enthält, muss er stets gründlich erhitzt werden!"
    },
    "credit": {
      "artist": "Archenzo",
      "license": "CC BY-SA 3.0",
      "commons": "File:Amanita rubescens.JPG"
    },
    "q": "Welcher essbare Wulstling verrät sich durch weinrötlich anlaufende Fraßstellen, eine geriefte Manschette und das Fehlen einer häutigen Stielscheide?",
    "a": [
      "Perlpilz (Amanita rubescens)",
      "Pantherpilz (Amanita pantherina)",
      "Grauer Wulstling (Amanita excelsa)",
      "Fliegenpilz (Amanita muscaria)"
    ],
    "explanation": "Als einziger genießbarer Wulstling rötet sein Fleisch bei Verletzung langsam wie roher Schinken nach. Da er roh giftige Magen-Darm-Reizstoffe enthält, muss er stets gründlich erhitzt werden!",
    "exp": "Als einziger genießbarer Wulstling rötet sein Fleisch bei Verletzung langsam wie roher Schinken nach. Da er roh giftige Magen-Darm-Reizstoffe enthält, muss er stets gründlich erhitzt werden!"
  },
  {
    "id": 9,
    "cat": "erhitzen_spezial",
    "habitat": "📍 Aachener Wald & Eifel · Büschelig an Laubholzstümpfen (Buche, Eiche, Birke)",
    "season": "April–November",
    "img": "./img/pilz-09.jpg",
    "nameQ": "Welcher aromatische Speisepilz wächst büschelig auf Laubholzstümpfen und besitzt unterhalb des Stielrings eine dunkelbraun geschuppte, raue Stielrinde?",
    "nameOpts": [
      "Stockschwämmchen (Kuehneromyces mutabilis)",
      "Gifthäubling (Galerina marginata)",
      "Grünblättriger Schwefelkopf (Hypholoma fasciculare)",
      "Honiggelber Hallimasch (Armillaria mellea)"
    ],
    "toxClass": "edible",
    "toxBadge": "🟢 Essbar (Suppenpilz) · ⚠️ Tödlicher Doppelgänger!",
    "toxOpts": [
      "🟢 Guter Speise- und Suppenpilz (gut erhitzt), ABER nur für absolute Profis wegen des tödlich giftigen Gifthäublings am selben Baumstumpf!",
      "☠️ Selbst tödlich giftig durch Amatoxine",
      "🔴 Stark Magen-Darm-giftig und gallenbitter",
      "🟠 Ungenießbar hart wie Zunderschwamm"
    ],
    "details": {
      "title": "Stockschwämmchen",
      "latin": "Kuehneromyces mutabilis",
      "features": "Hut feucht zimtbraun, trocknet von der Mitte her ockergelb aus (zweifarbig!); unterhalb des häutigen Rings ist der Stiel mit deutlichen, abstehenden braunen Schüppchen besetzt; Geruch angenehm würzig nach frischem Holz.",
      "lookalike": "☠️ TÖDLICHE GEFAHR: Gifthäubling (Galerina marginata)! Kann am selben Baumstumpf mitten zwischen Stockschwämmchen wachsen! Unterscheidung: Der Gifthäubling hat einen silbrig-weiß längsüberfaserten Stiel OHNE braune Schüppchen und riecht muffig-mehlig.",
      "trivia": "Stockschwämmchen liefern ein fantastisches Waldpilzaroma für Suppen und Saucen. Weil am selben Baumstamm auch der tödliche Gifthäubling wachsen kann, muss jeder Stiel einzeln kontrolliert werden!"
    },
    "credit": {
      "artist": "George Chernilevsky",
      "license": "CC BY 4.0",
      "commons": "File:Kuehneromyces mutabilis 2026 G4.jpg"
    },
    "q": "Welcher aromatische Speisepilz wächst büschelig auf Laubholzstümpfen und besitzt unterhalb des Stielrings eine dunkelbraun geschuppte, raue Stielrinde?",
    "a": [
      "Stockschwämmchen (Kuehneromyces mutabilis)",
      "Gifthäubling (Galerina marginata)",
      "Grünblättriger Schwefelkopf (Hypholoma fasciculare)",
      "Honiggelber Hallimasch (Armillaria mellea)"
    ],
    "explanation": "Stockschwämmchen liefern ein fantastisches Waldpilzaroma für Suppen und Saucen. Weil am selben Baumstamm auch der tödliche Gifthäubling wachsen kann, muss jeder Stiel einzeln kontrolliert werden!",
    "exp": "Stockschwämmchen liefern ein fantastisches Waldpilzaroma für Suppen und Saucen. Weil am selben Baumstamm auch der tödliche Gifthäubling wachsen kann, muss jeder Stiel einzeln kontrolliert werden!"
  },
  {
    "id": 10,
    "cat": "erhitzen_spezial",
    "habitat": "📍 Aachener Wald · Massenhaft im Buchenlaub auf sauren bis neutralen Böden",
    "season": "August–November",
    "img": "./img/pilz-10.jpg",
    "nameQ": "Welcher kleine, durchgehend amethystviolette Waldpilz mit auffallend dicklichen, entfernt stehenden Lamellen wächst häufig auf feuchtem Laubwaldboden?",
    "nameOpts": [
      "Violetter Lacktrichterling (Laccaria amethystina)",
      "Gemeiner Rettich-Helmling (Mycena pura)",
      "Violetter Rötelritterling (Lepista nuda)",
      "Bocks-Dickfuß (Cortinarius camphoratus)"
    ],
    "toxClass": "edible",
    "toxBadge": "🟢 Essbar als Mischpilz (in kleinen Mengen)",
    "toxOpts": [
      "🟢 Essbar als hübscher Farbtupfer im Mischpilzgericht (nur in kleinen Mengen, da er Arsen aus dem Waldboden anreichern kann)",
      "☠️ Tödlich giftig – schon ein einzelner Hut führt zu Leberversagen",
      "🔴 Stark giftig mit Muskarin-Schock",
      "🟠 Extrem scharf und brennend"
    ],
    "details": {
      "title": "Violetter Lacktrichterling",
      "latin": "Laccaria amethystina",
      "features": "Jung kräftig dunkelviolett (blassgrau ausblassend bei Trockenheit); Lamellen auffallend dick, weit auseinanderstehend und weißlich bestäubt; Stiel zäh und längsfaserig; Geruch unauffällig mild.",
      "lookalike": "Rettich-Helmling (Mycena pura, giftig – enthält Muskarin!): Hat dünne, eng stehende blasslila Lamellen, einen zerbrechlichen hohlen Stiel und riecht beim Zerreiben deutlich nach Rettich!",
      "trivia": "Dieser zierliche Pilz behält sein leuchtendes Violett sogar nach dem Kochen bei. Gourmet-Köche nutzen ihn deshalb gern als farbenfrohen, essbaren Blickfang in bunten Blattsalaten!"
    },
    "credit": {
      "artist": "Luridiformis at en.wikipedia",
      "license": "CC BY 3.0",
      "commons": "File:Laccaria amethystina 2.jpg"
    },
    "q": "Welcher kleine, durchgehend amethystviolette Waldpilz mit auffallend dicklichen, entfernt stehenden Lamellen wächst häufig auf feuchtem Laubwaldboden?",
    "a": [
      "Violetter Lacktrichterling (Laccaria amethystina)",
      "Gemeiner Rettich-Helmling (Mycena pura)",
      "Violetter Rötelritterling (Lepista nuda)",
      "Bocks-Dickfuß (Cortinarius camphoratus)"
    ],
    "explanation": "Dieser zierliche Pilz behält sein leuchtendes Violett sogar nach dem Kochen bei. Gourmet-Köche nutzen ihn deshalb gern als farbenfrohen, essbaren Blickfang in bunten Blattsalaten!",
    "exp": "Dieser zierliche Pilz behält sein leuchtendes Violett sogar nach dem Kochen bei. Gourmet-Köche nutzen ihn deshalb gern als farbenfrohen, essbaren Blickfang in bunten Blattsalaten!"
  },
  {
    "id": 11,
    "cat": "erhitzen_spezial",
    "habitat": "📍 Nordeifel, Hürtgenwald & Dreiländereck · Unter Kiefern & Fichten",
    "season": "August–November",
    "img": "./img/pilz-11.jpg",
    "nameQ": "Welcher Speisepilz unter Nadelbäumen sondert bei Verletzung sofort leuchtend karottenorange Milch ab, die sich nach einiger Zeit grünlich verfärbt?",
    "nameOpts": [
      "Edel-Reizker (Lactarius deliciosus / L. deterrimus)",
      "Birken-Reizker (Lactarius torminosus)",
      "Falscher Pfifferling (Hygrophoropsis aurantiaca)",
      "Rotbrauner Milchling (Lactarius rufus)"
    ],
    "toxClass": "edible",
    "toxBadge": "🟢 Guter Speisepilz (Bratpilz)",
    "toxOpts": [
      "🟢 Guter Speisepilz (besonders scharf in der Pfanne gebraten) – alle karottenrot milchenden Milchlinge Mitteleuropas sind essbar!",
      "🔴 Stark Magen-Darm-giftig durch seine rote Milch",
      "☠️ Tödlich giftig – zerstört die roten Blutkörperchen",
      "🟠 Komplett ungenießbar wegen stechendem Teergeruch"
    ],
    "details": {
      "title": "Edel-Reizker & Fichten-Reizker",
      "latin": "Lactarius deliciosus / Lactarius deterrimus",
      "features": "Orangeroter, gezonte Ringe tragender Hut mit grünen Flecken im Alter; sprödes Fleisch (wie ein Apfel brechend); tritt im Anschnitt sofort karottenrote Milch aus.",
      "lookalike": "Birken-Reizker (Lactarius torminosus, stark Magen-Darm-giftig!): Hat einen stark zottig-bärtigen Hutrand, wächst bei Birken und milcht WEISS (brennend scharf!). Grundregel bei Milchlingen: Karottenrote Milch = essbar; weiße scharfe Milch = Finger weg!",
      "trivia": "Reizker gehören zu den wenigen Milchlingen, die gefahrlos essbar sind: Nur Reizker mit oranger oder roter Milch sind genießbar. Nach einer großen Mahlzeit kann sich der Urin harmlos rötlich färben!"
    },
    "credit": {
      "artist": "Wikimedia Commons",
      "license": "CC BY-SA 3.0",
      "commons": "File:Lactarius deliciosus.jpg"
    },
    "q": "Welcher Speisepilz unter Nadelbäumen sondert bei Verletzung sofort leuchtend karottenorange Milch ab, die sich nach einiger Zeit grünlich verfärbt?",
    "a": [
      "Edel-Reizker (Lactarius deliciosus / L. deterrimus)",
      "Birken-Reizker (Lactarius torminosus)",
      "Falscher Pfifferling (Hygrophoropsis aurantiaca)",
      "Rotbrauner Milchling (Lactarius rufus)"
    ],
    "explanation": "Reizker gehören zu den wenigen Milchlingen, die gefahrlos essbar sind: Nur Reizker mit oranger oder roter Milch sind genießbar. Nach einer großen Mahlzeit kann sich der Urin harmlos rötlich färben!",
    "exp": "Reizker gehören zu den wenigen Milchlingen, die gefahrlos essbar sind: Nur Reizker mit oranger oder roter Milch sind genießbar. Nach einer großen Mahlzeit kann sich der Urin harmlos rötlich färben!"
  },
  {
    "id": 12,
    "cat": "erhitzen_spezial",
    "habitat": "📍 Hohes Venn (Mützenich / Lammersdorf) & Aachener Wald · Immer bei Birken",
    "season": "Juni–Oktober",
    "img": "./img/pilz-12.jpg",
    "nameQ": "Welcher Speisepilz wächst ausschließlich unter Birken und besitzt einen polsterförmigen graubraunen Hut mit charakteristisch schwarz geschupptem Stiel?",
    "nameOpts": [
      "Gemeiner Birkenpilz (Leccinum scabrum)",
      "Gemeiner Steinpilz (Boletus edulis)",
      "Gallenröhrling (Tylopilus felleus)",
      "Pfefferröhrling (Chalciporus piperatus)"
    ],
    "toxClass": "cooked",
    "toxBadge": "🟡 Jung gut durcherhitzt essbar (roh giftig)",
    "toxOpts": [
      "🟡 Roh Magen-Darm-giftig, aber jung und mindestens 15 Minuten gut durcherhitzt ein guter Speisepilz",
      "🟢 Auch roh im Salat völlig bekömmlich",
      "☠️ Tödlich giftig – enthält Amatoxine",
      "🟠 Extrem gallenbitter – ungenießbar"
    ],
    "details": {
      "title": "Gemeiner Birkenpilz",
      "latin": "Leccinum scabrum",
      "features": "Grau- bis haselbrauner, glatter Hut; weißliche bis graue Röhren; schlanker weißer Stiel mit dunklen, rauen Faserschüppchen (wie eine Birkenrinde!).",
      "lookalike": "Gallenröhrling (hat ein Stielnetz statt rauer Schüppchen und bittere rosa Röhren) sowie Rotkappen (Leccinum-Arten mit orangem Hut, ebenfalls gut erhitzt essbar).",
      "trivia": "Birkenpilze gehen eine strikte Lebensgemeinschaft mit Birken ein und wachsen nie unter anderen Bäumen. Beim Kochen wird das Fleisch schwärzlich, bleibt geschmacklich aber herrlich aromatisch!"
    },
    "credit": {
      "artist": "cheloVechek / talk",
      "license": "CC BY-SA 4.0",
      "commons": "File:Bolet rude.jpg"
    },
    "q": "Welcher Speisepilz wächst ausschließlich unter Birken und besitzt einen polsterförmigen graubraunen Hut mit charakteristisch schwarz geschupptem Stiel?",
    "a": [
      "Gemeiner Birkenpilz (Leccinum scabrum)",
      "Gemeiner Steinpilz (Boletus edulis)",
      "Gallenröhrling (Tylopilus felleus)",
      "Pfefferröhrling (Chalciporus piperatus)"
    ],
    "explanation": "Birkenpilze gehen eine strikte Lebensgemeinschaft mit Birken ein und wachsen nie unter anderen Bäumen. Beim Kochen wird das Fleisch schwärzlich, bleibt geschmacklich aber herrlich aromatisch!",
    "exp": "Birkenpilze gehen eine strikte Lebensgemeinschaft mit Birken ein und wachsen nie unter anderen Bäumen. Beim Kochen wird das Fleisch schwärzlich, bleibt geschmacklich aber herrlich aromatisch!"
  },
  {
    "id": 13,
    "cat": "toedlich",
    "habitat": "📍 Aachener Wald & Vorland · Unter Eichen und Buchen (Mykorrhiza)",
    "season": "Juli–Oktober",
    "img": "./img/pilz-13.jpg",
    "nameQ": "Welcher hochgiftige Pilz mit olivgrünem Hut, weißen Lamellen, hängender Manschette und knolliger Scheidentasche verursacht über 90 % aller tödlichen Pilzvergiftungen?",
    "nameOpts": [
      "Grüner Knollenblätterpilz (Amanita phalloides)",
      "Grüngefelderter Täubling (Russula virescens)",
      "Wiesen-Champignon (Agaricus campestris)",
      "Gelber Knollenblätterpilz (Amanita citrina)"
    ],
    "toxClass": "deadly",
    "toxBadge": "☠️ TÖDLICH GIFTIG! (Amatoxine)",
    "toxOpts": [
      "☠️ TÖDLICH GIFTIG! Verantwortlich für rund 90 % aller tödlichen Pilzvergiftungen (hitzestabile Amatoxine zerstören die Leber)",
      "🟡 Roh giftig, aber nach 20 Minuten Abkochen essbar",
      "🟠 Nur leicht Magen-Darm-reizend, klingt nach 2 Stunden ab",
      "🟢 Essbarer Speisepilz mit mildem Geschmack"
    ],
    "details": {
      "title": "Grüner Knollenblätterpilz",
      "latin": "Amanita phalloides",
      "features": "Olivgrünlicher bis gelblich-weißer, radial eingewachsen faseriger Hut (oft ohne Flocken!); Lamellen IMMER weiß; hängende Manschette am Stiel; Knolle an der Basis in einer lappig-sackartigen weißen Scheide (Volva) steckend; riecht jung süßlich nach Kunsthonig.",
      "lookalike": "Wird von unerfahrenen Sammlern mit grünen Täublingen (haben KEINEN Ring, KEINE Knolle und spröde Lamellen), jungen Champignons (haben rosa bis schokobraune Lamellen und KEINE Scheide an der Basis) oder Grünlingen verwechselt.",
      "trivia": "Sein Gift Amanitin zerstört die Leberzellen schleichend und unumkehrbar. Die ersten Symptome treten oft erst nach 12 bis 24 Stunden auf, wenn das Gift im Körper bereits fatale Schäden angerichtet hat!"
    },
    "credit": {
      "artist": "Archenzo",
      "license": "CC BY-SA 3.0",
      "commons": "File:Amanita phalloides 1.JPG"
    },
    "q": "Welcher hochgiftige Pilz mit olivgrünem Hut, weißen Lamellen, hängender Manschette und knolliger Scheidentasche verursacht über 90 % aller tödlichen Pilzvergiftungen?",
    "a": [
      "Grüner Knollenblätterpilz (Amanita phalloides)",
      "Grüngefelderter Täubling (Russula virescens)",
      "Wiesen-Champignon (Agaricus campestris)",
      "Gelber Knollenblätterpilz (Amanita citrina)"
    ],
    "explanation": "Sein Gift Amanitin zerstört die Leberzellen schleichend und unumkehrbar. Die ersten Symptome treten oft erst nach 12 bis 24 Stunden auf, wenn das Gift im Körper bereits fatale Schäden angerichtet hat!",
    "exp": "Sein Gift Amanitin zerstört die Leberzellen schleichend und unumkehrbar. Die ersten Symptome treten oft erst nach 12 bis 24 Stunden auf, wenn das Gift im Körper bereits fatale Schäden angerichtet hat!"
  },
  {
    "id": 14,
    "cat": "toedlich",
    "habitat": "📍 Aachener Wald & Eifel · An Nadel- und Laubholzstümpfen (oft neben Stockschwämmchen!)",
    "season": "August–November",
    "img": "./img/pilz-14.jpg",
    "nameQ": "Welcher kleine braune Holzbewohner mit silbrig längsfaserigem Stiel enthält dieselben tödlichen Amatoxine wie der Knollenblätterpilz und bedroht unvorsichtige Sammler?",
    "nameOpts": [
      "Gifthäubling (Galerina marginata)",
      "Stockschwämmchen (Kuehneromyces mutabilis)",
      "Gemeiner Samtfußrübling (Flammulina velutipes)",
      "Rauchblättriger Schwefelkopf (Hypholoma capnoides)"
    ],
    "toxClass": "deadly",
    "toxBadge": "☠️ TÖDLICH GIFTIG! (Amatoxine)",
    "toxOpts": [
      "☠️ TÖDLICH GIFTIG! Enthält dieselben leberzerstörenden Amatoxine wie der Grüne Knollenblätterpilz!",
      "🟠 Nur bitter, aber völlig ungiftig",
      "🟡 Nach dem Braten ein guter Suppenpilz",
      "🟢 Essbarer Winterpilz"
    ],
    "details": {
      "title": "Gifthäubling (Nadelholz-Häubling)",
      "latin": "Galerina marginata",
      "features": "Honig- bis ockerbrauner, feucht durchscheinend geriefter Hut; flüchtiger Ring am Stiel; Stiel unterhalb des Rings silbrig-weiß längsfaserig bereift (KEINE abstehenden braunen Schüppchen!); Geruch deutlich mehlig-ranzig.",
      "lookalike": "Stockschwämmchen (Kuehneromyces mutabilis, essbar): Hat unterhalb des Rings deutliche braune Schüppchen und riecht aromatisch-würzig nach Holz. Beide Arten können direkt nebeneinander auf demselben Baumstumpf im Aachener Wald wachsen!",
      "trivia": "Trotz seiner unscheinbaren Größe von wenigen Zentimetern enthält der Gifthäubling tödliches Amanitin. Er wächst oft direkt neben essbaren Stockschwämmchen auf demselben Totholzstamm!"
    },
    "credit": {
      "artist": "Wikimedia Commons",
      "license": "CC BY-SA 3.0",
      "commons": "File:Galerina marginata.jpg"
    },
    "q": "Welcher kleine braune Holzbewohner mit silbrig längsfaserigem Stiel enthält dieselben tödlichen Amatoxine wie der Knollenblätterpilz und bedroht unvorsichtige Sammler?",
    "a": [
      "Gifthäubling (Galerina marginata)",
      "Stockschwämmchen (Kuehneromyces mutabilis)",
      "Gemeiner Samtfußrübling (Flammulina velutipes)",
      "Rauchblättriger Schwefelkopf (Hypholoma capnoides)"
    ],
    "explanation": "Trotz seiner unscheinbaren Größe von wenigen Zentimetern enthält der Gifthäubling tödliches Amanitin. Er wächst oft direkt neben essbaren Stockschwämmchen auf demselben Totholzstamm!",
    "exp": "Trotz seiner unscheinbaren Größe von wenigen Zentimetern enthält der Gifthäubling tödliches Amanitin. Er wächst oft direkt neben essbaren Stockschwämmchen auf demselben Totholzstamm!"
  },
  {
    "id": 15,
    "cat": "toedlich",
    "habitat": "📍 Hohes Venn, Rureifel & saure Moorfichtenwälder · Feuchte Moosböden",
    "season": "August–Oktober",
    "img": "./img/pilz-15.jpg",
    "nameQ": "Welcher fuchsbraune Schleierling mit kegelig zugespitztem Hutbuckel enthält das tückische Gift Orellanin, das erst nach Tagen oder Wochen zu Nierenversagen führt?",
    "nameOpts": [
      "Spitzgebuckelter Raukopf (Cortinarius rubellus)",
      "Echter Pfifferling (Cantharellus cibarius)",
      "Violetter Lacktrichterling (Laccaria amethystina)",
      "Reifpilz (Cortinarius caperatus)"
    ],
    "toxClass": "deadly",
    "toxBadge": "☠️ TÖDLICH GIFTIG! (Orellanin / Nierengift)",
    "toxOpts": [
      "☠️ TÖDLICH GIFTIG! Enthält Orellanin – ein heimtückisches Nierengift, dessen Symptome oft erst 2 bis 14 Tage nach der Mahlzeit auftreten!",
      "🟢 Guter Speisepilz der Moorwälder",
      "🟡 Nach 10 Minuten Abkochen essbar",
      "🟠 Ungenießbar zäh, aber ungiftig"
    ],
    "details": {
      "title": "Spitzgebuckelter Raukopf",
      "latin": "Cortinarius rubellus (Syn. Cortinarius speciosissimus)",
      "features": "Zimt- bis fuchsrotbrauner, feinfilziger Hut mit markantem spitzem Buckel; dickliche, weit stehende rostbraune Lamellen; Stiel auf rotbraunem Grund mit gelblichen Gürtelbändern (Natterung).",
      "lookalike": "Wurde schon katastrophal mit Pfifferlingen (haben gegabelte Leisten statt rostbrauner Lamellen!) oder essbaren Milchlingen verwechselt.",
      "trivia": "Mit einer Latenzzeit von bis zu 14 Tagen hält das Toxin Orellanin den traurigen Rekord unter allen Pilzgiften. Wenn die Nieren versagen, erinnern sich viele Betroffene kaum noch an die Pilzmahlzeit!"
    },
    "credit": {
      "artist": "Eric Steinert",
      "license": "CC BY-SA 3.0",
      "commons": "File:Cortinarius rubellus 01.jpg"
    },
    "q": "Welcher fuchsbraune Schleierling mit kegelig zugespitztem Hutbuckel enthält das tückische Gift Orellanin, das erst nach Tagen oder Wochen zu Nierenversagen führt?",
    "a": [
      "Spitzgebuckelter Raukopf (Cortinarius rubellus)",
      "Echter Pfifferling (Cantharellus cibarius)",
      "Violetter Lacktrichterling (Laccaria amethystina)",
      "Reifpilz (Cortinarius caperatus)"
    ],
    "explanation": "Mit einer Latenzzeit von bis zu 14 Tagen hält das Toxin Orellanin den traurigen Rekord unter allen Pilzgiften. Wenn die Nieren versagen, erinnern sich viele Betroffene kaum noch an die Pilzmahlzeit!",
    "exp": "Mit einer Latenzzeit von bis zu 14 Tagen hält das Toxin Orellanin den traurigen Rekord unter allen Pilzgiften. Wenn die Nieren versagen, erinnern sich viele Betroffene kaum noch an die Pilzmahlzeit!"
  },
  {
    "id": 16,
    "cat": "toedlich",
    "habitat": "📍 Parks, Friedhöfe & Kalkbuchenwälder um Aachen, Stolberg & Kornelimünster",
    "season": "Mai–Juli (Frühsommer!)",
    "img": "./img/pilz-16.jpg",
    "nameQ": "Welcher weiße bis ziegelrot nachdunkelnde Frühlingspilz mit radial rissigem Hut enthält lebensgefährliche Mengen des Parasympathikus-Gifts Muscarin?",
    "nameOpts": [
      "Ziegelroter Risspilz (Inosperma erubescens)",
      "Mairitterling (essbarer Calocybe gambosa)",
      "Wiesen-Champignon (Agaricus campestris)",
      "Perlpilz (rötender Amanita rubescens)"
    ],
    "toxClass": "deadly",
    "toxBadge": "☠️ STARK BIS TÖDLICH GIFTIG! (Muskarin)",
    "toxOpts": [
      "☠️ STARK BIS TÖDLICH GIFTIG! Enthält das bis zu 20-Fache der Muskarin-Menge eines Fliegenpilzes (Schweißausbrüche, Sehstörungen, Herzstillstand)",
      "🟢 Beliebter Frühlings-Speisepilz auf Parkwiesen",
      "🟡 Roh unverträglich, gebraten mild und essbar",
      "🟠 Nur leicht bitter im Nachgeschmack"
    ],
    "details": {
      "title": "Ziegelroter Risspilz",
      "latin": "Inosperma erubescens (Syn. Inocybe erubescens / I. patouillardii)",
      "features": "Jung weißlich-seidig mit kegeligem Buckel, im Alter und bei Druck ziegelrot bisdunkelrot verfärbend; Hutrand reißt im Alter radial tief ein; Sporenpulver schmutzig-braun; riecht unangenehm süßlich-obstig bis spermatisch.",
      "lookalike": "Wird im Mai/Juni gefährlich oft mit dem essbaren Maipilz (Calocybe gambosa: polsterförmig, reißt nicht radial ein, rötet nie, riecht stark nach frischem Mehl/Gurke) oder Champignons verwechselt!",
      "trivia": "Dieser Risspilz enthält bis zu 500-mal mehr Muscarin als ein Fliegenpilz! Schon ein Bruchteil eines Hutes führt zu Schweißausbrüchen, Sehstörungen und lebensbedrohlichem Herzstillstand."
    },
    "credit": {
      "artist": "Andreas Kunze",
      "license": "CC BY-SA 3.0",
      "commons": "File:2010-04-27 Inocybe erubescens.jpg"
    },
    "q": "Welcher weiße bis ziegelrot nachdunkelnde Frühlingspilz mit radial rissigem Hut enthält lebensgefährliche Mengen des Parasympathikus-Gifts Muscarin?",
    "a": [
      "Ziegelroter Risspilz (Inosperma erubescens)",
      "Mairitterling (essbarer Calocybe gambosa)",
      "Wiesen-Champignon (Agaricus campestris)",
      "Perlpilz (rötender Amanita rubescens)"
    ],
    "explanation": "Dieser Risspilz enthält bis zu 500-mal mehr Muscarin als ein Fliegenpilz! Schon ein Bruchteil eines Hutes führt zu Schweißausbrüchen, Sehstörungen und lebensbedrohlichem Herzstillstand.",
    "exp": "Dieser Risspilz enthält bis zu 500-mal mehr Muscarin als ein Fliegenpilz! Schon ein Bruchteil eines Hutes führt zu Schweißausbrüchen, Sehstörungen und lebensbedrohlichem Herzstillstand."
  },
  {
    "id": 17,
    "cat": "toedlich",
    "habitat": "📍 Aachener Wald & Hohes Venn · Sehr häufig unter Birken, Buchen & Fichten",
    "season": "Juli–November",
    "img": "./img/pilz-17.jpg",
    "nameQ": "Welcher Pilz mit stark eingerolltem Hutrand und bräunenden Lamellen galt früher als essbar, löst aber bei wiederholtem Verzehr eine potenziell tödliche Autoimmunreaktion aus?",
    "nameOpts": [
      "Kahler Krempling (Paxillus involutus)",
      "Maronen-Röhrling (Imleria badia)",
      "Fichten-Reizker (Lactarius deterrimus)",
      "Samtfußkrempling (Tapinella atrotomentosa)"
    ],
    "toxClass": "deadly",
    "toxBadge": "☠️ LEBENSGEFÄHRLICH GIFTIG! (Paxillus-Syndrom)",
    "toxOpts": [
      "☠️ LEBENSGEFÄHRLICH GIFTIG! Löst das tückische Paxillus-Syndrom aus (Antikörper-Reaktion, die rote Blutkörperchen zerstört und zu akutem Nierenversagen führt)",
      "🟢 Klassischer Speisepilz für jedes Mischgericht",
      "🟠 Nur etwas säuerlich, aber harmlos",
      "🟡 Nach einmaligem Aufkochen völlig unbedenklich"
    ],
    "details": {
      "title": "Kahler Krempling",
      "latin": "Paxillus involutus",
      "features": "Ocker- bis rostbrauner, trichterig vertiefter Hut mit lange stark eingerolltem, filzigem Rand; eng stehende, am Stiel herablaufende Lamellen, die auf Fingerdruck sofort dunkelbraun flecken und sich leicht vom Hutboden schieben lassen.",
      "lookalike": "Wird manchmal mit Reizkern (milchen karottenrot!) oder Trichterlingen verwechselt.",
      "trivia": "Das gefürchtete Paxillus-Syndrom tritt erst nach jahrelangem, scheinbar harmlosem Verzehr auf: Plötzlich bildet das Immunsystem Antikörper, die die eigenen roten Blutkörperchen massenhaft auflösen!"
    },
    "credit": {
      "artist": "Petar Milošević",
      "license": "CC BY-SA 4.0",
      "commons": "File:Navadne podvihanke (Paxillus involutus).jpg"
    },
    "q": "Welcher Pilz mit stark eingerolltem Hutrand und bräunenden Lamellen galt früher als essbar, löst aber bei wiederholtem Verzehr eine potenziell tödliche Autoimmunreaktion aus?",
    "a": [
      "Kahler Krempling (Paxillus involutus)",
      "Maronen-Röhrling (Imleria badia)",
      "Fichten-Reizker (Lactarius deterrimus)",
      "Samtfußkrempling (Tapinella atrotomentosa)"
    ],
    "explanation": "Das gefürchtete Paxillus-Syndrom tritt erst nach jahrelangem, scheinbar harmlosem Verzehr auf: Plötzlich bildet das Immunsystem Antikörper, die die eigenen roten Blutkörperchen massenhaft auflösen!",
    "exp": "Das gefürchtete Paxillus-Syndrom tritt erst nach jahrelangem, scheinbar harmlosem Verzehr auf: Plötzlich bildet das Immunsystem Antikörper, die die eigenen roten Blutkörperchen massenhaft auflösen!"
  },
  {
    "id": 18,
    "cat": "toedlich",
    "habitat": "📍 Aachener Wald & Eifel · Unter Buchen, Eichen & Nadelbäumen",
    "season": "Juli–Oktober",
    "img": "./img/pilz-18.jpg",
    "nameQ": "Welcher braune Wulstling mit schneeweißen Hüllresten, gerieftem Hutrand und einer knolligen Scheide mit bergsteigerartiger Stufe ist hochgiftig?",
    "nameOpts": [
      "Pantherpilz (Amanita pantherina)",
      "Perlpilz (Amanita rubescens)",
      "Grauer Wulstling (Amanita excelsa)",
      "Gemeiner Parasol (Macrolepiota procera)"
    ],
    "toxClass": "deadly",
    "toxBadge": "🔴/☠️ SCHWER GIFTIG! (Pantherina-Syndrom)",
    "toxOpts": [
      "🔴/☠️ SCHWER GIFTIG (teils lebensbedrohlich)! Enthält hochkonzentriert Ibotensäure und Muscimol – führt zu Delirium, Krämpfen und Koma",
      "🟢 Vorzüglicher Speisepilz wie der Perlpilz",
      "🟡 Gut durchgebraten ein milder Bratpilz",
      "🟠 Ungenießbar bitter, aber ungiftig"
    ],
    "details": {
      "title": "Pantherpilz",
      "latin": "Amanita pantherina",
      "features": "Reh- bis dunkelbrauner Hut mit gerieftem Rand und reinweißen Flocken; weiße Lamellen; Manschette meist glatt (ungerieft); Knolle mit scharfkantig abgesetztem Wulstrand („Bergsteigersöckchen“); Fleisch bleibt reinweiß (rötet nie!).",
      "lookalike": "Perlpilz (Amanita rubescens, gut erhitzt essbar: rötet an Fraßstellen & Stielbasis, geriefte Manschette) und Grauer Wulstling (Amanita excelsa: graue Flocken, kräftig geriefte Manschette, rübenförmige Knolle ohne Söckchen).",
      "trivia": "Sein Giftcocktail aus Ibotensäure und Muscimol löst schwere Rauschzustände, Tobsuchtsanfälle und Koma aus. Sein reinweißes, unveränderliches Fleisch unterscheidet ihn vom rötenden Perlpilz!"
    },
    "credit": {
      "artist": "George Chernilevsky",
      "license": "Public domain",
      "commons": "File:Amanita pantherina 2013 G1.jpg"
    },
    "q": "Welcher braune Wulstling mit schneeweißen Hüllresten, gerieftem Hutrand und einer knolligen Scheide mit bergsteigerartiger Stufe ist hochgiftig?",
    "a": [
      "Pantherpilz (Amanita pantherina)",
      "Perlpilz (Amanita rubescens)",
      "Grauer Wulstling (Amanita excelsa)",
      "Gemeiner Parasol (Macrolepiota procera)"
    ],
    "explanation": "Sein Giftcocktail aus Ibotensäure und Muscimol löst schwere Rauschzustände, Tobsuchtsanfälle und Koma aus. Sein reinweißes, unveränderliches Fleisch unterscheidet ihn vom rötenden Perlpilz!",
    "exp": "Sein Giftcocktail aus Ibotensäure und Muscimol löst schwere Rauschzustände, Tobsuchtsanfälle und Koma aus. Sein reinweißes, unveränderliches Fleisch unterscheidet ihn vom rötenden Perlpilz!"
  },
  {
    "id": 19,
    "cat": "doppelgaenger",
    "habitat": "📍 Aachener Wald & Hohes Venn · Unter Birken und Fichten auf saurem Boden",
    "season": "August–November",
    "img": "./img/pilz-19.jpg",
    "nameQ": "Welcher weltbekannte Märchenpilz mit scharlachrotem Hut und weißen Flocken verdankt seinen Namen einem mittelalterlichen Brauch zur Insektenbekämpfung?",
    "nameOpts": [
      "Fliegenpilz (Amanita muscaria)",
      "Echter Kaiserling (Amanita caesarea)",
      "Spei-Täubling (Russula emetica)",
      "Ziegelroter Risspilz (Inosperma erubescens)"
    ],
    "toxClass": "toxic",
    "toxBadge": "🔴 Giftig! (Ibotensäure & Muscimol)",
    "toxOpts": [
      "🔴 Giftig! Enthält die Nervengifte Ibotensäure und Muscimol (Rauschzustände, Schwindel, Krämpfe, Herzrasen)",
      "🟢 Essbarer Glückspilz",
      "🟡 Nach kurzem Anbraten essbar",
      "🟠 Nur scharf, aber ohne Giftwirkung"
    ],
    "details": {
      "title": "Fliegenpilz",
      "latin": "Amanita muscaria",
      "features": "Scharlach- bis orangeroter Hut mit weißen, abwischbaren Velumflocken (können nach starkem Regen abgewaschen sein!); weiße Lamellen und weißer Stiel mit hängendem Ring und warzig gegürtelter Knolle.",
      "lookalike": "Nach starkem Regen, wenn die weißen Punkte abgewaschen sind, wurde er schon mit roten Täublingen oder dem (in Nordwesteuropa nicht wild vorkommenden) Kaiserling (hat dottergelbe Lamellen & gelben Stiel!) verwechselt.",
      "trivia": "Früher schnitt man den Pilz in gezuckerte Milch, um Stubenfliegen damit zu betäuben – daher stammt sein Name! Seine Neurotoxine wirken stark halluzinogen und verwirrend auf das Nervensystem."
    },
    "credit": {
      "artist": "Onderwijsgek",
      "license": "CC BY-SA 3.0 nl",
      "commons": "File:Amanita muscaria 3 vliegenzwammen op rij.jpg"
    },
    "q": "Welcher weltbekannte Märchenpilz mit scharlachrotem Hut und weißen Flocken verdankt seinen Namen einem mittelalterlichen Brauch zur Insektenbekämpfung?",
    "a": [
      "Fliegenpilz (Amanita muscaria)",
      "Echter Kaiserling (Amanita caesarea)",
      "Spei-Täubling (Russula emetica)",
      "Ziegelroter Risspilz (Inosperma erubescens)"
    ],
    "explanation": "Früher schnitt man den Pilz in gezuckerte Milch, um Stubenfliegen damit zu betäuben – daher stammt sein Name! Seine Neurotoxine wirken stark halluzinogen und verwirrend auf das Nervensystem.",
    "exp": "Früher schnitt man den Pilz in gezuckerte Milch, um Stubenfliegen damit zu betäuben – daher stammt sein Name! Seine Neurotoxine wirken stark halluzinogen und verwirrend auf das Nervensystem."
  },
  {
    "id": 20,
    "cat": "doppelgaenger",
    "habitat": "📍 Kalkgebiete bei Stolberg, Kornelimünster & Kalkeifel · Wärmeliebend unter Buchen",
    "season": "Juli–September",
    "img": "./img/pilz-20.jpg",
    "nameQ": "Welcher wuchtige Röhrling auf warmen Kalkböden fällt durch einen kreideweißen Hut, blutrote Röhrenmündungen und im Alter durch einen aasartigen Geruch auf?",
    "nameOpts": [
      "Satans-Röhrling (Rubroboletus satanas)",
      "Flockenstieliger Hexen-Röhrling (Neoboletus erythropus)",
      "Schönfuß-Röhrling (Caloboletus calopus)",
      "Sommer-Steinpilz (Boletus reticulatus)"
    ],
    "toxClass": "toxic",
    "toxBadge": "🔴 Stark giftig! (Schwere Magen-Darm-Vergiftung)",
    "toxOpts": [
      "🔴 Stark giftig (auch gekocht)! Verursacht stundenlanges, schwerstes Erbrechen, blutige Durchfälle und Kreislaufkollaps",
      "🟡 Gut durcherhitzt ein hervorragender Speisepilz wie der Flockenstielige Hexen-Röhrling",
      "🟢 Jung roh und gekocht essbar",
      "🟠 Völlig ungiftig, nur leicht säuerlich"
    ],
    "details": {
      "title": "Satans-Röhrling (Satanspilz)",
      "latin": "Rubroboletus satanas (Syn. Boletus satanas)",
      "features": "Polsterförmiger, kalkweißer bis hell silbergrauer Hut (NIEMALS dunkelbraun!); blut- bis orangerote Poren; dickbauchiger gelb-roter Stiel mit rotem Maschennetz; blaut im Schnitt nur schwach himmelblau.",
      "lookalike": "Flockenstieliger Hexen-Röhrling (gut erhitzt essbar!): Hat im Gegensatz zum Satans-Röhrling einen dunkelbraunen Samthut, rote Flöckchen statt Stielnetz, blaut im Schnitt tief schwarzblau und wächst im sauren Aachener Wald.",
      "trivia": "Entgegen alten Gruselgeschichten ist der Satanspilz zwar nicht tödlich, führt aber zu tagelangem, quälendem Erbrechen. Ältere Fruchtkörper stinken zudem penetrant nach verrottendem Fleisch!"
    },
    "credit": {
      "artist": "Archenzo",
      "license": "CC BY-SA 3.0",
      "commons": "File:Boletus satanas.JPG"
    },
    "q": "Welcher wuchtige Röhrling auf warmen Kalkböden fällt durch einen kreideweißen Hut, blutrote Röhrenmündungen und im Alter durch einen aasartigen Geruch auf?",
    "a": [
      "Satans-Röhrling (Rubroboletus satanas)",
      "Flockenstieliger Hexen-Röhrling (Neoboletus erythropus)",
      "Schönfuß-Röhrling (Caloboletus calopus)",
      "Sommer-Steinpilz (Boletus reticulatus)"
    ],
    "explanation": "Entgegen alten Gruselgeschichten ist der Satanspilz zwar nicht tödlich, führt aber zu tagelangem, quälendem Erbrechen. Ältere Fruchtkörper stinken zudem penetrant nach verrottendem Fleisch!",
    "exp": "Entgegen alten Gruselgeschichten ist der Satanspilz zwar nicht tödlich, führt aber zu tagelangem, quälendem Erbrechen. Ältere Fruchtkörper stinken zudem penetrant nach verrottendem Fleisch!"
  },
  {
    "id": 21,
    "cat": "doppelgaenger",
    "habitat": "📍 Aachener Wald & Hürtgenwald · Häufig auf saurem Nadelwaldboden",
    "season": "Juni–Oktober",
    "img": "./img/pilz-21.jpg",
    "nameQ": "Welcher bitterste Doppelgänger des Steinpilzes hat im Alter schmutzig-rosafarbene Röhren und ein grobes, dunkelbraun erhabenes Stielnetz?",
    "nameOpts": [
      "Gallenröhrling (Tylopilus felleus)",
      "Gemeiner Steinpilz (Boletus edulis)",
      "Sommer-Steinpilz (Boletus reticulatus)",
      "Maronen-Röhrling (Imleria badia)"
    ],
    "toxClass": "inedible",
    "toxBadge": "🟠 Ungenießbar! (Extrem gallenbitter)",
    "toxOpts": [
      "🟠 Ungenießbar wegen extremer Galle-Bitterkeit – nicht lebensgefährlich, aber ein einziger Pilz macht das gesamte Pfannengericht ungenießbar!",
      "☠️ Tödlich giftig – zerstört Leber und Nieren",
      "🟢 Hervorragender Speisepilz mit mildem Geschmack",
      "🟡 Nach dem Trocknen verliert sich die Bitterkeit komplett"
    ],
    "details": {
      "title": "Gallenröhrling (Bitterling)",
      "latin": "Tylopilus felleus",
      "features": "Polsterförmiger brauner Hut wie beim Steinpilz; Röhren jung weiß, später jedoch schmutzig altrosa (Rosa-Sporenpulver!) und bauchig vorgewölbt; Stiel mit grobem, dunkelbraunem Maschennetz auf hellerem Grund.",
      "lookalike": "Steinpilz (Boletus edulis): Hat ein feines WEISSES Stielnetz, gelbgrün werdende Röhren und schmeckt mild-nussig.",
      "trivia": "Schon ein einziges erbsengroßes Stück dieses extrem bitteren Pilzes macht ein ganzes Pilzgericht für alle Esser ungenießbar! Erfahrene Sammler machen im Zweifel eine winzige Zungenprobe."
    },
    "credit": {
      "artist": "Björn S...",
      "license": "CC BY-SA 2.0",
      "commons": "File:Tylopilus felleus (36878337253) (2).jpg"
    },
    "q": "Welcher bitterste Doppelgänger des Steinpilzes hat im Alter schmutzig-rosafarbene Röhren und ein grobes, dunkelbraun erhabenes Stielnetz?",
    "a": [
      "Gallenröhrling (Tylopilus felleus)",
      "Gemeiner Steinpilz (Boletus edulis)",
      "Sommer-Steinpilz (Boletus reticulatus)",
      "Maronen-Röhrling (Imleria badia)"
    ],
    "explanation": "Schon ein einziges erbsengroßes Stück dieses extrem bitteren Pilzes macht ein ganzes Pilzgericht für alle Esser ungenießbar! Erfahrene Sammler machen im Zweifel eine winzige Zungenprobe.",
    "exp": "Schon ein einziges erbsengroßes Stück dieses extrem bitteren Pilzes macht ein ganzes Pilzgericht für alle Esser ungenießbar! Erfahrene Sammler machen im Zweifel eine winzige Zungenprobe."
  },
  {
    "id": 22,
    "cat": "doppelgaenger",
    "habitat": "📍 Aachener Wald & Eifel · Auf Nadelstreu und morschem Nadelholz",
    "season": "August–November",
    "img": "./img/pilz-22.jpg",
    "nameQ": "Welcher Doppelgänger des echten Pfifferlings hat tief orangefarbene, weiche echte Lamellen und biegsames Fleisch ohne feinen Aprikosenduft?",
    "nameOpts": [
      "Falscher Pfifferling (Hygrophoropsis aurantiaca)",
      "Echter Pfifferling (Cantharellus cibarius)",
      "Semmel-Stoppelpilz (Hydnum repandum)",
      "Fichten-Reizker (Lactarius deterrimus)"
    ],
    "toxClass": "inedible",
    "toxBadge": "🟠 Ungenießbar bis leicht Magen-Darm-giftig",
    "toxOpts": [
      "🟠 Ungenießbar bis leicht Magen-Darm-giftig – geschmacklos-fade und führt in größeren Mengen zu Verdauungsbeschwerden",
      "🟢 Genauso wohlschmeckend und bekömmlich wie der Echte Pfifferling",
      "☠️ Tödlich giftig durch Orellanin",
      "🟡 Getrocknet ein edler Gewürzpilz"
    ],
    "details": {
      "title": "Falscher Pfifferling",
      "latin": "Hygrophoropsis aurantiaca",
      "features": "Kräftig tieforange bis orangerot; Hutrand lange eingerollt; dünne, eng stehende, mehrfach gabelig geteilte echte Lamellen (lassen sich vom Hutfleisch ablösen); Fleisch weich-wattig, orangefarben (beim Echten Pfifferling innen weißlich & fest!).",
      "lookalike": "Echter Pfifferling (Cantharellus cibarius): Dottergelb, festfleischig, innen weiß, duftet nach Aprikose und hat dickliche, aderig verbundene Leisten statt dünner Lamellen.",
      "trivia": "Während der echte Pfifferling feste Leisten hat, besitzt der Falsche Pfifferling dünne, biegsame Blättchen. Bei empfindlichen Personen kann er spürbare Magen-Darm-Verstimmungen auslösen!"
    },
    "credit": {
      "artist": "Stephan van Helden",
      "license": "CC BY-SA 4.0",
      "commons": "File:Falscher Pfifferling (Hygrophoropsis aurantiaca) nahe der Silberquelle an der Straße vom Silberhaus nach Nagel.jpg"
    },
    "q": "Welcher Doppelgänger des echten Pfifferlings hat tief orangefarbene, weiche echte Lamellen und biegsames Fleisch ohne feinen Aprikosenduft?",
    "a": [
      "Falscher Pfifferling (Hygrophoropsis aurantiaca)",
      "Echter Pfifferling (Cantharellus cibarius)",
      "Semmel-Stoppelpilz (Hydnum repandum)",
      "Fichten-Reizker (Lactarius deterrimus)"
    ],
    "explanation": "Während der echte Pfifferling feste Leisten hat, besitzt der Falsche Pfifferling dünne, biegsame Blättchen. Bei empfindlichen Personen kann er spürbare Magen-Darm-Verstimmungen auslösen!",
    "exp": "Während der echte Pfifferling feste Leisten hat, besitzt der Falsche Pfifferling dünne, biegsame Blättchen. Bei empfindlichen Personen kann er spürbare Magen-Darm-Verstimmungen auslösen!"
  },
  {
    "id": 23,
    "cat": "doppelgaenger",
    "habitat": "📍 Parkanlagen, Gärten, Gebüsche & Waldränder in Aachen (Lousberg, Westpark)",
    "season": "Juni–Oktober",
    "img": "./img/pilz-23.jpg",
    "nameQ": "Welcher giftige Doppelgänger der Wiesenchampignons läuft an der Stielknolle chromgelb an und verströmt beim Erhitzen einen Geruch nach Teer und Tinte?",
    "nameOpts": [
      "Karbol-Champignon (Agaricus xanthodermus)",
      "Wiesen-Champignon (Agaricus campestris)",
      "Anis-Champignon (Agaricus arvensis)",
      "Grüner Knollenblätterpilz (Amanita phalloides)"
    ],
    "toxClass": "toxic",
    "toxBadge": "🔴 Giftig! (Magen-Darm-Gift / Phenol)",
    "toxOpts": [
      "🔴 Giftig! Verursacht heftiges Erbrechen, Bauchkrämpfe und Schwindel (beim Erhitzen strömt stechender Karbol-/Tintengeruch aus der Pfanne)",
      "🟢 Vorzüglicher Speisepilz auf allen Aachener Wiesen",
      "☠️ Tödlich giftig durch leberzerstörende Amatoxine",
      "🟡 Nach dem Abziehen der Huthaut essbar"
    ],
    "details": {
      "title": "Karbol-Champignon (Gift-Egerling)",
      "latin": "Agaricus xanthodermus",
      "features": "Weißer, jung oft trapezförmig abgeflachter Hut; Lamellen rosa bis schokobraun; im Längsschnitt durch die Stielbasis sofort kräftig chromgelb anlaufend (siehe Foto!); Geruch nach Tinte/Phenol/Krankenhaus.",
      "lookalike": "Essbare Champignons: Wiesenchampignon (gilbt nicht, riecht angenehm pilzig) und Anis-Champignon (gilbt nur schwach außen am Hut, aber NICHT chromgelb in der Stielbasis, und duftet herrlich nach Anis/Marzipan!).",
      "trivia": "Reibt man an der Stielbasis, verfärbt sich das Fleisch blitzschnell tintengelb. Sobald er in der heißen Pfanne brutzelt, stinkt die Küche unerträglich nach giftigem Phenol und Krankenhaus!"
    },
    "credit": {
      "artist": "Velella",
      "license": "CC BY-SA 3.0",
      "commons": "File:Agaricus xanthodermus section.jpg"
    },
    "q": "Welcher giftige Doppelgänger der Wiesenchampignons läuft an der Stielknolle chromgelb an und verströmt beim Erhitzen einen Geruch nach Teer und Tinte?",
    "a": [
      "Karbol-Champignon (Agaricus xanthodermus)",
      "Wiesen-Champignon (Agaricus campestris)",
      "Anis-Champignon (Agaricus arvensis)",
      "Grüner Knollenblätterpilz (Amanita phalloides)"
    ],
    "explanation": "Reibt man an der Stielbasis, verfärbt sich das Fleisch blitzschnell tintengelb. Sobald er in der heißen Pfanne brutzelt, stinkt die Küche unerträglich nach giftigem Phenol und Krankenhaus!",
    "exp": "Reibt man an der Stielbasis, verfärbt sich das Fleisch blitzschnell tintengelb. Sobald er in der heißen Pfanne brutzelt, stinkt die Küche unerträglich nach giftigem Phenol und Krankenhaus!"
  },
  {
    "id": 24,
    "cat": "doppelgaenger",
    "habitat": "📍 Aachener Wald & Eifel · Ganzjährig in großen Büscheln an Laub- und Nadelholzstümpfen",
    "season": "April–Dezember",
    "img": "./img/pilz-24.jpg",
    "nameQ": "Welcher an Baumstümpfen büschelig wachsende Schwefelkopf zeichnet sich durch schwefelgelbe Hüte mit olivgrünem Lamellenschleier und brennend bitteren Geschmack aus?",
    "nameOpts": [
      "Grünblättriger Schwefelkopf (Hypholoma fasciculare)",
      "Rauchblättriger Schwefelkopf (Hypholoma capnoides)",
      "Stockschwämmchen (Kuehneromyces mutabilis)",
      "Gemeiner Samtfußrübling (Flammulina velutipes)"
    ],
    "toxClass": "toxic",
    "toxBadge": "🔴 Giftig & gallenbitter! (Fasciculare-Vergiftung)",
    "toxOpts": [
      "🔴 Giftig und extrem bitter! Verursacht heftiges Erbrechen, Durchfall und Sehstörungen",
      "🟢 Beliebter, milder Suppenpilz",
      "🟡 Nach dem Abkochen essbar",
      "☠️ Tödlich giftig durch Orellanin"
    ],
    "details": {
      "title": "Grünblättriger Schwefelkopf",
      "latin": "Hypholoma fasciculare",
      "features": "Wächst dicht büschelig an Totholz; Hut schwefelgelb mit fuchsig-brauner Mitte; Lamellen jung schwefelgelb, bald deutlich olivgrünlich (!) schimmernd; Stiel ohne geschuppten Ring; Geschmack extrem gallenbitter.",
      "lookalike": "Rauchblättriger Schwefelkopf (Hypholoma capnoides, essbar, nur an Nadelholz: hat rauchgraue bis violettgraue Lamellen OHNE jeden Grünton und schmeckt mild) sowie Stockschwämmchen (braun geschuppter Stiel).",
      "trivia": "Seine dichten Büschel an Baumstümpfen verlocken zum Sammeln, doch sein Toxin Fasciculol löst schwere Koliken aus. Die abstoßende Bitterkeit bewahrt Sammler meist vor dem Verschlucken!"
    },
    "credit": {
      "artist": "Jörg Hempel",
      "license": "CC BY-SA 2.0 de",
      "commons": "File:Hypholoma fasciculare LC0091.jpg"
    },
    "q": "Welcher an Baumstümpfen büschelig wachsende Schwefelkopf zeichnet sich durch schwefelgelbe Hüte mit olivgrünem Lamellenschleier und brennend bitteren Geschmack aus?",
    "a": [
      "Grünblättriger Schwefelkopf (Hypholoma fasciculare)",
      "Rauchblättriger Schwefelkopf (Hypholoma capnoides)",
      "Stockschwämmchen (Kuehneromyces mutabilis)",
      "Gemeiner Samtfußrübling (Flammulina velutipes)"
    ],
    "explanation": "Seine dichten Büschel an Baumstümpfen verlocken zum Sammeln, doch sein Toxin Fasciculol löst schwere Koliken aus. Die abstoßende Bitterkeit bewahrt Sammler meist vor dem Verschlucken!",
    "exp": "Seine dichten Büschel an Baumstümpfen verlocken zum Sammeln, doch sein Toxin Fasciculol löst schwere Koliken aus. Die abstoßende Bitterkeit bewahrt Sammler meist vor dem Verschlucken!"
  }
];
  window.ArcadeQuizEngine.registerBank('pilze-aachen', DATA);
})();
