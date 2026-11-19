// Shared Quiz Deck Engine: 20-Question Default, Anti-Repeat Seen Tracking, Fair Scaling & Mega-Mix Pool Registry
(function () {
  window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};

  const SEEN_PREFIX = 'arcade_quiz_seen_v1:';
  const DEFAULT_LEN_KEY = 'arcade_quiz_len';
  const ROUND_SIZE = 12;      // exakt 12 Fragen pro Runde
  const TEMP_POOL_CAP = 75;   // TEMPORÄR: Pool pro Datenbank auf 75 Fragen begrenzen (entfernen, sobald Banken final sind)
  let roundStartedAt = Date.now();

  // Lädt das lokale Bestenlisten-Modul (shared/quiz-board.js) relativ zu dieser Datei
  (function loadBoard() {
    try {
      const cs = document.currentScript;
      if (!cs || !cs.src || window.ArcadeQuizBoard) return;
      const s = document.createElement('script');
      s.src = cs.src.replace(/quiz-engine\.js(\?.*)?$/, 'quiz-board.js');
      document.head.appendChild(s);
    } catch (e) {}
  })();

  function fnv1aHash(str) {
    let h = 0x811c9dc5;
    const s = String(str || '');
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(36);
  }

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function safeSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
  }

  function getItemId(item, fallbackTopic) {
    if (!item) return '';
    if (item._qid) return item._qid;
    const topic = item._topic || fallbackTopic || 'q';
    const raw = item.id != null ? `${topic}:id:${item.id}` : `${topic}:${item.cat || ''}:${item.q || ''}`;
    const qid = `${topic}_${fnv1aHash(raw)}`;
    try {
      Object.defineProperty(item, '_qid', { value: qid, configurable: true, enumerable: false });
    } catch (e) {
      item._qid = qid;
    }
    return qid;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  // Spread items across topic+category buckets so Mix/Mega rounds don't clump 4 same-topic questions consecutively
  function balancedShuffle(items) {
    if (!items || items.length <= 3) return shuffle(items || []);
    const bucketsMap = new Map();
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const bKey = `${it._topic || 't'}|${it.cat || 'c'}`;
      if (!bucketsMap.has(bKey)) bucketsMap.set(bKey, []);
      bucketsMap.get(bKey).push(it);
    }
    const buckets = Array.from(bucketsMap.values()).map(b => shuffle(b));
    if (buckets.length <= 1) {
      // Single category: diversify slightly by difficulty if present
      const diffMap = new Map();
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        const dk = it.diff || 'd';
        if (!diffMap.has(dk)) diffMap.set(dk, []);
        diffMap.get(dk).push(it);
      }
      const dBuckets = Array.from(diffMap.values()).map(b => shuffle(b));
      if (dBuckets.length <= 1) return shuffle(items);
      return roundRobinInterleave(dBuckets);
    }
    return roundRobinInterleave(buckets);
  }

  function roundRobinInterleave(buckets) {
    const active = shuffle(buckets);
    const out = [];
    while (active.length > 0) {
      const nextRound = [];
      const order = shuffle(active);
      for (let i = 0; i < order.length; i++) {
        const b = order[i];
        if (b.length > 0) {
          out.push(b.pop());
        }
        if (b.length > 0) {
          nextRound.push(b);
        }
      }
      active.length = 0;
      for (let i = 0; i < nextRound.length; i++) active.push(nextRound[i]);
    }
    return out;
  }

  function readSeenSet(quizId) {
    try {
      const raw = safeGet(SEEN_PREFIX + quizId);
      if (!raw) return new Set();
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? new Set(parsed) : new Set();
    } catch (e) {
      return new Set();
    }
  }

  function writeSeenSet(quizId, setObj) {
    try {
      const arr = Array.from(setObj);
      // Cap at 3500 IDs max just as safety guard
      const sliced = arr.length > 3500 ? arr.slice(arr.length - 3500) : arr;
      safeSet(SEEN_PREFIX + quizId, JSON.stringify(sliced));
    } catch (e) {}
  }

  window.ArcadeQuizEngine = {
    registerBank: (topicId, questions) => {
      const clean = (Array.isArray(questions) ? questions : []).map(q => {
        const clone = Object.assign({}, q);
        // `explanation` und `exp` sind austauschbar (Anzeige nach jeder Antwort)
        if (clone.explanation == null && clone.exp != null) clone.explanation = clone.exp;
        else if (clone.exp == null && clone.explanation != null) clone.exp = clone.explanation;
        try {
          Object.defineProperty(clone, '_topic', { value: topicId, configurable: true, enumerable: false });
        } catch (e) {
          clone._topic = topicId;
        }
        getItemId(clone, topicId);
        return clone;
      });
      window.ARCADE_QUIZ_BANKS[topicId] = clean;
      return clean;
    },

    getBank: (topicId) => {
      return (window.ARCADE_QUIZ_BANKS[topicId] || []).slice(0, TEMP_POOL_CAP);
    },

    getAllBanks: () => window.ARCADE_QUIZ_BANKS,

    getItemId,
    shuffle,

    getRoundLength: (allowed = [10, 20, 30, 'all'], fallback = 20, storageKey = DEFAULT_LEN_KEY) => {
      const raw = safeGet(storageKey);
      if (raw === 'all' && allowed.includes('all')) return 'all';
      const parsed = parseInt(raw, 10);
      if (!Number.isNaN(parsed) && allowed.includes(parsed)) return parsed;
      return allowed.includes(fallback) ? fallback : allowed[0];
    },

    setRoundLength: (len, storageKey = DEFAULT_LEN_KEY) => {
      safeSet(storageKey, String(len));
      return len;
    },

    resolveRoundCount: (requested, poolLen, defaultLen = 20) => {
      if (!poolLen || poolLen <= 0) return 0;
      return Math.min(ROUND_SIZE, poolLen);
    },

    getSeenStats: (quizId, pool) => {
      const list = Array.isArray(pool) ? pool : [];
      const seenSet = readSeenSet(quizId);
      let seenCount = 0;
      for (let i = 0; i < list.length; i++) {
        if (seenSet.has(getItemId(list[i], quizId))) seenCount++;
      }
      return {
        total: list.length,
        seen: seenCount,
        unseen: Math.max(0, list.length - seenCount)
      };
    },

    markSeen: (quizId, item) => {
      if (!quizId || !item) return;
      const id = getItemId(item, quizId);
      const seenSet = readSeenSet(quizId);
      if (!seenSet.has(id)) {
        seenSet.add(id);
        writeSeenSet(quizId, seenSet);
      }
    },

    resetSeen: (quizId, subsetPool) => {
      if (!quizId) return;
      if (!Array.isArray(subsetPool)) {
        try { localStorage.removeItem(SEEN_PREFIX + quizId); } catch (e) {}
        return;
      }
      const seenSet = readSeenSet(quizId);
      for (let i = 0; i < subsetPool.length; i++) {
        seenSet.delete(getItemId(subsetPool[i], quizId));
      }
      writeSeenSet(quizId, seenSet);
    },

    drawDeck: (quizId, pool, requestedCount, defaultLen = 20) => {
      // Duplikate (gleiche Frage) entfernen
      const dedupSeen = new Set();
      const list = (Array.isArray(pool) ? pool : []).filter(it => {
        const k = String((it && it.q) || getItemId(it, quizId)).trim().toLowerCase();
        if (dedupSeen.has(k)) return false;
        dedupSeen.add(k);
        return true;
      });
      roundStartedAt = Date.now();
      const count = window.ArcadeQuizEngine.resolveRoundCount(requestedCount, list.length, defaultLen);
      if (count <= 0) return { deck: [], unseenBefore: 0, cycled: false };

      const seenSet = readSeenSet(quizId);
      const unseen = [];
      const seen = [];
      for (let i = 0; i < list.length; i++) {
        const it = list[i];
        const id = getItemId(it, quizId);
        if (seenSet.has(id)) seen.push(it);
        else unseen.push(it);
      }

      const unseenBefore = unseen.length;
      let cycled = false;
      let chosen = [];

      if (unseen.length >= count) {
        chosen = balancedShuffle(unseen).slice(0, count);
      } else if (unseen.length > 0) {
        // Take every remaining unseen question first, then start a fresh cycle for the remainder
        const firstPart = balancedShuffle(unseen);
        const firstIds = new Set(firstPart.map(it => getItemId(it, quizId)));
        const refillPool = balancedShuffle(seen).filter(it => !firstIds.has(getItemId(it, quizId)));
        const secondPart = refillPool.slice(0, count - firstPart.length);
        chosen = firstPart.concat(secondPart);
        // Reset seen flags for this pool subset so the new cycle tracks cleanly going forward
        window.ArcadeQuizEngine.resetSeen(quizId, list);
        cycled = true;
      } else {
        // Pool was completely exhausted -> reset this pool's seen state and start fresh cycle
        window.ArcadeQuizEngine.resetSeen(quizId, list);
        chosen = balancedShuffle(list).slice(0, count);
        cycled = true;
      }

      return { deck: chosen, unseenBefore, cycled };
    },

    submitNormalizedScore: (gameId, rawScore, correctCount, totalCount, meta) => {
      const cleanScore = Math.max(0, Math.round(Number(rawScore) || 0));
      const n = Math.max(1, Number(totalCount) || 20);
      const needsNorm = n > 20;
      const recordedScore = needsNorm ? Math.round(cleanScore * (20 / n)) : cleanScore;
      const label = needsNorm
        ? `${recordedScore} Pkt (20er-Norm · ${correctCount}/${n})`
        : `${cleanScore} Pkt (${correctCount}/${n})`;
      try {
        if (window.ArcadeQuizBoard) {
          window.ArcadeQuizBoard.submit(gameId, {
            score: recordedScore, correct: correctCount, total: n,
            seconds: Math.max(1, Math.round((Date.now() - roundStartedAt) / 1000))
          });
        }
      } catch (e) {}
      const isNewRecord = (window.ArcadeScores && typeof window.ArcadeScores.record === 'function')
        ? window.ArcadeScores.record(gameId, recordedScore, label, false, { meta: Object.assign({ rawScore: cleanScore, totalCount: n, correctCount }, meta || {}) })
        : false;
      return { isNewRecord, recordedScore, rawScore: cleanScore, normalized: needsNorm };
    },

    initMenuControls: ({
      quizId,
      getPool,
      onUpdate,
      lengths = [10, 20, 30, 'all'],
      defaultLen = 20,
      storageKey = DEFAULT_LEN_KEY,
      anchorId = 'time-mode-bar',
      showAllLabel = 'Alle'
    }) => {
      const anchor = document.getElementById(anchorId);
      if (!anchor) return { getLength: () => defaultLen, refresh: () => {} };

      let lenBar = document.getElementById('round-len-bar');
      if (!lenBar) {
        lenBar = document.createElement('div');
        lenBar.id = 'round-len-bar';
        lenBar.className = 'round-len-bar';
        anchor.insertAdjacentElement('afterend', lenBar);
      }

      let statusBar = document.getElementById('pool-status-bar');
      if (!statusBar) {
        statusBar = document.createElement('div');
        statusBar.id = 'pool-status-bar';
        statusBar.className = 'pool-status-bar';
        lenBar.insertAdjacentElement('afterend', statusBar);
      }

      let currentLen = window.ArcadeQuizEngine.getRoundLength(lengths, defaultLen, storageKey);

      function renderLenPills() {
        const pills = lengths.map(val => {
          const isAll = val === 'all';
          const label = isAll ? showAllLabel : (val === 20 ? '20 ★' : String(val));
          return `<button type="button" class="round-len-pill ${String(currentLen) === String(val) ? 'active' : ''}" data-len="${val}">${label}</button>`;
        }).join('');
        void pills;
        lenBar.innerHTML = `<span style="font-size:12px;color:var(--text-muted);font-weight:700;">Fragen/Runde: ${ROUND_SIZE}</span>`;
      }

      function renderStatus() {
        const pool = typeof getPool === 'function' ? getPool() : [];
        const stats = window.ArcadeQuizEngine.getSeenStats(quizId, pool);
        const effCount = window.ArcadeQuizEngine.resolveRoundCount(currentLen, stats.total, defaultLen);
        const normNote = effCount > 20 ? ' · Bestenliste: 20er-Wertung' : '';
        statusBar.innerHTML = `
          <span class="pool-status-text">
            📚 Pool: <strong>${stats.total}</strong> Fragen · ✨ Noch neu: <strong>${stats.unseen}</strong> · 🎯 Nächste Runde: <strong>${effCount}</strong>${normNote}
          </span>
          <button type="button" class="pool-reset-btn" id="btn-pool-reset" ${stats.seen === 0 ? 'disabled style="opacity:0.45;cursor:default;"' : ''}>🔄 Verlauf zurücksetzen (${stats.seen})</button>
        `;
      }

      lenBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.round-len-pill');
        if (!btn) return;
        const raw = btn.dataset.len;
        currentLen = raw === 'all' ? 'all' : (parseInt(raw, 10) || defaultLen);
        window.ArcadeQuizEngine.setRoundLength(currentLen, storageKey);
        if (window.ArcadeAudio) window.ArcadeAudio.click();
        renderLenPills();
        renderStatus();
        if (typeof onUpdate === 'function') onUpdate(currentLen);
      });

      statusBar.addEventListener('click', (e) => {
        const btn = e.target.closest('#btn-pool-reset');
        if (!btn || btn.disabled) return;
        const pool = typeof getPool === 'function' ? getPool() : [];
        window.ArcadeQuizEngine.resetSeen(quizId, pool);
        if (window.ArcadeAudio) window.ArcadeAudio.pop();
        renderStatus();
        if (typeof onUpdate === 'function') onUpdate(currentLen);
      });

      renderLenPills();
      renderStatus();

      return {
        getLength: () => currentLen,
        refresh: () => {
          renderLenPills();
          renderStatus();
        }
      };
    }
  };
})();
