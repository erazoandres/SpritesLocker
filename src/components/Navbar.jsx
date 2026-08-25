import React from 'react';
import { Shield, Sparkles, Terminal, Users, Share2, Layers, Award } from 'lucide-react';

export default function Navbar({
  activeTab,
  onSelectTab,
  totalObtained,
  totalSpirits,
  onCopyShareLink
}) {
  const percentage = totalSpirits > 0 ? Math.round((totalObtained / totalSpirits) * 100) : 0;
  const strokeDashoffset = 100 - percentage;

  const navItems = [
    { id: 'casillero', label: 'Casillero', icon: Layers },
    { id: 'creador', label: 'Creador Rápido', icon: Sparkles },
    { id: 'codigos', label: 'Códigos', icon: Terminal },
    { id: 'comunidad', label: 'Comunidad', icon: Users }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-cyan-500/20 backdrop-blur-xl transition-all shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Metallic Brand Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 p-[1.5px] shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <div className="w-full h-full bg-[#090b14] rounded-[10px] flex items-center justify-center font-hud font-black text-lg text-cyan-300 tracking-wider">
                LF
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-[#090b14] animate-pulse" />
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="font-hud font-extrabold text-base tracking-wider text-white">
                LEGIÓN FORTNICADORA
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                HUD 2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-tight">
              Fortnite Sprite Locker & Companion
            </p>
          </div>
        </div>

        {/* Glowing Section Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-hud font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 whitespace-nowrap active:scale-95 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400 animate-pulse' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f0ff]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Live Percentage Wheel & Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Circular Percentage Mini Wheel */}
          <div className="hidden lg:flex items-center gap-2.5 bg-slate-900/90 border border-white/10 px-3 py-1.5 rounded-xl shadow-inner">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-cyan-400 transition-all duration-500 ease-out"
                  strokeDasharray="100, 100"
                  strokeDashoffset={strokeDashoffset}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-hud font-black text-[10px] text-white">
                {percentage}%
              </span>
            </div>
            <div className="text-left font-mono">
              <div className="text-[10px] text-slate-400 uppercase leading-none">Progreso</div>
              <div className="text-xs font-bold text-cyan-300 leading-tight">
                {totalObtained}/{totalSpirits}
              </div>
            </div>
          </div>

          {/* Share Link Button */}
          <button
            onClick={onCopyShareLink}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/50 hover:border-cyan-400 text-cyan-300 font-hud font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] active:scale-95 flex items-center gap-2"
            title="Copiar enlace con tu progreso de casillero"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">COMPARTIR</span>
          </button>

        </div>

      </div>
    </header>
  );
}
