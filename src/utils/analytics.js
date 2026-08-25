/**
 * Anti-Inflation Unique Device Live Visit Counter powered by Firebase Firestore REST API.
 * Project: tienda-c69be
 * Collection: visitas
 * Field: counter
 * 
 * Features Device-Lock Protection: Prevents repeat requests from the same computer/browser
 * from inflating or duplicating visit counts.
 */

const PROJECT_ID = 'tienda-c69be';
const FIRESTORE_ROOT_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/visitas`;
const DEVICE_LOCK_KEY = 'el-casillero-device-visit-registered';
const SESSION_LOCK_KEY = 'el-casillero-session-visit-registered';

export async function trackVisit() {
  let isDeviceRegistered = false;
  try {
    isDeviceRegistered = Boolean(
      localStorage.getItem(DEVICE_LOCK_KEY) || sessionStorage.getItem(SESSION_LOCK_KEY)
    );
  } catch {}

  let maxCount = 19;
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

    // ANTI-INFLATION DEVICE LOCK: If this computer/browser has ALREADY registered a visit, DO NOT INCREMENT!
    if (isDeviceRegistered) {
      return maxCount;
    }

    // Only NEW computers/devices increment the global counter by 1
    maxCount += 1;
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

    // Lock device so future reloads/visits from this computer NEVER inflate the count
    try {
      localStorage.setItem(DEVICE_LOCK_KEY, 'true');
      sessionStorage.setItem(SESSION_LOCK_KEY, 'true');
    } catch {}

    return maxCount;
  } catch (err) {
    console.warn('Firestore visit tracking error:', err);
    return maxCount;
  }
}
