"""Finalize local-mode UI copy and search pending feedback."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
slides = root / 'public' / 'slides'
for suffix in ['', '.en', '.ko', '.tw', '.hk']:
    path = slides / f'learn{suffix}.html'
    text = path.read_text(encoding='utf-8')
    text = text.replace("searchQ = q; searchLoading = false; searchFailed = false; searchInput.setAttribute('aria-busy','false');", "searchQ = q; searchFailed = false;")
    text = text.replace("searchBodyHits = cached || null;\n      applySearch();", "searchBodyHits = cached || null;\n      searchLoading = q.length >= SEARCH_MIN_LEN && !cached;\n      searchInput.setAttribute('aria-busy', searchLoading ? 'true' : 'false');\n      applySearch();")
    text = re.sub(r'/\*(?:(?!\*/)[\s\S])*?\*/\s+var cloudSync = false;\s+var pushTimer = null;\s+function pushProgress\(\)\{\}', '/* Progress is stored locally by the shared learning module. */', text)
    text = re.sub(r'/\*(?:(?!\*/)[\s\S])*?\*/\s+(?=var SEARCH_LANG =)', '/* Match titles immediately; load the current language text index on demand. */\n  ', text)
    text = re.sub(r'/\*(?:(?!\*/)[\s\S])*?\*/\s+(?=window.XueaiAuth.mount\(document.getElementById\(\'authSlot\'\)\))', '/* Local mode badge and progress updates across tabs. */\n  ', text)
    text = re.sub(r'var SEARCH_MIN_LEN = 1;[^\n]*', 'var SEARCH_MIN_LEN = 1;', text)
    text = text.replace('  var SEARCH_TIMEOUT = 3000;\n', '')
    text = text.replace("var h = ''; try{ h = decodeURIComponent(location.hash.replace(/^#/, '')); }catch(error){}\n    h = window.FangpianLearning.canonical(h);", "var h = window.FangpianLearning.route(location.hash).file;")
    text = text.replace("if(location.hash !== '#' + encodeURIComponent(L.file)) history.replaceState(null, '', '#' + encodeURIComponent(L.file));", "var quizMode = window.FangpianLearning.route(location.hash).mode;\n    var routeHash = '#' + encodeURIComponent(L.file + (quizMode ? '?mode=' + quizMode : ''));\n    if(location.hash !== routeHash) history.replaceState(null, '', routeHash);")
    text = text.replace("+ 'embed=1';", "+ 'embed=1' + (quizMode ? '&mode=' + quizMode : '');")
    text = text.replace("          location.hash = '#' + encodeURIComponent(base);", "          var mode = new URL(a.href).searchParams.get('mode');\n          var quiz = /^exam-(?:\\d+|all)\\.html$/.test(base) && /^(exam|drill)$/.test(mode || '');\n          location.hash = '#' + encodeURIComponent(base + (quiz ? '?mode=' + mode : ''));")
    path.write_text(text, encoding='utf-8', newline='\n')

replacements = {
    '前两节免登录，其余登录后学习。': '本地版可直接学习，进度仅保存在当前浏览器。',
    '前兩節免登入，其餘登入後學習。': '本地版可直接學習，進度僅保存在目前瀏覽器。',
    'The first two lessons are open; the rest require signing in.': 'All lessons are available locally; progress stays in this browser.',
    '앞의 두 강의는 로그인 없이, 나머지는 로그인 후에 학습하세요.': '모든 강의를 로컬에서 바로 학습할 수 있으며 진도는 현재 브라우저에만 저장됩니다.',
    '앞 두 레슨은 로그인 없이, 나머지는 로그인 후 학습합니다.': '모든 강의를 로컬에서 바로 학습할 수 있으며 진도는 현재 브라우저에만 저장됩니다.',
}
for path in slides.glob('course-data*.js'):
    text = path.read_text(encoding='utf-8')
    for old, new in replacements.items(): text = text.replace(old, new)
    path.write_text(text, encoding='utf-8', newline='\n')

for suffix in ['', '.en', '.ko', '.tw', '.hk']:
    path = slides / f'exam{suffix}.html'
    text = path.read_text(encoding='utf-8')
    en = suffix == '.en'; ko = suffix == '.ko'; traditional = suffix in ('.tw', '.hk')
    title = 'About scores' if en else '성적 안내' if ko else '關於成績' if traditional else '关于成绩'
    desc = 'Recent results stay in this browser. Review explanations on the results page; account profiles and cloud analysis are not connected.' if en else '최근 성적은 현재 브라우저에만 저장됩니다. 결과 화면에서 해설을 확인하세요. 계정 프로필과 클라우드 분석은 아직 연결되지 않았습니다.' if ko else '近期成績僅儲存在目前瀏覽器。請在結果頁查看錯題解析；帳號中心與雲端薄弱點分析尚未接入。' if traditional else '近期成绩仅保存在当前浏览器。请在结果页查看错题解析；账号中心与云端薄弱点分析尚未接入。'
    note = 'Questions include explanations. Online issue reporting is not available in this local version.' if en else '각 문제에 해설이 포함됩니다. 로컬 버전에서는 온라인 오류 신고를 지원하지 않습니다.' if ko else '題目附有答案解析。本地版暫不提供線上問題回報。' if traditional else '题目附有答案解析。本地版暂不提供在线问题反馈。'
    text = re.sub(r'<section class="reveal">\s*<div class="sec-label">[^<]*</div>\s*<div class="l-callout">[\s\S]*?</section>', f'<section class="reveal"><div class="sec-label">{title}</div><div class="l-callout"><p>{desc}</p></div><p class="src-note">{note}</p></section>', text)
    path.write_text(text, encoding='utf-8', newline='\n')
print('Updated search pending feedback and local curriculum copy.')
