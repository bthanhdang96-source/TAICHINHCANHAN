/**
 * SePay API Interactor
 * Connects to SePay v2 API to fetch real bank account balances and transactions.
 */

const SEPAY_API_URL = 'https://userapi.sepay.vn/v2';

/**
 * Get the SePay API Token from environment variables.
 */
function getToken() {
  const token = import.meta.env.VITE_SEPAY_API_TOKEN;
  if (!token) {
    console.warn('VITE_SEPAY_API_TOKEN is missing in .env file.');
  }
  return token;
}

/**
 * Fetch VPBank Account Balance
 * @returns {Promise<number|null>} Accumulated balance or null on error
 */
export async function fetchVPBankAccountBalance() {
  const token = getToken();
  if (!token) return null;

  try {
    const response = await fetch(`${SEPAY_API_URL}/bank-accounts?bank_short_name=VPB`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    
    const json = await response.json();
    if (json.status === 'success' && json.data && json.data.length > 0) {
      // Return the accumulated balance of the first VPBank account found
      return json.data[0].accumulated;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch VPBank account balance:', error);
    return null;
  }
}

/**
 * Fetch recent VPBank Transactions
 * @param {number} limit Number of transactions to return
 * @returns {Promise<Array>} Array of transaction objects
 */
export async function fetchVPBankTransactions(limit = 5) {
  const token = getToken();
  if (!token) return [];

  try {
    const response = await fetch(`${SEPAY_API_URL}/transactions?bank_brand_name=VPBank&per_page=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    
    const json = await response.json();
    if (json.status === 'success' && json.data) {
      return json.data;
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch VPBank transactions:', error);
    return [];
  }
}
