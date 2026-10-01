import React, { useState, useMemo, useRef } from 'react';
import { Search, Check, Star, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';

export default function MinimalSpriteGrid({ 
  spirits, 
  userState, 
  onToggleSpirit, 
  onBatchUpdate,
  activeGen,
  onResetGen
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('Todas');
  const [hoveredFamily, setHoveredFamily] = useState(null);
  const [tooltipSpirit, setTooltipSpirit] = useState(null);
  const [activeMode, setActiveMode] = useState('tengo'); // 'tengo' or 'faltan'
  
  // Drag to scroll states for family pills bar
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);

  const familyBarRef = useRef(null);

  // Group spirits list of families
  const familyList = useMemo(() => {
    const set = new Set(spirits.map(s => s.family));
    return ['Todas', ...Array.from(set)];
  }, [spirits]);

  // Filtered spirits based on search query and family pill selection
  const filteredSpirits = useMemo(() => {
    return spirits.filter(s => {
      const matchFam = selectedFamily === 'Todas' || s.family === selectedFamily;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || `${s.family} ${s.familyEn} ${s.variant} ${s.ability || ''}`.toLowerCase().includes(q);
      return matchFam && matchSearch;
    });
  }, [spirits, searchQuery, selectedFamily]);

  // Group filtered spirits by family for the Ultra-Compact Rows Layout
  const spiritsGroupedByFamily = useMemo(() => {
    const groups = {};
    filteredSpirits.forEach(spirit => {
      if (!groups[spirit.family]) {
        groups[spirit.family] = [];
      }
      groups[spirit.family].push(spirit);
    });
    return groups;
  }, [filteredSpirits]);

  // Mouse Drag-to-Scroll handlers for Family Pills Bar
  const handleMouseDown = (e) => {
    const container = familyBarRef.current;
    if (!container) return;
    setIsMouseDown(true);
    setDragStartX(e.pageX - container.offsetLeft);
    setScrollStartX(container.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const container = familyBarRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragStartX) * 1.5;
    container.scrollLeft = scrollStartX - walk;
  };

  // Handle tile tap based on active click mode
  const handleTileTap = (id) => {
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

  // Helper for variant text color accent
  const getVariantTextColor = (variant) => {
    switch (variant) {
      case 'Oro': return 'text-amber-400 font-black';
      case 'Maestro de Trucos': return 'text-purple-400 font-black';
      case 'Hacker de botín': return 'text-emerald-400 font-black';
      case 'Cazarrecompensas': return 'text-rose-400 font-black';
      default: return 'text-slate-300 font-extrabold';
    }
  };

  return (
    <div className="space-y-3 font-sans w-full overflow-x-hidden">
      
      {/* Horizontal Scrollable Family Quick Pills Bar */}
      <div 
        ref={familyBarRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none cursor-grab active:cursor-grabbing select-none w-full"
      >
        {familyList.map(fam => {
          const isSelected = selectedFamily === fam;
          if (fam === 'Todas') {
            return (
              <button
                key={fam}
                onClick={() => setSelectedFamily('Todas')}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition shrink-0 border ${
                  isSelected 
                    ? 'bg-emerald-400 text-slate-950 border-emerald-400 font-extrabold shadow-md shadow-emerald-500/20' 
                    : 'bg-[#101322] text-slate-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                TODAS LAS FAMILIAS ({spirits.length})
              </button>
            );
          }

          // Count obtained for this family
          const famSpirits = spirits.filter(s => s.family === fam);
          const famObtained = famSpirits.filter(s => (userState[s.id] || 0) >= 1).length;
          const isComplete = famSpirits.length > 0 && famObtained === famSpirits.length;

          return (
            <div
              key={fam}
              onMouseEnter={() => setHoveredFamily(fam)}
              onMouseLeave={() => setHoveredFamily(null)}
              className={`flex items-center gap-1 bg-[#101322] px-2 py-1 rounded-xl border text-xs font-mono whitespace-nowrap transition shrink-0 ${
                isSelected 
                  ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10' 
                  : isComplete
                  ? 'border-amber-400/50 text-amber-400 bg-amber-500/10'
                  : 'border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => setSelectedFamily(fam)}
                className="font-bold hover:underline decoration-emerald-400/40 text-xs"
              >
                {fam} ({famObtained}/{famSpirits.length})
              </button>

              {/* 1-Tap Batch Actions for Family */}
              <div className="flex items-center gap-0.5 ml-1 border-l border-white/10 pl-1">
                <button
                  onClick={() => handleBatchFamily(fam, 1)}
                  className="hover:text-emerald-400 text-[10px] text-slate-500 px-0.5 font-black"
                  title={`Estampar sello Obtenido a todo ${fam}`}
                >
                  ✓
                </button>
                <button
                  onClick={() => handleBatchFamily(fam, 2)}
                  className="hover:text-amber-400 text-[10px] text-slate-500 px-0.5 font-black"
                  title={`Estampar sello Dominado a todo ${fam}`}
                >
                  ★
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- ULTRA-COMPACT FAMILY ROWS LAYOUT (FITS 4+ FAMILIES IN 100VH) --- */}
      <div id="tour-sprite-grid" className="space-y-3 pt-1">
        {Object.keys(spiritsGroupedByFamily).map(famName => {
          const famSpirits = spiritsGroupedByFamily[famName];
          if (!famSpirits || famSpirits.length === 0) return null;

          const baseItem = famSpirits[0];
          const famObtained = famSpirits.filter(s => (userState[s.id] || 0) >= 1).length;
          const isComplete = famObtained === famSpirits.length;

          return (
            <div key={famName} className="space-y-1">
              
              {/* Micro Inline Header Line */}
              <div className="flex items-center justify-between px-1 py-0.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-extrabold uppercase text-white font-display tracking-wider">
                    {famName}
                  </h3>

                  <span className={`px-1.5 py-0.5 rounded border text-[8px] font-mono font-black uppercase ${getRarityBadgeStyle(baseItem.rarity)}`}>
                    {baseItem.rarity}
                  </span>

                  <span className="text-[11px] font-mono text-slate-400 font-bold">
                    ({famObtained}/{famSpirits.length})
                  </span>

                  {isComplete && (
                    <span className="text-amber-400 font-black text-[8px] bg-amber-400/10 px-1 py-0.5 rounded border border-amber-400/30 font-mono">
                      COMPLETA
                    </span>
                  )}
                </div>

                {/* Micro Batch Action Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleBatchFamily(famName, 1)}
                    className="px-1.5 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 text-[9px] font-mono font-bold transition flex items-center gap-0.5 active:scale-95"
                    title={`Estampar todo ${famName} como Obtenido`}
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                    <span>TODOS</span>
                  </button>

                  <button
                    onClick={() => handleBatchFamily(famName, 2)}
                    className="px-1.5 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/25 text-amber-400 text-[9px] font-mono font-bold transition flex items-center gap-0.5 active:scale-95"
                    title={`Estampar todo ${famName} como Dominado`}
                  >
                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                    <span>DOMINAR</span>
                  </button>

                  <button
                    onClick={() => handleBatchFamily(famName, 0)}
                    className="p-0.5 rounded bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition active:scale-95"
                    title={`Quitar sellos de ${famName}`}
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              {/* Ultra-Compact Seamless Grid Row of Spirits */}
              <div className={`grid gap-1.5 sm:gap-2 ${
                famSpirits.length === 1
                  ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-6'
                  : famSpirits.length === 3
                  ? 'grid-cols-3 sm:grid-cols-3 lg:grid-cols-6'
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
              }`}>
                {famSpirits.map(spirit => {
                  const status = userState[spirit.id] ?? 0;

                  return (
                    <div
                      key={spirit.id}
                      id={`spirit-tile-${spirit.id}`}
                      onClick={() => handleTileTap(spirit.id)}
                      onMouseEnter={() => setTooltipSpirit(spirit)}
                      onMouseLeave={() => setTooltipSpirit(null)}
                      className="group relative cursor-pointer flex flex-col items-center justify-between p-1.5 rounded-xl hover:bg-white/5 transition-all duration-150 select-none border border-transparent hover:border-white/10"
                    >
                      {/* REAL OFFICIAL WAX / INK STAMP OVERLAY */}
                      {status > 0 && (
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 transition-all duration-200 transform ${
                          status === 2
                            ? 'rotate-[-8deg] scale-100'
                            : status === 1
                            ? 'rotate-[8deg] scale-100'
                            : 'rotate-[-12deg] scale-100'
                        }`}>
                          <div className={`px-2 py-0.5 rounded border border-dashed font-mono text-[9px] font-black uppercase tracking-wider flex items-center gap-1 backdrop-blur-xs select-none shadow-xl ${
                            status === 2
                              ? 'border-amber-400 text-amber-300 bg-amber-950/90 shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                              : status === 1
                              ? 'border-emerald-400 text-emerald-300 bg-emerald-950/90 shadow-[0_0_10px_rgba(16,185,129,0.6)]'
                              : 'border-rose-500 text-rose-300 bg-rose-950/90 shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                          }`}>
                            {status === 2 ? (
                              <>
                                <Star className="w-2.5 h-2.5 fill-amber-300" />
                                <span>DOMINADO</span>
                              </>
                            ) : status === 1 ? (
                              <>
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                                <span>OBTENIDO</span>
                              </>
                            ) : (
                              <>
                                <span className="text-[10px]">✗</span>
                                <span>FALTANTE</span>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {/* 1. High-Res 3D Floating Spirit Render (Optimized height ~68px to 80px) */}
                      <div className="h-16 sm:h-20 w-full flex items-center justify-center relative my-0.5">
                        <img
                          src={spirit.image}
                          alt={`${spirit.family} ${spirit.variant}`}
                          className={`max-h-full max-w-[95%] object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-all duration-200 ease-out ${
                            status === 0 ? 'opacity-85 hover:opacity-100' : 'opacity-100'
                          }`}
                          loading="lazy"
                        />
                      </div>

                      {/* 2. Compact Variant Title */}
                      <div className="w-full text-center z-10 pt-1 border-t border-white/10 bg-black/40 -mx-1.5 -mb-1.5 p-1 rounded-b-xl backdrop-blur-xs flex items-center justify-between">
                        <span className={`text-[10px] font-mono uppercase tracking-wider block truncate ${getVariantTextColor(spirit.variant)}`}>
                          {spirit.variant}
                        </span>
                        <span className="text-[8px] font-mono text-slate-500 font-bold uppercase">
                          {status === 2 ? '★' : status === 1 ? '✓' : status === 3 ? '✗' : '+'}
                        </span>
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
