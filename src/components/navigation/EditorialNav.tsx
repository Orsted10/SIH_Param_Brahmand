"use client";

import React from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { SYSTEM_BRAND } from "@/lib/constants/palette";
import { LiveClock } from "./LiveClock";
import { Plus, RotateCcw, Cpu } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const EditorialNav: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    activeMode,
    setActiveMode,
    resetSession,
    setDiagnosticsOpen,
    systemStatus,
    webglSupported,
    networkOnline,
  } = useWorkspaceStore();

  const navItems = [
    { num: "01", label: "EXPLORE", id: "EXPLORE" },
    { num: "02", label: "ANALYZE", id: "ANALYZE" },
    { num: "03", label: "COMPARE", id: "COMPARE" },
    { num: "04", label: "EVIDENCE", id: "EVIDENCE" },
  ] as const;

  return (
    <>
      {/* 1. Top-Left System Wordmark & Project Identity */}
      <header className="fixed top-6 left-6 z-30 select-none font-mono flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent" />
          <span className="text-xs font-semibold tracking-widest text-space-white uppercase">
            {SYSTEM_BRAND.name}
          </span>
          <span className="text-[10px] tracking-wider text-cyan-accent/80 border-l border-panel-hairline pl-2">
            {SYSTEM_BRAND.secondary}
          </span>
        </div>
        <div className="text-[9px] text-space-faint tracking-widest uppercase pl-3.5">
          {SYSTEM_BRAND.context}
        </div>
      </header>

      {/* 2. Top-Right / Center Minimalist Editorial Navigation */}
      <nav
        aria-label="Editorial System Navigation"
        className="fixed top-6 right-6 z-30 flex items-center gap-4 select-none font-mono text-xs"
      >
        <div className="hidden md:flex items-center gap-5 pr-4 border-r border-panel-hairline">
          {navItems.map((item) => {
            const isActive = activeMode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "EXPLORE") {
                    setViewMode(viewMode === "MAP" ? "GLOBE" : "MAP");
                  } else {
                    setActiveMode(item.id);
                  }
                }}
                className={cn(
                  "flex items-center gap-1.5 transition-colors focus:outline-none",
                  isActive
                    ? "text-cyan-accent font-semibold"
                    : "text-space-muted hover:text-space-white"
                )}
              >
                <span className="text-[9px] text-space-faint">{item.num}</span>
                <span className="tracking-widest uppercase">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action: Insert Observation */}
        <button
          onClick={() => {
            const input = document.getElementById("file-upload-input");
            if (input) input.click();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-cyan-accent hover:text-void-0 bg-void-1/80 hover:bg-cyan-accent border border-cyan-accent/40 rounded-sm transition-all focus:outline-none tracking-widest uppercase"
          title="Load satellite observation (.tif, .png, .jpg)"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">INSERT OBSERVATION</span>
          <span className="sm:hidden">OBSERVATION</span>
        </button>

        {/* Diagnostics & Reset Shortcuts */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setDiagnosticsOpen(true)}
            title="Internal Diagnostics (Ctrl+Shift+D)"
            aria-label="Open Developer Diagnostics"
            className="p-1.5 text-space-faint hover:text-cyan-accent rounded transition-colors"
          >
            <Cpu className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetSession}
            title="Reset active study session"
            aria-label="Reset Session"
            className="p-1.5 text-space-faint hover:text-cyan-accent rounded transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* 3. Bottom-Left Microscopic Telemetry Line */}
      <div className="fixed bottom-6 left-6 z-30 select-none font-mono text-[10px] text-space-faint flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "w-1 h-1 rounded-full",
              systemStatus === "SYSTEM_READY" ? "bg-status-green" : "bg-status-amber"
            )}
          />
          <span className="text-space-muted">
            CORE / {systemStatus === "SYSTEM_READY" ? "READY" : "INIT"}
          </span>
        </div>
        <span className="text-space-faint">·</span>
        <span className="text-space-muted">
          3D / {webglSupported ? "READY" : "STATIC"}
        </span>
        <span className="text-space-faint">·</span>
        <span className="text-space-muted">
          MAP / {networkOnline ? "READY" : "OFFLINE"}
        </span>
      </div>

      {/* 4. Bottom-Right Accurate Browser Reference Time */}
      <div className="fixed bottom-6 right-6 z-30 select-none font-mono text-[10px] text-space-faint">
        <LiveClock showUtc={true} />
      </div>
    </>
  );
};
