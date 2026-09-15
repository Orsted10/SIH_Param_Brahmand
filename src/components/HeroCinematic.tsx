import React, { useState, useEffect, useRef } from 'react';
import { NavigationTab } from '../types';
import { ShieldCheck, Cpu, Radio, Layers, Sparkles, ChevronDown, ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const HeroCinematic: React.FC<HeroProps> = ({ onNavigate }) => {
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
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

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-space-950 flex flex-col justify-between pt-24 pb-10 px-4 md:px-12 lg:px-16"
    >
      {/* 1. Background Video Layer */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 scale-105 transition-all duration-1000"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
      />

      {/* 2. Cursor Spotlight Physical Radar Reveal Mask (Prompt 3 Lithos Mechanic) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-80 transition-opacity duration-300 hidden md:block"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1600&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          WebkitMaskImage: `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 80%)`,
          maskImage: `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 80%)`
        }}
      />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-950/80 via-transparent to-space-950 z-15 pointer-events-none" />

      {/* Main Hero Header Content */}
      <div className="relative z-20 max-w-6xl mx-auto text-center flex flex-col items-center justify-center flex-1 my-auto">
        
        {/* Top Sovereign Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase mb-6 shadow-xl animate-pulse">
          <Sparkles className="w-4 h-4 text-isro-saffron" />
          <span>ISRO SAC Problem Statement ID: 26167</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Team TensorTitans</span>
        </div>

        {/* Sanskrit Motto Accent */}
        <p className="font-serif italic text-xl md:text-3xl text-isro-saffron/90 mb-3 text-glow-gold tracking-wide">
          "विश्वं पश्यति चक्षुषा विज्ञानेन च युज्यते"
        </p>

        {/* Massive Main Heading */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter leading-none mb-6">
          PARAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 text-glow-cyan">BRAHMAND</span>
        </h1>

        {/* Platform Slogan & Subtitle */}
        <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-gray-200 max-w-3xl mb-4 font-normal">
          "Not Just Seeing Satellites — Understanding the Earth's Living Physics."
        </p>

        <p className="text-sm md:text-base text-gray-300/90 max-w-2xl leading-relaxed mb-8">
          The sovereign multimodal vision-language intelligence platform fusing 128-D physics wave mechanics (PolSAR/PolInSAR), linear state-space deep learning (Geo-Mamba 3.0), and 0% physical hallucination firewalls.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={() => onNavigate('mission-control')}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-400 text-white font-bold text-sm tracking-wider uppercase shadow-2xl button-glow-cyan hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <Radio className="w-5 h-5 text-cyan-200 animate-spin-slow" />
            <span>Launch Mission Control</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('crises')}
            className="px-8 py-4 rounded-full liquid-glass-strong border border-amber-500/40 text-amber-200 font-bold text-sm tracking-wider uppercase hover:bg-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <Layers className="w-5 h-5 text-amber-400" />
            <span>Explore 10 Crisis Scenarios</span>
          </button>

          <button
            onClick={() => onNavigate('physics-lab')}
            className="px-8 py-4 rounded-full liquid-glass border border-cyan-400/30 text-cyan-200 font-bold text-sm tracking-wider uppercase hover:bg-cyan-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>128-D Physics Lab</span>
          </button>
        </div>

        {/* Interactive Feature Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl w-full">
          <div className="liquid-glass rounded-xl p-3 text-center border border-white/10 hover:border-cyan-400/50 transition-colors">
            <span className="text-xs text-gray-400 block mb-0.5">O(L) Linear Scaling</span>
            <span className="font-bold text-sm text-cyan-300">Geo-Mamba 3.0</span>
          </div>
          <div className="liquid-glass rounded-xl p-3 text-center border border-white/10 hover:border-amber-400/50 transition-colors">
            <span className="text-xs text-gray-400 block mb-0.5">All-Weather SAR</span>
            <span className="font-bold text-sm text-amber-300">RISAT-1A & NISAR</span>
          </div>
          <div className="liquid-glass rounded-xl p-3 text-center border border-white/10 hover:border-emerald-400/50 transition-colors">
            <span className="text-xs text-gray-400 block mb-0.5">Causal Reasoning</span>
            <span className="font-bold text-sm text-emerald-300">Pearl SCM do-calculus</span>
          </div>
          <div className="liquid-glass rounded-xl p-3 text-center border border-white/10 hover:border-purple-400/50 transition-colors">
            <span className="text-xs text-gray-400 block mb-0.5">Zero Hallucination</span>
            <span className="font-bold text-sm text-purple-300">Dharma Physics Gate</span>
          </div>
        </div>
      </div>

      {/* Scroll Down Prompt */}
      <div className="relative z-20 text-center flex flex-col items-center">
        <button
          onClick={() => onNavigate('mission-control')}
          className="text-gray-400 hover:text-cyan-300 text-xs flex flex-col items-center gap-1 transition-colors group"
        >
          <span>Scroll to Interrogate Satellites</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-cyan-400" />
        </button>
      </div>
    </section>
  );
};
