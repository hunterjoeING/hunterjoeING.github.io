// Unified quiz bank for "golf_regeln" (75 questions: Regeln, Etikette & Scoring)
(function () {
  const DATA = [];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("golf_regeln", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["golf_regeln"] = DATA;
  }
})();
