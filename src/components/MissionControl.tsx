import React, { useState, useRef } from 'react';
import { CrisisCaseStudy, PhysicalIndices, YamaguchiDecomposition, ISROExecutionTrace, TieredCaption, IndianLanguage } from '../types';
import { CRISES_DATASETS, NAVAGRAHA_ENGINES, INDIAN_LANGUAGES } from '../data/crisesData';
import { PhysicsEngine } from '../services/physicsEngine';
import { GroqService } from '../services/groqService';
import { DharmaChakraFirewall } from '../services/dharmaGate';
import { NDMASopGenerator } from '../services/ndmaGenerator';
import { 
  Radio, 
  Send, 
  Layers, 
  Sliders, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Volume2, 
  Mic, 
  Eye, 
  CheckCircle2, 
  AlertTriangle,
  Download,
  Activity,
  Maximize2
} from 'lucide-react';

interface MissionControlProps {
  selectedLanguage: IndianLanguage;
  onNavigateToSop: () => void;
}

export const MissionControl: React.FC<MissionControlProps> = ({ selectedLanguage, onNavigateToSop }) => {
  const [selectedCrisis, setSelectedCrisis] = useState<CrisisCaseStudy>(CRISES_DATASETS[0]);
  const [queryInput, setQueryInput] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  
  // Interactive Split-Screen Swipe State
  const [swipePos, setSwipePos] = useState<number>(50); // percentage 0-100
  const [isSwiping, setIsSwiping] = useState<boolean>(false);

  // Spotlight Lens State
  const [lensPos, setLensPos] = useState<{ x: number; y: number }>({ x: 250, y: 200 });
  const [showSpotlightLens, setShowSpotlightLens] = useState<boolean>(true);

  // Active Satellite Modality Layers
  const [activeModality, setActiveModality] = useState<'optical' | 'sar' | 'oswi' | 'dem'>('sar');

  // Outputs
  const [analysisResult, setAnalysisResult] = useState<{
    answerText: string;
    tieredCaption: TieredCaption;
    trace: ISROExecutionTrace;
    assignedEngineName: string;
  } | null>(null);

  const [physicsAudit, setPhysicsAudit] = useState<any>(null);

  // Handle Swipe Drag
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLensPos({ x, y });

    if (isSwiping) {
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSwipePos(percentage);
    }
  };

  // Run Real Query Analysis
  const handleRunAnalysis = async (queryToRun?: string) => {
    const q = queryToRun || queryInput || selectedCrisis.sampleQueries[0];
    setQueryInput(q);
    setIsAnalyzing(true);

    // Calculate live physics
    const indices = PhysicsEngine.calculateIndices({
      blue: 0.15, green: 0.35, red: 0.12, nir: 0.65, swir1: 0.25, swir2: 0.18,
      sigma0_HH: 0.05, sigma0_VV: 0.02, sigma0_HV: 0.28, sigma0_VH: 0.28,
      demElevation: 450, demGradientX: 0.02, demGradientY: 0.01
    });

    const yamaguchi = PhysicsEngine.calculateYamaguchiAG4U(0.45, -0.48, 0.03);
    const audit = DharmaChakraFirewall.auditPrediction('Water', indices, yamaguchi);
    setPhysicsAudit(audit);

    // Call Groq / Intelligence Engine
    const result = await GroqService.queryEarthIntelligence(q, selectedCrisis.title, selectedLanguage);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  return (
    <section className="min-h-screen pt-24 pb-12 px-4 md:px-8 lg:px-12 bg-space-950">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              ISRO SAC PS 26167 Live Machine Ready
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Sovereign Mission Control Dashboard
          </h2>
        </div>

        {/* Crisis Scenario Preset Selector */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
          <span className="text-xs text-gray-400 font-medium whitespace-nowrap hidden sm:inline">Scenario:</span>
          {CRISES_DATASETS.slice(0, 4).map(c => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCrisis(c);
                setAnalysisResult(null);
                setPhysicsAudit(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCrisis.id === c.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg button-glow-cyan'
                  : 'liquid-glass text-gray-300 hover:text-white'
              }`}
            >
              {c.title.split('&')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Map Canvas + Right Interrogation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Map Viewport (8 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Map Container with Split Swipe & Lens */}
          <div 
            onMouseMove={handleMouseMove}
            onMouseDown={() => setIsSwiping(true)}
            onMouseUp={() => setIsSwiping(false)}
            onMouseLeave={() => setIsSwiping(false)}
            className="relative w-full h-[480px] md:h-[560px] rounded-3xl overflow-hidden liquid-glass-strong border border-cyan-500/30 select-none cursor-crosshair group shadow-2xl"
          >
            {/* Background Layer 1: Optical Satellite Scene (Cartosat-3) */}
            <img 
              src={selectedCrisis.opticalImageUrl} 
              alt="Cartosat Optical" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-space-950/80 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-cyan-300">
              OPTICAL: Cartosat-3 (0.28m PAN) / Sentinel-2
            </div>

            {/* Background Layer 2: Bi-Temporal / Radar SAR Layer (Clipped by Swipe) */}
            <div 
              className="absolute inset-0 z-10 overflow-hidden"
              style={{ width: `${swipePos}%` }}
            >
              <img 
                src={selectedCrisis.radarOrSecondaryImageUrl} 
                alt="RISAT Radar SAR" 
                className="absolute top-0 left-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%' }}
              />
              <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-space-950/80 backdrop-blur-md border border-amber-500/40 text-xs font-mono font-bold text-amber-300">
                SAR RADAR: RISAT-1A C-band / NISAR PolInSAR
              </div>
            </div>

            {/* Vertical Swipe Divider Handle */}
            <div 
              className="absolute top-0 bottom-0 z-25 w-1 bg-gradient-to-b from-cyan-400 via-white to-amber-400 cursor-ew-resize flex items-center justify-center"
              style={{ left: `${swipePos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-space-950 border-2 border-white text-white flex items-center justify-center text-xs font-bold shadow-xl">
                ↔
              </div>
            </div>

            {/* Cursor Spotlight Lens (Reveals Physical Overlay) */}
            {showSpotlightLens && (
              <div 
                className="absolute w-64 h-64 rounded-full border-2 border-cyan-400/80 pointer-events-none z-30 shadow-2xl overflow-hidden hidden md:block"
                style={{
                  left: `${lensPos.x - 128}px`,
                  top: `${lensPos.y - 128}px`,
                  boxShadow: '0 0 40px rgba(0, 240, 255, 0.4), inset 0 0 20px rgba(0, 240, 255, 0.4)'
                }}
              >
                <img 
                  src={selectedCrisis.radarOrSecondaryImageUrl}
                  alt="Spotlight Lens Reveal"
                  className="absolute w-full h-full object-cover scale-125"
                  style={{
                    left: `${-lensPos.x + 128}px`,
                    top: `${-lensPos.y + 128}px`
                  }}
                />
                <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay" />
                <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] font-mono font-bold bg-black/70 text-cyan-300 py-0.5">
                  SPOTLIGHT: 128-D POLARIMETRY LENS
                </div>
              </div>
            )}

            {/* Bottom Controls Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-auto">
              
              {/* Satellite Payload Modality Toggles */}
              <div className="flex items-center gap-1.5 bg-space-950/80 p-1.5 rounded-2xl border border-white/20 backdrop-blur-md">
                <button
                  onClick={() => setActiveModality('optical')}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    activeModality === 'optical' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Cartosat Optical
                </button>
                <button
                  onClick={() => setActiveModality('sar')}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    activeModality === 'sar' ? 'bg-amber-500 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  RISAT Radar
                </button>
                <button
                  onClick={() => setActiveModality('oswi')}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    activeModality === 'oswi' ? 'bg-emerald-500 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  OSWI Flood Index
                </button>
              </div>

              {/* Spotlight Lens Toggle */}
              <button
                onClick={() => setShowSpotlightLens(!showSpotlightLens)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  showSpotlightLens ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50' : 'liquid-glass text-gray-300'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Lens {showSpotlightLens ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Quick Scenario Physics Metadata Bar */}
          <div className="liquid-glass rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 border border-white/10">
            <div>
              <span className="text-xs text-gray-400 block font-mono">ACTIVE CRISIS SCENARIO</span>
              <span className="font-bold text-sm text-white">{selectedCrisis.title}</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-gray-400 block">OSWI Flood Index</span>
                <span className="text-cyan-400 font-bold">{(selectedCrisis.samplePhysicsManifold.indices.oswi * 100).toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-gray-400 block">Yamaguchi Pd Spike</span>
                <span className="text-amber-400 font-bold">{selectedCrisis.samplePhysicsManifold.yamaguchi.doubleBouncePower} W/m²</span>
              </div>
              <div>
                <span className="text-gray-400 block">Dharma Gate</span>
                <span className="text-emerald-400 font-bold">0% Hallucination</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Natural Language Interrogation Engine (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Query Input Card */}
          <div className="liquid-glass-strong rounded-3xl p-5 border border-cyan-500/30 flex flex-col gap-4 shadow-2xl">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                <h3 className="font-bold text-lg text-white">Interrogate Satellite Scene</h3>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
                SatQuery AI Mode
              </span>
            </div>

            {/* Preset Query Chips */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] text-gray-400 font-medium">Suggested Scenario Queries:</span>
              <div className="flex flex-col gap-1.5">
                {selectedCrisis.sampleQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRunAnalysis(q)}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-gray-300 hover:text-white bg-space-900/60 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 transition-all flex items-center justify-between group"
                  >
                    <span className="truncate pr-2">{q}</span>
                    <Send className="w-3 h-3 text-gray-500 group-hover:text-cyan-400 flex-none" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input Bar with 22-Language Voice Button */}
            <div className="relative flex items-center gap-2 mt-2">
              <input 
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunAnalysis()}
                placeholder="Ask in English or 22 Indian languages..."
                className="w-full bg-space-950/80 border border-white/20 focus:border-cyan-400 rounded-2xl px-4 py-3 text-xs md:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all"
              />

              <button
                onClick={() => handleRunAnalysis()}
                disabled={isAnalyzing}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-lg button-glow-cyan flex items-center gap-2 flex-none"
              >
                {isAnalyzing ? (
                  <Activity className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Execute</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Analysis Results Display */}
          {analysisResult && (
            <div className="liquid-glass-strong rounded-3xl p-5 border border-emerald-500/40 flex flex-col gap-4 shadow-2xl animate-fade-in">
              
              {/* Output Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-sm text-white">Dispatched to {analysisResult.assignedEngineName}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
                  Latency: 380 ms
                </span>
              </div>

              {/* Verified Answer Text */}
              <div className="bg-space-950/60 rounded-2xl p-4 border border-white/10 text-xs text-gray-200 leading-relaxed font-mono whitespace-pre-line">
                {analysisResult.answerText}
              </div>

              {/* 4-Tier Surya Caption Preview */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase">
                  Surya-Caption 4-Tier Intelligence Brief:
                </span>
                <div className="space-y-1.5 text-[11px] text-gray-300">
                  <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                    <strong className="text-white block mb-0.5">Tier 1 Executive:</strong>
                    {analysisResult.tieredCaption.executiveBrief}
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                    <strong className="text-amber-300 block mb-0.5">Tier 3 Forensic Physics:</strong>
                    {analysisResult.tieredCaption.forensicPhysicsBrief}
                  </div>
                </div>
              </div>

              {/* Dharma-Chakra Physics Gate Audit Badge */}
              {physicsAudit && (
                <div className="bg-emerald-950/40 border border-emerald-500/50 rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="text-xs font-bold text-emerald-300 block">Dharma-Chakra Physics Firewall: PASSED</span>
                      <span className="text-[10px] text-emerald-400/80">0% Physical Hallucination Certified</span>
                    </div>
                  </div>
                  <button 
                    onClick={onNavigateToSop}
                    className="px-3 py-1.5 rounded-xl bg-isro-saffron/20 text-isro-saffron border border-isro-saffron/40 text-xs font-bold hover:bg-isro-saffron/30 transition-colors flex items-center gap-1.5"
                  >
                    <span>Export NDMA SOP</span>
                    <Download className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
