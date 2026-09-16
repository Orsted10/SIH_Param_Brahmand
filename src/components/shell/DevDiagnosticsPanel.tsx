"use client";

import React, { useEffect, useState } from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { getWebGLDiagnostics, WebGLDiagnosticInfo } from "@/lib/browser/webgl";
import { X, Terminal } from "lucide-react";
import { ScientificRule } from "../typography/ScientificRule";

export const DevDiagnosticsPanel: React.FC = () => {
  const {
    diagnosticsOpen,
    setDiagnosticsOpen,
    systemStatus,
    activeMode,
    globeVisible,
    networkOnline,
    webglSupported,
    microphoneSupported,
    reducedMotion,
    uploadedAssets,
    queryHistory,
    selectedLocation,
    mapViewport,
  } = useWorkspaceStore();

  const [glInfo, setGlInfo] = useState<WebGLDiagnosticInfo | null>(null);
  const [viewportSize, setViewportSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [fps, setFps] = useState<number>(60);

  useEffect(() => {
    if (diagnosticsOpen) {
      setGlInfo(getWebGLDiagnostics());
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Measure genuine frame rate over 1 second
      let frames = 0;
      let lastTime = performance.now();
      let animId: number;

      const loop = (now: number) => {
        frames++;
        if (now - lastTime >= 1000) {
          setFps(Math.round((frames * 1000) / (now - lastTime)));
          frames = 0;
          lastTime = now;
        }
        animId = requestAnimationFrame(loop);
      };

      animId = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(animId);
    }
  }, [diagnosticsOpen]);

  if (!diagnosticsOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dev-diag-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-0/80 backdrop-blur-md font-mono"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-sm bg-void-1 border border-cyan-accent/50 shadow-2xl p-6 text-space-white overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-accent" />
            <div>
              <h2 id="dev-diag-title" className="text-sm font-semibold tracking-wider text-cyan-accent uppercase">
                ENGINEERING DIAGNOSTICS & TELEMETRY
              </h2>
              <p className="text-[10px] text-space-faint">
                Internal developer inspection console · Toggle with Ctrl + Shift + D
              </p>
            </div>
          </div>
          <button
            onClick={() => setDiagnosticsOpen(false)}
            className="p-1 text-space-muted hover:text-cyan-accent transition-colors rounded focus:outline-none focus:ring-1 focus:ring-cyan-accent"
            aria-label="Close Diagnostics"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <ScientificRule className="my-2" />

        {/* Scrollable Telemetry Grid */}
        <div className="overflow-y-auto space-y-4 pr-1 text-xs">
          {/* Hardware & Runtime Performance */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-cyan-accent/80 font-bold">
              [RUNTIME PERFORMANCE]
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1.5">
              <div className="p-2 rounded bg-void-0/70 border border-panel-hairline">
                <span className="text-[10px] text-space-faint block">Measured FPS</span>
                <span className="text-sm text-status-green font-bold">{fps} FPS</span>
              </div>
              <div className="p-2 rounded bg-void-0/70 border border-panel-hairline">
                <span className="text-[10px] text-space-faint block">Viewport Dimensions</span>
                <span className="text-xs text-space-white">{viewportSize.width} × {viewportSize.height} px</span>
              </div>
              <div className="p-2 rounded bg-void-0/70 border border-panel-hairline">
                <span className="text-[10px] text-space-faint block">Device Pixel Ratio</span>
                <span className="text-xs text-space-white">{typeof window !== "undefined" ? window.devicePixelRatio.toFixed(2) : 1}x</span>
              </div>
            </div>
          </div>

          {/* WebGL Architecture */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-cyan-accent/80 font-bold">
              [GRAPHICS & SHADER PIPELINE]
            </span>
            <div className="p-2.5 rounded bg-void-0/70 border border-panel-hairline mt-1.5 space-y-1">
              <div className="flex justify-between">
                <span className="text-space-muted">WebGL 2.0 Support:</span>
                <span className={webglSupported ? "text-status-green" : "text-status-amber"}>
                  {webglSupported ? "CONFIRMED ACCELERATED" : "FALLBACK STATIC MODE"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-space-muted">GPU Unmasked Renderer:</span>
                <span className="text-space-white text-[11px] truncate max-w-[280px]">{glInfo?.renderer || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-space-muted">GPU Hardware Vendor:</span>
                <span className="text-space-white text-[11px]">{glInfo?.vendor || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Application State Machine */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-cyan-accent/80 font-bold">
              [APPLICATION STATE MACHINE]
            </span>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              <div className="p-2 rounded bg-void-0/70 border border-panel-hairline">
                <span className="text-[10px] text-space-faint block">Core Mount Status</span>
                <span className="text-space-white">{systemStatus}</span>
              </div>
              <div className="p-2 rounded bg-void-0/70 border border-panel-hairline">
                <span className="text-[10px] text-space-faint block">Active Instrument Mode</span>
                <span className="text-cyan-accent font-semibold">{activeMode}</span>
              </div>
              <div className="p-2 rounded bg-void-0/70 border border-panel-hairline">
                <span className="text-[10px] text-space-faint block">Active Earth Viewport</span>
                <span className="text-space-white">{globeVisible ? "3D Planetary Globe" : "2D Geospatial Map"}</span>
              </div>
              <div className="p-2 rounded bg-void-0/70 border border-panel-hairline">
                <span className="text-[10px] text-space-faint block">Reduced Motion Pref</span>
                <span className="text-space-white">{reducedMotion ? "TRUE (Paused)" : "FALSE (Animated)"}</span>
              </div>
              <div className="p-2 rounded bg-void-0/70 border border-panel-hairline">
                <span className="text-[10px] text-space-faint block">Network Telemetry</span>
                <span className={networkOnline ? "text-status-green font-semibold" : "text-status-amber"}>
                  {networkOnline ? "ONLINE" : "OFFLINE"}
                </span>
              </div>
              <div className="p-2 rounded bg-void-0/70 border border-panel-hairline">
                <span className="text-[10px] text-space-faint block">Audio Hardware / Mic</span>
                <span className="text-space-white uppercase">{microphoneSupported}</span>
              </div>
            </div>
          </div>

          {/* Map Telemetry */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-cyan-accent/80 font-bold">
              [GEOSPATIAL REFERENCE & CAMERA]
            </span>
            <div className="p-2.5 rounded bg-void-0/70 border border-panel-hairline mt-1.5 space-y-1">
              <div className="flex justify-between">
                <span className="text-space-muted">Study Point:</span>
                <span className="text-cyan-accent">
                  {selectedLocation
                    ? `${selectedLocation.latitude.toFixed(4)}° N, ${selectedLocation.longitude.toFixed(4)}° E`
                    : "None"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-space-muted">Map Center [Lng, Lat]:</span>
                <span className="text-space-white">
                  [{mapViewport.center[0].toFixed(4)}, {mapViewport.center[1].toFixed(4)}]
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-space-muted">Map Zoom / Pitch:</span>
                <span className="text-space-white">
                  {mapViewport.zoom.toFixed(2)} / {mapViewport.pitch.toFixed(1)}°
                </span>
              </div>
            </div>
          </div>

          {/* Asset & Query Counts */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-cyan-accent/80 font-bold">
              [LOCAL MEMORY FOOTPRINT]
            </span>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              <div className="p-2 rounded bg-void-0/70 border border-panel-hairline">
                <span className="text-[10px] text-space-faint block">Ingested In-Memory Rasters</span>
                <span className="text-space-white">{uploadedAssets.length} items</span>
              </div>
              <div className="p-2 rounded bg-void-0/70 border border-panel-hairline">
                <span className="text-[10px] text-space-faint block">Captured Query Events</span>
                <span className="text-space-white">{queryHistory.length} events</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-panel-hairline flex items-center justify-between text-[10px] text-space-faint">
          <span>PARAM BRAHMAND · SIH26167 · ISRO SAC</span>
          <button
            onClick={() => setDiagnosticsOpen(false)}
            className="px-3 py-1 rounded bg-panel hover:bg-panel-border text-space-white border border-panel-hairline transition-colors"
          >
            Dismiss Console
          </button>
        </div>
      </div>
    </div>
  );
};
