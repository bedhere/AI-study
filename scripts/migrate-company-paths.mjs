import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve('public/slides');
const context = { URLSearchParams };
vm.runInNewContext(fs.readFileSync(path.join(root, 'company-paths.js'), 'utf8'), context);
const paths = context.FangpianPaths;
const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const changed = [];
for (const lang of ['zh', 'en', 'ko', 'tw', 'hk']) {
  const suffix = lang === 'zh' ? '' : '.' + lang;
  const data = paths.localized(lang);
  const reader = 'learn' + suffix + '.html';
  const fileFor = file => file.replace('.html', suffix + '.html');
  const cards = data.roles.map(role => `<a class="company-path-card" data-company-role="${role.id}" href="${reader}?route=${role.id}#${fileFor(role.start)}" target="_top"><div class="company-path-top"><div class="company-path-name"><h3>${esc(role.name)}</h3><p>${esc(role.audience)}</p></div><img src="assets/fangpian/${role.image}" alt="" width="112" height="108" loading="lazy" decoding="async"></div><p class="company-path-desc">${esc(role.description)}</p><ul class="company-path-tags">${role.tags.map(tag => '<li>' + esc(tag) + '</li>').join('')}</ul><span class="company-path-action">${esc(role.action)}${arrow}</span></a>`).join('\n');
  const note = `<p class="company-path-note">${esc(data.note)} <a class="company-path-all" href="${reader}?route=all" target="_top">${esc(data.all)}</a></p>`;
  const home = path.join(root, 'home' + suffix + '.html');
  let html = fs.readFileSync(home, 'utf8');
  const section = `<section class="section company-paths-section" id="who"><div class="wrap"><div class="sec-head"><div class="label">${esc(data.label)}</div><h2>${esc(data.title)}</h2><p>${esc(data.intro)}</p></div><div class="company-paths-grid">${cards}</div>${note}</div></section>`;
  html = html.replace(/<section\b[^>]*id="who"[^>]*>[\s\S]*?<\/section>/, section);
  if (!html.includes('company-paths.css')) html = html.replace('</head>', '<link rel="stylesheet" href="company-paths.css?v=20261109b">\n</head>');
  fs.writeFileSync(home, html); changed.push(path.basename(home));

  const name = 'roadmap' + suffix + '.html';
  const back = lang === 'en' ? 'Back to school' : lang === 'ko' ? '학당으로 돌아가기' : lang === 'zh' ? '返回学堂' : '返回學堂';
  const outcomeTitle = lang === 'en' ? 'What to put into practice' : lang === 'ko' ? '학습 후 실천할 과제' : lang === 'zh' ? '每条路线，先完成一个真实任务' : '每條路線，先完成一個真實任務';
  const roadmap = `<!doctype html><html lang="${lang === 'zh' ? 'zh-CN' : lang === 'tw' || lang === 'hk' ? 'zh-Hant' : lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(data.title)} | 方片学堂</title><meta name="description" content="${esc(data.intro)}"><link rel="icon" href="assets/fangpian/logo-yellow-square.webp"><script src="theme-bridge.js?v=20260816k"></script><link rel="stylesheet" href="lesson.css?v=20260827a"><link rel="stylesheet" href="company-paths.css?v=20261109b"><script src="/slides/external-platform-policy.js"></script></head><body><main class="company-path-map"><header><a class="company-path-back" href="home${suffix}.html" target="_top">${back}</a><h1>${esc(data.title)}</h1><p class="subtitle">${esc(data.intro)}</p></header><div class="company-paths-grid">${cards}</div>${note}<section class="company-path-outcomes"><h2>${outcomeTitle}</h2>${data.roles.map(role => '<p><strong>' + esc(role.name) + '</strong>：' + esc(role.outcome) + '</p>').join('')}</section></main><script src="i18n.js?v=20260903a"></script><script src="lesson.js"></script><script src="nav-inject.js?v=20261109b"></script></body></html>\n`;
  fs.writeFileSync(path.join(root, name), roadmap); changed.push(name);

  const readerPath = path.join(root, reader);
  html = fs.readFileSync(readerPath, 'utf8');
  if (!html.includes('src="company-paths.js')) html = html.replace(/(<script src="course-data[^>]+><\/script>)/, '$1\n<script src="company-paths.js?v=20261109b"></script>');
  html = html.replace(/var ROUTE_ALL = \[[^\]]+\];/, "var ROUTE_ALL = ['use', 'pro', 'build'];");
  html = html.replace(/var ROUTE_OPTS = \[[\s\S]*?\];/, 'var ROUTE_OPTS = ' + JSON.stringify([{ v: 'all', label: data.all }, ...data.roles.map(role => ({ v: role.id, label: role.name }))]) + ';');
  html = html.replace(/(?:var routeQueryApplied = false;\s*)?function savedRoute\(\)\{[\s\S]*?\n  \}/, `var routeQueryApplied = false;
  function savedRoute(){
    var storage; try { storage = localStorage; } catch(error) { storage = null; }
    var selected = window.FangpianPaths.choice(routeQueryApplied ? '' : location.search, storage);
    routeQueryApplied = true;
    return selected;
  }`);
  const save = "try{ localStorage.setItem(ROUTE_KEY, JSON.stringify(routeSel.value)); }catch(e){}";
  if (!html.includes('roleURL.searchParams')) html = html.replace(save, save + "\n      var roleURL = new URL(location.href); roleURL.searchParams.set('route', routeSel.value); history.replaceState(null, '', roleURL.href);");
  fs.writeFileSync(readerPath, html); changed.push(reader);
}
console.log(JSON.stringify({ updated: changed }, null, 2));
