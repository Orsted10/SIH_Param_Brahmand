"use client";

import React, { useEffect, useState } from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { detectWebGLSupport } from "@/lib/browser/webgl";
import { subscribeToReducedMotion, checkPrefersReducedMotion } from "@/lib/browser/motion";
import { SystemHeader } from "@/components/shell/SystemHeader";
import { IntelligenceRail } from "@/components/shell/IntelligenceRail";
import { ObservationWorkspace } from "@/components/workspace/ObservationWorkspace";
import { CommandDock } from "@/components/shell/CommandDock";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { DevDiagnosticsPanel } from "@/components/shell/DevDiagnosticsPanel";
import { CapabilityModal } from "@/components/navigation/CapabilityModal";
import { FutureEnginePanel } from "@/components/workspace/FutureEnginePanel";
import { SessionAuditViewer } from "@/components/workspace/SessionAuditViewer";
import { ToastContainer } from "@/components/shell/ToastContainer";
import { SYSTEM_BRAND } from "@/lib/constants/palette";

export default function Home() {
  const {
    setSystemStatus,
    setWebglSupported,
    setNetworkOnline,
    setReducedMotion,
  } = useWorkspaceStore();

  const [entranceComplete, setEntranceComplete] = useState<boolean>(false);
  const [initStage, setInitStage] = useState<number>(0);

  // 1. Initialize Hardware Capabilities and Event Listeners
  useEffect(() => {
    // Detect WebGL
    const hasWebgl = detectWebGLSupport();
    setWebglSupported(hasWebgl);

    // Detect Online / Offline State
    const updateOnline = () => setNetworkOnline(navigator.onLine);
    setNetworkOnline(navigator.onLine);
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);

    // Detect Reduced Motion
    const initialReduced = checkPrefersReducedMotion();
    setReducedMotion(initialReduced);
    const unsubscribeMotion = subscribeToReducedMotion(setReducedMotion);

    // 2. Cinematic Entrance Sequence (<1800ms)
    if (initialReduced) {
      // Skip immediately for reduced motion accessibility
      setEntranceComplete(true);
      setSystemStatus("SYSTEM_READY");
    } else {
      const t1 = setTimeout(() => setInitStage(1), 300);
      const t2 = setTimeout(() => setInitStage(2), 800);
      const t3 = setTimeout(() => {
        setEntranceComplete(true);
        setSystemStatus("SYSTEM_READY");
      }, 1400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        window.removeEventListener("online", updateOnline);
        window.removeEventListener("offline", updateOnline);
        unsubscribeMotion();
      };
    }

    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
      unsubscribeMotion();
    };
  }, [setSystemStatus, setWebglSupported, setNetworkOnline, setReducedMotion]);

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-void-0 font-sans">
      {/* Cinematic One-Time Entrance Overlay */}
      {!entranceComplete && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void-0 text-space-white select-none transition-opacity duration-500 font-mono"
        >
          {/* Subtle Scanning Line */}
          <div className="w-48 h-[1px] bg-cyan-accent/80 animate-pulse mb-6" />

          <div className="flex flex-col items-center gap-1.5 text-center">
            <span className="text-xs font-bold tracking-widest text-space-white">
              {SYSTEM_BRAND.name}
            </span>
            <span className="text-[10px] text-cyan-accent tracking-wider">
              {SYSTEM_BRAND.secondary} ({SYSTEM_BRAND.devanagari})
            </span>
            <span className="text-[9px] text-space-faint tracking-widest uppercase mt-1">
              {initStage === 0 && "CALIBRATING PLANETARY INSTRUMENTS..."}
              {initStage === 1 && "CONNECTING GEOSPATIAL RUNTIME..."}
              {initStage >= 2 && "INITIALIZATION COMPLETE · SYSTEM READY"}
            </span>
          </div>

          <div className="mt-8 text-[9px] text-space-faint tracking-wider">
            {SYSTEM_BRAND.context}
          </div>
        </div>
      )}

      {/* Main Operating System Interface */}
      <SystemHeader />
      <IntelligenceRail />
      <ObservationWorkspace />
      <CommandDock />

      {/* Modals, Palettes & Overlays */}
      <CommandPalette />
      <DevDiagnosticsPanel />
      <CapabilityModal />
      <FutureEnginePanel />
      <SessionAuditViewer />
      <ToastContainer />
    </div>
  );
}
