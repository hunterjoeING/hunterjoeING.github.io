export interface MapPoint {
  x: number;
  y: number;
}

export interface RiverPath {
  name: string;
  points: MapPoint[];
}

export interface MountainCluster {
  name: string;
  peaks: Array<{ x: number; y: number; size: number; snow: boolean }>;
}

export interface CountryLabel {
  code: string;
  name: string;
  x: number;
  y: number;
}

export const MAP_BOUNDS = { w: 1800, h: 1420 };

// Detailed pixel-friendly polygon coastlines in 1800x1420 world coordinates
export const MAINLAND_EUROPE_POLY: MapPoint[] = [
  { x: 255, y: 970 }, // Brittany west
  { x: 340, y: 880 }, // Normandy
  { x: 430, y: 830 }, // Le Havre
  { x: 495, y: 775 }, // Calais
  { x: 565, y: 735 }, // Ostend
  { x: 580, y: 700 }, // Zeeland / Rotterdam
  { x: 615, y: 660 }, // North Holland
  { x: 665, y: 635 }, // Friesland
  { x: 760, y: 605 }, // Emden / Wilhelmshaven
  { x: 845, y: 560 }, // Cuxhaven / Elbe mouth
  { x: 865, y: 495 }, // Schleswig west coast
  { x: 835, y: 390 }, // Esbjerg
  { x: 855, y: 315 }, // Thyborøn
  { x: 895, y: 278 }, // Hirtshals / Skagen tip
  { x: 932, y: 325 }, // Frederikshavn / Aalborg
  { x: 935, y: 415 }, // Aarhus / Kolding east
  { x: 955, y: 495 }, // Kiel / Lübeck bay
  { x: 1050, y: 500 }, // Rostock / Rügen
  { x: 1185, y: 515 }, // Szczecin / Baltic
  { x: 1350, y: 495 }, // Gdansk
  { x: 1490, y: 520 }, // East Baltic edge
  { x: 1520, y: 920 }, // Central/Eastern Europe edge
  { x: 1390, y: 1030 }, // Hungary / Balkans edge
  { x: 1245, y: 1125 }, // Trieste / Croatia coast
  { x: 1110, y: 1175 }, // Venice lagoon
  { x: 1115, y: 1245 }, // Rimini / Ancona
  { x: 1175, y: 1320 }, // Bari / Puglia
  { x: 1155, y: 1395 }, // Calabria toe
  { x: 1065, y: 1390 }, // Naples / Salerno
  { x: 1015, y: 1315 }, // Rome / Lazio
  { x: 955, y: 1235 }, // Tuscany / Livorno
  { x: 885, y: 1190 }, // Genoa Gulf
  { x: 745, y: 1205 }, // Nice / Côte d'Azur
  { x: 645, y: 1225 }, // Marseille
  { x: 540, y: 1265 }, // Perpignan / Pyrenees
  { x: 350, y: 1260 }, // Basque / Bay of Biscay
  { x: 365, y: 1110 }, // Bordeaux coast
  { x: 295, y: 1030 }  // Nantes / Atlantic
];

export const DENMARK_ZEALAND_POLY: MapPoint[] = [
  { x: 965, y: 435 },
  { x: 1030, y: 400 },
  { x: 1045, y: 455 },
  { x: 990, y: 475 }
];

export const UK_POLY: MapPoint[] = [
  { x: 325, y: 360 }, // Scottish Highlands North
  { x: 395, y: 355 }, // Moray Firth
  { x: 420, y: 430 }, // Aberdeen
  { x: 390, y: 470 }, // Edinburgh Firth of Forth
  { x: 430, y: 545 }, // Newcastle
  { x: 455, y: 620 }, // Humber / Hull
  { x: 475, y: 695 }, // East Anglia
  { x: 465, y: 750 }, // Dover / Kent
  { x: 360, y: 775 }, // Southampton / Cornwall approach
  { x: 280, y: 790 }, // Land's End
  { x: 315, y: 715 }, // Wales / Cardiff
  { x: 325, y: 635 }, // Liverpool / Manchester
  { x: 335, y: 555 }, // Lake District
  { x: 310, y: 465 }  // Glasgow / West Scotland
];

