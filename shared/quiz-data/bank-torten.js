// 75 kuratierte Fragen: Torten – Klassiker, Patisserie & Backkunst
// Index 0 von a[] ist stets die richtige Antwort (wird im Spiel gemischt).
(function () {
  const QUESTIONS = [
  // =========================================================================
  // 1. DEUTSCHE & ÖSTERREICHISCHE TORTEN-KLASSIKER (18 Fragen: 5 easy, 9 mid, 4 pro)
  // =========================================================================
  {
    "cat": "klassiker_de_at",
    "diff": "easy",
    "q": "Was ist laut den Leitsätzen für Feine Backwaren zwingend für die Tränkung einer echten Schwarzwälder Kirschtorte vorgeschrieben?",
    "a": [
      "Echtes Schwarzwälder Kirschwasser als klarer Brand",
      "Dunkler Kirschlikör mit mindestens zwanzig Prozent",
      "Eingekochter Sauerkirschsaft mit etwas Weingeist",
      "Ein kräftiger Schuss im Eichenfass gereifter Rum"
    ],
    "explanation": "Ohne echten Schwarzwälder Kirschwasser-Geschmack darf sich die Torte in Deutschland gar nicht so nennen. Bei rund 200 ml Kirschwasser pro Torte ist sie definitiv nichts für Kinder!",
    "exp": "Ohne echten Schwarzwälder Kirschwasser-Geschmack darf sich die Torte in Deutschland gar nicht so nennen. Bei rund 200 ml Kirschwasser pro Torte ist sie definitiv nichts für Kinder!"
  },
  {
    "cat": "klassiker_de_at",
    "diff": "easy",
    "q": "Welcher legendäre Streit entbrannte jahrzehntelang zwischen dem Hotel Sacher und der Hofzuckerbäckerei Demel in Wien?",
    "a": [
      "Ob die Marillenmarmelade auch in der Mitte geschichtet wird",
      "Welcher Kakaogehalt für die dunkle Glasur vorgeschrieben ist",
      "Ob zur fertigen Torte zwingend ungesüßte Schlagsahne gehört",
      "Aus welchem Getreidemehl der feine Biskuitboden gebacken wird"
    ],
    "explanation": "Der fast zehnjährige Rechtsstreit endete mit einem Kompromiss: Das Hotel Sacher darf zwei Marmeladenschichten nutzen („Original Sacher-Torte“), Demel nur eine unter der Glasur („Eduard-Sacher-Torte“).",
    "exp": "Der fast zehnjährige Rechtsstreit endete mit einem Kompromiss: Das Hotel Sacher darf zwei Marmeladenschichten nutzen („Original Sacher-Torte“), Demel nur eine unter der Glasur („Eduard-Sacher-Torte“)."
  },
  {
    "cat": "klassiker_de_at",
    "diff": "easy",
    "q": "Welche charakteristische Bestreuung gehört traditionell zwingend auf die Außenhaut eines Frankfurter Kranzes?",
    "a": [
      "Krokant aus gerösteten Haselnüssen oder Mandeln",
      "Feine Späne aus Zartbitter- und Vollmilchkuvertüre",
      "Dicke Flocken aus leicht geröstetem Kokosraspel",
      "Bunte Streusel aus gefärbtem Puderzuckerguss"
    ],
    "explanation": "Die Ringform soll an eine Kaiserkrone erinnern, die rote Belegkirsche an die Rubine der Krone und der Krokant an das glänzende Gold!",
    "exp": "Die Ringform soll an eine Kaiserkrone erinnern, die rote Belegkirsche an die Rubine der Krone und der Krokant an das glänzende Gold!"
  },
  {
    "cat": "klassiker_de_at",
    "diff": "easy",
    "q": "Wie entsteht das typische Wellenmuster im Teig der beliebten Donauwelle?",
    "a": [
      "Durch eingelegte Kirschen, die beim Backen absinken",
      "Durch spiralförmiges Rühren mit einer großen Fleischgabel",
      "Durch ungleiches Erhitzen von Ober- und Unterhitze im Ofen",
      "Durch unterschiedliche Backpulvermengen im hellen Teig"
    ],
    "explanation": "Die Sauerkirschen werden auf den zweifarbigen Rührteig gelegt; durch ihr Eigengewicht sinken sie nach unten und ziehen die dunkle Kakaoschicht wellenförmig mit.",
    "exp": "Die Sauerkirschen werden auf den zweifarbigen Rührteig gelegt; durch ihr Eigengewicht sinken sie nach unten und ziehen die dunkle Kakaoschicht wellenförmig mit."
  },
  {
    "cat": "klassiker_de_at",
    "diff": "easy",
    "q": "Woher hat der altdeutsche Klassiker Bienenstich der bekanntesten Sage nach seinen Namen?",
    "a": [
      "Bäckerlehrlinge vertrieben Angreifer einst mit Bienenkörben",
      "Der Erfinder wurde beim Pflücken der Mandeln böse gestochen",
      "Der heiße Honig-Mandel-Belag brannte wie giftiger Insektenstich",
      "Echte Bienen wurden vom süßen Blütenduft des Teiges angelockt"
    ],
    "explanation": "Der Legende nach verteidigten 1474 Andernacher Bäckerjungen ihre Stadt gegen Bürger aus Linz am Rhein, indem sie Bienenkörbe von der Stadtmauer auf die Angreifer warfen. Zur Feier gab es den Kuchen!",
    "exp": "Der Legende nach verteidigten 1474 Andernacher Bäckerjungen ihre Stadt gegen Bürger aus Linz am Rhein, indem sie Bienenkörbe von der Stadtmauer auf die Angreifer warfen. Zur Feier gab es den Kuchen!"
  },
  {
    "cat": "klassiker_de_at",
    "diff": "mid",
    "q": "Wie viele dünne Biskuitböden besitzt die traditionelle Münchner Prinzregententorte und warum?",
    "a": [
      "Acht Böden für die damaligen acht Regierungsbezirke",
      "Sechs Böden als Symbol für die sechs bayerischen Flüsse",
      "Zehn Böden für die zehn Kinder des bayerischen Prinzen",
      "Vier Böden für die vier Jahreszeiten der Königsresidenz"
    ],
    "explanation": "Kreiert zu Ehren von Prinzregent Luitpold symbolisierten die acht Schichten die acht bayerischen Kreise. Nach 1945 verlor Bayern die Pfalz, doch die Tradition der acht Böden blieb erhalten.",
    "exp": "Kreiert zu Ehren von Prinzregent Luitpold symbolisierten die acht Schichten die acht bayerischen Kreise. Nach 1945 verlor Bayern die Pfalz, doch die Tradition der acht Böden blieb erhalten."
  },
  {
    "cat": "klassiker_de_at",
    "diff": "mid",
    "q": "Wofür gilt die oberösterreichische Linzer Torte in der Kulturgeschichte des Backens als Rekordhalterin?",
    "a": [
      "Als ältestes namentlich überliefertes Tortenrezept",
      "Als erste Torte mit industriell erzeugtem Backpulver",
      "Als teuerste Festtagstorte am Wiener Kaiserhof",
      "Als erstes Gebäck mit gänzlich zuckerfreiem Mürbeteig"
    ],
    "explanation": "Ein handgeschriebenes Rezept aus dem Stift Admont stammt bereits aus dem Jahr 1653. Charakteristisch sind der nussige Teig, Zimt, Nelken und das typische Teiggitter über der Johannisbeer- oder Himbeermarmelade.",
    "exp": "Ein handgeschriebenes Rezept aus dem Stift Admont stammt bereits aus dem Jahr 1653. Charakteristisch sind der nussige Teig, Zimt, Nelken und das typische Teiggitter über der Johannisbeer- oder Himbeermarmelade."
  },
  {
    "cat": "klassiker_de_at",
    "diff": "mid",
    "q": "Wodurch zeichnet sich die oberste Schicht der von József Dobos erfundenen Dobostorte aus?",
    "a": [
      "Eine feste Decke aus karamellisiertem Hartzucker",
      "Ein dickes Gitter aus kandierten Orangenscheiben",
      "Eine feine Schicht aus goldbestäubter Marzipanmasse",
      "Ein dichter Spiegel aus säuerlichem Sauerkirschgelee"
    ],
    "explanation": "József Dobos schnitt die Karamellschicht vor dem Erkalten in Stücke, damit die Torte beim Anschneiden nicht zerdrückt wird. Die feste Decke schützte die Torte vor dem Austrocknen.",
    "exp": "József Dobos schnitt die Karamellschicht vor dem Erkalten in Stücke, damit die Torte beim Anschneiden nicht zerdrückt wird. Die feste Decke schützte die Torte vor dem Austrocknen."
  },
  {
    "cat": "klassiker_de_at",
    "diff": "mid",
    "q": "Welche Teigkombination verleiht der norddeutschen Friesentorte ihren unverkennbaren Biss?",
    "a": [
      "Knuspriger Blätterteig kombiniert mit feinem Mürbeteig",
      "Saftiger Hefeteig belegt mit krossen Butterstreuseln",
      "Zarter Biskuitboden umhüllt von dickem Brandteig",
      "Dünner Quark-Öl-Teig gefüllt mit krossem Filoteig"
    ],
    "explanation": "Zwischen den Blätterteig- und Mürbeteigböden stecken traditionell Pflaumenmus (Zwetschgenkompott) und reichlich Schlagsahne. Vor dem Servieren wird die obere Blätterteigdecke oft in Fächer vorgeschnitten.",
    "exp": "Zwischen den Blätterteig- und Mürbeteigböden stecken traditionell Pflaumenmus (Zwetschgenkompott) und reichlich Schlagsahne. Vor dem Servieren wird die obere Blätterteigdecke oft in Fächer vorgeschnitten."
  },
  {
    "cat": "klassiker_de_at",
    "diff": "mid",
    "q": "Welches Milchprodukt bildet neben Sahne das geschmackliche Herzstück einer traditionellen deutschen Käsesahnetorte?",
    "a": [
      "Magerquark, der mit Eigelb, Zucker und Zitrone verrührt wird",
      "Reiner Mascarpone, der mit geriebener Tonkabohne verfeinert wird",
      "Fetter Doppelrahmfrischkäse mit cremigem Kondensmilchanteil",
      "Griechischer Schafsjoghurt mit Honig und Bourbon-Vanillemark"
    ],
    "explanation": "Anders als beim amerikanischen Cheesecake sorgt in Deutschland Magerquark in Kombination mit Gelatine und aufgeschlagener Sahne zwischen zwei Biskuitböden für die luftig-frische Konsistenz.",
    "exp": "Anders als beim amerikanischen Cheesecake sorgt in Deutschland Magerquark in Kombination mit Gelatine und aufgeschlagener Sahne zwischen zwei Biskuitböden für die luftig-frische Konsistenz."
  },
  {
    "cat": "klassiker_de_at",
    "diff": "mid",
    "q": "Was unterscheidet die klassische deutsche Herrentorte geschmacklich von vielen anderen Sahnetorten?",
    "a": [
      "Mehrere dünne Biskuitböden mit herber Weincreme und Zartbitter",
      "Ein Teig aus dunklem Roggenmehl mit deftigem Kümmelaroma",
      "Eine Füllung aus gebranntem Speck und scharfem Chiligel",
      "Eine dicke Schicht aus salzigem Erdnussmus und Rauchmandel"
    ],
    "explanation": "Als Gegenpol zu sehr süßen Kaffeekränzchen-Torten wurde sie mit herber Weincreme gefüllt und mit edelbitterer Kuvertüre überzogen. Sie gilt als traditionsreicher Konditoren-Klassiker.",
    "exp": "Als Gegenpol zu sehr süßen Kaffeekränzchen-Torten wurde sie mit herber Weincreme gefüllt und mit edelbitterer Kuvertüre überzogen. Sie gilt als traditionsreicher Konditoren-Klassiker."
  },
  {
    "cat": "klassiker_de_at",
    "diff": "mid",
    "q": "Was bildet bei einer traditionellen Schwarzwälder Kirschtorte meistens das Fundament ganz unten?",
    "a": [
      "Ein hauchdünner, separat vorgebackener Mürbeteigboden",
      "Eine Schicht aus knusprig karamellisierten Oblatenstücken",
      "Ein fester Boden aus zerstoßenen Löffelbiskuits und Butter",
      "Eine getrocknete Platte aus süßem weißem Mandelbaiser"
    ],
    "explanation": "Ein dünner Mürbeteigboden ganz unten gibt der saftigen Sahnetorte Stabilität, damit sie beim Anschneiden und Heben auf die Kaffeetafel nicht zerbricht oder durchweicht.",
    "exp": "Ein dünner Mürbeteigboden ganz unten gibt der saftigen Sahnetorte Stabilität, damit sie beim Anschneiden und Heben auf die Kaffeetafel nicht zerbricht oder durchweicht."
  },
  {
    "cat": "klassiker_de_at",
    "diff": "mid",
    "q": "Warum hat der Frankfurter Kranz in der Mitte ein charakteristisches rundes Loch?",
    "a": [
      "Weil er traditionell in einer runden Kranzform gebacken wird",
      "Damit heiße Buttercreme beim Füllen nach innen abfließen kann",
      "Um Platz für eine brennende Kerze bei Hochzeiten zu bieten",
      "Weil der Teig in der Mitte sonst niemals durchbacken würde"
    ],
    "explanation": "Die Form symbolisiert die Kaiserkrone des Heiligen Römischen Reiches, da Frankfurt am Main jahrhundertelang Krönungsstadt der deutschen Kaiser war.",
    "exp": "Die Form symbolisiert die Kaiserkrone des Heiligen Römischen Reiches, da Frankfurt am Main jahrhundertelang Krönungsstadt der deutschen Kaiser war."
  },
  {
    "cat": "klassiker_de_at",
    "diff": "mid",
    "q": "Was bildet das stützende Gerüst der traditionellen österreichischen Malakow-Torte?",
    "a": [
      "In Rum oder Maraschino getränkte Löffelbiskuits",
      "Frisch gebackene Waffeln mit zartem Vanillegeschmack",
      "Hauchdünne Scheiben von trockenem Sandkuchen",
      "Getoastete Scheiben von buttrigem Briochegebäck"
    ],
    "explanation": "Die Torte wird ähnlich wie ein Tiramisu geschichtet: Löffelbiskuits, Mandellikör oder Rum und eine üppige Mandel- oder Vanillecreme. Benannt wurde sie nach dem Herzog von Malakow (1855).",
    "exp": "Die Torte wird ähnlich wie ein Tiramisu geschichtet: Löffelbiskuits, Mandellikör oder Rum und eine üppige Mandel- oder Vanillecreme. Benannt wurde sie nach dem Herzog von Malakow (1855)."
  },
  {
    "cat": "klassiker_de_at",
    "diff": "pro",
    "q": "Woraus bestehen die charakteristischen Schichten der ungarisch-österreichischen Esterházy-Torte?",
    "a": [
      "Aus hellem Mandel-Baiserteig und Cognac-Buttercreme",
      "Aus dunklem Rührteig und fruchtiger Zwetschgenkonfitüre",
      "Aus buttrigem Mürbeteig und einer dicken Nougatfüllung",
      "Aus lockerem Hefeteig und cremiger Vanillepuddingmasse"
    ],
    "explanation": "Die Böden werden komplett ohne Weizenmehl nur aus Eischnee, Zucker und gemahlenen Mandeln gebacken. Obenauf liegt eine weiße Zuckerglasur mit dem berühmten federartigen Schokoladenmuster.",
    "exp": "Die Böden werden komplett ohne Weizenmehl nur aus Eischnee, Zucker und gemahlenen Mandeln gebacken. Obenauf liegt eine weiße Zuckerglasur mit dem berühmten federartigen Schokoladenmuster."
  },
  {
    "cat": "klassiker_de_at",
    "diff": "pro",
    "q": "Was ist das handwerkliche Geheimnis beim Backen von echtem Baumkuchen für eine Baumkuchentorte?",
    "a": [
      "Schicht für Schicht wird unter starker Oberhitze gegrillt",
      "Der Teig reift vor dem Backen drei Tage lang im kühlen Keller",
      "Die Masse wird im heißen Dampfbad schonend pochiert",
      "Er wird in rotierenden Holzfässern über Buchenglut geräuchert"
    ],
    "explanation": "Beim traditionellen Baumkuchen wird flüssige Masse Schicht für Schicht auf eine rotierende Walze vor Hitze aufgetragen. Bei der Torte backt man jede Teigschicht einzeln unter dem Backofengrill!",
    "exp": "Beim traditionellen Baumkuchen wird flüssige Masse Schicht für Schicht auf eine rotierende Walze vor Hitze aufgetragen. Bei der Torte backt man jede Teigschicht einzeln unter dem Backofengrill!"
  },
  {
    "cat": "klassiker_de_at",
    "diff": "pro",
    "q": "Was zeichnet die Füllung einer traditionellen Lübecker Marzipantorte handwerklich aus?",
    "a": [
      "Eine nussige Marzipansahne umhüllt von einer dünnen Marzipandecke",
      "Eine dicke Quarkcreme bestreut mit gehackten Walnusskernen",
      "Eine fruchtige Kirschmarmelade verfeinert mit feinem Mandellikör",
      "Eine schwere Mousse au Chocolat bedeckt mit süßem Kakaopulver"
    ],
    "explanation": "Lübeck ist weltberühmt für Marzipan höchster Güte (mindestens 70 % Marzipanrohmasse, höchstens 30 % Zucker). Die Torte verbindet feine Biskuitböden mit cremiger Marzipansahne.",
    "exp": "Lübeck ist weltberühmt für Marzipan höchster Güte (mindestens 70 % Marzipanrohmasse, höchstens 30 % Zucker). Die Torte verbindet feine Biskuitböden mit cremiger Marzipansahne."
  },
  {
    "cat": "klassiker_de_at",
    "diff": "pro",
    "q": "Was versteht der Konditor unter der Canache (Ganache), die bei Trüffeltorten die Hauptrolle spielt?",
    "a": [
      "Eine seidige Emulsion aus heißer Sahne und Schokolade",
      "Eine steif geschlagene Eiweißmasse mit aromatischem Trüffelöl",
      "Einen gezuckerten Rührteig mit gemahlenen schwarzen Nüssen",
      "Eine gekochte Puddingcreme auf Basis von Weizenmehl und Fett"
    ],
    "explanation": "Ganache ist das Herzstück jeder Trüffeltorte. Je nach Verhältnis von Sahne zu Schokolade wird sie samtig streichfähig wie Creme oder schnittfest wie feine Pralinenfüllung.",
    "exp": "Ganache ist das Herzstück jeder Trüffeltorte. Je nach Verhältnis von Sahne zu Schokolade wird sie samtig streichfähig wie Creme oder schnittfest wie feine Pralinenfüllung."
  },

  // =========================================================================
  // 2. INTERNATIONALE TORTEN & PATISSERIE-IKONEN (15 Fragen: 5 easy, 7 mid, 3 pro)
  // =========================================================================
  {
    "cat": "internationale_ikonen",
    "diff": "easy",
    "q": "Welche auffällige Hülle und Dekoration machen die schwedische Prinzessinnentorte (Prinsesstårta) unverwechselbar?",
    "a": [
      "Eine grüne Marzipandecke verziert mit einer rosa Marzipanrose",
      "Ein knallgelber Zitronenguss verziert mit blauen Zuckerperlen",
      "Eine schneeweiße Baiserhaube garniert mit blauen Kornblumen",
      "Ein tiefroter Erdbeerspiegel überzogen mit weißer Kuvertüre"
    ],
    "explanation": "Ursprünglich von Jenny Åkerström für die drei schwedischen Prinzessinnen kreiert, ist die Prinsesstårta mit ihrer grünen Kuppel Schwedens Nationalgebäck Nummer eins.",
    "exp": "Ursprünglich von Jenny Åkerström für die drei schwedischen Prinzessinnen kreiert, ist die Prinsesstårta mit ihrer grünen Kuppel Schwedens Nationalgebäck Nummer eins."
  },
  {
    "cat": "internationale_ikonen",
    "diff": "easy",
    "q": "Was ist der entscheidende Unterschied bei der Hauptzutat zwischen New York Cheesecake und deutschem Käsekuchen?",
    "a": [
      "Doppelrahm-Frischkäse statt herkömmlichem Magerquark",
      "Süße Kondensmilch anstelle von frischer Vollmilch",
      "Fester Ziegenkäse anstelle von mildem Kuhmilchquark",
      "Reiner Mascarpone anstelle von cremigem Ricotta"
    ],
    "explanation": "Amerikanischer Cheesecake basiert auf Cream Cheese (Frischkäse) und oft Sauerrahm, was ihn besonders dicht und samtig macht, während deutscher Käsekuchen mit Quark luftiger und säuerlicher schmeckt.",
    "exp": "Amerikanischer Cheesecake basiert auf Cream Cheese (Frischkäse) und oft Sauerrahm, was ihn besonders dicht und samtig macht, während deutscher Käsekuchen mit Quark luftiger und säuerlicher schmeckt."
  },
  {
    "cat": "internationale_ikonen",
    "diff": "easy",
    "q": "Zu Ehren welcher berühmten Persönlichkeit wurde die zarte Baisertorte Pavlova in den 1920er-Jahren kreiert?",
    "a": [
      "Der russischen Primaballerina Anna Pawlowa",
      "Der Physikerin und Chemikerin Marie Curie",
      "Der schwedischen Opernsängerin Jenny Lind",
      "Der britischen Königinwitwe Queen Victoria"
    ],
    "explanation": "Sowohl Australien als auch Neuseeland beanspruchen die Erfindung für sich. Die weiße Baiserhülle mit Sahne und Früchten sollte an das flatternde Ballettkleid der Tänzerin erinnern.",
    "exp": "Sowohl Australien als auch Neuseeland beanspruchen die Erfindung für sich. Die weiße Baiserhülle mit Sahne und Früchten sollte an das flatternde Ballettkleid der Tänzerin erinnern."
  },
  {
    "cat": "internationale_ikonen",
    "diff": "easy",
    "q": "Welches Topping gehört traditionell auf einen klassischen modernen Karottenkuchen (Carrot Cake)?",
    "a": [
      "Ein süß-säuerliches Frosting auf Basis von Frischkäse",
      "Eine dicke Glasur aus herber Zartbitterschokolade",
      "Eine bunte Schicht aus geliertem Karottensaft",
      "Ein einfacher Zuckerguss aus Puderzucker und Kirschwasser"
    ],
    "explanation": "Das Cream-Cheese-Frosting aus Frischkäse, Butter, Puderzucker und Vanille bildet den perfekten cremigen Kontrast zum saftigen, mit Zimt und Nüssen gewürzten Karottenteig.",
    "exp": "Das Cream-Cheese-Frosting aus Frischkäse, Butter, Puderzucker und Vanille bildet den perfekten cremigen Kontrast zum saftigen, mit Zimt und Nüssen gewürzten Karottenteig."
  },
  {
    "cat": "internationale_ikonen",
    "diff": "easy",
    "q": "Was bedeutet der Name der französischen Blätterteigschnitte Mille-feuille wörtlich übersetzt?",
    "a": [
      "Tausend Blätter",
      "Süße Schichten",
      "Zarter Hauch",
      "Königliches Fest"
    ],
    "explanation": "Ein klassischer Blätterteig mit 6 einfachen Touren besitzt rechnerisch tatsächlich bis zu 729 Teig- und 728 Butterschichten – fast 1.500 hauchdünne Schichten!",
    "exp": "Ein klassischer Blätterteig mit 6 einfachen Touren besitzt rechnerisch tatsächlich bis zu 729 Teig- und 728 Butterschichten – fast 1.500 hauchdünne Schichten!"
  },
  {
    "cat": "internationale_ikonen",
    "diff": "mid",
    "q": "Was ist das optische und geschmackliche Markenzeichen des baskischen Basque Burnt Cheesecake?",
    "a": [
      "Eine fast schwarz karamellisierte Oberfläche bei cremigem Kern",
      "Ein doppelter Boden aus extrem knusprigem Schoko-Mürbeteig",
      "Eine fruchtige Füllung aus flambierten Waldbeeren und Minze",
      "Eine dicke Schicht aus geriebenem Manchego-Schafskäse obenauf"
    ],
    "explanation": "Erfunden im Restaurant „La Viña“ in San Sebastián wird er bei sehr hoher Hitze ohne Wasserbad gebacken. Die scheinbar verbrannte Kruste liefert fantastische Karamellnoten, während das Innere fast flüssig schmilzt.",
    "exp": "Erfunden im Restaurant „La Viña“ in San Sebastián wird er bei sehr hoher Hitze ohne Wasserbad gebacken. Die scheinbar verbrannte Kruste liefert fantastische Karamellnoten, während das Innere fast flüssig schmilzt."
  },
  {
    "cat": "internationale_ikonen",
    "diff": "mid",
    "q": "Wodurch erhielt der berühmte Red Velvet Cake historisch seine typische Rötung, bevor Lebensmittelfarbe üblich war?",
    "a": [
      "Reaktion von unentöltem Kakao mit säurehaltiger Buttermilch",
      "Hohe Mengen an frisch gepresstem Saft aus roter Bete",
      "Ein tagelanges Einlegen des Teiges in trockenem Rotwein",
      "Die Zugabe von gemahlenem Pulver aus getrocknetem Hibiskus"
    ],
    "explanation": "Natürlicher Kakao enthält Anthocyane, die im sauren Milieu (Essig und Buttermilch) rot aufleuchten. Im Zweiten Weltkrieg half mancherorts auch Rote-Bete-Saft nach, da Zucker und Fett rationiert waren.",
    "exp": "Natürlicher Kakao enthält Anthocyane, die im sauren Milieu (Essig und Buttermilch) rot aufleuchten. Im Zweiten Weltkrieg half mancherorts auch Rote-Bete-Saft nach, da Zucker und Fett rationiert waren."
  },
  {
    "cat": "internationale_ikonen",
    "diff": "mid",
    "q": "Welche Aromen prägen die weltberühmte französische Opéra-Torte aus Paris?",
    "a": [
      "Hauchdünne Mandelbiskuitböden mit Kaffeesirup und Schokolade",
      "Luftige Windbeutel gefüllt mit frischer Passionsfruchtcreme",
      "Karamellisierter Blätterteig mit säuerlichen Himbeerschichten",
      "Gerösteter Mürbeteig mit einer leichten Birnen-Mousse"
    ],
    "explanation": "Kreiert von der Pariser Maison Dalloyau symbolisieren die rechteckigen Schichten die Bühne der Pariser Oper. Kaffeesirup, Kaffee-Buttercreme und Schokoladenganache harmonieren hier perfekt.",
    "exp": "Kreiert von der Pariser Maison Dalloyau symbolisieren die rechteckigen Schichten die Bühne der Pariser Oper. Kaffeesirup, Kaffee-Buttercreme und Schokoladenganache harmonieren hier perfekt."
  },
  {
    "cat": "internationale_ikonen",
    "diff": "mid",
    "q": "Warum heißt der beliebte lateinamerikanische Kuchen Tres Leches übersetzt „Drei-Milch-Kuchen“?",
    "a": [
      "Er wird mit Kondensmilch, evaporierter Milch und Sahne getränkt",
      "Der Teig wird aus Kuhmilch, Schafsmilch und Ziegenmilch gerührt",
      "Die Torte enthält Milchpulver, frische Buttermilch und Molke",
      "Er wird nacheinander in kalte, warme und kochende Milch getaucht"
    ],
    "explanation": "Ein extrem luftiger Biskuit saugt die Mischung aus gezuckerter Kondensmilch, evaporierter Dosenmilch und süßer Sahne komplett auf, ohne matschig zu werden!",
    "exp": "Ein extrem luftiger Biskuit saugt die Mischung aus gezuckerter Kondensmilch, evaporierter Dosenmilch und süßer Sahne komplett auf, ohne matschig zu werden!"
  },
  {
    "cat": "internationale_ikonen",
    "diff": "mid",
    "q": "Was verbirgt sich hinter dem britischen Klassiker Victoria Sponge Cake?",
    "a": [
      "Zwei Biskuitböden gefüllt mit Himbeermarmelade und Vanillesahne",
      "Ein schwerer Früchtekuchen getränkt mit dunklem schottischem Whisky",
      "Ein gedämpfter Gewürzpudding übergossen mit warmer Vanillesoße",
      "Ein zarter Zitronenkuchen überzogen mit Royal-Icing-Zuckerguss"
    ],
    "explanation": "Queen Victoria genoss jeden Nachmittag ein Stück dieses Kuchens zur Teestunde. Die Erfindung des modernen Backpulvers machte den Biskuit Mitte des 19. Jahrhunderts sensationell locker.",
    "exp": "Queen Victoria genoss jeden Nachmittag ein Stück dieses Kuchens zur Teestunde. Die Erfindung des modernen Backpulvers machte den Biskuit Mitte des 19. Jahrhunderts sensationell locker."
  },
  {
    "cat": "internationale_ikonen",
    "diff": "mid",
    "q": "Welches Missgeschick führte der Legende nach zur Erfindung der französischen Tarte Tatin?",
    "a": [
      "Äpfel karamellisierten zu lange in Butter und wurden mit Teig bedeckt",
      "Der Kuchen fiel vom Tisch und wurde verkehrt herum serviert",
      "Salz wurde versehentlich mit weißem Kristallzucker verwechselt",
      "Der Hefeteig ging nicht auf und wurde kurzerhand angebraten"
    ],
    "explanation": "Stéphanie Tatin bemerkte im Gasthaus, dass die Äpfel in Butter und Zucker anbrannten. Um sie zu retten, legte sie die Teigplatte einfach darüber und stürzte die Tarte nach dem Backen kopfüber!",
    "exp": "Stéphanie Tatin bemerkte im Gasthaus, dass die Äpfel in Butter und Zucker anbrannten. Um sie zu retten, legte sie die Teigplatte einfach darüber und stürzte die Tarte nach dem Backen kopfüber!"
  },
  {
    "cat": "internationale_ikonen",
    "diff": "mid",
    "q": "Welcher italienische Likörwein gehört traditionell in das klassische Rezept für ein echtes Tiramisu?",
    "a": [
      "Marsala aus Sizilien",
      "Chianti aus der Toskana",
      "Prosecco aus Venetien",
      "Limoncello aus Sorrent"
    ],
    "explanation": "Obwohl mancherorts Amaretto genutzt wird, gehört in das venezianische Originalrezept der bernsteinfarbene sizilianische Likörwein Marsala zusammen mit Espresso und Mascarpone.",
    "exp": "Obwohl mancherorts Amaretto genutzt wird, gehört in das venezianische Originalrezept der bernsteinfarbene sizilianische Likörwein Marsala zusammen mit Espresso und Mascarpone."
  },
  {
    "cat": "internationale_ikonen",
    "diff": "pro",
    "q": "Welches klassische französische Gebäckelement krönt den äußeren Rand der berühmten Saint-Honoré-Torte?",
    "a": [
      "Kleine, mit Karamell glasierte und gefüllte Profiteroles",
      "Zarte Makronen aus Mandelmehl mit bunter Lebensmittelfarbe",
      "Eingerollte Mini-Crêpes mit fruchtiger Orangenlikörfüllung",
      "Frittierte Teigkugeln bestäubt mit gemahlenem Zimtzucker"
    ],
    "explanation": "Benannt nach dem Schutzpatron der Bäcker, Saint Honoré, verbindet sie Blätterteig, Brandteig, glänzendes Karamell und die berühmte Chiboust-Creme (Pâtisseriecreme mit Eischnee).",
    "exp": "Benannt nach dem Schutzpatron der Bäcker, Saint Honoré, verbindet sie Blätterteig, Brandteig, glänzendes Karamell und die berühmte Chiboust-Creme (Pâtisseriecreme mit Eischnee)."
  },
  {
    "cat": "internationale_ikonen",
    "diff": "pro",
    "q": "Welche kuriose Besonderheit zeichnet den amerikanischen Boston Cream Pie aus?",
    "a": [
      "Es handelt sich technisch um eine Torte und gar nicht um eine Pie",
      "Er wurde ursprünglich in Philadelphia und nicht in Boston kreiert",
      "Er enthält weder Sahne noch Milchprodukte in der Füllung",
      "Er wurde früher als herzhaftes Fleischgericht zu Mittag gegessen"
    ],
    "explanation": "Obwohl er als „Pie“ bezeichnet wird, besteht er aus zwei Schichten Biskuit, gefüllt mit Vanillepudding und bedeckt mit Schokoladenglasur – gebacken in Kuchenformen, die man damals einfach „Pie-Pans“ nannte.",
    "exp": "Obwohl er als „Pie“ bezeichnet wird, besteht er aus zwei Schichten Biskuit, gefüllt mit Vanillepudding und bedeckt mit Schokoladenglasur – gebacken in Kuchenformen, die man damals einfach „Pie-Pans“ nannte."
  },
  {
    "cat": "internationale_ikonen",
    "diff": "pro",
    "q": "Wie unterscheidet sich der amerikanische Black Forest Cake in vielen US-Bäckereien vom deutschen Original?",
    "a": [
      "Er wird häufig komplett ohne Alkohol und mit Zuckerkirschen gebacken",
      "Statt Schokolade wird ausschließlich helle weiße Kuvertüre genutzt",
      "Der Teig besteht traditionell aus salzigen Graham-Cracker-Bröseln",
      "Die Sahne wird standardmäßig durch dicke Erdnussbuttercreme ersetzt"
    ],
    "explanation": "Da in den USA Alkohol im Gebäck oft unerwünscht ist oder Lizenzregeln unterliegt, verzichten viele amerikanische Bäcker komplett auf das geschmacksprägende Schwarzwälder Kirschwasser.",
    "exp": "Da in den USA Alkohol im Gebäck oft unerwünscht ist oder Lizenzregeln unterliegt, verzichten viele amerikanische Bäcker komplett auf das geschmacksprägende Schwarzwälder Kirschwasser."
  },

  // =========================================================================
  // 3. TEIGE, CREMES & BACKPHYSIK (16 Fragen: 5 easy, 8 mid, 3 pro)
  // =========================================================================
  {
    "cat": "teige_cremes_physik",
    "diff": "easy",
    "q": "Warum geht ein echter Biskuitteig im heißen Backofen auch ganz ohne Backpulver wunderbar auf?",
    "a": [
      "Durch die beim Aufschlagen der Eier mechanisch eingeschlagene Luft",
      "Durch die natürliche Gärung von Milchsäurebakterien im Mehl",
      "Durch eine chemische Reaktion von Kristallzucker mit Ofenhitze",
      "Durch das Verdunsten von hochprozentigem Alkohol im Teig"
    ],
    "explanation": "Die eingeschlossenen winzigen Luftbläschen im steifen Eischnee dehnen sich bei Hitze enorm aus, während das Eieiweiß gerinnt und dem Teig seine stabile, wattige Struktur gibt.",
    "exp": "Die eingeschlossenen winzigen Luftbläschen im steifen Eischnee dehnen sich bei Hitze enorm aus, während das Eieiweiß gerinnt und dem Teig seine stabile, wattige Struktur gibt."
  },
  {
    "cat": "teige_cremes_physik",
    "diff": "easy",
    "q": "Was bedeutet die klassische Konditoren-Faustregel „1-2-3-Teig“ beim Kneten von Mürbeteig?",
    "a": [
      "Ein Teil Zucker, zwei Teile Butter und drei Teile Mehl",
      "Ein Teil Eier, zwei Teile Zucker und drei Teile Butter",
      "Ein Teil Mehl, zwei Teile Wasser und drei Teile Nüsse",
      "Ein Teil Milch, zwei Teile Butter und drei Teile Stärke"
    ],
    "explanation": "Die goldene Mürbeteigformel lautet 1 Teil Zucker, 2 Teile Butter und 3 Teile Mehl (z. B. 100 g Zucker, 200 g Butter, 300 g Mehl). Schnell verkneten, damit die Butter nicht ölig wird!",
    "exp": "Die goldene Mürbeteigformel lautet 1 Teil Zucker, 2 Teile Butter und 3 Teile Mehl (z. B. 100 g Zucker, 200 g Butter, 300 g Mehl). Schnell verkneten, damit die Butter nicht ölig wird!"
  },
  {
    "cat": "teige_cremes_physik",
    "diff": "easy",
    "q": "Auf welcher Grundlage wird die traditionelle deutsche Buttercreme hergestellt?",
    "a": [
      "Auf Basis eines gekochten Puddings mit Milch und Stärke",
      "Auf Basis von reinem Zuckersirup und steifem Eiweiß",
      "Auf Basis von rohem Eigelb aufgeschlagen über Wasserdampf",
      "Auf Basis von geschlagener Sahne und pflanzlichem Kokosfett"
    ],
    "explanation": "Bei der deutschen Variante wird raumwarme Butter schaumig geschlagen und löffelweise mit zimmertemperiertem Vanillepudding verrührt. Haben beide unterschiedliche Temperaturen, gerinnt die Creme!",
    "exp": "Bei der deutschen Variante wird raumwarme Butter schaumig geschlagen und löffelweise mit zimmertemperiertem Vanillepudding verrührt. Haben beide unterschiedliche Temperaturen, gerinnt die Creme!"
  },
  {
    "cat": "teige_cremes_physik",
    "diff": "easy",
    "q": "Warum gelingt das Steifschlagen von Schlagsahne bei kühler Temperatur und hohem Fettgehalt am besten?",
    "a": [
      "Die Fettkügelchen verfestigen sich und bilden ein stabiles Gerüst",
      "Kälte aktiviert die Milchsäurebakterien für mehr Schaumbildung",
      "Warme Sahne bindet zu viel Feuchtigkeit aus der Umgebungsluft",
      "Der enthaltene Milchzucker kristallisiert erst bei unter vier Grad"
    ],
    "explanation": "Bei über 15 °C schmilzt das Milchfett in den Tröpfchen an und kann die Luftbläschen nicht mehr halten – statt fester Sahne entsteht dann schnell Butter!",
    "exp": "Bei über 15 °C schmilzt das Milchfett in den Tröpfchen an und kann die Luftbläschen nicht mehr halten – statt fester Sahne entsteht dann schnell Butter!"
  },
  {
    "cat": "teige_cremes_physik",
    "diff": "easy",
    "q": "Wozu legt man beim Blindbacken getrocknete Hülsenfrüchte auf Backpapier in eine Teigform?",
    "a": [
      "Um das Aufblähen und Schrumpfen des Teigrandes zu verhindern",
      "Um dem Teigboden ein herzhaftes Röstaroma zu verleihen",
      "Damit die Feuchtigkeit aus den Bohnen in den Teig einzieht",
      "Um die Backzeit im heißen Ofen um die Hälfte zu verkürzen"
    ],
    "explanation": "Das Gewicht von getrockneten Erbsen, Bohnen oder Keramikkugeln hält den Boden flach und verhindert, dass die Ränder herabrumpeln, bevor die feuchte Füllung hineinkommt.",
    "exp": "Das Gewicht von getrockneten Erbsen, Bohnen oder Keramikkugeln hält den Boden flach und verhindert, dass die Ränder herabrumpeln, bevor die feuchte Füllung hineinkommt."
  },
  {
    "cat": "teige_cremes_physik",
    "diff": "mid",
    "q": "Welche Zutat unterscheidet den sogenannten Wiener Boden vom reinen Biskuitboden?",
    "a": [
      "Flüssige, abgekühlte Butter für mehr Elastizität und Saftigkeit",
      "Ein großer Schuss Vollmilch oder frische flüssige Sahne",
      "Ein doppelter Anteil an frisch gereifter Bäckerhefe",
      "Fein zermahlene Haselnüsse anstelle von Weizenmehl"
    ],
    "explanation": "Die flüssige Butter macht den Wiener Boden elastischer, saftiger und mürber als den reinen Biskuit. Deshalb eignet er sich besonders gut für mehrstöckige Festtagstorten.",
    "exp": "Die flüssige Butter macht den Wiener Boden elastischer, saftiger und mürber als den reinen Biskuit. Deshalb eignet er sich besonders gut für mehrstöckige Festtagstorten."
  },
  {
    "cat": "teige_cremes_physik",
    "diff": "mid",
    "q": "Was geschieht beim namensgebenden „Abbrennen“ des Brandteiges im heißen Topf?",
    "a": [
      "Die Stärke verkleistert und überschüssiges Wasser verdampft",
      "Das Mehl wird angeröstet, um Bitterstoffe abzutöten",
      "Der Zucker karamellisiert für eine dunkle Gebäckfarbe",
      "Das zugegebene Fett trennt sich komplett von der Flüssigkeit"
    ],
    "explanation": "Wenn sich ein weißer Film auf dem Topfboden bildet, ist die Stärke verkleistert. Der entstehende Wasserdampf im heißen Backofen treibt Windbeutel und Eclairs riesengroß auf!",
    "exp": "Wenn sich ein weißer Film auf dem Topfboden bildet, ist die Stärke verkleistert. Der entstehende Wasserdampf im heißen Backofen treibt Windbeutel und Eclairs riesengroß auf!"
  },
  {
    "cat": "teige_cremes_physik",
    "diff": "mid",
    "q": "Wie wird das Eiweiß bei der berühmten italienischen Meringue-Buttercreme pasteurisiert und stabilisiert?",
    "a": [
      "Heißer Zuckersirup wird langsam in den laufenden Eischnee gegossen",
      "Das Eiweiß wird zusammen mit Gelatinepulver kurz aufgekocht",
      "Hochprozentiger Alkohol denaturiert das Eiklar auf chemischem Weg",
      "Frischer Zitronensaft wird im Verhältnis eins zu eins untergerührt"
    ],
    "explanation": "Der rund 118 °C heiße Zuckersirup pasteurisiert das Eiweiß, macht den Schaum seidenweich und ultrastabil. Danach wird die weiche Butter untergeschlagen.",
    "exp": "Der rund 118 °C heiße Zuckersirup pasteurisiert das Eiweiß, macht den Schaum seidenweich und ultrastabil. Danach wird die weiche Butter untergeschlagen."
  },
  {
    "cat": "teige_cremes_physik",
    "diff": "mid",
    "q": "Welches Mischungsverhältnis von Zartbitterschokolade zu Sahne gilt als Faustregel für eine streichfeste Ganache?",
    "a": [
      "Etwa zwei Teile Schokolade auf einen Teil flüssige Sahne (2:1)",
      "Etwa ein Teil Schokolade auf vier Teile flüssige Sahne (1:4)",
      "Etwa drei Teile Sahne auf einen Teil flüssige Schokolade (3:1)",
      "Exakt fünf Teile Schokolade auf einen Teil flüssige Sahne (5:1)"
    ],
    "explanation": "Bei Zartbitterschokolade nutzt man meist 2:1 (z. B. 400 g Schokolade auf 200 g Sahne). Bei Vollmilch braucht man ca. 2,5:1 und bei weißer Schokolade sogar 3:1.",
    "exp": "Bei Zartbitterschokolade nutzt man meist 2:1 (z. B. 400 g Schokolade auf 200 g Sahne). Bei Vollmilch braucht man ca. 2,5:1 und bei weißer Schokolade sogar 3:1."
  },
  {
    "cat": "teige_cremes_physik",
    "diff": "mid",
    "q": "Warum wird eine Gelatine-Creme mit frischer Ananas, Kiwi oder Papaya oft nicht fest?",
    "a": [
      "Pflanzliche Enzyme spalten die Proteinketten der Gelatine",
      "Die natürliche Fruchtsäure neutralisiert den Zucker komplett",
      "Der hohe Wassergehalt verdünnt die Gelatinemasse zu stark",
      "Die winzigen Fruchtkerne verhindern das Abkühlen der Creme"
    ],
    "explanation": "Das Enzym Bromelain in Ananas oder Actinidain in Kiwi zerlegt die Gelatine-Proteine. Kurzes Aufkochen der Früchte deaktiviert die Enzyme – oder man greift zu Dosenobst!",
    "exp": "Das Enzym Bromelain in Ananas oder Actinidain in Kiwi zerlegt die Gelatine-Proteine. Kurzes Aufkochen der Früchte deaktiviert die Enzyme – oder man greift zu Dosenobst!"
  },
  {
    "cat": "teige_cremes_physik",
    "diff": "mid",
    "q": "Aus welchem pflanzlichen Rohstoff wird das vegane Geliermittel Agar-Agar gewonnen?",
    "a": [
      "Aus getrockneten und gereinigten Meeres-Rotalgen",
      "Aus den Kernen sonnengetrockneter Bittermandeln",
      "Aus der Rinde südamerikanischer Birkenbäume",
      "Aus stärkehaltigen Knollen der Maniokpflanze"
    ],
    "explanation": "Agar-Agar geliert viel stärker als tierische Gelatine und muss mindestens 1–2 Minuten sprudelnd kochen, um seine volle Gelierkraft beim Abkühlen zu entfalten.",
    "exp": "Agar-Agar geliert viel stärker als tierische Gelatine und muss mindestens 1–2 Minuten sprudelnd kochen, um seine volle Gelierkraft beim Abkühlen zu entfalten."
  },
  {
    "cat": "teige_cremes_physik",
    "diff": "mid",
    "q": "Warum muss Kuvertüre vor dem Überziehen einer Torte fachgerecht temperiert werden?",
    "a": [
      "Damit sich stabile Fettkristalle für Glanz und Knack bilden",
      "Um den Schmelzpunkt auf über sechzig Grad anzuheben",
      "Damit sich der Zucker gleichmäßig in der Masse auflöst",
      "Um unangenehme Bitterstoffe durch Verdampfung zu entfernen"
    ],
    "explanation": "Nur die sogenannte Kristallform V (Beta-Kristalle) der Kakaobutter sorgt für seidigen Glanz, knackigen Bruch und verhindert den unschönen grauen Fettreif.",
    "exp": "Nur die sogenannte Kristallform V (Beta-Kristalle) der Kakaobutter sorgt für seidigen Glanz, knackigen Bruch und verhindert den unschönen grauen Fettreif."
  },
  {
    "cat": "teige_cremes_physik",
    "diff": "mid",
    "q": "Warum darf der Rand einer Springform für Biskuitteig vor dem Backen keinesfalls eingefettet werden?",
    "a": [
      "Der Teig rutscht am Fett ab und fällt kuppelförmig ein",
      "Das heiße Fett führt zu gefährlichen Stichflammen im Ofen",
      "Das Fett zersetzt das Backpapier am Formboden chemisch",
      "Der Biskuit nimmt einen unangenehmen Ranzgeschmack an"
    ],
    "explanation": "Biskuitteig muss sich am Rand der Form „hochkrallen“ können. Fettet man den Rand ein, rutscht der Teig beim Aufgehen ab, bildet einen unschönen Hügel in der Mitte und sackt zusammen!",
    "exp": "Biskuitteig muss sich am Rand der Form „hochkrallen“ können. Fettet man den Rand ein, rutscht der Teig beim Aufgehen ab, bildet einen unschönen Hügel in der Mitte und sackt zusammen!"
  },
  {
    "cat": "teige_cremes_physik",
    "diff": "pro",
    "q": "Woraus besteht das Fundament der traditionellen französischen Buttercreme?",
    "a": [
      "Aus Eigelb oder ganzen Eiern schaumig gerührt mit heißem Sirup",
      "Aus püriertem Apfelmus verfeinert mit geröstetem Nussmehl",
      "Aus aufgeschlagener Schlagsahne vermengt mit Kakaobutter",
      "Aus feinem Quark gesüßt mit flüssigem Bienenhonig"
    ],
    "explanation": "Die französische Buttercreme nutzt Eigelb statt Eiweiß. Dadurch bekommt sie eine warme, gelbliche Farbe, schmeckt unglaublich cremig und schmilzt samtig auf der Zunge.",
    "exp": "Die französische Buttercreme nutzt Eigelb statt Eiweiß. Dadurch bekommt sie eine warme, gelbliche Farbe, schmeckt unglaublich cremig und schmilzt samtig auf der Zunge."
  },
  {
    "cat": "teige_cremes_physik",
    "diff": "pro",
    "q": "Was geschieht physikalisch, wenn man einen Rührteig nach der Mehlzugabe zu lange und zu intensiv rührt?",
    "a": [
      "Das Klebereiweiß Gluten bildet zähe Fäden und macht den Teig speckig",
      "Das zugegebene Backpulver verliert seine chemische Triebkraft völlig",
      "Der Zucker verbrennt durch die hohe Reibungswärme im Rührbecher",
      "Das Eigelb trennt sich irreversibel vom flüssigen Fett der Butter"
    ],
    "explanation": "Sobald das Mehl im Teig ist, sollte man nur noch kurz unterrühren. Zu langes Rühren aktiviert das Glutengerüst, wodurch der Kuchen zäh und gummig („speckig“) statt mürbe und zart wird.",
    "exp": "Sobald das Mehl im Teig ist, sollte man nur noch kurz unterrühren. Zu langes Rühren aktiviert das Glutengerüst, wodurch der Kuchen zäh und gummig („speckig“) statt mürbe und zart wird."
  },
  {
    "cat": "teige_cremes_physik",
    "diff": "pro",
    "q": "Welche Weizenmehl-Type ist in Deutschland der handwerkliche Standard für besonders feine Tortenbiskuits?",
    "a": [
      "Type 405 mit geringem Mineralstoff- und Klebergehalt",
      "Type 1050 mit hohem Schalen- und Ballaststoffanteil",
      "Type 812 für besonders kräftige dunkle Mischbrote",
      "Type 550 als klassisches backstarkes Mehl für Pizza"
    ],
    "explanation": "Type 405 ist besonders feinkörnig, hell und enthält weniger zähes Klebereiweiß, was Biskuit- und Rührteigen ihre zarte, feine Porung verleiht.",
    "exp": "Type 405 ist besonders feinkörnig, hell und enthält weniger zähes Klebereiweiß, was Biskuit- und Rührteigen ihre zarte, feine Porung verleiht."
  },

  // =========================================================================
  // 4. DEKORATION, MOTIVTORTEN & HANDWERK (14 Fragen: 4 easy, 7 mid, 3 pro)
  // =========================================================================
  {
    "cat": "deko_handwerk",
    "diff": "easy",
    "q": "Warum darf Rollfondant niemals direkt mit einer frischen Sahne- oder Puddingfüllung in Berührung kommen?",
    "a": [
      "Die Feuchtigkeit löst den Zucker des Fondants auf und er schmilzt",
      "Das Milchfett verfärbt die weiße Zuckermasse tiefschwarz",
      "Es kommt zu einer giftigen chemischen Reaktion mit der Stärke",
      "Die Sahne beginnt innerhalb weniger Minuten sauer zu werden"
    ],
    "explanation": "Fondant besteht fast nur aus Zucker. Wasser aus Sahne oder Pudding zieht Feuchtigkeit an, sodass der Fondant schwitzt, klebrig wird und schließlich wie Sirup herabtropft!",
    "exp": "Fondant besteht fast nur aus Zucker. Wasser aus Sahne oder Pudding zieht Feuchtigkeit an, sodass der Fondant schwitzt, klebrig wird und schließlich wie Sirup herabtropft!"
  },
  {
    "cat": "deko_handwerk",
    "diff": "easy",
    "q": "Was unterscheidet echte Marzipanrohmasse grundlegend von weißem Rollfondant?",
    "a": [
      "Marzipan besteht aus Mandeln, Fondant aus purem Zucker",
      "Marzipan wird aus Sojabohnen erzeugt, Fondant aus Palmöl",
      "Marzipan enthält immer Gelatine, Fondant ist rein pflanzlich",
      "Marzipan schmilzt im Ofen, während Fondant hitzefest backt"
    ],
    "explanation": "Marzipanrohmasse enthält aromatische Mandeln und wenig Zucker. Fondant ist eine weiße Masse aus Puderzucker, Glukosesirup und Wasser – geschmacklich süß, aber neutral.",
    "exp": "Marzipanrohmasse enthält aromatische Mandeln und wenig Zucker. Fondant ist eine weiße Masse aus Puderzucker, Glukosesirup und Wasser – geschmacklich süß, aber neutral."
  },
  {
    "cat": "deko_handwerk",
    "diff": "easy",
    "q": "Was ist das typische Erkennungsmerkmal eines modernen Drip Cakes?",
    "a": [
      "Schokoladen- oder Fruchtglasur, die am Tortenrand herabtropft",
      "Ein transparenter Tortenboden aus geliertem Quellwasser",
      "Eine Torte, die vor dem Anschneiden mit Kaffeesirup übergossen wird",
      "Mehrere unregelmäßig geformte Löcher im Inneren der Biskuitschichten"
    ],
    "explanation": "Der Drip Cake (von englisch „to drip“ = tropfen) wurde durch Food-Blogger weltberühmt. Die Ganache muss genau die richtige Temperatur haben, damit die Tropfen auf halbem Weg stoppen.",
    "exp": "Der Drip Cake (von englisch „to drip“ = tropfen) wurde durch Food-Blogger weltberühmt. Die Ganache muss genau die richtige Temperatur haben, damit die Tropfen auf halbem Weg stoppen."
  },
  {
    "cat": "deko_handwerk",
    "diff": "easy",
    "q": "Wozu verwendet der Konditor beim Einstreichen von Torten eine Winkelpalette?",
    "a": [
      "Zum ergonomischen Verstreichen von Cremes und Glasuren",
      "Zum exakten Ausmessen von 90-Grad-Winkeln bei Schnitten",
      "Zum sicheren Tragen heißer Backbleche aus dem Steinofen",
      "Zum schnellen Zerkleinern harter Schokolade vor dem Schmelzen"
    ],
    "explanation": "Der Knick in der Klinge sorgt dafür, dass die Hand parallel über der Torte bleibt und die Finger nicht in die Creme geraten. Ein unverzichtbares Werkzeug beim Einstreichen!",
    "exp": "Der Knick in der Klinge sorgt dafür, dass die Hand parallel über der Torte bleibt und die Finger nicht in die Creme geraten. Ein unverzichtbares Werkzeug beim Einstreichen!"
  },
  {
    "cat": "deko_handwerk",
    "diff": "mid",
    "q": "Wodurch erhält die moderne Tortenglasur Mirror Glaze ihren faszinierenden, spiegelglatten Glanz?",
    "a": [
      "Durch eine Emulsion aus Gelatine, Glukosesirup und Kondensmilch",
      "Durch ultrafeines Polieren mit speziellem Speisewachs",
      "Durch das Besprühen mit flüssigem Bienenwachs aus der Dose",
      "Durch das Auftragen von mehreren Schichten reinem Eiweiß"
    ],
    "explanation": "Mirror Glaze wird auf eine tiefgefrorene Mousse-Torte gegossen. Die Gelatine erstarrt blitzschnell zu einer makellosen, spiegelnden Oberfläche, in der man sich spiegeln kann!",
    "exp": "Mirror Glaze wird auf eine tiefgefrorene Mousse-Torte gegossen. Die Gelatine erstarrt blitzschnell zu einer makellosen, spiegelnden Oberfläche, in der man sich spiegeln kann!"
  },
  {
    "cat": "deko_handwerk",
    "diff": "mid",
    "q": "Worin besteht der optische Unterschied zwischen einem Naked Cake und einem Semi-Naked Cake?",
    "a": [
      "Beim Semi-Naked Cake schimmern die Böden durch eine dünne Schicht Creme",
      "Der Naked Cake wird vollkommen ohne Teig nur aus Früchten gebaut",
      "Der Semi-Naked Cake verzichtet vollständig auf süße Füllcremes",
      "Beim Naked Cake werden die Tortenböden vor dem Servieren flambiert"
    ],
    "explanation": "Während beim Naked Cake die Ränder komplett nackt bleiben, wird der Semi-Naked Cake ganz dünn mit Creme abgezogen („Crumb Coat“), sodass die Biskuitlagen rustikal durchscheinen.",
    "exp": "Während beim Naked Cake die Ränder komplett nackt bleiben, wird der Semi-Naked Cake ganz dünn mit Creme abgezogen („Crumb Coat“), sodass die Biskuitlagen rustikal durchscheinen."
  },
  {
    "cat": "deko_handwerk",
    "diff": "mid",
    "q": "Woraus wird das traditionelle Royal Icing (Eiweißspritzglasur) für filigrane Tortenverzierungen angerührt?",
    "a": [
      "Aus feinstem Puderzucker, frischem Eiklar und etwas Zitronensaft",
      "Aus geschmolzener Kakaobutter gemischt mit weißer Schokolade",
      "Aus aufgeschlagener Sahne versetzt mit kaltem Agar-Agar-Gel",
      "Aus flüssigem Honig verrührt mit glutenfreiem Maisstärkemehl"
    ],
    "explanation": "Royal Icing trocknet steinhart und schneeweiß aus. Es ist das traditionelle Material für viktorianische Hochzeitstorten, filigrane Ornamente und feine Spitzenmuster.",
    "exp": "Royal Icing trocknet steinhart und schneeweiß aus. Es ist das traditionelle Material für viktorianische Hochzeitstorten, filigrane Ornamente und feine Spitzenmuster."
  },
  {
    "cat": "deko_handwerk",
    "diff": "mid",
    "q": "Warum sackt eine mehrstöckige Hochzeitstorte mit mehreren Etagen nicht unter ihrem eigenen Gewicht zusammen?",
    "a": [
      "Durch versteckte Stützstäbe und feste Zwischenböden in jeder Etage",
      "Weil die unteren Böden aus nicht essbarem Gips gebacken werden",
      "Durch den dauerhaften Einsatz von tiefgefrorener Buttercreme",
      "Weil die Torte durch magnetische Schwebestifte entlastet wird"
    ],
    "explanation": "Jede Etage ruht auf einer Tortenplatte (Cake Board), die von darunterliegenden Holz- oder Kunststoffstäben (Dowels) getragen wird. So trägt jede Etage nur sich selbst!",
    "exp": "Jede Etage ruht auf einer Tortenplatte (Cake Board), die von darunterliegenden Holz- oder Kunststoffstäben (Dowels) getragen wird. So trägt jede Etage nur sich selbst!"
  },
  {
    "cat": "deko_handwerk",
    "diff": "mid",
    "q": "Welches typische Dekorationsmuster erzeugt eine klassische Sterntülle am Spritzbeutel?",
    "a": [
      "Rillenförmige Rosetten, Sterne und geschwungene Muschelbordüren",
      "Völlig glatte Punkte und feine handgeschriebene Buchstaben",
      "Zweidimensionale flache Bänder für geflochtene Korbmuster",
      "Hauchdünne grüne Blattformen mit feinen Blattrippen"
    ],
    "explanation": "Sterntüllen (offen oder geschlossen) sind der Klassiker für Sahnetupfen auf der Schwarzwälder Kirschtorte, dekorative Bordüren und opulente Creme-Rosetten.",
    "exp": "Sterntüllen (offen oder geschlossen) sind der Klassiker für Sahnetupfen auf der Schwarzwälder Kirschtorte, dekorative Bordüren und opulente Creme-Rosetten."
  },
  {
    "cat": "deko_handwerk",
    "diff": "mid",
    "q": "Warum ist ein kugelgelagerter Drehteller beim Einstreichen einer Torte eine enorme Arbeitserleichterung?",
    "a": [
      "Man kann die Torte mit einer Hand ruhig an der Palette vorbeidrehen",
      "Durch die Fliehkraft verteilt sich die Creme vollkommen von allein",
      "Er verhindert das vorzeitige Erkalten von heißer Schokoladenglasur",
      "Er dient gleichzeitig als integrierte elektronische Küchenwaage"
    ],
    "explanation": "Mit einem guten Drehteller führt der Bäcker die Palette oder den Teigschaber ruhig in einer Position, während die Drehung für absolut makellose, glatte Ränder sorgt.",
    "exp": "Mit einem guten Drehteller führt der Bäcker die Palette oder den Teigschaber ruhig in einer Position, während die Drehung für absolut makellose, glatte Ränder sorgt."
  },
  {
    "cat": "deko_handwerk",
    "diff": "mid",
    "q": "Warum setzen Konditoren Sahne- und Cremetorten fast immer in einem hohen Tortenring zusammen?",
    "a": [
      "Damit die weiche Creme beim Kühlen exakt senkrecht in Form bleibt",
      "Um das Eindringen von Kühlschrankgerüchen komplett zu verhindern",
      "Damit der Biskuitboden im Kühlschrank schneller Feuchtigkeit aufsaugt",
      "Weil der Ring die Haltbarkeit der Torte um mehrere Wochen verlängert"
    ],
    "explanation": "Erst wenn Gelatine oder Butter in der Füllung durchgekühlt und fest sind, wird der Ring vorsichtig gelöst – für messerscharfe, saubere Kanten!",
    "exp": "Erst wenn Gelatine oder Butter in der Füllung durchgekühlt und fest sind, wird der Ring vorsichtig gelöst – für messerscharfe, saubere Kanten!"
  },
  {
    "cat": "deko_handwerk",
    "diff": "pro",
    "q": "Welcher maximale Zusatz an Haushaltszucker ist bei geschütztem Lübecker Edelmarzipan gesetzlich erlaubt?",
    "a": [
      "Maximal 30 Prozent Zucker auf 70 Prozent Rohmasse",
      "Bis zu 65 Prozent Zucker auf 35 Prozent Rohmasse",
      "Genau 50 Prozent Zucker auf 50 Prozent Rohmasse",
      "Kein Gramm zusätzlicher Zucker über die Rohmasse hinaus"
    ],
    "explanation": "Während herkömmliches Marzipan bis zu 50 % Zuckerzusatz haben darf, verlangt Lübecker Edelmarzipan mindestens 70 % Marzipanrohmasse und höchstens 30 % Zuckerzusatz – das macht es so edel!",
    "exp": "Während herkömmliches Marzipan bis zu 50 % Zuckerzusatz haben darf, verlangt Lübecker Edelmarzipan mindestens 70 % Marzipanrohmasse und höchstens 30 % Zuckerzusatz – das macht es so edel!"
  },
  {
    "cat": "deko_handwerk",
    "diff": "pro",
    "q": "Warum nutzen moderne Zuckerbäcker für glasklare Deko-Skulpturen oft Isomalt statt Haushaltszucker?",
    "a": [
      "Es kristallisiert nicht so schnell aus und vergilbt bei Hitze kaum",
      "Es ist viermal so süß wie herkömmlicher weißer Kristallzucker",
      "Es löst sich bereits bei normaler Zimmertemperatur in Wasser auf",
      "Es ist extrem elastisch und lässt sich wie Hefeteig kneten"
    ],
    "explanation": "Isomalt ist ein Zuckeraustauschstoff. Er bleibt beim Schmelzen kristallklar, zieht weniger Luftfeuchtigkeit an und eignet sich perfekt für essbare Edelsteine, Wellen und Zuckerblasen.",
    "exp": "Isomalt ist ein Zuckeraustauschstoff. Er bleibt beim Schmelzen kristallklar, zieht weniger Luftfeuchtigkeit an und eignet sich perfekt für essbare Edelsteine, Wellen und Zuckerblasen."
  },
  {
    "cat": "deko_handwerk",
    "diff": "pro",
    "q": "Wie erzeugen Konditoren mit der Airbrush-Pistole den samtartigen Velvet-Effekt auf gefrorenen Torten?",
    "a": [
      "Durch Aufsprühen einer Mischung aus Kakaobutter und Schokolade",
      "Durch das Zerstäuben von feinstem Puderzucker mit Pflanzenöl",
      "Durch heißen Karamellsirup, der feine Fäden in der Luft zieht",
      "Durch stark gekühlte Vollmilch zur schnellen Befeuchtung"
    ],
    "explanation": "Die warme Kakaobutter-Schoko-Mischung trifft auf die tiefgefrorene Torte und kristallisiert in Sekundenbruchteilen zu winzigen Tröpfchen – so entsteht die samtige Textur!",
    "exp": "Die warme Kakaobutter-Schoko-Mischung trifft auf die tiefgefrorene Torte und kristallisiert in Sekundenbruchteilen zu winzigen Tröpfchen – so entsteht die samtige Textur!"
  },

  // =========================================================================
  // 5. GESCHICHTE, RECHT, REKORDE & KURIOSES (12 Fragen: 4 easy, 6 mid, 2 pro)
  // =========================================================================
  {
    "cat": "geschichte_recht_rekorde",
    "diff": "easy",
    "q": "Welches historische Ereignis begründete im 19. Jahrhundert den weltweiten Trend zur schneeweißen Hochzeitstorte?",
    "a": [
      "Die Hochzeit von Queen Victoria mit Prinz Albert im Jahr 1840",
      "Die Krönung von Napoleon Bonaparte zum Kaiser der Franzosen",
      "Die Eröffnung des ersten Zuckerbäcker-Salons in New York City",
      "Ein päpstliches Dekret zur Reinheit kirchlicher Hochzeitsfeste"
    ],
    "explanation": "Queen Victoria wählte nicht nur das weiße Brautkleid, sondern ließ ihre Torte mit reinweißem Zuckerguss („Royal Icing“) überziehen. Weißer raffinierter Zucker war damals ein Zeichen von Reichtum!",
    "exp": "Queen Victoria wählte nicht nur das weiße Brautkleid, sondern ließ ihre Torte mit reinweißem Zuckerguss („Royal Icing“) überziehen. Weißer raffinierter Zucker war damals ein Zeichen von Reichtum!"
  },
  {
    "cat": "geschichte_recht_rekorde",
    "diff": "easy",
    "q": "Was bedeutet der traditionelle Brauch, wer beim Anschneiden der Hochzeitstorte die Hand oben am Messer hat?",
    "a": [
      "Derjenige soll der Sage nach in der Ehe das Sagen haben",
      "Derjenige muss das nächste gemeinsame Auto der Familie bezahlen",
      "Demjenigen wird die Geburt von Zwillingen im ersten Ehejahr prophezeit",
      "Derjenige verpflichtet sich zum täglichen Kaffeekochen am Morgen"
    ],
    "explanation": "Beim gemeinsamen Anschneiden schauen viele Hochzeitsgäste ganz genau hin: Wer die Hand oben auf dem Messergriff platziert, beansprucht symbolisch das Regiment im Haushalt!",
    "exp": "Beim gemeinsamen Anschneiden schauen viele Hochzeitsgäste ganz genau hin: Wer die Hand oben auf dem Messergriff platziert, beansprucht symbolisch das Regiment im Haushalt!"
  },
  {
    "cat": "geschichte_recht_rekorde",
    "diff": "easy",
    "q": "In welchem legendären Filmklassiker fand die größte Tortenschlacht der Kinogeschichte statt?",
    "a": [
      "„Das große Rennen rund um die Welt“ (1965) von Blake Edwards",
      "„Moderne Zeiten“ (1936) mit dem berühmten Charlie Chaplin",
      "„Manche mögen’s heiß“ (1959) mit der bezaubernden Marilyn Monroe",
      "„Dick und Doof als Meisterköche“ (1942) von Laurel und Hardy"
    ],
    "explanation": "Für die vierminütige Tortenschlacht in einer Bäckerei wurden über 4.000 echte Torten verfeuert. Der Dreh dauerte fünf Tage und kostete damals ein kleines Vermögen!",
    "exp": "Für die vierminütige Tortenschlacht in einer Bäckerei wurden über 4.000 echte Torten verfeuert. Der Dreh dauerte fünf Tage und kostete damals ein kleines Vermögen!"
  },
  {
    "cat": "geschichte_recht_rekorde",
    "diff": "easy",
    "q": "Warum wird die heiße Biskuitplatte für eine Biskuitrolle direkt nach dem Backen mit einem feuchten Tuch aufgerollt?",
    "a": [
      "Damit der Teig elastisch bleibt und beim späteren Füllen nicht bricht",
      "Um die Backzeit durch die eingeschlossene Restfeuchtigkeit zu stoppen",
      "Damit sich der Puderzucker tief in die feinen Teigporen einbrennt",
      "Um überflüssiges Fett aus dem Biskuitboden herauszupressen"
    ],
    "explanation": "Rollt man den Biskuit erst nach dem Erkalten auf, bricht die empfindliche Kruste in Stücke. Im warmen Zustand prägt sich das „Formgedächtnis“ ohne Risse ein.",
    "exp": "Rollt man den Biskuit erst nach dem Erkalten auf, bricht die empfindliche Kruste in Stücke. Im warmen Zustand prägt sich das „Formgedächtnis“ ohne Risse ein."
  },
  {
    "cat": "geschichte_recht_rekorde",
    "diff": "mid",
    "q": "Was schreiben die deutschen Leitsätze für Feine Backwaren für eine echte „Buttercremetorte“ vor?",
    "a": [
      "Die Creme darf kein anderes Fett als echte Butter enthalten",
      "Mindestens die Hälfte des Gesamtgewichts muss aus Butter bestehen",
      "Sie muss zwingend mit gelbem Hühnereigelb eingefärbt werden",
      "Die Butter muss vor der Verarbeitung mindestens sechs Monate reifen"
    ],
    "explanation": "Wird auch nur ein Gramm Pflanzenmargarine oder Palmfett in die Creme gemischt, darf sie in Deutschland rechtlich nur noch als „Kremtorte“ (mit K!) verkauft werden.",
    "exp": "Wird auch nur ein Gramm Pflanzenmargarine oder Palmfett in die Creme gemischt, darf sie in Deutschland rechtlich nur noch als „Kremtorte“ (mit K!) verkauft werden."
  },
  {
    "cat": "geschichte_recht_rekorde",
    "diff": "mid",
    "q": "Warum schmecken viele Sahne- und Cremetorten am zweiten Tag oft deutlich harmonischer als direkt nach dem Backen?",
    "a": [
      "Aromen verbinden sich und Feuchtigkeit verteilt sich gleichmäßig im Biskuit",
      "Der Alkoholgehalt verdreifacht sich durch anaerobe Nachgärung",
      "Das Mehl bildet über Nacht neue süße Fruchtzucker-Moleküle",
      "Die Eiweißketten im Biskuit werden durch Kühlschrankkälte flüssig"
    ],
    "explanation": "Beim Durchziehen wandert Feuchtigkeit aus Cremes und Früchten in den Biskuit, während Fette und Aromastoffe wie Vanille, Rum oder Schokolade zu einem runden Geschmackserlebnis verschmelzen.",
    "exp": "Beim Durchziehen wandert Feuchtigkeit aus Cremes und Früchten in den Biskuit, während Fette und Aromastoffe wie Vanille, Rum oder Schokolade zu einem runden Geschmackserlebnis verschmelzen."
  },
  {
    "cat": "geschichte_recht_rekorde",
    "diff": "mid",
    "q": "Welcher unglaubliche Luxus trieb den Preis der Rekordtorte von Debbie Wingham auf rund 75 Millionen Dollar?",
    "a": [
      "Tausende echte Diamanten und Edelsteine eingearbeitet in die Deko",
      "Ein Überzug aus essbarem Feingold aus historischen Maya-Schätzen",
      "Ein zweitausend Jahre alter Wüstensirup als einzige Zutat für die Süße",
      "Eine integrierte echte Armbanduhr mit ewigem Kalender im Tortenboden"
    ],
    "explanation": "Die britische Designerin Debbie Wingham schuf 2015 für einen wohlhabenden Kunden in den VAE eine Torte in Form eines Laufstegs – besetzt mit über 4.000 echten Diamanten!",
    "exp": "Die britische Designerin Debbie Wingham schuf 2015 für einen wohlhabenden Kunden in den VAE eine Torte in Form eines Laufstegs – besetzt mit über 4.000 echten Diamanten!"
  },
  {
    "cat": "geschichte_recht_rekorde",
    "diff": "mid",
    "q": "Welcher Weltrekord für die längste Torte der Welt wurde 2020 im indischen Bundesstaat Kerala aufgestellt?",
    "a": [
      "Eine über sechs Kilometer lange Torte quer über Festtische",
      "Eine achthundert Meter hohe Torte mit eigenem Stahlgerüst",
      "Eine Torte mit dem Durchmesser eines kompletten Fußballstadions",
      "Eine fünfzig Tonnen schwere Torte in der Form des Himalaya-Gebirges"
    ],
    "explanation": "Rund 1.500 Bäcker und Konditoren backten in Thrissur eine Vanille-Schoko-Torte von 6,5 Kilometern Länge und über 27 Tonnen Gewicht auf tausenden zusammenhängenden Tischen!",
    "exp": "Rund 1.500 Bäcker und Konditoren backten in Thrissur eine Vanille-Schoko-Torte von 6,5 Kilometern Länge und über 27 Tonnen Gewicht auf tausenden zusammenhängenden Tischen!"
  },
  {
    "cat": "geschichte_recht_rekorde",
    "diff": "mid",
    "q": "Welcher Zunftstreit trennte im Mittelalter den Beruf des Bäckers von dem des Konditors?",
    "a": [
      "Bäcker durften Brot und Mehl backen, Konditoren Zucker und Honig veredeln",
      "Bäcker arbeiteten ausschließlich nachts, Konditoren nur am Nachmittag",
      "Bäcker backten nur für Bürger, Konditoren ausschließlich für den Hochadel",
      "Bäcker nutzten Holzöfen, Konditoren durften nur mit Steinkohle heizen"
    ],
    "explanation": "Der Begriff „Konditor“ leitet sich vom lateinischen „condire“ (würzen, einlegen) ab. Aus den mittelalterlichen Lebküchnern und Zuckerbäckern entstand der eigenständige Handwerksberuf.",
    "exp": "Der Begriff „Konditor“ leitet sich vom lateinischen „condire“ (würzen, einlegen) ab. Aus den mittelalterlichen Lebküchnern und Zuckerbäckern entstand der eigenständige Handwerksberuf."
  },
  {
    "cat": "geschichte_recht_rekorde",
    "diff": "mid",
    "q": "Warum frieren viele Brautpaare in Großbritannien und den USA das oberste Stockwerk ihrer Hochzeitstorte ein?",
    "a": [
      "Um es am ersten Hochzeitstag oder zur Taufe des ersten Kindes zu essen",
      "Um es im Falle einer Scheidung als Glücksbringer rituell zu verbrennen",
      "Weil der Zucker nach einem Jahr im Gefrierfach zu Honig fermentiert",
      "Um den Konditor auf die langfristige Frischegarantie zu verklagen"
    ],
    "explanation": "Traditionelle britische Hochzeitstorten sind schwere Früchtekuchen mit Alkohol unter Marzipan und Royal Icing. Luftdicht verpackt halten sie tiefgekühlt problemlos über ein Jahr!",
    "exp": "Traditionelle britische Hochzeitstorten sind schwere Früchtekuchen mit Alkohol unter Marzipan und Royal Icing. Luftdicht verpackt halten sie tiefgekühlt problemlos über ein Jahr!"
  },
  {
    "cat": "geschichte_recht_rekorde",
    "diff": "pro",
    "q": "Welcher Mindestalkoholgehalt gilt laut den deutschen Leitsätzen für Feine Backwaren für eine Schwarzwälder Kirschtorte?",
    "a": [
      "Kein fester Prozentwert, aber Kirschwasser muss deutlich schmeckbar sein",
      "Mindestens fünf Prozent reiner Alkohol bezogen auf das Gesamtgewicht",
      "Exakt zehn Milliliter reiner Schnaps pro verkauftem Tortenstück",
      "Mindestens fünfzehn Prozent Alkoholvolumen in der Sahneschicht"
    ],
    "explanation": "Die Leitsätze schreiben vor, dass der Kirschwassergeschmack „deutlich wahrnehmbar“ sein muss. Eine Torte ganz ohne Alkohol darf in der Konditorei nicht so heißen!",
    "exp": "Die Leitsätze schreiben vor, dass der Kirschwassergeschmack „deutlich wahrnehmbar“ sein muss. Eine Torte ganz ohne Alkohol darf in der Konditorei nicht so heißen!"
  },
  {
    "cat": "geschichte_recht_rekorde",
    "diff": "pro",
    "q": "Für wen kreierte der französische Meisterkoch Marie-Antoine Carême das Dessert Charlotte Russe?",
    "a": [
      "Zu Ehren von Zar Alexander I. von Russland und Prinzessin Charlotte",
      "Für die russische Zarin Katharina die Große während ihrer Kurreise",
      "Für Queen Victoria als handliches Gebäck für englische Bahnreisen",
      "Für Kaiserin Sisi von Österreich nach ihrer Krönung in Budapest"
    ],
    "explanation": "Marie-Antoine Carême, der „König der Köche und Koch der Könige“, kleidete eine Form mit Löffelbiskuits aus und füllte sie mit Crème bavaroise. Benannt nach seinem russischen Dienstherrn!",
    "exp": "Marie-Antoine Carême, der „König der Köche und Koch der Könige“, kleidete eine Form mit Löffelbiskuits aus und füllte sie mit Crème bavaroise. Benannt nach seinem russischen Dienstherrn!"
  }
  ];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === 'function') {
    window.ArcadeQuizEngine.registerBank('torten', QUESTIONS);
  }
})();
