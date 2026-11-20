// Grafikkarten-Quiz (2000–Heute · 16 Fotos)
(function () {
  const DATA = [
    {
      id: 1,
      cat: 'agp_shader',
      eraLabel: 'Juni 2000 · Das letzte 3dfx-Flaggschiff',
      img: './img/gpu-01.jpg',
      q: 'Welche Kult-Grafikkarte des Jahres 2000 kombinierte zwei VSA-100-Grafikchips im internen SLI-Verbund samt eigenem Molex-Stromanschluss und glänzte mit butterweichem RGSS-Antialiasing?',
      a: [
        '3dfx Voodoo5 5500 AGP',
        'ATi Rage Fury MAXX',
        'Matrox Parhelia 512',
        'S3 Savage 2000 AGP'
      ],
      explanation: 'Wusstest du, dass die Voodoo5 so viel Strom zog, dass sie als erste Consumer-Grafikkarte überhaupt einen separaten Festplatten-Stromstecker brauchte? Ihr butterweiches 4× RGSS-Vollbild-Antialiasing war der Konkurrenz meilenweit voraus.',
      exp: 'Wusstest du, dass die Voodoo5 so viel Strom zog, dass sie als erste Consumer-Grafikkarte überhaupt einen separaten Festplatten-Stromstecker brauchte? Ihr butterweiches 4× RGSS-Vollbild-Antialiasing war der Konkurrenz meilenweit voraus.',
      wasDasIst: {
        title: '3dfx Voodoo5 5500 (2× VSA-100)',
        nick: 'Das legendäre letzte Aufbäumen von 3dfx',
        year: 'Juni 2000',
        chip: '2× 3dfx VSA-100 @ 166 MHz (250 nm)',
        vram: '64 MB SDRAM (2× 32 MB, effektiv 32 MB nutzbar)',
        bus: 'AGP Universal / PCI + 4-Pin-Molex-Stromanschluss',
        trivia: 'Dank „Rotated Grid Supersampling“ (4× RGSS) lieferte die Voodoo5 5500 im Jahr 2000 eine Kantenglättung, von der die Konkurrenz nur träumen konnte. Da ihr jedoch Hardware-T&L fehlte, ging die Ära 3dfx Ende 2000 zu Ende.'
      },
      credit: {
        artist: 'Konstantin Lanzet',
        license: 'CC BY-SA 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        commons: 'File:KL 3DFX Voodoo5 5500.jpg'
      }
    },
    {
      id: 2,
      cat: 'agp_shader',
      eraLabel: '1999/2000 · Geburt des Begriffs „GPU“',
      img: './img/gpu-02.jpg',
      q: 'Welche Grafikkarte bewarb NVIDIA Ende 1999 erstmals offiziell als „The World’s First GPU“, weil sie Beleuchtung und Geometrieberechnung (Hardware-T&L) von der CPU übernahm?',
      a: [
        'NVIDIA GeForce 256 DDR',
        'NVIDIA RIVA TNT2 Ultra',
        '3dfx Voodoo3 3500 TV',
        'ATi Radeon 64 MB DDR'
      ],
      explanation: 'Vor der GeForce 256 musste die Haupt-CPU jedes einzelne 3D-Polygon und jede Lichtquelle mühsam selbst berechnen. Mit der Auslagerung auf den Grafikchip erfand NVIDIA praktisch im Alleingang den Begriff „GPU“!',
      exp: 'Vor der GeForce 256 musste die Haupt-CPU jedes einzelne 3D-Polygon und jede Lichtquelle mühsam selbst berechnen. Mit der Auslagerung auf den Grafikchip erfand NVIDIA praktisch im Alleingang den Begriff „GPU“!',
      wasDasIst: {
        title: 'NVIDIA GeForce 256 DDR (NV10)',
        nick: '„The World’s First GPU“ (Hardware T&L)',
        year: 'Ende 1999 / Anfang 2000 (DDR-Version)',
        chip: 'NV10 (220 nm · 17 Mio. Transistoren)',
        vram: '32 MB SDR oder DDR-SGRAM (128-Bit)',
        bus: 'AGP 4×',
        trivia: 'Bis zur GeForce 256 musste der Hauptprozessor alle 3D-Dreieckskoordinaten und Lichtquellen berechnen. Durch die Auslagerung von Transform & Lighting (T&L) auf die GPU zog NVIDIA in Quake III Arena davon.'
      },
      credit: {
        artist: 'Hyins',
        license: 'Public domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        commons: 'File:Canopus GeForce 256 DDR.png'
      }
    },
    {
      id: 3,
      cat: 'agp_shader',
      eraLabel: '2001 · Programmierbare Pixel- & Vertex-Shader',
      img: './img/gpu-03.jpg',
      q: 'Mit welcher legendären Grafikkarten-Generation führte NVIDIA 2001 erstmals frei programmierbare Pixel- und Vertex-Shader für DirectX 8.0 ein und revolutionierte damit 3D-Wassereffekte?',
      a: [
        'NVIDIA GeForce3 (NV20)',
        'NVIDIA GeForce4 MX 440',
        'ATi Radeon 8500 (R200)',
        'Kyro II (PowerVR STG4000)'
      ],
      explanation: 'Erst programmierbare Shader machten spiegelnde Wasseroberflächen in Spielen wie Morrowind überhaupt möglich. Zuvor konnten Grafikkarten nur starre, fest verdrahtete Rechenschritte ausführen!',
      exp: 'Erst programmierbare Shader machten spiegelnde Wasseroberflächen in Spielen wie Morrowind überhaupt möglich. Zuvor konnten Grafikkarten nur starre, fest verdrahtete Rechenschritte ausführen!',
      wasDasIst: {
        title: 'NVIDIA GeForce3 Ti 500 (NV20)',
        nick: 'Der Beginn der programmierbaren Shader-Ära',
        year: '2001',
        chip: 'NV20 (150 nm · 57 Mio. Transistoren)',
        vram: '64 MB DDR @ 250 MHz (effektiv 500 MHz)',
        bus: 'AGP 4× · DirectX 8.0 (Shader Model 1.1)',
        trivia: 'Vor der GeForce3 arbeiteten 3D-Karten mit starren Register-Combinern. Erst die programmierbare Engine der GeForce3 ermöglichte realistische Wasseroberflächen und pixelgenaue Spiegelungen (z. B. in Morrowind).'
      },
      credit: {
        artist: 'Hyins',
        license: 'Public domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        commons: 'File:GeForce3 Ti 500.jpg'
      }
    },
    {
      id: 4,
      cat: 'agp_shader',
      eraLabel: 'August 2002 · ATis DirectX-9-Paukenschlag',
      img: './img/gpu-04.jpg',
      q: 'Mit welcher legendären roten Grafikkarte (Chip „R300“, 256-Bit-Speicherbus) überrumpelte ATi im Sommer 2002 die Konkurrenz und übernahm mit voller DirectX-9-Präzision die 3D-Krone?',
      a: [
        'ATi Radeon 9700 Pro (R300)',
        'NVIDIA GeForce4 Ti 4600',
        'ATi Radeon 8500 XT',
        'Matrox Millennium G550'
      ],
      explanation: 'Die Radeon 9700 Pro war so bahnbrechend überlegen, dass selbst Chef-Entwickler John Carmack sie auf der QuakeCon als Meilenstein feierte. Sie deklassierte NVIDIAs Topmodell fast um den Faktor zwei!',
      exp: 'Die Radeon 9700 Pro war so bahnbrechend überlegen, dass selbst Chef-Entwickler John Carmack sie auf der QuakeCon als Meilenstein feierte. Sie deklassierte NVIDIAs Topmodell fast um den Faktor zwei!',
      wasDasIst: {
        title: 'ATi Radeon 9700 Pro (R300)',
        nick: 'Die wohl dominanteste ATi-Karte aller Zeiten',
        year: 'August 2002',
        chip: 'ATi R300 (150 nm · 110 Mio. Transistoren)',
        vram: '128 MB DDR (256-Bit-Speicherinterface!)',
        bus: 'AGP 8× · DirectX 9.0 (Shader Model 2.0)',
        trivia: 'Die Radeon 9700 Pro verdoppelte die Speicherbandbreite durch ihr L-förmiges 256-Bit-Layout und beherrschte bereits im Sommer 2002 echtes DirectX 9.0 mit rasanter Kantenglättung für Spiele wie Half-Life 2.'
      },
      credit: {
        artist: 'Wikimedia Commons',
        license: 'Public domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        commons: 'File:ATI-Radeon-9700-Pro.png'
      }
    },
    {
      id: 5,
      cat: 'agp_shader',
      eraLabel: 'Januar 2003 · Der berühmte „Laubbläser“',
      img: './img/gpu-05.jpg',
      q: 'Welche berüchtigte NVIDIA-Grafikkarte ging 2003 wegen ihres ohrenbetäubend lauten Dual-Slot-Kühlers („FlowFX“) als „Föhn“, „Dustbuster“ und „Laubbläser“ in die Hardware-Geschichte ein?',
      a: [
        'NVIDIA GeForce FX 5800 Ultra',
        'ATi Radeon X1800 XT',
        'NVIDIA GeForce 7900 GTX',
        '3dfx Voodoo Rush AGP'
      ],
      explanation: 'Der „FlowFX“-Lüfter war mit über 60 Dezibel so infernalisch laut, dass frustrierte Gamer Ohrstöpsel tragen mussten. NVIDIA nahm den Spott später sportlich und drehte ein legendäres Selbstironie-Video mit einem Föhn!',
      exp: 'Der „FlowFX“-Lüfter war mit über 60 Dezibel so infernalisch laut, dass frustrierte Gamer Ohrstöpsel tragen mussten. NVIDIA nahm den Spott später sportlich und drehte ein legendäres Selbstironie-Video mit einem Föhn!',
      wasDasIst: {
        title: 'NVIDIA GeForce FX 5800 Ultra (NV30)',
        nick: '„FlowFX“ / „Der Laubbläser“ („Dustbuster“)',
        year: 'Frühjahr 2003',
        chip: 'NV30 (130 nm TSMC · 125 Mio. Transistoren @ 500 MHz)',
        vram: '128 MB DDR2 @ 500 MHz (1 GHz effektiv, 128-Bit)',
        bus: 'AGP 8× · DirectX 9.0a',
        trivia: 'Um 500 MHz Chiptakt in 130 nm zu bändigen, verbaute NVIDIA die „FlowFX“-Kupferturbine, die unter 3D-Last über 60 Dezibel erreichte. NVIDIA drehte später sogar ein berühmtes Selbstironie-Video über den FX-Haartrockner.'
      },
      credit: {
        artist: 'Hyins',
        license: 'Public domain',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        commons: 'File:NVIDIA GeForce FX 5800 Ultra ES.jpg'
      }
    },
    {
      id: 6,
      cat: 'agp_shader',
      eraLabel: 'April 2004 · Shader Model 3.0 & SLI-Comeback',
      img: './img/gpu-06.jpg',
      q: 'Mit welchem Flaggschiff (Chip „NV40“) bügelte NVIDIA 2004 das FX-Debakel aus, führte Shader Model 3.0 mit echtem HDR-Rendering ein und feierte das Comeback von SLI?',
      a: [
        'NVIDIA GeForce 6800 Ultra',
        'ATi Radeon X800 XT PE',
        'NVIDIA GeForce FX 5950 Ultra',
        'ATi Radeon 9800 XT Pro'
      ],
      explanation: 'Mit 16 vollwertigen Pipelines und 222 Millionen Transistoren verdoppelte NVIDIA die Shader-Power schlagartig. In Kombination mit Far Cry und Splinter Cell zeigte die Karte erstmals atemberaubende HDR-Lichtüberblendungen.',
      exp: 'Mit 16 vollwertigen Pipelines und 222 Millionen Transistoren verdoppelte NVIDIA die Shader-Power schlagartig. In Kombination mit Far Cry und Splinter Cell zeigte die Karte erstmals atemberaubende HDR-Lichtüberblendungen.',
      wasDasIst: {
        title: 'NVIDIA GeForce 6800 Ultra (NV40)',
        nick: 'Die Vervierfachung der Pipelines & SLI-Wiedergeburt',
        year: 'April 2004',
        chip: 'NV40 (130 nm IBM · 222 Mio. Transistoren)',
        vram: '256 MB (später 512 MB) GDDR3 (256-Bit)',
        bus: 'AGP 8× & PCIe ×16 · DirectX 9.0c (Shader Model 3.0)',
        trivia: 'Die GeForce-6-Serie war ein technischer Befreiungsschlag: Sie unterstützte als erste Architektur volle FP16-HDR-Überblendeffekte und Shader Model 3.0, während die 6600 GT zum riesigen Preis-Leistungs-Hit wurde.'
      },
      credit: {
        artist: 'Hyins',
        license: 'Public domain',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        commons: 'File:NVIDIA GeForce 6800 Ultra 512MB.jpg'
      }
    },
    {
      id: 7,
      cat: 'agp_shader',
      eraLabel: 'November 2006 · „But can it run Crysis?“',
      img: './img/gpu-07.jpg',
      q: 'Welche monumentale Grafikkarte (Chip „G80“, 768 MB VRAM) begründete im November 2006 die Ära von CUDA sowie Unified Shadern und wurde zum König für den Grafikkracher „Crysis“?',
      a: [
        'NVIDIA GeForce 8800 GTX',
        'ATi Radeon HD 2900 XT',
        'NVIDIA GeForce 7950 GX2',
        'NVIDIA GeForce GTX 280'
      ],
      explanation: 'Die 8800 GTX war ein Jahrhundert-Wurf: Statt getrennter Pixel- und Vertex-Pipelines rechneten 128 universelle Shader alles flexibel. Sie begründete NVIDIAs CUDA-Plattform, die heute die weltweite KI-Revolution antreibt!',
      exp: 'Die 8800 GTX war ein Jahrhundert-Wurf: Statt getrennter Pixel- und Vertex-Pipelines rechneten 128 universelle Shader alles flexibel. Sie begründete NVIDIAs CUDA-Plattform, die heute die weltweite KI-Revolution antreibt!',
      wasDasIst: {
        title: 'NVIDIA GeForce 8800 GTX (G80)',
        nick: '„Der König der Crysis-Ära“ · Geburt von CUDA & Unified Shaders',
        year: 'November 2006',
        chip: 'G80 (90 nm · 681 Mio. Transistoren · 128 Stream-Prozessoren @ 1.350 MHz)',
        vram: '768 MB GDDR3 an einem 384-Bit-Speicherinterface',
        bus: 'PCIe ×16 · DirectX 10.0 · Erste CUDA-Architektur',
        trivia: 'Der G80-Chip auf der 8800 GTX wandelte die GPU vom starren 3D-Beschleuniger zum universellen Parallel-Supercomputer. Zusammen mit dem 2007 erschienenen Crysis definierte diese Karte eine Ära des PC-Gamings.'
      },
      credit: {
        artist: 'Hyins',
        license: 'Public domain',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        commons: 'File:NVIDIA GeForce 8800 GTX Board.jpg'
      }
    },
    {
      id: 8,
      cat: 'agp_shader',
      eraLabel: 'Juni 2008 · Der erste GDDR5-Pionier',
      img: './img/gpu-08.jpg',
      q: 'Welche ATi-Grafikkarte (Chip „RV770“) setzte im Sommer 2008 als weltweit erste Karte auf extrem schnellen GDDR5-Speicher und schockte NVIDIA mit einem aggressiven Kampfpreis von unter 250 Euro?',
      a: [
        'ATi Radeon HD 4870 (RV770)',
        'NVIDIA GeForce 9800 GTX+',
        'ATi Radeon HD 3870 GDDR4',
        'NVIDIA GeForce GTX 260'
      ],
      explanation: 'Statt wie NVIDIA auf riesige, teure Monsterchips zu setzen, baute ATi einen schlanken, effizienten Chip mit brandneuem GDDR5-Speicher. Das Preis-Leistungs-Verhältnis war so gnadenlos gut, dass NVIDIA die Preise der GTX 280 über Nacht drastisch senken musste.',
      exp: 'Statt wie NVIDIA auf riesige, teure Monsterchips zu setzen, baute ATi einen schlanken, effizienten Chip mit brandneuem GDDR5-Speicher. Das Preis-Leistungs-Verhältnis war so gnadenlos gut, dass NVIDIA die Preise der GTX 280 über Nacht drastisch senken musste.',
      wasDasIst: {
        title: 'ATi Radeon HD 4870 (RV770)',
        nick: 'Die „Sweet-Spot“-Strategie & Weltpremiere von GDDR5',
        year: 'Juni 2008',
        chip: 'RV770 (55 nm TSMC · 956 Mio. Transistoren · 800 VLIW5-ALUs)',
        vram: '512 MB / 1 GB GDDR5 (256-Bit, doppelte Datenrate gegenüber GDDR3)',
        bus: 'PCIe 2.0 ×16 · DirectX 10.1',
        trivia: 'Statt einen riesigen, teuren Monsterchip zu bauen, kombinierte ATi beim RV770 eine massive Erhöhung der Recheneinheiten mit brandneuem GDDR5-Speicher und lieferte fast die Leistung einer doppelt so teuren GTX 280.'
      },
      credit: {
        artist: 'Santeri Viinamäki',
        license: 'CC BY 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
        commons: 'File:Radeon HD 4870.JPG'
      }
    },
    {
      id: 9,
      cat: 'dx11_raytracing',
      eraLabel: 'September 2009 · Weltweit erste DirectX-11-GPU',
      img: './img/gpu-09.jpg',
      q: 'Welche Grafikkarte im markanten „Batmobile“-Design erschien im Herbst 2009 als weltweit erste DirectX-11-GPU mit Hardware-Tessellation und bot Multi-Monitor-Gaming via „Eyefinity“?',
      a: [
        'ATi Radeon HD 5870 („Cypress“)',
        'NVIDIA GeForce GTX 480',
        'AMD Radeon HD 6970',
        'NVIDIA GeForce GTX 295'
      ],
      explanation: 'Wegen ihrer doppelten Heck-Abluftöffnungen tauften Fans sie liebevoll „Batmobile“. Sie war volle sechs Monate vor NVIDIAs DirectX-11-Karten auf dem Markt und zog im Leerlauf gerade einmal sensationelle 27 Watt aus der Steckdose!',
      exp: 'Wegen ihrer doppelten Heck-Abluftöffnungen tauften Fans sie liebevoll „Batmobile“. Sie war volle sechs Monate vor NVIDIAs DirectX-11-Karten auf dem Markt und zog im Leerlauf gerade einmal sensationelle 27 Watt aus der Steckdose!',
      wasDasIst: {
        title: 'ATi / AMD Radeon HD 5870 („Cypress“)',
        nick: '„Batmobile“-Design · Erste DirectX-11-Karte der Welt',
        year: 'September 2009',
        chip: 'Cypress XT (40 nm TSMC · 2,15 Mrd. Transistoren)',
        vram: '1 GB (oder 2 GB Eyefinity 6) GDDR5 (256-Bit)',
        bus: 'PCIe 2.1 ×16 · DirectX 11.0',
        trivia: 'Dank ihres markanten schwarz-roten Gehäuses mit den zwei Lufteinlässen am Heck wurde die HD 5870 sofort „Batmobile“ getauft. Sie verdoppelte die Rechenleistung gegenüber der HD 4870 bei nur 27 Watt im Leerlauf.'
      },
      credit: {
        artist: 'D-Kuru',
        license: 'CC BY-SA 3.0 at',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/at/deed.en',
        commons: 'File:Sapphire Radeon HD 5870-front oblique PNr°0310.jpg'
      }
    },
    {
      id: 10,
      cat: 'dx11_raytracing',
      eraLabel: 'März 2010 · „Fermi“ mit sichtbaren Heatpipes',
      img: './img/gpu-10.jpg',
      q: 'Welche DirectX-11-Grafikkarte von NVIDIA (Chip „GF100“) war am metallischen Gehäusedeckel mit vier außen sichtbaren vernickelten Heatpipes erkennbar und wurde für hohe Hitze berühmt?',
      a: [
        'NVIDIA GeForce GTX 480 („Fermi“)',
        'NVIDIA GeForce GTX 580',
        'AMD Radeon HD 6950',
        'NVIDIA GeForce GTX 285'
      ],
      explanation: 'Die Fermi-Architektur war von Grund auf für wissenschaftliches GPU-Computing konstruiert, weshalb die GTX 480 bis zu 300 Watt verfeuerte. Erst das überarbeitete Nachfolgemodell GTX 580 bekam die Hitzeentwicklung mit einer leisen Vapor-Chamber perfekt in den Griff.',
      exp: 'Die Fermi-Architektur war von Grund auf für wissenschaftliches GPU-Computing konstruiert, weshalb die GTX 480 bis zu 300 Watt verfeuerte. Erst das überarbeitete Nachfolgemodell GTX 580 bekam die Hitzeentwicklung mit einer leisen Vapor-Chamber perfekt in den Griff.',
      wasDasIst: {
        title: 'NVIDIA GeForce GTX 480 („Fermi“ GF100)',
        nick: 'Das Tessellations-Kraftwerk mit Außen-Heatpipes',
        year: 'März 2010',
        chip: 'GF100 (40 nm TSMC · 3,0 Mrd. Transistoren · 480 CUDA-Kerne)',
        vram: '1.536 MB GDDR5 (384-Bit)',
        bus: 'PCIe 2.0 ×16 · DirectX 11.0',
        trivia: 'Die Fermi-Architektur war von Grund auf für GPGPU-Computing und Tessellation entworfen. Nachdem die GTX 480 sehr heiß und laut wurde, perfektionierte NVIDIA das Design wenige Monate später mit der GTX 580.'
      },
      credit: {
        artist: 'Hyins',
        license: 'Public domain',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        commons: 'File:NVIDIA GeForce GTX 480.jpg'
      }
    },
    {
      id: 11,
      cat: 'dx11_raytracing',
      eraLabel: 'Dezember 2011 / 2012 · Erste 28-nm-GPU & GCN',
      img: './img/gpu-11.jpg',
      q: 'Mit welcher 28-nm-Grafikkarte führte AMD Anfang 2012 die modulare „Graphics Core Next“-Architektur (GCN) ein, die dank Asynchronous Compute über Jahre hinweg immer schneller („FineWine“) wurde?',
      a: [
        'AMD Radeon HD 7970 (GCN 1.0)',
        'NVIDIA GeForce GTX 680',
        'AMD Radeon HD 6990 Dual',
        'ATi Radeon HD 5970'
      ],
      explanation: 'Weil Konsolen wie PS4 und Xbox One ebenfalls auf GCN setzten, alterte die HD 7970 in modernen DirectX-12-Spielen phänomenal gut. Die Community taufte diesen seltenen Reife-Effekt ehrfürchtig „AMD FineWine“!',
      exp: 'Weil Konsolen wie PS4 und Xbox One ebenfalls auf GCN setzten, alterte die HD 7970 in modernen DirectX-12-Spielen phänomenal gut. Die Community taufte diesen seltenen Reife-Effekt ehrfürchtig „AMD FineWine“!',
      wasDasIst: {
        title: 'AMD Radeon HD 7970 / 7970M (GCN 1.0)',
        nick: 'Die erste 28-nm-GPU der Welt & Ursprung von „AMD FineWine“',
        year: 'Januar 2012',
        chip: 'Tahiti XT / Wimbledon (28 nm TSMC · bis 4,31 Mrd. Transistoren)',
        vram: '3 GB GDDR5 (384-Bit am Desktop) / 2 GB GDDR5 (Mobil)',
        bus: 'PCIe 3.0 ×16 · DirectX 11.1 / DirectX 12 / Vulkan',
        trivia: 'Durch den Wechsel auf skalare Compute-Units (GCN) und Asynchronous Compute alterte die Radeon HD 7970 in modernen DirectX-12-Spielen so außergewöhnlich gut, dass der Begriff „AMD FineWine Technology“ entstand.'
      },
      credit: {
        artist: 'D-Kuru',
        license: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        commons: 'File:AMD Radeon HD 7970M GPU-top PNr°0813.jpg'
      }
    },
    {
      id: 12,
      cat: 'dx11_raytracing',
      eraLabel: 'Februar 2013 · Begründung der 1.000-Dollar-Titan-Klasse',
      img: './img/gpu-012.jpg'.replace('012', '12'),
      q: 'Welche 2013 vorgestellte 1.000-Dollar-Luxusgrafikkarte im edlen Aluminiumgehäuse mit Acryl-Sichtfenster brachte den 7-Milliarden-Transistoren-Chip „GK110“ aus US-Supercomputern auf den Desktop?',
      a: [
        'NVIDIA GeForce GTX TITAN',
        'NVIDIA GeForce GTX 690',
        'AMD Radeon HD 7990 Dual',
        'NVIDIA Quadro K6000'
      ],
      explanation: 'Der GK110-Chip trieb ursprünglich den weltberühmten Titan-Supercomputer im Oak Ridge National Lab an. Für Heimanwender schuf NVIDIA damit eine völlig neue Ultra-Premium-Kategorie mit damals unvorstellbaren 6 Gigabyte Videospeicher!',
      exp: 'Der GK110-Chip trieb ursprünglich den weltberühmten Titan-Supercomputer im Oak Ridge National Lab an. Für Heimanwender schuf NVIDIA damit eine völlig neue Ultra-Premium-Kategorie mit damals unvorstellbaren 6 Gigabyte Videospeicher!',
      wasDasIst: {
        title: 'NVIDIA GeForce GTX TITAN (GK110 „Kepler“)',
        nick: 'Das legendäre Aluminium-Kühler-Design mit Sichtfenster',
        year: 'Februar 2013',
        chip: 'GK110 (28 nm · 7,1 Mrd. Transistoren · 2.688 CUDA-Kerne)',
        vram: '6 GB GDDR5 (384-Bit) + volle FP64-Double-Precision-Leistung',
        bus: 'PCIe 3.0 ×16',
        trivia: 'Das von NVIDIA für die GTX Titan entworfene silber-schwarze Metallgehäuse mit grün leuchtendem Schriftzug und Vapor-Chamber-Sichtfenster prägte jahrelang das Bild moderner High-End-Grafikkarten.'
      },
      credit: {
        artist: 'Hyins',
        license: 'Public domain',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        commons: 'File:NVIDIA GeForce GTX TITAN.jpg'
      }
    },
    {
      id: 13,
      cat: 'dx11_raytracing',
      eraLabel: 'Sommer 2015 · Weltpremiere von HBM-Stapelspeicher',
      img: './img/gpu-13.jpg',
      q: 'Mit welcher ultrakompakten 15-cm-Grafikkarte (Chip „Fiji“) brachte AMD im Sommer 2015 erstmals gestapelten „High Bandwidth Memory“ (HBM) mit einem riesigen 4.096-Bit-Speicherbus auf den Markt?',
      a: [
        'AMD Radeon R9 Nano / Fury X',
        'NVIDIA GeForce GTX 980 Mini',
        'AMD Radeon RX Vega 56',
        'NVIDIA Titan X („Maxwell“)'
      ],
      explanation: 'Weil die vier HBM-Speichertürme direkt neben der GPU auf einem Silizium-Interposer saßen, fiel die Platine winzig aus: Die R9 Nano war kaum länger als der PCIe-Slot selbst! Genau diese HBM-Technologie treibt heute KI-Superchips wie H100 an.',
      exp: 'Weil die vier HBM-Speichertürme direkt neben der GPU auf einem Silizium-Interposer saßen, fiel die Platine winzig aus: Die R9 Nano war kaum länger als der PCIe-Slot selbst! Genau diese HBM-Technologie treibt heute KI-Superchips wie H100 an.',
      wasDasIst: {
        title: 'AMD Radeon R9 Nano / R9 Fury X („Fiji“)',
        nick: 'Der HBM-Speicher-Pionier im 15-Zentimeter-Format',
        year: 'Juni / August 2015',
        chip: 'Fiji XT (28 nm · 8,9 Mrd. Transistoren · 4.096 Stream-Prozessoren)',
        vram: '4 GB HBM1 (High Bandwidth Memory · 4.096-Bit-Interface · 512 GB/s!)',
        bus: 'PCIe 3.0 ×16',
        trivia: 'Da die vier HBM-Speicherstapel direkt neben dem Grafikchip saßen, sparte AMD alle umliegenden Speicherchips ein. Dadurch wurde die R9 Nano bei voller Shader-Ausbaustufe kaum länger als der PCIe-Steckplatz selbst.'
      },
      credit: {
        artist: 'Verte95',
        license: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        commons: 'File:AMD R9 Nano.jpg'
      }
    },
    {
      id: 14,
      cat: 'dx11_raytracing',
      eraLabel: '2016/2017 · Der 16-nm-Pascal-Quantensprung',
      img: './img/gpu-14.jpg',
      q: 'Welche kantig facettierte „Founders Edition“-Generation (16-nm-FinFET) lieferte 2016/2017 mit GTX 1070, GTX 1080 und der unverwüstlichen 11-GB-Legende GTX 1080 Ti Rekord-Beliebtheit?',
      a: [
        'NVIDIA GeForce GTX 10-Serie („Pascal“)',
        'NVIDIA GeForce 900-Serie („Maxwell“)',
        'AMD Radeon RX 480 / 580 („Polaris“)',
        'NVIDIA GeForce RTX 2070 („Turing“)'
      ],
      explanation: 'Dank TSMCs 16-nm-FinFET schossen die Taktraten erstmals über 2 GHz bei extrem moderatem Stromverbrauch. Vor allem die legendäre GTX 1080 Ti mit 11 GB VRAM hielt sich bei vielen Gamern über sechs Jahre lang auf Top-Niveau!',
      exp: 'Dank TSMCs 16-nm-FinFET schossen die Taktraten erstmals über 2 GHz bei extrem moderatem Stromverbrauch. Vor allem die legendäre GTX 1080 Ti mit 11 GB VRAM hielt sich bei vielen Gamern über sechs Jahre lang auf Top-Niveau!',
      wasDasIst: {
        title: 'NVIDIA GeForce GTX 10-Serie („Pascal“ Founders Edition)',
        nick: 'Meilenstein für 1440p/4K-Gaming & 16-nm-Effizienz',
        year: 'Mai 2016 (GTX 1080 / 1070) · März 2017 (GTX 1080 Ti)',
        chip: 'GP104 / GP102 (16 nm TSMC FinFET)',
        vram: '8 GB GDDR5/GDDR5X (1070/1080) bzw. 11 GB GDDR5X (1080 Ti)',
        bus: 'PCIe 3.0 ×16',
        trivia: 'Der Wechsel auf TSMCs 16-nm-FinFET brachte einen dramatischen Sprung bei Takt und Effizienz. Besonders die GTX 1080 Ti mit 11 GB VRAM für 699 Dollar gilt bis heute als eine der besten Grafikkarten aller Zeiten.'
      },
      credit: {
        artist: 'Evan-Amos',
        license: 'Public domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        commons: 'File:NVIDIA-GTX-1070-FoundersEdition-FL.jpg'
      }
    },
    {
      id: 15,
      cat: 'dx11_raytracing',
      eraLabel: 'September 2018 · Geburt von „RTX“ & DLSS',
      img: './img/gpu-15.jpg',
      q: 'Welche Grafikkarten-Generation ersetzte 2018 das traditionsreiche Kürzel „GTX“ durch „RTX“ und verbaute erstmals dedizierte Hardware für Raytracing (RT-Cores) und neuronales KI-Upscaling (Tensor-Cores)?',
      a: [
        'NVIDIA GeForce RTX 2080 Ti („Turing“)',
        'NVIDIA GeForce GTX Titan Xp',
        'AMD Radeon RX 6800 XT („Big Navi“)',
        'Intel Arc A770 Limited Edition'
      ],
      explanation: 'Mit stolzen 754 mm² Chipfläche war der Turing-Chip ein echtes Silizium-Monster. Obwohl Hardware-Raytracing anfangs belächelt wurde, legte die 2080 Ti das Fundament für heutiges Path-Tracing und KI-Rendering via DLSS!',
      exp: 'Mit stolzen 754 mm² Chipfläche war der Turing-Chip ein echtes Silizium-Monster. Obwohl Hardware-Raytracing anfangs belächelt wurde, legte die 2080 Ti das Fundament für heutiges Path-Tracing und KI-Rendering via DLSS!',
      wasDasIst: {
        title: 'NVIDIA GeForce RTX 2080 Ti („Turing“ TU102)',
        nick: 'Der Startschuss für Hardware-Raytracing & KI-Rendering (DLSS)',
        year: 'September 2018',
        chip: 'TU102 (12 nm FFN · 754 mm² Die-Fläche · 18,6 Mrd. Transistoren)',
        vram: '11 GB GDDR6 (352-Bit · 616 GB/s)',
        bus: 'PCIe 3.0 ×16 · 68 RT-Cores + 544 Tensor-Cores',
        trivia: 'Mit 754 mm² war der TU102 einer der größten Consumer-Grafikchips aller Zeiten. Erstmals führte NVIDIA mit DLSS neuronales KI-Upscaling im Gaming ein und verabschiedete sich vom lauten Radiallüfter.'
      },
      credit: {
        artist: '极客湾Geekerwan',
        license: 'CC BY 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
        commons: 'File:NVIDIA GeForce RTX 2080 Ti (极客湾Geekerwan) 014.png'
      }
    },
    {
      id: 16,
      cat: 'dx11_raytracing',
      eraLabel: 'Oktober 2022 · 76 Milliarden Transistoren',
      img: './img/gpu-16.jpg',
      q: 'Welches brachiale 450-Watt-Flaggschiff der „Ada Lovelace“-Architektur (Chip AD102 mit 76,3 Milliarden Transistoren und 24 GB GDDR6X) führte 2022 KI-generierte Zwischenbilder (DLSS 3) ein?',
      a: [
        'NVIDIA GeForce RTX 4090 („Ada Lovelace“)',
        'AMD Radeon RX 7900 XTX („RDNA 3“)',
        'NVIDIA GeForce RTX 3090 Ti',
        'Intel Arc Pro A60 Workstation'
      ],
      explanation: 'Der Sprung auf TSMCs maßgeschneiderte 4N-Fertigung und ein gigantischer 72-MB-L2-Cache brachten einen historischen Leistungssprung von bis zu +90 % gegenüber dem Vorgänger – wodurch die Karte auch bei KI-Forschern heiß begehrt wurde!',
      exp: 'Der Sprung auf TSMCs maßgeschneiderte 4N-Fertigung und ein gigantischer 72-MB-L2-Cache brachten einen historischen Leistungssprung von bis zu +90 % gegenüber dem Vorgänger – wodurch die Karte auch bei KI-Forschern heiß begehrt wurde!',
      wasDasIst: {
        title: 'NVIDIA GeForce RTX 4090 Founders Edition („Ada Lovelace“)',
        nick: 'Das 450-Watt-Kraftpaket für 4K-Path-Tracing & lokale KI-Modelle',
        year: 'Oktober 2022',
        chip: 'AD102 (TSMC 4N · 76,3 Mrd. Transistoren · 16.384 CUDA-Kerne)',
        vram: '24 GB GDDR6X (384-Bit · 1.008 GB/s Bandbreite + 72 MB L2-Cache)',
        bus: 'PCIe 4.0 ×16 · 12VHPWR-Stromanschluss (450 W TDP)',
        trivia: 'Durch den Wechsel auf TSMCs 4N-Prozess und 72 MB L2-Cache steigerte die RTX 4090 ihre Leistung gegenüber dem Vorgänger oft um 60 bis 90 % – und wurde wegen ihrer 24 GB VRAM auch bei KI-Entwicklern begehrt.'
      },
      credit: {
        artist: 'ZMASLO',
        license: 'CC BY 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
        commons: 'File:NVIDIA RTX 4090 Founders Edition - In der Hand (ZMASLO).png'
      }
    }
  ];
  window.ArcadeQuizEngine.registerBank('gpus', DATA);
})();
