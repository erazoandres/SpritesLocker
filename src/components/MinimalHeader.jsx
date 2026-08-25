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
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#08090d]/95 backdrop-blur-md border-b border-cyan-500/20 py-2.5 shadow-xl shadow-black/80' 
        : 'bg-[#08090d]/80 backdrop-blur-sm py-3.5 border-b border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        
        {/* Brand Logo & Title: EL CASILLERO · Andrés Erazo */}
        <div className="flex items-center gap-3">
          <a href="#coleccion" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-lime-400 p-[1px] shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center font-black text-cyan-400 text-xs tracking-tighter">
                EC
              </div>
            </div>
            <div className="hidden sm:block">
              <strong className="text-xs font-black tracking-wider text-slate-100 uppercase block leading-none">
                EL CASILLERO
              </strong>
              <small className="text-[9px] font-mono text-cyan-400 block leading-none mt-0.5">
                ANDRÉS ERAZO
              </small>
            </div>
          </a>

          {/* Gen Switcher Pills */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-white/10 text-xs font-mono">
            <button
              onClick={() => onSelectGen(2)}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                activeGen === 2 ? 'bg-cyan-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              GEN 2
            </button>
            <button
              onClick={() => onSelectGen(1)}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                activeGen === 1 ? 'bg-pink-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              GEN 1
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-full border border-white/10 text-xs font-semibold">
          <button 
            onClick={() => onSelectTab('coleccion')}
            className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
              activeTab === 'coleccion' ? 'bg-cyan-400 text-slate-950 font-black shadow' : 'text-slate-300 hover:text-cyan-400'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Colección
          </button>

          <button 
            onClick={() => onSelectTab('codigos')}
            className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
              activeTab === 'codigos' ? 'bg-pink-500 text-white font-black shadow' : 'text-slate-300 hover:text-pink-400'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            Códigos
          </button>
        </nav>

        {/* Live Progress Pill, Visit Counter & Action Buttons */}
        <div className="flex items-center gap-2">
          
          {/* Real Live Visit Counter Badge (Only displays when real numeric API data is present) */}
          {totalVisits !== null && totalVisits !== undefined && totalVisits > 0 && (
            <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-slate-400" title="Visitas reales acumuladas a El Casillero">
              <Eye className="w-3.5 h-3.5 text-lime-400" />
              <span className="font-bold text-slate-200">{Number(totalVisits).toLocaleString()}</span>
            </div>
          )}

          {/* Live Progress Pill */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-cyan-500/30 text-xs font-mono">
            <span className="text-cyan-400 font-extrabold">{totalObtained}/{totalSpirits}</span>
            <span className="text-slate-500 font-bold">· {pct}%</span>
          </div>

          {/* GitHub Access Button */}
          <a
            href="https://github.com/erazoandres"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold transition font-mono active:scale-95"
            title="Perfil de GitHub de Andrés Erazo (erazoandres)"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* DESCARGAR Captura Button */}
          <button 
            onClick={onDownloadCapture}
            className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-400 via-lime-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 px-3.5 py-1.5 rounded-xl text-xs font-black shadow-lg shadow-cyan-500/20 active:scale-95 transition"
            title="Descargar captura en imagen HD de la lista de espíritus"
          >
            <Download className="w-3.5 h-3.5 stroke-[3]" />
            <span className="font-extrabold tracking-wider uppercase">DESCARGAR</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-cyan-400 p-1.5"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-cyan-500/20 px-5 py-4 space-y-3 animate-fadeIn">
          <nav className="flex flex-col gap-1.5 text-xs font-bold">
            <button 
              onClick={() => { onSelectTab('coleccion'); setMobileMenuOpen(false); }}
              className={`px-3.5 py-2 rounded-xl text-left flex items-center gap-2.5 ${
                activeTab === 'coleccion' ? 'bg-cyan-400 text-slate-950 font-black' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Colección de Espíritus
            </button>

            <button 
              onClick={() => { onSelectTab('codigos'); setMobileMenuOpen(false); }}
              className={`px-3.5 py-2 rounded-xl text-left flex items-center gap-2.5 ${
                activeTab === 'codigos' ? 'bg-pink-500 text-white font-black' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              <Gift className="w-4 h-4" />
              Códigos Secretos
            </button>

            <a
              href="https://github.com/erazoandres"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-left flex items-center gap-2.5 text-cyan-400 hover:bg-white/5"
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
