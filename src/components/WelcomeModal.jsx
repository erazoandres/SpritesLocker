import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Code2, Heart, ExternalLink } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function WelcomeModal({ onClose }) {
  const [isWarping, setIsWarping] = useState(false);
  const [typedAuthor, setTypedAuthor] = useState("");
  const fullAuthorText = "BY ANDRÉS ERAZO";

  // Typewriter animation effect for author name
  useEffect(() => {
    let index = 0;
    setTypedAuthor("");
    const timer = setInterval(() => {
      if (index < fullAuthorText.length) {
        setTypedAuthor(fullAuthorText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 85);

    return () => clearInterval(timer);
  }, []);

  const handleEnterApp = () => {
    setIsWarping(true); // Trigger super cool cyber warp transition animation
    setTimeout(() => {
      try {
        localStorage.setItem('el-casillero-welcome-seen', 'true');
      } catch {}
      onClose();
    }, 550);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0b12]/95 backdrop-blur-xl select-none ${
      isWarping ? 'animate-portalWarp pointer-events-none' : 'animate-fadeIn'
    }`}>
      
      {/* Background Ambient Neon Radial Light Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Ultra-Minimalist Welcome Portal Container */}
      <div className="relative bg-[#101322] border border-emerald-500/40 rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl shadow-emerald-500/10 font-sans text-center">
        
        {/* Header Micro Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-[11px] font-mono font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PORTAL OFICIAL DE COLECCIÓN</span>
        </div>

        {/* Title & Creator Attribution with Typewriter Effect */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-display bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">
            EL CASILLERO
          </h1>
          <p className="text-xs font-mono font-extrabold text-emerald-400 tracking-wider uppercase flex items-center justify-center gap-0.5 min-h-[18px]">
            <span>{typedAuthor}</span>
            <span className="w-1.5 h-3.5 bg-emerald-400 inline-block animate-pulse"></span>
          </p>
        </div>

        {/* Concrete Purpose Description */}
        <div className="bg-[#0a0b12] p-3.5 rounded-2xl border border-white/5 space-y-1.5 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-bold">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>¿PARA QUÉ ES ESTE WEBSITE?</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Plataforma minimalista y de alta precisión para organizar, filtrar y exportar en captura HD tu colección de <strong className="text-white">Espíritus de Fortnite Override y Runners</strong> (Generaciones 1 y 2).
          </p>
        </div>

        {/* Compact iCharly-Afton Inspiration Credits Pill */}
        <div className="bg-violet-950/30 border border-violet-500/30 px-3 py-2 rounded-xl text-left flex items-center justify-between gap-2 text-[10px] font-mono">
          <div className="flex items-center gap-1.5 text-slate-300 truncate">
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400 shrink-0" />
            <span className="truncate">Inspirado en el proyecto de <strong className="text-white font-bold">iCharly-Afton</strong></span>
          </div>
          <a
            href="https://icharly-afton-sprite-locker.icharly-afton.chatgpt.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-violet-400 hover:text-violet-300 underline decoration-violet-400/40 shrink-0 transition"
            title="Ver sitio original de iCharly-Afton"
          >
            <span>Ver original</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

        {/* Official GitHub Repository Pill Badge */}
        <div className="space-y-1">
          <a
            href="https://github.com/erazoandres/SpritesLocker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#161a2e] hover:bg-[#1f243f] text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition active:scale-95"
            title="Ver repositorio oficial en GitHub por Andrés Erazo"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>github.com/erazoandres/SpritesLocker</span>
          </a>
        </div>

        {/* CTA Entrance Button with Cyber Warp Transition */}
        <button
          onClick={handleEnterApp}
          className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-violet-500 hover:from-emerald-300 hover:to-violet-400 text-slate-950 font-black py-3 px-6 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/20 active:scale-95 transition font-display uppercase tracking-widest group"
        >
          <span>INGRESAR AL CASILLERO</span>
          <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition" />
        </button>

      </div>
    </div>
  );
}
