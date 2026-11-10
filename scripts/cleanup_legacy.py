"""Remove legacy marketing from the published HTML tree without reserializing lessons.

Python 3 standard library only. public/slides is authoritative; ../slides is a
read-only historical snapshot and is deliberately never rewritten by this tool.
"""
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
from urllib.parse import urlparse
import argparse
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
SLIDES = ROOT / 'public' / 'slides'
REPORT = ROOT / 'reports' / 'legacy-cleanup.json'
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
RETIRED_SCRIPTS = {'reviews.js', 'splash.js', 'interstitial-ad.js', 'donor-board.js', 'track.js', 'partners.js', 'ask-alice.js', 'challenge.js'}
PROMO_IDS = {'reviews', 'partnerHomeSection', 'contribSection', 'gongyiSection', 'pvBar'}
PROMO_CLASSES = {'alice-promo', 'alice-section', 'final-alice', 'watcha-badge', 'partner-home-section', 'gongyi-section'}

class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.source = source
        self.offsets = [0]
        self.offsets.extend(m.end() for m in re.finditer('\n', source))
        self.nodes = []
        self.stack = []
        self.feed(source)
    def pos(self):
        line, col = self.getpos()
        return self.offsets[line-1]+col
    def handle_starttag(self, tag, attrs):
        start = self.pos()
        node = {'tag':tag, 'attrs':dict(attrs), 'start':start,
                'open_end':start+len(self.get_starttag_text()), 'end':None,
                'parent':self.stack[-1] if self.stack else None}
        self.nodes.append(node)
        if tag in VOID: node['end'] = node['open_end']
        else: self.stack.append(node)
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.stack[-1]['end'] = self.stack[-1]['open_end']
            self.stack.pop()
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, -1, -1):
            if self.stack[i]['tag'] == tag:
                end = self.source.find('>', self.pos())+1
                self.stack[i]['end'] = end
                del self.stack[i:]
                break

def blocked_url(raw):
    parsed = urlparse(raw.replace('&amp;', '&'))
    host = (parsed.hostname or '').lower()
    pathname = parsed.path.rstrip('/')
    if pathname == '/jd' and not host: return True
    if host in {'miyang.cn','www.miyang.cn','alice.miyang.cn','alice.fans','fangpian.cn','www.fangpian.cn','watcha.cn'}: return True
    if host.endswith('.watcha.cn'): return True
    if host in {'x.com','twitter.com'} and pathname.lower().startswith('/fangpian_ai'): return True
    if parsed.scheme == 'mailto' and '@miyang.cn' in parsed.path: return True
    return False

def strip_ranges(source, ranges):
    merged = []
    for start, end in sorted(set(ranges)):
        if merged and start <= merged[-1][1]: merged[-1] = (merged[-1][0], max(end,merged[-1][1]))
        else: merged.append((start,end))
    for start,end in reversed(merged): source = source[:start]+source[end:]
    return source

def ancestor(node, tag):
    current = node
    while current:
        if current['tag']==tag: return current
        current=current['parent']
    return node

