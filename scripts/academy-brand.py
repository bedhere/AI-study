"""Repeatable branding migration. Keep URLs, storage keys and source attribution intact."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
replacements = {
    '方片 AI 学堂': 'AI学院', '方片AI学堂': 'AI学院', '方片学堂': 'AI学院',
    '方片學堂': 'AI学院', '方片 AI 學堂': 'AI学院',
    '方片主讲的 AI 产品经理培训课程': '面向方片全体员工的 AI 学习课程',
    '方片主讲的 AI 课程': '面向方片全体员工的 AI 课程',
    'AI 产品经理培训': '全员 AI 学习',
    'AI 产品经理训练营': '全员 AI 学习课程',
}
count = 0
targets = list((ROOT / 'public').rglob('*')) + list((ROOT / 'components').rglob('*')) + [ROOT / 'app/layout.tsx', ROOT / 'scripts/sync-course-content.mjs', ROOT / 'scripts/review-company-content.py']
for p in targets:
    if not p.is_file() or p.suffix not in ('.html', '.js', '.mjs', '.jsx', '.tsx', '.svg', '.webmanifest'): continue
    if p.name in ('three-shared.js', 'certificate-experience.js', 'robot-scene.js'): continue
    source = p.read_text(encoding='utf-8')
    value = source
    for old, new in replacements.items(): value = value.replace(old, new)
    if p.suffix == '.html':
        value = re.sub(r'<meta\s+name="author"\s+content="方片"\s*/?>', '', value)
        value = re.sub(r'(<meta[^>]+(?:name|property)="(?:description|og:description)"[^>]+content=")([^"]*)437([^"]*)(")', r'\1\2按主题学习\3\4', value)
        if '</head>' in value and 'academy-brand.css' not in value:
            value = value.replace('</head>', '<link rel="stylesheet" href="academy-brand.css?v=20261110p0">\n</head>', 1)
    if value != source:
        p.write_text(value, encoding='utf-8'); count += 1
print('Branded files:', count)
