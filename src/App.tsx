import React, { useState } from 'react';
import { NavigationTab, IndianLanguage } from './types';
import { Navbar } from './components/nav/Navbar';
import { Hero } from './components/Hero';
import { StorySections } from './components/story/StorySections';
import { MissionControl } from './components/MissionControl';
import { CrisesShowcase } from './components/CrisesShowcase';
import { PhysicsLabViewer } from './components/PhysicsLabViewer';
import { ExecutionTraceViewer } from './components/ExecutionTraceViewer';
import { DharmaGateViewer } from './components/DharmaGateViewer';
import { NDMASopViewer } from './components/NDMASopViewer';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Radio } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('hero');
  const [selectedLanguage, setSelectedLanguage] = useState<IndianLanguage>('en');
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState<boolean>(false);

  const navigate = (tab: NavigationTab) => setActiveTab(tab);

  return (
    <div
      className="min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-200"
      style={{ background: '#03060d', fontFamily: "'Hanken Grotesk', 'Inter', system-ui, sans-serif" }}
    >
      {/* ── Premium Glass Navbar ── */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
      />

      {/* ── Main Content ── */}
      <main>

        {/* HERO — always rendered when on 'hero' tab */}
        {activeTab === 'hero' && (
          <>
            <Hero onNavigate={navigate} />
            <StorySections onNavigate={navigate} />
          </>
        )}

        {activeTab === 'mission-control' && (
          <div className="pt-20 md:pt-24">
            <MissionControl
              selectedLanguage={selectedLanguage}
              onNavigateToSop={() => setActiveTab('ndma-sop')}
            />
          </div>
        )}

        {activeTab === 'crises' && (
          <div className="pt-20 md:pt-24">
            <CrisesShowcase
              onSelectCrisis={() => {}}
              onNavigate={navigate}
            />
          </div>
        )}

        {activeTab === 'physics-lab' && (
          <div className="pt-20 md:pt-24">
            <PhysicsLabViewer />
          </div>
        )}

        {activeTab === 'execution-trace' && (
          <div className="pt-20 md:pt-24">
            <ExecutionTraceViewer />
          </div>
        )}

        {activeTab === 'dharma-gate' && (
          <div className="pt-20 md:pt-24">
            <DharmaGateViewer />
          </div>
        )}

        {activeTab === 'ndma-sop' && (
          <div className="pt-20 md:pt-24">
            <NDMASopViewer />
          </div>
        )}

      </main>

      {/* ── Footer ── */}
      {activeTab === 'hero' && (
        <footer
          className="relative z-20 px-6 md:px-12 lg:px-16 pt-16 pb-12"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: '#020509',
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-12">

              {/* Brand */}
              <div className="col-span-2 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                    <Radio className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-cinzel font-bold text-white text-lg tracking-wide">
                    PARAM-BRAHMAND
                  </span>
                </div>
                <p className="font-mono text-[11px] text-white/25 leading-relaxed max-w-xs tracking-wide">
                  "विश्वं पश्यति चक्षुषा विज्ञानेन च युज्यते"
                </p>
                <p className="font-mono text-[10px] text-cyan-400/50 tracking-widest uppercase">
                  ISRO SAC · PS 26167 · Team Tensor Titans
                </p>
              </div>

              {/* Satellites */}
              <div>
                <h5 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30 mb-4">
                  Space Payloads
                </h5>
                <ul className="space-y-2.5">
                  {['Cartosat-3 (0.28m)', 'RISAT-1A (EOS-04 SAR)', 'NISAR (L+S Band)', 'TRISHNA Thermal', 'HysIS Hyperspectral'].map(s => (
                    <li key={s} className="text-[11px] text-white/25 font-mono hover:text-white/50 transition-colors cursor-default">{s}</li>
                  ))}
                </ul>
              </div>

              {/* AI engines */}
              <div>
                <h5 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30 mb-4">
                  Navagraha AI
                </h5>
                <ul className="space-y-2.5">
                  {['Bhoomi-Optical', 'Kaal-Radar', 'Surya-Caption', 'Vivek-Causal', 'Geo-Mamba 3.0'].map(s => (
                    <li key={s} className="text-[11px] text-white/25 font-mono hover:text-white/50 transition-colors cursor-default">{s}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Bottom bar */}
            <div
              className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
                Smart India Hackathon 2026 · Team TensorTitans
              </span>
              <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
                Sovereign Earth Intelligence · 100% Free Stack
              </span>
            </div>
          </div>
        </footer>
      )}

      {/* ── Groq API Key Modal ── */}
      <ApiKeyModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
      />
    </div>
  );
};

export default App;
