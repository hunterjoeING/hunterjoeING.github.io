// Unified quiz bank for "golf_technik" (75 questions: Technik, Equipment & Taktik)
(function () {
  const DATA = [
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Was bezeichnet der Begriff 'Loft' bei einem Golfschläger?",
    "a": [
      "Den Neigungswinkel der Schlagfläche",
      "Das Gesamtgewicht des Schlägerkopfes",
      "Die Elastizität des Graphitschafts",
      "Die Dicke des Gummigriffes am Schaft"
    ],
    "correctIndex": 0,
    "exp": "Der Loft ist der Neigungswinkel der Schlagfläche gegenüber einer Senkrechten. Je höher der Loft, desto steiler steigt der Ball.",
    "explanation": "Der Loft ist der Neigungswinkel der Schlagfläche gegenüber einer Senkrechten. Je höher der Loft, desto steiler steigt der Ball."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Welcher Schläger im Bag besitzt typischerweise das größte Schlägerkopfvolumen von bis zu 460 ccm?",
    "a": [
      "Der moderne Driver",
      "Das klassische Holz 3",
      "Der moderne Hybrid-Schläger",
      "Das lange Eisen 2"
    ],
    "correctIndex": 0,
    "exp": "Der Driver hat den größten Schlägerkopf (maximal 460 Kubikzentimeter nach R&A/USGA-Limit) für maximale Fehlerverzeihung vom Tee.",
    "explanation": "Der Driver hat den größten Schlägerkopf (maximal 460 Kubikzentimeter nach R&A/USGA-Limit) für maximale Fehlerverzeihung vom Tee."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Welchen aerodynamischen Hauptzweck erfüllen die vielen kleinen Dellen (Dimples) auf einem Golfball?",
    "a": [
      "Sie verringern den Luftwiderstand",
      "Sie machen den Ball stabiler im Sand",
      "Sie verhindern das Versinken im Wasser",
      "Sie erleichtern das Rollen auf dem Grün"
    ],
    "correctIndex": 0,
    "exp": "Dimples erzeugen eine turbulente Grenzschicht um den Ball, die den Strömungswiderstand drastisch senkt und Auftrieb generiert.",
    "explanation": "Dimples erzeugen eine turbulente Grenzschicht um den Ball, die den Strömungswiderstand drastisch senkt und Auftrieb generiert."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Wie nennt man die Flugkurve, bei der der Ball leicht rechts startet und sanft zur Zielmitte zurückdreht (Rechtshänder)?",
    "a": [
      "Einen kontrollierten Draw",
      "Einen unsauberen Slice",
      "Einen verzogenen Push",
      "Einen flachen Punch"
    ],
    "correctIndex": 0,
    "exp": "Ein Draw startet für Rechtshänder leicht rechts der Ziellinie und kurvt durch die Neigung der Spin-Achse sanft zurück ins Fairwayzentrum.",
    "explanation": "Ein Draw startet für Rechtshänder leicht rechts der Ziellinie und kurvt durch die Neigung der Spin-Achse sanft zurück ins Fairwayzentrum."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Wie nennt man die Flugkurve, bei der der Ball leicht links startet und sanft nach rechts zur Mitte driftet (Rechtshänder)?",
    "a": [
      "Einen kontrollierten Fade",
      "Einen aggressiven Hook",
      "Einen geraden Pull-Schlag",
      "Einen steilen Flop-Schlag"
    ],
    "correctIndex": 0,
    "exp": "Ein Fade kurvt für Rechtshänder leicht von links nach rechts. Er landet weicher auf dem Grün und rollt weniger als ein Draw.",
    "explanation": "Ein Fade kurvt für Rechtshänder leicht von links nach rechts. Er landet weicher auf dem Grün und rollt weniger als ein Draw."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Was versteht man unter dem 'Sweetspot' auf der Schlagfläche eines Golfschlägers?",
    "a": [
      "Den Punkt optimaler Energieübertragung",
      "Die unterste Rille der Schlagfläche",
      "Die obere Kante des Schlägerkopfes",
      "Die Verbindung zwischen Schaft und Kopf"
    ],
    "correctIndex": 0,
    "exp": "Der Sweetspot ist der Schwerpunkt-Projektionspunkt der Schlagfläche; Treffer hier übertragen die maximale Energie vibrationsfrei auf den Ball.",
    "explanation": "Der Sweetspot ist der Schwerpunkt-Projektionspunkt der Schlagfläche; Treffer hier übertragen die maximale Energie vibrationsfrei auf den Ball."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Was passiert bei einem sogenannten 'getoppten' Ball (Top-Shot)?",
    "a": [
      "Die Unterkante trifft den Ball oben",
      "Der Schläger gräbt sich tief in Gras",
      "Der Ball wird mit dem Schlägerschaft getroffen",
      "Der Ball erhält extrem viel Rückwärtsdrall"
    ],
    "correctIndex": 0,
    "exp": "Beim Toppen trifft die Schlägerunterkante (Leading Edge) den Ball oberhalb des Äquators; der Ball holpert flach und unkontrolliert über den Boden.",
    "explanation": "Beim Toppen trifft die Schlägerunterkante (Leading Edge) den Ball oberhalb des Äquators; der Ball holpert flach und unkontrolliert über den Boden."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Was passiert bei einem 'fett' getroffenen Ball (Fat Shot bzw. Chunk)?",
    "a": [
      "Der Schläger trifft zuerst den Boden",
      "Der Ball fliegt viel weiter als geplant",
      "Die Schlagfläche öffnet sich komplett",
      "Der Schlägerkopf bricht durch den Treffer"
    ],
    "correctIndex": 0,
    "exp": "Bei einem fetten Treffer dringt der Schläger vor dem Ball in den Boden ein; der Boden bremst den Kopf ab und der Ball verhungert kurz.",
    "explanation": "Bei einem fetten Treffer dringt der Schläger vor dem Ball in den Boden ein; der Boden bremst den Kopf ab und der Ball verhungert kurz."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Was ist der Hauptunterschied zwischen einem Annäherungs-'Chip' und einem 'Pitch'?",
    "a": [
      "Der Chip fliegt kurz und rollt weit",
      "Der Chip wird nur mit dem Holz gespielt",
      "Der Pitch darf nur im Bunker verwendet werden",
      "Der Pitch wird ohne Schwung ausgeführt"
    ],
    "correctIndex": 0,
    "exp": "Ein Chip ist ein flacher Schlag mit wenig Flug und viel Rollphase; ein Pitch fliegt steil und hoch und stoppt schnell auf dem Grün.",
    "explanation": "Ein Chip ist ein flacher Schlag mit wenig Flug und viel Rollphase; ein Pitch fliegt steil und hoch und stoppt schnell auf dem Grün."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Welcher Schläger im Bag hat typischerweise den höchsten Loftwinkel (meist 58° bis 64°)?",
    "a": [
      "Das Lob Wedge für steile Schläge",
      "Das Pitching Wedge für volle Schläge",
      "Das Eisen 9 für mittlere Schläge",
      "Das Gap Wedge für Annäherungen"
    ],
    "correctIndex": 0,
    "exp": "Das Lob Wedge besitzt den höchsten Loft und dient für kurze, extrem hohe Schläge über Hindernisse oder steile Bunkerwände.",
    "explanation": "Das Lob Wedge besitzt den höchsten Loft und dient für kurze, extrem hohe Schläge über Hindernisse oder steile Bunkerwände."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Wie nennt man die Rillen auf der Schlagfläche von Eisen und Wedges, die Feuchtigkeit ableiten?",
    "a": [
      "Die sogenannten Grooves",
      "Die sogenannten Dimples",
      "Die sogenannten Grinds",
      "Die sogenannten Bounces"
    ],
    "correctIndex": 0,
    "exp": "Grooves leiten wie Autoreifenprofile Gras und Wasser ab, um den Reibungskontakt zwischen Metall und Ball für optimalen Spin zu sichern.",
    "explanation": "Grooves leiten wie Autoreifenprofile Gras und Wasser ab, um den Reibungskontakt zwischen Metall und Ball für optimalen Spin zu sichern."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Welcher Golfgriff ist der Standard, bei dem der rechte kleine Finger auf dem linken Zeigefinger ruht?",
    "a": [
      "Der Overlapping-Griff (Vardon)",
      "Der Interlocking-Griff (verzahnend)",
      "Der Zehnfinger-Baseball-Griff",
      "Der umgekehrte Putter-Cross-Griff"
    ],
    "correctIndex": 0,
    "exp": "Der Overlap- oder Vardon-Griff ist der weltweit meistgespielte Griff im Profigolf, da er beide Hände zu einer harmonischen Einheit verbindet.",
    "explanation": "Der Overlap- oder Vardon-Griff ist der weltweit meistgespielte Griff im Profigolf, da er beide Hände zu einer harmonischen Einheit verbindet."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Was versteht man unter einem 'Bump-and-Run'-Schlag rund um das Grün?",
    "a": [
      "Einen flachen Schlag vor das Grün",
      "Einen gewaltigen Treffer aus dem Sand",
      "Einen Schlag mit dem Driver vom Grün",
      "Einen Putt über eine steile Kante"
    ],
    "correctIndex": 0,
    "exp": "Beim Bump-and-Run landet der Ball vor oder am Anfang des Grüns und rollt dann wie ein Putt kontrolliert zur Fahne.",
    "explanation": "Beim Bump-and-Run landet der Ball vor oder am Anfang des Grüns und rollt dann wie ein Putt kontrolliert zur Fahne."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Welcher gefürchtete Fehlschlag entsteht, wenn der Ball mit der Schlägerhals-Verbindung (Hosel) getroffen wird?",
    "a": [
      "Der verheerende Shank-Schlag",
      "Der kontrollierte Flop-Schlag",
      "Der harmlose Top-Schlag",
      "Der saubere Draw-Schlag"
    ],
    "correctIndex": 0,
    "exp": "Beim Shank trifft der Ball den runden Schlägerhals und spritzt bei einem Rechtshänder in fast 90 Grad extrem scharf nach rechts weg.",
    "explanation": "Beim Shank trifft der Ball den runden Schlägerhals und spritzt bei einem Rechtshänder in fast 90 Grad extrem scharf nach rechts weg."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Wohin sollte das Körpergewicht in der ausbalancierten Finish-Position am Ende des Schwungs verlagert sein?",
    "a": [
      "Fast komplett auf den vorderen Fuß",
      "Gleichmäßig auf beiden Fersen verteilt",
      "Vollständig auf dem hinteren Fußballen",
      "Ausschließlich auf den Fußspitzen vorn"
    ],
    "correctIndex": 0,
    "exp": "Ein stabiles Finish zeigt das Gewicht zu 90 Prozent auf der vorderen Ferse, während die hintere Schuhsohle senkrecht nach hinten zeigt.",
    "explanation": "Ein stabiles Finish zeigt das Gewicht zu 90 Prozent auf der vorderen Ferse, während die hintere Schuhsohle senkrecht nach hinten zeigt."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Was versteht man im Golfsport unter dem Begriff 'Course Management'?",
    "a": [
      "Das kluge und taktische Platzspiel",
      "Die Pflege und das Mähen des Kurses",
      "Das Buchen von Startzeiten im Club",
      "Die Organisation von Clubmeisterschaften"
    ],
    "correctIndex": 0,
    "exp": "Course Management umfasst die strategische Schlag- und Schlägerwahl, das Vermeiden von Risiken und das Anspielen der sicheren Grünbereiche.",
    "explanation": "Course Management umfasst die strategische Schlag- und Schlägerwahl, das Vermeiden von Risiken und das Anspielen der sicheren Grünbereiche."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Was bedeutet es, wenn ein Spieler ein 'Green in Regulation' (GIR) erzielt?",
    "a": [
      "Das Grün mit zwei Putts unter Par erreicht",
      "Das Grün mit dem ersten Schlag überquert",
      "Den Putter an jedem Loch getauscht",
      "Ohne Divots über die Spielbahn gespielt"
    ],
    "correctIndex": 0,
    "exp": "Ein GIR liegt vor, wenn der Ball auf einem Par 3 mit Schlag 1, Par 4 mit Schlag 2 oder Par 5 mit Schlag 3 auf dem Grün liegt (zwei Putts zu Par).",
    "explanation": "Ein GIR liegt vor, wenn der Ball auf einem Par 3 mit Schlag 1, Par 4 mit Schlag 2 oder Par 5 mit Schlag 3 auf dem Grün liegt (zwei Putts zu Par)."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Welche Schlägerart wird verwendet, um den Ball auf dem Grün rollend in das Loch zu befördern?",
    "a": [
      "Der Putter mit planer Schlagfläche",
      "Das Sand Wedge mit breiter Sohle",
      "Das Eisen 7 für flache Flugkurven",
      "Das Hybrid mit Graphitschaft"
    ],
    "correctIndex": 0,
    "exp": "Der Putter besitzt nur ca. 2° bis 4° Loft und dient ausschließlich dazu, dem Golfball einen treuen, reinen Roll ohne Hüpfen zu verleihen.",
    "explanation": "Der Putter besitzt nur ca. 2° bis 4° Loft und dient ausschließlich dazu, dem Golfball einen treuen, reinen Roll ohne Hüpfen zu verleihen."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Warum schlägt man bei einem Standardschlag aus dem Grünbunker nicht den Ball, sondern den Sand vor dem Ball?",
    "a": [
      "Das Sandkissen hebt den Ball sanft heraus",
      "Der Ball würde sonst im Sand zerspringen",
      "Um den Schläger vor Abnutzung zu schonen",
      "Damit der Bunkersand im Loch verteilt wird"
    ],
    "correctIndex": 0,
    "exp": "Die Schlägersohle (Bounce) gleitet durch den Sand und das aufgeworfene Sandkissen befördert den Ball hoch und weich aus dem Bunker.",
    "explanation": "Die Schlägersohle (Bounce) gleitet durch den Sand und das aufgeworfene Sandkissen befördert den Ball hoch und weich aus dem Bunker."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Welcher Schlägertyp kombiniert die leichte Spielbarkeit eines Holzes mit der Präzision eines Eisens?",
    "a": [
      "Das klassische Driver-Holz",
      "Der moderne Hybrid-Schläger",
      "Das traditionelle Eisen 1",
      "Der breite Putter-Kopf"
    ],
    "correctIndex": 1,
    "exp": "Hybrids (auch Rescues genannt) ersetzen schwer zu treffende lange Eisen (Eisen 3, 4 oder 5) und sind ideal aus schwierigem Semi-Rough.",
    "explanation": "Hybrids (auch Rescues genannt) ersetzen schwer zu treffende lange Eisen (Eisen 3, 4 oder 5) und sind ideal aus schwierigem Semi-Rough."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Was versteht man im Golfsport unter dem Begriff 'Vorlegen' (Lay-up)?",
    "a": [
      "Das Aufnehmen des Balls vor der Linie",
      "Einen bewusst sicheren kürzeren Schlag",
      "Das Austauschen des Balls gegen ein Tee",
      "Einen Schlag mit maximalem Risiko"
    ],
    "correctIndex": 1,
    "exp": "Beim Lay-up schlägt man bewusst vor ein Wasserhindernis oder Bunker, um sich eine perfekte Distanz für den Annäherungsschlag zu verschaffen.",
    "explanation": "Beim Lay-up schlägt man bewusst vor ein Wasserhindernis oder Bunker, um sich eine perfekte Distanz für den Annäherungsschlag zu verschaffen."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Was bedeutet es, wenn ein Golfer auf einer Runde ein sogenanntes 'Up and Down' schafft?",
    "a": [
      "Vom Abschlag direkt auf das Grün treffen",
      "Mit zwei Schlägen von neben dem Grün einlochen",
      "Zwei Bogeys hintereinander ausgleichen",
      "Den Ball zweimal hintereinander toppen"
    ],
    "correctIndex": 1,
    "exp": "Ein 'Up and Down' gelingt, wenn man einen Chip oder Pitch aufs Grün schlägt ('Up') und mit dem ersten Putt verwandelt ('Down').",
    "explanation": "Ein 'Up and Down' gelingt, wenn man einen Chip oder Pitch aufs Grün schlägt ('Up') und mit dem ersten Putt verwandelt ('Down')."
  },
  {
    "cat": "golf_technik",
    "diff": "easy",
    "q": "Welches Schalenmaterial sorgt bei modernen Tour-Golfbällen für maximalen Spin und weiches Schlaggefühl?",
    "a": [
      "Eine Schale aus hartem Aluminium",
      "Eine Schale aus weichem Urethan",
      "Eine Hülle aus gebranntem Ton",
      "Eine Beschichtung aus Glasfaser"
    ],
    "correctIndex": 1,
    "exp": "Thermoset-Urethan ist das bevorzugte Schalenmaterial auf den Profitouren; es greift perfekt in die Rillen und liefert enormen Greenside-Spin.",
    "explanation": "Thermoset-Urethan ist das bevorzugte Schalenmaterial auf den Profitouren; es greift perfekt in die Rillen und liefert enormen Greenside-Spin."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Wodurch wird nach modernen Ballfluggesetzen (New Ball Flight Laws) die Startrichtung des Golfballs primär bestimmt?",
    "a": [
      "Ausschließlich durch den Schlägerschaft",
      "Primär durch die Schlagflächenstellung",
      "Nur durch den Stand der beiden Füße",
      "Primär durch den Schwungbahn-Winkel"
    ],
    "correctIndex": 1,
    "exp": "Radarmessungen (TrackMan) bewiesen: Die Schlagflächenausrichtung im Treffmoment steuert ca. 75–85 % der anfänglichen Startrichtung des Balls.",
    "explanation": "Radarmessungen bewiesen: Die Schlagflächenausrichtung steuert ca. 75–85 % der anfänglichen Ball-Startrichtung."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was bestimmt nach modernen Ballfluggesetzen, ob der Golfball im Flug eine Kurve (Spin) nach links oder rechts macht?",
    "a": [
      "Die Windgeschwindigkeit in der Luft",
      "Die Differenz zwischen Fläche und Bahn",
      "Das Gesamtgewicht des Golfballkerns",
      "Die Härte der Schuhspikes am Boden"
    ],
    "correctIndex": 1,
    "exp": "Die Differenz zwischen Schlagfläche (Face Angle) und Schwungbahn (Club Path) neigt die Spin-Achse des Balls und erzeugt die Kurve.",
    "explanation": "Die Differenz zwischen Schlagfläche und Schwungbahn bestimmt die Neigung der Spin-Achse und damit die seitliche Kurve."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Welche Kombination erzeugt bei einem Rechtshänder einen typischen Slice (Kurve weit nach rechts)?",
    "a": [
      "Innen-Außen-Bahn mit geschlossener Fläche",
      "Außen-Innen-Bahn mit offener Schlagfläche",
      "Gerade Bahn mit perfekt paralleler Fläche",
      "Steiler Eintreffwinkel mit neutralem Loft"
    ],
    "correctIndex": 1,
    "exp": "Ein Slice entsteht, wenn der Schläger von außen nach innen schwingt und die Schlagfläche relativ zur Schwungbahn offen steht.",
    "explanation": "Ein Slice entsteht, wenn der Schläger von außen nach innen schwingt und die Schlagfläche relativ zur Schwungbahn offen steht."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was bezeichnet der 'Lie-Winkel' (Lie Angle) bei einem Schlägerkopf?",
    "a": [
      "Den Neigungswinkel der Schlagfläche",
      "Den Winkel zwischen Schaft und Sohle",
      "Das Drehmoment des Graphitschafts",
      "Die Länge der Rillen auf der Fläche"
    ],
    "correctIndex": 1,
    "exp": "Der Lie-Winkel ist der Winkel zwischen Schaftachse und Schlägersohle. Passt er nicht, steht die Spitze oder Ferse im Treffmoment in der Luft.",
    "explanation": "Der Lie-Winkel ist der Winkel zwischen Schaftachse und Schlägersohle und bestimmt die Planlage des Schlägers im Treffmoment."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Wohin tendiert der Ballflug eines Rechtshänders, wenn der Lie-Winkel seiner Eisen viel zu aufrecht ('upright') ist?",
    "a": [
      "Der Ball startet tendenziell nach rechts",
      "Der Ball startet tendenziell nach links",
      "Der Ball verliert extrem viel Flugweite",
      "Der Ball erhält unkontrollierten Topspin"
    ],
    "correctIndex": 1,
    "exp": "Ist der Schläger zu upright, berührt die Ferse zuerst den Boden und die Schlagfläche zeigt nach links, was Schläge nach links begünstigt.",
    "explanation": "Ist der Schläger zu upright, zeigt die Schlagflächennormale nach links und der Ball startet links vom Ziel."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was versteht man unter dem 'Bounce' an der Sohle eines Sand Wedges?",
    "a": [
      "Die Biegsamkeit des Schlägerschafts beim Treffmoment",
      "Den Winkel zwischen Vorderkante und Sohlentiefpunkt",
      "Die Sprungkraft des Gummikerns im Golfballinneren",
      "Das Gewicht der Wolfram-Gewichte im Schlägerkopf"
    ],
    "correctIndex": 1,
    "exp": "Der Bounce-Winkel sorgt dafür, dass die Sohle auf Sand oder Gras abprallt ('bounced'), anstatt sich wie ein Spaten tief einzugraben.",
    "explanation": "Der Bounce-Winkel verhindert das Eingraben des Schlägers und lässt die Sohle über den Untergrund gleiten."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Wann ist ein Wedge mit niedrigem Bounce-Winkel (z. B. 4° bis 8°) besonders von Vorteil?",
    "a": [
      "Bei nassem, tiefem Morast und weichem Sand",
      "Bei harten, trockenen Böden und festem Sand",
      "Ausschließlich bei Schlägen aus dem Semirough",
      "Nur bei extrem steilen Bunkerschlägen ins Grün"
    ],
    "correctIndex": 1,
    "exp": "Niedriger Bounce gleitet besser unter den Ball auf harten Fairways oder festem Sand, während hoher Bounce dort abprallen und dünne Treffer verursachen würde.",
    "explanation": "Niedriger Bounce eignet sich für harte Böden und dünne Treffer zu vermeiden."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was beschreibt die Abkürzung 'MOI' (Moment of Inertia) bei modernen Schlägerköpfen?",
    "a": [
      "Die maximale Härte des verwendeten Titanmetalls",
      "Das Trägheitsmoment gegen Schlägerkopfverdrehung",
      "Die mittlere Schlägerkopfgeschwindigkeit im Schwung",
      "Den aerodynamischen Auftriebswert beim Treffer"
    ],
    "correctIndex": 1,
    "exp": "Ein hoher MOI-Wert bedeutet, dass sich der Schlägerkopf bei Treffern an Spitze oder Ferse kaum verdreht, was den Weitenverlust minimiert.",
    "explanation": "Ein hoher MOI (Trägheitsmoment) erhöht die Fehlerverzeihung bei außermittigen Treffern deutlich."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Wie berechnet sich der 'Smash Factor' bei der Schwunganalyse auf einem Launch Monitor?",
    "a": [
      "Schlägerkopf-Speed geteilt durch Ballgeschwindigkeit",
      "Ballgeschwindigkeit geteilt durch Schlägerkopf-Speed",
      "Abflugwinkel multipliziert mit der Spin-Rate des Balls",
      "Schlagdistanz dividiert durch das Schlägerkopfgewicht"
    ],
    "correctIndex": 1,
    "exp": "Der Smash Factor misst die Effizienz der Energieübertragung. Bei einem perfekten Treffer mit dem Driver liegt er bei ca. 1,48 bis 1,50.",
    "explanation": "Der Smash Factor (Ball Speed / Club Speed) misst die Effizienz der Energieübertragung im Treffmoment."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Welcher Schaftflex wird typischerweise für Golfer mit einer moderaten Schwunggeschwindigkeit (ca. 75–85 mph) empfohlen?",
    "a": [
      "Ein extrem harter Tour-Extra-Stiff-Schaft",
      "Ein Regular Flex oder Senior/Lite Flex",
      "Ein vollkommen starrer Stahlschaft ohne Biegung",
      "Ein überlanger Schaft mit Doppelknickpunkt"
    ],
    "correctIndex": 1,
    "exp": "Spieler mit moderaten Geschwindigkeiten profitieren von flexibleren Schäften (Regular/Lite), die mehr Peitscheneffekt und Höhe liefern.",
    "explanation": "Flexible Schafte helfen Golfern mit moderatem Tempo, mehr Schlägerkopf-Speed und Flughöhe zu erzeugen."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was versteht man unter 'Lag' in der Abschwungphase des Golfschwungs?",
    "a": [
      "Das absichtliche Verzögern des Durchschwungs im Treffmoment",
      "Das Beibehalten des Handgelenkwinkels bis kurz vor den Ball",
      "Das Nachschwingen des Schlägerschafts nach dem Ballkontakt",
      "Das Verlagern des Gewichts auf die hintere Fußspitze im Schwung"
    ],
    "correctIndex": 1,
    "exp": "Lag entsteht, wenn der Winkel zwischen Schlägerschaft und Unterarm im Abschwung lange gehalten wird, um sich explosiv im Treffmoment zu entladen.",
    "explanation": "Lag bezeichnet das späte Lösen der Handgelenkwinkel für maximale Schlägerkopfgeschwindigkeit."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was passiert bei einem 'starken Griff' (Strong Grip) bei einem rechtshändigen Golfer?",
    "a": [
      "Der Schläger wird mit maximaler Muskelkraft festgehalten",
      "Beide Hände sind auf dem Griff weiter nach rechts gedreht",
      "Die linke Hand greift deutlich unterhalb der rechten Hand",
      "Die Handgelenke werden während des Schwungs steif arretiert"
    ],
    "correctIndex": 1,
    "exp": "Beim starken Griff sieht der Spieler mehr Knöchel der linken Hand. Dies erleichtert das Schließen der Schlagfläche und bekämpft den Slice.",
    "explanation": "Ein starker Griff dreht die Hände nach rechts und begünstigt ein Schließen der Schlagfläche im Treffmoment."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was zeichnet den spektakulären 'Flop Shot' (bekannt durch Phil Mickelson) technisch aus?",
    "a": [
      "Extrem flacher Eintreffwinkel mit maximaler Rollphase",
      "Weit geöffnete Schlagfläche für steilen, weichen Flug",
      "Schlag mit dem Eisen 5 direkt aus tiefem Sandbunker",
      "Ballkontakt mit der Kante für schnelle Flachschüsse"
    ],
    "correctIndex": 1,
    "exp": "Beim Flop Shot wird ein Wedge mit 60° weit aufgedreht; der Schläger schneidet flach unter dem Ball durch und lässt ihn senkrecht stoppen.",
    "explanation": "Der Flop Shot erzeugt maximale Höhe und minimale Rollweite durch eine extrem geöffnete Schlagfläche."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was ist ein 'Punch Shot' und in welcher taktischen Spielsituation wird er typischerweise eingesetzt?",
    "a": [
      "Ein besonders harter voller Drive für Maximalweite",
      "Ein flacher Kontrollschlag bei starkem Gegenwind",
      "Ein kurzer Annäherungsschlag aus dem tiefen Wasser",
      "Ein Putter-Schlag von außerhalb des Fairways"
    ],
    "correctIndex": 1,
    "exp": "Beim Punch platziert man den Ball hinten im Stand und schwingt verkürzt durch, um den Ball flach unter Wind oder Baumästen durchzuhalten.",
    "explanation": "Ein Punch Shot hält die Flugbahn flach, um Windeinflüsse zu minimieren oder unter Ästen zu spielen."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Welcher Eintreffwinkel (Attack Angle) ist für maximale Weite mit dem Driver vom Tee ideal?",
    "a": [
      "Ein steil absteigender Eintreffwinkel von -5° bis -8°",
      "Ein leicht aufsteigender Winkel von etwa +2° bis +5°",
      "Ein vollkommen senkrechter Abstich in den Bodenbelag",
      "Ein Eintreffwinkel ohne jede Rotation des Schlägers"
    ],
    "correctIndex": 1,
    "exp": "Ein aufsteigender Eintreffwinkel ('Hit up on the ball') sorgt für hohen Ballabflug bei gleichzeitig geringer Spin-Rate – die Formel für Maximaldistanz.",
    "explanation": "Ein positiver Attack Angle maximiert die Carry-Distanz bei gleichzeitig optimal niedriger Spin-Rate."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Welcher Eintreffwinkel ist bei Schlägen mit den Eisen vom Fairway für sauberen Ballkontakt erforderlich?",
    "a": [
      "Ein stark aufsteigender Treffwinkel wie beim Drive vom Tee",
      "Ein waagerechter Flug des Schlägers knapp über den Spitzen",
      "Ein leicht absteigender Winkel mit Ballkontakt vor dem Boden",
      "Ein seitliches Hineindrehen des Schafts ohne Bodenkontakt"
    ],
    "correctIndex": 2,
    "exp": "Bei Eisen muss der Schläger zuerst den Ball treffen und danach den Boden (Divot nach dem Ball), um maximalen Spin und Kontrolle zu erzeugen.",
    "explanation": "Bei Eisenschlägen erfordert ein sauberer Treffer einen negativen Eintreffwinkel (Ball then turf)."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Welche ideale Spin-Rate beim Driver (in rpm) peilen Tour-Profis für optimale Gesamtdistanz an?",
    "a": [
      "Mehr als 5.000 Umdrehungen pro Minute für Flugzeit",
      "Weniger als 500 Umdrehungen für extremes Weitrollen",
      "Etwa 2.000 bis 2.500 Umdrehungen pro Minute",
      "Genau 8.000 Umdrehungen zur Stabilisierung im Wind"
    ],
    "correctIndex": 2,
    "exp": "Zwischen 2.000 und 2.500 rpm bietet der Ball perfekten Auftrieb ohne 'Ballooning' und rollt nach der Landung noch weit aus.",
    "explanation": "Ca. 2.000–2.500 rpm Spin beim Driver minimieren das Übersteigen des Balls und maximieren den Roll."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was versteht man unter dem aerodynamischen 'Magnus-Effekt' beim Flug des Golfballs?",
    "a": [
      "Die Verringerung des Luftwiderstands bei trockenem Wetter",
      "Die Anziehungskraft zwischen Golfschläger und Balloberfläche",
      "Den Auftrieb durch die Zirkulation des Rückwärtsdralls",
      "Die Verlangsamung der Rotation kurz vor dem Aufprall"
    ],
    "correctIndex": 2,
    "exp": "Der Backspin bewirkt, dass Luft oberhalb des rotierenden Balls schneller strömt als darunter; der Druckunterschied erzeugt aerodynamischen Auftrieb.",
    "explanation": "Der Magnus-Effekt erzeugt durch Rückwärtsdrall den Auftrieb, der den Golfball in der Luft hält."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was zeichnet einen 'Face-Balanced'-Putter im Vergleich zu einem Putter mit 'Toe Hang' aus?",
    "a": [
      "Der Schlägerkopf ist doppelt so schwer wie der Griff",
      "Die Schlagfläche ist um 15 Grad nach innen gekrümmt",
      "Die Schlagfläche zeigt beim Balancieren waagerecht nach oben",
      "Der Putterkopf besitzt keinerlei Ausrichtungslinien"
    ],
    "correctIndex": 2,
    "exp": "Balanciert man den Schaft auf dem Finger, bleibt die Schlagfläche horizontal. Ideal für Spieler mit einer geraden 'Straight-Back-Straight-Through'-Puttbewegung.",
    "explanation": "Face-Balanced Putter begünstigen eine geradlinige Pendelbewegung ohne starke Schlägerkopfrotation."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Für welche Puttbewegung ist ein Putter mit ausgeprägtem 'Toe Hang' (hängende Spitze) optimal konstruiert?",
    "a": [
      "Für eine vollkommen gerade Pendelbewegung ohne jede Drehung",
      "Ausschließlich für Putts aus mehr als zwanzig Metern Distanz",
      "Für eine bogenförmige Puttbewegung mit Öffnen und Schließen",
      "Nur für Linkshänder mit extrem aufrechter Standposition"
    ],
    "correctIndex": 2,
    "exp": "Schwingt der Putter auf einem Bogen ('Arc'), unterstützt die Gewichtsverteilung mit Toe Hang das natürliche Schließen der Schlagfläche.",
    "explanation": "Toe-Hang-Putter unterstützen eine bogenförmige Putt-Schwungbahn mit Schlägerkopfrotation."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was versteht man unter dem gefürchteten Phänomen der 'Yips' im kurzen Spiel?",
    "a": [
      "Das unabsichtliche Berühren des Balls mit der Schuhspitze",
      "Das versehentliche Benutzen eines falschen Golfballs",
      "Unwillkürliche Muskelzuckungen kurz vor dem Treffmoment",
      "Eine plötzliche Windböe während der Schwungausführung"
    ],
    "correctIndex": 2,
    "exp": "Die Yips sind eine neurologisch-mentale Blockade, die zu unkontrollierten Zuckungen im Handgelenk führt (u. a. erlitten von Langer und Ballesteros).",
    "explanation": "Yips sind unwillkürliche Muskelzuckungen im Treffmoment, die vor allem das Putten extrem erschweren."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was bedeutet der Begriff 'Grind' bei der Auswahl eines hochwertigen Wedges?",
    "a": [
      "Die Tiefe der Rillen auf der Schlägeroberfläche",
      "Die Farbgebung des Metalls im Schlägerkopfbereich",
      "Die spezielle Form und Fräsung der Schlägersohle",
      "Das Schärfen der Rillen nach einer langen Runde"
    ],
    "correctIndex": 2,
    "exp": "Der Grind schleift Material an Ferse, Spitze oder Hinterkante der Sohle weg, damit das Wedge auch bei geöffneter Schlagfläche flach am Boden liegt.",
    "explanation": "Der Sohlenschliff (Grind) modifiziert die Auflagefläche des Wedges für variable Schlagvarianten."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was versteht man unter dem Begriff 'Gear Effect' bei außermittigen Treffern mit dem Driver?",
    "a": [
      "Das Klicken des Schaftadapters beim Verstellen des Lofts",
      "Die Reibung zwischen den Schichten eines Mehrschalenballs",
      "Zahnradartiges Verdrehen erzeugt kompensierenden Gegendrall",
      "Die Übersetzung der Energie von der Hüfte in die Schulter"
    ],
    "correctIndex": 2,
    "exp": "Wird der Ball an der Spitze getroffen, verdreht sich der Kopf nach rechts, wodurch der Ball wie ein Zahnrad Gegendrall nach links (Draw) erhält.",
    "explanation": "Der Gear Effect wirkt wie zwei ineinandergreifende Zahnräder und erzeugt Spin zur Korrektur außermittiger Treffer."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Wie wirkt sich eine Schlägerkopf-Schwungbahn von 'innen nach außen' bei geschlossener Schlagfläche aus?",
    "a": [
      "Sie erzeugt einen hohen Slice, der weit nach rechts driftet",
      "Sie lässt den Ball völlig flach auf dem Boden weghoppeln",
      "Sie erzeugt einen Ball, der rechts startet und nach links kurvt",
      "Sie führt unausweichlich zu einem extremen Shank ins Aus"
    ],
    "correctIndex": 2,
    "exp": "Die Innen-Außen-Bahn startet den Ball nach rechts, die geschlossene Schlagfläche kippt die Spin-Achse nach links – das Rezept für einen Draw.",
    "explanation": "Eine Schwungbahn von innen nach außen mit geschlossener Schlagfläche erzeugt die typische Draw-Flugkurve."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was versteht man unter dem Begriff 'Kompression' bei einem Golfball?",
    "a": [
      "Die maximale Anzahl an Schlägen bis zur Ermüdung",
      "Den Luftdruck im Inneren der versiegelten Hülle",
      "Das Maß für die Härte und Verformbarkeit des Kerns",
      "Die Dicke der äußeren Urethanschicht in Millimetern"
    ],
    "correctIndex": 2,
    "exp": "Bälle mit niedriger Kompression (z. B. 40–60) verformen sich schon bei langsameren Schwüngen leicht und federn effizienter ab.",
    "explanation": "Die Ballkompression beziffert, wie stark sich der Kern im Treffmoment unter Krafteinwirkung komprimiert."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Welcher Ballflug entsteht bei einem 'Pull-Hook' eines rechtshändigen Golfers?",
    "a": [
      "Der Ball startet rechts vom Ziel und dreht sanft ins Fairway",
      "Der Ball steigt extrem steil empor und fällt kerzengerade herab",
      "Der Ball startet links vom Ziel und kurvt noch weiter nach links",
      "Der Ball rollt nach Bodenkontakt unberechenbar nach rechts weg"
    ],
    "correctIndex": 2,
    "exp": "Ein Pull-Hook resultiert aus einer Außen-Innen-Bahn mit stark geschlossener Schlagfläche – der Albtraum auf von Wald gesäumten Fairways.",
    "explanation": "Ein Pull-Hook startet durch die geschlossene Fläche links und dreht durch die Spin-Achse noch drastischer nach links."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was versteht man unter einem 'Push-Fade' bei einem rechtshändigen Golfer?",
    "a": [
      "Der Ball startet links vom Ziel und kurvt sanft zurück ins Fairway",
      "Der Ball landet auf dem Grün und rollt rückwärts aus dem Loch",
      "Der Ball startet rechts vom Ziel und driftet noch weiter nach rechts",
      "Der Ball verharrt ohne Rotation regungslos in der Luftströmung"
    ],
    "correctIndex": 2,
    "exp": "Ein Push-Fade startet rechts (durch eine offene Schlagfläche) und kurvt durch die noch weiter innen liegende Schwungbahn weiter nach rechts.",
    "explanation": "Ein Push-Fade kombiniert Rechtsstart mit zusätzlichem Rechtsdrall und landet meist weit im rechten Rough."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Wie sollte die Ballposition im Stand bei Schlägen mit dem Driver vom Tee gewählt werden?",
    "a": [
      "Exakt mittig zwischen beiden Füßen am Boden",
      "Deutlich hinter dem rechten Fuß platziert",
      "Gegenüber der Innenseite der vorderen Ferse",
      "Beliebig, da der Schlägerkopf das ausgleicht"
    ],
    "correctIndex": 2,
    "exp": "Der Ball liegt an der vorderen Ferse, damit der Schläger den Ball erst im leichten Aufwärtsschwung trifft.",
    "explanation": "Die Balllage an der vorderen Ferse begünstigt den optimalen Treffmoment im Aufwärtsschwung beim Drive."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was versteht man unter dem Begriff 'Schwungebene' (Swing Plane)?",
    "a": [
      "Das Plateau auf dem Grün, auf dem die Fahne steht",
      "Die Horizontlinie des Platzes bei Meeresspiegel",
      "Die Neigungsebene, auf der sich der Schläger bewegt",
      "Den Ausrichtungswinkel der Füße zum Zielobjekt"
    ],
    "correctIndex": 2,
    "exp": "Ben Hogan visualisierte die Schwungebene als Glasscheibe vom Ball bis zu den Schultern, durch die der Schläger schwingen sollte.",
    "explanation": "Die Schwungebene ist die geometrische Ebene, in der sich Schaft und Schlägerkopf im Schwung bewegen."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was beschreibt der Begriff 'Release' in der Treffmomentphase des Golfschwungs?",
    "a": [
      "Das Loslassen des Schlägergriffs mit der rechten Hand",
      "Das Absenken der Schultern vor dem ersten Rückschwung",
      "Die Freigabe der gespeicherten Energie durch den Ball",
      "Das Abbremsen des Körpers unmittelbar vor dem Kontakt"
    ],
    "correctIndex": 2,
    "exp": "Im Release entladen sich die Handgelenkswinkel, der Schlägerkopf überholt die Hände und schließt sich natürlich durch den Treffmoment.",
    "explanation": "Das Release ist die dynamische Entladung der Handgelenkwinkel für maximale Beschleunigung im Treffmoment."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was bedeutet der Begriff 'Takeaway' im Bewegungsablauf des Golfschwungs?",
    "a": [
      "Der Transport des Schlägersbags zum nächsten Abschlag",
      "Das Wegziehen des Bunkersandes nach dem Verlassen",
      "Die erste Phase des Rückschwungs bis zur Hüfthöhe",
      "Die Drehung des Kopfes zur Beurteilung des Ziels"
    ],
    "correctIndex": 2,
    "exp": "Ein ruhiges, weites 'One-Piece Takeaway' mit Schultern, Armen und Schläger als Dreieck bildet das Fundament eines wiederholbaren Schwungs.",
    "explanation": "Das Takeaway umfasst die Einleitung des Rückschwungs vom Ansprechen bis etwa Hüfthöhe."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Welche Funktion hat das Gegenüberstellen von 'Stiff' und 'Regular' Schäften beim Schlägerkauf?",
    "a": [
      "Die Festlegung der maximal erlaubten Schlägerlänge",
      "Die Einstufung des Spielers in Amateur- oder Profistatus",
      "Die Anpassung der Schaftsteifigkeit an das Schwungtempo",
      "Die Bestimmung des zulässigen Schlägerkopfgewichts"
    ],
    "correctIndex": 2,
    "exp": "Höhere Schwunggeschwindigkeiten (über 90–95 mph) benötigen steifere Schäfte (Stiff), um im Treffmoment nicht unkontrolliert nachzuhängen.",
    "explanation": "Die Schafthärte muss zur Schwunggeschwindigkeit passen, um Schlagflächenkontrolle und Ballflug zu optimieren."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was passiert, wenn ein Schlägerschaft für die Geschwindigkeit des Spielers viel zu weich ist?",
    "a": [
      "Der Ball fliegt extrem flach und schneidet immer nach rechts",
      "Der Schläger bricht garantiert bei den ersten Schwüngen ab",
      "Der Ball startet tendenziell zu hoch mit Streuung nach links",
      "Die Reichweite halbiert sich unabhängig vom getroffenen Punkt"
    ],
    "correctIndex": 2,
    "exp": "Ein zu weicher Schaft biegt sich vor dem Treffmoment zu stark vor (Lead deflection), erhöht den dynamischen Loft und schließt die Fläche.",
    "explanation": "Ein zu weicher Schaft führt zu unkontrolliert hohem Ballflug und verstärkter Streuung nach links."
  },
  {
    "cat": "golf_technik",
    "diff": "mid",
    "q": "Was passiert, wenn ein Schlägerschaft für die Geschwindigkeit des Golfers viel zu steif gewählt ist?",
    "a": [
      "Der Ball steigt steil wie eine Kerze senkrecht in die Höhe",
      "Der Schläger erzeugt extremen unerwünschten Hook-Drall",
      "Der Ball fliegt tendenziell zu flach und driftet nach rechts ab",
      "Der Ball beschleunigt ohne Schlägerkontakt von der Schlagfläche"
    ],
    "correctIndex": 2,
    "exp": "Ist der Schaft zu steif, kann der Spieler ihn nicht laden; die Schlagfläche bleibt leicht offen und der Ball startet flach und schwach nach rechts.",
    "explanation": "Ein zu steifer Schaft verhindert das optimale Schließen der Schlagfläche und resultiert in flachen Rechtsdrifts."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was besagt die 'Spin Loft'-Theorie in der modernen Radarmessung (TrackMan)?",
    "a": [
      "Die Anzahl der Dimples bestimmt direkt die Umdrehungszahl pro Sekunde",
      "Der Schaftflex multipliziert mit dem Kopfgewicht ergibt den Drall",
      "Der Loftwinkel des Schlägers bestimmt allein die Umdrehungsrate",
      "Differenz zwischen dynamischem Loft und Eintreffwinkel bestimmt Spin"
    ],
    "correctIndex": 3,
    "exp": "Spin Loft ist der 3D-Winkel zwischen der dynamischen Schlagflächennormale und dem Schwungbahnvektor; je größer er ist, desto mehr Spin entsteht.",
    "explanation": "Spin Loft ist der dreidimensionale Winkel zwischen dynamischem Loft und Attack Angle und steuert die Spin-Generierung."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was versteht man unter dem Begriff 'Bulge and Roll' auf der Schlagfläche von Hölzern und Drivern?",
    "a": [
      "Die Gewichtsverlagerung an den hinteren Rand der Sohle",
      "Das Abrollen des Balls auf dem Vorgrün vor dem Loch",
      "Die Verrundung der Leading Edge zum Schutz vor Graben",
      "Die horizontale und vertikale Wölbung der Schlagfläche"
    ],
    "correctIndex": 3,
    "exp": "Die Wölbung gleicht den Gear Effect aus: Spitzen-Treffer starten dank Bulge leicht nach rechts und kurven durch Gegendrall zurück ins Fairway.",
    "explanation": "Bulge (horizontale Wölbung) und Roll (vertikale Wölbung) nutzen den Gear Effect, um außermittige Treffer zu korrigieren."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Welche Auswirkung hat ein Schlägerkopf mit weit hinten und tief platziertem Schwerpunkt (Low and Deep CG)?",
    "a": [
      "Extrem flacher Ballabflug mit minimaler Fehlertoleranz",
      "Hohe Anfälligkeit für Verdrehen bei nicht mittigen Treffern",
      "Vollständige Eliminierung jeglicher Drehung des Golfballs",
      "Höherer Abflugwinkel, mehr Spin und maximales Trägheitsmoment"
    ],
    "correctIndex": 3,
    "exp": "Ein tiefer, weit hinten liegender Schwerpunkt erhöht das MOI, vergrößert den dynamischen Loft und hilft Amateuren, den Ball mühelos in die Luft zu bringen.",
    "explanation": "Ein tiefer, rückwärtiger Schwerpunkt fördert hohen Abflug, Stabilität bei Off-Center-Hits und höhere Spin-Raten."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was bewirkt ein weit vorne im Schlägerkopf (nahe der Schlagfläche) positionierter Schwerpunkt (Forward CG)?",
    "a": [
      "Maximaler Rückwärtsdrall für schnelles Stoppen auf hartem Boden",
      "Höchstmögliche Fehlerverzeihung bei Treffern an der Spitze",
      "Verstärkter Slice-Effekt bei allen Schlägen von der Teebox",
      "Geringerer Spin, flachere Flugkurve und höhere Ballgeschwindigkeit"
    ],
    "correctIndex": 3,
    "exp": "Forward CG reduziert Spin drastisch und wird von Tour-Pros mit sehr hohen Schwunggeschwindigkeiten für durchdringende Flugbahnen bevorzugt.",
    "explanation": "Ein Schwerpunkt nahe der Schlagfläche minimiert Spin und maximiert Ballgeschwindigkeit für High-Speed-Schwünge."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was versteht man unter dem Begriff 'Shaft Droop' (oder Toe Down) im Abschwung?",
    "a": [
      "Das Absinken der Hände unter die ursprüngliche Ansprechposition",
      "Das Zurückfallen des Schlägerkopfes hinter die Hände im Treffmoment",
      "Das Lockern des Griffs kurz vor dem Erreichen des Finishs",
      "Das Durchbiegen des Schlägers nach unten durch Zentrifugalkräfte"
    ],
    "correctIndex": 3,
    "exp": "Da der Schwerpunkt des Schlägerkopfs außerhalb der Schaftachse liegt, zieht die Fliehkraft den Kopf nach unten, wodurch der Schaft toe-down federt.",
    "explanation": "Shaft Droop beschreibt die Durchbiegung des Schafts nach unten im Abschwung infolge von Fliehkräften."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was versteht man unter dem 'Torsionsmoment' (Torque) eines Graphitschafts?",
    "a": [
      "Die maximale Bruchlast des Schafts bei Bodenkontakt",
      "Die Biegesteifigkeit im oberen Drittel nahe dem Griff",
      "Das Eigengewicht des Schaftrohrs in Gramm pro Meter",
      "Den Widerstand des Schafts gegen ein axiales Verwinden"
    ],
    "correctIndex": 3,
    "exp": "Torque wird in Grad gemessen (z. B. 2,5° bis 5°). Niedriger Torque (steife Torsion) stabilisiert die Schlagfläche bei schnellen Schwüngen.",
    "explanation": "Torque beziffert den Widerstand des Schafts gegen Verdrehen um die Längsachse im Schwung."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was ist der 'Kickpoint' (oder Biegepunkt) eines Golfschlägerschafts?",
    "a": [
      "Die genaue Stelle, an der der Schaft in den Kopf greift",
      "Die Markierung für die optimale Handposition am Griff",
      "Der Stoßdämpfereinsatz im Inneren moderner Schäfte",
      "Der Punkt maximaler Schaftbiegung während des Schwungs"
    ],
    "correctIndex": 3,
    "exp": "Ein hoher Kickpoint (nahe am Griff) erzeugt einen flacheren Ballabflug; ein tiefer Kickpoint (nahe am Kopf) lässt den Ball steiler starten.",
    "explanation": "Der Kickpoint bestimmt die Biegecharakteristik des Schafts und beeinflusst den dynamischen Abflugwinkel."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was versteht man unter dem 'COR-Wert' (Coefficient of Restitution) bei Schlägerköpfen?",
    "a": [
      "Die Korrosionsbeständigkeit der verchromten Oberfläche",
      "Den Reibungskoeffizienten der gefrästen Schlägerrillen",
      "Die Stärke der Verbundklebung zwischen Schaft und Hosel",
      "Das Maß für den Trampolineffekt der Schlagfläche"
    ],
    "correctIndex": 3,
    "exp": "Der COR-Wert misst den elastischen Stoß. Die R&A und USGA begrenzen ihn bei 0,830 (gemessen heute per Characteristic Time CT von maximal 239 µs).",
    "explanation": "Der COR-Wert beziffert den Trampolineffekt; Treffer über dem Grenzwert von 0,830 gelten als unzulässig (Non-Conforming)."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was misst der 'Characteristic Time' (CT-Test) der USGA und R&A an Driver-Köpfen?",
    "a": [
      "Die Lebensdauer des Schlägerkopfes bei Dauerbelastung im Simulator",
      "Die Zeitspanne, die ein Caddie zur Schlägerausgabe benötigt",
      "Die Abkühlzeit des Titans nach dem Schweißprozess im Werk",
      "Die Kontaktzeit einer Stahlkugel auf der Schlagfläche in Mikrosekunden"
    ],
    "correctIndex": 3,
    "exp": "Ein Pendelgerät feuert eine Kugel ab. Liegt die Kontaktzeit über 239 Mikrosekunden (+18 µs Toleranz), ist die Schlagfläche zu federnd und illegal.",
    "explanation": "Der CT-Test misst per Pendelkontakt die Federwirkung der Schlagfläche zur Einhaltung der Trampolin-Grenzwerte."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was versteht man unter der 'Schwunggewicht'-Skala (Swingweight, z. B. D2 oder D3)?",
    "a": [
      "Das absolute Gesamtgewicht des Schlägers auf einer Küchenwaage",
      "Die maximale Hebelkraft der Armmuskulatur des Golfspielers",
      "Die Steifigkeit des Schlägerkopfmaterials bei Kälteeinwirkung",
      "Das Verhältnis der Gewichtsverteilung zwischen Kopf und Griff"
    ],
    "correctIndex": 3,
    "exp": "Das Swingweight (gemessen von A0 bis G10 auf einer 14-Zoll-Waage) beschreibt, wie schwer sich der Schlägerkopf im Schwung anfühlt.",
    "explanation": "Swingweight misst die Massenverteilung und das gefühlte Kopfgewicht während der Schwungbewegung."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was beschreibt der Begriff 'Kinematic Sequence' (kinematische Kette) beim modernen Golfschwung?",
    "a": [
      "Die aerodynamische Abfolge von Dimple-Mustern auf der Ballhülle",
      "Die Reihenfolge der Schlägerreinigung nach einer gespielten Runde",
      "Die Abfolge von Probeschwüngen vor dem Ausführen des Abschlags",
      "Die zeitliche Beschleunigungsfolge von Becken, Brustkorb, Armen und Schläger"
    ],
    "correctIndex": 3,
    "exp": "Effiziente Schwünge beschleunigen und bremsen in perfekter Reihenfolge ab: Zuerst das Becken, dann der Torso, dann die Arme, zuletzt der Schläger.",
    "explanation": "Die kinematische Kette beschreibt den biomechanischen Energietransfer von den Beinen über den Rumpf bis in den Schläger."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was versteht man unter dem Begriff 'Ground Reaction Forces' (Bodenreaktionskräfte) im Golfschwung?",
    "a": [
      "Die Reibungskraft zwischen den Bunkerkörnern und der Schlägersohle",
      "Die Erschütterung des Fairways beim Aufprall eines geschlagenen Balls",
      "Die Bremswirkung von tiefem Rough auf die Schwunggeschwindigkeit",
      "Kräfte, die der Golfer durch Druck in den Boden für Schwungpower nutzt"
    ],
    "correctIndex": 3,
    "exp": "Moderne Biomechanik nutzt Kraftmessplatten: Vertikale Gegenkräfte (Push gegen den Boden) erzeugen maximale Rotationsgeschwindigkeit.",
    "explanation": "Bodenreaktionskräfte nutzen Newtons drittes Gesetz (Aktion gleich Reaktion) zur Erzeugung von Rotationskraft."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was bezeichnet der Begriff 'Dynamic Loft' im Unterschied zum statischen Loft des Schlägers?",
    "a": [
      "Die Veränderung des Lofts durch Sonneneinstrahlung auf dem Platz",
      "Der maximale Einstellbereich an verstellbaren Schlägerhosels",
      "Der rechnerische Durchschnittsloft aller vierzehn Schläger im Bag",
      "Der reale Schlagflächenwinkel genau im Moment des Ballkontakts"
    ],
    "correctIndex": 3,
    "exp": "Lehnt der Schlägerschaft im Treffmoment nach vorne (Forward Shaft Lean), sinkt der dynamische Loft unter den statischen Schlägerloft.",
    "explanation": "Der dynamische Loft ist der tatsächliche Wirkungsloft im Treffmoment unter Berücksichtigung der Schaftneigung."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was versteht man unter dem Begriff 'Zero Point' (oder Nullpunkt) beim Putter-Fitting?",
    "a": [
      "Das saubere Treffen des Bunkersandes ohne Staubentwicklung",
      "Die exakte Neigungskalibrierung von Lasern auf dem Grün",
      "Die vollkommene Windstille bei der Ballflug-Radarmessung",
      "Der Übergang vom Rutschen (Skid) zum reinen Vorwärtsrollen"
    ],
    "correctIndex": 3,
    "exp": "Nach dem Puttertreffer rutscht oder springt der Ball für einige Zentimeter, bevor Skid in True Roll (Vorwärtsroll) übergeht.",
    "explanation": "Der Übergang von anfänglichem Rutschen (Skid) zu echtem Vorwärtsrollen ist entscheidend für Längenkontrolle beim Putten."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was passiert bei einem 'Low-Spin'-Ball (Distance Ball mit Ionomer-Schale) bei Schlägen aus dem Rough?",
    "a": [
      "Der Ball gewinnt durch Grasreste an zusätzlichem Bremseffekt",
      "Der Schlägerkopf verhakt sich zwingend in den langen Grashalmen",
      "Die Flugweite verkürzt sich verlässlich um mindestens dreißig Meter",
      "Der Spin bricht massiv ein, was zu unberechenbaren 'Flyern' führen kann"
    ],
    "correctIndex": 3,
    "exp": "Gelangt Gras zwischen Ball und Schlagfläche, fällt die Spin-Rate drastisch ab; der Ball fliegt als 'Flyer' extrem weit über das Grün hinaus.",
    "explanation": "Gras zwischen Schläger und Ball reduziert den Spin drastisch und erzeugt unkontrolliert weite Flyer-Bälle."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Welche technische Auswirkung hat das Kürzen eines Schlägerschafts um ein halbes Inch auf das Swingweight?",
    "a": [
      "Das Swingweight steigt dramatisch um fünf Punkte in die D-Skala",
      "Das Swingweight bleibt physikalisch vollkommen unverändert",
      "Das Gesamtgewicht des Schlägerkopfs verdoppelt sich automatisch",
      "Das Swingweight sinkt spürbar um etwa drei Punkte (z. B. von D2 auf C9)"
    ],
    "correctIndex": 3,
    "exp": "Ein halbes Inch Kürzung am Schaftende reduziert das gefühlte Kopfgewicht um etwa drei Swingweight-Punkte; der Kopf fühlt sich leichter an.",
    "explanation": "Kürzen des Schafts um 0,5 Inch senkt das Schwunggewicht um circa 3 Punkte ab."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was versteht man unter dem Begriff 'Center of Gravity Height' (CG-Höhe) beim Driver-Kopf?",
    "a": [
      "Die Bauhöhe des Schlägerschafts gemessen vom Boden bis zum Hosel",
      "Die Höhe des Teesteckers, der in den Boden gesteckt wird",
      "Den Abstand der obersten Schlägerrille zum Schlägerkronenrand",
      "Die vertikale Lage des Schwerpunkts relativ zur neutralen Achse"
    ],
    "correctIndex": 3,
    "exp": "Liegt der Schwerpunkt unterhalb der 'Neutral Axis' (Null-Schwerpunktlinie), erzeugen Treffer oberhalb des Zentrums extrem wenig Spin und maximale Weite.",
    "explanation": "Ein Schwerpunkt unterhalb der Neutral Axis ermöglicht High-Launch-Low-Spin-Drives bei Treffern über dem Sweetspot."
  },
  {
    "cat": "golf_technik",
    "diff": "pro",
    "q": "Was versteht man unter der 'Stimp'-Zahl (Stimpmeter) bei der Vermessung von Putting Greens?",
    "a": [
      "Die Bodenhärte des Grüns gemessen mit einem Stahlprüfstempel",
      "Die Dichte der Grashalme pro Quadratzentimeter Rasenfläche",
      "Die Neigung des Gefälles in Prozent zur Hauptwindrichtung",
      "Die Ausrollweite eines Balls in Fuß auf einer genormten Rampe"
    ],
    "correctIndex": 3,
    "exp": "Ein Stimpmeter lässt Bälle aus einer V-förmigen Alurampe rollen; rollt der Ball 12 Fuß weit, hat das Grün ein Turniertempo von 'Stimp 12'.",
    "explanation": "Das Stimpmeter misst die Grünschnelligkeit anhand der Ausrollweite eines freigegebenen Balls in Fuß."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("golf_technik", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["golf_technik"] = DATA;
  }
})();
