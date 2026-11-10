/**
 * 课程结构化数据 —— 门户首页 (home.html) 与 Wiki 学习页 (learn.html) 的统一数据源。
 * 维护一处即可，新增/调整课程内容只改这里。
 *
 * 结构：篇章(part) → 主题(topic) → 知识点(lesson)
 * lesson.file 对应 slides/ 下的某个 .html
 * lesson.tag  用于显示彩色标签（交互/动画/概念/案例/安全 等）
 */
window.COURSE = {
  meta: {
    title: '学 AI 产品，从入门到精通',
    subtitle: '从大模型底层原理到 AI Agent Harness',
    brand: 'AI学院',
    author: '方片',
    authorUrl: '',
    github: 'https://github.com/bedhere/AI-study',
  },
  parts: [
    /* 开篇：课程的第一站，先定位自己再讲怎么学。放在零基础入门篇之前，新访客默认落地
       在这里（learn.html 取 FLAT[0]）。暂时复用 prologue 标记，首页会渲染成 INTRO
       徽章，与零基础入门篇重复；待 Ask Alice 分支落地后换成专用的 preface 样式。 */
    {
      id: 'p-start',
      num: '课程开篇',
      title: '开始之前',
      desc: '四节开篇小课：先按目标挑一条学习路线，再用达克曲线找到自己现在的位置，讲清怎么学才能真的过脑子，以及为什么值得先花时间弄懂原理。原理通了，后面所有方案你都能自己看懂。',
      color: '#64748b',
      group: 'main',
      routes: ['use', 'pro', 'pm', 'build'],
      prologue: true,
      topics: [
      {id: 't-academy', title: '把 AI 用进工作', desc: '先理解，再实操，最后复盘。三节通用教学样板。', lessons: [{"file":"academy-knowledge.html","title":"AI 能帮忙，也需要你来判断","desc":"理解 AI 草稿、事实核验与人工判断的分工，用一次分享资料整理练习建立基础。","tag":"概念"},{"file":"academy-practice.html","title":"用 AI 把学习资料整理成三版分享通知","desc":"围绕一份虚构活动简报，完成材料输入、提示词、三版草稿和人工验收，不依赖付费工具。","tag":"实战"},{"file":"academy-review.html","title":"交付前的核验：三道练习与一次复盘","desc":"用三道情境题练习核验、资料边界和责任判断，再检查自己的实操结果。","tag":"概念"}]},
        {
          id: 't-intro',
          title: '入门与定位',
          desc: '先搞清楚我们在哪里、为什么要打基础',
          lessons: [
            /* 路线选择放在全课第一节：五条路线最后都汇到「入门与定位」，
               所有人必经此处。注册成课时它才有阅读器外壳，也才进得了翻页序列。 */
            { file: 'roadmap.html', title: "从你的工作目标开始学 AI", desc: "方片正在从 MCN 向科技方向转型。无论你在哪个岗位，都可以从适合自己的起点开始，把 AI 用进真实工作。", tag: '开篇' , navTitle: "从你的工作目标开始学 AI"},
            { file: '0-intro.html', title: "我们在哪里？达克效应", desc: "达克鲁宁效应 · Dunning-Kruger Effect：全员 AI 学习课程，正式开始之前先定位自己。", tag: '开篇' , navTitle: "我们在哪里？达克效应"},
            { file: '0-how.html', title: "怎样学，知识才能过脑子？", desc: "这门课不缺内容，缺的是你停下来想一想的 30 秒。", tag: '开篇' , navTitle: "怎样学，知识才能过脑子？"},
            { file: '0-why.html', title: "为什么花这么多时间讲原理？", desc: "磨刀不误砍柴工 · 打好基础才能真正做工程化", tag: '开篇' , navTitle: "为什么花这么多时间讲原理？"},
          ],
        },
      ],
    },
    /* 学习方法专题：开篇讲了「怎样学才过脑子」，这一章把那一节展开成十一节可操作的做法。
       标 prologue，所以不占主线编号，后面篇章的序号不变；四条路线都可见，因为提问、验证、
       留住知识这三件事跟学员想走哪条路无关。 */
    {
      id: 'p-learn',
      num: '学习方法',
      title: 'AI 教我学习：把它当老师用',
      desc: "围绕真实问题练习补充背景、澄清提问、核验答案、阅读原文与检查理解。请在实际使用的 AI 工具中练习，学堂当前未接入对话式助教。",
      color: '#b45309',
      group: 'main',
      routes: ['use', 'pro', 'pm', 'build'],
      prologue: true,
      topics: [
        {
          id: 't-learn-ask',
          title: "提问与原文",
          desc: "让 AI 帮我判断：这个建议适合我吗；让 AI 帮我找到下一步该问什么；让 AI 按我的情况讲清楚；让 AI 只根据我贴出的原文回答",
          lessons: [
            { file: 'learn-1.html', title: "让 AI 帮我判断：这个建议适合我吗", desc: "AI 说年卡划算，可能只是对经常去的人划算。把时间、距离和真实习惯说清楚，答案才是在帮你做决定。", tag: '认知', navTitle: "让 AI 帮我判断：这个建议适合我吗" },
            { file: 'learn-2.html', title: "让 AI 帮我找到下一步该问什么", desc: "能问出答案、能指出可疑处、能问出下一问，这三层是分界。读完能认出自己停在哪一层，以及下一步写哪一句。", tag: '提问', navTitle: "让 AI 帮我找到下一步该问什么" },
            { file: 'learn-3.html', title: "让 AI 按我的情况讲清楚", desc: "锚点、场景、出题、预警，每缺一个，回答就少一块。四句模板可以直接抄走。", tag: '验证', navTitle: "让 AI 按我的情况讲清楚" },
            { file: 'learn-11.html', title: "让 AI 只根据我贴出的原文回答", desc: "转述会先丢掉限定条件、例外情况、指向别处的定义，而那正是花钱的部分。", tag: '助教', navTitle: "让 AI 只根据我贴出的原文回答" },
          ],
        },
        {
          id: 't-learn-hard',
          title: "解释与追问",
          desc: "让 AI 用我熟悉的东西打比方；让 AI 一次只问我一个问题",
          lessons: [
            { file: 'learn-4.html', title: "让 AI 用我熟悉的东西打比方", desc: "它不知道你熟悉什么，只能从公共题库里抽一个源领域。在提问里空出这一格，填你已经会的东西，比方才接得住。", tag: '阅读', navTitle: "让 AI 用我熟悉的东西打比方" },
            { file: 'learn-5.html', title: "让 AI 一次只问我一个问题", desc: "把下一步推理变成一个问句交还给你，往下想的活儿留在你这边。读完能让它一次只问一个，并看出自己卡在第几问。", tag: '源码', navTitle: "让 AI 一次只问我一个问题" },
          ],
        },
        {
          id: 't-learn-keep',
          title: "核验与检查",
          desc: "让 AI 标出最可能编错的五类信息；让 AI 的回答先过三道检查",
          lessons: [
            { file: 'learn-6.html', title: "让 AI 标出最可能编错的五类信息", desc: "一段读起来很顺的回答里，有五个位置默认该当可疑。读完能指出它们在哪。", tag: '记忆', navTitle: "让 AI 标出最可能编错的五类信息" },
            { file: 'learn-7.html', title: "让 AI 的回答先过三道检查", desc: "要出处、交叉验证、标注不确定。同一段回答过三道闸，每开一道筛掉的不一样，三道全开还剩一条得自己翻原文。", tag: '上下文', navTitle: "让 AI 的回答先过三道检查" },
          ],
        },
        {
          id: 't-learn-check',
          title: "阅读与判断",
          desc: "这次回答，我要不要去查原文；让 AI 帮我拆开一段看不懂的条款；让 AI 先告诉我必须懂哪五个概念",
          lessons: [
            { file: 'learn-8.html', title: "这次回答，我要不要去查原文", desc: "按后果决定查不查。越是它答得流畅完整的地方，越值得抽一处去对原文。", tag: '自查', navTitle: "这次回答，我要不要去查原文" },
            { file: 'learn-9.html', title: "让 AI 帮我拆开一段看不懂的条款", desc: "先要地图，再定位卡点，补那一层前置，最后回到原文。四步走完，那一句能用没有术语的话说出来。", tag: '避坑', navTitle: "让 AI 帮我拆开一段看不懂的条款" },
            { file: 'learn-10.html', title: "让 AI 先告诉我必须懂哪五个概念", desc: "按目录、摘要、结论、图表、正文的顺序给它，开工先问要先懂哪五个概念。", tag: '规划', navTitle: "让 AI 先告诉我必须懂哪五个概念" },
          ],
        },
      ],
    },
    {
      id: 'p0',
      num: '零基础入门',
      title: '写给第一次接触 AI 的你',
      desc: '不讲术语、不讲数学，用八节交互小课建立对 AI 的正确直觉：它能干哪些神奇的活、为什么会一本正经地胡说、怎么和它说话、什么能放心交给它。另附「小白三千问」：一页一问，把新手最常见的疑惑一次说清。零基础的家人朋友也能看懂，全章免登录开放。',
      color: '#0891b2',
      group: 'main',
      routes: ['use', 'pro', 'pm', 'build'],
      prologue: true,
      topics: [
        {
          id: 't-zero-what',
          title: 'AI 是个什么东西',
          desc: '先看它的能力，再看穿它的底牌',
          lessons: [
            { file: 'zero-0.html', title: "先别学原理，看看它能干哪些神奇的活", desc: "如果你还没怎么用过 AI，或者只把它当「问答机」用过几次——这一课先看六个真实的使用现场。看完你会明白一件事：这不是又一个新软件，这是软件历史上第一次「反过来」。", tag: '交互' },
            { file: 'zero-1.html', title: "AI 到底是什么？它其实在玩「接话茬」", desc: "别被「人工智能」四个字吓到。ChatGPT、DeepSeek、豆包……不管叫什么名字，它们做的事情本质上只有一件：猜你这句话的下一个词是什么。这一课不需要任何基础，玩两个小游戏你就明白了。", tag: '交互' },
            { file: 'zero-2.html', title: "它不是在网上帮你搜答案", desc: "关于 AI，新手最常见的误解是：「不就是个更聪明的搜索框吗？」——完全不是一回事。上一课你已经知道它在「接话茬」，这一课看清它和搜索引擎的本质区别，你就知道什么时候该用哪个。", tag: '概念' },
            { file: 'zero-3.html', title: "它会一本正经地胡说八道", desc: "前两课你知道了：它在接话茬，而且凭的是「消化后的记忆」。现在到了最关键的一课——接得像，不等于接得对。下面三段 AI 的回答里，每段都藏着一句编造的话。来，亲手抓一次。", tag: '交互' },
          ],
        },
        {
          id: 't-zero-talk',
          title: '怎么和它说话',
          desc: '两个立刻能用的说话技巧',
          lessons: [
            { file: 'zero-4.html', title: "把它当一个聪明、但完全不了解你的新同事", desc: "为什么别人用 AI 效果惊人，你问它却答得平平？九成的差距不在 AI，在问法。这一课给你一个思维模型和一个公式，立刻就能用。", tag: '交互' },
            { file: 'zero-5.html', title: "万能开场白：「先问我几个问题，再开始」", desc: "上一课的公式很好，但你可能已经发现一个死结：很多时候，你自己也不知道该交代什么。这一课分享一个小办法：把这个难题原样丢回给 AI——只需要一句话。", tag: '交互' , navTitle: "万能开场白：「先问我几个问题，再开始」"},
          ],
        },
        {
          id: 't-zero-faq-usage',
          title: '小白三千问 · 会用篇',
          desc: '一页一问：怎么用得更好、工具怎么选',
          lessons: [
            { file: 'zero-q-prompt.html', title: "提示词到底怎么写才好？", desc: "网上流传着各种「神级提示词模板」，动辄几百字。其实真正管用的骨架只有三块，剩下的都是锦上添花。", tag: '交互' , navTitle: "提示词到底怎么写才好？"},
            { file: 'zero-q-prompt-engineering.html', title: "「提示词工程」是工程师才需要学的吗？", desc: "你可能听过「提示词工程师」这个职业，甚至听说过很高的薪水。一个「说话技巧」，凭什么配得上「工程」两个字？", tag: '交互' , navTitle: "「提示词工程」是工程师才需要学的吗？"},
            { file: 'zero-q-model-agent-app.html', title: "模型、Agent、AI 应用是什么关系？", desc: "新闻里一会儿说「XX 发布新模型」，一会儿说「Agent 元年」，一会儿又是各种 AI App——这三个词到底谁是谁？", tag: '交互' , navTitle: "模型、Agent、AI 应用是什么关系？"},
            { file: 'zero-q-agent.html', title: "Agent 到底强在哪？为什么大家都在说它", desc: "上一页说 Agent 是「装上轮子的整车」。这一页看它实际跑起来什么样——同一件事，聊天式 AI 和 Agent 的差距在哪。", tag: '交互' , navTitle: "Agent 到底强在哪？为什么大家都在说它"},
            { file: 'zero-q-skill.html', title: "最近很火的 Skill 到底是什么？", desc: "刷到过「给 AI 装技能」「Skill 生态爆发」这类说法吗？听着高深，其实这可能是 AI 圈里最容易理解的一个新词——你小时候抄在课本角落的小抄，就是它的全部原理。", tag: '交互' , navTitle: "最近很火的 Skill 到底是什么？"},
            { file: 'zero-q-vibe-coding.html', title: "Vibe Coding 是什么？不会写代码也能做软件吗？", desc: "最近总刷到「一句话做了个 App」「零基础做出小工具」这类帖子，这种玩法有个名字，叫 Vibe Coding。它到底靠不靠谱？靠谱到什么程度？这一页给你交个底。", tag: '交互' , navTitle: "Vibe Coding 是什么？不会写代码也能做软件吗？"},
            { file: 'zero-q-china-models.html', title: "国产大模型有哪些？该怎么选？", desc: "先说一个可能让你意外的事实：在全球用户盲测的排行榜上，国产模型早就不是「追赶者」了——好几家排在世界前列。真正的问题不是「哪家最强」，而是「你的场景适合哪家」。", tag: '交互' , navTitle: "国产大模型有哪些？该怎么选？"},
            { file: 'zero-q-companies.html', title: "除了 OpenAI，还有哪些重要的 AI 公司？", desc: "新闻里的名字太多记不住？其实常出场的主角就那么几位。先玩个配对游戏，把「公司」和「代表作」对上号。", tag: '交互' , navTitle: "除了 OpenAI，还有哪些重要的 AI 公司？"},
          ],
        },
        {
          id: 't-zero-faq-basics',
          title: '小白三千问 · 概念扫盲',
          desc: '一页一问：新闻高频词的零基础版',
          lessons: [
            { file: 'zero-q-token.html', title: "Token 是什么？为什么 AI 按它收费？", desc: "账单上写着「按 Token 计费」，新闻里动不动「百万 Token」，这颗「Token」到底是个什么东西？这一页带你亲手把一句话切开看看。", tag: '交互' , navTitle: "Token 是什么？为什么 AI 按它收费？"},
            { file: 'zero-q-context-window.html', title: "为什么聊久了它会「忘事」？", desc: "第 1 轮明明说过的事，第 20 轮它答得像完全没听过。它没坏，也没敷衍你，只是那句话已经不在它眼前了。", tag: '交互' , navTitle: "为什么聊久了它会「忘事」？"},
            { file: 'zero-q-reasoning.html', title: "「推理模型」「深度思考」是什么？", desc: "很多 AI 应用里都藏着一个「深度思考」开关。打开它，回答变慢了、账单变贵了，换来的到底是什么？", tag: '交互' , navTitle: "「推理模型」「深度思考」是什么？"},
            { file: 'zero-q-parameters.html', title: "参数越多越聪明吗？", desc: "发布会上动不动「千亿参数」「万亿参数」，数字一个比一个吓人。这个「参数」到底是什么？数字大，就一定更聪明吗？", tag: '交互' , navTitle: "参数越多越聪明吗？"},
            { file: 'zero-q-multimodal.html', title: "为什么有的 AI「看不懂」图片？", desc: "你可能遇到过：给 AI 发照片，它回「抱歉，请用文字描述」。也见过能把照片里的菜谱都认出来的。同样是 AI，差在哪？", tag: '交互' , navTitle: "为什么有的 AI「看不懂」图片？"},
            { file: 'zero-q-finetune-vs-rag.html', title: "微调是什么？和「喂资料」有什么区别？", desc: "老板说「把公司资料喂给 AI」，供应商说「给你们微调一个专属模型」，听着像一回事，报价能差出几百倍。这一页用「上课」和「开卷考试」两个比方，帮你把这笔账算清楚。", tag: '交互' , navTitle: "微调是什么？和「喂资料」有什么区别？"},
            { file: 'zero-q-knowledge-base.html', title: "企业都在建的「知识库」是什么？", desc: "开会总听到「我们要建知识库」「接一下 RAG」，听着像什么大工程。其实它就是给 AI 配了一个随用随查的书架：考试可以开卷了，还得把翻到的那页指给你看。", tag: '交互' , navTitle: "企业都在建的「知识库」是什么？"},
            { file: 'zero-q-acronyms.html', title: "GPT、LLM、AIGC…这些缩写怎么分？", desc: "新闻里一句话能塞四五个缩写，个个都眼熟，个个都说不清。别慌，这一页用一局配对小游戏加一张关系图，帮你把它们各归各位。", tag: '交互' , navTitle: "GPT、LLM、AIGC…这些缩写怎么分？"},
            { file: 'zero-q-nvidia-gpu.html', title: "英伟达为什么那么值钱？", desc: "一家「卖显卡的」，市值能排进全球最前列，很多人第一反应是看不懂。看懂它只需要两个画面：一场淘金潮，和一场算术比赛。", tag: '交互' , navTitle: "英伟达为什么那么值钱？"},
          ],
        },
        {
          id: 't-zero-faq-myth',
          title: '小白三千问 · 祛魅打假',
          desc: '一页一问：拆穿吹牛话术与常见误解',
          lessons: [
            { file: 'zero-q-train-or-prompt.html', title: "『我训了个模型』到底训了什么？", desc: "饭局上总有人举着酒杯说「我最近训了个模型」。这句话的水分可以从零到百分之九十九，这一页帮你听出他到底干了什么，顺便学会三句能让全桌安静的追问。", tag: '交互' , navTitle: "『我训了个模型』到底训了什么？"},
            { file: 'zero-q-jargon-translator.html', title: "AI 圈黑话翻译器", desc: "发布会、朋友圈、新闻稿里的 AI 话术，水分普遍不小。这一页把最常见的八句拿出来逐句翻译成人话，每句配一个含金量档位。看完你会发现：话术并不高深，只是没人给你翻译过。", tag: '交互' , navTitle: "AI 圈黑话翻译器"},
            { file: 'zero-q-opensource-free.html', title: "『开源模型』等于免费吗？", desc: "新闻里说某模型「开源了」，评论区一片欢呼「免费用上顶级 AI」。先别急着欢呼，AI 圈的「开源」和你理解的免费，中间隔着好几层意思，这一页把它们一层层剥开。", tag: '交互' , navTitle: "『开源模型』等于免费吗？"},
            { file: 'zero-q-benchmark.html', title: "『跑分第一』的模型，为什么用起来不行？", desc: "刷到「新模型霸榜」的新闻，兴冲冲换过去，结果写个周报还没原来的顺手。你没用错，榜单也没造假，只是榜单测的和你要的，从来就没对齐过。", tag: '交互' , navTitle: "『跑分第一』的模型，为什么用起来不行？"},
            { file: 'zero-q-ai-learning.html', title: "AI 越聊越懂我，是它在学习吗？", desc: "用了一阵子 AI，你可能有过这种感觉：它记得你住哪、爱吃什么，越聊越贴心，像在慢慢了解你。它真的在学习进化吗？答案有点意外：它一个字都没学进去。", tag: '交互' , navTitle: "AI 越聊越懂我，是它在学习吗？"},
            { file: 'zero-q-ai-detector.html', title: "AI 检测器说「这是 AI 写的」，可信吗？", desc: "交了论文被判「AI 生成率过高」，认真写的报告被同事怀疑是机器代笔… 这种检测结果到底值几分信任？先别急着喊冤，玩一局小游戏，你马上就有答案。", tag: '交互' , navTitle: "AI 检测器说「这是 AI 写的」，可信吗？"},
            { file: 'zero-q-prompt-course.html', title: "「提示词秘籍」值得买吗？", desc: "「独家万能模板，限时特价」「学完 AI 副业月入过万」… 刷到过这类广告吗？掏钱之前，我们把一张典型的宣传单逐条拆开，给每个卖点盖个章。", tag: '交互' , navTitle: "「提示词秘籍」值得买吗？"},
            { file: 'zero-q-randomness.html', title: "同一个问题，为什么每次答案不一样？", desc: "昨天问它给奶茶店起名，回了三个文艺范；今天原封不动再问一遍，画风全变。它是记性差，还是在敷衍你？都没有。点几下按钮，你就能亲眼看到它的每个字是怎么来的。", tag: '交互' , navTitle: "同一个问题，为什么每次答案不一样？"},
            { file: 'zero-q-ai-customer-service.html', title: "AI 客服为什么那么蠢？", desc: "你可能也纳闷过：同一个时代，聊天 AI 已经聪明得像个靠谱同事，可点开购物软件的客服，对面那位还在一本正经地装傻。这事其实说得通，看完你就知道它蠢在哪、怎么治。", tag: '交互' , navTitle: "AI 客服为什么那么蠢？"},
            { file: 'zero-q-siri-vs-chatgpt.html', title: "Siri 和 ChatGPT 是一种东西吗？", desc: "都叫 AI 助手，一个陪了我们十几年，敬业地重复着「抱歉，我没听懂」；一个横空出世，什么都能聊。它们看起来是同行，用的却是两代技术。这一页带你看清差在哪。", tag: '交互' , navTitle: "Siri 和 ChatGPT 是一种东西吗？"},
          ],
        },
        {
          id: 't-zero-faq-money',
          title: '小白三千问 · 花钱与安全',
          desc: '一页一问：费用、账号与隐私',
          lessons: [
            { file: 'zero-q-free-vs-paid.html', title: "免费的 AI 够用吗？什么时候值得付费？", desc: "现在打开任何一个 AI 产品，免费就能聊得很开心。那付费版到底多了什么？这一页带你把免费版拆开看一看，再帮你对号入座，算算这笔钱值得花吗。", tag: '交互' , navTitle: "免费的 AI 够用吗？什么时候值得付费？"},
            { file: 'zero-q-api-vs-membership.html', title: "API 是什么？和开会员有什么区别？", desc: "总看到有人说「充 key」「调 API」，听着像圈内黑话。其实它和你每月订的会员一样，都是在给 AI 付钱，只是两种完全不同的付钱方式。这一页用一个买菜的类比讲明白。", tag: '交互' , navTitle: "API 是什么？和开会员有什么区别？"},
            { file: 'zero-q-image-cost.html', title: "生成一张图，为什么比聊一次天贵几十倍？", desc: "很多 AI 应用聊天随便聊，一到生图就要收费、限次数。不是产品小气——是图片在成本上真的是「另一个物种」。", tag: '交互' , navTitle: "生成一张图，为什么比聊一次天贵几十倍？"},
            { file: 'zero-q-video-cost.html', title: "AI 生成视频为什么这么贵？", desc: "上一页说一张图两三毛。视频呢？按秒计价，一秒一块五到五块钱——生成一条 10 秒的短视频，够你和 AI 聊上万句。为什么？", tag: '交互' , navTitle: "AI 生成视频为什么这么贵？"},
            { file: 'zero-q-relay.html', title: "什么是 API 中转站？为什么我们不太推荐？", desc: "如果你开始折腾 AI 工具，早晚会看到这样的广告：「GPT / Claude API 三折起，即买即用」。它们叫「中转站」。先说清楚：不是说卖家都是坏人——而是这个结构本身，有几个你值得先了解的风险。", tag: '交互' , navTitle: "什么是 API 中转站？为什么我们不太推荐？"},
            { file: 'zero-q-reverse-proxy.html', title: "「反代账号」「共享号」是什么？", desc: "「ChatGPT Plus 拼车，9.9 一个月」「Claude 会员共享号，秒发」——比官方价便宜十几倍，听着很香。这一页把「香」背后的账算给你看。", tag: '交互' , navTitle: "「反代账号」「共享号」是什么？"},
            { file: 'zero-q-privacy.html', title: "我的聊天记录会被拿去训练吗？", desc: "你和 AI 说过的话，有没有可能变成它的「教材」？这一页用一张流向图讲清数据到底去了哪，再告诉你开关在哪类设置里找、什么内容坚决别发。", tag: '交互' , navTitle: "我的聊天记录会被拿去训练吗？"},
          ],
        },
        /* 放在小白三千问之后：本主题的「你的下一步」是零基础入门篇的收官分流页，
           要紧挨大模型原理篇，才接得上它「进入大模型原理篇」的按钮。 */
        {
          id: 't-zero-trust',
          title: '什么能放心交给它',
          desc: '一套三秒钟的信任判断法',
          lessons: [
            { file: 'zero-6.html', title: "哪些活能放心交给它，哪些最好多确认一步", desc: "你已经知道它很能干，也知道它会一本正经地出错。最后一个关键问题：遇到一件具体的事，怎么在三秒内判断能不能交给 AI？先玩 8 道判断题，法则就在你的答案里。", tag: '交互' , navTitle: "哪些活能放心交给它，哪些最好多确认一步"},
            { file: 'zero-final.html', title: "六个直觉都在了，接下来去哪？", desc: "恭喜你走完零基础入门篇。你现在对 AI 的理解，已经超过了大多数「用了很久但从没想过它是什么」的人。这一页先盘点行囊，再帮你找到最适合你的下一步。", tag: '收官' },
          ],
        },
      ],
    },
    {
      id: 'p1',
      num: '大模型原理',
      title: '大模型是怎么来的',
      desc: '从训练数据、Token 到 GPT 跃进，再到大模型幻觉的成因与四种应对方案，建立对大模型底层原理的完整认知。',
      color: '#0066ff',
      group: 'main',
      routes: ['pro', 'pm', 'build'],   // 原理整章进「用到专业」：知道它为什么会编，用起来才有判断力
      topics: [
        {
          id: 't-basic',
          title: '基础原理',
          desc: '训练数据、训练 vs 推理、词表与注意力',
          lessons: [
            { file: 'training-data.html', title: "AI 的食物：训练数据", desc: "想让 AI 学会说话，先要喂给它数以万亿计的文字。它读了人类写过的绝大多数内容。", tag: '交互' , navTitle: "AI 的食物：训练数据"},
            { file: 'train-vs-infer.html', title: "训练 vs 推理：两个完全不同的过程", desc: "很多人以为 AI 每次回答都在学习。实际上完全不是这么回事。", tag: '概念' , navTitle: "训练 vs 推理：两个完全不同的过程"},
            { file: '1-2-vocab.html', title: "词表与训练", desc: "大模型学习的第一步：读取人类提供的海量文本数据。", tag: '交互' },
            { file: '1-2-base.html', title: "Base 模型：Token 推 Token 机器", desc: "训练结束后得到的原始模型，它只做一件事。", tag: '动画' , navTitle: "Base 模型：Token 推 Token 机器"},
            { file: '1-2-gpt.html', title: "GPT 的跃进", desc: "PreTraining 为什么改变了一切：从 CNN/RNN/BERT 到 GPT，大模型史上最重要的一步。", tag: '交互' , navTitle: "GPT 的跃进"},
          ],
        },
        {
          id: 't-chat',
          title: '从补全到对话',
          desc: '补全机器是如何变成聊天机器人的',
          lessons: [
            { file: '1-2-api.html', title: "chat/completions 之谜", desc: "明明是在和大模型对话，为什么 OpenAI 的 API 路径里写的是「补全」？这个命名背后，藏着对大模型本质的理解。", tag: '动画' },
            { file: '1-2-fake-chat.html', title: "大模型的本质是补全，那如果我伪造一段聊天记录让它补全呢？", desc: "你不是只会一个一个字往后吐吗？ 那我就构造一个格式：「这是一段没写完的聊天记录，你来续写助理的部分。」", tag: '动画' },
            { file: '1-2-sft.html', title: "Chat Template + SFT：大模型终于学会「说话」", desc: "从补全机器到对话助手，差的就是这套训练范式。", tag: '概念' },
            { file: '1-2-prompt-power.html', title: "为什么用提示词就够了？答案在上下文窗口", desc: "PreTraining 之后：不用重新训练，把任务描述喂进去就行。但为什么？", tag: '交互' },
          ],
        },
        {
          id: 't-hallucination',
          title: '幻觉与四种应对',
          desc: '幻觉成因，以及 Prompt / RAG / Temperature / 评测四种缓解方案',
          lessons: [
            { file: '1-2-hallucination.html', title: "大模型幻觉 (Hallucination)", desc: "模型不知道事实，只是在做概率采样。看它如何自信地编造：选择一个案例，点击「开始生成」，观察幻觉如何在逐词生成中产生。", tag: '案例' , navTitle: "大模型幻觉 (Hallucination)"},
            { file: '1-2-mitigation-prompt.html', title: "Prompt 工程：用指令约束幻觉", desc: "PM 视角：写需求文档、对接 AI 接口时，如何通过 System Prompt 减少模型编造。", tag: '概念' , navTitle: "Prompt 工程：用指令约束幻觉"},
            { file: '1-2-mitigation-rag.html', title: "RAG 检索增强生成：让模型「开卷答题」", desc: "PM 视角：什么场景必须上 RAG？如何设计检索流程？落地的坑在哪里。", tag: '交互' , navTitle: "RAG 检索增强生成：让模型「开卷答题」"},
            { file: 'rag-advanced.html', title: "RAG 的代价与优化策略", desc: "每次 RAG 查询都要额外花钱。不优化，成本会随用量快速失控。", tag: 'PM 进阶' , navTitle: "RAG 的代价与优化策略"},
            { file: '1-2-mitigation-temp.html', title: "应对 3：Temperature & Top-P", desc: "PM 视角：API 接入时如何配置采样参数，不同业务场景的推荐值与风险边界。手段 03 / 04 · 预防。", tag: '交互' , navTitle: "应对 3：Temperature & Top-P"},
            { file: '1-2-mitigation-eval.html', title: "应对 4：评测 + 人工审核", desc: "PM 视角：如何量化幻觉风险、设计分级审核流程、让「人在回路中」成为产品安全网。手段 04 / 04 · 检测 + 纠正。", tag: '概念' , navTitle: "应对 4：评测 + 人工审核"},
          ],
        },
        {
          id: 't-summary1',
          title: '篇章汇总',
          desc: '大模型原理篇核心知识回顾',
          lessons: [
            { file: 'summary-1.html', title: "汇总（上）· 大模型是什么 + 幻觉", desc: "大模型原理 · 总结回顾 · 上半页：大模型基础：它是什么，为何会幻觉。", tag: '汇总' , navTitle: "汇总（上）· 大模型是什么 + 幻觉"},
            { file: 'summary-1b.html', title: "汇总（下）· 缓解策略 + 决策框架", desc: "大模型原理 · 总结回顾 · 下半页：如何缓解幻觉，以及 AI PM 该有的决策框架。", tag: '汇总' , navTitle: "汇总（下）· 缓解策略 + 决策框架"},
          ],
        },
        {
          id: 't-build1',
          title: '你现在能做什么',
          desc: '学完这章，你今天能动手做什么',
          lessons: [
            { file: 'build-1.html', title: "别停在「我懂了」，先把那件事定下来", desc: "原理讲完，最容易发生的事是：你觉得学到了很多，但合上电脑，手上什么都没多。所以从这里开始，每章结尾都有这么一页，只回答一个问题：学完这章，你今天能动手做什么。", tag: '实战' },
          ],
        },
        {
          id: 't-interview1',
          title: '他们会这样考你',
          desc: '面试官、老板、技术同事会怎样考察本章内容',
          lessons: [
            { file: 'interview-1.html', title: "大模型基础 · 30 道灵魂拷问", desc: "大模型原理篇学完了，懂了和能讲出来之间还差一场实战。这 30 个问题来自三个真实场景，先自己开口回答，再看框架。", tag: '考察' , navTitle: "大模型基础 · 30 道灵魂拷问"},
          ],
        },
      ],
    },
    {
      id: 'p2',
      num: 'Harness 核心',
      title: 'AI Harness',
      desc: '上下文工程、Prompt 进阶与安全、Agent 设计与工具调用、五层成本优化体系，把大模型真正落地为可用产品。',
      color: '#7c3aed',
      group: 'main',
      routes: ['use', 'pro', 'pm', 'build'],   // Harness 核心篇有三个主题任何人都用得上，篇章并集含 use
      topics: [
        {
          id: 't-context',
          title: '上下文工程',
          desc: 'AI 的工作记忆与溢出处理',
          lessons: [
            { file: '5-1.html', title: "上下文窗口：AI 的工作记忆", desc: "模块五 · 上下文工程 · 第 1 页。拖动下方滑块，亲自体验窗口溢出。", tag: '交互' , navTitle: "上下文窗口：AI 的工作记忆"},
            { file: '5-2.html', title: "上下文溢出：三种处理策略", desc: "模块五 · 上下文工程 · 第 2 页。点击策略，下方逐步演示效果。", tag: '交互' , navTitle: "上下文溢出：三种处理策略"},
          ],
        },
        {
          id: 't-prompt',
          title: 'Prompt 工程',
          desc: 'Markdown、角色扮演、进阶技巧与输出格式',
          lessons: [
            { file: '6-0a.html', title: "为什么大模型选择 Markdown", desc: "模块六 · Prompt Engineering · 前置。一步步推演 Markdown 为何胜出。", tag: '动画' , navTitle: "为什么大模型选择 Markdown"},
            { file: '6-0b.html', title: "Markdown 语法与工程化渲染", desc: "模块六 · Prompt Engineering · 前置。点击语法元素看源码/渲染对比，再看前端渲染方案选型。", tag: '交互' , navTitle: "Markdown 语法与工程化渲染"},
            { file: '6-1.html', title: "你说什么，它就变什么", desc: "通过 System Prompt 指定角色，同一个模型可以变成完全不同的助手。角色扮演是最基础也最有效的 Prompt 技巧。点击下面的角色和格式，观察输出如何变化。", tag: '交互' , navTitle: "你说什么，它就变什么"},
            { file: '6-2.html', title: "Prompt 进阶技巧", desc: "掌握 4 个技巧，让模型回答质量翻倍。点击技巧，下方实时演示好坏对比。", tag: '交互' },
            { file: '6-3.html', title: "输出格式取舍", desc: "没有最好的格式，只有最适合场景的格式。流式返回时，格式选择的影响格外明显。选一个格式，点击「开始流式演示」，观察 Token 生成的体验差异。", tag: '交互' },
            { file: '6-4.html', title: "流式返回与格式配合", desc: "LLM 是逐 Token 输出的。同一个响应内容，格式不同，流式体验完全不同。选择场景后点击播放，观察三种格式的渲染差异。", tag: '交互' , navTitle: "流式返回与格式配合"},
          ],
        },
        {
          id: 't-security',
          title: 'Prompt 安全',
          routes: ['pm', 'build'],   // Prompt 注入与防护，做产品才需要
          desc: 'Prompt Injection 原理、案例与防御实战',
          lessons: [
            { file: 'prompt-attack.html', title: "Prompt Injection：为什么会被攻击", desc: "Prompt 注入是大模型应用面临的最严重安全威胁之一。它和 SQL 注入同源：数据和指令混在同一个通道里。", tag: '安全' , navTitle: "Prompt Injection：为什么会被攻击"},
            { file: 'prompt-attack-cases.html', title: "Prompt Injection：12 个攻击案例", desc: "12 个经过真实验证的攻击案例，分为 5 大类型。选一个案例，切换「中招版 vs 防御版」，观察同样的攻击在有无防护下的两种结局。", tag: '安全' , navTitle: "Prompt Injection：12 个攻击案例"},
            { file: 'prompt-defense.html', title: "Prompt 防御：三层拦截实战", desc: "以真实产品 MoodVerse 为例，看输入过滤、System Prompt 安全约束、输出泄漏检测三层如何层层拦截 Prompt 注入。点击标签页逐步了解，第三个标签可亲手模拟攻击全链路。", tag: '实战' , navTitle: "Prompt 防御：三层拦截实战"},
            { file: 'ai-safety-redlines.html', title: "AI 安全红线：四条底线", desc: "企业使用 AI 的四条不可触碰的底线。记住这四条，就能避开 90% 的安全事故。点击任意红线卡片查看详情。踩到任何一条 = 安全事故。", tag: '安全' , navTitle: "AI 安全红线：四条底线"},
            { file: 'ai-safety-governance.html', title: "风险分级与责任", desc: "AI 使用不是能用就行。按风险分级（L1/L2/L3）匹配管控强度，按责任链（使用者/审批人/管理者）明确谁担责。点击左侧任意条目查看详情。", tag: '安全' , navTitle: "风险分级与责任"},
          ],
        },
        {
          id: 't-agent',
          title: 'Agent 工程',
          routes: ['pm', 'build'],   // Agent 工程，产品路线要懂能力边界
          desc: 'Agent 能力、工具调用、ReAct、记忆、Skill 与脚手架',
          lessons: [
            { file: '7-1.html', title: "Agent：能干活的 AI", desc: "点击能力卡片，右侧逐步演示 Agent 在真实场景中的执行过程", tag: '交互' , navTitle: "Agent：能干活的 AI"},
            { file: '7-2.html', title: "工具调用的秘密", desc: "模型不会真的执行代码，它只是输出一段结构化文字，框架代码负责解析并执行。向下滚动，自动追踪完整调用链路。", tag: '交互' , navTitle: "工具调用的秘密"},
            { file: '7-2a.html', title: "一次对话背后的 5 条消息", desc: "左边：用户看到的界面 ｜ 右边：API 里真正发生的。向下滚动，自动演示一次查天气背后发生了什么。", tag: '深入' , navTitle: "一次对话背后的 5 条消息"},
            { file: '7-2b.html', title: "工具描述的学问", desc: "同一个任务，左边失败，右边成功，差别只在描述。选择一个实验场景，点击运行看对比。", tag: '深入' },
            { file: '7-2c.html', title: "多工具编排：并发 vs 串行", desc: "同一轮返回 3 个工具调用，执行顺序怎么选？选择模式，点击演示，观察时间差异。", tag: '深入' , navTitle: "多工具编排：并发 vs 串行"},
            { file: '7-2d.html', title: "MCP 协议：工具的 USB 接口", desc: "USB 之前每台设备要专属数据线；MCP 之前每个 Agent 要专属对接代码。", tag: '深入' , navTitle: "MCP 协议：工具的 USB 接口"},
            { file: '7-3.html', title: "ReAct 实战：当 Agent 卡住了", desc: "ReAct 循环：思考 → 行动 → 观察，循环往复。但如果模型对参数格式不了解，它会反复猜测，卡在同一个地方打转。向下滚动，自动追踪真实失败过程。", tag: '动画' , navTitle: "ReAct 实战：当 Agent 卡住了"},
            { file: '7-3a.html', title: "短期记忆 = 上下文窗口", desc: "上下文窗口就是模型的工作台：模型能看到的一切，都必须放在这张桌子上。向下滚动，观察工作台如何被填满。", tag: '深入' , navTitle: "短期记忆 = 上下文窗口"},
            { file: '7-3b.html', title: "上下文压缩：四层防线", desc: "拖动滑块模拟对话增长，观察压缩如何延长上下文寿命。", tag: '深入' , navTitle: "上下文压缩：四层防线"},
            { file: '7-3c.html', title: "长期记忆：向量检索", desc: "让 Agent 记住上个月的事：通过向量检索，把用户偏好、项目配置、历史 Bug 注入当前对话。", tag: '深入' , navTitle: "长期记忆：向量检索"},
            { file: 'vector-db-1.html', title: "从 Embedding 到 Milvus", desc: "先建立直觉：模型把含义变成坐标，Milvus 负责在海量坐标中快速找到“意思最接近”的内容。", tag: '深入' },
            { file: 'vector-db-2.html', title: "Milvus 心智模型", desc: "把新术语映射到熟悉的“表、列、行”，再补上向量索引与内存加载两个关键概念。", tag: '深入' },
            { file: 'vector-db-3.html', title: "Milvus 实操", desc: "用一套一致的集合名和真实文本 Embedding，跑通写入、检索与删除；代码假定本地 Milvus 已在 19530 端口运行。", tag: '实战' },
            { file: 'vector-db-4.html', title: "从检索到 RAG", desc: "Search 返回“可能相关的片段”，RAG 还要把它们变成有来源、有边界、能被评测的回答依据。", tag: '深入' },
            { file: '7-4a.html', title: "ReAct 循环：思考 → 行动 → 观察", desc: "Reasoning + Acting：Agent 靠循环完成任务，一问一答只是其中一轮。向下滚动，自动演示一个复杂任务如何经历 14 轮循环。", tag: '深入' , navTitle: "ReAct 循环：思考 → 行动 → 观察"},
            { file: '7-4b.html', title: "Agent 卡死的 5 种模式", desc: "点击下方卡片选择一种故障模式 → 播放故障模拟 → 对比加了防护后的表现。", tag: '深入' , navTitle: "Agent 卡死的 5 种模式"},
            { file: '7-4c.html', title: "权限与安全", desc: "Agent 能做什么、不能做什么？切换三种权限模式，观察同一批操作的不同处理方式。", tag: '深入' },
            { file: '7-5.html', title: "Skill：让 Agent 少走弯路", desc: "选择一个场景，演示自动播放，对比「差循环」和「好循环」的两种执行方式。", tag: '交互' , navTitle: "Skill：让 Agent 少走弯路"},
            { file: '7-5a.html', title: "Skill 的本质", desc: "给 Agent 装上「操作手册」：没有 Skill 的 Agent 像新员工摸索，有 Skill 的 Agent 像老手照章执行。", tag: '深入' },
            { file: '7-5b.html', title: "解剖一个示例 Skill", desc: "以一个虚构的发版助手为例：点击每个区域展开详情，看 Agent 如何读取并执行一个 Skill。", tag: '深入' },
            { file: '7-4.html', title: "脚手架工程：从试验品到产品", desc: "左侧模拟同一个「查机票 + 订酒店」任务在有无脚手架时的差距，滚动到演示区自动播放；右侧点击查看 5 大能力详解。", tag: '交互' , navTitle: "脚手架工程：从试验品到产品"},
            { file: '7-6a.html', title: "5 道工程护栏", desc: "没有护栏的 Agent = 没有刹车的跑车。点击左侧每道护栏，查看场景还原与有无护栏的对比。", tag: '深入' , navTitle: "5 道工程护栏"},
            { file: '7-6b.html', title: "多 Agent 协作：一个人干不完，就派团队", desc: "主 Agent 拆任务 → 子 Agent 各司其职 → 汇总交付。只读任务并行加速，写入任务串行保安全。", tag: '深入' },
            { file: '7-6c.html', title: "可观测性：Agent 在干什么、花了多少钱", desc: "事件流 + 统计面板 · 实时监控 Agent 全生命周期。点击「模拟一次任务」，看一个真实任务的完整事件流。", tag: '深入' },
            { file: '7-summary.html', title: "Agent 工程全景图", desc: "工具、记忆、执行、工程四大支柱的完整知识地图 · 共 14 个知识点。", tag: '汇总' },
          ],
        },
        {
          id: 't-cost',
          title: '成本优化与选型',
          routes: ['pm', 'build'],   // 成本与选型，产品路线的刚需
          desc: 'KV Cache、缓存、图片 Token、语法/语义/输出层优化与模型选型',
          lessons: [
            { file: '8-1.html', title: "多轮对话为什么越来越贵？", desc: "LLM 按输入 Token 数计费。每一轮对话，都要把所有历史记录重新发给模型：历史越长，Token 越多，费用越高。拖动滑块模拟费用累积。", tag: '交互' , navTitle: "多轮对话为什么越来越贵？"},
            { file: '8-2.html', title: "KV Cache：用空间换时间", desc: "每轮对话，模型都要对所有历史 Token 做 Attention 计算。KV Cache 把已算过的 K/V 矩阵缓存下来，下轮只计算新增 Token。", tag: '交互' , navTitle: "KV Cache：用空间换时间"},
            { file: '8-2b.html', title: "显式缓存：实战对比", desc: "一行代码，保证命中。生产环境必须用显式缓存：隐式缓存在分布式架构下不可靠。", tag: '交互' , navTitle: "显式缓存：实战对比"},
            { file: '8-3.html', title: "动态时间戳：最贵的 System Prompt", desc: "一个小小的设计错误，可以让你的 KV Cache 完全失效，每轮对话成本翻倍：在 System Prompt 里写动态时间。", tag: '反例' , navTitle: "动态时间戳：最贵的 System Prompt"},
            { file: '8-4.html', title: "综合成本优化", desc: "单一优化效果有限。分层组合策略可将 AI 成本降低 70–90%。点击下方策略卡片，实时观察成本条的变化。", tag: '系统设计' , navTitle: "综合成本优化"},
            { file: '8-5.html', title: "图片 Token：像素也在烧钱", desc: "多模态模型不按「一张图」计费，而是把图片切成像素块换算成 Token。拖动滑块改变分辨率，实时看 Token 成本变化。", tag: '多模态' , navTitle: "图片 Token：像素也在烧钱"},
            { file: '8-5b.html', title: "图片 Token：按任务匹配分辨率", desc: "不同任务对图片细节要求不同，用最低分辨率满足任务 = 最省钱。选一个任务类型，看推荐的分辨率方案。", tag: '多模态' },
            { file: '8-6.html', title: "语法层优化：写给机器的提示词，不要排版", desc: "格式性 Token 最高占提示词 13–20%。提示词是写给机器的指令，不是给人看的文档。那些 **加粗**、JSON 大括号、缩进换行…都是在花钱买格式。", tag: '提示词工程' , navTitle: "语法层优化：写给机器的提示词，不要排版"},
            { file: '8-7.html', title: "语义层优化：不要把上下文窗口当垃圾桶", desc: "信息密度越高 → 注意力越集中 → 效果越好。三个语义层策略，让每个 Token 都有价值。", tag: 'RAG' , navTitle: "语义层优化：不要把上下文窗口当垃圾桶"},
            { file: '8-8.html', title: "输出层 + KV Cache 进阶：控制输出 = 控制成本", desc: "输出 Token 比输入贵 3–5 倍。点击下方技巧切换互动演示，体验三个输出层技巧和两个 KV Cache 进阶陷阱。", tag: '架构' , navTitle: "输出层 + KV Cache 进阶：控制输出 = 控制成本"},
            { file: 'cost-eval.html', title: "模型选型：能力 vs 成本的权衡", desc: "优化做完了，还需要选对模型。点击下方问题切换视角，看散点图、月费对比和场景决策框架。", tag: '选型' },
            { file: 'engineering-philosophy.html', title: "大道至简：坚守第一性原理", desc: "AI Harness · 收官思考。四步回到原点，看清一切 Harness 手段的本质。", tag: '收官' , navTitle: "大道至简：坚守第一性原理"},
          ],
        },
        {
          id: 't-tips',
          title: '实用技巧',
          desc: '人机边界、提问方式、迭代方法、场景判断与幻觉验证，一份用 AI 的日常指南',
          lessons: [
            { file: 'ai-tips-boundary.html', title: "人机知识边界：四象限策略", desc: "先判断问题在哪个区，再决定怎么用 AI。每次用 AI 之前，先想一个问题：这个答案，我能验证吗？", tag: '技巧' , navTitle: "人机知识边界：四象限策略"},
            { file: 'ai-tips-context.html', title: "好提问 vs 坏提问：上下文决定一切", desc: "同一个 AI，提问方式不同，输出天差地别。点击场景切换对比。", tag: '技巧' },
            { file: 'ai-tips-verify.html', title: "AI 说的能信吗？", desc: "找出 AI 编造的内容。点击你认为有问题的条目，然后揭晓答案。", tag: '技巧' , navTitle: "AI 说的能信吗？"},
            { file: 'ai-tips-iterate.html', title: "迭代的艺术：知道何时收手", desc: "跟着一个真实的文案迭代过程走 4 轮：前 3 轮质量持续上升，第 4 轮画蛇添足。演示会自动逐轮播放，注意观察质量仪表的变化。", tag: '技巧' , navTitle: "迭代的艺术：知道何时收手"},
            { file: 'ai-tips-scenarios.html', title: "场景速查：什么时候放心用", desc: "9 个常见场景，按风险分成三档。点击左侧场景卡片查看详细指南，也可以按风险等级筛选。", tag: '技巧' , navTitle: "场景速查：什么时候放心用"},
          ],
        },
        {
          id: 't-summary2',
          title: '课程收官',
          routes: ['pm', 'build'],   // 篇章收官，跟着正课走
          desc: 'Harness 核心篇回顾 + 完整课程总结',
          lessons: [
            { file: 'summary-2.html', title: "汇总（上）· Prompt 工程 + Agent", desc: "Harness 核心篇总结回顾 · 上半页（1 / 2）：设计 Message List 的核心技能，以及让 AI 从\"说\"到\"做\"的 Agent 工程。", tag: '汇总' , navTitle: "汇总（上）· Prompt 工程 + Agent"},
            { file: 'summary-2b.html', title: "汇总（下）· 成本优化 + PM 视角", desc: "Harness 核心篇总结回顾 · 下半页（2 / 2）：五层成本优化体系，以及 AI PM 带走的完整工程视角。", tag: '汇总' , navTitle: "汇总（下）· 成本优化 + PM 视角"},
            { file: 'summary-final.html', title: "课程总结 · 产品经理的第一节 AI 课", desc: "今天学了什么？带走这四件事：大模型基础、Prompt 工程、Agent 与成本、安全合规。", tag: '汇总' , navTitle: "课程总结 · 产品经理的第一节 AI 课"},
            { file: 'summary-final-1.html', title: "总结（上）· 原理 + Harness", desc: "课程总结上半页（1 / 2）：模块一「大模型是怎么来的」建立认知直觉，模块二「Prompt 怎么写才管用」让 AI 按你要的输出。", tag: '汇总' , navTitle: "总结（上）· 原理 + Harness"},
            { file: 'summary-final-2.html', title: "总结（下）· 实战 + 成本", desc: "课程总结下半页（2 / 2）：模块三「AI 能干什么、多少钱」建立自动化与成本意识，模块四「安全合规与红线意识」知道产品该在哪里设防。", tag: '汇总' , navTitle: "总结（下）· 实战 + 成本"},
          ],
        },
        {
          id: 't-build2',
          title: '你现在能做什么',
          routes: ['pm', 'build'],   // 落地清单，跟着正课走
          desc: '学完这章，你今天能动手做什么',
          lessons: [
            { file: 'build-2.html', title: "写一版提示词，让它连跑五次都能用", desc: "这一章你学了上下文、Prompt 技巧、Agent 和成本，知识点是全课最多的。但落到手上，第一件事只有一件：把 M0 定下的那个需求，写成一版稳定的提示词。稳定的意思是不挑运气。", tag: '实战' },
          ],
        },
        {
          id: 't-interview2',
          title: '他们会这样考你',
          routes: ['pm', 'build'],   // 面试题，跟着正课走
          desc: '面试官、老板、技术同事会怎样考察本章内容',
          lessons: [
            { file: 'interview-2.html', title: "AI Harness · 30 道灵魂拷问", desc: "Harness 核心篇讲的全是工程落地：上下文、Prompt、安全、Agent、成本。这 30 个问题来自三个真实场景，先自己开口回答，再看框架。", tag: '考察' , navTitle: "AI Harness · 30 道灵魂拷问"},
          ],
        },
      ],
    },
    {
      id: 'p3',
      num: '动手实战',
      title: '实战 · 从 Demo 到产品',
      desc: "以虚构的内容生产助手为教学示例，学习视觉生成、工具调用、上下文、记忆、提示词组织、协作、权限与 MCP 集成。案例不代表方片已上线产品或真实项目业绩。",
      color: '#059669',
      group: 'main',
      prereq: '建议先学过 Harness 核心',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-alice-intro',
          title: '开篇',
          desc: "以一个虚构的内容生产助手为教学示例，拆解从模型调用到可靠交付需要考虑的工程问题；不代表方片已经上线的产品。",
          lessons: [
            { file: '9-0.html', title: "从业务任务到可交付的 AI 工具", desc: "以一个虚构的内容生产助手为教学示例，拆解从模型调用到可靠交付需要考虑的工程问题；不代表方片已经上线的产品。", tag: '开篇' , navTitle: "从业务任务到可交付的 AI 工具"},
          ],
        },
        {
          id: 't-imagegen',
          title: 'AI 生图',
          desc: '文生图、垫图、角色一致性、多模型降级与产品化',
          lessons: [
            { file: '9-1.html', title: "文生图 vs 垫图：两种完全不同的事", desc: "用同一个虚构人物比较两种生图方式：没有参考图时外貌容易漂移；有参考图时，以图像约束人物特征，再检查场景与动作。", tag: '概念' , navTitle: "文生图 vs 垫图：两种完全不同的事"},
            { file: '9-2.html', title: "用 AI 给 AI 写 Prompt", desc: "用户说「示例角色 在阳台发呆」。生图模型需要的是一长段精确的视觉描述，光这句话远远不够。中间有一个翻译步骤：用 LLM 把人话翻译成生图语言。", tag: '实战' },
            { file: '9-3.html', title: "角色一致性：最难的产品问题", desc: "让同一个虚构人物在不同场景和服装中保持一致。比较无参考图与使用参考图的结果，学习如何固定外貌特征并检查生成偏差。", tag: '案例' , navTitle: "角色一致性：最难的产品问题"},
            { file: '9-4.html', title: "模型会挂，然后呢？", desc: "在 示例助手 里，用户说「帮我画一张图」，但背后可能 Gemini 超时了、Seedream 限流了、GPT Image 也出错了。用户不关心哪个模型挂了，他只关心：图到底能不能出来？", tag: '实战' , navTitle: "模型会挂，然后呢？"},
            { file: '9-5.html', title: "生图的产品化清单", desc: "调通生图接口只是开始。以一个教学示例为线索，检查体验、质量、工程与安全四类上线条件。", tag: '系统设计' , navTitle: "生图的产品化清单"},
          ],
        },
        {
          id: 't-agentloop',
          title: 'Agent Loop',
          routes: ['build'],   // Agent Loop 实现细节
          desc: '生产级循环的控制、防护与流式体验',
          lessons: [
            { file: '9-6.html', title: "教科书的 3 步 vs 真实的 N 步", desc: "教科书说 Agent 循环是「想→做→看」三步。但当你真正把 Agent 推上生产环境，每转一圈要做的事比你想象的多得多。", tag: '概念' , navTitle: "教科书的 3 步 vs 真实的 N 步"},
            { file: '9-7.html', title: "为什么 Agent 会卡死", desc: "实验室里的 Agent 死循环很好发现：控制台一刷就看到了。但生产环境的卡死更隐蔽：用户不会说「你的 Agent 死循环了」，他只会说「你的 AI 怎么这么慢」或者「它是不是傻了」。", tag: '案例' , navTitle: "为什么 Agent 会卡死"},
            { file: '9-8.html', title: "防呆设计：怎么让循环自己停下来", desc: "知道了 Agent 会怎么卡死，下一步就是设计防护。好的防呆是三层网，让系统既不会失控，又不会轻易放弃。", tag: '实战' , navTitle: "防呆设计：怎么让循环自己停下来"},
            { file: '9-9.html', title: "流式体验：别让用户干等", desc: "Agent 在后台跑了 30 秒，用户屏幕上应该看到什么？同样是等 30 秒，有没有进度感，体验天差地别。", tag: '交互' , navTitle: "流式体验：别让用户干等"},
            { file: '9-10.html', title: "一条消息背后的真实成本", desc: "用户只发了一句话，但底层可能跑了 10+ 轮循环、产生几十条 API 消息。当你打开账单，可能会吓一跳。", tag: '深入' , navTitle: "一条消息背后的真实成本"},
          ],
        },
        {
          id: 't-ctxmgmt',
          title: '上下文管理',
          routes: ['build'],   // 上下文管理实现细节
          desc: '对话越长越贵越笨：压缩的艺术与取舍',
          lessons: [
            { file: '9-11.html', title: "对话越长越贵、越长越笨", desc: "每一轮对话都要把全部历史重新发给模型：对话越长，费用越高、注意力越分散、离窗口上限越近。这三个问题决定了：上下文不能放任不管。", tag: '概念' , navTitle: "对话越长越贵、越长越笨"},
            { file: '9-12.html', title: "压缩是一门取舍的艺术", desc: "上下文太长了怎么办？全删或全留都不对：有的能删（旧工具输出）、有的不能删（用户原话）、有的要花钱压（全量摘要）。产品经理需要一个决策框架。", tag: '实战' , navTitle: "压缩是一门取舍的艺术"},
            { file: '9-13.html', title: "用户说的话能不能删？", desc: "AI 的输出可以摘要、工具结果可以截断，但用户的原话删了就回不来了。而且用户一定会发现：「我明明说了 xxx，你怎么忘了？」", tag: '概念' , navTitle: "用户说的话能不能删？"},
            { file: '9-14.html', title: "本地压缩 vs LLM 压缩", desc: "压缩上下文有两条路：本地处理（正则替换、截断）零成本但粗糙，LLM 摘要有成本但精准。该怎么选？答案是：都用，但有先后顺序。", tag: '深入' , navTitle: "本地压缩 vs LLM 压缩"},
          ],
        },
        {
          id: 't-memory',
          title: '长期记忆',
          routes: ['build'],   // 长期记忆实现细节
          desc: '让 AI 认识你：记忆的提取、冲突与注入',
          lessons: [
            { file: '9-15.html', title: "上下文 ≠ 记忆", desc: "上下文窗口像白板：写满了就擦掉，对话结束就清空。长期记忆像笔记本：写下的东西，下次打开还在。AI 产品需要两套系统。", tag: '概念' },
            { file: '9-16.html', title: "什么值得记、什么不值得记", desc: "用户每天和 AI 聊几十上百条消息。「嗯」「好的」「哈哈」占了大半，真正有价值的偏好和事实可能只有几条。记忆系统需要一个守门员。", tag: '实战' , navTitle: "什么值得记、什么不值得记"},
            { file: '9-17.html', title: "记忆冲突：用户改了主意怎么办", desc: "上个月说「喜欢咖啡」，这个月说「改喝茶了」。两条记忆打架了：旧的要不要删？新的怎么存？这背后有四种策略。", tag: '案例' , navTitle: "记忆冲突：用户改了主意怎么办"},
            { file: '9-18.html', title: "记忆注入的成本问题", desc: "记了 1000 条记忆，每次对话全塞进 system prompt？还是按需检索相关的几条？全量注入简单但贵且噪声多，按需检索省钱但可能漏。", tag: '深入' , navTitle: "记忆注入的成本问题"},
          ],
        },
        {
          id: 't-prompteng',
          title: 'Prompt Harness',
          routes: ['build'],   // Prompt Harness 实现细节
          desc: '从字符串到架构：分层、按需加载与 Skill 模块化',
          lessons: [
            { file: '9-19.html', title: "System Prompt 不是一坨文本", desc: "生产级的 System Prompt 不是想到什么写什么。它是分层管理的：身份层、环境层、工具层、行为层，各管各的，改一层不影响其他层。", tag: '架构' , navTitle: "System Prompt 不是一坨文本"},
            { file: '9-20.html', title: "不用的东西别给 AI 看", desc: "如果你有 100 个工具，全部描述塞进 System Prompt，光工具描述就占几万 token。AI 和人一样：给太多信息反而找不到重点。", tag: '实战' , navTitle: "不用的东西别给 AI 看"},
            { file: '9-21.html', title: "Skill：可运营的 Prompt 模块", desc: "System Prompt 管我是谁，Tool 管我能做什么，那 Skill 管什么？它管的是遇到某件事，怎么一步一步做好。文件即配置，版本可追溯。", tag: '实战' , navTitle: "Skill：可运营的 Prompt 模块"},
            { file: '9-22.html', title: "提示词和缓存的微妙关系", desc: "KV Cache 的规则极其简单：前缀一模一样就命中，差一个字就全部重算。所以，往 System Prompt 里插入任何动态内容，都可能让缓存永远打不中。", tag: '深入' , navTitle: "提示词和缓存的微妙关系"},
          ],
        },
        {
          id: 't-multiagent',
          title: '多 Agent',
          routes: ['build'],   // 多 Agent 实现细节
          desc: '并行、脑暴、定时任务与协作成本',
          lessons: [
            { file: '9-23.html', title: "什么时候需要多个 Agent", desc: "不是越多 Agent 越好。大多数时候一个就够了。但确实有三种场景，一个 Agent 独木难支。搞清楚什么时候真的需要分工。", tag: '概念' , navTitle: "什么时候需要多个 Agent"},
            { file: '9-24.html', title: "并发的代价：谁能同时跑", desc: "「看」可以并行：多个搜索同时跑不会冲突。「改」必须排队：两个 Agent 同时改同一个文件会出事。判断一个操作能否并发，关键就一条：它是只读的吗？", tag: '实战' , navTitle: "并发的代价：谁能同时跑"},
            { file: '9-25.html', title: "脑暴：让多个 AI 吵架", desc: "和人类开会一样：一个人想到死不如多个人独立思考再汇总。脑暴模式就是把同一个问题扔给多个 Agent，让它们各自回答，最后由主持人整合共识与分歧。", tag: '交互' , navTitle: "脑暴：让多个 AI 吵架"},
            { file: '9-26.html', title: "定时任务的成本陷阱", desc: "让 Agent 每小时整理一次新闻，听起来简单。但如果复用旧会话，上下文每次都在增长，24 小时后你的成本会爆炸。一个选择就能让月账单差 10 倍。", tag: '反例' , navTitle: "定时任务的成本陷阱"},
          ],
        },
        {
          id: 't-security',
          title: '权限与安全',
          routes: ['build'],   // 权限与安全的落地实现
          desc: 'Agent 的缰绳：权限分级、审批与可观测性',
          lessons: [
            { file: '9-27.html', title: "AI 该有多大的自由", desc: "给 AI 全部权限？它可能搞砸一切。每步都审批？用户会疯掉。权限设计是一条光谱：从完全自主到每步审批，中间还有三种选择。", tag: '概念' , navTitle: "AI 该有多大的自由"},
            { file: '9-28.html', title: "弹窗太多用户烦，不弹又不安全", desc: "如果 Agent 每做一步都弹窗让你确认，你点 5 次「允许」之后就想卸载了。但如果什么都不问就自己执行，删错了文件谁来负责？答案是：风险分级。", tag: '实战' , navTitle: "弹窗太多用户烦，不弹又不安全"},
            { file: '9-29.html', title: "Agent 干了什么你知道吗", desc: "Agent 在后台跑了 3 分钟：调了几个工具？花了多少 token？中间有没有出错？如果你回答不了这些问题，你的 Agent 就是个黑盒。", tag: '架构' , navTitle: "Agent 干了什么你知道吗"},
          ],
        },
        {
          id: 't-mcp',
          title: 'MCP 实战',
          routes: ['build'],   // MCP 实战代码
          desc: '工具生态的双向连接：消费、提供与自配置',
          lessons: [
            { file: '9-30.html', title: "MCP 不只是「调工具」", desc: "大多数人理解 MCP 就是「让 AI 调外部工具」。但 MCP 协议是双向的：示例助手 不仅能调别人的工具，也能让 Cursor 等外部客户端来调用 示例助手 的能力。", tag: '概念' , navTitle: "MCP 不只是「调工具」"},
            { file: '9-31.html', title: "懒连接：不用别连", desc: "你注册了 10 个 MCP 服务，启动时全部连接一遍？如果其中 3 个挂了，启动就卡住了。懒连接的思路很简单：注册 ≠ 连接，用到的时候再连。", tag: '实战' , navTitle: "懒连接：不用别连"},
            { file: '9-32.html', title: "AI 自己加工具", desc: "用户说「帮我查日历」，但你还没配日历工具。传统做法：报错说「不支持」。更好的做法：Agent 自己去配，问你一声就行。", tag: '深入' , navTitle: "AI 自己加工具"},
          ],
        },
        {
          id: 't-summary3',
          title: '实战收官',
          desc: '全景回顾与核心洞察',
          lessons: [
            { file: '9-summary.html', title: "实战全景图", desc: "动手实战篇走到这里，八个主题构成了一张完整的 AI 产品实战地图。每个主题都不是孤立的，它们共同回答一个问题：从 Demo 到产品，到底差了什么？", tag: '汇总' },
            { file: '9-final.html', title: "聊天套壳 vs 真正的 Agent 产品", desc: "用户看到的只是冰山一角：一个聊天框、几次回复。水面之下，是产品经理需要做的 100 个决策。这些决策的总和，就是聊天套壳和真正的 Agent 产品之间的距离。", tag: '收官' , navTitle: "聊天套壳 vs 真正的 Agent 产品"},
          ],
        },
        {
          id: 't-build3',
          title: '你现在能做什么',
          desc: '学完这章，你今天能动手做什么',
          lessons: [
            { file: 'build-3.html', title: "让它从「会说」变成「会做」：接上第一个工具", desc: "提示词已经能稳定生成草稿，下一步是让工具真正执行一个动作。先接入一个可核验、可撤销或可人工接管的操作，不追求工具数量。", tag: '实战' },
          ],
        },
        {
          id: 't-interview3',
          title: '他们会这样考你',
          desc: '面试官、老板、技术同事会怎样考察本章内容',
          lessons: [
            { file: 'interview-3.html', title: "实战 · 从 Demo 到产品 · 30 道灵魂拷问", desc: "动手实战篇学完了，你已经知道 Demo 和产品之间隔着什么。这 30 个问题来自三个真实场景，先自己开口回答，再看框架。", tag: '考察' , navTitle: "实战 · 从 Demo 到产品 · 30 道灵魂拷问"},
          ],
        },
      ],
    },
    {
      id: 'p4',
      num: '工程进阶',
      title: '进阶 · AI 工程设计模式',
      desc: '基于 Anthropic 公开的 Claude Code 源码与工程博客，深入拆解生产级 Agent 的设计模式：上下文工程、工具设计、评测方法论、长运行 Agent、脑手分离架构与安全容器化。',
      color: '#dc2626',
      group: 'main',
      prereq: '建议先学过动手实战',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-agent-patterns',
          title: 'Agent 设计模式',
          desc: 'Anthropic 官方总结的五种 Workflow + 自主 Agent',
          lessons: [
            { file: '10-1.html', title: "Workflow vs Agent：先搞清楚你要什么", desc: "一个反直觉的观点：最成功的 AI 实现，往往不是最复杂的那个。在动手搭 Agent 框架之前，先搞清楚你真正需要什么。", tag: '设计模式' , navTitle: "Workflow vs Agent：先搞清楚你要什么"},
            { file: '10-2.html', title: "五种 Workflow 模式", desc: "业界已验证有效的五种 Workflow 编排模式。它们由简到繁，每种解决特定类型的问题。不追求最复杂的，追求最合适的。", tag: '设计模式' },
            { file: '10-3.html', title: "从 Prompt 工程到上下文工程", desc: "当我们从单轮对话走向多步 Agent，仅仅优化 Prompt 已经远远不够。真正的挑战是：如何策展每一轮推理时送给模型的全部 Token。", tag: '方法论' , navTitle: "从 Prompt 工程到上下文工程"},
            { file: '10-4.html', title: "上下文的三板斧", desc: "当任务跨越多个上下文窗口，每个新窗口都会失忆。生产环境中已验证三种策略来应对这个根本挑战，让 Agent 能在长任务中保持连贯和高效。", tag: '方法论' , navTitle: "上下文的三板斧"},
          ],
        },
        {
          id: 't-tool-design',
          title: '工具设计的艺术',
          desc: '如何为 Agent 写出好工具：命名、描述、参数与 ACI',
          lessons: [
            { file: '10-5.html', title: "ACI：Agent-Computer Interface", desc: "HCI (人-机交互) 领域已经研究了几十年，但 Agent 和计算机之间的交互（ACI）才刚刚开始。实战经验表明：工具设计的质量，直接决定了 Agent 的能力上限。", tag: '设计模式' , navTitle: "ACI：Agent-Computer Interface"},
            { file: 'vector-db-5.html', title: "Milvus 作为 Agent 知识库工具", desc: "让 Agent 自己判断何时需要企业资料；工具负责检索，Agent 负责基于 ToolMessage 组织答案。", tag: '实战' , navTitle: "Milvus 作为 Agent 知识库工具"},
            { file: '10-6.html', title: "Think Tool：让 AI 先想后做", desc: "Agent 在执行长工具链时，经常忘记前面的信息，或者在需要权衡多条规则时犯错。实践证明，给 Agent 一个停下来想一想的工具，就能大幅提升准确率。", tag: '深入' , navTitle: "Think Tool：让 AI 先想后做"},
            { file: '10-7.html', title: "用 Agent 优化 Agent 的工具", desc: "工具写得好不好，Agent 最有发言权。业界验证了一套「用 Agent 写工具 → 跑评测 → 自动优化」的工作流，让工具设计从手工打磨变成系统化迭代。", tag: '实战' , navTitle: "用 Agent 优化 Agent 的工具"},
          ],
        },
        {
          id: 't-evals',
          title: 'Agent 评测',
          desc: '不评测就是在裸奔。如何系统化验证 Agent 质量',
          lessons: [
            { file: '10-8.html', title: "为什么评测比训练更重要", desc: "没有评测的 Agent 开发就像蒙眼开飞机。评测是贯穿整个开发周期的核心基础设施，远不止上线前的 checklist。", tag: '方法论' , navTitle: "为什么评测比训练更重要"},
            { file: '10-9.html', title: "三种 Grader：代码、模型、人工", desc: "Grader 是评测系统的裁判。选错了 Grader，评测结果就不可信。生产环境的经验表明，三种 Grader 组合使用，各取所长。没有银弹，但有最优组合。", tag: '实战' , navTitle: "三种 Grader：代码、模型、人工"},
            { file: '10-10.html', title: "评测的坑：噪音、作弊与退化", desc: "评测做起来了不等于做对了。生产环境中反复验证的三个隐蔽陷阱：基础设施噪音会扭曲结果，模型会识别考试，一个小改动可能让性能暴跌。", tag: '案例' , navTitle: "评测的坑：噪音、作弊与退化"},
          ],
        },
        {
          id: 't-long-running',
          title: '长运行 Agent',
          desc: '从一轮对话到跑几小时：Harness 的设计与演进',
          routes: ['build'],   // 工程实现细节，产品路线跳过
          lessons: [
            { file: '10-11.html', title: "为什么 Agent 跑不了长任务", desc: "让 Agent 构建一个完整 Web 应用看似简单，但现实中充满了交接失败和上下文断裂的陷阱。", tag: '案例' , navTitle: "为什么 Agent 跑不了长任务"},
            { file: '10-12.html', title: "Initializer + Coding Agent", desc: "核心思路：把一个 Agent 拆成两个角色，一个负责规划，一个负责执行。每次交接都留下干净的状态。", tag: '设计模式' , navTitle: "Initializer + Coding Agent"},
            { file: '10-13.html', title: "Managed Agent：脑手分离", desc: "核心洞察：把 Agent 的思考和执行拆成独立组件，让系统在任何部分出错时都能优雅恢复。", tag: '架构' , navTitle: "Managed Agent：脑手分离"},
            { file: '10-14.html', title: "Session 不等于 Context Window", desc: "两个最容易混淆的概念：Claude 当前能看到的，和所有发生过的事。它们必须分离。", tag: '深入' , navTitle: "Session 不等于 Context Window"},
          ],
        },
        {
          id: 't-security-advanced',
          title: '安全与容器化',
          desc: 'Anthropic 如何在产品中约束 Claude',
          routes: ['build'],   // 工程实现细节，产品路线跳过
          lessons: [
            { file: '10-15.html', title: "三类风险：滥用、失控、外部攻击", desc: "安全不是加一层提示词就够的，需要从架构层面进行结构性设计。这里介绍一套系统化的安全分类框架。", tag: '安全' , navTitle: "三类风险：滥用、失控、外部攻击"},
            { file: '10-16.html', title: "沙箱与凭证隔离", desc: "Agent 生成的代码和用户的密钥永远不能在同一个地方。这是安全架构的硬性要求，不只是最佳实践的建议。", tag: '安全' },
          ],
        },
        {
          id: 't-summary4',
          title: '进阶收官',
          desc: '全景回顾与核心设计原则',
          lessons: [
            { file: '10-17.html', title: "Contextual Retrieval：更好的 RAG", desc: "RAG 的核心假设是「检索到正确的 Chunk 就能给出正确的答案」。但实践中发现了一个根本性问题：切 Chunk 的过程本身就会丢失关键信息。Contextual Retrieval 正是为了解决这个问题。", tag: '深入' , navTitle: "Contextual Retrieval：更好的 RAG"},
            { file: '10-summary.html', title: "进阶全景图", desc: "从 Workflow 到 Agent，从 Prompt Engineering 到 Context Engineering，这一篇章覆盖了核心工程实践。让我们把所有主题串起来，形成完整的知识地图。", tag: '汇总' },
            { file: '10-final.html', title: "做最简单的、能跑的东西", desc: "所有复杂的架构设计、精巧的工程模式，最终都指向同一个朴素的真理。", tag: '收官' , navTitle: "做最简单的、能跑的东西"},
          ],
        },
        {
          id: 't-build4',
          title: '你现在能做什么',
          desc: '学完这章，你今天能动手做什么',
          lessons: [
            { file: 'build-4.html', title: "别再「感觉变好了」：搭你的第一个评测集", desc: "前三格你都是靠眼睛验收的，量小还行。但你马上会遇到那个经典困境：改了一版提示词，这三个用例变好了，那两个悄悄变差了，你没发现。Anthropic 说「不评测就是在裸奔」。这一格给你的 Agent 穿上衣服。", tag: '实战' },
          ],
        },
        {
          id: 't-interview4',
          title: '他们会这样考你',
          desc: '面试官、老板、技术同事会怎样考察本章内容',
          lessons: [
            { file: 'interview-4.html', title: "AI 工程设计模式 · 30 道灵魂拷问", desc: "工程进阶篇讲的全是生产级 Agent 的工程判断，这类问题在面试和评审会上出现得越来越频繁。先自己开口回答，再看框架。", tag: '考察' , navTitle: "AI 工程设计模式 · 30 道灵魂拷问"},
          ],
        },
      ],
    },
    {
      id: 'p5',
      num: '自我改进',
      title: 'Harness 与自我改进',
      desc: '从 Harness 设计模式到递归自我改进：当 Agent 开始优化自己的脚手架，AI 工程进入新阶段。基于 Lilian Weng 2026 年前沿综述。',
      color: '#7c3aed',
      group: 'main',
      prereq: '建议先学过工程进阶',
      routes: ['build'],
      topics: [
        {
          id: 't-harness-intro',
          title: 'Harness 概论',
          desc: '递归自我改进与 Harness 的核心地位',
          lessons: [
            { file: '11-1.html', title: "从脚手架到自我改进系统", desc: "Harness 不只是包裹模型的外壳。它正在成为 AI 递归自我改进的核心引擎。", tag: '前沿' , navTitle: "从脚手架到自我改进系统"},
            { file: '11-2.html', title: "Harness 的三大设计模式", desc: "好的 Harness 有清晰的模式语言，绝非一堆脚本拼起来。三个核心模式，覆盖了当前最强 Agent 系统 90% 的架构决策。", tag: '设计模式' },
          ],
        },
        {
          id: 't-harness-optimize',
          title: 'Harness 优化',
          desc: '从上下文工程到工作流自动搜索',
          lessons: [
            { file: '11-3.html', title: "上下文工程：从手写 Prompt 到自动进化", desc: "随着 Agent 任务变长，上下文管理不再是可选项。它正在成为 Harness 优化的核心战场。", tag: '前沿' , navTitle: "上下文工程：从手写 Prompt 到自动进化"},
            { file: '11-4.html', title: "工作流设计：从手工到自动搜索", desc: "工作流的设计空间巨大。我们应该用算法去搜索，只靠手动设计远远不够。", tag: '前沿' , navTitle: "工作流设计：从手工到自动搜索"},
          ],
        },
        {
          id: 't-harness-self',
          title: '自我改进与进化',
          desc: '让 Harness 改进自己、用进化算法搜索设计空间',
          lessons: [
            { file: '11-5.html', title: "让 Harness 改进自己", desc: "如果 LLM 能优化执行 Agent 的代码，它就能访问比手写 Prompt 大得多的设计空间。", tag: '前沿' },
            { file: '11-6.html', title: "进化搜索：让最强 Harness 存活", desc: "进化算法 + 编码 Agent = 在庞大的 Harness 设计空间中自动发现最优解。", tag: '前沿' , navTitle: "进化搜索：让最强 Harness 存活"},
          ],
        },
        {
          id: 't-harness-future',
          title: '未来与反思',
          desc: '自我改进面临的根本挑战',
          lessons: [
            { file: '11-7.html', title: "未来挑战：自我改进的七道关", desc: "研究者取得了真正的进展，但通往完整递归自我改进的路上，还有若干瓶颈。", tag: '前沿' , navTitle: "未来挑战：自我改进的七道关"},
          ],
        },
        {
          id: 't-build5',
          title: '你现在能做什么',
          desc: '学完这章，你今天能动手做什么',
          lessons: [
            { file: 'build-5.html', title: "它跑十轮很聪明，跑五十轮呢？", desc: "这一章讲的是让 Harness 自己进化，听着离你很远。但所有自我改进的前提，是先有一个能长跑的 Harness：知道什么时候压缩、什么东西永不能丢、什么结论要落盘。这三条规矩，你今天就能给自己的 Agent 立起来。", tag: '实战' },
          ],
        },
        {
          id: 't-interview5',
          title: '他们会这样考你',
          desc: '面试官、老板、技术同事会怎样考察本章内容',
          lessons: [
            { file: 'interview-5.html', title: "Harness 与自我改进 · 30 道灵魂拷问", desc: "这一章讲的是最前沿的东西，考它的人也最容易分出真假。这 30 个问题来自三个真实场景，先自己开口回答，再看框架。", tag: '考察' , navTitle: "Harness 与自我改进 · 30 道灵魂拷问"},
          ],
        },
      ],
    },
    {
      id: 'p7',
      num: '协作方法论',
      title: 'Vibe Coding 方法论',
      desc: "参考公开的 AI 协作规范与教学示例，练习流程控制、质量检查、文档沉淀、环境安全和清楚表达；将适用的方法整理成自己的工作规范。",
      color: '#0d9488',
      group: 'indie',
      cluster: 'chain',
      routes: ['use', 'pro', 'pm', 'build'],   // 一个人做产品就要自己指挥 AI 写代码；两个主题任何人都用得上，篇章并集含 use
      topics: [
        {
          id: 't-vibe-why',
          routes: ['use', 'pro', 'pm', 'build'],   // AI 为什么会写崩，跟 AI 打交道的人都该知道
          title: '理念与入门',
          desc: '为什么 AI 写得快反而容易搞砸，Rules 为什么是最稳的约束方式',
          lessons: [
            { file: 'vibe-1.html', title: "为什么要给 AI 立规矩", desc: "Vibe Coding 指靠自然语言让 AI 直接产出代码的开发方式。它的问题出在质量：没有规矩的 AI 会返工、漏改、悄悄删代码、留下永久技术债。这一节先看事故长什么样，再看约束怎么注入才最稳。", tag: '交互' },
          ],
        },
        {
          id: 't-vibe-flow',
          routes: ['pro', 'pm', 'build'],   // 四步流程与 PlayGround，偏动手
          title: '流程控制',
          desc: '在 AI 动手之前设好人工断点',
          lessons: [
            { file: 'vibe-2.html', title: "四步流程：复述、PRD、确认、编码", desc: "把软件工程的需求确认环节搬进人机协作：AI 动手之前必须复述需求、写出 PRD、拿到明确许可。再加上批量修改断点和查重规则，把爆炸半径控制在动手之前。", tag: '交互' , navTitle: "四步流程：复述、PRD、确认、编码"},
            { file: 'vibe-3.html', title: "PlayGround：组件的试衣间", desc: "UI 功能直接写进页面，改一处影响一片，调一个按钮要把整个页面跑起来。解法是先做独立的组件 PlayGround：每个 UI 元素有单独的 demo，调好了再集成进正式页面。", tag: '交互' , navTitle: "PlayGround：组件的试衣间"},
          ],
        },
        {
          id: 't-vibe-quality',
          routes: ['pro', 'pm', 'build'],   // 注释、调试、交付粒度，偏代码
          title: '质量底线',
          desc: '样式复用、注释、调试与完整实现的硬性要求',
          lessons: [
            { file: 'vibe-3b.html', title: "样式收敛：一个按钮不要八套 CSS", desc: "让 AI 连着做十个功能，你会攒出八个长得差不多的按钮类。它不是不会复用，是每轮对话都不知道你已经有什么。这一节讲样式为什么会增殖、怎么收干净，以及哪些差异该留着。", tag: '交互' , navTitle: "样式收敛：一个按钮不要八套 CSS"},
            { file: 'vibe-4.html', title: "注释三要素与代码保护", desc: "AI 写的注释多是功能复述，三个月后回来看代码，想不起当初为什么这样实现。这一节给注释立结构，也给「删代码」立规矩。页面里有两个可动手的演示。", tag: '交互' },
            { file: 'vibe-5.html', title: "调试铁律：先 Log 再改码", desc: "AI 遇到报错的第一反应是猜一个原因改改看，不行再猜一个。这一节立最核心的一条规矩：禁止猜测性修复。下面两个演示，亲手对比两条修 Bug 路径。", tag: '交互' , navTitle: "调试铁律：先 Log 再改码"},
            { file: 'vibe-6.html', title: "不接受分期交付", desc: "你要一个完整的认证系统，AI 说「先做一个简版的用户名密码登录，后续再加 OAuth」。后续永远不会来。这一节用两个演示，看清「先做简版」的完整生命周期，并练习正确的回应方式。", tag: '交互' },
          ],
        },
        {
          id: 't-vibe-docs',
          routes: ['pro', 'pm', 'build'],   // 三份文档与方法论沉淀，做产品要懂
          title: '文档与沉淀',
          desc: '让决策跨越对话和时间留存下来',
          lessons: [
            { file: 'vibe-7.html', title: "三份文档与方法论沉淀", desc: "做了 30 个功能，三个月后想查「这个功能什么时候加的、当初为什么这样设计、中间改过几次方案」，翻遍 git log 也找不到。解法是让 AI 按严格模板维护三份文档，再加一份自动沉淀的方法论手册。本页两个演示都可以动手操作。", tag: '交互' },
          ],
        },
        {
          id: 't-vibe-env',
          routes: ['pro', 'pm', 'build'],   // 环境事实与破坏性操作，偏工程
          title: '环境与安全',
          desc: '把环境事实写死，给破坏性操作上闸',
          lessons: [
            { file: 'vibe-8.html', title: "把环境事实写进 Rule", desc: "每次新开对话，AI 都不知道该调哪个模型、超时设多少、项目用什么框架。把这些环境事实一次性写死在 Rule 里，相当于给 AI 一份预填好的 .env 说明书，每轮对话自动带入。本页两个演示都可以真实操作。", tag: '交互' },
            { file: 'vibe-9.html', title: "破坏性操作的三道闸", desc: "发版时以为只改了 A 功能，实际 diff 里混进了上周调试 B 的临时改动，半成品代码进了生产环境。数据库、配置、部署这些不可逆操作，必须在执行前设闸。下面两个演练都可以动手操作。", tag: '交互' },
          ],
        },
        {
          id: 't-vibe-comm',
          routes: ['use', 'pro', 'pm', 'build'],   // 长对话不跑偏、去 AI 腔，不写代码也天天用
          title: '沟通与写作',
          desc: '对抗上下文漂移，消灭 AI 腔',
          lessons: [
            { file: 'vibe-10.html', title: "长对话锚定与写作规范", desc: "对话开头说了用 PostgreSQL，聊到 30 轮 AI 突然建议 SQLite，因为早期约定已经被上下文窗口挤掉了。这一节讲两件事：怎么对抗长对话的认知漂移，以及怎么让 AI 写出的中文摆脱 AI 腔。两个交互演示，动手拖一拖、点一点。", tag: '交互' },
          ],
        },
        {
          id: 't-vibe-final',
          routes: ['use', 'pro', 'pm', 'build'],   // 规则全景与怎么改成自己的，和理念、沟通两节凑成不写代码也能看的小闭环
          title: '专题收官',
          desc: '把这套规则改造成你自己的',
          lessons: [
            { file: 'vibe-final.html', title: "规则的价值：每条解决一个真实问题", desc: "14 个章节走完了。这套规则的来源只有一个：每发现一次 AI 反复犯的错误，就加一条规则。收官这节把全景图摊开，再用一个自查向导帮你把它改造成你自己的。", tag: '收官' , navTitle: "规则的价值：每条解决一个真实问题"},
          ],
        },
        {
          id: 't-build6',
          routes: ['pro', 'pm', 'build'],   // 动手任务，跟着这章走
          title: '你现在能做什么',
          desc: '学完这章，你今天能动手做什么',
          lessons: [
            { file: 'build-6.html', title: "最后一格：让「你的做法」变成「谁来都行」", desc: "前五格你做出了一个能干活的 Agent，但所有的判断都在你脑子里。这一格把它们写成规矩。立住之后，换个人、换个项目、换个模型，这套东西照样跑。这才叫工程，不叫手艺。", tag: '实战' },
          ],
        },
        {
          id: 't-interview7',
          routes: ['pro', 'pm', 'build'],   // 面试题，跟着这章走
          title: '他们会这样考你',
          desc: '面试官、老板、技术同事会怎样考察本章内容',
          lessons: [
            { file: 'interview-7.html', title: "Vibe Coding 方法论 · 30 道灵魂拷问", desc: "用 AI 写代码这件事，最不缺的就是质疑。这 30 个问题来自三个真实场景：面试官在验证深度，老板在追问责任，技术同事在试探边界。先自己开口回答，再看框架。", tag: '考察' , navTitle: "Vibe Coding 方法论 · 30 道灵魂拷问"},
          ],
        },
      ],
    },
    {
      id: 'p-taste',
      num: '专题篇章',
      title: '审美工程：让 AI 做出有品味的东西',
      desc: '协作流程立住之后，第一个卡住你的是审美。AI 把执行门槛打掉之后，人人都能十分钟做出能用的东西，「能用」本身开始贬值，品味成了新的分水岭。这一章教两项可训练的技能：识别美，四个抓手（层级、留白、克制、一致性）每个配 A/B 找茬交互；把审美翻译给 AI 听，审美词汇表、生 UI 与生图的提示词写法、垫图与参考库。天赋型的「创造美」教不了，但「看出哪里不对」和「说清要什么」，练了就会。',
      color: '#db2777',
      group: 'indie',
      cluster: 'chain',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-taste-why',
          title: '品味成了新瓶颈',
          desc: '执行能力被拉平之后，判断力开始涨价',
          lessons: [
            { file: 'taste-1.html', title: "执行免费了，判断力开始涨价", desc: "AI 把执行门槛打掉了：人人都能十分钟做出一个能用的页面、一张能看的图。这一章不教你画图，教两件练了就会的事：看出哪里不对，说清要什么。", tag: '开篇' , navTitle: "执行免费了，判断力开始涨价"},
            { file: 'taste-2.html', title: "「AI 味儿」是怎么来的", desc: "让 AI 随便生成一个页面，十有八九是紫色渐变、毛玻璃、居中大标题三件套。这种整齐划一有数学上的原因，看懂了它，你就知道怎么绕开它。", tag: '交互' , navTitle: "「AI 味儿」是怎么来的"},
          ],
        },
        {
          id: 't-taste-eye',
          title: '识别美的四个抓手',
          desc: '层级、留白、克制、一致性，每个都配找茬',
          lessons: [
            { file: 'taste-3.html', title: "层级：一屏只有一个主角", desc: "打开一个页面，视线总得先落在某一处。设计者不安排这个落点，读者的眼睛就会自己乱撞。这一节讲层级：怎么用字号、字重、颜色三根杠杆，把「先看哪」安排明白。", tag: '交互' , navTitle: "层级：一屏只有一个主角"},
            { file: 'taste-4.html', title: "留白与对齐：大多数丑都丑在间距", desc: "「说不上哪里丑，反正就是丑」，这句评价八成在说间距。颜色字体一处没动，只把间距捋顺，界面就能上一个档次。这一节给你两条规律和一张现成的数字表。", tag: '交互' , navTitle: "留白与对齐：大多数丑都丑在间距"},
            { file: 'taste-5.html', title: "克制：给颜色和字体做预算", desc: "好看的界面大多不是加出来的，是省出来的。这一节给你一套预算表：一个主色加中性色、两种字重、一套圆角。超预算的东西再好看也砍。", tag: '交互' , navTitle: "克制：给颜色和字体做预算"},
            { file: 'taste-6.html', title: "一致性：系统感从哪来", desc: "有一种界面，单看每处都还行，合起来却透着一股散装味。它缺的说到底就一样东西：一套大家共同遵守的变量。这一节讲 design token，变量先行，样式跟随。", tag: '案例' , navTitle: "一致性：系统感从哪来"},
          ],
        },
        {
          id: 't-taste-speak',
          title: '把审美翻译给 AI 听',
          desc: '审美词汇量决定 AI 产出质量',
          lessons: [
            { file: 'taste-7.html', title: "「好看」的一百种具体说法", desc: "你对 AI 说「好看一点」，它只能猜；你说「信息密度加一档、视觉噪音降下来」，它立刻知道该动哪里。这一节给你十二个能直接用的审美词、一套拆解一切视觉差异的八变量，外加一台把抱怨翻译成术语的机器。", tag: '交互' , navTitle: "「好看」的一百种具体说法"},
            { file: 'taste-8.html', title: "生 UI：从形容词到规格书", desc: "给 AI 提 UI 需求，形容词是许愿，规格是指令。同一个落地页需求，三档提示词能差出三个档次的产出；这一节教你把「好看」写成一份 AI 没法跑偏的规格书。", tag: '实战' , navTitle: "生 UI：从形容词到规格书"},
            { file: 'taste-9.html', title: "生图：构图、光影、色彩的语言", desc: "生图和生 UI 同一个道理：词汇量决定产出。构图、光影、色彩三件套，每样记三个词；先用三组真图练眼力，再拼一段能直接用的生图提示词。", tag: '实战' , navTitle: "生图：构图、光影、色彩的语言"},
          ],
        },
        {
          id: 't-taste-library',
          title: '建立自己的参考库',
          desc: '会看，然后让 AI 照着你的参考出活',
          lessons: [
            { file: 'taste-10.html', title: "怎么看设计才算看进去了", desc: "收藏夹在膨胀，眼力没长进，问题出在看的方式。这一节给一套固定的拆解顺序，把「真好看」翻译成能带走的变量，你的参考库从这里开始有复利。", tag: '方法' , navTitle: "怎么看设计才算看进去了"},
            { file: 'taste-11.html', title: "把参考喂给 AI", desc: "你能看出好在哪之后，下一步是让 AI 也知道。这一节讲三种把参考喂进对话的姿势：垫图、风格描述、设计变量，配拿来就用的话术模板。", tag: '实战' , navTitle: "把参考喂给 AI"},
          ],
        },
        {
          id: 't-taste-final',
          title: '专题收官',
          desc: '点头之前，过一遍清单',
          lessons: [
            { file: 'taste-final.html', title: "验收清单：点头之前过一遍", desc: "AI 出稿越来越快，把关的动作要跟上。收官这一节交付一份 15 项验收清单，再回访你在开篇投下的那一票，看看这一章有没有把眼睛练出来。", tag: '收官' , navTitle: "验收清单：点头之前过一遍"},
          ],
        },
      ],
    },
    {
      id: 'p-ixd',
      num: '专题篇章',
      title: '交互工程：让 AI 做出好用的东西',
      desc: '好不好看一眼能看出来，好不好用要用起来才知道，所以交互的病比审美的病更隐蔽。AI 默认交付的交互是「能跑通」级别：空态一片空白、报错弹 alert、删除不带确认、五步向导一步不少。这一章接着审美工程往下走：先学识别（状态三件套、防错与可逆、流程克制、习惯用法），再抠界面细节（控件怎么选、文案怎么说），最后把交互要求翻译给 AI 听（目标导向描述需求、状态机与边界写进提示词）。素材整理自交互设计的经典教材《About Face 4》。',
      color: '#2563eb',
      group: 'indie',
      cluster: 'chain',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-ixd-why',
          title: '好用也成了瓶颈',
          desc: '「能跑通」和「好用」隔着一整章',
          lessons: [
            { file: 'ixd-1.html', title: "能跑通了，然后呢？", desc: "上一章练的是看出「哪里丑」，这一章练看出「哪里难用」。AI 交付的应用功能齐全、点哪都有反应，但用起来处处硌手。这一节先立住全章的地基：交互的病比审美的病更隐蔽，然后拿一张理论清单，亲手抓五个现行。", tag: '开篇' , navTitle: "能跑通了，然后呢？"},
          ],
        },
        {
          id: 't-ixd-spot',
          title: '识别好交互的四个抓手',
          desc: '状态、防错、流程、习惯用法',
          lessons: [
            { file: 'ixd-2.html', title: "状态三件套：loading、空态、错误态", desc: "AI 生成的界面默认只有一种状态：数据齐全、网络流畅、一切正常。可用户遇到的头一屏常常是另外三种：没数据、在等待、出错了。这三种非正常时刻恰恰是体验分水岭，这一节把三件套逐个拆开，每件配一局 A/B 对决。", tag: '交互' , navTitle: "状态三件套：loading、空态、错误态"},
            { file: 'ixd-3.html', title: "防错与可逆：让用户敢点", desc: "上一节教错误怎么说，这一节往前挪一步：让错误压根发生不了，发生了也能一键回头。AI 生成的应用最爱用确认弹窗当保险，但那是最弱的一道防线，你自己动手删两条数据就明白了。", tag: '交互' , navTitle: "防错与可逆：让用户敢点"},
            { file: 'ixd-4.html', title: "流程克制：每多一步掉一批人", desc: "上一节管住了危险按钮，这一节看整条路：用户从进来到办完事，中间有多少步在伺候软件而没在办他的事。AI 生成的流程有个通病：太完整。你来当一回流程审计员，把一个五步注册砍到两步。", tag: '交互' , navTitle: "流程克制：每多一步掉一批人"},
            { file: 'ixd-5.html', title: "习惯用法：别让 AI 发明新交互", desc: "流程砍利索了，还有一种病藏得更深：AI 有时会发明看着新颖、没人会用的交互。这一节讲两个词，习惯用法（idiom）和能供性（affordance），学完你能一眼认出哪个控件在装创新，还能说清为什么用户学不会。", tag: '交互' , navTitle: "习惯用法：别让 AI 发明新交互"},
          ],
        },
        {
          id: 't-ixd-detail',
          title: '界面的细节',
          desc: '控件怎么选，文案怎么说',
          lessons: [
            { file: 'ixd-6.html', title: "控件选对了吗：单选、多选、开关与下拉", desc: "前面四节看的是流程和状态，这一节钻进界面最小的零件。控件是用户和产品之间的通用语言，用错一个，用户就要多点一次、多猜一次。选用规则四句话就讲完，AI 不知道这四句，你得替它把关。", tag: '交互' , navTitle: "控件选对了吗：单选、多选、开关与下拉"},
            { file: 'ixd-7.html', title: "界面会说话：用户怎么理解你的文案", desc: "控件选对了，界面还得开口说话。按钮上的两个字、弹窗里的一句话，就是产品和用户的全部对话。微文案是交互的一半：写对了，用户不用想；写错了，控件再标准也白搭。AI 写微文案只有一招，逢事「确定」。", tag: '交互' , navTitle: "界面会说话：用户怎么理解你的文案"},
          ],
        },
        {
          id: 't-ixd-translate',
          title: '把交互翻译给 AI 听',
          desc: '目标导向 + 状态机，AI 才知道你要什么',
          lessons: [
            { file: 'ixd-8.html', title: "目标导向：用目标描述需求，别用功能清单", desc: "前七节教你识别好交互，这两节教你把要求翻译给 AI 听。第一句翻译心法来自《About Face 4》的开篇方法论：先说清用户是谁、要完成什么，功能让 AI 自己推。给它开清单，你会收到一个柜台；给它讲场景，你会收到一个工具。", tag: '实战' , navTitle: "目标导向：用目标描述需求，别用功能清单"},
            { file: 'ixd-9.html', title: "把状态机和边界写进提示词", desc: "上一节把「要什么」翻译成了目标和场景，这一节补上「别糊弄」的部分。规律很简单：AI 只认真写你提到的状态，没提到的一律按晴天想象。所以状态要列全，边界要说死，防错要写明，这三样合起来就是交互规格。", tag: '实战' , navTitle: "把状态机和边界写进提示词"},
          ],
        },
        {
          id: 't-ixd-final',
          title: '专题收官',
          desc: '上线前的第二张清单',
          lessons: [
            { file: 'ixd-final.html', title: "交互验收清单：上线前的第二张清单", desc: "审美篇收官交付了第一张清单管「好看」，这一章交付第二张管「好用」。好看管第一眼，好用管接下来的每一天，而且交互的病更隐蔽：截图看不出来，要点起来才露馅。14 项，每项一个动作，点头之前过一遍。", tag: '收官' , navTitle: "交互验收清单：上线前的第二张清单"},
          ],
        },
      ],
    },
    {
      id: 'p-psy',
      num: '专题篇章',
      title: 'AI 产品心理学：让用户觉得好用',
      desc: '审美和交互解决了做得好看、做得好用，还剩第三件事：让用户觉得好用。AI 产品天生慢、会错、不透明，这三个毛病工程上短期都只能缓解，但用户的评价由感知决定，感知可以设计。这一章沿用户旅程铺十六个心理效应：等待焦虑、劳动错觉、峰终定律、信任校准、算法厌恶、防御心理、蜜月悬崖、AI 标签折扣、认知卸载、情感依恋，一路讲到付费疼痛、定价锚点和沉默偏差。每一课都是一个心理效应加一组当场能拨的工程开关。',
      color: '#0d9488',
      group: 'indie',
      cluster: 'chain',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-psy-perceive',
          title: '感知性能',
          desc: '用户的秒表和服务器的秒表走得不一样',
          lessons: [
            { file: 'psy-1.html', title: "工程指标及格了，用户为什么还骂慢？", desc: "前面的章节教你把延迟压下来、把成本抠下来、把幻觉率降下来。这一章换一块秒表：用户脑子里那块。它和服务器的秒表走时不同，打分、续费、卸载都跟着它走。第一课先跑个实验，再把这块表的走时怪癖逐个拆开。", tag: '开篇' , navTitle: "工程指标及格了，用户为什么还骂慢？"},
          ],
        },
        {
          id: 't-psy-wait',
          title: '等待与过程设计',
          desc: '难受的从来不是那 5 秒本身',
          lessons: [
            { file: 'psy-2.html', title: "等待心理学：难受的从来不是那 5 秒", desc: "第 1 课你已经亲手测过：同样 5 秒，体感能差两三倍。这一课把背后的规律讲透。服务运营研究把排队心理总结成几条定律，条条能翻译成 AI 产品的设计决策，翻译完你会发现：大部分「太慢了」的差评，修的其实是呈现，模型一行都不用动。", tag: '交互' , navTitle: "等待心理学：难受的从来不是那 5 秒"},
            { file: 'psy-3.html', title: "劳动错觉：让 AI 把努力演出来", desc: "第 2 课说等待要有反馈，这一课的结论更反直觉：有些等待根本没必要消灭。展示工作过程的产品，让用户多等几秒，满意度和信任反而更高。这个效应叫劳动错觉（Labor Illusion）。先做实验，再看研究，最后把边界画清。", tag: '交互' , navTitle: "劳动错觉：让 AI 把努力演出来"},
            { file: 'psy-4.html', title: "峰终定律：用户只记得峰值和结尾", desc: "诺奖得主卡尼曼发现：人对一段体验的记忆评分，几乎只由最强烈的那一刻（峰）和最后一刻（终）决定，和平均水平、持续时长关系不大。这条定律直接回答一个预算问题：最贵的模型、最多的优化精力，该花在会话的哪个位置。这一课五个实验，逐个上手。", tag: '交互' , navTitle: "峰终定律：用户只记得峰值和结尾"},
          ],
        },
        {
          id: 't-psy-trust',
          title: '信任与防御',
          desc: '既不能全信，也不能不敢用',
          lessons: [
            { file: 'psy-5.html', title: "信任校准：最好的用户是半信半疑的", desc: "前四课都在给体验挣分，这一课踩一脚刹车：信任这个指标，目标值从来就没定在满分。AI 会出错是改不掉的物理现实，所以健康的用户长这样：该信的场景放心用，该查的场景留个心眼。往哪边偏都要交学费。这一课先看两笔真实学费，再给你三件能亲手拨弄的校准工具。", tag: '交互' , navTitle: "信任校准：最好的用户是半信半疑的"},
            { file: 'psy-9.html', title: "算法厌恶：AI 犯一次错，就被永久拉黑", desc: "上一课讲信任要校准。这一课讲校准路上最大的一块石头：人对 AI 的容错率，远低于对人。同样犯一次错，人类同事会被原谅，AI 会被弃用。这个不对称有实验、有数据、也有解药。", tag: '交互' , navTitle: "算法厌恶：AI 犯一次错，就被永久拉黑"},
            { file: 'psy-6.html', title: "防御心理：用户不是不会用，是不敢用", desc: "很多 AI 功能的低使用率，复盘时被归因成「用户教育不够」，再做一轮引导弹窗，还是没人用。真正的原因常常是用户在防御：他看懂了你的功能，然后决定不碰。这一课先测你自己防不防，再拆三种防御的来源，最后把三板斧一把一把拨给你看，五个教具，逐个亲手玩。", tag: '交互' , navTitle: "防御心理：用户不是不会用，是不敢用"},
          ],
        },
        {
          id: 't-psy-mind',
          title: '心智模型与拟人化',
          desc: '用户拿错说明书，怪不到用户头上',
          lessons: [
            { file: 'psy-7.html', title: "心智模型：用户拿错了说明书", desc: "交互设计有个老概念叫心智模型：用户会带着一套「这东西应该怎么运作」的假设来用你的产品，假设错了，操作就错，然后差评打给产品，账算在你头上。AI 是人类历史上第一个「长得像老产品、内核两样」的东西，心智错配格外严重。这一课先认出四本错误说明书，再亲手玩三个纠正教具。", tag: '交互' , navTitle: "心智模型：用户拿错了说明书"},
            { file: 'psy-8.html', title: "拟人化的度，与 AI 道歉的艺术", desc: "上世纪 90 年代，斯坦福的 Reeves 和 Nass 在《媒体等同》里报告了一组反直觉的实验：人会不由自主地对电脑讲礼貌、被电脑夸了会开心，明知对面是机器也照样套用社交规则。这叫 CASA 范式（把计算机当社会行动者）。它意味着拟人化根本由不得你选：用户一定会把你的 AI 当某种人对待，你能决定的只有让它当哪种人，以及它闯祸之后怎么开口。这一课五个实验，全部亲手玩。", tag: '交互' , navTitle: "拟人化的度，与 AI 道歉的艺术"},
          ],
        },
        {
          id: 't-psy-longterm',
          title: '长期使用',
          desc: '蜜月期过了，关系才刚开始',
          lessons: [
            { file: 'psy-10.html', title: "蜜月悬崖：宣传拉高的期望，要用留存来还", desc: "发布会上的演示惊为天人，上手第一天很兴奋，第三天开始挑刺，第三十天卸载。这条曲线你在无数 AI 产品上见过。它有两个成因：期望被宣传拉高了，新鲜感又天然会掉。两个都能设计。", tag: '交互' , navTitle: "蜜月悬崖：宣传拉高的期望，要用留存来还"},
            { file: 'psy-11.html', title: "AI 标签折扣：同样的内容，标上 AI 就掉价", desc: "内容没变，加四个字「AI 生成」，评价掉一截；工具很好用，用户却不想让同事知道自己在用。这两件事是同一个偏见的两面。做 AI 产品，标签什么时候必须亮、什么时候是自己给自己减分，是一道天天要做的题。", tag: '交互' , navTitle: "AI 标签折扣：同样的内容，标上 AI 就掉价"},
            { file: 'psy-12.html', title: "认知卸载：用户一边用你，一边怕自己废掉", desc: "你的重度用户里藏着一批矛盾的人：离了你的产品干不了活，又隐隐觉得自己正在废掉。这份焦虑不会写进 NPS 评语，但它决定续费、决定推荐，也决定他会不会在某天突然「戒掉」你。焦虑的名字叫认知卸载，它能被产品设计接住。", tag: '交互' , navTitle: "认知卸载：用户一边用你，一边怕自己废掉"},
            { file: 'psy-13.html', title: "情感依恋：用户爱上你的产品之后", desc: "拟人化那课讲过：人会不由自主地把机器当社会角色对待。这一课讲它走到深处的样子：用户对 AI 产生真实的情感依恋。它带来最强的留存曲线，也带来产品经理职业生涯里最重的责任。这不是陪伴类产品的专属课题，任何一个有对话框的产品都躲不开。", tag: '交互' , navTitle: "情感依恋：用户爱上你的产品之后"},
          ],
        },
        {
          id: 't-psy-money',
          title: '付费与定价',
          desc: '收钱也是一门心理设计',
          lessons: [
            { file: 'psy-14.html', title: "付费心理：为一个概率商品掏钱，痛在哪", desc: "AI 是个奇怪的商品：付同样的钱，这次生成惊艳，下次翻车，成本还在你看不见的地方按 token 跳动。用户口袋里的每一块钱都连着神经，怎么收钱，决定了掏钱疼不疼。这一课讲付费的心理侧，下一课讲定价的数字侧。", tag: '交互' , navTitle: "付费心理：为一个概率商品掏钱，痛在哪"},
            { file: 'psy-15.html', title: "定价心理：锚点、诱饵与体面的价格歧视", desc: "上一课讲怎么收钱不疼，这一课讲收多少。先记住一个反直觉的事实：用户对价格没有客观感受，全部判断来自参照物。参照物是可以摆的，这门手艺有一百年历史，AI 产品还拿到了一件独有的新工具。", tag: '交互' , navTitle: "定价心理：锚点、诱饵与体面的价格歧视"},
          ],
        },
        {
          id: 't-psy-feedback',
          title: '反馈设计',
          desc: '坏消息怎么才能听得见',
          lessons: [
            { file: 'psy-16.html', title: "反馈心理：用户为什么不点踩", desc: "你在回答旁边放了 👍 和 👎，指望用户帮你标数据。一个月后一看：点踩率 0.4%，但流失率在涨。不是产品没问题，是不满的用户根本不点踩，他们直接走。这一课讲反馈的心理成本，和不靠用户开口也能听见的办法。", tag: '交互' , navTitle: "反馈心理：用户为什么不点踩"},
          ],
        },
        {
          id: 't-psy-books',
          title: '延伸书单',
          desc: '这章的规律都有出处',
          lessons: [
            { file: 'psy-books.html', title: "九本书，把这一章读厚", desc: "这一章的每个结论都有出处，课里只给了你压缩版。这一节把原书排上书架：九本书，拆出十九条 PM 必须懂的心理学原理，每条都标注它在 AI 产品上的落点。别按顺序啃，先选你现在最头疼的问题。", tag: '书单' , navTitle: "九本书，把这一章读厚"},
          ],
        },
        {
          id: 't-psy-final',
          title: '专题收官',
          desc: '十六个效应一张对照表',
          lessons: [
            { file: 'psy-final.html', title: "十六个效应一张表，外加上线前十四问", desc: "这一章的每个心理效应都对应一个你早就学过的工程开关。收官把它们排成一张表，再给一份能直接抄进上线流程的检查清单。心理学不玄：它只是把「用户为什么这样反应」从猜测变成了规律。", tag: '收官' , navTitle: "十六个效应一张表，外加上线前十四问"},
          ],
        },
        {
          id: 't-psy-interview',
          title: '他们会这样考你',
          desc: '面试官、老板、技术同事会怎样考察本章内容',
          lessons: [
            { file: 'psy-interview.html', title: "AI 产品心理学 · 40 道灵魂拷问", desc: "心理学章学完了，能不能把「用户为什么这样反应」讲成可执行的方案，一问便知。这 40 个问题来自三个真实场景，先自己开口回答，再看框架。", tag: '考察' , navTitle: "AI 产品心理学 · 40 道灵魂拷问"},
          ],
        },
      ],
    },
    {
      id: 'p-cost',
      num: '专题篇章',
      title: 'Token 降本增效：AI 应用的成本工程',
      desc: "围绕 Token 计量、价格边界、任务规模与上下文设计学习成本工程。通过教学示例比较不同优化方式；实际价格和成本需按使用时的服务配置核对。",
      color: '#16a34a',
      group: 'indie',
      cluster: 'chain',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-cost-why',
          title: '定价即架构',
          desc: '成本构成、Token 怎么数、报价表怎么读',
          lessons: [
            { file: 'cost-1.html', title: "和用户对赌的生意", desc: "不知道你有没有这种感受：我们总想为用户提供更好的 AI 服务，但在商业化层面，是和用户在对赌——产品用得越好，用户用得越多，利润反而越薄。看到消费账单的时候，不知道会不会窒息。", tag: '开篇' , navTitle: "和用户对赌的生意"},
            { file: 'cost-2.html', title: "Token 怎么数：BPE 与隐形的「Token 税」", desc: "账单按 Token 结算，但 Token 到底是怎么数出来的？它既不是字符，也不是单词，而是基于统计规律生成的「子词」。理解这套规则，你才会明白：同样一句话，中文为什么天生比英文贵 2 倍。", tag: '交互' , navTitle: "Token 怎么数：BPE 与隐形的「Token 税」"},
            { file: 'cost-3.html', title: "报价表速览与三大梯队", desc: "把常用模型的定价摊开在一张表上，你会看到三个清晰的梯队。但仅仅知道哪个贵、哪个便宜是远远不够的——真正的成本刺客，藏在那些价格跳变的边界线里。", tag: '选型' , navTitle: "报价表速览与三大梯队"},
          ],
        },
        {
          id: 't-cost-cliff',
          title: '三大跳档陷阱',
          desc: '藏在价格边界线里的账单刺客',
          lessons: [
            { file: 'cost-4.html', title: "GLM 的短输出博弈：200 Token 断崖", desc: "观察 GLM-4.6 的定价结构，会发现一个神奇的设计：它不按输入长度分档，而是按输出长度分档，分界线在 200 个 Token。输出 199 和输出 201，适用完全不同的价格。", tag: '交互' , navTitle: "GLM 的短输出博弈：200 Token 断崖"},
            { file: 'cost-5.html', title: "Qwen 的阶梯逃逸：32k 红线", desc: "Qwen 系列的分档逻辑和智谱完全不同：按输入长度计费，分界线在 32k 和 128k。最容易被忽略的计费细节是——越线后不是「超出部分加价」，而是整个请求全量按高价档结算。", tag: '交互' , navTitle: "Qwen 的阶梯逃逸：32k 红线"},
            { file: 'cost-6.html', title: "图片 Token：像素也要交税", desc: "文字 BPE 是「合并字符」，图片编码是「切割像素」。你以为传的是原图，其实模型按缩放对齐后的分辨率计费——这里面藏着和文字 32k 红线一模一样的跳档陷阱。", tag: '交互' , navTitle: "图片 Token：像素也要交税"},
          ],
        },
        {
          id: 't-cost-agent',
          title: 'Agent 的账单',
          desc: '循环执行让成本累积膨胀',
          lessons: [
            { file: 'cost-7.html', title: "输入主导：62:1 的 I/O Ratio", desc: "普通 Chatbot 是一问一答；Agent 是「思考 → 行动 → 观察 → 再思考」的循环。关键认知：每一轮的 Input 都包含了全部历史信息——轮次越多，Input 越长，成本累积膨胀。", tag: '交互' , navTitle: "输入主导：62:1 的 I/O Ratio"},
            { file: 'cost-8.html', title: "Agent 四大成本陷阱与熔断", desc: "上一节看到的还只是「一次成功的执行」。真实世界里，Agent 的账单事故来自四个方向：工具返回爆炸、思考税、死循环、历史雪球。每一个都有对应的工程解法。", tag: '深入' , navTitle: "Agent 四大成本陷阱与熔断"},
          ],
        },
        {
          id: 't-cost-practice',
          title: '四层实战优化',
          desc: '语法、语义、架构、输出，一层层抠',
          lessons: [
            { file: 'cost-9.html', title: "语法层：Prompt 是写给机器的", desc: "进入实战四层的第一层。很多产品早期为了调试方便，或者干脆是让 AI 代写的提示词，习惯用 ###、** 加粗、JSON 展示数据。这些对人类友好的排版，在大模型的计费逻辑里全是「词法税」。", tag: '实战' , navTitle: "语法层：Prompt 是写给机器的"},
            { file: 'cost-10.html', title: "语义层：双重蒸馏", desc: "格式的税砍完了，往深一层看内容本身。RAG 和长文档场景里最常见的工程错误：把上下文窗口当垃圾桶——Few-Shot 案例、检索文档全怼进去，让模型自己辨识。能用，但不该这样用。", tag: '实战' , navTitle: "语义层：双重蒸馏"},
            { file: 'cost-11.html', title: "架构层：KV Cache 的注意事项", desc: "在商业化产品的降本增效中，KV Cache 是最被低估的技术点之一。命中缓存和没命中，最高差 90% 的成本——但里面有几个隐形的坑，不说你可能不知道。", tag: '实战' , navTitle: "架构层：KV Cache 的注意事项"},
            { file: 'cost-12.html', title: "输出层：管住模型的嘴", desc: "实战四层的最后一层。输出 Token 比输入贵好几倍（回看第 3 节报价表），而且直接决定接口返回速度。管住模型的嘴，有三类合适的操作：指令层、代码层、工程层。", tag: '实战' , navTitle: "输出层：管住模型的嘴"},
          ],
        },
        {
          id: 't-cost-final',
          title: '专题收官',
          desc: '省钱的尽头是信息密度',
          lessons: [
            { file: 'cost-final.html', title: "算力时代的极简主义", desc: "做完这几层优化，你基本上已经跑赢 90% 的粗放型 AI 产品了。收官这一节，把整个专题串成一张清单，再聊聊「省钱」背后的那件更重要的事。", tag: '收官' , navTitle: "算力时代的极简主义"},
          ],
        },
      ],
    },
    {
      id: 'p-ds',
      num: '编程基础篇',
      title: '数据结构：AI 世界的骨架',
      desc: '不背定义、不手写链表。用你已经学过的 AI 概念当例子——message list 是数组、KV Cache 是缓存、RAG 检索是近邻搜索——把八种核心数据结构一次看懂。学完你能看懂 AI 生成的代码在用什么结构，也能看懂大模型肚子里装的是什么。',
      color: '#0284c7',
      group: 'indie',
      cluster: 'hardcore',
      routes: ['use', 'pro', 'pm', 'build'],   // 科普主题（为什么要懂、线性结构）全路线可见，工程主题只在 build
      topics: [
        {
          id: 't-ds-why',
          routes: ['use', 'pro', 'pm', 'build'],   // 为什么要懂 + 收纳隐喻，人人该看
          title: '为什么 AI 时代还要懂',
          desc: '你可以不写代码，但要会验收 AI 写的代码',
          lessons: [
            { file: 'ds-1.html', title: "都 2026 年了，为什么还要懂数据结构？", desc: "AI 都会写代码了，还要学这个「程序员基本功」吗？先说结论：你可以不写代码，但要会验收 AI 写的代码。这一章不背定义、不手写链表，只给你一副能看穿代码的眼镜。第一课先玩个游戏。", tag: '交互' , navTitle: "都 2026 年了，为什么还要懂数据结构？"},
          ],
        },
        {
          id: 't-ds-linear',
          routes: ['use', 'pro', 'pm', 'build'],   // 对话数组、撤销、排队，零代码也看得懂
          title: '线性结构：你天天在用',
          desc: '数组、栈、队列，AI 对话和 Agent 调度的地基',
          lessons: [
            { file: 'ds-2.html', title: "数组：你聊的每句话都躺在里面", desc: "上一课说好了：数据结构 = 收纳方式。第一种收纳方式你其实天天在喂它数据——你和 AI 的每一段对话，在程序眼里就是一个 message list，而 message list 的真身，是最朴素的收纳方式：一排编了号的格子，叫数组。这一课先把你的对话摊开来看，再顺手回答一个老疑问：为什么聊久了它会忘事。", tag: '交互' , navTitle: "数组：你聊的每句话都躺在里面"},
            { file: 'ds-3.html', title: "栈：Cmd+Z 和「爆栈」的秘密", desc: "第二种收纳方式长得像一摞盘子：只能从最上面放、也只能从最上面拿，这叫栈。听着限制很大？可你每天按的撤销键、程序里每一次函数调用，靠的都是它。这一课先亲手玩坏一个文档再一键撤回来，最后围观一场「爆栈」事故——全球最大的程序员问答网站 Stack Overflow，名字就是从这场事故来的。", tag: '交互' , navTitle: "栈：Cmd+Z 和「爆栈」的秘密"},
            { file: 'ds-4.html', title: "队列：Agent 的活是排着队干的", desc: "上一课的栈是「后进先出」，这一课把方向掉个头：先进先出，一头进、另一头出——就是食堂打饭的那条队。别嫌它朴素，AI 服务能扛住一万个人同时提问、Agent 能有条不紊地干完一串任务，靠的都是这条队。这一课你来当调度员：亲手开动一条流水线，把它玩到积压、再救回来。", tag: '交互' , navTitle: "队列：Agent 的活是排着队干的"},
          ],
        },
        {
          id: 't-ds-hash',
          routes: ['pm', 'build'],   // 缓存与账单直觉，产品路线刚需
          title: '哈希与缓存：空间换时间',
          desc: '查得快和省钱，背后是同一招',
          lessons: [
            { file: 'ds-5.html', title: "哈希表：为什么它找东西快到不讲理", desc: "还记得第一课的伏笔吗？「查会员名单」的版本 B 用了一行 set.has(user)，名单从 100 人涨到 1000 万人，耗时纹丝不动。当时说好第五课揭底——今天就把这个「直达」的魔术拆给你看：它根本不翻，它是算出来的。", tag: '交互' , navTitle: "哈希表：为什么它找东西快到不讲理"},
            { file: 'ds-6.html', title: "缓存：AI 账单的隐形折扣", desc: "上一课的哈希表解决了「怎么瞬间找到」，这一课解决另一个问题：算过的东西，别再算第二遍。你在模型价格表上见过的「缓存命中五折甚至一折」，账单上省下的每一分钱，背后都是同一种收纳方式——把算过的结果存起来，下次直接取。", tag: '交互' , navTitle: "缓存：AI 账单的隐形折扣"},
          ],
        },
        {
          id: 't-ds-tree',
          routes: ['build'],   // AST 与图遍历，动手才需要
          title: '树与图：AI 的主场',
          desc: 'Coding Agent 和知识图谱眼里的世界',
          lessons: [
            { file: 'ds-7.html', title: "树：Coding Agent 眼里全是它", desc: "前面几课的收纳方式都是「一排排」的，这一课换个维度：一层套一层的收纳。衣柜里有格子，格子里有盒子，盒子里有袋子——这种「层级 + 包含」的收纳方式，在编程世界叫「树」。而 Coding Agent 抬眼望去，你的项目里全是树。", tag: '交互' , navTitle: "树：Coding Agent 眼里全是它"},
            { file: 'ds-8.html', title: "图：从知识图谱到多 Agent 协作", desc: "上一课的树规矩得很：每个节点只有一个爹，永远不绕圈。可现实世界的关系乱多了——你的朋友互相也是朋友，公司和学校和人搅在一起。把「每个节点只能有一个爹」这条规矩撕掉，树就升级成了图：节点 + 关系，想怎么连怎么连。这一课看图在 AI 世界的两大主场。", tag: '交互' , navTitle: "图：从知识图谱到多 Agent 协作"},
          ],
        },
        {
          id: 't-ds-llm',
          routes: ['pro', 'pm', 'build'],   // 分词与向量检索底层，讲 RAG 方案要用
          title: '大模型肚子里的数据结构',
          desc: '前面章节埋的伏笔，这里揭底',
          lessons: [
            { file: 'ds-9.html', title: "词表与 Trie：Tokenizer 的切词秘密", desc: "还记得大模型原理篇那个细节吗——分词器把「五花肉」切成一整块词元，而不是三个字。当时我们说「常见组合当一个整体」，这次揭底层：分词器是怎么在几万个词里，瞬间认出「五花肉」该整块拿走的？答案是一种叫 Trie（前缀树）的收纳方式——把词表按「共享开头」挂成一棵树。", tag: '交互' , navTitle: "词表与 Trie：Tokenizer 的切词秘密"},
            { file: 'ds-10.html', title: "向量：RAG 检索是在「找最近的邻居」", desc: "学 RAG 时我们说过：Embedding 把一段话变成一串数字。这串数字到底是什么？答案简单得出奇——是坐标。给每句话发一个「语义地图」上的位置，意思越近、位置越近。于是「检索资料」这件事，就变成了小学生都会的游戏：在地图上找离你最近的邻居。", tag: '交互' , navTitle: "向量：RAG 检索是在「找最近的邻居」"},
          ],
        },
        {
          id: 't-ds-summary',
          routes: ['build'],   // 汇总跟完整章走
          title: '篇章汇总',
          desc: '数据结构篇核心知识回顾',
          lessons: [
            { file: 'ds-summary.html', title: "汇总 · 八种结构一张决策表", desc: "十课走完，八种收纳方式全部揭底。这一页不讲新东西，只做一件事：把它们摆上同一张桌子，让你以后看到场景就能报出结构名。先扫一遍决策表，再玩选型器和快问快答，检验自己是不是真的能给 AI 写的代码把关了。", tag: '汇总' , navTitle: "汇总 · 八种结构一张决策表"},
          ],
        },
        {
          id: 't-ds-build',
          routes: ['build'],   // 动手任务
          title: '你现在能做什么',
          desc: '学完这章，你今天能动手做什么',
          lessons: [
            { file: 'ds-build.html', title: "把 AI 写的代码「验收」一遍", desc: "整章都在说「你可以不写代码，但要会验收」——今天就验一次真的。三档任务按投入挑一个：30 分钟能完成最轻的那档，一周能把验收变成你的工作习惯。每档都配了直接可用的提示词。", tag: '实战' , navTitle: "把 AI 写的代码「验收」一遍"},
          ],
        },
        {
          id: 't-ds-interview',
          routes: ['build'],   // 面试题跟完整章走
          title: '他们会这样考你',
          desc: '面试官、老板、技术同事会怎样考察本章内容',
          lessons: [
            { file: 'ds-interview.html', title: "数据结构 · 30 道灵魂拷问", desc: "数据结构篇学完了，收纳方式的直觉建立了没有，一问便知。这 30 个问题来自三个真实场景，先自己开口回答，再看框架。", tag: '考察' , navTitle: "数据结构 · 30 道灵魂拷问"},
          ],
        },
      ],
    },
    {
      id: 'p-algo',
      num: '编程基础篇',
      title: '算法：AI 的思考方式',
      desc: '从「这段代码要跑多久」的直觉开始，把复杂度、查找排序、递归分治、图搜索、贪心采样五类经典思想讲透——每一类都对应大模型里的一个真实机制：注意力是 O(n²)、Rerank 是排序、Compaction 是分治、解码是贪心与采样。最后回答那个终极问题：AI 都会做题了，还要不要刷 LeetCode。',
      color: '#db2777',
      group: 'indie',
      cluster: 'hardcore',
      routes: ['use', 'pro', 'pm', 'build'],   // Big-O 直觉与学习观全路线可见，其余只在 build
      topics: [
        {
          id: 't-algo-bigo',
          routes: ['use', 'pro', 'pm', 'build'],   // 复杂度直觉 + 上下文账单，人人该看
          title: '复杂度：一眼看穿代码值不值',
          desc: '不用数学，建立对「快慢」的直觉',
          lessons: [
            { file: 'algo-1.html', title: "Big-O：一眼看穿代码要跑多久", desc: "姊妹篇讲完了「数据结构 = 收纳方式」，这一章讲另一半：算法 = 做事的套路。评价一个套路好不好，程序员有一把统一的尺子，叫 Big-O。别被数学符号吓到——它回答的问题只有一个：数据变多的时候，你的代码会慢多少？今天用三个交互把这把尺子装进你脑子里。", tag: '交互' , navTitle: "Big-O：一眼看穿代码要跑多久"},
            { file: 'algo-2.html', title: "为什么上下文越长越贵？O(n²) 的账单", desc: "上一课你拿到了 Big-O 这把尺子，还记得那条起飞的红线吗？今天带你去看大模型里最有名的一个 O(n²)——注意力机制。学完你会突然理解一堆老问题：为什么长对话越来越卡、为什么上下文窗口是「窗口」不是「仓库」、为什么大家拼命做上下文压缩。", tag: '交互' , navTitle: "为什么上下文越长越贵？O(n²) 的账单"},
          ],
        },
        {
          id: 't-algo-sort',
          routes: ['build'],
          title: '查找与排序',
          desc: '砍一半的艺术，和排序在 AI 里的真身',
          lessons: [
            { file: 'algo-3.html', title: "二分查找：猜数字游戏的最优解", desc: "上一课那条最省心的绿线 O(log n)，今天揭开它的真面目。你小时候玩过「我想了个 1 到 100 的数，你猜」吗？猜数字的最优策略，就是计算机科学里最经典的算法之一——二分查找。先玩，再讲理。", tag: '交互' , navTitle: "二分查找：猜数字游戏的最优解"},
            { file: 'algo-4.html', title: "排序：冒泡和快排的赛跑", desc: "上一课说了，二分查找的门票是「先排好序」。那排序本身贵不贵？看你用什么套路。今天安排一场公开赛：同一组乱序数据，冒泡排序和快速排序同时开跑，谁先把柱子从矮到高排整齐谁赢。先看小数据，再上 60 根柱子——差距会让你印象深刻。", tag: '动画' , navTitle: "排序：冒泡和快排的赛跑"},
            { file: 'algo-5.html', title: "排序在 AI 里的真身：Rerank", desc: "上一课的排序比的是数字大小，但 AI 世界里排的是「相关性」：RAG 从知识库捞回来一堆段落，谁排前面谁就能挤进上下文——排错了，模型就会一本正经地引用错误资料。这个「打分 + 重排」的环节叫 Rerank。今天你亲自上岗，当一次 Rerank 模型。", tag: '交互' , navTitle: "排序在 AI 里的真身：Rerank"},
          ],
        },
        {
          id: 't-algo-recur',
          routes: ['build'],
          title: '递归与分治',
          desc: '把大事拆成同一件小事',
          lessons: [
            { file: 'algo-6.html', title: "递归：把大事拆成同一件小事", desc: "「做个官网」听着吓人，「写首页的三行文案」谁都会。工程进阶篇里你见过 Coding Agent 接到大需求后自己列小任务清单——它用的思路有个名字：递归。这一课不写一行代码，点一棵任务树、拖一根滑块，你就能拿到这个程序员嘴里最玄的词。", tag: '交互' , navTitle: "递归：把大事拆成同一件小事"},
            { file: 'algo-7.html', title: "分治：上下文压缩的算法原理", desc: "动手实战篇讲过：对话太长装不下时，AI 会做一次 Compaction——把旧对话压成摘要。当时说「像搬家前把杂物打包」，这一课揭开包装纸：它是一个有两千年历史的算法套路，叫分治。上一课的递归是「拆」，这一课补上另一半：「拆完再合」。", tag: '交互' , navTitle: "分治：上下文压缩的算法原理"},
          ],
        },
        {
          id: 't-algo-search',
          routes: ['build'],
          title: '搜索与决策',
          desc: '走迷宫、掷骰子、往前多看几步',
          lessons: [
            { file: 'algo-8.html', title: "BFS 与 DFS：Agent 在代码库里找文件", desc: "工程进阶篇里，Coding Agent 接到「找出登录报错的原因」后，会在几百个文件夹里翻代码。往哪儿翻？先翻完这层再下去，还是抓住一条线索钻到底？这是两种截然不同的性格——BFS（广度优先）和 DFS（深度优先）。这一课让它们各走一遍同一个迷宫，性格一眼见分晓。", tag: '交互' , navTitle: "BFS 与 DFS：Agent 在代码库里找文件"},
            { file: 'algo-9.html', title: "贪心与采样：AI 选词时的两种性格", desc: "大模型原理篇你看过 AI 逐词元续写时脑子里的候选概率条，也调过 Temperature 旋钮。当时是「体感」，这一课给它算法学的名字：每步挑最大的叫贪心，按概率掷骰子叫采样。同一个开头，两种性格各生成三次——差别一眼就能看穿。", tag: '交互' , navTitle: "贪心与采样：AI 选词时的两种性格"},
            { file: 'algo-10.html', title: "Beam Search：往前多看几步再选", desc: "上一课留了个坑：贪心每步拿眼前最大的，可能一步错、步步错。填坑的办法朴素得可爱——别急着定，多留几条候选路一起往前走，走完了比总分。这就是 Beam Search（束搜索）。下面这张「词格」，让三种走法同台竞技。", tag: '交互' , navTitle: "Beam Search：往前多看几步再选"},
          ],
        },
        {
          id: 't-algo-learn',
          routes: ['use', 'pro', 'pm', 'build'],   // 还要不要刷题、怎么用 AI 学，人人该看
          title: 'AI 时代的算法学习观',
          desc: '还要不要刷题，以及怎么用 AI 学',
          lessons: [
            { file: 'algo-11.html', title: "AI 都会做题了，还要刷 LeetCode 吗？", desc: "这是全章被问得最多的问题。答案不是简单的「要」或「不要」——不同岗位差别很大。这一课不灌鸡汤，把 2026 年的面试行情实话实说：什么岗位还在考、考到什么档位、什么岗位早就不看了。先找到你的位置。", tag: '交互' , navTitle: "AI 都会做题了，还要刷 LeetCode 吗？"},
            { file: 'algo-12.html', title: "用 AI 学算法的正确姿势", desc: "上一课说了「还值得学」，这一课解决「怎么学最快」。关键一步是把角色换过来：你出题它把关，而不是它出手你围观。三个提示词模板直接拿去用，再做 5 组对比题校准一下你的姿势。", tag: '实战' , navTitle: "用 AI 学算法的正确姿势"},
          ],
        },
        {
          id: 't-algo-summary',
          routes: ['build'],
          title: '篇章汇总',
          desc: '算法篇核心知识回顾',
          lessons: [
            { file: 'algo-summary.html', title: "汇总 · 五类算法思想对照表", desc: "十二课走完，该收网了。这一章其实只讲了五类思想，每类都在 AI 里有个真身。这一页一张大表带走全章，再用 8 道场景题测测你能不能「一眼定位」——看到问题就知道该动哪类思想。", tag: '汇总' , navTitle: "汇总 · 五类算法思想对照表"},
          ],
        },
        {
          id: 't-algo-build',
          routes: ['build'],
          title: '你现在能做什么',
          desc: '学完这章，你今天能动手做什么',
          lessons: [
            { file: 'algo-build.html', title: "给 AI 写的代码做一次复杂度体检", desc: "算法篇的收官实战：拿一段真实的 AI 代码，走一遍自报 → 优化 → 实测的完整体检流程。三档任务按投入挑一个，30 分钟起步；走到第三档，你会亲眼看到 AI 自报的复杂度有没有吹牛。", tag: '实战' , navTitle: "给 AI 写的代码做一次复杂度体检"},
          ],
        },
        {
          id: 't-algo-interview',
          routes: ['build'],
          title: '他们会这样考你',
          desc: '面试官、老板、技术同事会怎样考察本章内容',
          lessons: [
            { file: 'algo-interview.html', title: "算法 · 30 道灵魂拷问", desc: "算法篇学完了，复杂度的直觉建立了没有，一问便知。这 30 个问题来自三个真实场景，先自己开口回答，再看框架。", tag: '考察' , navTitle: "算法 · 30 道灵魂拷问"},
          ],
        },
      ],
    },
    {
      id: 'p6',
      num: '专题篇章',
      title: '解剖 Grok Build：Rust 写的生产级 Coding Agent',
      desc: '这一章要读 Rust 源码，不看不影响任何后续内容。适合想自己动手写一个 Coding Agent 的人：基于 xAI 公开的 Grok Build 源码，沿着 79 个 Workspace 成员拆解运行时、工具、记忆、安全与扩展设计。其中八个不依赖源码也成立的结论，已经提炼进工程进阶篇，那边看不过瘾再回来这里深潜。',
      color: '#f59e0b',
      group: 'indie',
      cluster: 'hardcore',
      routes: [],   // 硬核选修，只在完整目录里
      hardcore: true,
      topics: [
        {
          id: 't-grok-map',
          title: '系统地图',
          desc: '79 个 Workspace 成员的分层架构与 Rust 选型',
          lessons: [
            { file: '12-1.html', title: "79 个 Workspace 成员如何组成产品", desc: "根 Cargo.toml 列出 79 个成员，其中 crates/codegen/ 占 62 个。理解这套系统，要沿组合入口、交互界面、Agent 宿主、领域能力、推理状态五条主轴阅读。", tag: '架构' , navTitle: "79 个 Workspace 成员如何组成产品"},
            { file: '12-2.html', title: "为什么 Rust 合适：先分清事实与推断", desc: "源码能证明 Rust 2024、Tokio、强类型建模和原生二进制产物。技术选择背后的组织动机没有写入源码，本课只给出有边界的课程推断。", tag: '概念' , navTitle: "为什么 Rust 合适：先分清事实与推断"},
            { file: '12-3.html', title: "从真实 main() 到第一轮采样", desc: "实际入口位于 xai-grok-pager-bin/src/main.rs。同一个组合入口解析命令与交互模式，再把工作交给 TUI 或 Shell Agent 宿主。", tag: '深入' , navTitle: "从真实 main() 到第一轮采样"},
          ],
        },
        {
          id: 't-grok-core',
          title: 'Agent 核心循环',
          desc: 'Session Actor、Compaction 与 System Prompt',
          lessons: [
            { file: '12-4.html', title: "Session Actor：线程、状态与取消边界", desc: "每个 Session 在独立 OS 线程上运行 current-thread Tokio runtime 与 LocalSet。SessionActor 协调 turn，ChatStateActor 串行拥有对话状态，CancellationToken 负责协作式终止。", tag: '深入' , navTitle: "Session Actor：线程、状态与取消边界"},
            { file: '12-5.html', title: "Compaction：85% 阈值与可选 two-pass", desc: "默认策略在上下文使用率达到 85% 时允许自动压缩。memory flush 和 two-pass 默认均关闭，启用后才进入对应流程。", tag: '交互' , navTitle: "Compaction：85% 阈值与可选 two-pass"},
            { file: '12-6.html', title: "PromptContext：可检查的渲染输入", desc: "PromptContext 保存 Agent 专属的模板输入。它通过 Serde derive 获得序列化能力，再交给 ToolBridge::render_prompt() 完成渲染。", tag: '概念' , navTitle: "PromptContext：可检查的渲染输入"},
          ],
        },
        {
          id: 't-grok-tools',
          title: '工具系统',
          desc: '注册表、分类学与内置工具集',
          lessons: [
            { file: '12-7.html', title: "进程级外部 Toolset Preset 注册表", desc: "config.rs 允许 crate 外的扩展代码在当前进程内注册按名称解析的工具集构建函数，并用 Public 与 Internal 控制是否进入公开枚举。", tag: '架构' , navTitle: "进程级外部 Toolset Preset 注册表"},
            { file: '12-8.html', title: "ToolKind 提供默认只读语义", desc: "is_read_only() 是工具种类层的默认分类。具体工具可以覆盖它，最终是否执行还要经过规则、沙箱、Hook 与交互批准等控制。", tag: '设计模式' , navTitle: "ToolKind 提供默认只读语义"},
            { file: '12-9.html', title: "实现族、注册表与动态 MCP", desc: "xai-grok-tools 同时容纳多套内置工具实现与运行时 MCP 工具。ToolBridge 把 registry 接入会话层，SearchTool 与 UseTool 提供发现和调用入口。", tag: '深入' , navTitle: "实现族、注册表与动态 MCP"},
            { file: '12-10.html', title: "Canonical input 是稳定投影", desc: "不同 harness 可以使用不同原始参数名。Grok Build 把少量稳定语义投影到 x.ai/tool 元数据中，让展示、遥测和跨工具分析拥有共同词汇。", tag: '案例' , navTitle: "Canonical input 是稳定投影"},
          ],
        },
        {
          id: 't-grok-memory',
          title: '上下文与记忆',
          desc: 'Token 估算、混合检索与 Dream 机制',
          lessons: [
            { file: '12-11.html', title: "估算、百分比与严格阈值", desc: "xai-token-estimation 提供共享算术原语。它既有 bytes/4 的本地粗估，也有对调用方传入 used 与 total 的使用率和阈值判断。", tag: '交互' , navTitle: "估算、百分比与严格阈值"},
            { file: '12-12.html', title: "从文件变更到混合排序", desc: "查询前先同步脏文件，再结合 FTS5 BM25 与可选的 sqlite-vec KNN。合并分数经过时间衰减、来源权重与访问增益，最后可选择启用 MMR 多样性重排。", tag: '深入' , navTitle: "从文件变更到混合排序"},
            { file: '12-13.html', title: "Dream 的真实机制", desc: "Dream 会把近期 session 日志与现有 MEMORY.md 合并成长期记忆。它由会话结束、可选周期检查或手动命令进入，并受门控与最佳努力锁共同约束。", tag: '前沿' , navTitle: "Dream 的真实机制"},
          ],
        },
        {
          id: 't-grok-subagent',
          title: '子 Agent 与多 Agent',
          desc: 'Agent 定义 + Persona 叠加的两层体系',
          lessons: [
            { file: '12-14.html', title: "AgentDefinition 与 Persona 如何合并", desc: "子 Agent 先解析可执行骨架，再把 spawn 参数、role 默认值和 Persona 默认值折叠为运行时配置。两套结构在不同阶段生效，最终共同决定子会话。", tag: '设计模式' , navTitle: "AgentDefinition 与 Persona 如何合并"},
            { file: '12-15.html', title: "子 Agent 的四个隔离维度", desc: "上下文来源、身份连续性、工作目录和文件改动空间分别控制不同边界。把它们混成一个「隔离等级」，容易误读恢复和 worktree 的真实行为。", tag: '深入' , navTitle: "子 Agent 的四个隔离维度"},
            { file: '12-16.html', title: "多 Agent 的组织方式", desc: "多 Agent 系统要同时解决角色定义、spawn、状态查询、取消、完成通知与资源继承。Grok Build 的源码把这些职责落在定义层与协调事件层。", tag: '案例' , navTitle: "多 Agent 的组织方式"},
          ],
        },
        {
          id: 't-grok-security',
          title: '权限、沙箱与安全',
          desc: '内核级沙箱、权限演进与 Hooks 拦截',
          lessons: [
            { file: '12-17.html', title: "五种沙箱 Profile", desc: "workspace、devbox、read-only、strict、off 定义文件系统和子进程网络的不同能力集合。名称提供方向，真实边界要看解析后的 capability set。", tag: '安全' },
            { file: '12-18.html', title: "从工具请求到受限执行：完整授权链", desc: "一次工具调用先被解析成具体访问意图，再经过 plan gate、hooks、策略规则、会话授权、Auto 模式和用户确认。允许执行后，沙箱继续约束操作系统能力。", tag: '安全' , navTitle: "从工具请求到受限执行：完整授权链"},
            { file: '12-19.html', title: "Hooks：明确 deny 才阻断", desc: "Grok Build 源码课第 19 节：Hooks 事件、matcher、阻断语义与 fail-open 边界", tag: '实战' , navTitle: "Hooks：明确 deny 才阻断"},
          ],
        },
        {
          id: 't-grok-eco',
          title: 'MCP 与生态',
          desc: 'MCP 客户端、OAuth、连接恢复与插件信任',
          lessons: [
            { file: '12-20.html', title: "MCP：连接只是起点", desc: "Grok Build 源码课第 20 节：MCP 客户端、OAuth、工具可见性与连接恢复", tag: '深入' , navTitle: "MCP：连接只是起点"},
            { file: '12-21.html', title: "Marketplace：发现、安装、执行分层", desc: "Grok Build 源码课第 21 节：Plugin Marketplace、插件发现与信任边界", tag: '架构' , navTitle: "Marketplace：发现、安装、执行分层"},
          ],
        },
        {
          id: 't-grok-beyond',
          title: '超越源码',
          desc: '完整对照、经验教训与设计启示',
          lessons: [
            { file: '12-22.html', title: "完整对照：先校准证据，再谈取舍", desc: "Grok Build 与 Claude Code 完整对照：源码证据与公开产品行为分层比较", tag: '汇总' , navTitle: "完整对照：先校准证据，再谈取舍"},
            { file: '12-23.html', title: "工程复盘：能力与边界一起读", desc: "Grok Build 源码课第 23 节：基于源码与 README 的工程复盘和适用边界", tag: '收官' , navTitle: "工程复盘：能力与边界一起读"},
            { file: '12-24.html', title: "Coding Agent 设计工作台", desc: "Coding Agent 设计工作台：九个系统维度与可提交结课成果", tag: '收官' , navTitle: "Coding Agent 设计工作台"},
          ],
        },
        {
          id: 't-interview6',
          title: '他们会这样考你',
          desc: '面试官、老板、技术同事会怎样考察本章内容',
          lessons: [
            { file: 'interview-6.html', title: "解剖 Grok Build · 30 道灵魂拷问", desc: "协作方法论篇拆的是真实源码，这章的问题也最硬核。你说自己懂 Coding Agent，这 30 个问题就是照妖镜，先自己开口回答，再看框架。", tag: '考察' , navTitle: "解剖 Grok Build · 30 道灵魂拷问"},
          ],
        },
      ],
    },
    {
      id: 'p-dsh',
      num: '专题篇章',
      title: '解剖 DeepSeek Harness：一切皆插件的 Agent 底座',
      desc: '这一章要读 TypeScript 源码，不看不影响任何后续内容。DeepSeek 在 2026 年开源的 Agent Harness 把模型、工具、会话、沙箱、UI 全部做成可替换的 Cordis 插件，还立了一条运行时不变量：模型看到的一切必须能从会话日志逐字重建。本章沿源码拆解它的插件内核、Turn/Step 循环、双队列 Inbox、Compaction 双路径与 Code Mode 沙箱，并逐课与 Claude Code、Grok Build 做证据化对照。',
      color: '#4d6bfe',
      group: 'indie',
      cluster: 'hardcore',
      routes: [],   // 硬核选修，只在完整目录里
      hardcore: true,
      topics: [
        {
          id: 't-dsh-map',
          title: '系统地图',
          desc: 'Cordis 插件内核与配置三层结构',
          lessons: [
            { file: 'dsh-1.html', title: "一切皆插件：官宣与源码对照", desc: "发布文里说的四种模式、插件生态，在 deepseek-harness 仓库里对应哪个文件？本课一条条对上。", tag: '架构' , navTitle: "一切皆插件：官宣与源码对照" },
            { file: 'dsh-6.html', title: "Profile / Bundle / Patch：用户能把产品改到什么程度", desc: "不改源码也能换掉深层能力：配置由四层 patch 对着空数组叠出来，晚应用的赢，命中同一条就整条替换。", tag: '架构' , navTitle: "Profile / Bundle / Patch：用户能把产品改到什么程度" },
          ],
        },
        {
          id: 't-dsh-loop',
          title: '会话与循环',
          desc: '日志不变量、双队列 Inbox、取消恢复与 Goal',
          lessons: [
            { file: 'dsh-2.html', title: "Model-visible ⟺ logged：一条会崩给你看的不变量", desc: "模型看到的一切都要能从日志重建，发请求前还要现场验一遍，验不过直接崩。", tag: '深入' , navTitle: "Model-visible ⟺ logged：一条会崩给你看的不变量" },
            { file: 'dsh-3.html', title: "followup / steer / inject：双队列 Inbox", desc: "Agent 正在干活时你想说句话，消息该排哪条队、什么时候被处理。三个 API 共用一个 send()，只差两个参数。", tag: '交互' , navTitle: "followup / steer / inject：双队列 Inbox" },
            { file: 'dsh-7.html', title: "Esc 之后发生了什么：取消、崩溃恢复与重入", desc: "每轮一个取消信号，中断也要把账记平，kill -9 之后重启还能接着跑，已落盘的劳动成果一条不丢。", tag: '深入' , navTitle: "Esc 之后发生了什么：取消、崩溃恢复与重入" },
            { file: 'dsh-8.html', title: "Goal：消息溯源即权限", desc: "长期目标谁有权改，鉴权不读消息正文，只认宿主盖在事件元数据上的来源章。本课讲这个设计背后的两层思路。", tag: '设计模式' , navTitle: "Goal：消息溯源即权限" },
          ],
        },
        {
          id: 't-dsh-context',
          title: '上下文工程',
          desc: 'Compaction 双路径、计量、Spill 与检索',
          lessons: [
            { file: 'dsh-4.html', title: "Compaction 双路径与 replaceGeneration", desc: "上下文快满了就主动收拾，真撑爆了就先收拾再重试。重试前先对一遍世代号，收拾没起效就不许重试。", tag: '深入' , navTitle: "Compaction 双路径与 replaceGeneration" },
            { file: 'dsh-9.html', title: "Token 计量：决策用重放，展示用投影", desc: "两套计量各干各的，压缩决策从不信 UI 上那个数。核心源码：packages/llm/token-meter/src/usage-projection.ts。", tag: '概念' , navTitle: "Token 计量：决策用重放，展示用投影" },
            { file: 'dsh-10.html', title: "Spill：工具输出太大怎么办", desc: "超限输出落盘存档，给模型留一张取回凭证。核心源码：packages/spill/spill-policy/src/index.ts。", tag: '实战' , navTitle: "Spill：工具输出太大怎么办" },
            { file: 'dsh-11.html', title: "会话检索与跨会话引用", desc: "旧会话是可检索的资料库，引用还能带出处。核心源码：packages/session-query/ 与 packages/context/session-reference/。", tag: '深入' , navTitle: "会话检索与跨会话引用" },
          ],
        },
        {
          id: 't-dsh-tools',
          title: '工具系统',
          desc: '三段瀑布、输出契约、文件编辑与独有工具面',
          lessons: [
            { file: 'dsh-12.html', title: "工具执行流水线：三段瀑布与单调 Guard", desc: "pre-execute 到 post-execute 的三段管线，Guard 只能收紧不能放行。核心源码：packages/core/tools/src/index.ts。", tag: '架构' , navTitle: "工具执行流水线：三段瀑布与单调 Guard" },
            { file: 'dsh-13.html', title: "工具输出契约：值与展示分离", desc: "同一个结果，模型看的和人看的可以不一样。核心源码：packages/core/tools/src/index.ts 与 presentation.ts。", tag: '设计模式' , navTitle: "工具输出契约：值与展示分离" },
            { file: 'dsh-14.html', title: "文件编辑的工程学：先读后写", desc: "read / edit / write 三件套，没读过的文件不许改。核心源码：packages/fs/fs-observation-policy/src/index.ts。", tag: '实战' , navTitle: "文件编辑的工程学：先读后写" },
            { file: 'dsh-17.html', title: "DSH 独有的工具面：terminal / lsp / jobs", desc: "别家没有的几个工具各解决什么问题。核心源码：packages/terminal/、packages/lsp/ 与 packages/jobs/，工具描述全文见 docs/tool-catalog.zh.md。", tag: '案例' , navTitle: "DSH 独有的工具面：terminal / lsp / jobs" },
          ],
        },
        {
          id: 't-dsh-security',
          title: '审批与沙箱',
          desc: '两个独立旋钮与可整体替换的执行世界',
          lessons: [
            { file: 'dsh-15.html', title: "审批与权限：两个旋钮，一个下拉框", desc: "沙箱模式和审批策略是两个独立旋钮，预设只是常用组合。核心源码：packages/interaction/user-approval 与 packages/interaction/permission-presets。", tag: '安全' , navTitle: "审批与权限：两个旋钮，一个下拉框" },
            { file: 'dsh-16.html', title: "沙箱：从 seatbelt 到执行世界", desc: "ctx.fs 和 ctx.subprocess 同享一个路径命名空间，执行环境可以整体换掉。核心源码：packages/sandbox/、packages/e2b/ 与 native/landlock-run/。", tag: '安全' , navTitle: "沙箱：从 seatbelt 到执行世界" },
          ],
        },
        {
          id: 't-dsh-code',
          title: '代码模式',
          desc: '让模型写程序来编排工具调用',
          lessons: [
            { file: 'dsh-5.html', title: "Code Mode：一段代码顶多轮工具调用", desc: "模型写一段小程序，run_code 把它送进 worker 沙箱，五次工具调用一轮搞定。本课讲这个设计背后的两个思路。", tag: '前沿' , navTitle: "Code Mode：一段代码顶多轮工具调用" },
          ],
        },
        {
          id: 't-dsh-orch',
          title: '编排与子 Agent',
          desc: 'Subagent 接缝与四种编排原语',
          lessons: [
            { file: 'dsh-18.html', title: "Subagent 是一个 seam：从进程内到委派 Claude Code", desc: "子 Agent 是能力接缝，进程内、远程、别家产品都能接。核心源码：packages/subagent/。", tag: '架构' , navTitle: "Subagent 是一个 seam：从进程内到委派 Claude Code" },
            { file: 'dsh-19.html', title: "workflow / schedule / plan / todo：编排原语的取舍", desc: "四种编排原语各管什么，为什么没做成一个大而全。核心文档：docs/subsystems/workflow.zh.md 等四篇。", tag: '概念' , navTitle: "workflow / schedule / plan / todo：编排原语的取舍" },
            { file: 'dsh-20.html', title: "Skill、Preset 与自我修改", desc: "cordis_define 让 Agent 在运行时改写自己的运行时。核心目录：packages/extensions/tool-cordis/ 与 apps/cli/config/agent-presets/。", tag: '前沿' , navTitle: "Skill、Preset 与自我修改" },
          ],
        },
        {
          id: 't-dsh-integration',
          title: '模型与外部接入',
          desc: 'LLM 适配层、MCP 与测试基础设施',
          lessons: [
            { file: 'dsh-21.html', title: "MCP 与 Extensions：外部工具接入的两条路", desc: "桥接生态标准与原生扩展怎么分工。核心源码：packages/mcp/mcp-client/ 与 packages/extensions/。", tag: '深入' , navTitle: "MCP 与 Extensions：外部工具接入的两条路" },
            { file: 'dsh-22.html', title: "LLM 适配层：单次尝试、显式重试、双流持久", desc: "推理流与正文流分开存，重试是显式事件。核心源码：packages/llm/llm/src/assembler.ts 与 packages/core/agent-loop/src/agent.ts。", tag: '深入' , navTitle: "LLM 适配层：单次尝试、显式重试、双流持久" },
            { file: 'dsh-26.html', title: "测试一个非确定性系统", desc: "确定性回放、性质测试、专门骗 LLM 客户端的故障服务器。核心材料：docs/testing.zh.md 与 packages/test-support/。", tag: '实战' , navTitle: "测试一个非确定性系统" },
          ],
        },
        {
          id: 't-dsh-persist',
          title: '持久化与基建',
          desc: '日志治理、凭据存储与多入口内核',
          lessons: [
            { file: 'dsh-23.html', title: "持久化治理：版本、fork 边界与拒绝解读", desc: "日志格式怎么演进，分叉边界怎么定，读不懂的数据宁可拒绝。", tag: '架构' , navTitle: "持久化治理：版本、fork 边界与拒绝解读" },
            { file: 'dsh-24.html', title: "凭据、设置、存储与遥测", desc: "不起眼但全是坑：凭据每次现取、配置不落盘。", tag: '实战' , navTitle: "凭据、设置、存储与遥测" },
            { file: 'dsh-25.html', title: "多入口与 Typert：一个内核，五张面孔", desc: "Web、headless、ACP、SDK、HTTP 共享同一个内核。", tag: '架构' , navTitle: "多入口与 Typert：一个内核，五张面孔" },
          ],
        },
        {
          id: 't-dsh-method',
          title: '工程方法论',
          desc: '用 AI 开发 AI 的规训体系',
          lessons: [
            { file: 'dsh-27.html', title: "Agent Notes 与 AGENTS.md：用 AI 开发 AI 的规训", desc: "四状态设计笔记和给 AI 看的编码规范，团队立刻能抄。", tag: '汇总' , navTitle: "Agent Notes 与 AGENTS.md：用 AI 开发 AI 的规训" },
            { file: 'dsh-28.html', title: "KV Cache 是接口", desc: "prompt 前缀稳定性当成兼容性承诺来维护。", tag: '前沿' , navTitle: "KV Cache 是接口" },
          ],
        },
        {
          id: 't-dsh-final',
          title: '超越源码',
          desc: '五种工程观与最小可抄清单',
          lessons: [
            { file: 'dsh-29.html', title: "终章：五种工程观，我们该抄什么", desc: "五家 harness 设计哲学总表，附最小可抄清单和体量陷阱清单。", tag: '收官' , navTitle: "终章：五种工程观，我们该抄什么" },
          ],
        },
      ],
    },
    {
      id: 'p-codex',
      num: '专题篇章',
      title: '解剖 OpenAI Codex：把安全观写进类型系统',
      desc: '这一章要读 Rust 源码，不看不影响任何后续内容。Codex 面对的问题和别家一样：模型要读文件、跑命令、改代码，而这些动作没有人逐条审过。它的答案是把约束尽量往前推，能让编译器管的交给类型，类型管不了的写进 code review，运行时管不了的交给沙箱和审批。本章沿源码拆解上下文注入的类型系统、Windows 上的三道关卡、自带测试用例的命令策略、用模型审批模型的 Guardian，以及给模型专门设计的 diff 与代码模式，逐课与 DeepSeek Harness、Claude Code 做证据化对照。',
      color: '#414b5a',
      group: 'indie',
      cluster: 'hardcore',
      routes: [],   // 硬核选修，只在完整目录里
      hardcore: true,
      topics: [
        {
          id: 't-codex-loop',
          title: '治理与循环',
          desc: '一轮对话在内部转几圈，谁有资格喊停',
          lessons: [
            { file: 'codex-01.html', title: "新功能先找落脚的 crate，core 是最后一档", desc: "打开仓库，第一反应是往 core 里加。仓库把这件事写成禁令：先找现有的非 core crate，否则新建一个。依赖方向会把叶子类型挡在核心之外。", tag: '工程', navTitle: "新功能先找落脚的 crate，core 是最后一档" },
            { file: 'codex-02.html', title: "三层 Turn Loop：谁有资格决定继续", desc: "你看到的是一轮对话。内部叠了任务壳、轮次、采样三层循环。各层只回答自己那一个问题，控制权每次只在一层。", tag: '架构', navTitle: "三层 Turn Loop：谁有资格决定继续" },
            { file: 'codex-03.html', title: "流还在走，工具已经开工", desc: "模型还在打字，读文件的声音已经响了。采样循环的时序是：流内建 future，流后统一 drain。先 persist，再等结果。", tag: '架构', navTitle: "流还在走，工具已经开工" },
            { file: 'codex-04.html', title: "中途插话：这句话进本轮、下一轮，还是被拒", desc: "Agent 正在改第三个文件，你看见方向偏了，补了一句：配置用 YAML。回车之后，这句话是开工、插进当前轮，还是当场被拒，Core 当场拍板，不等模型开口。", tag: '架构', navTitle: "中途插话：这句话进本轮、下一轮，还是被拒" },
            { file: 'codex-05.html', title: "按下取消之后，各层怎么收手", desc: "工具失败回给模型，用户按 Esc 才停 turn。取消令牌从任务传到采样再传到工具。已完成的结果留在历史里，100 毫秒之后的硬拆不可逆。", tag: '架构', navTitle: "按下取消之后，各层怎么收手" },
          ],
        },
        {
          id: 't-codex-context',
          title: '上下文',
          desc: '往模型上下文里塞东西，谁来管',
          lessons: [
            { file: 'codex-06.html', title: "往模型上下文里塞东西，先给它造一个类型", desc: "批准前缀、工作区、AGENTS.md、被中断的 turn，全是告诉模型一件它自己看不到的事实。Codex 先给每一种注入造一个类型，类型自己知道 role、marker 和 body。", tag: '上下文', navTitle: "往模型上下文里塞东西，先给它造一个类型" },
            { file: 'codex-07.html', title: "把上下文治理写进 code review", desc: "上一章把往上下文里塞东西收成类型。类型过了，这段文字仍然可以合法地又长、又勤、又无界。挡这些后果的，是仓库根十行禁令，外加一份会把同一节再读一遍的评审 skill。", tag: '工程', navTitle: "把上下文治理写进 code review" },
            { file: 'codex-08.html', title: "满窗之后，砍哪一段留哪一段", desc: "三个时机共用一个分发器，三种实现由开关选中。同一份摘要在中途必须停在历史最后一项。", tag: '上下文', navTitle: "满窗之后，砍哪一段留哪一段" },
            { file: 'codex-09.html', title: "JSONL 是真相，SQLite 是镜像", desc: "昨天关了终端，今天列表还在，对话也能接着改。这两件事看起来像同一份存储，落盘时却走两条轨。上轨按行追加，下轨只抄封面。中途拔电之后，能捡回来的永远是已经过了闸门的那几行。", tag: '存储', navTitle: "JSONL 是真相，SQLite 是镜像" },
          ],
        },
        {
          id: 't-codex-tools',
          title: '工具',
          desc: '模型能调什么，怎么并发，从哪个门出去',
          lessons: [
            { file: 'codex-10.html', title: "模型看见的工具清单，是一次采样算出来的", desc: "同一段对话、同一份配置，下一轮采样却可能多出 MCP 名字、协作入口或 tool_search。变的是这一次允许广告哪些 handler。", tag: '工具', navTitle: "模型看见的工具清单，是一次采样算出来的" },
            { file: 'codex-11.html', title: "对模型说随便并行，底下用锁管住", desc: "模型看见的、实际执行的、历史记录的，是三套顺序。一面旗允许一次发多个调用，一把读写锁决定谁能叠着进。", tag: '工具', navTitle: "对模型说随便并行，底下用锁管住" },
            { file: 'codex-12.html', title: "统一入口：一条命令按特征分叉", desc: "模型只看见 exec_command 和 write_stdin。进门之后，tty、远程环境和 150 毫秒窗口会把同一条命令送到 PTY、pipe、exec-server，或者送进重试门。", tag: '执行', navTitle: "统一入口：一条命令按特征分叉" },
          ],
        },
        {
          id: 't-codex-sandbox',
          title: '沙箱',
          desc: '命令跑起来之前，拦在哪几道关',
          lessons: [
            { file: 'codex-13.html', title: "沙箱管理器：把权限档案编译成一行命令", desc: "工作区可写，网络收紧。同一条 git status，Mac 套上 sandbox-exec，Linux 套上 helper，Windows 可能原样出门。差别出在编译器。", tag: '沙箱', navTitle: "沙箱管理器：把权限档案编译成一行命令" },
            { file: 'codex-14.html', title: "macOS：把安全策略拼成一个字符串", desc: "Seatbelt 吃的是一段文本。文本由静态基线加现拼的读写网段组成。路径不进这段文本，走旁边的参数表。", tag: '沙箱', navTitle: "macOS：把安全策略拼成一个字符串" },
            { file: 'codex-15.html', title: "Linux：先建视图，再上 seccomp，最后 exec", desc: "同一条读取，Mac 上回 Operation not permitted，Linux 上回 No such file or directory。差别在于 Linux 先换进程能看见的文件树，再收紧它能调用的系统接口。", tag: '沙箱', navTitle: "Linux：先建视图，再上 seccomp，最后 exec" },
            { file: 'codex-16.html', title: "Windows：受限令牌、防火墙过滤器与两个专用系统用户", desc: "没有 seatbelt，也没有 bubblewrap。Windows 上的沙箱是三道关卡叠起来的：令牌管写，专用账户管你是谁，WFP 按这个身份滤网。AppContainer 对不上这份权限模型，整套还默认关着。", tag: '沙箱', navTitle: "Windows：受限令牌、防火墙过滤器与两个专用系统用户" },
            { file: 'codex-17.html', title: "execpolicy：让策略文件自带测试用例", desc: "白名单写错，通常要等线上才知道。Codex 把正反例写进规则本身，加载时就地跑一遍。规则和例子打架，这份策略进不了会话。", tag: '策略', navTitle: "execpolicy：让策略文件自带测试用例" },
          ],
        },
        {
          id: 't-codex-approval',
          title: '审批与网络',
          desc: '拦不住的交给人，或者交给另一个模型',
          lessons: [
            { file: 'codex-18.html', title: "审批策略：同一条命令，问不问看哪两颗旋钮", desc: "默认问不问跟沙箱种类绑在一起。问过一次之后，记住的是完整命令，还是一段前缀。", tag: '审批', navTitle: "审批策略：同一条命令，问不问看哪两颗旋钮" },
            { file: 'codex-19.html', title: "Guardian：让一个模型去审批另一个模型", desc: "审批弹窗多到人开始无脑点同意时，Codex 把决定权交给一次锁死的审查会话。超时、坏 JSON、连续拒绝，各有各的收场。", tag: '审批', navTitle: "Guardian：让一个模型去审批另一个模型" },
            { file: 'codex-20.html', title: "网络与凭据代理：模型看不见的那把钥匙", desc: "出站要过几道门。真 token 不进子进程。模型看见的是假值和一句 403。", tag: '网络', navTitle: "网络与凭据代理：模型看不见的那把钥匙" },
          ],
        },
        {
          id: 't-codex-modelapi',
          title: '给模型设计的接口',
          desc: '让模型好用的格式，和跑不完时的收场',
          lessons: [
            { file: 'codex-21.html', title: "apply-patch，给模型设计一种 diff", desc: "模型填一份没有行号的补丁，人看的是事后算出来的 unified diff。同一处修改，两套格式各自会在哪一步翻车。", tag: '工具', navTitle: "apply-patch，给模型设计一种 diff" },
            { file: 'codex-22.html', title: "exec 与 wait：跑不完的程序怎么收场", desc: "与其让模型发二十次工具调用，不如让它写一段 JavaScript。这段程序在哪跑、能干什么、十秒跑不完又怎么办，本课讲这三个问题背后的两个思路。", tag: '代码模式', navTitle: "exec 与 wait：跑不完的程序怎么收场" },
            { file: 'codex-23.html', title: "宿主拆分：程序挂在谁身上", desc: "上一课讲 exec 和 wait 的语义。这一课问另一件事：这段 JavaScript 到底挂在谁身上，挂点换了之后，故障域和状态归属怎么变。", tag: '代码模式', navTitle: "宿主拆分：程序挂在谁身上" },
          ],
        },
        {
          id: 't-codex-extend',
          title: '扩展',
          desc: '把别人的能力接进来，把自己的能力派出去',
          lessons: [
            { file: 'codex-24.html', title: "多 Agent 是一张要持久化的图", desc: "派出去的是节点，边一出生就是 Open。信先入队，followup 才叫醒。关掉的是边，历史还在。", tag: '多 Agent', navTitle: "多 Agent 是一张要持久化的图" },
            { file: 'codex-25.html', title: "挂钩点能改什么，由事件合同决定", desc: "一次 turn 会经过十一个挂钩。协议认四种处理器，运行表只装命令和 MCP。超时默认放行，拆卸期丢掉 stdout。", tag: '扩展', navTitle: "挂钩点能改什么，由事件合同决定" },
            { file: 'codex-26.html', title: "MCP 接进来：模型看见翻译过的名字", desc: "外部 server 的工具要先过一层翻译才进模型眼睛。skill 目录常在，缺 MCP 时另问人。", tag: '扩展', navTitle: "MCP 接进来：模型看见翻译过的名字" },
            { file: 'codex-27.html', title: "搬家只搬对得上的字段", desc: "换到 Codex 的第一周，最怕去年攒的 hook、MCP 和插件还在不在。检测会列出一份清单。导入只收下能映射的那一部分。", tag: '扩展', navTitle: "搬家只搬对得上的字段" },
          ],
        },
        {
          id: 't-codex-protocol',
          title: '协议与界面',
          desc: '内核和外壳之间说什么话，终端上怎么显示',
          lessons: [
            { file: 'codex-28.html', title: "SQ 进、EQ 出：同一件事两副面孔", desc: "命令走进程内的 Submission Queue。事件走能写成 JSON 的 Event Queue。Rust 名叫 TurnStarted，磁盘上仍写 task_started。", tag: '协议', navTitle: "SQ 进、EQ 出：同一件事两副面孔" },
            { file: 'codex-29.html', title: "对外协议是投影", desc: "IDE 看见的是 Thread / Turn / Item，不是内核 EventMsg。一次 turn/start 先回响应，再推事件流；审批是反向请求，不回包这一轮就停住。", tag: '协议', navTitle: "对外协议是投影" },
            { file: 'codex-30.html', title: "流式输出怎么在终端两区之间定稿", desc: "模型按 token 往外推，终端却是一个写出去就改不了的字符网格。已经不会变的行交给 scrollback，还可能变的尾巴留在活动 cell，表格没闭合之前整段扣住。", tag: '界面', navTitle: "流式输出怎么在终端两区之间定稿" },
          ],
        },
        {
          id: 't-codex-closing',
          title: '收束',
          desc: '把架构写成检查项，再回看两套安全观',
          lessons: [
            { file: 'codex-31.html', title: "把架构决策写成 lint", desc: "同一份 AGENTS.md 里，有命令的规则会在三台操作系统上亮红。只有路径的那条，重命名之后没人发现。", tag: '工程', navTitle: "把架构决策写成 lint" },
            { file: 'codex-32.html', title: "两种安全视角：同一条命令，两套判词", desc: "出事之前有没有门可以拒绝，出事之后能不能复原模型当时看见的世界。同一条危险命令上，这两套视角会一致，也会给出相反结论。", tag: '安全', navTitle: "两种安全视角：同一条命令，两套判词" },
          ],
        },
      ],
    },
    {
      id: 'p-oss',
      num: '专题篇章',
      title: '开源、蒸馏与本地部署',
      desc: '新闻里天天说某某模型开源了，开源的到底是什么？这一章从权重讲起，教你自己看懂一张许可证，搞清楚各家开源背后的商业算盘。再往下是模型如何从大变小：涌现、蒸馏，以及蒸馏带来的同质化代价。最后动手，算清楚自己的电脑能跑多大的模型，用 Ollama 或 LM Studio 真正跑起来。',
      color: '#4f46e5',
      group: 'indie',
      cluster: 'hardcore',
      routes: [],   // 硬核选修，只在完整目录里
      topics: [
        {
          id: 't-oss-what',
          title: '开源到底开的是什么',
          desc: '权重、许可证与各家的商业算盘',
          lessons: [
            { file: 'oss-1.html', title: "权重是什么？一个模型的全部本事", desc: "新闻里天天说「某某模型开源了」。开源的到底是什么东西？是代码吗？其实主要是一个文件：权重。搞清楚它是什么，后面所有关于开源的争论你都能自己判断。", tag: '概念' , navTitle: "权重是什么？一个模型的全部本事"},
            { file: 'oss-2.html', title: "真开源 vs 假开源：怎么看懂一张许可证", desc: "几乎每家都说自己「开源」，但这个词在各家嘴里的含义差得很远。有的能随便商用，有的用户量一大就要另外签合同，有的只是发了篇论文。学会自己判断，比记住谁家开源更有用。", tag: '选型' , navTitle: "真开源 vs 假开源：怎么看懂一张许可证"},
            { file: 'oss-3.html', title: "开源是一门生意：各家在图什么", desc: "训练一个旗舰模型要烧掉巨额算力，权重一旦放出去就收不回来。既然如此，为什么还有这么多公司选择开源？答案跟慈善无关。看懂各家的算盘，你的选型判断会稳很多。", tag: '案例' , navTitle: "开源是一门生意：各家在图什么"},
          ],
        },
        {
          id: 't-oss-small',
          title: '大模型如何变小',
          desc: '涌现、蒸馏，以及必须付出的代价',
          lessons: [
            { file: 'oss-4.html', title: "涌现：能力为什么会突然出现", desc: "模型越大越强，这句话听起来很自然。真实情况要复杂一点。有些能力在模型小的时候接近零分，参数量跨过某个量级之后，短时间内就有了。这个现象叫涌现，它也是后面几节所有矛盾的起点。", tag: '概念' , navTitle: "涌现：能力为什么会突然出现"},
            { file: 'oss-5.html', title: "为什么要把模型做小：蒸馏的动机", desc: "上一节刚讲完，模型越大，能力越容易涌现。那为什么整个行业还在拼命把模型做小？因为能力不是唯一的约束条件。成本、延迟、数据能不能出门，这三件事会在真实项目里直接把旗舰模型挡在门外。", tag: '方法论' },
            { file: 'oss-6.html', title: "蒸馏是怎么做的：从老师到学生", desc: "上一节讲了为什么要把模型做小。这一节看具体怎么做。整个过程比想象中朴素：让老师去答题，把答题过程记下来，拿这批材料去训练学生。难点不在流程，在细节。", tag: '案例' , navTitle: "蒸馏是怎么做的：从老师到学生"},
            { file: 'oss-7.html', title: "蒸馏的代价：模型正在变得越来越像", desc: "上一节说蒸馏是让学生学老师。问题在于，学生学到的是老师的全部：本事、口癖、偏见、甚至对自己身份的认知。当整个行业都在向少数几个老师学习，结果就是大家越来越像。", tag: '深入' , navTitle: "蒸馏的代价：模型正在变得越来越像"},
          ],
        },
        {
          id: 't-oss-local',
          title: '在自己的机器上跑起来',
          desc: '算清楚，再装上',
          lessons: [
            { file: 'oss-8.html', title: "你的电脑能跑多大的模型", desc: "前面讲的都是概念，这一节动手。选一下你的显卡或者 Mac 型号，直接看结论。看完你会发现，本地跑模型的门槛比大多数人想的低。", tag: '交互' },
            { file: 'oss-9.html', title: "Ollama 与 LM Studio 怎么上手", desc: "上一节算出了你能跑什么，这一节把它装起来。两个工具，一个命令行一个图形界面，第一次用十分钟能跑通。", tag: '实战' , navTitle: "Ollama 与 LM Studio 怎么上手"},
          ],
        },
      ],
    },
    {
      id: 'p-exam',
      num: '自测中心',
      title: '七套篇章自测 · 350 道题',
      desc: "按篇章进行练习、自测和综合复习，结合解析核对理解。最近的练习成绩保存在当前浏览器，尚未接入公司账号、个人中心或云端薄弱点分析。",
      color: '#7c3aed',
      group: 'extra',
      routes: ['pm', 'build'],
      exam: true,
      topics: [
        {
          id: 't-exam-entry',
          title: '怎么用这七套卷',
          desc: '两种模式的区别与使用建议',
          lessons: [
            { file: 'exam.html', title: "七套篇章自测 · 350 道题", desc: "六个正课篇章各一套卷子，Grok Build 专题另有一套，每套 50 道题，全部依据对应内容编写。学完一章就来考一次，比反复重读有用得多。全部考完了，最后还有一份跨全站的综合考。", tag: '交互' , navTitle: "七套篇章自测 · 350 道题"},
          ],
        },
        {
          id: 't-exam-base',
          title: '基础与 Harness',
          desc: '第一、二篇章的自测卷',
          lessons: [
            { file: 'exam-1.html', title: "大模型基础 · 篇章自测", desc: "学完大模型原理篇来验证一下。50 题全部出自本章课程：训练三阶段、Token 与上下文、幻觉的四种类型、四种缓解策略的选择。", tag: '交互' , navTitle: "大模型基础 · 篇章自测"},
            { file: 'exam-2.html', title: "AI Harness · 篇章自测", desc: "学完Harness 核心篇来验证一下。50 题全部出自本章课程：上下文窗口、Prompt 工程、注入防御、工具调用、KV Cache 与成本优化。", tag: '交互' , navTitle: "AI Harness · 篇章自测"},
          ],
        },
        {
          id: 't-exam-build',
          title: '实战与工程设计',
          desc: '第三、四篇章的自测卷',
          lessons: [
            { file: 'exam-3.html', title: "实战 · 从 Demo 到产品 · 篇章自测", desc: "学完动手实战篇来验证一下。50 题全部出自本章课程：生图产品化、Agent 卡死与防呆、上下文压缩、长期记忆、多 Agent 与 MCP。", tag: '交互' , navTitle: "实战 · 从 Demo 到产品 · 篇章自测"},
            { file: 'exam-4.html', title: "AI 工程设计模式 · 篇章自测", desc: "学完工程进阶篇来验证一下。50 题全部出自本章课程：Workflow vs Agent、上下文工程、ACI 工具设计、评测方法论、沙箱与凭证隔离。", tag: '交互' , navTitle: "AI 工程设计模式 · 篇章自测"},
          ],
        },
        {
          id: 't-exam-deep',
          title: '前沿、方法论与源码专题',
          desc: '第五、协作方法论篇与 Grok 专题的自测卷',
          lessons: [
            { file: 'exam-5.html', title: "Harness 与自我改进 · 篇章自测", desc: "学完自我改进篇来验证一下。50 题全部出自本章课程：Harness 设计模式、上下文自动进化、递归自我改进的机制与七道关。", tag: '交互' , navTitle: "Harness 与自我改进 · 篇章自测"},
            { file: 'exam-7.html', title: "Vibe Coding 方法论 · 篇章自测", desc: "学完第七篇章来验证一下。50 题全部出自本章课程：流程控制、质量底线、拒绝分期、文档沉淀、环境与安全闸门。", tag: '交互' , navTitle: "Vibe Coding 方法论 · 篇章自测"},
            { file: 'exam-6.html', title: "解剖 Grok Build · 篇章自测", desc: "学完协作方法论篇来验证一下。50 题全部出自本章课程：运行时循环、Compaction、工具系统、记忆检索、沙箱安全与 MCP 集成。", tag: '交互' , navTitle: "解剖 Grok Build · 篇章自测"},
          ],
        },
        {
          id: 't-exam-all',
          title: '学完整门课再来',
          desc: '跨全站的综合验收',
          lessons: [
            { file: 'exam-all.html', title: "全站综合考 · 七章抽 35 题", desc: "篇章卷检验单章掌握，这份卷子检验的是另一件事：跨章节的概念会不会混。上下文压缩和长期记忆的边界在哪、Workflow 和 Agent 该怎么选、Harness 和提示词工程是什么关系，这些只有把七章放在一起考才暴露得出来。学完整门课再来。", tag: '交互' , navTitle: "全站综合考 · 七章抽 35 题"},
          ],
        },
      ],
    },
    {
      id: 'p9',
      num: '课后甜点',
      title: '一人公司 OPC',
      desc: 'AI 让一个人就能做出产品，也让能被抢走的东西变多了。这一章讲确权与合规：商标、软著、专利、域名、备案、注册资本、股权。每一节都有法条出处和真实案例，做早了是投入，做晚了是损失。本地版可直接学习，进度仅保存在当前浏览器。',
      color: '#b45309',
      group: 'extra',
      routes: ['use', 'pro', 'pm', 'build'],
      bonus: true,
      topics: [
        {
          id: 't-opc-basics',
          routes: ['use', 'pro', 'pm', 'build'],
          title: '确权的地基',
          desc: '给每样资产配对的那把锁',
          lessons: [
            { file: 'opc-1.html', title: "六种武器：给每样资产配对的锁", desc: "你写的代码、起的名字、想出来的算法、发出去的文章，在法律上是完全不同的东西，各有各的锁。拿错锁等于没锁。这一节把六种武器一次认全，后面每一节都会回来用它。", tag: '开篇' , navTitle: "六种武器：给每样资产配对的锁"},
            { file: 'opc-2.html', title: "确权要趁早：做早了是投入，做晚了是损失", desc: "上一节认全了六种武器，这一节讲什么时候动手。答案很短：越早越好。因为确权这件事有个残酷的特点，同一个动作，早做是几百块的投入，晚做是几万块加一两年时间的损失。", tag: '交互' , navTitle: "确权要趁早：做早了是投入，做晚了是损失"},
          ],
        },
        {
          id: 't-opc-tm',
          routes: ['use', 'pro', 'pm', 'build'],
          title: '商标与域名',
          desc: '品牌的户籍和入口',
          lessons: [
            { file: 'opc-3.html', title: "商标一个不够：35、42、41 一起拿", desc: "商标按商品和服务分成 45 个类别，注册哪一类就只在那一类受保护。很多人注册了一个类就觉得万事大吉，结果推广的时候发现推广本身属于另一个类。这一节讲清做互联网产品最要紧的几个类，以及图样一致性这个隐形的坑。", tag: '交互' , navTitle: "商标一个不够：35、42、41 一起拿"},
            { file: 'opc-4.html', title: "被驳回之后：把挡路的商标拿掉", desc: "「方片数智」第一次提交就被驳回了。挡路的是一个 2015 年就注册、却早已没在使用的在先商标。这一节把从驳回、撤三到复审的完整链路拆开讲清楚，这条路是我们自己走完的一遍。", tag: '案例' , navTitle: "被驳回之后：把挡路的商标拿掉"},
            { file: 'opc-5.html', title: "域名全拿下：十万的报价怎么谈到五千", desc: "miyang.cn 这个域名，曾经在交易平台上被挂到 102,222 元一口价。最后我们用五千块拿下。中间没有什么谈判魔法，只有一件提前三年做完的事：把这个品牌能用的后缀，几乎全注册在了自己手里。", tag: '案例' , navTitle: "域名全拿下：十万的报价怎么谈到五千"},
          ],
        },
        {
          id: 't-opc-code',
          routes: ['pm', 'build'],
          title: '代码、内容与技术',
          desc: '版权自动产生，证据要自己挣',
          lessons: [
            { file: 'opc-6.html', title: "软著与备案：版权自动产生，证据要自己挣", desc: "著作权在创作完成那一刻就自动产生了，不用注册。听起来很省心，直到你被抄袭、要打官司的那天才发现：权利是自动的，证据不是。这一节讲软著登记和著作权备案这两件「花小钱买证据」的事，顺带拆一个外包开发的大坑。", tag: '交互' , navTitle: "软著与备案：版权自动产生，证据要自己挣"},
            { file: 'opc-7.html', title: "专利还是商业秘密：先申请，后公开", desc: "手里有真技术的人要做一道选择题：申请专利，还是当商业秘密捂着。两条路的逻辑完全相反，选错了代价很大。更要命的是顺序问题：产品发布在专利申请之前，这个专利就永远申请不成了。", tag: '交互' , navTitle: "专利还是商业秘密：先申请，后公开"},
          ],
        },
        {
          id: 't-opc-entity',
          routes: ['pm', 'build'],
          title: '主体与上线合规',
          desc: '备案、许可、注册资本',
          lessons: [
            { file: 'opc-8.html', title: "ICP 备案是地基，ICP 证是收费执照", desc: "很多人把「ICP 备案」和「ICP 证」当成一回事，其实是两件事，差着一百万注册资本的距离。备案是网站能在国内被访问的前提，人人要办；ICP 证是合法向用户收费的执照，门槛高得多。这一节把两个都讲清，重点是注册公司那天就要做对的一个决定。", tag: '交互' , navTitle: "ICP 备案是地基，ICP 证是收费执照"},
            { file: 'opc-9.html', title: "注册资本别乱写：五年内要真金白银缴足", desc: "认缴制时代流行把注册资本写得很威风，反正不用马上掏钱。这个玩法 2024 年 7 月起结束了：新公司法要求认缴的钱五年内缴足。这一节讲注册资本怎么定，顺带拆一人公司最容易炸的两个雷：公私账混同，和贪省事用灰产收款。", tag: '交互' , navTitle: "注册资本别乱写：五年内要真金白银缴足"},
          ],
        },
        {
          id: 't-opc-equity',
          routes: ['pm', 'build'],
          title: '合伙与股权',
          desc: '互补、控制权、代持与退出',
          lessons: [
            { file: 'opc-10.html', title: "合伙人要互补：能力重叠的两个人别合伙", desc: "一个人跑到某个点，总会撞上自己补不上的短板，这时候才谈合伙人。挑人的第一标准是能力互补，志同道合排在后面。这一节讲两条原则，和一个能省掉很多痛苦的「试婚期」做法。", tag: '交互' , navTitle: "合伙人要互补：能力重叠的两个人别合伙"},
            { file: 'opc-11.html', title: "三个人各 1/3 是最贵的公平", desc: "三个人一起干，股权一人三分之一，谁也不吃亏，谈的时候大家都很舒服。这个结构的代价在半年后才出现：公司做不了决定。这一节用表决权门槛算一遍，再讲核心创始人为什么要拿到 70% 以上。", tag: '交互' , navTitle: "三个人各 1/3 是最贵的公平"},
            { file: 'opc-12.html', title: "股权别靠感觉分：五个维度算一遍", desc: "上一节讲了结构，这一节讲比例怎么来。凭感觉谈出来的数字，双方过后都会觉得自己吃亏。把贡献拆成五个维度，各给一个权重，算完再谈，讨论的对象就从「谁更重要」变成「这个维度算谁的」。", tag: '交互' , navTitle: "股权别靠感觉分：五个维度算一遍"},
            { file: 'opc-13.html', title: "先签代持协议，成熟了再动工商登记", desc: "比例谈完了，接下来是怎么给。早期最容易犯的错是结构做得太重：持股平台、期权池、一堆主体，公司还没跑起来，架子先搭好了。这一节讲三条纪律，重点是那句最贵的经验，离职的人不签字，公司会被锁死。", tag: '交互' , navTitle: "先签代持协议，成熟了再动工商登记"},
          ],
        },
        {
          id: 't-opc-strategy',
          routes: ['pm', 'build'],
          title: '战略与收官',
          desc: '出海、选型和新创业公式',
          lessons: [
            { file: 'opc-14.html', title: "服务器放哪不重要，用户在哪才关键", desc: "很多 AI 产品的所谓出海，就是把服务器放到新加坡，套一层境外模型的接口，然后照样给国内用户用。这套操作在合规上是无效的。这一节先把判断标准说清，再讲真出海到底要做哪些事。", tag: '交互' , navTitle: "服务器放哪不重要，用户在哪才关键"},
            { file: 'opc-15.html', title: "大厂看不上的长尾，才是一个人的机会", desc: "大公司立项要过 ROI 门槛，一个市场再真实，规模不够大就不会有人做。这道门槛帮你挡掉了最强的竞争对手。这一节讲国内长尾和海外两条路怎么选，再讲一件直接影响成本的事：模型怎么挑。", tag: '交互' , navTitle: "大厂看不上的长尾，才是一个人的机会"},
            { file: 'opc-final.html', title: "新创业公式：先找买单的人，再用 AI 做出来", desc: "前面十五节讲的是不踩坑：商标、软著、专利、备案、注册资本、股权。这一节讲往哪走。旧的创业公式已经失效，因为它的第一步押的是技术门槛，而技术门槛现在接近于零。收官这节把新公式讲清，把十五节摊成一张图，再给一份能勾的自查清单。", tag: '收官' , navTitle: "新创业公式：先找买单的人，再用 AI 做出来"},
          ],
        },
      ],
    },
    {
      id: 'p-seo',
      num: '课后甜点',
      title: '被搜到：SEO 与 GEO',
      desc: "通过课程来源项目的公开网站案例学习 SEO 与 GEO，区分搜索收录、内容可读性和来源核验。案例经历与流量不属于方片内部平台；内部学习平台的访问范围以公司安排为准。",
      color: '#4338ca',
      group: 'extra',
      routes: ['use', 'pro', 'pm', 'build'],
      bonus: true,
      topics: [
        {
          id: 't-seo-why',
          routes: ['use', 'pro', 'pm', 'build'],
          title: '先搞清被发现这件事',
          desc: '做完不等于有人来',
          lessons: [
            { file: 'seo-1.html', title: "做出来了，为什么没人来", desc: "前面的课把产品做出来了，OPC 把它确了权。然后是一个更朴素的问题：做完不等于有人来。这一节先把「被发现」这件事拆开：流量从哪三条路来、各自什么脾气，再用一个五层漏斗，找到你的产品卡在哪一层。", tag: '开篇' , navTitle: "做出来了，为什么没人来"},
          ],
        },
        {
          id: 't-seo-field',
          routes: ['use', 'pro', 'pm', 'build'],
          title: '两个战场',
          desc: '搜索引擎给链接，AI 引擎给答案',
          lessons: [
            { file: 'seo-2.html', title: "SEO 最低可行清单：能被抓、能被读懂、能被收录", desc: "SEO 这个词被各种「秘籍」搞得神神叨叨，其实对一个人的小站来说，值得做的部分很小、很明确：让爬虫抓得到、让引擎读得懂、让收录查得着。这一节只讲做了就有效、不做就归零的部分，每一条都能自己动手核对。", tag: '实战' , navTitle: "SEO 最低可行清单：能被抓、能被读懂、能被收录"},
            { file: 'seo-3.html', title: "GEO：让 AI 引擎愿意引用你", desc: "越来越多的用户跳过搜索框，直接把问题丢给 ChatGPT、Kimi 或豆包。答案由 AI 组织，你的站在不在答案里，成了新的生死线。这门手艺有个名字：GEO（Generative Engine Optimization）。这一节讲它的四个杠杆，每个都配一个当场能玩的教具。", tag: '交互' , navTitle: "GEO：让 AI 引擎愿意引用你"},
          ],
        },
        {
          id: 't-seo-case',
          routes: ['pm', 'build'],
          title: '拆一个真实案例',
          desc: "前两节的清单和杠杆，这一节全部落在一个真实病人身上：案例站点自己。2026 年 8 月 10 日我们给全站做了一次 SEO / GEO 审计，查出十个缺口，当周修完一轮。这一节挑五个最有代表性的，每个讲清怎么发现的、改了什么、拿什么验收。",
          lessons: [
            { file: 'seo-4.html', title: "拆案例站点：Google 收录 693 页，Bing 只有 50 页", desc: "前两节的清单和杠杆，这一节全部落在一个真实病人身上：案例站点自己。2026 年 8 月 10 日我们给全站做了一次 SEO / GEO 审计，查出十个缺口，当周修完一轮。这一节挑五个最有代表性的，每个讲清怎么发现的、改了什么、拿什么验收。", tag: '案例' , navTitle: "拆案例站点：Google 收录 693 页，Bing 只有 50 页"},
          ],
        },
        {
          id: 't-seo-final',
          routes: ['pm', 'build'],
          title: '优先级与收官',
          desc: '一个人没有 SEO 团队，只有排序能力',
          lessons: [
            { file: 'seo-5.html', title: "一个人的优先级：先写能被搜到的问题", desc: "技术清单前面三节讲完了，全是一次性动作。真正日复一日的仗在内容：写什么、先写什么。一人公司没有 SEO 团队、没有词库工具的预算，你唯一的武器是排序能力：把力气花在有人搜的问题上，用真实经历换可信度，离歪路远一点。", tag: '实战' , navTitle: "一个人的优先级：先写能被搜到的问题"},
            { file: 'seo-final.html', title: "被搜到验收清单：上线前再过一遍", desc: "全章收官。前五节的东西全部收进一张 12 项清单，每项都是一个能当场核对的动作：查源码、数条目、贴地址、看日志。勾选进度存在本地，每次上线新产品回来过一遍。清单之后是四个度量口径，回答那个最重要的问题：怎么知道这些活儿有没有白干。", tag: '收官' , navTitle: "被搜到验收清单：上线前再过一遍"},
          ],
        },
      ],
    },
    {
      id: 'p8',
      num: '课后甜点',
      title: '雷军创业课',
      desc: '这不是 AI 课，是正课学完后的一道甜点：整理自雷军的创业公开课口述，涵盖产品、口碑、找钱、估值、股权与现金流。给想靠 AI 做一人公司（OPC）的你，补上「做生意」的方法论。全章免登录开放。',
      color: '#f97316',
      group: 'extra',
      routes: ['pm', 'build'],
      bonus: true,
      freeAll: true,
      topics: [
        {
          id: 't-lei-mind',
          title: '创业者的自我修养',
          desc: '决心、勇气与向死而生的心理建设',
          lessons: [
            { file: 'lei-1.html', title: "谁适合创业：莫名其妙的自信", desc: "什么样的人适合创业？雷军的回答从一句玩笑开始：「创业不是人干的事情，是阿猫阿狗干的事情。」这一节讲创业者需要的三种能力，以及 1996 年金山陷入绝境时，他靠什么撑过来。", tag: '开篇' , navTitle: "谁适合创业：莫名其妙的自信"},
            { file: 'lei-2.html', title: "心理准备：第一天就想好怎么死", desc: "大多数创业者第一天想的是公司会多成功，雷军创办小米的第一天想的是公司会怎么死。这一节讲他 40 岁再创业的动机、对失败率的清醒认知，以及三条具体的保命策略。", tag: '交互' , navTitle: "心理准备：第一天就想好怎么死"},
          ],
        },
        {
          id: 't-lei-dir',
          title: '方向与起点',
          desc: '喜欢的、能干的、市场足够大的',
          lessons: [
            { file: 'lei-3.html', title: "选方向：Go Big Market", desc: "「你们干的事情，都不一定是你们能干的最大的事情。」这一节是雷军办金山最大的后悔和总结：方向怎么选、天花板怎么算，以及一句他用得比发明人还多的话：Go Big Market，做最肥的市场。", tag: '交互' , navTitle: "选方向：Go Big Market"},
            { file: 'lei-4.html', title: "起名：赢在起跑线", desc: "雷军看到的创业者里，99.9% 的公司名是随便起的。而联想、百度、腾讯、华为，这些成功公司的名字全都很好听。这不是巧合：「你在名字上花多少时间，就意味着你会花多少时间在它的业务上」。这一节看小米这个名字是怎么磨出来的。", tag: '交互' , navTitle: "起名：赢在起跑线"},
          ],
        },
        {
          id: 't-lei-product',
          title: '产品与口碑',
          desc: '专注、极致、口碑、快',
          lessons: [
            { file: 'lei-5.html', title: "互联网七字诀", desc: "「互联网实际上是一种思想，一种做事的方法。这个方法就是七个字：专注、极致、口碑、快。」雷军说琢磨透这七个字去做事是攻无不克的。它的恐怖之处在于，你要真做到。", tag: '交互' },
            { file: 'lei-6.html', title: "口碑的本质是超出预期", desc: "互联网让口碑传播变得极快：东西好，很快就会被消费者传开。但什么东西才有口碑？雷军花了很长时间琢磨透这个问题，答案来自两次亲身消费：一趟失望的帆船酒店，和一顿被感动的海底捞。", tag: '交互' , navTitle: "口碑的本质是超出预期"},
          ],
        },
        {
          id: 't-lei-money',
          title: '找钱与融资',
          desc: '信用是融资的全部前提',
          lessons: [
            { file: 'lei-7.html', title: "第一笔钱：从身边人开始", desc: "办公司第一件事就是需要钱。雷军的答案很朴素：天使投资在美国就是凑份子，真正的问题是人家凭什么相信你。这一节讲第一笔钱从哪来、信用怎么攒，以及为什么几百页的商业计划书没人看。", tag: '交互' , navTitle: "第一笔钱：从身边人开始"},
            { file: 'lei-8.html', title: "融资时机：有钱才能融到钱", desc: "这个世界很纠结：只有有钱才能融到钱。账上留足现金、钱花一半就启动、让投资人来找你。再看懂 VC 的账本，明白他要赚十倍为什么不是贪婪，你就知道该在什么时候、用什么姿态谈钱。", tag: '交互' , navTitle: "融资时机：有钱才能融到钱"},
            { file: 'lei-9.html', title: "估值的艺术：融资卖的是信心", desc: "做价越高越好？雷军的结论正相反：做价高，出售的是一个更高的预期，达不成就要付出代价。这一节讲怎么定价（先做市场调查，从中间价往上走），以及融资这件事的本质：销售信心。", tag: '交互' , navTitle: "估值的艺术：融资卖的是信心"},
          ],
        },
        {
          id: 't-lei-equity',
          title: '股权与合伙人',
          desc: '创业是一场分享 100% 梦想的拼图',
          lessons: [
            { file: 'lei-10.html', title: "股权就是拼图：切忌均分", desc: "刚开始创业的时候，那 100% 的股份其实是个梦想。创业的过程，就是拿这 100% 的梦想去跟钱 share、跟最优秀的工程师 share、跟最好的 marketing 和资源 share。雷军的原话：创业就是拼图。这一节看拼图怎么拼，以及极左、极右、均分这三种拼法为什么都会死。", tag: '交互' , navTitle: "股权就是拼图：切忌均分"},
            { file: 'lei-11.html', title: "合伙人：先分梦想，再分股份", desc: "股份的分配是相对的，不是绝对的：公司做到十亿美金，1% 就是一千万美元。所以找 co-founder 的顺序不能反：先 share 梦想，他不 buy in，给他 100% 也没用；然后才是角色、贡献和分饼；最后把最难开口的事谈完：锁定四年，退出机制。", tag: '交互' , navTitle: "合伙人：先分梦想，再分股份"},
          ],
        },
        {
          id: 't-lei-ops',
          title: '经营基本功',
          desc: '现金流和人是公司的命',
          lessons: [
            { file: 'lei-12.html', title: "现金流与报酬包", desc: "对早期创业公司来说，最重要的数字是账上还有多少现金：假如没有任何收入，你能活多少个月？这是创业公司每天都要想的问题。这一节讲雷军的三笔账：现金跑道、现金流，和给最优秀的人算的那笔「报酬包」。", tag: '交互' },
          ],
        },
        {
          id: 't-lei-final',
          title: '专题收官',
          desc: '把雷军的课变成 OPC 的行动清单',
          lessons: [
            { file: 'lei-final.html', title: "写给 AI 时代的一人公司", desc: "22 段口述讲完了。雷军讲的是办公司，但 AI 时代一个人就是一家公司：你自己是 CEO，也是那个技术大拿；你的存款是账上现金，你的时间是 100% 的股份。收官这节把 12 节课摊成一张全景图，再把它变成一份属于 OPC（One Person Company）的自查清单和行动清单。", tag: '收官' , navTitle: "写给 AI 时代的一人公司"},
            { file: 'lei-test.html', title: "测一测你的 AI 创业成功率", desc: "13 节课讲完了，现在轮到你。12 道题，全部来自前面课程里雷军的核心判断：心态、方向、产品、现金、合伙、AI 杠杆。凭直觉选，别猜「标准答案」，测的是你现在真实的样子。", tag: '交互' , navTitle: "测一测你的 AI 创业成功率"},
          ],
        },
      ],
    },
  ],
};

