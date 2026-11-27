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
  podracer: { title: 'Canyon Podracer 3D', lowerIsBetter: false },
  eroadtrip: { title: 'e-Roadtrip: Pixel Europe', lowerIsBetter: false },
  eroadtrip_l1: { title: 'e-Roadtrip: Pixel Europe · Level 1: Aachen ↔ Hannover Messe', lowerIsBetter: false },
  eroadtrip_l2: { title: 'e-Roadtrip: Pixel Europe · Level 2: Familien-Sommerurlaub', lowerIsBetter: false },
  eroadtrip_l3: { title: 'e-Roadtrip: Pixel Europe · Level 3: Winter-Alpenüberquerung', lowerIsBetter: false },
  minesweeper: { title: '3D Minesweeper', lowerIsBetter: true },
  minesweeper_3d_prompt_test: { title: 'Minesweeper 3d prompt Version', lowerIsBetter: true },
  roadster: { title: 'Roadster Lander', lowerIsBetter: false },
  zombie: { title: 'Zombie Swarm', lowerIsBetter: false },
  tower: { title: 'Orbital Tower Defense', lowerIsBetter: false },
  solitaire3d: { title: '3D Spider Solitär (4 Farben)', lowerIsBetter: false },
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
  quiz_napoli72h: { title: 'Napoli72H Pizza-Quiz · Aachen', lowerIsBetter: false },
  quiz_herr_tutto: { title: 'Herr Tutto Quiz · Eilendorf', lowerIsBetter: false },
  quiz_mil_air: { title: 'Militärflugzeuge Quiz', lowerIsBetter: false },
  quiz_airliners: { title: 'Passagierflugzeuge Quiz', lowerIsBetter: false },
  quiz_etfs: { title: 'Passives Investieren & ETFs Quiz', lowerIsBetter: false },
  quiz_bitcoin: { title: 'Bitcoin Mega-Quiz', lowerIsBetter: false },
  quiz_porsche: { title: 'Porsche & Taycan Quiz', lowerIsBetter: false },
  quiz_md11: { title: 'McDonnell Douglas MD-11 Quiz', lowerIsBetter: false },
  quiz_naildesign: { title: 'Nageldesign Quiz · Finger- & Fußnägel', lowerIsBetter: false },
  quiz_torten: { title: 'Torten Quiz · Klassiker & Patisserie', lowerIsBetter: false },
  quiz_geburt: { title: 'Bewusste Schwangerschaft & sanfte Geburt', lowerIsBetter: false },
  quiz_fussball: { title: 'Fußball – Das große Quiz', lowerIsBetter: false },
  quiz_fussball_mix: { title: 'Fußball: Alles gemischt', lowerIsBetter: false },
  quiz_fussball_buli: { title: 'Fußball: Bundesliga & DFB-Pokal', lowerIsBetter: false },
  quiz_fussball_wmem: { title: 'Fußball: WM, EM & Nationalelf', lowerIsBetter: false },
  quiz_fussball_intl: { title: 'Fußball: Champions League & Weltfußball', lowerIsBetter: false },
  quiz_fussball_rules: { title: 'Fußball: Regeln, Taktik & Kurioses', lowerIsBetter: false },
  quiz_fussball_werder: { title: 'Fußball: SV Werder Bremen Spezial', lowerIsBetter: false },
  quiz_american_football: { title: 'American Football – Das große NFL-Quiz', lowerIsBetter: false },
  quiz_af_mix: { title: 'American Football: Alles gemischt', lowerIsBetter: false },
  quiz_af_rules: { title: 'American Football: Regeln, Positionen & Taktik', lowerIsBetter: false },
  quiz_af_superbowl: { title: 'American Football: Super Bowl & NFL-Geschichte', lowerIsBetter: false },
  quiz_af_teams: { title: 'American Football: Teams, Stadien & Fankultur', lowerIsBetter: false },
  quiz_af_legends: { title: 'American Football: Legenden, Draft & Rekorde', lowerIsBetter: false },
  quiz_af_packers: { title: 'American Football: Green Bay Packers Special', lowerIsBetter: false },
  quiz_golf: { title: 'Golf – Das große Quiz', lowerIsBetter: false },
  quiz_golf_mix: { title: 'Golf: Alles gemischt', lowerIsBetter: false },
  quiz_golf_regeln: { title: 'Golf: Regeln, Etikette & Scoring', lowerIsBetter: false },
  quiz_golf_profis: { title: 'Golf: Majors, Tour & Legenden', lowerIsBetter: false },
  quiz_golf_technik: { title: 'Golf: Technik, Equipment & Taktik', lowerIsBetter: false },
  quiz_golf_plaetze: { title: 'Golf: Legendäre Plätze, Begriffe & Kurioses', lowerIsBetter: false },
  quiz_f1: { title: 'Formel 1 – Legenden, Technik & Königsklasse', lowerIsBetter: false },
  quiz_f1_mix: { title: 'Formel 1: Komplett-Mix', lowerIsBetter: false },
  quiz_f1_legenden: { title: 'Formel 1: Weltmeister & Rivalitäten', lowerIsBetter: false },
  quiz_f1_technik: { title: 'Formel 1: Technik & Aerodynamik', lowerIsBetter: false },
  quiz_f1_strecken: { title: 'Formel 1: Legendäre Strecken', lowerIsBetter: false },
  quiz_f1_regeln: { title: 'Formel 1: Regeln & Boxenstopps', lowerIsBetter: false },
  quiz_f1_teams: { title: 'Formel 1: Teams & Geschichte', lowerIsBetter: false },
  quiz_apple: { title: 'Apple – Produkte, Kult & Technikgeschichte', lowerIsBetter: false },
  quiz_apple_mix: { title: 'Apple: Komplett-Mix', lowerIsBetter: false },
  quiz_apple_iphone_ipad: { title: 'Apple: iPhone & iPad', lowerIsBetter: false },
  quiz_apple_mac_silicon: { title: 'Apple: Mac & Apple Silicon', lowerIsBetter: false },
  quiz_apple_audio_wearables: { title: 'Apple: Audio, Wearables & Ökosystem', lowerIsBetter: false },
  quiz_apple_design_history: { title: 'Apple: Geschichte, Design & Kult', lowerIsBetter: false },
  quiz_apple_flops_curiosities: { title: 'Apple: Flops, Kurioses & Insider-Wissen', lowerIsBetter: false },
  quiz: { title: 'Quiz Arena: Klassik', lowerIsBetter: false },
  wind_turbine: { title: 'Windkraftanlage 3D (Onshore)', lowerIsBetter: false, noLeaderboard: true },
  combustion_engine: { title: 'Verbrennungsmotor 3D', lowerIsBetter: false, noLeaderboard: true }
};

