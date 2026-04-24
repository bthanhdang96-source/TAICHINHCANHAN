/**
 * Chart utilities — Canvas-based charting.
 * No external dependencies. Hardware-accelerated.
 */

/**
 * Draw a donut chart on a canvas element.
 * @param {HTMLCanvasElement} canvas
 * @param {Array<{value: number, color: string}>} segments
 * @param {number} lineWidth
 */
export function drawDonut(canvas, segments, lineWidth = 28) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const size = canvas.parentElement.clientWidth;

  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  ctx.scale(dpr, dpr);

  const cx = size / 2;
  const cy = size / 2;
  const radius = (size - lineWidth) / 2 - 4;
  const total = segments.reduce((s, seg) => s + seg.value, 0);

  let startAngle = -Math.PI / 2;

  segments.forEach((seg) => {
    const sliceAngle = (seg.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
    ctx.strokeStyle = seg.color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
    startAngle += sliceAngle + 0.04; // small gap between segments
  });
}

/**
 * Draw a sparkline (mini line chart) on a canvas.
 * @param {HTMLCanvasElement} canvas
 * @param {number[]} data
 * @param {string} color
 */
export function drawSparkline(canvas, data, color = '#10b981') {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.parentElement.clientWidth;
  const h = canvas.parentElement.clientHeight;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.scale(dpr, dpr);

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;

  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: padding + (1 - (v - min) / range) * (h - padding * 2),
  }));

  // Fill gradient
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, color + '18');
  grad.addColorStop(1, color + '02');

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const cpx = (points[i - 1].x + points[i].x) / 2;
    ctx.bezierCurveTo(cpx, points[i - 1].y, cpx, points[i].y, points[i].x, points[i].y);
  }
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const cpx = (points[i - 1].x + points[i].x) / 2;
    ctx.bezierCurveTo(cpx, points[i - 1].y, cpx, points[i].y, points[i].x, points[i].y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();

  // End dot
  const last = points[points.length - 1];
  ctx.beginPath();
  ctx.arc(last.x, last.y, 3, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Draw a trend line chart with grid on a canvas.
 * @param {HTMLCanvasElement} canvas
 * @param {Array<{label: string, value: number}>} data
 * @param {string} color
 */
export function drawTrendChart(canvas, data, color = '#10b981') {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.parentElement.clientWidth;
  const h = canvas.parentElement.clientHeight;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.scale(dpr, dpr);

  const paddingLeft = 60;
  const paddingBottom = 30;
  const paddingTop = 10;
  const chartW = w - paddingLeft - 20;
  const chartH = h - paddingBottom - paddingTop;

  const values = data.map((d) => d.value);
  const min = Math.min(...values) * 0.95;
  const max = Math.max(...values) * 1.02;
  const range = max - min || 1;

  // Grid lines
  const gridLines = 5;
  ctx.strokeStyle = 'rgba(228,228,231,0.4)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  for (let i = 0; i <= gridLines; i++) {
    const y = paddingTop + (i / gridLines) * chartH;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(w - 20, y);
    ctx.stroke();

    // Y-axis labels
    const val = max - (i / gridLines) * range;
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(formatCompact(val), paddingLeft - 8, y + 4);
  }
  ctx.setLineDash([]);

  // X-axis labels
  const labelStep = Math.max(1, Math.floor(data.length / 6));
  ctx.fillStyle = '#a1a1aa';
  ctx.font = '11px "Outfit", sans-serif';
  ctx.textAlign = 'center';
  data.forEach((d, i) => {
    if (i % labelStep === 0 || i === data.length - 1) {
      const x = paddingLeft + (i / (data.length - 1)) * chartW;
      ctx.fillText(d.label, x, h - 8);
    }
  });

  // Data points
  const points = data.map((d, i) => ({
    x: paddingLeft + (i / (data.length - 1)) * chartW,
    y: paddingTop + (1 - (d.value - min) / range) * chartH,
  }));

  // Fill gradient
  const grad = ctx.createLinearGradient(0, paddingTop, 0, paddingTop + chartH);
  grad.addColorStop(0, color + '20');
  grad.addColorStop(1, color + '02');

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const cpx = (points[i - 1].x + points[i].x) / 2;
    ctx.bezierCurveTo(cpx, points[i - 1].y, cpx, points[i].y, points[i].x, points[i].y);
  }
  ctx.lineTo(points[points.length - 1].x, paddingTop + chartH);
  ctx.lineTo(points[0].x, paddingTop + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const cpx = (points[i - 1].x + points[i].x) / 2;
    ctx.bezierCurveTo(cpx, points[i - 1].y, cpx, points[i].y, points[i].x, points[i].y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // End dot
  const last = points[points.length - 1];
  ctx.beginPath();
  ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(last.x, last.y, 7, 0, Math.PI * 2);
  ctx.strokeStyle = color + '40';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function formatCompact(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
  return n.toFixed(0);
}
