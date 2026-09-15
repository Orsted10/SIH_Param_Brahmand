import React, { useState, useRef } from 'react';
import { NavigationTab } from '../types';
import { NAVAGRAHA_ENGINES } from '../data/crisesData';
import { 
  ShieldCheck, 
  Cpu, 
  Radio, 
  Layers, 
  Sparkles, 
  ChevronDown, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Globe, 
  FileText,
  Clock,
  Activity,
  Zap,
  Award
} from 'lucide-react';

interface HeroProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const HeroCinematic: React.FC<HeroProps> = ({ onNavigate }) => {
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Cursor tracking for spotlight reveal
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const bottlenecks = [
    {
      id: 1,
      title: '"RGB-Only" Physics Blindness',
      statusQuo: 'Treats satellite scenes like 3-color smartphone photos, discarding 85% of radar polarimetry & multispectral data.',
      solution: 'Layer 1 Prakriti-Veda ingests 128-D physics manifold (Yamaguchi AG4U + RVoG PolInSAR + MESMA) directly into neural layers.',
      badge: '128-D Manifold'
    },
    {
      id: 2,
      title: 'O(N²) Attention Memory Crash',
      statusQuo: 'Standard Vision Transformers explode in quadratic O(N²) memory (34 GB VRAM crash on 4096x4096 tiles).',
      solution: 'Geo-Mamba 3.0 16-directional Hamiltonian scanning runs in strictly linear O(L) time (1.2 GB VRAM at 45 FPS).',
      badge: 'Linear O(L)'
    },
    {
      id: 3,
      title: 'Monsoon Cloud & Canopy Blindness',
      statusQuo: 'Optical space cameras are 100% blinded by storm clouds; flood water under tree cover is completely unseen.',
      solution: 'Kaal-Radar applies RISAT-1A C/L-band radar polarimetry (RVoG) to penetrate clouds and tree canopies in 380 ms.',
      badge: 'All-Weather SAR'
    },
    {
      id: 4,
      title: 'Pseudo-Change False Alarms',
      statusQuo: 'Pixel differencing confuses natural seasonal monsoon greening or wheat harvesting with real human deforestation.',
      solution: 'Vivek-Causal uses Judea Pearl SCM do-calculus DAGs to isolate true human excavator actions (p > 0.99), suppressing 94.8% false alarms.',
      badge: 'Pearl do-calculus'
    }
  ];

  const layerStack = [
    { name: 'Layer 7: Bhasha-Brahmand Sovereign VIVA', desc: 'Voice-In/Voice-Out interface in 22 scheduled Indian languages preserving agricultural terms (Kharif, Rabi, Taluk, Nullah).' },
    { name: 'Layer 6: Dharma-Chakra Hard Physics Firewall', desc: 'Deterministic physics gatekeeper enforcing Stokes energy, DEM slope limits (<=5° for water), and SAR-optical specular consistency.' },
    { name: 'Layer 5: GeoCP-v2 Spatial Conformal Calibration', desc: 'Solves spatial autocorrelation using Moran\'s I kernels, guaranteeing >= 95% real-world ground truth coverage with ECE = 2.4%.' },
    { name: 'Layer 4: Navagraha Specialist AI Ensemble', desc: '9 dedicated domain AI agents (Bhoomi-Optical, Kaal-Radar, Surya-Caption, Sparsh-Grounding, etc.) preventing single-model bottlenecking.' },
    { name: 'Layer 3: Sankalpa-Param Dynamic MCTS Router', desc: 'LangGraph state machine + MCTS planner emitting standardized, auditable JSON execution traces conforming to ISRO PS 26167.' },
    { name: 'Layer 2: Geo-Mamba 3.0 Linear Backbone', desc: '16-Directional Hamiltonian continuous state-space model executing massive 4K tiles in 380 ms using 1.2 GB VRAM with SIRTI scale tokens.' },
    { name: 'Layer 1: Prakriti-Veda 128-D Physics Manifold', desc: 'Ingests Yamaguchi AG4U 4-component radar powers, PolInSAR RVoG 3D tree height, MESMA unmixing, and 16 invariant color/wave indices.' }
  ];

