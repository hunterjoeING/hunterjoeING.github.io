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
    { id: 'podracer', icon: '🏎️', title: 'Canyon Podracer 3D', meta: 'Three.js', path: 'games/podracer/index.html' },
    { id: 'eroadtrip', icon: '⚡', title: 'E-Roadtrip', meta: 'Phaser 3', path: 'games/e-roadtrip/index.html' },
    { id: 'minesweeper', icon: '💣', title: '3D Minesweeper', meta: 'Tech Demo', path: 'games/minesweeper/index.html' },
    { id: 'minesweeper_3d_prompt_test', icon: '🧊', title: 'Minesweeper 3D Prompt', meta: '3×3–5×5', path: 'games/minesweeper-3d-prompt-test/index.html' },
    { id: 'roadster', icon: '🚀', title: 'Hyper-Roadster Lander', meta: 'Arcade', path: 'games/roadster/index.html' },
    { id: 'zombie', icon: '🧟', title: 'Zombie Horde: Gate Runner', meta: 'Action', path: 'games/zombie/index.html' },
    { id: 'tower', icon: '🛸', title: 'Bastion Tower Defense', meta: 'Taktik', path: 'games/tower/index.html' },
    { id: 'solitaire3d', icon: '🕷️', title: '3D Spider Solitär', meta: '4 Farben', path: 'games/solitaire3d/index.html' },
    { id: 'solitaire', icon: '🃏', title: 'Klondike Solitaire', meta: 'Karten', path: 'games/solitaire/index.html' },
    { id: 'p2048', icon: '🔷', title: '2048 Prism', meta: 'Logik', path: 'games/2048/index.html' }
  ];

  const QUIZZES_1000_NAV = [
    { id: 'quiz_waldgarten', icon: '🌿', title: 'Waldgarten (Heideblick)', meta: '75 Fr.', path: 'games/quiz-waldgarten/index.html', unlisted: true },
    { id: 'quiz_mil_air', icon: '🛩️', title: 'Militärflugzeuge', meta: '75 Fr.', path: 'games/quiz-military-aircraft/index.html' },
    { id: 'quiz_airliners', icon: '✈️', title: 'Passagierflugzeuge', meta: '75 Fr.', path: 'games/quiz-airliners/index.html' },
    { id: 'quiz_etfs', icon: '📈', title: 'Passives Investieren & ETFs', meta: '75 Fr.', path: 'games/quiz-etfs/index.html' },
    { id: 'quiz_bitcoin', icon: '₿', title: 'Bitcoin Mega-Quiz', meta: '75 Fr.', path: 'games/quiz-bitcoin/index.html' },
    { id: 'quiz', icon: '❓', title: 'Quiz Arena: Klassik & Mega', meta: '675 Mega', path: 'games/quiz/index.html' }
  ];

  const QUIZZES_THEMEN_NAV = [
    { id: 'quiz_napoli72h', icon: '🍕', title: 'Napoli72H Pizza-Quiz (Aachen)', meta: '75 Fr.', path: 'games/quiz-napoli72h/index.html', unlisted: true },
    { id: 'quiz_porsche', icon: '🏎️', title: 'Porsche & Taycan Quiz', meta: '75 Fr.', path: 'games/quiz-porsche/index.html' },
    { id: 'quiz_md11', icon: '🛫', title: 'McDonnell Douglas MD-11', meta: '75 Fr.', path: 'games/quiz-md11/index.html' },
    { id: 'quiz_ai', icon: '🤖', title: 'KI: Entstehung & Technik', meta: '75 Fr.', path: 'games/quiz-ai/index.html' },
    { id: 'quiz_movies', icon: '🎬', title: 'Kino & Filme (o. RomComs)', meta: '75 Fr.', path: 'games/quiz-movies/index.html' },
    { id: 'quiz_egypt', icon: '🏺', title: 'Ägyptische Geschichte', meta: '75 Fr.', path: 'games/quiz-egypt/index.html' },
    { id: 'quiz_diving', icon: '🤿', title: 'Tauchen & Scuba Diving', meta: '75 Fr.', path: 'games/quiz-diving/index.html' },
    { id: 'quiz_emob', icon: '⚡', title: 'E-Mobilität & Tesla', meta: '75 Fr.', path: 'games/quiz-emobility/index.html' },
    { id: 'quiz_hist', icon: '🏛️', title: 'Geschichte & Weltereignisse', meta: '75 Fr.', path: 'games/quiz-history/index.html' },
    { id: 'quiz_china', icon: '🏯', title: 'Neuere Chinesische Gesch.', meta: '75 Fr.', path: 'games/quiz-china/index.html' },
    { id: 'quiz_pol', icon: '⚖️', title: 'Politik & Ökonomie', meta: '75 Fr.', path: 'games/quiz-politics/index.html' }
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
      .abm-trigger { display:inline-flex; align-items:center; justify-content:center; gap:6px; min-width:36px; height:36px; padding:0 10px; border-radius:10px; background:#FFFFFF; border:1px solid rgba(15,23,42,0.14); color:#0F172A; cursor:pointer; flex-shrink:0; transition:all 0.25s cubic-bezier(0.22,1,0.36,1); }
      .abm-trigger:hover { background:#EEF2F8; border-color:#1E3A8A; color:#1E3A8A; transform:translateY(-1px); }
      .abm-trigger svg { display:block; width:18px; height:18px; stroke:currentColor; stroke-width:2; stroke-linecap:round; fill:none; }
      html[data-theme="dark"] .abm-trigger:not(.in-ms) { background:#111827; border-color:rgba(148,163,184,0.20); color:#F8FAFC; }
      html[data-theme="dark"] .abm-trigger:not(.in-ms):hover { background:#1E293B; border-color:#2563EB; color:#60A5FA; }
      #mode-toggle .abm-trigger { height:28px; min-width:30px; padding:0 7px; border-radius:6px; }
      .top-bar { padding-right:62px !important; }
      .top-bar .controls-group .abm-trigger { position:absolute; top:12px; right:14px; height:36px; padding:0 10px; border-radius:10px; }
      @media (max-width:760px) {
        .hub-header { position:relative; }
        .hub-header .brand-block { width:100%; padding-right:48px; box-sizing:border-box; }
        .hub-header .abm-trigger { position:absolute; top:18px; right:18px; }
      }
      @media (max-width:720px) {
        .top-bar { padding-right:52px !important; }
        .top-bar .brand-group { flex-wrap:wrap; }
        .top-bar .controls-group .abm-trigger { top:8px; right:10px; height:30px; min-width:32px; padding:0 7px; }
      }
      @media (max-width:560px) {
        .arcade-topbar { padding-right:calc(54px + env(safe-area-inset-right,0px)) !important; }
        .arcade-topbar .topbar-left { flex:1 1 auto; min-width:0; }
        .arcade-topbar .topbar-right { flex-shrink:1; max-width:100%; margin-left:auto; justify-content:flex-end; flex-wrap:wrap; }
        .arcade-topbar .abm-trigger { position:absolute; top:calc(10px + env(safe-area-inset-top,0px)); right:calc(12px + env(safe-area-inset-right,0px)); }
      }
      .abm-backdrop { position:fixed; inset:0; z-index:9980; background:rgba(15,23,42,0.42); backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); opacity:0; pointer-events:none; transition:opacity 0.24s ease; }
      .abm-backdrop.open { opacity:1; pointer-events:auto; }
      .abm-drawer { position:fixed; top:0; right:0; bottom:0; z-index:9985; width:min(380px,92vw); box-sizing:border-box; background:#F6F8FC; border-left:1px solid rgba(15,23,42,0.08); box-shadow:-16px 0 48px rgba(15,23,42,0.14); color:#0F172A; display:flex; flex-direction:column; font-family:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif; transform:translateX(104%); transition:transform 0.28s cubic-bezier(0.22,1,0.36,1); padding-top:env(safe-area-inset-top,0px); padding-bottom:env(safe-area-inset-bottom,0px); }
      .abm-drawer.open { transform:translateX(0); }
      .abm-head { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:18px 20px 14px; border-bottom:1px solid rgba(15,23,42,0.08); background:#FFFFFF; }
      .abm-brand { display:flex; flex-direction:column; min-width:0; }
      .abm-brand strong { font-family:'Outfit','Plus Jakarta Sans',system-ui,sans-serif; font-size:17px; font-weight:600; color:#0F172A; letter-spacing:-0.02em; }
      .abm-brand span { font-size:12px; color:#475569; }
      .abm-close { width:36px; height:36px; border-radius:10px; border:1px solid rgba(15,23,42,0.12); background:#FFFFFF; color:#0F172A; font-size:16px; font-weight:500; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.22s cubic-bezier(0.22,1,0.36,1); }
      .abm-close:hover { background:#EEF2F8; border-color:#1E3A8A; color:#1E3A8A; }
      .abm-scroll { flex:1; overflow-y:auto; overscroll-behavior:contain; padding:16px 18px 20px; display:flex; flex-direction:column; gap:14px; }
      .abm-user-card { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:12px 14px; border-radius:14px; background:#FFFFFF; border:1px solid rgba(15,23,42,0.08); box-shadow:0 6px 18px -6px rgba(15,23,42,0.06); }
      .abm-user-info { min-width:0; }
      .abm-user-name { font-size:13.5px; font-weight:600; color:#0F172A; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .abm-user-sub { font-size:11.5px; color:#475569; }
      .abm-mini-btn { padding:6px 12px; border-radius:8px; border:1px solid #1E3A8A; background:#1E3A8A; color:#FFFFFF; font-size:12px; font-weight:500; cursor:pointer; white-space:nowrap; transition:all 0.2s; }
      .abm-mini-btn:hover { background:#172554; }
      .abm-quick-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
      .abm-quick-btn { display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:10px 12px; border-radius:10px; border:1px solid rgba(15,23,42,0.10); background:#FFFFFF; color:#0F172A; font-size:12.5px; font-weight:500; text-decoration:none; cursor:pointer; transition:all 0.25s cubic-bezier(0.22,1,0.36,1); }
      .abm-quick-btn:hover { border-color:#1E3A8A; background:#EEF2F8; color:#1E3A8A; transform:translateY(-1px); }
      .abm-search { width:100%; box-sizing:border-box; padding:10px 14px; border-radius:10px; border:1px solid rgba(15,23,42,0.14); background:#FFFFFF; color:#0F172A; font-family:inherit; font-size:13.5px; outline:none; transition:border-color 0.2s, box-shadow 0.2s; }
      .abm-search:focus { border-color:#1E3A8A; box-shadow:0 0 0 3px rgba(30,58,138,0.10); }
      .abm-sec-title { font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:#2563EB; margin:4px 2px 8px; }
      .abm-list { display:flex; flex-direction:column; gap:4px; }
      .abm-link { display:flex; align-items:center; gap:10px; padding:9px 12px; border-radius:10px; text-decoration:none; color:#0F172A; font-size:13.5px; font-weight:500; border:1px solid transparent; transition:all 0.2s cubic-bezier(0.22,1,0.36,1); }
      .abm-link:hover { background:#EEF2F8; border-color:rgba(30,58,138,0.28); color:#0F172A; }
      .abm-link.active { background:#1E3A8A; border-color:#1E3A8A; color:#FFFFFF; font-weight:600; }
      .abm-link-icon { width:20px; text-align:center; flex-shrink:0; font-size:15px; }
      .abm-link-title { flex:1; min-width:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .abm-link-meta { font-size:11px; font-variant-numeric:tabular-nums; color:#475569; padding:2px 8px; border-radius:999px; background:#EEF2F8; flex-shrink:0; }
      .abm-link.active .abm-link-meta { background:rgba(255,255,255,0.20); color:#FFFFFF; }
      .abm-foot { display:flex; align-items:center; justify-content:space-between; gap:8px; padding:14px 20px; border-top:1px solid rgba(15,23,42,0.08); background:#FFFFFF; font-size:12.5px; }
      .abm-foot a { color:#1E3A8A; text-decoration:none; font-weight:500; }
      .abm-foot a:hover { text-decoration:underline; }
      html[data-theme="dark"] .abm-backdrop { background:rgba(6,10,20,0.72); }
      html[data-theme="dark"] .abm-drawer { background:#0B1120; border-left-color:rgba(148,163,184,0.16); color:#F8FAFC; box-shadow:-16px 0 48px rgba(0,0,0,0.62); }
      html[data-theme="dark"] .abm-head { background:#111827; border-bottom-color:rgba(148,163,184,0.14); }
      html[data-theme="dark"] .abm-brand strong { color:#F8FAFC; }
      html[data-theme="dark"] .abm-brand span { color:#94A3B8; }
      html[data-theme="dark"] .abm-close { background:#1E293B; border-color:rgba(148,163,184,0.20); color:#F8FAFC; }
      html[data-theme="dark"] .abm-close:hover { border-color:#2563EB; color:#60A5FA; }
      html[data-theme="dark"] .abm-user-card { background:#111827; border-color:rgba(148,163,184,0.14); }
      html[data-theme="dark"] .abm-user-name { color:#F8FAFC; }
      html[data-theme="dark"] .abm-user-sub { color:#94A3B8; }
      html[data-theme="dark"] .abm-mini-btn { background:#2563EB; border-color:#2563EB; color:#FFFFFF; }
      html[data-theme="dark"] .abm-quick-btn { background:#111827; border-color:rgba(148,163,184,0.16); color:#F8FAFC; }
      html[data-theme="dark"] .abm-quick-btn:hover { background:#1E293B; border-color:#2563EB; color:#60A5FA; }
      html[data-theme="dark"] .abm-search { background:#111827; border-color:rgba(148,163,184,0.18); color:#F8FAFC; }
      html[data-theme="dark"] .abm-sec-title { color:#60A5FA; }
      html[data-theme="dark"] .abm-link { color:#E2E8F0; }
      html[data-theme="dark"] .abm-link:hover { background:#1E293B; border-color:rgba(37,99,235,0.45); color:#FFFFFF; }
      html[data-theme="dark"] .abm-link.active { background:#2563EB; border-color:#2563EB; color:#FFFFFF; }
      html[data-theme="dark"] .abm-link-meta { background:#1E293B; color:#94A3B8; }
      html[data-theme="dark"] .abm-link.active .abm-link-meta { background:rgba(255,255,255,0.22); color:#FFFFFF; }
      html[data-theme="dark"] .abm-foot { background:#111827; border-top-color:rgba(148,163,184,0.14); }
      html[data-theme="dark"] .abm-foot a { color:#60A5FA; }
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
    const isAdmin = !!(window.ArcadeAuth && ((typeof window.ArcadeAuth.isAdmin === 'function' && window.ArcadeAuth.isAdmin()) || (window.ArcadeAuth.getUser && window.ArcadeAuth.getUser()?.role === 'admin')));
    const groups = [
      { label: '🎮 Games (10)', items: GAMES_NAV },
      { label: '🌟 Flagship-Quizzes & Mega-Mix (5)', items: QUIZZES_1000_NAV },
      { label: '🧠 Themen-Quizzes (10)', items: QUIZZES_THEMEN_NAV },
      { label: '📷 Foto- & Exkursions-Quizzes (5)', items: QUIZZES_FOTO_NAV }
    ];
    if (isAdmin) {
      const hiddenItems = [
        ...QUIZZES_1000_NAV.filter(it => it.unlisted),
        ...QUIZZES_THEMEN_NAV.filter(it => it.unlisted)
      ];
      if (hiddenItems.length > 0) {
        groups.push({
          label: `🔒 Versteckte Quizze (${hiddenItems.length})`,
          items: hiddenItems,
          allowUnlisted: true
        });
      }
    }
    let html = '';
    let matches = 0;
    for (const grp of groups) {
      const visible = grp.allowUnlisted ? grp.items : grp.items.filter(it => !it.unlisted);
      const filtered = q
        ? visible.filter(it => (it.title + ' ' + it.meta).toLowerCase().includes(q))
        : visible;
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
          <span>10 Games · 20 Quiz-Welten (1.371 Pool)</span>
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
    window.addEventListener('arcade:auth-changed', () => {
      refreshDrawerDynamicParts();
      if (drawerState.elDrawer) {
        const navBox = drawerState.elDrawer.querySelector('#abm-nav-groups');
        if (navBox) navBox.innerHTML = renderSections();
      }
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
