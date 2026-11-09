(function (root) {
  'use strict';
  const key = 'ai_build_route_v1';
  const roles = [
    { id: 'use', name: 'AI 起步者', start: 'zero-0.html', image: 'tiger-teacher-pointer.webp', audience: '刚开始接触 AI 的每一位同事', description: '先认识 AI 能做什么、哪些结果需要核验，再学会把需求说清楚。用一个日常小任务，迈出拥抱 AI 的第一步。', tags: ['认识 AI', '清楚提问', '核验结果'], action: '从 AI 能做什么开始', outcome: '尝试一次真实任务，并说明哪些结果需要自己核验。' },
    { id: 'pro', name: '业务提效者', start: 'ai-tips-context.html', image: 'tiger-reading-seated.webp', audience: '内容、运营、设计、商务与职能岗位', description: '把 AI 用进选题、文案、资料整理和方案分析。练习提供背景、持续迭代与检查结果，让一次好回答变成可复用的方法。', tags: ['业务场景', '提示词迭代', '工作流'], action: '从工作中的好提问开始', outcome: '为一个重复任务整理输入、提示词、检查清单和交付标准。' },
    { id: 'build', name: '技术共创者', start: '1-2-api.html', image: 'tiger-ai-assistant.webp', audience: '研发、产品与希望动手搭建工具的同事', description: '从模型接口进入工具调用、Agent 与评测。把业务需求拆成可验证的小工具，与业务同事一起推进原型、试用和交付。', tags: ['模型接口', '工具与 Agent', '评测交付'], action: '从模型接口与对话开始', outcome: '跑通一个有明确输入、输出和人工检查点的工具原型。' }
  ];
  const copy = {
    zh: { title: '从你的工作目标开始学 AI', intro: '方片正在从 MCN 向科技方向转型。无论你在哪个岗位，都可以从适合自己的起点开始，把 AI 用进真实工作。', note: '角色按当前学习目标选择，不绑定岗位；随时可以切换，学习进度会保留。', all: '浏览完整课程', label: '员工学习路线', roles: roles },
    en: { title: 'Start with your goal at work', intro: 'Fangpian is moving from an MCN business toward technology. Every colleague can find a starting point and bring AI into real work.', note: 'Choose by your current goal, not your job title. Switch paths anytime; your learning progress stays.', all: 'Browse all courses', label: 'Employee learning paths', roles: [
      { name: 'AI Explorer', audience: 'Every colleague getting started with AI', description: 'Discover what AI can do, learn when to verify its answers, and practise giving clear instructions with a small everyday task.', tags: ['AI basics', 'Clear requests', 'Verification'], action: 'Start with what AI can do', outcome: 'Try a real task and identify what you need to verify.' },
      { name: 'AI Workflow Builder', audience: 'Content, operations, design, business and support teams', description: 'Use AI for ideas, writing, research and analysis. Practise providing context, iterating and checking results to build a repeatable way of working.', tags: ['Work scenarios', 'Iteration', 'Workflows'], action: 'Start with better work questions', outcome: 'Document the input, prompt, checks and acceptance criteria for a recurring task.' },
      { name: 'AI Tool Co-creator', audience: 'Developers, product teams and colleagues who want to build tools', description: 'Explore model APIs, tool use, agents and evaluation. Turn a business need into a small, testable tool with colleagues from the business.', tags: ['Model APIs', 'Tools and agents', 'Evaluation'], action: 'Start with model APIs and chat', outcome: 'Build a prototype with clear inputs, outputs and human checks.' }
    ] },
    ko: { title: '지금 하는 일에서 AI 학습을 시작하세요', intro: '팡피엔은 MCN에서 기술 중심 기업으로 전환하고 있습니다. 모든 동료가 자신의 출발점을 찾아 AI를 실제 업무에 활용할 수 있습니다.', note: '직급이 아닌 현재 학습 목표로 선택하세요. 경로를 바꿔도 학습 진도는 유지됩니다.', all: '전체 강좌 보기', label: '직원 학습 경로', roles: [
      { name: 'AI 입문자', audience: 'AI를 처음 접하는 모든 동료', description: 'AI가 할 수 있는 일과 검증이 필요한 결과를 알아보고, 일상적인 작은 과제로 명확하게 요청하는 법을 연습합니다.', tags: ['AI 기초', '명확한 질문', '결과 검증'], action: 'AI가 할 수 있는 일부터', outcome: '실제 과제를 시도하고 직접 검증할 부분을 구분합니다.' },
      { name: '업무 효율 실천자', audience: '콘텐츠·운영·디자인·비즈니스·지원 부서', description: '기획, 글쓰기, 자료 정리와 분석에 AI를 적용합니다. 배경 전달, 반복 개선, 결과 확인을 통해 재사용할 업무 방식을 만듭니다.', tags: ['업무 활용', '질문 개선', '워크플로'], action: '좋은 업무 질문부터', outcome: '반복 업무의 입력, 프롬프트, 점검과 완료 기준을 정리합니다.' },
      { name: '기술 공동 제작자', audience: '개발·제품 담당자와 도구를 만들고 싶은 동료', description: '모델 API에서 도구 호출, Agent, 평가까지 배웁니다. 현업 동료와 함께 업무 요구를 검증 가능한 작은 도구로 만듭니다.', tags: ['모델 API', '도구와 Agent', '평가와 전달'], action: '모델 API와 대화부터', outcome: '입력·출력과 사람의 확인 지점이 분명한 프로토타입을 만듭니다.' }
    ] }
  };
  copy.tw = { ...copy.zh, title: '從你的工作目標開始學 AI', intro: '方片正在從 MCN 向科技方向轉型。無論你在哪個崗位，都可以從適合自己的起點開始，把 AI 用進真實工作。', note: '角色按當前學習目標選擇，不綁定崗位；隨時可以切換，學習進度會保留。', all: '瀏覽完整課程', label: '員工學習路線', roles: [
    { name: 'AI 起步者', audience: '剛開始接觸 AI 的每一位同事', description: '先認識 AI 能做什麼、哪些結果需要核驗，再學會把需求說清楚。用一個日常小任務，邁出擁抱 AI 的第一步。', tags: ['認識 AI', '清楚提問', '核驗結果'], action: '從 AI 能做什麼開始', outcome: '嘗試一次真實任務，並說明哪些結果需要自己核驗。' },
    { name: '業務提效者', audience: '內容、營運、設計、商務與職能崗位', description: '把 AI 用進選題、文案、資料整理和方案分析。練習提供背景、持續迭代與檢查結果，讓一次好回答變成可複用的方法。', tags: ['業務場景', '提示詞迭代', '工作流'], action: '從工作中的好提問開始', outcome: '為一個重複任務整理輸入、提示詞、檢查清單和交付標準。' },
    { name: '技術共創者', audience: '研發、產品與希望動手搭建工具的同事', description: '從模型介面進入工具呼叫、Agent 與評測。把業務需求拆成可驗證的小工具，與業務同事一起推進原型、試用和交付。', tags: ['模型介面', '工具與 Agent', '評測交付'], action: '從模型介面與對話開始', outcome: '跑通一個有明確輸入、輸出和人工檢查點的工具原型。' }
  ] };
  copy.hk = copy.tw;
  function normalize(id) { return id === 'pm' ? 'build' : roles.some(role => role.id === id) ? id : 'all'; }
  function choice(search, storage) {
    const requested = new URLSearchParams(search || '').get('route');
    if (requested && (requested === 'all' || normalize(requested) !== 'all')) {
      const id = normalize(requested);
      try { storage.setItem(key, JSON.stringify(id)); } catch {}
      return id;
    }
    try { return normalize(JSON.parse(storage.getItem(key) || '"all"')); } catch { return 'all'; }
  }
  function localized(lang) {
    const value = copy[lang] || copy.zh;
    return { ...value, roles: roles.map((role, i) => ({ ...role, ...value.roles[i] })) };
  }
  root.FangpianPaths = { key, roles, normalize, choice, localized };
})(typeof window === 'undefined' ? globalThis : window);
