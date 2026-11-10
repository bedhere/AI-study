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
    title: '學 AI 產品，從入門到精通',
    subtitle: '從大模型底層原理到 AI Agent Harness',
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
      num: '課程開篇',
      title: '開始之前',
      desc: '四節開篇小課：先按目標挑一條學習路綫，再用達克曲綫找到自己現在的位置，講清怎麼學才能真的過腦子，以及為什麼值得先花時間弄懂原理。原理通了，後面所有方案你都能自己看懂。',
      color: '#64748b',
      group: 'main',
      routes: ['use', 'pro', 'pm', 'build'],
      prologue: true,
      topics: [
        {
          id: 't-intro',
          title: '入門與定位',
          desc: '先搞清楚我們在哪裏、為什麼要打基礎',
          lessons: [
            /* 路线选择放在全课第一节：五条路线最后都汇到「入门与定位」，
               所有人必经此处。注册成课时它才有阅读器外壳，也才进得了翻页序列。 */
            { file: 'roadmap.html', title: "從你的工作目標開始學 AI", desc: "方片正在從 MCN 向科技方向轉型。無論你在哪個崗位，都可以從適合自己的起點開始，把 AI 用進真實工作。", tag: '開篇' , navTitle: "從你的工作目標開始學 AI"},
            { file: '0-intro.html', title: "我們在哪裏？達克效應", desc: "達克魯寧效應 · Dunning-Kruger Effect：AI 產品經理訓練營，正式開始之前先定位自己。", tag: '開篇' , navTitle: "我們在哪裏？達克效應"},
            { file: '0-how.html', title: "怎樣學，知識才能過腦？", desc: "這門課不缺內容，缺的是你停下來想一想的 30 秒。", tag: '開篇' , navTitle: "怎樣學，知識才能過腦？"},
            { file: '0-why.html', title: "為什麼花這麼多時間講原理？", desc: "磨刀不誤砍柴工 · 打好基礎才能真正做工程化", tag: '開篇' , navTitle: "為什麼花這麼多時間講原理？"},
          ],
        },
      ],
    },
    /* 学习方法专题：开篇讲了「怎样学才过脑子」，这一章把那一节展开成三十五节可操作的做法。
       标 prologue，所以不占主线编号，后面篇章的序号不变；四条路线都可见，因为提问、验证、
       留住知识这三件事跟学员想走哪条路无关。

       2026-08 重构：原来十一节，每节塞三到四个方法、两千多字，读者反馈晦涩。改成一页只讲
       一件事、四百到六百字、讲解责任交给演示，于是十一节展开成三十二节正文加三节收尾。
       字数与结构的闸门在 codex-course/check_page.py 的 learn 专题口径里。 */
    {
      id: 'p-learn',
      num: '學習方法',
      title: 'AI 教我學習：把它當老師用',
      desc: "圍繞真實問題練習補充背景、澄清提問、核驗答案、閱讀原文與檢查理解。請在實際使用的 AI 工具中練習，學堂尚未接入對話式助教。",
      color: '#b45309',
      group: 'main',
      routes: ['use', 'pro', 'pm', 'build'],
      prologue: true,
      topics: [
        {
          id: 't-learn-open',
          title: "提問與原文",
          desc: "讓 AI 幫我判斷：呢個建議適唔適合我；讓 AI 幫我搵到下一步應該問啲咩",
          lessons: [
            { file: 'learn-1.html', title: "讓 AI 幫我判斷：呢個建議適唔適合我", desc: "AI 説年卡划算，可能只是對經常去的人划算。把時間、距離和真實習慣説清楚，答案才是在幫你做決定。", tag: '認知', navTitle: "讓 AI 幫我判斷：呢個建議適唔適合我" },
            { file: 'learn-2.html', title: "讓 AI 幫我搵到下一步應該問啲咩", desc: "能問出答案、能指出可疑處、能問出下一問，這三層是分界。讀完能認出自己停在哪一層，以及下一步寫哪一句。", tag: '認知', navTitle: "讓 AI 幫我搵到下一步應該問啲咩" },
          ],
        },
        {
          id: 't-learn-ask',
          title: "解釋與追問",
          desc: "讓 AI 按我的情況講清楚；讓 AI 用我熟悉的東西打比方；讓 AI 一次只問我一個問題",
          lessons: [
            { file: 'learn-3.html', title: "讓 AI 按我的情況講清楚", desc: "錨點、場景、出題、預警，每缺一個，回答就少一塊。四句模板可以直接抄走。", tag: '提問', navTitle: "讓 AI 按我的情況講清楚" },
            { file: 'learn-4.html', title: "讓 AI 用我熟悉的東西打比方", desc: "它不知道你熟悉什麼，只能從公共題庫裏抽一個源領域。在提問裏空出這一格，填你已經會的東西，比方才接得住。", tag: '提問', navTitle: "讓 AI 用我熟悉的東西打比方" },
            { file: 'learn-5.html', title: "讓 AI 一次只問我一個問題", desc: "把下一步推理變成一個問句交還給你，往下想的活兒留在你這邊。讀完能讓它一次只問一個，並看出自己卡在第幾問。", tag: '提問', navTitle: "讓 AI 一次只問我一個問題" },
          ],
        },
        {
          id: 't-learn-guard',
          title: "核驗與檢查",
          desc: "讓 AI 標出最可能編錯的五類資訊；讓 AI 的回答先過三道檢查；這次回答，我要不要去查原文",
          lessons: [
            { file: 'learn-6.html', title: "讓 AI 標出最可能編錯的五類資訊", desc: "一段讀起來很順的回答裏，有五個位置預設該當可疑。讀完能指出它們在哪。", tag: '驗證', navTitle: "讓 AI 標出最可能編錯的五類資訊" },
            { file: 'learn-7.html', title: "讓 AI 的回答先過三道檢查", desc: "要出處、交叉驗證、標註不確定。同一段回答過三道閘，每開一道篩掉的不一樣，三道全開還剩一條得自己翻原文。", tag: '驗證', navTitle: "讓 AI 的回答先過三道檢查" },
            { file: 'learn-8.html', title: "這次回答，我要不要去查原文", desc: "按後果決定查不查。越是它答得流暢完整的地方，越值得抽一處去對原文。", tag: '驗證', navTitle: "這次回答，我要不要去查原文" },
          ],
        },
        {
          id: 't-learn-hard',
          title: "閱讀與判斷",
          desc: "讓 AI 幫我拆開一段看不懂的條款；讓 AI 先話我知必須識邊五個概念；讓 AI 淨係根據我貼出嘅原文回答；讓 AI 畀每條判斷標出原文位置；讓 AI 先確認我手上係邊一版；讓 AI 改稿嗰陣保住關鍵資訊",
          lessons: [
            { file: 'learn-9.html', title: "讓 AI 幫我拆開一段看不懂的條款", desc: "先要地圖，再定位卡點，補那一層前置，最後回到原文。四步走完，那一句能用沒有術語的話説出來。", tag: '閲讀', navTitle: "讓 AI 幫我拆開一段看不懂的條款" },
            { file: 'learn-10.html', title: "讓 AI 先話我知必須識邊五個概念", desc: "按目錄、摘要、結論、圖表、正文的順序給它，開工先問要先懂哪五個概念。", tag: '閲讀', navTitle: "讓 AI 先話我知必須識邊五個概念" },
            { file: 'learn-11.html', title: "讓 AI 淨係根據我貼出嘅原文回答", desc: "轉述會先丟掉限定條件、例外情況、指向別處的定義，而那正是花錢的部分。", tag: '閲讀', navTitle: "讓 AI 淨係根據我貼出嘅原文回答" },
            { file: 'learn-12.html', title: "讓 AI 畀每條判斷標出原文位置", desc: "寫下一句判斷之前，先讓 AI 指出原材料的確切位置。找不到對應原文的內容，先不要拿來做決定。", tag: '閲讀', navTitle: "讓 AI 畀每條判斷標出原文位置" },
            { file: 'learn-13.html', title: "讓 AI 先確認我手上係邊一版", desc: "先確認手上材料的來源、日期和版本綫索，再讓後面的判斷只基於這一版。", tag: '閲讀', navTitle: "讓 AI 先確認我手上係邊一版" },
            { file: 'learn-14.html', title: "讓 AI 改稿嗰陣保住關鍵資訊", desc: "AI 説改稿已經沒有問題，可能因為它把最難解釋、也最有分量的那段直接刪了。", tag: '閲讀', navTitle: "讓 AI 改稿嗰陣保住關鍵資訊" },
          ],
        },
        {
          id: 't-learn-keep',
          title: '讓知識留下來',
          desc: "合埋材料，等 AI 考我一次；讓 AI 每次換一道未見過嘅新題；讓 AI 搵出我喺邊一步諗錯；讓 AI 喺新對話裏接住上次傾；分三層話 AI 知：我係邊個、而家做緊咩；讓 AI 幫我將筆記寫到之後搵得到",
          lessons: [
            { file: 'learn-15.html', title: "合埋材料，等 AI 考我一次", desc: "取出來這個動作本身在加固記憶，重讀加固的是眼熟。", tag: '記憶', navTitle: "合埋材料，等 AI 考我一次" },
            { file: 'learn-16.html', title: "讓 AI 每次換一道未見過嘅新題", desc: "固定的舊題會被背熟。AI 的獨特價值是能無限次出新題，而複習要放在快忘的時候。", tag: '記憶', navTitle: "讓 AI 每次換一道未見過嘅新題" },
            { file: 'learn-17.html', title: "讓 AI 搵出我喺邊一步諗錯", desc: "答錯之後先別看答案，把當時的想法説給它，讓它指出思路在哪一步偏了。讀完能定位到自己拐錯的那一步，只補那一步。", tag: '記憶', navTitle: "讓 AI 搵出我喺邊一步諗錯" },
            { file: 'learn-18.html', title: "讓 AI 喺新對話裏接住上次傾", desc: "上下文窗口是這一次會話的工作區，對話一關就空了。留下的那層得寫在外面。", tag: '上下文', navTitle: "讓 AI 喺新對話裏接住上次傾" },
            { file: 'learn-19.html', title: "分三層話 AI 知：我係邊個、而家做緊咩", desc: "一句話自我介紹、項目背景、能被檢索的筆記，各寫什麼、寫在哪。", tag: '上下文', navTitle: "分三層話 AI 知：我係邊個、而家做緊咩" },
            { file: 'learn-20.html', title: "讓 AI 幫我將筆記寫到之後搵得到", desc: "一條筆記一個主題，開頭一句話説清結論，帶上當時的困惑。讀完知道每次該挑哪幾條餵進去。", tag: '上下文', navTitle: "讓 AI 幫我將筆記寫到之後搵得到" },
          ],
        },
        {
          id: 't-learn-check',
          title: '自查與避坑',
          desc: "讓 AI 好似外行咁追問我；讓 AI 改一個條件，再考我一次；讓 AI 等我寫完三行，再畀答案；讓 AI 幫我檢查：我是真的懂了嗎；讓 AI 把推理過程還給我；收藏之前，先用自己的話説一遍",
          lessons: [
            { file: 'learn-21.html', title: "讓 AI 好似外行咁追問我", desc: "讓它只帶初中知識來追問。讀完能拿一個概念跑一遍，看自己卡在第幾問。", tag: '自查', navTitle: "讓 AI 好似外行咁追問我" },
            { file: 'learn-22.html', title: "讓 AI 改一個條件，再考我一次", desc: "一道原題加三種變體，看同一套背下來的步驟在哪一步失去依據。讀完能讓它出一道改過條件的題，自己先解。", tag: '自查', navTitle: "讓 AI 改一個條件，再考我一次" },
            { file: 'learn-23.html', title: "讓 AI 等我寫完三行，再畀答案", desc: "預測它在邊界上會怎麼走，再讓它故意講錯、你來指。", tag: '自查', navTitle: "讓 AI 等我寫完三行，再畀答案" },
            { file: 'learn-24.html', title: "讓 AI 幫我檢查：我是真的懂了嗎", desc: "好的閲讀體驗和知識進腦是兩件事。蓋住那段讀得很順的解釋説三個要點，缺的那條就露出來。", tag: '避坑', navTitle: "讓 AI 幫我檢查：我是真的懂了嗎" },
            { file: 'learn-25.html', title: "讓 AI 把推理過程還給我", desc: "結論可以借，推演借走了下次還得再借。讀完能用一句話判斷自己剛才是學會了還是只完成了。", tag: '避坑', navTitle: "讓 AI 把推理過程還給我" },
            { file: 'learn-26.html', title: "收藏之前，先用自己的話説一遍", desc: "擁有資訊和擁有能力之間沒有自動兑換。讀完你會在點星之前多做一步。", tag: '避坑', navTitle: "收藏之前，先用自己的話説一遍" },
          ],
        },
        {
          id: 't-learn-plan',
          title: '給自己設計一門課',
          desc: "讓 AI 按我的目標篩掉暫時用不上的材料；讓 AI 用一個成品檢查我會不會；讓 AI 幫我先留出複習時間",
          lessons: [
            { file: 'learn-27.html', title: "讓 AI 按我的目標篩掉暫時用不上的材料", desc: "材料按知識完整性編排，你的時間按自己的目標編排。讀完能寫出一句別人看得見的目標，拿它篩材料。", tag: '規劃', navTitle: "讓 AI 按我的目標篩掉暫時用不上的材料" },
            { file: 'learn-28.html', title: "讓 AI 用一個成品檢查我會不會", desc: "里程碑到期那天要交一個別人看得見的東西，開工之前先跑一次前置自測。", tag: '規劃', navTitle: "讓 AI 用一個成品檢查我會不會" },
            { file: 'learn-29.html', title: "讓 AI 幫我先留出複習時間", desc: "排周曆的時候先扣掉複習位，再往剩下的空裏放新內容。讀完能看出複習位是怎麼被新內容一格一格佔掉的。", tag: '規劃', navTitle: "讓 AI 幫我先留出複習時間" },
          ],
        },
        {
          id: 't-learn-alice',
          title: '把側邊欄的 Alice 用起來',
          desc: "把當前材料清楚地交給 AI；讓 AI 一次只問一道自測題；把核驗過的學習筆記留給下一次",
          lessons: [
            { file: 'learn-30.html', title: "把當前材料清楚地交給 AI", desc: "提問時主動提供材料、問題和約束；本頁不依賴學堂內建助教。", tag: '助教', navTitle: "把當前材料清楚地交給 AI" },
            { file: 'learn-31.html', title: "讓 AI 一次只問一道自測題", desc: "把已學內容交給實際使用的 AI 工具，透過回答問題檢查理解。", tag: '助教', navTitle: "讓 AI 一次只問一道自測題" },
            { file: 'learn-32.html', title: "把核驗過的學習筆記留給下一次", desc: "普通 AI 對話不一定會自動記住筆記，請主動提供相關上下文。", tag: '助教', navTitle: "把核驗過的學習筆記留給下一次" },
          ],
        },
        {
          id: 't-learn-end',
          title: '收尾',
          desc: "從 32 個動作裏選出我的下一步；今天先完成這三行；用 30 道題找出我沒學會的地方",
          lessons: [
            { file: 'learn-33.html', title: "從 32 個動作裏選出我的下一步", desc: "前面三十二頁各講一件事。勾出現在最缺的那兩三項，這一頁給出該走的頁碼順序。", tag: '彙總', navTitle: "從 32 個動作裏選出我的下一步" },
            { file: 'learn-34.html', title: "今天先完成這三行", desc: "三個動作，十分鐘以內做得完。這一頁不講新東西，填完帶走自己那三行。", tag: '落地', navTitle: "今天先完成這三行" },
            { file: 'learn-35.html', title: "用 30 道題找出我沒學會的地方", desc: "三十道題覆蓋前面三十二頁。每一道先自己答一遍再翻答案，沒答上的那幾條，末尾按頁碼排成一張補課清單。", tag: '自測', navTitle: "用 30 道題找出我沒學會的地方" },
          ],
        },
      ],
    },
    {
      id: 'p0',
      num: '零基礎入門',
      title: '寫給第一次接觸 AI 的你',
      desc: '不講術語、不講數學，用八節交互小課建立對 AI 的正確直覺：它能幹哪些神奇的活、為什麼會一本正經地胡説、怎麼和它説話、什麼能放心交給它。另附「小白三千問」：一頁一問，把新手最常見的疑惑一次説清。零基礎的家人朋友也能看懂，全章免登入開放。',
      color: '#0891b2',
      group: 'main',
      routes: ['use', 'pro', 'pm', 'build'],
      prologue: true,
      topics: [
        {
          id: 't-zero-what',
          title: 'AI 是個什麼東西',
          desc: '先看它的能力，再看穿它的底牌',
          lessons: [
            { file: 'zero-0.html', title: "先別學原理，看看它能幹哪些神奇的活", desc: "如果你還沒怎麼用過 AI，或者只把它當「問答機」用過幾次——這一課先看六個真實的使用現場。看完你會明白一件事：這不是又一個新軟件，這是軟件歷史上第一次「反過來」。", tag: '交互' },
            { file: 'zero-1.html', title: "AI 到底是什麼？它其實在玩「接話茬」", desc: "別被「人工智能」四個字嚇到。ChatGPT、DeepSeek、豆包……不管叫什麼名字，它們做的事情本質上只有一件：猜你這句話的下一個詞是什麼。這一課不需要任何基礎，玩兩個小遊戲你就明白了。", tag: '交互' },
            { file: 'zero-2.html', title: "它不是在網上幫你搜答案", desc: "關於 AI，新手最常見的誤解是：「不就是個更聰明的搜索框嗎？」——完全不是一回事。上一課你已經知道它在「接話茬」，這一課看清它和搜索引擎的本質區別，你就知道什麼時候該用哪個。", tag: '概念' },
            { file: 'zero-3.html', title: "它會一本正經地胡説八道", desc: "前兩課你知道了：它在接話茬，而且憑的是「消化後的記憶」。現在到了最關鍵的一課——接得像，不等於接得對。下面三段 AI 的回答裏，每段都藏着一句編造的話。來，親手抓一次。", tag: '交互' },
          ],
        },
        {
          id: 't-zero-talk',
          title: '怎麼和它説話',
          desc: '兩個立刻能用的説話技巧',
          lessons: [
            { file: 'zero-4.html', title: "把它當一個聰明、但完全不了解你的新同事", desc: "為什麼別人用 AI 效果驚人，你問它卻答得平平？九成的差距不在 AI，在問法。這一課給你一個思維模型和一個公式，立刻就能用。", tag: '交互' },
            { file: 'zero-5.html', title: "萬能開場白：「先問我幾個問題，再開始」", desc: "上一課的公式很好，但你可能已經發現一個死結：很多時候，你自己也不知道該交代什麼。這一課分享一個小辦法：把這個難題原樣丟回給 AI——只需要一句話。", tag: '交互' , navTitle: "萬能開場白：「先問我幾個問題，再開始」"},
          ],
        },
        {
          id: 't-zero-faq-usage',
          title: '小白三千問 · 會用篇',
          desc: '一頁一問：怎麼用得更好、工具怎麼選',
          lessons: [
            { file: 'zero-q-prompt.html', title: "提示詞到底怎麼寫才好？", desc: "網上流傳着各種「神級提示詞模板」，動輒幾百字。其實真正管用的骨架只有三塊，剩下的都是錦上添花。", tag: '交互' , navTitle: "提示詞到底怎麼寫才好？"},
            { file: 'zero-q-prompt-engineering.html', title: "「提示詞工程」是工程師才需要學的嗎？", desc: "你可能聽過「提示詞工程師」這個職業，甚至聽説過很高的薪水。一個「説話技巧」，憑什麼配得上「工程」兩個字？", tag: '交互' , navTitle: "「提示詞工程」是工程師才需要學的嗎？"},
            { file: 'zero-q-model-agent-app.html', title: "模型、Agent、AI 應用是什麼關係？", desc: "新聞裏一會兒説「XX 發佈新模型」，一會兒説「Agent 元年」，一會兒又是各種 AI App——這三個詞到底誰是誰？", tag: '交互' , navTitle: "模型、Agent、AI 應用是什麼關係？"},
            { file: 'zero-q-agent.html', title: "Agent 到底強在哪？為什麼大家都在説它", desc: "上一頁説 Agent 是「裝上輪子的整車」。這一頁看它實際跑起來什麼樣——同一件事，聊天式 AI 和 Agent 的差距在哪。", tag: '交互' , navTitle: "Agent 到底強在哪？為什麼大家都在説它"},
            { file: 'zero-q-skill.html', title: "最近很火的 Skill 到底是什麼？", desc: "刷到過「給 AI 裝技能」「Skill 生態爆發」這類説法嗎？聽着高深，其實這可能是 AI 圈裏最容易理解的一個新詞——你小時候抄在課本角落的小抄，就是它的全部原理。", tag: '交互' , navTitle: "最近很火的 Skill 到底是什麼？"},
            { file: 'zero-q-vibe-coding.html', title: "Vibe Coding 是什麼？不會寫程式碼也能做軟件嗎？", desc: "最近總刷到「一句話做了個 App」「零基礎做出小工具」這類帖子，這種玩法有個名字，叫 Vibe Coding。它到底靠不可靠？可靠到什麼程度？這一頁給你交個底。", tag: '交互' , navTitle: "Vibe Coding 是什麼？不會寫程式碼也能做軟件嗎？"},
            { file: 'zero-q-china-models.html', title: "國產大模型有哪些？該怎麼選？", desc: "先説一個可能讓你意外的事實：在全球用戶盲測的排行榜上，國產模型早就不是「追趕者」了——好幾家排在世界前列。真正的問題不是「哪家最強」，而是「你的場景適合哪家」。", tag: '交互' , navTitle: "國產大模型有哪些？該怎麼選？"},
            { file: 'zero-q-companies.html', title: "除了 OpenAI，還有哪些重要的 AI 公司？", desc: "新聞裏的名字太多記不住？其實常出場的主角就那麼幾位。先玩個配對遊戲，把「公司」和「代表作」對上號。", tag: '交互' , navTitle: "除了 OpenAI，還有哪些重要的 AI 公司？"},
          ],
        },
        {
          id: 't-zero-faq-basics',
          title: '小白三千問 · 概念掃盲',
          desc: '一頁一問：新聞高頻詞的零基礎版',
          lessons: [
            { file: 'zero-q-token.html', title: "Token 是什麼？為什麼 AI 按它收費？", desc: "帳單上寫着「按 Token 計費」，新聞裏動不動「百萬 Token」，這顆「Token」到底是個什麼東西？這一頁帶你親手把一句話切開看看。", tag: '交互' , navTitle: "Token 是什麼？為什麼 AI 按它收費？"},
            { file: 'zero-q-context-window.html', title: "為什麼聊久了它會「忘事」？", desc: "第 1 輪明明説過的事，第 20 輪它答得像完全沒聽過。它沒壞，也沒敷衍你，只是那句話已經不在它眼前了。", tag: '交互' , navTitle: "為什麼聊久了它會「忘事」？"},
            { file: 'zero-q-reasoning.html', title: "「推理模型」「深度思考」是什麼？", desc: "很多 AI 應用裏都藏着一個「深度思考」開關。打開它，回答變慢了、帳單變貴了，換來的到底是什麼？", tag: '交互' , navTitle: "「推理模型」「深度思考」是什麼？"},
            { file: 'zero-q-parameters.html', title: "參數越多越聰明嗎？", desc: "發佈會上動不動「千億參數」「萬億參數」，數字一個比一個嚇人。這個「參數」到底是什麼？數字大，就一定更聰明嗎？", tag: '交互' , navTitle: "參數越多越聰明嗎？"},
            { file: 'zero-q-multimodal.html', title: "為什麼有的 AI「看不懂」圖片？", desc: "你可能遇到過：給 AI 發照片，它回「唔好意思，請用文字描述」。也見過能把照片裏的菜譜都認出來的。同樣是 AI，差在哪？", tag: '交互' , navTitle: "為什麼有的 AI「看不懂」圖片？"},
            { file: 'zero-q-finetune-vs-rag.html', title: "微調是什麼？和「餵資料」有什麼區別？", desc: "老闆説「把公司資料餵給 AI」，供應商説「給你們微調一個專屬模型」，聽着像一回事，報價能差出幾百倍。這一頁用「上課」和「開卷考試」兩個比方，幫你把這筆帳算清楚。", tag: '交互' , navTitle: "微調是什麼？和「餵資料」有什麼區別？"},
            { file: 'zero-q-knowledge-base.html', title: "企業都在建的「知識庫」是什麼？", desc: "開會總聽到「我們要建知識庫」「接一下 RAG」，聽着像什麼大工程。其實它就是給 AI 配了一個隨用隨查的書架：考試可以開卷了，還得把翻到的那頁指給你看。", tag: '交互' , navTitle: "企業都在建的「知識庫」是什麼？"},
            { file: 'zero-q-acronyms.html', title: "GPT、LLM、AIGC…這些縮寫怎麼分？", desc: "新聞裏一句話能塞四五個縮寫，個個都眼熟，個個都説不清。別慌，這一頁用一局配對小遊戲加一張關係圖，幫你把它們各歸各位。", tag: '交互' , navTitle: "GPT、LLM、AIGC…這些縮寫怎麼分？"},
            { file: 'zero-q-nvidia-gpu.html', title: "英偉達為什麼那麼值錢？", desc: "一家「賣顯卡的」，市值能排進全球最前列，很多人第一反應是看不懂。看懂它只需要兩個畫面：一場淘金潮，和一場算術比賽。", tag: '交互' , navTitle: "英偉達為什麼那麼值錢？"},
          ],
        },
        {
          id: 't-zero-faq-myth',
          title: '小白三千問 · 祛魅打假',
          desc: '一頁一問：拆穿吹牛話術與常見誤解',
          lessons: [
            { file: 'zero-q-train-or-prompt.html', title: "『我訓了個模型』到底訓了什麼？", desc: "飯局上總有人舉着酒杯説「我最近訓了個模型」。這句話的水分可以從零到百分之九十九，這一頁幫你聽出他到底幹了什麼，順便學會三句能讓全桌安靜的追問。", tag: '交互' , navTitle: "『我訓了個模型』到底訓了什麼？"},
            { file: 'zero-q-jargon-translator.html', title: "AI 圈黑話翻譯器", desc: "發佈會、朋友圈、新聞稿裏的 AI 話術，水分普遍不小。這一頁把最常見的八句拿出來逐句翻譯成人話，每句配一個含金量檔位。看完你會發現：話術並不高深，只是沒人給你翻譯過。", tag: '交互' , navTitle: "AI 圈黑話翻譯器"},
            { file: 'zero-q-opensource-free.html', title: "『開源模型』等於免費嗎？", desc: "新聞裏説某模型「開源了」，評論區一片歡呼「免費用上頂級 AI」。先別急着歡呼，AI 圈的「開源」和你理解的免費，中間隔着好幾層意思，這一頁把它們一層層剝開。", tag: '交互' , navTitle: "『開源模型』等於免費嗎？"},
            { file: 'zero-q-benchmark.html', title: "『跑分第一』的模型，為什麼用起來不行？", desc: "刷到「新模型霸榜」的新聞，興沖沖換過去，結果寫個週報還沒原來的順手。你沒用錯，榜單也沒造假，只是榜單測的和你要的，從來就沒對齊過。", tag: '交互' , navTitle: "『跑分第一』的模型，為什麼用起來不行？"},
            { file: 'zero-q-ai-learning.html', title: "AI 越聊越懂我，是它在學習嗎？", desc: "用了一陣子 AI，你可能有過這種感覺：它記得你住哪、愛吃什麼，越聊越貼心，像在慢慢了解你。它真的在學習進化嗎？答案有點意外：它一個字都沒學進去。", tag: '交互' , navTitle: "AI 越聊越懂我，是它在學習嗎？"},
            { file: 'zero-q-ai-detector.html', title: "AI 檢測器説「這是 AI 寫的」，可信嗎？", desc: "交了論文被判「AI 生成率過高」，認真寫的報告被同事懷疑是機器代筆… 這種檢測結果到底值幾分信任？先別急着喊冤，玩一局小遊戲，你馬上就有答案。", tag: '交互' , navTitle: "AI 檢測器説「這是 AI 寫的」，可信嗎？"},
            { file: 'zero-q-prompt-course.html', title: "「提示詞秘籍」值得買嗎？", desc: "「獨家萬能模板，限時特價」「學完 AI 副業月入過萬」… 有冇刷過呢類廣告？掏錢之前，我們把一張典型的宣傳單逐條拆開，給每個賣點蓋個章。", tag: '交互' , navTitle: "「提示詞秘籍」值得買嗎？"},
            { file: 'zero-q-randomness.html', title: "同一個問題，為什麼每次答案不一樣？", desc: "昨天問它給奶茶店起名，回了三個文藝範；今天原封不動再問一遍，畫風全變。它是記性差，還是在敷衍你？都沒有。點幾下按鈕，你就能親眼看到它的每個字是怎麼來的。", tag: '交互' , navTitle: "同一個問題，為什麼每次答案不一樣？"},
            { file: 'zero-q-ai-customer-service.html', title: "AI 客服為什麼那麼蠢？", desc: "你可能也納悶過：同一個時代，聊天 AI 已經聰明得像個可靠同事，可點開購物軟件的客服，對面那位還在一本正經地裝傻。這事其實説得通，看完你就知道它蠢在哪、怎麼治。", tag: '交互' , navTitle: "AI 客服為什麼那麼蠢？"},
            { file: 'zero-q-siri-vs-chatgpt.html', title: "Siri 和 ChatGPT 是一種東西嗎？", desc: "都叫 AI 助手，一個陪了我們十幾年，敬業地重複着「抱歉，我沒聽懂」；一個橫空出世，什麼都能聊。它們看起來是同行，用的卻是兩代技術。這一頁帶你看清差在哪。", tag: '交互' , navTitle: "Siri 和 ChatGPT 是一種東西嗎？"},
          ],
        },
        {
          id: 't-zero-faq-money',
          title: '小白三千問 · 花錢與安全',
          desc: '一頁一問：費用、帳號與隱私',
          lessons: [
            { file: 'zero-q-free-vs-paid.html', title: "免費的 AI 夠用嗎？什麼時候值得付費？", desc: "現在打開任何一個 AI 產品，免費就能聊得很開心。那付費版到底多了什麼？這一頁帶你把免費版拆開看一看，再幫你對號入座，算算這筆錢值得花嗎。", tag: '交互' , navTitle: "免費的 AI 夠用嗎？什麼時候值得付費？"},
            { file: 'zero-q-api-vs-membership.html', title: "API 是什麼？和開會員有什麼區別？", desc: "總看到有人説「充 key」「調 API」，聽着像圈內黑話。其實它和你每月訂的會員一樣，都是在給 AI 付錢，只是兩種完全不同的付錢方式。這一頁用一個買菜的類比講明白。", tag: '交互' , navTitle: "API 是什麼？和開會員有什麼區別？"},
            { file: 'zero-q-image-cost.html', title: "生成一張圖，為什麼比聊一次天貴幾十倍？", desc: "很多 AI 應用聊天隨便聊，一到生圖就要收費、限次數。不是產品小氣——是圖片在成本上真的是「另一個物種」。", tag: '交互' , navTitle: "生成一張圖，為什麼比聊一次天貴幾十倍？"},
            { file: 'zero-q-video-cost.html', title: "AI 生成影片為什麼這麼貴？", desc: "上一頁説一張圖兩三毛。影片呢？按秒計價，一秒一塊五到五塊錢——生成一條 10 秒的短影片，夠你和 AI 聊上萬句。為什麼？", tag: '交互' , navTitle: "AI 生成影片為什麼這麼貴？"},
            { file: 'zero-q-relay.html', title: "什麼是 API 中轉站？為什麼我們不太推薦？", desc: "如果你開始折騰 AI 工具，早晚會看到這樣的廣告：「GPT / Claude API 三折起，即買即用」。它們叫「中轉站」。先説清楚：不是説賣家都是壞人——而是這個結構本身，有幾個你值得先了解的風險。", tag: '交互' , navTitle: "什麼是 API 中轉站？為什麼我們不太推薦？"},
            { file: 'zero-q-reverse-proxy.html', title: "「反代帳號」「共享號」是什麼？", desc: "「ChatGPT Plus 拼車，9.9 一個月」「Claude 會員共享號，秒發」——比官方價便宜十幾倍，聽着很香。這一頁把「香」背後的帳算給你看。", tag: '交互' , navTitle: "「反代帳號」「共享號」是什麼？"},
            { file: 'zero-q-privacy.html', title: "我的聊天記錄會被拿去訓練嗎？", desc: "你和 AI 説過的話，有沒有可能變成它的「教材」？這一頁用一張流向圖講清數據到底去了哪，再告訴你開關在哪類設定裏找、什麼內容堅決別發。", tag: '交互' , navTitle: "我的聊天記錄會被拿去訓練嗎？"},
          ],
        },
        /* 放在小白三千问之后：本主题的「你的下一步」是零基础入门篇的收官分流页，
           要紧挨大模型原理篇，才接得上它「进入大模型原理篇」的按钮。 */
        {
          id: 't-zero-trust',
          title: '什麼能放心交給它',
          desc: '一套三秒鐘的信任判斷法',
          lessons: [
            { file: 'zero-6.html', title: "哪些活能放心交給它，哪些最好多確認一步", desc: "你已經知道它很能幹，也知道它會一本正經地出錯。最後一個關鍵問題：遇到一件具體的事，點樣用三秒判斷可唔可以交俾 AI？先玩 8 道判斷題，法則就在你的答案裏。", tag: '交互' , navTitle: "哪些活能放心交給它，哪些最好多確認一步"},
            { file: 'zero-final.html', title: "六個直覺都在了，接下來去哪？", desc: "恭喜你走完零基礎入門篇。你現在對 AI 的理解，已經超過了大多數「用了很久但從沒想過它是什麼」的人。這一頁先盤點行囊，再幫你找到最適合你的下一步。", tag: '收官' },
          ],
        },
      ],
    },
    {
      id: 'p1',
      num: '大模型原理',
      title: '大模型是怎麼來的',
      desc: '從訓練數據、Token 到 GPT 躍進，再到大模型幻覺的成因與四種應對方案，建立對大模型底層原理的完整認知。',
      color: '#0066ff',
      group: 'main',
      routes: ['pro', 'pm', 'build'],   // 原理整章進「用到專業」：知道它為什麼會編，用起來才有判斷力
      topics: [
        {
          id: 't-basic',
          title: '基礎原理',
          desc: '訓練數據、訓練 vs 推理、詞表與注意力',
          lessons: [
            { file: 'training-data.html', title: "AI 的食物：訓練數據", desc: "想讓 AI 學會説話，先要餵給它數以萬億計的文字。它讀了人類寫過的絕大多數內容。", tag: '交互' , navTitle: "AI 的食物：訓練數據"},
            { file: 'train-vs-infer.html', title: "訓練 vs 推理：兩個完全不同的過程", desc: "很多人以為 AI 每次回答都在學習。實際上完全不是這麼回事。", tag: '概念' , navTitle: "訓練 vs 推理：兩個完全不同的過程"},
            { file: '1-2-vocab.html', title: "詞表與訓練", desc: "大模型學習的第一步：讀取人類提供的海量文本數據。", tag: '交互' },
            { file: '1-2-base.html', title: "Base 模型：Token 推 Token 機器", desc: "訓練結束後得到的原始模型，它只做一件事。", tag: '動畫' , navTitle: "Base 模型：Token 推 Token 機器"},
            { file: '1-2-gpt.html', title: "GPT 的躍進", desc: "PreTraining 為什麼改變了一切：從 CNN/RNN/BERT 到 GPT，大模型史上最重要的一步。", tag: '交互' , navTitle: "GPT 的躍進"},
          ],
        },
        {
          id: 't-chat',
          title: '從補全到對話',
          desc: '補全機器是如何變成聊天機器人的',
          lessons: [
            { file: '1-2-api.html', title: "chat/completions 之謎", desc: "明明是在和大模型對話，為什麼 OpenAI 的 API 路徑裏寫的是「補全」？這個命名背後，藏着對大模型本質的理解。", tag: '動畫' },
            { file: '1-2-fake-chat.html', title: "大模型的本質是補全，那如果我偽造一段聊天記錄讓它補全呢？", desc: "你唔係淨係識一個一個字咁吐出嚟？ 那我就構造一個格式：「呢段係未寫完嘅傾偈記錄，你嚟續寫助理嗰部分。」", tag: '動畫' },
            { file: '1-2-sft.html', title: "Chat Template + SFT：大模型終於學會「説話」", desc: "從補全機器到對話助手，差的就是這套訓練範式。", tag: '概念' },
            { file: '1-2-prompt-power.html', title: "為什麼用提示詞就夠了？答案在上下文窗口", desc: "PreTraining 之後：不用重新訓練，把任務描述餵進去就行。但為什麼？", tag: '交互' },
          ],
        },
        {
          id: 't-hallucination',
          title: '幻覺與四種應對',
          desc: '幻覺成因，以及 Prompt / RAG / Temperature / 評測四種緩解方案',
          lessons: [
            { file: '1-2-hallucination.html', title: "大模型幻覺 (Hallucination)", desc: "模型不知道事實，只是在做概率採樣。看它如何自信地編造：選擇一個案例，點擊「開始生成」，觀察幻覺如何在逐詞生成中產生。", tag: '案例' , navTitle: "大模型幻覺 (Hallucination)"},
            { file: '1-2-mitigation-prompt.html', title: "Prompt 工程：用指令約束幻覺", desc: "PM 視角：寫需求文檔、對接 AI 接口時，如何通過 System Prompt 減少模型編造。", tag: '概念' , navTitle: "Prompt 工程：用指令約束幻覺"},
            { file: '1-2-mitigation-rag.html', title: "RAG 檢索增強生成：讓模型「開卷答題」", desc: "PM 視角：什麼場景必須上 RAG？如何設計檢索流程？落地的坑在哪裏。", tag: '交互' , navTitle: "RAG 檢索增強生成：讓模型「開卷答題」"},
            { file: 'rag-advanced.html', title: "RAG 的代價與優化策略", desc: "每次 RAG 查詢都要額外花錢。不優化，成本會隨用量快速失控。", tag: 'PM 進階' , navTitle: "RAG 的代價與優化策略"},
            { file: '1-2-mitigation-temp.html', title: "應對 3：Temperature & Top-P", desc: "PM 視角：API 接入時如何配置採樣參數，不同業務場景的推薦值與風險邊界。手段 03 / 04 · 預防。", tag: '交互' , navTitle: "應對 3：Temperature & Top-P"},
            { file: '1-2-mitigation-eval.html', title: "應對 4：評測 + 人工審核", desc: "PM 視角：如何量化幻覺風險、設計分級審核流程、讓「人在迴路中」成為產品安全網。手段 04 / 04 · 檢測 + 糾正。", tag: '概念' , navTitle: "應對 4：評測 + 人工審核"},
          ],
        },
        {
          id: 't-summary1',
          title: '篇章彙總',
          desc: '大模型原理篇核心知識回顧',
          lessons: [
            { file: 'summary-1.html', title: "彙總（上）· 大模型是什麼 + 幻覺", desc: "大模型原理 · 總結回顧 · 上半頁：大模型基礎：它是什麼，為何會幻覺。", tag: '彙總' , navTitle: "彙總（上）· 大模型是什麼 + 幻覺"},
            { file: 'summary-1b.html', title: "彙總（下）· 緩解策略 + 決策框架", desc: "大模型原理 · 總結回顧 · 下半頁：如何緩解幻覺，以及 AI PM 該有的決策框架。", tag: '彙總' , navTitle: "彙總（下）· 緩解策略 + 決策框架"},
          ],
        },
        {
          id: 't-build1',
          title: '你現在能做什麼',
          desc: '學完這章，你今天能動手做什麼',
          lessons: [
            { file: 'build-1.html', title: "別停在「我懂了」，先把那件事定下來", desc: "原理講完，最容易發生的事是：你覺得學到了很多，但合上電腦，手上什麼都沒多。所以從這裏開始，每章結尾都有這麼一頁，只回答一個問題：學完這章，你今天能動手做什麼。", tag: '實戰' },
          ],
        },
        {
          id: 't-interview1',
          title: '他們會這樣考你',
          desc: '面試官、老闆、技術同事會怎樣考察本章內容',
          lessons: [
            { file: 'interview-1.html', title: "大模型基礎 · 30 道靈魂拷問", desc: "大模型原理篇學完了，懂了和能講出來之間還差一場實戰。這 30 個問題來自三個真實場景，先自己開口回答，再看框架。", tag: '考察' , navTitle: "大模型基礎 · 30 道靈魂拷問"},
          ],
        },
      ],
    },
    {
      id: 'p2',
      num: 'Harness 核心',
      title: 'AI Harness',
      desc: '上下文工程、Prompt 進階與安全、Agent 設計與工具調用、五層成本優化體系，把大模型真正落地為可用產品。',
      color: '#7c3aed',
      group: 'main',
      routes: ['use', 'pro', 'pm', 'build'],   // Harness 核心篇有三個主題任何人都用得上，篇章並集含 use
      topics: [
        {
          id: 't-context',
          title: '上下文工程',
          desc: 'AI 的工作記憶與溢出處理',
          lessons: [
            { file: '5-1.html', title: "上下文窗口：AI 的工作記憶", desc: "模塊五 · 上下文工程 · 第 1 頁。拖動下方滑塊，親自體驗窗口溢出。", tag: '交互' , navTitle: "上下文窗口：AI 的工作記憶"},
            { file: '5-2.html', title: "上下文溢出：三種處理策略", desc: "模塊五 · 上下文工程 · 第 2 頁。點擊策略，下方逐步演示效果。", tag: '交互' , navTitle: "上下文溢出：三種處理策略"},
          ],
        },
        {
          id: 't-prompt',
          title: 'Prompt 工程',
          desc: 'Markdown、角色扮演、進階技巧與輸出格式',
          lessons: [
            { file: '6-0a.html', title: "為什麼大模型選擇 Markdown", desc: "模塊六 · Prompt Engineering · 前置。一步步推演 Markdown 為何勝出。", tag: '動畫' , navTitle: "為什麼大模型選擇 Markdown"},
            { file: '6-0b.html', title: "Markdown 語法與工程化渲染", desc: "模塊六 · Prompt Engineering · 前置。點擊語法元素看源碼/渲染對比，再看前端渲染方案選型。", tag: '交互' , navTitle: "Markdown 語法與工程化渲染"},
            { file: '6-1.html', title: "你講咩，佢就變咩", desc: "通過 System Prompt 指定角色，同一個模型可以變成完全不同的助手。角色扮演是最基礎也最有效的 Prompt 技巧。點擊下面的角色和格式，觀察輸出如何變化。", tag: '交互' , navTitle: "你講咩，佢就變咩"},
            { file: '6-2.html', title: "Prompt 進階技巧", desc: "掌握 4 個技巧，讓模型回答質素翻倍。點擊技巧，下方即時演示好壞對比。", tag: '交互' },
            { file: '6-3.html', title: "輸出格式取捨", desc: "沒有最好的格式，只有最適合場景的格式。流式返回時，格式選擇的影響格外明顯。選一個格式，點擊「開始流式演示」，觀察 Token 生成的體驗差異。", tag: '交互' },
            { file: '6-4.html', title: "流式返回與格式配合", desc: "LLM 是逐 Token 輸出的。同一個響應內容，格式不同，流式體驗完全不同。選擇場景後點擊播放，觀察三種格式的渲染差異。", tag: '交互' , navTitle: "流式返回與格式配合"},
          ],
        },
        {
          id: 't-security',
          title: 'Prompt 安全',
          routes: ['pm', 'build'],   // Prompt 注入與防護，做產品才需要
          desc: 'Prompt Injection 原理、案例與防禦實戰',
          lessons: [
            { file: 'prompt-attack.html', title: "Prompt Injection：為什麼會被攻擊", desc: "Prompt 注入是大模型應用面臨的最嚴重安全威脅之一。它和 SQL 注入同源：數據和指令混在同一個通道裏。", tag: '安全' , navTitle: "Prompt Injection：為什麼會被攻擊"},
            { file: 'prompt-attack-cases.html', title: "Prompt Injection：12 個攻擊案例", desc: "12 個經過真實驗證的攻擊案例，分為 5 大類型。選一個案例，切換「中招版 vs 防禦版」，觀察同樣的攻擊在有無防護下的兩種結局。", tag: '安全' , navTitle: "Prompt Injection：12 個攻擊案例"},
            { file: 'prompt-defense.html', title: "Prompt 防禦：三層攔截實戰", desc: "以真實產品 MoodVerse 為例，看輸入過濾、System Prompt 安全約束、輸出泄漏檢測三層如何層層攔截 Prompt 注入。點擊標籤頁逐步瞭解，第三個標籤可親手模擬攻擊全鏈路。", tag: '實戰' , navTitle: "Prompt 防禦：三層攔截實戰"},
            { file: 'ai-safety-redlines.html', title: "AI 安全紅綫：四條底綫", desc: "企業使用 AI 的四條不可觸碰的底綫。記住這四條，就能避開 90% 的安全事故。點擊任意紅綫卡片查看詳情。踩到任何一條 = 安全事故。", tag: '安全' , navTitle: "AI 安全紅綫：四條底綫"},
            { file: 'ai-safety-governance.html', title: "風險分級與責任", desc: "AI 使用不是能用就行。按風險分級（L1/L2/L3）匹配管控強度，按責任鏈（使用者/審批人/管理者）明確誰擔責。點擊左側任意條目查看詳情。", tag: '安全' , navTitle: "風險分級與責任"},
          ],
        },
        {
          id: 't-agent',
          title: 'Agent 工程',
          routes: ['pm', 'build'],   // Agent 工程，產品路綫要懂能力邊界
          desc: 'Agent 能力、工具調用、ReAct、記憶、Skill 與腳手架',
          lessons: [
            { file: '7-1.html', title: "Agent：能幹活的 AI", desc: "點擊能力卡片，右側逐步演示 Agent 在真實場景中的執行過程", tag: '交互' , navTitle: "Agent：能幹活的 AI"},
            { file: '7-2.html', title: "工具調用的秘密", desc: "模型不會真的執行程式碼，它只是輸出一段結構化文字，框架程式碼負責解析並執行。向下滾動，自動追蹤完整調用鏈路。", tag: '交互' , navTitle: "工具調用的秘密"},
            { file: '7-2a.html', title: "一次對話背後的 5 條消息", desc: "左邊：用戶看到的介面 ｜ 右邊：API 裏真正發生的。向下滾動，自動演示一次查天氣背後發生了什麼。", tag: '深入' , navTitle: "一次對話背後的 5 條消息"},
            { file: '7-2b.html', title: "工具描述的學問", desc: "同一個任務，左邊失敗，右邊成功，差別只在描述。選擇一個實驗場景，點擊運行看對比。", tag: '深入' },
            { file: '7-2c.html', title: "多工具編排：併發 vs 串行", desc: "同一輪返回 3 個工具調用，執行順序點樣揀？選擇模式，點擊演示，觀察時間差異。", tag: '深入' , navTitle: "多工具編排：併發 vs 串行"},
            { file: '7-2d.html', title: "MCP 協議：工具的 USB 接口", desc: "USB 之前每台設備要專屬數據綫；MCP 之前每個 Agent 要專屬對接程式碼。", tag: '深入' , navTitle: "MCP 協議：工具的 USB 接口"},
            { file: '7-3.html', title: "ReAct 實戰：當 Agent 卡住了", desc: "ReAct 循環：思考 → 行動 → 觀察，循環往復。但如果模型對參數格式不瞭解，它會反覆猜測，卡在同一個地方打轉。向下滾動，自動追蹤真實失敗過程。", tag: '動畫' , navTitle: "ReAct 實戰：當 Agent 卡住了"},
            { file: '7-3a.html', title: "短期記憶 = 上下文窗口", desc: "上下文窗口就是模型的工作台：模型能看到的一切，都必須放在這張桌子上。向下滾動，觀察工作台如何被填滿。", tag: '深入' , navTitle: "短期記憶 = 上下文窗口"},
            { file: '7-3b.html', title: "上下文壓縮：四層防綫", desc: "拖動滑塊模擬對話增長，觀察壓縮如何延長上下文壽命。", tag: '深入' , navTitle: "上下文壓縮：四層防綫"},
            { file: '7-3c.html', title: "長期記憶：向量檢索", desc: "讓 Agent 記住上個月的事：通過向量檢索，把用戶偏好、項目配置、歷史 Bug 注入當前對話。", tag: '深入' , navTitle: "長期記憶：向量檢索"},
            { file: 'vector-db-1.html', title: "從 Embedding 到 Milvus", desc: "先建立直覺：模型把含義變成座標，Milvus 負責在海量座標中快速找到“意思最接近”的內容。", tag: '深入' },
            { file: 'vector-db-2.html', title: "Milvus 心智模型", desc: "把新術語映射到熟悉的“表、列、行”，再補上向量索引與記憶體載入兩個關鍵概念。", tag: '深入' },
            { file: 'vector-db-3.html', title: "Milvus 實操", desc: "用一套一致的集合名和真實文本 Embedding，跑通寫入、檢索與刪除；程式碼假定本地 Milvus 已在 19530 端口運行。", tag: '實戰' },
            { file: 'vector-db-4.html', title: "從檢索到 RAG", desc: "Search 返回“可能相關的片段”，RAG 還要把它們變成有來源、有邊界、能被評測的回答依據。", tag: '深入' },
            { file: '7-4a.html', title: "ReAct 循環：思考 → 行動 → 觀察", desc: "Reasoning + Acting：Agent 靠循環完成任務，一問一答只是其中一輪。向下滾動，自動演示一個複雜任務如何經歷 14 輪循環。", tag: '深入' , navTitle: "ReAct 循環：思考 → 行動 → 觀察"},
            { file: '7-4b.html', title: "Agent 卡死的 5 種模式", desc: "點擊下方卡片選擇一種故障模式 → 播放故障模擬 → 對比加了防護後的表現。", tag: '深入' , navTitle: "Agent 卡死的 5 種模式"},
            { file: '7-4c.html', title: "權限與安全", desc: "Agent 可以做到啲咩、唔可以做到啲咩？切換三種權限模式，觀察同一批操作的不同處理方式。", tag: '深入' },
            { file: '7-5.html', title: "Skill：讓 Agent 少走彎路", desc: "選擇一個場景，演示自動播放，對比「差循環」和「好循環」的兩種執行方式。", tag: '交互' , navTitle: "Skill：讓 Agent 少走彎路"},
            { file: '7-5a.html', title: "Skill 的本質", desc: "給 Agent 裝上「操作手冊」：沒有 Skill 的 Agent 像新員工摸索，有 Skill 的 Agent 像老手照章執行。", tag: '深入' },
            { file: '7-5b.html', title: "解剖一個示例 Skill", desc: "以 示例助手 發版助手為例：點擊每個區域展開詳情，看 Agent 如何讀取並執行一個 Skill。", tag: '深入' },
            { file: '7-4.html', title: "腳手架工程：從試驗品到產品", desc: "左側模擬同一個「查機票 + 訂酒店」任務在有無腳手架時的差距，滾動到演示區自動播放；右側點擊查看 5 大能力詳解。", tag: '交互' , navTitle: "腳手架工程：從試驗品到產品"},
            { file: '7-6a.html', title: "5 道工程護欄", desc: "沒有護欄的 Agent = 沒有剎車的跑車。點擊左側每道護欄，查看場景還原與有無護欄的對比。", tag: '深入' , navTitle: "5 道工程護欄"},
            { file: '7-6b.html', title: "多 Agent 協作：一個人幹不完，就派團隊", desc: "主 Agent 拆任務 → 子 Agent 各司其職 → 彙總交付。只讀任務並行加速，寫入任務串行保安全。", tag: '深入' },
            { file: '7-6c.html', title: "可觀測性：Agent 喺度做緊咩、花咗幾多錢", desc: "事件流 + 統計面板 · 即時監控 Agent 全生命週期。點擊「模擬一次任務」，看一個真實任務的完整事件流。", tag: '深入' },
            { file: '7-summary.html', title: "Agent 工程全景圖", desc: "工具、記憶、執行、工程四大支柱的完整知識地圖 · 共 14 個知識點。", tag: '彙總' },
          ],
        },
        {
          id: 't-cost',
          title: '成本優化與選型',
          routes: ['pm', 'build'],   // 成本與選型，產品路綫的剛需
          desc: 'KV Cache、緩存、圖片 Token、語法/語義/輸出層優化與模型選型',
          lessons: [
            { file: '8-1.html', title: "多輪對話點解越來越貴？", desc: "LLM 按輸入 Token 數計費。每一輪對話，都要把所有歷史記錄重新發給模型：歷史越長，Token 越多，費用越高。拖動滑塊模擬費用累積。", tag: '交互' , navTitle: "多輪對話點解越來越貴？"},
            { file: '8-2.html', title: "KV Cache：用空間換時間", desc: "每輪對話，模型都要對所有歷史 Token 做 Attention 計算。KV Cache 把已算過的 K/V 矩陣緩存下來，下輪只計算新增 Token。", tag: '交互' , navTitle: "KV Cache：用空間換時間"},
            { file: '8-2b.html', title: "顯式緩存：實戰對比", desc: "一行程式碼，保證命中。生產環境必須用顯式緩存：隱式緩存在分佈式架構下不可靠。", tag: '交互' , navTitle: "顯式緩存：實戰對比"},
            { file: '8-3.html', title: "動態時間戳：最貴的 System Prompt", desc: "一個小小的設計錯誤，可以讓你的 KV Cache 完全失效，每輪對話成本翻倍：在 System Prompt 裏寫動態時間。", tag: '反例' , navTitle: "動態時間戳：最貴的 System Prompt"},
            { file: '8-4.html', title: "綜合成本優化", desc: "單一優化效果有限。分層組合策略可將 AI 成本降低 70–90%。點擊下方策略卡片，即時觀察成本條的變化。", tag: '系統設計' , navTitle: "綜合成本優化"},
            { file: '8-5.html', title: "圖片 Token：像素也在燒錢", desc: "多模態模型不按「一張圖」計費，而是把圖片切成像素塊換算成 Token。拖動滑塊改變解像度，即時看 Token 成本變化。", tag: '多模態' , navTitle: "圖片 Token：像素也在燒錢"},
            { file: '8-5b.html', title: "圖片 Token：按任務匹配解像度", desc: "不同任務對圖片細節要求不同，用最低解像度滿足任務 = 最省錢。選一個任務類型，看推薦的解像度方案。", tag: '多模態' },
            { file: '8-6.html', title: "語法層優化：寫給機器的提示詞，不要排版", desc: "格式性 Token 最高佔提示詞 13–20%。提示詞是寫給機器的指令，不是給人看的文檔。那些 **加粗**、JSON 大括號、縮進換行…都是在花錢買格式。", tag: '提示詞工程' , navTitle: "語法層優化：寫給機器的提示詞，不要排版"},
            { file: '8-7.html', title: "語義層優化：不要把上下文窗口當垃圾桶", desc: "資訊密度越高 → 注意力越集中 → 效果越好。三個語義層策略，讓每個 Token 都有價值。", tag: 'RAG' , navTitle: "語義層優化：不要把上下文窗口當垃圾桶"},
            { file: '8-8.html', title: "輸出層 + KV Cache 進階：控制輸出 = 控制成本", desc: "輸出 Token 比輸入貴 3–5 倍。點擊下方技巧切換互動演示，體驗三個輸出層技巧和兩個 KV Cache 進階陷阱。", tag: '架構' , navTitle: "輸出層 + KV Cache 進階：控制輸出 = 控制成本"},
            { file: 'cost-eval.html', title: "模型選型：能力 vs 成本的權衡", desc: "優化做完了，還需要選對模型。按一下下方問題切換視角，看散點圖、月費對比和場景決策框架。", tag: '選型' },
            { file: 'engineering-philosophy.html', title: "大道至簡：堅守第一性原理", desc: "AI Harness · 收官思考。四步回到原點，看清一切 Harness 手段的本質。", tag: '收官' , navTitle: "大道至簡：堅守第一性原理"},
          ],
        },
        {
          id: 't-tips',
          title: '實用技巧',
          desc: '人機邊界、提問方式、迭代方法、場景判斷與幻覺驗證，一份用 AI 的日常指南',
          lessons: [
            { file: 'ai-tips-boundary.html', title: "人機知識邊界：四象限策略", desc: "先判斷問題在哪個區，再決定怎麼用 AI。每次用 AI 之前，先想一個問題：呢個答案，我驗唔驗證到？", tag: '技巧' , navTitle: "人機知識邊界：四象限策略"},
            { file: 'ai-tips-context.html', title: "好提問 vs 壞提問：上下文決定一切", desc: "同一個 AI，提問方式不同，輸出天差地別。點擊場景切換對比。", tag: '技巧' },
            { file: 'ai-tips-verify.html', title: "AI 講嘅信得過？", desc: "找出 AI 編造的內容。點擊你認為有問題的條目，然後揭曉答案。", tag: '技巧' , navTitle: "AI 講嘅信得過？"},
            { file: 'ai-tips-iterate.html', title: "迭代的藝術：知道何時收手", desc: "跟着一個真實的文案迭代過程走 4 輪：前 3 輪質素持續上升，第 4 輪畫蛇添足。演示會自動逐輪播放，注意觀察質素儀表的變化。", tag: '技巧' , navTitle: "迭代的藝術：知道何時收手"},
            { file: 'ai-tips-scenarios.html', title: "場景速查：什麼時候放心用", desc: "9 個常見場景，按風險分成三檔。點擊左側場景卡片查看詳細指南，也可以按風險等級篩選。", tag: '技巧' , navTitle: "場景速查：什麼時候放心用"},
          ],
        },
        {
          id: 't-summary2',
          title: '課程收官',
          routes: ['pm', 'build'],   // 篇章收官，跟着正課走
          desc: 'Harness 核心篇回顧 + 完整課程總結',
          lessons: [
            { file: 'summary-2.html', title: "彙總（上）· Prompt 工程 + Agent", desc: "Harness 核心篇總結回顧 · 上半頁（1 / 2）：設計 Message List 的核心技能，以及讓 AI 從\"説\"到\"做\"的 Agent 工程。", tag: '彙總' , navTitle: "彙總（上）· Prompt 工程 + Agent"},
            { file: 'summary-2b.html', title: "彙總（下）· 成本優化 + PM 視角", desc: "Harness 核心篇總結回顧 · 下半頁（2 / 2）：五層成本優化體系，以及 AI PM 帶走的完整工程視角。", tag: '彙總' , navTitle: "彙總（下）· 成本優化 + PM 視角"},
            { file: 'summary-final.html', title: "課程總結 · 產品經理的第一節 AI 課", desc: "今天學了什麼？帶走這四件事：大模型基礎、Prompt 工程、Agent 與成本、安全合規。", tag: '彙總' , navTitle: "課程總結 · 產品經理的第一節 AI 課"},
            { file: 'summary-final-1.html', title: "總結（上）· 原理 + Harness", desc: "課程總結上半頁（1 / 2）：模組一「大模型是怎麼來的」建立認知直覺，模組二「Prompt 怎麼寫才管用」讓 AI 按你要的輸出。", tag: '彙總' , navTitle: "總結（上）· 原理 + Harness"},
            { file: 'summary-final-2.html', title: "總結（下）· 實戰 + 成本", desc: "課程總結下半頁（2 / 2）：模組三「AI 能幹什麼、多少錢」建立自動化與成本意識，模組四「安全合規與紅綫意識」知道產品該在何處設防。", tag: '彙總' , navTitle: "總結（下）· 實戰 + 成本"},
          ],
        },
        {
          id: 't-build2',
          title: '你現在能做什麼',
          routes: ['pm', 'build'],   // 落地清單，跟着正課走
          desc: '學完這章，你今天能動手做什麼',
          lessons: [
            { file: 'build-2.html', title: "寫一版提示詞，讓它連跑五次都能用", desc: "這一章你學了上下文、Prompt 技巧、Agent 和成本，知識點是全課最多的。但落到手上，第一件事只有一件：把 M0 定下的那個需求，寫成一版穩定的提示詞。穩定的意思是不挑運氣。", tag: '實戰' },
          ],
        },
        {
          id: 't-interview2',
          title: '他們會這樣考你',
          routes: ['pm', 'build'],   // 面試題，跟着正課走
          desc: '面試官、老闆、技術同事會怎樣考察本章內容',
          lessons: [
            { file: 'interview-2.html', title: "AI Harness · 30 道靈魂拷問", desc: "Harness 核心篇講的全是工程落地：上下文、Prompt、安全、Agent、成本。這 30 個問題來自三個真實場景，先自己開口回答，再看框架。", tag: '考察' , navTitle: "AI Harness · 30 道靈魂拷問"},
          ],
        },
      ],
    },
    {
      id: 'p3',
      num: '動手實戰',
      title: '實戰 · 從 Demo 到產品',
      desc: "以虛構的內容生產助手為教學示例，學習視覺生成、工具呼叫、上下文、記憶、提示詞組織、協作、權限與 MCP 整合；不代表方片已上線產品或專案業績。",
      color: '#059669',
      group: 'main',
      prereq: '建議先學過 Harness 核心',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-alice-intro',
          title: '開篇',
          desc: "以一個虛構的內容生產助手為教學示例，拆解從模型呼叫到可靠交付需要考慮的工程問題；不代表方片已經上線的產品。",
          lessons: [
            { file: '9-0.html', title: "從業務任務到可交付的 AI 工具", desc: "以一個虛構的內容生產助手為教學示例，拆解從模型呼叫到可靠交付需要考慮的工程問題；不代表方片已經上線的產品。", tag: '開篇' , navTitle: "從業務任務到可交付的 AI 工具"},
          ],
        },
        {
          id: 't-imagegen',
          title: 'AI 生圖',
          desc: '文生圖、墊圖、角色一致性、多模型降級與產品化',
          lessons: [
            { file: '9-1.html', title: "文生圖 vs 墊圖：兩種完全不同的事", desc: "用同一個虛構人物比較兩種生圖方式：沒有參考圖時外貌容易漂移；有參考圖時，以圖像約束人物特徵，再檢查場景與動作。", tag: '概念' , navTitle: "文生圖 vs 墊圖：兩種完全不同的事"},
            { file: '9-2.html', title: "用 AI 給 AI 寫 Prompt", desc: "用戶講「示例角色 喺露台發呆」。生圖模型需要的是一長段精確的視覺描述，光這句話遠遠不夠。中間有一個翻譯步驟：用 LLM 把人話翻譯成生圖語言。", tag: '實戰' },
            { file: '9-3.html', title: "角色一致性：最難的產品問題", desc: "讓同一個虛構人物在不同場景和服裝中保持一致，對照參考圖檢查外貌特徵與生成偏差。", tag: '案例' , navTitle: "角色一致性：最難的產品問題"},
            { file: '9-4.html', title: "模型會掛，然後呢？", desc: "喺 示例助手 裏，用戶講「幫我畫張圖」，但背後可能 Gemini 超時咗、Seedream 限流咗、GPT Image 都出錯咗。用戶唔關心邊個模型掛咗，佢只關心：圖到底出唔出到嚟？", tag: '實戰' , navTitle: "模型會掛，然後呢？"},
            { file: '9-5.html', title: "生圖的產品化清單", desc: "調通生圖介面只是開始。以教學示例為線索，檢查體驗、品質、工程與安全四類上線條件。", tag: '系統設計' , navTitle: "生圖的產品化清單"},
          ],
        },
        {
          id: 't-agentloop',
          title: 'Agent Loop',
          routes: ['build'],   // Agent Loop 實現細節
          desc: '生產級循環的控制、防護與流式體驗',
          lessons: [
            { file: '9-6.html', title: "教科書的 3 步 vs 真實的 N 步", desc: "教科書説 Agent 循環是「想→做→看」三步。但當你真正把 Agent 推上生產環境，每轉一圈要做的事比你想像的多得多。", tag: '概念' , navTitle: "教科書的 3 步 vs 真實的 N 步"},
            { file: '9-7.html', title: "為什麼 Agent 會卡死", desc: "實驗室裏的 Agent 死循環很好發現：控制台一刷就看到了。但生產環境的卡死更隱蔽：用戶唔會話「你嘅 Agent 死循環咗」，佢淨係會講「你嘅 AI 點解咁慢」或者「佢係咪傻咗」。", tag: '案例' , navTitle: "為什麼 Agent 會卡死"},
            { file: '9-8.html', title: "防呆設計：點樣令循環自己停低", desc: "知道 Agent 會點樣卡死，下一步就是設計防護。好的防呆是三層網，讓系統既不會失控，又不會輕易放棄。", tag: '實戰' , navTitle: "防呆設計：點樣令循環自己停低"},
            { file: '9-9.html', title: "流式體驗：別讓用戶乾等", desc: "Agent 在後台跑了 30 秒，用戶螢幕上面應該見到啲咩？同樣是等 30 秒，有沒有進度感，體驗天差地別。", tag: '交互' , navTitle: "流式體驗：別讓用戶乾等"},
            { file: '9-10.html', title: "一條消息背後的真實成本", desc: "用戶只發了一句話，但底層可能跑了 10+ 輪循環、產生幾十條 API 消息。當你打開帳單，可能會嚇一跳。", tag: '深入' , navTitle: "一條消息背後的真實成本"},
          ],
        },
        {
          id: 't-ctxmgmt',
          title: '上下文管理',
          routes: ['build'],   // 上下文管理實現細節
          desc: '對話越長越貴越笨：壓縮的藝術與取捨',
          lessons: [
            { file: '9-11.html', title: "對話越長越貴、越長越笨", desc: "每一輪對話都要把全部歷史重新發給模型：對話越長，費用越高、注意力越分散、離窗口上限越近。這三個問題決定了：上下文不能放任不管。", tag: '概念' , navTitle: "對話越長越貴、越長越笨"},
            { file: '9-12.html', title: "壓縮是一門取捨的藝術", desc: "上下文太長咗點算？全刪定全留都唔啱：有啲可以刪（舊工具輸出）、有啲唔可以刪（用戶原話）、有啲要花錢壓（全量摘要）。產品經理需要一個決策框架。", tag: '實戰' , navTitle: "壓縮是一門取捨的藝術"},
            { file: '9-13.html', title: "用戶講嘅話可唔可以刪？", desc: "AI 的輸出可以摘要、工具結果可以截斷，但用戶的原話刪了就回不來了。而且用戶一定會發現：「我明明講咗 xxx，你點解唔記得？」", tag: '概念' , navTitle: "用戶講嘅話可唔可以刪？"},
            { file: '9-14.html', title: "本地壓縮 vs LLM 壓縮", desc: "壓縮上下文有兩條路：本地處理（正則替換、截斷）零成本但粗糙，LLM 摘要有成本但精準。該點樣揀？答案係：兩條都用，但有先後順序。", tag: '深入' , navTitle: "本地壓縮 vs LLM 壓縮"},
          ],
        },
        {
          id: 't-memory',
          title: '長期記憶',
          routes: ['build'],   // 長期記憶實現細節
          desc: '讓 AI 認識你：記憶的提取、衝突與注入',
          lessons: [
            { file: '9-15.html', title: "上下文 ≠ 記憶", desc: "上下文窗口像白板：寫滿了就擦掉，對話結束就清空。長期記憶像筆記本：寫下的東西，下次打開還在。AI 產品需要兩套系統。", tag: '概念' },
            { file: '9-16.html', title: "咩值得記、咩唔值得記", desc: "用戶每天和 AI 聊幾十上百條消息。「嗯」「好的」「哈哈」佔了大半，真正有價值的偏好和事實可能只有幾條。記憶系統需要一個守門員。", tag: '實戰' , navTitle: "咩值得記、咩唔值得記"},
            { file: '9-17.html', title: "記憶衝突：用戶改主意點算", desc: "上個月講「鍾意咖啡」，今個月講「改飲茶喇」。兩條記憶打起上嚟：舊嘅要唔要刪？新嘅點樣存？背後有四種策略。", tag: '案例' , navTitle: "記憶衝突：用戶改主意點算"},
            { file: '9-18.html', title: "記憶注入的成本問題", desc: "記了 1000 條記憶，每次對話全塞進 system prompt？還是按需檢索相關的幾條？全量注入簡單但貴且噪聲多，按需檢索省錢但可能漏。", tag: '深入' , navTitle: "記憶注入的成本問題"},
          ],
        },
        {
          id: 't-prompteng',
          title: 'Prompt Harness',
          routes: ['build'],   // Prompt Harness 實現細節
          desc: '從字串到架構：分層、按需加載與 Skill 模塊化',
          lessons: [
            { file: '9-19.html', title: "System Prompt 不是一坨文本", desc: "生產級的 System Prompt 不是想到什麼寫什麼。它是分層管理的：身份層、環境層、工具層、行為層，各管各的，改一層不影響其他層。", tag: '架構' , navTitle: "System Prompt 不是一坨文本"},
            { file: '9-20.html', title: "不用的東西別給 AI 看", desc: "如果你有 100 個工具，全部描述塞進 System Prompt，光工具描述就佔幾萬 token。AI 和人一樣：給太多信息反而找不到重點。", tag: '實戰' , navTitle: "不用的東西別給 AI 看"},
            { file: '9-21.html', title: "Skill：可運營的 Prompt 模組", desc: "System Prompt 管我係邊個，Tool 管我可以做到啲咩，咁 Skill 管咩？佢管嘅係遇到某件事，點樣一步一步做好。檔案即配置，版本可追溯。", tag: '實戰' , navTitle: "Skill：可運營的 Prompt 模組"},
            { file: '9-22.html', title: "提示詞和緩存的微妙關係", desc: "KV Cache 的規則極其簡單：前綴一模一樣就命中，差一個字就全部重算。所以，往 System Prompt 裏插入任何動態內容，都可能讓緩存永遠打不中。", tag: '深入' , navTitle: "提示詞和緩存的微妙關係"},
          ],
        },
        {
          id: 't-multiagent',
          title: '多 Agent',
          routes: ['build'],   // 多 Agent 實現細節
          desc: '並行、腦暴、定時任務與協作成本',
          lessons: [
            { file: '9-23.html', title: "幾時先需要多個 Agent", desc: "不是越多 Agent 越好。大多數時候一個就夠了。但確實有三種場景，一個 Agent 獨木難支。搞清楚幾時先真係需要分工。", tag: '概念' , navTitle: "幾時先需要多個 Agent"},
            { file: '9-24.html', title: "併發的代價：誰能同時跑", desc: "「看」可以並行：多個搜索同時跑不會衝突。「改」必須排隊：兩個 Agent 同時改同一份檔案會出事。判斷一個操作能否併發，關鍵就一條：它是只讀的嗎？", tag: '實戰' , navTitle: "併發的代價：誰能同時跑"},
            { file: '9-25.html', title: "腦暴：讓多個 AI 吵架", desc: "和人類開會一樣：一個人想到死不如多個人獨立思考再彙總。腦暴模式就是把同一個問題扔給多個 Agent，讓它們各自回答，最後由主持人整合共識與分歧。", tag: '交互' , navTitle: "腦暴：讓多個 AI 吵架"},
            { file: '9-26.html', title: "定時任務的成本陷阱", desc: "讓 Agent 每小時整理一次新聞，聽起來簡單。但如果複用舊會話，上下文每次都在增長，24 小時後你的成本會爆炸。一個選擇就能讓月帳單差 10 倍。", tag: '反例' , navTitle: "定時任務的成本陷阱"},
          ],
        },
        {
          id: 't-security',
          title: '權限與安全',
          routes: ['build'],   // 權限與安全的落地實現
          desc: 'Agent 的繮繩：權限分級、審批與可觀測性',
          lessons: [
            { file: '9-27.html', title: "AI 該有多大的自由", desc: "給 AI 全部權限？它可能搞砸一切。每步都審批？用戶會瘋掉。權限設計是一條光譜：從完全自主到每步審批，中間還有三種選擇。", tag: '概念' , navTitle: "AI 該有多大的自由"},
            { file: '9-28.html', title: "彈窗太多用戶煩，不彈又不安全", desc: "如果 Agent 每做一步都彈窗讓你確認，你撳 5 次「允許」之後就想卸載。但如果咩都唔問就自己執行，刪錯咗檔案邊個負責？答案是：風險分級。", tag: '實戰' , navTitle: "彈窗太多用戶煩，不彈又不安全"},
            { file: '9-29.html', title: "Agent 做咗啲咩你知唔知", desc: "Agent 喺後台跑咗 3 分鐘：調咗幾個工具？花咗幾多 token？中間有冇出錯？如果你答唔到呢啲問題，你嘅 Agent 就係個黑盒。", tag: '架構' , navTitle: "Agent 做咗啲咩你知唔知"},
          ],
        },
        {
          id: 't-mcp',
          title: 'MCP 實戰',
          routes: ['build'],   // MCP 實戰程式碼
          desc: '工具生態的雙向連接：消費、提供與自配置',
          lessons: [
            { file: '9-30.html', title: "MCP 不只是「調工具」", desc: "大多數人理解 MCP 就是「等 AI 調外部工具」。但 MCP 協議是雙向的：示例助手 不僅能調別人的工具，也能讓 Cursor 等外部客户端來調用 示例助手 的能力。", tag: '概念' , navTitle: "MCP 不只是「調工具」"},
            { file: '9-31.html', title: "懶連接：不用別連", desc: "你註冊了 10 個 MCP 服務，啓動時全部連接一遍？如果其中 3 個掛了，啓動就卡住了。懶連接的思路很簡單：註冊 ≠ 連接，用到的時候再連。", tag: '實戰' , navTitle: "懶連接：不用別連"},
            { file: '9-32.html', title: "AI 自己加工具", desc: "用戶講「幫我查日曆」，但你仲未配日曆工具。傳統做法：報錯話「唔支援」。更好的做法：Agent 自己去配，問你一聲就得。", tag: '深入' , navTitle: "AI 自己加工具"},
          ],
        },
        {
          id: 't-summary3',
          title: '實戰收官',
          desc: '全景回顧與核心洞察',
          lessons: [
            { file: '9-summary.html', title: "實戰全景圖", desc: "動手實戰篇走到這裏，八個主題構成了一張完整的 AI 產品實戰地圖。每個主題都不是孤立的，它們共同回答一個問題：從 Demo 到產品，到底差咗啲咩？", tag: '彙總' },
            { file: '9-final.html', title: "聊天套殼 vs 真正的 Agent 產品", desc: "用戶看到的只是冰山一角：一個聊天框、幾次回覆。水面之下，是產品經理需要做的 100 個決策。這些決策的總和，就是聊天套殼和真正的 Agent 產品之間的距離。", tag: '收官' , navTitle: "聊天套殼 vs 真正的 Agent 產品"},
          ],
        },
        {
          id: 't-build3',
          title: '你現在能做什麼',
          desc: '學完這章，你今天能動手做什麼',
          lessons: [
            { file: 'build-3.html', title: "讓它從「會説」變成「會做」：接上第一個工具", desc: "提示詞能穩定產生草稿後，先接入一個可核驗、可撤銷或可人工接管的工具操作。", tag: '實戰' },
          ],
        },
        {
          id: 't-interview3',
          title: '他們會這樣考你',
          desc: '面試官、老闆、技術同事會怎樣考察本章內容',
          lessons: [
            { file: 'interview-3.html', title: "實戰 · 從 Demo 到產品 · 30 道靈魂拷問", desc: "動手實戰篇學完了，你已經知道 Demo 和產品之間隔着什麼。這 30 個問題來自三個真實場景，先自己開口回答，再看框架。", tag: '考察' , navTitle: "實戰 · 從 Demo 到產品 · 30 道靈魂拷問"},
          ],
        },
      ],
    },
    {
      id: 'p4',
      num: '工程進階',
      title: '進階 · AI 工程設計模式',
      desc: '基於 Anthropic 公開的 Claude Code 源碼與工程網誌，深入拆解生產級 Agent 的設計模式：上下文工程、工具設計、評測方法論、長運行 Agent、腦手分離架構與安全容器化。',
      color: '#dc2626',
      group: 'main',
      prereq: '建議先學過動手實戰',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-agent-patterns',
          title: 'Agent 設計模式',
          desc: 'Anthropic 官方總結的五種 Workflow + 自主 Agent',
          lessons: [
            { file: '10-1.html', title: "Workflow vs Agent：先搞清楚你要什麼", desc: "一個反直覺的觀點：最成功的 AI 實現，往往不是最複雜的那個。在動手搭 Agent 框架之前，先搞清楚你真正需要什麼。", tag: '設計模式' , navTitle: "Workflow vs Agent：先搞清楚你要什麼"},
            { file: '10-2.html', title: "五種 Workflow 模式", desc: "業界已驗證有效的五種 Workflow 編排模式。它們由簡到繁，每種解決特定類型的問題。不追求最複雜的，追求最合適的。", tag: '設計模式' },
            { file: '10-3.html', title: "從 Prompt 工程到上下文工程", desc: "當我們從單輪對話走向多步 Agent，僅僅優化 Prompt 已經遠遠不夠。真正的挑戰是：如何策展每一輪推理時送給模型的全部 Token。", tag: '方法論' , navTitle: "從 Prompt 工程到上下文工程"},
            { file: '10-4.html', title: "上下文的三板斧", desc: "當任務跨越多個上下文窗口，每個新窗口都會失憶。生產環境中已驗證三種策略來應對這個根本挑戰，讓 Agent 能在長任務中保持連貫和高效。", tag: '方法論' , navTitle: "上下文的三板斧"},
          ],
        },
        {
          id: 't-tool-design',
          title: '工具設計的藝術',
          desc: '如何為 Agent 寫出好工具：命名、描述、參數與 ACI',
          lessons: [
            { file: '10-5.html', title: "ACI：Agent-Computer Interface", desc: "HCI (人機互動) 領域已經研究了幾十年，但 Agent 和計算機之間的互動（ACI）才剛剛開始。實戰經驗表明：工具設計的質素，直接決定了 Agent 的能力上限。", tag: '設計模式' , navTitle: "ACI：Agent-Computer Interface"},
            { file: 'vector-db-5.html', title: "Milvus 作為 Agent 知識庫工具", desc: "讓 Agent 自己判斷何時需要企業資料；工具負責檢索，Agent 負責基於 ToolMessage 組織答案。", tag: '實戰' , navTitle: "Milvus 作為 Agent 知識庫工具"},
            { file: '10-6.html', title: "Think Tool：讓 AI 先想後做", desc: "Agent 在執行長工具鏈時，經常忘記前面的信息，或者在需要權衡多條規則時犯錯。實踐證明，給 Agent 一個停下來想一想的工具，就能大幅提升準確率。", tag: '深入' , navTitle: "Think Tool：讓 AI 先想後做"},
            { file: '10-7.html', title: "用 Agent 優化 Agent 的工具", desc: "工具寫得好不好，Agent 最有發言權。業界驗證了一套「用 Agent 寫工具 → 跑評測 → 自動優化」的工作流，讓工具設計從手工打磨變成系統化迭代。", tag: '實戰' , navTitle: "用 Agent 優化 Agent 的工具"},
          ],
        },
        {
          id: 't-evals',
          title: 'Agent 評測',
          desc: '不評測就是在裸奔。如何系統化驗證 Agent 質素',
          lessons: [
            { file: '10-8.html', title: "為什麼評測比訓練更重要", desc: "沒有評測的 Agent 開發就像矇眼開飛機。評測是貫穿整個開發週期的核心基礎設施，遠不止上綫前的 checklist。", tag: '方法論' , navTitle: "為什麼評測比訓練更重要"},
            { file: '10-9.html', title: "三種 Grader：程式碼、模型、人工", desc: "Grader 是評測系統的裁判。選錯了 Grader，評測結果就不可信。生產環境的經驗表明，三種 Grader 組合使用，各取所長。沒有銀彈，但有最優組合。", tag: '實戰' , navTitle: "三種 Grader：程式碼、模型、人工"},
            { file: '10-10.html', title: "評測的坑：噪音、作弊與退化", desc: "評測做起來了不等於做對了。生產環境中反覆驗證的三個隱蔽陷阱：基礎設施噪音會扭曲結果，模型會識別考試，一個小改動可能讓性能暴跌。", tag: '案例' , navTitle: "評測的坑：噪音、作弊與退化"},
          ],
        },
        {
          id: 't-long-running',
          title: '長運行 Agent',
          desc: '從一輪對話到跑幾小時：Harness 的設計與演進',
          routes: ['build'],   // 工程實現細節，產品路綫跳過
          lessons: [
            { file: '10-11.html', title: "為什麼 Agent 跑不了長任務", desc: "讓 Agent 構建一個完整 Web 應用看似簡單，但現實中充滿了交接失敗和上下文斷裂的陷阱。", tag: '案例' , navTitle: "為什麼 Agent 跑不了長任務"},
            { file: '10-12.html', title: "Initializer + Coding Agent", desc: "核心思路：把一個 Agent 拆成兩個角色，一個負責規劃，一個負責執行。每次交接都留下乾淨的狀態。", tag: '設計模式' , navTitle: "Initializer + Coding Agent"},
            { file: '10-13.html', title: "Managed Agent：腦手分離", desc: "核心洞察：把 Agent 的思考和執行拆成獨立組件，讓系統在任何部分出錯時都能優雅恢復。", tag: '架構' , navTitle: "Managed Agent：腦手分離"},
            { file: '10-14.html', title: "Session 不等於 Context Window", desc: "兩個最容易混淆的概念：Claude 當前能看到的，和所有發生過的事。它們必須分離。", tag: '深入' , navTitle: "Session 不等於 Context Window"},
          ],
        },
        {
          id: 't-security-advanced',
          title: '安全與容器化',
          desc: 'Anthropic 如何在產品中約束 Claude',
          routes: ['build'],   // 工程實現細節，產品路綫跳過
          lessons: [
            { file: '10-15.html', title: "三類風險：濫用、失控、外部攻擊", desc: "安全不是加一層提示詞就夠的，需要從架構層面進行結構性設計。這裏介紹一套系統化的安全分類框架。", tag: '安全' , navTitle: "三類風險：濫用、失控、外部攻擊"},
            { file: '10-16.html', title: "沙箱與憑證隔離", desc: "Agent 生成的程式碼和用戶的密鑰永遠不能在同一個地方。這是安全架構的硬性要求，不只是最佳實踐的建議。", tag: '安全' },
          ],
        },
        {
          id: 't-summary4',
          title: '進階收官',
          desc: '全景回顧與核心設計原則',
          lessons: [
            { file: '10-17.html', title: "Contextual Retrieval：更好的 RAG", desc: "RAG 的核心假設是「檢索到正確的 Chunk 就能給出正確的答案」。但實踐中發現了一個根本性問題：切 Chunk 的過程本身就會丟失關鍵信息。Contextual Retrieval 正是為了解決這個問題。", tag: '深入' , navTitle: "Contextual Retrieval：更好的 RAG"},
            { file: '10-summary.html', title: "進階全景圖", desc: "從 Workflow 到 Agent，從 Prompt Engineering 到 Context Engineering，這一篇章覆蓋了核心工程實踐。讓我們把所有主題串起來，形成完整的知識地圖。", tag: '彙總' },
            { file: '10-final.html', title: "做最簡單的、能跑的東西", desc: "所有複雜的架構設計、精巧的工程模式，最終都指向同一個樸素的真理。", tag: '收官' , navTitle: "做最簡單的、能跑的東西"},
          ],
        },
        {
          id: 't-build4',
          title: '你現在能做什麼',
          desc: '學完這章，你今天能動手做什麼',
          lessons: [
            { file: 'build-4.html', title: "別再「感覺變好了」：搭你的第一個評測集", desc: "前三格你都是靠眼睛驗收的，量小還行。但你馬上會遇到那個經典困境：改了一版提示詞，這三個用例變好了，那兩個悄悄變差了，你沒發現。Anthropic 説「不評測就是在裸奔」。這一格給你的 Agent 穿上衣服。", tag: '實戰' },
          ],
        },
        {
          id: 't-interview4',
          title: '他們會這樣考你',
          desc: '面試官、老闆、技術同事會怎樣考察本章內容',
          lessons: [
            { file: 'interview-4.html', title: "AI 工程設計模式 · 30 道靈魂拷問", desc: "工程進階篇講的全是生產級 Agent 的工程判斷，這類問題在面試和評審會上出現得越來越頻繁。先自己開口回答，再看框架。", tag: '考察' , navTitle: "AI 工程設計模式 · 30 道靈魂拷問"},
          ],
        },
      ],
    },
    {
      id: 'p5',
      num: '自我改進',
      title: 'Harness 與自我改進',
      desc: '從 Harness 設計模式到遞歸自我改進：當 Agent 開始優化自己的腳手架，AI 工程進入新階段。基於 Lilian Weng 2026 年前沿綜述。',
      color: '#7c3aed',
      group: 'main',
      prereq: '建議先學過工程進階',
      routes: ['build'],
      topics: [
        {
          id: 't-harness-intro',
          title: 'Harness 概論',
          desc: '遞歸自我改進與 Harness 的核心地位',
          lessons: [
            { file: '11-1.html', title: "從腳手架到自我改進系統", desc: "Harness 不只是包裹模型的外殼。它正在成為 AI 遞歸自我改進的核心引擎。", tag: '前沿' , navTitle: "從腳手架到自我改進系統"},
            { file: '11-2.html', title: "Harness 的三大設計模式", desc: "好的 Harness 有清晰的模式語言，絕非一堆腳本拼起來。三個核心模式，覆蓋了當前最強 Agent 系統 90% 的架構決策。", tag: '設計模式' },
          ],
        },
        {
          id: 't-harness-optimize',
          title: 'Harness 優化',
          desc: '從上下文工程到工作流自動搜索',
          lessons: [
            { file: '11-3.html', title: "上下文工程：從手寫 Prompt 到自動進化", desc: "隨着 Agent 任務變長，上下文管理不再是可選項。它正在成為 Harness 優化的核心戰場。", tag: '前沿' , navTitle: "上下文工程：從手寫 Prompt 到自動進化"},
            { file: '11-4.html', title: "工作流設計：從手工到自動搜索", desc: "工作流的設計空間巨大。我們應該用算法去搜索，只靠手動設計遠遠不夠。", tag: '前沿' , navTitle: "工作流設計：從手工到自動搜索"},
          ],
        },
        {
          id: 't-harness-self',
          title: '自我改進與進化',
          desc: '讓 Harness 改進自己、用進化算法搜索設計空間',
          lessons: [
            { file: '11-5.html', title: "讓 Harness 改進自己", desc: "如果 LLM 能優化執行 Agent 的程式碼，它就能接觸比手寫 Prompt 大得多的設計空間。", tag: '前沿' },
            { file: '11-6.html', title: "進化搜索：讓最強 Harness 存活", desc: "進化算法 + 編碼 Agent = 在龐大的 Harness 設計空間中自動發現最優解。", tag: '前沿' , navTitle: "進化搜索：讓最強 Harness 存活"},
          ],
        },
        {
          id: 't-harness-future',
          title: '未來與反思',
          desc: '自我改進面臨的根本挑戰',
          lessons: [
            { file: '11-7.html', title: "未來挑戰：自我改進的七道關", desc: "研究者取得了真正的進展，但通往完整遞歸自我改進的路上，還有若干瓶頸。", tag: '前沿' , navTitle: "未來挑戰：自我改進的七道關"},
          ],
        },
        {
          id: 't-build5',
          title: '你現在能做什麼',
          desc: '學完這章，你今天能動手做什麼',
          lessons: [
            { file: 'build-5.html', title: "佢跑十輪好聰明，跑五十輪呢？", desc: "這一章講的是讓 Harness 自己進化，聽着離你很遠。但所有自我改進的前提，是先有一個能長跑的 Harness：知道什麼時候壓縮、什麼東西永不能丟、什麼結論要落盤。這三條規矩，你今天就能給自己的 Agent 立起來。", tag: '實戰' },
          ],
        },
        {
          id: 't-interview5',
          title: '他們會這樣考你',
          desc: '面試官、老闆、技術同事會怎樣考察本章內容',
          lessons: [
            { file: 'interview-5.html', title: "Harness 與自我改進 · 30 道靈魂拷問", desc: "這一章講的是最前沿的東西，考它的人也最容易分出真假。這 30 個問題來自三個真實場景，先自己開口回答，再看框架。", tag: '考察' , navTitle: "Harness 與自我改進 · 30 道靈魂拷問"},
          ],
        },
      ],
    },
    {
      id: 'p7',
      num: '協作方法論',
      title: 'Vibe Coding 方法論',
      desc: "參考公開的 AI 協作規範與教學示例，練習流程、品質、文件、環境安全與清楚表達，整理成自己的工作規範。",
      color: '#0d9488',
      group: 'indie',
      cluster: 'chain',
      routes: ['use', 'pro', 'pm', 'build'],   // 一個人做產品就要自己指揮 AI 寫程式碼；兩個主題任何人都用得上，篇章並集含 use
      topics: [
        {
          id: 't-vibe-why',
          routes: ['use', 'pro', 'pm', 'build'],   // AI 為什麼會寫崩，跟 AI 打交道的人都該知道
          title: '理念與入門',
          desc: '為什麼 AI 寫得快反而容易搞砸，Rules 為什麼是最穩的約束方式',
          lessons: [
            { file: 'vibe-1.html', title: "為什麼要給 AI 立規矩", desc: "Vibe Coding 指靠自然語言讓 AI 直接產出程式碼的開發方式。它的問題出在質素：沒有規矩的 AI 會返工、漏改、悄悄刪程式碼、留下永久技術債。這一節先看事故長什麼樣，再看約束怎麼注入才最穩。", tag: '交互' },
          ],
        },
        {
          id: 't-vibe-flow',
          routes: ['pro', 'pm', 'build'],   // 四步流程與 PlayGround，偏動手
          title: '流程控制',
          desc: '在 AI 動手之前設好人工斷點',
          lessons: [
            { file: 'vibe-2.html', title: "四步流程：複述、PRD、確認、編碼", desc: "把軟件工程的需求確認環節搬進人機協作：AI 動手之前必須複述需求、寫出 PRD、拿到明確許可。再加上批量修改斷點和查重規則，把爆炸半徑控制在動手之前。", tag: '交互' , navTitle: "四步流程：複述、PRD、確認、編碼"},
            { file: 'vibe-3.html', title: "PlayGround：組件的試衣間", desc: "UI 功能直接寫進頁面，改一處影響一片，調一個按鈕要把整個頁面跑起來。解法是先做獨立的組件 PlayGround：每個 UI 元素有單獨的 demo，調好了再集成進正式頁面。", tag: '交互' , navTitle: "PlayGround：組件的試衣間"},
          ],
        },
        {
          id: 't-vibe-quality',
          routes: ['pro', 'pm', 'build'],   // 註釋、調試、交付粒度，偏程式碼
          title: '質素底綫',
          desc: '樣式複用、註釋、調試與完整實現的硬性要求',
          lessons: [
            { file: 'vibe-3b.html', title: "樣式收斂：一個按鈕不要八套 CSS", desc: "讓 AI 連着做十個功能，你會攢出八個長得差不多的按鈕類。它不是不會複用，是每輪對話都不知道你已經有什麼。這一節講樣式為什麼會增殖、怎麼收乾淨，以及哪些差異該留着。", tag: '交互' , navTitle: "樣式收斂：一個按鈕不要八套 CSS"},
            { file: 'vibe-4.html', title: "註釋三要素與程式碼保護", desc: "AI 寫的註釋多是功能複述，三個月後回來看程式碼，想不起當初為什麼這樣實現。這一節給註釋立結構，也給「刪程式碼」立規矩。頁面裏有兩個可動手的演示。", tag: '交互' },
            { file: 'vibe-5.html', title: "調試鐵律：先 Log 再改碼", desc: "AI 遇到報錯的第一反應是猜一個原因改改看，不行再猜一個。這一節立最核心的一條規矩：禁止猜測性修復。下面兩個演示，親手對比兩條修 Bug 路徑。", tag: '交互' , navTitle: "調試鐵律：先 Log 再改碼"},
            { file: 'vibe-6.html', title: "不接受分期交付", desc: "你要一個完整的認證系統，AI 説「先做一個簡版的用戶名密碼登入，後續再加 OAuth」。後續永遠不會來。這一節用兩個演示，看清「先做簡版」的完整生命週期，並練習正確的回應方式。", tag: '交互' },
          ],
        },
        {
          id: 't-vibe-docs',
          routes: ['pro', 'pm', 'build'],   // 三份文檔與方法論沉澱，做產品要懂
          title: '文檔與沉澱',
          desc: '讓決策跨越對話和時間留存下來',
          lessons: [
            { file: 'vibe-7.html', title: "三份文檔與方法論沉澱", desc: "做了 30 個功能，三個月後想查「呢個功能幾時加嘅、當初點解要咁設計、中間改過幾次方案」，翻遍 git log 也找不到。解法是讓 AI 按嚴格模板維護三份文檔，再加一份自動沉澱的方法論手冊。本頁兩個演示都可以動手操作。", tag: '交互' },
          ],
        },
        {
          id: 't-vibe-env',
          routes: ['pro', 'pm', 'build'],   // 環境事實與破壞性操作，偏工程
          title: '環境與安全',
          desc: '把環境事實寫死，給破壞性操作上閘',
          lessons: [
            { file: 'vibe-8.html', title: "把環境事實寫進 Rule", desc: "每次新開對話，AI 都不知道該調哪個模型、超時設多少、項目用什麼框架。把這些環境事實一次性寫死在 Rule 裏，相當於給 AI 一份預填好的 .env 説明書，每輪對話自動帶入。本頁兩個演示都可以真實操作。", tag: '交互' },
            { file: 'vibe-9.html', title: "破壞性操作的三道閘", desc: "發版時以為只改了 A 功能，實際 diff 裏混進了上週調試 B 的臨時改動，半成品程式碼進了生產環境。數據庫、配置、部署這些不可逆操作，必須在執行前設閘。下面兩個演練都可以動手操作。", tag: '交互' },
          ],
        },
        {
          id: 't-vibe-comm',
          routes: ['use', 'pro', 'pm', 'build'],   // 長對話不跑偏、去 AI 腔，不寫程式碼也天天用
          title: '溝通與寫作',
          desc: '對抗上下文漂移，消滅 AI 腔',
          lessons: [
            { file: 'vibe-10.html', title: "長對話錨定與寫作規範", desc: "對話開頭説了用 PostgreSQL，聊到 30 輪 AI 突然建議 SQLite，因為早期約定已經被上下文窗口擠掉了。這一節講兩件事：怎麼對抗長對話的認知漂移，以及怎麼讓 AI 寫出的中文擺脱 AI 腔。兩個互動演示，動手拖一拖、點一點。", tag: '交互' },
          ],
        },
        {
          id: 't-vibe-final',
          routes: ['use', 'pro', 'pm', 'build'],   // 規則全景與怎麼改成自己的，和理念、溝通兩節湊成不寫程式碼也能看的小閉環
          title: '專題收官',
          desc: '把這套規則改造成你自己的',
          lessons: [
            { file: 'vibe-final.html', title: "規則的價值：每條解決一個真實問題", desc: "14 個章節走完了。這套規則的來源只有一個：每發現一次 AI 反覆犯的錯誤，就加一條規則。收官這節把全景圖攤開，再用一個自查嚮導幫你把它改造成你自己的。", tag: '收官' , navTitle: "規則的價值：每條解決一個真實問題"},
          ],
        },
        {
          id: 't-build6',
          routes: ['pro', 'pm', 'build'],   // 動手任務，跟着這章走
          title: '你現在能做什麼',
          desc: '學完這章，你今天能動手做什麼',
          lessons: [
            { file: 'build-6.html', title: "最後一格：讓「你的做法」變成「誰來都行」", desc: "前五格你做出了一個能幹活的 Agent，但所有的判斷都在你腦子裏。這一格把它們寫成規矩。立住之後，換個人、換個項目、換個模型，這套東西照樣跑。這才叫工程，不叫手藝。", tag: '實戰' },
          ],
        },
        {
          id: 't-interview7',
          routes: ['pro', 'pm', 'build'],   // 面試題，跟着這章走
          title: '他們會這樣考你',
          desc: '面試官、老闆、技術同事會怎樣考察本章內容',
          lessons: [
            { file: 'interview-7.html', title: "Vibe Coding 方法論 · 30 道靈魂拷問", desc: "用 AI 寫程式碼這件事，最不缺的就是質疑。這 30 個問題來自三個真實場景：面試官在驗證深度，老闆在追問責任，技術同事在試探邊界。先自己開口回答，再看框架。", tag: '考察' , navTitle: "Vibe Coding 方法論 · 30 道靈魂拷問"},
          ],
        },
      ],
    },
    {
      id: 'p-taste',
      num: '專題篇章',
      title: '審美工程：讓 AI 做出有品味的東西',
      desc: '協作流程立住之後，第一個卡住你的是審美。AI 把執行門檻打掉之後，人人都能十分鐘做出能用的東西，「能用」本身開始貶值，品味成了新的分水嶺。這一章教兩項可訓練的技能：識別美，四個抓手（層級、留白、剋制、一致性）每個配 A/B 找茬交互；把審美翻譯給 AI 聽，審美詞彙表、生 UI 與生圖的提示詞寫法、墊圖與參考庫。天賦型的「創造美」教不了，但「看出哪裏不對」和「説清要什麼」，練了就會。',
      color: '#db2777',
      group: 'indie',
      cluster: 'chain',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-taste-why',
          title: '品味成了新瓶頸',
          desc: '執行能力被拉平之後，判斷力開始漲價',
          lessons: [
            { file: 'taste-1.html', title: "執行免費了，判斷力開始漲價", desc: "AI 把執行門檻打掉了：人人都能十分鐘做出一個能用的頁面、一張能看的圖。這一章不教你畫圖，教兩件練了就會的事：看出哪裏不對，説清要什麼。", tag: '開篇' , navTitle: "執行免費了，判斷力開始漲價"},
            { file: 'taste-2.html', title: "「AI 味」是怎麼來的", desc: "讓 AI 隨便生成一個頁面，十有八九是紫色漸變、毛玻璃、居中大標題三件套。這種整齊劃一有數學上的原因，看懂了它，你就知道怎麼繞開它。", tag: '交互' , navTitle: "「AI 味」是怎麼來的"},
          ],
        },
        {
          id: 't-taste-eye',
          title: '識別美的四個抓手',
          desc: '層級、留白、剋制、一致性，每個都配找茬',
          lessons: [
            { file: 'taste-3.html', title: "層級：一屏只有一個主角", desc: "打開一個頁面，視綫總得先落在某一處。設計者不安排這個落點，讀者的眼睛就會自己亂撞。這一節講層級：怎麼用字號、字重、顏色三根槓桿，把「先看哪」安排明白。", tag: '交互' , navTitle: "層級：一屏只有一個主角"},
            { file: 'taste-4.html', title: "留白與對齊：大多數醜都醜在間距", desc: "「講唔出邊度醜，總之就係醜」，這句評價八成在説間距。顏色字體一處沒動，只把間距捋順，介面就能上一個檔次。這一節給你兩條規律和一張現成的數字表。", tag: '交互' , navTitle: "留白與對齊：大多數醜都醜在間距"},
            { file: 'taste-5.html', title: "剋制：給顏色和字體做預算", desc: "好看的介面大多不是加出來的，是省出來的。這一節給你一套預算表：一個主色加中性色、兩種字重、一套圓角。超預算的東西再好看也砍。", tag: '交互' , navTitle: "剋制：給顏色和字體做預算"},
            { file: 'taste-6.html', title: "一致性：系統感從哪來", desc: "有一種介面，單看每處都還行，合起來卻透着一股散裝味。它缺的説到底就一樣東西：一套大家共同遵守的變數。這一節講 design token，變數先行，樣式跟隨。", tag: '案例' , navTitle: "一致性：系統感從哪來"},
          ],
        },
        {
          id: 't-taste-speak',
          title: '把審美翻譯給 AI 聽',
          desc: '審美詞彙量決定 AI 產出質素',
          lessons: [
            { file: 'taste-7.html', title: "「好看」的一百種具體説法", desc: "你同 AI 講「靚啲」，佢只能估；你講「信息密度加一檔、視覺噪音降下來」，佢即刻知該郁邊度。這一節給你十二個能直接用的審美詞、一套拆解一切視覺差異的八變數，外加一台把抱怨翻譯成術語的機器。", tag: '交互' , navTitle: "「好看」的一百種具體説法"},
            { file: 'taste-8.html', title: "生 UI：從形容詞到規格書", desc: "畀 AI 提 UI 需求，形容詞是許願，規格是指令。同一個落地頁需求，三檔提示詞能差出三個檔次的產出；這一節教你把「好看」寫成一份 AI 沒法跑偏的規格書。", tag: '實戰' , navTitle: "生 UI：從形容詞到規格書"},
            { file: 'taste-9.html', title: "生圖：構圖、光影、色彩的語言", desc: "生圖和生 UI 同一個道理：詞彙量決定產出。構圖、光影、色彩三件套，每樣記三個詞；先用三組真圖練眼力，再拼一段能直接用的生圖提示詞。", tag: '實戰' , navTitle: "生圖：構圖、光影、色彩的語言"},
          ],
        },
        {
          id: 't-taste-library',
          title: '建立自己的參考庫',
          desc: '會看，然後讓 AI 照着你的參考出活',
          lessons: [
            { file: 'taste-10.html', title: "怎麼看設計才算看進去了", desc: "收藏夾在膨脹，眼力沒長進，問題出在看的方式。這一節給一套固定的拆解順序，把「真好看」翻譯成能帶走的變數，你的參考庫從這裏開始有複利。", tag: '方法' , navTitle: "怎麼看設計才算看進去了"},
            { file: 'taste-11.html', title: "把參考餵給 AI", desc: "你能看出好在哪之後，下一步是讓 AI 也知道。這一節講三種把參考餵進對話的姿勢：墊圖、風格描述、設計變數，配拿來就用的話術模板。", tag: '實戰' , navTitle: "把參考餵給 AI"},
          ],
        },
        {
          id: 't-taste-final',
          title: '專題收官',
          desc: '點頭之前，過一遍清單',
          lessons: [
            { file: 'taste-final.html', title: "驗收清單：點頭之前過一遍", desc: "AI 出稿越來越快，把關的動作要跟上。收官這一節交付一份 15 項驗收清單，再回訪你在開篇投下的那一票，看看這一章有沒有把眼睛練出來。", tag: '收官' , navTitle: "驗收清單：點頭之前過一遍"},
          ],
        },
      ],
    },
    {
      id: 'p-ixd',
      num: '專題篇章',
      title: '交互工程：讓 AI 做出好用的東西',
      desc: '好不好看一眼能看出來，好不好用要用起來才知道，所以交互的病比審美的病更隱蔽。AI 預設交付的交互是「能跑通」級別：空態一片空白、報錯彈 alert、刪除不帶確認、五步向導一步不少。這一章接着審美工程往下走：先學識別（狀態三件套、防錯與可逆、流程剋制、習慣用法），再摳介面細節（控件怎麼選、文案怎麼説），最後把交互要求翻譯給 AI 聽（目標導向描述需求、狀態機與邊界寫進提示詞）。素材整理自交互設計的經典教材《About Face 4》。',
      color: '#2563eb',
      group: 'indie',
      cluster: 'chain',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-ixd-why',
          title: '好用也成了瓶頸',
          desc: '「能跑通」和「好用」隔着一整章',
          lessons: [
            { file: 'ixd-1.html', title: "跑得通咗，然後呢？", desc: "上一章練的是看出「哪裏醜」，這一章練看出「哪裏難用」。AI 交付的應用功能齊全、點哪都有反應，但用起來處處硌手。這一節先立住全章的地基：交互的病比審美的病更隱蔽，然後拿一張理論清單，親手抓五個現行。", tag: '開篇' , navTitle: "跑得通咗，然後呢？"},
          ],
        },
        {
          id: 't-ixd-spot',
          title: '識別好交互的四個抓手',
          desc: '狀態、防錯、流程、習慣用法',
          lessons: [
            { file: 'ixd-2.html', title: "狀態三件套：loading、空態、錯誤態", desc: "AI 生成的介面預設只有一種狀態：數據齊全、網絡流暢、一切正常。可用戶遇到的頭一屏常常是另外三種：沒數據、在等待、出錯了。這三種非正常時刻恰恰是體驗分水嶺，這一節把三件套逐個拆開，每件配一局 A/B 對決。", tag: '交互' , navTitle: "狀態三件套：loading、空態、錯誤態"},
            { file: 'ixd-3.html', title: "防錯與可逆：讓用戶敢點", desc: "上一節教錯誤怎麼説，這一節往前挪一步：讓錯誤壓根發生不了，發生了也能一鍵回頭。AI 生成的應用最愛用確認彈窗當保險，但那是最弱的一道防綫，你自己動手刪兩條數據就明白了。", tag: '交互' , navTitle: "防錯與可逆：讓用戶敢點"},
            { file: 'ixd-4.html', title: "流程剋制：每多一步掉一批人", desc: "上一節管住了危險按鈕，這一節看整條路：用戶從進來到辦完事，中間有多少步在伺候軟件而沒在辦他的事。AI 生成的流程有個通病：太完整。你來當一回流程審計員，把一個五步註冊砍到兩步。", tag: '交互' , navTitle: "流程剋制：每多一步掉一批人"},
            { file: 'ixd-5.html', title: "習慣用法：別讓 AI 發明新交互", desc: "流程砍利索了，還有一種病藏得更深：AI 有時會發明看着新穎、沒人會用的交互。這一節講兩個詞，習慣用法（idiom）和能供性（affordance），學完你能一眼認出哪個控件在裝創新，還能説清為什麼用戶學不會。", tag: '交互' , navTitle: "習慣用法：別讓 AI 發明新交互"},
          ],
        },
        {
          id: 't-ixd-detail',
          title: '介面的細節',
          desc: '控件怎麼選，文案怎麼説',
          lessons: [
            { file: 'ixd-6.html', title: "控件選對了嗎：單選、多選、開關與下拉", desc: "前面四節看的是流程和狀態，這一節鑽進介面最小的零件。控件是用戶和產品之間的通用語言，用錯一個，用戶就要多點一次、多猜一次。選用規則四句話就講完，AI 不知道這四句，你得替它把關。", tag: '交互' , navTitle: "控件選對了嗎：單選、多選、開關與下拉"},
            { file: 'ixd-7.html', title: "介面會説話：用戶怎麼理解你的文案", desc: "控件選對了，介面還得開口説話。按鈕上的兩個字、彈窗裏的一句話，就是產品和用戶的全部對話。微文案是交互的一半：寫對了，用戶不用想；寫錯了，控件再標準也白搭。AI 寫微文案只有一招，逢事「確定」。", tag: '交互' , navTitle: "介面會説話：用戶怎麼理解你的文案"},
          ],
        },
        {
          id: 't-ixd-translate',
          title: '把交互翻譯給 AI 聽',
          desc: '目標導向 + 狀態機，AI 才知道你要什麼',
          lessons: [
            { file: 'ixd-8.html', title: "目標導向：用目標描述需求，別用功能清單", desc: "前七節教你識別好交互，這兩節教你把要求翻譯給 AI 聽。第一句翻譯心法來自《About Face 4》的開篇方法論：先説清用戶是誰、要完成什麼，功能讓 AI 自己推。給它開清單，你會收到一個櫃枱；給它講場景，你會收到一個工具。", tag: '實戰' , navTitle: "目標導向：用目標描述需求，別用功能清單"},
            { file: 'ixd-9.html', title: "把狀態機和邊界寫進提示詞", desc: "上一節把「要什麼」翻譯成了目標和場景，這一節補上「別糊弄」的部分。規律很簡單：AI 只認真寫你提到的狀態，沒提到的一律按晴天想像。所以狀態要列全，邊界要説死，防錯要寫明，這三樣合起來就是交互規格。", tag: '實戰' , navTitle: "把狀態機和邊界寫進提示詞"},
          ],
        },
        {
          id: 't-ixd-final',
          title: '專題收官',
          desc: '上綫前的第二張清單',
          lessons: [
            { file: 'ixd-final.html', title: "交互驗收清單：上綫前的第二張清單", desc: "審美篇收官交付了第一張清單管「好看」，這一章交付第二張管「好用」。好看管第一眼，好用管接下來的每一天，而且交互的病更隱蔽：截圖看不出來，要點起來才露餡。14 項，每項一個動作，點頭之前過一遍。", tag: '收官' , navTitle: "交互驗收清單：上綫前的第二張清單"},
          ],
        },
      ],
    },
    {
      id: 'p-psy',
      num: '專題篇章',
      title: 'AI 產品心理學：讓用戶覺得好用',
      desc: '審美和交互解決了做得好看、做得好用，還剩第三件事：讓用戶覺得好用。AI 產品天生慢、會錯、不透明，這三個毛病工程上短期都只能緩解，但用戶的評價由感知決定，感知可以設計。這一章沿用戶旅程鋪十六個心理效應：等待焦慮、勞動錯覺、峯終定律、信任校準、算法厭惡、防禦心理、蜜月懸崖、AI 標籤折扣、認知卸載、情感依戀，一路講到付費疼痛、定價錨點和沉默偏差。每一課都是一個心理效應加一組當場能撥的工程開關。',
      color: '#0d9488',
      group: 'indie',
      cluster: 'chain',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-psy-perceive',
          title: '感知性能',
          desc: '用戶的秒錶和伺服器的秒錶走得不一樣',
          lessons: [
            { file: 'psy-1.html', title: "工程指標及格了，用戶為什麼還罵慢？", desc: "前面的章節教你把延遲壓下來、把成本摳下來、把幻覺率降下來。這一章換一塊秒錶：用戶腦子裏那塊。它和伺服器的秒錶走時不同，打分、續費、卸載都跟着它走。第一課先跑個實驗，再把這塊表的走時怪癖逐個拆開。", tag: '開篇' , navTitle: "工程指標及格了，用戶為什麼還罵慢？"},
          ],
        },
        {
          id: 't-psy-wait',
          title: '等待與過程設計',
          desc: '難受的從來不是那 5 秒本身',
          lessons: [
            { file: 'psy-2.html', title: "等待心理學：難受的從來不是那 5 秒", desc: "第 1 課你已經親手測過：同樣 5 秒，體感能差兩三倍。這一課把背後的規律講透。服務運營研究把排隊心理總結成幾條定律，條條能翻譯成 AI 產品的設計決策，翻譯完你會發現：大部分「太慢了」的差評，修的其實是呈現，模型一行都不用動。", tag: '交互' , navTitle: "等待心理學：難受的從來不是那 5 秒"},
            { file: 'psy-3.html', title: "勞動錯覺：讓 AI 把努力演出來", desc: "第 2 課説等待要有回饋，這一課的結論更反直覺：有些等待根本沒必要消滅。展示工作過程的產品，讓用戶多等幾秒，滿意度和信任反而更高。這個效應叫勞動錯覺（Labor Illusion）。先做實驗，再看研究，最後把邊界畫清。", tag: '交互' , navTitle: "勞動錯覺：讓 AI 把努力演出來"},
            { file: 'psy-4.html', title: "峯終定律：用戶只記得峯值和結尾", desc: "諾獎得主卡尼曼發現：人對一段體驗的記憶評分，幾乎只由最強烈的那一刻（峯）和最後一刻（終）決定，和平均水平、持續時長關係不大。這條定律直接回答一個預算問題：最貴的模型、最多的優化精力，該花在會話的哪個位置。這一課五個實驗，逐個上手。", tag: '交互' , navTitle: "峯終定律：用戶只記得峯值和結尾"},
          ],
        },
        {
          id: 't-psy-trust',
          title: '信任與防禦',
          desc: '既不能全信，也不能不敢用',
          lessons: [
            { file: 'psy-5.html', title: "信任校準：最好的用戶是半信半疑的", desc: "前四課都在給體驗掙分，這一課踩一腳剎車：信任這個指標，目標值從來就沒定在滿分。AI 會出錯是改不掉的物理現實，所以健康的用戶長這樣：該信的場景放心用，該查的場景留個心眼。往哪邊偏都要交學費。這一課先看兩筆真實學費，再給你三件能親手撥弄的校準工具。", tag: '交互' , navTitle: "信任校準：最好的用戶是半信半疑的"},
            { file: 'psy-9.html', title: "算法厭惡：AI 犯一次錯，就被永久拉黑", desc: "上一課講信任要校準。這一課講校準路上最大的一塊石頭：人對 AI 的容錯率，遠低於對人。同樣犯一次錯，人類同事會被原諒，AI 會被棄用。這個不對稱有實驗、有數據、也有解藥。", tag: '交互' , navTitle: "算法厭惡：AI 犯一次錯，就被永久拉黑"},
            { file: 'psy-6.html', title: "防禦心理：用戶不是不會用，是不敢用", desc: "很多 AI 功能的低使用率，複盤時被歸因成「用戶教育不夠」，再做一輪引導彈窗，還是沒人用。真正的原因常常是用戶在防禦：他看懂了你的功能，然後決定不碰。這一課先測你自己防不防，再拆三種防禦的來源，最後把三板斧一把一把撥給你看，五個教具，逐個親手玩。", tag: '交互' , navTitle: "防禦心理：用戶不是不會用，是不敢用"},
          ],
        },
        {
          id: 't-psy-mind',
          title: '心智模型與擬人化',
          desc: '用戶拿錯説明書，怪不到用戶頭上',
          lessons: [
            { file: 'psy-7.html', title: "心智模型：用戶拿錯了説明書", desc: "交互設計有個老概念叫心智模型：用戶會帶着一套「這東西應該怎麼運作」的假設來用你的產品，假設錯了，操作就錯，然後差評打給產品，賬算在你頭上。AI 是人類歷史上第一個「長得像老產品、內核兩樣」的東西，心智錯配格外嚴重。這一課先認出四本錯誤説明書，再親手玩三個糾正教具。", tag: '交互' , navTitle: "心智模型：用戶拿錯了説明書"},
            { file: 'psy-8.html', title: "擬人化的度，與 AI 道歉的藝術", desc: "上世紀 90 年代，斯坦福的 Reeves 和 Nass 在《媒體等同》裏報告了一組反直覺的實驗：人會不由自主地對電腦講禮貌、被電腦誇了會開心，明知對面是機器也照樣套用社交規則。這叫 CASA 範式（把計算機當社會行動者）。它意味着擬人化根本由不得你選：用戶一定會把你的 AI 當某種人對待，你能決定的只有讓它當哪種人，以及它闖禍之後怎麼開口。這一課五個實驗，全部親手玩。", tag: '交互' , navTitle: "擬人化的度，與 AI 道歉的藝術"},
          ],
        },
        {
          id: 't-psy-longterm',
          title: '長期使用',
          desc: '蜜月期過了，關係才剛開始',
          lessons: [
            { file: 'psy-10.html', title: "蜜月懸崖：宣傳拉高的期望，要用留存來還", desc: "發佈會上的演示驚為天人，上手第一天很興奮，第三天開始挑刺，第三十天卸載。這條曲綫你在無數 AI 產品上見過。它有兩個成因：期望被宣傳拉高了，新鮮感又天然會掉。兩個都能設計。", tag: '交互' , navTitle: "蜜月懸崖：宣傳拉高的期望，要用留存來還"},
            { file: 'psy-11.html', title: "AI 標籤折扣：同樣的內容，標上 AI 就掉價", desc: "內容沒變，加四個字「AI 生成」，評價掉一截；工具很好用，用戶卻不想讓同事知道自己在用。這兩件事是同一個偏見的兩面。做 AI 產品，標籤什麼時候必須亮、什麼時候是自己給自己減分，是一道天天要做的題。", tag: '交互' , navTitle: "AI 標籤折扣：同樣的內容，標上 AI 就掉價"},
            { file: 'psy-12.html', title: "認知卸載：用戶一邊用你，一邊怕自己廢掉", desc: "你的重度用戶裏藏着一批矛盾的人：離了你的產品幹不了活，又隱隱覺得自己正在廢掉。這份焦慮不會寫進 NPS 評語，但它決定續費、決定推薦，也決定他會不會在某天突然「戒掉」你。焦慮的名字叫認知卸載，它能被產品設計接住。", tag: '交互' , navTitle: "認知卸載：用戶一邊用你，一邊怕自己廢掉"},
            { file: 'psy-13.html', title: "情感依戀：用戶愛上你的產品之後", desc: "擬人化那課講過：人會不由自主地把機器當社會角色對待。這一課講它走到深處的樣子：用戶對 AI 產生真實的情感依戀。它帶來最強的留存曲綫，也帶來產品經理職業生涯裏最重的責任。這不是陪伴類產品的專屬課題，任何一個有對話框的產品都躲不開。", tag: '交互' , navTitle: "情感依戀：用戶愛上你的產品之後"},
          ],
        },
        {
          id: 't-psy-money',
          title: '付費與定價',
          desc: '收錢也是一門心理設計',
          lessons: [
            { file: 'psy-14.html', title: "付費心理：為一個概率商品掏錢，痛在哪", desc: "AI 是個奇怪的商品：付同樣的錢，這次生成驚豔，下次翻車，成本還在你看不見的地方按 token 跳動。用戶口袋裏的每一塊錢都連着神經，怎麼收錢，決定了掏錢疼不疼。這一課講付費的心理側，下一課講定價的數字側。", tag: '交互' , navTitle: "付費心理：為一個概率商品掏錢，痛在哪"},
            { file: 'psy-15.html', title: "定價心理：錨點、誘餌與體面的價格歧視", desc: "上一課講怎麼收錢不疼，這一課講收多少。先記住一個反直覺的事實：用戶對價格沒有客觀感受，全部判斷來自參照物。參照物是可以擺的，這門手藝有一百年曆史，AI 產品還拿到了一件獨有的新工具。", tag: '交互' , navTitle: "定價心理：錨點、誘餌與體面的價格歧視"},
          ],
        },
        {
          id: 't-psy-feedback',
          title: '反饋設計',
          desc: '壞消息怎麼才能聽得見',
          lessons: [
            { file: 'psy-16.html', title: "回饋心理：用戶為什麼不點踩", desc: "你在回答旁邊放了 👍 和 👎，指望用戶幫你標數據。一個月後一看：點踩率 0.4%，但流失率在漲。不是產品沒問題，是不滿的用戶根本不點踩，他們直接走。這一課講反饋的心理成本，和不靠用戶開口也能聽見的辦法。", tag: '交互' , navTitle: "回饋心理：用戶為什麼不點踩"},
          ],
        },
        {
          id: 't-psy-books',
          title: '延伸書單',
          desc: '這章的規律都有出處',
          lessons: [
            { file: 'psy-books.html', title: "九本書，把這一章讀厚", desc: "這一章的每個結論都有出處，課裏只給了你壓縮版。這一節把原書排上書架：九本書，拆出十九條 PM 必須懂的心理學原理，每條都標註它在 AI 產品上的落點。別按順序啃，先選你現在最頭疼的問題。", tag: '書單' , navTitle: "九本書，把這一章讀厚"},
          ],
        },
        {
          id: 't-psy-final',
          title: '專題收官',
          desc: '十六個效應一張對照表',
          lessons: [
            { file: 'psy-final.html', title: "十六個效應一張表，外加上綫前十四問", desc: "這一章的每個心理效應都對應一個你早就學過的工程開關。收官把它們排成一張表，再給一份能直接抄進上綫流程的檢查清單。心理學不玄：它只是把「用戶為什麼這樣反應」從猜測變成了規律。", tag: '收官' , navTitle: "十六個效應一張表，外加上綫前十四問"},
          ],
        },
        {
          id: 't-psy-interview',
          title: '他們會這樣考你',
          desc: '面試官、老闆、技術同事會怎樣考察本章內容',
          lessons: [
            { file: 'psy-interview.html', title: "AI 產品心理學 · 40 道靈魂拷問", desc: "心理學章學完了，能不能把「用戶為什麼這樣反應」講成可執行的方案，一問便知。這 40 個問題來自三個真實場景，先自己開口回答，再看框架。", tag: '考察' , navTitle: "AI 產品心理學 · 40 道靈魂拷問"},
          ],
        },
      ],
    },
    {
      id: 'p-cost',
      num: '專題篇章',
      title: 'Token 降本增效：AI 應用的成本工程',
      desc: "透過教學示例學習 Token 計量、價格邊界、上下文設計與成本優化；實際價格需按使用時的服務設定核對。",
      color: '#16a34a',
      group: 'indie',
      cluster: 'chain',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-cost-why',
          title: '定價即架構',
          desc: '成本構成、Token 怎麼數、報價表怎麼讀',
          lessons: [
            { file: 'cost-1.html', title: "和用戶對賭的生意", desc: "不知道你有沒有這種感受：我們總想為用戶提供更好的 AI 服務，但在商業化層面，是和用戶在對賭——產品用得越好，用戶用得越多，利潤反而越薄。見到消費帳單嘅時候，會唔會窒息。", tag: '開篇' , navTitle: "和用戶對賭的生意"},
            { file: 'cost-2.html', title: "Token 怎麼數：BPE 與隱形的「Token 税」", desc: "帳單按 Token 結算，但 Token 到底是怎麼數出來的？它既不是字符，也不是單詞，而是基於統計規律生成的「子詞」。理解這套規則，你才會明白：同樣一句話，中文為什麼天生比英文貴 2 倍。", tag: '交互' , navTitle: "Token 怎麼數：BPE 與隱形的「Token 税」"},
            { file: 'cost-3.html', title: "報價表速覽與三大梯隊", desc: "把常用模型的定價攤開在一張表上，你會看到三個清晰的梯隊。但僅僅知道哪個貴、哪個便宜是遠遠不夠的——真正的成本刺客，藏在那些價格跳變的邊界綫裏。", tag: '選型' , navTitle: "報價表速覽與三大梯隊"},
          ],
        },
        {
          id: 't-cost-cliff',
          title: '三大跳檔陷阱',
          desc: '藏在價格邊界綫裏的帳單刺客',
          lessons: [
            { file: 'cost-4.html', title: "GLM 的短輸出博弈：200 Token 斷崖", desc: "觀察 GLM-4.6 的定價結構，會發現一個神奇的設計：它不按輸入長度分檔，而是按輸出長度分檔，分界綫在 200 個 Token。輸出 199 和輸出 201，適用完全不同的價格。", tag: '交互' , navTitle: "GLM 的短輸出博弈：200 Token 斷崖"},
            { file: 'cost-5.html', title: "Qwen 的階梯逃逸：32k 紅綫", desc: "Qwen 系列的分檔邏輯和智譜完全不同：按輸入長度計費，分界綫在 32k 和 128k。最容易被忽略的計費細節是——越綫後不是「超出部分加價」，而是整個請求全量按高價檔結算。", tag: '交互' , navTitle: "Qwen 的階梯逃逸：32k 紅綫"},
            { file: 'cost-6.html', title: "圖片 Token：像素也要交税", desc: "文字 BPE 是「合併字符」，圖片編碼是「切割像素」。你以為傳的是原圖，其實模型按縮放對齊後的解像度計費——這裏面藏着和文字 32k 紅綫一模一樣的跳檔陷阱。", tag: '交互' , navTitle: "圖片 Token：像素也要交税"},
          ],
        },
        {
          id: 't-cost-agent',
          title: 'Agent 的帳單',
          desc: '循環執行讓成本累積膨脹',
          lessons: [
            { file: 'cost-7.html', title: "輸入主導：62:1 的 I/O Ratio", desc: "普通 Chatbot 是一問一答；Agent 是「思考 → 行動 → 觀察 → 再思考」的循環。關鍵認知：每一輪的 Input 都包含了全部歷史資訊——輪次越多，Input 越長，成本累積膨脹。", tag: '交互' , navTitle: "輸入主導：62:1 的 I/O Ratio"},
            { file: 'cost-8.html', title: "Agent 四大成本陷阱與熔斷", desc: "上一節看到的還只是「一次成功的執行」。真實世界裏，Agent 的帳單事故來自四個方向：工具返回爆炸、思考税、死循環、歷史雪球。每一個都有對應的工程解法。", tag: '深入' , navTitle: "Agent 四大成本陷阱與熔斷"},
          ],
        },
        {
          id: 't-cost-practice',
          title: '四層實戰優化',
          desc: '語法、語義、架構、輸出，一層層摳',
          lessons: [
            { file: 'cost-9.html', title: "語法層：Prompt 是寫給機器的", desc: "進入實戰四層的第一層。很多產品早期為了調試方便，或者乾脆是讓 AI 代寫的提示詞，習慣用 ###、** 加粗、JSON 展示數據。這些對人類友好的排版，在大模型的計費邏輯裏全是「詞法税」。", tag: '實戰' , navTitle: "語法層：Prompt 是寫給機器的"},
            { file: 'cost-10.html', title: "語義層：雙重蒸餾", desc: "格式的税砍完了，往深一層看內容本身。RAG 和長文檔場景裏最常見的工程錯誤：把上下文窗口當垃圾桶——Few-Shot 案例、檢索文檔全懟進去，讓模型自己辨識。能用，但不該這樣用。", tag: '實戰' , navTitle: "語義層：雙重蒸餾"},
            { file: 'cost-11.html', title: "架構層：KV Cache 的注意事項", desc: "在商業化產品的降本增效中，KV Cache 是最被低估的技術點之一。命中緩存和沒命中，最高差 90% 的成本——但裏面有幾個隱形的坑，不説你可能不知道。", tag: '實戰' , navTitle: "架構層：KV Cache 的注意事項"},
            { file: 'cost-12.html', title: "輸出層：管住模型的嘴", desc: "實戰四層的最後一層。輸出 Token 比輸入貴好幾倍（回看第 3 節報價表），而且直接決定接口返回速度。管住模型的嘴，有三類合適的操作：指令層、程式碼層、工程層。", tag: '實戰' , navTitle: "輸出層：管住模型的嘴"},
          ],
        },
        {
          id: 't-cost-final',
          title: '專題收官',
          desc: '省錢的盡頭是信息密度',
          lessons: [
            { file: 'cost-final.html', title: "算力時代的極簡主義", desc: "做完這幾層優化，你基本上已經跑贏 90% 的粗放型 AI 產品了。收官這一節，把整個專題串成一張清單，再聊聊「省錢」背後的那件更重要的事。", tag: '收官' , navTitle: "算力時代的極簡主義"},
          ],
        },
      ],
    },
    {
      id: 'p-ds',
      num: '編程基礎篇',
      title: '數據結構：AI 世界的骨架',
      desc: '不背定義、不手寫鏈表。用你已經學過的 AI 概念當例子——message list 是數組、KV Cache 是緩存、RAG 檢索是近鄰搜索——把八種核心數據結構一次看懂。學完你能看懂 AI 生成的程式碼在用什麼結構，也能看懂大模型肚子裏裝的是什麼。',
      color: '#0284c7',
      group: 'indie',
      cluster: 'hardcore',
      routes: ['use', 'pro', 'pm', 'build'],   // 科普主題（為什麼要懂、綫性結構）全路綫可見，工程主題只在 build
      topics: [
        {
          id: 't-ds-why',
          routes: ['use', 'pro', 'pm', 'build'],   // 為什麼要懂 + 收納隱喻，人人該看
          title: '為什麼 AI 時代還要懂',
          desc: '你可以不寫程式碼，但要會驗收 AI 寫的程式碼',
          lessons: [
            { file: 'ds-1.html', title: "都 2026 年了，為什麼還要懂數據結構？", desc: "AI 都會寫程式碼喇，仲要學呢個「程序員基本功」？先説結論：你可以不寫程式碼，但要會驗收 AI 寫的程式碼。這一章不背定義、不手寫鏈表，只給你一副能看穿程式碼的眼鏡。第一課先玩個遊戲。", tag: '交互' , navTitle: "都 2026 年了，為什麼還要懂數據結構？"},
          ],
        },
        {
          id: 't-ds-linear',
          routes: ['use', 'pro', 'pm', 'build'],   // 對話數組、撤銷、排隊，零程式碼也看得懂
          title: '綫性結構：你天天在用',
          desc: '數組、棧、隊列，AI 對話和 Agent 調度的地基',
          lessons: [
            { file: 'ds-2.html', title: "陣列：你聊的每句話都躺在裏面", desc: "上一課説好了：數據結構 = 收納方式。第一種收納方式你其實天天在餵它數據——你和 AI 的每一段對話，在程式眼裏就是一個 message list，而 message list 的真身，是最樸素的收納方式：一排編了號的格子，叫陣列。這一課先把你的對話攤開來看，再順手回答一個老疑問：為什麼聊久了它會忘事。", tag: '交互' , navTitle: "陣列：你聊的每句話都躺在裏面"},
            { file: 'ds-3.html', title: "棧：Cmd+Z 和「爆棧」的秘密", desc: "第二種收納方式長得像一摞盤子：只能從最上面放、也只能從最上面拿，這叫棧。聽着限制很大？可你每天按的撤銷鍵、程式裏每一次函式調用，靠的都是它。這一課先親手玩壞一個文檔再一鍵撤回來，最後圍觀一場「爆棧」事故——全球最大的程序員問答網站 Stack Overflow，名字就是從這場事故來的。", tag: '交互' , navTitle: "棧：Cmd+Z 和「爆棧」的秘密"},
            { file: 'ds-4.html', title: "隊列：Agent 的活是排着隊幹的", desc: "上一課的棧是「後進先出」，這一課把方向掉個頭：先進先出，一頭進、另一頭出——就是食堂打飯的那條隊。別嫌它樸素，AI 服務能扛住一萬個人同時提問、Agent 能有條不紊地幹完一串任務，靠的都是這條隊。這一課你來當調度員：親手開動一條流水綫，把它玩到積壓、再救回來。", tag: '交互' , navTitle: "隊列：Agent 的活是排着隊幹的"},
          ],
        },
        {
          id: 't-ds-hash',
          routes: ['pm', 'build'],   // 緩存與帳單直覺，產品路綫剛需
          title: '哈希與緩存：空間換時間',
          desc: '查得快和省錢，背後是同一招',
          lessons: [
            { file: 'ds-5.html', title: "哈希表：為什麼它找東西快到不講理", desc: "仲記唔記得第一課嗰條伏筆？「查會員名單」的版本 B 用了一行 set.has(user)，名單從 100 人漲到 1000 萬人，耗時紋絲不動。當時説好第五課揭底——今天就把這個「直達」的魔術拆給你看：它根本不翻，它是算出來的。", tag: '交互' , navTitle: "哈希表：為什麼它找東西快到不講理"},
            { file: 'ds-6.html', title: "緩存：AI 帳單的隱形折扣", desc: "上一課嘅哈希表解決咗「點樣瞬間搵到」，這一課解決另一個問題：算過的東西，別再算第二遍。你在模型價格表上見過的「緩存命中五折甚至一折」，帳單上省下的每一分錢，背後都是同一種收納方式——把算過的結果存起來，下次直接取。", tag: '交互' , navTitle: "緩存：AI 帳單的隱形折扣"},
          ],
        },
        {
          id: 't-ds-tree',
          routes: ['build'],   // AST 與圖遍歷，動手才需要
          title: '樹與圖：AI 的主場',
          desc: 'Coding Agent 和知識圖譜眼裏的世界',
          lessons: [
            { file: 'ds-7.html', title: "樹：Coding Agent 眼裏全是它", desc: "前面幾課的收納方式都是「一排排」的，這一課換個維度：一層套一層的收納。衣櫃裏有格子，格子裏有盒子，盒子裏有袋子——這種「層級 + 包含」的收納方式，在編程世界叫「樹」。而 Coding Agent 抬眼望去，你的項目裏全是樹。", tag: '交互' , navTitle: "樹：Coding Agent 眼裏全是它"},
            { file: 'ds-8.html', title: "圖：從知識圖譜到多 Agent 協作", desc: "上一課的樹規矩得很：每個節點只有一個爹，永遠不繞圈。可現實世界的關係亂多了——你的朋友互相也是朋友，公司和學校和人攪在一起。把「每個節點只能有一個爹」這條規矩撕掉，樹就升級成了圖：節點 + 關係，想怎麼連怎麼連。這一課看圖在 AI 世界的兩大主場。", tag: '交互' , navTitle: "圖：從知識圖譜到多 Agent 協作"},
          ],
        },
        {
          id: 't-ds-llm',
          routes: ['pro', 'pm', 'build'],   // 分詞與向量檢索底層，講 RAG 方案要用
          title: '大模型肚子裏的數據結構',
          desc: '前面章節埋的伏筆，這裏揭底',
          lessons: [
            { file: 'ds-9.html', title: "詞表與 Trie：Tokenizer 的切詞秘密", desc: "還記得大模型原理篇那個細節嗎——分詞器把「五花肉」切成一整塊詞元，而不是三個字。當時我們説「常見組合當一個整體」，這次揭底層：分詞器係點樣喺幾萬個詞裏面，瞬間認到「五花肉」應該成塊攞走？答案是一種叫 Trie（前綴樹）的收納方式——把詞表按「共享開頭」掛成一棵樹。", tag: '交互' , navTitle: "詞表與 Trie：Tokenizer 的切詞秘密"},
            { file: 'ds-10.html', title: "向量：RAG 檢索是在「找最近的鄰居」", desc: "學 RAG 時我們説過：Embedding 把一段話變成一串數字。這串數字到底是什麼？答案簡單得出奇——是座標。給每句話發一個「語義地圖」上的位置，意思越近、位置越近。於是「檢索資料」這件事，就變成了小學生都會的遊戲：在地圖上找離你最近的鄰居。", tag: '交互' , navTitle: "向量：RAG 檢索是在「找最近的鄰居」"},
          ],
        },
        {
          id: 't-ds-summary',
          routes: ['build'],   // 彙總跟完整章走
          title: '篇章彙總',
          desc: '數據結構篇核心知識回顧',
          lessons: [
            { file: 'ds-summary.html', title: "彙總 · 八種結構一張決策表", desc: "十課走完，八種收納方式全部揭底。這一頁不講新東西，只做一件事：把它們擺上同一張桌子，讓你以後看到場景就能報出結構名。先掃一遍決策表，再玩選型器和快問快答，檢驗自己係咪真係可以幫 AI 寫嘅程式碼把關。", tag: '彙總' , navTitle: "彙總 · 八種結構一張決策表"},
          ],
        },
        {
          id: 't-ds-build',
          routes: ['build'],   // 動手任務
          title: '你現在能做什麼',
          desc: '學完這章，你今天能動手做什麼',
          lessons: [
            { file: 'ds-build.html', title: "把 AI 寫的程式碼「驗收」一遍", desc: "整章都在説「你可以不寫程式碼，但要會驗收」——今天就驗一次真的。三檔任務按投入挑一個：30 分鐘能完成最輕的那檔，一週能把驗收變成你的工作習慣。每檔都配了直接可用的提示詞。", tag: '實戰' , navTitle: "把 AI 寫的程式碼「驗收」一遍"},
          ],
        },
        {
          id: 't-ds-interview',
          routes: ['build'],   // 面試題跟完整章走
          title: '他們會這樣考你',
          desc: '面試官、老闆、技術同事會怎樣考察本章內容',
          lessons: [
            { file: 'ds-interview.html', title: "數據結構 · 30 道靈魂拷問", desc: "數據結構篇學完了，收納方式的直覺建立了沒有，一問便知。這 30 個問題來自三個真實場景，先自己開口回答，再看框架。", tag: '考察' , navTitle: "數據結構 · 30 道靈魂拷問"},
          ],
        },
      ],
    },
    {
      id: 'p-algo',
      num: '編程基礎篇',
      title: '算法：AI 的思考方式',
      desc: '從「這段程式碼要跑多久」的直覺開始，把複雜度、查找排序、遞歸分治、圖搜索、貪心採樣五類經典思想講透——每一類都對應大模型裏的一個真實機制：注意力是 O(n²)、Rerank 是排序、Compaction 是分治、解碼是貪心與採樣。最後回答那個終極問題：AI 都會做題了，還要不要刷 LeetCode。',
      color: '#db2777',
      group: 'indie',
      cluster: 'hardcore',
      routes: ['use', 'pro', 'pm', 'build'],   // Big-O 直覺與學習觀全路綫可見，其餘只在 build
      topics: [
        {
          id: 't-algo-bigo',
          routes: ['use', 'pro', 'pm', 'build'],   // 複雜度直覺 + 上下文帳單，人人該看
          title: '複雜度：一眼看穿程式碼值不值',
          desc: '不用數學，建立對「快慢」的直覺',
          lessons: [
            { file: 'algo-1.html', title: "Big-O：一眼看穿程式碼要跑多久", desc: "姊妹篇講完了「數據結構 = 收納方式」，這一章講另一半：算法 = 做事的套路。評價一個套路好不好，程序員有一把統一的尺子，叫 Big-O。別被數學符號嚇到——它回答的問題只有一個：數據變多的時候，你的程式碼會慢多少？今天用三個互動把這把尺子裝進你腦子裏。", tag: '交互' , navTitle: "Big-O：一眼看穿程式碼要跑多久"},
            { file: 'algo-2.html', title: "點解上下文越長越貴？O(n²) 的帳單", desc: "上一課你拿到了 Big-O 這把尺子，仲記唔記得嗰條起飛嘅紅綫？今天帶你去看大模型裏最有名的一個 O(n²)——注意力機制。學完你會突然理解一堆老問題：為什麼長對話越來越卡、為什麼上下文窗口是「窗口」不是「倉庫」、為什麼大家拼命做上下文壓縮。", tag: '交互' , navTitle: "點解上下文越長越貴？O(n²) 的帳單"},
          ],
        },
        {
          id: 't-algo-sort',
          routes: ['build'],
          title: '查找與排序',
          desc: '砍一半的藝術，和排序在 AI 裏的真身',
          lessons: [
            { file: 'algo-3.html', title: "二分查找：猜數字遊戲的最優解", desc: "上一課那條最省心的綠綫 O(log n)，今天揭開它的真面目。你細個有冇玩過「我想咗個 1 到 100 嘅數，你估」？猜數字的最優策略，就是計算機科學裏最經典的算法之一——二分查找。先玩，再講理。", tag: '交互' , navTitle: "二分查找：猜數字遊戲的最優解"},
            { file: 'algo-4.html', title: "排序：冒泡和快排的賽跑", desc: "上一課説了，二分查找的門票是「先排好序」。那排序本身貴不貴？看你用什麼套路。今天安排一場公開賽：同一組亂序數據，冒泡排序和快速排序同時開跑，誰先把柱子從矮到高排整齊誰贏。先看小數據，再上 60 根柱子——差距會讓你印象深刻。", tag: '動畫' , navTitle: "排序：冒泡和快排的賽跑"},
            { file: 'algo-5.html', title: "排序在 AI 裏的真身：Rerank", desc: "上一課的排序比的是數字大小，但 AI 世界裏排的是「相關性」：RAG 從知識庫撈回來一堆段落，誰排前面誰就能擠進上下文——排錯了，模型就會一本正經地引用錯誤資料。這個「打分 + 重排」的環節叫 Rerank。今天你親自上崗，當一次 Rerank 模型。", tag: '交互' , navTitle: "排序在 AI 裏的真身：Rerank"},
          ],
        },
        {
          id: 't-algo-recur',
          routes: ['build'],
          title: '遞歸與分治',
          desc: '把大事拆成同一件小事',
          lessons: [
            { file: 'algo-6.html', title: "遞歸：把大事拆成同一件小事", desc: "「做個官網」聽着嚇人，「寫首頁的三行文案」誰都會。工程進階篇裏你見過 Coding Agent 接到大需求後自己列小任務清單——它用的思路有個名字：遞歸。這一課不寫一行程式碼，點一棵任務樹、拖一根滑塊，你就能拿到這個程序員嘴裏最玄的詞。", tag: '交互' , navTitle: "遞歸：把大事拆成同一件小事"},
            { file: 'algo-7.html', title: "分治：上下文壓縮的算法原理", desc: "動手實戰篇講過：對話太長裝不下時，AI 會做一次 Compaction——把舊對話壓成摘要。當時説「像搬家前把雜物打包」，這一課揭開包裝紙：它是一個有兩千年歷史的算法套路，叫分治。上一課的遞歸是「拆」，這一課補上另一半：「拆完再合」。", tag: '交互' , navTitle: "分治：上下文壓縮的算法原理"},
          ],
        },
        {
          id: 't-algo-search',
          routes: ['build'],
          title: '搜索與決策',
          desc: '走迷宮、擲骰子、往前多看幾步',
          lessons: [
            { file: 'algo-8.html', title: "BFS 與 DFS：Agent 在程式碼庫裏找檔案", desc: "工程進階篇裏，Coding Agent 接到「搵出登入報錯嘅原因」後，會在幾百個資料夾裏翻程式碼。往哪兒翻？先翻完這層再下去，還是抓住一條綫索鑽到底？這是兩種截然不同的性格——BFS（廣度優先）和 DFS（深度優先）。這一課讓它們各走一遍同一個迷宮，性格一眼見分曉。", tag: '交互' , navTitle: "BFS 與 DFS：Agent 在程式碼庫裏找檔案"},
            { file: 'algo-9.html', title: "貪心與採樣：AI 選詞時的兩種性格", desc: "大模型原理篇你看過 AI 逐詞元續寫時腦子裏的候選概率條，也調過 Temperature 旋鈕。當時是「體感」，這一課給它算法學的名字：每步挑最大的叫貪心，按概率擲骰子叫採樣。同一個開頭，兩種性格各生成三次——差別一眼就能看穿。", tag: '交互' , navTitle: "貪心與採樣：AI 選詞時的兩種性格"},
            { file: 'algo-10.html', title: "Beam Search：往前多看幾步再選", desc: "上一課留了個坑：貪心每步拿眼前最大的，可能一步錯、步步錯。填坑的辦法樸素得可愛——別急着定，多留幾條候選路一起往前走，走完了比總分。這就是 Beam Search（束搜索）。下面這張「詞格」，讓三種走法同台競技。", tag: '交互' , navTitle: "Beam Search：往前多看幾步再選"},
          ],
        },
        {
          id: 't-algo-learn',
          routes: ['use', 'pro', 'pm', 'build'],   // 還要不要刷題、怎麼用 AI 學，人人該看
          title: 'AI 時代的算法學習觀',
          desc: '還要不要刷題，以及怎麼用 AI 學',
          lessons: [
            { file: 'algo-11.html', title: "AI 都會做題喇，仲使唔使刷 LeetCode？", desc: "這是全章被問得最多的問題。答案不是簡單的「要」或「不要」——不同崗位差別很大。這一課不灌雞湯，把 2026 年的面試行情實話實説：什麼崗位還在考、考到什麼檔位、什麼崗位早就不看了。先找到你的位置。", tag: '交互' , navTitle: "AI 都會做題喇，仲使唔使刷 LeetCode？"},
            { file: 'algo-12.html', title: "用 AI 學算法的正確姿勢", desc: "上一課説了「還值得學」，這一課解決「點樣學最快」。關鍵一步是把角色換過來：你出題它把關，而不是它出手你圍觀。三個提示詞模板直接拿去用，再做 5 組對比題校準一下你的姿勢。", tag: '實戰' , navTitle: "用 AI 學算法的正確姿勢"},
          ],
        },
        {
          id: 't-algo-summary',
          routes: ['build'],
          title: '篇章彙總',
          desc: '算法篇核心知識回顧',
          lessons: [
            { file: 'algo-summary.html', title: "彙總 · 五類算法思想對照表", desc: "十二課走完，該收網了。這一章其實只講了五類思想，每類都在 AI 裏有個真身。這一頁一張大表帶走全章，再用 8 道場景題測測你能不能「一眼定位」——看到問題就知道該動哪類思想。", tag: '彙總' , navTitle: "彙總 · 五類算法思想對照表"},
          ],
        },
        {
          id: 't-algo-build',
          routes: ['build'],
          title: '你現在能做什麼',
          desc: '學完這章，你今天能動手做什麼',
          lessons: [
            { file: 'algo-build.html', title: "給 AI 寫的程式碼做一次複雜度體檢", desc: "算法篇的收官實戰：拿一段真實的 AI 程式碼，走一遍自報 → 優化 → 實測的完整體檢流程。三檔任務按投入挑一個，30 分鐘起步；走到第三檔，你會親眼看到 AI 自報的複雜度有沒有吹牛。", tag: '實戰' , navTitle: "給 AI 寫的程式碼做一次複雜度體檢"},
          ],
        },
        {
          id: 't-algo-interview',
          routes: ['build'],
          title: '他們會這樣考你',
          desc: '面試官、老闆、技術同事會怎樣考察本章內容',
          lessons: [
            { file: 'algo-interview.html', title: "算法 · 30 道靈魂拷問", desc: "算法篇學完了，複雜度的直覺建立了沒有，一問便知。這 30 個問題來自三個真實場景，先自己開口回答，再看框架。", tag: '考察' , navTitle: "算法 · 30 道靈魂拷問"},
          ],
        },
      ],
    },
    {
      id: 'p6',
      num: '專題篇章',
      title: '解剖 Grok Build：Rust 寫的生產級 Coding Agent',
      desc: '這一章要讀 Rust 源碼，不看不影響任何後續內容。適合想自己動手寫一個 Coding Agent 的人：基於 xAI 公開的 Grok Build 源碼，沿着 79 個 Workspace 成員拆解運行時、工具、記憶、安全與擴展設計。其中八個不依賴源碼也成立的結論，已經提煉進工程進階篇，那邊看不過癮再回來這裏深潛。',
      color: '#f59e0b',
      group: 'indie',
      cluster: 'hardcore',
      routes: [],   // 硬核選修，只在完整目錄裏
      hardcore: true,
      topics: [
        {
          id: 't-grok-map',
          title: '系統地圖',
          desc: '79 個 Workspace 成員的分層架構與 Rust 選型',
          lessons: [
            { file: '12-1.html', title: "79 個 Workspace 成員如何組成產品", desc: "根 Cargo.toml 列出 79 個成員，其中 crates/codegen/ 佔 62 個。理解這套系統，要沿組合入口、互動介面、Agent 宿主、領域能力、推理狀態五條主軸閲讀。", tag: '架構' , navTitle: "79 個 Workspace 成員如何組成產品"},
            { file: '12-2.html', title: "為什麼 Rust 合適：先分清事實與推斷", desc: "源碼能證明 Rust 2024、Tokio、強類型建模和原生二進制產物。技術選擇背後的組織動機沒有寫入源碼，本課只給出有邊界的課程推斷。", tag: '概念' , navTitle: "為什麼 Rust 合適：先分清事實與推斷"},
            { file: '12-3.html', title: "從真實 main() 到第一輪採樣", desc: "實際入口位於 xai-grok-pager-bin/src/main.rs。同一個組合入口解析命令與交互模式，再把工作交給 TUI 或 Shell Agent 宿主。", tag: '深入' , navTitle: "從真實 main() 到第一輪採樣"},
          ],
        },
        {
          id: 't-grok-core',
          title: 'Agent 核心循環',
          desc: 'Session Actor、Compaction 與 System Prompt',
          lessons: [
            { file: '12-4.html', title: "Session Actor：綫程、狀態與取消邊界", desc: "每個 Session 在獨立 OS 綫程上運行 current-thread Tokio runtime 與 LocalSet。SessionActor 協調 turn，ChatStateActor 串行擁有對話狀態，CancellationToken 負責協作式終止。", tag: '深入' , navTitle: "Session Actor：綫程、狀態與取消邊界"},
            { file: '12-5.html', title: "Compaction：85% 閾值與可選 two-pass", desc: "預設策略在上下文使用率達到 85% 時允許自動壓縮。memory flush 和 two-pass 預設均關閉，啓用後才進入對應流程。", tag: '交互' , navTitle: "Compaction：85% 閾值與可選 two-pass"},
            { file: '12-6.html', title: "PromptContext：可檢查的渲染輸入", desc: "PromptContext 保存 Agent 專屬的模板輸入。它通過 Serde derive 獲得序列化能力，再交給 ToolBridge::render_prompt() 完成渲染。", tag: '概念' , navTitle: "PromptContext：可檢查的渲染輸入"},
          ],
        },
        {
          id: 't-grok-tools',
          title: '工具系統',
          desc: '註冊表、分類學與內置工具集',
          lessons: [
            { file: '12-7.html', title: "進程級外部 Toolset Preset 註冊表", desc: "config.rs 允許 crate 外的擴展程式碼在當前進程內註冊按名稱解析的工具集構建函式，並用 Public 與 Internal 控制是否進入公開枚舉。", tag: '架構' , navTitle: "進程級外部 Toolset Preset 註冊表"},
            { file: '12-8.html', title: "ToolKind 提供預設只讀語義", desc: "is_read_only() 是工具種類層的預設分類。具體工具可以覆蓋它，最終是否執行還要經過規則、沙箱、Hook 與交互批准等控制。", tag: '設計模式' , navTitle: "ToolKind 提供預設只讀語義"},
            { file: '12-9.html', title: "實現族、註冊表與動態 MCP", desc: "xai-grok-tools 同時容納多套內置工具實現與運行時 MCP 工具。ToolBridge 把 registry 接入會話層，SearchTool 與 UseTool 提供發現和調用入口。", tag: '深入' , navTitle: "實現族、註冊表與動態 MCP"},
            { file: '12-10.html', title: "Canonical input 是穩定投影", desc: "不同 harness 可以使用不同原始參數名。Grok Build 把少量穩定語義投影到 x.ai/tool 元數據中，讓展示、遙測和跨工具分析擁有共同詞彙。", tag: '案例' , navTitle: "Canonical input 是穩定投影"},
          ],
        },
        {
          id: 't-grok-memory',
          title: '上下文與記憶',
          desc: 'Token 估算、混合檢索與 Dream 機制',
          lessons: [
            { file: '12-11.html', title: "估算、百分比與嚴格閾值", desc: "xai-token-estimation 提供共享算術原語。它既有 bytes/4 的本地粗估，也有對調用方傳入 used 與 total 的使用率和閾值判斷。", tag: '交互' , navTitle: "估算、百分比與嚴格閾值"},
            { file: '12-12.html', title: "從檔案變更到混合排序", desc: "查詢前先同步髒檔案，再結合 FTS5 BM25 與可選的 sqlite-vec KNN。合併分數經過時間衰減、來源權重與存取增益，最後可選擇啓用 MMR 多樣性重排。", tag: '深入' , navTitle: "從檔案變更到混合排序"},
            { file: '12-13.html', title: "Dream 的真實機制", desc: "Dream 會把近期 session 日誌與現有 MEMORY.md 合併成長期記憶。它由會話結束、可選週期檢查或手動命令進入，並受門控與最佳努力鎖共同約束。", tag: '前沿' , navTitle: "Dream 的真實機制"},
          ],
        },
        {
          id: 't-grok-subagent',
          title: '子 Agent 與多 Agent',
          desc: 'Agent 定義 + Persona 疊加的兩層體系',
          lessons: [
            { file: '12-14.html', title: "AgentDefinition 與 Persona 如何合併", desc: "子 Agent 先解析可執行骨架，再把 spawn 參數、role 預設值和 Persona 預設值摺疊為運行時配置。兩套結構在不同階段生效，最終共同決定子會話。", tag: '設計模式' , navTitle: "AgentDefinition 與 Persona 如何合併"},
            { file: '12-15.html', title: "子 Agent 的四個隔離維度", desc: "上下文來源、身份連續性、工作目錄和檔案改動空間分別控制不同邊界。把它們混成一個「隔離等級」，容易誤讀恢復和 worktree 的真實行為。", tag: '深入' , navTitle: "子 Agent 的四個隔離維度"},
            { file: '12-16.html', title: "多 Agent 的組織方式", desc: "多 Agent 系統要同時解決角色定義、spawn、狀態查詢、取消、完成通知與資源繼承。Grok Build 的源碼把這些職責落在定義層與協調事件層。", tag: '案例' , navTitle: "多 Agent 的組織方式"},
          ],
        },
        {
          id: 't-grok-security',
          title: '權限、沙箱與安全',
          desc: '內核級沙箱、權限演進與 Hooks 攔截',
          lessons: [
            { file: '12-17.html', title: "五種沙箱 Profile", desc: "workspace、devbox、read-only、strict、off 定義檔案系統和子進程網絡的不同能力集合。名稱提供方向，真實邊界要看解析後的 capability set。", tag: '安全' },
            { file: '12-18.html', title: "從工具請求到受限執行：完整授權鏈", desc: "一次工具調用先被解析成具體存取意圖，再經過 plan gate、hooks、策略規則、會話授權、Auto 模式和用戶確認。允許執行後，沙箱繼續約束操作系統能力。", tag: '安全' , navTitle: "從工具請求到受限執行：完整授權鏈"},
            { file: '12-19.html', title: "Hooks：明確 deny 才阻斷", desc: "Grok Build 源碼課第 19 節：Hooks 事件、matcher、阻斷語義與 fail-open 邊界", tag: '實戰' , navTitle: "Hooks：明確 deny 才阻斷"},
          ],
        },
        {
          id: 't-grok-eco',
          title: 'MCP 與生態',
          desc: 'MCP 客户端、OAuth、連接恢復與插件信任',
          lessons: [
            { file: '12-20.html', title: "MCP：連接只是起點", desc: "Grok Build 源碼課第 20 節：MCP 客户端、OAuth、工具可見性與連接恢復", tag: '深入' , navTitle: "MCP：連接只是起點"},
            { file: '12-21.html', title: "Marketplace：發現、安裝、執行分層", desc: "Grok Build 源碼課第 21 節：Plugin Marketplace、插件發現與信任邊界", tag: '架構' , navTitle: "Marketplace：發現、安裝、執行分層"},
          ],
        },
        {
          id: 't-grok-beyond',
          title: '超越源碼',
          desc: '完整對照、經驗教訓與設計啓示',
          lessons: [
            { file: '12-22.html', title: "完整對照：先校準證據，再談取捨", desc: "Grok Build 與 Claude Code 完整對照：源碼證據與公開產品行為分層比較", tag: '彙總' , navTitle: "完整對照：先校準證據，再談取捨"},
            { file: '12-23.html', title: "工程複盤：能力與邊界一起讀", desc: "Grok Build 源碼課第 23 節：基於源碼與 README 的工程複盤和適用邊界", tag: '收官' , navTitle: "工程複盤：能力與邊界一起讀"},
            { file: '12-24.html', title: "Coding Agent 設計工作台", desc: "Coding Agent 設計工作台：九個系統維度與可提交結課成果", tag: '收官' , navTitle: "Coding Agent 設計工作台"},
          ],
        },
        {
          id: 't-interview6',
          title: '他們會這樣考你',
          desc: '面試官、老闆、技術同事會怎樣考察本章內容',
          lessons: [
            { file: 'interview-6.html', title: "解剖 Grok Build · 30 道靈魂拷問", desc: "協作方法論篇拆的是真實源碼，這章的問題也最硬核。你説自己懂 Coding Agent，這 30 個問題就是照妖鏡，先自己開口回答，再看框架。", tag: '考察' , navTitle: "解剖 Grok Build · 30 道靈魂拷問"},
          ],
        },
      ],
    },
    {
      id: 'p-dsh',
      num: '專題篇章',
      title: '解剖 DeepSeek Harness：一切皆插件的 Agent 底座',
      desc: '這一章要讀 TypeScript 源碼，不看不影響任何後續內容。DeepSeek 在 2026 年開源的 Agent Harness 把模型、工具、會話、沙箱、UI 全部做成可替換的 Cordis 插件，還立了一條運行時不變數：模型看到的一切必須能從會話日誌逐字重建。本章沿源碼拆解它的插件內核、Turn/Step 循環、雙隊列 Inbox、Compaction 雙路徑與 Code Mode 沙箱，並逐課與 Claude Code、Grok Build 做證據化對照。',
      color: '#4d6bfe',
      group: 'indie',
      cluster: 'hardcore',
      routes: [],   // 硬核選修，只在完整目錄裏
      hardcore: true,
      topics: [
        {
          id: 't-dsh-map',
          title: '系統地圖',
          desc: 'Cordis 插件內核與配置三層結構',
          lessons: [
            { file: 'dsh-1.html', title: "一切皆插件：官宣與源碼對照", desc: "發佈文裏説的四種模式、插件生態，在 deepseek-harness 倉庫裏面對應邊個檔案？本課一條條對上。", tag: '架構' , navTitle: "一切皆插件：官宣與源碼對照" },
            { file: 'dsh-6.html', title: "Profile / Bundle / Patch：用戶能把產品改到什麼程度", desc: "不改源碼也能換掉深層能力：配置由四層 patch 對着空陣列疊出來，晚應用的贏，命中同一條就整條替換。", tag: '架構' , navTitle: "Profile / Bundle / Patch：用戶能把產品改到什麼程度" },
          ],
        },
        {
          id: 't-dsh-loop',
          title: '會話與循環',
          desc: '日誌不變數、雙隊列 Inbox、取消恢復與 Goal',
          lessons: [
            { file: 'dsh-2.html', title: "Model-visible ⟺ logged：一條會崩給你看的不變數", desc: "模型看到的一切都要能從日誌重建，發請求前還要現場驗一遍，驗不過直接崩。", tag: '深入' , navTitle: "Model-visible ⟺ logged：一條會崩給你看的不變數" },
            { file: 'dsh-3.html', title: "followup / steer / inject：雙隊列 Inbox", desc: "Agent 正在幹活時你想説句話，消息該排哪條隊、什麼時候被處理。三個 API 共用一個 send()，只差兩個參數。", tag: '交互' , navTitle: "followup / steer / inject：雙隊列 Inbox" },
            { file: 'dsh-7.html', title: "Esc 之後發生了什麼：取消、崩潰恢復與重入", desc: "每輪一個取消信號，中斷也要把賬記平，kill -9 之後重啓還能接着跑，已落盤的勞動成果一條不丟。", tag: '深入' , navTitle: "Esc 之後發生了什麼：取消、崩潰恢復與重入" },
            { file: 'dsh-8.html', title: "Goal：消息溯源即權限", desc: "長期目標誰有權改，鑑權不讀消息正文，只認宿主蓋在事件元數據上的來源章。本課講這個設計背後的兩層思路。", tag: '設計模式' , navTitle: "Goal：消息溯源即權限" },
          ],
        },
        {
          id: 't-dsh-context',
          title: '上下文工程',
          desc: 'Compaction 雙路徑、計量、Spill 與檢索',
          lessons: [
            { file: 'dsh-4.html', title: "Compaction 雙路徑與 replaceGeneration", desc: "上下文快滿了就主動收拾，真撐爆了就先收拾再重試。重試前先對一遍世代號，收拾沒起效就不許重試。", tag: '深入' , navTitle: "Compaction 雙路徑與 replaceGeneration" },
            { file: 'dsh-9.html', title: "Token 計量：決策用重放，展示用投影", desc: "兩套計量各幹各的，壓縮決策從不信 UI 上那個數。核心源碼：packages/llm/token-meter/src/usage-projection.ts。", tag: '概念' , navTitle: "Token 計量：決策用重放，展示用投影" },
            { file: 'dsh-10.html', title: "Spill：工具輸出太大怎麼辦", desc: "超限輸出落盤存檔，給模型留一張取回憑證。核心源碼：packages/spill/spill-policy/src/index.ts。", tag: '實戰' , navTitle: "Spill：工具輸出太大怎麼辦" },
            { file: 'dsh-11.html', title: "會話檢索與跨會話引用", desc: "舊會話是可檢索的資料庫，引用還能帶出處。核心源碼：packages/session-query/ 與 packages/context/session-reference/。", tag: '深入' , navTitle: "會話檢索與跨會話引用" },
          ],
        },
        {
          id: 't-dsh-tools',
          title: '工具系統',
          desc: '三段瀑布、輸出契約、文件編輯與獨有工具面',
          lessons: [
            { file: 'dsh-12.html', title: "工具執行流水綫：三段瀑布與單調 Guard", desc: "pre-execute 到 post-execute 的三段管綫，Guard 只能收緊不能放行。核心源碼：packages/core/tools/src/index.ts。", tag: '架構' , navTitle: "工具執行流水綫：三段瀑布與單調 Guard" },
            { file: 'dsh-13.html', title: "工具輸出契約：值與展示分離", desc: "同一個結果，模型看的和人看的可以不一樣。核心源碼：packages/core/tools/src/index.ts 與 presentation.ts。", tag: '設計模式' , navTitle: "工具輸出契約：值與展示分離" },
            { file: 'dsh-14.html', title: "文件編輯的工程學：先讀後寫", desc: "read / edit / write 三件套，沒讀過的文件不許改。核心源碼：packages/fs/fs-observation-policy/src/index.ts。", tag: '實戰' , navTitle: "文件編輯的工程學：先讀後寫" },
            { file: 'dsh-17.html', title: "DSH 獨有的工具面：terminal / lsp / jobs", desc: "別家沒有的幾個工具各解決什麼問題。核心源碼：packages/terminal/、packages/lsp/ 與 packages/jobs/，工具描述全文見 docs/tool-catalog.zh.md。", tag: '案例' , navTitle: "DSH 獨有的工具面：terminal / lsp / jobs" },
          ],
        },
        {
          id: 't-dsh-security',
          title: '審批與沙箱',
          desc: '兩個獨立旋鈕與可整體替換的執行世界',
          lessons: [
            { file: 'dsh-15.html', title: "審批與權限：兩個旋鈕，一個下拉框", desc: "沙箱模式和審批策略是兩個獨立旋鈕，預設只是常用組合。核心源碼：packages/interaction/user-approval 與 packages/interaction/permission-presets。", tag: '安全' , navTitle: "審批與權限：兩個旋鈕，一個下拉框" },
            { file: 'dsh-16.html', title: "沙箱：從 seatbelt 到執行世界", desc: "ctx.fs 和 ctx.subprocess 同享一個路徑命名空間，執行環境可以整體換掉。核心源碼：packages/sandbox/、packages/e2b/ 與 native/landlock-run/。", tag: '安全' , navTitle: "沙箱：從 seatbelt 到執行世界" },
          ],
        },
        {
          id: 't-dsh-code',
          title: '程式碼模式',
          desc: '讓模型寫程序來編排工具調用',
          lessons: [
            { file: 'dsh-5.html', title: "Code Mode：一段程式碼頂多輪工具調用", desc: "模型寫一段小程式，run_code 把它送進 worker 沙箱，五次工具調用一輪搞定。本課講這個設計背後的兩個思路。", tag: '前沿' , navTitle: "Code Mode：一段程式碼頂多輪工具調用" },
          ],
        },
        {
          id: 't-dsh-orch',
          title: '編排與子 Agent',
          desc: 'Subagent 接縫與四種編排原語',
          lessons: [
            { file: 'dsh-18.html', title: "Subagent 是一個 seam：從進程內到委派 Claude Code", desc: "子 Agent 是能力接縫，進程內、遠程、別家產品都能接。核心源碼：packages/subagent/。", tag: '架構' , navTitle: "Subagent 是一個 seam：從進程內到委派 Claude Code" },
            { file: 'dsh-19.html', title: "workflow / schedule / plan / todo：編排原語的取捨", desc: "四種編排原語各管什麼，為什麼沒做成一個大而全。核心文檔：docs/subsystems/workflow.zh.md 等四篇。", tag: '概念' , navTitle: "workflow / schedule / plan / todo：編排原語的取捨" },
            { file: 'dsh-20.html', title: "Skill、Preset 與自我修改", desc: "cordis_define 讓 Agent 在運行時改寫自己的運行時。核心目錄：packages/extensions/tool-cordis/ 與 apps/cli/config/agent-presets/。", tag: '前沿' , navTitle: "Skill、Preset 與自我修改" },
          ],
        },
        {
          id: 't-dsh-integration',
          title: '模型與外部接入',
          desc: 'LLM 適配層、MCP 與測試基礎設施',
          lessons: [
            { file: 'dsh-21.html', title: "MCP 與 Extensions：外部工具接入的兩條路", desc: "橋接生態標準與原生擴展怎麼分工。核心源碼：packages/mcp/mcp-client/ 與 packages/extensions/。", tag: '深入' , navTitle: "MCP 與 Extensions：外部工具接入的兩條路" },
            { file: 'dsh-22.html', title: "LLM 適配層：單次嘗試、顯式重試、雙流持久", desc: "推理流與正文流分開存，重試是顯式事件。核心源碼：packages/llm/llm/src/assembler.ts 與 packages/core/agent-loop/src/agent.ts。", tag: '深入' , navTitle: "LLM 適配層：單次嘗試、顯式重試、雙流持久" },
            { file: 'dsh-26.html', title: "測試一個非確定性系統", desc: "確定性回放、性質測試、專門騙 LLM 客戶端的故障伺服器。核心材料：docs/testing.zh.md 與 packages/test-support/。", tag: '實戰' , navTitle: "測試一個非確定性系統" },
          ],
        },
        {
          id: 't-dsh-persist',
          title: '持久化與基建',
          desc: '日誌治理、憑據存儲與多入口內核',
          lessons: [
            { file: 'dsh-23.html', title: "持久化治理：版本、fork 邊界與拒絕解讀", desc: "日誌格式怎麼演進，分叉邊界怎麼定，讀不懂的數據寧可拒絕。", tag: '架構' , navTitle: "持久化治理：版本、fork 邊界與拒絕解讀" },
            { file: 'dsh-24.html', title: "憑據、設定、存儲與遙測", desc: "不起眼但全是坑：憑據每次現取、配置不落盤。", tag: '實戰' , navTitle: "憑據、設定、存儲與遙測" },
            { file: 'dsh-25.html', title: "多入口與 Typert：一個內核，五張面孔", desc: "Web、headless、ACP、SDK、HTTP 共享同一個內核。", tag: '架構' , navTitle: "多入口與 Typert：一個內核，五張面孔" },
          ],
        },
        {
          id: 't-dsh-method',
          title: '工程方法論',
          desc: '用 AI 開發 AI 的規訓體系',
          lessons: [
            { file: 'dsh-27.html', title: "Agent Notes 與 AGENTS.md：用 AI 開發 AI 的規訓", desc: "四狀態設計筆記和給 AI 看的編碼規範，團隊立刻能抄。", tag: '彙總' , navTitle: "Agent Notes 與 AGENTS.md：用 AI 開發 AI 的規訓" },
            { file: 'dsh-28.html', title: "KV Cache 是接口", desc: "prompt 前綴穩定性當成相容性承諾來維護。", tag: '前沿' , navTitle: "KV Cache 是接口" },
          ],
        },
        {
          id: 't-dsh-final',
          title: '超越源碼',
          desc: '五種工程觀與最小可抄清單',
          lessons: [
            { file: 'dsh-29.html', title: "終章：五種工程觀，我們該抄什麼", desc: "五家 harness 設計哲學總表，附最小可抄清單和體量陷阱清單。", tag: '收官' , navTitle: "終章：五種工程觀，我們該抄什麼" },
          ],
        },
      ],
    },
    {
      id: 'p-codex',
      num: '專題篇章',
      title: '解剖 OpenAI Codex：把安全觀寫進類型系統',
      desc: '這一章要讀 Rust 源碼，不看不影響任何後續內容。Codex 面對的問題和別家一樣：模型要讀文件、跑命令、改程式碼，而這些動作沒有人逐條審過。它的答案是把約束儘量往前推，能讓編譯器管的交給類型，類型管不了的寫進 code review，運行時管不了的交給沙箱和審批。本章沿源碼拆解上下文注入的類型系統、Windows 上的三道關卡、自帶測試用例的命令策略、用模型審批模型的 Guardian，以及給模型專門設計的 diff 與程式碼模式，逐課與 DeepSeek Harness、Claude Code 做證據化對照。',
      color: '#414b5a',
      group: 'indie',
      cluster: 'hardcore',
      routes: [],   // 硬核選修，只在完整目錄裏
      hardcore: true,
      topics: [
        {
          id: 't-codex-loop',
          title: '治理與循環',
          desc: '一輪對話在內部轉幾圈，誰有資格喊停',
          lessons: [
            { file: 'codex-01.html', title: "新功能先找落腳的 crate，core 是最後一檔", desc: "打開倉庫，第一反應是往 core 裏加。倉庫把這件事寫成禁令：先找現有的非 core crate，否則新建一個。依賴方向會把葉子類型擋在核心之外。", tag: '工程', navTitle: "新功能先找落腳的 crate，core 是最後一檔" },
            { file: 'codex-02.html', title: "三層 Turn Loop：誰有資格決定繼續", desc: "你看到的是一輪對話。內部疊了任務殼、輪次、採樣三層循環。各層只回答自己那一個問題，控制權每次只在一層。", tag: '架構', navTitle: "三層 Turn Loop：誰有資格決定繼續" },
            { file: 'codex-03.html', title: "流還在走，工具已經開工", desc: "模型還在打字，讀檔案的聲音已經響了。採樣循環的時序是：流內建 future，流後統一 drain。先 persist，再等結果。", tag: '架構', navTitle: "流還在走，工具已經開工" },
            { file: 'codex-04.html', title: "中途插話：這句話進本輪、下一輪，還是被拒", desc: "Agent 正在改第三個檔案，你看見方向偏了，補了一句：配置用 YAML。回車之後，這句話是開工、插進當前輪，還是當場被拒，Core 當場拍板，不等模型開口。", tag: '架構', navTitle: "中途插話：這句話進本輪、下一輪，還是被拒" },
            { file: 'codex-05.html', title: "按下取消之後，各層怎麼收手", desc: "工具失敗回給模型，用戶按 Esc 才停 turn。取消令牌從任務傳到採樣再傳到工具。已完成的結果留在歷史裏，100 毫秒之後的硬拆不可逆。", tag: '架構', navTitle: "按下取消之後，各層怎麼收手" },
          ],
        },
        {
          id: 't-codex-context',
          title: '上下文',
          desc: '往模型上下文裏塞東西，誰來管',
          lessons: [
            { file: 'codex-06.html', title: "往模型上下文裏塞東西，先給它造一個類型", desc: "批准前綴、工作區、AGENTS.md、被中斷的 turn，全是告訴模型一件它自己看不到的事實。Codex 先給每一種注入造一個類型，類型自己知道 role、marker 和 body。", tag: '上下文', navTitle: "往模型上下文裏塞東西，先給它造一個類型" },
            { file: 'codex-07.html', title: "把上下文治理寫進 code review", desc: "上一章把往上下文裏塞東西收成類型。類型過了，這段文字仍然可以合法地又長、又勤、又無界。擋這些後果的，是倉庫根十行禁令，外加一份會把同一節再讀一遍的評審 skill。", tag: '工程', navTitle: "把上下文治理寫進 code review" },
            { file: 'codex-08.html', title: "滿窗之後，砍哪一段留哪一段", desc: "三個時機共用一個分發器，三種實現由開關選中。同一份摘要在中途必須停在歷史最後一項。", tag: '上下文', navTitle: "滿窗之後，砍哪一段留哪一段" },
            { file: 'codex-09.html', title: "JSONL 是真相，SQLite 是鏡像", desc: "昨天關了終端，今天列表還在，對話也能接着改。這兩件事看起來像同一份存儲，落盤時卻走兩條軌。上軌按行追加，下軌只抄封面。中途拔電之後，能撿回來的永遠是已經過了閘門的那幾行。", tag: '存儲', navTitle: "JSONL 是真相，SQLite 是鏡像" },
          ],
        },
        {
          id: 't-codex-tools',
          title: '工具',
          desc: '模型能調什麼，怎麼併發，從哪個門出去',
          lessons: [
            { file: 'codex-10.html', title: "模型看見的工具清單，是一次採樣算出來的", desc: "同一段對話、同一份配置，下一輪採樣卻可能多出 MCP 名字、協作入口或 tool_search。變的是這一次允許廣告哪些 handler。", tag: '工具', navTitle: "模型看見的工具清單，是一次採樣算出來的" },
            { file: 'codex-11.html', title: "對模型説隨便並行，底下用鎖管住", desc: "模型看見的、實際執行的、歷史記錄的，是三套順序。一面旗允許一次發多個調用，一把讀寫鎖決定誰能疊着進。", tag: '工具', navTitle: "對模型説隨便並行，底下用鎖管住" },
            { file: 'codex-12.html', title: "統一入口：一條命令按特徵分叉", desc: "模型只看見 exec_command 和 write_stdin。進門之後，tty、遠程環境和 150 毫秒窗口會把同一條命令送到 PTY、pipe、exec-server，或者送進重試門。", tag: '執行', navTitle: "統一入口：一條命令按特徵分叉" },
          ],
        },
        {
          id: 't-codex-sandbox',
          title: '沙箱',
          desc: '命令跑起來之前，攔在哪幾道關',
          lessons: [
            { file: 'codex-13.html', title: "沙箱管理器：把權限檔案編譯成一行命令", desc: "工作區可寫，網絡收緊。同一條 git status，Mac 套上 sandbox-exec，Linux 套上 helper，Windows 可能原樣出門。差別出在編譯器。", tag: '沙箱', navTitle: "沙箱管理器：把權限檔案編譯成一行命令" },
            { file: 'codex-14.html', title: "macOS：把安全策略拼成一個字串", desc: "Seatbelt 吃的是一段文本。文本由靜態基綫加現拼的讀寫網段組成。路徑不進這段文本，走旁邊的參數表。", tag: '沙箱', navTitle: "macOS：把安全策略拼成一個字串" },
            { file: 'codex-15.html', title: "Linux：先建視圖，再上 seccomp，最後 exec", desc: "同一條讀取，Mac 上回 Operation not permitted，Linux 上回 No such file or directory。差別在於 Linux 先換進程能看見的檔案樹，再收緊它能調用的系統接口。", tag: '沙箱', navTitle: "Linux：先建視圖，再上 seccomp，最後 exec" },
            { file: 'codex-16.html', title: "Windows：受限令牌、防火牆過濾器與兩個專用系統用戶", desc: "沒有 seatbelt，也沒有 bubblewrap。Windows 上的沙箱是三道關卡疊起來的：令牌管寫，專用帳戶管你是誰，WFP 按這個身份濾網。AppContainer 對不上這份權限模型，整套還預設關着。", tag: '沙箱', navTitle: "Windows：受限令牌、防火牆過濾器與兩個專用系統用戶" },
            { file: 'codex-17.html', title: "execpolicy：讓策略檔案自帶測試用例", desc: "白名單寫錯，通常要等綫上才知道。Codex 把正反例寫進規則本身，載入時就地跑一遍。規則和例子打架，這份策略進不了會話。", tag: '策略', navTitle: "execpolicy：讓策略檔案自帶測試用例" },
          ],
        },
        {
          id: 't-codex-approval',
          title: '審批與網絡',
          desc: '攔不住的交給人，或者交給另一個模型',
          lessons: [
            { file: 'codex-18.html', title: "審批策略：同一條命令，問不問看哪兩顆旋鈕", desc: "預設問不問跟沙箱種類綁在一起。問過一次之後，記住的是完整命令，還是一段前綴。", tag: '審批', navTitle: "審批策略：同一條命令，問不問看哪兩顆旋鈕" },
            { file: 'codex-19.html', title: "Guardian：讓一個模型去審批另一個模型", desc: "審批彈窗多到人開始無腦點同意時，Codex 把決定權交給一次鎖死的審查會話。超時、壞 JSON、連續拒絕，各有各的收場。", tag: '審批', navTitle: "Guardian：讓一個模型去審批另一個模型" },
            { file: 'codex-20.html', title: "網絡與憑據代理：模型看不見的那把鑰匙", desc: "出站要過幾道門。真 token 不進子進程。模型看見的是假值和一句 403。", tag: '網絡', navTitle: "網絡與憑據代理：模型看不見的那把鑰匙" },
          ],
        },
        {
          id: 't-codex-modelapi',
          title: '給模型設計的接口',
          desc: '讓模型好用的格式，和跑不完時的收場',
          lessons: [
            { file: 'codex-21.html', title: "apply-patch，給模型設計一種 diff", desc: "模型填一份沒有行號的補丁，人看的是事後算出來的 unified diff。同一處修改，兩套格式各自會在哪一步翻車。", tag: '工具', navTitle: "apply-patch，給模型設計一種 diff" },
            { file: 'codex-22.html', title: "exec 與 wait：跑不完的程式怎麼收場", desc: "與其讓模型發二十次工具調用，不如讓它寫一段 JavaScript。這段程式在哪跑、能幹什麼、十秒跑不完又怎麼辦，本課講這三個問題背後的兩個思路。", tag: '程式碼模式', navTitle: "exec 與 wait：跑不完的程式怎麼收場" },
            { file: 'codex-23.html', title: "宿主拆分：程式掛在誰身上", desc: "上一課講 exec 和 wait 的語義。這一課問另一件事：這段 JavaScript 到底掛在誰身上，掛點換了之後，故障域和狀態歸屬怎麼變。", tag: '程式碼模式', navTitle: "宿主拆分：程式掛在誰身上" },
          ],
        },
        {
          id: 't-codex-extend',
          title: '擴展',
          desc: '把別人的能力接進來，把自己的能力派出去',
          lessons: [
            { file: 'codex-24.html', title: "多 Agent 是一張要持久化的圖", desc: "派出去的是節點，邊一出生就是 Open。信先入隊，followup 才叫醒。關掉的是邊，歷史還在。", tag: '多 Agent', navTitle: "多 Agent 是一張要持久化的圖" },
            { file: 'codex-25.html', title: "掛鈎點能改什麼，由事件合同決定", desc: "一次 turn 會經過十一個掛鈎。協議認四種處理器，運行表只裝命令和 MCP。超時預設放行，拆卸期丟掉 stdout。", tag: '擴展', navTitle: "掛鈎點能改什麼，由事件合同決定" },
            { file: 'codex-26.html', title: "MCP 接進來：模型看見翻譯過的名字", desc: "外部 server 的工具要先過一層翻譯才進模型眼睛。skill 目錄常在，缺 MCP 時另問人。", tag: '擴展', navTitle: "MCP 接進來：模型看見翻譯過的名字" },
            { file: 'codex-27.html', title: "搬家只搬對得上的字段", desc: "換到 Codex 的第一週，最怕去年攢的 hook、MCP 和插件還在不在。檢測會列出一份清單。導入只收下能映射的那一部分。", tag: '擴展', navTitle: "搬家只搬對得上的字段" },
          ],
        },
        {
          id: 't-codex-protocol',
          title: '協議與介面',
          desc: '內核和外殼之間説什麼話，終端上怎麼顯示',
          lessons: [
            { file: 'codex-28.html', title: "SQ 進、EQ 出：同一件事兩副面孔", desc: "命令走進程內的 Submission Queue。事件走能寫成 JSON 的 Event Queue。Rust 名叫 TurnStarted，磁盤上仍寫 task_started。", tag: '協議', navTitle: "SQ 進、EQ 出：同一件事兩副面孔" },
            { file: 'codex-29.html', title: "對外協議是投影", desc: "IDE 看見的是 Thread / Turn / Item，不是內核 EventMsg。一次 turn/start 先回響應，再推事件流；審批是反向請求，不回包這一輪就停住。", tag: '協議', navTitle: "對外協議是投影" },
            { file: 'codex-30.html', title: "流式輸出怎麼在終端兩區之間定稿", desc: "模型按 token 往外推，終端卻是一個寫出去就改不了的字符網格。已經不會變的行交給 scrollback，還可能變的尾巴留在活動 cell，表格沒閉合之前整段扣住。", tag: '介面', navTitle: "流式輸出怎麼在終端兩區之間定稿" },
          ],
        },
        {
          id: 't-codex-closing',
          title: '收束',
          desc: '把架構寫成檢查項，再回看兩套安全觀',
          lessons: [
            { file: 'codex-31.html', title: "把架構決策寫成 lint", desc: "同一份 AGENTS.md 裏，有命令的規則會在三台操作系統上亮紅。只有路徑的那條，重命名之後沒人發現。", tag: '工程', navTitle: "把架構決策寫成 lint" },
            { file: 'codex-32.html', title: "兩種安全視角：同一條命令，兩套判詞", desc: "出事之前有沒有門可以拒絕，出事之後能不能復原模型當時看見的世界。同一條危險命令上，這兩套視角會一致，也會給出相反結論。", tag: '安全', navTitle: "兩種安全視角：同一條命令，兩套判詞" },
          ],
        },
      ],
    },
    {
      id: 'p-oss',
      num: '專題篇章',
      title: '開源、蒸餾與本地部署',
      desc: '新聞裏天天説某某模型開源了，開源的到底是什麼？這一章從權重講起，教你自己看懂一張許可證，搞清楚各家開源背後的商業算盤。再往下是模型如何從大變小：湧現、蒸餾，以及蒸餾帶來的同質化代價。最後動手，算清楚自己的電腦能跑多大的模型，用 Ollama 或 LM Studio 真正跑起來。',
      color: '#4f46e5',
      group: 'indie',
      cluster: 'hardcore',
      routes: [],   // 硬核選修，只在完整目錄裏
      topics: [
        {
          id: 't-oss-what',
          title: '開源到底開的是什麼',
          desc: '權重、許可證與各家的商業算盤',
          lessons: [
            { file: 'oss-1.html', title: "權重是什麼？一個模型的全部本事", desc: "新聞裏天天説「某某模型開源了」。開源嘅到底係啲咩？係咪程式碼？其實主要是一個檔案：權重。搞清楚它是什麼，後面所有關於開源的爭論你都能自己判斷。", tag: '概念' , navTitle: "權重是什麼？一個模型的全部本事"},
            { file: 'oss-2.html', title: "真開源 vs 假開源：怎麼看懂一張許可證", desc: "幾乎每家都説自己「開源」，但這個詞在各家嘴裏的含義差得很遠。有的能隨便商用，有的用戶量一大就要另外簽合同，有的只是發了篇論文。學會自己判斷，比記住誰家開源更有用。", tag: '選型' , navTitle: "真開源 vs 假開源：怎麼看懂一張許可證"},
            { file: 'oss-3.html', title: "開源是一門生意：各家在圖什麼", desc: "訓練一個旗艦模型要燒掉鉅額算力，權重一旦放出去就收不回來。既然如此，點解仲有咁多公司選擇開源？答案跟慈善無關。看懂各家的算盤，你的選型判斷會穩很多。", tag: '案例' , navTitle: "開源是一門生意：各家在圖什麼"},
          ],
        },
        {
          id: 't-oss-small',
          title: '大模型如何變小',
          desc: '湧現、蒸餾，以及必須付出的代價',
          lessons: [
            { file: 'oss-4.html', title: "湧現：能力為什麼會突然出現", desc: "模型越大越強，這句話聽起來很自然。真實情況要複雜一點。有些能力在模型小的時候接近零分，參數量跨過某個量級之後，短時間內就有了。這個現象叫湧現，它也是後面幾節所有矛盾的起點。", tag: '概念' , navTitle: "湧現：能力為什麼會突然出現"},
            { file: 'oss-5.html', title: "為什麼要把模型做小：蒸餾的動機", desc: "上一節剛講完，模型越大，能力越容易湧現。那為什麼整個行業還在拼命把模型做小？因為能力不是唯一的約束條件。成本、延遲、數據能不能出門，這三件事會在真實項目裏直接把旗艦模型擋在門外。", tag: '方法論' },
            { file: 'oss-6.html', title: "蒸餾是怎麼做的：從老師到學生", desc: "上一節講了為什麼要把模型做小。這一節看具體怎麼做。整個過程比想像中樸素：讓老師去答題，把答題過程記下來，拿這批材料去訓練學生。難點不在流程，在細節。", tag: '案例' , navTitle: "蒸餾是怎麼做的：從老師到學生"},
            { file: 'oss-7.html', title: "蒸餾的代價：模型正在變得越來越像", desc: "上一節説蒸餾是讓學生學老師。問題在於，學生學到的是老師的全部：本事、口癖、偏見、甚至對自己身份的認知。當整個行業都在向少數幾個老師學習，結果就是大家越來越像。", tag: '深入' , navTitle: "蒸餾的代價：模型正在變得越來越像"},
          ],
        },
        {
          id: 't-oss-local',
          title: '在自己的機器上跑起來',
          desc: '算清楚，再裝上',
          lessons: [
            { file: 'oss-8.html', title: "你的電腦能跑多大的模型", desc: "前面講的都是概念，這一節動手。選一下你的顯卡或者 Mac 型號，直接看結論。看完你會發現，本地跑模型的門檻比大多數人想的低。", tag: '交互' },
            { file: 'oss-9.html', title: "Ollama 與 LM Studio 怎麼上手", desc: "上一節算出了你能跑什麼，這一節把它裝起來。兩個工具，一個命令行一個圖形介面，第一次用十分鐘能跑通。", tag: '實戰' , navTitle: "Ollama 與 LM Studio 怎麼上手"},
          ],
        },
      ],
    },
    {
      id: 'p-exam',
      num: '自測中心',
      title: '七套篇章自測 · 350 道題',
      desc: "按篇章進行練習、自測和綜合複習。成績保存在目前瀏覽器，尚未接入公司帳號、個人中心或雲端弱點分析。",
      color: '#7c3aed',
      group: 'extra',
      routes: ['pm', 'build'],
      exam: true,
      topics: [
        {
          id: 't-exam-entry',
          title: '怎麼用這七套卷',
          desc: '兩種模式的區別與使用建議',
          lessons: [
            { file: 'exam.html', title: "七套篇章自測 · 350 道題", desc: "六個正課篇章各一套卷子，Grok Build 專題另有一套，每套 50 道題，全部依據對應內容編寫。學完一章就來考一次，比反覆重讀有用得多。全部考完了，最後還有一份跨全站的綜合考。", tag: '交互' , navTitle: "七套篇章自測 · 350 道題"},
          ],
        },
        {
          id: 't-exam-base',
          title: '基礎與 Harness',
          desc: '第一、二篇章的自測卷',
          lessons: [
            { file: 'exam-1.html', title: "大模型基礎 · 篇章自測", desc: "學完大模型原理篇來驗證一下。50 題全部出自本章課程：訓練三階段、Token 與上下文、幻覺的四種類型、四種緩解策略的選擇。", tag: '交互' , navTitle: "大模型基礎 · 篇章自測"},
            { file: 'exam-2.html', title: "AI Harness · 篇章自測", desc: "學完Harness 核心篇來驗證一下。50 題全部出自本章課程：上下文窗口、Prompt 工程、注入防禦、工具調用、KV Cache 與成本優化。", tag: '交互' , navTitle: "AI Harness · 篇章自測"},
          ],
        },
        {
          id: 't-exam-build',
          title: '實戰與工程設計',
          desc: '第三、四篇章的自測卷',
          lessons: [
            { file: 'exam-3.html', title: "實戰 · 從 Demo 到產品 · 篇章自測", desc: "學完動手實戰篇來驗證一下。50 題全部出自本章課程：生圖產品化、Agent 卡死與防呆、上下文壓縮、長期記憶、多 Agent 與 MCP。", tag: '交互' , navTitle: "實戰 · 從 Demo 到產品 · 篇章自測"},
            { file: 'exam-4.html', title: "AI 工程設計模式 · 篇章自測", desc: "學完工程進階篇來驗證一下。50 題全部出自本章課程：Workflow vs Agent、上下文工程、ACI 工具設計、評測方法論、沙箱與憑證隔離。", tag: '交互' , navTitle: "AI 工程設計模式 · 篇章自測"},
          ],
        },
        {
          id: 't-exam-deep',
          title: '前沿、方法論與源碼專題',
          desc: '第五、協作方法論篇與 Grok 專題的自測卷',
          lessons: [
            { file: 'exam-5.html', title: "Harness 與自我改進 · 篇章自測", desc: "學完自我改進篇來驗證一下。50 題全部出自本章課程：Harness 設計模式、上下文自動進化、遞歸自我改進的機制與七道關。", tag: '交互' , navTitle: "Harness 與自我改進 · 篇章自測"},
            { file: 'exam-7.html', title: "Vibe Coding 方法論 · 篇章自測", desc: "學完第七篇章來驗證一下。50 題全部出自本章課程：流程控制、質素底綫、拒絕分期、文檔沉澱、環境與安全閘門。", tag: '交互' , navTitle: "Vibe Coding 方法論 · 篇章自測"},
            { file: 'exam-6.html', title: "解剖 Grok Build · 篇章自測", desc: "學完協作方法論篇來驗證一下。50 題全部出自本章課程：運行時循環、Compaction、工具系統、記憶檢索、沙箱安全與 MCP 集成。", tag: '交互' , navTitle: "解剖 Grok Build · 篇章自測"},
          ],
        },
        {
          id: 't-exam-all',
          title: '學完整門課再來',
          desc: '跨全站的綜合驗收',
          lessons: [
            { file: 'exam-all.html', title: "全站綜合考 · 七章抽 35 題", desc: "篇章卷檢驗單章掌握，這份卷子檢驗的是另一件事：跨章節的概念會不會混。上下文壓縮和長期記憶的邊界在哪、Workflow 和 Agent 該怎麼選、Harness 和提示詞工程是什麼關係，這些只有把七章放在一起考才暴露得出來。學完整門課再來。", tag: '交互' , navTitle: "全站綜合考 · 七章抽 35 題"},
          ],
        },
      ],
    },
    {
      id: 'p9',
      num: '課後甜點',
      title: '一人公司 OPC',
      desc: 'AI 讓一個人就能做出產品，也讓能被搶走的東西變多了。這一章講確權與合規：商標、軟著、專利、域名、備案、註冊資本、股權。每一節都有法條出處和真實案例，做早了是投入，做晚了是損失。本地版可直接學習，進度僅保存在目前瀏覽器。',
      color: '#b45309',
      group: 'extra',
      routes: ['use', 'pro', 'pm', 'build'],
      bonus: true,
      topics: [
        {
          id: 't-opc-basics',
          routes: ['use', 'pro', 'pm', 'build'],
          title: '確權的地基',
          desc: '給每樣資產配對的那把鎖',
          lessons: [
            { file: 'opc-1.html', title: "六種武器：給每樣資產配對的鎖", desc: "你寫的程式碼、起的名字、想出來的算法、發出去的文章，在法律上是完全不同的東西，各有各的鎖。拿錯鎖等於沒鎖。這一節把六種武器一次認全，後面每一節都會回來用它。", tag: '開篇' , navTitle: "六種武器：給每樣資產配對的鎖"},
            { file: 'opc-2.html', title: "確權要趁早：做早了是投入，做晚了是損失", desc: "上一節認全了六種武器，這一節講什麼時候動手。答案很短：越早越好。因為確權這件事有個殘酷的特點，同一個動作，早做是幾百塊的投入，晚做是幾萬塊加一兩年時間的損失。", tag: '交互' , navTitle: "確權要趁早：做早了是投入，做晚了是損失"},
          ],
        },
        {
          id: 't-opc-tm',
          routes: ['use', 'pro', 'pm', 'build'],
          title: '商標與域名',
          desc: '品牌的户籍和入口',
          lessons: [
            { file: 'opc-3.html', title: "商標一個不夠：35、42、41 一起拿", desc: "商標按商品和服務分成 45 個類別，註冊哪一類就只在那一類受保護。很多人註冊了一個類就覺得萬事大吉，結果推廣的時候發現推廣本身屬於另一個類。這一節講清做互聯網產品最要緊的幾個類，以及圖樣一致性這個隱形的坑。", tag: '交互' , navTitle: "商標一個不夠：35、42、41 一起拿"},
            { file: 'opc-4.html', title: "被駁回之後：把擋路的商標拿掉", desc: "「方片數智」第一次提交就被駁回了。擋路的是一個 2015 年就註冊、卻早已沒在使用的在先商標。這一節把從駁回、撤三到複審的完整鏈路拆開講清楚，這條路是我們自己走完的一遍。", tag: '案例' , navTitle: "被駁回之後：把擋路的商標拿掉"},
            { file: 'opc-5.html', title: "域名全拿下：十萬的報價怎麼談到五千", desc: "miyang.cn 這個域名，曾經在交易平台上被掛到 102,222 元一口價。最後我們用五千塊拿下。中間沒有什麼談判魔法，只有一件提前三年做完的事：把這個品牌能用的後綴，幾乎全註冊在了自己手裏。", tag: '案例' , navTitle: "域名全拿下：十萬的報價怎麼談到五千"},
          ],
        },
        {
          id: 't-opc-code',
          routes: ['pm', 'build'],
          title: '程式碼、內容與技術',
          desc: '版權自動產生，證據要自己掙',
          lessons: [
            { file: 'opc-6.html', title: "軟著與備案：版權自動產生，證據要自己掙", desc: "著作權在創作完成那一刻就自動產生了，不用註冊。聽起來很省心，直到你被抄襲、要打官司的那天才發現：權利是自動的，證據不是。這一節講軟著登記和著作權備案這兩件「花小錢買證據」的事，順帶拆一個外包開發的大坑。", tag: '交互' , navTitle: "軟著與備案：版權自動產生，證據要自己掙"},
            { file: 'opc-7.html', title: "專利還是商業秘密：先申請，後公開", desc: "手裏有真技術的人要做一道選擇題：申請專利，還是當商業秘密捂着。兩條路的邏輯完全相反，選錯了代價很大。更要命的是順序問題：產品發佈在專利申請之前，這個專利就永遠申請不成了。", tag: '交互' , navTitle: "專利還是商業秘密：先申請，後公開"},
          ],
        },
        {
          id: 't-opc-entity',
          routes: ['pm', 'build'],
          title: '主體與上綫合規',
          desc: '備案、許可、註冊資本',
          lessons: [
            { file: 'opc-8.html', title: "ICP 備案是地基，ICP 證是收費執照", desc: "很多人把「ICP 備案」和「ICP 證」當成一回事，其實是兩件事，差着一百萬註冊資本的距離。備案是網站能在國內被瀏覽的前提，人人要辦；ICP 證是合法向用戶收費的執照，門檻高得多。這一節把兩個都講清，重點是註冊公司那天就要做對的一個決定。", tag: '交互' , navTitle: "ICP 備案是地基，ICP 證是收費執照"},
            { file: 'opc-9.html', title: "註冊資本別亂寫：五年內要真金白銀繳足", desc: "認繳制時代流行把註冊資本寫得很威風，反正不用馬上掏錢。這個玩法 2024 年 7 月起結束了：新公司法要求認繳的錢五年內繳足。這一節講註冊資本怎麼定，順帶拆一人公司最容易炸的兩個雷：公私帳混同，和貪省事用灰產收款。", tag: '交互' , navTitle: "註冊資本別亂寫：五年內要真金白銀繳足"},
          ],
        },
        {
          id: 't-opc-equity',
          routes: ['pm', 'build'],
          title: '合夥與股權',
          desc: '互補、控制權、代持與退出',
          lessons: [
            { file: 'opc-10.html', title: "合夥人要互補：能力重疊的兩個人別合夥", desc: "一個人跑到某個點，總會撞上自己補不上的短板，這時候才談合夥人。挑人的第一標準是能力互補，志同道合排在後面。這一節講兩條原則，和一個能省掉很多痛苦的「試婚期」做法。", tag: '交互' , navTitle: "合夥人要互補：能力重疊的兩個人別合夥"},
            { file: 'opc-11.html', title: "三個人各 1/3 是最貴的公平", desc: "三個人一齊做，股權一人三分之一，邊個都唔蝕，傾嘅時候大家都好舒服。呢個結構嘅代價半年後先出現：公司做唔到決定。這一節用表決權門檻算一遍，再講核心創始人為什麼要拿到 70% 以上。", tag: '交互' , navTitle: "三個人各 1/3 是最貴的公平"},
            { file: 'opc-12.html', title: "股權別靠感覺分：五個維度算一遍", desc: "上一節講了結構，這一節講比例點樣嚟。憑感覺談出來的數字，雙方過後都會覺得自己吃虧。把貢獻拆成五個維度，各給一個權重，算完再談，討論的對象就從「誰更重要」變成「這個維度算誰的」。", tag: '交互' , navTitle: "股權別靠感覺分：五個維度算一遍"},
            { file: 'opc-13.html', title: "先簽代持協議，成熟了再動工商登記", desc: "比例談完了，接下來是怎麼給。早期最容易犯的錯是結構做得太重：持股平台、期權池、一堆主體，公司還沒跑起來，架子先搭好了。這一節講三條紀律，重點是那句最貴的經驗，離職的人不簽字，公司會被鎖死。", tag: '交互' , navTitle: "先簽代持協議，成熟了再動工商登記"},
          ],
        },
        {
          id: 't-opc-strategy',
          routes: ['pm', 'build'],
          title: '戰略與收官',
          desc: '出海、選型和新創業公式',
          lessons: [
            { file: 'opc-14.html', title: "伺服器放哪不重要，用戶在哪才關鍵", desc: "很多 AI 產品的所謂出海，就是把伺服器放到新加坡，套一層境外模型的接口，然後照樣給國內用戶用。這套操作在合規上是無效的。這一節先把判斷標準説清，再講真出海到底要做哪些事。", tag: '交互' , navTitle: "伺服器放哪不重要，用戶在哪才關鍵"},
            { file: 'opc-15.html', title: "大廠看不上的長尾，才是一個人的機會", desc: "大公司立項要過 ROI 門檻，一個市場再真實，規模不夠大就不會有人做。這道門檻幫你擋掉了最強的競爭對手。這一節講國內長尾同海外兩條路點樣揀，再講一件直接影響成本的事：模型點樣揀。", tag: '交互' , navTitle: "大廠看不上的長尾，才是一個人的機會"},
            { file: 'opc-final.html', title: "新創業公式：先找買單的人，再用 AI 做出來", desc: "前面十五節講的是不踩坑：商標、軟著、專利、備案、註冊資本、股權。這一節講往哪走。舊的創業公式已經失效，因為它的第一步押的是技術門檻，而技術門檻現在接近於零。收官這節把新公式講清，把十五節攤成一張圖，再給一份能勾的自查清單。", tag: '收官' , navTitle: "新創業公式：先找買單的人，再用 AI 做出來"},
          ],
        },
      ],
    },
    {
      id: 'p-seo',
      num: '課後甜點',
      title: '被搜到：SEO 與 GEO',
      desc: "透過課程來源專案的公開網站案例學習 SEO 與 GEO，區分搜尋收錄、內容可讀性和來源核驗。案例經歷與流量不屬於方片內部平台；存取範圍以公司安排為準。",
      color: '#4338ca',
      group: 'extra',
      routes: ['use', 'pro', 'pm', 'build'],
      bonus: true,
      topics: [
        {
          id: 't-seo-why',
          routes: ['use', 'pro', 'pm', 'build'],
          title: '先搞清被發現這件事',
          desc: '做完不等於有人來',
          lessons: [
            { file: 'seo-1.html', title: "做出來了，為什麼沒人來", desc: "前面的課把產品做出來了，OPC 把它確了權。然後是一個更樸素的問題：做完不等於有人來。這一節先把「被發現」這件事拆開：流量從哪三條路來、各自什麼脾氣，再用一個五層漏斗，找到你的產品卡在哪一層。", tag: '開篇' , navTitle: "做出來了，為什麼沒人來"},
          ],
        },
        {
          id: 't-seo-field',
          routes: ['use', 'pro', 'pm', 'build'],
          title: '兩個戰場',
          desc: '搜索引擎給連結，AI 引擎給答案',
          lessons: [
            { file: 'seo-2.html', title: "SEO 最低可行清單：能被抓、能被讀懂、能被收錄", desc: "SEO 這個詞被各種「秘籍」搞得神神叨叨，其實對一個人的小站來説，值得做的部分很小、很明確：讓爬蟲抓得到、讓引擎讀得懂、讓收錄查得着。這一節只講做了就有效、不做就歸零的部分，每一條都能自己動手核對。", tag: '實戰' , navTitle: "SEO 最低可行清單：能被抓、能被讀懂、能被收錄"},
            { file: 'seo-3.html', title: "GEO：讓 AI 引擎願意引用你", desc: "越來越多的用戶跳過搜索框，直接把問題丟給 ChatGPT、Kimi 或豆包。答案由 AI 組織，你的站在不在答案裏，成了新的生死綫。這門手藝有個名字：GEO（Generative Engine Optimization）。這一節講它的四個槓桿，每個都配一個當場能玩的教具。", tag: '交互' , navTitle: "GEO：讓 AI 引擎願意引用你"},
          ],
        },
        {
          id: 't-seo-case',
          routes: ['pm', 'build'],
          title: '拆一個真實案例',
          desc: "前兩節的清單和槓桿，這一節全部落在一個真實病人身上：案例站點自己。2026 年 8 月 10 日我們給全站做了一次 SEO / GEO 審計，查出十個缺口，當週修完一輪。這一節挑五個最有代表性的，每個講清怎麼發現的、改了什麼、拿什麼驗收。",
          lessons: [
            { file: 'seo-4.html', title: "拆案例站點：Google 收錄 693 頁，Bing 只有 50 頁", desc: "前兩節的清單和槓桿，這一節全部落在一個真實病人身上：案例站點自己。2026 年 8 月 10 日我們給全站做了一次 SEO / GEO 審計，查出十個缺口，當週修完一輪。這一節挑五個最有代表性的，每個講清怎麼發現的、改了什麼、拿什麼驗收。", tag: '案例' , navTitle: "拆案例站點：Google 收錄 693 頁，Bing 只有 50 頁"},
          ],
        },
        {
          id: 't-seo-final',
          routes: ['pm', 'build'],
          title: '優先級與收官',
          desc: '一個人沒有 SEO 團隊，只有排序能力',
          lessons: [
            { file: 'seo-5.html', title: "一個人的優先級：先寫能被搜到的問題", desc: "技術清單前面三節講完了，全是一次性動作。真正日復一日的仗在內容：寫什麼、先寫什麼。一人公司沒有 SEO 團隊、沒有詞庫工具的預算，你唯一的武器是排序能力：把力氣花在有人搜的問題上，用真實經歷換可信度，離歪路遠一點。", tag: '實戰' , navTitle: "一個人的優先級：先寫能被搜到的問題"},
            { file: 'seo-final.html', title: "被搜到驗收清單：上綫前再過一遍", desc: "全章收官。前五節的東西全部收進一張 12 項清單，每項都是一個能當場核對的動作：查源碼、數條目、貼地址、看日誌。勾選進度存在本地，每次上綫新產品回來過一遍。清單之後是四個度量口徑，回答那個最重要的問題：點樣知道呢啲工夫有冇白做。", tag: '收官' , navTitle: "被搜到驗收清單：上綫前再過一遍"},
          ],
        },
      ],
    },
    {
      id: 'p8',
      num: '課後甜點',
      title: '雷軍創業課',
      desc: '這不是 AI 課，是正課學完後的一道甜點：整理自雷軍的創業公開課口述，涵蓋產品、口碑、找錢、估值、股權與現金流。給想靠 AI 做一人公司（OPC）的你，補上「做生意」的方法論。全章免登入開放。',
      color: '#f97316',
      group: 'extra',
      routes: ['pm', 'build'],
      bonus: true,
      freeAll: true,
      topics: [
        {
          id: 't-lei-mind',
          title: '創業者的自我修養',
          desc: '決心、勇氣與向死而生的心理建設',
          lessons: [
            { file: 'lei-1.html', title: "誰適合創業：莫名其妙的自信", desc: "什麼樣的人適合創業？雷軍的回答從一句玩笑開始：「創業不是人幹的事情，是阿貓阿狗幹的事情。」這一節講創業者需要的三種能力，以及 1996 年金山陷入絕境時，他靠什麼撐過來。", tag: '開篇' , navTitle: "誰適合創業：莫名其妙的自信"},
            { file: 'lei-2.html', title: "心理準備：第一天就想好怎麼死", desc: "大多數創業者第一天想的是公司會多成功，雷軍創辦小米的第一天想的是公司會怎麼死。這一節講他 40 歲再創業的動機、對失敗率的清醒認知，以及三條具體的保命策略。", tag: '交互' , navTitle: "心理準備：第一天就想好怎麼死"},
          ],
        },
        {
          id: 't-lei-dir',
          title: '方向與起點',
          desc: '喜歡的、能幹的、市場足夠大的',
          lessons: [
            { file: 'lei-3.html', title: "選方向：Go Big Market", desc: "「你們幹的事情，都不一定是你們能幹的最大的事情。」這一節是雷軍辦金山最大的後悔和總結：方向怎麼選、天花板怎麼算，以及一句他用得比發明人還多的話：Go Big Market，做最肥的市場。", tag: '交互' , navTitle: "選方向：Go Big Market"},
            { file: 'lei-4.html', title: "起名：贏在起跑綫", desc: "雷軍看到的創業者裏，99.9% 的公司名是隨便起的。而聯想、百度、騰訊、華為，這些成功公司的名字全都很好聽。這不是巧合：「你在名字上花多少時間，就意味着你會花多少時間在它的業務上」。這一節看小米這個名字是怎麼磨出來的。", tag: '交互' , navTitle: "起名：贏在起跑綫"},
          ],
        },
        {
          id: 't-lei-product',
          title: '產品與口碑',
          desc: '專注、極致、口碑、快',
          lessons: [
            { file: 'lei-5.html', title: "互聯網七字訣", desc: "「互聯網實際上是一種思想，一種做事的方法。這個方法就是七個字：專注、極致、口碑、快。」雷軍説琢磨透這七個字去做事是攻無不克的。它的恐怖之處在於，你要真做到。", tag: '交互' },
            { file: 'lei-6.html', title: "口碑的本質是超出預期", desc: "互聯網讓口碑傳播變得極快：東西好，很快就會被消費者傳開。但什麼東西才有口碑？雷軍花了很長時間琢磨透這個問題，答案來自兩次親身消費：一趟失望的帆船酒店，和一頓被感動的海底撈。", tag: '交互' , navTitle: "口碑的本質是超出預期"},
          ],
        },
        {
          id: 't-lei-money',
          title: '找錢與融資',
          desc: '信用是融資的全部前提',
          lessons: [
            { file: 'lei-7.html', title: "第一筆錢：從身邊人開始", desc: "辦公司第一件事就是需要錢。雷軍的答案很樸素：天使投資在美國就是湊份子，真正的問題是人哋憑咩相信你。這一節講第一筆錢由邊度嚟、信用點樣儲，以及為什麼幾百頁的商業計劃書沒人看。", tag: '交互' , navTitle: "第一筆錢：從身邊人開始"},
            { file: 'lei-8.html', title: "融資時機：有錢才能融到錢", desc: "這個世界很糾結：只有有錢才能融到錢。帳上留足現金、錢花一半就啓動、讓投資人來找你。再看懂 VC 的帳本，明白他要賺十倍為什麼不是貪婪，你就知道該在什麼時候、用什麼姿態談錢。", tag: '交互' , navTitle: "融資時機：有錢才能融到錢"},
            { file: 'lei-9.html', title: "估值的藝術：融資賣的是信心", desc: "做價越高越好？雷軍的結論正相反：做價高，出售的是一個更高的預期，達不成就要付出代價。這一節講怎麼定價（先做市場調查，從中間價往上走），以及融資這件事的本質：銷售信心。", tag: '交互' , navTitle: "估值的藝術：融資賣的是信心"},
          ],
        },
        {
          id: 't-lei-equity',
          title: '股權與合夥人',
          desc: '創業是一場分享 100% 夢想的拼圖',
          lessons: [
            { file: 'lei-10.html', title: "股權就是拼圖：切忌均分", desc: "剛開始創業的時候，那 100% 的股份其實是個夢想。創業的過程，就是拿這 100% 的夢想去跟錢 share、跟最優秀的工程師 share、跟最好的 marketing 和資源 share。雷軍的原話：創業就是拼圖。這一節看拼圖怎麼拼，以及極左、極右、均分這三種拼法為什麼都會死。", tag: '交互' , navTitle: "股權就是拼圖：切忌均分"},
            { file: 'lei-11.html', title: "合夥人：先分夢想，再分股份", desc: "股份的分配是相對的，不是絕對的：公司做到十億美金，1% 就是一千萬美元。所以找 co-founder 的順序不能反：先 share 夢想，他不 buy in，給他 100% 也沒用；然後才是角色、貢獻和分餅；最後把最難開口的事談完：鎖定四年，退出機制。", tag: '交互' , navTitle: "合夥人：先分夢想，再分股份"},
          ],
        },
        {
          id: 't-lei-ops',
          title: '經營基本功',
          desc: '現金流和人是公司的命',
          lessons: [
            { file: 'lei-12.html', title: "現金流與報酬包", desc: "對早期創業公司來説，最重要的數字是帳上還有多少現金：假如沒有任何收入，你能活多少個月？這是創業公司每天都要想的問題。這一節講雷軍的三筆帳：現金跑道、現金流，和給最優秀的人算的那筆「報酬包」。", tag: '交互' },
          ],
        },
        {
          id: 't-lei-final',
          title: '專題收官',
          desc: '把雷軍的課變成 OPC 的行動清單',
          lessons: [
            { file: 'lei-final.html', title: "寫給 AI 時代的一人公司", desc: "22 段口述講完了。雷軍講的是辦公司，但 AI 時代一個人就是一家公司：你自己是 CEO，也是那個技術大拿；你的存款是帳上現金，你的時間是 100% 的股份。收官這節把 12 節課攤成一張全景圖，再把它變成一份屬於 OPC（One Person Company）的自查清單和行動清單。", tag: '收官' , navTitle: "寫給 AI 時代的一人公司"},
            { file: 'lei-test.html', title: "測一測你的 AI 創業成功率", desc: "13 節課講完了，現在輪到你。12 道題，全部來自前面課程裏雷軍的核心判斷：心態、方向、產品、現金、合夥、AI 槓桿。憑直覺選，別猜「標準答案」，測的是你現在真實的樣子。", tag: '交互' , navTitle: "測一測你的 AI 創業成功率"},
          ],
        },
      ],
    },
  ],
};

