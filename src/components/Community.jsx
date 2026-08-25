import React, { useState } from 'react';
import { Users, Shield, Copy, ExternalLink, ChevronDown, MessageSquare, Tag, PhoneCall } from 'lucide-react';
import { 
  WHATSAPP_GROUP_LINK, 
  ADMIN_CONTACT_LINK, 
  SELLERS, 
  GIFT_ACCOUNTS, 
  PRICING_LIST, 
  COMMUNITY_RULES 
} from '../data/community';

export default function Community({ onCopyText }) {
  const [rulesOpen, setRulesOpen] = useState(false);

  return (
    <div id="comunidad" className="max-w-7xl mx-auto px-4 sm:px-6 my-16 space-y-12">
      
      {/* 1. Official WhatsApp Group Callout Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-md">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
            CANAL OFICIAL DE LA LEGIÓN
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            JUEGA, INTERCAMBIA Y COMPLETA LA COLECCIÓN
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Comunidad de México y Latinoamérica para apoyarnos durante la temporada, intercambiar estrategias y completar la colección de Espíritus.
          </p>
        </div>

        <a
          href={WHATSAPP_GROUP_LINK}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-7 py-4 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5 shadow-xl shadow-emerald-500/20 active:scale-95 transition"
        >
          <MessageSquare className="w-5 h-5" />
          <span>ENTRAR AL GRUPO DE WHATSAPP ↗</span>
        </a>
      </div>

      {/* 2. Community Rules & Gift Process Accordion */}
      <div className="bg-slate-900/70 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <button
          onClick={() => setRulesOpen(!rulesOpen)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-900 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block">
                PROTOCOLO DE LA COMUNIDAD
              </span>
              <strong className="text-base font-black text-white">
                REGLAS, VENTAS Y PROCESO PARA REGALOS
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <span className="hidden sm:inline">{rulesOpen ? 'OCULTAR' : 'TOCA PARA EXPANDIR'}</span>
            <ChevronDown className={`w-5 h-5 transform transition-transform ${rulesOpen ? 'rotate-180 text-purple-400' : ''}`} />
          </div>
        </button>

        {rulesOpen && (
          <div className="p-6 border-t border-white/10 space-y-8 bg-slate-950/60 animate-fadeIn">
            
            {/* Rules Article */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider text-purple-400">
                1. REGLAS DE CONVIVENCIA
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                {COMMUNITY_RULES.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>

            {/* Gift Process Article */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider text-cyan-400">
                2. PROCESO PARA REGALOS EN FORTNITE
              </h3>
              <ol className="space-y-1 text-xs text-slate-300 list-decimal list-inside font-mono">
                <li>Agrega las cuentas oficiales indicadas abajo en Fortnite.</li>
                <li>Espera 48 horas tras aceptar la amistad (plazo requerido por Epic Games).</li>
                <li>Contacta al vendedor oficial para confirmar cosmético y envío.</li>
              </ol>

              {/* Gift Accounts Grid */}
              <div className="pt-2">
                <span className="text-[11px] font-mono text-slate-400 block mb-2 font-bold">
                  CUENTAS OFICIALES PARA AGREGAR (CLIC PARA COPIAR):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {GIFT_ACCOUNTS.map(acc => (
                    <button
                      key={acc}
                      onClick={() => onCopyText(acc, `Cuenta ${acc} copiada`)}
                      className="bg-slate-900 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-400 border border-white/10 hover:border-cyan-400/40 p-2 rounded-xl text-xs font-mono font-bold flex items-center justify-between gap-1 transition active:scale-95"
                    >
                      <span className="truncate">{acc}</span>
                      <Copy className="w-3 h-3 shrink-0 text-slate-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing List Table */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider text-lime-400">
                3. PRECIOS PUBLICADOS (REFERENCIA)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {PRICING_LIST.map((item, i) => (
                  <div key={i} className="bg-slate-900 p-3 rounded-xl border border-white/5 text-center space-y-1">
                    <strong className="text-sm font-black text-lime-400 block font-mono">{item.price}</strong>
                    <span className="text-[10px] text-slate-400 block font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* 3. Exclusive Sellers / Promos Section */}
      <div id="vendedores" className="space-y-6">
        <div className="border-b border-lime-500/20 pb-3">
          <span className="text-[10px] font-mono font-bold text-lime-400 uppercase tracking-widest block">
            MARKETPLACE / VENDEDORES VERIFICADOS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase flex items-center gap-2 mt-1">
            <Tag className="w-6 h-6 text-lime-400" />
            PROMOCIONES DE LA LEGIÓN
          </h2>
          <p className="text-xs text-slate-400">
            Presiona cualquier tarjeta para abrir chat directo por WhatsApp con el vendedor verificado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SELLERS.map((seller, idx) => (
            <a
              key={idx}
              href={seller.link}
              target="_blank"
              rel="noreferrer"
              className="group bg-slate-900/80 border border-white/10 hover:border-lime-400 rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-5 transition shadow-xl hover:shadow-lime-500/10"
            >
              <img
                src={seller.img}
                alt={seller.name}
                className="w-full sm:w-36 h-36 object-cover rounded-2xl border border-white/10 group-hover:scale-105 transition duration-300 shrink-0"
              />
              <div className="space-y-2 text-center sm:text-left w-full">
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-lime-400/10 text-lime-400 border border-lime-400/30 uppercase inline-block">
                  {seller.type}
                </span>
                <h3 className="text-lg font-black text-white group-hover:text-lime-400 transition">
                  {seller.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono flex items-center justify-center sm:justify-start gap-1">
                  <PhoneCall className="w-3.5 h-3.5 text-lime-400" />
                  {seller.phone}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-lime-400 group-hover:underline">
                    ABRIR CHAT DE WHATSAPP ↗
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="text-[11px] text-slate-500 text-center font-mono">
          * Promociones comunitarias independientes. Legión Fortnicadora no está afiliada con Epic Games.
        </p>
      </div>

      {/* 4. Support & Reports Contact Banner */}
      <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-sm font-bold text-white uppercase">¿TIENES DUDAS, RECOMENDACIONES O REPORTES?</h4>
          <p className="text-xs text-slate-400">Contacta directamente a iCharly_Afton al +52 1 55 8205 7435.</p>
        </div>
        <a
          href={ADMIN_CONTACT_LINK}
          target="_blank"
          rel="noreferrer"
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
          <span>CONTACTAR A iCHARLY ↗</span>
        </a>
      </div>

    </div>
  );
}
