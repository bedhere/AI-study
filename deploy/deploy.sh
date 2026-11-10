#!/usr/bin/env bash
set -Eeuo pipefail

# Run as root after inspecting existing listeners and Nginx virtual hosts.
if [[ ${EUID} -ne 0 ]]; then
    echo 'Run with sudo bash deploy/deploy.sh or as root.' >&2
    exit 1
fi

bundle=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
base=/var/www/fangpian-xuetang
config=/etc/nginx/conf.d/fangpian-xuetang.conf
release_id=$(date -u +%Y%m%dT%H%M%SZ)-$$
release=$base/releases/$release_id
backup=$base/backups/$release_id

[[ -f "$bundle/SHA256SUMS" ]]
[[ -f "$bundle/public/slides/home.html" ]]
[[ -f "$bundle/public/slides/aiti.html" ]]
[[ -f "$bundle/public/slides/search-index.zh.json" ]]
(cd "$bundle" && sha256sum --check --quiet SHA256SUMS)

if ! command -v nginx >/dev/null; then
    if ! command -v apt-get >/dev/null; then
        echo 'Install Nginx using the server package manager, then retry.' >&2
        exit 1
    fi
    apt-get update
    DEBIAN_FRONTEND=noninteractive apt-get install -y nginx
fi
command -v curl >/dev/null
nginx -t

# Do not replace a manually managed directory with the release symlink.
if [[ -e "$base/current" && ! -L "$base/current" ]]; then
    echo "$base/current exists and is not a symlink; inspect it first." >&2
    exit 1
fi
previous=$(readlink "$base/current" || true)
had_config=false
mkdir -p "$release" "$backup"
if [[ -f "$config" ]]; then
    cp -p "$config" "$backup/nginx.conf"
    had_config=true
fi
printf '%s\n' "$previous" > "$backup/previous-release.txt"
cp -a "$bundle/public" "$release/public"
cp "$bundle/release.json" "$release/release.json"
find "$release" -type d -exec chmod 755 {} +
find "$release" -type f -exec chmod 644 {} +

rollback() {
    trap - ERR
    if [[ -n "$previous" ]]; then
        ln -s "$previous" "$base/current.rollback-$release_id"
        mv -Tf "$base/current.rollback-$release_id" "$base/current"
    else
        unlink "$base/current" || true
    fi
    if $had_config; then
        cp -p "$backup/nginx.conf" "$config"
    else
        rm -f -- "$config"
    fi
    nginx -t && systemctl reload nginx || true
    echo "Deployment failed; previous configuration restored. Release retained at $release" >&2
    exit 1
}
trap rollback ERR

ln -s "$release" "$base/current.new-$release_id"
mv -Tf "$base/current.new-$release_id" "$base/current"
install -m 644 "$bundle/deploy/nginx.conf" "$config"
nginx -t
systemctl enable --now nginx
systemctl reload nginx

# Reload returns before the new workers start accepting requests.
ready=false
for attempt in {1..40}; do
    if [[ $(curl --noproxy '*' -fsS -H 'Host: 111.228.5.133' http://127.0.0.1/healthz 2>/dev/null) == ok ]]; then
        ready=true
        break
    fi
    sleep 0.25
done
if ! $ready; then
    echo 'Nginx did not become ready within 10 seconds.' >&2
    false
fi

for path in /slides/home.html /slides/learn.html /slides/aiti.html /slides/certificate.html \
    /slides/local-learning.js /slides/certificate-data.js /slides/certificate-art.js \
    /slides/academy-brand.css /slides/academy-knowledge.html /slides/academy-practice.html /slides/academy-review.html \
    /slides/employee-feedback.js /slides/employee-feedback-store.js /slides/employee-feedback-data.js /slides/employee-feedback.css \
    /slides/learn-3.html /slides/zero-3.html /slides/comic-data.js /slides/lesson-comic.js /slides/lesson-comic.css \
    /slides/assets/comics/personal-explanation-1.webp /slides/assets/comics/verify-ai-1.webp /slides/external-platform-policy.js \
    /slides/assets/fangpian/employee-xiaoduan.webp /slides/search-index.zh.json; do
    code=$(curl --noproxy '*' -sS -o /dev/null -w '%{http_code}' -H 'Host: 111.228.5.133' "http://127.0.0.1$path")
    if [[ "$code" != 200 ]]; then
        echo "Health check failed: $path returned $code" >&2
        false
    fi
done
[[ $(curl --noproxy '*' -sS -o /dev/null -w '%{http_code}' -H 'Host: 111.228.5.133' http://127.0.0.1/) == 302 ]]
[[ $(curl --noproxy '*' -sS -o /dev/null -w '%{http_code}' -H 'Host: 111.228.5.133' http://127.0.0.1/missing-fangpian-file) == 404 ]]
trap - ERR
printf 'Deployed: http://111.228.5.133/\nRelease: %s\nPrevious: %s\nBackup: %s\n' "$release" "${previous:-none}" "$backup"
