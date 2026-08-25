import React, { useState } from 'react';
import {
  WHATSAPP_GROUP_LINK,
  ADMIN_CONTACT_LINK,
  SELLERS,
  GIFT_ACCOUNTS,
  PRICING_LIST,
  COMMUNITY_RULES
} from '../data/community';
import { MessageCircle, ShoppingBag, Gift, Copy, Check, ExternalLink, ShieldAlert, Award, UserCheck } from 'lucide-react';

export default function MinimalCommunity({ onCopyText }) {
  const [copiedAccount, setCopiedAccount] = useState(null);

  const handleCopyAccount = (acc) => {
    onCopyText(acc, `Cuenta ${acc} copiada al portapapeles`);
    setCopiedAccount(acc);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-3 space-y-4">
      
      {/* Community Header Banner */}
      <div className="glass-minimal rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl border border-white/10">
        <div className="space-y-1">
          <h3 className="font-hud font-black text-xl text-white uppercase tracking-tight flex items-center gap-2">
            <span className="text-cyan-400">COMUNIDAD</span> LEGIÓN FORTNICADORA
          </h3>
          <p className="text-xs font-mono text-slate-400 max-w-xl">
            Comunidad oficial de intercambio, soporte y vendedores verificados de Pavos, Club de Fortnite y cosméticos vía regalo.
          </p>
        </div>

        {/* WhatsApp Main Group Button */}
        <a
          href={WHATSAPP_GROUP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-hud font-black text-xs uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition active:scale-95 shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-slate-950" />
          <span>GRUPO DE WHATSAPP</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Grid Section: Verified Sellers & Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Card 1 & 2: Verified Sellers (Ivy & Vicente) */}
        {SELLERS.map((seller, idx) => (
          <div
            key={idx}
            className="glass-minimal rounded-2xl p-4 flex flex-col justify-between gap-3 border border-white/10 hover:border-cyan-500/40 transition-all duration-200 hover-subtle-scale"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-extrabold uppercase flex items-center gap-1">
                  <UserCheck className="w-3 h-3" /> VENDEDOR VERIFICADO
                </span>
                <span className="text-[11px] font-mono text-slate-400">{seller.phone}</span>
              </div>

              <h4 className="font-hud font-black text-base text-white uppercase">{seller.name}</h4>
              <p className="text-xs font-mono text-amber-300 font-bold">{seller.type}</p>
            </div>

            {/* Direct Contact Button */}
            <a
              href={seller.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-hud font-black text-xs uppercase flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(16,185,129,0.3)] transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>CONTACTAR POR WHATSAPP</span>
            </a>
          </div>
        ))}

        {/* Card 3: Pricing Reference Overview */}
        <div className="glass-minimal rounded-2xl p-4 flex flex-col justify-between gap-3 border border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-hud font-bold text-xs uppercase">
              <ShoppingBag className="w-4 h-4" />
              <span>PRECIOS DE REFERENCIA</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {PRICING_LIST.map((item, i) => (
                <div key={i} className="bg-slate-900/80 p-2 rounded-xl border border-white/5 space-y-0.5">
                  <div className="font-extrabold text-cyan-300">{item.price}</div>
                  <div className="text-[10px] text-slate-400 leading-tight">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Gift Accounts High-Density Grid */}
      <div className="glass-minimal rounded-2xl p-4 space-y-3 border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-hud font-bold text-sm uppercase">
            <Gift className="w-4 h-4" />
            <span>CUENTAS DE REGALO OFICIALES (VICBUCKS & IVYBUCKS)</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Haz clic en cualquier cuenta para copiar el nombre de usuario
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2">
          {GIFT_ACCOUNTS.map((acc) => {
            const isCopied = copiedAccount === acc;
            return (
              <button
                key={acc}
                onClick={() => handleCopyAccount(acc)}
                className={`px-2.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1 ${
                  isCopied
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                    : 'bg-slate-900/90 text-slate-300 hover:text-cyan-300 hover:bg-slate-800 border border-white/10'
                }`}
              >
                {isCopied ? <Check className="w-3 h-3" /> : null}
                <span>{acc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Community Rules Footer Accordion */}
      <div className="glass-minimal rounded-2xl p-4 space-y-2 border border-white/10">
        <div className="flex items-center gap-2 text-rose-400 font-hud font-bold text-xs uppercase">
          <ShieldAlert className="w-4 h-4" />
          <span>REGLAS DE LA COMUNIDAD</span>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono text-slate-400">
          {COMMUNITY_RULES.map((rule, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-slate-900/50 p-2 rounded-xl border border-white/5">
              <span className="text-rose-400 font-bold">•</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