export const IRELAND_POLY: MapPoint[] = [
  { x: 205, y: 550 },
  { x: 265, y: 560 },
  { x: 260, y: 695 },
  { x: 185, y: 715 },
  { x: 175, y: 615 }
];

export const SCANDINAVIA_POLY: MapPoint[] = [
  { x: 915, y: 245 }, // Stavanger / SW Norway
  { x: 935, y: 175 }, // Bergen / West Fjords
  { x: 985, y: 130 }, // Trondheim Fjord
  { x: 1070, y: 95 },  // Bodø / Lofoten
  { x: 1145, y: 55 },  // Tromsø
  { x: 1245, y: 25 },  // Nordkapp
  { x: 1365, y: 50 },  // Kirkenes / Lapland
  { x: 1340, y: 195 }, // Gulf of Bothnia North
  { x: 1225, y: 270 }, // Sundsvall
  { x: 1215, y: 365 }, // Stockholm
  { x: 1110, y: 430 }, // Malmö / Skåne
  { x: 1035, y: 350 }, // Gothenburg
  { x: 985, y: 255 },  // Oslo Fjord
  { x: 945, y: 265 }   // Kristiansand
];

export const SICILY_POLY: MapPoint[] = [
  { x: 1020, y: 1385 },
  { x: 1095, y: 1380 },
  { x: 1080, y: 1412 },
  { x: 1015, y: 1405 }
];

export const SARDINIA_CORSICA_POLYS: MapPoint[][] = [
  [
    { x: 855, y: 1245 },
    { x: 882, y: 1245 },
    { x: 878, y: 1295 },
    { x: 850, y: 1290 }
  ],
  [
    { x: 845, y: 1308 },
    { x: 885, y: 1308 },
    { x: 880, y: 1382 },
    { x: 840, y: 1378 }
  ]
];

export const RIVERS: RiverPath[] = [
  {
    name: 'Rhein',
    points: [
      { x: 855, y: 1070 },
      { x: 815, y: 1015 },
      { x: 785, y: 985 },
      { x: 795, y: 905 },
      { x: 755, y: 845 },
      { x: 730, y: 795 },
      { x: 695, y: 745 },
      { x: 640, y: 705 },
      { x: 585, y: 700 }
    ]
  },
  {
    name: 'Elbe',
    points: [
      { x: 1180, y: 815 },
      { x: 1135, y: 770 },
      { x: 1065, y: 690 },
      { x: 985, y: 605 },
      { x: 920, y: 550 },
      { x: 855, y: 545 }
    ]
  },
  {
    name: 'Donau',
    points: [
      { x: 830, y: 990 },
      { x: 925, y: 980 },
      { x: 1045, y: 970 },
      { x: 1165, y: 1005 },
      { x: 1290, y: 1020 },
      { x: 1410, y: 1060 }
    ]
  },
  {
    name: 'Seine',
    points: [
      { x: 600, y: 955 },
      { x: 500, y: 910 },
      { x: 430, y: 835 }
    ]
  },
  {
    name: 'Po',
    points: [
      { x: 775, y: 1175 },
      { x: 875, y: 1175 },
      { x: 985, y: 1185 },
      { x: 1085, y: 1190 }
    ]
  },
  {
    name: 'Rhône',
    points: [
      { x: 740, y: 1065 },
      { x: 585, y: 1085 },
      { x: 615, y: 1205 }
    ]
  }
];

