import React, { useState } from 'react';
import { ISROExecutionTrace } from '../types';
import { GroqService } from '../services/groqService';
import { FileText, Copy, Check, ShieldCheck, Cpu, Code2, Sparkles } from 'lucide-react';

export const ExecutionTraceViewer: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const sampleTrace: ISROExecutionTrace = GroqService['generateAuditableTrace'](
    'Identify sub-canopy flood inundation in Kaziranga National Park under 100% monsoon cloud cover.',
    'Assam Brahmaputra Floods'
  );

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(sampleTrace, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-12 bg-space-950">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass border border-purple-500/40 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <FileText className="w-4 h-4 text-purple-400" />
          <span>ISRO SAC PS 26167 Section 4 Standardized Requirement</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Auditable <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">JSON Execution Trace</span>
        </h2>
        <p className="text-sm md:text-base text-gray-300">
          The ISRO problem statement explicitly mandates an auditable execution trace. Param Brahmand logs every agentic step, MCTS decision node, physics verification rule, and calibration metric into a standardized JSON payload.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
        
        {/* Left Column: Visual Tree of MCTS Execution Steps (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="liquid-glass-strong rounded-3xl p-6 border border-purple-500/30 shadow-2xl flex flex-col gap-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-lg text-white">Sankalpa-Param MCTS Nodes</h3>
              </div>
              <span className="text-xs font-mono text-purple-300 bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-500/40">
                Trace ID: {sampleTrace.queryId}
              </span>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-4">
              {sampleTrace.mctsPlannerNodes.map((node) => (
                <div 
                  key={node.step}
                  className="bg-space-950/80 rounded-2xl p-4 border border-white/10 flex flex-col gap-2 relative pl-6"
                >
                  <div className="absolute left-2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-purple-500 to-cyan-400" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-purple-300">
                      STEP {node.step}: {node.action}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      {node.status} (Conf: {(node.confidence * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <span className="text-xs text-cyan-300 font-semibold">{node.agent}</span>
                  <p className="text-xs text-gray-300 leading-relaxed">{node.decisionReason}</p>
                  <div className="text-[11px] font-mono text-gray-400 bg-black/50 p-2 rounded-xl border border-white/5">
                    {node.outputSnippet}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Column: Raw JSON Output Viewport (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="liquid-glass-strong rounded-3xl p-6 border border-cyan-500/30 shadow-2xl flex flex-col gap-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-lg text-white">Standardized JSON Payload</h3>
              </div>

              <button
                onClick={handleCopyJson}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500/30 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>

            {/* Pretty Printed JSON Code View */}
            <pre className="bg-space-950 p-4 rounded-2xl border border-white/10 text-xs text-cyan-300 font-mono overflow-x-auto max-h-[520px] scrollbar-hide">
              {JSON.stringify(sampleTrace, null, 2)}
            </pre>

          </div>
        </div>

      </div>
    </section>
  );
};
