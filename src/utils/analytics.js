/**
 * Dual-Engine Production Visit Counter powered by Firebase Firestore & Realtime Database.
 * Project: tienda-c69be
 * Collection: visitas
 * Field: counter
 */

const PROJECT_ID = 'tienda-c69be';
const FIRESTORE_DOC_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/visitas/contador`;
const FIRESTORE_ROOT_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/visitas`;
const RTDB_URL = `https://${PROJECT_ID}-default-rtdb.firebaseio.com/visitas.json`;

const SESSION_KEY = 'el-casillero-session-visit';

export async function trackVisit() {
  const isVisited = sessionStorage.getItem(SESSION_KEY);
  let currentCount = 0;
  let firestoreSuccess = false;

  // TIER 1: Try Cloud Firestore REST API (Collection: 'visitas', Field: 'counter')
  try {
    let targetDocUrl = FIRESTORE_DOC_URL;
    let fsRes = await fetch(FIRESTORE_DOC_URL);

    if (fsRes.ok) {
      const fsData = await fsRes.json();
      if (fsData && fsData.fields && fsData.fields.counter) {
        currentCount = Number(fsData.fields.counter.integerValue || fsData.fields.counter.doubleValue || 0);
        firestoreSuccess = true;
      }
    } else {
      // Document 'contador' not found, check if another document exists in 'visitas'
      const rootRes = await fetch(FIRESTORE_ROOT_URL);
      if (rootRes.ok) {
        const rootData = await rootRes.json();
        if (rootData.documents && rootData.documents.length > 0) {
          const doc = rootData.documents[0];
          targetDocUrl = `https://firestore.googleapis.com/v1/${doc.name}`;
          if (doc.fields && doc.fields.counter) {
            currentCount = Number(doc.fields.counter.integerValue || doc.fields.counter.doubleValue || 0);
            firestoreSuccess = true;
          }
        }
      }
    }

    if (firestoreSuccess) {
      if (!isVisited) {
        currentCount += 1;
        await fetch(`${targetDocUrl}?updateMask.fieldPaths=counter`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: {
              counter: { integerValue: String(currentCount) }
            }
          })
        });
        sessionStorage.setItem(SESSION_KEY, 'true');
      }
      return currentCount;
    }
  } catch (err) {
    console.warn('Firestore counter error:', err);
  }

  // TIER 2: Try Realtime Database REST API (Node: 'visitas', Field: 'counter')
  try {
    const rtdbRes = await fetch(RTDB_URL);
    if (rtdbRes.ok) {
      const data = await rtdbRes.json();
      if (data && typeof data === 'object') {
        currentCount = Number(data.counter ?? data.count ?? 0);
      } else if (typeof data === 'number') {
        currentCount = data;
      }

      if (!isVisited) {
        currentCount += 1;
        await fetch(RTDB_URL, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ counter: currentCount, lastUpdated: new Date().toISOString() })
        });
        sessionStorage.setItem(SESSION_KEY, 'true');
      }
      return currentCount;
    }
  } catch (err) {
    console.warn('Realtime DB counter error:', err);
  }

  // TIER 3: Backup REST counter fallback
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
