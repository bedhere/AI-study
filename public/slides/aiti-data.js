/* 方片 AITI: user-supplied questions and character copy; independent, local rules. */
(function(root){
  'use strict';
  var threshold=3.5;
  var dimensions=[
    {key:'A',name:'AI认可度',english:'Acceptance',description:'对AI价值、人机协作和技术发展的开放程度',tendencies:['稳健观察型','开放探索型'],weight:.25},
    {key:'U',name:'AI使用度',english:'Usage',description:'将AI应用到工作、学习和生活中的程度',tendencies:['按需启用型','日常实践型'],weight:.25},
    {key:'K',name:'AI了解度',english:'Knowledge',description:'对AI原理、能力边界、幻觉和风险的理解程度',tendencies:['持续探索型','深度理解型'],weight:.25},
    {key:'V',name:'正向价值度',english:'Value',description:'对诚信、责任、善意和利他的重视程度',tendencies:['价值探索型','责任践行型'],weight:.25}
  ];
  var prompts=[
    '当AI能够明显提高效率时，我愿意主动尝试把它加入自己的工作流程。',
    '我认为未来越来越多的工作，会形成“人 + AI”的协作模式。',
    '面对一个新的AI工具，我更倾向于先体验和了解，再决定它是否适合自己。',
    '我认为AI带来的不只是工具升级，也可能改变我们分析和解决问题的方式。',
    '遇到信息整理、文案创作、方案分析等任务时，我经常会想到让AI参与。',
    '我会根据任务不断调整Prompt，而不是问AI一次就结束。',
    '当AI第一次生成的结果不理想时，我通常会继续修改要求，让答案逐渐接近自己的目标。',
    '我已经在真实的工作或生活场景中，通过AI明显节省过时间或提高过效率。',
    '即使AI回答得非常肯定，我也知道它仍然有可能出错。',
    '我大致了解为什么Prompt、上下文和模型能力会影响AI最终结果。',
    '涉及重要数据、专业信息或关键结论时，我不会只依赖AI回答，而会进行再次核验。',
    '我能够大致判断一项任务适合直接交给AI、适合人机协作，还是应该由人进行最终判断。',
    '如果我发现一种能够明显提高效率的AI方法，在合适的情况下，我愿意分享给身边的同事。',
    '即使AI帮助我快速完成了一项任务，我仍然认为最终结果应该由使用它的人承担责任。',
    '如果AI生成的内容可能伤害、误导或不公平地评价别人，我会重新检查甚至放弃使用这个结果。',
    '我认为AI能力越强，人越需要保持诚信、独立判断和对他人的善意。'
  ];
  var questions=prompts.map(function(prompt,i){return {id:'aiti-q'+(i+1),dimension:Math.floor(i/4),prompt:prompt};});
  function p(id,key,name,title,tags,quote,reading,advice){return {id:id,key:key,name:name,title:title,tags:tags.split(' / '),quote:quote,reading:reading,advice:advice,image:'assets/aiti/'+id+'_'+name+'.png'};}
  var profiles=[
    p('01','1111','赛博诸葛','AI算一步，你已经看到三步后的那只虎','洞察 / 判断 / 策略 / 清醒','AI负责算得快，我负责看得远。','拿到AI的答案，你还会接着问：为什么，接下来呢，有没有第二种可能？你喜欢把工具、判断和人的责任放在同一张地图上。对你来说，人机协作是一场有方向、有边界的长期配合。','挑一个真实项目，写下目标、关键假设和人工核验点，让AI帮你比较两条路径，再由你作出选择。'),
    p('02','1110','Prompt法师','一句咒语就能让AI开始加班的那只虎','Prompt / 表达 / 调试 / 迭代','不是AI不行，可能只是咒语还没念对。','AI第一次交作业不合心意？你的魔法才刚开始。补背景、给示例、改约束，一轮轮把“差不多”调成“就是这个”。你和AI的默契，常常藏在愿意多说清楚一点的耐心里。','把一段有效Prompt整理成“背景—目标—约束—示例—核验”的模板，试着分享给一位同事，并补上使用边界。'),
    p('03','1100','AI炼金术士','什么素材到手里都想炼一炼的那只虎','创造 / 转化 / 整合 / AIGC','给我一点素材，我还你一个成品。','文字、图片、音乐、视频、PPT，到了你手里就像进入了创意炼金炉。你喜欢让不同工具接力，把零散材料变成可见作品。每一次尝试，都是对新组合的好奇。','用同一份素材做两种内容形式，记录每一步输入与输出；发布前再核对来源、授权与事实。'),
    p('04','0111','人机搭子王','最知道什么时候自己上、什么时候让AI上的那只虎','协作 / 判断 / 配合 / 效率','人负责判断，AI负责加速。','你不急着把整件事扔给AI，更喜欢先分好工：哪些交给工具，哪些需要人理解，哪些必须由人拍板。搭子可以帮忙跑得快，方向盘还是握在你手里。','把下一项任务拆成“AI先做、人来判断、共同迭代”三栏，完成后复盘一次分工是否合适。'),
    p('05','1010','脑洞永动机','给一个点子能长出十个方案的那只虎','创意 / 发散 / 灵感 / 想象','一个想法怎么够？再来十个。','别人看到一个功能，你已经在想它还能怎么玩。AI像一面会接梗的灵感墙，让想法不断长出分支。你享受可能性，也愿意换个角度看熟悉的问题。','给十个点子加上“谁需要、怎么验证、会影响谁”三条约束，选一个做成今天能试的小样。'),
    p('06','0110','数字鲁班','不整虚的，能做出来才算本事的那只虎','实用 / 落地 / 工具 / 解决问题','工具不用最炫，解决问题最好。','新功能再热闹，你更关心它能不能解决眼前的真问题。你喜欢把工具接成能用的流程，让方案落到按钮、步骤和交付物上。真正好用的东西，总能在日常里留下痕迹。','选一个重复任务，做一版最小工具流，并为它补上检查步骤、出错时的退路和同事能看懂的说明。'),
    p('07','1000','AI开荒者','别人还在研究，你第一版已经做完的那只虎','行动 / 尝试 / 探索 / 实践','先跑起来，再慢慢优化。','面对新的AI工具，你的第一反应常常是：先试。你愿意走进还没有现成路线的地方，在真实反馈里边走边学。第一版不一定完美，但它能告诉你下一步该往哪里去。','给下一次探索设一个小目标和时间上限，只用低风险材料试跑，结束后记下收获与需要核验的问题。'),
    p('08','1011','善意放大器','自己变强以后还想顺手带别人一把的那只虎','利他 / 分享 / 共情 / 正向','能力被AI放大，善意也可以。','你在意的不只是自己快了多少，也会想到身边的人能不能少绕一点弯。一份解释清楚的经验、一次耐心的提醒，都可能让技术真正成为彼此的帮助。','把一个自己验证过的AI方法写成三步小教程，附上适用场景和注意事项，邀请同事一起试用。'),
    p('09','0011','反幻觉侦探','AI说啥你都得先查一下的那只虎','核验 / 理性 / 判断 / 边界','AI可以给答案，但确认答案这件事，还是得我来。','AI说得越肯定，你越知道重要信息需要再查一遍。你的放大镜会落在来源、证据和关键细节上。你愿意借助工具，也会认真守住最后那道判断关。','做一张简短的核验清单：原始来源、数据日期、关键假设、责任人。把核验过程变成可复用的习惯。'),
    p('10','0100','效率开挂虎','能十分钟搞定绝不手搓两小时的那只虎','自动化 / 效率 / 执行 / 工具流','重复劳动，能自动就别硬扛。','那些一遍遍重复的小事，是你最想交给AI的任务。你喜欢让工具真正进入工作流，把省下来的时间还给更值得投入的事情。快一点的背后，是对日常摩擦的敏锐观察。','挑一个正在用的自动化流程，增加一次结果抽查和人工接管入口，再记录它实际节省了多少时间。'),
    p('11','1001','灵感捕手','灵感只要路过你这里基本跑不掉的那只虎','灵感 / 创意 / 发现 / 表达','先抓住，再把它变成现实。','一句话、一张图、一个生活里的小观察，都可能被你装进灵感口袋。AI是愿意陪你往下聊的创意搭子，让一闪而过的念头慢慢变得可以表达、可以尝试。','建一个小小的灵感库，每周选一条，请AI协助展开；再亲手完成一份能让别人看到的作品。'),
    p('12','1101','共创带飞王','自己会还不算完，还得把身边人一起带会的那只虎','分享 / 协作 / 带动 / 利他','一个人效率翻倍很好，一群人一起翻倍更好。','学到一个新玩法，你会自然想到：能不能让大家也用起来？你愿意把经验讲清楚，在共同尝试里接住不同的问题。你喜欢的进步，常常是一起向前走。','组织一次短共创：演示一个已验证的小方法，让每个人亲手试一遍，并收集问题，持续完善使用说明。'),
    p('13','0010','AI清醒派','AI可以很聪明，但脑子必须自己留着的那只虎','边界 / 责任 / 理性 / 独立','拥抱AI，不等于把判断力外包。','你愿意使用AI，也会提醒自己：一个流畅的答案，不等于一个可以直接照做的决定。你习惯保留判断空间，在方便与边界之间，为真实的人和真实的问题留位置。','为一种常用场景写清楚“可以交给AI的部分”和“必须由人确认的部分”，再把这条边界告诉合作伙伴。'),
    p('14','0001','疯狂进化虎','今天不会没关系，明天一定升级的那只虎','学习 / 进步 / 好奇 / 成长','我不怕不会，我只怕停止升级。','不必一开始就什么都会。你愿意从一个真实的小问题出发，一点点认识工具、积累经验。每一次弄明白一点、做出来一点，都是属于自己的升级。','本周只选一个小技能：先完成一次练习，再说明自己学到了什么、还需要核对什么。让进步变得看得见。'),
    p('15','0101','靠谱输出机','事情交过来，总能给你整出个结果的那只虎','稳定 / 责任 / 交付 / 行动','想到只是开始，做到才算完成。','你喜欢让想法变成真正能交付的东西。AI可以是帮手，但你会关心结果有没有回应需求、合作伙伴能不能接着用。清晰的完成，比热闹的开头更能让你踏实。','为下一份交付物写三条验收标准，让AI先按标准自查，再由你核验关键内容并完成最后确认。'),
    p('16','0000','长期主义虎','不求今天封神，只求每天升级一点的那只虎','积累 / 耐心 / 成长 / 长期主义','真正拉开距离的，是每天多会一点。','面对飞速变化的AI世界，你不一定追每个热点。你更愿意按照自己的节奏，把真正有价值的方法逐渐沉淀下来。慢慢扎根，也是一种认真向前的方式。','选一个最贴近日常需求的AI场景，每天练十分钟，保留一条有效经验。一个月后回头看看自己的技能树。')
  ];
  function complete(answers){return Array.isArray(answers)&&answers.length===16&&Array.from(answers).every(function(n){return Number.isInteger(n)&&n>=1&&n<=5;});}
  function score(answers){
    if(!complete(answers))throw new Error('Please complete all 16 questions');
    var values=dimensions.map(function(d,i){var total=answers.slice(i*4,i*4+4).reduce(function(a,b){return a+b;},0);var mean=total/4;return Object.assign({},d,{score:mean,tendency:d.tendencies[mean>=threshold?1:0],nearBoundary:Math.abs(mean-threshold)<=.25});});
    var key=values.map(function(d){return d.score>=threshold?'1':'0';}).join('');
    return {key:key,dimensions:values,profile:profiles.find(function(p){return p.key===key;}),nearBoundary:values.some(function(d){return d.nearBoundary;})};
  }
  function cleanRecord(value){
    value=value&&typeof value==='object'?value:{};
    var answers=Array.from({length:16},function(_,i){var n=Array.isArray(value.answers)&&value.answers.length===16?value.answers[i]:null;return Number.isInteger(n)&&n>=1&&n<=5?n:null;});
    return {answers:answers,cursor:Number.isInteger(value.cursor)&&value.cursor>=0&&value.cursor<16?value.cursor:0,completed:value.completed===true&&complete(answers),updatedAt:typeof value.updatedAt==='string'?value.updatedAt:''};
  }
  function createStore(storage,onFailure){
    var persistent=true,memory=cleanRecord({}),key='fangpian_aiti_v1';
    function fail(){persistent=false;if(onFailure)onFailure();}
    try{storage.setItem('aiti_probe','1');storage.removeItem('aiti_probe');}catch(error){fail();}
    function load(){
      if(persistent){try{var data=JSON.parse(storage.getItem(key)||'{}');memory=cleanRecord(data&&data.version===1?data.record:{});}catch(error){memory=cleanRecord({});}}
      return cleanRecord(memory);
    }
    function save(value){memory=cleanRecord(value);if(persistent){try{storage.setItem(key,JSON.stringify({version:1,record:memory}));}catch(error){fail();}}return persistent;}
    return {key:key,load:load,save:save,get persistent(){return persistent;}};
  }
  root.FangpianAITI={version:1,threshold:threshold,dimensions:dimensions,questions:questions,profiles:profiles,complete:complete,score:score,cleanRecord:cleanRecord,createStore:createStore};
})(typeof window==='undefined'?globalThis:window);
