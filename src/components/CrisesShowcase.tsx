import React, { useState } from 'react';
import { CRISES_DATASETS } from '../data/crisesData';
import { CrisisCaseStudy, NavigationTab } from '../types';
import { ShieldAlert, Layers, Radio, Cpu, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

interface CrisesShowcaseProps {
  onSelectCrisis: (crisis: CrisisCaseStudy) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const CrisesShowcase: React.FC<CrisesShowcaseProps> = ({ onSelectCrisis, onNavigate }) => {
  const [selectedCrisis, setSelectedCrisis] = useState<CrisisCaseStudy>(CRISES_DATASETS[0]);

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-12 bg-space-950">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>The 10 Real-World Operational Crises Across India</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Where Standard AI Fails & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">PARAM-BRAHMAND Wins</span>
        </h2>
        <p className="text-sm md:text-base text-gray-300">
          Click any crisis scenario below to examine why generic commercial chatbots (YOLO, GPT-4, standard ViT) fail catastrophically and how our 128-D physics manifold solves it.
        </p>
      </div>

      {/* Grid: Left Scenarios List + Right Deep-Dive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
        
        {/* Left Column: 10 Scenarios Selector (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3 max-h-[700px] overflow-y-auto scrollbar-hide pr-1">
          {CRISES_DATASETS.map((crisis, index) => {
            const isSelected = selectedCrisis.id === crisis.id;
            return (
              <div
                key={crisis.id}
                onClick={() => setSelectedCrisis(crisis)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'liquid-glass-strong border-cyan-400/80 shadow-2xl scale-[1.01]'
                    : 'liquid-glass border-white/10 hover:border-white/20 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    CRISIS #{index + 1}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">{crisis.state}</span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1">{crisis.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-2">{crisis.crisisType}</p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Scenario Breakdown (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="liquid-glass-strong rounded-3xl p-6 border border-cyan-500/30 shadow-2xl flex flex-col gap-6">
            
            {/* Title & Region */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  {selectedCrisis.region}, {selectedCrisis.state}
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedCrisis.title}</h3>
              </div>
              <button
                onClick={() => {
                  onSelectCrisis(selectedCrisis);
                  onNavigate('mission-control');
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs hover:scale-105 transition-all shadow-lg flex items-center gap-2 self-start md:self-auto"
              >
                <span>Launch Scenario</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Side-by-Side Satellite Imagery Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10">
                <img src={selectedCrisis.opticalImageUrl} alt="Optical" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-space-950/80 text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                  Cartosat / Sentinel Optical
                </div>
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden border border-amber-500/30">
                <img src={selectedCrisis.radarOrSecondaryImageUrl} alt="Radar SAR" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-space-950/80 text-[10px] font-mono text-amber-300 border border-amber-500/40">
                  RISAT / NISAR Radar SAR
                </div>
              </div>
            </div>

            {/* Problem vs Solution Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Why Standard AI Fails */}
              <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-red-400 font-bold text-xs mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Why Standard AI Fails Today</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {selectedCrisis.whyStandardAiFails}
                </p>
              </div>

              {/* How Param Brahmand Fixes It */}
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The PARAM-BRAHMAND Solution</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {selectedCrisis.paramBrahmandSolution}
                </p>
              </div>

            </div>

            {/* Assigned Navagraha Engine Badge */}
            <div className="bg-space-950/80 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-mono block">ASSIGNED SPECIALIST ENGINE</span>
                  <span className="font-bold text-sm text-white">{selectedCrisis.assignedEngineId.toUpperCase()}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-gray-400 font-mono block">MODALITIES USED</span>
                <span className="text-xs text-cyan-300 font-semibold">{selectedCrisis.satelliteModalities.join(', ')}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
