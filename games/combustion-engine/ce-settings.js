const STORAGE_KEY = 'combustion_engine_settings';

export function gasDensityPercent(value) {
  return Number.isFinite(value) ? Math.max(25, Math.min(200, Math.round(value / 5) * 5)) : 100;
}

export function loadSettings(win) {
  let saved;
  try { saved = JSON.parse(win.localStorage.getItem(STORAGE_KEY)); } catch { /* Storage can be unavailable. */ }
  const level = saved?.aoLevel;
  return {
    aoLevel: Number.isInteger(level) && level >= 0 && level <= 3 ? level : null,
    shadows: typeof saved?.shadows === 'boolean' ? saved.shadows : true,
    density: gasDensityPercent(saved?.density)
  };
}

export function createGraphicsSettings(doc, win, pipe, engine) {
  const settings = loadSettings(win);
  const byId = id => doc.getElementById(id);
  const toggle = byId('ce-btn-settings'), panel = byId('ce-settings');
  const group = byId('ce-ao-options'), status = byId('ce-ao-status');
  const levels = Array.from(doc.querySelectorAll('[name="ce-ao"]'));
  const shadows = byId('ce-shadows'), density = byId('ce-gas-density');
  const output = byId('ce-density-value'), fps = byId('ce-settings-fps');
  let displayedLevel, since = null, frames = 0;

  function save() {
    try { win.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch { /* Keep this session's choice. */ }
  }
  function showAO() {
    displayedLevel = pipe.aoLevel;
    for (const radio of levels) radio.checked = Number(radio.value) === displayedLevel;
    group.disabled = !pipe.capable || pipe.forcedLevel !== null;
    if (!pipe.capable) status.textContent = 'Kontaktschatten auf diesem Gerät nicht verfügbar';
    else if (pipe.forcedLevel !== null) status.textContent = 'Kontaktschatten · per URL vorgegeben';
    else status.textContent = settings.aoLevel === null ? 'Kontaktschatten · automatisch' : 'Kontaktschatten · manuell';
  }
  for (const radio of levels) {
    function select() {
      const level = Number(radio.value);
      if (group.disabled || settings.aoLevel === level) return;
      settings.aoLevel = level;
      pipe.setAoLevel(level);
      showAO();
      save();
    }
    radio.addEventListener('change', select);
    // Clicking the already active automatic level pins it, too.
    radio.addEventListener('click', select);
  }
  shadows.checked = settings.shadows;
  pipe.setShadows(settings.shadows);
  shadows.addEventListener('change', () => {
    settings.shadows = shadows.checked;
    pipe.setShadows(settings.shadows);
    save();
  });
  function applyDensity() {
    settings.density = gasDensityPercent(Number(density.value));
    const label = settings.density + ' %';
    density.setAttribute('aria-valuetext', label);
    output.value = label;
    engine.setGasDensity(settings.density);
  }
  density.value = String(settings.density);
  applyDensity();
  density.addEventListener('input', applyDensity);
  density.addEventListener('change', save);
  pipe.setAoLevel(settings.aoLevel);

  function close(restoreFocus = false) {
    if (panel.hidden) return false;
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) toggle.focus();
    return true;
  }
  function resetFps() {
    since = null;
    frames = 0;
    fps.textContent = '–';
  }
  toggle.addEventListener('click', () => {
    if (close(true)) return;
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    showAO();
    resetFps();
    (group.disabled ? shadows : levels[displayedLevel]).focus();
  });
  function outside(event) {
    if (!panel.hidden && !panel.contains(event.target) && !toggle.contains(event.target)) close();
  }
  doc.addEventListener('click', outside);
  doc.addEventListener('focusin', outside);
  doc.addEventListener('visibilitychange', resetFps);

  function frame(now) {
    if (panel.hidden || doc.hidden) return;
    if (displayedLevel !== pipe.aoLevel) showAO();
    if (since === null) { since = now; return; }
    frames++;
    if (now - since < 500) return;
    fps.textContent = String(Math.round(frames * 1000 / (now - since)));
    since = now;
    frames = 0;
  }
  return { close, frame };
}
