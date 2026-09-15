import React, { useState } from 'react';
import { PhysicsEngine } from '../services/physicsEngine';
import { Cpu, Sliders, Activity, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export const PhysicsLabViewer: React.FC = () => {
  // Interactive Slider Inputs
  const [shh, setShh] = useState<number>(0.45);
  const [svv, setSvv] = useState<number>(-0.48);
  const [shv, setShv] = useState<number>(0.03);
  const [mndwi, setMndwi] = useState<number>(0.50);
  const [sarSigmaDb, setSarSigmaDb] = useState<number>(-20.0);
  const [demSlope, setDemSlope] = useState<number>(1.8);

  // Compute live physics
  const yamaguchi = PhysicsEngine.calculateYamaguchiAG4U(shh, svv, shv);
  const rvog = PhysicsEngine.calculateRVoGTreeHeight(180, 0.24, 750000, 35, 0.55);
  
  // OSWI calculation
  const oswiScore = 5 * mndwi - (sarSigmaDb / 5);
  const oswi = 1 / (1 + Math.exp(-oswiScore));

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-12 bg-space-950">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span>Layer 1: Prakriti-Veda 128-D Physics Manifold</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Interactive Physics & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">Mathematical Playground</span>
        </h2>
        <p className="text-sm md:text-base text-gray-300">
          Adjust radar scattering values, optical reflectance indices, and terrain slope below to witness live Pauli vector decomposition, PolInSAR RVoG 3D tree height inversion, and OSWI flood inundation calculations in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
        
        {/* Left Column: Live Interactive Physics Controllers (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="liquid-glass-strong rounded-3xl p-6 border border-emerald-500/30 shadow-2xl flex flex-col gap-5">
            
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-lg text-white">Live Physics Wave Controls</h3>
            </div>

            {/* Radar Scattering Controls (SHH, SVV, SHV) */}
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                1. Polarimetric SAR Wave Coefficients:
              </span>

              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>S_HH (Transmit H, Receive H):</span>
                  <span className="font-mono text-cyan-300">{shh.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="-1" max="1" step="0.01" value={shh}
                  onChange={(e) => setShh(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>S_VV (Transmit V, Receive V):</span>
                  <span className="font-mono text-cyan-300">{svv.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="-1" max="1" step="0.01" value={svv}
                  onChange={(e) => setSvv(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>S_HV (Cross-Polarization):</span>
                  <span className="font-mono text-cyan-300">{shv.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="-1" max="1" step="0.01" value={shv}
                  onChange={(e) => setShv(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Fused OSWI Controls */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                2. Fused Optical-SAR Standing Water Metric:
              </span>

              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>Optical MNDWI Index:</span>
                  <span className="font-mono text-amber-300">{mndwi.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="-1" max="1" step="0.01" value={mndwi}
                  onChange={(e) => setMndwi(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>Radar Backscatter σ0_VV (dB):</span>
                  <span className="font-mono text-amber-300">{sarSigmaDb.toFixed(1)} dB</span>
                </div>
                <input 
                  type="range" min="-30" max="5" step="0.5" value={sarSigmaDb}
                  onChange={(e) => setSarSigmaDb(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>DEM Terrain Slope (°):</span>
                  <span className="font-mono text-amber-300">{demSlope.toFixed(1)}°</span>
                </div>
                <input 
                  type="range" min="0" max="45" step="0.5" value={demSlope}
                  onChange={(e) => setDemSlope(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Live Calculated Formula Outputs (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Yamaguchi 4-Component Power Breakdown Card */}
          <div className="liquid-glass-strong rounded-3xl p-6 border border-cyan-500/30 shadow-2xl flex flex-col gap-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-bold text-base text-white">Yamaguchi AG4U Radar Power Decomposition</span>
              <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30">
                θ_rot = {yamaguchi.deorientationAngle}°
              </span>
            </div>

            {/* 4 Powers Visual Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-space-950/60 p-3.5 rounded-2xl border border-white/10">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Surface Bounce (Ps):</span>
                  <span className="font-mono text-cyan-300 font-bold">{yamaguchi.surfacePower} W/m²</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full transition-all duration-300" style={{ width: `${Math.min(100, yamaguchi.surfacePower * 100)}%` }} />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">Bounces off calm open water, asphalt roads, runways</span>
              </div>

              <div className="bg-space-950/60 p-3.5 rounded-2xl border border-white/10">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Double-Bounce (Pd):</span>
                  <span className="font-mono text-amber-300 font-bold">{yamaguchi.doubleBouncePower} W/m²</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${Math.min(100, yamaguchi.doubleBouncePower * 100)}%` }} />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">90° corner bounce off building walls or flooded tree trunks</span>
              </div>

              <div className="bg-space-950/60 p-3.5 rounded-2xl border border-white/10">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Volume Scattering (Pv):</span>
                  <span className="font-mono text-emerald-300 font-bold">{yamaguchi.volumePower} W/m²</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full transition-all duration-300" style={{ width: `${Math.min(100, yamaguchi.volumePower * 100)}%` }} />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">Random wave depolarization inside dense tree foliage</span>
              </div>

              <div className="bg-space-950/60 p-3.5 rounded-2xl border border-white/10">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Helix Scattering (Ph):</span>
                  <span className="font-mono text-purple-300 font-bold">{yamaguchi.helixPower} W/m²</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-400 h-full transition-all duration-300" style={{ width: `${Math.min(100, yamaguchi.helixPower * 100)}%` }} />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">Circular polarization off power towers & metallic machinery</span>
              </div>

            </div>

          </div>

          {/* Fused OSWI & PolInSAR RVoG 3D Tree Height Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* OSWI Card */}
            <div className="liquid-glass-strong rounded-3xl p-5 border border-amber-500/30 shadow-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  EQUATION 4.1: OSWI WATER INDEX
                </span>
                <h4 className="font-bold text-sm text-white mb-2">Fused Optical-SAR Standing Water</h4>
                <div className="text-3xl font-extrabold font-mono text-amber-300 mb-2">
                  {(oswi * 100).toFixed(2)}%
                </div>
                <p className="text-xs text-gray-300">
                  {oswi > 0.8 
                    ? '✓ CERTIFIED STANDING FLOOD WATER (High positive MNDWI + Mirror specular radar backscatter)' 
                    : 'x Dry ground / Non-water target'}
                </p>
              </div>
            </div>

            {/* PolInSAR RVoG Tree Height Card */}
            <div className="liquid-glass-strong rounded-3xl p-5 border border-emerald-500/30 shadow-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  EQUATION 2.1: POLINSAR RVOG
                </span>
                <h4 className="font-bold text-sm text-white mb-2">3D Forest Canopy Height (hv)</h4>
                <div className="text-3xl font-extrabold font-mono text-emerald-300 mb-2">
                  {rvog.treeHeightMeters} meters
                </div>
                <p className="text-xs text-gray-300">
                  Inverted from radar interferometric phase difference Δφ = 0.55 rad across vertical wavenumber kz = {rvog.verticalWavenumber} rad/m.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
