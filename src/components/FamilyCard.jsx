import React from 'react';
import { Crown, Check, Plus, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

export default function FamilyCard({
  familyName,
  items = [],
  userState = {},
  onToggleSpirit,
  onBatchUpdate
}) {
  const obtainedCount = items.filter(s => (userState[s.id] || 0) >= 1).length;
  const masteredCount = items.filter(s => (userState[s.id] || 0) === 2).length;
  const totalCount = items.length;

  const isAllObtained = obtainedCount === totalCount;
  const isAllMastered = masteredCount === totalCount;

  const baseItem = items[0] || {};
  const familyRarity = baseItem.rarity || 'Raro';
  const abilityText = baseItem.ability || '';

  // 1-tap batch complete handlers
  const handleSetFamilyStatus = (targetStatus) => {
    const updates = {};
    items.forEach(s => {
      updates[s.id] = targetStatus;
    });
    onBatchUpdate(updates);
  };

  return (
    <div className={`glass-panel p-5 rounded-3xl space-y-4 border transition-all duration-300 ${
      isAllMastered
        ? 'border-amber-400/50 shadow-[0_0_25px_rgba(255,215,0,0.15)] bg-slate-900/90'
        : isAllObtained
        ? 'border-cyan-400/40 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
        : 'border-white/10 hover:border-white/20'
    }`}>
      
      {/* Family Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-hud font-black text-xl text-white uppercase tracking-wide">
              {familyName}
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-hud font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              {familyRarity}
            </span>
          </div>

          {abilityText && (
            <p className="text-xs text-slate-300 font-sans mt-0.5 max-w-xl">
              {abilityText}
            </p>
          )}
        </div>

        {/* Family Progress Indicator & 1-Tap Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Progress Status Badge */}
          <div className="px-3 py-1 rounded-xl bg-slate-950/80 border border-white/10 font-mono text-xs text-right">
            <span className="text-slate-400 block text-[9px] uppercase font-bold">PROGRESO</span>
            <span className={`font-bold ${
              isAllMastered ? 'text-amber-300' : isAllObtained ? 'text-cyan-300' : 'text-slate-300'
            }`}>
              {obtainedCount}/{totalCount} Variantes
            </span>
          </div>

          {/* Quick 1-Tap Family Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleSetFamilyStatus(1)}
              className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-[10px] font-hud font-extrabold uppercase transition active:scale-95 flex items-center gap-1"
              title="Marcar toda la familia como Obtenida"
            >
              <Check className="w-3 h-3" />
              <span>OBTENIDA</span>
            </button>

            <button
              onClick={() => handleSetFamilyStatus(2)}
              className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-[10px] font-hud font-extrabold uppercase transition active:scale-95 flex items-center gap-1"
              title="Marcar toda la familia como Dominada"
            >
              <Crown className="w-3 h-3" />
              <span>DOMINADA</span>
            </button>

            <button
              onClick={() => handleSetFamilyStatus(0)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition active:scale-95"
              title="Reiniciar esta familia"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Side-by-Side Family Variants Cluster Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((s) => {
          const status = userState[s.id] || 0;
          return (
            <div
              key={s.id}
              onClick={() => onToggleSpirit(s.id)}
              className={`p-3 rounded-2xl border text-center space-y-2 cursor-pointer transition-all duration-200 active:scale-95 flex flex-col justify-between ${
                status === 2
                  ? 'bg-amber-950/20 border-amber-400/80 shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                  : status === 1
                  ? 'bg-cyan-950/20 border-cyan-400/70 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'bg-slate-950/60 border-white/5 hover:border-white/20'
              }`}
            >
              {/* Variant Header Status Icon */}
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400 font-bold uppercase">{s.variant}</span>
                {status === 2 ? (
                  <span className="text-amber-300 font-bold flex items-center gap-0.5">
                    <Crown className="w-3 h-3" /> DOMINADO
                  </span>
                ) : status === 1 ? (
                  <span className="text-cyan-300 font-bold flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> OBTENIDO
                  </span>
                ) : (
                  <span className="text-slate-400 font-medium">+ FALTANTE</span>
                )}
              </div>

              {/* Variant Render Sprite Image */}
              <div className="h-24 flex items-center justify-center my-1">
                <img
                  src={s.image}
                  alt={`${s.family} ${s.variant}`}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                  loading="lazy"
                />
              </div>

              {/* Bottom Quick Action Bar */}
              <div className={`py-1 rounded-lg text-[10px] font-hud font-extrabold uppercase tracking-wider ${
                status === 2
                  ? 'bg-amber-400 text-slate-950'
                  : status === 1
                  ? 'bg-cyan-400 text-slate-950'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {status === 2 ? '★ DOMINADO' : status === 1 ? '✓ OBTENIDO' : 'CLICK PARA REGISTRAR'}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
