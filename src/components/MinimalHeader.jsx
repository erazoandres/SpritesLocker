import React, { useState, useEffect } from 'react';
import { Download, Menu, X, Gift, Trophy, Eye } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function MinimalHeader({ 
  onDownloadCapture, 
  activeGen, 
  totalObtained, 
  totalSpirits,
  totalVisits,
  activeTab,
  onSelectTab,
  onSelectGen
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pct = Math.round((totalObtained / totalSpirits) * 100) || 0;

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 w-full overflow-x-hidden ${
      scrolled 
        ? 'bg-[#0a0b12]/95 backdrop-blur-md border-b border-emerald-500/20 py-2 shadow-xl shadow-black/80' 
        : 'bg-[#0a0b12]/80 backdrop-blur-sm py-2.5 sm:py-3.5 border-b border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 space-y-2 sm:space-y-0 w-full">
        
        {/* Main Row: Logo, Download Action, Desktop Nav */}
        <div className="flex items-center justify-between gap-2 w-full">
          
          {/* Logo & Title Stack: EL CASILLERO with BY ANDRÉS ERAZO */}
          <a href="#coleccion" className="flex items-center gap-2.5 group shrink-0">
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
          </a>

          {/* Desktop Only Gen Switcher Pills */}
          <div className="hidden sm:flex items-center bg-[#111320] p-1 rounded-xl border border-white/10 text-xs font-mono shrink-0">
            <button
              onClick={() => onSelectGen(2)}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                activeGen === 2 ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              GEN 2
            </button>
            <button
              onClick={() => onSelectGen(1)}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                activeGen === 1 ? 'bg-violet-500 text-white shadow-md shadow-violet-500/20 font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              GEN 1
            </button>
          </div>

          {/* Section Navigation Tabs (Desktop only) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#111320] p-1.5 rounded-full border border-white/10 text-xs font-semibold">
            <button 
              onClick={() => onSelectTab('coleccion')}
              className={`px-4 py-1.5 rounded-full transition flex items-center gap-1.5 ${
                activeTab === 'coleccion' ? 'bg-emerald-400 text-slate-950 font-black shadow-md shadow-emerald-500/20 font-display' : 'text-slate-300 hover:text-emerald-400'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Colección
            </button>

            <button 
              onClick={() => onSelectTab('codigos')}
              className={`px-4 py-1.5 rounded-full transition flex items-center gap-1.5 ${
                activeTab === 'codigos' ? 'bg-violet-500 text-white font-black shadow-md shadow-violet-500/20 font-display' : 'text-slate-300 hover:text-violet-400'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              Códigos
            </button>
          </nav>

          {/* Desktop Right Group (Visits, Progress, GitHub) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {/* Visit Counter */}
            {totalVisits !== null && totalVisits !== undefined && totalVisits > 0 && (
              <div className="flex items-center gap-1.5 bg-[#111320] px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-slate-400" title="Visitas reales acumuladas">
                <Eye className="w-3.5 h-3.5 text-lime-400" />
                <span className="font-bold text-slate-200">{Number(totalVisits).toLocaleString()}</span>
              </div>
            )}

            {/* Progress Pill */}
            <div className="flex items-center gap-1.5 bg-[#111320] px-3 py-1.5 rounded-xl border border-emerald-500/30 text-xs font-mono">
              <span className="text-emerald-400 font-extrabold">{totalObtained}/{totalSpirits}</span>
              <span className="text-slate-500 font-bold">· {pct}%</span>
            </div>

            {/* GitHub Access Button */}
            <a
              href="https://github.com/erazoandres"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#111320] hover:bg-[#181a2c] text-slate-300 hover:text-white border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold transition font-mono active:scale-95"
              title="Perfil de GitHub de Andrés Erazo (erazoandres)"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Download Button + Mobile Menu (Always 100% visible on Mobile & Desktop) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button 
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

        {/* Second Row on Mobile: Gen Switcher & Progress Pill & Visits */}
        <div className="flex sm:hidden items-center justify-between gap-1.5 pt-1.5 border-t border-white/5 font-mono text-[11px] w-full">
          {/* Mobile Gen Switcher */}
          <div className="flex items-center bg-[#111320] p-0.5 rounded-xl border border-white/10">
            <button
              onClick={() => onSelectGen(2)}
              className={`px-2.5 py-0.5 rounded-lg font-bold transition ${
                activeGen === 2 ? 'bg-emerald-400 text-slate-950 font-extrabold' : 'text-slate-400'
              }`}
            >
              GEN 2
            </button>
            <button
              onClick={() => onSelectGen(1)}
              className={`px-2.5 py-0.5 rounded-lg font-bold transition ${
                activeGen === 1 ? 'bg-violet-500 text-white font-extrabold' : 'text-slate-400'
              }`}
            >
              GEN 1
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Mobile Visit Counter */}
            {totalVisits !== null && totalVisits !== undefined && totalVisits > 0 && (
              <div className="flex items-center gap-1 bg-[#111320] px-2 py-0.5 rounded-xl border border-white/10 text-slate-400">
                <Eye className="w-3 h-3 text-lime-400" />
                <span className="font-bold text-slate-200">{Number(totalVisits).toLocaleString()}</span>
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
              onClick={() => { onSelectTab('coleccion'); setMobileMenuOpen(false); }}
              className={`px-3.5 py-2 rounded-xl text-left flex items-center gap-2.5 ${
                activeTab === 'coleccion' ? 'bg-emerald-400 text-slate-950 font-black' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Colección de Espíritus
            </button>

            <button 
              onClick={() => { onSelectTab('codigos'); setMobileMenuOpen(false); }}
              className={`px-3.5 py-2 rounded-xl text-left flex items-center gap-2.5 ${
                activeTab === 'codigos' ? 'bg-violet-500 text-white font-black' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              <Gift className="w-4 h-4" />
              Códigos Secretos
            </button>

            <a
              href="https://github.com/erazoandres"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-left flex items-center gap-2.5 text-emerald-400 hover:bg-white/5 font-mono"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub de Andrés Erazo (erazoandres)
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
