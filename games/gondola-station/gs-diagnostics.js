// 3-Tab Live Engineering SVG Diagnostics Renderer:
// 1. v(s) Geschwindigkeits-Weg-Diagramm (with live moving cabin dots!)
// 2. Kuppel- & Klemmkraft-Monitor (28 kN Tellerfederkraft, Toleranzkorridor & Δv)
// 3. Antriebs- & Leistungsbilanz (DirectDrive kW, Drehmoment kNm, Seilzugkraft & Kapazität)

import { GS_SPECS } from './specs.js';

function esc(str) {
  return String(str).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
}

function fmt(n, d = 1) {
  return Number(n).toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });
}

export class GondolaDiagnostics {
  constructor(svgEl, kinematics) {
    this.svg = svgEl;
    this.kin = kinematics;
    this.activeTab = 'velocity'; // 'velocity' | 'clamp' | 'drive'
    this.profile = kinematics.getStationVelocityProfile(120);
  }

  setTab(tab) {
    this.activeTab = tab;
  }

  render(snap) {
    if (!this.svg) return;
    if (this.activeTab === 'velocity') this._renderVelocityProfile(snap);
    else if (this.activeTab === 'clamp') this._renderClampMonitor(snap);
    else this._renderDriveBalance(snap);
  }

  // --- TAB 1: v(s) Geschwindigkeits-Weg-Diagramm ---
  _renderVelocityProfile(snap) {
    const W = 320;
    const H = 176;
    const padL = 34;
    const padR = 12;
    const padT = 22;
    const padB = 26;
    const pw = W - padL - padR;
    const ph = H - padT - padB;
    const vMax = 7.2;

    const { sMax, points } = this.profile;
    const sx = (s) => padL + Math.max(0, Math.min(1, s / sMax)) * pw;
    const sy = (v) => padT + ph * (1 - Math.max(0, Math.min(1, v / vMax)));

    // Zone background bands
    const loop = this.kin.loop;
    const xDecel0 = sx(loop.sDecelStart);
    const xDecel1 = sx(loop.sDecelEnd);
    const xAccel0 = sx(loop.sAccelStart);
    const xAccel1 = sx(loop.sAccelEnd);
    const xAttach1 = sx(loop.sAttachEnd);

    // Scaled v(s) path matching current target/actual speed
    const sf = snap.speedFactor;
    let dPath = '';
    for (let i = 0; i < points.length; i++) {
      const px = sx(points[i].s);
      const py = sy(points[i].vNom * sf);
      dPath += (i === 0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1);
    }

    // Nominal 6.0 m/s dashed reference curve
    let dRef = '';
    for (let i = 0; i < points.length; i += 2) {
      const px = sx(points[i].s);
      const py = sy(points[i].vNom);
      dRef += (i === 0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1);
    }

    // Live cabin markers currently inside the station & Tower 1 span
    let dots = '';
    for (const c of snap.cabins) {
      if (c.s <= sMax) {
        const cx = sx(c.s);
        const cy = sy(c.vActual);
        const isFault = c.index === snap.faultCabinIndex;
        const fill = isFault ? '#ef4444' : (c.zone === 'attach' || c.zone === 'detach' ? '#f43f5e' : (c.vNom < 0.6 ? '#38bdf8' : '#22c55e'));
        dots += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${isFault ? 5.2 : 3.8}" fill="${fill}" stroke="#0f172a" stroke-width="1.2"/>`;
      }
    }

    this.svg.innerHTML = `
      <rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="rgba(15,23,42,0.72)"/>
      <text x="${padL}" y="14" fill="#e2e8f0" font-size="10.2" font-weight="700">v(s) Stationsprofil · live alle Kabinen</text>
      <text x="${W - padR}" y="14" text-anchor="end" fill="#38bdf8" font-size="9.5" font-weight="700">${fmt(snap.actualSpeedMs, 2)} m/s</text>

      <!-- Zone Highlights -->
      <rect x="${xDecel0.toFixed(1)}" y="${padT}" width="${Math.max(1, xDecel1 - xDecel0).toFixed(1)}" height="${ph}" fill="rgba(245,158,11,0.13)"/>
      <rect x="${xDecel1.toFixed(1)}" y="${padT}" width="${Math.max(1, xAccel0 - xDecel1).toFixed(1)}" height="${ph}" fill="rgba(56,189,248,0.12)"/>
      <rect x="${xAccel0.toFixed(1)}" y="${padT}" width="${Math.max(1, xAccel1 - xAccel0).toFixed(1)}" height="${ph}" fill="rgba(245,158,11,0.13)"/>
      <rect x="${xAccel1.toFixed(1)}" y="${padT}" width="${Math.max(2, xAttach1 - xAccel1).toFixed(1)}" height="${ph}" fill="rgba(239,68,68,0.18)"/>

      <!-- Horizontal grid lines -->
      ${[0, 3, 6].map((gv) => {
        const y = sy(gv);
        return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" stroke="rgba(148,163,184,0.18)" stroke-dasharray="3,3"/>
                <text x="${padL - 5}" y="${(y + 3).toFixed(1)}" text-anchor="end" fill="#94a3b8" font-size="8.8">${gv}</text>`;
      }).join('')}
      <text x="10" y="${padT + ph * 0.5}" fill="#94a3b8" font-size="8.5" transform="rotate(-90 10 ${padT + ph * 0.5})" text-anchor="middle">m/s</text>

      <!-- Curves -->
      <path d="${dRef}" fill="none" stroke="rgba(148,163,184,0.34)" stroke-width="1.2" stroke-dasharray="3,3"/>
      <path d="${dPath}" fill="none" stroke="#38bdf8" stroke-width="2.2"/>
      ${dots}

      <!-- Bottom zone labels -->
      <text x="${(xDecel0 + xDecel1) * 0.5}" y="${H - 8}" text-anchor="middle" fill="#fbbf24" font-size="8.2">Verzög.</text>
      <text x="${(xDecel1 + xAccel0) * 0.5}" y="${H - 8}" text-anchor="middle" fill="#7dd3fc" font-size="8.2">Riesenräder &amp; EG (0,3 m/s)</text>
      <text x="${(xAccel0 + xAccel1) * 0.5}" y="${H - 8}" text-anchor="middle" fill="#fbbf24" font-size="8.2">Beschl.</text>
      <text x="${xAttach1 + 14}" y="${H - 8}" text-anchor="middle" fill="#4ade80" font-size="8.2">Seil</text>
    `;
  }

  // --- TAB 2: Kuppel- & Klemmkraft-Monitor ---
  _renderClampMonitor(snap) {
    const W = 320;
    const H = 176;
    const padL = 36;
    const padR = 14;
    const padT = 24;
    const padB = 34;
    const pw = W - padL - padR;
    const ph = H - padT - padB;
    const fMax = 36;

    const sx = (u) => padL + u * pw;
    const sy = (f) => padT + ph * (1 - Math.max(0, Math.min(1, f / fMax)));

    const cr = snap.clampReadout;
    const isFault = snap.faultState === 'alarm_braking' || snap.faultState === 'halted' || (cr.faulted && cr.inCheck);

    // Ideal clamping force step profile along coupling + check zone (u in [0..1])
    // 0..0.55 = on cam ramp (0 kN open), 0.55..0.68 = ramp exit snap (0 -> 28 kN), 0.68..1.0 = Check Zone (28 kN)
    const targetClosed = cr.faulted ? GS_SPECS.cabin.gripFaultForceKN : GS_SPECS.cabin.gripNominalForceKN;
    const curvePts = [];
    for (let i = 0; i <= 50; i++) {
      const u = i / 50;
      let f = 0;
      if (u < 0.48) f = 0;
      else if (u < 0.66) {
        const t = (u - 0.48) / 0.18;
        f = targetClosed * (t * t * (3 - 2 * t));
      } else {
        f = targetClosed;
      }
      curvePts.push(`${i === 0 ? 'M' : 'L'}${sx(u).toFixed(1)},${sy(f).toFixed(1)}`);
    }

    // Live cursor position along ramp -> check zone
    let cursorU = 0.82;
    if (cr.zone === 'attach') cursorU = cr.rampProgress * 0.66;
    else if (cr.zone === 'check') cursorU = 0.78;
    else if (cr.zone === 'accel') cursorU = 0.05;
    else cursorU = 0.90;

    const cx = sx(cursorU);
    const cy = sy(cr.forceKN);
    const ySafeTop = sy(GS_SPECS.cabin.gripMaxSafeKN);
    const ySafeBot = sy(GS_SPECS.cabin.gripMinSafeKN);

    const statusColor = isFault ? '#ef4444' : '#22c55e';
    const statusText = isFault
      ? `ALARM: ${fmt(cr.forceKN, 1)} kN (< 24 kN)`
      : `OK: ${fmt(cr.forceKN, 1)} kN · Δv = ${fmt(cr.deltaV, 2)} m/s`;

    this.svg.innerHTML = `
      <rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="rgba(15,23,42,0.72)"/>
      <text x="${padL}" y="15" fill="#e2e8f0" font-size="10.2" font-weight="700">Federklemme #${String(cr.cabinNumber).padStart(2, '0')} · Prüftoleranz</text>
      <text x="${W - padR}" y="15" text-anchor="end" fill="${statusColor}" font-size="9.4" font-weight="700">${esc(statusText)}</text>

      <!-- Green Safe Tolerance Corridor (24 - 32 kN) -->
      <rect x="${sx(0.64).toFixed(1)}" y="${ySafeTop.toFixed(1)}" width="${(sx(1.0) - sx(0.64)).toFixed(1)}" height="${(ySafeBot - ySafeTop).toFixed(1)}" fill="rgba(34,197,94,0.20)" stroke="rgba(34,197,94,0.55)" stroke-dasharray="3,2"/>
      <text x="${sx(0.82).toFixed(1)}" y="${(ySafeTop + 9).toFixed(1)}" text-anchor="middle" fill="#86efac" font-size="7.8" font-weight="700">24–32 kN SOLL</text>

      <!-- Red Fault Zone below 24 kN in Check Zone -->
      <rect x="${sx(0.64).toFixed(1)}" y="${ySafeBot.toFixed(1)}" width="${(sx(1.0) - sx(0.64)).toFixed(1)}" height="${(sy(0) - ySafeBot).toFixed(1)}" fill="rgba(239,68,68,0.12)"/>

      <!-- Cam Ramp Open Zone -->
      <rect x="${padL}" y="${padT}" width="${(sx(0.54) - padL).toFixed(1)}" height="${ph}" fill="rgba(245,158,11,0.11)"/>
      <text x="${(padL + sx(0.54)) * 0.5}" y="${padT + 12}" text-anchor="middle" fill="#fcd34d" font-size="8.2">Kuppelrampe (offen)</text>

      <!-- Y Grid -->
      ${[0, 14, 28].map((f) => {
        const y = sy(f);
        return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" stroke="rgba(148,163,184,0.18)" stroke-dasharray="2,3"/>
                <text x="${padL - 5}" y="${(y + 3).toFixed(1)}" text-anchor="end" fill="#94a3b8" font-size="8.6">${f}</text>`;
      }).join('')}
      <text x="11" y="${padT + ph * 0.5}" fill="#94a3b8" font-size="8.5" transform="rotate(-90 11 ${padT + ph * 0.5})" text-anchor="middle">kN</text>

      <!-- Force Profile & Live Cursor -->
      <path d="${curvePts.join('')}" fill="none" stroke="${isFault ? '#f87171' : '#4ade80'}" stroke-width="2.4"/>
      <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4.8" fill="${statusColor}" stroke="#ffffff" stroke-width="1.5"/>

      <!-- Footer bar -->
      <text x="${padL}" y="${H - 10}" fill="#94a3b8" font-size="8.6">Relativgeschw. beim Einhängen: <tspan fill="#38bdf8" font-weight="700">Δv = ${fmt(cr.deltaV, 2)} m/s</tspan></text>
    `;
  }

  // --- TAB 3: Antriebs- & Leistungsbilanz (DirectDrive & Hydraulik) ---
  _renderDriveBalance(snap) {
    const W = 320;
    const H = 176;
    const barX = 114;
    const barW = 148;

    const rows = [
      {
        label: 'DirectDrive Leistung',
        val: `${fmt(snap.powerKw, 0)} kW`,
        frac: Math.min(1, snap.powerKw / 1400),
        color: '#38bdf8'
      },
      {
        label: 'Antriebsmoment',
        val: `${fmt(snap.torqueKNm, 0)} kNm`,
        frac: Math.min(1, snap.torqueKNm / 560),
        color: '#a855f7'
      },
      {
        label: 'Doppelseil-Zugkraft',
        val: `${fmt(snap.tensionForceKN, 0)} kN`,
        frac: Math.min(1, snap.tensionForceKN / 760),
        color: '#f59e0b'
      },
      {
        label: 'Förderleistung (24er)',
        val: `${snap.capacityPph.toLocaleString('de-DE')} P/h`,
        frac: Math.min(1, snap.capacityPph / 5200),
        color: '#22c55e'
      },
      {
        label: 'Sicherheitsbremse',
        val: snap.brakeEngagement > 0.05 ? `${fmt(snap.brakeEngagement * 100, 0)} % AKTIV` : 'Gelüftet (Frei)',
        frac: snap.brakeEngagement,
        color: '#ef4444'
      }
    ];

    let body = '';
    rows.forEach((r, idx) => {
      const y = 34 + idx * 27;
      body += `
        <text x="12" y="${y + 10}" fill="#cbd5e1" font-size="9.2" font-weight="600">${esc(r.label)}</text>
        <rect x="${barX}" y="${y}" width="${barW}" height="13" rx="6.5" fill="rgba(148,163,184,0.16)"/>
        <rect x="${barX}" y="${y}" width="${Math.max(2, r.frac * barW).toFixed(1)}" height="13" rx="6.5" fill="${r.color}"/>
        <text x="${W - 10}" y="${y + 10}" text-anchor="end" fill="#f8fafc" font-size="9.0" font-weight="700">${esc(r.val)}</text>
      `;
    });

    this.svg.innerHTML = `
      <rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="rgba(15,23,42,0.72)"/>
      <text x="12" y="17" fill="#e2e8f0" font-size="10.2" font-weight="700">Funitel DirectDrive 1.350 kW &amp; Bilanz</text>
      <text x="${W - 10}" y="17" text-anchor="end" fill="#94a3b8" font-size="9.0">${fmt(snap.directDriveRpm, 1)} U/min · Folgezeit ${snap.headwaySec > 0 ? fmt(snap.headwaySec, 1) + ' s' : '–'}</text>
      ${body}
    `;
  }
}
