// Unified quiz bank for "golf_profis" (75 questions: Majors, Tour & Legenden)
(function () {
  const DATA = [];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("golf_profis", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["golf_profis"] = DATA;
  }
})();
