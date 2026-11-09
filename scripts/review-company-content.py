"""One-off content migration. Preserve technical examples; remove product endorsements."""
from pathlib import Path
from html.parser import HTMLParser
import re
import json
import html

ROOT = Path(__file__).resolve().parents[1]
SLIDES = ROOT / 'public/slides'
changes = {}

def save(path, value, decision='改写'):
    if path.read_text(encoding='utf-8') != value:
        path.write_text(value, encoding='utf-8')
        changes[path.name] = decision

class TextEdits(HTMLParser):
    def __init__(self, source, replace):
        super().__init__(convert_charrefs=False)
        self.source, self.replace, self.edits, self.skip = source, replace, [], 0
        self.offsets = [0] + [m.end() for m in re.finditer('\n', source)]
        self.feed(source)
    def position(self):
        row, col = self.getpos()
        return self.offsets[row - 1] + col
    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'): self.skip += 1
        raw = self.get_starttag_text()
        if tag == 'meta' or tag == 'img':
            fixed = re.sub(r'\b(content|alt|title)=("[^"]*"|\x27[^\x27]*\x27)', lambda m: m[1] + '=' + m[2][0] + self.replace(m[2][1:-1]) + m[2][-1], raw)
            if fixed != raw: self.edits.append((self.position(), self.position() + len(raw), fixed))
    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.skip = max(0, self.skip - 1)
    def handle_data(self, data):
        if not self.skip:
            fixed = self.replace(data)
            if fixed != data: self.edits.append((self.position(), self.position() + len(data), fixed))
    def output(self):
        result = self.source
        for start, end, value in sorted(self.edits, reverse=True): result = result[:start] + value + result[end:]
        return result

def locale(name):
    m = re.search(r'\.(en|ko|tw|hk)\.html$', name)
    return m[1] if m else 'zh'

def shell(lang, title, description, body):
    suffix = '' if lang == 'zh' else '.' + lang
    return f'''<!doctype html><html lang="{'zh-CN' if lang == 'zh' else 'zh-Hant' if lang in ('tw','hk') else lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(title)} | 方片学堂</title><meta name="description" content="{html.escape(description, quote=True)}"><link rel="icon" href="assets/fangpian/logo-yellow-square.webp"><script src="theme-bridge.js?v=20260816k"></script><link rel="stylesheet" href="lesson.css?v=20260827a"><script src="/slides/external-platform-policy.js"></script></head><body><article class="lesson"><header class="lesson-header"><h1>{html.escape(title)}</h1><p class="subtitle">{html.escape(description)}</p></header>{body}</article><script src="i18n.js?v=20261109b"></script><script src="lesson.js"></script><script src="nav-inject.js?v=20261109b"></script></body></html>\n'''

