import React, { useState, useEffect } from 'react';
import { NavigationTab } from '../../types';
import { FadeIn, MaskReveal } from '../motion/Animate';
import { soundFx } from '../../services/soundFx';
import { SatelliteBlueprint, DharmaChakraWheel } from '../BlueprintDrawings';
import {
  ArrowRight,
  Radio,
  ShieldCheck,
  Zap,
  Flame,
  Wind,
  Eye,
  Waves,
  CheckCircle2,
  Play,
  Pause,
  Orbit,
  Sparkles,
  Sliders,
  Scan,
  Mic,
  MapPin,
  Clock,
  Compass,
  Cpu,
  Activity,
  Globe,
} from 'lucide-react';

interface StorySectionsProps {
  onNavigate: (tab: NavigationTab) => void;
}

/* ─────────────────────────────────────────────────────────
  ACT I — THE HUMAN GROUND TRUTH
  "Behind every pixel is an Indian citizen waiting for truth."
  Empathy-first vernacular voice queries across the subcontinent.
────────────────────────────────────────────────────────── */
const SectionHumanGroundTruth: React.FC<{ onNavigate: (tab: NavigationTab) => void }> = ({ onNavigate }) => {
  const [activeVoice, setActiveVoice] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const humanStories = [
    {
      id: 0,
      region: 'Kaziranga & Golaghat, Assam',
      language: 'Assamese (অসমীয়া)',
      role: 'Flood Embankment Patrol Officer',
      queryNative: '“NH-37 মথাউৰিটো কি আজি ৰাতি ভাঙিব? আমাৰ মানুহখিনি আঁতৰাবলৈ কিমান সময় আছে?”',
      queryEnglish: '“Will the NH-37 embankment breach tonight? How much time do our families have to evacuate before the flood crest?”',
      context: '100% overcast with torrential monsoon rain. Standard optical satellites are completely blinded by cumulus clouds.',
      physicsResponse: 'RISAT-1A C-band radar penetrated cloud deck. Standing water pressure gradient at 26.14°N, 91.73°E is 18.4 kPa. Embankment structural safety factor: 1.18. Projected crest arrival: 11 hours 40 minutes.',
      actionVernacular: 'সতৰ্কবাৰ্তা: মথাউৰি সুৰক্ষিত কিন্তু পানীৰ চাপ বৃদ্ধি পাইছে। পুৱা ৪ বজাৰ ভিতৰত ওখ অঞ্চললৈ যাওক।',
      accentColor: '#38bdf8',
      coordinates: '26.14°N · 91.73°E',
    },
    {
      id: 1,
      region: 'Chamoli & Alaknanda Valley, Uttarakhand',
      language: 'Garhwali / Hindi (गढ़वाली / हिन्दी)',
      role: 'High-Altitude Hydrological Surveyor',
      queryNative: '“अलकनंदा घाटी के ऊपर क्या किसी हिमनद झील का जलस्तर अचानक बढ़ा है? सुरंग में काम कर रहे मज़दूर सुरक्षित हैं?”',
      queryEnglish: '“Has any proglacial lake breached in the Alaknanda catchment? Are the workers in the downstream hydroelectric tunnel safe?”',
      context: 'Steep Himalayan topography with deep shadows and cloud cover. Glacial fractures are invisible in standard RGB feeds.',
      physicsResponse: 'InSAR phase coherence delta confirms zero moraine dam deformation (Δz < 2 mm). Thermal TIR detects normal meltwater equilibrium at 1.8°C. No catastrophic outflow imminent.',
      actionVernacular: 'सत्यापित: हिमनद झील का तटबंध स्थिर है। कोई जलप्रलय का खतरा नहीं। कार्य जारी रखा जा सकता है।',
      accentColor: '#34d399',
      coordinates: '30.38°N · 79.32°E',
    },
    {
      id: 2,
      region: 'Mayurbhanj & Similipal, Odisha',
      language: 'Odia (ଓଡ଼ିଆ)',
      role: 'Tribal Community Forest Protection Guard',
      queryNative: '“ଜଙ୍ଗଲ ନିଆଁ କେଉଁ ଦିଗକୁ ଗତି କରୁଛି? ଆମର ଆଦିବାସୀ ବସତି ଏବଂ ମହୁଆ ଗଛଗୁଡ଼ିକ ସୁରକ୍ଷିତ କି?”',
      queryEnglish: '“Which direction is the forest fire advancing? Are our indigenous habitations and Mahua groves safe?”',
      context: 'Dense smoke canopy obscures optical cameras. Smoldering ground peat fire propagates beneath sal tree canopies.',
      physicsResponse: 'TRISHNA 57m thermal infrared isolates sub-surface heat anomaly (ΔT = +8.4 K). Wind vector 14 km/h Northeast. Fire will bypass village perimeter by 1.8 km.',
      actionVernacular: 'ସୂଚନା: ନିଆଁ ଉତ୍ତର-ପୂର୍ବ ଦିଗକୁ ଯାଉଛି। ଗ୍ରାମ ସୁରକ୍ଷିତ ଅଛି, କୌଣସି ସ୍ଥାନାନ୍ତର ଆବଶ୍ୟକ ନାହିଁ।',
      accentColor: '#fbbf24',
      coordinates: '21.84°N · 86.42°E',
    },
    {
      id: 3,
      region: 'Sangrur & Malwa Belt, Punjab',
      language: 'Punjabi (ਪੰਜਾਬੀ)',
      role: 'Wheat Cooperative Farmer',
      queryNative: '“ਕੀ ਅਗਲੇ 48 ਘੰਟਿਆਂ ਵਿੱਚ ਬੇਮੌਸਮੀ ਗੜੇਮਾਰੀ ਹੋਵੇਗੀ? ਕੀ ਅਸੀਂ ਸੁਨਹਿਰੀ ਕਣਕ ਦੀ ਵਾਢੀ ਅੱਜ ਹੀ ਸ਼ੁਰੂ ਕਰ ਦੇਈਏ?”',
      queryEnglish: '“Will unseasonal western disturbance bring hailstorms in the next 48 hours? Should we harvest our wheat crop today?”',
      context: 'Unseasonal moisture plumes threaten billions of rupees in unharvested food grain across Punjab and Haryana.',
      physicsResponse: 'INSAT-3DR multi-spectral water vapor sounder confirms dry tropospheric downdraft. Convective available potential energy (CAPE) < 400 J/kg. Zero hail probability.',
      actionVernacular: 'ਭਰੋਸਾ: ਅਗਲੇ ੪੮ ਘੰਟਿਆਂ ਦੌਰਾਨ ਕੋਈ ਗੜੇਮਾਰੀ ਨਹੀਂ। ਕਣਕ ਦੀ ਵਾਢੀ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਸ਼ੁਰੂ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ।',
      accentColor: '#a78bfa',
      coordinates: '30.24°N · 75.84°E',
    },
  ];

  const current = humanStories[activeVoice];

  const handleTogglePlay = () => {
    soundFx.playTelemetryPing();
    setIsPlayingAudio(!isPlayingAudio);
  };

  useEffect(() => {
    setIsPlayingAudio(false);
  }, [activeVoice]);

  return (
    <section
      id="story"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24 px-6 md:px-12 lg:px-16"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 20% 30%, rgba(56,189,248,0.04) 0%, #020408 75%)',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Eyebrow */}
        <FadeIn delay={50}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <p className="font-mono text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase">
              ACT I · THE HUMAN GROUND TRUTH
            </p>
          </div>
        </FadeIn>

        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <MaskReveal delay={120}>
              <h2
                className="font-cinzel font-bold text-white leading-[0.96] tracking-tight"
                style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.5rem)' }}
              >
                Behind every pixel <br />
                <span className="text-white/40 font-normal">
                  is a citizen asking for truth.
                </span>
              </h2>
            </MaskReveal>
          </div>

          <div className="lg:col-span-4">
            <FadeIn delay={250} y={10}>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'Hanken Grotesk', system-ui" }}>
                Generic AI was built to generate essays. India needed an intelligence that understands a ranger's whisper in Odia and calculates flood fluid dynamics in milliseconds.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Stakeholder Voice Navigator */}
        <FadeIn delay={350}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {humanStories.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  soundFx.playTick();
                  setActiveVoice(idx);
                }}
                className={`p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between gap-2 cursor-pointer ${
                  activeVoice === idx
                    ? 'bg-white/10 border-white/30 shadow-xl scale-[1.01]'
                    : 'bg-white/2 border-white/8 hover:border-white/20 hover:bg-white/4 text-white/60'
                }`}
                style={{
                  borderLeft: activeVoice === idx ? `3px solid ${s.accentColor}` : undefined,
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-white/40">
                    VOICE 0{idx + 1}
                  </span>
                  <MapPin className="w-3 h-3 text-white/30" />
                </div>
                <span className="font-cinzel text-xs md:text-sm font-bold text-white leading-snug">
                  {s.region.split('&')[0]}
                </span>
                <span className="text-[10px] font-mono" style={{ color: s.accentColor }}>
                  {s.language.split('(')[0]}
                </span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Tactical Voice Console */}
        <FadeIn delay={450}>
          <div className="glass-dark border border-white/12 rounded-3xl p-6 lg:p-10 relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Vernacular Query & Spoken Waveform */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                {/* Header info */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                    <Mic className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-bold">{current.role}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-white/50">{current.region}</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {current.coordinates}
                  </span>
                </div>

                {/* Spoken Citizen Voice Query */}
                <div className="p-5 rounded-2xl bg-white/3 border border-white/8 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                      Live Spoken Audio Query ({current.language})
                    </span>

                    {/* Audio Play Button */}
                    <button
                      onClick={handleTogglePlay}
                      className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-mono flex items-center gap-1.5 hover:bg-cyan-500/30 transition-all cursor-pointer"
                    >
                      {isPlayingAudio ? (
                        <>
                          <Pause className="w-3 h-3" />
                          <span>Simulating...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-cyan-300" />
                          <span>Listen (STT)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Native Script Quote */}
                  <p className="font-cinzel text-base md:text-lg text-white font-medium mb-3 leading-relaxed">
                    {current.queryNative}
                  </p>

                  {/* English Translation */}
                  <p className="text-xs text-white/50 font-sans leading-relaxed">
                    "{current.queryEnglish}"
                  </p>

                  {/* Animated Soundwave Bar Graphic */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1 h-6">
                    {Array.from({ length: 36 }).map((_, i) => {
                      const waveHeight = isPlayingAudio
                        ? 15 + Math.sin(i * 0.5 + Date.now() * 0.005) * 70 + (i % 4) * 8
                        : 20 + Math.sin(i * 0.3) * 30;
                      return (
                        <div
                          key={i}
                          className="flex-1 bg-cyan-400/60 rounded-full transition-all duration-150"
                          style={{
                            height: `${Math.min(100, Math.max(10, waveHeight))}%`,
                            opacity: isPlayingAudio ? 0.9 : 0.25,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Sensory Failure Context */}
                <div className="flex items-start gap-2.5 text-xs text-white/50 font-sans">
                  <span className="text-amber-400/90 font-bold font-mono">CHALLENGE:</span>
                  <span>{current.context}</span>
                </div>
              </div>

              {/* Right: Physics Grounded Advisory Delivered to Citizen */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-5 p-6 rounded-2xl bg-black/40 border border-white/10 h-full">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-mono font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    DHARMA ZERO HALLUCINATION VERDICT
                  </div>

                  <h4 className="font-cinzel text-lg font-bold text-white mb-3">
                    Calculated Physical Ground Truth
                  </h4>

                  <p className="text-xs font-mono text-white/70 leading-relaxed bg-white/3 p-3.5 rounded-xl border border-white/5 mb-4">
                    {current.physicsResponse}
                  </p>

                  {/* Vernacular Return Audio / SMS Output */}
                  <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
                    <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider block mb-1">
                      Citizen Broadcast ({current.language.split('(')[0]}):
                    </span>
                    <p className="text-xs text-cyan-100 font-sans leading-relaxed">
                      {current.actionVernacular}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundFx.playChime();
                    onNavigate('mission-control');
                  }}
                  className="w-full py-3 rounded-xl bg-white text-black text-xs font-mono font-bold hover:bg-cyan-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Radio className="w-3.5 h-3.5 text-cyan-600" />
                  Test Live Vernacular Query in Mission Control
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
  ACT II — THE REALITY PEELER LENS
  Tactile Interactive Multi-Spectral Peeler
  "Peel back the layers of reality on the Brahmaputra River Basin."
────────────────────────────────────────────────────────── */
const SectionRealityPeeler: React.FC = () => {
  const [peelLayer, setPeelLayer] = useState<number>(1); // 0: Optical, 1: SAR, 2: Thermal, 3: Causal

  const peelModes = [
    {
      id: 0,
      label: '1. Human Eye (RGB)',
      sensor: 'Cartosat-3 Optical (0.28m)',
      verdict: 'FAILURE: Overcast cloud obscuration (>95%). Zero ground visibility.',
      color: '#f87171',
      bgImg: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1200&auto=format&fit=crop',
      wavelength: '0.4 - 0.7 μm (Visible Light)',
      stats: 'Cloud Penetration: 0.0% · Standing Water Visible: 0 km²',
    },
    {
      id: 1,
      label: '2. C-Band SAR Radar',
      sensor: 'RISAT-1A + NISAR Dual-Pol',
      verdict: 'PIERCED: 100% cloud penetration. Water backscatter isolates 42.8 km² flood zone.',
      color: '#38bdf8',
      bgImg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      wavelength: '5.35 GHz (5.6 cm Microwaves)',
      stats: 'Cloud Penetration: 100.0% · Floodwater Area: 42.8 km²',
    },
    {
      id: 2,
      label: '3. Thermal Infrared',
      sensor: 'TRISHNA 57m High-Res TIR',
      verdict: 'MAPPED: Sub-surface soil saturation & latent heat flux anomaly detected.',
      color: '#fbbf24',
      bgImg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      wavelength: '8 - 12 μm (Thermal Infrared)',
      stats: 'Soil Saturation: 94.2% · Evaporative Fraction: 0.88',
    },
    {
      id: 3,
      label: '4. Causal Ground Truth',
      sensor: 'Vivek-Causal + Dharma Gate',
      verdict: 'VERIFIED: 12 animal corridors safe. Embankment stress calculated at 1.18 SF.',
      color: '#34d399',
      bgImg: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200&auto=format&fit=crop',
      wavelength: 'Structural Causal Graph (Pearl SCM)',
      stats: 'False Alarms: 0.00% · Guaranteed Coverage: ≥ 95%',
    },
  ];

  const current = peelModes[peelLayer];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24 px-6 md:px-12 lg:px-16"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 80% 40%, rgba(56,189,248,0.03) 0%, #020408 75%)',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <FadeIn delay={50}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <p className="font-mono text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase">
              ACT II · TACTILE MULTI-SPECTRAL PEELER
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-8">
            <MaskReveal delay={120}>
              <h2
                className="font-cinzel font-bold text-white leading-[0.96] tracking-tight"
                style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.5rem)' }}
              >
                Peel back reality. <br />
                <span className="text-white/40 font-normal">
                  Beyond human optical limitations.
                </span>
              </h2>
            </MaskReveal>
          </div>

          <div className="lg:col-span-4">
            <FadeIn delay={250} y={10}>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'Hanken Grotesk', system-ui" }}>
                Commercial vision models only look at visible light. Scrub through the 4 spectral layers below to see how radar and physics peel through clouds to reveal life-saving ground truth.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Layer Selector Bar */}
        <FadeIn delay={320}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {peelModes.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  soundFx.playTick();
                  setPeelLayer(idx);
                }}
                className={`p-3.5 rounded-2xl text-left font-mono text-xs transition-all border flex flex-col justify-between gap-1.5 cursor-pointer ${
                  peelLayer === idx
                    ? 'bg-white/10 border-white/30 shadow-lg scale-[1.01]'
                    : 'bg-white/2 border-white/8 hover:border-white/20 text-white/50'
                }`}
                style={{
                  borderTop: peelLayer === idx ? `3px solid ${p.color}` : undefined,
                }}
              >
                <span className="text-[10px] uppercase text-white/40">LAYER 0{idx + 1}</span>
                <span className="font-bold text-white leading-tight">{p.label.split('(')[0]}</span>
                <span className="text-[10px]" style={{ color: p.color }}>{p.sensor.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* The Peeler Canvas Terminal */}
        <FadeIn delay={400}>
          <div className="glass-dark border border-white/12 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Satellite Image Display */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/15">
                <img
                  src={current.bgImg}
                  alt={current.label}
                  className="w-full h-full object-cover transition-opacity duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                {/* Radar Grid Scanning Line */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-50"
                  style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(56,189,248,0.2) 50%, rgba(56,189,248,0.7) 51%, transparent 52%)',
                    backgroundSize: '100% 200%',
                    animation: 'float 5s ease-in-out infinite',
                  }}
                />

                {/* Bounding Box HUD */}
                <div className="absolute top-6 left-6 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 max-w-xs text-xs font-mono">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: current.color }} />
                    <span className="font-bold text-white">{current.sensor}</span>
                  </div>
                  <p className="text-[10px] text-white/50">{current.wavelength}</p>
                </div>

                {/* Bottom Status Banner */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                  <div className="bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 text-white/90">
                    {current.stats}
                  </div>
                  <span
                    className="px-2.5 py-1 rounded text-[10px] font-bold border"
                    style={{
                      color: current.color,
                      borderColor: `${current.color}40`,
                      backgroundColor: `${current.color}15`,
                    }}
                  >
                    CALIBRATED
                  </span>
                </div>
              </div>

              {/* Physical Verdict Text */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full gap-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-1">
                    SPECTRAL MANIFOLD ANALYSIS
                  </span>
                  <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white mb-3">
                    {current.label}
                  </h3>
                  <div
                    className="p-4 rounded-xl border text-xs font-mono leading-relaxed mb-4"
                    style={{
                      backgroundColor: `${current.color}10`,
                      borderColor: `${current.color}35`,
                      color: current.color,
                    }}
                  >
                    {current.verdict}
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed font-sans">
                    When disaster hits, waiting for clouds to clear means lost lives. PARAM-BRAHMAND fuses C-band SAR with high-res optical and thermal infrared, guaranteeing continuous awareness.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/3 border border-white/8 text-xs font-mono text-white/60 flex items-center justify-between">
                  <span>Sensor Sync: 128 Channels</span>
                  <span className="text-emerald-400 font-bold">100% Ingested</span>
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
  ACT III — SPATIO-TEMPORAL DISASTER TIMELINE
  Interactive Time Scrubber (T-24h to T+24h)
────────────────────────────────────────────────────────── */
const SectionTimeScrubber: React.FC<{ onNavigate: (tab: NavigationTab) => void }> = ({ onNavigate }) => {
  const [timelineIndex, setTimelineIndex] = useState<number>(2);

  const timelineSteps = [
    {
      time: 'T - 24 Hours',
      label: 'Pre-Storm Baseline',
      inundation: '14.2 km²',
      waterSpeed: '1.2 m/s',
      alertStatus: 'NORMAL BASELINE',
      alertColor: '#34d399',
      desc: 'RISAT-1A captures dry-season baseline interferometric coherence across Kaziranga lowlands. Soil moisture normal at 28%.',
      bulletin: 'No active warning. Routine agricultural transport active along National Highway 37.',
    },
    {
      time: 'T - 06 Hours',
      label: 'Catchment Cloudburst',
      inundation: '21.5 km²',
      waterSpeed: '2.8 m/s',
      alertStatus: 'SURGE WARNING',
      alertColor: '#fbbf24',
      desc: 'INSAT-3DR multi-spectral sounder records 180mm torrential cloudburst in Arunachal foothills. Runoff surge modeled via Navier-Stokes.',
      bulletin: 'Advisory: Brahmaputra tributaries rising at 0.4 m/hour. Forest staff alerted.',
    },
    {
      time: 'T + 00 (Pass 14A)',
      label: 'Dyke Breach Detected',
      inundation: '42.8 km²',
      waterSpeed: '4.6 m/s',
      alertStatus: 'CRITICAL BREACH',
      alertColor: '#f87171',
      desc: 'SAR backscatter drops sharply (σ° = -18.4 dB) confirming dyke collapse at 26.14°N, 91.73°E. Flow rate 420 m³/s into human settlements.',
      bulletin: 'URGENT: Automated vernacular SMS dispatched to 14,000 residents in Assamese & Bengali.',
    },
    {
      time: 'T + 12 Hours',
      label: 'Peak Flood Crest',
      inundation: '68.4 km²',
      waterSpeed: '3.1 m/s',
      alertStatus: 'MAX INUNDATION',
      alertColor: '#ef4444',
      desc: 'Floodwaters reach peak crest. Vivek-Causal verifies 12 elevated wildlife highlands remain above waterline with 99.4% conformal certainty.',
      bulletin: 'Evacuation corridors holding. 3 relief shelters active. Zero casualties recorded.',
    },
    {
      time: 'T + 24 Hours',
      label: 'Recession & Relief',
      inundation: '35.1 km²',
      waterSpeed: '1.8 m/s',
      alertStatus: 'RECESSION PHASE',
      alertColor: '#38bdf8',
      desc: 'Waters receding into Brahmaputra mainstem. Damage assessment matrix compiled automatically for State Disaster Management Authority.',
      bulletin: 'NDMA Formal Post-Disaster Audit generated. Relief materials prioritized for Sector 2.',
    },
  ];

  const current = timelineSteps[timelineIndex];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24 px-6 md:px-12 lg:px-16"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 30% 60%, rgba(56,189,248,0.03) 0%, #020408 75%)',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <FadeIn delay={50}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <p className="font-mono text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase">
              ACT III · 24-HOUR DISASTER TIME SCRUBBER
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-8">
            <MaskReveal delay={120}>
              <h2
                className="font-cinzel font-bold text-white leading-[0.96] tracking-tight"
                style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.5rem)' }}
              >
                Time is physics. <br />
                <span className="text-white/40 font-normal">
                  Scrub the flood crest evolution live.
                </span>
              </h2>
            </MaskReveal>
          </div>

          <div className="lg:col-span-4">
            <FadeIn delay={250} y={10}>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'Hanken Grotesk', system-ui" }}>
                Disasters are not static photographs — they are moving fluid wavefronts. Drag the slider below to witness how PARAM-BRAHMAND tracks the crisis from pre-storm baseline to recovery.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Interactive Timeline Scrubber Widget */}
        <FadeIn delay={350}>
          <div className="glass-dark border border-white/12 rounded-3xl p-6 lg:p-10 relative overflow-hidden shadow-2xl">
            {/* Scrubber Slider Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs font-mono text-white/50 mb-3">
                <span>DRAG TO SCRUB SATELLITE PASSES:</span>
                <span className="text-cyan-300 font-bold">{current.time}</span>
              </div>

              <input
                type="range"
                min={0}
                max={4}
                step={1}
                value={timelineIndex}
                onChange={e => {
                  soundFx.playTick();
                  setTimelineIndex(Number(e.target.value));
                }}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />

              {/* Step Labels */}
              <div className="flex justify-between text-[10px] font-mono text-white/40 mt-3">
                {timelineSteps.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundFx.playTick();
                      setTimelineIndex(idx);
                    }}
                    className={`transition-colors cursor-pointer text-left ${
                      timelineIndex === idx ? 'text-cyan-300 font-bold' : 'hover:text-white/70'
                    }`}
                  >
                    {s.time.split(' ')[0]} {s.time.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Telemetry Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 border-t border-white/10">
              {/* Left Column: Gauges */}
              <div className="lg:col-span-6 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xl font-bold text-white">
                    {current.label}
                  </span>
                  <span
                    className="px-2.5 py-1 rounded text-xs font-mono font-bold border"
                    style={{
                      color: current.alertColor,
                      borderColor: `${current.alertColor}40`,
                      backgroundColor: `${current.alertColor}15`,
                    }}
                  >
                    {current.alertStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-white/3 border border-white/8 font-mono">
                    <span className="text-[10px] text-white/40 uppercase block mb-1">Inundated Area</span>
                    <span className="text-2xl font-bold text-cyan-300">{current.inundation}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/3 border border-white/8 font-mono">
                    <span className="text-[10px] text-white/40 uppercase block mb-1">Flow Velocity</span>
                    <span className="text-2xl font-bold text-amber-300">{current.waterSpeed}</span>
                  </div>
                </div>

                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  {current.desc}
                </p>
              </div>

              {/* Right Column: Automated Citizen Broadcast */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-4 p-6 rounded-2xl bg-black/40 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  AUTOMATED STATE DISASTER BULLETIN DISPATCHED
                </div>

                <div className="p-4 rounded-xl bg-white/4 border border-white/8 text-xs font-sans leading-relaxed text-white/90">
                  {current.bulletin}
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-white/40 pt-2 border-t border-white/5">
                  <span>Audit Trail: Immutable JSON</span>
                  <button
                    onClick={() => {
                      soundFx.playChime();
                      onNavigate('execution-trace');
                    }}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    Inspect JSON Trace →
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
  ACT IV — VECTOR SATELLITE BLUEPRINT
  Google-Style Technical CAD Schematic
────────────────────────────────────────────────────────── */
const SectionBlueprintCAD: React.FC<{ onNavigate: (tab: NavigationTab) => void }> = ({ onNavigate }) => {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24 px-6 md:px-12 lg:px-16"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 70% 50%, rgba(56,189,248,0.03) 0%, #020408 75%)',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <FadeIn delay={50}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <p className="font-mono text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase">
              ACT IV · SATELLITE VECTOR BLUEPRINT
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <MaskReveal delay={120}>
              <h2
                className="font-cinzel font-bold text-white leading-[0.96] tracking-tight"
                style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.5rem)' }}
              >
                Spacecraft optics <br />
                <span className="text-white/40 font-normal">
                  fused with continuous neural state space.
                </span>
              </h2>
            </MaskReveal>
          </div>

          <div className="lg:col-span-4">
            <FadeIn delay={250} y={10}>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'Hanken Grotesk', system-ui" }}>
                Every tensor in PARAM-BRAHMAND is physically calibrated against satellite aperture physics, carrier frequency geometry, and orbital ephemeris.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Blueprint Dual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Satellite Vector Blueprint Schematic */}
          <div className="lg:col-span-6">
            <FadeIn delay={350}>
              <SatelliteBlueprint activeScope={1} />
            </FadeIn>
          </div>

          {/* Right: Dharma Chakra Mathematical Wheel & Technical Narrative */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <FadeIn delay={450}>
              <div className="glass-dark border border-white/12 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl flex flex-col gap-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                    DHARMA-CHAKRA ANTI-HALLUCINATION WHEEL
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                    24 MATHEMATICAL CONSTRAINTS
                  </span>
                </div>

                <div className="flex items-center justify-center py-4">
                  <DharmaChakraWheel />
                </div>

                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  The 24 spokes represent 24 non-negotiable physical laws: Navier-Stokes mass conservation, Rayleigh atmospheric scattering limits, Stokes polarimetric bounds, and Planck blackbody radiation bounds.
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-white/40">Violations Permitted: 0.00%</span>
                  <button
                    onClick={() => {
                      soundFx.playChime();
                      onNavigate('dharma-gate');
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors cursor-pointer"
                  >
                    Audit Dharma Gate →
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
  ACT V — 9 NAVAGRAHA ENGINES (Tactile Swarm)
────────────────────────────────────────────────────────── */
const SectionNavagrahaTactile: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState<number | null>(null);

  const engines = [
    {
      num: '१',
      name: 'Bhoomi-Optical',
      title: 'Visual QA Engine',
      sensor: 'Cartosat-3 (0.28m)',
      role: 'Sub-meter optical spatial grounding and visual QA in 22 languages.',
      color: '#38bdf8',
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
      color: '#34d399',
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
      color: '#c084fc',
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
      color: '#60a5fa',
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
      color: '#2dd4bf',
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
      color: '#f87171',
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
      color: '#818cf8',
      icon: Wind,
      simQuery: 'Correct Delhi-NCR stubble burning aerosol optical depth in optical scene.',
      simAnswer: 'AOD 1.84 neutralized. Surface reflectance restored with 99.1% radiometric accuracy.',
    },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24 px-6 md:px-12 lg:px-16"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 50% 60%, rgba(192,132,252,0.03) 0%, #020408 75%)',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <FadeIn delay={50}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <p className="font-mono text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase">
              ACT V · 9 NAVAGRAHA COSMIC SPECIALISTS
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <MaskReveal delay={120}>
              <h2
                className="font-cinzel font-bold text-white leading-[0.96] tracking-tight"
                style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.5rem)' }}
              >
                9 Navagraha. <br />
                <span className="text-white/40 font-normal">
                  9 domains mastered with zero hallucination.
                </span>
              </h2>
            </MaskReveal>
          </div>

          <div className="lg:col-span-4">
            <FadeIn delay={250} y={10}>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'Hanken Grotesk', system-ui" }}>
                Each specialist engine governs a specific physical dimension — from microwave polarimetry to counterfactual causality.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {engines.map((eng, i) => {
            const IconComp = eng.icon;
            const isSelected = activeEngine === i;
            return (
              <FadeIn key={i} delay={120 + i * 35}>
                <div
                  onClick={() => {
                    soundFx.playTick();
                    setActiveEngine(isSelected ? null : i);
                  }}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between h-full ${
                    isSelected
                      ? 'bg-white/10 border-white/35 shadow-2xl scale-[1.01]'
                      : 'bg-white/2 border-white/8 hover:border-white/20 hover:bg-white/4'
                  }`}
                  style={{
                    borderTop: `3px solid ${eng.color}`,
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-cinzel font-bold text-2xl" style={{ color: eng.color }}>
                        {eng.num}
                      </span>
                      <div
                        className="p-2 rounded-xl"
                        style={{
                          backgroundColor: `${eng.color}15`,
                          color: eng.color,
                        }}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-cinzel font-bold text-base text-white mb-0.5">
                      {eng.name}
                    </h3>
                    <p className="text-[11px] font-mono font-semibold uppercase tracking-wider mb-2" style={{ color: eng.color }}>
                      {eng.title}
                    </p>
                    <p className="text-xs text-white/50 leading-relaxed font-sans mb-3">
                      {eng.role}
                    </p>
                  </div>

                  {isSelected ? (
                    <div className="mt-3 pt-3 border-t border-white/10 bg-black/50 -mx-3 -mb-3 p-3 rounded-b-xl">
                      <p className="text-[10px] font-mono text-cyan-300 uppercase font-bold mb-1">Live Engine Query:</p>
                      <p className="text-xs text-white/90 font-mono mb-2">"{eng.simQuery}"</p>
                      <p className="text-[10px] font-mono text-emerald-400 uppercase font-bold mb-1">Physical Verdict:</p>
                      <p className="text-xs text-emerald-200/90 font-mono leading-relaxed">{eng.simAnswer}</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-2 border-t border-white/5">
                      <span>Sensor: {eng.sensor.split(' ')[0]}</span>
                      <span className="text-cyan-400/80">Click to Simulate →</span>
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
  ACT VI — THE SOVEREIGN GRAND FINALE
────────────────────────────────────────────────────────── */
const SectionFinale: React.FC<{ onNavigate: (tab: NavigationTab) => void }> = ({ onNavigate }) => (
  <section
    className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden py-24 px-6 md:px-12 lg:px-16"
    style={{
      background: 'radial-gradient(ellipse 90% 70% at 50% 60%, rgba(56,189,248,0.06) 0%, #020408 80%)',
    }}
  >
    {/* Concentric Orbital Rings */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
      <div className="w-[600px] h-[600px] rounded-full border border-cyan-400/30 animate-spin" style={{ animationDuration: '45s' }} />
      <div className="absolute w-[900px] h-[900px] rounded-full border border-white/15 animate-spin" style={{ animationDuration: '70s', animationDirection: 'reverse' }} />
      <div className="absolute w-[1200px] h-[1200px] rounded-full border border-white/8" />
    </div>

    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
      <FadeIn delay={100}>
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-cyan-400/25 mb-8 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-cyan-300 uppercase">
            SOVEREIGN EARTH INTELLIGENCE · READY
          </span>
        </div>
      </FadeIn>

      <MaskReveal delay={200}>
        <h2
          className="font-cinzel font-bold text-white leading-[0.96] tracking-tight"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
        >
          The satellite <br />
          <span className="text-white/40 font-normal">
            is waiting for your query.
          </span>
        </h2>
      </MaskReveal>

      <FadeIn delay={450} y={16}>
        <p
          className="mt-8 text-white/60 leading-relaxed max-w-2xl"
          style={{ fontFamily: "'Hanken Grotesk', system-ui", fontSize: 'clamp(1rem, 1.4vw, 1.2rem)' }}
        >
          Ask any question about our subcontinent in your own language. Certified 0% physical hallucination, verifiable down to sub-pixel coordinates and Maxwell wave equations.
        </p>
      </FadeIn>

      <FadeIn delay={650}>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={() => {
              soundFx.playChime();
              onNavigate('mission-control');
            }}
            className="bg-white text-black px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-cyan-50 active:scale-95 transition-all glow-btn flex items-center gap-3 shadow-2xl shadow-white/15 cursor-pointer"
          >
            <Radio className="w-4 h-4 text-cyan-600 animate-pulse" />
            Enter Mission Control Live
          </button>
          <button
            onClick={() => {
              soundFx.playTelemetryPing();
              onNavigate('physics-lab');
            }}
            className="glass border border-white/20 text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-white hover:text-black active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
          >
            128-D Physics Engine
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              soundFx.playTick();
              onNavigate('dharma-gate');
            }}
            className="px-6 py-4 rounded-full text-xs font-mono text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors flex items-center gap-2 cursor-pointer"
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
    <SectionHumanGroundTruth onNavigate={onNavigate} />
    <div className="section-divider" />
    <SectionRealityPeeler />
    <div className="section-divider" />
    <SectionTimeScrubber onNavigate={onNavigate} />
    <div className="section-divider" />
    <SectionBlueprintCAD onNavigate={onNavigate} />
    <div className="section-divider" />
    <SectionNavagrahaTactile />
    <div className="section-divider" />
    <SectionFinale onNavigate={onNavigate} />
  </>
);
