import fs from 'node:fs';
import path from 'node:path';

const assetRoot = process.argv[2];
if (!assetRoot || !fs.existsSync(assetRoot)) {
  console.error('Usage: node scripts/rebrand-fangpian.mjs <extracted-asset-directory>');
  process.exit(2);
}

const projectRoot = process.cwd();
const trees = [
  path.resolve(projectRoot, '..', 'slides'),
  path.resolve(projectRoot, 'public', 'slides'),
];
const extensions = /\.(?:html|js|css)$/i;
const assets = [
  'logo-yellow-square.webp',
  'logo-wordmark-black.webp',
  'logo-wordmark-yellow.webp',
  'logo-black-white.webp',
  'logo-white-black.webp',
  'tiger-ai-assistant.webp',
  'tiger-teacher-pointer.webp',
  'tiger-reading-seated.webp',
  'tiger-open-arms.webp',
  'tiger-thinking-seated.webp',
  'tiger-trophy-wave.webp',
  'tiger-stern-crossed-arms.webp',
  'tiger-wink-wave.webp',
];

const textReplacements = [
  [/小山学堂/g, '方片学堂'],
  [/小山學堂/g, '方片學堂'],
  [/Xiaoshan Academy/g, 'Fangpian Academy'],
  [/샤오산 아카데미/g, '팡피엔 아카데미'],
  [/米羊学 AI/g, '方片学堂'],
  [/米羊學 AI/g, '方片學堂'],
];

const assetReplacements = [
  [/https:\/\/img\.alice\.miyang\.cn\/xueai\/logo\.png\?imageMogr2\/thumbnail\/128x%3E\/format\/webp\/quality\/82/g, 'assets/fangpian/logo-yellow-square.webp'],
  [/assets\/logo\.png/g, 'assets/fangpian/logo-yellow-square.webp'],
  [/images\/brand\/logo\.webp/g, 'assets/fangpian/logo-yellow-square.webp'],
  [/assets\/login-hero\.(?:png|webp)/g, 'assets/fangpian/tiger-open-arms.webp'],
  [/assets\/notice-guard\.webp/g, 'assets/fangpian/tiger-stern-crossed-arms.webp'],
  [/assets\/poster-art\.webp/g, 'assets/fangpian/tiger-reading-seated.webp'],
  [/(?<![\w/-])alice-teacher\.png(?:\?[^'"\s)]*)?/g, 'assets/fangpian/tiger-ai-assistant.webp'],
  [/assets\/alice\.png/g, 'assets/fangpian/tiger-ai-assistant.webp'],
  [/images\/brand\/alice(?:-cover)?\.webp/g, 'assets/fangpian/tiger-ai-assistant.webp'],
];

const logoAltReplacements = [
  [/(<img\s+src="assets\/fangpian\/logo-yellow-square\.webp"\s+alt=")[^"]*(")/g, '$1方片学堂$2'],
];

function walk(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else files.push(absolute);
  }
  return files;
}

const counts = { filesChanged: 0, replacements: {} };
for (const tree of trees) {
  const targetAssets = path.join(tree, 'assets', 'fangpian');
  fs.mkdirSync(targetAssets, { recursive: true });
  for (const name of assets) fs.copyFileSync(path.join(assetRoot, name), path.join(targetAssets, name));

  for (const file of walk(tree).filter((candidate) => extensions.test(candidate))) {
    const original = fs.readFileSync(file, 'utf8');
    let updated = original;
    for (const [pattern, replacement] of [...textReplacements, ...assetReplacements, ...logoAltReplacements]) {
      const before = updated;
      updated = updated.replace(pattern, replacement);
      const delta = before === updated ? 0 : (before.match(pattern) || []).length;
      if (delta) counts.replacements[replacement] = (counts.replacements[replacement] || 0) + delta;
    }
    updated = updated.replace(
      /<link rel="icon" href="assets\/favicon\.ico" type="image\/x-icon">/g,
      '<link rel="icon" href="assets/fangpian/logo-yellow-square.webp" type="image/webp">',
    );
    if (updated !== original) {
      fs.writeFileSync(file, updated, 'utf8');
      counts.filesChanged += 1;
    }
  }
}

fs.mkdirSync(path.resolve(projectRoot, 'reports'), { recursive: true });
fs.writeFileSync(
  path.resolve(projectRoot, 'reports', 'fangpian-rebrand.json'),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), ...counts, assets }, null, 2)}\n`,
  'utf8',
);
console.log(JSON.stringify(counts));