  return (
    <div className="relative w-full bg-space-950 overflow-hidden">
      
      {/* ========================================================================= */}
      {/* PROLOGUE: CINEMATIC SPACE HERO SECTION */}
      {/* ========================================================================= */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-screen flex flex-col justify-between pt-28 pb-16 px-4 md:px-12 lg:px-16 border-b border-white/10"
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 scale-105"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
        />

        {/* Cursor Spotlight Lens Mask (Prompt 3 Lithos Mechanics) */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none opacity-85 hidden md:block"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1600&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitMaskImage: `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 80%)`,
            maskImage: `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 80%)`
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-space-950/90 via-space-950/40 to-space-950 z-15 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-6xl mx-auto text-center flex flex-col items-center justify-center flex-1 my-auto">
          
          {/* Top Sovereign Badge */}
          <div className="story-badge border border-cyan-500/50 bg-space-900/80 backdrop-blur-md animate-pulse">
            <Sparkles className="w-4 h-4 text-isro-saffron" />
            <span>ISRO SAC PROBLEM STATEMENT ID: 26167</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>TEAM TENSORTITANS</span>
          </div>

          {/* Regal Sanskrit Motto */}
          <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl text-isro-saffron tracking-wider font-bold mb-3 text-glow-gold">
            "विश्वं पश्यति चक्षुषा विज्ञानेन च युज्यते"
          </h3>

          {/* Main Title */}
          <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter leading-none mb-4">
            PARAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 text-glow-cyan">BRAHMAND</span>
          </h1>

          {/* Platform Slogan */}
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-gray-200 max-w-3xl mb-4 font-normal">
            "Not Just Seeing Satellites — Understanding the Earth's Living Physics."
          </p>

          <p className="font-grotesk text-sm md:text-base text-gray-300 max-w-2xl leading-relaxed mb-8">
            The sovereign multimodal vision-language intelligence platform fusing 128-D physics wave mechanics (PolSAR/PolInSAR), linear state-space deep learning (Geo-Mamba 3.0), and 0% physical hallucination firewalls.
          </p>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              onClick={() => onNavigate('mission-control')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-400 text-white font-bold text-sm tracking-wider uppercase shadow-2xl button-glow-cyan hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              <Radio className="w-5 h-5 text-cyan-200 animate-spin-slow" />
              <span>Launch Mission Control</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#act-1"
              className="px-8 py-4 rounded-full liquid-glass-strong border border-amber-500/40 text-amber-200 font-bold text-sm tracking-wider uppercase hover:bg-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              <FileText className="w-5 h-5 text-amber-400" />
              <span>Begin Story Walkthrough</span>
            </a>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl w-full">
            <div className="liquid-glass rounded-xl p-3 text-center border border-white/10 hover:border-cyan-400/50 transition-colors">
              <span className="text-xs text-gray-400 block mb-0.5">Computational Speed</span>
              <span className="font-bold text-sm text-cyan-300 font-mono">380 ms @ 45 FPS</span>
            </div>
            <div className="liquid-glass rounded-xl p-3 text-center border border-white/10 hover:border-amber-400/50 transition-colors">
              <span className="text-xs text-gray-400 block mb-0.5">SAR Cloud Penetration</span>
              <span className="font-bold text-sm text-amber-300 font-mono">97.2% Precision</span>
            </div>
            <div className="liquid-glass rounded-xl p-3 text-center border border-white/10 hover:border-emerald-400/50 transition-colors">
              <span className="text-xs text-gray-400 block mb-0.5">VQA Accuracy (Cartosat-3)</span>
              <span className="font-bold text-sm text-emerald-300 font-mono">93.8% (via SIRTI)</span>
            </div>
            <div className="liquid-glass rounded-xl p-3 text-center border border-white/10 hover:border-purple-400/50 transition-colors">
              <span className="text-xs text-gray-400 block mb-0.5">Physical Hallucination</span>
              <span className="font-bold text-sm text-purple-300 font-mono">0.00% Certified</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-20 text-center flex flex-col items-center">
          <a href="#act-1" className="text-gray-400 hover:text-cyan-300 text-xs flex flex-col items-center gap-1 transition-colors group">
            <span>Scroll Down to Read the Story</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </a>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* ACT I: THE SOVEREIGN MANDATE (ISRO SAC PS 26167) */}
      {/* ========================================================================= */}
      <section id="act-1" className="py-20 px-4 md:px-12 lg:px-16 max-w-7xl mx-auto border-b border-white/10">
        <div className="story-badge">
          <Award className="w-4 h-4 text-isro-saffron" />
          <span>ACT I: THE SOVEREIGN MANDATE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              ISRO SAC Problem Statement 26167: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-isro-saffron">SatQuery AI</span>
            </h2>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              The Indian Space Research Organisation (ISRO) Space Applications Centre (SAC), Ahmedabad, mandated an interactive software platform enabling space scientists, NDMA disaster response commanders, forest rangers, and rural citizens to upload complex satellite imagery and interrogate it using natural human language.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="liquid-glass p-4 rounded-2xl border border-cyan-500/30">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase block mb-1">Scope 1: Single Image VQA</span>
                <p className="text-xs text-gray-300">Single Optical or SAR scene for Visual Question Answering, 4-Tier Captioning, and Sub-pixel Grounding.</p>
              </div>
              <div className="liquid-glass p-4 rounded-2xl border border-amber-500/30">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase block mb-1">Scope 2: Bi-Temporal Pair</span>
                <p className="text-xs text-gray-300">Two spatially aligned images taken at different dates (T1 and T2) for change detection & change masks.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="liquid-glass-strong rounded-3xl p-6 border border-cyan-500/40 shadow-2xl flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h4 className="font-bold text-white text-base">Mandatory SIH 2026 Pillars</h4>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-none mt-0.5" />
                  <div>
                    <strong className="text-white">Pillar 1: Remote Sensing Adaptation:</strong> Model fine-tuned on remote sensing datasets (BigEarthNet.txt).
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-none mt-0.5" />
                  <div>
                    <strong className="text-white">Pillar 2: Single-Image Baseline:</strong> Mandatory VQA + 4-tier captioning.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-none mt-0.5" />
                  <div>
                    <strong className="text-white">Pillar 3: Bi-Temporal Change Analysis:</strong> High-resolution spatial change masks.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-none mt-0.5" />
                  <div>
                    <strong className="text-white">Pillar 5: Auditable Execution Trace:</strong> Standardized JSON trace for every decision.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* ACT II: WHY STANDARD AI FAILS IN SPACE */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 md:px-12 lg:px-16 max-w-7xl mx-auto border-b border-white/10">
        <div className="story-badge">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>ACT II: THE 8 BOTTLENECKS & THE BREAKTHROUGH</span>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Why Standard AI Fails in Space & How <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">PARAM-BRAHMAND Solves It</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bottlenecks.map(b => (
            <div key={b.id} className="liquid-glass-strong rounded-3xl p-6 border border-white/10 flex flex-col justify-between gap-4 shadow-xl group hover:border-cyan-400/50 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                  <h4 className="font-bold text-base text-white">{b.title}</h4>
                  <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-500/20 px-2.5 py-1 rounded-full border border-cyan-500/40">
                    {b.badge}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-red-950/20 border border-red-500/30 p-3 rounded-2xl">
                    <strong className="text-red-400 block mb-1">✘ What Fails Today (Status Quo):</strong>
                    <span className="text-gray-300">{b.statusQuo}</span>
                  </div>

                  <div className="bg-emerald-950/20 border border-emerald-500/30 p-3 rounded-2xl">
                    <strong className="text-emerald-400 block mb-1">✔ PARAM-BRAHMAND Breakthrough:</strong>
                    <span className="text-gray-300">{b.solution}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ========================================================================= */}
      {/* ACT III: THE 7-LAYER INTEGRATED STACK */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 md:px-12 lg:px-16 max-w-7xl mx-auto border-b border-white/10">
        <div className="story-badge">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>ACT III: THE 7-LAYER SYSTEM ARCHITECTURE</span>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            The 7-Layer Integrated Earth Intelligence Operating System
          </h2>
          <p className="text-sm md:text-base text-gray-300">
            Click any layer below to inspect its operational mechanics and scientific algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Interactive Stack Selector (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-2.5">
            {layerStack.map((layer, idx) => {
              const isSelected = activeLayerIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveLayerIndex(idx)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'liquid-glass-strong border-cyan-400/80 shadow-2xl scale-[1.02]'
                      : 'liquid-glass border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{layer.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-cyan-400' : 'text-gray-500'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Layer Details Card (6 Cols) */}
          <div className="lg:col-span-6">
            <div className="liquid-glass-strong rounded-3xl p-6 border border-cyan-500/40 shadow-2xl flex flex-col gap-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                LAYER {7 - activeLayerIndex} OPERATIONAL DETAIL
              </span>
              <h3 className="text-2xl font-bold text-white">
                {layerStack[activeLayerIndex].name}
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed bg-space-950/80 p-4 rounded-2xl border border-white/10 font-mono">
                {layerStack[activeLayerIndex].desc}
              </p>
              <button
                onClick={() => onNavigate('physics-lab')}
                className="px-5 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all flex items-center gap-2 self-start"
              >
                <span>Inspect in 128-D Physics Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* ACT IV: THE 9 NAVAGRAHA ENGINES */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 md:px-12 lg:px-16 max-w-7xl mx-auto border-b border-white/10">
        <div className="story-badge">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span>ACT IV: THE 9 NAVAGRAHA SPECIALIST ENGINES</span>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Domain Specialist AI Ensemble
          </h2>
          <p className="text-sm md:text-base text-gray-300">
            Rather than a single monolithic model pretending to understand all satellite domains, PARAM-BRAHMAND deploys 9 dedicated Navagraha specialist engines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NAVAGRAHA_ENGINES.map(engine => (
            <div key={engine.id} className="liquid-glass-strong rounded-3xl p-5 border border-white/10 flex flex-col justify-between gap-4 shadow-xl hover:border-cyan-400/50 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    {engine.deityAnalogy}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300">{engine.accuracy}</span>
                </div>
                <h4 className="font-bold text-lg text-white mb-1">{engine.name}</h4>
                <span className="text-xs text-cyan-300 font-mono block mb-2">{engine.role}</span>
                <p className="text-xs text-gray-300 leading-relaxed">{engine.description}</p>
              </div>

              <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-gray-400">
                Sensors: {engine.sensor}
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ========================================================================= */}
      {/* ACT V: LIVE SANDBOX LAUNCHER */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 md:px-12 lg:px-16 text-center max-w-4xl mx-auto">
        <div className="story-badge">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>ACT V: ENTER THE LIVE MACHINE</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
          Ready to Interrogate <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-isro-saffron">Space Imagery?</span>
        </h2>

        <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mb-8">
          Launch our live interactive Mission Control dashboard to test split-screen bi-temporal swipes, spotlight polarimetry lenses, and 22-language vernacular voice queries.
        </p>

        <button
          onClick={() => onNavigate('mission-control')}
          className="px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-isro-saffron text-white font-extrabold text-base tracking-wider uppercase shadow-2xl button-glow-cyan hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3"
        >
          <Radio className="w-6 h-6 animate-spin-slow" />
          <span>Enter Live Mission Control</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>

    </div>
  );
};
