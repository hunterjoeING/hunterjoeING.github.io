export interface MapPoint {
  x: number;
  y: number;
}

export interface RiverPath {
  name: string;
  points: MapPoint[];
}

export interface LakePoly {
  name: string;
  points: MapPoint[];
}

export interface MountainCluster {
  name: string;
  peaks: Array<{ x: number; y: number; size: number; snow: boolean }>;
}

export interface ReliefZone {
  name: string;
  tier: 'high' | 'low';
  foothills: MapPoint[];
  ridge?: MapPoint[];
  snow?: MapPoint[];
}

export interface ForestZone {
  name: string;
  kind: 'conifer' | 'mixed';
  density: number; // trees per 10000 world-px²
  polygon: MapPoint[];
}

export interface CountryLabel {
  code: string;
  name: string;
  x: number;
  y: number;
}

export const MAP_BOUNDS = { w: 1800, h: 1420 };

// Detailed, coordinate-aligned Europe coastlines (1800x1420 world space matching europeMap.ts cities)
export const MAINLAND_EUROPE_POLY: MapPoint[] = [
  // Atlantic France (Brittany -> Normandy -> Channel)
  { x: 248, y: 966 }, // Finistère / Brest
  { x: 288, y: 942 }, // Saint-Malo
  { x: 342, y: 912 }, // Mont-Saint-Michel bay
  { x: 332, y: 874 }, // Cherbourg / Cotentin
  { x: 372, y: 878 }, // Caen
  { x: 418, y: 842 }, // Le Havre / Seine mouth
  { x: 454, y: 806 }, // Dieppe / Somme
  { x: 486, y: 766 }, // Calais / Cap Gris-Nez
  { x: 528, y: 750 }, // Dunkirk / Ostend
  { x: 562, y: 730 }, // Zeeland / Vlissingen
  { x: 574, y: 702 }, // Hoek van Holland / Rotterdam
  { x: 594, y: 668 }, // North Holland / Alkmaar
  { x: 616, y: 642 }, // Den Helder
  { x: 648, y: 636 }, // Friesland / Wadden coast
  { x: 704, y: 622 }, // Groningen / Ems estuary
  { x: 752, y: 600 }, // East Frisia / Wilhelmshaven
  { x: 808, y: 582 }, // Jade / Weser mouth
  { x: 842, y: 556 }, // Cuxhaven / Elbe mouth
  { x: 866, y: 522 }, // Dithmarschen
  { x: 862, y: 478 }, // North Frisia / Sylt
  { x: 834, y: 416 }, // Ribe
  { x: 830, y: 386 }, // Esbjerg
  { x: 838, y: 342 }, // Ringkøbing / Thyborøn
  { x: 862, y: 300 }, // Hanstholm
  { x: 894, y: 274 }, // Hirtshals / Skagen tip
  { x: 924, y: 308 }, // Frederikshavn
  { x: 930, y: 356 }, // Aalborg / Djursland
  { x: 918, y: 398 }, // Aarhus / Kolding
  { x: 930, y: 452 }, // Flensburg / Schleswig
  { x: 954, y: 486 }, // Kiel Bay
  { x: 974, y: 510 }, // Lübeck Bay
  { x: 1020, y: 498 }, // Wismar / Rostock
  { x: 1074, y: 488 }, // Stralsund / Vorpommern
  { x: 1138, y: 512 }, // Usedom / Szczecin Lagoon
  { x: 1212, y: 496 }, // Pomeranian coast
  { x: 1296, y: 488 }, // Hel / Gdansk Bay
  { x: 1362, y: 496 }, // Kaliningrad
  { x: 1425, y: 472 }, // Lithuania / Latvia
  { x: 1495, y: 498 }, // East Baltic edge
  { x: 1620, y: 540 }, // Eastern Europe NE
  { x: 1660, y: 760 }, // Eastern Europe E
  { x: 1610, y: 980 }, // Romania / Carpathians E
  { x: 1485, y: 1110 }, // Balkans
  { x: 1355, y: 1185 }, // Dalmatia coast
  { x: 1252, y: 1140 }, // Rijeka / Kvarner
  { x: 1215, y: 1170 }, // Istria tip
  { x: 1182, y: 1144 }, // Trieste Gulf
  { x: 1112, y: 1168 }, // Grado / Venice north
  { x: 1076, y: 1186 }, // Venice lagoon
  { x: 1084, y: 1214 }, // Po Delta
  { x: 1106, y: 1246 }, // Rimini / Ancona
  { x: 1148, y: 1294 }, // Pescara / Gargano
  { x: 1198, y: 1336 }, // Bari / Puglia heel
  { x: 1214, y: 1378 }, // Salento heel
  { x: 1172, y: 1368 }, // Gulf of Taranto
  { x: 1158, y: 1406 }, // Calabria toe
  { x: 1116, y: 1396 }, // Messina Strait
  { x: 1094, y: 1358 }, // Naples / Salerno
  { x: 1030, y: 1328 }, // Rome / Lazio coast
  { x: 986, y: 1284 }, // Grosseto / Tuscany
  { x: 952, y: 1236 }, // Pisa / Livorno
  { x: 892, y: 1192 }, // La Spezia / Genoa Gulf
  { x: 806, y: 1184 }, // Savona / Sanremo
  { x: 726, y: 1192 }, // Monaco / Menton
  { x: 668, y: 1198 }, // Nice / Côte d'Azur
  { x: 616, y: 1222 }, // Marseille / Rhône delta
  { x: 562, y: 1236 }, // Montpellier / Gulf of Lion
  { x: 544, y: 1266 }, // Perpignan / Pyrenees East
  { x: 526, y: 1318 }, // Barcelona / Catalonia
  { x: 486, y: 1378 }, // Valencia
  { x: 468, y: 1418 }, // SE Spain edge
  { x: 132, y: 1418 }, // Portugal south edge
  { x: 118, y: 1340 }, // Porto / Portugal coast
  { x: 124, y: 1272 }, // Galicia / A Coruña
  { x: 214, y: 1258 }, // Asturias / Cantabria
  { x: 312, y: 1262 }, // Bilbao / Basque coast
  { x: 354, y: 1250 }, // Biarritz / Bay of Biscay
  { x: 364, y: 1172 }, // Landes coast
  { x: 356, y: 1114 }, // Bordeaux / Gironde
  { x: 332, y: 1060 }, // La Rochelle
  { x: 296, y: 1018 }, // Nantes / Loire mouth
  { x: 256, y: 992 }   // Quimper / South Brittany
];

