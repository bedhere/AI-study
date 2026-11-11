# 自有服务器部署

目标服务器：`111.228.5.133`，SSH 账号：`root`，默认端口：`22`。

当前应用的 `app/page.tsx` 只负责跳转到 `/slides/home.html`，实际页面和交互均位于 `public/`。自有服务器使用 Nginx 提供相同路径，不需要 Node.js、Wrangler 或 Cloudflare 运行环境。部署只使用 `site-app/public/`，不使用外层历史 `slides/` 或旧部署包。

## 部署包

部署包包含 `public/`、`deploy/`、`release.json` 和 `SHA256SUMS`。不包含 SSH 私钥、`.git/`、`.env*`、`node_modules/` 和历史课件快照。

打包前执行：

```powershell
npm test
npm run verify:content
npm run check:cleanup
npm run check:resources
python scripts/package-selfhost.py
```

`npm test` 的 pretest 会更新五种语言的搜索索引，索引也必须随部署包上传。
打包脚本默认输出到项目内的 `outputs/selfhost/`，也可将自定义输出目录作为第一个参数。脚本会重新读取压缩包逐项核对 SHA-256，并在包旁生成整个压缩包的校验文件。

## 服务器操作

先检查现有服务，确认 80 端口没有非 Nginx 服务占用，且其他 Nginx 配置未使用相同的 `server_name 111.228.5.133`。保留服务器上的其他站点。首次安装 Nginx 时，脚本支持 Debian/Ubuntu 的 apt；其他发行版应先安装 Nginx。服务器还需要 Bash、curl、sha256sum、systemd。

上传并解包到一个新的暂存目录，然后从解包目录执行：

```bash
bash deploy/deploy.sh
```

已有站点只更新静态内容、需要保留服务器上现有路由时，使用 `PRESERVE_NGINX_CONFIG=1 bash deploy/deploy.sh`。此模式要求现有项目 Nginx 配置文件存在，仍会备份配置、核验 Nginx 和 HTTP 健康检查；不覆盖服务器中追加的 ACME 等路由。

脚本会验证文件 SHA-256，将静态文件复制到 `/var/www/fangpian-xuetang/releases/` 下的新版本目录，通过 `current` 符号链接切换版本，写入单独的 `/etc/nginx/conf.d/fangpian-xuetang.conf`，验证配置、启用 Nginx 开机启动并执行本机 HTTP 检查。切换后的配置或 HTTP 检查失败会恢复原来的符号链接和站点配置。旧版本和配置备份不会自动删除。

本机检查通过后，还须从外部访问首页、课程、搜索索引和 AITI 图片，并验证浏览器中的课程阅读、搜索、学习进度与测试入口。若本机正常而外网不通，应检查云安全组和主机防火墙的 TCP 80 入站规则。

只配置 IP 时，访问地址为 `http://111.228.5.133/`。后续绑定域名后再配置对应 HTTPS 证书。当前答案、成绩与进度保存在浏览器；不同域名、IP 或 HTTP/HTTPS 地址各自保存记录。

## 手动回滚

每次运行会打印上一版路径和备份目录；备份中的 `previous-release.txt` 也保存上一版路径。将 `current` 符号链接切回该路径，恢复同一备份目录中的 `nginx.conf`，执行 `nginx -t` 后 reload。首次部署没有上一版本时，移除本项目的站点配置即可撤销站点。


## 同 IP 的 HTTPS 路由

当同一 IP 的 443 端口由其他应用使用时，浏览器可能自动将 HTTP 升级为 HTTPS。可将 `deploy/nginx-slides.conf` 复制到 `/etc/nginx/snippets/fangpian-xuetang-slides.conf`，仅在该 IP 的 HTTPS server 块内 include 此文件，再执行 `nginx -t` 和 reload。此配置仅接管 `/slides/`，保留其他应用的根路由，学堂入口使用 `https://111.228.5.133/slides/home.html`。

片段为课件设置 SAMEORIGIN，保证同源课程阅读器可以嵌入课件；不会沿用其他应用可能设置的 X-Frame-Options DENY。修改前应备份现有配置，首次请求失败时回退并重新检查配置。
