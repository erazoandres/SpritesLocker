/**
 * ISOLATED STANDALONE TEST SCRIPT: test_100_visits.js
 * 
 * Purpose: Simulates 100 isolated visits to the website https://spriteslocker.vercel.app/
 * and increments the live Firebase visit counter by 100 in real-time.
 * 
 * Usage: node scripts/test_100_visits.js
 */

const TARGET_URL = 'https://spriteslocker.vercel.app/';
const PROJECT_ID = 'tienda-c69be';
const FIRESTORE_DOCS = [
  `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/visitas/RnCEfre2MY2xOdG0NqrS`,
  `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/visitas/contador`
];

async function getLiveCounter() {
  let maxCount = 0;
  for (const docUrl of FIRESTORE_DOCS) {
    try {
      const res = await fetch(docUrl);
      if (res.ok) {
        const data = await res.json();
        if (data.fields && data.fields.counter) {
          const val = Number(data.fields.counter.integerValue || data.fields.counter.doubleValue || 0);
          if (val > maxCount) maxCount = val;
        }
      }
    } catch {}
  }
  return Math.max(maxCount, 25);
}

async function updateLiveCounter(newCount) {
  const patchBody = JSON.stringify({
    fields: {
      counter: { integerValue: String(newCount) }
    }
  });

  await Promise.all(
    FIRESTORE_DOCS.map(docUrl =>
      fetch(`${docUrl}?updateMask.fieldPaths=counter`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: patchBody
      }).catch(() => {})
    )
  );
}

async function run100VisitsTest() {
  console.log('====================================================');
  console.log('🚀 INICIANDO PRUEBA AISLADA DE 100 VISITAS');
  console.log(`🌐 Objetivo: ${TARGET_URL}`);
  console.log('====================================================\n');

  let currentCount = await getLiveCounter();
  console.log(`📊 Contador de visitas inicial en Firebase: ${currentCount}\n`);

  for (let i = 1; i <= 100; i++) {
    try {
      // 1. Send HTTP GET request to target website
      await fetch(TARGET_URL, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TestBot/1.0' }
      });

      // 2. Increment visit counter by 1
      currentCount += 1;
      await updateLiveCounter(currentCount);

      const percent = Math.round((i / 100) * 100);
      console.log(`[TEST ${String(i).padStart(3, ' ')}/100] (${percent}%) 👁️ Visita simulada -> Contador en vivo: ${currentCount}`);
    } catch (err) {
      console.error(`[TEST ${i}/100] ❌ Error en la visita ${i}:`, err.message);
    }
  }

  console.log('\n====================================================');
  console.log(`✅ PRUEBA COMPLETADA CON ÉXITO: 100 Visitas ejecutadas`);
  console.log(`📈 Contador final de visitas en vivo en Firebase: ${currentCount}`);
  console.log('====================================================');
}

run100VisitsTest();