export const MOUNTAIN_CLUSTERS: MountainCluster[] = [
  {
    name: 'Alpen',
    peaks: [
      { x: 750, y: 1110, size: 15, snow: true },
      { x: 795, y: 1085, size: 17, snow: true },
      { x: 845, y: 1075, size: 18, snow: true },
      { x: 895, y: 1085, size: 16, snow: true },
      { x: 945, y: 1090, size: 17, snow: true },
      { x: 995, y: 1085, size: 17, snow: true },
      { x: 1055, y: 1075, size: 15, snow: true },
      { x: 1115, y: 1085, size: 14, snow: true }
    ]
  },
  {
    name: 'Sauerland & Kasseler Berge',
    peaks: [
      { x: 775, y: 785, size: 9, snow: false },
      { x: 810, y: 795, size: 10, snow: false },
      { x: 865, y: 770, size: 10, snow: false },
      { x: 925, y: 735, size: 11, snow: false } // Harz
    ]
  },
  {
    name: 'Eifel & Ardennen',
    peaks: [
      { x: 665, y: 845, size: 9, snow: false },
      { x: 705, y: 845, size: 9, snow: false }
    ]
  },
  {
    name: 'Schwarzwald & Schwäbische Alb',
    peaks: [
      { x: 805, y: 970, size: 10, snow: false },
      { x: 895, y: 975, size: 10, snow: false }
    ]
  },
  {
    name: 'Scottish Highlands',
    peaks: [
      { x: 345, y: 415, size: 12, snow: false },
      { x: 370, y: 385, size: 13, snow: true }
    ]
  },
  {
    name: 'Skandinavisches Gebirge',
    peaks: [
      { x: 985, y: 175, size: 14, snow: true },
      { x: 1050, y: 125, size: 15, snow: true },
      { x: 1145, y: 75, size: 15, snow: true }
    ]
  }
];

export const COUNTRY_BORDERS: MapPoint[][] = [
  // DE - NL / BE / LU / FR border approx
  [
    { x: 715, y: 625 },
    { x: 685, y: 695 },
    { x: 675, y: 775 },
    { x: 680, y: 825 },
    { x: 695, y: 890 },
    { x: 765, y: 925 },
    { x: 785, y: 995 }
  ],
  // DE - CH / AT border approx
  [
    { x: 785, y: 995 },
    { x: 870, y: 1025 },
    { x: 950, y: 1055 },
    { x: 1045, y: 1055 },
    { x: 1120, y: 1025 }
  ],
  // DE - CZ / PL border approx
  [
    { x: 1120, y: 1025 },
    { x: 1085, y: 925 },
    { x: 1150, y: 790 },
    { x: 1190, y: 710 },
    { x: 1185, y: 525 }
  ],
  // FR - BE / CH / IT border approx
  [
    { x: 535, y: 765 },
    { x: 645, y: 845 },
    { x: 695, y: 890 }
  ],
  [
    { x: 785, y: 995 },
    { x: 735, y: 1070 },
    { x: 725, y: 1155 },
    { x: 745, y: 1205 }
  ],
  // CH/AT - IT border approx
  [
    { x: 735, y: 1110 },
    { x: 845, y: 1110 },
    { x: 965, y: 1115 },
    { x: 1055, y: 1110 },
    { x: 1135, y: 1125 }
  ]
];

export const COUNTRY_LABELS: CountryLabel[] = [
  { code: 'DE', name: 'DEUTSCHLAND', x: 910, y: 780 },
  { code: 'NL', name: 'NL', x: 625, y: 665 },
  { code: 'BE', name: 'BE', x: 590, y: 815 },
  { code: 'FR', name: 'FRANKREICH', x: 480, y: 995 },
  { code: 'CH', name: 'CH', x: 825, y: 1045 },
  { code: 'AT', name: 'ÖSTERREICH', x: 1120, y: 1070 },
  { code: 'IT', name: 'ITALIEN', x: 995, y: 1245 },
  { code: 'DK', name: 'DK', x: 895, y: 365 },
  { code: 'NO', name: 'NORWEGEN', x: 1005, y: 170 },
  { code: 'SE', name: 'SCHWEDEN', x: 1165, y: 265 },
  { code: 'UK', name: 'UK', x: 390, y: 665 }
];
