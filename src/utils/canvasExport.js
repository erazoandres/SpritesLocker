/**
 * Converts a Blob object into an Image element loaded with a Base64 Data URI.
 */
function blobToImage(blob) {
  return new Promise((resolve) => {
    if (!blob) return resolve(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (!reader.result) return resolve(null);
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = reader.result; // Pure Base64 Data URI (Same-origin safe)
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(blob);
  });
}

/**
 * Safely fetches and converts an image URL into a Base64 Data URI using a strict 4-tier fallback pipeline.
 * GUARANTEES zero canvas tainting by resolving null if CORS verification fails.
 */
async function loadImageAsDataUrl(url) {
  if (!url) return null;

  // Tier 1: Direct CORS fetch
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (res.ok) {
      const blob = await res.blob();
      const img = await blobToImage(blob);
      if (img) return img;
    }
  } catch (err) {
    // Direct CORS fetch blocked
  }

  // Tier 2: Primary CORS Proxy (corsproxy.io)
  try {
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    const res = await fetch(proxyUrl);
    if (res.ok) {
      const blob = await res.blob();
      const img = await blobToImage(blob);
      if (img) return img;
    }
  } catch (err) {
    // Primary proxy failed
  }

  // Tier 3: Secondary CORS Proxy (allorigins.win)
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const res = await fetch(proxyUrl);
    if (res.ok) {
      const blob = await res.blob();
      const img = await blobToImage(blob);
      if (img) return img;
    }
  } catch (err) {
    // Secondary proxy failed
  }

  // Tier 4: Anonymous Image Loader (STRICT: resolve null on error to PREVENT canvas tainting)
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null); // Resolve NULL to guarantee zero canvas tainting!
    img.src = url;
  });
}

/**
 * Generates an HD PNG image containing EXCLUSIVELY the marked/selected spirits.
 * Attributed to EL CASILLERO · Andrés Erazo.
 */
export async function generateCollectionImage(spirits, state, generationNumber, filterType = 'todos') {
  // Filter dataset to include STRICTLY marked/selected spirits (status >= 1 || status === 3)
  const markedSpirits = spirits.filter(item => {
    const status = state[item.id] || 0;
    return status >= 1 || status === 3;
  });

  if (markedSpirits.length === 0) {
    throw new Error('Debes marcar al menos un espíritu para exportar la captura.');
  }

  // Preload Base64 Data URIs for all marked spirits
  const loadedImages = await Promise.all(
    markedSpirits.map(item => loadImageAsDataUrl(item.image))
  );

  const canvasWidth = 1600;
  const cols = Math.min(6, Math.max(1, markedSpirits.length));
  const cardPadding = 18;
  const cardWidth = Math.floor((canvasWidth - 120 - (cols - 1) * cardPadding) / cols);
  const cardHeight = 250;
  const rows = Math.ceil(markedSpirits.length / cols);
  const canvasHeight = 280 + rows * (cardHeight + cardPadding) + 60;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context no disponible');

  // Dark Cyber Background
  ctx.fillStyle = '#07080d';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Background Grid Lines
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvasWidth; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();
  }
  for (let y = 0; y < canvasHeight; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }

  // Header Title: EL CASILLERO
  ctx.fillStyle = '#b7ff24';
  ctx.font = '900 56px Arial, sans-serif';
  ctx.fillText('EL CASILLERO', 60, 75);

  ctx.fillStyle = '#00f0ff';
  ctx.font = '800 24px Arial, sans-serif';
  ctx.fillText(`CASILLERO DE ESPÍRITUS // GENERACIÓN ${generationNumber}`, 62, 115);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 18px Arial, sans-serif';
  ctx.fillText(`COLECCIÓN SELECCIONADA // ${markedSpirits.length} ESPÍRITUS // CREADO POR ANDRÉS ERAZO`, 62, 155);

  // Neon Accent Bar
  ctx.fillStyle = '#ff3bd4';
  ctx.fillRect(62, 175, 400, 6);

  // Status Labels
  const statusLabels = { 1: 'OBTENIDO', 2: 'DOMINADO', 3: 'FALTANTE' };

  for (let i = 0; i < markedSpirits.length; i++) {
    const item = markedSpirits[i];
    const img = loadedImages[i];
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 60 + col * (cardWidth + cardPadding);
    const y = 210 + row * (cardHeight + cardPadding);
    const status = state[item.id] || 0;

    // Card Fill
    ctx.fillStyle = status === 2 ? 'rgba(245, 158, 11, 0.18)' : status === 1 ? 'rgba(0, 240, 255, 0.14)' : 'rgba(244, 63, 94, 0.18)';
    ctx.fillRect(x, y, cardWidth, cardHeight);

    // Card Border
    ctx.strokeStyle = status === 2 ? '#f59e0b' : status === 1 ? '#00f0ff' : '#f43f5e';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, cardWidth, cardHeight);

    // Render Base64 Sprite Image Centered inside Card Box
    if (img && img.width > 0) {
      const imgMaxHeight = 125;
      const imgMaxWidth = cardWidth - 40;
      let drawW = img.width || 120;
      let drawH = img.height || 120;
      
      const ratio = Math.min(imgMaxWidth / drawW, imgMaxHeight / drawH);
      drawW = Math.floor(drawW * ratio);
      drawH = Math.floor(drawH * ratio);

      const imgX = Math.floor(x + (cardWidth - drawW) / 2);
      const imgY = Math.floor(y + 20 + (imgMaxHeight - drawH) / 2);

      try {
        ctx.drawImage(img, imgX, imgY, drawW, drawH);
      } catch (err) {
        console.warn(`Could not draw image for ${item.family}:`, err);
      }
    } else {
      // Fallback clean graphic badge (guarantees zero canvas tainting)
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.font = '900 32px Arial, sans-serif';
      ctx.fillText(item.family.slice(0, 2).toUpperCase(), x + cardWidth / 2, y + 90);
    }

    // Sprite Name & Details
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 18px Arial, sans-serif';
    ctx.fillText(item.family.toUpperCase(), x + cardWidth / 2, y + 175, cardWidth - 14);

    ctx.fillStyle = status === 2 ? '#f59e0b' : status === 1 ? '#00f0ff' : '#f43f5e';
    ctx.font = '800 13px Arial, sans-serif';
    ctx.fillText(`${item.variant.toUpperCase()} · ${statusLabels[status] || 'MARCADO'}`, x + cardWidth / 2, y + 200, cardWidth - 14);

    ctx.fillStyle = '#ff3bd4';
    ctx.font = '700 11px Arial, sans-serif';
    ctx.fillText(generationNumber === 2 ? 'GEN 2 // OVERRIDE' : 'GEN 1 // RUNNERS', x + cardWidth / 2, y + 222);
    ctx.textAlign = 'left';
  }

  // Footer Credit
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '700 16px Arial, sans-serif';
  ctx.fillText(`El Casillero · Andrés Erazo`, 60, canvasHeight - 25);

  let dataUrl;
  try {
    dataUrl = canvas.toDataURL('image/png');
  } catch (err) {
    console.error('Canvas export error:', err);
    dataUrl = canvas.toDataURL();
  }

  const filename = `el-casillero-andres-erazo-gen${generationNumber}.png`;
  return { dataUrl, filename };
}
