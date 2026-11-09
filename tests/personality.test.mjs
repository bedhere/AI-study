import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const context={};
vm.runInNewContext(fs.readFileSync('public/slides/personality-data.js','utf8'),context);
const model=context.FangpianPersonality;
test('all sixteen preference combinations produce their corresponding tiger',()=>{
  for(const type of Object.keys(model.profiles)){
    const answers=Array.from(model.questions('mbti'),q=>{
      const first=model.axes[q.axis].left===type[q.axis];
      return first===(q.direction===1)?1:5;
    });
    const result=model.score('mbti',answers);
    assert.equal(result.type,type);assert.equal(result.profile.name,model.profiles[type].name);
    assert.ok(result.dimensions.every(d=>[0,100].includes(d.score)));
  }
});
test('balanced answers are reported without manufacturing a clear type',()=>{
  const result=model.score('mbti',Array(32).fill(3));
  assert.equal(result.type,'XXXX');assert.equal(result.profile.name,'多面虎');
  assert.ok(result.dimensions.every(d=>d.score===50));assert.equal(result.unclear,true);
  const disc=model.score('disc',Array(24).fill(3));
  assert.equal(disc.tied,true);assert.equal(disc.profile.name,'多面虎');
});
test('each DISC preference wins when its balanced positive and negative items agree',()=>{
  for(const type of ['D','I','S','C']){
    const answers=Array.from(model.questions('disc'),q=>q.axis===type?(q.direction===1?5:1):(q.direction===1?1:5));
    const result=model.score('disc',answers);
    assert.equal(result.type,type);assert.equal(result.profile.name,model.discProfiles[type].name);
    assert.equal(result.dimensions.find(d=>d.key===type).score,100);
    assert.ok(result.dimensions.filter(d=>d.key!==type).every(d=>d.score===0));
  }
});
test('incomplete and out-of-range responses cannot produce a result',()=>{
  for(const kind of ['mbti','disc']){
    const count=model.questions(kind).length;
    for(const value of [null,0,6,1.5,'3',undefined]){
      const answers=Array(count).fill(3);answers[0]=value;
      assert.equal(model.complete(kind,answers),false);assert.throws(()=>model.score(kind,answers));
    }
    assert.equal(model.complete(kind,Array(count-1).fill(3)),false);
    assert.equal(model.complete(kind,new Array(count)),false);
  }
});
test('stored records are sanitized and cannot bypass completion',()=>{
  const broken=model.cleanRecord('mbti',{answers:[5,'5',999],cursor:Infinity,completed:true});
  assert.equal(broken.answers.length,32);assert.equal(broken.answers[0],5);assert.equal(broken.answers[1],null);assert.equal(broken.cursor,0);assert.equal(broken.completed,false);
  const result=model.cleanRecord('disc',{answers:Array(24).fill(4),cursor:8,completed:true});
  assert.equal(result.completed,true);assert.equal(result.cursor,8);
});
test('partial ties preserve the unclear dimension and never turn into another exact type',()=>{
  const answers=Array.from(model.questions('mbti'),q=>q.axis===0?3:q.direction===1?1:5);
  const result=model.score('mbti',answers);assert.equal(result.type,'XSTJ');assert.equal(result.profile.name,'多面虎');
});
test('every result has a local tiger image and all homepage entries point at the actual test',()=>{
  for(const profile of [...Object.values(model.profiles),...Object.values(model.discProfiles),model.balanced]){
    assert.ok(fs.existsSync('public/slides/assets/fangpian/'+profile.image),profile.image);
    assert.ok(profile.name.endsWith('虎'));assert.ok(profile.strength&&profile.watch&&profile.partner);
  }
  for(const suffix of ['','.en','.ko','.tw','.hk']){
    const home=fs.readFileSync('public/slides/home'+suffix+'.html','utf8');
    assert.equal((home.match(/id="tigerTestEntry"/g)||[]).length,1);
    assert.ok(/id="tigerTestEntry" href="personality.html"/.test(home));
    assert.ok(!/href=["'](?:\/slides)?\/jd/.test(home));
  }
});
