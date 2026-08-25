import React, { useState, useEffect } from 'react';
import { Share2, Sparkles, Menu, X, Shield, Gift, Users, Trophy, Zap } from 'lucide-react';
import { WHATSAPP_GROUP_LINK } from '../data/community';

export default function Header({ 
  onCopyShareLink, 
  activeGen, 
  totalObtained, 
  totalSpirits,
  activeTab,
  onSelectTab
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
        ? 'bg-[#07080d]/90 backdrop-blur-md border-b border-cyan-500/20 py-2.5 shadow-lg shadow-black/50' 
        : 'bg-[#07080d]/60 backdrop-blur-sm py-4 border-b border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-lime-400 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-lime-400 text-lg tracking-tighter">
              LF
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-slate-100 group-hover:text-cyan-400 transition text-base sm:text-lg">
                LEGIÓN
              </span>
              <span className="bg-gradient-to-r from-cyan-400 to-lime-400 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded tracking-widest uppercase">
                GEN_{activeGen.toString().padStart(2, '0')}
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 tracking-widest uppercase">FORTNICADORA</p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-white/10 text-xs font-semibold">
          <button 
            onClick={() => onSelectTab('coleccion')}
            className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
              activeTab === 'coleccion' ? 'bg-cyan-400 text-slate-950 font-black shadow' : 'text-slate-300 hover:text-cyan-400'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            CASILLERO
          </button>

          <button 
            onClick={() => onSelectTab('creador')}
            className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
              activeTab === 'creador' ? 'bg-lime-400 text-slate-950 font-black shadow' : 'text-slate-300 hover:text-lime-400'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            CREADOR RÁPIDO
          </button>

          <button 
            onClick={() => onSelectTab('codigos')}
            className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
              activeTab === 'codigos' ? 'bg-pink-500 text-white font-black shadow' : 'text-slate-300 hover:text-pink-400'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            CÓDIGOS
          </button>

          <button 
            onClick={() => onSelectTab('comunidad')}
            className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
              activeTab === 'comunidad' ? 'bg-purple-500 text-white font-black shadow' : 'text-slate-300 hover:text-purple-400'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            COMUNIDAD
          </button>
        </nav>

        {/* Live Progress Pill & Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Progress Badge */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-cyan-500/30 text-xs font-mono">
            <span className="text-slate-400">PROGRESO:</span>
            <span className="text-cyan-400 font-bold">{pct}%</span>
            <span className="text-slate-500">({totalObtained}/{totalSpirits})</span>
          </div>

          {/* Copy Share Link Button */}
          <button 
            onClick={onCopyShareLink}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-cyan-500/20 active:scale-95 transition"
            title="Copiar mi enlace de progreso"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">COMPARTIR</span>
          </button>

          {/* Join Group Button */}
          <a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3.5 py-1.5 rounded-lg text-xs font-bold transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            GRUPO ↗
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-cyan-400 p-2"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-cyan-500/20 px-6 py-4 space-y-3 animate-fadeIn">
          <nav className="flex flex-col gap-2 text-sm font-semibold">
            <button 
              onClick={() => { onSelectTab('coleccion'); setMobileMenuOpen(false); }}
              className={`px-4 py-2.5 rounded-lg text-left flex items-center gap-3 ${
                activeTab === 'coleccion' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-200'
              }`}
            >
              <Trophy className="w-4 h-4 text-cyan-400" />
              CASILLERO DE ESPÍRITUS
            </button>

            <button 
              onClick={() => { onSelectTab('creador'); setMobileMenuOpen(false); }}
              className={`px-4 py-2.5 rounded-lg text-left flex items-center gap-3 ${
                activeTab === 'creador' ? 'bg-lime-500/20 text-lime-400 font-bold' : 'text-slate-200'
              }`}
            >
              <Zap className="w-4 h-4 text-lime-400" />
              CREADOR RÁPIDO DE LISTA
            </button>

            <button 
              onClick={() => { onSelectTab('codigos'); setMobileMenuOpen(false); }}
              className={`px-4 py-2.5 rounded-lg text-left flex items-center gap-3 ${
                activeTab === 'codigos' ? 'bg-pink-500/20 text-pink-400 font-bold' : 'text-slate-200'
              }`}
            >
              <Gift className="w-4 h-4 text-pink-400" />
              CÓDIGOS SECRETOS
            </button>

            <button 
              onClick={() => { onSelectTab('comunidad'); setMobileMenuOpen(false); }}
              className={`px-4 py-2.5 rounded-lg text-left flex items-center gap-3 ${
                activeTab === 'comunidad' ? 'bg-purple-500/20 text-purple-400 font-bold' : 'text-slate-200'
              }`}
            >
              <Users className="w-4 h-4 text-purple-400" />
              REGLAS Y VENDEDORES
            </button>
          </nav>

          <div className="pt-2 border-t border-white/10">
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noreferrer"
              className="w-full text-center block bg-emerald-500 text-slate-950 py-2.5 rounded-lg text-sm font-extrabold shadow"
            >
              ENTRAR AL GRUPO DE WHATSAPP ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
