"""Import an explicitly reviewed batch without replacing existing comic originals.

Usage: python scripts/integrate-comic-batch.py --generated-dir PATH
The source plan records every final artifact, script, role and generation prompt.
"""
import argparse
import hashlib
import html
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
originals = ROOT / 'outputs/comic-originals' / plan['date'].replace('-', '')
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

# Check all inputs before making changes. Never import the historical slides tree.
for story in lessons:
    assert re.fullmatch(r'learn-\d+\.html', story['file'])
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
    assert page.count('</aside><!--seo:end-->') == 1, story['file']

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
        'textMode': 'HTML captions; no embedded text', 'batch': plan['date']
    }
    assert record['panelBytes'] < 250 * 1024, f'{slug}: over asset budget'
    manifest['assets'] = [x for x in manifest['assets'] if x['slug'] != slug] + [record]
    stories[file] = {key: story[key] for key in ('slug', 'title', 'takeaway', 'panels')}
    page_path = slides / file
    page = page_path.read_text(encoding='utf-8')
    page = re.sub(r'<div class="academy-cover"[^>]*>[\s\S]*?</svg></div>', '', page, count=1)
    if 'lesson-comic.css' not in page:
        page = page.replace('</head>', '<link rel="stylesheet" href="lesson-comic.css?v=20261110a">\n'
            '<script src="comic-data.js?v=20261111batch1" defer></script>'
            '<script src="lesson-comic.js?v=20261110a" defer></script>\n</head>', 1)
    page = re.sub(r'<section class="lesson-comic" data-lesson-comic="[^"]+">[\s\S]*?</section>', '', page)
    captions = ''.join('<li><b>' + html.escape(p['label']) + '</b>：' + html.escape(p['text']) + '</li>'
                       for p in story['panels'])
    block = (f'<section class="lesson-comic" data-lesson-comic="{file}"><noscript>'
             f'<h2>{html.escape(story["title"])}</h2>'
             f'<img src="assets/comics/{slug}.webp" width="2172" height="724" loading="lazy" '
             f'style="width:100%;height:auto" alt="{html.escape(story["title"])}">'
             f'<ol>{captions}</ol><p>{html.escape(story["takeaway"])}</p></noscript></section>')
    page = page.replace('</aside><!--seo:end-->', '</aside><!--seo:end-->' + block, 1)
    page_path.write_text(page, encoding='utf-8')

# Update the shared data URL on both retained samples too, keeping old story data intact.
for file in stories:
    page_path = slides / file
    page = page_path.read_text(encoding='utf-8')
    page = re.sub(r'comic-data\.js\?v=[^"\s]+', 'comic-data.js?v=20261111batch1', page)
    page_path.write_text(page, encoding='utf-8')
data_path.write_text('/* Story keys are lesson filenames. Scripts and art provenance: docs/comic-rollout-20261111.json. */\n'
                    + 'window.AcademyComics=' + json.dumps(stories, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'added': len(lessons), 'totalStories': len(stories), 'newPanels': len(lessons) * 4,
                  'panelKiB': {x['slug']: round(x['panelBytes'] / 1024, 1) for x in manifest['assets']}}, ensure_ascii=False))
