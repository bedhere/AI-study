from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1] / 'public/slides'
sources = [
    ('4d90ac93-9d21-4461-bc26-0e482f02f64b', 'orange'),
    ('3712bcb0-1be1-4a47-b75b-0684fee238d8', 'yang-yiming'),
    ('da81e116-2af6-4072-a79c-0b7ed062720b', 'nianhun'),
    ('6bc3dcb8-0733-4f96-8f00-101d1fec13c0', 'tingfeng'),
    ('000f2471-f89a-4816-ba34-62c328b1354a', 'xiaoduan'),
    ('640ec157-4e99-41f0-9e60-a3cb289b6bf1', 'lihui'),
    ('5fd82be6-5ecc-4ae9-952a-5a2fbb7e1a81', 'hongye'),
]
for file, name in sources:
    source = Path('C:/Users/12782/AppData/Local/Temp') / f'codex-clipboard-{file}.jpg'
    target = root / f'assets/fangpian/employee-{name}.webp'
    if source.exists():
        image = Image.open(source).convert('RGB')
        image.thumbnail((96, 96))
        image.save(target, 'WEBP', quality=78)
        print(target.name, target.stat().st_size)
    elif not target.exists():
        raise FileNotFoundError(source)
for page in list(root.glob('home*.html')) + list(root.glob('certificate*.html')):
    source = page.read_text(encoding='utf-8')
    if 'employee-feedback.css' not in source:
        source = source.replace('</head>', '<link rel="stylesheet" href="employee-feedback.css?v=20261110a">\n</head>', 1)
    if page.name.startswith('home'):
        if 'employee-feedback-data.js' not in source:
            source = source.replace('</body>', '<script src="employee-feedback-data.js?v=20261110b"></script><script src="employee-feedback.js?v=20261110b"></script></body>')
        if 'employee-feedback-store.js' not in source:
            source = source.replace('<script src="employee-feedback.js', '<script src="employee-feedback-store.js?v=20261110b"></script><script src="employee-feedback.js')
        source = source.replace('employee-feedback.js?v=20261110a', 'employee-feedback.js?v=20261110b').replace('employee-feedback-data.js?v=20261110a', 'employee-feedback-data.js?v=20261110b')
    source = source.replace('employee-feedback.css?v=20261110a', 'employee-feedback.css?v=20261110b')
    page.write_text(source, encoding='utf-8')
