import React, { useState } from 'react';
import { SECRET_CODES, CODE_CATEGORIES } from '../data/codes';
import { Copy, Check, Terminal, Sparkles, Gift, ShieldCheck, CheckSquare, Square } from 'lucide-react';

export default function MinimalCodes({ onCopyCode, redeemedCodes = [], onToggleRedeemed }) {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [copiedId, setCopiedId] = useState(null);

  const filteredCodes = SECRET_CODES.filter(
    (item) => activeCategory === 'Todas' || item.category === activeCategory
  );

  const handleCopy = (item) => {
    onCopyCode(item.code, `Código ${item.code} copiado al portapapeles`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const redeemedCount = redeemedCodes.length;

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-3 space-y-4">
      
      {/* Category Pills & Stats Bar */}
      <div className="glass-minimal rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-xl border border-white/10">
        
        {/* Left: Section Header & Counter */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-500/40">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-hud font-extrabold text-base text-white uppercase tracking-tight flex items-center gap-2">
              <span>CÓDIGOS SECRETOS OVERRIDE</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono">
                {SECRET_CODES.length} CÓDIGOS
              </span>
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Canjea estos códigos oficiales en el menú del juego para recompensas gratuitas.
            </p>
          </div>
        </div>

        {/* Right: Redeemed Counter Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300 font-bold">Canjeados:</span>
          <span className="text-emerald-400 font-extrabold">
            {redeemedCount}/{SECRET_CODES.length}
          </span>
        </div>

      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CODE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-hud font-bold transition-all whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.4)] font-black'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Codes High-Density Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredCodes.map((item) => {
          const isRedeemed = redeemedCodes.includes(item.id);
          const isJustCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className={`glass-minimal rounded-2xl p-3.5 flex flex-col justify-between gap-3 border transition-all duration-200 hover-subtle-scale ${
                isRedeemed
                  ? 'border-emerald-500/30 bg-emerald-950/10 opacity-75'
                  : 'border-white/10 hover:border-cyan-500/40 bg-slate-900/50'
              }`}
            >
              {/* Top Row: Code string & Category */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-sm text-cyan-300 tracking-wider bg-cyan-950/40 px-2.5 py-0.5 rounded-lg border border-cyan-500/30 select-all">
                      {item.code}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 text-[10px] font-mono font-bold uppercase border border-white/5">
                      {item.category}
                    </span>
                  </div>
                  <div className="font-hud font-bold text-xs text-white flex items-center gap-1.5 pt-0.5">
                    <Gift className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item.reward}</span>
                  </div>
                </div>

                {/* Redeem Checkbox */}
                <button
                  onClick={() => onToggleRedeemed(item.id)}
                  title={isRedeemed ? 'Marcar como pendiente' : 'Marcar como canjeado'}
                  className={`p-1.5 rounded-xl border transition ${
                    isRedeemed
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-900 text-slate-500 border-white/10 hover:text-slate-300'
                  }`}
                >
                  {isRedeemed ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Note if present */}
              {item.note && (
                <p className="text-[11px] font-mono text-amber-300/80 bg-amber-950/20 p-2 rounded-xl border border-amber-500/20">
                  ⚠️ {item.note}
                </p>
              )}

              {/* Bottom Action: Copy Code Button */}
              <button
                onClick={() => handleCopy(item)}
                className={`w-full py-2 px-3 rounded-xl font-hud font-extrabold text-xs uppercase flex items-center justify-center gap-2 transition active:scale-95 ${
                  isJustCopied
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                    : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}
              >
                {isJustCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡CÓDIGO COPIADO!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPIAR CÓDIGO</span>
                  </>
                )}
              </button>

            </div>
          );
        })}
      </div>

    </section>
  );
}
