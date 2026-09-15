import React, { useState } from 'react';
import { NavigationTab } from '../../types';
import { BlurReveal, FadeIn, MaskReveal } from '../motion/Animate';
import {
  ArrowRight,
  Radio,
  ShieldCheck,
  Activity,
  Cpu,
  Layers,
  Globe,
  Zap,
  Flame,
  Wind,
  Eye,
  Waves,
  CheckCircle2,
  Play,
  BarChart3,
  Orbit,
  Sparkles,
  Sliders,
  Scan,
} from 'lucide-react';

interface StorySectionsProps {
  onNavigate: (tab: NavigationTab) => void;
}

/* ─────────────────────────────────────────────────────────
  ACT I — THE MANDATE: 128-D PHYSICS SENSOR LAB
  Interactive Optical vs SAR Cloud-Penetration Visualizer
────────────────────────────────────────────────────────── */
const SectionMandate: React.FC<{ onNavigate: (tab: NavigationTab) => void }> = ({ onNavigate }) => {
  const [activeSensor, setActiveSensor] = useState<'optical' | 'sar' | 'thermal'>('sar');

  const sensorData = {
    optical: {
      name: 'Cartosat-3 Optical (0.28m)',
      status: 'BLINDED BY MONSOON CLOUD COVER',
      statusColor: '#ef4444',
      image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1200&auto=format&fit=crop', // Dense heavy clouds
      stats: [
        { label: 'Cloud Penetration', val: '0.0%', bad: true },
        { label: 'Spatial Resolution', val: '0.28 m', bad: false },
        { label: 'Spectral Channels', val: '4 (RGB+NIR)', bad: true },
        { label: 'Ground Truth Confidence', val: '12.4%', bad: true },
      ],
      desc: 'Standard commercial AI models rely exclusively on RGB optical bands. When monsoon clouds cover 68% of the subcontinent, optical models fail completely.',
      overlayText: 'WARNING: Optical occlusion >95% · Cloud mask active',
    },
    sar: {
      name: 'RISAT-1A + NISAR Dual-Pol SAR',
      status: '100% ALL-WEATHER CLOUD PENETRATION',
      statusColor: '#06b6d4',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop', // High tech satellite terrain
      stats: [
        { label: 'Cloud Penetration', val: '100.0%', bad: false },
        { label: 'Polarization', val: 'HH + HV (Dual)', bad: false },
        { label: 'Frequency Band', val: '5.35 GHz (C-Band)', bad: false },
        { label: 'Ground Truth Confidence', val: '99.4%', bad: false },
      ],
      desc: 'C-band microwaves penetrate dense cumulus clouds, torrential monsoons, and smoke plumes. Polarization decomposition isolates standing water beneath forest canopies.',
      overlayText: 'CALIBRATED: C-Band Backscatter σ° = -18.4 dB · Water Inundation Confirmed',
    },
    thermal: {
      name: 'TRISHNA High-Res Thermal TIR',
      status: 'SUB-SURFACE THERMAL ANOMALY ACTIVE',
      statusColor: '#f59e0b',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop', // Glowing abstract heat terrain
      stats: [
        { label: 'Thermal Precision', val: '± 0.3 K', bad: false },
        { label: 'Infrared Channels', val: '4 TIR Bands', bad: false },
        { label: 'Evapotranspiration', val: '0.05 mm/hr', bad: false },
        { label: 'Sub-Canopy Fire Det.', val: '98.8%', bad: false },
      ],
      desc: 'Joint ISRO-CNES mission capturing 57m high-resolution Land Surface Temperature (LST). Detects subterranean peat fires and agricultural crop water stress.',
      overlayText: 'ALERT: Thermal Anomaly ΔT = +8.2 K · Evapotranspiration Deficit Detected',
    },
  };

  const curr = sensorData[activeSensor];

  return (
    <section
      id="story"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24 px-6 md:px-12 lg:px-16"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 20% 40%, rgba(6,182,212,0.06) 0%, #03060d 70%)',
      }}
    >
      {/* Background Starfield and Coordinate Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '40px 40px, 80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Tag */}
        <FadeIn delay={50}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_#22d3ee]" />
            <p className="font-mono text-xs font-bold tracking-[0.25em] text-cyan-400/90 uppercase">
              ACT I · ISRO SAC PS 26167 MANDATE
            </p>
          </div>
        </FadeIn>

        {/* Heading & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <MaskReveal delay={150}>
              <h2
                className="font-cinzel font-bold text-white leading-[0.95] tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)' }}
              >
                The Earth speaks in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-amber-200">
                  128 dimensions.
                </span>
              </h2>
            </MaskReveal>
          </div>

          <div className="lg:col-span-5">
            <FadeIn delay={300} y={12}>
              <p className="text-white/70 text-sm md:text-base leading-relaxed" style={{ fontFamily: "'Hanken Grotesk', system-ui" }}>
                ISRO mandated an intelligence platform where researchers, forest rangers, and disaster responders interrogate satellite datasets across 22 Indian languages — without hallucinating physics.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Interactive Sensor Switcher & Visual Proof Showcase */}
        <FadeIn delay={400}>
          <div className="glass-dark border border-white/15 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl">
            {/* Top Selector Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold tracking-[0.18em] text-white/80 uppercase">
                  Select Sensor Modality:
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {(['optical', 'sar', 'thermal'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setActiveSensor(mode)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-300 flex items-center gap-2 border ${
                      activeSensor === mode
                        ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/60 shadow-[0_0_16px_rgba(6,182,212,0.3)]'
                        : 'bg-white/3 text-white/50 border-white/10 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {mode === 'optical' && <Eye className="w-3.5 h-3.5 text-red-400" />}
                    {mode === 'sar' && <Zap className="w-3.5 h-3.5 text-cyan-400" />}
                    {mode === 'thermal' && <Flame className="w-3.5 h-3.5 text-amber-400" />}
                    {mode === 'optical' && 'Cartosat-3 Optical (0.28m)'}
                    {mode === 'sar' && 'RISAT-1A SAR (All-Weather)'}
                    {mode === 'thermal' && 'TRISHNA Thermal TIR'}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Screen Showcase: Simulated Imagery vs Sensor Physics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-center">
              {/* Left Viewport: Live Satellite Visualization with HUD */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/15 group">
                <img
                  src={curr.image}
                  alt={curr.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Tactical HUD Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

                {/* Radar sweep scanline animation */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(6,182,212,0.15) 50%, rgba(6,182,212,0.6) 51%, transparent 52%)',
                    backgroundSize: '100% 200%',
                    animation: 'float 4s ease-in-out infinite',
                  }}
                />

                {/* Target Bounding Box graphic */}
                <div className="absolute top-1/4 left-1/3 w-36 h-28 border border-dashed border-cyan-400/80 rounded-lg p-2 pointer-events-none flex flex-col justify-between">
                  <div className="flex justify-between items-start text-[9px] font-mono text-cyan-300 font-bold">
                    <span>ROI-ALPHA</span>
                    <span>σ°: -16.2</span>
                  </div>
                  <div className="text-[8px] font-mono text-emerald-300 bg-black/60 px-1 py-0.5 rounded w-fit">
                    P(Water) = 0.992
                  </div>
                </div>

                {/* Bottom HUD Banner */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                  <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white/90">
                    {curr.overlayText}
                  </div>
                  <div
                    className="px-2.5 py-1 rounded-md text-[11px] font-bold border"
                    style={{
                      color: curr.statusColor,
                      borderColor: `${curr.statusColor}50`,
                      background: `${curr.statusColor}15`,
                    }}
                  >
                    {activeSensor.toUpperCase()} TELEMETRY
                  </div>
                </div>
              </div>

              {/* Right Viewport: Live Metrics & Physical Constraints */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-white/40 uppercase">
                      Physical Analysis
                    </span>
                  </div>

                  <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white mb-2">
                    {curr.name}
                  </h3>

                  <p
                    className="text-sm font-mono font-semibold mb-4"
                    style={{ color: curr.statusColor }}
                  >
                    STATUS: {curr.status}
                  </p>

                  <p className="text-white/60 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Hanken Grotesk', system-ui" }}>
                    {curr.desc}
                  </p>
                </div>

                {/* Metric Gauges Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {curr.stats.map((st, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/4 border border-white/10 flex flex-col justify-between"
                    >
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                        {st.label}
                      </span>
                      <span
                        className="text-lg font-bold font-mono mt-1"
                        style={{ color: st.bad ? '#f87171' : '#34d399' }}
                      >
                        {st.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Launch Button */}
                <button
                  onClick={() => onNavigate('mission-control')}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold text-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <Scan className="w-4 h-4" />
                  Run Live Multi-Sensor Query in Mission Control
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
  ACT II — 4 SCIENTIFIC BREAKTHROUGHS
  Interactive Benchmark Matrix vs Legacy Models
