import React, { useState, useMemo } from 'react';
import { Gift, Copy, CheckCircle2, Search, Sparkles, HelpCircle } from 'lucide-react';
import { SECRET_CODES, CODE_CATEGORIES } from '../data/codes';

export default function SecretCodes({ onCopyCode, redeemedCodes, onToggleRedeemed }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [showInstructions, setShowInstructions] = useState(false);

  // Filter codes list
  const filteredCodes = useMemo(() => {
    return SECRET_CODES.filter(item => {
      const matchCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || 
        `${item.code} ${item.reward} ${item.category} ${item.note || ''}`
          .toLowerCase()
          .includes(q);
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="codigos" className="max-w-7xl mx-auto px-4 sm:px-6 my-16 space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-pink-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-widest block">
              LOBBY_HACKS / SINCRONIZACIÓN AUTOMÁTICA
            </span>
            <span className="bg-pink-500/10 text-pink-400 text-[10px] font-bold px-2 py-0.5 rounded border border-pink-500/30">
              ACTUALIZADO 24 DE AGOSTO DE 2026
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase flex items-center gap-2 mt-1">
            <Gift className="w-6 h-6 text-pink-400" />
            CÓDIGOS SECRETOS DE SALA
          </h2>
          <p className="text-xs text-slate-400 max-w-xl">
            Cópialos directamente y pégalos en el Panel de Administración de la sala de Fortnite. Cada código se canjea una vez por cuenta.
          </p>
        </div>

        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="flex items-center gap-1.5 bg-slate-900 border border-white/10 hover:border-pink-400 text-slate-300 hover:text-pink-400 font-bold px-3.5 py-2 rounded-xl text-xs transition self-start sm:self-auto"
        >
          <HelpCircle className="w-4 h-4 text-pink-400" />
          <span>¿CÓMO CANJEARLOS?</span>
        </button>
      </div>

      {/* Instructions Modal / Accordion */}
      {showInstructions && (
        <div className="bg-gradient-to-r from-slate-900 via-pink-950/30 to-slate-900 border border-pink-500/30 p-5 rounded-2xl space-y-3 animate-fadeIn">
          <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            INSTRUCCIONES DE CANJE EN SALA DE FORTNITE:
          </h3>
          <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1 font-mono">
            <li>Entra a la sala principal de Fortnite Override / Runners.</li>
            <li>Abre el botón <strong className="text-pink-400">Panel de administración</strong> en la esquina superior derecha.</li>
            <li>Copia un código de la lista de abajo, pégalo en el campo y presiona Enviar.</li>
          </ol>
          <p className="text-[11px] text-slate-400 italic">
            * Los códigos no distinguen mayúsculas y minúsculas. Puedes marcar tus códigos canjeados con el check.
          </p>
        </div>
      )}

      {/* Toolbar & Category Filters */}
      <div className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl space-y-3 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="BUSCAR CÓDIGO O RECOMPENSA..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-400 transition"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {CODE_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold shrink-0 transition ${
                  selectedCategory === cat
                    ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25'
                    : 'bg-slate-950 border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Codes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCodes.map(item => {
          const isRedeemed = redeemedCodes.includes(item.id);

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition group ${
                isRedeemed 
                  ? 'bg-slate-950/40 border-slate-800 opacity-65' 
                  : 'bg-slate-900/60 border-white/10 hover:border-pink-500/40 hover:bg-slate-900'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20 uppercase">
                    {item.category}
                  </span>
                  
                  {/* Redeemed Checkbox */}
                  <button
                    onClick={() => onToggleRedeemed(item.id)}
                    className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded transition ${
                      isRedeemed ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title={isRedeemed ? 'Marcar como pendiente' : 'Marcar como canjeado'}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isRedeemed ? 'text-emerald-400 fill-emerald-400/20' : ''}`} />
                    <span>{isRedeemed ? 'CANJEADO' : 'MARCAR'}</span>
                  </button>
                </div>

                <code className="text-lg font-black font-mono text-white block tracking-wider select-all">
                  {item.code}
                </code>

                <p className="text-xs font-semibold text-slate-300 leading-snug">
                  {item.reward}
                </p>

                {item.note && (
                  <p className="text-[10px] text-amber-400/90 italic bg-amber-500/10 p-1.5 rounded border border-amber-500/20">
                    {item.note}
                  </p>
                )}
              </div>

              <button
                onClick={() => onCopyCode(item.code, `Código ${item.code} copiado`)}
                className="w-full bg-slate-950 hover:bg-pink-500 text-slate-300 hover:text-white border border-white/10 hover:border-pink-500 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>COPIAR CÓDIGO</span>
              </button>
            </div>
          );
        })}
      </div>

    </section>
  );
}
