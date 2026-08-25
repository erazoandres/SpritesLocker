import React from 'react';

export default function ProgressRing({ stats, activeGen, totalCount }) {
  const { obtained, mastered, missing } = stats;
  const pct = Math.round((obtained / totalCount) * 100) || 0;
  const strokeDashoffset = 283 - (283 * pct) / 100;

  return (
    <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
      
      {/* Radial Ring Column */}
      <div className="col-span-2 md:col-span-2 flex items-center gap-4 bg-slate-950/60 p-4 rounded-xl border border-white/5">
        <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              className="stroke-slate-800"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              className="stroke-cyan-400 transition-all duration-500 ease-out"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
            <span className="text-xl font-black text-white leading-none">{pct}<small className="text-xs text-cyan-400">%</small></span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
            PROGRESO GEN_{activeGen.toString().padStart(2, '0')}
          </span>
          <div className="text-2xl font-black text-white font-mono leading-tight">
            {obtained}<span className="text-slate-500 text-base">/{totalCount}</span>
          </div>
          <span className="text-[11px] text-cyan-400 font-semibold block">
            {activeGen === 2 ? 'Override · Temporada 4' : 'Runners · Archivo'}
          </span>
        </div>
      </div>

      {/* Stats Breakdown Items */}
      <div className="bg-slate-950/40 p-4 rounded-xl border border-cyan-500/20 text-center space-y-0.5 hover:border-cyan-500/40 transition">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
          OBTENIDOS
        </span>
        <div className="text-2xl font-black text-cyan-400 font-mono">{obtained}</div>
      </div>

      <div className="bg-slate-950/40 p-4 rounded-xl border border-lime-500/20 text-center space-y-0.5 hover:border-lime-500/40 transition">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
          DOMINADOS
        </span>
        <div className="text-2xl font-black text-lime-400 font-mono">{mastered}</div>
      </div>

      <div className="col-span-2 sm:col-span-1 bg-slate-950/40 p-4 rounded-xl border border-slate-700/40 text-center space-y-0.5 hover:border-slate-600 transition">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
          FALTANTES
        </span>
        <div className="text-2xl font-black text-slate-400 font-mono">{missing}</div>
      </div>

    </div>
  );
}