export const DENMARK_ZEALAND_POLY: MapPoint[] = [
  { x: 966, y: 428 },
  { x: 1014, y: 392 },
  { x: 1034, y: 410 },
  { x: 1030, y: 446 },
  { x: 992, y: 470 },
  { x: 964, y: 454 }
];

export const UK_POLY: MapPoint[] = [
  { x: 318, y: 354 }, // Cape Wrath / NW Highlands
  { x: 374, y: 348 }, // Caithness / John o' Groats
  { x: 364, y: 382 }, // Moray Firth inner
  { x: 406, y: 382 }, // Fraserburgh
  { x: 416, y: 422 }, // Aberdeen
  { x: 394, y: 458 }, // Dundee / Firth of Tay
  { x: 384, y: 472 }, // Edinburgh / Firth of Forth
  { x: 414, y: 492 }, // Berwick
  { x: 428, y: 540 }, // Newcastle / Tyne
  { x: 446, y: 582 }, // Yorkshire coast
  { x: 452, y: 618 }, // Humber / Hull
  { x: 462, y: 650 }, // The Wash
  { x: 484, y: 678 }, // Norfolk / East Anglia
  { x: 474, y: 722 }, // Essex / Suffolk
  { x: 446, y: 740 }, // Thames Estuary
  { x: 472, y: 754 }, // Dover / Kent
  { x: 424, y: 774 }, // Brighton / Sussex
  { x: 376, y: 778 }, // Southampton / Isle of Wight
  { x: 326, y: 786 }, // Devon / Plymouth
  { x: 274, y: 794 }, // Cornwall / Land's End
  { x: 304, y: 756 }, // Bristol Channel south
  { x: 332, y: 740 }, // Bristol / Severn
  { x: 294, y: 726 }, // Pembrokeshire / South Wales
  { x: 312, y: 682 }, // Cardigan Bay
  { x: 306, y: 650 }, // Anglesey / North Wales
  { x: 336, y: 636 }, // Liverpool / Mersey
  { x: 332, y: 586 }, // Lancashire / Cumbria
  { x: 318, y: 542 }, // Dumfries / Galloway
  { x: 316, y: 492 }, // Ayrshire / Firth of Clyde
  { x: 296, y: 448 }, // Argyll / Mull
  { x: 298, y: 396 }  // Skye / West Highlands
];

export const IRELAND_POLY: MapPoint[] = [
  { x: 204, y: 536 }, // Donegal
  { x: 256, y: 540 }, // Antrim / Belfast
  { x: 266, y: 586 }, // Dundalk
  { x: 258, y: 632 }, // Dublin
  { x: 254, y: 684 }, // Wexford
  { x: 214, y: 714 }, // Cork
  { x: 170, y: 712 }, // Kerry
  { x: 176, y: 662 }, // Shannon / Clare
  { x: 168, y: 614 }, // Galway / Mayo
  { x: 184, y: 566 }  // Sligo
];

