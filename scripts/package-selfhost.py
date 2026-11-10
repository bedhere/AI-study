"""Package the static site for Nginx; never includes the source checkout or keys."""
from datetime import datetime, timedelta, timezone
from pathlib import Path
import hashlib
import io
import json
import subprocess
import sys
import tarfile

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / 'outputs' / 'selfhost'
OUTPUT.mkdir(parents=True, exist_ok=True)
stamp = datetime.now(timezone(timedelta(hours=8)))
archive = OUTPUT / ('fangpian-xuetang-' + stamp.strftime('%Y%m%d-%H%M%S') + '.tar.gz')
files = sorted(p for folder in ('public', 'deploy') for p in (ROOT / folder).rglob('*') if p.is_file())
checksums = []
total = 0
for file in files:
    name = file.relative_to(ROOT).as_posix()
    if file.is_symlink() or file.suffix == '.pem' or file.name.startswith('.env'):
        raise SystemExit('Refusing unexpected sensitive or symlink file: ' + name)
    digest = hashlib.sha256(file.read_bytes()).hexdigest()
    checksums.append(digest + '  ' + name)
    total += file.stat().st_size

commit = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip()
release = {
    'name': 'fangpian-xuetang',
    'createdAt': stamp.isoformat(),
    'sourceCommit': commit,
    'target': '111.228.5.133',
    'sshUser': 'root',
    'hosting': 'nginx-static',
    'files': len(files),
    'uncompressedBytes': total,
    'contentManifestSha256': hashlib.sha256(('\n'.join(checksums) + '\n').encode()).hexdigest(),
}
release_bytes = (json.dumps(release, ensure_ascii=False, indent=2) + '\n').encode('utf-8')
checksums.append(hashlib.sha256(release_bytes).hexdigest() + '  release.json')
sum_bytes = ('\n'.join(checksums) + '\n').encode('utf-8')


def metadata(info):
    info.uid = info.gid = 0
    info.uname = info.gname = 'root'
    info.mode = 0o755 if info.name == 'deploy/deploy.sh' else 0o644
    return info


with tarfile.open(archive, 'x:gz', compresslevel=6, format=tarfile.PAX_FORMAT) as tar:
    for file in files:
        tar.add(file, arcname=file.relative_to(ROOT).as_posix(), recursive=False, filter=metadata)
    for name, content in [('release.json', release_bytes), ('SHA256SUMS', sum_bytes)]:
        info = tarfile.TarInfo(name)
        info.size = len(content)
        info.mtime = int(stamp.timestamp())
        tar.addfile(metadata(info), io.BytesIO(content))

# Read every archived byte back and compare hashes before offering the archive.
expected = dict((row.split('  ', 1)[1], row.split('  ', 1)[0]) for row in checksums)
with tarfile.open(archive, 'r:gz') as tar:
    for member in tar.getmembers():
        if not member.isfile() or member.name == 'SHA256SUMS':
            continue
        actual = hashlib.sha256(tar.extractfile(member).read()).hexdigest()
        if actual != expected.pop(member.name):
            raise SystemExit('Archive checksum mismatch: ' + member.name)
if expected:
    raise SystemExit('Archive files missing: ' + ', '.join(expected))
archive_hash = hashlib.sha256(archive.read_bytes()).hexdigest()
(OUTPUT / (archive.name + '.sha256')).write_text(archive_hash + '  ' + archive.name + '\n', encoding='utf-8')
(OUTPUT / 'release.json').write_bytes(release_bytes)
print(json.dumps({'archive': str(archive), 'bytes': archive.stat().st_size, 'sha256': archive_hash,
                  'verifiedFiles': len(checksums), 'release': release}, ensure_ascii=False, indent=2))
