/**
 * Dashboard — Main entry point.
 * Assembles all sections: TopBar, Net Worth, Assets, Trend, Stats.
 */
import './style.css';
import { icons } from './lib/icons.js';
import { drawDonut, drawSparkline, drawTrendChart } from './lib/charts.js';
import { ASSETS, TREND_DATA, STATS } from './data/demo.js';
import { fetchVPBankAccountBalance, fetchVPBankTransactions } from './lib/sepay.js';
import { fetchTCBSAssets } from './lib/tcbs.js';

// --- State ---
const hiddenAssets = new Set();
let allHidden = false;
let activeTrendTab = '1M';
let vpbankTransactions = [];
let isLoadingSepay = true;
let tcbsAssets = [];
let tcbsTotalValue = 0;
let isLoadingTcbs = false;

// --- Helpers ---
function formatVND(n) {
  return new Intl.NumberFormat('vi-VN').format(n);
}

function getTotalValue() {
  return ASSETS.reduce((sum, a) => sum + a.value, 0);
}

// --- Render Functions ---
function renderTopBar() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `
    <header class="topbar">
      <div class="topbar__brand">
        <div class="topbar__logo">${icons.wallet}</div>
        <span class="topbar__title">Tai chinh Ca nhan</span>
      </div>
      <div class="topbar__actions">
        <span class="topbar__date">${dateStr}</span>
        <div class="topbar__avatar">VT</div>
      </div>
    </header>
  `;
}

function renderNetWorth() {
  const total = getTotalValue();
  const totalChange = +3.48;

  return `
    <div class="networth-card">
      <div class="networth__label">Tong tai san rong</div>
      <div class="networth__value-row">
        <span class="networth__value ${allHidden ? 'networth__value--hidden' : ''}" id="networth-value">
          ${formatVND(total)}
        </span>
        <span class="networth__currency">VND</span>
        <button class="btn-toggle" id="toggle-all" title="An/Hien tat ca">
          ${allHidden ? icons.eyeClosed : icons.eyeOpen}
        </button>
      </div>
      <span class="networth__change networth__change--positive">
        ${icons.arrowUp} +${totalChange}% thang nay
      </span>
      <div class="networth__subtitle">Cap nhat luc ${now()}</div>
    </div>
  `;
}

function renderAllocation() {
  const total = getTotalValue();

  return `
    <div class="allocation-card">
      <div class="allocation__title">Ty trong Tai san</div>
      <div class="donut-wrapper">
        <canvas id="donut-chart"></canvas>
        <div class="donut-center">
          <div class="donut-center__label">Tong</div>
          <div class="donut-center__value">5 loai</div>
        </div>
      </div>
      <div class="allocation__legend">
        ${ASSETS.map(
          (a) => `
          <div class="legend-item">
            <span class="legend-dot" style="background:${a.color}"></span>
            ${a.name} ${((a.value / total) * 100).toFixed(1)}%
          </div>
        `
        ).join('')}
      </div>
    </div>
  `;
}

function renderAssetCard(asset, index) {
  const isHidden = hiddenAssets.has(asset.id) || allHidden;
  const changeClass = asset.change >= 0 ? 'positive' : 'negative';
  const changeIcon = asset.change >= 0 ? icons.arrowUp : icons.arrowDown;
  const total = getTotalValue();
  const weight = ((asset.value / total) * 100).toFixed(1);

  return `
    <div class="asset-card" style="animation-delay: ${index * 80}ms">
      <div class="asset-card__header">
        <div class="asset-card__icon-group">
          <div class="asset-card__icon" style="background:${asset.color}">
            ${icons[asset.id]}
          </div>
          <div>
            <div class="asset-card__name">${asset.name}</div>
            <div class="asset-card__type">${asset.label}</div>
          </div>
        </div>
        <button class="btn-toggle" data-toggle-asset="${asset.id}" title="An/Hien">
          ${isHidden ? icons.eyeClosed : icons.eyeOpen}
        </button>
      </div>
      <div class="asset-card__value ${isHidden ? 'asset-card__value--hidden' : ''}" data-value-id="${asset.id}">
        ${formatVND(asset.value)} VND
      </div>
      <div class="asset-card__meta">
        <span class="asset-card__change asset-card__change--${changeClass}">
          ${changeIcon} ${asset.change > 0 ? '+' : ''}${asset.change}%
        </span>
        <span class="asset-card__weight">${weight}% ty trong</span>
      </div>
      <div class="sparkline-wrapper">
        <canvas data-sparkline="${asset.id}"></canvas>
      </div>
    </div>
  `;
}