export const SCANDINAVIA_POLY: MapPoint[] = [
  { x: 912, y: 248 }, // Stavanger
  { x: 920, y: 206 }, // Haugesund
  { x: 928, y: 176 }, // Bergen / West Fjords
  { x: 946, y: 150 }, // Ålesund
  { x: 980, y: 146 }, // Trondheim Fjord
  { x: 1014, y: 122 }, // Namsos
  { x: 1054, y: 104 }, // Bodø
  { x: 1094, y: 82 },  // Lofoten / Narvik approach
  { x: 1138, y: 66 },  // Tromsø
  { x: 1194, y: 44 },  // Hammerfest
  { x: 1248, y: 26 },  // Nordkapp
  { x: 1320, y: 36 },  // Varanger
  { x: 1388, y: 56 },  // Lapland / Finland N
  { x: 1404, y: 140 }, // Lapland E
  { x: 1344, y: 196 }, // Gulf of Bothnia N
  { x: 1278, y: 238 }, // Umeå
  { x: 1230, y: 274 }, // Sundsvall
  { x: 1226, y: 332 }, // Gävle / Uppsala
  { x: 1220, y: 368 }, // Stockholm archipelago
  { x: 1184, y: 406 }, // Kalmar
  { x: 1144, y: 432 }, // Karlskrona
  { x: 1104, y: 434 }, // Malmö / Skåne
  { x: 1068, y: 392 }, // Helsingborg / Halmstad
  { x: 1012, y: 318 }, // Gothenburg
  { x: 992, y: 276 },  // Uddevalla / Bohuslän
  { x: 974, y: 248 },  // Oslo Fjord east
  { x: 960, y: 258 },  // Oslo Fjord west
  { x: 938, y: 270 }   // Kristiansand
];

export const SICILY_POLY: MapPoint[] = [
  { x: 1016, y: 1384 },
  { x: 1098, y: 1378 },
  { x: 1092, y: 1404 },
  { x: 1064, y: 1414 },
  { x: 1018, y: 1400 }
];

export const SARDINIA_CORSICA_POLYS: MapPoint[][] = [
  // Corsica
  [
    { x: 862, y: 1236 },
    { x: 878, y: 1246 },
    { x: 876, y: 1292 },
    { x: 856, y: 1292 },
    { x: 852, y: 1258 }
  ],
  // Sardinia
  [
    { x: 848, y: 1308 },
    { x: 882, y: 1306 },
    { x: 884, y: 1352 },
    { x: 874, y: 1384 },
    { x: 844, y: 1380 },
    { x: 840, y: 1336 }
  ]
];

export const EXTRA_ISLAND_POLYS: MapPoint[][] = [
  // Funen (Fyn, Denmark)
  [
    { x: 928, y: 416 },
    { x: 954, y: 414 },
    { x: 958, y: 444 },
    { x: 932, y: 446 }
  ],
  // Rügen (Germany)
  [
    { x: 1084, y: 470 },
    { x: 1104, y: 472 },
    { x: 1100, y: 488 },
    { x: 1082, y: 486 }
  ],
  // Bornholm (Denmark)
  [
    { x: 1148, y: 460 },
    { x: 1164, y: 462 },
    { x: 1160, y: 474 },
    { x: 1146, y: 472 }
  ],
  // Gotland (Sweden)
  [
    { x: 1238, y: 382 },
    { x: 1254, y: 378 },
    { x: 1250, y: 432 },
    { x: 1234, y: 428 }
  ],
  // Mallorca (Balearics)
  [
    { x: 544, y: 1368 },
    { x: 572, y: 1362 },
    { x: 568, y: 1384 },
    { x: 540, y: 1382 }
  ],
  // Isle of Man
  [
    { x: 294, y: 588 },
    { x: 306, y: 584 },
    { x: 304, y: 604 },
    { x: 292, y: 602 }
  ]
];

