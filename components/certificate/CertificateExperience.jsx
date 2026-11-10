/* oxlint-disable next/no-img-element -- Static HTML islands use local SVGs and generated PNG data URLs outside the Next image pipeline. */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
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
  zh: { title: '你的结业证书', note: '把每一次「学会了」，变成看得见的成长。', drag: '拖动摆动 · 点击翻面', front: '看看正面', back: '看看背面', progress: '查看证书进度', claim: '领取结业证书', view: '查看我的证书', completed: '已完成', unit: '节课程', issued: '这份坚持，已经有了名字。', sample: '学完全部课程，即可领取。' },
  en: { title: 'Your completion certificate', note: 'Turn each completed lesson into visible growth.', drag: 'Drag to swing · Click to flip', front: 'Show front', back: 'Show back', progress: 'View certificate progress', claim: 'Claim my certificate', view: 'View my certificate', completed: 'Completed', unit: 'lessons', issued: 'A record of your learning journey.', sample: 'Complete every lesson to claim yours.' },
  ko: { title: '나의 수료증', note: '배움의 한 걸음마다 성장을 기록하세요.', drag: '드래그하여 흔들기 · 클릭하여 뒤집기', front: '앞면 보기', back: '뒷면 보기', progress: '수료 진행 상황', claim: '수료증 받기', view: '나의 수료증 보기', completed: '완료', unit: '강좌', issued: '꾸준한 배움의 기록입니다.', sample: '모든 강좌를 마치면 받을 수 있어요.' },
  tw: { title: '你的結業證書', note: '把每一次「學會了」，變成看得見的成長。', drag: '拖動擺動 · 點擊翻面', front: '看看正面', back: '看看背面', progress: '查看證書進度', claim: '領取結業證書', view: '查看我的證書', completed: '已完成', unit: '節課程', issued: '這份堅持，已經有了名字。', sample: '學完全部課程，即可領取。' }
};
const copy = labels[language === 'hk' ? 'tw' : language] || labels.zh;
let backArtwork;

function useCertificate() {
  const read = () => model.store.status(lessons, local?.read() || {}, language);
  const [state, setState] = useState(read);
  const [art, setArt] = useState({ front: preview, back: logo, recordKey: '', ready: false });
  const recordKey = state.record ? state.record.id + ':' + state.record.name : 'preview:' + state.total;
  const recordJson = JSON.stringify(state.record);
  useEffect(() => {
    const refresh = () => setState(read());
    const storage = event => { if (event.key === model.key || event.key === null) refresh(); };
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
  }, []);
  useEffect(() => {
    let active = true;
    backArtwork ||= window.FangpianCertificateArt.back().then(canvas => canvas.toDataURL('image/png'));
    Promise.all([window.FangpianCertificateArt.front(JSON.parse(recordJson), { total: state.total }), backArtwork]).then(([front, back]) => {
      if (active) setArt({ front: front.toDataURL('image/png'), back, recordKey, ready: true });
    }).catch(() => { if (active) setArt({ front: preview, back: logo, recordKey, ready: false }); });
    return () => { active = false; };
  }, [recordKey, recordJson, state.total]);
  const claim = name => {
    const record = model.store.claim(lessons, local?.read() || {}, name, language);
    window.dispatchEvent(new CustomEvent('fangpian:certificate'));
    return record;
  };
  return { state, art, claim, canDownload: !!state.record && art.ready && art.recordKey === recordKey };
}

function CertificateWidget() {
  const { state, art } = useCertificate();
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
      {seen && <Lanyard className="fp-cert-lanyard" frontImage={art.front} backImage={art.back}
        strapImage="assets/certificate/strap.svg" orientation="landscape" imageFit="contain"
        cardColor="#fbf8f0" finish="matte" size={0.6} anchor="center" strapLength={0.46}
        strapColor="#ffd85f" strapWidth={0.55} metal="gold" gravity={1} damping={0.72}
        elasticity={0.38} breeze={0} intro={false} controlsRef={controls}
        onReady={onReady} onError={onError} onFaceChange={setSide} />}
    </figure>
    <div className="fp-cert-caption">
      <div className="fp-cert-invitation"><span>{copy.drag}</span><button type="button" className="fp-cert-flip" onClick={flip}>{side === 'front' ? copy.back : copy.front}<span aria-hidden="true"> ↻</span></button></div>
      <h2>{copy.title}</h2>
      <p>{state.record ? copy.issued : copy.note}</p>
      <div className="fp-cert-progress-label"><span>{copy.completed}</span><strong>{state.done}<span> / {state.total}</span></strong></div>
      <progress className="fp-cert-progress" value={state.done} max={state.total || 1} aria-label={copy.completed + ' ' + state.done + '/' + state.total} />
      <a className="fp-cert-open" href={certificateUrl}>{state.record ? copy.view : state.eligible ? copy.claim : copy.progress}<span aria-hidden="true">↗</span></a>
      <small>{state.record ? state.record.name : copy.sample}</small>
    </div>
  </div>;
}

