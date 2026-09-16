"use client";

import React from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { WorkspaceMode } from "@/types/mission";
import { X, Layers, GitCompare, ShieldCheck, FileText, AlertTriangle } from "lucide-react";
import { ScientificRule } from "../typography/ScientificRule";

export const FutureEnginePanel: React.FC = () => {
  const { futureDialogMode, closeFutureDialog } = useWorkspaceStore();

  if (!futureDialogMode) return null;

  const modeDescriptions: Record<
    WorkspaceMode,
    { title: string; phase: string; icon: React.ComponentType<{ className?: string }>; details: string; deliverables: string[] }
  > = {
    MISSION: {
      title: "Mission Intelligence Cockpit",
      phase: "Phase 01 Active",
      icon: Layers,
      details: "Current active foundation.",
      deliverables: [],
    },
    EXPLORE: {
      title: "Geospatial Exploration",
      phase: "Phase 01 Active",
      icon: Layers,
      details: "Current active foundation.",
      deliverables: [],
    },
    ANALYZE: {
      title: "Single-Image & Cross-Modal Analysis Engine",
      phase: "Phase 02 Pipeline",
      icon: Layers,
      details:
        "Dedicated vision-language inference engine powering optical, radar SAR, and multispectral spatial grounding via Groq Vision.",
      deliverables: [
        "Groq Llama-3.2-11B-Vision Serverless Edge Functions",
        "Bounding box spatial grounding & pixel-level segmentation",
        "Multi-band spectral unmixing & radiometric calibration",
        "4-Tier structured intelligence captions (Executive, Tactical, Physics, Telemetry)",
      ],
    },
    COMPARE: {
      title: "Bi-Temporal Change Analysis Engine",
      phase: "Phase 03 Pipeline",
      icon: GitCompare,
      details:
        "Dual-epoch optical and SAR change detection comparing pre-disaster and post-disaster remote-sensing tiles.",
      deliverables: [
        "Optical-SAR Inundation Index (OSWI) WebGL shader math",
        "Interactive swipe comparison viewport with delta mask",
        "Pseudo-change filtering (distinguishing seasonal harvesting from deforestation)",
        "Quantitative area displacement metrics (hectares / km²)",
      ],
    },
    EVIDENCE: {
      title: "Auditable Grounding & Dharma-Chakra Physics Gate",
      phase: "Phase 04 Pipeline",
      icon: ShieldCheck,
      details:
        "Deterministic physical boundary checker eliminating hallucinations through Digital Elevation Model (DEM) slope rules and radar wave mechanics.",
      deliverables: [
        "DEM slope constraint firewall (water boundary condition: slope <= 5°)",
        "Yamaguchi AG4U 4-component radar wave decomposition",
        "ISRO SAC PS 26167 auditable JSON execution trace generator",
        "Zero-hallucination mathematical verification log",
      ],
    },
    REPORT: {
      title: "Operational Disaster Intelligence & SOP Generation",
      phase: "Phase 05 Pipeline",
      icon: FileText,
      details:
        "Automatic generation of NDMA Standard Operating Procedure (SOP) action directives with exportable GeoJSON polygons.",
      deliverables: [
        "Instant NDMA incident command directive synthesis",
        "Rescue coordinate extraction with safe staging zones",
        "1-Click PDF and GeoJSON polygon boundary export",
        "Vernacular multilingual speech broadcast across 22 scheduled Indian languages",
      ],
    },
  };

  const info = modeDescriptions[futureDialogMode];
  const Icon = info.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="future-engine-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-0/85 backdrop-blur-md font-mono select-none"
    >
      <div className="relative w-full max-w-lg rounded-sm bg-panel-strong border border-cyan-accent/40 shadow-2xl p-6 text-space-white animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-void-0/90 border border-panel-hairline">
              <Icon className="w-5 h-5 text-cyan-accent" />
            </div>
            <div>
              <span className="text-[10px] text-amber-status bg-amber-status/10 px-1.5 py-0.5 rounded uppercase font-semibold">
                {info.phase}
              </span>
              <h2 id="future-engine-title" className="text-sm font-semibold tracking-wider text-space-white mt-1">
                {info.title}
              </h2>
            </div>
          </div>
          <button
            onClick={closeFutureDialog}
            className="p-1 text-space-muted hover:text-cyan-accent transition-colors rounded focus:outline-none focus:ring-1 focus:ring-cyan-accent"
            aria-label="Close Engine Notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <ScientificRule className="my-3" />

        {/* Technical Notice Content (Honest System Declaration) */}
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded bg-void-0/70 border border-panel-hairline space-y-1">
            <div className="flex items-center gap-1.5 text-amber-status text-[11px] font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>ANALYSIS ENGINE NOT YET CONNECTED</span>
            </div>
            <p className="text-[11px] text-space-muted leading-relaxed">
              {info.details}
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-cyan-accent font-semibold block mb-1.5">
              Architectural Engine Pipeline Roadmap:
            </span>
            <ul className="space-y-1 text-[11px] text-space-muted">
              {info.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-accent mt-0.5">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-panel-hairline flex items-center justify-between text-[10px] text-space-faint">
          <span>ISRO SAC PS 26167 · PARAM BRAHMAND</span>
          <button
            onClick={closeFutureDialog}
            className="px-3 py-1 rounded bg-panel hover:bg-panel-border text-space-white border border-panel-hairline transition-colors"
          >
            Acknowledge Status
          </button>
        </div>
      </div>
    </div>
  );
};
