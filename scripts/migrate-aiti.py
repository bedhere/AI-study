"""Replace the former MBTI entry with AITI; keep DISC and old bookmarks usable."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
slides = root / 'public/slides'
disc = slides / 'disc.html'
if not disc.exists():
    html = (slides / 'personality.html').read_text(encoding='utf-8')
    html = html.replace('<body>', '<body data-test="disc">').replace('personality.js?v=20261109', 'personality.js?v=aiti-disc-20261109')
    html = html.replace('<title>方片虎格测试 · 方片新媒体</title>', '<title>DISC 协作风格 · 方片新媒体</title>')
    disc.write_text(html, encoding='utf-8', newline='\n')

(slides / 'personality.html').write_text('''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>方片 AITI · 入口已升级</title><script>(function(){var h=location.hash;var disc=/^#disc(?:-result)?$/.test(h);location.replace(disc?'disc.html'+h:'aiti.html'+(/^#mbti/.test(h)?'#quiz':''));})();</script></head><body><main><h1>方片 AITI</h1><p>测试入口已升级。</p><p><a href="aiti.html">进入方片 AITI</a> · <a href="disc.html">DISC 协作风格测试</a></p></main></body></html>\n''', encoding='utf-8', newline='\n')

for suffix in ['', '.en', '.ko', '.tw', '.hk']:
    path = slides / f'home{suffix}.html'
    html = path.read_text(encoding='utf-8')
    def entry(match):
        card=match.group(0).replace('href="personality.html"','href="aiti.html"')
        title='你是哪只方片 AI 小老虎？' if not suffix else 'Find your AITI tiger' if suffix=='.en' else '나의 AITI 호랑이는?' if suffix=='.ko' else '你是哪隻方片 AI 小老虎？'
        desc='16题 · 四维画像 · 16种AI人格' if not suffix else '16 questions · AI tiger types · 中文' if suffix=='.en' else '16문항 · AI 성향 테스트 · 中文' if suffix=='.ko' else '16題 · 四維畫像 · 16種AI人格'
        card=re.sub(r'(<span class="tiger-entry-title">)[\s\S]*?(</span>)',lambda m:m.group(1)+title+m.group(2),card)
        card=re.sub(r'(<span class="tiger-entry-description">)[\s\S]*?(</span>)',lambda m:m.group(1)+desc+m.group(2),card)
        card=card.replace('assets/fangpian/tiger-thinking-seated.webp','assets/aiti/02_Prompt法师.png').replace('alt="方片思考虎"','alt="方片 AITI Prompt法师"')
        return card
    html=re.sub(r'<a class="tiger-entry"[\s\S]*?</a>',entry,html)
    path.write_text(html,encoding='utf-8',newline='\n')
print('AITI entry updated; DISC preserved; legacy links redirected.')
