import React, { useState } from 'react';
import { Terminal, Copy, CheckSquare, Square, Gift, Sparkles, Check, ShieldAlert } from 'lucide-react';
import { SECRET_CODES, CODE_CATEGORIES } from '../data/codes';

export default function SecretCodesTerminal({
  onCopyCode,
  redeemedCodes = [],
  onToggleRedeemed
}) {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter secret codes
  const filteredCodes = SECRET_CODES.filter((item) => {
    if (selectedCategory !== 'Todas' && item.category !== selectedCategory) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        item.code.toLowerCase().includes(q) ||
        item.reward.toLowerCase().includes(q) ||
        (item.note && item.note.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const redeemedCount = redeemedCodes.length;
  const totalCodesCount = SECRET_CODES.length;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Classified Terminal Header */}
      <div className="glass-panel p-6 rounded-3xl space-y-4 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.1)] relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-400/60 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Terminal className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>TERMINAL CLASIFICADA // CÓDIGOS SECRETOS</span>
              </div>
              <h2 className="font-hud font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                CANJE DE RECOMPENSAS OVERRIDE
              </h2>
            </div>
          </div>

          {/* Redeemed Tracker Badge */}
          <div className="px-4 py-2 bg-slate-950/80 border border-cyan-500/40 rounded-2xl font-mono text-xs text-right">
            <div className="text-[10px] text-slate-400 uppercase font-bold">REGISTRO DE CANJE</div>
            <div className="font-bold text-cyan-300">
              {redeemedCount} DE {totalCodesCount} CÓDIGOS RECLAMADOS
            </div>
          </div>
        </div>

        {/* Search & Category Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {CODE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-hud font-bold text-xs uppercase whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] font-extrabold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar código o recompensa..."
            className="bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
          />

        </div>

      </div>

      {/* Secret Codes Terminal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCodes.map((item) => {
          const isRedeemed = redeemedCodes.includes(item.id);
          return (
            <div
              key={item.id}
              className={`glass-panel p-5 rounded-2xl space-y-3 border transition-all duration-200 ${
                isRedeemed
                  ? 'border-emerald-500/40 bg-emerald-950/10 opacity-75'
                  : 'border-white/10 hover:border-cyan-500/40'
              }`}
            >
              {/* Category Badge & Redeemed Checkbox */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md font-hud font-bold text-[10px] uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {item.category}
                </span>

                <button
                  onClick={() => onToggleRedeemed(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition ${
                    isRedeemed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                  title={isRedeemed ? 'Marcar como pendiente' : 'Marcar como canjeado'}
                >
                  {isRedeemed ? (
                    <>
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>CANJEADO</span>
                    </>
                  ) : (
                    <>
                      <Square className="w-3.5 h-3.5" />
                      <span>PENDIENTE</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Name & Copy Action */}
              <div className="bg-slate-950 p-3 rounded-xl border border-white/5 flex items-center justify-between gap-2">
                <code className="font-mono font-black text-base text-cyan-300 tracking-wider truncate">
                  {item.code}
                </code>

                <button
                  onClick={() => onCopyCode(item.code, `Código ${item.code} copiado al portapapeles`)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 font-hud font-bold text-xs uppercase flex items-center gap-1 shrink-0 transition active:scale-95"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPIAR</span>
                </button>
              </div>

              {/* Reward Details */}
              <div className="space-y-1">
                <div className="text-xs font-hud font-bold text-white uppercase flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.reward}</span>
                </div>

                {item.note && (
                  <p className="text-[11px] font-sans text-slate-400">
                    ℹ️ {item.note}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