# Replace the former author's product history with an explicitly fictional teaching brief.
briefs = {
 'zh': ('从业务任务到可交付的 AI 工具', '以一个虚构的内容生产助手为教学示例，拆解从模型调用到可靠交付需要考虑的工程问题；不代表方片已经上线的产品。', '先确定一个真实任务', '为一次短视频选题整理资料、形成脚本草稿，并由同事核验事实与最终表达。先写清输入、输出和验收标准，再决定需要哪些能力。', '按需要学习八类能力', ['视觉生成与角色一致性：参考图、提示词与结果检查。', '工具调用与循环：让助手完成有限、可检查的操作。', '上下文管理：保留任务目标，控制过期和无关信息。', '外部记忆：记录经过确认的事实，并能回查来源。', '提示词组织：分清角色、任务、约束和输出格式。', '协作分工：明确哪些交给工具，哪些需要人判断。', '权限与观测：限制操作范围，记录成本和失败信息。', 'MCP 集成：区分调用外部工具与提供自身能力。'], '完成一个小闭环', '选一项日常工作，画出“材料输入—AI 草稿—人工核验—交付”的流程。先跑通一个可验证步骤，再逐步补齐后续能力。'),
 'en': ('From a business task to a deliverable AI tool', 'A fictional content assistant illustrates the engineering decisions between calling a model and delivering reliable results. It is not a product already launched by Fangpian.', 'Start with a real task', 'Collect material for a short-video idea, create a script draft and ask a colleague to verify the facts and final wording. Define inputs, outputs and acceptance criteria first.', 'Explore eight capabilities as needed', ['Visual generation: references, prompts and consistency checks.', 'Tool loops: bounded operations with verifiable results.', 'Context: preserve the goal and remove stale information.', 'Memory: retain confirmed facts with traceable sources.', 'Prompts: separate role, task, constraints and format.', 'Collaboration: define what tools do and what people decide.', 'Permissions and observability: limit actions and record failures and costs.', 'MCP: distinguish consuming tools from exposing capabilities.'], 'Complete a small end-to-end task', 'Map material input, AI drafting, human verification and delivery. Make one step work reliably before expanding.'),
 'ko': ('업무 과제에서 전달 가능한 AI 도구까지', '가상의 콘텐츠 제작 도우미를 예로 모델 호출부터 신뢰할 수 있는 결과 전달까지의 설계 문제를 살펴봅니다. 팡피엔이 이미 출시한 제품을 뜻하지 않습니다.', '실제 업무 하나부터', '숏폼 영상의 소재를 정리하고 대본 초안을 만든 뒤 동료가 사실과 최종 표현을 확인합니다. 먼저 입력, 출력, 완료 기준을 정합니다.', '필요에 따라 배울 여덟 가지 기능', ['이미지 생성: 참조 이미지, 프롬프트, 일관성 확인.', '도구 호출과 반복: 범위가 제한되고 확인 가능한 작업.', '맥락 관리: 목표를 보존하고 오래된 정보 정리.', '외부 기억: 확인한 사실과 출처 저장.', '프롬프트: 역할·과제·제약·형식 구분.', '협업: 도구의 작업과 사람의 판단 구분.', '권한과 관측: 작업 제한, 실패와 비용 기록.', 'MCP: 외부 도구 사용과 자체 기능 제공 구분.'], '작은 작업 흐름 완성', '자료 입력, AI 초안, 사람의 검증, 결과 전달을 그려 보세요. 확인 가능한 한 단계부터 완성합니다.')
}
briefs['tw'] = briefs['hk'] = ('從業務任務到可交付的 AI 工具', '以一個虛構的內容生產助手為教學示例，拆解從模型呼叫到可靠交付需要考慮的工程問題；不代表方片已經上線的產品。', '先確定一個真實任務', '為一次短影片選題整理資料、形成腳本草稿，並由同事核驗事實與最終表達。先寫清輸入、輸出和驗收標準，再決定需要哪些能力。', '按需要學習八類能力', ['視覺生成與角色一致性：參考圖、提示詞與結果檢查。', '工具呼叫與循環：有限、可檢查的操作。', '上下文管理：保留目標，整理過期資訊。', '外部記憶：記錄確認的事實並可回查來源。', '提示詞組織：分清角色、任務、約束和格式。', '協作分工：明確工具執行與人工判斷。', '權限與觀測：限制操作範圍，記錄成本與失敗。', 'MCP 整合：區分呼叫外部工具與提供自身能力。'], '完成一個小閉環', '選一項日常工作，畫出「材料輸入—AI 草稿—人工核驗—交付」的流程。先跑通一個可驗證步驟，再逐步補齊後續能力。')

for lang, value in briefs.items():
    p = SLIDES / ('9-0' + ('' if lang == 'zh' else '.' + lang) + '.html')
    if p.exists():
        title, desc, heading, paragraph, modules, items, finish, task = value
        body = f'<h2>{heading}</h2><p>{paragraph}</p><h2>{modules}</h2><ul>' + ''.join('<li>' + item + '</li>' for item in items) + f'</ul><h2>{finish}</h2><p>{task}</p>'
        save(p, shell(lang, title, desc, body))
        changes[p.name] = '改写'

