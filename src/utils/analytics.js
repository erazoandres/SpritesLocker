/**
 * Global Visit Tracking Utility for EL CASILLERO · Andrés Erazo.
 * Uses a lightweight REST counter API with session de-duplication to track visits.
 */
const NAMESPACE = 'erazoandres-sprites-locker';
const KEY = 'total-visits';
const SESSION_STORAGE_KEY = 'el-casillero-visited-session';

export async function trackVisit() {
  const isVisited = sessionStorage.getItem(SESSION_STORAGE_KEY);
  
  try {
    // Determine whether to increment hit or read count based on session
    const action = isVisited ? 'get' : 'up';
    const response = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/${action}`);
    
    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
      return data.count || data.value || 0;
    }
  } catch (err) {
    // Backup counter endpoint
    try {
      const backupRes = await fetch(`https://api.countapi.xyz/${isVisited ? 'get' : 'hit'}/${NAMESPACE}/${KEY}`);
      if (backupRes.ok) {
        const backupData = await backupRes.json();
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
        return backupData.value || 0;
      }
    } catch {}
  }

  return null;
}
