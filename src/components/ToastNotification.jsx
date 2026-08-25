import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function ToastNotification({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounceIn">
      <div className="glass-panel-glow px-4 py-3 rounded-2xl flex items-center gap-3 border border-cyan-400/60 shadow-[0_0_25px_rgba(0,240,255,0.4)] text-cyan-300 backdrop-blur-xl">
        <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-400/40 shrink-0">
          <CheckCircle2 className="w-4 h-4 animate-pulse" />
        </div>
        <div className="font-hud font-extrabold text-xs uppercase tracking-wider text-white pr-2">
          {message}
        </div>
      </div>
    </div>
  );
}
