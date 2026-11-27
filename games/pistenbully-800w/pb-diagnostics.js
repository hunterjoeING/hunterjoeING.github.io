// Switchable 3-View Live SVG Diagnostics Renderer for PistenBully 800 W:
//   1. Hangphysik & Kräftediagramm (Force Parallelogram + Slip Threshold)
//   2. Hydraulik & Leistungsverteilung (400 kW Split + 450 bar Pressure Bars)
//   3. Bodendruck-Vergleich (65 g/cm² PistenBully vs. 250 Skischuh vs. 2.500 PKW)

import { PB_SPECS } from './specs.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

function el(tag, attrs = {}, text = '') {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) {
    node.setAttribute(k, String(v));
  }
  if (text) node.textContent = text;
  return node;
}

function fmt(n, d = 0) {
  return Number(n).toLocaleString('de-DE', {
    minimumFractionDigits: d,
    maximumFractionDigits: d
  });
}

export class PistenBullyDiagnostics {
  constructor(svgElement) {
    this.svg = svgElement;
    this.mode = 'slope'; // 'slope' | 'hydraulics' | 'pressure'
  }

  setMode(mode) {
    if (mode === 'slope' || mode === 'hydraulics' || mode === 'pressure') {
      this.mode = mode;
    }
  }

  update(telemetry) {
    if (!this.svg || !telemetry) return;
    while (this.svg.firstChild) this.svg.removeChild(this.svg.firstChild);

    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    const colors = {
      bg: dark ? '#0b1220' : '#f8fafc',
      grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(15,23,42,0.10)',
      text: dark ? '#e2e8f0' : '#0f172a',
      muted: dark ? '#94a3b8' : '#475569',
      trackBg: dark ? 'rgba(30,41,59,0.9)' : 'rgba(226,232,240,0.9)'
    };

    // Background frame
    this.svg.appendChild(el('rect', {
      x: 0, y: 0, width: 320, height: 174, rx: 8,
      fill: colors.bg
    }));

    if (this.mode === 'slope') {
      this.renderSlopeForces(telemetry, colors);
    } else if (this.mode === 'hydraulics') {
      this.renderHydraulics(telemetry, colors);
    } else {
      this.renderGroundPressure(telemetry, colors);
    }
  }

