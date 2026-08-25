import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900/95 border border-cyan-500/40 text-cyan-400 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md animate-bounce">
      <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
      <span className="text-sm font-semibold text-slate-100">{message}</span>
    </div>
  );
}
