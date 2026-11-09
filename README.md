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

现有课件中的技术案例、独立交互和参考文献继续保留，尚未完成逐页内容改写。登录、云端学习进度、证书、正文搜索等原后端功能尚未接入公司服务；当前界面中仍有对应待改造入口，不应视为可用服务。

## 源码来源

当前代码从本地已有版本 `612564f` 继续开发，保留原 Git 历史。课件来源与许可见 `THIRD_PARTY_NOTICES.md` 和 `LICENSE`。公司提供的品牌素材单独管理，不作为原作者素材署名。
