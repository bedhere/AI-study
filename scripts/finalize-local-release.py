from pathlib import Path
from urllib.parse import urlparse
import re
from cleanup_legacy import Document

ROOT=Path(__file__).resolve().parents[1]
SLIDES=ROOT/'public'/'slides'
for p in SLIDES.glob('projects*.html'):
    lang='en' if '.en.' in p.name else 'ko' if '.ko.' in p.name else 'zh-CN'
    title='Community features are not connected yet' if lang=='en' else '커뮤니티 기능은 준비 중입니다' if lang=='ko' else '社区功能待接入'
    desc='Project submissions, ratings and reviews need the company service. You can continue learning from the course directory.' if lang=='en' else '프로젝트 제출, 평가 및 리뷰는 회사 서비스 연결 후 제공됩니다. 강좌 학습은 계속할 수 있습니다.' if lang=='ko' else '项目登记、评分与评论需要公司服务支持，当前版本暂不开放。课程学习不受影响。'
    reader='learn.en.html' if lang=='en' else 'learn.ko.html' if lang=='ko' else 'learn.html'
    label='Back to courses' if lang=='en' else '강좌로 돌아가기' if lang=='ko' else '返回课程'
    p.write_text(f'''<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>{title} · 方片学堂</title><script src="/slides/external-platform-policy.js"></script><style>body{{margin:0;font:16px/1.8 system-ui;background:#fff;color:#211b16}}main{{max-width:640px;margin:12vh auto;padding:24px}}a{{display:inline-block;padding:10px 20px;background:#fff200;color:#211b16;border-radius:10px;text-decoration:none}}a:focus-visible{{outline:3px solid;outline-offset:4px}}</style></head><body><main><h1>{title}</h1><p>{desc}</p><a href="{reader}">{label}</a></main></body></html>\n''',encoding='utf-8',newline='\n')
for p in SLIDES.glob('*.html'):
    original=p.read_text(encoding='utf-8');text=original
    # The completion banner remains functional; its action now returns to local progress.
    if re.fullmatch(r'learn(?:\.(en|ko|tw|hk))?\.html',p.name):
        english='.en.' in p.name;korean='.ko.' in p.name
        label='View learning progress' if english else '학습 진도 보기' if korean else '查看学习进度'
        note='Your progress stays in this browser.' if english else '학습 진도는 이 브라우저에 저장됩니다.' if korean else '学习进度保存在此浏览器。'
        home='home.en.html' if english else 'home.ko.html' if korean else 'home.tw.html' if '.tw.' in p.name else 'home.hk.html' if '.hk.' in p.name else 'home.html'
        text=re.sub(r'<a class="fb-cta"[^>]*>[\s\S]*?</a>',f'<a class="fb-cta" href="{home}">{label}</a>',text)
        text=re.sub(r'(<div class="fb-text">[\s\S]*?<span>)[\s\S]*?(</span>)',lambda m:m.group(1)+note+m.group(2),text)
    doc=Document(text);removals=[]
    for node in doc.nodes:
        if node['end'] is None:continue
        a=node['attrs']
        if node['tag']=='a' and re.match(r'(?:/slides/)?projects(?:[-.]|\.html)',urlparse(a.get('href','')).path):removals.append((node['start'],node['end']))
    for start,end in reversed(removals):text=text[:start]+text[end:]
    if 'exam-engine.js' in text:
        # Original remote question-report actions are outside this local release.
        text=text.replace('</head>','<style>.q-report{display:none!important}</style>\n</head>') if '.q-report{display:none!important}' not in text else text
    if text!=original:p.write_text(text,encoding='utf-8',newline='\n')
(SLIDES/'projects.js').write_text('// Community backend is not part of the local learning release.\n',encoding='utf-8')
print('Updated unsupported community routes and completion actions.')