export const LAKES: LakePoly[] = [
  // Bodensee (Lake Constance)
  {
    name: 'Bodensee',
    points: [
      { x: 848, y: 1016 },
      { x: 878, y: 1020 },
      { x: 882, y: 1030 },
      { x: 852, y: 1026 }
    ]
  },
  // Genfersee (Lake Geneva)
  {
    name: 'Genfersee',
    points: [
      { x: 730, y: 1068 },
      { x: 760, y: 1062 },
      { x: 764, y: 1072 },
      { x: 734, y: 1076 }
    ]
  },
  // Gardasee (Lake Garda)
  {
    name: 'Gardasee',
    points: [
      { x: 966, y: 1152 },
      { x: 976, y: 1152 },
      { x: 974, y: 1178 },
      { x: 962, y: 1176 }
    ]
  },
  // IJsselmeer
  {
    name: 'IJsselmeer',
    points: [
      { x: 622, y: 650 },
      { x: 644, y: 654 },
      { x: 640, y: 676 },
      { x: 622, y: 672 }
    ]
  },
  // Vänern (Sweden)
  {
    name: 'Vänern',
    points: [
      { x: 1044, y: 274 },
      { x: 1076, y: 270 },
      { x: 1072, y: 302 },
      { x: 1040, y: 298 }
    ]
  },
  // Vättern (Sweden)
  {
    name: 'Vättern',
    points: [
      { x: 1102, y: 296 },
      { x: 1114, y: 296 },
      { x: 1110, y: 338 },
      { x: 1098, y: 336 }
    ]
  }
];

export const RIVERS: RiverPath[] = [
  {
    name: 'Rhein',
    points: [
      { x: 862, y: 1074 },
      { x: 858, y: 1024 },
      { x: 786, y: 996 },
      { x: 794, y: 938 },
      { x: 798, y: 888 },
      { x: 762, y: 842 },
      { x: 732, y: 794 },
      { x: 700, y: 748 },
      { x: 652, y: 714 },
      { x: 576, y: 702 }
    ]
  },
  {
    name: 'Weser',
    points: [
      { x: 888, y: 762 },
      { x: 880, y: 710 },
      { x: 874, y: 648 },
      { x: 856, y: 586 },
      { x: 822, y: 568 }
    ]
  },
  {
    name: 'Elbe',
    points: [
      { x: 1200, y: 820 },
      { x: 1142, y: 774 },
      { x: 1072, y: 696 },
      { x: 992, y: 608 },
      { x: 922, y: 548 },
      { x: 844, y: 554 }
    ]
  },
  {
    name: 'Oder',
    points: [
      { x: 1270, y: 830 },
      { x: 1218, y: 740 },
      { x: 1188, y: 646 },
      { x: 1168, y: 568 },
      { x: 1144, y: 514 }
    ]
  },
  {
    name: 'Donau',
    points: [
      { x: 828, y: 990 },
      { x: 922, y: 980 },
      { x: 1038, y: 970 },
      { x: 1148, y: 996 },
      { x: 1265, y: 1024 },
      { x: 1385, y: 1046 },
      { x: 1510, y: 1084 }
    ]
  },
  {
    name: 'Seine',
    points: [
      { x: 604, y: 958 },
      { x: 504, y: 912 },
      { x: 458, y: 874 },
      { x: 420, y: 842 }
    ]
  },
  {
    name: 'Loire',
    points: [
      { x: 542, y: 1084 },
      { x: 486, y: 1018 },
      { x: 398, y: 1004 },
      { x: 298, y: 1018 }
    ]
  },
  {
    name: 'Rhône',
    points: [
      { x: 742, y: 1070 },
      { x: 642, y: 1078 },
      { x: 586, y: 1086 },
      { x: 598, y: 1152 },
      { x: 616, y: 1220 }
    ]
  },
  {
    name: 'Po',
    points: [
      { x: 774, y: 1166 },
      { x: 868, y: 1170 },
      { x: 984, y: 1186 },
      { x: 1082, y: 1206 }
    ]
  },
  {
    name: 'Themse',
    points: [
      { x: 354, y: 740 },
      { x: 410, y: 744 },
      { x: 452, y: 740 }
    ]
  }
];

