// Unified quiz bank for "politics" (75 questions: Politik & Ökonomie)
(function () {
  const DATA = [
  {
    "cat": "baader",
    "diff": "easy",
    "q": "Was schafft laut Roland Baader und der klassischen Schule nachhaltig gesellschaftlichen Wohlstand?",
    "a": [
      "Ersparnisse, Innovation und produktive Kapitalbildung im Wettbewerb",
      "Stetig steigende staatliche Umverteilung und höhere Steuerquoten",
      "Das ungebremste Drucken von ungedecktem Fiat-Papiergeld durch Zentralbanken",
      "Umfassende staatliche Preisfestlegungen für alle Konsumgüter"
    ],
    "explanation": "Nach Baader entsteht Wohlstand durch Sparen, Investitionen in Werkzeuge und Wertschöpfung am freien Markt – nicht durch staatliche Geldschöpfung.",
    "exp": "Nach Baader entsteht Wohlstand durch Sparen, Investitionen in Werkzeuge und Wertschöpfung am freien Markt – nicht durch staatliche Geldschöpfung."
  },
  {
    "cat": "baader",
    "diff": "easy",
    "q": "Welchen prägnanten Buchtitel wählte Roland Baader für sein Werk über ungedecktes Papiergeld und staatliche Notenbanken?",
    "a": [
      "Geldsozialismus",
      "Finanzfeudalismus",
      "Kreditkapitalismus",
      "Staatskollektivismus"
    ],
    "explanation": "In 'Geldsozialismus' kritisierte Baader das staatliche Geldmonopol als Kernursache für inflationäre Zyklen und die Entwertung der Ersparnisse.",
    "exp": "In 'Geldsozialismus' kritisierte Baader das staatliche Geldmonopol als Kernursache für inflationäre Zyklen und die Entwertung der Ersparnisse."
  },
  {
    "cat": "baader",
    "diff": "easy",
    "q": "Welcher weltberühmte Wirtschaftsnobelpreisträger und Freiburger Ökonom war der akademische Lehrer von Roland Baader?",
    "a": [
      "Friedrich August von Hayek",
      "John Maynard Keynes",
      "Paul Samuelson",
      "Milton Friedman"
    ],
    "explanation": "Baader studierte Volkswirtschaftslehre an der Universität Freiburg als direkter akademischer Schüler von F. A. von Hayek.",
    "exp": "Baader studierte Volkswirtschaftslehre an der Universität Freiburg als direkter akademischer Schüler von F. A. von Hayek."
  },
  {
    "cat": "baader",
    "diff": "easy",
    "q": "Was versteht Roland Baader unter dem Begriff 'Die Wohlfahrtsillusion'?",
    "a": [
      "Den Irrglauben, dass der Staat Wohlstand aus dem Nichts verschenken könne",
      "Die Annahme, dass private Versicherungen jede Lebenskrise lösen können",
      "Die Vorstellung, dass Sparguthaben automatisch von Zinsen leben",
      "Die Idee, dass Maschinen die menschliche Arbeit komplett ersetzen"
    ],
    "explanation": "Der Staat kann den Bürgern nur das geben, was er ihnen zuvor durch Steuern, Abgaben oder Inflation entzogen hat.",
    "exp": "Der Staat kann den Bürgern nur das geben, was er ihnen zuvor durch Steuern, Abgaben oder Inflation entzogen hat."
  },
  {
    "cat": "baader",
    "diff": "easy",
    "q": "Welches fundamentale Recht sah Roland Baader als das unverzichtbare Fundament aller bürgerlichen Freiheiten an?",
    "a": [
      "Das uneingeschränkte Recht auf Privateigentum",
      "Das Recht auf staatliche Mindestpreise",
      "Das Vorrecht auf subventionierte Wohnungen",
      "Das Privileg auf gebührenfreie Universitäten"
    ],
    "explanation": "Ohne geschütztes Privateigentum an den eigenen Arbeitsmitteln und Erträgen verliert der Einzelne seine wirtschaftliche und persönliche Unabhängigkeit.",
    "exp": "Ohne geschütztes Privateigentum an den eigenen Arbeitsmitteln und Erträgen verliert der Einzelne seine wirtschaftliche und persönliche Unabhängigkeit."
  },
  {
    "cat": "baader",
    "diff": "easy",
    "q": "Wie bezeichnete Roland Baader in seinem Buch 'Kreide für den Wolf' die Rhetorik moderner Umverteilungspolitik?",
    "a": [
      "Als moralisch getarnte Ausweitung staatlicher Macht auf Kosten der Bürger",
      "Als wissenschaftlich bewiesenes Naturgesetz für ewigen Frieden",
      "Als unvermeidliche Konsequenz des weltweiten Goldstandards",
      "Als reine Satire ohne jeden Einfluss auf reale Gesetze"
    ],
    "explanation": "Mit Anleihen an das Märchen vom Wolf warnt Baader davor, dass wohlklingende Versprechen von Gerechtigkeit oft zur Entrechtung führen.",
    "exp": "Mit Anleihen an das Märchen vom Wolf warnt Baader davor, dass wohlklingende Versprechen von Gerechtigkeit oft zur Entrechtung führen."
  },
  {
    "cat": "baader",
    "diff": "mid",
    "q": "Warum führt eine permanente Papiergeldvermehrung laut Baader unausweichlich zu einer 'schleichenden Enteignung'?",
    "a": [
      "Weil zusätzliches Geld ohne Güterzuwachs die Kaufkraft jeder existierenden Währungseinheit mindert",
      "Weil Banknoten nach fünf Jahren automatisch ihre gesetzliche Gültigkeit verlieren",
      "Weil die Bürger ihr Geld aus Angst vor Entwertung im Ausland verbrennen",
      "Weil der Staat jede neu gedruckte Banknote mit einer Sondersteuer belegt"
    ],
    "explanation": "Inflation wirkt wie eine verdeckte Steuer: Sparer verlieren unbemerkt Kaufkraft, während Erstempfänger des neuen Geldes profitieren.",
    "exp": "Inflation wirkt wie eine verdeckte Steuer: Sparer verlieren unbemerkt Kaufkraft, während Erstempfänger des neuen Geldes profitieren."
  },
  {
    "cat": "baader",
    "diff": "mid",
    "q": "Was kritisierte Baader an der modernen Staatsverschuldung aus ethischer und generationenübergreifender Sicht?",
    "a": [
      "Sie verlagert heutige Konsumausgaben als Zins- und Steuerlasten auf künftige Generationen",
      "Sie zwingt Banken dazu, ausschließlich ausländische Goldbarren zu lagern",
      "Sie senkt die Gehälter von Politikern und Beamten auf gesetzliche Minima",
      "Sie verbietet privaten Unternehmen die Aufnahme von Krediten im Inland"
    ],
    "explanation": "Schuldenfinanzierte Staatsausgaben werden von Generationen konsumiert, die noch gar nicht geboren sind, aber die Schuldenlast tilgen müssen.",
    "exp": "Schuldenfinanzierte Staatsausgaben werden von Generationen konsumiert, die noch gar nicht geboren sind, aber die Schuldenlast tilgen müssen."
  },
  {
    "cat": "baader",
    "diff": "mid",
    "q": "Welche Haltung vertrat Roland Baader gegenüber zentral gesteuerten Mindestlöhnen?",
    "a": [
      "Er sah darin ein Einstiegshindernis für Geringqualifizierte und eine Ursache für Arbeitslosigkeit",
      "Er forderte deren monatliche Verdoppelung durch ein Bundesarbeitsamt",
      "Er hielt sie für die beste Methode zur Bekämpfung von Inflation",
      "Er empfahl Mindestlöhne ausschließlich für Staatsbedienstete"
    ],
    "explanation": "Liegt der staatliche Mindestlohn über der Produktivität eines Bewerbers, wird die Stelle nicht geschaffen – der Betroffene bleibt arbeitslos.",
    "exp": "Liegt der staatliche Mindestlohn über der Produktivität eines Bewerbers, wird die Stelle nicht geschaffen – der Betroffene bleibt arbeitslos."
  },
  {
    "cat": "baader",
    "diff": "mid",
    "q": "In welchem seiner Werke setzte sich Baader intensiv mit den philosophischen Irrtümern des Kollektivismus auseinander?",
    "a": [
      "Totgedacht – Warum der Geist des Sozialismus weiterlebt",
      "Der Weg zur Vollbeschäftigung",
      "Kaufkraft für alle Zeiten",
      "Das staatliche Paradies"
    ],
    "explanation": "In 'Totgedacht' analysiert Baader, warum staatsgläubige Denkmuster trotz des Scheiterns der Planwirtschaften in den Köpfen weiterwirken.",
    "exp": "In 'Totgedacht' analysiert Baader, warum staatsgläubige Denkmuster trotz des Scheiterns der Planwirtschaften in den Köpfen weiterwirken."
  },
  {
    "cat": "baader",
    "diff": "mid",
    "q": "Was meinte Baader mit dem Aphorismus 'Freiheit stirbt immer zentimeterweise'?",
    "a": [
      "Dass Freiheitsverluste schleichend durch immer neue bürokratische Regulierungen erfolgen",
      "Dass Grundgesetze alle 100 Jahre um wenige Zentimeter gekürzt werden",
      "Dass Grenzpfähle zwischen Nationen jedes Jahr verschoben werden",
      "Dass Gefängniszellen im Lauf der Zeit schrittweise verkleinert werden"
    ],
    "explanation": "Kaum jemand würde einer plötzlichen Diktatur zustimmen; doch schrittweise Verbote und Überwachungsgesetze gewöhnen die Bürger an Unfreiheit.",
    "exp": "Kaum jemand würde einer plötzlichen Diktatur zustimmen; doch schrittweise Verbote und Überwachungsgesetze gewöhnen die Bürger an Unfreiheit."
  },
  {
    "cat": "baader",
    "diff": "mid",
    "q": "Welche Gefahr sah Roland Baader in der stetig wachsenden Staatsquote in westlichen Demokratien?",
    "a": [
      "Dass der Staat zum dominierenden Wirtschaftsakteur wird und Eigenverantwortung erstickt",
      "Dass Unternehmen vor lauter Gewinnen keine neuen Mitarbeiter finden",
      "Dass private Ersparnisse unbegrenzt in physisches Gold fließen",
      "Dass die Universitäten alle wirtschaftswissenschaftlichen Fakultäten schließen"
    ],
    "explanation": "Übersteigt die Staatsquote 50 Prozent, entscheidet nicht mehr der Markt über die Verwendung der Ressourcen, sondern die politische Bürokratie.",
    "exp": "Übersteigt die Staatsquote 50 Prozent, entscheidet nicht mehr der Markt über die Verwendung der Ressourcen, sondern die politische Bürokratie."
  },
  {
    "cat": "baader",
    "diff": "mid",
    "q": "Wie beurteilte Roland Baader das Konzept eines staatlichen 'Bedingungslosen Grundeinkommens'?",
    "a": [
      "Als finanzpolitische Utopie, die die Leistungsbereitschaft lähmt und totale Staatsabhängigkeit schafft",
      "Als genialen Rettungsanker für den Erhalt der freien Marktwirtschaft",
      "Als notwendige Maßnahme zur Abschaffung aller privaten Betriebe",
      "Als Erfindung der Österreichischen Schule zur Begrenzung von Inflation"
    ],
    "explanation": "Ein Grundeinkommen entkoppelt Einkommen von Leistung und macht die Bürger zu Bittstellern, die auf das Wohlwollen der Politik angewiesen sind.",
    "exp": "Ein Grundeinkommen entkoppelt Einkommen von Leistung und macht die Bürger zu Bittstellern, die auf das Wohlwollen der Politik angewiesen sind."
  },
  {
    "cat": "baader",
    "diff": "mid",
    "q": "Welche Institution betrachtete Roland Baader als das mächtigste Werkzeug moderner Staaten zur Umverteilung?",
    "a": [
      "Die Zentralbanken mit ihrem unbeschränkten Privileg zur Geldschöpfung",
      "Die Handwerkskammern mit ihren Meisterprüfungen",
      "Die privaten Notariate für Grundstückskäufe",
      "Die städtischen Bauämter bei Bebauungsplänen"
    ],
    "explanation": "Zentralbanken ermöglichen es Staaten, Ausgaben über die Notenpresse zu finanzieren, ohne die Wähler direkt mit Steuererhöhungen zu konfrontieren.",
    "exp": "Zentralbanken ermöglichen es Staaten, Ausgaben über die Notenpresse zu finanzieren, ohne die Wähler direkt mit Steuererhöhungen zu konfrontieren."
  },
  {
    "cat": "baader",
    "diff": "pro",
    "q": "Was meinte Baader mit dem Begriff 'Fauler Zauber' in Bezug auf die keynesianische Konjunkturpolitik?",
    "a": [
      "Die Illusion, dass schuldenfinanzierter Staatskonsum echtes, nachhaltiges Wachstum erzeugen könne",
      "Die betrügerische Manipulation von Firmenbilanzen durch private Wirtschaftsprüfer",
      "Das Verstecken von Bargeldbeständen vor dem Finanzamt in Offshore-Konten",
      "Den Glauben an mathematische Horoskope bei Börsenspekulationen"
    ],
    "explanation": "Staatliche Konjunkturpakete lenken Kapital in unrentable Prestige- und Scheinprojekte, statt produktive Investitionen zu ermöglichen.",
    "exp": "Staatliche Konjunkturpakete lenken Kapital in unrentable Prestige- und Scheinprojekte, statt produktive Investitionen zu ermöglichen."
  },
  {
    "cat": "baader",
    "diff": "pro",
    "q": "Warum bezeichnete Roland Baader das Papiergeldsystem als 'moralisch korrumpierend' für die Gesellschaft?",
    "a": [
      "Weil es Spekulation und Schuldenmachen belohnt, während ehrliches Sparen und Fleiß bestraft werden",
      "Weil Papiergeld aus giftigen chemischen Fasern hergestellt wird",
      "Weil dadurch alle Kirchen und Wohltätigkeitsvereine pleitegehen",
      "Weil Geldscheine leichter gefälscht werden können als Goldmünzen"
    ],
    "explanation": "In einer inflationären Welt gewinnt der verschuldete Zocker, während der vorsorgende Bürger, der spart und Werte aufbaut, real verarmt.",
    "exp": "In einer inflationären Welt gewinnt der verschuldete Zocker, während der vorsorgende Bürger, der spart und Werte aufbaut, real verarmt."
  },
  {
    "cat": "baader",
    "diff": "pro",
    "q": "Welches Buch widmete Roland Baader der Kritik an staatlichen Erziehungs- und Schulmonopolen?",
    "a": [
      "Fauler Zauber – Schein und Wirklichkeit des Sozialstaates",
      "Freiheit für die Kinder",
      "Die Schulverschwörung",
      "Das Buch der Zensur"
    ],
    "explanation": "Baader kritisierte das staatliche Schulmonopol als Instrument zur Heranziehung staatsfrommer und steuerwilliger Untertanen.",
    "exp": "Baader kritisierte das staatliche Schulmonopol als Instrument zur Heranziehung staatsfrommer und steuerwilliger Untertanen."
  },
  {
    "cat": "baader",
    "diff": "pro",
    "q": "Welcher historische Denker der schottischen Aufklärung beeinflusste Baaders Menschenbild neben Mises am stärksten?",
    "a": [
      "Adam Smith (mit der Theorie der unsichtbaren Hand)",
      "Jean-Jacques Rousseau",
      "Thomas Hobbes",
      "Karl Marx"
    ],
    "explanation": "Smiths Einsicht, dass das freie Streben des Einzelnen zum Wohle aller führt, bildete das Fundament von Baaders Gesellschaftsphilosophie.",
    "exp": "Smiths Einsicht, dass das freie Streben des Einzelnen zum Wohle aller führt, bildete das Fundament von Baaders Gesellschaftsphilosophie."
  },
  {
    "cat": "baader",
    "diff": "pro",
    "q": "Was verstand Baader unter dem Begriff 'Die Schlafwandler-Demokratie'?",
    "a": [
      "Die schleichende Umwandlung der Freiheit in einen Betreuungsstaat bei passiver Hinnahme durch die Wähler",
      "Ein Wahlsystem, bei dem die Bürger nachts im Schlaf per Computer abstimmen",
      "Eine Regierungsform, in der Politiker keine Gehaltszahlungen erhalten",
      "Ein Parlament, das ausschließlich bei Neumond tagt"
    ],
    "explanation": "Bürger wiegen sich in Scheinsicherheit, während Bürokratie und Staatsgewalt Tag für Tag ihre Handlungsspielräume verengen.",
    "exp": "Bürger wiegen sich in Scheinsicherheit, während Bürokratie und Staatsgewalt Tag für Tag ihre Handlungsspielräume verengen."
  },
  {
    "cat": "baader",
    "diff": "pro",
    "q": "Warum sah Baader in der Währungsunion des Euro eine Fehlkonstruktion von Beginn an?",
    "a": [
      "Weil eine einheitliche Notenbank unterschiedliche Wirtschaftskulturen zur Haftungsgemeinschaft und Inflationsunion zwingt",
      "Weil der Euro im internationalen Zahlungsverkehr keine US-Dollar wechseln durfte",
      "Weil Goldbarren laut Euro-Vertrag nicht mehr privat besessen werden durften",
      "Weil der Euro ausschließlich als Buchgeld ohne Bargeld geplant war"
    ],
    "explanation": "Ohne nationale Wechselkurse als Ventil führt die Einheitswährung zu permanenter Umverteilung von stabilitätsorientierten zu defizitären Staaten.",
    "exp": "Ohne nationale Wechselkurse als Ventil führt die Einheitswährung zu permanenter Umverteilung von stabilitätsorientierten zu defizitären Staaten."
  },
  {
    "cat": "baader",
    "diff": "pro",
    "q": "Welche Rolle spielen freie Marktpreise laut Baader für die Koordination von Millionen Menschen?",
    "a": [
      "Preise sind unersetzliche Signale über Knappheiten, die kein Zentralplaner jemals kennen oder ersetzen kann",
      "Preise dienen lediglich dazu, Gewinne für internationale Großkonzerne zu maximieren",
      "Preise sollten alle drei Monate von einer Expertenkommission neu festgelegt werden",
      "Preise entstehen rein zufällig durch Stimmungen an den Terminbörsen"
    ],
    "explanation": "Preise bündeln das dezentrale Wissen von Millionen Konsumenten und Produzenten und lenken Ressourcen dorthin, wo sie am dringendsten gebraucht werden.",
    "exp": "Preise bündeln das dezentrale Wissen von Millionen Konsumenten und Produzenten und lenken Ressourcen dorthin, wo sie am dringendsten gebraucht werden."
  },
  {
    "cat": "baader",
    "diff": "pro",
    "q": "Wie stand Roland Baader zu den sogenannten 'Rettungsschirmen' (ESM, EFSF) während der europäischen Staatsschuldenkrise?",
    "a": [
      "Er lehnte sie radikal als Rechtsbruch und Belohnung für unsolide Haushaltspolitik (Moral Hazard) ab",
      "Er forderte ihre Verzehnfachung und die Ausgabe unbegrenzter Eurobonds",
      "Er empfahl die Verstaatlichung aller europäischen Sparkassen durch den ESM",
      "Er sah darin ein vorbildliches Modell für private Versicherungsvereine"
    ],
    "explanation": "Wer Risiken vergesellschaftet und Gläubiger vor Verlusten rettet, setzt fatale Anreize zu noch mehr Schulden und Fehlinvestitionen.",
    "exp": "Wer Risiken vergesellschaftet und Gläubiger vor Verlusten rettet, setzt fatale Anreize zu noch mehr Schulden und Fehlinvestitionen."
  },
  {
    "cat": "baader",
    "diff": "pro",
    "q": "Welche Bedeutung maß Roland Baader dem Föderalismus und der Kleinstaaterei für die Bürgerfreiheit bei?",
    "a": [
      "Kleinstaaten stehen im Steuer- und Rechtswettbewerb, was staatliche Tyrannei und Übergriffe wirksam zügelt",
      "Kleinstaaten führen laut Baader unausweichlich zu weltweiter Hungersnot",
      "Er forderte stattdessen eine mächtige Weltregierung mit einheitlicher Weltsteuer",
      "Kleinstaaten sollten sich laut Baader sofort einem atomaren Großreich anschließen"
    ],
    "explanation": "Wenn Bürger und Unternehmen leicht in den Nachbarkanton oder Nachbarstaat abwandern können, muss sich der Herrscher mäßigen.",
    "exp": "Wenn Bürger und Unternehmen leicht in den Nachbarkanton oder Nachbarstaat abwandern können, muss sich der Herrscher mäßigen."
  },
  {
    "cat": "baader",
    "diff": "pro",
    "q": "Was war Baaders Kernargument gegen progressive Einkommensteuertarife?",
    "a": [
      "Sie bestrafen Fleiß und Leistungsbereitschaft und verletzen das Prinzip der Gleichheit vor dem Gesetz",
      "Sie führen dazu, dass Reiche überhaupt keine Steuern mehr bezahlen",
      "Sie machen mathematische Taschenrechner in Finanzämtern überflüssig",
      "Sie wurden ursprünglich im alten Ägypten zur Finanzierung von Pyramiden erfunden"
    ],
    "explanation": "Ein progressiver Steuertarif bedeutet: Je mehr ein Bürger leistet, desto höher ist der Prozentsatz, den der Staat ihm wegnimmt.",
    "exp": "Ein progressiver Steuertarif bedeutet: Je mehr ein Bürger leistet, desto höher ist der Prozentsatz, den der Staat ihm wegnimmt."
  },
  {
    "cat": "baader",
    "diff": "pro",
    "q": "Welche Prognose stellte Roland Baader vor seinem Tod im Jahr 2012 über die Zukunft des westlichen Finanzsystems auf?",
    "a": [
      "Einen unausweichlichen Crash des ungedeckten Papiergeldes mit nachfolgender Währungsreform oder Hyperinflation",
      "Eine jahrhundertelange Periode stabiler Null-Inflation dank digitaler Banküberweisungen",
      "Die weltweite Rückkehr zu Goldmünzen als alleinigem gesetzlichen Zahlungsmittel bis 2015",
      "Die vollständige Auflösung aller Zentralbanken durch einstimmigen UN-Beschluss"
    ],
    "explanation": "Baader sah die globale Überschuldung als mathematisch unlösbar an und rechnete mit der Zerstörung des Geldes durch immer gigantischere Notenbankinterventionen.",
    "exp": "Baader sah die globale Überschuldung als mathematisch unlösbar an und rechnete mit der Zerstörung des Geldes durch immer gigantischere Notenbankinterventionen."
  },
  {
    "cat": "austrian",
    "diff": "easy",
    "q": "Wer gilt mit seinem Werk 'Grundsätze der Volkswirtschaftslehre' von 1871 als Begründer der Österreichischen Schule?",
    "a": [
      "Carl Menger",
      "Ludwig von Mises",
      "Friedrich von Wieser",
      "Eugen von Böhm-Bawerk"
    ],
    "explanation": "Carl Menger begründete 1871 die Schule mit der Grenznutzentheorie und der subjektiven Wertlehre als Antwort auf Karl Marx.",
    "exp": "Carl Menger begründete 1871 die Schule mit der Grenznutzentheorie und der subjektiven Wertlehre als Antwort auf Karl Marx."
  },
  {
    "cat": "austrian",
    "diff": "easy",
    "q": "Was besagt die 'Subjektive Wertlehre' der Österreichischen Schule über den Wert eines Gutes?",
    "a": [
      "Der Wert entsteht nicht aus den Arbeitsstunden, sondern aus der persönlichen Wertschätzung des Konsumenten",
      "Der Wert wird vom Ministerium für Wirtschaft nach festen Tabellen berechnet",
      "Der Wert entspricht exakt dem Gewicht der verarbeiteten Rohstoffe",
      "Der Wert ist eine objektive Eigenschaft, die dem Gut physikalisch innewohnt"
    ],
    "explanation": "Ein Glas Wasser in der Wüste ist extrem wertvoll, am überfluteten Flussufer fast wertlos – der Wert existiert nur im Kopf des Betrachters.",
    "exp": "Ein Glas Wasser in der Wüste ist extrem wertvoll, am überfluteten Flussufer fast wertlos – der Wert existiert nur im Kopf des Betrachters."
  },
  {
    "cat": "austrian",
    "diff": "easy",
    "q": "Welches bahnbrechende Werk von Ludwig von Mises aus dem Jahr 1949 gilt als das Hauptwerk der Praxeologie?",
    "a": [
      "Human Action (Nationalökonomie – Theorie des Handelns und Wirtschaftens)",
      "Das Kapital",
      "The General Theory of Employment",
      "Der Wohlstand der Nationen"
    ],
    "explanation": "Mises leitet darin die gesamte Ökonomie logisch-deduktiv aus dem Axiom ab, dass Menschen bewusst handeln, um Unbehagen zu lindern.",
    "exp": "Mises leitet darin die gesamte Ökonomie logisch-deduktiv aus dem Axiom ab, dass Menschen bewusst handeln, um Unbehagen zu lindern."
  },
  {
    "cat": "austrian",
    "diff": "easy",
    "q": "Welcher Ökonom der Österreichischen Schule erhielt 1974 den Nobelpreis für Wirtschaftswissenschaften?",
    "a": [
      "Friedrich August von Hayek",
      "Ludwig von Mises",
      "Carl Menger",
      "Murray Rothbard"
    ],
    "explanation": "Hayek wurde 1974 für seine Pionierarbeiten zur Geldtheorie, Konjunkturzyklen und Interdependenz von Wirtschaft und Gesellschaft geehrt.",
    "exp": "Hayek wurde 1974 für seine Pionierarbeiten zur Geldtheorie, Konjunkturzyklen und Interdependenz von Wirtschaft und Gesellschaft geehrt."
  },
  {
    "cat": "austrian",
    "diff": "easy",
    "q": "Welches berühmte Buch schrieb F. A. von Hayek 1944 als Warnung vor totalitären Tendenzen westlicher Demokratien?",
    "a": [
      "Der Weg zur Knechtschaft (The Road to Serfdom)",
      "Das Manifest der Freiheit",
      "Die offene Gesellschaft",
      "Grenzen des Wachstums"
    ],
    "explanation": "Hayek argumentierte, dass auch demokratischer Sozialismus schrittweise in Tyrannei mündet, weil Planwirtschaft Zwangsmittel erfordert.",
    "exp": "Hayek argumentierte, dass auch demokratischer Sozialismus schrittweise in Tyrannei mündet, weil Planwirtschaft Zwangsmittel erfordert."
  },
  {
    "cat": "austrian",
    "diff": "mid",
    "q": "Was bewies Ludwig von Mises 1920 in seinem Aufsatz über die 'Wirtschaftsrechnung im Sozialismus'?",
    "a": [
      "Dass eine Planwirtschaft ohne Privateigentum an Produktionsgütern keine Marktpreise und daher keine rationale Kalkulation kennt",
      "Dass sozialistische Fabriken automatisch doppelt so viele Schuhe herstellen",
      "Dass Computerprogramme die Marktpreise in Echtzeit perfekt erraten können",
      "Dass Kolchosen im Winter ertragreicher sind als private Bauernhöfe"
    ],
    "explanation": "Ohne Marktpreise weiß ein Planer nicht, ob Beton oder Holz die sparsamste Lösung ist. Das System versinkt im chaotischen Blindflug.",
    "exp": "Ohne Marktpreise weiß ein Planer nicht, ob Beton oder Holz die sparsamste Lösung ist. Das System versinkt im chaotischen Blindflug."
  },
  {
    "cat": "austrian",
    "diff": "mid",
    "q": "Was versteht F. A. von Hayek unter dem 'Preissystem als dezentraler Kommunikationsmechanismus'?",
    "a": [
      "Preise fassen verstreutes Wissen über weltweite Knappheiten blitzschnell zusammen, ohne dass eine Zentrale nötig ist",
      "Preise werden verschlüsselt per Funk an ausgewählte Regierungsstellen übertragen",
      "Preise dienen der geheimen Abstimmung über politische Gesetze",
      "Preise zwingen alle Bürger dazu, dieselben Güter zu konsumieren"
    ],
    "explanation": "Steigt der Zinnpreis, schränken Millionen Menschen den Verbrauch ein, ohne den Grund (z. B. Mineneinsturz in Bolivien) kennen zu müssen.",
    "exp": "Steigt der Zinnpreis, schränken Millionen Menschen den Verbrauch ein, ohne den Grund (z. B. Mineneinsturz in Bolivien) kennen zu müssen."
  },
  {
    "cat": "austrian",
    "diff": "mid",
    "q": "Wie erklärt die 'Österreichische Konjunkturtheorie' das Entstehen von Boom-and-Bust-Zyklen (Wirtschaftskrisen)?",
    "a": [
      "Künstlich zu niedrige Zinsen der Zentralbank täuschen Investoren vor, es gäbe mehr reale Ersparnisse, als tatsächlich existieren",
      "Krisen entstehen allein durch die böse Absicht privater Spekulanten an den Ölmärkten",
      "Zu hohe Steuern auf Luxusautos bringen das gesamte weltweite Bankensystem zum Einsturz",
      "Konsumenten hören plötzlich auf zu essen und lösen damit Überproduktion aus"
    ],
    "explanation": "Der künstlich billige Kredit führt zu Fehlinvestitionen (Malinvestments). Steigen die Zinsen später, platzt die Blase schmerzhaft.",
    "exp": "Der künstlich billige Kredit führt zu Fehlinvestitionen (Malinvestments). Steigen die Zinsen später, platzt die Blase schmerzhaft."
  },
  {
    "cat": "austrian",
    "diff": "mid",
    "q": "Was besagt Böhm-Bawerks 'Theorie der Zeitpräferenz' über den Zins?",
    "a": [
      "Menschen schätzen gegenwärtige Güter höher ein als dieselben Güter in der fernen Zukunft; der Zins ist der Preis für diese Zeitdifferenz",
      "Der Zins ist ein Diebstahl der Banken an arbeitenden Menschen",
      "Zinsen entstehen nur, wenn der Staat mehr als 50 Prozent Schulden hat",
      "Der Zins wird von den Jahreszeiten und der Erdrotation bestimmt"
    ],
    "explanation": "Ein Apfel heute ist jedem lieber als ein Apfel in zehn Jahren. Wer auf heutigen Konsum verzichtet, verlangt dafür eine Prämie: den Zins.",
    "exp": "Ein Apfel heute ist jedem lieber als ein Apfel in zehn Jahren. Wer auf heutigen Konsum verzichtet, verlangt dafür eine Prämie: den Zins."
  },
  {
    "cat": "austrian",
    "diff": "mid",
    "q": "Wie entstand Geld laut Carl Mengers historischer Aufsatzstudie 'Über den Ursprung des Geldes' (1892)?",
    "a": [
      "Spontan und evolutionär aus dem Tauschhandel, weil Menschen das absatzfähigste Gut (wie Gold oder Silber) bevorzugten",
      "Durch ein Dekret eines altbabylonischen Königs, der Münzen erfand",
      "Durch einen Beschluss der ersten demokratischen Parlamente in Athen",
      "Als Erfindung von Piraten zur gerechten Beuteaufteilung auf Schiffen"
    ],
    "explanation": "Niemand 'erfand' das Geld mit einem Gesetz. Kaufleute tauschten schwer verkäufliche Waren gegen haltbare, teilbare und begehrte Metalle ein.",
    "exp": "Niemand 'erfand' das Geld mit einem Gesetz. Kaufleute tauschten schwer verkäufliche Waren gegen haltbare, teilbare und begehrte Metalle ein."
  },
  {
    "cat": "austrian",
    "diff": "mid",
    "q": "Was meinte F. A. von Hayek mit dem Ausdruck 'Die Anmaßung von Wissen' (The Pretence of Knowledge)?",
    "a": [
      "Den fatalen Glauben von Politikern, komplexe Gesellschaften wie eine Maschine zentral steuern zu können",
      "Das Lernen von Fremdsprachen ohne grammatikalische Regeln",
      "Das Verfassen von wissenschaftlichen Büchern ohne Quellenangaben",
      "Den Verzicht auf Schulpflicht in modernen Industriestaaten"
    ],
    "explanation": "Gesellschaftliches Wissen ist auf Millionen Köpfe verteilt. Ein Planer, der glaubt, Preise oder Produktion lenken zu können, leidet an Selbstüberschätzung.",
    "exp": "Gesellschaftliches Wissen ist auf Millionen Köpfe verteilt. Ein Planer, der glaubt, Preise oder Produktion lenken zu können, leidet an Selbstüberschätzung."
  },
  {
    "cat": "austrian",
    "diff": "mid",
    "q": "Welchen radikalen geldpolitischen Vorschlag unterbreitete Hayek 1976 in seinem Buch 'Entnationalisierung des Geldes'?",
    "a": [
      "Die Abschaffung des staatlichen Notenbankmonopols und die Einführung freien Währungswettbewerbs privater Banken",
      "Die Einführung einer einheitlichen Weltwährung unter Führung des Internationalen Währungsfonds",
      "Das Verbot jeglichen Bargelds zugunsten von staatlichen Zählkarten",
      "Die Koppelung aller Weltwährungen an den Weizenpreis in Chicago"
    ],
    "explanation": "Wenn Bürger frei wählen können, mit welchem Geld sie bezahlen, setzen sich die stabilsten Währungen durch – und Staaten können kein Geld mehr entwerten.",
    "exp": "Wenn Bürger frei wählen können, mit welchem Geld sie bezahlen, setzen sich die stabilsten Währungen durch – und Staaten können kein Geld mehr entwerten."
  },
  {
    "cat": "austrian",
    "diff": "mid",
    "q": "Was bezeichnet der Begriff 'Praxeologie' bei Ludwig von Mises?",
    "a": [
      "Die Deduktion allgemeingültiger Gesetze aus dem unumstößlichen Axiom menschlichen Handelns",
      "Das praktische Erlernen eines Handwerksbetriebs in der Werkstatt",
      "Eine medizinische Therapie zur Behandlung von Arbeitsunlust",
      "Ein mathematisches Rechenverfahren zur Vorhersage von Lottozahlen"
    ],
    "explanation": "Mises betonte: Menschen handeln zielgerichtet und wählen Mittel zur Zweckerreichung. Daraus lassen sich logisch alle ökonomischen Gesetze ableiten.",
    "exp": "Mises betonte: Menschen handeln zielgerichtet und wählen Mittel zur Zweckerreichung. Daraus lassen sich logisch alle ökonomischen Gesetze ableiten."
  },
  {
    "cat": "austrian",
    "diff": "mid",
    "q": "Was versteht die Österreichische Schule unter dem 'Opportunitätskosten'-Prinzip?",
    "a": [
      "Die Kosten einer Entscheidung entsprechen dem Wert der besten entgangenen Handlungsalternative",
      "Die Kosten für Zeitungsanzeigen bei der Bewerbung auf freie Stellen",
      "Die Steuern, die beim Grenzübertritt mit Waren anfallen",
      "Die Gebühren, die Banken für das Wechseln von Fremdwährungen verlangen"
    ],
    "explanation": "Wer zwei Stunden ins Kino geht, bezahlt nicht nur das Ticket, sondern verzichtet auf die Zeit, die er für Arbeit oder Erholung hätte nutzen können.",
    "exp": "Wer zwei Stunden ins Kino geht, bezahlt nicht nur das Ticket, sondern verzichtet auf die Zeit, die er für Arbeit oder Erholung hätte nutzen können."
  },
  {
    "cat": "austrian",
    "diff": "pro",
    "q": "Welcher berühmte 'Methodenstreit' tobte in den 1880er-Jahren zwischen Carl Menger und Gustav von Schmoller?",
    "a": [
      "Der Streit zwischen der theoretisch-deduktiven Methode Mengers und der empirisch-historischen Schule Schmollers",
      "Ein Duell mit Degen um das Rektorat der Universität Wien",
      "Ein Streit über die Frage, ob Deutschland der Goldwährung beitreten soll",
      "Eine Debatte über die Einführung von Papiergeld in Preußen"
    ],
    "explanation": "Menger verteidigte exakte ökonomische Gesetze gegen Schmollers Historismus, der behauptete, es gäbe nur wandelbare historische Fakten ohne Gesetzmäßigkeit.",
    "exp": "Menger verteidigte exakte ökonomische Gesetze gegen Schmollers Historismus, der behauptete, es gäbe nur wandelbare historische Fakten ohne Gesetzmäßigkeit."
  },
  {
    "cat": "austrian",
    "diff": "pro",
    "q": "Was besagt das 'Menger'sche Güterordnungskonzept' über Güter erster und höherer Ordnung?",
    "a": [
      "Konsumgüter sind 1. Ordnung; Produktionsgüter wie Mehl (2. Ordnung) oder Getreide (3. Ordnung) leiten ihren Wert vom Konsumgut ab",
      "Güter erster Ordnung sind Luxusautos, Güter dritter Ordnung sind Kartoffeln",
      "Güter erster Ordnung dürfen nur von Königen und Adeligen konsumiert werden",
      "Güter höherer Ordnung sind Waren, die mehr als 1.000 Kilometer transportiert wurden"
    ],
    "explanation": "Der Wert von Maschinen und Rohstoffen entsteht nur, weil Menschen das fertige Brot am Ende kaufen wollen – Zurechnungstheorie (Imputation).",
    "exp": "Der Wert von Maschinen und Rohstoffen entsteht nur, weil Menschen das fertige Brot am Ende kaufen wollen – Zurechnungstheorie (Imputation)."
  },
  {
    "cat": "austrian",
    "diff": "pro",
    "q": "Was kennzeichnet den US-Ökonomen Murray Rothbard innerhalb der Denktradition der Österreichischen Schule?",
    "a": [
      "Er entwickelte die Schule zum radikalen Anarchokapitalismus weiter und forderte die Privatisierung aller Staatsfunktionen",
      "Er empfahl die Verstaatlichung aller amerikanischen Ölquellen durch das Militär",
      "Er erfand den modernen Wohlfahrtsstaat für US-Präsident Roosevelt",
      "Er plädierte für die vollständige Abschaffung des privaten Goldbesitzes"
    ],
    "explanation": "In Werken wie 'For a New Liberty' zeigte Rothbard, dass selbst Gerichte, Polizei und Straßen privat und vertraglich organisiert werden können.",
    "exp": "In Werken wie 'For a New Liberty' zeigte Rothbard, dass selbst Gerichte, Polizei und Straßen privat und vertraglich organisiert werden können."
  },
  {
    "cat": "austrian",
    "diff": "pro",
    "q": "Warum lehnen Ökonomen der Österreichischen Schule mathematische Gleichgewichtsmodelle (wie DSGE) meist ab?",
    "a": [
      "Weil die echte Wirtschaft ein permanenter dynamischer Prozess des Wandels ist und nie im statischen Gleichgewicht verharrt",
      "Weil österreichische Ökonomen keine Grundrechenarten beherrschen",
      "Weil Computer laut Gesetz keine wirtschaftlichen Daten berechnen dürfen",
      "Weil mathematische Modelle ausschließlich im Sozialismus angewendet werden"
    ],
    "explanation": "Ein Gleichgewichtszustand würde bedeuten, dass niemand mehr handelt, weil alle Wünsche erfüllt sind. Reale Märkte leben vom Wandel und Unternehmertum.",
    "exp": "Ein Gleichgewichtszustand würde bedeuten, dass niemand mehr handelt, weil alle Wünsche erfüllt sind. Reale Märkte leben vom Wandel und Unternehmertum."
  },
  {
    "cat": "austrian",
    "diff": "pro",
    "q": "Welche entscheidende Rolle spielt der 'Unternehmer' (Entrepreneur) bei Israel Kirzner?",
    "a": [
      "Er besitzt Wachsamkeit (Alertness) für unentdeckte Marktchancen und bringt Angebot und Nachfrage ins Lot",
      "Er beutet systematisch die Arbeiterklasse aus, um Dividenden zu kassieren",
      "Er führt lediglich die Befehle des staatlichen Wirtschaftsministeriums aus",
      "Er ist ein reiner Verwalter von fremdem Bankguthaben ohne jedes Eigenrisiko"
    ],
    "explanation": "Der Unternehmer sieht Preisunterschiede oder ungedeckte Kundenbedürfnisse vor allen anderen und schließt diese Lücken mutig und innovativ.",
    "exp": "Der Unternehmer sieht Preisunterschiede oder ungedeckte Kundenbedürfnisse vor allen anderen und schließt diese Lücken mutig und innovativ."
  },
  {
    "cat": "austrian",
    "diff": "pro",
    "q": "Was meinte Ludwig von Mises mit dem Theorem der 'Interventionsspirale'?",
    "a": [
      "Jeder staatliche Eingriff erzeugt unerwünschte Nebenwirkungen, die als Vorwand für noch tiefere Eingriffe dienen – bis zum Sozialismus",
      "Dass Fallschirme bei staatlichen Flugzeugtests in Spiralbahnen zu Boden gleiten",
      "Dass Zinsen im freien Markt automatisch bis ins Unendliche ansteigen",
      "Dass Währungskurse sich wie eine Spirale um den Goldpreis winden"
    ],
    "explanation": "Setzt der Staat einen Mietendeckel, sinkt das Wohnungsangebot. Statt den Deckel abzuschaffen, enteignet der Staat Wohnungen – eine Kaskade des Zwangs.",
    "exp": "Setzt der Staat einen Mietendeckel, sinkt das Wohnungsangebot. Statt den Deckel abzuschaffen, enteignet der Staat Wohnungen – eine Kaskade des Zwangs."
  },
  {
    "cat": "austrian",
    "diff": "pro",
    "q": "Was unterscheidet 'echte Ersparnis' von künstlicher 'Kreditschöpfung aus dem Nichts' (Fiduciary Media)?",
    "a": [
      "Echte Ersparnis basiert auf realem Konsumverzicht; reine Geldschöpfung erzeugt Kaufkraft ohne vorherige Güterproduktion",
      "Echte Ersparnis darf nur in barer Münze unter der Matratze gelagert werden",
      "Kreditschöpfung ist laut Gesetz in allen Staaten der Welt unter Todesstrafe verboten",
      "Echte Ersparnis verliert bei Deflation automatisch ihren realen Gegenwert"
    ],
    "explanation": "Nur wenn jemand auf Konsum verzichtet, stehen Steine, Stahl und Arbeitszeit für neue Fabriken bereit. Kredite aus Luft verzerren diese Realität.",
    "exp": "Nur wenn jemand auf Konsum verzichtet, stehen Steine, Stahl und Arbeitszeit für neue Fabriken bereit. Kredite aus Luft verzerren diese Realität."
  },
  {
    "cat": "austrian",
    "diff": "pro",
    "q": "Welche Rolle spielte Eugen von Böhm-Bawerk neben seiner wissenschaftlichen Arbeit in der realen Politik Österreich-Ungarns?",
    "a": [
      "Er war dreimal kaiserlicher Finanzminister und setzte den stabilen Goldstandard der Krone durch",
      "Er war Feldmarschall der k.u.k. Armee im Ersten Weltkrieg",
      "Er gründete die erste sozialistische Gewerkschaft in Wien",
      "Er amtierte als Botschafter Österreichs im zaristischen Russland"
    ],
    "explanation": "Als Finanzminister verteidigte Böhm-Bawerk mit eisener Disziplin den Staatshaushalt gegen Verschwendung und sicherte die Goldwährung.",
    "exp": "Als Finanzminister verteidigte Böhm-Bawerk mit eisener Disziplin den Staatshaushalt gegen Verschwendung und sicherte die Goldwährung."
  },
  {
    "cat": "austrian",
    "diff": "pro",
    "q": "Welcher Schüler von Mises und Hayek emigrierte in die USA und gründete die renommierte 'Foundation for Economic Education' (FEE)?",
    "a": [
      "Leonard Read (Autor des Klassikers 'I, Pencil')",
      "Milton Friedman",
      "Ayn Rand",
      "Henry Hazlitt"
    ],
    "explanation": "Read zeigte in 'I, Pencil' meisterhaft, dass kein einzelner Mensch auf der Welt allein einen einfachen Bleistift herstellen kann.",
    "exp": "Read zeigte in 'I, Pencil' meisterhaft, dass kein einzelner Mensch auf der Welt allein einen einfachen Bleistift herstellen kann."
  },
  {
    "cat": "austrian",
    "diff": "pro",
    "q": "Was versteht die Österreichische Schule unter dem Begriff 'Regressive Erwartungen' bei einer heraufziehenden Hyperinflation?",
    "a": [
      "Das Phänomen der 'Flucht in die Sachwerte' (Crack-up-Boom), bei dem niemand mehr Geld halten will und die Preise explodieren",
      "Die Rückkehr der Bürger zum Tausch von getrocknetem Fisch gegen Muscheln",
      "Die gesetzliche Verpflichtung der Bürger, ihre Ersparnisse zu vernichten",
      "Das Einfrieren aller Konten durch den Internationalen Währungsfonds"
    ],
    "explanation": "Erkennen die Bürger, dass die Notenpresse nie mehr stoppen wird, kaufen sie panisch beliebige Waren – das Papiergeld kollabiert schlagartig.",
    "exp": "Erkennen die Bürger, dass die Notenpresse nie mehr stoppen wird, kaufen sie panisch beliebige Waren – das Papiergeld kollabiert schlagartig."
  },
  {
    "cat": "austrian",
    "diff": "pro",
    "q": "Warum betrachten Austrians das Konzept des Bruttoinlandsprodukts (BIP) als irreführenden Maßstab für Wohlstand?",
    "a": [
      "Weil das BIP Staatsausgaben und zerstörerische Reparaturen als Wohlstandsgewinn zählt und Zwischenstufen der Produktion ausblendet",
      "Weil das BIP ausschließlich in Goldunzen gemessen werden darf",
      "Weil das BIP die Arbeitsleistung von Frauen doppelt bewertet",
      "Weil das BIP die Einwohnerzahl von Großstädten unterschlägt"
    ],
    "explanation": "Zerstört ein Sturm tausend Dächer, steigt das BIP durch die Reparaturen. Der reale Wohlstand der Menschen ist jedoch gesunken.",
    "exp": "Zerstört ein Sturm tausend Dächer, steigt das BIP durch die Reparaturen. Der reale Wohlstand der Menschen ist jedoch gesunken."
  },
  {
    "cat": "debatte",
    "diff": "easy",
    "q": "Was beschreibt der berühmte 'Cantillon-Effekt' bei der Schöpfung neuen Geldes?",
    "a": [
      "Das neue Geld erreicht nicht alle Bürger gleichzeitig, sondern bereichert die Erstempfänger auf Kosten der Letztempfänger",
      "Dass Geldscheine bei feuchtem Wetter schneller reißen als bei Trockenheit",
      "Dass Zinssätze automatisch sinken, wenn der Goldpreis weltweit steigt",
      "Dass arme Länder schneller wachsen als hochentwickelte Volkswirtschaften"
    ],
    "explanation": "Richard Cantillon entdeckte: Wer das neue Geld zuerst erhält (Staat, Großbanken), kauft zu alten Preisen; bei der Masse kommt es erst an, wenn alles teurer ist.",
    "exp": "Richard Cantillon entdeckte: Wer das neue Geld zuerst erhält (Staat, Großbanken), kauft zu alten Preisen; bei der Masse kommt es erst an, wenn alles teurer ist."
  },
  {
    "cat": "debatte",
    "diff": "easy",
    "q": "Welche populäre ökonomische Parabel verfasste Frédéric Bastiat mit der Geschichte vom 'zerbrochenen Fenster'?",
    "a": [
      "Dass Zerstörung keinen Wohlstand schafft, weil das Geld für die Reparatur an anderer Stelle für echten Fortschritt fehlt",
      "Dass Glaser die wichtigsten Steuerzahler einer Nation sind",
      "Dass man Fenster im Winter stets geschlossen halten muss",
      "Dass Steuern die Wirtschaft durch zersplitterte Gläser ankurbeln"
    ],
    "explanation": "Man sieht den verdienenden Glaser (What is Seen), übersieht aber den Schneider, bei dem der Bäcker sonst einen Anzug gekauft hätte (What is Not Seen).",
    "exp": "Man sieht den verdienenden Glaser (What is Seen), übersieht aber den Schneider, bei dem der Bäcker sonst einen Anzug gekauft hätte (What is Not Seen)."
  },
  {
    "cat": "debatte",
    "diff": "easy",
    "q": "Welchen Begriff prägte Joseph Schumpeter für die ständige Erneuerung der Wirtschaft durch unternehmerische Innovation?",
    "a": [
      "Schöpferische Zerstörung (Creative Destruction)",
      "Planmäßige Verelendung",
      "Zirkuläre Stagnation",
      "Statische Marktanpassung"
    ],
    "explanation": "Alte Industrien (wie die Kutsche oder die Schreibmaschine) müssen weichen, damit Kapital und Arbeit für überlegene Neuerungen frei werden.",
    "exp": "Alte Industrien (wie die Kutsche oder die Schreibmaschine) müssen weichen, damit Kapital und Arbeit für überlegene Neuerungen frei werden."
  },
  {
    "cat": "debatte",
    "diff": "easy",
    "q": "Was besagt das berühmte Zitat von Nobelpreisträger Milton Friedman über die Ursache von Inflation?",
    "a": [
      "'Inflation ist immer und überall ein monetäres Phänomen'",
      "'Inflation entsteht durch die Gier von Supermarktbesitzern'",
      "'Inflation ist ein unabwendbares Schicksal der Natur'",
      "'Inflation wird durch hohe Löhne im Handwerk erzeugt'"
    ],
    "explanation": "Preise können auf breiter Front nur dann dauerhaft steigen, wenn die Geldmenge schneller wächst als die Menge der produzierten Güter.",
    "exp": "Preise können auf breiter Front nur dann dauerhaft steigen, wenn die Geldmenge schneller wächst als die Menge der produzierten Güter."
  },
  {
    "cat": "debatte",
    "diff": "easy",
    "q": "Was versteht man in der Umweltökonomie unter der 'Tragik der Allmende' (Tragedy of the Commons)?",
    "a": [
      "Frei zugängliche Gemeinschaftsgüter ohne klare Eigentumsrechte werden rücksichtslos übernutzt und zerstört",
      "Dass Bauern auf privaten Feldern weniger ernten als auf Gemeindewiesen",
      "Dass landwirtschaftliche Produkte keinen Marktpreis erzielen können",
      "Dass Wälder nur wachsen, wenn der Staat ihren Zuschnitt bestimmt"
    ],
    "explanation": "Was allen gehört, gehört niemandem und wird von allen geplündert (z. B. Überfischung der Weltmeere); klares Eigentum schafft Anreiz zur Pflege.",
    "exp": "Was allen gehört, gehört niemandem und wird von allen geplündert (z. B. Überfischung der Weltmeere); klares Eigentum schafft Anreiz zur Pflege."
  },
  {
    "cat": "debatte",
    "diff": "mid",
    "q": "Was besagt das berühmte 'Coase-Theorem' (nach Ronald Coase) über externe Effekte und Konflikte?",
    "a": [
      "Bei klar definierten Eigentumsrechten und geringen Transaktionskosten verhandeln Betroffene die effizienteste Lösung freiwillig",
      "Der Staat muss jeden Nachbarschaftsstreit durch ein eigenes Ministerium regeln",
      "Konflikte können niemals ohne staatliche Enteignung beigelegt werden",
      "Eigentum verschärft Umweltprobleme in jedem denkbaren Fall"
    ],
    "explanation": "Ob Fischer oder Fabrikbesitzer: Wissen beide Parteien, wem das Recht gehört, verhandeln sie über Entschädigungen zur besten ökonomischen Lösung.",
    "exp": "Ob Fischer oder Fabrikbesitzer: Wissen beide Parteien, wem das Recht gehört, verhandeln sie über Entschädigungen zur besten ökonomischen Lösung."
  },
  {
    "cat": "debatte",
    "diff": "mid",
    "q": "Welche fundamentale Erkenntnis begründete die 'Public Choice Theory' (Neue Politische Ökonomie) von James M. Buchanan?",
    "a": [
      "Politiker und Beamte handeln wie normale Menschen nach Eigeninteresse (Machterhalt, Budgetausweitung) und nicht als selbstlose Diener des Gemeinwohls",
      "Beamte treffen stets unparteiische Entscheidungen zum reinen Wohle des Bürgers",
      "Demokratische Wahlen garantieren automatisch den sparsamsten Umgang mit Steuergeld",
      "Staatsbetriebe wirtschaften produktiver als private Konkurrenten"
    ],
    "explanation": "Public Choice entzauberte den Mythos vom wohlwollenden Staat: Politiker tauschen Steuergeschenke gegen Wählerstimmen ein.",
    "exp": "Public Choice entzauberte den Mythos vom wohlwollenden Staat: Politiker tauschen Steuergeschenke gegen Wählerstimmen ein."
  },
  {
    "cat": "debatte",
    "diff": "mid",
    "q": "Was meinte Thomas Sowell mit seiner berühmten Feststellung über 'Lösungen' in der Ökonomie?",
    "a": [
      "'Es gibt keine Lösungen, es gibt nur Zielkonflikte (Trade-offs)'",
      "'Jedes Problem lässt sich mit ausreichend Subventionen lösen'",
      "'Der Staat hat für jede Krise die perfekte wissenschaftliche Antwort'",
      "'Geld löst alle moralischen Konflikte einer Zivilisation'"
    ],
    "explanation": "Jede politische Maßnahme verursacht Kosten und Nachteile an anderer Stelle. Wer Perfektion verspricht, ignoriert die Realität der Knappheit.",
    "exp": "Jede politische Maßnahme verursacht Kosten und Nachteile an anderer Stelle. Wer Perfektion verspricht, ignoriert die Realität der Knappheit."
  },
  {
    "cat": "debatte",
    "diff": "mid",
    "q": "Was beschreibt die 'Laffer-Kurve' im Bereich der Steuerpolitik?",
    "a": [
      "Dass Steuereinnahmen ab einem bestimmten Steuersatz sinken, weil Leistungsträger ausweichen oder weniger arbeiten",
      "Dass eine Steuerquote von 100 Prozent den maximalen Staatsreichtum garantiert",
      "Dass Unternehmen bei steigenden Steuern automatisch mehr investieren",
      "Dass Steuererhöhungen die Lebensfreude der Bürger messbar vergrößern"
    ],
    "explanation": "Bei 0 % Steuern nimmt der Staat nichts ein; bei 100 % arbeitet niemand mehr legal. Dazwischen liegt ein Scheitelpunkt, ab dem höhere Sätze schaden.",
    "exp": "Bei 0 % Steuern nimmt der Staat nichts ein; bei 100 % arbeitet niemand mehr legal. Dazwischen liegt ein Scheitelpunkt, ab dem höhere Sätze schaden."
  },
  {
    "cat": "debatte",
    "diff": "mid",
    "q": "Was versteht man unter dem Begriff 'Moral Hazard' (moralisches Risiko) in der Finanzökonomie?",
    "a": [
      "Das leichtsinnige Eingehen hoher Risiken, weil man weiß, dass eventuelle Verluste von Dritten (z. B. dem Staat) getragen werden",
      "Die Angst vor Bestrafung bei Steuerhinterziehung",
      "Das Verbot von Krediten an unseriöse Privatpersonen",
      "Die moralische Verpflichtung von Millionären zu spenden"
    ],
    "explanation": "Wenn Großbanken wissen, dass sie 'too big to fail' sind und der Staat sie rettet, zocken sie hemmungslos – Gewinne privat, Verluste verstaatlicht.",
    "exp": "Wenn Großbanken wissen, dass sie 'too big to fail' sind und der Staat sie rettet, zocken sie hemmungslos – Gewinne privat, Verluste verstaatlicht."
  },
  {
    "cat": "debatte",
    "diff": "mid",
    "q": "Was bewies die Wirtschaftsnobelpreisträgerin Elinor Ostrom in ihren Studien zu Gemeinschaftsgütern?",
    "a": [
      "Lokale Gemeinschaften können Allmende-Ressourcen durch selbstorganisierte, informelle Regeln oft erstaunlich nachhaltig bewirtschaften",
      "Nur strikte Verstaatlichung kann Wälder vor Abholzung retten",
      "Die Tragik der Allmende ist ein unlösbares Schicksal ohne Ausnahme",
      "Privates Eigentum an Fischteichen ist biologisch schädlich"
    ],
    "explanation": "Ostrom zeigte weltweit, dass Schweizer Almbauern oder spanische Bewässerungsvereine ohne staatliche Zwangseingriffe seit Jahrhunderten kooperieren.",
    "exp": "Ostrom zeigte weltweit, dass Schweizer Almbauern oder spanische Bewässerungsvereine ohne staatliche Zwangseingriffe seit Jahrhunderten kooperieren."
  },
  {
    "cat": "debatte",
    "diff": "mid",
    "q": "Was beschreibt das Phänomen des 'Rent-Seeking' (Pfründensichern) in der Politikwissenschaft?",
    "a": [
      "Der Versuch von Interessengruppen, durch Lobbyarbeit staatliche Privilegien, Zölle oder Subventionen auf Kosten anderer zu erlangen",
      "Die Suche von Rentnern nach bezahlbarem Wohnraum in Städten",
      "Das Eröffnen von Mietwagenfirmen an internationalen Flughäfen",
      "Das Anlegen von Ersparnissen in sicheren Bundesanleihen"
    ],
    "explanation": "Statt bessere Produkte am Markt zu bauen, investieren Konzerne Millionen in Lobbyisten, um Konkurrenten durch Gesetze auszuschalten.",
    "exp": "Statt bessere Produkte am Markt zu bauen, investieren Konzerne Millionen in Lobbyisten, um Konkurrenten durch Gesetze auszuschalten."
  },
  {
    "cat": "debatte",
    "diff": "mid",
    "q": "Warum führen staatliche Mietpreisbremsen laut breitem ökonomischem Konsens zu Wohnungsknappheit?",
    "a": [
      "Sie machen Neubau und Sanierung unrentabel, verringern das Angebot und zementieren bestehende Mietverhältnisse",
      "Sie zwingen Mieter dazu, jedes Jahr in eine andere Stadt umzuziehen",
      "Sie lassen die Baukosten für Ziegelsteine über Nacht explodieren",
      "Sie verbieten den Bau von mehrstöckigen Wohnhäusern"
    ],
    "explanation": "Schon der schwedische Ökonom Assar Lindbeck spottete: Mietkontrolle ist neben Bombardierung der effektivste Weg, eine Stadt zu zerstören.",
    "exp": "Schon der schwedische Ökonom Assar Lindbeck spottete: Mietkontrolle ist neben Bombardierung der effektivste Weg, eine Stadt zu zerstören."
  },
  {
    "cat": "debatte",
    "diff": "mid",
    "q": "Was meinte Adam Smith mit der Metapher der 'unsichtbaren Hand' des Marktes?",
    "a": [
      "Dass Individuen durch die Verfolgung ihres eigenen Nutzens unbeabsichtigt das Wohl der gesamten Gesellschaft fördern",
      "Dass ein geheimer Staatsbeamter alle Preise heimlich manipuliert",
      "Dass der Markt von unsichtbaren Wesen gesteuert wird",
      "Dass Diebstahl im Dunkeln für die Volkswirtschaft nützlich ist"
    ],
    "explanation": "Um Geld zu verdienen, muss der Unternehmer seinen Kunden nützliche Dinge anbieten. Das Eigeninteresse wird so zum Motor des Allgemeinwohls.",
    "exp": "Um Geld zu verdienen, muss der Unternehmer seinen Kunden nützliche Dinge anbieten. Das Eigeninteresse wird so zum Motor des Allgemeinwohls."
  },
  {
    "cat": "debatte",
    "diff": "pro",
    "q": "Was formuliert das 'Gresham'sche Gesetz' über das Verhältnis von gutem und schlechtem Geld?",
    "a": [
      "'Schlechtes (unterbewertetes) Geld verdrängt das gute Geld aus dem Umlauf, wenn ein fester Wechselkurs erzwungen wird'",
      "Dass neue Münzen immer schneller rosten als alte Barren",
      "Dass Goldmünzen bei Deflation ihren Nennwert verdoppeln",
      "Dass Banknoten nur in ungeraden Jahreszahlen gedruckt werden dürfen"
    ],
    "explanation": "Schreibt der Staat vor, dass abgenutzte Münzen denselben Wert haben wie vollwertige Goldmünzen, horten Bürger das Gold und zahlen mit dem Schrott.",
    "exp": "Schreibt der Staat vor, dass abgenutzte Münzen denselben Wert haben wie vollwertige Goldmünzen, horten Bürger das Gold und zahlen mit dem Schrott."
  },
  {
    "cat": "debatte",
    "diff": "pro",
    "q": "Was unterscheidet den 'Ordoliberalismus' der Freiburger Schule (Walter Eucken) vom reinen Laissez-faire-Kapitalismus?",
    "a": [
      "Der Staat soll als starker Schiedsrichter eine feste Rahmenordnung gegen Kartelle setzen, sich aber aus dem Wirtschaftsprozess heraushalten",
      "Der Staat soll sämtliche Fabriken selbst verwalten und leiten",
      "Der Staat soll alle Preise und Gehälter wöchentlich festlegen",
      "Der Staat soll private Banken verbieten und Kredite zuteilen"
    ],
    "explanation": "Eucken forderte 'Ordnungspolitik statt Prozesspolitik': Der Staat baut die Straßen und setzt Spielregeln, spielt aber nicht selbst mit.",
    "exp": "Eucken forderte 'Ordnungspolitik statt Prozesspolitik': Der Staat baut die Straßen und setzt Spielregeln, spielt aber nicht selbst mit."
  },
  {
    "cat": "debatte",
    "diff": "pro",
    "q": "Was beschreibt die 'Hypothese effizienter Märkte' (EMH) von Eugene Fama?",
    "a": [
      "Aktienkurse spiegeln zu jedem Zeitpunkt alle öffentlich verfügbaren Informationen wider; Überrenditen sind auf Dauer reiner Zufall",
      "Dass man mit Computercharts die Zukunft der Börse sicher vorhersagen kann",
      "Dass staatliche Planer Aktienkurse besser berechnen als Privatanleger",
      "Dass Börsen nur im Sommer effizient arbeiten"
    ],
    "explanation": "Weil Millionen Händler blitzschnell auf News reagieren, ist jede neue Information sofort eingepreist. Den Markt dauerhaft zu schlagen, gelingt kaum.",
    "exp": "Weil Millionen Händler blitzschnell auf News reagieren, ist jede neue Information sofort eingepreist. Den Markt dauerhaft zu schlagen, gelingt kaum."
  },
  {
    "cat": "debatte",
    "diff": "pro",
    "q": "Was ist das Kernargument von Mancur Olsons 'Logik des kollektiven Handelns' über den Einfluss von Minderheiten?",
    "a": [
      "Kleine, gut organisierte Interessengruppen setzen ihre Sonderinteressen leicht gegen eine unorganisierte, träge Mehrheit durch",
      "Große Gruppen mit Millionen Mitgliedern sind politisch immer am schlagkräftigsten",
      "Demokratische Mehrheiten lassen sich niemals von Lobbyisten überstimmen",
      "Kollektives Handeln ist nur in Gesellschaften mit Einparteiensystem möglich"
    ],
    "explanation": "Jeder Bürger verliert durch eine Agrarsubvention nur wenige Euro, weshalb er nicht protestiert; die wenigen Profiteure kämpfen jedoch erbittert dafür.",
    "exp": "Jeder Bürger verliert durch eine Agrarsubvention nur wenige Euro, weshalb er nicht protestiert; die wenigen Profiteure kämpfen jedoch erbittert dafür."
  },
  {
    "cat": "debatte",
    "diff": "pro",
    "q": "Was beschreibt das 'Lucas-Kritik'-Argument von Nobelpreisträger Robert Lucas über staatliche Konjunkturmodelle?",
    "a": [
      "Historische Daten versagen als Prognose, weil Menschen ihr Verhalten rational an neue politische Maßnahmen anpassen",
      "Dass Wirtschaftswissenschaftler keine Computer zur Berechnung nutzen dürfen",
      "Dass die Wirtschaftspolitik ausschließlich von Philosophen geleitet werden muss",
      "Dass Arbeitslosigkeit ein rein optischer Messfehler der Statistik ist"
    ],
    "explanation": "Versucht die Notenbank, durch Inflation Jobs zu schaffen, durchschauen die Bürger den Trick und fordern sofort höhere Löhne – die Illusion verpufft.",
    "exp": "Versucht die Notenbank, durch Inflation Jobs zu schaffen, durchschauen die Bürger den Trick und fordern sofort höhere Löhne – die Illusion verpufft."
  },
  {
    "cat": "debatte",
    "diff": "pro",
    "q": "Was meinte der Philosoph Robert Nozick mit seinem berühmten Gedankenexperiment zum Basketballstar 'Wilt Chamberlain'?",
    "a": [
      "Dass freiwillige Transaktionen zwischen Bürgern jede vorgegebene staatliche Gleichverteilung von Einkommen sofort wieder aufheben",
      "Dass Profisportler keine Steuern auf ihre Einnahmen zahlen sollten",
      "Dass Basketball im Sozialismus zur Pflichtsportart werden muss",
      "Dass Talente ausschließlich dem Staat und dem Kollektiv gehören"
    ],
    "explanation": "Zahlen Millionen Fans freiwillig 25 Cent, um Chamberlain spielen zu sehen, wird er reich. Um Gleichheit wiederherzustellen, müsste der Staat Freiheit verbieten.",
    "exp": "Zahlen Millionen Fans freiwillig 25 Cent, um Chamberlain spielen zu sehen, wird er reich. Um Gleichheit wiederherzustellen, müsste der Staat Freiheit verbieten."
  },
  {
    "cat": "debatte",
    "diff": "pro",
    "q": "Was beschreibt das Phänomen der 'Zombiefirmen' in einer langanhaltenden Niedrigzinsphase?",
    "a": [
      "Unrentable Unternehmen, deren operative Gewinne nicht einmal die Kreditzinsen decken, überleben künstlich durch extrem billiges Geld",
      "Betriebe, die Roboter und künstliche Intelligenz statt lebender Menschen beschäftigen",
      "Banken, die ausschließlich an Wochenenden für Überweisungen öffnen",
      "Unternehmen, die ihre Steuern in Form von Lebensmitteln bezahlen"
    ],
    "explanation": "Niedrigstzinsen verhindern gesunde Marktbereinigungen. Zombiefirmen binden Kapital und Arbeitskräfte, die in produktiven Betrieben fehlen.",
    "exp": "Niedrigstzinsen verhindern gesunde Marktbereinigungen. Zombiefirmen binden Kapital und Arbeitskräfte, die in produktiven Betrieben fehlen."
  },
  {
    "cat": "debatte",
    "diff": "pro",
    "q": "Was versteht man unter dem Begriff 'Regulatory Capture' (Kaperung der Aufsichtsbehörden)?",
    "a": [
      "Wenn regulierte Großkonzerne die staatliche Aufsichtsbehörde so dominieren, dass sie Regulierungen zur Abwehr neuer Konkurrenten nutzen",
      "Das Verhaften von korrupten Bankmanagern durch Bundespolizisten",
      "Das Beschlagnahmen von Piratenschiffen durch die Küstenwache",
      "Das Verbot von Lobbyisten in Parlamentsgebäuden"
    ],
    "explanation": "Strenge Auflagen treffen Start-ups viel härter als etablierte Riesen. Konzerne nutzen Bürokratie als Burggraben gegen lästige Wettbewerber.",
    "exp": "Strenge Auflagen treffen Start-ups viel härter als etablierte Riesen. Konzerne nutzen Bürokratie als Burggraben gegen lästige Wettbewerber."
  },
  {
    "cat": "debatte",
    "diff": "pro",
    "q": "Was bezeichnet die 'Tragik der Allmende' im digitalen Raum bei Urheberrechts- und Open-Source-Debatten?",
    "a": [
      "Die unentgeltliche Nutzung offener digitaler Bibliotheken durch Großkonzerne ohne angemessenen Beitrag zur Instandhaltung",
      "Das Löschen von Benutzerkonten bei sozialen Netzwerken ohne Vorwarnung",
      "Das Verbot von Programmiersprachen durch Regierungsbeschlüsse",
      "Die Überlastung von Glasfaserkabeln durch zu viele E-Mails"
    ],
    "explanation": "Wenn Tausende Firmen auf unbezahlte Open-Source-Entwickler bauen, ohne sie zu unterstützen, drohen kritische Sicherheitslücken und Systemausfälle.",
    "exp": "Wenn Tausende Firmen auf unbezahlte Open-Source-Entwickler bauen, ohne sie zu unterstützen, drohen kritische Sicherheitslücken und Systemausfälle."
  },
  {
    "cat": "debatte",
    "diff": "pro",
    "q": "Welche Kritik formulierte Friedrich von Wieser am Konzept des Grenznutzens, obwohl er den Begriff selbst prägte?",
    "a": [
      "Dass Marktpreise die Zahlungsfähigkeit widerspiegeln und nicht zwingend den existenziellen Nutzen für mittellose Menschen",
      "Dass Grenznutzen bei Lebensmitteln physikalisch nicht messbar sei",
      "Dass die Grenznutzentheorie nur für den Tauschhandel mit Vieh gilt",
      "Dass Geld überhaupt keinen Grenznutzen besitzen könne"
    ],
    "explanation": "Ein reicher Mann zahlt für eine Delikatesse viel Geld, während ein Armer für Brot wenig zahlen kann – der Markt misst Tauschwert, nicht ethische Dringlichkeit.",
    "exp": "Ein reicher Mann zahlt für eine Delikatesse viel Geld, während ein Armer für Brot wenig zahlen kann – der Markt misst Tauschwert, nicht ethische Dringlichkeit."
  },
  {
    "cat": "debatte",
    "diff": "pro",
    "q": "Was besagt die 'Bastiat'sche Kerzenmacher-Petition' (Satire von 1845) über Protektionismus und Freihandel?",
    "a": [
      "Kerzenmacher fordern die Verdunkelung der Sonne, um ihre heimische Lampenindustrie vor unlauterem Gratis-Lichtwettbewerb zu schützen",
      "Dass Kerzen aus Bienenwachs steuerlich gefördert werden müssen",
      "Dass elektrische Glühbirnen sofort verboten werden sollten",
      "Dass Kirchen bei Nachtgottesdiensten keine Kerzen mehr anzünden dürfen"
    ],
    "explanation": "Bastiats geniale Satire zeigte: Schutzzölle gegen billige Importe sind genauso absurd, als würde man Fenster vernageln, um die Sonne fernzuhalten.",
    "exp": "Bastiats geniale Satire zeigte: Schutzzölle gegen billige Importe sind genauso absurd, als würde man Fenster vernageln, um die Sonne fernzuhalten."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === 'function') {
    window.ArcadeQuizEngine.registerBank('politics', DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS['politics'] = DATA;
  }
})();