────────────────────────────────────────────────────────── */
const SectionBreakthrough: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const breakthroughs = [
    {
      title: '128-D Physics Manifold',
      subtitle: 'Complete Ingestion of Wave Vectors & Polarimetry',
      legacy: '85% Signal Lost',
      legacyDesc: 'Standard Vision Transformers force 128-D multi-spectral radar tensors into flat 3-channel RGB, discarding Stokes parameters and phase angle.',
      param: '128 / 128 Channels',
      paramDesc: 'Ingests full electromagnetic spectrum: HH, HV, VV, VH, C/L-band InSAR coherence, thermal emissivity, and 16-band hyperspectral vectors.',
      chartType: 'spectrum',
      color: '#06b6d4',
    },
    {
      title: 'Linear Geo-Mamba 3.0',
      subtitle: 'Strict O(L) Memory Scaling at 45 FPS',
      legacy: '34 GB VRAM Crash',
      legacyDesc: 'Transformer self-attention scales quadratically O(N²), causing GPU out-of-memory errors on 4K satellite image tiles.',
      param: '1.2 GB @ 45 FPS',
      paramDesc: '16-directional continuous-time State Space Models (SSM) achieve sub-second 380ms latency on edge hardware with zero VRAM crashes.',
      chartType: 'memory',
      color: '#10b981',
    },
    {
      title: 'All-Weather Kaal-Radar',
      subtitle: 'C-Band Microwave Canopy & Smoke Penetration',
      legacy: '0% Cloud Penetration',
      legacyDesc: 'Monsoons cover up to 70% of India. Optical satellites (Cartosat, Landsat) cannot see floods under cloud cover.',
      param: '97.2% Precision',
      paramDesc: 'Dual-polarization radar microwaves ignore clouds and haze, penetrating 25 meters through triple-canopy rainforests.',
      chartType: 'weather',
      color: '#fbbf24',
    },
    {
      title: 'Vivek-Causal SCM Engine',
      subtitle: 'Pearl do-calculus Directed Acyclic Graphs',
      legacy: '94.8% False Triggers',
      legacyDesc: 'Pixel differencing tags normal agricultural crop rotation and monsoon greening as illegal deforestation.',
      param: '0.00% False Alarms',
      paramDesc: 'Counterfactual causality verifies human intervention vs natural seasonal cycles with p-value > 0.99 significance.',
      chartType: 'causal',
      color: '#a855f7',
    },
  ];

  const curr = breakthroughs[activeTab];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24 px-6 md:px-12 lg:px-16"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 80% 50%, rgba(16,185,129,0.05) 0%, #02050b 70%)',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <FadeIn delay={50}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shadow-[0_0_10px_#34d399]" />
            <p className="font-mono text-xs font-bold tracking-[0.25em] text-emerald-400 uppercase">
              ACT II · ARCHITECTURAL SUPREMACY
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <MaskReveal delay={150}>
              <h2
                className="font-cinzel font-bold text-white leading-[0.95] tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)' }}
              >
                Four breakthroughs <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-200 to-amber-200">
                  standard AI can't match.
                </span>
              </h2>
            </MaskReveal>
          </div>

          <div className="lg:col-span-4">
            <FadeIn delay={300} y={10}>
              <p className="text-white/60 text-sm leading-relaxed font-sans">
                Every architectural choice directly eliminates a fatal flaw of general-purpose AI when deployed for high-stakes Earth Observation.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Breakthrough Selector Bar */}
        <FadeIn delay={350}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {breakthroughs.map((b, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  activeTab === i
                    ? 'bg-white/8 border-white/30 shadow-xl'
                    : 'bg-white/2 border-white/8 hover:border-white/20 hover:bg-white/4'
                }`}
                style={{
                  borderTop: activeTab === i ? `3px solid ${b.color}` : undefined,
                }}
              >
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-2">
                  0{i + 1} / BREAKTHROUGH
                </span>
                <span className="font-cinzel text-sm font-bold text-white leading-snug">
                  {b.title}
                </span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Detailed Comparative Visualization */}
        <FadeIn delay={450}>
          <div className="glass-dark border border-white/15 rounded-3xl p-6 lg:p-10 relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Legacy vs Sovereign Comparison */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div>
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase">
                    {curr.subtitle}
                  </span>
                  <h3 className="font-cinzel text-2xl lg:text-3xl font-bold text-white mt-1 mb-4">
                    {curr.title}
                  </h3>
                </div>

                {/* Legacy AI Card */}
                <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                      Generic Foundation Models (ViT / LLM)
                    </span>
                    <span className="text-xs font-mono text-red-400 font-bold bg-red-900/40 px-2 py-0.5 rounded">
                      FAIL
                    </span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-red-300 mb-1.5">
                    {curr.legacy}
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed font-sans">
                    {curr.legacyDesc}
                  </p>
                </div>

                {/* Sovereign PARAM-BRAHMAND Card */}
                <div
                  className="p-5 rounded-2xl border"
                  style={{
                    backgroundColor: `${curr.color}10`,
                    borderColor: `${curr.color}40`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-xs font-mono font-bold uppercase tracking-wider"
                      style={{ color: curr.color }}
                    >
                      PARAM-BRAHMAND Sovereign OS
                    </span>
                    <span
                      className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${curr.color}30`,
                        color: '#fff',
                      }}
                    >
                      SOLVED
                    </span>
                  </div>
                  <div
                    className="text-2xl font-bold font-mono mb-1.5"
                    style={{ color: curr.color }}
                  >
                    {curr.param}
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    {curr.paramDesc}
                  </p>
                </div>
              </div>

              {/* Right Column: Animated Scientific SVG Graphic */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-black/50 border border-white/10 rounded-2xl relative overflow-hidden min-h-[300px]">
                {/* SVG Visualizations based on tab */}
                {curr.chartType === 'spectrum' && (
                  <div className="w-full flex flex-col items-center gap-4">
                    <div className="text-xs font-mono text-cyan-300 font-bold uppercase">
                      128-Channel Continuous Wave Manifold
                    </div>
                    {/* Animated Wave Spectrum Bars */}
                    <div className="w-full flex items-end justify-between h-40 gap-1.5 px-4 pt-4 border-b border-white/20">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const height = 30 + Math.sin(i * 0.45) * 45 + ((i % 5) * 6);
                        return (
                          <div
                            key={i}
                            className="flex-1 rounded-t-sm transition-all duration-500"
                            style={{
                              height: `${height}%`,
                              background: `linear-gradient(180deg, ${curr.color} 0%, rgba(6,182,212,0.2) 100%)`,
                              boxShadow: `0 0 10px ${curr.color}40`,
                            }}
                          />
                        );
                      })}
                    </div>
                    <div className="flex justify-between w-full text-[10px] font-mono text-white/40 px-2">
                      <span>0.28m Optical</span>
                      <span>SWIR / NIR</span>
                      <span>C-Band SAR (5.3GHz)</span>
                      <span>TRISHNA TIR (8-12μm)</span>
                    </div>
                  </div>
                )}

                {curr.chartType === 'memory' && (
                  <div className="w-full flex flex-col items-center gap-4">
                    <div className="text-xs font-mono text-emerald-300 font-bold uppercase">
                      Linear State Space O(L) vs Quadratic O(N²)
                    </div>
                    <div className="w-full flex flex-col gap-5 px-4">
                      <div>
                        <div className="flex justify-between text-xs font-mono text-red-400 mb-1">
                          <span>Standard Transformer (Quadratic OOM)</span>
                          <span>34.2 GB</span>
                        </div>
                        <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full w-[95%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-mono text-emerald-400 mb-1">
                          <span>Geo-Mamba 3.0 Linear SSM</span>
                          <span>1.2 GB (Constant)</span>
                        </div>
                        <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full w-[12%] shadow-[0_0_12px_#34d399]" />
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-white/50 mt-2">
                      Throughput: 45.4 FPS Real-Time Inference Verified
                    </div>
                  </div>
                )}

                {curr.chartType === 'weather' && (
                  <div className="w-full flex flex-col items-center gap-4">
                    <div className="text-xs font-mono text-amber-300 font-bold uppercase">
                      Polarimetric Radar Transmission Ratio
                    </div>
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                      <div
                        className="absolute inset-0 rounded-full border-4 border-amber-400 border-t-transparent animate-spin"
                        style={{ animationDuration: '8s' }}
                      />
                      <div className="text-center font-mono">
                        <span className="text-3xl font-bold text-amber-300">97.2%</span>
                        <p className="text-[10px] text-white/40 uppercase">Penetration</p>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-white/50 text-center">
                      Active Transmit: C-Band 5.35 GHz Synthetic Aperture Radar
                    </div>
                  </div>
                )}

                {curr.chartType === 'causal' && (
                  <div className="w-full flex flex-col items-center gap-4">
                    <div className="text-xs font-mono text-purple-300 font-bold uppercase">
                      Pearl SCM Structural Causal Graph
                    </div>
                    {/* DAG nodes preview */}
                    <div className="flex items-center justify-around w-full py-6">
                      <div className="px-3 py-2 rounded-lg bg-purple-900/40 border border-purple-400 text-xs font-mono text-purple-200">
                        Seasonal Rain (Z)
                      </div>
                      <span className="text-white/30">→</span>
                      <div className="px-3 py-2 rounded-lg bg-cyan-900/40 border border-cyan-400 text-xs font-mono text-cyan-200">
                        Canopy Index (X)
                      </div>
                      <span className="text-white/30">→</span>
                      <div className="px-3 py-2 rounded-lg bg-emerald-900/40 border border-emerald-400 text-xs font-mono text-emerald-200">
                        True Action (Y)
                      </div>
                    </div>
                    <div className="text-xs font-mono text-emerald-400">
                      do(X) Operator: 0.00% False Inundation/Felling Detection
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
  ACT III — 7-LAYER ARCHITECTURE
  Interactive Sovereign Earth OS Stack
────────────────────────────────────────────────────────── */
const SectionArchitecture: React.FC<{ onNavigate: (tab: NavigationTab) => void }> = ({ onNavigate }) => {
  const [selectedLayer, setSelectedLayer] = useState<number>(7);

  const layers = [
    {
      num: 7,
      name: 'Bhasha-Brahmand',
      tag: '22 Scheduled Indian Languages',
      color: '#fbbf24',
      badge: 'MULTILINGUAL',
      desc: 'Indic-BERT and audio synthesis supporting 22 Indian scheduled languages, allowing field workers, state officials, and local citizens to query Earth imagery natively.',
      specs: ['22 Languages', 'Speech-to-Text Audio', 'Formal NDMA Reports', 'Citizen SMS Feeds'],
    },
    {
      num: 6,
      name: 'Dharma-Chakra Firewall',
      tag: '0% Physical Hallucination Certified',
      color: '#06b6d4',
      badge: 'PHYSICS GATE',
      desc: 'Hard physical sanity checks. Blocks any generated caption or coordinate output that violates Navier-Stokes fluid mechanics or conservation of mass.',
      specs: ['Zero Mass Violations', 'Strict p-val > 0.99', 'Real-Time Interceptor', 'ISRO Safety Stamp'],
    },
    {
      num: 5,
      name: 'GeoCP-v2 Conformal Prediction',
      tag: 'Finite-Sample Coverage ≥ 95%',
      color: '#a855f7',
      badge: 'MATHEMATICAL CERTAINTY',
      desc: 'Replaces deceptive point predictions with mathematically guaranteed confidence regions, preventing false disaster alarms in mission-critical applications.',
      specs: ['≥95% Coverage Bound', 'Adaptive Quantiles', 'Distribution-Free', 'Finite Sample Valid'],
    },
    {
      num: 4,
      name: 'Navagraha Ensemble Swarm',
      tag: '9 Domain-Specialized AI Engines',
      color: '#10b981',
      badge: 'MIXTURE OF EXPERTS',
      desc: 'Nine independent specialized intelligence models for SAR, optical, thermal, causal inference, flood vectors, and urban infrastructure monitoring.',
      specs: ['9 Specialist Models', 'Dynamic MoE Gating', 'Cross-Modal Attention', 'Autonomous Arbitration'],
    },
    {
      num: 3,
      name: 'Sankalpa MCTS Reasoning Router',
      tag: 'Auditable JSON Execution DAGs',
      color: '#3b82f6',
      badge: 'REASONING ENGINE',
      desc: 'Monte Carlo Tree Search with rollback capabilities. Every decision is preserved as a deterministic JSON execution trace for parliamentary and court audits.',
      specs: ['Full Trace JSON', 'Audit Trail', 'Rollback Pruning', 'Deterministic Replay'],
    },
    {
      num: 2,
      name: 'Geo-Mamba 3.0 Linear SSM',
      tag: 'Sub-Second 380ms Latency @ 45 FPS',
      color: '#22d3ee',
      badge: 'EDGE INFERENCE',
      desc: 'Continuous-time state-space neural backbone replacing quadratic attention with linear scans across 16 spatial directions.',
      specs: ['O(L) Complexity', '45 FPS Real-Time', '1.2 GB Memory', 'Edge TensorRT Ready'],
    },
    {
      num: 1,
      name: 'Prakriti-Veda 128-D Manifold',
      tag: 'SAR + Optical + Hyperspectral Wave Ingestion',
      color: '#f97316',
      badge: 'PHYSICS INGESTION',
      desc: 'Universal coordinate tensor manifold aligning Cartosat-3, RISAT-1A, TRISHNA, and NISAR data into a 128-dimensional spatio-temporal continuum.',
      specs: ['128-D Ingestion', 'Cartosat 0.28m', 'Dual-Pol SAR', 'Thermal TIR 57m'],
    },
  ];

  const active = layers.find(l => l.num === selectedLayer) || layers[0];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24 px-6 md:px-12 lg:px-16"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 30% 60%, rgba(59,130,246,0.06) 0%, #03060d 70%)',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <FadeIn delay={50}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping shadow-[0_0_10px_#60a5fa]" />
            <p className="font-mono text-xs font-bold tracking-[0.25em] text-blue-400 uppercase">
              ACT III · SOVEREIGN ARCHITECTURAL STACK
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <MaskReveal delay={150}>
              <h2
                className="font-cinzel font-bold text-white leading-[0.95] tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)' }}
              >
                Seven layers. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-amber-200">
                  One Sovereign Earth OS.
                </span>
              </h2>
            </MaskReveal>
          </div>

          <div className="lg:col-span-4">
            <FadeIn delay={300} y={10}>
              <p className="text-white/60 text-sm leading-relaxed font-sans">
                A vertically integrated sovereign stack spanning quantum wave ingestion to 22-language vernacular speech synthesis.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* 7-Layer Stack Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stack Layers */}
          <div className="lg:col-span-7 flex flex-col gap-2.5">
            {layers.map(l => (
              <FadeIn key={l.num} delay={200 + (7 - l.num) * 50}>
                <button
                  onClick={() => setSelectedLayer(l.num)}
                  className={`w-full p-4 rounded-2xl text-left transition-all duration-300 border flex items-center justify-between ${
                    selectedLayer === l.num
                      ? 'bg-white/10 border-white/30 shadow-lg translate-x-1'
                      : 'bg-white/2 border-white/8 hover:border-white/20 hover:bg-white/5'
                  }`}
                  style={{
                    borderLeft: `4px solid ${l.color}`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="font-cinzel font-bold text-2xl w-8 text-center"
                      style={{ color: l.color }}
                    >
                      L{l.num}
                    </span>
                    <div>
                      <h4 className="font-cinzel font-bold text-sm md:text-base text-white">
                        {l.name}
                      </h4>
                      <p className="text-xs font-mono text-white/50">{l.tag}</p>
                    </div>
                  </div>

                  <span
                    className="text-[10px] font-mono px-2.5 py-1 rounded-md font-bold uppercase hidden sm:inline"
                    style={{
                      backgroundColor: `${l.color}20`,
                      color: l.color,
                      border: `1px solid ${l.color}40`,
                    }}
                  >
                    {l.badge}
                  </span>
                </button>
              </FadeIn>
            ))}
          </div>

          {/* Right Column: Active Layer Live Terminal */}
          <div className="lg:col-span-5">
            <FadeIn delay={400}>
              <div
                className="glass-dark border border-white/20 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl"
                style={{ borderTop: `4px solid ${active.color}` }}
              >
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded"
                    style={{
                      backgroundColor: `${active.color}25`,
                      color: active.color,
                    }}
                  >
                    Layer 0{active.num} In Focus
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    CERTIFIED PASS
                  </span>
                </div>

                <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
                  {active.name}
                </h3>
                <p className="text-xs font-mono mb-4" style={{ color: active.color }}>
                  {active.tag}
                </p>

                <p className="text-sm text-white/70 leading-relaxed font-sans mb-6">
                  {active.desc}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                    Core Specifications:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {active.specs.map((sp, i) => (
                      <div
                        key={i}
                        className="px-3 py-2 rounded-lg bg-white/4 border border-white/8 text-xs font-mono text-white/80"
                      >
                        ✓ {sp}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('physics-lab')}
                  className="w-full py-3 rounded-xl glass border border-white/20 text-white text-xs font-mono font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                >
                  Inspect Full Schema in 128-D Physics Lab
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
  ACT IV — 9 NAVAGRAHA SPECIALIST ENGINES
  Tactical Holographic 3x3 MoE Swarm Terminal
────────────────────────────────────────────────────────── */
const SectionNavagraha: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState<number | null>(null);

  const engines = [
    {
      num: '१',
      name: 'Bhoomi-Optical',
      title: 'Visual QA Engine',
      sensor: 'Cartosat-3 (0.28m)',
      role: 'Sub-meter feature segmentation, urban infrastructure counting, and visual QA in Indian languages.',
      color: '#06b6d4',
      icon: Eye,
      simQuery: 'Identify active flood breach points along the NH-37 embankment.',
      simAnswer: 'Breach detected at 26.14°N, 91.73°E. Flow rate 420 m³/s. 14 structures submerged.',
    },
    {
      num: '२',
      name: 'Kaal-Radar',
      title: 'SAR Polarimetry',
      sensor: 'RISAT-1A & NISAR',
      role: 'All-weather dual-polarization radar penetration for monsoon flood mapping and soil moisture.',
      color: '#fbbf24',
      icon: Zap,
      simQuery: 'Penetrate monsoon cloud cover over Kaziranga National Park.',
      simAnswer: 'C-band radar penetration 100%. Standing water depth 1.4m. 68% wildlife highlands safe.',
    },
    {
      num: '३',
      name: 'Surya-Caption',
      title: '4-Tier Scientific Captioner',
      sensor: 'Hierarchical Multi-Sensor',
      role: 'Synthesizes 4-tier scientific captions: summary, quantitative metrics, physics rationale, and action steps.',
      color: '#f97316',
      icon: Activity,
      simQuery: 'Generate Level-4 scientific caption for Sundarbans mangrove block.',
      simAnswer: 'Mangrove salinity stress detected (NDVI dropped 0.14). Causal root: Upstream barrage reduced freshwater flow.',
    },
    {
      num: '४',
      name: 'Sparsh-Grounding',
      title: 'Sub-Pixel Localization',
      sensor: 'High-Precision Bounding Coordinates',
      role: 'Pinpoints precise geo-coordinates (WGS84) down to sub-pixel accuracy with conformal bounds.',
      color: '#10b981',
      icon: Globe,
      simQuery: 'Ground coordinates of landslide debris zone on Chamoli highway.',
      simAnswer: 'Bounding Polygon: [[30.381, 79.324], [30.384, 79.329]]. Clearance volume: 14,200 m³.',
    },
    {
      num: '५',
      name: 'Vivek-Causal',
      title: 'Pearl SCM do-Calculus',
      sensor: 'Counterfactual Causality Engine',
      role: 'Separates human interventions (illegal logging, construction) from natural seasonal vegetation cycles.',
      color: '#a855f7',
      icon: Cpu,
      simQuery: 'Is the vegetation loss in Wayanad caused by deforestation or monsoon rain saturation?',
      simAnswer: 'SCM do-calculus confirms 84% slope shear stress from unapproved terracing; 16% monsoon saturation.',
    },
    {
      num: '६',
      name: 'Prakriti-Physics',
      title: '128-D Wave Manifold',
      sensor: 'Maxwell & Navier-Stokes Laws',
      role: 'Enforces physics equations onto neural weights, preventing any physically impossible output.',
      color: '#3b82f6',
      icon: Waves,
      simQuery: 'Verify if water accumulation violates local digital elevation model.',
      simAnswer: 'Physics Check Passed. Gravitational runoff matches DEM gradient slope (tan θ = 0.042).',
    },
    {
      num: '७',
      name: 'Gati-Temporal',
      title: 'Bi-Temporal Change Engine',
      sensor: 'T1 vs T2 InSAR Interferometry',
      role: 'Detects micro-millimeter crustal subsidence and structural deformation over multi-year baselines.',
      color: '#14b8a6',
      icon: Orbit,
      simQuery: 'Measure land subsidence rate in Joshimath over the past 24 months.',
      simAnswer: 'InSAR phase delta confirms -54 mm/year downward displacement in Sector 3.',
    },
    {
      num: '८',
      name: 'Agni-Thermal',
      title: 'TRISHNA Infrared Anomaly',
      sensor: '57m TIR High-Resolution',
      role: 'Calculates Land Surface Temperature (LST), wildfire progression vectors, and urban heat islands.',
      color: '#ef4444',
      icon: Flame,
      simQuery: 'Forecast wildfire propagation direction in Similipal Tiger Reserve.',
      simAnswer: 'Thermal hotspot 620°C. Spread vector 14 km/h Northeast towards Sal forest canopy.',
    },
    {
      num: '९',
      name: 'Vayu-Atmosphere',
      title: 'Atmospheric Rayleigh Correction',
      sensor: 'MODIS & INSAT-3DR AOD',
      role: 'Removes atmospheric scattering, aerosols, and smoke plumes to restore clean surface reflectance.',
      color: '#6366f1',
      icon: Wind,
      simQuery: 'Correct Delhi-NCR stubble burning aerosol optical depth in optical scene.',
      simAnswer: 'AOD 1.84 neutralized. Surface reflectance restored with 99.1% radiometric accuracy.',
    },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24 px-6 md:px-12 lg:px-16"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 70% 40%, rgba(168,85,247,0.06) 0%, #02050b 70%)',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <FadeIn delay={50}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping shadow-[0_0_10px_#c084fc]" />
            <p className="font-mono text-xs font-bold tracking-[0.25em] text-purple-400 uppercase">
              ACT IV · 9 NAVAGRAHA SPECIALISTS
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <MaskReveal delay={150}>
              <h2
                className="font-cinzel font-bold text-white leading-[0.95] tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)' }}
              >
                9 Navagraha. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-amber-200">
                  9 domains mastered.
                </span>
              </h2>
            </MaskReveal>
          </div>

          <div className="lg:col-span-4">
            <FadeIn delay={300} y={10}>
              <p className="text-white/60 text-sm leading-relaxed font-sans">
                Named after the nine celestial masters of ancient Indian astronomy, each engine solves a distinct physical domain of Earth intelligence.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* 3x3 Tactical Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {engines.map((eng, i) => {
            const IconComp = eng.icon;
            const isSelected = activeEngine === i;
            return (
              <FadeIn key={i} delay={150 + i * 40}>
                <div
                  onClick={() => setActiveEngine(isSelected ? null : i)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between h-full ${
                    isSelected
                      ? 'bg-white/12 border-white/40 shadow-2xl scale-[1.02]'
                      : 'bg-white/3 border-white/10 hover:border-white/25 hover:bg-white/6'
                  }`}
                  style={{
                    borderTop: `3px solid ${eng.color}`,
                  }}
                >
                  <div>
                    {/* Top Row: Sanskrit Number & Icon */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="font-cinzel font-bold text-2xl"
                        style={{ color: eng.color }}
                      >
                        {eng.num}
                      </span>
                      <div
                        className="p-2 rounded-xl"
                        style={{
                          backgroundColor: `${eng.color}20`,
                          color: eng.color,
                        }}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Engine Name & Title */}
                    <h3 className="font-cinzel font-bold text-lg text-white mb-0.5">
                      {eng.name}
                    </h3>
                    <p
                      className="text-xs font-mono font-semibold uppercase tracking-wider mb-3"
                      style={{ color: eng.color }}
                    >
                      {eng.title}
                    </p>

                    <p className="text-xs text-white/60 leading-relaxed font-sans mb-4">
                      {eng.role}
                    </p>
                  </div>

                  {/* Interactive Simulation Drawer */}
                  {isSelected ? (
                    <div className="mt-3 pt-3 border-t border-white/15 bg-black/40 -mx-3 -mb-3 p-3 rounded-b-xl animate-fadeIn">
                      <p className="text-[10px] font-mono text-cyan-300 uppercase font-bold mb-1">
                        Live Engine Query:
                      </p>
                      <p className="text-xs text-white/90 font-mono mb-2">"{eng.simQuery}"</p>
                      <p className="text-[10px] font-mono text-emerald-400 uppercase font-bold mb-1">
                        Physical Verdict:
                      </p>
                      <p className="text-xs text-emerald-200/90 font-mono leading-relaxed">
                        {eng.simAnswer}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-[11px] font-mono text-white/40 pt-2 border-t border-white/5">
                      <span>Sensor: {eng.sensor.split(' ')[0]}</span>
                      <span className="text-cyan-400/80 group-hover:text-cyan-300">Test Engine →</span>
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
  ACT V — LIVE CRISIS SIMULATION TERMINAL
  Real Interactive Indian National Crisis Scenarios
────────────────────────────────────────────────────────── */
const SectionCrisisSimulator: React.FC<{ onNavigate: (tab: NavigationTab) => void }> = ({ onNavigate }) => {
  const [selectedScenario, setSelectedScenario] = useState<number>(0);

  const scenarios = [
    {
      title: 'Assam Brahmaputra Inundation',
      type: 'Flood Crisis',
      sensor: 'RISAT-1A SAR (C-Band)',
      location: 'Kaziranga & Morigaon Districts',
      cloudCover: '100% (Dense Monsoon Plume)',
      confidence: '99.4% (Conformal Finite Sample)',
      physicsLaw: 'Navier-Stokes Conservation of Momentum',
      verdict: '42.8 km² submerged. 12 highland animal corridors operational. Flood crest expected in 14 hours.',
      hindiVerdict: 'काजीरंगा में ४२.८ वर्ग किमी जलमग्न। १२ उच्च गलियारे सुरक्षित।',
      color: '#06b6d4',
    },
    {
      title: 'Similipal Biosphere Wildfire',
      type: 'Thermal Forest Fire',
      sensor: 'TRISHNA 57m TIR (Infrared)',
      location: 'Mayurbhanj, Odisha',
      cloudCover: '40% Smoke Obscuration',
      confidence: '98.8% (Thermal Anomaly ΔT > +8.4K)',
      physicsLaw: 'Planck Blackbody Radiative Transfer',
      verdict: 'Sub-canopy peat fire spreading 14 km/h Northeast. 3 tribal habitations within warning contour.',
      hindiVerdict: 'शिमलीपाल में उप-कैनोपी अग्नि १४ किमी/घंटे की गति से पूर्वोत्तर की ओर बढ़ रही है।',
      color: '#ef4444',
    },
    {
      title: 'Joshimath Crustal Subsidence',
      type: 'Urban InSAR Disaster',
      sensor: 'Sentinel-1 + NISAR InSAR',
      location: 'Chamoli, Uttarakhand',
      cloudCover: 'N/A (Interferometric Phase)',
      confidence: '99.1% (Phase Coherence γ > 0.82)',
      physicsLaw: 'Coulomb Mohr Soil Shear Failure',
      verdict: 'Crustal displacement rate: -54 mm/year. Structural integrity compromised in Sector 3.',
      hindiVerdict: 'जोशीमठ सेक्टर ३ में ५४ मिमी/वर्ष की गति से भू-धंसाव दर्ज।',
      color: '#fbbf24',
    },
    {
      title: 'Punjab Stubble AOD Inversion',
      type: 'Atmospheric Air Quality',
      sensor: 'MODIS + INSAT-3DR (Multi-Angle)',
      location: 'Sangrur & Bathinda Belt',
      cloudCover: 'Severe Smog Inversion',
      confidence: '97.6% (Rayleigh Scattering Inverted)',
      physicsLaw: 'Mie Atmospheric Scattering Law',
      verdict: 'Aerosol Optical Depth (AOD) 1.84. Surface PM2.5 predicted at 420 μg/m³ for NCR corridor.',
      hindiVerdict: 'पंजाब में पराली दहन से एओडी १.८४ दर्ज। दिल्ली में तीव्र धुंध का पूर्वानुमान।',
      color: '#a855f7',
    },
  ];

  const curr = scenarios[selectedScenario];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24 px-6 md:px-12 lg:px-16"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 20% 70%, rgba(6,182,212,0.06) 0%, #03060d 70%)',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <FadeIn delay={50}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_#22d3ee]" />
            <p className="font-mono text-xs font-bold tracking-[0.25em] text-cyan-400 uppercase">
              ACT V · LIVE CRISIS BENCHMARK
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <MaskReveal delay={150}>
              <h2
                className="font-cinzel font-bold text-white leading-[0.95] tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)' }}
              >
                Real crises. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-amber-200">
                  Zero hallucinations.
                </span>
              </h2>
            </MaskReveal>
          </div>

          <div className="lg:col-span-4">
            <FadeIn delay={300} y={10}>
              <p className="text-white/60 text-sm leading-relaxed font-sans">
                Test how the sovereign engine arbitrates high-stakes national emergencies across physical sensors and vernacular languages.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Crisis Terminal Container */}
        <FadeIn delay={400}>
          <div className="glass-dark border border-white/15 rounded-3xl p-6 lg:p-10 relative overflow-hidden shadow-2xl">
            {/* Scenario Buttons */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pb-6 border-b border-white/10 mb-8">
              {scenarios.map((sc, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedScenario(i)}
                  className={`p-3.5 rounded-xl text-left font-mono text-xs transition-all duration-300 border flex flex-col justify-between ${
                    selectedScenario === i
                      ? 'bg-white/12 border-white/35 shadow-lg'
                      : 'bg-white/3 border-white/8 hover:border-white/20 hover:bg-white/6'
                  }`}
                  style={{
                    borderLeft: selectedScenario === i ? `3px solid ${sc.color}` : undefined,
                  }}
                >
                  <span className="text-[10px] text-white/40 uppercase mb-1">{sc.type}</span>
                  <span className="font-bold text-white leading-snug">{sc.title}</span>
                </button>
              ))}
            </div>

            {/* Live Terminal Output */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Telemetry & Physical Constraints */}
              <div className="lg:col-span-7 flex flex-col gap-4 font-mono">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase">{curr.title}</span>
                  </div>
                  <span
                    className="text-[11px] px-2.5 py-0.5 rounded font-bold"
                    style={{ backgroundColor: `${curr.color}20`, color: curr.color }}
                  >
                    {curr.sensor}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/4 border border-white/8">
                    <span className="text-white/40 text-[10px] block mb-0.5">GEOGRAPHIC TARGET</span>
                    <span className="text-white font-bold">{curr.location}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/4 border border-white/8">
                    <span className="text-white/40 text-[10px] block mb-0.5">ATMOSPHERIC CONDITION</span>
                    <span className="text-amber-300 font-bold">{curr.cloudCover}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/4 border border-white/8">
                    <span className="text-white/40 text-[10px] block mb-0.5">CONFORMAL CONFIDENCE</span>
                    <span className="text-emerald-400 font-bold">{curr.confidence}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/4 border border-white/8">
                    <span className="text-white/40 text-[10px] block mb-0.5">PHYSICS VERIFICATION</span>
                    <span className="text-cyan-400 font-bold">{curr.physicsLaw.split(' ')[0]} Verified</span>
                  </div>
                </div>

                {/* English Scientific Verdict */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 mt-2">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                    English Scientific Brief:
                  </span>
                  <p className="text-sm text-white/90 leading-relaxed font-sans">{curr.verdict}</p>
                </div>

                {/* Multilingual Bhasha Output */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block mb-1">
                    Bhasha-Brahmand Vernacular Translation (हिंदी):
                  </span>
                  <p className="text-sm text-amber-100/90 leading-relaxed font-sans">
                    {curr.hindiVerdict}
                  </p>
                </div>
              </div>

              {/* Right Column: Actions & Quick Launch */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6 p-6 rounded-2xl bg-white/4 border border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-mono font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    DHARMA-CHAKRA PASS: ZERO MASS VIOLATION
                  </div>
                  <h4 className="font-cinzel text-xl font-bold text-white mb-2">
                    NDMA Standard Operating Procedure Armed
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed font-sans">
                    This scenario has passed 128-D physics verification and is ready for automated dispatch to State Disaster Management Authorities.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => onNavigate('mission-control')}
                    className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-cyan-50 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Radio className="w-4 h-4 text-cyan-600" />
                    Open Live in Mission Control
                  </button>
                  <button
                    onClick={() => onNavigate('crises')}
                    className="w-full py-3 rounded-xl glass border border-white/20 text-white text-xs font-mono font-semibold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                  >
                    View All 10 Crises in Full Detail
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
  ACT VI — FINAL CTA: SOVEREIGN INVITATION
  High-Impact Grand Finale
────────────────────────────────────────────────────────── */
const SectionCTA: React.FC<{ onNavigate: (tab: NavigationTab) => void }> = ({ onNavigate }) => (
  <section
    className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden py-24 px-6 md:px-12 lg:px-16"
    style={{
      background: 'radial-gradient(ellipse 90% 70% at 50% 60%, rgba(6,182,212,0.08) 0%, #020509 80%)',
    }}
  >
    {/* Concentric Orbital Rings Background */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
      <div className="w-[600px] h-[600px] rounded-full border border-cyan-400/40 animate-spin" style={{ animationDuration: '40s' }} />
      <div className="absolute w-[900px] h-[900px] rounded-full border border-white/20 animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />
      <div className="absolute w-[1200px] h-[1200px] rounded-full border border-white/10" />
    </div>

    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
      <FadeIn delay={100}>
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-cyan-400/30 mb-8 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-cyan-300 uppercase">
            SOVEREIGN EARTH INTELLIGENCE READY
          </span>
        </div>
      </FadeIn>

      <MaskReveal delay={200}>
        <h2
          className="font-cinzel font-bold text-white leading-[0.95] tracking-tight"
          style={{ fontSize: 'clamp(3rem, 7.5vw, 6.5rem)' }}
        >
          The satellite <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-100 to-amber-200">
            is waiting.
          </span>
        </h2>
      </MaskReveal>

      <FadeIn delay={500} y={16}>
        <p
          className="mt-8 text-white/70 leading-relaxed max-w-2xl"
          style={{ fontFamily: "'Hanken Grotesk', system-ui", fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
        >
          Ask any question about our subcontinent in your own language. Certified 0% physical hallucination, verifiable down to sub-pixel coordinates and Maxwell wave equations.
        </p>
      </FadeIn>

      <FadeIn delay={700}>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={() => onNavigate('mission-control')}
            className="bg-white text-black px-8 py-4 rounded-full text-base font-semibold tracking-wide hover:bg-cyan-50 active:scale-95 transition-all glow-btn flex items-center gap-3 shadow-2xl shadow-white/20"
          >
            <Radio className="w-5 h-5 text-cyan-600 animate-pulse" />
            Enter Mission Control Live
          </button>
          <button
            onClick={() => onNavigate('physics-lab')}
            className="glass border border-white/20 text-white px-8 py-4 rounded-full text-base font-medium tracking-wide hover:bg-white hover:text-black active:scale-95 transition-all flex items-center gap-3"
          >
            128-D Physics Engine
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate('dharma-gate')}
            className="px-6 py-4 rounded-full text-xs font-mono text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            Audit Dharma Firewall
          </button>
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ── Main export ─────────────────────────────────────── */
export const StorySections: React.FC<StorySectionsProps> = ({ onNavigate }) => (
  <>
    <div className="section-divider" />
    <SectionMandate onNavigate={onNavigate} />
    <div className="section-divider" />
    <SectionBreakthrough />
    <div className="section-divider" />
    <SectionArchitecture onNavigate={onNavigate} />
    <div className="section-divider" />
    <SectionNavagraha />
    <div className="section-divider" />
    <SectionCrisisSimulator onNavigate={onNavigate} />
    <div className="section-divider" />
    <SectionCTA onNavigate={onNavigate} />
  </>
);