  // 1. Live Steep-Slope Force Parallelogram & Slip/Traction Bar
  renderSlopeForces(t, c) {
    const cx = 86, cy = 84;
    const rad = t.slopeRad;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    // Draw tilted snow slope line
    const x1 = cx - cos * 68, y1 = cy + sin * 68;
    const x2 = cx + cos * 74, y2 = cy - sin * 74;
    this.svg.appendChild(el('line', {
      x1, y1, x2, y2, stroke: '#38bdf8', 'stroke-width': 2.5, 'stroke-linecap': 'round'
    }));

    // Horizontal reference dashed line + angle arc
    this.svg.appendChild(el('line', {
      x1: cx - 55, y1: cy + 28, x2: cx + 65, y2: cy + 28,
      stroke: c.grid, 'stroke-width': 1, 'stroke-dasharray': '3 3'
    }));
    this.svg.appendChild(el('text', {
      x: 12, y: 18, fill: c.text, 'font-size': 10.5, 'font-weight': 700
    }, `Hang ${fmt(t.slopeDeg, 0)}° (${fmt(t.slopePercent, 0)} %)`));

    // Vector scale: 137 kN -> 54 px
    const sc = 54 / Math.max(100, t.weightKN);
    const fgLen = t.weightKN * sc;
    const fhLen = t.downhillKN * sc;
    const fnLen = t.normalKN * sc;
    const fwLen = t.winchForceKN * sc * 1.15;

    // F_G straight down
    const drawVec = (ox, oy, dx, dy, color, label, lx, ly) => {
      if (Math.hypot(dx, dy) < 2.5) return;
      this.svg.appendChild(el('line', {
        x1: ox, y1: oy, x2: ox + dx, y2: oy + dy,
        stroke: color, 'stroke-width': 2.6, 'stroke-linecap': 'round'
      }));
      this.svg.appendChild(el('circle', { cx: ox + dx, cy: oy + dy, r: 2.6, fill: color }));
      if (label) {
        this.svg.appendChild(el('text', {
          x: lx, y: ly, fill: color, 'font-size': 9.5, 'font-weight': 700
        }, label));
      }
    };

    // Dashed parallelogram completion lines
    const fnEndX = cx + sin * fnLen;
    const fnEndY = cy + cos * fnLen;
    const fhEndX = cx - cos * fhLen;
    const fhEndY = cy + sin * fhLen;
    this.svg.appendChild(el('line', {
      x1: fnEndX, y1: fnEndY, x2: cx, y2: cy + fgLen,
      stroke: c.grid, 'stroke-dasharray': '2 2', 'stroke-width': 1
    }));
    this.svg.appendChild(el('line', {
      x1: fhEndX, y1: fhEndY, x2: cx, y2: cy + fgLen,
      stroke: c.grid, 'stroke-dasharray': '2 2', 'stroke-width': 1
    }));

    drawVec(cx, cy, 0, fgLen, '#94a3b8', 'FG', cx - 16, cy + fgLen + 4);
    drawVec(cx, cy, sin * fnLen, cos * fnLen, '#38bdf8', 'FN', fnEndX + 5, fnEndY + 4);
    drawVec(cx, cy, -cos * fhLen, sin * fhLen, '#ef4444', 'FH', fhEndX - 18, fhEndY + 2);
    drawVec(cx, cy, cos * fwLen, -sin * fwLen, '#facc15', 'FW', cx + cos * fwLen + 4, cy - sin * fwLen);

    // Center dot (PistenBully COM)
    this.svg.appendChild(el('circle', { cx, cy, r: 4, fill: '#dc2626', stroke: '#ffffff', 'stroke-width': 1.2 }));

    // Right side: Live Force Readouts & Snow-Traction Limit Gauge
    const rx = 172;
    const rows = [
      { label: 'Hangabtrieb FH', val: `${fmt(t.downhillKN, 1)} kN`, col: '#ef4444' },
      { label: 'Winde FW', val: `${fmt(t.winchForceKN, 1)} kN`, col: '#eab308' },
      { label: 'Ketten-Bedarf', val: `${fmt(Math.max(0, t.requiredTrackThrustKN), 1)} kN`, col: '#22c55e' },
      { label: 'Haftgrenze', val: `${fmt(t.maxTrackTractionKN, 1)} kN`, col: '#38bdf8' }
    ];
    rows.forEach((r, idx) => {
      const y = 26 + idx * 24;
      this.svg.appendChild(el('text', { x: rx, y, fill: c.muted, 'font-size': 9.5, 'font-weight': 600 }, r.label));
      this.svg.appendChild(el('text', { x: 310, y, fill: r.col, 'font-size': 10.5, 'font-weight': 700, 'text-anchor': 'end' }, r.val));
    });

    // Traction / Slip Warning Bar
    const barY = 128;
    const barW = 138;
    const demandPct = Math.min(1.35, Math.max(0, t.requiredTrackThrustKN) / Math.max(10, t.maxTrackTractionKN));
    const fillW = Math.min(barW, (demandPct / 1.35) * barW);
    const limitX = rx + (1.0 / 1.35) * barW;
    const barCol = t.tractionExceeded ? '#ef4444' : demandPct > 0.78 ? '#f59e0b' : '#22c55e';

    this.svg.appendChild(el('text', { x: rx, y: barY - 5, fill: c.text, 'font-size': 9.5, 'font-weight': 700 },
      t.tractionExceeded ? `⚠ SCHLUPF ${fmt(t.slipPct, 0)} % (Winde fehlt!)` : `Haftung OK · Schlupf ${fmt(t.slipPct, 1)} %`
    ));
    this.svg.appendChild(el('rect', { x: rx, y: barY, width: barW, height: 12, rx: 4, fill: c.trackBg }));
    this.svg.appendChild(el('rect', { x: rx, y: barY, width: fillW, height: 12, rx: 4, fill: barCol }));
    this.svg.appendChild(el('line', {
      x1: limitX, y1: barY - 2, x2: limitX, y2: barY + 14,
      stroke: c.text, 'stroke-width': 1.5, 'stroke-dasharray': '2 2'
    }));
    this.svg.appendChild(el('text', { x: rx, y: 158, fill: c.muted, 'font-size': 8.5 },
      'Gestrichelt = Schneescher-Grenze'
    ));
  }

