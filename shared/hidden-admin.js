// PIN-geschützter, dezenter Admin-Bereich für versteckte Quizzes (Waldgarten, Napoli72H, ...).
// Trigger: unscheinbarer Punkt im Footer ODER URL-Parameter ?admin=1 (PIN-Abfrage folgt immer).
// Hinweis: reiner Client-seitiger Sichtschutz, kein echter Zugriffsschutz.
(function () {
  const ADMIN_PIN = '2408'; // <- hier leicht änderbar
  const HIDDEN_QUIZZES = [
    { id: 'quiz_waldgarten', icon: '🌿', title: 'Waldgarten (Heideblick)', path: 'games/quiz-waldgarten/index.html' },
    { id: 'quiz_napoli72h', icon: '🍕', title: 'Napoli72H Pizza-Quiz', path: 'games/quiz-napoli72h/index.html' },
    { id: 'quiz_herr_tutto', icon: '🎩', title: 'Herr Tutto Quiz (Eilendorf)', path: 'games/quiz-herr-tutto/index.html' }
  ];

  function B() { return window.ArcadeQuizBoard; }
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function openPanel() {
    const board = B();
    if (!board) { alert('Bestenlisten-Modul nicht geladen.'); return; }
    const rows = HIDDEN_QUIZZES.map(q =>
      '<div style="border:1px solid var(--border-subtle,rgba(15,23,42,.14));border-radius:12px;padding:10px;margin-bottom:10px;">' +
      '<div style="font-weight:800;margin-bottom:8px;">' + escHtml(q.icon) + ' ' + escHtml(q.title) + ' <span style="opacity:.6;font-weight:600;font-size:12px;">(' + Number(board.get(q.id).length) + ' Einträge)</span></div>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +
      '<a href="./' + escHtml(q.path) + '" style="' + board.btnPrimary + 'text-decoration:none;">▶ Starten</a>' +
      '<button type="button" data-act="show" data-id="' + escHtml(q.id) + '" style="' + board.btnCss + '">🏆 Bestenliste</button>' +
      '<button type="button" data-act="reset" data-id="' + escHtml(q.id) + '" style="' + board.btnCss + '">🗑 Zurücksetzen</button>' +
      '</div></div>').join('');
    const m = board.modal('<h3 style="margin:0 0 12px;">🔒 Versteckte Quizzes</h3>' + rows +
      '<div style="text-align:right;"><button type="button" class="adm-close" style="' + board.btnCss + '">Schließen</button></div>');
    m.querySelector('.adm-close').onclick = () => board.closeModal(m);
    m.addEventListener('click', e => {
      if (e.target === m) return board.closeModal(m);
      const btn = e.target.closest('button[data-act]');
      if (!btn) return;
      const q = HIDDEN_QUIZZES.find(x => x.id === btn.dataset.id);
      if (btn.dataset.act === 'show') board.show(q.id, q.title);
      else if (confirm('Bestenliste "' + q.title + '" wirklich zurücksetzen?')) {
        board.reset(q.id);
        board.closeModal(m);
        openPanel();
      }
    });
  }

  function askPin() {
    const pin = window.prompt('Admin-PIN:');
    if (pin === null) return;
    if (pin === ADMIN_PIN) openPanel(); else alert('Falsche PIN.');
  }

  function init() {
    const nav = document.querySelector('.hub-legal-nav');
    if (nav) {
      const sep = document.createElement('span');
      sep.setAttribute('aria-hidden', 'true');
      sep.textContent = '·';
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = 'π';
      a.title = 'Admin';
      a.setAttribute('aria-label', 'Admin-Bereich');
      a.style.cssText = 'opacity:.25;text-decoration:none;';
      a.addEventListener('click', e => { e.preventDefault(); askPin(); });
      nav.appendChild(sep);
      nav.appendChild(a);
    }
    if (/[?&]admin=1(&|$)/.test(location.search)) askPin();
  }

  // Bestenlisten-Modul sicherstellen (Startseite lädt quiz-engine.js nicht zwingend)
  if (!window.ArcadeQuizBoard) {
    const cs = document.currentScript;
    if (cs && cs.src) {
      const s = document.createElement('script');
      s.src = cs.src.replace(/hidden-admin\.js(\?.*)?$/, 'quiz-board.js');
      document.head.appendChild(s);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