/* ── 标签配色 ── */
window.TAG_STYLE = {
  '交互':   { bg: '#dcfce7', fg: '#15803d' },
  '動畫':   { bg: '#dcfce7', fg: '#166534' },
  '概念':   { bg: '#fef9c3', fg: '#a16207' },
  '案例':   { bg: '#fef2f2', fg: '#dc2626' },
  '開篇':   { bg: '#fef2f2', fg: '#dc2626' },
  '安全':   { bg: '#fef2f2', fg: '#dc2626' },
  '反例':   { bg: '#fef2f2', fg: '#dc2626' },
  '實戰':   { bg: '#dbeafe', fg: '#1d4ed8' },
  'PM 進階':{ bg: '#dbeafe', fg: '#1d4ed8' },
  '系統設計':{ bg: '#dbeafe', fg: '#1d4ed8' },
  '深入':   { bg: '#ffedd5', fg: '#ea580c' },
  '多模態': { bg: '#fef3c7', fg: '#92400e' },
  '選型':   { bg: '#fef3c7', fg: '#d97706' },
  '提示詞工程': { bg: '#e0f2fe', fg: '#0369a1' },
  'RAG':    { bg: '#f3e8ff', fg: '#7e22ce' },
  '架構':   { bg: '#dcfce7', fg: '#166534' },
  '彙總':   { bg: '#ede9fe', fg: '#6d28d9' },
  '收官':   { bg: '#fef9c3', fg: '#a16207' },
  '技巧':   { bg: '#ecfdf5', fg: '#065f46' },
  '設計模式':{ bg: '#fef2f2', fg: '#dc2626' },
  '方法論': { bg: '#fff7ed', fg: '#c2410c' },
  '規範':   { bg: '#ccfbf1', fg: '#0f766e' },
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
