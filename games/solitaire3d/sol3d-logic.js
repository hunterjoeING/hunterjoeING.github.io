// Pure 4-Suit Spider Solitaire rules engine (2 decks = 104 cards, 10 columns, 5x10 stock, 8 completed slots, seeded deals, unlimited undo, smart hints)

export const SUITS = [
  { key: 'spades', sym: '♠', name: 'Pik', color: 'black' },
  { key: 'hearts', sym: '♥', name: 'Herz', color: 'red' },
  { key: 'clubs', sym: '♣', name: 'Kreuz', color: 'black' },
  { key: 'diamonds', sym: '♦', name: 'Karo', color: 'red' }
];

export const RANK_LABELS = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class SpiderEngine {
  constructor() {
    this.seed = 1;
    this.cards = [];
    this.stock = [];
    this.foundations = Array.from({ length: 8 }, () => []);
    this.tableau = Array.from({ length: 10 }, () => []);
    this.score = 500;
    this.moves = 0;
    this.won = false;
    this.history = [];
  }

  newGame({ seed = null } = {}) {
    this.seed = seed !== null ? (seed >>> 0) : ((Math.random() * 0xffffffff) >>> 0);

    // Create 2 complete decks = 104 cards (id 0..103)
    this.cards = [];
    let id = 0;
    for (let copy = 0; copy < 2; copy++) {
      for (let s = 0; s < 4; s++) {
        for (let r = 1; r <= 13; r++) {
          this.cards.push({
            id: id++,
            copy,
            faceIndex: s * 13 + (r - 1),
            suitIdx: s,
            suit: SUITS[s].key,
            sym: SUITS[s].sym,
            color: SUITS[s].color,
            rank: r,
            rankLabel: RANK_LABELS[r],
            faceUp: false
          });
        }
      }
    }

    // Seeded Fisher-Yates shuffle
    const rng = mulberry32(this.seed);
    const deck = this.cards.map((c) => c.id);
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    this.stock = [];
    this.foundations = Array.from({ length: 8 }, () => []);
    this.tableau = Array.from({ length: 10 }, () => []);

    // Columns 0..3 get 6 cards, columns 4..9 get 5 cards (54 total); only top card is faceUp
    let cursor = 0;
    for (let col = 0; col < 10; col++) {
      const count = col < 4 ? 6 : 5;
      for (let row = 0; row < count; row++) {
        const cid = deck[cursor++];
        this.cards[cid].faceUp = row === count - 1;
        this.tableau[col].push(cid);
      }
    }

    // Remaining 50 cards go into Stock (5 deals of 10 cards)
    while (cursor < deck.length) {
      const cid = deck[cursor++];
      this.cards[cid].faceUp = false;
      this.stock.push(cid);
    }

    this.score = 500;
    this.moves = 0;
    this.won = false;
    this.history = [];
  }

  _snapshot() {
    return {
      stock: this.stock.slice(),
      foundations: this.foundations.map((f) => f.slice()),
      tableau: this.tableau.map((t) => t.slice()),
      faceUps: this.cards.map((c) => c.faceUp),
      score: this.score,
      moves: this.moves,
      won: this.won
    };
  }

  _restore(snap) {
    this.stock = snap.stock.slice();
    this.foundations = snap.foundations.map((f) => f.slice());
    this.tableau = snap.tableau.map((t) => t.slice());
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].faceUp = !!snap.faceUps[i];
    }
    this.score = snap.score;
    this.moves = snap.moves;
    this.won = snap.won;
  }

  canUndo() {
    return this.history.length > 0 && !this.won;
  }

  undo() {
    if (!this.canUndo()) return { ok: false };
    const snap = this.history.pop();
    this._restore(snap);
    return { ok: true };
  }

  getCard(cardId) {
    return this.cards[cardId];
  }

  getStockDealsRemaining() {
    return Math.ceil(this.stock.length / 10);
  }

  getCompletedCount() {
    let count = 0;
    for (let i = 0; i < this.foundations.length; i++) {
      if (this.foundations[i].length === 13) count++;
    }
    return count;
  }

  canMoveToTableau(cardId, colIdx) {
    const card = this.cards[cardId];
    const pile = this.tableau[colIdx];
    if (!card || !pile) return false;
    // Empty column accepts any single card or valid same-suit sequence
    if (pile.length === 0) return true;
    const top = this.cards[pile[pile.length - 1]];
    if (!top.faceUp) return false;
    // Any suit/color allowed as long as rank is 1 lower than target top card
    return card.rank === top.rank - 1;
  }

  getMovableStack(pileType, pileIdx, cardIdx) {
    if (this.won || pileType !== 'tableau') {
      return { valid: false, cards: [] };
    }

    const col = this.tableau[pileIdx];
    if (!col || col.length === 0) return { valid: false, cards: [] };

    const idx = cardIdx !== undefined ? cardIdx : col.length - 1;
    if (idx < 0 || idx >= col.length) return { valid: false, cards: [] };
    if (!this.cards[col[idx]].faceUp) return { valid: false, cards: [] };

    // Multi-card moves require a gapless descending sequence of the SAME SUIT
    for (let i = idx; i < col.length - 1; i++) {
      const cur = this.cards[col[i]];
      const nxt = this.cards[col[i + 1]];
      if (!nxt.faceUp || cur.suitIdx !== nxt.suitIdx || cur.rank !== nxt.rank + 1) {
        return { valid: false, cards: [], blockedReason: 'mixed_or_gap' };
      }
    }

    return {
      valid: true,
      cards: col.slice(idx),
      source: { type: 'tableau', idx: pileIdx, startIndex: idx }
    };
  }

  getValidDestinations(cards, source) {
    const out = { tableau: [] };
    if (!cards || cards.length === 0) return out;
    const leadId = cards[0];

    for (let c = 0; c < 10; c++) {
      if (source && source.type === 'tableau' && source.idx === c) continue;
      if (this.canMoveToTableau(leadId, c)) {
        out.tableau.push(c);
      }
    }
    return out;
  }

  _clearSequenceFromColumn(colIdx) {
    const col = this.tableau[colIdx];
    if (!col || col.length < 13) return null;

    const start = col.length - 13;
    const firstCard = this.cards[col[start]];
    if (!firstCard.faceUp || firstCard.rank !== 13) return null;

    const targetSuit = firstCard.suitIdx;
    for (let offset = 0; offset < 13; offset++) {
      const card = this.cards[col[start + offset]];
      if (!card.faceUp || card.suitIdx !== targetSuit || card.rank !== 13 - offset) {
        return null;
      }
    }

    const fIdx = this.foundations.findIndex((f) => f.length === 0);
    if (fIdx === -1) return null;

    // Remove K..A from tableau and stack A->K into foundation slot so K sits proudly on top
    const seq = col.splice(start, 13);
    const stackedForFoundation = seq.slice().reverse();
    this.foundations[fIdx] = stackedForFoundation;

    let flippedCardId = null;
    if (col.length > 0) {
      const exposedId = col[col.length - 1];
      if (!this.cards[exposedId].faceUp) {
        this.cards[exposedId].faceUp = true;
        flippedCardId = exposedId;
      }
    }

    return {
      foundationIdx: fIdx,
      fromCol: colIdx,
      suitIdx: targetSuit,
      cards: stackedForFoundation,
      flippedCardId
    };
  }

  executeMove(cards, source, target) {
    if (this.won || !cards || cards.length === 0) return { ok: false };
    if (!source || source.type !== 'tableau' || !target || target.type !== 'tableau') {
      return { ok: false };
    }
    if (source.idx === target.idx) return { ok: false };

    const checkStack = this.getMovableStack('tableau', source.idx, source.startIndex);
    if (!checkStack.valid || checkStack.cards.length !== cards.length) {
      return { ok: false };
    }
    const leadId = cards[0];
    if (!this.canMoveToTableau(leadId, target.idx)) return { ok: false };

    this.history.push(this._snapshot());

    // Move stack
    this.tableau[source.idx].splice(source.startIndex, cards.length);
    for (const cid of cards) {
      this.tableau[target.idx].push(cid);
    }

    // Reveal newly exposed card on source column if face-down
    let flippedCardId = null;
    const srcCol = this.tableau[source.idx];
    if (srcCol.length > 0) {
      const exposedId = srcCol[srcCol.length - 1];
      if (!this.cards[exposedId].faceUp) {
        this.cards[exposedId].faceUp = true;
        flippedCardId = exposedId;
      }
    }

    // Check if target column now ends in a complete K..A same-suit run
    const clearedSequences = [];
    const cleared = this._clearSequenceFromColumn(target.idx);
    if (cleared) {
      clearedSequences.push(cleared);
    }

    this.moves += 1;
    this.score = Math.max(0, this.score - 1 + clearedSequences.length * 100);
    this.won = this.checkWon();

    return {
      ok: true,
      flippedCardId,
      clearedSequences,
      won: this.won
    };
  }

  canDealFromStock() {
    if (this.won) return { ok: false, reason: 'won' };
    if (this.stock.length === 0) return { ok: false, reason: 'empty' };

    const emptyCols = [];
    for (let c = 0; c < 10; c++) {
      if (this.tableau[c].length === 0) emptyCols.push(c);
    }
    if (emptyCols.length > 0) {
      return { ok: false, reason: 'empty_column', emptyCols };
    }
    return { ok: true };
  }

  drawFromStock() {
    const check = this.canDealFromStock();
    if (!check.ok) return check;

    this.history.push(this._snapshot());

    const dealtCards = [];
    const count = Math.min(10, this.stock.length);
    for (let c = 0; c < count; c++) {
      const cid = this.stock.pop();
      this.cards[cid].faceUp = true;
      this.tableau[c].push(cid);
      dealtCards.push({ cardId: cid, colIdx: c });
    }

    // Dealing can finish a K..A sequence on any column
    const clearedSequences = [];
    for (let c = 0; c < 10; c++) {
      const cleared = this._clearSequenceFromColumn(c);
      if (cleared) clearedSequences.push(cleared);
    }

    this.moves += 1;
    this.score = Math.max(0, this.score - 1 + clearedSequences.length * 100);
    this.won = this.checkWon();

    return {
      ok: true,
      dealtCards,
      clearedSequences,
      won: this.won
    };
  }

  findSmartTarget(pileType, pileIdx, cardIdx) {
    const stack = this.getMovableStack(pileType, pileIdx, cardIdx);
    if (!stack.valid) return null;

    const lead = this.cards[stack.cards[0]];
    const dest = this.getValidDestinations(stack.cards, stack.source);
    if (dest.tableau.length === 0) return null;

    // 1. Prefer same-suit non-empty column
    const sameSuitCols = dest.tableau.filter((c) => {
      const col = this.tableau[c];
      return col.length > 0 && this.cards[col[col.length - 1]].suitIdx === lead.suitIdx;
    });
    if (sameSuitCols.length > 0) {
      return { stack, target: { type: 'tableau', idx: sameSuitCols[0] } };
    }

    // 2. Otherwise any non-empty column of rank + 1
    const otherCols = dest.tableau.filter((c) => this.tableau[c].length > 0);
    if (otherCols.length > 0) {
      return { stack, target: { type: 'tableau', idx: otherCols[0] } };
    }

    // 3. Empty column (skip pointless move of a stack already sitting at row 0)
    if (stack.source.startIndex > 0) {
      return { stack, target: { type: 'tableau', idx: dest.tableau[0] } };
    }

    return null;
  }

  findHint() {
    if (this.won) return null;

    const candidates = [];

    for (let c = 0; c < 10; c++) {
      const col = this.tableau[c];
      if (col.length === 0) continue;

      // Find the deepest face-up index that starts a valid same-suit run to the end
      let runStart = col.length - 1;
      while (runStart > 0) {
        const cur = this.cards[col[runStart - 1]];
        const nxt = this.cards[col[runStart]];
        if (!cur.faceUp || cur.suitIdx !== nxt.suitIdx || cur.rank !== nxt.rank + 1) break;
        runStart--;
      }

      const stack = this.getMovableStack('tableau', c, runStart);
      if (!stack.valid) continue;

      const lead = this.cards[stack.cards[0]];
      const uncoversFaceDown = runStart > 0 && !this.cards[col[runStart - 1]].faceUp;
      const breaksDifferentSuitJunction =
        runStart > 0 && this.cards[col[runStart - 1]].faceUp &&
        (this.cards[col[runStart - 1]].suitIdx !== lead.suitIdx ||
         this.cards[col[runStart - 1]].rank !== lead.rank + 1);
      const freesColumn = runStart === 0;

      const dests = this.getValidDestinations(stack.cards, stack.source);
      for (const dst of dests.tableau) {
        const dstCol = this.tableau[dst];
        const dstEmpty = dstCol.length === 0;

        // Never suggest moving a root stack to an empty column
        if (dstEmpty && freesColumn) continue;

        const sameSuitTarget = !dstEmpty && this.cards[dstCol[dstCol.length - 1]].suitIdx === lead.suitIdx;

        // Avoid uselessly moving a card between two identical non-same-suit ranks without exposing anything
        if (!sameSuitTarget && !uncoversFaceDown && !breaksDifferentSuitJunction && !dstEmpty) {
          continue;
        }
        // Avoid breaking an already ordered junction onto an empty column unless it reveals a face-down card or unlocks a same-suit merge
        if (dstEmpty && !uncoversFaceDown && !breaksDifferentSuitJunction) {
          continue;
        }

        let priority = 0;
        if (sameSuitTarget) priority += 100;
        if (uncoversFaceDown) priority += 60;
        if (breaksDifferentSuitJunction && !dstEmpty) priority += 30;
        if (freesColumn && sameSuitTarget) priority += 25;
        if (!dstEmpty) priority += 10;

        candidates.push({
          priority,
          hint: {
            action: 'move',
            cards: stack.cards,
            source: stack.source,
            target: { type: 'tableau', idx: dst }
          }
        });
      }
    }

    if (candidates.length > 0) {
      candidates.sort((a, b) => b.priority - a.priority);
      return candidates[0].hint;
    }

    const stockCheck = this.canDealFromStock();
    if (stockCheck.ok) {
      return { action: 'draw' };
    }

    return null;
  }

  checkWon() {
    return this.foundations.every((f) => f.length === 13);
  }
}
