import React, { useEffect, useRef, useState } from 'react';
import { NavigationTab } from '../types';
import { Radio, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { AnimatedHeading, FadeIn } from './motion/Animate';
import { soundFx } from '../services/soundFx';

/* ─── ASSETS ─────────────────────────────────────────────
   Using the exact CloudFront video from Prompts 2, 4, 6, 7
──────────────────────────────────────────────────────── */
const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4';
const SPOTLIGHT_R = 280;

interface HeroProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [soundActive, setSoundActive] = useState<boolean>(false);
  /* ── Cursor spotlight (Prompt 3 Lithos mechanic) ── */
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const rawMouse = useRef({ x: -9999, y: -9999 });
  const smooth = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const [cursorPos, setCursorPos] = useState({ x: -9999, y: -9999 });

  /* Smooth cursor lerp */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawMouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);
    const loop = () => {
      smooth.current.x += (rawMouse.current.x - smooth.current.x) * 0.085;
      smooth.current.y += (rawMouse.current.y - smooth.current.y) * 0.085;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* Canvas → mask on reveal div */
  useEffect(() => {
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    if (!canvas || !reveal) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { x, y } = cursorPos;
    if (x < 0) return;

    const grad = ctx.createRadialGradient(x, y, 0, x, y, SPOTLIGHT_R);
    grad.addColorStop(0,    'rgba(255,255,255,1)');
    grad.addColorStop(0.4,  'rgba(255,255,255,1)');
    grad.addColorStop(0.62, 'rgba(255,255,255,0.7)');
    grad.addColorStop(0.78, 'rgba(255,255,255,0.3)');
    grad.addColorStop(0.9,  'rgba(255,255,255,0.05)');
    grad.addColorStop(1,    'rgba(255,255,255,0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    const dataUrl = canvas.toDataURL();
    reveal.style.maskImage = `url(${dataUrl})`;
    reveal.style.webkitMaskImage = `url(${dataUrl})`;
    reveal.style.maskSize = '100% 100%';
    (reveal.style as any).webkitMaskSize = '100% 100%';
  }, [cursorPos]);

  /* Meteors */
  const meteors = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    top: `${10 + Math.random() * 40}%`,
    left: `${30 + Math.random() * 60}%`,
    delay: `${i * 3.5 + Math.random() * 2}s`,
    duration: `${6 + Math.random() * 4}s`,
  }));

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100dvh', minHeight: '100vh' }}
    >
      {/* ── Background video (Prompts 4, 7) ── */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'scale(1.06)', transition: 'transform 0.1s linear' }}
        src={HERO_VIDEO}
      />

      {/* ── Dark gradient overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20 z-10 pointer-events-none" />

      {/* ── Spotlight reveal layer (Lithos) ── */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" style={{ display: 'none' }} />
      <div
        ref={revealRef}
        className="absolute inset-0 z-11 pointer-events-none hidden md:block"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.45,
        }}
      />

      {/* ── Meteor shower ── */}
      <div className="absolute inset-0 z-12 pointer-events-none overflow-hidden">
        {meteors.map(m => (
          <div
            key={m.id}
            className="meteor"
            style={{ top: m.top, left: m.left, animationDuration: m.duration, animationDelay: m.delay }}
          />
        ))}
      </div>

      {/* ── VEX-style content pinned to bottom-left (Prompt 7) ── */}
      <div className="absolute inset-0 z-20 flex flex-col">
        
        {/* Spacer to push content down */}
        <div className="flex-1" />

        {/* Bottom section — 12-col grid for expansive cinematic breathing room */}
        <div className="px-6 md:px-12 lg:px-16 pb-10 md:pb-14 lg:pb-16 grid grid-cols-1 lg:grid-cols-12 lg:items-end gap-8 lg:gap-12">

          {/* LEFT — Main cinematic heading + CTAs (col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-5">

            {/* Eyebrow badge */}
            <FadeIn delay={100} y={12}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/15 w-fit">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-white/80 uppercase">
                  ISRO SAC · PS 26167 · Sovereign Earth OS
                </span>
              </div>
            </FadeIn>

            {/* Sanskrit motto — Cinzel serif with gold glow */}
            <FadeIn delay={220} y={8}>
              <p className="font-cinzel text-sm md:text-base text-amber-300/90 tracking-[0.12em] glow-gold">
                "विश्वं पश्यति चक्षुषा विज्ञानेन च युज्यते"
              </p>
            </FadeIn>

            {/* Main heading with unbreakable whiteSpace nowrap lines */}
            <div className="overflow-visible">
              <AnimatedHeading
                lines={['PARAM', 'BRAHMAND']}
                delay={200}
                charDelay={30}
                className="font-cinzel font-bold leading-[0.92] tracking-[0.02em] text-white glow-white select-none"
                style={{
                  fontSize: 'clamp(3.2rem, 7.2vw, 7.5rem)',
                } as React.CSSProperties}
              />
            </div>

            {/* SpaceEdu signature cyan rule bar */}
            <FadeIn delay={750} y={6}>
              <div className="flex items-center gap-3 my-1">
                <div className="w-24 h-1 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.9)]" />
                <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-400/80 uppercase font-semibold">
                  128-D Physics Manifold · 9 AI Engines · 22 Languages
                </span>
              </div>
            </FadeIn>

            {/* Subheading */}
            <FadeIn delay={900} duration={1000} y={14}>
              <p
                className="text-white/70 font-light max-w-xl leading-relaxed"
                style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}
              >
                India's sovereign Earth intelligence foundation. Grounded in Navier-Stokes, Maxwell's SAR polarimetry, and Pearl causal DAGs — delivering certified 0% physical hallucination.
              </p>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn delay={1100} duration={900}>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    soundFx.playChime();
                    onNavigate('mission-control');
                  }}
                  className="bg-white text-black px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-cyan-50 active:scale-95 transition-all glow-btn flex items-center gap-2.5 shadow-lg shadow-white/10 cursor-pointer"
                >
                  <Radio className="w-4 h-4 text-cyan-600 animate-pulse" />
                  Launch Mission Control
                </button>
                <button
                  onClick={() => {
                    soundFx.playTelemetryPing();
                    onNavigate('physics-lab');
                  }}
                  className="glass border border-white/20 text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-white hover:text-black active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  128-D Physics Lab
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    soundFx.playTick();
                    onNavigate('crises');
                  }}
                  className="px-5 py-3.5 rounded-full text-sm font-mono text-cyan-400/90 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors flex items-center gap-2 border border-cyan-500/20 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  10 Crises Showcase
                </button>
              </div>
            </FadeIn>

          </div>

          {/* RIGHT — Tactical Orbital Pass & Telemetry HUD (col-span-4) */}
          <FadeIn delay={1300} duration={1000} className="lg:col-span-4 flex flex-col justify-end">
            <div className="glass-dark border border-white/15 rounded-2xl p-5 w-full shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              
              {/* HUD Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  <span className="text-[10px] font-mono tracking-[0.2em] text-white/80 uppercase font-bold">
                    ISRO Telemetry Feed
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  LIVE 45 FPS
                </span>
              </div>

              {/* HUD Metrics List */}
              <div className="flex flex-col gap-3 font-mono">
                {[
                  { label: 'Active Satellites', value: 'Cartosat-3 · RISAT-1A', sub: 'NISAR Sync', color: '#06b6d4' },
                  { label: 'Spectral Ingestion', value: '128 / 128 Channels', sub: 'Wave Manifold', color: '#38bdf8' },
                  { label: 'Inference Latency', value: '380 ms', sub: 'Geo-Mamba 3.0', color: '#34d399' },
                  { label: 'Conformal Coverage', value: '≥ 98.4%', sub: 'p-val > 0.99', color: '#fbbf24' },
                  { label: 'Dharma Firewall', value: '0.00% Violations', sub: 'Certified', color: '#a855f7' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                    <span className="text-white/50 text-[11px]">{stat.label}</span>
                    <div className="text-right">
                      <span className="font-bold text-[12px]" style={{ color: stat.color }}>{stat.value}</span>
                      <span className="text-[10px] text-white/30 ml-1.5 hidden sm:inline">{stat.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Target Coordinates */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                <span>COORD: 21°08'45"N 79°05'18"E</span>
                <span className="text-emerald-400/80">ORBIT 14A PASS</span>
              </div>
            </div>
          </FadeIn>

        </div>

        {/* Prompt 4 Serene style: Discreet bottom-left audio indicator */}
        <div className="absolute bottom-6 left-6 md:left-12 z-30 hidden sm:flex items-center gap-3">
          <button
            onClick={() => {
              const active = soundFx.toggleSound();
              setSoundActive(active);
            }}
            className="w-9 h-9 rounded-full glass border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-all cursor-pointer shadow-lg"
            aria-label="Toggle ambient telemetry sound"
          >
            {soundActive ? (
              <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-white/40" />
            )}
          </button>
          <div className="text-left font-mono text-[10px] leading-tight">
            <p className="text-white/80 uppercase font-semibold">
              {soundActive ? 'ISRO Soundscape: Active' : 'Sound: Muted'}
            </p>
            <p className="text-white/40">
              {soundActive ? '55Hz Sub-Bass Telemetry Drone' : 'Click to enable tactile audio'}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <FadeIn delay={1800} className="pb-6 flex justify-center">
          <a
            href="#story"
            onClick={() => soundFx.playTick()}
            className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group"
          >
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Scroll to reveal</span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5 group-hover:border-white/40 transition-colors">
              <div className="w-1 h-1.5 rounded-full bg-white/50 scroll-dot" />
            </div>
          </a>
        </FadeIn>

      </div>

    </section>
  );
};
