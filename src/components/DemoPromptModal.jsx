import React from 'react';
import { PlayCircle, Sparkles, X, ArrowRight } from 'lucide-react';

export default function DemoPromptModal({ onAccept, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0b12]/90 backdrop-blur-md animate-fadeIn select-none">
      <div className="bg-[#101322] border border-emerald-400/50 rounded-3xl max-w-md w-full p-6 text-center space-y-5 shadow-2xl shadow-emerald-500/10 relative font-sans">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Neon Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-[11px] font-mono font-bold tracking-wider uppercase mx-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TUTORIAL COMPLETADO</span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-display bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">
            ¿VER EJEMPLO EN VIVO?
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            ¿Te gustaría ver una <strong className="text-white">demostración automática simulando uso real</strong>? El sistema marcará espíritus, dominará familias y abrirá la exportación en tiempo real.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={onAccept}
            className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-violet-500 hover:from-emerald-300 hover:to-violet-400 text-slate-950 font-black py-3 px-5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/20 active:scale-95 transition font-display uppercase tracking-wider group"
          >
            <PlayCircle className="w-4 h-4 stroke-[2.5]" />
            <span>SÍ, MOSTRAR DEMOSTRACIÓN</span>
            <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition" />
          </button>

          <button
            onClick={onClose}
            className="w-full bg-[#161a2e] hover:bg-[#1f243f] text-slate-400 hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs transition font-mono"
          >
            No gracias, usar el casillero
          </button>
        </div>

      </div>
    </div>
  );
}
