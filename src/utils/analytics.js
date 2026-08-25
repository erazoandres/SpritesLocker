/**
 * Production Live Visit Counter powered by Firebase Cloud Firestore REST API.
 * Project: tienda-c69be
 * Collection: visitas
 * Field: counter
 */

const PROJECT_ID = 'tienda-c69be';
const FIRESTORE_ROOT_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/visitas`;
const SESSION_KEY = 'el-casillero-session-visit';

export async function trackVisit() {
  const isVisited = sessionStorage.getItem(SESSION_KEY);
  let maxCount = 0;
  let targetDocUrls = [];

  try {
    // Query all documents in collection 'visitas'
    const rootRes = await fetch(FIRESTORE_ROOT_URL);
    if (rootRes.ok) {
      const rootData = await rootRes.json();
      if (rootData.documents && rootData.documents.length > 0) {
        for (const doc of rootData.documents) {
          const docUrl = `https://firestore.googleapis.com/v1/${doc.name}`;
          targetDocUrls.push(docUrl);
          if (doc.fields && doc.fields.counter) {
            const countVal = Number(doc.fields.counter.integerValue || doc.fields.counter.doubleValue || 0);
            if (countVal > maxCount) {
              maxCount = countVal;
            }
          }
        }
      }
    }

    // Direct fallback if collection query returned empty
    if (targetDocUrls.length === 0) {
      const fallbackUrl = `${FIRESTORE_ROOT_URL}/RnCEfre2MY2xOdG0NqrS`;
      targetDocUrls.push(fallbackUrl);
      const docRes = await fetch(fallbackUrl);
      if (docRes.ok) {
        const docData = await docRes.json();
        if (docData.fields && docData.fields.counter) {
          maxCount = Number(docData.fields.counter.integerValue || docData.fields.counter.doubleValue || 0);
        }
      }
    }

    // Ensure baseline count never drops below 25
    if (maxCount < 25) {
      maxCount = 25;
    }

    if (!isVisited) {
      maxCount += 1;
      // Synchronize counter across all document endpoints in 'visitas'
      await Promise.all(
        targetDocUrls.map(url =>
          fetch(`${url}?updateMask.fieldPaths=counter`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fields: {
                counter: { integerValue: String(maxCount) }
              }
            })
          }).catch(() => {})
        )
      );
      sessionStorage.setItem(SESSION_KEY, 'true');
    }

    return maxCount;
  } catch (err) {
    console.warn('Firestore visit tracking error:', err);
    return Math.max(maxCount, 25);
  }
}
