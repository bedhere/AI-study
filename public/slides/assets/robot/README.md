# 方片学习机器人

代码原生的原创机器人，用于学堂首页背景；形体参考用户提供的白色显示器机器人与滚动镜头设定。未从参考网站提取模型、纹理或代码。暖黄来自方片配色，面部有双眼与引号两种状态。

## 接入

在首页通过同源脚本载入 `../../robot-scene.js`，载入后：

```js
const scene = window.FangpianRobot.mount(canvas, { anchorX: .62 });
// scene 为 null 时显示 robot-poster.svg。
scene?.update({ progress, pointerX, pointerY, pointerActive, dt, active: true, reducedMotion });
// progress: 0 全身、1 头部近景、1.55–1.73 双眼切换引号、2 引号近景。
// pointerX/Y: -1 到 1；dt 为秒，可省略，由模块从 performance.now() 计算。
// pointerActive: 指针进入/移动时 true、离开时 false；画面中心也能正确跟随。
// 首页负责唯一的 rAF、滚动、指针、可见性与系统减少动态效果监听。
scene?.resize();
scene?.dispose();
```

桌面默认投影中心位于画面宽度 62%，宽度小于 760px 时居中。桌面 DPR 上限 1.5、手机上限 1.0，并按画布尺寸限制为最多约 250 万绘制像素。透明画布不拦截指针。减少动态效果时保持全身静态姿态，关闭指针与眨眼，可按内容阶段立即切换引号。离屏时 `active:false` 停止更新和渲染，清空时间差，重新进入时不会累积物理时间。

## 鼠标跟随

仅在精细且支持悬停的指针设备上启用大幅跟随。指针进入时，头部从原来的滚动姿态平滑转向指针；互动完全展开后，头部与身体的合计水平转角为 ±0.95rad（约 ±54.4°），俯仰为 ±0.42rad（约 ±24.1°），身体仅附加 ±0.10rad（约 ±5.7°）。不会直接把大角度叠加到 intro 原有的 -1.02rad 合计朝向上，避免转到背脸；局部头部 yaw 保护限位 ±1.35rad、合计 yaw 保护限位 ±1.08rad、pitch 保护限位 ±0.44rad。所有滚动阶段和跟随中间态均保持脸部法线朝向镜头前方。

指针坐标使用 `1-exp(-8*dt)` 阻尼，进入/离开权重使用 `1-exp(-7*dt)`，离开后平滑回到当前滚动阶段的原姿态。未传 `pointerActive` 时兼容旧接口：非零坐标视为活跃。粗指针和减少动态效果关闭跟随；双眼小幅移动和转头共享相同状态。静止 30fps 节流会检查实际头部/身体角度，因此在屏幕中心进入或回正期间也能逐帧更新。

头部显式使用共享的 `HEAD_ROTATION_ORDER='YXZ'`。原来的默认 XYZ 会令真实垂直朝向乘上 `cos(局部 yaw)`：intro 右下角虽然 pitch 数值为 0.42rad，真实低头只有约 6.94°。YXZ 令水平转向与俯仰独立，四角均能实际转到水平 ±54.43°、垂直 ±24.06°。没有扩大角度范围或改变阻尼；直接更换旋转顺序会让静止 intro 面部朝向微调约 1.65°，近景约 0.005°。

画布提供只读诊断输出，值来自实际已绘制的姿态，不用于控制场景：`data-robot-pointer-x/y`（平滑后标准化坐标）、`data-robot-pointer-active`、`data-robot-follow-blend`、`data-robot-head-yaw/pitch/roll`（局部弧度）、`data-robot-world-yaw`（身体与头部合计水平弧度）。数值保留三位小数，只有值变化才写入 DOM，无可见调试界面。

