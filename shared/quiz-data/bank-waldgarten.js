// 75 kuratierte Fragen: Waldgarten – Natur, Tiere, Vögel & Geschichte in Schwarzenburg (Heideblick)
// Index 0 von a[] ist stets die richtige Antwort (wird im Spiel gemischt).
(function () {
  const QUESTIONS = [
  {
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher majestätische graue Zugvogel mit trompetendem Ruf rastet im Herbst zu Tausenden im Moorgebiet Borcheltsbusch bei Heideblick?",
    "a": [
      "Der Kranich (Grus grus)",
      "Der Rosaflamingo",
      "Der Weißstorch",
      "Der Graureiher"
    ],
    "explanation": "Das Luckauer Becken und der Borcheltsbusch in Heideblick gehören zu den bedeutendsten Kranichrastplätzen Brandenburgs vor dem Weiterflug nach Süden.",
    "exp": "Das Luckauer Becken und der Borcheltsbusch in Heideblick gehören zu den bedeutendsten Kranichrastplätzen Brandenburgs vor dem Weiterflug nach Süden."
  },
  {
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher seltene Vogel mit auffälliger Federhaube und braun-schwarz-weißem Gefieder brütet an den sonnigen Sand- und Waldrändern um Heideblick?",
    "a": [
      "Der Wiedehopf (Upupa epops)",
      "Der Eisvogel",
      "Der Bienenfresser",
      "Die Wasseramsel"
    ],
    "explanation": "Der wärmeliebende Wiedehopf ruft im Frühling weithin hörbar 'hup-up-up' und stellt bei Erregung seine Federhaube fächerförmig auf.",
    "exp": "Der wärmeliebende Wiedehopf ruft im Frühling weithin hörbar 'hup-up-up' und stellt bei Erregung seine Federhaube fächerförmig auf."
  },
  {
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher größte Specht Europas mit tiefschwarzem Gefieder und rotem Scheitel zimmert Höhlen in alte Kiefern und Buchen bei Schwarzenburg?",
    "a": [
      "Der Schwarzspecht (Dryocopus martius)",
      "Der Buntspecht",
      "Der Grünspecht",
      "Der Mittelspecht"
    ],
    "explanation": "Der krähengroße Schwarzspecht hämmert markante ovale Höhlen in alte Stämme, die später von Hohltauben, Fledermäusen und Mardern bewohnt werden.",
    "exp": "Der krähengroße Schwarzspecht hämmert markante ovale Höhlen in alte Stämme, die später von Hohltauben, Fledermäusen und Mardern bewohnt werden."
  },
  {
    "cat": "voegel",
    "diff": "easy",
    "q": "Warum übernachten die rastenden Kraniche am Schlabendorfer See und im Borcheltsbusch stehend im seichten Wasser?",
    "a": [
      "Zum Schutz vor Raubtieren wie Füchsen und Wildschweinen, deren Heranschleichen im Wasser Plätschern erzeugt",
      "Weil ihre Füße im Schlamm die Körpertemperatur absenken müssen",
      "Um schlafend im Wasser schwimmende Kaulquappen zu ertasten",
      "Weil ihre Flügel im trockenen Moos nachts verkleben würden"
    ],
    "explanation": "Raubtiere können sich im Wasser nicht lautlos anschleichen; das Wasserplätschern weckt die schlafenden Kraniche rechtzeitig zur Flucht.",
    "exp": "Raubtiere können sich im Wasser nicht lautlos anschleichen; das Wasserplätschern weckt die schlafenden Kraniche rechtzeitig zur Flucht."
  },
  {
    "cat": "voegel",
    "diff": "easy",
    "q": "Welcher leuchtend gelb-schwarze Singvogel mit flötendem Tropenruf brütet heimlich in den Kronen lichter Laub- und Mischwälder um Schwarzenburg?",
    "a": [
      "Der Pirol (Oriolus oriolus)",
      "Der Grünfink",
      "Die Goldammer",
      "Der Erlenzeisig"
    ],
    "explanation": "Der Pirol (auch 'Goldamsel' genannt) flötet wie eine exotische Flöte ('dü-dl-dio'), bleibt aber wegen seines Verstecks im Kronendach fast unsichtbar.",
    "exp": "Der Pirol (auch 'Goldamsel' genannt) flötet wie eine exotische Flöte ('dü-dl-dio'), bleibt aber wegen seines Verstecks im Kronendach fast unsichtbar."
  },
  {
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher nachtaktive Vogel der Kiefernheide erzeugt in lauen Frühsommernächten ein monotones Schnurren und fängt im Flug Nachtfalter?",
    "a": [
      "Der Ziegenmelker (Caprimulgus europaeus)",
      "Der Waldkauz",
      "Die Schleiereule",
      "Der Wachtelkönig"
    ],
    "explanation": "Der perfekt wie Kiefernrinde getarnte Ziegenmelker brütet am Boden sandiger Heiden und schnurrt minutenlang wie ein leiser Zweitaktmotor.",
    "exp": "Der perfekt wie Kiefernrinde getarnte Ziegenmelker brütet am Boden sandiger Heiden und schnurrt minutenlang wie ein leiser Zweitaktmotor."
  },
  {
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher größte Greifvogel Mitteleuropas brütet mit über zwei Metern Flügelspannweite in den ruhigen Altholzinseln der Niederlausitz?",
    "a": [
      "Der Seeadler (Haliaeetus albicilla)",
      "Der Rotmilan",
      "Der Mäusebussard",
      "Der Wanderfalke"
    ],
    "explanation": "Mit seinem breiten Brettflügeln und dem weißen Stoß kreist der Seeadler über den nahen Teichen und Tagebauseen auf Fisch- und Wasservogeljagd.",
    "exp": "Mit seinem breiten Brettflügeln und dem weißen Stoß kreist der Seeadler über den nahen Teichen und Tagebauseen auf Fisch- und Wasservogeljagd."
  },
  {
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher kleine Singvogel spießt Beutetiere wie Käfer, Mäuse und Eidechsen als Vorrat auf Dornen von Schlehen- und Weißdornbüschen auf?",
    "a": [
      "Der Neuntöter (Lanius collurio)",
      "Der Kleiber",
      "Die Blaumeise",
      "Der Zaunkönig"
    ],
    "explanation": "Der Neuntöter nutzt Dornen als natürliche Vorratskammer und Haltewerkzeug, da seine Fänge zu schwach sind, um zähe Beute festzuhalten.",
    "exp": "Der Neuntöter nutzt Dornen als natürliche Vorratskammer und Haltewerkzeug, da seine Fänge zu schwach sind, um zähe Beute festzuhalten."
  },
  {
    "cat": "voegel",
    "diff": "mid",
    "q": "Woran erkennt man den Rotmilan am Himmel über den Feldern von Heideblick auf den ersten Blick?",
    "a": [
      "Am tief gegabelten, rostrot leuchtenden Gabelschwanz",
      "An komplett schneeweißen Flügelunterseiten",
      "An einer runden Schwanzflosse wie bei einer Taube",
      "Am dauerhaften Rüttelflug auf einer Stelle"
    ],
    "explanation": "Deutschland trägt für den 'Gabelweihe' genannten Rotmilan weltweite Verantwortung, da über die Hälfte des weltweiten Bestands hier brütet.",
    "exp": "Deutschland trägt für den 'Gabelweihe' genannten Rotmilan weltweite Verantwortung, da über die Hälfte des weltweiten Bestands hier brütet."
  },
  {
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher ruffreudige Vogel der märkischen Kiefernwälder ahmt fremde Vogelstimmen perfekt nach und vergräbt Eicheln als Wintervorrat?",
    "a": [
      "Der Eichelhäher (Garrulus glandarius)",
      "Die Elster",
      "Die Dohle",
      "Der Tannenhäher"
    ],
    "explanation": "Als emsiger Waldgärtner vergräbt ein einziger Eichelhäher tausende Eicheln; die vergessenen Nüsse keimen und verjüngen den Mischwald.",
    "exp": "Als emsiger Waldgärtner vergräbt ein einziger Eichelhäher tausende Eicheln; die vergessenen Nüsse keimen und verjüngen den Mischwald."
  },
  {
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher kleinste Kauz Europas, kaum größer als ein Sperling, bewohnt alte Spechthöhlen in den Nadelmischwäldern der Region?",
    "a": [
      "Der Sperlingskauz (Glaucidium passerinum)",
      "Der Raufußkauz",
      "Der Steinkauz",
      "Die Zwergohreule"
    ],
    "explanation": "Mit nur 16 cm Körpergröße ist der Sperlingskauz dämmerungsaktiv und legt in Baumhöhlen Depotlager aus Kleinvögeln und Wühlmäusen an.",
    "exp": "Mit nur 16 cm Körpergröße ist der Sperlingskauz dämmerungsaktiv und legt in Baumhöhlen Depotlager aus Kleinvögeln und Wühlmäusen an."
  },
  {
    "cat": "voegel",
    "diff": "mid",
    "q": "Welcher Greifvogel ernährt sich fast ausschließlich von Fischen und taucht an den Lausitzer Teichen mit den Krallen voran ins Wasser?",
    "a": [
      "Der Fischadler (Pandion haliaetus)",
      "Der Wespenbussard",
      "Der Baumfalke",
      "Die Rohrweihe"
    ],
    "explanation": "Dank wendbarer Außenzehe und rauer Schuppen an den Krallen greift der Fischadler selbst glitschige Beute sicher im Sturzflug.",
    "exp": "Dank wendbarer Außenzehe und rauer Schuppen an den Krallen greift der Fischadler selbst glitschige Beute sicher im Sturzflug."
  },
  {
    "cat": "voegel",
    "diff": "pro",
    "q": "Welche ungewöhnliche Balz- und Abwehrgeste zeigt der Wendehals (Jynx torquilla), wenn Feinde seiner Bruthöhle zu nahe kommen?",
    "a": [
      "Er dreht den Kopf schlangenartig um 180 Grad und zischt furchterregend",
      "Er wirft brennend heißes Sekret aus der Bürzeldrüse",
      "Er lässt sich zu Boden fallen und stellt sich mausetot",
      "Er trommelt mit den Flügeln ein warnendes Morsezeichen"
    ],
    "explanation": "Als Verwandter der Spechte imitiert der Wendehals eine zischende Schlange in der dunklen Nisthöhle, um Nesträuber in die Flucht zu schlagen.",
    "exp": "Als Verwandter der Spechte imitiert der Wendehals eine zischende Schlange in der dunklen Nisthöhle, um Nesträuber in die Flucht zu schlagen."
  },
  {
    "cat": "voegel",
    "diff": "pro",
    "q": "Warum galt der Ziegenmelker im früheren ländlichen Volksglauben der Lausitz fälschlicherweise als schädlicher Stallräuber?",
    "a": [
      "Weil man glaubte, er sauge nachts an den Eutern von Ziegen, während er in Wahrheit Fluginsekten am Weidevieh jagte",
      "Weil man ihm nachsagte, er fresse die Eier von Hühnern aus den Nestern",
      "Weil sein Nachtruf als Ankündigung von Tierseuchen gedeutet wurde",
      "Weil er angeblich das Heu auf den Weiden mit Speichel vergiftete"
    ],
    "explanation": "Sein riesiger Schnabelspalt verleitete Bauern zu dem Mythos; tatsächlich fing der Vogel nur Bremsen und Mücken rund um das Vieh.",
    "exp": "Sein riesiger Schnabelspalt verleitete Bauern zu dem Mythos; tatsächlich fing der Vogel nur Bremsen und Mücken rund um das Vieh."
  },
  {
    "cat": "voegel",
    "diff": "pro",
    "q": "Welche Vogelart der lichten Kiefernwälder singt im Frühling melodisch im wellenförmigen Steigflug über den Dünenkämmen?",
    "a": [
      "Die Heidelerche (Lullula arborea)",
      "Die Feldlerche",
      "Der Wiesenpieper",
      "Die Schafstelze"
    ],
    "explanation": "Ihr jodeln-weicher Gesang ('lülü-lülü') im spiralförmigen Singflug ist der akustische Frühlingsbote sandiger Heide- und Waldlichtungen.",
    "exp": "Ihr jodeln-weicher Gesang ('lülü-lülü') im spiralförmigen Singflug ist der akustische Frühlingsbote sandiger Heide- und Waldlichtungen."
  },
  {
    "cat": "voegel",
    "diff": "pro",
    "q": "Welche Eigenschaft macht den Kolkraben (Corvus corax) in den weiten Wäldern des Niederlausitzer Landrückens zu einem intelligenten Jäger?",
    "a": [
      "Er kooperiert mit Wölfen, indem er Kadaver meldet und von den Rissresten des Rudels profitiert",
      "Er baut Werkzeuge aus Kiefernnadeln, um Bienenstöcke auszurauben",
      "Er lockt Waldwanderer gezielt zu Ameisenhaufen",
      "Er erlernt das Pfeifen von Jagdhörnern zur Rehkitzjagd"
    ],
    "explanation": "Kolkraben fliegen laut rufend vor Wölfen her, um sie zu toten Tieren zu führen – der Wolf bricht die Decke auf, der Rabe frisst mit.",
    "exp": "Kolkraben fliegen laut rufend vor Wölfen her, um sie zu toten Tieren zu führen – der Wolf bricht die Decke auf, der Rabe frisst mit."
  },
  {
    "cat": "voegel",
    "diff": "pro",
    "q": "Welche besondere Flugtechnik nutzen Baumfalken bei der Jagd über den Waldlichtungen um Schwarzenburg?",
    "a": [
      "Rasanter Jagdflug im freien Luftraum, um Großlibellen und Schwalben direkt mit den Fängen zu schlagen",
      "Ruhiges Gleiten am Boden auf der Pirsch nach Regenwürmern",
      "Lauerjagd unter Wasser an den Ufern von Waldseen",
      "Schüttelflug über Baumwipfeln zum Vertreiben von Mäusen"
    ],
    "explanation": "Der wendige Baumfalke verzehrt gefangene Libellen oft direkt im schnellen Segelflug mit seinen Fängen aus der Luft.",
    "exp": "Der wendige Baumfalke verzehrt gefangene Libellen oft direkt im schnellen Segelflug mit seinen Fängen aus der Luft."
  },
  {
    "cat": "voegel",
    "diff": "pro",
    "q": "Wie verständigen sich Kranichpaare am Nistplatz im Borcheltsbusch zur Festigung ihrer lebenslangen Partnerschaft?",
    "a": [
      "Durch synchrone Doppelrufe ('Duettieren') mit aufgerichteten Hälsen und ausgebreiteten Schwingen",
      "Durch gegenseitiges Eintauchen der Köpfe in den Moorschlamm",
      "Indem das Männchen kleine Kieselsteine auf den Rücken des Weibchens legt",
      "Durch völliges Verstummen während der gesamten dreimonatigen Brutzeit"
    ],
    "explanation": "Beim Kranich-Duett ruft das Männchen den Grundton, worauf das Weibchen exakt zweisilbig antwortet – ein Symbol ewiger Treue.",
    "exp": "Beim Kranich-Duett ruft das Männchen den Grundton, worauf das Weibchen exakt zweisilbig antwortet – ein Symbol ewiger Treue."
  },
  {
    "cat": "voegel",
    "diff": "pro",
    "q": "Welcher wärmeliebende Steppenvogel brütet in sandigen Steilwänden alter Kiesgruben in der Niederlausitz in bunten Röhrenkolonien?",
    "a": [
      "Der Bienenfresser (Merops apiaster)",
      "Der Mauerläufer",
      "Die Felsenschwalbe",
      "Die Rauchschwalbe"
    ],
    "explanation": "Mit exotisch buntem Gefieder gräbt der Bienenfresser bis zu zwei Meter tiefe Röhren in Sandwände und fängt Wespen und Hummeln in der Luft.",
    "exp": "Mit exotisch buntem Gefieder gräbt der Bienenfresser bis zu zwei Meter tiefe Röhren in Sandwände und fängt Wespen und Hummeln in der Luft."
  },
  {
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches eindrucksvolle Naturschauspiel hallt im September und Oktober nachts durch die Wälder rund um Schwarzenburg?",
    "a": [
      "Die Rothirschbrunft (das tiefe Röhren der Hirsche)",
      "Das Klopfen von Bären an Baumstämmen",
      "Das Gebrüll wandernder Elche",
      "Der Balzgesang der Zikaden"
    ],
    "explanation": "In den Altholzbeständen liefern sich Platzhirsche lautstarke Rufduelle um das Kahlwildrudel, die kilometerweit durch die Nacht schallen.",
    "exp": "In den Altholzbeständen liefern sich Platzhirsche lautstarke Rufduelle um das Kahlwildrudel, die kilometerweit durch die Nacht schallen."
  },
  {
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Welches streng geschützte große Raubtier ist seit Anfang der 2000er-Jahre wieder dauerhaft in der Lausitz heimisch geworden?",
    "a": [
      "Der Wolf (Canis lupus)",
      "Der Braunbär",
      "Der Vielfraß",
      "Der Goldschakal"
    ],
    "explanation": "Aus Polen eingewandert, gründeten Wölfe auf Truppenübungsplätzen der Lausitz die ersten festen Rudel Deutschlands seit ihrer Ausrottung.",
    "exp": "Aus Polen eingewandert, gründeten Wölfe auf Truppenübungsplätzen der Lausitz die ersten festen Rudel Deutschlands seit ihrer Ausrottung."
  },
  {
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Was ist der biologische Unterschied zwischen einem Reh und einem Hirsch?",
    "a": [
      "Das Reh ist eine eigene, kleine Hirschart und keineswegs das 'Kind' oder die 'Frau' des großen Rothirsches",
      "Rehe sind die weiblichen Tiere aller Hirscharten",
      "Hirsche werfen ihr Geweih nie ab, Rehe hingegen jedes Jahr",
      "Rehe fressen Fleisch, während Hirsche reine Pflanzenfresser sind"
    ],
    "explanation": "Ein verbreiteter Irrtum: Das Reh (Capreolus capreolus) wiegt rund 20 kg, die weibliche Hirschkuh des Rothirsches hingegen über 100 kg.",
    "exp": "Ein verbreiteter Irrtum: Das Reh (Capreolus capreolus) wiegt rund 20 kg, die weibliche Hirschkuh des Rothirsches hingegen über 100 kg."
  },
  {
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Wie nennt man die schlammigen Mulden im Wald, in denen sich Wildschweine genüsslich zur Hautpflege wälzen?",
    "a": [
      "Suhle",
      "Kessel",
      "Kuhle",
      "Horst"
    ],
    "explanation": "In der Suhle kühlen sich Wildschweine im Sommer ab; die getrocknete Lehmschicht schützt ihre Haut vor Stechmücken und Zecken.",
    "exp": "In der Suhle kühlen sich Wildschweine im Sommer ab; die getrocknete Lehmschicht schützt ihre Haut vor Stechmücken und Zecken."
  },
  {
    "cat": "wildtiere",
    "diff": "easy",
    "q": "Wie heißt der pelzige Waldakrobat, der im Waldgarten Zapfen abschuppt und Nüsse in Moos und Baumhöhlen versteckt?",
    "a": [
      "Das Eichhörnchen (Sciurus vulgaris)",
      "Der Siebenschläfer",
      "Die Haselmaus",
      "Der Baummarder"
    ],
    "explanation": "Eichhörnchen bauen kugelförmige Nester (Kobel) aus Reisig und Moos in den Kronen und vergessen oft ihre vergrabenen Zapfenvorräte.",
    "exp": "Eichhörnchen bauen kugelförmige Nester (Kobel) aus Reisig und Moos in den Kronen und vergessen oft ihre vergrabenen Zapfenvorräte."
  },
  {
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Wie nennt man die typische Gangart des Wolfes, bei der die Hinterpfoten exakt in den Abdruck der Vorderpfoten treten?",
    "a": [
      "Schnüren (der geschnürte Trab)",
      "Hoppeln",
      "Passgang",
      "Galoppieren"
    ],
    "explanation": "Beim Schnüren hinterlässt der Wolf eine schnurgerade Perlenkette von Pfotenabdrücken im märkischen Sand, was viel Energie spart.",
    "exp": "Beim Schnüren hinterlässt der Wolf eine schnurgerade Perlenkette von Pfotenabdrücken im märkischen Sand, was viel Energie spart."
  },
  {
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Woraus besteht das mächtige Geweih des Rothirsches, das er jedes Jahr im Spätwinter abwirft und neu aufbaut?",
    "a": [
      "Aus echter Knochensubstanz (Knochengewebe)",
      "Aus verhornten Haaren wie das Horn eines Nashorns",
      "Aus getrocknetem Knorpel mit Kalkeinlagerung",
      "Aus abgestorbenen Baumfasern und Harz"
    ],
    "explanation": "Das Geweih ist reiner Knochen. Binnen nur rund 140 Tagen wächst unter schützendem Bast ein bis zu 10 kg schweres Gebilde heran.",
    "exp": "Das Geweih ist reiner Knochen. Binnen nur rund 140 Tagen wächst unter schützendem Bast ein bis zu 10 kg schweres Gebilde heran."
  },
  {
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Woran unterscheidet man den heimischen Baummarder vom kulturfolgenden Steinmarder im Lebensraum Wald?",
    "a": [
      "Der Baummarder hat einen gelblichen, abgerundeten Kehlfleck und behaarte Pfotensohlen",
      "Der Baummarder besitzt ein getupftes Leopardenfell",
      "Der Steinmarder schläft ausschließlich auf Bäumen",
      "Der Baummarder ist tagaktiv und hält echten Winterschlaf"
    ],
    "explanation": "Der scheue Baummarder meidet Siedlungen und klettert geschickt im Kronendach, während der weißkehlig geprägte Steinmarder gern Motorräume heimsucht.",
    "exp": "Der scheue Baummarder meidet Siedlungen und klettert geschickt im Kronendach, während der weißkehlig geprägte Steinmarder gern Motorräume heimsucht."
  },
  {
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches nützliche Waldtier gräbt weitverzweigte unterirdische Baue ('Burgen') mit Generationen überdauernden Kesselanlagen?",
    "a": [
      "Der Dachs (Meles meles)",
      "Der Maulwurf",
      "Das Wildschwein",
      "Der Igel"
    ],
    "explanation": "Der 'Meister Grimbart' legt im sandigen Boden tiefe Röhrensysteme an, die oft Jahrzehnte von Dachsfamilien und Füchsen gemeinsam genutzt werden.",
    "exp": "Der 'Meister Grimbart' legt im sandigen Boden tiefe Röhrensysteme an, die oft Jahrzehnte von Dachsfamilien und Füchsen gemeinsam genutzt werden."
  },
  {
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welche Baumspuren hinterlassen Wildschweine, nachdem sie aus der Schlammsuhle kommen?",
    "a": [
      "Sie scheuern sich an 'Malbäumen' und hinterlassen Schlammkrusten und Borsten an der Rinde",
      "Sie fällen die Bäume mit ihren Eckzähnen wie Biber",
      "Sie klettern die Stämme hoch, um Eicheln zu schütteln",
      "Sie nagen kreisrunde Löcher in das Kernholz"
    ],
    "explanation": "Die harzigen Malbäume (oft Kiefern) befreien die Keiler und Bachen von lästigen Parasiten; die Borsten zeugen von ihrer Anwesenheit.",
    "exp": "Die harzigen Malbäume (oft Kiefern) befreien die Keiler und Bachen von lästigen Parasiten; die Borsten zeugen von ihrer Anwesenheit."
  },
  {
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Was versteht der Jäger unter dem Begriff 'Schrecken' beim Rehwild in den Wäldern um Schwarzenburg?",
    "a": [
      "Einen lauten, heiseren Belllaut bei Gefahr oder plötzlicher Beunruhigung",
      "Ein plötzliches Totstellen auf dem Waldboden",
      "Das Zusammenrollen zu einer dornigen Kugel",
      "Das Aufstellen aller Nackenhaare ohne Lautäußerung"
    ],
    "explanation": "Fühlt sich ein Reh gestört, stößt es ein dunkles, bellendes 'Böh' aus, das andere Rehe warnt und oft wie ein Hundekläffen klingt.",
    "exp": "Fühlt sich ein Reh gestört, stößt es ein dunkles, bellendes 'Böh' aus, das andere Rehe warnt und oft wie ein Hundekläffen klingt."
  },
  {
    "cat": "wildtiere",
    "diff": "mid",
    "q": "Welches wassergebundene Nagetier gestaltet Fließgewässer und Gräben im Luckauer Becken aktiv mit Dämmen und Burgen?",
    "a": [
      "Der Europäische Biber (Castor fiber)",
      "Die Nutria",
      "Die Bisamratte",
      "Die Wasserspitzmaus"
    ],
    "explanation": "Der Biber staut Gräben auf, schafft wertvolle Feuchtbiotope für Amphibien und Libellen und fällt weiche Weiden und Pappeln am Ufer.",
    "exp": "Der Biber staut Gräben auf, schafft wertvolle Feuchtbiotope für Amphibien und Libellen und fällt weiche Weiden und Pappeln am Ufer."
  },
  {
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welcher Giftmechanismus schützt die winzige Wasserspitzmaus (Neomys fodiens) an den Waldgräben bei der Jagd auf Frösche und Fische?",
    "a": [
      "Ein lähmendes Nervengift in ihrem Speichel, das sie mit ihren Zähnen in die Beute injiziert",
      "Giftstacheln an ihren Hinterpfoten",
      "Eine toxische Säure, die sie aus der Nase versprüht",
      "Ein giftiger Schleim auf ihrem Rückenfell"
    ],
    "explanation": "Als eines der wenigen giftigen Säugetiere Europas lähmt die Wasserspitzmaus selbst Beute, die deutlich größer ist als sie selbst.",
    "exp": "Als eines der wenigen giftigen Säugetiere Europas lähmt die Wasserspitzmaus selbst Beute, die deutlich größer ist als sie selbst."
  },
  {
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Wie orientiert sich die winzige Mopsfledermaus (Barbastella barbastellus) in den lichten Kiefern- und Eichenwäldern der Niederlausitz?",
    "a": [
      "Über extrem leise, nasale Ultraschallrufe, die Nachtfalter kaum wahrnehmen können",
      "Ausschließlich durch Infrarot-Wärmesensoren an den Ohren",
      "Durch magnetische Strömungen im Quarzsand",
      "Durch akustische Klicklaute mit ihren Flügelknochen"
    ],
    "explanation": "Die Mopsfledermaus jagt mit 'Flüster-Echolot'. Dadurch bemerken hochspezialisierte Eulenfalter die herannahende Jägerin nicht rechtzeitig.",
    "exp": "Die Mopsfledermaus jagt mit 'Flüster-Echolot'. Dadurch bemerken hochspezialisierte Eulenfalter die herannahende Jägerin nicht rechtzeitig."
  },
  {
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welche Funktion erfüllt die sogenannte 'Brunftkugel' oder der 'Brunftfleck' am Bauch des brunftigen Rothirsches?",
    "a": [
      "Ein dunkel verfärbter, intensiv nach Pheromonen riechender Bereich durch Einsauen mit eigenem Urin",
      "Ein künstlicher Schlammballen, der im Geweih mitgeführt wird",
      "Eine Verdickung der Haut zum Schutz vor Rivalenhieben",
      "Ein Leuchtorgan aus biolumineszenten Bakterien"
    ],
    "explanation": "Der Platzhirsch suhlt sich in einer Brunftkuhle aus Schlamm und Urin; der moschusartige Duft signalisiert Rivalen und Hirschkühen Dominanz.",
    "exp": "Der Platzhirsch suhlt sich in einer Brunftkuhle aus Schlamm und Urin; der moschusartige Duft signalisiert Rivalen und Hirschkühen Dominanz."
  },
  {
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Was passiert im Winter mit dem scheinbar im Moos liegenden Haselmaus-Nest im Unterholz des Waldgartens?",
    "a": [
      "Die Haselmaus senkt ihre Körpertemperatur auf fast null Grad und hält bis zu sieben Monate Winterschlaf",
      "Sie zieht als Zugtier nach Süden in wärmere Mittelgebirge",
      "Sie teilt sich die Schlafkammer mit einem Ameisenvolk",
      "Sie bleibt den ganzen Winter über tagaktiv auf Nahrungssuche"
    ],
    "explanation": "Der kleine Bilch rollt sich zur festen Kugel zusammen und wacht erst im warmen April wieder auf, wenn die Knospen sprießen.",
    "exp": "Der kleine Bilch rollt sich zur festen Kugel zusammen und wacht erst im warmen April wieder auf, wenn die Knospen sprießen."
  },
  {
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welche Besonderheit weisen die Schalenabdrücke (Trittsiegel) des Wolfes im Vergleich zu großen Haushunden auf sandigem Waldboden auf?",
    "a": [
      "Die beiden mittleren Zehenballen stehen weit vorne; eine gedachte Querlinie berührt kaum die äußeren Ballen",
      "Der Wolf hinterlässt fünf statt vier Zehenabdrücke im Sand",
      "Die Krallen sind beim Wolf wie bei Katzen komplett eingezogen",
      "Die Fährte ist doppelt so breit wie lang"
    ],
    "explanation": "Wolfsspuren sind langgestreckt und oval; zwischen den Mittel- und Außenballen lässt sich oft eine Schnur oder ein Streichholz durchziehen.",
    "exp": "Wolfsspuren sind langgestreckt und oval; zwischen den Mittel- und Außenballen lässt sich oft eine Schnur oder ein Streichholz durchziehen."
  },
  {
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Welches seltene Reptil liebt die sonnigen Sandpfade und Kiefernlichtungen um Schwarzenburg und legt Eier in den warmen Sand?",
    "a": [
      "Die Zauneidechse (Lacerta agilis)",
      "Die Smaragdeidechse",
      "Die europäische Sumpfschildkröte",
      "Die Hornviper"
    ],
    "explanation": "Männchen leuchten zur Paarungszeit smaragdgrün an den Flanken; die Eier werden im lockeren, sonnenwarmen Sandboden ausgebrütet.",
    "exp": "Männchen leuchten zur Paarungszeit smaragdgrün an den Flanken; die Eier werden im lockeren, sonnenwarmen Sandboden ausgebrütet."
  },
  {
    "cat": "wildtiere",
    "diff": "pro",
    "q": "Was bedeutet der Begriff 'Fegen' beim Rehbock im Frühjahr an jungen Bäumchen im Waldgarten?",
    "a": [
      "Das Abreiben der abgestorbenen Bastschicht vom fertigen Gehörn an jungen Zweigen",
      "Das Zusammenscharren von Eicheln zu einem Laubhaufen",
      "Das Säubern des Rehbettes mit den Vorderläufen",
      "Das Entfernen von Schnee mit der Schnauze"
    ],
    "explanation": "Junge Lärchen, Birken und Kiefern werden mit Vorliebe 'gefegt', wobei Duftdrüsen an der Stirn gleichzeitig das Revier markieren.",
    "exp": "Junge Lärchen, Birken und Kiefern werden mit Vorliebe 'gefegt', wobei Duftdrüsen an der Stirn gleichzeitig das Revier markieren."
  },
  {
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welche Baumart dominiert die weiten, harzduftenden Waldlandschaften rund um Schwarzenburg und Heideblick?",
    "a": [
      "Die Waldkiefer (Pinus sylvestris)",
      "Die Rotfichte",
      "Die Weißtanne",
      "Die Rosskastanie"
    ],
    "explanation": "Mit ihren tiefen Pfahlwurzeln trotzt die Waldkiefer den nährstoffarmen, sandigen Böden und den trockenen Sommern Brandenburgs ideal.",
    "exp": "Mit ihren tiefen Pfahlwurzeln trotzt die Waldkiefer den nährstoffarmen, sandigen Böden und den trockenen Sommern Brandenburgs ideal."
  },
  {
    "cat": "wald_natur",
    "diff": "easy",
    "q": "In welchem großen brandenburgischen Großschutzgebiet liegt das Dorf Schwarzenburg?",
    "a": [
      "Im Naturpark Niederlausitzer Landrücken",
      "Im Biosphärenreservat Schorfheide-Chorin",
      "Im Nationalpark Unteres Odertal",
      "Im Naturpark Nuthe-Nieplitz"
    ],
    "explanation": "Der Naturpark Niederlausitzer Landrücken bewahrt historische Buchen- und Eichenmischwälder, Heiden und wiedervernässte Moorgebiete.",
    "exp": "Der Naturpark Niederlausitzer Landrücken bewahrt historische Buchen- und Eichenmischwälder, Heiden und wiedervernässte Moorgebiete."
  },
  {
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welcher beliebte Speisepilz mit braunem Samthut blaut an den gelblichen Röhren bei Druckkontakt und füllt im Herbst viele Sammelkörbe?",
    "a": [
      "Der Maronenröhrling (Imleria badia)",
      "Der Steinpilz",
      "Der Birkenpilz",
      "Der Butterpilz"
    ],
    "explanation": "Die 'Marone' geht Mykorrhiza-Symbiosen mit Kiefern ein und ist der verlässlichste und schmackhafteste Speisepilz der märkischen Heide.",
    "exp": "Die 'Marone' geht Mykorrhiza-Symbiosen mit Kiefern ein und ist der verlässlichste und schmackhafteste Speisepilz der märkischen Heide."
  },
  {
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Welcher krause, badeschwammartige Speisepilz wächst als Parasit direkt am Stammfuß alter Kiefern bei Schwarzenburg?",
    "a": [
      "Die Krause Glucke (Fette Henne / Sparassis crispa)",
      "Der Schwefelporling",
      "Der Hallimasch",
      "Die Zitterzahn-Koralle"
    ],
    "explanation": "Die Krause Glucke kann mehrere Kilo schwer werden, schmeckt herrlich nussig in Butter und liebt die sandigen Kiefernwurzeln der Niederlausitz.",
    "exp": "Die Krause Glucke kann mehrere Kilo schwer werden, schmeckt herrlich nussig in Butter und liebt die sandigen Kiefernwurzeln der Niederlausitz."
  },
  {
    "cat": "wald_natur",
    "diff": "easy",
    "q": "Was versteht man unter dem gärtnerischen Prinzip eines 'Waldgartens' (Forest Gardening)?",
    "a": [
      "Ein mehrschichtiges, sich selbst regulierendes Pflanzsystem aus Bäumen, Sträuchern, Kräutern und Pilzen nach dem Vorbild natürlicher Waldränder",
      "Einen reinen Fichtenwald mit aufgeräumtem Kiesboden",
      "Einen eingezäunten Gemüsegarten mitten auf einer Rodungsfläche",
      "Einen Zierrasen mit einzeln gepflanzten Nadelbäumen"
    ],
    "explanation": "Waldgärten nutzen sieben vertikale Ebenen (von der Baumkrone bis zur Wurzelknolle), sparen Dünger und Wasser und liefern reiche Ernten.",
    "exp": "Waldgärten nutzen sieben vertikale Ebenen (von der Baumkrone bis zur Wurzelknolle), sparen Dünger und Wasser und liefern reiche Ernten."
  },
  {
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche klimatische Eigenart zeichnet Südbrandenburg und die Niederlausitz im bundesweiten Vergleich aus?",
    "a": [
      "Sie zählt zu den sonnenreichsten, aber auch niederschlagsärmsten Regionen Deutschlands mit kontinentaler Prägung",
      "Sie ist die regenreichste Region Mitteleuropas",
      "Sie kennt keine sommerlichen Hitzetage über 25 Grad",
      "Sie hat ganzjährig dichten Nebel durch Meeresbrisen"
    ],
    "explanation": "Sandböden und kontinentaler Sommerwind führen zu geringen Niederschlägen (oft unter 550 mm im Jahr), was angepasste Mischwälder erfordert.",
    "exp": "Sandböden und kontinentaler Sommerwind führen zu geringen Niederschlägen (oft unter 550 mm im Jahr), was angepasste Mischwälder erfordert."
  },
  {
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche eiszeitliche Struktur schuf die markante Hügelkette des Niederlausitzer Landrückens?",
    "a": [
      "Eine Endmoräne der Saale-Kaltzeit mit aufgeschobenen Sand- und Schottermassen",
      "Ein erloschener Vulkankegel aus Basaltgestein",
      "Ein tektonischer Grabenbruch durch Erdbeben",
      "Eine Ansammlung von Meteoritenkratern"
    ],
    "explanation": "Vor über 150.000 Jahren schoben gewaltige Gletscher der Saale-Vereisung Geröll und Sand auf und formten die Höhenzüge südlich von Luckau.",
    "exp": "Vor über 150.000 Jahren schoben gewaltige Gletscher der Saale-Vereisung Geröll und Sand auf und formten die Höhenzüge südlich von Luckau."
  },
  {
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher weiße Pionierbaum mit papierartiger Rinde besiedelt karge Sandflächen und liebt sonnige Waldlichtungen?",
    "a": [
      "Die Hänge-Birke (Betula pendula)",
      "Die Zitterpappel",
      "Die Roterle",
      "Die Trauerweide"
    ],
    "explanation": "Der weiße Farbstoff Betulin reflektiert Sonnenlicht und schützt die Rinde vor Rissen durch Temperaturschwankungen im Winter.",
    "exp": "Der weiße Farbstoff Betulin reflektiert Sonnenlicht und schützt die Rinde vor Rissen durch Temperaturschwankungen im Winter."
  },
  {
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Zwergstrauch verwandelt im Spätsommer Waldlichtungen und Dünen in ein leuchtendes lila Blütenmeer?",
    "a": [
      "Die Besenheide (Calluna vulgaris)",
      "Der Fingerhut",
      "Der Stechginster",
      "Das Lungenkraut"
    ],
    "explanation": "Die Besenheide liebt saure Sandböden und bietet im August und September unzähligen Wildbienen und Hummeln späten Nektar.",
    "exp": "Die Besenheide liebt saure Sandböden und bietet im August und September unzähligen Wildbienen und Hummeln späten Nektar."
  },
  {
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Warum fördern moderne Waldgärtner und Förster den Umbau reiner Kiefernmonokulturen zu artenreichen Mischwäldern?",
    "a": [
      "Laubbäume wie Traubeneichen und Buchen verbessern den Humusaufbau, senken die Waldbrandgefahr und speichern mehr Bodenwasser",
      "Weil Kiefernholz auf dem Weltmarkt verboten werden soll",
      "Damit im Winter keine Nadeln mehr von den Bäumen fallen",
      "Weil Laubbäume weniger Sonnenlicht zum Wachsen benötigen"
    ],
    "explanation": "Tiefwurzelnde Eichen bringen Nährstoffe nach oben; ihr Laub kühlt den Boden und schützt den Wald vor dem Austrocknen und Feuer.",
    "exp": "Tiefwurzelnde Eichen bringen Nährstoffe nach oben; ihr Laub kühlt den Boden und schützt den Wald vor dem Austrocknen und Feuer."
  },
  {
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welcher Halbparasit wächst als kugelförmiger, immergrüner Busch hoch oben in den Kronen älterer Kiefern rund um Heideblick?",
    "a": [
      "Die Kiefernmistel (Viscum album subsp. austriacum)",
      "Der Efeu",
      "Der Baumschwamm",
      "Das Moosröschen"
    ],
    "explanation": "Drosseln und Seidenschwänze fressen die weißen, klebrigen Beeren und pflanzen die Samen durch das Wetzen des Schnabels an Ästen ein.",
    "exp": "Drosseln und Seidenschwänze fressen die weißen, klebrigen Beeren und pflanzen die Samen durch das Wetzen des Schnabels an Ästen ein."
  },
  {
    "cat": "wald_natur",
    "diff": "mid",
    "q": "Welche Beerenfrucht wächst dicht am Boden lichter Nadelwälder und färbt Zunge und Finger beim Pflücken tiefblau?",
    "a": [
      "Die Heidelbeere (Blaubeere / Vaccinium myrtillus)",
      "Die Preiselbeere",
      "Die Brombeere",
      "Die Vogelbeere"
    ],
    "explanation": "Der dichte Heidelbeerteppich auf saurem Waldboden liefert ab Juli süß-aromatische Beeren voller wertvoller Anthozyane.",
    "exp": "Der dichte Heidelbeerteppich auf saurem Waldboden liefert ab Juli süß-aromatische Beeren voller wertvoller Anthozyane."
  },
  {
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Was versteht man unter dem forstlichen Begriff der 'Spiegelrinde' bei älteren Waldkiefern?",
    "a": [
      "Die leuchtend fuchsrote, dünne Schuppenrinde im oberen Stammbereich, die im Abendlicht wie Kupfer glänzt",
      "Eine künstliche reflektierende Folie gegen Wildverbiss",
      "Eine glänzende Schleimschicht aus Baumharz am Stammfuß",
      "Eine frostige Eisschicht an der windabgewandten Seite"
    ],
    "explanation": "Während der Stamm unten dicke, graue Borke bildet, schuppt die Rinde in den Wipfeln dünn und leuchtet bei Sonnenuntergang spektakulär kupferrot.",
    "exp": "Während der Stamm unten dicke, graue Borke bildet, schuppt die Rinde in den Wipfeln dünn und leuchtet bei Sonnenuntergang spektakulär kupferrot."
  },
  {
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welche entscheidende Funktion erfüllt liegendes und stehendes Totholz im naturnahen Waldgarten?",
    "a": [
      "Es dient als gigantischer Wasserspeicher (Schwammeffekt) und bietet Nahrung für tausende Käfer-, Pilz- und Moosarten",
      "Es verhindert das Wachstum von unliebsamen Wildgräsern",
      "Es zieht Waldbrände an und neutralisiert Rauchgase",
      "Es dient ausschließlich als Sitzgelegenheit für Wanderer"
    ],
    "explanation": "Morschholz saugt Regenwasser wie ein riesiger Badeschwamm auf und gibt Feuchtigkeit in Dürreperioden langsam an die Umgebung ab.",
    "exp": "Morschholz saugt Regenwasser wie ein riesiger Badeschwamm auf und gibt Feuchtigkeit in Dürreperioden langsam an die Umgebung ab."
  },
  {
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher seltene Urwald-Käfer bewohnt sonnenbeschienene, uralte Eichen am Rande der Rochauer Heide?",
    "a": [
      "Der Heldbock (Großer Eichenbock / Cerambyx cerdo)",
      "Der Kartoffelkäfer",
      "Der Fichtenborkenkäfer",
      "Der Marienkäfer"
    ],
    "explanation": "Mit seinen riesigen Fühlern ist der geschützte Heldbock auf alte, absterbende Stieleichen mit dickem Stammumfang angewiesen.",
    "exp": "Mit seinen riesigen Fühlern ist der geschützte Heldbock auf alte, absterbende Stieleichen mit dickem Stammumfang angewiesen."
  },
  {
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Warum ist der märkische Quarzsand-Boden von Natur aus extrem sauer und nährstoffarm?",
    "a": [
      "Weil Schmelzwasser der Eiszeit alle feinen Tone und Kalke auswuschen und fast reines Siliziumdioxid (Quarz) zurückließen",
      "Weil saurer Regen aus Fabriken den Boden vor 50 Jahren aufgelöst hat",
      "Weil Kiefernnadeln den Boden mit Salzsäure anreichern",
      "Weil der Boden früher zur Salzgewinnung genutzt wurde"
    ],
    "explanation": "Eiszeitliche Sander bestehen aus reinem Quarzsand ohne bindige Tonminerale, weshalb Nährstoffe rasch ins Grundwasser ausgewaschen werden.",
    "exp": "Eiszeitliche Sander bestehen aus reinem Quarzsand ohne bindige Tonminerale, weshalb Nährstoffe rasch ins Grundwasser ausgewaschen werden."
  },
  {
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher geschätzte Speisepilz mit goldgelbem Trichterhut und aprikosenartigem Fruchtduft wächst im Moos saurer Nadelwälder?",
    "a": [
      "Der Echte Pfifferling (Cantharellus cibarius)",
      "Der Falsche Pfifferling",
      "Der Gift-Häubling",
      "Der Satanspilz"
    ],
    "explanation": "Der Pfifferling (in der Lausitz gern 'Rehling' genannt) lebt in Symbiose mit Kiefern und Fichten und schmeckt fein pfeffrig-aromatisch.",
    "exp": "Der Pfifferling (in der Lausitz gern 'Rehling' genannt) lebt in Symbiose mit Kiefern und Fichten und schmeckt fein pfeffrig-aromatisch."
  },
  {
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Was bewirken Mykorrhiza-Pilze im Wurzelsystem der Bäume im Waldgarten?",
    "a": [
      "Sie liefern dem Baum Wasser und mineralische Nährstoffe aus feinsten Bodenporen im Tausch gegen pflanzlichen Zucker",
      "Sie fressen die Wurzelspitzen ab, um den Baum klein zu halten",
      "Sie vergiften schädliche Regenwürmer im Wurzelbereich",
      "Sie erzeugen elektrische Funken zur Stimulierung des Wachstums"
    ],
    "explanation": "Ein engmaschiges unterirdisches Pilzgeflecht ('Wood Wide Web') versorgt Bäume bei Trockenheit und verbindet den Wald zu einer Gemeinschaft.",
    "exp": "Ein engmaschiges unterirdisches Pilzgeflecht ('Wood Wide Web') versorgt Bäume bei Trockenheit und verbindet den Wald zu einer Gemeinschaft."
  },
  {
    "cat": "wald_natur",
    "diff": "pro",
    "q": "Welcher Frühjahrsblüher mit dreilappigen Blättern und himmelblauen Blüten bedeckt kalkhaltigere Hohlwege im Naturpark?",
    "a": [
      "Das Leberblümchen (Hepatica nobilis)",
      "Das Buschwindröschen",
      "Der Scharbockskraut",
      "Das Gänseblümchen"
    ],
    "explanation": "Das geschützte Leberblümchen blüht oft schon im März vor dem Laubaustrieb der Bäume und nutzt das ungefilterte Licht am Waldboden.",
    "exp": "Das geschützte Leberblümchen blüht oft schon im März vor dem Laubaustrieb der Bäume und nutzt das ungefilterte Licht am Waldboden."
  },
  {
    "cat": "geschichte",
    "diff": "easy",
    "q": "Zu welcher amtsfreien Großgemeinde im Landkreis Dahme-Spreewald gehört das kleine Walddorf Schwarzenburg heute?",
    "a": [
      "Gemeinde Heideblick",
      "Stadt Luckau",
      "Stadt Lübbenau",
      "Gemeinde Schlepzig"
    ],
    "explanation": "Die Großgemeinde Heideblick vereint über 14 historische Ortsteile am Südrand des Landkreises Dahme-Spreewald.",
    "exp": "Die Großgemeinde Heideblick vereint über 14 historische Ortsteile am Südrand des Landkreises Dahme-Spreewald."
  },
  {
    "cat": "geschichte",
    "diff": "easy",
    "q": "Welches liebevoll restaurierte, denkmalgeschützte Gebäude aus dem Jahr 1909 bildet heute das kulturelle Herz von Schwarzenburg?",
    "a": [
      "Das Schulmuseum Schwarzenburg (ehemalige Dorfschule)",
      "Eine alte Wassermühle am Mühlenfließ",
      "Eine mittelalterliche Klosterruine",
      "Ein barockes Jagdschloss der Kurfürsten"
    ],
    "explanation": "Die 1909 erbaute Einklassenschule zeigt originale Schulbänke, Schiefertafeln und Lehrmittel aus über 60 Jahren Schulgeschichte.",
    "exp": "Die 1909 erbaute Einklassenschule zeigt originale Schulbänke, Schiefertafeln und Lehrmittel aus über 60 Jahren Schulgeschichte."
  },
  {
    "cat": "geschichte",
    "diff": "easy",
    "q": "Welche romantische offizielle Nutzung bietet das Schulmuseum Schwarzenburg für Verliebte aus ganz Brandenburg an?",
    "a": [
      "Es ist ein offizieller historischer Trauort des Standesamtes der Gemeinde Heideblick",
      "Es dient als Übernachtungshotel für Bundespolitiker",
      "Es veranstaltet allwöchentlich offizielle Reitturniere",
      "Es ist eine staatliche Fahrschule für Traktoren"
    ],
    "explanation": "Brautpaare können sich im historischen Klassenzimmer vor der alten Schiefertafel unter dem Beisein von Familie und Freunden das Ja-Wort geben.",
    "exp": "Brautpaare können sich im historischen Klassenzimmer vor der alten Schiefertafel unter dem Beisein von Familie und Freunden das Ja-Wort geben."
  },
  {
    "cat": "geschichte",
    "diff": "easy",
    "q": "Wie viele Einwohner leben heute ungefähr im beschaulichen, waldumrahmten Ort Schwarzenburg?",
    "a": [
      "Rund 160 bis 170 Einwohner",
      "Über 2.500 Einwohner",
      "Genau 12 Einwohner",
      "Knapp 10.000 Einwohner"
    ],
    "explanation": "Mit rund 166 Einwohnern bietet Schwarzenburg dörfliche Ruhe, engen Zusammenhalt und eine intakte Naturverbundenheit.",
    "exp": "Mit rund 166 Einwohnern bietet Schwarzenburg dörfliche Ruhe, engen Zusammenhalt und eine intakte Naturverbundenheit."
  },
  {
    "cat": "geschichte",
    "diff": "mid",
    "q": "Unter welcher Bezeichnung wurde die Wüstung Schwarzenburg bereits im Jahr 1589 in kursächsischen Akten urkundlich erwähnt?",
    "a": [
      "Als wüste 'schwarze Schäfferey' am schwartzen Berge",
      "Als befestigte Raubritterburg im Moor",
      "Als fürstliches Jagdpalais zu Heideblick",
      "Als goldene Bergstadt im Fläming"
    ],
    "explanation": "Schafzucht auf mageren Heideflächen prägte die Anfänge: Aus der alten Schäferei am Schwarzen Berg entstand später die Kolonie Schwarzenburg.",
    "exp": "Schafzucht auf mageren Heideflächen prägte die Anfänge: Aus der alten Schäferei am Schwarzen Berg entstand später die Kolonie Schwarzenburg."
  },
  {
    "cat": "geschichte",
    "diff": "mid",
    "q": "In welchem ungewöhnlichen Industriegebäude erhielt Schwarzenburg im Jahr 1830 sein allererstes eigenes Schulzimmer?",
    "a": [
      "In einer ehemaligen Blechlöffelfabrik",
      "In einer alten Schnapsbrennerei",
      "In einem stillgelegten Sägewerk",
      "In einer verlassenen Glashütte"
    ],
    "explanation": "Preußische Behörden richteten 1830 in der umgebauten Blechlöffelfabrik einen Klassenraum und eine Wohnung für den Dorfschullehrer ein.",
    "exp": "Preußische Behörden richteten 1830 in der umgebauten Blechlöffelfabrik einen Klassenraum und eine Wohnung für den Dorfschullehrer ein."
  },
  {
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welcher preußische König bewilligte im Jahr 1830 persönlich den Bau und die Einrichtung der ersten Schule in Schwarzenburg?",
    "a": [
      "König Friedrich Wilhelm III.",
      "König Friedrich II. (Der Große)",
      "Kaiser Wilhelm II.",
      "König Friedrich I."
    ],
    "explanation": "Friedrich Wilhelm III. förderte das Volksschulwesen auf dem Lande und genehmigte die Schulgründung für die damals wachsende Gemeinde.",
    "exp": "Friedrich Wilhelm III. förderte das Volksschulwesen auf dem Lande und genehmigte die Schulgründung für die damals wachsende Gemeinde."
  },
  {
    "cat": "geschichte",
    "diff": "mid",
    "q": "Bis zu welchem Jahr wurden die Kinder im heutigen Schulmuseum Schwarzenburg noch im regulären einklassigen Unterricht unterrichtet?",
    "a": [
      "Bis zum Jahr 1972 (nach 63 Jahren ununterbrochenem Schulbetrieb)",
      "Bis zum Ende des Zweiten Weltkriegs 1945",
      "Bis zum Mauerfall im Jahr 1989",
      "Bis ins Jahr 1918 beim Sturz des Kaisers"
    ],
    "explanation": "Erst 1972 schloss die traditionsreiche Dorfschule; danach fuhren die Kinder mit dem Bus in die Zentralschule nach Walddrehna.",
    "exp": "Erst 1972 schloss die traditionsreiche Dorfschule; danach fuhren die Kinder mit dem Bus in die Zentralschule nach Walddrehna."
  },
  {
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welchem letzten Dorfschullehrer ist es maßgeblich zu verdanken, dass die alte Schule heute als liebevolles Museum erhalten ist?",
    "a": [
      "Helmuth Österitz",
      "Theodor Fontane",
      "Wilhelm Busch",
      "Otto von Bismarck"
    ],
    "explanation": "Lehrer Österitz unterrichtete die Kinder jahrzehntelang und bewahrte alte Fibeln, Schulbänke, Griffelkästen und Anschauungstafeln für die Nachwelt.",
    "exp": "Lehrer Österitz unterrichtete die Kinder jahrzehntelang und bewahrte alte Fibeln, Schulbänke, Griffelkästen und Anschauungstafeln für die Nachwelt."
  },
  {
    "cat": "geschichte",
    "diff": "mid",
    "q": "Zu welchem historischen kursächsischen Amt gehörte Schwarzenburg vor dem Wiener Kongress von 1815?",
    "a": [
      "Zum Amt Schlieben",
      "Zum Amt Lübben",
      "Zum Amt Zossen",
      "Zum Amt Cottbus"
    ],
    "explanation": "Als kursächsisches Vorwerk gehörte Schwarzenburg zum traditionsreichen Amt Schlieben, bevor das Gebiet nach den Napoleonischen Kriegen preußisch wurde.",
    "exp": "Als kursächsisches Vorwerk gehörte Schwarzenburg zum traditionsreichen Amt Schlieben, bevor das Gebiet nach den Napoleonischen Kriegen preußisch wurde."
  },
  {
    "cat": "geschichte",
    "diff": "mid",
    "q": "Welcher große historische Waldkomplex grenzt unmittelbar westlich an die Gemarkung von Schwarzenburg an?",
    "a": [
      "Die Rochauer Heide",
      "Der Spreewald",
      "Die Schorfheide",
      "Der Grunewald"
    ],
    "explanation": "Die ausgedehnte Rochauer Heide war jahrhundertelang kurfürstliches Jagdrevier und ein wichtiges Holz- und Pechgewinnungsgebiet.",
    "exp": "Die ausgedehnte Rochauer Heide war jahrhundertelang kurfürstliches Jagdrevier und ein wichtiges Holz- und Pechgewinnungsgebiet."
  },
  {
    "cat": "geschichte",
    "diff": "mid",
    "q": "Zu welcher benachbarten Kirchengemeinde gehört die evangelische Dorfkirche, in die die Schwarzenburger traditionell sonntags pilgerten?",
    "a": [
      "Zur Kirchengemeinde Proßmarke",
      "Zur Schlosskirche Wittenberg",
      "Zur Paulikirche Brandenburg",
      "Zur Kreuzkirche Dresden"
    ],
    "explanation": "Da Schwarzenburg keine eigene Kirche besaß, wanderten die Dorfbewohner über den Kirchweg ins malerische Nachbardorf Proßmarke zum Gottesdienst.",
    "exp": "Da Schwarzenburg keine eigene Kirche besaß, wanderten die Dorfbewohner über den Kirchweg ins malerische Nachbardorf Proßmarke zum Gottesdienst."
  },
  {
    "cat": "geschichte",
    "diff": "pro",
    "q": "Wie erklärte sich der frühere Volksmund mit feinem Humor den Ortsnamen 'Schwarzenburg', obwohl hier nie eine Steinburg stand?",
    "a": [
      "'In Schwarzenburg wurden nur schwarze Schafe geboren und gebürgt' (Bezug auf die alte Schäferei am Hügel)",
      "Wegen eines großen Meteoriteneinschlags im Mittelalter",
      "Weil der preußische König dort schwarze Uniformen weben ließ",
      "Weil alle Häuser mit Pech schwarz gestrichen werden mussten"
    ],
    "explanation": "Der Name leitete sich vom bewaldeten 'Schwarzen Berg' und der alten Schäferei ab; der Volksmund spintisierte scherzhaft von schwarzen Schafen.",
    "exp": "Der Name leitete sich vom bewaldeten 'Schwarzen Berg' und der alten Schäferei ab; der Volksmund spintisierte scherzhaft von schwarzen Schafen."
  },
  {
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welcher berühmte historische Bahnhof an der Berlin-Dresdener Eisenbahn verband die Region ab 1875 mit der Metropole Berlin?",
    "a": [
      "Der Bahnhof Walddrehna",
      "Der Bahnhof Alexanderplatz",
      "Der Bahnhof Jüterbog",
      "Der Bahnhof Senftenberg"
    ],
    "explanation": "Die Eröffnung der Strecke Berlin-Dresden brachte den Dörfern Anschluss an die weite Welt; Holz und landwirtschaftliche Produkte fuhren per Dampfzug nach Berlin.",
    "exp": "Die Eröffnung der Strecke Berlin-Dresden brachte den Dörfern Anschluss an die weite Welt; Holz und landwirtschaftliche Produkte fuhren per Dampfzug nach Berlin."
  },
  {
    "cat": "geschichte",
    "diff": "pro",
    "q": "Was war das historische 'Pechbrennen' und Teerschwelen, das früher in den Wäldern der Rochauer Heide betrieben wurde?",
    "a": [
      "Das Verschwelen von harzreichem Kiefernholz in Pechöfen zur Gewinnung von Wagenschmiere, Dichtpech und Wundbalsam",
      "Das Verbrennen von Unkraut auf abgeernteten Feldern",
      "Ein heidnischer Brauch zur Sonnenwendfeier",
      "Das Rösten von Kaffeebohnenersatz aus Eicheln"
    ],
    "explanation": "Pechkratzer schlugen Kerben in Kiefernstämme; das gewonnene Harz wurde in Erdmeilern zu wertvollem Schiffspech und Wagenschmiere verkocht.",
    "exp": "Pechkratzer schlugen Kerben in Kiefernstämme; das gewonnene Harz wurde in Erdmeilern zu wertvollem Schiffspech und Wagenschmiere verkocht."
  },
  {
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche slawische Wurzel spiegelt sich in vielen Flurnamen und Nachbarorten der Niederlausitz (wie Luckau oder Drehna) wider?",
    "a": [
      "Die Besiedlung durch die westslawischen Sorben/Wenden im frühen Mittelalter",
      "Einflüsse der Wikinger auf ihren Handelsrouten",
      "Keltische Siedler aus der Hallstattzeit",
      "Römische Garnisonslager an der Bernsteinstraße"
    ],
    "explanation": "Ortsnamen mit '-ow', '-itz' oder '-na' zeugen von der friedlichen slawischen Landnahme ab dem 6. Jahrhundert in der Niederlausitz.",
    "exp": "Ortsnamen mit '-ow', '-itz' oder '-na' zeugen von der friedlichen slawischen Landnahme ab dem 6. Jahrhundert in der Niederlausitz."
  },
  {
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche einschneidende territoriale Neuordnung brachte der Wiener Kongress 1815 für Schwarzenburg und die gesamte Niederlausitz?",
    "a": [
      "Das sächsische Territorium fiel an das Königreich Preußen und wurde der Provinz Brandenburg eingegliedert",
      "Das Gebiet wurde dem Zarenreich Russland als Kolonie zugesprochen",
      "Schwarzenburg wurde zur freien Republik nach Schweizer Vorbild erklärt",
      "Die Region wurde dauerhaft an das Königreich Bayern verpachtet"
    ],
    "explanation": "Weil Sachsen treu an der Seite Napoleons gekämpft hatte, musste es 1815 fast die Hälfte seines Staatsgebietes an die preußische Krone abtreten.",
    "exp": "Weil Sachsen treu an der Seite Napoleons gekämpft hatte, musste es 1815 fast die Hälfte seines Staatsgebietes an die preußische Krone abtreten."
  },
  {
    "cat": "geschichte",
    "diff": "pro",
    "q": "Welche frühere dörfliche Handwerkstradition hielt in Schwarzenburg bis ins 20. Jahrhundert hinein die Häuser warm?",
    "a": [
      "Das Torfstechen in den nassen Waldbrüchen und das Holzrücken mit Kaltblutpferden",
      "Das Abbauen von Braunkohle im eigenen Garten",
      "Das Importieren von Steinkohle aus England",
      "Das Verbrennen von getrocknetem Dünensand"
    ],
    "explanation": "In den feuchten Niedermooren des Borcheltsbuschs stachen die Bauern Torf als günstigen Hausbrand; schwere Pferde zogen Kiefernstämme aus dem Forst.",
    "exp": "In den feuchten Niedermooren des Borcheltsbuschs stachen die Bauern Torf als günstigen Hausbrand; schwere Pferde zogen Kiefernstämme aus dem Forst."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === 'function') {
    window.ArcadeQuizEngine.registerBank('waldgarten', QUESTIONS);
  }
})();
