import fs from 'node:fs';
import path from 'node:path';

const mode = process.argv[2];
if (!['--check', '--write'].includes(mode)) {
  console.error('Usage: node scripts/remove-external-platform-buttons.mjs --check|--write');
  process.exit(2);
}

const projectRoot = process.cwd();
const trees = [
  { name: 'deploy', root: path.resolve(projectRoot, 'public', 'slides') },
];
const policyTag = '<script src="/slides/external-platform-policy.js"></script>';

function categoryFor(rawHref) {
  let url;
  try {
    url = new URL(rawHref.replaceAll('&amp;', '&'));
  } catch {
    return null;
  }
  const host = url.hostname.toLowerCase();
  const pathname = url.pathname.replace(/\/+$/, '') || '/';
  if (host === 'alice.miyang.cn' || host === 'alice.fans') return 'Alice 推广与下载';
  if (host === 'watcha.cn' || host.endsWith('.watcha.cn')) return '观猹评分与评价';
  if (host === 'miyang.cn' || host === 'www.miyang.cn') return '米羊账号与官网';
  if (host === 'fangpian.cn' || host === 'www.fangpian.cn') return '作者个人网站';
  if (host === 'github.com' && pathname.startsWith('/itshen/learn-ai')) return 'GitHub 项目';
  if ((host === 'x.com' || host === 'twitter.com') && pathname.startsWith('/Fangpian_ai')) return '作者社交账号';
  if (host === 'beian.miit.gov.cn') return '备案网站';
  return null;
}

function plainText(html) {
  return html
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, '')
    .replace(/<img\b[^>]*>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp|rarr|larr|middot);/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function filesUnder(root) {
  const found = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) found.push(...filesUnder(absolute));
    else if (/\.(?:html|js)$/i.test(entry.name)) found.push(absolute);
  }
  return found;
}

function removeBlockedAnchors(content, relativeFile, records) {
  const lower = content.toLowerCase();
  let cursor = 0;
  let output = '';
  while (cursor < content.length) {
    const start = lower.indexOf('<a', cursor);
    if (start < 0) {
      output += content.slice(cursor);
      break;
    }
    const boundary = lower[start + 2];
    if (boundary && !/[\s>]/.test(boundary)) {
      output += content.slice(cursor, start + 2);
      cursor = start + 2;
      continue;
    }
    const openEnd = lower.indexOf('>', start + 2);
    const closeStart = openEnd < 0 ? -1 : lower.indexOf('</a>', openEnd + 1);
    if (openEnd < 0 || closeStart < 0) {
      output += content.slice(cursor);
      break;
    }
    const opening = content.slice(start, openEnd + 1);
    const hrefMatch = opening.match(/\bhref\s*=\s*(['"])(https?:\/\/[^'"<>]+)\1/i);
    const whole = content.slice(start, closeStart + 4);
    const category = hrefMatch ? categoryFor(hrefMatch[2]) : null;
    output += content.slice(cursor, start);
    if (category) {
      records.push({
        file: relativeFile,
        category,
        href: hrefMatch[2].replaceAll('&amp;', '&'),
        label: plainText(whole),
      });
    } else {
      output += whole;
    }
    cursor = closeStart + 4;
  }
  return output;
}

function scanAndOptionallyWrite(tree) {
  const records = [];
  let htmlWithoutPolicy = 0;
  for (const file of filesUnder(tree.root)) {
    const original = fs.readFileSync(file, 'utf8');
    const relativeFile = path.relative(tree.root, file).replaceAll('\\', '/');
    let updated = removeBlockedAnchors(original, relativeFile, records);

    if (/\.html$/i.test(file) && !updated.includes(policyTag)) {
      htmlWithoutPolicy += 1;
      if (mode === '--write') {
        updated = updated.includes('</head>')
          ? updated.replace('</head>', `  ${policyTag}\n</head>`)
          : `${policyTag}\n${updated}`;
      }
    }
    if (mode === '--write' && updated !== original) fs.writeFileSync(file, updated, 'utf8');
  }
  return { records, htmlWithoutPolicy };
}

const results = trees.map((tree) => ({ ...tree, ...scanAndOptionallyWrite(tree) }));
const source = results.find((result) => result.name === 'deploy');

if (mode === '--write') {
  const byCategory = Object.fromEntries(
    [...new Set(source.records.map((record) => record.category))]
      .sort((a, b) => a.localeCompare(b, 'zh-CN'))
      .map((category) => [category, source.records.filter((record) => record.category === category).length]),
  );
  fs.mkdirSync(path.resolve(projectRoot, 'reports'), { recursive: true });
  fs.writeFileSync(
    path.resolve(projectRoot, 'reports', 'external-platform-buttons.json'),
    `${JSON.stringify({ generatedAt: new Date().toISOString(), total: source.records.length, byCategory, records: source.records }, null, 2)}\n`,
    'utf8',
  );
  console.log(`Removed ${source.records.length} source buttons and ${results.find((result) => result.name === 'deploy').records.length} deploy mirrors.`);
  process.exit(0);
}

const remaining = results.reduce((sum, result) => sum + result.records.length + result.htmlWithoutPolicy, 0);
if (remaining > 0) {
  for (const result of results) {
    console.error(`${result.name}: ${result.records.length} classified buttons, ${result.htmlWithoutPolicy} HTML files without policy`);
  }
  process.exit(1);
}
console.log('0 classified external platform buttons remain');