special = {
 'zh': {
  '9-5': ('调通生图接口只是开始。以一个教学示例为线索，检查体验、质量、工程与安全四类上线条件。', '上线前按清单逐项验证，并为失败准备明确的人工处理方式。实际投入取决于任务和验收要求，不使用原作者项目的工期作为承诺。'),
  '9-4': (None, '降级链可以降低单一模型故障的影响，仍需设置超时、重试上限和清楚的失败提示；当所有路径失败时，让用户知道如何重试或转人工处理。'),
  'build-3': ('提示词已经能稳定生成草稿，下一步是让工具真正执行一个动作。先接入一个可核验、可撤销或可人工接管的操作，不追求工具数量。', None)
 },
 'en': {'9-5': ('Connecting an image API is only a start. Use a teaching example to check experience, quality, engineering and safety before release.', 'Validate each item and provide clear human handling for failures. Effort depends on the task and acceptance criteria, not another product’s development timeline.'), '9-4': (None, 'Fallback reduces the impact of one model failing. Set timeouts, retry limits and clear errors; explain how to retry or seek human help when every path fails.'), 'build-3': ('A prompt can produce a stable draft. Now connect one tool operation that can be verified, reversed or handed to a person.', None)},
 'ko': {'9-5': ('이미지 API 연결은 시작입니다. 교육용 예제로 경험·품질·구현·안전의 출시 조건을 확인합니다.', '항목별로 검증하고 실패 시 사람이 처리할 방법을 마련하세요. 실제 투입은 과제와 완료 기준에 따라 달라집니다.'), '9-4': (None, '대체 경로도 모두 실패할 수 있습니다. 제한 시간, 재시도 상한, 분명한 오류 안내와 수동 처리 방법을 마련하세요.'), 'build-3': ('안정적인 초안 다음에는 확인·취소·수동 처리가 가능한 도구 작업 하나를 연결합니다.', None)}
}
special['tw'] = special['hk'] = {'9-5': ('調通生圖介面只是開始。以教學示例為線索，檢查體驗、品質、工程與安全四類上線條件。', '上線前逐項驗證，並為失敗準備人工處理方式。實際投入取決於任務和驗收要求，不以原作者的開發工期作承諾。'), '9-4': (None, '降級鏈仍可能全部失敗。需要設定逾時、重試上限和明確的失敗提示，說明如何重試或轉人工處理。'), 'build-3': ('提示詞能穩定產生草稿後，先接入一個可核驗、可撤銷或可人工接管的工具操作。', None)}
for lang, first, third in [
    ('zh', '用同一个虚构人物比较两种生图方式：没有参考图时外貌容易漂移；有参考图时，以图像约束人物特征，再检查场景与动作。', '让同一个虚构人物在不同场景和服装中保持一致。比较无参考图与使用参考图的结果，学习如何固定外貌特征并检查生成偏差。'),
    ('en', 'Compare text-only generation and reference-guided generation using one fictional character. Check appearance, setting and action in both results.', 'Keep a fictional character consistent across settings and outfits. Compare references and generated results to identify changes in appearance.'),
    ('ko', '한 가상 인물로 텍스트만 사용한 생성과 참조 이미지 기반 생성을 비교하고 외모·장면·행동을 확인합니다.', '가상 인물을 여러 장면과 의상에서도 일관되게 표현하고 참조 이미지와 생성 결과의 차이를 확인합니다.'),
    ('tw', '用同一個虛構人物比較兩種生圖方式：沒有參考圖時外貌容易漂移；有參考圖時，以圖像約束人物特徵，再檢查場景與動作。', '讓同一個虛構人物在不同場景和服裝中保持一致，對照參考圖檢查外貌特徵與生成偏差。'),
    ('hk', '用同一個虛構人物比較兩種生圖方式：沒有參考圖時外貌容易漂移；有參考圖時，以圖像約束人物特徵，再檢查場景與動作。', '讓同一個虛構人物在不同場景和服裝中保持一致，對照參考圖檢查外貌特徵與生成偏差。')
]:
    special[lang]['9-1'] = (first, None)
    special[lang]['9-3'] = (third, None)

