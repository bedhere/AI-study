/* Compatibility API for local learning. It never creates a signed-in session. */
(function () {
  'use strict';
  var local = window.FangpianLearning;
  if (!local) throw new Error('local-learning.js must load before auth.js');
  var state = Object.freeze({loggedIn:false,localMode:true,nickname:'',avatarUrl:''});
  function readerUrl(next) {
    var fallback = '/slides/learn' + (local.lang === 'en' ? '.en' : local.lang === 'ko' ? '.ko' : local.lang === 'tw' ? '.tw' : local.lang === 'hk' ? '.hk' : '') + '.html';
    try { var url = new URL(next || fallback, location.href); if (url.origin === location.origin && /^\/slides\/learn(?:\.(en|ko|tw|hk))?\.html$/.test(url.pathname)) return url.pathname + url.hash; } catch (error) {}
    return fallback;
  }
  function goLearn(next) { location.assign(readerUrl(next)); }
  function mount(node) {
    if (!node) return;
    node.classList.add('xa-slot'); node.textContent = '';
    var badge = document.createElement('span');
    badge.className = 'local-mode-badge';
    badge.textContent = local.persistent ? local.labels.mode : local.labels.temporary;
    badge.title = local.labels.note;
    badge.setAttribute('aria-label', badge.textContent + '，' + local.labels.note);
    badge.style.cssText = 'display:inline-flex;align-items:center;padding:7px 11px;border-radius:9px;background:var(--pill-bg,#f5f4ef);color:var(--text-s,#514b43);font:600 12px/1.5 system-ui;white-space:nowrap';
    node.appendChild(badge);
  }
  window.XueaiAuth = {state:state,ready:Promise.resolve(state),isFree:function(){return true;},mount:mount,goLogin:goLearn,openLoginModal:goLearn,openGroupModal:function(){}};
})();
