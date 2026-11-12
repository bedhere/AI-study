"""Import an explicitly reviewed batch without replacing existing comic originals.

Usage: python scripts/integrate-comic-batch.py --generated-dir PATH
The source plan records every final artifact, script, role and generation prompt.
"""
import argparse
import hashlib
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import shutil
import subprocess
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--plan', default='docs/comic-rollout-20261111.json')
parser.add_argument('--generated-dir', required=True, type=Path)
args = parser.parse_args()
plan = json.loads((ROOT / args.plan).read_text(encoding='utf-8'))
lessons = plan['lessons']
slides = ROOT / 'public/slides'
target = slides / 'assets/comics'
originals = ROOT / 'outputs/comic-originals' / plan.get('batchId', plan['date'].replace('-', ''))
version = plan.get('cacheVersion', '20261111batch1')
manifest_path = target / 'manifest.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
data_path = slides / 'comic-data.js'
result = subprocess.run(['node', '--input-type=module', '-e',
    "import fs from 'node:fs';import vm from 'node:vm';const c={window:{}};"
    "vm.runInNewContext(fs.readFileSync('public/slides/comic-data.js','utf8'),c);"
    "console.log(JSON.stringify(c.window.AcademyComics));"],
    cwd=ROOT, check=True, capture_output=True, encoding='utf-8')
stories = json.loads(result.stdout)
assert len({x['file'] for x in lessons}) == len(lessons), 'Duplicate lesson keys'
assert len({x['slug'] for x in lessons}) == len(lessons), 'Duplicate slugs'

def summary_end(page, anchor=None):
    """Find the end of either summary format, preserving source bytes outside insertion."""
    class Summary(HTMLParser):
        def __init__(self):
            super().__init__(); self.tag = None; self.depth = 0; self.end = None
            self.lines = [0]
            self.lines.extend(m.end() for m in re.finditer('\n', page))
        def handle_starttag(self, tag, attrs):
            classes = dict(attrs).get('class', '').split()
            if self.end is not None: return
            matches = tag == 'header' if anchor == 'first-header-end' else (
                ('xa-tldr' in classes and not {'company-example-note', 'company-source-case'}.intersection(classes)) or 'qa-answer' in classes)
            if self.tag is None and matches:
                self.tag = tag; self.depth = 1
            elif tag == self.tag: self.depth += 1
        def handle_endtag(self, tag):
            if tag != self.tag or self.end is not None: return
            self.depth -= 1
            if self.depth == 0:
                line, col = self.getpos()
                self.end = page.index('>', self.lines[line - 1] + col) + 1
                # Keep comics outside the generated summary so a later SEO pass preserves them.
                closing_marker = re.match(r'\s*<!--seo:end-->', page[self.end:])
                if closing_marker:
                    self.end += closing_marker.end()
    assert anchor in (None, 'first-header-end'), 'Unsupported insertion anchor'
    parser = Summary(); parser.feed(page)
    assert parser.end is not None, 'No supported summary insertion anchor'
    return parser.end

# Check all inputs before making changes. Never import the historical slides tree.
for story in lessons:
    assert re.fullmatch(r'[a-zA-Z0-9][a-zA-Z0-9-]*\.html', story['file'])
    assert re.fullmatch(r'[a-z-]+', story['slug'])
    assert len(story['panels']) == 4
    for panel in story['panels']:
        assert all(panel.get(k) for k in ('label', 'text', 'alt'))
    source = args.generated_dir / story['sourceArtifact']
    with Image.open(source) as im:
        im.load()
        assert 2.9 < im.width / im.height < 3.1, source
    original = originals / (story['slug'] + '.png')
    if original.exists():
        assert original.read_bytes() == source.read_bytes(), 'Refusing to overwrite original'
    page = (slides / story['file']).read_text(encoding='utf-8')
    summary_end(page, story.get('insertionAnchor'))
    if story.get('originalHtmlSha256') and story['file'] not in stories:
        assert hashlib.sha256((slides / story['file']).read_bytes()).hexdigest() == story['originalHtmlSha256'], 'Lesson changed since storyboard review: ' + story['file']
    assert story['file'] not in stories or stories[story['file']]['slug'] == story['slug'], 'Refusing to replace an unrelated story'

