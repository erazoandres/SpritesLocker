import React from 'react';
import { Crown, Check, Plus, Sparkles, Info } from 'lucide-react';

export default function LockerCard({ item, status = 0, onToggle }) {
  // Mapping rarity to corresponding utility class
  const getRarityClass = (rarity) => {
    switch (rarity) {
      case 'Mítico':
        return 'rarity-mythic';
      case 'Legendario':
        return 'rarity-legendary';
      case 'Épico':
        return 'rarity-epic';
      case 'Raro':
        return 'rarity-rare';
      case 'Especial':
        return 'rarity-special';
      default:
        return 'rarity-rare';
    }
  };

  // State utility class for tactile card states
  const getCardStateClass = () => {
    if (status === 2) return 'card-mastered';
    if (status === 1) return 'card-obtained';
    return 'card-missing';
  };

  const rarityClass = getRarityClass(item.rarity);
  const stateClass = getCardStateClass();

  return (
    <div
      onClick={() => onToggle(item.id)}
      className={`group relative aspect-[3/4] rounded-2xl p-4 flex flex-col justify-between cursor-pointer select-none overflow-hidden transition-all duration-300 ${rarityClass} ${stateClass}`}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

      {/* Card Header: Rarity & Status Badge */}
      <div className="relative z-10 flex items-center justify-between gap-1">
        
        {/* Rarity Pill Badge */}
        <span className="px-2 py-0.5 rounded-md font-hud font-bold text-[10px] uppercase tracking-wider bg-slate-950/80 text-white border border-white/10 backdrop-blur-md">
          {item.rarity}
        </span>

        {/* Clear Status Badges */}
        {status === 2 && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-hud font-black text-[11px] shadow-[0_0_12px_rgba(255,215,0,0.8)] animate-pulse">
            <Crown className="w-3.5 h-3.5 fill-slate-950" />
            <span>DOMINADO</span>
          </div>
        )}

        {status === 1 && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-400 text-slate-950 font-hud font-black text-[11px] shadow-[0_0_12px_rgba(0,240,255,0.8)]">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>OBTENIDO</span>
          </div>
        )}

        {status === 0 && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-400 border border-slate-700 font-hud font-bold text-[10px]">
            <Plus className="w-3 h-3" />
            <span>FALTANTE</span>
          </div>
        )}
      </div>

      {/* Center Sprite Render Image (Floating Elevation Depth on Hover) */}
      <div className="relative z-10 my-auto flex items-center justify-center py-2 h-36">
        <img
          src={item.image}
          alt={`${item.family} ${item.variant}`}
          className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)] group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 ease-out"
          loading="lazy"
        />
      </div>

      {/* Card Footer: Family Title & Variant Info */}
      <div className="relative z-10 space-y-1">
        
        {/* Family Name */}
        <h4 className="font-hud font-black text-lg text-white tracking-wide uppercase leading-tight group-hover:text-cyan-300 transition-colors line-clamp-1">
          {item.family}
        </h4>

        {/* Variant Name & Summon Cost / Generation tag */}
        <div className="flex items-center justify-between text-xs font-mono">
          <span className={`font-bold ${
            status === 2 ? 'text-amber-300' : status === 1 ? 'text-cyan-300' : 'text-slate-400'
          }`}>
            {item.variant}
          </span>

          {item.summonCost > 0 && (
            <span className="text-[10px] text-amber-400/90 font-mono font-semibold">
              {item.summonCost.toLocaleString()} XP
            </span>
          )}
        </div>

        {/* Optional Ability Preview on Hover */}
        {item.ability && (
          <p className="text-[10px] text-slate-300 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity font-sans">
            {item.ability}
          </p>
        )}
      </div>

      {/* Subtle Interactive Instruction Indicator */}
      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