def clean_html(source, name, counts):
    if re.fullmatch(r'certificate(?:\.(?:en|ko|tw|hk))?\.html',name) and 'data-fangpian-certificate' not in source:
        lang='en' if '.en.' in name else 'ko' if '.ko.' in name else 'zh-Hant' if ('.tw.' in name or '.hk.' in name) else 'zh-CN'
        title='Certificate service is not connected yet' if lang=='en' else '수료증 서비스는 준비 중입니다' if lang=='ko' else '學習證書服務待接入' if lang=='zh-Hant' else '学习证书服务待接入'
        body='Company accounts and certificate issuing will be connected in a later release. Continue learning from the course directory.' if lang=='en' else '회사 계정과 수료증 발급은 추후 연결됩니다. 강좌 목록에서 학습을 계속할 수 있습니다.' if lang=='ko' else '公司帳號與證書發放服務將在後續版本接入。你可以返回課程目錄繼續學習。' if lang=='zh-Hant' else '公司账号与证书发放服务将在后续版本接入。你可以返回课程目录继续学习。'
        label='Back to courses' if lang=='en' else '강좌로 돌아가기' if lang=='ko' else '返回課程' if lang=='zh-Hant' else '返回课程'
        reader='learn.en.html' if lang=='en' else 'learn.ko.html' if lang=='ko' else 'learn.html'
        return f'''<!doctype html>
<html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{title} · 方片学堂</title><meta name="robots" content="noindex"><link rel="icon" href="assets/fangpian/logo-yellow-square.webp"><script src="/slides/external-platform-policy.js"></script>
<style>body{{margin:0;background:#fff;color:#211b16;font:16px/1.7 system-ui,sans-serif}}main{{max-width:640px;margin:12vh auto;padding:24px}}h1{{font-size:28px;line-height:1.4}}p{{color:#58534c}}a{{display:inline-block;background:#fff200;color:#211b16;padding:10px 20px;border-radius:10px;font-weight:700;text-decoration:none}}a:focus-visible{{outline:3px solid #211b16;outline-offset:4px}}</style></head>
<body><main><img src="assets/fangpian/logo-yellow-square.webp" width="48" height="48" alt="方片新媒体"><h1>{title}</h1><p>{body}</p><a href="{reader}">{label}</a></main></body></html>
'''
    doc = Document(source)
    ranges = []
    home = bool(re.fullmatch(r'home(?:\.(?:en|ko|tw|hk))?\.html',name))
    for node in doc.nodes:
        if node['end'] is None: continue
        tag,a=node['tag'],node['attrs']
        raw = source[node['start']:node['end']]
        classes=set((a.get('class') or '').split())
        reason=None
        target=node
        if tag=='a' and (blocked_url(a.get('href','')) or 'xa-group' in classes): reason='blocked_links'
        elif a.get('id') in PROMO_IDS: reason='marketing_sections'
        elif classes & PROMO_CLASSES:
            reason='marketing_components'
            if 'alice-promo' in classes: target=ancestor(node,'section')
        elif 'alice-card' in classes and 'a-wordmark' in raw: reason='product_cards'
        elif home and (a.get('id')=='certificate' or {'hv-tag','amber'}<=classes or (tag=='a' and 'cert-preview' in raw)):
            reason='legacy_certificate_promotion'
        elif tag=='script':
            src=(a.get('src') or '').split('?')[0].rsplit('/',1)[-1]
            if src in RETIRED_SCRIPTS: reason='retired_script_references'
            elif not src and any(s in raw for s in ["getElementById('reviews')", "getElementById('contribSection')", "getElementById('gongyiSection')"]): reason='retired_inline_scripts'
            elif a.get('type')=='application/ld+json' and re.search(r'miyang\.cn|Fangpian\.cn',raw,re.I): reason='legacy_structured_data'
        elif tag=='link' and ('partners.css' in a.get('href','') or re.search(r'https?://(?:xueai\.)?miyang\.cn',a.get('href',''),re.I)):
            reason='legacy_metadata'
        elif tag=='meta' and re.search(r'https?://[^\s"<>]*miyang\.cn',a.get('content',''),re.I): reason='legacy_metadata'
        elif tag=='img' and 'img.alice.miyang.cn' in a.get('src',''):
            # Non-course brand artwork: use the supplied tiger locally.
            replacement=re.sub(r'(\bsrc\s*=\s*[\"\'])[^\"\']*([\"\'])',r'\1assets/fangpian/tiger-ai-assistant.webp\2',raw,count=1)
            ranges.append((node['start'],node['end'],replacement))
            counts['remote_brand_images']+=1
        if reason and target.get('end'):
            ranges.append((target['start'],target['end']))
            counts[reason]+=1
    # Apply image replacements first only outside removed ranges.
    removed=[r for r in ranges if len(r)==2]
    edits=[r for r in ranges if len(r)==3 and not any(s<=r[0]<e for s,e in removed)]
    # All replacements and removals refer to the original byte offsets.
    collapsed=[]
    for s,e in sorted(set(removed)):
        if collapsed and s<=collapsed[-1][1]:collapsed[-1]=(collapsed[-1][0],max(e,collapsed[-1][1]))
        else:collapsed.append((s,e))
    for s,e,replacement in sorted([(s,e,'') for s,e in collapsed]+edits,reverse=True):
        source=source[:s]+replacement+source[e:]
    source=re.sub(r'https?://(?:xueai\.miyang\.cn|方片学堂)/', '/', source, flags=re.I)
    source=re.sub(r'(?i)xueai\.miyang\.cn', '方片学堂', source)
    if re.fullmatch(r'elder(?:\.(?:tw|hk))?\.html',name):
        source=source.replace('白艾莉小姐', '方片学堂')
    # Only the isolated badge IIFE is retired. Other code in the same script
    # still renders the curriculum and controls the home page.
    source=re.sub(r"\(function\(\)\{\s*var img = document\.getElementById\('watchaBadgeImg'\);[\s\S]*?\}\)\(\);", '', source)
    source=re.sub(r'^[^<>\n]*(?:粤B2-20231240|增值電信業務經營許可證|增值电信业务经营许可证)[^<>\n]*','',source,flags=re.M)
    source=re.sub(r'Copyright\s*©[^<\n]*方片科技[^<\n]*(?:<br\s*/?>)?','方片新媒体 · 方片学堂',source,flags=re.I)
    if home:
        kicker = 'Bring AI into everyday content creation.' if '.en.' in name else 'AI로 콘텐츠 제작과 업무 효율을 높이세요.' if '.ko.' in name else '用 AI 提升內容創作與工作效率' if ('.tw.' in name or '.hk.' in name) else '用 AI 提升内容创作与工作效率'
        source=re.sub(r'(<p class="hero-kicker">)[\s\S]*?(</p>)',lambda m:m.group(1)+kicker+m.group(2),source)
        source=re.sub(r'<footer\b[^>]*>[\s\S]*?</footer>', '<footer class="footer"><div class="wrap">方片新媒体 · 方片学堂</div></footer>',source,flags=re.I)
        # The old page uses a div rather than footer on some variants.
        source=re.sub(r'Copyright\s*©[^<\n]*(?:<br\s*/?>)?\s*(?:·[^<\n]*(?:粤B2-20231240|Guangdong[^<\n]*))?', '',source,flags=re.I)
        source=re.sub(r'^[^<>\n]*(?:粤B2-20231240|增值電信業務經營許可證|增值电信业务经营许可证)[^<>\n]*','',source,flags=re.M)
    source=source.replace("fetch('/pv')", "Promise.reject(new Error('Legacy statistics retired'))")
    source=re.sub(r'^[ \t]+$', '',source,flags=re.M)
    source=re.sub(r'(</(?:aside|header)>)[ \t]+$',r'\1',source,flags=re.M)
    source=re.sub(r'(<!--seo:end-->)[ \t]+$',r'\1',source,flags=re.M)
    return source

