import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const runtime=fs.readFileSync('public/slides/local-learning.js','utf8');
const search=fs.readFileSync('public/slides/local-search.js','utf8');
function setup({store=new Map(),blocked=false,pathname='/slides/learn.html'}={}){
  const events=[],handlers={};
  const window={location:{pathname},localStorage:{getItem(key){if(blocked)throw Error('blocked');return store.get(key)??null;},setItem(key,value){if(blocked)throw Error('blocked');store.set(key,value);},removeItem(key){if(blocked)throw Error('blocked');store.delete(key);}},CustomEvent:class{constructor(type,init){this.type=type;this.detail=init.detail;}},dispatchEvent(event){events.push(event);},addEventListener(type,handler){handlers[type]=handler;}};
  vm.runInNewContext(runtime,{window});
  return {api:window.FangpianLearning,store,events,handlers};
}
const lessons=[{file:'one.html'},{file:'two.html'}];
test('reader routes preserve quiz mode and reject malformed or unrelated modes',()=>{
  const {api}=setup();
  assert.equal(api.route('#exam-1.en.html%3Fmode%3Ddrill').file,'exam-1.html');
  assert.equal(api.route('#exam-1.html?mode=drill').mode,'drill');
  assert.equal(api.route('#exam-all.html?mode=exam').mode,'exam');
  assert.equal(api.route('#one.html?mode=exam').mode,'');
  assert.equal(api.route('#exam-1.html?mode=unknown').mode,'');
  assert.equal(api.route('#%E0%A4%A').file,'');
});
test('mark, reload, undo and last lesson persist across page instances',()=>{
  const first=setup();
  first.api.saveLessons({'one.html':1,__last:'two.html'},lessons);
  const reload=setup({store:first.store});
  assert.equal(reload.api.completed(lessons),1);
  assert.equal(reload.api.lastFor(lessons),'two.html');
  reload.api.saveLessons({__last:'two.html'},lessons);
  assert.equal(setup({store:first.store}).api.completed(lessons),0);
});
test('legacy localized keys migrate and do not double count a lesson',()=>{
  const store=new Map([['ai_course_progress_v1',JSON.stringify({'one.en.html':1,'one.html':true,'missing.html':1,__last:'one.ko.html'})]]);
  const {api}=setup({store});
  assert.equal(api.completed(lessons),1);
  assert.equal(api.lastFor(lessons),'one.html');
  assert.equal(api.forLessons([{file:'one.tw.html'}])['one.tw.html'],1);
});
test('saving one language does not erase progress in lessons absent from that language',()=>{
  const {api}=setup();api.write({'one.html':1,'extra.html':1,__last:'extra.html'});
  api.saveLessons({__last:'one.html'},lessons);
  assert.equal(api.read()['extra.html'],1);assert.equal(api.read()['one.html'],undefined);
});
test('blocked storage keeps this session usable without claiming persistence',()=>{
  const {api}=setup({blocked:true});
  assert.equal(api.persistent,false);assert.equal(api.saveLessons({'one.html':1},lessons),false);assert.equal(api.completed(lessons),1);
});
test('malformed, array and unsafe legacy records cannot become course progress',()=>{
  for(const raw of ['bad-json','[]','{"__proto__":{"polluted":true},"../../x.html":1,"one.html":0}']){
    const {api}=setup({store:new Map([['ai_course_progress_v1',raw]])});
    assert.equal(api.completed(lessons),0);assert.equal({}.polluted,undefined);
  }
});
test('same-tab writes and cross-tab storage changes notify readers',()=>{
  const {api,store,events,handlers}=setup();api.saveLessons({'one.html':1},lessons);
  assert.equal(events.filter(event=>event.type==='fangpian:progress').length,1);
  store.set(api.key,JSON.stringify({'two.html':1}));handlers.storage({key:api.key});
  assert.equal(api.forLessons(lessons)['two.html'],1);assert.equal(events.length,2);
});
test('exam results remain local and keep the most recent 50 attempts',()=>{
  const {api,store}=setup();
  for(let i=0;i<55;i++)assert.equal(api.saveExam({exam:'test-'+i,score:80,right:4,total:5,mode:'exam'}),true);
  const records=JSON.parse(store.get('fangpian_exam_results_v1'));
  assert.equal(records.length,50);assert.equal(records[0].exam,'test-5');assert.equal(records[49].exam,'test-54');
  assert.ok(records.every(record=>record.completedAt));
  assert.equal(setup({blocked:true}).api.saveExam({exam:'test',score:0,right:0,total:5}),false);
});