// Keep target minutes and level IDs in sync with games/e-roadtrip/src/data/levels.ts.
const EROADTRIP_LEVEL_TARGETS = {
  eroadtrip_l1: { levelId: 'level_1_aachen_hannover', targetMinutes: 797 },
  eroadtrip_l2: { levelId: 'level_2_family_summer', targetMinutes: 1882, legacyMaxMinutes: 40800 },
  eroadtrip_l3: { levelId: 'level_3_alps_winter', targetMinutes: 564 }
};

function isEroadtripBoard(gid) {
  return typeof gid === 'string' && (gid === 'eroadtrip' || gid.startsWith('eroadtrip_'));
}

export function validateEroadtripScore(gid, body) {
  if (!isEroadtripBoard(gid)) return null;
  const meta = body?.meta;
  if (!meta || typeof meta !== 'object' || Array.isArray(meta)) return 'Missing or invalid score meta';

  const board = gid === 'eroadtrip' ? (meta.board ?? meta.levelBoard) : gid;
  if (typeof board !== 'string' || !Object.hasOwn(EROADTRIP_LEVEL_TARGETS, board)) {
    return 'Unknown E-Roadtrip level board';
  }
  const { levelId, targetMinutes, legacyMaxMinutes } = EROADTRIP_LEVEL_TARGETS[board];
  const rawScore = body.score;
  const score = typeof rawScore === 'number' || (typeof rawScore === 'string' && rawScore.trim()) ? Number(rawScore) : NaN;
  if (!Number.isInteger(score) || score < 0 || score > 1000) {
    return 'E-Roadtrip score must be an integer from 0 to 1000';
  }
  const maxMinutes = legacyMaxMinutes ?? 20 * targetMinutes;
  if (!Number.isFinite(meta.minutes) || meta.minutes < 0.5 * targetMinutes || meta.minutes > maxMinutes) {
    return 'E-Roadtrip minutes outside the allowed range for this level';
  }
  if (!Number.isFinite(meta.costEur) || meta.costEur < 0) return 'Invalid E-Roadtrip costEur';
  if (Object.hasOwn(meta, 'levelId') && meta.levelId !== levelId) return 'E-Roadtrip levelId does not match the board';
  return null;
}

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

function escapeTelegramHtml(val) {
  return String(val || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function notifyTelegram(env, ctx, htmlText) {
  if (!env?.TELEGRAM_BOT_TOKEN || !env?.TELEGRAM_CHAT_ID || !htmlText) return;
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const task = fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: String(env.TELEGRAM_CHAT_ID).trim(),
      text: String(htmlText).slice(0, 3900),
      parse_mode: 'HTML',
      disable_web_page_preview: true
    })
  }).catch(() => {});
  if (ctx && typeof ctx.waitUntil === 'function') {
    ctx.waitUntil(task);
  }
}

