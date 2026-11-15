// Prozessoren-Quiz (2000–Heute · 16 Fotos)
(function () {
const DATA = [
    {
      id: 1,
      cat: 'ghz_64bit',
      eraLabel: 'Jahr 2000 · Sockel A (462)',
      img: './img/cpu-01.jpg',
      q: 'Welcher AMD-Prozessor im Keramik-Gehäuse (Sockel A) integrierte im Juni 2000 erstmals 256 KB Full-Speed-On-Die-L2-Cache, besaß keinen Heatspreader und erlaubte das berühmte „Bleistift-Overclocking“ über die L1-Brücken?',
      a: ['AMD Athlon „Thunderbird“ (K7)', 'AMD K6-2 (Super Socket 7)', 'Intel Pentium III „Coppermine“', 'VIA Cyrix III'],
      wasDasIst: {
        title: 'AMD Athlon „Thunderbird“ (K7)',
        nick: '„T-Bird“ · Der Bleistift-Trick-Klassiker',
        year: 'Juni 2000 (700 MHz – 1,4 GHz)',
        node: '180 nm (Austin / Fab 30 Dresden mit Kupfer-Interconnects)',
        socket: 'Sockel A (PGA 462)',
        cores: '1 Kern · 1 Thread (3-fach Superskalar)',
        trivia: 'Beim Athlon Thunderbird lag das empfindliche Silizium-Die noch völlig offen auf dem Keramikträger (vier Moosgummi-Pads schützten vor verkanteten Kühlern). Legendär wurde er, weil man die lasergeschnittenen L1-Brücken auf der Oberseite einfach mit einem Graphit-Bleistift nachzeichnen konnte, um den Multiplikator freizuschalten!'
      },
      credit: {
        artist: 'Krdan',
        license: 'CC BY 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
        commons: 'File:AMD Athlon 1.1Ghz Thunderbird.jpg'
      }
    },
    {
      id: 2,
      cat: 'ghz_64bit',
      eraLabel: '2000–2004 · NetBurst-Ära',
      img: './img/cpu-02.jpg',
      q: 'Mit welcher Prozessorfamilie setzte Intel ab 2000 auf die extrem langstufige „NetBurst“-Pipeline (20 bis 31 Stufen), um Taktraten bis fast 4 GHz zu erreichen, und führte den vernickelten Kupfer-Heatspreader (IHS) im Mainstream ein?',
      a: ['Intel Pentium 4 (Willamette / Northwood / Prescott)', 'Intel Pentium Pro', 'Intel Itanium (IA-64)', 'AMD Sempron'],
      wasDasIst: {
        title: 'Intel Pentium 4 („Northwood“ / NetBurst)',
        nick: 'Das Gigahertz-Wettrennen',
        year: '2000–2006 (hier 2,80 GHz Northwood, Sockel 478)',
        node: '180 nm → 130 nm (Northwood) → 90 nm (Prescott)',
        socket: 'Sockel 423 / Sockel 478 / LGA 775',
        cores: '1 Kern (ab 3,06 GHz mit Hyper-Threading = 2 Threads)',
        trivia: 'Intels NetBurst-Architektur war ursprünglich für bis zu 10 GHz entworfen. Während der 130-nm-„Northwood“ (im Bild) sehr beliebt und kühl blieb, stieß der nachfolgende 90-nm-„Prescott“ mit 31-stufiger Pipeline an die physikalische Abwärmemauer („Power Wall“) und leitete die Wende hin zu Multicore-Prozessoren ein.'
      },
      credit: {
        artist: 'Raimond Spekking',
        license: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        commons: 'File:Intel Pentium 4 2.80A-4014.jpg'
      }
    },
    {
      id: 3,
      cat: 'ghz_64bit',
      eraLabel: 'September 2003 · K8-Revolution',
      img: './img/cpu-03.jpg',
      q: 'Welcher Meilenstein-Prozessor von AMD brachte im September 2003 erstmals die abwärtskompatible 64-Bit-Erweiterung (AMD64 / x86-64) UND einen direkt im Prozessor integrierten Speichercontroller auf den Desktop?',
      a: ['AMD Athlon 64 („ClawHammer“ / K8)', 'AMD Phenom X4', 'Intel Core Duo „Yonah“', 'Transmeta Crusoe'],
      wasDasIst: {
        title: 'AMD Athlon 64 3200+ („ClawHammer“)',
        nick: 'Begründer von x86-64 (AMD64)',
        year: 'September 2003',
        node: '130 nm SOI (Silicon on Insulator)',
        socket: 'Sockel 754 / Sockel 939',
        cores: '1 Kern · Integrierter DDR-Speichercontroller & HyperTransport',
        trivia: 'Während Intel mit dem inkompatiblen Itanium (IA-64) scheiterte, erweiterte AMD den klassischen x86-Befehlssatz elegant auf 64 Bit (AMD64) – sodass Intel ihn später als „Intel 64“ (EM64T) lizenzieren musste. Zudem wanderte der RAM-Controller aus der langsamen Northbridge direkt in die CPU.'
      },
      credit: {
        artist: 'Thomas Nguyen',
        license: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        commons: 'File:AMD Athlon 64 3200+ ADA3200AEP5AP.jpg'
      }
    },
    {
      id: 4,
      cat: 'ghz_64bit',
      eraLabel: 'März 2003 · Centrino-Plattform',
      img: './img/cpu-04.jpg',
      q: 'Welcher von Intels Forschungszentrum in Haifa (Israel) entwickelte Notebook-Prozessor kehrte 2003 zur effizienten P6/Pentium-III-Basis zurück und wurde zum direkten Urahn der späteren Core-Architektur?',
      a: ['Intel Pentium M („Banias“ / „Dothan“)', 'Intel Atom N270', 'Intel Celeron „Mendocino“', 'VIA C7-M'],
      wasDasIst: {
        title: 'Intel Pentium M („Banias“ / „Dothan“)',
        nick: 'Der heimliche Retter von Intel',
        year: '2003–2005 (Herzstück der „Intel Centrino“-Notebooks)',
        node: '130 nm (Banias) / 90 nm (Dothan)',
        socket: 'Sockel 479',
        cores: '1 Kern · Hohe Pro-Takt-Leistung (IPC) bei nur 21–27 W TDP',
        trivia: 'Ein Pentium M mit 1,7 GHz schlug in vielen Spielen und Anwendungen einen 2,8 GHz schnellen Pentium 4 bei einem Bruchteil des Stromverbrauchs. Enthusiasten bauten ihn per Adapter (ASUS CT-479) sogar in Desktop-Mainboards ein, bevor Intel die Architektur zu Core Duo und Core 2 Duo weiterentwickelte.'
      },
      credit: {
        artist: 'Christiaan Colen',
        license: 'CC BY-SA 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        commons: 'File:Intel Pentium M processor.jpg'
      }
    },
    {
      id: 5,
      cat: 'ghz_64bit',
      eraLabel: 'Mai 2005 · Dual-Core-Pionier',
      img: './img/cpu-05.jpg',
      q: 'Welcher Desktop-Prozessor von AMD vereinte 2005 zwei vollwertige K8-Rechenkerne samt System Request Queue und Crossbar-Switch nativ auf einem gemeinsamen Silizium-Die?',
      a: ['AMD Athlon 64 X2', 'AMD Duron „Spitfire“', 'Intel Pentium II OverDrive', 'IBM PowerPC G5'],
      wasDasIst: {
        title: 'AMD Athlon 64 X2',
        nick: 'Nativer Dual-Core für Sockel 939 & AM2',
        year: 'Mai 2005 (Manchester / Toledo / Windsor)',
        node: '90 nm / 65 nm SOI',
        socket: 'Sockel 939 / Sockel AM2',
        cores: '2 Kerne · 2 Threads',
        trivia: 'Während Intels erster Dual-Core (Pentium D „Smithfield“) noch zwei getrennte Pentium-4-Dies über den langsamen Front-Side-Bus koppelte, kommunizierten die beiden Kerne des Athlon 64 X2 direkt auf dem Chip mit minimaler Latenz.'
      },
      credit: {
        artist: 'Trio3D',
        license: 'CC BY-SA 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        commons: 'File:AMD Athlon 64 X2 3800+ (Windsor AM2).png'
      }
    },
    {
      id: 6,
      cat: 'ghz_64bit',
      eraLabel: 'Juli 2006 · Conroe-Durchbruch',
      img: './img/cpu-06.jpg',
      q: 'Mit welchem Dual-Core-Prozessor (Codename „Conroe“, hier das beliebte Modell E6600 mit 4 MB L2-Cache) gelang Intel im Sommer 2006 ein gewaltiger Leistungssprung von +40 % bei gleichzeitig 40 % weniger Energiebedarf?',
      a: ['Intel Core 2 Duo (E6600 „Conroe“)', 'Intel Pentium D 820', 'Intel Core i3-530', 'AMD Athlon XP 3200+'],
      wasDasIst: {
        title: 'Intel Core 2 Duo E6600 („Conroe“)',
        nick: 'Intels großes Architektur-Comeback',
        year: 'Juli 2006',
        node: '65 nm',
        socket: 'LGA 775',
        cores: '2 Kerne · 2,40 GHz · 4 MB geteilter Smart-L2-Cache (65 W TDP)',
        trivia: 'Der Core 2 Duo E6600 beendete die NetBurst-Ära endgültig: Mit 4-fach superskalarer Ausführung (Wide Dynamic Execution) und Macro-Fusion ließ er sich auf vielen LGA-775-Boards mühelos von 2,4 auf über 3,2 GHz übertakten.'
      },
      credit: {
        artist: 'Lance Fisher',
        license: 'CC BY-SA 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        commons: 'File:Intel Core 2 Duo 6600 in Package.jpg'
      }
    },
    {
      id: 7,
      cat: 'ghz_64bit',
      eraLabel: 'Januar 2007 · Quad-Core-Legende',
      img: './img/cpu-07.jpg',
      q: 'Welcher legendäre erste Mainstream-Quad-Core von Intel (2,40 GHz, 8 MB L2-Cache, berühmt im „G0-Stepping“ SLACR) hielt sich dank Übertaktung auf 3,2–3,6 GHz oft über 7 Jahre lang in Gaming-PCs?',
      a: ['Intel Core 2 Quad Q6600 („Kentsfield“)', 'Intel Core 2 Extreme QX9770', 'AMD Phenom II X4 955', 'Intel Xeon E5450'],
      wasDasIst: {
        title: 'Intel Core 2 Quad Q6600 („Kentsfield“)',
        nick: 'Der unsterbliche „G0-Stepping“-Vierkerner',
        year: 'Januar 2007',
        node: '65 nm (Multi-Chip-Modul aus zwei Conroe-Dual-Core-Dies)',
        socket: 'LGA 775',
        cores: '4 Kerne · 4 Threads · 2,40 GHz · 2× 4 MB L2-Cache',
        trivia: 'Unter dem Heatspreader des Q6600 saßen zwei eng benachbarte Dual-Core-Dies. Sobald im Sommer 2007 das kühlere 95-Watt-„G0-Stepping“ (S-Spec SLACR) erschien und der Preis auf rund 200 € fiel, wurde der Q6600 zum wohl langlebigsten Preis-Leistungs-Prozessor der 2000er Jahre.'
      },
      credit: {
        artist: 'Trio3D',
        license: 'CC BY-SA 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        commons: 'File:Intel Core 2 Quad Q6600.png'
      }
    },
    {
      id: 8,
      cat: 'ghz_64bit',
      eraLabel: 'November 2006 · STI-Allianz (PS3)',
      img: './img/cpu-08.jpg',
      q: 'Welcher von Sony, Toshiba und IBM gemeinsam entwickelte heterogene Prozessor kombinierte einen PowerPC-Hauptkern (PPE) mit acht pfeilschnellen Vektor-Co-Prozessoren (SPEs) für die PlayStation 3 und Supercomputer?',
      a: ['Cell Broadband Engine (Cell BE)', 'IBM PowerPC 970 (Apple G5)', 'Sun UltraSPARC T1', 'MIPS R10000'],
      wasDasIst: {
        title: 'STI Cell Broadband Engine (Cell BE)',
        nick: 'Das heterogene Herz der PlayStation 3',
        year: '2006',
        node: '90 nm → 65 nm → 45 nm SOI',
        socket: 'BGA auf dem PlayStation-3-Mainboard / Blade-Server',
        cores: '1× PPE (Power Processing Element) + 8× SPE (Synergistic Processing Elements) @ 3,2 GHz',
        trivia: 'Für Spieleentwickler war die Cell-CPU anfangs ein Albtraum zu programmieren, bot aber bei sauberer Nutzung der lokalen 256-KB-Speicher (Local Stores) der SPEs und des 200 GB/s schnellen Element Interconnect Bus (EIB) eine für 2006 atemberaubende Gleitkommaleistung (u. a. für Folding@home und den ersten PetaFLOPS-Supercomputer Roadrunner).'
      },
      credit: {
        artist: 'Greenpro',
        license: 'CC BY-SA 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        commons: 'File:CELL BE processor PS3 board.jpg'
      }
    },
    {
      id: 9,
      cat: 'modern_chiplets',
      eraLabel: 'November 2008 · Beginn der Core-i-Serie',
      img: './img/cpu-09.jpg',
      q: 'Welcher Prozessor (Codename „Bloomfield“ / Nehalem, Sockel LGA 1366) begründete Ende 2008 die „Core i7“-Marke, verabschiedete den Front-Side-Bus zugunsten von QPI und brachte einen integrierten Triple-Channel-DDR3-Controller mit?',
      a: ['Intel Core i7-920 („Nehalem / Bloomfield“)', 'Intel Core i5-750 („Lynnfield“)', 'Intel Core i7-4770K („Haswell“)', 'AMD Phenom X4 9850'],
      wasDasIst: {
        title: 'Intel Core i7-920 („Bloomfield“ / Nehalem)',
        nick: 'Der erste Core i7 der Geschichte',
        year: 'November 2008',
        node: '45 nm High-k Metal Gate',
        socket: 'LGA 1366',
        cores: '4 Kerne · 8 Threads (SMT / Hyper-Threading) · 2,66 GHz',
        trivia: 'Mit Nehalem vereinte Intel vier Kerne monolithisch auf einem Die, holte Hyper-Threading in stark verbesserter Form zurück und integrierte erstmals auch bei Intel den Speichercontroller direkt in die CPU (mit gleich drei DDR3-Kanälen auf X58-Mainboards).'
      },
      credit: {
        artist: 'Alan Lorenzo',
        license: 'CC BY-SA 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        commons: 'File:Intel Core I7-920 Boxed - 14.JPG'
      }
    },
    {
      id: 10,
      cat: 'modern_chiplets',
      eraLabel: 'Januar 2011 · Die 5-GHz-Übertakter-Ikone',
      img: './img/cpu-10.jpg',
      q: 'Welche 32-nm-Prozessorgeneration von Intel (hier der legendäre Core i7-2600K neben dem i5-2500K) führte 2011 den Ringbus, AVX-Befehle, verlöteten Heatspreader und ein „K“-Suffix für offene Multiplikatoren bis ~5 GHz mit Luftkühlung ein?',
      a: ['Intel Core i7-2600K („Sandy Bridge“)', 'Intel Core i7-3770K („Ivy Bridge“)', 'Intel Core i7-6700K („Skylake“)', 'Intel Core i7-7700K („Kaby Lake“)'],
      wasDasIst: {
        title: 'Intel Core i7-2600K („Sandy Bridge“)',
        nick: 'Meisterwerk der 32-nm-Ära (mit verlötetem IHS!)',
        year: 'Januar 2011',
        node: '32 nm',
        socket: 'LGA 1155',
        cores: '4 Kerne · 8 Threads · 3,40 GHz (Boost 3,80 GHz, OC oft 4,8–5,0 GHz)',
        trivia: 'Sandy Bridge führte einen internen Micro-Op-Cache, den schnellen Ringbus zwischen Kernen, L3-Cache und iGPU sowie einen mit Indium verlöteten Heatspreader ein (ab Ivy Bridge nutzte Intel jahrelang nur noch Wärmeleitpaste). Deshalb blieben i5-2500K und i7-2600K bei 4,8 GHz kühl und hielten fast ein Jahrzehnt durch.'
      },
      credit: {
        artist: 'Laineema',
        license: 'CC BY 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
        commons: 'File:Intel Core i7 2600K CPU.jpg'
      }
    },
    {
      id: 11,
      cat: 'modern_chiplets',
      eraLabel: '2011/2012 · Sockel AM3+ & CMT-Module',
      img: './img/cpu-11.jpg',
      q: 'Mit welcher Prozessorfamilie für Sockel AM3+ experimentierte AMD ab 2011 mit „Clustered Multithreading“-Modulen (je zwei Integer-Kerne teilten sich eine Gleitkommaeinheit/FPU) und stellte Taktraten-Weltrekorde von über 8,4 GHz unter Flüssigstickstoff auf?',
      a: ['AMD FX-Serie („Bulldozer“ / „Piledriver“)', 'AMD Phenom II X6 („Thuban“)', 'AMD A10-7850K („Kaveri“)', 'AMD Opteron „Magny-Cours“'],
      wasDasIst: {
        title: 'AMD FX-Serie („Bulldozer“ / „Piledriver“ · AM3+)',
        nick: 'Taktraten-Rekordhalter mit Modul-Architektur',
        year: 'Oktober 2011 (Bulldozer) / Oktober 2012 (Vishera / Piledriver)',
        node: '32 nm SOI (GlobalFoundries Dresden)',
        socket: 'Sockel AM3+ (PGA 942)',
        cores: 'Bis zu 4 Module / 8 Integer-Kerne (FX-8150 / FX-8350)',
        trivia: 'Obwohl die geteilten Decoder und Gleitkommaeinheiten in damaligen Single-Thread-Spielen zu einer niedrigen Pro-Takt-Leistung (IPC) führten, erreichte der Bulldozer-Chip extreme Taktraten (8.429 MHz Guinness-Weltrekord 2011) und legte den Grundstein für AMDs Entscheidung, für „Zen“ ein komplett neues Design vom weißen Blatt Papier zu starten.'
      },
      credit: {
        artist: 'Raimond Spekking',
        license: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        commons: 'File:MSI 760GM-E51 (FX) - AMD FX-4100 (FD4100WMW4KGU) in socket AM3b-5364.jpg'
      }
    },
    {
      id: 12,
      cat: 'modern_chiplets',
      eraLabel: 'Seit 2012 · ARM-Einplatinen-Revolution',
      img: './img/cpu-12.jpg',
      q: 'Welcher kreditkartengroße Einplatinencomputer mit Broadcom-ARM-SoC startete 2012 für 35 US-Dollar, um Schülern das Programmieren beizubringen, und wurde mit über 60 Millionen verkauften Boards zum Kult-Rechner für Maker, Server und Heimautomation?',
      a: ['Raspberry Pi (Broadcom BCM-ARM-SoC)', 'Arduino Uno (ATmega328P)', 'Intel Galileo (Quark SoC)', 'BBC Micro:bit'],
      wasDasIst: {
        title: 'Raspberry Pi (Broadcom ARM SoC)',
        nick: 'Der 35-Dollar-Rechner, der ARM auf den Schreibtisch brachte',
        year: '2012 (Model B mit BCM2835) bis heute (hier Pi 4 Model B mit BCM2711 Cortex-A72)',
        node: '40 nm (Pi 1) → 28 nm (Pi 4) → 16 nm (Pi 5)',
        socket: 'BGA System-on-a-Chip (SoC)',
        cores: '1× ARM11 @ 700 MHz (Pi 1) bis 4× Cortex-A76 @ 2,4 GHz (Pi 5)',
        trivia: 'Eben Upton und die Raspberry Pi Foundation rechneten 2012 ursprünglich mit insgesamt 10.000 verkauften Platinen – allein am ersten Tag brachen die Webshops der Distributoren unter Hunderttausenden Bestellungen zusammen.'
      },
      credit: {
        artist: 'Laserlicht',
        license: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        commons: 'File:Raspberry Pi 4 Model B - Side.jpg'
      }
    },
    {
      id: 13,
      cat: 'modern_chiplets',
      eraLabel: 'März 2017 · Das +52-%-IPC-Comeback',
      img: './img/cpu-13.jpg',
      q: 'Mit welchem Achtkern-Prozessor (16 Threads, Sockel AM4) feierte AMD im März 2017 unter Chefarchitekt Jim Keller einen historischen IPC-Sprung von über +52 % gegenüber „Excavator“ und beendete die jahrelange Vierkern-Stagnation im Mainstream?',
      a: ['AMD Ryzen 7 1800X („Zen 1“ / Summit Ridge)', 'AMD Ryzen 9 3950X („Zen 2“)', 'Intel Core i7-8700K („Coffee Lake“)', 'AMD Athlon 200GE'],
      wasDasIst: {
        title: 'AMD Ryzen 7 1800X („Summit Ridge“ / Zen 1)',
        nick: 'Der Startschuss der langlebigen AM4-Plattform',
        year: 'März 2017',
        node: '14 nm LPP (GlobalFoundries)',
        socket: 'Sockel AM4 (PGA 1331)',
        cores: '8 Kerne · 16 Threads (2 CCX à 4 Kerne verbunden über Infinity Fabric)',
        trivia: 'Bis Februar 2017 kostete ein Achtkern-Prozessor von Intel (Core i7-6900K) über 1.000 Euro. Der Ryzen 7 1800X lieferte vergleichbare Multithreading-Leistung zum halben Preis auf der Mainstream-Plattform AM4 – auf der Nutzer später sogar noch bis zum Ryzen 7 5800X3D aufrüsten konnten!'
      },
      credit: {
        artist: 'Brian Wong',
        license: 'CC BY-SA 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        commons: 'File:AMD Ryzen 7 1800X.jpg'
      }
    },
    {
      id: 14,
      cat: 'modern_chiplets',
      eraLabel: '2017–Heute · HEDT & Workstation-Gigant',
      img: './img/cpu-14.jpg',
      q: 'Welche riesige Workstation-Prozessorfamilie von AMD nutzt ein handtellergroßes LGA-Package (über 4.000 bis 4.844 Kontakte!) und kombiniert bis zu 64 oder 96 Zen-Kerne als Chiplets rund um einen zentralen I/O-Die?',
      a: ['AMD Ryzen Threadripper (TR4 / sTRX4 / sTR5)', 'Intel Xeon Phi „Knights Landing“', 'AMD Opteron 6386 SE', 'Intel Core i9-7980XE'],
      wasDasIst: {
        title: 'AMD Ryzen Threadripper (hier 7970X Unterseite)',
        nick: 'Das Multi-Chiplet-Kraftwerk im Server-Format',
        year: 'seit August 2017 (1950X mit 16 Kernen bis 7995WX mit 96 Kernen)',
        node: '14 nm → 7 nm → 5 nm TSMC (Chiplets / CCDs)',
        socket: 'TR4 / sTRX4 / sTR5 (LGA 4094 / LGA 4844)',
        cores: '16 bis 96 Kerne (32 bis 192 Threads) · Quad- bis Octa-Channel-RAM',
        trivia: 'Threadripper entstand ursprünglich als Feierabend-Projekt („Skunkworks“) einiger AMD-Ingenieure auf Basis des EPYC-Server-Gehäuses. Durch den modularen Aufbau aus kompakten 8-Kern-Chiplets (CCDs) und einem zentralen I/O-Die revolutionierte AMD die Ausbeute (Yield-Rate) bei Hochleistungsprozessoren.'
      },
      credit: {
        artist: 'PantheraLeo1359531',
        license: 'CC BY 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
        commons: 'File:Unterseite des AMD Ryzen Threadripper 7970X 20240407 074.jpg'
      }
    },
    {
      id: 15,
      cat: 'modern_chiplets',
      eraLabel: 'November 2020 · Apple Silicon Wende',
      img: './img/cpu-15.jpg',
      q: 'Mit welchem 5-nm-ARM64-System-on-a-Chip (inklusive direkt auf dem Package verlötetem Unified-Memory-LPDDR4X-RAM) verabschiedete sich Apple im November 2020 bei MacBook Air, Pro und Mac mini von Intel-x86-Prozessoren?',
      a: ['Apple M1 (Apple Silicon)', 'Qualcomm Snapdragon 8cx', 'Apple A4', 'NVIDIA Tegra X1'],
      wasDasIst: {
        title: 'Apple M1 (Apple Silicon SoC)',
        nick: 'Unified Memory & lüfterlose 5-nm-Effizienz',
        year: 'November 2020',
        node: '5 nm (TSMC N5 · 16 Milliarden Transistoren)',
        socket: 'BGA mit integriertem Unified Memory (zwei DRAM-Chips direkt neben dem Die)',
        cores: '8 CPU-Kerne (4× „Firestorm“ Performance + 4× „Icestorm“ Efficiency) + 8-Kern-GPU + 16-Kern-NPU',
        trivia: 'Auf dem Foto erkennt man links das glänzende M1-Silizium-Die und rechts direkt daneben auf demselben Träger die beiden LPDDR4X-Speicherpakete (Unified Memory Architecture). Durch seinen enorm breiten 8-fach-Befehlsdecoder im Firestorm-Kern schlug das lüfterlose MacBook Air M1 viele laute High-End-Laptops.'
      },
      credit: {
        artist: 'Sonic8400',
        license: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        commons: 'File:Mac Mini M1 chip.jpg'
      }
    },
    {
      id: 16,
      cat: 'modern_chiplets',
      eraLabel: 'April 2022 · Gestapelter 3D-Cache',
      img: './img/cpu-16.jpg',
      q: 'Welcher Gaming-Prozessor für Sockel AM4 nutzte im Frühjahr 2022 als erster Desktop-Chip ein vertikal per Kupfer-Hybrid-Bonding auf das CCD aufgeschweißtes 64-MB-SRAM-Siliziumstück („3D V-Cache“ für insgesamt 96 MB L3-Cache)?',
      a: ['AMD Ryzen 7 5800X3D', 'Intel Core i9-12900KS', 'AMD Ryzen 9 5950X', 'Intel Core i7-5775C (eDRAM)'],
      wasDasIst: {
        title: 'AMD Ryzen 7 5800X3D (mit 3D V-Cache)',
        nick: 'Das krönende Finale für Sockel AM4',
        year: 'April 2022',
        node: '7 nm TSMC + gestapelter 7-nm-SRAM-Die (TSMC SoIC Hybrid Bonding)',
        socket: 'Sockel AM4',
        cores: '8 Kerne · 16 Threads · 96 MB L3-Cache (32 MB Basis + 64 MB 3D V-Cache)',
        trivia: 'Durch das direkte Kupfer-zu-Kupfer-Bonding ohne Lötkugeln wächst der L3-Cache mit über 2 TB/s Bandbreite in die dritte Dimension. Da Spiele extrem empfindlich auf Speicherlatenzen reagieren, bescherte der 5800X3D Besitzern fünf Jahre alter B350/X370-Mainboards aus dem Jahr 2017 plötzlich wieder Spitzen-Gaming-Leistung.'
      },
      credit: {
        artist: 'Phiarc',
        license: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        commons: 'File:AMD Ryzen 7 5800X3D.jpg'
      }
    }
  ];
  window.ArcadeQuizEngine.registerBank('cpus', DATA);
})();
