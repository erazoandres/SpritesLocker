import React, { useState, useEffect } from 'react';
import { Download, Menu, X, Info, HelpCircle } from 'lucide-react';
import { startGuidedTour } from '../utils/tour';

export default function MinimalHeader({ 
  onDownloadCapture, 
  totalObtained, 
  totalSpirits,
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
        ? 'bg-[#0a0b12]/95 backdrop-blur-md border-b border-emerald-500/20 py-2.5 shadow-2xl shadow-black/90' 
        : 'bg-[#0a0b12]/80 backdrop-blur-sm py-3 border-b border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 w-full flex items-center justify-between gap-3">
        
        {/* Left Side: Brand Logo & Tutorial Button */}
        <div id="tour-brand" className="flex items-center gap-2.5 shrink-0">
          <button 
            onClick={onOpenWelcome} 
            className="flex items-center gap-2.5 text-left group transition"
            title="Ver portal de bienvenida e información del proyecto"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-400 to-violet-500 p-[1.5px] shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-[#0a0b12] rounded-[10px] flex items-center justify-center font-black text-emerald-400 text-xs sm:text-sm tracking-tighter font-display">
                EC
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <strong className="text-xs sm:text-sm font-black tracking-wider text-slate-100 uppercase block leading-none font-display group-hover:text-emerald-400 transition-colors">
                EL CASILLERO
              </strong>
              <span className="text-[9px] font-mono text-emerald-400 font-extrabold block leading-none mt-1 uppercase tracking-tight">
                BY ANDRÉS ERAZO
              </span>
            </div>
          </button>
          
          {/* Guided Tour Button */}
          <button
            onClick={handleLaunchTour}
            className="hidden sm:flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold transition active:scale-95"
            title="Iniciar tutorial guiado interactivo de la página"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>TUTORIAL</span>
          </button>
        </div>

        {/* Right Side: Progress Pill & Action Download Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 font-mono">
          
          {/* Collection Progress Pill */}
          <div id="tour-counters" className="flex items-center gap-1.5 bg-[#101322] px-3 py-1.5 rounded-xl border border-emerald-500/30 text-xs font-mono shadow-inner">
            <span className="text-emerald-400 font-black">{totalObtained}/{totalSpirits}</span>
            <span className="text-slate-500 font-bold hidden sm:inline">· {pct}%</span>
          </div>

          {/* Export / Download Capture Action Button */}
          <button 
            id="tour-download-btn"
            onClick={onDownloadCapture}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-violet-500 hover:from-emerald-300 hover:to-violet-400 text-slate-950 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 active:scale-95 transition shrink-0 font-display uppercase tracking-wider"
            title="Descargar captura en imagen HD de la lista de espíritus"
          >
            <Download className="w-3.5 h-3.5 stroke-[3]" />
            <span>DESCARGAR</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden text-slate-300 hover:text-emerald-400 p-1 shrink-0"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0c0e18]/95 border-b border-emerald-500/20 px-4 py-3 space-y-2 animate-fadeIn w-full">
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
          </nav>
        </div>
      )}
    </header>
  );
}
