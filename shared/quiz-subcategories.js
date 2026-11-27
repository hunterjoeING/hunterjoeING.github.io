// Generic Subcategory Quiz Component (HunterJoe Arcade)
// Shared UI and management for multi-category quizzes (Football, American Football, etc.)
(function () {
  'use strict';

  function escHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  window.ArcadeQuizSubcategories = {
    /**
     * Renders category cards into a container element.
     */
    renderGrid: function (containerEl, categories, options) {
      if (!containerEl || !Array.isArray(categories)) return;
      const opts = options || {};
      const getMatchingPool = typeof opts.getMatchingPool === 'function' ? opts.getMatchingPool : () => [];
      const onSelect = opts.onSelect;
      const onBoard = opts.onBoard;

      containerEl.innerHTML = categories.map(function (c) {
        const pool = getMatchingPool(c.id);
        const stats = (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.getSeenStats === 'function')
          ? window.ArcadeQuizEngine.getSeenStats(c.boardId, pool)
          : { total: pool.length, unseen: pool.length, seen: 0 };
        const roundLen = (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.resolveRoundCount === 'function')
          ? window.ArcadeQuizEngine.resolveRoundCount(12, stats.total, 12)
          : Math.min(12, stats.total);

        return '<div class="cat-card ' + escHtml(c.cls || '') + '" data-cat-id="' + escHtml(c.id) + '">' +
          '<div class="cat-header">' +
            '<span class="cat-icon">' + escHtml(c.icon) + '</span>' +
            '<button type="button" class="cat-board-btn" data-board-id="' + escHtml(c.boardId) + '" data-cat-name="' + escHtml(c.name) + '" title="Bestenliste für ' + escHtml(c.name) + ' ansehen">🏆 Bestenliste</button>' +
          '</div>' +
          '<div class="cat-name">' + escHtml(c.name) + '</div>' +
          '<div class="cat-desc">' + escHtml(c.desc) + '</div>' +
          '<div class="cat-meta">' + Number(stats.total) + ' Fragen (' + Number(stats.unseen) + ' neu) · Runde: ' + Number(roundLen) + '</div>' +
        '</div>';
      }).join('');

      containerEl.querySelectorAll('.cat-card').forEach(function (card) {
        card.addEventListener('click', function (e) {
          const boardBtn = e.target.closest('.cat-board-btn');
          if (boardBtn) {
            e.stopPropagation();
            if (typeof onBoard === 'function') {
              onBoard(boardBtn.dataset.boardId, boardBtn.dataset.catName);
            }
            return;
          }
          if (typeof onSelect === 'function') {
            onSelect(card.dataset.catId);
          }
        });
      });
    },

    /**
     * Binds click events to difficulty pills.
     */
    bindDiffBar: function (barEl, options) {
      if (!barEl) return { getDiff: function () { return 'all'; }, setDiff: function () {} };
      const opts = options || {};
      let currentDiff = opts.initialDiff || 'all';

      barEl.addEventListener('click', function (e) {
        const btn = e.target.closest('.diff-pill');
        if (!btn) return;
        currentDiff = btn.dataset.diff;
        barEl.querySelectorAll('.diff-pill').forEach(function (p) {
          p.classList.toggle('active', p === btn);
        });
        if (window.ArcadeAudio && typeof window.ArcadeAudio.click === 'function') {
          window.ArcadeAudio.click();
        }
        if (typeof opts.onChange === 'function') {
          opts.onChange(currentDiff);
        }
      });

      return {
        getDiff: function () { return currentDiff; },
        setDiff: function (d) {
          currentDiff = d;
          barEl.querySelectorAll('.diff-pill').forEach(function (p) {
            p.classList.toggle('active', p.dataset.diff === d);
          });
        }
      };
    },

    /**
     * Resolves question pool for a given category id and difficulty.
     */
    resolvePool: function (catId, options) {
      const opts = options || {};
      const catMap = opts.catMap || {};
      const mixBankTopics = opts.mixBankTopics || [];
      const selectedDiff = opts.selectedDiff || 'all';
      let full = [];

      if (catId === 'mix') {
        for (let i = 0; i < mixBankTopics.length; i++) {
          const topic = mixBankTopics[i];
          const bank = (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.getBank === 'function')
            ? window.ArcadeQuizEngine.getBank(topic)
            : ((window.ARCADE_QUIZ_BANKS && window.ARCADE_QUIZ_BANKS[topic]) || []);
          full = full.concat(bank);
        }
      } else {
        const c = catMap[catId];
        if (c && c.bankTopic) {
          full = (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.getBank === 'function')
            ? window.ArcadeQuizEngine.getBank(c.bankTopic)
            : ((window.ARCADE_QUIZ_BANKS && window.ARCADE_QUIZ_BANKS[c.bankTopic]) || []);
        }
      }

      if (selectedDiff === 'all') return full;
      return full.filter(function (q) {
        if (selectedDiff === 'pro') {
          return q.diff === 'pro' || q.diff === 'hard' || q.diff === 'nerd';
        }
        return q.diff === selectedDiff;
      });
    },

    /**
     * Opens a PIN-protected admin modal to view or reset category leaderboards.
     */
    openAdminModal: function (options) {
      const opts = options || {};
      const title = opts.title || 'Admin-Bereich & Bestenlisten';
      const subtitle = opts.subtitle || 'Verwalte die einzelnen Bestenlisten der Unterkategorien.';
      const categories = Array.isArray(opts.categories) ? opts.categories : [];
      const pin = opts.pin || '2408';

      const enteredPin = window.prompt('Admin-PIN zur Bestenlisten-Verwaltung:');
      if (enteredPin === null) return;
      if (enteredPin !== pin && !(window.ArcadeAuth && typeof window.ArcadeAuth.isAdmin === 'function' && window.ArcadeAuth.isAdmin())) {
        alert('Falsche PIN.');
        return;
      }

      const board = window.ArcadeQuizBoard;
      if (!board) {
        alert('Bestenlisten-Modul nicht verfügbar.');
        return;
      }

      function renderRows() {
        return categories.map(function (c) {
          const count = board.get(c.boardId).length;
          return '<div style="border:1px solid var(--border-subtle,rgba(15,23,42,.14));border-radius:12px;padding:10px;margin-bottom:10px;">' +
            '<div style="font-weight:800;margin-bottom:6px;">' + escHtml(c.icon) + ' ' + escHtml(c.name) + ' <span style="opacity:.6;font-size:12px;">(' + Number(count) + ' Einträge)</span></div>' +
            '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +
              '<button type="button" data-act="show" data-bid="' + escHtml(c.boardId) + '" data-title="' + escHtml(c.name) + '" style="' + board.btnCss + '">🏆 Anzeigen</button>' +
              '<button type="button" data-act="reset" data-bid="' + escHtml(c.boardId) + '" data-title="' + escHtml(c.name) + '" style="' + board.btnCss + 'color:#ef4444;">🗑 Zurücksetzen</button>' +
            '</div>' +
          '</div>';
        }).join('');
      }

      const modalHtml = '<h3 style="margin:0 0 12px;">🔒 ' + escHtml(title) + '</h3>' +
        '<p style="margin:0 0 12px;font-size:13px;opacity:.75;">' + escHtml(subtitle) + '</p>' +
        '<div id="subcat-adm-rows">' + renderRows() + '</div>' +
        '<div style="text-align:right;margin-top:14px;"><button type="button" class="adm-close" style="' + board.btnCss + '">Schließen</button></div>';

      const m = board.modal(modalHtml);

      const closeBtn = m.querySelector('.adm-close');
      if (closeBtn) closeBtn.onclick = function () { board.closeModal(m); };

      m.addEventListener('click', function (e) {
        if (e.target === m) return board.closeModal(m);
        const btn = e.target.closest('button[data-act]');
        if (!btn) return;
        const bid = btn.dataset.bid;
        const catTitle = btn.dataset.title;
        if (btn.dataset.act === 'show') {
          board.show(bid, catTitle);
        } else if (confirm('Bestenliste für "' + catTitle + '" wirklich löschen?')) {
          board.reset(bid);
          const rowsContainer = m.querySelector('#subcat-adm-rows');
          if (rowsContainer) rowsContainer.innerHTML = renderRows();
          if (typeof opts.onReset === 'function') opts.onReset(bid);
        }
      });
    }
  };
})();