// Layered relief zones: high mountains (brown -> grey -> white snow) & low mountain ranges (lighter brown/tan)
export const RELIEF_ZONES: ReliefZone[] = [
  // === HIGH MOUNTAIN RANGES (Brown foothills -> Grey rocky ridge -> White snow cap) ===
  {
    name: 'Alpen',
    tier: 'high',
    foothills: [
      { x: 690, y: 1164 },
      { x: 718, y: 1088 },
      { x: 786, y: 1044 },
      { x: 882, y: 1038 },
      { x: 998, y: 1042 },
      { x: 1138, y: 1038 },
      { x: 1196, y: 1076 },
      { x: 1162, y: 1126 },
      { x: 1054, y: 1142 },
      { x: 938, y: 1144 },
      { x: 822, y: 1136 },
      { x: 734, y: 1172 }
    ],
    ridge: [
      { x: 712, y: 1144 },
      { x: 746, y: 1094 },
      { x: 814, y: 1064 },
      { x: 904, y: 1062 },
      { x: 1004, y: 1066 },
      { x: 1124, y: 1064 },
      { x: 1152, y: 1096 },
      { x: 1076, y: 1122 },
      { x: 956, y: 1124 },
      { x: 842, y: 1116 },
      { x: 754, y: 1144 }
    ],
    snow: [
      { x: 738, y: 1114 },
      { x: 782, y: 1084 },
      { x: 846, y: 1076 },
      { x: 924, y: 1082 },
      { x: 1018, y: 1082 },
      { x: 1106, y: 1082 },
      { x: 1098, y: 1100 },
      { x: 1002, y: 1102 },
      { x: 908, y: 1102 },
      { x: 832, y: 1098 },
      { x: 766, y: 1118 }
    ]
  },
  {
    name: 'Pyrenäen',
    tier: 'high',
    foothills: [
      { x: 352, y: 1262 },
      { x: 432, y: 1244 },
      { x: 544, y: 1254 },
      { x: 542, y: 1296 },
      { x: 440, y: 1296 },
      { x: 356, y: 1292 }
    ],
    ridge: [
      { x: 374, y: 1266 },
      { x: 444, y: 1258 },
      { x: 528, y: 1264 },
      { x: 524, y: 1284 },
      { x: 442, y: 1284 },
      { x: 378, y: 1282 }
    ],
    snow: [
      { x: 404, y: 1268 },
      { x: 458, y: 1266 },
      { x: 506, y: 1270 },
      { x: 500, y: 1278 },
      { x: 452, y: 1278 },
      { x: 406, y: 1276 }
    ]
  },
  {
    name: 'Skanden',
    tier: 'high',
    foothills: [
      { x: 930, y: 234 },
      { x: 954, y: 162 },
      { x: 1018, y: 116 },
      { x: 1110, y: 74 },
      { x: 1228, y: 42 },
      { x: 1266, y: 62 },
      { x: 1172, y: 104 },
      { x: 1076, y: 152 },
      { x: 1004, y: 204 },
      { x: 960, y: 244 }
    ],
    ridge: [
      { x: 944, y: 218 },
      { x: 974, y: 160 },
      { x: 1040, y: 118 },
      { x: 1134, y: 78 },
      { x: 1226, y: 50 },
      { x: 1236, y: 64 },
      { x: 1152, y: 98 },
      { x: 1058, y: 140 },
      { x: 986, y: 188 }
    ],
    snow: [
      { x: 966, y: 188 },
      { x: 1020, y: 140 },
      { x: 1114, y: 92 },
      { x: 1206, y: 58 },
      { x: 1212, y: 66 },
      { x: 1126, y: 100 },
      { x: 1032, y: 148 },
      { x: 976, y: 194 }
    ]
  },

  // === LOW MOUNTAIN RANGES / MITTELGEBIRGE (Lighter foothills + gentle ridge) ===
  {
    name: 'Sauerland & Kasseler Berge',
    tier: 'low',
    foothills: [
      { x: 748, y: 784 },
      { x: 806, y: 758 },
      { x: 878, y: 748 },
      { x: 902, y: 794 },
      { x: 834, y: 822 },
      { x: 758, y: 816 }
    ],
    ridge: [
      { x: 774, y: 786 },
      { x: 828, y: 774 },
      { x: 872, y: 772 },
      { x: 856, y: 798 },
      { x: 786, y: 802 }
    ]
  },
  {
    name: 'Harz',
    tier: 'low',
    foothills: [
      { x: 900, y: 716 },
      { x: 954, y: 712 },
      { x: 968, y: 742 },
      { x: 912, y: 748 }
    ],
    ridge: [
      { x: 916, y: 724 },
      { x: 948, y: 722 },
      { x: 950, y: 736 },
      { x: 920, y: 738 }
    ]
  },
  {
    name: 'Eifel & Ardennen',
    tier: 'low',
    foothills: [
      { x: 618, y: 836 },
      { x: 686, y: 818 },
      { x: 740, y: 842 },
      { x: 722, y: 878 },
      { x: 642, y: 878 },
      { x: 612, y: 858 }
    ],
    ridge: [
      { x: 646, y: 842 },
      { x: 706, y: 838 },
      { x: 712, y: 862 },
      { x: 652, y: 864 }
    ]
  },
  {
    name: 'Schwarzwald & Vogesen',
    tier: 'low',
    foothills: [
      { x: 736, y: 924 },
      { x: 828, y: 926 },
      { x: 842, y: 996 },
      { x: 788, y: 1004 },
      { x: 734, y: 984 }
    ],
    ridge: [
      { x: 794, y: 944 },
      { x: 822, y: 948 },
      { x: 824, y: 986 },
      { x: 796, y: 988 }
    ]
  },
  {
    name: 'Schwäbische Alb & Bayerischer Wald',
    tier: 'low',
    foothills: [
      { x: 862, y: 952 },
      { x: 942, y: 944 },
      { x: 956, y: 978 },
      { x: 874, y: 990 }
    ]
  },
  {
    name: 'Bayerischer Wald & Erzgebirge',
    tier: 'low',
    foothills: [
      { x: 1044, y: 910 },
      { x: 1094, y: 804 },
      { x: 1178, y: 784 },
      { x: 1188, y: 824 },
      { x: 1134, y: 922 },
      { x: 1120, y: 982 },
      { x: 1060, y: 972 }
    ],
    ridge: [
      { x: 1084, y: 916 },
      { x: 1114, y: 818 },
      { x: 1164, y: 804 },
      { x: 1110, y: 954 }
    ]
  },
  {
    name: 'Massif Central',
    tier: 'low',
    foothills: [
      { x: 468, y: 1068 },
      { x: 554, y: 1054 },
      { x: 576, y: 1126 },
      { x: 536, y: 1178 },
      { x: 462, y: 1164 },
      { x: 446, y: 1112 }
    ],
    ridge: [
      { x: 492, y: 1088 },
      { x: 544, y: 1086 },
      { x: 546, y: 1142 },
      { x: 488, y: 1140 }
    ]
  },
  {
    name: 'Apenninen',
    tier: 'low',
    foothills: [
      { x: 896, y: 1200 },
      { x: 966, y: 1212 },
      { x: 1044, y: 1258 },
      { x: 1116, y: 1320 },
      { x: 1164, y: 1378 },
      { x: 1132, y: 1386 },
      { x: 1076, y: 1328 },
      { x: 1004, y: 1272 },
      { x: 932, y: 1226 }
    ]
  },
  {
    name: 'Scottish Highlands',
    tier: 'low',
    foothills: [
      { x: 308, y: 374 },
      { x: 386, y: 374 },
      { x: 394, y: 442 },
      { x: 320, y: 454 }
    ],
    ridge: [
      { x: 326, y: 390 },
      { x: 370, y: 388 },
      { x: 372, y: 428 },
      { x: 330, y: 432 }
    ]
  },
  {
    name: 'Karpaten',
    tier: 'low',
    foothills: [
      { x: 1336, y: 874 },
      { x: 1474, y: 892 },
      { x: 1554, y: 974 },
      { x: 1492, y: 1044 },
      { x: 1412, y: 972 },
      { x: 1326, y: 916 }
    ],
    ridge: [
      { x: 1364, y: 892 },
      { x: 1466, y: 912 },
      { x: 1518, y: 980 },
      { x: 1478, y: 1012 },
      { x: 1424, y: 944 }
    ]
  }
];

