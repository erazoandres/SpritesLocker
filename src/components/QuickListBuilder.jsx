import React, { useState } from 'react';
import { CheckSquare, Sparkles, CheckCircle2, Star, RefreshCw, Layers, ShieldAlert, Check } from 'lucide-react';
import { GEN2_FAMILIES } from '../data/gen2_spirits';

export default function QuickListBuilder({ 
  spirits, 
  userState, 
  onUpdateState, 
  onBatchUpdate, 
  activeGen,
  onShowToast 
}) {
  const [selectedVariantPreset, setSelectedVariantPreset] = useState('');

  // Group spirits by Family Name
  const familyGroups = React.useMemo(() => {
    const groups = {};
    spirits.forEach(s => {
      if (!groups[s.family]) {
        groups[s.family] = [];
      }
      groups[s.family].push(s);
    });
    return groups;
  }, [spirits]);

  // Preset 1: Mark all Base variants as Obtained (1)
  const handleMarkAllBaseObtained = () => {
    const updates = {};
    spirits.forEach(s => {
      if (s.variant === 'Base') {
        updates[s.id] = 1;
      }
    });
    onBatchUpdate(updates);
    onShowToast('Todas las variantes Base marcadas como Obtenidas');
  };

  // Preset 2: Mark all Gold variants as Obtained (1)
  const handleMarkAllGoldObtained = () => {
    const updates = {};
    spirits.forEach(s => {
      if (s.variant === 'Oro') {
        updates[s.id] = 1;
      }
    });
    onBatchUpdate(updates);
    onShowToast('Todas las variantes Oro marcadas como Obtenidas');
  };

  // Preset 3: Mark all Cheatmaster variants as Obtained (1)
  const handleMarkAllMasterObtained = () => {
    const updates = {};
    spirits.forEach(s => {
      if (s.variant === 'Maestro de Trucos' || s.variant === 'Golosina') {
        updates[s.id] = 1;
      }
    });
    onBatchUpdate(updates);
    onShowToast('Todas las variantes Maestro marcadas como Obtenidas');
  };

  // Mark an entire family as Obtained or Mastered
  const handleMarkFamilyStatus = (familyName, targetStatus) => {
    const familySpirits = familyGroups[familyName] || [];
    const updates = {};
    familySpirits.forEach(s => {
      updates[s.id] = targetStatus;
    });
    onBatchUpdate(updates);
    const label = targetStatus === 2 ? 'Dominada' : targetStatus === 1 ? 'Obtenida' : 'Faltante';
    onShowToast(`Familia ${familyName} marcada como ${label}`);
  };

  return (
    <section className="max-[#7xl] mx-auto px-4 sm:px-6 my-8 space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-900 border border-cyan-500/40 p-6 rounded-3xl space-y-3 shadow-2xl">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
          <Sparkles className="w-4 h-4 animate-pulse text-lime-400" />
          <span>CREADOR RÁPIDO Y ORGANIZADO DE LISTA</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          CONFIGURA TU CASILLERO EN 1-CLIC
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Utiliza los accesos rápidos para marcar familias completas o variantes en lote sin necesidad de hacer clic de uno en uno.
        </p>

        {/* Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={handleMarkAllBaseObtained}
            className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-3.5 py-2 rounded-xl text-xs font-extrabold transition active:scale-95 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>MARCAR TODAS LAS BASE COMO OBTENIDAS</span>
          </button>

          <button
            onClick={handleMarkAllGoldObtained}
            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3.5 py-2 rounded-xl text-xs font-extrabold transition active:scale-95 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>MARCAR TODAS LAS ORO COMO OBTENIDAS</span>
          </button>

          <button
            onClick={handleMarkAllMasterObtained}
            className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3.5 py-2 rounded-xl text-xs font-extrabold transition active:scale-95 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>MARCAR MAESTROS DE TRUCOS COMO OBTENIDOS</span>
          </button>
        </div>
      </div>

      {/* Organized Family Rows */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono">
            ORGANIZADO POR FAMILIAS (GEN {activeGen})
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {Object.keys(familyGroups).length} Familias totales
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(familyGroups).map(([famName, items]) => {
            const obtainedCount = items.filter(s => (userState[s.id] || 0) >= 1).length;
            const isAllObtained = obtainedCount === items.length;

            return (
              <div 
                key={famName}
                className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl space-y-3 shadow-lg hover:border-cyan-500/30 transition"
              >
                {/* Family Header & Quick Family Action Buttons */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <div>
                    <strong className="text-base font-black text-white block">{famName}</strong>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {obtainedCount}/{items.length} variantes obtenidas
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMarkFamilyStatus(famName, 1)}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[10px] font-extrabold transition"
                      title="Marcar toda la familia como Obtenida"
                    >
                      TODA OBTENIDA
                    </button>
                    <button
                      onClick={() => handleMarkFamilyStatus(famName, 2)}
                      className="px-2.5 py-1 rounded-lg bg-lime-500/10 hover:bg-lime-500/20 text-lime-400 border border-lime-500/30 text-[10px] font-extrabold transition"
                      title="Marcar toda la familia como Dominada"
                    >
                      TODA DOMINADA
                    </button>
                    <button
                      onClick={() => handleMarkFamilyStatus(famName, 0)}
                      className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-[10px] font-bold transition"
                      title="Reiniciar esta familia"
                    >
                      LIMPIAR
                    </button>
                  </div>
                </div>

                {/* Family Variants Side-by-Side Cards */}
                <div className="grid grid-cols-3 gap-2">
                  {items.map(s => {
                    const st = userState[s.id] || 0;
                    return (
                      <button
                        key={s.id}
                        onClick={() => {
                          const next = (st + 1) % 3;
                          onUpdateState(s.id, next);
                        }}
                        className={`p-2.5 rounded-xl border text-center space-y-1.5 transition active:scale-95 ${
                          st === 2 
                            ? 'bg-lime-950/30 border-lime-400 text-lime-400 ring-1 ring-lime-400/30' 
                            : st === 1 
                            ? 'bg-cyan-950/30 border-cyan-400 text-cyan-400' 
                            : 'bg-slate-950/60 border-white/5 text-slate-400 hover:border-white/20'
                        }`}
                      >
                        <div className="h-12 flex items-center justify-center">
                          <img 
                            src={s.image} 
                            alt={s.variant} 
                            className="max-h-full max-w-full object-contain" 
                            loading="lazy"
                          />
                        </div>
                        <span className="text-[11px] font-extrabold block truncate">{s.variant}</span>
                        <span className="text-[9px] font-mono block uppercase font-bold">
                          {st === 2 ? '★ DOMINADO' : st === 1 ? '✓ OBTENIDO' : '+ FALTANTE'}
                        </span>
                      </button>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
