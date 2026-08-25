/**
 * Real Production Visit Counter powered by Firebase Realtime Database.
 * Firebase Project: tienda-c69be (Andrés Erazo)
 */

const FIREBASE_PRIMARY_URL = 'https://tienda-c69be-default-rtdb.firebaseio.com';
const FIREBASE_FALLBACK_URL = 'https://tienda-c69be.firebaseio.com';
const SESSION_KEY = 'el-casillero-session-visit';

export async function trackVisit() {
  const isVisited = sessionStorage.getItem(SESSION_KEY);
  let dbUrl = FIREBASE_PRIMARY_URL;
  
  try {
    // 1. Fetch current visit count from your Firebase Project tienda-c69be
    let res = await fetch(`${dbUrl}/visitas.json`);
    if (!res.ok) {
      dbUrl = FIREBASE_FALLBACK_URL;
      res = await fetch(`${dbUrl}/visitas.json`);
    }

    let currentCount = 0;
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object' && data.count !== undefined) {
        currentCount = Number(data.count) || 0;
      } else if (typeof data === 'number') {
        currentCount = data;
      }
    }

    // 2. If new user session, increment count in your Firebase Database
    if (!isVisited) {
      currentCount = Math.max(1, currentCount + 1);
      await fetch(`${dbUrl}/visitas.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: currentCount, lastUpdated: new Date().toISOString() })
      });
      sessionStorage.setItem(SESSION_KEY, 'true');
    }

    return currentCount;
  } catch (err) {
    console.warn('Firebase counter error:', err);
  }

  return null;
}