test('full current curriculum progress and bounded scores stay within small storage budgets',()=>{
  const {api,store}=setup(),context={window:{}};
  vm.runInNewContext(fs.readFileSync('public/slides/course-data.js','utf8'),context);
  const lessons=context.window.COURSE_FLAT;
  api.saveLessons(Object.fromEntries(lessons.map(lesson=>[lesson.file,1])),lessons);
  assert.equal(api.completed(lessons),lessons.length);
  assert.ok(store.get(api.key).length*2<16384); // All 445 lessons, under 16 KiB.
  for(let i=0;i<60;i++)api.saveExam({exam:'x'.repeat(50000),mode:'x'.repeat(50000),score:Infinity,right:-2,total:NaN});
  const raw=store.get('fangpian_exam_results_v1');assert.ok(raw.length*2<=api.limits.examBytes);
  const records=JSON.parse(raw);assert.ok(records.every(record=>record.exam.length<=48&&record.mode.length<=8));
  assert.ok(records.every(record=>Number.isFinite(record.score)&&record.right>=0));
  assert.ok(!raw.includes('data:image'));
});

test('oversized progress stays usable in memory without overwriting the previous small saved record',()=>{
  const {api,store}=setup();api.write({'one.html':1});const before=store.get(api.key);
  const huge=Object.fromEntries(Array.from({length:2000},(_,i)=>['large-progress-'+i+'.html',1]));
  assert.equal(api.write(huge),false);assert.equal(store.get(api.key),before);
  assert.equal(api.read()['large-progress-0.html'],1);assert.equal(api.persistent,false);
});
test('local full-text search normalizes queries, supports terms and caches one index load',async()=>{
  let requests=0;
  const window={};
  vm.runInNewContext(search,{window,fetch:async()=>{requests++;return {ok:true,json:async()=>({version:1,documents:[{file:'one.html',text:'body-only 语义检索 rag workflow'},{file:'two.html',text:'rag unrelated'}]})};}});
  assert.deepEqual(Array.from(await window.FangpianSearch.find('ＲＡＧ 语义检索','zh')),['one.html']);
  assert.deepEqual(Array.from(await window.FangpianSearch.find('body-only','zh')),['one.html']);
  assert.equal(requests,1);assert.equal((await window.FangpianSearch.find('no-such-term','zh')).length,0);
});
test('failed index requests are retryable rather than cached as empty results',async()=>{
  let requests=0;const window={};
  vm.runInNewContext(search,{window,fetch:async()=>{requests++;if(requests===1)return {ok:false,status:404};return {ok:true,json:async()=>({version:1,documents:[{file:'one.html',text:'token'}]})};}});
  await assert.rejects(window.FangpianSearch.find('token','en'));
  assert.equal((await window.FangpianSearch.find('token','en')).length,1);assert.equal(requests,2);
});
test('generated indexes cover exactly the curriculum of each open language',()=>{
  for(const language of ['zh','en','ko','tw','hk']){
    const context={window:{}};const suffix=language==='zh'?'':'.'+language;
    vm.runInNewContext(fs.readFileSync('public/slides/course-data'+suffix+'.js','utf8'),context);
    const index=JSON.parse(fs.readFileSync('public/slides/search-index.'+language+'.json','utf8'));
    assert.deepEqual(index.documents.map(doc=>doc.file).sort(),Array.from(context.window.COURSE_FLAT,l=>l.file).sort());
    assert.ok(index.documents.every(doc=>doc.text.length>0));
    assert.ok(!index.documents.some(doc=>doc.file.startsWith('elder')));
    if(language==='zh')assert.ok(index.documents.find(doc=>doc.file==='1-2-vocab.html').text.includes('紫霞'));
  }
});
