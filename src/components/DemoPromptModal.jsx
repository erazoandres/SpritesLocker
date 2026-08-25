import React from 'react';
import { CheckCircle2, XCircle, Sparkles, X } from 'lucide-react';

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
            ¿QUÉ MODO DESEAS SIMULAR?
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Selecciona qué estado deseas probar en la demostración rápida. Se marcarán 1 o 2 espíritus y se exportará la captura automáticamente.
          </p>
        </div>

        {/* Mode Choice Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={() => onAccept('tengo')}
            className="w-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black py-3 px-5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition font-display uppercase tracking-wider"
          >
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            <span>🟢 MODO: ESPÍRITUS QUE TENGO</span>
          </button>

          <button
            onClick={() => onAccept('faltan')}
            className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-black py-3 px-5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 active:scale-95 transition font-display uppercase tracking-wider"
          >
            <XCircle className="w-4 h-4 stroke-[2.5]" />
            <span>🔴 MODO: ESPÍRITUS QUE ME FALTAN</span>
          </button>

          <button
            onClick={onClose}
            className="w-full bg-[#161a2e] hover:bg-[#1f243f] text-slate-400 hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs transition font-mono mt-1"
          >
            No gracias, usar el casillero
          </button>
        </div>

      </div>
    </div>
  );
}
