// Modular Top-Right Burger Menu & Slide-Over Navigation Drawer (Dark & Light Mode)
(function () {
  if (window.ArcadeBurger) return;

  const SCRIPT_SRC = (document.currentScript && document.currentScript.src) || '';

  function resolveRootHref() {
    if (SCRIPT_SRC) {
      try {
        return new URL('../', SCRIPT_SRC).href;
      } catch (e) {}
    }
    try {
      const p = (window.location.pathname || '').toLowerCase();
      return p.includes('/games/') ? '../../' : './';
    } catch (e) {
      return './';
    }
  }

  const GAMES_NAV = [
    { id: 'minesweeper', icon: '💣', title: '3D Minesweeper', meta: 'Tech Demo', path: 'games/minesweeper/index.html' },
    { id: 'minesweeper_3d_prompt_test', icon: '🧊', title: 'Minesweeper 3D Prompt', meta: '3×3–5×5', path: 'games/minesweeper-3d-prompt-test/index.html' },
    { id: 'roadster', icon: '🚀', title: 'Hyper-Roadster Lander', meta: 'Arcade', path: 'games/roadster/index.html' },
    { id: 'zombie', icon: '🧟', title: 'Zombie Horde: Gate Runner', meta: 'Action', path: 'games/zombie/index.html' },
    { id: 'tower', icon: '🛸', title: 'Bastion Tower Defense', meta: 'Taktik', path: 'games/tower/index.html' },
    { id: 'solitaire', icon: '🃏', title: 'Klondike Solitaire', meta: 'Karten', path: 'games/solitaire/index.html' },
    { id: 'p2048', icon: '🔷', title: '2048 Prism', meta: 'Logik', path: 'games/2048/index.html' }
  ];

  const QUIZZES_1000_NAV = [
    { id: 'quiz_waldgarten', icon: '🌿', title: 'Waldgarten (Heideblick)', meta: '1.000 Fr.', path: 'games/quiz-waldgarten/index.html' },
    { id: 'quiz_mil_air', icon: '🛩️', title: 'Militärflugzeuge', meta: '1.000 Fr.', path: 'games/quiz-military-aircraft/index.html' },
    { id: 'quiz_airliners', icon: '✈️', title: 'Passagierflugzeuge', meta: '1.000 Fr.', path: 'games/quiz-airliners/index.html' },
    { id: 'quiz_etfs', icon: '📈', title: 'Passives Investieren & ETFs', meta: '1.000 Fr.', path: 'games/quiz-etfs/index.html' },
    { id: 'quiz', icon: '❓', title: 'Quiz Arena: Klassik & Mega', meta: '1.156 Mega', path: 'games/quiz/index.html' }
  ];

  const QUIZZES_THEMEN_NAV = [
    { id: 'quiz_napoli72h', icon: '🍕', title: 'Napoli72H Pizza-Quiz (Aachen)', meta: '160 Fr.', path: 'games/quiz-napoli72h/index.html' },
    { id: 'quiz_ai', icon: '🤖', title: 'KI: Entstehung & Technik', meta: '108 Fr.', path: 'games/quiz-ai/index.html' },
    { id: 'quiz_movies', icon: '🎬', title: 'Kino & Filme (o. RomComs)', meta: '108 Fr.', path: 'games/quiz-movies/index.html' },
    { id: 'quiz_egypt', icon: '🏺', title: 'Ägyptische Geschichte', meta: '108 Fr.', path: 'games/quiz-egypt/index.html' },
    { id: 'quiz_diving', icon: '🤿', title: 'Tauchen & Scuba Diving', meta: '108 Fr.', path: 'games/quiz-diving/index.html' },
    { id: 'quiz_emob', icon: '⚡', title: 'E-Mobilität & Tesla', meta: '108 Fr.', path: 'games/quiz-emobility/index.html' },
    { id: 'quiz_hist', icon: '🏛️', title: 'Geschichte & Weltereignisse', meta: '108 Fr.', path: 'games/quiz-history/index.html' },
    { id: 'quiz_china', icon: '🏯', title: 'Neuere Chinesische Gesch.', meta: '100 Fr.', path: 'games/quiz-china/index.html' },
    { id: 'quiz_pol', icon: '⚖️', title: 'Politik & Ökonomie', meta: '84 Fr.', path: 'games/quiz-politics/index.html' }
  ];

  const QUIZZES_FOTO_NAV = [
    { id: 'quiz_cpus', icon: '💻', title: 'Prozessoren (2000–Heute)', meta: '16 Fotos', path: 'games/quiz-cpus/index.html' },
    { id: 'quiz_gpus', icon: '🎮', title: 'Grafikkarten (2000–Heute)', meta: '16 Fotos', path: 'games/quiz-gpus/index.html' },
    { id: 'quiz_phones', icon: '📱', title: 'Handys & Smartphones', meta: '16 Fotos', path: 'games/quiz-phones/index.html' },
    { id: 'quiz_pilze_aachen', icon: '🍄', title: 'Pilz-Quiz Region Aachen', meta: '24 Arten', path: 'games/quiz-pilze-aachen/index.html' },
    { id: 'quiz_swiss_trains', icon: '🚆', title: 'Schweizer Eisenbahnloks', meta: '24 Fotos', path: 'games/quiz-swiss-trains/index.html' }
  ];

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function detectCurrentPage() {
    try {
      const p = (window.location.pathname || '').toLowerCase();
      if (p.endsWith('/impressum.html')) return 'impressum';
      if (p.endsWith('/datenschutz.html')) return 'datenschutz';
      const all = [...GAMES_NAV, ...QUIZZES_1000_NAV, ...QUIZZES_THEMEN_NAV, ...QUIZZES_FOTO_NAV];
      for (const item of all) {
        const slug = item.path.replace('/index.html', '').toLowerCase();
        if (p.includes('/' + slug)) return item.id;
      }
      return 'hub';
    } catch (e) {
      return 'hub';
    }
  }

  function injectStyles() {
    if (document.getElementById('arcade-burger-style')) return;
    const style = document.createElement('style');
    style.id = 'arcade-burger-style';
    style.textContent = `
      .abm-trigger { display:inline-flex; align-items:center; justify-content:center; gap:6px; min-width:36px; height:34px; padding:0 9px; border-radius:9px; background:rgba(15,23,42,0.92); border:1px solid rgba(56,189,248,0.42); color:#f8fafc; cursor:pointer; flex-shrink:0; transition:background 0.15s, border-color 0.15s; }
      .abm-trigger:hover { background:rgba(14,116,144,0.45); border-color:#38bdf8; }
      .abm-trigger svg { display:block; width:18px; height:18px; stroke:currentColor; stroke-width:2.2; stroke-linecap:round; fill:none; }
      html[data-theme="light"] .abm-trigger:not(.in-ms) { background:rgba(255,255,255,0.94); border-color:rgba(15,23,42,0.22); color:#0f172a; }
      html[data-theme="light"] .abm-trigger:not(.in-ms):hover { background:#e0f2fe; border-color:#0284c7; color:#0369a1; }
      #mode-toggle .abm-trigger { height:28px; min-width:30px; padding:0 7px; border-radius:5px; }
      .top-bar { padding-right:62px !important; }
      .top-bar .controls-group .abm-trigger { position:absolute; top:12px; right:14px; height:34px; padding:0 10px; border-radius:10px; }
      @media (max-width:760px) {
        .hub-header { position:relative; }
        .hub-header .brand-block { width:100%; padding-right:46px; box-sizing:border-box; }
        .hub-header .abm-trigger { position:absolute; top:12px; right:13px; }
      }
      @media (max-width:720px) {
        .top-bar { padding-right:52px !important; }
        .top-bar .brand-group { flex-wrap:wrap; }
        .top-bar .controls-group .abm-trigger { top:8px; right:10px; height:30px; min-width:32px; padding:0 7px; }
      }
      @media (max-width:560px) {
        .arcade-topbar { padding-right:calc(52px + env(safe-area-inset-right,0px)) !important; }
        .arcade-topbar .topbar-left { flex:1 1 auto; min-width:0; }
        .arcade-topbar .topbar-right { flex-shrink:1; max-width:100%; margin-left:auto; justify-content:flex-end; flex-wrap:wrap; }
        .arcade-topbar .abm-trigger { position:absolute; top:calc(8px + env(safe-area-inset-top,0px)); right:calc(10px + env(safe-area-inset-right,0px)); }
      }
      .abm-backdrop { position:fixed; inset:0; z-index:9980; background:rgba(2,6,23,0.68); backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); opacity:0; pointer-events:none; transition:opacity 0.2s ease; }
      .abm-backdrop.open { opacity:1; pointer-events:auto; }
      .abm-drawer { position:fixed; top:0; right:0; bottom:0; z-index:9985; width:min(370px,91vw); box-sizing:border-box; background:rgba(8,15,34,0.97); border-left:1px solid rgba(56,189,248,0.36); box-shadow:-16px 0 48px rgba(0,0,0,0.65); color:#f1f5f9; display:flex; flex-direction:column; font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif; transform:translateX(104%); transition:transform 0.22s cubic-bezier(0.22,1,0.36,1); padding-top:env(safe-area-inset-top,0px); padding-bottom:env(safe-area-inset-bottom,0px); }
      .abm-drawer.open { transform:translateX(0); }
      .abm-head { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:14px 16px 12px; border-bottom:1px solid rgba(148,163,184,0.2); }
      .abm-brand { display:flex; flex-direction:column; min-width:0; }
      .abm-brand strong { font-size:15px; font-weight:800; color:#f8fafc; letter-spacing:-0.01em; }
      .abm-brand span { font-size:11.5px; color:#94a3b8; }
      .abm-close { width:34px; height:34px; border-radius:9px; border:1px solid rgba(148,163,184,0.32); background:rgba(15,23,42,0.9); color:#e2e8f0; font-size:17px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; }
      .abm-close:hover { border-color:#38bdf8; color:#ffffff; }
      .abm-scroll { flex:1; overflow-y:auto; overscroll-behavior:contain; padding:12px 14px 16px; display:flex; flex-direction:column; gap:12px; }
      .abm-user-card { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 12px; border-radius:12px; background:rgba(15,23,42,0.85); border:1px solid rgba(56,189,248,0.26); }
      .abm-user-info { min-width:0; }
      .abm-user-name { font-size:13px; font-weight:700; color:#f8fafc; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .abm-user-sub { font-size:11px; color:#94a3b8; }
      .abm-mini-btn { padding:5px 10px; border-radius:8px; border:1px solid rgba(56,189,248,0.42); background:rgba(14,116,144,0.32); color:#e0f2fe; font-size:11.5px; font-weight:700; cursor:pointer; white-space:nowrap; }
      .abm-quick-grid { display:grid; grid-template-columns:1fr 1fr; gap:7px; }
      .abm-quick-btn { display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:8px 10px; border-radius:10px; border:1px solid rgba(148,163,184,0.26); background:rgba(15,23,42,0.85); color:#e2e8f0; font-size:12px; font-weight:700; text-decoration:none; cursor:pointer; transition:border-color 0.14s, background 0.14s; }
      .abm-quick-btn:hover { border-color:#38bdf8; background:rgba(14,116,144,0.26); color:#ffffff; }
      .abm-search { width:100%; box-sizing:border-box; padding:8px 12px; border-radius:10px; border:1px solid rgba(148,163,184,0.28); background:rgba(15,23,42,0.9); color:#f8fafc; font-size:13px; outline:none; }
      .abm-search:focus { border-color:#38bdf8; }
      .abm-sec-title { font-size:11px; font-weight:800; letter-spacing:0.06em; text-transform:uppercase; color:#7dd3fc; margin:2px 2px 6px; }
      .abm-list { display:flex; flex-direction:column; gap:4px; }
      .abm-link { display:flex; align-items:center; gap:9px; padding:8px 10px; border-radius:10px; text-decoration:none; color:#e2e8f0; font-size:13px; font-weight:600; border:1px solid transparent; transition:background 0.12s, border-color 0.12s; }
      .abm-link:hover { background:rgba(14,165,233,0.14); border-color:rgba(56,189,248,0.28); color:#ffffff; }
      .abm-link.active { background:rgba(14,165,233,0.22); border-color:rgba(56,189,248,0.58); color:#ffffff; font-weight:700; }
      .abm-link-icon { width:20px; text-align:center; flex-shrink:0; font-size:15px; }
      .abm-link-title { flex:1; min-width:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .abm-link-meta { font-size:10.5px; font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; color:#94a3b8; padding:2px 6px; border-radius:999px; background:rgba(148,163,184,0.14); flex-shrink:0; }
      .abm-link.active .abm-link-meta { background:rgba(56,189,248,0.28); color:#bae6fd; }
      .abm-foot { display:flex; align-items:center; justify-content:space-between; gap:8px; padding:11px 16px; border-top:1px solid rgba(148,163,184,0.2); font-size:12px; }
      .abm-foot a { color:#7dd3fc; text-decoration:none; font-weight:600; }
      .abm-foot a:hover { text-decoration:underline; }
      html[data-theme="light"] .abm-backdrop { background:rgba(15,23,42,0.42); }
      html[data-theme="light"] .abm-drawer { background:rgba(255,255,255,0.98); border-left-color:rgba(15,23,42,0.16); color:#0f172a; box-shadow:-16px 0 42px rgba(15,23,42,0.18); }
      html[data-theme="light"] .abm-head { border-bottom-color:rgba(15,23,42,0.12); }
      html[data-theme="light"] .abm-brand strong { color:#0f172a; }
      html[data-theme="light"] .abm-brand span { color:#475569; }
      html[data-theme="light"] .abm-close { background:#f1f5f9; border-color:rgba(15,23,42,0.16); color:#0f172a; }
      html[data-theme="light"] .abm-user-card { background:#f8fafc; border-color:rgba(2,132,199,0.24); }
      html[data-theme="light"] .abm-user-name { color:#0f172a; }
      html[data-theme="light"] .abm-user-sub { color:#64748b; }
      html[data-theme="light"] .abm-mini-btn { background:#e0f2fe; border-color:rgba(2,132,199,0.42); color:#0369a1; }
      html[data-theme="light"] .abm-quick-btn { background:#f8fafc; border-color:rgba(15,23,42,0.14); color:#0f172a; }
      html[data-theme="light"] .abm-quick-btn:hover { background:#e0f2fe; border-color:#0284c7; color:#0369a1; }
      html[data-theme="light"] .abm-search { background:#f8fafc; border-color:rgba(15,23,42,0.18); color:#0f172a; }
      html[data-theme="light"] .abm-sec-title { color:#0369a1; }
      html[data-theme="light"] .abm-link { color:#1e293b; }
      html[data-theme="light"] .abm-link:hover { background:#f0f9ff; border-color:rgba(2,132,199,0.28); color:#0369a1; }
      html[data-theme="light"] .abm-link.active { background:#e0f2fe; border-color:#0284c7; color:#0369a1; }
      html[data-theme="light"] .abm-link-meta { background:rgba(15,23,42,0.08); color:#475569; }
      html[data-theme="light"] .abm-link.active .abm-link-meta { background:#0284c7; color:#ffffff; }
      html[data-theme="light"] .abm-foot { border-top-color:rgba(15,23,42,0.12); }
      html[data-theme="light"] .abm-foot a { color:#0369a1; }
    `;
    document.head.appendChild(style);
  }

  function findHeaderSlot() {
    const selectors = [
      '.arcade-topbar .topbar-right',
      '.hub-header .header-actions',
      '#mode-toggle',
      'header.top-bar .controls-group'
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    return null;
  }

  let drawerState = {
    open: false,
    filter: '',
    currentId: 'hub',
    rootHref: './',
    elTrigger: null,
    elBackdrop: null,
    elDrawer: null
  };

  function getPlayerSummary() {
    const authUser = window.ArcadeAuth && window.ArcadeAuth.getUser ? window.ArcadeAuth.getUser() : null;
    if (authUser && authUser.username) {
      return {
        name: authUser.username,
        sub: authUser.role === 'admin' ? '👑 Betreiber-Account' : '✅ Angemeldetes Konto'
      };
    }
    const localName = window.ArcadeScores && window.ArcadeScores.getPlayerName ? window.ArcadeScores.getPlayerName() : '';
    if (localName) {
      return { name: localName, sub: 'Lokaler Highscore-Name' };
    }
    return { name: 'Gast-Spieler', sub: 'Namen setzen oder anmelden' };
  }

  function renderSections() {
    const q = drawerState.filter.trim().toLowerCase();
    const groups = [
      { label: '🎮 Games (7)', items: GAMES_NAV },
      { label: '🌟 1.000+ Fragen-Quizzes (5)', items: QUIZZES_1000_NAV },
      { label: '🧠 Themen-Quizzes (8)', items: QUIZZES_THEMEN_NAV },
      { label: '📷 Foto- & Exkursions-Quizzes (5)', items: QUIZZES_FOTO_NAV }
    ];
    let html = '';
    let matches = 0;
    for (const grp of groups) {
      const filtered = q
        ? grp.items.filter(it => (it.title + ' ' + it.meta).toLowerCase().includes(q))
        : grp.items;
      if (!filtered.length) continue;
      matches += filtered.length;
      html += `<div><div class="abm-sec-title">${esc(grp.label)}</div><div class="abm-list">`;
      for (const it of filtered) {
        const isActive = drawerState.currentId === it.id;
        html += `<a class="abm-link${isActive ? ' active' : ''}" href="${esc(drawerState.rootHref + it.path)}">`
          + `<span class="abm-link-icon">${it.icon}</span>`
          + `<span class="abm-link-title">${esc(it.title)}</span>`
          + `<span class="abm-link-meta">${isActive ? 'Aktiv' : esc(it.meta)}</span>`
          + `</a>`;
      }
      html += `</div></div>`;
    }
    if (!matches) {
      html = `<div style="text-align:center;padding:18px 8px;color:#94a3b8;font-size:13px;">Keine Module für „${esc(drawerState.filter)}“ gefunden.</div>`;
    }
    return html;
  }

  function refreshDrawerDynamicParts() {
    if (!drawerState.elDrawer) return;
    const p = getPlayerSummary();
    const uName = drawerState.elDrawer.querySelector('#abm-user-name');
    const uSub = drawerState.elDrawer.querySelector('#abm-user-sub');
    if (uName) uName.textContent = p.name;
    if (uSub) uSub.textContent = p.sub;

    const btnTheme = drawerState.elDrawer.querySelector('#abm-quick-theme');
    if (btnTheme) {
      const isLight = (window.ArcadeTheme && window.ArcadeTheme.get && window.ArcadeTheme.get() === 'light');
      btnTheme.textContent = isLight ? '🌙 Dunkel' : '☀️ Hell';
    }
    const btnMute = drawerState.elDrawer.querySelector('#abm-quick-mute');
    if (btnMute && window.ArcadeAudio && window.ArcadeAudio.isMuted) {
      btnMute.textContent = window.ArcadeAudio.isMuted() ? '🔇 Stumm' : '🔊 Ton';
    }
    const navBox = drawerState.elDrawer.querySelector('#abm-nav-groups');
    if (navBox) navBox.innerHTML = renderSections();
  }

  function setDrawerOpen(nextOpen) {
    drawerState.open = !!nextOpen;
    if (drawerState.elBackdrop) drawerState.elBackdrop.classList.toggle('open', drawerState.open);
    if (drawerState.elDrawer) {
      drawerState.elDrawer.classList.toggle('open', drawerState.open);
      drawerState.elDrawer.setAttribute('aria-hidden', drawerState.open ? 'false' : 'true');
    }
    if (drawerState.elTrigger) {
      drawerState.elTrigger.setAttribute('aria-expanded', drawerState.open ? 'true' : 'false');
    }
    if (drawerState.open) {
      refreshDrawerDynamicParts();
      const s = drawerState.elDrawer && drawerState.elDrawer.querySelector('#abm-search-input');
      if (s && window.innerWidth >= 700) {
        setTimeout(() => { try { s.focus(); } catch (e) {} }, 60);
      }
    }
  }

  function buildDrawerDom() {
    if (document.getElementById('abm-drawer')) return;
    const backdrop = document.createElement('div');
    backdrop.id = 'abm-backdrop';
    backdrop.className = 'abm-backdrop';
    backdrop.addEventListener('click', () => setDrawerOpen(false));

    const drawer = document.createElement('aside');
    drawer.id = 'abm-drawer';
    drawer.className = 'abm-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', 'HunterJoe Arcade Navigation');
    drawer.setAttribute('aria-hidden', 'true');

    const root = drawerState.rootHref;
    const fbTarget = (drawerState.currentId === 'hub' || drawerState.currentId === 'impressum' || drawerState.currentId === 'datenschutz')
      ? 'all'
      : drawerState.currentId;

    drawer.innerHTML = `
      <div class="abm-head">
        <div class="abm-brand">
          <strong>🕹️ HunterJoe Arcade</strong>
          <span>7 Games · 19 Quiz-Welten (5.412 Pool)</span>
        </div>
        <button type="button" class="abm-close" id="abm-btn-close" aria-label="Menü schließen">✕</button>
      </div>
      <div class="abm-scroll">
        <div class="abm-user-card">
          <div class="abm-user-info">
            <div class="abm-user-name" id="abm-user-name">Gast-Spieler</div>
            <div class="abm-user-sub" id="abm-user-sub">Highscores &amp; Community</div>
          </div>
          <button type="button" class="abm-mini-btn" id="abm-btn-account">👤 Profil</button>
        </div>
        <div class="abm-quick-grid">
          <a class="abm-quick-btn" href="${esc(root + 'index.html')}">🏠 Dashboard</a>
          <button type="button" class="abm-quick-btn" id="abm-quick-board">🏆 Bestenliste</button>
          <button type="button" class="abm-quick-btn" id="abm-quick-feedback">💬 Wünsche</button>
          <button type="button" class="abm-quick-btn" id="abm-quick-theme">☀️ Hell</button>
        </div>
        <div style="display:flex;gap:7px;align-items:center;">
          <input type="search" class="abm-search" id="abm-search-input" placeholder="🔍 Spiel oder Quiz suchen..." aria-label="Module filtern" />
          <button type="button" class="abm-quick-btn" id="abm-quick-mute" style="flex-shrink:0;padding:8px 10px;">🔊</button>
        </div>
        <div id="abm-nav-groups"></div>
      </div>
      <div class="abm-foot">
        <a href="${esc(root + 'impressum.html')}">⚖️ Impressum</a>
        <a href="${esc(root + 'datenschutz.html')}">🔒 Datenschutz</a>
      </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);
    drawerState.elBackdrop = backdrop;
    drawerState.elDrawer = drawer;

    drawer.querySelector('#abm-btn-close').addEventListener('click', () => {
      if (window.ArcadeAudio) window.ArcadeAudio.click();
      setDrawerOpen(false);
    });
    drawer.querySelector('#abm-btn-account').addEventListener('click', () => {
      setDrawerOpen(false);
      if (window.ArcadeAudio) window.ArcadeAudio.click();
      if (window.ArcadeScores && window.ArcadeScores.openPlayerNameModal) window.ArcadeScores.openPlayerNameModal();
    });
    drawer.querySelector('#abm-quick-board').addEventListener('click', () => {
      setDrawerOpen(false);
      if (window.ArcadeAudio) window.ArcadeAudio.click();
      if (window.ArcadeScores && window.ArcadeScores.openLeaderboardModal) window.ArcadeScores.openLeaderboardModal(fbTarget === 'all' ? null : fbTarget);
    });
    drawer.querySelector('#abm-quick-feedback').addEventListener('click', () => {
      setDrawerOpen(false);
      if (window.ArcadeAudio) window.ArcadeAudio.click();
      if (window.ArcadeFeedback && window.ArcadeFeedback.openModal) window.ArcadeFeedback.openModal(fbTarget);
    });
    drawer.querySelector('#abm-quick-theme').addEventListener('click', () => {
      if (window.ArcadeTheme && window.ArcadeTheme.toggle) window.ArcadeTheme.toggle();
      refreshDrawerDynamicParts();
    });
    drawer.querySelector('#abm-quick-mute').addEventListener('click', () => {
      const pageMute = document.getElementById('btn-mute');
      if (window.ArcadeAudio && window.ArcadeAudio.toggleMute) window.ArcadeAudio.toggleMute(pageMute);
      refreshDrawerDynamicParts();
    });
    drawer.querySelector('#abm-search-input').addEventListener('input', (e) => {
      drawerState.filter = e.target.value || '';
      const navBox = drawer.querySelector('#abm-nav-groups');
      if (navBox) navBox.innerHTML = renderSections();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawerState.open) setDrawerOpen(false);
    });
  }

  function mountTrigger() {
    if (document.getElementById('btn-arcade-burger')) return;
    const slot = findHeaderSlot();
    if (!slot) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'btn-arcade-burger';
    btn.className = 'abm-trigger' + (slot.id === 'mode-toggle' ? ' in-ms' : '');
    btn.title = 'Menü & Alle Module (☰)';
    btn.setAttribute('aria-label', 'Hauptmenü öffnen');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'abm-drawer');
    btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="4" y1="6.5" x2="20" y2="6.5"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17.5" x2="20" y2="17.5"/></svg>`;
    btn.addEventListener('click', () => {
      if (window.ArcadeAudio) window.ArcadeAudio.click();
      setDrawerOpen(!drawerState.open);
    });
    slot.appendChild(btn);
    drawerState.elTrigger = btn;
  }

  window.ArcadeBurger = {
    init: function () {
      drawerState.rootHref = resolveRootHref();
      drawerState.currentId = detectCurrentPage();
      injectStyles();
      mountTrigger();
      buildDrawerDom();
      refreshDrawerDynamicParts();
    },
    open: function () { setDrawerOpen(true); },
    close: function () { setDrawerOpen(false); },
    toggle: function () { setDrawerOpen(!drawerState.open); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.ArcadeBurger.init());
  } else {
    window.ArcadeBurger.init();
  }
})();
