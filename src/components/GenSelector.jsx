import React from 'react';
import { ArrowLeftRight, Copy, Sparkles, CheckCircle } from 'lucide-react';

export default function GenSelector({ 
  activeGen, 
  onSelectGen, 
  gen2Obtained, 
  gen2Total, 
  gen1Obtained, 
  gen1Total,
  onCopyShareLink 
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 my-6 space-y-4">
      
      {/* Generation Switcher Console */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Gen 2 Button */}
        <button
          onClick={() => onSelectGen(2)}
          className={`relative overflow-hidden p-5 rounded-2xl border text-left transition-all group ${
            activeGen === 2
              ? 'bg-gradient-to-br from-cyan-950/80 to-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/15 ring-2 ring-cyan-500/30'
              : 'bg-slate-900/60 border-white/10 hover:border-cyan-500/40 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs font-black px-2 py-0.5 rounded ${
                  activeGen === 2 ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-cyan-400'
                }`}>
                  GEN_02
                </span>
                <strong className="text-lg font-black text-white tracking-tight uppercase">
                  OVERRIDE
                </strong>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                <strong className="text-cyan-400">{gen2Obtained}</strong> / {gen2Total} obtenidos · Temporada 4
              </p>
            </div>
            
            <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border uppercase tracking-wider ${
              activeGen === 2
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400/40 animate-pulse'
                : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}>
              {activeGen === 2 ? 'ACTUAL' : 'CAMBIAR'}
            </span>
          </div>
        </button>

        {/* Gen 1 Button */}
        <button
          onClick={() => onSelectGen(1)}
          className={`relative overflow-hidden p-5 rounded-2xl border text-left transition-all group ${
            activeGen === 1
              ? 'bg-gradient-to-br from-purple-950/80 to-slate-900 border-pink-500 shadow-xl shadow-pink-500/15 ring-2 ring-pink-500/30'
              : 'bg-slate-900/60 border-white/10 hover:border-pink-500/40 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs font-black px-2 py-0.5 rounded ${
                  activeGen === 1 ? 'bg-pink-500 text-white' : 'bg-slate-800 text-pink-400'
                }`}>
                  GEN_01
                </span>
                <strong className="text-lg font-black text-white tracking-tight uppercase">
                  RUNNERS
                </strong>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                <strong className="text-pink-400">{gen1Obtained}</strong> / {gen1Total} obtenidos · Progreso conservado
              </p>
            </div>

            <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border uppercase tracking-wider ${
              activeGen === 1
                ? 'bg-pink-500/20 text-pink-400 border-pink-400/40 animate-pulse'
                : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}>
              {activeGen === 1 ? 'ACTUAL' : 'ARCHIVO'}
            </span>
          </div>
        </button>

      </div>

      {/* Progress Transfer Sync Panel */}
      <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90 border border-cyan-500/30 p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl backdrop-blur-md">
        
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                TRANSFERENCIA DE PROGRESO
              </span>
              <span className="bg-lime-400/10 text-lime-400 text-[10px] font-extrabold px-2 py-0.5 rounded border border-lime-400/30">
                100% PORTÁTIL
              </span>
            </div>
            <h3 className="text-sm font-extrabold text-white">
              LAS DOS GENERACIONES VIAJAN EN UN SOLO ENLACE
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Cópialo y ábrelo en otro celular o computadora. Al importarlo se combina con el progreso existente sin borrar tus avances.
            </p>
          </div>
        </div>

        <button
          onClick={onCopyShareLink}
          className="w-full md:w-auto shrink-0 bg-gradient-to-r from-cyan-400 via-lime-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-black px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition"
        >
          <Copy className="w-4 h-4" />
          <span>COPIAR MI ENLACE DE PROGRESO</span>
        </button>

      </div>

    </div>
  );
}
