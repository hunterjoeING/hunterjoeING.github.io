// Unified quiz bank for "mil_air" (75 questions: Militärflugzeuge)
(function () {
  const DATA = [
  {
    "cat": "jets",
    "diff": "easy",
    "q": "Welcher US-Kampfjet ging 2005 als weltweit erster einsatzfähiger Luftüberlegenheitsjäger der 5. Generation mit Tarnkappentechnik in Dienst?",
    "a": [
      "Lockheed Martin F-22 Raptor",
      "Lockheed Martin F-16 Fighting Falcon",
      "Boeing F/A-18E Super Hornet",
      "Grumman F-14 Tomcat"
    ],
    "explanation": "Die F-22 Raptor kombinierte als erstes Serienflugzeug extreme Stealth-Eigenschaften mit Supercruise und 2D-Schubvektorsteuerung.",
    "exp": "Die F-22 Raptor kombinierte als erstes Serienflugzeug extreme Stealth-Eigenschaften mit Supercruise und 2D-Schubvektorsteuerung."
  },
  {
    "cat": "jets",
    "diff": "easy",
    "q": "Welche vier europäischen Staaten entwickelten und bauten gemeinsam das Mehrzweckkampfflugzeug Eurofighter Typhoon?",
    "a": [
      "Deutschland, Großbritannien, Italien und Spanien",
      "Frankreich, Schweden, Belgien und die Niederlande",
      "Deutschland, Frankreich, Schweden und Polen",
      "Großbritannien, Norwegen, Dänemark und Schweiz"
    ],
    "explanation": "Frankreich stieg früh aus dem gemeinsamen Projekt aus, um mit der Dassault Rafale einen rein nationalen Kampfjet zu entwickeln.",
    "exp": "Frankreich stieg früh aus dem gemeinsamen Projekt aus, um mit der Dassault Rafale einen rein nationalen Kampfjet zu entwickeln."
  },
  {
    "cat": "jets",
    "diff": "easy",
    "q": "Welche Version der modernen F-35 Lightning II ist für Senkrechtlandungen und Kurzstarts (STOVL) mit einem Hubgebläse ausgestattet?",
    "a": [
      "F-35B (für US Marine Corps und Royal Air Force)",
      "F-35A (Standard-Heer- und Luftwaffenversion)",
      "F-35C (Flugzeugträgerversion mit Großflügel)",
      "F-35I Adir (Spezialversion der israelischen Luftwaffe)"
    ],
    "explanation": "Die F-35B nutzt ein vertikales Rolls-Royce-Hubgebläse hinter dem Cockpit sowie eine um 95 Grad nach unten schwenkbare Hauptdüse.",
    "exp": "Die F-35B nutzt ein vertikales Rolls-Royce-Hubgebläse hinter dem Cockpit sowie eine um 95 Grad nach unten schwenkbare Hauptdüse."
  },
  {
    "cat": "jets",
    "diff": "easy",
    "q": "Welcher ikonische US-Marinejäger mit Schwenkflügeln erlangte durch den Kinofilm 'Top Gun' von 1986 weltweiten Kultstatus?",
    "a": [
      "Grumman F-14 Tomcat",
      "McDonnell Douglas F-15 Eagle",
      "General Dynamics F-111 Aardvark",
      "Vought F-8 Crusader"
    ],
    "explanation": "Die F-14 Tomcat schützte Flugzeugträgerkampfgruppen mit ihren variablen Schwenkflügeln und den weitreichenden AIM-54 Phoenix-Raketen.",
    "exp": "Die F-14 Tomcat schützte Flugzeugträgerkampfgruppen mit ihren variablen Schwenkflügeln und den weitreichenden AIM-54 Phoenix-Raketen."
  },
  {
    "cat": "jets",
    "diff": "easy",
    "q": "Um welche gigantische siebenläufige 30-mm-Gatling-Kanone herum wurde das US-Erdkampfflugzeug A-10 Thunderbolt II konstruiert?",
    "a": [
      "GAU-8/A Avenger",
      "M61A1 Vulcan (20 mm)",
      "Mauser BK-27 (27 mm)",
      "GSch-30-1 (30 mm)"
    ],
    "explanation": "Die GAU-8/A Avenger ist samt Munitionstrommel über 6 Meter lang; das Bugfahrwerk der A-10 musste dafür seitlich versetzt werden.",
    "exp": "Die GAU-8/A Avenger ist samt Munitionstrommel über 6 Meter lang; das Bugfahrwerk der A-10 musste dafür seitlich versetzt werden."
  },
  {
    "cat": "jets",
    "diff": "easy",
    "q": "Welches Land baute den Saab 39 Gripen gezielt für Starts von kurzen Autobahn-Behelfslandebahnen?",
    "a": [
      "Schweden",
      "Norwegen",
      "Finnland",
      "Schweiz"
    ],
    "explanation": "Schwedens Bas-90-Doktrin verlangte Starts von 800-Meter-Straßenabschnitten und die Betankung/Aufmunitionierung binnen 10 Minuten durch Wehrpflichtige.",
    "exp": "Schwedens Bas-90-Doktrin verlangte Starts von 800-Meter-Straßenabschnitten und die Betankung/Aufmunitionierung binnen 10 Minuten durch Wehrpflichtige."
  },
  {
    "cat": "jets",
    "diff": "mid",
    "q": "Welche makellose Luftkampfbilanz (Abschüsse zu eigenen Verlusten im Luftkampf) hält die McDonnell Douglas F-15 Eagle bis heute?",
    "a": [
      "Über 100 Siege bei 0 eigenen Verlusten im Luftkampf",
      "Genau 50 Siege bei 25 Verlusten",
      "Rund 320 Siege bei 110 Verlusten",
      "Knapp 12 Siege bei 4 Verlusten"
    ],
    "explanation": "Die F-15 verbucht offiziell über 104 Luftsiege (hauptsächlich durch die israelische und US-Luftwaffe) ohne einen einzigen Verlust im Luft-Luft-Kampf.",
    "exp": "Die F-15 verbucht offiziell über 104 Luftsiege (hauptsächlich durch die israelische und US-Luftwaffe) ohne einen einzigen Verlust im Luft-Luft-Kampf."
  },
  {
    "cat": "jets",
    "diff": "mid",
    "q": "Warum trug die berühmte Lockheed F-117 Nighthawk die Kennung 'F' (Fighter), obwohl sie ein reiner Bomber war?",
    "a": [
      "Zur Tarnung des geheimen Programms und um hochkarätige Jagdpiloten für Tests zu rekrutieren",
      "Weil sie im Notfall Mach 2,5 im Überschall-Luftkampf fliegen konnte",
      "Weil sie standardmäßig mit vier wärmesuchenden Sidewinder-Raketen flog",
      "Aufgrund eines bürokratischen Tippfehlers im US-Verteidigungsministerium"
    ],
    "explanation": "Die F-117 besaß weder Radar noch Bordkanone noch Luftkampffähigkeit. Das 'F' lockte Top-Piloten an und verschleierte den Angriffscharakter.",
    "exp": "Die F-117 besaß weder Radar noch Bordkanone noch Luftkampffähigkeit. Das 'F' lockte Top-Piloten an und verschleierte den Angriffscharakter."
  },
  {
    "cat": "jets",
    "diff": "mid",
    "q": "Wie lautet der offizielle NATO-Codename für das russische Tarnkappen-Kampfflugzeug Suchoi Su-57?",
    "a": [
      "Felon",
      "Flanker",
      "Fulcrum",
      "Foxhound"
    ],
    "explanation": "Nach NATO-Konvention beginnen Jagdflugzeuge mit 'F': Flanker steht für Su-27/35, Fulcrum für MiG-29, Foxhound für MiG-31 und Felon für Su-57.",
    "exp": "Nach NATO-Konvention beginnen Jagdflugzeuge mit 'F': Flanker steht für Su-27/35, Fulcrum für MiG-29, Foxhound für MiG-31 und Felon für Su-57."
  },
  {
    "cat": "jets",
    "diff": "mid",
    "q": "Welches Merkmal unterscheidet die trägergestützte F-35C optisch sofort von der Luftwaffenversion F-35A?",
    "a": [
      "Deutlich größere Tragflächen mit Klappmechanismus für den Trägerhangar",
      "Zwei Triebwerke nebeneinander statt eines einzelnen Triebwerks",
      "Canard-Vorflügel (Entenflügel) direkt vor der Cockpithaube",
      "Ein komplett rundes Rumpfprofil ohne kantige Kanten"
    ],
    "explanation": "Größere Tragflächen erlauben der F-35C langsamere, sichere Anflüge auf den Flugzeugträger; die Flügelenden klappen im Trägerhangar nach oben.",
    "exp": "Größere Tragflächen erlauben der F-35C langsamere, sichere Anflüge auf den Flugzeugträger; die Flügelenden klappen im Trägerhangar nach oben."
  },
  {
    "cat": "jets",
    "diff": "mid",
    "q": "Welcher britische Senkrechtstarter schrieb im Falklandkrieg 1982 Luftfahrtgeschichte?",
    "a": [
      "BAe Sea Harrier",
      "Panavia Tornado ADV",
      "English Electric Lightning",
      "Hawker Hunter"
    ],
    "explanation": "Mit Vektor-Schubdüsen (VIFF - Vectoring in Forward Flight) errangen britische Sea Harrier 20 Luftsiege ohne eigenen Luftkampfverlust.",
    "exp": "Mit Vektor-Schubdüsen (VIFF - Vectoring in Forward Flight) errangen britische Sea Harrier 20 Luftsiege ohne eigenen Luftkampfverlust."
  },
  {
    "cat": "jets",
    "diff": "mid",
    "q": "Was ist das primäre Einsatzkonzept des chinesischen Tarnkappenjägers Chengdu J-20 Mighty Dragon?",
    "a": [
      "Fernabfangen feindlicher Tanker und AWACS-Flugzeuge mit weitreichenden Lenkwaffen",
      "Kurzstrecken-Dogfights im engen Nahbereich über Landungsstränden",
      "Einsatz als Schulflugzeug für ausländische Exportkunden",
      "Ausschließlicher Katapultstart von kleinen Hubschrauberträgern"
    ],
    "explanation": "Die große J-20 ist auf hohe Reichweite, interne Raketenschächte und das Ausschalten von Stützpfeilern wie Tankern und Radarflugzeugen optimiert.",
    "exp": "Die große J-20 ist auf hohe Reichweite, interne Raketenschächte und das Ausschalten von Stützpfeilern wie Tankern und Radarflugzeugen optimiert."
  },
  {
    "cat": "jets",
    "diff": "pro",
    "q": "Aus welchem Grund schoss die F-14 Tomcat ihre schwere Luft-Luft-Rakete AIM-54 Phoenix fast 40 Kilometer steil in die Stratosphäre?",
    "a": [
      "Um in dünner Luft bei minimalem Luftwiderstand maximale Reichweite im Sinkflug zu erzielen",
      "Weil der Raketensucher Satelliten als Wegpunkte anpeilen musste",
      "Um feindlichen Radarstrahlen durch die Erdkrümmung komplett auszuweichen",
      "Weil der Feststoffmotor in dichter Luft sofort überhitzt wäre"
    ],
    "explanation": "Die Phoenix stieg im Loft-Profil auf über 25.000 Meter Höhe auf und stürzte sich im antriebslosen Hyperschall-Gleitflug auf das Ziel herab.",
    "exp": "Die Phoenix stieg im Loft-Profil auf über 25.000 Meter Höhe auf und stürzte sich im antriebslosen Hyperschall-Gleitflug auf das Ziel herab."
  },
  {
    "cat": "jets",
    "diff": "pro",
    "q": "Welches sowjetische Abfangflugzeug verblüffte 1976 den Westen, als Pilot Viktor Belenko damit nach Japan floh?",
    "a": [
      "Mikojan-Gurewitsch MiG-25 Foxbat",
      "Suchoi Su-24 Fencer",
      "Mikojan-Gurewitsch MiG-21 Fishbed",
      "Tupolew Tu-128 Fiddler"
    ],
    "explanation": "Zur Überraschung der US-Ingenieure bestand die bis zu Mach 3 schnelle MiG-25 überwiegend aus Edelstahl und Vakuum-Röhrenelektronik gegen EMP.",
    "exp": "Zur Überraschung der US-Ingenieure bestand die bis zu Mach 3 schnelle MiG-25 überwiegend aus Edelstahl und Vakuum-Röhrenelektronik gegen EMP."
  },
  {
    "cat": "jets",
    "diff": "pro",
    "q": "Welche aerodynamische Instabilität nutzt der Eurofighter Typhoon gezielt aus, um extreme Wendigkeit zu erreichen?",
    "a": [
      "Künstliche Längsinstabilität mit Entenflügeln und ständiger Rechner-Korrektur (Fly-by-Wire)",
      "Starre Schränkung der Flügelspitzen nach unten ohne Querruder",
      "Einen permanent ungleichen Schub beider Triebwerke im Kurvenflug",
      "Einen extremen Schwerpunkt vor der aerodynamischen Flügelnase"
    ],
    "explanation": "Der Eurofighter ist aerodynamisch instabil ausgelegt. Ohne die millisekundenschnellen Korrekturen der vier Flugsteuerungscomputer würde er unkontrollierbar taumeln.",
    "exp": "Der Eurofighter ist aerodynamisch instabil ausgelegt. Ohne die millisekundenschnellen Korrekturen der vier Flugsteuerungscomputer würde er unkontrollierbar taumeln."
  },
  {
    "cat": "jets",
    "diff": "pro",
    "q": "Wie viele Steuerflächen und Düsen steuert das Fly-by-Wire-System der schwedischen Gripen bei einer Landung als aerodynamische Bremse?",
    "a": [
      "Canards stellen sich um 90 Grad senkrecht auf und drücken die Vorderräder auf die Straße",
      "Ein riesiger Bremsfallschirm wird bei jedem Touchdown mechanisch ausgeworfen",
      "Das Triebwerk zündet automatisch eine vorwärtsgerichtete Raketendüse",
      "Die Flügel klappen wie bei einer F-14 im Moment des Aufsetzens nach vorne"
    ],
    "explanation": "Die großen Entenflügel kippen bei der Landung fast senkrecht nach vorne. Das bremst enorm ab und presst das Bugrad für maximale Bremswirkung auf die Piste.",
    "exp": "Die großen Entenflügel kippen bei der Landung fast senkrecht nach vorne. Das bremst enorm ab und presst das Bugrad für maximale Bremswirkung auf die Piste."
  },
  {
    "cat": "jets",
    "diff": "pro",
    "q": "Welches Flugzeug erreichte als einziger operativer Aufklärungsjet im regulären Flugbetrieb über Mach 3,2 in 26 Kilometern Höhe?",
    "a": [
      "Lockheed SR-71 Blackbird",
      "Convair B-58 Hustler",
      "North American XB-70 Valkyrie",
      "Mikojan-Gurewitsch MiG-31"
    ],
    "explanation": "Die SR-71 flog bei Mach 3,2 so schnell und hoch, dass keine Flugabwehrrakete sie jemals einholen konnte – man beschleunigte einfach davon.",
    "exp": "Die SR-71 flog bei Mach 3,2 so schnell und hoch, dass keine Flugabwehrrakete sie jemals einholen konnte – man beschleunigte einfach davon."
  },
  {
    "cat": "jets",
    "diff": "pro",
    "q": "Welches Schicksal ereilte die einzige im Kampfeinsatz abgeschossene F-117 Nighthawk im Kosovokrieg 1999?",
    "a": [
      "Sie wurde von einer serbischen SA-3-Batterie mit modifiziertem Langwellen-Radar geortet",
      "Sie kollidierte nachts mit einer amerikanischen Tankdrohne",
      "Ein Defekt an den Tarnkappen-Facetten entzündete das Fahrwerk",
      "Sie wurde von einer MiG-29 im Dogfight mit Bordkanone getroffen"
    ],
    "explanation": "Oberst Dani Zoltán nutzte sowjetische Langwellenradare bei offener Bombenschachttür der F-117 und feuerte zwei SA-3 Goa Raketen ab.",
    "exp": "Oberst Dani Zoltán nutzte sowjetische Langwellenradare bei offener Bombenschachttür der F-117 und feuerte zwei SA-3 Goa Raketen ab."
  },
  {
    "cat": "jets",
    "diff": "pro",
    "q": "Was versteht man unter dem Begriff 'Kobra-Manöver', das 1989 auf der Pariser Luftfahrtschau mit der Su-27 vorgeführt wurde?",
    "a": [
      "Ein kurzzeitiges extremes Aufbäumen auf über 110 Grad Anstellwinkel ohne Höhengewinn",
      "Einen Sturzflug mit dreifacher Fassrolle um die Längsachse",
      "Ein Drehen um 360 Grad im Stand auf dem Fahrwerk",
      "Das blitzartige Wenden des Jets allein über asymmetrischen Nachbrenner"
    ],
    "explanation": "Testpilot Wiktor Pugatschow stellte die Su-27 für Sekunden senkrecht in die Luft, bremste extrem ab und senkte die Nase ohne Strömungsabriss wieder.",
    "exp": "Testpilot Wiktor Pugatschow stellte die Su-27 für Sekunden senkrecht in die Luft, bremste extrem ab und senkte die Nase ohne Strömungsabriss wieder."
  },
  {
    "cat": "historisch",
    "diff": "easy",
    "q": "Welches deutsche Flugzeug gilt als das weltweit erste einsatzfähige Militärflugzeug mit Turbinen-Strahltriebwerken?",
    "a": [
      "Messerschmitt Me 262 Schwalbe",
      "Heinkel He 111",
      "Focke-Wulf Fw 190",
      "Junkers Ju 87 Stuka"
    ],
    "explanation": "Die zweistrahlige Me 262 flog erstmals im Juli 1942 mit Jumo-004-Triebwerken und ging Mitte 1944 in den Fronteinsatz.",
    "exp": "Die zweistrahlige Me 262 flog erstmals im Juli 1942 mit Jumo-004-Triebwerken und ging Mitte 1944 in den Fronteinsatz."
  },
  {
    "cat": "historisch",
    "diff": "easy",
    "q": "Welches legendäre britische Jagdflugzeug mit elliptischen Flügeln verteidigte Großbritannien 1940 in der Luftschlacht um England?",
    "a": [
      "Supermarine Spitfire",
      "Hawker Typhoon",
      "Gloster Gladiator",
      "Bristol Blenheim"
    ],
    "explanation": "Die Spitfire bildete zusammen mit der robusteren Hawker Hurricane das Rückgrat der britischen Luftverteidigung gegen die Luftwaffe.",
    "exp": "Die Spitfire bildete zusammen mit der robusteren Hawker Hurricane das Rückgrat der britischen Luftverteidigung gegen die Luftwaffe."
  },
  {
    "cat": "historisch",
    "diff": "easy",
    "q": "Welcher US-Begleitjäger brachte den Alliierten durch seinen Rolls-Royce-Merlin-Motor die Luftherrschaft über Deutschland?",
    "a": [
      "North American P-51 Mustang",
      "Republic P-47 Thunderbolt",
      "Curtiss P-40 Warhawk",
      "Lockheed P-38 Lightning"
    ],
    "explanation": "Erst der Einbau des britischen Merlin-Motors (als Lizenzbau Packard V-1650) machte die P-51 zum überlegenen Langstrecken-Begleitjäger für B-17-Bomber.",
    "exp": "Erst der Einbau des britischen Merlin-Motors (als Lizenzbau Packard V-1650) machte die P-51 zum überlegenen Langstrecken-Begleitjäger für B-17-Bomber."
  },
  {
    "cat": "historisch",
    "diff": "easy",
    "q": "Welcher Dreidecker wurde durch Manfred von Richthofen, den 'Roten Baron', im Ersten Weltkrieg weltberühmt?",
    "a": [
      "Fokker Dr.I",
      "Albatros D.III",
      "Sopwith Camel",
      "SPAD S.XIII"
    ],
    "explanation": "Richthofen erzielte seine letzten 19 seiner 80 Luftsiege auf dem wendigen roten Fokker-Dreidecker Dr.I.",
    "exp": "Richthofen erzielte seine letzten 19 seiner 80 Luftsiege auf dem wendigen roten Fokker-Dreidecker Dr.I."
  },
  {
    "cat": "historisch",
    "diff": "easy",
    "q": "Welches japanische Trägerflugzeug dominierte im Pazifikkrieg bis 1942 durch extreme Wendigkeit und Reichweite die Luftkämpfe?",
    "a": [
      "Mitsubishi A6M Zero",
      "Nakajima Ki-43 Hayabusa",
      "Kawasaki Ki-61 Hien",
      "Aichi D3A Val"
    ],
    "explanation": "Die Zero war extrem leicht gebaut und hatte keinen Panzerschutz, was ihr unübertroffene Wendigkeit und über 2.600 km Reichweite verlieh.",
    "exp": "Die Zero war extrem leicht gebaut und hatte keinen Panzerschutz, was ihr unübertroffene Wendigkeit und über 2.600 km Reichweite verlieh."
  },
  {
    "cat": "historisch",
    "diff": "easy",
    "q": "Welcher schwere US-Bomber des Zweiten Weltkriegs wurde wegen seiner schweren Abwehrbewaffnung als 'Fliegende Festung' bezeichnet?",
    "a": [
      "Boeing B-17 Flying Fortress",
      "Consolidated B-24 Liberator",
      "Boeing B-29 Superfortress",
      "North American B-25 Mitchell"
    ],
    "explanation": "Bis zu 13 schwere Kaliber-.50-Maschinengewehre machten dichte B-17-Bomberformationen zu einer tödlichen Abwehrfestung gegen feindliche Jäger.",
    "exp": "Bis zu 13 schwere Kaliber-.50-Maschinengewehre machten dichte B-17-Bomberformationen zu einer tödlichen Abwehrfestung gegen feindliche Jäger."
  },
  {
    "cat": "historisch",
    "diff": "mid",
    "q": "Warum besaß das US-Trägerjagdflugzeug Vought F4U Corsair seine charakteristischen Knickflügel (umgekehrte Knickflügel)?",
    "a": [
      "Um Bodenfreiheit für den riesigen 4-Meter-Propeller bei kurzen Fahrwerksbeinen zu schaffen",
      "Damit das Flugzeug bei Wasserungen wie ein Boot auf den Flügeln schwimmt",
      "Um den Piloten einen uneingeschränkten Blick senkrecht nach unten zu bieten",
      "Weil die Flügel im Flug automatisch nach hinten schwenkten"
    ],
    "explanation": "Der gewaltige Pratt & Whitney R-2800 Triebwerksdurchmesser erforderte enorme Propeller; Knickflügel hielten das Trägerfahrwerk kurz und stabil.",
    "exp": "Der gewaltige Pratt & Whitney R-2800 Triebwerksdurchmesser erforderte enorme Propeller; Knickflügel hielten das Trägerfahrwerk kurz und stabil."
  },
  {
    "cat": "historisch",
    "diff": "mid",
    "q": "Woraus bestand der Rumpf des britischen Mehrzweckflugzeugs de Havilland DH.98 Mosquito ('The Wooden Wonder')?",
    "a": [
      "Aus formverleimtem Balsaholz- und Birkensperrholz-Sandwich",
      "Aus genietetem Wellblech-Aluminium",
      "Aus imprägniertem Leinen auf geschweißtem Stahlrohr",
      "Aus gegossenen Magnesiumplatten"
    ],
    "explanation": "Die Mosquito sparte strategisch knappes Leichtmetall und wurde von Klavier- und Möbelbauern aus Sperrholz gefertigt – und war trotzdem schneller als die meisten Jäger.",
    "exp": "Die Mosquito sparte strategisch knappes Leichtmetall und wurde von Klavier- und Möbelbauern aus Sperrholz gefertigt – und war trotzdem schneller als die meisten Jäger."
  },
  {
    "cat": "historisch",
    "diff": "mid",
    "q": "Welche beiden Düsenjäger lieferten sich im Koreakrieg (1950–1953) über der berüchtigten 'MiG Alley' historische Luftkämpfe?",
    "a": [
      "North American F-86 Sabre gegen Mikojan-Gurewitsch MiG-15",
      "Lockheed P-80 Shooting Star gegen Jakowlew Jak-9",
      "Grumman F9F Panther gegen Messerschmitt Me 262",
      "Republic F-84 Thunderjet gegen Suchoi Su-7"
    ],
    "explanation": "Beide Flugzeuge nutzten gepfeilte Tragflächen nach deutschem Weltkriegs-Forschungsvorbild und lieferten sich die ersten Jet-gegen-Jet-Duelle der Geschichte.",
    "exp": "Beide Flugzeuge nutzten gepfeilte Tragflächen nach deutschem Weltkriegs-Forschungsvorbild und lieferten sich die ersten Jet-gegen-Jet-Duelle der Geschichte."
  },
  {
    "cat": "historisch",
    "diff": "mid",
    "q": "Welches deutsche Sturzkampfflugzeug erzeugte beim Sturzflug durch Fahrtwind-Sirenen ('Jericho-Trompeten') psychologischen Terror?",
    "a": [
      "Junkers Ju 87 Stuka",
      "Henschel Hs 129",
      "Dornier Do 17",
      "Blohm & Voss BV 141"
    ],
    "explanation": "Die am Fahrwerk montierten Sirenen heulten mit zunehmender Sturzfluggeschwindigkeit auf, um Truppen am Boden einzuschüchtern.",
    "exp": "Die am Fahrwerk montierten Sirenen heulten mit zunehmender Sturzfluggeschwindigkeit auf, um Truppen am Boden einzuschüchtern."
  },
  {
    "cat": "historisch",
    "diff": "mid",
    "q": "Warum montierte die US-Luftwaffe im Vietnamkrieg an ihren F-4 Phantom II Jagdbombern nachträglich wieder Bordkanonen?",
    "a": [
      "Weil frühe Luft-Luft-Raketen im Nahkampf unzuverlässig waren und Dogfights erzwangen",
      "Weil die Piloten Kanonensalven als optisches Signal zur Landung brauchten",
      "Um das Flugzeuggewicht künstlich für schwerere Bombenabwürfe zu erhöhen",
      "Weil Raketen durch die hohe Luftfeuchtigkeit im Dschungel korrodierten"
    ],
    "explanation": "Die Phantom war ursprünglich rein auf Lenkwaffen ausgelegt. Erst nach hohen Verlusten gegen wendige MiG-17/21 erhielt die F-4E eine feste 20-mm-Gatling.",
    "exp": "Die Phantom war ursprünglich rein auf Lenkwaffen ausgelegt. Erst nach hohen Verlusten gegen wendige MiG-17/21 erhielt die F-4E eine feste 20-mm-Gatling."
  },
  {
    "cat": "historisch",
    "diff": "mid",
    "q": "Welches Flugzeug warf am 6. August 1945 die erste Atombombe ('Little Boy') über Hiroshima ab?",
    "a": [
      "Boeing B-29 Superfortress ('Enola Gay')",
      "Boeing B-17 Flying Fortress ('Memphis Belle')",
      "Consolidated B-32 Dominator",
      "Avro Lancaster ('Dambuster')"
    ],
    "explanation": "Die Enola Gay war eine B-29 unter dem Kommando von Paul Tibbets. Die B-29 verfügte über Druckkabinen und computergesteuerte Ferngeschütztürme.",
    "exp": "Die Enola Gay war eine B-29 unter dem Kommando von Paul Tibbets. Die B-29 verfügte über Druckkabinen und computergesteuerte Ferngeschütztürme."
  },
  {
    "cat": "historisch",
    "diff": "pro",
    "q": "Was war das größte technische Problem des raketengetriebenen Abfangjägers Messerschmitt Me 163 Komet?",
    "a": [
      "Die extrem explosive und ätzende Treibstoffkombination T-Stoff und C-Stoff",
      "Der Ausfall des Funkgeräts bei Geschwindigkeiten über 300 km/h",
      "Das Fehlen jeglicher Bewaffnung bei der Landung auf Kufen",
      "Die Unfähigkeit, bei Temperaturen unter 20 Grad Celsius zu starten"
    ],
    "explanation": "T-Stoff (Wasserstoffperoxid) und C-Stoff (Hydrazinhydrat/Methanol) entzündeten sich bei Kontakt spontan und lösten bei Lecks organische Gewebe auf.",
    "exp": "T-Stoff (Wasserstoffperoxid) und C-Stoff (Hydrazinhydrat/Methanol) entzündeten sich bei Kontakt spontan und lösten bei Lecks organische Gewebe auf."
  },
  {
    "cat": "historisch",
    "diff": "pro",
    "q": "Wie funktionierte die berühmte 'Schräge Musik' in deutschen Nachtjägern (wie Bf 110 und Ju 88) im Zweiten Weltkrieg?",
    "a": [
      "Schräg nach oben gerichtete Maschinenkanonen feuerten unbemerkt von unten in die Tragflächentanks britischer Bomber",
      "Ein akustischer Radarwarner spielte verzerrte Melodien bei feindlicher Annäherung",
      "Ein Scheinwerfersystem blendete den Bordschützen des Feindes im 45-Grad-Winkel",
      "Ein rückwärtsfeuerndes Maschinengewehr feuerte beim Überholen ab"
    ],
    "explanation": "Nachtjäger flogen im toten Winkel unter britische Bomber und schossen schräg nach oben, ohne dass der feindliche Heckschütze sie sehen konnte.",
    "exp": "Nachtjäger flogen im toten Winkel unter britische Bomber und schossen schräg nach oben, ohne dass der feindliche Heckschütze sie sehen konnte."
  },
  {
    "cat": "historisch",
    "diff": "pro",
    "q": "Welche Erfindung von Anthony Fokker revolutionierte 1915 den Luftkampf im Ersten Weltkrieg auf der Fokker E.I?",
    "a": [
      "Das mechanische Unterbrechergetriebe zum Schießen durch den laufenden Propellerkreis",
      "Der erste Schleudersitz mit komprimierter Luft",
      "Der Bordfunk zur Verständigung mit der Artillerie",
      "Gepanzerte Selbstabdicht-Tanks für Flugbenzin"
    ],
    "explanation": "Das Synchronisationsgetriebe stoppte das MG mechanisch in dem Moment, in dem ein Propellerblatt die Mündung passierte.",
    "exp": "Das Synchronisationsgetriebe stoppte das MG mechanisch in dem Moment, in dem ein Propellerblatt die Mündung passierte."
  },
  {
    "cat": "historisch",
    "diff": "pro",
    "q": "Welches alliierte Flugzeug führte 1943 die 'Operation Chastise' (Angriff auf deutsche Talsperren mit Rollbomben) durch?",
    "a": [
      "Avro Lancaster (der No. 617 Squadron 'Dambusters')",
      "Handley Page Halifax",
      "Short Stirling",
      "Consolidated PB4Y Privateer"
    ],
    "explanation": "Barnes Wallis erfand die rotierende Rollbombe, die bei exakt 18 Metern Flughöhe über das Wasser sprang und direkt an der Staumauer detonierte.",
    "exp": "Barnes Wallis erfand die rotierende Rollbombe, die bei exakt 18 Metern Flughöhe über das Wasser sprang und direkt an der Staumauer detonierte."
  },
  {
    "cat": "historisch",
    "diff": "pro",
    "q": "Welcher schwere deutsche Jäger wurde im Zweiten Weltkrieg als 'Würger' oder 'Schlächter' bekannt und besaß einen luftgekühlten BMW-801-Doppelsternmotor?",
    "a": [
      "Focke-Wulf Fw 190",
      "Messerschmitt Bf 109",
      "Dornier Do 335",
      "Heinkel He 162"
    ],
    "explanation": "Die Fw 190 von Kurt Tank überraschte die Royal Air Force 1941 durch überlegene Rollrate, enorme Motorleistung und ein breites Fahrwerk.",
    "exp": "Die Fw 190 von Kurt Tank überraschte die Royal Air Force 1941 durch überlegene Rollrate, enorme Motorleistung und ein breites Fahrwerk."
  },
  {
    "cat": "historisch",
    "diff": "pro",
    "q": "Was zeichnete den deutschen Dornier Do 335 'Pfeil' als schnellstes kolbenmotorgetriebenes Flugzeug des Zweiten Weltkriegs aus?",
    "a": [
      "Tandemanordnung: Ein Zugpropeller im Bug und ein Druckpropeller im Heck auf einer Rumpfachse",
      "Vier Sternmotoren, die alle auf eine gemeinsame Welle im Cockpit wirkten",
      "Flügel aus reinem Magnesium mit integrierten Feststoffraketen",
      "Ein faltbarer Doppelflügel für den Start von U-Boot-Decks"
    ],
    "explanation": "Durch den Schub- und Zugmotor in Mittellinie erzeugte die Do 335 keinen asymmetrischen Schub bei Motorausfall und erreichte über 760 km/h.",
    "exp": "Durch den Schub- und Zugmotor in Mittellinie erzeugte die Do 335 keinen asymmetrischen Schub bei Motorausfall und erreichte über 760 km/h."
  },
  {
    "cat": "historisch",
    "diff": "pro",
    "q": "Welches Flugzeug durchbrach am 14. Oktober 1947 mit Chuck Yeager erstmals im horizontalen Flug offiziell die Schallmauer?",
    "a": [
      "Bell X-1 (raketengetriebenes Forschungsflugzeug)",
      "North American F-86 Sabre",
      "Douglas D-558-2 Skyrocket",
      "Gloster Meteor F.4"
    ],
    "explanation": "Die von einer B-29 in der Luft ausgeklinkte Bell X-1 'Glamorous Glennis' erreichte über der Mojave-Wüste Mach 1,06.",
    "exp": "Die von einer B-29 in der Luft ausgeklinkte Bell X-1 'Glamorous Glennis' erreichte über der Mojave-Wüste Mach 1,06."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "easy",
    "q": "Welcher ikonische US-Tarnkappenbomber ist als riesiger schwanzloser Nurflügler konstruiert?",
    "a": [
      "Northrop Grumman B-2 Spirit",
      "Rockwell B-1B Lancer",
      "Boeing B-52 Stratofortress",
      "General Dynamics F-111"
    ],
    "explanation": "Die B-2 Spirit besitzt kein Seitenleitwerk; Gierbewegungen werden über geteilte Ruderklappen (Drag Rudders) an den Flügelspitzen gesteuert.",
    "exp": "Die B-2 Spirit besitzt kein Seitenleitwerk; Gierbewegungen werden über geteilte Ruderklappen (Drag Rudders) an den Flügelspitzen gesteuert."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "easy",
    "q": "Seit welchem Jahrzehnt fliegt der achtstrahlige Langstreckenbomber Boeing B-52 Stratofortress ununterbrochen im Dienst der US Air Force?",
    "a": [
      "Seit den 1950er-Jahren (Erstflug 1952)",
      "Seit den 1970er-Jahren",
      "Seit den 1930er-Jahren",
      "Erst seit den 1990er-Jahren"
    ],
    "explanation": "Die B-52 flog erstmals 1952 und soll mit neuen Rolls-Royce-Triebwerken bis weit in die 2050er-Jahre – fast 100 Jahre lang – im Dienst bleiben.",
    "exp": "Die B-52 flog erstmals 1952 und soll mit neuen Rolls-Royce-Triebwerken bis weit in die 2050er-Jahre – fast 100 Jahre lang – im Dienst bleiben."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "easy",
    "q": "Welcher sowjetische Langstreckenbomber ist für seine vier Turboprop-Triebwerke mit gegenläufigen Riesenpropellern weltbekannt?",
    "a": [
      "Tupolew Tu-95 Bear",
      "Tupolew Tu-160 Blackjack",
      "Tupolew Tu-22M Backfire",
      "Iljuschin Il-76 Candid"
    ],
    "explanation": "Die Propellerspitzen der Kusnezow-NK-12-Triebwerke drehen im Überschallbereich, was die Tu-95 zu einem der lautesten Flugzeuge der Welt macht.",
    "exp": "Die Propellerspitzen der Kusnezow-NK-12-Triebwerke drehen im Überschallbereich, was die Tu-95 zu einem der lautesten Flugzeuge der Welt macht."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "easy",
    "q": "Welches Flugzeug dient der US Air Force als schwer bewaffnetes Erdkampfflugzeug mit Haubitzen und Bordkanonen an der linken Rumpfseite?",
    "a": [
      "Lockheed AC-130 Ghostrider / Spooky (Gunship)",
      "Boeing KC-135 Stratotanker",
      "Fairchild C-123 Provider",
      "McDonnell Douglas KC-10 Extender"
    ],
    "explanation": "Die AC-130 kreist in einer Pylon-Kurve über dem Ziel und feuert mit einer 105-mm-Haubitze, 30-mm-Kanonen und Präzisionsraketen aus der linken Flanke.",
    "exp": "Die AC-130 kreist in einer Pylon-Kurve über dem Ziel und feuert mit einer 105-mm-Haubitze, 30-mm-Kanonen und Präzisionsraketen aus der linken Flanke."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "easy",
    "q": "Welches Kipprotor-Wandelflugzeug verbindet die Senkrechtstarteigenschaften eines Hubschraubers mit der Geschwindigkeit eines Turboprops?",
    "a": [
      "Bell-Boeing V-22 Osprey",
      "Sikorsky CH-53K King Stallion",
      "Boeing CH-47 Chinook",
      "Mil Mi-26 Halo"
    ],
    "explanation": "Die V-22 schwenkt ihre Triebwerksgondeln an den Flügelenden um 90 Grad nach oben für den Schwebeflug und nach vorne für den Reiseflug.",
    "exp": "Die V-22 schwenkt ihre Triebwerksgondeln an den Flügelenden um 90 Grad nach oben für den Schwebeflug und nach vorne für den Reiseflug."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "mid",
    "q": "Warum tropfte die SR-71 Blackbird vor dem Start am Boden regelmäßig Kerosin aus den Tragflächentanks?",
    "a": [
      "Weil sich die Titan-Rumpfbeplankung erst durch die Reibungshitze bei Mach 3 luftdicht ausdehnte",
      "Weil Kerosin absichtlich zur Kühlung der heißen Bremsen versprüht wurde",
      "Weil das Betanken am Boden nur mit Überdruckventilen möglich war",
      "Um das Flugzeuggewicht vor dem Startlauf auf Asphaltbahnen zu senken"
    ],
    "explanation": "Gummidichtungen hielten 300 Grad Hitze bei Mach 3 nicht stand. Die Fugen waren locker eingepasst und schlossen sich erst bei Wärmeausdehnung.",
    "exp": "Gummidichtungen hielten 300 Grad Hitze bei Mach 3 nicht stand. Die Fugen waren locker eingepasst und schlossen sich erst bei Wärmeausdehnung."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "mid",
    "q": "Warum begleiten bei Landungen des Höhenaufklärers Lockheed U-2 'Dragon Lady' schnelle Sportwagen das Flugzeug auf der Piste?",
    "a": [
      "Ein erfahrener U-2-Pilot im Auto gibt dem Piloten per Funk die genaue Resthöhe über dem Asphalt durch",
      "Um das Flugzeug mit einem Fanghaken am Kofferraum abzubremsen",
      "Um die abgeworfenen Startstützräder (Pogos) blitzschnell wieder anzustecken",
      "Um die Bremsfallschirme vor dem Verwehen im Wind aufzufangen"
    ],
    "explanation": "Die extreme Gleitflügel-Aerodynamik im Bodeneffekt und das Tandemfahrwerk machen das Aufsetzen blind; der Chase-Car-Fahrer fungiert als Bodenauge.",
    "exp": "Die extreme Gleitflügel-Aerodynamik im Bodeneffekt und das Tandemfahrwerk machen das Aufsetzen blind; der Chase-Car-Fahrer fungiert als Bodenauge."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "mid",
    "q": "Welcher strategische Schwenkflügelbomber der US Air Force ist auf extremen Tiefflug unterhalb des feindlichen Radars optimiert?",
    "a": [
      "Rockwell B-1B Lancer",
      "General Dynamics FB-111",
      "Boeing B-52H Stratofortress",
      "Northrop B-2 Spirit"
    ],
    "explanation": "Die B-1B fliegt vollautomatisch gesteuert vom Terrain-Following-Radar mit fast Schallgeschwindigkeit knapp über Baumwipfeln und Hügeln.",
    "exp": "Die B-1B fliegt vollautomatisch gesteuert vom Terrain-Following-Radar mit fast Schallgeschwindigkeit knapp über Baumwipfeln und Hügeln."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "mid",
    "q": "Welches ist das größte und schwerste Überschall-Kampfflugzeug, das jemals in Serie gebaut wurde?",
    "a": [
      "Tupolew Tu-160 'Weißer Schwan' (NATO-Codename: Blackjack)",
      "Suchoi T-4 Sotka",
      "Rockwell B-1B Lancer",
      "Mikojan-Gurewitsch MiG-31"
    ],
    "explanation": "Die Tu-160 wiegt voll beladen bis zu 275 Tonnen, besitzt Schwenkflügel und erreicht dank vier riesiger Kusnezow-Triebwerke Mach 2.",
    "exp": "Die Tu-160 wiegt voll beladen bis zu 275 Tonnen, besitzt Schwenkflügel und erreicht dank vier riesiger Kusnezow-Triebwerke Mach 2."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "mid",
    "q": "Welcher schwere US-Militärtransporter kann mit seinem hochklappbaren Bugvisier und Heckrampe schwere Kampfpanzer vom Typ M1 Abrams transportieren?",
    "a": [
      "Lockheed C-5 Galaxy",
      "Boeing C-17 Globemaster III",
      "Lockheed C-130 Hercules",
      "Airbus A400M Atlas"
    ],
    "explanation": "Die C-5 Galaxy kann bis zu zwei M1-Abrams-Panzer oder sechs Hubschrauber schlucken und kniet am Boden hydraulisch für leichtes Beladen ab.",
    "exp": "Die C-5 Galaxy kann bis zu zwei M1-Abrams-Panzer oder sechs Hubschrauber schlucken und kniet am Boden hydraulisch für leichtes Beladen ab."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "mid",
    "q": "Welches unbemannte Flugsystem (Drohne) wurde zum weltweiten Symbol für gezielte Präzisionsschläge mit Hellfire-Raketen?",
    "a": [
      "General Atomics MQ-9 Reaper / MQ-1 Predator",
      "Northrop Grumman RQ-4 Global Hawk",
      "Baykar Bayraktar TB2",
      "IAI Heron TP"
    ],
    "explanation": "Die propellergetriebene Reaper kann über 24 Stunden über dem Zielgebiet patrouillieren und laser- oder satellitengelenkte Präzisionswaffen einsetzen.",
    "exp": "Die propellergetriebene Reaper kann über 24 Stunden über dem Zielgebiet patrouillieren und laser- oder satellitengelenkte Präzisionswaffen einsetzen."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "mid",
    "q": "Welcher Kampfhubschrauber der US Army wird primär zur Panzerbekämpfung eingesetzt und trägt das Longbow-Radar über dem Hauptrotor?",
    "a": [
      "Boeing AH-64 Apache",
      "Bell AH-1Z Viper",
      "Eurocopter Tiger",
      "Kamow Ka-52 Alligator"
    ],
    "explanation": "Die kuppelförmige Radarantenne über dem Rotor erlaubt dem AH-64D/E Apache, hinter Baumreihen in Deckung zu bleiben und Ziele zu erfassen.",
    "exp": "Die kuppelförmige Radarantenne über dem Rotor erlaubt dem AH-64D/E Apache, hinter Baumreihen in Deckung zu bleiben und Ziele zu erfassen."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "pro",
    "q": "Welches Treibstoff-Spezialgemisch benötigte die SR-71 Blackbird, das bei Raumtemperatur so schwer entflammbar war, dass man ein brennendes Streichholz darin löschen konnte?",
    "a": [
      "JP-7 (mit extrem hohem Flammpunkt und Triethylboran als chemischem Zünder)",
      "Hydrazin mit flüssigem Sauerstoff",
      "Reines synthetisches Ethanol mit Bleizusatz",
      "Kompakter Festtreibstoff in Pelletform"
    ],
    "explanation": "JP-7 entzündet sich bei Hitze nicht selbst. Zum Starten der Triebwerke und der Nachbrenner wurde grünes Triethylboran (TEB) eingespritzt.",
    "exp": "JP-7 entzündet sich bei Hitze nicht selbst. Zum Starten der Triebwerke und der Nachbrenner wurde grünes Triethylboran (TEB) eingespritzt."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "pro",
    "q": "Wie kühlt die B-2 Spirit ihre heißen Triebwerksabgase, um vor wärmesuchenden Infrarot-Raketen verborgen zu bleiben?",
    "a": [
      "Die Abgase werden auf der Flügeloberseite mit kalter Bypass-Luft gemischt und über Hitzeschutzkacheln geleitet",
      "Durch kontinuierliches Einspritzen von flüssigem Stickstoff in den Abgasstrahl",
      "Über einen langen Schlauch, der 200 Meter hinter dem Flugzeug nachgezogen wird",
      "Indem die Triebwerke alle 10 Minuten für 60 Sekunden komplett abgeschaltet werden"
    ],
    "explanation": "Die Düsen liegen tief auf der Flügeloberseite versenkt. Kalte Außenluft kühlt den Strahl, und der Flügel schirmt die Hitze nach unten ab.",
    "exp": "Die Düsen liegen tief auf der Flügeloberseite versenkt. Kalte Außenluft kühlt den Strahl, und der Flügel schirmt die Hitze nach unten ab."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "pro",
    "q": "Wie hält der schwerste Hubschrauber der Welt, die russische Mil Mi-26 Halo, ihren riesigen Achtblatt-Hauptrotor im Gleichgewicht?",
    "a": [
      "Zwei Turbinentriebwerke mit je über 11.400 PS treiben den 32-Meter-Rotor an und heben bis zu 20 Tonnen Nutzlast",
      "Vier gegenläufige Koaxialrotoren ohne Heckrotor",
      "Ein zusätzlicher Raketenantrieb an jeder Rotorblattspitze",
      "Ein riesiges Pendelgewicht im Passagierkabinenboden"
    ],
    "explanation": "Die Mil Mi-26 kann einen voll beladenen Linienbus oder einen schweren Transporthubschrauber wie die CH-47 als Außenlast transportieren.",
    "exp": "Die Mil Mi-26 kann einen voll beladenen Linienbus oder einen schweren Transporthubschrauber wie die CH-47 als Außenlast transportieren."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "pro",
    "q": "Welches Flugzeugträger-Aufklärungsflugzeug der US Navy trägt das markante rotierende Radom auf dem Rücken?",
    "a": [
      "Northrop Grumman E-2 Hawkeye",
      "Boeing E-3 Sentry (AWACS)",
      "Grumman C-2 Greyhound",
      "Lockheed S-3 Viking"
    ],
    "explanation": "Die zweimotorige Turboprop E-2 Hawkeye ist das fliegende Radar- und Führungsauge auf allen US-Supercarriern.",
    "exp": "Die zweimotorige Turboprop E-2 Hawkeye ist das fliegende Radar- und Führungsauge auf allen US-Supercarriern."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "pro",
    "q": "Welche bemerkenswerte Eigenschaft besaß das Hauptfahrwerk der B-52 Stratofortress bei starkem Seitenwind?",
    "a": [
      "Die Fahrwerksdrehgestelle lassen sich bis zu 20 Grad in Landerichtung schwenken (Crosswind Landing Gear)",
      "Es fährt bei Wind automatisch Kufen an den Flügelenden aus",
      "Es federt nur einseitig ein, um Schräglagen auszugleichen",
      "Es besitzt eigene Elektromotoren, die das Flugzeug vor dem Aufsetzen quer beschleunigen"
    ],
    "explanation": "Die B-52 kann im 'Krabbenwinkel' schräg zur Landebahn anfliegen und aufsetzen, weil die Räder genau in Pistenrichtung ausgerichtet werden.",
    "exp": "Die B-52 kann im 'Krabbenwinkel' schräg zur Landebahn anfliegen und aufsetzen, weil die Räder genau in Pistenrichtung ausgerichtet werden."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "pro",
    "q": "Was passiert mit den Startstützrädern (Pogos) an den äußeren Tragflächenenden der Lockheed U-2 beim Startlauf?",
    "a": [
      "Sie fallen nach wenigen Metern Startlauf automatisch aus den Tragflächen auf die Bahn",
      "Sie werden per Seilwinde ins Cockpit gezogen",
      "Sie explodieren mit kleinen Sprengsätzen nach dem Abheben",
      "Sie klappen in die Kamerabucht im Flugzeugbauch"
    ],
    "explanation": "Die Pogos stabilisieren die vollgetankten, herabhängenden Flügel beim Rollen und fallen beim Abheben einfach aus ihren Steckhülsen.",
    "exp": "Die Pogos stabilisieren die vollgetankten, herabhängenden Flügel beim Rollen und fallen beim Abheben einfach aus ihren Steckhülsen."
  },
  {
    "cat": "bomber_aufklaerer",
    "diff": "pro",
    "q": "Welcher neue US-Tarnkappenbomber wurde im Dezember 2022 als Nachfolger der B-2 feierlich der Öffentlichkeit vorgestellt?",
    "a": [
      "Northrop Grumman B-21 Raider",
      "Boeing B-3 Penetrator",
      "Lockheed B-12 Valkyrie II",
      "General Dynamics B-88 Phantom"
    ],
    "explanation": "Die B-21 Raider ist ein digital konstruierter Stealth-Nurflügler der 6. Generation mit offener Systemarchitektur und Drohnen-Führungsfunktion.",
    "exp": "Die B-21 Raider ist ein digital konstruierter Stealth-Nurflügler der 6. Generation mit offener Systemarchitektur und Drohnen-Führungsfunktion."
  },
  {
    "cat": "technik_waffen",
    "diff": "easy",
    "q": "Was bedeutet der Begriff 'Supercruise' bei modernen Kampfflugzeugen wie dem Eurofighter oder der F-22?",
    "a": [
      "Dauerhafter Überschallflug ohne Zuschalten des spritfressenden Nachbrenners",
      "Automatisches Schweben über einem Punkt auf See",
      "Fliegen mit zweifacher Schallgeschwindigkeit im Sturzflug",
      "Das Koppeln des Autopiloten an zivile GPS-Satelliten"
    ],
    "explanation": "Supercruise spart enorme Mengen Kerosin und erlaubt es Kampfjets, mit Überschall ins Einsatzgebiet einzufliegen und einsatzbereit zu bleiben.",
    "exp": "Supercruise spart enorme Mengen Kerosin und erlaubt es Kampfjets, mit Überschall ins Einsatzgebiet einzufliegen und einsatzbereit zu bleiben."
  },
  {
    "cat": "technik_waffen",
    "diff": "easy",
    "q": "Welche radargelenkte US-Luft-Luft-Rakete gilt als weltweiter Standard für BVR-Kämpfe (Beyond Visual Range)?",
    "a": [
      "AIM-120 AMRAAM",
      "AIM-9 Sidewinder",
      "AGM-88 HARM",
      "AGM-65 Maverick"
    ],
    "explanation": "Die AMRAAM (Advanced Medium-Range Air-to-Air Missile) verfügt über ein eigenes aktives Radar und arbeitet nach dem Fire-and-Forget-Prinzip.",
    "exp": "Die AMRAAM (Advanced Medium-Range Air-to-Air Missile) verfügt über ein eigenes aktives Radar und arbeitet nach dem Fire-and-Forget-Prinzip."
  },
  {
    "cat": "technik_waffen",
    "diff": "easy",
    "q": "Was versteht man unter 'Chaff' und 'Flares' bei den Selbstschutzsystemen von Militärflugzeugen?",
    "a": [
      "Chaff täuscht feindliche Radargeräte durch Aluminiumstreifen, Flares täuschen Hitzesuchköpfe durch heiße Magnesiumfackeln",
      "Chaff kühlt die Triebwerke ab, Flares erhellen die Landebahn bei Nacht",
      "Chaff dient als Not-Treibstoff, Flares sind Blendgranaten gegen Bodentruppen",
      "Chaff zerstört feindliche Funkantennen, Flares blenden feindliche Piloten"
    ],
    "explanation": "Düppel (Chaff) erzeugt eine künstliche Radarechowolke; Flares brennen mit über 1.000 Grad Celsius und ziehen Infrarotsuchköpfe auf sich.",
    "exp": "Düppel (Chaff) erzeugt eine künstliche Radarechowolke; Flares brennen mit über 1.000 Grad Celsius und ziehen Infrarotsuchköpfe auf sich."
  },
  {
    "cat": "technik_waffen",
    "diff": "easy",
    "q": "Was zeichnet einen modernen 'Zero-Zero'-Schleudersitz (wie von Martin-Baker) aus?",
    "a": [
      "Er rettet den Piloten selbst bei Fluggeschwindigkeit Null und Höhe Null (am Boden im Stand)",
      "Er benötigt null Sprengstoff und arbeitet rein mit Gummiseilen",
      "Er funktioniert nur bei exakt null Grad Außentemperatur",
      "Er kann ohne jegliche Fallschirme butterweich aufprallen"
    ],
    "explanation": "Dank Raketenpack schnellt der Sitz aus dem stehenden Flugzeug hoch genug in die Luft, damit sich der Rettungsschirm voll entfalten kann.",
    "exp": "Dank Raketenpack schnellt der Sitz aus dem stehenden Flugzeug hoch genug in die Luft, damit sich der Rettungsschirm voll entfalten kann."
  },
  {
    "cat": "technik_waffen",
    "diff": "mid",
    "q": "Was ist der entscheidende Vorteil eines AESA-Radars (Active Electronically Scanned Array) gegenüber älteren mechanischen Radaren?",
    "a": [
      "Tausende winzige Sende-/Empfangsmodule schwenken den Radarstrahl blitzschnell rein elektronisch ohne bewegliche Teile",
      "Es verbraucht im Betrieb überhaupt keinen elektrischen Bordstrom",
      "Es kann feindliche Flugzeuge physisch durch Mikrowellenhitze zerstören",
      "Es benötigt keine Antenne an der Flugzeugnase"
    ],
    "explanation": "AESA-Radare können gleichzeitig den Luftraum überwachen, Bodenziele kartieren und mehrere Raketen ins Ziel leiten – extrem schwer zu orten und zu stören.",
    "exp": "AESA-Radare können gleichzeitig den Luftraum überwachen, Bodenziele kartieren und mehrere Raketen ins Ziel leiten – extrem schwer zu orten und zu stören."
  },
  {
    "cat": "technik_waffen",
    "diff": "mid",
    "q": "Welchen Radarquerschnitt (RCS - Radar Cross Section) weist ein Stealth-Jet wie die F-22 von vorne ungefähr auf?",
    "a": [
      "Vergleichbar mit einer kleinen Murmel oder einer Hummel (rund 0,0001 m²)",
      "Vergleichbar mit einem ganzen Einfamilienhaus (rund 150 m²)",
      "Exakt null Quadratmillimeter – physikalisch absolut unsichtbar",
      "Vergleichbar mit einem Reisebus"
    ],
    "explanation": "Die F-22 ist am Radar nicht unsichtbar, reflektiert aber nur so viel Energie wie ein kleines Insekt, wodurch sie erst aus nächster Nähe geortet wird.",
    "exp": "Die F-22 ist am Radar nicht unsichtbar, reflektiert aber nur so viel Energie wie ein kleines Insekt, wodurch sie erst aus nächster Nähe geortet wird."
  },
  {
    "cat": "technik_waffen",
    "diff": "mid",
    "q": "Welcher europäische Flugkörper gilt dank Staustrahltriebwerk (Ramjet) als eine der gefährlichsten Luft-Luft-Raketen der Welt?",
    "a": [
      "MBDA Meteor",
      "AIM-9X Sidewinder",
      "IRIS-T",
      "Matra R550 Magic"
    ],
    "explanation": "Der Staustrahlantrieb der Meteor lässt sich im Flug drosseln, wodurch der Flugkörper im Zielanflug (No Escape Zone) nochmals voll beschleunigen kann.",
    "exp": "Der Staustrahlantrieb der Meteor lässt sich im Flug drosseln, wodurch der Flugkörper im Zielanflug (No Escape Zone) nochmals voll beschleunigen kann."
  },
  {
    "cat": "technik_waffen",
    "diff": "mid",
    "q": "Wie funktioniert das IRST-System (Infrared Search and Track), das u. a. am Eurofighter und russischen Jets montiert ist?",
    "a": [
      "Es spürt feindliche Flugzeuge passiv an der Reibungshitze der Rumpfnase und Abgaswärme auf, ohne eigene Funkwellen abzustrahlen",
      "Es sendet Infrarot-Laserimpulse aus, die die Tragflächen des Gegners zerschneiden",
      "Es schützt die Cockpitscheibe vor feindlichen Laserblendwaffen",
      "Es misst die Wassertemperatur von Flüssen zur Positionsbestimmung"
    ],
    "explanation": "IRST ist völlig passiv: Der Sucher 'sieht' Wärmequellen über Dutzende Kilometer, ohne dass der feindliche Radarwarner Alarm schlägt.",
    "exp": "IRST ist völlig passiv: Der Sucher 'sieht' Wärmequellen über Dutzende Kilometer, ohne dass der feindliche Radarwarner Alarm schlägt."
  },
  {
    "cat": "technik_waffen",
    "diff": "mid",
    "q": "Welche Revolution bietet der Helm des F-35-Piloten (Gen III Helmet Mounted Display System)?",
    "a": [
      "Sensordaten von sechs Außenkameras werden direkt ins Visier projiziert – der Pilot blickt virtuell 'durch den Flugzeugboden'",
      "Er kühlt den Kopf mit flüssigem Helium gegen G-Kräfte",
      "Er steuert das Flugzeug komplett durch Gedankenübertragung",
      "Er ersetzt die Sauerstoffmaske durch künstliche Kiemenatmung"
    ],
    "explanation": "Das Distributed Aperture System (DAS) projiziert eine nahtlose 360-Grad-Rundumansicht ins Helmdisplay; blickt der Pilot nach unten, sieht er die Landschaft unter dem Jet.",
    "exp": "Das Distributed Aperture System (DAS) projiziert eine nahtlose 360-Grad-Rundumansicht ins Helmdisplay; blickt der Pilot nach unten, sieht er die Landschaft unter dem Jet."
  },
  {
    "cat": "technik_waffen",
    "diff": "mid",
    "q": "Welche Rakete feuert die Bundeswehr mit dem Waffensystem Patriot und der IRIS-T SLM zur Luft- und Raketenabwehr ab?",
    "a": [
      "Hochpräzise Flugabwehrlenkflugkörper mit Radar- bzw. hochauflösendem Infrarot-Suchkopf",
      "Umlaufende Feststoff-Schrotladungen zur Wolkenbildung",
      "Akustische Schockwellenbomben gegen Turbinen",
      "Unbemannte Jagddrohnen mit Rammspornen"
    ],
    "explanation": "IRIS-T nutzt einen extrem empfindlichen Infrarotsuchkopf mit Schubvektorsteuerung und trifft selbst kleinste Marschflugkörper und Drohnen.",
    "exp": "IRIS-T nutzt einen extrem empfindlichen Infrarotsuchkopf mit Schubvektorsteuerung und trifft selbst kleinste Marschflugkörper und Drohnen."
  },
  {
    "cat": "technik_waffen",
    "diff": "pro",
    "q": "Was bewirken 3D-Schubvektordüsen, wie sie an der Suchoi Su-35 oder MiG-29OVT zu finden sind?",
    "a": [
      "Sie lenken den Triebwerksstrahl in alle Raumrichtungen aus und ermöglichen Manöver jenseits der aerodynamischen Strömungsgrenzen (Post-Stall)",
      "Sie drehen das gesamte Triebwerk während des Flugs um die Längsachse",
      "Sie erzeugen künstliche Tornados unter den Tragflächen für Notstarts",
      "Sie kühlen den Abgasstrahl für Tauchfahrten unter Wasser ab"
    ],
    "explanation": "Schubvektorsteuerung erlaubt kontrollierte Fluglagen selbst dann, wenn an den normalen Rudern mangels Vorwärtsgeschwindigkeit keine Strömung mehr anliegt.",
    "exp": "Schubvektorsteuerung erlaubt kontrollierte Fluglagen selbst dann, wenn an den normalen Rudern mangels Vorwärtsgeschwindigkeit keine Strömung mehr anliegt."
  },
  {
    "cat": "technik_waffen",
    "diff": "pro",
    "q": "Warum besitzen moderne Marschflugkörper wie Taurus KEPD 350 oder Storm Shadow einen zweistufigen Tandem-Gefechtskopf (MEPHISTO)?",
    "a": [
      "Eine Vorladung sprengt eine Öffnung in Erdreich und Beton, danach dringt der schwere Penetrator tief in den Bunker ein",
      "Die erste Stufe brennt chemischen Nebel ab, die zweite Stufe detoniert",
      "Um das Ziel doppelt mit zwei verschiedenen Sprengstoffen zu markieren",
      "Weil zwei kleine Sprengköpfe billiger in der Herstellung sind als ein großer"
    ],
    "explanation": "Der MEPHISTO-Sprengkopf durchschlägt mit seiner Vorhohlladung meterdecken Stahlbeton; ein intelligenter Sensor zählt Stockwerke vor der Zündung.",
    "exp": "Der MEPHISTO-Sprengkopf durchschlägt mit seiner Vorhohlladung meterdecken Stahlbeton; ein intelligenter Sensor zählt Stockwerke vor der Zündung."
  },
  {
    "cat": "technik_waffen",
    "diff": "pro",
    "q": "Welche Funktion hat die sogenannte 'DSI' (Diverterless Supersonic Inlet), wie sie an der F-35 und der Chengdu J-20 verwendet wird?",
    "a": [
      "Ein aerodynamischer Höcker vor dem Lufteinlauf leitet turbulente Grenzschichtluft ab und verdeckt die Verdichterschaufeln vor Radarstrahlen",
      "Ein beweglicher Schieber, der bei Überschall mechanisch nach vorne fährt",
      "Eine Einspritzdüse für Lachgas direkt vor dem Verdichterrad",
      "Ein Sieb zum Auffangen von Vogelschlag im Tiefstflug"
    ],
    "explanation": "DSI spart hunderte Kilo an schweren Grenzschichtabscheidern und Klappen und reduziert den Radarquerschnitt an der Triebwerkseinlassöffnung dramatisch.",
    "exp": "DSI spart hunderte Kilo an schweren Grenzschichtabscheidern und Klappen und reduziert den Radarquerschnitt an der Triebwerkseinlassöffnung dramatisch."
  },
  {
    "cat": "technik_waffen",
    "diff": "pro",
    "q": "Wie überwindet ein Anti-Strahlungs-Flugkörper wie die AGM-88 HARM feindliche Flugabwehrstellungen?",
    "a": [
      "Er peilt die elektromagnetischen Sendesignale feindlicher Radarstellungen an und steuert direkt in die Radarantenne",
      "Er strahlt radioaktive Isotope zur Zersetzung feindlicher Kabel ab",
      "Er sendet starke Störgeräusche auf allen UKW-Frequenzen aus",
      "Er entlädt Hochspannungsblitze in die Hochspannungsleitungen des Gegners"
    ],
    "explanation": "HARM (High-Speed Anti-Radiation Missile) schaltet feindliche Luftabwehr-Radare aus; schaltet der Gegner das Radar ab, merkt sich die Rakete die GPS-Koordinate.",
    "exp": "HARM (High-Speed Anti-Radiation Missile) schaltet feindliche Luftabwehr-Radare aus; schaltet der Gegner das Radar ab, merkt sich die Rakete die GPS-Koordinate."
  },
  {
    "cat": "technik_waffen",
    "diff": "pro",
    "q": "Welcher physikalische Effekt schützt Flugzeuge mit Fly-by-Wire vor struktureller Überlastung durch zu starke Steuerknüppel-Eingaben?",
    "a": [
      "G-Limiting (Flugsteuerungsrechner begrenzen die Lastvielfachen automatisch, z. B. auf maximal +9G)",
      "Ein automatischer Stoßdämpfer bricht bei 5G einfach das Steuerhorn ab",
      "Ein pneumatischer G-Anzug bläst den Piloten so stark auf, dass er den Knüppel loslässt",
      "Das Triebwerk geht bei mehr als 7G automatisch für 5 Sekunden aus"
    ],
    "explanation": "Das Flight Control System (FCS) begrenzt Ruderausschläge in Millisekunden so, dass die Flugzeugzelle selbst bei vollem Durchreißen des Knüppels intakt bleibt.",
    "exp": "Das Flight Control System (FCS) begrenzt Ruderausschläge in Millisekunden so, dass die Flugzeugzelle selbst bei vollem Durchreißen des Knüppels intakt bleibt."
  },
  {
    "cat": "technik_waffen",
    "diff": "pro",
    "q": "Was versteht man unter 'Radar Absorbent Material' (RAM) auf der Außenhaut von Tarnkappenflugzeugen?",
    "a": [
      "Spezielle ferrit- oder kohlenstoffhaltige Beschichtungen, die Radarwellen aufnehmen und in winzige Wärmemengen umwandeln",
      "Eine Gummischicht, die Radarwellen wie einen Tennisball zurückfedert",
      "Eine Schicht aus Quecksilber, die das Radarlicht spiegelt",
      "Eine bioaktive Algenpaste, die elektromagnetische Strahlung aufzehrt"
    ],
    "explanation": "RAM-Lackierungen absorbieren einfallende Radarwellen durch magnetische und dielektrische Verluste, statt sie zum feindlichen Sender zurückzustreuen.",
    "exp": "RAM-Lackierungen absorbieren einfallende Radarwellen durch magnetische und dielektrische Verluste, statt sie zum feindlichen Sender zurückzustreuen."
  },
  {
    "cat": "technik_waffen",
    "diff": "pro",
    "q": "Was ist der Hauptvorteil von internen Waffenschächten bei Stealth-Kampfflugzeugen gegenüber externen Pylonen unter den Flügeln?",
    "a": [
      "Raketen und Bomben zerstören an Außenlaststationen die Radartarnung und erzeugen enormen aerodynamischen Widerstand",
      "Waffen dürfen laut Genfer Konventionen nicht mehr von außen sichtbar sein",
      "Intern gelagerte Raketen können im Flug vom Piloten nachjustiert werden",
      "Außen angehängte Waffen frieren in 10.000 Metern Höhe irreversibel fest"
    ],
    "explanation": "Jede außen angehängte Rakete wirkt auf dem Radar wie ein riesiger Scheinwerfer. Interne Schächte halten den Jet absolut 'sauber' und radararm.",
    "exp": "Jede außen angehängte Rakete wirkt auf dem Radar wie ein riesiger Scheinwerfer. Interne Schächte halten den Jet absolut 'sauber' und radararm."
  },
  {
    "cat": "technik_waffen",
    "diff": "pro",
    "q": "Wie funktioniert das sogenannte 'Link 16'-Datenfunksystem der NATO-Streitkräfte?",
    "a": [
      "Taktische Daten über Feindziele, Treibstoff und Waffen werden im Sekundentakt verschlüsselt und abhörsicher zwischen Flugzeugen, Schiffen und Boden geteilt",
      "Ein analoger Sprechfunkkanal mit automatischer Rauschunterdrückung",
      "Ein Satellitennetzwerk ausschließlich für Drohnen-Videostreams",
      "Ein Morse-Code-Signal über Langwelle für getauchte U-Boote"
    ],
    "explanation": "Link 16 verbindet alle Einheiten zu einem gemeinsamen taktischen Lagebild. Ein Jet kann eine Rakete abfeuern, deren Ziel nur ein entfernter AWACS sieht.",
    "exp": "Link 16 verbindet alle Einheiten zu einem gemeinsamen taktischen Lagebild. Ein Jet kann eine Rakete abfeuern, deren Ziel nur ein entfernter AWACS sieht."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === 'function') {
    window.ArcadeQuizEngine.registerBank('mil_air', DATA);
  }
})();
