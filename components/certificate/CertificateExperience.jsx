/* oxlint-disable next/no-img-element -- Static HTML islands use local SVGs and generated PNG data URLs outside the Next image pipeline. */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import Lanyard from '../Lanyard/Lanyard.jsx';
import './certificate.css';

const model = window.FangpianCertificate;
const local = window.FangpianLearning;
const lessons = window.COURSE_FLAT || [];
const language = local?.lang || 'zh';
const suffix = language === 'zh' ? '' : '.' + language;
const certificateUrl = 'certificate' + suffix + '.html';
const readerUrl = 'learn' + suffix + '.html';
const homeUrl = 'home' + suffix + '.html';
const preview = 'assets/certificate/front-preview.svg';
const logo = 'assets/fangpian/logo-yellow-square.webp';
const labels = {
  zh: { title: '你的结业证书', note: '把每一次「学会了」，变成看得见的成长。', drag: '拖动回弹 · 点击翻面', front: '看看正面', back: '看看背面', progress: '查看证书进度', claim: '领取结业证书', view: '查看我的证书', completed: '已完成', unit: '节课程', issued: '这份坚持，已经有了名字。', sample: '完成所选方向的必修课程，即可领取。' },
  en: { title: 'Your completion certificate', note: 'Turn each completed lesson into visible growth.', drag: 'Drag to stretch · Click to flip', front: 'Show front', back: 'Show back', progress: 'View certificate progress', claim: 'Claim my certificate', view: 'View my certificate', completed: 'Completed', unit: 'lessons', issued: 'A record of your learning journey.', sample: 'Complete your selected learning plan to claim yours.' },
  ko: { title: '나의 수료증', note: '배움의 한 걸음마다 성장을 기록하세요.', drag: '드래그하여 흔들기 · 클릭하여 뒤집기', front: '앞면 보기', back: '뒷면 보기', progress: '수료 진행 상황', claim: '수료증 받기', view: '나의 수료증 보기', completed: '완료', unit: '강좌', issued: '꾸준한 배움의 기록입니다.', sample: '모든 강좌를 마치면 받을 수 있어요.' },
  tw: { title: '你的結業證書', note: '把每一次「學會了」，變成看得見的成長。', drag: '拖動回彈 · 點擊翻面', front: '看看正面', back: '看看背面', progress: '查看證書進度', claim: '領取結業證書', view: '查看我的證書', completed: '已完成', unit: '節課程', issued: '這份堅持，已經有了名字。', sample: '完成所選方向的必修課程，即可領取。' }
};
const copy = labels[language === 'hk' ? 'tw' : language] || labels.zh;
let backArtwork;

function useCertificate({ badge = false } = {}) {
  const [planId, setPlanId] = useState(() => model.selectedPlan());
  const read = useCallback(() => model.store.status(lessons, local?.read() || {}, language, planId), [planId]);
  const [state, setState] = useState(read);
  const [art, setArt] = useState({ front: preview, back: logo, recordKey: '', ready: false });
  const recordKey = state.record ? state.record.id + ':' + state.record.name : 'preview:' + planId + ':' + state.total;
  const recordJson = JSON.stringify(state.record);
  useEffect(() => {
    const refresh = () => setState(read());
    const storage = event => {
      if (event.key === model.planKey || event.key === 'ai_build_route_v1' || event.key === null) {
        const next = model.selectedPlan(); setPlanId(next); setState(model.store.status(lessons, local?.read() || {}, language, next));
      } else if (event.key === model.key || event.key === local?.key) refresh();
    };
    window.addEventListener('fangpian:progress', refresh);
    window.addEventListener('fangpian:certificate', refresh);
    window.addEventListener('storage', storage);
    window.addEventListener('pageshow', refresh);
    return () => {
      window.removeEventListener('fangpian:progress', refresh);
      window.removeEventListener('fangpian:certificate', refresh);
      window.removeEventListener('storage', storage);
      window.removeEventListener('pageshow', refresh);
    };
  }, [read]);
  useEffect(() => {
    let active = true;
    backArtwork ||= window.FangpianCertificateArt.back().then(canvas => canvas.toDataURL('image/png'));
    const renderFront = badge ? window.FangpianCertificateArt.badge : window.FangpianCertificateArt.front;
    Promise.all([renderFront(JSON.parse(recordJson), { total: state.total, planLabel: state.plan?.label }), backArtwork]).then(([front, back]) => {
      if (active) setArt({ front: front.toDataURL('image/png'), back, recordKey, ready: true });
    }).catch(() => { if (active) setArt({ front: preview, back: logo, recordKey, ready: false }); });
    return () => { active = false; };
  }, [recordKey, recordJson, state.total, state.plan?.label, badge]);
  const claim = name => {
    const record = model.store.claim(lessons, local?.read() || {}, name, language, planId);
    window.dispatchEvent(new CustomEvent('fangpian:certificate'));
    return record;
  };
  const selectPlan = id => {
    if (!model.plans.some(plan => plan.id === id)) return;
    setPlanId(id); setState(model.store.status(lessons, local?.read() || {}, language, id));
    try { window.localStorage.setItem(model.planKey, id); } catch { /* This-page selection still works. */ }
  };
  return { state, art, claim, planId, selectPlan, canDownload: !!state.record && art.ready && art.recordKey === recordKey };
}

