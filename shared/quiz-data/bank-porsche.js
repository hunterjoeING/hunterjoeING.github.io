// Unified quiz bank for "porsche" (75 questions: Porsche Allgemein & Porsche Taycan)
(function () {
  const DATA = [
  {
    "cat": "porsche_allgemein",
    "diff": "easy",
    "q": "In welchem Stuttgarter Stadtteil befindet sich seit 1938 der Stammsitz und das Hauptwerk der Porsche AG?",
    "a": [
      "Zuffenhausen",
      "Bad Cannstatt",
      "Untertürkheim",
      "Vaihingen"
    ],
    "explanation": "Stuttgart-Zuffenhausen ist die legendäre Geburtsstätte und das Stammwerk des 911 sowie das Zentrum der Marke Porsche.",
    "exp": "Stuttgart-Zuffenhausen ist die legendäre Geburtsstätte und das Stammwerk des 911 sowie das Zentrum der Marke Porsche."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "easy",
    "q": "Welches Fahrzeug gilt offiziell als der allererste Sportwagen unter dem Markennamen Porsche aus dem Jahr 1948?",
    "a": [
      "Porsche 356 'Nr. 1' Roadster",
      "Porsche 911 Ur-Modell",
      "Porsche 550 Spyder",
      "Porsche 904 Carrera GTS"
    ],
    "explanation": "Der Mittelmotor-Roadster 356 Nr. 1 erhielt am 8. Juni 1948 im österreichischen Gmünd seine offizielle Betriebserlaubnis.",
    "exp": "Der Mittelmotor-Roadster 356 Nr. 1 erhielt am 8. Juni 1948 im österreichischen Gmünd seine offizielle Betriebserlaubnis."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "easy",
    "q": "Warum befindet sich das Zündschloss bei klassischen Porsche-Sportwagen traditionell links vom Lenkrad?",
    "a": [
      "Für den historischen Le-Mans-Start: Mit links starten und gleichzeitig mit rechts den Gang einlegen",
      "Weil Ferdinand Porsche Linkshänder war und diesen Handgriff bevorzugte",
      "Um versehentliches Anlassen durch den Beifahrer auszuschließen",
      "Wegen eines Platzmangels für Kabelstränge hinter dem Tacho"
    ],
    "explanation": "Beim Le-Mans-Start sprinteten Fahrer zu den Autos. Links zünden und rechts schalten sparte wertvolle Zehntelsekunden beim Losfahren.",
    "exp": "Beim Le-Mans-Start sprinteten Fahrer zu den Autos. Links zünden und rechts schalten sparte wertvolle Zehntelsekunden beim Losfahren."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "easy",
    "q": "Unter welchem Namen sollte der Porsche 911 auf der IAA 1963 ursprünglich vorgestellt werden?",
    "a": [
      "Porsche 901",
      "Porsche 801",
      "Porsche 999",
      "Porsche 1001"
    ],
    "explanation": "Peugeot beanspruchte das Namensrecht auf dreistellige Zahlen mit einer Null in der Mitte, worauf Porsche die Null kurzerhand durch eine Eins ersetzte.",
    "exp": "Peugeot beanspruchte das Namensrecht auf dreistellige Zahlen mit einer Null in der Mitte, worauf Porsche die Null kurzerhand durch eine Eins ersetzte."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "easy",
    "q": "Welche Motorenbauform treibt das Heck des Porsche 911 seit über 60 Jahren unverwechselbar an?",
    "a": [
      "Der Sechszylinder-Boxermotor",
      "Ein Reihen-Sechszylinder-Motor",
      "Ein V8-Saugmotor mit Kompressor",
      "Ein Vierzylinder-Wankelmotor"
    ],
    "explanation": "Flach bauend, mit tiefem Schwerpunkt und gegenüberliegenden Kolbenpaaren: Der Boxermotor ist die unverrückbare Seele des Neunelfers.",
    "exp": "Flach bauend, mit tiefem Schwerpunkt und gegenüberliegenden Kolbenpaaren: Der Boxermotor ist die unverrückbare Seele des Neunelfers."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "easy",
    "q": "Welches Tier ziert das Wappen im Zentrum des goldenen Porsche-Markenemblems?",
    "a": [
      "Ein aufsteigendes schwarzes Ross (Stuttgarter Rössle)",
      "Ein springender roter Löwe",
      "Ein fliegender schwarzer Adler",
      "Ein brüllender wilder Bär"
    ],
    "explanation": "Das Porsche-Wappen kombiniert das Stuttgarter Stadtwappen (schwarzes Rössle) mit dem württembergischen Landeswappen (Hirschstangen).",
    "exp": "Das Porsche-Wappen kombiniert das Stuttgarter Stadtwappen (schwarzes Rössle) mit dem württembergischen Landeswappen (Hirschstangen)."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "easy",
    "q": "Welcher ikonische Heckspoiler prägte 1972 den legendären Porsche 911 Carrera RS 2.7?",
    "a": [
      "Der Entenbürzel (Ducktail)",
      "Der Walschwanz (Whale Tail)",
      "Das Bügelbrett",
      "Die Haifischflosse"
    ],
    "explanation": "Der erste aerodynamische Bürzel-Spoiler an einem Serienwagen senkte den Auftrieb an der Hinterachse dramatisch und wurde zum Kultdesign.",
    "exp": "Der erste aerodynamische Bürzel-Spoiler an einem Serienwagen senkte den Auftrieb an der Hinterachse dramatisch und wurde zum Kultdesign."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "easy",
    "q": "Wie viele Gesamtsiege feierte Porsche beim legendären 24-Stunden-Rennen von Le Mans bis heute?",
    "a": [
      "19 Gesamtsiege (Rekordsieger)",
      "Exakt 7 Gesamtsiege",
      "Genau 12 Gesamtsiege",
      "Bislang 30 Gesamtsiege"
    ],
    "explanation": "Vom 917 über den 936, 956, 962, GT1 bis zum 919 Hybrid: Kein Hersteller der Welt gewann Le Mans so oft wie die Zuffenhausener.",
    "exp": "Vom 917 über den 936, 956, 962, GT1 bis zum 919 Hybrid: Kein Hersteller der Welt gewann Le Mans so oft wie die Zuffenhausener."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "mid",
    "q": "Was war das Besondere am Schalthebelknauf des Supersportwagens Porsche Carrera GT (2003)?",
    "a": [
      "Er bestand aus Schichtholz (Birke/Esche) als Hommage an den Le-Mans-Rennwagen Porsche 917",
      "Er war mit echtem Blattgold überzogen",
      "Er wurde aus einem massiven Titan-Meteoriten gefräst",
      "Er besaß einen integrierten mechanischen Kompass"
    ],
    "explanation": "Schichtholz leitet keine Wärme, ist federleicht und erinnerte die Piloten direkt an das Holzrädchen des 917 aus den 1970er-Jahren.",
    "exp": "Schichtholz leitet keine Wärme, ist federleicht und erinnerte die Piloten direkt an das Holzrädchen des 917 aus den 1970er-Jahren."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "mid",
    "q": "Welcher Ursprung liegt dem 5,7-Liter-V10-Saugmotor des legendären Carrera GT zugrunde?",
    "a": [
      "Er war ursprünglich für ein geheimes Formel-1-Projekt und einen Le-Mans-Prototyp entwickelt worden",
      "Er stammte aus einem Panzermotor der Bundeswehr",
      "Er war eine verdoppelte Version des Boxermotors aus dem Boxster",
      "Er wurde für amerikanische Speedboote konstruiert"
    ],
    "explanation": "Nachdem Porsches F1- und LMP2000-Pläne gestoppt wurden, pflanzte Entwicklungschef Roland Kussmaul das V10-Triebwerk in den Carrera GT.",
    "exp": "Nachdem Porsches F1- und LMP2000-Pläne gestoppt wurden, pflanzte Entwicklungschef Roland Kussmaul das V10-Triebwerk in den Carrera GT."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "mid",
    "q": "Welche bahnbrechende Technologie führte der Porsche 959 im Jahr 1986 in der Welt der Supersportwagen ein?",
    "a": [
      "Elektronisch geregelten variablen Allradantrieb, Biturbo-Registeraufladung und Höhenverstellung",
      "Einen reinen Elektroantrieb mit Bleibatterien",
      "Automatische Bremsfallschirme am Heck",
      "Ein Cockpit mit Head-up-Projektion auf die Straße"
    ],
    "explanation": "Der 959 war seiner Zeit um Jahrzehnte voraus: Mit Kevlar-Karosserie und Hightech-Allrad PSK deklassierte er damals die gesamte Konkurrenz.",
    "exp": "Der 959 war seiner Zeit um Jahrzehnte voraus: Mit Kevlar-Karosserie und Hightech-Allrad PSK deklassierte er damals die gesamte Konkurrenz."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "mid",
    "q": "Was war der Grund für den Wechsel von Luft- auf Wasserkühlung beim Porsche 911 mit der Baureihe 996 (1997)?",
    "a": [
      "Strikte Abgas- und Lärmvorschriften sowie der Bedarf an Vierventiltechnik zur Leistungssteigerung",
      "Ein weltweites Verbot von Kühllüftern durch die FIA",
      "Weil das Frostschutzmittel im Winter billiger war als Luft",
      "Weil Kunden die Heizung im Neunelfer nicht mehr einschalteten"
    ],
    "explanation": "Luftgekühlte Zylinderköpfe ließen sich mit vier Ventilen thermisch nicht mehr beherrschen; erst Wasserkühlung ermöglichte Euro-Abgasnormen.",
    "exp": "Luftgekühlte Zylinderköpfe ließen sich mit vier Ventilen thermisch nicht mehr beherrschen; erst Wasserkühlung ermöglichte Euro-Abgasnormen."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "mid",
    "q": "Welches berühmte Langstreckenrennen auf Sizilien inspirierte Porsche zum Namen des Modells 'Targa'?",
    "a": [
      "Targa Florio",
      "Mille Miglia",
      "Carrera Panamericana",
      "Giro di Sicilia"
    ],
    "explanation": "Porsche feierte bei der kurvenreichen Targa Florio durch die sizilianischen Berge elf Gesamtsiege und widmete dem Rennen den Targa-Überrollbügel.",
    "exp": "Porsche feierte bei der kurvenreichen Targa Florio durch die sizilianischen Berge elf Gesamtsiege und widmete dem Rennen den Targa-Überrollbügel."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "mid",
    "q": "Welcher Hollywood-Star und Rennfahrer machte den Porsche 917 im Spielfilm 'Le Mans' (1971) unsterblich?",
    "a": [
      "Steve McQueen",
      "Paul Newman",
      "James Dean",
      "Clint Eastwood"
    ],
    "explanation": "McQueen fuhr den 917 im himmelblauen Gulf-Design bei echten Renntempi an der Sarthe und schuf ein filmisches Denkmal.",
    "exp": "McQueen fuhr den 917 im himmelblauen Gulf-Design bei echten Renntempi an der Sarthe und schuf ein filmisches Denkmal."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "mid",
    "q": "Welche Konstruktion zeichnete den 1976 vorgestellten Porsche 924 und 928 als 'Transaxle'-Modelle aus?",
    "a": [
      "Motor vorn unter der Haube, Getriebe an der Hinterachse mit verbindender Zentralwelle",
      "Zwei Motoren, die über Ketten die Vorderräder antreiben",
      "Ein Mittelmotor quer hinter den Vordersitzen",
      "Ein reiner Heckmotor mit Kardanwelle nach vorne"
    ],
    "explanation": "Die Transaxle-Bauweise garantierte eine nahezu perfekte Gewichtsverteilung von 50:50 zwischen Vorder- und Hinterachse für stabiles Kurvenfahren.",
    "exp": "Die Transaxle-Bauweise garantierte eine nahezu perfekte Gewichtsverteilung von 50:50 zwischen Vorder- und Hinterachse für stabiles Kurvenfahren."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "mid",
    "q": "In welchem österreichischen Bergstädtchen produzierte Porsche in der Nachkriegszeit seine ersten Autos in einem alten Sägewerk?",
    "a": [
      "Gmünd in Kärnten",
      "Kitzbühel in Tirol",
      "Zell am See",
      "Bad Gastein"
    ],
    "explanation": "Von 1944 bis 1950 baute Porsche in Gmünd unter abenteuerlichen Bedingungen rund 50 handgedengelte Aluminium-Coupés und Cabriolets des 356.",
    "exp": "Von 1944 bis 1950 baute Porsche in Gmünd unter abenteuerlichen Bedingungen rund 50 handgedengelte Aluminium-Coupés und Cabriolets des 356."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "mid",
    "q": "Mit welchem ersten SUV-Modell gelang Porsche ab 2002 der historische wirtschaftliche Befreiungsschlag?",
    "a": [
      "Porsche Cayenne",
      "Porsche Macan",
      "Porsche Dakar",
      "Porsche Panamera"
    ],
    "explanation": "Der Cayenne spaltete anfangs die Gemüter der Sportwagenfans, wurde aber zum Mega-Erfolg und finanzierte die Weiterentwicklung der Elfer-Ikone.",
    "exp": "Der Cayenne spaltete anfangs die Gemüter der Sportwagenfans, wurde aber zum Mega-Erfolg und finanzierte die Weiterentwicklung der Elfer-Ikone."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Aus welchem Werkstoff bestand der ultraleichte Gitterrohrrahmen des Le-Mans-Siegerwagens Porsche 917 von 1970?",
    "a": [
      "Aus dünnwandigen Aluminium- oder Magnesium-Rohren",
      "Aus massivem Walzstahl mit Zinkschicht",
      "Aus reinem kohlenstofffaserverstärktem Carbon",
      "Aus hohlem Buchenholz mit Harzimprägnierung"
    ],
    "explanation": "Der Rahmen wog kaum mehr als 42 Kilogramm. Bei Rennwagen wurde er mit Druckluft befüllt; ein Druckabfall warnte den Piloten vor Rahmenrissen.",
    "exp": "Der Rahmen wog kaum mehr als 42 Kilogramm. Bei Rennwagen wurde er mit Druckluft befüllt; ein Druckabfall warnte den Piloten vor Rahmenrissen."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Welche kuriose Rennwagenlackierung trug der Porsche 917/20 in Le Mans 1971, entworfen von Designer Anatole Lapine?",
    "a": [
      "Die 'Sau' (Pink Pig) mit rosa Grundfarbe und aufgemalten Fleischer-Schweinemotiven",
      "Ein Tigermuster mit echtem Kunstfell an den Kotflügeln",
      "Ein grün-weißes Karomuster nach schottischem Clan-Vorbild",
      "Eine reine Spiegelfolie zur Blendung von Hinterherfahrenden"
    ],
    "explanation": "Weil der breite Wagen unförmig wie ein Schwein wirkte, beschriftete Lapine die Karosserieteile humorvoll mit Kotelett, Schinken und Rüssel.",
    "exp": "Weil der breite Wagen unförmig wie ein Schwein wirkte, beschriftete Lapine die Karosserieteile humorvoll mit Kotelett, Schinken und Rüssel."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Welche revolutionäre Hinterachskinematik führte der Porsche 928 im Jahr 1977 zur Stabilisierung bei Lastwechseln ein?",
    "a": [
      "Die Weissach-Achse (mit elastokinematischer Vorspurkorrektur beim Anbremsen)",
      "Eine starr geschweißte Blattfederachse wie bei Lastwagen",
      "Eine hydraulisch lenkbare Zahnstangenachse von ZF",
      "Eine De-Dion-Achse mit Gummizugstreben"
    ],
    "explanation": "Die Weissach-Achse lenkte das kurvenäußere Hinterrad beim Gaswegnehmen leicht nach innen ein und verhinderte plötzliches Übersteuern.",
    "exp": "Die Weissach-Achse lenkte das kurvenäußere Hinterrad beim Gaswegnehmen leicht nach innen ein und verhinderte plötzliches Übersteuern."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Welche Rundenzeit brannte Timo Bernhard im Juni 2018 mit dem modifizierten Porsche 919 Hybrid Evo in die Nürburgring-Nordschleife?",
    "a": [
      "5:19,55 Minuten (absoluter Allzeit-Streckenrekord)",
      "6:11,13 Minuten (Stefan Bellofs Rekord von 1983)",
      "4:45,02 Minuten",
      "5:58,90 Minuten"
    ],
    "explanation": "Frei von allen WEC-Reglement-Fesseln, mit extremer Aerodynamik und über 1.160 PS pulverisierte der 919 Evo Stefan Bellofs 35 Jahre alten Rekord.",
    "exp": "Frei von allen WEC-Reglement-Fesseln, mit extremer Aerodynamik und über 1.160 PS pulverisierte der 919 Evo Stefan Bellofs 35 Jahre alten Rekord."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Aus welchem Grund besaßen die ersten Porsche 356 Coupés eine geteilte Windschutzscheibe ('Knickscheibe')?",
    "a": [
      "Gebogenes Verbundglas in einem Stück war damals produktionstechnisch kaum bezahlbar",
      "Damit bei Steinschlag immer nur die Beifahrerseite barst",
      "Um einen Mittelbalken für den Innenspiegel montieren zu können",
      "Weil der Scheibenwischermotor nur halbe Scheiben wischen konnte"
    ],
    "explanation": "Zwei flache Glasscheiben mit Mittelsteg waren in der Nachkriegszeit dramatisch billiger und stabiler zu fertigen als gewölbtes Glas.",
    "exp": "Zwei flache Glasscheiben mit Mittelsteg waren in der Nachkriegszeit dramatisch billiger und stabiler zu fertigen als gewölbtes Glas."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Welcher Porsche-Mitarbeiter und spätere VW-Aufsichtsratschef trieb die Entwicklung des legendären 917 kompromisslos voran?",
    "a": [
      "Ferdinand Piëch",
      "Wendelin Wiedeking",
      "Peter Schutz",
      "Ferry Porsche"
    ],
    "explanation": "Piëch riskierte als junger Entwicklungschef Porsches finanzielle Existenz, um mit 25 gebauten 917-Rennwagen den Le-Mans-Gesamtsieg zu erzwingen.",
    "exp": "Piëch riskierte als junger Entwicklungschef Porsches finanzielle Existenz, um mit 25 gebauten 917-Rennwagen den Le-Mans-Gesamtsieg zu erzwingen."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Welcher geniale Coup gelang US-Chef Peter Schutz Anfang der 1980er-Jahre, als der Porsche 911 eigentlich eingestellt werden sollte?",
    "a": [
      "Er verlängerte im Büro von Entwicklungschef Helmuth Bott die Neunelfer-Balkengrafik mit einem Filzstift über die Wand",
      "Er kaufte alle 911-Werkzeuge heimlich auf eigene Rechnung",
      "Er verkaufte den Neunelfer exklusiv an US-Astronauten der NASA",
      "Er verbot allen Porsche-Händlern den Verkauf von Frontmotor-Modellen"
    ],
    "explanation": "Der Vorstand wollte den 911 zugunsten des 928 sterben lassen. Schutz zog den Strich an der Wandtafel ins Unendliche – der Elfer lebte weiter.",
    "exp": "Der Vorstand wollte den 911 zugunsten des 928 sterben lassen. Schutz zog den Strich an der Wandtafel ins Unendliche – der Elfer lebte weiter."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Welche revolutionäre Doppelnockenwellen-Konstruktion entwickelte Ernst Fuhrmann 1953 für den Rennmotor des Porsche 550 Spyder?",
    "a": [
      "Den Königswellen-Motor (vier Nockenwellen angetrieben über Kegelrad-Königswellen)",
      "Den ersten Zahnriemen-Antrieb der Automobilgeschichte",
      "Einen kettenlosen Magnet-Nockenwellenantrieb",
      "Eine hydraulische Schlepphebel-Direktsteuerung"
    ],
    "explanation": "Der 'Fuhrmann-Motor' (Typ 547) war extrem komplex einzustellen (Dauer: mehrere Tage), aber drehzahlfest und der Schrecken der Konkurrenz.",
    "exp": "Der 'Fuhrmann-Motor' (Typ 547) war extrem komplex einzustellen (Dauer: mehrere Tage), aber drehzahlfest und der Schrecken der Konkurrenz."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Welches mexikanische Straßenrennen inspirierte Porsche zu der weltberühmten Modellbezeichnung 'Carrera'?",
    "a": [
      "Carrera Panamericana",
      "Baja 1000",
      "Rallye Mexico",
      "Gran Premio de Tijuana"
    ],
    "explanation": "Hans Herrmann errang 1954 auf dem Porsche 550 Spyder Klassensiege bei der berüchtigten Panamericana-Fernfahrt quer durch Mexiko.",
    "exp": "Hans Herrmann errang 1954 auf dem Porsche 550 Spyder Klassensiege bei der berüchtigten Panamericana-Fernfahrt quer durch Mexiko."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Welche aerodynamische Eigenart machte den Porsche 911 GT1 von 1998 in Le Mans so konkurrenzfähig?",
    "a": [
      "Ein reines Kohlefaser-Monocoque-Chassis mit extrem flacher Front und langgezogenem Heckdiffusor",
      "Ein Klappdach, das sich auf den Geraden aerodynamisch absenkte",
      "Ein Seitenwind-Gebläse, das Luft unter die Reifen blies",
      "Fest montierte Luftkissen an den Seitenschwellern"
    ],
    "explanation": "Der GT1 '98 war der erste Porsche-Rennwagen mit reinem Kohlefaser-Monocoque und holte 1998 einen triumphalen Doppelsieg in Le Mans.",
    "exp": "Der GT1 '98 war der erste Porsche-Rennwagen mit reinem Kohlefaser-Monocoque und holte 1998 einen triumphalen Doppelsieg in Le Mans."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Warum feierte die Rallye-Ikone Porsche 953 im Jahr 1984 bei der Rallye Paris-Dakar einen historischen Sensationssieg?",
    "a": [
      "Als erster allradgetriebener 911 meisterte er die Sahara-Wüste unter René Metge souverän",
      "Er fuhr die gesamte Strecke ohne einen einzigen Tankstopp durch",
      "Er wurde rein mit Solarmodulen auf dem Dach angetrieben",
      "Er besaß Kettenantrieb anstelle normaler Gummireifen"
    ],
    "explanation": "Der 953 (oft 911 4x4 genannt) testete den Allradantrieb für den späteren 959 und bewies Neunelfer-Robustheit im tiefsten Dünensand.",
    "exp": "Der 953 (oft 911 4x4 genannt) testete den Allradantrieb für den späteren 959 und bewies Neunelfer-Robustheit im tiefsten Dünensand."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Welcher Designer schuf die unverwechselbare Urform des Porsche 911 (Typ 901) mit den markanten runden Scheinwerfern?",
    "a": [
      "Ferdinand Alexander Porsche ('Butzi' Porsche)",
      "Anatole Lapine",
      "Harm Lagaay",
      "Michael Mauer"
    ],
    "explanation": "Ferdinand Porsches Enkel F. A. 'Butzi' Porsche schuf die zeitlose Silhouette mit fließender Dachlinie, die bis heute jede 911-Generation prägt.",
    "exp": "Ferdinand Porsches Enkel F. A. 'Butzi' Porsche schuf die zeitlose Silhouette mit fließender Dachlinie, die bis heute jede 911-Generation prägt."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Welches Geheimnis steckt hinter dem legendären Werbeslogan 'Nobody is perfect' von Porsche nach Le Mans 1983?",
    "a": [
      "Porsche belegte die ersten acht Plätze im Gesamtklassement – nur auf Platz 9 schlich sich ein Sauber-BMW ein",
      "Der Siegerwagen hatte während des Rennens eine Tür verloren",
      "Der Teamchef vergaß bei der Siegerehrung die Champagnerflasche",
      "Die Boxencrew hatte versehentlich Regenreifen bei Sonnenschein montiert"
    ],
    "explanation": "Auf den Plätzen 1 bis 8 landeten ausschließlich Porsche 956. Das Plakat zeigte humorvoll die Ergebnisliste mit dem Hinweis auf Platz 9.",
    "exp": "Auf den Plätzen 1 bis 8 landeten ausschließlich Porsche 956. Das Plakat zeigte humorvoll die Ergebnisliste mit dem Hinweis auf Platz 9."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Was zeichnet das Porsche Doppelkupplungsgetriebe (PDK) historisch aus, bevor es 2008 in die 911-Serie einzog?",
    "a": [
      "Es wurde bereits in den 1980er-Jahren im 956/962-Rennwagen erprobt, um Gangwechsel ohne Zugkraftunterbrechung zu ermöglichen",
      "Es wurde ursprünglich für Mähdrescher in Südamerika erfunden",
      "Es arbeitete rein hydraulisch ohne jegliche Elektronik",
      "Es konnte nur drei Vorwärtsgänge schalten"
    ],
    "explanation": "Bereits 1984 testeten Derek Bell und Jacky Ickx das PDK im Rennbetrieb; erst moderne Rechner machten es sanft genug für die Straße.",
    "exp": "Bereits 1984 testeten Derek Bell und Jacky Ickx das PDK im Rennbetrieb; erst moderne Rechner machten es sanft genug für die Straße."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Welche technische Meisterleistung vollbrachte der 918 Spyder (2013) als erster straßenzugelassener Supersportwagen auf der Nordschleife?",
    "a": [
      "Er unterbot als erstes Serienfahrzeug mit Straßenbereifung die magische Sieben-Minuten-Marke (6:57 Minuten)",
      "Er fuhr die 20,8 Kilometer rein elektrisch mit 300 km/h Topspeed",
      "Er absolvierte drei Runden ohne Reifenwechsel mit nur einer Tankfüllung",
      "Er durchbrach die Schallmauer auf der Döttinger Höhe"
    ],
    "explanation": "Marc Lieb steuerte den 887 PS starken Plug-in-Hybrid-Sportwagen in sensationellen 6:57 Minuten durch die 'Grüne Hölle'.",
    "exp": "Marc Lieb steuerte den 887 PS starken Plug-in-Hybrid-Sportwagen in sensationellen 6:57 Minuten durch die 'Grüne Hölle'."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Welcher Konstrukteur zeichnete für den legendären 'Mezger-Motor' verantwortlich, der Generationen von GT3-Modellen antrieb?",
    "a": [
      "Hans Mezger",
      "Norbert Singer",
      "Helmut Flegl",
      "Valentin Schäffer"
    ],
    "explanation": "Hans Mezger konstruierte das luftgekühlte Kurbelgehäuse, das später als wassergekühlter Mezger-Block den 911 GT3 und GT2 unzerstörbar machte.",
    "exp": "Hans Mezger konstruierte das luftgekühlte Kurbelgehäuse, das später als wassergekühlter Mezger-Block den 911 GT3 und GT2 unzerstörbar machte."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Was war das Besondere am 'Porsche 911 GT3 RS 4.0' der Baureihe 997 im Jahr 2011?",
    "a": [
      "Es war der krönende Abschluss und die größte Ausbaustufe des klassischen Mezger-Saugmotors mit 500 PS",
      "Er besaß als erster Neunelfer einen V8-Motor im Heck",
      "Er wurde ausschließlich ohne Frontscheinwerfer für Tagesrennen verkauft",
      "Er hatte keine Rückspiegel, sondern nur Kameras"
    ],
    "explanation": "Mit Kurbelwelle aus dem RSR-Rennwagen, 500 PS bei 8.250 U/min und limitiert auf 600 Exemplare gilt der 4.0 als heiliger Gral moderner Saugmotor-Elfer.",
    "exp": "Mit Kurbelwelle aus dem RSR-Rennwagen, 500 PS bei 8.250 U/min und limitiert auf 600 Exemplare gilt der 4.0 als heiliger Gral moderner Saugmotor-Elfer."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Welches Bauteil sparte beim Porsche 911 GT3 RS (991/992) maßgeblich Gewicht auf dem Dach ein?",
    "a": [
      "Ein Dach aus ultraleichtem Magnesium (später auch Sichtcarbon)",
      "Ein Glasdach aus kugelsicherem Panzerglas",
      "Ein Faltdach aus imprägnierter Baumwolle",
      "Ein Dach aus geschmiedetem Messingblech"
    ],
    "explanation": "Ein Magnesiumdach spart wertvolle Kilos am höchsten Punkt des Autos und senkt dadurch den physikalischen Schwerpunkt für maximale Kurvengeschwindigkeit.",
    "exp": "Ein Magnesiumdach spart wertvolle Kilos am höchsten Punkt des Autos und senkt dadurch den physikalischen Schwerpunkt für maximale Kurvengeschwindigkeit."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Was versteht Porsche unter der Sport Chrono-Funktion 'Launch Control'?",
    "a": [
      "Das elektronisch geregelte Beschleunigen aus dem Stand mit optimalem Schlupf an den Reifen",
      "Das automatische Abheben der Frontpartie vor Bodenwellen",
      "Eine Notabschaltung der Benzinpumpe bei Rennunfällen",
      "Ein automatisches Funksignal an die Boxengasse beim Überholen"
    ],
    "explanation": "Bremse treten, Vollgas geben, Bremse lösen: Die Elektronik regelt Drehzahl und Kupplungsschlupf für die physikalisch schnellste Katapult-Beschleunigung.",
    "exp": "Bremse treten, Vollgas geben, Bremse lösen: Die Elektronik regelt Drehzahl und Kupplungsschlupf für die physikalisch schnellste Katapult-Beschleunigung."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Welche Funktion erfüllt das 'PASM'-System (Porsche Active Suspension Management) im Fahrwerk?",
    "a": [
      "Die elektronische kontinuierliche Regelung der Dämpferkraft für jedes einzelne Rad je nach Fahrsituation",
      "Das automatische Lenken der Hinterräder gegen den Wind",
      "Die Umstellung der Zündkerzen von Benzin- auf Wasserstoffbetrieb",
      "Das Absenken der Reifenventile zur Druckentlastung bei Regen"
    ],
    "explanation": "Sensoren erfassen Karosseriebewegungen; PASM schaltet in Millisekunden zwischen komfortablem Gleiten und straffem Rennstreckenmodus um.",
    "exp": "Sensoren erfassen Karosseriebewegungen; PASM schaltet in Millisekunden zwischen komfortablem Gleiten und straffem Rennstreckenmodus um."
  },
  {
    "cat": "porsche_allgemein",
    "diff": "pro",
    "q": "Warum trug der Porsche 935 im Motorsport der 1970er-Jahre den legendären Spitznamen 'Moby Dick'?",
    "a": [
      "Wegen seiner gewaltigen weißen Karosserieverbreiterung und des langgestreckten aerodynamischen Hecks",
      "Weil der Fahrer im Innenraum auf einem echten Walfänger-Hocker saß",
      "Weil das Auto Kerosin mit Walöl-Zusatz verbrannte",
      "Weil er nach einem Tauchgang im Hafenbecken von Monaco gerettet wurde"
    ],
    "explanation": "Norbert Singers aerodynamische Weiterentwicklung (Typ 935/78) mit 845 PS erinnerte mit seiner mächtigen weißen Flunderform an den weißen Wal aus Melvilles Roman.",
    "exp": "Norbert Singers aerodynamische Weiterentwicklung (Typ 935/78) mit 845 PS erinnerte mit seiner mächtigen weißen Flunderform an den weißen Wal aus Melvilles Roman."
  },
  {
    "cat": "porsche_taycan",
    "diff": "easy",
    "q": "Unter welchem Namen präsentierte Porsche 2015 auf der IAA die spektakuläre Konzeptstudie des späteren Taycan?",
    "a": [
      "Mission E",
      "E-Performance One",
      "Taycan Concept Zero",
      "Panamera Electric"
    ],
    "explanation": "Die Studie 'Mission E' begeisterte mit 800-Volt-Technik, Selbstmördertüren und dem Versprechen echter Porsche-Fahrdynamik unter Strom.",
    "exp": "Die Studie 'Mission E' begeisterte mit 800-Volt-Technik, Selbstmördertüren und dem Versprechen echter Porsche-Fahrdynamik unter Strom."
  },
  {
    "cat": "porsche_taycan",
    "diff": "easy",
    "q": "Welche Spannungs-Architektur setzte der Porsche Taycan 2019 als erstes Serien-Elektroauto weltweit ein?",
    "a": [
      "800-Volt-Systemspannung",
      "400-Volt-Systemspannung",
      "230-Volt-Systemspannung",
      "48-Volt-Mildhybrid-Spannung"
    ],
    "explanation": "800 Volt halbieren bei gleicher Ladeleistung den Stromfluss. Das spart dicke Kupferkabel im Auto und ermöglicht Ladeleistungen von bis zu 320 kW.",
    "exp": "800 Volt halbieren bei gleicher Ladeleistung den Stromfluss. Das spart dicke Kupferkabel im Auto und ermöglicht Ladeleistungen von bis zu 320 kW."
  },
  {
    "cat": "porsche_taycan",
    "diff": "easy",
    "q": "Welche kuriose Besonderheit zeichnet das Getriebe an der Hinterachse des Porsche Taycan im Vergleich zu fast allen anderen E-Autos aus?",
    "a": [
      "Ein innovatives Zwei-Gang-Schaltgetriebe für explosiven Spurt und effizientes Autobahntempo",
      "Ein stufenloses Keilriemengetriebe wie beim Motorroller",
      "Ein mechanisches Fünfgang-Handrührgetriebe mit Kupplungspedal",
      "Gar kein Getriebe, da der Motor direkt in die Felge gegossen ist"
    ],
    "explanation": "Gang 1 sorgt für maximale Beschleunigung aus dem Stand; Gang 2 senkt die Drehzahl bei hohem Tempo und steigert Effizienz und Top-Speed.",
    "exp": "Gang 1 sorgt für maximale Beschleunigung aus dem Stand; Gang 2 senkt die Drehzahl bei hohem Tempo und steigert Effizienz und Top-Speed."
  },
  {
    "cat": "porsche_taycan",
    "diff": "easy",
    "q": "Warum tragen die Topmodelle des Taycan Bezeichnungen wie 'Turbo' und 'Turbo S', obwohl ein E-Auto keinen Abgasturbolader besitzt?",
    "a": [
      "Als traditionelle Nomenklatur bei Porsche für die jeweils stärkste und prestigeträchtigste Leistungsstufe",
      "Weil ein kleiner elektrischer Ventilator die Batterie kühlt",
      "Weil der Soundgenerator das Pfeifen eines Turbos imitiert",
      "Aufgrund einer Verwechslung im Marketingprospekt"
    ],
    "explanation": "'Turbo' steht bei Porsche seit 1974 für Spitzenleistung und Exklusivität, weshalb der Begriff auch in der E-Ära als Markenikone bleibt.",
    "exp": "'Turbo' steht bei Porsche seit 1974 für Spitzenleistung und Exklusivität, weshalb der Begriff auch in der E-Ära als Markenikone bleibt."
  },
  {
    "cat": "porsche_taycan",
    "diff": "easy",
    "q": "Wie nennt man die Lifestyle-Kombi-Version des Taycan mit erhöhter Bodenfreiheit und robusten Beplankungen?",
    "a": [
      "Taycan Cross Turismo",
      "Taycan Allroad Explorer",
      "Taycan Outback Edition",
      "Taycan Dakar Shooting Brake"
    ],
    "explanation": "Der Cross Turismo bietet mehr Kopffreiheit im Fond, eine große Heckklappe und ein Schotter-Fahrprogramm für unbefestigte Wege.",
    "exp": "Der Cross Turismo bietet mehr Kopffreiheit im Fond, eine große Heckklappe und ein Schotter-Fahrprogramm für unbefestigte Wege."
  },
  {
    "cat": "porsche_taycan",
    "diff": "easy",
    "q": "An welchem Porsche-Standort wurde für die Taycan-Produktion eigens eine neue, CO2-neutrale 'Fabrik in der Fabrik' gebaut?",
    "a": [
      "In Stuttgart-Zuffenhausen",
      "Im Werk Leipzig",
      "Im Werk Bratislava",
      "Im Werk Osnabrück"
    ],
    "explanation": "Porsche investierte hunderte Millionen Euro in Zuffenhausen und baute fahrerlose Transportsysteme (FTS) im laufenden Altbetrieb auf.",
    "exp": "Porsche investierte hunderte Millionen Euro in Zuffenhausen und baute fahrerlose Transportsysteme (FTS) im laufenden Altbetrieb auf."
  },
  {
    "cat": "porsche_taycan",
    "diff": "mid",
    "q": "Was versteht Porsche unter den sogenannten 'Fußgaragen' (Foot Garages) im Batteriepack des Taycan?",
    "a": [
      "Aussparungen im Unterflurakku für tiefere Fußräume und eine sportlich tiefe Sitzposition der Fondpassagiere",
      "Beheizbare Fächer im Kofferraum zum Trocknen von nassen Skischuhen",
      "Gummierte Ablagen unter den Vordersitzen für Schmutzschuhe",
      "Sensoren an den Pedalen, die die Schuhgröße des Fahrers messen"
    ],
    "explanation": "Weil der Akku im Boden normalerweise Platz raubt, sparte Porsche Batteriezellen im Fondfußraum aus. So sitzt man tief wie im 911.",
    "exp": "Weil der Akku im Boden normalerweise Platz raubt, sparte Porsche Batteriezellen im Fondfußraum aus. So sitzt man tief wie im 911."
  },
  {
    "cat": "porsche_taycan",
    "diff": "mid",
    "q": "Welche enorme Rekuperationsleistung kann der überarbeitete Taycan (Facelift 2024) beim Bremsen maximal zurück in die Batterie speisen?",
    "a": [
      "Bis zu 400 Kilowatt (kW)",
      "Maximal 50 Kilowatt (kW)",
      "Knapp 120 Kilowatt (kW)",
      "Exakt 1.000 Kilowatt (kW)"
    ],
    "explanation": "Von anfangs 265–290 kW steigerte Porsche die Brems-Energierückgewinnung beim Modelljahr 2024 auf atemberaubende 400 kW.",
    "exp": "Von anfangs 265–290 kW steigerte Porsche die Brems-Energierückgewinnung beim Modelljahr 2024 auf atemberaubende 400 kW."
  },
  {
    "cat": "porsche_taycan",
    "diff": "mid",
    "q": "Welche Wickeltechnik nutzt Porsche bei den Statoren der permanenterregten Synchronmotoren (PSM) des Taycan?",
    "a": [
      "Hairpin-Wicklung (Haarnadel-Technologie mit rechteckigen Kupferstäben)",
      "Klassische Runddraht-Handwicklung",
      "Gedruckte Platinenleiterbahnen aus Aluminium",
      "Geflochtene Carbon-Kupfer-Fasern"
    ],
    "explanation": "Rechteckige Kupferstäbe füllen den Statorraum viel dichter aus (Kupferfüllfaktor bis 70 %) und leiten Wärme deutlich besser ab.",
    "exp": "Rechteckige Kupferstäbe füllen den Statorraum viel dichter aus (Kupferfüllfaktor bis 70 %) und leiten Wärme deutlich besser ab."
  },
  {
    "cat": "porsche_taycan",
    "diff": "mid",
    "q": "Welche maximale Peak-Ladeleistung erreicht der neue Porsche Taycan (Modellpflege ab 2024) an passenden 800V-Schnellladestationen?",
    "a": [
      "Bis zu 320 kW Ladeleistung",
      "Maximal 150 kW Ladeleistung",
      "Genau 22 kW Ladeleistung",
      "Knapp 500 kW Ladeleistung"
    ],
    "explanation": "Dank verbesserter Zellchemie lädt der Taycan mit bis zu 320 kW und füllt den Akku von 10 auf 80 Prozent in nur 18 Minuten.",
    "exp": "Dank verbesserter Zellchemie lädt der Taycan mit bis zu 320 kW und füllt den Akku von 10 auf 80 Prozent in nur 18 Minuten."
  },
  {
    "cat": "porsche_taycan",
    "diff": "mid",
    "q": "Warum verzichtet der Taycan im Gegensatz zu vielen Konkurrenten auf das sogenannte 'One-Pedal-Driving' mit starker Verzögerung beim Gaswegnehmen?",
    "a": [
      "Um ein natürliches, sportliches Segeln wie bei einem 911 zu ermöglichen; gebremst wird bewusst über das Bremspedal",
      "Weil der Elektromotor beim Gaswegnehmen sonst überhitzen würde",
      "Weil das deutsche Kraftfahrt-Bundesamt One-Pedal-Driving verboten hat",
      "Weil die Batterie beim Gaswegnehmen keinen Strom aufnehmen kann"
    ],
    "explanation": "Porsche-Philosophie: Der Fahrer soll segeln können. Das Bremspedal verzögert harmonisch: erst voll elektrisch, erst bei Notbremsung mit Scheibe.",
    "exp": "Porsche-Philosophie: Der Fahrer soll segeln können. Das Bremspedal verzögert harmonisch: erst voll elektrisch, erst bei Notbremsung mit Scheibe."
  },
  {
    "cat": "porsche_taycan",
    "diff": "mid",
    "q": "Welche sportliche Karosserievariante kombiniert die flache Limousinen-Heckoptik mit dem praktischen Kombiheck ohne Offroad-Plastik?",
    "a": [
      "Taycan Sport Turismo",
      "Taycan Gran Turismo Coupé",
      "Taycan Avantissimo",
      "Taycan Speedster"
    ],
    "explanation": "Der Sport Turismo verzichtet auf die Radlaufleisten und Höherlegung des Cross Turismo und bietet puristische Sportwagenoptik mit Nutzwert.",
    "exp": "Der Sport Turismo verzichtet auf die Radlaufleisten und Höherlegung des Cross Turismo und bietet puristische Sportwagenoptik mit Nutzwert."
  },
  {
    "cat": "porsche_taycan",
    "diff": "mid",
    "q": "Welche Leistung mobilisiert das Spitzenmodell Porsche Taycan Turbo GT (ab 2024) kurzzeitig mit Launch Control und Attack Mode?",
    "a": [
      "Bis zu 1.108 PS (815 kW) Maximalleistung",
      "Exakt 680 PS (500 kW) Maximalleistung",
      "Knapp 450 PS (330 kW) Maximalleistung",
      "Über 2.000 PS (1.470 kW) Maximalleistung"
    ],
    "explanation": "Der Turbo GT pulverisiert die 1.000-PS-Schallmauer: Mit 1.108 PS im Overboost beschleunigt er in nur 2,2 Sekunden auf 100 km/h.",
    "exp": "Der Turbo GT pulverisiert die 1.000-PS-Schallmauer: Mit 1.108 PS im Overboost beschleunigt er in nur 2,2 Sekunden auf 100 km/h."
  },
  {
    "cat": "porsche_taycan",
    "diff": "mid",
    "q": "Welches innovative Panoramadach-System schützt die Insassen im Taycan ohne mechanisches Rollo vor greller Sonne?",
    "a": [
      "Ein 'Sunshine Control'-Glasdach mit flüssigkristalliner Schaltfolie (PDLC) in neun schaltbaren Segmenten",
      "Eine Tönungsfolie, die sich bei Hitze mit Tinte vollsaugt",
      "Ein mechanisches Holz-Schiebelamellengitter",
      "Eine integrierte Sonnenblende aus gebürstetem Aluminium"
    ],
    "explanation": "Elektrische Spannung richtet Flüssigkristalle aus. Per Fingertipp wechselt das Glas blitzschnell von transparent zu blickdicht matt.",
    "exp": "Elektrische Spannung richtet Flüssigkristalle aus. Per Fingertipp wechselt das Glas blitzschnell von transparent zu blickdicht matt."
  },
  {
    "cat": "porsche_taycan",
    "diff": "mid",
    "q": "Wie heißt das revolutionäre vollaktive Hydraulik-Fahrwerk, das Porsche 2024 für den Taycan einführte?",
    "a": [
      "Porsche Active Ride",
      "Magic Body Control",
      "Dynamic Hydraulic Stiffener",
      "Air Ride Pro"
    ],
    "explanation": "Active Ride gleicht Wank- und Nickbewegungen komplett aus: Der Wagen neigt sich in Kurven wie ein Motorrad und bleibt beim Bremsen völlig waagerecht.",
    "exp": "Active Ride gleicht Wank- und Nickbewegungen komplett aus: Der Wagen neigt sich in Kurven wie ein Motorrad und bleibt beim Bremsen völlig waagerecht."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Welchen Halbleiter-Werkstoff setzt Porsche im hinteren Pulswechselrichter des Taycan Turbo GT ein, um extreme Ströme zu schalten?",
    "a": [
      "Siliziumkarbid (SiC) mit bis zu 900 Ampere Schaltstrom",
      "Reines Galliumarsenid aus der Satellitentechnik",
      "Klassische Silizium-Germanium-Dioden",
      "Organische Halbleiterkristalle auf Graphenbasis"
    ],
    "explanation": "SiC-Halbleiter schalten höhere Ströme mit minimalen Schaltverlusten und ermöglichen die gewaltigen 1.108 PS des Turbo GT.",
    "exp": "SiC-Halbleiter schalten höhere Ströme mit minimalen Schaltverlusten und ermöglichen die gewaltigen 1.108 PS des Turbo GT."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Welche sensationelle Rundenzeit stellte Werkspilot Lars Kern im Januar 2024 mit dem Taycan Turbo GT auf der Nürburgring-Nordschleife auf?",
    "a": [
      "7:07,55 Minuten (rund 26 Sekunden schneller als der bisherige Taycan Turbo S)",
      "8:12,30 Minuten",
      "6:35,10 Minuten",
      "7:45,90 Minuten"
    ],
    "explanation": "Mit 7:07,55 Minuten distanzierte der Turbo GT das Tesla Model S Plaid um 18 Sekunden und kam bis auf zwei Sekunden an das Hypercar Rimac Nevera heran.",
    "exp": "Mit 7:07,55 Minuten distanzierte der Turbo GT das Tesla Model S Plaid um 18 Sekunden und kam bis auf zwei Sekunden an das Hypercar Rimac Nevera heran."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Welche Radikal-Maßnahmen umfasst das 'Weissach-Paket' beim Taycan Turbo GT zur Einsparung von rund 75 Kilogramm?",
    "a": [
      "Entfall der Rücksitzbank (durch Carbon-Ablage ersetzt), Leichtbaufenster und Verzicht auf die Analoguhr",
      "Ausbau des Beifahrersitzes und Verzicht auf Frontscheinwerfer",
      "Entfernen der vorderen Bremsanlage zugunsten von Fallschirmen",
      "Ausbau aller Airbags und Ersetzen der Türen durch Lederriemen"
    ],
    "explanation": "Der Turbo GT mit Weissach-Paket wird zum kompromisslosen Zweisitzer: Carbon-Schalen, Leichtbau-Kofferraum und aerodynamischer Festflügel.",
    "exp": "Der Turbo GT mit Weissach-Paket wird zum kompromisslosen Zweisitzer: Carbon-Schalen, Leichtbau-Kofferraum und aerodynamischer Festflügel."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Was passiert technisch beim sogenannten 'Push-to-Pass'- bzw. 'Attack Mode' im Taycan Turbo GT für 10 Sekunden?",
    "a": [
      "Bis zu 120 kW zusätzliche Leistung werden per Lenkradpaddel freigeschaltet (analog zur Formel E)",
      "Die Höchstgeschwindigkeit wird elektronisch auf 400 km/h entsperrt",
      "Die Stoßdämpfer werden für maximale Bodenhaftung komplett blockiert",
      "Der vordere Elektromotor wird für reine Heckantriebs-Drifts entkoppelt"
    ],
    "explanation": "Wie im Formel-E-Rennwagen Porsche 99X Electric liefert der Attack Mode auf Knopfdruck 10 Sekunden lang brutale Zusatz-Boost-Power.",
    "exp": "Wie im Formel-E-Rennwagen Porsche 99X Electric liefert der Attack Mode auf Knopfdruck 10 Sekunden lang brutale Zusatz-Boost-Power."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Welche gemeinsame Plattformbezeichnung teilt sich der originale Taycan mit dem Audi e-tron GT?",
    "a": [
      "J1-Plattform (spezifische E-Performance-Architektur)",
      "MEB-Plattform (Modularer E-Antriebs-Baukasten)",
      "PPE-Plattform (Premium Platform Electric)",
      "MQB-Evo-Plattform"
    ],
    "explanation": "Die J1-Plattform wurde exklusiv von Porsche für extrem flache, sportliche Limousinen mit tiefer Sitzposition entwickelt und von Audi übernommen.",
    "exp": "Die J1-Plattform wurde exklusiv von Porsche für extrem flache, sportliche Limousinen mit tiefer Sitzposition entwickelt und von Audi übernommen."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Wie stellt Porsche sicher, dass der Taycan selbst nach zehn aufeinanderfolgenden Vollgas-Starts von 0 auf 200 km/h nicht an Leistung verliert?",
    "a": [
      "Durch ein hochkomplexes Thermomanagement mit drei getrennten Kühlkreisläufen und Wärmepumpe",
      "Durch automatisches Einspritzen von flüssigem CO2 auf die Rotoren",
      "Indem die Batterie nach jedem Spurt für 20 Sekunden in Standby schaltet",
      "Durch den Einbau von Eisblöcken in den Schwellerverkleidungen"
    ],
    "explanation": "Permanenterregte Synchronmotoren und das intelligente Kühlnetzwerk verhindern 'Thermal Throttling' – Reproduzierbarkeit ist Porsches Markenkern.",
    "exp": "Permanenterregte Synchronmotoren und das intelligente Kühlnetzwerk verhindern 'Thermal Throttling' – Reproduzierbarkeit ist Porsches Markenkern."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Was bewirkt die pyrotechnische Sicherheitstrennung (Pyro-Fuse) im Hochvoltsystem des Taycan bei einem schweren Unfall?",
    "a": [
      "Kleine Sprengladungen trennen die Hochvoltbatterie binnen Millisekunden allpolig vom restlichen Bordnetz",
      "Der Akku wird automatisch nach unten auf die Straße abgesprengt",
      "Die gesamte elektrische Energie wird schlagartig über die Bremslichter abgeführt",
      "Ein Löschschaumteppich flutet automatisch das Cockpit"
    ],
    "explanation": "Lösen die Airbags aus, trennt die Pyro-Sicherung den Akku physisch ab, damit Rettungskräfte gefahrlos am Fahrzeug arbeiten können.",
    "exp": "Lösen die Airbags aus, trennt die Pyro-Sicherung den Akku physisch ab, damit Rettungskräfte gefahrlos am Fahrzeug arbeiten können."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Welchen cW-Wert (Luftwiderstandsbeiwert) erreicht die aerodynamisch optimierte Taycan-Limousine?",
    "a": [
      "Hervorragende cW 0,22",
      "Mäßige cW 0,35",
      "Schlechte cW 0,42",
      "Rekordverdächtige cW 0,14"
    ],
    "explanation": "Mit cW 0,22, aktiven Kühlluftklappen und komplett verkleidetem Unterboden gleitet der Taycan windschnittig durch den Gegenwind.",
    "exp": "Mit cW 0,22, aktiven Kühlluftklappen und komplett verkleidetem Unterboden gleitet der Taycan windschnittig durch den Gegenwind."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Welcher Rekord gelang Rennfahrer Leh Keen im Februar 2021 mit einem Porsche Taycan in einer Messehalle in New Orleans?",
    "a": [
      "Der offizielle Guinness-Weltrekord für das schnellste in einem geschlossenen Gebäude gefahrene Auto (165,1 km/h)",
      "Der längste Rückwärts-Drift auf einem nassen Hallenboden",
      "Der erste Rückwärtssalto über eine Hallenrampe",
      "Der Dauerbetrieb von 48 Stunden im Stand auf Rollen"
    ],
    "explanation": "Auf poliertem Betonboden beschleunigte Keen in der Halle auf 165,1 km/h und bremste haarscharf vor der massiven Hallenwand zum Stillstand.",
    "exp": "Auf poliertem Betonboden beschleunigte Keen in der Halle auf 165,1 km/h und bremste haarscharf vor der massiven Hallenwand zum Stillstand."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Was verbirgt sich hinter dem optionalen 'Porsche Electric Sport Sound' (PESS) im Taycan?",
    "a": [
      "Ein akustisch veredelter, realer Klang der E-Motoren und Inverter, der emotional verstärkt ins Cockpit und nach außen übertragen wird",
      "Eine digitale Nachahmung eines 1968er V8-Chevy-Motors",
      "Ein Lautsprechersystem, das bei Vollgas Marschmusik abspielt",
      "Das synthetische Bellen eines Stuttgarter Rössles"
    ],
    "explanation": "Porsche sampelte keine falschen Auspuffgeräusche, sondern nahm die realen Töne des Elektroantriebs auf dem Prüfstand auf und veredelte sie futuristisch.",
    "exp": "Porsche sampelte keine falschen Auspuffgeräusche, sondern nahm die realen Töne des Elektroantriebs auf dem Prüfstand auf und veredelte sie futuristisch."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Welche Gesamtkapazität (Brutto) fasst die neue 'Performance-Batterie Plus' im überarbeiteten Taycan (Modelljahr 2024)?",
    "a": [
      "105 Kilowattstunden (kWh) brutto (rund 97 kWh netto)",
      "75 Kilowattstunden (kWh) brutto",
      "150 Kilowattstunden (kWh) brutto",
      "55 Kilowattstunden (kWh) brutto"
    ],
    "explanation": "Porsche vergrößerte den Akku von 93,4 kWh auf 105 kWh brutto bei gleichzeitig geringerem Zellgewicht und höherer Energiedichte.",
    "exp": "Porsche vergrößerte den Akku von 93,4 kWh auf 105 kWh brutto bei gleichzeitig geringerem Zellgewicht und höherer Energiedichte."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Aus welchem Grund schaltet der Porsche Taycan im Fahrprogramm 'Range' fast ausschließlich auf den vorderen Elektromotor um?",
    "a": [
      "Weil der Heckmotor dank Freilauf komplett stromlos mitdrehen kann, was Schleppverluste minimiert",
      "Weil der Frontmotor mehr PS leistet als der Heckmotor",
      "Weil die Vorderachse weniger Reifenabrieb auf der Autobahn erzeugt",
      "Weil der Gesetzgeber im Sparmodus Frontantrieb vorschreibt"
    ],
    "explanation": "Im Range-Modus wird der hintere Motor entkoppelt. Der hocheffiziente vordere Motor übernimmt das Gleiten mit minimalem Energieverbrauch.",
    "exp": "Im Range-Modus wird der hintere Motor entkoppelt. Der hocheffiziente vordere Motor übernimmt das Gleiten mit minimalem Energieverbrauch."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Welche Weltpremiere feierte Porsche mit dem Fahrwerk des Active Ride beim Ein- und Aussteigen?",
    "a": [
      "Das Fahrzeug hebt sich in Sekundenbruchteilen um bis zu 55 mm an, um den Einstieg rückenschonend zu erleichtern",
      "Die Türen schwingen wie Flügeltüren automatisch nach oben auf",
      "Die Sitze drehen sich um 90 Grad elektrisch nach außen",
      "Die Stoßstangen fahren als Trittbretter aus dem Schweller"
    ],
    "explanation": "Öffnet man die Tür, pumpt das Active-Ride-Fahrwerk die Karosserie blitzartig um 5,5 cm nach oben – Sportwagentiefe beim Fahren, Komfort beim Einsteigen.",
    "exp": "Öffnet man die Tür, pumpt das Active-Ride-Fahrwerk die Karosserie blitzartig um 5,5 cm nach oben – Sportwagentiefe beim Fahren, Komfort beim Einsteigen."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Welche Besonderheit weisen die elektrischen Ladeklappen des Porsche Taycan an beiden vorderen Kotflügeln auf?",
    "a": [
      "Sie öffnen und schließen berührungslos über Gestensteuerung durch Streichen über eine Sensorfinne",
      "Sie müssen mit einem mechanischen Schlüssel im Tankdeckel entriegelt werden",
      "Sie klappen wie ein Schiebedach auf das Autodach",
      "Sie öffnen sich nur, wenn das Smartphone mit dem Ladekabel verbunden ist"
    ],
    "explanation": "Ein Wisch mit dem Finger unterhalb der Finne genügt: Die Klappe gleitet elegant ins Wageninnere und schließt bei Kälte selbst mit Eisbrecherfunktion.",
    "exp": "Ein Wisch mit dem Finger unterhalb der Finne genügt: Die Klappe gleitet elegant ins Wageninnere und schließt bei Kälte selbst mit Eisbrecherfunktion."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Wie viele Bildschirme können im Armaturenbrett des Porsche Taycan maximal verbaut werden?",
    "a": [
      "Bis zu vier Bildschirme (Curved Instrumententräger, Zentraldisplay, Beifahrerdisplay und Mittelkonsolen-Touchscreen)",
      "Ausschließlich ein einziger Zentralbildschirm wie im Tesla Model 3",
      "Zwei Displays plus eine analoge Tachonadel",
      "Sechs kleine Röhrenmonitore mit Tasten"
    ],
    "explanation": "Vom gebogenen 16,8-Zoll-Instrumenten-Display über den 10,9-Zoll-Infotainment-Screen bis zum separaten Passenger-Display bietet der Taycan eine digitale Glaslandschaft.",
    "exp": "Vom gebogenen 16,8-Zoll-Instrumenten-Display über den 10,9-Zoll-Infotainment-Screen bis zum separaten Passenger-Display bietet der Taycan eine digitale Glaslandschaft."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Welcher Drift-Weltrekord für Elektroautos wurde im November 2020 auf dem Porsche Experience Center Hockenheimring mit dem Taycan aufgestellt?",
    "a": [
      "Der längste ununterbrochene Dauerslalom-Drift über 42,171 Kilometer (210 Runden auf der Kreisbahn)",
      "Der schnellste Drift bei 250 km/h auf der Start-Ziel-Geraden",
      "Ein Drift mit verbundenen Augen über die Nordschleife",
      "Der erste Drift auf zwei Rädern durch eine Steilkurve"
    ],
    "explanation": "Porsche-Instrukteur Dennis Retera driftete mit einem heckgetriebenen Taycan 55 Minuten lang quer über den bewässerten Kreisbogen.",
    "exp": "Porsche-Instrukteur Dennis Retera driftete mit einem heckgetriebenen Taycan 55 Minuten lang quer über den bewässerten Kreisbogen."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Welche technische Neuerung brachte der optionale 22-kW-Onboard-Lader für das Wechselstromladen (AC) zu Hause?",
    "a": [
      "Er halbiert die Ladezeit an einer 22-kW-Wallbox auf rund fünf Stunden für eine Vollladung",
      "Er speist den Strom der Autobatterie ins öffentliche Bahnnetz ein",
      "Er benötigt keinen Ladestecker und lädt rein durch Magnetinduktion im Stand",
      "Er kühlt das Ladekabel mit flüssigem Helium"
    ],
    "explanation": "Während viele E-Autos nur mit 11 kW AC laden, verdoppelt der 22-kW-Lader die Ladegeschwindigkeit an privaten oder öffentlichen Drehstrom-Stationen.",
    "exp": "Während viele E-Autos nur mit 11 kW AC laden, verdoppelt der 22-kW-Lader die Ladegeschwindigkeit an privaten oder öffentlichen Drehstrom-Stationen."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Welche aerodynamische Funktion erfüllen die 'Air Curtains' unterhalb der markanten Hauptscheinwerfer des Taycan?",
    "a": [
      "Sie leiten Fahrtwind gezielt durch Öffnungen an den Vorderrädern vorbei, um Luftverwirbelungen im Radkasten zu glätten",
      "Sie pusten Regenwasser mit Druckluft von den Scheinwerfergläsern",
      "Sie saugen Sauerstoff für die Passagierkabine an",
      "Sie kühlen die vorderen Bremsscheiben durch feine Wasserzerstäubung"
    ],
    "explanation": "Die Lufteinlässe wirken wie ein unsichtbarer Luftvorhang über den vorderen Felgen und senken Verwirbelungen und Luftwiderstand spürbar.",
    "exp": "Die Lufteinlässe wirken wie ein unsichtbarer Luftvorhang über den vorderen Felgen und senken Verwirbelungen und Luftwiderstand spürbar."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Welche Werkstoffe kombiniert die Karosserie des Porsche Taycan im Leichtbau-Mischbau-Konzept?",
    "a": [
      "Aluminium (Türen, Hauben, Kotflügel), hochfester Stahl und Tiefzieh-Gussknoten",
      "Reines Fiberglas mit einem Holzrahmen aus Esche",
      "Ausnahmslos gewalztes Titanblech ohne Stahlanteil",
      "Massives Gusseisen für die Bodenwanne"
    ],
    "explanation": "Die Außenhaut besteht fast vollständig aus Aluminium; warmumgeformte Stähle in den B-Säulen garantieren maximale Crashsicherheit für den Akkukasten.",
    "exp": "Die Außenhaut besteht fast vollständig aus Aluminium; warmumgeformte Stähle in den B-Säulen garantieren maximale Crashsicherheit für den Akkukasten."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Was unterscheidet das Bremsgefühl des Taycan von vielen anderen Hybrid- oder Elektrofahrzeugen?",
    "a": [
      "Ein konstant straffer Druckpunkt, da das System bis 0,39G rein elektrisch verzögert und den Übergang zur Hydraulik unmerklich verblendet",
      "Ein schwammiges Pedal, das bei Rekuperation von selbst nach unten sackt",
      "Ein Pedal, das bei starkem Bremsen vibriert wie ein Massagekissen",
      "Ein System ohne Reibungsbremse, das rein mit Wirbelstrombremsen stoppt"
    ],
    "explanation": "Brake Blending in Perfektion: Der Fahrer spürt nicht, ob der E-Motor oder die Sechskolben-Zange zupackt – das Pedalgefühl bleibt stets exakt wie im GT3.",
    "exp": "Brake Blending in Perfektion: Der Fahrer spürt nicht, ob der E-Motor oder die Sechskolben-Zange zupackt – das Pedalgefühl bleibt stets exakt wie im GT3."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Welche Härtetests absolvierte der Porsche Taycan vor seiner Serienfreigabe im weltweiten Erprobungsprogramm?",
    "a": [
      "Über 6 Millionen Testkilometer in 30 Ländern – von minus 35 Grad in Finnland bis plus 50 Grad in Dubai",
      "Ausschließlich virtuelle Computersimulationen ohne echte Prototypen",
      "Nur 500 Runden auf der werkseigenen Teststrecke in Weissach",
      "Zwei Runden auf dem Nürburgring an einem sonnigen Wochenende"
    ],
    "explanation": "Extremkälte am Polarkreis, glühende Wüstenhitze am Persischen Golf und 24-Stunden-Dauertests in Nardò stellten Zuverlässigkeit sicher.",
    "exp": "Extremkälte am Polarkreis, glühende Wüstenhitze am Persischen Golf und 24-Stunden-Dauertests in Nardò stellten Zuverlässigkeit sicher."
  },
  {
    "cat": "porsche_taycan",
    "diff": "pro",
    "q": "Welche Auszeichnung erhielt der Porsche Taycan 2020 bei den renommierten 'World Car Awards'?",
    "a": [
      "Doppelsieg als 'World Luxury Car' und 'World Performance Car' des Jahres",
      "Auszeichnung als bestes Familienauto für Großfamilien",
      "Sonderpreis für das preisgünstigste Elektroauto weltweit",
      "Ehrenpreis für den lautesten Motorsound"
    ],
    "explanation": "Eine internationale Jury von Automobiljournalisten kürte den Taycan zum besten Luxus- und gleichzeitig besten Performance-Auto der Welt.",
    "exp": "Eine internationale Jury von Automobiljournalisten kürte den Taycan zum besten Luxus- und gleichzeitig besten Performance-Auto der Welt."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === 'function') {
    window.ArcadeQuizEngine.registerBank('porsche', DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS['porsche'] = DATA;
  }
})();
