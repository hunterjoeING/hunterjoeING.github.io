// Unified quiz bank for "md11" (75 questions: McDonnell Douglas MD-11)
(function () {
  const DATA = [
  {
    "cat": "technik",
    "diff": "easy",
    "q": "Was ist das auffälligste Erkennungsmerkmal an den Flügelspitzen der MD-11 im Vergleich zur älteren DC-10?",
    "a": [
      "Große Winglets mit einem nach oben und einem kleinen nach unten gerichteten Flügel",
      "Vollständig nach oben klappbare Flügelspitzen für schmale Parkpositionen",
      "Klassische runde Treibstoffzusatztanks an beiden äußeren Flügelenden",
      "Ein doppeldeckerartiger Hilfsflügel über den äußeren Querrudern"
    ],
    "explanation": "Die markanten Winglets der MD-11 besitzen neben dem großen oberen Winglet auch eine kleine untere Finne zur Reduktion von Randwirbeln.",
    "exp": "Die markanten Winglets der MD-11 besitzen neben dem großen oberen Winglet auch eine kleine untere Finne zur Reduktion von Randwirbeln."
  },
  {
    "cat": "technik",
    "diff": "easy",
    "q": "Wie viele Piloten bzw. Besatzungsmitglieder benötigt das moderne Cockpit einer MD-11 im regulären Flugbetrieb?",
    "a": [
      "Exakt zwei Personen (Kapitän und Erster Offizier ohne Flugingenieur)",
      "Drei Personen zwingend inklusive eines eigenen Flugingenieurs",
      "Vier Personen inklusive Navigator und zusätzlichem Funker",
      "Nur eine Person dank des ersten vollautonomen Flugleitsystems"
    ],
    "explanation": "Die MD-11 führte ein modernes Zwei-Personen-Glas-Cockpit mit sechs CRT-Bildschirmen ein und machte den Flugingenieur der DC-10 überflüssig.",
    "exp": "Die MD-11 führte ein modernes Zwei-Personen-Glas-Cockpit mit sechs CRT-Bildschirmen ein und machte den Flugingenieur der DC-10 überflüssig."
  },
  {
    "cat": "technik",
    "diff": "easy",
    "q": "Wie viele Strahltriebwerke treiben die McDonnell Douglas MD-11 insgesamt an?",
    "a": [
      "Drei Triebwerke (zwei unter den Flügeln und eines im Heckleitwerk)",
      "Vier Triebwerke (jeweils zwei unter beiden Tragflächen)",
      "Zwei Triebwerke (ausschließlich unter den Tragflächen montiert)",
      "Fünf Triebwerke mit zusätzlichem Booster im Heckkonus"
    ],
    "explanation": "Als klassischer Trijet besitzt die MD-11 zwei Pylon-Triebwerke unter den Flügeln und ein drittes Triebwerk direkt in der Basis des Seitenleitwerks.",
    "exp": "Als klassischer Trijet besitzt die MD-11 zwei Pylon-Triebwerke unter den Flügeln und ein drittes Triebwerk direkt in der Basis des Seitenleitwerks."
  },
  {
    "cat": "technik",
    "diff": "easy",
    "q": "Warum besitzt das Hauptfahrwerk der MD-11 in der Rumpfmitte ein zusätzliches mittleres Federbein?",
    "a": [
      "Um das enorme Abfluggewicht besser auf der Startbahn zu verteilen",
      "Um das Flugzeug im Falle eines geplatzten Flügelfahrwerks zu lenken",
      "Als Notfallstütze bei extremen Steigwinkeln nach dem Abheben",
      "Zur Aufnahme von Spezialbremsen für ultrakurze Landebahnen"
    ],
    "explanation": "Das zusätzliche Center-Gear mit zwei Rädern verteilt das maximale Startgewicht von über 280 Tonnen bodenschonend auf den Asphalt.",
    "exp": "Das zusätzliche Center-Gear mit zwei Rädern verteilt das maximale Startgewicht von über 280 Tonnen bodenschonend auf den Asphalt."
  },
  {
    "cat": "technik",
    "diff": "easy",
    "q": "Welche Bildschirmtechnologie prägte das originale Cockpit der MD-11 bei ihrer Indienststellung 1990?",
    "a": [
      "Sechs Kathodenstrahlröhren (CRT-Farbbildschirme)",
      "Großflächige Touchscreen-OLED-Monitore",
      "Ausschließlich bernsteinfarbene Monochrom-Displays",
      "Analoge Uhreninstrumente ohne digitale Monitore"
    ],
    "explanation": "Bei ihrem Debüt galt das Cockpit mit sechs farbigen Kathodenstrahlröhren (CRTs) als hochmodernes Vorzeigebeispiel für Automation.",
    "exp": "Bei ihrem Debüt galt das Cockpit mit sechs farbigen Kathodenstrahlröhren (CRTs) als hochmodernes Vorzeigebeispiel für Automation."
  },
  {
    "cat": "technik",
    "diff": "easy",
    "q": "Um wie viele Meter ist der Rumpf der MD-11 gegenüber der Vorgängerin DC-10 ungefähr gestreckt worden?",
    "a": [
      "Um rund 5,7 Meter durch zwei Rumpfsektionen vor und hinter den Flügeln",
      "Um exakt 15,2 Meter durch einen komplett neuen Mittelrumpf",
      "Gar nicht, die Rumpflänge blieb bis auf die Heckspitze identisch",
      "Um knapp 1,2 Meter ausschließlich am verlängerten Heckkonus"
    ],
    "explanation": "Zwei Rumpfplugs (3,05 m vor der Tragfläche und 2,60 m dahinter) machten die MD-11 insgesamt gut 5,66 Meter länger als die DC-10-30.",
    "exp": "Zwei Rumpfplugs (3,05 m vor der Tragfläche und 2,60 m dahinter) machten die MD-11 insgesamt gut 5,66 Meter länger als die DC-10-30."
  },
  {
    "cat": "technik",
    "diff": "mid",
    "q": "Warum wurde das Höhenleitwerk (Horizontal Stabilizer) der MD-11 gegenüber der DC-10 um rund 30 Prozent verkleinert?",
    "a": [
      "Um aerodynamischen Widerstand und Gewicht auf Langstrecken spürbar zu senken",
      "Weil durch den vergrößerten Rumpf weniger Steuerkräfte nötig waren",
      "Damit das Hecktriebwerk mehr ungestörte Luftzufuhr von oben erhält",
      "Um die Bodenfreiheit bei extremen Heckberührungen zu vergrößern"
    ],
    "explanation": "Das kleinere Höhenleitwerk verringerte den Trimm- und Reibungswiderstand erheblich, erforderte aber computergestützte Stabilitätshilfen.",
    "exp": "Das kleinere Höhenleitwerk verringerte den Trimm- und Reibungswiderstand erheblich, erforderte aber computergestützte Stabilitätshilfen."
  },
  {
    "cat": "technik",
    "diff": "mid",
    "q": "Wofür steht das entscheidende Flugsteuersystem LSAS in der MD-11?",
    "a": [
      "Longitudinal Stability Augmentation System zur Nickachsen-Stabilisierung",
      "Lateral Steering Auto System zur Seitenwind-Korrektur beim Rollen",
      "Low Speed Anti-Stall System zum automatischen Notabfangen",
      "Landing Surface Alert System zur Warnung vor unebenen Pisten"
    ],
    "explanation": "LSAS gleicht die reduzierte aerodynamische Längsstabilität des kleinen Höhenleitwerks durch automatische Trimm- und Rudereingriffe aus.",
    "exp": "LSAS gleicht die reduzierte aerodynamische Längsstabilität des kleinen Höhenleitwerks durch automatische Trimm- und Rudereingriffe aus."
  },
  {
    "cat": "technik",
    "diff": "mid",
    "q": "Wo befindet sich bei der MD-11 ein spezieller Treibstofftank, der während des Reiseflugs aktiv zur Schwerpunktoptimierung genutzt wird?",
    "a": [
      "Im horizontalen Höhenleitwerk (Horizontal Stabilizer)",
      "Direkt in der druckbelüfteten Passagierkabine unter dem Gang",
      "In den hohlen Flügelspitzen direkt neben den Winglets",
      "Im doppelten Boden des vorderen Fahrwerksschachts"
    ],
    "explanation": "Der Tail Fuel Tank im Höhenleitwerk fasst rund 7.500 Liter. Durch Umpumpen nach hinten wandert der Schwerpunkt nach hinten, was Trimmwiderstand spart.",
    "exp": "Der Tail Fuel Tank im Höhenleitwerk fasst rund 7.500 Liter. Durch Umpumpen nach hinten wandert der Schwerpunkt nach hinten, was Trimmwiderstand spart."
  },
  {
    "cat": "technik",
    "diff": "mid",
    "q": "Wie werden die primären Steuerflächen der MD-11 mechanisch und hydraulisch bewegt?",
    "a": [
      "Über konventionelle Seilzüge zu hydraulischen Servoventilen mit Rechnerunterstützung",
      "Vollständig digital über reines Fly-by-Wire ohne jede Seilverbindung",
      "Ausschließlich durch elektrische Spindeltriebe ohne Hydrauliköl",
      "Durch pneumatischen Druck aus der Triebwerkszapfluft"
    ],
    "explanation": "Die MD-11 ist kein reines Fly-by-Wire-Flugzeug wie die A320; Steuerhörner und Pedale steuern Hydraulikaktoren über klassische Steuerseile an.",
    "exp": "Die MD-11 ist kein reines Fly-by-Wire-Flugzeug wie die A320; Steuerhörner und Pedale steuern Hydraulikaktoren über klassische Steuerseile an."
  },
  {
    "cat": "technik",
    "diff": "mid",
    "q": "Über wie viele voneinander unabhängige Hydrauliksysteme verfügt die McDonnell Douglas MD-11?",
    "a": [
      "Drei voneinander unabhängige Hydrauliksysteme (System 1, 2 und 3)",
      "Zwei redundante Systeme mit zusätzlicher Handpumpe im Cockpit",
      "Vier separate Hydraulikschleifen wie in der Boeing 747",
      "Ein einziges zentrales Hochdrucksystem mit Ringleitungen"
    ],
    "explanation": "Drei Hydrauliksysteme versorgen Flugsteuerungen und Fahrwerk. Jedes Triebwerk treibt primär eine der drei Hydraulikpumpen an.",
    "exp": "Drei Hydrauliksysteme versorgen Flugsteuerungen und Fahrwerk. Jedes Triebwerk treibt primär eine der drei Hydraulikpumpen an."
  },
  {
    "cat": "technik",
    "diff": "mid",
    "q": "Was zeichnet die Landegeschwindigkeit (Vref) einer voll beladenen MD-11 im Vergleich zu vielen anderen Großraumjets aus?",
    "a": [
      "Sie ist mit bis zu 155 bis 160 Knoten spürbar höher als bei vielen Zweistrahlern",
      "Sie ist mit unter 110 Knoten außergewöhnlich langsam und gutmütig",
      "Sie entspricht exakt der Landegeschwindigkeit einer kleinen Cessna 172",
      "Sie wird durch Vorflügel stets starr auf genau 130 Knoten begrenzt"
    ],
    "explanation": "Aufgrund des kleineren Flügels und der hohen Flächenbelastung nähert sich die MD-11 der Piste oft mit rasanten 150 bis 160 Knoten Vref.",
    "exp": "Aufgrund des kleineren Flügels und der hohen Flächenbelastung nähert sich die MD-11 der Piste oft mit rasanten 150 bis 160 Knoten Vref."
  },
  {
    "cat": "technik",
    "diff": "pro",
    "q": "Welche Funktion hat das sogenannte RCWS (Roll Control Wheel Steering) im Autopilotensystem der MD-11?",
    "a": [
      "Es hält nach manueller Querruder-Eingabe den gewählten Querneigungswinkel automatisch",
      "Es verhindert das Ausfahren des Fahrwerks bei mehr als 10 Grad Schräglage",
      "Es koppelt das Bugrad beim Rollen auf dem Vorfeld direkt an das Querruder",
      "Es aktiviert automatisch die Störklappen bei asymmetrischem Schub"
    ],
    "explanation": "RCWS unterstützt den Piloten bei manueller Steuerung, indem es Querlagen bis 30 Grad nach Loslassen des Horns automatisch stabil weiterfliegt.",
    "exp": "RCWS unterstützt den Piloten bei manueller Steuerung, indem es Querlagen bis 30 Grad nach Loslassen des Horns automatisch stabil weiterfliegt."
  },
  {
    "cat": "technik",
    "diff": "pro",
    "q": "Was passiert automatisch mit dem Treibstoff im Höhenleitwerkstank (Tail Tank), wenn die MD-11 in den Sinkflug übergeht?",
    "a": [
      "Der Treibstoff wird automatisch nach vorne in die Haupttanks umgepumpt",
      "Der Restsprit wird zur Gewichtsreduktion zwingend über Düsen abgelassen",
      "Er wird hermetisch verriegelt und dient als Ballastgewicht bei der Landung",
      "Er wird ausschließlich direkt in das Hecktriebwerk Nummer 2 eingespeist"
    ],
    "explanation": "Vor der Landung muss der Schwerpunkt wieder nach vorne wandern; das Treibstoffsystem pumpt den Heckinhalt automatisch in die Flügeltanks um.",
    "exp": "Vor der Landung muss der Schwerpunkt wieder nach vorne wandern; das Treibstoffsystem pumpt den Heckinhalt automatisch in die Flügeltanks um."
  },
  {
    "cat": "technik",
    "diff": "pro",
    "q": "Welches ungewöhnliche Phänomen erschwerte frühen MD-11-Piloten das feinfühlige Abfangen (Flare) bei der Landung?",
    "a": [
      "Eine spürbare Steuerverzögerung und Nick-Empfindlichkeit bei geringer Höhenleitwerksdämpfung",
      "Ein plötzlicher Strömungsabriss an den Winglets bereits bei 5 Grad Anstellwinkel",
      "Ein starkes Wegdrehen nach links durch die ungerade Zahl der Triebwerke",
      "Ein vollständiger Ausfall des künstlichen Horizonts beim Ausfahren der Landeklappen"
    ],
    "explanation": "Wegen des kleinen Höhenleitwerks reagiert die MD-11 im Flare sehr empfindlich auf Überkorrekturen, was zu gefürchteten harten Aufsetzern führen konnte.",
    "exp": "Wegen des kleinen Höhenleitwerks reagiert die MD-11 im Flare sehr empfindlich auf Überkorrekturen, was zu gefürchteten harten Aufsetzern führen konnte."
  },
  {
    "cat": "technik",
    "diff": "pro",
    "q": "Aus welchem Werkstoff bestehen wesentliche Teile des Hecktriebwerkseinlaufs und der Steuerflächen der MD-11 zur Gewichtseinsparung?",
    "a": [
      "Aus kohlenstofffaser- und glasfaserverstärkten Verbundwerkstoffen (CFK/GFK)",
      "Aus reinem gegossenem Magnesium ohne Legierungszusätze",
      "Aus massivem Walzstahl mit hochfester Titanbeschichtung",
      "Aus imprägniertem Buchenschichtholz mit Aluminiumfolie"
    ],
    "explanation": "McDonnell Douglas setzte an Verkleidungen, Rudern und Triebwerkseinläufen umfangreich moderne Verbundwerkstoffe ein.",
    "exp": "McDonnell Douglas setzte an Verkleidungen, Rudern und Triebwerkseinläufen umfangreich moderne Verbundwerkstoffe ein."
  },
  {
    "cat": "technik",
    "diff": "pro",
    "q": "Wie wird das mittlere Triebwerk (Triebwerk 2) im Heckleitwerk der MD-11 bei einem Triebwerksbrand gelöscht?",
    "a": [
      "Durch zwei ferngesteuerte Halon-Löschflaschen im hinteren Rumpfbereich",
      "Durch automatisches Fluten des Triebwerksschachts mit kaltem Kerosin",
      "Ausschließlich durch Ausblasen der Flammen mit vollem Verdichterdruck",
      "Durch Einleiten von Stickstoff direkt aus dem Fahrwerksraum"
    ],
    "explanation": "Wie bei den Flügeltriebwerken stehen auch für das Triebwerk 2 elektromechanisch ausgelöste Feuerlöschkugeln mit Halon zur Verfügung.",
    "exp": "Wie bei den Flügeltriebwerken stehen auch für das Triebwerk 2 elektromechanisch ausgelöste Feuerlöschkugeln mit Halon zur Verfügung."
  },
  {
    "cat": "technik",
    "diff": "pro",
    "q": "Welche maximale Startmasse (MTOW) erreichte die verstärkte Frachtversion MD-11F in ihrer schwersten Ausführung?",
    "a": [
      "Rund 286.000 kg (ca. 630.500 lbs)",
      "Knapp 195.000 kg (ca. 430.000 lbs)",
      "Über 380.000 kg (ca. 837.000 lbs)",
      "Exakt 500.000 kg (ca. 1.100.000 lbs)"
    ],
    "explanation": "Die schwerste Frachtvariante (Heavy Gross Weight) der MD-11F bot 285.990 kg MTOW für maximale Langstrecken-Nutzlast.",
    "exp": "Die schwerste Frachtvariante (Heavy Gross Weight) der MD-11F bot 285.990 kg MTOW für maximale Langstrecken-Nutzlast."
  },
  {
    "cat": "technik",
    "diff": "pro",
    "q": "Welches System verhindert bei der MD-11 zuverlässig tail strikes beim Startlauf durch zu rasches Ziehen am Steuerhorn?",
    "a": [
      "Ein Pitch-Rate-Begrenzer in der Flugsteuerungs-Software (LSAS-Pitch-Attitude-Protection)",
      "Ein ausfahrbares Spornrad aus massivem Gummi am hinteren Rumpfboden",
      "Ein akustischer Lautsprecher, der dem Kapitän Warnsignale ins Ohr ruft",
      "Ein Sensor, der bei Bodenberührung sofort die Triebwerke drosselt"
    ],
    "explanation": "Spätere LSAS-Softwareversionen führten Pitch-Rate-Begrenzungen ein, um ein Überziehen und Heckaufschläge beim Abheben zu verhindern.",
    "exp": "Spätere LSAS-Softwareversionen führten Pitch-Rate-Begrenzungen ein, um ein Überziehen und Heckaufschläge beim Abheben zu verhindern."
  },
  {
    "cat": "triebwerke",
    "diff": "easy",
    "q": "Welche zwei großen Triebwerkshersteller boten Antriebe für die McDonnell Douglas MD-11 an?",
    "a": [
      "General Electric (GE) und Pratt & Whitney (PW)",
      "Rolls-Royce und CFM International",
      "Klimow und Snecma Aerospace",
      "Turbomeca und Williams International"
    ],
    "explanation": "Kunden konnten zwischen dem General Electric CF6-80C2 und dem Pratt & Whitney PW4460/4462 wählen.",
    "exp": "Kunden konnten zwischen dem General Electric CF6-80C2 und dem Pratt & Whitney PW4460/4462 wählen."
  },
  {
    "cat": "triebwerke",
    "diff": "easy",
    "q": "Welche Triebwerksbezeichnung trägt das beliebte General-Electric-Triebwerk an vielen MD-11-Maschinen?",
    "a": [
      "General Electric CF6-80C2D1F",
      "General Electric GE90-115B",
      "General Electric GEnx-1B70",
      "General Electric CFM56-5B"
    ],
    "explanation": "Das CF6-80C2 in der D1F-Variante war der dominierende Antrieb und leistete rund 273 kN Startschub pro Triebwerk.",
    "exp": "Das CF6-80C2 in der D1F-Variante war der dominierende Antrieb und leistete rund 273 kN Startschub pro Triebwerk."
  },
  {
    "cat": "triebwerke",
    "diff": "easy",
    "q": "Welches Pratt & Whitney-Triebwerksmodell kam an der MD-11 zum Einsatz?",
    "a": [
      "Pratt & Whitney PW4460 bzw. PW4462",
      "Pratt & Whitney JT8D-219",
      "Pratt & Whitney PW1000G Geared Turbofan",
      "Pratt & Whitney PT6A Turboprop"
    ],
    "explanation": "Die PW4000-Familie trieb u. a. die MD-11-Flotten von Swissair, Delta Air Lines und FedEx an.",
    "exp": "Die PW4000-Familie trieb u. a. die MD-11-Flotten von Swissair, Delta Air Lines und FedEx an."
  },
  {
    "cat": "triebwerke",
    "diff": "easy",
    "q": "Wie wird der Triebwerksschub bei der Landung der MD-11 zum Abbremsen umgelenkt?",
    "a": [
      "Über aerodynamische Schubumkehrer (Thrust Reverser) an allen drei Triebwerken",
      "Ausschließlich über Bremsschirme am Heck des Flugzeugs",
      "Durch vollständiges Abschalten und Blockieren aller Schaufeln",
      "Nur an Triebwerk 2 im Heck, die Flügeltriebwerke laufen leer mit"
    ],
    "explanation": "Alle drei Triebwerke verfügen über kaskadenförmige Schubumkehrer, die den Fan-Luftstrom nach vorne leiten.",
    "exp": "Alle drei Triebwerke verfügen über kaskadenförmige Schubumkehrer, die den Fan-Luftstrom nach vorne leiten."
  },
  {
    "cat": "triebwerke",
    "diff": "easy",
    "q": "Wie gelangt die Luft in das Hecktriebwerk (Triebwerk 2) der MD-11?",
    "a": [
      "Gerade durch einen geradlinigen Lufteinlaufschacht direkt an der Basis des Seitenleitwerks",
      "Über einen langen, geschwungenen S-Duct-Kanal wie bei der Lockheed L-1011",
      "Durch Schlitze an beiden Seiten des Passagierkabinenbodens",
      "Über einen Lufthutzen auf der Nase des Flugzeugs"
    ],
    "explanation": "Die MD-11 behielt den geraden Banjo-Einlass der DC-10 bei, während die L-1011 TriStar einen gekrümmten S-Kanal nutzte.",
    "exp": "Die MD-11 behielt den geraden Banjo-Einlass der DC-10 bei, während die L-1011 TriStar einen gekrümmten S-Kanal nutzte."
  },
  {
    "cat": "triebwerke",
    "diff": "easy",
    "q": "Wo befindet sich das Hilfstriebwerk (APU, Auxiliary Power Unit) der MD-11?",
    "a": [
      "Ganz hinten im äußersten Heckkonus hinter Triebwerk 2",
      "Im Bugfahrwerksschacht hinter der Radarantenne",
      "In einer Gondel unter der linken Tragfläche",
      "Direkt hinter dem Cockpitsitz des Kapitäns"
    ],
    "explanation": "Die Hilfsgasturbine sitzt im Heckkonus unterhalb des Leitwerks und liefert Strom und Druckluft am Boden oder im Notfall.",
    "exp": "Die Hilfsgasturbine sitzt im Heckkonus unterhalb des Leitwerks und liefert Strom und Druckluft am Boden oder im Notfall."
  },
  {
    "cat": "triebwerke",
    "diff": "mid",
    "q": "Warum zog der britische Hersteller Rolls-Royce sein Angebot für ein RB211-Triebwerk an der MD-11 wieder zurück?",
    "a": [
      "Weil Modifikationen am Heck für den größeren Triebwerksdurchmesser zu teuer geworden wären",
      "Weil die britische Regierung jeden Export in die USA untersagte",
      "Weil Rolls-Royce kurz vor dem Erstflug der MD-11 Insolvenz anmeldete",
      "Weil Trijet-Flugzeuge laut EU-Recht verboten werden sollten"
    ],
    "explanation": "Der Einbau des RB211-524L hätte aufwendige strukturelle Änderungen an der Rumpfheck-Aufhängung erfordert, weshalb Rolls-Royce ausstieg.",
    "exp": "Der Einbau des RB211-524L hätte aufwendige strukturelle Änderungen an der Rumpfheck-Aufhängung erfordert, weshalb Rolls-Royce ausstieg."
  },
  {
    "cat": "triebwerke",
    "diff": "mid",
    "q": "Welches Problem hatten die Triebwerke der MD-11 in den ersten Betriebsjahren nach 1990?",
    "a": [
      "Der reale Treibstoffverbrauch lag spürbar über den garantierten Herstellerwerten",
      "Sie froren in Reiseflughöhe regelmäßig wegen fehlerhafter Enteisung ein",
      "Die Schubumkehr ließ sich nach der Landung nicht mehr einfahren",
      "Die Triebwerke erzeugten so starke Vibrationen, dass Scheiben barsten"
    ],
    "explanation": "Die MD-11 verfehlte anfangs ihre Reichweitenziele um bis zu 8 %, weil Triebwerke und Flugzeug mehr Kerosin schluckten als versprochen.",
    "exp": "Die MD-11 verfehlte anfangs ihre Reichweitenziele um bis zu 8 %, weil Triebwerke und Flugzeug mehr Kerosin schluckten als versprochen."
  },
  {
    "cat": "triebwerke",
    "diff": "mid",
    "q": "Wie reagierten McDonnell Douglas und die Triebwerksbauer auf die anfänglichen Reichweiten-Defizite der MD-11?",
    "a": [
      "Mit dem mehrstufigen Performance Improvement Program (PIP) zur aerodynamischen Optimierung",
      "Durch den sofortigen Ausbau des dritten Triebwerks zur Gewichtsreduktion",
      "Durch ein dauerhaftes Passagierlimit von maximal 100 Fluggästen",
      "Mit dem Einbau von Feststoff-Raketenboostern für den Start"
    ],
    "explanation": "Das PIP-Programm verbesserte Pylonverkleidungen, Lufteinläufe und Triebwerkskomponenten schrittweise und stellte die Reichweite weitgehend her.",
    "exp": "Das PIP-Programm verbesserte Pylonverkleidungen, Lufteinläufe und Triebwerkskomponenten schrittweise und stellte die Reichweite weitgehend her."
  },
  {
    "cat": "triebwerke",
    "diff": "mid",
    "q": "Wie steuert die Triebwerksregelung FADEC die Triebwerke der MD-11?",
    "a": [
      "Voll digital über zwei redundante Rechnerkanäle pro Triebwerk ohne mechanische Gestänge",
      "Rein pneumatisch über Membranventile und Unterdruckschläuche",
      "Manuell über handbediente Bowdenzüge direkt zur Kerosinpumpe",
      "Ausschließlich über Signale von Bodenfunkstationen"
    ],
    "explanation": "FADEC (Full Authority Digital Engine Control) überwacht und regelt Schub, Gemisch und Verdichterstufen hochpräzise digital.",
    "exp": "FADEC (Full Authority Digital Engine Control) überwacht und regelt Schub, Gemisch und Verdichterstufen hochpräzise digital."
  },
  {
    "cat": "triebwerke",
    "diff": "mid",
    "q": "Welchen Gesamtschub erzeugen die drei Triebwerke einer MD-11 beim Start ungefähr?",
    "a": [
      "Rund 800 bis 820 Kilonewton (ca. 180.000 lbs Gesamt-Schub)",
      "Knapp 250 Kilonewton (ca. 55.000 lbs Gesamt-Schub)",
      "Über 1.800 Kilonewton (ca. 400.000 lbs Gesamt-Schub)",
      "Rund 120 Kilonewton (ca. 27.000 lbs Gesamt-Schub)"
    ],
    "explanation": "Mit etwa 270 kN Einzelschub pro Triebwerk bringt es das Trio zusammen auf mehr als 800 kN Startschub.",
    "exp": "Mit etwa 270 kN Einzelschub pro Triebwerk bringt es das Trio zusammen auf mehr als 800 kN Startschub."
  },
  {
    "cat": "triebwerke",
    "diff": "mid",
    "q": "Was passiert bei einem Ausfall des Hecktriebwerks (Triebwerk 2) im Reiseflug im Vergleich zu einem Flügeltriebwerksausfall?",
    "a": [
      "Es entsteht kaum asymmetrischer Giermoment, da die Schublinie genau auf der Rumpfmittelachse liegt",
      "Das Flugzeug gerät sofort in ein unkontrollierbares Flachtrudeln",
      "Beide Flügeltriebwerke schalten sich aus Sicherheitsgründen automatisch ab",
      "Das Heck bricht schlagartig nach oben aus und zwingt zum Sturzflug"
    ],
    "explanation": "Weil Triebwerk 2 zentral in der Flugzeugachse liegt, führt sein Ausfall zu fast keinem Gieren – im Gegensatz zu den Flügeltriebwerken.",
    "exp": "Weil Triebwerk 2 zentral in der Flugzeugachse liegt, führt sein Ausfall zu fast keinem Gieren – im Gegensatz zu den Flügeltriebwerken."
  },
  {
    "cat": "triebwerke",
    "diff": "pro",
    "q": "Welcher aerodynamische Nick-Effekt tritt auf, wenn am Hecktriebwerk der MD-11 plötzlich voller Startschub gegeben wird?",
    "a": [
      "Ein leichtes kopflastiges Nickmoment, da die Schublinie oberhalb des Gesamtschwerpunkts liegt",
      "Ein extremes hecklastiges Aufbäumen durch den Schubvektor von unten",
      "Eine sofortige Rechtskurve durch den Triebwerksdrall des Fans",
      "Gar kein Moment, da die Triebwerksachse exakt den Schwerpunkt schneidet"
    ],
    "explanation": "Weil Triebwerk 2 hoch oben im Heck thront, drückt sein Schubimpuls die Nase des Flugzeugs physikalisch leicht nach unten.",
    "exp": "Weil Triebwerk 2 hoch oben im Heck thront, drückt sein Schubimpuls die Nase des Flugzeugs physikalisch leicht nach unten."
  },
  {
    "cat": "triebwerke",
    "diff": "pro",
    "q": "Wie wird Triebwerk 2 der MD-11 bei Wartungsarbeiten oder Triebwerkswechseln am Heck demontiert?",
    "a": [
      "Mit Spezialhebekränen oder fahrbaren Hebebühnen direkt nach hinten-unten abgesenkt",
      "Durch Aufklappen der gesamten Seitenleitwerksflosse zur Seite",
      "Ausschließlich durch Zerteilen des Triebwerks in drei Segmente im Rumpf",
      "Über Schienen durch die hintere Passagierkabine nach vorne"
    ],
    "explanation": "Spezielle Hebevorrichtungen (Engine Cranes) erlauben den Tausch des Triebwerks 2 in luftiger Höhe von über 10 Metern über dem Hallenboden.",
    "exp": "Spezielle Hebevorrichtungen (Engine Cranes) erlauben den Tausch des Triebwerks 2 in luftiger Höhe von über 10 Metern über dem Hallenboden."
  },
  {
    "cat": "triebwerke",
    "diff": "pro",
    "q": "Welcher Fan-Durchmesser zeichnet das Pratt & Whitney PW4460-Triebwerk an der MD-11 aus?",
    "a": [
      "Rund 2,54 Meter (100 Zoll)",
      "Knapp 1,60 Meter (63 Zoll)",
      "Über 3,40 Meter (134 Zoll)",
      "Exakt 4,10 Meter (161 Zoll)"
    ],
    "explanation": "Der 100-Zoll-Bläser des PW4460 sorgt für einen hohen Nebenstromanteil und damals zeitgemäße Lärm- und Verbrauchswerte.",
    "exp": "Der 100-Zoll-Bläser des PW4460 sorgt für einen hohen Nebenstromanteil und damals zeitgemäße Lärm- und Verbrauchswerte."
  },
  {
    "cat": "triebwerke",
    "diff": "pro",
    "q": "Welches System sorgt dafür, dass bei Triebwerksausfall beim Start automatisch mehr Schub auf den verbleibenden Motoren freigegeben wird?",
    "a": [
      "Automatic Reserve Thrust (ART) bzw. Rated N1 Boost",
      "Emergency Afterburner Injection (EAI)",
      "Manual Overdrive Cable Override (MOCO)",
      "Compressor Stall Venting Lever (CSVL)"
    ],
    "explanation": "Fällt beim Startlauf ein Triebwerk aus, regelt das System die verbleibenden zwei Triebwerke automatisch auf Notfall-Maximalschub hoch.",
    "exp": "Fällt beim Startlauf ein Triebwerk aus, regelt das System die verbleibenden zwei Triebwerke automatisch auf Notfall-Maximalschub hoch."
  },
  {
    "cat": "triebwerke",
    "diff": "pro",
    "q": "Wie wird die Enteisung der Triebwerkseinläufe an der MD-11 realisiert?",
    "a": [
      "Durch heiße Zapfluft aus den Hochdruck-Verdichterstufen der Triebwerke",
      "Durch elektrische Heizdrähte in den Lippen der Triebwerkseinläufe",
      "Durch Besprühen mit Enteisungsflüssigkeit aus bordeigenen Tanks",
      "Durch pneumatisch aufblasbare Gummimatten an der Einlasskante"
    ],
    "explanation": "Triebwerkszapfluft (Bleed Air) heizt die Einlasslippen aller drei Triebwerke auf, um Eisansatz und gefürchteten Eis-Schlag zu verhindern.",
    "exp": "Triebwerkszapfluft (Bleed Air) heizt die Einlasslippen aller drei Triebwerke auf, um Eisansatz und gefürchteten Eis-Schlag zu verhindern."
  },
  {
    "cat": "triebwerke",
    "diff": "pro",
    "q": "Welche Besonderheit wies die Treibstoffzuführung zu Triebwerk 2 bei starkem Steigflug auf?",
    "a": [
      "Zusätzliche elektrische Boost-Pumpen sichern den Kerosindruck gegen die Schwerkrafthöhe ab",
      "Kerosin fließt allein durch natürlichen Gefälledruck nach oben",
      "Ein separater Mini-Tank im Leitwerk muss vor jedem Start von Hand befüllt werden",
      "Das Triebwerk verbrennt im Steigflug vorübergehend reines Methangas"
    ],
    "explanation": "Da Triebwerk 2 mehrere Meter oberhalb der Flügeltanks liegt, garantieren leistungsstarke Förderpumpen die kontinuierliche Spritzufuhr.",
    "exp": "Da Triebwerk 2 mehrere Meter oberhalb der Flügeltanks liegt, garantieren leistungsstarke Förderpumpen die kontinuierliche Spritzufuhr."
  },
  {
    "cat": "triebwerke",
    "diff": "pro",
    "q": "Was unterscheidet das General Electric CF6-80C2D1F der MD-11 von ähnlichen CF6-Varianten an der Boeing 767?",
    "a": [
      "Spezifische Anbaugeräte, Schubwerte und angepasste Pylon-Aufhängungspunkte",
      "Der komplette Verzicht auf eine Turbine im Heißgasteil",
      "Eine gegenläufig rotierende Fan-Stufe für extrem leisen Lauf",
      "Ein integrierter Propeller im Abgasstrahl für Zusatzschub"
    ],
    "explanation": "Die D1F-Variante ist maßgeschneidert für das Flugwerksdesign und die Schubanforderungen der MD-11 von McDonnell Douglas.",
    "exp": "Die D1F-Variante ist maßgeschneidert für das Flugwerksdesign und die Schubanforderungen der MD-11 von McDonnell Douglas."
  },
  {
    "cat": "airlines_cargo",
    "diff": "easy",
    "q": "Welche Fluggesellschaft war im Dezember 1990 Erstkunde und weltweiter Erstbetreiber der Passagier-MD-11?",
    "a": [
      "Finnair (aus Finnland)",
      "Lufthansa (aus Deutschland)",
      "Pan American World Airways (aus den USA)",
      "Singapore Airlines (aus Singapur)"
    ],
    "explanation": "Finnair übernahm am 7. Dezember 1990 die allererste Passagier-MD-11 und flog damit von Helsinki nach Teneriffa.",
    "exp": "Finnair übernahm am 7. Dezember 1990 die allererste Passagier-MD-11 und flog damit von Helsinki nach Teneriffa."
  },
  {
    "cat": "airlines_cargo",
    "diff": "easy",
    "q": "Welche US-amerikanische Frachtgesellschaft baute die weltweit mit Abstand größte MD-11-Flotte auf?",
    "a": [
      "FedEx Express",
      "DHL Aviation",
      "Cargolux Airlines",
      "Emirates SkyCargo"
    ],
    "explanation": "FedEx betrieb in der Spitze fast 60 Maschinen des Typs MD-11F und machte den Dreistrahler zum Rückgrat seines weltweiten Expressnetzes.",
    "exp": "FedEx betrieb in der Spitze fast 60 Maschinen des Typs MD-11F und machte den Dreistrahler zum Rückgrat seines weltweiten Expressnetzes."
  },
  {
    "cat": "airlines_cargo",
    "diff": "easy",
    "q": "Welche deutsche Frachtfluggesellschaft verabschiedete im Oktober 2021 ihre allerletzte MD-11F feierlich aus der Flotte?",
    "a": [
      "Lufthansa Cargo",
      "Eurowings Discover",
      "Condor Flugdienst",
      "LTU International Airways"
    ],
    "explanation": "Lufthansa Cargo musterte ihre letzte MD-11F (D-ALCC mit der Aufschrift 'Goodbye' und 'Danke MD-11') im Herbst 2021 zugunsten der Boeing 777F aus.",
    "exp": "Lufthansa Cargo musterte ihre letzte MD-11F (D-ALCC mit der Aufschrift 'Goodbye' und 'Danke MD-11') im Herbst 2021 zugunsten der Boeing 777F aus."
  },
  {
    "cat": "airlines_cargo",
    "diff": "easy",
    "q": "Welche niederländische Fluglinie flog die MD-11 bis Oktober 2014 im weltweiten Passagierdienst?",
    "a": [
      "KLM Royal Dutch Airlines",
      "Transavia Airlines",
      "Martinair Holland",
      "Brussels Airlines"
    ],
    "explanation": "KLM war die letzte Airline weltweit, die Passagierflüge mit der MD-11 durchführte, und bot vor der Ausmusterung sogar Abschieds-Rundflüge an.",
    "exp": "KLM war die letzte Airline weltweit, die Passagierflüge mit der MD-11 durchführte, und bot vor der Ausmusterung sogar Abschieds-Rundflüge an."
  },
  {
    "cat": "airlines_cargo",
    "diff": "easy",
    "q": "Wie viele Standard-Frachtpaletten bzw. Container fasst das Hauptdeck einer MD-11F ungefähr?",
    "a": [
      "Bis zu 26 Paletten auf dem Hauptdeck plus weitere Fracht im Unterdeck",
      "Maximal 8 Paletten, da der Rumpf zu schmal für Frachtcontainer ist",
      "Über 60 Paletten durch drei übereinanderliegende Frachtdecks",
      "Ausschließlich lose Pakete ohne standardisierte Paletten"
    ],
    "explanation": "Mit 26 Hauptdeck-Positionen (88 x 125 Zoll bzw. 96 x 125 Zoll) war die MD-11F ein enorm vielseitiges und profitables Frachtflugzeug.",
    "exp": "Mit 26 Hauptdeck-Positionen (88 x 125 Zoll bzw. 96 x 125 Zoll) war die MD-11F ein enorm vielseitiges und profitables Frachtflugzeug."
  },
  {
    "cat": "airlines_cargo",
    "diff": "easy",
    "q": "Welche Schweizer Traditionsfluggesellschaft setzte die MD-11 auf ihren wichtigsten Langstrecken ein?",
    "a": [
      "Swissair",
      "Austrian Airlines",
      "Swiss International Air Lines (neu gegründet ohne MD-11)",
      "Edelweiss Air"
    ],
    "explanation": "Die Swissair modernisierte in den 1990er-Jahren ihre Flotte mit 16 fabrikneuen MD-11-Flugzeugen mit Pratt & Whitney-Antrieben.",
    "exp": "Die Swissair modernisierte in den 1990er-Jahren ihre Flotte mit 16 fabrikneuen MD-11-Flugzeugen mit Pratt & Whitney-Antrieben."
  },
  {
    "cat": "airlines_cargo",
    "diff": "mid",
    "q": "Warum war die MD-11 bei Frachtgesellschaften wie FedEx und UPS so viel beliebter als bei Passagierlinien?",
    "a": [
      "Wegen des hervorragenden Ladevolumens, geringer Anschaffungskosten und ETOPS-freier Ozeanrouten",
      "Weil Passagiere laut Gesetz nicht in Flugzeugen mit drei Triebwerken fliegen durften",
      "Weil die MD-11 keine Fenster besaß und nur nachts fliegen durfte",
      "Weil Frachtflugzeuge keine Lärmbeschränkungen einhalten mussten"
    ],
    "explanation": "Frachtgesellschaften profitierten von günstigen Gebrauchtpreisen, riesigem Ladevolumen und der Befreiung von strengen ETOPS-Auflagen.",
    "exp": "Frachtgesellschaften profitierten von günstigen Gebrauchtpreisen, riesigem Ladevolumen und der Befreiung von strengen ETOPS-Auflagen."
  },
  {
    "cat": "airlines_cargo",
    "diff": "mid",
    "q": "Welche US-Passagierlinie stornierte und verkaufte ihre MD-11-Flotte schon nach wenigen Jahren an FedEx?",
    "a": [
      "American Airlines",
      "Southwest Airlines",
      "Pan American World Airways",
      "US Airways"
    ],
    "explanation": "American Airlines war unzufrieden mit der realen Reichweite auf Pazifikrouten und verkaufte alle 19 Passagiermaschinen vorzeitig an FedEx.",
    "exp": "American Airlines war unzufrieden mit der realen Reichweite auf Pazifikrouten und verkaufte alle 19 Passagiermaschinen vorzeitig an FedEx."
  },
  {
    "cat": "airlines_cargo",
    "diff": "mid",
    "q": "Welche Sonderversion der MD-11 erlaubte den schnellen Wechsel zwischen Passagier- und Frachtbetrieb?",
    "a": [
      "MD-11 Combi (Kombination) und MD-11CF (Convertible Freighter)",
      "MD-11 Super Cargo ohne Cockpittür",
      "MD-11 Long Range Shuttle",
      "MD-11 SkyBus mit Klappsitzen"
    ],
    "explanation": "Die MD-11CF besaß eine große vordere Frachttür und konnte je nach Saison binnen Stunden von Passagier- auf Frachtkonfiguration umgebaut werden.",
    "exp": "Die MD-11CF besaß eine große vordere Frachttür und konnte je nach Saison binnen Stunden von Passagier- auf Frachtkonfiguration umgebaut werden."
  },
  {
    "cat": "airlines_cargo",
    "diff": "mid",
    "q": "Wie viele Exemplare der MD-11 wurden zwischen 1988 und 2000 insgesamt im Werk in Long Beach gebaut?",
    "a": [
      "Exakt 200 Exemplare",
      "Rund 850 Exemplare",
      "Nur 47 Exemplare",
      "Knapp 1.200 Exemplare"
    ],
    "explanation": "Nach exakt 200 ausgelieferten Maschinen wurde das MD-11-Programm nach der Übernahme von McDonnell Douglas durch Boeing im Jahr 2000 eingestellt.",
    "exp": "Nach exakt 200 ausgelieferten Maschinen wurde das MD-11-Programm nach der Übernahme von McDonnell Douglas durch Boeing im Jahr 2000 eingestellt."
  },
  {
    "cat": "airlines_cargo",
    "diff": "mid",
    "q": "Welcher große US-Logistikkonzern betrieb neben FedEx ebenfalls eine Flotte von über 35 MD-11-Frachtern?",
    "a": [
      "United Parcel Service (UPS)",
      "Amazon Prime Air",
      "TNT Airways",
      "Emery Worldwide"
    ],
    "explanation": "UPS kaufte zahlreiche gebrauchte Passagier-MD-11 auf und ließ sie zu Frachtern (BCF - Boeing Converted Freighter) umrüsten.",
    "exp": "UPS kaufte zahlreiche gebrauchte Passagier-MD-11 auf und ließ sie zu Frachtern (BCF - Boeing Converted Freighter) umrüsten."
  },
  {
    "cat": "airlines_cargo",
    "diff": "mid",
    "q": "Welche asiatische Airline flog die MD-11 unter anderem auf der Polarroute nach Europa und Nordamerika?",
    "a": [
      "Japan Airlines (JAL) und EVA Air",
      "Air India und SriLankan Airlines",
      "Biman Bangladesh Airlines",
      "Vietnam Airlines"
    ],
    "explanation": "JAL betrieb sowohl Passagier-MD-11 (als 'J-Bird' getauft) als auch Frachtmaschinen auf anspruchsvollen Langstrecken.",
    "exp": "JAL betrieb sowohl Passagier-MD-11 (als 'J-Bird' getauft) als auch Frachtmaschinen auf anspruchsvollen Langstrecken."
  },
  {
    "cat": "airlines_cargo",
    "diff": "pro",
    "q": "Welche Besonderheit hatte die MD-11-Flotte von Delta Air Lines vor ihrer Ausmusterung?",
    "a": [
      "Delta setzte sie ab Atlanta vor allem auf Flügen nach Europa, Tokio und Brasilien ein",
      "Delta nutzte sie ausschließlich als Inlands-Großraumjet zwischen New York und Boston",
      "Delta baute eigene Whirlpools für Erste-Klasse-Passagiere ein",
      "Delta betrieb die Maschinen ohne automatisches Schubkontrollsystem"
    ],
    "explanation": "Delta betrieb 17 MD-11 und ersetzte sie ab 1999 schrittweise durch die wirtschaftlichere zweistrahlige Boeing 777-200ER.",
    "exp": "Delta betrieb 17 MD-11 und ersetzte sie ab 1999 schrittweise durch die wirtschaftlichere zweistrahlige Boeing 777-200ER."
  },
  {
    "cat": "airlines_cargo",
    "diff": "pro",
    "q": "Unter welcher Bezeichnung wurde der Umbau von ehemaligen Passagier-MD-11 zu Frachtflugzeugen durch Boeing angeboten?",
    "a": [
      "MD-11 BCF (Boeing Converted Freighter)",
      "MD-11 Modern Cargo Transporter",
      "MD-11 Heavy Lift Evolution",
      "MD-11 Global Package Carrier"
    ],
    "explanation": "Nach der Fusion bot Boeing die offizielle BCF-Modifikation an: Einbau einer Frachttür, Bodenverstärkung und Deaktivierung der Passagiersysteme.",
    "exp": "Nach der Fusion bot Boeing die offizielle BCF-Modifikation an: Einbau einer Frachttür, Bodenverstärkung und Deaktivierung der Passagiersysteme."
  },
  {
    "cat": "airlines_cargo",
    "diff": "pro",
    "q": "Welche brasilianische Traditionsgesellschaft war einst für ihre farbenfrohen MD-11 auf Europa- und USA-Routen berühmt?",
    "a": [
      "Varig (Viação Aérea Rio-Grandense)",
      "TAM Linhas Aéreas",
      "Gol Transportes Aéreos",
      "VASP Linhas Aéreas"
    ],
    "explanation": "Varig flog viele Jahre lang mit einer großen MD-11-Flotte unter anderem täglich nach Frankfurt, Paris, London und New York.",
    "exp": "Varig flog viele Jahre lang mit einer großen MD-11-Flotte unter anderem täglich nach Frankfurt, Paris, London und New York."
  },
  {
    "cat": "airlines_cargo",
    "diff": "pro",
    "q": "Warum rüstete FedEx ihre MD-11-Cockpits in den 2010er-Jahren mit modernen Flachbildschirmen und Head-up-Displays aus?",
    "a": [
      "Um veraltete CRT-Röhren durch LCDs zu ersetzen und Landungen bei dichtem Nebel (CAT IIIb) zu sichern",
      "Weil der US-Kongress alle Röhrenmonitore in Frachtflugzeugen unter Strafe stellte",
      "Um das Gewicht der Pilotenbrillen durch Projektionen einzusparen",
      "Damit die Piloten während des Flugs Streaming-Dienste nutzen konnten"
    ],
    "explanation": "Das FedEx-Cockpit-Upgrade modernisierte die Avionik auf Flüssigkristallanzeigen und EFVS (Enhanced Flight Vision System) mit Infrarotkamera.",
    "exp": "Das FedEx-Cockpit-Upgrade modernisierte die Avionik auf Flüssigkristallanzeigen und EFVS (Enhanced Flight Vision System) mit Infrarotkamera."
  },
  {
    "cat": "airlines_cargo",
    "diff": "pro",
    "q": "Welche Airline stattete eine MD-11 mit einer luxuriösen VIP-Ausstattung für Staatsgäste und Scheichs aus?",
    "a": [
      "Saudi Arabian Airlines (Saudia Royal Flight)",
      "Lufthansa VIP Transport Service",
      "Air Tahiti Nui VIP",
      "Qantas VIP Jet Charter"
    ],
    "explanation": "Saudia betrieb zwei VIP-MD-11 für das saudische Königshaus, ausgestattet mit Prunksälen, Schlafzimmern und modernster Satellitenkommunikation.",
    "exp": "Saudia betrieb zwei VIP-MD-11 für das saudische Königshaus, ausgestattet mit Prunksälen, Schlafzimmern und modernster Satellitenkommunikation."
  },
  {
    "cat": "airlines_cargo",
    "diff": "pro",
    "q": "Welches Kennzeichen trug die letzte MD-11F von Lufthansa Cargo, die im Oktober 2021 ihren Abschiedsflug absolvierte?",
    "a": [
      "D-ALCC",
      "D-ABYA",
      "D-AQUI",
      "D-AIZQ"
    ],
    "explanation": "Die D-ALCC flog am 17. Oktober 2021 als letzter europäischer MD-11-Frachter von Frankfurt nach Tel Aviv und Kairo und beendete das Trijet-Zeitalter der Kranich-Linie.",
    "exp": "Die D-ALCC flog am 17. Oktober 2021 als letzter europäischer MD-11-Frachter von Frankfurt nach Tel Aviv und Kairo und beendete das Trijet-Zeitalter der Kranich-Linie."
  },
  {
    "cat": "airlines_cargo",
    "diff": "pro",
    "q": "Warum bestellte Singapore Airlines ursprünglich 20 MD-11, stornierte die Order jedoch 1991 vor der ersten Auslieferung komplett?",
    "a": [
      "Wegen unzureichender Reichweite und Nichterfüllung der vertraglichen Leistungsgarantien",
      "Weil Boeing Singapore Airlines mit drastischen Preisnachlässen bedrohte",
      "Weil Singapur den Betrieb von Flugzeugen mit Hecktriebwerken verbot",
      "Weil McDonnell Douglas die Auslieferung um mehr als zehn Jahre verschob"
    ],
    "explanation": "Singapore Airlines stellte fest, dass die MD-11 die Nonstop-Route Singapur-Paris mit voller Fracht nicht schaffte, und wechselte zum Airbus A340-300.",
    "exp": "Singapore Airlines stellte fest, dass die MD-11 die Nonstop-Route Singapur-Paris mit voller Fracht nicht schaffte, und wechselte zum Airbus A340-300."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "easy",
    "q": "An welchem Datum hob der Prototyp der McDonnell Douglas MD-11 in Long Beach zu seinem Erstflug ab?",
    "a": [
      "10. Januar 1990",
      "15. August 1982",
      "24. Dezember 1999",
      "4. Juli 1976"
    ],
    "explanation": "Der Erstflug der MD-11 erfolgte am 10. Januar 1990 auf dem Flughafen von Long Beach, Kalifornien.",
    "exp": "Der Erstflug der MD-11 erfolgte am 10. Januar 1990 auf dem Flughafen von Long Beach, Kalifornien."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "easy",
    "q": "Welches tragische Unglück einer MD-11 ereignete sich am 2. September 1998 vor der Küste Kanadas?",
    "a": [
      "Der Absturz von Swissair-Flug 111 nahe Halifax nach einem Brand im Cockpit",
      "Die Notlandung von Delta 191 im Gewittersturm",
      "Der Absturz von Alaska Airlines 261 im Pazifik",
      "Die Flugzeugkollision von Überlingen am Bodensee"
    ],
    "explanation": "Swissair 111 stürzte nach einem unkontrollierbaren Kabelbrand über dem Atlantik nahe Halifax ab. Alle 229 Menschen an Bord starben.",
    "exp": "Swissair 111 stürzte nach einem unkontrollierbaren Kabelbrand über dem Atlantik nahe Halifax ab. Alle 229 Menschen an Bord starben."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "easy",
    "q": "Welche Ursache ermittelten die kanadischen TSB-Ermittler für das Feuer an Bord von Swissair-Flug 111?",
    "a": [
      "Lichtbögen an der Verkabelung des neu eingebauten Passagier-Unterhaltungssystems (IFE)",
      "Ein Leck in der Kerosinleitung des Hecktriebwerks",
      "Einen Terroranschlag mit einer hochexplosiven Frachtbombe",
      "Einen Blitzeinschlag direkt in den Flugdatenschreiber"
    ],
    "explanation": "Fehlerhafte Isolierung an Kabeln des IFE-Systems entzündete leicht brennbare Dämmmatten aus metallisiertem Mylar über der Cockpitdecke.",
    "exp": "Fehlerhafte Isolierung an Kabeln des IFE-Systems entzündete leicht brennbare Dämmmatten aus metallisiertem Mylar über der Cockpitdecke."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "easy",
    "q": "Welcher Flugzeughersteller übernahm McDonnell Douglas im Jahr 1997 und besiegelte damit das Schicksal der MD-11?",
    "a": [
      "The Boeing Company",
      "Airbus Commercial Aviation",
      "Lockheed Martin Corporation",
      "Bombardier Aerospace"
    ],
    "explanation": "Boeing übernahm McDonnell Douglas 1997 und entschied sich für die eigene B777, weshalb die MD-11-Fertigung im Jahr 2000 auslief.",
    "exp": "Boeing übernahm McDonnell Douglas 1997 und entschied sich für die eigene B777, weshalb die MD-11-Fertigung im Jahr 2000 auslief."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "mid",
    "q": "Zu welchem gefährlichen Phänomen neigte die MD-11 bei nicht perfekt ausgeführten, harten Landungen?",
    "a": [
      "Zum 'Bounce' mit anschließender Überreaktion der Steuerung und Tragflächenbruch (PIO)",
      "Zum sofortigen Totalausfall aller Hydraulikbremsen bei Regen",
      "Zum spontanen Einfahren des Bugfahrwerks beim ersten Bodenkontakt",
      "Zum unkontrollierbaren Drehen um 180 Grad gegen die Landerichtung"
    ],
    "explanation": "Harte Landungen führten oft zu einem Wiederaufsteigen (Bounce). Überkorrekturen mit Drücken des Steuerhorns überlasteten die Fahrwerksaufhängung.",
    "exp": "Harte Landungen führten oft zu einem Wiederaufsteigen (Bounce). Überkorrekturen mit Drücken des Steuerhorns überlasteten die Fahrwerksaufhängung."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "mid",
    "q": "Welcher FedEx-Flug verunglückte 1997 bei einer harten Landung auf dem Newark International Airport?",
    "a": [
      "FedEx-Flug 14 (MD-11F rollte auf den Rücken und geriet in Brand)",
      "FedEx-Flug 705 (Entführungsversuch im Steigflug)",
      "FedEx-Flug 80 (Absturz in Tokio-Narita bei Scherwinden)",
      "FedEx-Flug 111 (Notwasserung im Atlantischen Ozean)"
    ],
    "explanation": "FedEx 14 sprang nach dem Aufsetzen auf, der Rumpf knickte nach zweitem Bodenkontakt ein und der Jet überschlug sich. Die Besatzung überlebte.",
    "exp": "FedEx 14 sprang nach dem Aufsetzen auf, der Rumpf knickte nach zweitem Bodenkontakt ein und der Jet überschlug sich. Die Besatzung überlebte."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "mid",
    "q": "Was geschah am 23. März 2009 bei der Landung von FedEx-Flug 80 auf dem Flughafen Tokio-Narita?",
    "a": [
      "Die Maschine sprang bei starkem Scherwind mehrfach auf, überschlug sich und fing Feuer",
      "Das Flugzeug schoss über das Bahnende ins Meer und versank vollständig",
      "Ein Triebwerk löste sich beim Bremsen und beschädigte das Hauptterminal",
      "Die Maschine landete versehentlich auf einem parallelen Rollweg"
    ],
    "explanation": "FedEx 80 verunglückte bei orkanartigen Böen in Narita durch heftige Bounce-Reaktionen. Beide Piloten kamen im brennenden Wrack ums Leben.",
    "exp": "FedEx 80 verunglückte bei orkanartigen Böen in Narita durch heftige Bounce-Reaktionen. Beide Piloten kamen im brennenden Wrack ums Leben."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "mid",
    "q": "Welche Konsequenz zog die Luftfahrtbranche weltweit aus dem Swissair-111-Unglück bezüglich Kabinenmaterialien?",
    "a": [
      "Das sofortige weltweite Verbot von metallisiertem Mylar (PET) als Isolationsmaterial in Flugzeugen",
      "Die Abschaffung aller elektrischen Bildschirme in Passagiersitzen weltweit",
      "Die Pflicht zum Einbau von Wassersprinkleranlagen in Cockpitdecken",
      "Ein generelles Nachtflugverbot für alle dreistrahligen Verkehrsflugzeuge"
    ],
    "explanation": "Metallisierte Mylar-Dämmmatten, die sich bei Swissair 111 rasend schnell entzündeten, wurden weltweit aus Passagierflugzeugen verbannt.",
    "exp": "Metallisierte Mylar-Dämmmatten, die sich bei Swissair 111 rasend schnell entzündeten, wurden weltweit aus Passagierflugzeugen verbannt."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "mid",
    "q": "Was passierte am 31. Juli 1997 an Bord von FedEx-Flug 705 mit einer DC-10/MD-11-Besatzung?",
    "a": [
      "Ein mitreisender Angestellter attackierte die Cockpit-Crew mit Hämmern und einer Harpune",
      "Ein Gepäckbrand im Frachtraum erstickte beide Triebwerke im Reiseflug",
      "Ein plötzlicher Druckabfall zwang zu einem Sturzflug aus 10.000 Metern Höhe",
      "Die Maschine wurde von Kampfjets wegen falscher Transpondercodes abgefangen"
    ],
    "explanation": "Ein suspendierter FedEx-Mitarbeiter versuchte die Crew zu töten. Trotz schwerster Schädelverletzungen überwältigten die Piloten den Angreifer.",
    "exp": "Ein suspendierter FedEx-Mitarbeiter versuchte die Crew zu töten. Trotz schwerster Schädelverletzungen überwältigten die Piloten den Angreifer."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "mid",
    "q": "Was war der Hauptgrund dafür, dass zweistrahlige Großraumjets (wie Boeing 777 und A330) die MD-11 vom Markt verdrängten?",
    "a": [
      "Fortschritte bei der ETOPS-Zertifizierung und enorme Treibstoff- und Wartungsvorteile zweier Triebwerke",
      "Ein gesetzliches Startverbot für Dreistrahler auf Flughäfen in Nordamerika",
      "Ein Mangel an Kerosin mit spezieller Oktanzahl für Dreistrahler",
      "Die Unfähigkeit der MD-11, auf Pisten mit Asphaltbelag zu landen"
    ],
    "explanation": "Moderne Twins durften dank ETOPS-180 und mehr direkt über Ozeane fliegen. Zwei Triebwerke sparen enorm viel Sprit und Wartungskosten gegenüber dreien.",
    "exp": "Moderne Twins durften dank ETOPS-180 und mehr direkt über Ozeane fliegen. Zwei Triebwerke sparen enorm viel Sprit und Wartungskosten gegenüber dreien."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "pro",
    "q": "Welcher bemerkenswerte Zwischenfall ereignete sich 1993 auf China-Eastern-Airlines-Flug 583 über dem Pazifik?",
    "a": [
      "Ein versehentliches Ausfahren der Vorflügel (Slats) im Reiseflug führte zu heftigen Oszillationen",
      "Ein Strömungsabriss an allen drei Triebwerken nach Einflug in Vulkanasche",
      "Eine Kollision mit einem Wetterballon riss ein Loch in die Passagierdecke",
      "Ein Ausfall aller Bordcomputer zwang die Crew zu rein analoger Navigation"
    ],
    "explanation": "Die versehentlich betätigten Vorflügel führten zu extremen Nick-Schwingungen mit schweren Personenverletzungen in der Kabine.",
    "exp": "Die versehentlich betätigten Vorflügel führten zu extremen Nick-Schwingungen mit schweren Personenverletzungen in der Kabine."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "pro",
    "q": "Welche Modifikation an der Software des Flight Control Computers führte Boeing nach den Landeunfällen der MD-11 ein?",
    "a": [
      "Eine modifizierte Roll- und Nick-Dämpfung bei Bodennähe zur Unterdrückung von Bounces",
      "Ein automatisches Vollgas-System bei jeder Bodenberührung über 2 m/s",
      "Eine Deaktivierung aller Höhenruder bei Windgeschwindigkeiten über 20 Knoten",
      "Ein Zwangsrückzug der Landeklappen sofort beim ersten Radkontakt"
    ],
    "explanation": "Softwareupdates verbesserten das LSAS und das Autopilot-Verhalten im Nahbereich der Piste, um Springen und Überreaktionen zu dämpfen.",
    "exp": "Softwareupdates verbesserten das LSAS und das Autopilot-Verhalten im Nahbereich der Piste, um Springen und Überreaktionen zu dämpfen."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "pro",
    "q": "Was untersuchte die NTSB beim Unfall von Korean Air Cargo 6316 im Jahr 1999 nach dem Start in Shanghai?",
    "a": [
      "Eine Verwechslung von Höhenangaben in Metern (chinesische Flugsicherung) und Fuß im Cockpit",
      "Ein Versagen des mittleren Triebwerks durch gefrorene Frachtabfälle",
      "Einen Ausfall aller drei Generatoren durch einen defekten Sammelschienenschalter",
      "Eine Explosion im Frachtraum durch illegal deklarierte Feuerwerkskörper"
    ],
    "explanation": "Die Crew verwechselte 1.500 Meter Freigabehöhe mit 1.500 Fuß, glaubte sich viel zu hoch und drückte die Maschine abrupt in den Boden.",
    "exp": "Die Crew verwechselte 1.500 Meter Freigabehöhe mit 1.500 Fuß, glaubte sich viel zu hoch und drückte die Maschine abrupt in den Boden."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "pro",
    "q": "Warum war die Zertifizierung der MD-11 bei den Luftfahrtbehörden FAA und JAA 1990/1991 so zeitkritisch?",
    "a": [
      "Weil McDonnell Douglas horrende Vertragsstrafen an Erstkunden bei weiteren Lieferverzögerungen drohten",
      "Weil am 1. Januar 1991 alle Flugzeuge mit Hecktriebwerken verboten werden sollten",
      "Weil Long Beach den Flughafen für Flugtests zum Jahresende schließen wollte",
      "Weil die US-Air-Force alle Testflugzeuge für den Golfkrieg beschlagnahmen wollte"
    ],
    "explanation": "Verzögerungen bei Tests und Software brachten McDonnell Douglas in enorme finanzielle Bedrängnis und erforderten Tag-und-Nacht-Prüfungen.",
    "exp": "Verzögerungen bei Tests und Software brachten McDonnell Douglas in enorme finanzielle Bedrängnis und erforderten Tag-und-Nacht-Prüfungen."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "pro",
    "q": "Welches ungewöhnliche Trainingsmodul mussten MD-11-Piloten nach FAA-Anordnung verpflichtend im Simulator trainieren?",
    "a": [
      "Bounced Landing Recovery (sofortiges Halten der Fluglage ohne aggressives Drücken)",
      "Landung auf Wasser bei vollem Reisefluggewicht ohne Fahrwerk",
      "Rollen auf drei Rädern nach Verlust des gesamten linken Hauptfahrwerks",
      "Blindflug ausschließlich mit Daten des Wetterradars ohne Horizont"
    ],
    "explanation": "Das spezielle Recovery-Training lehrte Piloten: Bei einem Bounce keinesfalls die Nase nach unten drücken, sondern Anstellwinkel stabil halten.",
    "exp": "Das spezielle Recovery-Training lehrte Piloten: Bei einem Bounce keinesfalls die Nase nach unten drücken, sondern Anstellwinkel stabil halten."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "pro",
    "q": "Was geschah am 22. Juli 2010 mit Lufthansa-Cargo-Flug 8460 bei der Landung in Riad?",
    "a": [
      "Die MD-11F sprang nach hartem Aufsetzen mehrfach auf, zerbrach und brannte vollständig aus",
      "Das Flugzeug kollidierte beim Durchstarten mit einem Sandsturm-Radarturm",
      "Alle drei Triebwerke fielen wegen Kerosinmangels 20 km vor der Piste aus",
      "Die Frachtladung verrutschte und drückte das Flugzeugheck auf die Landebahn"
    ],
    "explanation": "LH 8460 setzte hart auf, sprang dreimal auf und brach hinter den Tragflächen auseinander. Beide Piloten konnten sich über die Rutsche retten.",
    "exp": "LH 8460 setzte hart auf, sprang dreimal auf und brach hinter den Tragflächen auseinander. Beide Piloten konnten sich über die Rutsche retten."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "pro",
    "q": "Welche Rolle spielte die MD-11 bei NASA-Forschungsprogrammen zum sogenannten PCA-System?",
    "a": [
      "Propulsion Controlled Aircraft (sichere Notlandung ausschließlich durch Steuerung des Triebwerksschubs)",
      "Passagier-Cabin-Airflow zur Bekämpfung von Grippeviren in Reiseflughöhe",
      "Polar Communication Array für weltweite militärische Satellitenfunkverbindungen",
      "Photovoltaic Clean Aviation mit Solarzellen auf den Tragflächen"
    ],
    "explanation": "Die NASA modifizierte eine MD-11 und bewies, dass ein Großraumjet bei komplettem Ausfall der Hydraulik allein mit Triebwerksschub landen kann.",
    "exp": "Die NASA modifizierte eine MD-11 und bewies, dass ein Großraumjet bei komplettem Ausfall der Hydraulik allein mit Triebwerksschub landen kann."
  },
  {
    "cat": "historie_sicherheit",
    "diff": "pro",
    "q": "In welchem US-Museum bzw. welcher Sammlung ist heute ein Cockpit-Mockup oder Simulator der MD-11 für Besucher erhalten?",
    "a": [
      "Im Delta Flight Museum in Atlanta und bei Luftfahrtmuseen in den USA",
      "Im Louvre in Paris im Flügel für moderne Industriekunst",
      "Ausschließlich im Pentagon in einem militärischen Sperrbezirk",
      "Im Deutschen Schifffahrtsmuseum in Bremerhaven"
    ],
    "explanation": "Historische Artefakte, Simulatoren und Exponate der MD-11 werden unter anderem im Delta Flight Museum in Atlanta gepflegt.",
    "exp": "Historische Artefakte, Simulatoren und Exponate der MD-11 werden unter anderem im Delta Flight Museum in Atlanta gepflegt."
  }
];

  ArcadeQuizEngine.registerBank('md11', DATA);
})();
