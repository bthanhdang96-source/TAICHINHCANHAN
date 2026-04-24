/**
 * Demo data for the personal finance dashboard.
 * All values in VND. Realistic, non-generic numbers.
 */

export const ASSETS = [
  {
    id: 'bank',
    name: 'Tien mat',
    label: 'Ngan hang',
    value: 187_420_000,
    change: +2.14,
    color: '#3b82f6',
    sparkline: [150, 158, 152, 167, 172, 165, 178, 182, 175, 187, 190, 187],
  },
  {
    id: 'bond',
    name: 'Trai phieu',
    label: 'Trai phieu Chinh phu & DN',
    value: 320_750_000,
    change: +4.87,
    color: '#8b5cf6',
    sparkline: [280, 285, 290, 295, 300, 305, 308, 310, 312, 315, 318, 320],
  },
  {
    id: 'stock',
    name: 'Co phieu',
    label: 'Gia tri thuc',
    value: 412_380_000,
    change: -3.21,
    color: '#10b981',
    sparkline: [450, 440, 430, 425, 435, 420, 415, 410, 400, 408, 415, 412],
  },
  {
    id: 'gold',
    name: 'Vang',
    label: 'SJC & Nhan vang',
    value: 248_600_000,
    change: +12.63,
    color: '#f59e0b',
    sparkline: [200, 205, 210, 218, 215, 225, 230, 238, 242, 245, 250, 248],
  },
  {
    id: 'crypto',
    name: 'Crypto',
    label: 'BTC, ETH & Altcoins',
    value: 95_130_000,
    change: -7.42,
    color: '#f97316',
    sparkline: [120, 115, 105, 110, 100, 95, 102, 98, 92, 88, 95, 95],
  },
];

export const TREND_DATA = {
  '1M': [
    { label: '24/03', value: 1_210_000_000 },
    { label: '28/03', value: 1_225_000_000 },
    { label: '01/04', value: 1_218_000_000 },
    { label: '05/04', value: 1_240_000_000 },
    { label: '09/04', value: 1_235_000_000 },
    { label: '13/04', value: 1_250_000_000 },
    { label: '17/04', value: 1_258_000_000 },
    { label: '21/04', value: 1_260_000_000 },
    { label: '24/04', value: 1_264_280_000 },
  ],
  '3M': [
    { label: 'T1', value: 1_150_000_000 },
    { label: '', value: 1_170_000_000 },
    { label: 'T2', value: 1_165_000_000 },
    { label: '', value: 1_190_000_000 },
    { label: 'T3', value: 1_210_000_000 },
    { label: '', value: 1_230_000_000 },
    { label: 'T4', value: 1_245_000_000 },
    { label: '', value: 1_255_000_000 },
    { label: '24/04', value: 1_264_280_000 },
  ],
  '1Y': [
    { label: 'T4/25', value: 980_000_000 },
    { label: 'T6', value: 1_020_000_000 },
    { label: 'T8', value: 1_050_000_000 },
    { label: 'T10', value: 1_080_000_000 },
    { label: 'T12', value: 1_120_000_000 },
    { label: 'T2/26', value: 1_180_000_000 },
    { label: 'T4/26', value: 1_264_280_000 },
  ],
};

export const STATS = [
  { label: 'Loi nhuan thang nay', value: '+18,740,000', positive: true },
  { label: 'Ty suat sinh loi (YTD)', value: '+14.2%', positive: true },
  { label: 'Tai san tang manh nhat', value: 'Vang (+12.63%)', positive: true },
  { label: 'Tai san giam manh nhat', value: 'Crypto (-7.42%)', positive: false },
  { label: 'So loai tai san', value: '5', positive: null },
];
