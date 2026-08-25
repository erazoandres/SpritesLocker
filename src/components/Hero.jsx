import React from 'react';
import { Zap, ShieldCheck, Layers, Sparkles, ChevronRight } from 'lucide-react';

export default function Hero({ onSelectGen, activeGen }) {
  return (
    <section id="inicio" className="relative overflow-hidden pt-8 pb-10 border-b border-cyan-500/20 bg-gradient-to-b from-[#0c0e17] to-[#07080d]">
      
      {/* Background Cyber Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-4 text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold tracking-wider">
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              SISTEMA OVERRIDE // ONLINE · TEMPORADA 4
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none">
              CASILLERO <br />
              <span className="bg-gradient-to-r from-cyan-400 via-lime-400 to-pink-500 bg-clip-text text-transparent italic">
                GEN_02 OVERRIDE
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
              La nueva generación de Espíritus ya está activa. Marca tu colección con un toque (obtenido), domina con el segundo (dominado) y gestiona las dos generaciones en un solo lugar.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectGen(2)}
                className={`px-5 py-3 rounded-xl font-extrabold text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95 ${
                  activeGen === 2
                    ? 'bg-gradient-to-r from-cyan-400 to-lime-400 text-slate-950 shadow-cyan-500/25 ring-2 ring-cyan-400/50'
                    : 'bg-slate-900 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10'
                }`}
              >
                <span>ABRIR GENERACIÓN 2 (36)</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectGen(1)}
                className={`px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all active:scale-95 ${
                  activeGen === 1
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-pink-500/25 ring-2 ring-pink-400/50'
                    : 'bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-white/30'
                }`}
              >
                <span>ARCHIVO GEN 1 (117)</span>
              </button>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-400">
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              <span>CREADO POR <strong className="text-slate-200">iCharly_Afton</strong> // LEGIÓN FORTNICADORA</span>
            </div>

          </div>

          {/* Quick Stats & Image Preview Cards */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-3">
            
            <div className="bg-slate-900/70 border border-cyan-500/30 p-4 rounded-2xl text-center space-y-1 backdrop-blur-md shadow-xl hover:border-cyan-400 transition">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">36</div>
              <div className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">Nuevos (Gen 2)</div>
            </div>

            <div className="bg-slate-900/70 border border-lime-500/30 p-4 rounded-2xl text-center space-y-1 backdrop-blur-md shadow-xl hover:border-lime-400 transition">
              <div className="text-2xl sm:text-3xl font-black text-lime-400 font-mono">12</div>
              <div className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">Familias</div>
            </div>

            <div className="bg-slate-900/70 border border-pink-500/30 p-4 rounded-2xl text-center space-y-1 backdrop-blur-md shadow-xl hover:border-pink-400 transition">
              <div className="text-2xl sm:text-3xl font-black text-pink-400 font-mono">3</div>
              <div className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">Variantes</div>
            </div>

            {/* Featured Spirit Images */}
            <div className="col-span-3 bg-slate-900/40 border border-white/10 rounded-2xl p-4 flex items-center justify-around gap-2">
              <div className="text-center">
                <img 
                  src="https://icharly-afton-sprite-locker.icharly-afton.chatgpt.site/sprites/gen2/T_Icon_BR_Creature_Sprite_NarrowFlea_Obsidian_Cheatmaster_L.webp" 
                  alt="Sonic Maestro"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.5)] mx-auto hover:scale-110 transition duration-300"
                />
                <span className="text-[10px] font-bold text-cyan-400 font-mono">SONIC</span>
              </div>
              <div className="text-center">
                <img 
                  src="https://icharly-afton-sprite-locker.icharly-afton.chatgpt.site/sprites/gen2/T_Icon_BR_Creature_Sprite_Crown_Gold_L.webp" 
                  alt="Corona Oro"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_12px_rgba(183,255,36,0.5)] mx-auto hover:scale-110 transition duration-300"
                />
                <span className="text-[10px] font-bold text-lime-400 font-mono">CORONA ORO</span>
              </div>
              <div className="text-center">
                <img 
                  src="https://icharly-afton-sprite-locker.icharly-afton.chatgpt.site/sprites/gen2/T_Icon_BR_Creature_Sprite_JazzJackrabbit_L.webp" 
                  alt="Jazz Jackrabbit"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_12px_rgba(255,59,212,0.5)] mx-auto hover:scale-110 transition duration-300"
                />
                <span className="text-[10px] font-bold text-pink-400 font-mono">JAZZ JACKRABBIT</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
