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
test('two illustrated lessons have exactly four accessible panels with small local assets',()=>{
  const context={window:{}};vm.runInNewContext(fs.readFileSync('public/slides/comic-data.js','utf8'),context);
  const stories=context.window.AcademyComics;assert.equal(Object.keys(stories).length,2);
  for(const [file,story] of Object.entries(stories)){
    assert.equal(story.panels.length,4);let bytes=0;
    story.panels.forEach((panel,index)=>{assert.ok(panel.alt&&panel.text&&panel.label);bytes+=fs.statSync(`public/slides/assets/comics/${story.slug}-${index+1}.webp`).size;});
    assert.ok(bytes<250*1024);const page=fs.readFileSync('public/slides/'+file,'utf8');
    assert.ok(page.includes('data-lesson-comic="'+file+'"'));assert.ok(page.includes('<noscript>'));assert.ok(!page.includes('class="academy-cover"'));
    const position=page.indexOf('data-lesson-comic=');
    const container=page.match(/<(article|main)\b[^>]*class="lesson/);
    assert.ok(container);
    assert.ok(position>page.indexOf('</head>')&&position>container.index);
    assert.ok(position<page.indexOf('</'+container[1]+'>'));
  }
});
test('the hallucination sample does not claim models can never express uncertainty',()=>{
  const article=fs.readFileSync('public/slides/zero-3.html','utf8');
  assert.ok(article.includes('它可以表达「我不确定」'));assert.ok(!article.includes('没办法主动提醒你'));
});
