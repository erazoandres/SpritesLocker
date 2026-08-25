import React, { useState } from 'react';
import { Star, Check, Plus, ImageOff } from 'lucide-react';

const RARITY_COLORS = {
  Raro: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
  Épico: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
  Legendario: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
  Mítico: 'border-rose-500/40 text-rose-400 bg-rose-500/10',
  Especial: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
};

const VARIANT_ACCENTS = {
  Base: 'text-slate-300',
  Oro: 'text-amber-400 font-extrabold',
  'Maestro de Trucos': 'text-purple-400 font-extrabold',
  Golosina: 'text-pink-400',
  Galaxy: 'text-indigo-400',
  Gema: 'text-emerald-400',
  Holofoil: 'text-cyan-400',
  Cubo: 'text-fuchsia-400',
  Cuac: 'text-yellow-400'
};

export default function SpiritCard({ spirit, status = 0, onToggle, viewDensity = 'standard' }) {
  const [imgError, setImgError] = useState(false);

  // Status: 0 = Faltante, 1 = Obtenido, 2 = Dominado
  const isObtained = status >= 1;
  const isMastered = status === 2;

  // Visual Card Status Styles
  const cardBorderClass = isMastered
    ? 'border-lime-400 bg-lime-950/20 shadow-lg shadow-lime-500/10 ring-1 ring-lime-400/40'
    : isObtained
    ? 'border-cyan-400 bg-cyan-950/20 shadow-lg shadow-cyan-500/10'
    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900';

  // --- 1. LIST DENSITY VIEW ---
  if (viewDensity === 'list') {
    return (
      <div 
        onClick={() => onToggle(spirit.id)}
        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${cardBorderClass}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-950 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
            {!imgError ? (
              <img 
                src={spirit.image} 
                alt={spirit.family} 
                onError={() => setImgError(true)}
                className="w-full h-full object-contain p-0.5"
                loading="lazy"
              />
            ) : (
              <span className="text-xs font-mono font-bold text-slate-500">{spirit.family.slice(0, 2)}</span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <strong className="text-sm font-bold text-white tracking-tight">{spirit.family}</strong>
              <span className={`text-[10px] font-mono ${VARIANT_ACCENTS[spirit.variant] || 'text-slate-400'}`}>
                [{spirit.variant}]
              </span>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1 max-w-md">{spirit.ability || 'Variante de espíritu'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${RARITY_COLORS[spirit.rarity] || 'text-slate-400'}`}>
            {spirit.rarity}
          </span>
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
            isMastered ? 'bg-lime-400 text-slate-950' : isObtained ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-500'
          }`}>
            {isMastered ? <Star className="w-4 h-4 fill-slate-950" /> : isObtained ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </div>
        </div>
      </div>
    );
  }

  // --- 2. COMPACT DENSITY VIEW ---
  if (viewDensity === 'compact') {
    return (
      <div 
        onClick={() => onToggle(spirit.id)}
        className={`relative overflow-hidden p-2.5 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between ${cardBorderClass}`}
      >
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className={`px-1.5 py-0.5 rounded border text-[9px] ${RARITY_COLORS[spirit.rarity]}`}>
            {spirit.rarity}
          </span>
          <span className={`font-bold ${isMastered ? 'text-lime-400' : isObtained ? 'text-cyan-400' : 'text-slate-500'}`}>
            {isMastered ? '★ DOMINADO' : isObtained ? '✓ OBTENIDO' : '+ FALTANTE'}
          </span>
        </div>

        <div className="my-2 h-20 flex items-center justify-center overflow-hidden">
          {!imgError ? (
            <img 
              src={spirit.image} 
              alt={spirit.family} 
              onError={() => setImgError(true)}
              className="max-h-full max-w-full object-contain drop-shadow"
              loading="lazy"
            />
          ) : (
            <div className="text-center text-slate-600 space-y-1">
              <ImageOff className="w-6 h-6 mx-auto opacity-50" />
              <span className="text-[10px] font-mono">{spirit.family}</span>
            </div>
          )}
        </div>

        <div className="text-center pt-1 border-t border-white/5">
          <strong className="text-xs font-black text-white block truncate">{spirit.family}</strong>
          <span className={`text-[10px] block truncate font-semibold ${VARIANT_ACCENTS[spirit.variant] || 'text-slate-400'}`}>
            {spirit.variant}
          </span>
        </div>
      </div>
    );
  }

  // --- 3. STANDARD DENSITY VIEW ---
  return (
    <div 
      onClick={() => onToggle(spirit.id)}
      className={`relative overflow-hidden p-4 rounded-2xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] flex flex-col justify-between group ${cardBorderClass}`}
    >
      {/* Scanline hover detail */}
      <div className="absolute inset-0 scanline-overlay opacity-20 pointer-events-none" />

      {/* Top Badge Row */}
      <div className="flex items-center justify-between z-10">
        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border tracking-wider uppercase ${RARITY_COLORS[spirit.rarity]}`}>
          {spirit.rarity}
        </span>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
          isMastered 
            ? 'bg-lime-400 text-slate-950 font-black shadow-md shadow-lime-400/40' 
            : isObtained 
            ? 'bg-cyan-400 text-slate-950 font-black shadow-md shadow-cyan-400/40' 
            : 'bg-slate-800/80 text-slate-500 group-hover:text-slate-300'
        }`}>
          {isMastered ? <Star className="w-4 h-4 fill-slate-950" /> : isObtained ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </div>

      {/* Center Image */}
      <div className="my-4 h-28 flex items-center justify-center z-10">
        {!imgError ? (
          <img 
            src={spirit.image} 
            alt={`${spirit.family} ${spirit.variant}`} 
            onError={() => setImgError(true)}
            className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition duration-300"
            loading="lazy"
          />
        ) : (
          <div className="text-center text-slate-600 space-y-1">
            <ImageOff className="w-8 h-8 mx-auto opacity-40" />
            <span className="text-xs font-mono">{spirit.family}</span>
          </div>
        )}
      </div>

      {/* Bottom Info */}
      <div className="space-y-1.5 text-left pt-2 border-t border-white/5 z-10">
        <div className="flex items-baseline justify-between gap-1">
          <strong className="text-sm font-black text-white tracking-tight truncate">{spirit.family}</strong>
          <span className={`text-xs font-bold shrink-0 ${VARIANT_ACCENTS[spirit.variant] || 'text-slate-400'}`}>
            {spirit.variant}
          </span>
        </div>

        {spirit.ability && (
          <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
            {spirit.ability}
          </p>
        )}

        <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>{spirit.generation === 2 ? '0 POLVOS PARA INVOCAR' : 'ARCHIVO RUNNERS'}</span>
          <span className={`font-bold ${isMastered ? 'text-lime-400' : isObtained ? 'text-cyan-400' : 'text-slate-500'}`}>
            {isMastered ? 'DOMINADO' : isObtained ? 'OBTENIDO' : 'FALTANTE'}
          </span>
        </div>
      </div>

    </div>
  );
}