`data-robot-facing-x/y/z` 为从真实头部 `getWorldDirection()` 读取的世界空间单位法线；`data-robot-facing-azimuth/elevation` 为该法线计算的方位角、仰角（弧度，向上为正），不使用 Euler 数值相加推断。完全跟随右下角时约为 `[0.743,-0.408,0.531]`、方位角 `0.950`、仰角 `-0.420`。`sampleHeadFacing(follow)` 复用 Three 场景图和生产旋转设置方法，供矩阵回归测试与只读验收使用；不在渲染热路径新建对象。

## 渲染预算

相机与指针姿态接口保持不变。滚动、鼠标跟随、眨眼与面部切换有变化时继续逐帧响应；静止时呼吸动画最多渲染 30fps，减少动态效果且画面未变时不重复绘制。内部复用姿态数组和上一帧状态，避免连续滚动时反复分配短期对象。重复的同尺寸 resize 不重新分配绘制缓冲区。

阴影关闭自动逐帧刷新，桌面使用 512²、手机使用 256² 贴图。只在滚动姿态或大幅转头有明显变化时按阈值低频刷新，每次至少相隔 120ms；缓慢移动结束后会补一次最终姿态。微小指针移动、眨眼与呼吸不会单独触发阴影深度 pass。形体、材质和灯光颜色保持原样，地面的渐变接触阴影继续存在。

脸部双眼和引号均为几何体，没有逐帧 face canvas 绘制或纹理上传；地面 CanvasTexture 在挂载时创建一次。`statistics` 新增 `renderedFrames`、`skippedFrames`、`shadowPasses`、`pixelRatio` 和 `shadowSize` 计数，供开发时核对渲染预算。测试验证的是调度和像素预算，不等同于在真实设备上测得的帧率。

较低 DPR 与阴影分辨率可能让高分屏极近观察时的边缘略软；缓存阴影不跟随微小的头部指针运动。最终清晰度与过渡手感仍需在目标浏览器中验收。

WebGL2 不可用时 mount 返回 null；context lost 会发送 `fangpian:robot-context` 事件并将 `canvas.dataset.robotStatus` 设为 `lost`，供首页显示降级插画。恢复后重新设置尺寸并渲染。页面退出时调用 dispose，释放几何体、材质、纹理、阴影贴图和 WebGL 上下文。

正常启动时先保持降级插画隐藏，首个 3D 帧绘制后画布淡入，避免先出现不同画风的插画。仅导入失败、WebGL 不可用或上下文丢失时显示降级图。

`robot-poster.svg` 与 `robot-poster-quote.svg` 是本地矢量降级插画，胸前嵌入素材库正式 Logo。若内联 SVG，也可使用 `robot-poster-eyes`、`robot-poster-quote` 分组切换面部。

## 依赖与构建

- Three.js **0.160.0**，从 `https://registry.npmjs.org/three/-/three-0.160.0.tgz` 获取，校验通过 `SOURCE.json` 所记 SHA-512。
- `RoundedBoxGeometry.mjs` 为同一版本官方 addon；许可见 `LICENSE.three.txt`。
- 可读主源码：`robot-scene-source.mjs`；发布文件：`../../robot-scene.js`，已包含所用库，运行时无需 CDN 或模型文件。胸前贴图使用与导航相同的本地 `../fangpian/logo-yellow-square.webp`，由浏览器复用缓存，加载完成后触发一次绘制；不逐帧上传贴图。
- 使用项目已有 esbuild 构建：入口为本目录主源码，`three` alias 指向解包后官方 `build/three.module.js`，`bundle:true, format:'iife', platform:'browser', target:'es2020', minify:true, legalComments:'inline'`。
- 重建发布文件后同步更新 `SOURCE.json` 的字节数、gzip 大小与 SHA-256。

姿态和眨眼节奏使用确定性数学，无渲染路径随机值；已有转头范围、真实 Three 世界矩阵四角朝向和俯仰对称、全过渡态正面可见性、粗指针与减少动态效果、中心进入逐帧响应、阴影预算、30/60/120 fps 阻尼一致性回归测试。场景实际网格和三角形数量由返回对象的 `statistics` 提供。