export const MOUNTAIN_CLUSTERS: MountainCluster[] = [
  {
    name: 'Alpen',
    peaks: [
      { x: 744, y: 1118, size: 15, snow: true },
      { x: 786, y: 1088, size: 17, snow: true },
      { x: 834, y: 1076, size: 18, snow: true },
      { x: 882, y: 1084, size: 17, snow: true },
      { x: 934, y: 1088, size: 17, snow: true },
      { x: 986, y: 1084, size: 18, snow: true },
      { x: 1042, y: 1080, size: 16, snow: true },
      { x: 1098, y: 1084, size: 15, snow: true },
      { x: 1142, y: 1090, size: 13, snow: true }
    ]
  },
  {
    name: 'Pyrenäen',
    peaks: [
      { x: 392, y: 1274, size: 12, snow: true },
      { x: 432, y: 1270, size: 14, snow: true },
      { x: 472, y: 1272, size: 14, snow: true },
      { x: 510, y: 1274, size: 12, snow: true }
    ]
  },
  {
    name: 'Sauerland & Kasseler Berge',
    peaks: [
      { x: 778, y: 788, size: 8, snow: false },
      { x: 818, y: 794, size: 9, snow: false },
      { x: 866, y: 774, size: 9, snow: false },
      { x: 928, y: 730, size: 10, snow: false } // Harz / Brocken
    ]
  },
  {
    name: 'Eifel & Ardennen',
    peaks: [
      { x: 656, y: 850, size: 8, snow: false },
      { x: 698, y: 848, size: 8, snow: false }
    ]
  },
  {
    name: 'Schwarzwald & Schwäbische Alb',
    peaks: [
      { x: 806, y: 966, size: 10, snow: false },
      { x: 896, y: 970, size: 9, snow: false }
    ]
  },
  {
    name: 'Bayerischer Wald & Erzgebirge',
    peaks: [
      { x: 1094, y: 942, size: 9, snow: false },
      { x: 1136, y: 816, size: 9, snow: false }
    ]
  },
  {
    name: 'Massif Central',
    peaks: [
      { x: 504, y: 1108, size: 10, snow: false },
      { x: 534, y: 1134, size: 9, snow: false }
    ]
  },
  {
    name: 'Scottish Highlands',
    peaks: [
      { x: 342, y: 418, size: 11, snow: false },
      { x: 368, y: 392, size: 12, snow: true }
    ]
  },
  {
    name: 'Skandinavisches Gebirge',
    peaks: [
      { x: 972, y: 184, size: 14, snow: true },
      { x: 1028, y: 140, size: 15, snow: true },
      { x: 1106, y: 98, size: 15, snow: true },
      { x: 1188, y: 66, size: 14, snow: true }
    ]
  }
];

