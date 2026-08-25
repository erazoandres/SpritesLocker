import React, { useState, useEffect } from 'react';
import { X, Download, Share2, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { generateCollectionImage } from '../utils/canvasExport';

export default function ExportModal({ spirits, userState, activeGen, totalVisits, onClose, onShowToast }) {
  const [loading, setLoading] = useState(true);
  const [exportResult, setExportResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Check marked count
  const markedCount = spirits.filter(s => (userState[s.id] || 0) >= 1 || (userState[s.id] || 0) === 3).length;

  // Automatically generate PNG image for full collection on mount (Zero options)
  useEffect(() => {
    let active = true;
    async function runExport() {
      if (markedCount === 0) {
        if (active) {
          setErrorMsg('Debes seleccionar o marcar al menos un espíritu en tu casillero (Tengo, Dominado o Faltante) antes de exportar la captura.');
          setLoading(false);
        }
        return;
      }

      try {
        const result = await generateCollectionImage(spirits, userState, activeGen, 'todos', totalVisits);
        if (active) {
          setExportResult(result);
        }
      } catch (err) {
        console.error(err);
        if (active) setErrorMsg(err.message || 'Error al generar la imagen.');
      } finally {
        if (active) setLoading(false);
      }
    }
    runExport();
    return () => { active = false; };
  }, [spirits, userState, activeGen, totalVisits, markedCount]);

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

  // Render Warning Card if 0 marked spirits or error occurred
  if (!loading && (markedCount === 0 || errorMsg)) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
        <div className="bg-slate-900 border border-rose-500/40 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl relative font-sans">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-black text-white uppercase tracking-tight font-mono">
              NINGÚN ESPÍRITU MARCADO
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {errorMsg || 'Para descargar la captura PNG HD, debes seleccionar o marcar al menos un espíritu en tu casillero.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 active:scale-95 transition font-mono"
          >
            VOLVER AL CASILLERO Y MARCAR
          </button>
        </div>
      </div>
    );
  }

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
