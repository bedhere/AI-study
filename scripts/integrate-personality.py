"""Insert the branded personality-test entry in the former JD slot, once per home."""
from pathlib import Path
root = Path(__file__).resolve().parents[1]
labels = {
    '': ('你是哪种方片虎？', 'MBTI 性格探索 · DISC 协作风格'),
    '.en': ('Find your Fangpian tiger', 'MBTI-style & DISC tests · 中文'),
    '.ko': ('나의 팡피엔 호랑이는?', 'MBTI 스타일 · DISC 테스트 · 中文'),
    '.tw': ('你是哪種方片虎？', 'MBTI 性格探索 · DISC 協作風格'),
    '.hk': ('你是哪種方片虎？', 'MBTI 性格探索 · DISC 協作風格'),
}
for suffix, (title, desc) in labels.items():
    path = root / 'public' / 'slides' / f'home{suffix}.html'
    html = path.read_text(encoding='utf-8')
    if 'personality-entry.css' not in html:
        html = html.replace('</head>', '<link rel="stylesheet" href="personality-entry.css?v=20261109">\n</head>')
    if 'id="tigerTestEntry"' not in html:
        card = f'''<a class="tiger-entry" id="tigerTestEntry" href="personality.html" target="_top"><img src="assets/fangpian/tiger-thinking-seated.webp" width="66" height="72" loading="lazy" decoding="async" alt="方片思考虎"><span class="tiger-entry-text"><span class="tiger-entry-title">{title}</span><span class="tiger-entry-description">{desc}</span></span><span class="tiger-entry-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a>'''
        html = html.replace('<div class="hero-tools">', '<div class="hero-tools">\n' + card, 1)
    path.write_text(html, encoding='utf-8', newline='\n')
print('Inserted personality-test entry into all five home pages.')
