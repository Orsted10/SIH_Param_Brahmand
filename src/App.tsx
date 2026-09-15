import React, { useState } from 'react';
import { NavigationTab, IndianLanguage, CrisisCaseStudy } from './types';
import { Navbar } from './components/Navbar';
import { HeroCinematic } from './components/HeroCinematic';
import { MissionControl } from './components/MissionControl';
import { CrisesShowcase } from './components/CrisesShowcase';
import { PhysicsLabViewer } from './components/PhysicsLabViewer';
import { ExecutionTraceViewer } from './components/ExecutionTraceViewer';
import { DharmaGateViewer } from './components/DharmaGateViewer';
import { NDMASopViewer } from './components/NDMASopViewer';
import { ApiKeyModal } from './components/ApiKeyModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('hero');
  const [selectedLanguage, setSelectedLanguage] = useState<IndianLanguage>('en');
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-space-950 text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Floating Liquid Glass Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
      />

      {/* Main Tab Render Engine */}
      <main>
        {activeTab === 'hero' && (
          <HeroCinematic onNavigate={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'mission-control' && (
          <MissionControl 
            selectedLanguage={selectedLanguage}
            onNavigateToSop={() => setActiveTab('ndma-sop')}
          />
        )}

        {activeTab === 'crises' && (
          <CrisesShowcase 
            onSelectCrisis={() => {}}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'physics-lab' && (
          <PhysicsLabViewer />
        )}

        {activeTab === 'execution-trace' && (
          <ExecutionTraceViewer />
        )}

        {activeTab === 'dharma-gate' && (
          <DharmaGateViewer />
        )}

        {activeTab === 'ndma-sop' && (
          <NDMASopViewer />
        )}
      </main>

      {/* Multi-Column Liquid Glass Footer (Prompt 2 Style) */}
      <footer className="relative z-20 border-t border-white/10 bg-space-950/90 backdrop-blur-2xl px-6 md:px-12 lg:px-16 pt-16 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌌</span>
              <span className="font-bold text-xl text-white tracking-wider">PARAM-BRAHMAND</span>
            </div>
            <p className="text-xs text-gray-400 font-serif italic max-w-sm">
              "विश्वं पश्यति चक्षुषा विज्ञानेन च युज्यते" — Perceiving the Cosmos through Physics, Illuminating Bharat through Intelligence.
            </p>
            <span className="text-[10px] font-mono text-cyan-400">
              ISRO Space Applications Centre (SAC), Ahmedabad | PS 26167
            </span>
          </div>

          {/* Column 2: Satellites */}
          <div>
            <h5 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Space Payloads</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>Cartosat-3 (0.28m)</li>
              <li>RISAT-1A (EOS-04 SAR)</li>
              <li>NISAR (Dual L+S Band)</li>
              <li>TRISHNA Thermal Infrared</li>
              <li>HysIS Hyperspectral</li>
            </ul>
          </div>

          {/* Column 3: 9 Navagraha */}
          <div>
            <h5 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Navagraha AI</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>Bhoomi-Optical</li>
              <li>Kaal-Radar</li>
              <li>Surya-Caption</li>
              <li>Sparsh-Grounding</li>
              <li>Vivek-Causal</li>
            </ul>
          </div>

          {/* Column 4: Physics & SCM */}
          <div className="col-span-2">
            <h5 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Physics & Compliance</h5>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Compliant with 100% NDMA Disaster Reporting Guidelines, Pearl Causal SCM do-calculus, and ISRO SAC PS 26167 Section 4 Auditable Execution Traces.
            </p>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveTab('mission-control')}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-colors"
              >
                Launch Mission Control
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <span>Smart India Hackathon 2026 | Team TensorTitans</span>
          <span>Sovereign Earth Intelligence Platform | 100% Free Stack Powered</span>
        </div>
      </footer>

      {/* Groq API Key Config Modal */}
      <ApiKeyModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
      />

    </div>
  );
};

export default App;
