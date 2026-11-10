import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve('public/slides');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const samples=[
 ['academy-knowledge.html','AI 能帮忙，也需要你来判断','知识讲解','理解 AI 草稿、事实核验与人工判断的分工，用一次分享资料整理练习建立基础。',`
 <h2>先分清三件事</h2><p>模型生成的是基于输入与训练形成的输出。流畅的表达不等于有依据的事实；要求它给来源，也不保证来源真实存在。</p><div class="academy-important"><strong>关键判断：</strong>能生成内容，不等于内容已经可以发布。涉及人物、日期、数据和引用时，要回到原始材料核对。</div>
 <h2>把一项工作拆成三步</h2><div class="academy-step"><h3>材料准备</h3><p>给出已获准使用的资料、任务目标和输出格式。不输入客户隐私或未经允许的内部资料。</p></div><div class="academy-step"><h3>AI 起草</h3><p>让 AI 整理信息、列出候选表达，并标注资料不足的部分。优先让它引用你给出的材料段落。</p></div><div class="academy-step"><h3>人工判断</h3><p>核对事实、表达和用途。保留你修改的原因，最终由实际使用结果的人检查与负责。</p></div>
 <h2>试着判断这份草稿</h2><p>虚构练习材料：“读书小组周五 15:00 举办资料整理分享，主题为资料整理，不对外开放。”</p><p>AI 草稿：“本周五 15:00，行业第一的 AI 大会免费向所有人开放！”</p><details><summary>展开核验结果</summary><p>时间来自材料；“行业第一”“大会”“免费”“向所有人开放”没有材料支持或与材料矛盾。可改为：“本周五 15:00，读书小组开展资料整理分享。”</p></details>
 <h2>完成标准</h2><p>能指出至少两处无依据的表述，并用原始资料写出一条准确通知。继续学习：<a href="academy-practice.html">业务实操</a>。</p><p>参考：<a href="https://developers.openai.com/api/docs/guides/prompt-engineering" target="_blank" rel="noopener noreferrer">OpenAI 提示词工程文档</a>。本课不限定工具品牌。</p>`],
 ['academy-practice.html','用 AI 把学习资料整理成三版分享通知','业务实操','围绕一份虚构活动简报，完成材料输入、提示词、三版草稿和人工验收，不依赖付费工具。',`
 <h2>任务与原始材料</h2><p>你要为一场小组分享写分享通知。以下为虚构教学素材，不对应任何真实活动。</p><blockquote>主题：AI 帮我整理工作资料；时间：周五 15:00；对象：读书小组成员；内容：资料归类、摘要核验、经验交流；报名方式：待确认。</blockquote>
 <h2>交付前先写清标准</h2><ul><li>三版开场，每版 40—60 个汉字。</li><li>分别采用问题、场景、直接通知三种表达方式。</li><li>时间、对象和主题准确，不添加效果承诺，不编造报名链接。</li></ul>
 <h2>复制后在你使用的 AI 工具中练习</h2><pre id="practicePrompt">请仅根据以下简报写三版分享通知，每版40—60个汉字，分别采用问题、场景、直接通知三种方式。不得新增数据、荣誉、效果承诺或报名链接。缺失信息标注“待确认”。输出表格：表达方式｜开场｜对应材料｜待确认事项。
简报：主题为“AI帮我整理工作资料”，周五15:00，读书小组成员参加，内容包括资料归类、摘要核验、经验交流，报名方式待确认。</pre><button class="academy-button" type="button" id="copyPractice">复制提示词</button><p id="copyFeedback" class="academy-feedback" role="status"></p>
 <h2>参考结果与核验</h2><p>问题式示例：“资料太多，不知从哪整理？本周五15:00，来小组分享一起练习资料归类与摘要核验，再交流各自经验。报名方式待确认。”</p><p>这只是可修改的教学草稿，不保证每次模型输出相同。逐项核对字数、事实、受众与待确认事项；不符合标准时，将具体问题反馈给 AI 后重新检查。</p><div class="academy-important"><strong>发布前检查：</strong>报名方式未确认时不得虚构链接；小组分享不得改写成面向公众的活动。</div>
 <h2>完成标准</h2><p>保存一版你认可的开场及人工修改说明。接着进入<a href="academy-review.html">练习复盘</a>检查理解。</p><script src="academy-samples.js" defer></script>`],
 ['academy-review.html','交付前的核验：三道练习与一次复盘','练习复盘','用三道情境题练习核验、资料边界和责任判断，再检查自己的实操结果。',`
 <form id="academyQuiz"><fieldset><legend>1. AI 把小组分享写成对所有人开放，该怎么办？</legend><label><input type="radio" name="q1" value="a" required>表达更吸引人，直接采用</label><label><input type="radio" name="q1" value="b">回到原始材料，改回读书小组成员参加</label></fieldset><fieldset><legend>2. 报名链接没有提供，最适合怎么处理？</legend><label><input type="radio" name="q2" value="a" required>标记待确认，向活动负责人核实</label><label><input type="radio" name="q2" value="b">让 AI 猜一个看起来真实的链接</label></fieldset><fieldset><legend>3. AI 帮你完成草稿后，交付前谁应检查？</legend><label><input type="radio" name="q3" value="a" required>模型回答很肯定，可以省略检查</label><label><input type="radio" name="q3" value="b">实际使用结果的人按验收标准检查</label></fieldset><button class="academy-button" type="submit">查看解析</button><p id="quizFeedback" class="academy-feedback" role="status" aria-live="polite"></p><div id="quizExplanations" hidden><h2>逐题解析</h2><ol><li>选第二项：受众是事实，不能因营销表达而改变。</li><li>选第一项：缺失信息应核实，不能靠生成补齐。</li><li>选第二项：工具加速起草，人核对并承担使用责任。</li></ol></div></form>
 <h2>给自己的交付做一次复盘</h2><div class="academy-check"><label><input type="checkbox">每项事实都能对应到材料</label><label><input type="checkbox">缺失信息已标记，未编造</label><label><input type="checkbox">受众、格式、字数符合任务</label><label><input type="checkbox">能说清至少一处人工修改的原因</label></div><p>勾选仅用于本页自查，不计入练习成绩。课程完成仍使用阅读器原有的“学会了”按钮。</p><script src="academy-samples.js" defer></script>`]
];
for(const [file,title,type,desc,body] of samples){
 fs.writeFileSync(path.join(root,file),`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | AI学院</title><meta name="description" content="${desc}"><link rel="icon" href="assets/fangpian/logo-yellow-square.webp"><script src="theme-bridge.js"></script><link rel="stylesheet" href="lesson.css"><link rel="stylesheet" href="academy-brand.css?v=20261110p0"></head><body><article class="lesson" data-academy-template="${type}"><header class="lesson-header"><p>AI学院 · ${type}</p><h1>${title}</h1><p class="subtitle">${desc}</p></header>${body}<nav class="academy-sample-links" aria-label="样板课程">${samples.map(([f,t,k])=>`<a href="${f}">${k}</a>`).join('')}</nav></article><script src="lesson.js"></script><script src="nav-inject.js"></script></body></html>`);
}
const dataFile=path.join(root,'course-data.js');let data=fs.readFileSync(dataFile,'utf8');
if(!data.includes("id: 't-academy'"))data=data.replace(/(id: 'p-start',[\s\S]*?topics:\s*\[)/,`$1\n      {id: 't-academy', title: '把 AI 用进工作', desc: '先理解，再实操，最后复盘。三节通用教学样板。', lessons: ${JSON.stringify(samples.map(([file,title,type,desc])=>({file,title,desc,tag:type==='业务实操'?'实战':'概念'}))) }},`);
fs.writeFileSync(dataFile,data);
let aiti=fs.readFileSync(path.join(root,'aiti.html'),'utf8');aiti=aiti.replace(/<svg viewBox="0 0 32 32">[\s\S]*?<\/svg>/,'<img src="assets/fangpian/logo-yellow-square.webp" width="32" height="32" alt="">');fs.writeFileSync(path.join(root,'aiti.html'),aiti);
const home=path.join(root,'home.html');let h=fs.readFileSync(home,'utf8');h=h.replaceAll('打好 AI 基础','全员拥抱 AI').replace('做出能商业化的','把 AI 用进').replace('AI 产品</span>','真实工作</span>').replace('系统掌握 AI 产品的设计、开发与商业化方法，用 AI 创造真正的价值。','从内容创作、运营提效到技术共创，让每位同事都能把 AI 用进真实工作。');fs.writeFileSync(home,h);
const icons={knowledge:'<path d="M18 20h25c8 0 11 4 11 10v49c-4-5-8-7-14-7H18Z"/><path d="M90 20H65c-8 0-11 4-11 10v49c4-5 8-7 14-7h22Z"/>',practice:'<rect x="18" y="25" width="72" height="54" rx="10"/><path d="m30 45 12 10-12 10m22 0h22M40 25v-8h28v8"/>',review:'<path d="M80 56v28H24V20h40"/><path d="m42 43 12 12 30-30M38 70h28"/>'};
const riskRules=[
 ['原作者/项目经历',/我(?:曾|开发|上线|做了|的产品|的项目)|我们(?:给全站|上线|开发|团队)|my (?:product|startup)|our (?:startup|product)|原作者|案例站点|來源專案|source (?:course|project)/gi],
 ['时效性事实',/最新|价格|定价|每百万|\$\s*\d|pricing|latest|價格|가격/gi],
 ['绝对化表述',/百分之百|永远不会|绝对不会|保证(?:正确|成功)|零幻觉|100%\s*(?:准确|正确)|never (?:fails|hallucinates)/gi],
];
const records=[]; const langs=['zh','en','ko','tw','hk'];
for(const lang of langs){const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'course-data'+(lang==='zh'?'':'.'+lang)+'.js'),'utf8'),ctx);
 for(const lesson of ctx.window.COURSE_FLAT){let file=lesson.file.replace(/\.html$/,(lang==='zh'?'':'.'+lang)+'.html');if(!fs.existsSync(path.join(root,file)))file=lesson.file;const p=path.join(root,file);let source=fs.readFileSync(p,'utf8');const original=source;
 const plain=source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ');
 const flags=riskRules.flatMap(([kind,re])=>[...plain.matchAll(re)].slice(0,4).map(m=>({kind,excerpt:plain.slice(Math.max(0,m.index-35),m.index+100)})));
 const sample=samples.find(s=>s[0]===file);const type=sample?.[2]||(/exam|quiz/.test(file)?'练习复盘':/案例|实战|练习/.test(lesson.tag||'')?'业务实操':'知识讲解');const icon=type==='练习复盘'?'review':type==='业务实操'?'practice':'knowledge';
 const label=lang==='en'?'AI Academy · Fangpian learning':lang==='ko'?'AI学院 · 함께 배우는 AI': 'AI学院 · 方片全员学习';
 const cover=`<div class="academy-cover" data-academy-cover="${icon}"><div><strong>${esc(lesson.title)}</strong><p>${label}</p></div><svg viewBox="0 0 108 108" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="104" height="104" rx="24" fill="var(--accent-soft)" stroke="none"/>${icons[icon]}</svg></div>`;
 if(!source.includes('data-academy-cover='))source=source.replace(/<\/h1>/i,'</h1>'+cover);
 if(flags.length && !source.includes('data-academy-review=')){
 const notes=lang==='en'?'Teaching examples and source-project experiences are not Fangpian product claims. Check model versions, availability and prices against current official documentation before use.':lang==='ko'?'교육 예제와 원본 프로젝트 경험은 팡피엔의 실적을 뜻하지 않습니다. 모델 버전, 이용 가능 여부와 가격은 공식 문서에서 확인하세요.':lang==='tw'||lang==='hk'?'本課保留技術教學內容。來源專案的經歷與數據不代表方片實績；涉及模型版本、服務價格及供應情況，使用前請核對官方資料。':'本课保留技术教学内容。来源项目的经历与数据不代表方片实绩；涉及模型版本、服务价格及供应情况，使用前请核对官方资料。';
 source=source.replace('</h1>','</h1><aside class="academy-review-note" data-academy-review="reference">'+notes+'</aside>');
 }
 if(source!==original)fs.writeFileSync(p,source);
 records.push({language:lang,file,title:lesson.title,template:type,screening:'已完成文本风险扫描',editorial:sample?'本轮新编教学样板已核对任务与解析':'保留原技术内容，风险项按清单继续核验',businessApproval:sample?'通用虚构案例，不代表内部流程':'未签核',flags});
 }
}
const summary={records:records.length,flagged:records.filter(r=>r.flags.length).length,newSamples:samples.length,byLanguage:Object.fromEntries(langs.map(l=>[l,records.filter(r=>r.language===l).length]))};
fs.writeFileSync('reports/academy-editorial-review.json',JSON.stringify({date:'2026-11-10',boundary:'逐页文本筛查，不冒充逐项技术事实核验、业务签核或第三方查重；保留必要技术引用及开源署名。',summary,records},null,2)+'\n');
console.log(summary);
