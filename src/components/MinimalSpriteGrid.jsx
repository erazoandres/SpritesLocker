import React, { useState, useMemo, useRef } from 'react';
import { Search, Check, Star, RotateCcw, CheckCircle2, XCircle, LayoutList, LayoutGrid } from 'lucide-react';

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
  const [viewLayout, setViewLayout] = useState('familyRows'); // 'familyRows' (Filas minimalistas por familia) or 'grid' (Matriz)
  
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

  // Group filtered spirits by family for the Family Rows Layout
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

  // Helper for compact card background state
  const getCompactCardStyle = (status, rarity) => {
    if (status === 2) return 'bg-amber-500/15 border-amber-400 shadow-md shadow-amber-500/10 ring-1 ring-amber-400/40';
    if (status === 1) return 'bg-emerald-500/15 border-emerald-400 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-400/30';
    if (status === 3) return 'bg-rose-500/15 border-rose-500 shadow-md shadow-rose-500/10 ring-1 ring-rose-500/30';
    return 'bg-[#0f111e] border-white/10 hover:border-white/30 hover:bg-[#141728]';
  };

  // Helper for status label text inside compact card
  const getStatusLabel = (status) => {
    if (status === 2) return 'DOMINADO';
    if (status === 1) return 'TENGO';
    if (status === 3) return 'FALTA';
    return 'AGREGAR';
  };

  // Helper for status dot indicator
  const getStatusDot = (status) => {
    if (status === 2) return 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]';
    if (status === 1) return 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]';
    if (status === 3) return 'bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)]';
    return 'bg-slate-700';
  };

  // Helper for variant text color accent
  const getVariantTextColor = (variant) => {
    switch (variant) {
      case 'Oro': return 'text-amber-400 font-extrabold';
      case 'Maestro de Trucos': return 'text-purple-400 font-extrabold';
      case 'Hacker de botín': return 'text-emerald-400 font-extrabold';
      case 'Cazarrecompensas': return 'text-rose-400 font-extrabold';
      default: return 'text-slate-300 font-bold';
    }
  };

  return (
    <div className="space-y-4 font-sans w-full overflow-x-hidden">
      
      {/* HUD Quick Filter, Mode Control & Layout View Switcher */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 bg-[#0d0f1a]/90 p-3 sm:p-4 rounded-3xl border border-white/10 shadow-xl backdrop-blur-md">
        
        {/* Left: Mode Switcher (TENGO vs FALTA) */}
        <div className="flex items-center gap-1.5 bg-[#141728] p-1 rounded-2xl border border-white/10 w-full lg:w-auto">
          <button
            onClick={() => setActiveMode('tengo')}
            className={`flex-1 lg:flex-none px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-1.5 ${
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
            className={`flex-1 lg:flex-none px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-1.5 ${
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

        {/* Center: Layout View Mode Toggle (FILAS MINIMALISTAS vs MATRIZ GRID) */}
        <div className="flex items-center gap-1 bg-[#141728] p-1 rounded-2xl border border-white/10 w-full sm:w-auto justify-center">
          <button
            onClick={() => setViewLayout('familyRows')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition ${
              viewLayout === 'familyRows'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Vista por filas minimalistas independientes por familia"
          >
            <LayoutList className="w-4 h-4" />
            <span>FILAS MINIMALISTAS</span>
          </button>

          <button
            onClick={() => setViewLayout('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition ${
              viewLayout === 'grid'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Ver todos los espíritus en una matriz continua"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>MATRIZ GRID</span>
          </button>
        </div>

        {/* Right Group: Search Bar & Reset */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          
          {/* Fast Search Input */}
          <div className="relative flex-1 lg:w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar espíritu..."
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

      {/* --- LAYOUT OPTION A: ULTRA-MINIMALIST FAMILY ROWS (ESTILO PÁGINA DE REFERENCIA) --- */}
      {viewLayout === 'familyRows' ? (
        <div id="tour-sprite-grid" className="space-y-3.5">
          {Object.keys(spiritsGroupedByFamily).map(famName => {
            const famSpirits = spiritsGroupedByFamily[famName];
            if (!famSpirits || famSpirits.length === 0) return null;

            const baseItem = famSpirits[0];
            const famObtained = famSpirits.filter(s => (userState[s.id] || 0) >= 1).length;
            const famMastered = famSpirits.filter(s => userState[s.id] === 2).length;
            const isComplete = famObtained === famSpirits.length;

            return (
              <div 
                key={famName}
                className={`bg-[#0c0e18]/90 p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 backdrop-blur-md space-y-2.5 ${
                  isComplete
                    ? 'border-amber-400/40 bg-gradient-to-r from-amber-500/10 via-[#0c0e18] to-[#0c0e18]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Ultra-Minimalist Row Bar Header */}
                <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                  
                  {/* Left: Family Name, Rarity & Progress Count */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-sm sm:text-base font-black uppercase text-white font-display tracking-wider">
                      {famName}
                    </h3>

                    <span className={`px-2 py-0.5 rounded-md border text-[9px] font-mono font-black uppercase ${getRarityBadgeStyle(baseItem.rarity)}`}>
                      {baseItem.rarity}
                    </span>

                    <div className="flex items-center gap-1 text-xs font-mono">
                      <span className="text-slate-400 font-semibold">({famObtained}/{famSpirits.length})</span>
                      {isComplete && (
                        <span className="text-amber-400 font-black text-[10px] bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30">
                          COMPLETA
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Quick Batch Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleBatchFamily(famName, 1)}
                      className="px-2 py-0.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 hover:text-emerald-300 text-[10px] font-mono font-bold transition flex items-center gap-1 active:scale-95"
                      title={`Marcar todo ${famName} como Obtenido`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span className="hidden sm:inline">TODOS</span>
                    </button>

                    <button
                      onClick={() => handleBatchFamily(famName, 2)}
                      className="px-2 py-0.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/25 text-amber-400 hover:text-amber-300 text-[10px] font-mono font-bold transition flex items-center gap-1 active:scale-95"
                      title={`Marcar todo ${famName} como Dominado`}
                    >
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span className="hidden sm:inline">DOMINAR</span>
                    </button>

                    <button
                      onClick={() => handleBatchFamily(famName, 0)}
                      className="p-1 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition active:scale-95"
                      title={`Desmarcar ${famName}`}
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>

                </div>

                {/* Sleek Horizontal Strip / Grid of Variant Tiles */}
                <div className={`grid gap-2 sm:gap-2.5 ${
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
                        className={`group relative w-full aspect-[3/3.6] p-2 rounded-xl cursor-pointer flex flex-col justify-between items-center transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] select-none overflow-hidden ${getCompactCardStyle(status, spirit.rarity)}`}
                      >
                        {/* Top Micro Status Bar */}
                        <div className="w-full flex items-center justify-between text-[9px] font-mono z-10">
                          <span className={`w-2 h-2 rounded-full ${getStatusDot(status)}`} />
                          <span className={`font-black tracking-wider ${
                            status === 2 ? 'text-amber-400' : status === 1 ? 'text-emerald-400' : status === 3 ? 'text-rose-400' : 'text-slate-500'
                          }`}>
                            {getStatusLabel(status)}
                          </span>
                        </div>

                        {/* Centered High-Res PNG Sprite Image */}
                        <div className="my-auto h-[80px] w-full flex items-center justify-center z-10 relative">
                          <img
                            src={spirit.image}
                            alt={`${spirit.family} ${spirit.variant}`}
                            className="max-h-full max-w-[95%] object-contain filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-200 ease-out"
                            loading="lazy"
                          />
                        </div>

                        {/* Bottom Variant Title */}
                        <div className="w-full text-center z-10 pt-1 border-t border-white/10 bg-black/40 -mx-2 -mb-2 p-1.5 rounded-b-xl backdrop-blur-xs">
                          <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block truncate ${getVariantTextColor(spirit.variant)}`}>
                            {spirit.variant}
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
      ) : (

        /* --- LAYOUT OPTION B: CONTINUOUS INDIVIDUAL MATRIX GRID (FLAT 6 COLUMNS) --- */
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
                } ${getCompactCardStyle(status, spirit.rarity)}`}
              >
                {/* Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-0" />

                {/* Card Header */}
                <div className="w-full flex items-center justify-between text-xs font-mono z-10">
                  <div className={`px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider ${getRarityBadgeStyle(spirit.rarity)}`}>
                    {spirit.rarity || 'Especial'}
                  </div>

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
                      <span>FALTA</span>
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

                {/* Sprite Render */}
                <div className="my-auto h-[120px] w-full flex items-center justify-center z-10 relative">
                  <img
                    src={spirit.image}
                    alt={spirit.family}
                    className="max-h-full max-w-[95%] object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.85)] group-hover:scale-110 transition-transform duration-300 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Card Footer */}
                <div className="w-full text-center z-10 space-y-0.5 pt-1.5 border-t border-white/10 bg-black/30 -mx-3 -mb-3 p-2.5 rounded-b-2xl backdrop-blur-xs">
                  <strong className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white block leading-tight font-display truncate">
                    {spirit.family}
                  </strong>
                  
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block truncate ${getVariantTextColor(spirit.variant)}`}>
                    {spirit.variant}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      )}

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
