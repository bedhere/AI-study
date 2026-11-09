"""One-way migration of the current static application to local learning."""
from pathlib import Path
from collections import Counter
from urllib.parse import urlparse, unquote
import json
import re
from cleanup_legacy import Document

ROOT=Path(__file__).resolve().parents[1]
SLIDES=ROOT/'public'/'slides'
counts=Counter()

def closing_brace(text,start):
    depth=0; quote=None; comment=None; i=start
    while i<len(text):
        c=text[i]; nxt=text[i:i+2]
        if comment=='line':
            if c=='\n':comment=None
        elif comment=='block':
            if nxt=='*/':comment=None;i+=1
        elif quote:
            if c=='\\':i+=1
            elif c==quote:quote=None
        elif nxt=='//':comment='line';i+=1
        elif nxt=='/*':comment='block';i+=1
        elif c in "'\"`":quote=c
        elif c=='{':depth+=1
        elif c=='}':
            depth-=1
            if depth==0:return i+1
        i+=1
    raise ValueError('Unclosed function at '+str(start))

def replace_function(text,name,replacement):
    match=re.search(r'function\s+'+re.escape(name)+r'\s*\([^)]*\)\s*\{',text)
    if not match:raise ValueError('Missing function '+name)
    end=closing_brace(text,text.index('{',match.start()))
    return text[:match.start()]+replacement+text[end:]

def remove_iife_containing(text,needle):
    at=text.find(needle)
    if at<0:return text
    start=text.rfind('(function',0,at)
    brace=text.find('{',start)
    if start<0:raise ValueError('IIFE not found: '+needle)
    end=closing_brace(text,brace)
    tail=re.match(r'\s*\)\(\);',text[end:])
    if not tail:raise ValueError('IIFE tail not found: '+needle)
    return text[:start]+'/* Original remote service retired in local mode. */'+text[end+tail.end():]

def replace_auth_block(text):
    marker='  if(window.XueaiAuth){'
    start=text.rfind(marker)
    if start<0:raise ValueError('Reader auth block missing')
    end=closing_brace(text,text.index('{',start))
    return text[:start]+'''  window.XueaiAuth.mount(document.getElementById('authSlot'));
  window.addEventListener('fangpian:progress', function(){
    progress = loadProgress();
    refreshProgress();
    updateMarkUI(currentFile());
  });'''+text[end:]

SEARCH_FUNCTION='''function fetchBodyHits(q){
    var key = SEARCH_LANG + '\\n' + q;
    var seq = ++searchSeq;
    searchLoading = true; searchFailed = false;
    searchInput.setAttribute('aria-busy', 'true');
    applySearch();
    window.FangpianSearch.find(q, SEARCH_LANG).then(function(files){
      if(seq !== searchSeq) return;
      if(searchCache.size >= SEARCH_CACHE_MAX) searchCache.clear();
      searchBodyHits = new Set(files); searchCache.set(key, searchBodyHits);
      searchLoading = false; searchInput.setAttribute('aria-busy', 'false');
      applySearch();
    }).catch(function(){
      if(seq !== searchSeq) return;
      searchLoading = false; searchFailed = true;
      searchInput.setAttribute('aria-busy', 'false'); applySearch();
    });
  }'''

