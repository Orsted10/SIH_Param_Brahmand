"use client";

import React from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { cn } from "@/lib/utils/cn";
import { Globe, Mic, Wifi, WifiOff } from "lucide-react";

interface CapabilityBadgeProps {
  className?: string;
}

export const CapabilityBadge: React.FC<CapabilityBadgeProps> = ({ className }) => {
  const {
    systemStatus,
    networkOnline,
    webglSupported,
    microphoneSupported,
    setCapabilitiesModalOpen,
  } = useWorkspaceStore();

  return (
    <button
      onClick={() => setCapabilitiesModalOpen(true)}
      className={cn(
        "flex items-center gap-3 px-2.5 py-1 rounded-sm bg-void-1/80 border border-panel-hairline hover:border-cyan-accent/40 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-accent text-[11px] font-mono",
        className
      )}
      aria-label="Open System Capabilities and Environment Status"
      title="Click to view detailed browser capabilities"
    >
      {/* Core Ready Status */}
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            systemStatus === "SYSTEM_READY"
              ? "bg-status-green shadow-[0_0_6px_#77E6A5]"
              : "bg-status-amber animate-pulse"
          )}
        />
        <span className="text-space-white tracking-wide">
          {systemStatus === "SYSTEM_READY" ? "CORE READY" : "INITIALIZING"}
        </span>
      </div>

      <div className="w-[1px] h-3 bg-panel-hairline hidden sm:block" />

      {/* Network Indicator */}
      <div className="hidden sm:flex items-center gap-1 text-space-muted">
        {networkOnline ? (
          <>
            <Wifi className="w-3 h-3 text-status-green" />
            <span className="text-[10px]">ONLINE</span>
          </>
        ) : (
          <>
            <WifiOff className="w-3 h-3 text-status-amber" />
            <span className="text-[10px] text-status-amber">OFFLINE</span>
          </>
        )}
      </div>

      <div className="w-[1px] h-3 bg-panel-hairline hidden md:block" />

      {/* WebGL Indicator */}
      <div className="hidden md:flex items-center gap-1 text-space-muted">
        <Globe
          className={cn(
            "w-3 h-3",
            webglSupported ? "text-cyan-accent" : "text-status-amber"
          )}
        />
        <span className="text-[10px]">
          {webglSupported ? "WEBGL READY" : "STATIC GL"}
        </span>
      </div>

      <div className="w-[1px] h-3 bg-panel-hairline hidden lg:block" />

      {/* Microphone Status */}
      <div className="hidden lg:flex items-center gap-1 text-space-muted">
        <Mic
          className={cn(
            "w-3 h-3",
            microphoneSupported === "available"
              ? "text-status-green"
              : microphoneSupported === "denied"
              ? "text-status-red"
              : "text-space-faint"
          )}
        />
        <span className="text-[10px]">
          {microphoneSupported === "available"
            ? "MIC READY"
            : microphoneSupported === "denied"
            ? "MIC DENIED"
            : "MIC IDLE"}
        </span>
      </div>
    </button>
  );
};
