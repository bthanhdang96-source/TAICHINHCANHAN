/**
 * TCBS API Interactor
 * Connects to TCBS Open API to fetch stock portfolio data.
 */

const TCBS_API_URL = '/api/tcbs';

/**
 * Get TCBS Config from environment variables.
 */
function getConfig() {
  const apiKey = sanitizeEnvValue(import.meta.env.VITE_TCBS_API_KEY);
  const accountNo = sanitizeEnvValue(import.meta.env.VITE_TCBS_ACCOUNT_NO);

  if (!apiKey || !accountNo) {
    console.warn('VITE_TCBS_API_KEY hoac VITE_TCBS_ACCOUNT_NO thieu trong file .env');
  }

  return { apiKey, accountNo };
}

function sanitizeEnvValue(value) {
  if (typeof value !== 'string') return '';

  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

async function parseResponseBody(response) {
  const contentType = response.headers.get('content-type') || '';

  try {
    if (contentType.includes('application/json')) {
      return await response.json();
    }

    const text = await response.text();
    return text ? { message: text } : null;
  } catch {
    return null;
  }
}

function buildErrorDetails(payload) {
  if (!payload) return '';
  if (typeof payload === 'string') return payload;

  return [payload.code, payload.message, payload.error, payload.error_description]
    .filter(Boolean)
    .join(' - ');
}

function stringifyPayload(payload) {
  if (!payload || typeof payload === 'string') return '';

  try {
    return JSON.stringify(payload);
  } catch {
    return '';
  }
}

function toMultiline(parts) {
  return parts.filter(Boolean).join('\n');
}

function maskValue(value, visibleStart = 4, visibleEnd = 4) {
  if (!value) return '(trong)';
  if (value.length <= visibleStart + visibleEnd) return '*'.repeat(value.length);

  return `${value.slice(0, visibleStart)}...${value.slice(-visibleEnd)}`;
}

function detectApiKeyType(apiKey) {
  if (!apiKey) return 'missing';
  if (apiKey.startsWith('ey')) return 'jwt_like';
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(apiKey)) {
    return 'uuid_like';
  }

  return 'opaque';
}

function pickResponseHeaders(response) {
  if (!response?.headers) return [];

  const interestingHeaders = [
    'content-type',
    'content-length',
    'date',
    'server',
    'via',
    'x-request-id',
    'x-correlation-id',
    'x-amzn-requestid',
    'cf-ray'
  ];

  return interestingHeaders
    .map((name) => {
      const value = response.headers.get(name);
      return value ? `${name}=${value}` : '';
    })
    .filter(Boolean);
}

function buildContextLines(context = {}) {
  const lines = [];

  if (context.endpoint) lines.push(`Endpoint: ${context.endpoint}`);
  if (context.accountNo) lines.push(`Tieu khoan: ${maskValue(context.accountNo, 0, 4)} (len ${context.accountNo.length})`);
  if (context.apiKey) {
    lines.push(
      `API Key: ${detectApiKeyType(context.apiKey)}, len ${context.apiKey.length}, masked ${maskValue(context.apiKey)}`
    );
  }
  if (context.otp) {
    lines.push(`OTP: ${'*'.repeat(context.otp.length)} (len ${context.otp.length})`);
  }
  if (context.responseHeaders?.length) {
    lines.push(`Response headers: ${context.responseHeaders.join(' | ')}`);
  }

  return lines;
}

function createTCBSError(step, response, payload, fallbackMessage, context = {}) {
  const error = new Error(fallbackMessage);
  error.name = 'TCBSError';
  error.step = step;
  error.status = response?.status ?? null;
  error.payload = payload;
  error.details = buildErrorDetails(payload);
  error.context = {
    ...context,
    responseHeaders: pickResponseHeaders(response)
  };
  return error;
}