for p in SLIDES.glob('*.html'):
    lang = locale(p.name)
    base = re.sub(r'\.(en|ko|tw|hk)(?=\.html$)', '', p.name)
    source = p.read_text(encoding='utf-8')
    # Alice is an ordinary assignee in this JSON/API teaching example, not a product.
    if base == '10-7.html': continue
    art = base in ('9-1.html', '9-2.html', '9-3.html')
    replacement = ('example character' if art else 'example assistant') if lang == 'en' else ('예시 캐릭터' if art else '예시 도우미') if lang == 'ko' else ('示例角色' if art else '示例助手')
    def replace(text):
        text = text.replace('Alice', replacement).replace('小羊', '小火')
        text = text.replace('以 示例助手 发版助手为例', '以一个虚构的发版助手为例')
        if base.startswith('seo-'):
            text = text.replace('方片学堂「被搜到」专题原创', '课程来源项目的 SEO / GEO 教学材料').replace('方片學堂「被搜到」專題原創', '課程來源專案的 SEO / GEO 教學材料')
            text = text.replace('本站', '案例站点' if lang == 'zh' else '案例站點').replace('方片学堂', '案例站点').replace('方片學堂', '案例站點')
            if lang == 'en': text = text.replace('this site', 'the case-study site').replace('our site', 'the case-study site').replace('Fangpian Academy', 'the case-study site')
            if lang == 'ko': text = text.replace('이 사이트', '사례 사이트').replace('팡피엔 학당', '사례 사이트')
        text = text.replace('解剖一个真实 Skill', '解剖一个示例 Skill').replace('剖析一個真實 Skill', '剖析一個示例 Skill').replace('解剖一個真實 Skill', '解剖一個示例 Skill')
        return text
    output = TextEdits(source, replace).output()
    neutral = special.get(lang, {}).get(base.removesuffix('.html'))
    if neutral:
        subtitle, takeaway = neutral
        if subtitle: output = re.sub(r'(<p\b[^>]*class="subtitle"[^>]*>)[\s\S]*?(</p>)', lambda m: m[1] + subtitle + m[2], output, count=1)
        if takeaway: output = re.sub(r'<div class="takeaway(?: reveal)?">[\s\S]*?</div>', '<div class="takeaway"><p>' + takeaway + '</p></div>', output, count=1)
    if output != source and base.startswith(('7-', '9-', 'build-', 'interview-3')):
        notice = {'zh':'本页中的助手、角色与流程为教学示例，用于解释技术原理，不代表方片已上线产品或真实项目业绩。', 'en':'Assistants, characters and workflows on this page are teaching examples, not launched Fangpian products or verified project results.', 'ko':'이 페이지의 도우미·캐릭터·흐름은 기술 원리를 설명하는 교육 예제이며 실제 출시 제품이나 실적을 뜻하지 않습니다.', 'tw':'本頁的助手、角色與流程為教學示例，不代表方片已上線產品或真實專案業績。', 'hk':'本頁的助手、角色與流程為教學示例，不代表方片已上線產品或真實專案業績。'}[lang]
        if 'company-example-note' not in output: output = re.sub(r'</header>', '</header><aside class="xa-tldr company-example-note"><p>' + notice + '</p></aside>', output, count=1)
    if base.startswith('seo-') or base == 'taste-6.html':
        notice = {'zh':'本页保留课程来源项目的公开网站案例作为教学材料。案例经历、流量与收录数据不属于方片内部平台，代码示例也不代表当前学堂的实际实现。', 'en':'This page uses the source course’s public-website case study as teaching material. Its project history, traffic and indexing data are not Fangpian internal-platform results; code examples do not describe the current school implementation.', 'ko':'원본 강좌의 공개 웹사이트 사례를 교육 자료로 사용합니다. 프로젝트 이력·방문량·검색 수록 데이터는 팡피엔 내부 플랫폼의 실적이 아니며 예제 코드도 현재 학당 구현을 뜻하지 않습니다.', 'tw':'本頁保留課程來源專案的公開網站案例作為教學材料。案例經歷、流量與收錄資料不屬於方片內部平台，程式碼示例也不代表目前學堂的實際實作。', 'hk':'本頁保留課程來源專案的公開網站案例作為教學材料。案例經歷、流量與收錄資料不屬於方片內部平台，程式碼示例也不代表目前學堂的實際實作。'}[lang]
        if 'company-source-case' not in output: output = re.sub(r'</header>', '</header><aside class="xa-tldr company-source-case"><p>' + notice + '</p></aside>', output, count=1)
    save(p, output)

