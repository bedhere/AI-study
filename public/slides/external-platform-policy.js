/* Closed learning environment: live navigation stays on this origin.
   Source citations remain text; technical URLs inside teaching code are not altered. */
(function(){
  'use strict';
  const browser=typeof window==='undefined'?globalThis:window;
  if(browser.AcademyNavigationPolicy)return;
  function allowed(raw,download=false){
    if(!raw||/^\s*#/.test(raw)||raw==='about:blank')return true;
    try{
      const url=new URL(raw,location.href);
      if(download&&/^data:image\/(?:png|jpeg|webp|svg\+xml);/i.test(raw))return true;
      if(download&&url.protocol==='blob:'&&url.origin===location.origin)return true;
      return /^https?:$/.test(url.protocol)&&url.origin===location.origin&&url.pathname!=='/jd';
    }catch{return false;}
  }
  function neutralize(node){
    if(!node?.getAttribute)return;
    const key=node.matches('form')?'action':node.matches('button,input')?'formaction':'href';
    const raw=node.getAttribute(key);
    if(!raw||allowed(raw,node.hasAttribute('download')))return;
    node.removeAttribute(key);node.removeAttribute('target');node.removeAttribute('ping');
    for(const attr of ['onclick','onmousedown','onmouseup'])node.removeAttribute(attr);
    node.setAttribute('data-source-reference','true');
  }
  function scan(root){
    if(root?.matches?.('a[href],area[href],form[action],button[formaction],input[formaction]'))neutralize(root);
    root?.querySelectorAll?.('a[href],area[href],form[action],button[formaction],input[formaction]').forEach(neutralize);
  }
  for(const type of ['click','auxclick'])document.addEventListener(type,event=>{
    const link=event.target?.closest?.('a,area');if(!link)return;
    if(link.hasAttribute('data-source-reference')||!allowed(link.getAttribute('href'),link.hasAttribute('download'))){event.preventDefault();event.stopImmediatePropagation();neutralize(link);}
  },true);
  document.addEventListener('submit',event=>{
    const form=event.target;
    if(form?.hasAttribute('data-source-reference')||!allowed(event.submitter?.getAttribute('formaction')||form?.getAttribute('action'))){event.preventDefault();event.stopImmediatePropagation();}
  },true);
  if(typeof browser.open==='function'){
    const open=browser.open.bind(browser);
    browser.open=function(url,target,features){if(!allowed(url))return null;return open(url?new URL(url,location.href).href:url,target,features);};
  }
  function start(){if(!document.documentElement)return;scan(document);new MutationObserver(records=>records.forEach(record=>{if(record.type==='attributes')neutralize(record.target);else record.addedNodes.forEach(scan);})).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['href','action','formaction']});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  browser.AcademyNavigationPolicy={allowed};
})();