def clean_js(source, name, counts):
    if name in RETIRED_SCRIPTS:
        # Compatibility endpoint for cached HTML, without old data or execution.
        if name=='reviews.js':return '// Legacy reviews removed. Employee feedback will use verified company data.\nwindow.XUEAI_REVIEWS = [];\n'
        return '// Retired legacy marketing/analytics module. Intentionally performs no requests.\n'
    if name=='nav-inject.js':
        source=source.replace('<div id="nav-pv-badge">','<div id="nav-pv-badge" style="display:none">')
        pattern=r'\(function\s*\([^)]*\)\s*\{(?:(?!\(function)[\s\S])*?\}\)\(\);'
        def drop_loader(match):
            raw=match.group()
            if re.search(r"s\.src\s*=\s*['\"](?:splash|track|ask-alice)\.js",raw):
                counts['dynamic_marketing_loaders']+=1
                return '// Legacy marketing/analytics loader removed.'
            return raw
        source=re.sub(pattern,drop_loader,source)
    if name.startswith('course-data'):
        source=re.sub(r"authorUrl:\s*['\"][^'\"]+['\"]", "authorUrl: ''",source)
        source=re.sub(r"github:\s*['\"][^'\"]+['\"]", "github: 'https://github.com/bedhere/AI-study'",source)
    if name=='auth.js':
        # Remove legacy contact/promotional channel data, not the login contract.
        source=re.sub(r"var (GROUP_QR|GZH_QR|X_QR|X_URL) = '[^']*';",r"var \1 = '';",source)
        source=re.sub(r'^  function openGroupModal\(\)\{[ \t]*\n[\s\S]*?^  }', '  function openGroupModal(){}',source,flags=re.M)
        source=re.sub(r'^  function maybeShowNotice\(\)\{[\s\S]*?^  }\s*maybeShowNotice\(\);', '',source,flags=re.M)
        source=re.sub(r'^\s*(?:chan\d\w+|notice\w+)\s*:\s*[^\n]*', '',source,flags=re.M)
    source=re.sub(r"https://xueai\.miyang\.cn/slides/", '/slides/',source)
    source=re.sub(r"https://Fangpian\.cn/?", '',source,flags=re.I)
    source=re.sub(r'xueai\.miyang\.cn', '方片学堂',source,flags=re.I)
    source=source.replace("fetch('/pv')", "Promise.reject(new Error('Legacy statistics retired'))")
    return source

