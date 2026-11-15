/**
 * HunterJoe Arcade – Cloudflare Worker (D1 Highscores + Auth + Turnstile CAPTCHA + Community Feedback & Agent Replies)
 *
 * Unterstützte Endpunkte:
 *  - GET  /api/health
 *  - GET  /api/summary
 *  - GET  /api/scores?game=<id>&limit=<n>
 *  - POST /api/scores
 *  - POST /api/auth/register        (mit Cloudflare Turnstile Verifikation)
 *  - POST /api/auth/login           (mit Cloudflare Turnstile Verifikation)
 *  - GET  /api/auth/me              (Bearer Token Check)
 *  - GET  /api/feedback?target=<id>&status=<status>
 *  - POST /api/feedback             (Neuer Wunsch/Kommentar · Login + Turnstile)
 *  - POST /api/feedback/:id/reply   (Antwort / KI-Agent-Kommentar + optionales Status-Update)
 *  - POST /api/feedback/:id/vote    (Upvote · Login)
 *  - PATCH /api/feedback/:id/status (Status ändern · Admin / Agent)
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Agent-Key',
  'Access-Control-Max-Age': '86400'
};

const GAMES_META = {
  minesweeper: { title: '3D Minesweeper', lowerIsBetter: true },
  minesweeper_3d_prompt_test: { title: 'Minesweeper 3d prompt Version', lowerIsBetter: true },
  roadster: { title: 'Roadster Lander', lowerIsBetter: false },
  zombie: { title: 'Zombie Swarm', lowerIsBetter: false },
  tower: { title: 'Orbital Tower Defense', lowerIsBetter: false },
  solitaire: { title: 'Klondike Solitaire', lowerIsBetter: false },
  p2048: { title: '2048 Prism', lowerIsBetter: false },
  quiz_emob: { title: 'E-Mobilität & Tesla Quiz', lowerIsBetter: false },
  quiz_pol: { title: 'Politik & Ökonomie Quiz', lowerIsBetter: false },
  quiz_hist: { title: 'Geschichte & Weltereignisse', lowerIsBetter: false },
  quiz_egypt: { title: 'Ägyptische Geschichte Quiz', lowerIsBetter: false },
  quiz_diving: { title: 'Tauchen & Scuba Diving Quiz', lowerIsBetter: false },
  quiz_movies: { title: 'Kino & Filme Quiz (o. RomComs)', lowerIsBetter: false },
  quiz_ai: { title: 'KI: Entstehung & Technik Quiz', lowerIsBetter: false },
  quiz_china: { title: 'Neuere Chinesische Geschichte', lowerIsBetter: false },
  quiz_cpus: { title: 'Prozessoren-Quiz (2000–Heute)', lowerIsBetter: false },
  quiz_gpus: { title: 'Grafikkarten-Quiz (2000–Heute)', lowerIsBetter: false },
  quiz_phones: { title: 'Handys & Smartphones Quiz', lowerIsBetter: false },
  quiz_pilze_aachen: { title: 'Pilz-Sammler-Quiz: Region Aachen', lowerIsBetter: false },
  quiz_swiss_trains: { title: 'Schweizer Eisenbahnloks', lowerIsBetter: false },
  quiz_waldgarten: { title: 'Waldgarten Quiz · Schwarzenburg (Heideblick)', lowerIsBetter: false },
  quiz_mil_air: { title: 'Militärflugzeuge Quiz', lowerIsBetter: false },
  quiz_airliners: { title: 'Passagierflugzeuge Quiz', lowerIsBetter: false },
  quiz_etfs: { title: 'Passives Investieren & ETFs Quiz', lowerIsBetter: false },
  quiz: { title: 'Quiz Arena: Klassik', lowerIsBetter: false }
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...CORS_HEADERS
    }
  });
}

function cleanText(val, maxLen = 200) {
  return String(val || '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLen);
}

// ============================================================================
// WebCrypto Helpers (PBKDF2 Password Hashing & HMAC-SHA256 JWT)
// ============================================================================
function bufToHex(buf) {
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function b64urlEncode(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function b64urlDecode(str) {
  const padded = String(str).replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4 ? '='.repeat(4 - (padded.length % 4)) : '';
  return decodeURIComponent(escape(atob(padded + pad)));
}

async function hashPassword(password, saltHex) {
  const enc = new TextEncoder();
  const keyMat = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: enc.encode(saltHex),
      iterations: 60000,
      hash: 'SHA-256'
    },
    keyMat,
    256
  );
  return bufToHex(bits);
}

async function signJwt(payload, secret) {
  const enc = new TextEncoder();
  const headerB64 = b64urlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const bodyB64 = b64urlEncode(JSON.stringify(payload));
  const data = `${headerB64}.${bodyB64}`;
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret || 'hunterjoe-default-jwt-secret-change-in-prod'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
  return `${data}.${sigB64}`;
}

async function verifyJwt(token, secret) {
  try {
    const parts = String(token || '').split('.');
    if (parts.length !== 3) return null;
    const [headerB64, bodyB64, sigB64] = parts;
    const data = `${headerB64}.${bodyB64}`;
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret || 'hunterjoe-default-jwt-secret-change-in-prod'),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    const sigBin = atob(sigB64.replace(/-/g, '+').replace(/_/g, '/'));
    const sigBytes = new Uint8Array(sigBin.length);
    for (let i = 0; i < sigBin.length; i++) sigBytes[i] = sigBin.charCodeAt(i);
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(data));
    if (!valid) return null;
    const payload = JSON.parse(b64urlDecode(bodyB64));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

async function getAuthUser(request, env) {
  // Check X-Agent-Key header for automated AI-Agent / Admin CLI replies
  const agentKey = request.headers.get('X-Agent-Key');
  if (agentKey && env.AGENT_API_KEY && agentKey === env.AGENT_API_KEY) {
    return {
      id: 0,
      username: 'antigravity_agent',
      displayName: 'KI-Agent (Antigravity)',
      role: 'agent'
    };
  }
  const auth = request.headers.get('Authorization') || '';
  if (!auth.startsWith('Bearer ')) return null;
  const token = auth.slice(7).trim();
  return await verifyJwt(token, env.JWT_SECRET);
}

// ============================================================================
// Cloudflare Turnstile Server-Side Verification
// ============================================================================
async function verifyTurnstile(token, remoteIp, env) {
  // Falls noch kein TURNSTILE_SECRET_KEY in den Worker-Secrets hinterlegt ist,
  // erlaubt das Cloudflare offizielle Test-Secret (1x0000000000000000000000000000000AA) den sofortigen Betrieb.
  const secret = env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';
  if (!token) return { ok: false, error: 'Bitte bestätige zuerst das CAPTCHA.' };

  // Fallback für lokale Offline-/Challenge-Tokens wenn kein Turnstile-Secret gesetzt ist
  if (!env.TURNSTILE_SECRET_KEY && String(token).startsWith('local_guard_')) {
    return { ok: true };
  }

  try {
    const form = new FormData();
    form.append('secret', secret);
    form.append('response', token);
    if (remoteIp) form.append('remoteip', remoteIp);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form
    });
    const outcome = await res.json();
    if (!outcome.success) {
      return { ok: false, error: 'CAPTCHA-Überprüfung fehlgeschlagen oder abgelaufen.' };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: 'CAPTCHA-Dienst momentan nicht erreichbar.' };
  }
}

// ============================================================================
// Automatische Tabellen-Initialisierung (Idempotent)
// ============================================================================
let _schemaReady = false;
async function ensureTables(db) {
  if (_schemaReady || !db) return;
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE COLLATE NOCASE,
      display_name TEXT NOT NULL,
      pw_salt TEXT NOT NULL,
      pw_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      last_login_at TEXT
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS feedback_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      target_id TEXT NOT NULL DEFAULT 'general',
      category TEXT NOT NULL DEFAULT 'wish',
      status TEXT NOT NULL DEFAULT 'open',
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      author_id INTEGER,
      author_name TEXT NOT NULL,
      author_role TEXT NOT NULL DEFAULT 'user',
      upvotes INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS feedback_replies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      author_id INTEGER,
      author_name TEXT NOT NULL,
      author_role TEXT NOT NULL DEFAULT 'user',
      body TEXT NOT NULL,
      new_status TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS feedback_votes (
      post_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (post_id, user_id)
    )`)
  ]);
  _schemaReady = true;
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';
    const db = env.DB;

    try {
      if (path === '/api/health') {
        return jsonResponse({
          ok: true,
          service: 'hunterjoe-scores',
          db: db ? 'connected' : 'missing',
          features: ['scores', 'auth', 'turnstile', 'feedback', 'agent-replies']
        });
      }

      if (!db) {
        return jsonResponse({ ok: false, error: 'D1 database binding DB is missing' }, 500);
      }

      await ensureTables(db);

      // ----------------------------------------------------------------------
      // AUTH: POST /api/auth/register
      // ----------------------------------------------------------------------
      if (path === '/api/auth/register' && request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        const username = cleanText(body.username, 24).replace(/[^a-zA-Z0-9_äöüÄÖÜß.-]/g, '');
        const displayName = cleanText(body.displayName || username, 24);
        const password = String(body.password || '');
        const captchaToken = body.captchaToken || '';

        if (username.length < 3) {
          return jsonResponse({ ok: false, error: 'Benutzername muss mindestens 3 Zeichen lang sein.' }, 400);
        }
        if (password.length < 6) {
          return jsonResponse({ ok: false, error: 'Passwort muss mindestens 6 Zeichen lang sein.' }, 400);
        }

        const ip = request.headers.get('CF-Connecting-IP') || '';
        const cap = await verifyTurnstile(captchaToken, ip, env);
        if (!cap.ok) return jsonResponse({ ok: false, error: cap.error }, 400);

        const existing = await db.prepare('SELECT id FROM users WHERE username = ?1 COLLATE NOCASE').bind(username).first();
        if (existing) {
          return jsonResponse({ ok: false, error: 'Dieser Benutzername ist bereits vergeben.' }, 409);
        }

        const saltBytes = new Uint8Array(16);
        crypto.getRandomValues(saltBytes);
        const saltHex = bufToHex(saltBytes);
        const pwHash = await hashPassword(password, saltHex);

        // Erster registrierter Admin-Name oder passendes Admin-Secret erhält Rolle 'admin'
        let role = 'user';
        if (body.adminSecret && env.ADMIN_SECRET && body.adminSecret === env.ADMIN_SECRET) {
          role = 'admin';
        }

        const ins = await db.prepare(
          `INSERT INTO users (username, display_name, pw_salt, pw_hash, role, last_login_at)
           VALUES (?1, ?2, ?3, ?4, ?5, datetime('now'))`
        ).bind(username, displayName, saltHex, pwHash, role).run();

        const userId = ins.meta?.last_row_id || 1;
        const userObj = { id: userId, username, displayName, role };
        const token = await signJwt({ ...userObj, exp: Date.now() + 1000 * 60 * 60 * 24 * 30 }, env.JWT_SECRET);

        return jsonResponse({ ok: true, user: userObj, token });
      }

      // ----------------------------------------------------------------------
      // AUTH: POST /api/auth/login
      // ----------------------------------------------------------------------
      if (path === '/api/auth/login' && request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        const username = cleanText(body.username, 24);
        const password = String(body.password || '');
        const captchaToken = body.captchaToken || '';

        const ip = request.headers.get('CF-Connecting-IP') || '';
        const cap = await verifyTurnstile(captchaToken, ip, env);
        if (!cap.ok) return jsonResponse({ ok: false, error: cap.error }, 400);

        const row = await db.prepare(
          'SELECT id, username, display_name, pw_salt, pw_hash, role FROM users WHERE username = ?1 COLLATE NOCASE'
        ).bind(username).first();

        if (!row) {
          return jsonResponse({ ok: false, error: 'Benutzername oder Passwort ungültig.' }, 401);
        }

        const calcHash = await hashPassword(password, row.pw_salt);
        if (calcHash !== row.pw_hash) {
          return jsonResponse({ ok: false, error: 'Benutzername oder Passwort ungültig.' }, 401);
        }

        let role = row.role || 'user';
        if (body.adminSecret && env.ADMIN_SECRET && body.adminSecret === env.ADMIN_SECRET) {
          role = 'admin';
          await db.prepare('UPDATE users SET role = ?1, last_login_at = datetime("now") WHERE id = ?2').bind(role, row.id).run();
        } else {
          await db.prepare('UPDATE users SET last_login_at = datetime("now") WHERE id = ?1').bind(row.id).run();
        }

        const userObj = { id: row.id, username: row.username, displayName: row.display_name, role };
        const token = await signJwt({ ...userObj, exp: Date.now() + 1000 * 60 * 60 * 24 * 30 }, env.JWT_SECRET);

        return jsonResponse({ ok: true, user: userObj, token });
      }

      // ----------------------------------------------------------------------
      // AUTH: GET /api/auth/me
      // ----------------------------------------------------------------------
      if (path === '/api/auth/me' && request.method === 'GET') {
        const user = await getAuthUser(request, env);
        if (!user) return jsonResponse({ ok: false, error: 'Nicht eingeloggt.' }, 401);
        return jsonResponse({ ok: true, user });
      }

      // ----------------------------------------------------------------------
      // FEEDBACK: GET /api/feedback
      // ----------------------------------------------------------------------
      if (path === '/api/feedback' && request.method === 'GET') {
        const target = cleanText(url.searchParams.get('target') || 'all', 40);
        const status = cleanText(url.searchParams.get('status') || 'all', 20);
        const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '50', 10) || 50));

        let sql = 'SELECT * FROM feedback_posts WHERE 1=1';
        const binds = [];
        if (target && target !== 'all') {
          binds.push(target);
          sql += ` AND target_id = ?${binds.length}`;
        }
        if (status && status !== 'all') {
          binds.push(status);
          sql += ` AND status = ?${binds.length}`;
        }
        sql += ` ORDER BY CASE status WHEN 'in_progress' THEN 0 WHEN 'open' THEN 1 ELSE 2 END, upvotes DESC, id DESC LIMIT ${limit}`;

        const postsRes = await db.prepare(sql).bind(...binds).all();
        const posts = postsRes.results || [];

        const postIds = posts.map(p => p.id);
        let repliesByPost = {};
        if (postIds.length > 0) {
          const placeholders = postIds.map((_, i) => `?${i + 1}`).join(',');
          const repRes = await db.prepare(
            `SELECT * FROM feedback_replies WHERE post_id IN (${placeholders}) ORDER BY id ASC`
          ).bind(...postIds).all();
          (repRes.results || []).forEach(r => {
            if (!repliesByPost[r.post_id]) repliesByPost[r.post_id] = [];
            repliesByPost[r.post_id].push({
              id: r.id,
              postId: r.post_id,
              authorName: r.author_name,
              authorRole: r.author_role,
              body: r.body,
              newStatus: r.new_status,
              createdAt: r.created_at
            });
          });
        }

        const countsRes = await db.prepare(
          `SELECT target_id, COUNT(*) as cnt,
                  SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END) as open_cnt,
                  SUM(CASE WHEN status = 'fixed' THEN 1 ELSE 0 END) as fixed_cnt
           FROM feedback_posts GROUP BY target_id`
        ).all();

        const targetCounts = {};
        (countsRes.results || []).forEach(r => {
          targetCounts[r.target_id] = {
            total: Number(r.cnt || 0),
            open: Number(r.open_cnt || 0),
            fixed: Number(r.fixed_cnt || 0)
          };
        });

        const formatted = posts.map(p => ({
          id: p.id,
          targetId: p.target_id,
          category: p.category,
          status: p.status,
          title: p.title,
          body: p.body,
          authorName: p.author_name,
          authorRole: p.author_role,
          upvotes: Number(p.upvotes || 0),
          createdAt: p.created_at,
          updatedAt: p.updated_at,
          replies: repliesByPost[p.id] || []
        }));

        return jsonResponse({ ok: true, items: formatted, counts: targetCounts });
      }

      // ----------------------------------------------------------------------
      // FEEDBACK: POST /api/feedback (Neuen Wunsch/Kommentar anlegen)
      // ----------------------------------------------------------------------
      if (path === '/api/feedback' && request.method === 'POST') {
        const user = await getAuthUser(request, env);
        if (!user) {
          return jsonResponse({ ok: false, error: 'Bitte logge dich zuerst ein, um einen Wunsch oder Kommentar zu senden.' }, 401);
        }

        const body = await request.json().catch(() => ({}));
        const targetId = cleanText(body.targetId || 'general', 40);
        const validCats = ['wish', 'bug', 'praise', 'question'];
        const category = validCats.includes(body.category) ? body.category : 'wish';
        const title = cleanText(body.title, 110);
        const text = cleanText(body.body, 1500);
        const captchaToken = body.captchaToken || '';

        if (title.length < 4) {
          return jsonResponse({ ok: false, error: 'Bitte gib einen kurzen Titel (mind. 4 Zeichen) an.' }, 400);
        }
        if (text.length < 6) {
          return jsonResponse({ ok: false, error: 'Bitte beschreibe deinen Wunsch oder Kommentar etwas genauer.' }, 400);
        }

        // CAPTCHA prüfen (außer für verifizierten KI-Agenten-Key)
        if (user.role !== 'agent') {
          const ip = request.headers.get('CF-Connecting-IP') || '';
          const cap = await verifyTurnstile(captchaToken, ip, env);
          if (!cap.ok) return jsonResponse({ ok: false, error: cap.error }, 400);
        }

        const ins = await db.prepare(
          `INSERT INTO feedback_posts (target_id, category, status, title, body, author_id, author_name, author_role, upvotes)
           VALUES (?1, ?2, 'open', ?3, ?4, ?5, ?6, ?7, 1)`
        ).bind(
          targetId,
          category,
          title,
          text,
          user.id || 0,
          user.displayName || user.username || 'Spieler',
          user.role || 'user'
        ).run();

        const newId = ins.meta?.last_row_id;
        return jsonResponse({
          ok: true,
          item: {
            id: newId,
            targetId,
            category,
            status: 'open',
            title,
            body: text,
            authorName: user.displayName || user.username,
            authorRole: user.role || 'user',
            upvotes: 1,
            createdAt: new Date().toISOString(),
            replies: []
          }
        });
      }

      // ----------------------------------------------------------------------
      // FEEDBACK: POST /api/feedback/:id/reply (Antwort / Agent-Kommentar)
      // ----------------------------------------------------------------------
      const replyMatch = /^\/api\/feedback\/(\d+)\/reply$/.exec(path);
      if (replyMatch && request.method === 'POST') {
        const postId = parseInt(replyMatch[1], 10);
        const user = await getAuthUser(request, env);
        if (!user) {
          return jsonResponse({ ok: false, error: 'Bitte logge dich ein, um zu antworten.' }, 401);
        }

        const body = await request.json().catch(() => ({}));
        const text = cleanText(body.body, 1500);
        if (text.length < 2) {
          return jsonResponse({ ok: false, error: 'Bitte gib einen Antworttext ein.' }, 400);
        }

        // Wenn ein Admin oder KI-Agent antwortet (oder asAgent gewählt wurde), darf auch der Status geändert werden
        const isPrivileged = user.role === 'admin' || user.role === 'agent' || (body.adminSecret && env.ADMIN_SECRET && body.adminSecret === env.ADMIN_SECRET);
        const authorRole = (isPrivileged && body.asAgent) ? 'agent' : (isPrivileged && user.role === 'user' ? 'admin' : (user.role || 'user'));
        const authorName = authorRole === 'agent'
          ? (body.authorName || '🤖 KI-Agent (Antigravity)')
          : (user.displayName || user.username || 'Spieler');

        const validStatuses = ['open', 'in_progress', 'fixed'];
        const newStatus = (isPrivileged && validStatuses.includes(body.newStatus)) ? body.newStatus : null;

        const ins = await db.prepare(
          `INSERT INTO feedback_replies (post_id, author_id, author_name, author_role, body, new_status)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
        ).bind(postId, user.id || 0, authorName, authorRole, text, newStatus).run();

        if (newStatus) {
          await db.prepare(
            `UPDATE feedback_posts SET status = ?1, updated_at = datetime('now') WHERE id = ?2`
          ).bind(newStatus, postId).run();
        } else {
          await db.prepare(
            `UPDATE feedback_posts SET updated_at = datetime('now') WHERE id = ?1`
          ).bind(postId).run();
        }

        return jsonResponse({
          ok: true,
          reply: {
            id: ins.meta?.last_row_id,
            postId,
            authorName,
            authorRole,
            body: text,
            newStatus,
            createdAt: new Date().toISOString()
          }
        });
      }

      // ----------------------------------------------------------------------
      // FEEDBACK: POST /api/feedback/:id/vote (Upvote)
      // ----------------------------------------------------------------------
      const voteMatch = /^\/api\/feedback\/(\d+)\/vote$/.exec(path);
      if (voteMatch && request.method === 'POST') {
        const postId = parseInt(voteMatch[1], 10);
        const user = await getAuthUser(request, env);
        if (!user || !user.id) {
          return jsonResponse({ ok: false, error: 'Bitte logge dich ein, um abzustimmen.' }, 401);
        }

        const exists = await db.prepare(
          'SELECT 1 FROM feedback_votes WHERE post_id = ?1 AND user_id = ?2'
        ).bind(postId, user.id).first();

        if (exists) {
          return jsonResponse({ ok: false, error: 'Du hast diesen Wunsch bereits unterstützt.' }, 409);
        }

        await db.batch([
          db.prepare('INSERT INTO feedback_votes (post_id, user_id) VALUES (?1, ?2)').bind(postId, user.id),
          db.prepare('UPDATE feedback_posts SET upvotes = upvotes + 1 WHERE id = ?1').bind(postId)
        ]);

        const updated = await db.prepare('SELECT upvotes FROM feedback_posts WHERE id = ?1').bind(postId).first();
        return jsonResponse({ ok: true, upvotes: Number(updated?.upvotes || 1) });
      }

      // ----------------------------------------------------------------------
      // BESTEHENDE HIGHSCORE-ENDPUNKTE (/api/summary & /api/scores)
      // ----------------------------------------------------------------------
      if (path === '/api/summary' && request.method === 'GET') {
        const gamesOut = {};
        let totalRecords = 0;
        let totalPlays = 0;

        const statsRes = await db.prepare('SELECT game_id, plays FROM game_stats').all();
        const playsMap = {};
        (statsRes.results || []).forEach(r => { playsMap[r.game_id] = Number(r.plays || 0); });

        for (const [gid, cfg] of Object.entries(GAMES_META)) {
          const order = cfg.lowerIsBetter ? 'ASC' : 'DESC';
          const best = await db.prepare(
            `SELECT id, run_id as runId, player_name as playerName, score, lower_is_better as lowerIsBetter, label, meta, created_at as createdAt
             FROM scores WHERE game_id = ?1 ORDER BY score ${order}, id ASC LIMIT 1`
          ).bind(gid).first();

          const cntRow = await db.prepare('SELECT COUNT(*) as c FROM scores WHERE game_id = ?1').bind(gid).first();
          const entries = Number(cntRow?.c || 0);
          const plays = Math.max(entries, playsMap[gid] || 0);

          if (best) {
            totalRecords++;
            try { best.meta = best.meta ? JSON.parse(best.meta) : null; } catch (e) { best.meta = null; }
            best.lowerIsBetter = !!best.lowerIsBetter;
          }
          totalPlays += plays;
          gamesOut[gid] = {
            gameId: gid,
            title: cfg.title,
            lowerIsBetter: cfg.lowerIsBetter,
            plays,
            entries,
            best: best || null
          };
        }

        return jsonResponse({ ok: true, totalRecords, totalPlays, games: gamesOut });
      }

      if (path === '/api/scores' && request.method === 'GET') {
        const gid = cleanText(url.searchParams.get('game') || 'minesweeper', 40);
        const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '25', 10) || 25));
        const cfg = GAMES_META[gid] || { title: gid, lowerIsBetter: false };
        const order = cfg.lowerIsBetter ? 'ASC' : 'DESC';

        const rows = await db.prepare(
          `SELECT id, run_id as runId, player_name as playerName, score, label, meta, created_at as createdAt
           FROM scores WHERE game_id = ?1 ORDER BY score ${order}, id ASC LIMIT ?2`
        ).bind(gid, limit).all();

        const cntRow = await db.prepare('SELECT COUNT(*) as c FROM scores WHERE game_id = ?1').bind(gid).first();
        const statRow = await db.prepare('SELECT plays FROM game_stats WHERE game_id = ?1').bind(gid).first();
        const entries = Number(cntRow?.c || 0);
        const plays = Math.max(entries, Number(statRow?.plays || 0));
        const top = (rows.results || []).map(r => {
          let meta = null;
          try { meta = r.meta ? JSON.parse(r.meta) : null; } catch (e) {}
          return { ...r, meta };
        });

        return jsonResponse({
          ok: true,
          gameId: gid,
          title: cfg.title,
          lowerIsBetter: cfg.lowerIsBetter,
          plays,
          entries,
          best: top[0] || null,
          top
        });
      }

      if (path === '/api/scores' && request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        const gid = cleanText(body.gameId, 40);
        if (!gid) return jsonResponse({ ok: false, error: 'Missing gameId' }, 400);

        const cfg = GAMES_META[gid] || { title: gid, lowerIsBetter: false };
        const playerName = cleanText(body.playerName || 'Spieler', 24) || 'Spieler';
        const score = Math.round(Number(body.score) || 0);
        const label = cleanText(body.label || String(score), 80);
        const runId = body.runId ? cleanText(body.runId, 64) : null;
        const metaStr = body.meta ? JSON.stringify(body.meta) : null;

        if (runId) {
          const existing = await db.prepare('SELECT id FROM scores WHERE run_id = ?1').bind(runId).first();
          if (existing) {
            await db.prepare('UPDATE scores SET player_name = ?1 WHERE id = ?2').bind(playerName, existing.id).run();
          } else {
            await db.batch([
              db.prepare(
                `INSERT INTO scores (game_id, run_id, player_name, score, lower_is_better, label, meta)
                 VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
              ).bind(gid, runId, playerName, score, cfg.lowerIsBetter ? 1 : 0, label, metaStr),
              db.prepare(
                `INSERT INTO game_stats (game_id, plays) VALUES (?1, 1)
                 ON CONFLICT(game_id) DO UPDATE SET plays = plays + 1, updated_at = datetime('now')`
              ).bind(gid)
            ]);
          }
        } else {
          await db.batch([
            db.prepare(
              `INSERT INTO scores (game_id, player_name, score, lower_is_better, label, meta)
               VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
            ).bind(gid, playerName, score, cfg.lowerIsBetter ? 1 : 0, label, metaStr),
            db.prepare(
              `INSERT INTO game_stats (game_id, plays) VALUES (?1, 1)
               ON CONFLICT(game_id) DO UPDATE SET plays = plays + 1, updated_at = datetime('now')`
            ).bind(gid)
          ]);
        }

        const order = cfg.lowerIsBetter ? 'ASC' : 'DESC';
        const compOp = cfg.lowerIsBetter ? '<' : '>';
        const rankRow = await db.prepare(
          `SELECT COUNT(*) + 1 as rk FROM scores WHERE game_id = ?1 AND score ${compOp} ?2`
        ).bind(gid, score).first();
        const best = await db.prepare(
          `SELECT id, run_id as runId, player_name as playerName, score, label, meta, created_at as createdAt
           FROM scores WHERE game_id = ?1 ORDER BY score ${order}, id ASC LIMIT 1`
        ).bind(gid).first();
        const cntRow = await db.prepare('SELECT COUNT(*) as c FROM scores WHERE game_id = ?1').bind(gid).first();
        const statRow = await db.prepare('SELECT plays FROM game_stats WHERE game_id = ?1').bind(gid).first();

        const rank = Number(rankRow?.rk || 1);
        const entries = Number(cntRow?.c || 1);
        const plays = Math.max(entries, Number(statRow?.plays || 1));

        return jsonResponse({
          ok: true,
          gameId: gid,
          rank,
          isGlobalRecord: rank === 1,
          plays,
          entries,
          best
        });
      }

      return jsonResponse({ ok: false, error: 'Route not found: ' + path }, 404);
    } catch (err) {
      return jsonResponse({ ok: false, error: String(err?.message || err) }, 500);
    }
  }
};
