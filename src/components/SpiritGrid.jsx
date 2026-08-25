import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, Grid3x3, ListFilter, RotateCcw, Download, Sparkles, Layers, Check, Star } from 'lucide-react';
import SpiritCard from './SpiritCard';

export default function SpiritGrid({ 
  spirits, 
  userState, 
  onToggleSpirit, 
  onBatchUpdate,
  activeGen, 
  onResetGen,
  onOpenExportModal,
  variantTabs 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('Todas');
  const [selectedStatus, setSelectedStatus] = useState('todos'); // todos, obtenidos, dominados, faltantes
  const [viewDensity, setViewDensity] = useState('family'); // family, standard, compact, list

  // Filtered spirits list
  const filteredSpirits = useMemo(() => {
    return spirits.filter(spirit => {
      const status = userState[spirit.id] || 0;
      const matchVariant = selectedVariant === 'Todas' || spirit.variant === selectedVariant;
      
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || 
        `${spirit.family} ${spirit.familyEn} ${spirit.variant} ${spirit.ability || ''} ${spirit.rarity}`
          .toLowerCase()
          .includes(q);

      const matchStatus = 
        selectedStatus === 'todos' ||
        (selectedStatus === 'obtenidos' && status >= 1) ||
        (selectedStatus === 'dominados' && status === 2) ||
        (selectedStatus === 'faltantes' && status === 0);

      return matchVariant && matchSearch && matchStatus;
    });
  }, [spirits, userState, searchQuery, selectedVariant, selectedStatus]);

  // Family Groups for "Por Familias" view
  const familyGroups = useMemo(() => {
    const groups = {};
    filteredSpirits.forEach(s => {
      if (!groups[s.family]) {
        groups[s.family] = [];
      }
      groups[s.family].push(s);
    });
    return groups;
  }, [filteredSpirits]);

  // Quick action: Mark all variants of a family
  const handleMarkFamily = (familyName, targetStatus) => {
    const familyItems = familyGroups[familyName] || [];
    const updates = {};
    familyItems.forEach(s => {
      updates[s.id] = targetStatus;
    });
    if (onBatchUpdate) {
      onBatchUpdate(updates);
    }
  };

  return (
    <section id="coleccion" className="max-w-7xl mx-auto px-4 sm:px-6 my-10 space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
            DATABASE / SPRITES / GEN_{activeGen.toString().padStart(2, '0')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            {activeGen === 2 ? 'SEGUNDA GENERACIÓN (OVERRIDE)' : 'PRIMERA GENERACIÓN (RUNNERS)'}
          </h2>
          <p className="text-xs text-slate-400 max-w-xl">
            {activeGen === 2 
              ? '36 Espíritus de Override organizados por familia para armar tu lista en segundos.'
              : '117 Espíritus de la primera generación con progreso conservado intacto.'}
          </p>
        </div>

        {/* Action Controls (Export Image & Reset) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-lg shadow-pink-500/20 active:scale-95 transition"
          >
            <Download className="w-4 h-4" />
            <span>EXPORTAR IMAGEN</span>
          </button>

          <button
            onClick={onResetGen}
            className="flex items-center gap-1.5 bg-slate-900 border border-rose-500/30 hover:bg-rose-500/10 text-rose-400 font-bold px-3 py-2 rounded-xl text-xs transition"
            title={`Reiniciar progreso de Gen ${activeGen}`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">REINICIAR GEN {activeGen}</span>
          </button>
        </div>
      </div>

      {/* Interactive Controls Toolbar */}
      <div className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl space-y-3 shadow-xl backdrop-blur-md">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Bar */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="BUSCAR ESPÍRITU, VARIANTE O HABILIDAD..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          {/* Status Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 font-bold focus:outline-none focus:border-cyan-400 transition"
            >
              <option value="todos">TODOS LOS ESTADOS</option>
              <option value="obtenidos">OBTENIDOS</option>
              <option value="dominados">DOMINADOS</option>
              <option value="faltantes">FALTANTES</option>
            </select>
          </div>

          {/* View Mode Switcher (Family Grouped, Standard, Compact, List) */}
          <div className="md:col-span-4 flex items-center justify-end gap-1 bg-slate-950 p-1 rounded-xl border border-white/10">
            
            <button
              onClick={() => setViewDensity('family')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition ${
                viewDensity === 'family' ? 'bg-gradient-to-r from-cyan-400 to-lime-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Vista Organizada por Familias"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="text-[10px] font-extrabold">Por Familias</span>
            </button>

            <button
              onClick={() => setViewDensity('standard')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition ${
                viewDensity === 'standard' ? 'bg-cyan-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Vista Estándar"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[10px]">Cuadrícula</span>
            </button>

            <button
              onClick={() => setViewDensity('compact')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition ${
                viewDensity === 'compact' ? 'bg-cyan-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Vista Compacta"
            >
              <Grid3x3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[10px]">Compacto</span>
            </button>

            <button
              onClick={() => setViewDensity('list')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition ${
                viewDensity === 'list' ? 'bg-cyan-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Vista Lista"
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[10px]">Lista</span>
            </button>

          </div>

        </div>

        {/* Variant Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <span className="text-[11px] font-mono text-slate-400 mr-2 shrink-0">VARIANTE:</span>
          {variantTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedVariant(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-extrabold shrink-0 transition ${
                selectedVariant === tab
                  ? 'bg-gradient-to-r from-cyan-500 to-lime-400 text-slate-950 shadow'
                  : 'bg-slate-950 border border-white/5 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

      </div>

      {/* Results Counter Line */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
        <span>
          MOSTRANDO <strong className="text-cyan-400 font-bold">{filteredSpirits.length}</strong> DE {spirits.length} ESPÍRITUS
        </span>
        <span className="text-[11px]">CLIC EN TARJETA: FALTANTE ➔ OBTENIDO ➔ DOMINADO</span>
      </div>

      {/* --- 1. FAMILY GROUPED VIEW (SUPER ORGANIZED) --- */}
      {viewDensity === 'family' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(familyGroups).map(([famName, items]) => {
            const obtainedCount = items.filter(s => (userState[s.id] || 0) >= 1).length;

            return (
              <div 
                key={famName}
                className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl space-y-3 shadow-lg hover:border-cyan-500/30 transition"
              >
                {/* Family Card Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <div>
                    <strong className="text-base font-black text-white block">{famName}</strong>
                    <span className="text-[11px] text-slate-400 font-mono">
                      <strong className="text-cyan-400">{obtainedCount}</strong>/{items.length} obtenidas
                    </span>
                  </div>

                  {/* 1-Click Family Batch Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMarkFamily(famName, 1)}
                      className="px-2 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[10px] font-extrabold transition"
                      title="Marcar toda la familia como Obtenida"
                    >
                      ✓ TODA OBTENIDA
                    </button>
                    <button
                      onClick={() => handleMarkFamily(famName, 2)}
                      className="px-2 py-1 rounded-lg bg-lime-500/10 hover:bg-lime-500/20 text-lime-400 border border-lime-500/30 text-[10px] font-extrabold transition"
                      title="Marcar toda la familia como Dominada"
                    >
                      ★ DOMINADA
                    </button>
                  </div>
                </div>

                {/* Family Variants Row */}
                <div className="grid grid-cols-3 gap-2">
                  {items.map(spirit => {
                    const status = userState[spirit.id] || 0;
                    return (
                      <div
                        key={spirit.id}
                        onClick={() => onToggleSpirit(spirit.id)}
                        className={`p-2.5 rounded-xl border text-center space-y-1.5 cursor-pointer transition active:scale-95 ${
                          status === 2 
                            ? 'bg-lime-950/30 border-lime-400 text-lime-400 ring-1 ring-lime-400/30 shadow-md shadow-lime-500/10' 
                            : status === 1 
                            ? 'bg-cyan-950/30 border-cyan-400 text-cyan-400 shadow-md shadow-cyan-500/10' 
                            : 'bg-slate-950/60 border-white/5 text-slate-400 hover:border-white/20'
                        }`}
                      >
                        <div className="h-14 flex items-center justify-center">
                          <img 
                            src={spirit.image} 
                            alt={spirit.variant} 
                            className="max-h-full max-w-full object-contain" 
                            loading="lazy"
                          />
                        </div>
                        <span className="text-[11px] font-extrabold block truncate">{spirit.variant}</span>
                        <span className="text-[9px] font-mono block uppercase font-bold">
                          {status === 2 ? '★ DOMINADO' : status === 1 ? '✓ OBTENIDO' : '+ FALTANTE'}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* --- 2. GRID / LIST VIEWS --- */
        <div className={`grid-transition ${
          viewDensity === 'compact'
            ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3'
            : viewDensity === 'list'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'
            : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'
        }`}>
          {filteredSpirits.map(spirit => (
            <SpiritCard
              key={spirit.id}
              spirit={spirit}
              status={userState[spirit.id] || 0}
              onToggle={onToggleSpirit}
              viewDensity={viewDensity}
            />
          ))}
        </div>
      )}

      {/* Empty Search State */}
      {filteredSpirits.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-dashed border-white/10 space-y-3">
          <Sparkles className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white uppercase">NO SE ENCONTRARON ESPÍRITUS</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Prueba ajustando los filtros de búsqueda o cambiando el estado seleccionado.
          </p>
        </div>
      )}

    </section>
  );
}