function renderTrendSection() {
  const tabs = ['1M', '3M', '1Y'];

  return `
    <div class="trend-card">
      <div class="trend-card__header">
        <div style="display:flex;align-items:center;gap:0.5rem">
          <span class="trend-card__title">Xu huong Tong tai san</span>
          <span class="live-dot"></span>
        </div>
        <div class="trend-card__tabs">
          ${tabs
            .map(
              (t) => `
            <button class="trend-tab ${t === activeTrendTab ? 'trend-tab--active' : ''}" data-trend-tab="${t}">
              ${t}
            </button>
          `
            )
            .join('')}
        </div>
      </div>
      <div class="trend-chart-wrapper">
        <canvas id="trend-chart"></canvas>
      </div>
    </div>
  `;
}

function renderStatsPanel() {
  return `
    <div class="stats-panel">
      <div class="stats-panel__title">Thong ke Noi bat</div>
      ${STATS.map(
        (s) => `
        <div class="stat-row">
          <span class="stat-row__label">${s.label}</span>
          <span class="stat-row__value ${s.positive === true ? 'stat-row__value--positive' : s.positive === false ? 'stat-row__value--negative' : ''}">
            ${s.value}
          </span>
        </div>
      `
      ).join('')}
    </div>
  `;
}

function renderTransactionPanel() {
  if (isLoadingSepay) {
    return `
      <div class="transaction-panel">
        <div class="transaction-panel__title">Giao dich VPBank gan day</div>
        <div class="transaction-empty">
          <div class="spinner"></div>
          <div style="margin-top: 1rem;">Dang dong bo du lieu SePay...</div>
        </div>
      </div>
    `;
  }

  if (vpbankTransactions.length === 0) {
    return `
      <div class="transaction-panel">
        <div class="transaction-panel__title">
          <span>Giao dich VPBank gan day</span>
          <button class="btn-toggle" style="font-size:0.75rem; padding:0.25rem 0.75rem; border-radius:1rem; border:1px solid var(--border-default); background:var(--bg-surface-hover);" title="Tai lai" id="btn-refresh-sepay">
            Lay du lieu moi
          </button>
        </div>
        <div class="transaction-empty">Khong co giao dich nao gan day.</div>
      </div>
    `;
  }

  return `
    <div class="transaction-panel">
      <div class="transaction-panel__title">
        <span>Giao dich VPBank gan day</span>
        <button class="btn-toggle" style="font-size:0.75rem; padding:0.25rem 0.75rem; border-radius:1rem; border:1px solid var(--border-default); background:var(--bg-surface-hover);" title="Tai lai" id="btn-refresh-sepay">
          Lay du lieu moi
        </button>
      </div>
      <div class="transaction-list">
        ${vpbankTransactions.map(tx => {
          const isIn = tx.transfer_type === 'in';
          const icon = isIn ? '+' : '-';
          const amount = isIn ? tx.amount_in : tx.amount_out;
          
          return `
            <div class="transaction-item">
              <div class="transaction-item__icon transaction-item__icon--${isIn ? 'in' : 'out'}">
                ${icon}
              </div>
              <div class="transaction-item__details">
                <div class="transaction-item__content">${tx.transaction_content || 'Giao dich qua VPBank'}</div>
                <div class="transaction-item__date">${tx.transaction_date}</div>
              </div>
              <div class="transaction-item__amount transaction-item__amount--${isIn ? 'in' : 'out'}">
                ${isIn ? '+' : '-'}${formatVND(amount)}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderTCBSPanel() {
  if (isLoadingTcbs) {
    return `
      <div class="tcbs-panel">
        <div class="tcbs-panel__title">Danh muc Co phieu TCBS</div>
        <div class="transaction-empty">
          <div class="spinner"></div>
          <div style="margin-top: 1rem;">Dang xac thuc va lay du lieu TCBS...</div>
        </div>
      </div>
    `;
  }

  return `
    <div class="tcbs-panel">
      <div class="tcbs-panel__title">
        <span>Danh muc Co phieu TCBS</span>
        <button class="btn-toggle" style="font-size:0.75rem; padding:0.25rem 0.75rem; border-radius:1rem; border:1px solid var(--border-default); background:var(--bg-surface-hover);" title="Dong bo TCBS" id="btn-refresh-tcbs">
          Đồng bộ TCBS
        </button>
      </div>
      
      ${tcbsAssets.length === 0 ? `
        <div class="transaction-empty">Chua co du lieu hoac ban khong cam ma co phieu nao.</div>
      ` : `
        <div class="stock-list">
          ${tcbsAssets.map(stock => `
            <div class="stock-item">
              <div class="stock-item__icon">${stock.symbol.substring(0, 2)}</div>
              <div class="transaction-item__details">
                <div class="transaction-item__content">${stock.symbol}</div>
                <div class="transaction-item__date">So luong: ${formatVND(stock.quantity)} | Gia: ${formatVND(stock.price)}</div>
              </div>
              <div class="transaction-item__amount">
                ${formatVND(stock.value)}
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

function now() {
  return new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

// --- Main Render ---
function render() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <div class="app-shell">
      ${renderTopBar()}

      <section class="hero-section">
        ${renderNetWorth()}
        ${renderAllocation()}
      </section>

      <section class="asset-grid">
        ${ASSETS.map((a, i) => renderAssetCard(a, i)).join('')}
      </section>

      <section class="trend-section">
        ${renderTrendSection()}
        ${renderStatsPanel()}
      </section>

      ${renderTransactionPanel()}
      ${renderTCBSPanel()}
    </div>
  `;

  // Draw charts after DOM is ready
  requestAnimationFrame(() => {
    drawCharts();
    bindEvents();
  });
}

function drawCharts() {
  // Donut
  const donutCanvas = document.getElementById('donut-chart');
  if (donutCanvas) {
    drawDonut(
      donutCanvas,
      ASSETS.map((a) => ({ value: a.value, color: a.color }))
    );
  }

  // Sparklines
  ASSETS.forEach((asset) => {
    const canvas = document.querySelector(`[data-sparkline="${asset.id}"]`);
    if (canvas) {
      drawSparkline(canvas, asset.sparkline, asset.color);
    }
  });

  // Trend chart
  const trendCanvas = document.getElementById('trend-chart');
  if (trendCanvas) {
    drawTrendChart(trendCanvas, TREND_DATA[activeTrendTab], '#10b981');
  }
}

// --- Events ---
function bindEvents() {
  // Toggle all
  document.getElementById('toggle-all')?.addEventListener('click', () => {
    allHidden = !allHidden;
    render();
  });

  // Toggle individual asset
  document.querySelectorAll('[data-toggle-asset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.toggleAsset;
      if (hiddenAssets.has(id)) {
        hiddenAssets.delete(id);
      } else {
        hiddenAssets.add(id);
      }
      render();
    });
  });

  // Trend tabs
  document.querySelectorAll('[data-trend-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeTrendTab = btn.dataset.trendTab;
      render();
    });
  });

  // Refresh SePay
  document.getElementById('btn-refresh-sepay')?.addEventListener('click', () => {
    loadSepayData();
  });

  // Refresh TCBS
  document.getElementById('btn-refresh-tcbs')?.addEventListener('click', () => {
    loadTCBSData();
  });
}

