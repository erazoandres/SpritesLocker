import React, { useState, useMemo, useRef } from 'react';
import { Check, Star, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';

const VARIANT_COLUMNS = ['Base', 'Oro', 'Maestro de Trucos', 'Hacker de botín', 'Cazarrecompensas'];

export default function MinimalSpriteGrid({ 
  spirits, 
  userState, 
  onToggleSpirit, 
  onBatchUpdate,
  activeGen,
  onResetGen
}) {
  const [activeFamilyRow, setActiveFamilyRow] = useState(null);
  const [tooltipSpirit, setTooltipSpirit] = useState(null);
  const [activeMode, setActiveMode] = useState('tengo'); // 'tengo' or 'faltan'

  // Smooth scroll row to center of viewport
  const scrollToFamilyRow = (famName) => {
    setActiveFamilyRow(famName);
    setTimeout(() => {
      const el = document.getElementById(`family-row-${famName}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  // Group spirits by family
  const spiritsGroupedByFamily = useMemo(() => {
    const groups = {};
    spirits.forEach(spirit => {
      if (!groups[spirit.family]) {
        groups[spirit.family] = [];
      }
      groups[spirit.family].push(spirit);
    });
    return groups;
  }, [spirits]);

  // Handle tile tap based on active click mode
  const handleTileTap = (id, famName) => {
    if (famName && activeFamilyRow !== famName) {
      scrollToFamilyRow(famName);
    }
    if (activeMode === 'faltan') {
      const current = userState[id] ?? 0;
      if (current === 3) {
        const updates = { [id]: 0 };
        if (onBatchUpdate) onBatchUpdate(updates);
      } else {
        const updates = { [id]: current === 3 ? 0 : 3 };
        if (onBatchUpdate) onBatchUpdate(updates);
      }
    } else {
      onToggleSpirit(id);
    }
  };

  // Batch update family by active mode or target status
  const handleBatchFamily = (famName, targetStatus) => {
    const famSpirits = spirits.filter(s => s.family === famName);
    const updates = {};
    famSpirits.forEach(s => {
      updates[s.id] = targetStatus;
    });
    if (onBatchUpdate) onBatchUpdate(updates);
  };

  // Batch mark all unobtained spirits as missing (status 3: Faltante / Me falta)
  const handleMarkOnlyMissing = () => {
    const updates = {};
    spirits.forEach(s => {
      const st = userState[s.id] ?? 0;
      if (st !== 1 && st !== 2) {
        updates[s.id] = 3;
      }
    });
    if (onBatchUpdate) onBatchUpdate(updates);
  };

  // Batch clear/unmark all missing spirits back to 0
  const handleClearMissing = () => {
    const updates = {};
    spirits.forEach(s => {
      const st = userState[s.id] ?? 0;
      if (st === 3) {
        updates[s.id] = 0;
      }
    });
    if (onBatchUpdate) onBatchUpdate(updates);
  };

  // Helper for rarity badge styling
  const getRarityBadgeStyle = (rarity) => {
    switch (rarity) {
      case 'Mítico':
        return 'bg-amber-500/15 border-amber-400/40 text-amber-300';
      case 'Legendario':
        return 'bg-violet-500/15 border-violet-400/40 text-violet-300';
      case 'Épico':
        return 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300';
      case 'Raro':
        return 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300';
      default:
        return 'bg-slate-800/80 border-slate-700 text-slate-300';
    }
  };

  return (
    <div className="space-y-2 font-sans w-full overflow-x-hidden">
      
      {/* --- TOP ACTION CONTROL BAR: QUICK FALTANTES BATCH & TAP MODE TOGGLE --- */}
      <div id="tour-faltantes-bar" className="bg-[#101322]/90 border border-white/10 p-2.5 sm:p-3 rounded-2xl mb-2 flex items-center justify-end backdrop-blur-md shadow-xl">
        
        {/* Action Controls & Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 font-mono text-xs w-full">
          
          {/* Mode Toggle Button: TENGO (✓) vs ME FALTA (✗) */}
          <div className="flex items-center bg-[#0a0b12] p-1 rounded-xl border border-white/10 shrink-0">
            <span className="text-[10px] text-slate-400 font-bold px-2 uppercase hidden lg:inline">MODO:</span>
            <button
              onClick={() => setActiveMode('tengo')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition flex items-center gap-1.5 ${
                activeMode === 'tengo'
                  ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Al hacer clic en una casilla: Alternar estado Tengo (✓) / Dominado (★)"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>TENGO (✓)</span>
            </button>
            <button
              onClick={() => setActiveMode('faltan')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition flex items-center gap-1.5 ${
                activeMode === 'faltan'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Al hacer clic en una casilla: Marcar directo como Me Falta (✗)"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>ME FALTA (✗)</span>
            </button>
          </div>

          {/* Prominent Batch Action Button: MARCAR LO QUE ME FALTA */}
          <button
            onClick={handleMarkOnlyMissing}
            className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 hover:text-rose-200 font-black text-[11px] uppercase tracking-wider transition flex items-center gap-1.5 active:scale-95 shadow-md shadow-rose-500/10 shrink-0"
            title="Marcar automáticamente como Faltante (✗) todos los espíritus que aún no has obtenido"
          >
            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>[ ✗ MARCAR SOLO FALTANTES ]</span>
          </button>

          {/* Quick Clear Missing Button: LIMPIAR FALTANTES */}
          <button
            onClick={handleClearMissing}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-slate-300 font-bold text-[11px] uppercase transition flex items-center gap-1.5 active:scale-95 shrink-0"
            title="Quitar el estado Me falta (✗) de todos los espíritus"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>[ ↺ LIMPIAR FALTANTES ]</span>
          </button>

        </div>
      </div>

      {/* --- GLOBAL TOP VARIANT COLUMN HEADERS (EXACTLY MATCHING KIWEGAME REFERENCE SCREENSHOT) --- */}
      <div className="hidden md:flex items-center gap-2 sm:gap-3 px-1 py-1.5 border-b border-white/10 font-mono text-[11px] font-black uppercase tracking-wider text-slate-400 select-none">
        
        {/* Left Column Spacer matching Family Info width */}
        <div className="w-32 sm:w-40 shrink-0 text-left pl-1">
          <span>FAMILIA</span>
        </div>

        {/* 5 Column Variant Titles */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 flex-1 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span className="text-slate-300">BASE</span>
          </div>

          <div className="flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-amber-400">DORADO</span>
          </div>

          <div className="flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-emerald-400">HACKER</span>
          </div>

          <div className="flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-cyan-400">HACKER DE BOTÍN</span>
          </div>

          <div className="flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            <span className="text-pink-400">CAZARRECOMPENSAS</span>
          </div>
        </div>

      </div>

      {/* --- HIGH-DENSITY SEAMLESS TABLE MATRIX (EXACTLY MATCHING KIWEGAME REFERENCE SCREENSHOT) --- */}
      <div id="tour-sprite-grid" className="space-y-1">
        {Object.keys(spiritsGroupedByFamily).map(famName => {
          const famSpirits = spiritsGroupedByFamily[famName];
          if (!famSpirits || famSpirits.length === 0) return null;

          const baseItem = famSpirits[0];
          const famObtained = famSpirits.filter(s => (userState[s.id] || 0) >= 1).length;
          const isComplete = famObtained === famSpirits.length;
          const isRowActive = activeFamilyRow === famName;

          return (
            <div 
              key={famName} 
              id={`family-row-${famName}`}
              onClick={() => {
                if (activeFamilyRow !== famName) {
                  scrollToFamilyRow(famName);
                }
              }}
              className={`flex flex-col md:flex-row md:items-center gap-2 sm:gap-3 py-1.5 px-1 rounded-2xl transition-all duration-300 ${
                isRowActive 
                  ? 'bg-white/[0.04] border border-emerald-400/30 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-400/20' 
                  : 'border-b border-white/5 hover:bg-white/[0.02]'
              }`}
            >
              
              {/* Left Column: Family Info */}
              <div className="w-full md:w-32 sm:md:w-40 shrink-0 px-1 space-y-0.5 text-left flex md:flex-col justify-between md:justify-center items-center md:items-start">
                <div>
                  <h3 className="text-xs sm:text-sm font-black uppercase text-white font-display leading-tight">
                    {famName}
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] font-mono">
                    <span className={`px-1 rounded text-[8px] font-bold uppercase ${getRarityBadgeStyle(baseItem.rarity)}`}>
                      {baseItem.rarity}
                    </span>
                    <span className="text-slate-500 font-bold">({famObtained}/{famSpirits.length})</span>
                  </div>
                </div>

                {/* Micro Batch Action Buttons */}
                <div className="flex items-center gap-1 mt-0.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleBatchFamily(famName, 1); }}
                    className="px-1 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 text-[9px] font-mono font-bold transition flex items-center gap-0.5"
                    title={`Marcar todo ${famName} como Obtenido`}
                  >
                    ✓
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleBatchFamily(famName, 2); }}
                    className="px-1 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/25 text-amber-400 text-[9px] font-mono font-bold transition flex items-center gap-0.5"
                    title={`Marcar todo ${famName} como Dominado`}
                  >
                    ★
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleBatchFamily(famName, 0); }}
                    className="p-0.5 rounded bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition"
                    title={`Reiniciar ${famName}`}
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              {/* 5 Variant Grid Columns */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 flex-1 w-full">
                {VARIANT_COLUMNS.map(colVariantName => {
                  // Find matching spirit for this column
                  const spirit = famSpirits.find(s => s.variant === colVariantName) || (colVariantName === 'Base' && famSpirits.length === 1 ? famSpirits[0] : null);

                  if (!spirit) {
                    return (
                      <div 
                        key={colVariantName} 
                        className="w-full h-32 sm:h-36 md:h-40 opacity-20 border border-dashed border-white/5 rounded-2xl flex items-center justify-center text-[8px] font-mono text-slate-600"
                      />
                    );
                  }

                  const status = userState[spirit.id] ?? 0;

                  return (
                    <div
                      key={spirit.id}
                      id={`spirit-tile-${spirit.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTileTap(spirit.id, spirit.family);
                      }}
                      onMouseEnter={() => setTooltipSpirit(spirit)}
                      onMouseLeave={() => setTooltipSpirit(null)}
                      className={`group relative h-32 sm:h-36 md:h-40 rounded-2xl p-1 cursor-pointer flex flex-col items-center justify-center transition-all duration-200 select-none ${
                        status === 2
                          ? 'border-2 border-amber-400 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/40'
                          : status === 1
                          ? 'border-2 border-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/40'
                          : status === 3
                          ? 'border-2 border-rose-500 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.25)] ring-1 ring-rose-500/40'
                          : 'border border-transparent hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      {/* Top-Right Circular Status Badge (Directly matching KiweGame screenshot) */}
                      {status > 0 && (
                        <div className={`absolute top-1.5 right-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] font-black z-20 shadow-md ${
                          status === 2
                            ? 'bg-amber-400 text-slate-950'
                            : status === 1
                            ? 'bg-emerald-400 text-slate-950'
                            : 'bg-rose-500 text-white'
                        }`}>
                          {status === 2 ? <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-slate-950" /> : status === 1 ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" /> : '✗'}
                        </div>
                      )}

                      {/* Floating 3D Spirit Render Image */}
                      <div className="h-full w-full flex items-center justify-center p-0.5">
                        <img
                          src={spirit.image}
                          alt={`${spirit.family} ${spirit.variant}`}
                          className={`max-h-full max-w-full object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-200 ${
                            status === 0 ? 'opacity-85 hover:opacity-100' : 'opacity-100'
                          }`}
                          loading="lazy"
                        />
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

      {/* Floating Glass Tooltip when hovering over any spirit tile */}
      {tooltipSpirit && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#101322]/95 border border-emerald-400/50 p-3 rounded-2xl shadow-2xl backdrop-blur-md max-w-sm w-full space-y-1 animate-fadeIn pointer-events-none font-sans">
          <div className="flex items-center justify-between text-xs font-mono">
            <strong className="text-white font-black text-xs uppercase tracking-wide font-display">{tooltipSpirit.family} · {tooltipSpirit.variant}</strong>
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getRarityBadgeStyle(tooltipSpirit.rarity)}`}>
              {tooltipSpirit.rarity}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug font-sans">{tooltipSpirit.ability || 'Espíritu de colección'}</p>
        </div>
      )}

    </div>
  );
}
