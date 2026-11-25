import esbuild from 'esbuild';
import { readFileSync } from 'node:fs';

const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

// index.html loads dist/phaser.min.js before this bundle.
// Keep `import … from 'phaser'` on that global so Phaser is not inlined.
const phaserGlobal = {
  name: 'phaser-global',
  setup(build) {
    build.onResolve({ filter: /^phaser$/ }, () => ({
      path: 'phaser',
      namespace: 'phaser-global'
    }));
    build.onLoad({ filter: /.*/, namespace: 'phaser-global' }, () => ({
      contents: 'module.exports = window.Phaser;',
      loader: 'js'
    }));
  }
};

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  format: 'iife',
  globalName: 'ERoadtripApp',
  outfile: 'dist/e-roadtrip.js',
  sourcemap: 'inline',
  define: { __EROADTRIP_VERSION__: JSON.stringify(version) },
  plugins: [phaserGlobal]
});
