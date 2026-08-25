/**
 * Real Production Visit Counter powered by Firebase Realtime Database / Firestore.
 * Project: EL CASILLERO · Andrés Erazo
 */

// Firebase Realtime Database REST endpoint (configurable via .env or direct URL)
const FIREBASE_DB_URL = import.meta.env.VITE_FIREBASE_DB_URL || 'https://el-casillero-visitas-default-rtdb.firebaseio.com';
const SESSION_KEY = 'el-casillero-session-visit';

export async function trackVisit() {
  const isVisited = sessionStorage.getItem(SESSION_KEY);
  
  try {
    // 1. Fetch current visit count from Firebase Realtime Database
    const res = await fetch(`${FIREBASE_DB_URL}/visitas.json`);
    let currentCount = 0;
    
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object' && data.count !== undefined) {
        currentCount = Number(data.count) || 0;
      } else if (typeof data === 'number') {
        currentCount = data;
      }
    }

    // 2. If new user session, increment count in Firebase
    if (!isVisited) {
      currentCount = Math.max(1, currentCount + 1);
      await fetch(`${FIREBASE_DB_URL}/visitas.json`, {
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

  // Backup fallback REST counter if Firebase DB URL is unconfigured
  try {
    const backupRes = await fetch(`https://api.counterapi.dev/v1/erazoandres-sprites-locker/total-visits/${isVisited ? 'get' : 'up'}`);
    if (backupRes.ok) {
      const data = await backupRes.json();
      sessionStorage.setItem(SESSION_KEY, 'true');
      return data.count || data.value || 0;
    }
  } catch {}

  return null;
}