// Large forests & national parks rendered as clustered green pixel-art trees
export const FOREST_ZONES: ForestZone[] = [
  {
    name: 'Schwarzwald',
    kind: 'conifer',
    density: 26,
    polygon: [
      { x: 788, y: 932 },
      { x: 836, y: 934 },
      { x: 840, y: 998 },
      { x: 790, y: 996 }
    ]
  },
  {
    name: 'Pfälzerwald & Vogesen',
    kind: 'mixed',
    density: 22,
    polygon: [
      { x: 722, y: 894 },
      { x: 774, y: 896 },
      { x: 772, y: 974 },
      { x: 724, y: 966 }
    ]
  },
  {
    name: 'Eifel & Ardennen Nationalpark',
    kind: 'mixed',
    density: 20,
    polygon: [
      { x: 618, y: 822 },
      { x: 706, y: 814 },
      { x: 726, y: 874 },
      { x: 626, y: 876 }
    ]
  },
  {
    name: 'Sauerland & Teutoburger Wald',
    kind: 'mixed',
    density: 18,
    polygon: [
      { x: 760, y: 748 },
      { x: 848, y: 724 },
      { x: 862, y: 806 },
      { x: 762, y: 814 }
    ]
  },
  {
    name: 'Harz & Thüringer Wald',
    kind: 'conifer',
    density: 24,
    polygon: [
      { x: 902, y: 708 },
      { x: 996, y: 724 },
      { x: 1004, y: 848 },
      { x: 912, y: 836 }
    ]
  },
  {
    name: 'Lüneburger Heide & Wendland',
    kind: 'mixed',
    density: 16,
    polygon: [
      { x: 904, y: 582 },
      { x: 1010, y: 576 },
      { x: 1018, y: 636 },
      { x: 912, y: 638 }
    ]
  },
  {
    name: 'Müritz & Brandenburger Wälder',
    kind: 'conifer',
    density: 20,
    polygon: [
      { x: 1036, y: 534 },
      { x: 1184, y: 540 },
      { x: 1192, y: 642 },
      { x: 1048, y: 624 }
    ]
  },
  {
    name: 'Bayerischer Wald & Böhmerwald',
    kind: 'conifer',
    density: 26,
    polygon: [
      { x: 1046, y: 906 },
      { x: 1140, y: 886 },
      { x: 1152, y: 988 },
      { x: 1062, y: 992 }
    ]
  },
  {
    name: 'Spessart & Odenwald',
    kind: 'mixed',
    density: 18,
    polygon: [
      { x: 822, y: 868 },
      { x: 902, y: 864 },
      { x: 906, y: 922 },
      { x: 824, y: 922 }
    ]
  },
  {
    name: 'Landes / Gascogne Forest',
    kind: 'conifer',
    density: 20,
    polygon: [
      { x: 360, y: 1132 },
      { x: 432, y: 1136 },
      { x: 428, y: 1228 },
      { x: 362, y: 1230 }
    ]
  },
  {
    name: 'Morvan & Ostfrankreich',
    kind: 'mixed',
    density: 15,
    polygon: [
      { x: 562, y: 944 },
      { x: 682, y: 938 },
      { x: 688, y: 1034 },
      { x: 568, y: 1032 }
    ]
  },
  {
    name: 'Skandinavische Taiga',
    kind: 'conifer',
    density: 22,
    polygon: [
      { x: 1046, y: 174 },
      { x: 1262, y: 144 },
      { x: 1212, y: 344 },
      { x: 1054, y: 356 },
      { x: 1020, y: 248 }
    ]
  },
  {
    name: 'Polnische Urwälder & Pommern',
    kind: 'mixed',
    density: 18,
    polygon: [
      { x: 1214, y: 528 },
      { x: 1468, y: 540 },
      { x: 1492, y: 696 },
      { x: 1232, y: 682 }
    ]
  },
  {
    name: 'Cairngorms National Park',
    kind: 'conifer',
    density: 18,
    polygon: [
      { x: 332, y: 396 },
      { x: 396, y: 396 },
      { x: 392, y: 446 },
      { x: 334, y: 448 }
    ]
  },
  {
    name: 'Österreichische & Slowenische Wälder',
    kind: 'conifer',
    density: 20,
    polygon: [
      { x: 1134, y: 1024 },
      { x: 1290, y: 1032 },
      { x: 1296, y: 1122 },
      { x: 1144, y: 1126 }
    ]
  }
];

