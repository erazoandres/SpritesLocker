import React, { useState, useMemo, useRef } from 'react';
import { Search, Check, Star, RotateCcw, CheckCircle2, XCircle, Sparkles, Shield } from 'lucide-react';

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
  
  // Drag to scroll states
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);

  const familyBarRef = useRef(null);

  // Group spirits by family
  const familyList = useMemo(() => {
    const set = new Set(spirits.map(s => s.family));
    return ['Todas', ...Array.from(set)];
  }, [spirits]);

  // Filtered spirits
  const filteredSpirits = useMemo(() => {
    return spirits.filter(s => {
      const matchFam = selectedFamily === 'Todas' || s.family === selectedFamily;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || `${s.family} ${s.familyEn} ${s.variant} ${s.ability || ''}`.toLowerCase().includes(q);
      return matchFam && matchSearch;
    });
  }, [spirits, searchQuery, selectedFamily]);

  // Mouse Drag-to-Scroll handlers (Pull left & right manually)
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
    const walk = (x - dragStartX) * 1.5; // Drag sensitivity
    container.scrollLeft = scrollStartX - walk;
  };

  // Handle tile tap based on active mode
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
        return 'bg-amber-500/15 border-amber-400/40 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'Legendario':
        return 'bg-violet-500/15 border-violet-400/40 text-violet-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]';
      case 'Épico':
        return 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]';
      case 'Raro':
        return 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
      default:
        return 'bg-slate-800/80 border-slate-700 text-slate-300';
    }
  };

  // Helper for card rarity core background gradient
  const getCardCoreBg = (rarity, status) => {
    if (status === 2) return 'bg-gradient-to-b from-amber-500/20 via-[#121528] to-[#0a0b12] border-amber-400 shadow-xl shadow-amber-500/15 card-mastered';
    if (status === 1) return 'bg-gradient-to-b from-emerald-500/20 via-[#101426] to-[#0a0b12] border-emerald-400 shadow-xl shadow-emerald-500/15';
    if (status === 3) return 'bg-gradient-to-b from-rose-500/20 via-[#181120] to-[#0a0b12] border-rose-500 shadow-xl shadow-rose-500/15';

    switch (rarity) {
      case 'Mítico':
        return 'bg-gradient-to-b from-amber-500/10 via-[#101322] to-[#0a0b12] border-white/10 hover:border-amber-400/50 hover:shadow-amber-500/10';
      case 'Legendario':
        return 'bg-gradient-to-b from-violet-500/10 via-[#101322] to-[#0a0b12] border-white/10 hover:border-violet-400/50 hover:shadow-violet-500/10';
      case 'Épico':
        return 'bg-gradient-to-b from-cyan-500/10 via-[#101322] to-[#0a0b12] border-white/10 hover:border-cyan-400/50 hover:shadow-cyan-500/10';
      case 'Raro':
        return 'bg-gradient-to-b from-emerald-500/10 via-[#101322] to-[#0a0b12] border-white/10 hover:border-emerald-400/50 hover:shadow-emerald-500/10';
      default:
        return 'bg-[#101322] border-white/10 hover:border-white/20';
    }
  };

  return (
    <div className="space-y-4 font-sans w-full overflow-x-hidden">
      
      {/* HUD Quick Filter & Mode Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d0f1a]/90 p-3 sm:p-4 rounded-3xl border border-white/10 shadow-xl backdrop-blur-md">
        
        {/* Left: Mode Switcher (Tengo vs Faltan) */}
        <div className="flex items-center gap-1.5 bg-[#141728] p-1 rounded-2xl border border-white/10 w-full sm:w-auto">
          <button
            onClick={() => setActiveMode('tengo')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeMode === 'tengo' 
                ? 'bg-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20' 
                : 'text-slate-400 hover:text-white'
            }`}
            title="Modo normal: haz clic para marcar lo que TENGO (1-Tap)"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>MODO: TENGO (✓)</span>
          </button>

          <button
            onClick={() => setActiveMode('faltan')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeMode === 'faltan' 
                ? 'bg-rose-500 text-white font-black shadow-lg shadow-rose-500/20' 
                : 'text-slate-400 hover:text-white'
            }`}
            title="Modo rápido: haz clic para marcar lo que ME FALTA (Carmesí)"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>MODO: ME FALTA (✗)</span>
          </button>
        </div>

        {/* Right Group: Search Bar & Reset */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          
          {/* Fast Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, habilidad..."
              className="w-full bg-[#141728] border border-white/10 rounded-2xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/60 font-mono transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Reset Current Gen Button */}
          <button
            onClick={onResetGen}
            className="flex items-center gap-1.5 bg-[#141728] hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 px-3 py-1.5 rounded-2xl text-xs font-mono font-bold transition active:scale-95 shrink-0"
            title={`Desmarcar toda la Generación ${activeGen}`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Limpiar Gen {activeGen}</span>
          </button>

        </div>

      </div>

      {/* Horizontal Scrollable Family Quick Pills Bar */}
      <div 
        ref={familyBarRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none cursor-grab active:cursor-grabbing select-none w-full"
      >
        {familyList.map(fam => {
          const isSelected = selectedFamily === fam;
          if (fam === 'Todas') {
            return (
              <button
                key={fam}
                onClick={() => setSelectedFamily('Todas')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition shrink-0 border ${
                  isSelected 
                    ? 'bg-emerald-400 text-slate-950 border-emerald-400 font-extrabold shadow-md shadow-emerald-500/20' 
                    : 'bg-[#101322] text-slate-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                TODAS LAS FAMILIAS
              </button>
            );
          }

          // Count obtained for this family
          const famSpirits = spirits.filter(s => s.family === fam);
          const famObtained = famSpirits.filter(s => (userState[s.id] || 0) >= 1).length;
          const famMastered = famSpirits.filter(s => userState[s.id] === 2).length;
          const isComplete = famSpirits.length > 0 && famObtained === famSpirits.length;

          return (
            <div
              key={fam}
              onMouseEnter={() => setHoveredFamily(fam)}
              onMouseLeave={() => setHoveredFamily(null)}
              className={`flex items-center gap-1 bg-[#101322] px-2.5 py-1.5 rounded-xl border text-xs font-mono whitespace-nowrap transition shrink-0 ${
                isSelected 
                  ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10' 
                  : isComplete
                  ? 'border-amber-400/50 text-amber-400 bg-amber-500/10'
                  : 'border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => setSelectedFamily(fam)}
                className="font-bold hover:underline decoration-emerald-400/40"
              >
                {fam} ({famObtained}/{famSpirits.length})
              </button>

              {/* 1-Tap Batch Actions for Family */}
              <div className="flex items-center gap-0.5 ml-1 border-l border-white/10 pl-1.5">
                <button
                  onClick={() => handleBatchFamily(fam, 1)}
                  className="hover:text-emerald-400 text-[10px] text-slate-500 px-0.5 font-black"
                  title={`Marcar todo ${fam} como Obtenido`}
                >
                  ✓
                </button>
                <button
                  onClick={() => handleBatchFamily(fam, 2)}
                  className="hover:text-amber-400 text-[10px] text-slate-500 px-0.5 font-black"
                  title={`Marcar todo ${fam} como Dominado`}
                >
                  ★
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* OBSIDIAN NEON AAA GAMING SPIRIT CARDS MATRIX GRID (6 Columns Desktop, 2 Columns Mobile) */}
      <div id="tour-sprite-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {filteredSpirits.map(spirit => {
          const status = userState[spirit.id] ?? 0;
          const isObtained = status === 1;
          const isMastered = status === 2;
          const isMissingFlagged = status === 3;
          const isFamilyHovered = hoveredFamily && spirit.family === hoveredFamily;

          return (
            <div
              key={spirit.id}
              id={`spirit-tile-${spirit.id}`}
              onClick={() => handleTileTap(spirit.id)}
              onMouseEnter={() => setTooltipSpirit(spirit)}
              onMouseLeave={() => setTooltipSpirit(null)}
              className={`group relative w-full aspect-[3/4.1] p-3 rounded-2xl cursor-pointer flex flex-col justify-between items-center transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] select-none overflow-hidden ${
                isFamilyHovered ? 'ring-2 ring-emerald-400 scale-[1.03] z-20' : ''
              } ${getCardCoreBg(spirit.rarity, status)}`}
            >
              
              {/* Metallic Ambient Ray Glow Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-0" />

              {/* Card Header: Rarity Micro Badge (Left) & Tactile Status Pill (Right) */}
              <div className="w-full flex items-center justify-between text-xs font-mono z-10">
                
                {/* Rarity Tag */}
                <div className={`px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider ${getRarityBadgeStyle(spirit.rarity)}`}>
                  {spirit.rarity || 'Especial'}
                </div>

                {/* Status Indicator Pill */}
                <div className={`px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px] font-black font-mono transition-all duration-200 ${
                  isMissingFlagged
                    ? 'bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.6)]'
                    : isMastered 
                    ? 'bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.6)]' 
                    : isObtained 
                    ? 'bg-emerald-400 text-slate-950 shadow-[0_0_12px_rgba(52,211,153,0.6)]' 
                    : 'bg-slate-800/80 border border-white/10 text-slate-400 group-hover:border-white/30 group-hover:text-white'
                }`}>
                  {isMissingFlagged ? (
                    <>
                      <span>FALTA</span>
                    </>
                  ) : isMastered ? (
                    <>
                      <Star className="w-2.5 h-2.5 fill-slate-950" />
                      <span>DOMINADO</span>
                    </>
                  ) : isObtained ? (
                    <>
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                      <span>TENGO</span>
                    </>
                  ) : (
                    <span>+ AGREGAR</span>
                  )}
                </div>
              </div>

              {/* 3D Floating Spirit Render with Heavy Drop Shadow & Hover Scale */}
              <div className="my-auto h-[120px] w-full flex items-center justify-center z-10 relative">
                <img
                  src={spirit.image}
                  alt={spirit.family}
                  className="max-h-full max-w-[95%] object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.85)] group-hover:scale-110 transition-transform duration-300 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Card Footer: Family Title & Variant Sub-badge */}
              <div className="w-full text-center z-10 space-y-0.5 pt-1.5 border-t border-white/10 bg-black/30 -mx-3 -mb-3 p-2.5 rounded-b-2xl backdrop-blur-xs">
                <strong className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white block leading-tight font-display truncate">
                  {spirit.family}
                </strong>
                
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block truncate ${
                  isMissingFlagged ? 'text-rose-400' : isMastered ? 'text-amber-400' : isObtained ? 'text-emerald-400' : 'text-slate-400'
                }`}>
                  {spirit.variant}
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Floating Glass Tooltip when hovering over any spirit tile */}
      {tooltipSpirit && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#101322]/95 border border-emerald-400/50 p-3.5 rounded-2xl shadow-2xl backdrop-blur-md max-w-sm w-full space-y-1.5 animate-fadeIn pointer-events-none font-sans">
          <div className="flex items-center justify-between text-xs font-mono">
            <strong className="text-white font-black text-sm uppercase tracking-wide font-display">{tooltipSpirit.family} · {tooltipSpirit.variant}</strong>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getRarityBadgeStyle(tooltipSpirit.rarity)}`}>
              {tooltipSpirit.rarity}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-snug font-sans">{tooltipSpirit.ability || 'Espíritu de colección'}</p>
        </div>
      )}

    </div>
  );
}
