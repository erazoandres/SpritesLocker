import React, { useState, useEffect } from 'react';
import { Download, Menu, X, Eye, Info, Camera, HelpCircle } from 'lucide-react';
import { startGuidedTour } from '../utils/tour';

const PortfolioIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function MinimalHeader({ 
  onDownloadCapture, 
  totalObtained, 
  totalSpirits,
  totalVisits,
  totalExports,
  onOpenWelcome,
  onStartTour
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pct = Math.round((totalObtained / totalSpirits) * 100) || 0;

  const handleLaunchTour = () => {
    if (onStartTour) {
      onStartTour();
    } else {
      startGuidedTour();
    }
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 w-full overflow-x-hidden ${
      scrolled 
        ? 'bg-[#0a0b12]/95 backdrop-blur-md border-b border-emerald-500/20 py-2 shadow-xl shadow-black/80' 
        : 'bg-[#0a0b12]/80 backdrop-blur-sm py-2.5 sm:py-3.5 border-b border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 space-y-2 sm:space-y-0 w-full">
        
        {/* Main Row: Logo, Download Action, Desktop Stats & Controls */}
        <div className="flex items-center justify-between gap-2 w-full">
          
          {/* Logo & Title Stack: EL CASILLERO with BY ANDRÉS ERAZO */}
          <div id="tour-brand" className="flex items-center gap-2 group shrink-0">
            <button 
              onClick={onOpenWelcome} 
              className="flex items-center gap-2.5 text-left group-hover:opacity-90 transition"
              title="Ver portal de bienvenida e información del proyecto"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-400 to-violet-500 p-[1.5px] shadow-lg shadow-emerald-500/20 shrink-0">
                <div className="w-full h-full bg-[#0a0b12] rounded-[10px] flex items-center justify-center font-black text-emerald-400 text-xs tracking-tighter font-display">
                  EC
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <strong className="text-xs sm:text-sm font-bold tracking-wider text-slate-100 uppercase block leading-none font-display">
                  EL CASILLERO
                </strong>
                <span className="text-[9px] font-mono text-emerald-400 font-extrabold block leading-none mt-1 uppercase tracking-tight">
                  BY ANDRÉS ERAZO
                </span>
              </div>
            </button>
            
            {/* Guided Tour Launcher Button */}
            <button
              onClick={handleLaunchTour}
              className="flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition active:scale-95"
              title="Iniciar tutorial guiado interactivo de la página"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">TUTORIAL</span>
            </button>
          </div>

          {/* Desktop Right Group (Visits, Exports, Progress, Portfolio) */}
          <div id="tour-counters" className="hidden sm:flex items-center gap-2 shrink-0">
            
            {/* Visit Counter */}
            {totalVisits !== null && totalVisits !== undefined && (
              <div className="flex items-center gap-1.5 bg-[#111320] px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-slate-400" title="Visitas reales acumuladas">
                <Eye className="w-3.5 h-3.5 text-lime-400" />
                <span className="font-bold text-slate-200">{Number(totalVisits).toLocaleString()}</span>
              </div>
            )}

            {/* Live Exports Counter (Document: BAmrUK0Bk8D9FTjWkCYZ, Field: exportaciones) */}
            {totalExports !== null && totalExports !== undefined && (
              <div className="flex items-center gap-1.5 bg-[#111320] px-3 py-1.5 rounded-xl border border-violet-500/30 text-xs font-mono text-slate-400" title="Exportaciones acumuladas a captura HD">
                <Camera className="w-3.5 h-3.5 text-violet-400" />
                <span className="font-bold text-slate-200">{Number(totalExports).toLocaleString()}</span>
              </div>
            )}

            {/* Progress Pill */}
            <div className="flex items-center gap-1.5 bg-[#111320] px-3 py-1.5 rounded-xl border border-emerald-500/30 text-xs font-mono">
              <span className="text-emerald-400 font-extrabold">{totalObtained}/{totalSpirits}</span>
              <span className="text-slate-500 font-bold">· {pct}%</span>
            </div>

            {/* Portfolio Access Button */}
            <a
              href="https://erazoportafolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#111320] hover:bg-[#181a2c] text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-bold transition font-mono active:scale-95"
              title="Ver Portafolio de Andrés Erazo (erazoportafolio.vercel.app)"
            >
              <PortfolioIcon className="w-3.5 h-3.5" />
              <span>Portafolio</span>
            </a>
          </div>

          {/* Download Button + Mobile Menu */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button 
              id="tour-download-btn"
              onClick={onDownloadCapture}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-violet-500 hover:from-emerald-300 hover:to-violet-400 text-slate-950 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 active:scale-95 transition shrink-0 font-display uppercase tracking-wider"
              title="Descargar captura en imagen HD de la lista de espíritus"
            >
              <Download className="w-3.5 h-3.5 stroke-[3]" />
              <span>DESCARGAR</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-emerald-400 p-1 shrink-0"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Second Row on Mobile: Progress Pill & Visits & Exports */}
        <div className="flex sm:hidden items-center justify-end gap-1.5 pt-1.5 border-t border-white/5 font-mono text-[11px] w-full">
          <div className="flex items-center gap-1.5">
            {/* Mobile Visit Counter */}
            {totalVisits !== null && totalVisits !== undefined && (
              <div className="flex items-center gap-1 bg-[#111320] px-2 py-0.5 rounded-xl border border-white/10 text-slate-400">
                <Eye className="w-3 h-3 text-lime-400" />
                <span className="font-bold text-slate-200">{Number(totalVisits).toLocaleString()}</span>
              </div>
            )}

            {/* Mobile Exports Counter */}
            {totalExports !== null && totalExports !== undefined && (
              <div className="flex items-center gap-1 bg-[#111320] px-2 py-0.5 rounded-xl border border-violet-500/30 text-slate-400">
                <Camera className="w-3 h-3 text-violet-400" />
                <span className="font-bold text-slate-200">{Number(totalExports).toLocaleString()}</span>
              </div>
            )}

            {/* Mobile Progress Pill */}
            <div className="flex items-center gap-1 bg-[#111320] px-2 py-0.5 rounded-xl border border-emerald-500/30">
              <span className="text-emerald-400 font-extrabold">{totalObtained}/{totalSpirits}</span>
              <span className="text-slate-500 font-bold">· {pct}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0e18]/95 border-b border-emerald-500/20 px-4 py-3 space-y-2 animate-fadeIn w-full">
          <nav className="flex flex-col gap-1.5 text-xs font-bold font-display">
            <button
              onClick={() => { handleLaunchTour(); setMobileMenuOpen(false); }}
              className="px-3.5 py-2 rounded-xl text-left flex items-center gap-2.5 text-emerald-400 hover:bg-white/5 font-mono"
            >
              <HelpCircle className="w-4 h-4" />
              Iniciar Tutorial Guiado
            </button>

            <button
              onClick={() => { onOpenWelcome(); setMobileMenuOpen(false); }}
              className="px-3.5 py-2 rounded-xl text-left flex items-center gap-2.5 text-slate-300 hover:bg-white/5 font-mono"
            >
              <Info className="w-4 h-4" />
              Información del Proyecto
            </button>

            <a
              href="https://erazoportafolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-left flex items-center gap-2.5 text-emerald-400 hover:bg-white/5 font-mono"
            >
              <PortfolioIcon className="w-4 h-4" />
              Portafolio de Andrés Erazo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
