import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
function navigation(){
  const opened=[],handlers={};
  const context={URL,location:{href:'http://localhost/slides/home.html',origin:'http://localhost'},window:{open:url=>{opened.push(url);return {}}},document:{readyState:'complete',documentElement:null,addEventListener:(name,fn)=>handlers[name]=fn},MutationObserver:class{observe(){}}};
  vm.runInNewContext(fs.readFileSync('public/slides/external-platform-policy.js','utf8'),context);
  return {policy:context.window.AcademyNavigationPolicy,opened,handlers,window:context.window};
}
test('closed navigation allows the reader and generated image downloads while blocking outside origins',()=>{
  const {policy}=navigation();
  for(const path of ['/slides/learn.html#zero-3.html','#gallery','home.html','http://localhost/slides/exam.html','about:blank'])assert.equal(policy.allowed(path),true,path);
  for(const path of ['https://outside.example','//outside.example','mailto:a@example.com','javascript:alert(1)','data:text/html,test','/jd'])assert.equal(policy.allowed(path),false,path);
  assert.equal(policy.allowed('data:image/png;base64,abcd',true),true);
  assert.equal(policy.allowed('data:image/png;base64,abcd'),false);
  assert.equal(policy.allowed('blob:http://localhost/example',true),true);
  assert.equal(policy.allowed('blob:https://outside.example/example',true),false);
});
test('scripted popups and late external links cannot bypass the navigation guard',()=>{
  const {opened,handlers,window}=navigation();
  assert.equal(window.open('https://outside.example','_blank'),null);assert.equal(opened.length,0);
  window.open('/slides/home.html');assert.equal(opened[0],'http://localhost/slides/home.html');
  const attrs={href:'https://outside.example',onclick:'unsafe()',target:'_blank'};
  const link={getAttribute:key=>attrs[key]??null,hasAttribute:key=>key in attrs,matches:()=>false,removeAttribute:key=>delete attrs[key],setAttribute:(key,value)=>attrs[key]=value};
  let prevented=false,stopped=false;
  handlers.click({target:{closest:()=>link},preventDefault(){prevented=true},stopImmediatePropagation(){stopped=true}});
  assert.equal(prevented,true);assert.equal(stopped,true);assert.equal(attrs.href,undefined);assert.equal(attrs.onclick,undefined);
  assert.equal(link.hasAttribute('data-source-reference'),true);
});
test('all accepted illustrated lessons have exactly four accessible panels with small local assets',()=>{
  const context={window:{}};vm.runInNewContext(fs.readFileSync('public/slides/comic-data.js','utf8'),context);
  const additions=fs.readdirSync('docs').filter(name=>/^comic-complete-.+\.json$/.test(name)).map(name=>JSON.parse(fs.readFileSync('docs/'+name,'utf8'))).filter(plan=>plan.status?.startsWith('accepted'));
  const expectedCount=62+additions.reduce((count,plan)=>count+plan.lessons.length,0);
  const stories=context.window.AcademyComics;assert.equal(Object.keys(stories).length,expectedCount);
  const manifest=JSON.parse(fs.readFileSync('public/slides/assets/comics/manifest.json','utf8'));
  assert.equal(new Set(manifest.assets.map(x=>x.slug)).size,expectedCount);
  assert.equal(manifest.assets.length,expectedCount);
  const plan=JSON.parse(fs.readFileSync('docs/comic-rollout-20261111.json','utf8'));
  assert.deepEqual(plan.lessons.map(x=>x.file),[1,2,4,5,6,7,8,9,10,11].map(n=>`learn-${n}.html`));
  for(const lesson of plan.lessons){
    const story=stories[lesson.file];assert.ok(story,lesson.file);
    assert.equal(story.slug,lesson.slug);
    assert.equal(JSON.stringify(story.panels),JSON.stringify(lesson.panels));
    const entry=manifest.assets.find(x=>x.slug===story.slug);
    assert.equal(entry.lesson,lesson.file);assert.equal(entry.panelCount,4);
    assert.ok(entry.sourceSha256.match(/^[a-f0-9]{64}$/));
  }
  const expansion=JSON.parse(fs.readFileSync('docs/comic-expansion-50-20261111.json','utf8'));
  assert.equal(expansion.lessons.length,50);
  assert.equal(new Set(expansion.lessons.map(x=>x.file)).size,50);
  for(const lesson of expansion.lessons){
    const story=stories[lesson.file];assert.ok(story,lesson.file);
    assert.equal(story.slug,lesson.slug);
    assert.equal(JSON.stringify(story.panels),JSON.stringify(lesson.panels));
    const entry=manifest.assets.find(x=>x.slug===story.slug);
    assert.equal(entry.batch,expansion.batchId);assert.equal(entry.panelCount,4);
  }
  const additionalFiles=additions.flatMap(plan=>plan.lessons.map(x=>x.file));
  assert.equal(new Set(additionalFiles).size,additionalFiles.length);
  for(const plan of additions)for(const lesson of plan.lessons){
    const story=stories[lesson.file];assert.ok(story,lesson.file);
    assert.equal(story.slug,lesson.slug);
    assert.equal(JSON.stringify(story.panels),JSON.stringify(lesson.panels));
    const entry=manifest.assets.find(x=>x.slug===story.slug);
    assert.equal(entry.batch,plan.batchId);assert.equal(entry.panelCount,4);
  }
  for(const [file,story] of Object.entries(stories)){
    assert.equal(story.panels.length,4);let bytes=0;
    story.panels.forEach((panel,index)=>{assert.ok(panel.alt&&panel.text&&panel.label);bytes+=fs.statSync(`public/slides/assets/comics/${story.slug}-${index+1}.webp`).size;});
    assert.ok(bytes<250*1024);const page=fs.readFileSync('public/slides/'+file,'utf8');
    assert.ok(page.includes('data-lesson-comic="'+file+'"'));assert.ok(page.includes('<noscript>'));assert.ok(!page.includes('class="academy-cover"'));
    const position=page.indexOf('data-lesson-comic=');
    const container=page.match(/<(article|main|div)\b[^>]*class="(?:lesson|slide-container|company-path-map)/);
    assert.ok(container);
    assert.ok(position>page.indexOf('</head>')&&position>container.index);
    assert.ok(position<(container[1]==='div'?page.lastIndexOf('</div>'):page.indexOf('</'+container[1]+'>')));
    assert.equal((page.match(/data-lesson-comic=/g)||[]).length,1);
    const firstHeader=additions.flatMap(plan=>plan.lessons).find(lesson=>lesson.file===file)?.insertionAnchor==='first-header-end';
    const summary=[...page.matchAll(/<(aside|div)\b[^>]*class="([^"]+)"[^>]*>[\s\S]*?<\/\1>/g)].find(match=>{
      const classes=match[2].split(/\s+/);return (classes.includes('xa-tldr')&&!classes.some(name=>['company-example-note','company-source-case'].includes(name)))||classes.includes('qa-answer');
    });
    assert.ok(firstHeader?position>page.indexOf('</header>'):summary&&position>=summary.index+summary[0].length,file);
    const generatedSummaryStart=page.lastIndexOf('<!--seo:begin-->',position);
    assert.ok(generatedSummaryStart<0||page.lastIndexOf('<!--seo:end-->',position)>generatedSummaryStart,'Comic inside generated summary: '+file);
    assert.ok(page.includes('comic-data.js?v=20261111complete'));
  }
});
test('the hallucination sample does not claim models can never express uncertainty',()=>{
  const article=fs.readFileSync('public/slides/zero-3.html','utf8');
  assert.ok(article.includes('它可以表达「我不确定」'));assert.ok(!article.includes('没办法主动提醒你'));
});
