# 全课程漫画进度（2026-11-11）

目标：补齐简体中文课程目录的 445 个条目，再统一上传现有服务器。当前工作继续进行，尚未完成全量上线。

当前已接入 **141 / 445 篇**，剩余 **304 篇**。此前 62 篇保持完整；本轮新增 79 篇、316 张分格图。

已完成批次：

- `comic-complete-opening-20261111.json`：17 篇，开篇、学习路线、模型基础及回顾实操。
- `comic-complete-harness-a-20261111.json`：18 篇，上下文、提示词、注入防护及工具调用。
- `comic-complete-harness-b-20261111.json`：22 篇，MCP、记忆、向量库、Skill、护栏和可观测性。
- `comic-complete-harness-c-20261111.json`：22 篇，成本、模型选型、使用方法和本章收官。

每份 JSON 记录逐篇脚本、角色、四格配文、替代文本、原始页面摘要及最终出图文件。原始 PNG 保存在 `outputs/comic-originals/<batchId>/`，网站使用 `public/slides/assets/comics/` 内的 WebP。图片在页面中本地加载，配文由 HTML 呈现。

继续工作的顺序：动手实战 37 篇 → 工程设计模式 22 篇 → 自我改进 9 篇 → 其余独立专题、源码解析、自测和课后甜点。完整未覆盖清单及原文提取保存在 `outputs/comic-complete/remaining.json`、`source-texts.json`；后者是本轮开始时的 383 篇清单，前 79 篇现已完成。

## 已完成的验证

- 99 项自动测试通过。
- 内容校验：2548 个 HTML、96 个 JavaScript、2235 段内联脚本，新增错误 0。
- 对照提交 `2aa7dd0`：79 篇正文在去除新增漫画标签与原通用封面后完全一致；原有 62 条资源记录未变化。
- 新增 316 张分格图全部解码为 543 × 724，每篇四格资源总量低于 250 KiB。
- 浏览器抽查学习路线与复盘页：桌面四列、390 px 手机两列，无横向溢出，图片正常加载，复盘表单仍保留必填校验，控制台无警告或错误。
- 导入规则已区分“示例说明”与真正的摘要栏；5 个受影响页面已移动至摘要之后。无摘要栏的开篇页面明确使用首个 header 之后作为插入点。

预览：[学习路线漫画](screenshots/comics-complete/opening-roadmap.png)。机器记录：`reports/comic-complete-checkpoint-141.json`、`reports/comic-complete-tests.tap`。

## 部署状态

已按用户指示从原部署聊天找到登录信息，并成功验证 `root@111.228.5.133:22` 的密码登录。Nginx 正常运行；当前线上 release 为 `/var/www/fangpian-xuetang/releases/20261110T151015Z-137981`。

凭证未写入项目文件。待所有剩余条目完成后，使用现有自托管打包与原子发布流程上线，保留旧 release 供回退，并核验线上资源与代表页面。
