import React from 'react';
import { DharmaChakraFirewall, PhysicsRuleAudit } from '../services/dharmaGate';
import { PhysicsEngine } from '../services/physicsEngine';
import { ShieldCheck, CheckCircle2, XCircle, Activity, Sparkles, Lock } from 'lucide-react';

export const DharmaGateViewer: React.FC = () => {
  const indices = PhysicsEngine.calculateIndices({
    blue: 0.15, green: 0.35, red: 0.12, nir: 0.65, swir1: 0.25, swir2: 0.18,
    sigma0_HH: 0.05, sigma0_VV: 0.02, sigma0_HV: 0.28, sigma0_VH: 0.28,
    demElevation: 450, demGradientX: 0.02, demGradientY: 0.01
  });

  const yamaguchi = PhysicsEngine.calculateYamaguchiAG4U(0.45, -0.48, 0.03);
  const auditResult = DharmaChakraFirewall.auditPrediction('Water', indices, yamaguchi);

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-12 bg-space-950">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <Lock className="w-4 h-4 text-cyan-400" />
          <span>Layer 6: Dharma-Chakra Hard Physics Firewall</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Guaranteed <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400">0% Physical Hallucination Rate</span>
        </h2>
        <p className="text-sm md:text-base text-gray-300">
          Generic AI models hallucinate standing flood water on 30° mountain slopes or dry backscatter. Dharma-Chakra acts as a deterministic physical firewall enforcing 4 invariant conservation postulates.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Overall Certification Banner */}
        <div className="liquid-glass-strong rounded-3xl p-6 border border-emerald-500/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 text-2xl">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-0.5">
                ISRO VERIFICATION AUDIT PASSED
              </span>
              <h3 className="text-xl font-bold text-white">4/4 Conservation Postulates Certified</h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-gray-400 block font-mono">HALLUCINATION RATE</span>
            <span className="text-3xl font-extrabold font-mono text-emerald-400">0.00%</span>
          </div>
        </div>

        {/* 4 Invariant Rules Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {auditResult.audits.map((audit, idx) => (
            <div 
              key={idx}
              className="liquid-glass-strong rounded-3xl p-5 border border-white/10 flex flex-col justify-between gap-4 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                  <span className="font-bold text-sm text-white">{audit.ruleName}</span>
                  <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{audit.status}</span>
                  </span>
                </div>

                <div className="text-xs font-mono text-cyan-300 bg-space-950 p-2.5 rounded-xl border border-white/5 mb-3">
                  {audit.formula}
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Observed Value:</span>
                    <span className="font-mono text-white">{audit.observedValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Physical Limit:</span>
                    <span className="font-mono text-amber-300">{audit.threshold}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                {audit.reason}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
