"use client";

import React from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { WorkspaceMode } from "@/types/mission";
import { SYSTEM_BRAND } from "@/lib/constants/palette";
import { CapabilityBadge } from "../navigation/CapabilityBadge";
import { LiveClock } from "../navigation/LiveClock";
import { RotateCcw, Compass, Crosshair, Layers, GitCompare } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const SystemHeader: React.FC = () => {
  const { activeMode, setActiveMode, resetSession } = useWorkspaceStore();

  const primaryModes: { id: WorkspaceMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "MISSION", label: "MISSION", icon: Crosshair },
    { id: "EXPLORE", label: "EXPLORE", icon: Compass },
    { id: "ANALYZE", label: "ANALYZE", icon: Layers },
    { id: "COMPARE", label: "COMPARE", icon: GitCompare },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 border-b border-panel-hairline bg-void-1/80 backdrop-blur-md px-4 flex items-center justify-between select-none">
      {/* Left: System Lockup */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold tracking-widest text-space-white">
              {SYSTEM_BRAND.name}
            </span>
            <span className="text-[10px] font-mono tracking-wider text-cyan-accent/80 border-l border-panel-hairline pl-2">
              {SYSTEM_BRAND.secondary}
            </span>
            <span className="hidden sm:inline text-[9px] text-space-faint font-mono">
              ({SYSTEM_BRAND.devanagari})
            </span>
          </div>
          <span className="text-[9px] font-mono text-space-faint tracking-wider hidden sm:block">
            {SYSTEM_BRAND.context}
          </span>
        </div>
      </div>

      {/* Center: Primary Mode Switcher */}
      <nav
        aria-label="System Operational Modes"
        className="hidden md:flex items-center gap-1 bg-void-0/60 p-1 rounded-sm border border-panel-hairline"
      >
        {primaryModes.map((mode) => {
          const isActive = activeMode === mode.id;
          const Icon = mode.icon;

          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-mono transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-cyan-accent",
                isActive
                  ? "text-cyan-accent font-semibold bg-cyan-soft/30 shadow-[inset_0_0_12px_rgba(115,230,255,0.1)]"
                  : "text-space-muted hover:text-space-white hover:bg-void-1/60"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{mode.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-1 right-1 h-[1.5px] bg-cyan-accent rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right: Runtime Telemetry, Clock & Reset */}
      <div className="flex items-center gap-3">
        <CapabilityBadge />
        <div className="w-[1px] h-4 bg-panel-hairline hidden lg:block" />
        <LiveClock className="hidden lg:flex" />

        {/* Reset Session Control */}
        <button
          onClick={resetSession}
          title="Reset active study session to defaults"
          aria-label="Reset active session"
          className="p-1.5 rounded text-space-muted hover:text-cyan-accent hover:bg-void-2/60 border border-transparent hover:border-panel-hairline transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-accent"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
