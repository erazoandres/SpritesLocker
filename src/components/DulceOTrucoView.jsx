import React, { useState, useMemo } from 'react';
import { GEN2_SPIRITS } from '../data/gen2_spirits';
import { Download, ArrowLeft, CheckCircle2, RotateCcw, Sparkles, Check, X } from 'lucide-react';

/**
 * Red Ink Hand-Drawn Scribble Mark SVGs
 * Recreates the hand-annotated red ink scribbles from the user's reference screenshot.
 */
const RedScribbleMark = ({ index = 0 }) => {
  const variant = index % 4;

  const scribbles = [
    // Variant 0: Check & loop scribble
    <path
      key="s0"
      d="M 6,18 C 12,24 14,26 18,24 C 22,20 26,10 32,8 C 24,14 18,22 14,20 C 10,18 12,12 18,14 C 24,16 28,24 34,22"
      fill="none"
      stroke="#ff1e27"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="drop-shadow(0px 0px 4px rgba(255, 30, 39, 0.8))"
    />,
    // Variant 1: Quick double loop brush mark
    <path
      key="s1"
      d="M 8,12 C 18,4 28,14 20,24 C 12,30 6,18 16,14 C 26,10 32,18 36,24 M 22,18 C 26,20 30,22 34,20"
      fill="none"
      stroke="#ff1e27"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="drop-shadow(0px 0px 4px rgba(255, 30, 39, 0.8))"
    />,
    // Variant 2: Zigzag stroke scribble
    <path
      key="s2"
      d="M 6,10 Q 20,6 28,12 Q 12,18 8,22 Q 24,24 34,16 Q 18,26 10,26"
      fill="none"
      stroke="#ff1e27"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="drop-shadow(0px 0px 4px rgba(255, 30, 39, 0.8))"
    />,
    // Variant 3: Curved tick mark with splash
    <path
      key="s3"
      d="M 8,18 C 14,22 16,26 18,26 C 24,16 28,10 34,6 C 26,14 20,22 14,20 Q 22,12 30,16"
      fill="none"
      stroke="#ff1e27"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="drop-shadow(0px 0px 4px rgba(255, 30, 39, 0.8))"
    />
  ];

  return (
    <svg className="w-full h-full p-2 select-none pointer-events-none" viewBox="0 0 40 32">
      {scribbles[variant]}
    </svg>
  );
};

/**
 * Top TV Broadcast LED Ticker Bar
 */
const TopTVTickerBar = () => (
  <div className="w-full bg-[#0a0416]/95 border-b-2 border-purple-500/60 py-1 font-mono select-none overflow-hidden shrink-0 shadow-[0_4px_15px_rgba(168,85,247,0.3)] relative z-50">
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-emerald-400" />
    <div className="whitespace-nowrap flex items-center">
      <div className="inline-flex items-center gap-12 animate-marquee font-black text-xs sm:text-sm tracking-widest text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.9)] uppercase">
        <span>🎃 BIENVENIDOS A LA EDICIÓN DULCE O TRUCO 👻</span>
        <span>⚡ EL CASILLERO DE ESPÍRITUS 🎮</span>
        <span>🎃 BIENVENIDOS A LA EDICIÓN DULCE O TRUCO 👻</span>
        <span>⚡ EL CASILLERO DE ESPÍRITUS 🎮</span>
      </div>
    </div>
  </div>
);

/**
 * Bottom TV Broadcast LED Ticker Bar
 */
