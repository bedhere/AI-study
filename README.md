# 方片新媒体 · 方片学堂

基于现有交互课件改造的公司学习平台。本仓库包含本地开发源码和课件，不需要连接原站才能启动页面。

## 本地开发

需要 Node.js 22.13 或以上版本。

```powershell
npm ci
npm run dev
```

打开终端打印的本地地址，通常是 `http://localhost:3000/`。

```powershell
npm run build
npm run verify:content
npm run check:cleanup
npm run check:resources
npm test
```

`check:cleanup` 使用 Python 3 标准库，无需安装 Python 依赖。

## 目录与维护规则

- `public/slides/` 是唯一维护的课件目录，也是应用实际提供的内容。
- `app/` 是应用入口，首页跳转到 `/slides/home.html`。
- `public/slides/assets/fangpian/` 保存公司提供的 Logo 和老虎素材。
- `scripts/cleanup_legacy.py` 提供可重复执行的内容清理和检查。
- `reports/legacy-cleanup.json` 保存页面清单；`docs/phase-1-cleanup.md` 记录本批范围与验收结果。
- `docs/planning/` 保存开发需求表。

工作区外层 `learn-ai-main/slides/` 是历史参考快照，不参与构建，也不再由清理脚本写入。不要从该快照覆盖已改造的 `public/slides/`。

## 首批清理范围

已移除五种语言首页的大厂岗位 JD 入口、原站产品推广、旧评价、赞助/捐赠模块、动态广告与旧埋点加载。旧站 SEO 域名、外部品牌图和未经核实的公司资质信息已清理。

旧助教、伴学与广告脚本保留为空兼容文件，防止缓存页面继续执行原站业务。方片助教与公司账号接入在后续阶段实施。

现有课件中的技术案例、独立交互和参考文献继续保留，尚未完成逐页内容改写。

## 本地学习版本

五种语言的主课程现在可以直接阅读、标记已学会、撤销标记和继续上次学习。进度保存在当前浏览器，同源标签页之间自动更新；更换浏览器或清理浏览器数据不会保留记录。无法使用本地存储时会明确提示，不会模拟已登录状态。

课程搜索同时匹配标题与正文，包括课件脚本中的动态教学文字。正文索引按语言在首次搜索时加载，支持加载提示、无结果提示和失败重试。`predev`、`prebuild` 与 `pretest` 自动生成索引；修改课件后可运行 `npm run build:search` 单独刷新。

练习与自测继续可用，最近 50 次成绩保存在本浏览器。账号、云端同步、证书签发、社区投稿和问题反馈尚未接入公司服务；旧入口已移除或改为准备中说明。缺少原始素材的爸妈版不纳入本期开放课程。详情见 `docs/phase-2-local-learning.md`。

`verify:content` 检查所有课件脚本语法，任何错误均会失败。原版记录的 25 处英文、韩文错误已全部修复。`check:resources` 检查 HTML 与 CSS 的静态本地资源引用，不包含远程链接可用性检测。

## 方片 AITI 与 DISC

首页原 JD 位置现在进入 `/slides/aiti.html`。方片 AITI 使用项目方提供的 16 道正式题目，分别观察 AI认可度 A、AI使用度 U、AI了解度 K、正向价值度 V；匹配 16 种方片AI人格，并生成含插画、四维雷达图、关键词、宣言、解读与成长建议的完整 PNG 人格卡。支持本机续答、修改答案、重测、人格图鉴和揭晓动画。

图片按用户确认沿用参考站的 16 张原图与配色，保存在本地，不依赖参考站在线提供图片。DISC 保留在 `/slides/disc.html`；旧 `/slides/personality.html` 自动引导到对应新入口。AITI 不复用旧版 32 题 MBTI 答案，DISC 原记录保持独立。

当前测试与报告为中文，五语言首页都有入口。AITI 是趣味自我观察体验，不用于能力、品德或绩效评价；答案不上传公司后台。题目、计分、角色映射和素材来源见 [AITI 开发说明](docs/aiti-development.md)。[旧版测试记录](docs/personality-tests.md)保留用于追溯。

## 源码来源

自有服务器的静态 Nginx 部署与打包方法见 [服务器部署说明](deploy/README.md)，本次发布信息见 [部署记录](docs/server-deployment.md)。

当前代码从本地已有版本 `612564f` 继续开发，保留原 Git 历史。课件来源与许可见 `THIRD_PARTY_NOTICES.md` 和 `LICENSE`。公司提供的品牌素材单独管理，不作为原作者素材署名。