# These old product tutorials promised features that are no longer connected.
lessons = {
 'learn-30': ('把当前材料清楚地交给 AI', '提问时主动提供材料、问题和约束；本页不依赖学堂内置助教。', ['复制需要讨论的原文，保留标题、出处和必要上下文。', '标出你不理解的句子，说明你想解释、比较还是检查。', '要求回答引用你提供的原句；缺少信息时先追问。'], '以下是材料原文：【粘贴材料】。我卡在：【具体句子】。请只根据原文解释，并引用依据；原文未说明的地方请标记为需要确认。'),
 'learn-31': ('让 AI 一次只问一道自测题', '把已学内容交给你正在使用的 AI 工具，通过回答问题检查自己是否理解。', ['提供本次学习的材料和目标，避免让工具随意猜测课程内容。', '要求一次只出一道题，等你作答后再给解析。', '对照原文核验解析，把答错的原因记录下来，再换一道题验证。'], '请根据下面的学习材料考我。一次只问一道题，先等我回答，再指出依据与遗漏。不要提前给答案。材料：【粘贴材料】。'),
 'learn-32': ('把核验过的学习笔记留给下一次', '普通 AI 对话不一定会自动记住笔记。主动整理和提供上下文，让记录真正参与下一次任务。', ['将结论、原始来源、适用条件和待核验事项分开记录。', '下一次提问时，主动粘贴与当前任务相关的笔记。', '要求工具说明使用了哪条笔记；核对过时信息后再更新记录。'], '下面是我核验过的笔记：【粘贴笔记与来源】。当前任务：【任务】。请说明哪些笔记相关，引用对应条目；不相关或已过时的内容不要直接采用。')
}
translations = {
 'en': {
  'learn-30': ('Give AI the material and a clear question', 'Provide the source, question and constraints yourself. This lesson does not require a built-in school assistant.', ['Paste the relevant source, title and necessary context.', 'Point out the sentence you are unsure about and the help you need.', 'Ask for quotations from your source and for questions when information is missing.'], 'Source: [paste material]. My question: [specific sentence]. Explain only from this source, quote the evidence, and mark anything that needs checking.'),
  'learn-31': ('Ask AI one practice question at a time', 'Use the AI tool you normally work with to check your understanding of a supplied learning source.', ['Provide the material and your learning goal.', 'Request one question at a time and answer before seeing the explanation.', 'Check the explanation against the source and record mistakes.'], 'Quiz me using this material: [paste source]. Ask one question, wait for my answer, then explain with evidence. Do not reveal the answer first.'),
  'learn-32': ('Bring verified notes into the next task', 'An AI conversation may not remember your notes. Supply relevant notes yourself when starting a new task.', ['Record conclusions, sources, conditions and open questions separately.', 'Paste the relevant notes into the next request.', 'Ask which notes were used and check whether they are outdated.'], 'Verified notes and sources: [paste notes]. Current task: [task]. Cite relevant notes and do not assume unrelated or outdated information applies.')
 },
 'ko': {
  'learn-30': ('AI에게 자료와 질문을 분명히 전달하기', '원문, 질문, 제약을 직접 제공합니다. 학당 내장 도우미 없이 연습할 수 있습니다.', ['원문과 제목, 필요한 배경을 붙여 넣습니다.', '어려운 문장과 원하는 도움을 구체적으로 적습니다.', '원문의 근거를 인용하고 정보가 부족하면 먼저 질문하도록 요청합니다.'], '원문: [자료]. 질문: [문장]. 이 원문만으로 설명하고 근거를 인용하세요. 확인이 필요한 내용은 따로 표시하세요.'),
  'learn-31': ('AI에게 한 번에 한 문제씩 자가 테스트 받기', '사용 중인 AI 도구에 학습 자료를 제공하고 이해했는지 확인합니다.', ['자료와 학습 목표를 전달합니다.', '한 문제씩 출제하고 내가 답한 뒤 해설하도록 요청합니다.', '해설의 근거를 원문으로 확인하고 오답 이유를 적습니다.'], '자료: [원문]. 한 번에 한 문제만 내고 제 답을 기다리세요. 답한 뒤 근거와 빠진 부분을 설명하세요. 먼저 정답을 보여주지 마세요.'),
  'learn-32': ('확인한 학습 노트를 다음 과제에 활용하기', 'AI가 노트를 자동으로 기억한다고 가정하지 말고 필요한 내용을 직접 제공합니다.', ['결론, 출처, 적용 조건과 미확인 사항을 구분해 기록합니다.', '다음 질문에 관련 노트를 붙여 넣습니다.', '어떤 노트를 사용했는지 확인하고 오래된 내용을 갱신합니다.'], '검증한 노트와 출처: [노트]. 현재 과제: [과제]. 관련 항목을 인용하고 관련 없거나 오래된 정보를 그대로 적용하지 마세요.')
 },
 'tw': {
  'learn-30': ('把當前材料清楚地交給 AI', '提問時主動提供材料、問題和約束；本頁不依賴學堂內建助教。', ['複製需要討論的原文，保留標題、出處和必要上下文。', '標出不理解的句子，說明需要解釋、比較還是檢查。', '要求引用原句；缺少資訊時先追問。'], '原文：【貼上材料】。問題：【具體句子】。請只根據原文解釋並引用依據，原文未說明的地方請標記為需要確認。'),
  'learn-31': ('讓 AI 一次只問一道自測題', '把已學內容交給實際使用的 AI 工具，透過回答問題檢查理解。', ['提供學習材料和目標。', '要求一次只出一道題，等你作答後再解析。', '對照原文核驗解析，記錄答錯的原因。'], '請根據以下材料考我：【材料】。一次只問一道題，等我回答後再指出依據與遺漏，不要提前給答案。'),
  'learn-32': ('把核驗過的學習筆記留給下一次', '普通 AI 對話不一定會自動記住筆記，請主動提供相關上下文。', ['分開記錄結論、來源、適用條件和待核驗事項。', '下一次提問時貼上相關筆記。', '要求說明使用了哪條筆記，並核對過期資訊。'], '已核驗筆記與來源：【筆記】。當前任務：【任務】。請引用相關條目，不要直接採用無關或過期內容。')
 }
}
translations['hk'] = translations['tw']
for base, original in lessons.items():
    for lang in ['zh','en','ko','tw','hk']:
        title, desc, steps, prompt = translations.get(lang, {}).get(base, original)
        p = SLIDES / (base + ('' if lang == 'zh' else '.' + lang) + '.html')
        if not p.exists(): continue
        labels = {'zh':('按这三步试一遍','可以直接使用的提问模板','请在你实际使用的 AI 工具中练习。学堂当前未接入聊天、划词提问或笔记云端记忆服务。'), 'en':('Try these three steps','A prompt to practise with','Use your own AI tool. Chat, selection-based questions and cloud note memory are not connected in this school.'), 'ko':('세 단계로 연습하기','사용할 질문 템플릿','실제로 사용하는 AI 도구에서 연습하세요. 학당의 채팅·선택 영역 질문·클라우드 노트 기억 기능은 연결되지 않았습니다.'), 'tw':('按這三步試一遍','可以直接使用的提問模板','請在實際使用的 AI 工具中練習。學堂尚未接入聊天、劃詞提問或筆記雲端記憶服務。'), 'hk':('按這三步試一遍','可以直接使用的提問模板','請在實際使用的 AI 工具中練習。學堂尚未接入聊天、劃詞提問或筆記雲端記憶服務。')}[lang]
        body = '<h2>' + labels[0] + '</h2><ol>' + ''.join('<li>' + step + '</li>' for step in steps) + '</ol><h2>' + labels[1] + '</h2><blockquote>' + html.escape(prompt) + '</blockquote><p>' + labels[2] + '</p>'
        save(p, shell(lang, title, desc, body))

preview = SLIDES / 'redesign-preview.html'
if preview.exists():
    save(preview, shell('zh', '旧版设计预览已归档', '请从公司学习路线进入当前版本。', '<p><a href="home.html#who" target="_top">查看员工学习路线</a></p>'), '下架')

(ROOT / 'reports/company-content-migration.json').write_text(json.dumps({'scope':'最近一次迁移动作；完整处理清单见 course-content-review.json。技术示例人名、资源文件名和源码来源保留。', 'changed':changes}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'changed':len(changes),'rewritten':sum(v=='改写' for v in changes.values()),'retired':sum(v=='下架' for v in changes.values())},ensure_ascii=False))
