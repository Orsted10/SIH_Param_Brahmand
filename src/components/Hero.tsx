import React, { useEffect, useRef, useState } from 'react';
import { NavigationTab } from '../types';
import { Radio, ArrowRight } from 'lucide-react';
import { AnimatedHeading, FadeIn } from './motion/Animate';

/* ─── ASSETS ─────────────────────────────────────────────
   Using the exact CloudFront video from Prompts 2, 4, 6, 7
──────────────────────────────────────────────────────── */
const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4';
const SPOTLIGHT_R = 280;

interface HeroProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
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

        {/* Bottom section — 2 col grid like VEX */}
        <div className="px-6 md:px-12 lg:px-16 pb-10 md:pb-14 lg:pb-16 grid grid-cols-1 lg:grid-cols-2 lg:items-end gap-8">

          {/* LEFT — Main cinematic heading + CTAs */}
          <div className="flex flex-col gap-6">

            {/* Eyebrow badge */}
            <FadeIn delay={100} y={12}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[11px] font-mono font-semibold tracking-[0.18em] text-white/70 uppercase">
                  ISRO SAC · PS 26167 · SatQuery AI
                </span>
              </div>
            </FadeIn>

            {/* Sanskrit motto — Cinzel serif, mask reveal */}
            <FadeIn delay={250} y={8}>
              <p className="font-cinzel text-sm md:text-base text-amber-300/80 tracking-[0.08em] glow-gold">
                "विश्वं पश्यति चक्षुषा विज्ञानेन च युज्यते"
              </p>
            </FadeIn>

            {/* VEX-style character animated main heading */}
            <AnimatedHeading
              lines={['PARAM', 'BRAHMAND']}
              delay={200}
              charDelay={35}
              className="font-cinzel font-bold leading-none tracking-tight text-white glow-white"
              style={{
                fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
                letterSpacing: '-0.025em',
              } as React.CSSProperties}
            />

            {/* Subheading — blur-up reveal */}
            <FadeIn delay={900} duration={1000} y={16}>
              <p
                className="text-white/60 font-light max-w-lg leading-relaxed"
                style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}
              >
                Sovereign multimodal Earth intelligence.<br />
                128-D physics · 9 AI engines · 0% physical hallucination.
              </p>
            </FadeIn>

            {/* CTA Buttons — Prompt 7 spec */}
            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('mission-control')}
                  className="bg-white text-black px-7 py-3 rounded-lg text-sm font-semibold tracking-wide hover:bg-white/90 active:scale-95 transition-all glow-btn flex items-center gap-2"
                >
                  <Radio className="w-4 h-4" />
                  Launch Mission Control
                </button>
                <button
                  onClick={() => onNavigate('crises')}
                  className="glass border border-white/20 text-white px-7 py-3 rounded-lg text-sm font-medium tracking-wide hover:bg-white hover:text-black active:scale-95 transition-all flex items-center gap-2"
                >
                  View 10 Crises
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </FadeIn>

          </div>

          {/* RIGHT — Stats tag (Prompt 7 glass card style) */}
          <FadeIn delay={1400} duration={1000} className="hidden lg:flex justify-end items-end">
            <div className="glass-dark border border-white/12 rounded-2xl px-6 py-5 max-w-xs w-full">
              <p className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase mb-3">Live System Metrics</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Computational Speed', value: '380 ms', sub: '@ 45 FPS', color: '#06b6d4' },
                  { label: 'SAR Cloud Penetration', value: '97.2%', sub: 'Precision', color: '#fbbf24' },
                  { label: 'Hallucination Rate', value: '0.00%', sub: 'Certified', color: '#10b981' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-white/40 font-mono">{stat.label}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-bold font-mono" style={{ color: stat.color }}>{stat.value}</span>
                      <span className="text-[10px] text-white/30 font-mono ml-1">{stat.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

        </div>

        {/* Scroll indicator */}
        <FadeIn delay={1800} className="pb-6 flex justify-center">
          <a href="#story" className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group">
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
