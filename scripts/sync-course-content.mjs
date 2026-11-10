import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';

const root = path.resolve('public/slides');
const write = process.argv.includes('--write');
const langs = ['zh', 'en', 'ko', 'tw', 'hk'];
const sourceFiles = new Map();
const pageInfo = new Map();
const records = [];
const failures = [];
const changes = [];
const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—', ndash: '–', hellip: '…', rarr: '→' };
function text(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, '')
    .replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (all, key) => key[0] === '#' ? String.fromCodePoint(key[1].toLowerCase() === 'x' ? parseInt(key.slice(2), 16) : parseInt(key.slice(1), 10)) : entities[key] ?? all).replace(/\s+/g, ' ').trim();
}
const quote = value => JSON.stringify(value);
const attr = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
function apply(source, edits) { for (const [a, b, value] of edits.sort((a, b) => b[0] - a[0])) source = source.slice(0, a) + value + source.slice(b); return source; }
function keyOf(node) { return node && (ts.isIdentifier(node) || ts.isStringLiteral(node)) ? node.text : ''; }
function field(node, name) { return node.properties?.find(prop => ts.isPropertyAssignment(prop) && keyOf(prop.name) === name); }
function walk(node, visit) { visit(node); ts.forEachChild(node, child => walk(child, visit)); }
function updateFile(name, source) {
  const target = path.join(root, name);
  if (fs.readFileSync(target, 'utf8') === source) return;
  changes.push(name);
  if (write) fs.writeFileSync(target, source);
}
function inspect(name) {
  if (pageInfo.has(name)) return pageInfo.get(name);
  const source = fs.readFileSync(path.join(root, name), 'utf8');
  const title = text(source.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '');
  const subtitle = text(source.match(/<p\b[^>]*class=["'][^"']*\bsubtitle\b[^"']*["'][^>]*>([\s\S]*?)<\/p>/i)?.[1] || '');
  const meta = source.match(/<meta\b[^>]*name=["']description["'][^>]*content=(["'])([\s\S]*?)\1[^>]*>/i)?.[2];
  let description = subtitle || text(meta || '') || title;
  const limit = /\.(en|ko)\.html$/.test(name) ? 420 : 240;
  if (description.length > limit) {
    const prefix = description.slice(0, limit);
    const stop = Math.max(prefix.lastIndexOf('。'), prefix.lastIndexOf('. '), prefix.lastIndexOf('！'), prefix.lastIndexOf('？'));
    description = stop > 40 ? prefix.slice(0, stop + 1) : prefix.trim() + '…';
  }
  const info = { title, description, subtitle };
  pageInfo.set(name, info);
  return info;
}

// User-facing strings inside interactive examples must match the neutralized article.
if (write) {
  for (const name of fs.readdirSync(root).filter(name => name.endsWith('.html') && !/^10-7(?:\.|\.html)/.test(name))) {
    let source = fs.readFileSync(path.join(root, name), 'utf8');
    const lang = name.match(/\.(en|ko|tw|hk)\.html$/)?.[1] || 'zh';
    const art = /^9-[123](?:\.|\.html)/.test(name);
    const replacement = lang === 'en' ? art ? 'example character' : 'example assistant' : lang === 'ko' ? art ? '예시 캐릭터' : '예시 도우미' : art ? '示例角色' : '示例助手';
    source = source.replace(/(<script\b([^>]*)>)([\s\S]*?)(<\/script>)/gi, (all, opening, attributes, body, closing) => {
      if (/\bsrc\s*=|application\/ld\+json|application\/json/.test(attributes)) return all;
      const parsed = ts.createSourceFile(name + '.js', body, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
      const edits = [];
      walk(parsed, node => {
        if (!(ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node))) return;
        const raw = body.slice(node.getStart(parsed), node.getEnd());
        if (!/Alice|小羊/.test(raw)) return;
        const value = raw.replaceAll('Alice', /A young woman named Alice/.test(raw) ? 'Mira' : replacement).replaceAll('小羊', '小火');
        edits.push([node.getStart(parsed), node.getEnd(), value]);
      });
      return opening + apply(body, edits) + closing;
    });
    updateFile(name, source);
  }
}

const overviews = {
  zh: '围绕真实问题练习补充背景、澄清提问、核验答案、阅读原文与检查理解。请在实际使用的 AI 工具中练习，学堂当前未接入对话式助教。',
  tw: '圍繞真實問題練習補充背景、澄清提問、核驗答案、閱讀原文與檢查理解。請在實際使用的 AI 工具中練習，學堂尚未接入對話式助教。',
  hk: '圍繞真實問題練習補充背景、澄清提問、核驗答案、閱讀原文與檢查理解。請在實際使用的 AI 工具中練習，學堂尚未接入對話式助教。',
  en: 'Practise providing context, clarifying questions, verifying answers, reading sources and checking understanding in the AI tool you use. The school’s conversational assistant is not connected.',
  ko: '실제 질문을 통해 배경 전달, 질문 구체화, 답변 검증, 원문 읽기와 이해 확인을 연습합니다. 사용하는 AI 도구에서 실습하세요. 학당 대화형 도우미는 연결되지 않았습니다.'
};
const learningTopics = { zh: ['提问与原文', '解释与追问', '核验与检查', '阅读与判断'], tw: ['提問與原文', '解釋與追問', '核驗與檢查', '閱讀與判斷'], hk: ['提問與原文', '解釋與追問', '核驗與檢查', '閱讀與判斷'], en: ['Questions and sources', 'Explanations and follow-up', 'Verification and checks', 'Reading and judgement'], ko: ['질문과 원문', '설명과 후속 질문', '검증과 점검', '읽기와 판단'] };
const sectionOverviews = {
  zh: { p3: '以虚构的内容生产助手为教学示例，学习视觉生成、工具调用、上下文、记忆、提示词组织、协作、权限与 MCP 集成。案例不代表方片已上线产品或真实项目业绩。', p7: '参考公开的 AI 协作规范与教学示例，练习流程控制、质量检查、文档沉淀、环境安全和清楚表达；将适用的方法整理成自己的工作规范。', 'p-cost': '围绕 Token 计量、价格边界、任务规模与上下文设计学习成本工程。通过教学示例比较不同优化方式；实际价格和成本需按使用时的服务配置核对。', 'p-exam': '按篇章进行练习、自测和综合复习，结合解析核对理解。最近的练习成绩保存在当前浏览器，尚未接入公司账号、个人中心或云端薄弱点分析。' },
  tw: { p3: '以虛構的內容生產助手為教學示例，學習視覺生成、工具呼叫、上下文、記憶、提示詞組織、協作、權限與 MCP 整合；不代表方片已上線產品或專案業績。', p7: '參考公開的 AI 協作規範與教學示例，練習流程、品質、文件、環境安全與清楚表達，整理成自己的工作規範。', 'p-cost': '透過教學示例學習 Token 計量、價格邊界、上下文設計與成本優化；實際價格需按使用時的服務設定核對。', 'p-exam': '按篇章進行練習、自測和綜合複習。成績保存在目前瀏覽器，尚未接入公司帳號、個人中心或雲端弱點分析。' },
  en: { p3: 'Use a fictional content assistant to explore images, tools, context, memory, prompts, collaboration, permissions and MCP. These examples are not launched Fangpian products or verified project results.', p7: 'Practise workflow control, quality checks, documentation, environment safety and clear communication using public AI collaboration guidelines and teaching examples.', 'p-cost': 'Explore token measurement, price boundaries, context design and cost optimization with teaching examples. Check actual prices against your current service configuration.', 'p-exam': 'Practise by chapter and review explanations. Recent scores remain in this browser; company accounts, a personal dashboard and cloud weakness analysis are not connected.' },
  ko: { p3: '가상의 콘텐츠 도우미로 이미지, 도구 호출, 맥락, 기억, 프롬프트, 협업, 권한과 MCP를 배웁니다. 실제 출시한 팡피엔 제품이나 실적을 뜻하지 않습니다.', p7: '공개 AI 협업 규칙과 교육 예제로 작업 흐름, 품질 확인, 문서화, 환경 안전과 명확한 소통을 연습합니다.', 'p-cost': '교육 예제로 Token 측정, 가격 구간, 맥락 설계와 비용 최적화를 배웁니다. 실제 가격은 사용 중인 서비스 설정으로 확인하세요.', 'p-exam': '단원별 연습과 해설로 이해를 확인합니다. 성적은 현재 브라우저에 저장되며 회사 계정·개인 대시보드·클라우드 취약점 분석은 연결되지 않았습니다.' }
};
sectionOverviews.hk = sectionOverviews.tw;
sectionOverviews.zh['p-seo'] = '通过课程来源项目的公开网站案例学习 SEO 与 GEO，区分搜索收录、内容可读性和来源核验。案例经历与流量不属于方片内部平台；内部学习平台的访问范围以公司安排为准。';
sectionOverviews.tw['p-seo'] = '透過課程來源專案的公開網站案例學習 SEO 與 GEO，區分搜尋收錄、內容可讀性和來源核驗。案例經歷與流量不屬於方片內部平台；存取範圍以公司安排為準。';
sectionOverviews.en['p-seo'] = 'Study SEO and GEO through public-website examples from the source course. Case histories and traffic are not Fangpian internal-platform results; internal access follows company arrangements.';
sectionOverviews.ko['p-seo'] = '원본 강좌의 공개 웹사이트 사례로 SEO와 GEO를 배웁니다. 사례 이력과 방문량은 팡피엔 내부 플랫폼의 실적이 아니며 내부 접근 범위는 회사 방침을 따릅니다.';
for (const lang of langs) {
  const suffix = lang === 'zh' ? '' : '.' + lang;
  const name = 'course-data' + suffix + '.js';
  const source = fs.readFileSync(path.join(root, name), 'utf8');
  const context = { window: {} };
  vm.runInNewContext(source, context, { timeout: 1000 });
  const course = context.window.COURSE;
  const lessons = course.parts.flatMap(part => part.topics.flatMap(topic => topic.lessons));
  const lookup = new Map();
  for (const lesson of lessons) {
    const localized = lesson.file.replace(/\.html$/, suffix + '.html');
    const actual = fs.existsSync(path.join(root, localized)) ? localized : lesson.file;
    const info = inspect(actual);
    if (!info.title) { failures.push({ file: actual, reason: 'Missing first h1' }); continue; }
    lookup.set(lesson.file, info);
    records.push({ language: lang, file: actual, title: info.title, description: info.description, titleChanged: lesson.title !== info.title, descriptionChanged: lesson.desc !== info.description, decision: '保留', review: '保留现有知识与交互；目录和简介以正文首标题及导语为准。本轮结构审查不等于逐页业务内容定稿。' });
    for (const prop of ['title', 'desc', ...(lesson.navTitle ? ['navTitle'] : [])]) {
      const expected = prop === 'desc' ? info.description : info.title;
      if (lesson[prop] !== expected && !write) failures.push({ file: actual, field: prop, expected, actual: lesson[prop] });
    }
  }
  const parsed = ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const edits = [];
  walk(parsed, node => {
    if (!ts.isObjectLiteralExpression(node)) return;
    const file = field(node, 'file');
    const info = file && ts.isStringLiteralLike(file.initializer) ? lookup.get(file.initializer.text) : null;
    if (info) {
      for (const key of ['title', 'desc', 'navTitle']) {
        const prop = field(node, key);
        if (prop) edits.push([prop.initializer.getStart(parsed), prop.initializer.getEnd(), quote(key === 'desc' ? info.description : info.title)]);
      }
    }
    const id = field(node, 'id');
    if (id && ts.isStringLiteralLike(id.initializer) && sectionOverviews[lang][id.initializer.text]) {
      const desc = field(node, 'desc');
      if (desc) edits.push([desc.initializer.getStart(parsed), desc.initializer.getEnd(), quote(sectionOverviews[lang][id.initializer.text])]);
    }
    if (id && ts.isStringLiteralLike(id.initializer) && id.initializer.text === 'p-learn') {
      const desc = field(node, 'desc');
      if (desc) edits.push([desc.initializer.getStart(parsed), desc.initializer.getEnd(), quote(overviews[lang])]);
      const topics = field(node, 'topics');
      if (topics && ts.isArrayLiteralExpression(topics.initializer)) {
        for (const [index, topic] of topics.initializer.elements.entries()) {
          if (!ts.isObjectLiteralExpression(topic)) continue;
          const list = field(topic, 'lessons')?.initializer;
          if (!list || !ts.isArrayLiteralExpression(list)) continue;
          const titles = list.elements.map(item => field(item, 'file')?.initializer?.text).map(file => lookup.get(file)?.title).filter(Boolean);
          const summary = field(topic, 'desc');
          if (summary && titles.length) edits.push([summary.initializer.getStart(parsed), summary.initializer.getEnd(), quote(titles.join('；'))]);
          const heading = field(topic, 'title');
          if (heading && learningTopics[lang][index]) edits.push([heading.initializer.getStart(parsed), heading.initializer.getEnd(), quote(learningTopics[lang][index])]);
        }
      }
    }
    const topicLessons = field(node, 'lessons')?.initializer;
    if (topicLessons && ts.isArrayLiteralExpression(topicLessons) && topicLessons.elements.some(item => ['9-0.html', 'seo-4.html'].includes(field(item, 'file')?.initializer?.text))) {
      const desc = field(node, 'desc');
      const file = topicLessons.elements.map(item => field(item, 'file')?.initializer?.text).find(file => file === '9-0.html' || file === 'seo-4.html');
      const first = lookup.get(file);
      if (desc && first) edits.push([desc.initializer.getStart(parsed), desc.initializer.getEnd(), quote(first.description)]);
    }
  });
  if (write) updateFile(name, apply(source, edits));
  sourceFiles.set(lang, lookup);
}

// Align browser/share metadata to the same canonical heading and synopsis.
for (const [name, info] of pageInfo) {
  let source = fs.readFileSync(path.join(root, name), 'utf8');
  source = source.replace(/<title>[\s\S]*?<\/title>/i, () => '<title>' + attr(info.title) + ' | AI学院</title>');
  if (!/<meta\b[^>]*name=["']description["']/i.test(source)) source = source.replace('</head>', () => '<meta name="description" content="' + attr(info.description) + '"></head>');
  source = source.replace(/<meta\b[^>]*(?:name|property)=["'](?:description|og:description|twitter:description|og:title|twitter:title)["'][^>]*>/gi, tag => {
    const title = /(?:og:title|twitter:title)/.test(tag);
    return tag.replace(/content=(["'])[\s\S]*?\1/i, () => 'content="' + attr(title ? info.title : info.description) + '"');
  });
  if (write) updateFile(name, source);
  else {
    const saved = fs.readFileSync(path.join(root, name), 'utf8');
    if (source !== saved) failures.push({ file: name, reason: 'Browser/share metadata differs from article' });
  }
}

for (const name of ['nav-inject.js', 'i18n.js']) {
  const source = fs.readFileSync(path.join(root, name), 'utf8');
  const parsed = ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const edits = [];
  function replace(node, value) {
    if (node.text === value) return;
    edits.push([node.getStart(parsed), node.getEnd(), quote(value)]);
    if (!write) failures.push({ file: name, reason: 'Cached navigation title differs', expected: value, actual: node.text });
  }
  walk(parsed, node => {
    if (name === 'nav-inject.js' && ts.isObjectLiteralExpression(node)) {
      const file = field(node, 'file')?.initializer;
      const title = field(node, 'title')?.initializer;
      const info = file?.text && sourceFiles.get('zh').get(file.text);
      if (info && title && ts.isStringLiteralLike(title)) replace(title, info.title);
    }
    if (name === 'i18n.js' && ts.isVariableDeclaration(node) && keyOf(node.name) === 'TITLES' && ts.isObjectLiteralExpression(node.initializer)) {
      for (const locale of node.initializer.properties) {
        const lookup = sourceFiles.get(keyOf(locale.name));
        if (!lookup || !ts.isPropertyAssignment(locale) || !ts.isObjectLiteralExpression(locale.initializer)) continue;
        for (const prop of locale.initializer.properties) {
          if (!ts.isPropertyAssignment(prop) || !ts.isStringLiteralLike(prop.initializer)) continue;
          const info = lookup.get(keyOf(prop.name));
          if (info) replace(prop.initializer, info.title);
        }
      }
    }
    if (name === 'i18n.js' && ts.isVariableDeclaration(node) && /^TITLES_(EN|KO|TW|HK)$/.test(keyOf(node.name)) && ts.isObjectLiteralExpression(node.initializer)) {
      const lang = keyOf(node.name).slice(7).toLowerCase();
      const lookup = sourceFiles.get(lang);
      for (const prop of node.initializer.properties) {
        if (!ts.isPropertyAssignment(prop) || !ts.isStringLiteralLike(prop.initializer)) continue;
        const info = lookup.get(keyOf(prop.name));
        if (info) replace(prop.initializer, info.title);
      }
    }
  });
  if (write) updateFile(name, apply(source, edits));
}

if (write) {
  const previous = fs.existsSync('reports/course-content-review.json') ? JSON.parse(fs.readFileSync('reports/course-content-review.json', 'utf8')) : {};
  const previousRows = new Map((previous.records || []).map(row => [row.language + ':' + row.file, row]));
  const baseline = new Map();
  for (const lang of langs) {
    const suffix = lang === 'zh' ? '' : '.' + lang;
    const source = execFileSync('git', ['show', 'HEAD:public/slides/course-data' + suffix + '.js'], { encoding: 'utf8' });
    const context = { window: {} }; vm.runInNewContext(source, context, { timeout: 1000 });
    baseline.set(lang, new Map(context.window.COURSE_FLAT.map(lesson => [lesson.file, lesson])));
  }
  for (const row of records) {
    const old = previousRows.get(row.language + ':' + row.file);
    const before = baseline.get(row.language).get(row.file.replace(/\.(en|ko|tw|hk)(?=\.html$)/, ''));
    row.titleChanged = row.titleChanged || old?.titleChanged || Boolean(before && before.title !== row.title);
    row.descriptionChanged = row.descriptionChanged || old?.descriptionChanged || Boolean(before && before.desc !== row.description);
  }
  const diff = execFileSync('git', ['-c', 'core.autocrlf=false', '-c', 'core.safecrlf=false', 'diff', '--unified=0', '--', 'public/slides/*.html'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
  const rewritten = new Set();
  let current = '';
  for (const line of diff.split('\n')) {
    if (line.startsWith('+++ b/public/slides/')) current = line.slice('+++ b/public/slides/'.length);
    if (/^-[^-].*(?:Alice|小羊|我开发|我的产品)/.test(line) && !/^10-7(?:\.|\.html)/.test(current)) rewritten.add(current);
  }
  const migration = JSON.parse(fs.readFileSync('reports/company-content-migration.json', 'utf8'));
  for (const name of Object.keys(migration.changed)) if (migration.changed[name] === '改写') rewritten.add(name);
  for (const row of records) if (rewritten.has(row.file)) { row.decision = '改写'; row.review = '移除旧产品身份或旧功能承诺，改为明确的教学示例；同步目录、导语及分享信息。'; }
  const auxiliary = [...rewritten].filter(file => !records.some(row => row.file === file)).map(file => ({ file, decision: '改写', review: '辅助教学页移除旧产品身份或未接入服务承诺。' }));
  auxiliary.push({ file: 'redesign-preview.html', decision: '下架', review: '旧设计预览不再开放，页面引导回当前员工学习路线。' });
  fs.writeFileSync('reports/course-content-review.json', JSON.stringify({ version: 1, scope: '五语言当前课程目录；正文第一标题和导语为内容元数据来源', boundary: '结构一致性检查与目标内容审查；未声称所有技术事实已逐页审定或通过第三方查重。普通示例人名 Alice、源码路径和技术引用不作为产品推广删除。', records, auxiliary, filesChanged: [...new Set([...(previous.filesChanged || []), ...changes])] }, null, 2) + '\n');
}
console.log(JSON.stringify({ mode: write ? 'write' : 'check', lessons: records.length, titleChanges: records.filter(row => row.titleChanged).length, descriptionChanges: records.filter(row => row.descriptionChanged).length, failures: failures.length, examples: failures.slice(0, 6), changedFiles: new Set(changes).size }, null, 2));
if (failures.length) process.exitCode = 1;