function CertificateWidget() {
  const { state, art } = useCertificate({ badge: true });
  const controls = useRef(null);
  const stage = useRef(null);
  const [seen, setSeen] = useState(false);
  const [ready, setReady] = useState(false);
  const [side, setSide] = useState('front');
  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => setReady(false), []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setSeen(true); observer.disconnect(); }
    });
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  const flip = () => {
    if (controls.current && ready) controls.current.flip();
    else setSide(value => value === 'front' ? 'back' : 'front');
  };
  return <div className="fp-cert-widget" data-mode={state.record ? 'issued' : state.eligible ? 'eligible' : 'preview'}>
    <figure ref={stage} className="fp-cert-stage" data-ready={ready} aria-label="可翻面的结业证书挂绳卡片">
      <div className={'fp-cert-still' + (ready ? ' is-hidden' : '')} aria-hidden="true"><img src={side === 'front' ? art.front : art.back} alt="" width="960" height="682" /></div>
      {seen && createPortal(<Lanyard className="fp-cert-lanyard" viewportOrigin={stage} frontImage={art.front} backImage={art.back}
        strapImage="assets/certificate/strap.svg" orientation="landscape" imageFit="contain"
        cardColor="#fbf8f0" finish="matte" size={0.6} anchor="center" strapLength={0.46}
        strapColor="#ffd85f" strapWidth={0.55} metal="gold" gravity={1} damping={0.72}
        elasticity={0.38} breeze={0} intro={false} controlsRef={controls}
        onReady={onReady} onError={onError} onFaceChange={setSide} />, document.getElementById('fpStory') || document.body)}
    </figure>
    <div className="fp-cert-caption">
      <div className="fp-cert-invitation"><span>{copy.drag}</span><button type="button" className="fp-cert-flip" onClick={flip}>{side === 'front' ? copy.back : copy.front}<span aria-hidden="true"> ↻</span></button></div>
      <h2>{copy.title}</h2>
      <p className="fp-cert-plan-label">{state.plan?.label} · {state.total} 节必修</p>
      <p>{state.record ? copy.issued : copy.note}</p>
      <div className="fp-cert-progress-label"><span>{copy.completed}</span><strong>{state.done}<span> / {state.total}</span></strong></div>
      <progress className="fp-cert-progress" value={state.done} max={state.total || 1} aria-label={copy.completed + ' ' + state.done + '/' + state.total} />
      <a className="fp-cert-open" href={certificateUrl}>{state.record ? copy.view : state.eligible ? copy.claim : copy.progress}<span aria-hidden="true">↗</span></a>
      <small>{state.record ? state.record.name : copy.sample}</small>
    </div>
  </div>;
}

