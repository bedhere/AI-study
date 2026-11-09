from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse,unquote
from collections import Counter
import json,re

ROOT=Path(__file__).resolve().parents[1]
PUBLIC=ROOT/'public'
missing=[]
def check(value,owner,kind):
    parsed=urlparse(value)
    if parsed.scheme or value.startswith('//') or not parsed.path:return
    if not re.search(r'\.(js|css|png|jpe?g|webp|svg|ico|woff2?)$',parsed.path,re.I):return
    resolved=PUBLIC/unquote(parsed.path.lstrip('/')) if parsed.path.startswith('/') else owner.parent/unquote(parsed.path)
    if not resolved.exists():missing.append({'file':owner.relative_to(PUBLIC).as_posix(),'resource':value,'kind':kind})
class Resources(HTMLParser):
    def __init__(self,owner):super().__init__();self.owner=owner
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if tag in ('script','img','source','video','audio','iframe','link'):
            for name in ('src','href','poster'):
                if name in attrs:check(attrs[name],self.owner,tag)
for p in (PUBLIC/'slides').glob('*.html'):Resources(p).feed(p.read_text(encoding='utf-8'))
for p in (PUBLIC/'slides').glob('*.css'):
    for match in re.finditer(r'url\(["\']?([^\s)"\']+)',p.read_text(encoding='utf-8')):check(match.group(1),p,'css')
summary={'missing_references':len(missing),'by_path':dict(Counter(row['resource'] for row in missing)),'examples':missing[:40]}
(ROOT/'reports/local-resources.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False,indent=2))
raise SystemExit(1 if missing else 0)
