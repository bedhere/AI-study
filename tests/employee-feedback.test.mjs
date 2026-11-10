import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync('public/slides/employee-feedback.js','utf8');
const storeSource=fs.readFileSync('public/slides/employee-feedback-store.js','utf8');
function setup({backing=new Map(),blocked=false}={}){
  const storage={getItem:k=>backing.get(k)||null,setItem(k,v){if(blocked)throw Error('blocked');backing.set(k,v);},removeItem:k=>backing.delete(k)};
  const window={localStorage:storage};vm.runInNewContext(storeSource,{window});let n=0;
  const model=window.AcademyFeedback;
  model.store=model.createStore(storage,{now:()=>new Date('2026-11-10T08:00:00Z'),nonce:()=>String(++n).padStart(12,'0')});
  return {model,backing,storage};
}
function render(data,session=setup()){
  const nodes=[],inserted=[],handlers={};
  function element(tag){
    const classes=new Set();
    const node={tag,children:[],dataset:{},attrs:{},listeners:{},value:'',open:false,
      append(...children){this.children.push(...children)},
      replaceChildren(...children){this.children=[...children]},
      setAttribute(k,v){this.attrs[k]=v},
      addEventListener(k,v){this.listeners[k]=v},
      showModal(){this.open=true},close(){this.open=false},focus(){},
      classList:{add(c){classes.add(c)},toggle(c){if(classes.has(c)){classes.delete(c);return false}classes.add(c);return true}}
    };
    nodes.push(node);return node;
  }
  const body=element('body');
  vm.runInNewContext(source,{window:{AcademyFeedbackData:data,AcademyFeedback:session.model,addEventListener:(key,fn)=>handlers[key]=fn},document:{body,createElement:element,getElementById:id=>id==='topics'?{before:node=>inserted.push(node)}:null}});
  return {nodes,inserted,handlers,...session};
}
test('comment publishing requires a local identity and survives reload, logout and sign-in',()=>{
  const {model,storage}=setup();const store=model.store;
  assert.throws(()=>store.publish('我的收获'),/登录/);
  const profile=store.signIn('小段','assets/fangpian/employee-xiaoduan.webp');
  const comment=store.publish('先动手，再核验。',profile.id);
  const reloaded=model.createStore(storage);
  assert.equal(reloaded.list()[0].text,comment.text);assert.equal(reloaded.profile().name,'小段');
  reloaded.signOut();assert.equal(reloaded.profile(),null);assert.equal(reloaded.list().length,1);
  assert.throws(()=>reloaded.publish('未登录'),/登录/);
  assert.equal(reloaded.signIn('小段').id,profile.id);
  assert.throws(()=>reloaded.publish('身份变化','p-otherperson'),/身份已变化/);
});
test('small bounded records reject invalid inputs, preserve prior data on quota failure and never store images',()=>{
  const {model,backing}=setup();const store=model.store;
  for(const name of ['',null,'x'.repeat(25),'\n小段'])assert.throws(()=>store.signIn(name),/昵称/);
  store.signIn('小段','https://outside.example/image.jpg');assert.equal(store.profile().avatar,'');
  for(const text of ['',null,'x'.repeat(501)])assert.throws(()=>store.publish(text),/学习反馈/);
  for(let i=0;i<70;i++)store.publish('学习反馈'.repeat(100)+i);
  assert.ok(store.list().length<=20);assert.ok(backing.get(model.commentsKey).length*2<=16384);assert.ok(backing.get(model.profileKey).length*2<=1024);
  assert.ok(!backing.get(model.commentsKey).includes('data:image'));
  const blocked=setup({backing,blocked:true}).model.store;
  const before=backing.get(model.commentsKey);assert.throws(()=>blocked.publish('写入失败'),/无法保存/);assert.equal(backing.get(model.commentsKey),before);
});
test('malformed saved data cannot become a profile or a comment',()=>{
  const {model,backing}=setup();
  for(const raw of ['bad-json','[]','{"version":1,"items":[{}]}']){backing.set(model.commentsKey,raw);assert.equal(model.store.list().length,0);}
  backing.set(model.profileKey,'{"version":1,"id":"../../x","name":"小段"}');assert.equal(model.store.profile(),null);
});
test('home shows the sign-in entry even without initial comments, and excludes unapproved records',()=>{
  for(const items of [[],[{name:'橘子',text:'待处理',approved:false}]]){
    const {nodes,inserted}=render({items});assert.equal(inserted.length,1);
    assert.ok(nodes.some(node=>node.tag==='button'&&node.textContent==='登录后写评论'));
    assert.equal(nodes.filter(node=>node.tag==='article').length,0);
  }
});
test('comment text stays text, external avatars are rejected and expansion is accessible',()=>{
  const {nodes}=render({items:[{name:'橘子',text:'<script>unsafe</script>'.repeat(10),approved:true,avatar:'https://outside.example/a.jpg'}]});
  assert.ok(nodes.some(node=>node.textContent==='<script>unsafe</script>'.repeat(10)));
  assert.equal(nodes.filter(node=>node.tag==='img').length,0);
  assert.equal(nodes.filter(node=>node.className==='academy-feedback-own').length,0);
  const toggle=nodes.find(node=>node.tag==='button'&&node.textContent==='展开全文');assert.equal(toggle.attrs['aria-expanded'],'false');
  toggle.listeners.click();assert.equal(toggle.attrs['aria-expanded'],'true');toggle.listeners.click();assert.equal(toggle.attrs['aria-expanded'],'false');
});
test('the sign-in and comment forms publish only after persistence succeeds',()=>{
  const {nodes,model}=render({items:[],profiles:[{name:'小段',avatar:'assets/fangpian/employee-xiaoduan.webp'}]});
  nodes.find(n=>n.tag==='button'&&n.textContent==='登录后写评论').listeners.click();
  const dialog=nodes.find(n=>n.tag==='dialog');assert.equal(dialog.open,true);
  nodes.find(n=>n.id==='feedbackNickname').value='小段';nodes.filter(n=>n.tag==='form')[0].listeners.submit({preventDefault(){}});
  const text=nodes.find(n=>n.tag==='textarea');text.value='这节课值得多练习。';nodes.filter(n=>n.tag==='form')[1].listeners.submit({preventDefault(){}});
  assert.equal(dialog.open,false);assert.equal(model.store.list()[0].name,'小段');assert.equal(model.store.list()[0].text,text.value||'这节课值得多练习。');
  assert.ok(nodes.some(n=>n.textContent==='评论已发布，保存在当前浏览器。'));
});
test('seven configured profiles have small local avatars and the old preview wording is removed',()=>{
  let bytes=0;for(const name of ['orange','yang-yiming','nianhun','tingfeng','xiaoduan','lihui','hongye'])bytes+=fs.statSync('public/slides/assets/fangpian/employee-'+name+'.webp').size;
  assert.ok(bytes<20*1024);
  const context={window:{}};vm.runInNewContext(fs.readFileSync('public/slides/employee-feedback-data.js','utf8'),context);
  assert.equal(context.window.AcademyFeedbackData.items.length,7);
  assert.ok(!/样式预览|待本人确认|feedbackPreview/.test(source));
});
