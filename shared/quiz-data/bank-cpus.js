// Prozessoren-Quiz (2000–Heute · 16 Fotos)
(function () {
  const DATA = [
    {
      id: 1,
      cat: 'ghz_64bit',
      eraLabel: 'Jahr 2000 · Sockel A (462)',
      img: './img/cpu-01.jpg',
      q: 'Welcher AMD-Prozessor im Keramik-Gehäuse (Sockel A) integrierte im Juni 2000 erstmals 256 KB On-Die-L2-Cache, besaß keinen Heatspreader und erlaubte das berühmte „Bleistift-Overclocking“ über L1-Brücken?',
      a: [
        'AMD Athlon „Thunderbird“ (K7)',
        'Intel Pentium III „Coppermine“',
        'AMD Duron „Spitfire“ (K7)',
        'VIA Cyrix III „Samuel“'
      ],
      explanation: 'Wusstest du, dass Bastler diesen Chip einfach mit einem gewöhnlichen Bleistift übertakteten? Das feine Graphit überbrückte die winzigen Laser-Trennbrücken (L1) auf der Keramik und schaltete den Multiplikator frei!',
      exp: 'Wusstest du, dass Bastler diesen Chip einfach mit einem gewöhnlichen Bleistift übertakteten? Das feine Graphit überbrückte die winzigen Laser-Trennbrücken (L1) auf der Keramik und schaltete den Multiplikator frei!',
      wasDasIst: {
        title: 'AMD Athlon „Thunderbird“ (K7)',
        nick: '„T-Bird“ · Der Bleistift-Trick-Klassiker',
        year: 'Juni 2000 (700 MHz – 1,4 GHz)',
        node: '180 nm (Austin / Fab 30 Dresden mit Kupfer-Interconnects)',
        socket: 'Sockel A (PGA 462)',
        cores: '1 Kern · 1 Thread (3-fach Superskalar)',
        trivia: 'Beim Athlon Thunderbird lag das empfindliche Silizium-Die noch völlig offen auf dem Keramikträger. Legendär wurde er, weil man die lasergeschnittenen L1-Brücken einfach mit einem Graphit-Bleistift nachzeichnen konnte, um den Multiplikator freizuschalten!'
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
      q: 'Mit welcher legendären Prozessorfamilie jagte Intel ab 2000 den Gigahertz-Rekord mit einer ultralangen Pipeline von bis zu 31 Stufen, bis enorme Hitzeentwicklung den Kurs stoppte?',
      a: [
        'Intel Pentium 4 („Northwood“ / NetBurst)',
        'Intel Pentium III („Tualatin“)',
        'AMD Athlon XP („Thoroughbred“)',
        'Intel Itanium 2 („McKinley“)'
      ],
      explanation: 'Ursprünglich plante Intel diese NetBurst-Architektur für sagenhafte 10 Gigahertz. Bei knapp 4 GHz rannte der Chip jedoch in eine derart massive Abwärmemauer, dass Intel die Taktjagd abblasen und komplett auf sparsame Mehrkerner umschwenken musste.',
      exp: 'Ursprünglich plante Intel diese NetBurst-Architektur für sagenhafte 10 Gigahertz. Bei knapp 4 GHz rannte der Chip jedoch in eine derart massive Abwärmemauer, dass Intel die Taktjagd abblasen und komplett auf sparsame Mehrkerner umschwenken musste.',
      wasDasIst: {
        title: 'Intel Pentium 4 („Northwood“ / NetBurst)',
        nick: 'Das Gigahertz-Wettrennen',
        year: '2000–2006 (hier 2,80 GHz Northwood, Sockel 478)',
        node: '180 nm → 130 nm (Northwood) → 90 nm (Prescott)',
        socket: 'Sockel 423 / Sockel 478 / LGA 775',
        cores: '1 Kern (ab 3,06 GHz mit Hyper-Threading = 2 Threads)',
        trivia: 'Intels NetBurst-Architektur war ursprünglich für bis zu 10 GHz entworfen. Während der 130-nm-„Northwood“ sehr beliebt blieb, stieß der nachfolgende „Prescott“ an die physikalische Abwärmemauer und leitete die Wende hin zu Multicore-Prozessoren ein.'
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
      q: 'Welcher revolutionäre Meilenstein-Prozessor brachte 2003 die bis heute im PC-Alltag genutzte 64-Bit-x86-Befehlssatzerweiterung und den ersten integrierten DDR-Speichercontroller auf den Markt?',
      a: [
        'AMD Athlon 64 („ClawHammer“)',
        'Intel Pentium 4 Extreme Edition',
        'Intel Itanium („Merced“)',
        'Transmeta Efficeon (TM8800)'
      ],
      explanation: 'Während Intel mit dem inkompatiblen 64-Bit-Projekt Itanium scheiterte, entwickelte AMD kurzerhand x86-64 selbst. Die Architektur war so genial abwärtskompatibel, dass Intel sie später für eigene Core-CPUs lizenzieren musste!',
      exp: 'Während Intel mit dem inkompatiblen 64-Bit-Projekt Itanium scheiterte, entwickelte AMD kurzerhand x86-64 selbst. Die Architektur war so genial abwärtskompatibel, dass Intel sie später für eigene Core-CPUs lizenzieren musste!',
      wasDasIst: {
        title: 'AMD Athlon 64 3200+ („ClawHammer“)',
        nick: 'Begründer von x86-64 (AMD64)',
        year: 'September 2003',
        node: '130 nm SOI (Silicon on Insulator)',
        socket: 'Sockel 754 / Sockel 939',
        cores: '1 Kern · Integrierter DDR-Speichercontroller & HyperTransport',
        trivia: 'Während Intel mit dem inkompatiblen Itanium (IA-64) scheiterte, erweiterte AMD den klassischen x86-Befehlssatz elegant auf 64 Bit (AMD64) – sodass Intel ihn später lizenzieren musste. Zudem wanderte der RAM-Controller direkt in die CPU.'
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
      q: 'Welcher hocheffiziente Notebook-Prozessor aus Intels israelischem Haifa-Entwicklungszentrum begründete die Centrino-Revolution und rettete Intel später aus der NetBurst-Sackgasse?',
      a: [
        'Intel Pentium M („Banias“ / „Dothan“)',
        'Intel Celeron M („Shelton“)',
        'AMD Mobile Sempron („Georgetown“)',
        'Transmeta Crusoe (TM5800)'
      ],
      explanation: 'Ein Pentium M mit nur 1,7 GHz deklassierte damals selbst stromhungrige 3-GHz-Desktop-Rechner spielend. Enthusiasten bauten den kühlen Mobilchip per Asus-Adapter sogar heimlich in ihre High-End-Gaming-PCs ein!',
      exp: 'Ein Pentium M mit nur 1,7 GHz deklassierte damals selbst stromhungrige 3-GHz-Desktop-Rechner spielend. Enthusiasten bauten den kühlen Mobilchip per Asus-Adapter sogar heimlich in ihre High-End-Gaming-PCs ein!',
      wasDasIst: {
        title: 'Intel Pentium M („Banias“ / „Dothan“)',
        nick: 'Der heimliche Retter von Intel',
        year: '2003–2005 (Herzstück der „Intel Centrino“-Notebooks)',
        node: '130 nm (Banias) / 90 nm (Dothan)',
        socket: 'Sockel 479',
        cores: '1 Kern · Hohe Pro-Takt-Leistung (IPC) bei nur 21–27 W TDP',
        trivia: 'Ein Pentium M mit 1,7 GHz schlug in vielen Spielen einen 2,8 GHz schnellen Pentium 4 bei einem Bruchteil des Stromverbrauchs. Enthusiasten bauten ihn per Adapter (ASUS CT-479) sogar in Desktop-Mainboards ein, bevor Intel die Core-Architektur schuf.'
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
      q: 'Welcher Pionier-Prozessor vereinte 2005 erstmals zwei vollwertige 64-Bit-Rechenkerne nativ auf einem einzigen gemeinsamen Silizium-Die für den Desktop-Markt?',
      a: [
        'AMD Athlon 64 X2 („Manchester“)',
        'Intel Pentium D („Smithfield“)',
        'IBM PowerPC 970FX („G5“)',
        'Intel Core Duo („Yonah“)'
      ],
      explanation: 'Während Intel für seinen ersten Doppelkerner schlicht zwei getrennte Pentium-Dies zusammenklebte, die sich am Nadelöhr des Busses stauten, sprach AMDs nativer Zweikerner blitzschnell direkt auf dem Silizium miteinander.',
      exp: 'Während Intel für seinen ersten Doppelkerner schlicht zwei getrennte Pentium-Dies zusammenklebte, die sich am Nadelöhr des Busses stauten, sprach AMDs nativer Zweikerner blitzschnell direkt auf dem Silizium miteinander.',
      wasDasIst: {
        title: 'AMD Athlon 64 X2',
        nick: 'Nativer Dual-Core für Sockel 939 & AM2',
        year: 'Mai 2005 (Manchester / Toledo / Windsor)',
        node: '90 nm / 65 nm SOI',
        socket: 'Sockel 939 / Sockel AM2',
        cores: '2 Kerne · 2 Threads',
        trivia: 'Während Intels erster Dual-Core noch zwei getrennte Pentium-4-Dies über den langsamen Front-Side-Bus koppelte, kommunizierten die beiden Kerne des Athlon 64 X2 direkt auf dem Chip mit minimaler Latenz.'
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
      q: 'Welcher legendäre 65-nm-Doppelkern-Prozessor läutete im Sommer 2006 Intels glorreiches Comeback mit über 40 % mehr Rechenleistung bei 40 % weniger Stromverbrauch ein?',
      a: [
        'Intel Core 2 Duo („Conroe“ E6600)',
        'AMD Athlon 64 X2 5000+ („Brisbane“)',
        'Intel Pentium Dual-Core E2140',
        'AMD Phenom X3 8750 („Toliman“)'
      ],
      explanation: 'Der Conroe pulverisierte fast über Nacht AMDs jahrelange Gaming-Dominanz. Hobby-Tuner konnten das 2,4-GHz-Modell oft mit normaler Luftkühlung ohne Spannungsanhebung stabil auf über 3,2 GHz katapultieren!',
      exp: 'Der Conroe pulverisierte fast über Nacht AMDs jahrelange Gaming-Dominanz. Hobby-Tuner konnten das 2,4-GHz-Modell oft mit normaler Luftkühlung ohne Spannungsanhebung stabil auf über 3,2 GHz katapultieren!',
      wasDasIst: {
        title: 'Intel Core 2 Duo E6600 („Conroe“)',
        nick: 'Intels großes Architektur-Comeback',
        year: 'Juli 2006',
        node: '65 nm',
        socket: 'LGA 775',
        cores: '2 Kerne · 2,40 GHz · 4 MB geteilter Smart-L2-Cache (65 W TDP)',
        trivia: 'Der Core 2 Duo E6600 beendete die NetBurst-Ära endgültig: Mit 4-fach superskalarer Ausführung und geteiltem L2-Cache ließ er sich auf vielen LGA-775-Boards mühelos von 2,4 auf über 3,2 GHz übertakten.'
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
      q: 'Welcher erste bezahlbare Vierkern-Prozessor der Geschichte wurde dank seines kühleren G0-Steppings und phänomenaler Übertaktbarkeit zur ultimativen Dauerläufer-Legende der 2000er?',
      a: [
        'Intel Core 2 Quad Q6600 („Kentsfield“)',
        'AMD Phenom X4 9950 Black Edition',
        'Intel Core 2 Extreme QX6700',
        'AMD Phenom II X4 940 Black Edition'
      ],
      explanation: 'Im berühmt-berüchtigten „G0-Stepping“ ließ sich dieser 2,4-GHz-Vierkerner kinderleicht auf 3,6 GHz peitschen. Viele Gamer nutzten den treuen Chip unglaubliche 7 bis 8 Jahre lang als solides Herzstück ihres Spiele-PCs!',
      exp: 'Im berühmt-berüchtigten „G0-Stepping“ ließ sich dieser 2,4-GHz-Vierkerner kinderleicht auf 3,6 GHz peitschen. Viele Gamer nutzten den treuen Chip unglaubliche 7 bis 8 Jahre lang als solides Herzstück ihres Spiele-PCs!',
      wasDasIst: {
        title: 'Intel Core 2 Quad Q6600 („Kentsfield“)',
        nick: 'Der unsterbliche „G0-Stepping“-Vierkerner',
        year: 'Januar 2007',
        node: '65 nm (Multi-Chip-Modul aus zwei Conroe-Dual-Core-Dies)',
        socket: 'LGA 775',
        cores: '4 Kerne · 4 Threads · 2,40 GHz · 2× 4 MB L2-Cache',
        trivia: 'Unter dem Heatspreader des Q6600 saßen zwei benachbarte Dual-Core-Dies. Sobald im Sommer 2007 das kühlere 95-Watt-„G0-Stepping“ erschien, wurde der Q6600 zum wohl langlebigsten Preis-Leistungs-Prozessor der 2000er Jahre.'
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
      q: 'Welcher von Sony, Toshiba und IBM gemeinsam entwickelte Hybrid-Prozessor trieb ab 2006 die PlayStation 3 an und stellte Supercomputer-Rekorde auf?',
      a: [
        'STI Cell Broadband Engine (Cell BE)',
        'Microsoft Xbox 360 Xenon (Waternoose)',
        'Emotion Engine & Graphics Synthesizer',
        'Nintendo Broadway (PowerPC 750CL)'
      ],
      explanation: 'Mit seinen 8 Vektor-Coprozessoren war der Cell-Chip derart rechenstark, dass die US Air Force aus über 1.700 handelsüblichen PlayStation-3-Konsolen einen gefürchteten Hochleistungs-Supercomputer zusammenstöpselte!',
      exp: 'Mit seinen 8 Vektor-Coprozessoren war der Cell-Chip derart rechenstark, dass die US Air Force aus über 1.700 handelsüblichen PlayStation-3-Konsolen einen gefürchteten Hochleistungs-Supercomputer zusammenstöpselte!',
      wasDasIst: {
        title: 'STI Cell Broadband Engine (Cell BE)',
        nick: 'Das heterogene Herz der PlayStation 3',
        year: '2006',
        node: '90 nm → 65 nm → 45 nm SOI',
        socket: 'BGA auf dem PlayStation-3-Mainboard / Blade-Server',
        cores: '1× PPE (Power Processing Element) + 8× SPE (Synergistic Processing Elements) @ 3,2 GHz',
        trivia: 'Für Spieleentwickler war die Cell-CPU anfangs sehr fordernd zu programmieren, bot aber bei voller Nutzung der 8 Vektorkerne eine atemberaubende Gleitkommaleistung, die sogar in Supercomputern wie Roadrunner eingesetzt wurde.'
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
      q: 'Welcher Meilenstein-Prozessor begründete Ende 2008 die Core-i7-Marke, ersetzte den betagten Front-Side-Bus durch QPI und führte Triple-Channel-DDR3-Speicher ein?',
      a: [
        'Intel Core i7-920 („Bloomfield“)',
        'AMD Phenom II X4 955 („Deneb“)',
        'Intel Core 2 Extreme QX9770',
        'Intel Core i5-750 („Lynnfield“)'
      ],
      explanation: 'Mit dem Core i7-920 begründete Intel die bis heute gültige Core-i-Nomenklatur. Die Plattform war so potent, dass findige Tüftler noch zehn Jahre später günstige Sechskern-Xeons auf gebrauchte Sockel-1366-Boards schnallten.',
      exp: 'Mit dem Core i7-920 begründete Intel die bis heute gültige Core-i-Nomenklatur. Die Plattform war so potent, dass findige Tüftler noch zehn Jahre später günstige Sechskern-Xeons auf gebrauchte Sockel-1366-Boards schnallten.',
      wasDasIst: {
        title: 'Intel Core i7-920 („Bloomfield“ / Nehalem)',
        nick: 'Der erste Core i7 der Geschichte',
        year: 'November 2008',
        node: '45 nm High-k Metal Gate',
        socket: 'LGA 1366',
        cores: '4 Kerne · 8 Threads (SMT / Hyper-Threading) · 2,66 GHz',
        trivia: 'Mit Nehalem vereinte Intel vier Kerne monolithisch auf einem Die, holte Hyper-Threading zurück und integrierte erstmals den Speichercontroller direkt in die CPU mit gleich drei DDR3-Kanälen auf X58-Mainboards.'
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
      q: 'Welcher legendäre 32-nm-Prozessor von 2011 mit verlötetem Heatspreader und offenem Multiplikator gilt unter PC-Schraubern bis heute als der langlebigste Übertaktungs-König aller Zeiten?',
      a: [
        'Intel Core i7-2600K („Sandy Bridge“)',
        'AMD FX-8150 („Bulldozer“)',
        'Intel Core i7-3770K („Ivy Bridge“)',
        'Intel Core i7-4790K („Devil’s Canyon“)'
      ],
      explanation: 'Dank hochwertig verlötetem Heatspreader knackte Sandy Bridge spielend 4,8 bis 5,0 GHz unter einfachen Luftkühlern. Weil Intel bei Nachfolgern auf billige Wärmeleitpaste setzte, verweigerten Millionen PC-Besitzer jahrelang jedes Upgrade.',
      exp: 'Dank hochwertig verlötetem Heatspreader knackte Sandy Bridge spielend 4,8 bis 5,0 GHz unter einfachen Luftkühlern. Weil Intel bei Nachfolgern auf billige Wärmeleitpaste setzte, verweigerten Millionen PC-Besitzer jahrelang jedes Upgrade.',
      wasDasIst: {
        title: 'Intel Core i7-2600K („Sandy Bridge“)',
        nick: 'Meisterwerk der 32-nm-Ära (mit verlötetem IHS!)',
        year: 'Januar 2011',
        node: '32 nm',
        socket: 'LGA 1155',
        cores: '4 Kerne · 8 Threads · 3,40 GHz (Boost 3,80 GHz, OC oft 4,8–5,0 GHz)',
        trivia: 'Sandy Bridge führte einen internen Micro-Op-Cache, den schnellen Ringbus sowie einen mit Indium verlöteten Heatspreader ein. Deshalb blieben i5-2500K und i7-2600K bei 4,8 GHz erstaunlich kühl und hielten fast ein Jahrzehnt durch.'
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
      q: 'Welche AMD-Prozessorfamilie sorgte ab 2011 mit geteilten Gleitkomma-Modulen und Flüssigstickstoff-Taktraten von über 8,4 GHz für Aufsehen, enttäuschte aber bei alltäglicher IPC?',
      a: [
        'AMD FX-Serie („Bulldozer“)',
        'AMD Phenom II X6 („Thuban“)',
        'Intel Core i7-3960X („Sandy Bridge-E“)',
        'AMD A10-5800K („Trinity“ APU)'
      ],
      explanation: 'Obwohl der Chip mit 8,429 GHz einen spektakulären Guinness-Weltrekord aufstellte, floppte die geteilte Modulbauweise in Spielen so gravierend, dass AMD kurz vor dem Ruin stand und Zen völlig neu erfinden musste.',
      exp: 'Obwohl der Chip mit 8,429 GHz einen spektakulären Guinness-Weltrekord aufstellte, floppte die geteilte Modulbauweise in Spielen so gravierend, dass AMD kurz vor dem Ruin stand und Zen völlig neu erfinden musste.',
      wasDasIst: {
        title: 'AMD FX-Serie („Bulldozer“ / „Piledriver“ · AM3+)',
        nick: 'Taktraten-Rekordhalter mit Modul-Architektur',
        year: 'Oktober 2011 (Bulldozer) / Oktober 2012 (Vishera / Piledriver)',
        node: '32 nm SOI (GlobalFoundries Dresden)',
        socket: 'Sockel AM3+ (PGA 942)',
        cores: 'Bis zu 4 Module / 8 Integer-Kerne (FX-8150 / FX-8350)',
        trivia: 'Obwohl die geteilten Decoder und Gleitkommaeinheiten in damaligen Spielen zu niedriger Pro-Takt-Leistung führten, erreichte Bulldozer unter flüssigem Stickstoff 8.429 MHz und legte den Grundstein für die spätere Neuentwicklung von Zen.'
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
      q: 'Welcher kreditkartengroße 35-Dollar-Rechner mit ARM-SoC sollte 2012 eigentlich nur britischen Informatik-Schülern helfen und verkaufte sich stattdessen über 60 Millionen Mal?',
      a: [
        'Raspberry Pi (Broadcom BCM)',
        'Arduino Uno (Microchip AVR)',
        'BeagleBone Black (TI Sitara)',
        'Intel Edison (Quark SoC)'
      ],
      explanation: 'Die Erfinder hofften anfangs bescheiden auf 10.000 verkaufte Exemplare für britische Schulen. Am Erscheinungstag brachen die Server der Elektronikhändler unter dem weltweiten Ansturm von Bastlern und Nerds komplett zusammen!',
      exp: 'Die Erfinder hofften anfangs bescheiden auf 10.000 verkaufte Exemplare für britische Schulen. Am Erscheinungstag brachen die Server der Elektronikhändler unter dem weltweiten Ansturm von Bastlern und Nerds komplett zusammen!',
      wasDasIst: {
        title: 'Raspberry Pi (Broadcom ARM SoC)',
        nick: 'Der 35-Dollar-Rechner, der ARM auf den Schreibtisch brachte',
        year: '2012 (Model B mit BCM2835) bis heute (hier Pi 4 Model B mit BCM2711)',
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
      q: 'Mit welchem Achtkern-Prozessor für Sockel AM4 vollbrachte AMD im Frühjahr 2017 einen sensationellen Sprung von +52 % IPC und brach das langjährige Monopol teurer Vierkerner?',
      a: [
        'AMD Ryzen 7 1800X („Zen 1“)',
        'Intel Core i7-7700K („Kaby Lake“)',
        'AMD Threadripper 1900X',
        'Intel Core i7-6900K („Broadwell-E“)'
      ],
      explanation: 'Vor dem Ryzen-Launch verlangte Intel für einen Achtkerner unverschämte 1.000 Euro. AMD bot die gleiche Multithreading-Power plötzlich für weniger als die Hälfte auf einer bezahlbaren Mainstream-Plattform an!',
      exp: 'Vor dem Ryzen-Launch verlangte Intel für einen Achtkerner unverschämte 1.000 Euro. AMD bot die gleiche Multithreading-Power plötzlich für weniger als die Hälfte auf einer bezahlbaren Mainstream-Plattform an!',
      wasDasIst: {
        title: 'AMD Ryzen 7 1800X („Summit Ridge“ / Zen 1)',
        nick: 'Der Startschuss der langlebigen AM4-Plattform',
        year: 'März 2017',
        node: '14 nm LPP (GlobalFoundries)',
        socket: 'Sockel AM4 (PGA 1331)',
        cores: '8 Kerne · 16 Threads (2 CCX à 4 Kerne verbunden über Infinity Fabric)',
        trivia: 'Bis Februar 2017 kostete ein Achtkerner von Intel über 1.000 Euro. Der Ryzen 7 1800X lieferte vergleichbare Multithreading-Leistung zum halben Preis auf der langlebigen Mainstream-Plattform AM4.'
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
      q: 'Welche brachiale HEDT- und Workstation-Prozessorfamilie nutzt riesige Sockel mit bis zu 4.844 Pins, um Dutzende Rechenkerne aus modularen Chiplets auf einer Platine zu bündeln?',
      a: [
        'AMD Ryzen Threadripper',
        'Intel Core i9 Extreme Edition',
        'Intel Xeon Phi Coprozessor',
        'Apple Mac Pro Afterburner'
      ],
      explanation: 'Threadripper startete heimlich als inoffizielles Feierabend-Projekt einiger enthusiastischer AMD-Ingenieure. Das modulare Chiplet-Design erwies sich als so genial, dass es AMDs gesamte Server- und High-End-Sparte revolutionierte!',
      exp: 'Threadripper startete heimlich als inoffizielles Feierabend-Projekt einiger enthusiastischer AMD-Ingenieure. Das modulare Chiplet-Design erwies sich als so genial, dass es AMDs gesamte Server- und High-End-Sparte revolutionierte!',
      wasDasIst: {
        title: 'AMD Ryzen Threadripper (hier 7970X Unterseite)',
        nick: 'Das Multi-Chiplet-Kraftwerk im Server-Format',
        year: 'seit August 2017 (1950X mit 16 Kernen bis 7995WX mit 96 Kernen)',
        node: '14 nm → 7 nm → 5 nm TSMC (Chiplets / CCDs)',
        socket: 'TR4 / sTRX4 / sTR5 (LGA 4094 / LGA 4844)',
        cores: '16 bis 96 Kerne (32 bis 192 Threads) · Quad- bis Octa-Channel-RAM',
        trivia: 'Threadripper entstand ursprünglich als Feierabend-Projekt einiger AMD-Ingenieure. Durch den modularen Aufbau aus kompakten 8-Kern-Chiplets und einem zentralen I/O-Die revolutionierte AMD die Ausbeute bei Hochleistungsprozessoren.'
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
      q: 'Welcher hocheffiziente 5-nm-ARM-Chip mit direkt ins Package integriertem Arbeitsspeicher leitete Ende 2020 den radikalen Abschied des Mac von Intel-Prozessoren ein?',
      a: [
        'Apple M1 (Unified Memory)',
        'Qualcomm Snapdragon 8cx Gen 2',
        'Intel Core i7-1185G7 („Tiger Lake“)',
        'Samsung Exynos 2100'
      ],
      explanation: 'Durch die extrem kurze Anbindung des gemeinsamen Speichers (Unified Memory) rechnete selbst das lüfterlose MacBook Air so rasant und kühl, dass es viele schwere, dröhnende Intel-Gaming-Laptops das Fürchten lehrte!',
      exp: 'Durch die extrem kurze Anbindung des gemeinsamen Speichers (Unified Memory) rechnete selbst das lüfterlose MacBook Air so rasant und kühl, dass es viele schwere, dröhnende Intel-Gaming-Laptops das Fürchten lehrte!',
      wasDasIst: {
        title: 'Apple M1 (Apple Silicon SoC)',
        nick: 'Unified Memory & lüfterlose 5-nm-Effizienz',
        year: 'November 2020',
        node: '5 nm (TSMC N5 · 16 Milliarden Transistoren)',
        socket: 'BGA mit integriertem Unified Memory (zwei DRAM-Chips direkt neben dem Die)',
        cores: '8 CPU-Kerne (4× „Firestorm“ Performance + 4× „Icestorm“ Efficiency) + 8-Kern-GPU + 16-Kern-NPU',
        trivia: 'Auf dem Foto erkennt man links das glänzende M1-Silizium-Die und rechts direkt daneben auf demselben Träger die beiden LPDDR4X-Speicherpakete. Durch seinen enorm breiten Befehlsdecoder schlug das lüfterlose MacBook Air viele laute Laptops.'
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
      q: 'Welcher AM4-Prozessor schweißte 2022 als erster Gaming-Chip per mikroskopischem Hybrid-Bonding ein zusätzliches 64-MB-SRAM-Plättchen dreidimensional direkt auf das Rechen-Die?',
      a: [
        'AMD Ryzen 7 5800X3D (3D V-Cache)',
        'Intel Core i9-12900KS („Alder Lake“)',
        'AMD Ryzen 9 5950X („Zen 3“)',
        'Intel Core i7-5775C (Iris Pro eDRAM)'
      ],
      explanation: 'Mit gigantischen 96 MB L3-Cache mutierte dieser Chip zum absoluten Überflieger für Gamer: Fünf Jahre alte Mainboards aus dem Jahr 2017 überholten damit plötzlich brandneue, teure High-End-Konkurrenten!',
      exp: 'Mit gigantischen 96 MB L3-Cache mutierte dieser Chip zum absoluten Überflieger für Gamer: Fünf Jahre alte Mainboards aus dem Jahr 2017 überholten damit plötzlich brandneue, teure High-End-Konkurrenten!',
      wasDasIst: {
        title: 'AMD Ryzen 7 5800X3D (mit 3D V-Cache)',
        nick: 'Das krönende Finale für Sockel AM4',
        year: 'April 2022',
        node: '7 nm TSMC + gestapelter 7-nm-SRAM-Die (TSMC SoIC Hybrid Bonding)',
        socket: 'Sockel AM4',
        cores: '8 Kerne · 16 Threads · 96 MB L3-Cache (32 MB Basis + 64 MB 3D V-Cache)',
        trivia: 'Durch das direkte Kupfer-zu-Kupfer-Bonding ohne Lötkugeln wächst der L3-Cache in die dritte Dimension. Da Spiele empfindlich auf Speicherlatenzen reagieren, bescherte der 5800X3D alten AM4-Mainboards nochmals Spitzen-Gaming-Leistung.'
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