/* ── 标签配色 ── */
window.TAG_STYLE = {
  '交互':   { bg: '#dcfce7', fg: '#15803d' },
  '动画':   { bg: '#dcfce7', fg: '#166534' },
  '概念':   { bg: '#fef9c3', fg: '#a16207' },
  '案例':   { bg: '#fef2f2', fg: '#dc2626' },
  '开篇':   { bg: '#fef2f2', fg: '#dc2626' },
  '安全':   { bg: '#fef2f2', fg: '#dc2626' },
  '反例':   { bg: '#fef2f2', fg: '#dc2626' },
  '实战':   { bg: '#dbeafe', fg: '#1d4ed8' },
  'PM 进阶':{ bg: '#dbeafe', fg: '#1d4ed8' },
  '系统设计':{ bg: '#dbeafe', fg: '#1d4ed8' },
  '深入':   { bg: '#ffedd5', fg: '#ea580c' },
  '多模态': { bg: '#fef3c7', fg: '#92400e' },
  '选型':   { bg: '#fef3c7', fg: '#d97706' },
  '提示词工程': { bg: '#e0f2fe', fg: '#0369a1' },
  'RAG':    { bg: '#f3e8ff', fg: '#7e22ce' },
  '架构':   { bg: '#dcfce7', fg: '#166534' },
  '汇总':   { bg: '#ede9fe', fg: '#6d28d9' },
  '收官':   { bg: '#fef9c3', fg: '#a16207' },
  '技巧':   { bg: '#ecfdf5', fg: '#065f46' },
  '设计模式':{ bg: '#fef2f2', fg: '#dc2626' },
  '方法论': { bg: '#fff7ed', fg: '#c2410c' },
  '规范':   { bg: '#ccfbf1', fg: '#0f766e' },
  '前沿':   { bg: '#f3e8ff', fg: '#7c3aed' },
  '考察':   { bg: '#fee2e2', fg: '#b91c1c' },
};

/* ── 工具：扁平化所有 lesson，便于上一节/下一节导航 ── */
window.COURSE_FLAT = (function () {
  const flat = [];
  window.COURSE.parts.forEach(function (part) {
    part.topics.forEach(function (topic) {
      topic.lessons.forEach(function (lesson) {
        flat.push(Object.assign({}, lesson, {
          partId: part.id, partTitle: part.title, partNum: part.num,
          topicId: topic.id, topicTitle: topic.title,
        }));
      });
    });
  });
  return flat;
})();
