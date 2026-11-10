from pathlib import Path
import re

root=Path(__file__).resolve().parents[1]/'public/slides'
for file,slug in [('learn-3.html','personal-explanation'),('zero-3.html','verify-ai')]:
    page=root/file;source=page.read_text(encoding='utf-8')
    source=re.sub(r'<div class="academy-cover"[^>]*>[\s\S]*?</svg></div>','',source,count=1)
    if 'lesson-comic.css' not in source:
        source=source.replace('</head>','<link rel="stylesheet" href="lesson-comic.css?v=20261110a">\n<script src="comic-data.js?v=20261110a" defer></script><script src="lesson-comic.js?v=20261110a" defer></script>\n</head>',1)
    source=re.sub(r'<section class="lesson-comic" data-lesson-comic="[^"]+">[\s\S]*?</section>','',source)
    block=f'<section class="lesson-comic" data-lesson-comic="{file}"><noscript><img src="assets/comics/{slug}.webp" width="2172" height="724" style="width:100%;height:auto" alt="方片小虎四格知识漫画"><p>四格漫画概括本节知识；详细解释与练习见下方正文。</p></noscript></section>'
    source=source.replace('</aside><!--seo:end-->','</aside><!--seo:end-->'+block,1)
    if file=='zero-3.html':
        source=source.replace('「呃，这个我记不太清，不敢乱说。」——在它读过的几亿本书里，作者们<b>很少这样写</b>，所以这种接法天生就「不像人话」，很难被选中。','「这个我不确定，需要核对来源。」——模型可以这样回答，但是否表达不确定会受到训练、任务与提示方式影响，不能保证每次都可靠。')
        source=source.replace('看明白了吗？它挑的是「<b>哪句更像会出现在这里的话</b>」，不是「哪句是真的」。人类的书面语里，流畅自信的陈述远多于「我不知道」，于是<b>顺口的编造，天然赢过诚实的犹豫</b>。这不是它学坏了，是接话茬这个机制的副作用——行话叫「幻觉」。','这里用「接话茬」帮助理解：<b>生成流畅文字，不等于逐项核实事实</b>。训练目标、评测方式、可用信息等因素都可能影响模型是否猜测或承认不确定。看似可信、实际不准确的生成内容，常被称为「幻觉」。')
        source=source.replace('最关键的一点：<b>它不知道自己不知道</b>。人说谎时心里有数，它没有——在它那里，说对和说错是同一个动作：挑一个像的接上去。所以它也没办法主动提醒你「这句我是编的」。','最关键的一点：<b>不要把模型的自信或自述当成核验依据</b>。它可以表达「我不确定」，也可能自信地回答错误。重要结论仍需查阅原始资料、交叉验证，并由使用者判断。')
        source=source.replace('<li><b>接得像 ≠ 接得对</b>：顺口的编造，天然赢过诚实的犹豫</li>','<li><b>接得像 ≠ 接得对</b>：流畅生成不能替代事实核验</li>')
        source=source.replace('<li><b>它不知道自己不知道</b>：它也没法主动告诉你「这句是编的」</li>','<li><b>可以表达不确定，也可能自信地出错</b>：需要独立检查重要事实</li>')
    page.write_text(source,encoding='utf-8')
print('Installed two local comic samples.')
