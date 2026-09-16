"use client";

import React from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { X, Download, History } from "lucide-react";
import { ScientificRule } from "../typography/ScientificRule";

export const SessionAuditViewer: React.FC = () => {
  const { auditViewerOpen, setAuditViewerOpen, executionEvents } = useWorkspaceStore();

  if (!auditViewerOpen) return null;

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(executionEvents, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `param_brahmand_trace_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-viewer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-0/80 backdrop-blur-md font-mono select-none"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-sm bg-panel-strong border border-cyan-accent/40 shadow-2xl p-6 text-space-white animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-accent" />
            <div>
              <h2 id="audit-viewer-title" className="text-sm font-semibold tracking-wider text-space-white uppercase">
                SESSION AUDIT LOG & EXECUTION TRACE
              </h2>
              <p className="text-[10px] text-space-faint">
                ISRO SAC PS 26167 Mandated Deterministic Audit Trail ({executionEvents.length} events logged)
              </p>
            </div>
          </div>
          <button
            onClick={() => setAuditViewerOpen(false)}
            className="p-1 text-space-muted hover:text-cyan-accent transition-colors rounded focus:outline-none focus:ring-1 focus:ring-cyan-accent"
            aria-label="Close Audit Viewer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <ScientificRule className="my-2" />

        {/* Scrollable Event List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
          {executionEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-2.5 rounded-sm bg-void-0/70 border border-panel-hairline space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-cyan-accent font-semibold text-[11px]">
                  {evt.type}
                </span>
                <span className="text-[10px] text-space-faint font-mono">
                  {new Date(evt.timestamp).toISOString()}
                </span>
              </div>
              <pre className="text-[10px] text-space-muted bg-void-1/60 p-1.5 rounded overflow-x-auto whitespace-pre-wrap break-all">
                {JSON.stringify(evt.details, null, 2)}
              </pre>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-panel-hairline flex items-center justify-between text-[10px] text-space-faint">
          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-panel hover:bg-panel-border text-cyan-accent border border-cyan-accent/30 transition-colors"
          >
            <Download className="w-3 h-3" />
            <span>EXPORT AUDIT JSON</span>
          </button>
          <button
            onClick={() => setAuditViewerOpen(false)}
            className="px-3 py-1 rounded bg-panel hover:bg-panel-border text-space-white border border-panel-hairline transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
