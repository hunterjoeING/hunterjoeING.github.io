-- Cloudflare D1 Schema für HunterJoe Arcade (Globale Highscores + Community-Wünsche & Login)
-- Ausführung lokal/remote via Wrangler:
--   npx wrangler d1 execute hunterjoe-scores-db --remote --file=./cloudflare-worker/schema.sql

CREATE TABLE IF NOT EXISTS scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  game_id TEXT NOT NULL,
  run_id TEXT,
  player_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  lower_is_better INTEGER NOT NULL DEFAULT 0,
  label TEXT NOT NULL,
  meta TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_scores_game_score ON scores (game_id, score);
CREATE UNIQUE INDEX IF NOT EXISTS idx_scores_run_id ON scores (run_id) WHERE run_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS game_stats (
  game_id TEXT PRIMARY KEY,
  plays INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ============================================================================
-- NEU: Benutzer-Konten (Website-Login mit Passwort-Hash + Rolle user/admin/agent)
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE COLLATE NOCASE,
  display_name TEXT NOT NULL,
  pw_salt TEXT NOT NULL,
  pw_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user', -- 'user' | 'admin' | 'agent'
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_login_at TEXT
);

-- ============================================================================
-- NEU: Verbesserungswünsche & Kommentare (Allgemein + pro Spiel/Quiz)
-- ============================================================================
CREATE TABLE IF NOT EXISTS feedback_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  target_id TEXT NOT NULL DEFAULT 'general', -- 'general' oder gameId / quizId
  category TEXT NOT NULL DEFAULT 'wish',     -- 'wish' (Wunsch), 'bug' (Bug), 'praise' (Lob/Kommentar), 'question' (Frage)
  status TEXT NOT NULL DEFAULT 'open',       -- 'open' (Offen), 'in_progress' (In Arbeit), 'fixed' (Erledigt/Behoben)
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  author_id INTEGER,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL DEFAULT 'user',
  upvotes INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_feedback_target_created ON feedback_posts (target_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback_posts (status);

-- ============================================================================
-- NEU: Antworten unter Wünschen (inkl. KI-Agent & Admin Antworten)
-- ============================================================================
CREATE TABLE IF NOT EXISTS feedback_replies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  author_id INTEGER,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL DEFAULT 'user', -- 'user' | 'admin' | 'agent'
  body TEXT NOT NULL,
  new_status TEXT,                          -- optionales Status-Update ('open'|'in_progress'|'fixed')
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (post_id) REFERENCES feedback_posts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_replies_post_id ON feedback_replies (post_id, created_at ASC);

-- ============================================================================
-- NEU: Upvote-Sperre pro User + Post
-- ============================================================================
CREATE TABLE IF NOT EXISTS feedback_votes (
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (post_id, user_id)
);
