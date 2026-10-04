import fs from 'node:fs';
import path from 'node:path';

const appRoot = path.resolve(import.meta.dirname, '..');
const projectRoot = path.resolve(appRoot, '..');
const roots = [path.join(projectRoot, 'slides'), path.join(appRoot, 'public', 'slides')];
const textExtensions = new Set(['.html', '.js', '.css', '.json', '.md', '.tsx', '.ts']);

const nameReplacements = [
  [/Luo\s*Xiaoshan\s*\(洛小山\)/gi, 'Fangpian'],
  [/Luo\s*Xiaoshan/gi, 'Fangpian'],
  [/LuoXiaoshan/gi, 'Fangpian'],
  [/뤄샤오산\s*\(洛小山\)/g, '팡피엔'],
  [/뤄샤오산/g, '팡피엔'],
  [/洛小山/g, '方片'],
  [/luoxiaoshan_ai/gi, 'fangpian'],
  [/luoxiaoshan/gi, 'fangpian'],
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function removeQrMarkup(text) {
  // Remove the home-page follow block, top-bar community QR shortcut, course sidebar QR,
  // and login-page community QR block in every language.
  text = text.replace(/\s*<section class="section qr-section">[\s\S]*?<\/section>\s*/g, '\n');
  text = text.replace(/\s*<a class="xa-group"[^>]*>[\s\S]*?<\/a>\s*/g, '\n');
  text = text.replace(/\s*<div class="sidebar-qr"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*/g, '\n');
  text = text.replace(/\s*<div class="qr-section">[\s\S]*?<\/div>\s*/g, '\n');

  // Remove direct QR images, QR scripts, and the deliberately drawn QR square in the safety lesson.
  text = text.replace(/\s*<img\b[^>]*src=["'][^"']*(?:qrcode|qr-code|group-qr|x-qr)[^"']*["'][^>]*>\s*/gi, '\n');
  text = text.replace(/\s*<script\b[^>]*src=["'][^"']*qr\.js[^"']*["'][^>]*><\/script>\s*/gi, '\n');
  text = text.replace(/\s*<span class="fake-qr"[^>]*><\/span>\s*/gi, '');
  text = text.replace(/\s*<img\b[^>]*src=["'][^"']*elder-scam-qr-poster-art[^"']*["'][^>]*>\s*/gi, '');

  // Remove QR generation from score-card canvases while retaining image export.
  text = text.replace(/\n\s*\/\*\s*(?:二维码|QR Code)\s*\*\/\s*\n\s*try\s*\{[\s\S]*?\}\s*catch\s*\(e\)\s*\{\s*\}\s*/gi, '\n');
  text = text.replace(/\n\s*\/\* 左下角：二维码[\s\S]*?\}\s*catch \(e\) \{[\s\S]*?\n\s*\}\s*\n\s*\/\* 引导语和落款[\s\S]*?\*\//g,
    '\n\n      /* 底部引导语和品牌落款 */');
  text = text.replace(/var footMax = W \* 0\.44, footY = qCardY \+ qCard \+ 38;/g,
    'var footMax = W * 0.44, footY = H - 118;');
  text = text.replace(/（带二维码）|（帶QR Code）|\s*\(with QR code\)/gi, '');

  return text;
}

let changedFiles = 0;
let renamedMentions = 0;
let qrFilesDeleted = 0;

for (const root of roots) {
  for (const file of walk(root)) {
    const base = path.basename(file).toLowerCase();
    const shouldDelete = base === 'qr.js'
      || /(?:^|[-_.])qrcode(?:[-_.]|$)/i.test(base)
      || /(?:^|[-_.])qr-code(?:[-_.]|$)/i.test(base)
      || base === 'elder-scam-qr-poster-art.jpg';

    if (shouldDelete) {
      fs.unlinkSync(file);
      qrFilesDeleted += 1;
      continue;
    }

    if (!textExtensions.has(path.extname(file).toLowerCase())) continue;
    const original = fs.readFileSync(file, 'utf8');
    let updated = original;
    for (const [pattern, replacement] of nameReplacements) {
      updated = updated.replace(pattern, (...args) => {
        renamedMentions += 1;
        return replacement;
      });
    }
    updated = removeQrMarkup(updated);
    if (updated !== original) {
      fs.writeFileSync(file, updated, 'utf8');
      changedFiles += 1;
    }
  }
}

// Clean project-maintenance metadata as well, so the retired name is absent from the project.
for (const file of [
  path.join(appRoot, 'scripts', 'remove-external-platform-buttons.mjs'),
  path.join(appRoot, 'reports', 'external-platform-buttons.json'),
]) {
  if (!fs.existsSync(file)) continue;
  const original = fs.readFileSync(file, 'utf8');
  let updated = original;
  for (const [pattern, replacement] of nameReplacements) updated = updated.replace(pattern, replacement);
  if (updated !== original) fs.writeFileSync(file, updated, 'utf8');
}

// Remove the global lesson QR banner and all of its initialization calls.
for (const root of roots) {
  const lessonFile = path.join(root, 'lesson.js');
  if (!fs.existsSync(lessonFile)) continue;
  const original = fs.readFileSync(lessonFile, 'utf8');
  let updated = original.replace(/\n\s*function initQrBar\(\)\s*\{[\s\S]*?\n\s*\}\n\n\s*if \(document\.readyState/,
    '\n\n  if (document.readyState');
  updated = updated.replace(/initReveal\(\);\s*initQrBar\(\);/g, 'initReveal();');
  if (updated !== original) fs.writeFileSync(lessonFile, updated, 'utf8');
}

const report = {
  generatedAt: new Date().toISOString(),
  changedFiles,
  renamedMentions,
  qrFilesDeleted,
};
fs.writeFileSync(path.join(appRoot, 'reports', 'author-and-qr-cleanup.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report));
