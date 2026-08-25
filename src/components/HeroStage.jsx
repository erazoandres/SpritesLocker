import React from 'react';
import { Crown, CheckCircle2, CircleDashed, Flame, Sparkles, RefreshCw, Download, Layers } from 'lucide-react';

export default function HeroStage({
  activeGen,
  onSelectGen,
  gen2Obtained = 0,
  gen2Total = 36,
  gen1Obtained = 0,
  gen1Total = 117,
  stats = { obtained: 0, mastered: 0, missing: 0 },
  totalCount = 36,
  onResetGen,
  onOpenExportModal
}) {
  const percentage = totalCount > 0 ? Math.round((stats.obtained / totalCount) * 100) : 0;
  const strokeDashoffset = 283 - (283 * percentage) / 100;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0c0f1c] via-[#090b14] to-[#07080d] border-b border-white/10 pt-8 pb-10">
      
      {/* Background Decorator Grids & Ambient Glows */}
      <div className="absolute inset-0 scanline-overlay opacity-30" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        
        {/* Top Header Banner & Generation Switcher Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>AAA GAMING LOCKER HUD</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>OVERRIDE & RUNNERS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-hud font-black tracking-tight text-white uppercase leading-none">
              CASILLERO DE <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">ESPÍRITUS</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-sans">
              Seguimiento táctico e interactivo de tu colección de Espíritus de Fortnite. Visualiza tu progreso, variante por variante, y comparte tus estadísticas.
            </p>
          </div>

          {/* Generation Switcher Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="bg-slate-950/80 p-1.5 rounded-2xl border border-white/10 flex items-center gap-1 shadow-2xl">
              
              {/* Gen 2 Tab */}
              <button
                onClick={() => onSelectGen(2)}
                className={`relative px-4 py-2.5 rounded-xl font-hud font-extrabold text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-between gap-3 active:scale-95 ${
                  activeGen === 2
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.5)] font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Flame className={`w-4 h-4 ${activeGen === 2 ? 'text-slate-950' : 'text-cyan-400'}`} />
                  <span>GEN 2 OVERRIDE</span>
                </div>
                <span className={`px-2 py-0.5 rounded-md font-mono text-xs font-bold ${
                  activeGen === 2 ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-cyan-300'
                }`}>
                  {gen2Obtained}/{gen2Total}
                </span>
              </button>

              {/* Gen 1 Tab */}
              <button
                onClick={() => onSelectGen(1)}
                className={`relative px-4 py-2.5 rounded-xl font-hud font-extrabold text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-between gap-3 active:scale-95 ${
                  activeGen === 1
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-[0_0_20px_rgba(255,191,0,0.5)] font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers className={`w-4 h-4 ${activeGen === 1 ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>GEN 1 RUNNERS</span>
                </div>
                <span className={`px-2 py-0.5 rounded-md font-mono text-xs font-bold ${
                  activeGen === 1 ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-amber-300'
                }`}>
                  {gen1Obtained}/{gen1Total}
                </span>
              </button>

            </div>

            {/* Export & Reset Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenExportModal}
                className="px-3.5 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-xl font-hud font-bold text-xs uppercase tracking-wider transition active:scale-95 flex items-center gap-1.5"
                title="Generar imagen PNG para redes"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">EXPORTAR PNG</span>
              </button>

              <button
                onClick={onResetGen}
                className="px-3 py-2.5 bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-white/10 hover:border-rose-500/40 rounded-xl font-hud font-bold text-xs uppercase tracking-wider transition active:scale-95 flex items-center gap-1.5"
                title="Reiniciar progreso de esta generación"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* HUD Centerpiece: Progress Radial Gauge & Stats Counter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Radial Gauge Centerpiece (5 cols) */}
          <div className="lg:col-span-5 glass-panel-glow p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            
            {/* SVG Circular Radial Gauge */}
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="text-slate-800"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="text-cyan-400 transition-all duration-700 ease-out"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-hud font-black text-3xl text-white tracking-tight leading-none">
                  {percentage}%
                </span>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest mt-1">
                  COMPLETADO
                </span>
              </div>
            </div>

            {/* Radial Info Details */}
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                ESTADO GENERAL DE LA GEN {activeGen}
              </span>
              <h3 className="text-xl font-hud font-black text-white uppercase tracking-wide">
                {stats.obtained === totalCount 
                  ? '¡COLECCIÓN DOMINADA!' 
                  : stats.obtained > 0 
                  ? 'EN PROGRESO ACTIVO' 
                  : 'CASILLERO SIN INICIAR'}
              </h3>
              <p className="text-xs text-slate-300 font-mono">
                {stats.obtained} de {totalCount} espíritus registrados en esta categoría.
              </p>
            </div>
          </div>

          {/* 3 AAA Stats Counters Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* 1. Obtenidos */}
            <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-cyan-400 hover:border-cyan-400 transition-all duration-200 group">
              <div className="flex items-center justify-between text-cyan-400 mb-2">
                <span className="font-hud font-bold text-xs uppercase tracking-wider text-slate-300">OBTENIDOS</span>
                <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-hud font-black text-3xl text-white">
                {stats.obtained}
              </div>
              <div className="text-[11px] font-mono text-cyan-300/80 mt-1">
                {Math.round((stats.obtained / totalCount) * 100) || 0}% de la generación
              </div>
            </div>

            {/* 2. Dominados */}
            <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-amber-400 hover:border-amber-400 transition-all duration-200 group">
              <div className="flex items-center justify-between text-amber-400 mb-2">
                <span className="font-hud font-bold text-xs uppercase tracking-wider text-slate-300">DOMINADOS</span>
                <Crown className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-hud font-black text-3xl text-amber-300">
                {stats.mastered}
              </div>
              <div className="text-[11px] font-mono text-amber-300/80 mt-1">
                Nivel Máximo (Crown)
              </div>
            </div>

            {/* 3. Faltantes */}
            <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-slate-600 hover:border-slate-400 transition-all duration-200 group">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="font-hud font-bold text-xs uppercase tracking-wider text-slate-300">FALTANTES</span>
                <CircleDashed className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-hud font-black text-3xl text-slate-300">
                {stats.missing}
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                Pendientes por desbloquear
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
