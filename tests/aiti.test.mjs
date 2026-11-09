import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
const context={};
vm.runInNewContext(fs.readFileSync('public/slides/aiti-data.js','utf8'),context);
const model=context.FangpianAITI;
const expected=['赛博诸葛','Prompt法师','AI炼金术士','人机搭子王','脑洞永动机','数字鲁班','AI开荒者','善意放大器','反幻觉侦探','效率开挂虎','灵感捕手','共创带飞王','AI清醒派','疯狂进化虎','靠谱输出机','长期主义虎'];
test('AITI uses exactly the four requested equally weighted dimensions and 16 items',()=>{
  assert.deepEqual(Array.from(model.dimensions,d=>d.key),['A','U','K','V']);
  assert.deepEqual(Array.from(model.dimensions,d=>d.name),['AI认可度','AI使用度','AI了解度','正向价值度']);
  assert.ok(model.dimensions.every(d=>d.weight===.25));assert.equal(model.questions.length,16);
  for(let i=0;i<4;i++)assert.equal(model.questions.filter(q=>q.dimension===i).length,4);
  assert.equal(new Set(model.questions.map(q=>q.id)).size,16);
});
test('all sixteen binary combinations reach exactly one of the specified personalities',()=>{
  const reached=new Set();
  for(let n=0;n<16;n++){
    const key=n.toString(2).padStart(4,'0');
    const result=model.score(Array.from({length:16},(_,i)=>key[Math.floor(i/4)]==='1'?4:2));
    assert.equal(result.key,key);assert.ok(result.profile);reached.add(result.profile.name);
    assert.equal(result.profile.tags.length,4);assert.ok(result.profile.quote&&result.profile.title&&result.profile.reading&&result.profile.advice);
  }
  assert.deepEqual([...reached].sort(),expected.slice().sort());
});
test('continuous averages are retained, including threshold and near-boundary values',()=>{
  const a=[3,3,3,4,...Array(12).fill(3)];
  const before=model.score(a);assert.equal(before.dimensions[0].score,3.25);assert.equal(before.key,'0000');assert.equal(before.nearBoundary,true);
  a[0]=4;const after=model.score(a);assert.equal(after.dimensions[0].score,3.5);assert.equal(after.key,'1000');
  assert.ok(after.dimensions.every(d=>d.score>=1&&d.score<=5));
});
test('neutral and endpoint answers still yield positive named profiles without a ranking',()=>{
  for(const value of [1,3,5]){
    const result=model.score(Array(16).fill(value));
    assert.ok(expected.includes(result.profile.name));assert.ok(result.dimensions.every(d=>d.score===value));
    assert.equal(Object.hasOwn(result,'rank'),false);assert.equal(Object.hasOwn(result,'total'),false);
  }
});
test('incomplete, sparse, legacy-length and invalid answers cannot be scored',()=>{
  for(const answers of [Array(15).fill(3),Array(32).fill(3),new Array(16),Array(16).fill(null)])assert.throws(()=>model.score(answers));
  for(const bad of [0,6,1.2,'5',undefined]){const answers=Array(16).fill(3);answers[0]=bad;assert.equal(model.complete(answers),false);}
  const legacy=model.cleanRecord({answers:Array(32).fill(5),completed:true});assert.equal(legacy.completed,false);assert.ok(legacy.answers.every(a=>a===null));
});
function storage(map=new Map(),blocked=false){return {map,getItem(k){if(blocked)throw Error('blocked');return map.get(k)??null;},setItem(k,v){if(blocked)throw Error('blocked');map.set(k,v);},removeItem(k){if(blocked)throw Error('blocked');map.delete(k);}};}
test('draft, cursor and completion survive reload independently of old MBTI/DISC storage',()=>{
  const old='{"version":1,"records":{"disc":{"completed":true}}}';
  const backing=storage(new Map([['fangpian_personality_v1',old]]));
  const first=model.createStore(backing);let record=first.load();record.answers[0]=5;record.cursor=1;first.save(record);
  const reloaded=model.createStore(backing).load();assert.equal(reloaded.answers[0],5);assert.equal(reloaded.cursor,1);
  record={answers:Array(16).fill(4),cursor:15,completed:true};first.save(record);assert.equal(model.createStore(backing).load().completed,true);
  assert.equal(backing.map.get('fangpian_personality_v1'),old);
});
test('malformed and unknown-version records recover without inventing a result',()=>{
  for(const raw of ['invalid-json','null','[]','{"version":99,"record":{"answers":[5]}}']){
    const s=storage(new Map([['fangpian_aiti_v1',raw]]));const store=model.createStore(s);
    assert.equal(store.load().completed,false);assert.equal(store.persistent,true);
  }
});
test('unavailable or quota-exhausted storage preserves this-page answers and reports failure',()=>{
  let notices=0;const store=model.createStore(storage(new Map(),true),()=>notices++);
  const value={answers:Array(16).fill(4),cursor:15,completed:true};assert.equal(store.save(value),false);assert.equal(store.load().completed,true);assert.equal(store.persistent,false);assert.equal(notices,1);
  const backing=storage();const quota=model.createStore(backing,()=>notices++);backing.setItem=()=>{throw Error('quota');};assert.equal(quota.save(value),false);assert.equal(quota.load().answers[0],4);
});
test('all reference images match the recorded source hashes and named character mappings',()=>{
  const manifest=JSON.parse(fs.readFileSync('public/slides/assets/aiti/manifest.json','utf8'));
  assert.equal(manifest.assets.length,16);
  for(const p of model.profiles){
    const item=manifest.assets.find(a=>a.id===p.id);assert.equal(item.name,p.name);
    const bytes=fs.readFileSync('public/slides/'+p.image);assert.equal(bytes.length,item.bytes);
    assert.equal(createHash('sha256').update(bytes).digest('hex'),item.sha256);
  }
});
test('the old entry redirects, DISC remains separate, and all five homepages point at AITI',()=>{
  const legacy=fs.readFileSync('public/slides/personality.html','utf8');assert.ok(legacy.includes("location.replace(disc?'disc.html'+h:'aiti.html'"));
  assert.ok(fs.readFileSync('public/slides/disc.html','utf8').includes('data-test="disc"'));
  for(const suffix of ['','.en','.ko','.tw','.hk']){
    const html=fs.readFileSync('public/slides/home'+suffix+'.html','utf8');assert.ok(/id="tigerTestEntry" href="aiti.html"/.test(html));assert.ok(!html.includes('MBTI 性格探索'));
  }
});
