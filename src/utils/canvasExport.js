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

  // Tier 1: Direct same-origin or CORS fetch
  try {
    const res = await fetch(url);
    if (res.ok) {
      const blob = await res.blob();
      const img = await blobToImage(blob);
      if (img) return img;
    }
  } catch (err) {
    // Direct fetch blocked
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
 * Generates Fortnite.GG Poster style matrix export image (10 columns, dual family block layout, checkbox indicators & crowns)
 */
async function generatePosterCollectionImage(spirits, state, generationNumber, totalVisits = null, totalExports = null) {
  const VARIANT_COLUMNS = ['Base', 'Oro', 'Maestro de Trucos', 'Hacker de botín', 'Cazarrecompensas'];
  
  // Group spirits by family
  const familyNames = Array.from(new Set(spirits.map(s => s.family)));
  const halfCount = Math.ceil(familyNames.length / 2);
  const leftFamilies = familyNames.slice(0, halfCount);
  const rightFamilies = familyNames.slice(halfCount);

  // Preload Base64 Data URIs for ALL spirits
  const loadedImagesMap = {};
  await Promise.all(
    spirits.map(async item => {
      const img = await loadImageAsDataUrl(item.image);
      if (img) loadedImagesMap[item.id] = img;
    })
  );

  // Statistics
  let countObtained = 0;
  let countMastered = 0;
  spirits.forEach(s => {
    const st = state[s.id] || 0;
    if (st >= 1) countObtained++;
    if (st === 2) countMastered++;
  });

  const canvasWidth = 1400;
  const leftMargin = 50;
  const rightMargin = 50;
  const centerGap = 40;
  const blockWidth = Math.floor((canvasWidth - leftMargin - rightMargin - centerGap) / 2);
  const colWidth = Math.floor(blockWidth / 5);
  const rowHeight = 135;
  const maxRows = Math.max(leftFamilies.length, rightFamilies.length);
  const headerHeight = 150;
  const footerHeight = 60;
  const canvasHeight = headerHeight + maxRows * rowHeight + footerHeight;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context no disponible');

  // Background: Dark Armory Room texture & gradient
  const bgGradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  bgGradient.addColorStop(0, '#0a0c14');
  bgGradient.addColorStop(0.5, '#0f1220');
  bgGradient.addColorStop(1, '#141627');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Ambient Lighting Spotlights
  const lightLeft = ctx.createRadialGradient(canvasWidth * 0.25, 200, 50, canvasWidth * 0.25, 200, 600);
  lightLeft.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
  lightLeft.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = lightLeft;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const lightRight = ctx.createRadialGradient(canvasWidth * 0.75, 200, 50, canvasWidth * 0.75, 200, 600);
  lightRight.addColorStop(0, 'rgba(245, 158, 11, 0.12)');
  lightRight.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = lightRight;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // --- HEADER SECTION ---
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 32px "Space Grotesk", Arial, sans-serif';
  ctx.fillText(`MATRIZ · EL CASILLERO`, canvasWidth / 2, 48);

  ctx.font = '600 13px "JetBrains Mono", monospace';
  ctx.fillStyle = '#a78bfa';
  ctx.fillText(`GENERACIÓN ${generationNumber} OVERRIDE`, canvasWidth / 2, 68);

  // Top Stat Badges (OWNED & MASTERED)
  const badgeY = 82;
  const badgeW = 120;
  const badgeH = 46;
  const badgeGap = 20;
  const badgeStartX = canvasWidth / 2 - badgeW - badgeGap / 2;

  // Box 1: OWNED
  ctx.fillStyle = 'rgba(20, 24, 40, 0.95)';
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(badgeStartX, badgeY, badgeW, badgeH, 10);
  ctx.fill();
  ctx.stroke();

  ctx.font = '900 15px "JetBrains Mono", monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${countObtained} / ${spirits.length}`, badgeStartX + badgeW / 2, badgeY + 22);
  ctx.font = '800 10px "JetBrains Mono", monospace';
  ctx.fillStyle = '#10b981';
  ctx.fillText('OBTENIDOS', badgeStartX + badgeW / 2, badgeY + 37);

  // Box 2: MASTERED
  const badge2X = badgeStartX + badgeW + badgeGap;
  ctx.fillStyle = 'rgba(20, 24, 40, 0.95)';
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
  ctx.beginPath();
  ctx.roundRect(badge2X, badgeY, badgeW, badgeH, 10);
  ctx.fill();
  ctx.stroke();

  ctx.font = '900 15px "JetBrains Mono", monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${countMastered} / ${spirits.length}`, badge2X + badgeW / 2, badgeY + 22);
  ctx.font = '800 10px "JetBrains Mono", monospace';
  ctx.fillStyle = '#f59e0b';
  ctx.fillText('DOMINADOS', badge2X + badgeW / 2, badgeY + 37);

  ctx.textAlign = 'left';

  // --- GRID RENDER FUNCTION ---
  const renderFamilyBlock = (familiesList, blockStartX) => {
    familiesList.forEach((famName, rowIndex) => {
      const famSpirits = spirits.filter(s => s.family === famName);
      
      VARIANT_COLUMNS.forEach((variantName, colIndex) => {
        const spirit = famSpirits.find(s => s.variant === variantName) || (variantName === 'Base' && famSpirits.length === 1 ? famSpirits[0] : null);
        const cellX = blockStartX + colIndex * colWidth;
        const cellY = headerHeight + rowIndex * rowHeight;

        if (!spirit) return;

        const status = state[spirit.id] ?? 0;
        const img = loadedImagesMap[spirit.id];

        // 1. Draw Spirit PNG Render
        if (img && img.width > 0) {
          const maxImgW = colWidth - 16;
          const maxImgH = 80;
          let drawW = img.width;
          let drawH = img.height;
          const ratio = Math.min(maxImgW / drawW, maxImgH / drawH);
          drawW = Math.floor(drawW * ratio);
          drawH = Math.floor(drawH * ratio);

          const imgX = Math.floor(cellX + (colWidth - drawW) / 2);
          const imgY = Math.floor(cellY + 12 + (maxImgH - drawH) / 2);

          // If status === 0 (unobtained), render with slight opacity
          if (status === 0) ctx.globalAlpha = 0.45;
          ctx.drawImage(img, imgX, imgY, drawW, drawH);
          ctx.globalAlpha = 1.0;

          // 2. If status === 2 (Mastered), draw Golden Crown atop head
          if (status === 2) {
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            const crownX = cellX + colWidth / 2;
            const crownY = cellY + 4;
            ctx.moveTo(crownX - 7, crownY + 8);
            ctx.lineTo(crownX - 9, crownY);
            ctx.lineTo(crownX - 3, crownY + 4);
            ctx.lineTo(crownX, crownY - 1);
            ctx.lineTo(crownX + 3, crownY + 4);
            ctx.lineTo(crownX + 9, crownY);
            ctx.lineTo(crownX + 7, crownY + 8);
            ctx.closePath();
            ctx.fill();
          }
        }

        // 3. Draw Checkbox Badge at bottom center of cell
        const boxSize = 20;
        const boxX = Math.floor(cellX + (colWidth - boxSize) / 2);
        const boxY = cellY + rowHeight - 32;

        if (status === 1) {
          // TENGO (Emerald Checkbox)
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.roundRect(boxX, boxY, boxSize, boxSize, 5);
          ctx.fill();

          ctx.textAlign = 'center';
          ctx.fillStyle = '#090a0f';
          ctx.font = '900 13px Arial, sans-serif';
          ctx.fillText('✓', boxX + boxSize / 2, boxY + 14);
        } else if (status === 2) {
          // DOMINADO (Gold Checkbox with Crown)
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.roundRect(boxX, boxY, boxSize, boxSize, 5);
          ctx.fill();

          ctx.textAlign = 'center';
          ctx.fillStyle = '#090a0f';
          ctx.font = '900 13px Arial, sans-serif';
          ctx.fillText('✓', boxX + boxSize / 2, boxY + 14);
        } else if (status === 3) {
          // FALTANTE (Rose Checkbox)
          ctx.fillStyle = '#f43f5e';
          ctx.beginPath();
          ctx.roundRect(boxX, boxY, boxSize, boxSize, 5);
          ctx.fill();

          ctx.textAlign = 'center';
          ctx.fillStyle = '#ffffff';
          ctx.font = '900 13px Arial, sans-serif';
          ctx.fillText('✗', boxX + boxSize / 2, boxY + 14);
        } else {
          // UNCHECKED / SIN MARCAR (Dashed / Dimmed Box)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(boxX, boxY, boxSize, boxSize, 5);
          ctx.fill();
          ctx.stroke();
        }
        ctx.textAlign = 'left';
      });
    });
  };

  // Render Left Family Block (5 Columns)
  renderFamilyBlock(leftFamilies, leftMargin);

  // Render Right Family Block (5 Columns)
  renderFamilyBlock(rightFamilies, leftMargin + blockWidth + centerGap);

  // --- FOOTER SECTION ---
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(leftMargin, canvasHeight - 45);
  ctx.lineTo(canvasWidth - rightMargin, canvasHeight - 45);
  ctx.stroke();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '600 13px "JetBrains Mono", monospace';
  ctx.fillText('EL CASILLERO DE ESPÍRITUS · CREADO POR ANDRÉS ERAZO', leftMargin, canvasHeight - 18);

  // HIGH-VISIBILITY APP CTA BADGE (Bottom Right Corner)
  const ctaW = 460;
  const ctaH = 34;
  const ctaX = canvasWidth - rightMargin - ctaW;
  const ctaY = canvasHeight - 35;

  ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(ctaX, ctaY, ctaW, ctaH, 8);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.font = '800 12px "JetBrains Mono", monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('🔥 ¡CRÉA EL TUYO Y MARCA TUS ESPÍRITUS! ➔', ctaX + 155, ctaY + 21);
  ctx.fillStyle = '#a3e635';
  ctx.font = '900 13px "JetBrains Mono", monospace';
  ctx.fillText('spriteslocker.vercel.app', ctaX + 370, ctaY + 21);
  ctx.textAlign = 'left';

  let dataUrl;
  try {
    dataUrl = canvas.toDataURL('image/png');
  } catch (err) {
    dataUrl = canvas.toDataURL();
  }

  const filename = `el-casillero-matriz-gen${generationNumber}.png`;
  return { dataUrl, filename };
}

/**
 * Generates an HD PNG poster image containing EXCLUSIVELY the marked/selected spirits.
 * Styled in Obsidian Neon Emerald & Hyper Violet aesthetic.
 * Stamps official Vercel call-to-action watermark: 'INGRESA A: https://spriteslocker.vercel.app/'
 */
export async function generateCollectionImage(spirits, state, generationNumber, filterType = 'todos', totalVisits = null, totalExports = null, formatType = 'standard') {
  if (formatType === 'poster') {
    return generatePosterCollectionImage(spirits, state, generationNumber, totalVisits, totalExports);
  }

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
  const canvasHeight = 280 + rows * (cardHeight + cardPadding) + 70;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context no disponible');

  // Background: Obsidian Midnight Violet Gradient
  const bgGradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  bgGradient.addColorStop(0, '#0a0b12');
  bgGradient.addColorStop(0.5, '#0f1220');
  bgGradient.addColorStop(1, '#161329');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Ambient Neon Aura Lights
  const aura1 = ctx.createRadialGradient(200, 150, 20, 200, 150, 450);
  aura1.addColorStop(0, 'rgba(16, 185, 129, 0.18)');
  aura1.addColorStop(1, 'rgba(16, 185, 129, 0)');
  ctx.fillStyle = aura1;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const aura2 = ctx.createRadialGradient(canvasWidth - 250, 180, 20, canvasWidth - 250, 180, 500);
  aura2.addColorStop(0, 'rgba(139, 92, 246, 0.18)');
  aura2.addColorStop(1, 'rgba(139, 92, 246, 0)');
  ctx.fillStyle = aura2;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Background Diagonal Tech Accent Lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  for (let x = -canvasHeight; x < canvasWidth; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + canvasHeight, canvasHeight);
    ctx.stroke();
  }

  // Header Title: EL CASILLERO
  ctx.fillStyle = '#10b981';
  ctx.font = '900 56px "Space Grotesk", Arial, sans-serif';
  ctx.fillText('EL CASILLERO', 60, 75);

  // Subtitle / Attribution: BY ANDRÉS ERAZO
  ctx.fillStyle = '#a3e635';
  ctx.font = '800 20px "JetBrains Mono", monospace';
  ctx.fillText('BY ANDRÉS ERAZO', 62, 105);

  // Generation Badge Tag
  ctx.fillStyle = '#a78bfa';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText(`GENERACIÓN ${generationNumber} // ${generationNumber === 2 ? 'OVERRIDE' : 'RUNNERS'}`, 62, 140);

  // Statistics Summary Badge (Obtenidos, Dominados, Faltantes)
  let countObtained = 0;
  let countMastered = 0;
  let countMissing = 0;
  markedSpirits.forEach(s => {
    const st = state[s.id] || 0;
    if (st === 1) countObtained++;
    if (st === 2) countMastered++;
    if (st === 3) countMissing++;
  });

  // TOP-RIGHT HIGH-VISIBILITY APP INVITATION CARD
  const topCtaW = 520;
  const topCtaH = 92;
  const topCtaX = canvasWidth - 60 - topCtaW;
  const topCtaY = 52;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(topCtaX, topCtaY, topCtaW, topCtaH, 14);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 16px "Space Grotesk", Arial, sans-serif';
  ctx.fillText('🔥 ¡MARCA TUS ESPÍRITUS Y ARMA TU CASILLERO!', topCtaX + topCtaW / 2, topCtaY + 36);

  ctx.fillStyle = '#a3e635';
  ctx.font = '900 18px "JetBrains Mono", monospace';
  ctx.fillText('👉 https://spriteslocker.vercel.app/', topCtaX + topCtaW / 2, topCtaY + 68);
  ctx.textAlign = 'left';

  ctx.fillStyle = 'rgba(18, 21, 36, 0.8)';
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(60, 160, 680, 36, 10);
  ctx.fill();
  ctx.stroke();

  ctx.font = '700 13px "JetBrains Mono", monospace';
  ctx.fillStyle = '#10b981';
  ctx.fillText(`✓ OBTENIDOS: ${countObtained}`, 75, 183);
  ctx.fillStyle = '#f59e0b';
  ctx.fillText(`★ DOMINADOS: ${countMastered}`, 240, 183);
  ctx.fillStyle = '#f43f5e';
  ctx.fillText(`✗ FALTANTES: ${countMissing}`, 410, 183);
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`TOTAL: ${markedSpirits.length}`, 580, 183);



  // Status Labels & Colors
  const statusColors = {
    1: { fill: 'rgba(16, 185, 129, 0.14)', stroke: '#10b981', badgeBg: '#10b981', text: '#10b981', label: '✓ TENGO' },
    2: { fill: 'rgba(245, 158, 11, 0.18)', stroke: '#f59e0b', badgeBg: '#f59e0b', text: '#f59e0b', label: '★ DOMINADO' },
    3: { fill: 'rgba(244, 63, 94, 0.18)', stroke: '#f43f5e', badgeBg: '#f43f5e', text: '#f43f5e', label: '✗ FALTANTE' }
  };

  for (let i = 0; i < markedSpirits.length; i++) {
    const item = markedSpirits[i];
    const img = loadedImages[i];
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 60 + col * (cardWidth + cardPadding);
    const y = 220 + row * (cardHeight + cardPadding);
    const status = state[item.id] || 1;
    const cfg = statusColors[status] || statusColors[1];

    // Card Fill (Rounded Corners)
    ctx.fillStyle = cfg.fill;
    ctx.beginPath();
    ctx.roundRect(x, y, cardWidth, cardHeight, 16);
    ctx.fill();

    // Card Border
    ctx.strokeStyle = cfg.stroke;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Top Status Pill Badge
    ctx.fillStyle = cfg.badgeBg;
    ctx.beginPath();
    ctx.roundRect(x + cardWidth - 105, y + 12, 92, 22, 6);
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#090a0f';
    ctx.font = '800 10px "JetBrains Mono", monospace';
    ctx.fillText(cfg.label, x + cardWidth - 59, y + 27);
    ctx.textAlign = 'left';

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
      const imgY = Math.floor(y + 25 + (imgMaxHeight - drawH) / 2);

      try {
        ctx.drawImage(img, imgX, imgY, drawW, drawH);
      } catch (err) {
        console.warn(`Could not draw image for ${item.family}:`, err);
      }
    } else {
      // Fallback clean graphic badge
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.font = '900 32px "Space Grotesk", sans-serif';
      ctx.fillText(item.family.slice(0, 2).toUpperCase(), x + cardWidth / 2, y + 95);
    }

    // Sprite Name & Variant Details
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f8fafc';
    ctx.font = '700 17px "Space Grotesk", Arial, sans-serif';
    ctx.fillText(item.family.toUpperCase(), x + cardWidth / 2, y + 180, cardWidth - 14);

    ctx.fillStyle = cfg.text;
    ctx.font = '700 13px "JetBrains Mono", monospace';
    ctx.fillText(item.variant.toUpperCase(), x + cardWidth / 2, y + 204, cardWidth - 14);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.fillText(generationNumber === 2 ? 'GEN 2 · OVERRIDE' : 'GEN 1 · RUNNERS', x + cardWidth / 2, y + 226);
    ctx.textAlign = 'left';
  }

  // Footer Divider Line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, canvasHeight - 45);
  ctx.lineTo(canvasWidth - 60, canvasHeight - 45);
  ctx.stroke();

  // Footer Credit (Left Side)
  ctx.fillStyle = 'rgba(248, 250, 252, 0.7)';
  ctx.font = '600 15px "Outfit", sans-serif';
  ctx.fillText('EL CASILLERO · Andrés Erazo', 60, canvasHeight - 20);

  // HIGH-VISIBILITY APP CTA BADGE (Bottom Right Corner)
  const ctaW = 540;
  const ctaH = 38;
  const ctaX = canvasWidth - 60 - ctaW;
  const ctaY = canvasHeight - 44;

  ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(ctaX, ctaY, ctaW, ctaH, 10);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.font = '800 13px "JetBrains Mono", monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('⚡ ¡PRUEBA LA APP Y CREA EL TUYO! ➔', ctaX + 145, ctaY + 24);
  ctx.fillStyle = '#a3e635';
  ctx.font = '900 14px "JetBrains Mono", monospace';
  ctx.fillText('spriteslocker.vercel.app', ctaX + 415, ctaY + 24);
  ctx.textAlign = 'left';

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
