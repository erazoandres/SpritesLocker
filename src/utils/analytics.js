/**
 * Production Live Visit & Export Counter powered by Firebase Cloud Firestore REST API.
 * Project: tienda-c69be
 * Collection: visitas
 * Document Visitas: RnCEfre2MY2xOdG0NqrS & contador (Field: counter)
 * Document Exportaciones: BAmrUK0Bk8D9FTjWkCYZ (Field: exportaciones)
 */

const PROJECT_ID = 'tienda-c69be';
const FIRESTORE_ROOT_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/visitas`;
const EXPORT_DOC_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/visitas/BAmrUK0Bk8D9FTjWkCYZ`;

const DEVICE_LOCK_KEY = 'el-casillero-device-visit-registered';
const SESSION_LOCK_KEY = 'el-casillero-session-visit-registered';

/**
 * Tracks and returns total visits count with Device-Lock protection against duplicate visits
 */
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
          if (doc.name.endsWith('BAmrUK0Bk8D9FTjWkCYZ')) continue; // Skip exports doc
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

    if (targetDocUrls.length === 0) {
      const fallbackUrl = `${FIRESTORE_ROOT_URL}/RnCEfre2MY2xOdG0NqrS`;
      targetDocUrls.push(fallbackUrl);
    }

    // Device-Lock Anti-Inflation: If computer has already registered, return count without patching
    if (isDeviceRegistered) {
      return maxCount;
    }

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

/**
 * Fetches current export count from Firestore document BAmrUK0Bk8D9FTjWkCYZ (field: exportaciones)
 */
export async function fetchExportCount() {
  try {
    const res = await fetch(EXPORT_DOC_URL);
    if (res.ok) {
      const data = await res.json();
      if (data.fields && data.fields.exportaciones) {
        return Number(data.fields.exportaciones.integerValue || data.fields.exportaciones.doubleValue || 0);
      }
    }
  } catch (err) {
    console.warn('Firestore fetch export count error:', err);
  }
  return 0;
}

/**
 * Increments live export counter in Firestore document BAmrUK0Bk8D9FTjWkCYZ (field: exportaciones)
 */
export async function trackExport() {
  try {
    let current = await fetchExportCount();
    current += 1;
    await fetch(`${EXPORT_DOC_URL}?updateMask.fieldPaths=exportaciones`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          exportaciones: { integerValue: String(current) }
        }
      })
    });
    return current;
  } catch (err) {
    console.warn('Firestore track export error:', err);
    return null;
  }
}
