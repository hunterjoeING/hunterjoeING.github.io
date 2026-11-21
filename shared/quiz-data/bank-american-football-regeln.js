// Unified quiz bank for "american_football_regeln" (75 questions)
(function () {
  const DATA = [
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Wie viele Punkte erhält ein Team in der NFL für das Erzielen eines regulären Touchdowns?",
    "a": [
      "6 Punkte",
      "7 Punkte",
      "3 Punkte",
      "4 Punkte"
    ],
    "exp": "Ein Touchdown bringt 6 Punkte ein. Der anschließende Extrapunkt (PAT) oder eine Two-Point Conversion wird separat gewertet."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Wie viele Punkte bringt ein erfolgreich verwandeltes Field Goal im laufenden Spielgeschehen?",
    "a": [
      "3 Punkte",
      "2 Punkte",
      "4 Punkte",
      "1 Punkt"
    ],
    "exp": "Ein Field Goal aus dem Spiel heraus zählt stets 3 Punkte, egal aus welcher Entfernung es gekickt wird."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Was versteht man unter einem 'Safety' und wie viele Punkte bringt dieser seltene Spielzug der Defense?",
    "a": [
      "2 Punkte für das Tacklen des Ballträgers in der eigenen Endzone",
      "3 Punkte für das Abfangen eines gegnerischen Passes in der Endzone",
      "1 Punkt für das Blocken eines gegnerischen Punts kurz vor der Linie",
      "4 Punkte für das Erobern eines freien Fumbles hinter der Goalline"
    ],
    "exp": "Wird der ballführende Offensivspieler in der eigenen Endzone gestoppt, erhält die Defense 2 Punkte plus den anschließenden Ballbesitz per Free Kick."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Wie viele Versuche (Downs) hat die Offense standardmäßig, um einen Raumgewinn von mindestens 10 Yards zu erzielen?",
    "a": [
      "4 Versuche",
      "3 Versuche",
      "5 Versuche",
      "2 Versuche"
    ],
    "exp": "Schafft das angreifende Team innerhalb von 4 Versuchen 10 Yards, gibt es ein neues First Down (vier neue Versuche)."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Welche Entscheidung trifft ein Head Coach nach einem Touchdown, wenn er eine 'Two-Point Conversion' spielen lässt?",
    "a": [
      "Sein Team versucht von der 2-Yard-Linie einen Spielzug in die Endzone",
      "Sein Kicker versucht ein besonders weites Field Goal aus 35 Yards",
      "Der Quarterback kickt den Ball per Dropkick selbst durch die Torstangen",
      "Sein Punter wirft einen Pass auf den Center direkt an der Goalline"
    ],
    "exp": "Statt des einfachen Kicks wählt das Team einen Pass- oder Laufversuch von der 2-Yard-Linie, um 2 Extrapunkte zu erzielen."
  },
  {
    "cat": "regeln_taktik",
    "diff": "pro",
    "q": "Was ist der extrem seltene 'One-Point Safety' in den offiziellen NFL-Regeln?",
    "a": [
      "Ein Safety, der sich während eines Extrapunkt- oder Conversion-Versuchs ereignet",
      "Ein Safety, wenn der Kicker beim Punt über die eigene hintere Endlinie stolpert",
      "Ein Safety, der durch ein technisches Foul des Centers an der Goalline entsteht",
      "Ein Safety, wenn der Quarterback beim Absitzen in der Endzone gefoult wird"
    ],
    "exp": "Ereignet sich ein Safety während eines PAT- oder Two-Point-Versuchs, wird dieser außergewöhnliche Spielzug mit genau 1 Punkt belohnt."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Von welcher Yardlinie wird in der NFL der Kick für den klassischen Extrapunkt (PAT) seit der Regelreform 2015 ausgeführt?",
    "a": [
      "Von der 15-Yard-Linie",
      "Von der 2-Yard-Linie",
      "Von der 20-Yard-Linie",
      "Von der 10-Yard-Linie"
    ],
    "exp": "Um den Extrapunkt spannender zu machen, verlegte die NFL die Linie des Kicks auf die 15-Yard-Linie (Distanz inkl. Endzone ca. 33 Yards)."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was geschieht mit dem Ballbesitz unmittelbar nach einem erzielten Safety?",
    "a": [
      "Das Team, das den Safety hinnehmen musste, kickt den Ball per Free Kick ab",
      "Das Team mit den Punkten erhält den Ball automatisch an der eigenen 25-Yard-Linie",
      "Es gibt einen normalen Kickoff vom Kicking Tee an der 35-Yard-Linie des Gegners",
      "Beide Mannschaften werfen eine Münze um den anschließenden Angriffs-Drive"
    ],
    "exp": "Nach einem Safety muss das bestrafte Team den Ball per Free Kick von der eigenen 20-Yard-Linie (meist gepuntet) an den Gegner abgeben."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was versteht man unter der 'Line to Gain' im American Football?",
    "a": [
      "Die gedachte Querlinie auf dem Feld, die für ein neues First Down erreicht werden muss",
      "Die hintere Begrenzungslinie der Endzone, an der Pässe gefangen werden dürfen",
      "Die Startlinie, an der sich beide Teams vor Beginn des Spielzugs aufstellen",
      "Die gestrichelte Begrenzungslinie der Coaching-Zone an den beiden Seitenlinien"
    ],
    "exp": "Die Line to Gain markiert exakt jene Yardlinie, die der Ball überschreiten muss, damit die Offense 4 neue Downs erhält."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Wie wird die Linie genannt, an der der Ball vor jedem Spielzug liegt und die Teams sich formieren?",
    "a": [
      "Line of Scrimmage",
      "Line of Engagement",
      "Neutral Battle Line",
      "Front Snap Border"
    ],
    "exp": "Die Line of Scrimmage markiert die Ballposition. Der Raum zwischen Ballvorder- und Ballhinterkante bildet die neutrale Zone."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Wie lang ist das Spielfeld im American Football von einer Endzone zur anderen (ohne die Endzonen selbst)?",
    "a": [
      "100 Yards (ca. 91,44 m)",
      "120 Yards (ca. 109,7 m)",
      "90 Yards (ca. 82,30 m)",
      "110 Yards (ca. 100,6 m)"
    ],
    "exp": "Das reguläre Spielfeld misst 100 Yards. Mit den beiden jeweils 10 Yards tiefen Endzonen beträgt die Gesamtlänge 120 Yards."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Wie tief ist jede der beiden Endzonen auf einem regulären NFL-Spielfeld?",
    "a": [
      "10 Yards (ca. 9,14 m)",
      "15 Yards (ca. 13,7 m)",
      "12 Yards (ca. 11,0 m)",
      "8 Yards (ca. 7,31 m)"
    ],
    "exp": "Jede Endzone ist exakt 10 Yards tief und erstreckt sich über die gesamte Feldbreite von 53 1/3 Yards."
  },
  {
    "cat": "regeln_taktik",
    "diff": "pro",
    "q": "Welche Breite hat ein offizielles NFL-Footballfeld umgerechnet in Yards?",
    "a": [
      "53 1/3 Yards (160 Fuß)",
      "50 Yards (150 Fuß)",
      "55 Yards (165 Fuß)",
      "60 Yards (180 Fuß)"
    ],
    "exp": "Ein Footballfeld ist exakt 160 Fuß breit, was 53 1/3 Yards (rund 48,77 Meter) entspricht."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Wozu dienen die sogenannten 'Hashmarks' auf dem Spielfeld?",
    "a": [
      "Sie markieren die seitlichen Grenzen, innerhalb derer der nächste Snap erfolgen muss",
      "Sie zeigen dem Kicker den optimalen Anlaufwinkel für Field-Goal-Versuche an",
      "Sie begrenzen den geschützten Aufenthaltsbereich für Linebacker vor dem Pass",
      "Sie markieren den Bereich, in dem kein gegnerischer Spieler geblockt werden darf"
    ],
    "exp": "Endet ein Spielzug außerhalb der Hashmarks, wird der Ball für den nächsten Snap auf Höhe der nächstgelegenen Hashmark platziert."
  },
  {
    "cat": "regeln_taktik",
    "diff": "pro",
    "q": "Wie unterscheidet sich der Abstand der Hashmarks in der NFL vom College Football (NCAA)?",
    "a": [
      "In der NFL stehen die Hashmarks viel enger beieinander (exakt Torpfostenbreite)",
      "In der NFL stehen die Hashmarks deutlich weiter auseinander als im College",
      "In der NFL gibt es im Gegensatz zum College überhaupt keine inneren Hashmarks",
      "In der NFL verlaufen die Hashmarks schräg versetzt zu den Außenlinien"
    ],
    "exp": "In der NFL sind die Hashmarks nur 18 Fuß und 6 Zoll voneinander entfernt (entspricht exakt der Breite der Torstangen), im College sind es 40 Fuß."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Welcher Bereich des Spielfelds wird von Spielern und Reportern als 'Red Zone' bezeichnet?",
    "a": [
      "Die letzten 20 Yards vor der gegnerischen Endzone",
      "Die Zone zwischen den beiden 40-Yard-Linien im Mittelfeld",
      "Der geschützte Bereich rund um den Quarterback in der Pocket",
      "Der Auslaufbereich der Trainer und Reservespieler an der Seitenlinie"
    ],
    "exp": "Ab der gegnerischen 20-Yard-Linie spricht man von der Red Zone. Hier wird das Spielfeld eng und Punkte sind Pflicht."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Welche Funktion haben die vier orangefarbenen Schaumstoff-Pylonen an den Ecken jeder Endzone?",
    "a": [
      "Sie markieren die Schnittpunkte von Goalline, Endlinie und den Seitenlinien",
      "Sie beherbergen ausschließlich akustische Signalgeber für Schiedsrichterentscheidungen",
      "Sie dienen als Sicherheitsabstand für Fotografen und Kameraleute am Spielfeldrand",
      "Sie zeigen den Spielern an, ab welcher Position ein Fair Catch signalisiert werden darf"
    ],
    "exp": "Die Pylonen markieren die Ecken der Endzone und gehören zum Spielfeld: Berührt ein Ballträger mit dem Ball die Pylone, gilt dies als Touchdown."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was besagt das Konzept des 'Football Moves' bei der Beurteilung eines gültigen Catches?",
    "a": [
      "Der Receiver muss nach dem Fangen genügend Zeit für eine footballspezifische Aktion haben",
      "Der Receiver muss den Ball mit beiden Händen vor seiner Brust festhalten",
      "Der Passempfänger muss sofort mindestens drei Yards nach vorne laufen",
      "Der Ball muss beim Fangen über Schulterhöhe des Spielers gesichert werden"
    ],
    "exp": "Neben zwei Füßen am Boden muss der Receiver den Ball sichern und Zeit für einen 'Football Move' (z. B. Abrollen, Schritt oder Wenden) haben."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Wie viele Spielviertel (Quarter) hat ein reguläres NFL-Spiel und wie lang ist jedes Viertel?",
    "a": [
      "4 Viertel à 15 Minuten reine Spielzeit",
      "2 Halbzeiten à 40 Minuten reine Spielzeit",
      "4 Viertel à 12 Minuten reine Spielzeit",
      "4 Viertel à 20 Minuten reine Spielzeit"
    ],
    "exp": "Ein Spiel besteht aus 4 Vierteln à 15 Minuten, womit die reguläre Nettospielzeit genau 60 Minuten beträgt."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Was passiert beim legendären 'Two-Minute Warning' in der NFL?",
    "a": [
      "Die Spieluhr stoppt automatisch 2 Minuten vor Ende der 2. und 4. Spielzeit",
      "Der Schiedsrichter pfeift das Spiel ab und es beginnt sofort die Overtime",
      "Beide Mannschaften dürfen alle verbleibenden Auszeiten auf einmal nehmen",
      "Das führende Team muss ab diesem Zeitpunkt jeden Spielzug mit einem Pass starten"
    ],
    "exp": "Exakt bei 2:00 Minuten im 2. und 4. Viertel stoppt die Uhr automatisch für eine offizielle Auszeit. Früher glich der Schiedsrichter die Spielzeit ab."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Wie viele Sekunden verbleiben der Offense auf der sogenannten 'Play Clock' standardmäßig für den nächsten Snap?",
    "a": [
      "40 Sekunden (bzw. 25 nach Schiedsrichter-Pausen)",
      "30 Sekunden (bzw. 15 nach Schiedsrichter-Pausen)",
      "45 Sekunden (bzw. 20 nach Schiedsrichter-Pausen)",
      "50 Sekunden (bzw. 30 nach Schiedsrichter-Pausen)"
    ],
    "exp": "Normalerweise hat die Offense 40 Sekunden nach Ende des letzten Spielzugs Zeit. Läuft die Uhr auf 0, gibt es eine Strafe wegen Delay of Game."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Wie viele Timeouts stehen jedem NFL-Team pro Halbzeit offiziell zur Verfügung?",
    "a": [
      "3 Auszeiten",
      "2 Auszeiten",
      "4 Auszeiten",
      "1 Auszeit"
    ],
    "exp": "Jedes Team hat 3 Timeouts pro Halbzeit (nicht übertragbar in die zweite Halbzeit oder Verlängerung)."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "In welchem der folgenden Fälle stoppt die reguläre Spieluhr im American Football?",
    "a": [
      "Bei einem unvollständigen Vorwärtspass (Incomplete Pass)",
      "Wenn der Running Back nach 2 Yards Raumgewinn getackelt wird",
      "Sobald der Quarterback einen vollständigen Pass über die Mitte fängt",
      "Wenn ein geblockter Punt erst hinter den Hashmarks aufgehoben wird"
    ],
    "exp": "Ein unvollständiger Pass lässt die Spieluhr sofort stoppen. Ebenso stoppt sie bei Auszeiten, Strafen und Spielerwechseln ins Aus."
  },
  {
    "cat": "regeln_taktik",
    "diff": "pro",
    "q": "Was ist der gefürchtete '10-Second Runoff' im Regelwerk der NFL?",
    "a": [
      "Automatischer Zeitabzug von 10 Sekunden nach einem Offense-Foul kurz vor Viertelende",
      "Eine optionale Auszeitverlängerung für das Team, das in Rückstand liegt",
      "Eine Zusatzzeit für das Schiedsrichtergespann zur Prüfung der Chain-Messung",
      "Eine verkürzte Play Clock nach der Abnahme einer Videobeweis-Challenge"
    ],
    "exp": "Begeht die Offense bei laufender Uhr in den letzten 2 Minuten einer Halbzeit ein Foul (z. B. False Start), verstreichen automatisch 10 Sekunden von der Uhr."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Warum wirft ein Quarterback in Zeitnot den Ball sofort nach dem Snap absichtlich hart zu Boden ('Spike')?",
    "a": [
      "Um die Spieluhr legal anzuhalten, wobei er bewusst ein Down opfert",
      "Um einem heranstürmenden Abwehrspieler ein Face-Mask-Foul anzuhängen",
      "Um dem Kicker den idealen Untergrund für ein langes Field Goal zu bereiten",
      "Um der gegnerischen Defense einen Wechselfehler wegen Überzahl nachzuweisen"
    ],
    "exp": "Der Spike zählt als unvollständiger Pass und stoppt sofort die Uhr. Die Offense verliert dadurch lediglich den aktuellen Versuch."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Wie viele Yards Raumverlust drohen der Offense bei einem Foul wegen 'Offensive Holding'?",
    "a": [
      "10 Yards Raumverlust",
      "5 Yards Raumverlust",
      "15 Yards Raumverlust",
      "20 Yards Raumverlust"
    ],
    "exp": "Offensive Holding gehört zu den häufigsten Strafen und wirft die angreifende Mannschaft um 10 Yards zurück."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was unterscheidet 'Defensive Pass Interference' in der NFL grundlegend von der College-Regel?",
    "a": [
      "In der NFL wird der Ball an den Punkt des Fouls verlegt (Spot of the Foul)",
      "In der NFL gibt es dafür grundsätzlich eine fixe Strafe von genau 10 Yards",
      "In der NFL führt das Foul immer zum automatischen Ausschluss des Spielers",
      "In der NFL darf der Schiedsrichter die Strafe nach Belieben halbieren"
    ],
    "exp": "In der NFL ist Defensive PI eine Spot Foul Strafe: Bei einem Foul an der 1-Yard-Linie rückt der Ball dorthin vor – plus automatisches First Down."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Wie hoch ist die Standardstrafe für einen 'False Start' eines Offensivspielers vor dem Snap?",
    "a": [
      "5 Yards Raumverlust",
      "10 Yards Raumverlust",
      "15 Yards Raumverlust",
      "Verlust des Downs ohne Yards"
    ],
    "exp": "Ein False Start ist ein Dead Ball Foul (das Spiel wird sofort abgepfiffen) und kostet die Offense 5 Yards."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was ist der Unterschied zwischen einem 'Offside' und einer 'Neutral Zone Infraction' der Defense?",
    "a": [
      "Bei Neutral Zone Infraction bewegt sich die Defense so, dass ein Angreifer zuckt",
      "Bei Offside wird das Spiel sofort abgepfiffen, bevor der Ball überhaupt gesnappt wird",
      "Neutral Zone Infraction gilt ausschließlich für Safeties und Cornerbacks",
      "Offside zieht automatisch eine Strafe von 15 Yards und einen Platzverweis nach sich"
    ],
    "exp": "Erschreckt ein Defensivspieler durch Vorpreschen einen Offensiv-Lineman, ist es eine Neutral Zone Infraction (sofortiger Pfiff). Offside lässt den Spielzug oft weiterlaufen."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Wann spricht der Schiedsrichter die Strafe 'Intentional Grounding' gegen den Quarterback aus?",
    "a": [
      "Wenn er den Ball ohne Anspielstation wegwirft, um einem Sack in der Pocket zu entgehen",
      "Wenn er den Ball absichtlich nach hinten wirft und kein Mitspieler ihn fängt",
      "Wenn er den Ball beim Handoff versehentlich auf den Boden fallen lässt",
      "Wenn er bei einem dritten Versuch absichtlich einen Befreiungskick ausführt"
    ],
    "exp": "Befindet sich der QB noch in der Pocket und wirft den Ball ohne fangbaren Receiver weg, um Raumverlust zu vermeiden, begeht er Intentional Grounding."
  },
  {
    "cat": "regeln_taktik",
    "diff": "pro",
    "q": "Was passiert, wenn der Quarterback ein 'Intentional Grounding' in seiner eigenen Endzone begeht?",
    "a": [
      "Die Defense erhält automatisch einen Safety zugesprochen (2 Punkte)",
      "Der Ball wird an die 1-Yard-Linie verlegt mit Wiederholung des Versuchs",
      "Die Offense verliert sofort das Angriffsrecht und der Gegner erhält den Ball",
      "Der Quarterback muss für den Rest des Viertels auf der Ersatzbank Platz nehmen"
    ],
    "exp": "Begeht der QB ein Intentional Grounding in der eigenen Endzone, führt dies zwingend zu einem Safety (2 Punkte für den Gegner plus Ballbesitz)."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Wie viele Yards Strafe werden für 'Roughing the Passer' oder schwere persönliche Fouls verhängt?",
    "a": [
      "15 Yards plus automatisches First Down",
      "10 Yards ohne automatisches First Down",
      "20 Yards plus automatisches First Down",
      "5 Yards mit Wiederholung des Versuchs"
    ],
    "exp": "Persönliche Fouls wie Roughing the Passer, Unnecessary Roughness oder Griffe ins Facemask kosten 15 Yards und schenken ein First Down."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was versteht man unter einem verbotenen 'Horse-Collar Tackle'?",
    "a": [
      "Das gewaltsame Herunterziehen des Gegners am hinteren Kragen oder den Schulterpolstern",
      "Das Blocken eines unvorbereiteten Gegners unterhalb der Kniekehle von der Seite",
      "Das Einklemmen des gegnerischen Helms zwischen den beiden eigenen Oberschenkeln",
      "Das Festhalten des Trikots an der Hüfte bei gleichzeitigem Beinstellen von vorn"
    ],
    "exp": "Roy Williams machte diesen gefährlichen Griff berüchtigt. Wegen hoher Verletzungsgefahr für Knie und Knöchel wird er mit 15 Yards bestraft."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Welche Strafe droht einem Team bei 'Illegal Formation' (z. B. weniger als 7 Spieler an der Line of Scrimmage)?",
    "a": [
      "5 Yards Raumverlust",
      "10 Yards Raumverlust",
      "15 Yards Raumverlust",
      "Verlust des Versuchs ohne Raumverlust"
    ],
    "exp": "Die Offense muss beim Snap mit mindestens 7 Spielern an der Line of Scrimmage stehen. Fehlt ein Spieler, gibt es 5 Yards Strafe."
  },
  {
    "cat": "regeln_taktik",
    "diff": "pro",
    "q": "Was ist der Unterschied zwischen 'Illegal Motion' und einem 'Illegal Shift'?",
    "a": [
      "Bei Shift bewegen sich mehrere Spieler, die vor dem Snap nicht 1 Sekunde stillstanden",
      "Illegal Motion darf nur gegen Tight Ends und Running Backs verhängt werden",
      "Illegal Shift ist ein Dead Ball Foul und wird vor dem Snap sofort abgepfiffen",
      "Illegal Motion zieht grundsätzlich den Verlust des Downs nach sich"
    ],
    "exp": "Wechseln zwei Spieler die Position (Shift), müssen alle vor dem Snap 1 Sekunde komplett ruhen. Bei Motion darf sich genau ein Spieler parallel oder nach hinten bewegen."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was ahndet der Schiedsrichter mit einer Flagge für 'Taunting'?",
    "a": [
      "Verhöhnen oder provokantes Verhalten gegenüber einem gegnerischen Spieler",
      "Unerlaubtes Vorbringen taktischer Anweisungen von der Trainerbank aus",
      "Absichtliches Verzögern der Ballübergabe an das Schiedsrichtergespann",
      "Das Tragen nicht reglementierter Socken oder Schuhe auf dem Spielfeld"
    ],
    "exp": "Taunting (unsportliches Verhöhnen) wird in der NFL streng mit 15 Yards Strafe geahndet, bei zwei Vergehen droht der Platzverweis."
  },
  {
    "cat": "regeln_taktik",
    "diff": "pro",
    "q": "Was ist ein verbotener 'Chop Block' im American Football?",
    "a": [
      "Ein tiefer Block gegen einen Spieler, der bereits oben von einem Mitspieler geblockt wird",
      "Ein Schlag mit der Faust gegen die Brustplatte des gegnerischen Defensiv-Lineman",
      "Ein Sprung mit beiden Knien voran in den heranstürmenden gegnerischen Punter",
      "Das Wegschubsen des Centers unmittelbar nach der Ausführung des Snaps"
    ],
    "exp": "Wird ein Spieler oben und zeitgleich unten an den Beinen geblockt (High-Low), drohen schwere Knieverletzungen – daher verboten (15 Yards)."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Wann ist ein Vorwärtspass als 'Illegal Forward Pass' einzustufen?",
    "a": [
      "Wenn der Pass geworfen wird, nachdem der Werfer die Line of Scrimmage überschritten hat",
      "Wenn der Pass von einem Tight End gefangen wird, der sich vorher gemeldet hatte",
      "Wenn der Ball während des Fluges die Hand des gegnerischen Pass-Rushers streift",
      "Wenn der Quarterback den Pass mit beiden Händen gleichzeitig nach vorne stößt"
    ],
    "exp": "Pro Spielzug ist nur ein einziger Vorwärtspass erlaubt, und dieser muss zwingend hinter der Line of Scrimmage ausgeführt werden."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Welche Position gilt als wichtigste Führungskraft und 'Spielmacher' der Offense auf dem Feld?",
    "a": [
      "Quarterback (QB)",
      "Middle Linebacker (MLB)",
      "Center (C)",
      "Wide Receiver (WR)"
    ],
    "exp": "Der Quarterback sagt die Spielzüge an, empfängt den Snap und verteilt den Ball per Handoff oder Pass."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Warum gilt der 'Left Tackle' in der Offensive Line bei einem rechtshändigen Quarterback als Schlüsselspieler?",
    "a": [
      "Er schützt die 'Blind Side' des Quarterbacks vor Attacken aus dessen totem Winkel",
      "Er ist der einzige Lineman, der regulär Pässe in der Endzone fangen darf",
      "Er übernimmt bei verletztem Center automatisch die Ausführung aller Snaps",
      "Er legt die Route für den Laufspielzug durch die gegnerische Defensive Line fest"
    ],
    "exp": "Ein rechtshändiger QB dreht sich beim Werfen nach rechts. Von links hinten sieht er Pass-Rusher nicht – daher ist der Left Tackle enorm wertvoll."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Welche Spieler bilden die 'Offensive Line' (O-Line) eines Football-Teams?",
    "a": [
      "Center, zwei Guards und zwei Tackles",
      "Quarterback, zwei Running Backs und zwei Wide Receiver",
      "Drei Tight Ends und zwei berichtigte Fullbacks",
      "Zwei Defensive Ends und drei Defensive Tackles"
    ],
    "exp": "Die O-Line besteht standardmäßig aus dem Center (in der Mitte), den beiden Guards daneben und den beiden äußeren Tackles."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Welche Doppelrolle vereint die Position des 'Tight End' (TE) im modernen Angriffsspiel?",
    "a": [
      "Er agiert sowohl als wuchtiger Blocker an der Linie als auch als Passempfänger",
      "Er wechselt flexibel zwischen der Quarterback-Position und dem Kicking Team",
      "Er sichert die Außenbahnen in der Defense und kickt zusätzlich alle Punts",
      "Er snappt den Ball bei Weitschüssen und sprintet danach als Gunner nach vorn"
    ],
    "exp": "Moderne Tight Ends wie Travis Kelce oder Rob Gronkowski sind athletische Hybride: Sie blocken für den Lauf und fangen Touchdown-Pässe."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Welche Position in der Defense wird wegen ihrer zentralen Rolle oft als 'Quarterback der Defense' bezeichnet?",
    "a": [
      "Middle Linebacker (MLB)",
      "Strong Safety (SS)",
      "Defensive End (DE)",
      "Cornerback (CB)"
    ],
    "exp": "Der Middle Linebacker ('Mike') koordiniert die Abwehr, sagt defensive Adjustments an und trägt meist das Headset im Helm."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was unterscheidet die Aufgaben eines 'Free Safety' von denen eines 'Strong Safety'?",
    "a": [
      "Der Free Safety sichert tief das Feld, der Strong Safety spielt näher an der Linie",
      "Der Free Safety darf nicht tackeln, der Strong Safety darf nur Pässe abfangen",
      "Der Free Safety spielt ausschließlich bei Field-Goal-Versuchen des Gegners",
      "Der Strong Safety deckt stets den kleinsten gegnerischen Wide Receiver ab"
    ],
    "exp": "Der Strong Safety orientiert sich an der 'starken' Seite (Tight End) und hilft gegen den Lauf. Der Free Safety patrouilliert als letzte Absicherung tief."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Welche Trikotnummern trugen Offensive Linemen historisch, um als 'nicht fangberechtigt' (Ineligible) zu gelten?",
    "a": [
      "Nummern von 50 bis 79",
      "Nummern von 1 bis 19",
      "Nummern von 80 bis 89",
      "Nummern von 20 bis 49"
    ],
    "exp": "Spieler mit Nummern von 50 bis 79 dürfen keine Vorwärtspässe fangen, es sei denn, sie melden sich vor dem Spielzug beim Schiedsrichter als 'Eligible'."
  },
  {
    "cat": "regeln_taktik",
    "diff": "pro",
    "q": "Was bedeutet das Handzeichen des Schiedsrichters, wenn er über das Mikrofon sagt: 'Number 74 has reported as eligible'?",
    "a": [
      "Ein Offensive Lineman meldet sich als berechtigter Passempfänger für diesen Spielzug an",
      "Ein Defensivspieler kündigt an, beim kommenden Snap den gegnerischen Kicker zu blocken",
      "Ein Ersatzspieler betritt das Feld nach Ablauf der regulären Wechselfrist",
      "Ein Spieler verzichtet freiwillig auf die Ausführung seiner Schutzkleidungspflicht"
    ],
    "exp": "Meldet sich ein Tackle als eligible an, darf er auf einer Receiver- oder Tight-End-Position aufgestellt werden und legal Pässe fangen."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Welcher Spieler gehört zu den 'Special Teams' und führt den Punt aus?",
    "a": [
      "Punter",
      "Placekicker",
      "Long Snapper",
      "Gunner"
    ],
    "exp": "Der Punter kickt den Ball aus den Händen tief in die gegnerische Hälfte, wenn die Offense bei 4th Down Raumgewinn aufgeben muss."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was ist die Hauptaufgabe eines 'Gunners' im Punt-Team der Special Teams?",
    "a": [
      "Als schneller Außenspieler nach dem Punt nach vorne zu sprinten und den Returner zu stoppen",
      "Den anstürmenden gegnerischen Pass-Rusher mit einem harten Block wegzustoßen",
      "Den Football mit besonders viel Spin direkt vor den Händen des Punters zu platzieren",
      "Den gegnerischen Quarterback auf der Trainerbank akustisch abzulenken"
    ],
    "exp": "Die Gunner stehen ganz außen und sprinten beim Punt ungebremst los, um den gegnerischen Returner sofort bei Ballannahme zu tackeln."
  },
  {
    "cat": "regeln_taktik",
    "diff": "pro",
    "q": "Was ist eine 'Nickel Defense' im Defensiv-System eines Football-Teams?",
    "a": [
      "Eine Formation mit 5 Defensive Backs (ein Linebacker weicht für einen extra Cornerback)",
      "Eine Formation mit genau 5 Defensive Tackles direkt an der Line of Scrimmage",
      "Ein spezielles Kicking-System, bei dem 5 Spieler das Tor vor Blocks absichern",
      "Eine Verteidigung, die ausschließlich in den letzten fünf Spielminuten genutzt wird"
    ],
    "exp": "Nickel leitet sich von der 5-Cent-Münze ab: Die Abwehr bringt 5 statt der üblichen 4 Defensive Backs auf den Rasen, um Passangriffe abzuwehren."
  },
  {
    "cat": "regeln_taktik",
    "diff": "pro",
    "q": "Wie viele Defensive Backs stehen bei einer sogenannten 'Dime Defense' auf dem Spielfeld?",
    "a": [
      "6 Defensive Backs",
      "7 Defensive Backs",
      "5 Defensive Backs",
      "8 Defensive Backs"
    ],
    "exp": "Zwei Nickels ergeben einen Dime (10 Cent): Bei der Dime Defense stehen 6 Defensive Backs auf dem Feld, typischerweise bei offensichtlichen Pass-Situationen."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Was versteht man im American Football unter einem 'Blitz' der Defense?",
    "a": [
      "Linebacker oder Safeties stürmen überraschend nach vorne, um den Quarterback zu attackieren",
      "Die Verteidiger ziehen sich geschlossen an die eigene hintere Goalline zurück",
      "Der Kicker schießt den Ball mit maximaler Wucht flach auf den Boden des Gegners",
      "Alle Abwehrspieler wechseln im Spielzug simultan auf eine Mann-zu-Mann-Deckung"
    ],
    "exp": "Beim Blitz schickt die Defense zusätzliche Verteidiger über die 4 Standard-Pass-Rusher hinaus, um den QB schnell unter Druck zu setzen."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was ist das Grundprinzip eines 'Play-Action Pass' der Offense?",
    "a": [
      "Der Quarterback täuscht eine Ballübergabe an den Running Back vor, um dann zu werfen",
      "Der Quarterback übergibt den Ball sofort an den Kicker für einen Dropkick",
      "Zwei Wide Receiver kreuzen ihre Laufwege so, dass der Schiedsrichter die Sicht verliert",
      "Der Center wirft den Ball durch die eigenen Beine direkt auf den linken Außenstürmer"
    ],
    "exp": "Durch den vorgetäuschten Lauf ('Fake') reagieren Linebacker und Safeties nach vorne, wodurch dahinter Freiräume für Passfänger entstehen."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Wofür steht die moderne offensive Taktik-Abkürzung 'RPO'?",
    "a": [
      "Run-Pass Option (der Quarterback entscheidet erst nach dem Snap zwischen Lauf und Pass)",
      "Return-Punt Order (die feste Reihenfolge für Spielerwechsel bei Kickoffs)",
      "Right-Pocket Operation (ein gezielter Passversuch ausschließlich über die rechte Seite)",
      "Redzone-Protection Offensive (ein spezieller Schutzblock an der Goalline)"
    ],
    "exp": "Beim RPO liest der QB nach dem Snap einen Verteidiger: Greift dieser den Lauf an, wirft der QB schnell zu einem freien Receiver."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was kennzeichnet einen typischen 'Screen Pass'?",
    "a": [
      "Ein kurzer Pass hinter eine Wand aus vorrückenden eigenen Offensive Linemen",
      "Ein weiter Pass über mehr als 50 Yards direkt in die gegnerische Endzone",
      "Ein Pass, bei dem der Football über die riesige Stadion-Videoleinwand geworfen wird",
      "Ein Passversuch, der von zwei Taktik-Coaches vorab am Tablet freigegeben wurde"
    ],
    "exp": "Beim Screen Pass lässt die O-Line die gegnerischen Rusher scheinbar durch, postiert sich aber vor dem Receiver, um den Weg freizublocken."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Was bezeichnet der Begriff 'Hail Mary' im Football-Jargon?",
    "a": [
      "Einen Verzweiflungswurf über das ganze Feld in die Endzone in letzter Sekunde",
      "Einen perfekt gezielten Onside Kick kurz vor dem Ende der regulären Spielzeit",
      "Ein Bittgebet des Trainers vor dem Ausführen eines spielentscheidenden Field Goals",
      "Das Abknien des Quarterbacks in der eigenen Endzone zur Zeitschindung"
    ],
    "exp": "Der Begriff wurde 1975 durch Roger Staubach berühmt, der nach seinem Last-Second-Pass sagte, er habe ein 'Gegrüßet seist du, Maria' gebetet."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Wie signalisiert ein Returner beim Punt oder Kickoff einen 'Fair Catch'?",
    "a": [
      "Er winkt mit einem ausgestreckten Arm deutlich über seinem Kopf hin und her",
      "Er wirft seinen Helm auf den Rasen und bleibt mit dem Rücken zum Kicker stehen",
      "Er kniet mit beiden Beinen vor dem Aufprall des Balls auf den Boden",
      "Er ruft laut dreimal das Wort 'Stopp' in Richtung des Schiedsrichters"
    ],
    "exp": "Durch das Winken verzichtet der Returner auf den Lauf, darf dafür aber nicht angegriffen werden. Das Team startet an der Fangstelle."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Welche Bedingung muss ein 'Onside Kick' zwingend erfüllen, damit das Kicking Team den Ball legal erobern darf?",
    "a": [
      "Der Ball muss mindestens 10 Yards zurückgelegt oder einen Gegenspieler berührt haben",
      "Der Ball muss vor der ersten Berührung mindestens 25 Yards weit geflogen sein",
      "Der Ball muss zwingend von einem gegnerischen Spieler ins Seitenaus gelenkt werden",
      "Der Kicker muss den Football vor der Ballberührung dreimal auf den Boden tippen lassen"
    ],
    "exp": "Erst nach 10 Yards ist der Ball frei ('Live Ball'). Berührt ein gegnerischer Spieler den Ball früher, ist er sofort für alle frei eroberbar."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Was ist der Unterschied zwischen einem 'Fumble' und einer 'Interception'?",
    "a": [
      "Ein Fumble ist der Verlust eines kontrollierten Balls; eine Interception fängt einen gegnerischen Pass ab",
      "Ein Fumble darf nur von der Offense erobert werden, eine Interception nur von Verteidigern",
      "Eine Interception bringt automatisch 6 Punkte, ein Fumble zählt als 2-Punkte-Safety",
      "Ein Fumble entsteht nur beim Kickoff, eine Interception nur in den letzten 2 Minuten"
    ],
    "exp": "Verliert ein Ballträger nach Ballkontrolle das Ei, ist es ein freier Ball (Fumble). Fängt die Defense einen Vorwärtspass direkt aus der Luft, ist es eine Interception."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was ist ein 'Touchback' nach einem Punt oder Kickoff in die Endzone?",
    "a": [
      "Der Ball wird in der Endzone gesichert/ausgerollt; die Offense startet an einer festgelegten Yardlinie",
      "Der Kicker erhält automatisch einen weiteren Versuch zur Wiederholung des Schusses",
      "Die verteidigende Mannschaft erhält 2 Punkte und den anschließenden Ballbesitz",
      "Der Spielzug wird abgebrochen und beide Teams wechseln geschlossen die Seiten"
    ],
    "exp": "Wird der Ball in der Endzone gesichert oder fliegt hindurch, ist der Spielzug tot (Touchback) und der folgende Drive startet an der 20-, 25- bzw. 30-Yard-Linie."
  },
  {
    "cat": "regeln_taktik",
    "diff": "pro",
    "q": "Was ist das Besondere an einem 'Lateral Pass' (Rückwärtspass) im American Football?",
    "a": [
      "Er darf beliebig oft und an jeder Stelle des Spielfelds nach hinten geworfen werden",
      "Er ist nur hinter der eigenen 10-Yard-Linie und vor dem ersten Down erlaubt",
      "Er muss vor dem Werfen zwingend durch ein Handzeichen angekündigt werden",
      "Er darf ausschließlich vom Fullback auf den Quarterback ausgeführt werden"
    ],
    "exp": "Ein Pass nach hinten (oder parallel) ist im Gegensatz zum Vorwärtspass unbegrenzt oft erlaubt. Fällt er auf den Boden, bleibt er als Fumble live!"
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was versteht man unter der 'Victory Formation' (Kneel Down) der Offense?",
    "a": [
      "Der Quarterback kniet direkt nach dem Snap ab, um die verbleibende Spielzeit gefahrlos herunterzuspielen",
      "Alle 11 Spieler stellen sich an der Mittellinie auf, um dem Gegner sportlich zu gratulieren",
      "Die Offense formiert sich in Kreisform, um den letzten Touchdown des Spiels zu bejubeln",
      "Der Head Coach betritt das Spielfeld mit erhobenen Armen vor dem finalen Schlusspfiff"
    ],
    "exp": "Hat der Gegner keine Timeouts mehr, kniet der QB einfach ab. Die Uhr läuft weiter und das Spiel ist ohne Verletzungs- oder Fumble-Risiko gewonnen."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was bewirkt ein sogenannter 'Hard Count' des Quarterbacks an der Line of Scrimmage?",
    "a": [
      "Durch gezielte Betonung und Pausen beim Snap-Signal soll die Defense ins Abseits gelockt werden",
      "Er zählt laut die verbleibenden Sekunden auf der Play Clock für seine Mitspieler herunter",
      "Er gibt den Schiedsrichtern ein geheimes Signal für eine bevorstehende Coach's Challenge",
      "Er teilt dem Center mit, dass der Ball mit maximaler Wucht nach hinten geschleudert werden soll"
    ],
    "exp": "Mit variierendem Rhythmus ('Omaha!', 'Blue 80 - Hut!') will der QB die Defensive Linemen zum voreiligen Zucken (Offside) verleiten."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Was versteht man unter einem 'Audible' im Football?",
    "a": [
      "Eine spontane Änderung des Spielzugs durch den Quarterback direkt an der Line of Scrimmage",
      "Ein lauter Protest des Head Coaches gegen eine Schiedsrichterentscheidung am Rand",
      "Die Durchsage des Stadionsprechers über die aktuelle Verteilung der Zuschauerzahlen",
      "Das akustische Signal des Zeitnehmers beim Erreichen des Two-Minute Warnings"
    ],
    "exp": "Erkennt der Quarterback eine Schwachstelle in der gegnerischen Aufstellung, ändert er den Spielzug per lautem Zuruf kurz vor dem Snap."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was ist die Taktik des 'Draw Play' bei einem Angriffsversuch?",
    "a": [
      "Die Offense täuscht einen Passversuch an, übergibt den Ball dann aber verzögert an den Läufer",
      "Zwei Quarterbacks werfen sich den Ball gegenseitig über die Line of Scrimmage zu",
      "Die Offensive Line lässt alle Verteidiger bewusst durch, um ein Holding-Foul zu provozieren",
      "Der Running Back stoppt vor der Goalline ab und wirft einen Rückpass auf den Kicker"
    ],
    "exp": "Beim Draw lockt die O-Line die Pass-Rusher aggressiv nach vorn; der Running Back schlüpft dann durch die entstandenen Lücken."
  },
  {
    "cat": "regeln_taktik",
    "diff": "pro",
    "q": "Was kennzeichnet die legendäre 'Tampa 2' Defense, die von Tony Dungy populär gemacht wurde?",
    "a": [
      "Eine Cover-2-Zone, bei der der Middle Linebacker tief in die Spielfeldmitte absinkt",
      "Eine aggressive 8-Mann-Box mit ständigem Blitzing beider Safety-Positionen",
      "Eine reine Manndeckung, bei der kein einziger Pass-Rusher die Linie attackiert",
      "Ein System, bei dem die beiden Defensive Tackles die gegnerischen Wide Receiver decken"
    ],
    "exp": "In der Tampa 2 schließen die beiden Safeties die tiefen Außenseiten ab, während der Middle Linebacker ('Urlacher-Rolle') die tiefe Mitte übernimmt."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Wie viele Schiedsrichter stehen bei einem offiziellen NFL-Spiel auf dem Rasen?",
    "a": [
      "7 Schiedsrichter (angeführt vom Referee mit weißer Mütze)",
      "4 Schiedsrichter (zwei an den Linien und zwei im Rückraum)",
      "5 Schiedsrichter (analog zu den fünf Spielern der O-Line)",
      "9 Schiedsrichter (inklusive zwei Torrichtern hinter den Pfosten)"
    ],
    "exp": "Die On-Field-Crew besteht aus 7 Referees. Der Hauptschiedsrichter ('Referee') trägt als einziger eine weiße Mütze."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Wie signalisiert ein NFL-Head-Coach, dass er eine Schiedsrichterentscheidung per Videobeweis anfechten will?",
    "a": [
      "Er wirft eine rote Flagge auf das Spielfeld",
      "Er wirft eine gelbe Flagge auf das Spielfeld",
      "Er drückt einen roten Notfallknopf an seiner Trainerbank",
      "Er formt mit beiden Zeigefingern ein großes 'T' in der Luft"
    ],
    "exp": "Der Head Coach wirft seine rote Challenge-Flagge. Gelbe Flaggen gehören ausschließlich den Schiedsrichtern für Fouls."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was verliert ein Team in der NFL, wenn seine Videobeweis-Challenge erfolglos bleibt?",
    "a": [
      "Eine Auszeit (Timeout)",
      "10 Yards Raumverlust beim nächsten Snap",
      "Das Recht auf weitere Trainer-Interviews",
      "Den ersten Versuch der nächsten Angriffsserie"
    ],
    "exp": "Lag der Coach mit seiner Challenge falsch, wird seinem Team eine reguläre Auszeit abgezogen. Hat er keine mehr, darf er nicht challengen."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Dürfen Coaches in den letzten zwei Spielminuten einer Halbzeit noch eine rote Challenge-Flagge werfen?",
    "a": [
      "Nein, in dieser Phase prüft ausschließlich der Video-Replay-Official ('Booth Review')",
      "Ja, aber nur wenn das Team noch mindestens zwei Timeouts zur Verfügung hat",
      "Ja, allerdings kostet eine falsche Challenge in dieser Phase gleich 15 Yards Strafe",
      "Nur dann, wenn der Schiedsrichter zuvor ein persönliches Foul übersehen hat"
    ],
    "exp": "Ab dem Two-Minute Warning und in der Overtime kommen alle Reviews automatisch aus dem Videoraum ('Booth Review'). Ein Wurf der Flagge ist verboten."
  },
  {
    "cat": "regeln_taktik",
    "diff": "pro",
    "q": "Welche wesentliche Neuerung gilt für Overtime-Spiele in den NFL-Playoffs seit 2022?",
    "a": [
      "Beide Teams erhalten garantiert mindestens einmal den Ballbesitz, selbst bei frühem Touchdown",
      "Ein Spiel endet sofort nach dem ersten erzielten Field Goal im Sudden Death",
      "Die Verlängerung wird durch ein Field-Goal-Schießen aus 45 Yards Distanz entschieden",
      "Die Teams müssen ohne Defensive Line mit nur 7 gegen 7 Spielern antreten"
    ],
    "exp": "Nach Kritik am alten Sudden Death (Münzwurf-Glück) bekommt in den Playoffs nun jedes Team mindestens eine Angriffsserie – egal was das erste Team erzielt."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was passiert in der regulären NFL-Saison, wenn nach 10 Minuten Overtime immer noch Gleichstand herrscht?",
    "a": [
      "Das Spiel endet offiziell mit einem Unentschieden (Tie)",
      "Es wird eine zweite Overtime von weiteren 15 Minuten angehängt",
      "Das Team mit den meisten Gesamt-Yards wird zum Sieger erklärt",
      "Beide Quarterbacks treten in einem Pass-Präzisions-Wettbewerb an"
    ],
    "exp": "In der Regular Season endet das Spiel nach maximal einer 10-Minuten-Verlängerung unentschieden. In den Playoffs wird gespielt, bis ein Sieger feststeht."
  },
  {
    "cat": "regeln_taktik",
    "diff": "pro",
    "q": "Was versteht man unter dem seltenen 'Fair Catch Kick' in den NFL-Regeln?",
    "a": [
      "Ein unbedrängter Field-Goal-Versuch vom Punkt eines gefangenen Fair Catches ohne Snap",
      "Ein Befreiungskick aus der Hand des Quarterbacks bei ablaufender Spielzeit",
      "Ein Kickoff, der nach einem Fair Catch um 15 Yards nach vorne verlegt wird",
      "Ein Schuss, der dem Gegner bei Gelingen automatisch 4 Punkte auf der Anzeigetafel bringt"
    ],
    "exp": "Nach einem Fair Catch darf ein Team einen Free Kick auf die Torstangen wählen. Gelingt der Kick, zählt er wie ein normales Field Goal (3 Punkte)!"
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Was ist die Aufgabe der sogenannten 'Chain Gang' am Spielfeldrand?",
    "a": [
      "Sie misst mit einer 10-Yard-Kette exakt nach, ob ein First Down erzielt wurde",
      "Sie transportiert verletzte Spieler mit einer speziellen Liege vom Feld",
      "Sie sichert die Pylonen vor unbefugtem Betreten durch Zuschauer ab",
      "Sie zählt die Anzahl der Pässe für die offizielle Spielstatistik mit"
    ],
    "exp": "Zwei Helfer halten die Pfosten der 10-Yard-Kette, ein dritter den 'Clip'. Bei Millimeter-Entscheidungen kommt die Kette aufs Feld ('Measurement')."
  },
  {
    "cat": "regeln_taktik",
    "diff": "easy",
    "q": "Warum tragen NFL-Spieler oft schwarze Streifen unter den Augen ('Eye Black')?",
    "a": [
      "Um störende Lichtreflexe von Sonne und Stadionflutlicht auf den Wangen zu reduzieren",
      "Als vorgeschriebenes Erkennungszeichen für Verteidiger an der Line of Scrimmage",
      "Um den gegnerischen Spielern im Zweikampf ein finstereres Aussehen zu vermitteln",
      "Um das Verrutschen des Gesichts- und Mundschutzes beim Schwitzen zu verhindern"
    ],
    "exp": "Die dunkle Paste absorbiert Lichtstrahlung und verhindert, dass Sonnen- oder Flutlicht von den Wangenknochen in die Augen reflektiert wird."
  },
  {
    "cat": "regeln_taktik",
    "diff": "mid",
    "q": "Welche Strafe wird verhängt, wenn ein Spieler den Ball vor dem Überqueren der Goalline vorzeitig fallen lässt?",
    "a": [
      "Es ist ein Fumble; rollt der Ball ins Aus der Endzone, gibt es Touchback für den Gegner",
      "Der Touchdown zählt trotzdem, sofern der Spieler mit den Füßen in der Endzone stand",
      "Das Schiedsrichtergespann verhängt eine Strafe von 5 Yards wegen Spielverzögerung",
      "Der Spielzug wird abgepfiffen und an der 1-Yard-Linie für die Offense wiederholt"
    ],
    "exp": "Lockerheit wird bestraft: Lässt der Spieler den Ball vor der Goalline los, ist es ein Fumble. Rollt er durch die Endzone ins Aus, erhält der Gegner den Ball per Touchback!"
  }
];

  // Ensure 'exp' and 'explanation' fields are aligned
  DATA.forEach(q => {
    if (!q.explanation && q.exp) q.explanation = q.exp;
    if (!q.exp && q.explanation) q.exp = q.explanation;
  });

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("american_football_regeln", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["american_football_regeln"] = DATA;
  }
})();
