import React, { useState, useEffect, useMemo } from 'react';
import MinimalHeader from './components/MinimalHeader';
import MinimalSpriteGrid from './components/MinimalSpriteGrid';
import MinimalCodes from './components/MinimalCodes';
import ExportModal from './components/ExportModal';
import Toast from './components/Toast';

import { GEN2_SPIRITS } from './data/gen2_spirits';
import { GEN1_SPIRITS } from './data/gen1_spirits';
import { 
  loadSavedState, 
  saveLocalState, 
  loadRedeemedCodes, 
  saveRedeemedCodes 
} from './utils/storage';
import { trackVisit } from './utils/analytics';

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function App() {
  const [activeGen, setActiveGen] = useState(2); // Default to Gen 2 Override
  const [activeTab, setActiveTab] = useState('coleccion'); // 'coleccion', 'codigos'
  const [userState, setUserState] = useState({}); // Always 100% unmarked by default
  const [redeemedCodes, setRedeemedCodes] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [totalVisits, setTotalVisits] = useState(null);

  // Initialize startup: purge local storage, start clean, and track global visits
  useEffect(() => {
    try {
      localStorage.removeItem('icharly-sprite-locker-v2');
      localStorage.removeItem('icharly-sprite-locker-v1');
    } catch {}

    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const lockerHash = hashParams.get('locker');
    if (lockerHash) {
      const saved = loadSavedState();
      setUserState(saved);
    } else {
      setUserState({}); // Guarantee 100% unmarked, clean state on initial load & reload
    }

    const savedCodes = loadRedeemedCodes();
    setRedeemedCodes(savedCodes);

    // Track global visit and fetch total visits count
    trackVisit().then(count => {
      if (count !== null) setTotalVisits(count);
    });
  }, []);

  // Update a single spirit status
  const handleToggleSpirit = (id) => {
    setUserState(prev => {
      const current = prev[id] || 0;
      const next = (current + 1) % 3; // 0 -> 1 -> 2 -> 0
      return { ...prev, [id]: next };
    });
  };

  // Batch update multiple spirits at once
  const handleBatchUpdate = (updates) => {
    setUserState(prev => ({ ...prev, ...updates }));
  };

  // Reset current generation state to 100% unmarked
  const handleResetGen = () => {
    const spiritsToReset = activeGen === 2 ? GEN2_SPIRITS : GEN1_SPIRITS;
    if (!window.confirm(`¿Desmarcar todo en la Generación ${activeGen}?`)) {
      return;
    }

    setUserState(prev => {
      const resetIds = new Set(spiritsToReset.map(s => s.id));
      const updated = Object.fromEntries(
        Object.entries(prev).filter(([key]) => !resetIds.has(key))
      );
      showToast(`Generación ${activeGen} desmarcada por completo`);
      return updated;
    });
  };

  // Toggle redeemed codes checklist
  const handleToggleRedeemed = (codeId) => {
    setRedeemedCodes(prev => {
      const updated = prev.includes(codeId)
        ? prev.filter(id => id !== codeId)
        : [...prev, codeId];
      saveRedeemedCodes(updated);
      return updated;
    });
  };

  // Toast feedback helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Copy plain text helper (codes, handles)
  const handleCopyText = async (text, msg) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    showToast(msg || `Copiado: ${text}`);
  };

  // Current active spirits dataset
  const activeSpirits = activeGen === 2 ? GEN2_SPIRITS : GEN1_SPIRITS;

  // Statistics calculation for active generation
  const activeStats = useMemo(() => {
    let obtained = 0;
    let mastered = 0;
    activeSpirits.forEach(item => {
      const st = userState[item.id] || 0;
      if (st >= 1) obtained++;
      if (st === 2) mastered++;
    });
    return {
      obtained,
      mastered,
      missing: activeSpirits.length - obtained
    };
  }, [activeSpirits, userState]);

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 selection:bg-cyan-400 selection:text-slate-950">
      
      {/* Streamlined HUD Header */}
      <MinimalHeader 
        onDownloadCapture={() => setExportModalOpen(true)}
        activeGen={activeGen}
        totalObtained={activeStats.obtained}
        totalSpirits={activeSpirits.length}
        totalVisits={totalVisits}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onSelectGen={setActiveGen}
      />

      <main className="pb-12">
        
        {/* Main Content Tabs */}
        {activeTab === 'coleccion' && (
          <MinimalSpriteGrid 
            spirits={activeSpirits}
            userState={userState}
            onToggleSpirit={handleToggleSpirit}
            onBatchUpdate={handleBatchUpdate}
            activeGen={activeGen}
            onResetGen={handleResetGen}
            onOpenExportModal={() => setExportModalOpen(true)}
          />
        )}

        {activeTab === 'codigos' && (
          <MinimalCodes 
            onCopyCode={handleCopyText}
            redeemedCodes={redeemedCodes}
            onToggleRedeemed={handleToggleRedeemed}
          />
        )}

      </main>

      {/* Minimal Footer with direct link to GitHub profile (https://github.com/erazoandres) */}
      <footer className="border-t border-white/5 bg-slate-950/80 py-6 text-center text-xs text-slate-500 font-mono flex items-center justify-center gap-1.5 flex-wrap">
        <span>EL CASILLERO · Creado por</span>
        <a
          href="https://github.com/erazoandres"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 font-bold underline decoration-cyan-400/40 underline-offset-4 flex items-center gap-1 transition"
          title="Ver perfil de GitHub de Andrés Erazo"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>Andrés Erazo (@erazoandres)</span>
        </a>
      </footer>

      {/* Export Canvas Capture Modal */}
      {exportModalOpen && (
        <ExportModal 
          spirits={activeSpirits}
          userState={userState}
          activeGen={activeGen}
          onClose={() => setExportModalOpen(false)}
          onShowToast={showToast}
        />
      )}

      {/* Toast Feedback */}
      <Toast message={toastMessage} />

    </div>
  );
}