// --- Resize handler ---
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(drawCharts, 200);
});

// --- Init ---
async function loadSepayData() {
  isLoadingSepay = true;
  render(); // show loading state
  
  const balance = await fetchVPBankAccountBalance();
  if (balance !== null) {
    const bankAsset = ASSETS.find(a => a.id === 'bank');
    if (bankAsset) {
      bankAsset.value = balance;
    }
  }
  
  vpbankTransactions = await fetchVPBankTransactions(5);
  isLoadingSepay = false;
  render();
}

async function loadTCBSData() {
  const otp = window.prompt("Hệ thống TCBS yêu cầu xác thực bảo mật.\nVui lòng mở app TCInvest (SmartOTP) và nhập 6 số iOTP vào đây:");
  if (!otp) return; // Nguoi dung an Cancel
  
  isLoadingTcbs = true;
  render(); // show loading state

  const tcbsResult = await fetchTCBSAssets(otp);
  tcbsAssets = tcbsResult.items || [];
  tcbsTotalValue = tcbsResult.totalValue || 0;

  if (tcbsTotalValue > 0) {
    const stockAsset = ASSETS.find(a => a.id === 'stock');
    if (stockAsset) {
      stockAsset.value = tcbsTotalValue;
    }
  }

  isLoadingTcbs = false;
  render();
}

render(); // initial render with demo data
loadSepayData(); // fetch real data
