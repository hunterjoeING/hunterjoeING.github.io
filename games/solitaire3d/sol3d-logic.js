// Pure Klondike Solitaire rules engine (1- or 3-card draw, seeded deals, unlimited undo, hints, auto-complete)

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

export class KlondikeEngine {
  constructor() {
    this.drawMode = 1;
    this.seed = 1;
    this.cards = [];
    this.stock = [];
    this.waste = [];
    this.foundations = [[], [], [], []];
    this.tableau = [[], [], [], [], [], [], []];
    this.score = 0;
    this.moves = 0;
    this.stockCycles = 0;
    this.foundationStreak = 0;
    this.won = false;
    this.history = [];
  }

  newGame({ drawMode = this.drawMode, seed = null } = {}) {
    this.drawMode = drawMode === 3 ? 3 : 1;
    this.seed = seed !== null ? (seed >>> 0) : ((Math.random() * 0xffffffff) >>> 0);

    // Create 52 cards (id 0..51)
    this.cards = [];
    let id = 0;
    for (let s = 0; s < 4; s++) {
      for (let r = 1; r <= 13; r++) {
        this.cards.push({
          id: id++,
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

    // Seeded Fisher-Yates shuffle
    const rng = mulberry32(this.seed);
    const deck = this.cards.map((c) => c.id);
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    this.stock = [];
    this.waste = [];
    this.foundations = [[], [], [], []];
    this.tableau = [[], [], [], [], [], [], []];

    let cursor = 0;
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row <= col; row++) {
        const cid = deck[cursor++];
        this.cards[cid].faceUp = row === col;
        this.tableau[col].push(cid);
      }
    }

    while (cursor < deck.length) {
      const cid = deck[cursor++];
      this.cards[cid].faceUp = false;
      this.stock.push(cid);
    }

    this.score = 0;
    this.moves = 0;
    this.stockCycles = 0;
    this.foundationStreak = 0;
    this.won = false;
    this.history = [];
  }

  _snapshot() {
    return {
      stock: this.stock.slice(),
      waste: this.waste.slice(),
      foundations: this.foundations.map((f) => f.slice()),
      tableau: this.tableau.map((t) => t.slice()),
      faceUps: this.cards.map((c) => c.faceUp),
      score: this.score,
      moves: this.moves,
      stockCycles: this.stockCycles,
      foundationStreak: this.foundationStreak,
      won: this.won
    };
  }

  _restore(snap) {
    this.stock = snap.stock.slice();
    this.waste = snap.waste.slice();
    this.foundations = snap.foundations.map((f) => f.slice());
    this.tableau = snap.tableau.map((t) => t.slice());
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].faceUp = !!snap.faceUps[i];
    }
    this.score = snap.score;
    this.moves = snap.moves;
    this.stockCycles = snap.stockCycles;
    this.foundationStreak = snap.foundationStreak;
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

  canMoveToFoundation(cardId, fIdx) {
    const card = this.cards[cardId];
    const pile = this.foundations[fIdx];
    if (!card || !pile) return false;
    if (pile.length === 0) return card.rank === 1;
    const top = this.cards[pile[pile.length - 1]];
    return top.suitIdx === card.suitIdx && card.rank === top.rank + 1;
  }

  canMoveToTableau(cardId, colIdx) {
    const card = this.cards[cardId];
    const pile = this.tableau[colIdx];
    if (!card || !pile) return false;
    if (pile.length === 0) return card.rank === 13;
    const top = this.cards[pile[pile.length - 1]];
    if (!top.faceUp) return false;
    return top.color !== card.color && card.rank === top.rank - 1;
  }

  getMovableStack(pileType, pileIdx, cardIdx) {
    if (this.won) return { valid: false, cards: [] };

    if (pileType === 'waste') {
      if (this.waste.length === 0) return { valid: false, cards: [] };
      const topIdx = this.waste.length - 1;
      if (cardIdx !== undefined && cardIdx !== topIdx) return { valid: false, cards: [] };
      return {
        valid: true,
        cards: [this.waste[topIdx]],
        source: { type: 'waste', idx: 0, startIndex: topIdx }
      };
    }

    if (pileType === 'foundation') {
      const f = this.foundations[pileIdx];
      if (!f || f.length === 0) return { valid: false, cards: [] };
      const topIdx = f.length - 1;
      if (cardIdx !== undefined && cardIdx !== topIdx) return { valid: false, cards: [] };
      return {
        valid: true,
        cards: [f[topIdx]],
        source: { type: 'foundation', idx: pileIdx, startIndex: topIdx }
      };
    }

    if (pileType === 'tableau') {
      const col = this.tableau[pileIdx];
      if (!col || col.length === 0) return { valid: false, cards: [] };
      const idx = cardIdx !== undefined ? cardIdx : col.length - 1;
      if (idx < 0 || idx >= col.length) return { valid: false, cards: [] };
      if (!this.cards[col[idx]].faceUp) return { valid: false, cards: [] };

      // Verify valid descending alternating sequence from idx to end
      for (let i = idx; i < col.length - 1; i++) {
        const cur = this.cards[col[i]];
        const nxt = this.cards[col[i + 1]];
        if (!nxt.faceUp || cur.color === nxt.color || cur.rank !== nxt.rank + 1) {
          return { valid: false, cards: [] };
        }
      }
      return {
        valid: true,
        cards: col.slice(idx),
        source: { type: 'tableau', idx: pileIdx, startIndex: idx }
      };
    }

    return { valid: false, cards: [] };
  }

  getValidDestinations(cards, source) {
    const out = { foundations: [], tableau: [] };
    if (!cards || cards.length === 0) return out;
    const leadId = cards[0];

    if (cards.length === 1) {
      for (let f = 0; f < 4; f++) {
        if (source.type === 'foundation' && source.idx === f) continue;
        if (this.canMoveToFoundation(leadId, f)) {
          out.foundations.push(f);
        }
      }
    }

    for (let c = 0; c < 7; c++) {
      if (source.type === 'tableau' && source.idx === c) continue;
      if (this.canMoveToTableau(leadId, c)) {
        out.tableau.push(c);
      }
    }
    return out;
  }

  executeMove(cards, source, target) {
    if (!cards || cards.length === 0) return { ok: false };
    const leadId = cards[0];

    // Validate destination
    if (target.type === 'foundation') {
      if (cards.length !== 1) return { ok: false };
      if (source.type === 'foundation' && source.idx === target.idx) return { ok: false };
      if (!this.canMoveToFoundation(leadId, target.idx)) return { ok: false };
    } else if (target.type === 'tableau') {
      if (source.type === 'tableau' && source.idx === target.idx) return { ok: false };
      if (!this.canMoveToTableau(leadId, target.idx)) return { ok: false };
    } else {
      return { ok: false };
    }

    this.history.push(this._snapshot());

    // Remove from source
    if (source.type === 'waste') {
      this.waste.pop();
    } else if (source.type === 'foundation') {
      this.foundations[source.idx].pop();
    } else if (source.type === 'tableau') {
      this.tableau[source.idx].splice(source.startIndex, cards.length);
    }

    // Add to target
    let toFoundation = false;
    if (target.type === 'foundation') {
      this.foundations[target.idx].push(leadId);
      toFoundation = true;
    } else {
      for (const cid of cards) {
        this.tableau[target.idx].push(cid);
      }
    }

    // Reveal newly exposed tableau card if needed
    let flippedCardId = null;
    if (source.type === 'tableau') {
      const srcCol = this.tableau[source.idx];
      if (srcCol.length > 0) {
        const exposedId = srcCol[srcCol.length - 1];
        if (!this.cards[exposedId].faceUp) {
          this.cards[exposedId].faceUp = true;
          flippedCardId = exposedId;
        }
      }
    }

    // Update score & streak
    if (toFoundation) {
      this.foundationStreak += 1;
      if (source.type !== 'foundation') {
        this.score += 10;
      }
    } else {
      this.foundationStreak = 0;
      if (source.type === 'waste' && target.type === 'tableau') {
        this.score += 5;
      } else if (source.type === 'foundation' && target.type === 'tableau') {
        this.score = Math.max(0, this.score - 15);
      }
    }
    if (flippedCardId !== null) {
      this.score += 5;
    }

    this.moves += 1;
    this.won = this.checkWon();

    return {
      ok: true,
      flippedCardId,
      toFoundation,
      foundationStreak: this.foundationStreak,
      won: this.won
    };
  }

  drawFromStock() {
    if (this.won) return { ok: false };
    if (this.stock.length === 0 && this.waste.length === 0) {
      return { ok: false, empty: true };
    }

    this.history.push(this._snapshot());
    this.foundationStreak = 0;

    if (this.stock.length === 0) {
      // Recycle waste back to stock face-down
      const recycledIds = [];
      while (this.waste.length > 0) {
        const cid = this.waste.pop();
        this.cards[cid].faceUp = false;
        this.stock.push(cid);
        recycledIds.push(cid);
      }
      this.stockCycles += 1;
      if (this.drawMode === 1 && this.stockCycles >= 1) {
        this.score = Math.max(0, this.score - 20);
      } else if (this.drawMode === 3 && this.stockCycles > 3) {
        this.score = Math.max(0, this.score - 20);
      }
      this.moves += 1;
      return { ok: true, recycled: true, cardIds: recycledIds };
    }

    const count = Math.min(this.drawMode, this.stock.length);
    const drawnIds = [];
    for (let i = 0; i < count; i++) {
      const cid = this.stock.pop();
      this.cards[cid].faceUp = true;
      this.waste.push(cid);
      drawnIds.push(cid);
    }
    this.moves += 1;
    return { ok: true, recycled: false, cardIds: drawnIds };
  }

  findSmartTarget(pileType, pileIdx, cardIdx) {
    const stack = this.getMovableStack(pileType, pileIdx, cardIdx);
    if (!stack.valid) return null;
    const dest = this.getValidDestinations(stack.cards, stack.source);

    // Prefer Foundation for single top cards (unless already on foundation)
    if (dest.foundations.length > 0 && stack.source.type !== 'foundation') {
      return {
        stack,
        target: { type: 'foundation', idx: dest.foundations[0] }
      };
    }

    // Otherwise prefer non-empty Tableau targets, or empty Tableau only if King isn't already at row 0
    if (dest.tableau.length > 0) {
      const nonEmpty = dest.tableau.filter((c) => this.tableau[c].length > 0);
      if (nonEmpty.length > 0) {
        return {
          stack,
          target: { type: 'tableau', idx: nonEmpty[0] }
        };
      }
      const isRootKing =
        stack.source.type === 'tableau' &&
        stack.source.startIndex === 0 &&
        this.cards[stack.cards[0]].rank === 13;
      if (!isRootKing) {
        return {
          stack,
          target: { type: 'tableau', idx: dest.tableau[0] }
        };
      }
    }

    return null;
  }

  findHint() {
    if (this.won) return null;

    // 1. Ace or 2 directly to Foundation
    for (let c = 0; c < 7; c++) {
      const col = this.tableau[c];
      if (col.length === 0) continue;
      const topId = col[col.length - 1];
      if (this.cards[topId].rank <= 2) {
        for (let f = 0; f < 4; f++) {
          if (this.canMoveToFoundation(topId, f)) {
            return {
              action: 'move',
              cards: [topId],
              source: { type: 'tableau', idx: c, startIndex: col.length - 1 },
              target: { type: 'foundation', idx: f }
            };
          }
        }
      }
    }
    if (this.waste.length > 0) {
      const wId = this.waste[this.waste.length - 1];
      if (this.cards[wId].rank <= 2) {
        for (let f = 0; f < 4; f++) {
          if (this.canMoveToFoundation(wId, f)) {
            return {
              action: 'move',
              cards: [wId],
              source: { type: 'waste', idx: 0, startIndex: this.waste.length - 1 },
              target: { type: 'foundation', idx: f }
            };
          }
        }
      }
    }

    // 2. Tableau move that uncovers a face-down card or moves a complete column (only useful if non-King or freeing space for a King)
    for (let c = 0; c < 7; c++) {
      const col = this.tableau[c];
      const firstFaceUp = col.findIndex((id) => this.cards[id].faceUp);
      if (firstFaceUp === -1) continue;
      const cards = col.slice(firstFaceUp);
      const leadId = cards[0];
      const lead = this.cards[leadId];
      const uncoversFaceDown = firstFaceUp > 0;
      const isRootKing = firstFaceUp === 0 && lead.rank === 13;

      for (let dst = 0; dst < 7; dst++) {
        if (dst === c) continue;
        if (!this.canMoveToTableau(leadId, dst)) continue;
        const dstEmpty = this.tableau[dst].length === 0;
        if (isRootKing && dstEmpty) continue;
        if (uncoversFaceDown || !dstEmpty) {
          // Only suggest moving whole face-up run to non-empty target if it exposes a face-down card or frees column for an available King
          if (!uncoversFaceDown && firstFaceUp === 0) {
            const hasWaitingKing =
              (this.waste.length > 0 && this.cards[this.waste[this.waste.length - 1]].rank === 13) ||
              this.tableau.some((other, oi) => {
                if (oi === c) return false;
                const fu = other.findIndex((id) => this.cards[id].faceUp);
                return fu > 0 && this.cards[other[fu]].rank === 13;
              });
            if (!hasWaitingKing) continue;
          }
          return {
            action: 'move',
            cards,
            source: { type: 'tableau', idx: c, startIndex: firstFaceUp },
            target: { type: 'tableau', idx: dst }
          };
        }
      }
    }

    // 3. Any card to Foundation (Tableau top or Waste top)
    for (let c = 0; c < 7; c++) {
      const col = this.tableau[c];
      if (col.length === 0) continue;
      const topId = col[col.length - 1];
      for (let f = 0; f < 4; f++) {
        if (this.canMoveToFoundation(topId, f)) {
          return {
            action: 'move',
            cards: [topId],
            source: { type: 'tableau', idx: c, startIndex: col.length - 1 },
            target: { type: 'foundation', idx: f }
          };
        }
      }
    }
    if (this.waste.length > 0) {
      const wId = this.waste[this.waste.length - 1];
      for (let f = 0; f < 4; f++) {
        if (this.canMoveToFoundation(wId, f)) {
          return {
            action: 'move',
            cards: [wId],
            source: { type: 'waste', idx: 0, startIndex: this.waste.length - 1 },
            target: { type: 'foundation', idx: f }
          };
        }
      }

      // 4. Waste to Tableau
      for (let dst = 0; dst < 7; dst++) {
        if (this.canMoveToTableau(wId, dst)) {
          return {
            action: 'move',
            cards: [wId],
            source: { type: 'waste', idx: 0, startIndex: this.waste.length - 1 },
            target: { type: 'tableau', idx: dst }
          };
        }
      }
    }

    // 5. Draw from Stock / Recycle Waste
    if (this.stock.length > 0 || this.waste.length > 0) {
      return { action: 'draw' };
    }

    return null;
  }

  areAllTableauFaceUp() {
    for (let c = 0; c < 7; c++) {
      const col = this.tableau[c];
      for (let r = 0; r < col.length; r++) {
        if (!this.cards[col[r]].faceUp) return false;
      }
    }
    return true;
  }

  canAutoComplete() {
    if (this.won) return false;
    const totalFound = this.foundations.reduce((sum, f) => sum + f.length, 0);
    if (totalFound >= 52) return false;
    if (!this.areAllTableauFaceUp()) return false;
    return this.drawMode === 1 || (this.stock.length === 0 && this.waste.length === 0);
  }

  stepAutoComplete() {
    if (!this.canAutoComplete()) return { done: true };

    // Always prefer lowest-rank eligible top card to Foundation so we never block needed moves
    let best = null;
    for (let c = 0; c < 7; c++) {
      const col = this.tableau[c];
      if (col.length === 0) continue;
      const cid = col[col.length - 1];
      const card = this.cards[cid];
      for (let f = 0; f < 4; f++) {
        if (this.canMoveToFoundation(cid, f)) {
          if (!best || card.rank < best.rank) {
            best = {
              rank: card.rank,
              cards: [cid],
              source: { type: 'tableau', idx: c, startIndex: col.length - 1 },
              target: { type: 'foundation', idx: f }
            };
          }
          break;
        }
      }
    }

    if (this.waste.length > 0) {
      const cid = this.waste[this.waste.length - 1];
      const card = this.cards[cid];
      for (let f = 0; f < 4; f++) {
        if (this.canMoveToFoundation(cid, f)) {
          if (!best || card.rank < best.rank) {
            best = {
              rank: card.rank,
              cards: [cid],
              source: { type: 'waste', idx: 0, startIndex: this.waste.length - 1 },
              target: { type: 'foundation', idx: f }
            };
          }
          break;
        }
      }
    }

    if (best) {
      const res = this.executeMove(best.cards, best.source, best.target);
      return {
        done: false,
        kind: 'move',
        cardId: best.cards[0],
        source: best.source,
        target: best.target,
        res
      };
    }

    // In drawMode === 1, cycle through stock/waste to surface remaining foundation cards
    if (this.drawMode === 1 && (this.stock.length > 0 || this.waste.length > 0)) {
      const drawRes = this.drawFromStock();
      if (drawRes.ok) {
        return { done: false, kind: 'draw', drawRes };
      }
    }

    return { done: true };
  }

  checkWon() {
    return this.foundations.every((f) => f.length === 13);
  }
}
