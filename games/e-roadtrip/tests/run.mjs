import test from 'node:test';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const gameDir = fileURLToPath(new URL('..', import.meta.url));
const { version } = JSON.parse(await readFile(join(gameDir, 'package.json'), 'utf8'));
const tempDir = await mkdtemp(join(tmpdir(), 'e-roadtrip-tests-'));
const bundle = join(tempDir, 'game.mjs');
const modules = [
  'main', 'data/events', 'data/europeMap', 'data/levels', 'data/vehicles',
  'sim/RoutePlanner', 'sim/EnergyModel', 'sim/ScoringEngine', 'sim/Leaderboard',
  'sim/ChargingBay', 'sim/RouteNavigation', 'sim/PropertyDamage',
  'sim/AlpineDriving', 'sim/AlpineDescent', 'data/alpineEvents', 'phaser/AlpinePass',
  'sim/WinterDriving', 'sim/WinterCharging', 'data/winterEvents',
  'sim/WinterTunnel', 'phaser/DestinationFinale', 'phaser/InnsbruckFinaleScene',
  'sim/WinterCity', 'data/cityLayouts/muenchen', 'data/cityLayouts/innsbruck', 'phaser/CityTraffic',
  'phaser/CityCollision', 'phaser/MapLayout', 'phaser/AutobahnTraffic',
  'phaser/CityDriveScene', 'phaser/PlacePainter', 'phaser/AutobahnScene', 'phaser/MontpellierFinaleScene',
  'ui/EventModal', 'ui/DrivingHUD', 'ui/DrivingStatus', 'ui/PlanningUI', 'ui/ResultsUI'
];

try {
  await build({
    stdin: {
      resolveDir: gameDir,
      contents: modules.map(name => `export * from './src/${name}.ts';`).join('\n')
    },
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile: bundle,
    define: { __EROADTRIP_VERSION__: JSON.stringify(version) },
    // The stub covers only the Phaser APIs exercised by the tests.
    logOverride: { 'import-is-undefined': 'silent' },
    plugins: [{
      name: 'test-stubs',
      setup(builder) {
        builder.onResolve({ filter: /^phaser$/ }, () => ({
          path: fileURLToPath(new URL('./phaser-stub.mjs', import.meta.url))
        }));
        // Expose the controller inside the test bundle without starting the game.
        builder.onLoad({ filter: /[\\/]src[\\/]main\.ts$/ }, async ({ path }) => ({
          contents: await readFile(path, 'utf8') + '\nexport { ERoadtripController };',
          resolveDir: dirname(path),
          loader: 'ts'
        }));
      }
    }]
  });

  const noOp = () => {};
  Object.assign(globalThis, {
    window: {
      location: { search: '' },
      ArcadeAudio: { isMuted: () => true, click: noOp },
      addEventListener: noOp,
      setInterval, clearInterval, setTimeout, clearTimeout,
      matchMedia: () => ({ matches: false, addEventListener: noOp })
    },
    document: { addEventListener: noOp, activeElement: null }
  });

  const game = await import(pathToFileURL(bundle).href);
  for (const name of ['simulation', 'traffic', 'controller', 'interactions', 'finale', 'winter', 'winter-city', 'winter-tunnel', 'alpine', 'releases', 'worker-validation', 'arcade-scores', 'leaderboard']) {
    const { default: register } = await import(`./${name}.test.mjs`);
    register(test, game);
  }
  test.after(() => rm(tempDir, { recursive: true, force: true }));
} catch (error) {
  await rm(tempDir, { recursive: true, force: true });
  throw error;
}
