// Konfigurations- und Fragendatenbank für das versteckte Restaurant-Quiz "Herr Tutto (Eilendorf)"
// Hinweis für Admins: Alle Texte, Fragen, Antworten, Erklärungen und Ergebnis-Stufen
// lassen sich hier zentral anpassen, ohne den HTML-/Anwendungscode zu berühren.
(function () {
  const QUESTIONS = [
    {
      id: 'ht_01',
      cat: 'Herkunft & Geschichte',
      diff: 'easy',
      q: 'In welcher italienischen Stadt wurde Herr Tutto geboren, bevor es ihn später nach Deutschland zog?',
      a: [
        'Modena',
        'Verona',
        'Bologna',
        'Florenz'
      ],
      correct: 0,
      explanation: 'Herr Tutto wurde in Modena geboren und entdeckte dort schon als Kind in der Küche seiner Mamma die Liebe zur italienischen Kochkunst.'
    },
    {
      id: 'ht_02',
      cat: 'Tradition & Ritual',
      diff: 'easy',
      q: 'Was bleibt bei Herr Tutto in Eilendorf stets für den Namensgeber reserviert, während er durch die Welt reist?',
      a: [
        'Ein eigener Tisch im Lokal',
        'Ein silberner Pizzaschieber',
        'Ein Stammplatz an der Bar',
        'Ein eigener Parkplatz draußen'
      ],
      correct: 0,
      explanation: 'Falls Herr Tutto eines Tages spontan vorbeischaut, bleibt immer ein Tisch für ihn reserviert – bis dahin schickt er Postkarten voller Rezeptideen.'
    },
    {
      id: 'ht_03',
      cat: 'Markenzeichen',
      diff: 'easy',
      q: 'Welches stilvolle Accessoire ist das unverwechselbare Markenzeichen im Logo von Herr Tutto?',
      a: [
        'Ein klassischer Hut',
        'Eine rote Fliege',
        'Eine runde Brille',
        'Ein dunkler Schal'
      ],
      correct: 0,
      explanation: 'Herr Tutto verlässt niemals ohne seinen Hut das Haus – genau deshalb ziert die markante Hut-Silhouette mit den Initialen „HT“ das Emblem.'
    },
    {
      id: 'ht_04',
      cat: 'Aachen-Eilendorf',
      diff: 'mid',
      q: 'An welcher Straße in Aachen-Eilendorf empfängt Herr Tutto seine Gäste?',
      a: [
        'Von-Coels-Straße',
        'Oppenhoffallee',
        'Wilhelmstraße',
        'Jülicher Straße'
      ],
      correct: 0,
      explanation: 'In der Von-Coels-Straße 212 in Aachen-Eilendorf verbindet Herr Tutto gemütliche Atmosphäre mit beheizter Terrasse und echter Gastfreundschaft.'
    },
    {
      id: 'ht_05',
      cat: 'Speisekarte & Pasta',
      diff: 'mid',
      q: 'Welche besondere Pasta-Kombination gilt bei Herr Tutto in Eilendorf als beliebte Eigenkreation?',
      a: [
        'Pasta Pollo e Mango',
        'Pasta Tonno e Limone',
        'Pasta Manzo e Pistacchio',
        'Pasta Salmone e Fichi'
      ],
      correct: 0,
      explanation: 'Neben Klassikern wie Lasagne oder Aglio e Olio verbindet die beliebte Pasta Pollo e Mango zarte Hähnchenbrust mit einer fruchtigen Reise-Note.'
    },
    {
      id: 'ht_06',
      cat: 'Steak & Pizza',
      diff: 'mid',
      q: 'Welches edle Rindfleisch-Highlight serviert die Küche sowohl als Rumpsteak als auch auf der Pizza Parma di Manzo?',
      a: [
        'Black Angus Rind',
        'Chianina Rinderfilet',
        'Simmentaler Kalb',
        'Piemonteser Weideochse'
      ],
      correct: 0,
      explanation: 'Ob als 200g Rumpsteak mit hausgemachten Pommes oder als luftgereifter Rinderschinken auf Pizza – Black Angus steht für feinen Geschmack.'
    },
    {
      id: 'ht_07',
      cat: 'Küche & Philosophie',
      diff: 'easy',
      q: 'Welche drei kulinarischen Begriffe stehen auf der Startseite von Herr Tutto gleichberechtigt nebeneinander?',
      a: [
        'Pizza, Pasta, Vegan',
        'Suppe, Salat, Wein',
        'Fisch, Steak, Dessert',
        'Antipasti, Brot, Öl'
      ],
      correct: 0,
      explanation: 'Italienische Tradition trifft Moderne: Pizza, hausgemachte Pasta und vegane Spezialitäten bilden das kulinarische Trio – begleitet von Aperol Spritz und Gin-Drinks.'
    }
  ];

  // Klar strukturierte UI- und Auswertungs-Konfiguration (einfach durch Admins anpassbar)
  window.HERR_TUTTO_QUIZ_CONFIG = {
    quizId: 'quiz_herr_tutto',
    bankId: 'herr_tutto',
    restaurant: {
      name: 'Herr Tutto',
      subtitle: 'Italian Kitchen · Eilendorf',
      address: 'Von-Coels-Straße 212 · 52080 Aachen-Eilendorf',
      phone: '0241 90071892',
      website: 'https://herrtutto-eilendorf.de/'
    },
    startScreen: {
      eyebrow: 'ITALIAN KITCHEN · EILENDORF',
      headline: 'Die kulinarische Reise des Herr Tutto',
      storyParagraphs: [
        'Geboren im italienischen Modena, entdeckte Herr Tutto schon früh die Liebe zu alten Familienrezepten und authentischen Aromen. Bis <em>heute</em> schickt er uns regelmäßig Postkarten mit neuen Ideen, die direkt in unsere Küche in Eilendorf finden.',
        'Für ihn bleibt bei uns stets ein Tisch <em>reserviert</em>. Bereit, ein Stück dieser <em>Geschichte</em> zu testen? Entdecke in 7 Fragen unsere Spezialitäten zwischen Pizza, Pasta, Black Angus und Eilendorf.'
      ],
      startButtonLabel: 'Quiz starten'
    },
    resultTiers: [
      {
        minCorrect: 6,
        title: 'Stammgast-Legende',
        badge: 'Ehrenplatz am reservierten Tisch',
        message: 'Chapeau! Du kennst nicht nur unsere Spezialitäten zwischen Pizza, Pasta und Black Angus, sondern auch jede Postkarte aus Herr Tuttos Geschichte.'
      },
      {
        minCorrect: 3,
        title: 'Feinschmecker',
        badge: 'Kenner der italienischen Küche',
        message: 'Ottimo! Du hast ein echtes Gespür für authentische Aromen und unseren Standort in Eilendorf. Noch ein gemütlicher Abend an der Von-Coels-Straße und der Stammgast-Titel ist dir sicher.'
      },
      {
        minCorrect: 0,
        title: 'Erster Besuch',
        badge: 'Willkommen an Herr Tuttos Tafel',
        message: 'Benvenuto! Jeder Genießer fängt einmal mit der ersten Vorspeise an. Stöbere durch unsere Küche in Eilendorf und probiere direkt noch eine Runde.'
      }
    ],
    rewardPlaceholder: {
      enabled: true,
      label: 'Vorteils- & Gutschein-Hinweis (Platzhalter)',
      headline: 'Hier kann künftig dein Stammgast-Vorteil erscheinen',
      text: 'Reserviert für eine spätere Aktion: Zum Beispiel ein Espresso-Gruß des Hauses oder ein persönlicher Rabattcode ab 6 von 7 richtigen Antworten.',
      code: 'TUTTO-EILENDORF-DEMO'
    },
    questions: QUESTIONS
  };

  window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
  window.ARCADE_QUIZ_BANKS.herr_tutto = QUESTIONS;
  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === 'function') {
    window.ArcadeQuizEngine.registerBank('herr_tutto', QUESTIONS);
  }
})();
