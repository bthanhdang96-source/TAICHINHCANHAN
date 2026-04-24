/**
 * TCBS API Interactor
 * Connects to TCBS Open API to fetch stock portfolio data.
 */

const TCBS_API_URL = '/api/tcbs';

/**
 * Get TCBS Config from environment variables.
 */
function getConfig() {
  const apiKey = import.meta.env.VITE_TCBS_API_KEY;
  const accountNo = import.meta.env.VITE_TCBS_ACCOUNT_NO;
  
  if (!apiKey || !accountNo) {
    console.warn('VITE_TCBS_API_KEY hoac VITE_TCBS_ACCOUNT_NO thieu trong file .env');
  }
  return { apiKey, accountNo };
}

/**
 * Fetch JWT Token from TCBS (if needed) or use API Key directly.
 * Thuc te, TCBS yeu cau call /gaia/v1/oauth2/openapi/token de doi API Key lay JWT Token.
 */
async function getValidToken(apiKey, otp) {
  // Neu apiKey da la JWT token (thuong bat dau bang ey), tra ve luon
  if (apiKey.startsWith('ey')) {
    return apiKey;
  }
  
  // Neu chi la API Key, thu exchange lay JWT (Day la Payload du doan, co the can update theo tai lieu TCBS)
  try {
    const res = await fetch(`${TCBS_API_URL}/gaia/v1/oauth2/openapi/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ apiKey, otp }) // Payload theo chuan cua TCBS
    });
    if (res.ok) {
      const data = await res.json();
      if (data.accessToken || data.token) {
        return data.accessToken || data.token;
      }
    }
  } catch (e) {
    console.error('Loi khi exchange token TCBS:', e);
  }
  
  // Fallback: van dung apiKey de gui
  return apiKey;
}

/**
 * Fetch TCBS Stock Assets (Tra cuu tai san co phieu)
 * @returns {Promise<{totalValue: number, items: Array}>}
 */
export async function fetchTCBSAssets(otp) {
  const { apiKey, accountNo } = getConfig();
  if (!apiKey || !accountNo) return { totalValue: 0, items: [] };

  const token = await getValidToken(apiKey, otp);

  try {
    const response = await fetch(`${TCBS_API_URL}/aion/v1/accounts/${accountNo}/se`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    
    const json = await response.json();
    console.log("TCBS Assets Data:", json); // Log de kiem tra cau truc data
    
    // Parse data tuy vao cau truc SeInfoDTO cua TCBS
    // Gia su tra ve json.data la mang hoac chua mang
    const itemsData = json.data?.list || json.data || json || [];
    const items = Array.isArray(itemsData) ? itemsData : [];
    
    // Tinh tong gia tri thi truong (Gia su field la marketValue, totalValue hoac currentPrice * quantity)
    let totalValue = 0;
    const parsedItems = items.map(item => {
      // Du doan cac field cua TCBS
      const symbol = item.symbol || item.stockCode || 'UNK';
      const quantity = item.totalVolume || item.quantity || item.volume || 0;
      const price = item.marketPrice || item.currentPrice || item.price || 0;
      const val = item.marketValue || item.totalValue || (quantity * price) || 0;
      
      totalValue += val;
      
      return {
        symbol,
        quantity,
        price,
        value: val
      };
    }).filter(i => i.value > 0);

    return {
      totalValue,
      items: parsedItems
    };
  } catch (error) {
    console.error('Failed to fetch TCBS assets:', error);
    return { totalValue: 0, items: [] };
  }
}
