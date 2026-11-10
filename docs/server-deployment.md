# 2026-11-09 自有服务器部署记录

访问地址：<http://111.228.5.133/>，首页重定向到 `/slides/home.html`。

## 运行配置

- 系统：Debian GNU/Linux 12。
- Web 服务：系统软件源安装的 Nginx 1.22.1，`active`，开机启动 `enabled`。
- 监听：TCP 80，IPv4 与 IPv6。
- 站点配置：`/etc/nginx/conf.d/fangpian-xuetang.conf`。
- 发布根目录：`/var/www/fangpian-xuetang/`。
- 当前符号链接：`/var/www/fangpian-xuetang/current`。
- 当前版本：`/var/www/fangpian-xuetang/releases/20261109T091604Z-3507`。
- 首次发布备份记录：`/var/www/fangpian-xuetang/backups/20261109T091604Z-3507`；首次发布没有上一版站点。
- 日志：`/var/log/nginx/fangpian-xuetang.access.log` 与 `/var/log/nginx/fangpian-xuetang.error.log`。

部署的是 `site-app/public/` 中的全部 3294 个文件，源码基线为 `a02bc8de8a84a980fab6affc6b9eba7f603ee2fc`。未使用外层历史课件快照或旧部署包。服务器暂存包中的部署脚本、校验清单和发布元数据已更新为修复就绪检查后的版本，与本地最终包内容一致。

本地最终部署包位于工作区 `outputs/server-deploy/fangpian-xuetang-20261109-171509.tar.gz`，SHA-256：`5c0ba2d22945596410344e728b60919c4f8c6c120ea798fc213a7c5440bb6d57`。

## 验证结果

- 28 项已有测试通过；2544 个 HTML 页面的脚本语法、本地资源引用和遗留内容检查通过。
- 上传包与部署文件的 SHA-256 校验通过，全部静态文件已复制到服务器。
- Nginx 配置检查和本机首页、课程、AITI、DISC、搜索索引检查通过。
- 从本机经公网下载 51 项关键页面、脚本、五语言索引与 16 张 AITI 图片，全部与本地源文件的 SHA-256 一致；其中 33 项使用 gzip 传输。
- `/` 正确跳转到首页；未知路径返回 404；`/.git/config` 返回 403；部署脚本不在公开根目录，返回 404。
- 浏览器自动化访问 IP 时返回 `ERR_BLOCKED_BY_CLIENT`，因此未完成浏览器内交互验收。上述公网 HTTP 下载与服务器检查已完成。

公网验证详情位于工作区 `outputs/server-deploy/public-verification.json`。

## 后续维护

打包、部署和回滚步骤见 [部署说明](../deploy/README.md)。脚本会在 reload 后等待 `/healthz` 返回 `ok`，避免新 worker 尚未就绪时误触发回滚。

当前使用 IP 和 HTTP，没有绑定域名或配置 HTTPS。课程进度、答案和成绩继续保存在访问者浏览器，未增加账号或云端同步服务。SSH 登录方式未修改；密码和私钥不在项目、部署包或文档中保存。
