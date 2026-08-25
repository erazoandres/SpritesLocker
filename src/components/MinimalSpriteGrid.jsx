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

  // Batch family actions
  const handleBatchFamily = (famName, targetStatus) => {
    const famItems = spirits.filter(s => s.family === famName);
    const updates = {};
    famItems.forEach(s => { updates[s.id] = targetStatus; });
    if (onBatchUpdate) onBatchUpdate(updates);
  };

  return (
    <section id="coleccion" className="max-w-7xl mx-auto px-4 sm:px-6 my-4 space-y-3 font-sans">
      
      {/* OBSIDIAN EMERALD TOOLBAR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2.5 bg-[#101322] p-2.5 rounded-2xl border border-white/10 shadow-lg">
        
        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-[#0a0b12] p-1 rounded-xl border border-white/10 w-full md:w-auto font-mono">
          <button
            onClick={() => setActiveMode('tengo')}
            className={`flex-1 md:flex-initial px-3.5 py-1 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition active:scale-95 ${
              activeMode === 'tengo'
                ? 'bg-emerald-400 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                : 'text-emerald-400 hover:bg-emerald-500/10'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>MARCAR TENGO</span>
          </button>

          <button
            onClick={() => setActiveMode('faltan')}
            className={`flex-1 md:flex-initial px-3.5 py-1 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition active:scale-95 ${
              activeMode === 'faltan'
                ? 'bg-rose-500 text-white font-black shadow-md shadow-rose-500/20'
                : 'text-rose-400 hover:bg-rose-500/10'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>MARCAR FALTAN</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="BUSCAR ESPÍRITU..."
            className="w-full bg-[#0a0b12] border border-white/10 rounded-xl pl-8 pr-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition font-mono"
          />
        </div>

        {/* Action Buttons: Reset Progress */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end font-mono">
          <button
            onClick={onResetGen}
            className="p-2 rounded-xl bg-[#0a0b12] border border-white/10 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 transition flex items-center gap-1 text-xs"
            title={`Reiniciar progreso de Gen ${activeGen}`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">REINICIAR</span>
          </button>
        </div>

      </div>

      {/* FAMILY PILLS HEADER & DRAG SUGGESTION HINT */}
      <div className="flex items-center justify-between px-1 text-[11px] font-mono text-slate-400">
        <span className="font-bold uppercase tracking-wider text-slate-300">
          FAMILIAS ({familyList.length - 1})
        </span>
        <span className="text-emerald-400 font-extrabold flex items-center gap-1 animate-pulse">
          ‹ ↔ ARRASTRA PARA VER MÁS ›
        </span>
      </div>

      {/* MANUAL DRAG-TO-SCROLL FAMILY PILLS ROW */}
      <div 
        ref={familyBarRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none font-mono text-xs select-none ${
          isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {familyList.map(fam => {
          if (fam === 'Todas') {
            return (
              <button
                key={fam}
                onClick={() => setSelectedFamily('Todas')}
                className={`px-3.5 py-1 rounded-xl text-xs font-extrabold shrink-0 transition ${
                  selectedFamily === 'Todas'
                    ? 'bg-emerald-400 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                    : 'bg-[#101322] border border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                Todas
              </button>
            );
          }

          const famItems = spirits.filter(s => s.family === fam);
          const obtainedCount = famItems.filter(s => (userState[s.id] || 0) >= 1).length;
          const isHighlighted = hoveredFamily === fam;
          const isSelected = selectedFamily === fam;

          return (
            <div
              key={fam}
              onMouseEnter={() => setHoveredFamily(fam)}
              onMouseLeave={() => setHoveredFamily(null)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono shrink-0 transition border ${
                isSelected
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400 font-bold shadow-md shadow-emerald-500/10'
                  : isHighlighted
                  ? 'bg-[#161a2e] border-emerald-400/50 text-white'
                  : 'bg-[#101322] border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              <button onClick={() => setSelectedFamily(isSelected ? 'Todas' : fam)} className="flex items-center gap-1">
                <span className="font-semibold">{fam}</span>
                <small className="text-[10px] text-slate-500">({obtainedCount}/{famItems.length})</small>
              </button>

              {/* Micro Family Action Triggers */}
              <div className="flex items-center gap-1 border-l border-white/10 pl-1.5">
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

      {/* OBSIDIAN NEON SPIRIT CARDS GRID (6 Columns Desktop, 2 Columns Mobile) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5">
        {filteredSpirits.map(spirit => {
          const status = userState[spirit.id] ?? 0;
          const isObtained = status === 1;
          const isMastered = status === 2;
          const isMissingFlagged = status === 3;
          const isFamilyHovered = hoveredFamily && spirit.family === hoveredFamily;

          return (
            <div
              key={spirit.id}
              onClick={() => handleTileTap(spirit.id)}
              onMouseEnter={() => setTooltipSpirit(spirit)}
              onMouseLeave={() => setTooltipSpirit(null)}
              className={`relative w-full aspect-[3/3.7] p-3 rounded-2xl border cursor-pointer flex flex-col justify-between items-center transition-all duration-200 hover:scale-[1.02] select-none ${
                isFamilyHovered ? 'ring-2 ring-emerald-400 scale-[1.03] z-20' : ''
              } ${
                isMissingFlagged
                  ? 'border-rose-500 bg-rose-500/10 shadow-lg shadow-rose-500/10'
                  : isMastered 
                  ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10' 
                  : isObtained 
                  ? 'border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/10' 
                  : 'border-white/10 bg-[#101322] hover:border-white/20 hover:bg-[#16192c]'
              }`}
            >
              {/* Header Badge */}
              <div className="w-full flex items-center justify-between text-xs font-mono">
                <span className="text-slate-200 font-bold uppercase truncate w-3/4 font-display">
                  {spirit.family}
                </span>
                <div className={`w-4 h-4 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                  isMissingFlagged
                    ? 'bg-rose-500 text-white font-black'
                    : isMastered 
                    ? 'bg-amber-400 text-slate-950 font-black' 
                    : isObtained 
                    ? 'bg-emerald-400 text-slate-950 font-black' 
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {isMissingFlagged ? '✗' : isMastered ? <Star className="w-2.5 h-2.5 fill-slate-950" /> : isObtained ? <Check className="w-2.5 h-2.5" /> : '+'}
                </div>
              </div>

              {/* Sprite Image Render (112px height) */}
              <div className="my-auto h-[112px] w-full flex items-center justify-center">
                <img
                  src={spirit.image}
                  alt={spirit.family}
                  className="max-h-full max-w-[98%] object-contain"
                  loading="lazy"
                />
              </div>

              {/* Variant Label */}
              <div className="w-full text-center pt-1 border-t border-white/5">
                <span className={`text-xs font-black truncate w-full block font-mono ${
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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#101322] border border-emerald-400/50 p-3.5 rounded-xl shadow-2xl backdrop-blur-md max-w-sm w-full space-y-1 animate-fadeIn pointer-events-none font-sans">
          <div className="flex items-center justify-between text-xs font-mono">
            <strong className="text-white font-bold font-display">{tooltipSpirit.family} · {tooltipSpirit.variant}</strong>
            <span className="text-emerald-400 font-bold">{tooltipSpirit.rarity}</span>
          </div>
          <p className="text-xs text-slate-300 leading-snug">{tooltipSpirit.ability || 'Espíritu de colección'}</p>
        </div>
      )}

      {/* Empty Search Result */}
      {filteredSpirits.length === 0 && (
        <div className="text-center py-10 bg-[#101322] rounded-2xl border border-dashed border-white/10 space-y-1">
          <h4 className="text-xs font-bold text-white uppercase font-display">NO SE ENCONTRARON ESPÍRITUS</h4>
          <p className="text-[11px] text-slate-400">Intenta con otro término de búsqueda.</p>
        </div>
      )}

    </section>
  );
}
