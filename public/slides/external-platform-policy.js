(function () {
  'use strict';

  function isBlocked(rawHref) {
    var url;
    try { url = new URL(rawHref, location.href); } catch (e) { return false; }
    var host = url.hostname.toLowerCase();
    var pathname = url.pathname.replace(/\/+$/, '') || '/';
    if (url.origin === location.origin && pathname === '/jd') return true;
    if (host === 'alice.miyang.cn' || host === 'alice.fans') return true;
    if (host === 'watcha.cn' || host.endsWith('.watcha.cn')) return true;
    if (host === 'miyang.cn' || host === 'www.miyang.cn') return true;
    if (host === 'fangpian.cn' || host === 'www.fangpian.cn') return true;
    if (host === 'github.com' && pathname.indexOf('/itshen/learn-ai') === 0) return true;
    if ((host === 'x.com' || host === 'twitter.com') && pathname.indexOf('/Fangpian_ai') === 0) return true;
    return host === 'beian.miit.gov.cn';
  }

  function removeBlockedLinks(root) {
    var scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll('a[href]').forEach(function (link) {
      if (isBlocked(link.getAttribute('href'))) link.remove();
    });
    if (root && root.matches && root.matches('a[href]') && isBlocked(root.getAttribute('href'))) root.remove();
  }

  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!link || !isBlocked(link.getAttribute('href'))) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    link.remove();
  }, true);

  function start() {
    var pageRoot = document.documentElement;
    if (!pageRoot) return;
    removeBlockedLinks(document);
    new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(removeBlockedLinks);
      });
    }).observe(pageRoot, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
}());
