// Unified quiz bank for "geburt" (75 questions: Bewusste Schwangerschaft & sanfte Geburt)
(function () {
  const DATA = [
  {
    "cat": "mental_entspannung",
    "diff": "easy",
    "q": "Welches zentrale Wechselspiel beschrieb der britische Geburtshelfer Grantly Dick-Read bereits im frühen 20. Jahrhundert als Ursache für unnötig schmerzhafte Geburten?",
    "a": [
      "Das Angst-Spannungs-Schmerz-Syndrom, bei dem Furcht zu muskulärer Verkrampfung führt",
      "Das Erschöpfungs-Druck-Stress-Muster, bei dem Schlafmangel die hormonelle Ausschüttung von Insulin blockiert",
      "Das Zweifel-Atmungs-Trauma-Modell, bei dem unruhiges Luftholen zu starkem Sauerstoffmangel im Gewebe beiträgt",
      "Das Haltungs-Lage-Blockade-Gefüge, bei dem falsches Liegen die Beweglichkeit der Beckenknochen dauerhaft stört"
    ],
    "explanation": "Dick-Read erkannte: Angst aktiviert den Sympathikus, die Gebärmuttergefäße verengen sich und die Muskulatur verkrampft – Ruhe und Vertrauen durchbrechen diesen Kreislauf.",
    "exp": "Das Angst-Spannungs-Schmerz-Syndrom, bei dem Furcht zu muskulärer Verkrampfung und verringerter Durchblutung führt"
  },
  {
    "cat": "mental_entspannung",
    "diff": "easy",
    "q": "Warum wird in Konzepten der achtsamen Geburtsbegleitung bewusst der Begriff „Wellen“ anstelle von „Wehen“ verwendet?",
    "a": [
      "Weil Wehe von Schmerz abstammt, während Welle das rhythmische An- und Abfluten beschreibt",
      "Weil Welle eine geschützte medizinische Fachbezeichnung darstellt, die nur von Hebammen verwendet werden darf",
      "Weil Wehe im deutschen Sprachgebrauch ausschließlich für pathologische Komplikationen in der Klinik reserviert ist",
      "Weil Welle den physikalischen Wasserdruck im Fruchtblasenraum messbar verringert und Krämpfe psychologisch verhindert"
    ],
    "explanation": "Worte erzeugen Bilder im Kopf: Das althochdeutsche Wort „Wê“ bedeutet Schmerz oder Wehklage, während „Wellen“ ein Gefühl von Kraft, Rhythmus und Bewegung vermitteln.",
    "exp": "Weil der Begriff Wehe etymologisch von Schmerz abstammt, während Welle das rhythmische An- und Abfluten treffend beschreibt"
  },
  {
    "cat": "mental_entspannung",
    "diff": "mid",
    "q": "Was versteht man unter der sogenannten „Ruheatmung“ (oder sanften Bauchatmung) während der Schwangerschaft und zwischen den Wellen?",
    "a": [
      "Ein tiefes, langsames Einatmen durch die Nase in den Bauchraum, gefolgt von einem doppelt so langen, gelösten Ausatmen",
      "Ein rasches, flaches Hecheln im oberen Brustkorb, um die Herzfrequenz der Mutter bewusst über hundert Schläge zu heben",
      "Ein intervallartiges Anhalten des Atems für zwanzig Sekunden nach jedem Luftzug zur maximalen Kohlendioxid-Anreicherung",
      "Ein rhythmisch gepresstes Stoßatmen gegen die geschlossenen Lippen zur frühzeitigen Kräftigung der Beckenbodenmuskeln"
    ],
    "explanation": "Langes, ruhiges Ausatmen signalisiert dem vegetativen Nervensystem Sicherheit, senkt den Puls und schaltet den beruhigenden Parasympathikus ein.",
    "exp": "Ein tiefes, langsames Einatmen durch die Nase in den Bauchraum, gefolgt von einem doppelt so langen, gelösten Ausatmen"
  },
  {
    "cat": "mental_entspannung",
    "diff": "mid",
    "q": "Welche fundamentale Philosophie begründete Marie F. Mongan mit ihren Ansätzen zur mentalen Geburtsvorbereitung?",
    "a": [
      "Geburt ist eine gesunde, natürliche Körperfunktion, die ohne Angst und Anspannung sanft und friedvoll verlaufen kann",
      "Geburt erfordert zwingend medikamentöse Dauerüberwachung, um unvorhersehbare Risiken im Kreißsaal auszuschließen",
      "Geburt lässt sich durch strikte Willenskraft und Muskelanspannung innerhalb weniger Minuten vollständig erzwingen",
      "Geburt verläuft nur dann schmerzarm, wenn die werdende Mutter während des gesamten Prozesses vollkommen stumm bleibt"
    ],
    "explanation": "Mongan zeigte auf, dass ein weiblicher Körper von Natur aus vollkommen dafür geschaffen ist zu gebären, sofern er nicht durch anerzogene Ängste gehemmt wird.",
    "exp": "Geburt ist eine gesunde, natürliche Körperfunktion, die ohne Angst und Anspannung sanft und friedvoll verlaufen kann"
  },
  {
    "cat": "mental_entspannung",
    "diff": "mid",
    "q": "Wie unterscheidet sich die physiologische „Geburtsatmung“ vom klassischen angeleiteten Pressen (Valsalva-Manöver) beim Tiefertreten des Kindes?",
    "a": [
      "Erhöhte Ausschüttung von Endorphinen, körpereigenen schmerzlindernden Botenstoffen",
      "Ein massiver Anstieg des Stresshormons Adrenalin, der die Skelettmuskulatur dauerhaft versteift",
      "Eine drastische Senkung des Blutzuckerspiegels, die zu tiefer Bewusstlosigkeit der Mutter führt",
      "Die vollständige Lähmung der glatten Gebärmuttermuskulatur durch das Hormon Cortisol im Kreislauf"
    ],
    "explanation": "Beim sanften Hinausatmen bleibt der Beckenboden weich, die Sauerstoffversorgung des Babys bleibt optimal stabil und das Risiko von Dammverletzungen sinkt deutlich.",
    "exp": "Die Mutter atmet lang und sanft nach unten aus, statt mit angehaltenem Atem und verkrampftem Zwerchfell forciert zu drücken"
  },
  {
    "cat": "mental_entspannung",
    "diff": "mid",
    "q": "Welchen nachweisbaren physiologischen Effekt haben positive Geburtsaffirmationen und stärkende Leitsätze auf das Gehirn der Gebärenden?",
    "a": [
      "Sie reduzieren die Aktivität des Angstzentrums in der Amygdala und dämpfen die Ausschüttung hemmender Stresshormone",
      "Sie erhöhen den Cortisolspiegel im Blutkreislauf und beschleunigen dadurch die mechanische Knochenöffnung im Becken",
      "Sie schalten die gesamte Schmerzwahrnehmung im Rückenmark durch sofortige Blockade aller Nervenbahnen dauerhaft ab",
      "Sie stimulieren die Schilddrüse zur vermehrten Bildung von Thyroxin für eine plötzliche Steigerung der Körpertemperatur"
    ],
    "explanation": "Wiederholte beruhigende Sätze („Mein Körper öffnet sich vertrauensvoll“) unterbrechen negative Gedankenschleifen und fördern die Ausschüttung von Entspannungshormonen.",
    "exp": "Sie reduzieren die Aktivität des Angstzentrums in der Amygdala und dämpfen die Ausschüttung hemmender Stresshormone"
  },
  {
    "cat": "mental_entspannung",
    "diff": "mid",
    "q": "Welches bekannte Bild wird bei mentalen Visualisierungen in der Eröffnungsphase häufig genutzt, um das Nachgeben des Muttermunds zu unterstützen?",
    "a": [
      "Das sanfte, blütenblattweise Öffnen einer Knospe oder Rose, die sich ohne jeglichen Kraftaufwand weit entfaltet",
      "Das sprunghafte Platzen eines gespannten Luftballons unter zunehmendem Druck der umgebenden Gebärmutterwände",
      "Das Aufbrechen einer harten Nussschale durch wiederholte rhythmische Krafteinwirkung von außen auf den Kern",
      "Das schnelle Entrollen eines elastischen Gummibandes zur sofortigen Überwindung des inneren Bindegewebswiderstands"
    ],
    "explanation": "Weil das Gehirn visuelle Vorstellungen in reale Muskelentspannung übersetzt, hilft das Bild einer aufblühenden Blume dem Zervixgewebe, weich nachzugeben.",
    "exp": "Das sanfte, blütenblattweise Öffnen einer Knospe oder Rose, die sich ohne jeglichen Kraftaufwand weit entfaltet"
  },
  {
    "cat": "mental_entspannung",
    "diff": "pro",
    "q": "Was versteht man in der Entspannungslehre unter einem „olfaktorischen oder taktilen Entspannungsanker“ für den Geburtsraum?",
    "a": [
      "Dass Gebärende ein intuitives Urwissen über den Geburtsvorgang besitzen",
      "Dass Geburten ohne kontinuierliche ärztliche Medikamentengabe grundsätzlich unmöglich sind",
      "Dass Frauen während der Geburt keinerlei körperliche Schmerzreize empfinden können",
      "Dass die moderne Apparatemedizin alle natürlichen Geburtsprozesse vollständig ersetzt"
    ],
    "explanation": "Wird ein Duft (wie Lavendel) bei täglicher Entspannung gerochen, löst er unter der Geburt im limbischen System sofort das gewohnte Gefühl von Geborgenheit aus.",
    "exp": "Einen in der Schwangerschaft auf Ruhe konditionierten Reiz wie einen Duft oder eine Berührung, der blitzschnell Entspannung abruft"
  },
  {
    "cat": "mental_entspannung",
    "diff": "mid",
    "q": "Welche wesentliche Aufgabe kommt dem Partner oder Geburtsbegleiter im Sinne des sogenannten „Gatekeeper“-Prinzips zu?",
    "a": [
      "Er schützt die ungestörte Atmosphäre, hält äußere Hektik ab und klärt organisatorische Fragen leise mit dem Team",
      "Er führt eigenständig medizinische Tastuntersuchungen durch und entscheidet über die Gabe von Schmerzmedikamenten",
      "Er gibt im Minutentakt laute Kommandos zum Forcieren des Atems und treibt die Gebärende zu Höchstleistungen an",
      "Er dokumentiert den gesamten Geburtsverlauf auf einer digitalen Tafel und übernimmt die primäre Nabelklemmung"
    ],
    "explanation": "Die Gebärende sollte in ihrer intuitiven Geburtsblase verweilen können – der Begleiter hält störende Fragen und Hektik von ihr fern.",
    "exp": "Er schützt die ungestörte Atmosphäre, hält äußere Hektik ab und klärt organisatorische Fragen leise mit dem Team"
  },
  {
    "cat": "mental_entspannung",
    "diff": "pro",
    "q": "Welche Hirnwellenfrequenzen dominieren typischerweise bei einer Gebärenden, die sich in einem Zustand tiefer Hypnotrance oder Tranceentspannung befindet?",
    "a": [
      "Alpha- und Theta-Wellen, die für meditative Versunkenheit, gesteigerte Suggestibilität und Schmerzdämpfung stehen",
      "Hohe Beta- und Gamma-Wellen, die akute Problemlösung, hektische Wachsamkeit und höchste Alarmbereitschaft anzeigen",
      "Reine Delta-Wellen mit Nulllinie, wie sie sonst nur im tiefsten traumlosen Koma oder unter Vollnarkose auftreten",
      "Monotone Mikrowellen-Impulse, die durch künstliche Neurostimulation im Rückenmark gezielt induziert werden"
    ],
    "explanation": "Im Alpha- und Theta-Zustand (4 bis 12 Hz) tritt das rationale Denken zurück, der Körper reagiert hochsensibel auf Entspannungsreize und schüttet reichlich Endorphine aus.",
    "exp": "Alpha- und Theta-Wellen, die für meditative Versunkenheit, gesteigerte Suggestibilität und Schmerzdämpfung stehen"
  },
  {
    "cat": "mental_entspannung",
    "diff": "pro",
    "q": "Welcher faszinierende anatomische Zusammenhang verbirgt sich hinter der bekannten Hebammen-Weisheit „Lockerer Kiefer, lockeres Becken“?",
    "a": [
      "Oxytocin, das auch als Liebes- und Bindungshormon bekannt ist",
      "Adrenalin, das den Flucht- und Kampfmodus im mütterlichen Körper auslöst",
      "Cortisol, das den mütterlichen Stoffwechsel dauerhaft auf Hochtouren hält",
      "Dopamin, das primär bei sportlichen Höchstleistungen ausgeschüttet wird"
    ],
    "explanation": "Wer die Zähne zusammenbeißt, spannt unwillkürlich auch den Schließmuskel- und Beckenbereich an – ein weicher Mund, Tönen oder Pusten öffnet unten den Raum.",
    "exp": "Die Kiefer- und Mundmuskulatur ist über myofasziale Bahnen und das vegetative Nervensystem eng mit dem Beckenboden verknüpft"
  },
  {
    "cat": "mental_entspannung",
    "diff": "mid",
    "q": "Was bewirkt die sogenannte „Light-Touch-Massage“ (Federstrichmassage), die häufig vom Geburtsbegleiter angewendet wird?",
    "a": [
      "Ein hauchzartes Streichen über Rücken oder Arme stimuliert C-Taktil-Nervenfasern und schüttet Endorphine und Oxytocin aus",
      "Ein kräftiges Kneten der Tiefenmuskulatur löst verhärtete Faszien und zwingt den Muttermund mechanisch zur schnellen Weitung",
      "Ein zügiges Reiben mit rauem Leinenstoff erzeugt wohlige Reibungswärme zur direkten Stillung starker Kreuzbeinschmerzen",
      "Ein rhythmischer Druck auf die Dornfortsätze der Lendenwirbel betäubt die Schmerzweiterleitung im Ischiasnerv komplett"
    ],
    "explanation": "Sanfteste Berührungen ohne Druck sprechen spezielle Tastnerven an, die direkt im Belohnungszentrum des Gehirns Entspannung auslösen.",
    "exp": "Ein hauchzartes Streichen über Rücken oder Arme stimuliert C-Taktil-Nervenfasern und schüttet Endorphine und Oxytocin aus"
  },
  {
    "cat": "mental_entspannung",
    "diff": "mid",
    "q": "Warum kann das freie, tiefe Tönen auf Vokalen wie „Aaaa“ oder „Ooooh“ während einer Welle die Geburt spürbar erleichtern?",
    "a": [
      "Weil tiefes Tönen die Stimmritze öffnet, Zwerchfell und Beckenboden entspannt und die Ausatmung natürlich verlängert",
      "Weil tiefe Schallwellen das Fruchtwasser in Schwingung versetzen und den kindlichen Schädelknochen weicher machen",
      "Weil das Tönen den Blutdruck im Kopf senkt und die Plazenta dadurch mehr Nährstoffe aus dem mütterlichen Blut filtert",
      "Weil durch lautes Artikulieren von Vokalen der Kalziumstoffwechsel in den Gebärmuttermuskeln augenblicklich blockiert wird"
    ],
    "explanation": "Hohes Schreien verkrampft Kehle und Becken; tiefes, erdiges Tönen hingegen entspannt die Atemmuskulatur und hilft, die Welle aktiv durch den Körper zu leiten.",
    "exp": "Weil tiefes Tönen die Stimmritze öffnet, Zwerchfell und Beckenboden entspannt und die Ausatmung natürlich verlängert"
  },
  {
    "cat": "mental_entspannung",
    "diff": "mid",
    "q": "Welchem Zweck dient ein vorab verfasster „Geburtsplan“ (oder Geburtswünsche-Bogen) aus Sicht einer bewussten Geburtsvorbereitung vorrangig?",
    "a": [
      "Ein vertrauensvolles Gefühl von Ruhe, Geborgenheit und Dämmerlicht",
      "Helles Neonlicht und laute technische Monitorgeräusche im Raum",
      "Häufige Schichtwechsel des betreuenden Personals und offene Zimmertüren",
      "Kühle Raumtemperaturen unter achtzehn Grad zur Kreislaufstimulation"
    ],
    "explanation": "Ein Geburtsplan ist kein starrer Fahrplan, sondern ein Dialogwerkzeug – er klärt Wünsche (z. B. zu Licht, Nabelschnur, Bonding) für den Fall eines ungestörten Verlaufs.",
    "exp": "Als wertvolle Reflexion eigener Werte und Kommunikationshilfe, um dem Geburtsteam persönliche Prioritäten transparent zu machen"
  },
  {
    "cat": "mental_entspannung",
    "diff": "pro",
    "q": "Auf welcher neurobiologischen Ebene moduliert achtsamkeitsbasierte mentale Geburtsvorbereitung das menschliche Schmerzempfinden?",
    "a": [
      "Adrenalin verengt Blutgefäße und kann Wellen schwächen oder anhalten",
      "Cortisol beschleunigt die Wehenfolge unkontrolliert auf wenige Sekunden",
      "Noradrenalin entspannt den Beckenboden vorzeitig und senkt den Blutdruck",
      "Stresshormone blockieren die Sauerstoffaufnahme in den Lungenbläschen"
    ],
    "explanation": "Schmerz besteht aus Signal plus Bewertung: Gelingt es, die Welle als kraftvolle, produktive Arbeit statt als bedrohlichen Schmerz wahrzunehmen, sinkt das Leiden drastisch.",
    "exp": "Auf Ebene des Thalamus und des limbischen Systems, indem die emotionale Bewertung des Reizes vom Schmerzsignal entkoppelt wird"
  },
  {
    "cat": "mental_entspannung",
    "diff": "mid",
    "q": "Welche beruhigende Rolle spielt die Gestaltung der Geburtsumgebung (z. B. gedimmtes Licht, eigene Musik, gewohnte Kissen)?",
    "a": [
      "Körpereigene Endorphine, die wie ein sanftes Schmerzmittel wirken",
      "Künstliches Morphin, das über die Plazentaschranke gebildet wird",
      "Reines Histamin, das die Schmerzrezeptoren im Gehirn betäubt",
      "Hohe Mengen Serotonin, die einen tiefen Dämmerschlaf erzwingen"
    ],
    "explanation": "Säugetiere gebären instinktiv im Dunkeln und Verborgenen – zu viel Helligkeit und fremde Beobachtung aktivieren den Neokortex und hemmen den natürlichen Geburtsfluss.",
    "exp": "Sie vermittelt dem Stammhirn Sicherheit, schirmt Reize ab und verhindert, dass das logisch denkende Großhirn aktiv stört"
  },
  {
    "cat": "mental_entspannung",
    "diff": "pro",
    "q": "Was beschreibt der Begriff des „Geburtstrance-Zustands“, den viele Frauen bei einer ungestörten, interventionsfreien Geburt erleben?",
    "a": [
      "Einen intuitiven Zustand tiefer Innenkehr, in dem das Zeitgefühl schwindet und der Körper vollautomatisch übernimmt",
      "Eine gefährliche Kreislaufdepression mit Sauerstoffmangel, die sofortige medikamentöse Weckmaßnahmen erfordert",
      "Eine künstlich erzeugte Amnesie, bei der die Gebärende nach der Entbindung keinerlei Erinnerung an das Baby besitzt",
      "Einen Zustand motorischer Starre, bei dem willkürliche Bewegungen der Beine und Arme für mehrere Tage blockiert bleiben"
    ],
    "explanation": "Frauen beschreiben oft, wie sie Raum und Zeit vergessen und sich ganz auf ihren Körper einlassen – ein Zeichen dafür, dass das vegetative Nervensystem perfekt arbeitet.",
    "exp": "Einen intuitiven Zustand tiefer Innenkehr, in dem das Zeitgefühl schwindet und der Körper vollautomatisch übernimmt"
  },
  {
    "cat": "hormone_physiologie",
    "diff": "easy",
    "q": "Welches körpereigene Hormon gilt als wichtigster physiologischer Taktgeber für rhythmische Kontraktionen der Gebärmutter?",
    "a": [
      "Oxytocin, das auch als Bindungs- und Kuschelhormon bekannt ist und bei Berührung, Nähe und Liebe ausgeschüttet wird",
      "Cortisol, das als primäres Alarmhormon in Stresssituationen den schnellen Abbau von Muskelglykogen antreibt",
      "Adrenalin, das bei plötzlicher Gefahr Herzfrequenz und Blutdruck für Flucht- und Kampfreaktionen schlagartig erhöht",
      "Insulin, das den Blutzuckerspiegel senkt und Glukose aus dem Blut in die Leber- und Fettzellen transportiert"
    ],
    "explanation": "Oxytocin steuert die Wellen und die spätere Milchbildung; es wird im Hypothalamus gebildet und bei Vertrauen, Wärme und Zuneigung pulsatil freigesetzt.",
    "exp": "Oxytocin, das auch als Bindungs- und Kuschelhormon bekannt ist und bei Berührung, Nähe und Liebe ausgeschüttet wird"
  },
  {
    "cat": "hormone_physiologie",
    "diff": "mid",
    "q": "Was geschieht typischerweise mit dem Geburtsverlauf, wenn die Gebärende plötzlich starker Kälte, Hektik oder Angst ausgesetzt wird?",
    "a": [
      "Adrenalin wird ausgeschüttet, hemmt die Bildung von Oxytocin und lässt die Wellen schwächer werden oder ganz stoppen",
      "Der Muttermund weitet sich reflexartig um mehrere Zentimeter, um die Geburt im Gefahrenfall sofort zu beschleunigen",
      "Die Plazenta löst sich vorzeitig von der Gebärmutterwand ab, um das ungeborene Kind vor mütterlichem Stress zu schützen",
      "Die Nieren stellen die Urinproduktion ein und leiten sämtliche Körperflüssigkeiten direkt in den Fruchtblasenraum um"
    ],
    "explanation": "Aus evolutionärer Sicht lebensrettend: Droht Gefahr, stoppt Adrenalin die Geburt, damit die Mutter fliehen und an einem sicheren Ort weitergebären kann.",
    "exp": "Adrenalin wird ausgeschüttet, hemmt die Bildung von Oxytocin und lässt die Wellen schwächer werden oder ganz stoppen"
  },
  {
    "cat": "hormone_physiologie",
    "diff": "mid",
    "q": "Welche körpereigenen Botenstoffe wirken unter einer interventionsarmen Geburt als natürliches Schmerzmittel und erzeugen ein Gefühl von Losgelöstheit?",
    "a": [
      "Den aufrechten Stand oder das Vorbeugen im Vierfüßlerstand",
      "Das flache Liegen auf dem Rücken mit hochgelagerten Beinen",
      "Das feste Anschnallen im gynäkologischen Geburtsstuhl",
      "Ein unbewegliches Sitzen im engen Schneidersitz am Boden"
    ],
    "explanation": "Mit steigender Intensität der Wellen schüttet der Körper vermehrt Endorphine aus – eine Art körpereigenes Betäubungsmittel, das Gelassenheit und Kraft schenkt.",
    "exp": "Endorphine, deren schmerzlindernde Potenz die Wirkung von Morphin um ein Vielfaches übertreffen kann"
  },
  {
    "cat": "hormone_physiologie",
    "diff": "pro",
    "q": "Welche synergistische Rolle spielt das Schlaf- und Dunkelheitshormon Melatonin während des natürlichen Geburtsbeginns?",
    "a": [
      "Die Schwerkraft unterstützt das Tiefertreten des kindlichen Kopfes",
      "Die Gebärmutter wird dabei von außen mit mechanischem Druck entlastet",
      "Der mütterliche Puls fällt automatisch auf unter fünfzig Schläge",
      "Das Becken wird durch den aufrechten Stand absolut starr fixiert"
    ],
    "explanation": "Gebärmutterzellen besitzen Melatonin-Rezeptoren: Zusammen mit Oxytocin entfaltet Melatonin eine stark wehenfördernde Synergie – gedimmtes Licht ist daher pure Geburtsbiologie.",
    "exp": "Melatonin verstärkt im Gehirn die Wirkung von Oxytocin, weshalb natürliche Geburten besonders häufig nachts starten"
  },
  {
    "cat": "hormone_physiologie",
    "diff": "pro",
    "q": "Aus welchen zwei funktionell gegensätzlich arbeitenden Muskelschichten besteht der Uterus, und wie arbeiten sie bei Entspannung zusammen?",
    "a": [
      "Längsmuskelfasern ziehen aktiv nach oben und öffnen den Muttermund, während Ringmuskeln am Gebärmutterhals weich nachgeben",
      "Ringmuskelfasern ziehen sich krampfartig zusammen, während die Längsmuskelfasern erschlafft gegen das Becken drücken",
      "Quergestreifte Skelettmuskeln arbeiten autonom gegen das Zwerchfell, während glatte Muskelfasern den Blutfluss drosseln",
      "Zirkuläre Faszienbänder versteifen das Gewebe, während vertikale Sehnenplatten die kindliche Drehung mechanisch blockieren"
    ],
    "explanation": "Bei Angst verkrampfen die Ringmuskeln unten und arbeiten gegen die Längsmuskeln oben; bei Entspannung zieht die obere Muskulatur den Zervixsaum mühelos auf.",
    "exp": "Längsmuskelfasern ziehen aktiv nach oben und öffnen den Muttermund, während Ringmuskeln am Gebärmutterhals weich nachgeben"
  },
  {
    "cat": "hormone_physiologie",
    "diff": "easy",
    "q": "Welchen messbaren mechanischen Vorteil bieten aufrechte Gebärhaltungen (wie Hocke, Stehen oder Vierfüßlerstand) gegenüber flachem Liegen?",
    "a": [
      "Er öffnet das Becken und entlastet den Rücken bei Kreuzschmerzen",
      "Er blockiert das Tiefertreten des Kindes zur gezielten Geburtsverzögerung",
      "Er verhindert das rhythmische Veratmen von intensiven Wehenwellen",
      "Er dient ausschließlich der Schonung der Kniegelenke der Hebamme"
    ],
    "explanation": "Im Sitzen oder Knien kann das Kreuzbein frei nach hinten ausweichen, während auf dem Rücken der Druck des Bettes die knöcherne Beckenöffnung verengt.",
    "exp": "Der Beckenausgang kann sich um bis zu zwanzig bis dreißig Prozent weiter öffnen, und die Schwerkraft unterstützt den Tiefertritt"
  },
  {
    "cat": "hormone_physiologie",
    "diff": "mid",
    "q": "Welches Hormon lockert in der Schwangerschaft gezielt Bänder, Knorpel und Gelenke des mütterlichen Beckens für den Geburtsvorgang?",
    "a": [
      "Relaxin, das Schambeinfuge und Beckenringbänder dehnbarer macht",
      "Progesteron, das ausschließlich den Cholesterinspiegel im Blut regelt",
      "Östrogen, das die Knochensubstanz des Beckens dauerhaft verhärtet",
      "Thyroxin, das den Sauerstoffverbrauch der Skelettmuskeln verdoppelt"
    ],
    "explanation": "Relaxin macht das harte Becken elastisch – erst dadurch können sich Schambein und Kreuzbein unter der Geburt flexibel dem Köpfchen anpassen.",
    "exp": "Relaxin, das die Dehnbarkeit der Schambeinfuge (Symphyse) und der Iliosakralgelenke im Beckenring maßgeblich erhöht"
  },
  {
    "cat": "hormone_physiologie",
    "diff": "mid",
    "q": "Was kennzeichnet die sogenannte „Latenzphase“ zu Beginn des Geburtsgeschehens aus physiologischer Sicht?",
    "a": [
      "Der Gebärmutterhals verkürzt sich und wird weich, während unregelmäßige Wellen den Körper sanft einstimmen",
      "Der Muttermund öffnet sich schlagartig innerhalb von zehn Minuten vollständig von null auf zehn Zentimeter",
      "Die Plazenta löst sich ab und das Baby muss innerhalb weniger Sekunden per Notkaiserschnitt entbunden werden",
      "Die Fruchtblase platzt zwingend mit lautem Knall, bevor überhaupt die erste spürbare Kontraktion einsetzt"
    ],
    "explanation": "Die Latenzphase kann Stunden oder Tage dauern: Hier leistet der Körper die unscheinbare, aber gewaltige Vorarbeit des Weichwerdens und Verstreichens.",
    "exp": "Der Gebärmutterhals verkürzt sich und wird weich, während unregelmäßige Wellen den Körper sanft einstimmen"
  },
  {
    "cat": "hormone_physiologie",
    "diff": "mid",
    "q": "Wie ist die „Eröffnungsphase“ einer Geburt medizinisch definiert?",
    "a": [
      "Vom Beginn regelmäßiger Wellen bis zur vollständigen Muttermundsöffnung",
      "Ausschließlich die letzten fünf Minuten des Kopfdurchtritts durch das Becken",
      "Die ersten zwei Wochen vor dem errechneten Geburtstermin mit Vorwehen",
      "Die Phase zwischen Plazentaausstoßung und dem ersten Anlegen an die Brust"
    ],
    "explanation": "In dieser Phase öffnet sich die Zervix Zentimeter für Zentimeter, bis der Weg für das Tiefertreten des Babys frei ist.",
    "exp": "Sie umfasst den Zeitraum vom Beginn regelmäßiger wirksamer Wellen bis zur vollständigen Öffnung des Muttermunds auf zehn Zentimeter"
  },
  {
    "cat": "hormone_physiologie",
    "diff": "mid",
    "q": "Warum gilt die sogenannte „Übergangsphase“ (Transition) kurz vor Erreichen der vollen Muttermundsweite als emotional besonders intensiv?",
    "a": [
      "Ein Hormonschub bringt Frauen an Grenzen – ein Zeichen der nahen Geburt",
      "Die Schmerzrezeptoren schalten sich plötzlich komplett und dauerhaft ab",
      "Das vegetative Nervensystem wechselt unvermittelt in eine tiefe Starre",
      "Die Gebärmuttermuskulatur stellt die Kontraktionen für mehrere Stunden ein"
    ],
    "explanation": "Sätze wie „Ich schaffe das nicht mehr!“ oder „Ich will nach Hause!“ signalisieren erfahrenen Geburtsbegleitern: Die Geburt biegt auf die Zielgerade ein.",
    "exp": "Ein Hormonschub lässt viele Frauen an ihre Grenzen stoßen und zweifeln, was Hebammen als untrügliches Zeichen der nahen Geburt kennen"
  },
  {
    "cat": "hormone_physiologie",
    "diff": "pro",
    "q": "Was beschrieb der renommierte französische Geburtshelfer Michel Odent mit dem Phänomen des „Fötalen Ausstoßreflexes“?",
    "a": [
      "Den kraftvollen, unwillkürlichen Schiebereflex am Ende der Geburt",
      "Eine krankhafte Abstoßungsreaktion der Gebärmutter gegen fetale Proteine",
      "Ein reflexartiges Schließen des Muttermunds bei starker Erschöpfung",
      "Das bewusste Anhalten der Atmung unter maximaler Anspannung im Liegen"
    ],
    "explanation": "Ist eine Frau völlig ungestört und fühlt sich sicher, schiebt der Körper das Kind durch einen archaischen Reflex fast von selbst heraus – aktives Pressen ist oft gar nicht nötig.",
    "exp": "Einen unwillkürlichen, kraftvollen Schiebereflex des Körpers am Ende der Geburt, der ohne bewusstes Forcieren geschieht"
  },
  {
    "cat": "hormone_physiologie",
    "diff": "mid",
    "q": "Welches zentrale Ereignis leitet die „Plazentaphase“ (Nachgeburtsphase) unmittelbar nach der Geburt des Babys ein?",
    "a": [
      "Ein erneuter Oxytocinschub durch Haut- und Blickkontakt mit dem Baby",
      "Die sofortige medikamentöse Injektion von Gerinnungshemmern in die Nabelschnur",
      "Ein operativer Schnitt zur manuellen Ablösung der Plazenta von der Uteruswand",
      "Das unverzügliche Baden des Neugeborenen in kaltem Wasser zur Kreislaufbelebung"
    ],
    "explanation": "Sobald das Baby auf der Brust liegt, schießt Oxytocin hoch – die Gebärmutter zieht sich zusammen und löst den Mutterkuchen sicher und blutungsarm ab.",
    "exp": "Ein erneuter mütterlicher Oxytocinschub, der durch den ersten Hautkontakt und den Blickkontakt mit dem Neugeborenen verstärkt wird"
  },
  {
    "cat": "hormone_physiologie",
    "diff": "mid",
    "q": "Was versteht man unter dem sogenannten „Nestbautrieb“ in den letzten Wochen vor der Entbindung?",
    "a": [
      "Einen Energieschub, bei dem Schwangere instinktiv das Zuhause vorbereiten",
      "Eine behandlungsbedürftige Zwangsstörung durch extremen Kalziummangel",
      "Ein depressives Erschöpfungsmuster kurz vor dem errechneten Entbindungstermin",
      "Einen plötzlichen Appetitverlust zum Abbau mütterlicher Fettreserven"
    ],
    "explanation": "Gesteuert durch Östrogene und Prolaktin: Wie Vögel vor dem Schlüpfen bereiten werdende Mütter instinktiv eine sichere, saubere Umgebung für das Neugeborene vor.",
    "exp": "Einen biologisch gesteuerten Energieschub, bei dem Schwangere instinktiv das Zuhause putzen, einrichten und vorbereiten"
  },
  {
    "cat": "hormone_physiologie",
    "diff": "mid",
    "q": "Warum wird Schwangeren im letzten Trimester und unter der Geburt von flachem Liegen auf dem Rücken (Vena-Cava-Syndrom) abgeraten?",
    "a": [
      "Die Gebärmutter kann die untere Hohlvene komprimieren (Vena-Cava-Syndrom)",
      "Die Lendenwirbelkörper können unter dem Gewicht der Fruchtblase anbrechen",
      "Der Mageninhalt gelangt dabei unweigerlich in die Bronchien der Schwangeren",
      "Das kindliche Gehirn erhält in Rückenlage zu viel sauerstoffreiches Blut"
    ],
    "explanation": "Schwindel, Übelkeit und Herzrasen im Liegen sind typische Zeichen: Aufrechte oder seitliche Haltungen halten den Kreislauf stabil und die Sauerstoffversorgung optimal.",
    "exp": "Die schwere Gebärmutter drückt auf die untere Hohlvene und kann den Blutrückfluss zum Herzen sowie zum Baby behindern"
  },
  {
    "cat": "hormone_physiologie",
    "diff": "pro",
    "q": "Welche erstaunliche biologische Eigenschaft besitzt das Fruchtwasser hinsichtlich seiner Zirkulation und Erneuerung?",
    "a": [
      "Es wird kontinuierlich filtriert und erneuert sich über fetales Schlucken und Ausscheiden alle paar Stunden komplett",
      "Es ist eine sterile, statische Flüssigkeit, die einmalig im ersten Trimester gebildet wird und unverändert verbleibt",
      "Es verdampft in den letzten Wochen vor der Geburt vollständig über die mütterliche Haut und hinterlässt ein Vakuum",
      "Es besteht zu achtzig Prozent aus mütterlichem Knochenmark und dient der mechanischen Stoßdämpfung des Beckenrings"
    ],
    "explanation": "Das Baby trinkt täglich Fruchtwasser und scheidet es wieder aus; die Flüssigkeit wird im ständigen Austausch über die Eihäute und Plazenta rasend schnell regeneriert.",
    "exp": "Es wird kontinuierlich filtriert und erneuert sich über fetales Schlucken und Ausscheiden alle paar Stunden komplett"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "easy",
    "q": "Welche rechtliche Besonderheit gilt in Deutschland bezüglich der Betreuung einer normalen Schwangerschaft und Geburt durch Hebammen?",
    "a": [
      "Hebammen sind Fachkräfte für Physiologie; ihre Anwesenheit ist gesetzlich vorgeschrieben",
      "Hebammen dürfen Schwangere nur nach ausdrücklicher Genehmigung eines Facharztes betreuen",
      "Geburten dürfen in Deutschland ausschließlich von promovierten Chirurgen geleitet werden",
      "Hebammen arbeiten grundsätzlich nur ehrenamtlich ohne rechtliche Absicherung im Kreißsaal"
    ],
    "explanation": "Die sogenannte Hebammenhinzuziehungspflicht (§ 4 HebG) garantiert, dass keine Geburt in Deutschland ohne fachkundige Hebamme stattfinden darf – Ärzte hingegen sind bei normalem Verlauf nicht zwingend nötig.",
    "exp": "Hebammen sind eigenständige Fachkräfte für Physiologie; bei jeder Geburt (auch in der Klinik) muss gesetzlich eine Hebamme anwesend sein"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "easy",
    "q": "Worin liegt der primäre Unterschied zwischen den Aufgaben einer Hebamme und den Aufgaben einer Doula (Geburtsbegleiterin)?",
    "a": [
      "Die Hebamme trägt medizinische Verantwortung, die Doula begleitet kontinuierlich emotional",
      "Die Doula führt operative Eingriffe durch, während die Hebamme für die Schmerztherapie zuständig ist",
      "Hebammen begleiten ausschließlich Hausgeburten, Doulas arbeiten nur in Universitätskliniken",
      "Doulas verschreiben rezeptpflichtige Medikamente, Hebammen leisten ausschließlich mentale Hilfe"
    ],
    "explanation": "Eine Doula ersetzt keine Hebamme: Sie weicht der Frau nicht von der Seite, massiert, ermutigt und bietet eine ununterbrochene 1:1-Präsenz.",
    "exp": "Die Hebamme trägt die medizinische Verantwortung, während die Doula kontinuierliche emotionale, seelische und praktische Unterstützung leistet"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "mid",
    "q": "Welches Ziel verfolgt die geburtsvorbereitende Akupunktur (z. B. nach dem Mannheimer Schema) ab etwa der 36. oder 37. Schwangerschaftswoche?",
    "a": [
      "Sie soll das Gewebe des Muttermunds erweichen und kann die Dauer der Eröffnungsphase bei Erstgebärenden statistisch verkürzen",
      "Sie soll den Geburtstermin auf den Kalendertag genau fixieren und vorzeitige Wehen vor der 40. Woche vollständig unterdrücken",
      "Sie führt zu einer sofortigen Taubheit des Unterleibs, sodass die Geburt völlig ohne Schmerzempfindung abläuft",
      "Sie regt das kindliche Längenwachstum an und verdoppelt die Nährstoffaufnahme über die Plazentaschranke"
    ],
    "explanation": "Studien der Universitätsfrauenklinik Mannheim zeigten: Wöchentliche Akupunkturpunkte an Beinen und Füßen fördern die Zervixreifung und verkürzten die Eröffnungszeit messbar.",
    "exp": "Sie soll das Gewebe des Muttermunds erweichen und kann die Dauer der Eröffnungsphase bei Erstgebärenden statistisch verkürzen"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "pro",
    "q": "Was versteht man unter dem traditionellen Verfahren der „Moxibustion“ bei einer Beckenendlage (Steißlage) des Kindes um die 33. bis 36. Woche?",
    "a": [
      "Gezielte Erwärmung des Punkts Blase 67 am kleinen Zeh mit Beifußkraut",
      "Das mechanische Drehen des Babys von außen durch zwei Ärzte unter Druck",
      "Eine Akupunkturbehandlung an der Ohrmuschel mit feinen Goldnadeln",
      "Das rhythmische Abklopfen des Kreuzbeins mit einer Holzklöppel-Technik"
    ],
    "explanation": "Die milde Hitze am Akupunkturpunkt am äußeren Nagelwinkel des kleinen Zehs regt die Kindsbewegungen an und kann das Baby dazu motivieren, sich kopfüber zu drehen.",
    "exp": "Die gezielte Erwärmung des Akupunkturpunkts Blase 67 am kleinen Zeh mit einer glimmenden Beifußkraut-Zigarre zur Bewegungsanregung"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "mid",
    "q": "Aus welcher Hebammen-Tradition stammt die Rebozo-Technik, bei der ein langes gewebtes Tuch zur Beckenentspannung genutzt wird?",
    "a": [
      "Aus der mexikanischen und mittelamerikanischen Hebammentradition",
      "Aus der skandinavischen Volksheilkunde des neunzehnten Jahrhunderts",
      "Aus alten Klosterschriften des mitteleuropäischen Frühmittelalters",
      "Aus der traditionellen japanischen Medizin zur Schmerzlinderung"
    ],
    "explanation": "Mit dem Rebozo-Tuch wiegt die Hebamme sanft das Becken der Schwangeren – das lockert tiefe Verspannungen und hilft dem Baby, die beste Position einzunehmen.",
    "exp": "Aus der traditionellen mexikanischen und mittelamerikanischen Hebammenkunst, wo Tücher seit Jahrhunderten Begleiterinnen sind"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "easy",
    "q": "Ab welcher Schwangerschaftswoche wird Schwangeren die regelmäßige Dammmassage mit naturbelassenem Pflanzenöl typischerweise empfohlen?",
    "a": [
      "Ab etwa der 34. Schwangerschaftswoche, um die Elastizität und Durchblutung des Dammgewebes kontinuierlich zu fördern",
      "Bereits ab der 6. Schwangerschaftswoche, um die Einnistung der Plazenta im unteren Uterusteil mechanisch zu festigen",
      "Erst am Tag des errechneten Geburtstermins, um den spontanen Fruchtblasenriss durch manuelle Reizung herbeizuführen",
      "Ausschließlich nach der Entbindung im Wochenbett, um die Rückbildung der Schwellung am Scheideneingang zu beschleunigen"
    ],
    "explanation": "Drei- bis viermal wöchentlich für wenige Minuten mit Mandel- oder Weizenkeimöl massiert: Das macht das Gewebe dehnbar und senkt das Risiko von Rissen oder Schnitten.",
    "exp": "Ab etwa der 34. Schwangerschaftswoche, um die Elastizität und Durchblutung des Dammgewebes kontinuierlich zu fördern"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "easy",
    "q": "Worauf liegt beim Schwangerschaftsyoga (Prenatal Yoga) neben kräftigenden Haltungen der größte funktionelle Fokus?",
    "a": [
      "Auf dem bewussten Spüren und aktiven Loslassen des Beckenbodens sowie auf tiefer, vertrauensvoller Atemwahrnehmung",
      "Auf extremen Rückbeugen und intensiven Bauchmuskelübungen zur Verhinderung von Dehnungsstreifen an der Haut",
      "Auf schweißtreibendem Intervalltraining mit Pulswerten über hundertachtzig Schlägen pro Minute für maximale Ausdauer",
      "Auf dem stundenlangen Verharren im Kopfstand, um das Gewicht des Uterus vollständig von der Beckenöffnung zu nehmen"
    ],
    "explanation": "Viele Frauen lernen im Alltag nur das Anspannen; beim Gebären ist jedoch die Fähigkeit entscheidend, den Beckenboden vollkommen weich nachgeben zu lassen.",
    "exp": "Auf dem bewussten Spüren und aktiven Loslassen des Beckenbodens sowie auf tiefer, vertrauensvoller Atemwahrnehmung"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "mid",
    "q": "Welche traditionelle Wirkung wird dem Trinken von Himbeerblättertee in den letzten vier bis sechs Wochen vor der Entbindung nachgesagt?",
    "a": [
      "Er soll die Beckenmuskulatur und den Gebärmutterhals auflockern sowie die Durchblutung des kleinen Beckens fördern",
      "Er verhindert zuverlässig jede Form von morgendlicher Schwangerschaftsübelkeit im gesamten ersten Trimester",
      "Er erhöht den Hämoglobinwert im Blut schlagartig und ersetzt die Zufuhr von eisenreichen Lebensmitteln komplett",
      "Er desinfiziert das Fruchtwasser von innen heraus und schützt vor einer vorzeitigen bakteriellen Infektion"
    ],
    "explanation": "Himbeerblättertee ist ein Klassiker der Hebammenkunde: Er wirkt wehenregulierend und durchblutungsfördernd auf die glatte Beckenmuskulatur.",
    "exp": "Er soll die Beckenmuskulatur und den Gebärmutterhals auflockern sowie die Durchblutung des kleinen Beckens fördern"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "mid",
    "q": "Wie wird ein traditionelles Heublumendampfbad ab der etwa 38. Schwangerschaftswoche angewendet und was bewirkt es?",
    "a": [
      "Die Schwangere sitzt über heißem Heublumendampf; das Dammgewebe entspannt",
      "Heublumen werden als heißer Wickel fest um den Brustkorb der Mutter gewickelt",
      "Heublumensud wird zur Förderung der Blutgerinnung vor der Geburt getrunken",
      "Trockene Heublumen werden auf die Bettwäsche gestreut zur Raumluftbefeuchtung"
    ],
    "explanation": "Die aufsteigende feuchte Wärme fördert die Durchblutung, erweicht die Muskulatur des Beckenbodens und wird von vielen Frauen als wohltuend empfunden.",
    "exp": "Die Schwangere setzt sich über eine Schüssel mit heißem Heublumen-Aufguss; der feuchte Dampf entspannt das Dammgewebe"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "pro",
    "q": "Auf welcher physiologischen Hypothese basiert das sogenannte Ernährungskonzept nach Prof. Dr. Frank Louwen in den letzten sechs Schwangerschaftswochen?",
    "a": [
      "Wenig einfache Kohlenhydrate senken Insulinspitzen, Oxytocin dockt besser an",
      "Reine Rohkost-Ernährung verringert die Knochendichte des kindlichen Schädels",
      "Fettreiche Kost stimuliert die vorzeitige Bildung von Kolostrum in den Brüsten",
      "Salzfreies Fasten trocknet das Fruchtwasser gezielt zur Wehenauslösung aus"
    ],
    "explanation": "Insulin und Prostaglandine nutzen teils ähnliche Rezeptoren: Hohe Insulinspiegel können die Rezeptoren für Geburtshormone blockieren und Schmerzen verstärken.",
    "exp": "Der Verzicht auf einfache Kohlenhydrate senkt Insulinspitzen, wodurch körpereigenes Oxytocin ungehindert an Rezeptoren andocken kann"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "easy",
    "q": "Welches ätherische Öl gilt in der Aromatherapie der Geburtshilfe als bewährter Begleiter für Ruhe, Entspannung und Schmerzlinderung?",
    "a": [
      "Echtes Lavendelöl (Lavandula angustifolia)",
      "Scharfes Pfefferminzöl in hoher Dosierung",
      "Reines Nelkenblätteröl als Raumspray",
      "Konzentriertes Rosmarinöl zur Hautkühlung"
    ],
    "explanation": "Lavendelduft senkt nachweislich Angst und Anspannung – ob in der Duftlampe, als Massageölzusatz oder als Riechtuch am Kissen.",
    "exp": "Echtes Lavendelöl (Lavandula angustifolia), das nachweislich beruhigend auf das zentrale Nervensystem wirkt"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "pro",
    "q": "Warum sollte das ätherische Öl von Muskatellersalbei (Clary Sage) in der Schwangerschaft erst um den errechneten Geburtstermin genutzt werden?",
    "a": [
      "Weil es östrogenähnliche Inhaltsstoffe besitzt und stark wehenanregend sowie uterusstimulierend wirken kann",
      "Weil es die Aufnahme von Eisen im Darm hemmt und innerhalb weniger Tage zu schwerer Anämie führen kann",
      "Weil sein starker Duft bei ungeborenen Kindern zu plötzlichem Herzrasen und Hyperaktivität im Mutterleib führt",
      "Weil es die Blutgerinnung dauerhaft herabsetzt und bei Verletzungen zu unstillbaren Blutungen führt"
    ],
    "explanation": "Muskatellersalbei ist ein kraftvolles Geburtstropfen-Öl: Früher angewendet könnte es vorzeitige Kontraktionen auslösen – am Termin entspannt und fördert es Wellen.",
    "exp": "Weil es östrogenähnliche Inhaltsstoffe besitzt und stark wehenanregend sowie uterusstimulierend wirken kann"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "easy",
    "q": "Wie lässt sich die pflanzliche Eisenaufnahme aus Lebensmitteln wie Haferflocken, Nüssen oder Hirse am effektivsten steigern?",
    "a": [
      "Kombination mit Vitamin C wie Orangensaft oder Paprika",
      "Gleichzeitiges Trinken von schwarzem Kaffee oder Tee",
      "Verzehr großer Mengen Kalzium in Milchprodukten dazu",
      "Erhitzen der pflanzlichen Nahrung auf über hundert Grad"
    ],
    "explanation": "Vitamin C wandelt pflanzliches dreiwertiges Eisen in die vom Darm leicht aufnehmbare zweiwertige Form um; Kaffee und schwarzer Tee hemmen die Aufnahme.",
    "exp": "Durch die gleichzeitige Kombination mit Vitamin-C-reichen Lebensmitteln wie Orangensaft, Beeren oder Paprika"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "mid",
    "q": "Welchem Zweck dient der freiwillige Screening-Abstrich auf B-Streptokokken (GBS) zwischen der 35. und 37. Schwangerschaftswoche?",
    "a": [
      "Prüfung der Vaginalflora zum Schutz des Kindes vor B-Streptokokken",
      "Messung der genauen Fruchtwassermenge zur Nierenfunktionsprüfung",
      "Ausschluss von chromosomalen Anomalien durch Zellanalyse der Mutter",
      "Bestimmung der kindlichen Blutgruppe vor dem Durchtritt durchs Becken"
    ],
    "explanation": "B-Streptokokken sind für gesunde Frauen harmlos, können beim Kind beim Durchtritt aber selten Lungenentzündungen auslösen – ein Schnellschutz unter der Geburt beugt vor.",
    "exp": "Er prüft die Besiedlung der Vaginalflora, um Neugeborene bei Bedarf unter der Geburt durch Antibiotika vor Infektionen zu schützen"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "pro",
    "q": "Was besagt die offizielle Leitlinie zur Betreuung unkomplizierter Schwangerschaften bezüglich des routinemäßigen Dauer-CTGs?",
    "a": [
      "Bei gesunden Schwangeren ohne Risiken bringt Dauer-CTG keinen Überlebensvorteil, erhöht aber die Rate operativer Eingriffe",
      "Ein kontinuierliches Dauer-CTG ab der zwanzigsten Woche ist gesetzlich verpflichtend für jede Schwangerschaftsvorsorge",
      "Das CTG sollte grundsätzlich nur im Stehen durchgeführt werden, da die Herztöne im Liegen technisch nicht erfassbar sind",
      "Durch Ultraschallwellen des CTG-Geräts wird die kindliche Knochenbildung nachweislich im letzten Trimester gestärkt"
    ],
    "explanation": "Internationale Leitlinien empfehlen bei normalem Geburtsverlauf das intermittierende Abhören (z. B. mit Dopton oder Stethoskop), um Mobilität und Entspannung zu wahren.",
    "exp": "Bei gesunden Schwangeren ohne Risiken bringt Dauer-CTG keinen Überlebensvorteil, erhöht aber die Rate operativer Eingriffe"
  },
  {
    "cat": "begleitung_vorsorge",
    "diff": "mid",
    "q": "Welche ganzheitliche Maßnahme hilft vielen Schwangeren bei typischen Wassereinlagerungen (Ödemen) in den Beinen am besten?",
    "a": [
      "Ausreichend Wasser trinken, Beine hochlegen und kühle Fußbäder",
      "Strikte Reduzierung der Trinkmenge auf unter einen halben Liter",
      "Kompletter Verzicht auf Speisesalz und dauerhafte Bettruhe",
      "Einnahme von entwässernden Medikamenten ohne ärztlichen Rat"
    ],
    "explanation": "Veraltete Ratschläge wie „Salz- und Trinkverzicht“ sind überholt und gefährlich – der Körper benötigt ausreichend Salz und Flüssigkeit, um das Plazentavolumen stabil zu halten.",
    "exp": "Ausreichend Wasser trinken, salzreiche Kost beibehalten, Beine hochlegen und Spaziergänge im kühlen Wasser (Kneippen)"
  },
  {
    "cat": "geburtsorte_bonding",
    "diff": "easy",
    "q": "Was zeichnet einen hebammengeleiteten Kreißsaal (Hebammenkreißsaal) an einer Geburtsklinik im Wesentlichen aus?",
    "a": [
      "Gesunde Frauen werden eigenverantwortlich von Hebammen betreut",
      "Die Geburt wird vollständig von Studenten ohne Hebamme geleitet",
      "Ein OP-Team steht permanent steril gewaschen am Kopfende bereit",
      "Schwangere müssen während der gesamten Geburt fest im Bett liegen"
    ],
    "explanation": "Das Beste aus zwei Welten: Selbstbestimmte 1:1-Hebammenbetreuung in wohnlicher Atmosphäre mit dem Sicherheitsnetz eines OP-Teams im selben Haus.",
    "exp": "Gesunde Frauen werden eigenverantwortlich von Hebammen ohne ärztliche Eingriffe betreut, die Klinikmedizin steht im Hintergrund bereit"
  },
  {
    "cat": "geburtsorte_bonding",
    "diff": "easy",
    "q": "Was ist ein Geburtshaus und welche Voraussetzungen müssen für eine Geburt dort typischerweise erfüllt sein?",
    "a": [
      "Eine außerklinische Hebammen-Einrichtung für physiologische Geburten",
      "Ein Sanatorium für mehrwöchige stationäre Aufenthalte vor der Entbindung",
      "Eine chirurgische Spezialklinik ausschließlich für Wunschkaiserschnitte",
      "Eine ambulante Praxis nur für Hebammensprechstunden ohne Entbindungsraum"
    ],
    "explanation": "Im Geburtshaus steht die persönliche Beziehung zur vertrauten Hebamme im Mittelpunkt – bei auftretenden Komplikationen wird ruhig in eine Klinik verlegt.",
    "exp": "Eine außerklinische, von Hebammen geführte Einrichtung für Frauen mit unkomplizierter Schwangerschaft und physiologischem Verlauf"
  },
  {
    "cat": "geburtsorte_bonding",
    "diff": "mid",
    "q": "Was zeigen wissenschaftliche Untersuchungen (wie die QUAG-Statistiken) zur Sicherheit geplanter außerklinischer Geburten bei gesunden Schwangeren?",
    "a": [
      "Signifikant weniger Interventionen bei gleicher kindlicher Sicherheit",
      "Über fünfzig Prozent Notfälle durch fehlende Sauerstoffflaschen",
      "Verdopplung der Kaiserschnittrate durch mangelnde Überwachung",
      "Grundsätzliches Verbot jeglicher Schmerzlinderung bei Wehen"
    ],
    "explanation": "Die Gesellschaft für Qualität in der außerklinischen Geburtshilfe belegt: Bei sorgfältiger Vorsorge und erfahrener Hebamme sind Hausgeburten und Geburtshausgeburten sehr sicher.",
    "exp": "Sie weisen bei gleicher kindlicher Sicherheit signifikant weniger Interventionen wie Dammschnitte oder Kaiserschnitte auf"
  },
  {
    "cat": "geburtsorte_bonding",
    "diff": "easy",
    "q": "Welche wohltuenden physiologischen Vorteile bietet das Verweilen in einer warmen Geburtswanne (Wassergeburt)?",
    "a": [
      "Auftrieb entlastet Gelenke, warmes Wasser lindert Schmerzen und weicht Damm",
      "Das Wasser kühlt die Körpertemperatur gezielt ab, um Wehen zu verlangsamen",
      "Der Wasserdruck verhindert das Öffnen des Muttermunds vor Eintreffen des Arztes",
      "Wassergeburten sind gesetzlich nur bei Mehrlingsgeburten im Krankenhaus erlaubt"
    ],
    "explanation": "Wasser wird oft als „natürliche PDA“ bezeichnet: Frauen fühlen sich leichter, können die Position mühelos wechseln und das Beckengewebe dehnt sich sanfter.",
    "exp": "Der hydrostatische Auftrieb entlastet Muskeln und Gelenke, warmes Wasser wirkt schmerzlindernd und das Dammgewebe wird weich"
  },
  {
    "cat": "geburtsorte_bonding",
    "diff": "pro",
    "q": "Warum atmet ein gesundes Neugeborenes bei einer Wassergeburt unter Wasser nicht ein, bevor es an die Oberfläche gehoben wird?",
    "a": [
      "Wegen des Tauchreflexes; der Atemreiz entsteht erst durch Luftkontakt im Gesicht",
      "Weil die Lungen des Babys vor der Geburt vollkommen mit Schleim verklebt sind",
      "Weil das Neugeborene unter Wasser über die Nabelschnur vollbeatmet wird",
      "Weil Neugeborene in den ersten Lebensminuten keinen Sauerstoff benötigen"
    ],
    "explanation": "Solange das Baby unter Wasser ist und die Nabelschnur pulsiert, wird es wie im Bauch versorgt – erst der kühle Luftzug an Nase und Mund triggert den ersten Atemzug.",
    "exp": "Wegen des angeborenen Tauchreflexes (Diving Reflex), da der erste Atemzug erst durch Kältereiz und Luftkontakt an der Gesichtshaut ausgelöst wird"
  },
  {
    "cat": "geburtsorte_bonding",
    "diff": "mid",
    "q": "Was versteht man unter dem physiologischen „Auspulsierenlassen“ der Nabelschnur (Optimal Cord Clamping)?",
    "a": [
      "Man wartet mit dem Abklemmen und Durchtrennen, bis die Nabelschnur schlaff und weiß ist und kein Blut mehr zum Baby pulsiert",
      "Die Nabelschnur wird innerhalb der ersten fünf Sekunden durchtrennt, um ein Rückfließen von Giftstoffen zur Plazenta zu verhindern",
      "Die Nabelschnur wird mit Eis gekühlt, um den Herzschlag des Neugeborenen künstlich auf dreißig Schläge zu drosseln",
      "Das Nabelschnurblut wird vollständig in einer Zentrifuge aufbereitet, bevor es dem Baby am zweiten Lebenstag injiziert wird"
    ],
    "explanation": "Bis zu einem Drittel des gesamten kindlichen Blutvolumens befindet sich bei der Geburt noch in der Plazenta – das Auspulsieren sichert lebenswichtige rote Blutkörperchen und Eisen.",
    "exp": "Man wartet mit dem Abklemmen und Durchtrennen, bis die Nabelschnur schlaff und weiß ist und kein Blut mehr zum Baby pulsiert"
  },
  {
    "cat": "geburtsorte_bonding",
    "diff": "easy",
    "q": "Was beschreibt der Begriff der „Golden Hour“ unmittelbar nach der Entbindung?",
    "a": [
      "Erste ungestörte Stunde voller Hautkontakt und Ruhe zur Bindungsförderung",
      "Exakt sechzig Minuten dauernde Phase, in der das Kind gebadet werden muss",
      "Zeitfenster für die routinemäßige Gabe von künstlichem Vitamin K per Spritze",
      "Zeitspanne, in der das Neugeborene dem Vater zur Erstversorgung übergeben wird"
    ],
    "explanation": "Wiegen und Messen können warten: Ununterbrochener Haut-zu-Haut-Kontakt in der ersten Stunde prägt das Urvertrauen und stabilisiert Atmung und Temperatur des Babys.",
    "exp": "Die erste ungestörte Stunde voller Hautkontakt und Ruhe zwischen Eltern und Neugeborenem zur optimalen Bindungsförderung"
  },
  {
    "cat": "geburtsorte_bonding",
    "diff": "easy",
    "q": "Welche lebenswichtigen Körperfunktionen stabilisiert der direkte Haut-zu-Haut-Kontakt (Känguruhen) beim Neugeborenen nachweislich?",
    "a": [
      "Körpertemperatur, Herzfrequenz, Atmung und Blutzuckerspiegel",
      "Sehstärke und räumliches Sehvermögen des Neugeborenen",
      "Vollständige Ausreifung der Nierenrinde und Harnblase",
      "Dauerhaftes Schließen der Schädelknochen und Fontanellen"
    ],
    "explanation": "Die mütterliche Brust fungiert wie ein intelligenter Wärmeregler: Ist das Baby kühl, steigt die Hauttemperatur der Mutter messbar an, um das Kind zu wärmen.",
    "exp": "Körpertemperatur, Herzfrequenz, Atemfrequenz und Blutzuckerspiegel des Babys regulieren sich im Hautkontakt signifikant schneller"
  },
  {
    "cat": "geburtsorte_bonding",
    "diff": "mid",
    "q": "Was versteht man unter dem faszinierenden angeborenen Reflex des sogenannten „Breast Crawl“?",
    "a": [
      "Das Baby robbt auf dem mütterlichen Bauch selbstständig zur Brustwarze",
      "Das Neugeborene kriecht reflexartig in die wärmste Ecke des Wärmebetts",
      "Das Baby richtet sich im Vierfüßlerstand auf den Oberschenkeln auf",
      "Das Kind greift nach den Händen der Hebamme zur Gleichgewichtssuche"
    ],
    "explanation": "Wird das Baby auf den mütterlichen Bauch gelegt, findet es geleitet durch Geruch und Sehsinn oft ganz ohne Hilfe den Weg zur Brust und dockt eigenständig an.",
    "exp": "Das Neugeborene robbt auf dem Bauch der Mutter durch instinktive Beinbewegungen selbstständig nach oben zur Brustwarze"
  },
  {
    "cat": "geburtsorte_bonding",
    "diff": "mid",
    "q": "Was zeichnet das alternative Konzept einer „Lotusgeburt“ aus, das von manchen Eltern praktiziert wird?",
    "a": [
      "Die Nabelschnur bleibt unberührt, bis sie nach einigen Tagen von selbst abfällt",
      "Die Geburt findet rituell in einem mit Seerosenblättern gefüllten Becken statt",
      "Die Plazenta wird unmittelbar nach der Geburt getrocknet und pulverisiert",
      "Die Mutter fastet während der gesamten Austreibungsphase nach Lotus-Regeln"
    ],
    "explanation": "Bei der Lotusgeburt wird die Plazenta mit Kräutern und Meersalz gepflegt und in einem Tuch neben dem Baby aufbewahrt, bis die Verbindung nach 3 bis 10 Tagen schonend eintrocknet.",
    "exp": "Die Nabelschnur wird gar nicht durchtrennt; Baby und Plazenta bleiben verbunden, bis die Schnur nach einigen Tagen von selbst abfällt"
  },
  {
    "cat": "geburtsorte_bonding",
    "diff": "easy",
    "q": "Was ist das sogenannte „Kolostrum“ und warum wird es häufig auch als „flüssiges Gold“ bezeichnet?",
    "a": [
      "Die nährstoffreiche Vormilch der ersten Tage mit wertvollen Antikörpern",
      "Eine zuckerfreie Ersatzflüssigkeit aus Fencheltee und Traubenzucker, die im Krankenhaus standardmäßig zugefüttert wird",
      "Ein künstliches Gemisch aus sterilem Wasser und Traubenzuckerlösung zur Stabilisierung des mütterlichen Blutzuckers",
      "Ein standardisiertes pharmazeutisches Kolostrum-Präparat auf Basis von gereinigtem Rinderserum für Frühgeborene"
    ],
    "explanation": "Wenige Tropfen genügen vollkommen: Kolostrum versiegelt die Darmwand des Neugeborenen gegen Krankheitserreger und liefert die perfekte erste Immunisierung.",
    "exp": "Die hochkonzentrierte Vormilch der ersten Tage, reich an schützenden Antikörpern (Immunglobulin A) und Wachstumsfaktoren"
  },
  {
    "cat": "geburtsorte_bonding",
    "diff": "mid",
    "q": "Welche Besonderheit bietet ein mobiler, aufblasbarer Geburtspool bei einer geplanten Hausgeburt?",
    "a": [
      "Er hat weiche, gepolsterte Ränder zum bequemen Anlehnen und bietet genügend Wassertiefe für den vollen Auftriebseffekt",
      "Er erhitzt das Wasser über eingebaute Mikrowellenstrahler ohne externe Wasserzufuhr vollautomatisch auf Kochtemperatur",
      "Er ist mit sterilen Unterwasserkameras ausgestattet, die den Herzschlag des Fötus ohne Sensoren über Schallwellen messen",
      "Er saugt das Fruchtwasser kontinuierlich ab und wandelt es über einen chemischen Filter in steriles Trinkwasser um"
    ],
    "explanation": "Spezielle Geburtspools sind tiefer als normale Badewannen, sodass der Bauch voll im Wasser schwebt und die Frau sich mühelos über den weichen Rand lehnen kann.",
    "exp": "Er hat weiche, gepolsterte Ränder zum bequemen Anlehnen und bietet genügend Wassertiefe für den vollen Auftriebseffekt"
  },
  {
    "cat": "geburtsorte_bonding",
    "diff": "easy",
    "q": "Welche fünf Vitalzeichen beurteilt der nach Virginia Apgar benannte Apgar-Score standardmäßig nach 1, 5 und 10 Minuten?",
    "a": [
      "Atmung, Puls, Muskeltonus, Hautfarbe und Reflexe auf Reize",
      "Körpergewicht, Kopfumfang, Körperlänge, Geburtszeitpunkt und Lautstärke des ersten Schreiens",
      "Blutdruck, Pupillenreaktion, Temperatur, Blutzucker und Sauerstoffsättigung im Nabelschnurblut",
      "Hörvermögen, Greifreflex, Saugreflex, Schlafdauer und Trinkmenge in den ersten zwanzig Minuten"
    ],
    "explanation": "Der Apgar-Test ist schnell und nicht-invasiv: Werte von 8 bis 10 Punkten zeigen, dass sich das Baby hervorragend an das Leben außerhalb des Bauches angepasst hat.",
    "exp": "Atmung, Puls (Herzfrequenz), Grundtonus (Muskelspannung), Aussehen (Hautfarbe) und Reflexe auf Reize"
  },
  {
    "cat": "geburtsorte_bonding",
    "diff": "mid",
    "q": "Wie wird die wichtige U2-Vorsorgeuntersuchung bei einer Hausgeburt oder ambulanten Entbindung üblicherweise organisiert?",
    "a": [
      "Sie findet zwischen dem 3. und 10. Lebenstag ganz entspannt zu Hause durch die Hebamme oder in einer Kinderarztpraxis statt",
      "Die Mutter muss das Neugeborene zwingend am Tag nach der Geburt für mindestens drei Tage stationär in eine Klinik einweisen",
      "Die Untersuchung entfällt bei außerklinischen Geburten ersatzlos, da dort keine Vorsorgehefte ausgestellt werden dürfen",
      "Die Untersuchung wird online über ein Videotelefonat mit dem zuständigen Gesundheitsamt vollautomatisch abgewickelt"
    ],
    "explanation": "Eine ambulante Geburt oder Hausgeburt schließt die lückenlose Vorsorge nicht aus: Kinderärzte kommen teils nach Hause oder die Familie geht entspannt in die Praxis.",
    "exp": "Sie findet zwischen dem 3. und 10. Lebenstag ganz entspannt zu Hause durch die Hebamme oder in einer Kinderarztpraxis statt"
  },
  {
    "cat": "geburtsorte_bonding",
    "diff": "pro",
    "q": "Warum kann die Anwesenheit von zu vielen fremden Personen oder häufig wechselndem Personal im Geburtsraum den Geburtsfortschritt hemmen?",
    "a": [
      "Beobachtung aktiviert den Neokortex und die Stressachse, was Wehen hemmt",
      "Der Sauerstoffgehalt der Raumluft sinkt durch mehr anwesende Personen so drastisch, dass Wehenkrämpfe ausbleiben",
      "Die Körpertemperatur der Mutter steigt durch die Anwesenheit vieler Menschen unkontrolliert auf über 39 Grad",
      "Die Herzfrequenz des Kindes synchronisiert sich messbar mit den Pulsschlägen aller im Raum stehenden Personen"
    ],
    "explanation": "Gebären ist ein zutiefst intimer Akt wie die Zeugung: Ständige Störungen signalisieren Gefahr und sabotieren das empfindliche Hormongefüge.",
    "exp": "Das Gefühl des Beobachtetwerdens aktiviert den Neokortex und die Stressachse, was die rhythmische Wehentätigkeit stören kann"
  },
  {
    "cat": "pioniere_wochenbett",
    "diff": "mid",
    "q": "Welcher französische Geburtshelfer revolutionierte 1974 mit seinem Bestseller „Geburt ohne Gewalt“ den Umgang mit Neugeborenen im Kreißsaal?",
    "a": [
      "Frédérick Leboyer, der für gedimmtes Licht, sanftes Sprechen, warmes Baden und Verzicht auf den Klaps plädierte",
      "Louis Pasteur, der die chemische Desinfektion aller Neugeborenen mit starkem Karbolwasser gesetzlich durchsetzte",
      "René Laennec, der das Stethoskop erfand und empfahl, Kinder direkt nach der Entbindung von der Mutter zu trennen",
      "Michel Foucault, der die soziologische Überwachung von Kreißsälen durch staatliche Kommissionen forderte"
    ],
    "explanation": "Leboyer zeigte der Welt, wie gewaltvoll der damalige Klinikalltag für Babys war – sein Buch läutete die moderne, sanfte Neugeborenenmedizin ein.",
    "exp": "Frédérick Leboyer, der für gedimmtes Licht, sanftes Sprechen, warmes Baden und Verzicht auf den Klaps plädierte"
  },
  {
    "cat": "pioniere_wochenbett",
    "diff": "mid",
    "q": "Welche US-amerikanische Hebamme gründete die legendäre Geburtsgemeinschaft „The Farm“ und gilt als weltweite Ikone natürlicher Hebammenkunst?",
    "a": [
      "Ina May Gaskin, nach der auch das bekannte „Gaskin-Manöver“ (Vierfüßlerstand bei Schulterdystokie) benannt ist",
      "Virginia Apgar, die das Punkteschema zur Beurteilung von Neugeborenen in der Intensivmedizin entwickelte",
      "Florence Nightingale, die als Begründerin der modernen westlichen Krankenpflege und Lazarettorganisation gilt",
      "Margaret Sanger, die sich im 20. Jahrhundert vorrangig für die Legalisierung hormoneller Verhütungsmittel einsetzte"
    ],
    "explanation": "Ina May Gaskin bewies auf „The Farm“, dass Frauen mit minimaler Intervention und maximalem Vertrauen komplikationsarm und kraftvoll gebären können.",
    "exp": "Ina May Gaskin, nach der auch das bekannte „Gaskin-Manöver“ (Vierfüßlerstand bei Schulterdystokie) benannt ist"
  },
  {
    "cat": "pioniere_wochenbett",
    "diff": "easy",
    "q": "Welcher Zeitraum wird in der Medizin und Hebammenkunde traditionell als das „Wochenbett“ (Puerperium) definiert?",
    "a": [
      "Die ersten sechs bis acht Wochen nach der Entbindung, in denen sich Organe regenerieren und die Hormonumstellung erfolgt",
      "Ausschließlich die ersten sieben Tage nach der Geburt, in denen die Mutter das Schlafzimmer nicht verlassen darf",
      "Die gesamten neun Monate nach der Geburt, bis das Kind das freie Laufen ohne fremde Hilfe erlernt hat",
      "Genau vierundzwanzig Stunden nach Ausstoßung der Plazenta, bis der Uterus seine ursprüngliche Größe erreicht hat"
    ],
    "explanation": "Das Wochenbett ist eine geschützte Heilungsphase: Gebärmutterwunde, Beckenboden und hormonelles Gleichgewicht brauchen mindestens sechs bis acht Wochen Zeit.",
    "exp": "Die ersten sechs bis acht Wochen nach der Entbindung, in denen sich Organe regenerieren und die Hormonumstellung erfolgt"
  },
  {
    "cat": "pioniere_wochenbett",
    "diff": "mid",
    "q": "Was verbirgt sich hinter weltweiten Traditionen wie der „Cuarentena“ in Lateinamerika oder dem „Zuo Yuezi“ in China?",
    "a": [
      "Eine rund vierzigtägige Ruhezeit, in der die Wöchnerin im Bett umsorgt, bekocht und von aller Hausarbeit entbunden wird",
      "Ein rituelles Fasten über zwei Wochen, um den mütterlichen Körper von Schwangerschaftsgiften vollständig zu reinigen",
      "Eine Wanderung mit dem Neugeborenen zu den Ahnenstätten, um den Segen der Familie für die Zukunft einzuholen",
      "Ein striktes Schweigegelübde der Eltern für dreißig Tage, um dem Kind absolute akustische Ruhe zu garantieren"
    ],
    "explanation": "Fast alle Urkulturen kannten die heiligen 40 Tage: Die Mutter ruht und nährt das Baby, während Familie und Nachbarn den Haushalt führen und nährende Speisen kochen.",
    "exp": "Eine rund vierzigtägige Ruhezeit, in der die Wöchnerin im Bett umsorgt, bekocht und von aller Hausarbeit entbunden wird"
  },
  {
    "cat": "pioniere_wochenbett",
    "diff": "easy",
    "q": "Welche Nahrungsmittel gelten in der traditionellen Wochenbettküche vieler Kulturen als besonders heilsam für die frischgebackene Mutter?",
    "a": [
      "Warme, lang gekochte Kraftbrühen, wärmende Eintöpfe, Getreidebreie und nahrhafte, leicht verdauliche Speisen",
      "Eiskalte Rohkostsalate, eisgekühlte kohlensäurehaltige Getränke und schwer verdauliche Hülsenfrüchte",
      "Trockene Knäckebrote mit Magerquark und Verzicht auf jegliche Fette, Öle und warme Mahlzeiten",
      "Scharf gewürzte Fast-Food-Gerichte mit hohem Anteil an raffiniertem Industriezucker und Konservierungsstoffen"
    ],
    "explanation": "Kalte Speisen belasten die Verdauung; warme Suppen und Brühen liefern Flüssigkeit, Kollagen und leicht verfügbare Nährstoffe zur Blutbildung und Wundheilung.",
    "exp": "Warme, lang gekochte Kraftbrühen, wärmende Eintöpfe, Getreidebreie und nahrhafte, leicht verdauliche Speisen"
  },
  {
    "cat": "pioniere_wochenbett",
    "diff": "easy",
    "q": "Was ist der sogenannte „Wochenfluss“ (Lochien) und worauf weist sein natürlicher Verlauf hin?",
    "a": [
      "Die normale Wundsekretion aus der Gebärmutter nach dem Ablösen der Plazenta, die über mehrere Wochen abheilt",
      "Eine krankhafte Eiteransammlung im Beckenraum, die sofort mit hochdosiertem Penicillin behandelt werden muss",
      "Der Austritt von übrig gebliebenem Fruchtwasser, das sich in den Bauchmuskeln während der Schwangerschaft angesammelt hat",
      "Ein unstillbarer Urinverlust durch die dauerhafte Überdehnung der Harnröhre während des Durchtritts des Kopfes"
    ],
    "explanation": "Wo die Plazenta saß, hinterlässt sie eine handtellergroße Wunde: Der Wochenfluss wechselt über 4 bis 6 Wochen von rot über bräunlich zu gelblich-weiß.",
    "exp": "Die normale Wundsekretion aus der Gebärmutter nach dem Ablösen der Plazenta, die über mehrere Wochen abheilt"
  },
  {
    "cat": "pioniere_wochenbett",
    "diff": "mid",
    "q": "Wann sollte nach einer unkomplizierten vaginalen Geburt frühestens mit einem gezielten Rückbildungskurs begonnen werden?",
    "a": [
      "Etwa sechs bis acht Wochen nach der Geburt, wenn die Wundheilung abgeschlossen ist und der Beckenboden geschont wurde",
      "Bereits am Tag nach der Entbindung mit intensivem Joggen und Sprungübungen zur Straffung des Bindegewebes",
      "Frühestens nach zwei Jahren, da der Körper vorher auf keinerlei muskuläre Reize und Kräftigung anspricht",
      "Ausschließlich dann, wenn Beschwerden wie akute Inkontinenz oder eine Gebärmuttersenkung diagnostiziert wurden"
    ],
    "explanation": "In den ersten Wochen gilt: Wochenbett bedeutet Bett! Erst wenn das Gewebe sich regeneriert hat, stärkt sanfte Rückbildungsgymnastik Bauch und Beckenboden.",
    "exp": "Etwa sechs bis acht Wochen nach der Geburt, wenn die Wundheilung abgeschlossen ist und der Beckenboden geschont wurde"
  },
  {
    "cat": "pioniere_wochenbett",
    "diff": "easy",
    "q": "Was zeichnet die ergonomische „Anhock-Spreiz-Haltung“ (M-Position) beim Tragen des Babys im Tragetuch aus?",
    "a": [
      "Die Knie des Babys sind etwa auf Bauchnabelhöhe angehockt, die Beine leicht gespreizt und der Rücken bildet eine Rundung",
      "Die Beine des Babys hängen kerzengerade nach unten durch, während der Rücken starr an ein Holzbrett gedrückt wird",
      "Das Baby wird grundsätzlich mit dem Blick nach vorne getragen, sodass die Wirbelsäule in ein extremes Hohlkreuz fällt",
      "Die Füße des Babys werden eng aneinandergebunden, um die Streckung der Kniegelenke frühzeitig zu trainieren"
    ],
    "explanation": "Die M-Haltung orientiert sich an der natürlichen Anatomie des Traglings: Der Oberschenkelkopf sitzt optimal in der Hüftpfanne und der gerundete Rücken federt Erschütterungen ab.",
    "exp": "Die Knie des Babys sind etwa auf Bauchnabelhöhe angehockt, die Beine leicht gespreizt und der Rücken bildet eine Rundung"
  },
  {
    "cat": "pioniere_wochenbett",
    "diff": "easy",
    "q": "Was sagt die Form des schwangeren Bauches (z. B. spitz nach vorn oder rundherum verteilt) wissenschaftlich über das Geschlecht des Kindes aus?",
    "a": [
      "Rein gar nichts – die Bauchform hängt ausschließlich von Körperbau, Beckenform, Bauchmuskulatur und Kindslage ab",
      "Ein spitzer Bauch garantiert zu hundert Prozent einen Jungen, da männliche Föten schwerere Knochen aufweisen",
      "Ein runder Bauch beweist eindeutig ein Mädchen, da weibliche Hormone das Fettgewebe der Mutter verbreitern",
      "Die Bauchform signalisiert dem Geburtsteam, ob eine Zwillingsschwangerschaft mit geteilter Plazenta vorliegt"
    ],
    "explanation": "Ein hartnäckiger Mythos: Ob der Bauch spitz oder rund wirkt, entscheidet die Festigkeit des mütterlichen Bindegewebes und wie sich das Baby gerade hineinkuschelt.",
    "exp": "Rein gar nichts – die Bauchform hängt ausschließlich von Körperbau, Beckenform, Bauchmuskulatur und Kindslage ab"
  },
  {
    "cat": "pioniere_wochenbett",
    "diff": "mid",
    "q": "Stimmt der weitverbreitete Mythos, eine Schwangere müsse von Beginn an sprichwörtlich „für zwei essen“?",
    "a": [
      "Nein, der tatsächliche Kalorienmehrbedarf liegt ab dem zweiten Trimester im Schnitt bei nur etwa zweihundert bis dreihundert Kalorien pro Tag",
      "Ja, der Kalorienbedarf verdoppelt sich ab der sechsten Schwangerschaftswoche exakt auf die zweifache Tagesmenge",
      "Nein, Schwangere sollten ihre Kalorienzufuhr um die Hälfte reduzieren, um das Geburtsgewicht des Kindes niedrig zu halten",
      "Ja, der mütterliche Stoffwechsel verbrennt im Ruhezustand die fünffache Menge an Fettreserven für das Gehirn des Fötus"
    ],
    "explanation": "Nicht die doppelte Menge, sondern die doppelte Qualität zählt: Der Nährstoffbedarf (Vitamine, Mineralstoffe) steigt stark, der Energiebedarf entspricht aber nur einer Scheibe Vollkornbrot mit Käse.",
    "exp": "Nein, der tatsächliche Kalorienmehrbedarf liegt ab dem zweiten Trimester im Schnitt bei nur etwa zweihundert bis dreihundert Kalorien pro Tag"
  },
  {
    "cat": "pioniere_wochenbett",
    "diff": "easy",
    "q": "Was unterscheidet den weitverbreiteten „Babyblues“ (Heultage) von einer echten postpartalen Depression (Wochenbettdepression)?",
    "a": [
      "Der Babyblues tritt um den 3. bis 5. Tag durch den rapiden Hormonabfall auf und vergeht meist rasch; eine Depression hält länger an und braucht Hilfe",
      "Der Babyblues erfordert eine sofortige lebenslange medikamentöse Therapie, während eine Depression nach zwei Stunden verschwindet",
      "Beim Babyblues handelt es sich um eine rein körperliche Unverträglichkeit gegen Muttermilch ohne emotionale Beteiligung",
      "Eine postpartale Depression betrifft ausschließlich Adoptiveltern, während leibliche Mütter biologisch davor geschützt sind"
    ],
    "explanation": "Nach der Geburt stürzen Östrogen und Progesteron ab – bis zu 80 % aller Frauen weinen um Tag 3 grundlos und sind hochsensibel. Bleibt das Tief über Wochen bestehen, steht professionelle Unterstützung bereit.",
    "exp": "Der Babyblues tritt um den 3. bis 5. Tag durch den rapiden Hormonabfall auf und vergeht meist rasch; eine Depression hält länger an und braucht Hilfe"
  },
  {
    "cat": "pioniere_wochenbett",
    "diff": "mid",
    "q": "Was besagt der Mythos um Sodbrennen in der Schwangerschaft und den Haarwuchs des ungeborenen Babys aus wissenschaftlicher Sicht?",
    "a": [
      "Eine klinische Studie fand tatsächlich eine Korrelation: Dieselben Schwangerschaftshormone lockern den Magen und regen den fetalen Haarwuchs an",
      "Die Haare des Fötus ragen durch winzige Öffnungen in der Gebärmutterwand direkt in den Magen und lösen dort mechanische Reizungen aus",
      "Das Phänomen beruht ausschließlich auf der mechanischen Lage des kindlichen Schädels, der die Gallenflüssigkeit stetig nach oben drückt",
      "Wissenschaftliche Reihenuntersuchungen bewiesen zweifelsfrei, dass starkes mütterliches Sodbrennen ausnahmslos zu haarlosen Babys führt"
    ],
    "explanation": "Einer der seltenen Mythen mit wahrem Kern: Hohe Östrogen- und Progesteronspiegel entspannen den Magenschließmuskel und stimulieren gleichzeitig den fetalen Haarwuchs.",
    "exp": "Eine klinische Studie fand tatsächlich eine Korrelation: Dieselben Schwangerschaftshormone lockern den Magen und regen den fetalen Haarwuchs an"
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("geburt", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["geburt"] = DATA;
  }
})();
