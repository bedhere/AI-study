(function(){
  'use strict';
  const model=window.AcademyFeedback, data=window.AcademyFeedbackData||{};
  if(!model||document.getElementById('employeeFeedback'))return;
  const store=model.store;
  function element(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;}
  const section=element('section','academy-feedback section');section.id='employeeFeedback';
  const wrap=element('div','wrap'), top=element('div','academy-feedback-heading'), intro=element('div');
  intro.append(element('h2','','一起学习，一起进步'),element('p','academy-feedback-intro','分享学习中的收获，也聊聊还没弄懂的问题。'));
  const actions=element('div','academy-feedback-actions'), write=element('button','academy-feedback-write');write.type='button';
  const identity=element('span','academy-feedback-identity'), logout=element('button','academy-feedback-logout','退出');logout.type='button';
  actions.append(identity,logout,write);top.append(intro,actions);
  const notice=element('p','academy-feedback-notice');notice.setAttribute('role','status');notice.setAttribute('aria-live','polite');
  const grid=element('div','academy-feedback-grid');wrap.append(top,notice,grid);section.append(wrap);
  const anchor=document.getElementById('topics');if(!anchor)return;anchor.before(section);

  const dialog=element('dialog','academy-feedback-dialog');dialog.setAttribute('aria-labelledby','feedbackDialogTitle');
  const close=element('button','academy-feedback-close','×');close.type='button';close.setAttribute('aria-label','关闭评论窗口');close.addEventListener('click',()=>dialog.close());
  const title=element('h2');title.id='feedbackDialogTitle';
  const explanation=element('p','academy-feedback-dialog-note');
  const error=element('p','academy-feedback-error');error.setAttribute('role','alert');error.id='feedbackFormError';
  const loginForm=element('form','academy-feedback-form'), nameLabel=element('label','','你的昵称');nameLabel.htmlFor='feedbackNickname';
  const name=element('input');name.id='feedbackNickname';name.name='nickname';name.required=true;name.maxLength=24;name.autocomplete='nickname';name.placeholder='填写你的昵称';name.setAttribute('aria-describedby','feedbackFormError');
  const loginButton=element('button','academy-feedback-write','登录并继续');loginButton.type='submit';loginForm.append(nameLabel,name,loginButton);
  const commentForm=element('form','academy-feedback-form'), author=element('p','academy-feedback-author'), textLabel=element('label','','你的学习反馈');textLabel.htmlFor='feedbackCommentText';
  const text=element('textarea');text.id='feedbackCommentText';text.name='comment';text.required=true;text.maxLength=500;text.rows=5;text.placeholder='哪一节课帮到了你？有什么想分享或继续探索的？';text.setAttribute('aria-describedby','feedbackTextCount feedbackFormError');
  const bottom=element('div','academy-feedback-form-bottom'), counter=element('span','academy-feedback-count','0 / 500');counter.id='feedbackTextCount';
  const publish=element('button','academy-feedback-write','发布评论');publish.type='submit';bottom.append(counter,publish);
  commentForm.append(author,textLabel,text,bottom,element('small','academy-feedback-local-note','评论仅保存在此浏览器，最多保留最近 20 条；清除网站数据后会丢失。'));
  dialog.append(close,title,explanation,error,loginForm,commentForm);document.body.append(dialog);
  let draftAuthor=null;
  function compose(){
    error.textContent='';const profile=store.profile();draftAuthor=profile?.id||null;
    title.textContent=profile?'写下你的学习收获':'登录 AI学院';
    explanation.textContent=profile?'交流具体的体验和问题，让下一次学习更有方向。':'使用昵称建立此浏览器的个人身份。无需密码，资料与评论都只保存在本机。';
    loginForm.hidden=!!profile;commentForm.hidden=!profile;
    if(profile)author.textContent='以 '+profile.name+' 的身份发布';
    if(!dialog.open)dialog.showModal();
    (profile?text:name).focus();
  }
  write.addEventListener('click',compose);
  loginForm.addEventListener('submit',event=>{
    event.preventDefault();error.textContent='';
    try{
      const matched=(data.profiles||[]).find(profile=>profile.name===name.value.trim());
      store.signIn(name.value,matched?.avatar||'');render();compose();
    }catch(failure){error.textContent=failure.message;}
  });
  text.addEventListener('input',()=>{counter.textContent=text.value.length+' / 500';error.textContent='';});
  commentForm.addEventListener('submit',event=>{
    event.preventDefault();error.textContent='';publish.disabled=true;
    try{store.publish(text.value,draftAuthor);text.value='';counter.textContent='0 / 500';dialog.close();render();notice.textContent='评论已发布，保存在当前浏览器。';}
    catch(failure){error.textContent=failure.message;}
    finally{publish.disabled=false;}
  });
  logout.addEventListener('click',()=>{try{store.signOut();render();notice.textContent='已退出本机身份，学习进度和评论仍然保留。';}catch(failure){notice.textContent=failure.message;}});
  function card(item,index,profile){
    const node=element('article','academy-feedback-card'), header=element('header');
    const avatar=element('span','academy-feedback-avatar',Array.from(item.name.trim())[0]);avatar.setAttribute('aria-hidden','true');
    const path=model.avatar(item.avatar);
    if(path){const image=element('img');image.src=path;image.width=40;image.height=40;image.loading='lazy';image.alt='';image.addEventListener('error',()=>image.remove(),{once:true});avatar.append(image);}
    header.append(avatar,element('h3','',item.name));
    if(profile&&item.authorId===profile.id)header.append(element('span','academy-feedback-own','我的'));
    node.append(header);
    const body=element('p','academy-feedback-text',item.text);body.id='employeeFeedbackText'+index;node.append(body);
    if(Array.from(item.text).length>110||item.text.split('\n').length>3){
      node.classList.add('is-collapsed');const toggle=element('button','academy-feedback-expand','展开全文');toggle.type='button';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls',body.id);
      toggle.addEventListener('click',()=>{const collapsed=node.classList.toggle('is-collapsed');toggle.setAttribute('aria-expanded',String(!collapsed));toggle.textContent=collapsed?'展开全文':'收起';});node.append(toggle);
    }
    if(item.createdAt){const date=element('time','academy-feedback-date',new Date(item.createdAt).toLocaleDateString('zh-CN'));date.dateTime=item.createdAt;node.append(date);}
    return node;
  }
  function render(){
    const profile=store.profile();identity.textContent=profile?profile.name+' · 本机身份':'';logout.hidden=!profile;write.textContent=profile?'写评论':'登录后写评论';
    const initial=(Array.isArray(data.items)?data.items:[]).filter(item=>item&&item.approved===true&&typeof item.name==='string'&&item.name.trim()&&typeof item.text==='string'&&item.text.trim()).slice(0,12);
    const items=[...store.list().reverse(),...initial];grid.replaceChildren();grid.dataset.short=items.length<=4?'true':'false';
    items.forEach((item,index)=>grid.append(card(item,index,profile)));
  }
  window.addEventListener('storage',event=>{
    if(event.key===model.profileKey||event.key===model.commentsKey||event.key===null){render();if(dialog.open&&draftAuthor!==store.profile()?.id){dialog.close();notice.textContent='本机登录身份已更新，请重新打开评论窗口。';}}
  });
  render();
})();
