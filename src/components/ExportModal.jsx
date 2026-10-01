import React, { useState, useEffect, useRef } from 'react';
import { X, Download, Share2, Loader2, CheckCircle2, AlertTriangle, LayoutGrid, Grid } from 'lucide-react';
import { generateCollectionImage } from '../utils/canvasExport';

export default function ExportModal({ spirits, userState, activeGen, totalVisits, totalExports, onRecordExport, onClose, onShowToast }) {
  const [loading, setLoading] = useState(true);
  const [exportFormat, setExportFormat] = useState('standard'); // 'standard' or 'poster'
  const [exportResult, setExportResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const hasRecordedRef = useRef(false);

  // Check marked count
  const markedCount = spirits.filter(s => (userState[s.id] || 0) >= 1 || (userState[s.id] || 0) === 3).length;

  // Automatically generate PNG image for full collection on mount and when exportFormat changes
  useEffect(() => {
    let active = true;
    async function runExport() {
      if (markedCount === 0 && exportFormat === 'standard') {
        if (active) {
          setErrorMsg('Debes seleccionar o marcar al menos un espíritu en tu casillero (Tengo, Dominado o Faltante) antes de exportar la captura.');
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setErrorMsg(null);

      try {
        const result = await generateCollectionImage(spirits, userState, activeGen, 'todos', totalVisits, totalExports, exportFormat);
        if (active) {
          setExportResult(result);
          // Increment exportaciones strictly ONCE per overall export session
          if (onRecordExport && !hasRecordedRef.current) {
            hasRecordedRef.current = true;
            onRecordExport();
          }
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
  }, [spirits, userState, activeGen, totalVisits, totalExports, markedCount, exportFormat]);

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

  // Render Warning Card if 0 marked spirits and standard format or error occurred
  if (!loading && markedCount === 0 && exportFormat === 'standard' && errorMsg) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0b12]/90 backdrop-blur-md animate-fadeIn">
        <div className="bg-[#101322] border border-rose-500/40 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl relative font-sans">
          
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
            <h3 className="text-lg font-black text-white uppercase tracking-tight font-display">
              NINGÚN ESPÍRITU MARCADO
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {errorMsg || 'Para descargar la captura de Tarjetas HD, debes seleccionar o marcar al menos un espíritu en tu casillero.'}
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setExportFormat('poster')}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition font-display"
            >
              PROBAR EXPORTACIÓN MATRIZ COMPLETA (FORTNITE.GG)
            </button>
            <button
              onClick={onClose}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 px-4 rounded-xl text-xs uppercase transition font-mono"
            >
              VOLVER Y MARCAR ESPÍRITUS
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0b12]/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#101322] border border-emerald-500/40 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative font-sans">
        
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
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" />
            <span>EXPORT / GEN_{activeGen.toString().padStart(2, '0')}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight font-display">
            FORMATO DE EXPORTACIÓN
          </h2>
          <p className="text-xs text-slate-400">
            Elige el estilo visual para generar tu captura de colección PNG HD.
          </p>
        </div>

        {/* Export Format Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-[#0a0b12] p-1.5 rounded-2xl border border-white/10 w-full">
          <button
            onClick={() => setExportFormat('standard')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-[11px] font-mono font-bold transition flex items-center justify-center gap-1.5 ${
              exportFormat === 'standard'
                ? 'bg-emerald-400 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>TARJETAS HD</span>
          </button>
          <button
            onClick={() => setExportFormat('poster')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-[11px] font-mono font-bold transition flex items-center justify-center gap-1.5 ${
              exportFormat === 'poster'
                ? 'bg-cyan-400 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>MATRIZ (FORTNITE.GG)</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-12 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
            <p className="text-xs font-mono font-bold text-emerald-400">
              GENERANDO CAPTURA {exportFormat === 'poster' ? 'MATRIZ FORTNITE.GG' : 'TARJETAS HD'}...
            </p>
          </div>
        )}

        {/* Direct Ready Result Preview & Actions */}
        {!loading && exportResult && (
          <div className="space-y-4">
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#0a0b12] p-2 max-h-64 flex items-center justify-center shadow-inner relative">
              <img src={exportResult.dataUrl} alt="Vista previa de captura" className="max-h-60 object-contain rounded-lg" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownload}
                className="bg-gradient-to-r from-emerald-400 via-teal-400 to-violet-500 hover:from-emerald-300 hover:to-violet-400 text-slate-950 font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition font-display uppercase tracking-wider"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>DESCARGAR ARCHIVO</span>
              </button>

              <button
                onClick={handleShare}
                className="bg-[#161a2e] hover:bg-[#1f243f] text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition font-display uppercase tracking-wider"
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