  // 2. Hydrostatic Power Split (400 kW) & Live Circuit Pressures (up to 450 bar)
  renderHydraulics(t, c) {
    this.svg.appendChild(el('text', {
      x: 12, y: 18, fill: c.text, 'font-size': 10.5, 'font-weight': 700
    }, `MAN D3876: ${fmt(t.totalPowerKW, 0)} / 400 kW (${fmt(t.engineLoadPct, 0)} %)`));

    const items = [
      { label: 'Fahrantrieb L/R', kw: t.powerSplit.driveKW, bar: t.pressuresBar.drive, col: '#ef4444' },
      { label: 'AlpinFlexFräse', kw: t.powerSplit.tillerKW, bar: t.pressuresBar.tiller, col: '#f59e0b' },
      { label: '4,7-t-Seilwinde', kw: t.powerSplit.winchKW, bar: t.pressuresBar.winch, col: '#a855f7' },
      { label: '12-Wege-Schild', kw: t.powerSplit.bladeKW, bar: t.pressuresBar.blade, col: '#38bdf8' }
    ];

    const startX = 110;
    const maxW = 132;
    items.forEach((it, idx) => {
      const y = 34 + idx * 31;
      const barW = Math.min(maxW, (it.bar / PB_SPECS.identity.maxHydraulicPressureBar) * maxW);

      this.svg.appendChild(el('text', { x: 12, y: y + 10, fill: c.text, 'font-size': 10, 'font-weight': 600 }, it.label));
      this.svg.appendChild(el('rect', { x: startX, y, width: maxW, height: 14, rx: 4, fill: c.trackBg }));
      this.svg.appendChild(el('rect', { x: startX, y, width: barW, height: 14, rx: 4, fill: it.col }));

      // Pressure (bar) + Power (kW) readout
      this.svg.appendChild(el('text', {
        x: 310, y: y + 6, fill: it.col, 'font-size': 10, 'font-weight': 700, 'text-anchor': 'end'
      }, `${fmt(it.bar, 0)} bar`));
      this.svg.appendChild(el('text', {
        x: 310, y: y + 17, fill: c.muted, 'font-size': 8.5, 'text-anchor': 'end'
      }, `${fmt(it.kw, 0)} kW`));
    });

    this.svg.appendChild(el('text', {
      x: 12, y: 164, fill: c.muted, 'font-size': 8.8
    }, `Hochdruck-Vorlauf bis 450 bar · Rücklauf ~${PB_SPECS.identity.returnPressureBar} bar · ${fmt(t.engineTorqueNm, 0)} Nm`));
  }

  // 3. Specific Ground Pressure Comparison (g/cm²)
  renderGroundPressure(t, c) {
    const pbVal = Math.max(45, t.groundPressureGCm2);
    const ref = PB_SPECS.groundPressureRef;
    this.svg.appendChild(el('text', {
      x: 12, y: 18, fill: c.text, 'font-size': 10.5, 'font-weight': 700
    }, 'Spezifischer Bodendruck (log. Skala · g/cm²)'));

    const rows = [
      { label: 'PistenBully 800 W (14 t)', val: pbVal, col: '#22c55e', note: '4,2 m X-Track' },
      { label: 'Mensch im Skischuh', val: ref.skierBootGCm2, col: '#f59e0b', note: '~3,8× höher!' },
      { label: 'PKW-Reifen (1,8 t)', val: ref.carTireGCm2, col: '#ef4444', note: '~38× höher!' }
    ];

    const logMax = Math.log10(3200);
    const barX = 12;
    const maxW = 224;

    rows.forEach((r, idx) => {
      const y = 34 + idx * 42;
      const frac = Math.min(1, Math.max(0.08, Math.log10(r.val) / logMax));
      this.svg.appendChild(el('text', { x: barX, y, fill: c.text, 'font-size': 10, 'font-weight': 600 }, r.label));
      this.svg.appendChild(el('text', { x: 308, y, fill: c.muted, 'font-size': 9, 'text-anchor': 'end' }, r.note));
      this.svg.appendChild(el('rect', { x: barX, y: y + 5, width: maxW, height: 14, rx: 4, fill: c.trackBg }));
      this.svg.appendChild(el('rect', { x: barX, y: y + 5, width: maxW * frac, height: 14, rx: 4, fill: r.col }));
      this.svg.appendChild(el('text', {
        x: 308, y: y + 16, fill: r.col, 'font-size': 10.5, 'font-weight': 700, 'text-anchor': 'end'
      }, `${fmt(r.val, 0)} g/cm²`));
    });

    this.svg.appendChild(el('text', {
      x: 12, y: 165, fill: c.muted, 'font-size': 8.8
    }, '14.000 kg verteilt auf ~18,4 m² Kettenfläche = kaum Einsinken im Tiefschnee'));
  }
}
