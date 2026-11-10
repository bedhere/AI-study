/* Browser-local completion certificates. No account or remote issuer is implied. */
(function (root) {
  'use strict';
  const KEY = 'fangpian_certificate_v1';
  const PLAN_KEY = 'fangpian_certificate_plan_v1';
  // Explicit, versioned required lists: unrelated electives never affect graduation.
  const core = ['zero-1.html', 'zero-3.html', 'zero-4.html', 'zero-5.html', 'ai-tips-verify.html', 'ai-tips-context.html'];
  const plans = [
    { id: 'core', label: 'AI 核心课程', files: core },
    { id: 'use', label: 'AI 起步者', files: [...core, 'zero-0.html', 'zero-2.html', 'zero-6.html'] },
    { id: 'pro', label: '业务提效者', files: [...core, 'ai-tips-iterate.html', 'ai-tips-boundary.html', 'ai-tips-scenarios.html', 'zero-q-privacy.html'] },
    { id: 'build', label: '技术共创者', files: [...core, '1-2-api.html', 'training-data.html', 'train-vs-infer.html', '1-2-vocab.html', '1-2-base.html'] }
  ];
  const canonical = file => typeof file === 'string' && /^[a-z0-9][a-z0-9_.-]*\.html$/i.test(file) ? file.replace(/\.(en|ko|tw|hk)(?=\.html$)/, '') : '';
  function plan(lessons, id = 'core') {
    const selected = plans.find(item => item.id === id) || plans[0];
    const available = new Map((lessons || []).map(lesson => [canonical(lesson.file), lesson]));
    return { ...selected, lessons: selected.files.map(file => available.get(file)).filter(Boolean), missing: selected.files.filter(file => !available.has(file)) };
  }
  function selectedPlan(storage) {
    try {
      storage = storage || root.localStorage;
      const explicit = storage?.getItem(PLAN_KEY);
      if (plans.some(item => item.id === explicit)) return explicit;
      const route = JSON.parse(storage?.getItem('ai_build_route_v1') || '"all"');
      if (plans.some(item => item.id === route)) return route;
    } catch { /* A blocked store simply starts with the core plan. */ }
    return 'core';
  }
  function catalog(lessons) {
    return [...new Set((Array.isArray(lessons) ? lessons : []).map(lesson => canonical(lesson?.file)).filter(Boolean))].sort();
  }
  function courseKey(lessons, language = 'zh') {
    let hash = 2166136261;
    for (const char of catalog(lessons).join('\n')) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
    return (/^(zh|en|ko|tw|hk)$/.test(language) ? language : 'zh') + '-' + (hash >>> 0).toString(36);
  }
  function completion(lessons, progress) {
    const files = catalog(lessons), done = new Set();
    if (progress && typeof progress === 'object' && !Array.isArray(progress)) {
      for (const file of Object.keys(progress)) if (progress[file] === true || progress[file] === 1) done.add(canonical(file));
    }
    const total = files.length, completed = files.filter(file => done.has(file)).length;
    return { total, done: completed, remaining: total - completed, percent: total ? Math.round(completed / total * 100) : 0, eligible: total > 0 && completed === total };
  }
  function cleanName(value) {
    if (typeof value !== 'string' || Array.from(value).some(char => char.codePointAt(0) < 32 || char.codePointAt(0) === 127)) return '';
    const name = value.trim().replace(/\s+/g, ' ');
    return name && Array.from(name).length <= 24 ? name : '';
  }
  function validRecord(record, scope) {
    return record && record.version === 1 && record.courseKey === scope && /^FP-\d{8}-[A-F0-9]{8}$/.test(record.id)
      && !!cleanName(record.name) && cleanName(record.name) === record.name && typeof record.issuedAt === 'string' && Number.isFinite(Date.parse(record.issuedAt))
      && Number.isInteger(record.lessonCount) && record.lessonCount > 0 && record.lessonCount < 10000;
  }
  function createStore(storage, options = {}) {
    let memory = {}, persistent = !!storage;
    const now = options.now || (() => new Date());
    const nonce = options.nonce || (() => {
      if (root.crypto?.getRandomValues) return Array.from(root.crypto.getRandomValues(new Uint8Array(4)), value => value.toString(16).padStart(2, '0')).join('').toUpperCase();
      return Math.floor(Math.random() * 0x100000000).toString(16).padStart(8, '0').toUpperCase();
    });
    function read() {
      if (persistent) {
        try {
          const saved = JSON.parse(storage.getItem(KEY) || '{}'), records = {};
          if (saved && saved.version === 1 && saved.records && typeof saved.records === 'object' && !Array.isArray(saved.records)) {
            for (const [scope, record] of Object.entries(saved.records).slice(-12)) if (/^(zh|en|ko|tw|hk)-[a-z0-9]+$/.test(scope) && validRecord(record, scope)) records[scope] = { version: 1, courseKey: scope, id: record.id, name: record.name, issuedAt: record.issuedAt, lessonCount: record.lessonCount, language: scope.split('-')[0], ...(plans.some(p => p.id === record.planId) ? { planId: record.planId, planLabel: plans.find(p => p.id === record.planId).label } : {}) };
          }
          memory = records;
        } catch { /* Malformed records do not become an issued certificate. */ }
      }
      return memory;
    }
    function status(lessons, progress, language = 'zh', planId) {
      const training = planId ? plan(lessons, planId) : null;
      const required = training ? training.lessons : lessons;
      const scope = courseKey(required, language), record = read()[scope];
      const result = completion(required, progress);
      if (training?.missing.length) result.eligible = false;
      return { ...result, scope, record: record ? { ...record } : null, persistent, plan: training };
    }
    function claim(lessons, progress, name, language = 'zh', planId) {
      const current = status(lessons, progress, language, planId), normalized = cleanName(name);
      if (!normalized) throw new Error('请输入 1—24 个字的证书姓名。');
      if (current.plan?.missing.length) throw new Error('当前语言的结业课程不完整，请切换简体中文后查看。');
      if (!current.total || (!current.record && !current.eligible)) throw new Error('学完全部课程后，即可领取结业证书。');
      const date = now(), stamp = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('');
      const record = current.record ? { ...current.record, name: normalized } : { version: 1, courseKey: current.scope, id: 'FP-' + stamp + '-' + nonce(), name: normalized, issuedAt: date.toISOString(), lessonCount: current.total, language };
      if (current.plan) { record.planId = current.plan.id; record.planLabel = current.plan.label; }
      memory[current.scope] = record;
      memory = Object.fromEntries(Object.entries(memory).slice(-12));
      if (persistent) {
        try { const raw = JSON.stringify({ version: 1, records: memory }); if (raw.length * 2 > 8192) throw new Error('Certificate storage budget'); storage.setItem(KEY, raw); }
        catch { persistent = false; }
      }
      return { ...record };
    }
    // Probe access separately from JSON parsing so a blocked store still works in memory.
    if (storage) { try { storage.getItem(KEY); } catch { persistent = false; } }
    return { status, claim, get persistent() { return persistent; } };
  }
  let storage;
  try { storage = root.localStorage; } catch { /* Keep this page usable without persistence. */ }
  root.FangpianCertificate = { key: KEY, planKey: PLAN_KEY, plans, plan, selectedPlan, catalog, courseKey, completion, cleanName, createStore, store: createStore(storage) };
})(typeof window === 'undefined' ? globalThis : window);
