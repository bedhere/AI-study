# 漫画补全进度（2026-11-12）

本轮新增 **42 篇、168 格**。简体中文目录共 445 篇，累计已接入 **235 篇、940 格**，覆盖率 **52.8%**，剩余 **210 篇**。当前不是全量完成。

| 本轮批次 | 新增篇数 | 分镜、提示词及来源 |
| --- | ---: | --- |
| 工程篇余量 | 7 | [工程 B](comic-complete-engineering-b-20261112.json) |
| Harness 与自我改进 | 9 | [自我改进](comic-complete-self-improvement-20261112.json) |
| Vibe Coding 方法论 | 14 | [Vibe Coding](comic-complete-vibe-coding-20261112.json) |
| 审美工程 | 12 | [审美工程](comic-complete-taste-20261112.json) |

以上四份计划均已 accepted，均记录 generator、date、batchId、commonPrompt、scenePrompt、角色、四格配文、原文哈希和 sourceArtifact。使用内置 image_gen 逐篇生成；未调用付费 API 或 CLI。自我改进的三张局部布局修正保留 previousArtifact 与原始路径。

## 已覆盖篇章

| 篇章 | 已配漫画 | 目录篇数 |
| --- | ---: | ---: |
| 开始之前 | 7 | 7 |
| AI 教我学习：把它当老师用 | 11 | 11 |
| 写给第一次接触 AI 的你 | 42 | 42 |
| 大模型是怎么来的 | 19 | 19 |
| AI Harness | 62 | 62 |
| 实战 · 从 Demo 到产品 | 37 | 37 |
| 进阶 · AI 工程设计模式 | 22 | 22 |
| Harness 与自我改进 | 9 | 9 |
| Vibe Coding 方法论 | 14 | 14 |
| 审美工程：让 AI 做出有品味的东西 | 12 | 12 |

## 剩余篇章

| 篇章 | 尚余 |
| --- | ---: |
| 交互工程：让 AI 做出好用的东西 | 10 |
| AI 产品心理学：让用户觉得好用 | 19 |
| Token 降本增效：AI 应用的成本工程 | 13 |
| 数据结构：AI 世界的骨架 | 13 |
| 算法：AI 的思考方式 | 15 |
| 解剖 Grok Build：Rust 写的生产级 Coding Agent | 25 |
| 解剖 DeepSeek Harness：一切皆插件的 Agent 底座 | 29 |
| 解剖 OpenAI Codex：把安全观写进类型系统 | 32 |
| 开源、蒸馏与本地部署 | 9 |
| 七套篇章自测 · 350 道题 | 9 |
| 一人公司 OPC | 16 |
| 被搜到：SEO 与 GEO | 6 |
| 雷军创业课 | 14 |

下一批按目录为“交互工程：让 AI 做出好用的东西”10 篇。应读取实际 HTML 后编写分镜；不要重做已接入的 235 篇。完整逐篇差集见 [机器进度记录](../reports/comic-progress-20261112.json) 的 remainingChapters。运行时快照同步保存到 outputs/comic-complete/remaining-20261112.json。

## 文件保存与接入

- 网站实际资源：public/slides/assets/comics/，共 1175 个 WebP（235 张整图、940 张分格）。
- 原始最终 PNG 位于 outputs/comic-originals/ 下四个目录：20261112-complete-engineering-b、20261112-complete-self-improvement、20261112-complete-vibe-coding、20261112-complete-taste。
- 工具返回图及保留的修正前图：outputs/comic-generated/<batchId>/；每份计划还记录真实 generationSourcePath。
- 沿用 scripts/integrate-comic-batch.py；分格 543×724、整图 2172×724，缓存版本保持 20261111complete。
- 漫画插在真实摘要之后；现有组件、原文、互动、导航、学习进度及首页挂件均保留。
- 旧工程待办计划已标记 superseded，未重复 accepted 或重复计数。

## 验证与证据

- npm test：99/99 通过。见 [测试记录](../reports/comic-235-tests-20261112.log)。
- npm run verify:content：2548 个 HTML、96 个 JS、2235 段内联脚本，无新增或现有错误。见 [内容记录](../reports/comic-235-content-20261112.log)。
- npm run check:resources：无缺失引用。见 [资源记录](../reports/comic-235-resources-20261112.log)。
- npm run check:cleanup：无遗留问题。见 [清理记录](../reports/comic-235-cleanup-20261112.log)。
- 全部 1175 个 WebP 已解码并核对尺寸；单篇四格最大 201.7 KiB，均低于 250 KiB。
- 对照基线 b7dee1875f12de989c9132ddad5795a3729c1b5d，本轮 42 篇去除漫画插入和旧封面后原文一致（忽略空白）；原 193 篇 manifest provenance 完全一致。
- 浏览器抽查 10-16 的桌面四列及逐格讲解；11-7 在 390×844 阅读器内为两列，四张图均加载完成。
- 可恢复审计脚本：outputs/comic-complete/audit_20261112.py；结果保存至上述机器进度记录。

## 发布边界

本轮生成并接入本地仓库，沿用此前授权提交和推送 main。本轮未执行服务器部署；线上仍是已发布的 193 篇版本，见 [已有部署记录](server-comics-193-20261111.md)。本地 235 篇与线上 193 篇应分别统计。