const BottomTVTickerBar = () => (
  <div className="w-full bg-[#0a0416]/95 border-t-2 border-purple-500/60 py-1 font-mono select-none overflow-hidden shrink-0 shadow-[0_-4px_15px_rgba(168,85,247,0.3)] relative z-50">
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-amber-400 to-purple-500" />
    <div className="whitespace-nowrap flex items-center">
      <div className="inline-flex items-center gap-12 animate-marquee font-black text-xs sm:text-sm tracking-widest text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.9)] uppercase">
        <span>💥 EVENTO EN VIVO: DULCE O TRUCO 🌟</span>
        <span>🔥 MARCA TUS ESPÍRITUS FAVORITOS Y DESCARGA TU CAPTURA HD 🚀</span>
        <span>💥 EVENTO EN VIVO: DULCE O TRUCO 🌟</span>
        <span>🔥 MARCA TUS ESPÍRITUS FAVORITOS Y DESCARGA TU CAPTURA HD 🚀</span>
      </div>
    </div>
  </div>
);

/**
 * DulceOTrucoView Component
 * Main view recreating the exact layout and dark purple visual aesthetic of the screenshot.
 * Fits strictly within 100vh / 100dvh height with Top and Bottom TV Broadcast Ticker Bars.
 */
export default function DulceOTrucoView({
  userState = {},
  onToggleSpirit,
  onBatchUpdate,
  onSwitchToMain,
  onOpenExportModal
}) {
  const [activeMode, setActiveMode] = useState('tengo'); // 'tengo' or 'faltan'

  // Filter ONLY spirits belonging to 'Truco o trato' or 'Fuego Naranja'
  const dulceSpirits = useMemo(() => {
    const filtered = GEN2_SPIRITS.filter(
      s => s.variant === 'Truco o trato' || s.variant === 'Fuego Naranja'
    );

    // Sort spirits to match exact order in screenshot:
    // 'Truco o trato' spirits first, then 'Fuego Naranja' spirits at the end
    const trickOrTreat = filtered.filter(s => s.variant === 'Truco o trato');
    const fuegoNaranja = filtered.filter(s => s.variant === 'Fuego Naranja');

    return [...trickOrTreat, ...fuegoNaranja];
  }, []);

  // Handle tile click based on activeMode ('tengo' vs 'faltan')
  const handleTileTap = (spiritId) => {
    if (activeMode === 'faltan') {
      const current = userState[spiritId] ?? 0;
      if (current === 3) {
        if (onBatchUpdate) onBatchUpdate({ [spiritId]: 0 });
      } else {
        if (onBatchUpdate) onBatchUpdate({ [spiritId]: 3 });
      }
    } else {
      if (onToggleSpirit) onToggleSpirit(spiritId);
    }
  };

  // Stats calculation for category
  const obtainedCount = useMemo(() => {
    return dulceSpirits.filter(s => (userState[s.id] || 0) >= 1 && (userState[s.id] || 0) !== 3).length;
  }, [dulceSpirits, userState]);

  const totalCount = dulceSpirits.length;
  const pct = Math.round((obtainedCount / totalCount) * 100) || 0;

  // Batch mark all in category as TENGO (1)
  const handleMarkAll = () => {
    const updates = {};
    dulceSpirits.forEach(s => {
      updates[s.id] = 1;
    });
    if (onBatchUpdate) onBatchUpdate(updates);
  };

  // Batch clear all in category
  const handleClearAll = () => {
    const updates = {};
    dulceSpirits.forEach(s => {
      updates[s.id] = 0;
    });
    if (onBatchUpdate) onBatchUpdate(updates);
  };

  return (
    <div className="h-screen h-[100dvh] w-screen max-h-screen max-w-vw overflow-hidden bg-gradient-to-b from-[#1c082e] via-[#12041f] to-[#090112] text-slate-100 relative flex flex-col justify-between selection:bg-purple-500 selection:text-white font-sans">
      
      {/* Background Decorative Ambient Radial Swirl Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-purple-950/10 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-fuchsia-600/10 blur-[110px] rounded-full pointer-events-none -z-10" />

      {/* Top Edge TV Broadcast Marquee Ticker Bar */}
      <TopTVTickerBar />

      {/* Top HUD Navigation Header Bar */}
      <nav className="shrink-0 z-40 bg-[#0e0419]/90 border-b border-purple-500/20 backdrop-blur-md px-3 sm:px-6 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
          
          {/* Left: Back to Main Locker Button */}
          <button
            onClick={onSwitchToMain}
            className="flex items-center gap-1.5 bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 border border-purple-500/40 px-2.5 py-0.5 rounded-xl text-xs font-bold transition active:scale-95 shadow-md font-mono"
            title="Volver a la vista principal del Casillero de Espíritus"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-purple-300" />
            <span className="hidden sm:inline">CASILLERO PRINCIPAL</span>
            <span className="sm:hidden">VOLVER</span>
          </button>

          {/* Center: Click Mode Selector (TENGO vs FALTAN) */}
          <div className="flex items-center gap-1.5 font-mono text-xs select-none">
            <button
              onClick={() => setActiveMode('tengo')}
              className={`px-2.5 py-0.5 rounded-xl font-bold transition flex items-center gap-1 text-[11px] active:scale-95 ${
                activeMode === 'tengo'
                  ? 'bg-emerald-400 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                  : 'bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30'
              }`}
              title="Modo activo: al hacer clic en un espíritu se marca como TENGO (✓)"
            >
              <Check className="w-3 h-3 stroke-[3]" />
              <span className="hidden sm:inline">SOLO LOS QUE TIENES</span>
              <span className="sm:hidden">TENGO</span>
            </button>

            <button
              onClick={() => setActiveMode('faltan')}
              className={`px-2.5 py-0.5 rounded-xl font-bold transition flex items-center gap-1 text-[11px] active:scale-95 ${
                activeMode === 'faltan'
                  ? 'bg-rose-500 text-white font-black shadow-md shadow-rose-500/20'
                  : 'bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30'
              }`}
              title="Modo activo: al hacer clic en un espíritu se marca como ME FALTA (✗)"
            >
              <span className="font-black text-xs">✗</span>
              <span className="hidden sm:inline">SOLO LOS QUE FALTAN</span>
              <span className="sm:hidden">FALTAN</span>
            </button>
          </div>

          {/* Right: Progress Pill & Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 bg-[#19082a] border border-purple-400/30 px-2.5 py-0.5 rounded-xl text-xs font-mono">
              <span className="text-slate-400 font-medium">OBTENIDOS:</span>
              <strong className="text-purple-300 font-extrabold">{obtainedCount} / {totalCount}</strong>
              <span className="text-slate-500 text-[10px]">({pct}%)</span>
            </div>

            <button
              onClick={handleMarkAll}
              className="hidden lg:flex items-center gap-1 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-xl text-xs font-mono font-bold transition active:scale-95"
              title="Marcar todos los espíritus de esta categoría"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>TODOS</span>
            </button>

            <button
              onClick={handleClearAll}
              className="hidden sm:flex items-center gap-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-xl text-xs font-mono font-bold transition active:scale-95"
              title="Desmarcar todos los espíritus de esta categoría"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>LIMPIAR</span>
            </button>

            <button
              onClick={onOpenExportModal}
              className="flex items-center gap-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-black px-3.5 py-0.5 rounded-xl text-xs shadow-lg shadow-purple-500/25 active:scale-95 transition tracking-wider font-mono"
              title="Abrir modal para guardar o exportar captura en alta definición"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>DESCARGAR</span>
            </button>
          </div>

        </div>
      </nav>

      {/* Main Container - Scaled to fit 100vh flexbox */}
      <main className="flex-1 flex items-center justify-center max-w-5xl mx-auto px-2 sm:px-4 w-full py-1 min-h-0 overflow-hidden">
        
        {/* Grid Container (Faithfully aligned 8-per-row grid on desktop matching screenshot) */}
        <div className="flex-1 flex items-center justify-center min-h-0 py-1">
          
          {/* Responsive Grid: 8 columns on desktop, 4 columns on mobile */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-x-1 sm:gap-x-1.5 md:gap-x-2 gap-y-1 sm:gap-y-2 items-end justify-items-center w-full max-h-full">
            {dulceSpirits.map((spirit, idx) => {
              const status = userState[spirit.id] ?? 0;
              const isObtained = status === 1 || status === 2;
              const isMissing = status === 3;

              return (
                <div
                  key={spirit.id}
                  onClick={() => handleTileTap(spirit.id)}
                  className="flex flex-col items-center group cursor-pointer select-none transition-transform duration-200 active:scale-95 w-full justify-end"
                  title={`${spirit.family} (${spirit.variant}) - Haz clic en modo ${activeMode.toUpperCase()}`}
                >
                  {/* Floating 3D Spirit Character Render */}
                  <div className="relative h-[8.5vh] sm:h-[10.5vh] max-h-24 min-h-[38px] w-full flex items-center justify-center mb-0.5">
                    
                    {/* Glowing backlight pulse when marked */}
                    {isObtained && (
                      <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 via-amber-500/20 to-transparent blur-md rounded-full animate-pulse pointer-events-none" />
                    )}

                    {isMissing && (
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-500/20 to-transparent blur-md rounded-full animate-pulse pointer-events-none" />
                    )}

                    <img
                      src={spirit.image}
                      alt={spirit.family}
                      className={`max-h-full max-w-full object-contain filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.85)] group-hover:-translate-y-1 group-hover:scale-105 transition-all duration-200 ${
                        isMissing ? 'opacity-65 grayscale-[0.3]' : 'opacity-100'
                      }`}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/sprites/espiritus/bush.png';
                      }}
                    />
                  </div>

                  {/* Metallic Rounded-Square Button/Box Underneath */}
                  <div className={`relative h-[5.5vh] sm:h-[7vh] max-h-16 min-h-[32px] aspect-square rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center ${
                    isObtained
                      ? 'bg-gradient-to-b from-[#36294a]/95 via-[#251b36]/95 to-[#160f24]/95 border-2 border-red-500/80 shadow-[0_0_12px_rgba(255,30,39,0.35)]'
                      : isMissing
                      ? 'bg-gradient-to-b from-[#3a1c28]/95 via-[#29131d]/95 to-[#1c0c14]/95 border-2 border-rose-500/80 shadow-[0_0_12px_rgba(244,63,94,0.35)]'
                      : 'bg-gradient-to-b from-[#2d243e]/90 via-[#201830]/90 to-[#140e21]/90 border border-slate-500/40 border-t-white/60 shadow-md shadow-black/80 group-hover:border-white/80 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                  }`}>
                    {/* Top Edge Highlight Rim */}
                    <div className="absolute top-0 left-1.5 right-1.5 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full pointer-events-none" />

                    {/* Red Ink Scribble Mark when TENGO / DOMINADO */}
                    {isObtained && (
                      <RedScribbleMark index={idx} />
                    )}

                    {/* Red Cross Badge when ME FALTA */}
                    {isMissing && (
                      <div className="w-full h-full flex items-center justify-center font-black text-rose-500 text-lg sm:text-xl drop-shadow-[0_0_8px_rgba(244,63,94,0.9)] select-none">
                        ✗
                      </div>
                    )}
                  </div>

                  {/* Spirit Label Caption below tile */}
                  <span className={`text-[9px] sm:text-[11px] font-mono font-bold mt-0.5 text-center transition-colors truncate max-w-full px-0.5 leading-none ${
                    isObtained ? 'text-amber-300 font-black' : isMissing ? 'text-rose-400 font-bold' : 'text-slate-400 group-hover:text-white'
                  }`}>
                    {spirit.family}
                  </span>

                </div>
              );
            })}
          </div>

        </div>

      </main>

      {/* Bottom Edge TV Broadcast Marquee Ticker Bar */}
      <BottomTVTickerBar />

    </div>
  );
}
