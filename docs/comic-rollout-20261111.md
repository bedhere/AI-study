# 十篇知识点漫画 · 2026-11-11

本轮已在实际维护源 `public/slides/` 新增十篇简中四格漫画，保留 `learn-3.html` 与 `zero-3.html` 两篇原型，共十二篇。仅覆盖这批课程，不代表全站或全部语言完成漫画化。开发服务沿用 `http://localhost:3000/`，未重启。

## 阅读入口与角色

| 知识点 | 小虎角色 | 四格行动 | 本地阅读器 |
| --- | --- | --- | --- |
| 建议适合我吗 | 橙色运动外套通勤虎 | 暂缓付款、补约束、逐条对照、核实再决定 | [learn-1](http://localhost:3000/slides/learn.html#learn-1.html) |
| 下一步问什么 | 绿马甲行政虎、厨师虎 | 看菜单、找未知、问同事、找餐厅核实 | [learn-2](http://localhost:3000/slides/learn.html#learn-2.html) |
| 用熟悉的东西打比方 | 青色头盔配送虎 | 说疑问、选配送经验、逐项映射、保留边界 | [learn-4](http://localhost:3000/slides/learn.html#learn-4.html) |
| 一次只问一个 | 紫色连帽衫学生虎 | 面对整段解释、只留一题、独立作答、提示再试 | [learn-5](http://localhost:3000/slides/learn.html#learn-5.html) |
| 五类易编错信息 | 白实验服研究员虎 | 看具体答复、圈五类、列后果核法、查手册留空缺 | [learn-6](http://localhost:3000/slides/learn.html#learn-6.html) |
| 三道检查 | 深蓝工装程序员虎 | 要原句、找不一致、分开推测、亲自读来源 | [learn-7](http://localhost:3000/slides/learn.html#learn-7.html) |
| 要不要查原文 | 贝雷帽创作者虎 | 区分计算与规则、看后果、缩小清单、查协议 | [learn-8](http://localhost:3000/slides/learn.html#learn-8.html) |
| 拆开难懂条款 | 米色开衫老师虎、绿背带裤学员虎 | 画地图、找卡词、一次补一个、回原文复述 | [learn-9](http://localhost:3000/slides/learn.html#learn-9.html) |
| 先懂哪五个概念 | 蓝头带跑者虎 | 说阅读目标、先看结构、自测概念、只补缺口 | [learn-10](http://localhost:3000/slides/learn.html#learn-10.html) |
| 只根据原文回答 | 青围裙陶艺虎 | 比较转述、贴全原文、找丢失条件、缺失就待确认 | [learn-11](http://localhost:3000/slides/learn.html#learn-11.html) |

## 内容与素材

已批量读取十篇完整教学内容，再统一编写分镜和审校。保留原文的知识边界：自查与重复一致不能保证正确；风险标注不能保证找全，也不表示圈出的都错；来源名称需要实际打开核对；比喻不能照搬所有细节；原文未说明时应回答无法判断。条款漫画使用明确标为虚构的简单借用案例，并区分阅读解释与实际专业结论。没有引入真实银行、保险、赛事或产品规则。

使用 **built-in image_gen**，参考方片现有小虎形象生成，每篇一张横排四格，无内嵌文字，台词与替代文字由 HTML 提供。角色、每格脚本、共同提示词、逐篇提示词、定向修正提示及最终原件文件名见 [分镜和提示词清单](comic-rollout-20261111.json)。旧两篇提示词见 [原型提示词](comic-prompts.json)。

十张选定 PNG 原件保存在 `outputs/comic-originals/20261111/`，旧原件未覆盖。网页文件在 `public/slides/assets/comics/`：十张整图用于无脚本降级，四十张 543×724 WebP 切片用于正常阅读。每篇四张切片合计 129–168 KiB，保持本地 lazy loading，页面访问不调用 AI。SHA-256 和大小记录于 `assets/comics/manifest.json`。

`scripts/integrate-comic-batch.py` 按明确清单导入，先校验所有输入，原件存在但哈希不同时拒绝覆盖；不会重跑旧原型固定路径脚本。`comic-data.js` 继续以课件文件名为稳定键；旧两篇页面仅更新数据缓存版本。公共漫画 JS/CSS 未改，正文摘要后插入四格，保留正文、练习、导航及外跳防护。无脚本时仍有整图和完整四格字幕。

## 集中验收

- 逐篇核对四格与原文、台词及实际图像；十篇均为独立剧情，无嵌字、广告、水印或可见严重裁切。修正配送虎多余手臂、跑者阅读顺序图卡和原文条件连接线三处，其余未重复生成。
- 四十张切片解码通过；十张保留原件哈希匹配。数据键十二个且无重复。自动对比确认十篇原正文与原版一致（仅移除重复通用封面并插入漫画资源）。
- 一轮 `npm test`：99/99 通过；其 pretest 统一更新一次搜索索引。
- 一轮 `verify-content.mjs`：2548 HTML、96 JS、2235 内联脚本无错误；一轮本地资源检查：缺失为 0。
- 一次 `npx vinext build` 通过，沿用已更新的搜索索引，避免再次执行 prebuild 索引生成。
- 浏览器抽查研究员虎桌面四列，四张均加载；键盘右箭头切至第二格；播放能推进并结束，播放/暂停按钮状态正确。390×844 窄屏老师虎两列、无横向溢出，四图均加载。阅读器内嵌陶艺虎四列、图片均加载，键盘切格与字幕匹配。代表页错误/警告日志为空。未重复逐页验证同一公共组件，也未重做全站外跳审计；窄屏为浏览器视口模拟，未代替触屏真机验收。

截图：[桌面研究员虎](screenshots/comics-20261111/desktop-researcher.jpg)、[窄屏老师虎](screenshots/comics-20261111/mobile-clause.jpg)、[阅读器陶艺虎](screenshots/comics-20261111/reader-pottery.jpg)。

## 同步状态

本轮 GitHub 同步结果在完成提交后记录。服务器通过既有指定私钥执行只读连接检查时返回 `Permission denied (publickey,password)`，本对话没有取得可用 SSH 认证，因此没有上传或切换线上版本，也没有猜测密码或把凭据写入仓库。线上仍以此前已发布版本为准，本地十篇已可用。
