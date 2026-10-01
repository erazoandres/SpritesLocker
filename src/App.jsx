import React, { useState, useEffect, useMemo } from 'react';
import MinimalHeader from './components/MinimalHeader';
import MinimalSpriteGrid from './components/MinimalSpriteGrid';
import ExportModal from './components/ExportModal';
import WelcomeModal from './components/WelcomeModal';
import DemoPromptModal from './components/DemoPromptModal';
import AudioPlayer from './components/AudioPlayer';
import Toast from './components/Toast';

import { GEN2_SPIRITS } from './data/gen2_spirits';
import { 
  loadSavedState, 
  saveLocalState
} from './utils/storage';
import { trackVisit, fetchExportCount, trackExport } from './utils/analytics';
import { startGuidedTour, runGuidedDemoSequence } from './utils/tour';

const PortfolioIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function App() {
  const activeGen = 2;
  const [userState, setUserState] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [demoPromptOpen, setDemoPromptOpen] = useState(false);
  const [totalVisits, setTotalVisits] = useState(null);
  const [totalExports, setTotalExports] = useState(null);

  // Initialize startup: check first-time visitor & load saved user selections
  useEffect(() => {
    try {
      const seen = localStorage.getItem('el-casillero-welcome-seen');
      if (!seen) setWelcomeOpen(true);
    } catch {}

    const saved = loadSavedState(2);
    setUserState(saved);

    // Track global visit count
    trackVisit().then(count => {
      if (count !== null) setTotalVisits(count);
    });

    // Fetch live exports count from document BAmrUK0Bk8D9FTjWkCYZ
    fetchExportCount().then(count => {
      if (count !== null) setTotalExports(count);
    });
  }, []);

  // Update a single spirit status and save to LocalStorage (preserves 1=Tengo, 2=Dominado, 3=Faltante)
  const handleToggleSpirit = (id) => {
    setUserState(prev => {
      const current = prev[id] || 0;
      const next = (current + 1) % 3; // 0 -> 1 -> 2 -> 0
      const updated = { ...prev, [id]: next };
      saveLocalState(updated, 2);
      return updated;
    });
  };

  // Batch update multiple spirits at once and save to LocalStorage
  const handleBatchUpdate = (updates) => {
    setUserState(prev => {
      const updated = { ...prev, ...updates };
      saveLocalState(updated, 2);
      return updated;
    });
  };

  // Reset collection state and update LocalStorage
  const handleResetGen = () => {
    if (!window.confirm('¿Desmarcar todo en el Casillero?')) {
      return;
    }

    setUserState(prev => {
      const resetIds = new Set(GEN2_SPIRITS.map(s => s.id));
      const updated = Object.fromEntries(
        Object.entries(prev).filter(([key]) => !resetIds.has(key))
      );
      saveLocalState(updated, 2);
      showToast('Casillero desmarcado por completo');
      return updated;
    });
  };

  // Toast feedback helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Launch guided tour with post-tour demo confirmation modal
  const handleStartTour = () => {
    startGuidedTour(() => {
      setDemoPromptOpen(true);
    });
  };

  // Execute interactive step-by-step guided demo using Driver.js popover highlights
  const handleAcceptDemo = (mode = 'tengo') => {
    setDemoPromptOpen(false);
    
    // 1. Reset current state so NOTHING is selected initially
    setUserState({});

    setTimeout(() => {
      runGuidedDemoSequence({
        mode,
        activeSpirits: GEN2_SPIRITS,
        onUpdateState: (updates) => {
          setUserState(prev => ({ ...prev, ...updates }));
        },
        onOpenExport: () => {
          setExportModalOpen(true);
        }
      });
    }, 400);
  };

  // Current active spirits dataset
  const activeSpirits = GEN2_SPIRITS;

  // Validate marked count before opening export modal
  const handleOpenExportModal = () => {
    const markedCount = activeSpirits.filter(s => (userState[s.id] || 0) >= 1 || (userState[s.id] || 0) === 3).length;
    if (markedCount === 0) {
      showToast('⚠️ Marca al menos 1 espíritu para exportar');
      alert('Debes seleccionar o marcar al menos un espíritu en tu casillero (Tengo, Dominado o Faltante) antes de exportar la captura.');
      return;
    }
    setExportModalOpen(true);
  };

  // Trigger export counter increment (document BAmrUK0Bk8D9FTjWkCYZ, field exportaciones)
  const handleRecordExport = () => {
    trackExport().then(newCount => {
      if (newCount !== null) setTotalExports(newCount);
    });
  };

  // Statistics calculation for active spirits
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
    <div className="min-h-screen bg-[#0a0b12] text-slate-100 selection:bg-emerald-400 selection:text-slate-950 max-w-full overflow-x-hidden">
      
      {/* Streamlined HUD Header */}
      <MinimalHeader 
        onDownloadCapture={handleOpenExportModal}
        totalObtained={activeStats.obtained}
        totalSpirits={activeSpirits.length}
        totalVisits={totalVisits}
        totalExports={totalExports}
        onOpenWelcome={() => setWelcomeOpen(true)}
        onStartTour={handleStartTour}
      />

      <main className="pb-12 max-w-7xl mx-auto px-2.5 sm:px-6 w-full overflow-x-hidden">
        <MinimalSpriteGrid 
          spirits={activeSpirits}
          userState={userState}
          onToggleSpirit={handleToggleSpirit}
          onBatchUpdate={handleBatchUpdate}
          activeGen={2}
          onResetGen={handleResetGen}
          onOpenExportModal={handleOpenExportModal}
        />
      </main>

      {/* Minimal Footer with direct link to Portfolio (https://erazoportafolio.vercel.app/) */}
      <footer className="border-t border-white/5 bg-[#08090f]/90 py-6 text-center text-xs text-slate-500 font-mono flex items-center justify-center gap-1.5 flex-wrap px-4 w-full">
        <span>EL CASILLERO · Creado por</span>
        <a
          href="https://erazoportafolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 hover:text-emerald-300 font-bold underline decoration-emerald-400/40 underline-offset-4 flex items-center gap-1 transition"
          title="Ver Portafolio de Andrés Erazo"
        >
          <PortfolioIcon className="w-3.5 h-3.5" />
          <span>Andrés Erazo (@erazoandres)</span>
        </a>
      </footer>

      {/* Floating Chill Audio Music Player (Triggers hint after Welcome Modal closes) */}
      <AudioPlayer triggerHint={!welcomeOpen} />

      {/* First-Time Welcome Portal Modal */}
      {welcomeOpen && (
        <WelcomeModal 
          onClose={() => setWelcomeOpen(false)} 
          onStartTour={handleStartTour}
        />
      )}

      {/* Post-Tutorial Interactive Demo Prompt Modal */}
      {demoPromptOpen && (
        <DemoPromptModal 
          onAccept={handleAcceptDemo}
          onClose={() => setDemoPromptOpen(false)}
        />
      )}

      {/* Export Canvas Capture Modal */}
      {exportModalOpen && (
        <ExportModal 
          spirits={activeSpirits}
          userState={userState}
          activeGen={2}
          totalVisits={totalVisits}
          totalExports={totalExports}
          onRecordExport={handleRecordExport}
          onClose={() => setExportModalOpen(false)}
          onShowToast={showToast}
        />
      )}

      {/* Toast Feedback */}
      <Toast message={toastMessage} />

    </div>
  );
}
