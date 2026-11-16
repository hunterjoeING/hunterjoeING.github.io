// Unified quiz bank for "md11" (100 questions: McDonnell Douglas MD-11)
(function () {
  const DATA = [
    // =========================================================================
    // 1. AERODYNAMIK, WINGLETS & COCKPIT (25 Fragen: 8 easy · 9 mid · 8 pro)
    // =========================================================================
    {
      cat: 'technik',
      diff: 'easy',
      q: 'Welche zwei markanten Flügelspitzen-Elemente unterscheidet die McDonnell Douglas MD-11 auf den ersten Blick von ihrem Vorgänger DC-10?',
      a: [
        'Große nach oben gerichtete Winglets mit kleinem Gegen-Winglet nach unten',
        'Abgeklappte Flügelenden für enge Parkpositionen wie bei der Boeing 777X',
        'Riesige runde Zusatztanks an den Flügelenden',
        'Doppelflügel übereinander an jedem Tragflächenende'
      ],
      exp: 'Die rund 2,7 m hohen Split-Winglets senken den induzierten Randwirbelwiderstand spürbar und verleihen der MD-11 ihre ikonische Silhouette.'
    },
    {
      cat: 'technik',
      diff: 'easy',
      q: 'Wie viele Besatzungsmitglieder sitzen im regulären Cockpit einer McDonnell Douglas MD-11 (im Unterschied zur dreiköpfigen DC-10)?',
      a: [
        'Zwei Piloten (Kapitän + Erster Offizier ohne Flugingenieur)',
        'Drei Besatzungsmitglieder inklusive Flugingenieur',
        'Vier Besatzungsmitglieder inklusive Navigator',
        'Ein einzelner Pilot dank Fernsteuerung'
      ],
      exp: 'Eine Hauptneuerung gegenüber der DC-10 war der komplette Wegfall der Flugingenieur-Station dank sechs moderner Bildschirme und umfassender Systemautomatisierung.'
    },
    {
      cat: 'technik',
      diff: 'easy',
      q: 'Woraus besteht das Haupt-Instrumentenbrett der MD-11 (im Gegensatz zu den analogen Uhrenläden der frühen DC-10)?',
      a: [
        'Aus sechs großen Kathodenstrahl- bzw. später LCD-Multifunktionsbildschirmen („Glascockpit“)',
        'Aus 48 rein mechanischen Rundinstrumenten ohne Bildschirme',
        'Aus nur einem einzigen Monochrom-Display in der Deckenkonsole',
        'Aus reinem Head-up-Display ohne Instrumententafel'
      ],
      exp: 'Das Honeywell-VIA-2000-/DU-880-Glascockpit vereinte Primary Flight Display, Navigation Display, Engine Alert Display und System Displays übersichtlich auf sechs 8×8-Zoll-Monitoren.'
    },
    {
      cat: 'technik',
      diff: 'easy',
      q: 'Wie wird die Flugsteuerung der MD-11 beim Bewegen von Steuerhorn und Pedalen in der Grundarchitektur ausgeführt?',
      a: [
        'Konventionell hydro-mechanisch über Seilzüge und Hydraulik (unterstützt von elektronischer Stabilitäts- und Trimmhilfe wie LSAS)',
        'Vollständiges digitales Fly-by-Wire mit Sidesticks wie im Airbus A340',
        'Ausschließlich elektrische Seilwinden ohne Hydraulik',
        'Rein mechanisch ohne Hydraulikverstärkung'
      ],
      exp: 'Anders als der etwa zeitgleiche Airbus A340 nutzte die MD-11 weiterhin klassische Steuerhörner und Seilzüge zu den Hydraulik-Aktuatoren, ergänzt durch digitale Stabilisierungscomputer.'
    },
    {
      cat: 'technik',
      diff: 'easy',
      q: 'Welches automatische System übernahm bei der MD-11 im Cockpit viele Aufgaben des früheren Flugingenieurs (Treibstoffverteilung, Druckkabine, Elektrik, Hydraulik)?',
      a: [
        'Die vier Automated Systems Controllers (ASC)',
        'Ein manueller Kartenrechner hinter dem Mittelpodest',
        'Ein autonomer Copilot aus dem Nachbarflugzeug',
        'Eine reine Sprachsteuerung aus den 1980ern'
      ],
      exp: 'Fuel System Controller, Hydraulic System Controller, Environmental System Controller und Electrical Power Controller steuerten Neben- und Notfallprozeduren weitgehend automatisch.'
    },
    {
      cat: 'technik',
      diff: 'easy',
      q: 'Wie groß ist das Höhenleitwerk der MD-11 im Vergleich zur kürzeren DC-10?',
      a: [
        'Rund 30 % kleiner (um Trimm- und Reibungswiderstand auf Langstrecken zu reduzieren)',
        'Doppelt so groß wegen des längeren Rumpfes',
        'Als T-Leitwerk ganz oben auf der Heckflosse angebracht',
        'Komplett durch zwei Canards vor dem Cockpit ersetzt'
      ],
      exp: 'Die Verkleinerung der horizontalen Heckflosse sparte Gewicht und Widerstand – erforderte aber eine ausgefeilte elektronische Längsstabilisierung.'
    },
    {
      cat: 'technik',
      diff: 'easy',
      q: 'Wie nutzt die MD-11 ein spezielles Kerosin-System im Höhenleitwerk („Tail Tank“) auf Reiseflug-Abschnitten?',
      a: [
        'Treibstoff wird nach hinten ins Höhenleitwerk gepumpt, um den Schwerpunkt nach hinten zu verlagern und Treibstoff zu sparen',
        'Es kühlt ausschließlich das Triebwerk Nr. 2 durch Berieselung',
        'Es dient als reines Löschmittel-Reservoir',
        'Es speist den separaten Reserve-Raketenantrieb'
      ],
      exp: 'Durch den nach hinten verschobenen Schwerpunkt (Aft CG) braucht das verkleinerte Höhenleitwerk weniger Gegenabtrieb zu erzeugen, was den Reiseverbrauch senkt.'
    },
    {
      cat: 'technik',
      diff: 'easy',
      q: 'Welche Form hat das Tragflächen-Querschnittsprofil der MD-11 gegenüber vielen frühen 1960er-Entwürfen?',
      a: [
        'Eine weiterentwickelte Tragfläche mit modifizierter Hinterkante („Divergent Trailing Edge“) und Winglets',
        'Ein symmetrisches Überschall-Delta-Profil wie die Concorde',
        'Ein rechteckiges Profil ohne Pfeilung wie bei einer Cessna 172',
        'Eine vorwärts gepfeilte Fläche'
      ],
      exp: 'Die bereits recht moderne DC-10-Tragfläche wurde an der Endleiste aerodynamisch nachgeschliffen („Divergent Trailing Edge“), um bei Mach 0,83–0,85 mehr Auftrieb pro Widerstandseinheit zu liefern.'
    },
    {
      cat: 'technik',
      diff: 'mid',
      q: 'Wofür steht bei der MD-11 die wichtige Flugsteuerungs-Abkürzung „LSAS“?',
      a: [
        'Longitudinal Stability Augmentation System (Längsstabilitäts-Unterstützungssystem)',
        'Low Speed Approach Spoiler',
        'Landing Gear Automatic Steering',
        'Lateral Safety Attitude Sensor'
      ],
      exp: 'Weil das kleinere Höhenleitwerk und der weit hinten liegende Schwerpunkt im Reiseflug die natürliche Nickstabilität verringern, unterstützt LSAS den Piloten sanft in der Längsachse.'
    },
    {
      cat: 'technik',
      diff: 'mid',
      q: 'Welchen Effekt hat das bereits erwähnte kleine untere Winglet unterhalb der Flügelspitze an der MD-11?',
      a: [
        'Es ergänzt das obere Winglet (Split Winglet), bricht gegenläufige Randwirbel weiter auf und verbessert den Wirkungsgrad bei hohen Anstellwinkeln',
        'Es dient als Positions-Trittstufe für das Kabinenpersonal',
        'Es ist ein reiner Eisbrecher für den Steigflug',
        'Es beherbergt die Landelichter'
      ],
      exp: 'Die Kombination aus großem oberen Winglet (2,74 m) und kleinem unteren Fin-Element brachte rund 2,5 bis 3 % Reichweitenersparnis.'
    },
    {
      cat: 'technik',
      diff: 'mid',
      q: 'Warum gilt die MD-11 im manuellen Landeanflug unter Verkehrspiloten bis heute als anspruchsvoll?',
      a: [
        'Hohe Anfluggeschwindigkeit (teils 150–165 kt), hohe Massen-/Nickträgheit bei kleinerem Höhenleitwerk und feinfühlige Korrekturen beim Abfangen („Flare“)',
        'Weil sie keine Landeklappen an der Tragfläche besitzt',
        'Weil sich das Fahrwerk erst bei Berührung der Bahn ausfährt',
        'Weil der Blick aus dem Cockpit nur über Periskope möglich ist'
      ],
      exp: 'Besonders bei Seitenwind, Böen oder verspätetem Abfangen erfordert die MD-11 extrem disziplinierte Energie- und Pitch-Kontrolle ohne Nachziehen nach dem ersten Bodenkontakt.'
    },
    {
      cat: 'technik',
      diff: 'mid',
      q: 'Welche zwei getrennten Computer bzw. Kanäle arbeiten bei der MD-11 im Flight Control Computer (FCC) zusammen?',
      a: [
        'Dual-Channel-Architektur (FCC-1 und FCC-2 jeweils mit zwei unabhängigen Rechen-Lanes für Autopilot, Autothrottle und LSAS)',
        'Ein einzelner 8-Bit-Chip ohne Redundanz',
        'Ausschließlich mechanische Fliehkraftregler',
        'Vier analoge Röhrenverstärker aus der DC-8'
      ],
      exp: 'FCC-1 und FCC-2 ermöglichen Autoland bis CAT IIIb; bei Störungen oder Ausfällen der Stabilisierungsfunktion warnen klare EICAS-/EAD-Anzeigen.'
    },
    {
      cat: 'technik',
      diff: 'mid',
      q: 'Wie erfolgt bei der MD-11 im regulären Flug die Bedienung von Seitenruder und Querruder-Störklappen bei Kurven bzw. Triebwerksausfall?',
      a: [
        'Über seilzugbetätigte hydraulische Aktuatoren mit zusätzlichem Yaw Damper und automatischem Roll-Spoiler-Mix (innerer und äußerer Querruderkreis)',
        'Rein elektrisch per Wipp-Knöpfe am Deckenpanel',
        'Mit einem festen Steuerrad für jedes einzelne Triebwerk',
        'Die äußeren Querruder werden schon ab 50 kt blockiert'
      ],
      exp: 'Im Unterschied zum reinen Hochgeschwindigkeits-Lockout mancher Typen arbeitet das innere Querruder durchgängig, während bei niedriger Geschwindigkeit die äußeren Querruder und Spoiler mithelfen.'
    },
    {
      cat: 'technik',
      diff: 'mid',
      q: 'Was ist das „RCWS“ (Roll Control Wheel Steering) innerhalb der MD-11-Steuerungslogik, bzw. welche Zusatzfunktion bietet LSAS beim Anflug?',
      a: [
        'CWS/LSAS hält bei losgelassenem Steuerhorn im manuellen Flug den aktuellen Nickwinkel (Pitch Attitude Hold) und dämpft Böenstörungen automatisch aus',
        'Es lenkt beim Rollen zum Gate automatisch per Kameras',
        'Es dreht bei Gegenwind das Bugfahrwerk quer zur Bahn',
        'Es senkt beim Beladen die Nase ab'
      ],
      exp: 'Solange der Pilot keinen Druck aufs Steuerhorn ausübt, stabilisiert LSAS aktiv die Längslage – drückt oder zieht der Pilot über die Schwellkraft, steuert er direkt die Ruder und das LSAS passt die Höhenflossentrimmung im Hintergrund an.'
    },
    {
      cat: 'technik',
      diff: 'mid',
      q: 'Wie wird beim Ausfall eines Systems oder Motors im MD-11-Glascockpit ein „Dark-Cockpit“- und automatisches Checklisten-Konzept umgesetzt?',
      a: [
        'Im Normalzustand leuchten keine Warnlampen („Lights out“); bei Fehlern blendet das System Display automatische elektronische Abhilfeschritte („Consequence Alerts“) direkt ein',
        'Alle Deckenlampen schalten sich komplett ab, bis ein Fehler auftritt',
        'Im Cockpit blinken permanent alle 200 Schalter als Funktionstest',
        'Papierhandbücher ersetzen alle Anzeigen komplett'
      ],
      exp: 'Zudem besaßen einzelne Decken-Schalter wie beim Kraftstoff- oder Hydrauliksystem aufleuchtende weiße/gelbe Linien und System-Resets, sodass ein Zwei-Mann-Cockpit selbst komplexe Störungen schnell abarbeitete.'
    },
    {
      cat: 'technik',
      diff: 'mid',
      q: 'Welche Besonderheit besitzen die Passagierfenster bzw. Rumpftüren der MD-11 beim Vergleich mit modernen 2000er-Jets wie dem A350 oder der 787?',
      a: [
        'Rechteckige Standard-Fenster mit mechanischen Sonnenblenden und nach oben/innen bzw. außen klappenden Plug-Türen (teils auch 8 Passagiertüren + optionale kleinere Heck-Notausgänge)',
        'Elektronisch dimmbare Fenster ohne Blenden wie bei der 787',
        'Runde Bullaugen ohne Vorhänge',
        'Nur eine einzige Tür vorn links'
      ],
      exp: 'Die klassische breite Doppelgang-Kabine der MD-11 bot meist 9 oder 10 Sitze pro Reihe (z. B. 2-5-2 oder 3-4-2 / 3-4-3) – bei den frühen Typ-A-Türen blieb das typische Douglas-Design erkennbar.'
    },
    {
      cat: 'technik',
      diff: 'mid',
      q: 'Wie viele unabhängige Hydrauliksysteme versorgen in der MD-11 die Steuerflächen, Bremsen und Fahrwerksklappen?',
      a: [
        'Drei unabhängige Hydrauliksysteme (System 1, 2 und 3 mit je ~3.000 psi Arbeitsdruck)',
        'Ein einziges großes Hauptsystem mit Reserve-Handpumpe',
        'Zwei Systeme plus Pneumatik aus den Bremsscheiben',
        'Fünf getrennte 5.000-psi-Systeme'
      ],
      exp: 'Jedes der drei Triebwerke treibt über zwei Motorpumpen ein Hydrauliksystem an; im Notfall liefern Elektropumpen sowie eine Umkehr-Motorpumpe (RMP) Querverbindungsschutz ohne Flüssigkeitsaustausch.'
    },
    {
      cat: 'technik',
      diff: 'pro',
      q: 'Welche aerodynamische Modifikation an der Flügelhinterkante („Divergent Trailing Edge“ / PIP-Paket) verbesserte den Reiseflug der MD-11 nach dem enttäuschenden Start 1991?',
      a: [
        'Ein leicht abgestumpftes, ca. 1–2 cm dickes Ende an Klappen und Querrudern mit dünnen Luftleitblechen/Splitter-Modifikationen zur Verschiebung der Stoßwelle nach hinten',
        'Ein zusätzliches viertes Triebwerk unter dem Cockpit',
        'Abmontieren der gesamten Winglets im Jahr 1993',
        'Das Einklappen des Seitenleitwerks im Reiseflug'
      ],
      exp: 'Im Rahmen des großen PIP (Performance Improvement Program) reduzierten McDonnell Douglas und NASA an Flügelhinterkante, Rumpfdichtungen und Triebwerkspylonen den Widerstand um mehrere Prozent.'
    },
    {
      cat: 'technik',
      diff: 'pro',
      q: 'Was passiert bei der MD-11 technisch genau, wenn während eines Landeanflugs die Spoiler automatisch ausfahren („Ground Spoiler Deployment“) – und warum kann das beim Springen („Bounce“) kritisch sein?',
      a: [
        'Sobald ein Rad aufsetzt oder die Umkehrschub-Hebel gezogen werden, fahren alle Oberflügel-Spoiler hoch und vernichten schlagartig den Auftrieb, was bei zu frühem/hartem Springen ein starkes Aufbäumen der Nase auslösen kann',
        'Die Spoiler vergrößern beim Aufsetzen kurzzeitig den Auftrieb um 50 %',
        'Die Spoiler drehen sich um 180° nach vorn',
        'Die MD-11 besitzt auf der Tragfläche gar keine Boden-Spoiler'
      ],
      exp: 'Weil die Spoiler hinter dem Auftriebsschwerpunkt sitzen, erzeugt plötzliches Ausfahren in der Luft ein nase-hoch-Moment – federt die Maschine gleichzeitig ab, verliert sie rapide Fahrt und Auftrieb (Grundlage für verbesserte Pilotentrainings nach FedEx 14 / 80).'
    },
    {
      cat: 'technik',
      diff: 'pro',
      q: 'Welche maximale Reisegeschwindigkeit und welche typische Langstrecken-Machzahl fliegt die MD-11 (im Vergleich zu langsameren Zweistrahlern wie dem A330/A340-200/300)?',
      a: [
        'Bis Mach 0,88 (MMO); typische Reisegeschwindigkeit Mach 0,83–0,84 (deutlich schneller als A330/A340 mit Mach 0,80–0,82)',
        'Maximal Mach 0,68',
        'Überschall Mach 1,05',
        'Nur Mach 0,74 wie Kurzstreckenjets'
      ],
      exp: 'Piloten und Dispatcher liebten die hohe Reisegeschwindigkeit der MD-11 – sie war fast so schnell wie eine Boeing 747 und flog vielen damaligen Twin- und Quadjets davon.'
    },
    {
      cat: 'technik',
      diff: 'pro',
      q: 'Wie wird beim MD-11-Glascockpit ein Systemdisplay (SD) im Falle einer Störung automatisch priorisiert?',
      a: [
        'Neben den regulären EAD-Warnungen („Engine and Alert Display“) kann manuell oder über „Auto-System-Display“ die entsprechende Grafikseite (Hydraulik, Fuel, Elec, Air) unten rechts aufgeschaltet werden',
        'Es öffnet sich ein akustischer Morsecode statt Grafik',
        'Die Bildschirme schalten sich in Blau-Rot-Streifen ab',
        'Es blinken nur die Landelichter draußen'
      ],
      exp: 'Die sechs identischen DU-880-Einheiten konnten im Fehlerfall zudem nahtlos auf benachbarte Bildschirme umgeschaltet werden (Display Reconfiguration).'
    },
    {
      cat: 'technik',
      diff: 'pro',
      q: 'Wie viel Grad beträgt die typische Tragflächenpfeilung (Quarter-Chord Sweep) der MD-11?',
      a: [
        '35 Grad',
        '15 Grad',
        '52 Grad',
        '0 Grad (gerader Flügel)'
      ],
      exp: 'Die markante 35°-Pfeilung (übernommen von der DC-10) ermöglichte die hohen Reisegeschwindigkeiten bis Mach 0,88.'
    },
    {
      cat: 'technik',
      diff: 'pro',
      q: 'Was kontrolliert das „LSAS Pitch Attitude Hold“ NICHT während des manuellen Fluges bei der MD-11, weshalb Piloten besonders beim Abfangen („Flare“) aufpassen mussten?',
      a: [
        'Bei großen Steuerhornausschlägen im Landeanflug oder unterhalb von 100 ft AGL ändert sich die LSAS-Logik / schaltet auf reine Dämpfung zurück, und bei hohem Anstellwinkel greift kein harter Airbus-Alpha-Floor-Schutz vor dem Strömungsabriss im Flare',
        'LSAS dreht die Nase unter 50 ft immer gewaltsam nach unten',
        'LSAS verhindert das Setzen der Landeklappen über 15 Grad',
        'LSAS schaltet bei Bodenberührung die Triebwerke in Vorwärtsschub'
      ],
      exp: 'Spätere Software-Updates (wie das LSAS-Update Mitte der 2000er/2010er nach Landezwischenfällen) verstärkten die Nick-Dämpfung nahe dem Boden und reduzierten automatische Pitch-Up-Tendenzen beim Spoilereinsatz.'
    },
    {
      cat: 'technik',
      diff: 'pro',
      q: 'Wie wird beim Frachter MD-11F der lange Hauptdeck-Frachtraum be- und entladen?',
      a: [
        'Über eine riesige nach oben öffnende Hauptdeck-Frachtluke vorn links hinter dem Cockpit (ca. 3,56 m × 2,59 m)',
        'Durch eine aufklappbare Bugnase wie bei der Boeing 747F',
        'Ausschließlich durch eine Heckrampe unterm Triebwerk Nr. 2',
        'Über die regulären vorderen Kabinentüren'
      ],
      exp: 'Wie fast alle dreistrahligen Großraumfrachter besitzt die MD-11F keine klappbare Bugnase, sondern ein massives seitliches „Main Deck Cargo Door“ auf der Backbordseite.'
    },
    {
      cat: 'technik',
      diff: 'pro',
      q: 'Welches kleine Bauteil am hinteren unteren Rumpf schützt bzw. warnt bei einem drohenden „Tailstrike“ der MD-11 beim Start oder zu steilen Abfangen?',
      a: [
        'Eine auswechselbare mechanische Hecksporn-/Schleifkufe (Tail Skid) mit Überlastanzeige – bei der langen MD-11 kritischer als bei der kürzeren DC-10',
        'Ein einziehbares fünftes Heckrad mit Bremse',
        'Zwei Wasserstrahldüsen unter dem Leitwerk',
        'Gar kein Bauteil – der Rumpf liegt dann direkt mit dem APUschacht auf'
      ],
      exp: 'Durch die um fast 5,7 m längere Rumpfstrecke hinter dem Hauptfahrwerk reduzierte sich der maximale Aufstellwinkel (Pitch Limit) beim Start und der Landung deutlich.'
    },

    // =========================================================================
    // 2. TRIEBJET-ANTRIEB, STRUKTUR & DATEN (25 Fragen: 8 easy · 9 mid · 8 pro)
    // =========================================================================
    {
      cat: 'triebwerke',
      diff: 'easy',
      q: 'Wie viele Triebwerke besitzt die McDonnell Douglas MD-11 und wo sind sie angebracht?',
      a: [
        'Drei Triebwerke („Trijet“): je eins unter jedem Flügel + das mittlere Triebwerk Nr. 2 im Sockel des Seitenleitwerks',
        'Vier Triebwerke – zwei unter jedem Flügel',
        'Zwei extrem große Triebwerke unter den Flügeln',
        'Drei Triebwerke im Rumpfheck nach Art der Boeing 727'
      ],
      exp: 'Die charakteristische Platzierung des mittleren Triebwerks hoch oben im Seitenleitwerk („Straight-Through-Duct“) verlieh DC-10 und MD-11 ihr unverwechselbares Erscheinungsbild.'
    },
    {
      cat: 'triebwerke',
      diff: 'easy',
      q: 'Welche zwei Triebwerkshersteller rüsteten die gebauten MD-11-Serienmaschinen tatsächlich aus?',
      a: [
        'General Electric (CF6-80C2) und Pratt & Whitney (PW4460 / PW4462)',
        'Rolls-Royce und CFM International',
        'Ivchenko Progress und Kuznetsov',
        'BMW Rolls-Royce und Engine Alliance'
      ],
      exp: 'Obwohl McDonnell Douglas anfangs auch Rolls-Royce RB211-524L anbot, bestellten Airlines nur die GE- und Pratt-&-Whitney-Varianten.'
    },
    {
      cat: 'triebwerke',
      diff: 'easy',
      q: 'Worin unterscheidet sich die Luftführung des mittleren Hecktriebwerks (Nr. 2) der MD-11 von jener der Lockheed L-1011 TriStar?',
      a: [
        'Die MD-11 führt die Luft geradlinig direkt in den im Leitwerksansatz sitzenden Einlauf („Straight-Through“); die TriStar nutzte einen S-förmigen Luftkanal nach hinten in den Rumpf',
        'Die MD-11 hat das dritte Triebwerk unter dem Cockpit',
        'Bei der MD-11 wird das dritte Triebwerk nur über Zapfluft angetrieben',
        'Die TriStar besaß gar kein mittleres Triebwerk'
      ],
      exp: 'Der gerade Einlauf der MD-11 (wie bei der DC-10) vermied S-Duct-Strömungsverluste, stellte Wartungsteams in über 10 Metern Höhe allerdings vor anspruchsvolle Kran-/Arbeitsbühnenarbeiten.'
    },
    {
      cat: 'triebwerke',
      diff: 'easy',
      q: 'Wie lang ist der Rumpf einer McDonnell Douglas MD-11 ungefähr im Vergleich zur bekannten Boeing 777-200 oder Airbus A340-300?',
      a: [
        'Rund 61,2 bis 61,6 Meter (damit um 5,7 m länger als eine DC-10-30)',
        'Nur rund 38 Meter wie ein Airbus A320',
        'Über 84 Meter länger als eine 747-8',
        'Genau 45 Meter'
      ],
      exp: 'Mit 61,21 m (GE-Triebwerke) bzw. 61,62 m (PW-Triebwerke wegen anderer Einlauflippe) war sie ein echtes Langstrecken-Großraumflugzeug.'
    },
    {
      cat: 'triebwerke',
      diff: 'easy',
      q: 'Wie viel Spannweite misst die Tragfläche der MD-11 inklusive ihrer aufgesteckten Winglets?',
      a: [
        'Rund 51,7 bis 52,0 Meter',
        'Genau 34,1 Meter',
        '80,0 Meter wie der Airbus A380',
        '28,5 Meter'
      ],
      exp: 'Gegenüber der 50,4 m breiten DC-10-30 wuchs die Spannweite der MD-11 hauptsächlich durch die abgewinkelten Winglets auf knapp 52 Meter.'
    },
    {
      cat: 'triebwerke',
      diff: 'easy',
      q: 'Wie viele Hauptfahrwerksbeine („Main Landing Gear“) trägt eine MD-11 unter dem Rumpf und den Flügeln?',
      a: [
        'Drei Hauptfahrwerksbeine (zwei vierrädrige unter den Flügeln + ein zweirädriges Zentralfahrwerk unter dem Bauch) plus das zweirädrige Bugfahrwerk',
        'Nur ein einzelnes zentrales Hauptfahrwerk mit 20 Rädern',
        'Vier Hauptfahrwerke wie eine Boeing 747',
        'Ein festes Kufenfahrwerk ohne Reifen'
      ],
      exp: 'Wie bei den schweren Interkontinental-Versionen DC-10-30/-40 verteilt das zentrale Zwillings-Hauptfahrwerk unter dem Rumpf die über 280 Tonnen Startgewicht auf die Startbahn.'
    },
    {
      cat: 'triebwerke',
      diff: 'easy',
      q: 'Wie viele Räder rollen bei einer voll ausgestatteten MD-11 insgesamt über die Start- und Landebahn?',
      a: [
        '12 Räder (2 Bug + 4 links + 4 rechts + 2 mittig)',
        '6 Räder',
        '18 Räder wie eine 747',
        '22 Räder wie ein A380'
      ],
      exp: 'Jedes der 10 Hauptfahrwerksräder besitzt eigene Hochleistungsbremsen; das zentrale Fahrwerksbein lässt sich bei Leichtlast-Flügen teils schonen oder voll mitnutzen.'
    },
    {
      cat: 'triebwerke',
      diff: 'easy',
      q: 'Wie hoch liegt das maximale Abfluggewicht (MTOW) einer typischen Langstrecken-MD-11F / MD-11ER?',
      a: [
        'Etwa 273 bis 286 Tonnen (602.500 bis 630.500 lb)',
        'Etwa 75 Tonnen',
        'Über 560 Tonnen',
        'Genau 140 Tonnen'
      ],
      exp: 'Standard-MD-11 begannen bei ca. 273,3 t MTOW; späte Frachter und die MD-11ER erreichten bis zu 285,99 t (630.500 lb).'
    },
    {
      cat: 'triebwerke',
      diff: 'mid',
      q: 'Wie hoch ist die Heckflosse (Seitenleitwerk) einer MD-11 über dem Boden, wenn das Flugzeug auf seinen Rädern steht?',
      a: [
        'Rund 17,6 Meter (etwa so hoch wie ein fünf- bis sechsstöckiges Gebäude)',
        'Nur 8,2 Meter',
        'Genau 28,5 Meter',
        '11,0 Meter'
      ],
      exp: 'Mit 17,60 m Gesamthöhe gehört das imposante Seitenleitwerk mit dem integrierten Triebwerk Nr. 2 zu den markantesten Silhouetten auf jedem Frachtvorfeld.'
    },
    {
      cat: 'triebwerke',
      diff: 'mid',
      q: 'Welchen Schub leistet jedes der drei Triebwerke einer MD-11 (GE CF6-80C2D1F bzw. PW4462) ungefähr?',
      a: [
        'Etwa 267 bis 276 kN (ca. 60.000 bis 62.000 lbf Schub pro Triebwerk)',
        'Etwa 110 kN wie ein A320-Triebwerk',
        'Über 510 kN wie ein GE90-115B',
        'Etwa 45 kN'
      ],
      exp: 'Zusammen entwickeln die drei Triebwerke über 800 kN Startschub – das verschaffte der MD-11 insbesondere leer oder leicht beladen eine beeindruckende Steigrate.'
    },
    {
      cat: 'triebwerke',
      diff: 'mid',
      q: 'Was bedeutet bei den Pratt-&-Whitney-Triebwerken einer MD-11 die präzise Typennummer „PW4460“ vs. „PW4462“?',
      a: [
        'Beide gehören zur PW4000-Serie (94-Zoll-Fan): „60“ steht für 60.000 lbf, „62“ für das verstärkte 62.000-lbf-Schubrating',
        'Sie bedeuten 60 bzw. 62 Zylinder im Triebwerk',
        'Es sind das Baujahr 1960 und 1962',
        'Es ist die maximale Betriebshöhe in Kilometern'
      ],
      exp: 'Die zweistellige Kennziffer am Ende codiert bei PW4000-Modellen traditionell den Standschub in tausend Pfund (lbf).'
    },
    {
      cat: 'triebwerke',
      diff: 'mid',
      q: 'Welche Rumpfsektion der MD-11 wurde gegenüber der DC-10 um exakt wie viel gestreckt?',
      a: [
        'Zwei Rumpfstopfen („Plugs“): vorn ca. +2,54 m und hinter dem Flügel ca. +3,12 m – zusammen ca. 5,66 m länger als die DC-10-30',
        'Nur ein Heckkonus von +50 cm',
        'Sie war kürzer als die DC-10-30',
        'Ausschließlich das Oberdeck um +12 m verlängert'
      ],
      exp: 'Diese doppelte Streckung schuf Platz für rund 50 zusätzliche Passagiere bzw. deutlich mehr Palettenpositionen auf dem Fracht-Hauptdeck.'
    },
    {
      cat: 'triebwerke',
      diff: 'mid',
      q: 'Wie viel maximale Fracht-Nutzlast (Payload) transportiert eine reguläre MD-11F im Langstreckenbetrieb ungefähr?',
      a: [
        'Bis zu rund 90–92 Tonnen (auf bis zu 26 Hauptdeck- + 14 Unterdeck-Paletten/Containern)',
        'Maximal 22 Tonnen',
        'Über 250 Tonnen wie die An-225',
        'Rund 45 Tonnen'
      ],
      exp: 'Mit rund 90 Tonnen Nutzlast platzierte sich die MD-11F exakt in der lukrativen Nische zwischen der Boeing 767-300F (~52 t) und der Boeing 747-400F (~113–124 t).'
    },
    {
      cat: 'triebwerke',
      diff: 'mid',
      q: 'Welches Hilfstriebwerk (APU) sitzt im Rumpfheck der MD-11 und wofür dient es am Boden?',
      a: [
        'Garrett / AlliedSignal TSCP700-4E im Heckkonus hinter Druckschott – liefert Strom und Zapfluft für Klimaanlage und Triebwerksstart unabhängig vom Bodenaggregat',
        'Ein viertes Marschtriebwerk für den Reiseflug',
        'Eine elektrische Batterie im Bugfahrwerksschacht',
        'Ein Zweitakt-Dieselmotor in den Flügelwurzeln'
      ],
      exp: 'Die kompakte Gasturbine ermöglichte der MD-11 autarkes Abfertigen auf abgelegenen Fracht- oder Passagiervorfeldern weltweit.'
    },
    {
      cat: 'triebwerke',
      diff: 'mid',
      q: 'Wie heißt das spezielle elektronische Triebwerks-Steuergerät moderner MD-11-Triebwerke (CF6-80C2 & PW4460), das mechanische Kraftstoff-Züge ersetzte?',
      a: [
        'FADEC (Full Authority Digital Engine Control)',
        'Vergaser mit Choke',
        'Magnetzünder Typ Bosch',
        'Pneumatischer Drehzahlbegrenzer'
      ],
      exp: 'FADEC überwacht automatisch Abgastemperaturen (EGT), Drehzahlen (N1/N2), verhindert Überdrehen oder Verdichterpumpstöße und regelt den Schub exakt nach Schubhebel-Position.'
    },
    {
      cat: 'triebwerke',
      diff: 'mid',
      q: 'Warum besitzen MD-11 mit Pratt-&-Whitney-Triebwerken (PW4460/4462) eine minimal längere Rumpflänge (ca. 61,62 m) als Maschinen mit GE CF6-80C2 (61,21 m)?',
      a: [
        'Wegen der unterschiedlichen Geometrie der Einlauflippe / Auslassdüse am Hecktriebwerk Nr. 2 im Seitenleitwerk',
        'Weil PW-Kunden generell zwei extra Sitzreihen hinten eingebaut bekamen',
        'Weil PW-Flugzeuge eine längere Radarnase haben',
        'Nur ein Vermessungsfehler in Kalifornien'
      ],
      exp: 'Da sich Einlauf- und Auslassverkleidung des mittleren Hecktriebwerks ganz nach hinten bis zum Leitwerksabschluss erstrecken, ändert das Triebwerksmuster die Gesamtlänge leicht.'
    },
    {
      cat: 'triebwerke',
      diff: 'mid',
      q: 'Welche Dienstgipfelhöhe (Maximum Operating Altitude) ist für die McDonnell Douglas MD-11 zugelassen?',
      a: [
        '43.000 Fuß (ca. 13.100 Meter)',
        '25.000 Fuß (ca. 7.600 Meter)',
        '60.000 Fuß wie die Concorde',
        '31.000 Fuß'
      ],
      exp: 'Typische Langstrecken-Reiseflughöhen liegen zwischen Flugfläche FL310 und FL410 – abhängig von Gewicht und Temperatur.'
    },
    {
      cat: 'triebwerke',
      diff: 'pro',
      q: 'Wie viele Kerosin-Kilogramm bzw. Liter passen ungefähr maximal in die Tanks einer Standard-MD-11 (und noch mehr in die MD-11ER)?',
      a: [
        'Rund 146.170 Liter (Standard) bzw. bis ca. 158.000 Liter in der MD-11ER mit Zusatztank im Frachtraum',
        'Nur rund 30.000 Liter',
        'Über 320.000 Liter wie bei einem Airbus A380',
        'Etwa 68.000 Liter'
      ],
      exp: 'Die gewaltige Kraftstoffkapazität (ca. 117–127 Tonnen Kerosin inkl. Heck-Trimmtank!) ermöglichte Strecken von über 12.600 km (ER bis ~13.400 km).'
    },
    {
      cat: 'triebwerke',
      diff: 'pro',
      q: 'Welche Rolle spielt das mittlere Triebwerk Nr. 2 strukturell bei der Schubumkehr (Thrust Reverser) nach der Landung?',
      a: [
        'Alle drei Triebwerke – auch das hoch im Leitwerk sitzende Triebwerk Nr. 2 – verfügen über aktiv einsetzbare Schubumkehrer (Übersetzer-Klappen/Kaskaden)',
        'Triebwerk Nr. 2 hat grundsätzlich keine Schubumkehr',
        'Nur Triebwerk Nr. 2 besitzt Schubumkehr, die Flügeltriebwerke nicht',
        'Die Schubumkehr erfolgt durch Rückwärtsdrehen der Fanblätter'
      ],
      exp: 'Die Übersetzerhülsen (Translating Cowls) aller drei Triebwerke schieben sich nach hinten und lenken den Mantelstrom schräg nach vorn ab.'
    },
    {
      cat: 'triebwerke',
      diff: 'pro',
      q: 'Wie unterscheiden sich optisch die Triebwerksgondeln der GE CF6-80C2 von jenen der Pratt & Whitney PW4460/4462 an der MD-11?',
      a: [
        'Die GE-Gondeln laufen hinten spitz mit einem sichtbaren großen zentralen Abgaskonus zusammen; die PW-Gondel bildet einen kompakten gemeinsamen Mischer-/Abgasring und hat einen etwas kürzeren, bauchigeren Einlauf',
        'Die GE-Triebwerke sind viereckig und PW komplett dreieckig',
        'PW-Triebwerke besitzen vorn sichtbare Propellerblätter',
        'Sie sind äußerlich bis auf das letzte Niet komplett identisch'
      ],
      exp: 'Spotter erkennen GE vs. PW an einer MD-11 binnen einer Sekunde am verlängerten, konischen Düsenauslass des GE CF6 versus dem stumpferen „Common Nozzle“ der PW4460-Serie.'
    },
    {
      cat: 'triebwerke',
      diff: 'pro',
      q: 'Warum sitzt das zentrale Hauptfahrwerksbein (Center Main Gear) bei einigen anderen Flugzeugen wie der 767 nicht, bei der MD-11 aber doch – und wofür ist eine bekannte Sonderregelung am Center Gear bekannt?',
      a: [
        'Es entlastet Bahnoberflächen bei hohem Gewicht (ACN/PCN); bei manchen leichten Überführungsflügen oder Wartungsfällen konnte die MD-11 auch mit eingefahren verriegeltem oder blockiertem Mittelbein nach Spezialverfahren landen',
        'Es dient ausschließlich als Wasserskibügel für Notwasserungen',
        'Es fährt nur aus, wenn das Bugfahrwerk klemmt',
        'Es dreht sich im Flug als Windrad für den Notstrom'
      ],
      exp: 'Der zusätzliche Doppelsatz Räder im Bauch senkt den spezifischen Reifen-Flächendruck auf älteren Flughäfen massiv – genau ein Erbe der Interkontinental-DC-10-30.'
    },
    {
      cat: 'triebwerke',
      diff: 'pro',
      q: 'Wie groß ist der Rumpfdurchmesser (Breite) der MD-11-Kabine, wodurch sie sowohl für 9–10 Passagiere nebeneinander als auch für Großpaletten ideal war?',
      a: [
        'Exakt 6,02 Meter (237 Zoll Außendurchmesser) – etwas breiter als Boeing 767/A330 und knapp schmaler als die Boeing 777',
        '3,76 Meter wie eine Boeing 737',
        '7,14 Meter wie ein A380-Hauptdeck',
        '4,50 Meter'
      ],
      exp: 'Mit 6,02 m Außendurchmesser bot der Rumpf zwei breite Gänge und im Unterdeck Platz für zwei nebeneinander stehende LD3-Container.'
    },
    {
      cat: 'triebwerke',
      diff: 'pro',
      q: 'Was geschah mit dem Lufteinlauf-System von Triebwerk Nr. 2, wenn bei Vereisungsbedingungen Enteisung (Anti-Ice) benötigt wurde?',
      a: [
        'Heiße Zapfluft (Bleed Air) strömt durch die Vorderkante der Einlauflippe des hoch sitzenden Heck-Lufteinlaufs sowie die Nasenkegel',
        'Elektrische Scheibenwischer kratzen den Einlauf frei',
        'Die Besatzung sprüht Alkohol durch ein Rohr aus der Kabine',
        'Triebwerk Nr. 2 wird bei unter 0 Grad komplett abgeschaltet'
      ],
      exp: 'Sowohl die Tragflächen-Vorflügel (Slats) als auch alle drei Triebwerkseinläufe nutzen regulierbare Hochtemperatur-Zapfluft.'
    },
    {
      cat: 'triebwerke',
      diff: 'pro',
      q: 'Inwiefern nutzte McDonnell Douglas bei der MD-11 gegenüber der DC-10 vermehrt Verbundwerkstoffe (Composites), z. B. an den Winglets und Steuerflächen?',
      a: [
        'Kohlefaser- und Kevlar-Verbundteile wurden für Winglets, Höhen- & Seitenruder, Triebwerksverkleidungen, Klappen und Bodenpaneele verbaut, um Strukturgewicht zu sparen',
        'Der gesamte Druckrumpf bestand erstmals zu 100 % aus Kohlefaser wie bei der 787',
        'Gar keine Verbundwerkstoffe – nur Wellblech aus Stahl',
        'Ausschließlich Holz-Laminat an den Tragflächen'
      ],
      exp: 'Zwar blieb die Primärstruktur aus klassischer Aluminiumlegierung, doch dutzende Sekundärstrukturen und Steuerflächen sparten durch Composites Hunderte Kilo Gewicht.'
    },
    {
      cat: 'triebwerke',
      diff: 'pro',
      q: 'Welchen typischen Nachteil im Treibstoffverbrauch hat ein dreistrahliges Design (MD-11) gegenüber modernen Zweistrahlern ähnlicher Größe (z. B. Boeing 777-200ER / 777F)?',
      a: [
        'Drei statt zwei Triebwerke bedeuten rund 50 % mehr Wartungskosten an Treibwerken, mehr Reibungs-/Stirnfläche und höheren spezifischen Verbrauch pro Tonnenkilometer',
        'Drei Triebwerke verbrauchen stets 50 % weniger Treibstoff als zwei',
        'Die MD-11 kann gar nicht über den Atlantik fliegen (kein ETOPS möglich)',
        'Ein Trijet darf nachts aus Lärmgründen nie als Frachter fliegen'
      ],
      exp: 'Erst mit der zunehmenden ETOPS-180/330-Zulassung extrem zuverlässiger Groß-Zweistrahler (B777, A330) war der größte frühere Trumpf des Dreistrahlers – freie Direktrouten über Ozeane – weitgehend dahin.'
    },

    // =========================================================================
    // 3. PASSAGIER-AIRLINES & FRACHTER-LEGENDEN (25 Fragen: 8 easy · 9 mid · 8 pro)
    // =========================================================================
    {
      cat: 'airlines_cargo',
      diff: 'easy',
      q: 'Welche europäische Fluggesellschaft nahm die McDonnell Douglas MD-11 im Dezember 1990 als weltweit allererste Airline in Betrieb?',
      a: [
        'Finnair (mit Erstflug Helsinki–Teneriffa am 20. Dezember 1990)',
        'Lufthansa',
        'Air France',
        'British Airways'
      ],
      exp: 'Das allererste ausgelieferte Kundenflugzeug ging an Finnair (Kennzeichen OH-LGA) und bediente Langstrecken bis nach Tokio und Bangkok.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'easy',
      q: 'Welche bekannte europäische Airline setzte ihre prächtig bemalten MD-11 am längsten von allen Airlines im regulären Linien-Passagierdienst ein (bis Oktober/November 2014)?',
      a: [
        'KLM Royal Dutch Airlines',
        'Swissair',
        'Alitalia',
        'Iberia'
      ],
      exp: 'Am 25./26. Oktober 2014 landete KLM-Flug KL672 aus Montreal letztmals als regulärer Passagierliniendienst in Amsterdam, gefolgt von drei emotionalen Abschieds-Rundflügen am 11. November 2014.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'easy',
      q: 'Welches Logistikunternehmen ist historisch der mit Abstand größte Einzelbetreiber der MD-11 (vor allem als Frachter MD-11F)?',
      a: [
        'FedEx Express',
        'DHL Aviation',
        'Amazon Prime Air',
        'Maersk Air Cargo'
      ],
      exp: 'FedEx betrieb in Spitzenzeiten über 60–70 MD-11F (teils fabrikneu, großteils umgerüstete Ex-Passagierjets von Swissair, American, Delta etc.) als Rückgrat des internationalen Expressnetzes.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'easy',
      q: 'Welche deutsche Frachtfluggesellschaft betrieb die MD-11F von 1998 bis Oktober 2021 als ihr ikonisches Flaggschiff und erhielt sogar das allerletzte je gebaute Exemplar?',
      a: [
        'Lufthansa Cargo',
        'Condor Cargo',
        'Air Berlin',
        'AeroLogic'
      ],
      exp: 'Lufthansa Cargo stellte insgesamt 19 MD-11F in Dienst (teils fabrikneu wie D-ALCA bis zur letzten ausgelieferten Maschine D-ALCN, später umgerüstete wie D-ALCC); am 17. Oktober 2021 flog D-ALCC „Thank you, MD-11. Goodbye.“ letztmals nach Frankfurt!'
    },
    {
      cat: 'airlines_cargo',
      diff: 'easy',
      q: 'Welche traditionsreiche deutsche Urlaubsfluggesellschaft setzte in den 1990ern vier weiße-rote MD-11 im Langstrecken-Ferienverkehr ein (z. B. nach Florida oder in die Karibik)?',
      a: [
        'LTU (Lufttransport-Unternehmen, Düsseldorf)',
        'Hapag-Lloyd Flug',
        'Germania',
        'TUIfly'
      ],
      exp: 'LTU setzte ihre vier MD-11 (D-AERJ bis D-AERM) von 1991 bis 1998 unter anderem ab Düsseldorf intensiv Richtung USA und Karibik ein.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'easy',
      q: 'Welcher zweite große US-Paketdienstleister neben FedEx setzt die MD-11F bis in die Gegenwart ab seinem Hub Louisville (Worldport) ein?',
      a: [
        'UPS Airlines (United Parcel Service)',
        'USPS eigene Airline',
        'Southwest Cargo',
        'Spirit Freight'
      ],
      exp: 'Die charakteristischen braun-weißen UPS-MD-11F (teils ehemalige Varig-/Lufthansa-Maschinen) fliegen bis heute weltweit Expressfracht (u. a. auch regelmäßig nach Köln/Bonn!).'
    },
    {
      cat: 'airlines_cargo',
      diff: 'easy',
      q: 'Wie viele McDonnell Douglas MD-11 wurden zwischen 1988 und 2000 insgesamt gebaut?',
      a: [
        'Exakt 200 Flugzeuge',
        '1.574 Flugzeuge wie bei der 747',
        '48 Flugzeuge',
        '820 Flugzeuge'
      ],
      exp: 'Genau 200 Exemplare liefen im kalifornischen Long Beach vom Band – rund halb so viele wie einst von der Vorgängerin DC-10 (386 Zivil- + 60 KC-10).'
    },
    {
      cat: 'airlines_cargo',
      diff: 'easy',
      q: 'Welche Schweizer Fluggesellschaft galt in den 1990ern mit rund 20 Maschinen als eine der stolzesten Vorzeigekunden der MD-11 im Passagierdienst?',
      a: [
        'Swissair (und danach kurz Swiss International Air Lines)',
        'Edelweiss Air',
        'Helvetic Airways',
        'Crossair'
      ],
      exp: 'Die Swissair-MD-11 flogen ab Zürich und Genf rund um den Globus; viele dieser Maschinen wurden später zu langlebigen Frachtern bei UPS oder FedEx umgebaut.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'mid',
      q: 'Welche fünf Bau- bzw. Modellvarianten bot McDonnell Douglas ab Werk bei der MD-11 an?',
      a: [
        'MD-11 (Passagier), MD-11ER (Extended Range), MD-11C (Combi), MD-11CF (Convertible Freighter) und MD-11F (Vollfrachter)',
        'Nur MD-11 Passagier und MD-11 Militär-Tanker',
        'MD-11-100, -200, -300, -400 und -500 wie bei Airbus',
        'MD-11 Wasserflugzeug und MD-11 Überschall'
      ],
      exp: 'Eine Besonderheit war der Combi (Alitalia setzte fünf MD-11C mit Passagieren vorn und Fracht hinten auf demselben Deck ein) sowie der wandelbare CF (u. a. Martinair & World Airways).'
    },
    {
      cat: 'airlines_cargo',
      diff: 'mid',
      q: 'Wie heißt die Konvertierungsbezeichnung vieler ehemaliger Passagier-MD-11, nachdem sie nachträglich durch den Einbau einer Frachttür und verstärktem Boden zu Vollfrachtern umgebaut wurden?',
      a: [
        'MD-11BCF (Boeing Converted Freighter)',
        'MD-11P2F Neo',
        'MD-11 Cargo-Max',
        'DC-10-MD'
      ],
      exp: 'Da Boeing McDonnell Douglas 1997 übernommen hatte, führte man das Umbauprogramm offiziell als „MD-11BCF“ (oft ausgeführt bei ST Aerospace / SASCO in Singapur oder in Neapel/Venedig).'
    },
    {
      cat: 'airlines_cargo',
      diff: 'mid',
      q: 'Welche US-Fluggesellschaft setzte über 17 MD-11 auf Transpazifik- und Europastrecken ab Atlanta und Portland ein, musterte sie aber bereits um 2004 zugunsten der Boeing 777 aus?',
      a: [
        'Delta Air Lines',
        'United Airlines',
        'Southwest Airlines',
        'JetBlue'
      ],
      exp: 'Delta Air Lines betrieb eine große MD-11-Flotte (und übernahm die Erstauslieferung für die USA Anfang der 1990er), stieß die Trijets jedoch früher als geplant ab.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'mid',
      q: 'Welches besondere Engagement zelebrierte Lufthansa Cargo auf dem letzten Abschiedsflug der eigenen MD-11 („D-ALCC“) im Jahr 2021 äußerlich auf dem Rumpf?',
      a: [
        'Einen großen weißen/blauen Abschiedsschriftzug „Thank you, MD-11. Goodbye.“ auf beiden Rumpfseiten und Abschiedstour-Stops (inkl. Buenos Aires – Frankfurt)',
        'Eine komplette Lackierung in Goldblatt',
        'Die Demontage des mittleren Triebwerks auf der Abschiedstour',
        'Das Übermalen aller Fenster in Knallrot'
      ],
      exp: 'Mit Flug LH8161 aus Buenos Aires über Campinas/Dakar nach Frankfurt verabschiedete Lufthansa Cargo die „Diva“ im Oktober 2021 unter großer Anteilnahme unzähliger Planespotter.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'mid',
      q: 'Welche niederländische Fluggesellschaft betrieb neben KLM viele Jahre lang sieben auffällige rote/silberne MD-11F und MD-11CF im weltweiten Fracht- und Chartergeschäft?',
      a: [
        'Martinair (Martinair Holland)',
        'Transavia',
        'Corendon Dutch Airlines',
        'Vueling'
      ],
      exp: 'Martinair (heute Tochter von Air France-KLM) setzte die vier umrüstbaren MD-11CF im Sommer teils für Ferienpassagiere und im Winter als reine Frachter ein.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'mid',
      q: 'Was war die „MD-11C“ (Combi), von der genau fünf Maschinen exklusiv für Alitalia gebaut wurden?',
      a: [
        'Eine Kombiversion mit Passagierkabine im vorderen/mittleren Bereich plus einer großen Hauptdeck-Frachtluke und sechs Frachtpaletten-Stellplätzen im Heck auf demselben Deck',
        'Eine reine VIP-Regierungsversion mit drei Schlafzimmern',
        'Ein verkürzter Kurzstrecken-Flieger mit 120 Sitzen',
        'Ein reiner Truppentransporter für die US Air Force'
      ],
      exp: 'Später wurden die fünf seltenen Alitalia-Combis ebenfalls zu Vollfrachtern umgerüstet und gingen an Frachtairlines.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'mid',
      q: 'Welche große brasilianische Traditionsairline flog in den 1990er und frühen 2000er Jahren über 25 geleaste/eigene MD-11 (u. a. nach Frankfurt, Paris und Tokio)?',
      a: [
        'Varig (Viação Aérea Rio-Grandense)',
        'GOL Linhas Aéreas',
        'Azul',
        'TAM (als einziger brasilianischer Erstkunde ab 1991)'
      ],
      exp: 'Varig zählte zu den größten MD-11-Passagierbetreibern weltweit und flog mit den blauen-weißen Trijets regelmäßig nach Europa und Asien.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'mid',
      q: 'Welchen historischen Meilenstein markierte die Maschine „N611FE“ (Bau-Nr. / Line No. 447, Erstflug-Prototyp)?',
      a: [
        'Sie diente als erster Flugtest-Prototyp der MD-11 (Erstflug 10. Januar 1990) und flog anschließend jahrzehntelang als Frachter bei FedEx Express',
        'Sie stürzte beim allerersten Rolltest komplett ab',
        'Sie steht seit 1990 als Museumsexponat ohne Triebwerke in Paris',
        'Sie ging als VIP-Jet an den Sultan von Brunei'
      ],
      exp: 'Beeindruckend langlebig: Selbst der allererste Prototyp von Januar 1990 verrichtete nach dem Testprogramm jahrzehntelang zuverlässigen Frachtdienst bei FedEx.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'mid',
      q: 'Welche US-Frachtairline neben FedEx und UPS betreibt heute (in den 2020ern) noch als dritter verbleibender Betreiber zivile MD-11F im Charter- und ACMI-Verkehr?',
      a: [
        'Western Global Airlines (aus Estero, Florida)',
        'Atlas Air',
        'Kalitta Air',
        'Polar Air Cargo'
      ],
      exp: 'Während alle Passagierlinien und selbst europäische Cargo-Flotten (Lufthansa Cargo, Martinair) die MD-11 außer Dienst stellten, halten FedEx, UPS und Western Global die Dreistrahler-Ära am Himmel.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'pro',
      q: 'Welche große nordamerikanische Fluggesellschaft bestellte zunächst 19 MD-11 (ab 1991 ausgeliefert), musterte alle Exemplare aber aufgrund des enttäuschenden Verbrauchs schon bis 2001/2002 komplett aus?',
      a: [
        'American Airlines',
        'Pan Am',
        'Continental Airlines',
        'TWA'
      ],
      exp: 'American Airlines hatte unter Chef Robert Crandall gehofft, die MD-11 würde Tokio nonstop ab Dallas schaffen; nach Reichweiten-Engpässen verkaufte man die gesamte Flotte direkt an FedEx weiter.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'pro',
      q: 'Welche zwei kleinen Besonderheiten zeichnen den allerletzten je gefertigten Rumpf der MD-11 (MSN 48806, Auslieferung Februar 2001) aus?',
      a: [
        'Es war eine MD-11F für Lufthansa Cargo („D-ALCN“) – gefertigt 1999/2000 als letztes der 200 Exemplare nach dem Produktions-Stopp-Beschluss von Boeing',
        'Es war eine Passagiermaschine für Finnair namens OH-LZZ',
        'Sie bekam versuchsweise zwei Propeller',
        'Sie wurde nie bemalt und direkt verschrottet'
      ],
      exp: 'D-ALCN (Taufname u. a. „Servus München / Cargo Human Care“) trug zwar einen kleinen Produktionsabschluss-Hinweis, beendete die Geschichte einer ganzen Flugzeugfamilie aus Long Beach (Douglas Aircraft).'
    },
    {
      cat: 'airlines_cargo',
      diff: 'pro',
      q: 'Welche besondere Rolle spielte die „MD-11ER“ (Extended Range, nur 5 Stück ab Werk gebaut) im Passagierverkehr?',
      a: [
        'Mit auf 286 t erhöhtem MTOW und Zusatztank im Unterdeck flog sie Nonstop-Ultrastrecken (u. a. für Garuda Indonesia und World Airways) über mehr als 13.000 km',
        'Sie war eine um 10 Meter verkürzte Regional-Version',
        'Sie hatte nur vier Triebwerke',
        'Sie war eine unbemannte Aufklärungsdrohne'
      ],
      exp: 'Finnair ließ später zudem reguläre MD-11 per Service-Bulletin nahe an die Leistungswerte der MD-11ER nachrüsten.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'pro',
      q: 'Wie benannte KLM ihre letzten verbliebenen MD-11 liebevoll nach berühmten Persönlichkeiten (wie bei ihren anderen Flugzeugen nach Frauen/Künstlern)?',
      a: [
        'Nach berühmten Frauen der Weltgeschichte (z. B. „Audrey Hepburn“, „Maria Montessori“, „Florence Nightingale“, „Annie M.G. Schmidt“)',
        'Nach niederländischen Käsesorten',
        'Nach berühmten Fußballstadien',
        'Nach griechischen Kriegsgöttern'
      ],
      exp: 'Besonders die KLM-MD-11 „Audrey Hepburn“ (PH-KCE) und „Florence Nightingale“ (PH-KCD) genossen unter weltweiten Fans Kultstatus.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'pro',
      q: 'Welche asiatische Cargo-/Linienairline erwarb 1998 bzw. ab Mitte der 1990er fabrikneue MD-11F als erstes Fracht-Engagement außerhalb der USA (z. B. EVA Air / China Airlines)?',
      a: [
        'EVA Air (Taiwan) betrieb sowohl Passagier-MD-11 als auch eine bedeutende MD-11F-Frachterflotte für trans-pazifische Halbleiter- & Luftfracht',
        'Air India',
        'Garuda Express Jet',
        'All Nippon Airways'
      ],
      exp: 'Taiwanische Airlines (EVA Air, China Airlines, Mandarin Airlines) zählten in Asien neben Korean Air und Thai Airways zu den wichtigsten MD-11-Nutzern.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'pro',
      q: 'Welche europäische Frachtairline (heute Teil einer großen Gruppe) setzte bis 2020/2021 unter anderem Ex-Lufthansa- und Ex-Swissair-MD-11 im Afrika- und Nahost-Geschäft ein – bzw. gab es überhaupt nach Martinair & Lufthansa Cargo noch eine europäische Airline mit MD-11?',
      a: [
        'Nordic Global Airlines (Finnland, gegründet von Finnair & Ilmarinen, 4 ex-Finnair-MD-11F bis 2015) war neben LH Cargo und Martinair der letzte europäische Betreiber',
        'Ryanair Cargo flog 12 MD-11F bis 2023',
        'British Airways Cargo flog 30 MD-11F ab Heathrow',
        'Austrian Airlines flog 8 MD-11 ab Wien'
      ],
      exp: 'Nach dem Aus von Nordic Global Airlines (2015), Martinair (2016) und Lufthansa Cargo (2021) verschwand der zivile MD-11-Betreiberstatus komplett aus Europa.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'pro',
      q: 'Wie hieß das exklusive US-Charter- und Militärtruppen-Transportunternehmen, das jahrelang mit seinen MD-11 weltweit Soldaten sowie Pilgerflüge (Hadsch) durchführte?',
      a: [
        'World Airways (bis zur Betriebseinstellung 2014)',
        'Allegiant Air',
        'Pan Am Clipper Cargo',
        'Spirit Airlines'
      ],
      exp: 'World Airways flog neben US-Militärchartern auch extrem lange MD-11ER- und MD-11CF-Routen über den Atlantik und Nahen Osten.'
    },
    {
      cat: 'airlines_cargo',
      diff: 'pro',
      q: 'Wie viele der ursprünglich für Passagiere gebauten MD-11 wurden im Laufe der Jahre nachträglich zu reinen Frachtflugzeugen (BCF) umgerüstet?',
      a: [
        'Die überwiegende Mehrheit – über 70 bis 80 Passagiermaschinen wurden zu Frachtern konvertiert (neben ca. 53 ab Werk als MD-11F gebauten)',
        'Nur eine einzige Maschine als Testträger',
        'Genau null – Passagier-MD-11 ließen sich nicht umbauen',
        'Alle 200 wurden ab Werk nur als Frachter gebaut'
      ],
      exp: 'Da Passagierairlines schnell auf wirtschaftlichere Boeing 777 und Airbus A330/A340 wechselten, wurden gebrauchte MD-11 extrem günstige Ausgangsbasen für profitable Frachterumbauten.'
    },

    // =========================================================================
    // 4. DC-10-ERBE, CHRONIK & FLUGSICHERHEIT (25 Fragen: 8 easy · 9 mid · 8 pro)
    // =========================================================================
    {
      cat: 'historie_sicherheit',
      diff: 'easy',
      q: 'Aus welchem bekannten Großraumflugzeug der 1970er Jahre entwickelte McDonnell Douglas die MD-11 weiter?',
      a: [
        'McDonnell Douglas DC-10 (genauer der Langstrecken-Version DC-10-30)',
        'Boeing 747-200',
        'Lockheed L-1011 TriStar',
        'Douglas DC-8'
      ],
      exp: 'Die Zellenkonstruktion, das Breitenprofil und das Trijet-Layout stammten direkt von der DC-10 – während Cockpit, Rumpflänge, Aerodynamik und Triebwerke grundlegend modernisiert wurden.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'easy',
      q: 'An welchem Standort in Kalifornien wurde die McDonnell Douglas MD-11 entwickelt und endmontiert?',
      a: [
        'Long Beach (Kalifornien)',
        'Everett (Washington)',
        'Toulouse (Frankreich)',
        'Wichita (Kansas)'
      ],
      exp: 'Im traditionsreichen Douglas-Werk am Long Beach Airport entstanden einst DC-3, DC-8, DC-9, DC-10, MD-80 und schließlich die MD-11.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'easy',
      q: 'Welcher Konkurrent übernahm McDonnell Douglas im August 1997 und beendete bald darauf die Fertigung der MD-11 zugunsten der eigenen Boeing 777?',
      a: [
        'Boeing',
        'Airbus',
        'Lockheed Martin',
        'Embraer'
      ],
      exp: 'Nach der Fusion sah Boeing in der MD-11 eine direkte interne Konkurrenz zur brandneuen Boeing 777 und stellte das Programm 1998/2000 ein.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'easy',
      q: 'In welchem Jahr startete der Erstflug des MD-11-Prototyps?',
      a: [
        '1990 (10. Januar 1990)',
        '1979',
        '1998',
        '1984'
      ],
      exp: 'Ursprünglich war der Erstflug für Frühjahr 1989 geplant, verzögerte sich aber um mehrere Monate bis Januar 1990.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'easy',
      q: 'Gegen welche zwei direkten zeitgenössischen Großraumflugzeuge (Markteintritt frühe 1990er) musste sich die MD-11 am Markt behaupten?',
      a: [
        'Airbus A340 (bzw. A330) und Boeing 777',
        'Concorde und Tupolew Tu-144',
        'Airbus A380 und Boeing 787',
        'Boeing 737 und Airbus A320'
      ],
      exp: 'Während A340 mit vier und B777 mit zwei modernen Triebwerken genau pünktlich mit ihren Reichweiten- und Verbrauchszielen lieferten, kämpfte die MD-11 anfangs gegen ein Reichweitendefizit.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'easy',
      q: 'Wie lautete ein bekannter, respektvoller wie auch warnender Spitzname von Piloten und Bodenpersonal für die MD-11 wegen ihres anspruchsvollen Handlings?',
      a: [
        '„Die Diva“ (oder auch „Mad Dog 11“)',
        '„Der fliegende Traktor“',
        '„Das Segelflugzeug“',
        '„Der Baby-Bus“'
      ],
      exp: 'Sie verzeiht keine Schludrigkeit bei Geschwindigkeit und Pitch im Landeanflug – wer sie aber beherrscht und schätzt, bezeichnet sie ehrfürchtig als elegante „Diva“.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'easy',
      q: 'Welches folgenschwere Unglück von September 1998 vor der Küste Nova Scotias (Kanada) führte zu weltweiten Verschärfungen bei Bord-Isoliermaterialien und Entertainment-Verkabelung in der gesamten Luftfahrt?',
      a: [
        'Swissair-Flug 111 (HB-IWF)',
        'Lufthansa-Cargo-Flug 8460',
        'FedEx-Flug 80',
        'Alitalia-Flug 404'
      ],
      exp: 'Ein versteckter Schwelbrand oberhalb des Cockpits (Entzündung metallisierter Mylar-Isolierung durch einen Lichtbogen im IFEN-Kabelstrang) führte zur weltweiten Verbannung brennbarer PET-Mylar-Folien.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'easy',
      q: 'In welchem Monat und Jahr fand der allerletzte kommerzielle Linien-Einsatz einer europäischen MD-11 im Liniendienst bei Lufthansa Cargo statt?',
      a: [
        'Oktober 2021 (17. Oktober 2021, Landung D-ALCC in Frankfurt)',
        'Dezember 2005',
        'Juni 2012',
        'Januar 2018'
      ],
      exp: 'Damit endeten nach mehr als 23 Dienstjahren bei Lufthansa Cargo die letzten Einsätze dieses Typs unter einer europäischen Flagge; heute fliegen nur noch US-Frachter.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'mid',
      q: 'Warum verpasste die MD-11 bei der Auslieferung 1990/1991 zunächst ihre garantierten Reichweiten- und Verbrauchswerte um mehrere Prozent (was u. a. Singapore Airlines dazu bewog, ihre Order zu stornieren)?',
      a: [
        'Das Flugzeug wog etwas mehr als berechnet, während Rumpf-/Flügel-Widerstand und Triebwerksverbrauch schlechter als versprochen ausfielen („Range Shortfall“)',
        'Weil vergessen wurde, einen Kerosintank im rechten Flügel einzubauen',
        'Weil die FAA sie nur für Flüge unter 500 Kilometern zuließ',
        'Weil Winglets die Reichweite damals halbiert haben'
      ],
      exp: 'Singapore Airlines wechselte stattdessen spektakulär zum Airbus A340 (später Boeing 777), obwohl McDonnell Douglas über das PIP-Programm bis 1995 die meisten fehlenden Kilometer wieder aufholte.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'mid',
      q: 'Welche gefährliche Verkettung bei harter Landung trat bei mehreren bekannten MD-11-Frachterunfällen auf (z. B. FedEx 14 in Newark 1997, FedEx 80 in Narita 2009, LH Cargo 8460 in Riad 2010)?',
      a: [
        '„Hard Bounce“ (Abprallen beim Aufsetzen), gefolgt von zu spätem/falschem Nachdrücken bzw. Bugrad-zuerst-Aufprall, Spoiler-Entfaltung in der Luft und Überlastung einer Tragfläche/des Rumpfes',
        'Vollständiger Ausfall aller drei Triebwerke gleichzeitig beim Ausfahren des Fahrwerks',
        'Aufspringen der hinteren Frachttür in 10.000 Metern Höhe',
        'Abknicken beider Winglets durch Seitenwind vor dem Aufsetzen'
      ],
      exp: 'Die tragischen „Bounced Landing“-Unfälle zeigten, dass man bei der MD-11 auf keinen Fall versuchen darf, eine abgesprungene Landung gewaltsam zu retten – einzig ein sofortiges konsequentes Durchstarten (Go-Around) rettet zuverlässig.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'mid',
      q: 'Welches konkrete Ergebnis aus der Untersuchung von Swissair-Flug 111 veränderte den Umgang mit Rauch im Cockpit („Smoke, Fire or Fumes“) bei Piloten weltweit?',
      a: [
        'Bei unklarem Rauchgeruch oder Schwelbrand gilt heute sofortiges kompromissloses Ausleiten eines schnellen Sinkflugs / Notlandung statt langem Abarbeiten nicht-dringender Checklisten (wie Treibstoffablass vorab)',
        'Piloten sollen die Sauerstoffmasken grundsätzlich absetzen, um besser zu riechen',
        'Vor jeder Notlandung muss erst die ganze Bordküche abgebaut werden',
        'Kabinenlicht wird bei Rauch auf maximale Helligkeit gestellt'
      ],
      exp: 'Die kanadische Behörde TSB betonte, dass ein Feuer an Bord binnen weniger Minuten unbeherrschbar werden kann – Zeitverlust durch weite Schleifen oder langes Checklisten-Suchen kann tödlich sein.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'mid',
      q: 'Warum spielte bei der Untersuchung von Mandarin-Airlines-/China-Airlines-Flug 642 in Hongkong (Taifun Sam, August 1999) und weiteren MD-11-Landungen die Anfluggeschwindigkeit und „Sinkrate“ eine Schlüsselrolle?',
      a: [
        'Durch die sehr hohe Energie und ein Abfangen zu spät bzw. zu geringe Schubführung im schweren Seitenwind schlug ein Flügel zu hart auf und riss ab',
        'Weil der Autopilot während des Taifuns automatisch den Umkehrschub in 5.000 ft Höhe aktivierte',
        'Weil die Tragflächen aus Stoff bestanden',
        'Weil eine DC-10-Tragfläche montiert worden war'
      ],
      exp: 'Flug 642 überschlug sich brennend auf dem Rücken – erstaunlicherweise überlebten dank intakter Rumpfzelle fast alle Menschen an Bord (312 von 315).'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'mid',
      q: 'Welches Programm startete Boeing nach mehreren Landezwischenfällen in den 2000er/2010er Jahren speziell für alle aktiven MD-11-Betreiber (Hardware + Simulator)?',
      a: [
        'Verbesserte LSAS-Software zur stärkeren Pitch-Dämpfung in Bodennähe, veränderte Spoiler-Logik/Trainings sowie verbindliches Bounce-Recovery-/Go-Around-Training',
        'Abbau des Bugfahrwerks bei allen Maschinen',
        'Einbau von drei Bremsfallschirmen im Heckkonus',
        'Pflichtlandung ausschließlich auf dem Wasser'
      ],
      exp: 'Dazu kamen verschärfte Hinweise für Flugbesatzungen: Ein Abfeder-Stoß (Bounce) nach hartem Aufsetzen verlangt kein Herunterdrücken der Nase, sondern ruhiges Halten des Nickwinkels (~7,5°) und sofortiges Durchstarten!'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'mid',
      q: 'Welche Rolle spielte das „McDonnell Douglas MD-12“-Konzept Anfang der 1990er Jahre als geplanter Nachfolger der MD-11?',
      a: [
        'Erst ein gestreckter Trijet, dann ein spektakuläres doppelstöckiges Vierstrahler-Projekt gegen die Boeing 747 – das mangels Kundenorders und Finanzkraft jedoch nie gebaut wurde',
        'Es wurde 400-mal gebaut und heißt heute Airbus A350',
        'Es war eine militärische Überschallversion der MD-11',
        'Es wurde zur DC-3 umgebaut'
      ],
      exp: 'Das Doppeldecker-Design der MD-12 nahm optisch schon in Teilen die Dimensionen des späteren Airbus A380 vorweg – Douglas fehlten jedoch die Milliarden für die Umsetzung.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'mid',
      q: 'Welchen entscheidenden Sicherheitserfolg erzielte die strukturell verwandte DC-10-Erfahrung bei der MD-11 im Vergleich zum berüchtigten DC-10-Unfall von Sioux City 1989 (United 232)?',
      a: [
        'Alle MD-11 erhielten ab Werk hydraulische Absperrventile („Hydraulic Fuse“) im Bereich des Hecktriebwerks Nr. 2, sodass eine beschädigte Heckleitung nie alle drei Hydrauliksysteme gleichzeitig leeren kann',
        'Das Triebwerk Nr. 2 hat in der MD-11 gar keine rotierenden Scheiben mehr',
        'Alle Steuerflächen werden bei der MD-11 durch Dampfdruck bewegt',
        'Es wurden vier komplett identische Seitenleitwerke montiert'
      ],
      exp: 'Die bittere Lehre aus United 232 (Totalverlust aller drei Hydrauliksysteme nach uncontained Rotorburst im Heck) floss direkt in die Zertifizierungsvorschriften der MD-11 ein.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'mid',
      q: 'Wie endete der Zwischenfall von Lufthansa-Cargo-Flug 8460 im Juli 2010 in Riad (Saudi-Arabien) für die beiden Piloten an Bord der „D-ALCQ“?',
      a: [
        'Nach einem schweren Bounce-Landeschlag brach der Rumpf hinter den Flügeln auf und brannte aus – beide Piloten überlebten jedoch und verließen die Maschine über die Cockpitfenster/Seile',
        'Die Maschine rollte unbeschädigt ans Gate und flog am nächsten Tag weiter',
        'Sie stürzte bereits im Atlantik ab',
        'Alle Frachtcontainer fielen im Reiseflug durch den Boden'
      ],
      exp: 'Trotz des dramatischen Bruchs der Rumpfzelle beim Aufschlag schützten die Notfallprozeduren und das Fluchtseil-System des Cockpits das Leben beider Besatzungsmitglieder.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'mid',
      q: 'Welche frühe Passagier-Innovation führte McDonnell Douglas bei einigen MD-11-Kabinenkonfigurationen sogar mit Blick auf maximale Flexibilität im Unterdeck ein?',
      a: [
        'Optionale „Lower Deck Panorama Lounges“ / Bordküchen oder Crew-Rest-Module (wie bei Swissair/LTU im Frachtraum-Containerformat einsetzbar)',
        'Einen unterirdischen Swimmingpool für Business-Passagiere',
        'Glasscheiben im Frachtraumboden zur Erdbeobachtung',
        'Einen offenen Balkon am Seitenleitwerk'
      ],
      exp: 'Besonders die Crew Rest Compartments im vorderen Unterdeck oder Oberdeck-Module ermöglichten lange Nonstop-Flüge über 13 Stunden mit voller Wechselbesatzung.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'pro',
      q: 'Welcher schwerwiegende LSAS-/Autopilot-Zwischenfall über dem Nordpazifik im April 1993 („China Eastern Flight 583“) deckte ein problematisches Detail bei der Vorflügel-Bedienung („Slats Handle“) in der MD-11 auf?',
      a: [
        'Ein versehentliches Ausfahren der Slats im Reiseflug löste heftige Nick-Oszillationen mit mehreren hohen positiven und negativen G-Sprüngen aus – Douglas verbesserte daraufhin Hebelschutz („Slat Handle Guard“) und Steuerkraftgrenzen im LSAS',
        'Der Pilot drückte auf den Schleudersitzknopf',
        'Alle sechs Displays gingen bei Vollmond aus',
        'Der Autopilot stellte automatisch auf Rückenflug um'
      ],
      exp: 'Eine versehentliche Betätigung des ungeschützten Klappen-/Vorflügelhebels durch einen Piloten in Reiseflughöhe verursachte extreme Nickbewegungen; Nachrüstungen verriegelten den Hebel fortan sicher.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'pro',
      q: 'Welches Problem entdeckte man Mitte der 1990er beim „LSAS Pitch Trim“-Verhalten bei starkem Gewicht und bestimmten Geschwindigkeitsprofilen, das Piloten auf Langstrecken zusätzlich forderte?',
      a: [
        'Wegen des stark nach hinten verlagerten Schwerpunkts („Aft CG“) reagierte die kleine Höhenflosse empfindlicher auf ungenau gesetzte Trimms und Turbulenzen als frühere Schwergewichte',
        'Das Seitenruder blockierte immer bei exakt Mach 0,80',
        'Der Flügel klappte bei Gegenwind um 15 Grad ein',
        'Alle drei Triebwerke verloren oberhalb von FL350 gleichzeitig Strom'
      ],
      exp: 'Moderne Software-Revisionen der Flight Control Computer (FCC) machten das Zusammenspiel von Pitch Attitude Hold, Yaw Damper und Aft-CG-Fuel-Management deutlich ruhiger.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'pro',
      q: 'Welche besondere Rolle spielte die umgebaute MD-11 („MD-11 PCA“ – Propulsion Controlled Aircraft) in einem berühmten NASA-Forschungsprogramm Mitte der 1990er Jahre (Edwards AFB)?',
      a: [
        'NASA landete 1995/96 erstmals ein großes Passagierflugzeug komplett OHNE Verwendung jeglicher Steuerflächen – rein durch Software-gesteuerte unterschiedliche Schubgebung der drei MD-11-Triebwerke!',
        'Die NASA baute ein großes Space Shuttle auf den Rücken der MD-11',
        'Man testete einen reinen Solarzellen-Flügel auf der MD-11',
        'Die NASA nutzte sie als Überschall-Zielschlepper'
      ],
      exp: 'Inspiriert von United 232 (Sioux City) bewies die NASA an einer MD-11, dass präzise computergesteuerte Schubdifferenzen der beiden Flügel- und des Hecktriebwerks für Notlandungen ohne Hydraulik ausreichen können.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'pro',
      q: 'Welchen ungewöhnlichen Weg ging FedEx beim Versuch der Weiterverwendung bzw. beim Ersetzen der MD-11F-Flotte in den 2020er Jahren?',
      a: [
        'FedEx schob die geplante komplette Ausmusterung mehrmals hinaus (mittlerweile bis ca. 2028/2032), ersetzt sie schrittweise vor allem durch die sparsamere Boeing 767-300F und Boeing 777F',
        'FedEx bestellt ab 2026 wieder 100 neue MD-11F in Kalifornien',
        'FedEx rüstet alle MD-11F auf Wasserstoff-Luftschiffe um',
        'FedEx verkaufte alle MD-11F 2015 an KLM'
      ],
      exp: 'Obwohl die Boeing 777F weit sparsamer fliegt, bleiben abgeschriebene MD-11F als Spitzenlast-Reserve („Peak Season / Express Backbone“) für FedEx und UPS vorerst noch extrem nützlich.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'pro',
      q: 'Wie viele der ursprünglich gebauten 200 MD-11-Flugzeuge gingen im Zeitraum seit 1990 durch Totalverluste („Hull Losses“) verloren?',
      a: [
        '10 Maschinen insgesamt (eine im Vergleich überproportional hohe Rate in frühen Fracht- und Passagier-Landejahren, meist durch Landeunfälle oder Brand)',
        'Über 95 Maschinen',
        'Genau null Totalverluste jemals',
        '52 Maschinen'
      ],
      exp: 'Gerade wegen mehrerer spektakulärer Landeunfälle (FedEx 14/80, China Airlines 642, LH Cargo 8460, Korean Air 6316) plus Swissair 111 haftete der MD-11 lange ein ambivalentes Statistik-Bild an.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'pro',
      q: 'Wieso gilt die Verabschiedung der MD-11 trotz ihrer Nachteile bei Wirtschaftlichkeit bis heute vielen Piloten und Technikern als Verlust eines echten „Piloten-Flugzeugs“?',
      a: [
        'Wegen ihrer gewaltigen Steigleistung, hohen Reisegeschwindigkeit bis Mach 0,88, klassischen Steuerhörnern statt Computer-Schutzschranken und ihres unvergleichlichen Trijet-Layouts',
        'Weil sie als einziges Flugzeug im Rückwärtsgang starten konnte',
        'Weil man während des Flugs die Seitenfenster öffnen durfte',
        'Weil sie mit Benzin aus jeder Tankstelle flog'
      ],
      exp: 'Unter Cargo-Piloten in Louisville, Memphis oder ehemals Frankfurt genießt die anspruchsvolle MD-11 genau deshalb fast Kultstatus.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'pro',
      q: 'Welche Luftfahrtbehörde stellte das weltweite Musterzulassungs-Zertifikat („Type Certificate“) für die McDonnell Douglas MD-11 im November 1990 offiziell aus?',
      a: [
        'Die US-Luftfahrtbehörde FAA (Federal Aviation Administration) am 8. November 1990',
        'Die europäische EASA bereits im Jahr 1986',
        'Die britische CAA für Großbritannien allein',
        'Die ICAO in Montreal'
      ],
      exp: 'Die FAA erteilte das Type Certificate A22WE (als Weiterentwicklung des DC-10-Zertifikats!), die europäische JAA folgte im Jahr 1991.'
    },
    {
      cat: 'historie_sicherheit',
      diff: 'pro',
      q: 'Welchen wichtigen Aspekt prüften Ermittler beim Absturz von Korean-Air-Cargo-Flug 6316 nahe Shanghai im Jahr 1999 neben technischen MD-11-Eigenschaften?',
      a: [
        'Ein tödliches Kommunikations- und Einheiten-Missverständnis zwischen Metern (chinesische Flugsicherung: 1.500 m) und Fuß im Cockpit (Annahme 1.500 ft statt ~4.900 ft, worauf der Kapitän abrupt zu stark abdrückte)',
        'Ein Versagen des mittleren Triebwerks durch Vulkansand',
        'Eine Kollision mit einem Satelliten in FL410',
        'Einen komplett leeren Kerosintank schon beim Start'
      ],
      exp: 'Dieses Unglück verdeutlichte die Gefahren von Fuß/Meter-Verwechslungen im internationalen Luftraum (seitdem nutzen chinesische Fluglotsen im Funk heute explizit Meter-Anweisungen plus klare Höhencheck-Tabellen im Cockpit).'
    }
  ];

  ArcadeQuizEngine.registerBank('md11', DATA);
})();
