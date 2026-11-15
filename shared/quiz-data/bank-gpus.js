// Grafikkarten-Quiz (2000–Heute · 16 Fotos)
(function () {
const DATA = [
    {
      id: 1,
      cat: 'agp_shader',
      eraLabel: 'Juni 2000 · Das letzte 3dfx-Flaggschiff',
      img: './img/gpu-01.jpg',
      q: 'Welche Kult-Grafikkarte des Jahres 2000 kombinierte zwei VSA-100-Chips im internen SLI-Verbund samt eigenem Molex-Stromanschluss und brillierte mit butterweichem RGSS-Antialiasing, kurz bevor 3dfx von NVIDIA übernommen wurde?',
      a: ['3dfx Voodoo5 5500 AGP', 'Matrox Parhelia 512', 'S3 Savage 2000', 'ATi Rage Fury MAXX'],
      wasDasIst: {
        title: '3dfx Voodoo5 5500 (2× VSA-100)',
        nick: 'Das legendäre letzte Aufbäumen von 3dfx',
        year: 'Juni 2000',
        chip: '2× 3dfx VSA-100 @ 166 MHz (250 nm)',
        vram: '64 MB SDRAM (2× 32 MB, effektiv 32 MB nutzbar)',
        bus: 'AGP Universal / PCI + 4-Pin-Molex-Stromanschluss',
        trivia: 'Dank „Rotated Grid Supersampling“ (4× RGSS FSAA) lieferte die Voodoo5 5500 im Jahr 2000 eine Kantenglättung, von der die Konkurrenz nur träumen konnte. Da ihr jedoch Hardware-T&L fehlte und die geplante Vier-Chip-Karte Voodoo5 6000 nie in den Handel kam, ging die Ära 3dfx Ende 2000 zu Ende.'
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
      q: 'Welche Karte bewarb NVIDIA erstmals als „The World’s First GPU“ (Graphics Processing Unit), weil sie eine feste Hardware-Transform-&-Lighting-Einheit (T&L) direkt auf dem Grafikchip integrierte?',
      a: ['NVIDIA GeForce 256 (NV10 · DDR)', 'NVIDIA RIVA TNT2 Ultra', '3dfx Voodoo3 3500 TV', 'ATi Radeon 7000'],
      wasDasIst: {
        title: 'NVIDIA GeForce 256 DDR (NV10)',
        nick: '„The World’s First GPU“ (Hardware T&L)',
        year: 'Ende 1999 / Anfang 2000 (DDR-Version)',
        chip: 'NV10 (220 nm · 17 Mio. Transistoren)',
        vram: '32 MB SDR oder DDR-SGRAM (128-Bit)',
        bus: 'AGP 4×',
        trivia: 'Bis zur GeForce 256 musste der Hauptprozessor (CPU) alle 3D-Dreieckskoordinaten und Lichtquellen berechnen. Durch die Auslagerung von Transform & Lighting (T&L) auf die Grafikkarte (besonders in der schnelleren DDR-Speicher-Variante wie hier von Canopus) zog NVIDIA in Quake III Arena und Dagoth Moor Mansion davon.'
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
      q: 'Mit welcher Grafikkarten-Generation (NV20, hier das Topmodell Ti 500) führte NVIDIA 2001 erstmals frei programmierbare Pixel- und Vertex-Shader für DirectX 8.0 (berühmt für das schillernde Wasser in Morrowind & 3DMark 2001 Nature) ein?',
      a: ['NVIDIA GeForce3 (Ti 500)', 'NVIDIA GeForce4 MX 440', 'ATi Rage 128 Pro', 'Kyro II (PowerVR Series 3)'],
      wasDasIst: {
        title: 'NVIDIA GeForce3 Ti 500 (NV20)',
        nick: 'Der Beginn der programmierbaren Shader-Ära',
        year: '2001',
        chip: 'NV20 (150 nm · 57 Mio. Transistoren)',
        vram: '64 MB DDR @ 250 MHz (effektiv 500 MHz)',
        bus: 'AGP 4× · DirectX 8.0 (Shader Model 1.1)',
        trivia: 'Vor der GeForce3 arbeiteten 3D-Karten mit starren Register-Combinern. Erst die programmierbare „nFiniteFX Engine“ der GeForce3 ermöglichte realistische Wasseroberflächen, Pixel-genaue Spiegelungen (z. B. in The Elder Scrolls III: Morrowind) und legte das Fundament für moderne GPUs.'
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
      q: 'Mit welcher legendären roten AGP-Grafikkarte (Chip „R300“, 8 Pixel-Pipelines, 256-Bit-Speicherbus und Floppy-Stromstecker) überrumpelte ATi im Sommer 2002 die gesamte Branche und übernahm mit voller DirectX-9.0-Präzision (FP24) die Leistungskrone?',
      a: ['ATi Radeon 9700 Pro (R300)', 'ATi Radeon 8500', 'NVIDIA GeForce4 Ti 4600', 'ATi Radeon X800 XT'],
      wasDasIst: {
        title: 'ATi Radeon 9700 Pro (R300)',
        nick: 'Die wohl dominanteste ATi-Karte aller Zeiten',
        year: 'August 2002',
        chip: 'ATi R300 (150 nm · 110 Mio. Transistoren)',
        vram: '128 MB DDR (256-Bit-Speicherinterface!)',
        bus: 'AGP 8× · DirectX 9.0 (Shader Model 2.0)',
        trivia: 'Die Radeon 9700 Pro verdoppelte nicht nur die Speicherbandbreite durch ihr L-förmiges 256-Bit-Speicherlayout, sondern beherrschte bereits im Sommer 2002 echtes DirectX 9.0 mit rasanter Kantenglättung – sie blieb jahrelang die Referenz für Spiele wie Half-Life 2 und Far Cry.'
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
      q: 'Welche unvergessene NVIDIA-Grafikkarte (Chip „NV30“) ging 2003 wegen ihres ohrenbetäubend lauten Dual-Slot-Radialkühlers („FlowFX“) als „Föhn“, „Dustbuster“ oder „Laubbläser“ in die PC-Folklore ein?',
      a: ['NVIDIA GeForce FX 5800 Ultra (NV30)', 'NVIDIA GeForce 7900 GTX', 'ATi Radeon X1900 XTX', '3dfx Voodoo Rush'],
      wasDasIst: {
        title: 'NVIDIA GeForce FX 5800 Ultra (NV30)',
        nick: '„FlowFX“ / „Der Laubbläser“ („Dustbuster“)',
        year: 'Frühjahr 2003',
        chip: 'NV30 (130 nm TSMC · 125 Mio. Transistoren @ 500 MHz)',
        vram: '128 MB DDR2 @ 500 MHz (1 GHz effektiv, 128-Bit)',
        bus: 'AGP 8× · DirectX 9.0a',
        trivia: 'Um 500 MHz Chiptakt und heißen DDR2-Speicher in 130 nm zu bändigen, verbaute NVIDIA die „FlowFX“-Kupfer-Turbine, die unter 3D-Last über 60 Dezibel erreichte. NVIDIA nahm es später mit eigenem Humor und drehte sogar ein Selbstironie-Video über den „FX-Haartrockner“.'
      },
      credit: {
        artist: 'Hyins',
        license: 'Public domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        commons: 'File:NVIDIA GeForce FX 5800 Ultra ES.jpg'
      }
    },
    {
      id: 6,
      cat: 'agp_shader',
      eraLabel: 'April 2004 · Shader Model 3.0 & SLI-Comeback',
      img: './img/gpu-06.jpg',
      q: 'Mit welchem Flaggschiff (Chip „NV40“, 16 Pixel-Pipelines) bügelte NVIDIA 2004 die Schwächen der FX-Serie komplett aus, führte Shader Model 3.0 (HDR-Rendering in Far Cry & Splinter Cell) ein und brachte SLI auf PCI-Express zurück?',
      a: ['NVIDIA GeForce 6800 Ultra (NV40)', 'NVIDIA GeForce 7600 GT', 'ATi Radeon 9800 XT', 'NVIDIA GeForce FX 5950 Ultra'],
      wasDasIst: {
        title: 'NVIDIA GeForce 6800 Ultra (NV40)',
        nick: 'Die Vervierfachung der Pipelines & SLI-Wiedergeburt',
        year: 'April 2004',
        chip: 'NV40 (130 nm IBM · 222 Mio. Transistoren)',
        vram: '256 MB (später 512 MB) GDDR3 (256-Bit)',
        bus: 'AGP 8× & PCIe ×16 · DirectX 9.0c (Shader Model 3.0)',
        trivia: 'Die GeForce-6-Serie war ein technischer Befreiungsschlag: Sie unterstützte als erste Architektur volle FP16-HDR-Überblendeffekte und Shader Model 3.0, während die beliebte kleinere Schwester GeForce 6600 GT zum Preis-Leistungs-Hit der Mitte-2000er wurde.'
      },
      credit: {
        artist: 'Hyins',
        license: 'Public domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        commons: 'File:NVIDIA GeForce 6800 Ultra 512MB.jpg'
      }
    },
    {
      id: 7,
      cat: 'agp_shader',
      eraLabel: 'November 2006 · „But can it run Crysis?“',
      img: './img/gpu-07.jpg',
      q: 'Welche monumentale Grafikkarte (Chip „G80“, 768 MB VRAM am 384-Bit-Interface) verabschiedete im November 2006 die Trennung von Pixel- und Vertex-Shadern zugunsten von 128 „Unified Shaders“ (CUDA-Kernen) und wurde zum König für Crysis (2007)?',
      a: ['NVIDIA GeForce 8800 GTX (G80)', 'NVIDIA GeForce 9800 GX2', 'ATi Radeon HD 2900 XT', 'NVIDIA GeForce GTX 280'],
      wasDasIst: {
        title: 'NVIDIA GeForce 8800 GTX (G80)',
        nick: '„Der König der Crysis-Ära“ · Geburt von CUDA & Unified Shaders',
        year: 'November 2006',
        chip: 'G80 (90 nm · 681 Mio. Transistoren · 128 Stream-Prozessoren @ 1.350 MHz Shader-Takt)',
        vram: '768 MB GDDR3 an einem 384-Bit-Speicherinterface',
        bus: 'PCIe ×16 · DirectX 10.0 · Erste CUDA-Architektur',
        trivia: 'Der G80-Chip auf der 8800 GTX ist wohl der wichtigste Meilenstein der modernen GPU-Geschichte: Durch frei programmierbare skalare Stream-Prozessoren (Unified Shaders) und die Einführung von CUDA wandelte sich die Grafikkarte vom reinen 3D-Beschleuniger zum universellen Parallel-Supercomputer.'
      },
      credit: {
        artist: 'Hyins',
        license: 'Public domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        commons: 'File:NVIDIA GeForce 8800 GTX Board.jpg'
      }
    },
    {
      id: 8,
      cat: 'agp_shader',
      eraLabel: 'Juni 2008 · Der erste GDDR5-Pionier',
      img: './img/gpu-08.jpg',
      q: 'Welche ATi-Grafikkarte (Chip „RV770“, 800 Stream-Prozessoren) setzte im Sommer 2008 als weltweit erste Karte auf den pfeilschnellen GDDR5-Videospeicher und zwang NVIDIA mit einem Kampfpreis von unter 250 € zu drastischen Preissenkungen?',
      a: ['ATi Radeon HD 4870 (RV770)', 'ATi Radeon HD 3870', 'NVIDIA GeForce 8800 Ultra', 'AMD Radeon R9 290X'],
      wasDasIst: {
        title: 'ATi Radeon HD 4870 (RV770)',
        nick: 'Die „Sweet-Spot“-Strategie & Weltpremiere von GDDR5',
        year: 'Juni 2008',
        chip: 'RV770 (55 nm TSMC · 956 Mio. Transistoren · 800 VLIW5-ALUs)',
        vram: '512 MB / 1 GB GDDR5 (256-Bit, doppelte Datenrate gegenüber GDDR3)',
        bus: 'PCIe 2.0 ×16 · DirectX 10.1',
        trivia: 'Statt einen riesigen, teuren Monster-Chip zu bauen, kombinierte ATi beim kompakten RV770 (256 mm²) eine massive Erhöhung der Recheneinheiten mit dem brandneuen GDDR5-Speicher (entwickelt mit Qimonda/Hynix) und lieferte fast die Leistung einer doppelt so teuren GTX 280.'
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
      q: 'Welche Grafikkarte (Codename „Cypress“, 1.600 Stream-Prozessoren) kam im Herbst 2009 ein halbes Jahr vor NVIDIAs Fermi auf den Markt und brachte als erste GPU weltweit volle DirectX-11-Hardware-Tessellation sowie „Eyefinity“ für bis zu 3–6 Monitore?',
      a: ['ATi / AMD Radeon HD 5870 („Cypress“)', 'AMD Radeon HD 6970', 'NVIDIA GeForce GTX 295', 'AMD Radeon RX 480'],
      wasDasIst: {
        title: 'ATi / AMD Radeon HD 5870 („Cypress“)',
        nick: '„Batmobile“-Design · Erste DirectX-11-Karte der Welt',
        year: 'September 2009',
        chip: 'Cypress XT (40 nm TSMC · 2,15 Mrd. Transistoren)',
        vram: '1 GB (oder 2 GB Eyefinity 6) GDDR5 (256-Bit)',
        bus: 'PCIe 2.1 ×16 · DirectX 11.0',
        trivia: 'Dank ihres markanten schwarz-roten Gehäuses mit den zwei Lufteinlässen am Heck wurde das Referenzdesign der HD 5870 sofort „Batmobile“ getauft. Sie verdoppelte die Rechenleistung gegenüber der HD 4870 bei nur 27 Watt im Leerlauf.'
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
      q: 'Welche DirectX-11-Grafikkarte von NVIDIA (Chip „GF100“, 15 PolyMorph-Engines für extrem starke Tessellation) war am freiliegenden Metall-Kühlkörper samt vier außen sichtbaren vernickelten Heatpipes erkennbar und wurde für ihre Hitzeentwicklung berühmt?',
      a: ['NVIDIA GeForce GTX 480 („Fermi“ GF100)', 'NVIDIA GeForce GTX 580', 'NVIDIA GeForce GTX 680', 'NVIDIA GeForce 9800 GTX+'],
      wasDasIst: {
        title: 'NVIDIA GeForce GTX 480 („Fermi“ GF100)',
        nick: 'Das Tessellations-Kraftwerk mit Außen-Heatpipes',
        year: 'März 2010',
        chip: 'GF100 (40 nm TSMC · 3,0 Mrd. Transistoren · 480 CUDA-Kerne)',
        vram: '1.536 MB GDDR5 (384-Bit)',
        bus: 'PCIe 2.0 ×16 · DirectX 11.0',
        trivia: 'Die Fermi-Architektur war von Grund auf für GPGPU-Computing (ECC-Speicher, C++, 64-Bit-Gleitkomma) und brachiale Geometrie-Tessellation entworfen. Nachdem die erste Inkarnation (GTX 480) unter Last noch sehr heiß und laut wurde, perfektionierte NVIDIA das Design wenige Monate später mit der leisen GTX 580 (GF110).'
      },
      credit: {
        artist: 'Hyins',
        license: 'Public domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        commons: 'File:NVIDIA GeForce GTX 480.jpg'
      }
    },
    {
      id: 11,
      cat: 'dx11_raytracing',
      eraLabel: 'Dezember 2011 / 2012 · Erste 28-nm-GPU & GCN',
      img: './img/gpu-11.jpg',
      q: 'Mit welcher Grafikkarten-Generation (Chip „Tahiti“ / „Pitcairn“) verabschiedete AMD Ende 2011 die alte VLIW-Architektur und führte in 28 nm die extrem langlebige „Graphics Core Next“-Architektur (GCN 1.0) samt „FineWine“-Ruf ein?',
      a: ['AMD Radeon HD 7970 / HD 7900 Serie (GCN 1.0)', 'AMD Radeon R9 285', 'ATi Radeon X1950 Pro', 'AMD Radeon VII'],
      wasDasIst: {
        title: 'AMD Radeon HD 7970 / 7970M (GCN 1.0)',
        nick: 'Die erste 28-nm-GPU der Welt & Ursprung von „AMD FineWine“',
        year: 'Januar 2012',
        chip: 'Tahiti XT / Wimbledon (28 nm TSMC · bis 4,31 Mrd. Transistoren)',
        vram: '3 GB GDDR5 (384-Bit am Desktop) / 2 GB GDDR5 (Mobil)',
        bus: 'PCIe 3.0 ×16 · DirectX 11.1 / DirectX 12 (Feature Level 11_1) / Vulkan',
        trivia: 'Durch den Wechsel auf skalare SIMD-Compute-Units (GCN) und Asynchronous Compute alterte die Radeon-HD-7900-Serie (später auch als R9 280X bekannt) so außergewöhnlich gut in modernen DirectX-12- und Vulkan-Spielen, dass die Community den Begriff „AMD FineWine Technology“ prägte.'
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
      img: './img/gpu-12.jpg',
      q: 'Welche 2013 vorgestellte Luxus-Grafikkarte im edlen Magnesium-Aluminium-Gehäuse mit Polycarbonat-Sichtfenster brachte den riesigen „GK110“-Supercomputer-Chip (bekannt aus dem Oak-Ridge-Supercomputer „Titan“) und stolze 6 GB VRAM in Heim-PCs?',
      a: ['NVIDIA GeForce GTX Titan (GK110 „Kepler“)', 'NVIDIA GeForce GTX 690', 'NVIDIA Quadro FX 5800', 'AMD Radeon HD 7990'],
      wasDasIst: {
        title: 'NVIDIA GeForce GTX TITAN (GK110 „Kepler“)',
        nick: 'Das legendäre Aluminium-Kühler-Design mit Sichtfenster',
        year: 'Februar 2013',
        chip: 'GK110 (28 nm · 7,1 Mrd. Transistoren · 2.688 CUDA-Kerne)',
        vram: '6 GB GDDR5 (384-Bit) + volle FP64-Double-Precision-Leistung',
        bus: 'PCIe 3.0 ×16',
        trivia: 'Das von NVIDIA für die ursprüngliche GTX Titan entworfene silber-schwarze Metallgehäuse mit grün leuchtendem „GEFORCE GTX“-Schriftzug und Blick auf die Vapor-Chamber-Kühlfinnen wurde zur Design-Ikone für eine ganze Ära von Referenzkarten (GTX 780, 780 Ti, 980, 980 Ti).'
      },
      credit: {
        artist: 'Hyins',
        license: 'Public domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        commons: 'File:NVIDIA GeForce GTX TITAN.jpg'
      }
    },
    {
      id: 13,
      cat: 'dx11_raytracing',
      eraLabel: 'Sommer 2015 · Weltpremiere von HBM-Stapelspeicher',
      img: './img/gpu-13.jpg',
      q: 'Mit welcher ultrakompakten Grafikkarten-Familie (Chip „Fiji“, nur 15 cm kurzes PCB!) setzte AMD 2015 als erster Hersteller weltweit auf gestapelten „High Bandwidth Memory“ (HBM1) auf einem gemeinsamen Silicon Interposer mit 4.096-Bit-Speicherbus?',
      a: ['AMD Radeon R9 Fury X / R9 Nano („Fiji“)', 'AMD Radeon RX Vega 64', 'NVIDIA Titan V', 'AMD Radeon RX 5700 XT'],
      wasDasIst: {
        title: 'AMD Radeon R9 Nano / R9 Fury X („Fiji“)',
        nick: 'Der HBM-Speicher-Pionier im 15-Zentimeter-Format',
        year: 'Juni / August 2015',
        chip: 'Fiji XT (28 nm · 8,9 Mrd. Transistoren · 4.096 Stream-Prozessoren)',
        vram: '4 GB HBM1 (High Bandwidth Memory · 4.096-Bit-Interface · 512 GB/s!)',
        bus: 'PCIe 3.0 ×16',
        trivia: 'Da die vier HBM-Speicherstapel direkt neben dem Grafikchip auf dem Silicon Interposer saßen, sparte AMD sämtliche umliegenden GDDR5-Speicherchips auf der Platine ein. Dadurch wurde die R9 Nano (im Bild) bei voller 4.096-Shader-Ausbaustufe kaum länger als der PCIe-Steckplatz selbst – und HBM ist heute das Rückgrat aller modernen KI-Beschleuniger!'
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
      q: 'Mit welcher kantig facettierten „Founders Edition“-Generation (16-nm-FinFET, Taktraten erstmals über 1,7–2,0 GHz) gelang NVIDIA 2016/2017 mit der GTX 1070, GTX 1080 und der unverwüstlichen 11-GB-Legende GTX 1080 Ti einer der größten Leistungssprünge der GPU-Geschichte?',
      a: ['NVIDIA GeForce GTX 10-Serie („Pascal“ · GTX 1070 / 1080 / 1080 Ti)', 'NVIDIA GeForce GTX 900-Serie („Maxwell“)', 'NVIDIA GeForce GTX 1660 Super („Turing“)', 'AMD Radeon RX 580 („Polaris“)'],
      wasDasIst: {
        title: 'NVIDIA GeForce GTX 10-Serie („Pascal“ Founders Edition)',
        nick: 'Meilenstein für 1440p/4K-Gaming & 16-nm-Effizienz',
        year: 'Mai 2016 (GTX 1080 / 1070) · März 2017 (GTX 1080 Ti)',
        chip: 'GP104 / GP102 (16 nm TSMC FinFET)',
        vram: '8 GB GDDR5/GDDR5X (1070/1080) bzw. 11 GB GDDR5X (1080 Ti)',
        bus: 'PCIe 3.0 ×16',
        trivia: 'Nach vier Jahren auf dem 28-nm-Prozess brachte der Wechsel auf TSMCs 16-nm-FinFET bei „Pascal“ einen dramatischen Sprung bei Taktfrequenz und Energieeffizienz. Besonders die GTX 1080 Ti (+35 % schneller als die GTX 1080, mit 11 GB VRAM für 699 $) gilt bis heute als eine der besten Grafikkarten aller Zeiten.'
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
      q: 'Welche Grafikkarten-Generation (Architektur „Turing“, hier das Flaggschiff mit zwei Axiallüftern im silbernen Vollmetall-Chassis) ersetzte 2018 das Kürzel „GTX“ durch „RTX“ und kombinierte erstmals dedizierte RT-Cores (Echtzeit-Raytracing) mit Tensor-Cores (KI-Upscaling DLSS)?',
      a: ['NVIDIA GeForce RTX 2080 Ti („Turing“ TU102)', 'NVIDIA GeForce GTX Titan X', 'AMD Radeon RX 6900 XT („RDNA 2“)', 'Intel Arc A770 („Alchemist“)'],
      wasDasIst: {
        title: 'NVIDIA GeForce RTX 2080 Ti („Turing“ TU102)',
        nick: 'Der Startschuss für Hardware-Raytracing & KI-Rendering (DLSS)',
        year: 'September 2018',
        chip: 'TU102 (12 nm FFN · 754 mm² Die-Fläche · 18,6 Mrd. Transistoren)',
        vram: '11 GB GDDR6 (352-Bit · 616 GB/s)',
        bus: 'PCIe 3.0 ×16 · 68 RT-Cores + 544 Tensor-Cores',
        trivia: 'Mit 754 mm² war der TU102 einer der größten Consumer-Grafikchips aller Zeiten. Erstmals verabschiedete sich NVIDIA bei seiner Founders Edition vom lauten Radiallüfter („Blower“) und führte zudem mit DLSS (Deep Learning Super Sampling) neuronales KI-Upscaling im Gaming ein.'
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
      q: 'Welches Triple-Slot-Flaggschiff der „Ada Lovelace“-Architektur (Chip AD102, 76,3 Milliarden Transistoren in 4 nm, 24 GB GDDR6X) führte 2022 DLSS 3 Frame Generation ein und nutzt das markante „Flow-Through“-Kühldesign mit beidseitigen Lüftern?',
      a: ['NVIDIA GeForce RTX 4090 („Ada Lovelace“ AD102)', 'NVIDIA GeForce RTX 3060 Ti', 'AMD Radeon RX 7900 XTX', 'NVIDIA GeForce GTX 980 Ti'],
      wasDasIst: {
        title: 'NVIDIA GeForce RTX 4090 Founders Edition („Ada Lovelace“)',
        nick: 'Das 450-Watt-Kraftpaket für 4K-Path-Tracing & lokale KI-Modelle',
        year: 'Oktober 2022',
        chip: 'AD102 (TSMC 4N · 76,3 Mrd. Transistoren · 16.384 CUDA-Kerne)',
        vram: '24 GB GDDR6X (384-Bit · 1.008 GB/s Bandbreite + 72 MB L2-Cache)',
        bus: 'PCIe 4.0 ×16 · 12VHPWR-Stromanschluss (450 W TDP)',
        trivia: 'Durch den Wechsel von Samsungs 8-nm-Prozess (RTX 3090) auf TSMCs maßgeschneiderten 4N-Prozess und einen 12-fach vergrößerten L2-Cache (72 MB) steigerte die RTX 4090 ihre Leistung gegenüber dem Vorgänger oft um 60 bis 90 % – und wurde wegen ihrer 24 GB Speicher auch bei KI-Entwicklern extrem begehrt.'
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
