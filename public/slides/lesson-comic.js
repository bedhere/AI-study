(function(){
  'use strict';
  const root=document.querySelector('[data-lesson-comic]');
  const story=window.AcademyComics?.[root?.dataset.lessonComic];
  if(!root||!story||story.panels.length!==4)return;
  const make=(tag,cls,text)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;};
  const heading=make('div','comic-heading'),title=make('h2','',story.title);title.id='lessonComicTitle';
  const controls=make('div','comic-controls'),play=make('button','comic-play','逐格讲解');play.type='button';play.setAttribute('aria-pressed','false');controls.append(play);heading.append(title,controls);
  const grid=make('div','comic-panels');
  story.panels.forEach((panel,index)=>{
    const figure=make('figure','comic-panel');figure.tabIndex=0;
    const image=make('img');image.src='assets/comics/'+story.slug+'-'+(index+1)+'.webp';image.alt=panel.alt;image.width=543;image.height=724;image.loading='lazy';image.decoding='async';
    const caption=make('figcaption');caption.append(make('strong','',`${index+1}. ${panel.label}`),make('span','',panel.text));figure.append(image,caption);grid.append(figure);
  });
  const takeaway=make('p','comic-takeaway',story.takeaway),status=make('p','comic-status','四格均可直接阅读，也可以播放逐格讲解。');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  root.replaceChildren(heading,grid,takeaway,status);root.setAttribute('aria-labelledby',title.id);
  const figures=Array.from(grid.children),reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer=0,active=-1;
  function stop(done=false){clearInterval(timer);timer=0;play.textContent=done?'重播讲解':'逐格讲解';play.setAttribute('aria-pressed','false');}
  function show(index){active=index;figures.forEach((node,i)=>node.classList.toggle('is-active',i===index));status.textContent=`第 ${index+1} 格：${story.panels[index].label}。${story.panels[index].text}`;}
  function start(){if(timer){stop();return;}show(0);if(reduce.matches){status.textContent='已按系统设置减少动效，使用键盘或点选每一格阅读。';return;}play.textContent='暂停讲解';play.setAttribute('aria-pressed','true');timer=setInterval(()=>{if(active>=3){stop(true);return;}show(active+1);},2600);}
  play.addEventListener('click',start);
  figures.forEach((node,index)=>{node.addEventListener('click',()=>{stop();show(index);});node.addEventListener('focus',()=>{stop();show(index);});node.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const next=Math.max(0,Math.min(3,index+(event.key==='ArrowRight'?1:-1)));figures[next].focus();}});});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  reduce.addEventListener('change',()=>stop());
  const observer=new IntersectionObserver(entries=>{if(entries.every(entry=>!entry.isIntersecting))stop();},{threshold:.05});observer.observe(root);
  window.addEventListener('pagehide',()=>{stop();observer.disconnect();},{once:true});
})();
