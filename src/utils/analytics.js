/**
 * Dual-Engine Production Visit Counter powered by Firebase Firestore REST API.
 * Project: tienda-c69be
 * Collection: visitas
 * Document: RnCEfre2MY2xOdG0NqrS
 * Field: counter
 */

const PROJECT_ID = 'tienda-c69be';
const FIRESTORE_DOC_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/visitas/RnCEfre2MY2xOdG0NqrS`;
const FIRESTORE_ROOT_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/visitas`;

const SESSION_KEY = 'el-casillero-session-visit';

export async function trackVisit() {
  const isVisited = sessionStorage.getItem(SESSION_KEY);
  let currentCount = 0;
  let firestoreSuccess = false;
  let targetDocUrl = FIRESTORE_DOC_URL;

  // TIER 1: Query Firebase Firestore REST API Document
  try {
    let fsRes = await fetch(FIRESTORE_DOC_URL);

    if (fsRes.ok) {
      const fsData = await fsRes.json();
      if (fsData && fsData.fields && fsData.fields.counter) {
        currentCount = Number(fsData.fields.counter.integerValue || fsData.fields.counter.doubleValue || 0);
        firestoreSuccess = true;
      }
    } else {
      // Document fallback: check if another document exists in 'visitas'
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

  return null;
}
