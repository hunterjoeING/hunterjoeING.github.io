// Unified quiz bank for "golf_plaetze" (75 questions: Legendäre Plätze, Begriffe & Kurioses)
(function () {
  const DATA = [];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("golf_plaetze", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["golf_plaetze"] = DATA;
  }
})();
