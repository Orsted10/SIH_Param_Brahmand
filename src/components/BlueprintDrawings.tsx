import React, { useState } from 'react';
import { Radio, ShieldCheck, Cpu, Eye, Zap, Activity, Waves, Sparkles, Layers } from 'lucide-react';

/**
 * Google Blueprint-Style Vector Satellite Schematic
 * Hand-drawn tech outline aesthetic inspired by Google AI / Android blueprint art
 */
export const SatelliteBlueprint: React.FC<{ activeScope?: number }> = ({ activeScope = 1 }) => {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto liquid-glass-strong rounded-3xl p-6 border border-cyan-500/30 flex flex-col items-center justify-center overflow-hidden group">
      
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
      
      {/* SVG Blueprint Illustration */}
      <svg className="w-full h-64 relative z-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Orbit Rings (Drawn Style) */}
        <circle cx="200" cy="200" r="160" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="6 6" className="opacity-40 animate-spin-slow" />
        <circle cx="200" cy="200" r="110" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" className="opacity-30" />

        {/* Satellite Main Chassis (Hand-Drawn Double Outline Look) */}
        <rect x="160" y="160" width="80" height="80" rx="12" stroke="#38bdf8" strokeWidth="2.5" fill="url(#cyanGlow)" />
        <rect x="166" y="166" width="68" height="68" rx="8" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />

        {/* Solar Wings (Left & Right) */}
        <g className="animate-pulse">
          <rect x="60" y="180" width="85" height="40" rx="6" stroke="#38bdf8" strokeWidth="2" fill="#09090b" />
          <line x1="88" y1="180" x2="88" y2="220" stroke="#06b6d4" strokeWidth="1" />
          <line x1="116" y1="180" x2="116" y2="220" stroke="#06b6d4" strokeWidth="1" />

          <rect x="255" y="180" width="85" height="40" rx="6" stroke="#38bdf8" strokeWidth="2" fill="#09090b" />
          <line x1="283" y1="180" x2="283" y2="220" stroke="#06b6d4" strokeWidth="1" />
          <line x1="311" y1="180" x2="311" y2="220" stroke="#06b6d4" strokeWidth="1" />
        </g>

        {/* Optical Lens & Radar Dish (Center) */}
        <circle cx="200" cy="200" r="22" stroke="#f59e0b" strokeWidth="2" fill="#09090b" />
        <circle cx="200" cy="200" r="12" fill="#f59e0b" className="animate-ping opacity-60" />
        <circle cx="200" cy="200" r="6" fill="#ffffff" />

        {/* Radar Beams / Signal Cone downwards */}
        <path d="M175 240 L100 360 L300 360 L225 240 Z" fill="url(#cyanGlow)" opacity="0.35" />
        <line x1="200" y1="240" x2="200" y2="360" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />

        {/* Pulsing Signal Wave Pulses */}
        <path d="M150 290 Q200 310 250 290" stroke="#38bdf8" strokeWidth="2" fill="none" opacity="0.8" />
        <path d="M130 325 Q200 350 270 325" stroke="#f59e0b" strokeWidth="2" fill="none" opacity="0.9" />

        {/* Data Target Bounding Box */}
        <rect x="140" y="335" width="120" height="40" rx="6" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" fill="#030712" opacity="0.9" />
        <text x="200" y="358" textAnchor="middle" fill="#10b981" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
          {activeScope === 1 ? 'CARTOSAT-3: 0.28m VQA' : 'RISAT-1A + NISAR SAR'}
        </text>

        {/* Floating Blueprint Dimension Markers */}
        <line x1="50" y1="140" x2="350" y2="140" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
        <text x="200" y="132" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">λ = C/L Band Radar (Dual Pol)</text>
      </svg>

      {/* Blueprint Footer Label */}
      <div className="relative z-10 mt-2 flex items-center justify-between w-full pt-3 border-t border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>ISRO SAC Telemetry Active</span>
        </div>
        <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
          PS 26167 Blueprint
        </span>
      </div>
    </div>
  );
};


/**
 * Dual-Gauge Visual Comparator for "Why Standard AI Fails in Space"
 */
