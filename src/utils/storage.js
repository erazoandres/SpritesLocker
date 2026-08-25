const STORAGE_KEY_GEN2 = 'el-casillero-user-state-gen2';
const STORAGE_KEY_GEN1 = 'el-casillero-user-state-gen1';

/**
 * Encodes the user state object into a URL-safe Base64 string.
 * Example state: { 'g2-arbustin-base': 1, 'g2-arbustin-oro': 2 }
 */
export function encodeStateToHash(state) {
  try {
    const filtered = Object.fromEntries(
      Object.entries(state || {}).filter(([, val]) => val > 0)
    );
    const jsonStr = JSON.stringify(filtered);
    return btoa(jsonStr)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  } catch (err) {
    console.error('Error encoding state to hash:', err);
    return '';
  }
}

/**
 * Decodes a URL-safe Base64 hash back into a state object.
 */
export function decodeHashToState(hash) {
  if (!hash) return null;
  try {
    let base64 = hash.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    const jsonStr = atob(base64);
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch (err) {
    console.error('Error decoding hash to state:', err);
    return null;
  }
}

/**
 * Loads saved state from LocalStorage or URL hash for specified generation.
 */
export function loadSavedState(gen = 2) {
  // Check URL hash for explicit shareable link
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  const lockerHash = hashParams.get('locker');
  if (lockerHash) {
    const sharedState = decodeHashToState(lockerHash);
    if (sharedState) return sharedState;
  }

  // Load from LocalStorage browser data
  try {
    const key = gen === 1 ? STORAGE_KEY_GEN1 : STORAGE_KEY_GEN2;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('Failed loading saved state from LocalStorage:', err);
    return {};
  }
}

/**
 * Saves current user selections into LocalStorage.
 */
export function saveLocalState(state, gen = 2) {
  try {
    const key = gen === 1 ? STORAGE_KEY_GEN1 : STORAGE_KEY_GEN2;
    localStorage.setItem(key, JSON.stringify(state || {}));
  } catch (err) {
    console.warn('Failed saving state to LocalStorage:', err);
  }
}

/**
 * Clears saved selections for a specific generation.
 */
export function clearLocalState(gen = 2) {
  try {
    const key = gen === 1 ? STORAGE_KEY_GEN1 : STORAGE_KEY_GEN2;
    localStorage.removeItem(key);
  } catch {}
}

/**
 * Generates a full shareable URL for current progress state.
 */
export function getShareableUrl(state) {
  const hash = encodeStateToHash(state);
  const url = new URL(window.location.href);
  url.hash = `locker=${hash}`;
  return url.toString();
}

/**
 * Loads redeemed secret codes list.
 */
export function loadRedeemedCodes() {
  try {
    const raw = localStorage.getItem('icharly-redeemed-codes');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Saves redeemed secret codes list.
 */
export function saveRedeemedCodes(codesList) {
  try {
    localStorage.setItem('icharly-redeemed-codes', JSON.stringify(codesList));
  } catch (err) {
    console.warn('Failed saving redeemed codes:', err);
  }
}
