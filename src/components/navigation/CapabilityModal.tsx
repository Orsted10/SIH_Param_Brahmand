"use client";

import React, { useEffect, useState } from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { getWebGLDiagnostics, WebGLDiagnosticInfo } from "@/lib/browser/webgl";
import { X, ShieldCheck, Cpu, Mic, Wifi, Activity } from "lucide-react";
import { ScientificRule } from "../typography/ScientificRule";

export const CapabilityModal: React.FC = () => {
  const {
    capabilitiesModalOpen,
    setCapabilitiesModalOpen,
    networkOnline,
    webglSupported,
    microphoneSupported,
    reducedMotion,
    uploadedAssets,
    queryHistory,
  } = useWorkspaceStore();

  const [glInfo, setGlInfo] = useState<WebGLDiagnosticInfo | null>(null);
  const [dpr, setDpr] = useState<number>(1);

  useEffect(() => {
    if (capabilitiesModalOpen) {
      setGlInfo(getWebGLDiagnostics());
      setDpr(typeof window !== "undefined" ? window.devicePixelRatio : 1);
    }
  }, [capabilitiesModalOpen]);

  if (!capabilitiesModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="capabilities-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-0/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg rounded-sm bg-panel-strong border border-cyan-accent/30 shadow-2xl p-6 text-space-white font-mono animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-accent" />
            <div>
              <h2 id="capabilities-title" className="text-sm font-semibold tracking-wider uppercase text-space-white">
                Browser & System Diagnostics
              </h2>
              <p className="text-[11px] text-space-muted">
                Real-time runtime capabilities verified directly from browser APIs
              </p>
            </div>
          </div>
          <button
            onClick={() => setCapabilitiesModalOpen(false)}
            className="p-1 text-space-muted hover:text-cyan-accent transition-colors rounded focus:outline-none focus:ring-1 focus:ring-cyan-accent"
            aria-label="Close Diagnostics Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <ScientificRule className="my-2" />

        {/* Capability Rows */}
        <div className="space-y-3 py-2 text-xs">
          {/* Core System */}
          <div className="flex items-center justify-between p-2 rounded bg-void-0/60 border border-panel-hairline">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-status-green" />
              <span className="text-space-muted">Core Application State:</span>
            </div>
            <span className="text-status-green font-semibold">CORE READY (Mounted)</span>
          </div>

          {/* WebGL Hardware */}
          <div className="p-2.5 rounded bg-void-0/60 border border-panel-hairline space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-accent" />
                <span className="text-space-muted">Hardware WebGL:</span>
              </div>
              <span className={webglSupported ? "text-cyan-accent font-semibold" : "text-status-amber"}>
                {webglSupported ? "HARDWARE ACCELERATED" : "STATIC GL MODE"}
              </span>
            </div>
            {glInfo && (
              <div className="text-[10px] text-space-faint pl-6 space-y-0.5">
                <div>Renderer: <span className="text-space-muted">{glInfo.renderer}</span></div>
                <div>Vendor: <span className="text-space-muted">{glInfo.vendor}</span></div>
              </div>
            )}
          </div>

          {/* Network State */}
          <div className="flex items-center justify-between p-2 rounded bg-void-0/60 border border-panel-hairline">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-cyan-accent" />
              <span className="text-space-muted">Network Telemetry:</span>
            </div>
            <span className={networkOnline ? "text-status-green font-semibold" : "text-status-amber"}>
              {networkOnline ? "ONLINE (Tile Streaming Active)" : "OFFLINE (Local Session Only)"}
            </span>
          </div>

          {/* Microphone Hardware */}
          <div className="flex items-center justify-between p-2 rounded bg-void-0/60 border border-panel-hairline">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-cyan-accent" />
              <span className="text-space-muted">Audio Input / Microphone:</span>
            </div>
            <span className="text-space-white uppercase">
              {microphoneSupported === "unknown"
                ? "Not Requested (Awaiting Interaction)"
                : microphoneSupported}
            </span>
          </div>

          {/* Motion & Viewport */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded bg-void-0/60 border border-panel-hairline">
              <div className="text-[10px] text-space-faint uppercase">Reduced Motion</div>
              <div className="text-xs text-space-white mt-0.5">{reducedMotion ? "Active (Reduced)" : "Standard"}</div>
            </div>
            <div className="p-2 rounded bg-void-0/60 border border-panel-hairline">
              <div className="text-[10px] text-space-faint uppercase">Device Pixel Ratio</div>
              <div className="text-xs text-space-white mt-0.5">{dpr.toFixed(2)}x (Clamped to 1.75x)</div>
            </div>
          </div>

          {/* Session Data Counts */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded bg-void-0/60 border border-panel-hairline">
              <div className="text-[10px] text-space-faint uppercase">Active Local Assets</div>
              <div className="text-xs text-space-white mt-0.5">{uploadedAssets.length} observations</div>
            </div>
            <div className="p-2 rounded bg-void-0/60 border border-panel-hairline">
              <div className="text-[10px] text-space-faint uppercase">Captured Queries</div>
              <div className="text-xs text-space-white mt-0.5">{queryHistory.length} events logged</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-panel-hairline flex items-center justify-between text-[10px] text-space-faint">
          <span>SIH26167 · ISRO SAC</span>
          <button
            onClick={() => setCapabilitiesModalOpen(false)}
            className="px-3 py-1 rounded bg-panel hover:bg-panel-border text-space-white border border-panel-hairline transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
