import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles, Share2, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { generateCollectionImage } from '../utils/canvasExport';
import { getShareableUrl } from '../utils/storage';

export default function ExportCanvasModal({
  spirits = [],
  userState = {},
  activeGen = 2,
  onClose,
  onShowToast
}) {
  const [filterType, setFilterType] = useState('todos'); // 'todos', 'obtenidos', 'dominados', 'faltantes'
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [imageFilename, setImageFilename] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Generate PNG canvas image when filter changes or on mount
  useEffect(() => {
    let isMounted = true;
    const buildImage = async () => {
      setIsGenerating(true);
      setErrorMessage('');
      try {
        const { dataUrl, filename } = await generateCollectionImage(
          spirits,
          userState,
          activeGen,
          filterType
        );
        if (isMounted) {
          setImageDataUrl(dataUrl);
          setImageFilename(filename);
        }
      } catch (err) {
        if (isMounted) {
          setErrorMessage(err.message || 'Error al generar la imagen.');
          setImageDataUrl('');
        }
      } finally {
        if (isMounted) setIsGenerating(false);
      }
    };

    buildImage();

    return () => {
      isMounted = false;
    };
  }, [spirits, userState, activeGen, filterType]);

  // Download PNG file
  const handleDownload = () => {
    if (!imageDataUrl) return;
    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = imageFilename || `legion-fortnicadora-gen${activeGen}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    onShowToast('Imagen PNG descargada con éxito');
  };

  // Copy shareable link URL
  const handleCopyLink = async () => {
    const url = getShareableUrl(userState);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    onShowToast('Enlace de casillero copiado al portapapeles');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-4xl rounded-3xl border border-cyan-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-500/40">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-hud font-black text-xl text-white uppercase tracking-tight">
                EXPORTAR CASILLERO DE ESPÍRITUS (GEN {activeGen})
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Genera una tarjeta HD PNG de alta resolución lista para compartir en redes sociales.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Controls & Filter Switcher */}
        <div className="p-4 bg-slate-950/60 border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase mr-1">
              FILTRAR:
            </span>
            {[
              { id: 'todos', label: 'Todos los espíritus' },
              { id: 'obtenidos', label: 'Solo Obtenidos' },
              { id: 'dominados', label: 'Solo Dominados' },
              { id: 'faltantes', label: 'Solo Faltantes' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1.5 rounded-xl font-hud font-bold text-xs uppercase transition ${
                  filterType === f.id
                    ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopyLink}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-hud font-extrabold uppercase flex items-center gap-1.5 transition active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>COPIAR ENLACE</span>
          </button>
        </div>

        {/* Live Canvas Preview Area */}
        <div className="p-6 overflow-y-auto flex-1 flex items-center justify-center bg-slate-950/90 min-h-[300px]">
          {isGenerating ? (
            <div className="text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
              <p className="text-xs font-mono text-cyan-300">Generando imagen HD en Canvas...</p>
            </div>
          ) : errorMessage ? (
            <div className="text-center space-y-2 text-rose-400 font-mono text-xs p-6 bg-rose-950/20 rounded-2xl border border-rose-500/30">
              <AlertCircle className="w-6 h-6 mx-auto" />
              <p>{errorMessage}</p>
            </div>
          ) : imageDataUrl ? (
            <img
              src={imageDataUrl}
              alt="Vista previa de colección"
              className="max-h-[500px] w-auto rounded-2xl border border-white/20 shadow-2xl object-contain"
            />
          ) : null}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-white/10 flex items-center justify-end gap-3 bg-slate-950/80">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-hud font-bold text-xs uppercase transition"
          >
            CANCELAR
          </button>

          <button
            disabled={!imageDataUrl || isGenerating}
            onClick={handleDownload}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-hud font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] transition active:scale-95 flex items-center gap-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>DESCARGAR PNG HD</span>
          </button>
        </div>

      </div>
    </div>
  );
}
