"""Refresh the five homepages while preserving course and learning-progress markup."""
from pathlib import Path
from html import escape
import re
from cleanup_legacy import Document

ROOT = Path(__file__).resolve().parents[1] / 'public/slides'
BASE = {
    'nav': '人格测试', 'eyebrow': '方片 AI 人格测试 · MBTI 式趣味体验', 'title': '你和 AI 之间，<br>藏着哪只小老虎？',
    'intro': '面对新工具，你会先试试还是先观察？AI 说得很肯定，你会直接用还是再查一遍？16 个选择，遇见和 AI 一起成长的自己。',
    'facts': ['16道题', '3—5分钟', '16种AI人格'], 'start': '领取我的 AI 人格',
    'note': 'AITI = AI Tiger Type Indicator，方片的 AI 小老虎人格测试。',
    'ai': '认识16只虎', 'preview': '方片 AI 人格图鉴',
    'pick': '16种人格，没有高低', 'prev': '上一只AI虎', 'next': '下一只AI虎', 'scroll': '向下，发现你的方片 AI 人格',
    'hub': '16题 · 四维画像 · 16种方片AI人格',
    'dimensions': ['AI认可度', 'AI使用度', 'AI了解度', '正向价值度'],
}
COPY = {'zh': BASE,
'en': dict(BASE, nav='Personality tests', eyebrow='Fangpian AI personality · An MBTI-style experience', title='There is a tiger<br>in your AI story.', intro='Try a new AI tool, or observe first? Trust a confident answer, or check it again? Make 16 choices and meet your AI tiger.', facts=['16 questions','3–5 minutes','16 AI personalities'], start='Meet my AI tiger', note='AITI means AI Tiger Type Indicator: Fangpian’s original AI personality experience.', ai='Meet all 16 tigers', preview='Fangpian AI tiger collection', pick='Different styles, equal worth', prev='Previous AI tiger', next='Next AI tiger', scroll='Discover your AI personality', hub='16 questions · Four dimensions · 16 AI personalities', dimensions=['AI acceptance','AI usage','AI knowledge','Positive values']),
'ko': dict(BASE, nav='성격 테스트', eyebrow='팡피엔 AI 성격 테스트 · MBTI 방식의 재미있는 체험', title='나와 AI 사이에는<br>어떤 호랑이가 있을까요?', intro='새로운 도구를 먼저 써 보나요? 확신에 찬 AI 답변을 다시 확인하나요? 16번의 선택으로 나의 AI 호랑이를 만나세요.', facts=['16문항','3–5분','16가지 AI 성격'], start='나의 AI 호랑이 만나기', note='AITI는 AI Tiger Type Indicator의 약자로 팡피엔의 AI 성격 체험입니다.', ai='16마리 호랑이 만나기', preview='팡피엔 AI 성격 도감', pick='모든 성격에는 장점이 있어요', prev='이전 AI 호랑이', next='다음 AI 호랑이', scroll='나의 AI 성격 찾기', hub='16문항 · 네 가지 차원 · 16가지 AI 성격', dimensions=['AI 수용도','AI 사용도','AI 이해도','긍정적 가치']),
 'tw': dict(BASE, nav='人格測試', eyebrow='方片 AI 人格測試 · MBTI 式趣味體驗', title='你和 AI 之間，<br>藏著哪隻小老虎？', intro='面對新工具，你會先試試還是先觀察？AI 說得很肯定，你會直接用還是再查一遍？16 個選擇，遇見和 AI 一起成長的自己。', facts=['16道題','3—5分鐘','16種AI人格'], start='領取我的 AI 人格', note='AITI = AI Tiger Type Indicator，方片的 AI 小老虎人格測試。', ai='認識16隻虎', preview='方片 AI 人格圖鑑', pick='16種人格，沒有高低', prev='上一隻AI虎', next='下一隻AI虎', scroll='向下，發現你的方片 AI 人格', hub='16題 · 四維畫像 · 16種方片AI人格', dimensions=['AI認可度','AI使用度','AI了解度','正向價值度']),
}
COPY['hk'] = COPY['tw']
ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>'
for lang, copy in COPY.items():
    file = ROOT / ('home' + ('' if lang == 'zh' else '.' + lang) + '.html')
    source = file.read_text(encoding='utf-8')
    doc = Document(source)
    old = next(n for n in doc.nodes if n['attrs'].get('id') == 'fpStory')
    intro_node = next(n for n in doc.nodes if 'fp-intro-copy' in (n['attrs'].get('class') or '').split())
    intro = source[intro_node['start']:intro_node['end']]
    intro_doc = Document(intro)
    cta = next(n for n in intro_doc.nodes if 'hero-cta' in (n['attrs'].get('class') or '').split())
    links = [n for n in intro_doc.nodes if n['tag'] == 'a' and n['parent'] is cta]
    browse = next(n for n in links if 'btn-outline' in (n['attrs'].get('class') or '').split())
    continue_link = next(n for n in links if n['attrs'].get('id') == 'heroStart')
    browse_html = intro[browse['start']:browse['end']].replace('class="btn-outline"', 'class="btn-outline fp-browse" id="fpBrowseCourses"')
    if 'fpBrowseCourses' not in browse_html: browse_html = browse_html.replace('<a ', '<a id="fpBrowseCourses" ', 1)
    browse_html = re.sub(r'<svg[\s\S]*?</svg>', '', browse_html)
    browse_html = browse_html.replace('</a>', ARROW + '</a>')
    continue_html = intro[continue_link['start']:continue_link['end']]
    intro = intro[:cta['open_end']] + browse_html + continue_html + intro[cta['end']-6:]
    q = lambda key: escape(copy[key], quote=True)
    facts = ''.join('<li>'+escape(item)+'</li>' for item in copy['facts'])
    dimensions = ''.join('<li><b>'+key+'</b><span>'+escape(label)+'</span></li>' for key,label in zip('AUKV',copy['dimensions']))
    story = f'''<section class="fp-story" id="fpStory" aria-label="{q('nav')}" data-renderer="loading">
<div class="hero fp-stage" aria-hidden="true"><i class="fp-guide g1"></i><i class="fp-guide g3"></i><div class="fp-scene"><img class="fp-robot-fallback" src="assets/robot/robot-poster.svg" width="700" height="900" alt=""><canvas id="fpRobotCanvas" aria-hidden="true"></canvas></div></div>
<header class="fp-panel fp-panel-intro">{intro}<a class="fp-scroll-link" href="#aiPersonality">{q('scroll')}{ARROW}</a></header>
<aside id="fpCertificateMount" class="fp-certificate-slot" aria-label="结业证书"><noscript><a href="certificate{'' if lang == 'zh' else '.' + lang}.html">查看结业证书</a></noscript></aside>
<section class="fp-panel fp-panel-personality" id="aiPersonality" aria-labelledby="fpPersonalityTitle">
<div class="fp-personality-copy"><span class="fp-test-eyebrow">{q('eyebrow')}</span><h2 id="fpPersonalityTitle">{copy['title']}</h2><p>{q('intro')}</p><ul class="fp-test-facts">{facts}</ul><ul class="fp-aiti-dimensions" aria-label="AITI">{dimensions}</ul><div class="fp-aiti-actions"><a class="fp-test-start" id="fpStartAiti" href="aiti.html#quiz">{q('start')}{ARROW}</a><a class="fp-gallery-link" href="aiti.html#gallery">{q('ai')}{ARROW}</a></div><p class="fp-test-note">{q('note')}</p></div>
<div class="fp-personality-art"><img class="fp-persona-peek peek-left" src="assets/aiti/09_反幻觉侦探.png" width="112" height="126" alt="" loading="lazy"><img class="fp-persona-peek peek-right" src="assets/aiti/01_赛博诸葛.png" width="112" height="126" alt="" loading="lazy"><article class="fp-persona-card"><div class="fp-card-caption"><span>{q('preview')}</span><b id="fpDeclarationNumber">02 / 16</b></div><img id="fpDeclarationImage" src="assets/aiti/02_Prompt法师.png" width="768" height="768" alt="Prompt法师专属方片AI小老虎" loading="lazy"><h3 id="fpDeclarationName">Prompt法师</h3><p class="fp-persona-title" id="fpDeclarationTitle">「一句咒语就能让AI开始加班的那只虎」</p><div class="fp-persona-tags" id="fpDeclarationTags"><span>Prompt</span><span>表达</span><span>调试</span><span>迭代</span></div><blockquote id="fpDeclarationQuote">“不是AI不行，可能只是咒语还没念对。”</blockquote><div class="fp-preview-controls"><button id="fpQuotePrevious" type="button" aria-label="{q('prev')}">←</button><span>{q('pick')}</span><button id="fpQuoteNext" type="button" aria-label="{q('next')}">→</button></div></article></div>
</section></section>'''
    source = source[:old['start']] + story + source[old['end']:]
    source = re.sub(r'<div class="fp-announcement">[\s\S]*?</div>', '', source)
    source = re.sub(r'(<div class="fp-top-links">[\s\S]*?)<a href="(?:aiti.html|#aiPersonality)">[^<]+</a>', lambda m:m[1]+'<a href="#aiPersonality">'+q('nav')+'</a>', source, count=1)
    source = re.sub(r'<script src="(?:aiti-data|personality-data)\.js\?v=[^"]+" defer></script>', '<script src="aiti-data.js?v=20261110collection1" defer></script>', source)
    source = source.replace('20261109motion1','20261110collection1').replace('20261109motion2','20261110collection1')
    source = re.sub(r'(home-motion\.(?:css|js)\?v=)[^"\s]+', r'\g<1>20261110space3', source)
    source = re.sub(r'(<a class="tiger-entry" id="tigerTestEntry"[\s\S]*?<span class="tiger-entry-title">)[^<]+', lambda m:m[1]+('方片 AI 人格测试' if lang=='zh' else '方片 AI 人格測試' if lang in ('tw','hk') else 'Fangpian AI personality' if lang=='en' else '팡피엔 AI 성격 테스트'), source, count=1)
    source = re.sub(r'(<a class="tiger-entry" id="tigerTestEntry"[\s\S]*?<span class="tiger-entry-description">)[^<]+', lambda m:m[1]+q('hub'), source, count=1)
    file.write_text(source,encoding='utf-8')
    print(file.name)
