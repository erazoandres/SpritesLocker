import React, { useState, useEffect } from 'react';
import { X, Download, Share2, Loader2, CheckCircle2 } from 'lucide-react';
import { generateCollectionImage } from '../utils/canvasExport';

export default function ExportModal({ spirits, userState, activeGen, totalVisits, onClose, onShowToast }) {
  const [loading, setLoading] = useState(true);
  const [exportResult, setExportResult] = useState(null);

  // Automatically generate PNG image for full collection on mount (Zero options)
  useEffect(() => {
    let active = true;
    async function runExport() {
      try {
        const result = await generateCollectionImage(spirits, userState, activeGen, 'todos', totalVisits);
        if (active) {
          setExportResult(result);
        }
      } catch (err) {
        console.error(err);
        if (active) alert(err.message || 'Error al generar la imagen.');
      } finally {
        if (active) setLoading(false);
      }
    }
    runExport();
    return () => { active = false; };
  }, [spirits, userState, activeGen, totalVisits]);

  const handleDownload = () => {
    if (!exportResult) return;
    const a = document.createElement('a');
    a.href = exportResult.dataUrl;
    a.download = exportResult.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    onShowToast('Imagen descargada correctamente');
  };

  const handleShare = async () => {
    if (!exportResult) return;
    if (navigator.share && exportResult.filename) {
      try {
        const response = await fetch(exportResult.dataUrl);
        const blob = await response.blob();
        const file = new File([blob], exportResult.filename, { type: 'image/png' });
        await navigator.share({
          files: [file],
          title: `Casillero de Espíritus Generación ${activeGen}`,
          text: `¡Mira mi colección de Espíritus de Fortnite Override!`
        });
        onShowToast('Menú de compartir abierto');
      } catch (err) {
        if (err.name !== 'AbortError') handleDownload();
      }
    } else {
      handleDownload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" />
            <span>EXPORT / GEN_{activeGen.toString().padStart(2, '0')}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
            COLECCIÓN EXPORTADA A IMAGEN
          </h2>
          <p className="text-xs text-slate-400">
            Tu casillero de espíritus ha sido generado en una captura PNG HD con marca de agua oficial.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-12 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
            <p className="text-xs font-mono font-bold text-cyan-400">GENERANDO CAPTURA EN ALTA DEFINICIÓN...</p>
          </div>
        )}

        {/* Direct Ready Result Preview & Actions */}
        {!loading && exportResult && (
          <div className="space-y-4">
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-slate-950 p-2 max-h-64 flex items-center justify-center shadow-inner">
              <img src={exportResult.dataUrl} alt="Vista previa de captura" className="max-h-60 object-contain rounded-lg" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownload}
                className="bg-gradient-to-r from-cyan-400 via-lime-400 to-emerald-400 text-slate-950 font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>DESCARGAR ARCHIVO</span>
              </button>

              <button
                onClick={handleShare}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition"
              >
                <Share2 className="w-4 h-4" />
                <span>COMPARTIR</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
