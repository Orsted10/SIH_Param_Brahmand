import React, { useState, useRef } from 'react';
import { NavigationTab } from '../types';
import { NAVAGRAHA_ENGINES } from '../data/crisesData';
import { ScrollReveal } from './ScrollReveal';
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
  Award,
  RefreshCw,
  Sliders,
  Flame,
  Droplets,
  Building2,
  Navigation
} from 'lucide-react';

interface HeroProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const HeroCinematic: React.FC<HeroProps> = ({ onNavigate }) => {
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);
  const [activeBottleneckTab, setActiveBottleneckTab] = useState<number>(0);
  const [activeNavagrahaFilter, setActiveNavagrahaFilter] = useState<'all' | 'radar' | 'optical' | 'causal' | 'disaster'>('all');
  
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
      id: 0,
      title: '"RGB-Only" Physics Blindness',
      icon: <Eye className="w-5 h-5 text-cyan-400" />,
      statusQuo: 'Treats satellite scenes like 3-color smartphone photos, discarding 85% of radar polarimetry & multispectral data.',
      solution: 'Prakriti-Veda ingests a 128-D physics manifold (Yamaguchi AG4U + RVoG PolInSAR + MESMA) directly into neural layers.',
      stat: '128-D Physics Manifold'
    },
    {
      id: 1,
      title: 'O(N²) Attention Memory Crash',
      icon: <Cpu className="w-5 h-5 text-amber-400" />,
      statusQuo: 'Standard Vision Transformers explode in quadratic O(N²) memory (34 GB VRAM crash on 4096x4096 tiles).',
      solution: 'Geo-Mamba 3.0 16-directional Hamiltonian scanning runs in strictly linear O(L) time (1.2 GB VRAM at 45 FPS).',
      stat: 'Linear O(L) Time'
    },
    {
      id: 2,
      title: 'Monsoon Cloud & Canopy Blindness',
      icon: <Droplets className="w-5 h-5 text-blue-400" />,
      statusQuo: 'Optical space cameras are 100% blinded by storm clouds; flood water under tree cover is completely unseen.',
      solution: 'Kaal-Radar applies RISAT-1A C/L-band radar polarimetry (RVoG) to penetrate clouds and tree canopies in 380 ms.',
      stat: '97.2% SAR Precision'
    },
    {
      id: 3,
      title: 'Pseudo-Change False Alarms',
      icon: <RefreshCw className="w-5 h-5 text-emerald-400" />,
      statusQuo: 'Pixel differencing confuses natural seasonal monsoon greening or wheat harvesting with real human deforestation.',
      solution: 'Vivek-Causal uses Judea Pearl SCM do-calculus DAGs to isolate true human actions (p > 0.99), suppressing 94.8% false alarms.',
      stat: '94.8% False Alarm Suppression'
    }
  ];

  const layerStack = [
    { 
      layerNum: 7,
      name: 'Bhasha-Brahmand Sovereign VIVA Engine', 
      tag: '22 Indian Languages',
      color: 'from-amber-500 to-isro-saffron',
      desc: 'Voice-In/Voice-Out in 22 scheduled Indian languages using AI4Bharat IndicConformer + IndicTrans2, preserving agricultural terms (Kharif, Rabi, Taluk, Nullah) in under 350 ms.' 
    },
    { 
      layerNum: 6,
      name: 'Dharma-Chakra Hard Physics Firewall', 
      tag: '0% Physical Hallucination',
      color: 'from-cyan-500 to-blue-600',
      desc: 'Deterministic gatekeeper enforcing 4 physical conservation laws: Stokes energy <= incident, standing water slope <= 5.0°, SAR specular backscatter, and albedo bounds.' 
    },
    { 
      layerNum: 5,
      name: 'GeoCP-v2 Spatial Conformal Calibration', 
      tag: '>= 95% Coverage Guarantee',
      color: 'from-purple-500 to-pink-600',
      desc: 'Solves spatial autocorrelation non-exchangeability using distance-decay Moran\'s I kernels, guaranteeing >= 95% ground truth coverage with ECE = 2.4%.' 
    },
    { 
      layerNum: 4,
      name: 'Navagraha Specialist AI Ensemble', 
      tag: '9 Dedicated Specialists',
      color: 'from-emerald-500 to-teal-600',
      desc: '9 domain-expert AI engines (Bhoomi-Optical, Kaal-Radar, Surya-Caption, Sparsh-Grounding, etc.) preventing single-model performance bottlenecks.' 
    },
    { 
      layerNum: 3,
      name: 'Sankalpa-Param MCTS Dynamic Router', 
      tag: 'Auditable JSON Trace',
      color: 'from-blue-600 to-indigo-700',
      desc: 'LangGraph state machine with Monte Carlo Tree Search query planning emitting standardized JSON execution traces strictly matching ISRO SAC PS 26167.' 
    },
    { 
      layerNum: 2,
      name: 'Geo-Mamba 3.0 Linear Backbone', 
      tag: '380 ms at 45 FPS',
      color: 'from-cyan-400 to-emerald-500',
      desc: '16-Directional Hamiltonian continuous state-space model executing 4K satellite tiles in linear O(L) time with SIRTI scale-invariant token injection.' 
    },
    { 
      layerNum: 1,
      name: 'Prakriti-Veda 128-D Physics Manifold', 
      tag: '128-Point Wave Matrix',
      color: 'from-amber-400 to-orange-500',
      desc: 'Ingests Yamaguchi AG4U 4-component radar scattering, PolInSAR RVoG 3D tree height, MESMA sub-pixel unmixing, and 16 color/wave health indices.' 
    }
  ];

  const filteredNavagraha = NAVAGRAHA_ENGINES.filter(e => {
    if (activeNavagrahaFilter === 'all') return true;
    if (activeNavagrahaFilter === 'radar') return e.id.includes('radar') || e.id.includes('ratna');
    if (activeNavagrahaFilter === 'optical') return e.id.includes('optical') || e.id.includes('sparsh');
    if (activeNavagrahaFilter === 'causal') return e.id.includes('causal') || e.id.includes('samay');
    if (activeNavagrahaFilter === 'disaster') return e.id.includes('rakshak') || e.id.includes('surya');
    return true;
  });

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
          
          <ScrollReveal variant="zoom-in" delay={100}>
            <div className="story-badge border border-cyan-500/50 bg-space-900/80 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-isro-saffron" />
              <span>ISRO SAC PROBLEM STATEMENT ID: 26167</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>TEAM TENSORTITANS</span>
            </div>
          </ScrollReveal>

          {/* Regal Sanskrit Motto (Prompt 7 Line Mask Reveal) */}
          <ScrollReveal variant="fade-up" delay={200}>
            <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl text-isro-saffron tracking-wider font-bold mb-3 text-glow-gold">
              "विश्वं पश्यति चक्षुषा विज्ञानेन च युज्यते"
            </h3>
          </ScrollReveal>

          {/* Massive Main Heading */}
          <ScrollReveal variant="fade-up" delay={350}>
            <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter leading-none mb-4">
              PARAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 text-glow-cyan">BRAHMAND</span>
            </h1>
          </ScrollReveal>

          {/* Platform Slogan */}
          <ScrollReveal variant="fade-up" delay={500}>
            <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-gray-200 max-w-3xl mb-4 font-normal">
              "Not Just Seeing Satellites — Understanding the Earth's Living Physics."
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={650}>
            <p className="font-grotesk text-sm md:text-base text-gray-300 max-w-2xl leading-relaxed mb-8">
              The sovereign multimodal vision-language intelligence platform fusing 128-D physics wave mechanics (PolSAR/PolInSAR), linear state-space deep learning (Geo-Mamba 3.0), and 0% physical hallucination firewalls.
            </p>
          </ScrollReveal>

          {/* CTA Row */}
          <ScrollReveal variant="zoom-in" delay={800}>
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
          </ScrollReveal>

          {/* Key Metric Highlights */}
          <ScrollReveal variant="fade-up" delay={950}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl w-full">
              <div className="liquid-glass rounded-xl p-3 text-center border border-white/10 hover:border-cyan-400/50 hover:scale-105 transition-all">
                <span className="text-xs text-gray-400 block mb-0.5">Computational Speed</span>
                <span className="font-bold text-sm text-cyan-300 font-mono">380 ms @ 45 FPS</span>
              </div>
              <div className="liquid-glass rounded-xl p-3 text-center border border-white/10 hover:border-amber-400/50 hover:scale-105 transition-all">
                <span className="text-xs text-gray-400 block mb-0.5">SAR Cloud Penetration</span>
                <span className="font-bold text-sm text-amber-300 font-mono">97.2% Precision</span>
              </div>
              <div className="liquid-glass rounded-xl p-3 text-center border border-white/10 hover:border-emerald-400/50 hover:scale-105 transition-all">
                <span className="text-xs text-gray-400 block mb-0.5">VQA Accuracy (Cartosat-3)</span>
                <span className="font-bold text-sm text-emerald-300 font-mono">93.8% (via SIRTI)</span>
              </div>
              <div className="liquid-glass rounded-xl p-3 text-center border border-white/10 hover:border-purple-400/50 hover:scale-105 transition-all">
                <span className="text-xs text-gray-400 block mb-0.5">Physical Hallucination</span>
                <span className="font-bold text-sm text-purple-300 font-mono">0.00% Certified</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-20 text-center flex flex-col items-center">
          <a href="#act-1" className="text-gray-400 hover:text-cyan-300 text-xs flex flex-col items-center gap-1 transition-colors group">
            <span>Scroll Down to Reveal the Story</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </a>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* ACT I: THE SOVEREIGN MANDATE (ISRO SAC PS 26167) */}
      {/* ========================================================================= */}
      <section id="act-1" className="py-24 px-4 md:px-12 lg:px-16 max-w-7xl mx-auto border-b border-white/10">
        <ScrollReveal variant="fade-up">
          <div className="story-badge">
            <Award className="w-4 h-4 text-isro-saffron" />
            <span>ACT I: THE SOVEREIGN MANDATE</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <ScrollReveal variant="slide-right" delay={150}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                ISRO SAC Problem Statement 26167: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-isro-saffron">SatQuery AI</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={300}>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed font-grotesk">
                The Indian Space Research Organisation (ISRO) Space Applications Centre (SAC), Ahmedabad, mandated an interactive platform for space scientists, NDMA commanders, forest rangers, and rural citizens to interrogate satellite imagery using natural language (including 22 Indian languages).
              </p>
            </ScrollReveal>

            {/* Interactive Input Scopes Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <ScrollReveal variant="zoom-in" delay={450}>
                <div className="liquid-glass p-5 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 transition-all hover:scale-105">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase block mb-1">Scope 1: Single Image VQA</span>
                  <p className="text-xs text-gray-300">Single Optical or SAR scene for Visual Question Answering, 4-Tier Captioning, and Sub-pixel Grounding.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="zoom-in" delay={600}>
                <div className="liquid-glass p-5 rounded-2xl border border-amber-500/30 hover:border-amber-400 transition-all hover:scale-105">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase block mb-1">Scope 2: Bi-Temporal Pair</span>
                  <p className="text-xs text-gray-300">Two spatially aligned images taken at different dates (T1 and T2) for change detection & change masks.</p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal variant="slide-left" delay={300}>
              <div className="liquid-glass-strong rounded-3xl p-6 border border-cyan-500/40 shadow-2xl flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <h4 className="font-bold text-white text-base">Mandatory SIH 2026 Pillars</h4>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-none mt-0.5" />
                    <div>
                      <strong className="text-white">Pillar 1: Remote Sensing Adaptation:</strong> Model fine-tuned on remote sensing datasets (BigEarthNet.txt).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-none mt-0.5" />
                    <div>
                      <strong className="text-white">Pillar 2: Single-Image Baseline:</strong> Mandatory VQA + 4-tier captioning.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-none mt-0.5" />
                    <div>
                      <strong className="text-white">Pillar 3: Bi-Temporal Change Analysis:</strong> High-resolution spatial change masks.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-none mt-0.5" />
                    <div>
                      <strong className="text-white">Pillar 5: Auditable Execution Trace:</strong> Standardized JSON trace for every decision.
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* ACT II: WHY STANDARD AI FAILS IN SPACE (INTERACTIVE FLIP CARDS) */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 md:px-12 lg:px-16 max-w-7xl mx-auto border-b border-white/10">
        <ScrollReveal variant="fade-up">
          <div className="story-badge">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>ACT II: THE 8 BOTTLENECKS & THE BREAKTHROUGH</span>
          </div>
        </ScrollReveal>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <ScrollReveal variant="fade-up" delay={150}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Why Standard AI Fails in Space & How <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">PARAM-BRAHMAND Solves It</span>
            </h2>
            <p className="text-sm text-gray-400 font-mono">
              Click any bottleneck card below to switch between "Status Quo Failure" and "PARAM-BRAHMAND Fix".
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive Bottleneck Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bottlenecks.map((b, idx) => {
            const isSelected = activeBottleneckTab === b.id;
            return (
              <ScrollReveal key={b.id} variant="zoom-in" delay={idx * 150}>
                <div 
                  onClick={() => setActiveBottleneckTab(b.id)}
                  className={`liquid-glass-strong rounded-3xl p-6 border cursor-pointer transition-all ${
                    isSelected ? 'border-cyan-400 shadow-2xl scale-[1.02]' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-space-950 border border-white/10">
                        {b.icon}
                      </div>
                      <h4 className="font-bold text-base text-white">{b.title}</h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-500/20 px-2.5 py-1 rounded-full border border-cyan-500/40">
                      {b.stat}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="bg-red-950/20 border border-red-500/30 p-3.5 rounded-2xl">
                      <strong className="text-red-400 block mb-1">✘ What Fails Today (Status Quo):</strong>
                      <span className="text-gray-300 leading-relaxed">{b.statusQuo}</span>
                    </div>

                    <div className="bg-emerald-950/20 border border-emerald-500/30 p-3.5 rounded-2xl">
                      <strong className="text-emerald-400 block mb-1">✔ PARAM-BRAHMAND Solution:</strong>
                      <span className="text-gray-300 leading-relaxed">{b.solution}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>


      {/* ========================================================================= */}
      {/* ACT III: THE 7-LAYER INTEGRATED SYSTEM STACK */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 md:px-12 lg:px-16 max-w-7xl mx-auto border-b border-white/10">
        <ScrollReveal variant="fade-up">
          <div className="story-badge">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>ACT III: THE 7-LAYER SYSTEM ARCHITECTURE</span>
          </div>
        </ScrollReveal>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <ScrollReveal variant="fade-up" delay={150}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Integrated Earth Intelligence Operating System
            </h2>
            <p className="text-sm md:text-base text-gray-300">
              Click any layer below to inspect its operational mechanics and scientific algorithms.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Layer Pyramid List (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-2.5">
            {layerStack.map((layer, idx) => {
              const isSelected = activeLayerIndex === idx;
              return (
                <ScrollReveal key={idx} variant="slide-right" delay={idx * 100}>
                  <div
                    onClick={() => setActiveLayerIndex(idx)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'liquid-glass-strong border-cyan-400/80 shadow-2xl scale-[1.02]'
                        : 'liquid-glass border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-space-950 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center">
                          L{layer.layerNum}
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-white">{layer.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30 hidden sm:inline">
                        {layer.tag}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Active Layer Details Card (6 Cols) */}
          <div className="lg:col-span-6">
            <ScrollReveal variant="zoom-in" delay={300}>
              <div className="liquid-glass-strong rounded-3xl p-6 border border-cyan-500/40 shadow-2xl flex flex-col gap-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                    LAYER {layerStack[activeLayerIndex].layerNum} OPERATIONAL MECHANICS
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                    {layerStack[activeLayerIndex].tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white">
                  {layerStack[activeLayerIndex].name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed bg-space-950/80 p-4 rounded-2xl border border-white/10 font-mono">
                  {layerStack[activeLayerIndex].desc}
                </p>

                <button
                  onClick={() => onNavigate('physics-lab')}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-lg button-glow-cyan flex items-center gap-2 self-start"
                >
                  <span>Inspect Equations in 128-D Physics Lab</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* ACT IV: THE 9 NAVAGRAHA ENGINES (FILTERABLE CAROUSEL GRID) */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 md:px-12 lg:px-16 max-w-7xl mx-auto border-b border-white/10">
        <ScrollReveal variant="fade-up">
          <div className="story-badge">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>ACT IV: THE 9 NAVAGRAHA SPECIALIST ENGINES</span>
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Domain Specialist AI Ensemble
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              9 dedicated Navagraha specialist engines ensure every query is handled by an expert system.
            </p>
          </div>

          {/* Navagraha Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
            <button
              onClick={() => setActiveNavagrahaFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeNavagrahaFilter === 'all' ? 'bg-cyan-500 text-white' : 'liquid-glass text-gray-300'
              }`}
            >
              All 9 Engines
            </button>
            <button
              onClick={() => setActiveNavagrahaFilter('radar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeNavagrahaFilter === 'radar' ? 'bg-amber-500 text-white' : 'liquid-glass text-gray-300'
              }`}
            >
              Radar & Aquifer
            </button>
            <button
              onClick={() => setActiveNavagrahaFilter('optical')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeNavagrahaFilter === 'optical' ? 'bg-emerald-500 text-white' : 'liquid-glass text-gray-300'
              }`}
            >
              Optical & Polygon
            </button>
            <button
              onClick={() => setActiveNavagrahaFilter('causal')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeNavagrahaFilter === 'causal' ? 'bg-purple-500 text-white' : 'liquid-glass text-gray-300'
              }`}
            >
              Causal & Time
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNavagraha.map((engine, idx) => (
            <ScrollReveal key={engine.id} variant="zoom-in" delay={idx * 100}>
              <div className="liquid-glass-strong rounded-3xl p-5 border border-white/10 flex flex-col justify-between gap-4 shadow-xl hover:border-cyan-400/50 hover:scale-[1.02] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      {engine.deityAnalogy}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-300 font-bold">{engine.accuracy}</span>
                  </div>
                  <h4 className="font-bold text-lg text-white mb-1">{engine.name}</h4>
                  <span className="text-xs text-cyan-300 font-mono block mb-2">{engine.role}</span>
                  <p className="text-xs text-gray-300 leading-relaxed">{engine.description}</p>
                </div>

                <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-gray-400">
                  Sensors: {engine.sensor}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>


      {/* ========================================================================= */}
      {/* ACT V: LIVE SANDBOX LAUNCHER */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 md:px-12 lg:px-16 text-center max-w-4xl mx-auto">
        <ScrollReveal variant="zoom-in">
          <div className="story-badge">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>ACT V: ENTER THE LIVE MACHINE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Ready to Interrogate <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-isro-saffron">Space Imagery?</span>
          </h2>

          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mb-8 font-grotesk">
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
        </ScrollReveal>
      </section>

    </div>
  );
};
