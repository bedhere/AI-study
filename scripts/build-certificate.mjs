import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';

const robotRoot = 'public/slides/assets/robot/';
const lanyardSource = readFileSync('components/Lanyard/Lanyard.jsx', 'utf8');
const robotSource = readFileSync(robotRoot + 'robot-scene-source.mjs', 'utf8');
const names = new Set([...lanyardSource.matchAll(/THREE\.(\w+)/g)].map(match => match[1]));
const robotImports = robotSource.match(/import\s*\{([^}]+)\}\s*from 'three'/)[1];
for (const name of robotImports.split(',').map(name => name.trim()).filter(Boolean)) names.add(name);
// RoundedBoxGeometry's superclass is the only additional addon dependency.
names.add('BoxGeometry');
const exported = [...names].sort((a, b) => a.localeCompare(b)).join(', ');
await build({
  stdin: { contents: `import { ${exported} } from 'three'; window.FangpianThree = Object.freeze({ ${exported} });`, resolveDir: process.cwd() },
  outfile: 'public/slides/three-shared.js', bundle: true, format: 'iife', platform: 'browser', target: 'es2020', minify: true, legalComments: 'inline'
});
const sharedPlugin = {
  name: 'fangpian-shared-three',
  setup(builder) {
    builder.onResolve({ filter: /^three$/ }, () => ({ path: 'shared-three', namespace: 'fangpian' }));
    builder.onLoad({ filter: /.*/, namespace: 'fangpian' }, () => ({ contents: 'module.exports = window.FangpianThree;', loader: 'js' }));
  }
};
await build({ entryPoints: [robotRoot + 'robot-scene-source.mjs'], outfile: 'public/slides/robot-scene.js', bundle: true, plugins: [sharedPlugin], format: 'iife', platform: 'browser', target: 'es2020', minify: true, legalComments: 'inline' });
function fingerprint(file) {
  const bytes = readFileSync(file);
  return { bytes: bytes.length, gzipBytes: gzipSync(bytes).length, sha256: createHash('sha256').update(bytes).digest('hex') };
}
const robotManifest = JSON.parse(readFileSync(robotRoot + 'SOURCE.json'));
Object.assign(robotManifest.bundle, fingerprint('public/slides/robot-scene.js'));
robotManifest.sharedRuntime = { file: '../../three-shared.js', version: JSON.parse(readFileSync('node_modules/three/package.json')).version, ...fingerprint('public/slides/three-shared.js') };
writeFileSync(robotRoot + 'SOURCE.json', JSON.stringify(robotManifest, null, 2) + '\n');
await build({
  entryPoints: ['components/certificate/CertificateExperience.jsx'],
  outfile: 'public/slides/certificate-experience.js',
  bundle: true, format: 'iife', platform: 'browser', target: 'es2020', minify: true,
  banner: { js: '/*!\n' + readFileSync('components/Lanyard/LICENSE.react-bits.md', 'utf8') + '\n*/' },
  jsx: 'automatic', plugins: [sharedPlugin], legalComments: 'inline', define: { 'process.env.NODE_ENV': '"production"' }
});
const bundle = readFileSync('public/slides/certificate-experience.js');
writeFileSync('components/Lanyard/SOURCE.json', JSON.stringify({
  component: 'React Bits Lanyard JS-CSS',
  registry: 'https://reactbits.dev/r/Lanyard-JS-CSS.json',
  documentation: 'https://reactbits.dev/components/lanyard',
  source: 'User-supplied complete JSX/CSS attachment; adapted for this repository after reading the registry and docs.',
  license: 'MIT + Commons Clause License Condition v1.0; see LICENSE.react-bits.md',
  adaptations: ['Fangpian local completion certificate faces and logo', 'keyboard flip controls and static fallback', 'reduced motion and context recovery', 'offscreen/hidden pause and bounded pixel ratio'],
  three: JSON.parse(readFileSync('node_modules/three/package.json')).version,
  sharedRuntime: { file: '../../public/slides/three-shared.js', ...fingerprint('public/slides/three-shared.js') },
  bundle: { file: '../../public/slides/certificate-experience.js', bytes: bundle.length, gzipBytes: gzipSync(bundle).length, sha256: createHash('sha256').update(bundle).digest('hex') }
}, null, 2) + '\n');
console.log('Built certificate experience:', bundle.length, 'bytes;', gzipSync(bundle).length, 'gzip bytes');
