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

## 方片虎格测试

首页原 JD 卡片位置已替换为 `/slides/personality.html`：32 题 MBTI 风格探索与 24 题 DISC 协作风格。结果包含品牌老虎形象、维度分布、协作建议和可下载的 PNG 虎格卡，支持本机续答和重测。测试是独立设计的自我探索体验版，非官方测评。五语言首页均有入口，当前题目与报告为中文。

题目、计分方法、素材映射与验证范围见 [测试开发说明](docs/personality-tests.md)。

## 源码来源

当前代码从本地已有版本 `612564f` 继续开发，保留原 Git 历史。课件来源与许可见 `THIRD_PARTY_NOTICES.md` 和 `LICENSE`。公司提供的品牌素材单独管理，不作为原作者素材署名。
