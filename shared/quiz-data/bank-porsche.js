// Unified quiz bank for "porsche" (200 questions: 100x Porsche Allgemein + 100x Porsche Taycan)
(function () {
  const DATA = [
    // =========================================================================
    // PORSCHE ALLGEMEIN (100 Fragen: 34 easy · 34 mid · 32 pro)
    // =========================================================================
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'In welchem Stuttgarter Stadtteil befindet sich bis heute der Stammsitz und das Stammwerk der Porsche AG?',
      a: [
        'Zuffenhausen',
        'Bad Cannstatt',
        'Feuerbach',
        'Degerloch'
      ],
      exp: 'Seit dem Umzug von Ferdinand Porsches Konstruktionsbüro im Jahr 1938 ist Stuttgart-Zuffenhausen das Herz der Porsche-Sportwagenfertigung.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welches Fahrzeug gilt offiziell als der allererste Sportwagen unter dem Markennamen Porsche (1948)?',
      a: [
        'Porsche 356 „Nr. 1“ Roadster',
        'Porsche 911 Ur-Modell',
        'Porsche 550 Spyder',
        'Porsche 914'
      ],
      exp: 'Der Mittelmotor-Prototyp 356 „Nr. 1“ Roadster erhielt am 8. Juni 1948 in Kärnten seine Betriebserlaubnis.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'In welchem österreichischen Ort entstand 1948 der erste Porsche 356, bevor das Unternehmen nach Stuttgart zurückkehrte?',
      a: [
        'Gmünd in Kärnten',
        'Zell am See',
        'Graz',
        'Salzburg'
      ],
      exp: 'Gegen Ende des Zweiten Weltkriegs verlegte Porsche Teile des Betriebs nach Gmünd in Kärnten; erst ab 1949/50 kehrte die Produktion nach Zuffenhausen zurück.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Warum musste der Porsche 911 kurz nach seiner IAA-Premiere 1963 von „901“ in „911“ umbenannt werden?',
      a: [
        'Weil Peugeot Namensrechte an dreistelligen Pkw-Zahlen mit einer Null in der Mitte beanspruchte',
        'Weil die Ziffer 901 in Deutschland für Traktoren reserviert war',
        'Weil ein Druckfehler in den Verkaufsprospekten zuerst „911“ nannte',
        'Weil VW den Namen 901 bereits für den Käfer-Nachfolger schützte'
      ],
      exp: 'Peugeot hielt Markenrechte auf dreistellige Typbezeichnungen mit mittlerer Null (z. B. 204, 404). Aus 901 wurde kurzerhand 911 – eine der berühmtesten Ziffern der Autowelt.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Wo ist beim klassischen Porsche 911 traditionell der Motor eingebaut?',
      a: [
        'Im Heck hinter der Hinterachse',
        'Vor der Vorderachse als Frontmotor',
        'Unter der Fronthaube quer eingebaut',
        'Vor der Hinterachse als reiner Mittelmotor wie im Boxster'
      ],
      exp: 'Der Boxer-Sechszylinder hinter der Hinterachse verleiht dem 911 bis heute seine enorme Traktion beim Herausbeschleunigen und sein einzigartiges Fahrverhalten.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welches Wappentier ziert das Zentrum des Porsche-Logos?',
      a: [
        'Ein springendes Pferd (Stuttgarter Rössle)',
        'Ein steigender Löwe',
        'Ein schwarzer Stier',
        'Ein gekrönter Adler'
      ],
      exp: 'Das Stuttgarter Stadtwappen zeigt ein springendes Pferd, eingerahmt von den rot-schwarzen Streifen und Geweihstangen des Landeswappens von Württemberg-Hohenzollern.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welches Porsche-SUV rettete dem Unternehmen ab 2002 wirtschaftlich die Eigenständigkeit und wurde zum Bestseller?',
      a: [
        'Porsche Cayenne',
        'Porsche Macan',
        'Porsche Panamera',
        'Porsche 968'
      ],
      exp: 'Trotz anfänglicher Skepsis vieler Puristen bescherte der Cayenne (Typ 9PA) Porsche Rekordgewinne, die unter anderem die Entwicklung weiterer 911- und GT-Ikonen finanzierten.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'In welchem Landesteil und Ort liegt das berühmte Porsche-Entwicklungszentrum inklusive eigener Teststrecke?',
      a: [
        'Weissach',
        'Böblingen',
        'Ludwigsburg',
        'Heilbronn'
      ],
      exp: 'Das 1971 eingeweihte Entwicklungszentrum Weissach („EZW“) im Landkreis Böblingen gilt als die Hightech-Denkfabrik für Serien- und Rennfahrzeuge von Porsche.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welcher Motortyp mit gegenüberliegenden Zylindern ist das akustische und technische Markenzeichen von 356, 911 und Boxster?',
      a: [
        'Boxermotor',
        'Wankelmotor',
        'Reihenfünfzylinder',
        'Sternmotor'
      ],
      exp: 'Ein Boxermotor baut extrem flach und senkt den Fahrzeugschwerpunkt deutlich – perfekt für agiles Handling.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Wo befindet sich bei fast allen Porsche-Sportwagen historisch bedingt das Zündschloss (bzw. Startknopf links vom Lenkrad)?',
      a: [
        'Links vom Lenkrad',
        'Auf der Mittelkonsole hinter dem Schalthebel',
        'Rechts oben am Dachhimmel',
        'Im Handschuhfach'
      ],
      exp: 'Die Platzierung links erleichterte beim alten „Le-Mans-Start“ das gleichzeitige Anlassen mit der linken Hand, während die rechte Hand schon den ersten Gang einlegte.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welches Porsche-Modell wurde 1996 als preiswerterer zweisitziger Mittelmotor-Roadster eingeführt?',
      a: [
        'Porsche Boxster (986)',
        'Porsche 928',
        'Porsche 959',
        'Porsche Carrera GT'
      ],
      exp: 'Der Boxster (Kunstwort aus „Boxer“ und „Roadster“) brachte frische Stückzahlen und teilte sich viele Vorderwagenteile mit der 911-Generation 996.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Wie heißt das Coupé-Schwestermodell des Porsche Boxster (ab 2005/2006 eingeführt)?',
      a: [
        'Porsche Cayman',
        'Porsche Targa',
        'Porsche Speedster',
        'Porsche Carrera'
      ],
      exp: 'Heute laufen beide gemeinsam in der Baureihe 718: Boxster als offener Roadster und Cayman als geschlossenes Mittelmotor-Coupé.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welches bekannte offene Karosseriekonzept von Porsche trägt einen markanten festen Sicherheitsbügel über den Sitzen?',
      a: [
        'Targa',
        'Spyder',
        'Shooting Brake',
        'Safari'
      ],
      exp: 'Der 1965 vorgestellte 911 Targa – benannt nach dem italienischen Langstreckenrennen Targa Florio – entstand aus Sorge vor möglichen US-Verboten komplett offener Cabrios.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'In welcher ostdeutschen Stadt betreibt Porsche seit 2002 ein großes Werk für Cayenne, Macan und Panamera samt FIA-Rundstrecke?',
      a: [
        'Leipzig',
        'Dresden',
        'Chemnitz',
        'Erfurt'
      ],
      exp: 'Porsche Leipzig fertigt nicht nur große Baureihen, sondern bietet mit einer von Hermann Tilke entworfenen Strecke auch ein bekanntes Erlebnis- und Testzentrum.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Wie heißt die viertürige Sportlimousine von Porsche, die 2009 erstmals auf den Markt kam?',
      a: [
        'Panamera',
        'Taycan',
        'Cayenne',
        'Macan'
      ],
      exp: 'Benannt nach dem mexikanischen Langstreckenrennen „Carrera Panamericana“ verbindet der Panamera Sportwagen-Gene mit Reiseluxus für vier Personen.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welcher Rennwagen holte 1970 den allerersten von insgesamt 19 Gesamtsiegen für Porsche bei den 24 Stunden von Le Mans?',
      a: [
        'Porsche 917 Kurzheck (KH)',
        'Porsche 911 GT1',
        'Porsche 956',
        'Porsche 919 Hybrid'
      ],
      exp: 'Hans Herrmann und Richard Attwood siegten am 14. Juni 1970 im legendären rot-weißen 917 KH von Porsche Salzburg.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Was bedeutet bei Porsche-Sportwagen das Kürzel „PDK“?',
      a: [
        'Porsche Doppelkupplungsgetriebe',
        'Porsche Dynamische Kurvenkontrolle',
        'Permanentes Differential-Konzept',
        'Pneumatische Dämpfer-Kalibrierung'
      ],
      exp: 'Im PDK sind zwei Teilgetriebe auf zwei koaxialen Wellen parallel aktiv: Gangwechsel erfolgen innerhalb von Millisekunden nahezu ohne Zugkraftunterbrechung.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Wofür steht bei einem Porsche 911 das Kürzel „GT3“ traditionell im Hinblick auf den Motor?',
      a: [
        'Für einen drehfreudigen Saugmotor ohne Turbolader (Homologation für den Motorsport)',
        'Für einen reinen Dreizylinder-Hybridantrieb',
        'Für einen besonders schweren Luxus-Gran-Turismo mit Luftfederung',
        'Für das erste vollelektrische 911-Modell'
      ],
      exp: 'Der 911 GT3 ist das straßenzugelassene Pendant zu den GT3-Rennwagen und setzt seit der ersten Generation 1999 auf hochdrehende Sechszylinder-Saugmotoren.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welcher kompakterer SUV unterhalb des Cayenne erschien 2014 und wurde in zweiter Generation 2024 vollelektrisch?',
      a: [
        'Porsche Macan',
        'Porsche Cayenne Coupé',
        'Porsche Cross Turismo',
        'Porsche 924'
      ],
      exp: 'Der Name Macan stammt vom indonesischen Wort für Tiger; ab 2024 rollt der Nachfolger auf der 800-Volt-Plattform PPE rein elektrisch aus Leipzig.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Wie hieß das V8-Coupé mit Transaxle-Bauweise und Klappscheinwerfern, das ab 1977 eigentlich einmal den 911 ablösen sollte?',
      a: [
        'Porsche 928',
        'Porsche 914',
        'Porsche 912',
        'Porsche 959'
      ],
      exp: 'Der 928 wurde sogar zum „Auto des Jahres 1978“ gekürt – doch die weltweite Kundschaft hielt am 911 fest, sodass beide über Jahrzehnte parallel weiterlebten.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welcher Schauspieler verunglückte 1955 tragisch mit seinem silbernen Porsche 550 Spyder („Little Bastard“)?',
      a: [
        'James Dean',
        'Steve McQueen',
        'Paul Newman',
        'Clark Gable'
      ],
      exp: 'James Dean schätzte den leichten Aluminium-Mittelmotorwagen 550 Spyder für Berg- und Rundstreckenrennen in Kalifornien.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Woran erkennt man eine „PCCB“-Bremsanlage bei Porsche meist schon von außen auf den ersten Blick?',
      a: [
        'An den meist gelb lackierten Bremssätteln und den Keramik-Bremsscheiben',
        'An komplett fehlenden Bremssätteln durch reine Wirbelstrombremse',
        'An violett leuchtenden Stahlscheiben',
        'An geschlossenen Trommelbremsen an der Hinterachse'
      ],
      exp: 'Porsche Ceramic Composite Brake (PCCB) nutzt faserverstärkte Siliziumkarbid-Scheiben für extreme Fading-Resistenz und rund 50 % weniger ungefederte Masse.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welches berühmte Rennen stand Pate für den Modell-Zusatznamen „Carrera“ (u. a. beim 911 Carrera und Carrera GT)?',
      a: [
        'Die Carrera Panamericana in Mexiko',
        'Das 24-Stunden-Rennen von Daytona',
        'Der Große Preis von Monaco',
        'Die Rallye Dakar'
      ],
      exp: '„Carrera“ bedeutet auf Spanisch schlicht „Rennen“ – Porsche feierte Anfang der 1950er-Jahre bei der mörderischen Panamericana große Klassensiege.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welche Besonderheit haben alle modernen straßenzugelassenen Porsche-GT-Modelle beim Dachmaterial oder Flügel oft gemeinsam, wenn sie als „RS“ erscheinen?',
      a: [
        '„RS“ steht für „RennSport“ mit noch radikalerem Leichtbau und mehr Abtrieb',
        '„RS“ steht für „Relaxed Suspension“ mit weichster Komfortabstimmung',
        '„RS“ bedeutet ausschließlich Rechtslenker-Ausführung',
        '„RS“ kennzeichnet Nutzfahrzeug-Versionen'
      ],
      exp: 'Vom legendären Carrera RS 2.7 (1972) bis zum heutigen 911 GT3 RS steht das Kürzel RS für maximale Rennstrecken-Performance.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Was war das Besondere am Heckspoiler des historischen Porsche 911 Carrera RS 2.7 von 1972?',
      a: [
        'Der charakteristische „Entenbürzel“ (Ducktail) aus Kunststoff',
        'Ein automatisch ausfahrbarer Schwanenhals-Flügel aus Carbon',
        'Drei übereinander angeordnete Holzflügel',
        'Gar kein Spoiler, dafür ein Bremsfallschirm'
      ],
      exp: 'Der nach oben gezogene „Entenbürzel“ reduzierte den Hinterachsauftrieb bei hohem Tempo massiv, ohne den Luftwiderstand stark zu erhöhen.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Zu welchem Automobilkonzern gehört die Dr. Ing. h.c. F. Porsche AG seit der Integration 2012 (trotz Börsengang 2022 als Mehrheit)?',
      a: [
        'Volkswagen-Konzern (VW AG)',
        'Mercedes-Benz Group',
        'BMW Group',
        'Stellantis'
      ],
      exp: 'Nach der gescheiterten VW-Übernahme durch Porsche im Jahr 2009 wurde Porsche 2012 integriert; beim Börsengang 2022 blieben VW und die Porsche Automobil Holding SE bestimmend.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welches legendäre Modell besaß in den 1970ern als erster Serien-Porsche einen Turbolader und einen riesigen „Walfischflossen“-Heckflügel?',
      a: [
        'Porsche 911 Turbo (Typ 930)',
        'Porsche 912E',
        'Porsche 356 Speedster',
        'Porsche 914/6'
      ],
      exp: '1974 vorgestellt, leistete der Ur-930 aus 3,0 Litern Hubraum 260 PS – mit berüchtigtem plötzlichem Turbo-Einsatz.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welche zwei Buchstaben kennzeichnen bei Porsche-Modellen den Allradantrieb (z. B. 911 Carrera 4)?',
      a: [
        'Die Ziffer „4“ (bzw. Zusatz 4 / 4S / 4 GTS)',
        '„AW“',
        '„X“',
        '„Q“'
      ],
      exp: 'Im Gegensatz zu Audi („quattro“) oder BMW („xDrive“) hängt Porsche traditionell einfach eine „4“ für alle vier angetriebenen Räder an die Typbezeichnung.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'In welchem Jahr wurde das Konstruktionsbüro Porsche von Ferdinand Porsche in Stuttgart gegründet?',
      a: [
        '1931',
        '1948',
        '1955',
        '1919'
      ],
      exp: 'Am 25. April 1931 ließ Ferdinand Porsche die „Dr. Ing. h.c. F. Porsche GmbH, Konstruktionen und Beratung für Motoren und Fahrzeugbau“ ins Handelsregister eintragen.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welcher Supersportwagen von Porsche (2003–2006) gilt dank seines 5,7-Liter-V10-Saugmotors aus einem eingestellten Le-Mans-Projekt bis heute als Klangikone?',
      a: [
        'Porsche Carrera GT',
        'Porsche 918 Spyder',
        'Porsche 959',
        'Porsche 968 Clubsport'
      ],
      exp: 'Der Carrera GT besitzt neben dem frei saugenden 612-PS-V10 (ursprünglich für den nicht gestarteten LMP2000-Renner gedacht) auch ein Kohlefaser-Monocoque und einen Balsa-Schaltknauf.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welcher von Porsche ab 2013 gebaute Plug-in-Hybrid-Supersportwagen gehörte gemeinsam mit McLaren P1 und Ferrari LaFerrari zur „Holy Trinity“?',
      a: [
        'Porsche 918 Spyder',
        'Porsche GT1 Straßenversion',
        'Porsche 959 S',
        'Porsche Panamera Turbo S'
      ],
      exp: 'Der 918 Spyder kombinierte einen 4,6-Liter-V8-Hochdrehzahlsaugmotor mit zwei Elektromotoren zu 887 PS Systemleistung und umrundete als Erster die Nordschleife unter 7 Minuten (6:57 Min).'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Wofür war der Motorsport-Held Walter Röhrl bei Porsche neben seinen Rallye-Erfolgen jahrzehntelang vor allem bekannt?',
      a: [
        'Als Test- und Abstimmungsfahrer für Straßen- und GT-Modelle (u. a. Nürburgring-Nordschleife)',
        'Als Chefdesigner des Cayenne',
        'Als Vorstandsvorsitzender der Porsche AG',
        'Als Erfinder der Tiptronic'
      ],
      exp: 'Seit den 1990ern prägt die Meinung des zweifachen Rallye-Weltmeisters die Feinabstimmung nahezu jedes Hochleistungs-Porsche in Weissach und auf der Nordschleife.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Welche traditionsreiche Farb- und Ausstattungsabteilung erfüllt bei Porsche hochindividuelle Kundenwünsche („Sonderwunsch“)?',
      a: [
        'Porsche Exclusive Manufaktur',
        'Porsche Fleet Direct',
        'Porsche Classic Parts',
        'Porsche Standard Line'
      ],
      exp: 'Von Paint-to-Sample-Wunschlackierungen bis zu maßgeschneiderten Einzelstücken arbeitet in Zuffenhausen die Exclusive Manufaktur.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'easy',
      q: 'Wie viele Gesamtsiege bei den 24 Stunden von Le Mans machen Porsche bis heute zum unangefochtenen Rekordsieger dieses Rennens?',
      a: [
        '19 Gesamtsiege',
        '7 Gesamtsiege',
        '11 Gesamtsiege',
        '25 Gesamtsiege'
      ],
      exp: 'Zwischen 1970 (917) und 2017 (919 Hybrid) holte Porsche insgesamt 19 Gesamtsiege – vor Audi (13) und Ferrari (aktuell 11).'
    },

    // --- PORSCHE ALLGEMEIN: MID (34) ---
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Mit welcher internen Baureihen-Generation vollzog der Porsche 911 im Jahr 1997 den historischen Abschied von der Luftkühlung zur Wasserkühlung?',
      a: [
        'Generation 996',
        'Generation 993',
        'Generation 964',
        'Generation 997'
      ],
      exp: 'Der 993 (1993–1998) war der letzte luftgekühlte 911; mit dem 996 hielten wegen Abgas-, Geräusch- und Leistungsgrenzen wassergekühlte Vierventil-Boxer Einzug.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welche 911-Generation führte 1989 erstmals serienmäßig Servolenkung, ABS sowie beim Carrera 4 Allradantrieb im Serien-911 ein?',
      a: [
        'Generation 964',
        'Generation G-Modell',
        'Generation 993',
        'Generation 991'
      ],
      exp: 'Äußerlich noch nah am G-Modell, waren beim Typ 964 rund 85 % der Teile neu – darunter auch ein erstmals elektrisch ausfahrender Heckspoiler.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welches Antriebslayout beschreibt bei den Modellen 924, 944, 928 und 968 das „Transaxle“-Prinzip?',
      a: [
        'Motor vorn, aber das Getriebe sitzt zur Gewichtsverteilung hinten an der Hinterachse',
        'Zwei unabhängige Schaltgetriebe an Vorder- und Hinterachse',
        'Mittelmotor längs mit Frontantrieb',
        'Kettenantrieb statt Kardanwelle'
      ],
      exp: 'Ein starres Rohr (Transaxle-Welle) verbindet Motor und Hinterachsgetriebe, was für nahezu ausgeglichene 50:50-Achslast sorgt.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welcher Hightech-Supersportwagen von Porsche wurde 1986 ursprünglich für die Rallye-Gruppe-B homologiert und besaß Registeraufladung, Hohlspeichen-Magnesiumfelgen und elektronischen Allrad?',
      a: [
        'Porsche 959',
        'Porsche 911 GT2',
        'Porsche 935 Moby Dick',
        'Porsche 968 Turbo S'
      ],
      exp: 'Vom 959 entstanden nur rund 292–337 Serienfahrzeuge (je nach Zählweise mit Prototypen/S-Modellen). Mit 317 km/h war er damals der schnellste Serienwagen der Welt.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welcher von 1965 bis 1969 gebaute „Einstiegs-Porsche“ nutzte die Karosserie des 911, aber den Vierzylinder-Boxermotor aus dem 356?',
      a: [
        'Porsche 912',
        'Porsche 914/4',
        'Porsche 924 S',
        'Porsche 930'
      ],
      exp: 'Der günstigere 912 war zeitweise beliebter als der teure 911 und gilt heute durch seine leichte Hecklastigkeit als Geheimtipp unter Klassikfans.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Was bezeichnet bei frühen Porsche 911-Modellen (bis Baujahr 1989) den Typ „G-Modell“ am deutlichsten optisch?',
      a: [
        'Die wuchtigen schwarzen Sicherheitsstoßfänger mit seitlichen Faltenbälgen',
        'Die Spiegelei-Scheinwerfer des 996',
        'Ein komplett verkleideter Unterboden aus Titan',
        'Vier Auspuffrohre in der Fahrzeugmitte'
      ],
      exp: 'Aufgrund strenger US-Crashtest-Vorschriften (5-mph-Stoßstangen) erhielt der 911 ab 1973/74 Faltenbalg-Stoßfänger, die die Energie absorbieren konnten.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welcher Vierzylinder-Sechzehnventiler mit 3,0 Litern Hubraum galt im Porsche 944 S2 und 968 damals als einer der hubraumstärksten Reihenvierzylinder-Pkw-Motoren?',
      a: [
        'Der 3,0-Liter-Reihenvierzylinder mit zwei Ausgleichswellen (M44)',
        'Ein 1,6-Liter-Boxer mit Doppelvergaser',
        'Ein 3,0-Liter-V4 aus dem Lkw-Bau',
        'Ein luftgekühlter Zweizylinder'
      ],
      exp: 'Wegen der typischen Vibrationen großer Vierzylinder nutzte Porsche lizenzierte Mitsubishi-Ausgleichswellen, die den 3,0-Liter-Motor überraschend kultiviert machten.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Wie hieß das Werksteam-Projekt von 1970/71, das Porsche zusammen mit Gulf Racing und später als „Pink Pig“ („Sau“) in Le Mans unsterblich machte?',
      a: [
        'Der Porsche 917 (Langheck bzw. 917/20 „Sau“)',
        'Der Porsche 904 GTS',
        'Der Porsche 936',
        'Der Porsche 962C'
      ],
      exp: 'Der bauchige 917/20 von 1971 bekam wegen seiner gedrungenen Aerodynamik eine rosa Lackierung samt aufgemalten Metzger-Schnittmustern.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welche 911-Generation beendete beim Standardmodell im Jahr 2015 (Facelift „991.2“) die Ära der Saugmotoren beim normalen Carrera und stellte auf Biturbo um?',
      a: [
        'Generation 991 (Facelift 991.2)',
        'Generation 997.2',
        'Generation 992.1',
        'Generation 996.2'
      ],
      exp: 'Um Verbrauch und Drehmoment zu optimieren, erhielt der Carrera ab dem 991.2 einen 3,0-Liter-Biturbo; nur GT3 und GT3 RS blieben beim Hochdrehzahlsauger.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welche berühmten Doppel-Sieger-Geschwistertypen sicherten Porsche von 1982 bis 1987 in der Gruppe C eine fast ununterbrochene Le-Mans-Serie?',
      a: [
        'Porsche 956 und 962',
        'Porsche 908 und 910',
        'Porsche RS Spyder und 963',
        'Porsche 934 und 935'
      ],
      exp: 'Der Ground-Effect-Prototyp 956 (und sein für die IMSA angepasster Nachfolger 962) gewann Le Mans sechsmal in Folge (1982–1987) und fuhr bis 1994 Siege ein.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welches kleine Detail unterscheidet optisch den legendären „Carrera GT“-Schaltknauf von fast allen modernen Sportwagen?',
      a: [
        'Er besteht aus geschichtetem Eschen- und Balsaholz (als Hommage an den Porsche 917)',
        'Er ist ein Touchscreen auf der Lenksäule',
        'Er besteht aus massivem Gusseisen ohne Lackierung',
        'Er ist links neben dem Fahrersitz montiert'
      ],
      exp: 'Wie beim 917-Rennwagen von 1969 sparte das leichte Holz Gewicht und übertrug weniger Hitze in die Handfläche – für späte Modelle gab es wahlweise Carbon.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welcher Rennprototyp sicherte Porsche zwischen 2015 und 2017 den Le-Mans-Hattrick sowie drei WEC-Weltmeistertitel in Folge?',
      a: [
        'Porsche 919 Hybrid',
        'Porsche 963',
        'Porsche RS Spyder',
        'Porsche 911 GT1-98'
      ],
      exp: 'Mit einem extrem kompakten 2,0-Liter-V4-Turbobenziner plus doppelter Energierückgewinnung (KERS + Abgasturbinen-Generator) dominierte der 919 die LMP1-Ära.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welches Gemeinschaftsmodell entwickelten VW und Porsche Ende der 1960er als „VW-Porsche“ für den Einstiegsmarkt?',
      a: [
        'Porsche 914',
        'Porsche 924',
        'Porsche 356 C',
        'Porsche 912'
      ],
      exp: 'Der keilförmige Mittelmotor-Targa 914 kam als 914/4 mit VW-Boxermotor und als seltener 914/6 mit dem 2,0-Liter-Sechszylinder aus dem 911 T.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Was besagt beim Porsche-Motor die „Trockensumpfschmierung“ (Dry Sump)?',
      a: [
        'Das Motoröl wird in einem separaten Öltank statt in der flachen Ölwanne gespeichert, um bei hohen Querbeschleunigungen Abrisse der Ölversorgung zu verhindern',
        'Der Motor läuft komplett ohne Schmieröl dank Keramikkolben',
        'Das Öl wird nur beim Kaltstart zugeschaltet',
        'Die Ölwanne wird aktiv mit Wasser gekühlt statt gefiltert'
      ],
      exp: 'Im Rennsport und in GT-Modellen wie dem GT3 verhindert die Trockensumpfschmierung Luftblasen im Ölkreislauf selbst bei extremen Kurven-G-Kräften und erlaubt tiefen Einbau.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welcher Spitzname haftete dem 911 GT2 (z. B. 993 GT2 / 996 GT2 / 997 GT2) wegen extremer Turboleistung kombiniert mit reinem Hinterradantrieb an?',
      a: [
        '„Witwenmacher“ (Widowmaker)',
        '„Schlafwagen“',
        '„Flüster-Coupe“',
        '„Sparbüchse“'
      ],
      exp: 'Anders als der normale 911 Turbo verzichtete der GT2 auf Allradantrieb (beim 993/996 zudem teils ohne ESP) und schickte enorme Drehmomentspitzen ungefiltert an die Hinterräder.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welches Unternehmen aus Baden-Württemberg fertigte neben der eigenen Porsche-Produktion im Auftrag den Mercedes-Benz 500 E (W124) und den Audi RS2 Avant?',
      a: [
        'Porsche (im Werk Zuffenhausen / Entwicklungszentrum Weissach)',
        'Karmann in Osnabrück',
        'Magna Steyr in Graz',
        'Bertone in Turin'
      ],
      exp: 'Aufgrund mangelnder Auslastung Anfang der 1990er entwickelte und baute Porsche im Rössle-Bau in Zuffenhausen legendäre Joint-Ventures wie den Audi RS2 und den Mercedes 500 E.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'In welchem Baukonzept unterscheiden sich 911 GT3 und 911 Turbo traditionell hauptsächlich?',
      a: [
        'GT3 = Hochdrehzahl-Saugmotor + reiner Heckantrieb; Turbo = Biturbo + Allradantrieb',
        'GT3 = Frontmotor; Turbo = Mittelmotor',
        'GT3 = immer Cabrio; Turbo = immer Targa',
        'GT3 = nur für China; Turbo = nur für USA'
      ],
      exp: 'Der GT3 steht für puristische Rennstrecken-Präzision bis 9.000/min, der Turbo (S) für kompromisslose Allwetter-Längsbeschleunigung mit Allrad und enormem Drehmoment.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Wie wird beim modernen 911 GT3 RS (Generation 992) das „DRS“ am großen Heckflügel eingesetzt?',
      a: [
        'Hydraulisch verstellbare Flügelelemente reduzieren auf Knopfdruck auf Geraden den Luftwiderstand und klappen beim Bremsen als Airbrake hoch',
        'Es leitet heiße Kühlluft direkt auf die Hinterreifen',
        'Es deaktiviert zwei der sechs Zylinder',
        'Es senkt den Reifendruck automatisch um 1 bar'
      ],
      exp: 'Erstmals in einem Serien-Porsche nutzt der 992 GT3 RS echte Formel-1-inspiriertes Drag Reduction System inklusive aktiv gesteuertem Frontdiffusor-Element.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Warum hatten die Scheinwerfer des Porsche 996 (1997) bei Fans zunächst einen schweren Stand?',
      a: [
        'Wegen der neuartigen, nicht mehr runden „Spiegelei“-Form mit integrierten Blinkern, die identisch auch am Boxster 986 saß',
        'Weil sie als Klappscheinwerfer ständig einfroren',
        'Weil es nur einen zentralen Scheinwerfer gab',
        'Weil sie aus rotem Plexiglas bestanden'
      ],
      exp: 'Aus Kostengründen teilten sich 996 und Boxster die identischen Frontleuchten. Mit dem Nachfolger 997 kehrte Porsche 2004 reumütig zu klassischen runden Einzelscheinwerfern zurück.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Was ist der Hintergrund der Porsche-Sondermodelle mit dem Beinamen „Speedster“?',
      a: [
        'Flachere, stark gekürzte Windschutzscheibe und charakteristische Doppelhutzen („Streamliner“) über dem Verdeckkasten',
        'Besonders hohes Glas-Panoramadach für Stadtrundfahrten',
        'Verlängerter Radstand mit vier vollwertigen Sitzen',
        'Serienmäßige Höherlegung und Stollenreifen'
      ],
      exp: 'Inspiriert vom spartanischen 356 Speedster (1954 für die USA gedacht) erscheinen bis heute limitierte Speedster-Editionen der 911-Baureihe.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welcher österreichische Enkel von Ferdinand Porsche prägte zuerst als 917-Chefkonstrukteur bei Porsche und später als langjähriger VW-Patriarch die Autowelt?',
      a: [
        'Ferdinand Piëch',
        'Wendelin Wiedeking',
        'Wolfgang Porsche',
        'Hans Mezger'
      ],
      exp: 'Ferdinand Piëch leitete in den späten 1960ern die Porsche-Entwicklung, setzte den waghalsigen Bau von 25 Exemplaren des 917 durch und ging später zu Audi und VW.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Was charakterisiert ein „Weissach-Paket“, das Porsche unter anderem für 918 Spyder, GT3 RS, GT2 RS und Taycan Turbo GT anbietet?',
      a: [
        'Konsequenten Leichtbau mit Sichtcarbon, Titan-/Magnesium-Komponenten und Rennstreckenfokus ohne klassischen Komfortballast',
        'Ein besonders großes Reisegepäck-Set aus Naturleder',
        'Einen stärkeren Anhängerkupplungs-Rahmen',
        'Eine eingebaute Espressomaschine in der Mittelkonsole'
      ],
      exp: 'Das Weissach-Paket spart je nach Modell 15 bis über 70 Kilogramm Gewicht ein – etwa über geschmiedete Magnesiumräder, Titan-Überrollkäfige und Entfall von Dämmung.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welche zwei Geländegängigen Serien-Sondermodelle ehrten 2022 beim 911 (992) Porsches Gesamtsieg von 1984 bei der Rallye Paris–Dakar?',
      a: [
        'Porsche 911 Dakar (mit 50 mm höherem Fahrwerk + Liftsystem)',
        'Porsche 911 Mudder',
        'Porsche 911 Himalaya',
        'Porsche 911 Outback'
      ],
      exp: 'Der auf 2.500 Stück limitierte 911 Dakar knüpfte direkt an den 911 Carrera 3.2 4x4 (953) von René Metge / Dominique Lemoyne 1984 an.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Was ist bei einem Porsche-Modell hinter der Bezeichnung „GTS“ positioniert?',
      a: [
        'Die sportliche Lücke genau zwischen dem S-Modell und den reinen GT-Rennstreckenfahrzeugen',
        'Das langsamste Basismodell für Flottenkunden',
        'Ausschließlich gepanzerte Staatslimousinen',
        'Ein reiner Diesel-Antrieb'
      ],
      exp: 'Typisch für GTS-Varianten (Gran Turismo Sport) sind serienmäßige Sportabgasanlagen, Alcantara/Race-Tex-Interieur, schwarze Akzente und rund 30 PS Leistungsplus über dem S.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welchen spektakulären Weltrekord stellte Porsche 2018 mit dem stark modifizierten Le-Mans-Renner „919 Hybrid Evo“ auf?',
      a: [
        '5:19,546 Minuten auf der Nürburgring-Nordschleife (absoluter Allzeit-Streckenrekord)',
        'Den niedrigsten Dieselverbrauch durch Europa',
        'Den längsten ununterbrochenen Drift auf trockenem Asphalt',
        'Die größte Anhängelast eines Hybrid-Autos'
      ],
      exp: 'Ohne WEC-Reglementbeschränkung entfesselte der 919 Evo über 1.160 PS bei 849 kg Gewicht – Timo Bernhard unterbot damit Stefan Bellofs 35 Jahre alten 956-Rekord um fast eine Minute!'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welche Besonderheit bot der 1973 vorgestellte Renn-911 „Carrera RSR Turbo 2.1“ (Startnummer 22)?',
      a: [
        'Er fuhr noch vor Einführung des Serien-930 Turbo als weltweit erster 911 mit Turbolader in Le Mans auf Platz 2 gesamt',
        'Er besaß ein stufenloses Riemengetriebe',
        'Er startete mit vier Elektromotoren',
        'Er hatte eine hölzerne Gitterrohr-Karosserie'
      ],
      exp: 'Unter Leitung von Norbert Singer und Ernst Fuhrmann bewies der 500-PS-RSR Turbo 1974 auf Anhieb, dass Abgasturboaufladung langstreckentauglich ist.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Was leistete die zweite Generation des 997 GT2 RS (2010, 620 PS) im Vergleich zu einem zeitgenössischen Carrera GT?',
      a: [
        'Er bot auf dem Papier sogar mehr Leistung und unterbot auf der Nordschleife die Bestzeit des damaligen Carrera GT',
        'Er war auf 180 km/h abgeregelt',
        'Er besaß nur die halbe Leistung des Carrera GT',
        'Er hatte gar keinen Turbolader'
      ],
      exp: 'Mit 620 PS aus zwei VTG-Turboladern und 1.370 kg Gewicht war der limitierte 997 GT2 RS (500 Stück) damals der schnellste Straßen-Porsche überhaupt.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Wofür steht bei aktuellen Porsche-Modellen der Begriff „T-Hybrid“ im seit 2024 angebotenen 911 Carrera GTS (Typ 992.2)?',
      a: [
        'Für einen Performance-Hybrid mit elektrischem Abgasturbolader (eTurbo) und integrierter E-Maschine im PDK',
        'Für einen Plugin-Diesel-Hybrid mit 80 km E-Reichweite',
        'Für ein rein mechanisches Schwungradsystem von Williams',
        'Für einen Zweitakt-Range-Extender unter der Fronthaube'
      ],
      exp: 'Die kompakte 400V-Batterie (1,9 kWh) speist einen E-Motor im Getriebe sowie einen elektrisch angetriebenen Monoturbo – das Turboloch verschwindet praktisch vollständig.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welches Antriebsmittel wählte Porsche 2010/11 im Rennwagen „911 GT3 R Hybrid“ (unter anderem am Nürburgring) als Energiespeicher anstelle schwerer Batterien?',
      a: [
        'Einen elektromechanischen Schwungradspeicher von Williams neben dem Fahrer',
        'Einen flüssigen Wasserstofftank im Kofferraum',
        'Druckluftflaschen auf dem Dach',
        'Blei-Säure-Batterien aus dem Gabelstaplerbau'
      ],
      exp: 'Bis zu 40.000 Umdrehungen pro Minute erreichte der Carbon-Rotor des Schwungrads und lieferte beim Herausbeschleunigen Zusatzschub an zwei Front-E-Motoren.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welche frühe Karosserievariante baute Porsche beim 911 bereits ab 1995 als besonders begehrtes Leichtbau-Einzelstück bzw. Kleinstserie nicht ab Werk im normalen Prospekt: „GT1 Straßenversion“?',
      a: [
        'Ein reiner Renn-Mittelmotor-Supersportwagen mit nur 911-Scheinwerfern zur GT1-Homologation für Le Mans',
        'Ein siebensitziger 911-Kombi für Werkstechniker',
        'Ein Amphibienfahrzeug auf 993-Basis',
        'Ein umgedrehter 911 mit Frontantrieb'
      ],
      exp: 'Der 911 GT1 von 1996/97/98 nutzte technisch nur noch die vordere 911-Grundstruktur und Scheinwerfer – dahinter saß ein Mittelmotor samt Rennsportchassis; etwa 20–25 Straßenversionen entstanden.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welcher Manager sanierte Porsche in den 1990er-Jahren mit Toyota-Produktionsberatern (Lean Production) und führte den Boxster sowie Cayenne ein?',
      a: [
        'Wendelin Wiedeking',
        'Oliver Blume',
        'Matthias Müller',
        'Ernst Fuhrmann'
      ],
      exp: 'Unter Wendelin Wiedeking (Vorstandsvorsitzender 1993–2009) wandelte sich Porsche vom verlustreichen Nischenhersteller zum zeitweise profitabelsten Autobauer der Welt.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welchen Luftgekühlten Porsche nannte das Werk inoffiziell „Carrera 4 Leichtbau“ (Typ 964) mit nur rund 22 gebauten Exemplaren?',
      a: [
        'Ein radikal abgespecktes Allrad-Sondermodell von Jürgen Barth ohne Rücksitze und Komfortausstattung',
        'Den Ur-Boxster mit Kunststoffkarosserie',
        'Den ersten Cayenne mit V6-Diesel',
        'Ein reines Elektrofahrzeug aus dem Jahr 1991'
      ],
      exp: 'Mit Schiebefenstern, Alutüren und unter 1.100 kg Leergewicht gehört der 964 Carrera RS / 4 Leichtbau zu den rarsten Sammlerstücken aus Zuffenhausen.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Welche zwei bekannten Ausstattungsmerkmale prägen das traditionelle Ziffernblatt-Kombiinstrument des klassischen Porsche 911?',
      a: [
        'Fünf ineinander greifende Rundinstrumente mit dem Drehzahlmesser exakt in der Mitte',
        'Zwei senkrechte Balkenanzeigen ohne Drehzahlmesser',
        'Ein einziges großes digitales Lenkrad-Display wie in der Formel 1 bereits ab 1964',
        'Ein mittig auf dem Tunnel sitzender Tachometer'
      ],
      exp: 'Der Fahrer schaut direkt auf den wichtigsten Parameter eines Sportwagens – die Motordrehzahl – während Tacho, Öltemperatur/-druck und Tank darum gruppiert wurden.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'mid',
      q: 'Was ist die „Porsche Active Aerodynamics“ bzw. der Begriff „Variocam“ im Motorenbau?',
      a: [
        'VarioCam bezeichnet Porsches variable Nockenwellenverstellung (später mit Ventilhub-Umschaltung VarioCam Plus)',
        'VarioCam ist eine Rückfahrkamera mit Weitwinkelzoom',
        'VarioCam steuert die Scheinwerferwaschanlage',
        'VarioCam ist ein klappbarer Dachgepäckträger'
      ],
      exp: 'Ab 1991 beim 968 debütiert, kombiniert VarioCam später variable Steuerzeiten und Ventilhub-Umschaltung für starkes Drehmoment bei niedrigen und Höchstleistung bei hohen Drehzahlen.'
    },

    // --- PORSCHE ALLGEMEIN: PRO (32) ---
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welcher legendäre Porsche-Motorenkonstrukteur schuf sowohl den luftgekühlten Zwölfzylinder des 917 als auch den jahrzehntelang in GT-Modellen verbauten Kurbelgehäuse-Sechszylinder („Mezger-Motor“)?',
      a: [
        'Hans Mezger',
        'Erwin Komenda',
        'Anatole Lapine',
        'Harm Lagaay'
      ],
      exp: 'Der nach ihm benannte, rennerprobte „Mezger-Block“ mit echter Trockensumpfschmierung wurde über den 911 GT1 bis zum 997 GT3 RS 4.0 (2011) hochgeschätzt.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Wie hieß der geniale Chefdesigner der ersten Generationen bei Porsche, der unter anderem die Karosserieformen von Käfer, 356, 550 Spyder und maßgeblich die Grundlinie des 911 prägte (zusammen mit „Butzi“ Porsche)?',
      a: [
        'Erwin Komenda (Karosseriebau-Chef) & Ferdinand Alexander „Butzi“ Porsche (911-Formgebung)',
        'Giorgetto Giugiaro & Marcello Gandini',
        'Pininfarina & Bruno Sacco',
        'Walter de Silva & Chris Bangle'
      ],
      exp: 'Ferdinand Alexander Porsche entwarf ab Ende der 1950er die klassische 911-Silhouette, während Konstruktionsleiter Erwin Komenda den Karosseriebau bis zum Serienwerkzeug umsetzte.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welche Zündfolge besitzt der typische Porsche-Sechszylinder-Boxermotor (3,0–4,0 Liter im 911)?',
      a: [
        '1 – 6 – 2 – 4 – 3 – 5',
        '1 – 3 – 4 – 2 – 5 – 6',
        '1 – 5 – 3 – 6 – 2 – 4',
        '1 – 2 – 3 – 4 – 5 – 6'
      ],
      exp: 'Durch die gekröpfte Sechshübe-Kurbelwelle zünden immer abwechselnd linke und rechte Zylinderbank exakt gleichmäßig im 120°-Kurbelwinkelabstand (1-6-2-4-3-5).'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Was ist die technische Besonderheit der „Weissach-Achse“, die Porsche 1977 mit dem 928 einführte?',
      a: [
        'Eine passiv mitlenkende Hinterachse, die bei Lastwechsel im Kurvenverlauf automatisch leichte Vorspur aufbaut und Übersteuern stabilisiert',
        'Eine starre De-Dion-Achse mit Blattfedern',
        'Eine mechanisch gesperrte Vorderachse für Schnee',
        'Eine hydraulische Allradlenkung mit 45 Grad Einschlag'
      ],
      exp: 'Durch gezielte Elastokinematik der Querlenker dreht das kurvenäußere Hinterrad beim Gaswegnehmen minimal nach innen (Vorspur) – später ein Vorläufer aktiver Hinterachslenkung.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Wie viele Ventile pro Zylinder hatte der besonders komplexe Rennmotor des Porsche 917/30 bzw. der spätere Type 935/78 „Moby Dick“?',
      a: [
        '917 hatte luftgekühlte 2-Ventiler; der spätere 935/78 „Moby Dick“ führte erstmals wassergekühlte 4-Ventil-Zylinderköpfe im 911-Boxer ein',
        'Der 917 hatte 5 Ventile pro Zylinder und Wasserkühlung',
        'Beide hatten Schiebersteuerungen ohne Ventile',
        'Der 917 hatte 3 Ventile pro Zylinder mit Desmodromik'
      ],
      exp: 'Norbert Singer setzte beim 1978er 935/78 („Moby Dick“) wassergekühlte Vierventilköpfe auf das luftgekühlte Kurbelgehäuse – damit erzielte man aus 3,2 l Hubraum bis zu 845 PS!'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Was war der „Fuhrmann-Motor“ (Typ 547), der die Rennwagen 550 Spyder, 356 Carrera und 904 GTS antrieb?',
      a: [
        'Ein extrem komplexer Vierzylinder-Boxer mit vier über Königswellen angetriebenen obenliegenden Nockenwellen („Königswellenmotor“)',
        'Ein einfacher Reihenzweizylinder-Zweitakter',
        'Ein zugekaufter Ford-V6',
        'Ein erster 8-Zylinder-Boxer aus dem 908'
      ],
      exp: 'Der von Dr. Ernst Fuhrmann konstruierte Königswellen-Boxer mit Rollenlager-Kurbelwelle war ein feinmechanisches Juwel, dessen Montage teils über 100 Arbeitsstunden dauerte.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welchen ungewöhnlichen Motortyp hatte der rund 3,0 Liter große Can-Am-Monster-Rennwagen Porsche 917/30 im Heck (bis zu über 1.100 PS im Rennen / 1.500+ PS im Qualifying)?',
      a: [
        'Einen 5,4-Liter-Zwölfzylinder-Flachmotor mit 180° Bankwinkel und zwei KKK-Turboladern',
        'Einen 7,0-Liter-V8-Saugmotor von Chevrolet',
        'Eine Gasturbine aus dem Hubschrauberbau',
        'Einen Doppel-Sechszylinder mit vier Kompressoren'
      ],
      exp: 'Der von Mark Donohue gefahrene 917/30 dominierte 1973 die nordamerikanische Can-Am-Serie so total („The Unfair Advantage“), dass die Regeln anschließend den Kraftstoffverbrauch limitierten.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Warum spricht man beim Zwölfzylinder des Porsche 917 technisch genau genommen eigentlich nicht von einem reinen Boxer-, sondern von einem „180°-V-Motor“?',
      a: [
        'Weil sich jeweils zwei gegenüberliegende Pleuel einen gemeinsamen Hubzapfen teilen statt getrennte gegenläufige Kurbelzapfen zu nutzen',
        'Weil die Zylinder senkrecht im Block stehen',
        'Weil alle zwölf Kolben gleichzeitig nach rechts laufen',
        'Weil er nur mit einer einzigen Zündkerze pro Bank zündet'
      ],
      exp: 'Beim echten Boxermotor bewegt sich jedes gegenüberliegende Kolbenpaar spiegelbildlich gegeneinander auf eigenen Hubzapfen; beim 180°-V12 laufen die Partner auf demselben Zapfen mit.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welche 911-Generation führte 2006 beim 911 Turbo (997.1) als weltweite Serienpremiere bei Benzinmotoren eine entscheidende Turbolader-Technologie ein?',
      a: [
        'Variable Turbinengeometrie (VTG) im Ottomotor – temperaturfest durch Werkstoffe aus der Raumfahrt',
        'Elektrische Aufladung per 12V-Lichtmaschine',
        'G-Lader mit Magnesium-Spirale',
        'Wassereinspritzung in das Turbinengehäuse'
      ],
      exp: 'Beim Diesel seit den 1990ern üblich, stellte VTG beim rund 1.000 °C heißen Abgas des Benziners eine enorme werkstofftechnische Hürde dar, die Porsche gemeinsam mit BorgWarner löste.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welches berühmte Werksteam-Projekt steuerte der niederländische Designer Harm Lagaay ab 1989 bei Porsche entscheidend mit?',
      a: [
        'Die Gestaltung von 968, Boxster-Studie (1993), 993, 996, 997, Cayenne und Carrera GT',
        'Ausschließlich den 356 A',
        'Den ersten VW Käfer 1938',
        'Die Gestaltung des Porsche 924 im Jahr 1972 als alleiniger Chef'
      ],
      exp: 'Harm Lagaay leitete von 1989 bis 2004 „Style Porsche“ und rettete mit dem emotionalen Boxster Concept 1993 das Image in einer Krisenzeit (den 924 verantwortete er früher schon mit unter Anatole Lapine).'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Was änderte sich bei den 911-Vorderachsen grundlegend erst mit der Generation 992 beim 911 GT3 (2021) statt der klassischen McPherson-Federbeine?',
      a: [
        'Der Wechsel auf eine rennsporttypische Doppelquerlenker-Vorderachse (aus dem 911 RSR abgeleitet)',
        'Der Einbau einer angetriebenen Starrachse',
        'Die Einführung von Blattfedern quer zur Fahrtrichtung',
        'Der Verzicht auf vordere Stoßdämpfer'
      ],
      exp: 'Die steifere Doppelquerlenker-Vorderachse des 992 GT3 hält die Reifenaufstandsfläche beim harten Anbremsen und in schnellen Kurven deutlich präziser als eine McPherson-Achse.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welche ungewöhnliche Karosserieanordnung wählte Ferdinand Porsche beim legendären „Tatzelwurm“-Projekt bzw. dem für Berlin–Rom 1939 gebauten Typ 64?',
      a: [
        'Stromlinienförmige Aluminium-Coupés auf Käfer-Basis mit verdeckten Radhäusern als Vorläufer der Porsche-Linie',
        'Ein vierrädriger Lkw mit Sechszylinder-Dampfmaschine',
        'Ein dreirädriges Lieferfahrzeug mit Holzvergaser',
        'Ein Cabriolet mit zwei gegenläufigen Lenkrädern'
      ],
      exp: 'Vom Typ 64 (VW-Aerodynamik-Coupé) entstanden 1939 drei Stück; der Wagen trägt bereits viele Proportionen, die später den 356 prägten.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welche Bedeutung hat der interne Entwicklungscode „987“, „981“ und „982“ bei Porsche?',
      a: [
        'Es sind die aufeinanderfolgenden Generationen von Boxster und Cayman (inkl. 718 = 982)',
        'Es sind die Generationen des Cayenne',
        'Es sind die Dieselmotor-Typen im Panamera',
        'Es sind die internen Bezeichnungen der GT2-RS-Reifen'
      ],
      exp: '986 (Ur-Boxster 1996) → 987 (2004, inkl. erstem Cayman) → 981 (2012) → 982 (ab 2016 als 718 Boxster/Cayman mit Vierzylinder-Turbo bzw. im GTS/GT4/Spyder weiter als Sechszylinder-Sauger).'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welchen besonderen Weltmeistertitel holte Porsche 1984–1986 indirekt als Motorenpartner in der Formel 1?',
      a: [
        'Den Konstrukteurs- und Fahrertitel für McLaren mit dem von Porsche entwickelten und von TAG finanzierten 1,5-Liter-V6-Turbomotor',
        'Den ersten Konstrukteurstitel als reines Werksteam „Porsche F1 Team 1985“',
        'Einen Doppelsieg mit dem Zwölfzylinder von Footwork 1991',
        'Eine komplette Saison ungeschlagen mit dem V10 des Carrera GT'
      ],
      exp: 'Der von Hans Mezger konstruierte „TAG Turbo made by Porsche“ verhalf Niki Lauda (1984) und Alain Prost (1985, 1986) zu drei F1-Fahrertiteln in Serie.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Warum bekam der frühe Porsche 911 der Baujahre 1964–1973 in manchen Modellen Gewichte aus Gusseisen (je ca. 11 kg) hinter die vordere Stoßstange montiert?',
      a: [
        'Um der extremen Hecklastigkeit entgegenzuwirken und den Vorderwagen bei hohem Tempo weniger leicht aufschwimmen zu lassen',
        'Als Diebstahlschutz zum Beschweren des Kofferraums',
        'Als Opferanode gegen Korrosion an den Kotflügeln',
        'Um eine steuerliche Lkw-Zulassung zu erreichen'
      ],
      exp: 'Erst die Verlängerung des Radstands um 57 mm beim B-Modell (1968/69) und die Auslagerung der Batterien verbesserte das Gleichgewicht auf der Vorderachse spürbar.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Wie heißt der erste vollelektrische Rennwagen, mit dem Porsche ab Saison 6 (2019/20) offiziell in der FIA-Weltmeisterschaft antritt?',
      a: [
        'Porsche 99X Electric (in der Formel E)',
        'Porsche Taycan GT-R',
        'Porsche 919 E-LMP',
        'Porsche Mission R Concept Cup'
      ],
      exp: 'Der 99X Electric sammelte bereits mehrere E-Prix-Siege sowie den Fahrer-WM-Titel durch Pascal Wehrlein (2024) in der Formel E.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welches legendäre 911-Leichtbaumodell von 1967 gilt mit dünneren Scheiben, Kunststofftüren und 210 PS als Urahn aller straßen- und rallyetauglichen „R“-Leichtbau-911er?',
      a: [
        'Porsche 911 R (1967, nur 20 Stück + 4 Prototypen)',
        'Porsche 911 L',
        'Porsche 911 E Targa',
        'Porsche 964 America Roadster'
      ],
      exp: 'Der rund 800 kg leichte 911 R (1967) siegte u. a. bei der Tour de France Automobile und stellte Dauerweltrekorde in Monza auf; 2016 lebte der Name im begehrten Handschalter-991 R wieder auf.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Was versteht man im Zusammenhang mit dem Porsche 996/986 und frühen 997 unter dem bekannten „IMS-Lager-Problem“?',
      a: [
        'Das Zwischenwellenlager (Intermediate Shaft Bearing), das die Steuerketten antreibt und bei einigen M96/M97-Motoren vorzeitig verschleißen konnte',
        'Eine undichte Öldichtung am Turbolader des Mezger-Blocks',
        'Ein Softwarefehler im elektrischen Sitzversteller',
        'Korrosion im Hochvolt-Ladeport'
      ],
      exp: 'Mit der Direkteinspritzer-Motorengeneration 9A1 ab 2008/2009 (997.2 und 987.2) konstruierte Porsche den Block komplett ohne Zwischenwelle neu.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welcher frühe Porsche-Rennwagen von 1962 erzielte bei strömendem Regen den allerersten – und einzigen – Formel-1-WM-Grand-Prix-Sieg eines Porsche-Werksteams?',
      a: [
        'Der Porsche 804 mit Dan Gurney beim GP von Frankreich 1962 in Rouen',
        'Der Porsche 718 mit Edgar Barth 1958',
        'Der Porsche 904 mit Jo Bonnier 1964',
        'Der Porsche 917 mit Vic Elford 1969'
      ],
      exp: 'Mit einem 1,5-Liter-Achtzylinder-Boxer (Typ 753) holte Dan Gurney im Juli 1962 den historischen F1-Sieg für Zuffenhausen – wenig später zog sich Porsche aus der teuren Formel 1 vorerst zurück.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welches Verfahren nutzt Porsche seit dem 991-Saugmotor bzw. modernen GT3-Triebwerken für extrem reibungsarme Zylinderlaufbahnen im Aluminium-Kurbelgehäuse?',
      a: [
        'Eisenbeschichtung per Lichtbogendrahtspritzen (Plasma/LDS) statt schwerer Graugussbuchsen',
        'Eingeklebte Kupferlaufbuchsen',
        'Unbeschichtete Magnesium-Zylinder',
        'Gummi-ausgekleidete Laufflächen'
      ],
      exp: 'Das hauchdünne Plasma-Verfahren senkt Reibung und Ölverbrauch selbst bei über 9.000/min im GT3-Motor und leitet Verbrennungswärme optimal ab.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welche Besonderheit bot der 1969 gebaute „Porsche 917 PA“?',
      a: [
        'Ein offener Can-Am-Testträger mit einem 16-Zylinder-Flachmotor-Versuchstriebwerk (nicht im Rennen eingesetzt)',
        'Ein 917 mit Wohnmobil-Aufbau',
        'Ein Allrad-917 für die Rallye Monte Carlo',
        'Der Prototyp des heutigen Porsche Panamera'
      ],
      exp: 'Während der 16-Zylinder im Prüfstand gewaltig drehte, erwies sich die Kombination aus leichtem 12-Zylinder-Chassis und zwei Turboladern für Can-Am als agiler und überlegen.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Was kennzeichnet die Saugmotoren des Porsche 911 GT3 ab Typ 991.2 / 992 beim Ventiltrieb statt hydraulischer Hydrostößel?',
      a: [
        'Starrer Ventiltrieb mit Schlepphebeln (Finger Followers) ohne automatisches Ventilspiel-Ausgleichsspiel für Drehzahlen bis 9.000/min',
        'Ohne Nockenwellen mit elektromagnetischer Zündung',
        'Mit hölzernen Stößelstangen',
        'Mit Zweitakt-Schlitzsteuerung'
      ],
      exp: 'Dank DLC-beschichteter starrer Schlepphebel (inspiriert vom 911 RSR) arbeitet der Ventiltrieb auch bei 9.000/min flatterfrei und über die Lebensdauer wartungsfrei.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welcher berühmte Designer leitete das Porsche-Designstudio vor Harm Lagaay (1970–1989) und war u. a. für die schrillen Farben des 928 und die Formen von 924/944/959 verantwortlich?',
      a: [
        'Anatole „Tony“ Lapine',
        'Ferdinand Porsche',
        'Michael Mauer',
        'Peter Schreyer'
      ],
      exp: 'Der aus Riga stammende Tony Lapine (zuvor bei GM und Opel) gab der Transaxle-Generation ihr modernes, damals avantgardistisches Gesicht.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Wie heißt das 2013 vorgestellte System von Porsche, bei dem im 911 (erstmals ab 991 GT3, danach auch Carrera/Turbo) nicht nur vorn, sondern auch hinten aktiv gelenkt wird?',
      a: [
        'Hinterachslenkung (Rear-Axle Steering)',
        'Porsche Vector Steering',
        'Quad-Axle-Control',
        'Dynamic Torsion Bar'
      ],
      exp: 'Bis ca. 50 km/h schlagen die Hinterräder gegensinnig zu den Vorderrädern ein (kleinerer Wendekreis, agil), bei hohem Tempo gleichsinnig (virtueller längerer Radstand, stabil).'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welche zwei Hersteller-Typnamen verbergen sich hinter den Porsche-Landmaschinen-Traktoren der 1950er Jahre (z. B. „Junior“, „Standard“, „Super“, „Master“)?',
      a: [
        'Porsche-Diesel Motorenbau GmbH (Friedrichshafen, in Kooperation mit Allgaier)',
        'Porsche-Zuffenhausen Agrar AG',
        'Porsche-Stuttgart Steam Ltd.',
        'Porsche-Leipzig Schwerbau'
      ],
      exp: 'Zwischen 1956 und 1963 entstanden am Bodensee rund 125.000 rot lackierte Porsche-Diesel-Traktoren mit luftgekühlten Ein- bis Vierzylinder-Dieselmotoren.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Wie viele Schaltgänge besaß das manuelle Getriebe des Porsche 911 (Generation 991) im Jahr 2011 als weltweit erstes 7-Gang-Handschaltgetriebe in einem Serien-Pkw?',
      a: [
        '7 Vorwärtsgänge (abgeleitet aus dem 7-Gang-PDK-Radsatz, mit Sperre gegen versehentliches Einlegen des 7. Gangs)',
        '8 Vorwärtsgänge mit zwei Rückwärtsgängen',
        '5 Vorwärtsgänge mit Splitgruppe',
        '6 Vorwärtsgänge mit elektronischem Overdrive-Knopf'
      ],
      exp: 'Um auf Basis der PDK-Architektur ein Schaltgetriebe anzubieten, nutzte Porsche sieben Gänge – der 7. Gang diente lang übersetzt dem Verbrauchs-Cruisen auf der Autobahn.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Was ist die „Porsche Doppelkupplung“ im Ur-Einsatz der frühen 1980er gewesen, lange vor der Serie 2008?',
      a: [
        'Ein Renngetriebe im Gruppe-C-Porsche 956/962 (ab 1983/85), bei dem die Elektronik noch nicht reif genug für die Großserie war',
        'Ein Zweischeiben-Rennrad für Bergetappen',
        'Eine Sicherheitskupplung für Abschleppseile',
        'Ein Patent ausschließlich für Motorräder'
      ],
      exp: 'Bereits 1986 gewann der Porsche 962 C mit PDK ein Langstreckenrennen in Monza – erst schnelle 2000er-Mikrocontroller machten es geschmeidig genug für den Alltag im 997.2.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welches Modell der Porsche-Geschichte trägt die interne Typnummer „904“?',
      a: [
        'Der formschöne Porsche 904 Carrera GTS (1963/64) mit glasfaserverstärkter Kunststoffkarosserie auf einem Stahlkastenrahmen',
        'Der erste elektrische Prototyp von 1900 (Lohner-Porsche)',
        'Der Cayenne S der dritten Generation',
        'Das erste Panamera-Konzeptauto'
      ],
      exp: 'Der von Butzi Porsche gezeichnete 904 war eine Zäsur in der Aerodynamik und gewann bei der Targa Florio 1964 sogar gegen reinrassige Prototypen.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welchen innovativen Weg beschritt Ferdinand Porsche bereits im Jahr 1900 auf der Pariser Weltausstellung noch vor Gründung seines eigenen Büros?',
      a: [
        'Den „Lohner-Porsche“ mit Radnaben-Elektromotoren und wenig später den weltweit ersten funktionsfähigen Vollhybrid („Semper Vivus“)',
        'Einen Zwölfzylinder-Flugmotor mit Wasserstoff-Einspritzung',
        'Das erste Drei-Gang-Automatikgetriebe mit Drehmomentwandler',
        'Einen luftgekühlten Diesel-Sportwagen aus Holz'
      ],
      exp: 'Genau 120 Jahre vor dem Taycan baute Ferdinand Porsche beim k.u.k. Hofwagenfabrikanten Lohner elektrische Radnabenautos – schon 1900 sogar mit Allradantrieb!'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welches 911-Sondermodell (Generation 992) erschien 2023 zum 60. Jubiläum des 911 mit dem hochdrehenden GT3-RS-Motor und reinem Sechsgang-Schaltgetriebe?',
      a: [
        'Porsche 911 S/T',
        'Porsche 911 Sport Classic',
        'Porsche 911 Targa Heritage',
        'Porsche 911 Carrera T'
      ],
      exp: 'Der auf 1.963 Exemplare limitierte 911 S/T vereinte erstmals den 525-PS-GT3-RS-Saugmotor mit einer Sechsgang-Handschaltung, Einmassenschwungrad und flügelloser Karosserie (1.380 kg).'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Wie heißt die aktuell im WEC und IMSA startende LMDh-Rennmaschine (seit 2023), mit der Porsche wieder um Le-Mans-Gesamtsiege kämpft?',
      a: [
        'Porsche 963 (mit 4,6-Liter-V8-Biturbo auf Basis des 918-Motors plus Einheits-Hybrid)',
        'Porsche 920 Evo',
        'Porsche 911 LMDh',
        'Porsche GT1-24'
      ],
      exp: 'Im Werksteam Porsche Penske Motorsport setzt der 963 auf ein Multimatic-Chassis und den weiterentwickelten V8 aus RS Spyder und 918 Spyder.'
    },
    {
      cat: 'porsche_allgemein',
      diff: 'pro',
      q: 'Welche Stadt im Allgäu bzw. in Österreich beherbergt seit den 1960er Jahren den familiären Wohnsitz „Schüttgut“ der Familien Porsche und Piëch?',
      a: [
        'Zell am See',
        'Innsbruck',
        'Kitzbühel',
        'Bregenz'
      ],
      exp: 'Das Gut Schüttgut in Zell am See (Salzburger Land) ist seit über 80 Jahren Dreh- und Angelpunkt der Eigentümerfamilien; auch die Porsche Design Studios liegen dort bzw. unweit entfernt.'
    },

    // =========================================================================
    // PORSCHE TAYCAN (100 Fragen: 33 easy · 34 mid · 33 pro)
    // =========================================================================
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'In welchem Jahr feierte der Serien-Porsche Taycan (Typ Y1A) seine offizielle Weltpremiere gleichzeitig auf drei Kontinenten?',
      a: [
        '2019 (4. September 2019)',
        '2015',
        '2021',
        '2017'
      ],
      exp: 'Die Premiere fand parallel an den Niagarafällen (Kanada), in Neuhardenberg bei Berlin und in Pingtan (China) als Symbol für Nachhaltigkeit und Energie statt.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Wie hieß das Konzeptfahrzeug auf der IAA 2015 in Frankfurt, aus dem direkt der spätere Porsche Taycan hervorging?',
      a: [
        'Porsche Mission E',
        'Porsche Vision GT',
        'Porsche Concept J1',
        'Porsche E-Carrera'
      ],
      exp: 'Die Studie „Mission E“ begeisterte das Publikum optisch so stark, dass Porsche das Seriendesign des Taycan verblüffend nah am Showcar hielt.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Welche sprachliche Herkunft und Bedeutung trägt der Name „Taycan“ laut Porsche?',
      a: [
        'Aus dem Orient/Türkischen sinngemäß „lebhaftes junges Pferd“ (Bezug auf das springende Pferd im Porsche-Wappen)',
        'Aus dem Lateinischen für „Blitz der Stille“',
        'Ein Kunstwort aus „Taiwan“ und „Vulkan“',
        'Abkürzung für „Trans-Axle Yttrium Concept“'
      ],
      exp: 'Die offizielle Übersetzung „lebhaftes, junges Pferd“ verweist direkt auf das Ross im Herzen des Stuttgarter Markenwappens.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Mit welcher hohen Bordnetz-Systemspannung setzte der Taycan 2019 als erstes Großserien-Elektroauto neue Maßstäbe?',
      a: [
        '800-Volt-Architektur (statt der damals üblichen 400 Volt)',
        '230 Volt Wechselspannung direkt im Antriebsstrang',
        '120-Volt-Niederspannungssystem',
        '2.400 Volt wie bei Fernzügen'
      ],
      exp: 'Die Verdopplung der Spannung halbiert bei gleicher Leistung den Stromfluss – das spart Kupfergewicht bei den Kabeln und erlaubt hohe Lade- sowie Dauerleistungen.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Wo wird die Porsche Taycan-Baureihe gefertigt?',
      a: [
        'Im Stammwerk Stuttgart-Zuffenhausen (eigene „Fabrik der Zukunft“)',
        'In Bratislava',
        'In Leipzig gemeinsam mit dem Cayenne',
        'In Zwickau'
      ],
      exp: 'Für den Taycan errichtete Porsche in Zuffenhausen ein komplett neues Werksteil inklusive eigenem Karosseriebau, Lackiererei und flexibler Montage mittels fahrerloser Transportsysteme.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Welche drei Karosserievarianten bietet Porsche mittlerweile beim Taycan an?',
      a: [
        'Sportlimousine, Cross Turismo und Sport Turismo',
        'Limousine, Cabriolet und Pickup',
        'Coupé, Targa und Minivan',
        'Roadster, Hatch und SUV'
      ],
      exp: 'Nach der Limousine (2019) folgten der robustere Kombi „Cross Turismo“ (2021) mit Kunststoffbeplankung sowie der tiefere, straßenorientierte „Sport Turismo“ (2022).'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Welche Besonderheit beim Getriebe unterscheidet den Porsche Taycan von den meisten anderen Elektroautos, die nur einen einzigen festen Gang haben?',
      a: [
        'Ein automatisches 2-Gang-Getriebe an der Hinterachse',
        'Ein manuelles 6-Gang-Schaltgetriebe mit Kupplungspedal',
        'Ein stufenloses Keilriemengetriebe an allen vier Rädern',
        'Vier getrennte Fünfganggetriebe'
      ],
      exp: 'Der kurz übersetzte 1. Gang liefert brachialen Antritt aus dem Stand, der lange 2. Gang hält Effizienz und hohe Autobahn-Reisegeschwindigkeiten bis über 260–305 km/h aufrecht.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Was verbirgt sich beim Taycan trotz rein elektrischem Antrieb hinter den bekannten Bezeichnungen „Turbo“ und „Turbo S“?',
      a: [
        'Reine Traditionsnamen für die besonders leistungsstarken Topmodelle ohne echten Abgasturbolader',
        'Kleine Hilfsturbinen im Kofferraum zur Reichweitenverlängerung',
        'Kaltgasdüsen zur Kühlung des Heckdiffusors',
        'Ein zugeschalteter Zweizylinder-Turbogenerator'
      ],
      exp: 'Porsche behielt das etablierte Namensschema als Kennzeichnung für die Spitzenleistung bei; das absolute Topmodell ab 2024 heißt sogar „Taycan Turbo GT“.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'In welcher Form leben die fünf klassischen Rundinstrumente früherer Porsche-Modelle (wie des 911) im Taycan digital weiter?',
      a: [
        'Als gebogenes 16,8-Zoll-Curved-Display hinter dem Lenkrad ohne klassische Hutze',
        'Im Taycan sind gar keine digitalen Bildschirme verbaut',
        'Als fünf einzelne Analoguhren in der Beifahrertür',
        'Als reine Projektion in den Außenspiegeln'
      ],
      exp: 'Das frei stehende, gebogene Kombiinstrument des Taycan zitiert moderne Porsche-Tradition und ergänzt optional ein Beifahrer-Display sowie zwei Mittelkonsol-Touchscreens.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Was ist auf Wunsch direkt vor dem Beifahrer im Armaturenbrett des Taycan integrierbar?',
      a: [
        'Ein eigenes Beifahrer-Touchdisplay (z. B. für Navigation, Medien oder Leistungsdaten)',
        'Ein zweites vollständiges Lenkrad zum Fahrschulbetrieb',
        'Ein analoger Schallplattenspieler',
        'Ein Kühlschrank für drei Getränkekisten'
      ],
      exp: 'Über das optionale Beifahrer-Display kann der Co-Pilot Routen ins Navi schicken oder Medien bedienen, ohne den Fahrer abzulenken (seit Facelift mit Sichtschutz-Folie für den Fahrer).'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Was unterscheidet den Taycan Cross Turismo optisch sofort vom reinen Sport Turismo?',
      a: [
        'Schwarze Radlaufblenden (Offroad-Elemente), mehr Bodenfreiheit (+20/+30 mm) und ein serienmäßiger „Gravel“-Modus',
        'Ein deutlich kürzerer Radstand ohne hintere Türen',
        'Fehlende hintere Seitenscheiben wie bei einem Lieferwagen',
        'Einen riesigen Doppelflügel auf dem Dach'
      ],
      exp: 'Der Cross Turismo ist als Allroad-Abenteurer ausgelegt und bietet gegen Aufpreis ein Offroad-Design-Paket samt eigenem Schotter-Fahrprogramm.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Wo befinden sich beim Porsche Taycan die Ladeklappen bzw. Ladebuchsen für AC- und DC-Stecker?',
      a: [
        'Vorn links und rechts direkt hinter den Vorderrädern (auf der Beifahrerseite bei DC + AC, Fahrerseite AC)',
        'Unter dem hinteren Nummernschild hinter einem Klappkennzeichen',
        'Exklusiv im Dachspoiler',
        'Mitten auf dem vorderen Frunk-Deckel'
      ],
      exp: 'Auf Knopfdruck oder per Handwisch öffnen (elektrisch optional) zwei Flügelklappen links und rechts hinter den Vorderrädern – links AC, rechts Combo-CCS (AC + DC).'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Verfügt der Porsche Taycan über einen vorderen Gepäckraum („Frunk“) unter der Fronthaube?',
      a: [
        'Ja, mit rund 84 Litern Volumen (ideal für Ladekabel oder ein kleines Bordcase)',
        'Nein, dort sitzt komplett ein massiver V8-Motor',
        'Ja, mit 600 Litern Volumen größer als der hintere Kofferraum',
        'Nur bei den Rechtslenker-Modellen'
      ],
      exp: 'Unter der vorderen Haube bleibt trotz Doppelquerlenker-Vorderachse, Vorder-E-Motor und Kühlmodulen ein praktisches 84-Liter-Fach erhalten.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Welche Einstiegs-Antriebsvariante des Taycan hat serienmäßig nur einen einzigen Elektromotor?',
      a: [
        'Der Taycan (Basismodell mit Hinterradantrieb / RWD)',
        'Der Taycan Turbo S',
        'Der Taycan 4S',
        'Der Taycan GTS'
      ],
      exp: 'Die Anfang 2021 nachgereichte Basisversion des Taycan treibt ausschließlich die Hinterachse an – dadurch ist er leichter und besonders effizient auf Langstrecken.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Mit welchem Hersteller entstand die J1-Plattform des Taycan im VW-Konzern als konzeptionelles Geschwisterprojekt?',
      a: [
        'Mit Audi (für den Audi e-tron GT)',
        'Mit Lamborghini (für den Aventador)',
        'Mit Skoda (für den Enyaq)',
        'Mit Bentley (für den Mulsanne)'
      ],
      exp: 'Audi e-tron GT (gebaut bei Böllinger Höfe in Neckarsulm) und Porsche Taycan teilen sich die maßgebliche J1-Hochvolt- und Fahrwerksarchitektur.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Wie stark verbesserte das große Facelift (Modelljahr 2025, vorgestellt Februar 2024) die maximale DC-Ladeleistung des Taycan?',
      a: [
        'Von bisher 270 kW auf bis zu 320 kW (10–80 % in ca. 18 Minuten)',
        'Es halbierte sie auf 100 kW zur Akkuschonung',
        'Es entfernte den CCS-Schnellladeanschluss komplett',
        'Es änderte nichts an Akku oder Ladekurve'
      ],
      exp: 'Durch verbesserte Zellchemie und Thermomanagement hält der geliftete Taycan J1.II Leistungen über 300 kW zudem außergewöhnlich lange über das Ladefenster hinweg.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Wie nennen sich beim Taycan die speziellen Aussparungen im Unterboden-Batteriepack für die Füße der Fondpassagiere?',
      a: [
        'Fußgaragen („Foot Garages“)',
        'Bodenwannen-Tunnel',
        'Batterie-Keller',
        'Trittbretter'
      ],
      exp: 'Damit man hinten trotz flacher Sportwagen-Dachlinie bequem tief und mit angenehmem Kniewinkel sitzt, spart Porsche genau im Fußbereich der Hinterbänke Zellmodule aus.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Welchen akustisch wählbaren Klang besitzt der Taycan auf Wunsch im Innenraum und außen?',
      a: [
        'Den futuristischen „Porsche Electric Sport Sound“ (synthetisierter Antriebssound abgestimmt auf Drehzahl und Last)',
        'Echte Lautsprecher-Imitationen eines Diesel-Traktors',
        'Ausschließlich mechanisches Pfeifen über Pfeifenrohre am Dach',
        'Vollständige Stille ohne jegliches Geräusch bis 100 km/h (ohne AVAS)'
      ],
      exp: 'Der optionale Electric Sport Sound verstärkt und moduliert reale Frequenzen der Elektromaschinen und Getriebe zu einem charakteristischen Porsche-E-Klang; dazu kommt gesetzliches AVAS bis ca. 20–30 km/h.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Womit lädt man den Taycan zu Hause an einer normalen Starkstrom-Wallbox typischerweise (Wechselstrom / AC)?',
      a: [
        'Serienmäßig mit bis zu 11 kW (optional gab es zeitweise einen 22-kW-Onboard-Lader)',
        'Mit bis zu 350 kW Wechselstrom aus jeder Haushaltssteckdose',
        'Ausschließlich per Induktionsmatte unter dem Kofferraum',
        'Gar nicht über AC, sondern nur über Gleichstrom'
      ],
      exp: 'An Typ-2-Wallboxen zieht der Onboard-Charger serienmäßig dreiphasig 11 kW; viele Kunden orderten den 22-kW-Lader für öffentliche AC-Säulen.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Was ermöglicht der serienmäßige „Porsche Charging Planner“ im Taycan-Navigationssystem?',
      a: [
        'Er plant die schnellste Route inklusive optimaler Schnellladestopps und heizt/kühlt die Batterie vor Ankunft exakt auf Wohlfühltemperatur vor',
        'Er reserviert automatisch einen kostenlosen Ölwechseltermin',
        'Er steuert die Autobahn-Mautstellen manuell an',
        'Er regelt die Geschwindigkeit automatisch auf maximal 80 km/h herunter'
      ],
      exp: 'Das automatische Batterievorkonditionieren vor Erreichen des HPC-Laders stellt sicher, dass ab der ersten Sekunde die maximale Ladeleistung anliegt.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Was bedeutet bei Porsche die Funktion „Plug & Charge“ an kompatiblen Schnellladesäulen (z. B. IONITY / Porsche Charging Lounge)?',
      a: [
        'Man steckt einfach das Ladekabel ein; Authentifizierung und Abrechnung erfolgen vollautomatisch über das Auto ohne App oder Ladekarte',
        'Das Auto füllt automatisch Kühlwasser nach',
        'Das Fahrzeug fährt selbsttätig an die freie Säule',
        'Es aktiviert 400 PS Mehrleistung während des Parkens'
      ],
      exp: 'Nach dem ISO-15118-Standard tauscht der Taycan verschlüsselte Zertifikate mit der Ladesäule aus, sobald der Stecker verriegelt.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Welches sportliche Topmodell des Taycan übertrumpfte Anfang 2024 den bisherigen Nürburgring-Rekord des Turbo S (7:33 Min) und fuhr die Nordschleife in 7:07,55 Minuten?',
      a: [
        'Porsche Taycan Turbo GT (mit Weissach-Paket)',
        'Porsche Taycan 4 Cross Turismo',
        'Porsche Taycan Basis RWD',
        'Porsche Taycan Black Edition'
      ],
      exp: 'Entwicklungsfahrer Lars Kern fuhr im Vorserien-Taycan Turbo GT mit Weissach-Paket über 26 Sekunden schneller als zuvor im Taycan Turbo S – und schneller als der damalige Tesla Model S Plaid Track Pack.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Wie schnell beschleunigte bereits der erste Taycan Turbo S (2019/2020) mithilfe der Launch Control von 0 auf 100 km/h?',
      a: [
        'In 2,8 Sekunden (seit Facelift 2024 sogar 2,4 s bzw. 2,2 s als Turbo GT)',
        'In 5,9 Sekunden',
        'In 1,1 Sekunden',
        'In 8,4 Sekunden'
      ],
      exp: 'Das entscheidende Highlight bei Porsche: Diese 2,8-Sekunden-Sprints ließen sich dank effizienter Motorkühlung über zehnmal direkt hintereinander ohne Leistungsverlust reproduzieren!'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Wie wird beim Taycan die Fahrmodus-Auswahl (Normal, Sport, Sport Plus, Range, Individual) am bequemsten direkt im Blickfeld bedient?',
      a: [
        'Über den runden „Mode-Schalter“ direkt unten rechts am Lenkrad (im Paket Sport Chrono)',
        'Über einen Zughebel unter dem Beifahrersitz',
        'Durch dreimaliges Hupen',
        'Über eine App am Beifahrertelefon'
      ],
      exp: 'Analog zum 911 und 918 Spyder sitzt der Drehschalter ergonomisch am Lenkradkranz, damit beide Hände am Steuer bleiben können.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Welche Funktion erfüllt der Fahrmodus „Range“ im Porsche Taycan?',
      a: [
        'Er optimiert Aerodynamik-Kühlerklappen, Luftfeder-Höhe, Höchstgeschwindigkeit (standardmäßig ca. 90–140 km/h wählbar), Klimatisierung und Antriebsverteilung auf maximale Reichweite',
        'Er deaktiviert alle Airbags für leichteres Fahren',
        'Er schaltet auf 100 % Hinterradantrieb im Drift',
        'Er lädt die Batterie durch den Benzintank auf'
      ],
      exp: 'Im Range-Modus werden bei Allradmodellen zudem primär nur ein Motor (meist der vordere bzw. hocheffizientere Teilstrang im älteren/neueren System) genutzt und das Fahrwerk tiefer abgesenkt.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Aus welchem Werkstoff besteht nahezu die gesamte äußere Karosseriehaut (Türen, Hauben, Dach, Kotflügel) des Porsche Taycan?',
      a: [
        'Überwiegend Aluminium (Mischbauweise aus Alu + hochfestem Stahl für die Sicherheitszelle)',
        'Unbehandeltes Gusseisen',
        'Vollständiges Buchenholz',
        'Komplett durchsichtiges Polycarbonat'
      ],
      exp: 'Die vollverzinkte Leichtbau-Karosserie setzt außen flächig auf Aluminium-Bleche und -Gussschalen, um das Batteriegewicht bestmöglich auszugleichen.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Wie heißt das exklusive Schnellladenetzwerk, das Porsche selbst entlang europäischer Hauptreiserouten mit eigenem Lounge-Konzept aufbaut (z. B. Bingen, Würzburg, Ingolstadt)?',
      a: [
        'Porsche Charging Lounge',
        'Porsche Supercharger Box',
        'Stuttgarter Zapf-Lounge',
        'Zuffenhausen HyperFuel'
      ],
      exp: 'In den rund um die Uhr zugänglichen Porsche Charging Lounges (mit bis zu 300–400 kW Säulen) warten exklusive Kaffee-, Snack- und Sanitärbereiche auf Taycan- und Macan-Fahrer.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Welche Bremse saß beim ersten Taycan Turbo (ohne S) serienmäßig hinter den Felgen – erkennbar an den weißen Bremssätteln mit Wolframcarbid-Beschichtung?',
      a: [
        'PSCB (Porsche Surface Coated Brake)',
        'Trommelbremse Typ Standard',
        'Mechanische Seilzugbremse',
        'Holzklotzbremse'
      ],
      exp: 'Die PSCB kombiniert Graugussscheiben mit einer extrem harten Wolframcarbid-Schicht – sie bleiben spiegelblank, rosten nicht und produzieren kaum Bremsstaub.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Warum nutzt Porsche beim Taycan nahezu für jedes Alltagsbremsen vorrangig die Elektromotoren statt der Reibbremse?',
      a: [
        'Weil rund 90 % der Alltagsbremsungen über Rekuperation Energie direkt zurück in den Akku speisen – die Scheibenbremsen werden kaum verschlissen',
        'Weil der Taycan gar keine mechanischen Bremsbeläge besitzt',
        'Weil die Bremsscheiben sonst nach 500 km schmelzen würden',
        'Weil das Gesetz verbietet, ab 50 km/h mechanisch zu bremsen'
      ],
      exp: 'Bis zu einer bestimmten Verzögerung spüren Fahrer keinerlei Übergang zwischen Rekuperation und Reibbremse („Blending“); allerdings empfiehlt Porsche gelegentliches Freibremstraining gegen Flugrost.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Was verändert beim Taycan Facelift 2024 rein äußerlich die Front besonders beim Turbo und Turbo S?',
      a: [
        'Eigenständige schärfere Frontschürzen mit neuen HD-Matrix-Scheinwerfern (flacher ohne tiefe Tränensäcke „Air Curtains“ wie beim Ur-Modell) und Turbonit-Wappen',
        'Runde Retro-Scheinwerfer wie vom Käfer',
        'Ein riesiger verchromter Kühlergrill über die volle Höhe',
        'Klappscheinwerfer aus den 1980ern'
      ],
      exp: 'Flachere, waagerecht integrierte HD-Matrix-LED-Scheinwerfer mit über 32.000 Pixeln pro Seite sowie der metallische Farbton „Turbonit“ setzen Turbo-Varianten neu ab.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Welches Detail leuchtet am Heck des neuen Taycan (ab Modelljahr 2025) erstmals als Wunschoption?',
      a: [
        'Ein dreidimensionaler „PORSCHE“-Schriftzug in Glasoptik im durchgehenden Leuchtenband, der beleuchtet werden kann (inkl. Willkommens-/Abschiedsanimation)',
        'Zwei blaue Rundumleuchten am Spoiler',
        'Ein digitales Preisschild',
        'Ein Laserprojektor für Filminhalte auf die Autobahn'
      ],
      exp: 'Die beleuchtete „PORSCHE“-Typografie im nahtlosen Lichtband bildet abends eine markante neue Lichtsignatur.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Welcher Langstrecken-Weltrekord gelang dem ersten Taycan Cross Turismo im Guinness World Records Jahr 2021/2022 in Sachen Höhenmeter?',
      a: [
        'Die größte jemals mit einem E-Auto bewältigte Höhendifferenz (4.842,967 m von -541 m in der Eagle Mine Michigan bis auf den Pikes Peak 4.302 m)',
        'Die erste Fahrt quer über den Pazifik per Ponton',
        'Der tiefste Tauchgang unter dem Ärmelkanal ohne Straße',
        'Das schnellste Erklimmen des Mount Everest'
      ],
      exp: 'Ein Taycan Cross Turismo fuhr 2021 unter Tage in Michigan bis auf über 540 m unter Null und meisterte dieselbe Reise bis auf über 4.300 m Höhe am Pikes Peak.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'easy',
      q: 'Wie wird beim elektrischen Taycan die klassische mechanische Handbremse bzw. Parksperre aktiviert?',
      a: [
        'Über das kleine „P“-Taste neben dem Wählhebel bzw. automatisch beim Öffnen der Fahrertür / Abstellen',
        'Über einen großen Chrom-Handbremshebel zwischen den Sitzen',
        'Über ein Fußpedal links außen',
        'Indem man den 1. Gang manuell einlegt'
      ],
      exp: 'Der kleine Gang-Wahlhebel rechts vom Lenkrad (D / N / R) sitzt dort wie beim 918 Spyder; „P“ aktiviert zuverlässig die elektrische Parkbremse.'
    },

    // --- PORSCHE TAYCAN: MID (34) ---
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Wie hoch liegt die maximale Rekuperationsleistung (Energierückgewinnung beim Bremsen) des ursprünglichen Taycan (2019) vs. des Facelifts 2024?',
      a: [
        'Ursprünglich bis zu 265–290 kW, ab Facelift 2024 sogar bis zu 400 kW',
        'Konstant maximal 45 kW bei beiden Generationen',
        'Genau 1.000 kW ab 2019',
        '15 kW im Normalmodus, 30 kW im Sportmodus'
      ],
      exp: 'Die 400 kW des Facelifts sind ein Spitzenwert im Pkw-Bau – sogar bei hohen Geschwindigkeiten fließen gewaltige Ströme bremsend zurück in die Zelle.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Welchen entscheidenden Bauteilvorteil gegenüber dem damals häufigen Asynchronmotor (ASM) nutzt Porsche an Vorder- und Hinterachse des Taycan?',
      a: [
        'Permanenterregte Synchronmaschinen (PSM) mit kompakter Hairpin-Wicklung',
        'Gleichstrom-Bürstenmotoren mit Kohlebürsten',
        'Linearmotoren im Unterboden',
        'Reine Reluktanzmotoren ohne Kupfer'
      ],
      exp: 'PSM ermöglichen dauerhaft abrufbare hohe Leistung, kompakte Baugröße und hohe Effizienz, während die Hairpin-Kupferstäbe den Füllfaktor im Stator auf rund 70 % erhöhen.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Welche zwei Bruttokapazitäten bot die Hochvolt-Batterie in der ersten Taycan-Generation (J1.I, 2019–2023)?',
      a: [
        '79,2 kWh (Performance-Batterie) und 93,4 kWh (Performance-Batterie Plus)',
        '50,0 kWh und 120,0 kWh',
        '42,0 kWh und 68,5 kWh',
        '98,0 kWh und 150,0 kWh'
      ],
      exp: 'Netto nutzbar waren beim großen „Plus“-Akku zunächst 83,7 kWh – das Gewicht der 33 Zellmodule (je 12 Pouch-Zellen) betrug rund 630 kg.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Auf welche Brutto- und Nettokapazität wuchs die große „Performance-Batterie Plus“ mit dem Taycan-Facelift 2024 (J1.II) bei nahezu gleichem Gewicht an?',
      a: [
        '105 kWh brutto (97 kWh netto) – statt zuvor 93,4 kWh brutto',
        '140 kWh brutto (130 kWh netto)',
        '82 kWh brutto (75 kWh netto)',
        '200 kWh brutto (185 kWh netto)'
      ],
      exp: 'Durch verbesserte Zellchemie stieg die Kapazität der Plus-Batterie spürbar, während der neue Akku rund 9 kg leichter wurde als sein Vorgänger (Basisbatterie wuchs auf 89 kWh brutto / 82,3 kWh netto).'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Wie löste Porsche beim 800-Volt-Taycan das Problem vieler älterer 400-Volt-Schnellladesäulen (z. B. alte Tesla Supercharger V2/V3 oder ältere 50-kW-Triple-Charger)?',
      a: [
        'Über einen fahrzeuginternen Hochvolt-DC-Booster (Onboard-DC-Lader), der die 400 Volt der Säule auf die ~800 Volt der Batterie hochtransformiert',
        'Durch mechanisches Umschalten der Batterie in zwei 400V-Hälften',
        'Der Taycan konnte gar keine 400V-Säulen nutzen',
        'Durch einen mitgeführten Benzingenerator im Frunk'
      ],
      exp: 'Serienmäßig mit 50 kW (und gegen Aufpreis bzw. im Facelift serienmäßig mit 150 kW) hebt der Booster 400V-DC-Säulen passgenau auf das hohe Akkuniveau an.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Was ist technisch die „Hairpin-Wicklung“ in den Elektromotoren des Porsche Taycan?',
      a: [
        'Haarnadel-förmig gebogene rechteckige Kupferstäbe statt runder Einzeldrähte im Stator für maximale Packungsdichte und bessere Wärmeabfuhr',
        'Dünne Aluminiumfolie als Rotor-Isolation',
        'Ein Federmechanismus für die Ladeklappen',
        'Eine Speichen-Geometrie der Aerofelgen'
      ],
      exp: 'Weil rechteckige Kupferflachdrähte eng nebeneinander passen (ca. 70 % Kupferfüllgrad statt ~45–50 % bei Runddraht), steigt das Drehmoment bei identischem Bauvolumen drastisch.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Wie tief ist beim Taycan der cw-Wert (Luftwiderstandsbeiwert) der serienmäßigen Karosserie mindestens?',
      a: [
        'Ab ca. cw 0,22 (beim Turbo sogar extrem glatt mit aktiven Kühlluftklappen)',
        'Ca. cw 0,48 wie bei einem Sport-SUV',
        'Genau cw 0,11 wie bei einem Solarrennfahrzeug',
        'Ca. cw 0,35 wie bei einem Geländewagen'
      ],
      exp: 'Aktive Kühlluftklappen, Air Curtains, ein vollflächig verkleideter Unterboden samt Heckdiffusor und ausfahrbarem Spoiler drücken den cw-Wert auf hervorragende 0,22.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Was schaltet beim Taycan der „Push-to-Pass“-Button im neuen Facelift (2024) frei?',
      a: [
        'Für jeweils 10 Sekunden bis zu 70 kW zusätzliche Mehrleistung per Tastendruck direkt im Mode-Schalter',
        'Eine blinkende Lichthupe für den Überholvorgang',
        'Die Deaktivierung des vorderen Sicherheitsabstandswarners',
        'Automatischen Spurwechsel ohne Blinken'
      ],
      exp: 'Inspiriert aus dem Rennsport (Formel E „Attack Mode“) liefert Push-to-Pass mit Countdown im Kombiinstrument auf Knopfdruck sofort maximalen Überholschub.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Wieso bietet der Taycan Turbo GT serienmäßig beim Aktivieren des „Attack Mode“ sogar kurzfristig noch mehr Power als den regulären Overboost?',
      a: [
        'Er schaltet 120 kW zusätzlich für 10 Sekunden frei (bis zu 760 kW regulär / 815 kW Spitzen-Launch-Leistung)',
        'Er öffnet einen zusätzlichen Benzin-Einspritzer',
        'Er lässt kurzzeitig Reifengas entweichen',
        'Er reduziert das Fahrzeuggewicht um 200 kg durch Klappenöffnung'
      ],
      exp: 'Im Unterschied zu den anderen Varianten (70 kW Push-to-Pass) pusht der Turbo GT dank seines extrem leistungsstarken 900-Ampere-Siliziumkarbid-Pulswechselrichters an der Hinterachse noch stärker.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Welche zwei unterschiedlichen Halbleiter-Materialien nutzt der Heck-Pulswechselrichter (Inverter) des Taycan Turbo GT bzw. des gelifteten Modells vs. Ur-Taycan?',
      a: [
        'Siliziumkarbid (SiC) statt klassischem Silizium für drastisch geringere Schaltverluste und höhere Effizienz',
        'Germanium-Röhren statt Transistoren',
        'Reines Blei-Zinn-Lot ohne Halbleiter',
        'Diamant-Superleiter bei minus 200 Grad'
      ],
      exp: 'Siliziumkarbid verträgt höhere Spannungen, Temperaturen und Schaltfrequenzen mit minimalen Wärmeverlusten – beim Turbo GT fließen bis zu 900 Ampere über die SiC-Leistungselektronik!'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Wie verhindert Porsche im Winter oder auf Langstrecken im Taycan Reichweitenverluste durch die Innenraumheizung?',
      a: [
        'Durch eine intelligente Wärmepumpe, die Abwärme des Antriebs und der Batterie zum Heizen der Kabine nutzt (ab MJ 2021/2025 stark optimiert/Serie)',
        'Durch eine Diesel-Standheizung unter dem Beifahrersitz',
        'Indem die Sitzheizung im Wintermodus gesperrt bleibt',
        'Durch das Verbot von Gebläseluft oberhalb von 15 Grad'
      ],
      exp: 'Die über ein komplexes Ventilnetz verschaltete Wärmepumpe gewinnt thermische Verluste von Motoren, Ladegeräten und Batterie zurück.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Welche Besonderheit bietet beim neuen Taycan (2024) das optionale „Porsche Active Ride“ Fahrwerk (nur für Allradmodelle)?',
      a: [
        'Vier aktive Einkammer-Luftfederdämpfer mit eigenen Hydraulik-Aktuatoren pro Rad – sie halten die Karosserie völlig horizontal (kein Wanken/Nicken), überkompensieren Kurvenneigung und heben den Einstieg blitzschnell um 55 mm an',
        'Komplett mechanische Blattfedern ohne Öldämpfung',
        'Zwei manuelle Drehknöpfe unter dem Radhaus für Sommer/Winter',
        'Eine reine Tieferlegung bis zum Bodenkontakt ohne Federweg'
      ],
      exp: 'Jeder Dämpfer ist an eine elektrisch angetriebene Hydraulikpumpe angebunden – in Sekundenbruchteilen drückt oder zieht das Rad gezielt gegen Quer-, Nick- und Bodenwellenkräfte an!'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Warum sitzt im ursprünglichen Taycan (und vielen Elektroautos) in den Standard-Einstellungen die Rekuperation beim Gaswegnehmen (Segeln) viel schwächer als im sogenannten „One-Pedal-Driving“ anderer Hersteller?',
      a: [
        'Weil Porsche bewusst den Fokus auf effizientes „Segeln“ (Ausrollen ohne Motorbremsverlust) legt und die volle Rekuperation präzise über das Bremspedal dosiert',
        'Weil das Getriebe sonst beim Ausrollen blockieren würde',
        'Weil Porsche-Kunden das Bremspedal mechanisch ölen müssen',
        'Weil die Batterie über das Gaspedal nicht geladen werden kann'
      ],
      exp: 'Aus physikalischer Sicht kostet jedes Umwandeln von Bewegungsenergie in Strom und wieder zurück Wandlungsverluste; freies Rollen spart Energie, und die Rekuperationsstärke lässt sich per Taste am Lenkrad zudem zuschalten.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Wie viele der typischen 24-Stunden-Rundenzeit / Langstrecken-Testleistung schaffte ein Vorserien-Taycan im August 2019 in Nardò (Italien) innerhalb von 24 Stunden inklusive Ladepausen?',
      a: [
        'Exakt 3.425 Kilometer (Durchschnitt ca. 195–215 km/h Fahrtempo bei über 40 °C Außentemperatur)',
        'Genau 1.120 Kilometer mit maximal 120 km/h',
        'Nur 640 Kilometer wegen Akku-Überhitzung',
        'Über 6.500 Kilometer mit einer einzigen Akkuladung'
      ],
      exp: 'Auf dem Hochgeschwindigkeitsoval von Nardò bewies Porsche vor Marktstart bei über 42 °C Asphalttemperatur, dass der Taycan vollgasfest für schnelle Langstrecken taugt.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Was ist beim originalen Taycan (J1.I) und im Facelift das maximale Drehmoment des Turbo S an der Achse (inkl. Übersetzung/Antriebsstrang)?',
      a: [
        'Rund 1.050 Nm (vor Facelift) bzw. ca. 1.110 Nm Motordrehmoment mit Launch Control (ab 2024)',
        'Genau 320 Nm',
        'Nur 180 Nm wegen des leichten Getriebes',
        'Über 5.000 Nm direkt an einem einzelnen Vorderrad'
      ],
      exp: 'Durch die 15,5:1-Übersetzung im 1. Gang wirkt am Hinterrad im Sprint zudem ein gigantisches Raddrehmoment von deutlich über 10.000 Nm!'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Wie unterscheidet sich der Antrieb des Taycan Cross Turismo / 4S je nach Batteriepaket in der ersten Generation?',
      a: [
        'Der kleinere Akku (79,2 kWh) hat eine etwas niedrigere Spitzenleistung und maximal 225 kW Ladeleistung, während der Plus-Akku (93,4 kWh) bis 270 kW lädt',
        'Mit dem großen Akku verliert er den vorderen Motor',
        'Der kleine Akku hat eine 24V-Bleibatterie als Traktionsspeicher',
        'Beide unterscheiden sich technisch gar nicht, nur im Softwaremenü'
      ],
      exp: 'Da bei kleinerem Energiegehalt dieselbe C-Rate weniger absolute kW ergibt, durfte nur die größere Performance-Batterie Plus bis zu 270 kW bzw. später 320 kW ziehen.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Welche Funktion hat die „Vorkonditionierung“ über den Charging Planner genau im chemischen Akku-Inneren?',
      a: [
        'Sie wärmt die Batterie vor dem Ladevorgang auf ideal ca. 25–35 °C (beim Facelift teils früher auf ~15 °C optimiert), um Lithium-Plating an der Graphit-Anode zu vermeiden',
        'Sie erhöht die Säurekonzentration durch Schütteln',
        'Sie entlädt die Zellen komplett auf 0 % vor der Ladesäule',
        'Sie polt Plus- und Minuspol für schnelles Laden um'
      ],
      exp: 'Kaltes Schnellladen mit Hunderten kW würde metallisches Lithium an der Anode abscheiden und die Zelle dauerhaft schädigen – durch Vortemperierung nimmt der Akku 300+ kW klaglos an.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Welchen Guinness-Weltrekord hielt Porsche-Instruktor Dennis Retera mit einem serienmäßigen Taycan RWD Ende 2020 auf dem Hockenheimring?',
      a: [
        'Den längsten ununterbrochenen Drift eines Elektrofahrzeugs (42,171 Kilometer / 210 Runden über 55 Minuten am Stück)',
        'Die langsamste Runde unter 3 km/h',
        'Den weitesten Sprung über 12 Busse',
        'Das schnellste Rückwärtseinparken im Slalom'
      ],
      exp: 'Auf der 200-Meter-Kreisbahn im Porsche Experience Center Hockenheim hielt der heckgetriebene Taycan fast eine volle Stunde den Driftwinkel stabil.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Was ist beim Taycan GTS (erstmals ab Ende 2021 erhältlich) bezüglich der Reichweite historisch bedeutsam gewesen?',
      a: [
        'Er war der erste Taycan, der laut offiziellem WLTP-Zyklus über 500 Kilometer Reichweite (504 km) übersprang',
        'Er schaffte exakt 180 km wegen extra kurzer Übersetzung',
        'Er hatte gar keine Reichweitenanzeige mehr',
        'Er besaß einen Solar-Flügel für unendliche Fahrt'
      ],
      exp: 'Durch eine optimierte Abkoppelstrategie des vorderen Motors und Effizienzupdates knackte der Taycan GTS Ende 2021 als Erster der Baureihe die symbolische 500-km-Marke.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Welches kleine aerodynamische Hilfsmittel schaltet der Taycan oberhalb von rund 90 km/h (und zweistufig bei ~160/200 km/h) je nach Fahrmodus an der Limousine zu?',
      a: [
        'Einen aktiv ausfahrenden Heckspoiler in der Heckklappe',
        'Vier vertikale Seitenflossen auf der Motorhaube',
        'Ausfahrbare Radkappen vor den Rückspiegeln',
        'Einen bremsenden Unterbodenschild'
      ],
      exp: 'Der mehrstufig ausfahrbare Heckspoiler senkt bei mittlerem Autobahntempo den Luftwiderstand (Reichweite) und erhöht bei hohem Speed oder Sport Plus den Anpressdruck an der Hinterachse.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Aus wie vielen digitalen Displays kann das Cockpit eines voll ausgestatteten Porsche Taycan im Maximum bestehen?',
      a: [
        'Aus bis zu vier Bildschirmen (Kombiinstrument, Zentral-Screen, Klimabedien-Touchpad unten + Beifahrer-Display – plus optional Head-up-Display)',
        'Maximal ein einfarbiges OLED-Band',
        'Zehn getrennte Röhrenmonitore',
        'Gar keines, außer einer Handyhalterung'
      ],
      exp: 'Insbesondere die abgewinkelte Glasoberfläche der Mittelkonsole mit dem 8,4-Zoll-Touchpad inkl. Handschrifterkennung und haptischem Feedback ersetzte fast alle herkömmlichen Tasten.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Wie wirkt sich das Facelift 2024 auf den maximalen WLTP-Reichweitenwert des Taycan (Hinterradantrieb mit großer Batterie) aus?',
      a: [
        'Er steigt um rund 35 % auf bis zu 678 km WLTP',
        'Er bleibt exakt bei 380 km',
        'Er sinkt auf 310 km wegen stärkerer Motoren',
        'Er liegt bei genau 1.250 km WLTP'
      ],
      exp: 'Bis zu 678 km WLTP (je nach Ausstattung) katapultierten den gelifteten Taycan trotz Sportwagen-Silhouette in die Spitzenklasse der E-Reichweiten.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Welches bekannte Bauteil von klassischen Porsche-Schaltwagen sucht man in der Mittelkonsole des Taycan auch deshalb vergeblich, weil man bei den Lüftungsdüsen eine ganz neue Idee umsetzte?',
      a: [
        'Mechanische Lamellen-Verstellhebel – stattdessen werden die Luftströme beim „Advanced Climate Control“ rein digital über das Touchdisplay elektronisch gesteuert',
        'Eine Heizung für die Windschutzscheibe',
        'Eine manuelle Handkurbel für die Seitenfenster',
        'Einen Aschenbecher direkt über dem Tacho'
      ],
      exp: 'Keine Lamellenhebel stören die ruhige Linienführung im Armaturenbrett: Elektrische Stellmotoren verteilen den Luftstrom auf Fingertipp als „Diffus“ oder „Fokussiert“.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Warum setzt Porsche beim Taycan hinten breitere Reifen als vorn (Mischbereifung, z. B. bis 305/30 R21) ein?',
      a: [
        'Für mehr Traktion des stärkeren Heckmotors sowie stabile Querbeschleunigung und sportliches Porsche-Fahrverhalten',
        'Weil es vorn gar keine Radaufhängung gibt',
        'Nur zur Senkung des Luftwiderstands an der Hinterachse',
        'Damit man hinten höhere Bordsteine hinauffahren kann'
      ],
      exp: 'Da der Hauptteil des Vortriebs und der Gewichtsverlagerung beim Herausbeschleunigen auf die Hinterachse wirkt, überträgt dort breiteres Gummi das gewaltige E-Drehmoment sauber auf den Asphalt.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Welche Ladezeit von 10 % auf 80 % (State of Charge) verspricht Porsche im optimalen Fall für den überarbeiteten Taycan ab 2024?',
      a: [
        'Rund 18 Minuten (selbst bei kühleren Außentemperaturen von 15 °C fast unverändert schnell)',
        'Etwa 65 Minuten',
        'Unter 3 Minuten',
        'Genau 4 Stunden'
      ],
      exp: 'Mit bis zu 320 kW Spitzenleistung und einer sehr breiten, flach abfallenden Ladekurve (oft noch über 200 kW bis 65–70 %!) lädt der J1.II schneller nach als fast jedes Serien-E-Auto in Europa.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Welche zwei Optionen bietet Porsche im Taycan gegen klassischen Ledergeruch bzw. für nachhaltige Innenräume serienmäßig oder als Alternative?',
      a: [
        'Eine komplett lederfreie Ausstattung mit „Race-Tex“ (Mikrofaser aus recycelten Polyesterfasern) und ECONYL-Bodenbelägen aus alten Fischernetzen',
        'Ein Innenraum komplett aus unlackiertem Rohstahl',
        'Reine Kunststoffsitze wie in Straßenbahnen',
        'Sitze gefüllt mit echtem Kies'
      ],
      exp: 'Wer möchte, erhält beim Taycan ein vollwertiges Luxus-Sportwagen-Interieur komplett ohne Leder tierischen Ursprungs (inkl. Club-Leder Olea als gegerbte Olivenblatt-Alternative).'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Welchen praktischen Schutz besitzt der Hochvoltakku des Taycan ganz unten am Fahrzeugboden?',
      a: [
        'Eine rund 3 mm dicke, hochfeste Aluminium-Schutzplatte sowie umlaufende Strangpress-Crashprofile gegen Aufsetzer und Seitenaufprall',
        'Gar keinen – die Zellen liegen frei sichtbar über der Straße',
        'Eine aufblasbare Gummischürze',
        'Eine weiche Filzmatte ohne Metall'
      ],
      exp: 'Der Batterierahmen ist struktureller Teil der Fahrzeugsteifigkeit und schützt die Zellen sicher bei Bordstein- oder Fahrbahn-Aufsetzern.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Wodurch sticht beim Taycan Turbo GT „ohne Weissach-Paket“ vs. „mit Weissach-Paket“ die Rücksitzbank hervor?',
      a: [
        'Mit Weissach-Paket entfallen die Rücksitze komplett zugunsten einer leichten Carbon-Ablage (rund 70–75 kg Gesamtgewichtersparnis zum Turbo S)',
        'Das Weissach-Paket baut zwei Zusatz-Notsitze in den Kofferraum ein',
        'Beide besitzen elektrische Liegesitze hinten mit Massage',
        'Der Turbo GT ist generell ein Einsitzer mit mittigem Lenkrad'
      ],
      exp: 'Neben dem Wegfall der Rücksitzbank spart der Turbo GT Weissach unter anderem an Dämmmaterial, der analogen Sport-Chrono-Uhr, den Beifahrer-Ladeklappen-Antrieben (nur manuell auf einer Seite!) und Teppichen.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Was ermöglicht beim Taycan in manchen Märkten bzw. beim Turbo S die Option „Hinterachslenkung“?',
      a: [
        'Ein kleinerer Wendekreis im Parkhaus (ca. 11,2 m statt 11,7 m) sowie noch spontaneres Einlenken auf der Rennstrecke',
        'Das Fahren exakt seitwärts wie ein Krebs mit 90°-Radeinschlag',
        'Die automatische Reifendruckerhöhung',
        'Das Abschleppen eines zweiten Autos über die Hinterachse'
      ],
      exp: 'Bis zu ca. 2,8 Grad schlagen die Hinterräder beim Taycan ein – im Alltag spürt man das vor allem in engen Altstadt-Parkhäusern trotz knapp 5 Metern Fahrzeuglänge.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Wie wird beim Taycan Turbo GT auf dem Fahrerdisplay oder im Lenkrad der „Attack Mode“ aktiviert (als Pendant zu Push-to-Pass)?',
      a: [
        'Sowohl über den Push-to-Pass-Taster als auch besonders bequem über das rechte Lenkrad-Paddle (Schaltwippe)',
        'Nur per Sprachbefehl „Attacke!“',
        'Durch gleichzeitiges Ziehen beider Türgriffe',
        'Über eine App auf dem Smartphone'
      ],
      exp: 'Damit auf dem Track nicht umgegriffen werden muss, legt das rechte Lenkrad-Paddle – direkt aus dem 99X Electric Formel-E-Renner entlehnt – sofort die extra 120 kW nach.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Wie lange dauert die offizielle Garantie von Porsche speziell auf die Hochvoltbatterie des Taycan (hinsichtlich Mindestkapazität)?',
      a: [
        '8 Jahre oder bis zu 160.000 Kilometer (je nachdem, was zuerst eintritt)',
        '2 Jahre oder 20.000 Kilometer',
        '1 Jahr ohne Kilometerbegrenzung',
        '25 Jahre unabhängig von der Laufleistung'
      ],
      exp: 'Das entspricht dem Branchenstandard für Hochvoltspeicher und sichert mindestens 70 % nutzbare Restkapazität über diesen Zeitraum ab.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Wie schnell ist ein moderner Taycan Turbo GT (2024) maximal abgeregelt (Höchstgeschwindigkeit)?',
      a: [
        '305 km/h (mit Weissach-Paket; ohne Weissach 290 km/h, während Turbo S bei 260 km/h endet)',
        '180 km/h elektronisch begrenzt',
        '210 km/h wie viele Wettbewerber',
        '410 km/h unbegrenzt'
      ],
      exp: 'Mit 305 km/h ist der Taycan Turbo GT mit Weissach-Paket das erste straßenzugelassene Serien-Elektroauto von Porsche jenseits der 300-km/h-Marke.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Welche zwei Arten von Stromanschluss sitzen im Kombistecker („CCS2“) an der Beifahrerseite des europäischen Taycan?',
      a: [
        'Oben Typ-2-Pins für AC-Wechselstrom (inkl. Steuerpins) + unten zwei große Gleichstrom-Kontakte (DC)',
        'Schuko-Haushaltsbuchse + USB-C',
        'CHAdeMO + Starkstrom CEE 32A rot',
        'Zwei Gleichstrom-Buchsen ohne Steuerleitung'
      ],
      exp: 'Auf der linken Fahrzeugseite findet sich meist nur ein Typ-2-AC-Port, rechts hingegen das vollwertige CCS-Combo-2-Inlet für AC und bis zu 320 kW DC.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'mid',
      q: 'Welche Funktion erfüllt der optionale „Porsche InnoDrive“ Assistent auf Überlandstraßen und Autobahnen?',
      a: [
        'Prädiktive Tempo- und Abstandsregelung anhand von Kartendaten, Kurvenradien, Kreisverkehren und Tempolimits bis zu 3 km im Voraus',
        'Er misst die Öltemperatur des Akkus und erhöht den Reifendruck',
        'Er steuert ein ferngesteuertes Begleitfahrzeug',
        'Er schaltet automatisch das Radio aus, sobald Regen einsetzt'
      ],
      exp: 'InnoDrive kennt Steigungen sowie enge Biegungen voraus und segelt bzw. rekuperiert rechtzeitig vor Ortseinfahrten oder Tempolimits.'
    },

    // --- PORSCHE TAYCAN: PRO (33) ---
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Wie lautet exakt die Übersetzung der beiden Gänge im hinteren Taycan-Getriebe der ersten Generation ungefähr?',
      a: [
        '1. Gang extrem kurz (~15,56:1 über Planetenradsatz) und 2. Gang direkt/lang (~8,05:1 für die Hinterachs-Endübersetzung)',
        '1. Gang 3,5:1 und 2. Gang 1,0:1',
        '1. Gang 40:1 und 2. Gang 20:1',
        'Beide Gänge identisch 9,0:1'
      ],
      exp: 'Das kompakte Zweiganggetriebe wiegt nur rund 16–70 kg komplett als Achsmodul inklusive Stirnrad-Differential und hält je nach Fahrmodus schon sehr früh oder erst bei ~80–110 km/h im 1. Gang.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Welche exakte Nennspannung (Nominal Voltage) besaß der 33-modulige „800-Volt“-Akku des ursprünglichen Taycan (396 Pouch-Zellen in 198s2p-Verschaltung)?',
      a: [
        '723 Volt Nennspannung (Spannungsbereich ca. 610 V leer bis 835 V voll)',
        'Exakt 800,0 Volt bei exakt 0 % und 800 Volt bei 100 %',
        '950 Volt leer und 1.200 Volt voll',
        '512 Volt Nennspannung'
      ],
      exp: 'Bei 198 Zellen in Reihe (198s2p) mal ca. 3,65 V Zell-Nennspannung ergibt sich ~723 V – geladen wird bei voller Batterie bis ca. 835 V („800V-Klasse“).'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Wie viele einzelne Pouch-Batteriezellen waren in der ursprünglichen großen Performance-Batterie Plus (93,4 kWh) des Taycan verschaltet?',
      a: [
        '396 Zellen (verteilt auf 33 Module à 12 Zellen)',
        '7.104 zylindrische Rundzellen vom Typ 18650',
        '96 prismatische Blöcke à 1 kWh',
        '12 große Blei-Gel-Module'
      ],
      exp: 'In der kleineren 79,2-kWh-Batterie reduzierte Porsche die Modulanzahl bei identischem Bauraum einfach von 33 auf 28 Module (336 Zellen).'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Wie heißt das 2024 beim großen Facelift im hinteren Pulswechselrichter des Taycan eingeführte neue Halbleiterdesign beim Basismodell vs. Turbo GT?',
      a: [
        'Die neue PSM-Hinterachsmaschine liefert bis zu +80 kW mehr bei rund 10 kg weniger Gewicht; im Basismodell arbeitet meist ein ~600A-Inverter, im Turbo GT ein 900A-SiC-Inverter',
        'Vorn wird auf Bürstenmotoren und hinten auf Luftturbinen gewechselt',
        'Es entfallen beim Facelift sämtliche Pulswechselrichter durch direkte Gleichstrom-Motoren',
        'Der vordere Inverter wird in den Frunk-Deckel geschraubt'
      ],
      exp: 'Neben höherer Leistungsdichte (mehr Drehmoment & höhere Effizienz im Stator) ermöglicht der SiC-Inverter im Turbo GT gewaltige Ströme bei kompaktem Bauraum.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Wie wird im Taycan beim 2-Gang-Getriebe an der Hinterachse konstruktiv zwischen dem 1. und dem 2. Gang umgeschaltet?',
      a: [
        'Ein Planetenradsatz mit schaltbarer Klauenkupplung (1. Gang) und einer nass laufenden Mehrscheiben-Lamellenkupplung (2. Gang + Overboost)',
        'Zwei manuelle Schaltgestänge am Unterboden',
        'Ein Fliehkraftgewicht wie beim Mofa',
        'Durch Umpolung des Elektromotors während der Fahrt'
      ],
      exp: 'Die Schaltung nutzt also sowohl eine Klauenkupplung für verlustfreien Kraftschluss im kurzen Gang als auch eine Lamellenkupplung für sanftes oder knackiges Hoch- und Zurückschalten.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Mit welchem maximalen elektrischen Systemdruck (bzw. Leistung) arbeiten die vier elektrohydraulischen Pumpen des „Porsche Active Ride“ Fahrwerks im neuen Taycan?',
      a: [
        'Jeder der vier Dämpfer hat eine kompakte Motor-Pumpen-Einheit direkt am Federbein, gespeist aus dem Hochvolt-Bordnetz (ca. 400V-Zwischenkreis / bis 5 kW pro Rad)',
        'Es handelt sich um rein pneumatische Luftsäcke mit 2 bar Druck vom 12V-Zigarettenanzünder',
        'Es nutzt eine einzige 1-kW-Pumpe vom Scheibenwischer',
        'Es funktioniert ausschließlich über passive Magnetflüssigkeit ohne Pumpen'
      ],
      exp: 'Anders als viele 48V-Stabilisatoren arbeitet Porsche Active Ride aktiv an der Zug- und Druckstufe jedes einzelnen Dämpfers mit bis zu 13 Hz Frequenz – fast alle Stabilisatoren können entfallen!'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Welche Funktion übernimmt im Allrad-Taycan die mechanische bzw. elektrische „Abkopplung“ der Vorderachse (vor allem im Range- oder Normal-Teillastbetrieb)?',
      a: [
        'Im Teillast-Cruisen wird der vordere Inverter stromlos bzw. verlustarm geregelt (ab J1 MJ 2021 optimierte Leerlaufregelung, im J1.II weiter verfeinert), statt mechanisch komplett abzukoppeln',
        'Der vordere Motor hebt die Räder 5 cm vom Asphalt ab',
        'Vorn sitzt beim Ur-Taycan gar kein Motor, sondern nur hinten',
        'Die vorderen Antriebswellen werden bei 50 km/h ausgekuppelt'
      ],
      exp: 'Genauer gesagt: Um Schleppmomente eines mitlaufenden Dauermagnet-PSM zu minimieren, erproben/regeln E-Antriebe Freilauf oder stromlos optimiertes Feldschwächen (beim Taycan J1 optimierte Porsche ab MJ 2021/2022 den Vorderachs-Inverter so, dass die vordere E-Maschine im Teillastbereich nahezu komplett stromlos abgeschaltet mitläuft).'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Welche zwei wichtigen Systemspannungen neben ~800 V und 12 V (Lithium-Eisenphosphat-Bordnetzbatterie!) gibt es im Taycan?',
      a: [
        'Eine 48-Volt-Ebene (u. a. für PDCC Sport Wankstabilisierung bei J1.I) sowie ca. 400 V für bestimmte Nebenaggregate wie den Kältemittelkompressor',
        'Eine 6-Volt-Ebene wie beim Ur-Käfer und 10.000 V für die LED-Scheinwerfer',
        'Ausschließlich 24 Volt Lkw-Spannung für alle Steuergeräte',
        'Gar keine 12V-Batterie mehr'
      ],
      exp: 'Bemerkenswert: Als 12V-Stützbatterie verbaut Porsche im Taycan keinen schweren Bleiakku, sondern eine leichte Lithium-Ionen-/LiFePO4-Batterie.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Wo ist beim ersten Taycan (2019–2023) die interne Modell-Typbezeichnung in der Porsche-Nomenklatur angesiedelt?',
      a: [
        '9J1 (Plattform J1; Nachfolger-Facelift weiter 9J1 II)',
        '992 E',
        '971 E',
        '95B'
      ],
      exp: 'Während der Panamera intern 971/976 und der elektrische Macan auf PPE-Basis intern XAB/H1 bzw. 95B/E3 (Cayenne) heißen, trägt der Taycan das werkinterne Kürzel „9J1“.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Wie lautet das Geheimnis hinter den „nur 15 kg“ oder mehreren Dutzend kg Gewichtsunterschied zwischen den Varianten – wieso wiegt eine vollausgestattete Taycan Turbo S Limousine rund 2,3 Tonnen?',
      a: [
        'Weil neben dem ca. 625–630 kg schweren Batteriepaket massive Gussknoten, große Bremsen, Luftfederung, zwei E-Maschinen und Akustikdämmung für 260 km/h nötig sind',
        'Weil der Fahrzeugrahmen aus massivem Blei zur Tieferlegung besteht',
        'Weil noch ein 400 kg schweres Schwungrad im Heck verbaut ist',
        'Weil die Felgen mit Quecksilber gefüllt sind'
      ],
      exp: 'Die leere Rohkarosse wiegt dank Alu-Stahl-Mix vergleichsweise wenig, doch Akku (~625 kg), doppelte E-Antriebseinheiten und Luxusausstattung summieren sich auf rund 2.295 kg DIN (J1.I Turbo S).'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Was ermöglicht beim „Thermal Management“ des Taycan die komplexe Verrohrung mit drei Pumpen und sechs Kühlmittelventilen?',
      a: [
        'Ein bedarfsgerechtes Koppeln oder Trennen der Kreisläufe von Batterie, E-Motoren, Leistungselektronik und Innenraum (z. B. um Wärme der Brems/Motor-Elektronik zum Vorheizen des Akkus zu nutzen)',
        'Das Einspritzen von Kühlflüssigkeit direkt auf die Bremsscheiben',
        'Einen gekühlten Wasserdurchfluss durch die Sitze im Fond',
        'Den direkten Ausstoß von heißem Wasserdampf über den Heckspoiler'
      ],
      exp: 'Muss der Akku vor dem Schnellladen erwärmt werden, sammelt das Thermomanagement jede verfügbare Abwärme der Inverter und Maschinen ein und schaltet bei Bedarf noch den Hochvolt-Zuheizer dazu.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Welchen chemischen Zelltyp und welchen Hauptzelllieferanten nutzte Porsche bei den J1.I-Taycan-Batterien (2019–2023)?',
      a: [
        'LG Chem / LG Energy Solution Pouch-Zellen mit NMC-622 bzw. NMC-712/811 Chemie (hoher Nickelanteil beim Facelift)',
        'CATL-LFP-Zellen (Lithium-Eisenphosphat) im Turbo S',
        'Panasonic-Rundzellen Typ 4680',
        'Natrium-Ionen-Blöcke von BYD'
      ],
      exp: 'Pouch-Zellen erlauben im sehr flachen Taycan-Unterboden hervorragende Wärmeabfuhr über Wärmeleitpaste direkt zur unteren Kühlplatte im Batteriegehäuse.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Wieso erreicht ein gelifteter Taycan (2024) seine 320 kW Ladeleistung an der Säule selbst dann zuverlässig, wenn moderne 400-kW-Säulen genutzt werden?',
      a: [
        'Weil bei ~750–800 Volt Akkuspannung ein 400-Ampere-Ladekabel (bzw. bis ~500A kurzzeitig) bereits 320+ kW überträgt, ohne dass Stecker und Kabel überhitzen',
        'Weil der Taycan mit zwei Kabeln gleichzeitig an beiden Seiten DC laden kann',
        'Weil ein Starkstromkabel ohne Kühlung 1.000 Ampere dauerhaft führt',
        'Weil der Strom kabellos über Bodenplatten fließt'
      ],
      exp: 'Gemäß CCS-Standard sind Kabel üblicherweise bei 500 A limitiert: An 400 V wären 500 A × 400 V maximal ~200 kW. Erst mit ~750 V Batteriepotential knackt man spielend 320 kW!'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Warum bremst ein Taycan bei voll aufgeladenem Akku (z. B. 100 % auf einem Berggipfel) kurzzeitig spürbar anders – bzw. wie verhindert Porsche eine Sicherheitslücke?',
      a: [
        'Bei 100 % SoC oder sehr kaltem Akku kann kaum Energie aufgenommen werden – das „Brake Blending“ übernimmt dann nahtlos über die hydraulischen Reibbremsen, sodass der Pedaldruck gleich bleibt',
        'Der Fahrer muss dann auf der Autobahn die Handbremse ziehen',
        'Das Auto begrenzt das Tempo auf 30 km/h',
        'Der Überschussstrom wird über Heizwiderstände auf dem Fahrzeugdach abgebrannt'
      ],
      exp: 'Das komplexe iBooster-/ESP-Bremssystem misst kontinuierlich das maximal erlaubte Lade-Rekuperationslimit der Batterie und ergänzt fehlende Bremskraft unmerklich hydraulisch.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Welches spezifische Wartungsintervall gilt beim elektrischen Taycan laut offiziellem Serviceplan dennoch für einen klassischen Bauteilwechsel?',
      a: [
        'Alle 2 Jahre bzw. nach festgelegter Laufleistung: Bremsflüssigkeit, Innenraum-/Aktivkohlefilter sowie alle 6 Jahre / spätestens bei Verschleiß die Bremsbeläge (und Check des 12V/HV-Systems)',
        'Alle 15.000 km Motorölwechsel und Zündkerzen',
        'Alle 30.000 km Zahnriemen am Hintermotor',
        'Gar keine Wartung jemals vorgesehen'
      ],
      exp: 'Obwohl Motoröl, Zündkerzen und Auspuff komplett wegfallen, müssen Bremsflüssigkeit (hygroskopisch!), Wischer, Filter und Dichtheits-/Unterbodenprüfungen regelmäßig durchgeführt werden.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Welcher frühe „Porsche 911“-Vergleich beim Nürburgring-Wert zeigt die enorme Fahrdynamik des Taycan Turbo S (J1.I 2019: 7:42 Min für die Vorserie / 7:33 Min mit Performance-Kit)?',
      a: [
        'Selbst die 2,3-Tonnen-Limousine von 2019 war auf der Nordschleife ähnlich schnell wie ein Porsche 911 GT3 (Generation 997) aus den späten 2000ern',
        'Er lag auf dem Niveau eines 60-PS-356 von 1955',
        'Er brauchte 11 Minuten wegen Überhitzung am Kesselchen',
        'Er fuhr die Runde in 4:50 Minuten'
      ],
      exp: 'Und der neue Taycan Turbo GT (2024) unterbot mit 7:07,55 Min sogar einen McLaren 720S und kam bedrohlich nah an aktuelle GT3-RS-Bestzeiten heran!'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Welche Besonderheit beim vorderen Elektromotor der ursprünglichen Taycan-Varianten unterscheidet den Taycan 4S vom Taycan Turbo / Turbo S?',
      a: [
        'Beim 4S hat die vordere E-Maschine eine kürzere aktive Eisenlänge (130 mm statt 160 mm beim Turbo) und einen 300A-Pulswechselrichter statt 600A vorn',
        'Der 4S hat vorn einen Verbrennungsmotor',
        'Der 4S hat vorn zwei statt einen Elektromotor',
        'Die Motoren sind identisch, nur die Software sperrt beim 4S den Rückwärtsgang'
      ],
      exp: 'Durch modulare Aktivlängen der Blechpakete im Elektromotor (z. B. 130 mm vs. 160 mm vorn, 160 mm vs. 210 mm hinten) konnte Porsche gezielt Leistung, Bauraum und Kosten skalieren.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Welche Funktion erfüllt der beim Taycan Turbo GT am Heck angebrachte „Gurney Flap“ auf dem feststehenden Carbon-Heckflügel?',
      a: [
        'Eine schmale senkrechte Abrisskante an der Flügelhinterkante, die bei geringem Gewicht deutlich mehr Abtrieb an der Hinterachse erzeugt',
        'Eine kleine Solarzelle für das Rücklicht',
        'Ein Griff zum manuellen Öffnen des Kofferraums',
        'Eine Antenne für die Ladeklappe'
      ],
      exp: 'Benannt nach Rennfahrer Dan Gurney, stabilisiert diese kleine Kante die Strömung auf der Unterseite des Tragflächenprofils am Heck.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Wie wird beim Taycan Turbo S (oder mit Option Hinterachslenkung + Sport Chrono) die maximale Beschleunigung von 0 auf 100 km/h über die „Launch Control“ eingeleitet?',
      a: [
        'Im Modus Sport / Sport Plus mit dem linken Fuß fest auf der Bremse und mit dem rechten Fuß voll aufs Fahrpedal treten – sobald „Launch Control aktiv“ erscheint, Bremse lösen',
        'Dreimal die Feststellbremse ziehen und danach den Warnblinker drücken',
        'Rückwärtsgang kurz einlegen und direkt in D schalten',
        'Über eine zweistufige Sprachaktivierung'
      ],
      exp: 'Während der kurzen Vorspannzeit (nur Sekundenbruchteile nötig!) werden alle Komponenten vorgespannt und für bis zu 2,5–10 Sekunden die volle Overboost-Leistung freigegeben.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Wie viele Kilowatt (kW) leistete das Ur-Topmodell „Taycan Turbo S“ (2019) im regulären Dauer-Betrieb versus im kurzzeitigen Overboost mit Launch Control?',
      a: [
        '460 kW (625 PS) Dauer-/Nennleistung – im Overboost bei Launch Control bis zu 560 kW (761 PS)',
        '200 kW normal und 300 kW Overboost',
        '700 kW dauerhaft und 1.500 kW Overboost',
        'Identisch 400 kW in allen Situationen'
      ],
      exp: 'Im 2024er Facelift sprang dieser Wert beim neuen Taycan Turbo S sogar auf bis zu 700 kW (952 PS) im Launch Control Overboost (und beim Turbo GT auf 760 / 815 kW)!'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Welche Besonderheit bietet beim Taycan (inkl. Cross Turismo) das große optionale „Panoramadach mit Variable Light Control“ (VLC)?',
      a: [
        'Eine schaltbare Flüssigkristall-Folie (PDLC) unterteilt das Glas in neun einzeln per Touch von „Klar“ auf „Matt / Milchig“ schaltbare Segmente ohne mechanisches Rollo',
        'Eingebaute Schiebefenster aus Sicherheitsplastik',
        'Eine mechanische Blechjalousie per Kurbel',
        'Zwei Solarmodule zur Verdunkelung bei Nacht'
      ],
      exp: 'So entsteht wahlweise voller Durchblick nach oben oder blendfreier Sonnenschutz im „Vorhang-Wischgesten-Modus“ über das Display, ohne Kopffreiheit für ein Rollo zu opfern.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Was verändert der „Gravel-Modus“ beim Taycan Cross Turismo im Detail?',
      a: [
        'Er hebt die Luftfederung auf +30 mm gegenüber der Limousine an und stimmt Gaspedal, PTM-Allradverteilung, PSM-Traktionskontrolle und Hinterachssperre speziell für losen Schotter und Schlamm ab',
        'Er verriegelt die Hinterachse komplett ohne Federung',
        'Er senkt das Auto auf -20 mm ab für Tiefschnee',
        'Er aktiviert Scheibenwischer im Dauerlauf auf Stufe 3'
      ],
      exp: 'Das schont auf unbefestigten Zufahrten zu Berghütten oder Parkplätzen Frontlippe sowie Batterie-Unterboden und maximiert Vortrieb auf losem Grund.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Welchen entscheidenden Vorteil bietet der „Hinterachs-Permanentmagnet-Motor“ im Taycan-Facelift (2024) bezüglich des Packaging / Gewichts?',
      a: [
        'Trotz bis zu 80 kW höherer Leistung im Vergleich zum Vorgänger wiegt die neue Hinterachseinheit rund 10,4 kg weniger bei identischem Bauraum',
        'Er passt jetzt auch quer in die Reserveradmulde',
        'Er braucht gar keine Kühlung durch Wasser mehr',
        'Er ersetzt gleichzeitig die hinteren Scheibenbremsen vollständig'
      ],
      exp: 'Optimierte Magnetanordnungen im Rotor, verbesserte Statorgeometrie und ein neuer Pulswechselrichter heben den Wirkungsgrad spürbar an.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Welcher typische Ladestrategie-Wert macht den Taycan für Langstrecken schneller als viele Modelle mit nominell größerer Batterie?',
      a: [
        'Seine extrem flache, lang anhaltende Schnellladekurve (auch bei 50 % SoC oft noch deutlich über 250–290 kW beim Facelift) durch das 800V-System',
        'Die Möglichkeit, auf der Fahrt per Induktion über Leitplanken zu laden',
        'Ein zweiter entnehmbarer Akku im Handschuhfach',
        'Ein eingebauter Diesel-Generator mit 80-Liter-Tank'
      ],
      exp: 'In unabhängigen Dauertests erreicht der Taycan dank hoher durchschnittlicher Ladeleistung („km pro Lade-Minute“) exzellente Gesamtreisezeiten.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Was ist beim Porsche Taycan unter dem Begriff „PDCC Sport“ (Porsche Dynamic Chassis Control Sport) zu verstehen?',
      a: [
        'Eine aktive elektromechanische Wankstabilisierung über 48V-Stellmotoren an den Stabilisatoren, die Seitenneigung in Kurven nahezu vollständig unterbindet',
        'Ein Soundsystem mit Subwoofer im Frunk',
        'Ein reines Sport-Lederlenkrad mit roten Nähten',
        'Eine spezielle Sport-Versicherungspolice von Porsche'
      ],
      exp: 'Bei Fahrzeugen mit dem ganz neuen 2024er „Porsche Active Ride“ übernimmt die radindividuelle aktive Hydraulik diese Aufgabe sogar noch schneller komplett ohne herkömmliche Querstabilisatoren.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Wie wird beim Porsche Taycan ein mögliches Batterie-Upgrade oder ein Zellmodultausch im Falle eines Defekts im Service ermöglicht?',
      a: [
        'Der Batterieträger unter dem Boden lässt sich als Ganzes abschrauben, öffnen und einzelne verschraubte/verklebte Zellmodule können gezielt in zertifizierten Porsche Zentren getauscht werden',
        'Bei einem defekten Modul muss die komplette Karosserie verschrottet werden',
        'Die Module sitzen zugänglich unter den Fußmatten vorn',
        'Der Akku kann vom Fahrer in 2 Minuten an der Tankstelle als Wechselbatterie gezogen werden'
      ],
      exp: 'Porsche baute weltweit spezialisierte Hochvolt-Batterie-Kompetenzzentren auf, um Reparaturen auf Modul-Ebene nachhaltig durchzuführen.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Welche Reichweiten-Schwachstelle der ganz frühen ersten Software-Generation (MJ 2020) behob Porsche später kostenlos per Werkstattrückruf/OTA-Update („u. a. uPdate 2022“)?',
      a: [
        'Bessere Entkopplung des vorderen Antriebsstrangs im Normal/Range-Modus, sparsameres Thermomanagement (Turbo/4S) und schnelleres Vortemperieren im PCM',
        'Das nachträgliche Anschweißen eines zweiten Daches',
        'Die Drosselung aller Turbo-Modelle auf 130 km/h',
        'Das Abschalten des zweiten Ganges auf Autobahnen'
      ],
      exp: 'Per großem Software-Update Mitte 2022 bekamen selbst die allerersten 2020er Taycan bis zu rund 50 km zusätzliche Praxis-Reichweite und deutlich schnellere PCM-Navigation.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Was verbirgt sich im Taycan bei den Reifenfreigaben unter dem „N“-Symbol auf der Reifenflanke (z. B. NF0)?',
      a: [
        'Speziell von Porsche getestete und auf das jeweilige Elektro-Fahrzeuggewicht sowie geringen Rollwiderstand abgestimmte Reifenkennung (NF = speziell Taycan / E-Spezifikation)',
        'Ein Hinweis für „Nur Frostwetter geeignet“',
        'Kennzeichnung für Vollgummi ohne Luftdruck',
        'Normale Transporter-Reifen ohne Geschwindigkeitsfreigabe'
      ],
      exp: 'Während „N0/N1“ usw. traditionell für Porsche-Verbrenner stehen, kennzeichnet „NF0“ die maßgeschneiderte Porsche-Spezifikation für den Taycan.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Wie hoch ist der kombinierte DC-Verbrauch im WLTP und das Leergewicht eines gelifteten 2024er Taycan Basismodells (RWD mit 89 kWh) ungefähr?',
      a: [
        'Rund 16,7–19,5 kWh/100 km WLTP bei ca. 2.090 kg DIN-Leergewicht',
        'Über 38 kWh/100 km bei 3.500 kg',
        'Nur 7,5 kWh/100 km bei 1.150 kg',
        'Rund 29 kWh/100 km bei 2.950 kg'
      ],
      exp: 'Gerade der leichtere Hecktriebler überrascht bei gemäßigtem Tempo auf der Autobahn trotz 265er/285er Sportreifen mit erstaunlich niedrigen Verbräuchen.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Was leistet beim Taycan Turbo GT die Option „Lightweight-Felgen + Bremse“ speziell beim 21-Zoll-Radsatz?',
      a: [
        'Spezielle 21-Zoll-Schmiederäder (im Design Aero-gefräst) in Kombination mit leichteren Porsche Ceramic Composite Bremsen (PCCB) in Victory Gold / Schwarz',
        '16-Zoll-Stahlfelgen vom Kleinwagen',
        '24-Zoll-Vollchrom-Spinner',
        'Vollcarbon-Felgen ohne Keramikbremse'
      ],
      exp: 'Alleine die leichten Keramikbremsen (nur hier in spezieller „Victory Gold“-Sattellackierung erhältlich) und geschmiedeten Räder reduzieren ungefederte und rotierende Massen um über 20 kg.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Welches Designmerkmal am Seitenschweller unterscheidet die Luftführung des ersten Taycan von herkömmlichen Limousinen direkt hinter den Vorderrädern?',
      a: [
        'Ausgeprägte Luftauslässe („Air Curtains“ / Side Blades) leiten Verwirbelungen aus dem vorderen Radhaus beruhigt am Schweller vorbei nach hinten',
        'Dort sitzen die Endrohre der Zusatzheizung',
        'Dort sind die Abschleppösen dauerhaft montiert',
        'Dort sitzen mechanische Trittstufen zum Ausklappen'
      ],
      exp: 'Weil das rotierende Rad im Radkasten enorme Luftverwirbelungen erzeugt, beruhigen gezielte Auslasskanäle hinter der Vorderachse die gesamte Seitenströmung.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Wie wird im Taycan beim Unfall (Crash-Erkennung) sichergestellt, dass Rettungskräfte gefahrlos schneiden können?',
      a: [
        'Pyrotechnische Trennelemente (Pyro-Fuse) sprengen im Millisekundenbereich den Hochvolt-Stromkreis der Batterie allpolig ab; am Fahrzeug angebrachte Rettungskennungen zeigen sichere Schnittzonen',
        'Der Akku stößt sich automatisch nach hinten auf die Straße aus',
        'Die Batterie entlädt sich komplett über die Scheinwerfer innerhalb einer Sekunde',
        'Es gibt keine Trennschalter – nur Gummihandschuhe im Bordwerkzeug'
      ],
      exp: 'Durch aktive und passive Trennung liegen an den Hochvolt-Kabeln außerhalb des Batteriegehäuses unmittelbar nach Auslösen der Airbags keine gefährlichen Spannungen mehr an.'
    },
    {
      cat: 'porsche_taycan',
      diff: 'pro',
      q: 'Mit welchem anderen E-Auto von Porsche teilt sich der 2024 eingeführte „Porsche Macan Electric“ NICHT die J1-Plattform des Taycan?',
      a: [
        'Der Macan Electric basiert auf der brandneuen „PPE“ (Premium Platform Electric) statt auf J1',
        'Der Taycan Sport Turismo nutzt PPE',
        'Der Audi e-tron GT nutzt PPE',
        'Der Taycan Turbo GT nutzt eine Verbrenner-Plattform vom 911'
      ],
      exp: 'Während Taycan und Audi e-tron GT auf der tiefen Sportlimousinen-Plattform J1 stehen, führen Macan Electric und Audi Q6 e-tron die gemeinsam entwickelte 800V-SUV/Crossover-Plattform PPE ein.'
    }
  ];

  ArcadeQuizEngine.registerBank('porsche', DATA);
})();
