(function () {
  'use strict';
  var local = window.FangpianLearning;
  var lessons = window.COURSE_FLAT || [];
  if (!local || !lessons.length) return;
  window.XueaiAuth.mount(document.getElementById('authSlot'));
  var reader = 'learn' + (local.lang === 'zh' ? '' : '.' + local.lang) + '.html';
  function paint() {
    var done = local.completed(lessons), total = lessons.length;
    var last = local.lastFor(lessons);
    var button = document.getElementById('heroStart');
    if (button) button.href = reader + (last ? '#' + encodeURIComponent(last) : '');
    var buttonText = document.getElementById('heroStartTxt');
    if (buttonText) buttonText.textContent = last ? local.labels.resume : local.labels.start;
    var ring = document.getElementById('hvRing');
    if (ring) ring.style.setProperty('--p', Math.round(done / total * 100));
    var number = document.getElementById('hvRingNum'); if (number) number.textContent = done;
    var unit = document.getElementById('hvRingUnit'); if (unit) unit.textContent = ' / ' + total;
    var caption = document.getElementById('hvRingCap'); if (caption) caption.textContent = local.labels.done;
    var pill = document.getElementById('hvPill'); if (pill) pill.textContent = local.labels.mode;
    var list = document.querySelectorAll('#hvList .hv-item');
    var parts = window.COURSE.parts.filter(function (part) { return part.group === 'main' && !part.prologue; }).slice(0, 5);
    list.forEach(function (item, index) {
      var part = parts[index]; if (!part) return;
      var items = part.topics.flatMap(function (topic) { return topic.lessons; });
      var count = local.completed(items);
      item.classList.toggle('done', items.length > 0 && count === items.length);
      var indicator = item.querySelector('.hv-nm i'); if (indicator) indicator.textContent = count + ' / ' + items.length;
    });
    var summary = document.getElementById('localProgressSummary');
    if (!summary) {
      summary = document.createElement('p'); summary.id = 'localProgressSummary'; summary.setAttribute('role', 'status');
      summary.style.cssText = 'font-size:12px;line-height:1.6;color:var(--text-s,#58534c);margin:14px 0 0';
      var parent = document.querySelector('.hero-copy'); if (parent) parent.appendChild(summary);
    }
    summary.textContent = local.labels.done + ' ' + done + ' / ' + total + ' · ' + local.labels.localOnly;
    var popular = document.getElementById('sortPopular'); if (popular) { popular.disabled = true; popular.hidden = true; popular.style.display = 'none'; }
    var status = document.getElementById('topicSortStatus'); if (status) { status.classList.remove('error'); status.textContent = local.labels.note; }
    var finalNote = document.querySelector('.final > p'); if (finalNote) finalNote.textContent = local.labels.note;
    var quizNote = document.querySelector('.tool-card .td');
    if (quizNote) quizNote.textContent = local.lang === 'en' ? 'Practice and exams; results stay in this browser.' : local.lang === 'ko' ? '연습과 시험 결과는 이 브라우저에 저장됩니다.' : '篇章练习与自测，结果保存在当前浏览器。';
  }
  paint();
  window.addEventListener('fangpian:progress', paint);
  window.addEventListener('pageshow', paint);
})();
