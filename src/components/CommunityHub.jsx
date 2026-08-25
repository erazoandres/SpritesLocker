import React, { useState } from 'react';
import { 
  Users, MessageCircle, Shield, ShoppingBag, Copy, Check, 
  ExternalLink, ChevronDown, ChevronUp, Sparkles, Award, Tag 
} from 'lucide-react';
import { 
  WHATSAPP_GROUP_LINK, 
  ADMIN_CONTACT_LINK, 
  SELLERS, 
  GIFT_ACCOUNTS, 
  PRICING_LIST, 
  COMMUNITY_RULES 
} from '../data/community';

export default function CommunityHub({ onCopyText }) {
  const [rulesOpen, setRulesOpen] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* Community Banner & Official WhatsApp Link */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-emerald-500/30 shadow-[0_0_35px_rgba(16,185,129,0.15)] relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
              <MessageCircle className="w-3.5 h-3.5 animate-bounce text-emerald-300" />
              <span>COMUNIDAD OFICIAL LEGIÓN FORTNICADORA</span>
            </div>

            <h2 className="font-hud font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              MERCADO Y GRUPO DE <span className="text-emerald-400">WHATSAPP</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-sans">
              Únete al grupo oficial para conseguir partidas personalizadas, enterarte de códigos al instante y comprar Pavos, regalos y Club de Fortnite con vendedores verificados.
            </p>
          </div>

          {/* WhatsApp Group Button */}
          <a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-hud font-black text-sm uppercase tracking-wider rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.8)] transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shrink-0"
          >
            <MessageCircle className="w-5 h-5 fill-slate-950" />
            <span>UNIRSE AL GRUPO DE WHATSAPP</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Rules Accordion */}
        <div className="border-t border-white/10 pt-4">
          <button
            onClick={() => setRulesOpen(!rulesOpen)}
            className="w-full flex items-center justify-between py-2 text-xs font-hud font-bold text-slate-300 hover:text-white uppercase tracking-wider transition"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>REGLAMENTO DE LA COMUNIDAD ({COMMUNITY_RULES.length} REGLAS)</span>
            </div>
            {rulesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {rulesOpen && (
            <ul className="mt-3 space-y-2 font-sans text-xs text-slate-300 bg-slate-950/60 p-4 rounded-2xl border border-white/5">
              {COMMUNITY_RULES.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-emerald-400 font-bold">{idx + 1}.</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>

      {/* Verified Sellers Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-hud font-black text-xl text-white uppercase tracking-wider">
          <Award className="w-5 h-5 text-amber-400" />
          <span>VENDEDORES VERIFICADOS DE LA COMUNIDAD</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SELLERS.map((seller, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-3xl space-y-4 border border-amber-500/30 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-hud font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {seller.type}
                  </span>
                  <h3 className="font-hud font-black text-2xl text-white uppercase mt-1">
                    {seller.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">{seller.phone}</p>
                </div>
              </div>

              {/* Chat Button */}
              <a
                href={seller.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-hud font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>COTIZAR CON {seller.name} VÍA WHATSAPP</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing List & Fortnite Gift Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Price List Table (6 cols) */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl space-y-4 border border-white/10">
          <div className="flex items-center gap-2 font-hud font-black text-lg text-white uppercase tracking-wider border-b border-white/10 pb-3">
            <Tag className="w-5 h-5 text-cyan-400" />
            <span>LISTA DE PRECIOS ESTIMADOS</span>
          </div>

          <div className="divide-y divide-white/5 font-sans text-xs">
            {PRICING_LIST.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <span className="text-slate-300 font-medium">{item.label}</span>
                <span className="font-hud font-black text-base text-cyan-300 bg-slate-950 px-3 py-1 rounded-xl border border-cyan-500/30">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 20 Fortnite Gift Accounts with 1-Touch Copy (6 cols) */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl space-y-4 border border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 font-hud font-black text-lg text-white uppercase tracking-wider">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <span>20 CUENTAS PARA REGALOS</span>
            </div>
            <span className="text-xs font-mono text-slate-400">1-Touch Copy</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
            {GIFT_ACCOUNTS.map((acc, idx) => (
              <button
                key={idx}
                onClick={() => onCopyText(acc, `Cuenta ${acc} copiada`)}
                className="p-2 rounded-xl bg-slate-950 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 font-mono text-xs font-bold transition flex items-center justify-between gap-1 active:scale-95 group"
              >
                <span className="truncate">{acc}</span>
                <Copy className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