export const VisualComparator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const metrics = [
    {
      title: '128-D Physics vs RGB Blindness',
      badName: 'Standard Vision LLMs',
      badMetric: '3-Channel RGB Only (85% Loss)',
      badColor: 'from-red-500/20 to-red-950/40',
      badBorder: 'border-red-500/40',
      badVal: 15,
      goodName: 'PARAM-BRAHMAND 128-D',
      goodMetric: '128-D Wave Manifold (100% Ingest)',
      goodColor: 'from-cyan-500/20 to-blue-950/40',
      goodBorder: 'border-cyan-500/40',
      goodVal: 100,
      desc: 'Standard AI discards polarimetric SAR phase & multispectral bands. PARAM-BRAHMAND ingests Yamaguchi AG4U + RVoG PolInSAR directly.'
    },
    {
      title: 'Linear Memory vs O(N²) Memory Crash',
      badName: 'Standard Vision Transformer',
      badMetric: '34 GB VRAM Crash @ 4K',
      badColor: 'from-amber-500/20 to-amber-950/40',
      badBorder: 'border-amber-500/40',
      badVal: 95,
      goodName: 'Geo-Mamba 3.0 Linear',
      goodMetric: '1.2 GB VRAM @ 45 FPS',
      goodColor: 'from-emerald-500/20 to-teal-950/40',
      goodBorder: 'border-emerald-500/40',
      goodVal: 18,
      desc: 'Standard Transformers explode quadratically O(N²). Geo-Mamba 3.0 runs 16-directional continuous state space in linear O(L) time.'
    },
    {
      title: 'Monsoon Cloud Penetration',
      badName: 'Optical Space Cameras',
      badMetric: '0% Cloud Penetration',
      badColor: 'from-red-500/20 to-red-950/40',
      badBorder: 'border-red-500/40',
      badVal: 0,
      goodName: 'Kaal-Radar C/L SAR',
      goodMetric: '97.2% Cloud & Tree Penetration',
      goodColor: 'from-cyan-500/20 to-blue-950/40',
      goodBorder: 'border-cyan-500/40',
      goodVal: 97,
      desc: 'Heavy monsoon storm clouds blind optical sensors. Kaal-Radar penetrates cloud deck and tree canopy using RISAT-1A C/L-band radar.'
    },
    {
      title: 'Causal Change vs False Alarm',
      badName: 'Pixel Differencing AI',
      badMetric: '94.8% Seasonal False Alarms',
      badColor: 'from-red-500/20 to-red-950/40',
      badBorder: 'border-red-500/40',
      badVal: 88,
      goodName: 'Vivek-Causal SCM',
      goodMetric: '0.00% False Alarms (p > 0.99)',
      goodColor: 'from-purple-500/20 to-indigo-950/40',
      goodBorder: 'border-purple-500/40',
      goodVal: 5,
      desc: 'Pixel differencing mistakes seasonal monsoon greening with deforestation. Vivek-Causal DAGs isolate true human activity.'
    }
  ];

  const current = metrics[activeTab];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      
      {/* Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((m, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`p-3 rounded-2xl text-xs font-bold font-sans transition-all text-left flex flex-col justify-between gap-2 border ${
              activeTab === idx
                ? 'liquid-glass-strong border-cyan-400 text-white shadow-xl scale-[1.03]'
                : 'liquid-glass border-white/10 text-gray-400 hover:text-white hover:border-white/30'
            }`}
          >
            <span className="text-[10px] font-mono uppercase text-cyan-400">Innovation 0{idx + 1}</span>
            <span className="leading-tight">{m.title}</span>
          </button>
        ))}
      </div>

      {/* Visual Dual Meter Display */}
      <div className="liquid-glass-strong rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Status Quo Failure */}
        <div className={`rounded-2xl p-6 bg-gradient-to-br ${current.badColor} border ${current.badBorder} flex flex-col gap-4 relative overflow-hidden`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">✘ Status Quo Failure</span>
            <span className="text-xs font-bold text-red-300 font-mono">{current.badMetric}</span>
          </div>

          <h4 className="text-xl font-bold text-white">{current.badName}</h4>

          {/* Meter Bar */}
          <div className="w-full bg-space-950/80 rounded-full h-4 p-0.5 border border-red-500/30">
            <div 
              className="bg-gradient-to-r from-red-600 to-rose-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${current.badVal}%` }}
            />
          </div>

          <p className="text-xs text-red-200/80 font-grotesk leading-relaxed">
            Explodes in resource consumption or fails under cloud cover and seasonal changes.
          </p>
        </div>

        {/* Right Side: PARAM-BRAHMAND Solution */}
        <div className={`rounded-2xl p-6 bg-gradient-to-br ${current.goodColor} border ${current.goodBorder} flex flex-col gap-4 relative overflow-hidden shadow-2xl`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">✔ PARAM-BRAHMAND Solution</span>
            <span className="text-xs font-bold text-emerald-300 font-mono">{current.goodMetric}</span>
          </div>

          <h4 className="text-xl font-bold text-white">{current.goodName}</h4>

          {/* Meter Bar */}
          <div className="w-full bg-space-950/80 rounded-full h-4 p-0.5 border border-cyan-500/30">
            <div 
              className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300 h-full rounded-full transition-all duration-700 button-glow-cyan"
              style={{ width: `${current.goodVal}%` }}
            />
          </div>

          <p className="text-xs text-cyan-100 font-grotesk leading-relaxed">
            {current.desc}
          </p>
        </div>

      </div>
    </div>
  );
};


