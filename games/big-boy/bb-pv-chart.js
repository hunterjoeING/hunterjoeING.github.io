// Live p-V Indicator Diagram Renderer (SVG) for UP Big Boy 603 mm × 813 mm Cylinder
// Color-codes Admission, Expansion, Exhaust & Compression phases, moves live piston marker,
// and overlays optional Reference Ghost Curves (75% Anfahrfüllung vs. 25% Marschfüllung).

import { generatePVLoop } from './bb-physics.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

const PHASE_COLORS = {
  admission: '#ef4444',    // Deep hot red (live steam 395 °C, 20.7 bar)
  expansion: '#f59e0b',    // Warm amber/orange (expanding work)
  exhaust: '#94a3b8',      // Exhaust pale grey (~1.35 bar)
  compression: '#38bdf8'   // Compression cushion cyan-blue
};

const PHASE_LABELS = {
  admission: 'Füllung (Frischdampf)',
  expansion: 'Expansion (Arbeit)',
  exhaust: 'Auslass (Blasrohr)',
  compression: 'Kompression'
};

function el(tag, attrs = {}) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

export class PVIndicatorChart {
  constructor(svgEl) {
    this.svg = svgEl;
    this.w = 320;
    this.h = 164;
    this.pad = { left: 36, right: 12, top: 14, bottom: 26 };
    this.showGhost = true;
    this._lastCutoffKey = '';
    this._buildStatic();
  }

  _x(vNorm) {
    const plotW = this.w - this.pad.left - this.pad.right;
    return this.pad.left + Math.max(0, Math.min(1, vNorm)) * plotW;
  }

  _y(pBar) {
    const plotH = this.h - this.pad.top - this.pad.bottom;
    const pClamped = Math.max(0, Math.min(22, pBar));
    return this.pad.top + plotH * (1 - pClamped / 22);
  }

  _buildStatic() {
    this.svg.innerHTML = '';

    // Grid & axes
    const grid = el('g', { class: 'bb-pv-grid' });
    for (const pTick of [0, 5, 10, 15, 20.7]) {
      const y = this._y(pTick);
      grid.appendChild(el('line', {
        x1: this.pad.left,
        x2: this.w - this.pad.right,
        y1: y.toFixed(1),
        y2: y.toFixed(1),
        stroke: pTick === 20.7 ? 'rgba(239,68,68,0.42)' : 'currentColor',
        'stroke-opacity': pTick === 20.7 ? '1' : '0.12',
        'stroke-dasharray': pTick === 20.7 ? '3 3' : ''
      }));
      const txt = el('text', {
        x: this.pad.left - 5,
        y: (y + 3).toFixed(1),
        'text-anchor': 'end',
        'font-size': '9',
        fill: pTick === 20.7 ? '#ef4444' : 'currentColor',
        opacity: pTick === 20.7 ? '0.95' : '0.62'
      });
      txt.textContent = pTick === 20.7 ? '20,7' : String(pTick);
      grid.appendChild(txt);
    }

    for (const vTick of [0, 0.25, 0.5, 0.75, 1.0]) {
      const x = this._x(vTick);
      grid.appendChild(el('line', {
        x1: x.toFixed(1),
        x2: x.toFixed(1),
        y1: this.pad.top,
        y2: this.h - this.pad.bottom,
        stroke: 'currentColor',
        'stroke-opacity': '0.10'
      }));
      const txt = el('text', {
        x: x.toFixed(1),
        y: this.h - 10,
        'text-anchor': 'middle',
        'font-size': '9',
        fill: 'currentColor',
        opacity: '0.62'
      });
      txt.textContent = `${Math.round(vTick * 100)}%`;
      grid.appendChild(txt);
    }

    // Axis titles
    const yLabel = el('text', {
      x: 8,
      y: this.pad.top + 2,
      'font-size': '8.5',
      'font-weight': '600',
      fill: 'currentColor',
      opacity: '0.68'
    });
    yLabel.textContent = 'p (bar)';
    grid.appendChild(yLabel);

    const xLabel = el('text', {
      x: this.w - this.pad.right,
      y: this.h - 1,
      'text-anchor': 'end',
      'font-size': '8.5',
      'font-weight': '600',
      fill: 'currentColor',
      opacity: '0.65'
    });
    xLabel.textContent = 'Kolbenhub V (Ø 603 × 813 mm)';
    grid.appendChild(xLabel);
    this.svg.appendChild(grid);

    // Ghost reference curves group (75% vs 25% cut-off)
    this.ghostGroup = el('g', { class: 'bb-pv-ghost' });
    this.ghost75Path = el('path', {
      fill: 'none',
      stroke: 'rgba(239,68,68,0.30)',
      'stroke-width': '1.25',
      'stroke-dasharray': '4 3'
    });
    this.ghost25Path = el('path', {
      fill: 'none',
      stroke: 'rgba(14,165,233,0.42)',
      'stroke-width': '1.25',
      'stroke-dasharray': '2 2.5'
    });
    this.ghostGroup.appendChild(this.ghost75Path);
    this.ghostGroup.appendChild(this.ghost25Path);
    this.svg.appendChild(this.ghostGroup);

    // Shaded work area under active loop
    this.workFill = el('path', {
      fill: 'rgba(245, 158, 11, 0.14)',
      stroke: 'none'
    });
    this.svg.appendChild(this.workFill);

    // Phase-colored active loop segments
    this.segmentsGroup = el('g');
    this.svg.appendChild(this.segmentsGroup);

    // Live piston indicator marker + halo
    this.markerHalo = el('circle', {
      r: '7.5',
      fill: 'rgba(239,68,68,0.28)'
    });
    this.markerDot = el('circle', {
      r: '4.2',
      fill: '#ef4444',
      stroke: '#ffffff',
      'stroke-width': '1.5'
    });
    this.svg.appendChild(this.markerHalo);
    this.svg.appendChild(this.markerDot);

    // Phase status pill inside top-right of chart
    this.phaseLabel = el('text', {
      x: this.w - this.pad.right - 2,
      y: this.pad.top + 9,
      'text-anchor': 'end',
      'font-size': '9.5',
      'font-weight': '700',
      fill: '#f59e0b'
    });
    this.svg.appendChild(this.phaseLabel);

    this._renderGhostCurves(20.4);
  }