export const COUNTRY_BORDERS: MapPoint[][] = [
  // DE - NL / BE / LU / FR border
  [
    { x: 716, y: 622 },
    { x: 696, y: 676 },
    { x: 682, y: 734 },
    { x: 672, y: 786 },
    { x: 676, y: 824 },
    { x: 692, y: 874 },
    { x: 722, y: 904 },
    { x: 774, y: 924 },
    { x: 786, y: 994 }
  ],
  // DE - DK border
  [
    { x: 862, y: 468 },
    { x: 928, y: 460 }
  ],
  // DE - CH / AT border
  [
    { x: 786, y: 994 },
    { x: 848, y: 1018 },
    { x: 882, y: 1028 },
    { x: 954, y: 1064 },
    { x: 1046, y: 1056 },
    { x: 1094, y: 1016 },
    { x: 1128, y: 1004 }
  ],
  // DE - CZ / PL border
  [
    { x: 1128, y: 1004 },
    { x: 1076, y: 912 },
    { x: 1086, y: 828 },
    { x: 1156, y: 786 },
    { x: 1192, y: 710 },
    { x: 1178, y: 604 },
    { x: 1144, y: 514 }
  ],
  // NL - BE border
  [
    { x: 562, y: 732 },
    { x: 612, y: 744 },
    { x: 672, y: 780 }
  ],
  // FR - BE / LU border
  [
    { x: 526, y: 752 },
    { x: 582, y: 806 },
    { x: 644, y: 844 },
    { x: 688, y: 884 }
  ],
  // FR - CH / IT border
  [
    { x: 786, y: 994 },
    { x: 736, y: 1064 },
    { x: 724, y: 1138 },
    { x: 728, y: 1190 }
  ],
  // FR - ES (Pyrenees) border
  [
    { x: 356, y: 1252 },
    { x: 442, y: 1266 },
    { x: 542, y: 1266 }
  ],
  // CH - AT border
  [
    { x: 884, y: 1030 },
    { x: 912, y: 1078 },
    { x: 938, y: 1100 }
  ],
  // CH / AT - IT border
  [
    { x: 732, y: 1112 },
    { x: 836, y: 1112 },
    { x: 944, y: 1106 },
    { x: 1038, y: 1116 },
    { x: 1144, y: 1124 },
    { x: 1180, y: 1142 }
  ],
  // AT - CZ / HU / SI border
  [
    { x: 1128, y: 1004 },
    { x: 1244, y: 1008 },
    { x: 1266, y: 1072 },
    { x: 1208, y: 1126 },
    { x: 1144, y: 1124 }
  ],
  // NO - SE border
  [
    { x: 992, y: 274 },
    { x: 1018, y: 204 },
    { x: 1044, y: 144 },
    { x: 1118, y: 96 },
    { x: 1196, y: 66 }
  ],
  // SE - FI border
  [
    { x: 1196, y: 66 },
    { x: 1272, y: 112 },
    { x: 1338, y: 188 }
  ],
  // UK - IE (Northern Ireland) border
  [
    { x: 212, y: 544 },
    { x: 228, y: 576 },
    { x: 256, y: 584 }
  ]
];

export const COUNTRY_LABELS: CountryLabel[] = [
  { code: 'DE', name: 'DEUTSCHLAND', x: 935, y: 788 },
  { code: 'NL', name: 'NL', x: 626, y: 696 },
  { code: 'BE', name: 'BE', x: 594, y: 810 },
  { code: 'FR', name: 'FRANKREICH', x: 472, y: 996 },
  { code: 'ES', name: 'SPANIEN', x: 356, y: 1352 },
  { code: 'CH', name: 'CH', x: 822, y: 1048 },
  { code: 'AT', name: 'ÖSTERREICH', x: 1142, y: 1068 },
  { code: 'IT', name: 'ITALIEN', x: 1014, y: 1252 },
  { code: 'CZ', name: 'CZ', x: 1188, y: 882 },
  { code: 'PL', name: 'POLEN', x: 1344, y: 684 },
  { code: 'DK', name: 'DK', x: 886, y: 364 },
  { code: 'NO', name: 'NORWEGEN', x: 996, y: 174 },
  { code: 'SE', name: 'SCHWEDEN', x: 1164, y: 266 },
  { code: 'UK', name: 'UK', x: 386, y: 664 },
  { code: 'IE', name: 'IRLAND', x: 214, y: 644 }
];