/**
 * Glowing Dharma Chakra Wheel Blueprint Illustration
 */
export const DharmaChakraWheel: React.FC = () => {
  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />

      {/* SVG 24-Spoke Wheel */}
      <svg className="w-full h-full relative z-10 animate-spin-slow" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="90" stroke="#06b6d4" strokeWidth="3" strokeDasharray="12 4" />
        <circle cx="100" cy="100" r="82" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="30" stroke="#06b6d4" strokeWidth="3" fill="#030712" />
        <circle cx="100" cy="100" r="10" fill="#f59e0b" />

        {/* 24 Spokes */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const rad = (angle * Math.PI) / 180;
          const x2 = 100 + 82 * Math.cos(rad);
          const y2 = 100 + 82 * Math.sin(rad);
          return (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={x2}
              y2={y2}
              stroke={i % 2 === 0 ? "#06b6d4" : "#f59e0b"}
              strokeWidth={i % 6 === 0 ? "2" : "1"}
              opacity={0.8}
            />
          );
        })}
      </svg>

      {/* Center 0% Badge */}
      <div className="absolute z-20 text-center flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xl font-bold font-mono text-cyan-300">0.00%</span>
        <span className="text-[9px] font-mono text-amber-400 font-bold uppercase">Hallucination</span>
      </div>
    </div>
  );
};


/**
 * Navagraha Orbital System Graphic
 */
export const NavagrahaOrbitalSystem: React.FC<{ onSelectEngine?: (id: string) => void }> = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const engines = [
    { name: 'Bhoomi', role: 'Optical VQA', color: '#06b6d4', angle: 0 },
    { name: 'Kaal', role: 'SAR Polarimetry', color: '#f59e0b', angle: 40 },
    { name: 'Surya', role: '4-Tier Caption', color: '#10b981', angle: 80 },
    { name: 'Sparsh', role: 'Sub-Pixel Ground', color: '#3b82f6', angle: 120 },
    { name: 'Vivek', role: 'Pearl Causal SCM', color: '#8b5cf6', angle: 160 },
    { name: 'Prakriti', role: '128-D Physics', color: '#ec4899', angle: 200 },
    { name: 'Gati', role: 'Bi-Temporal Pair', color: '#14b8a6', angle: 240 },
    { name: 'Agni', role: 'TRISHNA Thermal', color: '#ef4444', angle: 280 },
    { name: 'Vayu', role: 'Atmosphere Correct', color: '#6366f1', angle: 320 },
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto aspect-square liquid-glass-strong rounded-3xl p-6 border border-purple-500/30 flex items-center justify-center overflow-hidden">
      
      {/* Background Starfield Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

      {/* Center Core */}
      <div className="relative z-20 w-32 h-32 rounded-full bg-gradient-to-tr from-purple-900/80 via-space-950 to-cyan-900/80 border-2 border-purple-400/60 shadow-2xl flex flex-col items-center justify-center text-center p-2 button-glow-cyan">
        <Sparkles className="w-6 h-6 text-cyan-300 animate-spin-slow mb-1" />
        <span className="font-bold text-xs text-white tracking-wider uppercase font-mono">CORE ENGINE</span>
        <span className="text-[9px] text-purple-300 font-mono">ISRO SAC 26167</span>
      </div>

      {/* Orbit Track Rings */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="140" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
        <circle cx="200" cy="200" r="95" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      </svg>

      {/* 9 Orbital Planet Nodes */}
      {engines.map((e, idx) => {
        const rad = (e.angle * Math.PI) / 180;
        const radius = 140;
        const x = 200 + radius * Math.cos(rad);
        const y = 200 + radius * Math.sin(rad);

        const isHovered = hoveredIdx === idx;

        return (
          <div
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{ left: `${(x / 400) * 100}%`, top: `${(y / 400) * 100}%` }}
            className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
              isHovered ? 'scale-125 z-40' : 'hover:scale-110'
            }`}
          >
            {/* Node Circle */}
            <div 
              className="w-10 h-10 rounded-full bg-space-950 border-2 flex items-center justify-center shadow-lg"
              style={{ borderColor: e.color }}
            >
              <div 
                className="w-3 h-3 rounded-full animate-ping"
                style={{ backgroundColor: e.color }}
              />
            </div>

            {/* Label Badge */}
            <div className="absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap bg-space-950/90 border border-white/20 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-white shadow-xl pointer-events-none">
              <span className="font-bold">{e.name}</span>
              {isHovered && <span className="text-gray-400 block text-[8px]">{e.role}</span>}
            </div>
          </div>
        );
      })}

    </div>
  );
};
