import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Code2, HelpCircle } from 'lucide-react';
import { startGuidedTour } from '../utils/tour';

export default function WelcomeModal({ onClose, onStartTour }) {
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

  const handleStartTourFromModal = () => {
    try {
      localStorage.setItem('el-casillero-welcome-seen', 'true');
    } catch {}
    onClose();
    setTimeout(() => {
      if (onStartTour) {
        onStartTour();
      } else {
        startGuidedTour();
      }
    }, 400);
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

        {/* Action Group: Entrance & Tour Launcher */}
        <div className="space-y-2.5">
          {/* CTA Entrance Button with Cyber Warp Transition */}
          <button
            onClick={handleEnterApp}
            className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-violet-500 hover:from-emerald-300 hover:to-violet-400 text-slate-950 font-black py-3 px-6 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/20 active:scale-95 transition font-display uppercase tracking-widest group"
          >
            <span>INGRESAR AL CASILLERO</span>
            <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition" />
          </button>

          {/* Interactive Tour Button */}
          <button
            onClick={handleStartTourFromModal}
            className="w-full bg-[#161a2e] hover:bg-[#1f243f] text-emerald-400 border border-emerald-500/30 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition font-mono active:scale-95"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>VER TUTORIAL GUIADO INTERACTIVO</span>
          </button>
        </div>

      </div>
    </div>
  );
}
