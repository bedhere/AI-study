"""Download the 16 user-selected reference illustrations from their recorded URLs."""
from pathlib import Path
from urllib.request import build_opener, ProxyHandler, Request
from urllib.parse import urlsplit, urlunsplit, quote
from concurrent.futures import ThreadPoolExecutor
import os, json, hashlib

folder = Path(__file__).resolve().parents[1] / 'public/slides/assets/aiti'
manifest_path = folder / 'manifest.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
proxy = os.environ.get('AITI_ASSET_PROXY', '')

def fetch(item):
    parsed = urlsplit(item['source'])
    if parsed.hostname != 'fangpian-aiti-tigers.jmeng1376.chatgpt.site':
        raise ValueError('Unexpected asset host')
    url = urlunsplit((parsed.scheme, parsed.netloc, quote(parsed.path), parsed.query, ''))
    opener = build_opener(ProxyHandler({'https': proxy, 'http': proxy}) if proxy else ProxyHandler())
    data = opener.open(Request(url, headers={'User-Agent':'Fangpian-asset-import/1.0'}), timeout=30).read()
    if not data.startswith(b'\x89PNG\r\n\x1a\n'):
        raise ValueError('Expected a PNG image')
    (folder / item['file']).write_bytes(data)
    item['bytes'] = len(data)
    item['sha256'] = hashlib.sha256(data).hexdigest()
    return item

with ThreadPoolExecutor(max_workers=4) as pool:
    manifest['assets'] = list(pool.map(fetch, manifest['assets']))
manifest['assets'].sort(key=lambda item: item['id'])
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps({'images':len(manifest['assets']),'bytes':sum(item['bytes'] for item in manifest['assets'])}))
