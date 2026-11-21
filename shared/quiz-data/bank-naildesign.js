// 75 kuratierte Fragen: Nageldesign – Finger- & Fußnägel
// Index 0 von a[] ist stets die richtige Antwort (wird im Spiel gemischt).
(function () {
  const QUESTIONS = [
  // =========================================================================
  // 1. TECHNIKEN & MATERIALIEN (18 Fragen: 5 easy, 9 mid, 4 pro)
  // =========================================================================
  {
    "cat": "techniken_materialien",
    "diff": "easy",
    "q": "Was passiert beim klassischen Acryl-System, sobald man das Pulver mit der speziellen Flüssigkeit auf dem Pinsel vermischt?",
    "a": [
      "Die Masse härtet durch eine Reaktion ganz von allein aus",
      "Die Mischung bleibt weich und braucht zwingend eine UV-Lampe",
      "Das Pulver löst sich erst bei über sechzig Grad sauber auf",
      "Es entsteht ein dünner Schutzlack für eine einzige Woche"
    ],
    "explanation": "Acryl (Polymer-Pulver plus Monomer-Liquid) polymerisiert ganz ohne Lampe an der Luft. Deshalb müssen Nageldesigner beim Modellieren ziemlich fix arbeiten!",
    "exp": "Acryl (Polymer-Pulver plus Monomer-Liquid) polymerisiert ganz ohne Lampe an der Luft. Deshalb müssen Nageldesigner beim Modellieren ziemlich fix arbeiten!"
  },
  {
    "cat": "techniken_materialien",
    "diff": "easy",
    "q": "Was versteht man im Studio-Alltag unter dem berühmten Begriff „Shellac“?",
    "a": [
      "Einen lichthärtenden Hybrid aus Nagellack und dünnem Gel",
      "Eine dicke Kunstnagel-Verlängerung aus gepresstem Acryl",
      "Ein pflanzliches Pflegeöl aus den Kernen der Mandel",
      "Einen klassischen Farblack, der einfach an der Luft trocknet"
    ],
    "explanation": "Shellac ist eigentlich ein Markenname von CND, wird heute aber oft als Sammelbegriff für UV-Lacke genutzt. Er hält rund zwei bis drei Wochen kratzfest.",
    "exp": "Shellac ist eigentlich ein Markenname von CND, wird heute aber oft als Sammelbegriff für UV-Lacke genutzt. Er hält rund zwei bis drei Wochen kratzfest."
  },
  {
    "cat": "techniken_materialien",
    "diff": "easy",
    "q": "Wofür wird ein sogenannter Primer vor dem eigentlichen Modellage-Auftrag dünn auf den Naturnagel gepinselt?",
    "a": [
      "Als Haftvermittler zwischen entfetteter Platte und Gel",
      "Als pflegendes Vitaminserum für eine weiche Nagelhaut",
      "Als glänzende Versiegelung für das fertige Farbdesign",
      "Als Kühlmittel gegen Hitzeentwicklung in der Lichtlampe"
    ],
    "explanation": "Wie eine Art doppelseitiges Klebeband auf molekularer Ebene verbessert Primer die Haftung und beugt lästigen Liftings an den Rändern vor.",
    "exp": "Wie eine Art doppelseitiges Klebeband auf molekularer Ebene verbessert Primer die Haftung und beugt lästigen Liftings an den Rändern vor."
  },
  {
    "cat": "techniken_materialien",
    "diff": "easy",
    "q": "Was ist die klebrige „Schwitzschicht“ nach dem Aushärten von Gel unter der Lampe wirklich?",
    "a": [
      "Ein ungehärteter Film durch Kontakt mit Sauerstoff",
      "Verdunstetes Wasser aus der obersten Hornschicht",
      "Geschmolzenes Pflegeöl aus den umliegenden Poren",
      "Ein sicheres Zeichen für ein defektes Lichtgerät"
    ],
    "explanation": "Sauerstoff in der Luft hemmt die oberste Schicht bei der Polymerisation – sie bleibt leicht klebrig. Das ist perfekt, weil die nächste Gelschicht so noch besser haftet!",
    "exp": "Sauerstoff in der Luft hemmt die oberste Schicht bei der Polymerisation – sie bleibt leicht klebrig. Das ist perfekt, weil die nächste Gelschicht so noch besser haftet!"
  },
  {
    "cat": "techniken_materialien",
    "diff": "easy",
    "q": "Was bedeutet der Begriff „Press-Ons“ in der Welt der modernen Nagelkosmetik?",
    "a": [
      "Fertig designte Kunstnägel zum Aufkleben daheim",
      "Besonders harte Feilen zum Kürzen langer Fußnägel",
      "Spezielle Schablonen zum Stempeln feiner Muster",
      "Elektrische Fräserbits zum Abtragen alter Schichten"
    ],
    "explanation": "Moderne Press-Ons sind heute Welten von den klapprigen Plastiknägeln der 90er entfernt: Mit Klebetabs halten sie fürs Wochenende, mit Nagelkleber bis zu zwei Wochen.",
    "exp": "Moderne Press-Ons sind heute Welten von den klapprigen Plastiknägeln der 90er entfernt: Mit Klebetabs halten sie fürs Wochenende, mit Nagelkleber bis zu zwei Wochen."
  },
  {
    "cat": "techniken_materialien",
    "diff": "mid",
    "q": "Welche cleveren Eigenschaften vereint „Polygel“ (auch Acrylgel genannt) im Vergleich zu reinem Gel und klassischem Acryl?",
    "a": [
      "Feste Formbarkeit ohne Geruch plus gezielte UV-Härtung",
      "Extrem flüssige Konsistenz plus Trocknen ohne Lichtgerät",
      "Vollständige Wasserlöslichkeit schon beim ersten Handbad",
      "Direkte Färbung durch Wärme ganz ohne bunte Pigmente"
    ],
    "explanation": "Polygel vereint die Stabilität von Acryl mit der geruchlosen Verarbeitung von Gel. Es verläuft nicht in die Ränder, sodass man ganz entspannt alle fünf Finger formen kann.",
    "exp": "Polygel vereint die Stabilität von Acryl mit der geruchlosen Verarbeitung von Gel. Es verläuft nicht in die Ränder, sodass man ganz entspannt alle fünf Finger formen kann."
  },
  {
    "cat": "techniken_materialien",
    "diff": "mid",
    "q": "Wie funktioniert die sogenannte „Dipping-Powder“-Technik auf dem Nagel?",
    "a": [
      "Harz aufpinseln, Finger ins Farbpulver tauchen, aktivieren",
      "Wachs schmelzen, Finger eintauchen und an der Luft kühlen",
      "Folie auflegen, mit heißem Föhn erhitzen und glattziehen",
      "Gel auftragen, mit Glitzer bestreuen und kurz beleuchten"
    ],
    "explanation": "Beim Dipping braucht man gar keine UV-Lampe: Ein spezielles Cyanacrylat-Harz verbindet sich mit feinem Acrylpulver und wird durch einen Aktivator sofort steinhart.",
    "exp": "Beim Dipping braucht man gar keine UV-Lampe: Ein spezielles Cyanacrylat-Harz verbindet sich mit feinem Acrylpulver und wird durch einen Aktivator sofort steinhart."
  },
  {
    "cat": "techniken_materialien",
    "diff": "mid",
    "q": "Was ist der Unterschied zwischen einer klassischen UV-Röhrenlampe und einer modernen LED-Nagellampe?",
    "a": [
      "LEDs bündeln enge Wellenlängen und härten deutlich fixer",
      "LEDs arbeiten komplett ohne Strahlung allein mit Wärme",
      "UV-Röhren verbrauchen weniger Strom und halten viel länger",
      "LED-Geräte trocknen auch gewöhnlichen Drogerielack sofort"
    ],
    "explanation": "Beide Lampen nutzen UV-Licht zur Aushärtung – LEDs bündeln aber genau den Bereich um 365 bis 405 Nanometer und verkürzen die Zeit von zwei Minuten auf etwa 30 Sekunden.",
    "exp": "Beide Lampen nutzen UV-Licht zur Aushärtung – LEDs bündeln aber genau den Bereich um 365 bis 405 Nanometer und verkürzen die Zeit von zwei Minuten auf etwa 30 Sekunden."
  },
  {
    "cat": "techniken_materialien",
    "diff": "mid",
    "q": "Wofür steht die Abkürzung „BIAB“, die in sozialen Medien rund um gepflegte Naturnägel ständig fällt?",
    "a": [
      "Für ein stabiles Aufbaugel direkt aus einer normalen Pinselflasche",
      "Für eine Methode zur schnellen Entfernung von alten Kunstnägeln",
      "Für einen speziellen Nagelhautknipser aus rostfreiem Chirurgenstahl",
      "Für ein schnelltrocknendes Öl gegen rissige und trockene Fersen"
    ],
    "explanation": "BIAB steht für „Builder in a Bottle“. Damit lassen sich dünne Naturnägel unkompliziert verstärken, ohne dass man direkt eine lange Kunstnagel-Verlängerung modellieren muss.",
    "exp": "BIAB steht für „Builder in a Bottle“. Damit lassen sich dünne Naturnägel unkompliziert verstärken, ohne dass man direkt eine lange Kunstnagel-Verlängerung modellieren muss."
  },
  {
    "cat": "techniken_materialien",
    "diff": "mid",
    "q": "Wann greift ein Nageldesigner im Studio zur sogenannten „Soak-Off“-Methode statt zum kompletten Abfeilen?",
    "a": [
      "Wenn weiche Gele oder UV-Lacke mit Aceton abgelöst werden sollen",
      "Wenn besonders harte Acryl-Modellagen extrem schnell gekürzt werden",
      "Wenn eingerissene Fußnägel mit medizinischen Spangen korrigiert werden",
      "Wenn frisch lackierte Press-Ons glänzend versiegelt werden müssen"
    ],
    "explanation": "„Soak-Off“-Produkte haben eine lockerere Molekülstruktur als harte Modellagegele. Nach etwa 10 bis 15 Minuten unter Aceton-Pads lassen sie sich sanft abschieben.",
    "exp": "„Soak-Off“-Produkte haben eine lockerere Molekülstruktur als harte Modellagegele. Nach etwa 10 bis 15 Minuten unter Aceton-Pads lassen sie sich sanft abschieben."
  },
  {
    "cat": "techniken_materialien",
    "diff": "mid",
    "q": "Wozu dient das feine „Fiberglas“ oder Seidengewebe bei einer Nagelmodellage?",
    "a": [
      "Es verstärkt dünne Nägel und repariert kleine Risse extrem flach",
      "Es sorgt als bunte Deko-Schicht für einen metallischen Spiegeleffekt",
      "Es poliert stumpfe Acrylflächen am Ende der Behandlung auf Hochglanz",
      "Es saugt überschüssigen Schweiß vor dem Aufkleben von Tips sicher auf"
    ],
    "explanation": "Hauchdünne Fiberglasfasern legen sich fast unsichtbar in das Gel – ähnlich wie Stahlarmierung im Beton – und machen selbst ultradünne Nägel erstaunlich bruchsicher.",
    "exp": "Hauchdünne Fiberglasfasern legen sich fast unsichtbar in das Gel – ähnlich wie Stahlarmierung im Beton – und machen selbst ultradünne Nägel erstaunlich bruchsicher."
  },
  {
    "cat": "techniken_materialien",
    "diff": "mid",
    "q": "Was unterscheidet eine reine Naturnagelverstärkung von einer klassischen Verlängerung mit Tip oder Schablone?",
    "a": [
      "Die Schutzschicht stabilisiert den eigenen Nagel ganz ohne Zusatzlänge",
      "Bei der Verstärkung wird ausschließlich lufttrocknender Klarlack benutzt",
      "Eine Verlängerung hält generell nur halb so lange im Alltag durch",
      "Bei der Verstärkung darf keinerlei Farbgel aufgetragen werden"
    ],
    "explanation": "Wer mit der eigenen Nagellänge zufrieden ist, aber ständig unter abgebrochenen Ecken leidet, bekommt mit der Naturnagelverstärkung genau die fehlende Stabilität.",
    "exp": "Wer mit der eigenen Nagellänge zufrieden ist, aber ständig unter abgebrochenen Ecken leidet, bekommt mit der Naturnagelverstärkung genau die fehlende Stabilität."
  },
  {
    "cat": "techniken_materialien",
    "diff": "mid",
    "q": "Was unterscheidet im Studio ein „No-Wipe“-Versiegelungsgel von einem herkömmlichen Top Coat?",
    "a": [
      "Es härtet komplett trocken aus und benötigt keinen Cleaner mehr",
      "Es muss vor dem Lackieren kräftig mit Nagellackentferner verdünnt werden",
      "Es lässt sich nach dem Trocknen einfach wie Gummi vom Nagel abziehen",
      "Es enthält winzige Sandkörner für einen besonders rauen Matteffekt"
    ],
    "explanation": "„No-Wipe“ heißt: direkt nach der Lampe hochglänzend und trocken! Das spart Zeit und ist außerdem die perfekte Basis, um Chrome-Puder einzureiben.",
    "exp": "„No-Wipe“ heißt: direkt nach der Lampe hochglänzend und trocken! Das spart Zeit und ist außerdem die perfekte Basis, um Chrome-Puder einzureiben."
  },
  {
    "cat": "techniken_materialien",
    "diff": "mid",
    "q": "Warum kleben viele erfahrene Nageldesigner für eine Verlängerung lieber mit Schablonen statt mit Plastik-Tips?",
    "a": [
      "Sie passt sich exakt an breite oder gebogene Nägel an",
      "Sie bleibt als feste Stütze dauerhaft unter dem Aufbau",
      "Für diese Technik braucht man keinerlei Lichthärtungsgerät",
      "Plastik-Tips dürfen laut Gesetz nur an Füßen genutzt werden"
    ],
    "explanation": "Eine Papierschablone wird individuell zugeschnitten und direkt unter den freien Nagelrand geschoben – so sitzt der Übergang nahtlos und ohne Klebstoff auf der Nagelplatte.",
    "exp": "Eine Papierschablone wird individuell zugeschnitten und direkt unter den freien Nagelrand geschoben – so sitzt der Übergang nahtlos und ohne Klebstoff auf der Nagelplatte."
  },
  {
    "cat": "techniken_materialien",
    "diff": "pro",
    "q": "Was verursacht das typische kurze Brennen („Heat Spike“), das manche Kunden beim Aushärten von Aufbaugel in der Lampe spüren?",
    "a": [
      "Exotherme Wärme beim plötzlichen Verketten vieler Moleküle",
      "Direkte Verbrennung der Haut durch heiße Infrarotstrahlung",
      "Ein versteckter Pilzbefall, der durch blaues Licht gereizt wird",
      "Kleine Luftblasen im Lack, die unter dem Licht sofort platzen"
    ],
    "explanation": "Wenn sich Millionen Moleküle gleichzeitig zu Polymerketten verbinden, wird Reaktionswärme frei. Ein „Low-Heat“-Modus startet mit sanfterer Leistung und verhindert das Stechen.",
    "exp": "Wenn sich Millionen Moleküle gleichzeitig zu Polymerketten verbinden, wird Reaktionswärme frei. Ein „Low-Heat“-Modus startet mit sanfterer Leistung und verhindert das Stechen."
  },
  {
    "cat": "techniken_materialien",
    "diff": "pro",
    "q": "Warum greifen Studios bei extrem fettigen Nagelplatten („Problemnägeln“) manchmal zu einem säurehaltigen Primer statt eines säurefreien Bonders?",
    "a": [
      "Er raut das Keratin mikroskopisch an und entzieht Feuchte",
      "Er löst die komplette obere Hornschicht in Sekunden auf",
      "Säurefreie Bonder trocknen nur unter einer Wärmelampe gut",
      "Säurehaltige Varianten härten das Gel ganz ohne Licht aus"
    ],
    "explanation": "Methacrylsäure verätzt kurzzeitig das Keratin an der Oberfläche und schafft mikroskopische Ankerpunkte. Heute reicht meist der schonendere säurefreie Bonder – Säure ist der Joker für harte Fälle.",
    "exp": "Methacrylsäure verätzt kurzzeitig das Keratin an der Oberfläche und schafft mikroskopische Ankerpunkte. Heute reicht meist der schonendere säurefreie Bonder – Säure ist der Joker für harte Fälle."
  },
  {
    "cat": "techniken_materialien",
    "diff": "pro",
    "q": "Wie nennt man den gezielt modellierten höchsten Punkt (die leichte Wölbung) einer Gel- oder Acrylmodellage, der Stöße abfängt?",
    "a": [
      "Apex (auch Stresspunkt genannt)",
      "Lunula (auch Halbmond genannt)",
      "Cuticula (auch Nagelhaut genannt)",
      "Hyponychium (auch Sohlenhorn genannt)"
    ],
    "explanation": "Sitzt der Apex genau in der statischen Stresszone, verteilt er Druck wie ein Brückenbogen. Ohne diese Wölbung bricht ein langer Nagel beim kleinsten Stoß ab.",
    "exp": "Sitzt der Apex genau in der statischen Stresszone, verteilt er Druck wie ein Brückenbogen. Ohne diese Wölbung bricht ein langer Nagel beim kleinsten Stoß ab."
  },
  {
    "cat": "techniken_materialien",
    "diff": "pro",
    "q": "Warum steht heute auf vielen modernen UV-Gelen und Shellac-Fläschchen stolz der Hinweis „HEMA-frei“?",
    "a": [
      "Weil dieser winzige Stoff besonders häufig Allergien auslöst",
      "Weil es ein verbotenes Schwermetall für rote Pigmente ist",
      "Weil solche Gele ganz ohne Schicht sofort an der Luft härten",
      "Weil der Zusatz jeden Nagel nach Stunden dauerhaft gelb färbt"
    ],
    "explanation": "Hydroxyethylmethacrylat (HEMA) sorgt für tolle Haftung, ist aber ein winziges Molekül, das bei Hautkontakt leicht in tiefere Schichten eindringt und Allergien triggern kann.",
    "exp": "Hydroxyethylmethacrylat (HEMA) sorgt für tolle Haftung, ist aber ein winziges Molekül, das bei Hautkontakt leicht in tiefere Schichten eindringt und Allergien triggern kann."
  },

  // =========================================================================
  // 2. NAGELFORMEN, TRENDS & NAIL ART (16 Fragen: 5 easy, 8 mid, 3 pro)
  // =========================================================================
  {
    "cat": "formen_trends",
    "diff": "easy",
    "q": "Wodurch zeichnet sich die extrem beliebte Nagelform „Almond“ auf den ersten Blick aus?",
    "a": [
      "Schlanke Seitenlinien, die sanft zu einer runden Spitze laufen",
      "Völlig gerade Seitenkanten mit exakt rechtwinkligen scharfen Ecken",
      "Eine spitz gefeilte Kante, die vorn abrupt völlig flach abschließt",
      "Eine extrem lange und nadelspitze Form mit starkem Gefälle"
    ],
    "explanation": "Wie eine echte Mandel geformt, streckt die Almond-Form die Finger optisch und gehört zu den zeitlosen Alltagsfavoriten, weil sie ohne spitze Ecken kaum hängen bleibt.",
    "exp": "Wie eine echte Mandel geformt, streckt die Almond-Form die Finger optisch und gehört zu den zeitlosen Alltagsfavoriten, weil sie ohne spitze Ecken kaum hängen bleibt."
  },
  {
    "cat": "formen_trends",
    "diff": "easy",
    "q": "Welche typische Optik steckt hinter einer klassischen „French Manicure“?",
    "a": [
      "Zarte Naturbasis kombiniert mit einer weißen Spitze",
      "Tiefroter Vollton mit kleinen goldenen Steinchen vorn",
      "Dunkler Farbverlauf von Schwarz bis zu hellem Grau",
      "Matte Oberfläche mit glänzenden Streifen quer darüber"
    ],
    "explanation": "Die weiße Spitze entlang der sogenannten Smile-Line imitiert den sauberen freien Nagelrand – heute wird sie aber auch gern knallbunt als „Colored French“ getragen.",
    "exp": "Die weiße Spitze entlang der sogenannten Smile-Line imitiert den sauberen freien Nagelrand – heute wird sie aber auch gern knallbunt als „Colored French“ getragen."
  },
  {
    "cat": "formen_trends",
    "diff": "easy",
    "q": "Wie entsteht der schimmernde Effekt bei einem angesagten „Cat-Eye“-Nageldesign?",
    "a": [
      "Ein Magnet zieht feine Metallpartikel im feuchten Gel zusammen",
      "Ein spezieller Schwamm tupft drei Glitzerlacke weich übereinander",
      "Eine dünne Folie wird mithilfe von Hitze auf das Design gepresst",
      "Ein feiner Pinsel zieht hauchdünne weiße Linien über dunklen Lack"
    ],
    "explanation": "Im Cat-Eye-Gel schwimmen winzige magnetische Pigmente. Hält man vor dem Aushärten einen Magneten darüber, entsteht ein faszinierender 3D-Lichtstreifen wie bei einem Katzenauge.",
    "exp": "Im Cat-Eye-Gel schwimmen winzige magnetische Pigmente. Hält man vor dem Aushärten einen Magneten darüber, entsteht ein faszinierender 3D-Lichtstreifen wie bei einem Katzenauge."
  },
  {
    "cat": "formen_trends",
    "diff": "easy",
    "q": "Was verbindet die beiden Formen „Square“ und „Oval“ in der beliebten Mischform „Squoval“?",
    "a": [
      "Gerade Nagelspitze kombiniert mit sanft runden Ecken",
      "Nadelspitze Front kombiniert mit bauchigen Seitenlinien",
      "Nach innen gewölbte Spitze kombiniert mit scharfen Kanten",
      "Rund gefeilte Kappe kombiniert mit extrem schrägen Flanken"
    ],
    "explanation": "„Square“ plus „Oval“ ergibt Squoval: Sie wirkt genauso aufgeräumt wie ein klassischer eckiger Nagel, stößt sich aber durch die weichen Ecken deutlich seltener an.",
    "exp": "„Square“ plus „Oval“ ergibt Squoval: Sie wirkt genauso aufgeräumt wie ein klassischer eckiger Nagel, stößt sich aber durch die weichen Ecken deutlich seltener an."
  },
  {
    "cat": "formen_trends",
    "diff": "easy",
    "q": "Welcher Look verbirgt sich hinter dem modernen Trendbegriff „Glazed Donut Nails“?",
    "a": [
      "Milchiger Naturton mit zartem, perlmuttartigem Schimmer",
      "Klebriger Zuckerguss-Effekt aus groben bunten Streuseln",
      "Matter Schokoladenton mit krümeliger Struktur an der Spitze",
      "Knalliges Neonpink mit dicken Tropfen aus klarem Aufbaugel"
    ],
    "explanation": "Hailey Bieber machte den Look 2022 viral: Ein Hauch weißes Chrome-Puder über einer milchig-transparenten Basis lässt die Nägel glänzen wie einen frisch glasierten Donut.",
    "exp": "Hailey Bieber machte den Look 2022 viral: Ein Hauch weißes Chrome-Puder über einer milchig-transparenten Basis lässt die Nägel glänzen wie einen frisch glasierten Donut."
  },
  {
    "cat": "formen_trends",
    "diff": "mid",
    "q": "Was unterscheidet die Nagelform „Coffin“ (auch „Ballerina“ genannt) von einer klassischen eckigen Square-Form?",
    "a": [
      "Die Seiten laufen schmaler zur geraden Spitze hin zusammen",
      "Die Spitze endet in einer runden Kuppel ohne gerade Kante",
      "Die Seiten werden nach vorn hin immer breiter wie ein Fächer",
      "Der gesamte Nagel wird kürzer gefeilt als das eigene Nagelbett"
    ],
    "explanation": "Weil sich die Seiten verjüngen und vorn gerade abschließen, erinnert die Silhouette entweder an Ballettschuhe oder eben an einen Sarg („Coffin“) – bei gleicher Grundidee.",
    "exp": "Weil sich die Seiten verjüngen und vorn gerade abschließen, erinnert die Silhouette entweder an Ballettschuhe oder eben an einen Sarg („Coffin“) – bei gleicher Grundidee."
  },
  {
    "cat": "formen_trends",
    "diff": "mid",
    "q": "Wie entsteht der weiche, romantische Verlauf beim sogenannten „Babyboomer“-Design?",
    "a": [
      "Milchiges Weiß an der Spitze verblendet weich in zartes Rosé",
      "Drei leuchtende Pastelltöne wechseln sich pro Finger einzeln ab",
      "Feiner Goldstaub wird als scharfer Streifen entlang des Betts gemalt",
      "Kleine weiße Punkte bilden ein symmetrisches Muster über dem Lack"
    ],
    "explanation": "Der Babyboomer ist die weiche Schwester der French Manicure: Statt einer harten weißen Linie verschwimmen Spitze und Nagelbett zu einem nahtlosen Farbverlauf.",
    "exp": "Der Babyboomer ist die weiche Schwester der French Manicure: Statt einer harten weißen Linie verschwimmen Spitze und Nagelbett zu einem nahtlosen Farbverlauf."
  },
  {
    "cat": "formen_trends",
    "diff": "mid",
    "q": "Wie trägt man echtes Chrome-Puder im Studio auf, damit der spiegelnde Metallic-Effekt auch wirklich makellos gelingt?",
    "a": [
      "Trocken auf frisch gehärtetes No-Wipe-Gel sanft einreiben",
      "Mit etwas Aceton anrühren und wie normalen Lack aufpinseln",
      "In die nasse Schwitzschicht streuen und den Rest wegpusten",
      "Mit klarem Wasser direkt auf den unlackierten Nagel kleben"
    ],
    "explanation": "Auf einer spiegelglatten, komplett trockenen Top-Coat-Fläche richten sich die mikroskopischen Flakes beim Einreiben flach aus – erst dann entsteht der echte Spiegeleffekt.",
    "exp": "Auf einer spiegelglatten, komplett trockenen Top-Coat-Fläche richten sich die mikroskopischen Flakes beim Einreiben flach aus – erst dann entsteht der echte Spiegeleffekt."
  },
  {
    "cat": "formen_trends",
    "diff": "mid",
    "q": "Wie funktioniert die sogenannte „Stamping“-Technik für filigrane Ornamente oder Geometrie-Muster?",
    "a": [
      "Motiv per Silikonkissen von gravierter Platte abnehmen",
      "Muster mit heißem Brennstab vorsichtig ins Acryl drücken",
      "Kunststoffschablone aufkleben und mit dem Fräser ausschneiden",
      "Papiervorlage in warmes Wasser legen und auf den Lack schieben"
    ],
    "explanation": "Lack auf die gravierte Stahlplatte, überschüssige Farbe mit einer Karte abziehen, kurz mit dem klaren Silikonstempel abnehmen und gezielt auf dem Nagel abrollen – fertig!",
    "exp": "Lack auf die gravierte Stahlplatte, überschüssige Farbe mit einer Karte abziehen, kurz mit dem klaren Silikonstempel abnehmen und gezielt auf dem Nagel abrollen – fertig!"
  },
  {
    "cat": "formen_trends",
    "diff": "mid",
    "q": "Welcher Unterschied besteht beim Nageldesign zwischen dem Trendwort „Ombré“ und einer „Micro-French“?",
    "a": [
      "Sanfter Farbverlauf versus hauchdünne Spitzenlinie",
      "Matte Erdtöne versus ausschließlich bunte Steinchen",
      "Nur für kurze Fußnägel versus nur für lange Stilettos",
      "Kleben mit Folien versus Sprühen mit der Airbrush"
    ],
    "explanation": "Während beim Ombré zwei oder mehr Farben weich ineinanderfließen, setzt die Micro-French auf Minimalismus: eine hauchdünne, nur etwa einen Millimeter breite Farblinie ganz vorn.",
    "exp": "Während beim Ombré zwei oder mehr Farben weich ineinanderfließen, setzt die Micro-French auf Minimalismus: eine hauchdünne, nur etwa einen Millimeter breite Farblinie ganz vorn."
  },
  {
    "cat": "formen_trends",
    "diff": "mid",
    "q": "Wie bringt man metallische Transferfolien im Studio sauber und vollflächig auf das Design?",
    "a": [
      "Auf spezielles Gel fest aufdrücken und zügig abziehen",
      "Mit Nagelkleber bestreichen und dauerhaft drunter lassen",
      "In kleine Schnipsel schneiden und im Wasserbad auflösen",
      "Mit heißer Bügelzange direkt auf den Naturnagel pressen"
    ],
    "explanation": "Bei Transferfolien bleibt nicht die ganze Plastikfolie auf dem Nagel: Nur die dünne Metall- oder Motivbeschichtung löst sich durch die starke Klebekraft des ausgehärteten Folien-Gels.",
    "exp": "Bei Transferfolien bleibt nicht die ganze Plastikfolie auf dem Nagel: Nur die dünne Metall- oder Motivbeschichtung löst sich durch die starke Klebekraft des ausgehärteten Folien-Gels."
  },
  {
    "cat": "formen_trends",
    "diff": "mid",
    "q": "Welches charakteristische Merkmal hat die dramatische Kunstnagelform „Stiletto“?",
    "a": [
      "Eine lange, schmale Form mit nadelspitzem Ende",
      "Eine ultrakurze, runde Form genau passend zur Kuppe",
      "Eine nach oben gebogene Form mit eckigen Kanten vorn",
      "Eine breite, trapezförmige Spitze wie eine Schaufel"
    ],
    "explanation": "Benannt nach dem italienischen Stilett-Dolch, erfordert die extreme Spitze viel Länge und Stabilität – im Alltag eine echte Kunst beim Tippen auf dem Smartphone!",
    "exp": "Benannt nach dem italienischen Stilett-Dolch, erfordert die extreme Spitze viel Länge und Stabilität – im Alltag eine echte Kunst beim Tippen auf dem Smartphone!"
  },
  {
    "cat": "formen_trends",
    "diff": "mid",
    "q": "Worauf muss ein Nageldesigner beim Befestigen von größeren Strasssteinen achten, damit das Funkeln nicht verloren geht?",
    "a": [
      "Am Sockel einbetten, doch die oberen Facetten freilassen",
      "Den gesamten Stein mit drei Schichten Versiegler übermalen",
      "Den Stein mit Handcreme auf den feuchten Lack drücken",
      "Die glatte Rückseite vor dem Auflegen mit Grobfeile anrauen"
    ],
    "explanation": "Überlackiert man geschliffene Kristallsteinchen komplett, füllt das Gel die feinen Facetten auf und nimmt ihnen das Feuer. Besser ist es, sie nur rundherum am Sockel einzufassen.",
    "exp": "Überlackiert man geschliffene Kristallsteinchen komplett, füllt das Gel die feinen Facetten auf und nimmt ihnen das Feuer. Besser ist es, sie nur rundherum am Sockel einzufassen."
  },
  {
    "cat": "formen_trends",
    "diff": "pro",
    "q": "Was bezeichnet der Trend „Aura Nails“, der regelmäßig durch Beauty-Feeds wandert?",
    "a": [
      "Weich verblendetes Leuchten in der Nagelmitte",
      "Komplettes Bekleben mit winzigen weißen Perlen",
      "Eine Form, die im Dunkeln durch Phosphor leuchtet",
      "Eine Technik, bei der jeder Finger kürzer wird"
    ],
    "explanation": "Inspiriert von spiritueller Aurafotografie entsteht in der Mitte ein weicher, vernebelter Farbkern – entweder per Airbrush-Pistole oder geschickt mit Lidschattenpuder auf mattem Gel.",
    "exp": "Inspiriert von spiritueller Aurafotografie entsteht in der Mitte ein weicher, vernebelter Farbkern – entweder per Airbrush-Pistole oder geschickt mit Lidschattenpuder auf mattem Gel."
  },
  {
    "cat": "formen_trends",
    "diff": "pro",
    "q": "Was verbirgt sich in der Studiosprache hinter der „Russian Manicure“ oder auch „Dry Manicure“?",
    "a": [
      "Akribische Falz-Reinigung per Fräser ganz ohne Wasserbad",
      "Traditionelles Einweichen der Hände in warmem Rosenöl",
      "Besonders lange Verlängerung mit eingearbeiteten Blüten",
      "Auftragen von rotem Lack mit großem Abstand zur Haut"
    ],
    "explanation": "Ohne aufquellendes Wasserbad wird die abgestorbene Haut mit Diamantbits extrem präzise entfernt, sodass die Farbe direkt unter die Hautfalte gesetzt werden kann und später rauswächst.",
    "exp": "Ohne aufquellendes Wasserbad wird die abgestorbene Haut mit Diamantbits extrem präzise entfernt, sodass die Farbe direkt unter die Hautfalte gesetzt werden kann und später rauswächst."
  },
  {
    "cat": "formen_trends",
    "diff": "pro",
    "q": "Welche optische Illusion nutzt der Designer, wenn er eine klassische „Reverse French“ (oder Moon Manicure) aufmalt?",
    "a": [
      "Der farbige Bogen sitzt am Ansatz statt an der Spitze",
      "Die weiße Farbe wird auf die Unterseite gepinselt",
      "Der Daumen bekommt als Einziger ein umgedrehtes Muster",
      "Der Lack wird nach vorn hin komplett durchsichtig"
    ],
    "explanation": "Schon in den 1920ern war die Moon Manicure der Hit: Damals sparte man den Halbmond am Ansatz unlackiert aus – heute setzt man ihn oft als goldenen oder schwarzen Kontrastbogen in Szene.",
    "exp": "Schon in den 1920ern war die Moon Manicure der Hit: Damals sparte man den Halbmond am Ansatz unlackiert aus – heute setzt man ihn oft als goldenen oder schwarzen Kontrastbogen in Szene."
  },

  // =========================================================================
  // 3. FUSSNÄGEL & PEDIKÜRE (16 Fragen: 5 easy, 8 mid, 3 pro)
  // =========================================================================
  {
    "cat": "fuesse_pedikuere",
    "diff": "easy",
    "q": "Wie sollte man gesunde Fußnägel im Alltag am besten schneiden oder feilen, um schmerzhaftes Einwachsen zu vermeiden?",
    "a": [
      "Gerade abschneiden und seitliche Ecken nicht tief ausrunden",
      "Beide äußeren Ecken tief im Bogen bis ins Nagelbett kappen",
      "Alle Zehennägel nach dem Baden ganz spitz wie Mandeln formen",
      "Die Nägel immer deutlich kürzer als das Zehenpolster kappen"
    ],
    "explanation": "Schneidet man die Ecken zu rund und tief ab, drückt der weiche Nagelfalz darüber – beim Nachwachsen bohrt sich der Nagelrand dann direkt in die Haut.",
    "exp": "Schneidet man die Ecken zu rund und tief ab, drückt der weiche Nagelfalz darüber – beim Nachwachsen bohrt sich der Nagelrand dann direkt in die Haut."
  },
  {
    "cat": "fuesse_pedikuere",
    "diff": "easy",
    "q": "Warum hält Shellac oder UV-Lack auf Fußnägeln im Vergleich zu Fingernägeln oft doppelt oder dreimal so lange?",
    "a": [
      "Zehennägel wachsen viel langsamer und stoßen seltener an",
      "Auf Füßen kommt automatisch ein deutlich stärkerer Kleber drauf",
      "Die Haut am Fuß gibt kein natürliches Fett an die Platte ab",
      "Socken polieren den UV-Lack beim Laufen täglich immer nach"
    ],
    "explanation": "Während man an den Händen nach drei Wochen schon einen deutlichen Herauswuchs sieht, sieht eine Shellac-Pediküre oft nach sechs Wochen noch erstaunlich frisch aus!",
    "exp": "Während man an den Händen nach drei Wochen schon einen deutlichen Herauswuchs sieht, sieht eine Shellac-Pediküre oft nach sechs Wochen noch erstaunlich frisch aus!"
  },
  {
    "cat": "fuesse_pedikuere",
    "diff": "easy",
    "q": "Was ist der grundlegende Unterschied zwischen den Nägeln an unseren Fingern und denen an den Zehen?",
    "a": [
      "Zehennägel sind merklich dicker und wachsen viel langsamer",
      "Zehennägel bestehen aus festem Knorpel statt aus Keratin",
      "Zehennägel besitzen überhaupt keine lebende Wachstumszone",
      "Zehennägel wachsen im Sommer exakt so fix wie die Finger"
    ],
    "explanation": "Fingernägel schaffen rund drei Millimeter pro Monat, Fußnägel nur etwa einen Millimeter. Darum braucht ein komplett verletzter Großzehennagel oft über ein Jahr zum Nachwachsen.",
    "exp": "Fingernägel schaffen rund drei Millimeter pro Monat, Fußnägel nur etwa einen Millimeter. Darum braucht ein komplett verletzter Großzehennagel oft über ein Jahr zum Nachwachsen."
  },
  {
    "cat": "fuesse_pedikuere",
    "diff": "easy",
    "q": "Wozu bildet unsere Fußsohle an stark belasteten Stellen wie Ferse oder Ballen überhaupt Hornhaut?",
    "a": [
      "Als Schutzschild der Haut gegen ständigen Druck und Reibung",
      "Als überschüssiger Schweiß, der an der trockenen Luft fest wird",
      "Als Reaktion auf zu lange und spitz gefeilte Nägel in Socken",
      "Als Anzeichen dafür, dass zu wenig Pflegeöl verwendet wurde"
    ],
    "explanation": "Hornhaut ist ein cleverer Schutzmechanismus! Genau deshalb rächt sich zu radikales Abraspeln: Die Haut fühlt sich bedroht und bildet noch schneller neue, dickere Schichten.",
    "exp": "Hornhaut ist ein cleverer Schutzmechanismus! Genau deshalb rächt sich zu radikales Abraspeln: Die Haut fühlt sich bedroht und bildet noch schneller neue, dickere Schichten."
  },
  {
    "cat": "fuesse_pedikuere",
    "diff": "easy",
    "q": "Welcher pflegende Wirkstoff steckt in vielen guten Fußcremes, weil er raue Fersen und trockene Hornhaut besonders effektiv geschmeidig macht?",
    "a": [
      "Harnstoff (meist bekannt unter der Bezeichnung Urea)",
      "Reines Aceton aus der klassischen Lackentfernung",
      "Feines Quarzpulver zum direkten Polieren der Zehen",
      "Flüssiges Monomer aus der klassischen Acrylmodellage"
    ],
    "explanation": "Urea bindet Feuchtigkeit tief in der Hornschicht und löst trockene Schüppchen sanft auf – in Fußcremes liegt der Anteil oft bei fünf bis zehn Prozent.",
    "exp": "Urea bindet Feuchtigkeit tief in der Hornschicht und löst trockene Schüppchen sanft auf – in Fußcremes liegt der Anteil oft bei fünf bis zehn Prozent."
  },
  {
    "cat": "fuesse_pedikuere",
    "diff": "mid",
    "q": "Worin liegt in Deutschland der entscheidende Unterschied zwischen kosmetischer Fußpflege und medizinischer Podologie?",
    "a": [
      "Staatlich geprüfter Heilberuf für kranke oder gefährdete Füße",
      "Kosmetische Fußpfleger arbeiten allein auf ärztliches Rezept",
      "Podologen lackieren Zehen grundsätzlich nur mit Klarlack",
      "Beide Begriffe stehen gesetzlich für den gleichen Beruf"
    ],
    "explanation": "„Podologe“ ist eine gesetzlich geschützte Berufsbezeichnung mit zweijähriger Ausbildung. Besonders Diabetiker oder Menschen mit Durchblutungsstörungen gehören in podologische Hände.",
    "exp": "„Podologe“ ist eine gesetzlich geschützte Berufsbezeichnung mit zweijähriger Ausbildung. Besonders Diabetiker oder Menschen mit Durchblutungsstörungen gehören in podologische Hände."
  },
  {
    "cat": "fuesse_pedikuere",
    "diff": "mid",
    "q": "Warum rät man bei Fußnägeln im geschlossenen Schuhwerk fast immer von einem dicken Gel-Aufbau mit starkem Apex ab?",
    "a": [
      "Die harte Modellage drückt beim Abrollen stark aufs Nagelbett",
      "Dickes Gel wird durch Fußschweiß innerhalb eines Tages weich",
      "Unter Socken härtet UV-Gel beim Laufen immer weiter nach",
      "Im Studio passen nur dünne Zehen unter die normale UV-Lampe"
    ],
    "explanation": "Auf den Füßen trägt man Gelfarbe oder Shellac hauchdünn auf! Ein dicker Aufbau würde in Turnschuhen oder Stiefeln bei jedem Schritt Druck auf die Wurzel ausüben und Blutergüsse begünstigen.",
    "exp": "Auf den Füßen trägt man Gelfarbe oder Shellac hauchdünn auf! Ein dicker Aufbau würde in Turnschuhen oder Stiefeln bei jedem Schritt Druck auf die Wurzel ausüben und Blutergüsse begünstigen."
  },
  {
    "cat": "fuesse_pedikuere",
    "diff": "mid",
    "q": "Warum sollte man Hornhaut an den Füßen niemals bis auf die rosige, ganz weiche Hautschicht herunterhobeln?",
    "a": [
      "Es drohen Risse und die Haut wuchert bald stärker nach",
      "Ohne Hornhaut verliert man sofort Halt beim Barfußlaufen",
      "Zehennägel wachsen dann sichtbar schneller nach unten",
      "Jede normale Fußcreme brennt dann direkt auf der Stelle"
    ],
    "explanation": "Weniger ist hier echt mehr: Eine dünne, elastische Schutzschicht muss an Ferse und Ballen bleiben, damit die Haut geschmeidig abfedert und nicht einreißt.",
    "exp": "Weniger ist hier echt mehr: Eine dünne, elastische Schutzschicht muss an Ferse und Ballen bleiben, damit die Haut geschmeidig abfedert und nicht einreißt."
  },
  {
    "cat": "fuesse_pedikuere",
    "diff": "mid",
    "q": "Warum gehört ein klassisches, langes warmes Fußbad vor der Pediküre bei vielen modernen Fachleuten heute nicht mehr zum Standard?",
    "a": [
      "Aufgequollene Platten erschweren das Arbeiten und die Haftung",
      "Warmes Wasser entzieht den Zehennägeln ihr komplettes Keratin",
      "Im Bad verformen sich eingewachsene Nägel oft für Monate",
      "Nach einem Fußbad lässt sich Hornhaut nicht mehr erkennen"
    ],
    "explanation": "Genau wie an den Händen dehnt sich der Nagel im Wasser leicht aus und schrumpft beim Trocknen wieder – dadurch hält UV-Lack schlechter. Auch Hornhaut lässt sich trocken viel präziser beurteilen.",
    "exp": "Genau wie an den Händen dehnt sich der Nagel im Wasser leicht aus und schrumpft beim Trocknen wieder – dadurch hält UV-Lack schlechter. Auch Hornhaut lässt sich trocken viel präziser beurteilen."
  },
  {
    "cat": "fuesse_pedikuere",
    "diff": "mid",
    "q": "Was löst bei Joggern oder Wanderern häufig einen blauen „Sportler-Zehennagel“ (subunguales Hämatom) aus?",
    "a": [
      "Wiederholtes Anstoßen des Zehs an der engen Schuhkappe",
      "Akuter Eisenmangel durch starkes Schwitzen in den Socken",
      "Fehlende Luftzufuhr unter einer klaren Schicht Nagellack",
      "Ein eingeklemmter Nerv im Knie beim steilen Bergauflaufen"
    ],
    "explanation": "Vor allem bergab rutscht der Fuß im Schuh minimal nach vorn. Prallt der lange Zeh tausendmal gegen die Kappe, platzen feine Gefäße unterm Nagelbett – deshalb Laufschuhe immer eine Nummer größer kaufen!",
    "exp": "Vor allem bergab rutscht der Fuß im Schuh minimal nach vorn. Prallt der lange Zeh tausendmal gegen die Kappe, platzen feine Gefäße unterm Nagelbett – deshalb Laufschuhe immer eine Nummer größer kaufen!"
  },
  {
    "cat": "fuesse_pedikuere",
    "diff": "mid",
    "q": "Welche goldene Regel gilt, wenn man sich für den Sommer-Urlaub eine dunkle oder kräftige Farbe auf den Fußnägeln mit Shellac wünscht?",
    "a": [
      "Immer eine klare Basisschicht nutzen gegen Verfärbungen",
      "Zehennägel nach dem Termin zwei Tage trocken halten",
      "Vor dem Farbauftrag eine dicke Schicht Handcreme massieren",
      "Die Farbe stets drei Millimeter über die Haut streichen"
    ],
    "explanation": "Gerade rote, blaue oder schwarze Pigmente können tief in die poröse Hornschicht wandern. Ein guter Base Coat wirkt wie ein Schutzschild – egal ob normaler Lack oder UV-Lack.",
    "exp": "Gerade rote, blaue oder schwarze Pigmente können tief in die poröse Hornschicht wandern. Ein guter Base Coat wirkt wie ein Schutzschild – egal ob normaler Lack oder UV-Lack."
  },
  {
    "cat": "fuesse_pedikuere",
    "diff": "mid",
    "q": "Warum sollte man frischen Shellac auf den Fußnägeln nicht einfach über mehrere Monate hinweg ungekürzt herauswachsen lassen?",
    "a": [
      "Zu lange Nägel stoßen im Schuh an und hebeln sich hoch",
      "Nach sechs Wochen verliert UV-Lack im Dunkeln die Bindung",
      "Die Farbe frisst sich nach acht Wochen durchs Nagelbett",
      "Ab dem zweiten Monat verfärbt die Lampe den freien Rand"
    ],
    "explanation": "Da Fußnägel so lange halten, vergessen viele Kunden den Kontrollblick! Stößt der zu lang gewordene, harte Nagel vorn an die Schuhspitze, können sich feine Liftings bilden, unter denen sich Feuchtigkeit staut.",
    "exp": "Da Fußnägel so lange halten, vergessen viele Kunden den Kontrollblick! Stößt der zu lang gewordene, harte Nagel vorn an die Schuhspitze, können sich feine Liftings bilden, unter denen sich Feuchtigkeit staut."
  },
  {
    "cat": "fuesse_pedikuere",
    "diff": "mid",
    "q": "Was ist das medizinisch relevante Problem an den berühmten „Fisch-Spas“ (Knabberfischen) bei der Pediküre?",
    "a": [
      "Fische und Becken lassen sich zwischen Kunden nicht sterilisieren",
      "Die kleinen Fische beißen regelmäßig gesunde Fußnägel ganz ab",
      "Das Wasser muss so heiß sein, dass sich die Haut schmerzhaft löst",
      "Die Fische geben Stoffe ab, die jeden Nagellack sofort auflösen"
    ],
    "explanation": "Aus strengen Hygienegründen sind Knabberfisch-Becken in vielen Ländern und Bundesländern stark reglementiert oder verboten, weil Keime über Mikroverletzungen weitergegeben werden könnten.",
    "exp": "Aus strengen Hygienegründen sind Knabberfisch-Becken in vielen Ländern und Bundesländern stark reglementiert oder verboten, weil Keime über Mikroverletzungen weitergegeben werden könnten."
  },
  {
    "cat": "fuesse_pedikuere",
    "diff": "pro",
    "q": "Wie nennt man das kosmetische Spezialverfahren, mit dem nach einer Verletzung ein fehlendes Stück Großzehennagel optisch ersetzt wird?",
    "a": [
      "Nagelprothetik mit elastischem Gel (oft pilzhemmend)",
      "Fiberglas-Verlängerung mit starren Plastik-Schablonen",
      "Chirurgisches Einsetzen einer dünnen Platte aus Titan",
      "Fixieren einer Keramikkappe mit normalem Sekundenkleber"
    ],
    "explanation": "Anders als starres Fingergel bleibt podologisches Prothetikgel leicht flexibel, damit es beim Abrollen des Fußes nicht vom Restnagel abreißt – oft enthält es zudem Wirkstoffe gegen Pilzbefall.",
    "exp": "Anders als starres Fingergel bleibt podologisches Prothetikgel leicht flexibel, damit es beim Abrollen des Fußes nicht vom Restnagel abreißt – oft enthält es zudem Wirkstoffe gegen Pilzbefall."
  },
  {
    "cat": "fuesse_pedikuere",
    "diff": "pro",
    "q": "Womit korrigieren Podologen einen stark eingerollten oder eingewachsenen Zehennagel ganz ohne schmerzhafte Operation?",
    "a": [
      "Mit einer geklebten oder eingehängten Korrekturspange",
      "Mit einer täglichen Feilkur direkt quer durch die Mitte",
      "Mit dem Einlegen warmer Wachsplatten über drei Monate",
      "Mit dem dauerhaften Abtragen der kompletten Hornschicht"
    ],
    "explanation": "Ähnlich wie eine Zahnspange zieht eine feine Draht- oder Kunststoffspange die seitlichen Nagelränder über Monate sanft nach oben, sodass der Nagel wieder flach und schmerzfrei nachwächst.",
    "exp": "Ähnlich wie eine Zahnspange zieht eine feine Draht- oder Kunststoffspange die seitlichen Nagelränder über Monate sanft nach oben, sodass der Nagel wieder flach und schmerzfrei nachwächst."
  },
  {
    "cat": "fuesse_pedikuere",
    "diff": "pro",
    "q": "Was unterscheidet ein echtes Hühnerauge (Clavus) medizinisch von einer normalen, großflächigen Hornhautschwielen-Stelle?",
    "a": [
      "Ein harter Hornhautkegel wächst keilförmig tief nach innen",
      "Ein Hühnerauge entsteht allein durch Viren im Schwimmbad",
      "Hornhautschwielen treten immer nur unter dem Zehennagel auf",
      "Ein Hühnerauge löst sich nach jedem warmen Fußbad selbst ab"
    ],
    "explanation": "Wenn punktueller Schuhdruck anhält, drückt die Haut einen dichten Dorn aus Hornhaut nach innen Richtung Knochenhaut – genau dieser tiefe Kern löst beim Auftreten das stechende Gefühl aus.",
    "exp": "Wenn punktueller Schuhdruck anhält, drückt die Haut einen dichten Dorn aus Hornhaut nach innen Richtung Knochenhaut – genau dieser tiefe Kern löst beim Auftreten das stechende Gefühl aus."
  },

  // =========================================================================
  // 4. ANATOMIE, PFLEGE, WERKZEUG & MYTHEN (15 Fragen: 5 easy, 7 mid, 3 pro)
  // =========================================================================
  {
    "cat": "anatomie_mythen",
    "diff": "easy",
    "q": "Was steckt wirklich hinter dem beliebten Ratschlag, dass man seinen Nägeln zwischen Gel-Terminen eine Pause gönnen muss, damit sie „atmen“ können?",
    "a": [
      "Ein Mythos – totes Keratin braucht keine Luft von außen",
      "Eine Tatsache – ohne Luftzug ersticken die Zellen sofort",
      "Ein Muss – die Wurzel zieht Sauerstoff durch den Lack",
      "Eine Regel – weil Acryl nach vier Wochen luftdicht wird"
    ],
    "explanation": "Unsere Nagelplatte ist genau wie das Haupthaar verhorntes, totes Material. Alle Nährstoffe und der Sauerstoff für frisches Wachstum kommen von innen über das Blutgefäßnetz in der Wurzel!",
    "exp": "Unsere Nagelplatte ist genau wie das Haupthaar verhorntes, totes Material. Alle Nährstoffe und der Sauerstoff für frisches Wachstum kommen von innen über das Blutgefäßnetz in der Wurzel!"
  },
  {
    "cat": "anatomie_mythen",
    "diff": "easy",
    "q": "Was verursacht meistens diese kleinen weißen Flecken oder Pünktchen, die manchmal mitten auf dem Fingernagel auftauchen?",
    "a": [
      "Harmlose winzige Stöße im Bereich der Nagelwurzel",
      "Ein sicherer Beweis für starken Kalziummangel im Blut",
      "Eine typische Spätfolge vom Händewaschen mit Seife",
      "Eingeschlossene Seifenreste unter der Klarlackschicht"
    ],
    "explanation": "Der Kalzium-Mythos hält sich hartnäckig, stimmt aber fast nie! Meistens hat man sich Wochen vorher leicht gestoßen, wodurch kleine Lufteinschlüsse zwischen den Hornlamellen entstanden sind.",
    "exp": "Der Kalzium-Mythos hält sich hartnäckig, stimmt aber fast nie! Meistens hat man sich Wochen vorher leicht gestoßen, wodurch kleine Lufteinschlüsse zwischen den Hornlamellen entstanden sind."
  },
  {
    "cat": "anatomie_mythen",
    "diff": "easy",
    "q": "Was bedeutet der angegebene „Grit“-Wert (zum Beispiel 100 oder 240) auf einer Nagelfeile?",
    "a": [
      "Feinheit der Körnung – höhere Zahl heißt sanfter",
      "Maximale Lebensdauer in Tagen bei täglicher Nutzung",
      "Anzahl der Arbeitsschritte bis zum echten Hochglanz",
      "Empfohlene Geschwindigkeit in Zügen pro Minute"
    ],
    "explanation": "Die Zahl gibt an, wie viele Schleifkörner pro Quadratzoll auf dem Papier sitzen. Eine 80er oder 100er ist grob für Acryl, während eine sanfte 180er oder 240er ideal für den Naturnagel ist.",
    "exp": "Die Zahl gibt an, wie viele Schleifkörner pro Quadratzoll auf dem Papier sitzen. Eine 80er oder 100er ist grob für Acryl, während eine sanfte 180er oder 240er ideal für den Naturnagel ist."
  },
  {
    "cat": "anatomie_mythen",
    "diff": "easy",
    "q": "Warum empfehlen Profis für die tägliche Pflege fast immer ein gutes Nagelöl statt nur einer normalen Handcreme?",
    "a": [
      "Öl hält die Platte elastisch und pflegt die Wurzel tief",
      "Öl härtet brüchige Nägel über Nacht so hart wie Acryl",
      "Handcreme löst jeden ausgehärteten UV-Lack sofort ab",
      "Nur reines Öl schützt Finger sicher vor Sonnenbrand"
    ],
    "explanation": "Hochwertiges Jojoba- oder Mandelöl hat besonders kleine Moleküle, die in die feinen Schichten einziehen. So bleibt der Nagel elastisch und bricht bei Stößen viel seltener ab.",
    "exp": "Hochwertiges Jojoba- oder Mandelöl hat besonders kleine Moleküle, die in die feinen Schichten einziehen. So bleibt der Nagel elastisch und bricht bei Stößen viel seltener ab."
  },
  {
    "cat": "anatomie_mythen",
    "diff": "easy",
    "q": "Was erkennt ein aufmerksamer Beobachter auf dem Nagel als hellen, halbkreisförmigen „Halbmond“ am Ansatz?",
    "a": [
      "Die Lunula als vorderen sichtbaren Teil der Matrix",
      "Eine kleine Luftblase unter einer trockenen Hautschicht",
      "Den ältesten Teil der Platte kurz vor dem Abblättern",
      "Eine Stelle, an der grundsätzlich kein Lack mehr hält"
    ],
    "explanation": "Die Lunula (lateinisch für „kleiner Mond“) schimmert weißlich, weil die Keratinzellen dort noch ganz frisch, weich und nicht komplett durchscheinend verhornt sind – am Daumen sieht man sie am besten!",
    "exp": "Die Lunula (lateinisch für „kleiner Mond“) schimmert weißlich, weil die Keratinzellen dort noch ganz frisch, weich und nicht komplett durchscheinend verhornt sind – am Daumen sieht man sie am besten!"
  },
  {
    "cat": "anatomie_mythen",
    "diff": "mid",
    "q": "Warum sollte man beim Feilen eines Naturnagels möglichst immer in eine Richtung streichen statt wild hin und her zu sägen?",
    "a": [
      "Weil rasches Hin-und-her-Reiben feine Hornschichten spaltet",
      "Weil die Feile sonst durch die starke Reibung sofort schmilzt",
      "Weil sich der Nagel durch Hin-und-her-Feilen gelb verfärbt",
      "Weil der Nagel nach jeder Rückwärtsbewegung kürzer wächst"
    ],
    "explanation": "Der Nagel besteht aus vielen aufeinanderliegenden Hornlamellen. Grobes Hin-und-her-Sägen raut die Kante wie ausgefranstes Holz auf und begünstigt das lästige Absplittern.",
    "exp": "Der Nagel besteht aus vielen aufeinanderliegenden Hornlamellen. Grobes Hin-und-her-Sägen raut die Kante wie ausgefranstes Holz auf und begünstigt das lästige Absplittern."
  },
  {
    "cat": "anatomie_mythen",
    "diff": "mid",
    "q": "Welche entscheidende Rolle spielt die „Nagelmatrix“ im verborgenen hinteren Bereich des Fingers oder Zehs?",
    "a": [
      "Sie ist die lebende Produktionsfabrik neuer Zellen",
      "Sie dient nur als weiches Polster unter dem Schuh",
      "Sie speichert überschüssiges Fett aus der Ernährung",
      "Sie sorgt dafür, dass der Nagel seine Wölbung verliert"
    ],
    "explanation": "Solange die Matrix gesund bleibt, wächst selbst ein verlorener Nagel komplett nach. Wird sie jedoch durch einen schweren Schlag vernarbt, bleibt der Nagel meist dauerhaft verformt.",
    "exp": "Solange die Matrix gesund bleibt, wächst selbst ein verlorener Nagel komplett nach. Wird sie jedoch durch einen schweren Schlag vernarbt, bleibt der Nagel meist dauerhaft verformt."
  },
  {
    "cat": "anatomie_mythen",
    "diff": "mid",
    "q": "Wofür nutzt man im Studio einen weichen Schaumstoff-„Buffer“ statt einer stabilen Pappfeile?",
    "a": [
      "Zum sanften Mattieren der Fläche und Glätten feiner Spuren",
      "Zum radikalen Kürzen einer dicken Acryl-Verlängerung",
      "Zum tiefen Auskratzen von Haut direkt unter der Kuppe",
      "Zum gleichmäßigen Auftragen von zähflüssigem Aufbaugel"
    ],
    "explanation": "Durch seinen weichen Schaumstoffkern passt sich der Buffer der natürlichen Nagelwölbung perfekt an, glättet winzige Rillen und mattiert die Platte, ohne unnötig Substanz wegzunehmen.",
    "exp": "Durch seinen weichen Schaumstoffkern passt sich der Buffer der natürlichen Nagelwölbung perfekt an, glättet winzige Rillen und mattiert die Platte, ohne unnötig Substanz wegzunehmen."
  },
  {
    "cat": "anatomie_mythen",
    "diff": "mid",
    "q": "Warum sollte man beim Zurückschieben der Nagelhaut sehr behutsam vorgehen und sie niemals großflächig wegschneiden?",
    "a": [
      "Die Haut bildet eine natürliche Dichtung gegen Keime",
      "Ohne diesen Rand fällt die ganze Platte bald schon ab",
      "Geschnittene Haut verwandelt sich schnell in Hornhaut",
      "Auf Haut ohne Rand haftet überhaupt kein Farblack mehr"
    ],
    "explanation": "Im Studio entfernt man nur die unsichtbare, tote Hautschicht (Cuticula) auf der Platte – der lebende Schutzwall dahinter (Eponychium) bleibt intakt, damit keine Bakterien eindringen können.",
    "exp": "Im Studio entfernt man nur die unsichtbare, tote Hautschicht (Cuticula) auf der Platte – der lebende Schutzwall dahinter (Eponychium) bleibt intakt, damit keine Bakterien eindringen können."
  },
  {
    "cat": "anatomie_mythen",
    "diff": "mid",
    "q": "Warum wachsen unsere Fingernägel laut Beobachtungen im Sommer und an der dominanten Hand meistens messbar schneller?",
    "a": [
      "Wärme und Bewegung kurbeln die Durchblutung der Wurzel an",
      "UV-Strahlung der Sonne verdoppelt die Dicke des Keratins",
      "Im Winter stellen alle Matrixzellen ihren Betrieb völlig ein",
      "Wasser aus Meer und Freibad dehnt die Nägel in die Länge"
    ],
    "explanation": "Tatsächlich wächst der Mittelfinger oft am schnellsten und der Daumen eher gemütlich – genau die Finger, die wir im Alltag besonders viel bewegen und damit besser durchbluten!",
    "exp": "Tatsächlich wächst der Mittelfinger oft am schnellsten und der Daumen eher gemütlich – genau die Finger, die wir im Alltag besonders viel bewegen und damit besser durchbluten!"
  },
  {
    "cat": "anatomie_mythen",
    "diff": "mid",
    "q": "Woran erkennt man im Nagelstudio sofort einen wirklich professionellen Umgang mit Metallwerkzeugen und Feilen?",
    "a": [
      "Metallzangen kommen steril verpackt, Schleifblätter frisch pro Kunde",
      "Alle Werkzeuge werden nach Gebrauch unter warmem Wasser gespült",
      "Eine einzige Feile wird fürs Jahr mit der Kundennummer beschriftet",
      "Die Fräserbits werden zwischen Terminen lediglich trocken abgebürstet"
    ],
    "explanation": "Pappfeilen lassen sich nie hundertprozentig sterilisieren – gute Studios nutzen entweder Einwegfeilen oder übergeben dem Kunden seine eigene Feile im Kuvert, während Metallinstrumente ins Desinfektionsbad und in den Sterilisator wandern.",
    "exp": "Pappfeilen lassen sich nie hundertprozentig sterilisieren – gute Studios nutzen entweder Einwegfeilen oder übergeben dem Kunden seine eigene Feile im Kuvert, während Metallinstrumente ins Desinfektionsbad und in den Sterilisator wandern."
  },
  {
    "cat": "anatomie_mythen",
    "diff": "mid",
    "q": "Warum fühlen sich die Naturnägel oft papierdünn und weich an, wenn man eine alte Gelmodellage gewaltsam selbst abgepult hat?",
    "a": [
      "Beim Abreißen werden oberste Keratinschichten mit weggerissen",
      "Das Gel hat während der Tragezeit das ganze Kalzium entzogen",
      "Unter dem Schutz hat der Nagel verlernt, neues Keratin zu bilden",
      "Die fehlende UV-Strahlung hat den Nagel unter Lack aufgeweicht"
    ],
    "explanation": "Nicht das Gel macht den Nagel dünn, sondern das Abknibbeln! Weil Primer und Gel extrem fest mit den oberen Keratinlamellen verbunden sind, reißt man beim Puhlen quasi Teile des eigenen Nagels mit ab.",
    "exp": "Nicht das Gel macht den Nagel dünn, sondern das Abknibbeln! Weil Primer und Gel extrem fest mit den oberen Keratinlamellen verbunden sind, reißt man beim Puhlen quasi Teile des eigenen Nagels mit ab."
  },
  {
    "cat": "anatomie_mythen",
    "diff": "pro",
    "q": "Was ist im Bereich des Nagelstudios der entscheidende Grund für eine grünliche Verfärbung („Greenie“) unter einer abgehobenen Gel-Ecke?",
    "a": [
      "Bakterien (Pseudomonas) vermehren sich im feuchten Spalt",
      "Schimmelpilze aus alten Pigmenten fressen sich ins Fleisch",
      "Eine Reaktion zwischen Kupfer im Wasser und dem Primer",
      "Eine harmlose Lichtbrechung durch zu dünnen Top Coat"
    ],
    "explanation": "Wenn sich Gel leicht hebt (Lifting), dringt beim Händewaschen Feuchtigkeit in die Ritze – perfekt für Pseudomonas-Bakterien, die ein grünliches Pigment abgeben. Ein Fall für sofortiges Entfernen und Austrocknen, kein Lack drüber!",
    "exp": "Wenn sich Gel leicht hebt (Lifting), dringt beim Händewaschen Feuchtigkeit in die Ritze – perfekt für Pseudomonas-Bakterien, die ein grünliches Pigment abgeben. Ein Fall für sofortiges Entfernen und Austrocknen, kein Lack drüber!"
  },
  {
    "cat": "anatomie_mythen",
    "diff": "pro",
    "q": "Welchen konkreten Zweck erfüllt das sogenannte „Hyponychium“ ganz vorn unter dem freien Rand des Nagels?",
    "a": [
      "Es versiegelt den Spalt zwischen Platte und Kuppe gegen Keime",
      "Es sorgt allein für den rosafarbenen Glanz der oberen Platte",
      "Es produziert neues Fett für eine weiche Haut an den Seiten",
      "Es bremst das Längenwachstum ab genau zwei Zentimetern"
    ],
    "explanation": "Wer extrem lange Nägel trägt, bemerkt manchmal, wie sich dieses zarte Häutchen ein Stück unter den freien Nagel mit vorschiebt – es ist die vordere Schutzbarriere für das empfindliche Nagelbett.",
    "exp": "Wer extrem lange Nägel trägt, bemerkt manchmal, wie sich dieses zarte Häutchen ein Stück unter den freien Nagel mit vorschiebt – es ist die vordere Schutzbarriere für das empfindliche Nagelbett."
  },
  {
    "cat": "anatomie_mythen",
    "diff": "pro",
    "q": "Welcher Unterschied besteht beim Vergleich einer echten Glasfeile mit einer groben Metallfeile?",
    "a": [
      "Geätztes Glas versiegelt die Kante ganz ohne Ausfransen",
      "Metall erwärmt das Keratin schonend und härtet die Spitze",
      "Eine Glasfeile nutzt sich nach drei Einsätzen völlig glatt",
      "Metallfeilen dürfen für Fußnägel nicht verkauft werden"
    ],
    "explanation": "Die mikroskopisch feine Struktur aus gehärtetem Kristallglas hinterlässt eine glatte Kante, während billige gestanzte Metallfeilen oft kleine Risse in den Rand schlagen.",
    "exp": "Die mikroskopisch feine Struktur aus gehärtetem Kristallglas hinterlässt eine glatte Kante, während billige gestanzte Metallfeilen oft kleine Risse in den Rand schlagen."
  },

  // =========================================================================
  // 5. GESCHICHTE, KULTUR & KURIOSES (10 Fragen: 3 easy, 5 mid, 2 pro)
  // =========================================================================
  {
    "cat": "geschichte_kurioses",
    "diff": "easy",
    "q": "Welches alltägliche Industrieprodukt inspirierte in den 1920er Jahren die französische Visagistin Michelle Ménard zum ersten modernen, glänzenden Nagellack?",
    "a": [
      "Hochglänzender Autolack auf Basis von Nitrocellulose",
      "Flüssiges Bienenwachs für die Pflege von Ölgemälden",
      "Bunte Druckertinte aus neuen Pariser Zeitungsdruckereien",
      "Hitzebeständiger Ofenlack für gusseiserne Küchenherde"
    ],
    "explanation": "Autos bekamen damals plötzlich knallige, spiegelglatte Nitrocellulose-Lacke! Michelle Ménard übertrug genau diese Chemie auf Fingernägel – kurz darauf entstand daraus gemeinsam mit den Revson-Brüdern der Weltkonzern Revlon.",
    "exp": "Autos bekamen damals plötzlich knallige, spiegelglatte Nitrocellulose-Lacke! Michelle Ménard übertrug genau diese Chemie auf Fingernägel – kurz darauf entstand daraus gemeinsam mit den Revson-Brüdern der Weltkonzern Revlon."
  },
  {
    "cat": "geschichte_kurioses",
    "diff": "easy",
    "q": "Für welchen Einsatzbereich wurde die moderne „French Manicure“ im Jahr 1975 in Los Angeles eigentlich ursprünglich erfunden?",
    "a": [
      "Für Hollywood-Filmsets bei schnellen Kostümwechseln",
      "Für Pariser Bäckereien gegen sichtbare Mehlreste",
      "Für Londoner Kliniken wegen strenger Hygienevorschriften",
      "Für New Yorker Konzertsäle als Kontrast zu Tasten"
    ],
    "explanation": "Jeff Pink (Gründer der Marke ORLY) tüftelte den Look in Los Angeles aus, damit Darsteller am Filmset nicht vor jedem Szenen- und Kleiderwechsel umlackiert werden mussten. Erst nach den Pariser Modenschauen taufte er ihn „French Manicure“!",
    "exp": "Jeff Pink (Gründer der Marke ORLY) tüftelte den Look in Los Angeles aus, damit Darsteller am Filmset nicht vor jedem Szenen- und Kleiderwechsel umlackiert werden mussten. Erst nach den Pariser Modenschauen taufte er ihn „French Manicure“!"
  },
  {
    "cat": "geschichte_kurioses",
    "diff": "easy",
    "q": "Womit färbten Herrscher wie Kleopatra oder Nofretete im Alten Ägypten ihre Nägel, um sofort ihren hohen Rang zu zeigen?",
    "a": [
      "Mit rotem bis rostbraunem Pflanzenfarbstoff aus Henna",
      "Mit reinem Blattgold, das mit Honig aufgeklebt wurde",
      "Mit zerstoßenem Lapislazuli in einer Paste aus Milch",
      "Mit tiefschwarzem Ruß aus den großen Tempel-Öllampen"
    ],
    "explanation": "Im Alten Ägypten war Nagelfarbe ein klares Statussymbol: Nur der Königshof und höchste Adel durfte tiefe Rottöne aus Henna tragen, während einfache Bürger sich mit blassen Schattierungen begnügen mussten.",
    "exp": "Im Alten Ägypten war Nagelfarbe ein klares Statussymbol: Nur der Königshof und höchste Adel durfte tiefe Rottöne aus Henna tragen, während einfache Bürger sich mit blassen Schattierungen begnügen mussten."
  },
  {
    "cat": "geschichte_kurioses",
    "diff": "mid",
    "q": "Welcher eigentlich völlig fachfremde Mediziner entwickelte in den 1950er Jahren zufällig die ersten modernen Acryl-Kunstnägel?",
    "a": [
      "Ein Zahnarzt, der seinen Nagel mit Zahnfüllung flickte",
      "Ein Chirurg, der Pflaster mit Knochenzement verstärkte",
      "Ein Augenarzt, der Reste von harten Linsen austestete",
      "Ein Tierarzt, der eine Paste für Pferdehufe erfand"
    ],
    "explanation": "Der US-Zahnarzt Fred Slack Jr. verletzte sich 1954 seinen Daumennagel bei der Arbeit, formte mit Alufolie und Dental-Acryl einen täuschend echten Ersatz – und gründete daraufhin eine ganze Branche!",
    "exp": "Der US-Zahnarzt Fred Slack Jr. verletzte sich 1954 seinen Daumennagel bei der Arbeit, formte mit Alufolie und Dental-Acryl einen täuschend echten Ersatz – und gründete daraufhin eine ganze Branche!"
  },
  {
    "cat": "geschichte_kurioses",
    "diff": "mid",
    "q": "Aus welcher erstaunlichen Mischung stellten Adelige im Alten China schon vor rund 5.000 Jahren bunte Nagelfarben her?",
    "a": [
      "Aus Bienenwachs, Eiweiß, Gelatine und Blütenblättern",
      "Aus gekochtem Baumharz und feinem Staub aus Flusskies",
      "Aus Schweinemilch gefärbt mit gemahlenen roten Chilis",
      "Aus flüssigem Quecksilber vermengt mit feinen Goldfäden"
    ],
    "explanation": "Die Paste musste oft stundenlang auf den Nägeln einwirken, bis ein dauerhafter Schimmer zurückblieb. Später waren während der Ming- und Qing-Dynastie sogar prunkvolle Fingerschutzhüllen aus Gold in Mode.",
    "exp": "Die Paste musste oft stundenlang auf den Nägeln einwirken, bis ein dauerhafter Schimmer zurückblieb. Später waren während der Ming- und Qing-Dynastie sogar prunkvolle Fingerschutzhüllen aus Gold in Mode."
  },
  {
    "cat": "geschichte_kurioses",
    "diff": "mid",
    "q": "Welcher kultige Film machte im Jahr 1994 einen extrem dunklen, fast schwarzen Bordeaux-Ton namens „Rouge Noir“ über Nacht weltberühmt?",
    "a": [
      "Pulp Fiction mit Uma Thurman in der Rolle der Mia Wallace",
      "Der Teufel trägt Prada mit Meryl Streep als Chefredakteurin",
      "Frühstück bei Tiffany mit Audrey Hepburn vor dem Juwelier",
      "Matrix mit Carrie-Anne Moss im langen schwarzen Ledermantel"
    ],
    "explanation": "Die Visagistin suchte für Uma Thurman einen Lack, der auf Film tiefschwarz wirkt, aber ein rotes Herz hat. Chanel mischte Rot mit Schwarz – „Rouge Noir“ (in den USA „Vamp“) war weltweit monatelang ausverkauft!",
    "exp": "Die Visagistin suchte für Uma Thurman einen Lack, der auf Film tiefschwarz wirkt, aber ein rotes Herz hat. Chanel mischte Rot mit Schwarz – „Rouge Noir“ (in den USA „Vamp“) war weltweit monatelang ausverkauft!"
  },
  {
    "cat": "geschichte_kurioses",
    "diff": "mid",
    "q": "Welche beeindruckende Gesamtlänge erreichten die Rekord-Fingernägel des Inders Shridhar Chillal an nur einer Hand vor dem Kürzen 2018?",
    "a": [
      "Knapp über neun Meter – fast so lang wie ein Linienbus",
      "Rund zwei Meter – ungefähr so groß wie ein erwachsener Mann",
      "Etwa vier Meter – vergleichbar mit einem kleinen Kleinwagen",
      "Exakt zwanzig Meter – länger als ein ausgewachsener Blauwal"
    ],
    "explanation": "66 Jahre lang schnitt Chillal die Nägel seiner linken Hand kein einziges Mal! Alle fünf zusammen maßen rund 909 Zentimeter und mussten 2018 im Museum in New York mit einer kleinen Trennscheibe abgesägt werden.",
    "exp": "66 Jahre lang schnitt Chillal die Nägel seiner linken Hand kein einziges Mal! Alle fünf zusammen maßen rund 909 Zentimeter und mussten 2018 im Museum in New York mit einer kleinen Trennscheibe abgesägt werden."
  },
  {
    "cat": "geschichte_kurioses",
    "diff": "mid",
    "q": "Welche geniale Verkaufs-Kombination vermarktete die junge Marke Revlon Ende der 1930er Jahre als absoluten Hit?",
    "a": [
      "Farblich abgestimmten Nagellack zusammen mit Lippenstift",
      "Wasserfesten Zehenlack zusammen mit passenden Lederschuhen",
      "Duftenden Klarlack zusammen mit einer kleinen Haushaltsbleiche",
      "Selbstklebende Kunstnägel zusammen mit einem Silberfingerhut"
    ],
    "explanation": "„Matching Lips and Fingertips“ wurde 1939 zur goldenen Regel der Modewelt: Wer einen roten Lippenstift kaufte, griff automatisch auch zum exakt passenden roten Nagellackfläschchen.",
    "exp": "„Matching Lips and Fingertips“ wurde 1939 zur goldenen Regel der Modewelt: Wer einen roten Lippenstift kaufte, griff automatisch auch zum exakt passenden roten Nagellackfläschchen."
  },
  {
    "cat": "geschichte_kurioses",
    "diff": "pro",
    "q": "Welchen außergewöhnlichen Gesamtwert hält die aktuelle Guinness-Weltrekordhalterin Diana Armstrong für ihre Fingernägel an beiden Händen?",
    "a": [
      "Über dreizehn Meter nach mehr als 25 Jahren Wachstum",
      "Knapp unter fünf Metern nach genau zehn Jahren Wachstum",
      "Ungefähr sieben Meter durch spezielle Gel-Verstärkung",
      "Rund fünfundzwanzig Meter durch eine seltene Störung"
    ],
    "explanation": "Diana Armstrong übertraf 2022 mit über 1.306 Zentimetern alle bisherigen Rekorde. Ein einzelner Lackdurchgang für alle zehn Nägel dauert bei ihr rund vier bis fünf Stunden und verschlingt bis zu 20 Fläschchen Lack!",
    "exp": "Diana Armstrong übertraf 2022 mit über 1.306 Zentimetern alle bisherigen Rekorde. Ein einzelner Lackdurchgang für alle zehn Nägel dauert bei ihr rund vier bis fünf Stunden und verschlingt bis zu 20 Fläschchen Lack!"
  },
  {
    "cat": "geschichte_kurioses",
    "diff": "pro",
    "q": "Warum enthielten einige glitzernde Lacke der Antike oder früherer Jahrhunderte einen ganz besonderen Effekt, der heute durch Glimmer (Mica) ersetzt wird?",
    "a": [
      "Schillernde Fischschuppen sorgten für echten Perlglanz",
      "Winzige Splitter von buntem Glas wurden fein zermahlen",
      "Feine Späne von Silbermünzen wurden in Harz aufgelöst",
      "Getrocknete Flügel von großen Libellen kamen in das Öl"
    ],
    "explanation": "Tatsächlich stammte klassischer Perlglanz-Schimmer jahrhundertelang von gereinigten Heringsschuppen (Perlessenz)! Heute sorgen meist mineralisches Mica oder synthetisches Borosilikat für viel saubereres Funkeln.",
    "exp": "Tatsächlich stammte klassischer Perlglanz-Schimmer jahrhundertelang von gereinigten Heringsschuppen (Perlessenz)! Heute sorgen meist mineralisches Mica oder synthetisches Borosilikat für viel saubereres Funkeln."
  }
  ];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === 'function') {
    window.ArcadeQuizEngine.registerBank('naildesign', QUESTIONS);
  }
})();
