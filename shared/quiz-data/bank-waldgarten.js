// 1.000 Fragen: Waldgarten – Natur, Tiere, Vögel & Geschichte in Schwarzenburg (Heideblick)
// Index 0 von a[] ist stets die richtige Antwort (wird im Spiel gemischt).
(function () {
  const QUESTIONS = [
  {
    "id": 1,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher große, grau gefiederte Zugvogel mit trompetendem Ruf sammelt sich im Herbst zu Tausenden im Naturschutzgebiet Borcheltsbusch und am Schlabendorfer See bei Heideblick?",
    "a": [
      "Der Kranich (Grus grus)",
      "Der Rosaflamingo",
      "Der Kaiserpinguin",
      "Der Pelikan"
    ],
    "exp": "Das Luckauer Becken und das Moorgebiet Borcheltsbusch in der Gemeinde Heideblick zählen zu den bedeutendsten Kranich-Rast- und Schlafplätzen Brandenburgs."
  },
  {
    "id": 2,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher seltene Waldvogel mit schwarz-weiß-rotem Gefieder und aufstellbarer Federhaube ist auf den sonnigen Heide- und Waldrändern rund um Heideblick zu Hause?",
    "a": [
      "Der Wiedehopf (Upupa epops)",
      "Der Haubentaucher",
      "Der Eissturmvogel",
      "Der Austernfischer"
    ],
    "exp": "Der wärmeliebende Wiedehopf mit seinem unverwechselbaren „hup-up-up“-Ruf und der Federkrone findet in den trockenen Sand- und Heidelandschaften Südbrandenburgs ideale Brutplätze."
  },
  {
    "id": 3,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher nachtaktive Vogel der Kiefernheide rund um Schwarzenburg erzeugt im Frühsommer ein lang anhaltendes, schnurrendes Geräusch und fängt im Gaukelflug Nachtfalter?",
    "a": [
      "Der Ziegenmelker (Nachtschwalbe / Caprimulgus europaeus)",
      "Der Mauersegler",
      "Die Wasseramsel",
      "Der Bergfink"
    ],
    "exp": "Der perfekt wie Kiefernrinde getarnte Ziegenmelker (auch Nachtschwalbe genannt) brütet am Boden lichter Kiefernwälder und schnurrt in warmen Sommernächten."
  },
  {
    "id": 4,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher größte Specht Europas mit komplett schwarzem Gefieder und leuchtend rotem Scheitel hämmert große ovale Höhlen in alte Kiefern und Buchen bei Schwarzenburg?",
    "a": [
      "Der Schwarzspecht (Dryocopus martius)",
      "Der Kleinspecht",
      "Der Wendehals",
      "Der Dreizehenspecht"
    ],
    "exp": "Der etwa krähengroße Schwarzspecht zimmert geräumige Bruthöhlen, die später von Hohltauben, Käuzen, Fledermäusen und Baummardern als Wohnung genutzt werden."
  },
  {
    "id": 5,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (weitreichendes, trompetendes „Kruh-kruh“ im Duett) und lebt bevorzugt in folgendem Lebensraum: Erlenbrüche, Moore wie der Borcheltsbusch & weite Felder bei Heideblick?",
    "a": [
      "Kranich",
      "Kleinspecht",
      "Sperber",
      "Waldschnepfe"
    ],
    "exp": "Kranich (Grus grus): Im Herbst rasten tausende Kraniche im Luckauer Becken und übernachten stehend im flachen Moorwasser zum Schutz vor Füchsen und Wildschweinen."
  },
  {
    "id": 6,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Kranich (Grus grus) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "weitreichendes, trompetendes „Kruh-kruh“ im Duett",
      "helles, falkenähnliches „Kikikiki“ aus den oberen Zweigspitzen",
      "schnelles, hohes „Kew-kew-kew“ am Brutplatz",
      "beim abendlichen „Schnepfenstrich“ knorrendes „Quorr-quorr“ gefolgt von scharfem „Puitz“"
    ],
    "exp": "Typisch für den Kranich ist: weitreichendes, trompetendes „Kruh-kruh“ im Duett. Im Herbst rasten tausende Kraniche im Luckauer Becken und übernachten stehend im flachen Moorwasser zum Schutz vor Füchsen und Wildschweinen."
  },
  {
    "id": 7,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Kranich?",
    "a": [
      "Bodenbrüter im nassen Bruchwald („Sumpfhuhn mit langem Hals“)",
      "winzige Bruthöhle in weichem Totholz hoch in der Baumkrone",
      "flacher Reisighorst im dichten Stangenholz von Kiefern oder Fichten",
      "perfekt getarnte Bodenmulde im trockenem Laub"
    ],
    "exp": "Beim Kranich (Grus grus) gilt: Bodenbrüter im nassen Bruchwald („Sumpfhuhn mit langem Hals“). Im Herbst rasten tausende Kraniche im Luckauer Becken und übernachten stehend im flachen Moorwasser zum Schutz vor Füchsen und Wildschweinen."
  },
  {
    "id": 8,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Kranich (Grus grus) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Erntereste, Mais, Körner, Insekten, kleine Amphibien und Beeren",
      "winzige Rindeninsekten, Blattläuse und Spinnen an dünnen Zweigen",
      "fast ausschließlich kleine Singvögel wie Meisen, Finken und Sperlinge",
      "Regenwürmer und Insektenlarven, die sie mit dem langen, biegsamen Tastschnabel im Waldboden aufspürt"
    ],
    "exp": "Auf dem Speiseplan des Kranich stehen vor allem: Erntereste, Mais, Körner, Insekten, kleine Amphibien und Beeren."
  },
  {
    "id": 9,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Im Herbst rasten tausende Kraniche im Luckauer Becken und übernachten stehend im flachen Moorwasser zum Schutz vor Füchsen und Wildschweinen.“?",
    "a": [
      "Kranich (Grus grus)",
      "Kleinspecht (Dryobates minor)",
      "Sperber (Accipiter nisus)",
      "Waldschnepfe (Scolopax rusticola)"
    ],
    "exp": "Diese Besonderheit beschreibt den Kranich (Grus grus), der in Erlenbrüche, Moore wie der Borcheltsbusch & weite Felder bei Heideblick anzutreffen ist."
  },
  {
    "id": 10,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Kranich in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Grus grus",
      "Dryobates minor",
      "Accipiter nisus",
      "Scolopax rusticola"
    ],
    "exp": "Der wissenschaftliche Name von Kranich lautet Grus grus. Lebensraum: Erlenbrüche, Moore wie der Borcheltsbusch & weite Felder bei Heideblick."
  },
  {
    "id": 11,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (dreisilbiges, dumpfes „Hup-up-up“ im Frühjahr) und lebt bevorzugt in folgendem Lebensraum: sonnige Waldränder, Sandheiden und Streuobstwiesen der Niederlausitz?",
    "a": [
      "Wiedehopf",
      "Wendehals",
      "Turmfalke",
      "Pirol"
    ],
    "exp": "Wiedehopf (Upupa epops): Bei Aufregung stellt der Wiedehopf seine rostfarbene Federhaube mit den schwarzen Spitzen fächerförmig auf."
  },
  {
    "id": 12,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Wiedehopf (Upupa epops) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "dreisilbiges, dumpfes „Hup-up-up“ im Frühjahr",
      "etwa zehnmal gereihtes, leicht nasales „Wied-wied-wied“ nach der Rückkehr im April",
      "helles, gereihtes „Kikikiki“",
      "flötendes, klangvolles „Didlioh“ („Bülow“) und krächzender Warnruf wie ein Eichelhäher"
    ],
    "exp": "Typisch für den Wiedehopf ist: dreisilbiges, dumpfes „Hup-up-up“ im Frühjahr. Bei Aufregung stellt der Wiedehopf seine rostfarbene Federhaube mit den schwarzen Spitzen fächerförmig auf."
  },
  {
    "id": 13,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Wiedehopf?",
    "a": [
      "Höhlenbrüter in alten Spechthöhlen, Nistkästen oder Holzstapeln",
      "nutzt vorhandene Baumhöhlen und Nistkästen, da er selbst kein Holz aufhacken kann",
      "brütet in Mauernischen alter Scheunen, Kirchtürmen oder verlassenen Krähennestern",
      "kunstvoll geflochtenes Hängenest in einer äußeren Astgabel hoch in der Baumkrone"
    ],
    "exp": "Beim Wiedehopf (Upupa epops) gilt: Höhlenbrüter in alten Spechthöhlen, Nistkästen oder Holzstapeln. Bei Aufregung stellt der Wiedehopf seine rostfarbene Federhaube mit den schwarzen Spitzen fächerförmig auf."
  },
  {
    "id": 14,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Wiedehopf (Upupa epops) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Maulwurfsgrillen, große Käferlarven, Heuschrecken und Spinnen am Sandboden",
      "Wiesenameisen und deren Larven sowie Puppen („Ameiseneier“)",
      "Feldmäuse, große Heuschrecken und Käfer",
      "behaarte Schmetterlingsraupen, Maikäfer und im Spätsommer süße Waldbeeren und Kirschen"
    ],
    "exp": "Auf dem Speiseplan des Wiedehopf stehen vor allem: Maulwurfsgrillen, große Käferlarven, Heuschrecken und Spinnen am Sandboden."
  },
  {
    "id": 15,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Bei Aufregung stellt der Wiedehopf seine rostfarbene Federhaube mit den schwarzen Spitzen fächerförmig auf.“?",
    "a": [
      "Wiedehopf (Upupa epops)",
      "Wendehals (Jynx torquilla)",
      "Turmfalke (Falco tinnunculus)",
      "Pirol (Oriolus oriolus)"
    ],
    "exp": "Diese Besonderheit beschreibt den Wiedehopf (Upupa epops), der in sonnige Waldränder, Sandheiden und Streuobstwiesen der Niederlausitz anzutreffen ist."
  },
  {
    "id": 16,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Wiedehopf in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Upupa epops",
      "Jynx torquilla",
      "Falco tinnunculus",
      "Oriolus oriolus"
    ],
    "exp": "Der wissenschaftliche Name von Wiedehopf lautet Upupa epops. Lebensraum: sonnige Waldränder, Sandheiden und Streuobstwiesen der Niederlausitz."
  },
  {
    "id": 17,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (minutenlanges, maschinenartiges Schnurren („errrrr-orrrrr“) in der Abenddämmerung) und lebt bevorzugt in folgendem Lebensraum: lichte, trockene Kiefernwälder und Heidelandschaften rund um Schwarzenburg?",
    "a": [
      "Ziegenmelker (Nachtschwalbe)",
      "Rotmilan (Gabelweihe)",
      "Baumfalke",
      "Kuckuck"
    ],
    "exp": "Ziegenmelker (Nachtschwalbe) (Caprimulgus europaeus): Sein rindenfarbenes Gefieder tarnt ihn tagsüber am Waldboden oder längs auf einem Kiefernstamm sitzend nahezu unsichtbar."
  },
  {
    "id": 18,
    "cat": "voegel",
    "diff": "pro",
    "q": "Woran erkennt man den Ziegenmelker (Nachtschwalbe) (Caprimulgus europaeus) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "minutenlanges, maschinenartiges Schnurren („errrrr-orrrrr“) in der Abenddämmerung",
      "langgezogenes, trillerndes „Hi-äh-hi-hi-äh“ im Segelflug",
      "klingendes „Gäth-gäth-gäth“",
      "unverwechselbares zweisilbiges „Kuck-uck“ des Männchens ab Ende April"
    ],
    "exp": "Typisch für den Ziegenmelker (Nachtschwalbe) ist: minutenlanges, maschinenartiges Schnurren („errrrr-orrrrr“) in der Abenddämmerung. Sein rindenfarbenes Gefieder tarnt ihn tagsüber am Waldboden oder längs auf einem Kiefernstamm sitzend nahezu unsichtbar."
  },
  {
    "id": 19,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Ziegenmelker (Nachtschwalbe)?",
    "a": [
      "legt zwei gemusterte Eier ohne Nest direkt auf Kiefernnadeln und Sandboden",
      "großer Horst in hohen Waldrandkiefern oder Eichen, oft mit bunten Fundstücken ausgepolstert",
      "bezieht alte Krähennester in den Wipfeln hoher Waldrandkiefern",
      "Brutschmarotzer: legt je ein Ei in Nester von Teichrohrsängern, Rotkehlchen oder Bachstelzen"
    ],
    "exp": "Beim Ziegenmelker (Nachtschwalbe) (Caprimulgus europaeus) gilt: legt zwei gemusterte Eier ohne Nest direkt auf Kiefernnadeln und Sandboden. Sein rindenfarbenes Gefieder tarnt ihn tagsüber am Waldboden oder längs auf einem Kiefernstamm sitzend nahezu unsichtbar."
  },
  {
    "id": 20,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Ziegenmelker (Nachtschwalbe) (Caprimulgus europaeus) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "im lautlosen Gaukelflug erbeutete Nachtfalter und große Käfer",
      "Kleinsäuger, Feldmäuse, Regenwürmer, Aas und kleine Vögel",
      "im rasanten Jagdflug erbeutete Großlibellen, Schwalben und sogar Mauersegler",
      "stachlige und giftig behaarte Raupen (z. B. Kiefernspinner, Bärenspinner), die andere Vögel meiden"
    ],
    "exp": "Auf dem Speiseplan des Ziegenmelker (Nachtschwalbe) stehen vor allem: im lautlosen Gaukelflug erbeutete Nachtfalter und große Käfer."
  },
  {
    "id": 21,
    "cat": "voegel",
    "diff": "pro",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Sein rindenfarbenes Gefieder tarnt ihn tagsüber am Waldboden oder längs auf einem Kiefernstamm sitzend nahezu unsichtbar.“?",
    "a": [
      "Ziegenmelker (Nachtschwalbe) (Caprimulgus europaeus)",
      "Rotmilan (Gabelweihe) (Milvus milvus)",
      "Baumfalke (Falco subbuteo)",
      "Kuckuck (Cuculus canorus)"
    ],
    "exp": "Diese Besonderheit beschreibt den Ziegenmelker (Nachtschwalbe) (Caprimulgus europaeus), der in lichte, trockene Kiefernwälder und Heidelandschaften rund um Schwarzenburg anzutreffen ist."
  },
  {
    "id": 22,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Ziegenmelker (Nachtschwalbe) in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Caprimulgus europaeus",
      "Milvus milvus",
      "Falco subbuteo",
      "Cuculus canorus"
    ],
    "exp": "Der wissenschaftliche Name von Ziegenmelker (Nachtschwalbe) lautet Caprimulgus europaeus. Lebensraum: lichte, trockene Kiefernwälder und Heidelandschaften rund um Schwarzenburg."
  },
  {
    "id": 23,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (wehmütig perlender, abfallender Gesang „lü-lü-lü-lü-lüli“ oft auch im Nachthimmel) und lebt bevorzugt in folgendem Lebensraum: trockene Kiefernwaldränder, Lichtungen und Sandheiden bei Schwarzenburg?",
    "a": [
      "Heidelerche",
      "Seeadler",
      "Waldkauz",
      "Neuntöter (Rotrückenwürger)"
    ],
    "exp": "Heidelerche (Lullula arborea): Erkennbar am kurzen Schwanz, dem hellen Überaugenstreif, der im Nacken V-förmig zusammenläuft, und einer kleinen Federhaube."
  },
  {
    "id": 24,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Heidelerche (Lullula arborea) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "wehmütig perlender, abfallender Gesang „lü-lü-lü-lü-lüli“ oft auch im Nachthimmel",
      "bellend klingende Rufreihe „Kli-kli-kli-klia“ des Paares am Horst",
      "bekannter Hohlruf des Männchens „Huu-hu-huhuhuhu“ und scharfes „Kuwitt“ des Weibchens",
      "rauhes „Gä-gä“ und leiser, spottender Gesang mit imitierten Vogelstimmen"
    ],
    "exp": "Typisch für den Heidelerche ist: wehmütig perlender, abfallender Gesang „lü-lü-lü-lü-lüli“ oft auch im Nachthimmel. Erkennbar am kurzen Schwanz, dem hellen Überaugenstreif, der im Nacken V-förmig zusammenläuft, und einer kleinen Federhaube."
  },
  {
    "id": 25,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Heidelerche?",
    "a": [
      "gut verstecktes Bodennest am Rand von Heidekraut- oder Grasbüscheln",
      "gewaltiger Reisighorst in den Kronen alter Kiefern, der über Jahrzehnte bis zu 500 kg schwer werden kann",
      "große Baumhöhlen, Dachböden alter Höfe oder spezielle Eulen-Nistkästen",
      "stabiles Nest im dichten Dornengebüsch"
    ],
    "exp": "Beim Heidelerche (Lullula arborea) gilt: gut verstecktes Bodennest am Rand von Heidekraut- oder Grasbüscheln. Erkennbar am kurzen Schwanz, dem hellen Überaugenstreif, der im Nacken V-förmig zusammenläuft, und einer kleinen Federhaube."
  },
  {
    "id": 26,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Heidelerche (Lullula arborea) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Spinnen, Ameisen, kleine Käfer und feine Wildkräutersamen",
      "große Fische, Wasservögel wie Blässhühner und Gänse sowie im Winter Fallwild",
      "Waldmäuse, Wühlmäuse, Kleinvögel, Frösche und große Käfer",
      "Großinsekten wie Mistkäfer, Heuschrecken, Hummeln sowie gelegentlich Eidechsen und Mäuse"
    ],
    "exp": "Auf dem Speiseplan des Heidelerche stehen vor allem: Spinnen, Ameisen, kleine Käfer und feine Wildkräutersamen."
  },
  {
    "id": 27,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Erkennbar am kurzen Schwanz, dem hellen Überaugenstreif, der im Nacken V-förmig zusammenläuft, und einer kleinen Federhaube.“?",
    "a": [
      "Heidelerche (Lullula arborea)",
      "Seeadler (Haliaeetus albicilla)",
      "Waldkauz (Strix aluco)",
      "Neuntöter (Rotrückenwürger) (Lanius collurio)"
    ],
    "exp": "Diese Besonderheit beschreibt den Heidelerche (Lullula arborea), der in trockene Kiefernwaldränder, Lichtungen und Sandheiden bei Schwarzenburg anzutreffen ist."
  },
  {
    "id": 28,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Heidelerche in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Lullula arborea",
      "Haliaeetus albicilla",
      "Strix aluco",
      "Lanius collurio"
    ],
    "exp": "Der wissenschaftliche Name von Heidelerche lautet Lullula arborea. Lebensraum: trockene Kiefernwaldränder, Lichtungen und Sandheiden bei Schwarzenburg."
  },
  {
    "id": 29,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (im Flug helles „Krü-krü-krü“, im Sitzen klagendes „Kliöh“ und dröhnendes Trommeln) und lebt bevorzugt in folgendem Lebensraum: ausgedehnte Kiefern- und Mischwälder mit starkem Altholz rund um Schwarzenburg?",
    "a": [
      "Schwarzspecht",
      "Fischadler",
      "Uhu",
      "Raubwürger"
    ],
    "exp": "Schwarzspecht (Dryocopus martius): Als „Wohnungsbauminister des Waldes“ schafft er Quartiere für Hohltaube, Rauhfußkauz, Baummarder und Fledermäuse."
  },
  {
    "id": 30,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Schwarzspecht (Dryocopus martius) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "im Flug helles „Krü-krü-krü“, im Sitzen klagendes „Kliöh“ und dröhnendes Trommeln",
      "pfeifendes, scharfes „Ki-ip, ki-ip“ in Horstnähe",
      "tiefes, weitreichendes „Bu-ho“ in klaren Spätwinternächten",
      "trillernder Gesang und rauer Warnruf"
    ],
    "exp": "Typisch für den Schwarzspecht ist: im Flug helles „Krü-krü-krü“, im Sitzen klagendes „Kliöh“ und dröhnendes Trommeln. Als „Wohnungsbauminister des Waldes“ schafft er Quartiere für Hohltaube, Rauhfußkauz, Baummarder und Fledermäuse."
  },
  {
    "id": 31,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Schwarzspecht?",
    "a": [
      "zimmert bis zu 40 cm tiefe Höhlen mit ovalem Einflugloch in dicke Stämme",
      "frei nach oben offener Horst auf Baumspitzen oder speziellen Strommast-Plattformen",
      "brütet auf Fels- oder Sandabbruchkanten, am Waldboden oder in alten Greifvogelhorsten",
      "kugelige Nester hoch in Kiefern oder Dornbüschen"
    ],
    "exp": "Beim Schwarzspecht (Dryocopus martius) gilt: zimmert bis zu 40 cm tiefe Höhlen mit ovalem Einflugloch in dicke Stämme. Als „Wohnungsbauminister des Waldes“ schafft er Quartiere für Hohltaube, Rauhfußkauz, Baummarder und Fledermäuse."
  },
  {
    "id": 32,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Schwarzspecht (Dryocopus martius) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "in morschem Holz und Baumstümpfen lebende Rossameisen und Bockkäferlarven",
      "ausschließlich lebende Fische, die er im Stoßtauchen mit den Fängen aus dem Wasser greift",
      "Igel, Ratten, Mäuse, Hasen, Tauben und Krähen",
      "Feldmäuse, Eidechsen, Singvögel und Großinsekten von hoher Ansitzwarte aus"
    ],
    "exp": "Auf dem Speiseplan des Schwarzspecht stehen vor allem: in morschem Holz und Baumstümpfen lebende Rossameisen und Bockkäferlarven."
  },
  {
    "id": 33,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Als „Wohnungsbauminister des Waldes“ schafft er Quartiere für Hohltaube, Rauhfußkauz, Baummarder und Fledermäuse.“?",
    "a": [
      "Schwarzspecht (Dryocopus martius)",
      "Fischadler (Pandion haliaetus)",
      "Uhu (Bubo bubo)",
      "Raubwürger (Lanius excubitor)"
    ],
    "exp": "Diese Besonderheit beschreibt den Schwarzspecht (Dryocopus martius), der in ausgedehnte Kiefern- und Mischwälder mit starkem Altholz rund um Schwarzenburg anzutreffen ist."
  },
  {
    "id": 34,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Schwarzspecht in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Dryocopus martius",
      "Pandion haliaetus",
      "Bubo bubo",
      "Lanius excubitor"
    ],
    "exp": "Der wissenschaftliche Name von Schwarzspecht lautet Dryocopus martius. Lebensraum: ausgedehnte Kiefern- und Mischwälder mit starkem Altholz rund um Schwarzenburg."
  },
  {
    "id": 35,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (kurzes, scharfes „Kix“ und rasches Trommeln auf dürren Resonanzästen) und lebt bevorzugt in folgendem Lebensraum: alle Waldtypen, Waldgärten und alte Obstbäume in Schwarzenburg?",
    "a": [
      "Buntspecht",
      "Mäusebussard",
      "Waldohreule",
      "Eichelhäher"
    ],
    "exp": "Buntspecht (Dendrocopos major): Um Kiefernzapfen zu öffnen, klemmt der Buntspecht sie fest in eine Rindenspalte („Spechtschmiede“) und bearbeitet sie mit dem Schnabel."
  },
  {
    "id": 36,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Buntspecht (Dendrocopos major) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "kurzes, scharfes „Kix“ und rasches Trommeln auf dürren Resonanzästen",
      "weithin hörbares, katzenartig gedehntes „Piiääh“ beim Kreisen in der Thermik",
      "dumpfes, alle 3 Sekunden wiederholtes „Hu“; Jungvögel rufen nachts fiepend wie eine ungeölte Türangel",
      "lautes, rätschendes „Räätsch“, mit dem er alle Tiere des Waldes vor Spaziergängern warnt"
    ],
    "exp": "Typisch für den Buntspecht ist: kurzes, scharfes „Kix“ und rasches Trommeln auf dürren Resonanzästen. Um Kiefernzapfen zu öffnen, klemmt der Buntspecht sie fest in eine Rindenspalte („Spechtschmiede“) und bearbeitet sie mit dem Schnabel."
  },
  {
    "id": 37,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Buntspecht?",
    "a": [
      "rundes Einflugloch (ca. 4,5 cm) in Laub- und Nadelbäumen",
      "Reisighorst in hohen Kiefern oder Eichen nahe dem Waldrand",
      "brütet in alten Elstern- oder Krähennestern in Kiefern",
      "Schalennest in Kiefern oder Laubbäumen; im Flug leuchtet das himmelblau-schwarz gebänderte Flügelfeld"
    ],
    "exp": "Beim Buntspecht (Dendrocopos major) gilt: rundes Einflugloch (ca. 4,5 cm) in Laub- und Nadelbäumen. Um Kiefernzapfen zu öffnen, klemmt der Buntspecht sie fest in eine Rindenspalte („Spechtschmiede“) und bearbeitet sie mit dem Schnabel."
  },
  {
    "id": 38,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Buntspecht (Dendrocopos major) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "im Sommer holzbewohnende Insekten, im Winter Kiefernsamen aus der „Spechtschmiede“",
      "Feldmäuse, Maulwürfe, Regenwürmer, Eidechsen und Fallwild",
      "überwiegend Feld- und Erdmäuse auf den Wiesen am Waldrand",
      "im Sommer Insekten und Beeren, im Herbst und Winter vor allem Eicheln und Bucheckern"
    ],
    "exp": "Auf dem Speiseplan des Buntspecht stehen vor allem: im Sommer holzbewohnende Insekten, im Winter Kiefernsamen aus der „Spechtschmiede“."
  },
  {
    "id": 39,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Um Kiefernzapfen zu öffnen, klemmt der Buntspecht sie fest in eine Rindenspalte („Spechtschmiede“) und bearbeitet sie mit dem Schnabel.“?",
    "a": [
      "Buntspecht (Dendrocopos major)",
      "Mäusebussard (Buteo buteo)",
      "Waldohreule (Asio otus)",
      "Eichelhäher (Garrulus glandarius)"
    ],
    "exp": "Diese Besonderheit beschreibt den Buntspecht (Dendrocopos major), der in alle Waldtypen, Waldgärten und alte Obstbäume in Schwarzenburg anzutreffen ist."
  },
  {
    "id": 40,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Buntspecht in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Dendrocopos major",
      "Buteo buteo",
      "Asio otus",
      "Garrulus glandarius"
    ],
    "exp": "Der wissenschaftliche Name von Buntspecht lautet Dendrocopos major. Lebensraum: alle Waldtypen, Waldgärten und alte Obstbäume in Schwarzenburg."
  },
  {
    "id": 41,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (laut lachende Rufreihe „Kjück-kjück-kjück“, die an ein Wiehern erinnert) und lebt bevorzugt in folgendem Lebensraum: Waldränder, Waldgärten, Streuobstwiesen und Lichtungen?",
    "a": [
      "Grünspecht",
      "Habicht",
      "Schleiereule",
      "Kolkrabe"
    ],
    "exp": "Grünspecht (Picus viridis): Mit seiner bis zu 10 cm weit herausstreckbaren, klebrigen Zunge holt er Ameisen tief aus ihren Erdgängen."
  },
  {
    "id": 42,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Grünspecht (Picus viridis) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "laut lachende Rufreihe „Kjück-kjück-kjück“, die an ein Wiehern erinnert",
      "energisches „Gik-gik-gik“ im Brutrevier im zeitigen Frühjahr",
      "heiseres, kreischendes Schnarchen und Fauchen statt eines Eulenrufs",
      "tiefes, sonores „Klong“ oder „Korrk“, das kilometerweit über den Kiefernwald trägt"
    ],
    "exp": "Typisch für den Grünspecht ist: laut lachende Rufreihe „Kjück-kjück-kjück“, die an ein Wiehern erinnert. Mit seiner bis zu 10 cm weit herausstreckbaren, klebrigen Zunge holt er Ameisen tief aus ihren Erdgängen."
  },
  {
    "id": 43,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Grünspecht?",
    "a": [
      "Höhlenbrüter in alten Laubbäumen, sucht seine Nahrung aber meist hüpfend am Boden",
      "großer Horst in einer Stammgabel hoher Waldbäume",
      "dunkle Nischen in Scheunen und Kirchtürmen mit freiem Einflug („Eulenloch“)",
      "massiver Reisighorst in hohen Waldkiefern, brütet bereits ab Ende Februar"
    ],
    "exp": "Beim Grünspecht (Picus viridis) gilt: Höhlenbrüter in alten Laubbäumen, sucht seine Nahrung aber meist hüpfend am Boden. Mit seiner bis zu 10 cm weit herausstreckbaren, klebrigen Zunge holt er Ameisen tief aus ihren Erdgängen."
  },
  {
    "id": 44,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Grünspecht (Picus viridis) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "fast ausschließlich bodenlebende Wiesenameisen und deren Puppen",
      "Ringeltauben, Eichelhäher, Drosseln, Krähen und Eichhörnchen",
      "Spitzmäuse, Hausmäuse und Feldmäuse rund um Höfe und Gärten",
      "Allesfresser: Fallwild (oft zusammen mit Wölfen und Seeadlern), Insekten, Kleinsäuger, Früchte"
    ],
    "exp": "Auf dem Speiseplan des Grünspecht stehen vor allem: fast ausschließlich bodenlebende Wiesenameisen und deren Puppen."
  },
  {
    "id": 45,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Mit seiner bis zu 10 cm weit herausstreckbaren, klebrigen Zunge holt er Ameisen tief aus ihren Erdgängen.“?",
    "a": [
      "Grünspecht (Picus viridis)",
      "Habicht (Accipiter gentilis)",
      "Schleiereule (Tyto alba)",
      "Kolkrabe (Corvus corax)"
    ],
    "exp": "Diese Besonderheit beschreibt den Grünspecht (Picus viridis), der in Waldränder, Waldgärten, Streuobstwiesen und Lichtungen anzutreffen ist."
  },
  {
    "id": 46,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Grünspecht in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Picus viridis",
      "Accipiter gentilis",
      "Tyto alba",
      "Corvus corax"
    ],
    "exp": "Der wissenschaftliche Name von Grünspecht lautet Picus viridis. Lebensraum: Waldränder, Waldgärten, Streuobstwiesen und Lichtungen."
  },
  {
    "id": 47,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (helles, falkenähnliches „Kikikiki“ aus den oberen Zweigspitzen) und lebt bevorzugt in folgendem Lebensraum: alte Laubholzinseln, Erlenbrüche und Obstgärten in Heideblick?",
    "a": [
      "Kleinspecht",
      "Sperber",
      "Waldschnepfe",
      "Rotkehlchen"
    ],
    "exp": "Kleinspecht (Dryobates minor): Der kleinste europäische Specht ist kaum größer als ein Haussperling (Spatz) und wiegt nur rund 20 Gramm."
  },
  {
    "id": 48,
    "cat": "voegel",
    "diff": "pro",
    "q": "Woran erkennt man den Kleinspecht (Dryobates minor) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "helles, falkenähnliches „Kikikiki“ aus den oberen Zweigspitzen",
      "schnelles, hohes „Kew-kew-kew“ am Brutplatz",
      "beim abendlichen „Schnepfenstrich“ knorrendes „Quorr-quorr“ gefolgt von scharfem „Puitz“",
      "silbrig perlender, leicht melancholischer Gesang bis in die Dämmerung und scharfes „Tick-tick“"
    ],
    "exp": "Typisch für den Kleinspecht ist: helles, falkenähnliches „Kikikiki“ aus den oberen Zweigspitzen. Der kleinste europäische Specht ist kaum größer als ein Haussperling (Spatz) und wiegt nur rund 20 Gramm."
  },
  {
    "id": 49,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Kleinspecht?",
    "a": [
      "winzige Bruthöhle in weichem Totholz hoch in der Baumkrone",
      "flacher Reisighorst im dichten Stangenholz von Kiefern oder Fichten",
      "perfekt getarnte Bodenmulde im trockenem Laub",
      "verstecktes Nest am Boden unter Wurzeln, im Efeu oder in Halbhöhlen"
    ],
    "exp": "Beim Kleinspecht (Dryobates minor) gilt: winzige Bruthöhle in weichem Totholz hoch in der Baumkrone. Der kleinste europäische Specht ist kaum größer als ein Haussperling (Spatz) und wiegt nur rund 20 Gramm."
  },
  {
    "id": 50,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Kleinspecht (Dryobates minor) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "winzige Rindeninsekten, Blattläuse und Spinnen an dünnen Zweigen",
      "fast ausschließlich kleine Singvögel wie Meisen, Finken und Sperlinge",
      "Regenwürmer und Insektenlarven, die sie mit dem langen, biegsamen Tastschnabel im Waldboden aufspürt",
      "Spinnen, kleine Käfer, Würmer und im Herbst Beeren sowie Haferflocken am Futterplatz"
    ],
    "exp": "Auf dem Speiseplan des Kleinspecht stehen vor allem: winzige Rindeninsekten, Blattläuse und Spinnen an dünnen Zweigen."
  },
  {
    "id": 51,
    "cat": "voegel",
    "diff": "pro",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Der kleinste europäische Specht ist kaum größer als ein Haussperling (Spatz) und wiegt nur rund 20 Gramm.“?",
    "a": [
      "Kleinspecht (Dryobates minor)",
      "Sperber (Accipiter nisus)",
      "Waldschnepfe (Scolopax rusticola)",
      "Rotkehlchen (Erithacus rubecula)"
    ],
    "exp": "Diese Besonderheit beschreibt den Kleinspecht (Dryobates minor), der in alte Laubholzinseln, Erlenbrüche und Obstgärten in Heideblick anzutreffen ist."
  },
  {
    "id": 52,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Kleinspecht in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Dryobates minor",
      "Accipiter nisus",
      "Scolopax rusticola",
      "Erithacus rubecula"
    ],
    "exp": "Der wissenschaftliche Name von Kleinspecht lautet Dryobates minor. Lebensraum: alte Laubholzinseln, Erlenbrüche und Obstgärten in Heideblick."
  },
  {
    "id": 53,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (etwa zehnmal gereihtes, leicht nasales „Wied-wied-wied“ nach der Rückkehr im April) und lebt bevorzugt in folgendem Lebensraum: lichte Kiefern- und Obstgärten mit Ameisenvorkommen?",
    "a": [
      "Wendehals",
      "Turmfalke",
      "Pirol",
      "Zaunkönig"
    ],
    "exp": "Wendehals (Jynx torquilla): Bei Gefahr in der Höhle verdreht er den Kopf schlangenartig und zischt wie eine Natter, um Nesträuber abzuschrecken."
  },
  {
    "id": 54,
    "cat": "voegel",
    "diff": "pro",
    "q": "Woran erkennt man den Wendehals (Jynx torquilla) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "etwa zehnmal gereihtes, leicht nasales „Wied-wied-wied“ nach der Rückkehr im April",
      "helles, gereihtes „Kikikiki“",
      "flötendes, klangvolles „Didlioh“ („Bülow“) und krächzender Warnruf wie ein Eichelhäher",
      "erstaunlich schmetternder, lauter Trillergesang mit über 90 Dezibel"
    ],
    "exp": "Typisch für den Wendehals ist: etwa zehnmal gereihtes, leicht nasales „Wied-wied-wied“ nach der Rückkehr im April. Bei Gefahr in der Höhle verdreht er den Kopf schlangenartig und zischt wie eine Natter, um Nesträuber abzuschrecken."
  },
  {
    "id": 55,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Wendehals?",
    "a": [
      "nutzt vorhandene Baumhöhlen und Nistkästen, da er selbst kein Holz aufhacken kann",
      "brütet in Mauernischen alter Scheunen, Kirchtürmen oder verlassenen Krähennestern",
      "kunstvoll geflochtenes Hängenest in einer äußeren Astgabel hoch in der Baumkrone",
      "Männchen baut mehrere kugelige Moosnester, aus denen das Weibchen eines auswählt und mit Federn auspolstert"
    ],
    "exp": "Beim Wendehals (Jynx torquilla) gilt: nutzt vorhandene Baumhöhlen und Nistkästen, da er selbst kein Holz aufhacken kann. Bei Gefahr in der Höhle verdreht er den Kopf schlangenartig und zischt wie eine Natter, um Nesträuber abzuschrecken."
  },
  {
    "id": 56,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Wendehals (Jynx torquilla) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Wiesenameisen und deren Larven sowie Puppen („Ameiseneier“)",
      "Feldmäuse, große Heuschrecken und Käfer",
      "behaarte Schmetterlingsraupen, Maikäfer und im Spätsommer süße Waldbeeren und Kirschen",
      "winzige Spinnen, Weberknechte, Mücken und Insektenlarven im Reisig"
    ],
    "exp": "Auf dem Speiseplan des Wendehals stehen vor allem: Wiesenameisen und deren Larven sowie Puppen („Ameiseneier“)."
  },
  {
    "id": 57,
    "cat": "voegel",
    "diff": "pro",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Bei Gefahr in der Höhle verdreht er den Kopf schlangenartig und zischt wie eine Natter, um Nesträuber abzuschrecken.“?",
    "a": [
      "Wendehals (Jynx torquilla)",
      "Turmfalke (Falco tinnunculus)",
      "Pirol (Oriolus oriolus)",
      "Zaunkönig (Troglodytes troglodytes)"
    ],
    "exp": "Diese Besonderheit beschreibt den Wendehals (Jynx torquilla), der in lichte Kiefern- und Obstgärten mit Ameisenvorkommen anzutreffen ist."
  },
  {
    "id": 58,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Wendehals in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Jynx torquilla",
      "Falco tinnunculus",
      "Oriolus oriolus",
      "Troglodytes troglodytes"
    ],
    "exp": "Der wissenschaftliche Name von Wendehals lautet Jynx torquilla. Lebensraum: lichte Kiefern- und Obstgärten mit Ameisenvorkommen."
  },
  {
    "id": 59,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (langgezogenes, trillerndes „Hi-äh-hi-hi-äh“ im Segelflug) und lebt bevorzugt in folgendem Lebensraum: offene Feldmark der Niederlausitz im Wechsel mit Waldrändern?",
    "a": [
      "Rotmilan (Gabelweihe)",
      "Baumfalke",
      "Kuckuck",
      "Wintergoldhähnchen"
    ],
    "exp": "Rotmilan (Gabelweihe) (Milvus milvus): Sein tief gegabelter rostrot leuchtender Schwanz wird im Segelflug ständig wie ein Seitenruder gedreht. Deutschland beherbergt über die Hälfte des Weltbestands."
  },
  {
    "id": 60,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Rotmilan (Gabelweihe) (Milvus milvus) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "langgezogenes, trillerndes „Hi-äh-hi-hi-äh“ im Segelflug",
      "klingendes „Gäth-gäth-gäth“",
      "unverwechselbares zweisilbiges „Kuck-uck“ des Männchens ab Ende April",
      "extrem feines, hohes „Si-si-si“, das für ältere menschliche Ohren oft kaum noch hörbar ist"
    ],
    "exp": "Typisch für den Rotmilan (Gabelweihe) ist: langgezogenes, trillerndes „Hi-äh-hi-hi-äh“ im Segelflug. Sein tief gegabelter rostrot leuchtender Schwanz wird im Segelflug ständig wie ein Seitenruder gedreht. Deutschland beherbergt über die Hälfte des Weltbestands."
  },
  {
    "id": 61,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Rotmilan (Gabelweihe)?",
    "a": [
      "großer Horst in hohen Waldrandkiefern oder Eichen, oft mit bunten Fundstücken ausgepolstert",
      "bezieht alte Krähennester in den Wipfeln hoher Waldrandkiefern",
      "Brutschmarotzer: legt je ein Ei in Nester von Teichrohrsängern, Rotkehlchen oder Bachstelzen",
      "kunstvolles Hängenest unter einem äußeren Nadelbaumzweig"
    ],
    "exp": "Beim Rotmilan (Gabelweihe) (Milvus milvus) gilt: großer Horst in hohen Waldrandkiefern oder Eichen, oft mit bunten Fundstücken ausgepolstert. Sein tief gegabelter rostrot leuchtender Schwanz wird im Segelflug ständig wie ein Seitenruder gedreht. Deutschland beherbergt über die Hälfte des Weltbestands."
  },
  {
    "id": 62,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Rotmilan (Gabelweihe) (Milvus milvus) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Kleinsäuger, Feldmäuse, Regenwürmer, Aas und kleine Vögel",
      "im rasanten Jagdflug erbeutete Großlibellen, Schwalben und sogar Mauersegler",
      "stachlige und giftig behaarte Raupen (z. B. Kiefernspinner, Bärenspinner), die andere Vögel meiden",
      "winzige Springschwänze, Blattläuse und Spinnen zwischen den Kiefernnadeln"
    ],
    "exp": "Auf dem Speiseplan des Rotmilan (Gabelweihe) stehen vor allem: Kleinsäuger, Feldmäuse, Regenwürmer, Aas und kleine Vögel."
  },
  {
    "id": 63,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Sein tief gegabelter rostrot leuchtender Schwanz wird im Segelflug ständig wie ein Seitenruder gedreht. Deutschland beherbergt über die Hälfte des Weltbestands.“?",
    "a": [
      "Rotmilan (Gabelweihe) (Milvus milvus)",
      "Baumfalke (Falco subbuteo)",
      "Kuckuck (Cuculus canorus)",
      "Wintergoldhähnchen (Regulus regulus)"
    ],
    "exp": "Diese Besonderheit beschreibt den Rotmilan (Gabelweihe) (Milvus milvus), der in offene Feldmark der Niederlausitz im Wechsel mit Waldrändern anzutreffen ist."
  },
  {
    "id": 64,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Rotmilan (Gabelweihe) in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Milvus milvus",
      "Falco subbuteo",
      "Cuculus canorus",
      "Regulus regulus"
    ],
    "exp": "Der wissenschaftliche Name von Rotmilan (Gabelweihe) lautet Milvus milvus. Lebensraum: offene Feldmark der Niederlausitz im Wechsel mit Waldrändern."
  },
  {
    "id": 65,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (bellend klingende Rufreihe „Kli-kli-kli-klia“ des Paares am Horst) und lebt bevorzugt in folgendem Lebensraum: seenreiche Wälder zwischen Schlabendorfer See, Teichlandschaften und Spreewald?",
    "a": [
      "Seeadler",
      "Waldkauz",
      "Neuntöter (Rotrückenwürger)",
      "Sommergoldhähnchen"
    ],
    "exp": "Seeadler (Haliaeetus albicilla): Mit bis zu 2,40 m Flügelspannweite und dem schneeweißen Stoß (Schwanz) im Alter ist er der größte heimische Greifvogel."
  },
  {
    "id": 66,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Seeadler (Haliaeetus albicilla) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "bellend klingende Rufreihe „Kli-kli-kli-klia“ des Paares am Horst",
      "bekannter Hohlruf des Männchens „Huu-hu-huhuhuhu“ und scharfes „Kuwitt“ des Weibchens",
      "rauhes „Gä-gä“ und leiser, spottender Gesang mit imitierten Vogelstimmen",
      "gleichförmige, am Ende ansteigende hohe Tonreihe"
    ],
    "exp": "Typisch für den Seeadler ist: bellend klingende Rufreihe „Kli-kli-kli-klia“ des Paares am Horst. Mit bis zu 2,40 m Flügelspannweite und dem schneeweißen Stoß (Schwanz) im Alter ist er der größte heimische Greifvogel."
  },
  {
    "id": 67,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Seeadler?",
    "a": [
      "gewaltiger Reisighorst in den Kronen alter Kiefern, der über Jahrzehnte bis zu 500 kg schwer werden kann",
      "große Baumhöhlen, Dachböden alter Höfe oder spezielle Eulen-Nistkästen",
      "stabiles Nest im dichten Dornengebüsch",
      "dicht gewebtes Moos- und Spinnwebennest im Gezweig"
    ],
    "exp": "Beim Seeadler (Haliaeetus albicilla) gilt: gewaltiger Reisighorst in den Kronen alter Kiefern, der über Jahrzehnte bis zu 500 kg schwer werden kann. Mit bis zu 2,40 m Flügelspannweite und dem schneeweißen Stoß (Schwanz) im Alter ist er der größte heimische Greifvogel."
  },
  {
    "id": 68,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Seeadler (Haliaeetus albicilla) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "große Fische, Wasservögel wie Blässhühner und Gänse sowie im Winter Fallwild",
      "Waldmäuse, Wühlmäuse, Kleinvögel, Frösche und große Käfer",
      "Großinsekten wie Mistkäfer, Heuschrecken, Hummeln sowie gelegentlich Eidechsen und Mäuse",
      "kleinste Insekten und Spinnen auf Zweigen und Nadeln"
    ],
    "exp": "Auf dem Speiseplan des Seeadler stehen vor allem: große Fische, Wasservögel wie Blässhühner und Gänse sowie im Winter Fallwild."
  },
  {
    "id": 69,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Mit bis zu 2,40 m Flügelspannweite und dem schneeweißen Stoß (Schwanz) im Alter ist er der größte heimische Greifvogel.“?",
    "a": [
      "Seeadler (Haliaeetus albicilla)",
      "Waldkauz (Strix aluco)",
      "Neuntöter (Rotrückenwürger) (Lanius collurio)",
      "Sommergoldhähnchen (Regulus ignicapilla)"
    ],
    "exp": "Diese Besonderheit beschreibt den Seeadler (Haliaeetus albicilla), der in seenreiche Wälder zwischen Schlabendorfer See, Teichlandschaften und Spreewald anzutreffen ist."
  },
  {
    "id": 70,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Seeadler in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Haliaeetus albicilla",
      "Strix aluco",
      "Lanius collurio",
      "Regulus ignicapilla"
    ],
    "exp": "Der wissenschaftliche Name von Seeadler lautet Haliaeetus albicilla. Lebensraum: seenreiche Wälder zwischen Schlabendorfer See, Teichlandschaften und Spreewald."
  },
  {
    "id": 71,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (pfeifendes, scharfes „Ki-ip, ki-ip“ in Horstnähe) und lebt bevorzugt in folgendem Lebensraum: Gewässer der Bergbaufolgelandschaft und Waldränder Südbrandenburgs?",
    "a": [
      "Fischadler",
      "Uhu",
      "Raubwürger",
      "Tannenmeise"
    ],
    "exp": "Fischadler (Pandion haliaetus): Brandenburg besitzt die dichteste Fischadler-Population Mitteleuropas; seine äußere Zehe ist als Wendezehe nach hinten drehbar."
  },
  {
    "id": 72,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Fischadler (Pandion haliaetus) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "pfeifendes, scharfes „Ki-ip, ki-ip“ in Horstnähe",
      "tiefes, weitreichendes „Bu-ho“ in klaren Spätwinternächten",
      "trillernder Gesang und rauer Warnruf",
      "flottes, zweisilbiges „Witze-witze-witze“ aus den Kiefernkronen"
    ],
    "exp": "Typisch für den Fischadler ist: pfeifendes, scharfes „Ki-ip, ki-ip“ in Horstnähe. Brandenburg besitzt die dichteste Fischadler-Population Mitteleuropas; seine äußere Zehe ist als Wendezehe nach hinten drehbar."
  },
  {
    "id": 73,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Fischadler?",
    "a": [
      "frei nach oben offener Horst auf Baumspitzen oder speziellen Strommast-Plattformen",
      "brütet auf Fels- oder Sandabbruchkanten, am Waldboden oder in alten Greifvogelhorsten",
      "kugelige Nester hoch in Kiefern oder Dornbüschen",
      "Höhlenbrüter in kleinen Baumhöhlen, Mauselöchern im Waldboden oder Nistkästen"
    ],
    "exp": "Beim Fischadler (Pandion haliaetus) gilt: frei nach oben offener Horst auf Baumspitzen oder speziellen Strommast-Plattformen. Brandenburg besitzt die dichteste Fischadler-Population Mitteleuropas; seine äußere Zehe ist als Wendezehe nach hinten drehbar."
  },
  {
    "id": 74,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Fischadler (Pandion haliaetus) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "ausschließlich lebende Fische, die er im Stoßtauchen mit den Fängen aus dem Wasser greift",
      "Igel, Ratten, Mäuse, Hasen, Tauben und Krähen",
      "Feldmäuse, Eidechsen, Singvögel und Großinsekten von hoher Ansitzwarte aus",
      "Nadelbauminsekten, Rindenläuse und feine Kiefernsamen"
    ],
    "exp": "Auf dem Speiseplan des Fischadler stehen vor allem: ausschließlich lebende Fische, die er im Stoßtauchen mit den Fängen aus dem Wasser greift."
  },
  {
    "id": 75,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Brandenburg besitzt die dichteste Fischadler-Population Mitteleuropas; seine äußere Zehe ist als Wendezehe nach hinten drehbar.“?",
    "a": [
      "Fischadler (Pandion haliaetus)",
      "Uhu (Bubo bubo)",
      "Raubwürger (Lanius excubitor)",
      "Tannenmeise (Periparus ater)"
    ],
    "exp": "Diese Besonderheit beschreibt den Fischadler (Pandion haliaetus), der in Gewässer der Bergbaufolgelandschaft und Waldränder Südbrandenburgs anzutreffen ist."
  },
  {
    "id": 76,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Fischadler in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Pandion haliaetus",
      "Bubo bubo",
      "Lanius excubitor",
      "Periparus ater"
    ],
    "exp": "Der wissenschaftliche Name von Fischadler lautet Pandion haliaetus. Lebensraum: Gewässer der Bergbaufolgelandschaft und Waldränder Südbrandenburgs."
  },
  {
    "id": 77,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (weithin hörbares, katzenartig gedehntes „Piiääh“ beim Kreisen in der Thermik) und lebt bevorzugt in folgendem Lebensraum: Wälder, Waldränder und Wiesen rund um Schwarzenburg?",
    "a": [
      "Mäusebussard",
      "Waldohreule",
      "Eichelhäher",
      "Haubenmeise"
    ],
    "exp": "Mäusebussard (Buteo buteo): Der häufigste Greifvogel der Region tritt in sehr unterschiedlichen Farbvarianten von fast weiß über braun bis dunkelbraun auf."
  },
  {
    "id": 78,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Mäusebussard (Buteo buteo) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "weithin hörbares, katzenartig gedehntes „Piiääh“ beim Kreisen in der Thermik",
      "dumpfes, alle 3 Sekunden wiederholtes „Hu“; Jungvögel rufen nachts fiepend wie eine ungeölte Türangel",
      "lautes, rätschendes „Räätsch“, mit dem er alle Tiere des Waldes vor Spaziergängern warnt",
      "unverwechselbares, rollendes Trillern „Zii-gür-gür-gür“"
    ],
    "exp": "Typisch für den Mäusebussard ist: weithin hörbares, katzenartig gedehntes „Piiääh“ beim Kreisen in der Thermik. Der häufigste Greifvogel der Region tritt in sehr unterschiedlichen Farbvarianten von fast weiß über braun bis dunkelbraun auf."
  },
  {
    "id": 79,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Mäusebussard?",
    "a": [
      "Reisighorst in hohen Kiefern oder Eichen nahe dem Waldrand",
      "brütet in alten Elstern- oder Krähennestern in Kiefern",
      "Schalennest in Kiefern oder Laubbäumen; im Flug leuchtet das himmelblau-schwarz gebänderte Flügelfeld",
      "hackt ihre Bruthöhle meist selbst in morsches, weiches Kiefernholz"
    ],
    "exp": "Beim Mäusebussard (Buteo buteo) gilt: Reisighorst in hohen Kiefern oder Eichen nahe dem Waldrand. Der häufigste Greifvogel der Region tritt in sehr unterschiedlichen Farbvarianten von fast weiß über braun bis dunkelbraun auf."
  },
  {
    "id": 80,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Mäusebussard (Buteo buteo) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Feldmäuse, Maulwürfe, Regenwürmer, Eidechsen und Fallwild",
      "überwiegend Feld- und Erdmäuse auf den Wiesen am Waldrand",
      "im Sommer Insekten und Beeren, im Herbst und Winter vor allem Eicheln und Bucheckern",
      "Spinnen, Insekten und Kiefernsamen, die sie oft unter Rindenschuppen für den Winter versteckt"
    ],
    "exp": "Auf dem Speiseplan des Mäusebussard stehen vor allem: Feldmäuse, Maulwürfe, Regenwürmer, Eidechsen und Fallwild."
  },
  {
    "id": 81,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Der häufigste Greifvogel der Region tritt in sehr unterschiedlichen Farbvarianten von fast weiß über braun bis dunkelbraun auf.“?",
    "a": [
      "Mäusebussard (Buteo buteo)",
      "Waldohreule (Asio otus)",
      "Eichelhäher (Garrulus glandarius)",
      "Haubenmeise (Lophophanes cristatus)"
    ],
    "exp": "Diese Besonderheit beschreibt den Mäusebussard (Buteo buteo), der in Wälder, Waldränder und Wiesen rund um Schwarzenburg anzutreffen ist."
  },
  {
    "id": 82,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Mäusebussard in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Buteo buteo",
      "Asio otus",
      "Garrulus glandarius",
      "Lophophanes cristatus"
    ],
    "exp": "Der wissenschaftliche Name von Mäusebussard lautet Buteo buteo. Lebensraum: Wälder, Waldränder und Wiesen rund um Schwarzenburg."
  },
  {
    "id": 83,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (energisches „Gik-gik-gik“ im Brutrevier im zeitigen Frühjahr) und lebt bevorzugt in folgendem Lebensraum: geschlossene Kiefern- und Mischwälder mit angrenzenden Lichtungen?",
    "a": [
      "Habicht",
      "Schleiereule",
      "Kolkrabe",
      "Kohlmeise"
    ],
    "exp": "Habicht (Accipiter gentilis): Mit kurzen, runden Flügeln und langem Stoß manövriert dieser Überraschungsjäger blitzschnell zwischen dicht stehenden Kiefernstämmen."
  },
  {
    "id": 84,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Habicht (Accipiter gentilis) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "energisches „Gik-gik-gik“ im Brutrevier im zeitigen Frühjahr",
      "heiseres, kreischendes Schnarchen und Fauchen statt eines Eulenrufs",
      "tiefes, sonores „Klong“ oder „Korrk“, das kilometerweit über den Kiefernwald trägt",
      "zweisilbiges, metallisches „Zizibäh-zizibäh“ schon an sonnigen Februartagen"
    ],
    "exp": "Typisch für den Habicht ist: energisches „Gik-gik-gik“ im Brutrevier im zeitigen Frühjahr. Mit kurzen, runden Flügeln und langem Stoß manövriert dieser Überraschungsjäger blitzschnell zwischen dicht stehenden Kiefernstämmen."
  },
  {
    "id": 85,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Habicht?",
    "a": [
      "großer Horst in einer Stammgabel hoher Waldbäume",
      "dunkle Nischen in Scheunen und Kirchtürmen mit freiem Einflug („Eulenloch“)",
      "massiver Reisighorst in hohen Waldkiefern, brütet bereits ab Ende Februar",
      "Baumhöhlen, Nistkästen und zuweilen sogar Briefkästen oder Gießkannen"
    ],
    "exp": "Beim Habicht (Accipiter gentilis) gilt: großer Horst in einer Stammgabel hoher Waldbäume. Mit kurzen, runden Flügeln und langem Stoß manövriert dieser Überraschungsjäger blitzschnell zwischen dicht stehenden Kiefernstämmen."
  },
  {
    "id": 86,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Habicht (Accipiter gentilis) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Ringeltauben, Eichelhäher, Drosseln, Krähen und Eichhörnchen",
      "Spitzmäuse, Hausmäuse und Feldmäuse rund um Höfe und Gärten",
      "Allesfresser: Fallwild (oft zusammen mit Wölfen und Seeadlern), Insekten, Kleinsäuger, Früchte",
      "Raupen, Spinnen, Käfer und im Winter Sonnenblumenkerne und Nüsse"
    ],
    "exp": "Auf dem Speiseplan des Habicht stehen vor allem: Ringeltauben, Eichelhäher, Drosseln, Krähen und Eichhörnchen."
  },
  {
    "id": 87,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Mit kurzen, runden Flügeln und langem Stoß manövriert dieser Überraschungsjäger blitzschnell zwischen dicht stehenden Kiefernstämmen.“?",
    "a": [
      "Habicht (Accipiter gentilis)",
      "Schleiereule (Tyto alba)",
      "Kolkrabe (Corvus corax)",
      "Kohlmeise (Parus major)"
    ],
    "exp": "Diese Besonderheit beschreibt den Habicht (Accipiter gentilis), der in geschlossene Kiefern- und Mischwälder mit angrenzenden Lichtungen anzutreffen ist."
  },
  {
    "id": 88,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Habicht in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Accipiter gentilis",
      "Tyto alba",
      "Corvus corax",
      "Parus major"
    ],
    "exp": "Der wissenschaftliche Name von Habicht lautet Accipiter gentilis. Lebensraum: geschlossene Kiefern- und Mischwälder mit angrenzenden Lichtungen."
  },
  {
    "id": 89,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (schnelles, hohes „Kew-kew-kew“ am Brutplatz) und lebt bevorzugt in folgendem Lebensraum: nadelholzreiche Wälder und im Winter auch an Futterhäusern in Waldgärten?",
    "a": [
      "Sperber",
      "Waldschnepfe",
      "Rotkehlchen",
      "Blaumeise"
    ],
    "exp": "Sperber (Accipiter nisus): Das Sperberweibchen ist fast doppelt so schwer wie das kleinere Männchen mit der rostrot gebänderten Brust."
  },
  {
    "id": 90,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Sperber (Accipiter nisus) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "schnelles, hohes „Kew-kew-kew“ am Brutplatz",
      "beim abendlichen „Schnepfenstrich“ knorrendes „Quorr-quorr“ gefolgt von scharfem „Puitz“",
      "silbrig perlender, leicht melancholischer Gesang bis in die Dämmerung und scharfes „Tick-tick“",
      "hell klingelndes „Tii-tii-tüh-tüh-tüh“"
    ],
    "exp": "Typisch für den Sperber ist: schnelles, hohes „Kew-kew-kew“ am Brutplatz. Das Sperberweibchen ist fast doppelt so schwer wie das kleinere Männchen mit der rostrot gebänderten Brust."
  },
  {
    "id": 91,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Sperber?",
    "a": [
      "flacher Reisighorst im dichten Stangenholz von Kiefern oder Fichten",
      "perfekt getarnte Bodenmulde im trockenem Laub",
      "verstecktes Nest am Boden unter Wurzeln, im Efeu oder in Halbhöhlen",
      "kleine Baumhöhlen und Meisenkästen mit engem 28-mm-Einflugloch"
    ],
    "exp": "Beim Sperber (Accipiter nisus) gilt: flacher Reisighorst im dichten Stangenholz von Kiefern oder Fichten. Das Sperberweibchen ist fast doppelt so schwer wie das kleinere Männchen mit der rostrot gebänderten Brust."
  },
  {
    "id": 92,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Sperber (Accipiter nisus) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "fast ausschließlich kleine Singvögel wie Meisen, Finken und Sperlinge",
      "Regenwürmer und Insektenlarven, die sie mit dem langen, biegsamen Tastschnabel im Waldboden aufspürt",
      "Spinnen, kleine Käfer, Würmer und im Herbst Beeren sowie Haferflocken am Futterplatz",
      "Blattläuse, kleine Raupen an Knospen und Sämereien"
    ],
    "exp": "Auf dem Speiseplan des Sperber stehen vor allem: fast ausschließlich kleine Singvögel wie Meisen, Finken und Sperlinge."
  },
  {
    "id": 93,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Das Sperberweibchen ist fast doppelt so schwer wie das kleinere Männchen mit der rostrot gebänderten Brust.“?",
    "a": [
      "Sperber (Accipiter nisus)",
      "Waldschnepfe (Scolopax rusticola)",
      "Rotkehlchen (Erithacus rubecula)",
      "Blaumeise (Cyanistes caeruleus)"
    ],
    "exp": "Diese Besonderheit beschreibt den Sperber (Accipiter nisus), der in nadelholzreiche Wälder und im Winter auch an Futterhäusern in Waldgärten anzutreffen ist."
  },
  {
    "id": 94,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Sperber in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Accipiter nisus",
      "Scolopax rusticola",
      "Erithacus rubecula",
      "Cyanistes caeruleus"
    ],
    "exp": "Der wissenschaftliche Name von Sperber lautet Accipiter nisus. Lebensraum: nadelholzreiche Wälder und im Winter auch an Futterhäusern in Waldgärten."
  },
  {
    "id": 95,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (helles, gereihtes „Kikikiki“) und lebt bevorzugt in folgendem Lebensraum: Kulturlandschaft, Kirchtürme, alte Scheunen und Waldränder?",
    "a": [
      "Turmfalke",
      "Pirol",
      "Zaunkönig",
      "Kleiber (Spechtmeise)"
    ],
    "exp": "Turmfalke (Falco tinnunculus): Berühmt für seinen „Rüttelflug“, bei dem er mit schnellen Flügelschlägen und gefächertem Schwanz wie an einer Schnur im Wind steht."
  },
  {
    "id": 96,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Turmfalke (Falco tinnunculus) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "helles, gereihtes „Kikikiki“",
      "flötendes, klangvolles „Didlioh“ („Bülow“) und krächzender Warnruf wie ein Eichelhäher",
      "erstaunlich schmetternder, lauter Trillergesang mit über 90 Dezibel",
      "laut pfeifendes „Tuit-tuit-tuit“ und scharfes „Twett“"
    ],
    "exp": "Typisch für den Turmfalke ist: helles, gereihtes „Kikikiki“. Berühmt für seinen „Rüttelflug“, bei dem er mit schnellen Flügelschlägen und gefächertem Schwanz wie an einer Schnur im Wind steht."
  },
  {
    "id": 97,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Turmfalke?",
    "a": [
      "brütet in Mauernischen alter Scheunen, Kirchtürmen oder verlassenen Krähennestern",
      "kunstvoll geflochtenes Hängenest in einer äußeren Astgabel hoch in der Baumkrone",
      "Männchen baut mehrere kugelige Moosnester, aus denen das Weibchen eines auswählt und mit Federn auspolstert",
      "mauert das Einflugloch alter Spechthöhlen mit feuchtem Lehm exakt auf seine eigene Körpergröße zu („Kleiber“ = Lehmkleber)"
    ],
    "exp": "Beim Turmfalke (Falco tinnunculus) gilt: brütet in Mauernischen alter Scheunen, Kirchtürmen oder verlassenen Krähennestern. Berühmt für seinen „Rüttelflug“, bei dem er mit schnellen Flügelschlägen und gefächertem Schwanz wie an einer Schnur im Wind steht."
  },
  {
    "id": 98,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Turmfalke (Falco tinnunculus) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Feldmäuse, große Heuschrecken und Käfer",
      "behaarte Schmetterlingsraupen, Maikäfer und im Spätsommer süße Waldbeeren und Kirschen",
      "winzige Spinnen, Weberknechte, Mücken und Insektenlarven im Reisig",
      "Rindeninsekten sowie im Herbst und Winter Haselnüsse, Bucheckern und Kiefernsamen"
    ],
    "exp": "Auf dem Speiseplan des Turmfalke stehen vor allem: Feldmäuse, große Heuschrecken und Käfer."
  },
  {
    "id": 99,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Berühmt für seinen „Rüttelflug“, bei dem er mit schnellen Flügelschlägen und gefächertem Schwanz wie an einer Schnur im Wind steht.“?",
    "a": [
      "Turmfalke (Falco tinnunculus)",
      "Pirol (Oriolus oriolus)",
      "Zaunkönig (Troglodytes troglodytes)",
      "Kleiber (Spechtmeise) (Sitta europaea)"
    ],
    "exp": "Diese Besonderheit beschreibt den Turmfalke (Falco tinnunculus), der in Kulturlandschaft, Kirchtürme, alte Scheunen und Waldränder anzutreffen ist."
  },
  {
    "id": 100,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Turmfalke in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Falco tinnunculus",
      "Oriolus oriolus",
      "Troglodytes troglodytes",
      "Sitta europaea"
    ],
    "exp": "Der wissenschaftliche Name von Turmfalke lautet Falco tinnunculus. Lebensraum: Kulturlandschaft, Kirchtürme, alte Scheunen und Waldränder."
  },
  {
    "id": 101,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (klingendes „Gäth-gäth-gäth“) und lebt bevorzugt in folgendem Lebensraum: lichte Kiefernwälder mit angrenzenden Mooren, Seen und Heiden?",
    "a": [
      "Baumfalke",
      "Kuckuck",
      "Wintergoldhähnchen",
      "Waldbaumläufer"
    ],
    "exp": "Baumfalke (Falco subbuteo): Mit seinen sichelförmigen Flügeln und den rostroten „Hosen“ (Beinbefiederung) ist er einer der wendigsten Flugjäger Europas."
  },
  {
    "id": 102,
    "cat": "voegel",
    "diff": "pro",
    "q": "Woran erkennt man den Baumfalke (Falco subbuteo) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "klingendes „Gäth-gäth-gäth“",
      "unverwechselbares zweisilbiges „Kuck-uck“ des Männchens ab Ende April",
      "extrem feines, hohes „Si-si-si“, das für ältere menschliche Ohren oft kaum noch hörbar ist",
      "feiner, abfallender Trillergesang und hohes „Srii“"
    ],
    "exp": "Typisch für den Baumfalke ist: klingendes „Gäth-gäth-gäth“. Mit seinen sichelförmigen Flügeln und den rostroten „Hosen“ (Beinbefiederung) ist er einer der wendigsten Flugjäger Europas."
  },
  {
    "id": 103,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Baumfalke?",
    "a": [
      "bezieht alte Krähennester in den Wipfeln hoher Waldrandkiefern",
      "Brutschmarotzer: legt je ein Ei in Nester von Teichrohrsängern, Rotkehlchen oder Bachstelzen",
      "kunstvolles Hängenest unter einem äußeren Nadelbaumzweig",
      "schmale Nische hinter abstehenden Rindenschuppen alter Kiefern"
    ],
    "exp": "Beim Baumfalke (Falco subbuteo) gilt: bezieht alte Krähennester in den Wipfeln hoher Waldrandkiefern. Mit seinen sichelförmigen Flügeln und den rostroten „Hosen“ (Beinbefiederung) ist er einer der wendigsten Flugjäger Europas."
  },
  {
    "id": 104,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Baumfalke (Falco subbuteo) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "im rasanten Jagdflug erbeutete Großlibellen, Schwalben und sogar Mauersegler",
      "stachlige und giftig behaarte Raupen (z. B. Kiefernspinner, Bärenspinner), die andere Vögel meiden",
      "winzige Springschwänze, Blattläuse und Spinnen zwischen den Kiefernnadeln",
      "mit dem gebogenen Pinzettenschnabel aus tiefen Borkenritzen gezogene Spinnen und Insektenpuppen"
    ],
    "exp": "Auf dem Speiseplan des Baumfalke stehen vor allem: im rasanten Jagdflug erbeutete Großlibellen, Schwalben und sogar Mauersegler."
  },
  {
    "id": 105,
    "cat": "voegel",
    "diff": "pro",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Mit seinen sichelförmigen Flügeln und den rostroten „Hosen“ (Beinbefiederung) ist er einer der wendigsten Flugjäger Europas.“?",
    "a": [
      "Baumfalke (Falco subbuteo)",
      "Kuckuck (Cuculus canorus)",
      "Wintergoldhähnchen (Regulus regulus)",
      "Waldbaumläufer (Certhia familiaris)"
    ],
    "exp": "Diese Besonderheit beschreibt den Baumfalke (Falco subbuteo), der in lichte Kiefernwälder mit angrenzenden Mooren, Seen und Heiden anzutreffen ist."
  },
  {
    "id": 106,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Baumfalke in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Falco subbuteo",
      "Cuculus canorus",
      "Regulus regulus",
      "Certhia familiaris"
    ],
    "exp": "Der wissenschaftliche Name von Baumfalke lautet Falco subbuteo. Lebensraum: lichte Kiefernwälder mit angrenzenden Mooren, Seen und Heiden."
  },
  {
    "id": 107,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (bekannter Hohlruf des Männchens „Huu-hu-huhuhuhu“ und scharfes „Kuwitt“ des Weibchens) und lebt bevorzugt in folgendem Lebensraum: alte Baumbestände, Parkanlagen, Waldgärten und Scheunen?",
    "a": [
      "Waldkauz",
      "Neuntöter (Rotrückenwürger)",
      "Sommergoldhähnchen",
      "Fichtenkreuzschnabel"
    ],
    "exp": "Waldkauz (Strix aluco): Dank kammartig ausgefranster Handschwingenfedern fliegt der Waldkauz in der Dunkelheit nahezu völlig lautlos."
  },
  {
    "id": 108,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Waldkauz (Strix aluco) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "bekannter Hohlruf des Männchens „Huu-hu-huhuhuhu“ und scharfes „Kuwitt“ des Weibchens",
      "rauhes „Gä-gä“ und leiser, spottender Gesang mit imitierten Vogelstimmen",
      "gleichförmige, am Ende ansteigende hohe Tonreihe",
      "metallisches „Gip-gip-gip“ im Truppflug über den Baumwipfeln"
    ],
    "exp": "Typisch für den Waldkauz ist: bekannter Hohlruf des Männchens „Huu-hu-huhuhuhu“ und scharfes „Kuwitt“ des Weibchens. Dank kammartig ausgefranster Handschwingenfedern fliegt der Waldkauz in der Dunkelheit nahezu völlig lautlos."
  },
  {
    "id": 109,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Waldkauz?",
    "a": [
      "große Baumhöhlen, Dachböden alter Höfe oder spezielle Eulen-Nistkästen",
      "stabiles Nest im dichten Dornengebüsch",
      "dicht gewebtes Moos- und Spinnwebennest im Gezweig",
      "brütet oft mitten im tiefsten Winter (Januar/Februar), wenn die Zapfen reif sind"
    ],
    "exp": "Beim Waldkauz (Strix aluco) gilt: große Baumhöhlen, Dachböden alter Höfe oder spezielle Eulen-Nistkästen. Dank kammartig ausgefranster Handschwingenfedern fliegt der Waldkauz in der Dunkelheit nahezu völlig lautlos."
  },
  {
    "id": 110,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Waldkauz (Strix aluco) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Waldmäuse, Wühlmäuse, Kleinvögel, Frösche und große Käfer",
      "Großinsekten wie Mistkäfer, Heuschrecken, Hummeln sowie gelegentlich Eidechsen und Mäuse",
      "kleinste Insekten und Spinnen auf Zweigen und Nadeln",
      "Samen aus den Zapfen von Fichten und Kiefern"
    ],
    "exp": "Auf dem Speiseplan des Waldkauz stehen vor allem: Waldmäuse, Wühlmäuse, Kleinvögel, Frösche und große Käfer."
  },
  {
    "id": 111,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Dank kammartig ausgefranster Handschwingenfedern fliegt der Waldkauz in der Dunkelheit nahezu völlig lautlos.“?",
    "a": [
      "Waldkauz (Strix aluco)",
      "Neuntöter (Rotrückenwürger) (Lanius collurio)",
      "Sommergoldhähnchen (Regulus ignicapilla)",
      "Fichtenkreuzschnabel (Loxia curvirostra)"
    ],
    "exp": "Diese Besonderheit beschreibt den Waldkauz (Strix aluco), der in alte Baumbestände, Parkanlagen, Waldgärten und Scheunen anzutreffen ist."
  },
  {
    "id": 112,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Waldkauz in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Strix aluco",
      "Lanius collurio",
      "Regulus ignicapilla",
      "Loxia curvirostra"
    ],
    "exp": "Der wissenschaftliche Name von Waldkauz lautet Strix aluco. Lebensraum: alte Baumbestände, Parkanlagen, Waldgärten und Scheunen."
  },
  {
    "id": 113,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (tiefes, weitreichendes „Bu-ho“ in klaren Spätwinternächten) und lebt bevorzugt in folgendem Lebensraum: ruhige Wälder, ehemalige Tagebauränder und Sandgruben der Lausitz?",
    "a": [
      "Uhu",
      "Raubwürger",
      "Tannenmeise",
      "Gimpel (Dompfaff)"
    ],
    "exp": "Uhu (Bubo bubo): Die größte Eule der Welt erreicht bis zu 1,70 m Spannweite, hat markante Federohren und leuchtend orangegelbe Augen."
  },
  {
    "id": 114,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Uhu (Bubo bubo) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "tiefes, weitreichendes „Bu-ho“ in klaren Spätwinternächten",
      "trillernder Gesang und rauer Warnruf",
      "flottes, zweisilbiges „Witze-witze-witze“ aus den Kiefernkronen",
      "sanftes, wehmütig flötendes „Djü“"
    ],
    "exp": "Typisch für den Uhu ist: tiefes, weitreichendes „Bu-ho“ in klaren Spätwinternächten. Die größte Eule der Welt erreicht bis zu 1,70 m Spannweite, hat markante Federohren und leuchtend orangegelbe Augen."
  },
  {
    "id": 115,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Uhu?",
    "a": [
      "brütet auf Fels- oder Sandabbruchkanten, am Waldboden oder in alten Greifvogelhorsten",
      "kugelige Nester hoch in Kiefern oder Dornbüschen",
      "Höhlenbrüter in kleinen Baumhöhlen, Mauselöchern im Waldboden oder Nistkästen",
      "flaches Reisignest im dichten Nadelgezweig"
    ],
    "exp": "Beim Uhu (Bubo bubo) gilt: brütet auf Fels- oder Sandabbruchkanten, am Waldboden oder in alten Greifvogelhorsten. Die größte Eule der Welt erreicht bis zu 1,70 m Spannweite, hat markante Federohren und leuchtend orangegelbe Augen."
  },
  {
    "id": 116,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Uhu (Bubo bubo) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Igel, Ratten, Mäuse, Hasen, Tauben und Krähen",
      "Feldmäuse, Eidechsen, Singvögel und Großinsekten von hoher Ansitzwarte aus",
      "Nadelbauminsekten, Rindenläuse und feine Kiefernsamen",
      "Samen von Eberesche (Vogelbeere), Ahorn, Brennnessel sowie Baumknospen"
    ],
    "exp": "Auf dem Speiseplan des Uhu stehen vor allem: Igel, Ratten, Mäuse, Hasen, Tauben und Krähen."
  },
  {
    "id": 117,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Die größte Eule der Welt erreicht bis zu 1,70 m Spannweite, hat markante Federohren und leuchtend orangegelbe Augen.“?",
    "a": [
      "Uhu (Bubo bubo)",
      "Raubwürger (Lanius excubitor)",
      "Tannenmeise (Periparus ater)",
      "Gimpel (Dompfaff) (Pyrrhula pyrrhula)"
    ],
    "exp": "Diese Besonderheit beschreibt den Uhu (Bubo bubo), der in ruhige Wälder, ehemalige Tagebauränder und Sandgruben der Lausitz anzutreffen ist."
  },
  {
    "id": 118,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Uhu in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Bubo bubo",
      "Lanius excubitor",
      "Periparus ater",
      "Pyrrhula pyrrhula"
    ],
    "exp": "Der wissenschaftliche Name von Uhu lautet Bubo bubo. Lebensraum: ruhige Wälder, ehemalige Tagebauränder und Sandgruben der Lausitz."
  },
  {
    "id": 119,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (dumpfes, alle 3 Sekunden wiederholtes „Hu“; Jungvögel rufen nachts fiepend wie eine ungeölte Türangel) und lebt bevorzugt in folgendem Lebensraum: Kiefernforste und Feldgehölze am Rand offener Wiesen?",
    "a": [
      "Waldohreule",
      "Eichelhäher",
      "Haubenmeise",
      "Kernbeißer"
    ],
    "exp": "Waldohreule (Asio otus): Bei Gefahr macht sich die Waldohreule stocksteif und schmal wie ein abgebrochener Kiefernzweig."
  },
  {
    "id": 120,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Waldohreule (Asio otus) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "dumpfes, alle 3 Sekunden wiederholtes „Hu“; Jungvögel rufen nachts fiepend wie eine ungeölte Türangel",
      "lautes, rätschendes „Räätsch“, mit dem er alle Tiere des Waldes vor Spaziergängern warnt",
      "unverwechselbares, rollendes Trillern „Zii-gür-gür-gür“",
      "scharfes, explosives „Zick“ aus den Baumwipfeln"
    ],
    "exp": "Typisch für den Waldohreule ist: dumpfes, alle 3 Sekunden wiederholtes „Hu“; Jungvögel rufen nachts fiepend wie eine ungeölte Türangel. Bei Gefahr macht sich die Waldohreule stocksteif und schmal wie ein abgebrochener Kiefernzweig."
  },
  {
    "id": 121,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Waldohreule?",
    "a": [
      "brütet in alten Elstern- oder Krähennestern in Kiefern",
      "Schalennest in Kiefern oder Laubbäumen; im Flug leuchtet das himmelblau-schwarz gebänderte Flügelfeld",
      "hackt ihre Bruthöhle meist selbst in morsches, weiches Kiefernholz",
      "Napfnest in den Kronen von Laub- und Obstbäumen"
    ],
    "exp": "Beim Waldohreule (Asio otus) gilt: brütet in alten Elstern- oder Krähennestern in Kiefern. Bei Gefahr macht sich die Waldohreule stocksteif und schmal wie ein abgebrochener Kiefernzweig."
  },
  {
    "id": 122,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Waldohreule (Asio otus) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "überwiegend Feld- und Erdmäuse auf den Wiesen am Waldrand",
      "im Sommer Insekten und Beeren, im Herbst und Winter vor allem Eicheln und Bucheckern",
      "Spinnen, Insekten und Kiefernsamen, die sie oft unter Rindenschuppen für den Winter versteckt",
      "harte Kirschkerne, Hainbuchensamen, Schlehenkerne und Sonnenblumenkerne"
    ],
    "exp": "Auf dem Speiseplan des Waldohreule stehen vor allem: überwiegend Feld- und Erdmäuse auf den Wiesen am Waldrand."
  },
  {
    "id": 123,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Bei Gefahr macht sich die Waldohreule stocksteif und schmal wie ein abgebrochener Kiefernzweig.“?",
    "a": [
      "Waldohreule (Asio otus)",
      "Eichelhäher (Garrulus glandarius)",
      "Haubenmeise (Lophophanes cristatus)",
      "Kernbeißer (Coccothraustes coccothraustes)"
    ],
    "exp": "Diese Besonderheit beschreibt den Waldohreule (Asio otus), der in Kiefernforste und Feldgehölze am Rand offener Wiesen anzutreffen ist."
  },
  {
    "id": 124,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Waldohreule in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Asio otus",
      "Garrulus glandarius",
      "Lophophanes cristatus",
      "Coccothraustes coccothraustes"
    ],
    "exp": "Der wissenschaftliche Name von Waldohreule lautet Asio otus. Lebensraum: Kiefernforste und Feldgehölze am Rand offener Wiesen."
  },
  {
    "id": 125,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (heiseres, kreischendes Schnarchen und Fauchen statt eines Eulenrufs) und lebt bevorzugt in folgendem Lebensraum: traditionelle Bauernhöfe, alte Holzscheunen und Kirchtürme der Dörfer in Heideblick?",
    "a": [
      "Schleiereule",
      "Kolkrabe",
      "Kohlmeise",
      "Singdrossel"
    ],
    "exp": "Schleiereule (Tyto alba): Ihr herzförmiger weißer Gesichtsschleier wirkt wie ein Parabolspiegel, der das Rascheln einer Maus im Stroh präzise zum Ohr leitet."
  },
  {
    "id": 126,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Schleiereule (Tyto alba) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "heiseres, kreischendes Schnarchen und Fauchen statt eines Eulenrufs",
      "tiefes, sonores „Klong“ oder „Korrk“, das kilometerweit über den Kiefernwald trägt",
      "zweisilbiges, metallisches „Zizibäh-zizibäh“ schon an sonnigen Februartagen",
      "lauter, abwechslungsreicher Gesang aus der Baumspitze, bei dem jedes Motiv zwei- bis viermal wiederholt wird"
    ],
    "exp": "Typisch für den Schleiereule ist: heiseres, kreischendes Schnarchen und Fauchen statt eines Eulenrufs. Ihr herzförmiger weißer Gesichtsschleier wirkt wie ein Parabolspiegel, der das Rascheln einer Maus im Stroh präzise zum Ohr leitet."
  },
  {
    "id": 127,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Schleiereule?",
    "a": [
      "dunkle Nischen in Scheunen und Kirchtürmen mit freiem Einflug („Eulenloch“)",
      "massiver Reisighorst in hohen Waldkiefern, brütet bereits ab Ende Februar",
      "Baumhöhlen, Nistkästen und zuweilen sogar Briefkästen oder Gießkannen",
      "glatt mit Holzmulm und Speichel ausgekleidetes Napfnest („wie verputzt“)"
    ],
    "exp": "Beim Schleiereule (Tyto alba) gilt: dunkle Nischen in Scheunen und Kirchtürmen mit freiem Einflug („Eulenloch“). Ihr herzförmiger weißer Gesichtsschleier wirkt wie ein Parabolspiegel, der das Rascheln einer Maus im Stroh präzise zum Ohr leitet."
  },
  {
    "id": 128,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Schleiereule (Tyto alba) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Spitzmäuse, Hausmäuse und Feldmäuse rund um Höfe und Gärten",
      "Allesfresser: Fallwild (oft zusammen mit Wölfen und Seeadlern), Insekten, Kleinsäuger, Früchte",
      "Raupen, Spinnen, Käfer und im Winter Sonnenblumenkerne und Nüsse",
      "Gehäuseschnecken, Regenwürmer, Insekten und Waldbeeren"
    ],
    "exp": "Auf dem Speiseplan des Schleiereule stehen vor allem: Spitzmäuse, Hausmäuse und Feldmäuse rund um Höfe und Gärten."
  },
  {
    "id": 129,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Ihr herzförmiger weißer Gesichtsschleier wirkt wie ein Parabolspiegel, der das Rascheln einer Maus im Stroh präzise zum Ohr leitet.“?",
    "a": [
      "Schleiereule (Tyto alba)",
      "Kolkrabe (Corvus corax)",
      "Kohlmeise (Parus major)",
      "Singdrossel (Turdus philomelos)"
    ],
    "exp": "Diese Besonderheit beschreibt den Schleiereule (Tyto alba), der in traditionelle Bauernhöfe, alte Holzscheunen und Kirchtürme der Dörfer in Heideblick anzutreffen ist."
  },
  {
    "id": 130,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Schleiereule in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Tyto alba",
      "Corvus corax",
      "Parus major",
      "Turdus philomelos"
    ],
    "exp": "Der wissenschaftliche Name von Schleiereule lautet Tyto alba. Lebensraum: traditionelle Bauernhöfe, alte Holzscheunen und Kirchtürme der Dörfer in Heideblick."
  },
  {
    "id": 131,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (beim abendlichen „Schnepfenstrich“ knorrendes „Quorr-quorr“ gefolgt von scharfem „Puitz“) und lebt bevorzugt in folgendem Lebensraum: feuchte Misch- und Kiefernwälder mit weichem Humusboden rund um Schwarzenburg?",
    "a": [
      "Waldschnepfe",
      "Rotkehlchen",
      "Blaumeise",
      "Misteldrossel"
    ],
    "exp": "Waldschnepfe (Scolopax rusticola): Ihre großen Augen sitzen so weit hinten am Kopf, dass die Waldschnepfe einen 360-Grad-Rundumblick hat – selbst beim Stochern im Boden."
  },
  {
    "id": 132,
    "cat": "voegel",
    "diff": "pro",
    "q": "Woran erkennt man den Waldschnepfe (Scolopax rusticola) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "beim abendlichen „Schnepfenstrich“ knorrendes „Quorr-quorr“ gefolgt von scharfem „Puitz“",
      "silbrig perlender, leicht melancholischer Gesang bis in die Dämmerung und scharfes „Tick-tick“",
      "hell klingelndes „Tii-tii-tüh-tüh-tüh“",
      "weithinhallender, flötender Gesang schon im Februar und schnarrendes „Schrr“ im Flug"
    ],
    "exp": "Typisch für den Waldschnepfe ist: beim abendlichen „Schnepfenstrich“ knorrendes „Quorr-quorr“ gefolgt von scharfem „Puitz“. Ihre großen Augen sitzen so weit hinten am Kopf, dass die Waldschnepfe einen 360-Grad-Rundumblick hat – selbst beim Stochern im Boden."
  },
  {
    "id": 133,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Waldschnepfe?",
    "a": [
      "perfekt getarnte Bodenmulde im trockenem Laub",
      "verstecktes Nest am Boden unter Wurzeln, im Efeu oder in Halbhöhlen",
      "kleine Baumhöhlen und Meisenkästen mit engem 28-mm-Einflugloch",
      "hoch in Astgabeln von Waldkiefern gebautes Nest"
    ],
    "exp": "Beim Waldschnepfe (Scolopax rusticola) gilt: perfekt getarnte Bodenmulde im trockenem Laub. Ihre großen Augen sitzen so weit hinten am Kopf, dass die Waldschnepfe einen 360-Grad-Rundumblick hat – selbst beim Stochern im Boden."
  },
  {
    "id": 134,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Waldschnepfe (Scolopax rusticola) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Regenwürmer und Insektenlarven, die sie mit dem langen, biegsamen Tastschnabel im Waldboden aufspürt",
      "Spinnen, kleine Käfer, Würmer und im Herbst Beeren sowie Haferflocken am Futterplatz",
      "Blattläuse, kleine Raupen an Knospen und Sämereien",
      "Mistelbeeren, Ebereschenbeeren, Regenwürmer und Käfer"
    ],
    "exp": "Auf dem Speiseplan des Waldschnepfe stehen vor allem: Regenwürmer und Insektenlarven, die sie mit dem langen, biegsamen Tastschnabel im Waldboden aufspürt."
  },
  {
    "id": 135,
    "cat": "voegel",
    "diff": "pro",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Ihre großen Augen sitzen so weit hinten am Kopf, dass die Waldschnepfe einen 360-Grad-Rundumblick hat – selbst beim Stochern im Boden.“?",
    "a": [
      "Waldschnepfe (Scolopax rusticola)",
      "Rotkehlchen (Erithacus rubecula)",
      "Blaumeise (Cyanistes caeruleus)",
      "Misteldrossel (Turdus viscivorus)"
    ],
    "exp": "Diese Besonderheit beschreibt den Waldschnepfe (Scolopax rusticola), der in feuchte Misch- und Kiefernwälder mit weichem Humusboden rund um Schwarzenburg anzutreffen ist."
  },
  {
    "id": 136,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Waldschnepfe in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Scolopax rusticola",
      "Erithacus rubecula",
      "Cyanistes caeruleus",
      "Turdus viscivorus"
    ],
    "exp": "Der wissenschaftliche Name von Waldschnepfe lautet Scolopax rusticola. Lebensraum: feuchte Misch- und Kiefernwälder mit weichem Humusboden rund um Schwarzenburg."
  },
  {
    "id": 137,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (flötendes, klangvolles „Didlioh“ („Bülow“) und krächzender Warnruf wie ein Eichelhäher) und lebt bevorzugt in folgendem Lebensraum: hohe Laubbaumkronen aus Birken, Eichen und Erlen an Waldrändern und Seen?",
    "a": [
      "Pirol",
      "Zaunkönig",
      "Kleiber (Spechtmeise)",
      "Amsel (Schwarzdrossel)"
    ],
    "exp": "Pirol (Oriolus oriolus): Das Männchen leuchtet wie ein tropischer Vogel in kräftigem Goldgelb mit tiefschwarzen Flügeln, bleibt aber meist geschickt im Blätterdach verborgen."
  },
  {
    "id": 138,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Pirol (Oriolus oriolus) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "flötendes, klangvolles „Didlioh“ („Bülow“) und krächzender Warnruf wie ein Eichelhäher",
      "erstaunlich schmetternder, lauter Trillergesang mit über 90 Dezibel",
      "laut pfeifendes „Tuit-tuit-tuit“ und scharfes „Twett“",
      "melodisches, warmes Flöten am Morgen und Abend sowie aufgeregtes „Tix-tix-tix“ bei Gefahr"
    ],
    "exp": "Typisch für den Pirol ist: flötendes, klangvolles „Didlioh“ („Bülow“) und krächzender Warnruf wie ein Eichelhäher. Das Männchen leuchtet wie ein tropischer Vogel in kräftigem Goldgelb mit tiefschwarzen Flügeln, bleibt aber meist geschickt im Blätterdach verborgen."
  },
  {
    "id": 139,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Pirol?",
    "a": [
      "kunstvoll geflochtenes Hängenest in einer äußeren Astgabel hoch in der Baumkrone",
      "Männchen baut mehrere kugelige Moosnester, aus denen das Weibchen eines auswählt und mit Federn auspolstert",
      "mauert das Einflugloch alter Spechthöhlen mit feuchtem Lehm exakt auf seine eigene Körpergröße zu („Kleiber“ = Lehmkleber)",
      "stabiles Napfnest aus Halmen und feuchter Erde in Büschen oder am Holzschuppen"
    ],
    "exp": "Beim Pirol (Oriolus oriolus) gilt: kunstvoll geflochtenes Hängenest in einer äußeren Astgabel hoch in der Baumkrone. Das Männchen leuchtet wie ein tropischer Vogel in kräftigem Goldgelb mit tiefschwarzen Flügeln, bleibt aber meist geschickt im Blätterdach verborgen."
  },
  {
    "id": 140,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Pirol (Oriolus oriolus) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "behaarte Schmetterlingsraupen, Maikäfer und im Spätsommer süße Waldbeeren und Kirschen",
      "winzige Spinnen, Weberknechte, Mücken und Insektenlarven im Reisig",
      "Rindeninsekten sowie im Herbst und Winter Haselnüsse, Bucheckern und Kiefernsamen",
      "Regenwürmer, Käferlarven im Falllaub sowie Beeren und Fallobst"
    ],
    "exp": "Auf dem Speiseplan des Pirol stehen vor allem: behaarte Schmetterlingsraupen, Maikäfer und im Spätsommer süße Waldbeeren und Kirschen."
  },
  {
    "id": 141,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Das Männchen leuchtet wie ein tropischer Vogel in kräftigem Goldgelb mit tiefschwarzen Flügeln, bleibt aber meist geschickt im Blätterdach verborgen.“?",
    "a": [
      "Pirol (Oriolus oriolus)",
      "Zaunkönig (Troglodytes troglodytes)",
      "Kleiber (Spechtmeise) (Sitta europaea)",
      "Amsel (Schwarzdrossel) (Turdus merula)"
    ],
    "exp": "Diese Besonderheit beschreibt den Pirol (Oriolus oriolus), der in hohe Laubbaumkronen aus Birken, Eichen und Erlen an Waldrändern und Seen anzutreffen ist."
  },
  {
    "id": 142,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Pirol in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Oriolus oriolus",
      "Troglodytes troglodytes",
      "Sitta europaea",
      "Turdus merula"
    ],
    "exp": "Der wissenschaftliche Name von Pirol lautet Oriolus oriolus. Lebensraum: hohe Laubbaumkronen aus Birken, Eichen und Erlen an Waldrändern und Seen."
  },
  {
    "id": 143,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (unverwechselbares zweisilbiges „Kuck-uck“ des Männchens ab Ende April) und lebt bevorzugt in folgendem Lebensraum: Wälder, Heiden, Moore und Schilfgebiete rund um Heideblick?",
    "a": [
      "Kuckuck",
      "Wintergoldhähnchen",
      "Waldbaumläufer",
      "Buchfink"
    ],
    "exp": "Kuckuck (Cuculus canorus): Der frisch geschlüpfte junge Kuckuck wirft Eier und Jungvögel seiner Wirtseltern rückwärts aus dem Nest, um allein gefüttert zu werden."
  },
  {
    "id": 144,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Kuckuck (Cuculus canorus) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "unverwechselbares zweisilbiges „Kuck-uck“ des Männchens ab Ende April",
      "extrem feines, hohes „Si-si-si“, das für ältere menschliche Ohren oft kaum noch hörbar ist",
      "feiner, abfallender Trillergesang und hohes „Srii“",
      "schmetternder „Finkenschlag“ mit der typischen Schlussstrophe („Würzgebirg“) und Regenruf „Rülp“"
    ],
    "exp": "Typisch für den Kuckuck ist: unverwechselbares zweisilbiges „Kuck-uck“ des Männchens ab Ende April. Der frisch geschlüpfte junge Kuckuck wirft Eier und Jungvögel seiner Wirtseltern rückwärts aus dem Nest, um allein gefüttert zu werden."
  },
  {
    "id": 145,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Kuckuck?",
    "a": [
      "Brutschmarotzer: legt je ein Ei in Nester von Teichrohrsängern, Rotkehlchen oder Bachstelzen",
      "kunstvolles Hängenest unter einem äußeren Nadelbaumzweig",
      "schmale Nische hinter abstehenden Rindenschuppen alter Kiefern",
      "perfekt mit Flechten und Spinnweben an der Baumrinde getarntes Nest"
    ],
    "exp": "Beim Kuckuck (Cuculus canorus) gilt: Brutschmarotzer: legt je ein Ei in Nester von Teichrohrsängern, Rotkehlchen oder Bachstelzen. Der frisch geschlüpfte junge Kuckuck wirft Eier und Jungvögel seiner Wirtseltern rückwärts aus dem Nest, um allein gefüttert zu werden."
  },
  {
    "id": 146,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Kuckuck (Cuculus canorus) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "stachlige und giftig behaarte Raupen (z. B. Kiefernspinner, Bärenspinner), die andere Vögel meiden",
      "winzige Springschwänze, Blattläuse und Spinnen zwischen den Kiefernnadeln",
      "mit dem gebogenen Pinzettenschnabel aus tiefen Borkenritzen gezogene Spinnen und Insektenpuppen",
      "Buchen- und Kiefernsamen, Knospen sowie für die Jungenaufzucht Raupen und Blattläuse"
    ],
    "exp": "Auf dem Speiseplan des Kuckuck stehen vor allem: stachlige und giftig behaarte Raupen (z. B. Kiefernspinner, Bärenspinner), die andere Vögel meiden."
  },
  {
    "id": 147,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Der frisch geschlüpfte junge Kuckuck wirft Eier und Jungvögel seiner Wirtseltern rückwärts aus dem Nest, um allein gefüttert zu werden.“?",
    "a": [
      "Kuckuck (Cuculus canorus)",
      "Wintergoldhähnchen (Regulus regulus)",
      "Waldbaumläufer (Certhia familiaris)",
      "Buchfink (Fringilla coelebs)"
    ],
    "exp": "Diese Besonderheit beschreibt den Kuckuck (Cuculus canorus), der in Wälder, Heiden, Moore und Schilfgebiete rund um Heideblick anzutreffen ist."
  },
  {
    "id": 148,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Kuckuck in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Cuculus canorus",
      "Regulus regulus",
      "Certhia familiaris",
      "Fringilla coelebs"
    ],
    "exp": "Der wissenschaftliche Name von Kuckuck lautet Cuculus canorus. Lebensraum: Wälder, Heiden, Moore und Schilfgebiete rund um Heideblick."
  },
  {
    "id": 149,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (rauhes „Gä-gä“ und leiser, spottender Gesang mit imitierten Vogelstimmen) und lebt bevorzugt in folgendem Lebensraum: dornenreiche Waldränder, Hecken aus Schlehe und Weißdorn rund um Schwarzenburg?",
    "a": [
      "Neuntöter (Rotrückenwürger)",
      "Sommergoldhähnchen",
      "Fichtenkreuzschnabel",
      "Goldammer"
    ],
    "exp": "Neuntöter (Rotrückenwürger) (Lanius collurio): Seinen Namen verdankt er der Gewohnheit, Beutetiere als Nahrungsvorrat auf Schlehen- oder Weißdorndornen aufzuspießen."
  },
  {
    "id": 150,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Neuntöter (Rotrückenwürger) (Lanius collurio) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "rauhes „Gä-gä“ und leiser, spottender Gesang mit imitierten Vogelstimmen",
      "gleichförmige, am Ende ansteigende hohe Tonreihe",
      "metallisches „Gip-gip-gip“ im Truppflug über den Baumwipfeln",
      "bekannter Gesang „Wie-wie-wie-wie-hab-ich-dich-lieb“ (sieben kurze Töne und ein gedehnter Schlusston)"
    ],
    "exp": "Typisch für den Neuntöter (Rotrückenwürger) ist: rauhes „Gä-gä“ und leiser, spottender Gesang mit imitierten Vogelstimmen. Seinen Namen verdankt er der Gewohnheit, Beutetiere als Nahrungsvorrat auf Schlehen- oder Weißdorndornen aufzuspießen."
  },
  {
    "id": 151,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Neuntöter (Rotrückenwürger)?",
    "a": [
      "stabiles Nest im dichten Dornengebüsch",
      "dicht gewebtes Moos- und Spinnwebennest im Gezweig",
      "brütet oft mitten im tiefsten Winter (Januar/Februar), wenn die Zapfen reif sind",
      "Bodennest an Böschungen, Feldrainen oder unter niedrigen Büschen"
    ],
    "exp": "Beim Neuntöter (Rotrückenwürger) (Lanius collurio) gilt: stabiles Nest im dichten Dornengebüsch. Seinen Namen verdankt er der Gewohnheit, Beutetiere als Nahrungsvorrat auf Schlehen- oder Weißdorndornen aufzuspießen."
  },
  {
    "id": 152,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Neuntöter (Rotrückenwürger) (Lanius collurio) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Großinsekten wie Mistkäfer, Heuschrecken, Hummeln sowie gelegentlich Eidechsen und Mäuse",
      "kleinste Insekten und Spinnen auf Zweigen und Nadeln",
      "Samen aus den Zapfen von Fichten und Kiefern",
      "Grassamen, Getreidekörner und im Sommer Insekten"
    ],
    "exp": "Auf dem Speiseplan des Neuntöter (Rotrückenwürger) stehen vor allem: Großinsekten wie Mistkäfer, Heuschrecken, Hummeln sowie gelegentlich Eidechsen und Mäuse."
  },
  {
    "id": 153,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Seinen Namen verdankt er der Gewohnheit, Beutetiere als Nahrungsvorrat auf Schlehen- oder Weißdorndornen aufzuspießen.“?",
    "a": [
      "Neuntöter (Rotrückenwürger) (Lanius collurio)",
      "Sommergoldhähnchen (Regulus ignicapilla)",
      "Fichtenkreuzschnabel (Loxia curvirostra)",
      "Goldammer (Emberiza citrinella)"
    ],
    "exp": "Diese Besonderheit beschreibt den Neuntöter (Rotrückenwürger) (Lanius collurio), der in dornenreiche Waldränder, Hecken aus Schlehe und Weißdorn rund um Schwarzenburg anzutreffen ist."
  },
  {
    "id": 154,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Neuntöter (Rotrückenwürger) in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Lanius collurio",
      "Regulus ignicapilla",
      "Loxia curvirostra",
      "Emberiza citrinella"
    ],
    "exp": "Der wissenschaftliche Name von Neuntöter (Rotrückenwürger) lautet Lanius collurio. Lebensraum: dornenreiche Waldränder, Hecken aus Schlehe und Weißdorn rund um Schwarzenburg."
  },
  {
    "id": 155,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (trillernder Gesang und rauer Warnruf) und lebt bevorzugt in folgendem Lebensraum: weite Heidelandschaften, Moorränder und offene Kiefernlichtungen (oft auch als Wintergast)?",
    "a": [
      "Raubwürger",
      "Tannenmeise",
      "Gimpel (Dompfaff)",
      "Gartenrotschwanz"
    ],
    "exp": "Raubwürger (Lanius excubitor): Der Singvogel mit dem kräftigen Hakenschnabel eines kleinen Falken trägt eine schwarze „Zorro-Maske“ im grau-weißen Gefieder."
  },
  {
    "id": 156,
    "cat": "voegel",
    "diff": "pro",
    "q": "Woran erkennt man den Raubwürger (Lanius excubitor) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "trillernder Gesang und rauer Warnruf",
      "flottes, zweisilbiges „Witze-witze-witze“ aus den Kiefernkronen",
      "sanftes, wehmütig flötendes „Djü“",
      "wehmütig flötender Strophengesang schon in der frühen Morgendämmerung"
    ],
    "exp": "Typisch für den Raubwürger ist: trillernder Gesang und rauer Warnruf. Der Singvogel mit dem kräftigen Hakenschnabel eines kleinen Falken trägt eine schwarze „Zorro-Maske“ im grau-weißen Gefieder."
  },
  {
    "id": 157,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Raubwürger?",
    "a": [
      "kugelige Nester hoch in Kiefern oder Dornbüschen",
      "Höhlenbrüter in kleinen Baumhöhlen, Mauselöchern im Waldboden oder Nistkästen",
      "flaches Reisignest im dichten Nadelgezweig",
      "Halbhöhlen, alte Spechthöhlen und Nistkästen"
    ],
    "exp": "Beim Raubwürger (Lanius excubitor) gilt: kugelige Nester hoch in Kiefern oder Dornbüschen. Der Singvogel mit dem kräftigen Hakenschnabel eines kleinen Falken trägt eine schwarze „Zorro-Maske“ im grau-weißen Gefieder."
  },
  {
    "id": 158,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Raubwürger (Lanius excubitor) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Feldmäuse, Eidechsen, Singvögel und Großinsekten von hoher Ansitzwarte aus",
      "Nadelbauminsekten, Rindenläuse und feine Kiefernsamen",
      "Samen von Eberesche (Vogelbeere), Ahorn, Brennnessel sowie Baumknospen",
      "Insekten und Spinnen am Boden und im Laubdach"
    ],
    "exp": "Auf dem Speiseplan des Raubwürger stehen vor allem: Feldmäuse, Eidechsen, Singvögel und Großinsekten von hoher Ansitzwarte aus."
  },
  {
    "id": 159,
    "cat": "voegel",
    "diff": "pro",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Der Singvogel mit dem kräftigen Hakenschnabel eines kleinen Falken trägt eine schwarze „Zorro-Maske“ im grau-weißen Gefieder.“?",
    "a": [
      "Raubwürger (Lanius excubitor)",
      "Tannenmeise (Periparus ater)",
      "Gimpel (Dompfaff) (Pyrrhula pyrrhula)",
      "Gartenrotschwanz (Phoenicurus phoenicurus)"
    ],
    "exp": "Diese Besonderheit beschreibt den Raubwürger (Lanius excubitor), der in weite Heidelandschaften, Moorränder und offene Kiefernlichtungen (oft auch als Wintergast) anzutreffen ist."
  },
  {
    "id": 160,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Raubwürger in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Lanius excubitor",
      "Periparus ater",
      "Pyrrhula pyrrhula",
      "Phoenicurus phoenicurus"
    ],
    "exp": "Der wissenschaftliche Name von Raubwürger lautet Lanius excubitor. Lebensraum: weite Heidelandschaften, Moorränder und offene Kiefernlichtungen (oft auch als Wintergast)."
  },
  {
    "id": 161,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (lautes, rätschendes „Räätsch“, mit dem er alle Tiere des Waldes vor Spaziergängern warnt) und lebt bevorzugt in folgendem Lebensraum: alle Wälder und Waldgärten rund um Schwarzenburg?",
    "a": [
      "Eichelhäher",
      "Haubenmeise",
      "Kernbeißer",
      "Hausrotschwanz"
    ],
    "exp": "Eichelhäher (Garrulus glandarius): Ein einziger Eichelhäher versteckt im Herbst bis zu 5.000 Eicheln im Waldboden und sorgt so als „Gärtner des Waldes“ für junge Eichen im Kiefernforst."
  },
  {
    "id": 162,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Eichelhäher (Garrulus glandarius) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "lautes, rätschendes „Räätsch“, mit dem er alle Tiere des Waldes vor Spaziergängern warnt",
      "unverwechselbares, rollendes Trillern „Zii-gür-gür-gür“",
      "scharfes, explosives „Zick“ aus den Baumwipfeln",
      "knirschend-schleifende Gesangsstrophe vom Dachfirst schon eine Stunde vor Sonnenaufgang"
    ],
    "exp": "Typisch für den Eichelhäher ist: lautes, rätschendes „Räätsch“, mit dem er alle Tiere des Waldes vor Spaziergängern warnt. Ein einziger Eichelhäher versteckt im Herbst bis zu 5.000 Eicheln im Waldboden und sorgt so als „Gärtner des Waldes“ für junge Eichen im Kiefernforst."
  },
  {
    "id": 163,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Eichelhäher?",
    "a": [
      "Schalennest in Kiefern oder Laubbäumen; im Flug leuchtet das himmelblau-schwarz gebänderte Flügelfeld",
      "hackt ihre Bruthöhle meist selbst in morsches, weiches Kiefernholz",
      "Napfnest in den Kronen von Laub- und Obstbäumen",
      "Nischen unter Dachbalken, auf Mauerabsätzen in Ställen oder über Hoflampen"
    ],
    "exp": "Beim Eichelhäher (Garrulus glandarius) gilt: Schalennest in Kiefern oder Laubbäumen; im Flug leuchtet das himmelblau-schwarz gebänderte Flügelfeld. Ein einziger Eichelhäher versteckt im Herbst bis zu 5.000 Eicheln im Waldboden und sorgt so als „Gärtner des Waldes“ für junge Eichen im Kiefernforst."
  },
  {
    "id": 164,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Eichelhäher (Garrulus glandarius) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "im Sommer Insekten und Beeren, im Herbst und Winter vor allem Eicheln und Bucheckern",
      "Spinnen, Insekten und Kiefernsamen, die sie oft unter Rindenschuppen für den Winter versteckt",
      "harte Kirschkerne, Hainbuchensamen, Schlehenkerne und Sonnenblumenkerne",
      "Fliegen, Spinnen, kleine Käfer und Hausmutter-Nachtfalter rund um Hof und Garten"
    ],
    "exp": "Auf dem Speiseplan des Eichelhäher stehen vor allem: im Sommer Insekten und Beeren, im Herbst und Winter vor allem Eicheln und Bucheckern."
  },
  {
    "id": 165,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Ein einziger Eichelhäher versteckt im Herbst bis zu 5.000 Eicheln im Waldboden und sorgt so als „Gärtner des Waldes“ für junge Eichen im Kiefernforst.“?",
    "a": [
      "Eichelhäher (Garrulus glandarius)",
      "Haubenmeise (Lophophanes cristatus)",
      "Kernbeißer (Coccothraustes coccothraustes)",
      "Hausrotschwanz (Phoenicurus ochruros)"
    ],
    "exp": "Diese Besonderheit beschreibt den Eichelhäher (Garrulus glandarius), der in alle Wälder und Waldgärten rund um Schwarzenburg anzutreffen ist."
  },
  {
    "id": 166,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Eichelhäher in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Garrulus glandarius",
      "Lophophanes cristatus",
      "Coccothraustes coccothraustes",
      "Phoenicurus ochruros"
    ],
    "exp": "Der wissenschaftliche Name von Eichelhäher lautet Garrulus glandarius. Lebensraum: alle Wälder und Waldgärten rund um Schwarzenburg."
  },
  {
    "id": 167,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (tiefes, sonores „Klong“ oder „Korrk“, das kilometerweit über den Kiefernwald trägt) und lebt bevorzugt in folgendem Lebensraum: ausgedehnte Wälder und ruhige Heidegebiete Südbrandenburgs?",
    "a": [
      "Kolkrabe",
      "Kohlmeise",
      "Singdrossel",
      "Rauchschwalbe"
    ],
    "exp": "Kolkrabe (Corvus corax): Der größte Singvogel der Welt besticht durch sein keilförmiges Schwanzende, den mächtigen Schnabel und hohe Intelligenz."
  },
  {
    "id": 168,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Kolkrabe (Corvus corax) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "tiefes, sonores „Klong“ oder „Korrk“, das kilometerweit über den Kiefernwald trägt",
      "zweisilbiges, metallisches „Zizibäh-zizibäh“ schon an sonnigen Februartagen",
      "lauter, abwechslungsreicher Gesang aus der Baumspitze, bei dem jedes Motiv zwei- bis viermal wiederholt wird",
      "fröhlich zwitscherndes Geplauder mit schnarrendem Schlusstriller"
    ],
    "exp": "Typisch für den Kolkrabe ist: tiefes, sonores „Klong“ oder „Korrk“, das kilometerweit über den Kiefernwald trägt. Der größte Singvogel der Welt besticht durch sein keilförmiges Schwanzende, den mächtigen Schnabel und hohe Intelligenz."
  },
  {
    "id": 169,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Kolkrabe?",
    "a": [
      "massiver Reisighorst in hohen Waldkiefern, brütet bereits ab Ende Februar",
      "Baumhöhlen, Nistkästen und zuweilen sogar Briefkästen oder Gießkannen",
      "glatt mit Holzmulm und Speichel ausgekleidetes Napfnest („wie verputzt“)",
      "oben offenes Lehm-Halbschalen-Nest im Inneren von Ställen, Scheunen und Durchfahrten"
    ],
    "exp": "Beim Kolkrabe (Corvus corax) gilt: massiver Reisighorst in hohen Waldkiefern, brütet bereits ab Ende Februar. Der größte Singvogel der Welt besticht durch sein keilförmiges Schwanzende, den mächtigen Schnabel und hohe Intelligenz."
  },
  {
    "id": 170,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Kolkrabe (Corvus corax) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Allesfresser: Fallwild (oft zusammen mit Wölfen und Seeadlern), Insekten, Kleinsäuger, Früchte",
      "Raupen, Spinnen, Käfer und im Winter Sonnenblumenkerne und Nüsse",
      "Gehäuseschnecken, Regenwürmer, Insekten und Waldbeeren",
      "im rasanten Tiefflug über Wiesen und Hofteichen erbeutete Fliegen und Mücken"
    ],
    "exp": "Auf dem Speiseplan des Kolkrabe stehen vor allem: Allesfresser: Fallwild (oft zusammen mit Wölfen und Seeadlern), Insekten, Kleinsäuger, Früchte."
  },
  {
    "id": 171,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Der größte Singvogel der Welt besticht durch sein keilförmiges Schwanzende, den mächtigen Schnabel und hohe Intelligenz.“?",
    "a": [
      "Kolkrabe (Corvus corax)",
      "Kohlmeise (Parus major)",
      "Singdrossel (Turdus philomelos)",
      "Rauchschwalbe (Hirundo rustica)"
    ],
    "exp": "Diese Besonderheit beschreibt den Kolkrabe (Corvus corax), der in ausgedehnte Wälder und ruhige Heidegebiete Südbrandenburgs anzutreffen ist."
  },
  {
    "id": 172,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Kolkrabe in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Corvus corax",
      "Parus major",
      "Turdus philomelos",
      "Hirundo rustica"
    ],
    "exp": "Der wissenschaftliche Name von Kolkrabe lautet Corvus corax. Lebensraum: ausgedehnte Wälder und ruhige Heidegebiete Südbrandenburgs."
  },
  {
    "id": 173,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (silbrig perlender, leicht melancholischer Gesang bis in die Dämmerung und scharfes „Tick-tick“) und lebt bevorzugt in folgendem Lebensraum: unterholzreiche Wälder, Waldgärten und Hecken in Schwarzenburg?",
    "a": [
      "Rotkehlchen",
      "Blaumeise",
      "Misteldrossel",
      "Mehlschwalbe"
    ],
    "exp": "Rotkehlchen (Erithacus rubecula): Rotkehlchen sind wenig scheu und begleiten Gärtner beim Umgraben im Waldgarten oft auf Armlänge, um freigelegte Larven zu erbeuten."
  },
  {
    "id": 174,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Rotkehlchen (Erithacus rubecula) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "silbrig perlender, leicht melancholischer Gesang bis in die Dämmerung und scharfes „Tick-tick“",
      "hell klingelndes „Tii-tii-tüh-tüh-tüh“",
      "weithinhallender, flötender Gesang schon im Februar und schnarrendes „Schrr“ im Flug",
      "kurzes, schwatzendes „Schrip“ im Flug"
    ],
    "exp": "Typisch für den Rotkehlchen ist: silbrig perlender, leicht melancholischer Gesang bis in die Dämmerung und scharfes „Tick-tick“. Rotkehlchen sind wenig scheu und begleiten Gärtner beim Umgraben im Waldgarten oft auf Armlänge, um freigelegte Larven zu erbeuten."
  },
  {
    "id": 175,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Rotkehlchen?",
    "a": [
      "verstecktes Nest am Boden unter Wurzeln, im Efeu oder in Halbhöhlen",
      "kleine Baumhöhlen und Meisenkästen mit engem 28-mm-Einflugloch",
      "hoch in Astgabeln von Waldkiefern gebautes Nest",
      "bis auf ein enges Einflugloch komplett geschlossenes Lehmkugelnest außen unter Dachvorsprüngen"
    ],
    "exp": "Beim Rotkehlchen (Erithacus rubecula) gilt: verstecktes Nest am Boden unter Wurzeln, im Efeu oder in Halbhöhlen. Rotkehlchen sind wenig scheu und begleiten Gärtner beim Umgraben im Waldgarten oft auf Armlänge, um freigelegte Larven zu erbeuten."
  },
  {
    "id": 176,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Rotkehlchen (Erithacus rubecula) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Spinnen, kleine Käfer, Würmer und im Herbst Beeren sowie Haferflocken am Futterplatz",
      "Blattläuse, kleine Raupen an Knospen und Sämereien",
      "Mistelbeeren, Ebereschenbeeren, Regenwürmer und Käfer",
      "hoch im Luftraum schwebende Kleininsekten (Luftplankton)"
    ],
    "exp": "Auf dem Speiseplan des Rotkehlchen stehen vor allem: Spinnen, kleine Käfer, Würmer und im Herbst Beeren sowie Haferflocken am Futterplatz."
  },
  {
    "id": 177,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Rotkehlchen sind wenig scheu und begleiten Gärtner beim Umgraben im Waldgarten oft auf Armlänge, um freigelegte Larven zu erbeuten.“?",
    "a": [
      "Rotkehlchen (Erithacus rubecula)",
      "Blaumeise (Cyanistes caeruleus)",
      "Misteldrossel (Turdus viscivorus)",
      "Mehlschwalbe (Delichon urbicum)"
    ],
    "exp": "Diese Besonderheit beschreibt den Rotkehlchen (Erithacus rubecula), der in unterholzreiche Wälder, Waldgärten und Hecken in Schwarzenburg anzutreffen ist."
  },
  {
    "id": 178,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Rotkehlchen in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Erithacus rubecula",
      "Cyanistes caeruleus",
      "Turdus viscivorus",
      "Delichon urbicum"
    ],
    "exp": "Der wissenschaftliche Name von Rotkehlchen lautet Erithacus rubecula. Lebensraum: unterholzreiche Wälder, Waldgärten und Hecken in Schwarzenburg."
  },
  {
    "id": 179,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (erstaunlich schmetternder, lauter Trillergesang mit über 90 Dezibel) und lebt bevorzugt in folgendem Lebensraum: dichtes Unterholz, Reisighaufen, Wurzelteller umgestürzter Kiefern und Waldgärten?",
    "a": [
      "Zaunkönig",
      "Kleiber (Spechtmeise)",
      "Amsel (Schwarzdrossel)",
      "Weißstorch"
    ],
    "exp": "Zaunkönig (Troglodytes troglodytes): Mit nur rund 8–10 Gramm Gewicht und dem keck steil nach oben gestellten Schwänzchen ist er einer der kleinsten Vögel Europas."
  },
  {
    "id": 180,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Zaunkönig (Troglodytes troglodytes) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "erstaunlich schmetternder, lauter Trillergesang mit über 90 Dezibel",
      "laut pfeifendes „Tuit-tuit-tuit“ und scharfes „Twett“",
      "melodisches, warmes Flöten am Morgen und Abend sowie aufgeregtes „Tix-tix-tix“ bei Gefahr",
      "lautes Schnabelklappern bei der Begrüßung auf dem Horst"
    ],
    "exp": "Typisch für den Zaunkönig ist: erstaunlich schmetternder, lauter Trillergesang mit über 90 Dezibel. Mit nur rund 8–10 Gramm Gewicht und dem keck steil nach oben gestellten Schwänzchen ist er einer der kleinsten Vögel Europas."
  },
  {
    "id": 181,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Zaunkönig?",
    "a": [
      "Männchen baut mehrere kugelige Moosnester, aus denen das Weibchen eines auswählt und mit Federn auspolstert",
      "mauert das Einflugloch alter Spechthöhlen mit feuchtem Lehm exakt auf seine eigene Körpergröße zu („Kleiber“ = Lehmkleber)",
      "stabiles Napfnest aus Halmen und feuchter Erde in Büschen oder am Holzschuppen",
      "großer Reisighorst auf Masten, Scheunengiebeln oder alten Schornsteinen"
    ],
    "exp": "Beim Zaunkönig (Troglodytes troglodytes) gilt: Männchen baut mehrere kugelige Moosnester, aus denen das Weibchen eines auswählt und mit Federn auspolstert. Mit nur rund 8–10 Gramm Gewicht und dem keck steil nach oben gestellten Schwänzchen ist er einer der kleinsten Vögel Europas."
  },
  {
    "id": 182,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Zaunkönig (Troglodytes troglodytes) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "winzige Spinnen, Weberknechte, Mücken und Insektenlarven im Reisig",
      "Rindeninsekten sowie im Herbst und Winter Haselnüsse, Bucheckern und Kiefernsamen",
      "Regenwürmer, Käferlarven im Falllaub sowie Beeren und Fallobst",
      "Frösche, Feldmäuse, große Heuschrecken, Regenwürmer und Blindschleichen"
    ],
    "exp": "Auf dem Speiseplan des Zaunkönig stehen vor allem: winzige Spinnen, Weberknechte, Mücken und Insektenlarven im Reisig."
  },
  {
    "id": 183,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Mit nur rund 8–10 Gramm Gewicht und dem keck steil nach oben gestellten Schwänzchen ist er einer der kleinsten Vögel Europas.“?",
    "a": [
      "Zaunkönig (Troglodytes troglodytes)",
      "Kleiber (Spechtmeise) (Sitta europaea)",
      "Amsel (Schwarzdrossel) (Turdus merula)",
      "Weißstorch (Ciconia ciconia)"
    ],
    "exp": "Diese Besonderheit beschreibt den Zaunkönig (Troglodytes troglodytes), der in dichtes Unterholz, Reisighaufen, Wurzelteller umgestürzter Kiefern und Waldgärten anzutreffen ist."
  },
  {
    "id": 184,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Zaunkönig in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Troglodytes troglodytes",
      "Sitta europaea",
      "Turdus merula",
      "Ciconia ciconia"
    ],
    "exp": "Der wissenschaftliche Name von Zaunkönig lautet Troglodytes troglodytes. Lebensraum: dichtes Unterholz, Reisighaufen, Wurzelteller umgestürzter Kiefern und Waldgärten."
  },
  {
    "id": 185,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (extrem feines, hohes „Si-si-si“, das für ältere menschliche Ohren oft kaum noch hörbar ist) und lebt bevorzugt in folgendem Lebensraum: Kronenbereich der Nadel- und Kiefernwälder rund um Schwarzenburg?",
    "a": [
      "Wintergoldhähnchen",
      "Waldbaumläufer",
      "Buchfink",
      "Schwarzstorch"
    ],
    "exp": "Wintergoldhähnchen (Regulus regulus): Mit nur 4 bis 6 Gramm (so leicht wie ein Teelöffel Zucker) ist das Goldhähnchen mit dem gelben Scheitelstreif der kleinste Vogel Europas."
  },
  {
    "id": 186,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Wintergoldhähnchen (Regulus regulus) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "extrem feines, hohes „Si-si-si“, das für ältere menschliche Ohren oft kaum noch hörbar ist",
      "feiner, abfallender Trillergesang und hohes „Srii“",
      "schmetternder „Finkenschlag“ mit der typischen Schlussstrophe („Würzgebirg“) und Regenruf „Rülp“",
      "leises, heiseres Keuchen und Pfeifen am versteckten Waldhorst (klappert fast nie)"
    ],
    "exp": "Typisch für den Wintergoldhähnchen ist: extrem feines, hohes „Si-si-si“, das für ältere menschliche Ohren oft kaum noch hörbar ist. Mit nur 4 bis 6 Gramm (so leicht wie ein Teelöffel Zucker) ist das Goldhähnchen mit dem gelben Scheitelstreif der kleinste Vogel Europas."
  },
  {
    "id": 187,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Wintergoldhähnchen?",
    "a": [
      "kunstvolles Hängenest unter einem äußeren Nadelbaumzweig",
      "schmale Nische hinter abstehenden Rindenschuppen alter Kiefern",
      "perfekt mit Flechten und Spinnweben an der Baumrinde getarntes Nest",
      "großer Horst tief im ruhigen Altwald auf starken Seitenästen alter Eichen oder Kiefern"
    ],
    "exp": "Beim Wintergoldhähnchen (Regulus regulus) gilt: kunstvolles Hängenest unter einem äußeren Nadelbaumzweig. Mit nur 4 bis 6 Gramm (so leicht wie ein Teelöffel Zucker) ist das Goldhähnchen mit dem gelben Scheitelstreif der kleinste Vogel Europas."
  },
  {
    "id": 188,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Wintergoldhähnchen (Regulus regulus) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "winzige Springschwänze, Blattläuse und Spinnen zwischen den Kiefernnadeln",
      "mit dem gebogenen Pinzettenschnabel aus tiefen Borkenritzen gezogene Spinnen und Insektenpuppen",
      "Buchen- und Kiefernsamen, Knospen sowie für die Jungenaufzucht Raupen und Blattläuse",
      "kleine Fische (Schmerlen, Stichlinge), Frösche, Molche und Wasserinsekten in Waldbächen"
    ],
    "exp": "Auf dem Speiseplan des Wintergoldhähnchen stehen vor allem: winzige Springschwänze, Blattläuse und Spinnen zwischen den Kiefernnadeln."
  },
  {
    "id": 189,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Mit nur 4 bis 6 Gramm (so leicht wie ein Teelöffel Zucker) ist das Goldhähnchen mit dem gelben Scheitelstreif der kleinste Vogel Europas.“?",
    "a": [
      "Wintergoldhähnchen (Regulus regulus)",
      "Waldbaumläufer (Certhia familiaris)",
      "Buchfink (Fringilla coelebs)",
      "Schwarzstorch (Ciconia nigra)"
    ],
    "exp": "Diese Besonderheit beschreibt den Wintergoldhähnchen (Regulus regulus), der in Kronenbereich der Nadel- und Kiefernwälder rund um Schwarzenburg anzutreffen ist."
  },
  {
    "id": 190,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Wintergoldhähnchen in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Regulus regulus",
      "Certhia familiaris",
      "Fringilla coelebs",
      "Ciconia nigra"
    ],
    "exp": "Der wissenschaftliche Name von Wintergoldhähnchen lautet Regulus regulus. Lebensraum: Kronenbereich der Nadel- und Kiefernwälder rund um Schwarzenburg."
  },
  {
    "id": 191,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (gleichförmige, am Ende ansteigende hohe Tonreihe) und lebt bevorzugt in folgendem Lebensraum: Misch- und Nadelwälder sowie strukturreiche Waldgärten?",
    "a": [
      "Sommergoldhähnchen",
      "Fichtenkreuzschnabel",
      "Goldammer",
      "Eisvogel"
    ],
    "exp": "Sommergoldhähnchen (Regulus ignicapilla): Vom Wintergoldhähnchen unterscheidet es sich durch den markanten weißen Überaugenstreif und den schwarzen Augenstreif."
  },
  {
    "id": 192,
    "cat": "voegel",
    "diff": "pro",
    "q": "Woran erkennt man den Sommergoldhähnchen (Regulus ignicapilla) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "gleichförmige, am Ende ansteigende hohe Tonreihe",
      "metallisches „Gip-gip-gip“ im Truppflug über den Baumwipfeln",
      "bekannter Gesang „Wie-wie-wie-wie-hab-ich-dich-lieb“ (sieben kurze Töne und ein gedehnter Schlusston)",
      "scharfer, durchdringender Pfiff „Ziiit“ im pfeilschnellen Tiefflug über dem Wasser"
    ],
    "exp": "Typisch für den Sommergoldhähnchen ist: gleichförmige, am Ende ansteigende hohe Tonreihe. Vom Wintergoldhähnchen unterscheidet es sich durch den markanten weißen Überaugenstreif und den schwarzen Augenstreif."
  },
  {
    "id": 193,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Sommergoldhähnchen?",
    "a": [
      "dicht gewebtes Moos- und Spinnwebennest im Gezweig",
      "brütet oft mitten im tiefsten Winter (Januar/Februar), wenn die Zapfen reif sind",
      "Bodennest an Böschungen, Feldrainen oder unter niedrigen Büschen",
      "gräbt eine bis zu 90 cm lange Brutröhre in senkrechte Lehm- oder Sanduferabbrüche (oder Wurzelteller)"
    ],
    "exp": "Beim Sommergoldhähnchen (Regulus ignicapilla) gilt: dicht gewebtes Moos- und Spinnwebennest im Gezweig. Vom Wintergoldhähnchen unterscheidet es sich durch den markanten weißen Überaugenstreif und den schwarzen Augenstreif."
  },
  {
    "id": 194,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Sommergoldhähnchen (Regulus ignicapilla) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "kleinste Insekten und Spinnen auf Zweigen und Nadeln",
      "Samen aus den Zapfen von Fichten und Kiefern",
      "Grassamen, Getreidekörner und im Sommer Insekten",
      "kleine Fische (Moderlieschen, Stichlinge), Wasserinsekten und Kaulquappen"
    ],
    "exp": "Auf dem Speiseplan des Sommergoldhähnchen stehen vor allem: kleinste Insekten und Spinnen auf Zweigen und Nadeln."
  },
  {
    "id": 195,
    "cat": "voegel",
    "diff": "pro",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Vom Wintergoldhähnchen unterscheidet es sich durch den markanten weißen Überaugenstreif und den schwarzen Augenstreif.“?",
    "a": [
      "Sommergoldhähnchen (Regulus ignicapilla)",
      "Fichtenkreuzschnabel (Loxia curvirostra)",
      "Goldammer (Emberiza citrinella)",
      "Eisvogel (Alcedo atthis)"
    ],
    "exp": "Diese Besonderheit beschreibt den Sommergoldhähnchen (Regulus ignicapilla), der in Misch- und Nadelwälder sowie strukturreiche Waldgärten anzutreffen ist."
  },
  {
    "id": 196,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Sommergoldhähnchen in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Regulus ignicapilla",
      "Loxia curvirostra",
      "Emberiza citrinella",
      "Alcedo atthis"
    ],
    "exp": "Der wissenschaftliche Name von Sommergoldhähnchen lautet Regulus ignicapilla. Lebensraum: Misch- und Nadelwälder sowie strukturreiche Waldgärten."
  },
  {
    "id": 197,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (flottes, zweisilbiges „Witze-witze-witze“ aus den Kiefernkronen) und lebt bevorzugt in folgendem Lebensraum: Kiefern- und Nadelwälder rund um Schwarzenburg?",
    "a": [
      "Tannenmeise",
      "Gimpel (Dompfaff)",
      "Gartenrotschwanz",
      "Hohltaube"
    ],
    "exp": "Tannenmeise (Periparus ater): Ihr wichtigstes Erkennungsmerkmal gegenüber Kohl- und Blaumeise ist der große weiße Nackenfleck am schwarzen Hinterkopf."
  },
  {
    "id": 198,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Tannenmeise (Periparus ater) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "flottes, zweisilbiges „Witze-witze-witze“ aus den Kiefernkronen",
      "sanftes, wehmütig flötendes „Djü“",
      "wehmütig flötender Strophengesang schon in der frühen Morgendämmerung",
      "dumpfes, zweisilbiges „Hu-hu, hu-hu“ aus den Baumkronen"
    ],
    "exp": "Typisch für den Tannenmeise ist: flottes, zweisilbiges „Witze-witze-witze“ aus den Kiefernkronen. Ihr wichtigstes Erkennungsmerkmal gegenüber Kohl- und Blaumeise ist der große weiße Nackenfleck am schwarzen Hinterkopf."
  },
  {
    "id": 199,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Tannenmeise?",
    "a": [
      "Höhlenbrüter in kleinen Baumhöhlen, Mauselöchern im Waldboden oder Nistkästen",
      "flaches Reisignest im dichten Nadelgezweig",
      "Halbhöhlen, alte Spechthöhlen und Nistkästen",
      "einzige heimische Taubenart, die in Baumhöhlen (meist alten Schwarzspechthöhlen) brütet"
    ],
    "exp": "Beim Tannenmeise (Periparus ater) gilt: Höhlenbrüter in kleinen Baumhöhlen, Mauselöchern im Waldboden oder Nistkästen. Ihr wichtigstes Erkennungsmerkmal gegenüber Kohl- und Blaumeise ist der große weiße Nackenfleck am schwarzen Hinterkopf."
  },
  {
    "id": 200,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Tannenmeise (Periparus ater) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Nadelbauminsekten, Rindenläuse und feine Kiefernsamen",
      "Samen von Eberesche (Vogelbeere), Ahorn, Brennnessel sowie Baumknospen",
      "Insekten und Spinnen am Boden und im Laubdach",
      "Unkrautsamen, Getreidekörner, Kiefernsamen und Bucheckern"
    ],
    "exp": "Auf dem Speiseplan des Tannenmeise stehen vor allem: Nadelbauminsekten, Rindenläuse und feine Kiefernsamen."
  },
  {
    "id": 201,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Ihr wichtigstes Erkennungsmerkmal gegenüber Kohl- und Blaumeise ist der große weiße Nackenfleck am schwarzen Hinterkopf.“?",
    "a": [
      "Tannenmeise (Periparus ater)",
      "Gimpel (Dompfaff) (Pyrrhula pyrrhula)",
      "Gartenrotschwanz (Phoenicurus phoenicurus)",
      "Hohltaube (Columba oenas)"
    ],
    "exp": "Diese Besonderheit beschreibt den Tannenmeise (Periparus ater), der in Kiefern- und Nadelwälder rund um Schwarzenburg anzutreffen ist."
  },
  {
    "id": 202,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Tannenmeise in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Periparus ater",
      "Pyrrhula pyrrhula",
      "Phoenicurus phoenicurus",
      "Columba oenas"
    ],
    "exp": "Der wissenschaftliche Name von Tannenmeise lautet Periparus ater. Lebensraum: Kiefern- und Nadelwälder rund um Schwarzenburg."
  },
  {
    "id": 203,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (unverwechselbares, rollendes Trillern „Zii-gür-gür-gür“) und lebt bevorzugt in folgendem Lebensraum: alte Kiefernwälder mit Totholz und Flechtenbewuchs in der Lausitz?",
    "a": [
      "Haubenmeise",
      "Kernbeißer",
      "Hausrotschwanz",
      "Ringeltaube"
    ],
    "exp": "Haubenmeise (Lophophanes cristatus): Ihre schwarz-weiß geschuppte, spitz aufgestellte Federhaube macht sie zum Charaktervogel der Märkischen Kiefernheide."
  },
  {
    "id": 204,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Haubenmeise (Lophophanes cristatus) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "unverwechselbares, rollendes Trillern „Zii-gür-gür-gür“",
      "scharfes, explosives „Zick“ aus den Baumwipfeln",
      "knirschend-schleifende Gesangsstrophe vom Dachfirst schon eine Stunde vor Sonnenaufgang",
      "fünfsilbiges, rhythmisches „Ruh-gu-guck, gu-gu“ („Du-dummes-Huhn, du“)"
    ],
    "exp": "Typisch für den Haubenmeise ist: unverwechselbares, rollendes Trillern „Zii-gür-gür-gür“. Ihre schwarz-weiß geschuppte, spitz aufgestellte Federhaube macht sie zum Charaktervogel der Märkischen Kiefernheide."
  },
  {
    "id": 205,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Haubenmeise?",
    "a": [
      "hackt ihre Bruthöhle meist selbst in morsches, weiches Kiefernholz",
      "Napfnest in den Kronen von Laub- und Obstbäumen",
      "Nischen unter Dachbalken, auf Mauerabsätzen in Ställen oder über Hoflampen",
      "lockeres Reisignest auf Kiefern- oder Laubbaumästen"
    ],
    "exp": "Beim Haubenmeise (Lophophanes cristatus) gilt: hackt ihre Bruthöhle meist selbst in morsches, weiches Kiefernholz. Ihre schwarz-weiß geschuppte, spitz aufgestellte Federhaube macht sie zum Charaktervogel der Märkischen Kiefernheide."
  },
  {
    "id": 206,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Haubenmeise (Lophophanes cristatus) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Spinnen, Insekten und Kiefernsamen, die sie oft unter Rindenschuppen für den Winter versteckt",
      "harte Kirschkerne, Hainbuchensamen, Schlehenkerne und Sonnenblumenkerne",
      "Fliegen, Spinnen, kleine Käfer und Hausmutter-Nachtfalter rund um Hof und Garten",
      "Samen, Eicheln, Bucheckern, Beeren und junge Kräuterblätter"
    ],
    "exp": "Auf dem Speiseplan des Haubenmeise stehen vor allem: Spinnen, Insekten und Kiefernsamen, die sie oft unter Rindenschuppen für den Winter versteckt."
  },
  {
    "id": 207,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Ihre schwarz-weiß geschuppte, spitz aufgestellte Federhaube macht sie zum Charaktervogel der Märkischen Kiefernheide.“?",
    "a": [
      "Haubenmeise (Lophophanes cristatus)",
      "Kernbeißer (Coccothraustes coccothraustes)",
      "Hausrotschwanz (Phoenicurus ochruros)",
      "Ringeltaube (Columba palumbus)"
    ],
    "exp": "Diese Besonderheit beschreibt den Haubenmeise (Lophophanes cristatus), der in alte Kiefernwälder mit Totholz und Flechtenbewuchs in der Lausitz anzutreffen ist."
  },
  {
    "id": 208,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Haubenmeise in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Lophophanes cristatus",
      "Coccothraustes coccothraustes",
      "Phoenicurus ochruros",
      "Columba palumbus"
    ],
    "exp": "Der wissenschaftliche Name von Haubenmeise lautet Lophophanes cristatus. Lebensraum: alte Kiefernwälder mit Totholz und Flechtenbewuchs in der Lausitz."
  },
  {
    "id": 209,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (zweisilbiges, metallisches „Zizibäh-zizibäh“ schon an sonnigen Februartagen) und lebt bevorzugt in folgendem Lebensraum: Wälder, Gärten, Höfe und Nistkästen in Schwarzenburg?",
    "a": [
      "Kohlmeise",
      "Singdrossel",
      "Rauchschwalbe",
      "Turteltaube"
    ],
    "exp": "Kohlmeise (Parus major): Die größte heimische Meise ist am glänzend schwarzen Kopf mit weißen Wangen und dem schwarzen Bruststreif („Krawatte“) über dem gelben Bauch leicht zu erkennen."
  },
  {
    "id": 210,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Kohlmeise (Parus major) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "zweisilbiges, metallisches „Zizibäh-zizibäh“ schon an sonnigen Februartagen",
      "lauter, abwechslungsreicher Gesang aus der Baumspitze, bei dem jedes Motiv zwei- bis viermal wiederholt wird",
      "fröhlich zwitscherndes Geplauder mit schnarrendem Schlusstriller",
      "sanftes, schnurrendes „Turrr-turrr“ an warmen Frühsommertagen"
    ],
    "exp": "Typisch für den Kohlmeise ist: zweisilbiges, metallisches „Zizibäh-zizibäh“ schon an sonnigen Februartagen. Die größte heimische Meise ist am glänzend schwarzen Kopf mit weißen Wangen und dem schwarzen Bruststreif („Krawatte“) über dem gelben Bauch leicht zu erkennen."
  },
  {
    "id": 211,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Kohlmeise?",
    "a": [
      "Baumhöhlen, Nistkästen und zuweilen sogar Briefkästen oder Gießkannen",
      "glatt mit Holzmulm und Speichel ausgekleidetes Napfnest („wie verputzt“)",
      "oben offenes Lehm-Halbschalen-Nest im Inneren von Ställen, Scheunen und Durchfahrten",
      "flaches Reisignest im dichten Dorngebüsch am Waldrand"
    ],
    "exp": "Beim Kohlmeise (Parus major) gilt: Baumhöhlen, Nistkästen und zuweilen sogar Briefkästen oder Gießkannen. Die größte heimische Meise ist am glänzend schwarzen Kopf mit weißen Wangen und dem schwarzen Bruststreif („Krawatte“) über dem gelben Bauch leicht zu erkennen."
  },
  {
    "id": 212,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Kohlmeise (Parus major) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Raupen, Spinnen, Käfer und im Winter Sonnenblumenkerne und Nüsse",
      "Gehäuseschnecken, Regenwürmer, Insekten und Waldbeeren",
      "im rasanten Tiefflug über Wiesen und Hofteichen erbeutete Fliegen und Mücken",
      "feine Wildkräutersamen am Boden lückiger Sandfluren"
    ],
    "exp": "Auf dem Speiseplan des Kohlmeise stehen vor allem: Raupen, Spinnen, Käfer und im Winter Sonnenblumenkerne und Nüsse."
  },
  {
    "id": 213,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Die größte heimische Meise ist am glänzend schwarzen Kopf mit weißen Wangen und dem schwarzen Bruststreif („Krawatte“) über dem gelben Bauch leicht zu erkennen.“?",
    "a": [
      "Kohlmeise (Parus major)",
      "Singdrossel (Turdus philomelos)",
      "Rauchschwalbe (Hirundo rustica)",
      "Turteltaube (Streptopelia turtur)"
    ],
    "exp": "Diese Besonderheit beschreibt den Kohlmeise (Parus major), der in Wälder, Gärten, Höfe und Nistkästen in Schwarzenburg anzutreffen ist."
  },
  {
    "id": 214,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Kohlmeise in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Parus major",
      "Turdus philomelos",
      "Hirundo rustica",
      "Streptopelia turtur"
    ],
    "exp": "Der wissenschaftliche Name von Kohlmeise lautet Parus major. Lebensraum: Wälder, Gärten, Höfe und Nistkästen in Schwarzenburg."
  },
  {
    "id": 215,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (hell klingelndes „Tii-tii-tüh-tüh-tüh“) und lebt bevorzugt in folgendem Lebensraum: Laub- und Mischwälder, Obstbäume und Waldgärten?",
    "a": [
      "Blaumeise",
      "Misteldrossel",
      "Mehlschwalbe",
      "Graureiher"
    ],
    "exp": "Blaumeise (Cyanistes caeruleus): Akrobatisch hängt die kleine Meise mit dem kobaltblauen Scheitel kopfüber an den äußersten Birken- und Kiefernzweigen."
  },
  {
    "id": 216,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Blaumeise (Cyanistes caeruleus) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "hell klingelndes „Tii-tii-tüh-tüh-tüh“",
      "weithinhallender, flötender Gesang schon im Februar und schnarrendes „Schrr“ im Flug",
      "kurzes, schwatzendes „Schrip“ im Flug",
      "rauhes, krächzendes „Fraank“ im langsamen Ruderflug mit S-förmig eingezogenem Hals"
    ],
    "exp": "Typisch für den Blaumeise ist: hell klingelndes „Tii-tii-tüh-tüh-tüh“. Akrobatisch hängt die kleine Meise mit dem kobaltblauen Scheitel kopfüber an den äußersten Birken- und Kiefernzweigen."
  },
  {
    "id": 217,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Blaumeise?",
    "a": [
      "kleine Baumhöhlen und Meisenkästen mit engem 28-mm-Einflugloch",
      "hoch in Astgabeln von Waldkiefern gebautes Nest",
      "bis auf ein enges Einflugloch komplett geschlossenes Lehmkugelnest außen unter Dachvorsprüngen",
      "brütet gesellig in Kolonien („Reiherkolonien“) in den Kronen hoher Kiefern"
    ],
    "exp": "Beim Blaumeise (Cyanistes caeruleus) gilt: kleine Baumhöhlen und Meisenkästen mit engem 28-mm-Einflugloch. Akrobatisch hängt die kleine Meise mit dem kobaltblauen Scheitel kopfüber an den äußersten Birken- und Kiefernzweigen."
  },
  {
    "id": 218,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Blaumeise (Cyanistes caeruleus) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Blattläuse, kleine Raupen an Knospen und Sämereien",
      "Mistelbeeren, Ebereschenbeeren, Regenwürmer und Käfer",
      "hoch im Luftraum schwebende Kleininsekten (Luftplankton)",
      "Fische, Frösche, Molche und auf trockenen Wiesen vor allem Feldmäuse"
    ],
    "exp": "Auf dem Speiseplan des Blaumeise stehen vor allem: Blattläuse, kleine Raupen an Knospen und Sämereien."
  },
  {
    "id": 219,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Akrobatisch hängt die kleine Meise mit dem kobaltblauen Scheitel kopfüber an den äußersten Birken- und Kiefernzweigen.“?",
    "a": [
      "Blaumeise (Cyanistes caeruleus)",
      "Misteldrossel (Turdus viscivorus)",
      "Mehlschwalbe (Delichon urbicum)",
      "Graureiher (Ardea cinerea)"
    ],
    "exp": "Diese Besonderheit beschreibt den Blaumeise (Cyanistes caeruleus), der in Laub- und Mischwälder, Obstbäume und Waldgärten anzutreffen ist."
  },
  {
    "id": 220,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Blaumeise in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Cyanistes caeruleus",
      "Turdus viscivorus",
      "Delichon urbicum",
      "Ardea cinerea"
    ],
    "exp": "Der wissenschaftliche Name von Blaumeise lautet Cyanistes caeruleus. Lebensraum: Laub- und Mischwälder, Obstbäume und Waldgärten."
  },
  {
    "id": 221,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (laut pfeifendes „Tuit-tuit-tuit“ und scharfes „Twett“) und lebt bevorzugt in folgendem Lebensraum: alte Kiefern, Eichen und Obstbäume in Wald und Garten?",
    "a": [
      "Kleiber (Spechtmeise)",
      "Amsel (Schwarzdrossel)",
      "Weißstorch",
      "Rohrweihe"
    ],
    "exp": "Kleiber (Spechtmeise) (Sitta europaea): Als einziger heimischer Vogel kann der Kleiber senkrechte Baumstämme mühelos mit dem Kopf voran nach unten laufen."
  },
  {
    "id": 222,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Kleiber (Spechtmeise) (Sitta europaea) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "laut pfeifendes „Tuit-tuit-tuit“ und scharfes „Twett“",
      "melodisches, warmes Flöten am Morgen und Abend sowie aufgeregtes „Tix-tix-tix“ bei Gefahr",
      "lautes Schnabelklappern bei der Begrüßung auf dem Horst",
      "quäkendes „Kjää“ beim spektakulären Balzflug mit Beuteübergabe in der Luft"
    ],
    "exp": "Typisch für den Kleiber (Spechtmeise) ist: laut pfeifendes „Tuit-tuit-tuit“ und scharfes „Twett“. Als einziger heimischer Vogel kann der Kleiber senkrechte Baumstämme mühelos mit dem Kopf voran nach unten laufen."
  },
  {
    "id": 223,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Kleiber (Spechtmeise)?",
    "a": [
      "mauert das Einflugloch alter Spechthöhlen mit feuchtem Lehm exakt auf seine eigene Körpergröße zu („Kleiber“ = Lehmkleber)",
      "stabiles Napfnest aus Halmen und feuchter Erde in Büschen oder am Holzschuppen",
      "großer Reisighorst auf Masten, Scheunengiebeln oder alten Schornsteinen",
      "Bodenhorst mitten im dichten, im Wasser stehenden Schilfröhricht"
    ],
    "exp": "Beim Kleiber (Spechtmeise) (Sitta europaea) gilt: mauert das Einflugloch alter Spechthöhlen mit feuchtem Lehm exakt auf seine eigene Körpergröße zu („Kleiber“ = Lehmkleber). Als einziger heimischer Vogel kann der Kleiber senkrechte Baumstämme mühelos mit dem Kopf voran nach unten laufen."
  },
  {
    "id": 224,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Kleiber (Spechtmeise) (Sitta europaea) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Rindeninsekten sowie im Herbst und Winter Haselnüsse, Bucheckern und Kiefernsamen",
      "Regenwürmer, Käferlarven im Falllaub sowie Beeren und Fallobst",
      "Frösche, Feldmäuse, große Heuschrecken, Regenwürmer und Blindschleichen",
      "Wasservögel, Frösche, Feldmäuse und Großinsekten"
    ],
    "exp": "Auf dem Speiseplan des Kleiber (Spechtmeise) stehen vor allem: Rindeninsekten sowie im Herbst und Winter Haselnüsse, Bucheckern und Kiefernsamen."
  },
  {
    "id": 225,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Als einziger heimischer Vogel kann der Kleiber senkrechte Baumstämme mühelos mit dem Kopf voran nach unten laufen.“?",
    "a": [
      "Kleiber (Spechtmeise) (Sitta europaea)",
      "Amsel (Schwarzdrossel) (Turdus merula)",
      "Weißstorch (Ciconia ciconia)",
      "Rohrweihe (Circus aeruginosus)"
    ],
    "exp": "Diese Besonderheit beschreibt den Kleiber (Spechtmeise) (Sitta europaea), der in alte Kiefern, Eichen und Obstbäume in Wald und Garten anzutreffen ist."
  },
  {
    "id": 226,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Kleiber (Spechtmeise) in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Sitta europaea",
      "Turdus merula",
      "Ciconia ciconia",
      "Circus aeruginosus"
    ],
    "exp": "Der wissenschaftliche Name von Kleiber (Spechtmeise) lautet Sitta europaea. Lebensraum: alte Kiefern, Eichen und Obstbäume in Wald und Garten."
  },
  {
    "id": 227,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (feiner, abfallender Trillergesang und hohes „Srii“) und lebt bevorzugt in folgendem Lebensraum: geschlossene Kiefern- und Mischwälder rund um Schwarzenburg?",
    "a": [
      "Waldbaumläufer",
      "Buchfink",
      "Schwarzstorch",
      "Bekassine (Himmelsziege)"
    ],
    "exp": "Waldbaumläufer (Certhia familiaris): Er klettert ruckartig spiralförmig den Kiefernstamm hinauf, fliegt zum Stammfuß des nächsten Baumes und beginnt von vorn."
  },
  {
    "id": 228,
    "cat": "voegel",
    "diff": "pro",
    "q": "Woran erkennt man den Waldbaumläufer (Certhia familiaris) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "feiner, abfallender Trillergesang und hohes „Srii“",
      "schmetternder „Finkenschlag“ mit der typischen Schlussstrophe („Würzgebirg“) und Regenruf „Rülp“",
      "leises, heiseres Keuchen und Pfeifen am versteckten Waldhorst (klappert fast nie)",
      "wummerndes, meckerndes Geräusch beim Sturzflug über dem Brutrevier"
    ],
    "exp": "Typisch für den Waldbaumläufer ist: feiner, abfallender Trillergesang und hohes „Srii“. Er klettert ruckartig spiralförmig den Kiefernstamm hinauf, fliegt zum Stammfuß des nächsten Baumes und beginnt von vorn."
  },
  {
    "id": 229,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Waldbaumläufer?",
    "a": [
      "schmale Nische hinter abstehenden Rindenschuppen alter Kiefern",
      "perfekt mit Flechten und Spinnweben an der Baumrinde getarntes Nest",
      "großer Horst tief im ruhigen Altwald auf starken Seitenästen alter Eichen oder Kiefern",
      "tief im Seggenbult verstecktes Bodennest"
    ],
    "exp": "Beim Waldbaumläufer (Certhia familiaris) gilt: schmale Nische hinter abstehenden Rindenschuppen alter Kiefern. Er klettert ruckartig spiralförmig den Kiefernstamm hinauf, fliegt zum Stammfuß des nächsten Baumes und beginnt von vorn."
  },
  {
    "id": 230,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Waldbaumläufer (Certhia familiaris) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "mit dem gebogenen Pinzettenschnabel aus tiefen Borkenritzen gezogene Spinnen und Insektenpuppen",
      "Buchen- und Kiefernsamen, Knospen sowie für die Jungenaufzucht Raupen und Blattläuse",
      "kleine Fische (Schmerlen, Stichlinge), Frösche, Molche und Wasserinsekten in Waldbächen",
      "Würmer und Insektenlarven im feuchten Moorboden"
    ],
    "exp": "Auf dem Speiseplan des Waldbaumläufer stehen vor allem: mit dem gebogenen Pinzettenschnabel aus tiefen Borkenritzen gezogene Spinnen und Insektenpuppen."
  },
  {
    "id": 231,
    "cat": "voegel",
    "diff": "pro",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Er klettert ruckartig spiralförmig den Kiefernstamm hinauf, fliegt zum Stammfuß des nächsten Baumes und beginnt von vorn.“?",
    "a": [
      "Waldbaumläufer (Certhia familiaris)",
      "Buchfink (Fringilla coelebs)",
      "Schwarzstorch (Ciconia nigra)",
      "Bekassine (Himmelsziege) (Gallinago gallinago)"
    ],
    "exp": "Diese Besonderheit beschreibt den Waldbaumläufer (Certhia familiaris), der in geschlossene Kiefern- und Mischwälder rund um Schwarzenburg anzutreffen ist."
  },
  {
    "id": 232,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Waldbaumläufer in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Certhia familiaris",
      "Fringilla coelebs",
      "Ciconia nigra",
      "Gallinago gallinago"
    ],
    "exp": "Der wissenschaftliche Name von Waldbaumläufer lautet Certhia familiaris. Lebensraum: geschlossene Kiefern- und Mischwälder rund um Schwarzenburg."
  },
  {
    "id": 233,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (metallisches „Gip-gip-gip“ im Truppflug über den Baumwipfeln) und lebt bevorzugt in folgendem Lebensraum: zapfenreiche Nadel- und Kiefernwälder der Lausitz?",
    "a": [
      "Fichtenkreuzschnabel",
      "Goldammer",
      "Eisvogel",
      "Graugans"
    ],
    "exp": "Fichtenkreuzschnabel (Loxia curvirostra): Die gekreuzten Schnabelspitzen wirken wie ein Spezialwerkzeug, mit dem er die festen Zapfenschuppen auseinanderhebelt."
  },
  {
    "id": 234,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Fichtenkreuzschnabel (Loxia curvirostra) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "metallisches „Gip-gip-gip“ im Truppflug über den Baumwipfeln",
      "bekannter Gesang „Wie-wie-wie-wie-hab-ich-dich-lieb“ (sieben kurze Töne und ein gedehnter Schlusston)",
      "scharfer, durchdringender Pfiff „Ziiit“ im pfeilschnellen Tiefflug über dem Wasser",
      "lautes, nasales „Gah-gagag“ im V-förmigen Formationsflug"
    ],
    "exp": "Typisch für den Fichtenkreuzschnabel ist: metallisches „Gip-gip-gip“ im Truppflug über den Baumwipfeln. Die gekreuzten Schnabelspitzen wirken wie ein Spezialwerkzeug, mit dem er die festen Zapfenschuppen auseinanderhebelt."
  },
  {
    "id": 235,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Fichtenkreuzschnabel?",
    "a": [
      "brütet oft mitten im tiefsten Winter (Januar/Februar), wenn die Zapfen reif sind",
      "Bodennest an Böschungen, Feldrainen oder unter niedrigen Büschen",
      "gräbt eine bis zu 90 cm lange Brutröhre in senkrechte Lehm- oder Sanduferabbrüche (oder Wurzelteller)",
      "Schilf- und Inselnest an ruhigen Gewässern"
    ],
    "exp": "Beim Fichtenkreuzschnabel (Loxia curvirostra) gilt: brütet oft mitten im tiefsten Winter (Januar/Februar), wenn die Zapfen reif sind. Die gekreuzten Schnabelspitzen wirken wie ein Spezialwerkzeug, mit dem er die festen Zapfenschuppen auseinanderhebelt."
  },
  {
    "id": 236,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Fichtenkreuzschnabel (Loxia curvirostra) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Samen aus den Zapfen von Fichten und Kiefern",
      "Grassamen, Getreidekörner und im Sommer Insekten",
      "kleine Fische (Moderlieschen, Stichlinge), Wasserinsekten und Kaulquappen",
      "Gräser, Kräuter, Wasserpflanzen und Erntereste auf Feldern"
    ],
    "exp": "Auf dem Speiseplan des Fichtenkreuzschnabel stehen vor allem: Samen aus den Zapfen von Fichten und Kiefern."
  },
  {
    "id": 237,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Die gekreuzten Schnabelspitzen wirken wie ein Spezialwerkzeug, mit dem er die festen Zapfenschuppen auseinanderhebelt.“?",
    "a": [
      "Fichtenkreuzschnabel (Loxia curvirostra)",
      "Goldammer (Emberiza citrinella)",
      "Eisvogel (Alcedo atthis)",
      "Graugans (Anser anser)"
    ],
    "exp": "Diese Besonderheit beschreibt den Fichtenkreuzschnabel (Loxia curvirostra), der in zapfenreiche Nadel- und Kiefernwälder der Lausitz anzutreffen ist."
  },
  {
    "id": 238,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Fichtenkreuzschnabel in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Loxia curvirostra",
      "Emberiza citrinella",
      "Alcedo atthis",
      "Anser anser"
    ],
    "exp": "Der wissenschaftliche Name von Fichtenkreuzschnabel lautet Loxia curvirostra. Lebensraum: zapfenreiche Nadel- und Kiefernwälder der Lausitz."
  },
  {
    "id": 239,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (sanftes, wehmütig flötendes „Djü“) und lebt bevorzugt in folgendem Lebensraum: Nadel- und Mischwälder sowie beerenreiche Waldgärten im Winter?",
    "a": [
      "Gimpel (Dompfaff)",
      "Gartenrotschwanz",
      "Hohltaube",
      "Schwanzmeise"
    ],
    "exp": "Gimpel (Dompfaff) (Pyrrhula pyrrhula): Das Männchen trägt eine leuchtend karminrote Brust und eine schwarze Kappe, während das Weibchen dezent graurosa gefärbt ist."
  },
  {
    "id": 240,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Gimpel (Dompfaff) (Pyrrhula pyrrhula) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "sanftes, wehmütig flötendes „Djü“",
      "wehmütig flötender Strophengesang schon in der frühen Morgendämmerung",
      "dumpfes, zweisilbiges „Hu-hu, hu-hu“ aus den Baumkronen",
      "zartes „Sirr-sirr“ des ständig in Bewegung bleibenden Familientrupps"
    ],
    "exp": "Typisch für den Gimpel (Dompfaff) ist: sanftes, wehmütig flötendes „Djü“. Das Männchen trägt eine leuchtend karminrote Brust und eine schwarze Kappe, während das Weibchen dezent graurosa gefärbt ist."
  },
  {
    "id": 241,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Gimpel (Dompfaff)?",
    "a": [
      "flaches Reisignest im dichten Nadelgezweig",
      "Halbhöhlen, alte Spechthöhlen und Nistkästen",
      "einzige heimische Taubenart, die in Baumhöhlen (meist alten Schwarzspechthöhlen) brütet",
      "kunstvolles, dehnbares Kugelnest aus Moos, Flechten, bis zu 2.000 Federn und Spinnweben"
    ],
    "exp": "Beim Gimpel (Dompfaff) (Pyrrhula pyrrhula) gilt: flaches Reisignest im dichten Nadelgezweig. Das Männchen trägt eine leuchtend karminrote Brust und eine schwarze Kappe, während das Weibchen dezent graurosa gefärbt ist."
  },
  {
    "id": 242,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Gimpel (Dompfaff) (Pyrrhula pyrrhula) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Samen von Eberesche (Vogelbeere), Ahorn, Brennnessel sowie Baumknospen",
      "Insekten und Spinnen am Boden und im Laubdach",
      "Unkrautsamen, Getreidekörner, Kiefernsamen und Bucheckern",
      "kleinste Insekten, Spinnen und Knospenläuse"
    ],
    "exp": "Auf dem Speiseplan des Gimpel (Dompfaff) stehen vor allem: Samen von Eberesche (Vogelbeere), Ahorn, Brennnessel sowie Baumknospen."
  },
  {
    "id": 243,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Das Männchen trägt eine leuchtend karminrote Brust und eine schwarze Kappe, während das Weibchen dezent graurosa gefärbt ist.“?",
    "a": [
      "Gimpel (Dompfaff) (Pyrrhula pyrrhula)",
      "Gartenrotschwanz (Phoenicurus phoenicurus)",
      "Hohltaube (Columba oenas)",
      "Schwanzmeise (Aegithalos caudatus)"
    ],
    "exp": "Diese Besonderheit beschreibt den Gimpel (Dompfaff) (Pyrrhula pyrrhula), der in Nadel- und Mischwälder sowie beerenreiche Waldgärten im Winter anzutreffen ist."
  },
  {
    "id": 244,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Gimpel (Dompfaff) in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Pyrrhula pyrrhula",
      "Phoenicurus phoenicurus",
      "Columba oenas",
      "Aegithalos caudatus"
    ],
    "exp": "Der wissenschaftliche Name von Gimpel (Dompfaff) lautet Pyrrhula pyrrhula. Lebensraum: Nadel- und Mischwälder sowie beerenreiche Waldgärten im Winter."
  },
  {
    "id": 245,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (scharfes, explosives „Zick“ aus den Baumwipfeln) und lebt bevorzugt in folgendem Lebensraum: Laubmischwälder, alte Obstbäume und Gärten in Heideblick?",
    "a": [
      "Kernbeißer",
      "Hausrotschwanz",
      "Ringeltaube",
      "Star"
    ],
    "exp": "Kernbeißer (Coccothraustes coccothraustes): Mit seinem massiven Kegelschnabel und kräftiger Kaumuskulatur entwickelt der Kernbeißer einen Beißdruck von bis zu 50 Kilogramm, um Kirschkerne zu knacken."
  },
  {
    "id": 246,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Kernbeißer (Coccothraustes coccothraustes) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "scharfes, explosives „Zick“ aus den Baumwipfeln",
      "knirschend-schleifende Gesangsstrophe vom Dachfirst schon eine Stunde vor Sonnenaufgang",
      "fünfsilbiges, rhythmisches „Ruh-gu-guck, gu-gu“ („Du-dummes-Huhn, du“)",
      "pfeifender, schnalzender Gesang voller Imitationen (vom Mäusebussardruf bis zum Handyklingeln)"
    ],
    "exp": "Typisch für den Kernbeißer ist: scharfes, explosives „Zick“ aus den Baumwipfeln. Mit seinem massiven Kegelschnabel und kräftiger Kaumuskulatur entwickelt der Kernbeißer einen Beißdruck von bis zu 50 Kilogramm, um Kirschkerne zu knacken."
  },
  {
    "id": 247,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Kernbeißer?",
    "a": [
      "Napfnest in den Kronen von Laub- und Obstbäumen",
      "Nischen unter Dachbalken, auf Mauerabsätzen in Ställen oder über Hoflampen",
      "lockeres Reisignest auf Kiefern- oder Laubbaumästen",
      "Baumhöhlen und Starenkästen an Höfen und Bäumen"
    ],
    "exp": "Beim Kernbeißer (Coccothraustes coccothraustes) gilt: Napfnest in den Kronen von Laub- und Obstbäumen. Mit seinem massiven Kegelschnabel und kräftiger Kaumuskulatur entwickelt der Kernbeißer einen Beißdruck von bis zu 50 Kilogramm, um Kirschkerne zu knacken."
  },
  {
    "id": 248,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Kernbeißer (Coccothraustes coccothraustes) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "harte Kirschkerne, Hainbuchensamen, Schlehenkerne und Sonnenblumenkerne",
      "Fliegen, Spinnen, kleine Käfer und Hausmutter-Nachtfalter rund um Hof und Garten",
      "Samen, Eicheln, Bucheckern, Beeren und junge Kräuterblätter",
      "Wiesenschnakenlarven, Käfer, Regenwürmer und im Spätsommer Kirschen und Holunderbeeren"
    ],
    "exp": "Auf dem Speiseplan des Kernbeißer stehen vor allem: harte Kirschkerne, Hainbuchensamen, Schlehenkerne und Sonnenblumenkerne."
  },
  {
    "id": 249,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Mit seinem massiven Kegelschnabel und kräftiger Kaumuskulatur entwickelt der Kernbeißer einen Beißdruck von bis zu 50 Kilogramm, um Kirschkerne zu knacken.“?",
    "a": [
      "Kernbeißer (Coccothraustes coccothraustes)",
      "Hausrotschwanz (Phoenicurus ochruros)",
      "Ringeltaube (Columba palumbus)",
      "Star (Sturnus vulgaris)"
    ],
    "exp": "Diese Besonderheit beschreibt den Kernbeißer (Coccothraustes coccothraustes), der in Laubmischwälder, alte Obstbäume und Gärten in Heideblick anzutreffen ist."
  },
  {
    "id": 250,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Kernbeißer in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Coccothraustes coccothraustes",
      "Phoenicurus ochruros",
      "Columba palumbus",
      "Sturnus vulgaris"
    ],
    "exp": "Der wissenschaftliche Name von Kernbeißer lautet Coccothraustes coccothraustes. Lebensraum: Laubmischwälder, alte Obstbäume und Gärten in Heideblick."
  },
  {
    "id": 251,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (lauter, abwechslungsreicher Gesang aus der Baumspitze, bei dem jedes Motiv zwei- bis viermal wiederholt wird) und lebt bevorzugt in folgendem Lebensraum: Kiefern- und Mischwälder sowie große Waldgärten?",
    "a": [
      "Singdrossel",
      "Rauchschwalbe",
      "Turteltaube",
      "Mönchsgrasmücke"
    ],
    "exp": "Singdrossel (Turdus philomelos): Um Schneckenhäuser zu öffnen, schlägt die Singdrossel sie gezielt auf immer denselben flachen Stein am Waldweg („Drosselschmiede“)."
  },
  {
    "id": 252,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Singdrossel (Turdus philomelos) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "lauter, abwechslungsreicher Gesang aus der Baumspitze, bei dem jedes Motiv zwei- bis viermal wiederholt wird",
      "fröhlich zwitscherndes Geplauder mit schnarrendem Schlusstriller",
      "sanftes, schnurrendes „Turrr-turrr“ an warmen Frühsommertagen",
      "erst leise schwatzender, dann glockenrein flötender Überschlaggesang"
    ],
    "exp": "Typisch für den Singdrossel ist: lauter, abwechslungsreicher Gesang aus der Baumspitze, bei dem jedes Motiv zwei- bis viermal wiederholt wird. Um Schneckenhäuser zu öffnen, schlägt die Singdrossel sie gezielt auf immer denselben flachen Stein am Waldweg („Drosselschmiede“)."
  },
  {
    "id": 253,
    "cat": "voegel",
    "diff": "mid",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Singdrossel?",
    "a": [
      "glatt mit Holzmulm und Speichel ausgekleidetes Napfnest („wie verputzt“)",
      "oben offenes Lehm-Halbschalen-Nest im Inneren von Ställen, Scheunen und Durchfahrten",
      "flaches Reisignest im dichten Dorngebüsch am Waldrand",
      "locker geflochtenes Napfnest im Brombeer- oder Holundergebüsch"
    ],
    "exp": "Beim Singdrossel (Turdus philomelos) gilt: glatt mit Holzmulm und Speichel ausgekleidetes Napfnest („wie verputzt“). Um Schneckenhäuser zu öffnen, schlägt die Singdrossel sie gezielt auf immer denselben flachen Stein am Waldweg („Drosselschmiede“)."
  },
  {
    "id": 254,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Singdrossel (Turdus philomelos) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Gehäuseschnecken, Regenwürmer, Insekten und Waldbeeren",
      "im rasanten Tiefflug über Wiesen und Hofteichen erbeutete Fliegen und Mücken",
      "feine Wildkräutersamen am Boden lückiger Sandfluren",
      "Insekten, Spinnen und im Spätsommer leidenschaftlich gern schwarze Holunderbeeren"
    ],
    "exp": "Auf dem Speiseplan des Singdrossel stehen vor allem: Gehäuseschnecken, Regenwürmer, Insekten und Waldbeeren."
  },
  {
    "id": 255,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Um Schneckenhäuser zu öffnen, schlägt die Singdrossel sie gezielt auf immer denselben flachen Stein am Waldweg („Drosselschmiede“).“?",
    "a": [
      "Singdrossel (Turdus philomelos)",
      "Rauchschwalbe (Hirundo rustica)",
      "Turteltaube (Streptopelia turtur)",
      "Mönchsgrasmücke (Sylvia atricapilla)"
    ],
    "exp": "Diese Besonderheit beschreibt den Singdrossel (Turdus philomelos), der in Kiefern- und Mischwälder sowie große Waldgärten anzutreffen ist."
  },
  {
    "id": 256,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Singdrossel in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Turdus philomelos",
      "Hirundo rustica",
      "Streptopelia turtur",
      "Sylvia atricapilla"
    ],
    "exp": "Der wissenschaftliche Name von Singdrossel lautet Turdus philomelos. Lebensraum: Kiefern- und Mischwälder sowie große Waldgärten."
  },
  {
    "id": 257,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (weithinhallender, flötender Gesang schon im Februar und schnarrendes „Schrr“ im Flug) und lebt bevorzugt in folgendem Lebensraum: ausgedehnte Kiefernwälder mit Mistelbefall in den Baumkronen?",
    "a": [
      "Misteldrossel",
      "Mehlschwalbe",
      "Graureiher",
      "Fitis"
    ],
    "exp": "Misteldrossel (Turdus viscivorus): Indem sie die klebrigen Samen der Kiefernmistel auf Ästen abstreift, sorgt die größte heimische Drossel für die Verbreitung der Mistel."
  },
  {
    "id": 258,
    "cat": "voegel",
    "diff": "pro",
    "q": "Woran erkennt man den Misteldrossel (Turdus viscivorus) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "weithinhallender, flötender Gesang schon im Februar und schnarrendes „Schrr“ im Flug",
      "kurzes, schwatzendes „Schrip“ im Flug",
      "rauhes, krächzendes „Fraank“ im langsamen Ruderflug mit S-förmig eingezogenem Hals",
      "sanft abfallende, wehmütige Liedstrophe (wie ein umgekehrter Buchfinkenschlag)"
    ],
    "exp": "Typisch für den Misteldrossel ist: weithinhallender, flötender Gesang schon im Februar und schnarrendes „Schrr“ im Flug. Indem sie die klebrigen Samen der Kiefernmistel auf Ästen abstreift, sorgt die größte heimische Drossel für die Verbreitung der Mistel."
  },
  {
    "id": 259,
    "cat": "voegel",
    "diff": "pro",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Misteldrossel?",
    "a": [
      "hoch in Astgabeln von Waldkiefern gebautes Nest",
      "bis auf ein enges Einflugloch komplett geschlossenes Lehmkugelnest außen unter Dachvorsprüngen",
      "brütet gesellig in Kolonien („Reiherkolonien“) in den Kronen hoher Kiefern",
      "backofenförmiges Kugelnest am Boden im Gras unter jungen Birken"
    ],
    "exp": "Beim Misteldrossel (Turdus viscivorus) gilt: hoch in Astgabeln von Waldkiefern gebautes Nest. Indem sie die klebrigen Samen der Kiefernmistel auf Ästen abstreift, sorgt die größte heimische Drossel für die Verbreitung der Mistel."
  },
  {
    "id": 260,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Misteldrossel (Turdus viscivorus) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Mistelbeeren, Ebereschenbeeren, Regenwürmer und Käfer",
      "hoch im Luftraum schwebende Kleininsekten (Luftplankton)",
      "Fische, Frösche, Molche und auf trockenen Wiesen vor allem Feldmäuse",
      "Blattläuse, Mücken und Spinnen im Blätterdach"
    ],
    "exp": "Auf dem Speiseplan des Misteldrossel stehen vor allem: Mistelbeeren, Ebereschenbeeren, Regenwürmer und Käfer."
  },
  {
    "id": 261,
    "cat": "voegel",
    "diff": "pro",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Indem sie die klebrigen Samen der Kiefernmistel auf Ästen abstreift, sorgt die größte heimische Drossel für die Verbreitung der Mistel.“?",
    "a": [
      "Misteldrossel (Turdus viscivorus)",
      "Mehlschwalbe (Delichon urbicum)",
      "Graureiher (Ardea cinerea)",
      "Fitis (Phylloscopus trochilus)"
    ],
    "exp": "Diese Besonderheit beschreibt den Misteldrossel (Turdus viscivorus), der in ausgedehnte Kiefernwälder mit Mistelbefall in den Baumkronen anzutreffen ist."
  },
  {
    "id": 262,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Misteldrossel in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Turdus viscivorus",
      "Delichon urbicum",
      "Ardea cinerea",
      "Phylloscopus trochilus"
    ],
    "exp": "Der wissenschaftliche Name von Misteldrossel lautet Turdus viscivorus. Lebensraum: ausgedehnte Kiefernwälder mit Mistelbefall in den Baumkronen."
  },
  {
    "id": 263,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (melodisches, warmes Flöten am Morgen und Abend sowie aufgeregtes „Tix-tix-tix“ bei Gefahr) und lebt bevorzugt in folgendem Lebensraum: Waldgärten, Dörfer, Hecken und Wälder rund um Schwarzenburg?",
    "a": [
      "Amsel (Schwarzdrossel)",
      "Weißstorch",
      "Rohrweihe",
      "Zilpzalp"
    ],
    "exp": "Amsel (Schwarzdrossel) (Turdus merula): Während das Männchen tiefschwarz mit orangegelbem Schnabel ist, trägt das Weibchen ein unauffälliges dunkelbraunes Gefieder."
  },
  {
    "id": 264,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Amsel (Schwarzdrossel) (Turdus merula) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "melodisches, warmes Flöten am Morgen und Abend sowie aufgeregtes „Tix-tix-tix“ bei Gefahr",
      "lautes Schnabelklappern bei der Begrüßung auf dem Horst",
      "quäkendes „Kjää“ beim spektakulären Balzflug mit Beuteübergabe in der Luft",
      "unermüdliches, namensgebendes „Zilp-zalp-zilp-zalp“ ab Mitte März"
    ],
    "exp": "Typisch für den Amsel (Schwarzdrossel) ist: melodisches, warmes Flöten am Morgen und Abend sowie aufgeregtes „Tix-tix-tix“ bei Gefahr. Während das Männchen tiefschwarz mit orangegelbem Schnabel ist, trägt das Weibchen ein unauffälliges dunkelbraunes Gefieder."
  },
  {
    "id": 265,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Amsel (Schwarzdrossel)?",
    "a": [
      "stabiles Napfnest aus Halmen und feuchter Erde in Büschen oder am Holzschuppen",
      "großer Reisighorst auf Masten, Scheunengiebeln oder alten Schornsteinen",
      "Bodenhorst mitten im dichten, im Wasser stehenden Schilfröhricht",
      "kugeliges Nest dicht über dem Boden im Brombeer- oder Grasgestrüpp"
    ],
    "exp": "Beim Amsel (Schwarzdrossel) (Turdus merula) gilt: stabiles Napfnest aus Halmen und feuchter Erde in Büschen oder am Holzschuppen. Während das Männchen tiefschwarz mit orangegelbem Schnabel ist, trägt das Weibchen ein unauffälliges dunkelbraunes Gefieder."
  },
  {
    "id": 266,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Amsel (Schwarzdrossel) (Turdus merula) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Regenwürmer, Käferlarven im Falllaub sowie Beeren und Fallobst",
      "Frösche, Feldmäuse, große Heuschrecken, Regenwürmer und Blindschleichen",
      "Wasservögel, Frösche, Feldmäuse und Großinsekten",
      "kleine Fliegen, Mücken, Blattläuse und Spinnen"
    ],
    "exp": "Auf dem Speiseplan des Amsel (Schwarzdrossel) stehen vor allem: Regenwürmer, Käferlarven im Falllaub sowie Beeren und Fallobst."
  },
  {
    "id": 267,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Während das Männchen tiefschwarz mit orangegelbem Schnabel ist, trägt das Weibchen ein unauffälliges dunkelbraunes Gefieder.“?",
    "a": [
      "Amsel (Schwarzdrossel) (Turdus merula)",
      "Weißstorch (Ciconia ciconia)",
      "Rohrweihe (Circus aeruginosus)",
      "Zilpzalp (Phylloscopus collybita)"
    ],
    "exp": "Diese Besonderheit beschreibt den Amsel (Schwarzdrossel) (Turdus merula), der in Waldgärten, Dörfer, Hecken und Wälder rund um Schwarzenburg anzutreffen ist."
  },
  {
    "id": 268,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Amsel (Schwarzdrossel) in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Turdus merula",
      "Ciconia ciconia",
      "Circus aeruginosus",
      "Phylloscopus collybita"
    ],
    "exp": "Der wissenschaftliche Name von Amsel (Schwarzdrossel) lautet Turdus merula. Lebensraum: Waldgärten, Dörfer, Hecken und Wälder rund um Schwarzenburg."
  },
  {
    "id": 269,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (schmetternder „Finkenschlag“ mit der typischen Schlussstrophe („Würzgebirg“) und Regenruf „Rülp“) und lebt bevorzugt in folgendem Lebensraum: häufigster Brutvogel der brandenburgischen Wälder und Gärten?",
    "a": [
      "Buchfink",
      "Schwarzstorch",
      "Bekassine (Himmelsziege)",
      "Kranich"
    ],
    "exp": "Buchfink (Fringilla coelebs): Zwei leuchtend weiße Flügelbinden und die schieferblaue Kappe mit weinroter Brust kennzeichnen das Männchen im Frühjahr."
  },
  {
    "id": 270,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Buchfink (Fringilla coelebs) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "schmetternder „Finkenschlag“ mit der typischen Schlussstrophe („Würzgebirg“) und Regenruf „Rülp“",
      "leises, heiseres Keuchen und Pfeifen am versteckten Waldhorst (klappert fast nie)",
      "wummerndes, meckerndes Geräusch beim Sturzflug über dem Brutrevier",
      "weitreichendes, trompetendes „Kruh-kruh“ im Duett"
    ],
    "exp": "Typisch für den Buchfink ist: schmetternder „Finkenschlag“ mit der typischen Schlussstrophe („Würzgebirg“) und Regenruf „Rülp“. Zwei leuchtend weiße Flügelbinden und die schieferblaue Kappe mit weinroter Brust kennzeichnen das Männchen im Frühjahr."
  },
  {
    "id": 271,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Buchfink?",
    "a": [
      "perfekt mit Flechten und Spinnweben an der Baumrinde getarntes Nest",
      "großer Horst tief im ruhigen Altwald auf starken Seitenästen alter Eichen oder Kiefern",
      "tief im Seggenbult verstecktes Bodennest",
      "Bodenbrüter im nassen Bruchwald („Sumpfhuhn mit langem Hals“)"
    ],
    "exp": "Beim Buchfink (Fringilla coelebs) gilt: perfekt mit Flechten und Spinnweben an der Baumrinde getarntes Nest. Zwei leuchtend weiße Flügelbinden und die schieferblaue Kappe mit weinroter Brust kennzeichnen das Männchen im Frühjahr."
  },
  {
    "id": 272,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Buchfink (Fringilla coelebs) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Buchen- und Kiefernsamen, Knospen sowie für die Jungenaufzucht Raupen und Blattläuse",
      "kleine Fische (Schmerlen, Stichlinge), Frösche, Molche und Wasserinsekten in Waldbächen",
      "Würmer und Insektenlarven im feuchten Moorboden",
      "Erntereste, Mais, Körner, Insekten, kleine Amphibien und Beeren"
    ],
    "exp": "Auf dem Speiseplan des Buchfink stehen vor allem: Buchen- und Kiefernsamen, Knospen sowie für die Jungenaufzucht Raupen und Blattläuse."
  },
  {
    "id": 273,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Zwei leuchtend weiße Flügelbinden und die schieferblaue Kappe mit weinroter Brust kennzeichnen das Männchen im Frühjahr.“?",
    "a": [
      "Buchfink (Fringilla coelebs)",
      "Schwarzstorch (Ciconia nigra)",
      "Bekassine (Himmelsziege) (Gallinago gallinago)",
      "Kranich (Grus grus)"
    ],
    "exp": "Diese Besonderheit beschreibt den Buchfink (Fringilla coelebs), der in häufigster Brutvogel der brandenburgischen Wälder und Gärten anzutreffen ist."
  },
  {
    "id": 274,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Buchfink in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Fringilla coelebs",
      "Ciconia nigra",
      "Gallinago gallinago",
      "Grus grus"
    ],
    "exp": "Der wissenschaftliche Name von Buchfink lautet Fringilla coelebs. Lebensraum: häufigster Brutvogel der brandenburgischen Wälder und Gärten."
  },
  {
    "id": 275,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher Vogel rund um Schwarzenburg und Heideblick ist bekannt für seinen Ruf/Gesang (bekannter Gesang „Wie-wie-wie-wie-hab-ich-dich-lieb“ (sieben kurze Töne und ein gedehnter Schlusston)) und lebt bevorzugt in folgendem Lebensraum: Waldränder, Feldwege, Hecken und Heideflächen bei Schwarzenburg?",
    "a": [
      "Goldammer",
      "Eisvogel",
      "Graugans",
      "Wiedehopf"
    ],
    "exp": "Goldammer (Emberiza citrinella): Das leuchtend kanariengelbe Köpfchen des Männchens bringt schon im Spätwinter Farbe in die Hecken am Dorfrand."
  },
  {
    "id": 276,
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Goldammer (Emberiza citrinella) bei einem Spaziergang durch Wald und Flur in Heideblick akustisch?",
    "a": [
      "bekannter Gesang „Wie-wie-wie-wie-hab-ich-dich-lieb“ (sieben kurze Töne und ein gedehnter Schlusston)",
      "scharfer, durchdringender Pfiff „Ziiit“ im pfeilschnellen Tiefflug über dem Wasser",
      "lautes, nasales „Gah-gagag“ im V-förmigen Formationsflug",
      "dreisilbiges, dumpfes „Hup-up-up“ im Frühjahr"
    ],
    "exp": "Typisch für den Goldammer ist: bekannter Gesang „Wie-wie-wie-wie-hab-ich-dich-lieb“ (sieben kurze Töne und ein gedehnter Schlusston). Das leuchtend kanariengelbe Köpfchen des Männchens bringt schon im Spätwinter Farbe in die Hecken am Dorfrand."
  },
  {
    "id": 277,
    "cat": "voegel",
    "diff": "easy",
    "q": "Welche Brut- oder Lebensweise ist charakteristisch für den in unserer Region vorkommenden Goldammer?",
    "a": [
      "Bodennest an Böschungen, Feldrainen oder unter niedrigen Büschen",
      "gräbt eine bis zu 90 cm lange Brutröhre in senkrechte Lehm- oder Sanduferabbrüche (oder Wurzelteller)",
      "Schilf- und Inselnest an ruhigen Gewässern",
      "Höhlenbrüter in alten Spechthöhlen, Nistkästen oder Holzstapeln"
    ],
    "exp": "Beim Goldammer (Emberiza citrinella) gilt: Bodennest an Böschungen, Feldrainen oder unter niedrigen Büschen. Das leuchtend kanariengelbe Köpfchen des Männchens bringt schon im Spätwinter Farbe in die Hecken am Dorfrand."
  },
  {
    "id": 278,
    "cat": "voegel",
    "diff": "mid",
    "q": "Wovon ernährt sich der Goldammer (Emberiza citrinella) in den Wäldern, Gärten und Niederungen rund um Schwarzenburg hauptsächlich?",
    "a": [
      "Grassamen, Getreidekörner und im Sommer Insekten",
      "kleine Fische (Moderlieschen, Stichlinge), Wasserinsekten und Kaulquappen",
      "Gräser, Kräuter, Wasserpflanzen und Erntereste auf Feldern",
      "Maulwurfsgrillen, große Käferlarven, Heuschrecken und Spinnen am Sandboden"
    ],
    "exp": "Auf dem Speiseplan des Goldammer stehen vor allem: Grassamen, Getreidekörner und im Sommer Insekten."
  },
  {
    "id": 279,
    "cat": "voegel",
    "diff": "easy",
    "q": "Auf welche heimische Vogelart im Raum Schwarzenburg / Heideblick trifft diese Besonderheit zu: „Das leuchtend kanariengelbe Köpfchen des Männchens bringt schon im Spätwinter Farbe in die Hecken am Dorfrand.“?",
    "a": [
      "Goldammer (Emberiza citrinella)",
      "Eisvogel (Alcedo atthis)",
      "Graugans (Anser anser)",
      "Wiedehopf (Upupa epops)"
    ],
    "exp": "Diese Besonderheit beschreibt den Goldammer (Emberiza citrinella), der in Waldränder, Feldwege, Hecken und Heideflächen bei Schwarzenburg anzutreffen ist."
  },
  {
    "id": 280,
    "cat": "voegel",
    "diff": "pro",
    "q": "Unter welchem wissenschaftlichen Namen wird der Goldammer in der Vogelkunde (Ornithologie) geführt?",
    "a": [
      "Emberiza citrinella",
      "Alcedo atthis",
      "Anser anser",
      "Upupa epops"
    ],
    "exp": "Der wissenschaftliche Name von Goldammer lautet Emberiza citrinella. Lebensraum: Waldränder, Feldwege, Hecken und Heideflächen bei Schwarzenburg."
  },
  {
    "id": 281,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches eindrucksvolle Naturschauspiel ist rund um Schwarzenburg jedes Jahr von Ende August bis Ende September in der Dämmerung zu hören und zu erleben?",
    "a": [
      "Die Rothirschbrunft (das Röhren der Platzhirsche)",
      "Der Winterschlafbeginn der Braunbären",
      "Die Wanderung der Rentiere",
      "Das Laichen der Lachse in den Kiefernkronen"
    ],
    "exp": "Von Ende August bis Ende September hallt das tiefe Röhren der Rothirsche durch die Wälder und Lichtungen rund um Schwarzenburg – ein unvergessliches Naturerlebnis."
  },
  {
    "id": 282,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches streng geschützte große Raubtier ist seit den 2000er-Jahren wieder dauerhaft in den weiten Wäldern und Heiden der Lausitz heimisch?",
    "a": [
      "Der Wolf (Canis lupus)",
      "Der Schneeleopard (Panthera uncia)",
      "Der Vielfraß (Gulo gulo)",
      "Der Goldschakal als einziges Großraubtier"
    ],
    "exp": "Die Lausitz war die erste Region Deutschlands, in der sich ab dem Jahr 2000 wieder freilebende Wolfsrudel ansiedelten; mit viel Glück entdeckt man im Sand ihre geschnürte Fährte."
  },
  {
    "id": 283,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Wie nennt man die typische Fortbewegungsart des Wolfes, bei der die Hinterpfote exakt in den Abdruck der Vorderpfote tritt?",
    "a": [
      "Schnüren (der geschnürte Trab)",
      "Hoppeln",
      "Kreisen",
      "Passgang-Galopp"
    ],
    "exp": "Beim kraftsparenden Trab setzt der Wolf die Hinterpfoten genau in die Spur der Vorderpfoten, sodass eine fast schnurgerade Perlenschnur im Waldsand entsteht."
  },
  {
    "id": 284,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: nur die männlichen Hirsche tragen ein verzweigtes Geweih, das jedes Jahr im Spätwinter abgeworfen und bis zum Sommer neu geschoben wird?",
    "a": [
      "Rothirsch",
      "Steinmarder (Hausmarder)",
      "Fischotter",
      "Zwergfledermaus"
    ],
    "exp": "Rothirsch (Cervus elaphus): Von Ende August bis Ende September ist die Rothirschbrunft rund um Schwarzenburg das akustische Natur-Highlight des Jahres."
  },
  {
    "id": 285,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Rothirsch (Cervus elaphus) rund um Schwarzenburg und Heideblick?",
    "a": [
      "dämmerungs- und nachtaktiv; kräftige Schalenabdrücke (Trittsiegel) von 7–9 cm Länge im Waldsand",
      "nachtaktiv rund um Höfe und Gärten",
      "überwiegend nachtaktiv; hervorragender Schwimmer und Taucher mit Schwimmhäuten zwischen den Zehen",
      "fliegt in rasanten Kurven rund um Hoflichter, Obstbäume und Hecken"
    ],
    "exp": "Beim Rothirsch beobachtet man: dämmerungs- und nachtaktiv; kräftige Schalenabdrücke (Trittsiegel) von 7–9 cm Länge im Waldsand. Von Ende August bis Ende September ist die Rothirschbrunft rund um Schwarzenburg das akustische Natur-Highlight des Jahres."
  },
  {
    "id": 286,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Rothirsch“ in Wald, Heide und Waldgarten?",
    "a": [
      "Gräser, Heidekraut, Eicheln, Kiefernrinde, Knospen und Waldkräuter",
      "Mäuse, Ratten, Insekten, Fallobst, Kirschen und Hühnereier",
      "Fische, Flusskrebse, Frösche und Wasservögel",
      "tausende Stechmücken, Zuckmücken und kleine Nachtfalter pro Nacht"
    ],
    "exp": "Der Rothirsch (Cervus elaphus) ernährt sich von: Gräser, Heidekraut, Eicheln, Kiefernrinde, Knospen und Waldkräuter."
  },
  {
    "id": 287,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Rothirsch besonders wohl?",
    "a": [
      "die großen, zusammenhängenden Kiefernwälder und Lichtungen rund um Schwarzenburg",
      "Dörfer, alte Scheunen, Holzstapel und Waldränder",
      "Flüsse, Bäche, Kanäle und fischreiche Teiche zwischen Heideblick und Spreewald",
      "Dörfer, Höfe, Waldgärten und Waldränder in Schwarzenburg"
    ],
    "exp": "Typischer Lebensraum für Rothirsch: die großen, zusammenhängenden Kiefernwälder und Lichtungen rund um Schwarzenburg. Von Ende August bis Ende September ist die Rothirschbrunft rund um Schwarzenburg das akustische Natur-Highlight des Jahres."
  },
  {
    "id": 288,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Von Ende August bis Ende September ist die Rothirschbrunft rund um Schwarzenburg das akustische Natur-Highlight des Jahres.“?",
    "a": [
      "Rothirsch",
      "Steinmarder (Hausmarder)",
      "Fischotter",
      "Zwergfledermaus"
    ],
    "exp": "Rothirsch (Cervus elaphus) – nur die männlichen Hirsche tragen ein verzweigtes Geweih, das jedes Jahr im Spätwinter abgeworfen und bis zum Sommer neu geschoben wird."
  },
  {
    "id": 289,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Cervus elaphus“?",
    "a": [
      "Rothirsch",
      "Steinmarder (Hausmarder)",
      "Fischotter",
      "Zwergfledermaus"
    ],
    "exp": "Hinter Cervus elaphus verbirgt sich der Rothirsch. Von Ende August bis Ende September ist die Rothirschbrunft rund um Schwarzenburg das akustische Natur-Highlight des Jahres."
  },
  {
    "id": 290,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: bei Gefahr stößt das Reh ein hundeähnliches „Schrecken“ (Bellen) aus und spreizt den weißen Spiegel am Hinterteil?",
    "a": [
      "Reh (Rehwild)",
      "Waschbär",
      "Hermelin (Großes Wiesel)",
      "Zauneidechse"
    ],
    "exp": "Reh (Rehwild) (Capreolus capreolus): Viele Gäste halten das Reh für die „Frau des Hirsches“, tatsächlich ist es aber unsere kleinste eigene Hirschart (Männchen = Rehbock, Weibchen = Ricke)."
  },
  {
    "id": 291,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Reh (Rehwild) (Capreolus capreolus) rund um Schwarzenburg und Heideblick?",
    "a": [
      "vor allem in der Morgen- und Abenddämmerung aktiv; kleine herzförmige Schalenabdrücke (4–5 cm)",
      "nachtaktiv; hinterlässt im feuchten Ufersand Abdrücke, die winzigen Kinderhänden ähneln",
      "tag- und nachtaktiv; richtet sich zur Orientierung oft kerzengerade („Männchen machend“) im Gras auf",
      "wechselwarm: tankt morgens auf warmen Steinen oder Kiefernstämmen Sonne"
    ],
    "exp": "Beim Reh (Rehwild) beobachtet man: vor allem in der Morgen- und Abenddämmerung aktiv; kleine herzförmige Schalenabdrücke (4–5 cm). Viele Gäste halten das Reh für die „Frau des Hirsches“, tatsächlich ist es aber unsere kleinste eigene Hirschart (Männchen = Rehbock, Weibchen = Ricke)."
  },
  {
    "id": 292,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Reh (Rehwild)“ in Wald, Heide und Waldgarten?",
    "a": [
      "selektiver „Konzentratselektierer“: zarte Kräuter, Knospen, Brombeerblätter, Eicheln und Pilze",
      "Allesfresser: Nüsse, Obst, Eicheln, Schnecken, Frösche, Krebse und Insekten",
      "Wühlmäuse, Feldmäuse und Kleinvögel",
      "Heuschrecken, Spinnen, Käfer, Raupen und Zikaden"
    ],
    "exp": "Der Reh (Rehwild) (Capreolus capreolus) ernährt sich von: selektiver „Konzentratselektierer“: zarte Kräuter, Knospen, Brombeerblätter, Eicheln und Pilze."
  },
  {
    "id": 293,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Reh (Rehwild) besonders wohl?",
    "a": [
      "Waldränder, Waldlichtungen, Gärten und Wiesen um Schwarzenburg",
      "gewässernahe Wälder, alte Baumhöhlen und Dorfränder in Brandenburg",
      "Waldränder, Hecken, Stein- und Holzstapel sowie Wiesen",
      "sonnige Waldränder, Sandheiden, Bahndämme und Totholzhaufen rund um Heideblick"
    ],
    "exp": "Typischer Lebensraum für Reh (Rehwild): Waldränder, Waldlichtungen, Gärten und Wiesen um Schwarzenburg. Viele Gäste halten das Reh für die „Frau des Hirsches“, tatsächlich ist es aber unsere kleinste eigene Hirschart (Männchen = Rehbock, Weibchen = Ricke)."
  },
  {
    "id": 294,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Viele Gäste halten das Reh für die „Frau des Hirsches“, tatsächlich ist es aber unsere kleinste eigene Hirschart (Männchen = Rehbock, Weibchen = Ricke).“?",
    "a": [
      "Reh (Rehwild)",
      "Waschbär",
      "Hermelin (Großes Wiesel)",
      "Zauneidechse"
    ],
    "exp": "Reh (Rehwild) (Capreolus capreolus) – bei Gefahr stößt das Reh ein hundeähnliches „Schrecken“ (Bellen) aus und spreizt den weißen Spiegel am Hinterteil."
  },
  {
    "id": 295,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Capreolus capreolus“?",
    "a": [
      "Reh (Rehwild)",
      "Waschbär",
      "Hermelin (Großes Wiesel)",
      "Zauneidechse"
    ],
    "exp": "Hinter Capreolus capreolus verbirgt sich der Reh (Rehwild). Viele Gäste halten das Reh für die „Frau des Hirsches“, tatsächlich ist es aber unsere kleinste eigene Hirschart (Männchen = Rehbock, Weibchen = Ricke)."
  },
  {
    "id": 296,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: Bachen führen ihre gelb-braun längsgestreiften Frischlinge in eng zusammenhaltenden Familienverbänden (Rotten)?",
    "a": [
      "Wildschwein (Schwarzwild)",
      "Marderhund (Enok)",
      "Mauswiesel",
      "Waldeidechse (Bergeidechse)"
    ],
    "exp": "Wildschwein (Schwarzwild) (Sus scrofa): Durch das Umbrechen („Brechen“) des Waldbodens fördern Wildschweine die Naturverjüngung von Kiefern und Eichen; nach ihm ist auch das Gasthaus „Zum Wilden Eber“ benannt."
  },
  {
    "id": 297,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Wildschwein (Schwarzwild) (Sus scrofa) rund um Schwarzenburg und Heideblick?",
    "a": [
      "meist dämmerungs- und nachtaktiv; im Trittsiegel sind neben den Hauptschalen stets die beiden seitlichen „Afterklauen“ sichtbar",
      "rein nachtaktiv und extrem heimlich",
      "extrem flinker Jäger, der Mäusen direkt bis in ihre engen unterirdischen Erdgänge folgt",
      "sonnt sich gern auf umgestürzten Baumstämmen und Wurzelstöcken"
    ],
    "exp": "Beim Wildschwein (Schwarzwild) beobachtet man: meist dämmerungs- und nachtaktiv; im Trittsiegel sind neben den Hauptschalen stets die beiden seitlichen „Afterklauen“ sichtbar. Durch das Umbrechen („Brechen“) des Waldbodens fördern Wildschweine die Naturverjüngung von Kiefern und Eichen; nach ihm ist auch das Gasthaus „Zum Wilden Eber“ benannt."
  },
  {
    "id": 298,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Wildschwein (Schwarzwild)“ in Wald, Heide und Waldgarten?",
    "a": [
      "Allesfresser: Eicheln, Bucheckern, Wurzeln, Engerlinge, Pilze, Regenwürmer und Feldfrüchte",
      "Frösche, Schnecken, Mäuse, Insekten, Beeren, Eicheln und Aas",
      "fast ausschließlich Feld- und Waldmäuse",
      "Spinnen, Ameisen, kleine Heuschrecken und Fliegen"
    ],
    "exp": "Der Wildschwein (Schwarzwild) (Sus scrofa) ernährt sich von: Allesfresser: Eicheln, Bucheckern, Wurzeln, Engerlinge, Pilze, Regenwürmer und Feldfrüchte."
  },
  {
    "id": 299,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Wildschwein (Schwarzwild) besonders wohl?",
    "a": [
      "Kiefern- und Mischwälder mit Suhlen sowie angrenzende Wiesen und Felder",
      "feuchte Wälder, Schilfgebiete und Niederungen der Lausitz",
      "Wiesen, Waldränder, Trockenmauern und Holzhaufen in Gärten",
      "lichte Kiefernwälder, Heidekrautflächen, Moorränder und Holzstapel"
    ],
    "exp": "Typischer Lebensraum für Wildschwein (Schwarzwild): Kiefern- und Mischwälder mit Suhlen sowie angrenzende Wiesen und Felder. Durch das Umbrechen („Brechen“) des Waldbodens fördern Wildschweine die Naturverjüngung von Kiefern und Eichen; nach ihm ist auch das Gasthaus „Zum Wilden Eber“ benannt."
  },
  {
    "id": 300,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Durch das Umbrechen („Brechen“) des Waldbodens fördern Wildschweine die Naturverjüngung von Kiefern und Eichen; nach ihm ist auch das Gasthaus „Zum Wilden Eber“ benannt.“?",
    "a": [
      "Wildschwein (Schwarzwild)",
      "Marderhund (Enok)",
      "Mauswiesel",
      "Waldeidechse (Bergeidechse)"
    ],
    "exp": "Wildschwein (Schwarzwild) (Sus scrofa) – Bachen führen ihre gelb-braun längsgestreiften Frischlinge in eng zusammenhaltenden Familienverbänden (Rotten)."
  },
  {
    "id": 301,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Sus scrofa“?",
    "a": [
      "Wildschwein (Schwarzwild)",
      "Marderhund (Enok)",
      "Mauswiesel",
      "Waldeidechse (Bergeidechse)"
    ],
    "exp": "Hinter Sus scrofa verbirgt sich der Wildschwein (Schwarzwild). Durch das Umbrechen („Brechen“) des Waldbodens fördern Wildschweine die Naturverjüngung von Kiefern und Eichen; nach ihm ist auch das Gasthaus „Zum Wilden Eber“ benannt."
  },
  {
    "id": 302,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: lebt im Familienverband (Rudel) aus Elternpaar und den Nachkommen der letzten ein bis zwei Jahre?",
    "a": [
      "Wolf",
      "Eichhörnchen",
      "Siebenschläfer",
      "Blindschleiche"
    ],
    "exp": "Wolf (Canis lupus): Seit dem Jahr 2000 ist die Lausitz das Kerngebiet der Rückkehr des Wolfes nach Deutschland; gesunde Wölfe meiden den Menschen."
  },
  {
    "id": 303,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Wolf (Canis lupus) rund um Schwarzenburg und Heideblick?",
    "a": [
      "legt auf nächtlichen Streifzügen problemlos 30 bis 50 km im geschnürten Trab zurück",
      "tagaktiv; baut hoch in den Bäumen kugelige Nester („Kobel“) aus Zweigen und Moos",
      "nachtaktiver Kletterkünstler mit buschigem grauem Schwanz und großen dunklen Knopfaugen",
      "dämmerungsaktiv und nach warmen Sommerregen unterwegs"
    ],
    "exp": "Beim Wolf beobachtet man: legt auf nächtlichen Streifzügen problemlos 30 bis 50 km im geschnürten Trab zurück. Seit dem Jahr 2000 ist die Lausitz das Kerngebiet der Rückkehr des Wolfes nach Deutschland; gesunde Wölfe meiden den Menschen."
  },
  {
    "id": 304,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Wolf“ in Wald, Heide und Waldgarten?",
    "a": [
      "überwiegend Rehwild, Rotwild und Wildschweine sowie gelegentlich Hasen",
      "Kiefernsamen aus Zapfen, Eicheln, Haselnüsse, Pilze, Knospen und Beeren",
      "Bucheckern, Eicheln, Obst, Nüsse, Knospen und Pilze",
      "Nacktschnecken, Regenwürmer und glatte Raupen"
    ],
    "exp": "Der Wolf (Canis lupus) ernährt sich von: überwiegend Rehwild, Rotwild und Wildschweine sowie gelegentlich Hasen."
  },
  {
    "id": 305,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Wolf besonders wohl?",
    "a": [
      "ausgedehnte Wälder, Heiden und Bergbaufolgelandschaften der Niederlausitz",
      "Kiefern- und Mischwälder sowie baumreiche Waldgärten in Schwarzenburg",
      "alte Laub- und Mischwälder, Obstgärten, Nistkästen und Dachböden am Waldrand",
      "feuchte Waldränder, Komposthaufen, hohes Gras und naturnahe Waldgärten"
    ],
    "exp": "Typischer Lebensraum für Wolf: ausgedehnte Wälder, Heiden und Bergbaufolgelandschaften der Niederlausitz. Seit dem Jahr 2000 ist die Lausitz das Kerngebiet der Rückkehr des Wolfes nach Deutschland; gesunde Wölfe meiden den Menschen."
  },
  {
    "id": 306,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Seit dem Jahr 2000 ist die Lausitz das Kerngebiet der Rückkehr des Wolfes nach Deutschland; gesunde Wölfe meiden den Menschen.“?",
    "a": [
      "Wolf",
      "Eichhörnchen",
      "Siebenschläfer",
      "Blindschleiche"
    ],
    "exp": "Wolf (Canis lupus) – lebt im Familienverband (Rudel) aus Elternpaar und den Nachkommen der letzten ein bis zwei Jahre."
  },
  {
    "id": 307,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Canis lupus“?",
    "a": [
      "Wolf",
      "Eichhörnchen",
      "Siebenschläfer",
      "Blindschleiche"
    ],
    "exp": "Hinter Canis lupus verbirgt sich der Wolf. Seit dem Jahr 2000 ist die Lausitz das Kerngebiet der Rückkehr des Wolfes nach Deutschland; gesunde Wölfe meiden den Menschen."
  },
  {
    "id": 308,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: nutzt den buschigen Schwanz („Lunte“) mit der weißen Spitze beim Schlafen im Winter als wärmenden Muff vor der Nase?",
    "a": [
      "Rotfuchs",
      "Feldhase",
      "Haselmaus",
      "Ringelnatter"
    ],
    "exp": "Rotfuchs (Vulpes vulpes): Sein feines Gehör ortet das Quieken einer Maus selbst unter einer dichten Laub- oder Schneedecke zentimetergenau."
  },
  {
    "id": 309,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Rotfuchs (Vulpes vulpes) rund um Schwarzenburg und Heideblick?",
    "a": [
      "vor allem dämmerungs- und nachtaktiv; charakteristischer „Mäusesprung“ mit allen vier Pfoten von oben",
      "ruht tagsüber flach gedrückt in einer flachen Erdmulde („Sasse“) und hoppelt abends zur Äsung",
      "klettert nachts mit Hilfe ihres Greifschwanzes geschickt durch das Gezweig, ohne den Boden zu berühren",
      "ausgezeichnete Schwimmerin; völlig ungiftig und für den Menschen harmlos"
    ],
    "exp": "Beim Rotfuchs beobachtet man: vor allem dämmerungs- und nachtaktiv; charakteristischer „Mäusesprung“ mit allen vier Pfoten von oben. Sein feines Gehör ortet das Quieken einer Maus selbst unter einer dichten Laub- oder Schneedecke zentimetergenau."
  },
  {
    "id": 310,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Rotfuchs“ in Wald, Heide und Waldgarten?",
    "a": [
      "Feldmäuse, Regenwürmer, Fallobst, Waldbeeren (Heidelbeeren!), Käfer und Aas",
      "Wildkräuter, Klee, Gräser, Feldfrüchte und im Winter Rinde und Knospen",
      "Haselnüsse, Brombeeren, Knospen, Blütenpollen und Insekten",
      "Frösche, Kröten, Molche und kleine Fische"
    ],
    "exp": "Der Rotfuchs (Vulpes vulpes) ernährt sich von: Feldmäuse, Regenwürmer, Fallobst, Waldbeeren (Heidelbeeren!), Käfer und Aas."
  },
  {
    "id": 311,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Rotfuchs besonders wohl?",
    "a": [
      "Wälder, Wiesenränder, Felder und Dorfränder rund um Schwarzenburg",
      "Wiesen, Felder, Heiden und lichte Waldränder rund um Heideblick",
      "dichte Waldränder mit Hasel-, Brombeer- und Heckensträuchern",
      "Teiche, Gräben, Feuchtwiesen und kompostreiche Waldgärten"
    ],
    "exp": "Typischer Lebensraum für Rotfuchs: Wälder, Wiesenränder, Felder und Dorfränder rund um Schwarzenburg. Sein feines Gehör ortet das Quieken einer Maus selbst unter einer dichten Laub- oder Schneedecke zentimetergenau."
  },
  {
    "id": 312,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Sein feines Gehör ortet das Quieken einer Maus selbst unter einer dichten Laub- oder Schneedecke zentimetergenau.“?",
    "a": [
      "Rotfuchs",
      "Feldhase",
      "Haselmaus",
      "Ringelnatter"
    ],
    "exp": "Rotfuchs (Vulpes vulpes) – nutzt den buschigen Schwanz („Lunte“) mit der weißen Spitze beim Schlafen im Winter als wärmenden Muff vor der Nase."
  },
  {
    "id": 313,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Vulpes vulpes“?",
    "a": [
      "Rotfuchs",
      "Feldhase",
      "Haselmaus",
      "Ringelnatter"
    ],
    "exp": "Hinter Vulpes vulpes verbirgt sich der Rotfuchs. Sein feines Gehör ortet das Quieken einer Maus selbst unter einer dichten Laub- oder Schneedecke zentimetergenau."
  },
  {
    "id": 314,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: unverwechselbare schwarz-weiße Gesichtsmaske und kräftige Grabkrallen an den Vorderpfoten?",
    "a": [
      "Dachs (Meister Grimbart)",
      "Braunbrustigel",
      "Braunes Langohr (Fledermaus)",
      "Kreuzotter"
    ],
    "exp": "Dachs (Meister Grimbart) (Meles meles): Der reinliche Dachs polstert seinen Kessel regelmäßig mit frischem Moos und Farn aus und legt abseits des Baus eigene „Dachstoiletten“ an."
  },
  {
    "id": 315,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Dachs (Meister Grimbart) (Meles meles) rund um Schwarzenburg und Heideblick?",
    "a": [
      "streng nachtaktiv; legt große, über Generationen genutzte unterirdische Höhlensysteme („Dachsburg“) mit bis zu 20 Röhren an",
      "dämmerungs- und nachtaktiv; hält von November bis April echten Winterschlaf im trockenen Laubhaufen",
      "jagt nachts im extrem wendigen Rüttel- und Langsamflug dicht am Laub und an Kiefernstämmen",
      "tagaktiv, sonnt sich früh am Morgen auf Bulten oder Baumstümpfen"
    ],
    "exp": "Beim Dachs (Meister Grimbart) beobachtet man: streng nachtaktiv; legt große, über Generationen genutzte unterirdische Höhlensysteme („Dachsburg“) mit bis zu 20 Röhren an. Der reinliche Dachs polstert seinen Kessel regelmäßig mit frischem Moos und Farn aus und legt abseits des Baus eigene „Dachstoiletten“ an."
  },
  {
    "id": 316,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Dachs (Meister Grimbart)“ in Wald, Heide und Waldgarten?",
    "a": [
      "Regenwürmer, Fallobst, Beeren, Schnecken, Käferlarven und Pilze",
      "Laufkäfer, Raupen, Regenwürmer, Ohrwürmer und Schnecken",
      "Nachtfalter (Eulenfalter), Spinnen und Raupen, die es direkt von Blättern und Rinde abliest",
      "Waldmäuse, Waldeidechsen und Moorfrösche"
    ],
    "exp": "Der Dachs (Meister Grimbart) (Meles meles) ernährt sich von: Regenwürmer, Fallobst, Beeren, Schnecken, Käferlarven und Pilze."
  },
  {
    "id": 317,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Dachs (Meister Grimbart) besonders wohl?",
    "a": [
      "ruhige Waldhänge und Endmoränenkuppen im Kiefern- und Mischwald",
      "strukturreiche Waldgärten, Hecken, Reisighaufen und Dorfränder",
      "strukturreiche Kiefern- und Mischwälder, Baumhöhlen, Nistkästen und alte Scheunen",
      "ungestörte Moorränder, feuchte Heiden und sonnige Kiefernwaldlichtungen"
    ],
    "exp": "Typischer Lebensraum für Dachs (Meister Grimbart): ruhige Waldhänge und Endmoränenkuppen im Kiefern- und Mischwald. Der reinliche Dachs polstert seinen Kessel regelmäßig mit frischem Moos und Farn aus und legt abseits des Baus eigene „Dachstoiletten“ an."
  },
  {
    "id": 318,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Der reinliche Dachs polstert seinen Kessel regelmäßig mit frischem Moos und Farn aus und legt abseits des Baus eigene „Dachstoiletten“ an.“?",
    "a": [
      "Dachs (Meister Grimbart)",
      "Braunbrustigel",
      "Braunes Langohr (Fledermaus)",
      "Kreuzotter"
    ],
    "exp": "Dachs (Meister Grimbart) (Meles meles) – unverwechselbare schwarz-weiße Gesichtsmaske und kräftige Grabkrallen an den Vorderpfoten."
  },
  {
    "id": 319,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Meles meles“?",
    "a": [
      "Dachs (Meister Grimbart)",
      "Braunbrustigel",
      "Braunes Langohr (Fledermaus)",
      "Kreuzotter"
    ],
    "exp": "Hinter Meles meles verbirgt sich der Dachs (Meister Grimbart). Der reinliche Dachs polstert seinen Kessel regelmäßig mit frischem Moos und Farn aus und legt abseits des Baus eigene „Dachstoiletten“ an."
  },
  {
    "id": 320,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: dottergelber, nach unten spitz zulaufender Kehlfleck und behaarte Fußsohlen?",
    "a": [
      "Baummarder (Edelmarder)",
      "Elbebiber",
      "Großer Abendsegler (Fledermaus)",
      "Glattnatter (Schlingnatter)"
    ],
    "exp": "Baummarder (Edelmarder) (Martes martes): Im Gegensatz zum Steinmarder meidet der scheue Baummarder Siedlungen und nutzt alte Schwarzspechthöhlen und Eichhörnchenkobel als Tagesversteck."
  },
  {
    "id": 321,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Baummarder (Edelmarder) (Martes martes) rund um Schwarzenburg und Heideblick?",
    "a": [
      "klettert geschickt bis in die Baumkronen und springt bis zu 4 Meter weit von Kiefer zu Kiefer",
      "dämmerungs- und nachtaktiv; fällt Weiden und Birken mit seinen durch Eiseneinlagerungen orange gefärbten Nagezähnen",
      "fliegt oft schon kurz nach Sonnenuntergang im schnellen, schwalbenartigen Jagdflug",
      "versteckte Lebensweise; völlig ungiftige Würgeschlange"
    ],
    "exp": "Beim Baummarder (Edelmarder) beobachtet man: klettert geschickt bis in die Baumkronen und springt bis zu 4 Meter weit von Kiefer zu Kiefer. Im Gegensatz zum Steinmarder meidet der scheue Baummarder Siedlungen und nutzt alte Schwarzspechthöhlen und Eichhörnchenkobel als Tagesversteck."
  },
  {
    "id": 322,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Baummarder (Edelmarder)“ in Wald, Heide und Waldgarten?",
    "a": [
      "Kleinsäuger, Vögel, Eichhörnchen, Insekten, Waldhonig und im Herbst Ebereschen- und Heidelbeeren",
      "reiner Pflanzenfresser: im Sommer Kräuter und Wasserpflanzen, im Winter Rinde und Zweige von Weichhölzern",
      "Maikäfer, Mistkäfer, Schnaken und Nachtfalter im freien Luftraum",
      "vor allem Zaun- und Waldeidechsen, Blindschleichen und junge Mäuse"
    ],
    "exp": "Der Baummarder (Edelmarder) (Martes martes) ernährt sich von: Kleinsäuger, Vögel, Eichhörnchen, Insekten, Waldhonig und im Herbst Ebereschen- und Heidelbeeren."
  },
  {
    "id": 323,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Baummarder (Edelmarder) besonders wohl?",
    "a": [
      "geschlossene, strukturreiche Kiefern- und Mischwälder rund um Schwarzenburg",
      "Fließgewässer wie Berste und Kleine Elster sowie Waldgräben und Teiche der Region",
      "jagt hoch über Baumkronen, Lichtungen und Seen; Quartier in alten Spechthöhlen der Kiefern",
      "trockene, sonnenexponierte Sandheiden, Kiefernwaldränder und Steinhaufen"
    ],
    "exp": "Typischer Lebensraum für Baummarder (Edelmarder): geschlossene, strukturreiche Kiefern- und Mischwälder rund um Schwarzenburg. Im Gegensatz zum Steinmarder meidet der scheue Baummarder Siedlungen und nutzt alte Schwarzspechthöhlen und Eichhörnchenkobel als Tagesversteck."
  },
  {
    "id": 324,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Im Gegensatz zum Steinmarder meidet der scheue Baummarder Siedlungen und nutzt alte Schwarzspechthöhlen und Eichhörnchenkobel als Tagesversteck.“?",
    "a": [
      "Baummarder (Edelmarder)",
      "Elbebiber",
      "Großer Abendsegler (Fledermaus)",
      "Glattnatter (Schlingnatter)"
    ],
    "exp": "Baummarder (Edelmarder) (Martes martes) – dottergelber, nach unten spitz zulaufender Kehlfleck und behaarte Fußsohlen."
  },
  {
    "id": 325,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Martes martes“?",
    "a": [
      "Baummarder (Edelmarder)",
      "Elbebiber",
      "Großer Abendsegler (Fledermaus)",
      "Glattnatter (Schlingnatter)"
    ],
    "exp": "Hinter Martes martes verbirgt sich der Baummarder (Edelmarder). Im Gegensatz zum Steinmarder meidet der scheue Baummarder Siedlungen und nutzt alte Schwarzspechthöhlen und Eichhörnchenkobel als Tagesversteck."
  },
  {
    "id": 326,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: reinweißer, meist gegabelter Kehlfleck und helle, fleischfarbene Nase?",
    "a": [
      "Steinmarder (Hausmarder)",
      "Fischotter",
      "Zwergfledermaus",
      "Moorfrosch"
    ],
    "exp": "Steinmarder (Hausmarder) (Martes foina): Er klettert mühelos an rauen Scheunenwänden empor und schläft tagsüber gern auf warmen Heuböden."
  },
  {
    "id": 327,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Steinmarder (Hausmarder) (Martes foina) rund um Schwarzenburg und Heideblick?",
    "a": [
      "nachtaktiv rund um Höfe und Gärten",
      "überwiegend nachtaktiv; hervorragender Schwimmer und Taucher mit Schwimmhäuten zwischen den Zehen",
      "fliegt in rasanten Kurven rund um Hoflichter, Obstbäume und Hecken",
      "wandert im zeitigen Frühjahr (März/April) zu den Laichgewässern"
    ],
    "exp": "Beim Steinmarder (Hausmarder) beobachtet man: nachtaktiv rund um Höfe und Gärten. Er klettert mühelos an rauen Scheunenwänden empor und schläft tagsüber gern auf warmen Heuböden."
  },
  {
    "id": 328,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Steinmarder (Hausmarder)“ in Wald, Heide und Waldgarten?",
    "a": [
      "Mäuse, Ratten, Insekten, Fallobst, Kirschen und Hühnereier",
      "Fische, Flusskrebse, Frösche und Wasservögel",
      "tausende Stechmücken, Zuckmücken und kleine Nachtfalter pro Nacht",
      "Insekten, Spinnen, Asseln und kleine Schnecken"
    ],
    "exp": "Der Steinmarder (Hausmarder) (Martes foina) ernährt sich von: Mäuse, Ratten, Insekten, Fallobst, Kirschen und Hühnereier."
  },
  {
    "id": 329,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Steinmarder (Hausmarder) besonders wohl?",
    "a": [
      "Dörfer, alte Scheunen, Holzstapel und Waldränder",
      "Flüsse, Bäche, Kanäle und fischreiche Teiche zwischen Heideblick und Spreewald",
      "Dörfer, Höfe, Waldgärten und Waldränder in Schwarzenburg",
      "Erlenbrüche, Niedermoore (wie Borcheltsbusch) und Waldweiher bei Heideblick"
    ],
    "exp": "Typischer Lebensraum für Steinmarder (Hausmarder): Dörfer, alte Scheunen, Holzstapel und Waldränder. Er klettert mühelos an rauen Scheunenwänden empor und schläft tagsüber gern auf warmen Heuböden."
  },
  {
    "id": 330,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Er klettert mühelos an rauen Scheunenwänden empor und schläft tagsüber gern auf warmen Heuböden.“?",
    "a": [
      "Steinmarder (Hausmarder)",
      "Fischotter",
      "Zwergfledermaus",
      "Moorfrosch"
    ],
    "exp": "Steinmarder (Hausmarder) (Martes foina) – reinweißer, meist gegabelter Kehlfleck und helle, fleischfarbene Nase."
  },
  {
    "id": 331,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Martes foina“?",
    "a": [
      "Steinmarder (Hausmarder)",
      "Fischotter",
      "Zwergfledermaus",
      "Moorfrosch"
    ],
    "exp": "Hinter Martes foina verbirgt sich der Steinmarder (Hausmarder). Er klettert mühelos an rauen Scheunenwänden empor und schläft tagsüber gern auf warmen Heuböden."
  },
  {
    "id": 332,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: schwarze „Banditenmaske“ im Gesicht und schwarz-grau geringelter Buschschwanz?",
    "a": [
      "Waschbär",
      "Hermelin (Großes Wiesel)",
      "Zauneidechse",
      "Europäischer Laubfrosch"
    ],
    "exp": "Waschbär (Procyon lotor): Mit seinen hochempfindlichen Vorderpfoten ertastet („wäscht“) er unter Wasser und im Laub blind nach Nahrung."
  },
  {
    "id": 333,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Waschbär (Procyon lotor) rund um Schwarzenburg und Heideblick?",
    "a": [
      "nachtaktiv; hinterlässt im feuchten Ufersand Abdrücke, die winzigen Kinderhänden ähneln",
      "tag- und nachtaktiv; richtet sich zur Orientierung oft kerzengerade („Männchen machend“) im Gras auf",
      "wechselwarm: tankt morgens auf warmen Steinen oder Kiefernstämmen Sonne",
      "klettert mit Haftscheiben an Finger- und Zehenspitzen mühelos an glatten Blättern und Halmen"
    ],
    "exp": "Beim Waschbär beobachtet man: nachtaktiv; hinterlässt im feuchten Ufersand Abdrücke, die winzigen Kinderhänden ähneln. Mit seinen hochempfindlichen Vorderpfoten ertastet („wäscht“) er unter Wasser und im Laub blind nach Nahrung."
  },
  {
    "id": 334,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Waschbär“ in Wald, Heide und Waldgarten?",
    "a": [
      "Allesfresser: Nüsse, Obst, Eicheln, Schnecken, Frösche, Krebse und Insekten",
      "Wühlmäuse, Feldmäuse und Kleinvögel",
      "Heuschrecken, Spinnen, Käfer, Raupen und Zikaden",
      "Fliegen, Mücken, Käfer und Spinnen im Gebüsch"
    ],
    "exp": "Der Waschbär (Procyon lotor) ernährt sich von: Allesfresser: Nüsse, Obst, Eicheln, Schnecken, Frösche, Krebse und Insekten."
  },
  {
    "id": 335,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Waschbär besonders wohl?",
    "a": [
      "gewässernahe Wälder, alte Baumhöhlen und Dorfränder in Brandenburg",
      "Waldränder, Hecken, Stein- und Holzstapel sowie Wiesen",
      "sonnige Waldränder, Sandheiden, Bahndämme und Totholzhaufen rund um Heideblick",
      "sonnige Weiher mit Schilf und angrenzenden Brombeerhecken am Waldrand"
    ],
    "exp": "Typischer Lebensraum für Waschbär: gewässernahe Wälder, alte Baumhöhlen und Dorfränder in Brandenburg. Mit seinen hochempfindlichen Vorderpfoten ertastet („wäscht“) er unter Wasser und im Laub blind nach Nahrung."
  },
  {
    "id": 336,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Mit seinen hochempfindlichen Vorderpfoten ertastet („wäscht“) er unter Wasser und im Laub blind nach Nahrung.“?",
    "a": [
      "Waschbär",
      "Hermelin (Großes Wiesel)",
      "Zauneidechse",
      "Europäischer Laubfrosch"
    ],
    "exp": "Waschbär (Procyon lotor) – schwarze „Banditenmaske“ im Gesicht und schwarz-grau geringelter Buschschwanz."
  },
  {
    "id": 337,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Procyon lotor“?",
    "a": [
      "Waschbär",
      "Hermelin (Großes Wiesel)",
      "Zauneidechse",
      "Europäischer Laubfrosch"
    ],
    "exp": "Hinter Procyon lotor verbirgt sich der Waschbär. Mit seinen hochempfindlichen Vorderpfoten ertastet („wäscht“) er unter Wasser und im Laub blind nach Nahrung."
  },
  {
    "id": 338,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: einziger Hundeartiger weltweit, der im kalten Winter eine echte Winterruhe im Erdbau hält?",
    "a": [
      "Marderhund (Enok)",
      "Mauswiesel",
      "Waldeidechse (Bergeidechse)",
      "Knoblauchkröte"
    ],
    "exp": "Marderhund (Enok) (Nyctereutes procyonoides): Trotz seines Namens und der waschbärähnlichen Gesichtsmaske ist der Marderhund ein echter Wildhund mit kurzen Beinen."
  },
  {
    "id": 339,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welche Lebensweise oder Spur verrät den Marderhund (Enok) (Nyctereutes procyonoides) rund um Schwarzenburg und Heideblick?",
    "a": [
      "rein nachtaktiv und extrem heimlich",
      "extrem flinker Jäger, der Mäusen direkt bis in ihre engen unterirdischen Erdgänge folgt",
      "sonnt sich gern auf umgestürzten Baumstämmen und Wurzelstöcken",
      "streng nachtaktiv; gräbt sich tagsüber mit scharfkantigen „Grabschwielen“ an den Hinterfüßen rückwärts bis zu 50 cm tief in den Sand ein"
    ],
    "exp": "Beim Marderhund (Enok) beobachtet man: rein nachtaktiv und extrem heimlich. Trotz seines Namens und der waschbärähnlichen Gesichtsmaske ist der Marderhund ein echter Wildhund mit kurzen Beinen."
  },
  {
    "id": 340,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Marderhund (Enok)“ in Wald, Heide und Waldgarten?",
    "a": [
      "Frösche, Schnecken, Mäuse, Insekten, Beeren, Eicheln und Aas",
      "fast ausschließlich Feld- und Waldmäuse",
      "Spinnen, Ameisen, kleine Heuschrecken und Fliegen",
      "Laufkäfer, Grillen, Spinnen und Regenwürmer"
    ],
    "exp": "Der Marderhund (Enok) (Nyctereutes procyonoides) ernährt sich von: Frösche, Schnecken, Mäuse, Insekten, Beeren, Eicheln und Aas."
  },
  {
    "id": 341,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Marderhund (Enok) besonders wohl?",
    "a": [
      "feuchte Wälder, Schilfgebiete und Niederungen der Lausitz",
      "Wiesen, Waldränder, Trockenmauern und Holzhaufen in Gärten",
      "lichte Kiefernwälder, Heidekrautflächen, Moorränder und Holzstapel",
      "lockere, sandige Böden der Niederlausitzer Heide und Äcker nahe Kleingewässern"
    ],
    "exp": "Typischer Lebensraum für Marderhund (Enok): feuchte Wälder, Schilfgebiete und Niederungen der Lausitz. Trotz seines Namens und der waschbärähnlichen Gesichtsmaske ist der Marderhund ein echter Wildhund mit kurzen Beinen."
  },
  {
    "id": 342,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Trotz seines Namens und der waschbärähnlichen Gesichtsmaske ist der Marderhund ein echter Wildhund mit kurzen Beinen.“?",
    "a": [
      "Marderhund (Enok)",
      "Mauswiesel",
      "Waldeidechse (Bergeidechse)",
      "Knoblauchkröte"
    ],
    "exp": "Marderhund (Enok) (Nyctereutes procyonoides) – einziger Hundeartiger weltweit, der im kalten Winter eine echte Winterruhe im Erdbau hält."
  },
  {
    "id": 343,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Nyctereutes procyonoides“?",
    "a": [
      "Marderhund (Enok)",
      "Mauswiesel",
      "Waldeidechse (Bergeidechse)",
      "Knoblauchkröte"
    ],
    "exp": "Hinter Nyctereutes procyonoides verbirgt sich der Marderhund (Enok). Trotz seines Namens und der waschbärähnlichen Gesichtsmaske ist der Marderhund ein echter Wildhund mit kurzen Beinen."
  },
  {
    "id": 344,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: hält keinen durchgehenden Winterschlaf, sondern nur mehrtägige Winterruhe bei starkem Frost?",
    "a": [
      "Eichhörnchen",
      "Siebenschläfer",
      "Blindschleiche",
      "Erdkröte"
    ],
    "exp": "Eichhörnchen (Sciurus vulgaris): Beim Abnagen eines Kiefernzapfens lässt das Eichhörnchen am Ende eine ausgefranste Spindel mit einem kleinen Schopf an der Spitze übrig."
  },
  {
    "id": 345,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Eichhörnchen (Sciurus vulgaris) rund um Schwarzenburg und Heideblick?",
    "a": [
      "tagaktiv; baut hoch in den Bäumen kugelige Nester („Kobel“) aus Zweigen und Moos",
      "nachtaktiver Kletterkünstler mit buschigem grauem Schwanz und großen dunklen Knopfaugen",
      "dämmerungsaktiv und nach warmen Sommerregen unterwegs",
      "dämmerungs- und nachtaktiv; wandert im März bei mildem Regenwetter zielstrebig zu ihrem Geburtsgewässer"
    ],
    "exp": "Beim Eichhörnchen beobachtet man: tagaktiv; baut hoch in den Bäumen kugelige Nester („Kobel“) aus Zweigen und Moos. Beim Abnagen eines Kiefernzapfens lässt das Eichhörnchen am Ende eine ausgefranste Spindel mit einem kleinen Schopf an der Spitze übrig."
  },
  {
    "id": 346,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Eichhörnchen“ in Wald, Heide und Waldgarten?",
    "a": [
      "Kiefernsamen aus Zapfen, Eicheln, Haselnüsse, Pilze, Knospen und Beeren",
      "Bucheckern, Eicheln, Obst, Nüsse, Knospen und Pilze",
      "Nacktschnecken, Regenwürmer und glatte Raupen",
      "Nacktschnecken, Käfer, Asseln und Regenwürmer"
    ],
    "exp": "Der Eichhörnchen (Sciurus vulgaris) ernährt sich von: Kiefernsamen aus Zapfen, Eicheln, Haselnüsse, Pilze, Knospen und Beeren."
  },
  {
    "id": 347,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Eichhörnchen besonders wohl?",
    "a": [
      "Kiefern- und Mischwälder sowie baumreiche Waldgärten in Schwarzenburg",
      "alte Laub- und Mischwälder, Obstgärten, Nistkästen und Dachböden am Waldrand",
      "feuchte Waldränder, Komposthaufen, hohes Gras und naturnahe Waldgärten",
      "Wälder, Waldgärten, Kellerabgänge und Teiche rund um Schwarzenburg"
    ],
    "exp": "Typischer Lebensraum für Eichhörnchen: Kiefern- und Mischwälder sowie baumreiche Waldgärten in Schwarzenburg. Beim Abnagen eines Kiefernzapfens lässt das Eichhörnchen am Ende eine ausgefranste Spindel mit einem kleinen Schopf an der Spitze übrig."
  },
  {
    "id": 348,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Beim Abnagen eines Kiefernzapfens lässt das Eichhörnchen am Ende eine ausgefranste Spindel mit einem kleinen Schopf an der Spitze übrig.“?",
    "a": [
      "Eichhörnchen",
      "Siebenschläfer",
      "Blindschleiche",
      "Erdkröte"
    ],
    "exp": "Eichhörnchen (Sciurus vulgaris) – hält keinen durchgehenden Winterschlaf, sondern nur mehrtägige Winterruhe bei starkem Frost."
  },
  {
    "id": 349,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Sciurus vulgaris“?",
    "a": [
      "Eichhörnchen",
      "Siebenschläfer",
      "Blindschleiche",
      "Erdkröte"
    ],
    "exp": "Hinter Sciurus vulgaris verbirgt sich der Eichhörnchen. Beim Abnagen eines Kiefernzapfens lässt das Eichhörnchen am Ende eine ausgefranste Spindel mit einem kleinen Schopf an der Spitze übrig."
  },
  {
    "id": 350,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: sehr lange Ohren („Löffel“) mit schwarzen Spitzen und kräftige Hinterläufe, mit denen er bis zu 70 km/h erreicht?",
    "a": [
      "Feldhase",
      "Haselmaus",
      "Ringelnatter",
      "Hirschkäfer"
    ],
    "exp": "Feldhase (Lepus europaeus): Junge Feldhasen kommen bereits voll behaart und mit offenen Augen als „Nestflüchter“ zur Welt."
  },
  {
    "id": 351,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Feldhase (Lepus europaeus) rund um Schwarzenburg und Heideblick?",
    "a": [
      "ruht tagsüber flach gedrückt in einer flachen Erdmulde („Sasse“) und hoppelt abends zur Äsung",
      "klettert nachts mit Hilfe ihres Greifschwanzes geschickt durch das Gezweig, ohne den Boden zu berühren",
      "ausgezeichnete Schwimmerin; völlig ungiftig und für den Menschen harmlos",
      "die erwachsenen Käfer fliegen an warmen Juni- und Juliabenden brummend in aufrechter Haltung um die Baumkronen"
    ],
    "exp": "Beim Feldhase beobachtet man: ruht tagsüber flach gedrückt in einer flachen Erdmulde („Sasse“) und hoppelt abends zur Äsung. Junge Feldhasen kommen bereits voll behaart und mit offenen Augen als „Nestflüchter“ zur Welt."
  },
  {
    "id": 352,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Feldhase“ in Wald, Heide und Waldgarten?",
    "a": [
      "Wildkräuter, Klee, Gräser, Feldfrüchte und im Winter Rinde und Knospen",
      "Haselnüsse, Brombeeren, Knospen, Blütenpollen und Insekten",
      "Frösche, Kröten, Molche und kleine Fische",
      "erwachsene Käfer lecken austretenden, gärenden Eichenbaumsaft; die Larven leben von morschem Eichenwurzelholz"
    ],
    "exp": "Der Feldhase (Lepus europaeus) ernährt sich von: Wildkräuter, Klee, Gräser, Feldfrüchte und im Winter Rinde und Knospen."
  },
  {
    "id": 353,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Feldhase besonders wohl?",
    "a": [
      "Wiesen, Felder, Heiden und lichte Waldränder rund um Heideblick",
      "dichte Waldränder mit Hasel-, Brombeer- und Heckensträuchern",
      "Teiche, Gräben, Feuchtwiesen und kompostreiche Waldgärten",
      "alte Eichenbestände und Totholzinseln in den Wäldern Südbrandenburgs"
    ],
    "exp": "Typischer Lebensraum für Feldhase: Wiesen, Felder, Heiden und lichte Waldränder rund um Heideblick. Junge Feldhasen kommen bereits voll behaart und mit offenen Augen als „Nestflüchter“ zur Welt."
  },
  {
    "id": 354,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Junge Feldhasen kommen bereits voll behaart und mit offenen Augen als „Nestflüchter“ zur Welt.“?",
    "a": [
      "Feldhase",
      "Haselmaus",
      "Ringelnatter",
      "Hirschkäfer"
    ],
    "exp": "Feldhase (Lepus europaeus) – sehr lange Ohren („Löffel“) mit schwarzen Spitzen und kräftige Hinterläufe, mit denen er bis zu 70 km/h erreicht."
  },
  {
    "id": 355,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Lepus europaeus“?",
    "a": [
      "Feldhase",
      "Haselmaus",
      "Ringelnatter",
      "Hirschkäfer"
    ],
    "exp": "Hinter Lepus europaeus verbirgt sich der Feldhase. Junge Feldhasen kommen bereits voll behaart und mit offenen Augen als „Nestflüchter“ zur Welt."
  },
  {
    "id": 356,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: trägt ein Kleid aus rund 6.000 bis 8.000 aufstellbaren Stacheln und rollt sich bei Gefahr zur Stachelkugel ein?",
    "a": [
      "Braunbrustigel",
      "Braunes Langohr (Fledermaus)",
      "Kreuzotter",
      "Großer Eichenbock (Heldbock)"
    ],
    "exp": "Braunbrustigel (Erinaceus europaeus): Ein naturnaher Waldgarten mit Laub- und Totholzecken sowie Durchschlupfen im Zaun ist das beste Igel-Paradies."
  },
  {
    "id": 357,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Braunbrustigel (Erinaceus europaeus) rund um Schwarzenburg und Heideblick?",
    "a": [
      "dämmerungs- und nachtaktiv; hält von November bis April echten Winterschlaf im trockenen Laubhaufen",
      "jagt nachts im extrem wendigen Rüttel- und Langsamflug dicht am Laub und an Kiefernstämmen",
      "tagaktiv, sonnt sich früh am Morgen auf Bulten oder Baumstümpfen",
      "dämmerungsaktiv im Hochsommer"
    ],
    "exp": "Beim Braunbrustigel beobachtet man: dämmerungs- und nachtaktiv; hält von November bis April echten Winterschlaf im trockenen Laubhaufen. Ein naturnaher Waldgarten mit Laub- und Totholzecken sowie Durchschlupfen im Zaun ist das beste Igel-Paradies."
  },
  {
    "id": 358,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Braunbrustigel“ in Wald, Heide und Waldgarten?",
    "a": [
      "Laufkäfer, Raupen, Regenwürmer, Ohrwürmer und Schnecken",
      "Nachtfalter (Eulenfalter), Spinnen und Raupen, die es direkt von Blättern und Rinde abliest",
      "Waldmäuse, Waldeidechsen und Moorfrösche",
      "Baumsaft und reifes Obst; die Larven nagen daumendicke Gänge im alten Eichenholz"
    ],
    "exp": "Der Braunbrustigel (Erinaceus europaeus) ernährt sich von: Laufkäfer, Raupen, Regenwürmer, Ohrwürmer und Schnecken."
  },
  {
    "id": 359,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Braunbrustigel besonders wohl?",
    "a": [
      "strukturreiche Waldgärten, Hecken, Reisighaufen und Dorfränder",
      "strukturreiche Kiefern- und Mischwälder, Baumhöhlen, Nistkästen und alte Scheunen",
      "ungestörte Moorränder, feuchte Heiden und sonnige Kiefernwaldlichtungen",
      "alte, besonnte Eichen an Waldrändern und Alleen der Niederlausitz"
    ],
    "exp": "Typischer Lebensraum für Braunbrustigel: strukturreiche Waldgärten, Hecken, Reisighaufen und Dorfränder. Ein naturnaher Waldgarten mit Laub- und Totholzecken sowie Durchschlupfen im Zaun ist das beste Igel-Paradies."
  },
  {
    "id": 360,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Ein naturnaher Waldgarten mit Laub- und Totholzecken sowie Durchschlupfen im Zaun ist das beste Igel-Paradies.“?",
    "a": [
      "Braunbrustigel",
      "Braunes Langohr (Fledermaus)",
      "Kreuzotter",
      "Großer Eichenbock (Heldbock)"
    ],
    "exp": "Braunbrustigel (Erinaceus europaeus) – trägt ein Kleid aus rund 6.000 bis 8.000 aufstellbaren Stacheln und rollt sich bei Gefahr zur Stachelkugel ein."
  },
  {
    "id": 361,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Erinaceus europaeus“?",
    "a": [
      "Braunbrustigel",
      "Braunes Langohr (Fledermaus)",
      "Kreuzotter",
      "Großer Eichenbock (Heldbock)"
    ],
    "exp": "Hinter Erinaceus europaeus verbirgt sich der Braunbrustigel. Ein naturnaher Waldgarten mit Laub- und Totholzecken sowie Durchschlupfen im Zaun ist das beste Igel-Paradies."
  },
  {
    "id": 362,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: baut Dämme und Burgen mit Unterwassereingang und klatscht bei Gefahr mit der breiten, beschuppten Kelle aufs Wasser?",
    "a": [
      "Elbebiber",
      "Großer Abendsegler (Fledermaus)",
      "Glattnatter (Schlingnatter)",
      "Rote Waldameise"
    ],
    "exp": "Elbebiber (Castor fiber albicus): Als Landschaftsgestalter staut der Biber kleine Waldbäche an und schafft so wertvolle Feuchtbiotope für Kraniche, Eisvögel und Frösche."
  },
  {
    "id": 363,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Elbebiber (Castor fiber albicus) rund um Schwarzenburg und Heideblick?",
    "a": [
      "dämmerungs- und nachtaktiv; fällt Weiden und Birken mit seinen durch Eiseneinlagerungen orange gefärbten Nagezähnen",
      "fliegt oft schon kurz nach Sonnenuntergang im schnellen, schwalbenartigen Jagdflug",
      "versteckte Lebensweise; völlig ungiftige Würgeschlange",
      "errichtet bis zu 1,5 Meter hohe, kuppelförmige Nesthügel aus Kiefernnadeln und Harzklümpchen"
    ],
    "exp": "Beim Elbebiber beobachtet man: dämmerungs- und nachtaktiv; fällt Weiden und Birken mit seinen durch Eiseneinlagerungen orange gefärbten Nagezähnen. Als Landschaftsgestalter staut der Biber kleine Waldbäche an und schafft so wertvolle Feuchtbiotope für Kraniche, Eisvögel und Frösche."
  },
  {
    "id": 364,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Elbebiber“ in Wald, Heide und Waldgarten?",
    "a": [
      "reiner Pflanzenfresser: im Sommer Kräuter und Wasserpflanzen, im Winter Rinde und Zweige von Weichhölzern",
      "Maikäfer, Mistkäfer, Schnaken und Nachtfalter im freien Luftraum",
      "vor allem Zaun- und Waldeidechsen, Blindschleichen und junge Mäuse",
      "forstschädliche Schmetterlingsraupen, Blattwespenlarven sowie süßer Honigtau von Rindenläusen"
    ],
    "exp": "Der Elbebiber (Castor fiber albicus) ernährt sich von: reiner Pflanzenfresser: im Sommer Kräuter und Wasserpflanzen, im Winter Rinde und Zweige von Weichhölzern."
  },
  {
    "id": 365,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Elbebiber besonders wohl?",
    "a": [
      "Fließgewässer wie Berste und Kleine Elster sowie Waldgräben und Teiche der Region",
      "jagt hoch über Baumkronen, Lichtungen und Seen; Quartier in alten Spechthöhlen der Kiefern",
      "trockene, sonnenexponierte Sandheiden, Kiefernwaldränder und Steinhaufen",
      "sonnige Kiefern- und Mischwaldränder rund um Schwarzenburg"
    ],
    "exp": "Typischer Lebensraum für Elbebiber: Fließgewässer wie Berste und Kleine Elster sowie Waldgräben und Teiche der Region. Als Landschaftsgestalter staut der Biber kleine Waldbäche an und schafft so wertvolle Feuchtbiotope für Kraniche, Eisvögel und Frösche."
  },
  {
    "id": 366,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Als Landschaftsgestalter staut der Biber kleine Waldbäche an und schafft so wertvolle Feuchtbiotope für Kraniche, Eisvögel und Frösche.“?",
    "a": [
      "Elbebiber",
      "Großer Abendsegler (Fledermaus)",
      "Glattnatter (Schlingnatter)",
      "Rote Waldameise"
    ],
    "exp": "Elbebiber (Castor fiber albicus) – baut Dämme und Burgen mit Unterwassereingang und klatscht bei Gefahr mit der breiten, beschuppten Kelle aufs Wasser."
  },
  {
    "id": 367,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Castor fiber albicus“?",
    "a": [
      "Elbebiber",
      "Großer Abendsegler (Fledermaus)",
      "Glattnatter (Schlingnatter)",
      "Rote Waldameise"
    ],
    "exp": "Hinter Castor fiber albicus verbirgt sich der Elbebiber. Als Landschaftsgestalter staut der Biber kleine Waldbäche an und schafft so wertvolle Feuchtbiotope für Kraniche, Eisvögel und Frösche."
  },
  {
    "id": 368,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: besitzt das dichteste Fell aller heimischen Säugetiere mit bis zu 50.000 Haaren pro Quadratzentimeter?",
    "a": [
      "Fischotter",
      "Zwergfledermaus",
      "Moorfrosch",
      "Ameisenlöwe (Ameisenjungfer)"
    ],
    "exp": "Fischotter (Lutra lutra): Die wasserreiche Niederlausitz gehört zu den wichtigsten Rückzugsräumen des streng geschützten Fischotters in Mitteleuropa."
  },
  {
    "id": 369,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Fischotter (Lutra lutra) rund um Schwarzenburg und Heideblick?",
    "a": [
      "überwiegend nachtaktiv; hervorragender Schwimmer und Taucher mit Schwimmhäuten zwischen den Zehen",
      "fliegt in rasanten Kurven rund um Hoflichter, Obstbäume und Hecken",
      "wandert im zeitigen Frühjahr (März/April) zu den Laichgewässern",
      "die Larve sitzt rückwärts eingegraben am Grund eines selbst gebauten, 3–5 cm breiten Sandtrichters"
    ],
    "exp": "Beim Fischotter beobachtet man: überwiegend nachtaktiv; hervorragender Schwimmer und Taucher mit Schwimmhäuten zwischen den Zehen. Die wasserreiche Niederlausitz gehört zu den wichtigsten Rückzugsräumen des streng geschützten Fischotters in Mitteleuropa."
  },
  {
    "id": 370,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Fischotter“ in Wald, Heide und Waldgarten?",
    "a": [
      "Fische, Flusskrebse, Frösche und Wasservögel",
      "tausende Stechmücken, Zuckmücken und kleine Nachtfalter pro Nacht",
      "Insekten, Spinnen, Asseln und kleine Schnecken",
      "Ameisen und kleine Spinnen, die in den Sandtrichter rutschen"
    ],
    "exp": "Der Fischotter (Lutra lutra) ernährt sich von: Fische, Flusskrebse, Frösche und Wasservögel."
  },
  {
    "id": 371,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Fischotter besonders wohl?",
    "a": [
      "Flüsse, Bäche, Kanäle und fischreiche Teiche zwischen Heideblick und Spreewald",
      "Dörfer, Höfe, Waldgärten und Waldränder in Schwarzenburg",
      "Erlenbrüche, Niedermoore (wie Borcheltsbusch) und Waldweiher bei Heideblick",
      "trockener, feiner und regengeschützter Sand unter Kiefernwurzeln und Dachüberständen in Schwarzenburg"
    ],
    "exp": "Typischer Lebensraum für Fischotter: Flüsse, Bäche, Kanäle und fischreiche Teiche zwischen Heideblick und Spreewald. Die wasserreiche Niederlausitz gehört zu den wichtigsten Rückzugsräumen des streng geschützten Fischotters in Mitteleuropa."
  },
  {
    "id": 372,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Die wasserreiche Niederlausitz gehört zu den wichtigsten Rückzugsräumen des streng geschützten Fischotters in Mitteleuropa.“?",
    "a": [
      "Fischotter",
      "Zwergfledermaus",
      "Moorfrosch",
      "Ameisenlöwe (Ameisenjungfer)"
    ],
    "exp": "Fischotter (Lutra lutra) – besitzt das dichteste Fell aller heimischen Säugetiere mit bis zu 50.000 Haaren pro Quadratzentimeter."
  },
  {
    "id": 373,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Lutra lutra“?",
    "a": [
      "Fischotter",
      "Zwergfledermaus",
      "Moorfrosch",
      "Ameisenlöwe (Ameisenjungfer)"
    ],
    "exp": "Hinter Lutra lutra verbirgt sich der Fischotter. Die wasserreiche Niederlausitz gehört zu den wichtigsten Rückzugsräumen des streng geschützten Fischotters in Mitteleuropa."
  },
  {
    "id": 374,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: wechselt im Winter oft in ein schneeweißes Fell, wobei die schwarze Schwanzspitze das ganze Jahr über schwarz bleibt?",
    "a": [
      "Hermelin (Großes Wiesel)",
      "Zauneidechse",
      "Europäischer Laubfrosch",
      "Blauflügelige Ödlandschrecke"
    ],
    "exp": "Hermelin (Großes Wiesel) (Mustela erminea): An dieser schwarzen Schwanzspitze lässt sich das Hermelin jederzeit sicher vom noch kleineren Mauswiesel unterscheiden."
  },
  {
    "id": 375,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Hermelin (Großes Wiesel) (Mustela erminea) rund um Schwarzenburg und Heideblick?",
    "a": [
      "tag- und nachtaktiv; richtet sich zur Orientierung oft kerzengerade („Männchen machend“) im Gras auf",
      "wechselwarm: tankt morgens auf warmen Steinen oder Kiefernstämmen Sonne",
      "klettert mit Haftscheiben an Finger- und Zehenspitzen mühelos an glatten Blättern und Halmen",
      "am Boden durch sandgraue Tarnfarbe unsichtbar; fliegt erst im letzten Moment vor den Schuhen des Wanderers auf"
    ],
    "exp": "Beim Hermelin (Großes Wiesel) beobachtet man: tag- und nachtaktiv; richtet sich zur Orientierung oft kerzengerade („Männchen machend“) im Gras auf. An dieser schwarzen Schwanzspitze lässt sich das Hermelin jederzeit sicher vom noch kleineren Mauswiesel unterscheiden."
  },
  {
    "id": 376,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Hermelin (Großes Wiesel)“ in Wald, Heide und Waldgarten?",
    "a": [
      "Wühlmäuse, Feldmäuse und Kleinvögel",
      "Heuschrecken, Spinnen, Käfer, Raupen und Zikaden",
      "Fliegen, Mücken, Käfer und Spinnen im Gebüsch",
      "trockene Gräser, kleine Heidekräuter und Moose"
    ],
    "exp": "Der Hermelin (Großes Wiesel) (Mustela erminea) ernährt sich von: Wühlmäuse, Feldmäuse und Kleinvögel."
  },
  {
    "id": 377,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Hermelin (Großes Wiesel) besonders wohl?",
    "a": [
      "Waldränder, Hecken, Stein- und Holzstapel sowie Wiesen",
      "sonnige Waldränder, Sandheiden, Bahndämme und Totholzhaufen rund um Heideblick",
      "sonnige Weiher mit Schilf und angrenzenden Brombeerhecken am Waldrand",
      "offene Sandwege, Heideflächen und sonnige Kiefernlichtungen rund um Schwarzenburg"
    ],
    "exp": "Typischer Lebensraum für Hermelin (Großes Wiesel): Waldränder, Hecken, Stein- und Holzstapel sowie Wiesen. An dieser schwarzen Schwanzspitze lässt sich das Hermelin jederzeit sicher vom noch kleineren Mauswiesel unterscheiden."
  },
  {
    "id": 378,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „An dieser schwarzen Schwanzspitze lässt sich das Hermelin jederzeit sicher vom noch kleineren Mauswiesel unterscheiden.“?",
    "a": [
      "Hermelin (Großes Wiesel)",
      "Zauneidechse",
      "Europäischer Laubfrosch",
      "Blauflügelige Ödlandschrecke"
    ],
    "exp": "Hermelin (Großes Wiesel) (Mustela erminea) – wechselt im Winter oft in ein schneeweißes Fell, wobei die schwarze Schwanzspitze das ganze Jahr über schwarz bleibt."
  },
  {
    "id": 379,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Mustela erminea“?",
    "a": [
      "Hermelin (Großes Wiesel)",
      "Zauneidechse",
      "Europäischer Laubfrosch",
      "Blauflügelige Ödlandschrecke"
    ],
    "exp": "Hinter Mustela erminea verbirgt sich der Hermelin (Großes Wiesel). An dieser schwarzen Schwanzspitze lässt sich das Hermelin jederzeit sicher vom noch kleineren Mauswiesel unterscheiden."
  },
  {
    "id": 380,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: kleinstes Raubtier der Welt: bleistiftschlank, nur 15–20 cm lang und kaum schwerer als ein Hühnerei (40–80 g)?",
    "a": [
      "Mauswiesel",
      "Waldeidechse (Bergeidechse)",
      "Knoblauchkröte",
      "Schwalbenschwanz"
    ],
    "exp": "Mauswiesel (Mustela nivalis): Wegen seines hohen Stoffwechsels muss das Mauswiesel täglich etwa ein Drittel seines eigenen Körpergewichts fressen."
  },
  {
    "id": 381,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welche Lebensweise oder Spur verrät den Mauswiesel (Mustela nivalis) rund um Schwarzenburg und Heideblick?",
    "a": [
      "extrem flinker Jäger, der Mäusen direkt bis in ihre engen unterirdischen Erdgänge folgt",
      "sonnt sich gern auf umgestürzten Baumstämmen und Wurzelstöcken",
      "streng nachtaktiv; gräbt sich tagsüber mit scharfkantigen „Grabschwielen“ an den Hinterfüßen rückwärts bis zu 50 cm tief in den Sand ein",
      "fliegt in zwei Generationen von Mai bis August im eleganten Segelflug"
    ],
    "exp": "Beim Mauswiesel beobachtet man: extrem flinker Jäger, der Mäusen direkt bis in ihre engen unterirdischen Erdgänge folgt. Wegen seines hohen Stoffwechsels muss das Mauswiesel täglich etwa ein Drittel seines eigenen Körpergewichts fressen."
  },
  {
    "id": 382,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Mauswiesel“ in Wald, Heide und Waldgarten?",
    "a": [
      "fast ausschließlich Feld- und Waldmäuse",
      "Spinnen, Ameisen, kleine Heuschrecken und Fliegen",
      "Laufkäfer, Grillen, Spinnen und Regenwürmer",
      "Falter saugen Nektar an Disteln, Klee und Flieder; die grün-schwarz-orange geringelten Raupen fressen Wilde Möhre, Dill und Fenchel"
    ],
    "exp": "Der Mauswiesel (Mustela nivalis) ernährt sich von: fast ausschließlich Feld- und Waldmäuse."
  },
  {
    "id": 383,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Mauswiesel besonders wohl?",
    "a": [
      "Wiesen, Waldränder, Trockenmauern und Holzhaufen in Gärten",
      "lichte Kiefernwälder, Heidekrautflächen, Moorränder und Holzstapel",
      "lockere, sandige Böden der Niederlausitzer Heide und Äcker nahe Kleingewässern",
      "blütenreiche Wiesen, Waldgärten und sonnige Waldränder in Heideblick"
    ],
    "exp": "Typischer Lebensraum für Mauswiesel: Wiesen, Waldränder, Trockenmauern und Holzhaufen in Gärten. Wegen seines hohen Stoffwechsels muss das Mauswiesel täglich etwa ein Drittel seines eigenen Körpergewichts fressen."
  },
  {
    "id": 384,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Wegen seines hohen Stoffwechsels muss das Mauswiesel täglich etwa ein Drittel seines eigenen Körpergewichts fressen.“?",
    "a": [
      "Mauswiesel",
      "Waldeidechse (Bergeidechse)",
      "Knoblauchkröte",
      "Schwalbenschwanz"
    ],
    "exp": "Mauswiesel (Mustela nivalis) – kleinstes Raubtier der Welt: bleistiftschlank, nur 15–20 cm lang und kaum schwerer als ein Hühnerei (40–80 g)."
  },
  {
    "id": 385,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Mustela nivalis“?",
    "a": [
      "Mauswiesel",
      "Waldeidechse (Bergeidechse)",
      "Knoblauchkröte",
      "Schwalbenschwanz"
    ],
    "exp": "Hinter Mustela nivalis verbirgt sich der Mauswiesel. Wegen seines hohen Stoffwechsels muss das Mauswiesel täglich etwa ein Drittel seines eigenen Körpergewichts fressen."
  },
  {
    "id": 386,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: verschläft oft volle sieben Monate (von Oktober bis Mai) zusammengerollt im Winterschlaf?",
    "a": [
      "Siebenschläfer",
      "Blindschleiche",
      "Erdkröte",
      "Rothirsch"
    ],
    "exp": "Siebenschläfer (Glis glis): Greift ein Beutegreifer nach seinem Schwanz, streift sich die Schwanzhaut an einer Sollbruchstelle ab, damit der Bilch entkommen kann."
  },
  {
    "id": 387,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Siebenschläfer (Glis glis) rund um Schwarzenburg und Heideblick?",
    "a": [
      "nachtaktiver Kletterkünstler mit buschigem grauem Schwanz und großen dunklen Knopfaugen",
      "dämmerungsaktiv und nach warmen Sommerregen unterwegs",
      "dämmerungs- und nachtaktiv; wandert im März bei mildem Regenwetter zielstrebig zu ihrem Geburtsgewässer",
      "dämmerungs- und nachtaktiv; kräftige Schalenabdrücke (Trittsiegel) von 7–9 cm Länge im Waldsand"
    ],
    "exp": "Beim Siebenschläfer beobachtet man: nachtaktiver Kletterkünstler mit buschigem grauem Schwanz und großen dunklen Knopfaugen. Greift ein Beutegreifer nach seinem Schwanz, streift sich die Schwanzhaut an einer Sollbruchstelle ab, damit der Bilch entkommen kann."
  },
  {
    "id": 388,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Siebenschläfer“ in Wald, Heide und Waldgarten?",
    "a": [
      "Bucheckern, Eicheln, Obst, Nüsse, Knospen und Pilze",
      "Nacktschnecken, Regenwürmer und glatte Raupen",
      "Nacktschnecken, Käfer, Asseln und Regenwürmer",
      "Gräser, Heidekraut, Eicheln, Kiefernrinde, Knospen und Waldkräuter"
    ],
    "exp": "Der Siebenschläfer (Glis glis) ernährt sich von: Bucheckern, Eicheln, Obst, Nüsse, Knospen und Pilze."
  },
  {
    "id": 389,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Siebenschläfer besonders wohl?",
    "a": [
      "alte Laub- und Mischwälder, Obstgärten, Nistkästen und Dachböden am Waldrand",
      "feuchte Waldränder, Komposthaufen, hohes Gras und naturnahe Waldgärten",
      "Wälder, Waldgärten, Kellerabgänge und Teiche rund um Schwarzenburg",
      "die großen, zusammenhängenden Kiefernwälder und Lichtungen rund um Schwarzenburg"
    ],
    "exp": "Typischer Lebensraum für Siebenschläfer: alte Laub- und Mischwälder, Obstgärten, Nistkästen und Dachböden am Waldrand. Greift ein Beutegreifer nach seinem Schwanz, streift sich die Schwanzhaut an einer Sollbruchstelle ab, damit der Bilch entkommen kann."
  },
  {
    "id": 390,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Greift ein Beutegreifer nach seinem Schwanz, streift sich die Schwanzhaut an einer Sollbruchstelle ab, damit der Bilch entkommen kann.“?",
    "a": [
      "Siebenschläfer",
      "Blindschleiche",
      "Erdkröte",
      "Rothirsch"
    ],
    "exp": "Siebenschläfer (Glis glis) – verschläft oft volle sieben Monate (von Oktober bis Mai) zusammengerollt im Winterschlaf."
  },
  {
    "id": 391,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Glis glis“?",
    "a": [
      "Siebenschläfer",
      "Blindschleiche",
      "Erdkröte",
      "Rothirsch"
    ],
    "exp": "Hinter Glis glis verbirgt sich der Siebenschläfer. Greift ein Beutegreifer nach seinem Schwanz, streift sich die Schwanzhaut an einer Sollbruchstelle ab, damit der Bilch entkommen kann."
  },
  {
    "id": 392,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: goldgelb bis haselnussbraun gefärbter kleiner Bilch (Schläfer), kaum größer als ein Daumen?",
    "a": [
      "Haselmaus",
      "Ringelnatter",
      "Hirschkäfer",
      "Reh (Rehwild)"
    ],
    "exp": "Haselmaus (Muscardinus avellanarius): Ihre kreisrund in Haselnüsse genagten Öffnungen mit glattem Innenrand verraten ihre Anwesenheit im Herbst."
  },
  {
    "id": 393,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welche Lebensweise oder Spur verrät den Haselmaus (Muscardinus avellanarius) rund um Schwarzenburg und Heideblick?",
    "a": [
      "klettert nachts mit Hilfe ihres Greifschwanzes geschickt durch das Gezweig, ohne den Boden zu berühren",
      "ausgezeichnete Schwimmerin; völlig ungiftig und für den Menschen harmlos",
      "die erwachsenen Käfer fliegen an warmen Juni- und Juliabenden brummend in aufrechter Haltung um die Baumkronen",
      "vor allem in der Morgen- und Abenddämmerung aktiv; kleine herzförmige Schalenabdrücke (4–5 cm)"
    ],
    "exp": "Beim Haselmaus beobachtet man: klettert nachts mit Hilfe ihres Greifschwanzes geschickt durch das Gezweig, ohne den Boden zu berühren. Ihre kreisrund in Haselnüsse genagten Öffnungen mit glattem Innenrand verraten ihre Anwesenheit im Herbst."
  },
  {
    "id": 394,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Haselmaus“ in Wald, Heide und Waldgarten?",
    "a": [
      "Haselnüsse, Brombeeren, Knospen, Blütenpollen und Insekten",
      "Frösche, Kröten, Molche und kleine Fische",
      "erwachsene Käfer lecken austretenden, gärenden Eichenbaumsaft; die Larven leben von morschem Eichenwurzelholz",
      "selektiver „Konzentratselektierer“: zarte Kräuter, Knospen, Brombeerblätter, Eicheln und Pilze"
    ],
    "exp": "Der Haselmaus (Muscardinus avellanarius) ernährt sich von: Haselnüsse, Brombeeren, Knospen, Blütenpollen und Insekten."
  },
  {
    "id": 395,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Haselmaus besonders wohl?",
    "a": [
      "dichte Waldränder mit Hasel-, Brombeer- und Heckensträuchern",
      "Teiche, Gräben, Feuchtwiesen und kompostreiche Waldgärten",
      "alte Eichenbestände und Totholzinseln in den Wäldern Südbrandenburgs",
      "Waldränder, Waldlichtungen, Gärten und Wiesen um Schwarzenburg"
    ],
    "exp": "Typischer Lebensraum für Haselmaus: dichte Waldränder mit Hasel-, Brombeer- und Heckensträuchern. Ihre kreisrund in Haselnüsse genagten Öffnungen mit glattem Innenrand verraten ihre Anwesenheit im Herbst."
  },
  {
    "id": 396,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Ihre kreisrund in Haselnüsse genagten Öffnungen mit glattem Innenrand verraten ihre Anwesenheit im Herbst.“?",
    "a": [
      "Haselmaus",
      "Ringelnatter",
      "Hirschkäfer",
      "Reh (Rehwild)"
    ],
    "exp": "Haselmaus (Muscardinus avellanarius) – goldgelb bis haselnussbraun gefärbter kleiner Bilch (Schläfer), kaum größer als ein Daumen."
  },
  {
    "id": 397,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Muscardinus avellanarius“?",
    "a": [
      "Haselmaus",
      "Ringelnatter",
      "Hirschkäfer",
      "Reh (Rehwild)"
    ],
    "exp": "Hinter Muscardinus avellanarius verbirgt sich der Haselmaus. Ihre kreisrund in Haselnüsse genagten Öffnungen mit glattem Innenrand verraten ihre Anwesenheit im Herbst."
  },
  {
    "id": 398,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: riesige Ohren, die fast so lang wie der gesamte Körper sind und im Schlaf unter die Flügel geklappt werden?",
    "a": [
      "Braunes Langohr (Fledermaus)",
      "Kreuzotter",
      "Großer Eichenbock (Heldbock)",
      "Wildschwein (Schwarzwild)"
    ],
    "exp": "Braunes Langohr (Fledermaus) (Plecotus auritus): Im Waldgarten findet man unter seinen Fraßplätzen oft kleine Häufchen abgebissener bunter Nachtfalterflügel."
  },
  {
    "id": 399,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Braunes Langohr (Fledermaus) (Plecotus auritus) rund um Schwarzenburg und Heideblick?",
    "a": [
      "jagt nachts im extrem wendigen Rüttel- und Langsamflug dicht am Laub und an Kiefernstämmen",
      "tagaktiv, sonnt sich früh am Morgen auf Bulten oder Baumstümpfen",
      "dämmerungsaktiv im Hochsommer",
      "meist dämmerungs- und nachtaktiv; im Trittsiegel sind neben den Hauptschalen stets die beiden seitlichen „Afterklauen“ sichtbar"
    ],
    "exp": "Beim Braunes Langohr (Fledermaus) beobachtet man: jagt nachts im extrem wendigen Rüttel- und Langsamflug dicht am Laub und an Kiefernstämmen. Im Waldgarten findet man unter seinen Fraßplätzen oft kleine Häufchen abgebissener bunter Nachtfalterflügel."
  },
  {
    "id": 400,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Braunes Langohr (Fledermaus)“ in Wald, Heide und Waldgarten?",
    "a": [
      "Nachtfalter (Eulenfalter), Spinnen und Raupen, die es direkt von Blättern und Rinde abliest",
      "Waldmäuse, Waldeidechsen und Moorfrösche",
      "Baumsaft und reifes Obst; die Larven nagen daumendicke Gänge im alten Eichenholz",
      "Allesfresser: Eicheln, Bucheckern, Wurzeln, Engerlinge, Pilze, Regenwürmer und Feldfrüchte"
    ],
    "exp": "Der Braunes Langohr (Fledermaus) (Plecotus auritus) ernährt sich von: Nachtfalter (Eulenfalter), Spinnen und Raupen, die es direkt von Blättern und Rinde abliest."
  },
  {
    "id": 401,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Braunes Langohr (Fledermaus) besonders wohl?",
    "a": [
      "strukturreiche Kiefern- und Mischwälder, Baumhöhlen, Nistkästen und alte Scheunen",
      "ungestörte Moorränder, feuchte Heiden und sonnige Kiefernwaldlichtungen",
      "alte, besonnte Eichen an Waldrändern und Alleen der Niederlausitz",
      "Kiefern- und Mischwälder mit Suhlen sowie angrenzende Wiesen und Felder"
    ],
    "exp": "Typischer Lebensraum für Braunes Langohr (Fledermaus): strukturreiche Kiefern- und Mischwälder, Baumhöhlen, Nistkästen und alte Scheunen. Im Waldgarten findet man unter seinen Fraßplätzen oft kleine Häufchen abgebissener bunter Nachtfalterflügel."
  },
  {
    "id": 402,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Im Waldgarten findet man unter seinen Fraßplätzen oft kleine Häufchen abgebissener bunter Nachtfalterflügel.“?",
    "a": [
      "Braunes Langohr (Fledermaus)",
      "Kreuzotter",
      "Großer Eichenbock (Heldbock)",
      "Wildschwein (Schwarzwild)"
    ],
    "exp": "Braunes Langohr (Fledermaus) (Plecotus auritus) – riesige Ohren, die fast so lang wie der gesamte Körper sind und im Schlaf unter die Flügel geklappt werden."
  },
  {
    "id": 403,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Plecotus auritus“?",
    "a": [
      "Braunes Langohr (Fledermaus)",
      "Kreuzotter",
      "Großer Eichenbock (Heldbock)",
      "Wildschwein (Schwarzwild)"
    ],
    "exp": "Hinter Plecotus auritus verbirgt sich der Braunes Langohr (Fledermaus). Im Waldgarten findet man unter seinen Fraßplätzen oft kleine Häufchen abgebissener bunter Nachtfalterflügel."
  },
  {
    "id": 404,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: eine der größten heimischen Fledermäuse mit rostbraunem, glatt anliegendem Fell und bis zu 40 cm Spannweite?",
    "a": [
      "Großer Abendsegler (Fledermaus)",
      "Glattnatter (Schlingnatter)",
      "Rote Waldameise",
      "Wolf"
    ],
    "exp": "Großer Abendsegler (Fledermaus) (Nyctalus noctula): Im Spätsommer hört man aus den Spechthöhlen alter Kiefern oft das laute, metallische Zirpen der balzenden Abendsegler."
  },
  {
    "id": 405,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welche Lebensweise oder Spur verrät den Großer Abendsegler (Fledermaus) (Nyctalus noctula) rund um Schwarzenburg und Heideblick?",
    "a": [
      "fliegt oft schon kurz nach Sonnenuntergang im schnellen, schwalbenartigen Jagdflug",
      "versteckte Lebensweise; völlig ungiftige Würgeschlange",
      "errichtet bis zu 1,5 Meter hohe, kuppelförmige Nesthügel aus Kiefernnadeln und Harzklümpchen",
      "legt auf nächtlichen Streifzügen problemlos 30 bis 50 km im geschnürten Trab zurück"
    ],
    "exp": "Beim Großer Abendsegler (Fledermaus) beobachtet man: fliegt oft schon kurz nach Sonnenuntergang im schnellen, schwalbenartigen Jagdflug. Im Spätsommer hört man aus den Spechthöhlen alter Kiefern oft das laute, metallische Zirpen der balzenden Abendsegler."
  },
  {
    "id": 406,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Großer Abendsegler (Fledermaus)“ in Wald, Heide und Waldgarten?",
    "a": [
      "Maikäfer, Mistkäfer, Schnaken und Nachtfalter im freien Luftraum",
      "vor allem Zaun- und Waldeidechsen, Blindschleichen und junge Mäuse",
      "forstschädliche Schmetterlingsraupen, Blattwespenlarven sowie süßer Honigtau von Rindenläusen",
      "überwiegend Rehwild, Rotwild und Wildschweine sowie gelegentlich Hasen"
    ],
    "exp": "Der Großer Abendsegler (Fledermaus) (Nyctalus noctula) ernährt sich von: Maikäfer, Mistkäfer, Schnaken und Nachtfalter im freien Luftraum."
  },
  {
    "id": 407,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Großer Abendsegler (Fledermaus) besonders wohl?",
    "a": [
      "jagt hoch über Baumkronen, Lichtungen und Seen; Quartier in alten Spechthöhlen der Kiefern",
      "trockene, sonnenexponierte Sandheiden, Kiefernwaldränder und Steinhaufen",
      "sonnige Kiefern- und Mischwaldränder rund um Schwarzenburg",
      "ausgedehnte Wälder, Heiden und Bergbaufolgelandschaften der Niederlausitz"
    ],
    "exp": "Typischer Lebensraum für Großer Abendsegler (Fledermaus): jagt hoch über Baumkronen, Lichtungen und Seen; Quartier in alten Spechthöhlen der Kiefern. Im Spätsommer hört man aus den Spechthöhlen alter Kiefern oft das laute, metallische Zirpen der balzenden Abendsegler."
  },
  {
    "id": 408,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Im Spätsommer hört man aus den Spechthöhlen alter Kiefern oft das laute, metallische Zirpen der balzenden Abendsegler.“?",
    "a": [
      "Großer Abendsegler (Fledermaus)",
      "Glattnatter (Schlingnatter)",
      "Rote Waldameise",
      "Wolf"
    ],
    "exp": "Großer Abendsegler (Fledermaus) (Nyctalus noctula) – eine der größten heimischen Fledermäuse mit rostbraunem, glatt anliegendem Fell und bis zu 40 cm Spannweite."
  },
  {
    "id": 409,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Nyctalus noctula“?",
    "a": [
      "Großer Abendsegler (Fledermaus)",
      "Glattnatter (Schlingnatter)",
      "Rote Waldameise",
      "Wolf"
    ],
    "exp": "Hinter Nyctalus noctula verbirgt sich der Großer Abendsegler (Fledermaus). Im Spätsommer hört man aus den Spechthöhlen alter Kiefern oft das laute, metallische Zirpen der balzenden Abendsegler."
  },
  {
    "id": 410,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: passt mit nur 4–6 Gramm Gewicht und zusammengefaltetem Körper in eine Streichholzschachtel?",
    "a": [
      "Zwergfledermaus",
      "Moorfrosch",
      "Ameisenlöwe (Ameisenjungfer)",
      "Rotfuchs"
    ],
    "exp": "Zwergfledermaus (Pipistrellus pipistrellus): Eine einzige Zwergfledermaus vertilgt in einer Sommernacht bis zu 3.000 Mücken – der beste natürliche Mückenschutz im Waldgarten!"
  },
  {
    "id": 411,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Zwergfledermaus (Pipistrellus pipistrellus) rund um Schwarzenburg und Heideblick?",
    "a": [
      "fliegt in rasanten Kurven rund um Hoflichter, Obstbäume und Hecken",
      "wandert im zeitigen Frühjahr (März/April) zu den Laichgewässern",
      "die Larve sitzt rückwärts eingegraben am Grund eines selbst gebauten, 3–5 cm breiten Sandtrichters",
      "vor allem dämmerungs- und nachtaktiv; charakteristischer „Mäusesprung“ mit allen vier Pfoten von oben"
    ],
    "exp": "Beim Zwergfledermaus beobachtet man: fliegt in rasanten Kurven rund um Hoflichter, Obstbäume und Hecken. Eine einzige Zwergfledermaus vertilgt in einer Sommernacht bis zu 3.000 Mücken – der beste natürliche Mückenschutz im Waldgarten!"
  },
  {
    "id": 412,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Zwergfledermaus“ in Wald, Heide und Waldgarten?",
    "a": [
      "tausende Stechmücken, Zuckmücken und kleine Nachtfalter pro Nacht",
      "Insekten, Spinnen, Asseln und kleine Schnecken",
      "Ameisen und kleine Spinnen, die in den Sandtrichter rutschen",
      "Feldmäuse, Regenwürmer, Fallobst, Waldbeeren (Heidelbeeren!), Käfer und Aas"
    ],
    "exp": "Der Zwergfledermaus (Pipistrellus pipistrellus) ernährt sich von: tausende Stechmücken, Zuckmücken und kleine Nachtfalter pro Nacht."
  },
  {
    "id": 413,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Zwergfledermaus besonders wohl?",
    "a": [
      "Dörfer, Höfe, Waldgärten und Waldränder in Schwarzenburg",
      "Erlenbrüche, Niedermoore (wie Borcheltsbusch) und Waldweiher bei Heideblick",
      "trockener, feiner und regengeschützter Sand unter Kiefernwurzeln und Dachüberständen in Schwarzenburg",
      "Wälder, Wiesenränder, Felder und Dorfränder rund um Schwarzenburg"
    ],
    "exp": "Typischer Lebensraum für Zwergfledermaus: Dörfer, Höfe, Waldgärten und Waldränder in Schwarzenburg. Eine einzige Zwergfledermaus vertilgt in einer Sommernacht bis zu 3.000 Mücken – der beste natürliche Mückenschutz im Waldgarten!"
  },
  {
    "id": 414,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Eine einzige Zwergfledermaus vertilgt in einer Sommernacht bis zu 3.000 Mücken – der beste natürliche Mückenschutz im Waldgarten!“?",
    "a": [
      "Zwergfledermaus",
      "Moorfrosch",
      "Ameisenlöwe (Ameisenjungfer)",
      "Rotfuchs"
    ],
    "exp": "Zwergfledermaus (Pipistrellus pipistrellus) – passt mit nur 4–6 Gramm Gewicht und zusammengefaltetem Körper in eine Streichholzschachtel."
  },
  {
    "id": 415,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Pipistrellus pipistrellus“?",
    "a": [
      "Zwergfledermaus",
      "Moorfrosch",
      "Ameisenlöwe (Ameisenjungfer)",
      "Rotfuchs"
    ],
    "exp": "Hinter Pipistrellus pipistrellus verbirgt sich der Zwergfledermaus. Eine einzige Zwergfledermaus vertilgt in einer Sommernacht bis zu 3.000 Mücken – der beste natürliche Mückenschutz im Waldgarten!"
  },
  {
    "id": 416,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: zur Paarungszeit im Mai/Juni leuchten die Flanken der Männchen kräftig smaragdgrün?",
    "a": [
      "Zauneidechse",
      "Europäischer Laubfrosch",
      "Blauflügelige Ödlandschrecke",
      "Dachs (Meister Grimbart)"
    ],
    "exp": "Zauneidechse (Lacerta agilis): Die trocken-warmen Sandböden des Niederlausitzer Landrückens bieten der streng geschützten Zauneidechse ideale Eiablageplätze."
  },
  {
    "id": 417,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Zauneidechse (Lacerta agilis) rund um Schwarzenburg und Heideblick?",
    "a": [
      "wechselwarm: tankt morgens auf warmen Steinen oder Kiefernstämmen Sonne",
      "klettert mit Haftscheiben an Finger- und Zehenspitzen mühelos an glatten Blättern und Halmen",
      "am Boden durch sandgraue Tarnfarbe unsichtbar; fliegt erst im letzten Moment vor den Schuhen des Wanderers auf",
      "streng nachtaktiv; legt große, über Generationen genutzte unterirdische Höhlensysteme („Dachsburg“) mit bis zu 20 Röhren an"
    ],
    "exp": "Beim Zauneidechse beobachtet man: wechselwarm: tankt morgens auf warmen Steinen oder Kiefernstämmen Sonne. Die trocken-warmen Sandböden des Niederlausitzer Landrückens bieten der streng geschützten Zauneidechse ideale Eiablageplätze."
  },
  {
    "id": 418,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Zauneidechse“ in Wald, Heide und Waldgarten?",
    "a": [
      "Heuschrecken, Spinnen, Käfer, Raupen und Zikaden",
      "Fliegen, Mücken, Käfer und Spinnen im Gebüsch",
      "trockene Gräser, kleine Heidekräuter und Moose",
      "Regenwürmer, Fallobst, Beeren, Schnecken, Käferlarven und Pilze"
    ],
    "exp": "Der Zauneidechse (Lacerta agilis) ernährt sich von: Heuschrecken, Spinnen, Käfer, Raupen und Zikaden."
  },
  {
    "id": 419,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Zauneidechse besonders wohl?",
    "a": [
      "sonnige Waldränder, Sandheiden, Bahndämme und Totholzhaufen rund um Heideblick",
      "sonnige Weiher mit Schilf und angrenzenden Brombeerhecken am Waldrand",
      "offene Sandwege, Heideflächen und sonnige Kiefernlichtungen rund um Schwarzenburg",
      "ruhige Waldhänge und Endmoränenkuppen im Kiefern- und Mischwald"
    ],
    "exp": "Typischer Lebensraum für Zauneidechse: sonnige Waldränder, Sandheiden, Bahndämme und Totholzhaufen rund um Heideblick. Die trocken-warmen Sandböden des Niederlausitzer Landrückens bieten der streng geschützten Zauneidechse ideale Eiablageplätze."
  },
  {
    "id": 420,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Die trocken-warmen Sandböden des Niederlausitzer Landrückens bieten der streng geschützten Zauneidechse ideale Eiablageplätze.“?",
    "a": [
      "Zauneidechse",
      "Europäischer Laubfrosch",
      "Blauflügelige Ödlandschrecke",
      "Dachs (Meister Grimbart)"
    ],
    "exp": "Zauneidechse (Lacerta agilis) – zur Paarungszeit im Mai/Juni leuchten die Flanken der Männchen kräftig smaragdgrün."
  },
  {
    "id": 421,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Lacerta agilis“?",
    "a": [
      "Zauneidechse",
      "Europäischer Laubfrosch",
      "Blauflügelige Ödlandschrecke",
      "Dachs (Meister Grimbart)"
    ],
    "exp": "Hinter Lacerta agilis verbirgt sich der Zauneidechse. Die trocken-warmen Sandböden des Niederlausitzer Landrückens bieten der streng geschützten Zauneidechse ideale Eiablageplätze."
  },
  {
    "id": 422,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: bringt im Spätsommer keine ungeschützten Eier, sondern lebende, in einer dünnen Eihaut schlüpfende Jungtiere zur Welt („lebendgebärend“)?",
    "a": [
      "Waldeidechse (Bergeidechse)",
      "Knoblauchkröte",
      "Schwalbenschwanz",
      "Baummarder (Edelmarder)"
    ],
    "exp": "Waldeidechse (Bergeidechse) (Zootoca vivipara): Durch diese Anpassung kommt sie selbst in kühlen Waldschatten- und Moorlagen hervorragend zurecht."
  },
  {
    "id": 423,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Waldeidechse (Bergeidechse) (Zootoca vivipara) rund um Schwarzenburg und Heideblick?",
    "a": [
      "sonnt sich gern auf umgestürzten Baumstämmen und Wurzelstöcken",
      "streng nachtaktiv; gräbt sich tagsüber mit scharfkantigen „Grabschwielen“ an den Hinterfüßen rückwärts bis zu 50 cm tief in den Sand ein",
      "fliegt in zwei Generationen von Mai bis August im eleganten Segelflug",
      "klettert geschickt bis in die Baumkronen und springt bis zu 4 Meter weit von Kiefer zu Kiefer"
    ],
    "exp": "Beim Waldeidechse (Bergeidechse) beobachtet man: sonnt sich gern auf umgestürzten Baumstämmen und Wurzelstöcken. Durch diese Anpassung kommt sie selbst in kühlen Waldschatten- und Moorlagen hervorragend zurecht."
  },
  {
    "id": 424,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Waldeidechse (Bergeidechse)“ in Wald, Heide und Waldgarten?",
    "a": [
      "Spinnen, Ameisen, kleine Heuschrecken und Fliegen",
      "Laufkäfer, Grillen, Spinnen und Regenwürmer",
      "Falter saugen Nektar an Disteln, Klee und Flieder; die grün-schwarz-orange geringelten Raupen fressen Wilde Möhre, Dill und Fenchel",
      "Kleinsäuger, Vögel, Eichhörnchen, Insekten, Waldhonig und im Herbst Ebereschen- und Heidelbeeren"
    ],
    "exp": "Der Waldeidechse (Bergeidechse) (Zootoca vivipara) ernährt sich von: Spinnen, Ameisen, kleine Heuschrecken und Fliegen."
  },
  {
    "id": 425,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Waldeidechse (Bergeidechse) besonders wohl?",
    "a": [
      "lichte Kiefernwälder, Heidekrautflächen, Moorränder und Holzstapel",
      "lockere, sandige Böden der Niederlausitzer Heide und Äcker nahe Kleingewässern",
      "blütenreiche Wiesen, Waldgärten und sonnige Waldränder in Heideblick",
      "geschlossene, strukturreiche Kiefern- und Mischwälder rund um Schwarzenburg"
    ],
    "exp": "Typischer Lebensraum für Waldeidechse (Bergeidechse): lichte Kiefernwälder, Heidekrautflächen, Moorränder und Holzstapel. Durch diese Anpassung kommt sie selbst in kühlen Waldschatten- und Moorlagen hervorragend zurecht."
  },
  {
    "id": 426,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Durch diese Anpassung kommt sie selbst in kühlen Waldschatten- und Moorlagen hervorragend zurecht.“?",
    "a": [
      "Waldeidechse (Bergeidechse)",
      "Knoblauchkröte",
      "Schwalbenschwanz",
      "Baummarder (Edelmarder)"
    ],
    "exp": "Waldeidechse (Bergeidechse) (Zootoca vivipara) – bringt im Spätsommer keine ungeschützten Eier, sondern lebende, in einer dünnen Eihaut schlüpfende Jungtiere zur Welt („lebendgebärend“)."
  },
  {
    "id": 427,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Zootoca vivipara“?",
    "a": [
      "Waldeidechse (Bergeidechse)",
      "Knoblauchkröte",
      "Schwalbenschwanz",
      "Baummarder (Edelmarder)"
    ],
    "exp": "Hinter Zootoca vivipara verbirgt sich der Waldeidechse (Bergeidechse). Durch diese Anpassung kommt sie selbst in kühlen Waldschatten- und Moorlagen hervorragend zurecht."
  },
  {
    "id": 428,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: trotz ihres schlangenartigen Aussehens ist sie keine Schlange, sondern eine völlig harmlose, beinlose Echse?",
    "a": [
      "Blindschleiche",
      "Erdkröte",
      "Rothirsch",
      "Steinmarder (Hausmarder)"
    ],
    "exp": "Blindschleiche (Anguis fragilis): Wie Eidechsen besitzt die kupferglänzende Blindschleiche bewegliche Augenlider (kann zwinkern!) und kann bei Gefahr den Schwanz abwerfen."
  },
  {
    "id": 429,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Blindschleiche (Anguis fragilis) rund um Schwarzenburg und Heideblick?",
    "a": [
      "dämmerungsaktiv und nach warmen Sommerregen unterwegs",
      "dämmerungs- und nachtaktiv; wandert im März bei mildem Regenwetter zielstrebig zu ihrem Geburtsgewässer",
      "dämmerungs- und nachtaktiv; kräftige Schalenabdrücke (Trittsiegel) von 7–9 cm Länge im Waldsand",
      "nachtaktiv rund um Höfe und Gärten"
    ],
    "exp": "Beim Blindschleiche beobachtet man: dämmerungsaktiv und nach warmen Sommerregen unterwegs. Wie Eidechsen besitzt die kupferglänzende Blindschleiche bewegliche Augenlider (kann zwinkern!) und kann bei Gefahr den Schwanz abwerfen."
  },
  {
    "id": 430,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Blindschleiche“ in Wald, Heide und Waldgarten?",
    "a": [
      "Nacktschnecken, Regenwürmer und glatte Raupen",
      "Nacktschnecken, Käfer, Asseln und Regenwürmer",
      "Gräser, Heidekraut, Eicheln, Kiefernrinde, Knospen und Waldkräuter",
      "Mäuse, Ratten, Insekten, Fallobst, Kirschen und Hühnereier"
    ],
    "exp": "Der Blindschleiche (Anguis fragilis) ernährt sich von: Nacktschnecken, Regenwürmer und glatte Raupen."
  },
  {
    "id": 431,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Blindschleiche besonders wohl?",
    "a": [
      "feuchte Waldränder, Komposthaufen, hohes Gras und naturnahe Waldgärten",
      "Wälder, Waldgärten, Kellerabgänge und Teiche rund um Schwarzenburg",
      "die großen, zusammenhängenden Kiefernwälder und Lichtungen rund um Schwarzenburg",
      "Dörfer, alte Scheunen, Holzstapel und Waldränder"
    ],
    "exp": "Typischer Lebensraum für Blindschleiche: feuchte Waldränder, Komposthaufen, hohes Gras und naturnahe Waldgärten. Wie Eidechsen besitzt die kupferglänzende Blindschleiche bewegliche Augenlider (kann zwinkern!) und kann bei Gefahr den Schwanz abwerfen."
  },
  {
    "id": 432,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Wie Eidechsen besitzt die kupferglänzende Blindschleiche bewegliche Augenlider (kann zwinkern!) und kann bei Gefahr den Schwanz abwerfen.“?",
    "a": [
      "Blindschleiche",
      "Erdkröte",
      "Rothirsch",
      "Steinmarder (Hausmarder)"
    ],
    "exp": "Blindschleiche (Anguis fragilis) – trotz ihres schlangenartigen Aussehens ist sie keine Schlange, sondern eine völlig harmlose, beinlose Echse."
  },
  {
    "id": 433,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Anguis fragilis“?",
    "a": [
      "Blindschleiche",
      "Erdkröte",
      "Rothirsch",
      "Steinmarder (Hausmarder)"
    ],
    "exp": "Hinter Anguis fragilis verbirgt sich der Blindschleiche. Wie Eidechsen besitzt die kupferglänzende Blindschleiche bewegliche Augenlider (kann zwinkern!) und kann bei Gefahr den Schwanz abwerfen."
  },
  {
    "id": 434,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: unverwechselbar an den zwei gelben oder cremeweißen halbmondförmigen Nackenflecken („Krönchen“) hinter dem Kopf?",
    "a": [
      "Ringelnatter",
      "Hirschkäfer",
      "Reh (Rehwild)",
      "Waschbär"
    ],
    "exp": "Ringelnatter (Natrix natrix): Wird sie überrascht, zischt sie laut oder stellt sich im äußersten Notfall mit geöffnetem Maul und heraushängender Zunge tot."
  },
  {
    "id": 435,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Ringelnatter (Natrix natrix) rund um Schwarzenburg und Heideblick?",
    "a": [
      "ausgezeichnete Schwimmerin; völlig ungiftig und für den Menschen harmlos",
      "die erwachsenen Käfer fliegen an warmen Juni- und Juliabenden brummend in aufrechter Haltung um die Baumkronen",
      "vor allem in der Morgen- und Abenddämmerung aktiv; kleine herzförmige Schalenabdrücke (4–5 cm)",
      "nachtaktiv; hinterlässt im feuchten Ufersand Abdrücke, die winzigen Kinderhänden ähneln"
    ],
    "exp": "Beim Ringelnatter beobachtet man: ausgezeichnete Schwimmerin; völlig ungiftig und für den Menschen harmlos. Wird sie überrascht, zischt sie laut oder stellt sich im äußersten Notfall mit geöffnetem Maul und heraushängender Zunge tot."
  },
  {
    "id": 436,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Ringelnatter“ in Wald, Heide und Waldgarten?",
    "a": [
      "Frösche, Kröten, Molche und kleine Fische",
      "erwachsene Käfer lecken austretenden, gärenden Eichenbaumsaft; die Larven leben von morschem Eichenwurzelholz",
      "selektiver „Konzentratselektierer“: zarte Kräuter, Knospen, Brombeerblätter, Eicheln und Pilze",
      "Allesfresser: Nüsse, Obst, Eicheln, Schnecken, Frösche, Krebse und Insekten"
    ],
    "exp": "Der Ringelnatter (Natrix natrix) ernährt sich von: Frösche, Kröten, Molche und kleine Fische."
  },
  {
    "id": 437,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Ringelnatter besonders wohl?",
    "a": [
      "Teiche, Gräben, Feuchtwiesen und kompostreiche Waldgärten",
      "alte Eichenbestände und Totholzinseln in den Wäldern Südbrandenburgs",
      "Waldränder, Waldlichtungen, Gärten und Wiesen um Schwarzenburg",
      "gewässernahe Wälder, alte Baumhöhlen und Dorfränder in Brandenburg"
    ],
    "exp": "Typischer Lebensraum für Ringelnatter: Teiche, Gräben, Feuchtwiesen und kompostreiche Waldgärten. Wird sie überrascht, zischt sie laut oder stellt sich im äußersten Notfall mit geöffnetem Maul und heraushängender Zunge tot."
  },
  {
    "id": 438,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Wird sie überrascht, zischt sie laut oder stellt sich im äußersten Notfall mit geöffnetem Maul und heraushängender Zunge tot.“?",
    "a": [
      "Ringelnatter",
      "Hirschkäfer",
      "Reh (Rehwild)",
      "Waschbär"
    ],
    "exp": "Ringelnatter (Natrix natrix) – unverwechselbar an den zwei gelben oder cremeweißen halbmondförmigen Nackenflecken („Krönchen“) hinter dem Kopf."
  },
  {
    "id": 439,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Natrix natrix“?",
    "a": [
      "Ringelnatter",
      "Hirschkäfer",
      "Reh (Rehwild)",
      "Waschbär"
    ],
    "exp": "Hinter Natrix natrix verbirgt sich der Ringelnatter. Wird sie überrascht, zischt sie laut oder stellt sich im äußersten Notfall mit geöffnetem Maul und heraushängender Zunge tot."
  },
  {
    "id": 440,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: deutlich abgesetztes dunkles Zickzackband („Kreuzband“) auf dem Rücken und senkrecht geschlitzte Pupillen?",
    "a": [
      "Kreuzotter",
      "Großer Eichenbock (Heldbock)",
      "Wildschwein (Schwarzwild)",
      "Marderhund (Enok)"
    ],
    "exp": "Kreuzotter (Vipera berus): Die sehr scheue Schlange flieht bei Erschütterung durch Schritte sofort ins Heidekraut; ihre Bisse sind meist trockene Abwehrbisse."
  },
  {
    "id": 441,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Kreuzotter (Vipera berus) rund um Schwarzenburg und Heideblick?",
    "a": [
      "tagaktiv, sonnt sich früh am Morgen auf Bulten oder Baumstümpfen",
      "dämmerungsaktiv im Hochsommer",
      "meist dämmerungs- und nachtaktiv; im Trittsiegel sind neben den Hauptschalen stets die beiden seitlichen „Afterklauen“ sichtbar",
      "rein nachtaktiv und extrem heimlich"
    ],
    "exp": "Beim Kreuzotter beobachtet man: tagaktiv, sonnt sich früh am Morgen auf Bulten oder Baumstümpfen. Die sehr scheue Schlange flieht bei Erschütterung durch Schritte sofort ins Heidekraut; ihre Bisse sind meist trockene Abwehrbisse."
  },
  {
    "id": 442,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Kreuzotter“ in Wald, Heide und Waldgarten?",
    "a": [
      "Waldmäuse, Waldeidechsen und Moorfrösche",
      "Baumsaft und reifes Obst; die Larven nagen daumendicke Gänge im alten Eichenholz",
      "Allesfresser: Eicheln, Bucheckern, Wurzeln, Engerlinge, Pilze, Regenwürmer und Feldfrüchte",
      "Frösche, Schnecken, Mäuse, Insekten, Beeren, Eicheln und Aas"
    ],
    "exp": "Der Kreuzotter (Vipera berus) ernährt sich von: Waldmäuse, Waldeidechsen und Moorfrösche."
  },
  {
    "id": 443,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Kreuzotter besonders wohl?",
    "a": [
      "ungestörte Moorränder, feuchte Heiden und sonnige Kiefernwaldlichtungen",
      "alte, besonnte Eichen an Waldrändern und Alleen der Niederlausitz",
      "Kiefern- und Mischwälder mit Suhlen sowie angrenzende Wiesen und Felder",
      "feuchte Wälder, Schilfgebiete und Niederungen der Lausitz"
    ],
    "exp": "Typischer Lebensraum für Kreuzotter: ungestörte Moorränder, feuchte Heiden und sonnige Kiefernwaldlichtungen. Die sehr scheue Schlange flieht bei Erschütterung durch Schritte sofort ins Heidekraut; ihre Bisse sind meist trockene Abwehrbisse."
  },
  {
    "id": 444,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Die sehr scheue Schlange flieht bei Erschütterung durch Schritte sofort ins Heidekraut; ihre Bisse sind meist trockene Abwehrbisse.“?",
    "a": [
      "Kreuzotter",
      "Großer Eichenbock (Heldbock)",
      "Wildschwein (Schwarzwild)",
      "Marderhund (Enok)"
    ],
    "exp": "Kreuzotter (Vipera berus) – deutlich abgesetztes dunkles Zickzackband („Kreuzband“) auf dem Rücken und senkrecht geschlitzte Pupillen."
  },
  {
    "id": 445,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Vipera berus“?",
    "a": [
      "Kreuzotter",
      "Großer Eichenbock (Heldbock)",
      "Wildschwein (Schwarzwild)",
      "Marderhund (Enok)"
    ],
    "exp": "Hinter Vipera berus verbirgt sich der Kreuzotter. Die sehr scheue Schlange flieht bei Erschütterung durch Schritte sofort ins Heidekraut; ihre Bisse sind meist trockene Abwehrbisse."
  },
  {
    "id": 446,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: runde Pupillen, dunkler Streifen vom Nasenloch über das Auge und zwei Reihen dunkler Flecken statt eines scharfen Zickzackbands?",
    "a": [
      "Glattnatter (Schlingnatter)",
      "Rote Waldameise",
      "Wolf",
      "Eichhörnchen"
    ],
    "exp": "Glattnatter (Schlingnatter) (Coronella austriaca): Wegen ihrer Rückenzeichnung wird die harmlose Schlingnatter leider oft mit der Kreuzotter verwechselt."
  },
  {
    "id": 447,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welche Lebensweise oder Spur verrät den Glattnatter (Schlingnatter) (Coronella austriaca) rund um Schwarzenburg und Heideblick?",
    "a": [
      "versteckte Lebensweise; völlig ungiftige Würgeschlange",
      "errichtet bis zu 1,5 Meter hohe, kuppelförmige Nesthügel aus Kiefernnadeln und Harzklümpchen",
      "legt auf nächtlichen Streifzügen problemlos 30 bis 50 km im geschnürten Trab zurück",
      "tagaktiv; baut hoch in den Bäumen kugelige Nester („Kobel“) aus Zweigen und Moos"
    ],
    "exp": "Beim Glattnatter (Schlingnatter) beobachtet man: versteckte Lebensweise; völlig ungiftige Würgeschlange. Wegen ihrer Rückenzeichnung wird die harmlose Schlingnatter leider oft mit der Kreuzotter verwechselt."
  },
  {
    "id": 448,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Glattnatter (Schlingnatter)“ in Wald, Heide und Waldgarten?",
    "a": [
      "vor allem Zaun- und Waldeidechsen, Blindschleichen und junge Mäuse",
      "forstschädliche Schmetterlingsraupen, Blattwespenlarven sowie süßer Honigtau von Rindenläusen",
      "überwiegend Rehwild, Rotwild und Wildschweine sowie gelegentlich Hasen",
      "Kiefernsamen aus Zapfen, Eicheln, Haselnüsse, Pilze, Knospen und Beeren"
    ],
    "exp": "Der Glattnatter (Schlingnatter) (Coronella austriaca) ernährt sich von: vor allem Zaun- und Waldeidechsen, Blindschleichen und junge Mäuse."
  },
  {
    "id": 449,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Glattnatter (Schlingnatter) besonders wohl?",
    "a": [
      "trockene, sonnenexponierte Sandheiden, Kiefernwaldränder und Steinhaufen",
      "sonnige Kiefern- und Mischwaldränder rund um Schwarzenburg",
      "ausgedehnte Wälder, Heiden und Bergbaufolgelandschaften der Niederlausitz",
      "Kiefern- und Mischwälder sowie baumreiche Waldgärten in Schwarzenburg"
    ],
    "exp": "Typischer Lebensraum für Glattnatter (Schlingnatter): trockene, sonnenexponierte Sandheiden, Kiefernwaldränder und Steinhaufen. Wegen ihrer Rückenzeichnung wird die harmlose Schlingnatter leider oft mit der Kreuzotter verwechselt."
  },
  {
    "id": 450,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Wegen ihrer Rückenzeichnung wird die harmlose Schlingnatter leider oft mit der Kreuzotter verwechselt.“?",
    "a": [
      "Glattnatter (Schlingnatter)",
      "Rote Waldameise",
      "Wolf",
      "Eichhörnchen"
    ],
    "exp": "Glattnatter (Schlingnatter) (Coronella austriaca) – runde Pupillen, dunkler Streifen vom Nasenloch über das Auge und zwei Reihen dunkler Flecken statt eines scharfen Zickzackbands."
  },
  {
    "id": 451,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Coronella austriaca“?",
    "a": [
      "Glattnatter (Schlingnatter)",
      "Rote Waldameise",
      "Wolf",
      "Eichhörnchen"
    ],
    "exp": "Hinter Coronella austriaca verbirgt sich der Glattnatter (Schlingnatter). Wegen ihrer Rückenzeichnung wird die harmlose Schlingnatter leider oft mit der Kreuzotter verwechselt."
  },
  {
    "id": 452,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: für wenige Tage während der Laichzeit im Frühjahr färben sich die Männchen im Moorwasser leuchtend himmelblau!?",
    "a": [
      "Moorfrosch",
      "Ameisenlöwe (Ameisenjungfer)",
      "Rotfuchs",
      "Feldhase"
    ],
    "exp": "Moorfrosch (Rana arvalis): Dieses spektakuläre „Blauwerden“ der Moorfrosch-Männchen dauert oft nur drei bis fünf sonnige Frühlingstage."
  },
  {
    "id": 453,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Moorfrosch (Rana arvalis) rund um Schwarzenburg und Heideblick?",
    "a": [
      "wandert im zeitigen Frühjahr (März/April) zu den Laichgewässern",
      "die Larve sitzt rückwärts eingegraben am Grund eines selbst gebauten, 3–5 cm breiten Sandtrichters",
      "vor allem dämmerungs- und nachtaktiv; charakteristischer „Mäusesprung“ mit allen vier Pfoten von oben",
      "ruht tagsüber flach gedrückt in einer flachen Erdmulde („Sasse“) und hoppelt abends zur Äsung"
    ],
    "exp": "Beim Moorfrosch beobachtet man: wandert im zeitigen Frühjahr (März/April) zu den Laichgewässern. Dieses spektakuläre „Blauwerden“ der Moorfrosch-Männchen dauert oft nur drei bis fünf sonnige Frühlingstage."
  },
  {
    "id": 454,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Moorfrosch“ in Wald, Heide und Waldgarten?",
    "a": [
      "Insekten, Spinnen, Asseln und kleine Schnecken",
      "Ameisen und kleine Spinnen, die in den Sandtrichter rutschen",
      "Feldmäuse, Regenwürmer, Fallobst, Waldbeeren (Heidelbeeren!), Käfer und Aas",
      "Wildkräuter, Klee, Gräser, Feldfrüchte und im Winter Rinde und Knospen"
    ],
    "exp": "Der Moorfrosch (Rana arvalis) ernährt sich von: Insekten, Spinnen, Asseln und kleine Schnecken."
  },
  {
    "id": 455,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Moorfrosch besonders wohl?",
    "a": [
      "Erlenbrüche, Niedermoore (wie Borcheltsbusch) und Waldweiher bei Heideblick",
      "trockener, feiner und regengeschützter Sand unter Kiefernwurzeln und Dachüberständen in Schwarzenburg",
      "Wälder, Wiesenränder, Felder und Dorfränder rund um Schwarzenburg",
      "Wiesen, Felder, Heiden und lichte Waldränder rund um Heideblick"
    ],
    "exp": "Typischer Lebensraum für Moorfrosch: Erlenbrüche, Niedermoore (wie Borcheltsbusch) und Waldweiher bei Heideblick. Dieses spektakuläre „Blauwerden“ der Moorfrosch-Männchen dauert oft nur drei bis fünf sonnige Frühlingstage."
  },
  {
    "id": 456,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Dieses spektakuläre „Blauwerden“ der Moorfrosch-Männchen dauert oft nur drei bis fünf sonnige Frühlingstage.“?",
    "a": [
      "Moorfrosch",
      "Ameisenlöwe (Ameisenjungfer)",
      "Rotfuchs",
      "Feldhase"
    ],
    "exp": "Moorfrosch (Rana arvalis) – für wenige Tage während der Laichzeit im Frühjahr färben sich die Männchen im Moorwasser leuchtend himmelblau!."
  },
  {
    "id": 457,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Rana arvalis“?",
    "a": [
      "Moorfrosch",
      "Ameisenlöwe (Ameisenjungfer)",
      "Rotfuchs",
      "Feldhase"
    ],
    "exp": "Hinter Rana arvalis verbirgt sich der Moorfrosch. Dieses spektakuläre „Blauwerden“ der Moorfrosch-Männchen dauert oft nur drei bis fünf sonnige Frühlingstage."
  },
  {
    "id": 458,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: blattgrüne Oberseite mit schwarzem Flankenstreif; Männchen besitzen eine große gelbliche Schallblase an der Kehle?",
    "a": [
      "Europäischer Laubfrosch",
      "Blauflügelige Ödlandschrecke",
      "Dachs (Meister Grimbart)",
      "Braunbrustigel"
    ],
    "exp": "Europäischer Laubfrosch (Hyla arborea): In warmen Frühsommernächten ist das laute, rhythmische „Äpp-äpp-äpp“ der Laubfrosch-Chöre über hunderte Meter zu hören."
  },
  {
    "id": 459,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Europäischer Laubfrosch (Hyla arborea) rund um Schwarzenburg und Heideblick?",
    "a": [
      "klettert mit Haftscheiben an Finger- und Zehenspitzen mühelos an glatten Blättern und Halmen",
      "am Boden durch sandgraue Tarnfarbe unsichtbar; fliegt erst im letzten Moment vor den Schuhen des Wanderers auf",
      "streng nachtaktiv; legt große, über Generationen genutzte unterirdische Höhlensysteme („Dachsburg“) mit bis zu 20 Röhren an",
      "dämmerungs- und nachtaktiv; hält von November bis April echten Winterschlaf im trockenen Laubhaufen"
    ],
    "exp": "Beim Europäischer Laubfrosch beobachtet man: klettert mit Haftscheiben an Finger- und Zehenspitzen mühelos an glatten Blättern und Halmen. In warmen Frühsommernächten ist das laute, rhythmische „Äpp-äpp-äpp“ der Laubfrosch-Chöre über hunderte Meter zu hören."
  },
  {
    "id": 460,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Europäischer Laubfrosch“ in Wald, Heide und Waldgarten?",
    "a": [
      "Fliegen, Mücken, Käfer und Spinnen im Gebüsch",
      "trockene Gräser, kleine Heidekräuter und Moose",
      "Regenwürmer, Fallobst, Beeren, Schnecken, Käferlarven und Pilze",
      "Laufkäfer, Raupen, Regenwürmer, Ohrwürmer und Schnecken"
    ],
    "exp": "Der Europäischer Laubfrosch (Hyla arborea) ernährt sich von: Fliegen, Mücken, Käfer und Spinnen im Gebüsch."
  },
  {
    "id": 461,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Europäischer Laubfrosch besonders wohl?",
    "a": [
      "sonnige Weiher mit Schilf und angrenzenden Brombeerhecken am Waldrand",
      "offene Sandwege, Heideflächen und sonnige Kiefernlichtungen rund um Schwarzenburg",
      "ruhige Waldhänge und Endmoränenkuppen im Kiefern- und Mischwald",
      "strukturreiche Waldgärten, Hecken, Reisighaufen und Dorfränder"
    ],
    "exp": "Typischer Lebensraum für Europäischer Laubfrosch: sonnige Weiher mit Schilf und angrenzenden Brombeerhecken am Waldrand. In warmen Frühsommernächten ist das laute, rhythmische „Äpp-äpp-äpp“ der Laubfrosch-Chöre über hunderte Meter zu hören."
  },
  {
    "id": 462,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „In warmen Frühsommernächten ist das laute, rhythmische „Äpp-äpp-äpp“ der Laubfrosch-Chöre über hunderte Meter zu hören.“?",
    "a": [
      "Europäischer Laubfrosch",
      "Blauflügelige Ödlandschrecke",
      "Dachs (Meister Grimbart)",
      "Braunbrustigel"
    ],
    "exp": "Europäischer Laubfrosch (Hyla arborea) – blattgrüne Oberseite mit schwarzem Flankenstreif; Männchen besitzen eine große gelbliche Schallblase an der Kehle."
  },
  {
    "id": 463,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Hyla arborea“?",
    "a": [
      "Europäischer Laubfrosch",
      "Blauflügelige Ödlandschrecke",
      "Dachs (Meister Grimbart)",
      "Braunbrustigel"
    ],
    "exp": "Hinter Hyla arborea verbirgt sich der Europäischer Laubfrosch. In warmen Frühsommernächten ist das laute, rhythmische „Äpp-äpp-äpp“ der Laubfrosch-Chöre über hunderte Meter zu hören."
  },
  {
    "id": 464,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: senkrecht geschlitzte („katzenartige“) Pupillen und bei starkem Stress ein leichter Knoblauchgeruch des Hautsekrets?",
    "a": [
      "Knoblauchkröte",
      "Schwalbenschwanz",
      "Baummarder (Edelmarder)",
      "Elbebiber"
    ],
    "exp": "Knoblauchkröte (Pelobates fuscus): Ihre Kaulquappen sind Riesen unter den heimischen Froschlurchen und können über 12 cm lang werden."
  },
  {
    "id": 465,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welche Lebensweise oder Spur verrät den Knoblauchkröte (Pelobates fuscus) rund um Schwarzenburg und Heideblick?",
    "a": [
      "streng nachtaktiv; gräbt sich tagsüber mit scharfkantigen „Grabschwielen“ an den Hinterfüßen rückwärts bis zu 50 cm tief in den Sand ein",
      "fliegt in zwei Generationen von Mai bis August im eleganten Segelflug",
      "klettert geschickt bis in die Baumkronen und springt bis zu 4 Meter weit von Kiefer zu Kiefer",
      "dämmerungs- und nachtaktiv; fällt Weiden und Birken mit seinen durch Eiseneinlagerungen orange gefärbten Nagezähnen"
    ],
    "exp": "Beim Knoblauchkröte beobachtet man: streng nachtaktiv; gräbt sich tagsüber mit scharfkantigen „Grabschwielen“ an den Hinterfüßen rückwärts bis zu 50 cm tief in den Sand ein. Ihre Kaulquappen sind Riesen unter den heimischen Froschlurchen und können über 12 cm lang werden."
  },
  {
    "id": 466,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Knoblauchkröte“ in Wald, Heide und Waldgarten?",
    "a": [
      "Laufkäfer, Grillen, Spinnen und Regenwürmer",
      "Falter saugen Nektar an Disteln, Klee und Flieder; die grün-schwarz-orange geringelten Raupen fressen Wilde Möhre, Dill und Fenchel",
      "Kleinsäuger, Vögel, Eichhörnchen, Insekten, Waldhonig und im Herbst Ebereschen- und Heidelbeeren",
      "reiner Pflanzenfresser: im Sommer Kräuter und Wasserpflanzen, im Winter Rinde und Zweige von Weichhölzern"
    ],
    "exp": "Der Knoblauchkröte (Pelobates fuscus) ernährt sich von: Laufkäfer, Grillen, Spinnen und Regenwürmer."
  },
  {
    "id": 467,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Knoblauchkröte besonders wohl?",
    "a": [
      "lockere, sandige Böden der Niederlausitzer Heide und Äcker nahe Kleingewässern",
      "blütenreiche Wiesen, Waldgärten und sonnige Waldränder in Heideblick",
      "geschlossene, strukturreiche Kiefern- und Mischwälder rund um Schwarzenburg",
      "Fließgewässer wie Berste und Kleine Elster sowie Waldgräben und Teiche der Region"
    ],
    "exp": "Typischer Lebensraum für Knoblauchkröte: lockere, sandige Böden der Niederlausitzer Heide und Äcker nahe Kleingewässern. Ihre Kaulquappen sind Riesen unter den heimischen Froschlurchen und können über 12 cm lang werden."
  },
  {
    "id": 468,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Ihre Kaulquappen sind Riesen unter den heimischen Froschlurchen und können über 12 cm lang werden.“?",
    "a": [
      "Knoblauchkröte",
      "Schwalbenschwanz",
      "Baummarder (Edelmarder)",
      "Elbebiber"
    ],
    "exp": "Knoblauchkröte (Pelobates fuscus) – senkrecht geschlitzte („katzenartige“) Pupillen und bei starkem Stress ein leichter Knoblauchgeruch des Hautsekrets."
  },
  {
    "id": 469,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Pelobates fuscus“?",
    "a": [
      "Knoblauchkröte",
      "Schwalbenschwanz",
      "Baummarder (Edelmarder)",
      "Elbebiber"
    ],
    "exp": "Hinter Pelobates fuscus verbirgt sich der Knoblauchkröte. Ihre Kaulquappen sind Riesen unter den heimischen Froschlurchen und können über 12 cm lang werden."
  },
  {
    "id": 470,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: warzige Haut, kupferfarbene Augen mit waagerechter Pupille; legt ihren Laich in meterlangen, doppelreihigen Schnüren ab?",
    "a": [
      "Erdkröte",
      "Rothirsch",
      "Steinmarder (Hausmarder)",
      "Fischotter"
    ],
    "exp": "Erdkröte (Bufo bufo): Im Waldgarten ist die gemütliche Erdkröte eine treue Helferin, die Nacht für Nacht zahlreiche Schnecken vertilgt."
  },
  {
    "id": 471,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Erdkröte (Bufo bufo) rund um Schwarzenburg und Heideblick?",
    "a": [
      "dämmerungs- und nachtaktiv; wandert im März bei mildem Regenwetter zielstrebig zu ihrem Geburtsgewässer",
      "dämmerungs- und nachtaktiv; kräftige Schalenabdrücke (Trittsiegel) von 7–9 cm Länge im Waldsand",
      "nachtaktiv rund um Höfe und Gärten",
      "überwiegend nachtaktiv; hervorragender Schwimmer und Taucher mit Schwimmhäuten zwischen den Zehen"
    ],
    "exp": "Beim Erdkröte beobachtet man: dämmerungs- und nachtaktiv; wandert im März bei mildem Regenwetter zielstrebig zu ihrem Geburtsgewässer. Im Waldgarten ist die gemütliche Erdkröte eine treue Helferin, die Nacht für Nacht zahlreiche Schnecken vertilgt."
  },
  {
    "id": 472,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Erdkröte“ in Wald, Heide und Waldgarten?",
    "a": [
      "Nacktschnecken, Käfer, Asseln und Regenwürmer",
      "Gräser, Heidekraut, Eicheln, Kiefernrinde, Knospen und Waldkräuter",
      "Mäuse, Ratten, Insekten, Fallobst, Kirschen und Hühnereier",
      "Fische, Flusskrebse, Frösche und Wasservögel"
    ],
    "exp": "Der Erdkröte (Bufo bufo) ernährt sich von: Nacktschnecken, Käfer, Asseln und Regenwürmer."
  },
  {
    "id": 473,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Erdkröte besonders wohl?",
    "a": [
      "Wälder, Waldgärten, Kellerabgänge und Teiche rund um Schwarzenburg",
      "die großen, zusammenhängenden Kiefernwälder und Lichtungen rund um Schwarzenburg",
      "Dörfer, alte Scheunen, Holzstapel und Waldränder",
      "Flüsse, Bäche, Kanäle und fischreiche Teiche zwischen Heideblick und Spreewald"
    ],
    "exp": "Typischer Lebensraum für Erdkröte: Wälder, Waldgärten, Kellerabgänge und Teiche rund um Schwarzenburg. Im Waldgarten ist die gemütliche Erdkröte eine treue Helferin, die Nacht für Nacht zahlreiche Schnecken vertilgt."
  },
  {
    "id": 474,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Im Waldgarten ist die gemütliche Erdkröte eine treue Helferin, die Nacht für Nacht zahlreiche Schnecken vertilgt.“?",
    "a": [
      "Erdkröte",
      "Rothirsch",
      "Steinmarder (Hausmarder)",
      "Fischotter"
    ],
    "exp": "Erdkröte (Bufo bufo) – warzige Haut, kupferfarbene Augen mit waagerechter Pupille; legt ihren Laich in meterlangen, doppelreihigen Schnüren ab."
  },
  {
    "id": 475,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Bufo bufo“?",
    "a": [
      "Erdkröte",
      "Rothirsch",
      "Steinmarder (Hausmarder)",
      "Fischotter"
    ],
    "exp": "Hinter Bufo bufo verbirgt sich der Erdkröte. Im Waldgarten ist die gemütliche Erdkröte eine treue Helferin, die Nacht für Nacht zahlreiche Schnecken vertilgt."
  },
  {
    "id": 476,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: größter heimischer Käfer (bis 8 cm); die Männchen tragen gewaltige, geweihartig vergrößerte Oberkiefer („Schröter“)?",
    "a": [
      "Hirschkäfer",
      "Reh (Rehwild)",
      "Waschbär",
      "Hermelin (Großes Wiesel)"
    ],
    "exp": "Hirschkäfer (Lucanus cervus): Die Larve entwickelt sich 5 bis 8 Jahre lang im morschen Holz im Boden, während der fertige Käfer nur wenige Sommerwochen lebt."
  },
  {
    "id": 477,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Hirschkäfer (Lucanus cervus) rund um Schwarzenburg und Heideblick?",
    "a": [
      "die erwachsenen Käfer fliegen an warmen Juni- und Juliabenden brummend in aufrechter Haltung um die Baumkronen",
      "vor allem in der Morgen- und Abenddämmerung aktiv; kleine herzförmige Schalenabdrücke (4–5 cm)",
      "nachtaktiv; hinterlässt im feuchten Ufersand Abdrücke, die winzigen Kinderhänden ähneln",
      "tag- und nachtaktiv; richtet sich zur Orientierung oft kerzengerade („Männchen machend“) im Gras auf"
    ],
    "exp": "Beim Hirschkäfer beobachtet man: die erwachsenen Käfer fliegen an warmen Juni- und Juliabenden brummend in aufrechter Haltung um die Baumkronen. Die Larve entwickelt sich 5 bis 8 Jahre lang im morschen Holz im Boden, während der fertige Käfer nur wenige Sommerwochen lebt."
  },
  {
    "id": 478,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Hirschkäfer“ in Wald, Heide und Waldgarten?",
    "a": [
      "erwachsene Käfer lecken austretenden, gärenden Eichenbaumsaft; die Larven leben von morschem Eichenwurzelholz",
      "selektiver „Konzentratselektierer“: zarte Kräuter, Knospen, Brombeerblätter, Eicheln und Pilze",
      "Allesfresser: Nüsse, Obst, Eicheln, Schnecken, Frösche, Krebse und Insekten",
      "Wühlmäuse, Feldmäuse und Kleinvögel"
    ],
    "exp": "Der Hirschkäfer (Lucanus cervus) ernährt sich von: erwachsene Käfer lecken austretenden, gärenden Eichenbaumsaft; die Larven leben von morschem Eichenwurzelholz."
  },
  {
    "id": 479,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Hirschkäfer besonders wohl?",
    "a": [
      "alte Eichenbestände und Totholzinseln in den Wäldern Südbrandenburgs",
      "Waldränder, Waldlichtungen, Gärten und Wiesen um Schwarzenburg",
      "gewässernahe Wälder, alte Baumhöhlen und Dorfränder in Brandenburg",
      "Waldränder, Hecken, Stein- und Holzstapel sowie Wiesen"
    ],
    "exp": "Typischer Lebensraum für Hirschkäfer: alte Eichenbestände und Totholzinseln in den Wäldern Südbrandenburgs. Die Larve entwickelt sich 5 bis 8 Jahre lang im morschen Holz im Boden, während der fertige Käfer nur wenige Sommerwochen lebt."
  },
  {
    "id": 480,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Die Larve entwickelt sich 5 bis 8 Jahre lang im morschen Holz im Boden, während der fertige Käfer nur wenige Sommerwochen lebt.“?",
    "a": [
      "Hirschkäfer",
      "Reh (Rehwild)",
      "Waschbär",
      "Hermelin (Großes Wiesel)"
    ],
    "exp": "Hirschkäfer (Lucanus cervus) – größter heimischer Käfer (bis 8 cm); die Männchen tragen gewaltige, geweihartig vergrößerte Oberkiefer („Schröter“)."
  },
  {
    "id": 481,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Lucanus cervus“?",
    "a": [
      "Hirschkäfer",
      "Reh (Rehwild)",
      "Waschbär",
      "Hermelin (Großes Wiesel)"
    ],
    "exp": "Hinter Lucanus cervus verbirgt sich der Hirschkäfer. Die Larve entwickelt sich 5 bis 8 Jahre lang im morschen Holz im Boden, während der fertige Käfer nur wenige Sommerwochen lebt."
  },
  {
    "id": 482,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: bis zu 5,5 cm langer Körper mit noch längeren, knotig gegliederten Fühlern (beim Männchen bis 10 cm lang)?",
    "a": [
      "Großer Eichenbock (Heldbock)",
      "Wildschwein (Schwarzwild)",
      "Marderhund (Enok)",
      "Mauswiesel"
    ],
    "exp": "Großer Eichenbock (Heldbock) (Cerambyx cerdo): In den FFH-Schutzgebieten Brandenburgs zählt der streng geschützte Heldbock zu den wertvollsten Urwald-Reliktarten."
  },
  {
    "id": 483,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welche Lebensweise oder Spur verrät den Großer Eichenbock (Heldbock) (Cerambyx cerdo) rund um Schwarzenburg und Heideblick?",
    "a": [
      "dämmerungsaktiv im Hochsommer",
      "meist dämmerungs- und nachtaktiv; im Trittsiegel sind neben den Hauptschalen stets die beiden seitlichen „Afterklauen“ sichtbar",
      "rein nachtaktiv und extrem heimlich",
      "extrem flinker Jäger, der Mäusen direkt bis in ihre engen unterirdischen Erdgänge folgt"
    ],
    "exp": "Beim Großer Eichenbock (Heldbock) beobachtet man: dämmerungsaktiv im Hochsommer. In den FFH-Schutzgebieten Brandenburgs zählt der streng geschützte Heldbock zu den wertvollsten Urwald-Reliktarten."
  },
  {
    "id": 484,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Großer Eichenbock (Heldbock)“ in Wald, Heide und Waldgarten?",
    "a": [
      "Baumsaft und reifes Obst; die Larven nagen daumendicke Gänge im alten Eichenholz",
      "Allesfresser: Eicheln, Bucheckern, Wurzeln, Engerlinge, Pilze, Regenwürmer und Feldfrüchte",
      "Frösche, Schnecken, Mäuse, Insekten, Beeren, Eicheln und Aas",
      "fast ausschließlich Feld- und Waldmäuse"
    ],
    "exp": "Der Großer Eichenbock (Heldbock) (Cerambyx cerdo) ernährt sich von: Baumsaft und reifes Obst; die Larven nagen daumendicke Gänge im alten Eichenholz."
  },
  {
    "id": 485,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Großer Eichenbock (Heldbock) besonders wohl?",
    "a": [
      "alte, besonnte Eichen an Waldrändern und Alleen der Niederlausitz",
      "Kiefern- und Mischwälder mit Suhlen sowie angrenzende Wiesen und Felder",
      "feuchte Wälder, Schilfgebiete und Niederungen der Lausitz",
      "Wiesen, Waldränder, Trockenmauern und Holzhaufen in Gärten"
    ],
    "exp": "Typischer Lebensraum für Großer Eichenbock (Heldbock): alte, besonnte Eichen an Waldrändern und Alleen der Niederlausitz. In den FFH-Schutzgebieten Brandenburgs zählt der streng geschützte Heldbock zu den wertvollsten Urwald-Reliktarten."
  },
  {
    "id": 486,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „In den FFH-Schutzgebieten Brandenburgs zählt der streng geschützte Heldbock zu den wertvollsten Urwald-Reliktarten.“?",
    "a": [
      "Großer Eichenbock (Heldbock)",
      "Wildschwein (Schwarzwild)",
      "Marderhund (Enok)",
      "Mauswiesel"
    ],
    "exp": "Großer Eichenbock (Heldbock) (Cerambyx cerdo) – bis zu 5,5 cm langer Körper mit noch längeren, knotig gegliederten Fühlern (beim Männchen bis 10 cm lang)."
  },
  {
    "id": 487,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Cerambyx cerdo“?",
    "a": [
      "Großer Eichenbock (Heldbock)",
      "Wildschwein (Schwarzwild)",
      "Marderhund (Enok)",
      "Mauswiesel"
    ],
    "exp": "Hinter Cerambyx cerdo verbirgt sich der Großer Eichenbock (Heldbock). In den FFH-Schutzgebieten Brandenburgs zählt der streng geschützte Heldbock zu den wertvollsten Urwald-Reliktarten."
  },
  {
    "id": 488,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: klimatisiert ihren Bau durch Öffnen und Schließen der Eingänge konstant auf rund 25–29 Grad Celsius?",
    "a": [
      "Rote Waldameise",
      "Wolf",
      "Eichhörnchen",
      "Siebenschläfer"
    ],
    "exp": "Rote Waldameise (Formica rufa / polyctena): Ein einziger großer Ameisenhügel vertilgt pro Sommer mehrere Millionen Schadinsekten und schützt so den Kiefernwald; er steht unter strengem Naturschutz."
  },
  {
    "id": 489,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Rote Waldameise (Formica rufa / polyctena) rund um Schwarzenburg und Heideblick?",
    "a": [
      "errichtet bis zu 1,5 Meter hohe, kuppelförmige Nesthügel aus Kiefernnadeln und Harzklümpchen",
      "legt auf nächtlichen Streifzügen problemlos 30 bis 50 km im geschnürten Trab zurück",
      "tagaktiv; baut hoch in den Bäumen kugelige Nester („Kobel“) aus Zweigen und Moos",
      "nachtaktiver Kletterkünstler mit buschigem grauem Schwanz und großen dunklen Knopfaugen"
    ],
    "exp": "Beim Rote Waldameise beobachtet man: errichtet bis zu 1,5 Meter hohe, kuppelförmige Nesthügel aus Kiefernnadeln und Harzklümpchen. Ein einziger großer Ameisenhügel vertilgt pro Sommer mehrere Millionen Schadinsekten und schützt so den Kiefernwald; er steht unter strengem Naturschutz."
  },
  {
    "id": 490,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Rote Waldameise“ in Wald, Heide und Waldgarten?",
    "a": [
      "forstschädliche Schmetterlingsraupen, Blattwespenlarven sowie süßer Honigtau von Rindenläusen",
      "überwiegend Rehwild, Rotwild und Wildschweine sowie gelegentlich Hasen",
      "Kiefernsamen aus Zapfen, Eicheln, Haselnüsse, Pilze, Knospen und Beeren",
      "Bucheckern, Eicheln, Obst, Nüsse, Knospen und Pilze"
    ],
    "exp": "Der Rote Waldameise (Formica rufa / polyctena) ernährt sich von: forstschädliche Schmetterlingsraupen, Blattwespenlarven sowie süßer Honigtau von Rindenläusen."
  },
  {
    "id": 491,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Rote Waldameise besonders wohl?",
    "a": [
      "sonnige Kiefern- und Mischwaldränder rund um Schwarzenburg",
      "ausgedehnte Wälder, Heiden und Bergbaufolgelandschaften der Niederlausitz",
      "Kiefern- und Mischwälder sowie baumreiche Waldgärten in Schwarzenburg",
      "alte Laub- und Mischwälder, Obstgärten, Nistkästen und Dachböden am Waldrand"
    ],
    "exp": "Typischer Lebensraum für Rote Waldameise: sonnige Kiefern- und Mischwaldränder rund um Schwarzenburg. Ein einziger großer Ameisenhügel vertilgt pro Sommer mehrere Millionen Schadinsekten und schützt so den Kiefernwald; er steht unter strengem Naturschutz."
  },
  {
    "id": 492,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Ein einziger großer Ameisenhügel vertilgt pro Sommer mehrere Millionen Schadinsekten und schützt so den Kiefernwald; er steht unter strengem Naturschutz.“?",
    "a": [
      "Rote Waldameise",
      "Wolf",
      "Eichhörnchen",
      "Siebenschläfer"
    ],
    "exp": "Rote Waldameise (Formica rufa / polyctena) – klimatisiert ihren Bau durch Öffnen und Schließen der Eingänge konstant auf rund 25–29 Grad Celsius."
  },
  {
    "id": 493,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Formica rufa / polyctena“?",
    "a": [
      "Rote Waldameise",
      "Wolf",
      "Eichhörnchen",
      "Siebenschläfer"
    ],
    "exp": "Hinter Formica rufa / polyctena verbirgt sich der Rote Waldameise. Ein einziger großer Ameisenhügel vertilgt pro Sommer mehrere Millionen Schadinsekten und schützt so den Kiefernwald; er steht unter strengem Naturschutz."
  },
  {
    "id": 494,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: schleudert mit dem Kopf gezielt Sandkörner auf fliehende Ameisen, bis diese zu den kräftigen Saugzangen hinabrutschen?",
    "a": [
      "Ameisenlöwe (Ameisenjungfer)",
      "Rotfuchs",
      "Feldhase",
      "Haselmaus"
    ],
    "exp": "Ameisenlöwe (Ameisenjungfer) (Myrmeleon formicarius): Aus dem räuberischen „Ameisenlöwen“ im Sand entwickelt sich nach der Verpuppung ein zartes, libellenähnliches Fluginsekt: die Ameisenjungfer."
  },
  {
    "id": 495,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Ameisenlöwe (Ameisenjungfer) (Myrmeleon formicarius) rund um Schwarzenburg und Heideblick?",
    "a": [
      "die Larve sitzt rückwärts eingegraben am Grund eines selbst gebauten, 3–5 cm breiten Sandtrichters",
      "vor allem dämmerungs- und nachtaktiv; charakteristischer „Mäusesprung“ mit allen vier Pfoten von oben",
      "ruht tagsüber flach gedrückt in einer flachen Erdmulde („Sasse“) und hoppelt abends zur Äsung",
      "klettert nachts mit Hilfe ihres Greifschwanzes geschickt durch das Gezweig, ohne den Boden zu berühren"
    ],
    "exp": "Beim Ameisenlöwe (Ameisenjungfer) beobachtet man: die Larve sitzt rückwärts eingegraben am Grund eines selbst gebauten, 3–5 cm breiten Sandtrichters. Aus dem räuberischen „Ameisenlöwen“ im Sand entwickelt sich nach der Verpuppung ein zartes, libellenähnliches Fluginsekt: die Ameisenjungfer."
  },
  {
    "id": 496,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Ameisenlöwe (Ameisenjungfer)“ in Wald, Heide und Waldgarten?",
    "a": [
      "Ameisen und kleine Spinnen, die in den Sandtrichter rutschen",
      "Feldmäuse, Regenwürmer, Fallobst, Waldbeeren (Heidelbeeren!), Käfer und Aas",
      "Wildkräuter, Klee, Gräser, Feldfrüchte und im Winter Rinde und Knospen",
      "Haselnüsse, Brombeeren, Knospen, Blütenpollen und Insekten"
    ],
    "exp": "Der Ameisenlöwe (Ameisenjungfer) (Myrmeleon formicarius) ernährt sich von: Ameisen und kleine Spinnen, die in den Sandtrichter rutschen."
  },
  {
    "id": 497,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Ameisenlöwe (Ameisenjungfer) besonders wohl?",
    "a": [
      "trockener, feiner und regengeschützter Sand unter Kiefernwurzeln und Dachüberständen in Schwarzenburg",
      "Wälder, Wiesenränder, Felder und Dorfränder rund um Schwarzenburg",
      "Wiesen, Felder, Heiden und lichte Waldränder rund um Heideblick",
      "dichte Waldränder mit Hasel-, Brombeer- und Heckensträuchern"
    ],
    "exp": "Typischer Lebensraum für Ameisenlöwe (Ameisenjungfer): trockener, feiner und regengeschützter Sand unter Kiefernwurzeln und Dachüberständen in Schwarzenburg. Aus dem räuberischen „Ameisenlöwen“ im Sand entwickelt sich nach der Verpuppung ein zartes, libellenähnliches Fluginsekt: die Ameisenjungfer."
  },
  {
    "id": 498,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Aus dem räuberischen „Ameisenlöwen“ im Sand entwickelt sich nach der Verpuppung ein zartes, libellenähnliches Fluginsekt: die Ameisenjungfer.“?",
    "a": [
      "Ameisenlöwe (Ameisenjungfer)",
      "Rotfuchs",
      "Feldhase",
      "Haselmaus"
    ],
    "exp": "Ameisenlöwe (Ameisenjungfer) (Myrmeleon formicarius) – schleudert mit dem Kopf gezielt Sandkörner auf fliehende Ameisen, bis diese zu den kräftigen Saugzangen hinabrutschen."
  },
  {
    "id": 499,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Myrmeleon formicarius“?",
    "a": [
      "Ameisenlöwe (Ameisenjungfer)",
      "Rotfuchs",
      "Feldhase",
      "Haselmaus"
    ],
    "exp": "Hinter Myrmeleon formicarius verbirgt sich der Ameisenlöwe (Ameisenjungfer). Aus dem räuberischen „Ameisenlöwen“ im Sand entwickelt sich nach der Verpuppung ein zartes, libellenähnliches Fluginsekt: die Ameisenjungfer."
  },
  {
    "id": 500,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: beim Auffliegen blitzen überraschend leuchtend himmelblaue Hinterflügel mit schwarzer Binde auf, die beim Landen sofort wieder verschwinden?",
    "a": [
      "Blauflügelige Ödlandschrecke",
      "Dachs (Meister Grimbart)",
      "Braunbrustigel",
      "Braunes Langohr (Fledermaus)"
    ],
    "exp": "Blauflügelige Ödlandschrecke (Oedipoda caerulescens): Dieser „Überraschungseffekt“ verwirrt jagende Vögel, die am Boden vergeblich nach etwas Blauem suchen."
  },
  {
    "id": 501,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Blauflügelige Ödlandschrecke (Oedipoda caerulescens) rund um Schwarzenburg und Heideblick?",
    "a": [
      "am Boden durch sandgraue Tarnfarbe unsichtbar; fliegt erst im letzten Moment vor den Schuhen des Wanderers auf",
      "streng nachtaktiv; legt große, über Generationen genutzte unterirdische Höhlensysteme („Dachsburg“) mit bis zu 20 Röhren an",
      "dämmerungs- und nachtaktiv; hält von November bis April echten Winterschlaf im trockenen Laubhaufen",
      "jagt nachts im extrem wendigen Rüttel- und Langsamflug dicht am Laub und an Kiefernstämmen"
    ],
    "exp": "Beim Blauflügelige Ödlandschrecke beobachtet man: am Boden durch sandgraue Tarnfarbe unsichtbar; fliegt erst im letzten Moment vor den Schuhen des Wanderers auf. Dieser „Überraschungseffekt“ verwirrt jagende Vögel, die am Boden vergeblich nach etwas Blauem suchen."
  },
  {
    "id": 502,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Blauflügelige Ödlandschrecke“ in Wald, Heide und Waldgarten?",
    "a": [
      "trockene Gräser, kleine Heidekräuter und Moose",
      "Regenwürmer, Fallobst, Beeren, Schnecken, Käferlarven und Pilze",
      "Laufkäfer, Raupen, Regenwürmer, Ohrwürmer und Schnecken",
      "Nachtfalter (Eulenfalter), Spinnen und Raupen, die es direkt von Blättern und Rinde abliest"
    ],
    "exp": "Der Blauflügelige Ödlandschrecke (Oedipoda caerulescens) ernährt sich von: trockene Gräser, kleine Heidekräuter und Moose."
  },
  {
    "id": 503,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Blauflügelige Ödlandschrecke besonders wohl?",
    "a": [
      "offene Sandwege, Heideflächen und sonnige Kiefernlichtungen rund um Schwarzenburg",
      "ruhige Waldhänge und Endmoränenkuppen im Kiefern- und Mischwald",
      "strukturreiche Waldgärten, Hecken, Reisighaufen und Dorfränder",
      "strukturreiche Kiefern- und Mischwälder, Baumhöhlen, Nistkästen und alte Scheunen"
    ],
    "exp": "Typischer Lebensraum für Blauflügelige Ödlandschrecke: offene Sandwege, Heideflächen und sonnige Kiefernlichtungen rund um Schwarzenburg. Dieser „Überraschungseffekt“ verwirrt jagende Vögel, die am Boden vergeblich nach etwas Blauem suchen."
  },
  {
    "id": 504,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Dieser „Überraschungseffekt“ verwirrt jagende Vögel, die am Boden vergeblich nach etwas Blauem suchen.“?",
    "a": [
      "Blauflügelige Ödlandschrecke",
      "Dachs (Meister Grimbart)",
      "Braunbrustigel",
      "Braunes Langohr (Fledermaus)"
    ],
    "exp": "Blauflügelige Ödlandschrecke (Oedipoda caerulescens) – beim Auffliegen blitzen überraschend leuchtend himmelblaue Hinterflügel mit schwarzer Binde auf, die beim Landen sofort wieder verschwinden."
  },
  {
    "id": 505,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Oedipoda caerulescens“?",
    "a": [
      "Blauflügelige Ödlandschrecke",
      "Dachs (Meister Grimbart)",
      "Braunbrustigel",
      "Braunes Langohr (Fledermaus)"
    ],
    "exp": "Hinter Oedipoda caerulescens verbirgt sich der Blauflügelige Ödlandschrecke. Dieser „Überraschungseffekt“ verwirrt jagende Vögel, die am Boden vergeblich nach etwas Blauem suchen."
  },
  {
    "id": 506,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches Wildtier in den Wäldern und Gärten rund um Schwarzenburg zeichnet sich durch folgendes Merkmal aus: einer der größten und schönsten heimischen Tagfalter mit gelb-schwarzem Flügelmuster, blauen Randmonden und „Schwänzchen“?",
    "a": [
      "Schwalbenschwanz",
      "Baummarder (Edelmarder)",
      "Elbebiber",
      "Großer Abendsegler (Fledermaus)"
    ],
    "exp": "Schwalbenschwanz (Papilio machaon): Wer im Waldgarten etwas Dill, Fenchel oder Wilde Möhre stehen lässt, lädt die hübschen Raupen des Schwalbenschwanzes direkt ein."
  },
  {
    "id": 507,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Lebensweise oder Spur verrät den Schwalbenschwanz (Papilio machaon) rund um Schwarzenburg und Heideblick?",
    "a": [
      "fliegt in zwei Generationen von Mai bis August im eleganten Segelflug",
      "klettert geschickt bis in die Baumkronen und springt bis zu 4 Meter weit von Kiefer zu Kiefer",
      "dämmerungs- und nachtaktiv; fällt Weiden und Birken mit seinen durch Eiseneinlagerungen orange gefärbten Nagezähnen",
      "fliegt oft schon kurz nach Sonnenuntergang im schnellen, schwalbenartigen Jagdflug"
    ],
    "exp": "Beim Schwalbenschwanz beobachtet man: fliegt in zwei Generationen von Mai bis August im eleganten Segelflug. Wer im Waldgarten etwas Dill, Fenchel oder Wilde Möhre stehen lässt, lädt die hübschen Raupen des Schwalbenschwanzes direkt ein."
  },
  {
    "id": 508,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche Nahrung bevorzugt das heimische Wildtier „Schwalbenschwanz“ in Wald, Heide und Waldgarten?",
    "a": [
      "Falter saugen Nektar an Disteln, Klee und Flieder; die grün-schwarz-orange geringelten Raupen fressen Wilde Möhre, Dill und Fenchel",
      "Kleinsäuger, Vögel, Eichhörnchen, Insekten, Waldhonig und im Herbst Ebereschen- und Heidelbeeren",
      "reiner Pflanzenfresser: im Sommer Kräuter und Wasserpflanzen, im Winter Rinde und Zweige von Weichhölzern",
      "Maikäfer, Mistkäfer, Schnaken und Nachtfalter im freien Luftraum"
    ],
    "exp": "Der Schwalbenschwanz (Papilio machaon) ernährt sich von: Falter saugen Nektar an Disteln, Klee und Flieder; die grün-schwarz-orange geringelten Raupen fressen Wilde Möhre, Dill und Fenchel."
  },
  {
    "id": 509,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "In welchem Lebensraum rund um Schwarzenburg und im Naturpark Niederlausitzer Landrücken fühlt sich der Schwalbenschwanz besonders wohl?",
    "a": [
      "blütenreiche Wiesen, Waldgärten und sonnige Waldränder in Heideblick",
      "geschlossene, strukturreiche Kiefern- und Mischwälder rund um Schwarzenburg",
      "Fließgewässer wie Berste und Kleine Elster sowie Waldgräben und Teiche der Region",
      "jagt hoch über Baumkronen, Lichtungen und Seen; Quartier in alten Spechthöhlen der Kiefern"
    ],
    "exp": "Typischer Lebensraum für Schwalbenschwanz: blütenreiche Wiesen, Waldgärten und sonnige Waldränder in Heideblick. Wer im Waldgarten etwas Dill, Fenchel oder Wilde Möhre stehen lässt, lädt die hübschen Raupen des Schwalbenschwanzes direkt ein."
  },
  {
    "id": 510,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Auf welches Tier der Region Heideblick / Schwarzenburg bezieht sich dieser Naturhinweis: „Wer im Waldgarten etwas Dill, Fenchel oder Wilde Möhre stehen lässt, lädt die hübschen Raupen des Schwalbenschwanzes direkt ein.“?",
    "a": [
      "Schwalbenschwanz",
      "Baummarder (Edelmarder)",
      "Elbebiber",
      "Großer Abendsegler (Fledermaus)"
    ],
    "exp": "Schwalbenschwanz (Papilio machaon) – einer der größten und schönsten heimischen Tagfalter mit gelb-schwarzem Flügelmuster, blauen Randmonden und „Schwänzchen“."
  },
  {
    "id": 511,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches heimische Tier der Lausitzer Wälder und Heiden trägt den zoologischen Namen „Papilio machaon“?",
    "a": [
      "Schwalbenschwanz",
      "Baummarder (Edelmarder)",
      "Elbebiber",
      "Großer Abendsegler (Fledermaus)"
    ],
    "exp": "Hinter Papilio machaon verbirgt sich der Schwalbenschwanz. Wer im Waldgarten etwas Dill, Fenchel oder Wilde Möhre stehen lässt, lädt die hübschen Raupen des Schwalbenschwanzes direkt ein."
  },
  {
    "id": 512,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Was versteht man in der Jäger- und Naturkundesprache unter dem Begriff „Geäse“ beim Rothirsch und Reh rund um Schwarzenburg?",
    "a": [
      "Das Maul von Rot-, Dam- und Rehwild (davon abgeleitet: „äsen“ = fressen)",
      "Die Geweihspitzen des Platzhirsches",
      "Die Spur der Hinterläufe im feuchten Sand",
      "Den weißen Fleck am Hinterteil des Rehs"
    ],
    "exp": "Wenn Rehe und Hirsche auf den Waldlichtungen um Schwarzenburg Kräuter und Gräser fressen, nennt man dies „äsen“."
  },
  {
    "id": 513,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Wie nennt man die weißen Haare am Hinterteil des Rehs, die sich bei Gefahr zu einem großen weißen Herz („Tellerspiegel“) aufstellen?",
    "a": [
      "Den Spiegel",
      "Die Blume",
      "Die Lunte",
      "Das Gehörn"
    ],
    "exp": "Der leuchtend weiße „Spiegel“ dient abspringenden Rehen im dunklen Kiefernwald als optisches Warnsignal und Orientierungspunkt für die Kitze."
  },
  {
    "id": 514,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Warum darf man im Mai und Juni ein im hohen Gras oder am Waldrand scheinbar allein liegendes Rehkitz auf keinen Fall anfassen?",
    "a": [
      "Die Ricke (Mutter) ist in der Nähe und kommt nur zum Säugen; menschlicher Geruch am Kitz kann dazu führen, dass sie es verstößt",
      "Weil junge Rehkitze giftige Stacheln im Fell haben",
      "Weil Rehkitze erst ab August Milch trinken",
      "Weil das Kitz sonst sofort dem Spaziergänger nachläuft"
    ],
    "exp": "Junge Rehkitze haben in den ersten Lebenswochen fast keinen Eigengeruch und drücken sich bei Gefahr regungslos ins Gras – die Mutter beobachtet aus sicherer Distanz."
  },
  {
    "id": 515,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Woran erkennt man im Waldsand von Schwarzenburg sicher die Fährte (das Trittsiegel) eines Wildschweins im Unterschied zu Reh oder Rothirsch?",
    "a": [
      "Beim Wildschwein drücken sich hinter den beiden Hauptschalen fast immer auch die beiden seitlich abstehenden „Afterklauen“ deutlich ab",
      "Wildschweine haben kreisrunde Hufe wie ein Pferd",
      "Wildschweine hinterlassen fünf Zehen mit Krallen wie ein Dachs",
      "Wildschweine treten nur mit einem Fuß pro Seite auf"
    ],
    "exp": "Das breite, trapezförmige Trittsiegel mit den seitlich ausgestellten Afterklauen („Geäfter“) ist das sicherste Kennzeichen einer Wildschweinfährte."
  },
  {
    "id": 516,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Wie unterscheidet man die Pfotenabdrücke (Trittsiegel) eines Wolfes im märkischen Sand von denen eines mittelgroßen Hundes?",
    "a": [
      "Wolfsfährten sind länglich-oval mit eng geschlossenen Vorderzehen, schnurgeradem Schnürverlauf und einer klaren X-Form zwischen Ballen und Zehen",
      "Wolfspfoten haben sechs Zehen und runde Krallen",
      "Wölfe ziehen beim Laufen die Krallen wie eine Hauskatze komplett ein",
      "Wolfsabdrücke sind nur halb so groß wie die eines Dackels"
    ],
    "exp": "Zudem läuft ein zielstrebig ziehender Wolf im „geschnürten Trab“ über viele Kilometer schnurgerade, während Hunde meist im Zickzack stöbern."
  },
  {
    "id": 517,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Wie sollte man sich bei einer seltenen Begegnung mit einem Wolf auf einer Waldwanderung rund um Schwarzenburg richtig verhalten?",
    "a": [
      "Ruhig stehen bleiben, nicht weglaufen, auf sich aufmerksam machen (sprechen/klatschen) und langsam Abstand halten",
      "Auf den nächsten Kiefernstamm klettern und drei Stunden warten",
      "Dem Wolf ein Wurstbrot zuwerfen, um ihn anzufüttern",
      "So schnell wie möglich im Zickzack durch das Unterholz rennen"
    ],
    "exp": "Wölfe sind scheue Wildtiere: Ruhiges Stehenbleiben, deutliches Ansprechen und keinesfalls Anfüttern sind die wichtigsten Grundregeln im Wolfsgebiet."
  },
  {
    "id": 518,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welcher heimische Käfer in den Lausitzer Kiefernwäldern rollt mit seinen Hinterbeinen Dungkugeln über den Sandweg und legt darin seine Eier ab?",
    "a": [
      "Der Waldmistkäfer (Anoplotrupes stercorosus) bzw. Frühlingsmistkäfer",
      "Der Hirschkäfer",
      "Der Siebenpunkt-Marienkäfer",
      "Der Buchdrucker"
    ],
    "exp": "Der metallisch blauschwarz glänzende Waldmistkäfer ist die „Gesundheitspolizei“ des Waldes: Er vergräbt Wildlosung und Pilzreste im Boden und lockert die Walderde."
  },
  {
    "id": 519,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Warum schweben im Frühsommer an sonnigen Kiefernwaldrändern oft große schwarze Fliegen mit lang herabhängenden Hinterbeinen durch die Luft?",
    "a": [
      "Es sind harmlose Märzfliegen (Haarmücken), die im Frühjahr massenhaft schlüpfen und wichtige Nahrung für Singvögel sind",
      "Es sind tropische Stechmücken aus dem Spreewald",
      "Es sind junge Hornissenköniginnen auf Nestsuche",
      "Es sind fliegende Waldameisen beim Umzug"
    ],
    "exp": "Die schwarzen Haarmücken (Bibio marci) mit den im Flug lang herunterhängenden Beinen können weder stechen noch beißen und sind völlig harmlos."
  },
  {
    "id": 520,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welche friedliche Großwespe steht in Deutschland unter strengem Naturschutz, fängt Wespen sowie Schadinsekten und ist deutlich entspannter als die Deutsche Wespe?",
    "a": [
      "Die Europäische Hornisse (Vespa crabro)",
      "Die Gemeine Goldwespe",
      "Die Holzwespe",
      "Die Rosenblattwespe"
    ],
    "exp": "Hornissen interessieren sich nicht für süßen Kuchen oder Limonade auf der Terrasse, sondern jagen Insekten (darunter auch lästige Wespen und Bremsen) für ihre Brut."
  },
  {
    "id": 521,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches Spinnentier mit gelb-schwarz-weiß gestreiftem Hinterleib baut im Spätsommer im hohen Gras der Waldwiesen ein Radnetz mit einem weißen Zickzackband („Stabiliment“)?",
    "a": [
      "Die Wespenspinne (Argiope bruennichi)",
      "Die Wasserspinne",
      "Der Gemeine Holzbock",
      "Der Weberknecht"
    ],
    "exp": "Die völlig ungefährliche Wespenspinne ahmt mit ihrer gelb-schwarzen Warntracht eine Wespe nach und ernährt sich auf sonnigen Waldwiesen vor allem von Heuschrecken."
  },
  {
    "id": 522,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „dämmerungs- und nachtaktiv; kräftige Schalenabdrücke (Trittsiegel) von 7–9 cm Länge im Waldsand“?",
    "a": [
      "Rothirsch",
      "Rotfuchs",
      "Marderhund (Enok)",
      "Hermelin (Großes Wiesel)"
    ],
    "exp": "Rothirsch (Cervus elaphus): dämmerungs- und nachtaktiv; kräftige Schalenabdrücke (Trittsiegel) von 7–9 cm Länge im Waldsand. Von Ende August bis Ende September ist die Rothirschbrunft rund um Schwarzenburg das akustische Natur-Highlight des Jahres."
  },
  {
    "id": 523,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „vor allem in der Morgen- und Abenddämmerung aktiv; kleine herzförmige Schalenabdrücke (4–5 cm)“?",
    "a": [
      "Reh (Rehwild)",
      "Dachs (Meister Grimbart)",
      "Eichhörnchen",
      "Mauswiesel"
    ],
    "exp": "Reh (Rehwild) (Capreolus capreolus): vor allem in der Morgen- und Abenddämmerung aktiv; kleine herzförmige Schalenabdrücke (4–5 cm). Viele Gäste halten das Reh für die „Frau des Hirsches“, tatsächlich ist es aber unsere kleinste eigene Hirschart (Männchen = Rehbock, Weibchen = Ricke)."
  },
  {
    "id": 524,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „meist dämmerungs- und nachtaktiv; im Trittsiegel sind neben den Hauptschalen stets die beiden seitlichen „Afterklauen“ sichtbar“?",
    "a": [
      "Wildschwein (Schwarzwild)",
      "Baummarder (Edelmarder)",
      "Feldhase",
      "Siebenschläfer"
    ],
    "exp": "Wildschwein (Schwarzwild) (Sus scrofa): meist dämmerungs- und nachtaktiv; im Trittsiegel sind neben den Hauptschalen stets die beiden seitlichen „Afterklauen“ sichtbar. Durch das Umbrechen („Brechen“) des Waldbodens fördern Wildschweine die Naturverjüngung von Kiefern und Eichen; nach ihm ist auch das Gasthaus „Zum Wilden Eber“ benannt."
  },
  {
    "id": 525,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „legt auf nächtlichen Streifzügen problemlos 30 bis 50 km im geschnürten Trab zurück“?",
    "a": [
      "Wolf",
      "Steinmarder (Hausmarder)",
      "Braunbrustigel",
      "Haselmaus"
    ],
    "exp": "Wolf (Canis lupus): legt auf nächtlichen Streifzügen problemlos 30 bis 50 km im geschnürten Trab zurück. Seit dem Jahr 2000 ist die Lausitz das Kerngebiet der Rückkehr des Wolfes nach Deutschland; gesunde Wölfe meiden den Menschen."
  },
  {
    "id": 526,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „vor allem dämmerungs- und nachtaktiv; charakteristischer „Mäusesprung“ mit allen vier Pfoten von oben“?",
    "a": [
      "Rotfuchs",
      "Waschbär",
      "Elbebiber",
      "Braunes Langohr (Fledermaus)"
    ],
    "exp": "Rotfuchs (Vulpes vulpes): vor allem dämmerungs- und nachtaktiv; charakteristischer „Mäusesprung“ mit allen vier Pfoten von oben. Sein feines Gehör ortet das Quieken einer Maus selbst unter einer dichten Laub- oder Schneedecke zentimetergenau."
  },
  {
    "id": 527,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „streng nachtaktiv; legt große, über Generationen genutzte unterirdische Höhlensysteme („Dachsburg“) mit bis zu 20 Röhren an“?",
    "a": [
      "Dachs (Meister Grimbart)",
      "Marderhund (Enok)",
      "Fischotter",
      "Großer Abendsegler (Fledermaus)"
    ],
    "exp": "Dachs (Meister Grimbart) (Meles meles): streng nachtaktiv; legt große, über Generationen genutzte unterirdische Höhlensysteme („Dachsburg“) mit bis zu 20 Röhren an. Der reinliche Dachs polstert seinen Kessel regelmäßig mit frischem Moos und Farn aus und legt abseits des Baus eigene „Dachstoiletten“ an."
  },
  {
    "id": 528,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „klettert geschickt bis in die Baumkronen und springt bis zu 4 Meter weit von Kiefer zu Kiefer“?",
    "a": [
      "Baummarder (Edelmarder)",
      "Eichhörnchen",
      "Hermelin (Großes Wiesel)",
      "Zwergfledermaus"
    ],
    "exp": "Baummarder (Edelmarder) (Martes martes): klettert geschickt bis in die Baumkronen und springt bis zu 4 Meter weit von Kiefer zu Kiefer. Im Gegensatz zum Steinmarder meidet der scheue Baummarder Siedlungen und nutzt alte Schwarzspechthöhlen und Eichhörnchenkobel als Tagesversteck."
  },
  {
    "id": 529,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „nachtaktiv rund um Höfe und Gärten“?",
    "a": [
      "Steinmarder (Hausmarder)",
      "Feldhase",
      "Mauswiesel",
      "Zauneidechse"
    ],
    "exp": "Steinmarder (Hausmarder) (Martes foina): nachtaktiv rund um Höfe und Gärten. Er klettert mühelos an rauen Scheunenwänden empor und schläft tagsüber gern auf warmen Heuböden."
  },
  {
    "id": 530,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „nachtaktiv; hinterlässt im feuchten Ufersand Abdrücke, die winzigen Kinderhänden ähneln“?",
    "a": [
      "Waschbär",
      "Braunbrustigel",
      "Siebenschläfer",
      "Waldeidechse (Bergeidechse)"
    ],
    "exp": "Waschbär (Procyon lotor): nachtaktiv; hinterlässt im feuchten Ufersand Abdrücke, die winzigen Kinderhänden ähneln. Mit seinen hochempfindlichen Vorderpfoten ertastet („wäscht“) er unter Wasser und im Laub blind nach Nahrung."
  },
  {
    "id": 531,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „rein nachtaktiv und extrem heimlich“?",
    "a": [
      "Marderhund (Enok)",
      "Elbebiber",
      "Haselmaus",
      "Blindschleiche"
    ],
    "exp": "Marderhund (Enok) (Nyctereutes procyonoides): rein nachtaktiv und extrem heimlich. Trotz seines Namens und der waschbärähnlichen Gesichtsmaske ist der Marderhund ein echter Wildhund mit kurzen Beinen."
  },
  {
    "id": 532,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „tagaktiv; baut hoch in den Bäumen kugelige Nester („Kobel“) aus Zweigen und Moos“?",
    "a": [
      "Eichhörnchen",
      "Fischotter",
      "Braunes Langohr (Fledermaus)",
      "Ringelnatter"
    ],
    "exp": "Eichhörnchen (Sciurus vulgaris): tagaktiv; baut hoch in den Bäumen kugelige Nester („Kobel“) aus Zweigen und Moos. Beim Abnagen eines Kiefernzapfens lässt das Eichhörnchen am Ende eine ausgefranste Spindel mit einem kleinen Schopf an der Spitze übrig."
  },
  {
    "id": 533,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „ruht tagsüber flach gedrückt in einer flachen Erdmulde („Sasse“) und hoppelt abends zur Äsung“?",
    "a": [
      "Feldhase",
      "Hermelin (Großes Wiesel)",
      "Großer Abendsegler (Fledermaus)",
      "Kreuzotter"
    ],
    "exp": "Feldhase (Lepus europaeus): ruht tagsüber flach gedrückt in einer flachen Erdmulde („Sasse“) und hoppelt abends zur Äsung. Junge Feldhasen kommen bereits voll behaart und mit offenen Augen als „Nestflüchter“ zur Welt."
  },
  {
    "id": 534,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „dämmerungs- und nachtaktiv; hält von November bis April echten Winterschlaf im trockenen Laubhaufen“?",
    "a": [
      "Braunbrustigel",
      "Mauswiesel",
      "Zwergfledermaus",
      "Glattnatter (Schlingnatter)"
    ],
    "exp": "Braunbrustigel (Erinaceus europaeus): dämmerungs- und nachtaktiv; hält von November bis April echten Winterschlaf im trockenen Laubhaufen. Ein naturnaher Waldgarten mit Laub- und Totholzecken sowie Durchschlupfen im Zaun ist das beste Igel-Paradies."
  },
  {
    "id": 535,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „dämmerungs- und nachtaktiv; fällt Weiden und Birken mit seinen durch Eiseneinlagerungen orange gefärbten Nagezähnen“?",
    "a": [
      "Elbebiber",
      "Siebenschläfer",
      "Zauneidechse",
      "Moorfrosch"
    ],
    "exp": "Elbebiber (Castor fiber albicus): dämmerungs- und nachtaktiv; fällt Weiden und Birken mit seinen durch Eiseneinlagerungen orange gefärbten Nagezähnen. Als Landschaftsgestalter staut der Biber kleine Waldbäche an und schafft so wertvolle Feuchtbiotope für Kraniche, Eisvögel und Frösche."
  },
  {
    "id": 536,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „überwiegend nachtaktiv; hervorragender Schwimmer und Taucher mit Schwimmhäuten zwischen den Zehen“?",
    "a": [
      "Fischotter",
      "Haselmaus",
      "Waldeidechse (Bergeidechse)",
      "Europäischer Laubfrosch"
    ],
    "exp": "Fischotter (Lutra lutra): überwiegend nachtaktiv; hervorragender Schwimmer und Taucher mit Schwimmhäuten zwischen den Zehen. Die wasserreiche Niederlausitz gehört zu den wichtigsten Rückzugsräumen des streng geschützten Fischotters in Mitteleuropa."
  },
  {
    "id": 537,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „tag- und nachtaktiv; richtet sich zur Orientierung oft kerzengerade („Männchen machend“) im Gras auf“?",
    "a": [
      "Hermelin (Großes Wiesel)",
      "Braunes Langohr (Fledermaus)",
      "Blindschleiche",
      "Knoblauchkröte"
    ],
    "exp": "Hermelin (Großes Wiesel) (Mustela erminea): tag- und nachtaktiv; richtet sich zur Orientierung oft kerzengerade („Männchen machend“) im Gras auf. An dieser schwarzen Schwanzspitze lässt sich das Hermelin jederzeit sicher vom noch kleineren Mauswiesel unterscheiden."
  },
  {
    "id": 538,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „extrem flinker Jäger, der Mäusen direkt bis in ihre engen unterirdischen Erdgänge folgt“?",
    "a": [
      "Mauswiesel",
      "Großer Abendsegler (Fledermaus)",
      "Ringelnatter",
      "Erdkröte"
    ],
    "exp": "Mauswiesel (Mustela nivalis): extrem flinker Jäger, der Mäusen direkt bis in ihre engen unterirdischen Erdgänge folgt. Wegen seines hohen Stoffwechsels muss das Mauswiesel täglich etwa ein Drittel seines eigenen Körpergewichts fressen."
  },
  {
    "id": 539,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „nachtaktiver Kletterkünstler mit buschigem grauem Schwanz und großen dunklen Knopfaugen“?",
    "a": [
      "Siebenschläfer",
      "Zwergfledermaus",
      "Kreuzotter",
      "Hirschkäfer"
    ],
    "exp": "Siebenschläfer (Glis glis): nachtaktiver Kletterkünstler mit buschigem grauem Schwanz und großen dunklen Knopfaugen. Greift ein Beutegreifer nach seinem Schwanz, streift sich die Schwanzhaut an einer Sollbruchstelle ab, damit der Bilch entkommen kann."
  },
  {
    "id": 540,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „klettert nachts mit Hilfe ihres Greifschwanzes geschickt durch das Gezweig, ohne den Boden zu berühren“?",
    "a": [
      "Haselmaus",
      "Zauneidechse",
      "Glattnatter (Schlingnatter)",
      "Großer Eichenbock (Heldbock)"
    ],
    "exp": "Haselmaus (Muscardinus avellanarius): klettert nachts mit Hilfe ihres Greifschwanzes geschickt durch das Gezweig, ohne den Boden zu berühren. Ihre kreisrund in Haselnüsse genagten Öffnungen mit glattem Innenrand verraten ihre Anwesenheit im Herbst."
  },
  {
    "id": 541,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „jagt nachts im extrem wendigen Rüttel- und Langsamflug dicht am Laub und an Kiefernstämmen“?",
    "a": [
      "Braunes Langohr (Fledermaus)",
      "Waldeidechse (Bergeidechse)",
      "Moorfrosch",
      "Rote Waldameise"
    ],
    "exp": "Braunes Langohr (Fledermaus) (Plecotus auritus): jagt nachts im extrem wendigen Rüttel- und Langsamflug dicht am Laub und an Kiefernstämmen. Im Waldgarten findet man unter seinen Fraßplätzen oft kleine Häufchen abgebissener bunter Nachtfalterflügel."
  },
  {
    "id": 542,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „fliegt oft schon kurz nach Sonnenuntergang im schnellen, schwalbenartigen Jagdflug“?",
    "a": [
      "Großer Abendsegler (Fledermaus)",
      "Blindschleiche",
      "Europäischer Laubfrosch",
      "Ameisenlöwe (Ameisenjungfer)"
    ],
    "exp": "Großer Abendsegler (Fledermaus) (Nyctalus noctula): fliegt oft schon kurz nach Sonnenuntergang im schnellen, schwalbenartigen Jagdflug. Im Spätsommer hört man aus den Spechthöhlen alter Kiefern oft das laute, metallische Zirpen der balzenden Abendsegler."
  },
  {
    "id": 543,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „fliegt in rasanten Kurven rund um Hoflichter, Obstbäume und Hecken“?",
    "a": [
      "Zwergfledermaus",
      "Ringelnatter",
      "Knoblauchkröte",
      "Blauflügelige Ödlandschrecke"
    ],
    "exp": "Zwergfledermaus (Pipistrellus pipistrellus): fliegt in rasanten Kurven rund um Hoflichter, Obstbäume und Hecken. Eine einzige Zwergfledermaus vertilgt in einer Sommernacht bis zu 3.000 Mücken – der beste natürliche Mückenschutz im Waldgarten!"
  },
  {
    "id": 544,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „wechselwarm: tankt morgens auf warmen Steinen oder Kiefernstämmen Sonne“?",
    "a": [
      "Zauneidechse",
      "Kreuzotter",
      "Erdkröte",
      "Schwalbenschwanz"
    ],
    "exp": "Zauneidechse (Lacerta agilis): wechselwarm: tankt morgens auf warmen Steinen oder Kiefernstämmen Sonne. Die trocken-warmen Sandböden des Niederlausitzer Landrückens bieten der streng geschützten Zauneidechse ideale Eiablageplätze."
  },
  {
    "id": 545,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „sonnt sich gern auf umgestürzten Baumstämmen und Wurzelstöcken“?",
    "a": [
      "Waldeidechse (Bergeidechse)",
      "Glattnatter (Schlingnatter)",
      "Hirschkäfer",
      "Rothirsch"
    ],
    "exp": "Waldeidechse (Bergeidechse) (Zootoca vivipara): sonnt sich gern auf umgestürzten Baumstämmen und Wurzelstöcken. Durch diese Anpassung kommt sie selbst in kühlen Waldschatten- und Moorlagen hervorragend zurecht."
  },
  {
    "id": 546,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „dämmerungsaktiv und nach warmen Sommerregen unterwegs“?",
    "a": [
      "Blindschleiche",
      "Moorfrosch",
      "Großer Eichenbock (Heldbock)",
      "Reh (Rehwild)"
    ],
    "exp": "Blindschleiche (Anguis fragilis): dämmerungsaktiv und nach warmen Sommerregen unterwegs. Wie Eidechsen besitzt die kupferglänzende Blindschleiche bewegliche Augenlider (kann zwinkern!) und kann bei Gefahr den Schwanz abwerfen."
  },
  {
    "id": 547,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „ausgezeichnete Schwimmerin; völlig ungiftig und für den Menschen harmlos“?",
    "a": [
      "Ringelnatter",
      "Europäischer Laubfrosch",
      "Rote Waldameise",
      "Wildschwein (Schwarzwild)"
    ],
    "exp": "Ringelnatter (Natrix natrix): ausgezeichnete Schwimmerin; völlig ungiftig und für den Menschen harmlos. Wird sie überrascht, zischt sie laut oder stellt sich im äußersten Notfall mit geöffnetem Maul und heraushängender Zunge tot."
  },
  {
    "id": 548,
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „tagaktiv, sonnt sich früh am Morgen auf Bulten oder Baumstümpfen“?",
    "a": [
      "Kreuzotter",
      "Knoblauchkröte",
      "Ameisenlöwe (Ameisenjungfer)",
      "Wolf"
    ],
    "exp": "Kreuzotter (Vipera berus): tagaktiv, sonnt sich früh am Morgen auf Bulten oder Baumstümpfen. Die sehr scheue Schlange flieht bei Erschütterung durch Schritte sofort ins Heidekraut; ihre Bisse sind meist trockene Abwehrbisse."
  },
  {
    "id": 549,
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „versteckte Lebensweise; völlig ungiftige Würgeschlange“?",
    "a": [
      "Glattnatter (Schlingnatter)",
      "Erdkröte",
      "Blauflügelige Ödlandschrecke",
      "Rotfuchs"
    ],
    "exp": "Glattnatter (Schlingnatter) (Coronella austriaca): versteckte Lebensweise; völlig ungiftige Würgeschlange. Wegen ihrer Rückenzeichnung wird die harmlose Schlingnatter leider oft mit der Kreuzotter verwechselt."
  },
  {
    "id": 550,
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches dieser vier Tiere aus der Natur rund um Schwarzenburg und Heideblick zeigt folgendes Verhalten bzw. Spurenmerkmal: „wandert im zeitigen Frühjahr (März/April) zu den Laichgewässern“?",
    "a": [
      "Moorfrosch",
      "Hirschkäfer",
      "Schwalbenschwanz",
      "Dachs (Meister Grimbart)"
    ],
    "exp": "Moorfrosch (Rana arvalis): wandert im zeitigen Frühjahr (März/April) zu den Laichgewässern. Dieses spektakuläre „Blauwerden“ der Moorfrosch-Männchen dauert oft nur drei bis fünf sonnige Frühlingstage."
  },
  {
    "id": 551,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Baumart prägt den fast endlos wirkenden Wald rund um Schwarzenburg auf den sandigen Eiszeitböden am stärksten?",
    "a": [
      "Die Waldkiefer (Pinus sylvestris)",
      "Die Weißtanne (Abies alba)",
      "Die Europäische Lärche (Larix decidua)",
      "Die Zirbelkiefer (Pinus cembra)"
    ],
    "exp": "Die genügsame Waldkiefer kommt mit den trockenen, nährstoffarmen Sandböden der Niederlausitzer Heide optimal zurecht und bildet weite, duftende Kiefernwälder."
  },
  {
    "id": 552,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "In welchem großen brandenburgischen Naturpark liegt Schwarzenburg (Gemeinde Heideblick)?",
    "a": [
      "Naturpark Niederlausitzer Landrücken",
      "Nationalpark Unteres Odertal",
      "Biosphärenreservat Schorfheide-Chorin",
      "Naturpark Westhavelland"
    ],
    "exp": "Schwarzenburg liegt mitten im rund 580 km² großen Naturpark Niederlausitzer Landrücken an der Grenze zur Rochauer Heide."
  },
  {
    "id": 553,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche klimatische Besonderheit zeichnet Südbrandenburg und die Region um Heideblick im deutschlandweiten Vergleich aus?",
    "a": [
      "Sie gehört zu den niederschlagsärmsten und sonnenreichsten Regionen Deutschlands",
      "Sie ist das regenreichste Gebiet nördlich der Alpen",
      "Hier herrscht ganzjährig maritimes Küstenklima",
      "Es gibt dort im Sommer fast täglich schweren Nebel"
    ],
    "exp": "Mit oft nur rund 500–550 mm Jahresniederschlag und vielen Sonnenstunden ist Südbrandenburg besonders trocken und sonnenverwöhnt – ideal für Wanderungen und Urlaub im Grünen."
  },
  {
    "id": 554,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "In welchen Monaten verwandeln sich die Kiefernwälder rund um Schwarzenburg in ein Paradies für Pilzsammler?",
    "a": [
      "Vor allem von September bis November",
      "Ausschließlich im Januar und Februar",
      "Nur in den ersten zwei Aprilwochen",
      "Mitte Juni bis Anfang Juli"
    ],
    "exp": "Im Spätsommer und Herbst (September bis November) sprießen in den Kiefernwäldern um Schwarzenburg Maronenröhrlinge, Steinpilze, Pfifferlinge und Krause Glucken."
  },
  {
    "id": 555,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welcher beliebte Speisepilz mit kastanienbraunem Hut und bei Druck blauenden Röhren ist der häufigste Charakterpilz der Schwarzenburger Kiefernwälder?",
    "a": [
      "Der Maronenröhrling (Imleria badia)",
      "Der Fliegenpilz (Amanita muscaria)",
      "Der Grüne Knollenblätterpilz (Amanita phalloides)",
      "Der Satansröhrling (Rubroboletus satanas)"
    ],
    "exp": "Der Maronenröhrling („Marone“) liebt saure Sandböden unter Kiefern und ist in der Niederlausitz der klassische Brotpilz im Sammelkorb."
  },
  {
    "id": 556,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher kraus verzweigte, badeschwammähnliche Speisepilz wächst rund um Schwarzenburg direkt am Stammfuß alter Kiefern?",
    "a": [
      "Die Krause Glucke (Fette Henne / Sparassis crispa)",
      "Der Riesenbovist (Calvatia gigantea)",
      "Der Schopftintling (Coprinus comatus)",
      "Die Speisemorchel (Morchella esculenta)"
    ],
    "exp": "Die Krause Glucke (auch „Fette Henne“) wächst am Fuß von Kiefern, duftet würzig-nussig und ist ein hervorragender Speisepilz."
  },
  {
    "id": 557,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Was versteht man unter dem Konzept eines „Waldgartens“ (Forest Garden), das perfekt zur Natur rund um Schwarzenburg passt?",
    "a": [
      "Ein mehrschichtiges, naturnahes Ökosystem aus Bäumen, Sträuchern, Kräutern und Wildpflanzen nach dem Vorbild des Waldes",
      "Einen rein künstlichen Steingarten ohne Bäume",
      "Eine Monokultur aus ausschließlich englischem Zierrasen",
      "Ein Gewächshaus nur für tropische Orchideen"
    ],
    "exp": "Ein Waldgarten verbindet hohe Bäume, Obst- und Beerensträucher, Wildkräuter, Pilze und Rückzugsorte für Vögel und Wildtiere zu einem harmonischen Lebensraum."
  },
  {
    "id": 558,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche eiszeitliche Landschaftsform bildet die Hügelkette des Niederlausitzer Landrückens bei Heideblick und Schwarzenburg?",
    "a": [
      "Eine Endmoräne der Saalekaltzeit (Warthe-Stadium)",
      "Ein alpines Faltengebirge aus dem Tertiär",
      "Ein vulkanischer Kraterrand aus Basalt",
      "Ein Korallenriff aus der Jurazeit"
    ],
    "exp": "Der Niederlausitzer Landrücken entstand vor rund 150.000 Jahren im Warthe-Stadium der Saaleeiszeit als markanter Endmoränenzug aus Sand, Kies und Geschiebemergel."
  },
  {
    "id": 559,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: immergrüne Nadeln, die stets paarweise (zu zweit) in einer Kurztriebscheide sitzen; im oberen Stammbereich leuchtend fuchsrote „Spiegelrinde“?",
    "a": [
      "Waldkiefer (Gemeine Kiefer)",
      "Heidelbeere (Blaubeere)",
      "Steinpilz (Fichten-/Kiefernsteinpilz)",
      "Parasol (Riesenschirmling)"
    ],
    "exp": "Waldkiefer (Gemeine Kiefer) (Pinus sylvestris): Ihre harzreichen Nadeln verströmen an warmen Sommertagen den typischen würzigen Duft der märkischen Kiefernheide."
  },
  {
    "id": 560,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Waldkiefer (Gemeine Kiefer)“ (Pinus sylvestris) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "tiefreichende Pfahlwurzel trotzt Stürmen und langer Sommertrockenheit auf den Lausitzer Sandböden",
      "beliebtes Sammelobst für Kuchen und Pfannkuchen sowie Hauptnahrung für Fuchs, Dachs, Marder und Waldvögel",
      "einer der edelsten Speisepilze mit festem, weißem, mild-nussigem Fleisch; lässt sich hervorragend im Dörrautomaten trocknen",
      "die großen, nussig riechenden Hüte schmecken paniert und in Butter gebraten wie ein Wiener Schnitzel"
    ],
    "exp": "Waldkiefer (Gemeine Kiefer): tiefreichende Pfahlwurzel trotzt Stürmen und langer Sommertrockenheit auf den Lausitzer Sandböden. Ihre harzreichen Nadeln verströmen an warmen Sommertagen den typischen würzigen Duft der märkischen Kiefernheide."
  },
  {
    "id": 561,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Waldkiefer (Gemeine Kiefer)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Ihre harzreichen Nadeln verströmen an warmen Sommertagen den typischen würzigen Duft der märkischen Kiefernheide.",
      "Im Gegensatz zur gezüchteten Kulturheidelbeere (mit hellem Fruchtfleisch) färbt die echte Waldheidelbeere Zunge und Lippen kräftig blaurot.",
      "Sein häufigster ungenießbarer Doppelgänger ist der Gallenröhrling („Bitterling“), dessen Röhren im Alter schmutzig-rosa werden und der ein grobes dunkles Stielnetz trägt.",
      "Wichtiges Sicherheitsmerkmal: Der Stiel ist deutlich dunkel genattert und der Ring lässt sich am Stiel frei auf und ab schieben."
    ],
    "exp": "Wichtig zu Waldkiefer (Gemeine Kiefer) (Pinus sylvestris): Ihre harzreichen Nadeln verströmen an warmen Sommertagen den typischen würzigen Duft der märkischen Kiefernheide."
  },
  {
    "id": 562,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Ihre harzreichen Nadeln verströmen an warmen Sommertagen den typischen würzigen Duft der märkischen Kiefernheide.“?",
    "a": [
      "Waldkiefer (Gemeine Kiefer)",
      "Heidelbeere (Blaubeere)",
      "Steinpilz (Fichten-/Kiefernsteinpilz)",
      "Parasol (Riesenschirmling)"
    ],
    "exp": "Gemeint ist Waldkiefer (Gemeine Kiefer) (Pinus sylvestris) – immergrüne Nadeln, die stets paarweise (zu zweit) in einer Kurztriebscheide sitzen; im oberen Stammbereich leuchtend fuchsrote „Spiegelrinde“."
  },
  {
    "id": 563,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Pinus sylvestris“?",
    "a": [
      "Waldkiefer (Gemeine Kiefer)",
      "Heidelbeere (Blaubeere)",
      "Steinpilz (Fichten-/Kiefernsteinpilz)",
      "Parasol (Riesenschirmling)"
    ],
    "exp": "Pinus sylvestris ist der wissenschaftliche Name für Waldkiefer (Gemeine Kiefer) (Hauptbaumart der Schwarzenburger Wälder)."
  },
  {
    "id": 564,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Waldkiefer (Gemeine Kiefer)“ (Hauptbaumart der Schwarzenburger Wälder) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "immergrüne Nadeln, die stets paarweise (zu zweit) in einer Kurztriebscheide sitzen; im oberen Stammbereich leuchtend fuchsrote „Spiegelrinde“",
      "grün kantige Zweige, sommergrüne Blättchen und blauschwarze, innen tief dunkelblau färbende Beeren ab Juni/Juli",
      "brauner Hut, bauchiger Stiel mit feinem weißem Adernetz im oberen Teil; Röhren anfangs weiß, später gelbgrün (blauen bei Druck NICHT)",
      "bis zu 30 cm breiter, geschuppter Schirm, ein frei verschiebbarer doppelter Ring am langen, genatterten („schlangenhautartig gemusterten“) Stiel"
    ],
    "exp": "Erkennungsmerkmal von Waldkiefer (Gemeine Kiefer): immergrüne Nadeln, die stets paarweise (zu zweit) in einer Kurztriebscheide sitzen; im oberen Stammbereich leuchtend fuchsrote „Spiegelrinde“."
  },
  {
    "id": 565,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: auffallend weiße Rinde mit dunklen Rissen und bogig herabhängende, feine Zweige?",
    "a": [
      "Hängebirke (Sandbirke)",
      "Preiselbeere (Kronsbeere)",
      "Echter Pfifferling (Eierschwamm)",
      "Grüner Knollenblätterpilz"
    ],
    "exp": "Hängebirke (Sandbirke) (Betula pendula): Das in der weißen Birkenrinde enthaltene „Betulin“ reflektiert starkes Sonnenlicht und macht die Rinde selbst bei Regen wasserabweisend und brennbar."
  },
  {
    "id": 566,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Hängebirke (Sandbirke)“ (Betula pendula) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "besiedelt als lichthungriger Pionierbaum schnell offene Sandflächen; unter ihr wachsen Birkenpilze und Fliegenpilze",
      "reich an Vitamin C sowie natürlicher Benzoe- und Salicylsäure, weshalb Preiselbeerkompott monatelang ohne Konservierungsstoffe hält",
      "würziger Speisepilz, der fast nie von Maden befallen wird",
      "tödlich giftig! Verursacht über 90 % aller tödlichen Pilzvergiftungen in Mitteleuropa durch hitzestabile Amatoxine"
    ],
    "exp": "Hängebirke (Sandbirke): besiedelt als lichthungriger Pionierbaum schnell offene Sandflächen; unter ihr wachsen Birkenpilze und Fliegenpilze. Das in der weißen Birkenrinde enthaltene „Betulin“ reflektiert starkes Sonnenlicht und macht die Rinde selbst bei Regen wasserabweisend und brennbar."
  },
  {
    "id": 567,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Hängebirke (Sandbirke)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Das in der weißen Birkenrinde enthaltene „Betulin“ reflektiert starkes Sonnenlicht und macht die Rinde selbst bei Regen wasserabweisend und brennbar.",
      "In Schwarzenburg ist die Kombination aus Wildbraten und selbst gesammelten Wald-Preiselbeeren ein echter Klassiker.",
      "Vom ungenießbaren Falschen Pfifferling unterscheidet man ihn sicher an den dicken, querverbundenen Leisten, dem festen weißen Fleisch und dem Aprikosengeruch.",
      "Heimtückisch ist die lange Latenzzeit von 6 bis 24 Stunden, in der zunächst keine Symptome auftreten, während die Leber bereits geschädigt wird."
    ],
    "exp": "Wichtig zu Hängebirke (Sandbirke) (Betula pendula): Das in der weißen Birkenrinde enthaltene „Betulin“ reflektiert starkes Sonnenlicht und macht die Rinde selbst bei Regen wasserabweisend und brennbar."
  },
  {
    "id": 568,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Das in der weißen Birkenrinde enthaltene „Betulin“ reflektiert starkes Sonnenlicht und macht die Rinde selbst bei Regen wasserabweisend und brennbar.“?",
    "a": [
      "Hängebirke (Sandbirke)",
      "Preiselbeere (Kronsbeere)",
      "Echter Pfifferling (Eierschwamm)",
      "Grüner Knollenblätterpilz"
    ],
    "exp": "Gemeint ist Hängebirke (Sandbirke) (Betula pendula) – auffallend weiße Rinde mit dunklen Rissen und bogig herabhängende, feine Zweige."
  },
  {
    "id": 569,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Betula pendula“?",
    "a": [
      "Hängebirke (Sandbirke)",
      "Preiselbeere (Kronsbeere)",
      "Echter Pfifferling (Eierschwamm)",
      "Grüner Knollenblätterpilz"
    ],
    "exp": "Betula pendula ist der wissenschaftliche Name für Hängebirke (Sandbirke) (Pionierbaum an Kiefernwaldrändern und Lichtungen)."
  },
  {
    "id": 570,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Hängebirke (Sandbirke)“ (Pionierbaum an Kiefernwaldrändern und Lichtungen) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "auffallend weiße Rinde mit dunklen Rissen und bogig herabhängende, feine Zweige",
      "immergrüne, derb-ledrige, glänzende Blättchen (ähnlich Buchsbaum) und leuchtend rote, herb-säuerliche Beeren im Spätsommer",
      "dottergelber, trichterförmig geschwungener Fruchtkörper mit gegabelten, herablaufenden Leisten (keine dünnen Lamellen!) und fruchtigem Aprikosenduft",
      "olivgrünlicher bis gelbgrünlicher Hut, reinweiße Lamellen (bleiben immer weiß!), Ring am Stiel und eine sackartige weiße Scheide („Volva“) um die Stielknolle im Boden"
    ],
    "exp": "Erkennungsmerkmal von Hängebirke (Sandbirke): auffallend weiße Rinde mit dunklen Rissen und bogig herabhängende, feine Zweige."
  },
  {
    "id": 571,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: gelappte Blätter mit deutlichem Blattstiel, während die Eicheln ungestielt („traubig gehäuft“) am Zweig sitzen?",
    "a": [
      "Traubeneiche",
      "Walderdbeere",
      "Krause Glucke (Fette Henne)",
      "Fliegenpilz"
    ],
    "exp": "Traubeneiche (Quercus petraea): Gemeinsam mit der Stieleiche erhöht sie im Kiefernwald die Artenvielfalt (über 500 Insektenarten leben an Eichen!) und bremst Waldbrände."
  },
  {
    "id": 572,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Traubeneiche“ (Quercus petraea) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "liefert im Herbst energiereiche Eicheln (Mast) für Wildschweine, Rothirsche, Eichelhäher und Eichhörnchen",
      "perfekter, essbarer Bodendecker für die unterste Schicht eines naturnahen Waldgartens",
      "exzellenter, würzig-nussiger Speisepilz mit bissfestem Fleisch (z. B. paniert als Schnitzel oder in Rahmsoße)",
      "giftig (enthält Ibotensäure und Muscimol); wichtiger Mykorrhizapartner für Birken und Kiefern im Waldökosystem"
    ],
    "exp": "Traubeneiche: liefert im Herbst energiereiche Eicheln (Mast) für Wildschweine, Rothirsche, Eichelhäher und Eichhörnchen. Gemeinsam mit der Stieleiche erhöht sie im Kiefernwald die Artenvielfalt (über 500 Insektenarten leben an Eichen!) und bremst Waldbrände."
  },
  {
    "id": 573,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Traubeneiche“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Gemeinsam mit der Stieleiche erhöht sie im Kiefernwald die Artenvielfalt (über 500 Insektenarten leben an Eichen!) und bremst Waldbrände.",
      "Obwohl die Früchte viel kleiner als Gartenerdbeeren sind, besitzen sie ein vielfach intensiveres Aroma.",
      "Vor dem Braten teilt man die Krause Glucke am besten in Scheiben und spült sie kurz in lauwarmem Wasser ab, um Kiefernnadeln und Waldsand aus den Windungen zu lösen.",
      "Der Name stammt daher, dass man früher gezuckerte Milch mit Fliegenpilzstückchen aufstellte, um Stubenfliegen zu betäuben."
    ],
    "exp": "Wichtig zu Traubeneiche (Quercus petraea): Gemeinsam mit der Stieleiche erhöht sie im Kiefernwald die Artenvielfalt (über 500 Insektenarten leben an Eichen!) und bremst Waldbrände."
  },
  {
    "id": 574,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Gemeinsam mit der Stieleiche erhöht sie im Kiefernwald die Artenvielfalt (über 500 Insektenarten leben an Eichen!) und bremst Waldbrände.“?",
    "a": [
      "Traubeneiche",
      "Walderdbeere",
      "Krause Glucke (Fette Henne)",
      "Fliegenpilz"
    ],
    "exp": "Gemeint ist Traubeneiche (Quercus petraea) – gelappte Blätter mit deutlichem Blattstiel, während die Eicheln ungestielt („traubig gehäuft“) am Zweig sitzen."
  },
  {
    "id": 575,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Quercus petraea“?",
    "a": [
      "Traubeneiche",
      "Walderdbeere",
      "Krause Glucke (Fette Henne)",
      "Fliegenpilz"
    ],
    "exp": "Quercus petraea ist der wissenschaftliche Name für Traubeneiche (Mischbaumart in naturnahen Kiefern-Eichen-Wäldern)."
  },
  {
    "id": 576,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Traubeneiche“ (Mischbaumart in naturnahen Kiefern-Eichen-Wäldern) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "gelappte Blätter mit deutlichem Blattstiel, während die Eicheln ungestielt („traubig gehäuft“) am Zweig sitzen",
      "dreizählige, gezähnte Blätter, weiße Blüten und kleine rote Sammelnussfrüchte mit intensivem Waldaroma",
      "bis zu 30 cm großer, gelblich-cremefarbener, kraus gewundener Fruchtkörper, der wie ein Badeschwamm oder Blumenkohl aussieht",
      "leuchtend roter Hut mit weißen Flocken (Velumresten), weiße Lamellen, beringter Stiel und warzig gegürtelte Knolle"
    ],
    "exp": "Erkennungsmerkmal von Traubeneiche: gelappte Blätter mit deutlichem Blattstiel, während die Eicheln ungestielt („traubig gehäuft“) am Zweig sitzen."
  },
  {
    "id": 577,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: Blätter fast ungestielt mit kleinen „Öhrchen“ am Grund, dafür hängen die Eicheln an langen Stielen („Stieleiche“)?",
    "a": [
      "Stieleiche (Deutsche Eiche)",
      "Schwarzer Holunder",
      "Birkenpilz",
      "Gallenröhrling (Bitterling)"
    ],
    "exp": "Stieleiche (Deutsche Eiche) (Quercus robur): Merksatz für Spaziergänger: „Bei der Stieleiche hängen die Eicheln am Stiel, bei der Traubeneiche die Blätter!“"
  },
  {
    "id": 578,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Stieleiche (Deutsche Eiche)“ (Quercus robur) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "kann über 500 bis 800 Jahre alt werden und bietet Hirschkäfer, Heldbock und Spechten Lebensraum",
      "Blüten für Holunderblütensirup und „Hollerküchle“, gekochte Beeren für Saft und Gelee; Magnet für Mönchsgrasmücke und Star",
      "guter Speisepilz (besonders junge, feste Exemplare); wichtigster Symbiosepartner der Hängebirke",
      "nicht giftig, aber durch extremen Bitterstoff völlig ungenießbar – ein einziger Pilz verdirbt das gesamte Pilzgericht!"
    ],
    "exp": "Stieleiche (Deutsche Eiche): kann über 500 bis 800 Jahre alt werden und bietet Hirschkäfer, Heldbock und Spechten Lebensraum. Merksatz für Spaziergänger: „Bei der Stieleiche hängen die Eicheln am Stiel, bei der Traubeneiche die Blätter!“"
  },
  {
    "id": 579,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Stieleiche (Deutsche Eiche)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Merksatz für Spaziergänger: „Bei der Stieleiche hängen die Eicheln am Stiel, bei der Traubeneiche die Blätter!“",
      "Altem Volksbrauch nach pflanzte man an jeden Hof einen Holunderbusch als guten Hausgeist („Vor dem Holunder soll man den Hut ziehen“).",
      "Beim Kochen verfärbt sich das weiße Fleisch des Birkenpilzes dunkelgrau bis schwärzlich – das ist völlig normal und unbedenklich.",
      "Er ist der klassische „Täuscher“ für Steinpilz- und Maronensammler in den Kiefernwäldern der Lausitz."
    ],
    "exp": "Wichtig zu Stieleiche (Deutsche Eiche) (Quercus robur): Merksatz für Spaziergänger: „Bei der Stieleiche hängen die Eicheln am Stiel, bei der Traubeneiche die Blätter!“"
  },
  {
    "id": 580,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Merksatz für Spaziergänger: „Bei der Stieleiche hängen die Eicheln am Stiel, bei der Traubeneiche die Blätter!““?",
    "a": [
      "Stieleiche (Deutsche Eiche)",
      "Schwarzer Holunder",
      "Birkenpilz",
      "Gallenröhrling (Bitterling)"
    ],
    "exp": "Gemeint ist Stieleiche (Deutsche Eiche) (Quercus robur) – Blätter fast ungestielt mit kleinen „Öhrchen“ am Grund, dafür hängen die Eicheln an langen Stielen („Stieleiche“)."
  },
  {
    "id": 581,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Quercus robur“?",
    "a": [
      "Stieleiche (Deutsche Eiche)",
      "Schwarzer Holunder",
      "Birkenpilz",
      "Gallenröhrling (Bitterling)"
    ],
    "exp": "Quercus robur ist der wissenschaftliche Name für Stieleiche (Deutsche Eiche) (Wälder, Dorfränder und Alleen in Heideblick)."
  },
  {
    "id": 582,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Stieleiche (Deutsche Eiche)“ (Wälder, Dorfränder und Alleen in Heideblick) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "Blätter fast ungestielt mit kleinen „Öhrchen“ am Grund, dafür hängen die Eicheln an langen Stielen („Stieleiche“)",
      "duftende cremeweiße Blütenschirme im Juni und glänzend schwarze Beerendolden an rötlichen Stielen im September",
      "graubrauner, glatter Hut und schlanker, weißlicher Stiel, der dicht mit dunklen, rauen Schüppchen („Raufuß“) besetzt ist",
      "brauner Hut wie beim Steinpilz, aber grobes dunkles Netz am Stiel und im Alter schmutzig-rosa vorwölbende Röhren"
    ],
    "exp": "Erkennungsmerkmal von Stieleiche (Deutsche Eiche): Blätter fast ungestielt mit kleinen „Öhrchen“ am Grund, dafür hängen die Eicheln an langen Stielen („Stieleiche“)."
  },
  {
    "id": 583,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: gefiederte Blätter, weiße Blütendolden im Mai und leuchtend korallenrote Beerendolden ab Spätsommer?",
    "a": [
      "Eberesche (Vogelbeere)",
      "Sanddorn",
      "Kiefern-Rotkappe (Fuchsrotkappe)",
      "Kahler Krempling"
    ],
    "exp": "Eberesche (Vogelbeere) (Sorbus aucuparia): Trotz des Volksglaubens sind Vogelbeeren nicht giftig: Gekocht als Gelee oder Konfitüre (oder nach dem ersten Frost) verlieren sie ihre bittere Parasorbinsäure."
  },
  {
    "id": 584,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Eberesche (Vogelbeere)“ (Sorbus aucuparia) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "wichtigste Nahrungsquelle im Herbst und Winter für über 60 Vogelarten (Drosseln, Gimpel, Seidenschwanz) und Baummarder",
      "Pionierstrauch auf kargen Sandböden; seine Beeren enthalten bis zu zehnmal mehr Vitamin C als Zitronen („Zitrone des Nordens“)",
      "sehr geschätzter, festfleischiger Speisepilz; verfärbt sich im Anschnitt erst rötlich-violett, dann schwärzlich",
      "früher fälschlich als Speisepilz gesammelt, heute als lebensgefährlich giftig bekannt (löst nach wiederholtem Verzehr das tödliche Paxillus-Syndrom / Immunhämolysen aus)"
    ],
    "exp": "Eberesche (Vogelbeere): wichtigste Nahrungsquelle im Herbst und Winter für über 60 Vogelarten (Drosseln, Gimpel, Seidenschwanz) und Baummarder. Trotz des Volksglaubens sind Vogelbeeren nicht giftig: Gekocht als Gelee oder Konfitüre (oder nach dem ersten Frost) verlieren sie ihre bittere Parasorbinsäure."
  },
  {
    "id": 585,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Eberesche (Vogelbeere)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Trotz des Volksglaubens sind Vogelbeeren nicht giftig: Gekocht als Gelee oder Konfitüre (oder nach dem ersten Frost) verlieren sie ihre bittere Parasorbinsäure.",
      "Sanddorn ist zweihäusig: Für eine reiche Beerenernte im Waldgarten braucht man mindestens einen männlichen Bestäuberstrauch neben den weiblichen Sträuchern.",
      "Wie alle Raufußröhrlinge sollten Rotkappen vor dem Verzehr stets gut durchgegart werden (mindestens 15 Minuten).",
      "Ein klassisches Beispiel dafür, warum man alte Pilzbücher vor 1980 nicht mehr zur Bestimmung von Speisepilzen nutzen sollte."
    ],
    "exp": "Wichtig zu Eberesche (Vogelbeere) (Sorbus aucuparia): Trotz des Volksglaubens sind Vogelbeeren nicht giftig: Gekocht als Gelee oder Konfitüre (oder nach dem ersten Frost) verlieren sie ihre bittere Parasorbinsäure."
  },
  {
    "id": 586,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Trotz des Volksglaubens sind Vogelbeeren nicht giftig: Gekocht als Gelee oder Konfitüre (oder nach dem ersten Frost) verlieren sie ihre bittere Parasorbinsäure.“?",
    "a": [
      "Eberesche (Vogelbeere)",
      "Sanddorn",
      "Kiefern-Rotkappe (Fuchsrotkappe)",
      "Kahler Krempling"
    ],
    "exp": "Gemeint ist Eberesche (Vogelbeere) (Sorbus aucuparia) – gefiederte Blätter, weiße Blütendolden im Mai und leuchtend korallenrote Beerendolden ab Spätsommer."
  },
  {
    "id": 587,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Sorbus aucuparia“?",
    "a": [
      "Eberesche (Vogelbeere)",
      "Sanddorn",
      "Kiefern-Rotkappe (Fuchsrotkappe)",
      "Kahler Krempling"
    ],
    "exp": "Sorbus aucuparia ist der wissenschaftliche Name für Eberesche (Vogelbeere) (Waldränder, Lichtungen und Waldgärten)."
  },
  {
    "id": 588,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Eberesche (Vogelbeere)“ (Waldränder, Lichtungen und Waldgärten) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "gefiederte Blätter, weiße Blütendolden im Mai und leuchtend korallenrote Beerendolden ab Spätsommer",
      "silbrig-graue, schmale Blätter, spitze Dornen und dicht gedrängte, leuchtend orangefarbene Beeren ab Spätsommer",
      "leuchtend orangeroter bis fuchsroter Hut mit überstehender Huthaut am Rand und rau geschupptem Stiel",
      "ockerbrauner Hut mit stark eingerolltem, filzigem Rand und herablaufenden Lamellen, die bei Fingerdruck sofort rostbraun flecken"
    ],
    "exp": "Erkennungsmerkmal von Eberesche (Vogelbeere): gefiederte Blätter, weiße Blütendolden im Mai und leuchtend korallenrote Beerendolden ab Spätsommer."
  },
  {
    "id": 589,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: rundliche, vorne leicht eingebuchtete Blätter und kleine, holzige schwarze „Erlenzäpfchen“, die den ganzen Winter am Baum bleiben?",
    "a": [
      "Schwarzerle (Roterle)",
      "Schlehe (Schwarzdorn)",
      "Butterpilz (Butter-Röhrling)",
      "Frühjahrslorchel (Giftlorchel)"
    ],
    "exp": "Schwarzerle (Roterle) (Alnus glutinosa): Frisch geschlagenes Erlenholz färbt sich an der Luft rasch leuchtend orangerot – daher auch der Name „Roterle“."
  },
  {
    "id": 590,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Schwarzerle (Roterle)“ (Alnus glutinosa) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "ihre Wurzeln leben in Symbiose mit Knöllchenbakterien (Frankia), die Luftstickstoff binden, und vertragen monatelange Überflutung",
      "undurchdringlicher Brutplatz für Neuntöter und Goldammer; Raupenfutterpflanze des Segelfalters und Nierenfleck-Zipfelfalters",
      "milder, zarter Speisepilz und treuer Begleiter der Waldkiefer",
      "lebensgefährlich giftig! Enthält das flüchtige Zell- und Lebergift Gyromitrin"
    ],
    "exp": "Schwarzerle (Roterle): ihre Wurzeln leben in Symbiose mit Knöllchenbakterien (Frankia), die Luftstickstoff binden, und vertragen monatelange Überflutung. Frisch geschlagenes Erlenholz färbt sich an der Luft rasch leuchtend orangerot – daher auch der Name „Roterle“."
  },
  {
    "id": 591,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Schwarzerle (Roterle)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Frisch geschlagenes Erlenholz färbt sich an der Luft rasch leuchtend orangerot – daher auch der Name „Roterle“.",
      "Erst nach den ersten strengen Herbstfrösten wird der zusammenziehende Gerbstoff in den Schlehen abgebaut, sodass sie mild und aromatisch für Likör oder Marmelade werden.",
      "Tipp für Sammler: Die klebrige braune Huthaut lässt sich schon im Wald wie von selbst komplett vom Hut abziehen.",
      "Sie darf keinesfalls mit der essbaren, wabenförmig gekammerten Speisemorchel verwechselt werden."
    ],
    "exp": "Wichtig zu Schwarzerle (Roterle) (Alnus glutinosa): Frisch geschlagenes Erlenholz färbt sich an der Luft rasch leuchtend orangerot – daher auch der Name „Roterle“."
  },
  {
    "id": 592,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Frisch geschlagenes Erlenholz färbt sich an der Luft rasch leuchtend orangerot – daher auch der Name „Roterle“.“?",
    "a": [
      "Schwarzerle (Roterle)",
      "Schlehe (Schwarzdorn)",
      "Butterpilz (Butter-Röhrling)",
      "Frühjahrslorchel (Giftlorchel)"
    ],
    "exp": "Gemeint ist Schwarzerle (Roterle) (Alnus glutinosa) – rundliche, vorne leicht eingebuchtete Blätter und kleine, holzige schwarze „Erlenzäpfchen“, die den ganzen Winter am Baum bleiben."
  },
  {
    "id": 593,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Alnus glutinosa“?",
    "a": [
      "Schwarzerle (Roterle)",
      "Schlehe (Schwarzdorn)",
      "Butterpilz (Butter-Röhrling)",
      "Frühjahrslorchel (Giftlorchel)"
    ],
    "exp": "Alnus glutinosa ist der wissenschaftliche Name für Schwarzerle (Roterle) (Erlenbrüche (wie am Borcheltsbusch), Bachufer und feuchte Senken)."
  },
  {
    "id": 594,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Schwarzerle (Roterle)“ (Erlenbrüche (wie am Borcheltsbusch), Bachufer und feuchte Senken) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "rundliche, vorne leicht eingebuchtete Blätter und kleine, holzige schwarze „Erlenzäpfchen“, die den ganzen Winter am Baum bleiben",
      "blüht bereits im April vor dem Laubaustrieb wie eine weiße Schneewolke; blauschwarze, bereifte Steinfrüchte im Herbst",
      "schokoladenbrauner, bei Feuchtigkeit schleimiger Hut, gelbe Poren und ein deutlicher häutiger Ring am Stiel",
      "rotbrauner, hirnartig gewundener Hut (nicht wabenförmig wie bei der essbaren Speisemorchel!) auf weißlichem Stiel"
    ],
    "exp": "Erkennungsmerkmal von Schwarzerle (Roterle): rundliche, vorne leicht eingebuchtete Blätter und kleine, holzige schwarze „Erlenzäpfchen“, die den ganzen Winter am Baum bleiben."
  },
  {
    "id": 595,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: immergrüner Zwergstrauch mit winzigen, schuppenförmigen Blättchen und violett-rosa Blütenteppich von August bis Oktober?",
    "a": [
      "Besenheide (Heidekraut)",
      "Maronenröhrling (Braunkappe)",
      "Edel-Reizker (Kiefern-Reizker)",
      "Echte Rentierflechte"
    ],
    "exp": "Besenheide (Heidekraut) (Calluna vulgaris): Früher band man aus den zähen, verzweigten Zweigen haltbare Stall- und Hofbesen – daher der Name „Besenheide“."
  },
  {
    "id": 596,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Besenheide (Heidekraut)“ (Calluna vulgaris) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "späte und enorm ergiebige Nektarquelle für Honigbienen („Heidehonig“), Wildbienen und Schmetterlinge im Spätsommer",
      "Mykorrhizapartner von Kiefer und Fichte von August bis November; hervorragender Brat- und Trockenpilz",
      "hervorragender Bratpilz aus der Gattung der Milchlinge",
      "Flechten sind eine Lebensgemeinschaft (Symbiose) aus einem Pilz und einer Grünalge; Zeiger für saubere Luft und nährstoffarme Naturböden"
    ],
    "exp": "Besenheide (Heidekraut): späte und enorm ergiebige Nektarquelle für Honigbienen („Heidehonig“), Wildbienen und Schmetterlinge im Spätsommer. Früher band man aus den zähen, verzweigten Zweigen haltbare Stall- und Hofbesen – daher der Name „Besenheide“."
  },
  {
    "id": 597,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Besenheide (Heidekraut)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Früher band man aus den zähen, verzweigten Zweigen haltbare Stall- und Hofbesen – daher der Name „Besenheide“.",
      "Im Gegensatz zum bitteren Gallenröhrling hat die Marone niemals rosa Röhren und kein dunkles Netz am Stiel.",
      "Alle Reizker, die beim Anschneiden sofort karottenrote bis weinrote (nicht weiße!) Milch absondern, sind essbar.",
      "Bitte beim Wandern nicht zertreten: Ein Flechtenpolster im trockenen Kiefernwald wächst nur wenige Millimeter pro Jahr!"
    ],
    "exp": "Wichtig zu Besenheide (Heidekraut) (Calluna vulgaris): Früher band man aus den zähen, verzweigten Zweigen haltbare Stall- und Hofbesen – daher der Name „Besenheide“."
  },
  {
    "id": 598,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Früher band man aus den zähen, verzweigten Zweigen haltbare Stall- und Hofbesen – daher der Name „Besenheide“.“?",
    "a": [
      "Besenheide (Heidekraut)",
      "Maronenröhrling (Braunkappe)",
      "Edel-Reizker (Kiefern-Reizker)",
      "Echte Rentierflechte"
    ],
    "exp": "Gemeint ist Besenheide (Heidekraut) (Calluna vulgaris) – immergrüner Zwergstrauch mit winzigen, schuppenförmigen Blättchen und violett-rosa Blütenteppich von August bis Oktober."
  },
  {
    "id": 599,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Calluna vulgaris“?",
    "a": [
      "Besenheide (Heidekraut)",
      "Maronenröhrling (Braunkappe)",
      "Edel-Reizker (Kiefern-Reizker)",
      "Echte Rentierflechte"
    ],
    "exp": "Calluna vulgaris ist der wissenschaftliche Name für Besenheide (Heidekraut) (sonnige Kiefernwaldlichtungen, Wegränder und Sandheiden rund um Schwarzenburg)."
  },
  {
    "id": 600,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Besenheide (Heidekraut)“ (sonnige Kiefernwaldlichtungen, Wegränder und Sandheiden rund um Schwarzenburg) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "immergrüner Zwergstrauch mit winzigen, schuppenförmigen Blättchen und violett-rosa Blütenteppich von August bis Oktober",
      "kastanienbrauner Hut, gelbliche bis grünlich-gelbe Röhren unter dem Hut, die sich bei Fingerdruck sofort bläulich verfärben",
      "orangefarbener, konzentrisch gezonte Kreise zeigender Hut mit kleinen Grübchen am Stiel; tritt bei Verletzung leuchtend karottenrote Milch aus",
      "buschig verzweigte, silbrig-grauweiße bis grünliche Polster am Waldboden, die bei Trockenheit knistern und bei Regen weich wie ein Schwamm werden"
    ],
    "exp": "Erkennungsmerkmal von Besenheide (Heidekraut): immergrüner Zwergstrauch mit winzigen, schuppenförmigen Blättchen und violett-rosa Blütenteppich von August bis Oktober."
  },
  {
    "id": 601,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: grün kantige Zweige, sommergrüne Blättchen und blauschwarze, innen tief dunkelblau färbende Beeren ab Juni/Juli?",
    "a": [
      "Heidelbeere (Blaubeere)",
      "Steinpilz (Fichten-/Kiefernsteinpilz)",
      "Parasol (Riesenschirmling)",
      "Waldkiefer (Gemeine Kiefer)"
    ],
    "exp": "Heidelbeere (Blaubeere) (Vaccinium myrtillus): Im Gegensatz zur gezüchteten Kulturheidelbeere (mit hellem Fruchtfleisch) färbt die echte Waldheidelbeere Zunge und Lippen kräftig blaurot."
  },
  {
    "id": 602,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Heidelbeere (Blaubeere)“ (Vaccinium myrtillus) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "beliebtes Sammelobst für Kuchen und Pfannkuchen sowie Hauptnahrung für Fuchs, Dachs, Marder und Waldvögel",
      "einer der edelsten Speisepilze mit festem, weißem, mild-nussigem Fleisch; lässt sich hervorragend im Dörrautomaten trocknen",
      "die großen, nussig riechenden Hüte schmecken paniert und in Butter gebraten wie ein Wiener Schnitzel",
      "tiefreichende Pfahlwurzel trotzt Stürmen und langer Sommertrockenheit auf den Lausitzer Sandböden"
    ],
    "exp": "Heidelbeere (Blaubeere): beliebtes Sammelobst für Kuchen und Pfannkuchen sowie Hauptnahrung für Fuchs, Dachs, Marder und Waldvögel. Im Gegensatz zur gezüchteten Kulturheidelbeere (mit hellem Fruchtfleisch) färbt die echte Waldheidelbeere Zunge und Lippen kräftig blaurot."
  },
  {
    "id": 603,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Heidelbeere (Blaubeere)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Im Gegensatz zur gezüchteten Kulturheidelbeere (mit hellem Fruchtfleisch) färbt die echte Waldheidelbeere Zunge und Lippen kräftig blaurot.",
      "Sein häufigster ungenießbarer Doppelgänger ist der Gallenröhrling („Bitterling“), dessen Röhren im Alter schmutzig-rosa werden und der ein grobes dunkles Stielnetz trägt.",
      "Wichtiges Sicherheitsmerkmal: Der Stiel ist deutlich dunkel genattert und der Ring lässt sich am Stiel frei auf und ab schieben.",
      "Ihre harzreichen Nadeln verströmen an warmen Sommertagen den typischen würzigen Duft der märkischen Kiefernheide."
    ],
    "exp": "Wichtig zu Heidelbeere (Blaubeere) (Vaccinium myrtillus): Im Gegensatz zur gezüchteten Kulturheidelbeere (mit hellem Fruchtfleisch) färbt die echte Waldheidelbeere Zunge und Lippen kräftig blaurot."
  },
  {
    "id": 604,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Im Gegensatz zur gezüchteten Kulturheidelbeere (mit hellem Fruchtfleisch) färbt die echte Waldheidelbeere Zunge und Lippen kräftig blaurot.“?",
    "a": [
      "Heidelbeere (Blaubeere)",
      "Steinpilz (Fichten-/Kiefernsteinpilz)",
      "Parasol (Riesenschirmling)",
      "Waldkiefer (Gemeine Kiefer)"
    ],
    "exp": "Gemeint ist Heidelbeere (Blaubeere) (Vaccinium myrtillus) – grün kantige Zweige, sommergrüne Blättchen und blauschwarze, innen tief dunkelblau färbende Beeren ab Juni/Juli."
  },
  {
    "id": 605,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Vaccinium myrtillus“?",
    "a": [
      "Heidelbeere (Blaubeere)",
      "Steinpilz (Fichten-/Kiefernsteinpilz)",
      "Parasol (Riesenschirmling)",
      "Waldkiefer (Gemeine Kiefer)"
    ],
    "exp": "Vaccinium myrtillus ist der wissenschaftliche Name für Heidelbeere (Blaubeere) (lichte Kiefernwälder auf sauren Humus- und Sandböden um Schwarzenburg)."
  },
  {
    "id": 606,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Heidelbeere (Blaubeere)“ (lichte Kiefernwälder auf sauren Humus- und Sandböden um Schwarzenburg) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "grün kantige Zweige, sommergrüne Blättchen und blauschwarze, innen tief dunkelblau färbende Beeren ab Juni/Juli",
      "brauner Hut, bauchiger Stiel mit feinem weißem Adernetz im oberen Teil; Röhren anfangs weiß, später gelbgrün (blauen bei Druck NICHT)",
      "bis zu 30 cm breiter, geschuppter Schirm, ein frei verschiebbarer doppelter Ring am langen, genatterten („schlangenhautartig gemusterten“) Stiel",
      "immergrüne Nadeln, die stets paarweise (zu zweit) in einer Kurztriebscheide sitzen; im oberen Stammbereich leuchtend fuchsrote „Spiegelrinde“"
    ],
    "exp": "Erkennungsmerkmal von Heidelbeere (Blaubeere): grün kantige Zweige, sommergrüne Blättchen und blauschwarze, innen tief dunkelblau färbende Beeren ab Juni/Juli."
  },
  {
    "id": 607,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: immergrüne, derb-ledrige, glänzende Blättchen (ähnlich Buchsbaum) und leuchtend rote, herb-säuerliche Beeren im Spätsommer?",
    "a": [
      "Preiselbeere (Kronsbeere)",
      "Echter Pfifferling (Eierschwamm)",
      "Grüner Knollenblätterpilz",
      "Hängebirke (Sandbirke)"
    ],
    "exp": "Preiselbeere (Kronsbeere) (Vaccinium vitis-idaea): In Schwarzenburg ist die Kombination aus Wildbraten und selbst gesammelten Wald-Preiselbeeren ein echter Klassiker."
  },
  {
    "id": 608,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Preiselbeere (Kronsbeere)“ (Vaccinium vitis-idaea) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "reich an Vitamin C sowie natürlicher Benzoe- und Salicylsäure, weshalb Preiselbeerkompott monatelang ohne Konservierungsstoffe hält",
      "würziger Speisepilz, der fast nie von Maden befallen wird",
      "tödlich giftig! Verursacht über 90 % aller tödlichen Pilzvergiftungen in Mitteleuropa durch hitzestabile Amatoxine",
      "besiedelt als lichthungriger Pionierbaum schnell offene Sandflächen; unter ihr wachsen Birkenpilze und Fliegenpilze"
    ],
    "exp": "Preiselbeere (Kronsbeere): reich an Vitamin C sowie natürlicher Benzoe- und Salicylsäure, weshalb Preiselbeerkompott monatelang ohne Konservierungsstoffe hält. In Schwarzenburg ist die Kombination aus Wildbraten und selbst gesammelten Wald-Preiselbeeren ein echter Klassiker."
  },
  {
    "id": 609,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Preiselbeere (Kronsbeere)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "In Schwarzenburg ist die Kombination aus Wildbraten und selbst gesammelten Wald-Preiselbeeren ein echter Klassiker.",
      "Vom ungenießbaren Falschen Pfifferling unterscheidet man ihn sicher an den dicken, querverbundenen Leisten, dem festen weißen Fleisch und dem Aprikosengeruch.",
      "Heimtückisch ist die lange Latenzzeit von 6 bis 24 Stunden, in der zunächst keine Symptome auftreten, während die Leber bereits geschädigt wird.",
      "Das in der weißen Birkenrinde enthaltene „Betulin“ reflektiert starkes Sonnenlicht und macht die Rinde selbst bei Regen wasserabweisend und brennbar."
    ],
    "exp": "Wichtig zu Preiselbeere (Kronsbeere) (Vaccinium vitis-idaea): In Schwarzenburg ist die Kombination aus Wildbraten und selbst gesammelten Wald-Preiselbeeren ein echter Klassiker."
  },
  {
    "id": 610,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „In Schwarzenburg ist die Kombination aus Wildbraten und selbst gesammelten Wald-Preiselbeeren ein echter Klassiker.“?",
    "a": [
      "Preiselbeere (Kronsbeere)",
      "Echter Pfifferling (Eierschwamm)",
      "Grüner Knollenblätterpilz",
      "Hängebirke (Sandbirke)"
    ],
    "exp": "Gemeint ist Preiselbeere (Kronsbeere) (Vaccinium vitis-idaea) – immergrüne, derb-ledrige, glänzende Blättchen (ähnlich Buchsbaum) und leuchtend rote, herb-säuerliche Beeren im Spätsommer."
  },
  {
    "id": 611,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Vaccinium vitis-idaea“?",
    "a": [
      "Preiselbeere (Kronsbeere)",
      "Echter Pfifferling (Eierschwamm)",
      "Grüner Knollenblätterpilz",
      "Hängebirke (Sandbirke)"
    ],
    "exp": "Vaccinium vitis-idaea ist der wissenschaftliche Name für Preiselbeere (Kronsbeere) (trockene, sonnige Kiefernwälder rund um Schwarzenburg)."
  },
  {
    "id": 612,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Preiselbeere (Kronsbeere)“ (trockene, sonnige Kiefernwälder rund um Schwarzenburg) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "immergrüne, derb-ledrige, glänzende Blättchen (ähnlich Buchsbaum) und leuchtend rote, herb-säuerliche Beeren im Spätsommer",
      "dottergelber, trichterförmig geschwungener Fruchtkörper mit gegabelten, herablaufenden Leisten (keine dünnen Lamellen!) und fruchtigem Aprikosenduft",
      "olivgrünlicher bis gelbgrünlicher Hut, reinweiße Lamellen (bleiben immer weiß!), Ring am Stiel und eine sackartige weiße Scheide („Volva“) um die Stielknolle im Boden",
      "auffallend weiße Rinde mit dunklen Rissen und bogig herabhängende, feine Zweige"
    ],
    "exp": "Erkennungsmerkmal von Preiselbeere (Kronsbeere): immergrüne, derb-ledrige, glänzende Blättchen (ähnlich Buchsbaum) und leuchtend rote, herb-säuerliche Beeren im Spätsommer."
  },
  {
    "id": 613,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: dreizählige, gezähnte Blätter, weiße Blüten und kleine rote Sammelnussfrüchte mit intensivem Waldaroma?",
    "a": [
      "Walderdbeere",
      "Krause Glucke (Fette Henne)",
      "Fliegenpilz",
      "Traubeneiche"
    ],
    "exp": "Walderdbeere (Fragaria vesca): Obwohl die Früchte viel kleiner als Gartenerdbeeren sind, besitzen sie ein vielfach intensiveres Aroma."
  },
  {
    "id": 614,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Walderdbeere“ (Fragaria vesca) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "perfekter, essbarer Bodendecker für die unterste Schicht eines naturnahen Waldgartens",
      "exzellenter, würzig-nussiger Speisepilz mit bissfestem Fleisch (z. B. paniert als Schnitzel oder in Rahmsoße)",
      "giftig (enthält Ibotensäure und Muscimol); wichtiger Mykorrhizapartner für Birken und Kiefern im Waldökosystem",
      "liefert im Herbst energiereiche Eicheln (Mast) für Wildschweine, Rothirsche, Eichelhäher und Eichhörnchen"
    ],
    "exp": "Walderdbeere: perfekter, essbarer Bodendecker für die unterste Schicht eines naturnahen Waldgartens. Obwohl die Früchte viel kleiner als Gartenerdbeeren sind, besitzen sie ein vielfach intensiveres Aroma."
  },
  {
    "id": 615,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Walderdbeere“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Obwohl die Früchte viel kleiner als Gartenerdbeeren sind, besitzen sie ein vielfach intensiveres Aroma.",
      "Vor dem Braten teilt man die Krause Glucke am besten in Scheiben und spült sie kurz in lauwarmem Wasser ab, um Kiefernnadeln und Waldsand aus den Windungen zu lösen.",
      "Der Name stammt daher, dass man früher gezuckerte Milch mit Fliegenpilzstückchen aufstellte, um Stubenfliegen zu betäuben.",
      "Gemeinsam mit der Stieleiche erhöht sie im Kiefernwald die Artenvielfalt (über 500 Insektenarten leben an Eichen!) und bremst Waldbrände."
    ],
    "exp": "Wichtig zu Walderdbeere (Fragaria vesca): Obwohl die Früchte viel kleiner als Gartenerdbeeren sind, besitzen sie ein vielfach intensiveres Aroma."
  },
  {
    "id": 616,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Obwohl die Früchte viel kleiner als Gartenerdbeeren sind, besitzen sie ein vielfach intensiveres Aroma.“?",
    "a": [
      "Walderdbeere",
      "Krause Glucke (Fette Henne)",
      "Fliegenpilz",
      "Traubeneiche"
    ],
    "exp": "Gemeint ist Walderdbeere (Fragaria vesca) – dreizählige, gezähnte Blätter, weiße Blüten und kleine rote Sammelnussfrüchte mit intensivem Waldaroma."
  },
  {
    "id": 617,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Fragaria vesca“?",
    "a": [
      "Walderdbeere",
      "Krause Glucke (Fette Henne)",
      "Fliegenpilz",
      "Traubeneiche"
    ],
    "exp": "Fragaria vesca ist der wissenschaftliche Name für Walderdbeere (sonnige Waldwege, Lichtungen und der heimische Waldgarten)."
  },
  {
    "id": 618,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Walderdbeere“ (sonnige Waldwege, Lichtungen und der heimische Waldgarten) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "dreizählige, gezähnte Blätter, weiße Blüten und kleine rote Sammelnussfrüchte mit intensivem Waldaroma",
      "bis zu 30 cm großer, gelblich-cremefarbener, kraus gewundener Fruchtkörper, der wie ein Badeschwamm oder Blumenkohl aussieht",
      "leuchtend roter Hut mit weißen Flocken (Velumresten), weiße Lamellen, beringter Stiel und warzig gegürtelte Knolle",
      "gelappte Blätter mit deutlichem Blattstiel, während die Eicheln ungestielt („traubig gehäuft“) am Zweig sitzen"
    ],
    "exp": "Erkennungsmerkmal von Walderdbeere: dreizählige, gezähnte Blätter, weiße Blüten und kleine rote Sammelnussfrüchte mit intensivem Waldaroma."
  },
  {
    "id": 619,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: duftende cremeweiße Blütenschirme im Juni und glänzend schwarze Beerendolden an rötlichen Stielen im September?",
    "a": [
      "Schwarzer Holunder",
      "Birkenpilz",
      "Gallenröhrling (Bitterling)",
      "Stieleiche (Deutsche Eiche)"
    ],
    "exp": "Schwarzer Holunder (Sambucus nigra): Altem Volksbrauch nach pflanzte man an jeden Hof einen Holunderbusch als guten Hausgeist („Vor dem Holunder soll man den Hut ziehen“)."
  },
  {
    "id": 620,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Schwarzer Holunder“ (Sambucus nigra) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "Blüten für Holunderblütensirup und „Hollerküchle“, gekochte Beeren für Saft und Gelee; Magnet für Mönchsgrasmücke und Star",
      "guter Speisepilz (besonders junge, feste Exemplare); wichtigster Symbiosepartner der Hängebirke",
      "nicht giftig, aber durch extremen Bitterstoff völlig ungenießbar – ein einziger Pilz verdirbt das gesamte Pilzgericht!",
      "kann über 500 bis 800 Jahre alt werden und bietet Hirschkäfer, Heldbock und Spechten Lebensraum"
    ],
    "exp": "Schwarzer Holunder: Blüten für Holunderblütensirup und „Hollerküchle“, gekochte Beeren für Saft und Gelee; Magnet für Mönchsgrasmücke und Star. Altem Volksbrauch nach pflanzte man an jeden Hof einen Holunderbusch als guten Hausgeist („Vor dem Holunder soll man den Hut ziehen“)."
  },
  {
    "id": 621,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Schwarzer Holunder“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Altem Volksbrauch nach pflanzte man an jeden Hof einen Holunderbusch als guten Hausgeist („Vor dem Holunder soll man den Hut ziehen“).",
      "Beim Kochen verfärbt sich das weiße Fleisch des Birkenpilzes dunkelgrau bis schwärzlich – das ist völlig normal und unbedenklich.",
      "Er ist der klassische „Täuscher“ für Steinpilz- und Maronensammler in den Kiefernwäldern der Lausitz.",
      "Merksatz für Spaziergänger: „Bei der Stieleiche hängen die Eicheln am Stiel, bei der Traubeneiche die Blätter!“"
    ],
    "exp": "Wichtig zu Schwarzer Holunder (Sambucus nigra): Altem Volksbrauch nach pflanzte man an jeden Hof einen Holunderbusch als guten Hausgeist („Vor dem Holunder soll man den Hut ziehen“)."
  },
  {
    "id": 622,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Altem Volksbrauch nach pflanzte man an jeden Hof einen Holunderbusch als guten Hausgeist („Vor dem Holunder soll man den Hut ziehen“).“?",
    "a": [
      "Schwarzer Holunder",
      "Birkenpilz",
      "Gallenröhrling (Bitterling)",
      "Stieleiche (Deutsche Eiche)"
    ],
    "exp": "Gemeint ist Schwarzer Holunder (Sambucus nigra) – duftende cremeweiße Blütenschirme im Juni und glänzend schwarze Beerendolden an rötlichen Stielen im September."
  },
  {
    "id": 623,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Sambucus nigra“?",
    "a": [
      "Schwarzer Holunder",
      "Birkenpilz",
      "Gallenröhrling (Bitterling)",
      "Stieleiche (Deutsche Eiche)"
    ],
    "exp": "Sambucus nigra ist der wissenschaftliche Name für Schwarzer Holunder (Bauernhöfe, Waldränder und Waldgärten in Schwarzenburg)."
  },
  {
    "id": 624,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Schwarzer Holunder“ (Bauernhöfe, Waldränder und Waldgärten in Schwarzenburg) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "duftende cremeweiße Blütenschirme im Juni und glänzend schwarze Beerendolden an rötlichen Stielen im September",
      "graubrauner, glatter Hut und schlanker, weißlicher Stiel, der dicht mit dunklen, rauen Schüppchen („Raufuß“) besetzt ist",
      "brauner Hut wie beim Steinpilz, aber grobes dunkles Netz am Stiel und im Alter schmutzig-rosa vorwölbende Röhren",
      "Blätter fast ungestielt mit kleinen „Öhrchen“ am Grund, dafür hängen die Eicheln an langen Stielen („Stieleiche“)"
    ],
    "exp": "Erkennungsmerkmal von Schwarzer Holunder: duftende cremeweiße Blütenschirme im Juni und glänzend schwarze Beerendolden an rötlichen Stielen im September."
  },
  {
    "id": 625,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: silbrig-graue, schmale Blätter, spitze Dornen und dicht gedrängte, leuchtend orangefarbene Beeren ab Spätsommer?",
    "a": [
      "Sanddorn",
      "Kiefern-Rotkappe (Fuchsrotkappe)",
      "Kahler Krempling",
      "Eberesche (Vogelbeere)"
    ],
    "exp": "Sanddorn (Hippophae rhamnoides): Sanddorn ist zweihäusig: Für eine reiche Beerenernte im Waldgarten braucht man mindestens einen männlichen Bestäuberstrauch neben den weiblichen Sträuchern."
  },
  {
    "id": 626,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Sanddorn“ (Hippophae rhamnoides) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "Pionierstrauch auf kargen Sandböden; seine Beeren enthalten bis zu zehnmal mehr Vitamin C als Zitronen („Zitrone des Nordens“)",
      "sehr geschätzter, festfleischiger Speisepilz; verfärbt sich im Anschnitt erst rötlich-violett, dann schwärzlich",
      "früher fälschlich als Speisepilz gesammelt, heute als lebensgefährlich giftig bekannt (löst nach wiederholtem Verzehr das tödliche Paxillus-Syndrom / Immunhämolysen aus)",
      "wichtigste Nahrungsquelle im Herbst und Winter für über 60 Vogelarten (Drosseln, Gimpel, Seidenschwanz) und Baummarder"
    ],
    "exp": "Sanddorn: Pionierstrauch auf kargen Sandböden; seine Beeren enthalten bis zu zehnmal mehr Vitamin C als Zitronen („Zitrone des Nordens“). Sanddorn ist zweihäusig: Für eine reiche Beerenernte im Waldgarten braucht man mindestens einen männlichen Bestäuberstrauch neben den weiblichen Sträuchern."
  },
  {
    "id": 627,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Sanddorn“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Sanddorn ist zweihäusig: Für eine reiche Beerenernte im Waldgarten braucht man mindestens einen männlichen Bestäuberstrauch neben den weiblichen Sträuchern.",
      "Wie alle Raufußröhrlinge sollten Rotkappen vor dem Verzehr stets gut durchgegart werden (mindestens 15 Minuten).",
      "Ein klassisches Beispiel dafür, warum man alte Pilzbücher vor 1980 nicht mehr zur Bestimmung von Speisepilzen nutzen sollte.",
      "Trotz des Volksglaubens sind Vogelbeeren nicht giftig: Gekocht als Gelee oder Konfitüre (oder nach dem ersten Frost) verlieren sie ihre bittere Parasorbinsäure."
    ],
    "exp": "Wichtig zu Sanddorn (Hippophae rhamnoides): Sanddorn ist zweihäusig: Für eine reiche Beerenernte im Waldgarten braucht man mindestens einen männlichen Bestäuberstrauch neben den weiblichen Sträuchern."
  },
  {
    "id": 628,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Sanddorn ist zweihäusig: Für eine reiche Beerenernte im Waldgarten braucht man mindestens einen männlichen Bestäuberstrauch neben den weiblichen Sträuchern.“?",
    "a": [
      "Sanddorn",
      "Kiefern-Rotkappe (Fuchsrotkappe)",
      "Kahler Krempling",
      "Eberesche (Vogelbeere)"
    ],
    "exp": "Gemeint ist Sanddorn (Hippophae rhamnoides) – silbrig-graue, schmale Blätter, spitze Dornen und dicht gedrängte, leuchtend orangefarbene Beeren ab Spätsommer."
  },
  {
    "id": 629,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Hippophae rhamnoides“?",
    "a": [
      "Sanddorn",
      "Kiefern-Rotkappe (Fuchsrotkappe)",
      "Kahler Krempling",
      "Eberesche (Vogelbeere)"
    ],
    "exp": "Hippophae rhamnoides ist der wissenschaftliche Name für Sanddorn (sonnige Sandböschungen, Bergbaufolgelandschaften und Waldgärten Brandenburgs)."
  },
  {
    "id": 630,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Sanddorn“ (sonnige Sandböschungen, Bergbaufolgelandschaften und Waldgärten Brandenburgs) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "silbrig-graue, schmale Blätter, spitze Dornen und dicht gedrängte, leuchtend orangefarbene Beeren ab Spätsommer",
      "leuchtend orangeroter bis fuchsroter Hut mit überstehender Huthaut am Rand und rau geschupptem Stiel",
      "ockerbrauner Hut mit stark eingerolltem, filzigem Rand und herablaufenden Lamellen, die bei Fingerdruck sofort rostbraun flecken",
      "gefiederte Blätter, weiße Blütendolden im Mai und leuchtend korallenrote Beerendolden ab Spätsommer"
    ],
    "exp": "Erkennungsmerkmal von Sanddorn: silbrig-graue, schmale Blätter, spitze Dornen und dicht gedrängte, leuchtend orangefarbene Beeren ab Spätsommer."
  },
  {
    "id": 631,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: blüht bereits im April vor dem Laubaustrieb wie eine weiße Schneewolke; blauschwarze, bereifte Steinfrüchte im Herbst?",
    "a": [
      "Schlehe (Schwarzdorn)",
      "Butterpilz (Butter-Röhrling)",
      "Frühjahrslorchel (Giftlorchel)",
      "Schwarzerle (Roterle)"
    ],
    "exp": "Schlehe (Schwarzdorn) (Prunus spinosa): Erst nach den ersten strengen Herbstfrösten wird der zusammenziehende Gerbstoff in den Schlehen abgebaut, sodass sie mild und aromatisch für Likör oder Marmelade werden."
  },
  {
    "id": 632,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Schlehe (Schwarzdorn)“ (Prunus spinosa) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "undurchdringlicher Brutplatz für Neuntöter und Goldammer; Raupenfutterpflanze des Segelfalters und Nierenfleck-Zipfelfalters",
      "milder, zarter Speisepilz und treuer Begleiter der Waldkiefer",
      "lebensgefährlich giftig! Enthält das flüchtige Zell- und Lebergift Gyromitrin",
      "ihre Wurzeln leben in Symbiose mit Knöllchenbakterien (Frankia), die Luftstickstoff binden, und vertragen monatelange Überflutung"
    ],
    "exp": "Schlehe (Schwarzdorn): undurchdringlicher Brutplatz für Neuntöter und Goldammer; Raupenfutterpflanze des Segelfalters und Nierenfleck-Zipfelfalters. Erst nach den ersten strengen Herbstfrösten wird der zusammenziehende Gerbstoff in den Schlehen abgebaut, sodass sie mild und aromatisch für Likör oder Marmelade werden."
  },
  {
    "id": 633,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Schlehe (Schwarzdorn)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Erst nach den ersten strengen Herbstfrösten wird der zusammenziehende Gerbstoff in den Schlehen abgebaut, sodass sie mild und aromatisch für Likör oder Marmelade werden.",
      "Tipp für Sammler: Die klebrige braune Huthaut lässt sich schon im Wald wie von selbst komplett vom Hut abziehen.",
      "Sie darf keinesfalls mit der essbaren, wabenförmig gekammerten Speisemorchel verwechselt werden.",
      "Frisch geschlagenes Erlenholz färbt sich an der Luft rasch leuchtend orangerot – daher auch der Name „Roterle“."
    ],
    "exp": "Wichtig zu Schlehe (Schwarzdorn) (Prunus spinosa): Erst nach den ersten strengen Herbstfrösten wird der zusammenziehende Gerbstoff in den Schlehen abgebaut, sodass sie mild und aromatisch für Likör oder Marmelade werden."
  },
  {
    "id": 634,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Erst nach den ersten strengen Herbstfrösten wird der zusammenziehende Gerbstoff in den Schlehen abgebaut, sodass sie mild und aromatisch für Likör oder Marmelade werden.“?",
    "a": [
      "Schlehe (Schwarzdorn)",
      "Butterpilz (Butter-Röhrling)",
      "Frühjahrslorchel (Giftlorchel)",
      "Schwarzerle (Roterle)"
    ],
    "exp": "Gemeint ist Schlehe (Schwarzdorn) (Prunus spinosa) – blüht bereits im April vor dem Laubaustrieb wie eine weiße Schneewolke; blauschwarze, bereifte Steinfrüchte im Herbst."
  },
  {
    "id": 635,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Prunus spinosa“?",
    "a": [
      "Schlehe (Schwarzdorn)",
      "Butterpilz (Butter-Röhrling)",
      "Frühjahrslorchel (Giftlorchel)",
      "Schwarzerle (Roterle)"
    ],
    "exp": "Prunus spinosa ist der wissenschaftliche Name für Schlehe (Schwarzdorn) (sonnige Waldränder und Feldhecken rund um Heideblick)."
  },
  {
    "id": 636,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Schlehe (Schwarzdorn)“ (sonnige Waldränder und Feldhecken rund um Heideblick) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "blüht bereits im April vor dem Laubaustrieb wie eine weiße Schneewolke; blauschwarze, bereifte Steinfrüchte im Herbst",
      "schokoladenbrauner, bei Feuchtigkeit schleimiger Hut, gelbe Poren und ein deutlicher häutiger Ring am Stiel",
      "rotbrauner, hirnartig gewundener Hut (nicht wabenförmig wie bei der essbaren Speisemorchel!) auf weißlichem Stiel",
      "rundliche, vorne leicht eingebuchtete Blätter und kleine, holzige schwarze „Erlenzäpfchen“, die den ganzen Winter am Baum bleiben"
    ],
    "exp": "Erkennungsmerkmal von Schlehe (Schwarzdorn): blüht bereits im April vor dem Laubaustrieb wie eine weiße Schneewolke; blauschwarze, bereifte Steinfrüchte im Herbst."
  },
  {
    "id": 637,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: kastanienbrauner Hut, gelbliche bis grünlich-gelbe Röhren unter dem Hut, die sich bei Fingerdruck sofort bläulich verfärben?",
    "a": [
      "Maronenröhrling (Braunkappe)",
      "Edel-Reizker (Kiefern-Reizker)",
      "Echte Rentierflechte",
      "Besenheide (Heidekraut)"
    ],
    "exp": "Maronenröhrling (Braunkappe) (Imleria badia): Im Gegensatz zum bitteren Gallenröhrling hat die Marone niemals rosa Röhren und kein dunkles Netz am Stiel."
  },
  {
    "id": 638,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Maronenröhrling (Braunkappe)“ (Imleria badia) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "Mykorrhizapartner von Kiefer und Fichte von August bis November; hervorragender Brat- und Trockenpilz",
      "hervorragender Bratpilz aus der Gattung der Milchlinge",
      "Flechten sind eine Lebensgemeinschaft (Symbiose) aus einem Pilz und einer Grünalge; Zeiger für saubere Luft und nährstoffarme Naturböden",
      "späte und enorm ergiebige Nektarquelle für Honigbienen („Heidehonig“), Wildbienen und Schmetterlinge im Spätsommer"
    ],
    "exp": "Maronenröhrling (Braunkappe): Mykorrhizapartner von Kiefer und Fichte von August bis November; hervorragender Brat- und Trockenpilz. Im Gegensatz zum bitteren Gallenröhrling hat die Marone niemals rosa Röhren und kein dunkles Netz am Stiel."
  },
  {
    "id": 639,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Maronenröhrling (Braunkappe)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Im Gegensatz zum bitteren Gallenröhrling hat die Marone niemals rosa Röhren und kein dunkles Netz am Stiel.",
      "Alle Reizker, die beim Anschneiden sofort karottenrote bis weinrote (nicht weiße!) Milch absondern, sind essbar.",
      "Bitte beim Wandern nicht zertreten: Ein Flechtenpolster im trockenen Kiefernwald wächst nur wenige Millimeter pro Jahr!",
      "Früher band man aus den zähen, verzweigten Zweigen haltbare Stall- und Hofbesen – daher der Name „Besenheide“."
    ],
    "exp": "Wichtig zu Maronenröhrling (Braunkappe) (Imleria badia): Im Gegensatz zum bitteren Gallenröhrling hat die Marone niemals rosa Röhren und kein dunkles Netz am Stiel."
  },
  {
    "id": 640,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Im Gegensatz zum bitteren Gallenröhrling hat die Marone niemals rosa Röhren und kein dunkles Netz am Stiel.“?",
    "a": [
      "Maronenröhrling (Braunkappe)",
      "Edel-Reizker (Kiefern-Reizker)",
      "Echte Rentierflechte",
      "Besenheide (Heidekraut)"
    ],
    "exp": "Gemeint ist Maronenröhrling (Braunkappe) (Imleria badia) – kastanienbrauner Hut, gelbliche bis grünlich-gelbe Röhren unter dem Hut, die sich bei Fingerdruck sofort bläulich verfärben."
  },
  {
    "id": 641,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Imleria badia“?",
    "a": [
      "Maronenröhrling (Braunkappe)",
      "Edel-Reizker (Kiefern-Reizker)",
      "Echte Rentierflechte",
      "Besenheide (Heidekraut)"
    ],
    "exp": "Imleria badia ist der wissenschaftliche Name für Maronenröhrling (Braunkappe) (Speisepilz Nr. 1 der Schwarzenburger Kiefernwälder)."
  },
  {
    "id": 642,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Maronenröhrling (Braunkappe)“ (Speisepilz Nr. 1 der Schwarzenburger Kiefernwälder) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "kastanienbrauner Hut, gelbliche bis grünlich-gelbe Röhren unter dem Hut, die sich bei Fingerdruck sofort bläulich verfärben",
      "orangefarbener, konzentrisch gezonte Kreise zeigender Hut mit kleinen Grübchen am Stiel; tritt bei Verletzung leuchtend karottenrote Milch aus",
      "buschig verzweigte, silbrig-grauweiße bis grünliche Polster am Waldboden, die bei Trockenheit knistern und bei Regen weich wie ein Schwamm werden",
      "immergrüner Zwergstrauch mit winzigen, schuppenförmigen Blättchen und violett-rosa Blütenteppich von August bis Oktober"
    ],
    "exp": "Erkennungsmerkmal von Maronenröhrling (Braunkappe): kastanienbrauner Hut, gelbliche bis grünlich-gelbe Röhren unter dem Hut, die sich bei Fingerdruck sofort bläulich verfärben."
  },
  {
    "id": 643,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: brauner Hut, bauchiger Stiel mit feinem weißem Adernetz im oberen Teil; Röhren anfangs weiß, später gelbgrün (blauen bei Druck NICHT)?",
    "a": [
      "Steinpilz (Fichten-/Kiefernsteinpilz)",
      "Parasol (Riesenschirmling)",
      "Waldkiefer (Gemeine Kiefer)",
      "Heidelbeere (Blaubeere)"
    ],
    "exp": "Steinpilz (Fichten-/Kiefernsteinpilz) (Boletus edulis / pinophilus): Sein häufigster ungenießbarer Doppelgänger ist der Gallenröhrling („Bitterling“), dessen Röhren im Alter schmutzig-rosa werden und der ein grobes dunkles Stielnetz trägt."
  },
  {
    "id": 644,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Steinpilz (Fichten-/Kiefernsteinpilz)“ (Boletus edulis / pinophilus) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "einer der edelsten Speisepilze mit festem, weißem, mild-nussigem Fleisch; lässt sich hervorragend im Dörrautomaten trocknen",
      "die großen, nussig riechenden Hüte schmecken paniert und in Butter gebraten wie ein Wiener Schnitzel",
      "tiefreichende Pfahlwurzel trotzt Stürmen und langer Sommertrockenheit auf den Lausitzer Sandböden",
      "beliebtes Sammelobst für Kuchen und Pfannkuchen sowie Hauptnahrung für Fuchs, Dachs, Marder und Waldvögel"
    ],
    "exp": "Steinpilz (Fichten-/Kiefernsteinpilz): einer der edelsten Speisepilze mit festem, weißem, mild-nussigem Fleisch; lässt sich hervorragend im Dörrautomaten trocknen. Sein häufigster ungenießbarer Doppelgänger ist der Gallenröhrling („Bitterling“), dessen Röhren im Alter schmutzig-rosa werden und der ein grobes dunkles Stielnetz trägt."
  },
  {
    "id": 645,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Steinpilz (Fichten-/Kiefernsteinpilz)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Sein häufigster ungenießbarer Doppelgänger ist der Gallenröhrling („Bitterling“), dessen Röhren im Alter schmutzig-rosa werden und der ein grobes dunkles Stielnetz trägt.",
      "Wichtiges Sicherheitsmerkmal: Der Stiel ist deutlich dunkel genattert und der Ring lässt sich am Stiel frei auf und ab schieben.",
      "Ihre harzreichen Nadeln verströmen an warmen Sommertagen den typischen würzigen Duft der märkischen Kiefernheide.",
      "Im Gegensatz zur gezüchteten Kulturheidelbeere (mit hellem Fruchtfleisch) färbt die echte Waldheidelbeere Zunge und Lippen kräftig blaurot."
    ],
    "exp": "Wichtig zu Steinpilz (Fichten-/Kiefernsteinpilz) (Boletus edulis / pinophilus): Sein häufigster ungenießbarer Doppelgänger ist der Gallenröhrling („Bitterling“), dessen Röhren im Alter schmutzig-rosa werden und der ein grobes dunkles Stielnetz trägt."
  },
  {
    "id": 646,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Sein häufigster ungenießbarer Doppelgänger ist der Gallenröhrling („Bitterling“), dessen Röhren im Alter schmutzig-rosa werden und der ein grobes dunkles Stielnetz trägt.“?",
    "a": [
      "Steinpilz (Fichten-/Kiefernsteinpilz)",
      "Parasol (Riesenschirmling)",
      "Waldkiefer (Gemeine Kiefer)",
      "Heidelbeere (Blaubeere)"
    ],
    "exp": "Gemeint ist Steinpilz (Fichten-/Kiefernsteinpilz) (Boletus edulis / pinophilus) – brauner Hut, bauchiger Stiel mit feinem weißem Adernetz im oberen Teil; Röhren anfangs weiß, später gelbgrün (blauen bei Druck NICHT)."
  },
  {
    "id": 647,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Boletus edulis / pinophilus“?",
    "a": [
      "Steinpilz (Fichten-/Kiefernsteinpilz)",
      "Parasol (Riesenschirmling)",
      "Waldkiefer (Gemeine Kiefer)",
      "Heidelbeere (Blaubeere)"
    ],
    "exp": "Boletus edulis / pinophilus ist der wissenschaftliche Name für Steinpilz (Fichten-/Kiefernsteinpilz) (lichte Kiefern-, Eichen- und Birkenwälder rund um Schwarzenburg)."
  },
  {
    "id": 648,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Steinpilz (Fichten-/Kiefernsteinpilz)“ (lichte Kiefern-, Eichen- und Birkenwälder rund um Schwarzenburg) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "brauner Hut, bauchiger Stiel mit feinem weißem Adernetz im oberen Teil; Röhren anfangs weiß, später gelbgrün (blauen bei Druck NICHT)",
      "bis zu 30 cm breiter, geschuppter Schirm, ein frei verschiebbarer doppelter Ring am langen, genatterten („schlangenhautartig gemusterten“) Stiel",
      "immergrüne Nadeln, die stets paarweise (zu zweit) in einer Kurztriebscheide sitzen; im oberen Stammbereich leuchtend fuchsrote „Spiegelrinde“",
      "grün kantige Zweige, sommergrüne Blättchen und blauschwarze, innen tief dunkelblau färbende Beeren ab Juni/Juli"
    ],
    "exp": "Erkennungsmerkmal von Steinpilz (Fichten-/Kiefernsteinpilz): brauner Hut, bauchiger Stiel mit feinem weißem Adernetz im oberen Teil; Röhren anfangs weiß, später gelbgrün (blauen bei Druck NICHT)."
  },
  {
    "id": 649,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: dottergelber, trichterförmig geschwungener Fruchtkörper mit gegabelten, herablaufenden Leisten (keine dünnen Lamellen!) und fruchtigem Aprikosenduft?",
    "a": [
      "Echter Pfifferling (Eierschwamm)",
      "Grüner Knollenblätterpilz",
      "Hängebirke (Sandbirke)",
      "Preiselbeere (Kronsbeere)"
    ],
    "exp": "Echter Pfifferling (Eierschwamm) (Cantharellus cibarius): Vom ungenießbaren Falschen Pfifferling unterscheidet man ihn sicher an den dicken, querverbundenen Leisten, dem festen weißen Fleisch und dem Aprikosengeruch."
  },
  {
    "id": 650,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Echter Pfifferling (Eierschwamm)“ (Cantharellus cibarius) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "würziger Speisepilz, der fast nie von Maden befallen wird",
      "tödlich giftig! Verursacht über 90 % aller tödlichen Pilzvergiftungen in Mitteleuropa durch hitzestabile Amatoxine",
      "besiedelt als lichthungriger Pionierbaum schnell offene Sandflächen; unter ihr wachsen Birkenpilze und Fliegenpilze",
      "reich an Vitamin C sowie natürlicher Benzoe- und Salicylsäure, weshalb Preiselbeerkompott monatelang ohne Konservierungsstoffe hält"
    ],
    "exp": "Echter Pfifferling (Eierschwamm): würziger Speisepilz, der fast nie von Maden befallen wird. Vom ungenießbaren Falschen Pfifferling unterscheidet man ihn sicher an den dicken, querverbundenen Leisten, dem festen weißen Fleisch und dem Aprikosengeruch."
  },
  {
    "id": 651,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Echter Pfifferling (Eierschwamm)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Vom ungenießbaren Falschen Pfifferling unterscheidet man ihn sicher an den dicken, querverbundenen Leisten, dem festen weißen Fleisch und dem Aprikosengeruch.",
      "Heimtückisch ist die lange Latenzzeit von 6 bis 24 Stunden, in der zunächst keine Symptome auftreten, während die Leber bereits geschädigt wird.",
      "Das in der weißen Birkenrinde enthaltene „Betulin“ reflektiert starkes Sonnenlicht und macht die Rinde selbst bei Regen wasserabweisend und brennbar.",
      "In Schwarzenburg ist die Kombination aus Wildbraten und selbst gesammelten Wald-Preiselbeeren ein echter Klassiker."
    ],
    "exp": "Wichtig zu Echter Pfifferling (Eierschwamm) (Cantharellus cibarius): Vom ungenießbaren Falschen Pfifferling unterscheidet man ihn sicher an den dicken, querverbundenen Leisten, dem festen weißen Fleisch und dem Aprikosengeruch."
  },
  {
    "id": 652,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Vom ungenießbaren Falschen Pfifferling unterscheidet man ihn sicher an den dicken, querverbundenen Leisten, dem festen weißen Fleisch und dem Aprikosengeruch.“?",
    "a": [
      "Echter Pfifferling (Eierschwamm)",
      "Grüner Knollenblätterpilz",
      "Hängebirke (Sandbirke)",
      "Preiselbeere (Kronsbeere)"
    ],
    "exp": "Gemeint ist Echter Pfifferling (Eierschwamm) (Cantharellus cibarius) – dottergelber, trichterförmig geschwungener Fruchtkörper mit gegabelten, herablaufenden Leisten (keine dünnen Lamellen!) und fruchtigem Aprikosenduft."
  },
  {
    "id": 653,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Cantharellus cibarius“?",
    "a": [
      "Echter Pfifferling (Eierschwamm)",
      "Grüner Knollenblätterpilz",
      "Hängebirke (Sandbirke)",
      "Preiselbeere (Kronsbeere)"
    ],
    "exp": "Cantharellus cibarius ist der wissenschaftliche Name für Echter Pfifferling (Eierschwamm) (moosige Kiefern- und Mischwälder von Juni bis Oktober)."
  },
  {
    "id": 654,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Echter Pfifferling (Eierschwamm)“ (moosige Kiefern- und Mischwälder von Juni bis Oktober) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "dottergelber, trichterförmig geschwungener Fruchtkörper mit gegabelten, herablaufenden Leisten (keine dünnen Lamellen!) und fruchtigem Aprikosenduft",
      "olivgrünlicher bis gelbgrünlicher Hut, reinweiße Lamellen (bleiben immer weiß!), Ring am Stiel und eine sackartige weiße Scheide („Volva“) um die Stielknolle im Boden",
      "auffallend weiße Rinde mit dunklen Rissen und bogig herabhängende, feine Zweige",
      "immergrüne, derb-ledrige, glänzende Blättchen (ähnlich Buchsbaum) und leuchtend rote, herb-säuerliche Beeren im Spätsommer"
    ],
    "exp": "Erkennungsmerkmal von Echter Pfifferling (Eierschwamm): dottergelber, trichterförmig geschwungener Fruchtkörper mit gegabelten, herablaufenden Leisten (keine dünnen Lamellen!) und fruchtigem Aprikosenduft."
  },
  {
    "id": 655,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: bis zu 30 cm großer, gelblich-cremefarbener, kraus gewundener Fruchtkörper, der wie ein Badeschwamm oder Blumenkohl aussieht?",
    "a": [
      "Krause Glucke (Fette Henne)",
      "Fliegenpilz",
      "Traubeneiche",
      "Walderdbeere"
    ],
    "exp": "Krause Glucke (Fette Henne) (Sparassis crispa): Vor dem Braten teilt man die Krause Glucke am besten in Scheiben und spült sie kurz in lauwarmem Wasser ab, um Kiefernnadeln und Waldsand aus den Windungen zu lösen."
  },
  {
    "id": 656,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Krause Glucke (Fette Henne)“ (Sparassis crispa) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "exzellenter, würzig-nussiger Speisepilz mit bissfestem Fleisch (z. B. paniert als Schnitzel oder in Rahmsoße)",
      "giftig (enthält Ibotensäure und Muscimol); wichtiger Mykorrhizapartner für Birken und Kiefern im Waldökosystem",
      "liefert im Herbst energiereiche Eicheln (Mast) für Wildschweine, Rothirsche, Eichelhäher und Eichhörnchen",
      "perfekter, essbarer Bodendecker für die unterste Schicht eines naturnahen Waldgartens"
    ],
    "exp": "Krause Glucke (Fette Henne): exzellenter, würzig-nussiger Speisepilz mit bissfestem Fleisch (z. B. paniert als Schnitzel oder in Rahmsoße). Vor dem Braten teilt man die Krause Glucke am besten in Scheiben und spült sie kurz in lauwarmem Wasser ab, um Kiefernnadeln und Waldsand aus den Windungen zu lösen."
  },
  {
    "id": 657,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Krause Glucke (Fette Henne)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Vor dem Braten teilt man die Krause Glucke am besten in Scheiben und spült sie kurz in lauwarmem Wasser ab, um Kiefernnadeln und Waldsand aus den Windungen zu lösen.",
      "Der Name stammt daher, dass man früher gezuckerte Milch mit Fliegenpilzstückchen aufstellte, um Stubenfliegen zu betäuben.",
      "Gemeinsam mit der Stieleiche erhöht sie im Kiefernwald die Artenvielfalt (über 500 Insektenarten leben an Eichen!) und bremst Waldbrände.",
      "Obwohl die Früchte viel kleiner als Gartenerdbeeren sind, besitzen sie ein vielfach intensiveres Aroma."
    ],
    "exp": "Wichtig zu Krause Glucke (Fette Henne) (Sparassis crispa): Vor dem Braten teilt man die Krause Glucke am besten in Scheiben und spült sie kurz in lauwarmem Wasser ab, um Kiefernnadeln und Waldsand aus den Windungen zu lösen."
  },
  {
    "id": 658,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Vor dem Braten teilt man die Krause Glucke am besten in Scheiben und spült sie kurz in lauwarmem Wasser ab, um Kiefernnadeln und Waldsand aus den Windungen zu lösen.“?",
    "a": [
      "Krause Glucke (Fette Henne)",
      "Fliegenpilz",
      "Traubeneiche",
      "Walderdbeere"
    ],
    "exp": "Gemeint ist Krause Glucke (Fette Henne) (Sparassis crispa) – bis zu 30 cm großer, gelblich-cremefarbener, kraus gewundener Fruchtkörper, der wie ein Badeschwamm oder Blumenkohl aussieht."
  },
  {
    "id": 659,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Sparassis crispa“?",
    "a": [
      "Krause Glucke (Fette Henne)",
      "Fliegenpilz",
      "Traubeneiche",
      "Walderdbeere"
    ],
    "exp": "Sparassis crispa ist der wissenschaftliche Name für Krause Glucke (Fette Henne) (wächst von August bis November direkt am Stammfuß alter Kiefern um Schwarzenburg)."
  },
  {
    "id": 660,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Krause Glucke (Fette Henne)“ (wächst von August bis November direkt am Stammfuß alter Kiefern um Schwarzenburg) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "bis zu 30 cm großer, gelblich-cremefarbener, kraus gewundener Fruchtkörper, der wie ein Badeschwamm oder Blumenkohl aussieht",
      "leuchtend roter Hut mit weißen Flocken (Velumresten), weiße Lamellen, beringter Stiel und warzig gegürtelte Knolle",
      "gelappte Blätter mit deutlichem Blattstiel, während die Eicheln ungestielt („traubig gehäuft“) am Zweig sitzen",
      "dreizählige, gezähnte Blätter, weiße Blüten und kleine rote Sammelnussfrüchte mit intensivem Waldaroma"
    ],
    "exp": "Erkennungsmerkmal von Krause Glucke (Fette Henne): bis zu 30 cm großer, gelblich-cremefarbener, kraus gewundener Fruchtkörper, der wie ein Badeschwamm oder Blumenkohl aussieht."
  },
  {
    "id": 661,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: graubrauner, glatter Hut und schlanker, weißlicher Stiel, der dicht mit dunklen, rauen Schüppchen („Raufuß“) besetzt ist?",
    "a": [
      "Birkenpilz",
      "Gallenröhrling (Bitterling)",
      "Stieleiche (Deutsche Eiche)",
      "Schwarzer Holunder"
    ],
    "exp": "Birkenpilz (Leccinum scabrum): Beim Kochen verfärbt sich das weiße Fleisch des Birkenpilzes dunkelgrau bis schwärzlich – das ist völlig normal und unbedenklich."
  },
  {
    "id": 662,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Birkenpilz“ (Leccinum scabrum) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "guter Speisepilz (besonders junge, feste Exemplare); wichtigster Symbiosepartner der Hängebirke",
      "nicht giftig, aber durch extremen Bitterstoff völlig ungenießbar – ein einziger Pilz verdirbt das gesamte Pilzgericht!",
      "kann über 500 bis 800 Jahre alt werden und bietet Hirschkäfer, Heldbock und Spechten Lebensraum",
      "Blüten für Holunderblütensirup und „Hollerküchle“, gekochte Beeren für Saft und Gelee; Magnet für Mönchsgrasmücke und Star"
    ],
    "exp": "Birkenpilz: guter Speisepilz (besonders junge, feste Exemplare); wichtigster Symbiosepartner der Hängebirke. Beim Kochen verfärbt sich das weiße Fleisch des Birkenpilzes dunkelgrau bis schwärzlich – das ist völlig normal und unbedenklich."
  },
  {
    "id": 663,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Birkenpilz“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Beim Kochen verfärbt sich das weiße Fleisch des Birkenpilzes dunkelgrau bis schwärzlich – das ist völlig normal und unbedenklich.",
      "Er ist der klassische „Täuscher“ für Steinpilz- und Maronensammler in den Kiefernwäldern der Lausitz.",
      "Merksatz für Spaziergänger: „Bei der Stieleiche hängen die Eicheln am Stiel, bei der Traubeneiche die Blätter!“",
      "Altem Volksbrauch nach pflanzte man an jeden Hof einen Holunderbusch als guten Hausgeist („Vor dem Holunder soll man den Hut ziehen“)."
    ],
    "exp": "Wichtig zu Birkenpilz (Leccinum scabrum): Beim Kochen verfärbt sich das weiße Fleisch des Birkenpilzes dunkelgrau bis schwärzlich – das ist völlig normal und unbedenklich."
  },
  {
    "id": 664,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Beim Kochen verfärbt sich das weiße Fleisch des Birkenpilzes dunkelgrau bis schwärzlich – das ist völlig normal und unbedenklich.“?",
    "a": [
      "Birkenpilz",
      "Gallenröhrling (Bitterling)",
      "Stieleiche (Deutsche Eiche)",
      "Schwarzer Holunder"
    ],
    "exp": "Gemeint ist Birkenpilz (Leccinum scabrum) – graubrauner, glatter Hut und schlanker, weißlicher Stiel, der dicht mit dunklen, rauen Schüppchen („Raufuß“) besetzt ist."
  },
  {
    "id": 665,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Leccinum scabrum“?",
    "a": [
      "Birkenpilz",
      "Gallenröhrling (Bitterling)",
      "Stieleiche (Deutsche Eiche)",
      "Schwarzer Holunder"
    ],
    "exp": "Leccinum scabrum ist der wissenschaftliche Name für Birkenpilz (unter Birken an Waldrändern, Lichtungen und feuchten Senken)."
  },
  {
    "id": 666,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Birkenpilz“ (unter Birken an Waldrändern, Lichtungen und feuchten Senken) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "graubrauner, glatter Hut und schlanker, weißlicher Stiel, der dicht mit dunklen, rauen Schüppchen („Raufuß“) besetzt ist",
      "brauner Hut wie beim Steinpilz, aber grobes dunkles Netz am Stiel und im Alter schmutzig-rosa vorwölbende Röhren",
      "Blätter fast ungestielt mit kleinen „Öhrchen“ am Grund, dafür hängen die Eicheln an langen Stielen („Stieleiche“)",
      "duftende cremeweiße Blütenschirme im Juni und glänzend schwarze Beerendolden an rötlichen Stielen im September"
    ],
    "exp": "Erkennungsmerkmal von Birkenpilz: graubrauner, glatter Hut und schlanker, weißlicher Stiel, der dicht mit dunklen, rauen Schüppchen („Raufuß“) besetzt ist."
  },
  {
    "id": 667,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: leuchtend orangeroter bis fuchsroter Hut mit überstehender Huthaut am Rand und rau geschupptem Stiel?",
    "a": [
      "Kiefern-Rotkappe (Fuchsrotkappe)",
      "Kahler Krempling",
      "Eberesche (Vogelbeere)",
      "Sanddorn"
    ],
    "exp": "Kiefern-Rotkappe (Fuchsrotkappe) (Leccinum vulpinum / aurantiacum): Wie alle Raufußröhrlinge sollten Rotkappen vor dem Verzehr stets gut durchgegart werden (mindestens 15 Minuten)."
  },
  {
    "id": 668,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Kiefern-Rotkappe (Fuchsrotkappe)“ (Leccinum vulpinum / aurantiacum) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "sehr geschätzter, festfleischiger Speisepilz; verfärbt sich im Anschnitt erst rötlich-violett, dann schwärzlich",
      "früher fälschlich als Speisepilz gesammelt, heute als lebensgefährlich giftig bekannt (löst nach wiederholtem Verzehr das tödliche Paxillus-Syndrom / Immunhämolysen aus)",
      "wichtigste Nahrungsquelle im Herbst und Winter für über 60 Vogelarten (Drosseln, Gimpel, Seidenschwanz) und Baummarder",
      "Pionierstrauch auf kargen Sandböden; seine Beeren enthalten bis zu zehnmal mehr Vitamin C als Zitronen („Zitrone des Nordens“)"
    ],
    "exp": "Kiefern-Rotkappe (Fuchsrotkappe): sehr geschätzter, festfleischiger Speisepilz; verfärbt sich im Anschnitt erst rötlich-violett, dann schwärzlich. Wie alle Raufußröhrlinge sollten Rotkappen vor dem Verzehr stets gut durchgegart werden (mindestens 15 Minuten)."
  },
  {
    "id": 669,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Kiefern-Rotkappe (Fuchsrotkappe)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Wie alle Raufußröhrlinge sollten Rotkappen vor dem Verzehr stets gut durchgegart werden (mindestens 15 Minuten).",
      "Ein klassisches Beispiel dafür, warum man alte Pilzbücher vor 1980 nicht mehr zur Bestimmung von Speisepilzen nutzen sollte.",
      "Trotz des Volksglaubens sind Vogelbeeren nicht giftig: Gekocht als Gelee oder Konfitüre (oder nach dem ersten Frost) verlieren sie ihre bittere Parasorbinsäure.",
      "Sanddorn ist zweihäusig: Für eine reiche Beerenernte im Waldgarten braucht man mindestens einen männlichen Bestäuberstrauch neben den weiblichen Sträuchern."
    ],
    "exp": "Wichtig zu Kiefern-Rotkappe (Fuchsrotkappe) (Leccinum vulpinum / aurantiacum): Wie alle Raufußröhrlinge sollten Rotkappen vor dem Verzehr stets gut durchgegart werden (mindestens 15 Minuten)."
  },
  {
    "id": 670,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Wie alle Raufußröhrlinge sollten Rotkappen vor dem Verzehr stets gut durchgegart werden (mindestens 15 Minuten).“?",
    "a": [
      "Kiefern-Rotkappe (Fuchsrotkappe)",
      "Kahler Krempling",
      "Eberesche (Vogelbeere)",
      "Sanddorn"
    ],
    "exp": "Gemeint ist Kiefern-Rotkappe (Fuchsrotkappe) (Leccinum vulpinum / aurantiacum) – leuchtend orangeroter bis fuchsroter Hut mit überstehender Huthaut am Rand und rau geschupptem Stiel."
  },
  {
    "id": 671,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Leccinum vulpinum / aurantiacum“?",
    "a": [
      "Kiefern-Rotkappe (Fuchsrotkappe)",
      "Kahler Krempling",
      "Eberesche (Vogelbeere)",
      "Sanddorn"
    ],
    "exp": "Leccinum vulpinum / aurantiacum ist der wissenschaftliche Name für Kiefern-Rotkappe (Fuchsrotkappe) (unter Kiefern, Birken und Zitterpappeln in den Lausitzer Wäldern)."
  },
  {
    "id": 672,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Kiefern-Rotkappe (Fuchsrotkappe)“ (unter Kiefern, Birken und Zitterpappeln in den Lausitzer Wäldern) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "leuchtend orangeroter bis fuchsroter Hut mit überstehender Huthaut am Rand und rau geschupptem Stiel",
      "ockerbrauner Hut mit stark eingerolltem, filzigem Rand und herablaufenden Lamellen, die bei Fingerdruck sofort rostbraun flecken",
      "gefiederte Blätter, weiße Blütendolden im Mai und leuchtend korallenrote Beerendolden ab Spätsommer",
      "silbrig-graue, schmale Blätter, spitze Dornen und dicht gedrängte, leuchtend orangefarbene Beeren ab Spätsommer"
    ],
    "exp": "Erkennungsmerkmal von Kiefern-Rotkappe (Fuchsrotkappe): leuchtend orangeroter bis fuchsroter Hut mit überstehender Huthaut am Rand und rau geschupptem Stiel."
  },
  {
    "id": 673,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: schokoladenbrauner, bei Feuchtigkeit schleimiger Hut, gelbe Poren und ein deutlicher häutiger Ring am Stiel?",
    "a": [
      "Butterpilz (Butter-Röhrling)",
      "Frühjahrslorchel (Giftlorchel)",
      "Schwarzerle (Roterle)",
      "Schlehe (Schwarzdorn)"
    ],
    "exp": "Butterpilz (Butter-Röhrling) (Suillus luteus): Tipp für Sammler: Die klebrige braune Huthaut lässt sich schon im Wald wie von selbst komplett vom Hut abziehen."
  },
  {
    "id": 674,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Butterpilz (Butter-Röhrling)“ (Suillus luteus) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "milder, zarter Speisepilz und treuer Begleiter der Waldkiefer",
      "lebensgefährlich giftig! Enthält das flüchtige Zell- und Lebergift Gyromitrin",
      "ihre Wurzeln leben in Symbiose mit Knöllchenbakterien (Frankia), die Luftstickstoff binden, und vertragen monatelange Überflutung",
      "undurchdringlicher Brutplatz für Neuntöter und Goldammer; Raupenfutterpflanze des Segelfalters und Nierenfleck-Zipfelfalters"
    ],
    "exp": "Butterpilz (Butter-Röhrling): milder, zarter Speisepilz und treuer Begleiter der Waldkiefer. Tipp für Sammler: Die klebrige braune Huthaut lässt sich schon im Wald wie von selbst komplett vom Hut abziehen."
  },
  {
    "id": 675,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Butterpilz (Butter-Röhrling)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Tipp für Sammler: Die klebrige braune Huthaut lässt sich schon im Wald wie von selbst komplett vom Hut abziehen.",
      "Sie darf keinesfalls mit der essbaren, wabenförmig gekammerten Speisemorchel verwechselt werden.",
      "Frisch geschlagenes Erlenholz färbt sich an der Luft rasch leuchtend orangerot – daher auch der Name „Roterle“.",
      "Erst nach den ersten strengen Herbstfrösten wird der zusammenziehende Gerbstoff in den Schlehen abgebaut, sodass sie mild und aromatisch für Likör oder Marmelade werden."
    ],
    "exp": "Wichtig zu Butterpilz (Butter-Röhrling) (Suillus luteus): Tipp für Sammler: Die klebrige braune Huthaut lässt sich schon im Wald wie von selbst komplett vom Hut abziehen."
  },
  {
    "id": 676,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Tipp für Sammler: Die klebrige braune Huthaut lässt sich schon im Wald wie von selbst komplett vom Hut abziehen.“?",
    "a": [
      "Butterpilz (Butter-Röhrling)",
      "Frühjahrslorchel (Giftlorchel)",
      "Schwarzerle (Roterle)",
      "Schlehe (Schwarzdorn)"
    ],
    "exp": "Gemeint ist Butterpilz (Butter-Röhrling) (Suillus luteus) – schokoladenbrauner, bei Feuchtigkeit schleimiger Hut, gelbe Poren und ein deutlicher häutiger Ring am Stiel."
  },
  {
    "id": 677,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Suillus luteus“?",
    "a": [
      "Butterpilz (Butter-Röhrling)",
      "Frühjahrslorchel (Giftlorchel)",
      "Schwarzerle (Roterle)",
      "Schlehe (Schwarzdorn)"
    ],
    "exp": "Suillus luteus ist der wissenschaftliche Name für Butterpilz (Butter-Röhrling) (auf sandigen Kiefernwaldwegen und in jungen Kiefernschonungen)."
  },
  {
    "id": 678,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Butterpilz (Butter-Röhrling)“ (auf sandigen Kiefernwaldwegen und in jungen Kiefernschonungen) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "schokoladenbrauner, bei Feuchtigkeit schleimiger Hut, gelbe Poren und ein deutlicher häutiger Ring am Stiel",
      "rotbrauner, hirnartig gewundener Hut (nicht wabenförmig wie bei der essbaren Speisemorchel!) auf weißlichem Stiel",
      "rundliche, vorne leicht eingebuchtete Blätter und kleine, holzige schwarze „Erlenzäpfchen“, die den ganzen Winter am Baum bleiben",
      "blüht bereits im April vor dem Laubaustrieb wie eine weiße Schneewolke; blauschwarze, bereifte Steinfrüchte im Herbst"
    ],
    "exp": "Erkennungsmerkmal von Butterpilz (Butter-Röhrling): schokoladenbrauner, bei Feuchtigkeit schleimiger Hut, gelbe Poren und ein deutlicher häutiger Ring am Stiel."
  },
  {
    "id": 679,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: orangefarbener, konzentrisch gezonte Kreise zeigender Hut mit kleinen Grübchen am Stiel; tritt bei Verletzung leuchtend karottenrote Milch aus?",
    "a": [
      "Edel-Reizker (Kiefern-Reizker)",
      "Echte Rentierflechte",
      "Besenheide (Heidekraut)",
      "Maronenröhrling (Braunkappe)"
    ],
    "exp": "Edel-Reizker (Kiefern-Reizker) (Lactarius deliciosus): Alle Reizker, die beim Anschneiden sofort karottenrote bis weinrote (nicht weiße!) Milch absondern, sind essbar."
  },
  {
    "id": 680,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Edel-Reizker (Kiefern-Reizker)“ (Lactarius deliciosus) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "hervorragender Bratpilz aus der Gattung der Milchlinge",
      "Flechten sind eine Lebensgemeinschaft (Symbiose) aus einem Pilz und einer Grünalge; Zeiger für saubere Luft und nährstoffarme Naturböden",
      "späte und enorm ergiebige Nektarquelle für Honigbienen („Heidehonig“), Wildbienen und Schmetterlinge im Spätsommer",
      "Mykorrhizapartner von Kiefer und Fichte von August bis November; hervorragender Brat- und Trockenpilz"
    ],
    "exp": "Edel-Reizker (Kiefern-Reizker): hervorragender Bratpilz aus der Gattung der Milchlinge. Alle Reizker, die beim Anschneiden sofort karottenrote bis weinrote (nicht weiße!) Milch absondern, sind essbar."
  },
  {
    "id": 681,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Edel-Reizker (Kiefern-Reizker)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Alle Reizker, die beim Anschneiden sofort karottenrote bis weinrote (nicht weiße!) Milch absondern, sind essbar.",
      "Bitte beim Wandern nicht zertreten: Ein Flechtenpolster im trockenen Kiefernwald wächst nur wenige Millimeter pro Jahr!",
      "Früher band man aus den zähen, verzweigten Zweigen haltbare Stall- und Hofbesen – daher der Name „Besenheide“.",
      "Im Gegensatz zum bitteren Gallenröhrling hat die Marone niemals rosa Röhren und kein dunkles Netz am Stiel."
    ],
    "exp": "Wichtig zu Edel-Reizker (Kiefern-Reizker) (Lactarius deliciosus): Alle Reizker, die beim Anschneiden sofort karottenrote bis weinrote (nicht weiße!) Milch absondern, sind essbar."
  },
  {
    "id": 682,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Alle Reizker, die beim Anschneiden sofort karottenrote bis weinrote (nicht weiße!) Milch absondern, sind essbar.“?",
    "a": [
      "Edel-Reizker (Kiefern-Reizker)",
      "Echte Rentierflechte",
      "Besenheide (Heidekraut)",
      "Maronenröhrling (Braunkappe)"
    ],
    "exp": "Gemeint ist Edel-Reizker (Kiefern-Reizker) (Lactarius deliciosus) – orangefarbener, konzentrisch gezonte Kreise zeigender Hut mit kleinen Grübchen am Stiel; tritt bei Verletzung leuchtend karottenrote Milch aus."
  },
  {
    "id": 683,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Lactarius deliciosus“?",
    "a": [
      "Edel-Reizker (Kiefern-Reizker)",
      "Echte Rentierflechte",
      "Besenheide (Heidekraut)",
      "Maronenröhrling (Braunkappe)"
    ],
    "exp": "Lactarius deliciosus ist der wissenschaftliche Name für Edel-Reizker (Kiefern-Reizker) (grasige Kiefernwälder und Waldränder von September bis November)."
  },
  {
    "id": 684,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Edel-Reizker (Kiefern-Reizker)“ (grasige Kiefernwälder und Waldränder von September bis November) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "orangefarbener, konzentrisch gezonte Kreise zeigender Hut mit kleinen Grübchen am Stiel; tritt bei Verletzung leuchtend karottenrote Milch aus",
      "buschig verzweigte, silbrig-grauweiße bis grünliche Polster am Waldboden, die bei Trockenheit knistern und bei Regen weich wie ein Schwamm werden",
      "immergrüner Zwergstrauch mit winzigen, schuppenförmigen Blättchen und violett-rosa Blütenteppich von August bis Oktober",
      "kastanienbrauner Hut, gelbliche bis grünlich-gelbe Röhren unter dem Hut, die sich bei Fingerdruck sofort bläulich verfärben"
    ],
    "exp": "Erkennungsmerkmal von Edel-Reizker (Kiefern-Reizker): orangefarbener, konzentrisch gezonte Kreise zeigender Hut mit kleinen Grübchen am Stiel; tritt bei Verletzung leuchtend karottenrote Milch aus."
  },
  {
    "id": 685,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: bis zu 30 cm breiter, geschuppter Schirm, ein frei verschiebbarer doppelter Ring am langen, genatterten („schlangenhautartig gemusterten“) Stiel?",
    "a": [
      "Parasol (Riesenschirmling)",
      "Waldkiefer (Gemeine Kiefer)",
      "Heidelbeere (Blaubeere)",
      "Steinpilz (Fichten-/Kiefernsteinpilz)"
    ],
    "exp": "Parasol (Riesenschirmling) (Macrolepiota procera): Wichtiges Sicherheitsmerkmal: Der Stiel ist deutlich dunkel genattert und der Ring lässt sich am Stiel frei auf und ab schieben."
  },
  {
    "id": 686,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Parasol (Riesenschirmling)“ (Macrolepiota procera) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "die großen, nussig riechenden Hüte schmecken paniert und in Butter gebraten wie ein Wiener Schnitzel",
      "tiefreichende Pfahlwurzel trotzt Stürmen und langer Sommertrockenheit auf den Lausitzer Sandböden",
      "beliebtes Sammelobst für Kuchen und Pfannkuchen sowie Hauptnahrung für Fuchs, Dachs, Marder und Waldvögel",
      "einer der edelsten Speisepilze mit festem, weißem, mild-nussigem Fleisch; lässt sich hervorragend im Dörrautomaten trocknen"
    ],
    "exp": "Parasol (Riesenschirmling): die großen, nussig riechenden Hüte schmecken paniert und in Butter gebraten wie ein Wiener Schnitzel. Wichtiges Sicherheitsmerkmal: Der Stiel ist deutlich dunkel genattert und der Ring lässt sich am Stiel frei auf und ab schieben."
  },
  {
    "id": 687,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Parasol (Riesenschirmling)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Wichtiges Sicherheitsmerkmal: Der Stiel ist deutlich dunkel genattert und der Ring lässt sich am Stiel frei auf und ab schieben.",
      "Ihre harzreichen Nadeln verströmen an warmen Sommertagen den typischen würzigen Duft der märkischen Kiefernheide.",
      "Im Gegensatz zur gezüchteten Kulturheidelbeere (mit hellem Fruchtfleisch) färbt die echte Waldheidelbeere Zunge und Lippen kräftig blaurot.",
      "Sein häufigster ungenießbarer Doppelgänger ist der Gallenröhrling („Bitterling“), dessen Röhren im Alter schmutzig-rosa werden und der ein grobes dunkles Stielnetz trägt."
    ],
    "exp": "Wichtig zu Parasol (Riesenschirmling) (Macrolepiota procera): Wichtiges Sicherheitsmerkmal: Der Stiel ist deutlich dunkel genattert und der Ring lässt sich am Stiel frei auf und ab schieben."
  },
  {
    "id": 688,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Wichtiges Sicherheitsmerkmal: Der Stiel ist deutlich dunkel genattert und der Ring lässt sich am Stiel frei auf und ab schieben.“?",
    "a": [
      "Parasol (Riesenschirmling)",
      "Waldkiefer (Gemeine Kiefer)",
      "Heidelbeere (Blaubeere)",
      "Steinpilz (Fichten-/Kiefernsteinpilz)"
    ],
    "exp": "Gemeint ist Parasol (Riesenschirmling) (Macrolepiota procera) – bis zu 30 cm breiter, geschuppter Schirm, ein frei verschiebbarer doppelter Ring am langen, genatterten („schlangenhautartig gemusterten“) Stiel."
  },
  {
    "id": 689,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Macrolepiota procera“?",
    "a": [
      "Parasol (Riesenschirmling)",
      "Waldkiefer (Gemeine Kiefer)",
      "Heidelbeere (Blaubeere)",
      "Steinpilz (Fichten-/Kiefernsteinpilz)"
    ],
    "exp": "Macrolepiota procera ist der wissenschaftliche Name für Parasol (Riesenschirmling) (lichte Waldränder, Waldwege und Wiesen rund um Schwarzenburg)."
  },
  {
    "id": 690,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Parasol (Riesenschirmling)“ (lichte Waldränder, Waldwege und Wiesen rund um Schwarzenburg) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "bis zu 30 cm breiter, geschuppter Schirm, ein frei verschiebbarer doppelter Ring am langen, genatterten („schlangenhautartig gemusterten“) Stiel",
      "immergrüne Nadeln, die stets paarweise (zu zweit) in einer Kurztriebscheide sitzen; im oberen Stammbereich leuchtend fuchsrote „Spiegelrinde“",
      "grün kantige Zweige, sommergrüne Blättchen und blauschwarze, innen tief dunkelblau färbende Beeren ab Juni/Juli",
      "brauner Hut, bauchiger Stiel mit feinem weißem Adernetz im oberen Teil; Röhren anfangs weiß, später gelbgrün (blauen bei Druck NICHT)"
    ],
    "exp": "Erkennungsmerkmal von Parasol (Riesenschirmling): bis zu 30 cm breiter, geschuppter Schirm, ein frei verschiebbarer doppelter Ring am langen, genatterten („schlangenhautartig gemusterten“) Stiel."
  },
  {
    "id": 691,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: olivgrünlicher bis gelbgrünlicher Hut, reinweiße Lamellen (bleiben immer weiß!), Ring am Stiel und eine sackartige weiße Scheide („Volva“) um die Stielknolle im Boden?",
    "a": [
      "Grüner Knollenblätterpilz",
      "Hängebirke (Sandbirke)",
      "Preiselbeere (Kronsbeere)",
      "Echter Pfifferling (Eierschwamm)"
    ],
    "exp": "Grüner Knollenblätterpilz (Amanita phalloides): Heimtückisch ist die lange Latenzzeit von 6 bis 24 Stunden, in der zunächst keine Symptome auftreten, während die Leber bereits geschädigt wird."
  },
  {
    "id": 692,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Grüner Knollenblätterpilz“ (Amanita phalloides) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "tödlich giftig! Verursacht über 90 % aller tödlichen Pilzvergiftungen in Mitteleuropa durch hitzestabile Amatoxine",
      "besiedelt als lichthungriger Pionierbaum schnell offene Sandflächen; unter ihr wachsen Birkenpilze und Fliegenpilze",
      "reich an Vitamin C sowie natürlicher Benzoe- und Salicylsäure, weshalb Preiselbeerkompott monatelang ohne Konservierungsstoffe hält",
      "würziger Speisepilz, der fast nie von Maden befallen wird"
    ],
    "exp": "Grüner Knollenblätterpilz: tödlich giftig! Verursacht über 90 % aller tödlichen Pilzvergiftungen in Mitteleuropa durch hitzestabile Amatoxine. Heimtückisch ist die lange Latenzzeit von 6 bis 24 Stunden, in der zunächst keine Symptome auftreten, während die Leber bereits geschädigt wird."
  },
  {
    "id": 693,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Grüner Knollenblätterpilz“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Heimtückisch ist die lange Latenzzeit von 6 bis 24 Stunden, in der zunächst keine Symptome auftreten, während die Leber bereits geschädigt wird.",
      "Das in der weißen Birkenrinde enthaltene „Betulin“ reflektiert starkes Sonnenlicht und macht die Rinde selbst bei Regen wasserabweisend und brennbar.",
      "In Schwarzenburg ist die Kombination aus Wildbraten und selbst gesammelten Wald-Preiselbeeren ein echter Klassiker.",
      "Vom ungenießbaren Falschen Pfifferling unterscheidet man ihn sicher an den dicken, querverbundenen Leisten, dem festen weißen Fleisch und dem Aprikosengeruch."
    ],
    "exp": "Wichtig zu Grüner Knollenblätterpilz (Amanita phalloides): Heimtückisch ist die lange Latenzzeit von 6 bis 24 Stunden, in der zunächst keine Symptome auftreten, während die Leber bereits geschädigt wird."
  },
  {
    "id": 694,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Heimtückisch ist die lange Latenzzeit von 6 bis 24 Stunden, in der zunächst keine Symptome auftreten, während die Leber bereits geschädigt wird.“?",
    "a": [
      "Grüner Knollenblätterpilz",
      "Hängebirke (Sandbirke)",
      "Preiselbeere (Kronsbeere)",
      "Echter Pfifferling (Eierschwamm)"
    ],
    "exp": "Gemeint ist Grüner Knollenblätterpilz (Amanita phalloides) – olivgrünlicher bis gelbgrünlicher Hut, reinweiße Lamellen (bleiben immer weiß!), Ring am Stiel und eine sackartige weiße Scheide („Volva“) um die Stielknolle im Boden."
  },
  {
    "id": 695,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Amanita phalloides“?",
    "a": [
      "Grüner Knollenblätterpilz",
      "Hängebirke (Sandbirke)",
      "Preiselbeere (Kronsbeere)",
      "Echter Pfifferling (Eierschwamm)"
    ],
    "exp": "Amanita phalloides ist der wissenschaftliche Name für Grüner Knollenblätterpilz (unter Eichen und Laubbäumen von Juli bis Oktober)."
  },
  {
    "id": 696,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Grüner Knollenblätterpilz“ (unter Eichen und Laubbäumen von Juli bis Oktober) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "olivgrünlicher bis gelbgrünlicher Hut, reinweiße Lamellen (bleiben immer weiß!), Ring am Stiel und eine sackartige weiße Scheide („Volva“) um die Stielknolle im Boden",
      "auffallend weiße Rinde mit dunklen Rissen und bogig herabhängende, feine Zweige",
      "immergrüne, derb-ledrige, glänzende Blättchen (ähnlich Buchsbaum) und leuchtend rote, herb-säuerliche Beeren im Spätsommer",
      "dottergelber, trichterförmig geschwungener Fruchtkörper mit gegabelten, herablaufenden Leisten (keine dünnen Lamellen!) und fruchtigem Aprikosenduft"
    ],
    "exp": "Erkennungsmerkmal von Grüner Knollenblätterpilz: olivgrünlicher bis gelbgrünlicher Hut, reinweiße Lamellen (bleiben immer weiß!), Ring am Stiel und eine sackartige weiße Scheide („Volva“) um die Stielknolle im Boden."
  },
  {
    "id": 697,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: leuchtend roter Hut mit weißen Flocken (Velumresten), weiße Lamellen, beringter Stiel und warzig gegürtelte Knolle?",
    "a": [
      "Fliegenpilz",
      "Traubeneiche",
      "Walderdbeere",
      "Krause Glucke (Fette Henne)"
    ],
    "exp": "Fliegenpilz (Amanita muscaria): Der Name stammt daher, dass man früher gezuckerte Milch mit Fliegenpilzstückchen aufstellte, um Stubenfliegen zu betäuben."
  },
  {
    "id": 698,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Fliegenpilz“ (Amanita muscaria) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "giftig (enthält Ibotensäure und Muscimol); wichtiger Mykorrhizapartner für Birken und Kiefern im Waldökosystem",
      "liefert im Herbst energiereiche Eicheln (Mast) für Wildschweine, Rothirsche, Eichelhäher und Eichhörnchen",
      "perfekter, essbarer Bodendecker für die unterste Schicht eines naturnahen Waldgartens",
      "exzellenter, würzig-nussiger Speisepilz mit bissfestem Fleisch (z. B. paniert als Schnitzel oder in Rahmsoße)"
    ],
    "exp": "Fliegenpilz: giftig (enthält Ibotensäure und Muscimol); wichtiger Mykorrhizapartner für Birken und Kiefern im Waldökosystem. Der Name stammt daher, dass man früher gezuckerte Milch mit Fliegenpilzstückchen aufstellte, um Stubenfliegen zu betäuben."
  },
  {
    "id": 699,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Fliegenpilz“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Der Name stammt daher, dass man früher gezuckerte Milch mit Fliegenpilzstückchen aufstellte, um Stubenfliegen zu betäuben.",
      "Gemeinsam mit der Stieleiche erhöht sie im Kiefernwald die Artenvielfalt (über 500 Insektenarten leben an Eichen!) und bremst Waldbrände.",
      "Obwohl die Früchte viel kleiner als Gartenerdbeeren sind, besitzen sie ein vielfach intensiveres Aroma.",
      "Vor dem Braten teilt man die Krause Glucke am besten in Scheiben und spült sie kurz in lauwarmem Wasser ab, um Kiefernnadeln und Waldsand aus den Windungen zu lösen."
    ],
    "exp": "Wichtig zu Fliegenpilz (Amanita muscaria): Der Name stammt daher, dass man früher gezuckerte Milch mit Fliegenpilzstückchen aufstellte, um Stubenfliegen zu betäuben."
  },
  {
    "id": 700,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Der Name stammt daher, dass man früher gezuckerte Milch mit Fliegenpilzstückchen aufstellte, um Stubenfliegen zu betäuben.“?",
    "a": [
      "Fliegenpilz",
      "Traubeneiche",
      "Walderdbeere",
      "Krause Glucke (Fette Henne)"
    ],
    "exp": "Gemeint ist Fliegenpilz (Amanita muscaria) – leuchtend roter Hut mit weißen Flocken (Velumresten), weiße Lamellen, beringter Stiel und warzig gegürtelte Knolle."
  },
  {
    "id": 701,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Amanita muscaria“?",
    "a": [
      "Fliegenpilz",
      "Traubeneiche",
      "Walderdbeere",
      "Krause Glucke (Fette Henne)"
    ],
    "exp": "Amanita muscaria ist der wissenschaftliche Name für Fliegenpilz (unter Birken und Kiefern im Spätsommer und Herbst)."
  },
  {
    "id": 702,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Fliegenpilz“ (unter Birken und Kiefern im Spätsommer und Herbst) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "leuchtend roter Hut mit weißen Flocken (Velumresten), weiße Lamellen, beringter Stiel und warzig gegürtelte Knolle",
      "gelappte Blätter mit deutlichem Blattstiel, während die Eicheln ungestielt („traubig gehäuft“) am Zweig sitzen",
      "dreizählige, gezähnte Blätter, weiße Blüten und kleine rote Sammelnussfrüchte mit intensivem Waldaroma",
      "bis zu 30 cm großer, gelblich-cremefarbener, kraus gewundener Fruchtkörper, der wie ein Badeschwamm oder Blumenkohl aussieht"
    ],
    "exp": "Erkennungsmerkmal von Fliegenpilz: leuchtend roter Hut mit weißen Flocken (Velumresten), weiße Lamellen, beringter Stiel und warzig gegürtelte Knolle."
  },
  {
    "id": 703,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: brauner Hut wie beim Steinpilz, aber grobes dunkles Netz am Stiel und im Alter schmutzig-rosa vorwölbende Röhren?",
    "a": [
      "Gallenröhrling (Bitterling)",
      "Stieleiche (Deutsche Eiche)",
      "Schwarzer Holunder",
      "Birkenpilz"
    ],
    "exp": "Gallenröhrling (Bitterling) (Tylopilus felleus): Er ist der klassische „Täuscher“ für Steinpilz- und Maronensammler in den Kiefernwäldern der Lausitz."
  },
  {
    "id": 704,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Gallenröhrling (Bitterling)“ (Tylopilus felleus) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "nicht giftig, aber durch extremen Bitterstoff völlig ungenießbar – ein einziger Pilz verdirbt das gesamte Pilzgericht!",
      "kann über 500 bis 800 Jahre alt werden und bietet Hirschkäfer, Heldbock und Spechten Lebensraum",
      "Blüten für Holunderblütensirup und „Hollerküchle“, gekochte Beeren für Saft und Gelee; Magnet für Mönchsgrasmücke und Star",
      "guter Speisepilz (besonders junge, feste Exemplare); wichtigster Symbiosepartner der Hängebirke"
    ],
    "exp": "Gallenröhrling (Bitterling): nicht giftig, aber durch extremen Bitterstoff völlig ungenießbar – ein einziger Pilz verdirbt das gesamte Pilzgericht!. Er ist der klassische „Täuscher“ für Steinpilz- und Maronensammler in den Kiefernwäldern der Lausitz."
  },
  {
    "id": 705,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Gallenröhrling (Bitterling)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Er ist der klassische „Täuscher“ für Steinpilz- und Maronensammler in den Kiefernwäldern der Lausitz.",
      "Merksatz für Spaziergänger: „Bei der Stieleiche hängen die Eicheln am Stiel, bei der Traubeneiche die Blätter!“",
      "Altem Volksbrauch nach pflanzte man an jeden Hof einen Holunderbusch als guten Hausgeist („Vor dem Holunder soll man den Hut ziehen“).",
      "Beim Kochen verfärbt sich das weiße Fleisch des Birkenpilzes dunkelgrau bis schwärzlich – das ist völlig normal und unbedenklich."
    ],
    "exp": "Wichtig zu Gallenröhrling (Bitterling) (Tylopilus felleus): Er ist der klassische „Täuscher“ für Steinpilz- und Maronensammler in den Kiefernwäldern der Lausitz."
  },
  {
    "id": 706,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Er ist der klassische „Täuscher“ für Steinpilz- und Maronensammler in den Kiefernwäldern der Lausitz.“?",
    "a": [
      "Gallenröhrling (Bitterling)",
      "Stieleiche (Deutsche Eiche)",
      "Schwarzer Holunder",
      "Birkenpilz"
    ],
    "exp": "Gemeint ist Gallenröhrling (Bitterling) (Tylopilus felleus) – brauner Hut wie beim Steinpilz, aber grobes dunkles Netz am Stiel und im Alter schmutzig-rosa vorwölbende Röhren."
  },
  {
    "id": 707,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Tylopilus felleus“?",
    "a": [
      "Gallenröhrling (Bitterling)",
      "Stieleiche (Deutsche Eiche)",
      "Schwarzer Holunder",
      "Birkenpilz"
    ],
    "exp": "Tylopilus felleus ist der wissenschaftliche Name für Gallenröhrling (Bitterling) (saure Kiefern- und Nadelwälder von Juli bis Oktober)."
  },
  {
    "id": 708,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Gallenröhrling (Bitterling)“ (saure Kiefern- und Nadelwälder von Juli bis Oktober) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "brauner Hut wie beim Steinpilz, aber grobes dunkles Netz am Stiel und im Alter schmutzig-rosa vorwölbende Röhren",
      "Blätter fast ungestielt mit kleinen „Öhrchen“ am Grund, dafür hängen die Eicheln an langen Stielen („Stieleiche“)",
      "duftende cremeweiße Blütenschirme im Juni und glänzend schwarze Beerendolden an rötlichen Stielen im September",
      "graubrauner, glatter Hut und schlanker, weißlicher Stiel, der dicht mit dunklen, rauen Schüppchen („Raufuß“) besetzt ist"
    ],
    "exp": "Erkennungsmerkmal von Gallenröhrling (Bitterling): brauner Hut wie beim Steinpilz, aber grobes dunkles Netz am Stiel und im Alter schmutzig-rosa vorwölbende Röhren."
  },
  {
    "id": 709,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: ockerbrauner Hut mit stark eingerolltem, filzigem Rand und herablaufenden Lamellen, die bei Fingerdruck sofort rostbraun flecken?",
    "a": [
      "Kahler Krempling",
      "Eberesche (Vogelbeere)",
      "Sanddorn",
      "Kiefern-Rotkappe (Fuchsrotkappe)"
    ],
    "exp": "Kahler Krempling (Paxillus involutus): Ein klassisches Beispiel dafür, warum man alte Pilzbücher vor 1980 nicht mehr zur Bestimmung von Speisepilzen nutzen sollte."
  },
  {
    "id": 710,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Kahler Krempling“ (Paxillus involutus) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "früher fälschlich als Speisepilz gesammelt, heute als lebensgefährlich giftig bekannt (löst nach wiederholtem Verzehr das tödliche Paxillus-Syndrom / Immunhämolysen aus)",
      "wichtigste Nahrungsquelle im Herbst und Winter für über 60 Vogelarten (Drosseln, Gimpel, Seidenschwanz) und Baummarder",
      "Pionierstrauch auf kargen Sandböden; seine Beeren enthalten bis zu zehnmal mehr Vitamin C als Zitronen („Zitrone des Nordens“)",
      "sehr geschätzter, festfleischiger Speisepilz; verfärbt sich im Anschnitt erst rötlich-violett, dann schwärzlich"
    ],
    "exp": "Kahler Krempling: früher fälschlich als Speisepilz gesammelt, heute als lebensgefährlich giftig bekannt (löst nach wiederholtem Verzehr das tödliche Paxillus-Syndrom / Immunhämolysen aus). Ein klassisches Beispiel dafür, warum man alte Pilzbücher vor 1980 nicht mehr zur Bestimmung von Speisepilzen nutzen sollte."
  },
  {
    "id": 711,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Kahler Krempling“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Ein klassisches Beispiel dafür, warum man alte Pilzbücher vor 1980 nicht mehr zur Bestimmung von Speisepilzen nutzen sollte.",
      "Trotz des Volksglaubens sind Vogelbeeren nicht giftig: Gekocht als Gelee oder Konfitüre (oder nach dem ersten Frost) verlieren sie ihre bittere Parasorbinsäure.",
      "Sanddorn ist zweihäusig: Für eine reiche Beerenernte im Waldgarten braucht man mindestens einen männlichen Bestäuberstrauch neben den weiblichen Sträuchern.",
      "Wie alle Raufußröhrlinge sollten Rotkappen vor dem Verzehr stets gut durchgegart werden (mindestens 15 Minuten)."
    ],
    "exp": "Wichtig zu Kahler Krempling (Paxillus involutus): Ein klassisches Beispiel dafür, warum man alte Pilzbücher vor 1980 nicht mehr zur Bestimmung von Speisepilzen nutzen sollte."
  },
  {
    "id": 712,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Ein klassisches Beispiel dafür, warum man alte Pilzbücher vor 1980 nicht mehr zur Bestimmung von Speisepilzen nutzen sollte.“?",
    "a": [
      "Kahler Krempling",
      "Eberesche (Vogelbeere)",
      "Sanddorn",
      "Kiefern-Rotkappe (Fuchsrotkappe)"
    ],
    "exp": "Gemeint ist Kahler Krempling (Paxillus involutus) – ockerbrauner Hut mit stark eingerolltem, filzigem Rand und herablaufenden Lamellen, die bei Fingerdruck sofort rostbraun flecken."
  },
  {
    "id": 713,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Paxillus involutus“?",
    "a": [
      "Kahler Krempling",
      "Eberesche (Vogelbeere)",
      "Sanddorn",
      "Kiefern-Rotkappe (Fuchsrotkappe)"
    ],
    "exp": "Paxillus involutus ist der wissenschaftliche Name für Kahler Krempling (sehr häufig in Kiefern- und Birkenwäldern sowie Gärten)."
  },
  {
    "id": 714,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Kahler Krempling“ (sehr häufig in Kiefern- und Birkenwäldern sowie Gärten) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "ockerbrauner Hut mit stark eingerolltem, filzigem Rand und herablaufenden Lamellen, die bei Fingerdruck sofort rostbraun flecken",
      "gefiederte Blätter, weiße Blütendolden im Mai und leuchtend korallenrote Beerendolden ab Spätsommer",
      "silbrig-graue, schmale Blätter, spitze Dornen und dicht gedrängte, leuchtend orangefarbene Beeren ab Spätsommer",
      "leuchtend orangeroter bis fuchsroter Hut mit überstehender Huthaut am Rand und rau geschupptem Stiel"
    ],
    "exp": "Erkennungsmerkmal von Kahler Krempling: ockerbrauner Hut mit stark eingerolltem, filzigem Rand und herablaufenden Lamellen, die bei Fingerdruck sofort rostbraun flecken."
  },
  {
    "id": 715,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: rotbrauner, hirnartig gewundener Hut (nicht wabenförmig wie bei der essbaren Speisemorchel!) auf weißlichem Stiel?",
    "a": [
      "Frühjahrslorchel (Giftlorchel)",
      "Schwarzerle (Roterle)",
      "Schlehe (Schwarzdorn)",
      "Butterpilz (Butter-Röhrling)"
    ],
    "exp": "Frühjahrslorchel (Giftlorchel) (Gyromitra esculenta): Sie darf keinesfalls mit der essbaren, wabenförmig gekammerten Speisemorchel verwechselt werden."
  },
  {
    "id": 716,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Frühjahrslorchel (Giftlorchel)“ (Gyromitra esculenta) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "lebensgefährlich giftig! Enthält das flüchtige Zell- und Lebergift Gyromitrin",
      "ihre Wurzeln leben in Symbiose mit Knöllchenbakterien (Frankia), die Luftstickstoff binden, und vertragen monatelange Überflutung",
      "undurchdringlicher Brutplatz für Neuntöter und Goldammer; Raupenfutterpflanze des Segelfalters und Nierenfleck-Zipfelfalters",
      "milder, zarter Speisepilz und treuer Begleiter der Waldkiefer"
    ],
    "exp": "Frühjahrslorchel (Giftlorchel): lebensgefährlich giftig! Enthält das flüchtige Zell- und Lebergift Gyromitrin. Sie darf keinesfalls mit der essbaren, wabenförmig gekammerten Speisemorchel verwechselt werden."
  },
  {
    "id": 717,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Frühjahrslorchel (Giftlorchel)“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Sie darf keinesfalls mit der essbaren, wabenförmig gekammerten Speisemorchel verwechselt werden.",
      "Frisch geschlagenes Erlenholz färbt sich an der Luft rasch leuchtend orangerot – daher auch der Name „Roterle“.",
      "Erst nach den ersten strengen Herbstfrösten wird der zusammenziehende Gerbstoff in den Schlehen abgebaut, sodass sie mild und aromatisch für Likör oder Marmelade werden.",
      "Tipp für Sammler: Die klebrige braune Huthaut lässt sich schon im Wald wie von selbst komplett vom Hut abziehen."
    ],
    "exp": "Wichtig zu Frühjahrslorchel (Giftlorchel) (Gyromitra esculenta): Sie darf keinesfalls mit der essbaren, wabenförmig gekammerten Speisemorchel verwechselt werden."
  },
  {
    "id": 718,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Sie darf keinesfalls mit der essbaren, wabenförmig gekammerten Speisemorchel verwechselt werden.“?",
    "a": [
      "Frühjahrslorchel (Giftlorchel)",
      "Schwarzerle (Roterle)",
      "Schlehe (Schwarzdorn)",
      "Butterpilz (Butter-Röhrling)"
    ],
    "exp": "Gemeint ist Frühjahrslorchel (Giftlorchel) (Gyromitra esculenta) – rotbrauner, hirnartig gewundener Hut (nicht wabenförmig wie bei der essbaren Speisemorchel!) auf weißlichem Stiel."
  },
  {
    "id": 719,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Gyromitra esculenta“?",
    "a": [
      "Frühjahrslorchel (Giftlorchel)",
      "Schwarzerle (Roterle)",
      "Schlehe (Schwarzdorn)",
      "Butterpilz (Butter-Röhrling)"
    ],
    "exp": "Gyromitra esculenta ist der wissenschaftliche Name für Frühjahrslorchel (Giftlorchel) (im Frühjahr (März bis Mai) auf sandigen Böden unter Kiefern rund um Heideblick)."
  },
  {
    "id": 720,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Frühjahrslorchel (Giftlorchel)“ (im Frühjahr (März bis Mai) auf sandigen Böden unter Kiefern rund um Heideblick) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "rotbrauner, hirnartig gewundener Hut (nicht wabenförmig wie bei der essbaren Speisemorchel!) auf weißlichem Stiel",
      "rundliche, vorne leicht eingebuchtete Blätter und kleine, holzige schwarze „Erlenzäpfchen“, die den ganzen Winter am Baum bleiben",
      "blüht bereits im April vor dem Laubaustrieb wie eine weiße Schneewolke; blauschwarze, bereifte Steinfrüchte im Herbst",
      "schokoladenbrauner, bei Feuchtigkeit schleimiger Hut, gelbe Poren und ein deutlicher häutiger Ring am Stiel"
    ],
    "exp": "Erkennungsmerkmal von Frühjahrslorchel (Giftlorchel): rotbrauner, hirnartig gewundener Hut (nicht wabenförmig wie bei der essbaren Speisemorchel!) auf weißlichem Stiel."
  },
  {
    "id": 721,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Art aus Wald, Heide oder Pilzreich rund um Schwarzenburg erkennt man an diesen Merkmalen: buschig verzweigte, silbrig-grauweiße bis grünliche Polster am Waldboden, die bei Trockenheit knistern und bei Regen weich wie ein Schwamm werden?",
    "a": [
      "Echte Rentierflechte",
      "Besenheide (Heidekraut)",
      "Maronenröhrling (Braunkappe)",
      "Edel-Reizker (Kiefern-Reizker)"
    ],
    "exp": "Echte Rentierflechte (Cladonia rangiferina / arbuscula): Bitte beim Wandern nicht zertreten: Ein Flechtenpolster im trockenen Kiefernwald wächst nur wenige Millimeter pro Jahr!"
  },
  {
    "id": 722,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche ökologische Bedeutung oder Nutzung hat „Echte Rentierflechte“ (Cladonia rangiferina / arbuscula) in den Wäldern und Waldgärten von Schwarzenburg?",
    "a": [
      "Flechten sind eine Lebensgemeinschaft (Symbiose) aus einem Pilz und einer Grünalge; Zeiger für saubere Luft und nährstoffarme Naturböden",
      "späte und enorm ergiebige Nektarquelle für Honigbienen („Heidehonig“), Wildbienen und Schmetterlinge im Spätsommer",
      "Mykorrhizapartner von Kiefer und Fichte von August bis November; hervorragender Brat- und Trockenpilz",
      "hervorragender Bratpilz aus der Gattung der Milchlinge"
    ],
    "exp": "Echte Rentierflechte: Flechten sind eine Lebensgemeinschaft (Symbiose) aus einem Pilz und einer Grünalge; Zeiger für saubere Luft und nährstoffarme Naturböden. Bitte beim Wandern nicht zertreten: Ein Flechtenpolster im trockenen Kiefernwald wächst nur wenige Millimeter pro Jahr!"
  },
  {
    "id": 723,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Praxis- oder Naturhinweis gilt speziell für „Echte Rentierflechte“ bei einer Wanderung um Schwarzenburg?",
    "a": [
      "Bitte beim Wandern nicht zertreten: Ein Flechtenpolster im trockenen Kiefernwald wächst nur wenige Millimeter pro Jahr!",
      "Früher band man aus den zähen, verzweigten Zweigen haltbare Stall- und Hofbesen – daher der Name „Besenheide“.",
      "Im Gegensatz zum bitteren Gallenröhrling hat die Marone niemals rosa Röhren und kein dunkles Netz am Stiel.",
      "Alle Reizker, die beim Anschneiden sofort karottenrote bis weinrote (nicht weiße!) Milch absondern, sind essbar."
    ],
    "exp": "Wichtig zu Echte Rentierflechte (Cladonia rangiferina / arbuscula): Bitte beim Wandern nicht zertreten: Ein Flechtenpolster im trockenen Kiefernwald wächst nur wenige Millimeter pro Jahr!"
  },
  {
    "id": 724,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Auf welchen Baum, Strauch oder Pilz der Schwarzenburger Wälder trifft dieser Hinweis zu: „Bitte beim Wandern nicht zertreten: Ein Flechtenpolster im trockenen Kiefernwald wächst nur wenige Millimeter pro Jahr!“?",
    "a": [
      "Echte Rentierflechte",
      "Besenheide (Heidekraut)",
      "Maronenröhrling (Braunkappe)",
      "Edel-Reizker (Kiefern-Reizker)"
    ],
    "exp": "Gemeint ist Echte Rentierflechte (Cladonia rangiferina / arbuscula) – buschig verzweigte, silbrig-grauweiße bis grünliche Polster am Waldboden, die bei Trockenheit knistern und bei Regen weich wie ein Schwamm werden."
  },
  {
    "id": 725,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche Art der Lausitzer Wälder und Heiden trägt den wissenschaftlichen Namen „Cladonia rangiferina / arbuscula“?",
    "a": [
      "Echte Rentierflechte",
      "Besenheide (Heidekraut)",
      "Maronenröhrling (Braunkappe)",
      "Edel-Reizker (Kiefern-Reizker)"
    ],
    "exp": "Cladonia rangiferina / arbuscula ist der wissenschaftliche Name für Echte Rentierflechte (trockene, lichtreiche Kiefernwälder (Flechten-Kiefernwälder) auf armen Sandböden)."
  },
  {
    "id": 726,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Woran erkennt man „Echte Rentierflechte“ (trockene, lichtreiche Kiefernwälder (Flechten-Kiefernwälder) auf armen Sandböden) beim Naturspaziergang in der Gemeinde Heideblick?",
    "a": [
      "buschig verzweigte, silbrig-grauweiße bis grünliche Polster am Waldboden, die bei Trockenheit knistern und bei Regen weich wie ein Schwamm werden",
      "immergrüner Zwergstrauch mit winzigen, schuppenförmigen Blättchen und violett-rosa Blütenteppich von August bis Oktober",
      "kastanienbrauner Hut, gelbliche bis grünlich-gelbe Röhren unter dem Hut, die sich bei Fingerdruck sofort bläulich verfärben",
      "orangefarbener, konzentrisch gezonte Kreise zeigender Hut mit kleinen Grübchen am Stiel; tritt bei Verletzung leuchtend karottenrote Milch aus"
    ],
    "exp": "Erkennungsmerkmal von Echte Rentierflechte: buschig verzweigte, silbrig-grauweiße bis grünliche Polster am Waldboden, die bei Trockenheit knistern und bei Regen weich wie ein Schwamm werden."
  },
  {
    "id": 727,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Wie viele Stockwerke (Ebenen) kombiniert ein klassischer „Waldgarten“ nach dem Vorbild eines natürlichen Waldrands?",
    "a": [
      "Bis zu sieben Schichten: hohe Kronenbäume, niedrige Obstbäume, Sträucher, Stauden/Kräuter, Bodendecker, Wurzelpflanzen und Kletterpflanzen",
      "Immer nur eine einzige Schicht aus Kiefern in Reih und Glied",
      "Genau zwei Schichten: Schottersteine und Rasen",
      "Ausschließlich Wasserpflanzen in tiefen Gräben"
    ],
    "exp": "Durch die gestaffelten Schichten nutzt ein Waldgarten Sonnenlicht, Tau und Bodenfeuchtigkeit optimal aus und bietet Vögeln, Igeln und Insekten auf jeder Höhe Lebensraum."
  },
  {
    "id": 728,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Warum sind Totholzstapel, Reisighecken („Benjeshecken“) und alte Baumstümpfe in einem naturnahen Waldgarten so wertvoll?",
    "a": [
      "Sie speichern Feuchtigkeit und bieten Igeln, Zaunkönigen, Erdkröten, Blindschleichen, Wildbienen und Pilzen lebenswichtige Quartiere",
      "Sie halten Regenwolken über dem Grundstück fest",
      "Sie vertreiben alle Singvögel aus dem Garten",
      "Sie verwandeln sich innerhalb von zwei Wochen in Steinkohle"
    ],
    "exp": "Rund ein Viertel aller Waldarten ist auf liegendes oder stehendes Totholz angewiesen – im Waldgarten ist jede Totholzecke ein lebendiges Biotop."
  },
  {
    "id": 729,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Symbiose (Lebensgemeinschaft zum gegenseitigen Nutzen) gehen Steinpilze, Maronenröhrlinge, Birkenpilze und Pfifferlinge mit den Bäumen im Schwarzenburger Wald ein?",
    "a": [
      "Eine Mykorrhiza (Pilzwurzel): Der Pilz liefert dem Baum Wasser und Mineralstoffe, der Baum gibt dem Pilz Zucker aus der Photosynthese",
      "Der Pilz frisst die grünen Kiefernnadeln in der Baumkrone auf",
      "Der Baum fängt mit seinen Wurzeln Regenwürmer für den Pilz",
      "Es handelt sich um reinen Parasitismus, der den Baum binnen Wochen abtötet"
    ],
    "exp": "Ohne diese unterirdische Mykorrhiza-Partnerschaft könnten Kiefern und Birken auf den trockenen, kargen Sandböden der Niederlausitz kaum gedeihen."
  },
  {
    "id": 730,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Warum lassen sich Steinpilze, Maronenröhrlinge und Pfifferlinge niemals wie Champignons auf Stroh im Keller züchten?",
    "a": [
      "Weil sie als echte Mykorrhizapilze zwingend die lebenden Wurzeln eines Partnerbaums (z. B. Kiefer, Birke oder Eiche) zum Fruchten brauchen",
      "Weil Waldpilze nur bei minus 10 Grad wachsen",
      "Weil ihre Sporen nur durch das Geweih von Rothirschen übertragen werden",
      "Weil sie im Dunkeln sofort zu Giftpilzen werden"
    ],
    "exp": "Deshalb ist die Pilzernte in den Wäldern rund um Schwarzenburg im Herbst ein echtes Naturgeschenk, das man nur im Zusammenspiel mit dem lebenden Wald findet."
  },
  {
    "id": 731,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Wie erntet man Speisepilze im Schwarzenburger Wald natur- und fachgerecht, ohne das unterirdische Pilzgeflecht (Myzel) zu beschädigen?",
    "a": [
      "Vorsichtig herausdrehen oder dicht über dem Boden abschneiden und die kleine Bodenstelle wieder mit Moos/Nadelstreu bedecken",
      "Mit einer Eisenschaufel einen halben Quadratmeter Waldboden ausheben",
      "Nur den Hut abreißen und den Stiel zertreten",
      "Den gesamten Waldboden rund um den Pilz mit Seifenwasser abspülen"
    ],
    "exp": "Das Bedecken der Entnahmestelle mit etwas Moos verhindert, dass das empfindliche unterirdische Pilzmyzel im trockenen Lausitzer Sandboden austrocknet."
  },
  {
    "id": 732,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Warum ist der Einsatz eines Dörrautomaten nach einer erfolgreichen Pilzsuche rund um Schwarzenburg (September–November) so praktisch?",
    "a": [
      "Getrocknete Steinpilze und Maronenröhrlinge sind jahrelang haltbar und entfalten beim Trocknen ein noch intensiveres Waldpilzaroma",
      "Durch das Trocknen wird ein tödlich giftiger Knollenblätterpilz essbar",
      "Im Dörrautomaten wachsen die Pilze auf die doppelte Größe heran",
      "Getrocknete Pilze leuchten nachts im Dunkeln"
    ],
    "exp": "Achtung: Trocknen macht echte Speisepilze haltbar und aromatisch, baut aber niemals die Gifte von Giftpilzen (wie dem Grünen Knollenblätterpilz) ab!"
  },
  {
    "id": 733,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Woran unterscheidet man im Kiefernwald auf den ersten Blick einen Röhrling (z. B. Steinpilz, Marone, Butterpilz) von einem Blätterpilz (Lamellenpilz)?",
    "a": [
      "Röhrlinge haben unter dem Hut ein schwammartiges Polster aus feinen Röhrchen statt strahlenförmiger Lamellen (Blättchen)",
      "Röhrlinge wachsen nur im Januar auf Schnee",
      "Röhrlinge haben immer einen hohlen Hut aus Holz",
      "Blätterpilze wachsen ausschließlich auf Laubblättern in der Baumkrone"
    ],
    "exp": "Für Einsteiger sind Röhrlinge ideal: In Mitteleuropa gibt es unter den Röhrlingen keinen einzigen tödlich giftigen Pilz (wohl aber bittere oder roh unverträgliche Arten)."
  },
  {
    "id": 734,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Warum ist der ländliche Nachthimmel über einem kleinen Walddorf wie Schwarzenburg (59 Einwohner) bei klarem Wetter ein besonderes Erlebnis?",
    "a": [
      "Wegen der geringen Lichtverschmutzung sind das Band der Milchstraße, Sternschnuppen und tausende Sterne mit bloßem Auge sichtbar",
      "Weil über Südbrandenburg keine Satelliten fliegen dürfen",
      "Weil die Kiefern nachts blaues Licht abstrahlen",
      "Weil der Mond dort doppelt so nah an der Erde vorbeizieht"
    ],
    "exp": "Fernab großer Städte bietet der dunkle Waldhimmel über Schwarzenburg einen freien Blick auf Milchstraße, Plejaden (Siebengestirn) und Andromeda-Galaxie."
  },
  {
    "id": 735,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Warum herrscht in den trockenen Kiefernwäldern Brandenburgs im Frühjahr und Sommer oft eine erhöhte Waldbrandgefahr (Waldbrandgefahrenstufe)?",
    "a": [
      "Sandböden speichern wenig Wasser, und trockene Kiefernnadelstreu sowie harzreiches Holz entzünden sich bei Funkenflug sehr leicht",
      "Weil Kiefern im Sommer heißes Harz versprühen",
      "Weil Ameisenhaufen sich durch Sonnenlicht von selbst entzünden",
      "Weil der Sandboden aus reinem Schwefel besteht"
    ],
    "exp": "Deshalb gilt in Brandenburgs Wäldern ganzjährig absolutes Rauch- und Feuerverbot – und Einfahrten für Rettungsfahrzeuge müssen im Wald stets freigehalten werden."
  },
  {
    "id": 736,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche krautige Waldpflanze mit dreizähligen, herzförmig gefalteten Blättchen bildet auf schattigen, frischeren Waldböden Teppiche und schmeckt angenehm zitronig-säuerlich?",
    "a": [
      "Der Waldsauerklee (Oxalis acetosella)",
      "Das Maiglöckchen (giftig!)",
      "Der Fingerhut (giftig!)",
      "Das Einbeere-Kraut (giftig!)"
    ],
    "exp": "Waldsauerklee faltet seine zarten Kleeblättchen bei Regen, starker Sonne und in der Nacht wie einen kleinen Regenschirm nach unten zusammen."
  },
  {
    "id": 737,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „tiefreichende Pfahlwurzel trotzt Stürmen und langer Sommertrockenheit auf den Lausitzer Sandböden“?",
    "a": [
      "Waldkiefer (Gemeine Kiefer)",
      "Stieleiche (Deutsche Eiche)",
      "Preiselbeere (Kronsbeere)",
      "Steinpilz (Fichten-/Kiefernsteinpilz)"
    ],
    "exp": "Waldkiefer (Gemeine Kiefer) (Pinus sylvestris): tiefreichende Pfahlwurzel trotzt Stürmen und langer Sommertrockenheit auf den Lausitzer Sandböden. Ihre harzreichen Nadeln verströmen an warmen Sommertagen den typischen würzigen Duft der märkischen Kiefernheide."
  },
  {
    "id": 738,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „besiedelt als lichthungriger Pionierbaum schnell offene Sandflächen; unter ihr wachsen Birkenpilze und Fliegenpilze“?",
    "a": [
      "Hängebirke (Sandbirke)",
      "Eberesche (Vogelbeere)",
      "Walderdbeere",
      "Echter Pfifferling (Eierschwamm)"
    ],
    "exp": "Hängebirke (Sandbirke) (Betula pendula): besiedelt als lichthungriger Pionierbaum schnell offene Sandflächen; unter ihr wachsen Birkenpilze und Fliegenpilze. Das in der weißen Birkenrinde enthaltene „Betulin“ reflektiert starkes Sonnenlicht und macht die Rinde selbst bei Regen wasserabweisend und brennbar."
  },
  {
    "id": 739,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „liefert im Herbst energiereiche Eicheln (Mast) für Wildschweine, Rothirsche, Eichelhäher und Eichhörnchen“?",
    "a": [
      "Traubeneiche",
      "Schwarzerle (Roterle)",
      "Schwarzer Holunder",
      "Krause Glucke (Fette Henne)"
    ],
    "exp": "Traubeneiche (Quercus petraea): liefert im Herbst energiereiche Eicheln (Mast) für Wildschweine, Rothirsche, Eichelhäher und Eichhörnchen. Gemeinsam mit der Stieleiche erhöht sie im Kiefernwald die Artenvielfalt (über 500 Insektenarten leben an Eichen!) und bremst Waldbrände."
  },
  {
    "id": 740,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „kann über 500 bis 800 Jahre alt werden und bietet Hirschkäfer, Heldbock und Spechten Lebensraum“?",
    "a": [
      "Stieleiche (Deutsche Eiche)",
      "Besenheide (Heidekraut)",
      "Sanddorn",
      "Birkenpilz"
    ],
    "exp": "Stieleiche (Deutsche Eiche) (Quercus robur): kann über 500 bis 800 Jahre alt werden und bietet Hirschkäfer, Heldbock und Spechten Lebensraum. Merksatz für Spaziergänger: „Bei der Stieleiche hängen die Eicheln am Stiel, bei der Traubeneiche die Blätter!“"
  },
  {
    "id": 741,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „wichtigste Nahrungsquelle im Herbst und Winter für über 60 Vogelarten (Drosseln, Gimpel, Seidenschwanz) und Baummarder“?",
    "a": [
      "Eberesche (Vogelbeere)",
      "Heidelbeere (Blaubeere)",
      "Schlehe (Schwarzdorn)",
      "Kiefern-Rotkappe (Fuchsrotkappe)"
    ],
    "exp": "Eberesche (Vogelbeere) (Sorbus aucuparia): wichtigste Nahrungsquelle im Herbst und Winter für über 60 Vogelarten (Drosseln, Gimpel, Seidenschwanz) und Baummarder. Trotz des Volksglaubens sind Vogelbeeren nicht giftig: Gekocht als Gelee oder Konfitüre (oder nach dem ersten Frost) verlieren sie ihre bittere Parasorbinsäure."
  },
  {
    "id": 742,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „ihre Wurzeln leben in Symbiose mit Knöllchenbakterien (Frankia), die Luftstickstoff binden, und vertragen monatelange Überflutung“?",
    "a": [
      "Schwarzerle (Roterle)",
      "Preiselbeere (Kronsbeere)",
      "Maronenröhrling (Braunkappe)",
      "Butterpilz (Butter-Röhrling)"
    ],
    "exp": "Schwarzerle (Roterle) (Alnus glutinosa): ihre Wurzeln leben in Symbiose mit Knöllchenbakterien (Frankia), die Luftstickstoff binden, und vertragen monatelange Überflutung. Frisch geschlagenes Erlenholz färbt sich an der Luft rasch leuchtend orangerot – daher auch der Name „Roterle“."
  },
  {
    "id": 743,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „späte und enorm ergiebige Nektarquelle für Honigbienen („Heidehonig“), Wildbienen und Schmetterlinge im Spätsommer“?",
    "a": [
      "Besenheide (Heidekraut)",
      "Walderdbeere",
      "Steinpilz (Fichten-/Kiefernsteinpilz)",
      "Edel-Reizker (Kiefern-Reizker)"
    ],
    "exp": "Besenheide (Heidekraut) (Calluna vulgaris): späte und enorm ergiebige Nektarquelle für Honigbienen („Heidehonig“), Wildbienen und Schmetterlinge im Spätsommer. Früher band man aus den zähen, verzweigten Zweigen haltbare Stall- und Hofbesen – daher der Name „Besenheide“."
  },
  {
    "id": 744,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „beliebtes Sammelobst für Kuchen und Pfannkuchen sowie Hauptnahrung für Fuchs, Dachs, Marder und Waldvögel“?",
    "a": [
      "Heidelbeere (Blaubeere)",
      "Schwarzer Holunder",
      "Echter Pfifferling (Eierschwamm)",
      "Parasol (Riesenschirmling)"
    ],
    "exp": "Heidelbeere (Blaubeere) (Vaccinium myrtillus): beliebtes Sammelobst für Kuchen und Pfannkuchen sowie Hauptnahrung für Fuchs, Dachs, Marder und Waldvögel. Im Gegensatz zur gezüchteten Kulturheidelbeere (mit hellem Fruchtfleisch) färbt die echte Waldheidelbeere Zunge und Lippen kräftig blaurot."
  },
  {
    "id": 745,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „reich an Vitamin C sowie natürlicher Benzoe- und Salicylsäure, weshalb Preiselbeerkompott monatelang ohne Konservierungsstoffe hält“?",
    "a": [
      "Preiselbeere (Kronsbeere)",
      "Sanddorn",
      "Krause Glucke (Fette Henne)",
      "Grüner Knollenblätterpilz"
    ],
    "exp": "Preiselbeere (Kronsbeere) (Vaccinium vitis-idaea): reich an Vitamin C sowie natürlicher Benzoe- und Salicylsäure, weshalb Preiselbeerkompott monatelang ohne Konservierungsstoffe hält. In Schwarzenburg ist die Kombination aus Wildbraten und selbst gesammelten Wald-Preiselbeeren ein echter Klassiker."
  },
  {
    "id": 746,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „perfekter, essbarer Bodendecker für die unterste Schicht eines naturnahen Waldgartens“?",
    "a": [
      "Walderdbeere",
      "Schlehe (Schwarzdorn)",
      "Birkenpilz",
      "Fliegenpilz"
    ],
    "exp": "Walderdbeere (Fragaria vesca): perfekter, essbarer Bodendecker für die unterste Schicht eines naturnahen Waldgartens. Obwohl die Früchte viel kleiner als Gartenerdbeeren sind, besitzen sie ein vielfach intensiveres Aroma."
  },
  {
    "id": 747,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „Blüten für Holunderblütensirup und „Hollerküchle“, gekochte Beeren für Saft und Gelee; Magnet für Mönchsgrasmücke und Star“?",
    "a": [
      "Schwarzer Holunder",
      "Maronenröhrling (Braunkappe)",
      "Kiefern-Rotkappe (Fuchsrotkappe)",
      "Gallenröhrling (Bitterling)"
    ],
    "exp": "Schwarzer Holunder (Sambucus nigra): Blüten für Holunderblütensirup und „Hollerküchle“, gekochte Beeren für Saft und Gelee; Magnet für Mönchsgrasmücke und Star. Altem Volksbrauch nach pflanzte man an jeden Hof einen Holunderbusch als guten Hausgeist („Vor dem Holunder soll man den Hut ziehen“)."
  },
  {
    "id": 748,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „Pionierstrauch auf kargen Sandböden; seine Beeren enthalten bis zu zehnmal mehr Vitamin C als Zitronen („Zitrone des Nordens“)“?",
    "a": [
      "Sanddorn",
      "Steinpilz (Fichten-/Kiefernsteinpilz)",
      "Butterpilz (Butter-Röhrling)",
      "Kahler Krempling"
    ],
    "exp": "Sanddorn (Hippophae rhamnoides): Pionierstrauch auf kargen Sandböden; seine Beeren enthalten bis zu zehnmal mehr Vitamin C als Zitronen („Zitrone des Nordens“). Sanddorn ist zweihäusig: Für eine reiche Beerenernte im Waldgarten braucht man mindestens einen männlichen Bestäuberstrauch neben den weiblichen Sträuchern."
  },
  {
    "id": 749,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „undurchdringlicher Brutplatz für Neuntöter und Goldammer; Raupenfutterpflanze des Segelfalters und Nierenfleck-Zipfelfalters“?",
    "a": [
      "Schlehe (Schwarzdorn)",
      "Echter Pfifferling (Eierschwamm)",
      "Edel-Reizker (Kiefern-Reizker)",
      "Frühjahrslorchel (Giftlorchel)"
    ],
    "exp": "Schlehe (Schwarzdorn) (Prunus spinosa): undurchdringlicher Brutplatz für Neuntöter und Goldammer; Raupenfutterpflanze des Segelfalters und Nierenfleck-Zipfelfalters. Erst nach den ersten strengen Herbstfrösten wird der zusammenziehende Gerbstoff in den Schlehen abgebaut, sodass sie mild und aromatisch für Likör oder Marmelade werden."
  },
  {
    "id": 750,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „Mykorrhizapartner von Kiefer und Fichte von August bis November; hervorragender Brat- und Trockenpilz“?",
    "a": [
      "Maronenröhrling (Braunkappe)",
      "Krause Glucke (Fette Henne)",
      "Parasol (Riesenschirmling)",
      "Echte Rentierflechte"
    ],
    "exp": "Maronenröhrling (Braunkappe) (Imleria badia): Mykorrhizapartner von Kiefer und Fichte von August bis November; hervorragender Brat- und Trockenpilz. Im Gegensatz zum bitteren Gallenröhrling hat die Marone niemals rosa Röhren und kein dunkles Netz am Stiel."
  },
  {
    "id": 751,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „einer der edelsten Speisepilze mit festem, weißem, mild-nussigem Fleisch; lässt sich hervorragend im Dörrautomaten trocknen“?",
    "a": [
      "Steinpilz (Fichten-/Kiefernsteinpilz)",
      "Birkenpilz",
      "Grüner Knollenblätterpilz",
      "Waldkiefer (Gemeine Kiefer)"
    ],
    "exp": "Steinpilz (Fichten-/Kiefernsteinpilz) (Boletus edulis / pinophilus): einer der edelsten Speisepilze mit festem, weißem, mild-nussigem Fleisch; lässt sich hervorragend im Dörrautomaten trocknen. Sein häufigster ungenießbarer Doppelgänger ist der Gallenröhrling („Bitterling“), dessen Röhren im Alter schmutzig-rosa werden und der ein grobes dunkles Stielnetz trägt."
  },
  {
    "id": 752,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „würziger Speisepilz, der fast nie von Maden befallen wird“?",
    "a": [
      "Echter Pfifferling (Eierschwamm)",
      "Kiefern-Rotkappe (Fuchsrotkappe)",
      "Fliegenpilz",
      "Hängebirke (Sandbirke)"
    ],
    "exp": "Echter Pfifferling (Eierschwamm) (Cantharellus cibarius): würziger Speisepilz, der fast nie von Maden befallen wird. Vom ungenießbaren Falschen Pfifferling unterscheidet man ihn sicher an den dicken, querverbundenen Leisten, dem festen weißen Fleisch und dem Aprikosengeruch."
  },
  {
    "id": 753,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „exzellenter, würzig-nussiger Speisepilz mit bissfestem Fleisch (z. B. paniert als Schnitzel oder in Rahmsoße)“?",
    "a": [
      "Krause Glucke (Fette Henne)",
      "Butterpilz (Butter-Röhrling)",
      "Gallenröhrling (Bitterling)",
      "Traubeneiche"
    ],
    "exp": "Krause Glucke (Fette Henne) (Sparassis crispa): exzellenter, würzig-nussiger Speisepilz mit bissfestem Fleisch (z. B. paniert als Schnitzel oder in Rahmsoße). Vor dem Braten teilt man die Krause Glucke am besten in Scheiben und spült sie kurz in lauwarmem Wasser ab, um Kiefernnadeln und Waldsand aus den Windungen zu lösen."
  },
  {
    "id": 754,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „guter Speisepilz (besonders junge, feste Exemplare); wichtigster Symbiosepartner der Hängebirke“?",
    "a": [
      "Birkenpilz",
      "Edel-Reizker (Kiefern-Reizker)",
      "Kahler Krempling",
      "Stieleiche (Deutsche Eiche)"
    ],
    "exp": "Birkenpilz (Leccinum scabrum): guter Speisepilz (besonders junge, feste Exemplare); wichtigster Symbiosepartner der Hängebirke. Beim Kochen verfärbt sich das weiße Fleisch des Birkenpilzes dunkelgrau bis schwärzlich – das ist völlig normal und unbedenklich."
  },
  {
    "id": 755,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „sehr geschätzter, festfleischiger Speisepilz; verfärbt sich im Anschnitt erst rötlich-violett, dann schwärzlich“?",
    "a": [
      "Kiefern-Rotkappe (Fuchsrotkappe)",
      "Parasol (Riesenschirmling)",
      "Frühjahrslorchel (Giftlorchel)",
      "Eberesche (Vogelbeere)"
    ],
    "exp": "Kiefern-Rotkappe (Fuchsrotkappe) (Leccinum vulpinum / aurantiacum): sehr geschätzter, festfleischiger Speisepilz; verfärbt sich im Anschnitt erst rötlich-violett, dann schwärzlich. Wie alle Raufußröhrlinge sollten Rotkappen vor dem Verzehr stets gut durchgegart werden (mindestens 15 Minuten)."
  },
  {
    "id": 756,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „milder, zarter Speisepilz und treuer Begleiter der Waldkiefer“?",
    "a": [
      "Butterpilz (Butter-Röhrling)",
      "Grüner Knollenblätterpilz",
      "Echte Rentierflechte",
      "Schwarzerle (Roterle)"
    ],
    "exp": "Butterpilz (Butter-Röhrling) (Suillus luteus): milder, zarter Speisepilz und treuer Begleiter der Waldkiefer. Tipp für Sammler: Die klebrige braune Huthaut lässt sich schon im Wald wie von selbst komplett vom Hut abziehen."
  },
  {
    "id": 757,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „hervorragender Bratpilz aus der Gattung der Milchlinge“?",
    "a": [
      "Edel-Reizker (Kiefern-Reizker)",
      "Fliegenpilz",
      "Waldkiefer (Gemeine Kiefer)",
      "Besenheide (Heidekraut)"
    ],
    "exp": "Edel-Reizker (Kiefern-Reizker) (Lactarius deliciosus): hervorragender Bratpilz aus der Gattung der Milchlinge. Alle Reizker, die beim Anschneiden sofort karottenrote bis weinrote (nicht weiße!) Milch absondern, sind essbar."
  },
  {
    "id": 758,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „die großen, nussig riechenden Hüte schmecken paniert und in Butter gebraten wie ein Wiener Schnitzel“?",
    "a": [
      "Parasol (Riesenschirmling)",
      "Gallenröhrling (Bitterling)",
      "Hängebirke (Sandbirke)",
      "Heidelbeere (Blaubeere)"
    ],
    "exp": "Parasol (Riesenschirmling) (Macrolepiota procera): die großen, nussig riechenden Hüte schmecken paniert und in Butter gebraten wie ein Wiener Schnitzel. Wichtiges Sicherheitsmerkmal: Der Stiel ist deutlich dunkel genattert und der Ring lässt sich am Stiel frei auf und ab schieben."
  },
  {
    "id": 759,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „tödlich giftig! Verursacht über 90 % aller tödlichen Pilzvergiftungen in Mitteleuropa durch hitzestabile Amatoxine“?",
    "a": [
      "Grüner Knollenblätterpilz",
      "Kahler Krempling",
      "Traubeneiche",
      "Preiselbeere (Kronsbeere)"
    ],
    "exp": "Grüner Knollenblätterpilz (Amanita phalloides): tödlich giftig! Verursacht über 90 % aller tödlichen Pilzvergiftungen in Mitteleuropa durch hitzestabile Amatoxine. Heimtückisch ist die lange Latenzzeit von 6 bis 24 Stunden, in der zunächst keine Symptome auftreten, während die Leber bereits geschädigt wird."
  },
  {
    "id": 760,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „giftig (enthält Ibotensäure und Muscimol); wichtiger Mykorrhizapartner für Birken und Kiefern im Waldökosystem“?",
    "a": [
      "Fliegenpilz",
      "Frühjahrslorchel (Giftlorchel)",
      "Stieleiche (Deutsche Eiche)",
      "Walderdbeere"
    ],
    "exp": "Fliegenpilz (Amanita muscaria): giftig (enthält Ibotensäure und Muscimol); wichtiger Mykorrhizapartner für Birken und Kiefern im Waldökosystem. Der Name stammt daher, dass man früher gezuckerte Milch mit Fliegenpilzstückchen aufstellte, um Stubenfliegen zu betäuben."
  },
  {
    "id": 761,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „nicht giftig, aber durch extremen Bitterstoff völlig ungenießbar – ein einziger Pilz verdirbt das gesamte Pilzgericht!“?",
    "a": [
      "Gallenröhrling (Bitterling)",
      "Echte Rentierflechte",
      "Eberesche (Vogelbeere)",
      "Schwarzer Holunder"
    ],
    "exp": "Gallenröhrling (Bitterling) (Tylopilus felleus): nicht giftig, aber durch extremen Bitterstoff völlig ungenießbar – ein einziger Pilz verdirbt das gesamte Pilzgericht!. Er ist der klassische „Täuscher“ für Steinpilz- und Maronensammler in den Kiefernwäldern der Lausitz."
  },
  {
    "id": 762,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „früher fälschlich als Speisepilz gesammelt, heute als lebensgefährlich giftig bekannt (löst nach wiederholtem Verzehr das tödliche Paxillus-Syndrom / Immunhämolysen aus)“?",
    "a": [
      "Kahler Krempling",
      "Waldkiefer (Gemeine Kiefer)",
      "Schwarzerle (Roterle)",
      "Sanddorn"
    ],
    "exp": "Kahler Krempling (Paxillus involutus): früher fälschlich als Speisepilz gesammelt, heute als lebensgefährlich giftig bekannt (löst nach wiederholtem Verzehr das tödliche Paxillus-Syndrom / Immunhämolysen aus). Ein klassisches Beispiel dafür, warum man alte Pilzbücher vor 1980 nicht mehr zur Bestimmung von Speisepilzen nutzen sollte."
  },
  {
    "id": 763,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „lebensgefährlich giftig! Enthält das flüchtige Zell- und Lebergift Gyromitrin“?",
    "a": [
      "Frühjahrslorchel (Giftlorchel)",
      "Hängebirke (Sandbirke)",
      "Besenheide (Heidekraut)",
      "Schlehe (Schwarzdorn)"
    ],
    "exp": "Frühjahrslorchel (Giftlorchel) (Gyromitra esculenta): lebensgefährlich giftig! Enthält das flüchtige Zell- und Lebergift Gyromitrin. Sie darf keinesfalls mit der essbaren, wabenförmig gekammerten Speisemorchel verwechselt werden."
  },
  {
    "id": 764,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welcher Baum, Strauch oder Pilz rund um Schwarzenburg wird wie folgt genutzt bzw. beschrieben: „Flechten sind eine Lebensgemeinschaft (Symbiose) aus einem Pilz und einer Grünalge; Zeiger für saubere Luft und nährstoffarme Naturböden“?",
    "a": [
      "Echte Rentierflechte",
      "Traubeneiche",
      "Heidelbeere (Blaubeere)",
      "Maronenröhrling (Braunkappe)"
    ],
    "exp": "Echte Rentierflechte (Cladonia rangiferina / arbuscula): Flechten sind eine Lebensgemeinschaft (Symbiose) aus einem Pilz und einer Grünalge; Zeiger für saubere Luft und nährstoffarme Naturböden. Bitte beim Wandern nicht zertreten: Ein Flechtenpolster im trockenen Kiefernwald wächst nur wenige Millimeter pro Jahr!"
  },
  {
    "id": 765,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Bei einer Exkursion durch den Schwarzenburger Wald findest du „Waldkiefer (Gemeine Kiefer)“. Zu welcher Gruppe gehört dieser Fund?",
    "a": [
      "Hauptbaumart der Schwarzenburger Wälder (Pinus sylvestris)",
      "Mischbaumart in naturnahen Kiefern-Eichen-Wäldern (Quercus petraea)",
      "Waldränder, Lichtungen und Waldgärten (Sorbus aucuparia)",
      "sonnige Kiefernwaldlichtungen, Wegränder und Sandheiden rund um Schwarzenburg (Calluna vulgaris)"
    ],
    "exp": "Waldkiefer (Gemeine Kiefer) (Pinus sylvestris) zählt zur Gruppe: Hauptbaumart der Schwarzenburger Wälder."
  },
  {
    "id": 766,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Merkmals- und Nutzenkombination gehört im Schwarzenburger Wald eindeutig zu „Waldkiefer (Gemeine Kiefer)“?",
    "a": [
      "immergrüne Nadeln, die stets paarweise (zu zweit) in einer Kurztriebscheide sitzen; im oberen Stammbereich leuchtend fuchsrote „Spiegelrinde“ · tiefreichende Pfahlwurzel trotzt Stürmen und langer Sommertrockenheit auf den Lausitzer Sandböden",
      "rundliche, vorne leicht eingebuchtete Blätter und kleine, holzige schwarze „Erlenzäpfchen“, die den ganzen Winter am Baum bleiben · ihre Wurzeln leben in Symbiose mit Knöllchenbakterien (Frankia), die Luftstickstoff binden, und vertragen monatelange Überflutung",
      "duftende cremeweiße Blütenschirme im Juni und glänzend schwarze Beerendolden an rötlichen Stielen im September · Blüten für Holunderblütensirup und „Hollerküchle“, gekochte Beeren für Saft und Gelee; Magnet für Mönchsgrasmücke und Star",
      "dottergelber, trichterförmig geschwungener Fruchtkörper mit gegabelten, herablaufenden Leisten (keine dünnen Lamellen!) und fruchtigem Aprikosenduft · würziger Speisepilz, der fast nie von Maden befallen wird"
    ],
    "exp": "Waldkiefer (Gemeine Kiefer): immergrüne Nadeln, die stets paarweise (zu zweit) in einer Kurztriebscheide sitzen; im oberen Stammbereich leuchtend fuchsrote „Spiegelrinde“. Bedeutung: tiefreichende Pfahlwurzel trotzt Stürmen und langer Sommertrockenheit auf den Lausitzer Sandböden."
  },
  {
    "id": 767,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher botanische bzw. pilzkundliche Steckbrief beschreibt „Pinus sylvestris“ (Waldkiefer (Gemeine Kiefer)) korrekt?",
    "a": [
      "immergrüne Nadeln, die stets paarweise (zu zweit) in einer Kurztriebscheide sitzen; im oberen Stammbereich leuchtend fuchsrote „Spiegelrinde“ – Ihre harzreichen Nadeln verströmen an warmen Sommertagen den typischen würzigen Duft der märkischen Kiefernheide.",
      "dreizählige, gezähnte Blätter, weiße Blüten und kleine rote Sammelnussfrüchte mit intensivem Waldaroma – Obwohl die Früchte viel kleiner als Gartenerdbeeren sind, besitzen sie ein vielfach intensiveres Aroma.",
      "leuchtend orangeroter bis fuchsroter Hut mit überstehender Huthaut am Rand und rau geschupptem Stiel – Wie alle Raufußröhrlinge sollten Rotkappen vor dem Verzehr stets gut durchgegart werden (mindestens 15 Minuten).",
      "buschig verzweigte, silbrig-grauweiße bis grünliche Polster am Waldboden, die bei Trockenheit knistern und bei Regen weich wie ein Schwamm werden – Bitte beim Wandern nicht zertreten: Ein Flechtenpolster im trockenen Kiefernwald wächst nur wenige Millimeter pro Jahr!"
    ],
    "exp": "Steckbrief für Waldkiefer (Gemeine Kiefer) (Pinus sylvestris): immergrüne Nadeln, die stets paarweise (zu zweit) in einer Kurztriebscheide sitzen; im oberen Stammbereich leuchtend fuchsrote „Spiegelrinde“ Ihre harzreichen Nadeln verströmen an warmen Sommertagen den typischen würzigen Duft der märkischen Kiefernheide."
  },
  {
    "id": 768,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Du suchst rund um Schwarzenburg nach einer Art, für die gilt: „tiefreichende Pfahlwurzel trotzt Stürmen und langer Sommertrockenheit auf den Lausitzer Sandböden“ und „Ihre harzreichen Nadeln verströmen an warmen Sommertagen den typischen würzigen Duft der märkischen Kiefernheide.“. Welche Art ist gemeint?",
    "a": [
      "Waldkiefer (Gemeine Kiefer)",
      "Sanddorn",
      "Grüner Knollenblätterpilz",
      "Schwarzerle (Roterle)"
    ],
    "exp": "Beide Hinweise beschreiben Waldkiefer (Gemeine Kiefer) (Pinus sylvestris)."
  },
  {
    "id": 769,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Bei einer Exkursion durch den Schwarzenburger Wald findest du „Hängebirke (Sandbirke)“. Zu welcher Gruppe gehört dieser Fund?",
    "a": [
      "Pionierbaum an Kiefernwaldrändern und Lichtungen (Betula pendula)",
      "Wälder, Dorfränder und Alleen in Heideblick (Quercus robur)",
      "Erlenbrüche (wie am Borcheltsbusch), Bachufer und feuchte Senken (Alnus glutinosa)",
      "lichte Kiefernwälder auf sauren Humus- und Sandböden um Schwarzenburg (Vaccinium myrtillus)"
    ],
    "exp": "Hängebirke (Sandbirke) (Betula pendula) zählt zur Gruppe: Pionierbaum an Kiefernwaldrändern und Lichtungen."
  },
  {
    "id": 770,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Merkmals- und Nutzenkombination gehört im Schwarzenburger Wald eindeutig zu „Hängebirke (Sandbirke)“?",
    "a": [
      "auffallend weiße Rinde mit dunklen Rissen und bogig herabhängende, feine Zweige · besiedelt als lichthungriger Pionierbaum schnell offene Sandflächen; unter ihr wachsen Birkenpilze und Fliegenpilze",
      "immergrüner Zwergstrauch mit winzigen, schuppenförmigen Blättchen und violett-rosa Blütenteppich von August bis Oktober · späte und enorm ergiebige Nektarquelle für Honigbienen („Heidehonig“), Wildbienen und Schmetterlinge im Spätsommer",
      "silbrig-graue, schmale Blätter, spitze Dornen und dicht gedrängte, leuchtend orangefarbene Beeren ab Spätsommer · Pionierstrauch auf kargen Sandböden; seine Beeren enthalten bis zu zehnmal mehr Vitamin C als Zitronen („Zitrone des Nordens“)",
      "bis zu 30 cm großer, gelblich-cremefarbener, kraus gewundener Fruchtkörper, der wie ein Badeschwamm oder Blumenkohl aussieht · exzellenter, würzig-nussiger Speisepilz mit bissfestem Fleisch (z. B. paniert als Schnitzel oder in Rahmsoße)"
    ],
    "exp": "Hängebirke (Sandbirke): auffallend weiße Rinde mit dunklen Rissen und bogig herabhängende, feine Zweige. Bedeutung: besiedelt als lichthungriger Pionierbaum schnell offene Sandflächen; unter ihr wachsen Birkenpilze und Fliegenpilze."
  },
  {
    "id": 771,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher botanische bzw. pilzkundliche Steckbrief beschreibt „Betula pendula“ (Hängebirke (Sandbirke)) korrekt?",
    "a": [
      "auffallend weiße Rinde mit dunklen Rissen und bogig herabhängende, feine Zweige – Das in der weißen Birkenrinde enthaltene „Betulin“ reflektiert starkes Sonnenlicht und macht die Rinde selbst bei Regen wasserabweisend und brennbar.",
      "duftende cremeweiße Blütenschirme im Juni und glänzend schwarze Beerendolden an rötlichen Stielen im September – Altem Volksbrauch nach pflanzte man an jeden Hof einen Holunderbusch als guten Hausgeist („Vor dem Holunder soll man den Hut ziehen“).",
      "schokoladenbrauner, bei Feuchtigkeit schleimiger Hut, gelbe Poren und ein deutlicher häutiger Ring am Stiel – Tipp für Sammler: Die klebrige braune Huthaut lässt sich schon im Wald wie von selbst komplett vom Hut abziehen.",
      "immergrüne Nadeln, die stets paarweise (zu zweit) in einer Kurztriebscheide sitzen; im oberen Stammbereich leuchtend fuchsrote „Spiegelrinde“ – Ihre harzreichen Nadeln verströmen an warmen Sommertagen den typischen würzigen Duft der märkischen Kiefernheide."
    ],
    "exp": "Steckbrief für Hängebirke (Sandbirke) (Betula pendula): auffallend weiße Rinde mit dunklen Rissen und bogig herabhängende, feine Zweige Das in der weißen Birkenrinde enthaltene „Betulin“ reflektiert starkes Sonnenlicht und macht die Rinde selbst bei Regen wasserabweisend und brennbar."
  },
  {
    "id": 772,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Du suchst rund um Schwarzenburg nach einer Art, für die gilt: „besiedelt als lichthungriger Pionierbaum schnell offene Sandflächen; unter ihr wachsen Birkenpilze und Fliegenpilze“ und „Das in der weißen Birkenrinde enthaltene „Betulin“ reflektiert starkes Sonnenlicht und macht die Rinde selbst bei Regen wasserabweisend und brennbar.“. Welche Art ist gemeint?",
    "a": [
      "Hängebirke (Sandbirke)",
      "Schlehe (Schwarzdorn)",
      "Fliegenpilz",
      "Besenheide (Heidekraut)"
    ],
    "exp": "Beide Hinweise beschreiben Hängebirke (Sandbirke) (Betula pendula)."
  },
  {
    "id": 773,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Bei einer Exkursion durch den Schwarzenburger Wald findest du „Traubeneiche“. Zu welcher Gruppe gehört dieser Fund?",
    "a": [
      "Mischbaumart in naturnahen Kiefern-Eichen-Wäldern (Quercus petraea)",
      "Waldränder, Lichtungen und Waldgärten (Sorbus aucuparia)",
      "sonnige Kiefernwaldlichtungen, Wegränder und Sandheiden rund um Schwarzenburg (Calluna vulgaris)",
      "trockene, sonnige Kiefernwälder rund um Schwarzenburg (Vaccinium vitis-idaea)"
    ],
    "exp": "Traubeneiche (Quercus petraea) zählt zur Gruppe: Mischbaumart in naturnahen Kiefern-Eichen-Wäldern."
  },
  {
    "id": 774,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Merkmals- und Nutzenkombination gehört im Schwarzenburger Wald eindeutig zu „Traubeneiche“?",
    "a": [
      "gelappte Blätter mit deutlichem Blattstiel, während die Eicheln ungestielt („traubig gehäuft“) am Zweig sitzen · liefert im Herbst energiereiche Eicheln (Mast) für Wildschweine, Rothirsche, Eichelhäher und Eichhörnchen",
      "grün kantige Zweige, sommergrüne Blättchen und blauschwarze, innen tief dunkelblau färbende Beeren ab Juni/Juli · beliebtes Sammelobst für Kuchen und Pfannkuchen sowie Hauptnahrung für Fuchs, Dachs, Marder und Waldvögel",
      "blüht bereits im April vor dem Laubaustrieb wie eine weiße Schneewolke; blauschwarze, bereifte Steinfrüchte im Herbst · undurchdringlicher Brutplatz für Neuntöter und Goldammer; Raupenfutterpflanze des Segelfalters und Nierenfleck-Zipfelfalters",
      "graubrauner, glatter Hut und schlanker, weißlicher Stiel, der dicht mit dunklen, rauen Schüppchen („Raufuß“) besetzt ist · guter Speisepilz (besonders junge, feste Exemplare); wichtigster Symbiosepartner der Hängebirke"
    ],
    "exp": "Traubeneiche: gelappte Blätter mit deutlichem Blattstiel, während die Eicheln ungestielt („traubig gehäuft“) am Zweig sitzen. Bedeutung: liefert im Herbst energiereiche Eicheln (Mast) für Wildschweine, Rothirsche, Eichelhäher und Eichhörnchen."
  },
  {
    "id": 775,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher botanische bzw. pilzkundliche Steckbrief beschreibt „Quercus petraea“ (Traubeneiche) korrekt?",
    "a": [
      "gelappte Blätter mit deutlichem Blattstiel, während die Eicheln ungestielt („traubig gehäuft“) am Zweig sitzen – Gemeinsam mit der Stieleiche erhöht sie im Kiefernwald die Artenvielfalt (über 500 Insektenarten leben an Eichen!) und bremst Waldbrände.",
      "silbrig-graue, schmale Blätter, spitze Dornen und dicht gedrängte, leuchtend orangefarbene Beeren ab Spätsommer – Sanddorn ist zweihäusig: Für eine reiche Beerenernte im Waldgarten braucht man mindestens einen männlichen Bestäuberstrauch neben den weiblichen Sträuchern.",
      "orangefarbener, konzentrisch gezonte Kreise zeigender Hut mit kleinen Grübchen am Stiel; tritt bei Verletzung leuchtend karottenrote Milch aus – Alle Reizker, die beim Anschneiden sofort karottenrote bis weinrote (nicht weiße!) Milch absondern, sind essbar.",
      "auffallend weiße Rinde mit dunklen Rissen und bogig herabhängende, feine Zweige – Das in der weißen Birkenrinde enthaltene „Betulin“ reflektiert starkes Sonnenlicht und macht die Rinde selbst bei Regen wasserabweisend und brennbar."
    ],
    "exp": "Steckbrief für Traubeneiche (Quercus petraea): gelappte Blätter mit deutlichem Blattstiel, während die Eicheln ungestielt („traubig gehäuft“) am Zweig sitzen Gemeinsam mit der Stieleiche erhöht sie im Kiefernwald die Artenvielfalt (über 500 Insektenarten leben an Eichen!) und bremst Waldbrände."
  },
  {
    "id": 776,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Du suchst rund um Schwarzenburg nach einer Art, für die gilt: „liefert im Herbst energiereiche Eicheln (Mast) für Wildschweine, Rothirsche, Eichelhäher und Eichhörnchen“ und „Gemeinsam mit der Stieleiche erhöht sie im Kiefernwald die Artenvielfalt (über 500 Insektenarten leben an Eichen!) und bremst Waldbrände.“. Welche Art ist gemeint?",
    "a": [
      "Traubeneiche",
      "Maronenröhrling (Braunkappe)",
      "Gallenröhrling (Bitterling)",
      "Heidelbeere (Blaubeere)"
    ],
    "exp": "Beide Hinweise beschreiben Traubeneiche (Quercus petraea)."
  },
  {
    "id": 777,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Bei einer Exkursion durch den Schwarzenburger Wald findest du „Stieleiche (Deutsche Eiche)“. Zu welcher Gruppe gehört dieser Fund?",
    "a": [
      "Wälder, Dorfränder und Alleen in Heideblick (Quercus robur)",
      "Erlenbrüche (wie am Borcheltsbusch), Bachufer und feuchte Senken (Alnus glutinosa)",
      "lichte Kiefernwälder auf sauren Humus- und Sandböden um Schwarzenburg (Vaccinium myrtillus)",
      "sonnige Waldwege, Lichtungen und der heimische Waldgarten (Fragaria vesca)"
    ],
    "exp": "Stieleiche (Deutsche Eiche) (Quercus robur) zählt zur Gruppe: Wälder, Dorfränder und Alleen in Heideblick."
  },
  {
    "id": 778,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Merkmals- und Nutzenkombination gehört im Schwarzenburger Wald eindeutig zu „Stieleiche (Deutsche Eiche)“?",
    "a": [
      "Blätter fast ungestielt mit kleinen „Öhrchen“ am Grund, dafür hängen die Eicheln an langen Stielen („Stieleiche“) · kann über 500 bis 800 Jahre alt werden und bietet Hirschkäfer, Heldbock und Spechten Lebensraum",
      "immergrüne, derb-ledrige, glänzende Blättchen (ähnlich Buchsbaum) und leuchtend rote, herb-säuerliche Beeren im Spätsommer · reich an Vitamin C sowie natürlicher Benzoe- und Salicylsäure, weshalb Preiselbeerkompott monatelang ohne Konservierungsstoffe hält",
      "kastanienbrauner Hut, gelbliche bis grünlich-gelbe Röhren unter dem Hut, die sich bei Fingerdruck sofort bläulich verfärben · Mykorrhizapartner von Kiefer und Fichte von August bis November; hervorragender Brat- und Trockenpilz",
      "leuchtend orangeroter bis fuchsroter Hut mit überstehender Huthaut am Rand und rau geschupptem Stiel · sehr geschätzter, festfleischiger Speisepilz; verfärbt sich im Anschnitt erst rötlich-violett, dann schwärzlich"
    ],
    "exp": "Stieleiche (Deutsche Eiche): Blätter fast ungestielt mit kleinen „Öhrchen“ am Grund, dafür hängen die Eicheln an langen Stielen („Stieleiche“). Bedeutung: kann über 500 bis 800 Jahre alt werden und bietet Hirschkäfer, Heldbock und Spechten Lebensraum."
  },
  {
    "id": 779,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher botanische bzw. pilzkundliche Steckbrief beschreibt „Quercus robur“ (Stieleiche (Deutsche Eiche)) korrekt?",
    "a": [
      "Blätter fast ungestielt mit kleinen „Öhrchen“ am Grund, dafür hängen die Eicheln an langen Stielen („Stieleiche“) – Merksatz für Spaziergänger: „Bei der Stieleiche hängen die Eicheln am Stiel, bei der Traubeneiche die Blätter!“",
      "blüht bereits im April vor dem Laubaustrieb wie eine weiße Schneewolke; blauschwarze, bereifte Steinfrüchte im Herbst – Erst nach den ersten strengen Herbstfrösten wird der zusammenziehende Gerbstoff in den Schlehen abgebaut, sodass sie mild und aromatisch für Likör oder Marmelade werden.",
      "bis zu 30 cm breiter, geschuppter Schirm, ein frei verschiebbarer doppelter Ring am langen, genatterten („schlangenhautartig gemusterten“) Stiel – Wichtiges Sicherheitsmerkmal: Der Stiel ist deutlich dunkel genattert und der Ring lässt sich am Stiel frei auf und ab schieben.",
      "gelappte Blätter mit deutlichem Blattstiel, während die Eicheln ungestielt („traubig gehäuft“) am Zweig sitzen – Gemeinsam mit der Stieleiche erhöht sie im Kiefernwald die Artenvielfalt (über 500 Insektenarten leben an Eichen!) und bremst Waldbrände."
    ],
    "exp": "Steckbrief für Stieleiche (Deutsche Eiche) (Quercus robur): Blätter fast ungestielt mit kleinen „Öhrchen“ am Grund, dafür hängen die Eicheln an langen Stielen („Stieleiche“) Merksatz für Spaziergänger: „Bei der Stieleiche hängen die Eicheln am Stiel, bei der Traubeneiche die Blätter!“"
  },
  {
    "id": 780,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Du suchst rund um Schwarzenburg nach einer Art, für die gilt: „kann über 500 bis 800 Jahre alt werden und bietet Hirschkäfer, Heldbock und Spechten Lebensraum“ und „Merksatz für Spaziergänger: „Bei der Stieleiche hängen die Eicheln am Stiel, bei der Traubeneiche die Blätter!““. Welche Art ist gemeint?",
    "a": [
      "Stieleiche (Deutsche Eiche)",
      "Steinpilz (Fichten-/Kiefernsteinpilz)",
      "Kahler Krempling",
      "Preiselbeere (Kronsbeere)"
    ],
    "exp": "Beide Hinweise beschreiben Stieleiche (Deutsche Eiche) (Quercus robur)."
  },
  {
    "id": 781,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Bei einer Exkursion durch den Schwarzenburger Wald findest du „Eberesche (Vogelbeere)“. Zu welcher Gruppe gehört dieser Fund?",
    "a": [
      "Waldränder, Lichtungen und Waldgärten (Sorbus aucuparia)",
      "sonnige Kiefernwaldlichtungen, Wegränder und Sandheiden rund um Schwarzenburg (Calluna vulgaris)",
      "trockene, sonnige Kiefernwälder rund um Schwarzenburg (Vaccinium vitis-idaea)",
      "Bauernhöfe, Waldränder und Waldgärten in Schwarzenburg (Sambucus nigra)"
    ],
    "exp": "Eberesche (Vogelbeere) (Sorbus aucuparia) zählt zur Gruppe: Waldränder, Lichtungen und Waldgärten."
  },
  {
    "id": 782,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Merkmals- und Nutzenkombination gehört im Schwarzenburger Wald eindeutig zu „Eberesche (Vogelbeere)“?",
    "a": [
      "gefiederte Blätter, weiße Blütendolden im Mai und leuchtend korallenrote Beerendolden ab Spätsommer · wichtigste Nahrungsquelle im Herbst und Winter für über 60 Vogelarten (Drosseln, Gimpel, Seidenschwanz) und Baummarder",
      "dreizählige, gezähnte Blätter, weiße Blüten und kleine rote Sammelnussfrüchte mit intensivem Waldaroma · perfekter, essbarer Bodendecker für die unterste Schicht eines naturnahen Waldgartens",
      "brauner Hut, bauchiger Stiel mit feinem weißem Adernetz im oberen Teil; Röhren anfangs weiß, später gelbgrün (blauen bei Druck NICHT) · einer der edelsten Speisepilze mit festem, weißem, mild-nussigem Fleisch; lässt sich hervorragend im Dörrautomaten trocknen",
      "schokoladenbrauner, bei Feuchtigkeit schleimiger Hut, gelbe Poren und ein deutlicher häutiger Ring am Stiel · milder, zarter Speisepilz und treuer Begleiter der Waldkiefer"
    ],
    "exp": "Eberesche (Vogelbeere): gefiederte Blätter, weiße Blütendolden im Mai und leuchtend korallenrote Beerendolden ab Spätsommer. Bedeutung: wichtigste Nahrungsquelle im Herbst und Winter für über 60 Vogelarten (Drosseln, Gimpel, Seidenschwanz) und Baummarder."
  },
  {
    "id": 783,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher botanische bzw. pilzkundliche Steckbrief beschreibt „Sorbus aucuparia“ (Eberesche (Vogelbeere)) korrekt?",
    "a": [
      "gefiederte Blätter, weiße Blütendolden im Mai und leuchtend korallenrote Beerendolden ab Spätsommer – Trotz des Volksglaubens sind Vogelbeeren nicht giftig: Gekocht als Gelee oder Konfitüre (oder nach dem ersten Frost) verlieren sie ihre bittere Parasorbinsäure.",
      "kastanienbrauner Hut, gelbliche bis grünlich-gelbe Röhren unter dem Hut, die sich bei Fingerdruck sofort bläulich verfärben – Im Gegensatz zum bitteren Gallenröhrling hat die Marone niemals rosa Röhren und kein dunkles Netz am Stiel.",
      "olivgrünlicher bis gelbgrünlicher Hut, reinweiße Lamellen (bleiben immer weiß!), Ring am Stiel und eine sackartige weiße Scheide („Volva“) um die Stielknolle im Boden – Heimtückisch ist die lange Latenzzeit von 6 bis 24 Stunden, in der zunächst keine Symptome auftreten, während die Leber bereits geschädigt wird.",
      "Blätter fast ungestielt mit kleinen „Öhrchen“ am Grund, dafür hängen die Eicheln an langen Stielen („Stieleiche“) – Merksatz für Spaziergänger: „Bei der Stieleiche hängen die Eicheln am Stiel, bei der Traubeneiche die Blätter!“"
    ],
    "exp": "Steckbrief für Eberesche (Vogelbeere) (Sorbus aucuparia): gefiederte Blätter, weiße Blütendolden im Mai und leuchtend korallenrote Beerendolden ab Spätsommer Trotz des Volksglaubens sind Vogelbeeren nicht giftig: Gekocht als Gelee oder Konfitüre (oder nach dem ersten Frost) verlieren sie ihre bittere Parasorbinsäure."
  },
  {
    "id": 784,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Du suchst rund um Schwarzenburg nach einer Art, für die gilt: „wichtigste Nahrungsquelle im Herbst und Winter für über 60 Vogelarten (Drosseln, Gimpel, Seidenschwanz) und Baummarder“ und „Trotz des Volksglaubens sind Vogelbeeren nicht giftig: Gekocht als Gelee oder Konfitüre (oder nach dem ersten Frost) verlieren sie ihre bittere Parasorbinsäure.“. Welche Art ist gemeint?",
    "a": [
      "Eberesche (Vogelbeere)",
      "Echter Pfifferling (Eierschwamm)",
      "Frühjahrslorchel (Giftlorchel)",
      "Walderdbeere"
    ],
    "exp": "Beide Hinweise beschreiben Eberesche (Vogelbeere) (Sorbus aucuparia)."
  },
  {
    "id": 785,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Bei einer Exkursion durch den Schwarzenburger Wald findest du „Schwarzerle (Roterle)“. Zu welcher Gruppe gehört dieser Fund?",
    "a": [
      "Erlenbrüche (wie am Borcheltsbusch), Bachufer und feuchte Senken (Alnus glutinosa)",
      "lichte Kiefernwälder auf sauren Humus- und Sandböden um Schwarzenburg (Vaccinium myrtillus)",
      "sonnige Waldwege, Lichtungen und der heimische Waldgarten (Fragaria vesca)",
      "sonnige Sandböschungen, Bergbaufolgelandschaften und Waldgärten Brandenburgs (Hippophae rhamnoides)"
    ],
    "exp": "Schwarzerle (Roterle) (Alnus glutinosa) zählt zur Gruppe: Erlenbrüche (wie am Borcheltsbusch), Bachufer und feuchte Senken."
  },
  {
    "id": 786,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Merkmals- und Nutzenkombination gehört im Schwarzenburger Wald eindeutig zu „Schwarzerle (Roterle)“?",
    "a": [
      "rundliche, vorne leicht eingebuchtete Blätter und kleine, holzige schwarze „Erlenzäpfchen“, die den ganzen Winter am Baum bleiben · ihre Wurzeln leben in Symbiose mit Knöllchenbakterien (Frankia), die Luftstickstoff binden, und vertragen monatelange Überflutung",
      "duftende cremeweiße Blütenschirme im Juni und glänzend schwarze Beerendolden an rötlichen Stielen im September · Blüten für Holunderblütensirup und „Hollerküchle“, gekochte Beeren für Saft und Gelee; Magnet für Mönchsgrasmücke und Star",
      "dottergelber, trichterförmig geschwungener Fruchtkörper mit gegabelten, herablaufenden Leisten (keine dünnen Lamellen!) und fruchtigem Aprikosenduft · würziger Speisepilz, der fast nie von Maden befallen wird",
      "orangefarbener, konzentrisch gezonte Kreise zeigender Hut mit kleinen Grübchen am Stiel; tritt bei Verletzung leuchtend karottenrote Milch aus · hervorragender Bratpilz aus der Gattung der Milchlinge"
    ],
    "exp": "Schwarzerle (Roterle): rundliche, vorne leicht eingebuchtete Blätter und kleine, holzige schwarze „Erlenzäpfchen“, die den ganzen Winter am Baum bleiben. Bedeutung: ihre Wurzeln leben in Symbiose mit Knöllchenbakterien (Frankia), die Luftstickstoff binden, und vertragen monatelange Überflutung."
  },
  {
    "id": 787,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher botanische bzw. pilzkundliche Steckbrief beschreibt „Alnus glutinosa“ (Schwarzerle (Roterle)) korrekt?",
    "a": [
      "rundliche, vorne leicht eingebuchtete Blätter und kleine, holzige schwarze „Erlenzäpfchen“, die den ganzen Winter am Baum bleiben – Frisch geschlagenes Erlenholz färbt sich an der Luft rasch leuchtend orangerot – daher auch der Name „Roterle“.",
      "brauner Hut, bauchiger Stiel mit feinem weißem Adernetz im oberen Teil; Röhren anfangs weiß, später gelbgrün (blauen bei Druck NICHT) – Sein häufigster ungenießbarer Doppelgänger ist der Gallenröhrling („Bitterling“), dessen Röhren im Alter schmutzig-rosa werden und der ein grobes dunkles Stielnetz trägt.",
      "leuchtend roter Hut mit weißen Flocken (Velumresten), weiße Lamellen, beringter Stiel und warzig gegürtelte Knolle – Der Name stammt daher, dass man früher gezuckerte Milch mit Fliegenpilzstückchen aufstellte, um Stubenfliegen zu betäuben.",
      "gefiederte Blätter, weiße Blütendolden im Mai und leuchtend korallenrote Beerendolden ab Spätsommer – Trotz des Volksglaubens sind Vogelbeeren nicht giftig: Gekocht als Gelee oder Konfitüre (oder nach dem ersten Frost) verlieren sie ihre bittere Parasorbinsäure."
    ],
    "exp": "Steckbrief für Schwarzerle (Roterle) (Alnus glutinosa): rundliche, vorne leicht eingebuchtete Blätter und kleine, holzige schwarze „Erlenzäpfchen“, die den ganzen Winter am Baum bleiben Frisch geschlagenes Erlenholz färbt sich an der Luft rasch leuchtend orangerot – daher auch der Name „Roterle“."
  },
  {
    "id": 788,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Du suchst rund um Schwarzenburg nach einer Art, für die gilt: „ihre Wurzeln leben in Symbiose mit Knöllchenbakterien (Frankia), die Luftstickstoff binden, und vertragen monatelange Überflutung“ und „Frisch geschlagenes Erlenholz färbt sich an der Luft rasch leuchtend orangerot – daher auch der Name „Roterle“.“. Welche Art ist gemeint?",
    "a": [
      "Schwarzerle (Roterle)",
      "Krause Glucke (Fette Henne)",
      "Echte Rentierflechte",
      "Schwarzer Holunder"
    ],
    "exp": "Beide Hinweise beschreiben Schwarzerle (Roterle) (Alnus glutinosa)."
  },
  {
    "id": 789,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Bei einer Exkursion durch den Schwarzenburger Wald findest du „Besenheide (Heidekraut)“. Zu welcher Gruppe gehört dieser Fund?",
    "a": [
      "sonnige Kiefernwaldlichtungen, Wegränder und Sandheiden rund um Schwarzenburg (Calluna vulgaris)",
      "trockene, sonnige Kiefernwälder rund um Schwarzenburg (Vaccinium vitis-idaea)",
      "Bauernhöfe, Waldränder und Waldgärten in Schwarzenburg (Sambucus nigra)",
      "sonnige Waldränder und Feldhecken rund um Heideblick (Prunus spinosa)"
    ],
    "exp": "Besenheide (Heidekraut) (Calluna vulgaris) zählt zur Gruppe: sonnige Kiefernwaldlichtungen, Wegränder und Sandheiden rund um Schwarzenburg."
  },
  {
    "id": 790,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Merkmals- und Nutzenkombination gehört im Schwarzenburger Wald eindeutig zu „Besenheide (Heidekraut)“?",
    "a": [
      "immergrüner Zwergstrauch mit winzigen, schuppenförmigen Blättchen und violett-rosa Blütenteppich von August bis Oktober · späte und enorm ergiebige Nektarquelle für Honigbienen („Heidehonig“), Wildbienen und Schmetterlinge im Spätsommer",
      "silbrig-graue, schmale Blätter, spitze Dornen und dicht gedrängte, leuchtend orangefarbene Beeren ab Spätsommer · Pionierstrauch auf kargen Sandböden; seine Beeren enthalten bis zu zehnmal mehr Vitamin C als Zitronen („Zitrone des Nordens“)",
      "bis zu 30 cm großer, gelblich-cremefarbener, kraus gewundener Fruchtkörper, der wie ein Badeschwamm oder Blumenkohl aussieht · exzellenter, würzig-nussiger Speisepilz mit bissfestem Fleisch (z. B. paniert als Schnitzel oder in Rahmsoße)",
      "bis zu 30 cm breiter, geschuppter Schirm, ein frei verschiebbarer doppelter Ring am langen, genatterten („schlangenhautartig gemusterten“) Stiel · die großen, nussig riechenden Hüte schmecken paniert und in Butter gebraten wie ein Wiener Schnitzel"
    ],
    "exp": "Besenheide (Heidekraut): immergrüner Zwergstrauch mit winzigen, schuppenförmigen Blättchen und violett-rosa Blütenteppich von August bis Oktober. Bedeutung: späte und enorm ergiebige Nektarquelle für Honigbienen („Heidehonig“), Wildbienen und Schmetterlinge im Spätsommer."
  },
  {
    "id": 791,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher botanische bzw. pilzkundliche Steckbrief beschreibt „Calluna vulgaris“ (Besenheide (Heidekraut)) korrekt?",
    "a": [
      "immergrüner Zwergstrauch mit winzigen, schuppenförmigen Blättchen und violett-rosa Blütenteppich von August bis Oktober – Früher band man aus den zähen, verzweigten Zweigen haltbare Stall- und Hofbesen – daher der Name „Besenheide“.",
      "dottergelber, trichterförmig geschwungener Fruchtkörper mit gegabelten, herablaufenden Leisten (keine dünnen Lamellen!) und fruchtigem Aprikosenduft – Vom ungenießbaren Falschen Pfifferling unterscheidet man ihn sicher an den dicken, querverbundenen Leisten, dem festen weißen Fleisch und dem Aprikosengeruch.",
      "brauner Hut wie beim Steinpilz, aber grobes dunkles Netz am Stiel und im Alter schmutzig-rosa vorwölbende Röhren – Er ist der klassische „Täuscher“ für Steinpilz- und Maronensammler in den Kiefernwäldern der Lausitz.",
      "rundliche, vorne leicht eingebuchtete Blätter und kleine, holzige schwarze „Erlenzäpfchen“, die den ganzen Winter am Baum bleiben – Frisch geschlagenes Erlenholz färbt sich an der Luft rasch leuchtend orangerot – daher auch der Name „Roterle“."
    ],
    "exp": "Steckbrief für Besenheide (Heidekraut) (Calluna vulgaris): immergrüner Zwergstrauch mit winzigen, schuppenförmigen Blättchen und violett-rosa Blütenteppich von August bis Oktober Früher band man aus den zähen, verzweigten Zweigen haltbare Stall- und Hofbesen – daher der Name „Besenheide“."
  },
  {
    "id": 792,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Du suchst rund um Schwarzenburg nach einer Art, für die gilt: „späte und enorm ergiebige Nektarquelle für Honigbienen („Heidehonig“), Wildbienen und Schmetterlinge im Spätsommer“ und „Früher band man aus den zähen, verzweigten Zweigen haltbare Stall- und Hofbesen – daher der Name „Besenheide“.“. Welche Art ist gemeint?",
    "a": [
      "Besenheide (Heidekraut)",
      "Birkenpilz",
      "Waldkiefer (Gemeine Kiefer)",
      "Sanddorn"
    ],
    "exp": "Beide Hinweise beschreiben Besenheide (Heidekraut) (Calluna vulgaris)."
  },
  {
    "id": 793,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Bei einer Exkursion durch den Schwarzenburger Wald findest du „Heidelbeere (Blaubeere)“. Zu welcher Gruppe gehört dieser Fund?",
    "a": [
      "lichte Kiefernwälder auf sauren Humus- und Sandböden um Schwarzenburg (Vaccinium myrtillus)",
      "sonnige Waldwege, Lichtungen und der heimische Waldgarten (Fragaria vesca)",
      "sonnige Sandböschungen, Bergbaufolgelandschaften und Waldgärten Brandenburgs (Hippophae rhamnoides)",
      "Speisepilz Nr. 1 der Schwarzenburger Kiefernwälder (Imleria badia)"
    ],
    "exp": "Heidelbeere (Blaubeere) (Vaccinium myrtillus) zählt zur Gruppe: lichte Kiefernwälder auf sauren Humus- und Sandböden um Schwarzenburg."
  },
  {
    "id": 794,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Merkmals- und Nutzenkombination gehört im Schwarzenburger Wald eindeutig zu „Heidelbeere (Blaubeere)“?",
    "a": [
      "grün kantige Zweige, sommergrüne Blättchen und blauschwarze, innen tief dunkelblau färbende Beeren ab Juni/Juli · beliebtes Sammelobst für Kuchen und Pfannkuchen sowie Hauptnahrung für Fuchs, Dachs, Marder und Waldvögel",
      "blüht bereits im April vor dem Laubaustrieb wie eine weiße Schneewolke; blauschwarze, bereifte Steinfrüchte im Herbst · undurchdringlicher Brutplatz für Neuntöter und Goldammer; Raupenfutterpflanze des Segelfalters und Nierenfleck-Zipfelfalters",
      "graubrauner, glatter Hut und schlanker, weißlicher Stiel, der dicht mit dunklen, rauen Schüppchen („Raufuß“) besetzt ist · guter Speisepilz (besonders junge, feste Exemplare); wichtigster Symbiosepartner der Hängebirke",
      "olivgrünlicher bis gelbgrünlicher Hut, reinweiße Lamellen (bleiben immer weiß!), Ring am Stiel und eine sackartige weiße Scheide („Volva“) um die Stielknolle im Boden · tödlich giftig! Verursacht über 90 % aller tödlichen Pilzvergiftungen in Mitteleuropa durch hitzestabile Amatoxine"
    ],
    "exp": "Heidelbeere (Blaubeere): grün kantige Zweige, sommergrüne Blättchen und blauschwarze, innen tief dunkelblau färbende Beeren ab Juni/Juli. Bedeutung: beliebtes Sammelobst für Kuchen und Pfannkuchen sowie Hauptnahrung für Fuchs, Dachs, Marder und Waldvögel."
  },
  {
    "id": 795,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher botanische bzw. pilzkundliche Steckbrief beschreibt „Vaccinium myrtillus“ (Heidelbeere (Blaubeere)) korrekt?",
    "a": [
      "grün kantige Zweige, sommergrüne Blättchen und blauschwarze, innen tief dunkelblau färbende Beeren ab Juni/Juli – Im Gegensatz zur gezüchteten Kulturheidelbeere (mit hellem Fruchtfleisch) färbt die echte Waldheidelbeere Zunge und Lippen kräftig blaurot.",
      "bis zu 30 cm großer, gelblich-cremefarbener, kraus gewundener Fruchtkörper, der wie ein Badeschwamm oder Blumenkohl aussieht – Vor dem Braten teilt man die Krause Glucke am besten in Scheiben und spült sie kurz in lauwarmem Wasser ab, um Kiefernnadeln und Waldsand aus den Windungen zu lösen.",
      "ockerbrauner Hut mit stark eingerolltem, filzigem Rand und herablaufenden Lamellen, die bei Fingerdruck sofort rostbraun flecken – Ein klassisches Beispiel dafür, warum man alte Pilzbücher vor 1980 nicht mehr zur Bestimmung von Speisepilzen nutzen sollte.",
      "immergrüner Zwergstrauch mit winzigen, schuppenförmigen Blättchen und violett-rosa Blütenteppich von August bis Oktober – Früher band man aus den zähen, verzweigten Zweigen haltbare Stall- und Hofbesen – daher der Name „Besenheide“."
    ],
    "exp": "Steckbrief für Heidelbeere (Blaubeere) (Vaccinium myrtillus): grün kantige Zweige, sommergrüne Blättchen und blauschwarze, innen tief dunkelblau färbende Beeren ab Juni/Juli Im Gegensatz zur gezüchteten Kulturheidelbeere (mit hellem Fruchtfleisch) färbt die echte Waldheidelbeere Zunge und Lippen kräftig blaurot."
  },
  {
    "id": 796,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Du suchst rund um Schwarzenburg nach einer Art, für die gilt: „beliebtes Sammelobst für Kuchen und Pfannkuchen sowie Hauptnahrung für Fuchs, Dachs, Marder und Waldvögel“ und „Im Gegensatz zur gezüchteten Kulturheidelbeere (mit hellem Fruchtfleisch) färbt die echte Waldheidelbeere Zunge und Lippen kräftig blaurot.“. Welche Art ist gemeint?",
    "a": [
      "Heidelbeere (Blaubeere)",
      "Kiefern-Rotkappe (Fuchsrotkappe)",
      "Hängebirke (Sandbirke)",
      "Schlehe (Schwarzdorn)"
    ],
    "exp": "Beide Hinweise beschreiben Heidelbeere (Blaubeere) (Vaccinium myrtillus)."
  },
  {
    "id": 797,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Bei einer Exkursion durch den Schwarzenburger Wald findest du „Preiselbeere (Kronsbeere)“. Zu welcher Gruppe gehört dieser Fund?",
    "a": [
      "trockene, sonnige Kiefernwälder rund um Schwarzenburg (Vaccinium vitis-idaea)",
      "Bauernhöfe, Waldränder und Waldgärten in Schwarzenburg (Sambucus nigra)",
      "sonnige Waldränder und Feldhecken rund um Heideblick (Prunus spinosa)",
      "lichte Kiefern-, Eichen- und Birkenwälder rund um Schwarzenburg (Boletus edulis / pinophilus)"
    ],
    "exp": "Preiselbeere (Kronsbeere) (Vaccinium vitis-idaea) zählt zur Gruppe: trockene, sonnige Kiefernwälder rund um Schwarzenburg."
  },
  {
    "id": 798,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Merkmals- und Nutzenkombination gehört im Schwarzenburger Wald eindeutig zu „Preiselbeere (Kronsbeere)“?",
    "a": [
      "immergrüne, derb-ledrige, glänzende Blättchen (ähnlich Buchsbaum) und leuchtend rote, herb-säuerliche Beeren im Spätsommer · reich an Vitamin C sowie natürlicher Benzoe- und Salicylsäure, weshalb Preiselbeerkompott monatelang ohne Konservierungsstoffe hält",
      "kastanienbrauner Hut, gelbliche bis grünlich-gelbe Röhren unter dem Hut, die sich bei Fingerdruck sofort bläulich verfärben · Mykorrhizapartner von Kiefer und Fichte von August bis November; hervorragender Brat- und Trockenpilz",
      "leuchtend orangeroter bis fuchsroter Hut mit überstehender Huthaut am Rand und rau geschupptem Stiel · sehr geschätzter, festfleischiger Speisepilz; verfärbt sich im Anschnitt erst rötlich-violett, dann schwärzlich",
      "leuchtend roter Hut mit weißen Flocken (Velumresten), weiße Lamellen, beringter Stiel und warzig gegürtelte Knolle · giftig (enthält Ibotensäure und Muscimol); wichtiger Mykorrhizapartner für Birken und Kiefern im Waldökosystem"
    ],
    "exp": "Preiselbeere (Kronsbeere): immergrüne, derb-ledrige, glänzende Blättchen (ähnlich Buchsbaum) und leuchtend rote, herb-säuerliche Beeren im Spätsommer. Bedeutung: reich an Vitamin C sowie natürlicher Benzoe- und Salicylsäure, weshalb Preiselbeerkompott monatelang ohne Konservierungsstoffe hält."
  },
  {
    "id": 799,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher botanische bzw. pilzkundliche Steckbrief beschreibt „Vaccinium vitis-idaea“ (Preiselbeere (Kronsbeere)) korrekt?",
    "a": [
      "immergrüne, derb-ledrige, glänzende Blättchen (ähnlich Buchsbaum) und leuchtend rote, herb-säuerliche Beeren im Spätsommer – In Schwarzenburg ist die Kombination aus Wildbraten und selbst gesammelten Wald-Preiselbeeren ein echter Klassiker.",
      "graubrauner, glatter Hut und schlanker, weißlicher Stiel, der dicht mit dunklen, rauen Schüppchen („Raufuß“) besetzt ist – Beim Kochen verfärbt sich das weiße Fleisch des Birkenpilzes dunkelgrau bis schwärzlich – das ist völlig normal und unbedenklich.",
      "rotbrauner, hirnartig gewundener Hut (nicht wabenförmig wie bei der essbaren Speisemorchel!) auf weißlichem Stiel – Sie darf keinesfalls mit der essbaren, wabenförmig gekammerten Speisemorchel verwechselt werden.",
      "grün kantige Zweige, sommergrüne Blättchen und blauschwarze, innen tief dunkelblau färbende Beeren ab Juni/Juli – Im Gegensatz zur gezüchteten Kulturheidelbeere (mit hellem Fruchtfleisch) färbt die echte Waldheidelbeere Zunge und Lippen kräftig blaurot."
    ],
    "exp": "Steckbrief für Preiselbeere (Kronsbeere) (Vaccinium vitis-idaea): immergrüne, derb-ledrige, glänzende Blättchen (ähnlich Buchsbaum) und leuchtend rote, herb-säuerliche Beeren im Spätsommer In Schwarzenburg ist die Kombination aus Wildbraten und selbst gesammelten Wald-Preiselbeeren ein echter Klassiker."
  },
  {
    "id": 800,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Du suchst rund um Schwarzenburg nach einer Art, für die gilt: „reich an Vitamin C sowie natürlicher Benzoe- und Salicylsäure, weshalb Preiselbeerkompott monatelang ohne Konservierungsstoffe hält“ und „In Schwarzenburg ist die Kombination aus Wildbraten und selbst gesammelten Wald-Preiselbeeren ein echter Klassiker.“. Welche Art ist gemeint?",
    "a": [
      "Preiselbeere (Kronsbeere)",
      "Butterpilz (Butter-Röhrling)",
      "Traubeneiche",
      "Maronenröhrling (Braunkappe)"
    ],
    "exp": "Beide Hinweise beschreiben Preiselbeere (Kronsbeere) (Vaccinium vitis-idaea)."
  },
  {
    "id": 801,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Bei einer Exkursion durch den Schwarzenburger Wald findest du „Walderdbeere“. Zu welcher Gruppe gehört dieser Fund?",
    "a": [
      "sonnige Waldwege, Lichtungen und der heimische Waldgarten (Fragaria vesca)",
      "sonnige Sandböschungen, Bergbaufolgelandschaften und Waldgärten Brandenburgs (Hippophae rhamnoides)",
      "Speisepilz Nr. 1 der Schwarzenburger Kiefernwälder (Imleria badia)",
      "moosige Kiefern- und Mischwälder von Juni bis Oktober (Cantharellus cibarius)"
    ],
    "exp": "Walderdbeere (Fragaria vesca) zählt zur Gruppe: sonnige Waldwege, Lichtungen und der heimische Waldgarten."
  },
  {
    "id": 802,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Merkmals- und Nutzenkombination gehört im Schwarzenburger Wald eindeutig zu „Walderdbeere“?",
    "a": [
      "dreizählige, gezähnte Blätter, weiße Blüten und kleine rote Sammelnussfrüchte mit intensivem Waldaroma · perfekter, essbarer Bodendecker für die unterste Schicht eines naturnahen Waldgartens",
      "brauner Hut, bauchiger Stiel mit feinem weißem Adernetz im oberen Teil; Röhren anfangs weiß, später gelbgrün (blauen bei Druck NICHT) · einer der edelsten Speisepilze mit festem, weißem, mild-nussigem Fleisch; lässt sich hervorragend im Dörrautomaten trocknen",
      "schokoladenbrauner, bei Feuchtigkeit schleimiger Hut, gelbe Poren und ein deutlicher häutiger Ring am Stiel · milder, zarter Speisepilz und treuer Begleiter der Waldkiefer",
      "brauner Hut wie beim Steinpilz, aber grobes dunkles Netz am Stiel und im Alter schmutzig-rosa vorwölbende Röhren · nicht giftig, aber durch extremen Bitterstoff völlig ungenießbar – ein einziger Pilz verdirbt das gesamte Pilzgericht!"
    ],
    "exp": "Walderdbeere: dreizählige, gezähnte Blätter, weiße Blüten und kleine rote Sammelnussfrüchte mit intensivem Waldaroma. Bedeutung: perfekter, essbarer Bodendecker für die unterste Schicht eines naturnahen Waldgartens."
  },
  {
    "id": 803,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher botanische bzw. pilzkundliche Steckbrief beschreibt „Fragaria vesca“ (Walderdbeere) korrekt?",
    "a": [
      "dreizählige, gezähnte Blätter, weiße Blüten und kleine rote Sammelnussfrüchte mit intensivem Waldaroma – Obwohl die Früchte viel kleiner als Gartenerdbeeren sind, besitzen sie ein vielfach intensiveres Aroma.",
      "leuchtend orangeroter bis fuchsroter Hut mit überstehender Huthaut am Rand und rau geschupptem Stiel – Wie alle Raufußröhrlinge sollten Rotkappen vor dem Verzehr stets gut durchgegart werden (mindestens 15 Minuten).",
      "buschig verzweigte, silbrig-grauweiße bis grünliche Polster am Waldboden, die bei Trockenheit knistern und bei Regen weich wie ein Schwamm werden – Bitte beim Wandern nicht zertreten: Ein Flechtenpolster im trockenen Kiefernwald wächst nur wenige Millimeter pro Jahr!",
      "immergrüne, derb-ledrige, glänzende Blättchen (ähnlich Buchsbaum) und leuchtend rote, herb-säuerliche Beeren im Spätsommer – In Schwarzenburg ist die Kombination aus Wildbraten und selbst gesammelten Wald-Preiselbeeren ein echter Klassiker."
    ],
    "exp": "Steckbrief für Walderdbeere (Fragaria vesca): dreizählige, gezähnte Blätter, weiße Blüten und kleine rote Sammelnussfrüchte mit intensivem Waldaroma Obwohl die Früchte viel kleiner als Gartenerdbeeren sind, besitzen sie ein vielfach intensiveres Aroma."
  },
  {
    "id": 804,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Du suchst rund um Schwarzenburg nach einer Art, für die gilt: „perfekter, essbarer Bodendecker für die unterste Schicht eines naturnahen Waldgartens“ und „Obwohl die Früchte viel kleiner als Gartenerdbeeren sind, besitzen sie ein vielfach intensiveres Aroma.“. Welche Art ist gemeint?",
    "a": [
      "Walderdbeere",
      "Edel-Reizker (Kiefern-Reizker)",
      "Stieleiche (Deutsche Eiche)",
      "Steinpilz (Fichten-/Kiefernsteinpilz)"
    ],
    "exp": "Beide Hinweise beschreiben Walderdbeere (Fragaria vesca)."
  },
  {
    "id": 805,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Bei einer Exkursion durch den Schwarzenburger Wald findest du „Schwarzer Holunder“. Zu welcher Gruppe gehört dieser Fund?",
    "a": [
      "Bauernhöfe, Waldränder und Waldgärten in Schwarzenburg (Sambucus nigra)",
      "sonnige Waldränder und Feldhecken rund um Heideblick (Prunus spinosa)",
      "lichte Kiefern-, Eichen- und Birkenwälder rund um Schwarzenburg (Boletus edulis / pinophilus)",
      "wächst von August bis November direkt am Stammfuß alter Kiefern um Schwarzenburg (Sparassis crispa)"
    ],
    "exp": "Schwarzer Holunder (Sambucus nigra) zählt zur Gruppe: Bauernhöfe, Waldränder und Waldgärten in Schwarzenburg."
  },
  {
    "id": 806,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Merkmals- und Nutzenkombination gehört im Schwarzenburger Wald eindeutig zu „Schwarzer Holunder“?",
    "a": [
      "duftende cremeweiße Blütenschirme im Juni und glänzend schwarze Beerendolden an rötlichen Stielen im September · Blüten für Holunderblütensirup und „Hollerküchle“, gekochte Beeren für Saft und Gelee; Magnet für Mönchsgrasmücke und Star",
      "dottergelber, trichterförmig geschwungener Fruchtkörper mit gegabelten, herablaufenden Leisten (keine dünnen Lamellen!) und fruchtigem Aprikosenduft · würziger Speisepilz, der fast nie von Maden befallen wird",
      "orangefarbener, konzentrisch gezonte Kreise zeigender Hut mit kleinen Grübchen am Stiel; tritt bei Verletzung leuchtend karottenrote Milch aus · hervorragender Bratpilz aus der Gattung der Milchlinge",
      "ockerbrauner Hut mit stark eingerolltem, filzigem Rand und herablaufenden Lamellen, die bei Fingerdruck sofort rostbraun flecken · früher fälschlich als Speisepilz gesammelt, heute als lebensgefährlich giftig bekannt (löst nach wiederholtem Verzehr das tödliche Paxillus-Syndrom / Immunhämolysen aus)"
    ],
    "exp": "Schwarzer Holunder: duftende cremeweiße Blütenschirme im Juni und glänzend schwarze Beerendolden an rötlichen Stielen im September. Bedeutung: Blüten für Holunderblütensirup und „Hollerküchle“, gekochte Beeren für Saft und Gelee; Magnet für Mönchsgrasmücke und Star."
  },
  {
    "id": 807,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher botanische bzw. pilzkundliche Steckbrief beschreibt „Sambucus nigra“ (Schwarzer Holunder) korrekt?",
    "a": [
      "duftende cremeweiße Blütenschirme im Juni und glänzend schwarze Beerendolden an rötlichen Stielen im September – Altem Volksbrauch nach pflanzte man an jeden Hof einen Holunderbusch als guten Hausgeist („Vor dem Holunder soll man den Hut ziehen“).",
      "schokoladenbrauner, bei Feuchtigkeit schleimiger Hut, gelbe Poren und ein deutlicher häutiger Ring am Stiel – Tipp für Sammler: Die klebrige braune Huthaut lässt sich schon im Wald wie von selbst komplett vom Hut abziehen.",
      "immergrüne Nadeln, die stets paarweise (zu zweit) in einer Kurztriebscheide sitzen; im oberen Stammbereich leuchtend fuchsrote „Spiegelrinde“ – Ihre harzreichen Nadeln verströmen an warmen Sommertagen den typischen würzigen Duft der märkischen Kiefernheide.",
      "dreizählige, gezähnte Blätter, weiße Blüten und kleine rote Sammelnussfrüchte mit intensivem Waldaroma – Obwohl die Früchte viel kleiner als Gartenerdbeeren sind, besitzen sie ein vielfach intensiveres Aroma."
    ],
    "exp": "Steckbrief für Schwarzer Holunder (Sambucus nigra): duftende cremeweiße Blütenschirme im Juni und glänzend schwarze Beerendolden an rötlichen Stielen im September Altem Volksbrauch nach pflanzte man an jeden Hof einen Holunderbusch als guten Hausgeist („Vor dem Holunder soll man den Hut ziehen“)."
  },
  {
    "id": 808,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Du suchst rund um Schwarzenburg nach einer Art, für die gilt: „Blüten für Holunderblütensirup und „Hollerküchle“, gekochte Beeren für Saft und Gelee; Magnet für Mönchsgrasmücke und Star“ und „Altem Volksbrauch nach pflanzte man an jeden Hof einen Holunderbusch als guten Hausgeist („Vor dem Holunder soll man den Hut ziehen“).“. Welche Art ist gemeint?",
    "a": [
      "Schwarzer Holunder",
      "Parasol (Riesenschirmling)",
      "Eberesche (Vogelbeere)",
      "Echter Pfifferling (Eierschwamm)"
    ],
    "exp": "Beide Hinweise beschreiben Schwarzer Holunder (Sambucus nigra)."
  },
  {
    "id": 809,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Bei einer Exkursion durch den Schwarzenburger Wald findest du „Sanddorn“. Zu welcher Gruppe gehört dieser Fund?",
    "a": [
      "sonnige Sandböschungen, Bergbaufolgelandschaften und Waldgärten Brandenburgs (Hippophae rhamnoides)",
      "Speisepilz Nr. 1 der Schwarzenburger Kiefernwälder (Imleria badia)",
      "moosige Kiefern- und Mischwälder von Juni bis Oktober (Cantharellus cibarius)",
      "unter Birken an Waldrändern, Lichtungen und feuchten Senken (Leccinum scabrum)"
    ],
    "exp": "Sanddorn (Hippophae rhamnoides) zählt zur Gruppe: sonnige Sandböschungen, Bergbaufolgelandschaften und Waldgärten Brandenburgs."
  },
  {
    "id": 810,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Merkmals- und Nutzenkombination gehört im Schwarzenburger Wald eindeutig zu „Sanddorn“?",
    "a": [
      "silbrig-graue, schmale Blätter, spitze Dornen und dicht gedrängte, leuchtend orangefarbene Beeren ab Spätsommer · Pionierstrauch auf kargen Sandböden; seine Beeren enthalten bis zu zehnmal mehr Vitamin C als Zitronen („Zitrone des Nordens“)",
      "bis zu 30 cm großer, gelblich-cremefarbener, kraus gewundener Fruchtkörper, der wie ein Badeschwamm oder Blumenkohl aussieht · exzellenter, würzig-nussiger Speisepilz mit bissfestem Fleisch (z. B. paniert als Schnitzel oder in Rahmsoße)",
      "bis zu 30 cm breiter, geschuppter Schirm, ein frei verschiebbarer doppelter Ring am langen, genatterten („schlangenhautartig gemusterten“) Stiel · die großen, nussig riechenden Hüte schmecken paniert und in Butter gebraten wie ein Wiener Schnitzel",
      "rotbrauner, hirnartig gewundener Hut (nicht wabenförmig wie bei der essbaren Speisemorchel!) auf weißlichem Stiel · lebensgefährlich giftig! Enthält das flüchtige Zell- und Lebergift Gyromitrin"
    ],
    "exp": "Sanddorn: silbrig-graue, schmale Blätter, spitze Dornen und dicht gedrängte, leuchtend orangefarbene Beeren ab Spätsommer. Bedeutung: Pionierstrauch auf kargen Sandböden; seine Beeren enthalten bis zu zehnmal mehr Vitamin C als Zitronen („Zitrone des Nordens“)."
  },
  {
    "id": 811,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher botanische bzw. pilzkundliche Steckbrief beschreibt „Hippophae rhamnoides“ (Sanddorn) korrekt?",
    "a": [
      "silbrig-graue, schmale Blätter, spitze Dornen und dicht gedrängte, leuchtend orangefarbene Beeren ab Spätsommer – Sanddorn ist zweihäusig: Für eine reiche Beerenernte im Waldgarten braucht man mindestens einen männlichen Bestäuberstrauch neben den weiblichen Sträuchern.",
      "orangefarbener, konzentrisch gezonte Kreise zeigender Hut mit kleinen Grübchen am Stiel; tritt bei Verletzung leuchtend karottenrote Milch aus – Alle Reizker, die beim Anschneiden sofort karottenrote bis weinrote (nicht weiße!) Milch absondern, sind essbar.",
      "auffallend weiße Rinde mit dunklen Rissen und bogig herabhängende, feine Zweige – Das in der weißen Birkenrinde enthaltene „Betulin“ reflektiert starkes Sonnenlicht und macht die Rinde selbst bei Regen wasserabweisend und brennbar.",
      "duftende cremeweiße Blütenschirme im Juni und glänzend schwarze Beerendolden an rötlichen Stielen im September – Altem Volksbrauch nach pflanzte man an jeden Hof einen Holunderbusch als guten Hausgeist („Vor dem Holunder soll man den Hut ziehen“)."
    ],
    "exp": "Steckbrief für Sanddorn (Hippophae rhamnoides): silbrig-graue, schmale Blätter, spitze Dornen und dicht gedrängte, leuchtend orangefarbene Beeren ab Spätsommer Sanddorn ist zweihäusig: Für eine reiche Beerenernte im Waldgarten braucht man mindestens einen männlichen Bestäuberstrauch neben den weiblichen Sträuchern."
  },
  {
    "id": 812,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Du suchst rund um Schwarzenburg nach einer Art, für die gilt: „Pionierstrauch auf kargen Sandböden; seine Beeren enthalten bis zu zehnmal mehr Vitamin C als Zitronen („Zitrone des Nordens“)“ und „Sanddorn ist zweihäusig: Für eine reiche Beerenernte im Waldgarten braucht man mindestens einen männlichen Bestäuberstrauch neben den weiblichen Sträuchern.“. Welche Art ist gemeint?",
    "a": [
      "Sanddorn",
      "Grüner Knollenblätterpilz",
      "Schwarzerle (Roterle)",
      "Krause Glucke (Fette Henne)"
    ],
    "exp": "Beide Hinweise beschreiben Sanddorn (Hippophae rhamnoides)."
  },
  {
    "id": 813,
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Bei einer Exkursion durch den Schwarzenburger Wald findest du „Schlehe (Schwarzdorn)“. Zu welcher Gruppe gehört dieser Fund?",
    "a": [
      "sonnige Waldränder und Feldhecken rund um Heideblick (Prunus spinosa)",
      "lichte Kiefern-, Eichen- und Birkenwälder rund um Schwarzenburg (Boletus edulis / pinophilus)",
      "wächst von August bis November direkt am Stammfuß alter Kiefern um Schwarzenburg (Sparassis crispa)",
      "unter Kiefern, Birken und Zitterpappeln in den Lausitzer Wäldern (Leccinum vulpinum / aurantiacum)"
    ],
    "exp": "Schlehe (Schwarzdorn) (Prunus spinosa) zählt zur Gruppe: sonnige Waldränder und Feldhecken rund um Heideblick."
  },
  {
    "id": 814,
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Merkmals- und Nutzenkombination gehört im Schwarzenburger Wald eindeutig zu „Schlehe (Schwarzdorn)“?",
    "a": [
      "blüht bereits im April vor dem Laubaustrieb wie eine weiße Schneewolke; blauschwarze, bereifte Steinfrüchte im Herbst · undurchdringlicher Brutplatz für Neuntöter und Goldammer; Raupenfutterpflanze des Segelfalters und Nierenfleck-Zipfelfalters",
      "graubrauner, glatter Hut und schlanker, weißlicher Stiel, der dicht mit dunklen, rauen Schüppchen („Raufuß“) besetzt ist · guter Speisepilz (besonders junge, feste Exemplare); wichtigster Symbiosepartner der Hängebirke",
      "olivgrünlicher bis gelbgrünlicher Hut, reinweiße Lamellen (bleiben immer weiß!), Ring am Stiel und eine sackartige weiße Scheide („Volva“) um die Stielknolle im Boden · tödlich giftig! Verursacht über 90 % aller tödlichen Pilzvergiftungen in Mitteleuropa durch hitzestabile Amatoxine",
      "buschig verzweigte, silbrig-grauweiße bis grünliche Polster am Waldboden, die bei Trockenheit knistern und bei Regen weich wie ein Schwamm werden · Flechten sind eine Lebensgemeinschaft (Symbiose) aus einem Pilz und einer Grünalge; Zeiger für saubere Luft und nährstoffarme Naturböden"
    ],
    "exp": "Schlehe (Schwarzdorn): blüht bereits im April vor dem Laubaustrieb wie eine weiße Schneewolke; blauschwarze, bereifte Steinfrüchte im Herbst. Bedeutung: undurchdringlicher Brutplatz für Neuntöter und Goldammer; Raupenfutterpflanze des Segelfalters und Nierenfleck-Zipfelfalters."
  },
  {
    "id": 815,
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher botanische bzw. pilzkundliche Steckbrief beschreibt „Prunus spinosa“ (Schlehe (Schwarzdorn)) korrekt?",
    "a": [
      "blüht bereits im April vor dem Laubaustrieb wie eine weiße Schneewolke; blauschwarze, bereifte Steinfrüchte im Herbst – Erst nach den ersten strengen Herbstfrösten wird der zusammenziehende Gerbstoff in den Schlehen abgebaut, sodass sie mild und aromatisch für Likör oder Marmelade werden.",
      "bis zu 30 cm breiter, geschuppter Schirm, ein frei verschiebbarer doppelter Ring am langen, genatterten („schlangenhautartig gemusterten“) Stiel – Wichtiges Sicherheitsmerkmal: Der Stiel ist deutlich dunkel genattert und der Ring lässt sich am Stiel frei auf und ab schieben.",
      "gelappte Blätter mit deutlichem Blattstiel, während die Eicheln ungestielt („traubig gehäuft“) am Zweig sitzen – Gemeinsam mit der Stieleiche erhöht sie im Kiefernwald die Artenvielfalt (über 500 Insektenarten leben an Eichen!) und bremst Waldbrände.",
      "silbrig-graue, schmale Blätter, spitze Dornen und dicht gedrängte, leuchtend orangefarbene Beeren ab Spätsommer – Sanddorn ist zweihäusig: Für eine reiche Beerenernte im Waldgarten braucht man mindestens einen männlichen Bestäuberstrauch neben den weiblichen Sträuchern."
    ],
    "exp": "Steckbrief für Schlehe (Schwarzdorn) (Prunus spinosa): blüht bereits im April vor dem Laubaustrieb wie eine weiße Schneewolke; blauschwarze, bereifte Steinfrüchte im Herbst Erst nach den ersten strengen Herbstfrösten wird der zusammenziehende Gerbstoff in den Schlehen abgebaut, sodass sie mild und aromatisch für Likör oder Marmelade werden."
  },
  {
    "id": 816,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Zu welcher amtsfreien Gemeinde im Landkreis Dahme-Spreewald gehört der Walddorfortsteil Schwarzenburg heute?",
    "a": [
      "Gemeinde Heideblick",
      "Stadt Luckau",
      "Gemeinde Schlieben",
      "Stadt Sonnewalde"
    ],
    "exp": "Schwarzenburg ist einer der 14 Ortsteile der amtsfreien Gemeinde Heideblick (PLZ 15926) im Süden des Landkreises Dahme-Spreewald."
  },
  {
    "id": 817,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Unter welcher Bezeichnung wurde der Ort Schwarzenburg bereits im Jahr 1554 in alten Aufzeichnungen erwähnt?",
    "a": [
      "Als wüste „schwarze Schäfferey“",
      "Als „Kloster zum Schwarzen Eber“",
      "Als „Marktflecken Waldburg“",
      "Als „Freie Bergstadt Heideblick“"
    ],
    "exp": "Bereits 1554 findet sich der Hinweis, dass „die schwarze Schäfferey“ geraume Zeit wüst gelegen hatte, bevor dort wieder ein Vorwerk entstand."
  },
  {
    "id": 818,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wie wurde Schwarzenburg bei seiner urkundlichen Beschreibung im Jahr 1615 genannt?",
    "a": [
      "Ein wüster Acker neben der Rochischen Heyde am schwartzen Berge",
      "Eine kurfürstliche Wasserburg an der Berste",
      "Ein sorbisches Fischerdorf am Spreewald",
      "Eine Glashütte im Fläming"
    ],
    "exp": "1615 wurde der Ort als „wuster Acker neben der Rochischen Heyde am schwartzen Berge liegend“ beschrieben – aus „-berg“ wurde später „-burg“."
  },
  {
    "id": 819,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Wie erklärte sich der Volksmund früher scherzhaft den Namen „Schwarzenburg“ im Vergleich zum Nachbarort Weißenburg?",
    "a": [
      "In Schwarzenburg wurden nur schwarze Schafe gezüchtet, in Weißenburg nur weiße",
      "In Schwarzenburg gab es nur schwarze Dächer, in Weißenburg weiße Kalkdächer",
      "In Schwarzenburg wuchsen Schwarzkiefern, in Weißenburg Weißbirken",
      "In Schwarzenburg trugen die Förster schwarze Röcke"
    ],
    "exp": "Da Schwarzenburg ein kursächsisches Schäferei-Vorwerk war, erzählte der Volksmund schmunzelnd, hier habe man die schwarzen und in Weißenburg die weißen Schafe gehalten."
  },
  {
    "id": 820,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Zu welchem kursächsischen Amt gehörte Schwarzenburg historisch als Vorwerk mit Schafzucht?",
    "a": [
      "Zum Amt Schlieben",
      "Zum Amt Lübben",
      "Zum Amt Dobrilugk",
      "Zum Amt Cottbus"
    ],
    "exp": "Schwarzenburg war ursprünglich ein kursächsisches Vorwerk des Amtes Schlieben, auf dem intensiv Schafzucht betrieben wurde."
  },
  {
    "id": 821,
    "cat": "geschichte",
    "diff": "mid",
    "q": "In welchem ehemaligen Fabrikgebäude erhielt Schwarzenburg im Jahr 1830 seine erste eigene Dorfschule?",
    "a": [
      "In einer alten Blechlöffelfabrik",
      "In einer stillgelegten Glasbläserei",
      "In einer alten Wassermühle",
      "In einem ehemaligen Brauhaus"
    ],
    "exp": "König Friedrich Wilhelm III. bewilligte 1830 eine eigene Schule für Schwarzenburg, die im Gebäude einer ehemaligen Blechlöffelfabrik eingerichtet wurde."
  },
  {
    "id": 822,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welcher preußische König bewilligte Schwarzenburg im Jahr 1830 die Einrichtung einer eigenen Schule samt Gebetsraum?",
    "a": [
      "König Friedrich Wilhelm III.",
      "König Friedrich der Große (Friedrich II.)",
      "Kaiser Wilhelm II.",
      "König Friedrich Wilhelm I. (Soldatenkönig)"
    ],
    "exp": "Im Jahr 1830 erhielt Schwarzenburg von König Friedrich Wilhelm III. von Preußen seine erste eigene Schule mit Betsaal."
  },
  {
    "id": 823,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Welches besondere, denkmalgeschützte Gebäude aus dem Jahr 1909 bildet heute das kulturelle Herzstück von Schwarzenburg?",
    "a": [
      "Das Schulmuseum Schwarzenburg (Einraumschule, Betsaal & Lehrerwohnung)",
      "Ein barockes Jagdschloss mit Schlosspark",
      "Ein mittelalterlicher Wehrturm aus Feldsteinen",
      "Eine historische Holländerwindmühle"
    ],
    "exp": "Das 1909 erbaute Schulhaus vereint Einklassenraum, Betsaal und Lehrerwohnung unter einem Dach – ein in ganz Brandenburg einzigartiges Baudenkmal."
  },
  {
    "id": 824,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Bis zu welchem Jahr fand in der 1909 erbauten Einklassenschule von Schwarzenburg regulärer Schulunterricht statt?",
    "a": [
      "Bis 1972 (nach 63 Jahren Lehrbetrieb)",
      "Bis 1945",
      "Bis 1989",
      "Bis 2001"
    ],
    "exp": "Nach genau 63 Jahren Unterricht im Neubau von 1909 wurde die kleine Einraumschule in Schwarzenburg im Jahr 1972 geschlossen."
  },
  {
    "id": 825,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welchem letzten Dorfschullehrer von Schwarzenburg ist es maßgeblich zu verdanken, dass die 1972 geschlossene Schule als Museum erhalten blieb?",
    "a": [
      "Helmuth Österitz",
      "Johann Gottlieb Koppe",
      "Heinrich Berghaus",
      "Arnošt Muka"
    ],
    "exp": "Der letzte Dorfschullehrer Helmuth Österitz setzte sich unermüdlich dafür ein, die Einraumschule originalgetreu auszustatten und als Schulmuseum zu bewahren."
  },
  {
    "id": 826,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Welche besondere standesamtliche Funktion erfüllt der historische Betsaal im Schulmuseum Schwarzenburg heute?",
    "a": [
      "Er ist ein offizieller Trauort des Standesamtes der Gemeinde Heideblick",
      "Er dient als Sitzungssaal des Kreistages Dahme-Spreewald",
      "Er wird als Zollstation genutzt",
      "Er ist das Wahllokal für ganz Südbrandenburg"
    ],
    "exp": "Im feierlichen historischen Betsaal des Schulmuseums Schwarzenburg können sich Paare heute offiziell vom Standesamt Heideblick trauen lassen."
  },
  {
    "id": 827,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welcher Kirchengemeinde war Schwarzenburg historisch eingepfarrt, sodass deren Pfarrer im Schwarzenburger Betsaal Taufen und Trauerfeiern abhielt?",
    "a": [
      "Proßmarke",
      "Walddrehna",
      "Langengrassau",
      "Luckau"
    ],
    "exp": "Schwarzenburg war historisch nach Proßmarke eingepfarrt; der Lehrer hielt alle zwei Wochen Betstunde, während der Pfarrer aus Proßmarke für Taufen und Trauerfeiern kam."
  },
  {
    "id": 828,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Zu welchem preußischen Landkreis gehörte Schwarzenburg von 1816 bis zur Verwaltungsreform 1952?",
    "a": [
      "Landkreis Schweinitz (Provinz Sachsen)",
      "Landkreis Teltow",
      "Landkreis Oberbarnim",
      "Landkreis Ostprignitz"
    ],
    "exp": "Während viele Nachbarorte zum Kreis Luckau gehörten, lag Schwarzenburg (wie auch Langengrassau und Wüstermarke) von 1816 bis 1952 im preußischen Kreis Schweinitz."
  },
  {
    "id": 829,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wie viele Einwohner zählte Schwarzenburg um das Jahr 1912 im Vergleich zu heute (rund 59 Einwohner)?",
    "a": [
      "Etwa 166 Einwohner",
      "Über 1.200 Einwohner",
      "Genau 12 Einwohner",
      "Etwa 650 Einwohner"
    ],
    "exp": "Im Jahr 1912 lebten in Schwarzenburg rund 166 Menschen – fast dreimal so viele wie heute (Stand Ende 2024: 59 Einwohner)."
  },
  {
    "id": 830,
    "cat": "geschichte",
    "diff": "mid",
    "q": "In welche Nachbargemeinde wurde Schwarzenburg am 1. Januar 1974 zunächst eingemeindet, bevor es später Ortsteil von Heideblick wurde?",
    "a": [
      "Walddrehna",
      "Beesdau",
      "Bornsdorf",
      "Falkenberg"
    ],
    "exp": "Am 1. Januar 1974 wurde Schwarzenburg nach Walddrehna eingemeindet; heute ist es ein eigenständiger Ortsteil der Gemeinde Heideblick."
  },
  {
    "id": 831,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Welcher Bahnhof in der Nähe von Schwarzenburg bietet direkten Regionalexpress-Anschluss (RE 8) auf der Bahnstrecke Berlin–Dresden?",
    "a": [
      "Bahnhof Walddrehna",
      "Bahnhof Schwarzenburg-Süd",
      "Bahnhof Bornsdorf-Wald",
      "Bahnhof Pechhütte"
    ],
    "exp": "Über den nahegelegenen Bahnhof Walddrehna ist die Region im Zwei-Stunden-Takt direkt mit Berlin und Elsterwerda/Finsterwalde verbunden."
  },
  {
    "id": 832,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Wie heißt das traditionsreiche Gasthaus in Schwarzenburg, das für seine Wildspezialitäten bekannt ist?",
    "a": [
      "Zum Wilden Eber",
      "Zur Goldenen Kiefer",
      "Zum Weißen Hirsch",
      "Waldschenke am Schlossteich"
    ],
    "exp": "Die Gaststätte „Zum Wilden Eber“ in Schwarzenburg ist ein beliebter Einkehrpunkt für Wanderer, Pilzsammler und Naturfreunde."
  },
  {
    "id": 833,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Aus wie vielen offiziellen Ortsteilen besteht die flächenreiche Gemeinde Heideblick (166,57 km²) insgesamt?",
    "a": [
      "14 Ortsteile",
      "3 Ortsteile",
      "28 Ortsteile",
      "7 Ortsteile"
    ],
    "exp": "Zur Gemeinde Heideblick gehören 14 Ortsteile: Beesdau, Bornsdorf, Falkenberg, Gehren, Goßmar, Langengrassau, Pitschen-Pickel, Riedebeck, Schwarzenburg, Walddrehna, Waltersdorf, Wehnsdorf, Weißack und Wüstermarke."
  },
  {
    "id": 834,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches Freilichtmuseum nördlich von Wüstermarke in der Gemeinde Heideblick zeigt einen historischen Niederlausitzer Bauernhof um 1800?",
    "a": [
      "Freilichtmuseum Höllberghof",
      "Museumsdorf Glashütte",
      "Freilichtmuseum Lehde",
      "Slawenburg Raddusch"
    ],
    "exp": "Das Freilichtmuseum Höllberghof bei Wüstermarke (Gemeinde Heideblick) präsentiert lebendige bäuerliche Bau- und Alltagskultur der Region um 1800."
  },
  {
    "id": 835,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welcher Ortsteil der Gemeinde Heideblick wurde bereits im Jahr 1207 urkundlich erwähnt und zählt damit zu den ältesten bekannten Siedlungen der Mark?",
    "a": [
      "Falkenberg",
      "Schwarzenburg",
      "Neusorgefeld",
      "Pechhütte"
    ],
    "exp": "Der Heideblicker Ortsteil Falkenberg (niedersorbisch Sokolnica) wurde bereits 1207 erstmals urkundlich erwähnt; dort steht auch eine Bockwindmühle von 1853."
  },
  {
    "id": 836,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wie hieß der Nachbarort Walddrehna (sorbisch Serbski Drjenow) offiziell bis zum 30. Oktober 1937?",
    "a": [
      "Wendisch Drehna",
      "Fürstlich Drehna",
      "Preußisch Drehna",
      "Klein Drehna"
    ],
    "exp": "Walddrehna trug bis 1937 den historischen Namen „Wendisch Drehna“, der auf die slawisch-wendische (niedersorbische) Besiedlungsgeschichte hinweist."
  },
  {
    "id": 837,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche architektonische Besonderheit besitzt die Dorfkirche Walddrehna aus dem 13. Jahrhundert?",
    "a": [
      "Eine nach drei Seiten offene Vorhalle als Glockenträger mit massivem Backstein-Kegelhelm",
      "Einen 95 Meter hohen Doppelturm aus Sandstein",
      "Eine komplett unterirdische Krypta aus Glas",
      "Ein Dach aus reinem Kupferblech aus dem 12. Jahrhundert"
    ],
    "exp": "Die Feldsteinkirche in Walddrehna besticht durch ihre ungewöhnliche, auf zwei Feldstein-Rundpfeilern ruhende offene Vorhalle mit massivem Backstein-Kegelhelm."
  },
  {
    "id": 838,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welcher berühmte Agrarreformer (1782–1863) wurde im Heideblicker Ortsteil Beesdau geboren und baute 1841 das Schloss Beesdau um?",
    "a": [
      "Johann Gottlieb Koppe",
      "Albrecht Daniel Thaer",
      "Justus von Liebig",
      "Friedrich Wilhelm Raiffeisen"
    ],
    "exp": "Johann Gottlieb Koppe, einer der bedeutendsten deutschen Agrarreformer des 19. Jahrhunderts, stammte aus Beesdau und erwarb später das dortige Rittergut und Schloss."
  },
  {
    "id": 839,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Was zeigt das am 2. Dezember 2003 genehmigte Gemeindewappen von Heideblick?",
    "a": [
      "Drei goldene Kornähren in Grün, umgeben von einem goldenen Schildbord mit 11 grünen Lindenblättern",
      "Einen schwarzen Eber vor drei Kiefern auf silbernem Grund",
      "Einen weißen Kranich über blauem Wellenband",
      "Eine rote Burg mit zwei gekreuzten Schäferstäben"
    ],
    "exp": "Das Wappen von Heideblick zeigt in Grün drei zur Garbe gebundene goldene Kornähren innerhalb eines mit 11 grünen Lindenblättern belegten goldenen Schildbordes."
  },
  {
    "id": 840,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Welcher lebendige Lausitzer Winter-/Fastnachtsbrauch, bei dem man bunt verkleidet mit Musik von Hof zu Hof zieht, wird auch in Schwarzenburg gepflegt?",
    "a": [
      "Das Zampern",
      "Das Biikebrennen",
      "Der Almabtrieb",
      "Das Perchtenlaufen"
    ],
    "exp": "Beim traditionellen Lausitzer Zampern ziehen die Dorfbewohner im Spätwinter mit Blasmusik von Haus zu Haus, sammeln Eier, Speck und Spenden und vertreiben den Winter."
  },
  {
    "id": 841,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche drei Funktionen vereint das 1909 erbaute und heute denkmalgeschützte Schulgebäude in Schwarzenburg 1 unter einem einzigen Dach?",
    "a": [
      "Einklassenraum (Schulstube), Betsaal (Kirchraum) und Lehrerwohnung",
      "Rathaus, Feuerwehrgerätehaus und Bäckerei",
      "Försterei, Schmiede und Poststation",
      "Amtsgericht, Gefängnis und Brauerei"
    ],
    "exp": "Einklassenraum (Schulstube), Betsaal (Kirchraum) und Lehrerwohnung – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 842,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wie oft musste der Dorfschullehrer von Schwarzenburg im 19. Jahrhundert im Gebetsraum der Schule eine Betstunde für die Dorfbewohner halten?",
    "a": [
      "Alle zwei Wochen",
      "Jeden Tag um 5 Uhr morgens",
      "Nur einmal im Schaltjahr",
      "Jeden ersten Montag im Monat um Mitternacht"
    ],
    "exp": "Alle zwei Wochen – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 843,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welcher gemeinnützige Verein kümmert sich heute mit viel Herzblut um das Schulmuseum Schwarzenburg, Führungen und Dorffeste?",
    "a": [
      "Der Heimatverein Schwarzenburg e. V.",
      "Der Preußische Mühlenverein 1815",
      "Die Spreewälder Kahnfährzunft",
      "Der Knappschaftsverein Lausitz"
    ],
    "exp": "Der Heimatverein Schwarzenburg e. V. – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 844,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches historische Waldgewerbe gab dem Heideblicker Gemeindeteil „Pechhütte“ (bei Weißack) seinen Namen?",
    "a": [
      "Das Ausschmelzen von Holzteer und Pech aus harzreichem Kiefernstubbenholz („Kienholz“) in Pechöfen",
      "Das Sammeln von schwarzem Pechstein aus Bächen",
      "Eine alte Werkstatt für Schusterpech aus Schafwolle",
      "Ein Bergwerk für Steinkohle im 14. Jahrhundert"
    ],
    "exp": "Das Ausschmelzen von Holzteer und Pech aus harzreichem Kiefernstubbenholz („Kienholz“) in Pechöfen – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 845,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Was war das „Kienholz“ (Kienspan), das die Menschen in den Walddörfern um Schwarzenburg über Jahrhunderte aus alten Kiefernstümpfen gewannen?",
    "a": [
      "Extrem harzreiches Kernholz der Waldkiefer, das als Kienspan zur Stubenbeleuchtung, als Feueranzünder und zur Teergewinnung diente",
      "Geflochtene Weidenruten für Fischreusen",
      "Getrocknetes Torfmoos zum Abdichten von Fenstern",
      "Verkohltes Birkenlaub für Schießpulver"
    ],
    "exp": "Extrem harzreiches Kernholz der Waldkiefer, das als Kienspan zur Stubenbeleuchtung, als Feueranzünder und zur Teergewinnung diente – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 846,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum wechselte Schwarzenburg im Jahr 1815 (Wiener Kongress) seine Landeszugehörigkeit vom Königreich Sachsen zum Königreich Preußen?",
    "a": [
      "Nach den Napoleonischen Kriegen musste Sachsen die Niederlausitz und Teile des Kurkreises (Amt Schlieben) an Preußen abtreten",
      "Weil der sächsische König Schwarzenburg beim Kartenspiel verlor",
      "Weil der Fluss Berste sein Flussbett verlegte",
      "Durch einen Volksentscheid der Schäfer im Jahr 1815"
    ],
    "exp": "Nach den Napoleonischen Kriegen musste Sachsen die Niederlausitz und Teile des Kurkreises (Amt Schlieben) an Preußen abtreten – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 847,
    "cat": "geschichte",
    "diff": "mid",
    "q": "In welchem DDR-Bezirk lag Schwarzenburg (im damaligen Kreis Luckau) nach der Auflösung der Länder von 1952 bis 1990?",
    "a": [
      "Im Bezirk Cottbus",
      "Im Bezirk Potsdam",
      "Im Bezirk Frankfurt (Oder)",
      "Im Bezirk Dresden"
    ],
    "exp": "Im Bezirk Cottbus – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 848,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wie weit ist der berühmte Spreewald (z. B. Lübben / Lübbenau) mit seinen Fließen und Kahnfahrten von Schwarzenburg ungefähr mit dem Auto entfernt?",
    "a": [
      "Etwa 30 Minuten Fahrtzeit in Richtung Nordosten",
      "Über 3 Stunden Fahrtzeit",
      "Direkt am Ortsausgangsschild nach 200 Metern",
      "Etwa 250 Kilometer südlich"
    ],
    "exp": "Etwa 30 Minuten Fahrtzeit in Richtung Nordosten – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 849,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Garten- und Kreisstadt mit roter Backstein-Nikolaikirche, Hausmannsturm und Napoleonhäuschen liegt rund 15–20 Minuten nordöstlich von Schwarzenburg?",
    "a": [
      "Die Stadt Luckau",
      "Die Stadt Brandenburg an der Havel",
      "Die Stadt Neuruppin",
      "Die Stadt Eberswalde"
    ],
    "exp": "Die Stadt Luckau – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 850,
    "cat": "geschichte",
    "diff": "mid",
    "q": "In welchem Jahr richtete Luckau die erste Brandenburgische Landesgartenschau (LAGA) aus, die bis heute den Beinamen „Gartenstadt Luckau“ prägt?",
    "a": [
      "Im Jahr 2000",
      "Im Jahr 1955",
      "Im Jahr 1912",
      "Im Jahr 2022"
    ],
    "exp": "Im Jahr 2000 – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 851,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Was dokumentiert das Heinz Sielmann Natur-Erlebniszentrum in Wanninchen (Gemeinde Luckau / direkt am Rand von Heideblick) eindrucksvoll?",
    "a": [
      "Wie sich aus ehemaligen Braunkohle-Tagebauen der Lausitz (Schlabendorfer Felder) neue Seen und artenreiche Wildnis entwickeln",
      "Den Bau von Hochseedampfern auf der Elbe",
      "Die Geschichte des alpinen Skisports im Fläming",
      "Den Weinanbau der Römer an der Berste"
    ],
    "exp": "Wie sich aus ehemaligen Braunkohle-Tagebauen der Lausitz (Schlabendorfer Felder) neue Seen und artenreiche Wildnis entwickeln – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 852,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches westslawische Volk prägte ab dem 6./7. Jahrhundert die Kultur, Bräuche (wie das Zampern) und viele Ortsnamen der Niederlausitz rund um Heideblick?",
    "a": [
      "Die Sorben / Wenden (Lusici)",
      "Die Kelten aus Gallien",
      "Die Normannen aus Skandinavien",
      "Die Hunnen aus der Steppe"
    ],
    "exp": "Die Sorben / Wenden (Lusici) – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 853,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Was bedeutet der niedersorbische Ortsname „Wusoka“ für den Heideblicker Ortsteil Weißack sprachgeschichtlich?",
    "a": [
      "„Hoch gelegener Ort“ (von sorbisch „wysoki“ = hoch, wegen der Lage am Hang des Landrückens)",
      "„Weißes Schaf“",
      "„Tiefer Sumpfwald“",
      "„Kleiner Fischteich“"
    ],
    "exp": "„Hoch gelegener Ort“ (von sorbisch „wysoki“ = hoch, wegen der Lage am Hang des Landrückens) – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 854,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Was bedeutet der niedersorbische Name „Sokolnica“ für den 1207 erwähnten Heideblicker Ortsteil Falkenberg?",
    "a": [
      "„Falkenort“ (von slawisch/sorbisch „sokoł“ = Falke)",
      "„Eichenberg“",
      "„Sandmühle“",
      "„Biberbach“"
    ],
    "exp": "„Falkenort“ (von slawisch/sorbisch „sokoł“ = Falke) – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 855,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Was ist ein mittelalterliches „Sühnekreuz“, wie man es aus Sandstein am südlichen Ortsrand von Waltersdorf (Gemeinde Heideblick) besichtigen kann?",
    "a": [
      "Ein steinernes Denkmal, das im Mittelalter nach einem Totschlag als Teil eines Sühnevertrags vom Täter am Tatort errichtet werden musste",
      "Ein alter Wegweiser für Postkutschen nach Dresden",
      "Ein Grenzstein zwischen Preußen und Schweden",
      "Ein Grabstein für das Lieblingspferd eines Ritters"
    ],
    "exp": "Ein steinernes Denkmal, das im Mittelalter nach einem Totschlag als Teil eines Sühnevertrags vom Täter am Tatort errichtet werden musste – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 856,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum gab es entlang des kleinen Flusses Berste bei Waltersdorf, Bornsdorf und Weißack früher über ein Dutzend Mühlen (z. B. Neumühle, Poltermühle, Papiermühle, Teiselsmühle)?",
    "a": [
      "Das Gefälle der am Niederlausitzer Landrücken entspringenden Berste trieb über Jahrhunderte Korn-, Säge-, Walk- und Papiermühlen an",
      "Weil auf der Berste große Segelschiffe fuhren",
      "Weil dort Gold aus dem Gebirgsfluss gewaschen wurde",
      "Weil jede Mühle als Leuchtturm für den Spreewald diente"
    ],
    "exp": "Das Gefälle der am Niederlausitzer Landrücken entspringenden Berste trieb über Jahrhunderte Korn-, Säge-, Walk- und Papiermühlen an – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 857,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche beiden Bundesstraßen kreuzen bzw. erschließen das Gemeindegebiet von Heideblick zwischen Herzberg, Luckau und Finsterwalde?",
    "a": [
      "Die Bundesstraße B 87 und die Bundesstraße B 96",
      "Die B 1 und die B 2",
      "Die B 101 und die B 5",
      "Die B 246 und die B 169"
    ],
    "exp": "Die Bundesstraße B 87 und die Bundesstraße B 96 – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 858,
    "cat": "geschichte",
    "diff": "mid",
    "q": "In welchem Jahr wurde das ehemalige „Amt Heideblick“ aufgelöst und die heutige amtsfreie Großgemeinde Heideblick (inkl. Walddrehna & Schwarzenburg) vollendet?",
    "a": [
      "Am 26. Oktober 2003",
      "Am 1. Januar 1909",
      "Am 3. Oktober 1990",
      "Am 15. Mai 1949"
    ],
    "exp": "Am 26. Oktober 2003 – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 859,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wie entschieden die Bürgerinnen und Bürger der Gemeinde Heideblick im November 2011 in einer Bürgerbefragung über einen geplanten Beitritt zur Stadt Luckau?",
    "a": [
      "Sie lehnten den Beitritt ab und sprachen sich für den Erhalt der eigenständigen Gemeinde Heideblick aus",
      "Sie stimmten für einen Anschluss an Berlin-Mitte",
      "Sie beschlossen die Umbenennung von Luckau in Neu-Schwarzenburg",
      "Sie stimmten für eine Teilung zwischen Sachsen und Polen"
    ],
    "exp": "Sie lehnten den Beitritt ab und sprachen sich für den Erhalt der eigenständigen Gemeinde Heideblick aus – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 860,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche vier Kfz-Kennzeichen-Kürzel sind im Landkreis Dahme-Spreewald (zu dem Heideblick und Schwarzenburg gehören) offiziell zugelassen?",
    "a": [
      "LDS sowie die Altkennzeichen KW (Königs Wusterhausen), LC (Luckau) und LN (Lübben)",
      "Nur B und P",
      "CB, SPN und OSL",
      "EE, FI und LIB"
    ],
    "exp": "LDS sowie die Altkennzeichen KW (Königs Wusterhausen), LC (Luckau) und LN (Lübben) – ein spannendes Detail aus der Geschichte von Schwarzenburg, Heideblick und der Niederlausitz."
  },
  {
    "id": 861,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1207“?",
    "a": [
      "Erste urkundliche Erwähnung des heutigen Heideblicker Ortsteils Falkenberg (Sokolnica)",
      "Geburt des berühmten Agrarreformers Johann Gottlieb Koppe im Heideblicker Ortsteil Beesdau",
      "Heimatkundliche Erhebung im Kreis Schweinitz verzeichnet für Schwarzenburg rund 166 Einwohner",
      "Gründung des Naturparks Niederlausitzer Landrücken (ca. 580 km²) und Zusammenschluss der ersten vier Gemeinden zu Heideblick"
    ],
    "exp": "1207: Erste urkundliche Erwähnung des heutigen Heideblicker Ortsteils Falkenberg (Sokolnica). Falkenberg zählt damit zu den ältesten urkundlich erwähnten Orten der Mark Brandenburg."
  },
  {
    "id": 862,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Erste urkundliche Erwähnung des heutigen Heideblicker Ortsteils Falkenberg (Sokolnica)“?",
    "a": [
      "1207",
      "1782",
      "1912",
      "1997"
    ],
    "exp": "Zeitpunkt: 1207. Falkenberg zählt damit zu den ältesten urkundlich erwähnten Orten der Mark Brandenburg."
  },
  {
    "id": 863,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Erste urkundliche Erwähnung des heutigen Heideblicker Ortsteils Falkenberg (Sokolnica)“ (1207) für die Region Heideblick?",
    "a": [
      "Falkenberg zählt damit zu den ältesten urkundlich erwähnten Orten der Mark Brandenburg.",
      "Koppe reformierte die Fruchtfolge und den Zuckerrübenanbau in Preußen und erwarb später das Rittergut Beesdau.",
      "Damals herrschte durch Forst- und Landwirtschaft reger Betrieb im Walddorf.",
      "Gehren, Langengrassau, Waltersdorf und Wüstermarke bildeten am 31.12.1997 die erste Gemeinde Heideblick."
    ],
    "exp": "1207 (Erste urkundliche Erwähnung des heutigen Heideblicker Ortsteils Falkenberg (Sokolnica)): Falkenberg zählt damit zu den ältesten urkundlich erwähnten Orten der Mark Brandenburg."
  },
  {
    "id": 864,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „13. Jahrhundert“?",
    "a": [
      "Bau der Feldsteinkirche in Walddrehna mit ihrer späteren dreiseitig offenen Backstein-Vorhalle",
      "Übergang der Region nach dem Wiener Kongress von Sachsen an Preußen; Zuordnung Schwarzenburgs zum Kreis Schweinitz",
      "Umbenennung des Nachbarortes „Wendisch Drehna“ in „Walddrehna“",
      "Zusammenschluss von Beesdau, Berstequell (Bornsdorf/Weißack), Falkenberg, Goßmar, Heideblick und Pitschen-Pickel"
    ],
    "exp": "13. Jahrhundert: Bau der Feldsteinkirche in Walddrehna mit ihrer späteren dreiseitig offenen Backstein-Vorhalle. Die Kirche in Walddrehna ist eines der bedeutendsten mittelalterlichen Baudenkmale der Gemeinde Heideblick."
  },
  {
    "id": 865,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Bau der Feldsteinkirche in Walddrehna mit ihrer späteren dreiseitig offenen Backstein-Vorhalle“?",
    "a": [
      "13. Jahrhundert",
      "1815 / 1816",
      "30. Oktober 1937",
      "31. Dezember 2001"
    ],
    "exp": "Zeitpunkt: 13. Jahrhundert. Die Kirche in Walddrehna ist eines der bedeutendsten mittelalterlichen Baudenkmale der Gemeinde Heideblick."
  },
  {
    "id": 866,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Bau der Feldsteinkirche in Walddrehna mit ihrer späteren dreiseitig offenen Backstein-Vorhalle“ (13. Jahrhundert) für die Region Heideblick?",
    "a": [
      "Die Kirche in Walddrehna ist eines der bedeutendsten mittelalterlichen Baudenkmale der Gemeinde Heideblick.",
      "Von 1816 bis 1952 gehörte Schwarzenburg zum preußischen Landkreis Schweinitz in der Provinz Sachsen.",
      "Der sorbische Name „Serbski Drjenow“ blieb in der niedersorbischen Ortsnamendatenbank erhalten.",
      "Die Gemeinde Heideblick wuchs damit auf den Großteil ihrer heutigen Fläche an."
    ],
    "exp": "13. Jahrhundert (Bau der Feldsteinkirche in Walddrehna mit ihrer späteren dreiseitig offenen Backstein-Vorhalle): Die Kirche in Walddrehna ist eines der bedeutendsten mittelalterlichen Baudenkmale der Gemeinde Heideblick."
  },
  {
    "id": 867,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „15. Jahrhundert“?",
    "a": [
      "Errichtung der spätmittelalterlichen Feldsteinkirchen in Pitschen und im Nachbarort Wehnsdorf",
      "Urkundliche Nennung von „Schwarzenburg, Schwarzenberg oder die schwarze Schäferei“",
      "Verwaltungsreform in der DDR: Schwarzenburg wechselt vom Kreis Schweinitz in den Kreis Luckau (Bezirk Cottbus)",
      "Eingliederung von Walddrehna (mit Schwarzenburg) in die nun amtsfreie Gemeinde Heideblick mit 14 Ortsteilen"
    ],
    "exp": "15. Jahrhundert: Errichtung der spätmittelalterlichen Feldsteinkirchen in Pitschen und im Nachbarort Wehnsdorf. Beide Kirchen wurden aus eiszeitlichen Findlingen der Niederlausitzer Endmoräne gemauert."
  },
  {
    "id": 868,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Errichtung der spätmittelalterlichen Feldsteinkirchen in Pitschen und im Nachbarort Wehnsdorf“?",
    "a": [
      "15. Jahrhundert",
      "1823",
      "1952",
      "26. Oktober 2003"
    ],
    "exp": "Zeitpunkt: 15. Jahrhundert. Beide Kirchen wurden aus eiszeitlichen Findlingen der Niederlausitzer Endmoräne gemauert."
  },
  {
    "id": 869,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Errichtung der spätmittelalterlichen Feldsteinkirchen in Pitschen und im Nachbarort Wehnsdorf“ (15. Jahrhundert) für die Region Heideblick?",
    "a": [
      "Beide Kirchen wurden aus eiszeitlichen Findlingen der Niederlausitzer Endmoräne gemauert.",
      "Alle drei historischen Namensformen wurden im frühen 19. Jahrhundert noch parallel verwendet.",
      "Damit rückte Schwarzenburg verwaltungsmäßig näher an Walddrehna, Langengrassau und Luckau heran.",
      "Kurz darauf, am 2. Dezember 2003, erhielt Heideblick sein offizielles Gemeindewappen mit Kornähren und Lindenblättern."
    ],
    "exp": "15. Jahrhundert (Errichtung der spätmittelalterlichen Feldsteinkirchen in Pitschen und im Nachbarort Wehnsdorf): Beide Kirchen wurden aus eiszeitlichen Findlingen der Niederlausitzer Endmoräne gemauert."
  },
  {
    "id": 870,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1554“?",
    "a": [
      "Erwähnung von Schwarzenburg als wüste „schwarze Schäfferey“ in alten kursächsischen Aufzeichnungen",
      "König Friedrich Wilhelm III. stiftet Schwarzenburg eine eigene Schule mit Gebetsraum in einer alten Blechlöffelfabrik",
      "Zusammenschluss der beiden Nachbardörfer Pitschen und Pickel zur Gemeinde Pitschen-Pickel",
      "Bürgerbefragung in Heideblick entscheidet sich klar für die Eigenständigkeit der Gemeinde statt eines Beitritts zu Luckau"
    ],
    "exp": "1554: Erwähnung von Schwarzenburg als wüste „schwarze Schäfferey“ in alten kursächsischen Aufzeichnungen. Der älteste schriftliche Hinweis auf die Schäferei-Tradition von Schwarzenburg."
  },
  {
    "id": 871,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Erwähnung von Schwarzenburg als wüste „schwarze Schäfferey“ in alten kursächsischen Aufzeichnungen“?",
    "a": [
      "1554",
      "1830",
      "14. April 1966",
      "November 2011"
    ],
    "exp": "Zeitpunkt: 1554. Der älteste schriftliche Hinweis auf die Schäferei-Tradition von Schwarzenburg."
  },
  {
    "id": 872,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Erwähnung von Schwarzenburg als wüste „schwarze Schäfferey“ in alten kursächsischen Aufzeichnungen“ (1554) für die Region Heideblick?",
    "a": [
      "Der älteste schriftliche Hinweis auf die Schäferei-Tradition von Schwarzenburg.",
      "Damit mussten die Kinder aus Schwarzenburg nicht mehr kilometerweit durch den Wald in Nachbardörfer laufen.",
      "Pitschen bildet den nördlichen, Pickel den südlichen Dorfteil.",
      "Heideblick blieb damit eine eigenständige, bürgernahe Landgemeinde im Landkreis Dahme-Spreewald."
    ],
    "exp": "1554 (Erwähnung von Schwarzenburg als wüste „schwarze Schäfferey“ in alten kursächsischen Aufzeichnungen): Der älteste schriftliche Hinweis auf die Schäferei-Tradition von Schwarzenburg."
  },
  {
    "id": 873,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1615“?",
    "a": [
      "Urkundliche Beschreibung von Schwarzenburg als „wuster Acker neben der Rochischen Heyde am schwartzen Berge“",
      "Umbau der Dreiflügelanlage von Wasserschloss Beesdau durch Johann Gottlieb Koppe",
      "Schließung der Einraumschule Schwarzenburg nach 63 Jahren Unterricht und Beginn der Museumsinitiative durch Lehrer Helmuth Österitz",
      "Erste urkundliche Erwähnung des heutigen Heideblicker Ortsteils Falkenberg (Sokolnica)"
    ],
    "exp": "1615: Urkundliche Beschreibung von Schwarzenburg als „wuster Acker neben der Rochischen Heyde am schwartzen Berge“. Aus der Lage am „schwartzen Berge“ entwickelte sich im Laufe der Zeit der Ortsname Schwarzenburg."
  },
  {
    "id": 874,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Urkundliche Beschreibung von Schwarzenburg als „wuster Acker neben der Rochischen Heyde am schwartzen Berge““?",
    "a": [
      "1615",
      "1841",
      "1972",
      "1207"
    ],
    "exp": "Zeitpunkt: 1615. Aus der Lage am „schwartzen Berge“ entwickelte sich im Laufe der Zeit der Ortsname Schwarzenburg."
  },
  {
    "id": 875,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Urkundliche Beschreibung von Schwarzenburg als „wuster Acker neben der Rochischen Heyde am schwartzen Berge““ (1615) für die Region Heideblick?",
    "a": [
      "Aus der Lage am „schwartzen Berge“ entwickelte sich im Laufe der Zeit der Ortsname Schwarzenburg.",
      "Schloss Beesdau mit seinem Park ist bis heute ein Wahrzeichen der Gemeinde Heideblick.",
      "Dank Helmuth Österitz blieb das Klassenzimmer mit historischen Schulbänken, Schiefertafeln und Lehrmitteln erhalten.",
      "Falkenberg zählt damit zu den ältesten urkundlich erwähnten Orten der Mark Brandenburg."
    ],
    "exp": "1615 (Urkundliche Beschreibung von Schwarzenburg als „wuster Acker neben der Rochischen Heyde am schwartzen Berge“): Aus der Lage am „schwartzen Berge“ entwickelte sich im Laufe der Zeit der Ortsname Schwarzenburg."
  },
  {
    "id": 876,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1675 / 1684“?",
    "a": [
      "Einbau der Patronatsloge (1675) und des barocken Kanzelaltar-Aufsatzes (1684) in der Dorfkirche Pitschen",
      "Erbauung der historischen Bockwindmühle im Heideblicker Ortsteil Falkenberg",
      "Eingemeindung von Schwarzenburg und Wehnsdorf in die Nachbargemeinde Walddrehna",
      "Bau der Feldsteinkirche in Walddrehna mit ihrer späteren dreiseitig offenen Backstein-Vorhalle"
    ],
    "exp": "1675 / 1684: Einbau der Patronatsloge (1675) und des barocken Kanzelaltar-Aufsatzes (1684) in der Dorfkirche Pitschen. Wertvolle Zeugnisse ländlicher Kirchenkunst nach dem Dreißigjährigen Krieg."
  },
  {
    "id": 877,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Einbau der Patronatsloge (1675) und des barocken Kanzelaltar-Aufsatzes (1684) in der Dorfkirche Pitschen“?",
    "a": [
      "1675 / 1684",
      "1853",
      "1. Januar 1974",
      "13. Jahrhundert"
    ],
    "exp": "Zeitpunkt: 1675 / 1684. Wertvolle Zeugnisse ländlicher Kirchenkunst nach dem Dreißigjährigen Krieg."
  },
  {
    "id": 878,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Einbau der Patronatsloge (1675) und des barocken Kanzelaltar-Aufsatzes (1684) in der Dorfkirche Pitschen“ (1675 / 1684) für die Region Heideblick?",
    "a": [
      "Wertvolle Zeugnisse ländlicher Kirchenkunst nach dem Dreißigjährigen Krieg.",
      "Die hölzerne Bockwindmühle von 1853 steht unter Denkmalschutz.",
      "Knapp drei Jahrzehnte später wurde Walddrehna mitsamt Schwarzenburg Teil der Gemeinde Heideblick.",
      "Die Kirche in Walddrehna ist eines der bedeutendsten mittelalterlichen Baudenkmale der Gemeinde Heideblick."
    ],
    "exp": "1675 / 1684 (Einbau der Patronatsloge (1675) und des barocken Kanzelaltar-Aufsatzes (1684) in der Dorfkirche Pitschen): Wertvolle Zeugnisse ländlicher Kirchenkunst nach dem Dreißigjährigen Krieg."
  },
  {
    "id": 879,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1730 / 1733“?",
    "a": [
      "Nennung des Ortes in Urkunden als „Vorwerk Schwartzburg“ (1730) und „Schwarzenburg“ (1733)",
      "Neubau des Schwarzenburger Schulhauses mit Einklassenraum, Betsaal und Lehrerwohnung an alter Stelle",
      "Bildung des Amtes Heideblick aus elf Gemeinden mit Verwaltungssitz in Langengrassau",
      "Errichtung der spätmittelalterlichen Feldsteinkirchen in Pitschen und im Nachbarort Wehnsdorf"
    ],
    "exp": "1730 / 1733: Nennung des Ortes in Urkunden als „Vorwerk Schwartzburg“ (1730) und „Schwarzenburg“ (1733). Das kursächsische Vorwerk unterstand dem Amt Schlieben und betrieb Schafzucht."
  },
  {
    "id": 880,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Nennung des Ortes in Urkunden als „Vorwerk Schwartzburg“ (1730) und „Schwarzenburg“ (1733)“?",
    "a": [
      "1730 / 1733",
      "1909",
      "28. August 1992",
      "15. Jahrhundert"
    ],
    "exp": "Zeitpunkt: 1730 / 1733. Das kursächsische Vorwerk unterstand dem Amt Schlieben und betrieb Schafzucht."
  },
  {
    "id": 881,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Nennung des Ortes in Urkunden als „Vorwerk Schwartzburg“ (1730) und „Schwarzenburg“ (1733)“ (1730 / 1733) für die Region Heideblick?",
    "a": [
      "Das kursächsische Vorwerk unterstand dem Amt Schlieben und betrieb Schafzucht.",
      "Dieses 1909 erbaute Denkmal beherbergt heute das berühmte Schulmuseum Schwarzenburg.",
      "Der Name „Heideblick“ beschreibt den weiten Blick vom Niederlausitzer Landrücken über Heide und Flur.",
      "Beide Kirchen wurden aus eiszeitlichen Findlingen der Niederlausitzer Endmoräne gemauert."
    ],
    "exp": "1730 / 1733 (Nennung des Ortes in Urkunden als „Vorwerk Schwartzburg“ (1730) und „Schwarzenburg“ (1733)): Das kursächsische Vorwerk unterstand dem Amt Schlieben und betrieb Schafzucht."
  },
  {
    "id": 882,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1782“?",
    "a": [
      "Geburt des berühmten Agrarreformers Johann Gottlieb Koppe im Heideblicker Ortsteil Beesdau",
      "Heimatkundliche Erhebung im Kreis Schweinitz verzeichnet für Schwarzenburg rund 166 Einwohner",
      "Gründung des Naturparks Niederlausitzer Landrücken (ca. 580 km²) und Zusammenschluss der ersten vier Gemeinden zu Heideblick",
      "Erwähnung von Schwarzenburg als wüste „schwarze Schäfferey“ in alten kursächsischen Aufzeichnungen"
    ],
    "exp": "1782: Geburt des berühmten Agrarreformers Johann Gottlieb Koppe im Heideblicker Ortsteil Beesdau. Koppe reformierte die Fruchtfolge und den Zuckerrübenanbau in Preußen und erwarb später das Rittergut Beesdau."
  },
  {
    "id": 883,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Geburt des berühmten Agrarreformers Johann Gottlieb Koppe im Heideblicker Ortsteil Beesdau“?",
    "a": [
      "1782",
      "1912",
      "1997",
      "1554"
    ],
    "exp": "Zeitpunkt: 1782. Koppe reformierte die Fruchtfolge und den Zuckerrübenanbau in Preußen und erwarb später das Rittergut Beesdau."
  },
  {
    "id": 884,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Geburt des berühmten Agrarreformers Johann Gottlieb Koppe im Heideblicker Ortsteil Beesdau“ (1782) für die Region Heideblick?",
    "a": [
      "Koppe reformierte die Fruchtfolge und den Zuckerrübenanbau in Preußen und erwarb später das Rittergut Beesdau.",
      "Damals herrschte durch Forst- und Landwirtschaft reger Betrieb im Walddorf.",
      "Gehren, Langengrassau, Waltersdorf und Wüstermarke bildeten am 31.12.1997 die erste Gemeinde Heideblick.",
      "Der älteste schriftliche Hinweis auf die Schäferei-Tradition von Schwarzenburg."
    ],
    "exp": "1782 (Geburt des berühmten Agrarreformers Johann Gottlieb Koppe im Heideblicker Ortsteil Beesdau): Koppe reformierte die Fruchtfolge und den Zuckerrübenanbau in Preußen und erwarb später das Rittergut Beesdau."
  },
  {
    "id": 885,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1815 / 1816“?",
    "a": [
      "Übergang der Region nach dem Wiener Kongress von Sachsen an Preußen; Zuordnung Schwarzenburgs zum Kreis Schweinitz",
      "Umbenennung des Nachbarortes „Wendisch Drehna“ in „Walddrehna“",
      "Zusammenschluss von Beesdau, Berstequell (Bornsdorf/Weißack), Falkenberg, Goßmar, Heideblick und Pitschen-Pickel",
      "Urkundliche Beschreibung von Schwarzenburg als „wuster Acker neben der Rochischen Heyde am schwartzen Berge“"
    ],
    "exp": "1815 / 1816: Übergang der Region nach dem Wiener Kongress von Sachsen an Preußen; Zuordnung Schwarzenburgs zum Kreis Schweinitz. Von 1816 bis 1952 gehörte Schwarzenburg zum preußischen Landkreis Schweinitz in der Provinz Sachsen."
  },
  {
    "id": 886,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Übergang der Region nach dem Wiener Kongress von Sachsen an Preußen; Zuordnung Schwarzenburgs zum Kreis Schweinitz“?",
    "a": [
      "1815 / 1816",
      "30. Oktober 1937",
      "31. Dezember 2001",
      "1615"
    ],
    "exp": "Zeitpunkt: 1815 / 1816. Von 1816 bis 1952 gehörte Schwarzenburg zum preußischen Landkreis Schweinitz in der Provinz Sachsen."
  },
  {
    "id": 887,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Übergang der Region nach dem Wiener Kongress von Sachsen an Preußen; Zuordnung Schwarzenburgs zum Kreis Schweinitz“ (1815 / 1816) für die Region Heideblick?",
    "a": [
      "Von 1816 bis 1952 gehörte Schwarzenburg zum preußischen Landkreis Schweinitz in der Provinz Sachsen.",
      "Der sorbische Name „Serbski Drjenow“ blieb in der niedersorbischen Ortsnamendatenbank erhalten.",
      "Die Gemeinde Heideblick wuchs damit auf den Großteil ihrer heutigen Fläche an.",
      "Aus der Lage am „schwartzen Berge“ entwickelte sich im Laufe der Zeit der Ortsname Schwarzenburg."
    ],
    "exp": "1815 / 1816 (Übergang der Region nach dem Wiener Kongress von Sachsen an Preußen; Zuordnung Schwarzenburgs zum Kreis Schweinitz): Von 1816 bis 1952 gehörte Schwarzenburg zum preußischen Landkreis Schweinitz in der Provinz Sachsen."
  },
  {
    "id": 888,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1823“?",
    "a": [
      "Urkundliche Nennung von „Schwarzenburg, Schwarzenberg oder die schwarze Schäferei“",
      "Verwaltungsreform in der DDR: Schwarzenburg wechselt vom Kreis Schweinitz in den Kreis Luckau (Bezirk Cottbus)",
      "Eingliederung von Walddrehna (mit Schwarzenburg) in die nun amtsfreie Gemeinde Heideblick mit 14 Ortsteilen",
      "Einbau der Patronatsloge (1675) und des barocken Kanzelaltar-Aufsatzes (1684) in der Dorfkirche Pitschen"
    ],
    "exp": "1823: Urkundliche Nennung von „Schwarzenburg, Schwarzenberg oder die schwarze Schäferei“. Alle drei historischen Namensformen wurden im frühen 19. Jahrhundert noch parallel verwendet."
  },
  {
    "id": 889,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Urkundliche Nennung von „Schwarzenburg, Schwarzenberg oder die schwarze Schäferei““?",
    "a": [
      "1823",
      "1952",
      "26. Oktober 2003",
      "1675 / 1684"
    ],
    "exp": "Zeitpunkt: 1823. Alle drei historischen Namensformen wurden im frühen 19. Jahrhundert noch parallel verwendet."
  },
  {
    "id": 890,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Urkundliche Nennung von „Schwarzenburg, Schwarzenberg oder die schwarze Schäferei““ (1823) für die Region Heideblick?",
    "a": [
      "Alle drei historischen Namensformen wurden im frühen 19. Jahrhundert noch parallel verwendet.",
      "Damit rückte Schwarzenburg verwaltungsmäßig näher an Walddrehna, Langengrassau und Luckau heran.",
      "Kurz darauf, am 2. Dezember 2003, erhielt Heideblick sein offizielles Gemeindewappen mit Kornähren und Lindenblättern.",
      "Wertvolle Zeugnisse ländlicher Kirchenkunst nach dem Dreißigjährigen Krieg."
    ],
    "exp": "1823 (Urkundliche Nennung von „Schwarzenburg, Schwarzenberg oder die schwarze Schäferei“): Alle drei historischen Namensformen wurden im frühen 19. Jahrhundert noch parallel verwendet."
  },
  {
    "id": 891,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1830“?",
    "a": [
      "König Friedrich Wilhelm III. stiftet Schwarzenburg eine eigene Schule mit Gebetsraum in einer alten Blechlöffelfabrik",
      "Zusammenschluss der beiden Nachbardörfer Pitschen und Pickel zur Gemeinde Pitschen-Pickel",
      "Bürgerbefragung in Heideblick entscheidet sich klar für die Eigenständigkeit der Gemeinde statt eines Beitritts zu Luckau",
      "Nennung des Ortes in Urkunden als „Vorwerk Schwartzburg“ (1730) und „Schwarzenburg“ (1733)"
    ],
    "exp": "1830: König Friedrich Wilhelm III. stiftet Schwarzenburg eine eigene Schule mit Gebetsraum in einer alten Blechlöffelfabrik. Damit mussten die Kinder aus Schwarzenburg nicht mehr kilometerweit durch den Wald in Nachbardörfer laufen."
  },
  {
    "id": 892,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „König Friedrich Wilhelm III. stiftet Schwarzenburg eine eigene Schule mit Gebetsraum in einer alten Blechlöffelfabrik“?",
    "a": [
      "1830",
      "14. April 1966",
      "November 2011",
      "1730 / 1733"
    ],
    "exp": "Zeitpunkt: 1830. Damit mussten die Kinder aus Schwarzenburg nicht mehr kilometerweit durch den Wald in Nachbardörfer laufen."
  },
  {
    "id": 893,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „König Friedrich Wilhelm III. stiftet Schwarzenburg eine eigene Schule mit Gebetsraum in einer alten Blechlöffelfabrik“ (1830) für die Region Heideblick?",
    "a": [
      "Damit mussten die Kinder aus Schwarzenburg nicht mehr kilometerweit durch den Wald in Nachbardörfer laufen.",
      "Pitschen bildet den nördlichen, Pickel den südlichen Dorfteil.",
      "Heideblick blieb damit eine eigenständige, bürgernahe Landgemeinde im Landkreis Dahme-Spreewald.",
      "Das kursächsische Vorwerk unterstand dem Amt Schlieben und betrieb Schafzucht."
    ],
    "exp": "1830 (König Friedrich Wilhelm III. stiftet Schwarzenburg eine eigene Schule mit Gebetsraum in einer alten Blechlöffelfabrik): Damit mussten die Kinder aus Schwarzenburg nicht mehr kilometerweit durch den Wald in Nachbardörfer laufen."
  },
  {
    "id": 894,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1841“?",
    "a": [
      "Umbau der Dreiflügelanlage von Wasserschloss Beesdau durch Johann Gottlieb Koppe",
      "Schließung der Einraumschule Schwarzenburg nach 63 Jahren Unterricht und Beginn der Museumsinitiative durch Lehrer Helmuth Österitz",
      "Erste urkundliche Erwähnung des heutigen Heideblicker Ortsteils Falkenberg (Sokolnica)",
      "Geburt des berühmten Agrarreformers Johann Gottlieb Koppe im Heideblicker Ortsteil Beesdau"
    ],
    "exp": "1841: Umbau der Dreiflügelanlage von Wasserschloss Beesdau durch Johann Gottlieb Koppe. Schloss Beesdau mit seinem Park ist bis heute ein Wahrzeichen der Gemeinde Heideblick."
  },
  {
    "id": 895,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Umbau der Dreiflügelanlage von Wasserschloss Beesdau durch Johann Gottlieb Koppe“?",
    "a": [
      "1841",
      "1972",
      "1207",
      "1782"
    ],
    "exp": "Zeitpunkt: 1841. Schloss Beesdau mit seinem Park ist bis heute ein Wahrzeichen der Gemeinde Heideblick."
  },
  {
    "id": 896,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Umbau der Dreiflügelanlage von Wasserschloss Beesdau durch Johann Gottlieb Koppe“ (1841) für die Region Heideblick?",
    "a": [
      "Schloss Beesdau mit seinem Park ist bis heute ein Wahrzeichen der Gemeinde Heideblick.",
      "Dank Helmuth Österitz blieb das Klassenzimmer mit historischen Schulbänken, Schiefertafeln und Lehrmitteln erhalten.",
      "Falkenberg zählt damit zu den ältesten urkundlich erwähnten Orten der Mark Brandenburg.",
      "Koppe reformierte die Fruchtfolge und den Zuckerrübenanbau in Preußen und erwarb später das Rittergut Beesdau."
    ],
    "exp": "1841 (Umbau der Dreiflügelanlage von Wasserschloss Beesdau durch Johann Gottlieb Koppe): Schloss Beesdau mit seinem Park ist bis heute ein Wahrzeichen der Gemeinde Heideblick."
  },
  {
    "id": 897,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1853“?",
    "a": [
      "Erbauung der historischen Bockwindmühle im Heideblicker Ortsteil Falkenberg",
      "Eingemeindung von Schwarzenburg und Wehnsdorf in die Nachbargemeinde Walddrehna",
      "Bau der Feldsteinkirche in Walddrehna mit ihrer späteren dreiseitig offenen Backstein-Vorhalle",
      "Übergang der Region nach dem Wiener Kongress von Sachsen an Preußen; Zuordnung Schwarzenburgs zum Kreis Schweinitz"
    ],
    "exp": "1853: Erbauung der historischen Bockwindmühle im Heideblicker Ortsteil Falkenberg. Die hölzerne Bockwindmühle von 1853 steht unter Denkmalschutz."
  },
  {
    "id": 898,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Erbauung der historischen Bockwindmühle im Heideblicker Ortsteil Falkenberg“?",
    "a": [
      "1853",
      "1. Januar 1974",
      "13. Jahrhundert",
      "1815 / 1816"
    ],
    "exp": "Zeitpunkt: 1853. Die hölzerne Bockwindmühle von 1853 steht unter Denkmalschutz."
  },
  {
    "id": 899,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Erbauung der historischen Bockwindmühle im Heideblicker Ortsteil Falkenberg“ (1853) für die Region Heideblick?",
    "a": [
      "Die hölzerne Bockwindmühle von 1853 steht unter Denkmalschutz.",
      "Knapp drei Jahrzehnte später wurde Walddrehna mitsamt Schwarzenburg Teil der Gemeinde Heideblick.",
      "Die Kirche in Walddrehna ist eines der bedeutendsten mittelalterlichen Baudenkmale der Gemeinde Heideblick.",
      "Von 1816 bis 1952 gehörte Schwarzenburg zum preußischen Landkreis Schweinitz in der Provinz Sachsen."
    ],
    "exp": "1853 (Erbauung der historischen Bockwindmühle im Heideblicker Ortsteil Falkenberg): Die hölzerne Bockwindmühle von 1853 steht unter Denkmalschutz."
  },
  {
    "id": 900,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1909“?",
    "a": [
      "Neubau des Schwarzenburger Schulhauses mit Einklassenraum, Betsaal und Lehrerwohnung an alter Stelle",
      "Bildung des Amtes Heideblick aus elf Gemeinden mit Verwaltungssitz in Langengrassau",
      "Errichtung der spätmittelalterlichen Feldsteinkirchen in Pitschen und im Nachbarort Wehnsdorf",
      "Urkundliche Nennung von „Schwarzenburg, Schwarzenberg oder die schwarze Schäferei“"
    ],
    "exp": "1909: Neubau des Schwarzenburger Schulhauses mit Einklassenraum, Betsaal und Lehrerwohnung an alter Stelle. Dieses 1909 erbaute Denkmal beherbergt heute das berühmte Schulmuseum Schwarzenburg."
  },
  {
    "id": 901,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Neubau des Schwarzenburger Schulhauses mit Einklassenraum, Betsaal und Lehrerwohnung an alter Stelle“?",
    "a": [
      "1909",
      "28. August 1992",
      "15. Jahrhundert",
      "1823"
    ],
    "exp": "Zeitpunkt: 1909. Dieses 1909 erbaute Denkmal beherbergt heute das berühmte Schulmuseum Schwarzenburg."
  },
  {
    "id": 902,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Neubau des Schwarzenburger Schulhauses mit Einklassenraum, Betsaal und Lehrerwohnung an alter Stelle“ (1909) für die Region Heideblick?",
    "a": [
      "Dieses 1909 erbaute Denkmal beherbergt heute das berühmte Schulmuseum Schwarzenburg.",
      "Der Name „Heideblick“ beschreibt den weiten Blick vom Niederlausitzer Landrücken über Heide und Flur.",
      "Beide Kirchen wurden aus eiszeitlichen Findlingen der Niederlausitzer Endmoräne gemauert.",
      "Alle drei historischen Namensformen wurden im frühen 19. Jahrhundert noch parallel verwendet."
    ],
    "exp": "1909 (Neubau des Schwarzenburger Schulhauses mit Einklassenraum, Betsaal und Lehrerwohnung an alter Stelle): Dieses 1909 erbaute Denkmal beherbergt heute das berühmte Schulmuseum Schwarzenburg."
  },
  {
    "id": 903,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1912“?",
    "a": [
      "Heimatkundliche Erhebung im Kreis Schweinitz verzeichnet für Schwarzenburg rund 166 Einwohner",
      "Gründung des Naturparks Niederlausitzer Landrücken (ca. 580 km²) und Zusammenschluss der ersten vier Gemeinden zu Heideblick",
      "Erwähnung von Schwarzenburg als wüste „schwarze Schäfferey“ in alten kursächsischen Aufzeichnungen",
      "König Friedrich Wilhelm III. stiftet Schwarzenburg eine eigene Schule mit Gebetsraum in einer alten Blechlöffelfabrik"
    ],
    "exp": "1912: Heimatkundliche Erhebung im Kreis Schweinitz verzeichnet für Schwarzenburg rund 166 Einwohner. Damals herrschte durch Forst- und Landwirtschaft reger Betrieb im Walddorf."
  },
  {
    "id": 904,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Heimatkundliche Erhebung im Kreis Schweinitz verzeichnet für Schwarzenburg rund 166 Einwohner“?",
    "a": [
      "1912",
      "1997",
      "1554",
      "1830"
    ],
    "exp": "Zeitpunkt: 1912. Damals herrschte durch Forst- und Landwirtschaft reger Betrieb im Walddorf."
  },
  {
    "id": 905,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Heimatkundliche Erhebung im Kreis Schweinitz verzeichnet für Schwarzenburg rund 166 Einwohner“ (1912) für die Region Heideblick?",
    "a": [
      "Damals herrschte durch Forst- und Landwirtschaft reger Betrieb im Walddorf.",
      "Gehren, Langengrassau, Waltersdorf und Wüstermarke bildeten am 31.12.1997 die erste Gemeinde Heideblick.",
      "Der älteste schriftliche Hinweis auf die Schäferei-Tradition von Schwarzenburg.",
      "Damit mussten die Kinder aus Schwarzenburg nicht mehr kilometerweit durch den Wald in Nachbardörfer laufen."
    ],
    "exp": "1912 (Heimatkundliche Erhebung im Kreis Schweinitz verzeichnet für Schwarzenburg rund 166 Einwohner): Damals herrschte durch Forst- und Landwirtschaft reger Betrieb im Walddorf."
  },
  {
    "id": 906,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „30. Oktober 1937“?",
    "a": [
      "Umbenennung des Nachbarortes „Wendisch Drehna“ in „Walddrehna“",
      "Zusammenschluss von Beesdau, Berstequell (Bornsdorf/Weißack), Falkenberg, Goßmar, Heideblick und Pitschen-Pickel",
      "Urkundliche Beschreibung von Schwarzenburg als „wuster Acker neben der Rochischen Heyde am schwartzen Berge“",
      "Umbau der Dreiflügelanlage von Wasserschloss Beesdau durch Johann Gottlieb Koppe"
    ],
    "exp": "30. Oktober 1937: Umbenennung des Nachbarortes „Wendisch Drehna“ in „Walddrehna“. Der sorbische Name „Serbski Drjenow“ blieb in der niedersorbischen Ortsnamendatenbank erhalten."
  },
  {
    "id": 907,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Umbenennung des Nachbarortes „Wendisch Drehna“ in „Walddrehna““?",
    "a": [
      "30. Oktober 1937",
      "31. Dezember 2001",
      "1615",
      "1841"
    ],
    "exp": "Zeitpunkt: 30. Oktober 1937. Der sorbische Name „Serbski Drjenow“ blieb in der niedersorbischen Ortsnamendatenbank erhalten."
  },
  {
    "id": 908,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Umbenennung des Nachbarortes „Wendisch Drehna“ in „Walddrehna““ (30. Oktober 1937) für die Region Heideblick?",
    "a": [
      "Der sorbische Name „Serbski Drjenow“ blieb in der niedersorbischen Ortsnamendatenbank erhalten.",
      "Die Gemeinde Heideblick wuchs damit auf den Großteil ihrer heutigen Fläche an.",
      "Aus der Lage am „schwartzen Berge“ entwickelte sich im Laufe der Zeit der Ortsname Schwarzenburg.",
      "Schloss Beesdau mit seinem Park ist bis heute ein Wahrzeichen der Gemeinde Heideblick."
    ],
    "exp": "30. Oktober 1937 (Umbenennung des Nachbarortes „Wendisch Drehna“ in „Walddrehna“): Der sorbische Name „Serbski Drjenow“ blieb in der niedersorbischen Ortsnamendatenbank erhalten."
  },
  {
    "id": 909,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1952“?",
    "a": [
      "Verwaltungsreform in der DDR: Schwarzenburg wechselt vom Kreis Schweinitz in den Kreis Luckau (Bezirk Cottbus)",
      "Eingliederung von Walddrehna (mit Schwarzenburg) in die nun amtsfreie Gemeinde Heideblick mit 14 Ortsteilen",
      "Einbau der Patronatsloge (1675) und des barocken Kanzelaltar-Aufsatzes (1684) in der Dorfkirche Pitschen",
      "Erbauung der historischen Bockwindmühle im Heideblicker Ortsteil Falkenberg"
    ],
    "exp": "1952: Verwaltungsreform in der DDR: Schwarzenburg wechselt vom Kreis Schweinitz in den Kreis Luckau (Bezirk Cottbus). Damit rückte Schwarzenburg verwaltungsmäßig näher an Walddrehna, Langengrassau und Luckau heran."
  },
  {
    "id": 910,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Verwaltungsreform in der DDR: Schwarzenburg wechselt vom Kreis Schweinitz in den Kreis Luckau (Bezirk Cottbus)“?",
    "a": [
      "1952",
      "26. Oktober 2003",
      "1675 / 1684",
      "1853"
    ],
    "exp": "Zeitpunkt: 1952. Damit rückte Schwarzenburg verwaltungsmäßig näher an Walddrehna, Langengrassau und Luckau heran."
  },
  {
    "id": 911,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Verwaltungsreform in der DDR: Schwarzenburg wechselt vom Kreis Schweinitz in den Kreis Luckau (Bezirk Cottbus)“ (1952) für die Region Heideblick?",
    "a": [
      "Damit rückte Schwarzenburg verwaltungsmäßig näher an Walddrehna, Langengrassau und Luckau heran.",
      "Kurz darauf, am 2. Dezember 2003, erhielt Heideblick sein offizielles Gemeindewappen mit Kornähren und Lindenblättern.",
      "Wertvolle Zeugnisse ländlicher Kirchenkunst nach dem Dreißigjährigen Krieg.",
      "Die hölzerne Bockwindmühle von 1853 steht unter Denkmalschutz."
    ],
    "exp": "1952 (Verwaltungsreform in der DDR: Schwarzenburg wechselt vom Kreis Schweinitz in den Kreis Luckau (Bezirk Cottbus)): Damit rückte Schwarzenburg verwaltungsmäßig näher an Walddrehna, Langengrassau und Luckau heran."
  },
  {
    "id": 912,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „14. April 1966“?",
    "a": [
      "Zusammenschluss der beiden Nachbardörfer Pitschen und Pickel zur Gemeinde Pitschen-Pickel",
      "Bürgerbefragung in Heideblick entscheidet sich klar für die Eigenständigkeit der Gemeinde statt eines Beitritts zu Luckau",
      "Nennung des Ortes in Urkunden als „Vorwerk Schwartzburg“ (1730) und „Schwarzenburg“ (1733)",
      "Neubau des Schwarzenburger Schulhauses mit Einklassenraum, Betsaal und Lehrerwohnung an alter Stelle"
    ],
    "exp": "14. April 1966: Zusammenschluss der beiden Nachbardörfer Pitschen und Pickel zur Gemeinde Pitschen-Pickel. Pitschen bildet den nördlichen, Pickel den südlichen Dorfteil."
  },
  {
    "id": 913,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Zusammenschluss der beiden Nachbardörfer Pitschen und Pickel zur Gemeinde Pitschen-Pickel“?",
    "a": [
      "14. April 1966",
      "November 2011",
      "1730 / 1733",
      "1909"
    ],
    "exp": "Zeitpunkt: 14. April 1966. Pitschen bildet den nördlichen, Pickel den südlichen Dorfteil."
  },
  {
    "id": 914,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Zusammenschluss der beiden Nachbardörfer Pitschen und Pickel zur Gemeinde Pitschen-Pickel“ (14. April 1966) für die Region Heideblick?",
    "a": [
      "Pitschen bildet den nördlichen, Pickel den südlichen Dorfteil.",
      "Heideblick blieb damit eine eigenständige, bürgernahe Landgemeinde im Landkreis Dahme-Spreewald.",
      "Das kursächsische Vorwerk unterstand dem Amt Schlieben und betrieb Schafzucht.",
      "Dieses 1909 erbaute Denkmal beherbergt heute das berühmte Schulmuseum Schwarzenburg."
    ],
    "exp": "14. April 1966 (Zusammenschluss der beiden Nachbardörfer Pitschen und Pickel zur Gemeinde Pitschen-Pickel): Pitschen bildet den nördlichen, Pickel den südlichen Dorfteil."
  },
  {
    "id": 915,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1972“?",
    "a": [
      "Schließung der Einraumschule Schwarzenburg nach 63 Jahren Unterricht und Beginn der Museumsinitiative durch Lehrer Helmuth Österitz",
      "Erste urkundliche Erwähnung des heutigen Heideblicker Ortsteils Falkenberg (Sokolnica)",
      "Geburt des berühmten Agrarreformers Johann Gottlieb Koppe im Heideblicker Ortsteil Beesdau",
      "Heimatkundliche Erhebung im Kreis Schweinitz verzeichnet für Schwarzenburg rund 166 Einwohner"
    ],
    "exp": "1972: Schließung der Einraumschule Schwarzenburg nach 63 Jahren Unterricht und Beginn der Museumsinitiative durch Lehrer Helmuth Österitz. Dank Helmuth Österitz blieb das Klassenzimmer mit historischen Schulbänken, Schiefertafeln und Lehrmitteln erhalten."
  },
  {
    "id": 916,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Schließung der Einraumschule Schwarzenburg nach 63 Jahren Unterricht und Beginn der Museumsinitiative durch Lehrer Helmuth Österitz“?",
    "a": [
      "1972",
      "1207",
      "1782",
      "1912"
    ],
    "exp": "Zeitpunkt: 1972. Dank Helmuth Österitz blieb das Klassenzimmer mit historischen Schulbänken, Schiefertafeln und Lehrmitteln erhalten."
  },
  {
    "id": 917,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Schließung der Einraumschule Schwarzenburg nach 63 Jahren Unterricht und Beginn der Museumsinitiative durch Lehrer Helmuth Österitz“ (1972) für die Region Heideblick?",
    "a": [
      "Dank Helmuth Österitz blieb das Klassenzimmer mit historischen Schulbänken, Schiefertafeln und Lehrmitteln erhalten.",
      "Falkenberg zählt damit zu den ältesten urkundlich erwähnten Orten der Mark Brandenburg.",
      "Koppe reformierte die Fruchtfolge und den Zuckerrübenanbau in Preußen und erwarb später das Rittergut Beesdau.",
      "Damals herrschte durch Forst- und Landwirtschaft reger Betrieb im Walddorf."
    ],
    "exp": "1972 (Schließung der Einraumschule Schwarzenburg nach 63 Jahren Unterricht und Beginn der Museumsinitiative durch Lehrer Helmuth Österitz): Dank Helmuth Österitz blieb das Klassenzimmer mit historischen Schulbänken, Schiefertafeln und Lehrmitteln erhalten."
  },
  {
    "id": 918,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1. Januar 1974“?",
    "a": [
      "Eingemeindung von Schwarzenburg und Wehnsdorf in die Nachbargemeinde Walddrehna",
      "Bau der Feldsteinkirche in Walddrehna mit ihrer späteren dreiseitig offenen Backstein-Vorhalle",
      "Übergang der Region nach dem Wiener Kongress von Sachsen an Preußen; Zuordnung Schwarzenburgs zum Kreis Schweinitz",
      "Umbenennung des Nachbarortes „Wendisch Drehna“ in „Walddrehna“"
    ],
    "exp": "1. Januar 1974: Eingemeindung von Schwarzenburg und Wehnsdorf in die Nachbargemeinde Walddrehna. Knapp drei Jahrzehnte später wurde Walddrehna mitsamt Schwarzenburg Teil der Gemeinde Heideblick."
  },
  {
    "id": 919,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Eingemeindung von Schwarzenburg und Wehnsdorf in die Nachbargemeinde Walddrehna“?",
    "a": [
      "1. Januar 1974",
      "13. Jahrhundert",
      "1815 / 1816",
      "30. Oktober 1937"
    ],
    "exp": "Zeitpunkt: 1. Januar 1974. Knapp drei Jahrzehnte später wurde Walddrehna mitsamt Schwarzenburg Teil der Gemeinde Heideblick."
  },
  {
    "id": 920,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Eingemeindung von Schwarzenburg und Wehnsdorf in die Nachbargemeinde Walddrehna“ (1. Januar 1974) für die Region Heideblick?",
    "a": [
      "Knapp drei Jahrzehnte später wurde Walddrehna mitsamt Schwarzenburg Teil der Gemeinde Heideblick.",
      "Die Kirche in Walddrehna ist eines der bedeutendsten mittelalterlichen Baudenkmale der Gemeinde Heideblick.",
      "Von 1816 bis 1952 gehörte Schwarzenburg zum preußischen Landkreis Schweinitz in der Provinz Sachsen.",
      "Der sorbische Name „Serbski Drjenow“ blieb in der niedersorbischen Ortsnamendatenbank erhalten."
    ],
    "exp": "1. Januar 1974 (Eingemeindung von Schwarzenburg und Wehnsdorf in die Nachbargemeinde Walddrehna): Knapp drei Jahrzehnte später wurde Walddrehna mitsamt Schwarzenburg Teil der Gemeinde Heideblick."
  },
  {
    "id": 921,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „28. August 1992“?",
    "a": [
      "Bildung des Amtes Heideblick aus elf Gemeinden mit Verwaltungssitz in Langengrassau",
      "Errichtung der spätmittelalterlichen Feldsteinkirchen in Pitschen und im Nachbarort Wehnsdorf",
      "Urkundliche Nennung von „Schwarzenburg, Schwarzenberg oder die schwarze Schäferei“",
      "Verwaltungsreform in der DDR: Schwarzenburg wechselt vom Kreis Schweinitz in den Kreis Luckau (Bezirk Cottbus)"
    ],
    "exp": "28. August 1992: Bildung des Amtes Heideblick aus elf Gemeinden mit Verwaltungssitz in Langengrassau. Der Name „Heideblick“ beschreibt den weiten Blick vom Niederlausitzer Landrücken über Heide und Flur."
  },
  {
    "id": 922,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Bildung des Amtes Heideblick aus elf Gemeinden mit Verwaltungssitz in Langengrassau“?",
    "a": [
      "28. August 1992",
      "15. Jahrhundert",
      "1823",
      "1952"
    ],
    "exp": "Zeitpunkt: 28. August 1992. Der Name „Heideblick“ beschreibt den weiten Blick vom Niederlausitzer Landrücken über Heide und Flur."
  },
  {
    "id": 923,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Bildung des Amtes Heideblick aus elf Gemeinden mit Verwaltungssitz in Langengrassau“ (28. August 1992) für die Region Heideblick?",
    "a": [
      "Der Name „Heideblick“ beschreibt den weiten Blick vom Niederlausitzer Landrücken über Heide und Flur.",
      "Beide Kirchen wurden aus eiszeitlichen Findlingen der Niederlausitzer Endmoräne gemauert.",
      "Alle drei historischen Namensformen wurden im frühen 19. Jahrhundert noch parallel verwendet.",
      "Damit rückte Schwarzenburg verwaltungsmäßig näher an Walddrehna, Langengrassau und Luckau heran."
    ],
    "exp": "28. August 1992 (Bildung des Amtes Heideblick aus elf Gemeinden mit Verwaltungssitz in Langengrassau): Der Name „Heideblick“ beschreibt den weiten Blick vom Niederlausitzer Landrücken über Heide und Flur."
  },
  {
    "id": 924,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „1997“?",
    "a": [
      "Gründung des Naturparks Niederlausitzer Landrücken (ca. 580 km²) und Zusammenschluss der ersten vier Gemeinden zu Heideblick",
      "Erwähnung von Schwarzenburg als wüste „schwarze Schäfferey“ in alten kursächsischen Aufzeichnungen",
      "König Friedrich Wilhelm III. stiftet Schwarzenburg eine eigene Schule mit Gebetsraum in einer alten Blechlöffelfabrik",
      "Zusammenschluss der beiden Nachbardörfer Pitschen und Pickel zur Gemeinde Pitschen-Pickel"
    ],
    "exp": "1997: Gründung des Naturparks Niederlausitzer Landrücken (ca. 580 km²) und Zusammenschluss der ersten vier Gemeinden zu Heideblick. Gehren, Langengrassau, Waltersdorf und Wüstermarke bildeten am 31.12.1997 die erste Gemeinde Heideblick."
  },
  {
    "id": 925,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Gründung des Naturparks Niederlausitzer Landrücken (ca. 580 km²) und Zusammenschluss der ersten vier Gemeinden zu Heideblick“?",
    "a": [
      "1997",
      "1554",
      "1830",
      "14. April 1966"
    ],
    "exp": "Zeitpunkt: 1997. Gehren, Langengrassau, Waltersdorf und Wüstermarke bildeten am 31.12.1997 die erste Gemeinde Heideblick."
  },
  {
    "id": 926,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Gründung des Naturparks Niederlausitzer Landrücken (ca. 580 km²) und Zusammenschluss der ersten vier Gemeinden zu Heideblick“ (1997) für die Region Heideblick?",
    "a": [
      "Gehren, Langengrassau, Waltersdorf und Wüstermarke bildeten am 31.12.1997 die erste Gemeinde Heideblick.",
      "Der älteste schriftliche Hinweis auf die Schäferei-Tradition von Schwarzenburg.",
      "Damit mussten die Kinder aus Schwarzenburg nicht mehr kilometerweit durch den Wald in Nachbardörfer laufen.",
      "Pitschen bildet den nördlichen, Pickel den südlichen Dorfteil."
    ],
    "exp": "1997 (Gründung des Naturparks Niederlausitzer Landrücken (ca. 580 km²) und Zusammenschluss der ersten vier Gemeinden zu Heideblick): Gehren, Langengrassau, Waltersdorf und Wüstermarke bildeten am 31.12.1997 die erste Gemeinde Heideblick."
  },
  {
    "id": 927,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „31. Dezember 2001“?",
    "a": [
      "Zusammenschluss von Beesdau, Berstequell (Bornsdorf/Weißack), Falkenberg, Goßmar, Heideblick und Pitschen-Pickel",
      "Urkundliche Beschreibung von Schwarzenburg als „wuster Acker neben der Rochischen Heyde am schwartzen Berge“",
      "Umbau der Dreiflügelanlage von Wasserschloss Beesdau durch Johann Gottlieb Koppe",
      "Schließung der Einraumschule Schwarzenburg nach 63 Jahren Unterricht und Beginn der Museumsinitiative durch Lehrer Helmuth Österitz"
    ],
    "exp": "31. Dezember 2001: Zusammenschluss von Beesdau, Berstequell (Bornsdorf/Weißack), Falkenberg, Goßmar, Heideblick und Pitschen-Pickel. Die Gemeinde Heideblick wuchs damit auf den Großteil ihrer heutigen Fläche an."
  },
  {
    "id": 928,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Zusammenschluss von Beesdau, Berstequell (Bornsdorf/Weißack), Falkenberg, Goßmar, Heideblick und Pitschen-Pickel“?",
    "a": [
      "31. Dezember 2001",
      "1615",
      "1841",
      "1972"
    ],
    "exp": "Zeitpunkt: 31. Dezember 2001. Die Gemeinde Heideblick wuchs damit auf den Großteil ihrer heutigen Fläche an."
  },
  {
    "id": 929,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Zusammenschluss von Beesdau, Berstequell (Bornsdorf/Weißack), Falkenberg, Goßmar, Heideblick und Pitschen-Pickel“ (31. Dezember 2001) für die Region Heideblick?",
    "a": [
      "Die Gemeinde Heideblick wuchs damit auf den Großteil ihrer heutigen Fläche an.",
      "Aus der Lage am „schwartzen Berge“ entwickelte sich im Laufe der Zeit der Ortsname Schwarzenburg.",
      "Schloss Beesdau mit seinem Park ist bis heute ein Wahrzeichen der Gemeinde Heideblick.",
      "Dank Helmuth Österitz blieb das Klassenzimmer mit historischen Schulbänken, Schiefertafeln und Lehrmitteln erhalten."
    ],
    "exp": "31. Dezember 2001 (Zusammenschluss von Beesdau, Berstequell (Bornsdorf/Weißack), Falkenberg, Goßmar, Heideblick und Pitschen-Pickel): Die Gemeinde Heideblick wuchs damit auf den Großteil ihrer heutigen Fläche an."
  },
  {
    "id": 930,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „26. Oktober 2003“?",
    "a": [
      "Eingliederung von Walddrehna (mit Schwarzenburg) in die nun amtsfreie Gemeinde Heideblick mit 14 Ortsteilen",
      "Einbau der Patronatsloge (1675) und des barocken Kanzelaltar-Aufsatzes (1684) in der Dorfkirche Pitschen",
      "Erbauung der historischen Bockwindmühle im Heideblicker Ortsteil Falkenberg",
      "Eingemeindung von Schwarzenburg und Wehnsdorf in die Nachbargemeinde Walddrehna"
    ],
    "exp": "26. Oktober 2003: Eingliederung von Walddrehna (mit Schwarzenburg) in die nun amtsfreie Gemeinde Heideblick mit 14 Ortsteilen. Kurz darauf, am 2. Dezember 2003, erhielt Heideblick sein offizielles Gemeindewappen mit Kornähren und Lindenblättern."
  },
  {
    "id": 931,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Eingliederung von Walddrehna (mit Schwarzenburg) in die nun amtsfreie Gemeinde Heideblick mit 14 Ortsteilen“?",
    "a": [
      "26. Oktober 2003",
      "1675 / 1684",
      "1853",
      "1. Januar 1974"
    ],
    "exp": "Zeitpunkt: 26. Oktober 2003. Kurz darauf, am 2. Dezember 2003, erhielt Heideblick sein offizielles Gemeindewappen mit Kornähren und Lindenblättern."
  },
  {
    "id": 932,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Eingliederung von Walddrehna (mit Schwarzenburg) in die nun amtsfreie Gemeinde Heideblick mit 14 Ortsteilen“ (26. Oktober 2003) für die Region Heideblick?",
    "a": [
      "Kurz darauf, am 2. Dezember 2003, erhielt Heideblick sein offizielles Gemeindewappen mit Kornähren und Lindenblättern.",
      "Wertvolle Zeugnisse ländlicher Kirchenkunst nach dem Dreißigjährigen Krieg.",
      "Die hölzerne Bockwindmühle von 1853 steht unter Denkmalschutz.",
      "Knapp drei Jahrzehnte später wurde Walddrehna mitsamt Schwarzenburg Teil der Gemeinde Heideblick."
    ],
    "exp": "26. Oktober 2003 (Eingliederung von Walddrehna (mit Schwarzenburg) in die nun amtsfreie Gemeinde Heideblick mit 14 Ortsteilen): Kurz darauf, am 2. Dezember 2003, erhielt Heideblick sein offizielles Gemeindewappen mit Kornähren und Lindenblättern."
  },
  {
    "id": 933,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welches historische Ereignis in Schwarzenburg bzw. der Gemeinde Heideblick datiert auf die Zeit „November 2011“?",
    "a": [
      "Bürgerbefragung in Heideblick entscheidet sich klar für die Eigenständigkeit der Gemeinde statt eines Beitritts zu Luckau",
      "Nennung des Ortes in Urkunden als „Vorwerk Schwartzburg“ (1730) und „Schwarzenburg“ (1733)",
      "Neubau des Schwarzenburger Schulhauses mit Einklassenraum, Betsaal und Lehrerwohnung an alter Stelle",
      "Bildung des Amtes Heideblick aus elf Gemeinden mit Verwaltungssitz in Langengrassau"
    ],
    "exp": "November 2011: Bürgerbefragung in Heideblick entscheidet sich klar für die Eigenständigkeit der Gemeinde statt eines Beitritts zu Luckau. Heideblick blieb damit eine eigenständige, bürgernahe Landgemeinde im Landkreis Dahme-Spreewald."
  },
  {
    "id": 934,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Wann fand in der Geschichte von Schwarzenburg und Heideblick folgendes Ereignis statt: „Bürgerbefragung in Heideblick entscheidet sich klar für die Eigenständigkeit der Gemeinde statt eines Beitritts zu Luckau“?",
    "a": [
      "November 2011",
      "1730 / 1733",
      "1909",
      "28. August 1992"
    ],
    "exp": "Zeitpunkt: November 2011. Heideblick blieb damit eine eigenständige, bürgernahe Landgemeinde im Landkreis Dahme-Spreewald."
  },
  {
    "id": 935,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche historische Bedeutung hat das Ereignis „Bürgerbefragung in Heideblick entscheidet sich klar für die Eigenständigkeit der Gemeinde statt eines Beitritts zu Luckau“ (November 2011) für die Region Heideblick?",
    "a": [
      "Heideblick blieb damit eine eigenständige, bürgernahe Landgemeinde im Landkreis Dahme-Spreewald.",
      "Das kursächsische Vorwerk unterstand dem Amt Schlieben und betrieb Schafzucht.",
      "Dieses 1909 erbaute Denkmal beherbergt heute das berühmte Schulmuseum Schwarzenburg.",
      "Der Name „Heideblick“ beschreibt den weiten Blick vom Niederlausitzer Landrücken über Heide und Flur."
    ],
    "exp": "November 2011 (Bürgerbefragung in Heideblick entscheidet sich klar für die Eigenständigkeit der Gemeinde statt eines Beitritts zu Luckau): Heideblick blieb damit eine eigenständige, bürgernahe Landgemeinde im Landkreis Dahme-Spreewald."
  },
  {
    "id": 936,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche Kombination aus historischer Prägung und Sehenswürdigkeit gehört zum Heideblicker Ort/Gebiet „Schwarzenburg“?",
    "a": [
      "1554 (wüste schwarze Schäfferey) / 1615 (am schwartzen Berge) · Schulmuseum von 1909 (Einraumschule, Betsaal & Lehrerwohnung), Gasthaus „Zum Wilden Eber“ und weite Kiefernwälder",
      "Mittelalterliches Angerdorf am Rand des Luckauer Beckens · Sitz der Gemeindeverwaltung Heideblick (Luckauer Str. 61), Dorfkirche und Storchenhorste",
      "Erste urkundliche Erwähnung bereits 1207 · Historische Bockwindmühle aus dem Jahr 1853 und alte Feldsteinbauten",
      "Mit den Gemeindeteilen Grünswalde und Trebbinchen · Gutsanlage, Teichlandschaft und Nähe zum Naturschutzgebiet Borcheltsbusch"
    ],
    "exp": "Schwarzenburg: 1554 (wüste schwarze Schäfferey) / 1615 (am schwartzen Berge) – Schulmuseum von 1909 (Einraumschule, Betsaal & Lehrerwohnung), Gasthaus „Zum Wilden Eber“ und weite Kiefernwälder."
  },
  {
    "id": 937,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche Kombination aus historischer Prägung und Sehenswürdigkeit gehört zum Heideblicker Ort/Gebiet „Walddrehna (Serbski Drjenow)“?",
    "a": [
      "13. Jahrhundert (bis 1937 Wendisch Drehna) · Feldsteinkirche aus dem 13. Jh. mit offener Backstein-Vorhalle sowie Regionalbahnhof (RE 8 Berlin–Dresden)",
      "Mittelalterliche Gründung am Niederlausitzer Landrücken · Freilichtmuseum Höllberghof (nördlich des Ortes) mit Bauernhof um 1800 und Feldsteinkirche",
      "Am steilen Nordhang des Niederlausitzer Landrückens gelegen · Quellgebiet, Bergschänke und malerische Hanglage mit weitem Blick ins Luckauer Becken",
      "Mit den historischen Wohnplätzen Papiermühle und Pechhütte · Quellgebiete, historische Pechhütte (Kiefernharzgewinnung) und FFH-Kalkgruben/Niederungen"
    ],
    "exp": "Walddrehna (Serbski Drjenow): 13. Jahrhundert (bis 1937 Wendisch Drehna) – Feldsteinkirche aus dem 13. Jh. mit offener Backstein-Vorhalle sowie Regionalbahnhof (RE 8 Berlin–Dresden)."
  },
  {
    "id": 938,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche Kombination aus historischer Prägung und Sehenswürdigkeit gehört zum Heideblicker Ort/Gebiet „Langengrassau“?",
    "a": [
      "Mittelalterliches Angerdorf am Rand des Luckauer Beckens · Sitz der Gemeindeverwaltung Heideblick (Luckauer Str. 61), Dorfkirche und Storchenhorste",
      "Mittelalterliches Rittergut · Dreiflügeliges Wasserschloss Beesdau aus dem 14.–16. Jahrhundert, 1841 umgebaut von Agrarreformer Johann Gottlieb Koppe",
      "Längliches Dorf an der Berste mit den Gemeindeteilen Neumühle und Sorge · Mittelalterliches Sühnekreuz aus Sandstein am südlichen Ortsrand (Weggabelung Gehren-Bahnhof) und historische Wassermühlen",
      "1966 Zusammenschluss aus dem nördlichen Pitschen und dem südlichen Pickel · Feldsteinkirche Pitschen aus dem 15. Jahrhundert mit Patronatsloge von 1675 und Kanzelaltar von 1684"
    ],
    "exp": "Langengrassau: Mittelalterliches Angerdorf am Rand des Luckauer Beckens – Sitz der Gemeindeverwaltung Heideblick (Luckauer Str. 61), Dorfkirche und Storchenhorste."
  },
  {
    "id": 939,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche Kombination aus historischer Prägung und Sehenswürdigkeit gehört zum Heideblicker Ort/Gebiet „Wüstermarke“?",
    "a": [
      "Mittelalterliche Gründung am Niederlausitzer Landrücken · Freilichtmuseum Höllberghof (nördlich des Ortes) mit Bauernhof um 1800 und Feldsteinkirche",
      "Erste urkundliche Erwähnung bereits 1207 · Historische Bockwindmühle aus dem Jahr 1853 und alte Feldsteinbauten",
      "Mit den Gemeindeteilen Grünswalde und Trebbinchen · Gutsanlage, Teichlandschaft und Nähe zum Naturschutzgebiet Borcheltsbusch",
      "Östliche Ortsteile nahe der Stadt Luckau und dem Schlabendorfer See · Mittelalterliche Feldsteinkirchen und direkter Übergang zur Bergbaufolgelandschaft"
    ],
    "exp": "Wüstermarke: Mittelalterliche Gründung am Niederlausitzer Landrücken – Freilichtmuseum Höllberghof (nördlich des Ortes) mit Bauernhof um 1800 und Feldsteinkirche."
  },
  {
    "id": 940,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche Kombination aus historischer Prägung und Sehenswürdigkeit gehört zum Heideblicker Ort/Gebiet „Beesdau (Bezdow)“?",
    "a": [
      "Mittelalterliches Rittergut · Dreiflügeliges Wasserschloss Beesdau aus dem 14.–16. Jahrhundert, 1841 umgebaut von Agrarreformer Johann Gottlieb Koppe",
      "Am steilen Nordhang des Niederlausitzer Landrückens gelegen · Quellgebiet, Bergschänke und malerische Hanglage mit weitem Blick ins Luckauer Becken",
      "Mit den historischen Wohnplätzen Papiermühle und Pechhütte · Quellgebiete, historische Pechhütte (Kiefernharzgewinnung) und FFH-Kalkgruben/Niederungen",
      "Ruhiges Walddorf direkt nordöstlich von Schwarzenburg · Feldsteinkirche aus dem 15. Jahrhundert mit Anbauten von 1675 und Altarretabel um 1725"
    ],
    "exp": "Beesdau (Bezdow): Mittelalterliches Rittergut – Dreiflügeliges Wasserschloss Beesdau aus dem 14.–16. Jahrhundert, 1841 umgebaut von Agrarreformer Johann Gottlieb Koppe."
  },
  {
    "id": 941,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche Kombination aus historischer Prägung und Sehenswürdigkeit gehört zum Heideblicker Ort/Gebiet „Falkenberg (Sokolnica)“?",
    "a": [
      "Erste urkundliche Erwähnung bereits 1207 · Historische Bockwindmühle aus dem Jahr 1853 und alte Feldsteinbauten",
      "Längliches Dorf an der Berste mit den Gemeindeteilen Neumühle und Sorge · Mittelalterliches Sühnekreuz aus Sandstein am südlichen Ortsrand (Weggabelung Gehren-Bahnhof) und historische Wassermühlen",
      "1966 Zusammenschluss aus dem nördlichen Pitschen und dem südlichen Pickel · Feldsteinkirche Pitschen aus dem 15. Jahrhundert mit Patronatsloge von 1675 und Kanzelaltar von 1684",
      "Niedermoor- und Seengebiet im Naturpark Niederlausitzer Landrücken · Heinz Sielmann Natur-Erlebniszentrum Wanninchen am Schlabendorfer See & Kranich-Schlafplatz Borcheltsbusch"
    ],
    "exp": "Falkenberg (Sokolnica): Erste urkundliche Erwähnung bereits 1207 – Historische Bockwindmühle aus dem Jahr 1853 und alte Feldsteinbauten."
  },
  {
    "id": 942,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche Kombination aus historischer Prägung und Sehenswürdigkeit gehört zum Heideblicker Ort/Gebiet „Gehren (Jarin)“?",
    "a": [
      "Am steilen Nordhang des Niederlausitzer Landrückens gelegen · Quellgebiet, Bergschänke und malerische Hanglage mit weitem Blick ins Luckauer Becken",
      "Mit den Gemeindeteilen Grünswalde und Trebbinchen · Gutsanlage, Teichlandschaft und Nähe zum Naturschutzgebiet Borcheltsbusch",
      "Östliche Ortsteile nahe der Stadt Luckau und dem Schlabendorfer See · Mittelalterliche Feldsteinkirchen und direkter Übergang zur Bergbaufolgelandschaft",
      "1554 (wüste schwarze Schäfferey) / 1615 (am schwartzen Berge) · Schulmuseum von 1909 (Einraumschule, Betsaal & Lehrerwohnung), Gasthaus „Zum Wilden Eber“ und weite Kiefernwälder"
    ],
    "exp": "Gehren (Jarin): Am steilen Nordhang des Niederlausitzer Landrückens gelegen – Quellgebiet, Bergschänke und malerische Hanglage mit weitem Blick ins Luckauer Becken."
  },
  {
    "id": 943,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche Kombination aus historischer Prägung und Sehenswürdigkeit gehört zum Heideblicker Ort/Gebiet „Waltersdorf (Wałtarjejce)“?",
    "a": [
      "Längliches Dorf an der Berste mit den Gemeindeteilen Neumühle und Sorge · Mittelalterliches Sühnekreuz aus Sandstein am südlichen Ortsrand (Weggabelung Gehren-Bahnhof) und historische Wassermühlen",
      "Mit den historischen Wohnplätzen Papiermühle und Pechhütte · Quellgebiete, historische Pechhütte (Kiefernharzgewinnung) und FFH-Kalkgruben/Niederungen",
      "Ruhiges Walddorf direkt nordöstlich von Schwarzenburg · Feldsteinkirche aus dem 15. Jahrhundert mit Anbauten von 1675 und Altarretabel um 1725",
      "13. Jahrhundert (bis 1937 Wendisch Drehna) · Feldsteinkirche aus dem 13. Jh. mit offener Backstein-Vorhalle sowie Regionalbahnhof (RE 8 Berlin–Dresden)"
    ],
    "exp": "Waltersdorf (Wałtarjejce): Längliches Dorf an der Berste mit den Gemeindeteilen Neumühle und Sorge – Mittelalterliches Sühnekreuz aus Sandstein am südlichen Ortsrand (Weggabelung Gehren-Bahnhof) und historische Wassermühlen."
  },
  {
    "id": 944,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche Kombination aus historischer Prägung und Sehenswürdigkeit gehört zum Heideblicker Ort/Gebiet „Bornsdorf (Baranojce)“?",
    "a": [
      "Mit den Gemeindeteilen Grünswalde und Trebbinchen · Gutsanlage, Teichlandschaft und Nähe zum Naturschutzgebiet Borcheltsbusch",
      "1966 Zusammenschluss aus dem nördlichen Pitschen und dem südlichen Pickel · Feldsteinkirche Pitschen aus dem 15. Jahrhundert mit Patronatsloge von 1675 und Kanzelaltar von 1684",
      "Niedermoor- und Seengebiet im Naturpark Niederlausitzer Landrücken · Heinz Sielmann Natur-Erlebniszentrum Wanninchen am Schlabendorfer See & Kranich-Schlafplatz Borcheltsbusch",
      "Mittelalterliches Angerdorf am Rand des Luckauer Beckens · Sitz der Gemeindeverwaltung Heideblick (Luckauer Str. 61), Dorfkirche und Storchenhorste"
    ],
    "exp": "Bornsdorf (Baranojce): Mit den Gemeindeteilen Grünswalde und Trebbinchen – Gutsanlage, Teichlandschaft und Nähe zum Naturschutzgebiet Borcheltsbusch."
  },
  {
    "id": 945,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche Kombination aus historischer Prägung und Sehenswürdigkeit gehört zum Heideblicker Ort/Gebiet „Weißack (Wusoka)“?",
    "a": [
      "Mit den historischen Wohnplätzen Papiermühle und Pechhütte · Quellgebiete, historische Pechhütte (Kiefernharzgewinnung) und FFH-Kalkgruben/Niederungen",
      "Östliche Ortsteile nahe der Stadt Luckau und dem Schlabendorfer See · Mittelalterliche Feldsteinkirchen und direkter Übergang zur Bergbaufolgelandschaft",
      "1554 (wüste schwarze Schäfferey) / 1615 (am schwartzen Berge) · Schulmuseum von 1909 (Einraumschule, Betsaal & Lehrerwohnung), Gasthaus „Zum Wilden Eber“ und weite Kiefernwälder",
      "Mittelalterliche Gründung am Niederlausitzer Landrücken · Freilichtmuseum Höllberghof (nördlich des Ortes) mit Bauernhof um 1800 und Feldsteinkirche"
    ],
    "exp": "Weißack (Wusoka): Mit den historischen Wohnplätzen Papiermühle und Pechhütte – Quellgebiete, historische Pechhütte (Kiefernharzgewinnung) und FFH-Kalkgruben/Niederungen."
  },
  {
    "id": 946,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche Kombination aus historischer Prägung und Sehenswürdigkeit gehört zum Heideblicker Ort/Gebiet „Pitschen-Pickel (Pěscyna-Pjakło)“?",
    "a": [
      "1966 Zusammenschluss aus dem nördlichen Pitschen und dem südlichen Pickel · Feldsteinkirche Pitschen aus dem 15. Jahrhundert mit Patronatsloge von 1675 und Kanzelaltar von 1684",
      "Ruhiges Walddorf direkt nordöstlich von Schwarzenburg · Feldsteinkirche aus dem 15. Jahrhundert mit Anbauten von 1675 und Altarretabel um 1725",
      "13. Jahrhundert (bis 1937 Wendisch Drehna) · Feldsteinkirche aus dem 13. Jh. mit offener Backstein-Vorhalle sowie Regionalbahnhof (RE 8 Berlin–Dresden)",
      "Mittelalterliches Rittergut · Dreiflügeliges Wasserschloss Beesdau aus dem 14.–16. Jahrhundert, 1841 umgebaut von Agrarreformer Johann Gottlieb Koppe"
    ],
    "exp": "Pitschen-Pickel (Pěscyna-Pjakło): 1966 Zusammenschluss aus dem nördlichen Pitschen und dem südlichen Pickel – Feldsteinkirche Pitschen aus dem 15. Jahrhundert mit Patronatsloge von 1675 und Kanzelaltar von 1684."
  },
  {
    "id": 947,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche Kombination aus historischer Prägung und Sehenswürdigkeit gehört zum Heideblicker Ort/Gebiet „Goßmar (Góšmar) & Riedebeck“?",
    "a": [
      "Östliche Ortsteile nahe der Stadt Luckau und dem Schlabendorfer See · Mittelalterliche Feldsteinkirchen und direkter Übergang zur Bergbaufolgelandschaft",
      "Niedermoor- und Seengebiet im Naturpark Niederlausitzer Landrücken · Heinz Sielmann Natur-Erlebniszentrum Wanninchen am Schlabendorfer See & Kranich-Schlafplatz Borcheltsbusch",
      "Mittelalterliches Angerdorf am Rand des Luckauer Beckens · Sitz der Gemeindeverwaltung Heideblick (Luckauer Str. 61), Dorfkirche und Storchenhorste",
      "Erste urkundliche Erwähnung bereits 1207 · Historische Bockwindmühle aus dem Jahr 1853 und alte Feldsteinbauten"
    ],
    "exp": "Goßmar (Góšmar) & Riedebeck: Östliche Ortsteile nahe der Stadt Luckau und dem Schlabendorfer See – Mittelalterliche Feldsteinkirchen und direkter Übergang zur Bergbaufolgelandschaft."
  },
  {
    "id": 948,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche Kombination aus historischer Prägung und Sehenswürdigkeit gehört zum Heideblicker Ort/Gebiet „Wehnsdorf (Wanojce)“?",
    "a": [
      "Ruhiges Walddorf direkt nordöstlich von Schwarzenburg · Feldsteinkirche aus dem 15. Jahrhundert mit Anbauten von 1675 und Altarretabel um 1725",
      "1554 (wüste schwarze Schäfferey) / 1615 (am schwartzen Berge) · Schulmuseum von 1909 (Einraumschule, Betsaal & Lehrerwohnung), Gasthaus „Zum Wilden Eber“ und weite Kiefernwälder",
      "Mittelalterliche Gründung am Niederlausitzer Landrücken · Freilichtmuseum Höllberghof (nördlich des Ortes) mit Bauernhof um 1800 und Feldsteinkirche",
      "Am steilen Nordhang des Niederlausitzer Landrückens gelegen · Quellgebiet, Bergschänke und malerische Hanglage mit weitem Blick ins Luckauer Becken"
    ],
    "exp": "Wehnsdorf (Wanojce): Ruhiges Walddorf direkt nordöstlich von Schwarzenburg – Feldsteinkirche aus dem 15. Jahrhundert mit Anbauten von 1675 und Altarretabel um 1725."
  },
  {
    "id": 949,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welche Kombination aus historischer Prägung und Sehenswürdigkeit gehört zum Heideblicker Ort/Gebiet „NSG Borcheltsbusch & Wanninchen“?",
    "a": [
      "Niedermoor- und Seengebiet im Naturpark Niederlausitzer Landrücken · Heinz Sielmann Natur-Erlebniszentrum Wanninchen am Schlabendorfer See & Kranich-Schlafplatz Borcheltsbusch",
      "13. Jahrhundert (bis 1937 Wendisch Drehna) · Feldsteinkirche aus dem 13. Jh. mit offener Backstein-Vorhalle sowie Regionalbahnhof (RE 8 Berlin–Dresden)",
      "Mittelalterliches Rittergut · Dreiflügeliges Wasserschloss Beesdau aus dem 14.–16. Jahrhundert, 1841 umgebaut von Agrarreformer Johann Gottlieb Koppe",
      "Längliches Dorf an der Berste mit den Gemeindeteilen Neumühle und Sorge · Mittelalterliches Sühnekreuz aus Sandstein am südlichen Ortsrand (Weggabelung Gehren-Bahnhof) und historische Wassermühlen"
    ],
    "exp": "NSG Borcheltsbusch & Wanninchen: Niedermoor- und Seengebiet im Naturpark Niederlausitzer Landrücken – Heinz Sielmann Natur-Erlebniszentrum Wanninchen am Schlabendorfer See & Kranich-Schlafplatz Borcheltsbusch."
  },
  {
    "id": 950,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Unter welcher Telefonvorwahl (Ortsnetz) ist der Bereich „Schwarzenburg“ in der Gemeinde Heideblick erreichbar bzw. welchem historischen Kontext entstammt er?",
    "a": [
      "Vorwahl 035455 · 1554 (wüste schwarze Schäfferey) / 1615 (am schwartzen Berge)",
      "Vorwahl 035454 · Mittelalterliche Gründung am Niederlausitzer Landrücken",
      "Vorwahl 035455 · Am steilen Nordhang des Niederlausitzer Landrückens gelegen",
      "Vorwahl 035455 · Mit den historischen Wohnplätzen Papiermühle und Pechhütte"
    ],
    "exp": "Schwarzenburg hat die Vorwahl 035455 (1554 (wüste schwarze Schäfferey) / 1615 (am schwartzen Berge))."
  },
  {
    "id": 951,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum lohnt sich bei einem Urlaub im Waldgarten Schwarzenburg ein Abstecher nach „Schwarzenburg“?",
    "a": [
      "Kleinster und waldreichster Rückzugsort der Gemeinde Heideblick mit rund 59 Einwohnern und herrlicher Hirschbrunft im Spätsommer.",
      "Zusammen mit Schwarzenburg und Langengrassau gehörte Wüstermarke von 1816 bis 1952 zum preußischen Landkreis Schweinitz.",
      "Gehren schloss sich am 31. Dezember 1997 mit Langengrassau, Waltersdorf und Wüstermarke zur neuen Gemeinde Heideblick zusammen.",
      "Der Ortsname des Gemeindeteils „Pechhütte“ erinnert an das alte Waldhandwerk der Pechsiederei aus harzreichem Kiefernholz."
    ],
    "exp": "Schwarzenburg: Kleinster und waldreichster Rückzugsort der Gemeinde Heideblick mit rund 59 Einwohnern und herrlicher Hirschbrunft im Spätsommer."
  },
  {
    "id": 952,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Unter welcher Telefonvorwahl (Ortsnetz) ist der Bereich „Walddrehna (Serbski Drjenow)“ in der Gemeinde Heideblick erreichbar bzw. welchem historischen Kontext entstammt er?",
    "a": [
      "Vorwahl 035455 · 13. Jahrhundert (bis 1937 Wendisch Drehna)",
      "Vorwahl 03544 · Mittelalterliches Rittergut",
      "Vorwahl 035455 · Längliches Dorf an der Berste mit den Gemeindeteilen Neumühle und Sorge",
      "Vorwahl 035454 · 1966 Zusammenschluss aus dem nördlichen Pitschen und dem südlichen Pickel"
    ],
    "exp": "Walddrehna (Serbski Drjenow) hat die Vorwahl 035455 (13. Jahrhundert (bis 1937 Wendisch Drehna))."
  },
  {
    "id": 953,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum lohnt sich bei einem Urlaub im Waldgarten Schwarzenburg ein Abstecher nach „Walddrehna (Serbski Drjenow)“?",
    "a": [
      "Am 1. Januar 1974 wurden Schwarzenburg und Wehnsdorf nach Walddrehna eingemeindet, bevor Walddrehna am 26. Oktober 2003 Teil von Heideblick wurde.",
      "Geburtsort des berühmten deutschen Landwirtschaftsreformers Johann Gottlieb Koppe (1782–1863).",
      "Hier entspringt und fließt die Berste, an der früher zahlreiche Wassermühlen wie Neumühle, Poltermühle und Untermühle klapperten.",
      "Bekannt durch seinen außergewöhnlichen Doppelnamen, dem schon der RBB-„Landschleicher“ ein Denkmal setzte."
    ],
    "exp": "Walddrehna (Serbski Drjenow): Am 1. Januar 1974 wurden Schwarzenburg und Wehnsdorf nach Walddrehna eingemeindet, bevor Walddrehna am 26. Oktober 2003 Teil von Heideblick wurde."
  },
  {
    "id": 954,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Unter welcher Telefonvorwahl (Ortsnetz) ist der Bereich „Langengrassau“ in der Gemeinde Heideblick erreichbar bzw. welchem historischen Kontext entstammt er?",
    "a": [
      "Vorwahl 035454 · Mittelalterliches Angerdorf am Rand des Luckauer Beckens",
      "Vorwahl 035454 · Erste urkundliche Erwähnung bereits 1207",
      "Vorwahl 035455 · Mit den Gemeindeteilen Grünswalde und Trebbinchen",
      "Vorwahl 03544 / 035455 · Östliche Ortsteile nahe der Stadt Luckau und dem Schlabendorfer See"
    ],
    "exp": "Langengrassau hat die Vorwahl 035454 (Mittelalterliches Angerdorf am Rand des Luckauer Beckens)."
  },
  {
    "id": 955,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum lohnt sich bei einem Urlaub im Waldgarten Schwarzenburg ein Abstecher nach „Langengrassau“?",
    "a": [
      "Im Jahr 1992 wurde Langengrassau Sitz des neu gebildeten Amtes Heideblick und ist heute Verwaltungszentrum der amtsfreien Gemeinde.",
      "Zählt mit der Urkunde von 1207 zu den ältesten urkundlich belegten Siedlungen in der gesamten Mark Brandenburg.",
      "Schloss sich Ende 1997 zunächst mit Weißack zur Gemeinde „Berstequell“ zusammen, bevor diese Ende 2001 Teil von Heideblick wurde.",
      "Riedebeck wurde 1974 nach Goßmar eingemeindet; Ende 2001 kam Goßmar zur Gemeinde Heideblick."
    ],
    "exp": "Langengrassau: Im Jahr 1992 wurde Langengrassau Sitz des neu gebildeten Amtes Heideblick und ist heute Verwaltungszentrum der amtsfreien Gemeinde."
  },
  {
    "id": 956,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Unter welcher Telefonvorwahl (Ortsnetz) ist der Bereich „Wüstermarke“ in der Gemeinde Heideblick erreichbar bzw. welchem historischen Kontext entstammt er?",
    "a": [
      "Vorwahl 035454 · Mittelalterliche Gründung am Niederlausitzer Landrücken",
      "Vorwahl 035455 · Am steilen Nordhang des Niederlausitzer Landrückens gelegen",
      "Vorwahl 035455 · Mit den historischen Wohnplätzen Papiermühle und Pechhütte",
      "Vorwahl 035455 · Ruhiges Walddorf direkt nordöstlich von Schwarzenburg"
    ],
    "exp": "Wüstermarke hat die Vorwahl 035454 (Mittelalterliche Gründung am Niederlausitzer Landrücken)."
  },
  {
    "id": 957,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum lohnt sich bei einem Urlaub im Waldgarten Schwarzenburg ein Abstecher nach „Wüstermarke“?",
    "a": [
      "Zusammen mit Schwarzenburg und Langengrassau gehörte Wüstermarke von 1816 bis 1952 zum preußischen Landkreis Schweinitz.",
      "Gehren schloss sich am 31. Dezember 1997 mit Langengrassau, Waltersdorf und Wüstermarke zur neuen Gemeinde Heideblick zusammen.",
      "Der Ortsname des Gemeindeteils „Pechhütte“ erinnert an das alte Waldhandwerk der Pechsiederei aus harzreichem Kiefernholz.",
      "Liegt wie Schwarzenburg eingebettet in die Wälder und Heiden des Niederlausitzer Landrückens."
    ],
    "exp": "Wüstermarke: Zusammen mit Schwarzenburg und Langengrassau gehörte Wüstermarke von 1816 bis 1952 zum preußischen Landkreis Schweinitz."
  },
  {
    "id": 958,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Unter welcher Telefonvorwahl (Ortsnetz) ist der Bereich „Beesdau (Bezdow)“ in der Gemeinde Heideblick erreichbar bzw. welchem historischen Kontext entstammt er?",
    "a": [
      "Vorwahl 03544 · Mittelalterliches Rittergut",
      "Vorwahl 035455 · Längliches Dorf an der Berste mit den Gemeindeteilen Neumühle und Sorge",
      "Vorwahl 035454 · 1966 Zusammenschluss aus dem nördlichen Pitschen und dem südlichen Pickel",
      "Vorwahl 035455 · Niedermoor- und Seengebiet im Naturpark Niederlausitzer Landrücken"
    ],
    "exp": "Beesdau (Bezdow) hat die Vorwahl 03544 (Mittelalterliches Rittergut)."
  },
  {
    "id": 959,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum lohnt sich bei einem Urlaub im Waldgarten Schwarzenburg ein Abstecher nach „Beesdau (Bezdow)“?",
    "a": [
      "Geburtsort des berühmten deutschen Landwirtschaftsreformers Johann Gottlieb Koppe (1782–1863).",
      "Hier entspringt und fließt die Berste, an der früher zahlreiche Wassermühlen wie Neumühle, Poltermühle und Untermühle klapperten.",
      "Bekannt durch seinen außergewöhnlichen Doppelnamen, dem schon der RBB-„Landschleicher“ ein Denkmal setzte.",
      "Jeden Herbst versammeln sich hier zehntausende Kraniche und Wildgänse – eines der größten Naturschauspiele Ostdeutschlands."
    ],
    "exp": "Beesdau (Bezdow): Geburtsort des berühmten deutschen Landwirtschaftsreformers Johann Gottlieb Koppe (1782–1863)."
  },
  {
    "id": 960,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Unter welcher Telefonvorwahl (Ortsnetz) ist der Bereich „Falkenberg (Sokolnica)“ in der Gemeinde Heideblick erreichbar bzw. welchem historischen Kontext entstammt er?",
    "a": [
      "Vorwahl 035454 · Erste urkundliche Erwähnung bereits 1207",
      "Vorwahl 035455 · Mit den Gemeindeteilen Grünswalde und Trebbinchen",
      "Vorwahl 03544 / 035455 · Östliche Ortsteile nahe der Stadt Luckau und dem Schlabendorfer See",
      "Vorwahl 035455 · 1554 (wüste schwarze Schäfferey) / 1615 (am schwartzen Berge)"
    ],
    "exp": "Falkenberg (Sokolnica) hat die Vorwahl 035454 (Erste urkundliche Erwähnung bereits 1207)."
  },
  {
    "id": 961,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum lohnt sich bei einem Urlaub im Waldgarten Schwarzenburg ein Abstecher nach „Falkenberg (Sokolnica)“?",
    "a": [
      "Zählt mit der Urkunde von 1207 zu den ältesten urkundlich belegten Siedlungen in der gesamten Mark Brandenburg.",
      "Schloss sich Ende 1997 zunächst mit Weißack zur Gemeinde „Berstequell“ zusammen, bevor diese Ende 2001 Teil von Heideblick wurde.",
      "Riedebeck wurde 1974 nach Goßmar eingemeindet; Ende 2001 kam Goßmar zur Gemeinde Heideblick.",
      "Kleinster und waldreichster Rückzugsort der Gemeinde Heideblick mit rund 59 Einwohnern und herrlicher Hirschbrunft im Spätsommer."
    ],
    "exp": "Falkenberg (Sokolnica): Zählt mit der Urkunde von 1207 zu den ältesten urkundlich belegten Siedlungen in der gesamten Mark Brandenburg."
  },
  {
    "id": 962,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Unter welcher Telefonvorwahl (Ortsnetz) ist der Bereich „Gehren (Jarin)“ in der Gemeinde Heideblick erreichbar bzw. welchem historischen Kontext entstammt er?",
    "a": [
      "Vorwahl 035455 · Am steilen Nordhang des Niederlausitzer Landrückens gelegen",
      "Vorwahl 035455 · Mit den historischen Wohnplätzen Papiermühle und Pechhütte",
      "Vorwahl 035455 · Ruhiges Walddorf direkt nordöstlich von Schwarzenburg",
      "Vorwahl 035455 · 13. Jahrhundert (bis 1937 Wendisch Drehna)"
    ],
    "exp": "Gehren (Jarin) hat die Vorwahl 035455 (Am steilen Nordhang des Niederlausitzer Landrückens gelegen)."
  },
  {
    "id": 963,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum lohnt sich bei einem Urlaub im Waldgarten Schwarzenburg ein Abstecher nach „Gehren (Jarin)“?",
    "a": [
      "Gehren schloss sich am 31. Dezember 1997 mit Langengrassau, Waltersdorf und Wüstermarke zur neuen Gemeinde Heideblick zusammen.",
      "Der Ortsname des Gemeindeteils „Pechhütte“ erinnert an das alte Waldhandwerk der Pechsiederei aus harzreichem Kiefernholz.",
      "Liegt wie Schwarzenburg eingebettet in die Wälder und Heiden des Niederlausitzer Landrückens.",
      "Am 1. Januar 1974 wurden Schwarzenburg und Wehnsdorf nach Walddrehna eingemeindet, bevor Walddrehna am 26. Oktober 2003 Teil von Heideblick wurde."
    ],
    "exp": "Gehren (Jarin): Gehren schloss sich am 31. Dezember 1997 mit Langengrassau, Waltersdorf und Wüstermarke zur neuen Gemeinde Heideblick zusammen."
  },
  {
    "id": 964,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Unter welcher Telefonvorwahl (Ortsnetz) ist der Bereich „Waltersdorf (Wałtarjejce)“ in der Gemeinde Heideblick erreichbar bzw. welchem historischen Kontext entstammt er?",
    "a": [
      "Vorwahl 035455 · Längliches Dorf an der Berste mit den Gemeindeteilen Neumühle und Sorge",
      "Vorwahl 035454 · 1966 Zusammenschluss aus dem nördlichen Pitschen und dem südlichen Pickel",
      "Vorwahl 035455 · Niedermoor- und Seengebiet im Naturpark Niederlausitzer Landrücken",
      "Vorwahl 035454 · Mittelalterliches Angerdorf am Rand des Luckauer Beckens"
    ],
    "exp": "Waltersdorf (Wałtarjejce) hat die Vorwahl 035455 (Längliches Dorf an der Berste mit den Gemeindeteilen Neumühle und Sorge)."
  },
  {
    "id": 965,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum lohnt sich bei einem Urlaub im Waldgarten Schwarzenburg ein Abstecher nach „Waltersdorf (Wałtarjejce)“?",
    "a": [
      "Hier entspringt und fließt die Berste, an der früher zahlreiche Wassermühlen wie Neumühle, Poltermühle und Untermühle klapperten.",
      "Bekannt durch seinen außergewöhnlichen Doppelnamen, dem schon der RBB-„Landschleicher“ ein Denkmal setzte.",
      "Jeden Herbst versammeln sich hier zehntausende Kraniche und Wildgänse – eines der größten Naturschauspiele Ostdeutschlands.",
      "Im Jahr 1992 wurde Langengrassau Sitz des neu gebildeten Amtes Heideblick und ist heute Verwaltungszentrum der amtsfreien Gemeinde."
    ],
    "exp": "Waltersdorf (Wałtarjejce): Hier entspringt und fließt die Berste, an der früher zahlreiche Wassermühlen wie Neumühle, Poltermühle und Untermühle klapperten."
  },
  {
    "id": 966,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Unter welcher Telefonvorwahl (Ortsnetz) ist der Bereich „Bornsdorf (Baranojce)“ in der Gemeinde Heideblick erreichbar bzw. welchem historischen Kontext entstammt er?",
    "a": [
      "Vorwahl 035455 · Mit den Gemeindeteilen Grünswalde und Trebbinchen",
      "Vorwahl 03544 / 035455 · Östliche Ortsteile nahe der Stadt Luckau und dem Schlabendorfer See",
      "Vorwahl 035455 · 1554 (wüste schwarze Schäfferey) / 1615 (am schwartzen Berge)",
      "Vorwahl 035454 · Mittelalterliche Gründung am Niederlausitzer Landrücken"
    ],
    "exp": "Bornsdorf (Baranojce) hat die Vorwahl 035455 (Mit den Gemeindeteilen Grünswalde und Trebbinchen)."
  },
  {
    "id": 967,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum lohnt sich bei einem Urlaub im Waldgarten Schwarzenburg ein Abstecher nach „Bornsdorf (Baranojce)“?",
    "a": [
      "Schloss sich Ende 1997 zunächst mit Weißack zur Gemeinde „Berstequell“ zusammen, bevor diese Ende 2001 Teil von Heideblick wurde.",
      "Riedebeck wurde 1974 nach Goßmar eingemeindet; Ende 2001 kam Goßmar zur Gemeinde Heideblick.",
      "Kleinster und waldreichster Rückzugsort der Gemeinde Heideblick mit rund 59 Einwohnern und herrlicher Hirschbrunft im Spätsommer.",
      "Zusammen mit Schwarzenburg und Langengrassau gehörte Wüstermarke von 1816 bis 1952 zum preußischen Landkreis Schweinitz."
    ],
    "exp": "Bornsdorf (Baranojce): Schloss sich Ende 1997 zunächst mit Weißack zur Gemeinde „Berstequell“ zusammen, bevor diese Ende 2001 Teil von Heideblick wurde."
  },
  {
    "id": 968,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Unter welcher Telefonvorwahl (Ortsnetz) ist der Bereich „Weißack (Wusoka)“ in der Gemeinde Heideblick erreichbar bzw. welchem historischen Kontext entstammt er?",
    "a": [
      "Vorwahl 035455 · Mit den historischen Wohnplätzen Papiermühle und Pechhütte",
      "Vorwahl 035455 · Ruhiges Walddorf direkt nordöstlich von Schwarzenburg",
      "Vorwahl 035455 · 13. Jahrhundert (bis 1937 Wendisch Drehna)",
      "Vorwahl 03544 · Mittelalterliches Rittergut"
    ],
    "exp": "Weißack (Wusoka) hat die Vorwahl 035455 (Mit den historischen Wohnplätzen Papiermühle und Pechhütte)."
  },
  {
    "id": 969,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum lohnt sich bei einem Urlaub im Waldgarten Schwarzenburg ein Abstecher nach „Weißack (Wusoka)“?",
    "a": [
      "Der Ortsname des Gemeindeteils „Pechhütte“ erinnert an das alte Waldhandwerk der Pechsiederei aus harzreichem Kiefernholz.",
      "Liegt wie Schwarzenburg eingebettet in die Wälder und Heiden des Niederlausitzer Landrückens.",
      "Am 1. Januar 1974 wurden Schwarzenburg und Wehnsdorf nach Walddrehna eingemeindet, bevor Walddrehna am 26. Oktober 2003 Teil von Heideblick wurde.",
      "Geburtsort des berühmten deutschen Landwirtschaftsreformers Johann Gottlieb Koppe (1782–1863)."
    ],
    "exp": "Weißack (Wusoka): Der Ortsname des Gemeindeteils „Pechhütte“ erinnert an das alte Waldhandwerk der Pechsiederei aus harzreichem Kiefernholz."
  },
  {
    "id": 970,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Unter welcher Telefonvorwahl (Ortsnetz) ist der Bereich „Pitschen-Pickel (Pěscyna-Pjakło)“ in der Gemeinde Heideblick erreichbar bzw. welchem historischen Kontext entstammt er?",
    "a": [
      "Vorwahl 035454 · 1966 Zusammenschluss aus dem nördlichen Pitschen und dem südlichen Pickel",
      "Vorwahl 035455 · Niedermoor- und Seengebiet im Naturpark Niederlausitzer Landrücken",
      "Vorwahl 035454 · Mittelalterliches Angerdorf am Rand des Luckauer Beckens",
      "Vorwahl 035454 · Erste urkundliche Erwähnung bereits 1207"
    ],
    "exp": "Pitschen-Pickel (Pěscyna-Pjakło) hat die Vorwahl 035454 (1966 Zusammenschluss aus dem nördlichen Pitschen und dem südlichen Pickel)."
  },
  {
    "id": 971,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum lohnt sich bei einem Urlaub im Waldgarten Schwarzenburg ein Abstecher nach „Pitschen-Pickel (Pěscyna-Pjakło)“?",
    "a": [
      "Bekannt durch seinen außergewöhnlichen Doppelnamen, dem schon der RBB-„Landschleicher“ ein Denkmal setzte.",
      "Jeden Herbst versammeln sich hier zehntausende Kraniche und Wildgänse – eines der größten Naturschauspiele Ostdeutschlands.",
      "Im Jahr 1992 wurde Langengrassau Sitz des neu gebildeten Amtes Heideblick und ist heute Verwaltungszentrum der amtsfreien Gemeinde.",
      "Zählt mit der Urkunde von 1207 zu den ältesten urkundlich belegten Siedlungen in der gesamten Mark Brandenburg."
    ],
    "exp": "Pitschen-Pickel (Pěscyna-Pjakło): Bekannt durch seinen außergewöhnlichen Doppelnamen, dem schon der RBB-„Landschleicher“ ein Denkmal setzte."
  },
  {
    "id": 972,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Unter welcher Telefonvorwahl (Ortsnetz) ist der Bereich „Goßmar (Góšmar) & Riedebeck“ in der Gemeinde Heideblick erreichbar bzw. welchem historischen Kontext entstammt er?",
    "a": [
      "Vorwahl 03544 / 035455 · Östliche Ortsteile nahe der Stadt Luckau und dem Schlabendorfer See",
      "Vorwahl 035455 · 1554 (wüste schwarze Schäfferey) / 1615 (am schwartzen Berge)",
      "Vorwahl 035454 · Mittelalterliche Gründung am Niederlausitzer Landrücken",
      "Vorwahl 035455 · Am steilen Nordhang des Niederlausitzer Landrückens gelegen"
    ],
    "exp": "Goßmar (Góšmar) & Riedebeck hat die Vorwahl 03544 / 035455 (Östliche Ortsteile nahe der Stadt Luckau und dem Schlabendorfer See)."
  },
  {
    "id": 973,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum lohnt sich bei einem Urlaub im Waldgarten Schwarzenburg ein Abstecher nach „Goßmar (Góšmar) & Riedebeck“?",
    "a": [
      "Riedebeck wurde 1974 nach Goßmar eingemeindet; Ende 2001 kam Goßmar zur Gemeinde Heideblick.",
      "Kleinster und waldreichster Rückzugsort der Gemeinde Heideblick mit rund 59 Einwohnern und herrlicher Hirschbrunft im Spätsommer.",
      "Zusammen mit Schwarzenburg und Langengrassau gehörte Wüstermarke von 1816 bis 1952 zum preußischen Landkreis Schweinitz.",
      "Gehren schloss sich am 31. Dezember 1997 mit Langengrassau, Waltersdorf und Wüstermarke zur neuen Gemeinde Heideblick zusammen."
    ],
    "exp": "Goßmar (Góšmar) & Riedebeck: Riedebeck wurde 1974 nach Goßmar eingemeindet; Ende 2001 kam Goßmar zur Gemeinde Heideblick."
  },
  {
    "id": 974,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Unter welcher Telefonvorwahl (Ortsnetz) ist der Bereich „Wehnsdorf (Wanojce)“ in der Gemeinde Heideblick erreichbar bzw. welchem historischen Kontext entstammt er?",
    "a": [
      "Vorwahl 035455 · Ruhiges Walddorf direkt nordöstlich von Schwarzenburg",
      "Vorwahl 035455 · 13. Jahrhundert (bis 1937 Wendisch Drehna)",
      "Vorwahl 03544 · Mittelalterliches Rittergut",
      "Vorwahl 035455 · Längliches Dorf an der Berste mit den Gemeindeteilen Neumühle und Sorge"
    ],
    "exp": "Wehnsdorf (Wanojce) hat die Vorwahl 035455 (Ruhiges Walddorf direkt nordöstlich von Schwarzenburg)."
  },
  {
    "id": 975,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum lohnt sich bei einem Urlaub im Waldgarten Schwarzenburg ein Abstecher nach „Wehnsdorf (Wanojce)“?",
    "a": [
      "Liegt wie Schwarzenburg eingebettet in die Wälder und Heiden des Niederlausitzer Landrückens.",
      "Am 1. Januar 1974 wurden Schwarzenburg und Wehnsdorf nach Walddrehna eingemeindet, bevor Walddrehna am 26. Oktober 2003 Teil von Heideblick wurde.",
      "Geburtsort des berühmten deutschen Landwirtschaftsreformers Johann Gottlieb Koppe (1782–1863).",
      "Hier entspringt und fließt die Berste, an der früher zahlreiche Wassermühlen wie Neumühle, Poltermühle und Untermühle klapperten."
    ],
    "exp": "Wehnsdorf (Wanojce): Liegt wie Schwarzenburg eingebettet in die Wälder und Heiden des Niederlausitzer Landrückens."
  },
  {
    "id": 976,
    "cat": "geschichte",
    "diff": "easy",
    "q": "Unter welcher Telefonvorwahl (Ortsnetz) ist der Bereich „NSG Borcheltsbusch & Wanninchen“ in der Gemeinde Heideblick erreichbar bzw. welchem historischen Kontext entstammt er?",
    "a": [
      "Vorwahl 035455 · Niedermoor- und Seengebiet im Naturpark Niederlausitzer Landrücken",
      "Vorwahl 035454 · Mittelalterliches Angerdorf am Rand des Luckauer Beckens",
      "Vorwahl 035454 · Erste urkundliche Erwähnung bereits 1207",
      "Vorwahl 035455 · Mit den Gemeindeteilen Grünswalde und Trebbinchen"
    ],
    "exp": "NSG Borcheltsbusch & Wanninchen hat die Vorwahl 035455 (Niedermoor- und Seengebiet im Naturpark Niederlausitzer Landrücken)."
  },
  {
    "id": 977,
    "cat": "geschichte",
    "diff": "mid",
    "q": "Warum lohnt sich bei einem Urlaub im Waldgarten Schwarzenburg ein Abstecher nach „NSG Borcheltsbusch & Wanninchen“?",
    "a": [
      "Jeden Herbst versammeln sich hier zehntausende Kraniche und Wildgänse – eines der größten Naturschauspiele Ostdeutschlands.",
      "Im Jahr 1992 wurde Langengrassau Sitz des neu gebildeten Amtes Heideblick und ist heute Verwaltungszentrum der amtsfreien Gemeinde.",
      "Zählt mit der Urkunde von 1207 zu den ältesten urkundlich belegten Siedlungen in der gesamten Mark Brandenburg.",
      "Schloss sich Ende 1997 zunächst mit Weißack zur Gemeinde „Berstequell“ zusammen, bevor diese Ende 2001 Teil von Heideblick wurde."
    ],
    "exp": "NSG Borcheltsbusch & Wanninchen: Jeden Herbst versammeln sich hier zehntausende Kraniche und Wildgänse – eines der größten Naturschauspiele Ostdeutschlands."
  },
  {
    "id": 978,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1207“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Erste urkundliche Erwähnung des heutigen Heideblicker Ortsteils Falkenberg (Sokolnica) — Falkenberg zählt damit zu den ältesten urkundlich erwähnten Orten der Mark Brandenburg.",
      "Urkundliche Beschreibung von Schwarzenburg als „wuster Acker neben der Rochischen Heyde am schwartzen Berge“ — Aus der Lage am „schwartzen Berge“ entwickelte sich im Laufe der Zeit der Ortsname Schwarzenburg.",
      "Urkundliche Nennung von „Schwarzenburg, Schwarzenberg oder die schwarze Schäferei“ — Alle drei historischen Namensformen wurden im frühen 19. Jahrhundert noch parallel verwendet.",
      "Heimatkundliche Erhebung im Kreis Schweinitz verzeichnet für Schwarzenburg rund 166 Einwohner — Damals herrschte durch Forst- und Landwirtschaft reger Betrieb im Walddorf."
    ],
    "exp": "1207: Erste urkundliche Erwähnung des heutigen Heideblicker Ortsteils Falkenberg (Sokolnica). Falkenberg zählt damit zu den ältesten urkundlich erwähnten Orten der Mark Brandenburg."
  },
  {
    "id": 979,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „13. Jahrhundert“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Bau der Feldsteinkirche in Walddrehna mit ihrer späteren dreiseitig offenen Backstein-Vorhalle — Die Kirche in Walddrehna ist eines der bedeutendsten mittelalterlichen Baudenkmale der Gemeinde Heideblick.",
      "Einbau der Patronatsloge (1675) und des barocken Kanzelaltar-Aufsatzes (1684) in der Dorfkirche Pitschen — Wertvolle Zeugnisse ländlicher Kirchenkunst nach dem Dreißigjährigen Krieg.",
      "König Friedrich Wilhelm III. stiftet Schwarzenburg eine eigene Schule mit Gebetsraum in einer alten Blechlöffelfabrik — Damit mussten die Kinder aus Schwarzenburg nicht mehr kilometerweit durch den Wald in Nachbardörfer laufen.",
      "Umbenennung des Nachbarortes „Wendisch Drehna“ in „Walddrehna“ — Der sorbische Name „Serbski Drjenow“ blieb in der niedersorbischen Ortsnamendatenbank erhalten."
    ],
    "exp": "13. Jahrhundert: Bau der Feldsteinkirche in Walddrehna mit ihrer späteren dreiseitig offenen Backstein-Vorhalle. Die Kirche in Walddrehna ist eines der bedeutendsten mittelalterlichen Baudenkmale der Gemeinde Heideblick."
  },
  {
    "id": 980,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „15. Jahrhundert“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Errichtung der spätmittelalterlichen Feldsteinkirchen in Pitschen und im Nachbarort Wehnsdorf — Beide Kirchen wurden aus eiszeitlichen Findlingen der Niederlausitzer Endmoräne gemauert.",
      "Nennung des Ortes in Urkunden als „Vorwerk Schwartzburg“ (1730) und „Schwarzenburg“ (1733) — Das kursächsische Vorwerk unterstand dem Amt Schlieben und betrieb Schafzucht.",
      "Umbau der Dreiflügelanlage von Wasserschloss Beesdau durch Johann Gottlieb Koppe — Schloss Beesdau mit seinem Park ist bis heute ein Wahrzeichen der Gemeinde Heideblick.",
      "Verwaltungsreform in der DDR: Schwarzenburg wechselt vom Kreis Schweinitz in den Kreis Luckau (Bezirk Cottbus) — Damit rückte Schwarzenburg verwaltungsmäßig näher an Walddrehna, Langengrassau und Luckau heran."
    ],
    "exp": "15. Jahrhundert: Errichtung der spätmittelalterlichen Feldsteinkirchen in Pitschen und im Nachbarort Wehnsdorf. Beide Kirchen wurden aus eiszeitlichen Findlingen der Niederlausitzer Endmoräne gemauert."
  },
  {
    "id": 981,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1554“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Erwähnung von Schwarzenburg als wüste „schwarze Schäfferey“ in alten kursächsischen Aufzeichnungen — Der älteste schriftliche Hinweis auf die Schäferei-Tradition von Schwarzenburg.",
      "Geburt des berühmten Agrarreformers Johann Gottlieb Koppe im Heideblicker Ortsteil Beesdau — Koppe reformierte die Fruchtfolge und den Zuckerrübenanbau in Preußen und erwarb später das Rittergut Beesdau.",
      "Erbauung der historischen Bockwindmühle im Heideblicker Ortsteil Falkenberg — Die hölzerne Bockwindmühle von 1853 steht unter Denkmalschutz.",
      "Zusammenschluss der beiden Nachbardörfer Pitschen und Pickel zur Gemeinde Pitschen-Pickel — Pitschen bildet den nördlichen, Pickel den südlichen Dorfteil."
    ],
    "exp": "1554: Erwähnung von Schwarzenburg als wüste „schwarze Schäfferey“ in alten kursächsischen Aufzeichnungen. Der älteste schriftliche Hinweis auf die Schäferei-Tradition von Schwarzenburg."
  },
  {
    "id": 982,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1615“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Urkundliche Beschreibung von Schwarzenburg als „wuster Acker neben der Rochischen Heyde am schwartzen Berge“ — Aus der Lage am „schwartzen Berge“ entwickelte sich im Laufe der Zeit der Ortsname Schwarzenburg.",
      "Übergang der Region nach dem Wiener Kongress von Sachsen an Preußen; Zuordnung Schwarzenburgs zum Kreis Schweinitz — Von 1816 bis 1952 gehörte Schwarzenburg zum preußischen Landkreis Schweinitz in der Provinz Sachsen.",
      "Neubau des Schwarzenburger Schulhauses mit Einklassenraum, Betsaal und Lehrerwohnung an alter Stelle — Dieses 1909 erbaute Denkmal beherbergt heute das berühmte Schulmuseum Schwarzenburg.",
      "Schließung der Einraumschule Schwarzenburg nach 63 Jahren Unterricht und Beginn der Museumsinitiative durch Lehrer Helmuth Österitz — Dank Helmuth Österitz blieb das Klassenzimmer mit historischen Schulbänken, Schiefertafeln und Lehrmitteln erhalten."
    ],
    "exp": "1615: Urkundliche Beschreibung von Schwarzenburg als „wuster Acker neben der Rochischen Heyde am schwartzen Berge“. Aus der Lage am „schwartzen Berge“ entwickelte sich im Laufe der Zeit der Ortsname Schwarzenburg."
  },
  {
    "id": 983,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1675 / 1684“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Einbau der Patronatsloge (1675) und des barocken Kanzelaltar-Aufsatzes (1684) in der Dorfkirche Pitschen — Wertvolle Zeugnisse ländlicher Kirchenkunst nach dem Dreißigjährigen Krieg.",
      "Urkundliche Nennung von „Schwarzenburg, Schwarzenberg oder die schwarze Schäferei“ — Alle drei historischen Namensformen wurden im frühen 19. Jahrhundert noch parallel verwendet.",
      "Heimatkundliche Erhebung im Kreis Schweinitz verzeichnet für Schwarzenburg rund 166 Einwohner — Damals herrschte durch Forst- und Landwirtschaft reger Betrieb im Walddorf.",
      "Eingemeindung von Schwarzenburg und Wehnsdorf in die Nachbargemeinde Walddrehna — Knapp drei Jahrzehnte später wurde Walddrehna mitsamt Schwarzenburg Teil der Gemeinde Heideblick."
    ],
    "exp": "1675 / 1684: Einbau der Patronatsloge (1675) und des barocken Kanzelaltar-Aufsatzes (1684) in der Dorfkirche Pitschen. Wertvolle Zeugnisse ländlicher Kirchenkunst nach dem Dreißigjährigen Krieg."
  },
  {
    "id": 984,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1730 / 1733“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Nennung des Ortes in Urkunden als „Vorwerk Schwartzburg“ (1730) und „Schwarzenburg“ (1733) — Das kursächsische Vorwerk unterstand dem Amt Schlieben und betrieb Schafzucht.",
      "König Friedrich Wilhelm III. stiftet Schwarzenburg eine eigene Schule mit Gebetsraum in einer alten Blechlöffelfabrik — Damit mussten die Kinder aus Schwarzenburg nicht mehr kilometerweit durch den Wald in Nachbardörfer laufen.",
      "Umbenennung des Nachbarortes „Wendisch Drehna“ in „Walddrehna“ — Der sorbische Name „Serbski Drjenow“ blieb in der niedersorbischen Ortsnamendatenbank erhalten.",
      "Bildung des Amtes Heideblick aus elf Gemeinden mit Verwaltungssitz in Langengrassau — Der Name „Heideblick“ beschreibt den weiten Blick vom Niederlausitzer Landrücken über Heide und Flur."
    ],
    "exp": "1730 / 1733: Nennung des Ortes in Urkunden als „Vorwerk Schwartzburg“ (1730) und „Schwarzenburg“ (1733). Das kursächsische Vorwerk unterstand dem Amt Schlieben und betrieb Schafzucht."
  },
  {
    "id": 985,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1782“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Geburt des berühmten Agrarreformers Johann Gottlieb Koppe im Heideblicker Ortsteil Beesdau — Koppe reformierte die Fruchtfolge und den Zuckerrübenanbau in Preußen und erwarb später das Rittergut Beesdau.",
      "Umbau der Dreiflügelanlage von Wasserschloss Beesdau durch Johann Gottlieb Koppe — Schloss Beesdau mit seinem Park ist bis heute ein Wahrzeichen der Gemeinde Heideblick.",
      "Verwaltungsreform in der DDR: Schwarzenburg wechselt vom Kreis Schweinitz in den Kreis Luckau (Bezirk Cottbus) — Damit rückte Schwarzenburg verwaltungsmäßig näher an Walddrehna, Langengrassau und Luckau heran.",
      "Gründung des Naturparks Niederlausitzer Landrücken (ca. 580 km²) und Zusammenschluss der ersten vier Gemeinden zu Heideblick — Gehren, Langengrassau, Waltersdorf und Wüstermarke bildeten am 31.12.1997 die erste Gemeinde Heideblick."
    ],
    "exp": "1782: Geburt des berühmten Agrarreformers Johann Gottlieb Koppe im Heideblicker Ortsteil Beesdau. Koppe reformierte die Fruchtfolge und den Zuckerrübenanbau in Preußen und erwarb später das Rittergut Beesdau."
  },
  {
    "id": 986,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1815 / 1816“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Übergang der Region nach dem Wiener Kongress von Sachsen an Preußen; Zuordnung Schwarzenburgs zum Kreis Schweinitz — Von 1816 bis 1952 gehörte Schwarzenburg zum preußischen Landkreis Schweinitz in der Provinz Sachsen.",
      "Erbauung der historischen Bockwindmühle im Heideblicker Ortsteil Falkenberg — Die hölzerne Bockwindmühle von 1853 steht unter Denkmalschutz.",
      "Zusammenschluss der beiden Nachbardörfer Pitschen und Pickel zur Gemeinde Pitschen-Pickel — Pitschen bildet den nördlichen, Pickel den südlichen Dorfteil.",
      "Zusammenschluss von Beesdau, Berstequell (Bornsdorf/Weißack), Falkenberg, Goßmar, Heideblick und Pitschen-Pickel — Die Gemeinde Heideblick wuchs damit auf den Großteil ihrer heutigen Fläche an."
    ],
    "exp": "1815 / 1816: Übergang der Region nach dem Wiener Kongress von Sachsen an Preußen; Zuordnung Schwarzenburgs zum Kreis Schweinitz. Von 1816 bis 1952 gehörte Schwarzenburg zum preußischen Landkreis Schweinitz in der Provinz Sachsen."
  },
  {
    "id": 987,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1823“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Urkundliche Nennung von „Schwarzenburg, Schwarzenberg oder die schwarze Schäferei“ — Alle drei historischen Namensformen wurden im frühen 19. Jahrhundert noch parallel verwendet.",
      "Neubau des Schwarzenburger Schulhauses mit Einklassenraum, Betsaal und Lehrerwohnung an alter Stelle — Dieses 1909 erbaute Denkmal beherbergt heute das berühmte Schulmuseum Schwarzenburg.",
      "Schließung der Einraumschule Schwarzenburg nach 63 Jahren Unterricht und Beginn der Museumsinitiative durch Lehrer Helmuth Österitz — Dank Helmuth Österitz blieb das Klassenzimmer mit historischen Schulbänken, Schiefertafeln und Lehrmitteln erhalten.",
      "Eingliederung von Walddrehna (mit Schwarzenburg) in die nun amtsfreie Gemeinde Heideblick mit 14 Ortsteilen — Kurz darauf, am 2. Dezember 2003, erhielt Heideblick sein offizielles Gemeindewappen mit Kornähren und Lindenblättern."
    ],
    "exp": "1823: Urkundliche Nennung von „Schwarzenburg, Schwarzenberg oder die schwarze Schäferei“. Alle drei historischen Namensformen wurden im frühen 19. Jahrhundert noch parallel verwendet."
  },
  {
    "id": 988,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1830“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "König Friedrich Wilhelm III. stiftet Schwarzenburg eine eigene Schule mit Gebetsraum in einer alten Blechlöffelfabrik — Damit mussten die Kinder aus Schwarzenburg nicht mehr kilometerweit durch den Wald in Nachbardörfer laufen.",
      "Heimatkundliche Erhebung im Kreis Schweinitz verzeichnet für Schwarzenburg rund 166 Einwohner — Damals herrschte durch Forst- und Landwirtschaft reger Betrieb im Walddorf.",
      "Eingemeindung von Schwarzenburg und Wehnsdorf in die Nachbargemeinde Walddrehna — Knapp drei Jahrzehnte später wurde Walddrehna mitsamt Schwarzenburg Teil der Gemeinde Heideblick.",
      "Bürgerbefragung in Heideblick entscheidet sich klar für die Eigenständigkeit der Gemeinde statt eines Beitritts zu Luckau — Heideblick blieb damit eine eigenständige, bürgernahe Landgemeinde im Landkreis Dahme-Spreewald."
    ],
    "exp": "1830: König Friedrich Wilhelm III. stiftet Schwarzenburg eine eigene Schule mit Gebetsraum in einer alten Blechlöffelfabrik. Damit mussten die Kinder aus Schwarzenburg nicht mehr kilometerweit durch den Wald in Nachbardörfer laufen."
  },
  {
    "id": 989,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1841“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Umbau der Dreiflügelanlage von Wasserschloss Beesdau durch Johann Gottlieb Koppe — Schloss Beesdau mit seinem Park ist bis heute ein Wahrzeichen der Gemeinde Heideblick.",
      "Umbenennung des Nachbarortes „Wendisch Drehna“ in „Walddrehna“ — Der sorbische Name „Serbski Drjenow“ blieb in der niedersorbischen Ortsnamendatenbank erhalten.",
      "Bildung des Amtes Heideblick aus elf Gemeinden mit Verwaltungssitz in Langengrassau — Der Name „Heideblick“ beschreibt den weiten Blick vom Niederlausitzer Landrücken über Heide und Flur.",
      "Erste urkundliche Erwähnung des heutigen Heideblicker Ortsteils Falkenberg (Sokolnica) — Falkenberg zählt damit zu den ältesten urkundlich erwähnten Orten der Mark Brandenburg."
    ],
    "exp": "1841: Umbau der Dreiflügelanlage von Wasserschloss Beesdau durch Johann Gottlieb Koppe. Schloss Beesdau mit seinem Park ist bis heute ein Wahrzeichen der Gemeinde Heideblick."
  },
  {
    "id": 990,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1853“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Erbauung der historischen Bockwindmühle im Heideblicker Ortsteil Falkenberg — Die hölzerne Bockwindmühle von 1853 steht unter Denkmalschutz.",
      "Verwaltungsreform in der DDR: Schwarzenburg wechselt vom Kreis Schweinitz in den Kreis Luckau (Bezirk Cottbus) — Damit rückte Schwarzenburg verwaltungsmäßig näher an Walddrehna, Langengrassau und Luckau heran.",
      "Gründung des Naturparks Niederlausitzer Landrücken (ca. 580 km²) und Zusammenschluss der ersten vier Gemeinden zu Heideblick — Gehren, Langengrassau, Waltersdorf und Wüstermarke bildeten am 31.12.1997 die erste Gemeinde Heideblick.",
      "Bau der Feldsteinkirche in Walddrehna mit ihrer späteren dreiseitig offenen Backstein-Vorhalle — Die Kirche in Walddrehna ist eines der bedeutendsten mittelalterlichen Baudenkmale der Gemeinde Heideblick."
    ],
    "exp": "1853: Erbauung der historischen Bockwindmühle im Heideblicker Ortsteil Falkenberg. Die hölzerne Bockwindmühle von 1853 steht unter Denkmalschutz."
  },
  {
    "id": 991,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1909“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Neubau des Schwarzenburger Schulhauses mit Einklassenraum, Betsaal und Lehrerwohnung an alter Stelle — Dieses 1909 erbaute Denkmal beherbergt heute das berühmte Schulmuseum Schwarzenburg.",
      "Zusammenschluss der beiden Nachbardörfer Pitschen und Pickel zur Gemeinde Pitschen-Pickel — Pitschen bildet den nördlichen, Pickel den südlichen Dorfteil.",
      "Zusammenschluss von Beesdau, Berstequell (Bornsdorf/Weißack), Falkenberg, Goßmar, Heideblick und Pitschen-Pickel — Die Gemeinde Heideblick wuchs damit auf den Großteil ihrer heutigen Fläche an.",
      "Errichtung der spätmittelalterlichen Feldsteinkirchen in Pitschen und im Nachbarort Wehnsdorf — Beide Kirchen wurden aus eiszeitlichen Findlingen der Niederlausitzer Endmoräne gemauert."
    ],
    "exp": "1909: Neubau des Schwarzenburger Schulhauses mit Einklassenraum, Betsaal und Lehrerwohnung an alter Stelle. Dieses 1909 erbaute Denkmal beherbergt heute das berühmte Schulmuseum Schwarzenburg."
  },
  {
    "id": 992,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1912“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Heimatkundliche Erhebung im Kreis Schweinitz verzeichnet für Schwarzenburg rund 166 Einwohner — Damals herrschte durch Forst- und Landwirtschaft reger Betrieb im Walddorf.",
      "Schließung der Einraumschule Schwarzenburg nach 63 Jahren Unterricht und Beginn der Museumsinitiative durch Lehrer Helmuth Österitz — Dank Helmuth Österitz blieb das Klassenzimmer mit historischen Schulbänken, Schiefertafeln und Lehrmitteln erhalten.",
      "Eingliederung von Walddrehna (mit Schwarzenburg) in die nun amtsfreie Gemeinde Heideblick mit 14 Ortsteilen — Kurz darauf, am 2. Dezember 2003, erhielt Heideblick sein offizielles Gemeindewappen mit Kornähren und Lindenblättern.",
      "Erwähnung von Schwarzenburg als wüste „schwarze Schäfferey“ in alten kursächsischen Aufzeichnungen — Der älteste schriftliche Hinweis auf die Schäferei-Tradition von Schwarzenburg."
    ],
    "exp": "1912: Heimatkundliche Erhebung im Kreis Schweinitz verzeichnet für Schwarzenburg rund 166 Einwohner. Damals herrschte durch Forst- und Landwirtschaft reger Betrieb im Walddorf."
  },
  {
    "id": 993,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „30. Oktober 1937“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Umbenennung des Nachbarortes „Wendisch Drehna“ in „Walddrehna“ — Der sorbische Name „Serbski Drjenow“ blieb in der niedersorbischen Ortsnamendatenbank erhalten.",
      "Eingemeindung von Schwarzenburg und Wehnsdorf in die Nachbargemeinde Walddrehna — Knapp drei Jahrzehnte später wurde Walddrehna mitsamt Schwarzenburg Teil der Gemeinde Heideblick.",
      "Bürgerbefragung in Heideblick entscheidet sich klar für die Eigenständigkeit der Gemeinde statt eines Beitritts zu Luckau — Heideblick blieb damit eine eigenständige, bürgernahe Landgemeinde im Landkreis Dahme-Spreewald.",
      "Urkundliche Beschreibung von Schwarzenburg als „wuster Acker neben der Rochischen Heyde am schwartzen Berge“ — Aus der Lage am „schwartzen Berge“ entwickelte sich im Laufe der Zeit der Ortsname Schwarzenburg."
    ],
    "exp": "30. Oktober 1937: Umbenennung des Nachbarortes „Wendisch Drehna“ in „Walddrehna“. Der sorbische Name „Serbski Drjenow“ blieb in der niedersorbischen Ortsnamendatenbank erhalten."
  },
  {
    "id": 994,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1952“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Verwaltungsreform in der DDR: Schwarzenburg wechselt vom Kreis Schweinitz in den Kreis Luckau (Bezirk Cottbus) — Damit rückte Schwarzenburg verwaltungsmäßig näher an Walddrehna, Langengrassau und Luckau heran.",
      "Bildung des Amtes Heideblick aus elf Gemeinden mit Verwaltungssitz in Langengrassau — Der Name „Heideblick“ beschreibt den weiten Blick vom Niederlausitzer Landrücken über Heide und Flur.",
      "Erste urkundliche Erwähnung des heutigen Heideblicker Ortsteils Falkenberg (Sokolnica) — Falkenberg zählt damit zu den ältesten urkundlich erwähnten Orten der Mark Brandenburg.",
      "Einbau der Patronatsloge (1675) und des barocken Kanzelaltar-Aufsatzes (1684) in der Dorfkirche Pitschen — Wertvolle Zeugnisse ländlicher Kirchenkunst nach dem Dreißigjährigen Krieg."
    ],
    "exp": "1952: Verwaltungsreform in der DDR: Schwarzenburg wechselt vom Kreis Schweinitz in den Kreis Luckau (Bezirk Cottbus). Damit rückte Schwarzenburg verwaltungsmäßig näher an Walddrehna, Langengrassau und Luckau heran."
  },
  {
    "id": 995,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „14. April 1966“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Zusammenschluss der beiden Nachbardörfer Pitschen und Pickel zur Gemeinde Pitschen-Pickel — Pitschen bildet den nördlichen, Pickel den südlichen Dorfteil.",
      "Gründung des Naturparks Niederlausitzer Landrücken (ca. 580 km²) und Zusammenschluss der ersten vier Gemeinden zu Heideblick — Gehren, Langengrassau, Waltersdorf und Wüstermarke bildeten am 31.12.1997 die erste Gemeinde Heideblick.",
      "Bau der Feldsteinkirche in Walddrehna mit ihrer späteren dreiseitig offenen Backstein-Vorhalle — Die Kirche in Walddrehna ist eines der bedeutendsten mittelalterlichen Baudenkmale der Gemeinde Heideblick.",
      "Nennung des Ortes in Urkunden als „Vorwerk Schwartzburg“ (1730) und „Schwarzenburg“ (1733) — Das kursächsische Vorwerk unterstand dem Amt Schlieben und betrieb Schafzucht."
    ],
    "exp": "14. April 1966: Zusammenschluss der beiden Nachbardörfer Pitschen und Pickel zur Gemeinde Pitschen-Pickel. Pitschen bildet den nördlichen, Pickel den südlichen Dorfteil."
  },
  {
    "id": 996,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1972“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Schließung der Einraumschule Schwarzenburg nach 63 Jahren Unterricht und Beginn der Museumsinitiative durch Lehrer Helmuth Österitz — Dank Helmuth Österitz blieb das Klassenzimmer mit historischen Schulbänken, Schiefertafeln und Lehrmitteln erhalten.",
      "Zusammenschluss von Beesdau, Berstequell (Bornsdorf/Weißack), Falkenberg, Goßmar, Heideblick und Pitschen-Pickel — Die Gemeinde Heideblick wuchs damit auf den Großteil ihrer heutigen Fläche an.",
      "Errichtung der spätmittelalterlichen Feldsteinkirchen in Pitschen und im Nachbarort Wehnsdorf — Beide Kirchen wurden aus eiszeitlichen Findlingen der Niederlausitzer Endmoräne gemauert.",
      "Geburt des berühmten Agrarreformers Johann Gottlieb Koppe im Heideblicker Ortsteil Beesdau — Koppe reformierte die Fruchtfolge und den Zuckerrübenanbau in Preußen und erwarb später das Rittergut Beesdau."
    ],
    "exp": "1972: Schließung der Einraumschule Schwarzenburg nach 63 Jahren Unterricht und Beginn der Museumsinitiative durch Lehrer Helmuth Österitz. Dank Helmuth Österitz blieb das Klassenzimmer mit historischen Schulbänken, Schiefertafeln und Lehrmitteln erhalten."
  },
  {
    "id": 997,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1. Januar 1974“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Eingemeindung von Schwarzenburg und Wehnsdorf in die Nachbargemeinde Walddrehna — Knapp drei Jahrzehnte später wurde Walddrehna mitsamt Schwarzenburg Teil der Gemeinde Heideblick.",
      "Eingliederung von Walddrehna (mit Schwarzenburg) in die nun amtsfreie Gemeinde Heideblick mit 14 Ortsteilen — Kurz darauf, am 2. Dezember 2003, erhielt Heideblick sein offizielles Gemeindewappen mit Kornähren und Lindenblättern.",
      "Erwähnung von Schwarzenburg als wüste „schwarze Schäfferey“ in alten kursächsischen Aufzeichnungen — Der älteste schriftliche Hinweis auf die Schäferei-Tradition von Schwarzenburg.",
      "Übergang der Region nach dem Wiener Kongress von Sachsen an Preußen; Zuordnung Schwarzenburgs zum Kreis Schweinitz — Von 1816 bis 1952 gehörte Schwarzenburg zum preußischen Landkreis Schweinitz in der Provinz Sachsen."
    ],
    "exp": "1. Januar 1974: Eingemeindung von Schwarzenburg und Wehnsdorf in die Nachbargemeinde Walddrehna. Knapp drei Jahrzehnte später wurde Walddrehna mitsamt Schwarzenburg Teil der Gemeinde Heideblick."
  },
  {
    "id": 998,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „28. August 1992“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Bildung des Amtes Heideblick aus elf Gemeinden mit Verwaltungssitz in Langengrassau — Der Name „Heideblick“ beschreibt den weiten Blick vom Niederlausitzer Landrücken über Heide und Flur.",
      "Bürgerbefragung in Heideblick entscheidet sich klar für die Eigenständigkeit der Gemeinde statt eines Beitritts zu Luckau — Heideblick blieb damit eine eigenständige, bürgernahe Landgemeinde im Landkreis Dahme-Spreewald.",
      "Urkundliche Beschreibung von Schwarzenburg als „wuster Acker neben der Rochischen Heyde am schwartzen Berge“ — Aus der Lage am „schwartzen Berge“ entwickelte sich im Laufe der Zeit der Ortsname Schwarzenburg.",
      "Urkundliche Nennung von „Schwarzenburg, Schwarzenberg oder die schwarze Schäferei“ — Alle drei historischen Namensformen wurden im frühen 19. Jahrhundert noch parallel verwendet."
    ],
    "exp": "28. August 1992: Bildung des Amtes Heideblick aus elf Gemeinden mit Verwaltungssitz in Langengrassau. Der Name „Heideblick“ beschreibt den weiten Blick vom Niederlausitzer Landrücken über Heide und Flur."
  },
  {
    "id": 999,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „1997“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Gründung des Naturparks Niederlausitzer Landrücken (ca. 580 km²) und Zusammenschluss der ersten vier Gemeinden zu Heideblick — Gehren, Langengrassau, Waltersdorf und Wüstermarke bildeten am 31.12.1997 die erste Gemeinde Heideblick.",
      "Erste urkundliche Erwähnung des heutigen Heideblicker Ortsteils Falkenberg (Sokolnica) — Falkenberg zählt damit zu den ältesten urkundlich erwähnten Orten der Mark Brandenburg.",
      "Einbau der Patronatsloge (1675) und des barocken Kanzelaltar-Aufsatzes (1684) in der Dorfkirche Pitschen — Wertvolle Zeugnisse ländlicher Kirchenkunst nach dem Dreißigjährigen Krieg.",
      "König Friedrich Wilhelm III. stiftet Schwarzenburg eine eigene Schule mit Gebetsraum in einer alten Blechlöffelfabrik — Damit mussten die Kinder aus Schwarzenburg nicht mehr kilometerweit durch den Wald in Nachbardörfer laufen."
    ],
    "exp": "1997: Gründung des Naturparks Niederlausitzer Landrücken (ca. 580 km²) und Zusammenschluss der ersten vier Gemeinden zu Heideblick. Gehren, Langengrassau, Waltersdorf und Wüstermarke bildeten am 31.12.1997 die erste Gemeinde Heideblick."
  },
  {
    "id": 1000,
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche geschichtliche Einordnung passt zum Meilenstein aus dem Jahr / Zeitraum „31. Dezember 2001“ in der Region Schwarzenburg & Heideblick?",
    "a": [
      "Zusammenschluss von Beesdau, Berstequell (Bornsdorf/Weißack), Falkenberg, Goßmar, Heideblick und Pitschen-Pickel — Die Gemeinde Heideblick wuchs damit auf den Großteil ihrer heutigen Fläche an.",
      "Bau der Feldsteinkirche in Walddrehna mit ihrer späteren dreiseitig offenen Backstein-Vorhalle — Die Kirche in Walddrehna ist eines der bedeutendsten mittelalterlichen Baudenkmale der Gemeinde Heideblick.",
      "Nennung des Ortes in Urkunden als „Vorwerk Schwartzburg“ (1730) und „Schwarzenburg“ (1733) — Das kursächsische Vorwerk unterstand dem Amt Schlieben und betrieb Schafzucht.",
      "Umbau der Dreiflügelanlage von Wasserschloss Beesdau durch Johann Gottlieb Koppe — Schloss Beesdau mit seinem Park ist bis heute ein Wahrzeichen der Gemeinde Heideblick."
    ],
    "exp": "31. Dezember 2001: Zusammenschluss von Beesdau, Berstequell (Bornsdorf/Weißack), Falkenberg, Goßmar, Heideblick und Pitschen-Pickel. Die Gemeinde Heideblick wuchs damit auf den Großteil ihrer heutigen Fläche an."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === 'function') {
    window.ArcadeQuizEngine.registerBank('waldgarten', QUESTIONS);
  }
  window.WALDGARTEN_QUIZ_BANK = QUESTIONS;
})();