def reader(text):
    if 'fangpian:local-reader-v1' in text:return text
    text=replace_function(text,'loadProgress',"function loadProgress(){ return window.FangpianLearning.forLessons(FLAT); }")
    text=replace_function(text,'pushProgress','function pushProgress(){}')
    text=replace_function(text,'saveProgress',"function saveProgress(p){ window.FangpianLearning.saveLessons(p, FLAT); }")
    text=replace_function(text,'currentFile', '''function currentFile(){
    var h = ''; try{ h = decodeURIComponent(location.hash.replace(/^#/, '')); }catch(error){}
    h = window.FangpianLearning.canonical(h);
    if(h && FLAT.some(function(lesson){return lesson.file === h;})) return h;
    return window.FangpianLearning.lastFor(FLAT) || FLAT[0].file;
  }''')
    text=text.replace('    var L = f.data;','''    var L = f.data;
    if(location.hash !== '#' + encodeURIComponent(L.file)) history.replaceState(null, '', '#' + encodeURIComponent(L.file));''',1)
    text=replace_function(text,'fetchBodyHits',SEARCH_FUNCTION)
    text=text.replace('var SEARCH_MIN_LEN = 2;','var SEARCH_MIN_LEN = 1;')
    text=text.replace("      searchQ = q;", "      searchQ = q; searchFailed = false;")
    text=text.replace("searchBodyHits = cached || null;\n      applySearch();", "searchBodyHits = cached || null;\n      searchLoading = q.length >= SEARCH_MIN_LEN && !cached;\n      searchInput.setAttribute('aria-busy', searchLoading ? 'true' : 'false');\n      applySearch();")
    status='''  // fangpian:local-reader-v1
  var localLabels = window.FangpianLearning.labels;
  var searchLoading = false, searchFailed = false;
  var searchStatus = document.createElement('p');
  searchStatus.id = 'localSearchStatus'; searchStatus.hidden = true;
  searchStatus.setAttribute('role','status'); searchStatus.setAttribute('aria-live','polite');
  searchStatus.style.cssText = 'margin:6px 16px 10px;font-size:12px;line-height:1.6;color:var(--sub,#58534c)';
  searchInput.parentElement.insertAdjacentElement('afterend',searchStatus);
  searchInput.setAttribute('aria-label',localLabels.searchLabel);
  searchInput.placeholder = localLabels.searchLabel;
'''
    text=text.replace("  var searchClear = document.getElementById('searchClear');", "  var searchClear = document.getElementById('searchClear');\n"+status,1)
    original=re.search(r'function applySearch\(\)\s*\{',text)
    end=closing_brace(text,text.index('{',original.start()))
    update='''
    if(searchStatus){
      var count = Array.prototype.filter.call(navTree.querySelectorAll('.lesson-item'),function(item){return item.style.display !== 'none';}).length;
      searchStatus.hidden = !q;
      searchStatus.textContent = searchLoading ? localLabels.loading : searchFailed ? localLabels.searchError : count ? localLabels.results.replace('{n}',count) : localLabels.empty;
    }
  '''
    text=text[:end-1]+update+text[end-1:]
    text=replace_auth_block(text)
    return text

def home(text):
    if 'local-home.js' in text:return text
    text=remove_iife_containing(text,'  if(!window.XueaiAuth) return;')
    text=remove_iife_containing(text,"fetch('/auth/stats')")
    text=replace_function(text,'loadPopular','function loadPopular(){}')
    text=text.replace("var currentMode = 'popular';","var currentMode = 'course';")
    text=text.replace("  renderTopics('popular');\n  loadPopular();", "  activateMode('course');")
    text=text.replace('</body>','<script src="local-home.js?v=2"></script>\n</body>')
    return text

def paused_page(name):
    english='.en.' in name; korean='.ko.' in name
    title='This course collection is being prepared' if english else '이 강좌는 준비 중입니다' if korean else '爸妈版课程整理中'
    body='Continue with the main learning course below.' if english else '아래의 주요 강좌에서 학습을 계속하세요.' if korean else '这部分课程缺少必要素材与交互资源，当前版本暂不开放。你可以先学习主线课程。'
    reader='learn.en.html' if english else 'learn.ko.html' if korean else 'learn.html'
    label='View courses' if english else '강좌 보기' if korean else '查看主线课程'
    return f'''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>{title} · 方片学堂</title><script src="/slides/external-platform-policy.js"></script><style>body{{font:16px/1.8 system-ui;margin:0;color:#211b16;background:#fff}}main{{max-width:640px;margin:12vh auto;padding:24px}}h1{{font-size:28px}}a{{display:inline-block;padding:10px 20px;background:#fff200;color:#211b16;border-radius:10px;text-decoration:none}}a:focus-visible{{outline:3px solid #211b16;outline-offset:4px}}</style></head><body><main><img src="assets/fangpian/logo-yellow-square.webp" width="48" height="48" alt="方片新媒体"><h1>{title}</h1><p>{body}</p><a href="{reader}">{label}</a></main></body></html>\n'''

