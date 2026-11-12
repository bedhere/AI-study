/* Shared certificate artwork for the 3D face, full-size preview and PNG download. */
(function (root) {
  'use strict';
  const WIDTH = 2400, HEIGHT = 1706;
  let logoPromise;
  function logo() {
    if (!logoPromise) logoPromise = new Promise(resolve => {
      const img = new Image(); img.onload = () => resolve(img); img.onerror = () => resolve(null);
      img.src = new URL('assets/fangpian/logo-yellow-square.webp', document.baseURI).href;
    });
    return logoPromise;
  }
  function canvas() { const element = document.createElement('canvas'); element.width = WIDTH; element.height = HEIGHT; return element; }
  function text(ctx, value, x, y, size, weight = 400, color = '#303030', align = 'left') {
    ctx.fillStyle = color; ctx.textAlign = align; ctx.font = `${weight} ${size}px Arial,"Microsoft YaHei",sans-serif`; ctx.fillText(value, x, y);
  }
  function rule(ctx, x, y, width, color = '#ded8c9') { ctx.fillStyle = color; ctx.fillRect(x, y, width, 2); }
  async function front(record, summary = {}) {
    const element = canvas(), ctx = element.getContext('2d'), image = await logo();
    ctx.fillStyle = '#fbf8f0'; ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#ffd85f'; ctx.fillRect(0, 0, 32, HEIGHT);
    ctx.strokeStyle = '#d9c68c'; ctx.lineWidth = 2; ctx.strokeRect(68, 68, WIDTH - 136, HEIGHT - 136);
    if (image) ctx.drawImage(image, 133, 130, 128, 128);
    text(ctx, 'AI学院', image ? 293 : 133, 191, 47, 700);
    text(ctx, '方片新媒体 · 全员拥抱 AI', image ? 295 : 133, 237, 25, 400, '#746d5e');
    text(ctx, record ? '学习完成纪念' : '证书样张', WIDTH - 135, 185, 30, 500, '#8a6c20', 'right');
    rule(ctx, 133, 302, WIDTH - 266);
    text(ctx, '结业证书', WIDTH / 2, 541, 158, 700, '#303030', 'center');
    text(ctx, 'CERTIFICATE OF COMPLETION', WIDTH / 2, 617, 32, 400, '#8a6c20', 'center');
    const name = record?.name || '你的名字';
    text(ctx, '致每一位持续学习、拥抱 AI 的方片同学', WIDTH / 2, 752, 35, 400, '#746d5e', 'center');
    let nameSize = 107;
    do { ctx.font = `700 ${nameSize}px "Microsoft YaHei",Arial,sans-serif`; if (ctx.measureText(name).width <= WIDTH - 420) break; nameSize -= 3; } while (nameSize > 38);
    text(ctx, name, WIDTH / 2, 916, nameSize, 700, '#303030', 'center');
    rule(ctx, WIDTH / 2 - 385, 956, 770, '#b99b48');
    const total = record?.lessonCount || summary.total || 6;
    const plan = record?.planLabel || summary.planLabel || '课程';
    text(ctx, record ? `已完成「${plan}」${total} 节必修课程` : `完成「${plan}」${total} 节必修，即可领取证书`, WIDTH / 2, 1062, 43, 500, '#4c483f', 'center');
    text(ctx, '把所学用进真实工作，让技术与善意一起成长。', WIDTH / 2, 1140, 32, 400, '#746d5e', 'center');
    rule(ctx, 133, 1317, WIDTH - 266);
    const date = record ? new Date(record.issuedAt).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '完成学习后生成';
    text(ctx, '证书编号', 133, 1410, 26, 400, '#746d5e');
    text(ctx, record?.id || 'FP · 等待你来点亮', 133, 1474, 36, 600);
    text(ctx, '领取日期', WIDTH / 2, 1410, 26, 400, '#746d5e', 'center');
    text(ctx, date, WIDTH / 2, 1474, 36, 500, '#303030', 'center');
    text(ctx, '正心正念', WIDTH - 133, 1410, 37, 700, '#8a6c20', 'right');
    text(ctx, '利他向善', WIDTH - 133, 1474, 37, 700, '#8a6c20', 'right');
    text(ctx, '方片内部学习纪念 · 依据本浏览器的学习记录生成', WIDTH / 2, 1601, 24, 400, '#8b8476', 'center');
    return element;
  }
  // The homepage badge is about 300px wide. Use a reading layout at that size;
  // the full certificate below remains the detailed 2400px document for download.
  async function badge(record, summary = {}) {
    const element = canvas(), ctx = element.getContext('2d'), image = await logo();
    ctx.fillStyle = '#fbf8f0'; ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#ffd85f'; ctx.fillRect(0, 0, 32, HEIGHT);
    ctx.strokeStyle = '#c9ad52'; ctx.lineWidth = 5; ctx.strokeRect(68, 68, WIDTH - 136, HEIGHT - 136);
    if (image) ctx.drawImage(image, 133, 118, 156, 156);
    text(ctx, 'AI学院', image ? 330 : 133, 238, 114, 700);
    text(ctx, record ? '学习完成纪念' : '证书样张', WIDTH - 135, 220, 76, 600, '#68521a', 'right');
    rule(ctx, 133, 350, WIDTH - 266, '#c9ad52');
    text(ctx, '结业证书', WIDTH / 2, 686, 228, 700, '#252525', 'center');
    text(ctx, 'CERTIFICATE OF COMPLETION', WIDTH / 2, 798, 58, 500, '#68521a', 'center');
    const name = record?.name || '你的名字';
    let nameSize = 190;
    do { ctx.font = `700 ${nameSize}px "Microsoft YaHei",Arial,sans-serif`; if (ctx.measureText(name).width <= WIDTH - 420) break; nameSize -= 4; } while (nameSize > 54);
    text(ctx, name, WIDTH / 2, 1082, nameSize, 700, '#252525', 'center');
    const total = record?.lessonCount || summary.total || 6;
    const plan = record?.planLabel || summary.planLabel || '课程';
    text(ctx, `${plan} · ${total} 节必修`, WIDTH / 2, 1280, 104, 600, '#39362e', 'center');
    text(ctx, '把 AI 用进真实工作', WIDTH / 2, 1448, 88, 500, '#534b38', 'center');
    rule(ctx, 133, 1510, WIDTH - 266, '#c9ad52');
    text(ctx, record ? '方片新媒体 · 学习完成纪念' : '完成必修课程，即可领取', WIDTH / 2, 1612, 70, 500, '#534b38', 'center');
    return element;
  }
  async function back() {
    const element = canvas(), ctx = element.getContext('2d'), image = await logo();
    ctx.fillStyle = '#ffd85f'; ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeStyle = '#303030'; ctx.lineWidth = 3; ctx.strokeRect(68, 68, WIDTH - 136, HEIGHT - 136);
    if (image) ctx.drawImage(image, (WIDTH - 1070) / 2, 180, 1070, 1070);
    else text(ctx, '方片', WIDTH / 2, 930, 280, 700, '#303030', 'center');
    text(ctx, '方片新媒体', WIDTH / 2, 1370, 62, 700, '#303030', 'center');
    text(ctx, '正心正念，利他向善', WIDTH / 2, 1470, 34, 400, '#4c483f', 'center');
    return element;
  }
  root.FangpianCertificateArt = { front, badge, back, width: WIDTH, height: HEIGHT };
})(typeof window === 'undefined' ? globalThis : window);
