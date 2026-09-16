"use client";

import React from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { Eye, Upload, MessageSquareCode, GitCompare, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const CommandDock: React.FC = () => {
  const { toggleGlobe, globeVisible, openFutureDialog } = useWorkspaceStore();

  const handleAction = (action: string) => {
    switch (action) {
      case "OBSERVE":
        toggleGlobe();
        break;
      case "INGEST": {
        const fileInput = document.getElementById("file-upload-input");
        if (fileInput) fileInput.click();
        break;
      }
      case "QUESTION": {
        const queryBox = document.getElementById("query-composer-textarea");
        if (queryBox) {
          queryBox.focus();
          queryBox.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        break;
      }
      case "COMPARE":
        openFutureDialog("COMPARE");
        break;
      case "EVIDENCE":
        openFutureDialog("EVIDENCE");
        break;
    }
  };

  return (
    <div
      role="toolbar"
      aria-label="Scientific Command Operations Dock"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 p-1.5 rounded-sm bg-panel-strong/90 backdrop-blur-md border border-cyan-accent/20 shadow-2xl select-none"
    >
      {/* OBSERVE / VIEW TOGGLE */}
      <button
        onClick={() => handleAction("OBSERVE")}
        title={`Switch between 3D Planetary Globe and 2D Geospatial Basemap (Current: ${
          globeVisible ? "Globe" : "Map"
        })`}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-mono transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-cyan-accent",
          globeVisible
            ? "bg-cyan-soft/40 text-cyan-accent border border-cyan-accent/40 font-semibold"
            : "text-space-muted hover:text-space-white hover:bg-void-2/60"
        )}
      >
        <Eye className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">OBSERVE</span>
        <span className="text-[10px] text-cyan-accent font-semibold px-1 rounded bg-void-0/60">
          {globeVisible ? "3D GLOBE" : "2D MAP"}
        </span>
      </button>

      <div className="w-[1px] h-4 bg-panel-hairline" />

      {/* INGEST */}
      <button
        onClick={() => handleAction("INGEST")}
        title="Load satellite imagery or remote-sensing rasters (.tif, .png, .jpg)"
        className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-mono text-space-muted hover:text-space-white hover:bg-void-2/60 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-accent"
      >
        <Upload className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">INGEST</span>
      </button>

      <div className="w-[1px] h-4 bg-panel-hairline" />

      {/* QUESTION */}
      <button
        onClick={() => handleAction("QUESTION")}
        title="Formulate natural language query for spatial grounding"
        className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-mono text-space-muted hover:text-space-white hover:bg-void-2/60 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-accent"
      >
        <MessageSquareCode className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">QUESTION</span>
      </button>

      <div className="w-[1px] h-4 bg-panel-hairline" />

      {/* COMPARE (Upcoming) */}
      <button
        onClick={() => handleAction("COMPARE")}
        title="Bi-Temporal Change Analysis (Phase 02 Engine)"
        className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-mono text-space-faint hover:text-space-muted hover:bg-void-2/60 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-accent"
      >
        <GitCompare className="w-3.5 h-3.5" />
        <span className="hidden md:inline">COMPARE</span>
        <span className="text-[9px] text-amber-status bg-amber-status/10 px-1 py-0.2 rounded">
          P02
        </span>
      </button>

      {/* EVIDENCE (Upcoming) */}
      <button
        onClick={() => handleAction("EVIDENCE")}
        title="Auditable Physics Evidence & Hallucination Gate (Phase 02 Engine)"
        className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-mono text-space-faint hover:text-space-muted hover:bg-void-2/60 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-accent"
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        <span className="hidden md:inline">EVIDENCE</span>
        <span className="text-[9px] text-amber-status bg-amber-status/10 px-1 py-0.2 rounded">
          P02
        </span>
      </button>
    </div>
  );
};
