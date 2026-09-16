"use client";

import React from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { WorkspaceMode } from "@/types/mission";
import {
  Crosshair,
  Globe2,
  Upload,
  ScanSearch,
  GitCompare,
  ShieldCheck,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface RailItem {
  id: WorkspaceMode | "INGEST";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const IntelligenceRail: React.FC = () => {
  const { activeMode, setActiveMode, sidebarOpen, setSidebarOpen } = useWorkspaceStore();

  const items: RailItem[] = [
    {
      id: "MISSION",
      label: "MISSION",
      icon: Crosshair,
      description: "Primary Earth Observation Cockpit",
    },
    {
      id: "EXPLORE",
      label: "EXPLORE",
      icon: Globe2,
      description: "Planetary Coordinate & Geospatial Viewer",
    },
    {
      id: "INGEST",
      label: "INGEST",
      icon: Upload,
      description: "Raster Observation Ingestion Interface",
    },
    {
      id: "ANALYZE",
      label: "ANALYZE",
      icon: ScanSearch,
      description: "Single-Image & Multimodal Reasoning Engine",
    },
    {
      id: "COMPARE",
      label: "COMPARE",
      icon: GitCompare,
      description: "Bi-Temporal Optical & SAR Change Detection",
    },
    {
      id: "EVIDENCE",
      label: "EVIDENCE",
      icon: ShieldCheck,
      description: "Auditable Grounding & Physics Verification",
    },
    {
      id: "REPORT",
      label: "REPORT",
      icon: FileText,
      description: "Disaster SOP & Scientific Intelligence Output",
    },
  ];

  const handleItemClick = (item: RailItem) => {
    if (item.id === "INGEST") {
      // Ingest mode is part of Mission workspace upload
      setActiveMode("MISSION");
      const uploadTrigger = document.getElementById("file-upload-input");
      if (uploadTrigger) uploadTrigger.click();
      return;
    }
    setActiveMode(item.id as WorkspaceMode);
  };

  return (
    <aside
      aria-label="Intelligence Operations Rail"
      className={cn(
        "fixed top-14 left-0 bottom-0 z-30 flex flex-col justify-between border-r border-panel-hairline bg-void-1/90 backdrop-blur-md transition-all duration-200 select-none",
        sidebarOpen ? "w-48 sm:w-56" : "w-14"
      )}
    >
      {/* Top Section: System Instrument List */}
      <div className="flex flex-col gap-1 p-2">
        <div className="flex items-center justify-between px-2 py-1.5 mb-1">
          {sidebarOpen ? (
            <span className="font-mono text-[10px] tracking-widest text-space-faint uppercase">
              Instruments
            </span>
          ) : (
            <div className="w-full flex justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent" />
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden sm:block p-1 text-space-muted hover:text-cyan-accent transition-colors rounded focus:outline-none focus:ring-1 focus:ring-cyan-accent"
            title={sidebarOpen ? "Collapse Intelligence Rail" : "Expand Intelligence Rail"}
            aria-label={sidebarOpen ? "Collapse Intelligence Rail" : "Expand Intelligence Rail"}
          >
            {sidebarOpen ? (
              <PanelLeftClose className="w-3.5 h-3.5" />
            ) : (
              <PanelLeftOpen className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {items.map((item) => {
          const isActive = activeMode === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              title={`${item.label} — ${item.description}`}
              className={cn(
                "group relative flex items-center gap-3 w-full px-2.5 py-2 rounded-sm text-left font-mono text-xs transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-cyan-accent",
                isActive
                  ? "bg-cyan-soft/30 text-cyan-accent font-semibold border-l-2 border-cyan-accent"
                  : "text-space-muted hover:text-space-white hover:bg-void-2/60"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  isActive ? "text-cyan-accent" : "text-space-faint group-hover:text-cyan-accent"
                )}
              />

              {sidebarOpen && (
                <div className="flex flex-col min-w-0">
                  <span className="truncate tracking-wider">{item.label}</span>
                  <span className="truncate text-[9px] text-space-faint tracking-normal font-sans">
                    {item.description}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Section: Spacecraft Specs & WGS84 Spec */}
      {sidebarOpen && (
        <div className="p-3 border-t border-panel-hairline bg-void-0/40 text-[10px] font-mono text-space-faint space-y-1">
          <div className="flex items-center justify-between">
            <span>REFERENCE:</span>
            <span className="text-space-muted">WGS84 / EPSG:4326</span>
          </div>
          <div className="flex items-center justify-between">
            <span>PROJECTION:</span>
            <span className="text-space-muted">WEB MERCATOR</span>
          </div>
        </div>
      )}
    </aside>
  );
};
