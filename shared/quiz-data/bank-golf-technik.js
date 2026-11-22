// Unified quiz bank for "golf_technik" (75 questions: Technik, Equipment & Taktik)
(function () {
  const DATA = [];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("golf_technik", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["golf_technik"] = DATA;
  }
})();