originals.mkdir(parents=True, exist_ok=True)
for story in lessons:
    slug, file = story['slug'], story['file']
    source = args.generated_dir / story['sourceArtifact']
    original = originals / (slug + '.png')
    if not original.exists():
        shutil.copy2(source, original)
    with Image.open(source) as im:
        # Normalize the near-identical 3:1 outputs to existing component dimensions.
        image = im.convert('RGB').resize((2172, 724), Image.Resampling.LANCZOS)
        image.save(target / (slug + '.webp'), 'WEBP', quality=82, method=6)
        for index in range(4):
            image.crop((543 * index, 0, 543 * (index + 1), 724)).save(
                target / f'{slug}-{index + 1}.webp', 'WEBP', quality=82, method=6)
    record = {
        'slug': slug, 'lesson': file,
        'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
        'original': original.relative_to(ROOT).as_posix(),
        'width': 2172, 'height': 724, 'panelCount': 4,
        'panelBytes': sum((target / f'{slug}-{i}.webp').stat().st_size for i in range(1, 5)),
        'fullBytes': (target / (slug + '.webp')).stat().st_size,
        'textMode': 'HTML captions; no embedded text', 'batch': plan.get('batchId', plan['date'])
    }
    assert record['panelBytes'] < 250 * 1024, f'{slug}: over asset budget'
    manifest['assets'] = [x for x in manifest['assets'] if x['slug'] != slug] + [record]
    stories[file] = {key: story[key] for key in ('slug', 'title', 'takeaway', 'panels')}
    page_path = slides / file
    page = page_path.read_text(encoding='utf-8')
    page = re.sub(r'<div class="academy-cover"[^>]*>[\s\S]*?</svg></div>', '', page, count=1)
    if 'lesson-comic.css' not in page:
        page = page.replace('</head>', '<link rel="stylesheet" href="lesson-comic.css?v=20261110a">\n'
            f'<script src="comic-data.js?v={version}" defer></script>'
            '<script src="lesson-comic.js?v=20261110a" defer></script>\n</head>', 1)
    page = re.sub(r'<section class="lesson-comic" data-lesson-comic="[^"]+">[\s\S]*?</section>', '', page)
    captions = ''.join('<li><b>' + html.escape(p['label']) + '</b>：' + html.escape(p['text']) + '</li>'
                       for p in story['panels'])
    block = (f'<section class="lesson-comic" data-lesson-comic="{file}"><noscript>'
             f'<h2>{html.escape(story["title"])}</h2>'
             f'<img src="assets/comics/{slug}.webp" width="2172" height="724" loading="lazy" '
             f'style="width:100%;height:auto" alt="{html.escape(story["title"])}">'
             f'<ol>{captions}</ol><p>{html.escape(story["takeaway"])}</p></noscript></section>')
    anchor = summary_end(page, story.get('insertionAnchor'))
    page = page[:anchor] + block + page[anchor:]
    if story.get('layoutCss') and 'id="comic-layout-fix"' not in page:
        page = page.replace('</head>', '<style id="comic-layout-fix">' + story['layoutCss'] + '</style>\n</head>', 1)
    page_path.write_text(page, encoding='utf-8')

# Update the shared data URL on both retained samples too, keeping old story data intact.
for file in stories:
    page_path = slides / file
    page = page_path.read_text(encoding='utf-8')
    page = re.sub(r'comic-data\.js\?v=[^"\s]+', 'comic-data.js?v=' + version, page)
    page_path.write_text(page, encoding='utf-8')
data_path.write_text('/* Story keys are lesson filenames. Scripts and art provenance: docs/comic-*.json. */\n'
                    + 'window.AcademyComics=' + json.dumps(stories, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'added': len(lessons), 'totalStories': len(stories), 'newPanels': len(lessons) * 4,
                  'panelKiB': {x['slug']: round(x['panelBytes'] / 1024, 1) for x in manifest['assets']}}, ensure_ascii=False))
