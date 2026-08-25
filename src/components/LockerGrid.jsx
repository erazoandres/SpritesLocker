import React, { useState, useMemo } from 'react';
import { 
  Search, Grid, Layers, Columns, List, Filter, Check, Crown, 
  Plus, RotateCcw, Download, Sparkles, SlidersHorizontal 
} from 'lucide-react';
import LockerCard from './LockerCard';
import FamilyCard from './FamilyCard';

export default function LockerGrid({
  spirits = [],
  userState = {},
  onToggleSpirit,
  onBatchUpdate,
  activeGen,
  onResetGen,
  onOpenExportModal,
  variantTabs = []
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('Todas');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('todos'); // 'todos', 'obtenidos', 'dominados', 'faltantes'
  const [viewMode, setViewMode] = useState('families'); // 'families', 'grid', 'compact', 'table'

  // Filter spirits based on search, variant, and status filter
  const filteredSpirits = useMemo(() => {
    return spirits.filter((item) => {
      const status = userState[item.id] || 0;

      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.family?.toLowerCase().includes(q);
        const matchesEn = item.familyEn?.toLowerCase().includes(q);
        const matchesVariant = item.variant?.toLowerCase().includes(q);
        const matchesAbility = item.ability?.toLowerCase().includes(q);
        if (!matchesName && !matchesEn && !matchesVariant && !matchesAbility) {
          return false;
        }
      }

      // 2. Variant Filter
      if (selectedVariant !== 'Todas') {
        if (selectedVariant === 'Maestro de Trucos') {
          if (item.variant !== 'Maestro de Trucos' && item.variant !== 'Golosina') return false;
        } else if (item.variant !== selectedVariant) {
          return false;
        }
      }

      // 3. Status Filter
      if (selectedStatusFilter === 'obtenidos' && status < 1) return false;
      if (selectedStatusFilter === 'dominados' && status !== 2) return false;
      if (selectedStatusFilter === 'faltantes' && status !== 0) return false;

      return true;
    });
  }, [spirits, userState, searchQuery, selectedVariant, selectedStatusFilter]);

  // Group filtered spirits by Family Name (for Family Clusters View)
  const familyGroups = useMemo(() => {
    const groups = {};
    filteredSpirits.forEach((item) => {
      if (!groups[item.family]) {
        groups[item.family] = [];
      }
      groups[item.family].push(item);
    });
    return groups;
  }, [filteredSpirits]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Control Console: Search, Filters & View Mode Selector */}
      <div className="glass-panel p-4 sm:p-5 rounded-3xl space-y-4 shadow-xl border border-white/10">
        
        {/* Top Row: Search & View Modes */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Input Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, variante o habilidad..."
              className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-400 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 font-sans focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
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

          {/* View Modes Selector Tabs */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-2xl border border-white/10 shrink-0 overflow-x-auto">
            
            {/* 1. Family Clusters */}
            <button
              onClick={() => setViewMode('families')}
              className={`px-3 py-1.5 rounded-xl font-hud font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition ${
                viewMode === 'families'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Vista de Familias Agrupadas"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>FAMILIAS</span>
            </button>

            {/* 2. Standard 3:4 Item Shop Grid */}
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-xl font-hud font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition ${
                viewMode === 'grid'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Vista de Tarjetas 3:4 Item Shop"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>GRIDA 3:4</span>
            </button>

            {/* 3. High-Density Compact */}
            <button
              onClick={() => setViewMode('compact')}
              className={`px-3 py-1.5 rounded-xl font-hud font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition ${
                viewMode === 'compact'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Vista Compacta Alta Densidad"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>COMPACTA</span>
            </button>

            {/* 4. Table List View */}
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-xl font-hud font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition ${
                viewMode === 'table'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Vista Lista Tabla"
            >
              <List className="w-3.5 h-3.5" />
              <span>TABLA</span>
            </button>

          </div>

        </div>

        {/* Second Row: Variant Tabs & Status Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-t border-white/5 pt-3">
          
          {/* Variant Tabs Filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-bold mr-1 shrink-0">
              VARIANTE:
            </span>
            {variantTabs.map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVariant(v)}
                className={`px-3 py-1 rounded-xl text-xs font-hud font-bold uppercase whitespace-nowrap transition ${
                  selectedVariant === v
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-bold mr-1">
              ESTADO:
            </span>
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'obtenidos', label: 'Obtenidos' },
              { id: 'dominados', label: 'Dominados' },
              { id: 'faltantes', label: 'Faltantes' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedStatusFilter(f.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-hud font-bold uppercase transition ${
                  selectedStatusFilter === f.id
                    ? 'bg-slate-800 text-white border border-white/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between px-1">
        <div className="text-xs font-mono text-slate-400">
          Mostrando <strong className="text-cyan-300">{filteredSpirits.length}</strong> de {spirits.length} espíritus
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExportModal}
            className="text-xs font-hud font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORTAR IMAGEN</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: Family Clusters Layout */}
      {viewMode === 'families' && (
        <div className="space-y-4">
          {Object.keys(familyGroups).length === 0 ? (
            <div className="text-center py-16 glass-panel rounded-3xl space-y-2">
              <p className="text-slate-400 text-sm font-mono">No se encontraron espíritus con los filtros seleccionados.</p>
            </div>
          ) : (
            Object.entries(familyGroups).map(([famName, items]) => (
              <FamilyCard
                key={famName}
                familyName={famName}
                items={items}
                userState={userState}
                onToggleSpirit={onToggleSpirit}
                onBatchUpdate={onBatchUpdate}
              />
            ))
          )}
        </div>
      )}

      {/* VIEW MODE 2: Standard 3:4 Item Shop Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSpirits.map((item) => (
            <LockerCard
              key={item.id}
              item={item}
              status={userState[item.id] || 0}
              onToggle={onToggleSpirit}
            />
          ))}
        </div>
      )}

      {/* VIEW MODE 3: High-Density Compact Layout */}
      {viewMode === 'compact' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2.5">
          {filteredSpirits.map((item) => {
            const status = userState[item.id] || 0;
            return (
              <div
                key={item.id}
                onClick={() => onToggleSpirit(item.id)}
                className={`p-2 rounded-xl border flex items-center gap-2 cursor-pointer transition active:scale-95 ${
                  status === 2
                    ? 'bg-amber-950/30 border-amber-400 text-amber-300'
                    : status === 1
                    ? 'bg-cyan-950/30 border-cyan-400 text-cyan-300'
                    : 'bg-slate-950/70 border-white/10 text-slate-400 hover:border-white/30'
                }`}
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-slate-900 rounded-lg p-1">
                  <img
                    src={item.image}
                    alt={item.family}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <strong className="text-xs font-hud font-bold text-white block truncate">
                    {item.family}
                  </strong>
                  <span className="text-[10px] font-mono block truncate opacity-80">
                    {item.variant}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 4: Detailed Table View */}
      {viewMode === 'table' && (
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950/80 font-hud font-bold text-xs text-slate-400 uppercase tracking-wider">
                  <th className="p-4">SPRITE</th>
                  <th className="p-4">FAMILIA</th>
                  <th className="p-4">VARIANTE</th>
                  <th className="p-4">RARIDAD</th>
                  <th className="p-4">COSTO XP</th>
                  <th className="p-4">ESTADO</th>
                  <th className="p-4 text-right">ACCIÓN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans text-xs">
                {filteredSpirits.map((item) => {
                  const status = userState[item.id] || 0;
                  return (
                    <tr key={item.id} className="hover:bg-white/5 transition">
                      <td className="p-3">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl p-1 flex items-center justify-center border border-white/10">
                          <img src={item.image} alt={item.family} className="max-h-full max-w-full object-contain" />
                        </div>
                      </td>
                      <td className="p-4 font-hud font-bold text-sm text-white">{item.family}</td>
                      <td className="p-4 font-mono text-cyan-300 font-semibold">{item.variant}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-hud font-bold uppercase bg-slate-900 border border-white/10 text-slate-300">
                          {item.rarity}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-amber-400">
                        {item.summonCost > 0 ? `${item.summonCost.toLocaleString()} XP` : 'GRATIS'}
                      </td>
                      <td className="p-4 font-hud font-bold text-xs uppercase">
                        {status === 2 ? (
                          <span className="text-amber-300 flex items-center gap-1">
                            <Crown className="w-3.5 h-3.5" /> DOMINADO
                          </span>
                        ) : status === 1 ? (
                          <span className="text-cyan-300 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> OBTENIDO
                          </span>
                        ) : (
                          <span className="text-slate-500">FALTANTE</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => onToggleSpirit(item.id)}
                          className="px-3 py-1 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-hud font-bold text-xs uppercase transition"
                        >
                          CAMBIAR
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </section>
  );
}
