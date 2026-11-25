(function () {
  'use strict';

  const { apps, releases } = window.ARCADE_RELEASES;
  // Resolve catalog links from the site root, including GitHub Pages project sites.
  const siteRoot = new URL('../', document.currentScript.src);
  const dateFormat = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeZone: 'UTC' });
  const seenInPage = new Map();
  const dayMs = 86400000;
  const dialogId = 'arcade-updates-dialog';

  function escapeHtml(text) {
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function latest(appId) {
    return releases.find(release => release.app === appId);
  }

  function latestFeature(appId) {
    return releases.find(release => release.app === appId && release.type === 'feature');
  }

  function formatDate(date) {
    return dateFormat.format(new Date(date));
  }

  function appHref(appId) {
    return new URL(apps[appId].href, siteRoot).href;
  }

  function highlightsHtml(release) {
    return '<ul>' + release.highlights.map(bullet => `<li>${escapeHtml(bullet)}</li>`).join('') + '</ul>';
  }

  function seenKey(appId) {
    return 'arcade_seen_release_' + appId;
  }

  function hasSeen(appId, version) {
    if (seenInPage.get(appId) === version) return true;
    try {
      return localStorage.getItem(seenKey(appId)) === version;
    } catch {
      return false;
    }
  }

  function markSeen(appId) {
    const feature = latestFeature(appId);
    if (!feature) return;
    seenInPage.set(appId, feature.version);
    try {
      localStorage.setItem(seenKey(appId), feature.version);
    } catch {
      // Session state still works when storage is unavailable.
    }
    for (const badge of document.querySelectorAll('[data-arcade-update]')) {
      if (badge.dataset.arcadeUpdate !== appId) continue;
      badge.querySelector('.arcade-update-dot')?.remove();
      badge.removeAttribute('aria-label');
    }
  }

  function badgeHtml(appId) {
    const feature = latestFeature(appId);
    if (!feature || feature.banner === false) return '';

    const now = new Date();
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const age = (today - Date.parse(feature.date)) / dayMs;
    if (age < 0 || age > 14) return '';

    const version = 'v' + feature.version.split('.').slice(0, 2).join('.');
    const label = escapeHtml('Neues Update ' + version);
    const unread = !hasSeen(appId, feature.version);
    return `<button type="button" class="arcade-update-badge" data-arcade-update="${escapeHtml(appId)}"
      aria-haspopup="dialog"${unread ? ` aria-label="${label}, ungelesen"` : ''}>
      ${unread ? '<span class="arcade-update-dot" aria-hidden="true"></span>' : ''}${label}
    </button>`;
  }

  function releaseHeading(release) {
    return `<strong>v${escapeHtml(release.version)} · ${escapeHtml(release.title)}</strong>
      <time datetime="${escapeHtml(release.date)}">${escapeHtml(formatDate(release.date))}</time>`;
  }

  function openChangelog(appId, trigger = document.activeElement) {
    const history = releases.filter(release => release.app === appId);
    if (!history.length || document.getElementById(dialogId)) return;

    const app = apps[appId];
    const features = history.filter(release => release.type === 'feature');
    const patches = history.filter(release => release.type === 'patch');
    const dialog = document.createElement('dialog');
    dialog.id = dialogId;
    dialog.className = 'arcade-modal-backdrop';
    dialog.setAttribute('aria-labelledby', 'arcade-updates-title');
    const overview = new URL('changelogs.html', siteRoot);
    overview.hash = new URLSearchParams({ app: appId }).toString();
    dialog.innerHTML = `
      <div class="arcade-modal-card">
        <div class="arcade-modal-head">
          <h2 class="arcade-modal-title" id="arcade-updates-title">${escapeHtml(app.title)} – Was ist neu</h2>
          <button type="button" class="icon-btn" data-close aria-label="Schließen" autofocus>✕</button>
        </div>
        <div class="arcade-modal-body">
          ${features.map((release, index) => `
            <details${index === 0 ? ' open' : ''}>
              <summary>${releaseHeading(release)}</summary>
              ${highlightsHtml(release)}
            </details>`).join('')}
          ${patches.length ? `
            <details>
              <summary><strong>Kleinere Fixes</strong></summary>
              ${patches.map(release => `<div class="arcade-update-patch">${releaseHeading(release)}${highlightsHtml(release)}</div>`).join('')}
            </details>` : ''}
        </div>
        <div class="arcade-modal-foot">
          <a href="${escapeHtml(overview.href)}">Alle Changelogs</a>
          ${app.kind !== 'arcade' ? `<a href="${escapeHtml(appHref(appId))}" class="primary-btn">Jetzt spielen</a>` : ''}
          <button type="button" class="secondary-btn" data-close>Schließen</button>
        </div>
      </div>`;

    dialog.addEventListener('click', event => {
      if (event.target === dialog || event.target.closest('[data-close]')) dialog.close();
    });
    // Let the native dialog handle Escape without closing a separate Arcade modal.
    dialog.addEventListener('keydown', event => {
      if (event.key === 'Escape') event.stopPropagation();
    });
    dialog.addEventListener('close', () => {
      dialog.remove();
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    }, { once: true });

    document.body.append(dialog);
    dialog.showModal();
    markSeen(appId);
  }

  const style = document.createElement('style');
  style.textContent = `
    .arcade-update-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      min-height: 32px;
      padding: 4px 10px;
      border: 1px solid var(--accent-gold);
      border-radius: 999px;
      background: var(--accent-gold-soft);
      color: var(--text-main);
      font: 600 12px var(--font-ui);
      white-space: nowrap;
      cursor: pointer;
    }
    .arcade-update-dot {
      width: 7px;
      height: 7px;
      flex: 0 0 7px;
      border-radius: 50%;
      background: var(--accent-gold);
      animation: arcade-update-pulse 1.8s ease-out infinite;
    }
    @keyframes arcade-update-pulse {
      from { box-shadow: 0 0 0 0 var(--accent-gold); }
      70%, to { box-shadow: 0 0 0 5px transparent; }
    }
    html:has(#arcade-updates-dialog[open]) { overflow: hidden; }
    #arcade-updates-dialog {
      width: 100%;
      height: 100%;
      max-width: none;
      max-height: none;
      margin: 0;
      border: 0;
      color: var(--text-main);
    }
    #arcade-updates-dialog:not([open]) { display: none; }
    #arcade-updates-dialog::backdrop { background: transparent; }
    #arcade-updates-dialog .arcade-modal-card {
      width: min(440px, 100%);
      max-height: 80vh;
      max-height: 80dvh;
    }
    #arcade-updates-dialog .arcade-modal-head { padding-block: 10px; }
    #arcade-updates-dialog .arcade-modal-body { overscroll-behavior: contain; }
    #arcade-updates-dialog details + details { border-top: 1px solid var(--border-hairline); }
    #arcade-updates-dialog summary {
      min-height: 44px;
      padding: 10px 0;
      cursor: pointer;
    }
    #arcade-updates-dialog time {
      display: block;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
    #arcade-updates-dialog ul { margin: 0 0 12px; padding-inline-start: 20px; }
    #arcade-updates-dialog li + li { margin-top: 4px; }
    #arcade-updates-dialog .arcade-update-patch + .arcade-update-patch { margin-top: 12px; }
    #arcade-updates-dialog .arcade-modal-foot {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 12px;
      padding: 8px 16px;
    }
    #arcade-updates-dialog :is(button, .arcade-modal-foot a) { min-height: 44px; }
    #arcade-updates-dialog .icon-btn { min-width: 44px; }
    #arcade-updates-dialog .arcade-modal-foot a { display: inline-flex; align-items: center; }
    #arcade-updates-dialog .arcade-modal-foot .primary-btn { color: #fff; }
    @media (prefers-reduced-motion: reduce) {
      .arcade-update-dot, #arcade-updates-dialog, #arcade-updates-dialog .arcade-modal-card {
        animation: none;
      }
    }
  `;
  document.head.append(style);

  window.ArcadeUpdates = { appHref, badgeHtml, formatDate, highlightsHtml, latest, markSeen, openChangelog };
})();
