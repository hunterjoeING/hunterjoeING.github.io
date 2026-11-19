// Einheitliche lokale Quiz-Bestenliste (localStorage) für ALLE Quizzes inkl. versteckter Quizzes.
// Sortierung: Punktzahl absteigend, bei Gleichstand Zeit aufsteigend.
// Nach Rundenende: optionale, überspringbare Namenseingabe.
(function () {
  const KEY_PREFIX = 'arcade_quizboard_v1:';
  const NAME_KEY = 'arcade_quizboard_name';
  const MAX_ENTRIES = 50;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function read(id) {
    try {
      const a = JSON.parse(localStorage.getItem(KEY_PREFIX + id) || '[]');
      return Array.isArray(a) ? a : [];
    } catch (e) { return []; }
  }
  function write(id, list) {
    try { localStorage.setItem(KEY_PREFIX + id, JSON.stringify(list)); } catch (e) {}
  }
  function sortList(list) {
    return list.slice().sort((a, b) => (b.score - a.score) || (a.seconds - b.seconds) || (a.ts - b.ts));
  }
  function fmtTime(sec) {
    const m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + String(s).padStart(2, '0');
  }
  function closeModal(el) { if (el && el.parentNode) el.parentNode.removeChild(el); }

  function modal(html) {
    const wrap = document.createElement('div');
    wrap.className = 'qb-backdrop';
    wrap.style.cssText = 'position:fixed;inset:0;z-index:100000;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center;padding:16px;';
    wrap.innerHTML = '<div class="qb-card" role="dialog" aria-modal="true" style="background:var(--bg-surface,#fff);color:var(--text-main,#0f172a);border:1px solid var(--border-subtle,rgba(15,23,42,.14));border-radius:16px;max-width:440px;width:100%;max-height:85vh;overflow:auto;padding:20px;box-shadow:0 20px 50px rgba(0,0,0,.3);font-family:inherit;">' + html + '</div>';
    document.body.appendChild(wrap);
    return wrap;
  }
  const btnCss = 'cursor:pointer;border-radius:10px;padding:9px 14px;font:inherit;font-weight:700;border:1px solid var(--border-subtle,rgba(15,23,42,.2));background:var(--bg-elevated,#f6f8fc);color:inherit;';
  const btnPrimary = btnCss + 'background:var(--accent-primary,#1e3a8a);color:#fff;border-color:transparent;';

  function boardHtml(id, highlightTs) {
    const list = sortList(read(id));
    if (!list.length) return '<p style="opacity:.7;margin:8px 0;">Noch keine Einträge.</p>';
    const rows = list.slice(0, 20).map((e, i) =>
      '<tr' + (e.ts === highlightTs ? ' style="font-weight:800;"' : '') + '><td style="padding:5px 6px;">' + (i + 1) + '.</td><td style="padding:5px 6px;">' + esc(e.name) +
      '</td><td style="padding:5px 6px;text-align:right;">' + e.score + ' Pkt</td><td style="padding:5px 6px;text-align:right;opacity:.75;">' + e.correct + '/' + e.total +
      '</td><td style="padding:5px 6px;text-align:right;opacity:.75;">' + fmtTime(e.seconds) + '</td></tr>').join('');
    return '<table style="width:100%;border-collapse:collapse;font-size:14px;"><thead><tr style="text-align:left;opacity:.6;font-size:12px;"><th></th><th>Name</th><th style="text-align:right;">Punkte</th><th style="text-align:right;">Richtig</th><th style="text-align:right;">Zeit</th></tr></thead><tbody>' + rows + '</tbody></table>';
  }

  const api = {
    get: id => sortList(read(id)),
    reset: id => { try { localStorage.removeItem(KEY_PREFIX + id); } catch (e) {} },
    boardHtml,
    modal,
    btnCss,
    btnPrimary,
    closeModal,

    show: (id, title) => {
      const m = modal('<h3 style="margin:0 0 10px;">🏆 ' + esc(title || 'Bestenliste') + '</h3>' + boardHtml(id) +
        '<div style="margin-top:14px;text-align:right;"><button type="button" class="qb-close" style="' + btnCss + '">Schließen</button></div>');
      m.querySelector('.qb-close').onclick = () => closeModal(m);
      m.addEventListener('click', e => { if (e.target === m) closeModal(m); });
    },

    // Speichert den Lauf sofort (Name "Anonym") und bietet danach optionale Namenseingabe an.
    submit: (id, run) => {
      if (!id || !run || !(run.score >= 0)) return;
      const entry = {
        name: 'Anonym', score: Math.round(run.score), correct: run.correct | 0, total: run.total | 0,
        seconds: Math.max(1, run.seconds | 0), ts: Date.now()
      };
      const list = read(id);
      list.push(entry);
      write(id, sortList(list).slice(0, MAX_ENTRIES));

      let saved = '';
      try { saved = localStorage.getItem(NAME_KEY) || ''; } catch (e) {}
      const m = modal('<h3 style="margin:0 0 6px;">Runde beendet: ' + entry.score + ' Pkt</h3>' +
        '<p style="margin:0 0 12px;opacity:.75;font-size:14px;">' + entry.correct + '/' + entry.total + ' richtig · ' + fmtTime(entry.seconds) + ' · optional: Namen für die Bestenliste eintragen.</p>' +
        '<input class="qb-name" type="text" maxlength="20" placeholder="Dein Name (optional)" value="' + esc(saved) + '" style="width:100%;box-sizing:border-box;padding:10px;border-radius:10px;border:1px solid var(--border-subtle,#ccc);background:var(--bg-elevated,#fff);color:inherit;font:inherit;margin-bottom:12px;">' +
        '<div style="display:flex;gap:8px;justify-content:flex-end;"><button type="button" class="qb-skip" style="' + btnCss + '">Überspringen</button><button type="button" class="qb-save" style="' + btnPrimary + '">Speichern</button></div>');
      const input = m.querySelector('.qb-name');
      setTimeout(() => { try { input.focus(); } catch (e) {} }, 50);
      const finish = (name) => {
        if (name) {
          const cur = read(id);
          const hit = cur.find(e => e.ts === entry.ts);
          if (hit) { hit.name = name; write(id, cur); }
          try { localStorage.setItem(NAME_KEY, name); } catch (e) {}
        }
        closeModal(m);
        api.show(id, 'Bestenliste');
      };
      m.querySelector('.qb-skip').onclick = () => finish('');
      m.querySelector('.qb-save').onclick = () => finish(input.value.trim().slice(0, 20));
      input.addEventListener('keydown', e => { if (e.key === 'Enter') finish(input.value.trim().slice(0, 20)); e.stopPropagation(); });
    }
  };
  window.ArcadeQuizBoard = api;
})();
