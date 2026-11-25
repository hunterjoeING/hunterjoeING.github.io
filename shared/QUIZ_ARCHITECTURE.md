# Quiz Platform – Architecture & AI Handoff Documentation

> **Purpose:** Central architecture reference for all **31 quiz directories** (`games/quiz*/`) and the shared quiz modules under `shared/`. All topic quizzes share this single engine rather than duplicating logic.

---

## 1. Overview & Tech Stack

- **Location:** `shared/quiz-*.js` + `shared/quiz-data/bank-*.js` + `games/quiz*/index.html`
- **Architecture:** Zero-build Vanilla JS (IIFE modules exposing `window.ArcadeQuiz*` globals) + strict separation of **data** (`shared/quiz-data/`) and **UI/engine** (`shared/quiz-engine.js`, `games/quiz-*/index.html`).
- **Arcade Shell Integration:** `../../shared/arcade.css`, `../../shared/arcade.js`, `../../shared/burger-menu.js`

---

## 2. Core Modules (`shared/`)

```text
shared/
├── quiz-engine.js          # window.ArcadeQuizEngine: bank registry, seen-question tracking, round length, timer/relaxed mode
├── quiz-board.js           # window.ArcadeQuizBoard: unified localStorage leaderboard ('arcade_quiz_board_<id>') + name prompt
├── quiz-subcategories.js   # window.ArcadeQuizSubcategories: multi-topic hub UI (e.g. Fußball, Golf, American Football)
├── hidden-admin.js         # PIN-protected ('2408') client-side drawer for hidden/partner quizzes (Waldgarten, Napoli72H, Herr Tutto)
└── quiz-data/
    └── bank-<id>.js        # 42 pure question-pool files (75+ questions each), registered via ArcadeQuizEngine.registerBank('<id>', QUESTIONS)
```

### Key `localStorage` Keys
- **Seen Questions:** `SEEN_PREFIX + quizId` (prevents repeat questions until the full pool is exhausted, then auto-resets or resets manually).
- **Local Quiz Leaderboards:** `arcade_quiz_board_<id>` via `ArcadeQuizBoard.submit(gameId, entry)`.
- **Player Name:** Shared `arcade_player_name` (also synced with `ArcadeScores`).

---

## 3. Quiz Types (`games/quiz*/`)

1. **Classic / Mega-Mix (`games/quiz/`):** Combines multiple registered banks into a Mega-Mix mode alongside general knowledge (`bank-general.js`).
2. **Single-Topic Quizzes (`games/quiz-<topic>/index.html`):** Thin UI wrapper (< 500–800 lines) loading `../../shared/quiz-engine.js` and `../../shared/quiz-data/bank-<topic>.js`.
3. **Subcategory Quizzes (`quiz-fussball`, `quiz-golf`, `quiz-american-football`):** Load multiple `bank-<topic>-*.js` files and use `shared/quiz-subcategories.js` for category selection.
4. **Photo Quizzes (`quiz-cpus`, `quiz-gpus`, `quiz-phones`, `quiz-pilze-aachen`, `quiz-swiss-trains`):** Include local image assets in `games/quiz-<topic>/` referenced by `bank-<topic>.js`.
5. **Hidden / Partner Quizzes (`quiz-waldgarten`, `quiz-napoli72h`, `quiz-herr-tutto`):** Accessible via direct URL / QR code or `shared/hidden-admin.js` (footer dot or `?admin=1` + PIN).

---

## 4. Checklist for Adding a New Quiz (from `AGENTS.md`)

1. Create `shared/quiz-data/bank-<id>.js` calling `ArcadeQuizEngine.registerBank('<id>', QUESTIONS)`.
2. Create `games/quiz-<slug>/index.html` (no large question arrays inline).
3. Register the quiz in **only** these 3 places:
   - `index.html` $\rightarrow$ `QUIZZES` array (unless it is a hidden/partner quiz)
   - `shared/arcade.js` $\rightarrow$ `GAME_CATALOG`, `detectGameId()`, `FEEDBACK_TARGETS`
   - `cloudflare-worker/worker.js` $\rightarrow$ `GAMES_META`
4. Add public quizzes to `shared/releases.js` using the hub card ID and an initial `v0.1.0` release. Skip hidden or admin quizzes. Follow [AGENTS.md rule 10](../AGENTS.md) for spoiler-free release notes.
5. Run `node --check` on all modified JS files before committing.

---

## 5. Design Decisions ("Why")

- **Strict Data/UI Separation:** Keeping 42+ question banks in `shared/quiz-data/` keeps HTML files tiny, allows Mega-Mix aggregation, and prevents merge conflicts when adding/editing questions.
- **`ArcadeQuizEngine` Seen-Tracking:** Ensures players see all 75+ questions in a pool before repeats occur, regardless of chosen round length.

---

## 6. Known Limitations & Open Points

- `hidden-admin.js` PIN (`2408`) is intentionally a lightweight client-side visibility gate, not a security boundary.
- *(Add quiz-engine or bank notes here.)*
