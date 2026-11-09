/* Shared browser-local learning state. No account or remote service is required. */
(function (global) {
  'use strict';
  if (global.FangpianLearning) return;
  var KEY = 'ai_course_progress_v1';
  var memory = Object.create(null);
  var persistent = true;
  var langMatch = (global.location && global.location.pathname || '').match(/\.(en|ko|tw|hk)\.html$/);
  var lang = langMatch ? langMatch[1] : 'zh';
  var words = {
    zh: {mode:'本地学习',note:'进度保存在此浏览器，无需登录',temporary:'临时学习',storageError:'浏览器无法保存学习进度。当前页仍可学习，关闭页面后记录可能丢失。',resume:'继续上次学习',start:'开始学习',searchLabel:'搜索课程标题和正文',loading:'正在加载本地正文索引…',results:'找到 {n} 节课程',empty:'没有找到相关课程，试试更短的关键词，例如 Token、提示词、RAG。',searchError:'正文索引加载失败，当前仅显示标题匹配；重新输入可重试。',done:'已学会',localOnly:'仅保存在此浏览器'},
    en: {mode:'Local learning',note:'Progress stays in this browser. No sign-in required.',temporary:'Temporary session',storageError:'This browser cannot save progress. You can keep learning, but records may be lost when this page closes.',resume:'Continue learning',start:'Start learning',searchLabel:'Search course titles and text',loading:'Loading the local text index…',results:'{n} matching lessons',empty:'No matching lessons. Try a shorter keyword, such as Token, Prompt or RAG.',searchError:'The text index could not load. Title results are still available; edit the query to retry.',done:'Completed',localOnly:'Saved in this browser only'},
    ko: {mode:'로컬 학습',note:'로그인 없이 이 브라우저에 진도를 저장합니다.',temporary:'임시 학습',storageError:'브라우저에 진도를 저장할 수 없습니다. 학습은 가능하지만 페이지를 닫으면 기록이 사라질 수 있습니다.',resume:'이어서 학습',start:'학습 시작',searchLabel:'강좌 제목과 본문 검색',loading:'로컬 본문 색인 로딩 중…',results:'강좌 {n}개 찾음',empty:'일치하는 강좌가 없습니다. Token, Prompt, RAG처럼 짧은 검색어를 사용해 보세요.',searchError:'본문 색인을 불러오지 못했습니다. 제목 검색은 가능하며 검색어를 바꾸면 다시 시도합니다.',done:'학습 완료',localOnly:'이 브라우저에만 저장'},
    tw: {mode:'本機學習',note:'進度儲存在此瀏覽器，無需登入',temporary:'臨時學習',storageError:'瀏覽器無法儲存學習進度。目前仍可學習，關閉頁面後紀錄可能遺失。',resume:'繼續上次學習',start:'開始學習',searchLabel:'搜尋課程標題與正文',loading:'正在載入本機正文索引…',results:'找到 {n} 節課程',empty:'沒有找到相關課程，試試較短的關鍵字，例如 Token、提示詞、RAG。',searchError:'正文索引載入失敗，目前只顯示標題比對；重新輸入可重試。',done:'已學會',localOnly:'僅儲存在此瀏覽器'},
    hk: {mode:'本機學習',note:'進度儲存在此瀏覽器，無需登入',temporary:'臨時學習',storageError:'瀏覽器無法儲存學習進度。目前仍可學習，關閉頁面後紀錄可能遺失。',resume:'繼續上次學習',start:'開始學習',searchLabel:'搜尋課程標題與正文',loading:'正在載入本機正文索引…',results:'找到 {n} 節課程',empty:'沒有找到相關課程，試試較短的關鍵字，例如 Token、提示詞、RAG。',searchError:'正文索引載入失敗，目前只顯示標題比對；重新輸入可重試。',done:'已學會',localOnly:'僅儲存在此瀏覽器'}
  };
  var labels = words[lang];
  function canonical(file) {
    if (typeof file !== 'string') return '';
    file = file.replace(/\.(en|ko|tw|hk)(?=\.html$)/, '');
    return /^[a-z0-9][a-z0-9_.-]*\.html$/i.test(file) ? file : '';
  }
  function sanitize(input) {
    var result = Object.create(null);
    if (!input || typeof input !== 'object' || Array.isArray(input)) return result;
    Object.keys(input).forEach(function (file) {
      if (file === '__last') { var last = canonical(input[file]); if (last) result.__last = last; return; }
      var key = canonical(file);
      if (key && (input[file] === 1 || input[file] === true)) result[key] = 1;
    });
    return result;
  }
  function route(hash) {
    var decoded = '';
    try { decoded = decodeURIComponent(String(hash || '').replace(/^#/, '')); } catch (error) {}
    var parts = decoded.split('?');
    var file = canonical(parts[0]);
    var mode = /^mode=(exam|drill)$/.exec(parts[1] || '');
    return {file:file,mode:file && /^exam-(?:\d+|all)\.html$/.test(file) && mode ? mode[1] : ''};
  }
  function showStorageWarning() {
    if (!global.document) return;
    function render() {
      var node = document.getElementById('localStorageWarning');
      if (!node) {
        node = document.createElement('div'); node.id = 'localStorageWarning';
        node.setAttribute('role', 'status');
        node.style.cssText = 'position:fixed;bottom:16px;left:16px;right:16px;z-index:10000;padding:12px 16px;background:#fff4cc;color:#4c3800;border:1px solid #e6ca68;border-radius:10px;font:14px/1.6 system-ui;max-width:680px;margin:auto';
        document.body.appendChild(node);
      }
      node.textContent = labels.storageError;
    }
    if (document.body) render(); else document.addEventListener('DOMContentLoaded', render, {once:true});
  }
  try { global.localStorage.setItem('fp_storage_probe', '1'); global.localStorage.removeItem('fp_storage_probe'); }
  catch (error) { persistent = false; showStorageWarning(); }
  function read() {
    if (persistent) {
      try { memory = sanitize(JSON.parse(global.localStorage.getItem(KEY) || '{}')); }
      catch (error) { /* Malformed legacy data is ignored; blocked storage uses memory. */ }
    }
    return sanitize(memory);
  }
  function notify() {
    if (global.dispatchEvent && global.CustomEvent) global.dispatchEvent(new global.CustomEvent('fangpian:progress', {detail:{persistent:persistent}}));
  }
  function write(value) {
    var before = JSON.stringify(read());
    memory = sanitize(value);
    var serialized = JSON.stringify(memory);
    if (persistent) {
      try { global.localStorage.setItem(KEY, serialized); }
      catch (error) { persistent = false; showStorageWarning(); }
    }
    if (before !== serialized) notify();
    return persistent;
  }
  function forLessons(lessons) {
    var progress = read();
    var result = Object.create(null);
    (lessons || []).forEach(function (lesson) { if (progress[canonical(lesson.file)]) result[lesson.file] = 1; });
    var last = (lessons || []).find(function (lesson) { return canonical(lesson.file) === progress.__last; });
    if (last) result.__last = last.file;
    return result;
  }
  function saveLessons(value, lessons) {
    var combined = read();
    (lessons || []).forEach(function (lesson) { delete combined[canonical(lesson.file)]; });
    var next = sanitize(value);
    Object.keys(next).forEach(function (key) { combined[key] = next[key]; });
    return write(combined);
  }
  function completed(lessons) {
    var progress = read();
    return (lessons || []).filter(function (lesson) { return !!progress[canonical(lesson.file)]; }).length;
  }
  function lastFor(lessons) {
    var progress = read();
    var last = (lessons || []).find(function (lesson) { return canonical(lesson.file) === progress.__last; });
    return last ? last.file : '';
  }
  function saveExam(result) {
    var records = [];
    try { records = JSON.parse(global.localStorage.getItem('fangpian_exam_results_v1') || '[]'); if (!Array.isArray(records)) records = []; } catch (error) {}
    records.push({exam:String(result.exam || ''),score:Number(result.score),right:Number(result.right),total:Number(result.total),mode:String(result.mode || ''),completedAt:new Date().toISOString()});
    try { global.localStorage.setItem('fangpian_exam_results_v1', JSON.stringify(records.slice(-50))); return true; }
    catch (error) { persistent = false; showStorageWarning(); return false; }
  }
  global.FangpianLearning = {key:KEY,lang:lang,labels:labels,canonical:canonical,route:route,read:read,write:write,forLessons:forLessons,saveLessons:saveLessons,completed:completed,lastFor:lastFor,saveExam:saveExam,get persistent(){return persistent;}};
  if (global.addEventListener) global.addEventListener('storage', function (event) { if (event.key === KEY || event.key === null) { read(); notify(); } });
})(typeof window === 'undefined' ? globalThis : window);