function CertificatePage() {
  const { state, art, claim, canDownload, planId, selectPlan } = useCertificate();
  const [draft, setDraft] = useState({scope:'',value:''});
  const name = draft.scope === state.scope ? draft.value : state.record?.name || '';
  const setName = value => setDraft({scope:state.scope,value});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const issued = !!state.record;
  const submit = event => {
    event.preventDefault(); setError('');
    try { claim(name); setMessage(issued ? '证书姓名已更新，编号和领取日期保持不变。' : '你的结业证书已生成，可以下载留存。'); }
    catch (failure) { setError(failure.message); }
  };
  const required = state.plan?.lessons || [];
  const done = local?.read() || {};
  const resume = required.find(lesson => !done[local.canonical(lesson.file)])?.file || required[0]?.file;
  return <>
    <header className="fp-cert-page-header"><a href={homeUrl} className="fp-cert-brand"><img src={logo} alt="方片新媒体" width="38" height="38" /><strong>AI学院</strong></a><a href={homeUrl}>返回学堂</a></header>
    <main className="fp-cert-page-main">
      <div className="fp-cert-page-heading"><span className="fp-cert-page-kicker">学习完成纪念</span><h1>{issued ? '这份坚持，属于你。' : '每一节的坚持，都算数。'}</h1><p>完成核心课程或一条学习路线的必修课，即可结业。<br />选修内容自由探索，不计入结业要求。</p><label className="fp-cert-plan-select">结业方向<select value={planId} onChange={event => { selectPlan(event.target.value); setMessage(''); setError(''); setDraft({scope:'',value:''}); }}>{model.plans.map(plan => <option key={plan.id} value={plan.id}>{plan.label} · {plan.files.length} 节</option>)}</select></label></div>
      <div className="fp-cert-page-grid">
        <section className="fp-cert-document" aria-label={issued ? '我的结业证书' : '结业证书样张'}><img src={art.front} alt={issued ? state.record.name + '的AI学院结业证书' : '结业证书样张，完成所选必修课程后可填写姓名领取'} width="2400" height="1706" /><p>{issued ? '证书编号 ' + state.record.id : '样张预览 · 完成课程后生成你的专属版本'}</p></section>
        <section className="fp-cert-panel" aria-labelledby="fpCertProgressTitle">
          <h2 id="fpCertProgressTitle">{issued ? '我的结业记录' : state.eligible ? '可以领取证书了' : '距离结业，又近了一步'}</h2>
          <div className="fp-cert-page-count"><strong>{state.done}</strong><span> / {state.total} 节课程</span></div>
          <progress className="fp-cert-progress" value={state.done} max={state.total || 1} aria-label={'已完成 ' + state.done + '/' + state.total + ' 节课程'} />
          <p className="fp-cert-rule">{state.plan?.label}：{issued ? '证书保留领取时的完成记录；切换路线不会清除已有进度。' : state.eligible ? '必修课程已完成，可以填写姓名领取证书。' : `还有 ${state.remaining} 节必修待完成。每节课点一次「学会了」，进度会自动更新。`}</p>
          {!!state.plan?.missing.length && <p role="alert">当前语言缺少部分必修课，请切换简体中文后查看。</p>}
          <details className="fp-cert-requirements"><summary>查看必修课程（{state.total} 节）</summary><ol>{required.map(lesson => <li key={lesson.file}><a href={readerUrl + '#' + lesson.file}>{lesson.title}</a><span>{done[local.canonical(lesson.file)] ? '已完成' : '待学习'}</span></li>)}</ol></details>
          <form onSubmit={submit} className="fp-cert-form"><label htmlFor="fpCertName">证书上的姓名</label><input id="fpCertName" name="certificateName" autoComplete="name" value={name} maxLength={24} placeholder="填写你的姓名" required onChange={event => { setName(event.target.value); setError(''); }} aria-describedby="fpCertNameHelp fpCertError" aria-invalid={!!error} /><small id="fpCertNameHelp">1—24 个字，仅用于这张证书。</small><p id="fpCertError" className="fp-cert-error" role="alert">{error}</p><button className="fp-cert-primary" disabled={!issued && !state.eligible} type="submit">{issued ? '更新证书姓名' : state.eligible ? '领取结业证书' : '完成必修课程后可领取'}</button></form>
          {canDownload ? <a className="fp-cert-download" href={art.front} download={'AI学院-结业证书-' + state.record.id + '.png'}>下载结业证书 PNG</a> : <button className="fp-cert-download" type="button" disabled>{issued ? '正在准备证书图片…' : '下载结业证书 PNG'}</button>}
          <a className="fp-cert-continue" href={readerUrl + (resume ? '#' + encodeURIComponent(resume) : '')}>{issued ? '返回课程，继续探索' : '继续学习'}</a>
          <output className="fp-cert-message">{message}</output>
          <p className="fp-cert-local-note">{state.persistent && local?.persistent ? '学习进度和证书保存在当前浏览器，可随时回来查看。建议下载图片留存。' : '当前浏览器无法完整保存记录；本页仍可生成和下载证书，请及时保存图片。'}{issued ? '手机也可长按证书图片保存。' : ''}</p>
        </section>
      </div>
    </main><footer className="fp-cert-page-footer">方片新媒体 · 正心正念，利他向善</footer>
  </>;
}

const widget = document.getElementById('fpCertificateMount');
const page = document.getElementById('fpCertificatePage');
if (model && local && lessons.length) {
  if (widget) createRoot(widget).render(<CertificateWidget />);
  if (page) createRoot(page).render(<CertificatePage />);
}
