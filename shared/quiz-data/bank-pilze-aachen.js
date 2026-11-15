// Pilz-Sammler-Quiz: Region Aachen & Eifel (24 Arten)
(function () {
const DATA = [
    // ==================== 1. KLASSISCHE SPEISEPILZE (1-6) ====================
    {
      id: 1,
      cat: 'speisepilze',
      habitat: '📍 Aachener Wald (Öcher Bösch), Preuswald & Hürtgenwald · Buchen & Fichten',
      season: 'Juli–November',
      img: './img/pilz-01.jpg',
      nameQ: 'Welcher begehrte Röhrling mit dickbauchigem Stiel und feinem weißem Stielnetz wächst nach warmen Sommerregen unter Buchen und Fichten im Aachener Wald?',
      nameOpts: [
        'Gemeiner Steinpilz (Boletus edulis)',
        'Gallenröhrling / Bitterling (Tylopilus felleus)',
        'Maronen-Röhrling (Imleria badia)',
        'Satans-Röhrling (Rubroboletus satanas)'
      ],
      toxClass: 'edible',
      toxBadge: '🟢 Vorzüglicher Speisepilz (essbar)',
      toxOpts: [
        '🟢 Vorzüglicher Speisepilz – mild-nussig, festfleischig (auch getrocknet ein Klassiker)',
        '🟠 Ungenießbar wegen extremer Galle-Bitterkeit – verdirbt jedes Gericht',
        '🔴 Stark Magen-Darm-giftig – verursacht heftiges Erbrechen',
        '☠️ Tödlich giftig durch hitzestabile Amatoxine (Leberschäden)'
      ],
      details: {
        title: 'Gemeiner Steinpilz',
        latin: 'Boletus edulis',
        features: 'Hut hasel- bis dunkelbraun mit hellem Rand; Röhren jung weiß, später gelbgrünlich; Stiel mit feinem weißem Netz auf hellem Grund; Fleisch bleibt im Anschnitt weiß.',
        lookalike: 'Gallenröhrling (Tylopilus felleus): Hat ein grobes dunkles (!) Stielnetz, schmutzig-rosa werdende Röhren und schmeckt extrem bitter (ungefährlich, aber ungenießbar).',
        trivia: 'Im Aachener Wald („Öcher Bösch“) auf den sauren Sand- und Lehmböden rund um Entenpfuhl, Karlshöhe und Dreiländereck sowie in den Fichten- und Buchenbeständen der Nordeifel ist der Steinpilz ab Spätsommer der begehrteste Fund im Korb.'
      },
      credit: {
        artist: 'Holger Krisp',
        license: 'CC BY 3.0',
        commons: 'File:(Gemeine Steinpilz) Boletus edulis.jpg'
      }
    },
    {
      id: 2,
      cat: 'speisepilze',
      habitat: '📍 Aachener Sand, Vichtbachtal & Hürtgenwald · Saure Nadel- & Mischwälder',
      season: 'August–November',
      img: './img/pilz-02.jpg',
      nameQ: 'Welcher häufige Speisepilz der Eifeler und Aachener Nadelwälder hat einen kastanienbraunen Hut, einen netzlosen längsfaserigen Stiel und blaut auf Fingerdruck an den gelblichen Röhren?',
      nameOpts: [
        'Maronen-Röhrling (Imleria badia)',
        'Gemeiner Steinpilz (Boletus edulis)',
        'Kahler Krempling (Paxillus involutus)',
        'Schönfuß-Röhrling (Caloboletus calopus)'
      ],
      toxClass: 'edible',
      toxBadge: '🟢 Sehr guter Speisepilz (gut durcherhitzen)',
      toxOpts: [
        '🟢 Sehr guter, milder Speisepilz (die Blaufärbung der Röhren ist völlig unbedenklich)',
        '☠️ Tödlich giftig durch das Orellanus-Syndrom (Nierenversagen)',
        '🔴 Stark giftig – enthält Fliegenpilz-Neurotoxine (Ibotensäure)',
        '🟠 Ungenießbar hart und korkig wie ein Baumpilz'
      ],
      details: {
        title: 'Maronen-Röhrling (Braunkappe)',
        latin: 'Imleria badia (Syn. Boletus badius)',
        features: 'Kastanienbrauner Hut (bei Nässe leicht schmierig); blassgelbe Röhren, die auf Druck sofort blaugrün anlaufen; Stiel bräunlich überfasert OHNE Netz.',
        lookalike: 'Gallenröhrling (blaut nicht, hat dunkles Stielnetz & rosa Röhren) sowie Rotfußröhrlinge (ebenfalls essbar, aber weichfleischiger).',
        trivia: 'Auf den sauren Böden des Aachener Waldes und im Hürtgenwald oft noch bis in den späten Oktober und November hinein der häufigste Röhrling. Das Blauen der Röhren verschwindet beim Braten in der Pfanne.'
      },
      credit: {
        artist: 'Jean-Pol GRANDMONT',
        license: 'CC BY 3.0',
        commons: 'File:Boletus badius JPG1.jpg'
      }
    },
    {
      id: 3,
      cat: 'speisepilze',
      habitat: '📍 Aachener Wald & Rureifel · Moosige, saure Buchen- & Fichtenwälder',
      season: 'Juni–Oktober',
      img: './img/pilz-03.jpg',
      nameQ: 'Welcher dottergelbe Speisepilz duftet angenehm fruchtig nach Aprikosen und besitzt an der Hutunterseite gegabelte, dickliche Leisten statt echter Lamellen?',
      nameOpts: [
        'Echter Pfifferling / Eierschwämmchen (Cantharellus cibarius)',
        'Falscher Pfifferling (Hygrophoropsis aurantiaca)',
        'Ölbaumtrichterling (Omphalotus olearius)',
        'Spitzgebuckelter Raukopf (Cortinarius rubellus)'
      ],
      toxClass: 'edible',
      toxBadge: '🟢 Vorzüglicher Speisepilz (essbar)',
      toxOpts: [
        '🟢 Vorzüglicher Speisepilz – pfeffrig-würzig und nahezu nie madig',
        '☠️ Tödlich giftig – zerstört Leber und Nieren bereits in kleinster Menge',
        '🔴 Stark halluzinogen und nervengiftig',
        '🟠 Extrem bitter – ein Exemplar macht das Essen ungenießbar'
      ],
      details: {
        title: 'Echter Pfifferling (Eierschwämmchen)',
        latin: 'Cantharellus cibarius',
        features: 'Dottergelb; Hutunterseite mit aderig verbundenen, gegabelten Leisten, die weit am Stiel herablaufen (nicht wie dünne Blätter vom Hutfleisch ablösbar); Fleisch innen weißlich, Geruch nach Aprikose.',
        lookalike: 'Falscher Pfifferling (Hygrophoropsis aurantiaca, ungenießbar/leicht Magen-Darm-giftig): Hat dünne, dicht stehende, tieforange echte Lamellen und weiches, schlaffes Fleisch ohne Aprikosengeruch.',
        trivia: 'Im Raum Aachen und in der Rureifel findet man Pfifferlinge vor allem an moosigen Hängen unter Buchen und Fichten. Wichtigstes Bestimmungsmerkmal sind immer die gegabelten Leisten im Übergang zum Stiel!'
      },
      credit: {
        artist: 'Wikimedia Commons',
        license: 'CC BY-SA 3.0',
        commons: 'File:Chanterelle Cantharellus cibarius.jpg'
      }
    },
    {
      id: 4,
      cat: 'speisepilze',
      habitat: '📍 Waldränder um Kornelimünster, Raeren, Lousberg & Eifel-Wiesen',
      season: 'Juli–November',
      img: './img/pilz-04.jpg',
      nameQ: 'Welcher bis zu 30 cm hohe Großpilz an Aachener Waldrändern hat einen geschuppten Schirmhut, einen frei verschiebbaren doppelten Ring und einen charakteristisch „genatterten“ Stiel?',
      nameOpts: [
        'Parasol / Gemeiner Riesenschirmling (Macrolepiota procera)',
        'Pantherpilz (Amanita pantherina)',
        'Gift-Riesenschirmling / Garten-Safranschirmling (Chlorophyllum brunneum)',
        'Grüner Knollenblätterpilz (Amanita phalloides)'
      ],
      toxClass: 'edible',
      toxBadge: '🟢 Sehr guter Speisepilz (Hut gebraten)',
      toxOpts: [
        '🟢 Sehr guter Speisepilz – der große Hut schmeckt paniert wie ein Schnitzel',
        '☠️ Tödlich giftig – enthält Amatoxine wie der Knollenblätterpilz',
        '🔴 Schwer giftig – löst das lebensbedrohliche Pantherina-Syndrom aus',
        '🟠 Völlig ungenießbar durch brennend scharfen Milchsaft'
      ],
      details: {
        title: 'Parasol (Gemeiner Riesenschirmling)',
        latin: 'Macrolepiota procera',
        features: 'Jung trommelschlegelförmig, später riesiger Schirm mit dunklem Buckel; Stiel braun genattert (wie Schlangenhaut!); großer, am Stiel frei verschiebbarer Laufring; Stielbasis knollig OHNE Scheide; Fleisch rötet nicht.',
        lookalike: 'Gift-Riesenschirmling (Chlorophyllum brunneum, auf Kompost/Gärten: Stiel glatt/ungenattert, Fleisch rötet!) sowie tödliche Schirmlinge (Lepiota-Arten, die jedoch deutlich kleiner unter 10 cm Hutdurchmesser bleiben).',
        trivia: 'Goldene Sammler-Regel für Schirmlinge im Raum Aachen: Nur große Exemplare mit eindeutig genattertem Stiel UND frei verschiebbarem Ring sammeln!'
      },
      credit: {
        artist: 'Chrumps',
        license: 'CC BY-SA 4.0',
        commons: 'File:Macrolepiota-procera.jpg'
      }
    },
    {
      id: 5,
      cat: 'speisepilze',
      habitat: '📍 Aachener Wald (Preuswald / Dreiländereck) & Hürtgenwald · Am Fuß alter Kiefern',
      season: 'August–November',
      img: './img/pilz-05.jpg',
      nameQ: 'Welcher badeschwamm- oder blumenkohlartige Großpilz wächst direkt am Stammfuß alter Kiefern im Preuswald und Hürtgenwald und duftet würzig-harzig?',
      nameOpts: [
        'Krause Glucke / Fette Henne (Sparassis crispa)',
        'Gelbe Koralle / Bauchwehkoralle (Ramaria formosa)',
        'Schwefelporling (Laetiporus sulphureus)',
        'Eichen-Leberreischling (Fistulina hepatica)'
      ],
      toxClass: 'edible',
      toxBadge: '🟢 Guter, würziger Speisepilz (essbar)',
      toxOpts: [
        '🟢 Guter, nussig-würziger Speisepilz – fast unverwechselbar am Fuß von Kiefern',
        '☠️ Tödlich giftig – zerstört die Nieren innerhalb weniger Tage',
        '🔴 Stark giftig – führt zu schweren Kreislaufzusammenbrüchen',
        '🟠 Extrem scharf und brennend auf der Zunge'
      ],
      details: {
        title: 'Krause Glucke (Fette Henne)',
        latin: 'Sparassis crispa',
        features: 'Bis 30 cm großer, kugelig-gehirnartiger Fruchtkörper aus hunderten bandförmig abgeflachten, krausen Ästchen; creme- bis ockergelb; wächst am Fuß von Kiefern.',
        lookalike: 'Breitblättrige Glucke (Sparassis brevipes, an Eichen/Tannen, gröbere Bänder, ebenfalls essbar). Giftige Korallenpilze (Ramaria) haben drehrunde, fingerartig aufstrebende Äste mit stumpfen Spitzen statt gewellter Bänder.',
        trivia: 'Eine einzige Krause Glucke aus den Kiefernbeständen am Dreiländereck füllt oft schon die ganze Bratpfanne. Zum Putzen schneidet man sie am besten in Scheiben und spült Tannennadeln und Walderde unter fließendem Wasser aus.'
      },
      credit: {
        artist: 'Dominicus Johannes Bergsma',
        license: 'CC0',
        commons: 'File:Grote sponszwam (Sparassis crispa). 09-11-2023. (d.j.b).jpg'
      }
    },
    {
      id: 6,
      cat: 'speisepilze',
      habitat: '📍 Wiesen, Waldränder & Parkwege in Aachen (Lousberg, Soers, Seffent)',
      season: 'Mai–November',
      img: './img/pilz-06.jpg',
      nameQ: 'Welcher walzenförmige, weiß geschuppte Wiesen- und Wegesrandpilz ist nur ganz jung bei reinweißen Lamellen essbar, bevor er sich von unten her zu schwarzer „Tinte“ auflöst?',
      nameOpts: [
        'Schopftintling / Spargelpilz (Coprinus comatus)',
        'Faltentintling / Grauer Tintling (Coprinopsis atramentaria)',
        'Spitzkegeliger Knollenblätterpilz (Amanita virosa)',
        'Fransiger Wulstling (Amanita strobiliformis)'
      ],
      toxClass: 'edible',
      toxBadge: '🟢 Jung vorzüglicher Speisepilz (nur reinweiß!)',
      toxOpts: [
        '🟢 Jung (solange Lamellen reinweiß sind) sehr guter Speisepilz – muss am Sammeltag frisch zubereitet werden',
        '☠️ Tödlich giftig – verursacht schweres Leberversagen',
        '🔴 Stark giftig – enthält Muskarin und führt zu Schweißausbrüchen',
        '🟠 Ungenießbar hart und holzig'
      ],
      details: {
        title: 'Schopftintling (Spargelpilz)',
        latin: 'Coprinus comatus',
        features: 'Walzen- bis glockenförmiger weißer Hut mit abstehenden, bräunlichen Fransenschuppen; Lamellen jung reinweiß, dann rosa, schließlich schwarz zerfließend (Autolyse); Stiel hohl mit schmalem Ring, OHNE Scheide an der Basis.',
        lookalike: 'Faltentintling (Coprinopsis atramentaria): Grau-braun, fast glatter/gefalteter Hut ohne weiße Fransenschuppen – enthält Coprin und ist in Verbindung mit Alkohol (auch Tage später!) stark giftig (Antabus-Syndrom).',
        trivia: 'Rund um Aachen wächst der Schopftintling oft truppweise auf geschotterten Waldwegen und gedüngten Wiesen. Da er nach dem Pflücken binnen weniger Stunden weitertintet, gehört er direkt vom Spaziergang in die Pfanne!'
      },
      credit: {
        artist: 'A. Uciechowska',
        license: 'CC BY-SA 3.0',
        commons: 'File:Coprinus comatus.jpg'
      }
    },

    // ==================== 2. ROH GIFTIG / NUR ERHITZT ESSBAR & BESONDERE WALDPILZE (7-12) ====================
    {
      id: 7,
      cat: 'erhitzen_spezial',
      habitat: '📍 Aachener Wald & Eifel · Sehr häufig unter Buchen & Fichten auf saurem Boden',
      season: 'Mai–November',
      img: './img/pilz-07.jpg',
      nameQ: 'Welcher Röhrling mit dunkelbraunem Samthut, orangeroten Röhrenmündungen und feinen roten Flöckchen am Stiel (kein Netz!) blaut im Schnitt sofort tief dunkelblau?',
      nameOpts: [
        'Flockenstieliger Hexen-Röhrling / „Flocki“ (Neoboletus erythropus)',
        'Satans-Röhrling (Rubroboletus satanas)',
        'Netzstieliger Hexen-Röhrling (Suillellus luridus)',
        'Schönfuß-Röhrling (Caloboletus calopus)'
      ],
      toxClass: 'cooked',
      toxBadge: '🟡 Roh giftig · Gut durcherhitzt vorzüglich!',
      toxOpts: [
        '🟡 Roh stark Magen-Darm-giftig, aber gut durcherhitzt (mind. 15 Min.) ein vorzüglicher, festfleischiger Speisepilz!',
        '☠️ Auch gekocht tödlich giftig – niemals verzehren!',
        '🟢 Sogar roh im Salat bedenkenlos essbar',
        '🟠 Wegen extremer Bitterkeit komplett ungenießbar'
      ],
      details: {
        title: 'Flockenstieliger Hexen-Röhrling („Flocki“)',
        latin: 'Neoboletus erythropus (Syn. Boletus luridiformis)',
        features: 'Dunkelbrauner, samtiger Hut; karmin- bis orangerote Poren; gelber Stiel dicht mit feinen roten Flöckchen besetzt (KEIN Stielnetz!); gelbes Fleisch läuft im Anschnitt blitzschnell schwarzblau an.',
        lookalike: 'Satans-Röhrling (Rubroboletus satanas, stark giftig!): Hat einen kreideweißen bis silbergrauen Hut, ein deutliches Stielnetz und wächst nur auf Kalkboden (z. B. Raum Stolberg/Kalkeifel). Netzstieliger Hexen-Röhrling hat ein dunkles Stielnetz.',
        trivia: 'Im sauren Aachener Wald ist der „Flocki“ oft schon ab Mai zu finden und fast nie madig. Wichtig: Niemals roh probieren und immer mindestens 15 Minuten gründlich durchgaren!'
      },
      credit: {
        artist: 'Wikimedia Commons',
        license: 'CC BY-SA 3.0',
        commons: 'File:Boletus erythropus 01.jpg'
      }
    },
    {
      id: 8,
      cat: 'erhitzen_spezial',
      habitat: '📍 Aachener Wald & Hürtgenwald · Sehr häufig in Laub- und Nadelwäldern',
      season: 'Juni–November',
      img: './img/pilz-08.jpg',
      nameQ: 'Welcher Wulstling im Aachener Wald verrät sich durch weinrot anlaufende Fraßstellen/Stielbasis sowie eine deutlich geriefte („gekämmte“) Manschette am Stiel?',
      nameOpts: [
        'Perlpilz / Rötender Wulstling (Amanita rubescens)',
        'Pantherpilz (Amanita pantherina)',
        'Grauer Wulstling (Amanita excelsa)',
        'Fliegenpilz (Amanita muscaria)'
      ],
      toxClass: 'cooked',
      toxBadge: '🟡 Roh giftig (Hämolysine) · Nur gut erhitzt essbar!',
      toxOpts: [
        '🟡 Roh giftig (blutauflösende Hämolysine), nur gut durcherhitzt essbar – wegen Verwechslungsgefahr mit dem Pantherpilz nur für erfahrene Sammler!',
        '🟢 Roh wie gekocht völlig harmlos für Anfänger',
        '☠️ Auch gekocht tödlich giftig durch Amatoxine',
        '🟠 Ungenießbar zäh und holzig'
      ],
      details: {
        title: 'Perlpilz (Rötender Wulstling)',
        latin: 'Amanita rubescens',
        features: 'Rötlich-brauner Hut mit grauen bis rötlichen Hüllflocken; Manschette oberseits deutlich gerieft (wie ein Zahnrad/Kamm); Fleisch und Madengänge in der Stielbasis laufen weinrot bis fleischrosa an; Rübenknolle ohne „Bergsteigersöckchen“.',
        lookalike: 'Pantherpilz (Amanita pantherina, schwer giftig!): Reinweiße Flocken auf braunem Hut, rötet NIEMALS, Manschette meist glatt/ungerieft, Knolle mit scharf abgesetztem Ringwulst („Bergsteigersöckchen“).',
        trivia: 'Einer der häufigsten Waldpilze im Öcher Bösch! Wer Perlpilze sammelt, muss die beiden Pflichtmerkmale – Rötung an Verletzungen/Madengängen UND geriefte Manschette – an jedem einzelnen Exemplar kontrollieren.'
      },
      credit: {
        artist: 'Archenzo',
        license: 'CC BY-SA 3.0',
        commons: 'File:Amanita rubescens.JPG'
      }
    },
    {
      id: 9,
      cat: 'erhitzen_spezial',
      habitat: '📍 Aachener Wald & Eifel · Büschelig an Laubholzstümpfen (Buche, Eiche, Birke)',
      season: 'April–November',
      img: './img/pilz-09.jpg',
      nameQ: 'Welcher aromatische Holzbewohner hat einen zweifarbigen (hygrophanen) Hut und unterhalb des Stielrings kleine abstehende braune Schüppchen – besitzt aber einen tödlichen Doppelgänger?',
      nameOpts: [
        'Stockschwämmchen (Kuehneromyces mutabilis)',
        'Gifthäubling / Nadelholz-Häubling (Galerina marginata)',
        'Grünblättriger Schwefelkopf (Hypholoma fasciculare)',
        'Honiggelber Hallimasch (Armillaria mellea)'
      ],
      toxClass: 'edible',
      toxBadge: '🟢 Essbar (Suppenpilz) · ⚠️ Tödlicher Doppelgänger!',
      toxOpts: [
        '🟢 Guter Speise- und Suppenpilz (gut erhitzt), ABER nur für absolute Profis wegen des tödlich giftigen Gifthäublings am selben Baumstumpf!',
        '☠️ Selbst tödlich giftig durch Amatoxine',
        '🔴 Stark Magen-Darm-giftig und gallenbitter',
        '🟠 Ungenießbar hart wie Zunderschwamm'
      ],
      details: {
        title: 'Stockschwämmchen',
        latin: 'Kuehneromyces mutabilis',
        features: 'Hut feucht zimtbraun, trocknet von der Mitte her ockergelb aus (zweifarbig!); unterhalb des häutigen Rings ist der Stiel mit deutlichen, abstehenden braunen Schüppchen besetzt; Geruch angenehm würzig nach frischem Holz.',
        lookalike: '☠️ TÖDLICHE GEFAHR: Gifthäubling (Galerina marginata)! Kann am selben Baumstumpf mitten zwischen Stockschwämmchen wachsen! Unterscheidung: Der Gifthäubling hat einen silbrig-weiß längsüberfaserten Stiel OHNE braune Schüppchen und riecht muffig-mehlig.',
        trivia: 'Im feuchten Buchenbestand des Aachener Waldes sehr häufig. Wegen des Gifthäublings muss bei Stockschwämmchen wirklich jeder einzelne Stiel mit der Lupe auf die braunen Schüppchen geprüft werden – Einsteiger lassen ihn besser stehen!'
      },
      credit: {
        artist: 'George Chernilevsky',
        license: 'CC BY 4.0',
        commons: 'File:Kuehneromyces mutabilis 2026 G4.jpg'
      }
    },
    {
      id: 10,
      cat: 'erhitzen_spezial',
      habitat: '📍 Aachener Wald · Massenhaft im Buchenlaub auf sauren bis neutralen Böden',
      season: 'August–November',
      img: './img/pilz-10.jpg',
      nameQ: 'Welcher kleine, komplett leuchtend-violette Pilz mit dicklichen, entfernt stehenden Lamellen wächst im Herbst zu Hunderten im braunen Buchenlaub des Aachener Waldes?',
      nameOpts: [
        'Violetter Lacktrichterling (Laccaria amethystina)',
        'Rettich-Helmling (Mycena pura)',
        'Violetter Rötelritterling (Lepista nuda)',
        'Bocks-Dickfuß (Cortinarius camphoratus)'
      ],
      toxClass: 'edible',
      toxBadge: '🟢 Essbar als Mischpilz (in kleinen Mengen)',
      toxOpts: [
        '🟢 Essbar als hübscher Farbtupfer im Mischpilzgericht (nur in kleinen Mengen, da er Arsen aus dem Waldboden anreichern kann)',
        '☠️ Tödlich giftig – schon ein einzelner Hut führt zu Leberversagen',
        '🔴 Stark giftig mit Muskarin-Schock',
        '🟠 Extrem scharf und brennend'
      ],
      details: {
        title: 'Violetter Lacktrichterling',
        latin: 'Laccaria amethystina',
        features: 'Jung kräftig dunkelviolett (blassgrau ausblassend bei Trockenheit); Lamellen auffallend dick, weit auseinanderstehend und weißlich bestäubt; Stiel zäh und längsfaserig; Geruch unauffällig mild.',
        lookalike: 'Rettich-Helmling (Mycena pura, giftig – enthält Muskarin!): Hat dünne, eng stehende blasslila Lamellen, einen zerbrechlichen hohlen Stiel und riecht beim Zerreiben deutlich nach Rettich!',
        trivia: 'Im Buchenlaub des Öcher Bösch leuchtet der Violette Lacktrichterling wie kleine Amethyste. Da der Pilz natürliches Arsen aus dem Boden speichert, nutzt man nur eine Handvoll Hüte als bunten Farbtupfer im Mischgericht.'
      },
      credit: {
        artist: 'Luridiformis at en.wikipedia',
        license: 'CC BY 3.0',
        commons: 'File:Laccaria amethystina 2.jpg'
      }
    },
    {
      id: 11,
      cat: 'erhitzen_spezial',
      habitat: '📍 Nordeifel, Hürtgenwald & Dreiländereck · Unter Kiefern & Fichten',
      season: 'August–November',
      img: './img/pilz-11.jpg',
      nameQ: 'Welcher Sprödblättler unter Kiefern und Fichten sondert bei Verletzung sofort eine leuchtend karottenrote, mild schmeckende Milch ab und bekommt im Alter grünliche Flecken?',
      nameOpts: [
        'Edel-Reizker / Fichten-Reizker (Lactarius deliciosus / L. deterrimus)',
        'Birken-Reizker / Zottiger Reizker (Lactarius torminosus)',
        'Falscher Pfifferling (Hygrophoropsis aurantiaca)',
        'Rotbrauner Milchling (Lactarius rufus)'
      ],
      toxClass: 'edible',
      toxBadge: '🟢 Guter Speisepilz (Bratpilz)',
      toxOpts: [
        '🟢 Guter Speisepilz (besonders scharf in der Pfanne gebraten) – alle karottenrot milchenden Milchlinge Mitteleuropas sind essbar!',
        '🔴 Stark Magen-Darm-giftig durch seine rote Milch',
        '☠️ Tödlich giftig – zerstört die roten Blutkörperchen',
        '🟠 Komplett ungenießbar wegen stechendem Teergeruch'
      ],
      details: {
        title: 'Edel-Reizker & Fichten-Reizker',
        latin: 'Lactarius deliciosus / Lactarius deterrimus',
        features: 'Orangeroter, gezonte Ringe tragender Hut mit grünen Flecken im Alter; sprödes Fleisch (wie ein Apfel brechend); tritt im Anschnitt sofort karottenrote Milch aus.',
        lookalike: 'Birken-Reizker (Lactarius torminosus, stark Magen-Darm-giftig!): Hat einen stark zottig-bärtigen Hutrand, wächst bei Birken und milcht WEISS (brennend scharf!). Grundregel bei Milchlingen: Karottenrote Milch = essbar; weiße scharfe Milch = Finger weg!',
        trivia: 'In den Fichten- und Kiefernbeständen der Eifel und rund um Roetgen/Lammersdorf häufig zu finden. Kuriosität für Sammler: Nach einer Reizker-Mahlzeit kann sich der Urin durch harmlose Pilzfarbstoffe rötlich färben!'
      },
      credit: {
        artist: 'Wikimedia Commons',
        license: 'CC BY-SA 3.0',
        commons: 'File:Lactarius deliciosus.jpg'
      }
    },
    {
      id: 12,
      cat: 'erhitzen_spezial',
      habitat: '📍 Hohes Venn (Mützenich / Lammersdorf) & Aachener Wald · Immer bei Birken',
      season: 'Juni–Oktober',
      img: './img/pilz-12.jpg',
      nameQ: 'Welcher Röhrling wächst in der Städteregion Aachen und am Rand des Hohen Venns streng gebunden an Birken und trägt auf weißem Stiel raue, schwärzliche Schüppchen?',
      nameOpts: [
        'Gemeiner Birkenpilz (Leccinum scabrum)',
        'Gemeiner Steinpilz (Boletus edulis)',
        'Gallenröhrling (Tylopilus felleus)',
        'Pfefferröhrling (Chalciporus piperatus)'
      ],
      toxClass: 'cooked',
      toxBadge: '🟡 Jung gut durcherhitzt essbar (roh giftig)',
      toxOpts: [
        '🟡 Roh Magen-Darm-giftig, aber jung und mindestens 15 Minuten gut durcherhitzt ein guter Speisepilz',
        '🟢 Auch roh im Salat völlig bekömmlich',
        '☠️ Tödlich giftig – enthält Amatoxine',
        '🟠 Extrem gallenbitter – ungenießbar'
      ],
      details: {
        title: 'Gemeiner Birkenpilz',
        latin: 'Leccinum scabrum',
        features: 'Grau- bis haselbrauner, glatter Hut; weißliche bis graue Röhren; schlanker weißer Stiel mit dunklen, rauen Faserschüppchen (wie eine Birkenrinde!).',
        lookalike: 'Gallenröhrling (hat ein Stielnetz statt rauer Schüppchen und bittere rosa Röhren) sowie Rotkappen (Leccinum-Arten mit orangem Hut, ebenfalls gut erhitzt essbar).',
        trivia: 'An den Moorbirken rund um Mützenich, Roetgen und das Hohe Venn sowie an sonnigen Birkenrändern im Aachener Wald sehr verbreitet. Da ältere Hüte schnell schwammig-weich werden, sammelt man nur junge, feste Exemplare und gart sie gründlich durch.'
      },
      credit: {
        artist: 'cheloVechek / talk',
        license: 'CC BY-SA 4.0',
        commons: 'File:Bolet rude.jpg'
      }
    },

    // ==================== 3. TÖDLICH & SCHWER GIFTIGE PILZE (13-18) ====================
    {
      id: 13,
      cat: 'toedlich',
      habitat: '📍 Aachener Wald & Vorland · Unter Eichen und Buchen (Mykorrhiza)',
      season: 'Juli–Oktober',
      img: './img/pilz-13.jpg',
      nameQ: 'Welcher gefährlichste Giftpilz Mitteleuropas (unter Eichen & Buchen im Aachener Raum) hat einen olivgrünen bis gelbgrünen Hut, dauerhaft weiße Lamellen, einen Stielring und eine sackartige weiße Scheide (Volva) an der Knolle?',
      nameOpts: [
        'Grüner Knollenblätterpilz (Amanita phalloides)',
        'Grüngefelderter Täubling (Russula virescens)',
        'Wiesenchampignon (Agaricus campestris)',
        'Gelber Knollenblätterpilz (Amanita citrina)'
      ],
      toxClass: 'deadly',
      toxBadge: '☠️ TÖDLICH GIFTIG! (Amatoxine)',
      toxOpts: [
        '☠️ TÖDLICH GIFTIG! Verantwortlich für rund 90 % aller tödlichen Pilzvergiftungen (hitzestabile Amatoxine zerstören die Leber)',
        '🟡 Roh giftig, aber nach 20 Minuten Abkochen essbar',
        '🟠 Nur leicht Magen-Darm-reizend, klingt nach 2 Stunden ab',
        '🟢 Essbarer Speisepilz mit mildem Geschmack'
      ],
      details: {
        title: 'Grüner Knollenblätterpilz',
        latin: 'Amanita phalloides',
        features: 'Olivgrünlicher bis gelblich-weißer, radial eingewachsen faseriger Hut (oft ohne Flocken!); Lamellen IMMER weiß; hängende Manschette am Stiel; Knolle an der Basis in einer lappig-sackartigen weißen Scheide (Volva) steckend; riecht jung süßlich nach Kunsthonig.',
        lookalike: 'Wird von unerfahrenen Sammlern mit grünen Täublingen (haben KEINEN Ring, KEINE Knolle und spröde Lamellen), jungen Champignons (haben rosa bis schokobraune Lamellen und KEINE Scheide an der Basis) oder Grünlingen verwechselt.',
        trivia: 'Schon ein einziger Fruchtkörper (ca. 30–50 g Frischpilz) kann für einen Erwachsenen tödlich sein! Tückisch ist die lange Latenzzeit von 6 bis 24 Stunden, gefolgt von einer scheinbaren Besserung, während die Amatoxine die Leber zerstören. Auch Kochen, Braten oder Trocknen zerstört das Gift NICHT!'
      },
      credit: {
        artist: 'Archenzo',
        license: 'CC BY-SA 3.0',
        commons: 'File:Amanita phalloides 1.JPG'
      }
    },
    {
      id: 14,
      cat: 'toedlich',
      habitat: '📍 Aachener Wald & Eifel · An Nadel- und Laubholzstümpfen (oft neben Stockschwämmchen!)',
      season: 'August–November',
      img: './img/pilz-14.jpg',
      nameQ: 'Welcher unscheinbare braune Holzbewohner ist der lebensgefährliche Doppelgänger des Stockschwämmchens und verrät sich durch seinen silbrig-weiß überfaserten Stiel (ohne braune Schüppchen!) und muffig-mehligen Geruch?',
      nameOpts: [
        'Gifthäubling / Nadelholz-Häubling (Galerina marginata)',
        'Stockschwämmchen (Kuehneromyces mutabilis)',
        'Samtfußrübling (Flammulina velutipes)',
        'Rauchblättriger Schwefelkopf (Hypholoma capnoides)'
      ],
      toxClass: 'deadly',
      toxBadge: '☠️ TÖDLICH GIFTIG! (Amatoxine)',
      toxOpts: [
        '☠️ TÖDLICH GIFTIG! Enthält dieselben leberzerstörenden Amatoxine wie der Grüne Knollenblätterpilz!',
        '🟠 Nur bitter, aber völlig ungiftig',
        '🟡 Nach dem Braten ein guter Suppenpilz',
        '🟢 Essbarer Winterpilz'
      ],
      details: {
        title: 'Gifthäubling (Nadelholz-Häubling)',
        latin: 'Galerina marginata',
        features: 'Honig- bis ockerbrauner, feucht durchscheinend geriefter Hut; flüchtiger Ring am Stiel; Stiel unterhalb des Rings silbrig-weiß längsfaserig bereift (KEINE abstehenden braunen Schüppchen!); Geruch deutlich mehlig-ranzig.',
        lookalike: 'Stockschwämmchen (Kuehneromyces mutabilis, essbar): Hat unterhalb des Rings deutliche braune Schüppchen und riecht aromatisch-würzig nach Holz. Beide Arten können direkt nebeneinander auf demselben Baumstumpf im Aachener Wald wachsen!',
        trivia: 'Trotz seines Namens „Nadelholz-Häubling“ wächst er im Aachener Wald auch regelmäßig auf Rotbuchen-Totholz! Eine Handvoll im Mischgericht reicht für eine tödliche Amatoxin-Vergiftung.'
      },
      credit: {
        artist: 'Wikimedia Commons',
        license: 'CC BY-SA 3.0',
        commons: 'File:Galerina marginata.jpg'
      }
    },
    {
      id: 15,
      cat: 'toedlich',
      habitat: '📍 Hohes Venn, Rureifel & saure Moorfichtenwälder · Feuchte Moosböden',
      season: 'August–Oktober',
      img: './img/pilz-15.jpg',
      nameQ: 'Welcher fuchsrote Schleierling mit spitzem Hutbuckel und gelber Natterung am Stiel wächst in feuchten, sauren Moor- und Fichtenwäldern Richtung Hohes Venn und Eifel?',
      nameOpts: [
        'Spitzgebuckelter Raukopf (Cortinarius rubellus)',
        'Echter Pfifferling (Cantharellus cibarius)',
        'Violetter Lacktrichterling (Laccaria amethystina)',
        'Reifpilz / Zigeuner (Cortinarius caperatus)'
      ],
      toxClass: 'deadly',
      toxBadge: '☠️ TÖDLICH GIFTIG! (Orellanin / Nierengift)',
      toxOpts: [
        '☠️ TÖDLICH GIFTIG! Enthält Orellanin – ein heimtückisches Nierengift, dessen Symptome oft erst 2 bis 14 Tage nach der Mahlzeit auftreten!',
        '🟢 Guter Speisepilz der Moorwälder',
        '🟡 Nach 10 Minuten Abkochen essbar',
        '🟠 Ungenießbar zäh, aber ungiftig'
      ],
      details: {
        title: 'Spitzgebuckelter Raukopf',
        latin: 'Cortinarius rubellus (Syn. Cortinarius speciosissimus)',
        features: 'Zimt- bis fuchsrotbrauner, feinfilziger Hut mit markantem spitzem Buckel; dickliche, weit stehende rostbraune Lamellen; Stiel auf rotbraunem Grund mit gelblichen Gürtelbändern (Natterung).',
        lookalike: 'Wurde schon katastrophal mit Pfifferlingen (haben gegabelte Leisten statt rostbrauner Lamellen!) oder essbaren Milchlingen verwechselt.',
        trivia: 'Das Gift Orellanin (Orellanus-Syndrom) ist besonders heimtückisch: Da die ersten Symptome (Durst, Flankenschmerzen, Nierenversagen) oft erst Tage bis zwei Wochen nach dem Essen einsetzen, bringen Betroffene sie oft gar nicht mehr mit dem Pilzgericht in Verbindung.'
      },
      credit: {
        artist: 'Eric Steinert',
        license: 'CC BY-SA 3.0',
        commons: 'File:Cortinarius rubellus 01.jpg'
      }
    },
    {
      id: 16,
      cat: 'toedlich',
      habitat: '📍 Parks, Friedhöfe & Kalkbuchenwälder um Aachen, Stolberg & Kornelimünster',
      season: 'Mai–Juli (Frühsommer!)',
      img: './img/pilz-16.jpg',
      nameQ: 'Welcher schon ab Mai in Aachener Parks und Kalkbuchenwäldern wachsende Pilz hat einen kegelig-gebuckelten, radial einreißenden Hut, läuft ziegelrot an und enthält extrem viel Muskarin?',
      nameOpts: [
        'Ziegelroter Risspilz (Inosperma erubescens / Inocybe patouillardii)',
        'Maipilz / Georgsritterling (Calocybe gambosa)',
        'Wiesenchampignon (Agaricus campestris)',
        'Perlpilz (Amanita rubescens)'
      ],
      toxClass: 'deadly',
      toxBadge: '☠️ STARK BIS TÖDLICH GIFTIG! (Muskarin)',
      toxOpts: [
        '☠️ STARK BIS TÖDLICH GIFTIG! Enthält das bis zu 20-Fache der Muskarin-Menge eines Fliegenpilzes (Schweißausbrüche, Sehstörungen, Herzstillstand)',
        '🟢 Beliebter Frühlings-Speisepilz auf Parkwiesen',
        '🟡 Roh unverträglich, gebraten mild und essbar',
        '🟠 Nur leicht bitter im Nachgeschmack'
      ],
      details: {
        title: 'Ziegelroter Risspilz',
        latin: 'Inosperma erubescens (Syn. Inocybe erubescens / I. patouillardii)',
        features: 'Jung weißlich-seidig mit kegeligem Buckel, im Alter und bei Druck ziegelrot bisdunkelrot verfärbend; Hutrand reißt im Alter radial tief ein; Sporenpulver schmutzig-braun; riecht unangenehm süßlich-obstig bis spermatisch.',
        lookalike: 'Wird im Mai/Juni gefährlich oft mit dem essbaren Maipilz (Calocybe gambosa: polsterförmig, reißt nicht radial ein, rötet nie, riecht stark nach frischem Mehl/Gurke) oder Champignons verwechselt!',
        trivia: 'Das Muskarin-Syndrom setzt bereits 15 bis 120 Minuten nach dem Essen mit massivem Schweiß- und Speichelfluss, Pupillenverengung und Kreislaufkollaps ein (Gegengift in der Klinik: Atropin).'
      },
      credit: {
        artist: 'Andreas Kunze',
        license: 'CC BY-SA 3.0',
        commons: 'File:2010-04-27 Inocybe erubescens.jpg'
      }
    },
    {
      id: 17,
      cat: 'toedlich',
      habitat: '📍 Aachener Wald & Hohes Venn · Sehr häufig unter Birken, Buchen & Fichten',
      season: 'Juli–November',
      img: './img/pilz-17.jpg',
      nameQ: 'Welcher im Aachener Wald extrem häufige Pilz mit stark eingerolltem, filzigem Hutrand und auf Druck braunfleckenden, herablaufenden Lamellen galt früher als essbar, kann aber eine tödliche Immunhämolyse auslösen?',
      nameOpts: [
        'Kahler Krempling (Paxillus involutus)',
        'Maronen-Röhrling (Imleria badia)',
        'Fichten-Reizker (Lactarius deterrimus)',
        'Samtfußkrempling (Tapinella atrotomentosa)'
      ],
      toxClass: 'deadly',
      toxBadge: '☠️ LEBENSGEFÄHRLICH GIFTIG! (Paxillus-Syndrom)',
      toxOpts: [
        '☠️ LEBENSGEFÄHRLICH GIFTIG! Löst das tückische Paxillus-Syndrom aus (Antikörper-Reaktion, die rote Blutkörperchen zerstört und zu akutem Nierenversagen führt)',
        '🟢 Klassischer Speisepilz für jedes Mischgericht',
        '🟠 Nur etwas säuerlich, aber harmlos',
        '🟡 Nach einmaligem Aufkochen völlig unbedenklich'
      ],
      details: {
        title: 'Kahler Krempling',
        latin: 'Paxillus involutus',
        features: 'Ocker- bis rostbrauner, trichterig vertiefter Hut mit lange stark eingerolltem, filzigem Rand; eng stehende, am Stiel herablaufende Lamellen, die auf Fingerdruck sofort dunkelbraun flecken und sich leicht vom Hutboden schieben lassen.',
        lookalike: 'Wird manchmal mit Reizkern (milchen karottenrot!) oder Trichterlingen verwechselt.',
        trivia: 'Einer der heimtückischsten Pilze überhaupt: Manche Menschen vertragen ihn jahrelang scheinbar problemlos, während sich im Blut unbemerkt spezifische Antikörper bilden – bis eine weitere Mahlzeit schlagartig zur lebensbedrohlichen Auflösung der roten Blutkörperchen (Hämolyse) und Nierenversagen führt!'
      },
      credit: {
        artist: 'Petar Milošević',
        license: 'CC BY-SA 4.0',
        commons: 'File:Navadne podvihanke (Paxillus involutus).jpg'
      }
    },
    {
      id: 18,
      cat: 'toedlich',
      habitat: '📍 Aachener Wald & Eifel · Unter Buchen, Eichen & Nadelbäumen',
      season: 'Juli–Oktober',
      img: './img/pilz-18.jpg',
      nameQ: 'Welcher braune Wulstling trägt reinweiße Tupfen auf dem Hut, rötet NIEMALS im Fleisch, hat meist eine ungeriefte Manschette und unten an der Knolle einen scharf abgesetzten Ringwulst („Bergsteigersöckchen“)?',
      nameOpts: [
        'Pantherpilz (Amanita pantherina)',
        'Perlpilz (Amanita rubescens)',
        'Grauer Wulstling (Amanita excelsa)',
        'Parasol (Macrolepiota procera)'
      ],
      toxClass: 'deadly',
      toxBadge: '🔴/☠️ SCHWER GIFTIG! (Pantherina-Syndrom)',
      toxOpts: [
        '🔴/☠️ SCHWER GIFTIG (teils lebensbedrohlich)! Enthält hochkonzentriert Ibotensäure und Muscimol – führt zu Delirium, Krämpfen und Koma',
        '🟢 Vorzüglicher Speisepilz wie der Perlpilz',
        '🟡 Gut durchgebraten ein milder Bratpilz',
        '🟠 Ungenießbar bitter, aber ungiftig'
      ],
      details: {
        title: 'Pantherpilz',
        latin: 'Amanita pantherina',
        features: 'Reh- bis dunkelbrauner Hut mit gerieftem Rand und reinweißen Flocken; weiße Lamellen; Manschette meist glatt (ungerieft); Knolle mit scharfkantig abgesetztem Wulstrand („Bergsteigersöckchen“); Fleisch bleibt reinweiß (rötet nie!).',
        lookalike: 'Perlpilz (Amanita rubescens, gut erhitzt essbar: rötet an Fraßstellen & Stielbasis, geriefte Manschette) und Grauer Wulstling (Amanita excelsa: graue Flocken, kräftig geriefte Manschette, rübenförmige Knolle ohne Söckchen).',
        trivia: 'Im Raum Aachen wächst der Pantherpilz oft im selben Waldstück wie der Perlpilz. Deshalb gilt: Wer Wulstlinge nicht 100 % sicher an Stielbasis und Manschette unterscheiden kann, lässt sie konsequent stehen!'
      },
      credit: {
        artist: 'George Chernilevsky',
        license: 'Public domain',
        commons: 'File:Amanita pantherina 2013 G1.jpg'
      }
    },

    // ==================== 4. GIFTIGE & UNGENIESSBARE DOPPELGÄNGER (19-24) ====================
    {
      id: 19,
      cat: 'doppelgaenger',
      habitat: '📍 Aachener Wald & Hohes Venn · Unter Birken und Fichten auf saurem Boden',
      season: 'August–November',
      img: './img/pilz-19.jpg',
      nameQ: 'Welcher ikonische Waldpilz mit leuchtend rotem, weiß getupftem Hut wächst im Aachener Wald oft direkt neben dem Steinpilz (gleiche Standortansprüche!) und dient daher als „Steinpilz-Anzeiger“?',
      nameOpts: [
        'Fliegenpilz (Amanita muscaria)',
        'Kaiserling (Amanita caesarea)',
        'Spei-Täubling (Russula emetica)',
        'Ziegelroter Risspilz (Inosperma erubescens)'
      ],
      toxClass: 'toxic',
      toxBadge: '🔴 Giftig! (Ibotensäure & Muscimol)',
      toxOpts: [
        '🔴 Giftig! Enthält die Nervengifte Ibotensäure und Muscimol (Rauschzustände, Schwindel, Krämpfe, Herzrasen)',
        '🟢 Essbarer Glückspilz',
        '🟡 Nach kurzem Anbraten essbar',
        '🟠 Nur scharf, aber ohne Giftwirkung'
      ],
      details: {
        title: 'Fliegenpilz',
        latin: 'Amanita muscaria',
        features: 'Scharlach- bis orangeroter Hut mit weißen, abwischbaren Velumflocken (können nach starkem Regen abgewaschen sein!); weiße Lamellen und weißer Stiel mit hängendem Ring und warzig gegürtelter Knolle.',
        lookalike: 'Nach starkem Regen, wenn die weißen Punkte abgewaschen sind, wurde er schon mit roten Täublingen oder dem (in Nordwesteuropa nicht wild vorkommenden) Kaiserling (hat dottergelbe Lamellen & gelben Stiel!) verwechselt.',
        trivia: 'Für Sammler im Öcher Bösch hat der Fliegenpilz einen großen Nutzen: Er teilt sich das Mykorrhiza-Wurzelnetz von Fichten und Birken und braucht exakt dieselbe Bodenfeuchte wie der Steinpilz – stehen Fliegenpilze da, sind Steinpilze meist nur wenige Meter entfernt!'
      },
      credit: {
        artist: 'Onderwijsgek',
        license: 'CC BY-SA 3.0 nl',
        commons: 'File:Amanita muscaria 3 vliegenzwammen op rij.jpg'
      }
    },
    {
      id: 20,
      cat: 'doppelgaenger',
      habitat: '📍 Kalkgebiete bei Stolberg, Kornelimünster & Kalkeifel · Wärmeliebend unter Buchen',
      season: 'Juli–September',
      img: './img/pilz-20.jpg',
      nameQ: 'Welcher wuchtige Röhrling der Kalkbuchenwälder (Raum Stolberg / Kalkeifel) hat einen kreideweißen bis silbergrauen Hut, blutrote Poren, ein rotes Stielnetz und riecht im Alter unangenehm aasartig?',
      nameOpts: [
        'Satans-Röhrling / Satanspilz (Rubroboletus satanas)',
        'Flockenstieliger Hexen-Röhrling (Neoboletus erythropus)',
        'Schönfuß-Röhrling (Caloboletus calopus)',
        'Sommer-Steinpilz (Boletus reticulatus)'
      ],
      toxClass: 'toxic',
      toxBadge: '🔴 Stark giftig! (Schwere Magen-Darm-Vergiftung)',
      toxOpts: [
        '🔴 Stark giftig (auch gekocht)! Verursacht stundenlanges, schwerstes Erbrechen, blutige Durchfälle und Kreislaufkollaps',
        '🟡 Gut durcherhitzt ein hervorragender Speisepilz wie der Flockenstielige Hexen-Röhrling',
        '🟢 Jung roh und gekocht essbar',
        '🟠 Völlig ungiftig, nur leicht säuerlich'
      ],
      details: {
        title: 'Satans-Röhrling (Satanspilz)',
        latin: 'Rubroboletus satanas (Syn. Boletus satanas)',
        features: 'Polsterförmiger, kalkweißer bis hell silbergrauer Hut (NIEMALS dunkelbraun!); blut- bis orangerote Poren; dickbauchiger gelb-roter Stiel mit rotem Maschennetz; blaut im Schnitt nur schwach himmelblau.',
        lookalike: 'Flockenstieliger Hexen-Röhrling (gut erhitzt essbar!): Hat im Gegensatz zum Satans-Röhrling einen dunkelbraunen Samthut, rote Flöckchen statt Stielnetz, blaut im Schnitt tief schwarzblau und wächst im sauren Aachener Wald.',
        trivia: 'Im sauren Sandboden des Aachener Stadtwaldes fehlt der Satanspilz, doch sobald man auf die Kalkzüge bei Stolberg, Breinig, Walheim oder in die Kalkeifel wechselt, kann man diesem seltenen Giftpilz unter alten Rotbuchen begegnen!'
      },
      credit: {
        artist: 'Archenzo',
        license: 'CC BY-SA 3.0',
        commons: 'File:Boletus satanas.JPG'
      }
    },
    {
      id: 21,
      cat: 'doppelgaenger',
      habitat: '📍 Aachener Wald & Hürtgenwald · Häufig auf saurem Nadelwaldboden',
      season: 'Juni–Oktober',
      img: './img/pilz-21.jpg',
      nameQ: 'Welcher klassische Doppelgänger des Steinpilzes im Aachener Nadelwald verrät sich durch ein grobes dunkles (!) Stielnetz und im Alter schmutzig-rosa werdende Röhren?',
      nameOpts: [
        'Gallenröhrling / Bitterling (Tylopilus felleus)',
        'Gemeiner Steinpilz (Boletus edulis)',
        'Sommer-Steinpilz (Boletus reticulatus)',
        'Maronen-Röhrling (Imleria badia)'
      ],
      toxClass: 'inedible',
      toxBadge: '🟠 Ungenießbar! (Extrem gallenbitter)',
      toxOpts: [
        '🟠 Ungenießbar wegen extremer Galle-Bitterkeit – nicht lebensgefährlich, aber ein einziger Pilz macht das gesamte Pfannengericht ungenießbar!',
        '☠️ Tödlich giftig – zerstört Leber und Nieren',
        '🟢 Hervorragender Speisepilz mit mildem Geschmack',
        '🟡 Nach dem Trocknen verliert sich die Bitterkeit komplett'
      ],
      details: {
        title: 'Gallenröhrling (Bitterling)',
        latin: 'Tylopilus felleus',
        features: 'Polsterförmiger brauner Hut wie beim Steinpilz; Röhren jung weiß, später jedoch schmutzig altrosa (Rosa-Sporenpulver!) und bauchig vorgewölbt; Stiel mit grobem, dunkelbraunem Maschennetz auf hellerem Grund.',
        lookalike: 'Steinpilz (Boletus edulis): Hat ein feines WEISSES Stielnetz, gelbgrün werdende Röhren und schmeckt mild-nussig.',
        trivia: 'Im sauren Fichtenwald des Aachener Waldes und Hürtgenwaldes der häufigste „Korb-Verderber“: Beim Kochen verstärkt sich der bittere Geschmack sogar noch!'
      },
      credit: {
        artist: 'Björn S...',
        license: 'CC BY-SA 2.0',
        commons: 'File:Tylopilus felleus (36878337253) (2).jpg'
      }
    },
    {
      id: 22,
      cat: 'doppelgaenger',
      habitat: '📍 Aachener Wald & Eifel · Auf Nadelstreu und morschem Nadelholz',
      season: 'August–November',
      img: './img/pilz-22.jpg',
      nameQ: 'Welcher leuchtend orangefarbene Doppelgänger des Pfifferlings hat ein weiches, biegsames Fleisch und an der Unterseite dünne, dicht stehende, gabelig verzweigte echte Lamellen statt dicker Leisten?',
      nameOpts: [
        'Falscher Pfifferling (Hygrophoropsis aurantiaca)',
        'Echter Pfifferling (Cantharellus cibarius)',
        'Semmel-Stoppelpilz (Hydnum repandum)',
        'Fichten-Reizker (Lactarius deterrimus)'
      ],
      toxClass: 'inedible',
      toxBadge: '🟠 Ungenießbar bis leicht Magen-Darm-giftig',
      toxOpts: [
        '🟠 Ungenießbar bis leicht Magen-Darm-giftig – geschmacklos-fade und führt in größeren Mengen zu Verdauungsbeschwerden',
        '🟢 Genauso wohlschmeckend und bekömmlich wie der Echte Pfifferling',
        '☠️ Tödlich giftig durch Orellanin',
        '🟡 Getrocknet ein edler Gewürzpilz'
      ],
      details: {
        title: 'Falscher Pfifferling',
        latin: 'Hygrophoropsis aurantiaca',
        features: 'Kräftig tieforange bis orangerot; Hutrand lange eingerollt; dünne, eng stehende, mehrfach gabelig geteilte echte Lamellen (lassen sich vom Hutfleisch ablösen); Fleisch weich-wattig, orangefarben (beim Echten Pfifferling innen weißlich & fest!).',
        lookalike: 'Echter Pfifferling (Cantharellus cibarius): Dottergelb, festfleischig, innen weiß, duftet nach Aprikose und hat dickliche, aderig verbundene Leisten statt dünner Lamellen.',
        trivia: 'Wächst im Spätherbst im Aachener Wald oft direkt auf vermodernden Fichtenstümpfen oder in dicker Nadelstreu (der Echte Pfifferling wächst nie auf Holz!).'
      },
      credit: {
        artist: 'Stephan van Helden',
        license: 'CC BY-SA 4.0',
        commons: 'File:Falscher Pfifferling (Hygrophoropsis aurantiaca) nahe der Silberquelle an der Straße vom Silberhaus nach Nagel.jpg'
      }
    },
    {
      id: 23,
      cat: 'doppelgaenger',
      habitat: '📍 Parkanlagen, Gärten, Gebüsche & Waldränder in Aachen (Lousberg, Westpark)',
      season: 'Juni–Oktober',
      img: './img/pilz-23.jpg',
      nameQ: 'Welcher giftige Doppelgänger des Wiesenchampignons läuft beim Anschneiden der unteren Stielknolle sofort leuchtend chromgelb an und riecht unangenehm nach Tinte, Phenol oder Apotheke?',
      nameOpts: [
        'Karbol-Champignon / Gift-Egerling (Agaricus xanthodermus)',
        'Wiesenchampignon (Agaricus campestris)',
        'Anis-Champignon (Agaricus arvensis)',
        'Grüner Knollenblätterpilz (Amanita phalloides)'
      ],
      toxClass: 'toxic',
      toxBadge: '🔴 Giftig! (Magen-Darm-Gift / Phenol)',
      toxOpts: [
        '🔴 Giftig! Verursacht heftiges Erbrechen, Bauchkrämpfe und Schwindel (beim Erhitzen strömt stechender Karbol-/Tintengeruch aus der Pfanne)',
        '🟢 Vorzüglicher Speisepilz auf allen Aachener Wiesen',
        '☠️ Tödlich giftig durch leberzerstörende Amatoxine',
        '🟡 Nach dem Abziehen der Huthaut essbar'
      ],
      details: {
        title: 'Karbol-Champignon (Gift-Egerling)',
        latin: 'Agaricus xanthodermus',
        features: 'Weißer, jung oft trapezförmig abgeflachter Hut; Lamellen rosa bis schokobraun; im Längsschnitt durch die Stielbasis sofort kräftig chromgelb anlaufend (siehe Foto!); Geruch nach Tinte/Phenol/Krankenhaus.',
        lookalike: 'Essbare Champignons: Wiesenchampignon (gilbt nicht, riecht angenehm pilzig) und Anis-Champignon (gilbt nur schwach außen am Hut, aber NICHT chromgelb in der Stielbasis, und duftet herrlich nach Anis/Marzipan!).',
        trivia: 'Verantwortlich für sehr viele Pilzvergiftungen in Gärten und Stadtparks! Bei jedem Champignon ist der Längsschnitt durch die unterste Stielbasis + Geruchsprobe Pflicht.'
      },
      credit: {
        artist: 'Velella',
        license: 'CC BY-SA 3.0',
        commons: 'File:Agaricus xanthodermus section.jpg'
      }
    },
    {
      id: 24,
      cat: 'doppelgaenger',
      habitat: '📍 Aachener Wald & Eifel · Ganzjährig in großen Büscheln an Laub- und Nadelholzstümpfen',
      season: 'April–Dezember',
      img: './img/pilz-24.jpg',
      nameQ: 'Welcher an fast jedem Baumstumpf im Aachener Wald büschelig wachsende Pilz hat einen schwefelgelben Hut mit rötlich-brauner Mitte, schwefelgelbes Fleisch und neongelb-grünlich schimmernde Lamellen?',
      nameOpts: [
        'Grünblättriger Schwefelkopf (Hypholoma fasciculare)',
        'Rauchblättriger Schwefelkopf (Hypholoma capnoides)',
        'Stockschwämmchen (Kuehneromyces mutabilis)',
        'Samtfußrübling (Flammulina velutipes)'
      ],
      toxClass: 'toxic',
      toxBadge: '🔴 Giftig & gallenbitter! (Fasciculare-Vergiftung)',
      toxOpts: [
        '🔴 Giftig und extrem bitter! Verursacht heftiges Erbrechen, Durchfall und Sehstörungen',
        '🟢 Beliebter, milder Suppenpilz',
        '🟡 Nach dem Abkochen essbar',
        '☠️ Tödlich giftig durch Orellanin'
      ],
      details: {
        title: 'Grünblättriger Schwefelkopf',
        latin: 'Hypholoma fasciculare',
        features: 'Wächst dicht büschelig an Totholz; Hut schwefelgelb mit fuchsig-brauner Mitte; Lamellen jung schwefelgelb, bald deutlich olivgrünlich (!) schimmernd; Stiel ohne geschuppten Ring; Geschmack extrem gallenbitter.',
        lookalike: 'Rauchblättriger Schwefelkopf (Hypholoma capnoides, essbar, nur an Nadelholz: hat rauchgraue bis violettgraue Lamellen OHNE jeden Grünton und schmeckt mild) sowie Stockschwämmchen (braun geschuppter Stiel).',
        trivia: 'Der wohl häufigste Holzpilz im gesamten Aachener Wald! Sein grünlicher Schimmer auf den gelben Lamellen ist schon von der Seite gut zu erkennen.'
      },
      credit: {
        artist: 'Jörg Hempel',
        license: 'CC BY-SA 2.0 de',
        commons: 'File:Hypholoma fasciculare LC0091.jpg'
      }
    }
  ];
  window.ArcadeQuizEngine.registerBank('pilze-aachen', DATA);
})();