def inventory():
    files=sorted(SLIDES.rglob('*.html'))
    pages=[]
    for p in files:
        text=p.read_text(encoding='utf-8')
        m=re.search(r'<title>(.*?)</title>',text,re.S|re.I)
        pages.append({'file':p.relative_to(SLIDES).as_posix(),'title':m.group(1) if m else '', 'language':next((x for x in ('en','ko','tw','hk') if p.stem.endswith('.'+x)),'zh-CN')})
    return pages

def findings():
    errors=[]
    for p in sorted(SLIDES.rglob('*')):
        if p.suffix not in ('.html','.js','.css'):continue
        text=p.read_text(encoding='utf-8')
        rules={
          'jd_navigation':r'href=[\"\']/jd/',
          'old_seo_origin':r'(?:https?://xueai\.miyang\.cn|mailto:connect@miyang\.cn)',
          'remote_brand_images':r'<img\b[^>]*src=[\"\']https?://img\.alice\.miyang\.cn',
          'marketing_script_reference':r'<script\b[^>]*src=[\"\'][^\"\']*(?:reviews|partners|splash|donor-board|track)\.js',
          'dynamic_marketing_loader':r"\.src\s*=\s*['\"](?:splash|track|ask-alice)\.js",
          'legacy_review_records':r'"review_url"\s*:\s*"https://watcha',
          'legacy_company_license':r'粤B2-20231240',
          'legacy_view_tracking':r"fetch\(['\"]/pv['\"]",
          'marketing_container':r'<(?:section|div)\b[^>]*(?:id=[\"\'](?:reviews|partnerHomeSection|contribSection|gongyiSection)[\"\']|class=[\"\'][^\"\']*\balice-promo\b)',
        }
        for kind,pattern in rules.items():
            for m in re.finditer(pattern,text,re.I): errors.append({'file':p.relative_to(SLIDES).as_posix(),'rule':kind,'line':text.count('\n',0,m.start())+1})
    return errors

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--write',action='store_true')
    parser.add_argument('--check',action='store_true')
    args=parser.parse_args()
    counts=Counter(); changed=[]
    if args.write:
        for p in sorted(SLIDES.rglob('*')):
            if p.suffix not in ('.html','.js'):continue
            original=p.read_text(encoding='utf-8')
            cleaned=clean_html(original,p.name,counts) if p.suffix=='.html' else clean_js(original,p.name,counts)
            if cleaned!=original:
                p.write_text(cleaned,encoding='utf-8',newline='\n');changed.append(p.relative_to(SLIDES).as_posix())
        comparison=subprocess.run(['git','-c','core.quotepath=false','diff','--name-only','612564f','--','public/slides'],cwd=ROOT,capture_output=True,text=True,encoding='utf-8')
        baseline_changes=comparison.stdout.splitlines() if comparison.returncode==0 else None
        REPORT.write_text(json.dumps({'phase':'FP-01 through FP-07','authoritative_tree':'public/slides','baseline_commit':'612564f','changed_files_since_baseline':len(baseline_changes) if baseline_changes is not None else None,'last_run_changed_files':len(changed),'last_run_counts':dict(counts),'files_changed_since_baseline':baseline_changes,'pages':inventory()},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    remaining=findings()
    print(json.dumps({'changed_files':len(changed),'counts':dict(counts),'html_pages':len(list(SLIDES.rglob('*.html'))),'remaining':len(remaining),'examples':remaining[:20]},ensure_ascii=False,indent=2))
    raise SystemExit(1 if remaining else 0)

if __name__=='__main__':main()
