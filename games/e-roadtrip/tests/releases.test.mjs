import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const root = new URL('../../../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');

function loadCatalog() {
  const window = {};
  runInNewContext(read('shared/releases.js'), { window }, { filename: 'shared/releases.js' });
  return window.ARCADE_RELEASES;
}

function hubCards(hub, name) {
  const source = hub.match(new RegExp(`\\bconst ${name}\\s*=\\s*(\\[[\\s\\S]*?^\\s*\\]);`, 'm'))?.[1];
  assert.ok(source, `Hub-Array ${name} fehlt`);
  return runInNewContext(source);
}

function normalize(text) {
  return text.normalize('NFC').trim().toLocaleLowerCase('de-DE');
}

function readBankSpoilers(filename) {
  const questions = [];
  const ArcadeQuizEngine = {
    registerBank(_id, entries) { questions.push(...entries); }
  };
  runInNewContext(read(`shared/quiz-data/${filename}`), { window: { ArcadeQuizEngine }, ArcadeQuizEngine }, { filename });
  assert.ok(questions.length, `${filename} hat keine Fragen registriert`);
  const text = values => values.filter(value => typeof value === 'string').map(normalize).filter(Boolean);
  return questions.flatMap(question => [
    ...text([question.q, question.nameQ]),
    ...text([question.a?.[question.correctIndex ?? 0], question.nameOpts?.[0], question.toxOpts?.[0]])
      .filter(answer => answer.length > 4)
  ]);
}

export default function register(test) {
  const { apps, releases } = loadCatalog();

  test('release versions and dates are valid and strictly ordered within each app', () => {
    const previous = new Map();
    const initial = new Set();
    const semver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
    const versionOrder = new Intl.Collator('de', { numeric: true });

    for (const release of releases) {
      const { app, version, date, type, title, highlights } = release;
      assert.ok(Object.hasOwn(apps, app), `Unbekannte App: ${app}`);
      const label = `${app} v${version}`;
      const parts = version.match(semver);
      assert.ok(parts, `Ungültige SemVer: ${label}`);
      assert.ok(parts[1] === '0' || apps[app].allowStable === true, `Stabile Version ohne Freigabe: ${label}`);
      assert.match(date, /^\d{4}-\d{2}-\d{2}$/, label);
      const parsed = new Date(date);
      assert.ok(Number.isFinite(+parsed), `Ungültiges Datum: ${label}`);
      assert.equal(parsed.toISOString().slice(0, 10), date, label);
      // A release date may be in the future while a PR is under review.

      const prev = previous.get(app);
      if (prev) {
        assert.ok(versionOrder.compare(prev.version, version) > 0, `Versionsreihenfolge: ${label}`);
        assert.ok(prev.date >= date, `Datumsreihenfolge: ${label}`);
      }
      previous.set(app, release);
      if (version === '0.1.0') initial.add(app);

      assert.equal(type, parts[3] === '0' ? 'feature' : 'patch', label);
      assert.ok(typeof title === 'string' && title.trim(), `Titel fehlt: ${label}`);
      const shortEntry = type === 'patch' || (version === '0.1.0' && title === 'Erste Version');
      assert.ok(Array.isArray(highlights) && highlights.length >= (shortEntry ? 1 : 3) &&
        highlights.length <= (shortEntry ? 3 : 5), `Anzahl der Stichpunkte: ${label}`);
      assert.ok(highlights.every(bullet => typeof bullet === 'string' && bullet.trim()), `Leerer Stichpunkt: ${label}`);
    }

    for (const app of Object.keys(apps)) {
      assert.ok(initial.has(app), `Erste Version v0.1.0 fehlt: ${app}`);
    }
  });

  test('release apps match the public hub cards and exclude hidden quizzes', () => {
    const hub = read('index.html');
    const games = hubCards(hub, 'GAMES');
    const quizzes = hubCards(hub, 'QUIZZES');
    const hidden = new Set(hubCards(hub, 'HIDDEN_QUIZZES').map(card => card.id));
    for (const card of quizzes) {
      if (card.hidden || card.unlisted || card.adminOnly) hidden.add(card.id);
    }
    for (const id of hidden) {
      assert.ok(!Object.hasOwn(apps, id) && !releases.some(release => release.app === id), 'Ein verborgenes Quiz ist im Release-Katalog');
    }

    const ids = ['arcade'];
    assert.equal(apps.arcade.kind, 'arcade');
    for (const [kind, cards] of [['game', games], ['quiz', quizzes]]) {
      for (const card of cards) {
        if (hidden.has(card.id)) continue;
        assert.ok(Object.hasOwn(apps, card.id), `Hub-Karte fehlt im Release-Katalog: ${card.id}`);
        assert.equal(apps[card.id].href, card.href, card.id);
        assert.equal(apps[card.id].kind, kind, card.id);
        ids.push(card.id);
      }
    }
    assert.deepEqual(Object.keys(apps).sort(), ids.sort());
  });

  test('E-Roadtrip release, package, lockfile and asset versions agree', () => {
    const version = releases.find(entry => entry.app === 'eroadtrip').version;
    const directory = 'games/e-roadtrip/';
    assert.equal(JSON.parse(read(directory + 'package.json')).version, version);
    const lock = JSON.parse(read(directory + 'package-lock.json'));
    assert.equal(lock.version, version);
    assert.equal(lock.packages[''].version, version);

    const page = read(directory + 'index.html');
    const urls = [...page.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(match => new URL(match[1], 'https://example.test/' + directory));
    for (const path of ['./styles.css', './dist/e-roadtrip.js', '../../shared/releases.js', '../../shared/update-banner.js']) {
      const { pathname } = new URL(path, 'https://example.test/' + directory);
      const matches = urls.filter(url => url.pathname === pathname);
      assert.equal(matches.length, 1, path);
      assert.equal(matches[0].searchParams.get('v'), version, path);
    }
  });

  test('quiz release titles and highlights contain no question or correct answer strings', () => {
    const quizApps = Object.keys(apps).filter(id => apps[id].kind === 'quiz');
    const files = new Set();
    for (const app of quizApps) {
      const banks = [...read(apps[app].href).matchAll(/quiz-data\/(bank-[\w-]+\.js)/g)];
      assert.ok(banks.length, `Keine Fragenbank für ${app} gefunden`);
      for (const [, filename] of banks) files.add(filename);
    }
    const spoilers = [...new Set([...files].flatMap(readBankSpoilers))];

    for (const { app, version, title, highlights } of releases) {
      if (apps[app].kind !== 'quiz') continue;
      for (const [index, text] of [title, ...highlights].entries()) {
        const normalized = normalize(text);
        assert.ok(!spoilers.some(spoiler => normalized.includes(spoiler)),
          `Möglicher Quiz-Spoiler: ${app} v${version}, ${index === 0 ? 'Titel' : `Stichpunkt ${index}`}`);
      }
    }
  });
}
