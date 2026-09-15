import React, { useState } from 'react';
import { NavigationTab } from '../../types';
import { BlurReveal, FadeIn, MaskReveal } from '../motion/Animate';
import { ArrowRight, Radio } from 'lucide-react';

interface StorySectionsProps {
  onNavigate: (tab: NavigationTab) => void;
}

/* ─────────────────────────────────────────────────────────
  SECTION 1 — THE MANDATE
  Full-viewport. Prompt 4 Serene: "heading + subtext" style.
  Left big serif heading, right minimal text.
────────────────────────────────────────────────────────── */
const SectionMandate: React.FC<{ onNavigate: (tab: NavigationTab) => void }> = ({ onNavigate }) => (
  <section
    id="story"
    className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    style={{ padding: 'clamp(6rem, 10vw, 12rem) clamp(1.5rem, 8vw, 7rem)' }}
  >
    {/* Background grid */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
      }}
    />

    {/* Content */}
    <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      {/* Left — Big typographic statement (Prompt 4 Serene style) */}
      <div>
        <FadeIn delay={100}>
          <p className="font-mono text-[10px] tracking-[0.25em] text-cyan-500/60 uppercase mb-6">
            ISRO SAC · Problem Statement 26167
          </p>
        </FadeIn>

        <MaskReveal delay={200}>
          <h2
            className="font-cinzel font-bold text-white leading-none"
            style={{ fontSize: 'clamp(2.8rem, 6.5vw, 6rem)', letterSpacing: '-0.025em' }}
          >
            The Earth<br />
            speaks in<br />
            <span style={{ color: 'rgba(6,182,212,0.9)', textShadow: '0 0 40px rgba(6,182,212,0.4)' }}>physics.</span>
          </h2>
        </MaskReveal>

        <FadeIn delay={600} y={16}>
          <p
            className="mt-8 text-white/50 leading-relaxed max-w-sm"
            style={{ fontFamily: "'Hanken Grotesk', system-ui, sans-serif", fontSize: '1rem' }}
          >
            ISRO mandated a platform where space scientists, forest rangers, and rural citizens can interrogate satellite imagery in 22 Indian languages.
          </p>
        </FadeIn>

        <FadeIn delay={800}>
          <button
            onClick={() => onNavigate('mission-control')}
            className="mt-8 inline-flex items-center gap-2 text-white text-sm font-medium hover:gap-4 transition-all duration-300 group"
          >
            <span>Launch the platform</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </FadeIn>
      </div>

      {/* Right — Two scope cards (minimal, visual-first) */}
      <div className="flex flex-col gap-4">
        {[
          {
            num: '01',
            title: 'Single Scene VQA',
            sub: 'Cartosat-3 · 0.28m Optical',
            desc: 'Ask any natural language question about a satellite image. Get a 4-tier scientific caption back in your language.',
            accent: '#06b6d4',
          },
          {
            num: '02',
            title: 'Bi-Temporal Change',
            sub: 'RISAT-1A + NISAR · Dual-Pol SAR',
            desc: 'Upload T1 and T2 image pairs. Get pixel-precise change masks showing deforestation, floods, and urban spread.',
            accent: '#fbbf24',
          },
        ].map((card, i) => (
          <FadeIn key={i} delay={400 + i * 200} y={20}>
            <div
              className="card-hover glass-dark border border-white/8 rounded-2xl p-6 flex gap-5"
              style={{ borderLeft: `2px solid ${card.accent}40` }}
            >
              <div
                className="text-5xl font-bold font-mono opacity-15 flex-none"
                style={{ color: card.accent, lineHeight: 1 }}
              >
                {card.num}
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-[0.18em] text-white/30 uppercase mb-1">{card.sub}</p>
                <h3 className="font-cinzel font-bold text-white text-lg mb-2">{card.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed" style={{ fontFamily: "'Hanken Grotesk', system-ui" }}>
                  {card.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────
  SECTION 2 — THE BREAKTHROUGH
  Prompt 4 Quote-section style: huge contrast numbers with minimal labels.
  "94.8%" style big stat reveal, no text walls.
────────────────────────────────────────────────────────── */
const SectionBreakthrough: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState(0);

  const metrics = [
    {
      bad: { value: '85%', label: 'Physics data discarded', color: '#ef4444' },
      good: { value: '128-D', label: 'Physics manifold ingested', color: '#06b6d4' },
      title: 'Physics-First',
      desc: 'Standard AI treats satellite images like RGB smartphone photos, discarding SAR polarimetry & multispectral data. We ingest all 128 dimensions.',
    },
    {
      bad: { value: '34 GB', label: 'VRAM crash at 4K', color: '#f97316' },
      good: { value: '1.2 GB', label: 'Linear Geo-Mamba at 45 FPS', color: '#10b981' },
      title: 'Linear Memory',
      desc: 'Vision Transformers run O(N²) memory. Geo-Mamba 3.0 executes 16-directional state-space in strict O(L) linear time.',
    },
    {
      bad: { value: '0%', label: 'Cloud penetration (optical)', color: '#ef4444' },
      good: { value: '97.2%', label: 'SAR precision under cloud cover', color: '#06b6d4' },
      title: 'All-Weather Vision',
      desc: 'Monsoon clouds blind every optical satellite. Kaal-Radar penetrates cloud and tree canopy using C/L-band dual-polarization SAR.',
    },
    {
      bad: { value: '94.8%', label: 'False alarms from pixel diff', color: '#f97316' },
      good: { value: '0.00%', label: 'False causal detections (p>0.99)', color: '#a855f7' },
      title: 'Causal Intelligence',
      desc: 'Pixel differencing mistakes monsoon greening for deforestation. Vivek-Causal uses Pearl SCM do-calculus DAGs to isolate true human actions.',
    },
  ];

  const m = metrics[activeMetric];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ padding: 'clamp(5rem, 8vw, 10rem) clamp(1.5rem, 8vw, 7rem)', background: '#030712' }}
    >
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '60vmax',
          height: '60vmax',
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">

        <FadeIn delay={100}>
          <p className="font-mono text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">
            ACT II · Why Standard AI Fails
          </p>
        </FadeIn>

        <MaskReveal delay={200}>
          <h2
            className="font-cinzel font-bold text-white mb-16"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.025em', lineHeight: 0.95 }}
          >
            Four breakthroughs<br />
            <span className="text-white/30">standard AI can't match.</span>
          </h2>
        </MaskReveal>

        {/* Horizontal selector tabs */}
        <FadeIn delay={400}>
          <div className="flex items-center gap-2 mb-12 overflow-x-auto scrollbar-hide pb-1">
            {metrics.map((metric, i) => (
              <button
                key={i}
                onClick={() => setActiveMetric(i)}
                className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-300 border ${
                  activeMetric === i
                    ? 'bg-white text-black border-transparent'
                    : 'border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'
                }`}
              >
                {metric.title}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* The big visual comparison — Prompt 4 style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left — Two huge contrasting numbers */}
          <FadeIn delay={200} key={`${activeMetric}-left`}>
            <div className="flex gap-8 lg:gap-12 items-end">
              
              {/* BAD stat */}
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: `${m.bad.color}60` }}>
                  Legacy AI
                </p>
                <div
                  className="font-cinzel font-bold leading-none"
                  style={{
                    fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                    color: m.bad.color,
                    opacity: 0.6,
                    letterSpacing: '-0.04em',
                    textDecoration: 'line-through',
                    textDecorationColor: `${m.bad.color}60`,
                  }}
                >
                  {m.bad.value}
                </div>
                <p className="font-mono text-[10px] text-white/25 mt-1 max-w-[12ch] leading-relaxed">
                  {m.bad.label}
                </p>
              </div>

              <div className="text-white/10 text-4xl font-thin mb-8">→</div>

              {/* GOOD stat */}
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: `${m.good.color}80` }}>
                  PARAM-BRAHMAND
                </p>
                <div
                  className="font-cinzel font-bold leading-none"
                  style={{
                    fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                    color: m.good.color,
                    letterSpacing: '-0.04em',
                    textShadow: `0 0 60px ${m.good.color}40`,
                  }}
                >
                  {m.good.value}
                </div>
                <p className="font-mono text-[10px] mt-1 max-w-[14ch] leading-relaxed" style={{ color: `${m.good.color}60` }}>
                  {m.good.label}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right — Single sentence description */}
          <FadeIn delay={300} key={`${activeMetric}-right`} y={20}>
            <div className="border-l border-white/10 pl-8 lg:pl-12">
              <h3
                className="font-cinzel font-bold text-white mb-4"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', lineHeight: 1.1 }}
              >
                {m.title}
              </h3>
              <p
                className="text-white/45 leading-relaxed"
                style={{ fontFamily: "'Hanken Grotesk', system-ui", fontSize: '1rem' }}
              >
                {m.desc}
              </p>
              {/* Visual progress */}
              <div className="mt-8 flex flex-col gap-2">
                {metrics.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveMetric(i)}
                    className="w-full h-px rounded-full transition-all duration-500 cursor-pointer"
                    style={{
                      background: i === activeMetric
                        ? `linear-gradient(90deg, ${m.good.color}, ${m.good.color}40)`
                        : 'rgba(255,255,255,0.06)',
                      height: i === activeMetric ? '2px' : '1px',
                    }}
                  />
                ))}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
  SECTION 3 — THE 7-LAYER ARCHITECTURE
  Minimal list reveal — each layer slides in as a thin row.
  Visual-first: the LAYER NUMBER is the hero element.
────────────────────────────────────────────────────────── */
const SectionArchitecture: React.FC<{ onNavigate: (tab: NavigationTab) => void }> = ({ onNavigate }) => {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const layers = [
    { num: 7, name: 'Bhasha-Brahmand', tag: '22 Indian Languages', color: '#fbbf24' },
    { num: 6, name: 'Dharma-Chakra Firewall', tag: '0% Hallucination', color: '#06b6d4' },
    { num: 5, name: 'GeoCP-v2 Calibration', tag: '≥95% Coverage', color: '#a855f7' },
    { num: 4, name: 'Navagraha Ensemble', tag: '9 AI Specialists', color: '#10b981' },
    { num: 3, name: 'Sankalpa MCTS Router', tag: 'JSON Trace', color: '#3b82f6' },
    { num: 2, name: 'Geo-Mamba 3.0', tag: '380ms · 45 FPS', color: '#22d3ee' },
    { num: 1, name: 'Prakriti-Veda Manifold', tag: '128-D Physics', color: '#f97316' },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ padding: 'clamp(5rem, 8vw, 10rem) clamp(1.5rem, 8vw, 7rem)' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">

        <FadeIn delay={100}>
          <p className="font-mono text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">
            ACT III · System Architecture
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left — Heading + CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <MaskReveal delay={200}>
              <h2
                className="font-cinzel font-bold text-white leading-none"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.025em' }}
              >
                Seven layers.<br />
                <span className="text-white/25">One Earth OS.</span>
              </h2>
            </MaskReveal>

            <FadeIn delay={500} y={16}>
              <p
                className="mt-6 text-white/40 leading-relaxed max-w-xs text-sm"
                style={{ fontFamily: "'Hanken Grotesk', system-ui" }}
              >
                Every layer was engineered to solve a specific scientific failure point. Click any layer to inspect.
              </p>
            </FadeIn>

            {activeLayer !== null && (
              <FadeIn delay={0} y={10}>
                <div
                  className="mt-8 glass-dark border border-white/8 rounded-2xl p-5"
                  style={{ borderLeft: `2px solid ${layers.find(l => l.num === activeLayer)?.color}60` }}
                >
                  <p className="font-mono text-[10px] tracking-[0.18em] text-white/30 uppercase mb-1">
                    Layer {activeLayer} · Active
                  </p>
                  <h3 className="font-cinzel font-bold text-white text-base">
                    {layers.find(l => l.num === activeLayer)?.name}
                  </h3>
                  <p className="text-[11px] font-mono mt-1.5" style={{ color: layers.find(l => l.num === activeLayer)?.color }}>
                    {layers.find(l => l.num === activeLayer)?.tag}
                  </p>
                </div>
              </FadeIn>
            )}

            <FadeIn delay={700}>
              <button
                onClick={() => onNavigate('physics-lab')}
                className="mt-8 inline-flex items-center gap-2 text-white text-sm font-medium hover:gap-4 transition-all duration-300 group"
              >
                <span>Inspect 128-D Physics Lab</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </FadeIn>
          </div>

          {/* Right — Layer rows */}
          <div className="lg:col-span-7 flex flex-col gap-0">
            {layers.map((layer, i) => (
              <FadeIn key={layer.num} delay={300 + i * 80} y={12}>
                <button
                  onClick={() => setActiveLayer(activeLayer === layer.num ? null : layer.num)}
                  className="w-full group text-left"
                >
                  <div
                    className={`flex items-center gap-5 py-4 border-b transition-all duration-300 ${
                      activeLayer === layer.num
                        ? 'border-white/15'
                        : 'border-white/5 hover:border-white/10'
                    }`}
                  >
                    {/* Layer number — big and faded */}
                    <span
                      className="font-cinzel font-bold text-4xl w-12 flex-none transition-all duration-300"
                      style={{
                        color: activeLayer === layer.num ? layer.color : 'rgba(255,255,255,0.12)',
                        textShadow: activeLayer === layer.num ? `0 0 30px ${layer.color}50` : 'none',
                      }}
                    >
                      {layer.num}
                    </span>

                    <div className="flex-1 min-w-0">
                      <span
                        className="font-cinzel font-bold text-sm md:text-base transition-colors duration-300"
                        style={{ color: activeLayer === layer.num ? 'white' : 'rgba(255,255,255,0.45)' }}
                      >
                        {layer.name}
                      </span>
                    </div>

                    <span
                      className="font-mono text-[10px] tracking-[0.12em] uppercase flex-none transition-all duration-300"
                      style={{
                        color: activeLayer === layer.num ? layer.color : 'rgba(255,255,255,0.15)',
                        opacity: activeLayer === layer.num ? 1 : 0.7,
                      }}
                    >
                      {layer.tag}
                    </span>

                    {/* Active indicator */}
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-none transition-all duration-300"
                      style={{
                        background: activeLayer === layer.num ? layer.color : 'transparent',
                        boxShadow: activeLayer === layer.num ? `0 0 8px ${layer.color}` : 'none',
                      }}
                    />
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
  SECTION 4 — THE 9 NAVAGRAHA ENGINES
  Minimal grid, one big number each, name + role only.
────────────────────────────────────────────────────────── */
const SectionNavagraha: React.FC = () => {
  const engines = [
    { num: '1', name: 'Bhoomi-Optical', role: 'Visual QA Engine', color: '#06b6d4' },
    { num: '2', name: 'Kaal-Radar', role: 'SAR Polarimetry', color: '#fbbf24' },
    { num: '3', name: 'Surya-Caption', role: '4-Tier Scientific Caption', color: '#f97316' },
    { num: '4', name: 'Sparsh-Grounding', role: 'Sub-Pixel Localization', color: '#10b981' },
    { num: '5', name: 'Vivek-Causal', role: 'Pearl SCM do-Calculus', color: '#a855f7' },
    { num: '6', name: 'Prakriti-Physics', role: '128-D Wave Manifold', color: '#3b82f6' },
    { num: '7', name: 'Gati-Temporal', role: 'Bi-Temporal Change', color: '#14b8a6' },
    { num: '8', name: 'Agni-Thermal', role: 'TRISHNA Infrared', color: '#ef4444' },
    { num: '9', name: 'Vayu-Atmosphere', role: 'Atmospheric Correction', color: '#6366f1' },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ padding: 'clamp(5rem, 8vw, 10rem) clamp(1.5rem, 8vw, 7rem)', background: '#030712' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">

        <FadeIn delay={100}>
          <p className="font-mono text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">
            ACT IV · Domain Specialist Engines
          </p>
        </FadeIn>

        <MaskReveal delay={200}>
          <h2
            className="font-cinzel font-bold text-white mb-16 leading-none"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.025em' }}
          >
            9 Navagraha.<br />
            <span className="text-white/25">9 domains mastered.</span>
          </h2>
        </MaskReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-px bg-white/5">
          {engines.map((engine, i) => (
            <FadeIn key={i} delay={300 + i * 60}>
              <div
                className="bg-[#030712] p-6 md:p-8 group hover:bg-white/3 transition-colors duration-300 cursor-default"
              >
                <div
                  className="font-cinzel font-bold text-6xl md:text-7xl leading-none mb-4 transition-all duration-300"
                  style={{
                    color: `${engine.color}18`,
                    willChange: 'color',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = `${engine.color}70`;
                    (e.currentTarget as HTMLElement).style.textShadow = `0 0 40px ${engine.color}30`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = `${engine.color}18`;
                    (e.currentTarget as HTMLElement).style.textShadow = 'none';
                  }}
                >
                  {engine.num}
                </div>
                <h3
                  className="font-cinzel font-bold text-white/70 text-sm group-hover:text-white transition-colors mb-1"
                >
                  {engine.name}
                </h3>
                <p className="font-mono text-[10px] tracking-[0.12em] text-white/25 uppercase">{engine.role}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
  SECTION 5 — FINAL CTA
  Prompt 4 Serene style: full viewport, big serif quote, 
  one CTA button centered.
────────────────────────────────────────────────────────── */
const SectionCTA: React.FC<{ onNavigate: (tab: NavigationTab) => void }> = ({ onNavigate }) => (
  <section
    className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    style={{ padding: 'clamp(5rem, 8vw, 10rem) clamp(1.5rem, 8vw, 7rem)' }}
  >
    {/* Background glow */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(6,182,212,0.06) 0%, transparent 70%)',
      }}
    />

    <div className="relative z-10 max-w-3xl mx-auto">
      <FadeIn delay={100}>
        <p className="font-mono text-[10px] tracking-[0.25em] text-white/30 uppercase mb-8">
          ACT V · Enter the Live Machine
        </p>
      </FadeIn>

      <MaskReveal delay={200}>
        <h2
          className="font-cinzel font-bold text-white leading-none"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', letterSpacing: '-0.03em' }}
        >
          The satellite<br />
          is waiting.
        </h2>
      </MaskReveal>

      <FadeIn delay={600} y={20}>
        <p
          className="mt-8 text-white/40 leading-relaxed"
          style={{ fontFamily: "'Hanken Grotesk', system-ui", fontSize: '1.05rem' }}
        >
          Ask any question about Earth in your language.<br />
          Physics-grounded. Auditable. Sovereign.
        </p>
      </FadeIn>

      <FadeIn delay={900}>
        <button
          onClick={() => onNavigate('mission-control')}
          className="mt-10 bg-white text-black px-8 py-4 rounded-xl text-sm font-semibold tracking-wide hover:bg-white/90 active:scale-95 transition-all glow-btn flex items-center gap-3 mx-auto"
        >
          <Radio className="w-4 h-4" />
          Enter Mission Control
        </button>
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
    <SectionCTA onNavigate={onNavigate} />
  </>
);
