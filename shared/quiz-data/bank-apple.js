// Unified quiz bank for "apple" (75 handverlesene Fragen: Apple – Produkte, Kult & Technikgeschichte)
(function () {
  const DATA = [
    // =========================================================================
    // KATEGORIE 1: apple_iphone_ipad (18 Fragen: iPhone & iPad – Meilensteine & Technik)
    // =========================================================================
    {
      cat: "apple_iphone_ipad",
      diff: "easy",
      q: "Wie kündigte Steve Jobs am 9. Januar 2007 auf der Macworld das allererste iPhone an?",
      a: [
        "Als drei revolutionäre Produkte in einem: Breitbild-iPod, Mobiltelefon und Internet-Kommunikator",
        "Als tragbaren Mac für die Hosentasche mit Farbdisplay, Webzugang und digitaler Kamerafunktion",
        "Als ultimativen Touchscreen-Assistenten mit Tabellenkalkulation, MP3-Player und weltweiter Navigation",
        "Als kompakten Touch-Computer mit virtueller Tastatur, universellem Stylus und Datensynchronisation"
      ],
      explanation: "Jobs wiederholte die drei Produktkategorien mehrfach hintereinander, bis das Publikum verstand, dass es sich um ein einziges Gerät handelte.",
      exp: "Jobs wiederholte die drei Produktkategorien mehrfach hintereinander, bis das Publikum verstand, dass es sich um ein einziges Gerät handelte."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "easy",
      q: "Welche fundamentale Textfunktion fehlte dem ersten iPhone bei seinem Marktstart 2007 komplett?",
      a: [
        "Das Markieren, Kopieren und Einfügen von Textabschnitten (Copy & Paste)",
        "Das automatische Drehen des Bildschirms beim Wechsel ins Querformat",
        "Das kabellose Verbinden mit handelsüblichen Bluetooth-Freisprechanlagen",
        "Das Verfassen von E-Mails über ein drahtloses lokales Wi-Fi-Netzwerk"
      ],
      explanation: "Copy & Paste wurde erst im Sommer 2009 mit der Veröffentlichung von iPhone OS 3.0 offiziell auf dem Apple-Smartphone nachgereicht.",
      exp: "Copy & Paste wurde erst im Sommer 2009 mit der Veröffentlichung von iPhone OS 3.0 offiziell auf dem Apple-Smartphone nachgereicht."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "mid",
      q: "Wie viele Drittanbieter-Apps standen beim offiziellen Start des Apple App Store im Juli 2008 zur Auswahl?",
      a: [
        "Exakt rund 500 verschiedene Anwendungen",
        "Exakt rund 5.000 verschiedene Anwendungen",
        "Exakt rund 50 verschiedene Anwendungen",
        "Exakt rund 2.500 verschiedene Anwendungen"
      ],
      explanation: "Steve Jobs wollte anfangs gar keinen nativen App Store und plädierte für Web-Apps in Safari, bevor ihn das Management zur Öffnung bewegte.",
      exp: "Steve Jobs wollte anfangs gar keinen nativen App Store und plädierte für Web-Apps in Safari, bevor ihn das Management zur Öffnung bewegte."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "easy",
      q: "Was zeichnete das von Steve Jobs 2010 eingeführte „Retina-Display“ des iPhone 4 technisch aus?",
      a: [
        "Eine Pixeldichte von 326 ppi, bei der das menschliche Auge aus Leseabstand keine Pixel mehr auflöst",
        "Eine adaptive Bildwiederholrate von bis zu 120 Hertz für flüssigere Animationen beim Scrollen",
        "Ein integrierter Sensor, der die Bildschirmfarben vollautomatisch an das umgebende Raumlicht anpasste",
        "Eine organische OLED-Matrix mit perfektem Kontrastverhältnis durch selbstleuchtende Bildpunkte"
      ],
      explanation: "Jobs definierte die Retina-Grenze bei typischem Leseabstand ab 300 ppi – das iPhone 4 verdoppelte die Pixeldichte des Vorgängers 3GS.",
      exp: "Jobs definierte die Retina-Grenze bei typischem Leseabstand ab 300 ppi – das iPhone 4 verdoppelte die Pixeldichte des Vorgängers 3GS."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "easy",
      q: "Was löste im Sommer 2010 beim iPhone 4 den weltweiten Medienwirbel namens „Antennagate“ aus?",
      a: [
        "Ein spürbarer Funksignal-Abfall beim gleichzeitigen Berühren der äußeren Metallrahmen-Fugen",
        "Eine gefährliche Überhitzung der internen Wi-Fi-Antenne bei längeren Downloads im Heimnetz",
        "Eine fehlerhafte Chip-Taktung, die zu ständigen Abbrüchen bei kabellosen Audiogeräten führte",
        "Ein Produktionsfehler im SIM-Kartenleser, der das Mobilfunknetz ohne Vorwarnung trennte"
      ],
      explanation: "Apple verteilte nach einer Sonder-Pressekonferenz mit Steve Jobs kostenlose Bumper-Schutzhüllen an alle Käufer, um die Fugen zu isolieren.",
      exp: "Apple verteilte nach einer Sonder-Pressekonferenz mit Steve Jobs kostenlose Bumper-Schutzhüllen an alle Käufer, um die Fugen zu isolieren."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "easy",
      q: "Mit welchem iPhone-Modell wurde die Sprachassistentin Siri im Oktober 2011 erstmals eingeführt?",
      a: [
        "iPhone 4s",
        "iPhone 5",
        "iPhone 4",
        "iPhone 3GS"
      ],
      explanation: "Das iPhone 4s wurde am 4. Oktober 2011 vorgestellt – nur einen einzigen Tag vor dem Tod von Apple-Mitgründer Steve Jobs.",
      exp: "Das iPhone 4s wurde am 4. Oktober 2011 vorgestellt – nur einen einzigen Tag vor dem Tod von Apple-Mitgründer Steve Jobs."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "easy",
      q: "Welchen großen Vorteil bot der 2012 beim iPhone 5 eingeführte Lightning-Stecker gegenüber dem 30-Pin-Dock?",
      a: [
        "Er konnte beidseitig und vollkommen verdrehsicher in die Ladebuchse eingesteckt werden",
        "Er lieferte erstmals serienmäßig eine Schnellladeleistung von satten fünfundvierzig Watt",
        "Er übertrug analoge Videosignale direkt ohne zusätzlichen externen Digitalwandler",
        "Er war mechanisch vollständig abwärtskompatibel zu herkömmlichen USB-A-Kabeln"
      ],
      explanation: "Phil Schiller pries Lightning als modernen Anschluss für das nächste Jahrzehnt an – exakt elf Jahre später folgte 2023 der Wechsel zu USB-C.",
      exp: "Phil Schiller pries Lightning als modernen Anschluss für das nächste Jahrzehnt an – exakt elf Jahre später folgte 2023 der Wechsel zu USB-C."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "easy",
      q: "Welches iPhone-Modell führte im Herbst 2013 erstmals den Fingerabdrucksensor „Touch ID“ ein?",
      a: [
        "iPhone 5s",
        "iPhone 5c",
        "iPhone 6",
        "iPhone 5"
      ],
      explanation: "Der Sensor saß unter einem kratzfesten Saphirglas in der Home-Taste, umgeben von einem feinen Edelstahlring zur Berührungserkennung.",
      exp: "Der Sensor saß unter einem kratzfesten Saphirglas in der Home-Taste, umgeben von einem feinen Edelstahlring zur Berührungserkennung."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "mid",
      q: "Welche technische Premiere feierte der Apple A7 Prozessor im Jahr 2013 im iPhone 5s?",
      a: [
        "Er war der weltweit erste 64-Bit-Prozessor in einem massengefertigten Consumer-Smartphone",
        "Er besaß als erster mobiler Chip integrierte 5G-Mobilfunkmodems direkt auf der Chipfläche",
        "Er nutzte als erster Smartphone-Hauptprozessor flüssiges Metall zur rein passiven Kühlung",
        "Er integrierte erstmals vier Rechenkerne mit hardwarebeschleunigter Strahlberechnung (Raytracing)"
      ],
      explanation: "Konkurrenten wie Qualcomm wurden vom 64-Bit-Sprung eiskalt überrascht und mussten ihre Entwicklungs-Roadmaps über Nacht komplett umbauen.",
      exp: "Konkurrenten wie Qualcomm wurden vom 64-Bit-Sprung eiskalt überrascht und mussten ihre Entwicklungs-Roadmaps über Nacht komplett umbauen."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "mid",
      q: "Mit welchem englischen Begriff begründete Marketing-Chef Phil Schiller 2016 den Wegfall der Kopfhörerbuchse beim iPhone 7?",
      a: [
        "Courage (Mut)",
        "Future (Zukunft)",
        "Purity (Reinheit)",
        "Precision (Präzision)"
      ],
      explanation: "Schillers Aussage „The reason to move on: courage“ wurde im Internet zum Kult-Meme, beschleunigte jedoch den Boom kabelloser Kopfhörer enorm.",
      exp: "Schillers Aussage „The reason to move on: courage“ wurde im Internet zum Kult-Meme, beschleunigte jedoch den Boom kabelloser Kopfhörer enorm."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "mid",
      q: "Wie erfasste das TrueDepth-Kamerasystem des iPhone X (2017) Gesichter für die Erkennung Face ID?",
      a: [
        "Ein Infrarot-Punktprojektor warf über 30.000 unsichtbare Lichtpunkte auf das Gesicht des Nutzers",
        "Zwei hochauflösende 4K-Farbsensoren erstellten ein stereoskopisches Standbild des Gesichts",
        "Ein integrierter Miniatur-LIDAR-Scanner tastete die Gesichtszüge mit ultravioletten Laserstrahlen ab",
        "Eine Wärmebildkamera analysierte die charakteristischen Durchblutungsmuster der Gesichtshaut"
      ],
      explanation: "Dank Infrarottechnik funktionierte Face ID auch bei absoluter Dunkelheit und passte sich per maschinellem Lernen an Bärte, Brillen und Frisuren an.",
      exp: "Dank Infrarottechnik funktionierte Face ID auch bei absoluter Dunkelheit und passte sich per maschinellem Lernen an Bärte, Brillen und Frisuren an."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "easy",
      q: "Wie demonstrierte Steve Jobs im Januar 2010 die Nutzung des allerersten iPads auf der Bühne?",
      a: [
        "Er setzte sich entspannt in einen bequemen Designer-Ledersessel und surfte im Internet",
        "Er zog das flache Tablet wie zuvor das MacBook Air aus einem gewöhnlichen Papierumschlag",
        "Er ließ das iPad an feinen Seilen von der Bühnendecke direkt vor sein Stehpult herabgleiten",
        "Er zauberte das Gerät überraschend aus der Innentasche seines klassischen Rollkragenpullovers"
      ],
      explanation: "Jobs saß in einem klassischen Le-Corbusier-Sessel (LC2), um zu demonstrieren, wie natürlich sich das iPad auf dem heimischen Sofa bedienen lässt.",
      exp: "Jobs saß in einem klassischen Le-Corbusier-Sessel (LC2), um zu demonstrieren, wie natürlich sich das iPad auf dem heimischen Sofa bedienen lässt."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "mid",
      q: "Welches Steve-Jobs-Zitat von 2007 griffen Kritiker bei der Vorstellung des Apple Pencil im Jahr 2015 auf?",
      a: [
        "„Wer will schon einen Stylus? Man muss ihn wegpacken, verliert ihn, igitt!“",
        "„Ein digitaler Eingabestift ist das unnatürlichste Werkzeug für moderne Bildschirme!“",
        "„Solange ich lebe, wird Apple niemals ein mobiles Gerät mit Zeigestift verkaufen!“",
        "„Unsere zehn Finger sind unübertroffen, Stifte gehören ins vorherige Jahrhundert!“"
      ],
      explanation: "Jobs bezog sich 2007 auf die Pflichtbedienung alter PDA-Displays, während der Pencil 2015 als präzises Zeichenwerkzeug für Illustratoren gedacht war.",
      exp: "Jobs bezog sich 2007 auf die Pflichtbedienung alter PDA-Displays, während der Pencil 2015 als präzises Zeichenwerkzeug für Illustratoren gedacht war."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "easy",
      q: "Welches Hardware-Merkmal verwandelte Apple beim iPhone 14 Pro durch Software in die „Dynamic Island“?",
      a: [
        "Die pillenförmige Aussparung im oberen Display für Frontkamera und Face-ID-Sensorik",
        "Die haptischen Tastenzonen an den beiden seitlichen Gehäuserahmen aus Edelstahl",
        "Den integrierten MagSafe-Magnetring auf der matten Rückseite des Gehäuses",
        "Das pillenförmige rückwärtige Glasmodul mit den drei optischen Kameraobjektiven"
      ],
      explanation: "Die Software blendet Benachrichtigungen, Timer und Medienplayer so flüssig um den Kameraausschnitt ein, dass die physische Lücke optisch verschwindet.",
      exp: "Die Software blendet Benachrichtigungen, Timer und Medienplayer so flüssig um den Kameraausschnitt ein, dass die physische Lücke optisch verschwindet."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "easy",
      q: "Was war der Hauptgrund für Apples Umstieg von Lightning auf USB-C beim iPhone 15 im Jahr 2023?",
      a: [
        "Eine gesetzliche Richtlinie der Europäischen Union zur Vereinheitlichung von Ladebuchsen",
        "Thermische Hitzeprobleme des alten Lightning-Standards bei Ladeleistungen über zwanzig Watt",
        "Ein weltweiter Lieferengpass bei den proprietären Authentifizierungs-Chips von Lightning-Kabeln",
        "Der Wunsch nach nativer Unterstützung für professionelle externe 8K-Displays ohne Adapter"
      ],
      explanation: "Die EU beschloss 2022 verbindlich USB-C für neue mobile Geräte, woraufhin Apple weltweit auf den einheitlichen Standard umstellte.",
      exp: "Die EU beschloss 2022 verbindlich USB-C für neue mobile Geräte, woraufhin Apple weltweit auf den einheitlichen Standard umstellte."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "easy",
      q: "Wie funktioniert das mit dem iPhone 12 eingeführte MagSafe-System auf der Geräterückseite?",
      a: [
        "Ein kreisförmiges Magnetfeld zentriert drahtlose Ladegeräte und Zubehörteile passgenau",
        "Ein aktiver Elektromagnet saugt kompatible Hüllen bei Berührung vollautomatisch fest",
        "Eine magnetische Platte schützt den Akku vor elektromagnetischen Störfeldern beim Laden",
        "Ein integrierter Induktionsring leitet überschüssige Gerätewärme an die Außenluft ab"
      ],
      explanation: "Apple recycelte für dieses Zubehörsystem den Markennamen „MagSafe“, der zuvor jahrelang die magnetischen MacBook-Ladekabel bezeichnet hatte.",
      exp: "Apple recycelte für dieses Zubehörsystem den Markennamen „MagSafe“, der zuvor jahrelang die magnetischen MacBook-Ladekabel bezeichnet hatte."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "mid",
      q: "Welche Funktechniken kombiniert AirDrop auf iOS, um Dateien schnell und direkt zwischen Geräten zu senden?",
      a: [
        "Bluetooth zur Nahbereichserkennung und ein direktes Peer-to-Peer-Wi-Fi für die Dateiübertragung",
        "Nahfeldkommunikation (NFC) für den Verbindungsaufbau und mobile Mobilfunkdaten zum Senden",
        "Ultrabreitband-Funk (UWB) für das Pairing und unhörbaren Ultraschall für den Datenstrom",
        "Infrarotsignale für den Schlüsseltausch und Bluetooth Low Energy für den gesamten Dateitransfer"
      ],
      explanation: "Durch das direkte Wi-Fi-Netzwerk zwischen den beiden Apple-Geräten funktioniert AirDrop blitzschnell und ganz ohne gemeinsamen WLAN-Router.",
      exp: "Durch das direkte Wi-Fi-Netzwerk zwischen den beiden Apple-Geräten funktioniert AirDrop blitzschnell und ganz ohne gemeinsamen WLAN-Router."
    },
    {
      cat: "apple_iphone_ipad",
      diff: "pro",
      q: "Welche iPhone-Generation führte erstmals die lebensrettende Funktion „Notruf SOS über Satellit“ ein?",
      a: [
        "iPhone 14 und iPhone 14 Pro (2022)",
        "iPhone 13 und iPhone 13 Pro (2021)",
        "iPhone 12 und iPhone 12 Pro (2020)",
        "iPhone 15 und iPhone 15 Pro (2023)"
      ],
      explanation: "Das System führt den Nutzer auf dem Bildschirm grafisch, um das Smartphone millimetergenau auf vorbeiziehende Kommunikationssatelliten auszurichten.",
      exp: "Das System führt den Nutzer auf dem Bildschirm grafisch, um das Smartphone millimetergenau auf vorbeiziehende Kommunikationssatelliten auszurichten."
    },

    // =========================================================================
    // KATEGORIE 2: apple_mac_silicon (16 Fragen: Mac, MacBook & Apple Silicon)
    // =========================================================================
    {
      cat: "apple_mac_silicon",
      diff: "easy",
      q: "Welcher Hollywood-Kultregisseur inszenierte den legendären „1984“-Werbespot für den ersten Macintosh?",
      a: [
        "Ridley Scott",
        "Steven Spielberg",
        "James Cameron",
        "George Lucas"
      ],
      explanation: "Der Spot mit der Hammerwerferin lief nur ein einziges Mal landesweit im US-Fernsehen während des Super Bowl XVIII und ging in die Werbegeschichte ein.",
      exp: "Der Spot mit der Hammerwerferin lief nur ein einziges Mal landesweit im US-Fernsehen während des Super Bowl XVIII und ging in die Werbegeschichte ein."
    },
    {
      cat: "apple_mac_silicon",
      diff: "mid",
      q: "Was sagte der originale Macintosh 128K am 24. Januar 1984, als Steve Jobs ihn erstmals vorführte?",
      a: [
        "„Hello, I am Macintosh. It sure is great to get out of that bag.“",
        "„Good morning California, the modern personal computer era starts now.“",
        "„Welcome to the digital desktop, proudly crafted by Apple Computer.“",
        "„I think, therefore I compute, and I am very happy to meet my creators.“"
      ],
      explanation: "Der Rechner stellte sich per Sprachsynthese selbst vor und witzelte, niemals einem Computer zu vertrauen, den man nicht mit einer Hand anheben kann.",
      exp: "Der Rechner stellte sich per Sprachsynthese selbst vor und witzelte, niemals einem Computer zu vertrauen, den man nicht mit einer Hand anheben kann."
    },
    {
      cat: "apple_mac_silicon",
      diff: "easy",
      q: "Mit welcher radikalen Entscheidung brach der bunte iMac G3 im Jahr 1998 mit den Konventionen der PC-Welt?",
      a: [
        "Er setzte auf durchscheinendes Gehäusedesign in „Bondi Blue“ und strich das Diskettenlaufwerk",
        "Er verzichtete komplett auf Maus und Tastatur und setzte stattdessen auf Touchscreen-Eingaben",
        "Er benötigte dank integriertem Riesenakku als erster Desktop-PC kein permanentes Stromkabel",
        "Er wurde ab Werk serienmäßig mit zwei separaten Röhrenbildschirmen für Multitasking geliefert"
      ],
      explanation: "Experten prophezeiten das Scheitern wegen des fehlenden Diskettenlaufwerks – stattdessen läutete der USB-basierte iMac Apples triumphale Rettung ein.",
      exp: "Experten prophezeiten das Scheitern wegen des fehlenden Diskettenlaufwerks – stattdessen läutete der USB-basierte iMac Apples triumphale Rettung ein."
    },
    {
      cat: "apple_mac_silicon",
      diff: "easy",
      q: "Wie demonstrierte Steve Jobs auf der Macworld 2008 die extreme Dünne des ersten MacBook Air?",
      a: [
        "Er zog das Notebook auf der Bühne aus einem ganz normalen braunen Büro-Papierumschlag",
        "Er balancierte das Gerät mühelos auf der scharfen Schneide eines großen Küchenmessers",
        "Er schob das geschlossene Gerät unter dem schmalen Schlitz einer massiven Holztür durch",
        "Er wog das Notebook auf einer Präzisionswaage gegen eine einzige Sonntagszeitung auf"
      ],
      explanation: "Das MacBook Air passte problemlos in einen Standard-Manila-Umschlag und begründete die moderne Kategorie der extrem flachen Ultrabooks.",
      exp: "Das MacBook Air passte problemlos in einen Standard-Manila-Umschlag und begründete die moderne Kategorie der extrem flachen Ultrabooks."
    },
    {
      cat: "apple_mac_silicon",
      diff: "mid",
      q: "Warum kündigte Steve Jobs 2005 den historischen Wechsel aller Macs von PowerPC-Chips zu Intel-Prozessoren an?",
      a: [
        "Wegen der deutlich überlegenen Energieeffizienz und Rechenleistung pro Watt für mobile Notebooks",
        "Wegen eines verlorenen Gerichtsprozesses um die weltweiten Markenrechte an der PowerPC-Technik",
        "Wegen der besseren nativen Lauffähigkeit des damals dominierenden Microsoft Windows XP",
        "Weil IBM und Motorola die Fertigung von Halbleiterbauteilen im Jahr 2005 komplett einstellten"
      ],
      explanation: "IBM konnte die versprochenen schnellen 3-GHz-Chips für PowerBooks thermisch nicht kühlen – Intel bot den perfekten Ausweg für mobile Macs.",
      exp: "IBM konnte die versprochenen schnellen 3-GHz-Chips für PowerBooks thermisch nicht kühlen – Intel bot den perfekten Ausweg für mobile Macs."
    },
    {
      cat: "apple_mac_silicon",
      diff: "mid",
      q: "Was war das zentrale Architektur-Merkmal des ersten Apple-Silicon-Chips „M1“ im November 2020?",
      a: [
        "Ein ARM-basiertes System-on-Chip mit gemeinsamem Unified Memory für CPU, GPU und Neural Engine",
        "Ein modularer Aufbau mit austauschbaren Grafikkernen für nachträgliche Aufrüstungen",
        "Die ausschließliche Verwendung von biologisch abbaubarem Silizium zur Müllreduktion",
        "Ein x86-Mehrkernprozessor mit integrierter Flüssigkeitskühlung direkt auf der Chipoberfläche"
      ],
      explanation: "Durch den Unified Memory greifen CPU und Grafik ohne zeitraubendes Hin- und Herkopieren mit gewaltiger Bandbreite auf denselben Speicherpool zu.",
      exp: "Durch den Unified Memory greifen CPU und Grafik ohne zeitraubendes Hin- und Herkopieren mit gewaltiger Bandbreite auf denselben Speicherpool zu."
    },
    {
      cat: "apple_mac_silicon",
      diff: "mid",
      q: "Welche Aufgabe übernahm die Software-Schicht „Rosetta 2“ beim Wechsel von Intel zu Apple Silicon?",
      a: [
        "Das automatische Übersetzen von Intel-x86-Programmen, damit sie auf ARM-M-Chips lauffähig bleiben",
        "Das hardwarenahe Emulieren klassischer Windows-Programme direkt auf dem macOS-Schreibtisch",
        "Das drahtlose Migrieren sämtlicher Benutzerdaten von alten Windows-PCs auf fabrikneue Macs",
        "Das fehlerfreie Wiedergeben historischer Classic-Mac-OS-9-Spiele im Safari-Webbrowser"
      ],
      explanation: "Rosetta 2 übersetzte x86-Code bereits bei der Installation in ARM-Befehle – oft liefen Intel-Programme auf M1 schneller als auf den alten Intel-Macs.",
      exp: "Rosetta 2 übersetzte x86-Code bereits bei der Installation in ARM-Befehle – oft liefen Intel-Programme auf M1 schneller als auf den alten Intel-Macs."
    },
    {
      cat: "apple_mac_silicon",
      diff: "easy",
      q: "Welches markante Design-Konzept prägte den 2013 vorgestellten Mac Pro, der den Spitznamen „Mülleimer“ trug?",
      a: [
        "Ein kompakter Zylinder aus schwarzem Aluminium um einen zentralen dreieckigen Kühlkern",
        "Eine massive Kugel aus gegossenem Glas mit rotierenden Kühlrippen an der Außenhülle",
        "Ein eckiger Turm mit zwölf magnetischen Schubladen für handelsübliche Wechselfestplatten",
        "Ein flaches Sechseck-Gehäuse, das die Abwärme komplett passiv über den Schreibtisch abgab"
      ],
      explanation: "Apple gestand später ein, sich thermisch in eine Sackgasse manövriert zu haben, da professionelle Workstation-Grafikkarten völlig anders wuchsen.",
      exp: "Apple gestand später ein, sich thermisch in eine Sackgasse manövriert zu haben, da professionelle Workstation-Grafikkarten völlig anders wuchsen."
    },
    {
      cat: "apple_mac_silicon",
      diff: "mid",
      q: "Welches Muster an Front und Rückseite bescherte dem Mac Pro von 2019 den Spitznamen „Käsereibe“?",
      a: [
        "Ein dreidimensional gefrästes Gitter aus versetzten Halbkugeln zur optimalen Luftzirkulation",
        "Ein hochglänzendes Lamellenmuster mit softwaregesteuerter RGB-Hintergrundbeleuchtung",
        "Eine gelochte Stoffbespannung aus recycelten Meeresplastik-Fasern zur aktiven Schalldämmung",
        "Ein feines Wabenmuster aus Karbonfasern mit integrierten Miniatur-Temperatursensoren"
      ],
      explanation: "Die dreidimensionale Fräsung maximierte die Oberfläche für den Luftstrom drastisch und erinnerte optisch sofort an eine Küchen-Reibe.",
      exp: "Die dreidimensionale Fräsung maximierte die Oberfläche für den Luftstrom drastisch und erinnerte optisch sofort an eine Küchen-Reibe."
    },
    {
      cat: "apple_mac_silicon",
      diff: "easy",
      q: "Nach welchem Vorbild benennt Apple die macOS-Versionen seit Version 10.9 (Mavericks im Jahr 2013)?",
      a: [
        "Nach markanten Landschaften, Küstenabschnitten und Nationalparks im Bundesstaat Kalifornien",
        "Nach weltberühmten Persönlichkeiten aus der europäischen Kunst- und Wissenschaftsgeschichte",
        "Nach erloschenen und aktiven Vulkanbergen entlang des pazifischen Feuergürtels",
        "Nach leuchtstarken Sternbildern und Galaxien des sichtbaren nördlichen Sternenhimmels"
      ],
      explanation: "Von Mac OS X 10.0 (Cheetah) bis 10.8 (Mountain Lion) dienten zuvor zwölf Jahre lang majestätische Raub- und Großkatzen als Namensgeber.",
      exp: "Von Mac OS X 10.0 (Cheetah) bis 10.8 (Mountain Lion) dienten zuvor zwölf Jahre lang majestätische Raub- und Großkatzen als Namensgeber."
    },
    {
      cat: "apple_mac_silicon",
      diff: "pro",
      q: "Woher stammt das charakteristische Schleifen-Symbol (⌘) auf der Command-Taste der Mac-Tastatur?",
      a: [
        "Von einem offiziellen skandinavischen Verkehrsschild für kulturelle Sehenswürdigkeiten",
        "Aus einer alten mathematischen Gleichung für unendliche Schleifen im Koordinatensystem",
        "Vom architektonischen Grundriss des ersten Apple-Firmensitzes am Infinite Loop in Cupertino",
        "Aus dem historischen Wappen der englischen Adelsfamilie von Lord Byron in Kent"
      ],
      explanation: "Designerin Susan Kare stöberte in Symbolbüchern, nachdem Steve Jobs befahl, das Apple-Logo wegen drohender Reizüberflutung von Menübefehlen zu entfernen.",
      exp: "Designerin Susan Kare stöberte in Symbolbüchern, nachdem Steve Jobs befahl, das Apple-Logo wegen drohender Reizüberflutung von Menübefehlen zu entfernen."
    },
    {
      cat: "apple_mac_silicon",
      diff: "mid",
      q: "Welche Grafikerin schuf das legendäre Finder-Gesicht („Happy Mac“) und die Icons des Ur-Macintosh?",
      a: [
        "Susan Kare",
        "Jony Ive",
        "Hartmut Esslinger",
        "Debi Coleman"
      ],
      explanation: "Kare skizzierte die ersten Mac-Icons pixelgenau auf kariertem Millimeterpapier – darunter auch den Papierkorb, die Bombe und das Dogcow-Symbol.",
      exp: "Kare skizzierte die ersten Mac-Icons pixelgenau auf kariertem Millimeterpapier – darunter auch den Papierkorb, die Bombe und das Dogcow-Symbol."
    },
    {
      cat: "apple_mac_silicon",
      diff: "easy",
      q: "Welches Missgeschick sollte der 2006 am MacBook Pro eingeführte MagSafe-Stromanschluss verhindern?",
      a: [
        "Dass das Notebook vom Tisch stürzt, wenn jemand versehentlich über das Ladekabel stolpert",
        "Dass der interne Akku durch permanente Erhaltungsladung vorzeitig an Speicherkraft einbüßt",
        "Dass Staubpartikel und Fremdkörper die offenen Ladekontakte im Rucksack kurzschließen",
        "Dass plötzliche Überspannungen im Stromnetz empfindliche Bauteile auf dem Mainboard zerstören"
      ],
      explanation: "Der magnetische Stecker löste sich bei Ruck sofort gefahrlos vom Gehäuse – inspiriert von Abreißkabeln professioneller Fritteusen in Großküchen.",
      exp: "Der magnetische Stecker löste sich bei Ruck sofort gefahrlos vom Gehäuse – inspiriert von Abreißkabeln professioneller Fritteusen in Großküchen."
    },
    {
      cat: "apple_mac_silicon",
      diff: "mid",
      q: "Auf welchem Unix-Betriebssystem von Steve Jobs' Zweitfirma NeXT basiert das Fundament von macOS?",
      a: [
        "NeXTSTEP",
        "BeOS",
        "OS/2 Warp",
        "Solaris"
      ],
      explanation: "Mit dem Kauf von NeXT holte Apple 1996 Steve Jobs zurück und gewann mit NeXTSTEP das moderne Fundament für Mac OS X, iOS und watchOS.",
      exp: "Mit dem Kauf von NeXT holte Apple 1996 Steve Jobs zurück und gewann mit NeXTSTEP das moderne Fundament für Mac OS X, iOS und watchOS."
    },
    {
      cat: "apple_mac_silicon",
      diff: "easy",
      q: "Was war die „Touch Bar“, die Apple 2016 im MacBook Pro verbaute und später wieder verwarf?",
      a: [
        "Ein berührungsempfindlicher OLED-Streifen, der die mechanische Funktionstasten-Reihe ersetzte",
        "Ein drucksensitiver Bereich neben dem Trackpad zur direkten Stifteingabe mit dem Apple Pencil",
        "Eine magnetische Kontaktleiste am Displaydeckel zum Andocken von externen Kameras und Leuchten",
        "Ein beleuchteter Schieberegler aus Glas an der Gehäuseseite zur schnellen Lautstärkeregelung"
      ],
      explanation: "Viele professionelle Nutzer vermissten eine echte haptische Escape-Taste, sodass Apple ab 2021 wieder vollwertige Funktionstasten einbaute.",
      exp: "Viele professionelle Nutzer vermissten eine echte haptische Escape-Taste, sodass Apple ab 2021 wieder vollwertige Funktionstasten einbaute."
    },
    {
      cat: "apple_mac_silicon",
      diff: "pro",
      q: "Warum ertönt beim Einschalten eines Mac der weltberühmte Startton („Startup Chime“)?",
      a: [
        "Als akustische Bestätigung dafür, dass alle internen Hardware-Selbsttests fehlerfrei bestanden wurden",
        "Um sehbehinderten Nutzern rechtzeitig das Drücken von Boot-Tastenkombinationen zu signalisieren",
        "Als markenrechtlich geschütztes Erkennungssignal zur Einstimmung des Publikums bei Keynotes",
        "Zur automatischen Frequenzkalibrierung der internen Lautsprecher auf den umgebenden Raum"
      ],
      explanation: "Der Sound-Designer Jim Reekes komponierte den berühmten C-Dur-Akkord auf einem Korg-Synthesizer, um nervige alte Absturz-Töne abzulösen.",
      exp: "Der Sound-Designer Jim Reekes komponierte den berühmten C-Dur-Akkord auf einem Korg-Synthesizer, um nervige alte Absturz-Töne abzulösen."
    },

    // =========================================================================
    // KATEGORIE 3: apple_audio_wearables (15 Fragen: Audio, Wearables & Ökosystem)
    // =========================================================================
    {
      cat: "apple_audio_wearables",
      diff: "easy",
      q: "Mit welchem legendären Werbeslogan stellte Steve Jobs im Oktober 2001 den ersten iPod vor?",
      a: [
        "„1.000 Songs in deiner Tasche“ („1,000 songs in your pocket“)",
        "„Die gesamte Musikgeschichte auf einer einzigen Festplatte“",
        "„Höre was immer du willst, wann und wo immer du willst“",
        "„Revolutionäre Musiktechnologie für eine Milliarde Menschen“"
      ],
      explanation: "Die damals revolutionäre 1,8-Zoll-Miniaturfestplatte von Toshiba mit 5 GB Speicher machte den iPod unvergleichlich schlanker als CD-Player.",
      exp: "Die damals revolutionäre 1,8-Zoll-Miniaturfestplatte von Toshiba mit 5 GB Speicher machte den iPod unvergleichlich schlanker als CD-Player."
    },
    {
      cat: "apple_audio_wearables",
      diff: "easy",
      q: "Was machte das ab 2004 verbaute „Click Wheel“ des iPod so revolutionär für die Musikbedienung?",
      a: [
        "Es vereinte berührungsempfindliches Scrollen und mechanische Tasten nahtlos unter einer runden Fläche",
        "Es besaß einen optischen Drehring mit dynamischem Drehwiderstand je nach Musik-Genre",
        "Es nutzte einen kugelgelagerten Trackball zur freien Navigation in zwei Achsenrichtungen",
        "Es bestand aus piezoelektrischem Glas ohne jegliche mechanisch beweglichen Komponenten"
      ],
      explanation: "Mit einer einzigen Daumenbewegung ließ sich eine Musiksammlung mit tausenden Songs blitzschnell und präzise durchblättern.",
      exp: "Mit einer einzigen Daumenbewegung ließ sich eine Musiksammlung mit tausenden Songs blitzschnell und präzise durchblättern."
    },
    {
      cat: "apple_audio_wearables",
      diff: "mid",
      q: "Welcher Audio-Chip sorgte in den originalen AirPods von 2016 für das magisch einfache Koppeln?",
      a: [
        "Apple W1 Chip",
        "Apple H1 Chip",
        "Apple U1 Chip",
        "Apple S1 Chip"
      ],
      explanation: "Der W1-Chip erkannte das Öffnen des Ladecase sofort auf dem iPhone und synchronisierte die Koppelung automatisch über alle iCloud-Geräte.",
      exp: "Der W1-Chip erkannte das Öffnen des Ladecase sofort auf dem iPhone und synchronisierte die Koppelung automatisch über alle iCloud-Geräte."
    },
    {
      cat: "apple_audio_wearables",
      diff: "mid",
      q: "Wie funktioniert der Transparenzmodus der AirPods Pro im Vergleich zur Geräuschunterdrückung (ANC)?",
      a: [
        "Nach außen gerichtete Mikrofone leiten Umgebungsgeräusche aktiv und natürlich ins Ohr weiter",
        "Er senkt die Musiklautstärke um exakt die Hälfte ab, sobald jemand im Raum leise zu sprechen beginnt",
        "Er deaktiviert die Bluetooth-Antennen zeitweise, um Akku bei leisen Musikpassagen einzusparen",
        "Er sendet Ultraschallimpulse in den Gehörgang, um das Trommelfell vor zu lauten Bässen zu schützen"
      ],
      explanation: "Dadurch kann man Musik hören und Durchsagen am Bahnhof oder Gespräche trotzdem so klar wahrnehmen, als trüge man gar keine Kopfhörer.",
      exp: "Dadurch kann man Musik hören und Durchsagen am Bahnhof oder Gespräche trotzdem so klar wahrnehmen, als trüge man gar keine Kopfhörer."
    },
    {
      cat: "apple_audio_wearables",
      diff: "easy",
      q: "Mit welchem berühmten Satz leitete Tim Cook im September 2014 die Vorstellung der Apple Watch ein?",
      a: [
        "„One more thing…“",
        "„Today, Apple reinvents the watch…“",
        "„The next chapter of Apple begins now…“",
        "„A magical smart companion for your wrist…“"
      ],
      explanation: "Es war das allererste Mal in Tim Cooks Amtszeit als Apple-Chef, dass Steve Jobs' legendäre Ankündigungsformel wieder auf der Bühne fiel.",
      exp: "Es war das allererste Mal in Tim Cooks Amtszeit als Apple-Chef, dass Steve Jobs' legendäre Ankündigungsformel wieder auf der Bühne fiel."
    },
    {
      cat: "apple_audio_wearables",
      diff: "easy",
      q: "Welchem Zweck dient die drehbare „Digital Crown“ an der Gehäuseseite der Apple Watch primär?",
      a: [
        "Zum präzisen Zoomen und Scrollen, ohne mit dem Finger das kleine Uhren-Display zu verdecken",
        "Zum manuellen Aufziehen einer internen mechanischen Notfallfeder für die reine Zeitanzeige",
        "Als primärer Notfall-Knopf zum sofortigen Absetzen eines weltweiten Satelliten-Hilferufs",
        "Als analoger Kalibrierschalter für das Einstellen des internen barometrischen Höhenmessers"
      ],
      explanation: "Die Krone übersetzt mechanische Drehungen optisch in Datenimpulse und gibt dem Träger über die Taptic Engine feine Klick-Rückmeldungen.",
      exp: "Die Krone übersetzt mechanische Drehungen optisch in Datenimpulse und gibt dem Träger über die Taptic Engine feine Klick-Rückmeldungen."
    },
    {
      cat: "apple_audio_wearables",
      diff: "mid",
      q: "Welchen medizinischen Meilenstein brachte die Apple Watch Series 4 im Herbst 2018 ans Handgelenk?",
      a: [
        "Ein 1-Kanal-Elektrokardiogramm (EKG) durch Auflegen des Zeigefingers auf die Digital Crown",
        "Eine vollautomatische Blutzuckermessung über optische Nahinfrarotsensoren auf der Haut",
        "Die genaue Bestimmung des Blutdrucks durch Aufpumpen feiner Luftpolster im Armband",
        "Eine ständige Schweiß-Analyse zur Früherkennung von Dehydration beim Ausdauersport"
      ],
      explanation: "Die Series 4 erhielt als erste Smartwatch für Endverbraucher eine offizielle Zulassung der US-Gesundheitsbehörde FDA für EKG-Messungen.",
      exp: "Die Series 4 erhielt als erste Smartwatch für Endverbraucher eine offizielle Zulassung der US-Gesundheitsbehörde FDA für EKG-Messungen."
    },
    {
      cat: "apple_audio_wearables",
      diff: "mid",
      q: "Was tut die Apple Watch automatisch, wenn sie einen schweren Sturz registriert und der Träger regungslos bleibt?",
      a: [
        "Sie wählt nach einer Minute selbstständig den Notruf und sendet den aktuellen GPS-Standort",
        "Sie aktiviert für fünf Minuten eine Alarmsirene mit 86 Dezibel und schaltet sich danach ab",
        "Sie sperrt vorsorglich alle Zahlungskarten in Apple Pay und übermittelt Daten an den Store",
        "Sie startet eine kontinuierliche Zehn-Minuten-EKG-Aufzeichnung im internen Flash-Speicher"
      ],
      explanation: "Die Sturzerkennung hat weltweit bereits zahlreichen gestürzten Senioren, Sportlern und verunglückten Wanderern rechtzeitig das Leben gerettet.",
      exp: "Die Sturzerkennung hat weltweit bereits zahlreichen gestürzten Senioren, Sportlern und verunglückten Wanderern rechtzeitig das Leben gerettet."
    },
    {
      cat: "apple_audio_wearables",
      diff: "mid",
      q: "Wie navigiert der Nutzer auf dem räumlichen Computer „Apple Vision Pro“ durch Menüs und Fenster?",
      a: [
        "Mit den Augen zur Blick-Fokussierung und einem kurzen Zusammenführen von Daumen und Zeigefinger",
        "Ausschließlich über zwei drahtlose Hand-Controller mit Bewegungssensoren und haptischen Triggern",
        "Mit einer speziellen Bluetooth-Touch-Maus, die auf beliebigen Stoff- und Polsteroberflächen gleitet",
        "Rein über gesprochene Sprachbefehle und bestätigende Kopfbewegungen nach oben und unten"
      ],
      explanation: "Hochgeschwindigkeitskameras im Inneren verfolgen die Pupillen derart präzise, dass man ein Icon nur ansehen muss, um es zu markieren.",
      exp: "Hochgeschwindigkeitskameras im Inneren verfolgen die Pupillen derart präzise, dass man ein Icon nur ansehen muss, um es zu markieren."
    },
    {
      cat: "apple_audio_wearables",
      diff: "easy",
      q: "Welche Funktechnik nutzt der Apple AirTag für die zentimetergenaue „Genaue Suche“ im Nahbereich?",
      a: [
        "Ultra-Wideband-Funk (UWB) über den integrierten Apple U1 Chip",
        "Klassische Nahfeldkommunikation (NFC) über passive Spulen",
        "Ein satellitengestütztes GPS-Signal mit Direktanbindung",
        "Gewöhnliches Bluetooth mit reiner Auswertung der Signalstärke"
      ],
      explanation: "Der U1-Chip misst die Signallaufzeit millimetergenau und blendet auf dem iPhone-Bildschirm einen Richtungspfeil direkt zum Schlüsselbund ein.",
      exp: "Der U1-Chip misst die Signallaufzeit millimetergenau und blendet auf dem iPhone-Bildschirm einen Richtungspfeil direkt zum Schlüsselbund ein."
    },
    {
      cat: "apple_audio_wearables",
      diff: "easy",
      q: "Warum unterscheidet die Nachrichten-App auf Apple-Geräten zwischen blauen und grünen Sprechblasen?",
      a: [
        "Blau kennzeichnet verschlüsselte iMessage-Chats, Grün steht für herkömmliche SMS/MMS-Nachrichten",
        "Blau signalisiert gelesene Texte, Grün markiert Nachrichten, die beim Empfänger noch ungelesen sind",
        "Blau steht für Datenversand über WLAN, Grün für die Übertragung über das Mobilfunknetz",
        "Blau zeigt private Kontakte an, Grün markiert gewerbliche Service- und Bankbenachrichtigungen"
      ],
      explanation: "Der Farbkontrast führte in den USA unter Teenagern sogar zu sozialem Druck, bekannt geworden als „Green Bubble Stigma“ gegenüber Android-Nutzern.",
      exp: "Der Farbkontrast führte in den USA unter Teenagern sogar zu sozialem Druck, bekannt geworden als „Green Bubble Stigma“ gegenüber Android-Nutzern."
    },
    {
      cat: "apple_audio_wearables",
      diff: "mid",
      q: "Was leistet die Ökosystem-Funktion „Universal Clipboard“ (Universelle Zwischenablage)?",
      a: [
        "Man kopiert Text oder Fotos auf einem Apple-Gerät und fügt sie direkt auf einem anderen Gerät ein",
        "Versehentlich gelöschte Notizen lassen sich innerhalb von dreißig Tagen auf jedem Gerät retten",
        "Passwörter aus Safari werden in Echtzeit in beliebige Drittanbieter-Browser synchronisiert",
        "Der Bildschirm eines iPhones kann zeitgleich auf bis zu vier iPads drahtlos gespiegelt werden"
      ],
      explanation: "Die Zwischenablage nutzt Bluetooth zur Erkennung naher eigener Geräte und schickt die kopierten Inhalte verschlüsselt über WLAN und iCloud.",
      exp: "Die Zwischenablage nutzt Bluetooth zur Erkennung naher eigener Geräte und schickt die kopierten Inhalte verschlüsselt über WLAN und iCloud."
    },
    {
      cat: "apple_audio_wearables",
      diff: "mid",
      q: "Welche praktische Funktion schaltete das 2019 eingeführte Feature „Sidecar“ frei?",
      a: [
        "Die drahtlose Nutzung eines iPads als zweiter Bildschirm oder Grafiktablett für den Mac",
        "Das automatische Teilen der Mac-Internetverbindung mit allen iPhones in der Umgebung",
        "Das Ausführen nativer Mac-Grafikprogramme direkt im Safari-Browser auf dem iPhone",
        "Das automatische Abgleichen von Videoaufnahmen zwischen zwei gekoppelten Kameras"
      ],
      explanation: "Mit Sidecar und dem Apple Pencil lässt sich das iPad wie ein professionelles Zeichentablett für Mac-Apps wie Photoshop und Illustrator nutzen.",
      exp: "Mit Sidecar und dem Apple Pencil lässt sich das iPad wie ein professionelles Zeichentablett für Mac-Apps wie Photoshop und Illustrator nutzen."
    },
    {
      cat: "apple_audio_wearables",
      diff: "pro",
      q: "Wie passte der originale Apple HomePod von 2018 seinen Klang vollautomatisch an den Raum an?",
      a: [
        "Eingebaute Mikrofone maßen Schallreflexionen an Wänden und passten die Abstrahlung in Echtzeit an",
        "Der Besitzer musste mit dem iPhone einmal langsam im Kreis um den Lautsprecher herumlaufen",
        "Ein integrierter optischer Lasersensor maß den Abstand zur Decke für feste Raum-Klangprofile",
        "Über Apple Karten wurden die hinterlegten Grundrisse der Wohnadresse automatisch synchronisiert"
      ],
      explanation: "Dank Beamforming mit sieben Hochtönern konnte der HomePod Gesang und Stimmen in die Raummitte werfen und Hallreflexionen an die Wände leiten.",
      exp: "Dank Beamforming mit sieben Hochtönern konnte der HomePod Gesang und Stimmen in die Raummitte werfen und Hallreflexionen an die Wände leiten."
    },
    {
      cat: "apple_audio_wearables",
      diff: "easy",
      q: "Welches Design-Detail an der schwarzen Siri Remote des Apple TV HD/4K (2015) sorgte für Kundenfrust?",
      a: [
        "Die völlig symmetrische Glasform machte es im Dunkeln fast unmöglich, oben und unten zu ertasten",
        "Die Fernbedienung benötigte wöchentlich vier neue handelsübliche Knopfzellenbatterien",
        "Sie besaß keinerlei Knöpfe und reagierte ausschließlich auf laute Zurufen per Spracherkennung",
        "Die Gummierung an der Rückseite löste sich bei normaler Raumtemperatur nach zwei Jahren klebrig auf"
      ],
      explanation: "Apple reagierte 2021 auf die Kritik und brachte eine dickere, ergonomische Aluminium-Fernbedienung mit fühlbarem Navigations-Steuerkreuz heraus.",
      exp: "Apple reagierte 2021 auf die Kritik und brachte eine dickere, ergonomische Aluminium-Fernbedienung mit fühlbarem Navigations-Steuerkreuz heraus."
    },

    // =========================================================================
    // KATEGORIE 4: apple_design_history (14 Fragen: Geschichte, Design & Kult)
    // =========================================================================
    {
      cat: "apple_design_history",
      diff: "easy",
      q: "Wer gründete Apple 1976 mit Steve Jobs und Steve Wozniak, stieg aber nach 12 Tagen für 800 Dollar aus?",
      a: [
        "Ronald Wayne",
        "Mike Markkula",
        "John Sculley",
        "Andy Hertzfeld"
      ],
      explanation: "Ronald Wayne fürchtete die persönliche Haftung mit seinem Privatvermögen – seine 10 % Firmenanteil wären heute hunderte Milliarden Dollar wert.",
      exp: "Ronald Wayne fürchtete die persönliche Haftung mit seinem Privatvermögen – seine 10 % Firmenanteil wären heute hunderte Milliarden Dollar wert."
    },
    {
      cat: "apple_design_history",
      diff: "mid",
      q: "In welchem Zustand wurde der allererste Computer „Apple I“ im Jahr 1976 an Käufer übergeben?",
      a: [
        "Als nackte, komplett bestückte Hauptplatine ohne Gehäuse, Netzteil, Monitor oder Tastatur",
        "Als fertiger PC in einem handgefertigten Gehäuse aus kalifornischem Mahagoniholz",
        "In einem grauen Stahlblechgehäuse mit eingebautem Kassettenrekorder für Datenbänder",
        "Als unbestückte Platine mit Tütchen voller Widerstände, die Kunden selbst anlöten mussten"
      ],
      explanation: "Käufer mussten sich Gehäuse, Trafo, Tastatur und Bildschirm selbst besorgen – die berühmten Holzgehäuse baute die Händlerkette „Byte Shop“.",
      exp: "Käufer mussten sich Gehäuse, Trafo, Tastatur und Bildschirm selbst besorgen – die berühmten Holzgehäuse baute die Händlerkette „Byte Shop“."
    },
    {
      cat: "apple_design_history",
      diff: "easy",
      q: "Welchen ungewöhnlichen, schnapszahligen Verkaufspreis verlangte Apple 1976 für den Apple I?",
      a: [
        "666,66 US-Dollar",
        "777,77 US-Dollar",
        "499,99 US-Dollar",
        "999,00 US-Dollar"
      ],
      explanation: "Steve Wozniak mochte Zahlen mit gleichen Ziffern und kalkulierte den Preis einfach als ein Drittel Aufschlag auf die 500 Dollar Großhandelspreis.",
      exp: "Steve Wozniak mochte Zahlen mit gleichen Ziffern und kalkulierte den Preis einfach als ein Drittel Aufschlag auf die 500 Dollar Großhandelspreis."
    },
    {
      cat: "apple_design_history",
      diff: "mid",
      q: "Was zeigte das allererste offizielle Firmenlogo von Apple Computer aus dem Jahr 1976?",
      a: [
        "Sir Isaac Newton, der nachdenklich unter einem Baum sitzt, an dem ein Apfel leuchtet",
        "Einen angebissenen Apfel in den sechs leuchtenden Querstreifen des Regenbogens",
        "Eine stilisierte Apfelblüte mit dem Schriftzug „Byte into an Apple“ in Schreibschrift",
        "Ein antikes mechanisches Rechenrad mit Zahnrädern und der Aufschrift Cupertino"
      ],
      explanation: "Das von Ronald Wayne gezeichnete Logo glich einem historischen Stich – Jobs ersetzte es schon 1977 durch Rob Janoffs modernen Regenbogen-Apfel.",
      exp: "Das von Ronald Wayne gezeichnete Logo glich einem historischen Stich – Jobs ersetzte es schon 1977 durch Rob Janoffs modernen Regenbogen-Apfel."
    },
    {
      cat: "apple_design_history",
      diff: "mid",
      q: "Warum zeichnete Designer Rob Janoff 1977 den berühmten Biss in das neue Apple-Logo?",
      a: [
        "Damit die Frucht im Kleinformat eindeutig als Apfel und nicht als Kirsche erkannt wird",
        "Als bewusste grafische Anspielung auf den Speicherbegriff „Byte“ aus der Informatik",
        "Zu Ehren des britischen Krypto-Pioniers Alan Turing und des giftigen Apfels",
        "Als religiöses Symbol für den Baum der Erkenntnis und die Vertreibung aus dem Paradies"
      ],
      explanation: "Die Assoziation zum Computer-Begriff „Byte“ war ein reiner glücklicher Zufall, über den Janoff erst nach Veröffentlichung aufgeklärt wurde.",
      exp: "Die Assoziation zum Computer-Begriff „Byte“ war ein reiner glücklicher Zufall, über den Janoff erst nach Veröffentlichung aufgeklärt wurde."
    },
    {
      cat: "apple_design_history",
      diff: "easy",
      q: "Warum zeigen Produktbildschirme auf offiziellen Apple-Werbefotos fast ausnahmslos exakt 9:41 Uhr an?",
      a: [
        "Weil Steve Jobs das originale iPhone auf der Keynote 2007 um etwa 9:41 Uhr enthüllte",
        "Weil Apple am 9. April 1976 seine erste offizielle Gewerbe-Registrierung abschloss",
        "Weil die Zahlen 9 und 41 im perfekten mathematischen Verhältnis zur Displaybreite stehen",
        "Weil 9:41 Uhr die feste Beginnzeit für alle Design-Präsentationen in Cupertino war"
      ],
      explanation: "Keynotes sind so getaktet, dass das Hauptprodukt nach 40 Minuten enthüllt wird – die Uhrzeit auf der Folie passt so exakt zur echten Armbanduhr.",
      exp: "Keynotes sind so getaktet, dass das Hauptprodukt nach 40 Minuten enthüllt wird – die Uhrzeit auf der Folie passt so exakt zur echten Armbanduhr."
    },
    {
      cat: "apple_design_history",
      diff: "easy",
      q: "Mit welchen berühmten Worten begann 1997 der legendäre „Think Different“-Werbespot von Apple?",
      a: [
        "„Here’s to the crazy ones. The misfits. The rebels. The troublemakers.“",
        "„Change the entire world by changing how people interact with computers.“",
        "„To those who see things differently, no rule is ever cast in solid stone.“",
        "„True innovation always distinguishes a leader from an obedient follower.“"
      ],
      explanation: "Jobs sprach die Tonspur zunächst selbst ein, entschied sich dann aber für die ausgestrahlte Version mit der Stimme des Schauspielers Richard Dreyfuss.",
      exp: "Jobs sprach die Tonspur zunächst selbst ein, entschied sich dann aber für die ausgestrahlte Version mit der Stimme des Schauspielers Richard Dreyfuss."
    },
    {
      cat: "apple_design_history",
      diff: "mid",
      q: "Welcher deutsche Industrie-Designer der Marke Braun prägte Apples Chefdesigner Jony Ive maßgeblich?",
      a: [
        "Dieter Rams",
        "Peter Behrens",
        "Luigi Colani",
        "Walter Gropius"
      ],
      explanation: "Rams' Grundsatz „Weniger, aber besser“ inspirierte unzählige Apple-Klassiker: Der Ur-iPod zitiert das Braun-Taschenradio T3, die iOS-Rechner-App den Braun ET66.",
      exp: "Rams' Grundsatz „Weniger, aber besser“ inspirierte unzählige Apple-Klassiker: Der Ur-iPod zitiert das Braun-Taschenradio T3, die iOS-Rechner-App den Braun ET66."
    },
    {
      cat: "apple_design_history",
      diff: "mid",
      q: "Welche bauliche Besonderheit zeichnet das ringförmige Hauptgebäude des 2017 eröffneten Apple Park aus?",
      a: [
        "Es besitzt die weltgrößten gebogenen Glasscheiben und läuft komplett mit erneuerbarer Energie",
        "Es steht auf riesigen Luftkissen, die jedes Erdbeben bis Stärke neun komplett absorbieren",
        "Das ringförmige Dach ist mit einer transparenten Kuppel aus kugelsicherem Acrylglas überdacht",
        "Die Innenfassade besteht aus thermisch behandeltem Treibholz aus den Küstenwäldern Kaliforniens"
      ],
      explanation: "Im riesigen Innenhof wurden über 9.000 einheimische, trockenheitsresistente Bäume gepflanzt, darunter Aprikosen-, Pflaumen- und Olivenbäume.",
      exp: "Im riesigen Innenhof wurden über 9.000 einheimische, trockenheitsresistente Bäume gepflanzt, darunter Aprikosen-, Pflaumen- und Olivenbäume."
    },
    {
      cat: "apple_design_history",
      diff: "pro",
      q: "Wie wird das massive Dach des runden Glaspavillons des „Steve Jobs Theater“ am Apple Park getragen?",
      a: [
        "Ausschließlich von den tragenden zylindrischen Glasscheiben ohne innere Pfeiler",
        "Von vier getarnten Pfeilern aus Carbon, die gleichzeitig als Belüftungskanäle dienen",
        "Von einem zentralen zylindrischen Aufzugschacht aus massivem Edelstahl in der Mitte",
        "Von magnetischen Spanngliedern, die im umliegenden Granitboden verankert wurden"
      ],
      explanation: "Das 80 Tonnen schwere Dach aus Kohlefaser ruht vollständig auf den Glasscheiben – das größte freitragende Glasbauwerk dieser Art weltweit.",
      exp: "Das 80 Tonnen schwere Dach aus Kohlefaser ruht vollständig auf den Glasscheiben – das größte freitragende Glasbauwerk dieser Art weltweit."
    },
    {
      cat: "apple_design_history",
      diff: "mid",
      q: "Wann und wo eröffnete Steve Jobs im Mai 2001 den allerersten konzerneigenen Apple Retail Store?",
      a: [
        "Im Einkaufszentrum Tysons Corner Center in McLean im US-Bundesstaat Virginia",
        "An der Fifth Avenue in New York City direkt gegenüber dem berühmten Central Park",
        "In der Regent Street im Herzen von London unweit des lebhaften Piccadilly Circus",
        "Am Union Square im geschäftigen Zentrum der kalifornischen Metropole San Francisco"
      ],
      explanation: "Branchenanalysten sagten Apples Stores ein rasches Ende voraus – heute gehören sie zu den profitabelsten Verkaufsflächen der Welt je Quadratmeter.",
      exp: "Branchenanalysten sagten Apples Stores ein rasches Ende voraus – heute gehören sie zu den profitabelsten Verkaufsflächen der Welt je Quadratmeter."
    },
    {
      cat: "apple_design_history",
      diff: "mid",
      q: "Welcher Architekt entwarf gemeinsam mit Steve Jobs den ikonischen Glaswürfel an der Fifth Avenue in New York?",
      a: [
        "Peter Bohlin (Bohlin Cywinski Jackson)",
        "Frank Gehry",
        "Norman Foster",
        "Renzo Piano"
      ],
      explanation: "Steve Jobs hielt persönlich mehrere US-Patente auf die Glaskonstruktion und die selbsttragende Wendeltreppe aus Glas im Inneren.",
      exp: "Steve Jobs hielt persönlich mehrere US-Patente auf die Glaskonstruktion und die selbsttragende Wendeltreppe aus Glas im Inneren."
    },
    {
      cat: "apple_design_history",
      diff: "easy",
      q: "Für welches symbolische Jahresgehalt arbeitete Steve Jobs, als er 1997 zu Apple zurückkehrte?",
      a: [
        "Für exakt 1 US-Dollar pro Jahr",
        "Für exakt 100.000 US-Dollar pro Jahr",
        "Für eine feste Umsatzbeteiligung von 0,1 Prozent",
        "Für ein symbolisches Pfund Äpfel pro Quartal"
      ],
      explanation: "Jobs bezog über viele Jahre hinweg nur diesen einen Dollar als Grundgehalt und verdiente sein Vermögen über seine Aktienpakete und Optionen.",
      exp: "Jobs bezog über viele Jahre hinweg nur diesen einen Dollar als Grundgehalt und verdiente sein Vermögen über seine Aktienpakete und Optionen."
    },
    {
      cat: "apple_design_history",
      diff: "mid",
      q: "Welcher berühmte Modeschöpfer schneiderte den charakteristischen schwarzen Rollkragenpullover von Steve Jobs?",
      a: [
        "Issey Miyake",
        "Giorgio Armani",
        "Ralph Lauren",
        "Calvin Klein"
      ],
      explanation: "Der japanische Designer Issey Miyake fertigte auf Wunsch von Jobs rund 100 identische Exemplare an, damit Jobs morgens nie über Kleidung nachdenken musste.",
      exp: "Der japanische Designer Issey Miyake fertigte auf Wunsch von Jobs rund 100 identische Exemplare an, damit Jobs morgens nie über Kleidung nachdenken musste."
    },

    // =========================================================================
    // KATEGORIE 5: apple_flops_curiosities (12 Fragen: Flops, Kurioses & Insider-Wissen)
    // =========================================================================
    {
      cat: "apple_flops_curiosities",
      diff: "easy",
      q: "Welcher Makel des Apple Newton MessagePad (1993) wurde sogar in einer Episode der „Simpsons“ verspottet?",
      a: [
        "Die fehlerhafte Schrifterkennung, die handschriftliche Notizen in sinnlosen Buchstabensalat verwandelte",
        "Ein integrierter Fax-Empfänger, dessen Heizelemente das Faxpapier bei direkter Sonne entzündeten",
        "Ein Mikrofon, das unbeabsichtigt Ferngespräche wählte, sobald im selben Zimmer laute Musik lief",
        "Eine Gehäusebeschichtung, die bei Kontakt mit salzigem Handschweiß nach Wochen grünlich oxidierte"
      ],
      explanation: "In den Simpsons schrieb Schulrowdy Dolph die Drohung „Beat up Martin“ auf den Newton, worauf das Gerät prompt „Eat up Martha“ anzeigte.",
      exp: "In den Simpsons schrieb Schulrowdy Dolph die Drohung „Beat up Martin“ auf den Newton, worauf das Gerät prompt „Eat up Martha“ anzeigte."
    },
    {
      cat: "apple_flops_curiosities",
      diff: "pro",
      q: "Auf welcher technischen Basis lief die von Bandai gebaute, kolossal gefloppte Spielekonsole „Apple Pippin“ (1996)?",
      a: [
        "Auf einer abgespeckten Version von Mac OS 7.5 mit einem PowerPC-603-Prozessor",
        "Auf einem angepassten Sony-PlayStation-Board mit modifiziertem Apple-Bios",
        "Auf einem proprietären Unix-Kernel mit integriertem Laserdisc-Laufwerk",
        "Auf dem Betriebssystem des Newton MessagePad mit analogem TV-Anschluss"
      ],
      explanation: "Mit einem Verkaufspreis von knapp 600 Dollar und fast keinen guten Spielen war die Konsole chancenlos gegen Nintendo 64 und PlayStation.",
      exp: "Mit einem Verkaufspreis von knapp 600 Dollar und fast keinen guten Spielen war die Konsole chancenlos gegen Nintendo 64 und PlayStation."
    },
    {
      cat: "apple_flops_curiosities",
      diff: "mid",
      q: "Was war die „Apple QuickTake“, die Apple von 1994 bis 1997 für Endverbraucher verkaufte?",
      a: [
        "Eine der weltweit ersten Digitalkameras für den privaten Heimanwendermarkt",
        "Ein mobiles Diktiergerät mit Aufzeichnung auf winzigen Magnetbändern",
        "Ein portabler Thermodrucker für Schnappschüsse direkt am Macintosh",
        "Ein kabelloser Strichcode-Handscanner für kleine Einzelhandelsgeschäfte"
      ],
      explanation: "Die zusammen mit Kodak entwickelte QuickTake 100 speicherte genau acht Digitalfotos in einer Auflösung von 640×480 Pixeln im internen Flash-Speicher.",
      exp: "Die zusammen mit Kodak entwickelte QuickTake 100 speicherte genau acht Digitalfotos in einer Auflösung von 640×480 Pixeln im internen Flash-Speicher."
    },
    {
      cat: "apple_flops_curiosities",
      diff: "mid",
      q: "Welches Problem sorgte beim wunderschönen, lüfterlosen Power Mac G4 Cube (2000) für Kundenverärgerung?",
      a: [
        "Feine Haarrisse im transparenten Acrylglas-Gehäuse, die beim Spritzgießen im Werk entstanden",
        "Ein Klarlack, der sich unter Einwirkung normaler Schreibtischlampen nach Monaten gelblich verfärbte",
        "Ein staubanziehendes Gehäuse, das wegen verklebter Schalen vom Kunden niemals gereinigt werden konnte",
        "Ein berührungsempfindlicher Ein-Schalter, der bei hoher Luftfeuchtigkeit den Rechner ausschaltete"
      ],
      explanation: "Obwohl der Cube wegen seines avantgardistischen Designs sogar im MoMA ausgestellt wurde, stellte Apple den Verkauf nach nur einem Jahr ein.",
      exp: "Obwohl der Cube wegen seines avantgardistischen Designs sogar im MoMA ausgestellt wurde, stellte Apple den Verkauf nach nur einem Jahr ein."
    },
    {
      cat: "apple_flops_curiosities",
      diff: "easy",
      q: "Welches Problem führte bei der 2015 eingeführten ultraflachen Butterfly-Tastatur zu weltweiten Sammelklagen?",
      a: [
        "Schon kleinste Staubkrümel blockierten Tasten oder führten zu doppelten Anschlägen beim Tippen",
        "Die Buchstabenbeschriftung rieb sich durch normalen Fingerschweiß binnen weniger Wochen ab",
        "Die interne Tastenbeleuchtung erhitzte die Kappen so stark, dass sich die Leertaste verzog",
        "Die Mechanik war so schwergängig konstruiert, dass Nutzer nach kurzer Zeit Sehnenscheidenentzündungen bekamen"
      ],
      explanation: "Apple musste ein kostenloses weltweites Tastatur-Reparaturprogramm auflegen und kehrte 2019 reumütig zum bewährten Scherenmechanismus zurück.",
      exp: "Apple musste ein kostenloses weltweites Tastatur-Reparaturprogramm auflegen und kehrte 2019 reumütig zum bewährten Scherenmechanismus zurück."
    },
    {
      cat: "apple_flops_curiosities",
      diff: "easy",
      q: "Welches Zubehörteil für das Pro Display XDR sorgte auf der WWDC 2019 für ungläubiges Raunen im Saal?",
      a: [
        "Ein höhenverstellbarer Aluminium-Monitorfuß („Pro Stand“) für stolze 999 US-Dollar",
        "Ein magnetisch haftender Blendschutzrahmen aus echtem Leder für 499 US-Dollar",
        "Ein vergoldetes zwei Meter langes Thunderbolt-3-Kabel für 299 US-Dollar",
        "Ein Reinigungsspray mit Mikrofasertuch im edlen Aluminiumspender für 199 US-Dollar"
      ],
      explanation: "Als der Preis von 999 Dollar auf der Leinwand erschien, ging ein vernehmbares Stöhnen durch die anwesenden Entwickler und Journalisten.",
      exp: "Als der Preis von 999 Dollar auf der Leinwand erschien, ging ein vernehmbares Stöhnen durch die anwesenden Entwickler und Journalisten."
    },
    {
      cat: "apple_flops_curiosities",
      diff: "easy",
      q: "Für welchen viralen Internet-Hype sorgte Apple im Herbst 2021 mit einem simplen Reinigungszubehör?",
      a: [
        "Ein einfaches weißes Poliertuch für 25 Euro, das monatelang restlos ausverkauft war",
        "Eine Schutzkappe für die Apple-Watch-Krone aus feinstem Leder für 49 Euro",
        "Ein Set aus vier Ersatz-Gummifüßen für das MacBook Air zum Aufkleben für 35 Euro",
        "Ein Designer-Aufkleberbogen mit Apple-Logos in limitierten Pastellfarben für 19 Euro"
      ],
      explanation: "Auf der Produktseite listete Apple mit trockenem Humor jedes einzelne jemals gebaute iPhone-, iPad- und Mac-Modell als offiziell „kompatibel“ auf.",
      exp: "Auf der Produktseite listete Apple mit trockenem Humor jedes einzelne jemals gebaute iPhone-, iPad- und Mac-Modell als offiziell „kompatibel“ auf."
    },
    {
      cat: "apple_flops_curiosities",
      diff: "easy",
      q: "Welche Design-Eigenart der wiederaufladbaren Magic Mouse 2 (2015) amüsierte die Tech-Welt jahrelang?",
      a: [
        "Der Lightning-Ladeanschluss lag auf der Unterseite, sodass die Maus beim Laden auf dem Rücken lag",
        "Zum Anschließen des Ladekabels musste die optische Sensorlinse mit einer Münze herausgedreht werden",
        "Die Maus konnte ausschließlich drahtlos über ein teures Spezial-Mauspad von Apple geladen werden",
        "Während des Ladevorgangs wurden automatisch alle Bluetooth-Funktionen des Macs blockiert"
      ],
      explanation: "Obwohl zwei Minuten Ladezeit für einen vollen Arbeitstag reichten, wurde das Bild der hilflos auf dem Rücken liegenden Maus zum Dauerbrenner im Netz.",
      exp: "Obwohl zwei Minuten Ladezeit für einen vollen Arbeitstag reichten, wurde das Bild der hilflos auf dem Rücken liegenden Maus zum Dauerbrenner im Netz."
    },
    {
      cat: "apple_flops_curiosities",
      diff: "mid",
      q: "Welches ungewöhnliche Warensortiment vertrieb Apple nach Steve Jobs' erstem Abgang im Jahr 1986?",
      a: [
        "Einen eigenen Lifestyle-Katalog („The Apple Collection“) mit Kleidung, Windsurfern und Geschirr",
        "Ein mobiles Expeditions-Zelt mit integrierten Solarzellen und 12-Volt-Macintosh-Anschluss",
        "Eine Kollektion ergonomischer Kniestühle mit knallbuntem Regenbogen-Stoffbezug",
        "Einen batteriebetriebenen Rollschuh mit digitaler Geschwindigkeitsanzeige auf einem LC-Display"
      ],
      explanation: "Der Katalog bot bunte Apple-Sweatshirts, Polohemden, Gürtel, ein Windsurf-Segel und sogar eine bunte Kinderarmbanduhr im 80er-Jahre-Look.",
      exp: "Der Katalog bot bunte Apple-Sweatshirts, Polohemden, Gürtel, ein Windsurf-Segel und sogar eine bunte Kinderarmbanduhr im 80er-Jahre-Look."
    },
    {
      cat: "apple_flops_curiosities",
      diff: "pro",
      q: "Welches kultige Maskottchen mit dem Ruf „Moof!“ tauchte ab 1986 im Druckerdialog des Macintosh auf?",
      a: [
        "Clarus the Dogcow (eine kuriose Kreuzung aus Hund und Kuh)",
        "Tux the Penguin (ein Pinguin mit angebissener Apple-Mütze)",
        "Glenda the Cat (eine schielende Katze auf dem Schreibtisch)",
        "Byte the Rabbit (ein weißes Kaninchen mit Stromkabel-Schwanz)"
      ],
      explanation: "Clarus wurde von Susan Kare gezeichnet, um im Druckmenü anschaulich zu demonstrieren, wie ein Blatt gedreht und skaliert wird.",
      exp: "Clarus wurde von Susan Kare gezeichnet, um im Druckmenü anschaulich zu demonstrieren, wie ein Blatt gedreht und skaliert wird."
    },
    {
      cat: "apple_flops_curiosities",
      diff: "mid",
      q: "Wie umging Steve Jobs jahrelang die Pflicht zu amtlichen Kfz-Kennzeichen an seinem silbernen Mercedes-Sportwagen?",
      a: [
        "Er leaste alle sechs Monate ein Neufahrzeug, da in Kalifornien Neuwagen bis zu 180 Tage ohne Schild fahren durften",
        "Er zahlte eine pauschale jährliche Sonderabgabe an die Stadt Cupertino für eine offizielle Ausnahmegenehmigung",
        "Er ließ anstelle eines Metallblechs einen digital gescannten Barcode auf die hintere Stoßstange lasern",
        "Er meldete seine Dienstwagen als rollende mobile Kunstinstallationen im Nachbarstaat Nevada an"
      ],
      explanation: "Jobs nutzte dieses kalifornische Gesetzes-Schlupfloch konsequent aus und parkte den wagen notorisch auf Behindertenparkplätzen am Campus.",
      exp: "Jobs nutzte dieses kalifornische Gesetzes-Schlupfloch konsequent aus und parkte den wagen notorisch auf Behindertenparkplätzen am Campus."
    },
    {
      cat: "apple_flops_curiosities",
      diff: "easy",
      q: "Warum entschied sich Steve Jobs im Jahr 1976 für den Firmennamen „Apple Computer“?",
      a: [
        "Er kam von einer Apfelplantage, mochte den frischen Klang und der Name stand im Telefonbuch vor Atari",
        "Er wollte den Beatles und deren eigenem Musikplatten-Label Apple Corps eine persönliche Hommage widmen",
        "Mitgründer Steve Wozniak aß während der Bauphase des ersten Prototyps fast ausschließlich Äpfel",
        "Ein Apfel war das einzige Nahrungsmittel, das Jobs während seiner damaligen Zen-Fastenkur akzeptierte"
      ],
      explanation: "Jobs setzte Wozniak eine Frist: Falls bis zum Nachmittag keinem ein besserer Einfall komme, heiße das Unternehmen Apple – und dabei blieb es.",
      exp: "Jobs setzte Wozniak eine Frist: Falls bis zum Nachmittag keinem ein besserer Einfall komme, heiße das Unternehmen Apple – und dabei blieb es."
    }
  ];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === 'function') {
    window.ArcadeQuizEngine.registerBank('apple', DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS['apple'] = DATA;
  }
})();