function CertificatePage() {
  const { state, art, claim, canDownload } = useCertificate();
  const [name, setName] = useState(state.record?.name || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const issued = !!state.record;
  const submit = event => {
    event.preventDefault(); setError('');
    try { claim(name); setMessage(issued ? '证书姓名已更新，编号和领取日期保持不变。' : '你的结业证书已生成，可以下载留存。'); }
    catch (failure) { setError(failure.message); }
  };
  const resume = local?.lastFor(lessons);
  return <>
    <header className="fp-cert-page-header"><a href={homeUrl} className="fp-cert-brand"><img src={logo} alt="方片新媒体" width="38" height="38" /><strong>方片学堂</strong></a><a href={homeUrl}>返回学堂</a></header>
    <main className="fp-cert-page-main">
      <div className="fp-cert-page-heading"><span className="fp-cert-page-kicker">学习完成纪念</span><h1>{issued ? '这份坚持，属于你。' : '每一节的坚持，都算数。'}</h1><p>学完全部课程，领取你的方片结业证书。<br />把所学用进工作，也把成长留给自己。</p></div>
      <div className="fp-cert-page-grid">
        <section className="fp-cert-document" aria-label={issued ? '我的结业证书' : '结业证书样张'}><img src={art.front} alt={issued ? state.record.name + '的方片学堂结业证书' : '结业证书样张，完成全部课程后可填写姓名领取'} width="2400" height="1706" /><p>{issued ? '证书编号 ' + state.record.id : '样张预览 · 完成课程后生成你的专属版本'}</p></section>
        <section className="fp-cert-panel" aria-labelledby="fpCertProgressTitle">
          <h2 id="fpCertProgressTitle">{issued ? '我的结业记录' : state.eligible ? '可以领取证书了' : '距离结业，又近了一步'}</h2>
          <div className="fp-cert-page-count"><strong>{state.done}</strong><span> / {state.total} 节课程</span></div>
          <progress className="fp-cert-progress" value={state.done} max={state.total || 1} aria-label={'已完成 ' + state.done + '/' + state.total + ' 节课程'} />
          <p className="fp-cert-rule">{issued ? '证书记录你领取时完成的课程。你可以修改姓名，或再次下载保存。' : state.eligible ? '全部课程已完成。填写希望展示的姓名，领取属于你的学习纪念。' : `还有 ${state.remaining} 节课程等待探索。在每节课点一次「学会了」，学习进度会自动更新。`}</p>
          <form onSubmit={submit} className="fp-cert-form"><label htmlFor="fpCertName">证书上的姓名</label><input id="fpCertName" name="certificateName" autoComplete="name" value={name} maxLength={24} placeholder="填写你的姓名" required onChange={event => { setName(event.target.value); setError(''); }} aria-describedby="fpCertNameHelp fpCertError" aria-invalid={!!error} /><small id="fpCertNameHelp">1—24 个字，仅用于这张证书。</small><p id="fpCertError" className="fp-cert-error" role="alert">{error}</p><button className="fp-cert-primary" disabled={!issued && !state.eligible} type="submit">{issued ? '更新证书姓名' : state.eligible ? '领取结业证书' : '完成全部课程后可领取'}</button></form>
          {canDownload ? <a className="fp-cert-download" href={art.front} download={'方片学堂-结业证书-' + state.record.id + '.png'}>下载结业证书 PNG</a> : <button className="fp-cert-download" type="button" disabled>{issued ? '正在准备证书图片…' : '下载结业证书 PNG'}</button>}
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
