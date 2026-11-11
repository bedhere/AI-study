# 193 篇漫画发布记录（2026-11-11）

入口：[方片 AI 学堂](https://111.228.5.133/slides/home.html)。示例：[Session 与上下文窗口漫画](https://111.228.5.133/slides/learn.html#10-14.html)。

已上线 **193 篇独立四格漫画、772 格**，覆盖简体中文目录 445 篇的 **43.4%**，尚有 252 篇未配漫画。统计按已接入页面的独立故事计算，不将完整条漫、分格文件或重画版本重复计数。篇章分布与来源记录见 [漫画统计](comic-complete-progress-20261111.md)。

## 本次发布

- 静态内容提交：`87e81de42d88eae2917687a5d65fbfe383470dc3`，已推送 main。
- 当前 release：`/var/www/fangpian-xuetang/releases/20261111T095148Z-222278`。
- 上一版：`/var/www/fangpian-xuetang/releases/20261110T151015Z-137981`。
- 配置与回退记录：`/var/www/fangpian-xuetang/backups/20261111T095148Z-222278`。
- 上传包：`outputs/selfhost/comics-193-20261111/fangpian-xuetang-20261111-174701.tar.gz`，256,098,528 字节。
- SHA-256：`4f959aa14d9fb0167cf10acb54c7a9eaa8ac82e6521c7e7dd348568e2d7dd04d`。
- 上传暂存目录：`/var/tmp/fangpian-comics-193-20261111T094854Z`。

打包包含网站 public、部署文件、release.json 与 SHA256SUMS。共 4304 个校验项，上传前完整回读验证；服务器再次验证压缩包及所有文件，发布后的 4300 个 public 文件与清单全部一致。部署采用新目录和原子 current 链接切换，旧 release 未删除。

## HTTP 与 HTTPS

原 HTTP 学堂配置增加过其他应用的 ACME 路由，因此本次使用 `PRESERVE_NGINX_CONFIG=1` 保留原配置；HTTP 学堂和会议应用配置的 SHA-256 未改变。

浏览器验收发现，HTTP 请求会被浏览器自动升级到 HTTPS，而该 IP 的 443 根路由属于另一应用。现仅在它的 HTTPS server 块增加一个片段 include，为 `/slides/` 提供学堂静态文件，原根路由和代理配置保留。片段设置 `X-Frame-Options: SAMEORIGIN`，确保课程阅读器可嵌入同源课件。

- 源片段：`deploy/nginx-slides.conf`。
- 服务器片段：`/etc/nginx/snippets/fangpian-xuetang-slides.conf`。
- HTTPS 原配置备份：`/var/www/fangpian-xuetang/backups/https-slides-20261111T095515Z.conf`。
- `nginx -t` 通过，Nginx active。
- HTTPS 根路径仍由原应用处理；学堂应使用上方 `/slides/home.html` 入口。

## 验证

- 99 项自动测试全部通过，内容与资源检查通过。
- 全部 772 张分格图正常解码；原文与旧漫画记录保持一致。
- 公网 HTTP、HTTPS 各下载 53 项代表页面、脚本、索引和漫画图片，与本地 SHA-256 一致；HTTPS 使用正常证书校验。
- HTTP 首页重定向、healthz、404、隐藏路径和部署脚本不可公开访问等检查通过。
- Edge 实际打开 HTTPS 漫画：四格全部加载，桌面四列、无横向溢出，逐格播放与暂停有效。
- 课程阅读器中的内嵌课件正常，目录加载 445 节，控制台无警告或错误。

详细记录：`reports/comic-deploy-193-inventory.json`、`comic-deploy-193-public-verification.json`、`comic-deploy-193-https-verification.json`、`comic-deploy-193-tests.tap`。

## 回退

静态内容可按 `deploy/README.md` 将 current 切回上一版并 reload；HTTPS 路由单独回退时，恢复上面的 HTTPS 原配置备份，执行 `nginx -t` 后 reload。无需删除现有 release。登录凭证未写入项目、日志或部署包。