// ============================================================================
// WebCrypto Helpers (PBKDF2 Password Hashing, Timing-Safe Compare & HMAC JWT)
// ============================================================================
function bufToHex(buf) {
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function timingSafeEqualStr(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(a)),
    crypto.subtle.digest('SHA-256', enc.encode(b))
  ]);
  const ba = new Uint8Array(ha);
  const bb = new Uint8Array(hb);
  let diff = a.length ^ b.length;
  for (let i = 0; i < ba.length; i++) diff |= ba[i] ^ bb[i];
  return diff === 0;
}

const _rateBuckets = new Map();
function checkRateLimit(request, bucket, maxReq, windowMs) {
  const ip = (request.headers.get('CF-Connecting-IP') || '').trim();
  if (!ip) return null; // Skip in local unit tests without edge IP header
  const now = Date.now();
  if (_rateBuckets.size > 2000) {
    for (const [k, v] of _rateBuckets) {
      if (v.resetAt <= now) _rateBuckets.delete(k);
    }
  }
  const key = `${bucket}:${ip}`;
  let entry = _rateBuckets.get(key);
  if (!entry || entry.resetAt <= now) {
    entry = { count: 1, resetAt: now + windowMs };
    _rateBuckets.set(key, entry);
    return null;
  }
  entry.count += 1;
  if (entry.count > maxReq) {
    const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return new Response(JSON.stringify({ ok: false, error: 'Zu viele Anfragen. Bitte warte kurz und versuche es erneut.' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Retry-After': String(retryAfter),
        ...CORS_HEADERS
      }
    });
  }
  return null;
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
  if (!secret || typeof secret !== 'string' || secret.length < 16) {
    throw new Error('JWT_SECRET is not configured');
  }
  const enc = new TextEncoder();
  const headerB64 = b64urlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const bodyB64 = b64urlEncode(JSON.stringify(payload));
  const data = `${headerB64}.${bodyB64}`;
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
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
    if (!secret || typeof secret !== 'string' || secret.length < 16) return null;
    const parts = String(token || '').split('.');
    if (parts.length !== 3) return null;
    const [headerB64, bodyB64, sigB64] = parts;
    const header = JSON.parse(b64urlDecode(headerB64));
    if (header?.alg !== 'HS256') return null;
    const data = `${headerB64}.${bodyB64}`;
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
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

async function signScoreUpdateToken(gid, runId, secret) {
  if (!secret || !gid || !runId) return null;
  const exp = Date.now() + 1000 * 60 * 30;
  const data = `score-upd:${gid}:${runId}:${exp}`;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return `${exp}.${bufToHex(sig)}`;
}

async function verifyScoreUpdateToken(token, gid, runId, secret) {
  if (!secret || !token || !gid || !runId) return false;
  const parts = String(token).split('.');
  if (parts.length !== 2) return false;
  const exp = Number(parts[0]);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  const data = `score-upd:${gid}:${runId}:${parts[0]}`;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const expected = bufToHex(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
  return timingSafeEqualStr(parts[1], expected);
}

async function getAuthUser(request, env, db) {
  // Check X-Agent-Key header for automated AI-Agent / Admin replies
  const agentKey = request.headers.get('X-Agent-Key');
  if (agentKey && env.AGENT_API_KEY && await timingSafeEqualStr(agentKey, env.AGENT_API_KEY)) {
    return {
      id: 0,
      username: 'arcade_assistant',
      displayName: 'KI-Assistent',
      role: 'agent'
    };
  }
  const auth = request.headers.get('Authorization') || '';
  if (!auth.startsWith('Bearer ')) return null;
  const token = auth.slice(7).trim();
  const payload = await verifyJwt(token, env.JWT_SECRET);
  if (!payload) return null;
  if (db && payload.id) {
    const row = await db.prepare('SELECT id, username, display_name, role FROM users WHERE id = ?1').bind(payload.id).first();
    if (!row) return null;
    return {
      id: row.id,
      username: row.username,
      displayName: row.display_name,
      role: row.role || 'user'
    };
  }
  return payload;
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
    db.prepare(`CREATE TABLE IF NOT EXISTS scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id TEXT NOT NULL,
      run_id TEXT UNIQUE,
      player_name TEXT NOT NULL,
      score INTEGER NOT NULL,
      lower_is_better INTEGER NOT NULL DEFAULT 0,
      label TEXT NOT NULL,
      meta TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS game_stats (
      game_id TEXT PRIMARY KEY,
      plays INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`),
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

  try {
    const scoreInfo = await db.prepare('PRAGMA table_info(scores)').all?.();
    const scoreCols = Array.isArray(scoreInfo?.results) ? scoreInfo.results.map(r => r.name) : [];
    if (scoreCols.length > 0 && !scoreCols.includes('meta')) {
      await db.prepare('ALTER TABLE scores ADD COLUMN meta TEXT').run();
      if (scoreCols.includes('meta_json')) {
        await db.prepare('UPDATE scores SET meta = meta_json WHERE meta IS NULL AND meta_json IS NOT NULL').run();
      }
    }

    const statInfo = await db.prepare('PRAGMA table_info(game_stats)').all?.();
    const statCols = Array.isArray(statInfo?.results) ? statInfo.results.map(r => r.name) : [];
    if (statCols.length > 0 && !statCols.includes('updated_at')) {
      await db.prepare('ALTER TABLE game_stats ADD COLUMN updated_at TEXT').run();
    }
  } catch (e) {}

  _schemaReady = true;
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';
    const db = env.DB;

    try {
      if (path === '/api/health') {
        const hasTelegram = Boolean(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID);
        return jsonResponse({
          ok: true,
          service: 'hunterjoe-scores',
          db: db ? 'connected' : 'missing',
          telegramConfigured: hasTelegram,
          turnstileConfigured: Boolean(env.TURNSTILE_SECRET_KEY),
          jwtConfigured: Boolean(env.JWT_SECRET),
          webhookSecretConfigured: Boolean(env.TELEGRAM_WEBHOOK_SECRET),
          features: hasTelegram
            ? ['scores', 'auth', 'turnstile', 'feedback', 'agent-replies', 'telegram']
            : ['scores', 'auth', 'turnstile', 'feedback', 'agent-replies']
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
        const limited = checkRateLimit(request, 'auth_register', 10, 10 * 60 * 1000);
        if (limited) return limited;
        if (!env.JWT_SECRET) {
          return jsonResponse({ ok: false, error: 'Authentifizierung ist serverseitig nicht vollständig konfiguriert.' }, 503);
        }

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

        // Nur passendes Admin-Secret erhält Rolle 'admin'
        let role = 'user';
        if (body.adminSecret && env.ADMIN_SECRET && await timingSafeEqualStr(String(body.adminSecret), env.ADMIN_SECRET)) {
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
        const limited = checkRateLimit(request, 'auth_login', 20, 10 * 60 * 1000);
        if (limited) return limited;
        if (!env.JWT_SECRET) {
          return jsonResponse({ ok: false, error: 'Authentifizierung ist serverseitig nicht vollständig konfiguriert.' }, 503);
        }

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
        if (!await timingSafeEqualStr(calcHash, row.pw_hash)) {
          return jsonResponse({ ok: false, error: 'Benutzername oder Passwort ungültig.' }, 401);
        }

        let role = row.role || 'user';
        if (body.adminSecret && env.ADMIN_SECRET && await timingSafeEqualStr(String(body.adminSecret), env.ADMIN_SECRET)) {
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
        const user = await getAuthUser(request, env, db);
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
        const limited = checkRateLimit(request, 'feedback_post', 12, 10 * 60 * 1000);
        if (limited) return limited;

        const user = await getAuthUser(request, env, db);
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

        // CAPTCHA prüfen (außer für verifizierten API-Key)
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
        if (user.role !== 'agent') {
          const catLabels = { wish: '💡 Wunsch', bug: '🐞 Bug', praise: '🙌 Lob', question: '❓ Frage' };
          const targetTitle = GAMES_META[targetId]?.title || (targetId === 'general' ? 'Allgemein / Hub' : targetId);
          const authorDisplay = user.displayName || user.username || 'Spieler';
          const preview = text.length > 500 ? text.slice(0, 500) + '…' : text;
          notifyTelegram(
            env,
            ctx,
            `💬 <b>Neuer Community-Beitrag</b> (#${escapeTelegramHtml(newId)})\n`
            + `<b>Bereich:</b> ${escapeTelegramHtml(targetTitle)}\n`
            + `<b>Kategorie:</b> ${escapeTelegramHtml(catLabels[category] || category)}\n`
            + `<b>Von:</b> ${escapeTelegramHtml(authorDisplay)} (<code>${escapeTelegramHtml(user.username || '')}</code>)\n`
            + `<b>Titel:</b> ${escapeTelegramHtml(title)}\n\n`
            + `${escapeTelegramHtml(preview)}\n\n`
            + `🔗 https://hunterjoeing.github.io/`
          );
        }
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
      // FEEDBACK: POST /api/feedback/:id/reply (Antwort / Admin-Kommentar)
      // ----------------------------------------------------------------------
      const replyMatch = /^\/api\/feedback\/(\d+)\/reply$/.exec(path);
      if (replyMatch && request.method === 'POST') {
        const limited = checkRateLimit(request, 'feedback_reply', 20, 10 * 60 * 1000);
        if (limited) return limited;

        const postId = parseInt(replyMatch[1], 10);
        const user = await getAuthUser(request, env, db);
        if (!user) {
          return jsonResponse({ ok: false, error: 'Bitte logge dich ein, um zu antworten.' }, 401);
        }

        const postRow = await db.prepare(
          'SELECT id, title, target_id FROM feedback_posts WHERE id = ?1'
        ).bind(postId).first();
        if (!postRow) {
          return jsonResponse({ ok: false, error: 'Beitrag nicht gefunden.' }, 404);
        }

        const body = await request.json().catch(() => ({}));
        const text = cleanText(body.body, 1500);
        if (text.length < 2) {
          return jsonResponse({ ok: false, error: 'Bitte gib einen Antworttext ein.' }, 400);
        }

        // Wenn ein Admin oder KI-Assistent antwortet (oder asAgent gewählt wurde), darf auch der Status geändert werden
        const hasAdminSecret = Boolean(body.adminSecret && env.ADMIN_SECRET && await timingSafeEqualStr(String(body.adminSecret), env.ADMIN_SECRET));
        const isPrivileged = user.role === 'admin' || user.role === 'agent' || hasAdminSecret;
        const authorRole = (isPrivileged && body.asAgent) ? 'agent' : (isPrivileged && user.role === 'user' ? 'admin' : (user.role || 'user'));
        const authorName = authorRole === 'agent'
          ? (cleanText(body.authorName, 40) || '🤖 KI-Assistent')
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

        if (authorRole !== 'admin' && authorRole !== 'agent') {
          const targetId = postRow.target_id || 'general';
          const targetTitle = GAMES_META[targetId]?.title || (targetId === 'general' ? 'Allgemein / Hub' : targetId);
          const preview = text.length > 500 ? text.slice(0, 500) + '…' : text;
          notifyTelegram(
            env,
            ctx,
            `↩️ <b>Neue Antwort im Community Board</b> (Beitrag #${escapeTelegramHtml(postId)})\n`
            + `<b>Bereich:</b> ${escapeTelegramHtml(targetTitle)}\n`
            + (postRow.title ? `<b>Zu:</b> ${escapeTelegramHtml(postRow.title)}\n` : '')
            + `<b>Von:</b> ${escapeTelegramHtml(authorName)}\n\n`
            + `${escapeTelegramHtml(preview)}\n\n`
            + `🔗 https://hunterjoeing.github.io/`
          );
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
      // FEEDBACK: PATCH /api/feedback/:id/status (Status ändern · Admin / Agent)
      // ----------------------------------------------------------------------
      const statusMatch = /^\/api\/feedback\/(\d+)\/status$/.exec(path);
      if (statusMatch && request.method === 'PATCH') {
        const postId = parseInt(statusMatch[1], 10);
        const user = await getAuthUser(request, env, db);
        if (!user) {
          return jsonResponse({ ok: false, error: 'Bitte logge dich ein.' }, 401);
        }
        const body = await request.json().catch(() => ({}));
        const hasAdminSecret = Boolean(body.adminSecret && env.ADMIN_SECRET && await timingSafeEqualStr(String(body.adminSecret), env.ADMIN_SECRET));
        if (user.role !== 'admin' && user.role !== 'agent' && !hasAdminSecret) {
          return jsonResponse({ ok: false, error: 'Nur Administratoren dürfen den Status ändern.' }, 403);
        }
        const validStatuses = ['open', 'in_progress', 'fixed'];
        if (!validStatuses.includes(body.status)) {
          return jsonResponse({ ok: false, error: 'Ungültiger Status.' }, 400);
        }
        const postRow = await db.prepare('SELECT id FROM feedback_posts WHERE id = ?1').bind(postId).first();
        if (!postRow) {
          return jsonResponse({ ok: false, error: 'Beitrag nicht gefunden.' }, 404);
        }
        await db.prepare(
          `UPDATE feedback_posts SET status = ?1, updated_at = datetime('now') WHERE id = ?2`
        ).bind(body.status, postId).run();
        return jsonResponse({ ok: true, id: postId, status: body.status });
      }

      // ----------------------------------------------------------------------
      // FEEDBACK: POST /api/feedback/:id/vote (Upvote)
      // ----------------------------------------------------------------------
      const voteMatch = /^\/api\/feedback\/(\d+)\/vote$/.exec(path);
      if (voteMatch && request.method === 'POST') {
        const postId = parseInt(voteMatch[1], 10);
        const user = await getAuthUser(request, env, db);
        if (!user || !user.id) {
          return jsonResponse({ ok: false, error: 'Bitte logge dich ein, um abzustimmen.' }, 401);
        }

        const postRow = await db.prepare('SELECT id FROM feedback_posts WHERE id = ?1').bind(postId).first();
        if (!postRow) {
          return jsonResponse({ ok: false, error: 'Beitrag nicht gefunden.' }, 404);
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

        const [statsRes, countsRes, bestRes] = await Promise.all([
          db.prepare('SELECT game_id, plays FROM game_stats').all(),
          db.prepare('SELECT game_id, COUNT(*) AS entries FROM scores GROUP BY game_id').all(),
          db.prepare(
            `SELECT game_id, id, player_name AS playerName, score, lower_is_better AS lowerIsBetter, label, meta, created_at AS createdAt
             FROM (
               SELECT *, ROW_NUMBER() OVER (
                 PARTITION BY game_id
                 ORDER BY CASE WHEN lower_is_better = 1 THEN score ELSE -score END ASC, id ASC
               ) AS rn
               FROM scores
             ) WHERE rn = 1`
          ).all()
        ]);

        const playsMap = {};
        (statsRes.results || []).forEach(r => { playsMap[r.game_id] = Number(r.plays || 0); });
        const entriesMap = {};
        (countsRes.results || []).forEach(r => { entriesMap[r.game_id] = Number(r.entries || 0); });
        const bestMap = {};
        (bestRes.results || []).forEach(r => {
          const best = {
            id: r.id,
            playerName: r.playerName,
            score: r.score,
            lowerIsBetter: !!r.lowerIsBetter,
            label: r.label,
            meta: null,
            createdAt: r.createdAt
          };
          try { best.meta = r.meta ? JSON.parse(r.meta) : null; } catch (e) { best.meta = null; }
          bestMap[r.game_id] = best;
        });

        for (const [gid, cfg] of Object.entries(GAMES_META)) {
          if (cfg.noLeaderboard) continue;
          const best = bestMap[gid] || null;
          const entries = entriesMap[gid] || 0;
          const plays = Math.max(entries, playsMap[gid] || 0);
          if (best) totalRecords++;
          totalPlays += plays;
          gamesOut[gid] = {
            gameId: gid,
            title: cfg.title,
            lowerIsBetter: cfg.lowerIsBetter,
            plays,
            entries,
            best
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
          `SELECT id, player_name as playerName, score, label, meta, created_at as createdAt
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
        const limited = checkRateLimit(request, 'scores_post', 60, 60 * 1000);
        if (limited) return limited;

        const body = await request.json().catch(() => ({}));
        const gid = cleanText(body.gameId, 40);
        if (!gid) return jsonResponse({ ok: false, error: 'Missing gameId' }, 400);
        const validationError = validateEroadtripScore(gid, body);
        if (validationError) return jsonResponse({ ok: false, error: validationError }, 400);
        if (!Object.hasOwn(GAMES_META, gid) || GAMES_META[gid].noLeaderboard) {
          return jsonResponse({ ok: false, error: 'Unknown gameId' }, 400);
        }

        const cfg = GAMES_META[gid];
        const playerName = cleanText(body.playerName || 'Spieler', 24) || 'Spieler';
        const score = Math.round(Number(body.score) || 0);
        if (!Number.isFinite(score)) return jsonResponse({ ok: false, error: 'Invalid score' }, 400);
        const label = cleanText(body.label || String(score), 80);
        const runId = body.runId ? cleanText(body.runId, 64) : null;
        const metaStr = body.meta ? JSON.stringify(body.meta) : null;
        if (metaStr && metaStr.length > 2048) {
          return jsonResponse({ ok: false, error: 'Score metadata too large' }, 400);
        }

        let existingIsBetter = true;
        let existingScoreVal = score;
        let updateToken = null;

        if (runId) {
          const existing = await db.prepare('SELECT id, game_id AS gameId, score FROM scores WHERE run_id = ?1').bind(runId).first();
          if (existing) {
            if (existing.gameId !== gid) {
              return jsonResponse({ ok: false, error: 'runId belongs to a different board' }, 400);
            }
            const tokenOk = await verifyScoreUpdateToken(body.updateToken, gid, runId, env.JWT_SECRET);
            if (!tokenOk) {
              return jsonResponse({ ok: false, error: 'Unauthorized run update' }, 403);
            }
            existingScoreVal = Number(existing.score);
            existingIsBetter = cfg.lowerIsBetter ? score < existingScoreVal : score > existingScoreVal;
            if (existingIsBetter) {
              await db.prepare(
                `UPDATE scores SET player_name = ?1, score = ?2, label = ?3, meta = ?4, created_at = datetime('now') WHERE id = ?5`
              ).bind(playerName, score, label, metaStr, existing.id).run();
            } else {
              await db.prepare('UPDATE scores SET player_name = ?1 WHERE id = ?2').bind(playerName, existing.id).run();
            }
            updateToken = body.updateToken;
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
            updateToken = await signScoreUpdateToken(gid, runId, env.JWT_SECRET);
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

        const effectiveScore = existingIsBetter ? score : existingScoreVal;
        const order = cfg.lowerIsBetter ? 'ASC' : 'DESC';
        const compOp = cfg.lowerIsBetter ? '<' : '>';
        const rankRow = await db.prepare(
          `SELECT COUNT(*) + 1 as rk FROM scores WHERE game_id = ?1 AND score ${compOp} ?2`
        ).bind(gid, effectiveScore).first();
        const bestRaw = await db.prepare(
          `SELECT id, player_name as playerName, score, label, meta, created_at as createdAt
           FROM scores WHERE game_id = ?1 ORDER BY score ${order}, id ASC LIMIT 1`
        ).bind(gid).first();
        let best = null;
        if (bestRaw) {
          let parsedMeta = null;
          try { parsedMeta = bestRaw.meta ? JSON.parse(bestRaw.meta) : null; } catch (e) {}
          best = { ...bestRaw, meta: parsedMeta };
        }
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
          best,
          ...(updateToken ? { updateToken } : {})
        });
      }

      // ----------------------------------------------------------------------
      // TELEGRAM WEBHOOK: POST /api/telegram/webhook
      // Ermöglicht direkte Antworten aus Telegram als KI-Assistent auf Community-Beiträge
      // ----------------------------------------------------------------------
      if (path === '/api/telegram/webhook' && request.method === 'POST') {
        const providedSecret = request.headers.get('X-Telegram-Bot-Api-Secret-Token') || '';
        if (!env.TELEGRAM_WEBHOOK_SECRET || !await timingSafeEqualStr(providedSecret, env.TELEGRAM_WEBHOOK_SECRET)) {
          return jsonResponse({ ok: false, error: 'Unauthorized webhook' }, 401);
        }

        const update = await request.json().catch(() => ({}));
        const msg = update?.message || update?.edited_message;
        if (!msg || !msg.text) {
          return jsonResponse({ ok: true, ignored: true });
        }

        const chatId = String(msg.chat?.id || '');
        if (!env.TELEGRAM_CHAT_ID || chatId !== String(env.TELEGRAM_CHAT_ID)) {
          return jsonResponse({ ok: true, ignored: 'unauthorized_chat' });
        }

        const rawText = String(msg.text || '').trim();
        if (!rawText || rawText === '/start' || rawText === '/help') {
          notifyTelegram(
            env,
            ctx,
            `🤖 <b>HunterJoe Telegram-Bridge aktiv</b>\n\n`
            + `• Antworte direkt auf eine Meldung (oder nutze <code>/fix &lt;Text&gt;</code> bzw. <code>/reply &lt;Text&gt;</code>), um als <b>KI-Assistent</b> zu antworten.\n`
            + `• Mit <code>/delete</code> (oder <code>/delete &lt;Beitrag-ID&gt;</code>) löschst du die letzte Assistenten-Antwort wieder.`
          );
          return jsonResponse({ ok: true });
        }

        // 1. Post-ID bestimmen: aus beantworteter Bot-Nachricht "(#123)", aus Text "#123" / "/fix 123" oder neuester Beitrag
        let postId = null;
        const replySrc = String(msg.reply_to_message?.text || '');
        const replyIdMatch = /\(#(\d+)\)/.exec(replySrc) || /Beitrag #(\d+)/.exec(replySrc);
        if (replyIdMatch) {
          postId = parseInt(replyIdMatch[1], 10);
        }

        const delMatch = /^\/delete(?:@\w+)?(?:\s+#?(\d+))?\s*$/i.exec(rawText);
        if (delMatch) {
          if (delMatch[1]) postId = parseInt(delMatch[1], 10);
          if (!postId) {
            const latestPost = await db.prepare(
              `SELECT post_id FROM feedback_replies WHERE author_role = 'agent' ORDER BY id DESC LIMIT 1`
            ).first().catch(() => null);
            if (latestPost?.post_id) postId = Number(latestPost.post_id);
          }
          if (!postId) {
            notifyTelegram(env, ctx, '⚠️ Keine Assistenten-Antwort zum Löschen gefunden.');
            return jsonResponse({ ok: true });
          }
          const lastReply = await db.prepare(
            `SELECT id FROM feedback_replies WHERE post_id = ?1 AND author_role = 'agent' ORDER BY id DESC LIMIT 1`
          ).bind(postId).first().catch(() => null);
          if (!lastReply?.id) {
            notifyTelegram(env, ctx, `⚠️ Keine Assistenten-Antwort unter Beitrag #${escapeTelegramHtml(postId)} gefunden.`);
            return jsonResponse({ ok: true });
          }
          await db.prepare(`DELETE FROM feedback_replies WHERE id = ?1`).bind(lastReply.id).run();
          await db.prepare(`UPDATE feedback_posts SET status = 'open', updated_at = datetime('now') WHERE id = ?1`).bind(postId).run();
          notifyTelegram(env, ctx, `🗑️ Letzte Assistenten-Antwort unter Beitrag #${escapeTelegramHtml(postId)} gelöscht (Status wieder <b>Offen</b>).`);
          return jsonResponse({ ok: true, deletedReplyId: lastReply.id, postId });
        }

        let cmd = 'fix';
        let bodyText = rawText;
        const cmdMatch = /^\/(fix|fixed|reply|wip)(?:@\w+)?\s*([\s\S]*)$/i.exec(rawText);
        if (cmdMatch) {
          cmd = cmdMatch[1].toLowerCase();
          bodyText = (cmdMatch[2] || '').trim();
          const numPrefix = /^(?:#?)(\d+)\b\s*([\s\S]*)$/.exec(bodyText);
          if (numPrefix && !postId) {
            postId = parseInt(numPrefix[1], 10);
            bodyText = (numPrefix[2] || '').trim();
          }
        } else {
          const hashMatch = /^#(\d+)\s+([\s\S]+)$/.exec(rawText);
          if (hashMatch && !postId) {
            postId = parseInt(hashMatch[1], 10);
            bodyText = hashMatch[2].trim();
          }
        }

        if (!postId) {
          const latestOpen = await db.prepare(
            `SELECT id FROM feedback_posts WHERE status != 'fixed' ORDER BY id DESC LIMIT 1`
          ).first().catch(() => null);
          const latestAny = latestOpen || await db.prepare(
            `SELECT id FROM feedback_posts ORDER BY id DESC LIMIT 1`
          ).first().catch(() => null);
          if (latestAny?.id) postId = Number(latestAny.id);
        }

        if (!postId) {
          notifyTelegram(env, ctx, '⚠️ Kein Community-Beitrag in der Datenbank gefunden.');
          return jsonResponse({ ok: true, error: 'no_post_found' });
        }

        const postRow = await db.prepare(
          'SELECT id, title, target_id FROM feedback_posts WHERE id = ?1'
        ).bind(postId).first().catch(() => null);

        if (!postRow) {
          notifyTelegram(env, ctx, `⚠️ Beitrag #${escapeTelegramHtml(postId)} existiert nicht.`);
          return jsonResponse({ ok: true, error: 'post_not_found' });
        }

        const finalText = cleanText(
          bodyText || 'Vielen Dank für dein Feedback! Dieser Punkt wurde inzwischen umgesetzt und behoben. Viel Spaß beim Weiterzocken!',
          1500
        );
        const newStatus = (cmd === 'reply' || cmd === 'wip') ? 'in_progress' : 'fixed';

        await db.prepare(
          `INSERT INTO feedback_replies (post_id, author_id, author_name, author_role, body, new_status)
           VALUES (?1, 0, '🤖 KI-Assistent', 'agent', ?2, ?3)`
        ).bind(postId, finalText, newStatus).run();

        await db.prepare(
          `UPDATE feedback_posts SET status = ?1, updated_at = datetime('now') WHERE id = ?2`
        ).bind(newStatus, postId).run();

        notifyTelegram(
          env,
          ctx,
          `✅ <b>Antwort veröffentlicht</b> (Beitrag #${escapeTelegramHtml(postId)})\n`
          + `<b>Titel:</b> ${escapeTelegramHtml(postRow.title || '')}\n`
          + `<b>Status:</b> ${newStatus === 'fixed' ? '✅ Behoben' : '🛠️ In Arbeit'}\n`
          + `<b>Text:</b> ${escapeTelegramHtml(finalText)}`
        );

        return jsonResponse({ ok: true, postId, newStatus });
      }

      return jsonResponse({ ok: false, error: 'Route not found: ' + path }, 404);
    } catch (err) {
      console.error('Worker error:', err);
      return jsonResponse({ ok: false, error: 'Interner Serverfehler' }, 500);
    }
  }
};
