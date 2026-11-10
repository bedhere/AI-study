"""Close live navigation, keep source labels and teaching code untouched."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import json
import re

ROOT=Path(__file__).resolve().parents[1]
PUBLIC=ROOT/'public'
changed=[]
removed_ctas=0
neutralized=0
class Cleaner(HTMLParser):
    def __init__(self,source):
        super().__init__(convert_charrefs=False)
        self.source=source;self.inert=0;self.edits=[]
        self.offsets=[0]+[m.end() for m in re.finditer('\n',source)]
        self.feed(source)
    def handle_starttag(self,tag,attrs):
        global neutralized
        if tag in ('script','style','textarea'):self.inert+=1
        if self.inert:return
        attrs=dict(attrs);key={'a':'href','area':'href','form':'action','button':'formaction','input':'formaction','iframe':'src','base':'href'}.get(tag)
        value=attrs.get(key,'') if key else ''
        if not re.match(r'(?i)^\s*(https?:|//|mailto:|tel:|ftp:|weixin:|intent:)',value):return
        raw=self.get_starttag_text();fixed=raw
        for attr in [key,'target','ping','onclick','onmousedown','onmouseup']:
            fixed=re.sub(r'\s'+attr+r'\s*=\s*(?:"[^"]*"|\x27[^\x27]*\x27|[^\s>]+)','',fixed,flags=re.I)
        fixed=fixed.replace('>',' data-source-reference="true">',1)
        row,col=self.getpos();start=self.offsets[row-1]+col
        self.edits.append((start,start+len(raw),fixed));neutralized+=1
    def handle_endtag(self,tag):
        if tag in ('script','style','textarea'):self.inert=max(0,self.inert-1)
    def output(self):
        result=self.source
        for start,end,value in sorted(self.edits,reverse=True):result=result[:start]+value+result[end:]
        return result

for path in PUBLIC.rglob('*.html'):
    source=path.read_text(encoding='utf-8');value=source
    # Standalone call-to-action buttons for the former author's tools are promotions,
    # unlike the inline source labels. Do not retain them as dead buttons.
    if path.name.startswith('cost-eval'):
        def strip_cta(match):
            global removed_ctas
            if 'display:flex' in match[0]:removed_ctas+=1;return ''
            return match[0]
        value=re.sub(r'<a\b[^>]*href="https://xsct\.ai"[^>]*>[\s\S]*?</a>',strip_cta,value)
    value=Cleaner(value).output()
    if 'external-platform-policy.js' not in value:
        value=value.replace('<head>','<head>\n<script src="/slides/external-platform-policy.js?v=20261110closed"></script>',1)
    else:
        value=re.sub(r'external-platform-policy\.js(?:\?[^"\x27<>\s]*)?', 'external-platform-policy.js?v=20261110closed',value)
    if value!=source:path.write_text(value,encoding='utf-8');changed.append(path.relative_to(ROOT).as_posix())
(ROOT/'reports/outbound-cleanup.json').write_text(json.dumps({'neutralizedLinks':neutralized,'removedPromotionalButtons':removed_ctas,'changedPages':len(changed),'files':changed},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'neutralizedLinks':neutralized,'removedPromotionalButtons':removed_ctas,'changedPages':len(changed)}))