  _pointsToD(points, close = true) {
    if (!points.length) return '';
    let d = `M ${this._x(points[0].v).toFixed(1)} ${this._y(points[0].p).toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${this._x(points[i].v).toFixed(1)} ${this._y(points[i].p).toFixed(1)}`;
    }
    return close ? d + ' Z' : d;
  }

  _renderGhostCurves(pRef) {
    const g75 = generatePVLoop(0.75, pRef, 72);
    const g25 = generatePVLoop(0.25, pRef, 72);
    this.ghost75Path.setAttribute('d', this._pointsToD(g75.points));
    this.ghost25Path.setAttribute('d', this._pointsToD(g25.points));
  }

  setShowGhost(enabled) {
    this.showGhost = enabled;
    this.ghostGroup.style.display = enabled ? '' : 'none';
  }

  update(cutoff, steamChestPressureBar, activeChamberState) {
    const key = `${cutoff.toFixed(2)}|${steamChestPressureBar.toFixed(1)}`;
    if (key !== this._lastCutoffKey) {
      this._lastCutoffKey = key;
      const loop = generatePVLoop(cutoff, steamChestPressureBar, 88);
      this.workFill.setAttribute('d', this._pointsToD(loop.points, true));

      // Draw phase-colored polyline segments cleanly
      this.segmentsGroup.innerHTML = '';
      let segStart = 0;
      for (let i = 1; i <= loop.points.length; i++) {
        const ended = i === loop.points.length || loop.points[i].phase !== loop.points[segStart].phase;
        if (ended) {
          const slice = loop.points.slice(segStart, Math.min(i + 1, loop.points.length));
          const phase = loop.points[segStart].phase;
          this.segmentsGroup.appendChild(el('path', {
            d: this._pointsToD(slice, false),
            fill: 'none',
            stroke: PHASE_COLORS[phase] || '#f59e0b',
            'stroke-width': '2.3',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
          }));
          segStart = i;
        }
      }
    }

    // Update live synchronized piston marker
    const mx = this._x(activeChamberState.volumeNorm);
    const my = this._y(activeChamberState.pressureBar);
    const col = PHASE_COLORS[activeChamberState.phase] || '#f59e0b';
    this.markerHalo.setAttribute('cx', mx.toFixed(1));
    this.markerHalo.setAttribute('cy', my.toFixed(1));
    this.markerHalo.setAttribute('fill', col);
    this.markerHalo.setAttribute('fill-opacity', '0.26');
    this.markerDot.setAttribute('cx', mx.toFixed(1));
    this.markerDot.setAttribute('cy', my.toFixed(1));
    this.markerDot.setAttribute('fill', col);

    this.phaseLabel.setAttribute('fill', col);
    this.phaseLabel.textContent = PHASE_LABELS[activeChamberState.phase] || '';
  }
}