function getUserFacingError(error) {
  if (error?.name !== 'TCBSError') {
    return 'Khong the ket noi toi TCBS luc nay. Vui long thu lai sau.';
  }

  const statusText = error.status ? `HTTP ${error.status}.` : '';
  const detailsText = error.details ? `Chi tiet tu TCBS: ${error.details}.` : '';
  const rawPayloadText = !detailsText && error.payload
    ? `Payload: ${stringifyPayload(error.payload)}.`
    : '';
  const contextLines = buildContextLines(error.context);
  const bodyHint = !detailsText && !rawPayloadText
    ? 'Response body: rong hoac khong co truong message de hien thi.'
    : '';

  if (error.step === 'token_exchange') {
    return toMultiline([
      'TCBS tu choi doi token.',
      statusText,
      detailsText || rawPayloadText,
      bodyHint,
      ...contextLines,
      'Kiem tra lai API Key trong .env, OTP vua nhap, va dam bao API Key nay da duoc kich hoat Open API trong TCInvest.'
    ]);
  }

  if (error.step === 'asset_fetch') {
    return toMultiline([
      'Da lay token nhung TCBS tu choi truy van tai san.',
      statusText,
      detailsText || rawPayloadText,
      bodyHint,
      ...contextLines,
      'Kiem tra lai tieu khoan trong .env co khop voi API Key va quyen truy cap hay khong.'
    ]);
  }

  return error.message || 'Khong the lay du lieu TCBS.';
}

/**
 * Fetch JWT Token from TCBS (if needed) or use API Key directly.
 * Thuc te, TCBS yeu cau call /gaia/v1/oauth2/openapi/token de doi API Key lay JWT Token.
 */
async function getValidToken(apiKey, otp) {
  if (apiKey.startsWith('ey')) {
    return apiKey;
  }

  const sanitizedOtp = sanitizeEnvValue(otp);
  if (!sanitizedOtp) {
    throw new Error('OTP la bat buoc de doi TCBS access token.');
  }

  const requestContext = {
    endpoint: 'POST /gaia/v1/oauth2/openapi/token',
    apiKey,
    otp: sanitizedOtp
  };

  const response = await fetch(`${TCBS_API_URL}/gaia/v1/oauth2/openapi/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ apiKey, otp: sanitizedOtp })
  });

  const payload = await parseResponseBody(response);
  if (!response.ok) {
    throw createTCBSError(
      'token_exchange',
      response,
      payload,
      `Khong the doi TCBS token (${response.status}).`,
      requestContext
    );
  }

  if (payload?.accessToken || payload?.token) {
    return payload.accessToken || payload.token;
  }

  throw createTCBSError(
    'token_exchange',
    response,
    payload,
    'TCBS khong tra ve access token hop le.',
    requestContext
  );
}

/**
 * Fetch TCBS Stock Assets (Tra cuu tai san co phieu)
 * @returns {Promise<{totalValue: number, items: Array, error: string | null}>}
 */
export async function fetchTCBSAssets(otp) {
  const { apiKey, accountNo } = getConfig();
  if (!apiKey || !accountNo) {
    return {
      totalValue: 0,
      items: [],
      error: 'Thieu VITE_TCBS_API_KEY hoac VITE_TCBS_ACCOUNT_NO trong file .env.'
    };
  }

  try {
    const token = await getValidToken(apiKey, otp);
    const response = await fetch(`${TCBS_API_URL}/aion/v1/accounts/${accountNo}/se`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const json = await parseResponseBody(response);
    if (!response.ok) {
      throw createTCBSError(
        'asset_fetch',
        response,
        json,
        `Khong the lay tai san TCBS (${response.status}).`,
        {
          endpoint: `GET /aion/v1/accounts/${accountNo}/se`,
          accountNo,
          apiKey
        }
      );
    }

    console.log('TCBS Assets Data:', json);

    const itemsData = json.data?.list || json.data || json || [];
    const items = Array.isArray(itemsData) ? itemsData : [];

    let totalValue = 0;
    const parsedItems = items.map((item) => {
      const symbol = item.symbol || item.stockCode || 'UNK';
      const quantity = item.totalVolume || item.quantity || item.volume || 0;
      const price = item.marketPrice || item.currentPrice || item.price || 0;
      const value = item.marketValue || item.totalValue || (quantity * price) || 0;

      totalValue += value;

      return {
        symbol,
        quantity,
        price,
        value
      };
    }).filter((item) => item.value > 0);

    return {
      totalValue,
      items: parsedItems,
      error: null
    };
  } catch (error) {
    const details = error?.details ? ` | ${error.details}` : '';
    console.error(`Failed to fetch TCBS assets [${error?.step || 'unknown'}]:`, error, details);

    return {
      totalValue: 0,
      items: [],
      error: getUserFacingError(error)
    };
  }
}
