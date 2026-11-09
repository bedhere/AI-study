/* Fangpian's own experience questionnaires. See docs/personality-tests.md for sources.
   Item themes reference public-domain IPIP; these are not validated MBTI/DiSC instruments. */
(function (root) {
  'use strict';
  var axes = [
    {key:'EI',left:'E',right:'I',leftName:'向外交流',rightName:'向内思考'},
    {key:'SN',left:'S',right:'N',leftName:'具体经验',rightName:'可能性'},
    {key:'TF',left:'T',right:'F',leftName:'逻辑权衡',rightName:'人际感受'},
    {key:'JP',left:'J',right:'P',leftName:'计划推进',rightName:'灵活探索'}
  ];
  // Each row: dimension, left option points to first pole?, prompt, left, right, source theme.
  var mbtiRows = [
    [0,1,'一个新选题刚出现时，你更习惯……','先找同事聊一聊，边说边整理想法','先自己梳理思路，成形后再交流','IPIP:E/start-conversations'],
    [1,1,'接到一份陌生的内容简报，你会先看……','具体案例、数据与已经验证的做法','背后的概念，以及还没被尝试的可能','original:SN'],
    [2,1,'两个方案都不错，最终取舍时你更依赖……','目标、依据与投入产出的比较','受众体验，以及对相关人的影响','original:TF'],
    [3,1,'面对下周的内容排期，你更喜欢……','先确定步骤和时间，按节奏推进','先保留调整空间，随信息更新安排','IPIP:C/follow-schedule'],
    [0,0,'一场密集的共创会结束后，你更想……','独处一会儿，让思绪慢慢沉淀','继续和伙伴交流，延续刚才的兴奋','IPIP:E/prefer-alone'],
    [1,0,'学习一种新工具时，最先吸引你的是……','它能拓展出什么新的内容形式','它现在能具体解决哪个实际问题','IPIP:O/new-ways'],
    [2,0,'同事的脚本需要大改，你通常先考虑……','如何让对方感到被理解，再讨论修改','如何清晰说明问题与修改依据','original:TF'],
    [3,0,'一个任务还没定稿时，你更自在的状态是……','先探索几个方向，晚一点再收敛','尽早选定一个方向，逐项完善','original:JP'],
    [0,1,'参加一次不熟悉的行业交流，你倾向于……','主动开启话题，认识不同的人','先观察和倾听，遇到合适话题再加入','IPIP:E/quiet-strangers'],
    [1,1,'复盘一条爆款内容，你通常先关注……','具体发生了什么，哪些动作能复现','它说明了什么趋势，还能延伸什么','original:SN'],
    [2,1,'讨论中出现分歧，你更希望先……','把判断标准和事实依据摆清楚','了解不同立场下的感受与需求','original:TF'],
    [3,1,'工作台上有几个并行任务，你更愿意……','列清单、分优先级，逐件完成','根据当下情况切换，保持推进弹性','IPIP:C/order-plans'],
    [0,0,'需要想出一个重要方案时，你更享受……','有一段不被打扰的独立思考时间','有一个可以来回碰撞想法的讨论空间','IPIP:E/enjoy-group'],
    [1,0,'听别人介绍一个项目，你更常追问……','为什么这样做，长远的图景是什么','具体怎么做，需要哪些资源和步骤','original:SN'],
    [2,0,'你更容易被哪种项目理由打动？','它能够给真实的人带来积极改变','它在逻辑上成立，效果也有依据','original:TF'],
    [3,0,'临时多出半天自由安排的时间，你更想……','跟着当时的兴趣，探索新的事情','把原来想做的事情按计划完成','IPIP:C/do-according-plan'],
    [0,1,'向别人介绍自己的创意时，你通常……','讲出来更容易发现自己的思路','写下来更容易理清自己的思路','original:EI'],
    [1,1,'写作时，你更自然的表达方式是……','用细节、例子和清晰的事实讲明白','用联想、比喻和概念建立新连接','IPIP:O/imagination'],
    [2,1,'为一个合作项目制定规则，你更重视……','同一标准是否一致、可解释','规则能否照顾不同人的实际处境','original:TF'],
    [3,1,'临近一个已经约定的交付节点，你更舒服的做法是……','提前完成主体，留出检查和调整时间','持续吸收新信息，接近节点时集中成形','IPIP:C/always-prepared'],
    [0,0,'周末恢复精力时，你通常更需要……','安静地做自己的事，减少外界打扰','和喜欢的人一起活动，感受交流的能量','IPIP:E/seek-quiet'],
    [1,0,'看到一个成熟的内容栏目，你更容易想到……','还能不能换一种形式，打开新的可能','哪些有效细节值得保留、积累和打磨','IPIP:O/new-ways'],
    [2,0,'朋友请你评价一个有争议的决定，你会先……','理解他的动机和感受，再给建议','分析决定的条件和后果，再给建议','IPIP:A/sympathize-feelings'],
    [3,0,'旅行或团建还没开始，你更喜欢……','只确定关键事项，到现场再探索','把路线与安排先整理好，心里更踏实','IPIP:C/make-plans'],
    [0,1,'共创讨论出现短暂冷场，你更可能……','抛出一个话题，让讨论继续流动','利用这段安静，先把自己的观点想清楚','IPIP:E/start-conversations'],
    [1,1,'处理一个难题时，你更先信任……','自己见过、做过并验证过的经验','从模型和概念推演出的新解释','original:SN'],
    [2,1,'团队给一个方案反馈，你更想先听到……','它哪里不成立，具体应该怎么修正','它哪里产生了共鸣，别人真实感受如何','original:TF'],
    [3,1,'一天结束时，哪种状态更让你放松？','重要任务已收尾，明天安排也有了轮廓','仍有几个可尝试的方向，明天可以继续探索','IPIP:C/order'],
    [0,0,'面对一个有意思的话题，你往往……','先深入想一想，想好再表达','一边交流一边想，观点会逐渐清晰','original:EI'],
    [1,0,'读一份信息量很大的报告，你更愿意先……','抓住整体结构与背后的联系','确认关键事实和具体细节','original:SN'],
    [2,0,'让一次合作顺利完成，对你来说更自然的关注点是……','大家是否被尊重，合作体验是否舒服','职责与判断是否清楚，决策是否合理','IPIP:A/make-people-ease'],
    [3,0,'一个新机会打乱了原安排，你通常更倾向于……','重新组合安排，看看新的机会能带来什么','先衡量它对已定计划的影响，再决定调整','original:JP']
  ];
  var mbti = mbtiRows.map(function(r,i){return {id:'mbti-'+(i+1),axis:r[0],direction:r[1]?1:-1,prompt:r[2],left:r[3],right:r[4],source:r[5]};});
  var discRows = [
    ['D',1,'项目方向不清楚时，我愿意站出来推动团队作出决定。','IPIP:E3/take-charge'],
    ['I',1,'我常用生动的故事或例子，让别人对一个选题产生兴趣。','IPIP:E/captivate-people'],
    ['S',1,'同事讲述困难时，我愿意耐心听完，再一起找办法。','IPIP:A/take-time-for-others'],
    ['C',1,'发布内容前，我习惯核对事实、数据和引用。','IPIP:C/pay-attention-details'],
    ['D',-1,'即使目标明确，我通常也会等别人先确定行动方向。','IPIP:E3/wait-for-others'],
    ['I',-1,'讨论一个很有意思的想法时，我通常不太向别人表达自己的兴奋。','IPIP:E/keep-background'],
    ['S',-1,'同一件事需要向伙伴解释几遍时，我很难继续保持耐心。','original:steadiness'],
    ['C',-1,'时间紧时，我容易跳过自己原本安排的检查步骤。','original:conscientiousness'],
    ['D',1,'遇到阻碍时，我会先确定最关键的问题，再推动一个可行行动。','original:dominance'],
    ['I',1,'在新的合作关系里，我通常能主动开启轻松的交流。','IPIP:E/start-conversations'],
    ['S',1,'我愿意持续跟进日常事务，让团队的交接保持稳定。','original:steadiness'],
    ['C',1,'讨论方案时，我会追问结论由哪些证据支持。','original:conscientiousness'],
    ['D',-1,'需要明确提出不同意见时，我往往会把自己的观点暂时留在心里。','IPIP:E3/hold-back-opinions'],
    ['I',-1,'向团队介绍创意时，我通常偏向简短交代，很少主动调动现场气氛。','original:influence'],
    ['S',-1,'支持一个需要长期重复跟进的项目时，我容易失去原有的耐心。','original:steadiness'],
    ['C',-1,'交付标准没写清楚时，我常直接开始，很少先确认细节。','original:conscientiousness'],
    ['D',1,'我更愿意承担有挑战的目标，而不只是维持现状。','original:dominance'],
    ['I',1,'跨部门合作时，我愿意主动联络不同的人，把大家连接起来。','IPIP:E/involve-others'],
    ['S',1,'面对变化，我会关注伙伴是否跟得上，给彼此留出适应时间。','original:steadiness'],
    ['C',1,'我会把一次有效的做法整理成清晰、可重复使用的流程。','IPIP:C/order-plans'],
    ['D',-1,'即使已有足够信息，我也倾向于回避作出最后的取舍。','original:dominance'],
    ['I',-1,'在小组交流中，我更常待在背景里，而不是积极参与表达。','IPIP:E/keep-background'],
    ['S',-1,'大家还在适应新的工作安排时，我通常不愿放慢自己的推进节奏。','original:steadiness'],
    ['C',-1,'复盘时，我常凭总体印象判断，很少回看记录和细节。','original:conscientiousness']
  ];
  var disc = discRows.map(function(r,i){return {id:'disc-'+(i+1),axis:r[0],direction:r[1],prompt:r[2],source:r[3]};});
  function profile(name,image,line,strength,watch,partner,prompt){return {name:name,image:image,line:line,strength:strength,watch:watch,partner:partner,prompt:prompt};}
  var profiles = {
    INTJ:profile('远见虎','tiger-thinking-seated.webp','把零散灵感，连成一张有方向的地图。','擅长从内容目标倒推结构，提前想清长期路径。','容易在方案还未落地时，就把后面几步都想完。','分享推导过程，再请伙伴帮你检验现实条件。','先帮我建立内容策略框架，再逐条检验关键假设。'),
    INTP:profile('解构虎','tiger-reading-standing.webp','好问题，比标准答案更让你着迷。','乐于拆开复杂工具与概念，找到内容背后的机制。','可能持续优化解释，却推迟了第一版的交付。','约定一个可交付的小版本，再为探索留时间。','请拆解这个问题的原理，比较不同解释并给出最小实验。'),
    ENTJ:profile('领航虎','tiger-suit-document.webp','把目标说清楚，也把大家带到下一步。','擅长厘清方向、协调资源，推动内容项目向前走。','推进速度快时，伙伴可能还没来得及表达顾虑。','确定目标后，专门留一轮听取不同意见。','把目标拆成里程碑、负责人和可衡量的交付标准。'),
    ENTP:profile('破题虎','tiger-star-eyes-excited.webp','换个角度，老题也能长出新故事。','善于挑战习惯做法，为选题带来意外的新连接。','新点子很多时，已经承诺的方向可能被冷落。','每次探索后，选出一个最值得验证的假设。','给我三个截然不同的选题角度，并说明各自的验证方式。'),
    INFJ:profile('洞察虎','tiger-reading-seated.webp','先读懂人的心，再讲有温度的故事。','愿意深入理解受众动机，组织有意义的内容表达。','可能替别人想得过多，把自己的需求放到最后。','把你的观察说出来，也直接说明需要的支持。','从受众的真实需求出发，帮我梳理这条内容的叙事。'),
    INFP:profile('灵感虎','tiger-holding-rainbow.webp','给想象力一点空间，好作品会慢慢发光。','重视真实表达，能为内容带来细腻的情绪与价值视角。','理想表达与现实约束冲突时，容易反复犹豫。','先保护最重要的一处表达，其余部分允许迭代。','保留这段文字的真实感，提供几种不同的表达可能。'),
    ENFJ:profile('共创虎','tiger-open-arms.webp','让每个人的好想法，都有被看见的位置。','善于连接团队和受众，把共同目标变成合作动力。','照顾全场时，容易承担本不属于自己的任务。','把关心转化为清晰分工，也给自己留出边界。','设计一场人人能参与的内容共创会，包含清晰的讨论步骤。'),
    ENFP:profile('火花虎','tiger-wink-wave.webp','哪里有新的可能，哪里就有你的好奇心。','乐于发现跨领域连接，能带动团队进入创作状态。','同时展开太多方向，可能分散了落地精力。','把最心动的点子写成一个今天能完成的小行动。','围绕这个主题发散五种有趣的表达，再帮我收敛一个。'),
    ISTJ:profile('秩序虎','tiger-cap-salute.webp','把每一个小环节，做成可靠的基本功。','擅长记录、检查与稳定交付，让内容流程有据可循。','熟悉的方法很可靠，也可能让新机会不容易进入。','保留稳定主流程，另开一小块空间做新尝试。','帮我把这次任务整理成可核对的清单，并检查遗漏。'),
    ISFJ:profile('守护虎','tiger-with-pets.webp','细节有人记得，伙伴就能安心向前。','能注意到团队的具体需要，把支持落实在行动上。','持续补位可能让自己的付出变得不易被看见。','说清你已经承担了什么，也为协作设定边界。','检查这份交接说明，让接手的伙伴能安心开始。'),
    ESTJ:profile('统筹虎','tiger-walkie-talkie.webp','把一件复杂的事，安排得明明白白。','擅长组织排期与分工，让多人项目有节奏地推进。','过度依赖既定安排时，可能忽略新的变化。','在排期里留一个固定的调整窗口，主动收集反馈。','把这个内容项目拆成任务、依赖关系和检查节点。'),
    ESFJ:profile('暖场虎','tiger-double-thumbs-up.webp','让合作不只顺利，也让每个人感到被支持。','善于维护沟通氛围，及时看见伙伴的贡献与需求。','太在意大家是否满意，可能迟迟不愿提出异议。','先表达支持，再把具体问题和期待说清楚。','帮我写一段真诚的团队反馈，既肯定贡献也说清调整建议。'),
    ISTP:profile('实干虎','tiger-headband-thumbs-up.webp','亲手试一下，答案常常就在下一步。','善于用小实验定位问题，把工具真正用起来。','直接动手很有效，但别人可能不了解你的判断。','开始行动前，用两句话说明你要验证什么。','给我一个最小可操作实验，按步骤排查这个问题。'),
    ISFP:profile('审美虎','tiger-cinema-popcorn.webp','用敏锐的感受，把日常变成值得看的作品。','能注意画面、节奏和情绪，让内容更有真实触感。','感受很清楚时，也可能不容易解释选择的依据。','找一两个参考，帮助伙伴理解你的审美意图。','围绕这份视觉参考，提炼画面、色彩与叙事节奏建议。'),
    ESTP:profile('行动虎','tiger-headband-running.webp','先迈出一步，再从真实反馈里找到节奏。','能快速观察现场情况，把机会转化为可见的行动。','反应很快时，可能少了一轮风险与细节检查。','行动前留一分钟，确认边界、成本与回退方案。','给出今天就能验证的行动方案，并列出需要先确认的风险。'),
    ESFP:profile('活力虎','tiger-double-v.webp','让真实的热情，成为内容里最鲜活的部分。','善于感知现场与互动反馈，让表达更有感染力。','当下的热闹很吸引人，也要记得长线安排。','用一个简单的记录习惯，把现场灵感积累下来。','帮我把现场观察变成生动短视频脚本，保留自然互动。')
  };
  var discProfiles = {
    D:profile('破局虎','tiger-headband-running.webp','看清目标，就为团队打开第一条路。','在需要取舍和推动时，你倾向于主动承担、聚焦结果。','快速决策时，也给不同意见一个明确的表达机会。','先谈目标与边界，再给伙伴选择具体做法的空间。','把问题变成一个今天能推动的行动，同时列出关键风险。'),
    I:profile('表达虎','tiger-open-arms.webp','把想法讲得有趣，也把伙伴连接起来。','你倾向于用热情、故事与交流，让人愿意一起行动。','气氛被带动之后，记得把承诺落实成下一步。','共创结束后，确认负责人、时间和需要的支持。','帮我把想法变成有吸引力的提案，并补上明确的行动安排。'),
    S:profile('同行虎','tiger-with-pets.webp','稳定的陪伴，是让合作走得更远的力量。','你倾向于耐心支持、持续跟进，让团队保持稳定节奏。','支持别人时，也要及时说出自己的需要与不同意见。','遇到变化，先说明原因，再共同约定适应节奏。','写一份温和而清晰的协作说明，让伙伴知道变化和支持安排。'),
    C:profile('精研虎','tiger-teacher-pointer.webp','把每一个细节，打磨成值得信赖的作品。','你倾向于检查事实、厘清标准，用证据提高交付质量。','追求完善时，记得区分必须做好与可以迭代的部分。','提前约定验收标准，也约定何时停止打磨。','检查这份内容的证据、逻辑与遗漏，并按重要程度排序。')
  };
  var balanced = profile('多面虎','tiger-seated-smile.webp','这一刻的你，有不止一种打开方式。','你的回答没有形成清晰的单一倾向，可能会随场景切换。','不用急着选一个标签，留意自己在具体情境中的感受。','告诉伙伴什么情境下你更自在，往往比报出类型更有用。','帮我对比两种不同的协作方式，用具体场景检验哪种更适合我。');
  function questions(kind){if(kind==='mbti')return mbti;if(kind==='disc')return disc;throw new Error('Unknown test');}
  function complete(kind,answers){var q=questions(kind);return Array.isArray(answers)&&answers.length===q.length&&Array.from(answers).every(function(v){return Number.isInteger(v)&&v>=1&&v<=5;});}
  function score(kind,answers){
    if(!complete(kind,answers))throw new Error('Please answer every question');
    if(kind==='mbti'){
      var sums=[0,0,0,0];mbti.forEach(function(q,i){sums[q.axis]+=(3-answers[i])*q.direction;});
      var dimensions=axes.map(function(a,i){var value=Math.round(50+sums[i]/16*50);return Object.assign({},a,{score:value,balanced:sums[i]===0,low:Math.abs(sums[i])<=4});});
      var type=dimensions.map(function(d){return d.balanced?'X':d.score>50?d.left:d.right;}).join('');
      return {kind:kind,type:type,profile:profiles[type]||balanced,dimensions:dimensions,unclear:dimensions.some(function(d){return d.low;})};
    }
    var totals={D:0,I:0,S:0,C:0};disc.forEach(function(q,i){totals[q.axis]+=q.direction===1?answers[i]-1:5-answers[i];});
    var names={D:'推动与决断',I:'表达与连接',S:'支持与稳定',C:'标准与细节'};
    var dimensions=Object.keys(totals).map(function(key){return {key:key,label:names[key],score:Math.round(totals[key]/24*100)};});
    var ranked=dimensions.slice().sort(function(a,b){return b.score-a.score;});
    var leaders=ranked.filter(function(d){return d.score===ranked[0].score;});
    var type=leaders.map(function(d){return d.key;}).join(' / ');
    return {kind:kind,type:type,profile:leaders.length===1?discProfiles[type]:balanced,dimensions:dimensions,unclear:ranked[0].score-ranked[1].score<=8,secondary:ranked[1].key,tied:leaders.length>1};
  }
  function cleanRecord(kind,value){
    var length=questions(kind).length;value=value&&typeof value==='object'?value:{};
    var answers=Array.from({length:length},function(_,i){var v=Array.isArray(value.answers)?value.answers[i]:null;return Number.isInteger(v)&&v>=1&&v<=5?v:null;});
    return {answers:answers,cursor:Number.isInteger(value.cursor)&&value.cursor>=0&&value.cursor<length?value.cursor:0,completed:value.completed===true&&complete(kind,answers),updatedAt:typeof value.updatedAt==='string'?value.updatedAt:''};
  }
  root.FangpianPersonality={version:1,axes:axes,questions:questions,profiles:profiles,discProfiles:discProfiles,balanced:balanced,complete:complete,score:score,cleanRecord:cleanRecord};
})(typeof window==='undefined'?globalThis:window);