def structural(text,p):
    doc=Document(text); edits=[]
    for node in doc.nodes:
        if node['end'] is None:continue
        a=node['attrs']; raw=text[node['start']:node['end']]; replacement=None
        if node['tag']=='script':
            src=a.get('src') or ''
            if src:
                target=urlparse(src)
                if not target.scheme and re.search(r'\.js$',target.path):
                    resolved=ROOT/'public'/target.path.lstrip('/') if target.path.startswith('/') else p.parent/unquote(target.path)
                    if not resolved.exists():replacement='';counts['missing_script_references_removed']+=1
            elif "classList.add('xa-locked')" in raw and len(raw)<12000:
                replacement='';counts['legacy_gate_initializers_removed']+=1
        if node['tag']=='a' and re.search(r'(^|/)elder(?:[.-]|\.html)',a.get('href','')):
            replacement='';counts['paused_course_entry_removed']+=1
        if a.get('id')=='certPeek':replacement=''
        if a.get('id')=='certLink':replacement='<span class="cert-link" id="certLink">✓</span>'
        if node['tag']=='link':
            href=a.get('href') or '';parsed=urlparse(href)
            if not parsed.scheme and parsed.path:
                resolved=ROOT/'public'/parsed.path.lstrip('/') if parsed.path.startswith('/') else p.parent/unquote(parsed.path)
                if not resolved.exists():replacement='';counts['missing_style_references_removed']+=1
        if replacement is not None:edits.append((node['start'],node['end'],replacement))
    # Parent removals subsume descendants; replacements use original offsets.
    chosen=[]
    for edit in sorted(edits,key=lambda row:(row[0],-row[1])):
        if not any(start<=edit[0] and edit[1]<=end for start,end,_ in chosen):chosen.append(edit)
    for start,end,value in reversed(chosen):text=text[:start]+value+text[end:]
    return text

changed=[]
for p in sorted(SLIDES.glob('*.html')):
    original=p.read_text(encoding='utf-8');text=original
    if p.name.startswith('elder'):
        text=paused_page(p.name);counts['paused_pages']+=1
    else:
        # Fix human-language apostrophes inside scripts, preserving escaped JS quotes.
        if p.name.endswith('.en.html'):
            def contractions(match):
                if 'src=' in match.group(1) or 'json' in match.group(1):return match.group()
                return '<script'+match.group(1)+'>'+re.sub(r"(?<=[a-zA-Z0-9])'(?=[a-zA-Z])",'’',match.group(2))+'</script>'
            if p.name in {x['file'] for x in json.loads((ROOT/'reports/known-script-issues.json').read_text(encoding='utf-8'))['issues']}:
                text=re.sub(r'<script\b([^>]*)>([\s\S]*?)</script>',contractions,text,flags=re.I)
        if re.fullmatch(r'learn(?:\.(en|ko|tw|hk))?\.html',p.name):text=reader(text)
        if re.fullmatch(r'home(?:\.(en|ko|tw|hk))?\.html',p.name):text=home(text)
        text=structural(text,p)
        if 'src="auth.js' in text and 'src="local-learning.js' not in text:
            text=re.sub(r'(<script\s+src="auth\.js)', '<script src="local-learning.js?v=2"></script>\n'+r'\1',text)
        if 'src="exam-engine.js' in text and 'src="local-learning.js' not in text:
            text=re.sub(r'(<script\s+src="exam-engine\.js)', '<script src="local-learning.js?v=2"></script>\n'+r'\1',text)
        if re.fullmatch(r'learn(?:\.(en|ko|tw|hk))?\.html',p.name) and 'src="local-search.js' not in text:
            text=text.replace('<script src="local-learning.js?v=2"></script>','<script src="local-learning.js?v=2"></script>\n<script src="local-search.js?v=2"></script>')
        if re.fullmatch(r'home(?:\.(en|ko|tw|hk))?\.html',p.name):
            text=re.sub(r'<p>[^<]*(?:登录方片账号即可解锁全部内容|登入方片帳號即可解鎖全部內容)[^<]*</p>','<p>无需登录即可学习，进度保存在当前浏览器。</p>',text)
    text=re.sub(r'^[ \t]+$','',text,flags=re.M)
    if text!=original:p.write_text(text,encoding='utf-8',newline='\n');changed.append(p.name)
(ROOT/'reports/phase-2-migration.json').write_text(json.dumps({'counts':dict(counts),'changed_files':len(changed),'files':changed},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'changed_files':len(changed),'counts':dict(counts)},ensure_ascii=False))
