(function(){
  'use strict';
  var model=window.FangpianPersonality,app=document.getElementById('assessmentApp');
  var KEY='fangpian_personality_v1',persistent=true,records={};
  var titles={mbti:'MBTI 风格探索',disc:'DISC 协作风格'};
  var descriptions={mbti:'从交流、信息、决策与节奏四个角度，认识更自在的自己。',disc:'在真实的工作协作里，看看你更自然的行动方式。'};
  var arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function img(file,alt,cls,loading){return '<img src="assets/fangpian/'+file+'" alt="'+esc(alt)+'" class="'+(cls||'')+'" width="320" height="320" '+(loading?'loading="lazy"':'fetchpriority="high"')+' decoding="async">';}
  function notice(){persistent=false;var n=document.getElementById('storageNotice');n.hidden=false;n.textContent='当前浏览器无法保存记录。你仍可完成测试，离开页面后答案可能丢失。';var label=document.querySelector('.local-save');if(label)label.textContent='本次记录暂时无法保存';}
  try{var raw={};try{raw=JSON.parse(localStorage.getItem(KEY)||'{}');}catch(parseError){}if(raw&&raw.version===model.version)records=raw.records||{};localStorage.setItem('fp_test_probe','1');localStorage.removeItem('fp_test_probe');}catch(error){notice();}
  records={mbti:model.cleanRecord('mbti',records.mbti),disc:model.cleanRecord('disc',records.disc)};
  function save(){if(!persistent)return;try{localStorage.setItem(KEY,JSON.stringify({version:model.version,records:records}));}catch(error){notice();}}
  function answered(kind){return records[kind].answers.filter(function(v){return v!==null;}).length;}
  function focusQuestion(){document.getElementById('questionTitle').focus({preventScroll:true});document.querySelector('.quiz-main').scrollIntoView({block:'start',behavior:'instant'});}
  function navigate(hash){if(location.hash===hash)render();else location.hash=hash;}
  function focusMain(){app.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
  function renderHub(){
    document.title='方片虎格测试 · 方片新媒体';
    var cards=['mbti','disc'].map(function(kind){var record=records[kind],count=answered(kind),total=model.questions(kind).length;return '<article class="test-card '+(kind==='mbti'?'dark':'')+'"><span class="mini-label">'+(kind==='mbti'?'认识自己的偏好':'找到舒服的协作方式')+'</span><h3>'+titles[kind]+'</h3><p class="card-desc">'+descriptions[kind]+'</p><div class="card-foot"><span class="card-meta">'+total+' 道题 · 约 '+(kind==='mbti'?'5':'4')+' 分钟</span><button class="button '+(kind==='mbti'?'yellow':'')+'" data-start="'+kind+'">'+(record.completed?'查看我的虎格':count?'继续测试':'开始测试')+arrow+'</button></div>'+(count?'<p class="draft-note">'+(record.completed?'已完成，结果保存在此浏览器。':'已答 '+count+' / '+total+' 题，随时可以接着来。')+(record.completed?'<button class="results-link" data-reset="'+kind+'">重新测试</button>':'')+'</p>':'')+'</article>';}).join('');
    var gallery=Object.keys(model.profiles).map(function(type){var p=model.profiles[type];return '<div class="tiger-mini">'+img(p.image,p.name,'',true)+'<strong>'+p.name+'</strong><span>'+type+'</span></div>';}).join('');
    app.innerHTML='<section class="intro"><div class="intro-copy"><span class="section-tag"><span class="tag-square"></span>方片虎格测试</span><h1>每一只虎，<br>都有拿手好戏。</h1><p>有的虎擅长点燃灵感，有的虎习惯稳稳推进。<br>花几分钟，认识你的创作偏好与协作节奏。</p><div class="intro-foot"><span>'+arrow+' 没有标准答案</span><span>无需登录 · 记录只在本机</span></div></div><div class="intro-art">'+img('tiger-thinking-seated.webp','正在思考的方片老虎','hero-tiger')+img('tiger-open-arms.webp','张开双臂欢迎伙伴的方片老虎','hero-friend')+'<span class="art-note">今天，认识另一面的自己</span><span class="art-stamp">每一种风格 · 都值得被看见</span></div></section><section class="test-section"><div class="section-title"><h2>从你感兴趣的那一面开始</h2><p>两份测试独立计分，可以任选，也可以都试试。</p></div><div class="test-grid">'+cards+'</div><p class="micro-copy">自我探索体验版，不是官方测评。依据最近三个月的真实状态作答，不必选择“理想中的自己”。</p></section><section class="gallery"><div class="section-title"><h2>认识方片虎伙伴</h2><p>16 种偏好形象，还有属于你的 DISC 协作风格。</p></div><div class="tiger-grid">'+gallery+'</div><p>类型是一种理解自己的视角，不会限定你能做什么。答案没有高低，风格也没有优劣。</p></section>';
    app.querySelectorAll('[data-start]').forEach(function(b){b.onclick=function(){var kind=b.dataset.start;navigate('#'+kind+(records[kind].completed?'-result':''));};});
    app.querySelectorAll('[data-reset]').forEach(function(b){b.onclick=function(){reset(b.dataset.reset);};});
  }
  function reset(kind){records[kind]=model.cleanRecord(kind,{});save();navigate('#'+kind);}
  function renderQuiz(kind){
    var r=records[kind],questions=model.questions(kind),index=r.cursor,q=questions[index],count=answered(kind);
    if(r.completed){navigate('#'+kind+'-result');return;}
    document.title=titles[kind]+' · 第 '+(index+1)+' 题 · 方片虎格测试';
    var labels=kind==='mbti'?['很像左边','偏向左边','两边都有','偏向右边','很像右边']:['完全不像我','不太像我','说不准','比较像我','非常像我'];
    var options=labels.map(function(label,i){return '<label class="answer-label"><input type="radio" name="answer" value="'+(i+1)+'" '+(r.answers[index]===i+1?'checked':'')+' required><span class="answer-face"><span class="answer-dot" aria-hidden="true"></span><span>'+label+'</span></span></label>';}).join('');
    app.innerHTML='<div class="quiz-top"><button class="text-button" id="backHub">‹ 返回测试中心</button><h1 class="quiz-name">'+titles[kind]+'</h1></div><div class="quiz-layout"><aside class="quiz-aside">'+img(kind==='mbti'?'tiger-thinking-seated.webp':'tiger-teacher-pointer.webp','陪你探索的方片老虎')+'<div><h2>照着平常的你来选，<br>就很好。</h2><p>没有好坏，也不计对错。<br>以最近三个月的真实感受为准。</p><span class="local-save">'+(persistent?'已自动保存在此浏览器':'本次记录暂时无法保存')+'</span></div></aside><section class="quiz-main question-enter"><div class="progress-row" aria-live="polite"><strong>第 '+(index+1)+' / '+questions.length+' 题</strong><span id="answeredCount">已答 '+count+' 题</span></div><progress id="answerProgress" max="'+questions.length+'" value="'+count+'" aria-label="答题进度"></progress><form class="question-form" id="questionForm"><fieldset><legend tabindex="-1" id="questionTitle">'+esc(q.prompt)+'</legend>'+(kind==='mbti'?'<div class="pair-descriptions"><div class="pair-description"><span>左边的你</span>'+esc(q.left)+'</div><div class="pair-description"><span>右边的你</span>'+esc(q.right)+'</div></div>':'')+'<div class="answer-options">'+options+'</div></fieldset><p class="answer-help" id="answerHelp">'+(r.answers[index]?'已选，可修改后继续。':'选择最接近你的描述，再继续下一题。')+'</p><div class="quiz-actions"><button class="button outline" id="previousQuestion" type="button" '+(index===0?'disabled':'')+'>上一题</button><button class="button" type="submit" id="nextQuestion" '+(r.answers[index]?'':'disabled')+'>'+(index===questions.length-1?'查看我的虎格':'下一题')+arrow+'</button></div></form></section></div>';
    document.getElementById('backHub').onclick=function(){navigate('');};
    app.querySelectorAll('input[name="answer"]').forEach(function(input){input.onchange=function(){r.answers[index]=Number(input.value);r.updatedAt=new Date().toISOString();save();document.getElementById('nextQuestion').disabled=false;document.getElementById('answeredCount').textContent='已答 '+answered(kind)+' 题';document.getElementById('answerProgress').value=answered(kind);document.getElementById('answerHelp').textContent='已选，可修改后继续。';};});
    document.getElementById('previousQuestion').onclick=function(){if(r.cursor>0){r.cursor--;save();renderQuiz(kind);focusQuestion();}};
    document.getElementById('questionForm').onsubmit=function(e){e.preventDefault();if(!r.answers[index])return;if(index<questions.length-1){r.cursor++;save();renderQuiz(kind);focusQuestion();}else if(model.complete(kind,r.answers)){r.completed=true;r.updatedAt=new Date().toISOString();save();navigate('#'+kind+'-result');}else{r.cursor=r.answers.indexOf(null);save();renderQuiz(kind);}};
  }
  function renderResult(kind){
    var r=records[kind];if(!r.completed||!model.complete(kind,r.answers)){navigate('#'+kind);return;}
    var result=model.score(kind,r.answers),p=result.profile;
    document.title=p.name+' · '+result.type+' · 方片虎格测试';
    var dimensions=result.dimensions.map(function(d){
      var name=kind==='mbti'?'<strong>'+d.left+' · '+d.leftName+' '+d.score+'%</strong><span>'+d.right+' · '+d.rightName+' '+(100-d.score)+'%</span>':'<strong>'+d.key+' · '+d.label+'</strong><span>'+d.score+' / 100</span>';
      var aria=kind==='mbti'?d.leftName+' '+d.score+'%，'+d.rightName+' '+(100-d.score)+'%':d.label+' '+d.score+'分';
      return '<div class="dimension"><div class="dimension-label">'+name+'</div><div class="dimension-track '+(kind==='mbti'?'bipolar':'')+'" role="img" aria-label="'+aria+'"><div class="dimension-fill" style="width:'+d.score+'%"></div></div></div>';
    }).join('');
    var uncertainty=result.unclear?kind==='mbti'?'有些维度比较接近，两侧偏好都可能在你身上出现。X 表示本次该维度持平，不强行为你归类。':result.tied?'本次有多个风格得分并列，暂不选定单一主风格。你可以结合具体协作情境理解这些特点。':'前两项风格得分很接近，你也有 '+result.secondary+' 风格的一面，可以一起参考。':'';
    app.innerHTML='<div class="result-top"><button class="text-button" id="backHub">‹ 返回测试中心</button><h1>这是你此刻的虎格名片</h1></div><div class="result-layout"><section class="identity-card" aria-label="虎格结果"><div class="identity-label"><span>方片新媒体</span><span>'+titles[kind]+'</span></div><h2>'+p.name+'</h2><div class="identity-type">'+result.type+'</div>'+img(p.image,p.name+'的方片老虎形象','result-tiger')+'<p class="identity-line">'+p.line+'</p><div class="identity-bottom"><span>每一种风格，都有自己的光</span><span>AI学院</span></div></section><section class="result-detail"><h2>'+(kind==='mbti'?'你的四维偏好':'你的协作风格分布')+'</h2><div class="dimension-list">'+dimensions+'</div><p class="dimension-note">'+(kind==='mbti'?'百分比是本题集中两侧回答的相对倾向，不是准确率。靠近 50% 表示两侧接近。':'各项为独立自评得分，不要求相加为 100，也不代表团队中的排名。')+'</p>'+(uncertainty?'<p class="unclear-note">'+uncertainty+'</p>':'')+'<div class="insights">'+[['你的拿手好戏',p.strength],['给自己的一个提醒',p.watch],['让协作更舒服',p.partner]].map(function(item){return '<div class="insight"><h3><span class="insight-square" aria-hidden="true"></span>'+item[0]+'</h3><p>'+item[1]+'</p></div>';}).join('')+'</div><div class="ai-prompt"><strong>试着这样邀请你的 AI 搭档</strong>“'+p.prompt+'”</div><div class="result-actions"><button class="button" id="downloadCard">保存虎格卡'+arrow+'</button><button class="button outline" id="otherTest">试试 '+(kind==='mbti'?'DISC':'MBTI')+'</button><button class="button quiet" id="retakeTest">重新测试</button></div><p class="result-status" id="resultStatus" role="status" aria-live="polite"></p><p class="result-disclaimer">这是一份品牌自我探索体验报告，非官方测评。结果反映本次回答，不能用于能力判断或招聘筛选。'+(persistent?'结果保存在此浏览器。':'当前记录无法持久保存，可下载虎格卡留存。')+'</p><a class="result-course" href="learn.html#learn-1.html">带着新认识，继续探索 AI 学习 '+arrow+'</a></section></div>';
    document.getElementById('backHub').onclick=function(){navigate('');};
    document.getElementById('retakeTest').onclick=function(){reset(kind);};
    document.getElementById('otherTest').onclick=function(){var other=kind==='mbti'?'disc':'mbti';navigate('#'+other+(records[other].completed?'-result':''));};
    document.getElementById('downloadCard').onclick=function(){downloadCard(result);};
  }
  function wrap(ctx,text,x,y,maxWidth,lineHeight){var line='';for(var c of text){if(ctx.measureText(line+c).width>maxWidth){ctx.fillText(line,x,y);y+=lineHeight;line=c;}else line+=c;}if(line)ctx.fillText(line,x,y);return y+lineHeight;}
  async function downloadCard(result){
    var b=document.getElementById('downloadCard'),status=document.getElementById('resultStatus');b.disabled=true;status.textContent='正在生成你的虎格卡…';
    try{
      var source=app.querySelector('.result-tiger');if(!source.complete||!source.naturalWidth)await source.decode();
      var c=document.createElement('canvas');c.width=1080;c.height=1440;var ctx=c.getContext('2d');
      ctx.fillStyle='#fff000';ctx.fillRect(0,0,1080,1440);ctx.fillStyle='#191a16';ctx.font='600 28px "Microsoft YaHei",sans-serif';ctx.fillText('方片新媒体  /  方片虎格测试',70,85);
      ctx.font='900 98px "Microsoft YaHei",sans-serif';ctx.fillText(result.profile.name,70,220);ctx.font='600 36px sans-serif';ctx.fillText(result.type,74,282);
      var scale=Math.min(720/source.naturalWidth,630/source.naturalHeight),w=source.naturalWidth*scale,h=source.naturalHeight*scale;ctx.drawImage(source,(1080-w)/2,315+(630-h)/2,w,h);
      ctx.font='600 32px "Microsoft YaHei",sans-serif';wrap(ctx,result.profile.line,74,998,930,49);
      ctx.fillStyle='#fdfdf7';ctx.fillRect(55,1095,970,205);ctx.fillStyle='#191a16';ctx.font='600 23px "Microsoft YaHei",sans-serif';ctx.fillText(titles[result.kind]+' · 本次回答倾向',80,1140);
      result.dimensions.forEach(function(d,i){var text=result.kind==='mbti'?d.left+' '+d.score+'%  /  '+d.right+' '+(100-d.score)+'%':d.key+' '+d.score+'/100';ctx.font='500 22px "Microsoft YaHei",sans-serif';ctx.fillText(text,80+(i%2)*470,1200+Math.floor(i/2)*53);});
      ctx.fillStyle='#4f4d22';ctx.font='400 21px "Microsoft YaHei",sans-serif';ctx.fillText('自我探索体验版 · 非官方测评 · 类型不是固定标签',70,1360);ctx.fillText('每一种风格，都有自己的光。',70,1399);
      var blob=await new Promise(function(resolve){c.toBlob(resolve,'image/png');});if(!blob)throw Error('Canvas export failed');var url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='方片虎格-'+result.profile.name+'-'+result.kind+'.png';a.click();setTimeout(function(){URL.revokeObjectURL(url);},60000);status.textContent='虎格卡已生成，请在浏览器下载列表查看。';
    }catch(error){status.textContent='图片生成失败，请稍后重试。你也可以使用浏览器截图保存当前名片。';}finally{b.disabled=false;}
  }
  function render(){
    var route=location.hash.replace(/^#/,'');
    if(document.body.dataset.test==='disc'){
      if(route==='disc-result')renderResult('disc');else renderQuiz('disc');
      var back=document.getElementById('backHub');if(back){back.textContent='‹ 返回方片 AITI';back.onclick=function(){location.href='aiti.html';};}
      var other=document.getElementById('otherTest');if(other){other.textContent='返回方片 AITI';other.onclick=function(){location.href='aiti.html';};}
      focusMain();return;
    }
    if(route==='mbti'||route==='disc')renderQuiz(route);else if(route==='mbti-result'||route==='disc-result')renderResult(route.split('-')[0]);else renderHub();focusMain();
  }
  window.addEventListener('hashchange',render);render();
})();
