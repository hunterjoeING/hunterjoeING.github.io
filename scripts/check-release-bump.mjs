import { execFile } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { promisify } from 'node:util';
import { runInNewContext } from 'node:vm';

const manifest = 'shared/releases.js';
const repository = new URL('../', import.meta.url);
const exec = promisify(execFile);

async function git(...args) {
  const { stdout } = await exec('git', args, { cwd: repository });
  return stdout;
}

function readCatalog(source) {
  const window = {};
  runInNewContext(source, { window }, { filename: manifest });
  return window.ARCADE_RELEASES;
}

function latestVersions({ releases }) {
  const versions = new Map();
  for (const { app, version } of releases) {
    if (!versions.has(app)) versions.set(app, version);
  }
  return versions;
}

function versionParts(version) {
  if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(version)) {
    throw new Error(`Ungültige Version: ${version}`);
  }
  return version.split('.').map(part => BigInt(part));
}

function isNewer(version, previous) {
  const current = versionParts(version);
  if (!previous) return true;
  const base = versionParts(previous);
  const changed = current.findIndex((part, index) => part !== base[index]);
  return changed !== -1 && current[changed] > base[changed];
}

function affectedApps(paths, apps) {
  const byDirectory = new Map();
  for (const [id, { href }] of Object.entries(apps)) {
    const directory = href.match(/^(?:\.\/)?games\/([^/]+)\//)?.[1];
    if (directory) byDirectory.set(directory, id);
  }

  const affected = new Set();
  for (const path of paths) {
    if (path === manifest || path === 'games/e-roadtrip/dist/e-roadtrip.js' ||
        /\.md$/i.test(path) || /(?:^|\/)tests\//.test(path)) continue;
    if (path.startsWith('shared/') || path === 'index.html' || path === 'changelogs.html') {
      affected.add('arcade');
      continue;
    }
    const directory = path.match(/^games\/([^/]+)\//)?.[1];
    const app = byDirectory.get(directory);
    if (app) affected.add(app);
  }
  return affected;
}

async function main() {
  const eventFile = process.env.GITHUB_EVENT_PATH;
  const pr = eventFile ? JSON.parse(readFileSync(eventFile, 'utf8')).pull_request : undefined;
  if (pr && (/\[no-release\]/i.test(pr.title) || pr.labels.some(label => label.name.toLowerCase() === 'no-release'))) {
    console.log('Versionsprüfung übersprungen ([no-release] oder Label no-release).');
    return;
  }

  const base = process.argv[2] || `origin/${pr?.base.ref || 'main'}`;
  const baseCommit = (await git('rev-parse', '--verify', '--end-of-options', `${base}^{commit}`)).trim();
  if (!(await git('ls-tree', '--name-only', baseCommit, '--', manifest)).trim()) {
    console.log(`Versionsprüfung übersprungen (Bootstrap: ${manifest} fehlt auf ${base}).`);
    return;
  }

  const [baseSource, diff] = await Promise.all([
    git('show', `${baseCommit}:${manifest}`),
    git('diff', '--name-only', '--no-renames', '-z', `${baseCommit}...HEAD`, '--')
  ]);
  const before = readCatalog(baseSource);
  const after = readCatalog(readFileSync(new URL(manifest, repository), 'utf8'));
  const paths = diff.split('\0');
  const previousVersions = latestVersions(before);
  const currentVersions = latestVersions(after);
  const affected = affectedApps(paths, { ...before.apps, ...after.apps });
  const missing = [];

  for (const app of affected) {
    const previous = previousVersions.get(app);
    const current = currentVersions.get(app);
    if (!current || !isNewer(current, previous)) {
      missing.push(`${app} (Basis: ${previous || '–'}, PR: ${current || '–'})`);
    }
  }

  if (missing.length) {
    console.error(`Release-Bump in ${manifest} erforderlich: ${missing.join(', ')}`);
    process.exitCode = 1;
  } else {
    console.log(affected.size ? `Versionsprüfung bestanden: ${[...affected].join(', ')}` : 'Keine releasepflichtigen Dateien geändert.');
  }
}

await main();
