"""Audit actual HTML navigation separately from URLs shown in course code."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
from collections import Counter
import json
import re
import sys

ROOT=Path(__file__).resolve().parents[1]
PUBLIC=ROOT/'public'
records=[]
class Audit(HTMLParser):
    def __init__(self,path):
        super().__init__(convert_charrefs=True)
        self.path=path
        self.inert=0
    def handle_starttag(self,tag,attrs):
        if tag in ('script','style','textarea'):self.inert+=1
        if self.inert:return
        attrs=dict(attrs)
        key={'a':'href','area':'href','form':'action','button':'formaction','input':'formaction','iframe':'src','base':'href'}.get(tag)
        value=attrs.get(key,'') if key else ''
        if tag=='meta' and attrs.get('http-equiv','').lower()=='refresh':
            match=re.search(r'url\s*=\s*[\'"]?([^\'";]+)',attrs.get('content',''),re.I)
            if match:value=match[1];key='content'
        value=value.strip()
        if re.match(r'(?i)^(?:https?:|//|mailto:|tel:|ftp:|weixin:|intent:)',value):
            records.append({'file':self.path.relative_to(ROOT).as_posix(),'line':self.getpos()[0],'tag':tag,'attribute':key,'url':value,'domain':urlsplit(value if not value.startswith('//') else 'https:'+value).netloc,'label':attrs.get('title') or attrs.get('aria-label') or ''})
    def handle_endtag(self,tag):
        if tag in ('script','style','textarea'):self.inert=max(0,self.inert-1)
pages=list(PUBLIC.rglob('*.html'))
for path in pages:Audit(path).feed(path.read_text(encoding='utf-8'))
scripts=[]
for path in list(PUBLIC.rglob('*.js'))+pages:
    text=path.read_text(encoding='utf-8')
    if path.suffix=='.html':text='\n'.join(m[1] for m in re.findall(r'(<script\b[^>]*>)([\s\S]*?)</script>',text,re.I))
    for match in re.finditer(r'(?:(?:window\.)?open\s*\(|location\.(?:href\s*=|assign\s*\(|replace\s*\())[^\n;]{0,300}',text):
        if re.search(r'https?://|https?:\\/',match[0]):scripts.append({'file':path.relative_to(ROOT).as_posix(),'expression':match[0][:300]})
report={'htmlPages':len(pages),'externalNavigationCount':len(records),'domains':dict(Counter(r['domain'] for r in records).most_common()),'navigation':records,'scriptNavigationCandidates':scripts}
(ROOT/'reports/outbound-links.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k not in ('navigation','scriptNavigationCandidates')},ensure_ascii=False))
print(json.dumps({'scriptNavigationCandidates':scripts[:25]},ensure_ascii=False))
if '--check' in sys.argv and (records or scripts):raise SystemExit(1)
