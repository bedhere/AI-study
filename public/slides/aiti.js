(function(){
  'use strict';
  var model=window.FangpianAITI;
  var app=document.getElementById('aitiApp');
  var arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var mark='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 10 10-10 10L2 12Z"/></svg>';
  var labels=['非常不同意','比较不同意','不确定 / 看情况','比较同意','非常同意'];
  var analysisTimer=null,analysisRequested=false,saveURL=null;
  function esc(value){return String(value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function image(p,cls,lazy){return '<img src="'+esc(p.image)+'" alt="'+esc(p.name)+'专属方片AI小老虎" width="768" height="768" class="'+(cls||'')+'" '+(lazy?'loading="lazy"':'fetchpriority="high"')+' decoding="async">';}
  function storageWarning(){var n=document.getElementById('aitiStorageNotice');n.hidden=false;n.textContent='浏览器暂时无法保存记录。你仍可完成测试，并下载人格卡留存。';var l=document.querySelector('.local-label');if(l)l.textContent='记录暂存于当前页面';}
  var storage;try{storage=window.localStorage;}catch{storage=null;}
  var store=model.createStore(storage,storageWarning),record=store.load();
  function collectionWarning(){
    var n=document.getElementById('aitiCollectionNotice');
    n.hidden=false;n.textContent='收集进度暂存于当前页面，刷新后可能不会保留。可以先复制卡片码留存。';
  }
  var collection=window.FangpianAITICollection.createStore(storage,collectionWarning);
  if(record.completed&&model.complete(record.answers))collection.rememberResult(model.score(record.answers).profile.id);
  async function copyCardCode(code,status,button){
    var copied=false;
    try{if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(code);copied=true;}}catch{copied=false;}
    if(!copied){
      var area=document.createElement('textarea');area.value=code;area.readOnly=true;area.style.position='fixed';area.style.left='-10000px';document.body.append(area);
      try{area.select();copied=document.execCommand('copy')===true;}catch{copied=false;}finally{area.remove();button.focus({preventScroll:true});}
    }
    status.textContent=copied?'卡片码已复制，发给同事就能点亮这只虎。':'暂时未能自动复制，请选中上方卡片码后手动复制。';
    status.className='code-message '+(copied?'success':'');
  }
  function bindCopy(id,code,statusId){
    var button=document.getElementById(id);
    if(button)button.onclick=function(){void copyCardCode(code,document.getElementById(statusId),button);};
  }
  function save(){record.updatedAt=new Date().toISOString();store.save(record);}
  function answered(){return record.answers.filter(function(n){return n!==null;}).length;}
  function go(route){var hash=route?'#'+route:'';if(location.hash===hash)render();else location.hash=hash;}
  function focusTop(){app.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
  function focusQuestion(){document.getElementById('aitiQuestionTitle').focus({preventScroll:true});document.querySelector('.question-panel').scrollIntoView({block:'start',behavior:'instant'});}
  function restart(){record=model.cleanRecord({});save();go('quiz');}
  function tags(p){return '<div class="tags">'+p.tags.map(function(tag){return '<span>'+esc(tag)+'</span>';}).join('')+'</div>';}
  function renderHome(){
    document.title='方片 AITI · 你是哪只 AI 小老虎？';
    var hero=model.profiles[1],count=answered();
    app.innerHTML='<section class="hero"><div class="hero-copy"><div class="eyebrow">方片 AITI · AI Tiger Type Indicator</div><h1>你和AI的相处方式，<br>是哪一只方片虎？</h1><p>面对一个新工具，你会先体验还是先观察？<br>一句很肯定的AI回答，你会直接用还是再查一遍？<br>16个选择，遇见和AI一起成长的自己。</p><div class="hero-actions"><button id="startAiti" class="primary">'+(record.completed?'查看我的AITI人格':count?'继续我的AITI测试':'领取我的AI人格')+arrow+'</button><button id="openGallery" class="secondary">看看虎友广场</button></div><p class="small-note">无需注册 · 答案不上传 · 选择真实的自己</p>'+(count?'<p class="small-note">'+(record.completed?'你的人格卡已保存在此浏览器。':'已答 '+count+' / 16 题，可以接着完成。')+' <button class="text-button" id="restartAiti">重新开始</button></p>':'')+'<div class="hero-meta"><span><strong>16</strong>道正式题目</span><span><strong>3—5</strong>分钟</span><span><strong>4</strong>个相处维度</span></div></div><figure class="hero-art"><div class="hero-art-top"><span>方片 AI 人格图鉴</span><span>02 / 16</span></div>'+image(hero,'hero-tiger',false)+'<figcaption><strong>Prompt法师</strong><p>“不是AI不行，可能只是咒语还没念对。”</p></figcaption></figure></section><section class="dimensions-intro"><div class="section-heading"><h2>不只看会不会，也看看怎么用。</h2><p>三个维度关于AI，一个维度留给人。</p></div><div class="dimension-cards">'+model.dimensions.map(function(d){return '<article class="dimension-intro"><b>'+d.key+'</b><h3>'+d.name+'</h3><p>'+d.description+'。</p></article>';}).join('')+'</div></section><div class="more-tests"><p>正心正念，利他向善。<br>让技术帮助自己，也让善意被看见。</p></div>';
    document.getElementById('startAiti').onclick=function(){go(record.completed?'result':'quiz');};
    document.getElementById('openGallery').onclick=function(){go('gallery');};
    var restartButton=document.getElementById('restartAiti');if(restartButton)restartButton.onclick=restart;
  }
  function unlockedTile(p,state){
    var own=p.id===state.ownProfileId;
    return '<button type="button" class="tiger-tile unlocked '+(own?'mine':'')+'" data-profile="'+p.id+'"><span class="tile-top"><span>NO. '+p.id+'</span><b>'+(own?'我的本命虎':'已点亮')+'</b></span>'+image(p,'',true)+'<h2>'+p.name+'</h2><p>'+p.tags.join(' / ')+'</p></button>';
  }
  function lockedTile(p){
    return '<article class="tiger-tile locked" data-locked-id="'+p.id+'" aria-label="未解锁的第'+p.id+'号小老虎"><span class="tile-top"><span>NO. '+p.id+'</span><span>未解锁</span></span><div class="mystery-tiger" aria-hidden="true"><span>?</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></div><h2>神秘小老虎</h2><p>输入朋友的卡片码，遇见它。</p></article>';
  }
  function bindTiles(){
    app.querySelectorAll('[data-profile]').forEach(function(button){button.onclick=function(){showProfile(button.dataset.profile);};});
  }
  function renderGallery(){
    document.title='我的虎友广场 · 方片 AITI';
    var state=collection.load(),own=model.profiles.find(function(p){return p.id===state.ownProfileId;});
    if(own&&!state.cardCode)state=collection.rememberResult(own.id);
    var count=state.unlocked.length;
    var ownPanel=own?'<span>我的本命虎 · '+own.name+'</span><strong class="card-code" id="ownCardCode">'+esc(state.cardCode)+'</strong><p>把卡片码发给同事，TA就能点亮你的本命虎。</p><button type="button" class="secondary" id="copyOwnCode">复制我的卡片码</button><p class="code-message" id="copyOwnStatus" role="status"></p>':'<span>我的本命虎还没出现</span><strong>先完成16题测试</strong><p>测完点亮你的第一只虎，领取专属卡片码。</p><button type="button" class="primary" id="squareStart">领取我的AI人格'+arrow+'</button>';
    app.innerHTML='<section class="tiger-square"><div class="gallery-header square-head"><div><div class="eyebrow">方片 AITI · 虎友收集</div><h1>我的虎友广场</h1><p>交换卡片码，慢慢遇见16种不同的AI小老虎。</p></div><div class="square-count"><strong id="unlockedCount">'+String(count).padStart(2,'0')+'</strong><span>/ 16 已点亮</span></div></div><progress class="square-progress" id="collectionProgress" aria-label="虎友点亮进度" max="16" value="'+count+'"></progress><div class="collection-code-zone"><article class="my-code-panel">'+ownPanel+'</article><form id="redeemForm" class="redeem-panel"><span>收到朋友的卡片码？</span><label for="codeInput">输入卡片码，点亮TA的小老虎</label><div class="redeem-controls"><input id="codeInput" name="code" type="text" inputmode="text" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="40" placeholder="AITI-08-ABCD-X" aria-describedby="codeMessage" required><button class="primary" type="submit">解锁小老虎</button></div><p class="code-message" id="codeMessage" role="status" aria-live="polite">卡片码不包含姓名或测试答案。每种虎只计入收集一次。</p></form></div><div class="tiger-grid">'+model.profiles.map(function(p){return state.unlocked.includes(p.id)?unlockedTile(p,state):lockedTile(p);}).join('')+'</div><div class="gallery-bottom"><button type="button" id="galleryStart" class="primary">'+(record.completed?'查看我的人格':'领取我的AI人格')+arrow+'</button><a class="secondary" href="aiti.html">返回测试首页</a></div><p class="collection-storage-note">'+(collection.persistent?'点亮进度仅保存在当前浏览器；换设备或清理浏览器数据后需重新收集。':'收集暂存于当前页面，请复制卡片码留存。')+'</p></section>';
    bindTiles();bindCopy('copyOwnCode',state.cardCode,'copyOwnStatus');
    var start=document.getElementById('squareStart');if(start)start.onclick=function(){go('quiz');};
    document.getElementById('galleryStart').onclick=function(){go(record.completed?'result':'quiz');};
    document.getElementById('redeemForm').onsubmit=function(event){
      event.preventDefault();var input=document.getElementById('codeInput'),message=document.getElementById('codeMessage');
      try{
        var redeemed=collection.redeem(input.value),profile=model.profiles.find(function(p){return p.id===redeemed.profileId;});
        if(redeemed.changed){
          var current=collection.load(),tile=app.querySelector('[data-locked-id="'+profile.id+'"]');
          if(tile){tile.outerHTML=unlockedTile(profile,current);bindTiles();}
          document.getElementById('unlockedCount').textContent=String(current.unlocked.length).padStart(2,'0');
          document.getElementById('collectionProgress').value=current.unlocked.length;
          message.textContent='叮！'+profile.name+'已点亮。可以点击卡片认识它。';input.value='';
        }else message.textContent=profile.name+'已经在你的广场里啦，不会重复计数。';
        message.className='code-message success';
      }catch(error){message.textContent=error.message;message.className='code-message error';}
      input.focus({preventScroll:true});
    };
  }
  function showProfile(id){
    if(!collection.load().unlocked.includes(id))return;
    var p=model.profiles.find(function(p){return p.id===id;});if(!p)return;
    document.getElementById('profileDialogContent').innerHTML='<article class="profile-preview"><span class="eyebrow">人格图鉴 · '+p.id+'</span><h2 id="profileDialogTitle">'+p.name+'</h2>'+image(p,'',false)+'<p>「'+p.title+'」</p>'+tags(p)+'<p class="declaration">“'+p.quote+'”</p><h3>这只虎的故事</h3><p>'+p.reading+'</p><h3>一个AI成长建议</h3><p>'+p.advice+'</p><p class="small-note">这是人格图鉴介绍。完成测试后，再来认识你这次的AI小老虎。</p><button id="profileStart" class="primary">'+(record.completed?'查看我的人格':'开始16题测试')+arrow+'</button></article>';
    var dialog=document.getElementById('profileDialog');dialog.showModal();
    document.getElementById('profileStart').onclick=function(){dialog.close();go(record.completed?'result':'quiz');};
  }
  function renderQuiz(){
    var index=record.cursor,q=model.questions[index];
    if(record.completed){go('result');return;}
    document.title='第 '+(index+1)+' / 16 题 · 方片 AITI';
    app.innerHTML='<div class="quiz-top"><button id="quizHome" class="text-button">‹ 返回 AITI 首页</button><h1>方片 AITI · 认识与AI相处的你</h1></div><div class="quiz-layout"><aside class="quiz-guide">'+image(model.profiles[1],'',false)+'<div><h2>没有标准答案，<br>只有真实的选择。</h2><p>回想平时的工作和生活，<br>按照第一感受作答就好。</p><span class="local-label">'+(store.persistent?'本机自动保存 · 随时可以继续':'记录暂存于当前页面')+'</span></div></aside><section class="question-panel question-enter"><div class="progress-row" aria-live="polite"><strong>第 '+(index+1)+' / 16 题</strong><span id="aitiAnswered">已答 '+answered()+' 题</span></div><progress id="aitiProgress" aria-label="AITI答题进度" value="'+answered()+'" max="16"></progress><form id="aitiQuestionForm"><fieldset><legend id="aitiQuestionTitle" tabindex="-1">'+esc(q.prompt)+'</legend><div class="answer-options">'+labels.map(function(label,i){return '<label class="answer-label"><input type="radio" name="aitiAnswer" value="'+(i+1)+'" '+(record.answers[index]===i+1?'checked':'')+' required><span class="answer-face"><span class="answer-dot" aria-hidden="true"></span>'+label+'</span></label>';}).join('')+'</div></fieldset><p class="answer-help" id="aitiAnswerHelp">'+(record.answers[index]?'已选，可以修改后继续。':'选择最接近你的感受，再继续下一题。')+'</p><div class="quiz-actions"><button class="secondary" id="aitiPrevious" type="button" '+(index===0?'disabled':'')+'>上一题</button><button class="primary" id="aitiNext" type="submit" '+(record.answers[index]?'':'disabled')+'>'+(index===15?'揭晓我的AI人格':'下一题')+arrow+'</button></div></form></section></div>';
    document.getElementById('quizHome').onclick=function(){go('');};
    app.querySelectorAll('input[name="aitiAnswer"]').forEach(function(input){input.onchange=function(){record.answers[index]=Number(input.value);save();document.getElementById('aitiNext').disabled=false;document.getElementById('aitiAnswered').textContent='已答 '+answered()+' 题';document.getElementById('aitiProgress').value=answered();document.getElementById('aitiAnswerHelp').textContent='已选，可以修改后继续。';};});
    document.getElementById('aitiPrevious').onclick=function(){if(record.cursor>0){record.cursor--;save();renderQuiz();focusQuestion();}};
    document.getElementById('aitiQuestionForm').onsubmit=function(event){event.preventDefault();if(!record.answers[index])return;if(index<15){record.cursor++;save();renderQuiz();focusQuestion();}else if(model.complete(record.answers)){record.completed=true;save();analysisRequested=true;go('analysis');}else{record.cursor=record.answers.indexOf(null);save();renderQuiz();focusQuestion();}};
  }
  function renderAnalysis(){
    if(!record.completed){go('quiz');return;}
    if(!analysisRequested||matchMedia('(prefers-reduced-motion: reduce)').matches){go('result');return;}
    analysisRequested=false;
    document.title='正在揭晓你的AI人格 · 方片 AITI';
    var steps=['正在分析你的AI认可度……','正在分析你的AI使用习惯……','正在分析你的AI认知边界……','正在分析你的价值选择……','正在寻找与你最匹配的小老虎……'];
    app.innerHTML='<section class="analyzing"><span class="eyebrow">方片 AITI · 你的AI人格即将揭晓</span><div class="analysis-art">'+image(model.profiles[1],'',false)+'</div><h1>你的专属小老虎，正在赶来。</h1><p id="aitiAnalysisText" role="status" aria-live="polite">'+steps[0]+'</p><div class="analysis-steps" aria-hidden="true">'+steps.map(function(_,i){return '<i class="'+(i===0?'active':'')+'"></i>';}).join('')+'</div><button id="skipAnalysis" class="text-button">直接查看结果</button></section>';
    var step=0;
    analysisTimer=setInterval(function(){step++;if(step>=steps.length){clearInterval(analysisTimer);analysisTimer=null;go('result');return;}document.getElementById('aitiAnalysisText').textContent=steps[step];app.querySelectorAll('.analysis-steps i').forEach(function(dot,i){dot.classList.toggle('active',i<=step);});},700);
    document.getElementById('skipAnalysis').onclick=function(){go('result');};
  }
  function radarSVG(values){
    function points(scale){return [[150,150-95*scale],[150+95*scale,150],[150,150+95*scale],[150-95*scale,150]].map(function(p){return p.join(',');}).join(' ');}
    var coords=values.map(function(d,i){var radius=d.score/5*95;return [[150,150-radius],[150+radius,150],[150,150+radius],[150-radius,150]][i];});
    var description=values.map(function(d){return d.name+' '+d.score.toFixed(2)+'分';}).join('，');
    return '<svg class="radar" viewBox="0 0 300 300" role="img" aria-label="四维雷达图：'+description+'">'+[.2,.4,.6,.8,1].map(function(s){return '<polygon class="radar-grid" points="'+points(s)+'"/>';}).join('')+'<path class="radar-axis" d="M150 55V245M55 150H245"/><polygon class="radar-area" points="'+coords.map(function(p){return p.join(',');}).join(' ')+'"/>'+coords.map(function(p){return '<circle class="radar-point" cx="'+p[0]+'" cy="'+p[1]+'" r="4"/>';}).join('')+'<text class="radar-label" x="150" y="30">A AI认可</text><text class="radar-label" x="269" y="154">U AI使用</text><text class="radar-label" x="150" y="278">K AI了解</text><text class="radar-label" x="31" y="154">V 正向价值</text></svg>';
  }
  function renderResult(){
    if(!record.completed||!model.complete(record.answers)){go('quiz');return;}
    var result=model.score(record.answers),p=result.profile;
    var collected=collection.rememberResult(p.id);
    document.title=p.name+' · 我的方片 AITI 人格';
    app.innerHTML='<div class="result-head"><div><span class="eyebrow">你的方片AITI人格是——</span><h1>原来，你是'+p.name+'。</h1></div><p>这是本次回答描绘的一种相处方式。<br>每一种人格，都有自己的特点与成长空间。</p></div><div class="result-layout"><article class="collectible card-reveal" aria-label="方片AITI人格卡"><div class="card-top"><span class="card-wordmark">'+mark+' 方片 AITI</span><span>人格编号 '+p.id+'</span></div><div class="card-art">'+image(p,'result-art-img',false)+'</div><h2>'+p.name+'</h2><p class="card-subtitle">「'+p.title+'」</p>'+tags(p)+'<p class="declaration">“'+p.quote+'”</p><div class="card-bottom"><span>AI Tiger Type Indicator</span><span>方片新媒体</span></div></article><section class="result-detail"><h2>你的四维相处画像</h2><div class="chart-panel">'+radarSVG(result.dimensions)+'<div class="score-list">'+result.dimensions.map(function(d){return '<div><div class="score-label"><strong>'+d.key+' '+d.name+'</strong><span>'+d.score.toFixed(2)+' / 5</span></div><div class="score-tendency">'+d.tendency+'</div><div class="score-meter" aria-hidden="true"><i style="width:'+d.score/5*100+'%"></i></div></div>';}).join('')+'</div></div><p class="chart-note">每维4题，分别取平均分；四维等权，不生成总排名。图中分数反映这次自述，不是能力或品德评价。</p>'+(result.nearBoundary?'<p class="boundary-note">有维度接近组合分界。换个情境，你可能遇见另一只同样积极、有特点的小老虎。</p>':'')+'<section class="reading-section"><h2>这只虎，像你在哪里？</h2><p>'+p.reading+'</p><div class="growth-advice"><h3>给你的一个AI成长建议</h3><p>'+p.advice+'</p></div></section><section class="result-code"><div><span>我的卡片码</span><strong class="card-code" id="resultCardCode">'+esc(collected.cardCode)+'</strong><p>发给同事，就能点亮你的'+p.name+'。</p></div><button type="button" class="secondary" id="copyResultCode">复制卡片码</button><p class="code-message" id="copyResultStatus" role="status"></p></section><div class="result-actions"><button id="saveAiti" class="primary">保存完整人格卡'+arrow+'</button><button id="editAiti" class="secondary">修改答案</button><button id="retakeAiti" class="secondary">再测一次</button></div><p class="result-status" id="aitiResultStatus" role="status" aria-live="polite">'+(store.persistent?'本次答案与结果保存在此浏览器。':'当前记录暂存于此页面，可下载人格卡留存。')+'</p><div class="result-links"><a href="#gallery">进入虎友广场 ↗</a><a href="learn.html#learn-1.html">把成长建议带回学堂 ↗</a></div></section></div>';
    bindCopy('copyResultCode',collected.cardCode,'copyResultStatus');
    document.getElementById('saveAiti').onclick=function(){void saveCard(result);};
    document.getElementById('editAiti').onclick=function(){record.completed=false;record.cursor=0;save();go('quiz');};
    document.getElementById('retakeAiti').onclick=restart;
  }
  function lines(ctx,text,width){var result=[],line='';for(var letter of text){if(ctx.measureText(line+letter).width>width&&line){result.push(line);line=letter;}else line+=letter;}if(line)result.push(line);return result;}
  function drawText(ctx,text,x,y,width,lineHeight){lines(ctx,text,width).forEach(function(line){ctx.fillText(line,x,y);y+=lineHeight;});return y;}
  function drawRadar(ctx,values,cx,cy,radius){
    function polygon(coords){ctx.beginPath();coords.forEach(function(p,i){if(i===0)ctx.moveTo(p[0],p[1]);else ctx.lineTo(p[0],p[1]);});ctx.closePath();}
    function diamond(r){return [[cx,cy-r],[cx+r,cy],[cx,cy+r],[cx-r,cy]];}
    ctx.lineWidth=2;ctx.strokeStyle='#dcded2';[.2,.4,.6,.8,1].forEach(function(s){polygon(diamond(radius*s));ctx.stroke();});
    var coords=values.map(function(d,i){return diamond(radius*d.score/5)[i];});polygon(coords);ctx.fillStyle='#5ca5d342';ctx.fill();ctx.strokeStyle='#4797c5';ctx.lineWidth=4;ctx.stroke();
    coords.forEach(function(p){ctx.beginPath();ctx.arc(p[0],p[1],6,0,Math.PI*2);ctx.fillStyle='#4797c5';ctx.fill();});
    ctx.font='700 25px "Microsoft YaHei",sans-serif';ctx.fillStyle='#22221f';ctx.textAlign='center';ctx.fillText('A',cx,cy-radius-20);ctx.fillText('U',cx+radius+25,cy+8);ctx.fillText('K',cx,cy+radius+35);ctx.fillText('V',cx-radius-25,cy+8);ctx.textAlign='left';
  }
  async function saveCard(result){
    var button=document.getElementById('saveAiti'),status=document.getElementById('aitiResultStatus');button.disabled=true;status.textContent='正在生成完整人格卡……';
    try{
      var p=result.profile,img=new Image();img.src=p.image;await img.decode();
      var canvas=document.createElement('canvas');canvas.width=1080;canvas.height=2340;var ctx=canvas.getContext('2d');
      ctx.fillStyle='#fafaf7';ctx.fillRect(0,0,1080,2340);ctx.fillStyle='#ffcf28';ctx.fillRect(0,0,1080,104);ctx.fillStyle='#22221f';ctx.font='800 31px "Microsoft YaHei",sans-serif';ctx.fillText('方片 AITI',62,68);ctx.font='500 23px "Microsoft YaHei",sans-serif';ctx.fillText('我的AI人格 · '+p.id,805,67);
      ctx.font='850 71px "Microsoft YaHei",sans-serif';ctx.fillText(p.name,65,210);ctx.font='400 27px "Microsoft YaHei",sans-serif';drawText(ctx,'「'+p.title+'」',67,270,945,42);
      var scale=Math.min(800/img.naturalWidth,610/img.naturalHeight),width=img.naturalWidth*scale,height=img.naturalHeight*scale;ctx.drawImage(img,(1080-width)/2,327+(610-height)/2,width,height);
      ctx.font='600 25px "Microsoft YaHei",sans-serif';p.tags.forEach(function(tag,i){ctx.fillStyle='#fff0af';ctx.fillRect(65+i*242,966,225,51);ctx.fillStyle='#22221f';ctx.fillText(tag,83+i*242,1001);});
      ctx.font='700 34px "Microsoft YaHei",sans-serif';var quoteBottom=drawText(ctx,'“'+p.quote+'”',65,1080,940,53);
      var chartTitleY=Math.max(1185,quoteBottom+30);ctx.font='700 30px "Microsoft YaHei",sans-serif';ctx.fillText('我的四维相处画像',65,chartTitleY);var chartCy=chartTitleY+185;drawRadar(ctx,result.dimensions,268,chartCy,123);
      result.dimensions.forEach(function(d,i){var y=chartTitleY+67+i*78;ctx.fillStyle='#22221f';ctx.font='600 27px "Microsoft YaHei",sans-serif';ctx.fillText(d.key+' '+d.name,505,y);ctx.font='500 25px sans-serif';ctx.fillText(d.score.toFixed(2)+' / 5',881,y);ctx.fillStyle='#707068';ctx.font='400 23px "Microsoft YaHei",sans-serif';ctx.fillText(d.tendency,505,y+33);});
      var readingY=chartCy+217;ctx.fillStyle='#22221f';ctx.font='700 30px "Microsoft YaHei",sans-serif';ctx.fillText('这只虎，像你在哪里？',65,readingY);ctx.font='400 28px "Microsoft YaHei",sans-serif';var readingBottom=drawText(ctx,p.reading,65,readingY+59,945,46);
      var adviceY=readingBottom+42;ctx.fillStyle='#f0efe4';var adviceLines=lines(ctx,p.advice,875);ctx.fillRect(50,adviceY-30,980,96+adviceLines.length*46);ctx.fillStyle='#22221f';ctx.font='700 29px "Microsoft YaHei",sans-serif';ctx.fillText('一个AI成长建议',80,adviceY+12);ctx.font='400 27px "Microsoft YaHei",sans-serif';drawText(ctx,p.advice,80,adviceY+66,875,46);
      var output=document.createElement('canvas');output.width=1080;output.height=Math.ceil(adviceY+66+adviceLines.length*46+340);var out=output.getContext('2d');out.fillStyle='#fafaf7';out.fillRect(0,0,output.width,output.height);out.drawImage(canvas,0,0);out.fillStyle='#22221f';out.font='600 25px "Microsoft YaHei",sans-serif';out.fillText('我的卡片码 · 发给同事，点亮这只虎',65,output.height-260);out.font='700 35px monospace';out.fillText(collection.rememberResult(p.id).cardCode,65,output.height-205);out.fillStyle='#707068';out.font='400 21px "Microsoft YaHei",sans-serif';out.fillText('四维等权 · 本次自述 · 趣味自我观察 · 非专业心理测评',65,output.height-100);out.font='500 23px "Microsoft YaHei",sans-serif';out.fillText('16种人格，没有高低，只有你和AI相处的不同方式。',65,output.height-45);
      var blob=await new Promise(function(resolve){output.toBlob(resolve,'image/png');});if(!blob)throw Error('Export failed');if(saveURL)URL.revokeObjectURL(saveURL);saveURL=URL.createObjectURL(blob);
      document.getElementById('saveImage').src=saveURL;var link=document.getElementById('downloadAitiCard');link.href=saveURL;link.download='方片AITI-'+p.name+'-人格卡.png';document.getElementById('saveDialog').showModal();status.textContent='完整人格卡已生成，可在预览中下载或长按保存。';
    }catch{status.textContent='人格卡图片暂未生成成功，请重试；也可以截图保存当前结果。';}finally{button.disabled=false;}
  }
  function render(){
    if(analysisTimer){clearInterval(analysisTimer);analysisTimer=null;}
    var route=location.hash.slice(1);
    if(route==='quiz'||route==='aiti'||route==='mbti')renderQuiz();else if(route==='analysis')renderAnalysis();else if(route==='result')renderResult();else if(route==='gallery')renderGallery();else renderHome();focusTop();
  }
  document.getElementById('galleryNav').onclick=function(){go('gallery');};
  document.getElementById('closeSaveDialog').onclick=function(){document.getElementById('saveDialog').close();};
  document.getElementById('closeProfileDialog').onclick=function(){document.getElementById('profileDialog').close();};
  window.addEventListener('hashchange',render);render();
})();
