/* Local nickname identity, not company authentication. No network or image data. */
(function(root){
  'use strict';
  const profileKey='academy_local_profile_v1', commentsKey='academy_local_comments_v1';
  const limits=Object.freeze({commentsBytes:16384,profileBytes:1024,maxComments:20,maxText:500});
  const cleanName=value=>typeof value==='string'?Array.from(value.trim().replace(/\s+/g,' ')).slice(0,24).join(''):'';
  const avatar=value=>typeof value==='string'&&/^assets\/fangpian\/[a-zA-Z0-9_.-]+\.(webp|png|svg)$/.test(value)?value:'';
  function createStore(storage,options={}){
    const now=options.now||(()=>new Date());
    const nonce=options.nonce||(()=>root.crypto?.randomUUID?.().replaceAll('-','').slice(0,20)||Math.random().toString(36).slice(2)+Date.now().toString(36));
    function read(key,fallback){try{return JSON.parse(storage?.getItem(key)||'null')||fallback;}catch{return fallback;}}
    function persist(key,value,budget){
      const raw=JSON.stringify(value);
      if(raw.length*2>budget)throw new Error('本地空间不足，请缩短内容后重试。');
      try{if(!storage)throw Error();storage.setItem(key,raw);}catch{throw new Error('浏览器无法保存，请允许此网站存储数据后重试。');}
    }
    function profile(){
      const value=read(profileKey,null);
      if(!value||value.active===false||value.version!==1||!/^p-[a-z0-9]{6,64}$/i.test(value.id)||!cleanName(value.name))return null;
      return {version:1,id:value.id,name:cleanName(value.name),avatar:avatar(value.avatar)};
    }
    function signIn(name,image=''){
      if(typeof name!=='string'||!name.trim()||Array.from(name.trim()).length>24||Array.from(name).some(char=>char.codePointAt(0)<32||char.codePointAt(0)===127))throw new Error('请输入 1—24 个字的昵称。');
      const previous=read(profileKey,{}), reuse=previous.version===1&&/^p-[a-z0-9]{6,64}$/i.test(previous.id)&&previous.name===cleanName(name);
      const value={version:1,id:reuse?previous.id:'p-'+nonce(),name:cleanName(name),avatar:avatar(image),active:true};
      persist(profileKey,value,limits.profileBytes);return value;
    }
    function signOut(){const value=profile();if(value)persist(profileKey,{...value,active:false},limits.profileBytes);}
    function list(){
      const value=read(commentsKey,{});
      if(value.version!==1||!Array.isArray(value.items))return [];
      return value.items.filter(item=>item&&/^c-[a-z0-9]{6,64}$/i.test(item.id)&&/^p-[a-z0-9]{6,64}$/i.test(item.authorId)&&cleanName(item.name)&&typeof item.text==='string'&&item.text.trim()&&Array.from(item.text).length<=limits.maxText&&Number.isFinite(Date.parse(item.createdAt)))
        .slice(-limits.maxComments).map(item=>({id:item.id,authorId:item.authorId,name:cleanName(item.name),avatar:avatar(item.avatar),text:item.text.trim(),createdAt:new Date(item.createdAt).toISOString()}));
    }
    function publish(text,expectedAuthor){
      const author=profile();if(!author)throw new Error('请先登录后再发布评论。');
      if(expectedAuthor&&expectedAuthor!==author.id)throw new Error('登录身份已变化，请关闭窗口后重新打开。');
      if(typeof text!=='string'||!text.trim()||Array.from(text.trim()).length>limits.maxText)throw new Error('请输入 1—500 个字的学习反馈。');
      const item={id:'c-'+nonce(),authorId:author.id,name:author.name,avatar:author.avatar,text:text.trim(),createdAt:now().toISOString()};
      const items=[...list(),item].slice(-limits.maxComments);
      while(JSON.stringify({version:1,items}).length*2>limits.commentsBytes&&items.length>1)items.shift();
      persist(commentsKey,{version:1,items},limits.commentsBytes);return item;
    }
    return {profile,signIn,signOut,list,publish};
  }
  let storage;try{storage=root.localStorage;}catch{}
  root.AcademyFeedback={profileKey,commentsKey,limits,cleanName,avatar,createStore,store:createStore(storage)};
})(typeof window==='undefined'?globalThis:window);
