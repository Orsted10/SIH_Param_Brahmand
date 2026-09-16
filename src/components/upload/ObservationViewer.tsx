"use client";

import React, { useState, useRef } from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { formatBytes } from "@/lib/files/fileUtils";
import { ArrowLeft, ZoomIn, ZoomOut, RotateCcw, Layers } from "lucide-react";

export const ObservationViewer: React.FC = () => {
  const { uploadedAssets, selectedDataset, setViewMode } = useWorkspaceStore();
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const startPanRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeAsset =
    uploadedAssets.find((a) => a.id === selectedDataset) || uploadedAssets[0];

  if (!activeAsset) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-void-0 p-8 text-center font-mono select-none">
        <div className="text-[10px] tracking-widest text-space-faint uppercase mb-2">
          NO ACTIVE OBSERVATION
        </div>
        <div className="text-2xl font-light tracking-tight text-space-white mb-4">
          INSERT SATELLITE OBSERVATION
        </div>
        <button
          onClick={() => {
            const input = document.getElementById("file-upload-input");
            if (input) input.click();
          }}
          className="px-4 py-2 rounded-sm border border-cyan-accent/40 text-cyan-accent text-xs hover:bg-cyan-soft/20 transition-colors uppercase tracking-widest"
        >
          [ + INSERT OBSERVATION ]
        </button>
      </div>
    );
  }

  const handlePointerDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    startPanRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handlePointerMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - startPanRef.current.x,
      y: e.clientY - startPanRef.current.y,
    });
  };

  const handlePointerUp = () => setIsPanning(false);

  const handleZoomIn = () => setScale((s) => Math.min(6, s * 1.25));
  const handleZoomOut = () => setScale((s) => Math.max(0.25, s / 1.25));
  const handleReset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-full bg-void-0 overflow-hidden font-mono select-none">
      {/* Return to Earth Orbit Button */}
      <div className="absolute top-16 left-6 z-20">
        <button
          onClick={() => setViewMode("GLOBE")}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-space-muted hover:text-cyan-accent bg-void-1/80 backdrop-blur-md border border-panel-hairline hover:border-cyan-accent/50 rounded-sm transition-all focus:outline-none focus:ring-1 focus:ring-cyan-accent"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="tracking-widest uppercase text-[11px]">
            RETURN TO PLANETARY VIEW
          </span>
        </button>
      </div>

      {/* Edge Technical Metadata Typography (Rules: No cards) */}
      <div className="absolute top-16 right-6 z-20 text-right space-y-1">
        <div className="text-[10px] text-space-faint uppercase tracking-widest">
          OBSERVATION 01 · LOCAL RASTER
        </div>
        <div className="text-sm font-semibold tracking-wider text-space-white truncate max-w-xs">
          {activeAsset.name}
        </div>
        <div className="text-xs text-cyan-accent/80 tracking-wide">
          {activeAsset.kind} · {formatBytes(activeAsset.sizeBytes)}
          {activeAsset.dimensions && ` · ${activeAsset.dimensions.width} × ${activeAsset.dimensions.height}`}
        </div>
        <div className="text-[10px] text-space-faint tracking-widest pt-1">
          LOCAL IMAGE · GEOGRAPHIC REFERENCE UNAVAILABLE (Phase 01)
        </div>
      </div>

      {/* Main Full-Bleed Observation Canvas */}
      <div
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {activeAsset.previewUrl ? (
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
              transition: isPanning ? "none" : "transform 0.15s ease-out",
            }}
            className="max-w-[85vw] max-h-[80vh]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeAsset.previewUrl}
              alt={activeAsset.name}
              draggable={false}
              className="max-w-full max-h-[80vh] object-contain shadow-[0_0_80px_rgba(0,0,0,0.9)] border border-panel-hairline"
            />
          </div>
        ) : (
          /* TIFF / Non-Previewable Raster Envelope */
          <div className="flex flex-col items-center justify-center p-12 text-center max-w-xl">
            <div className="w-16 h-16 rounded-full border border-cyan-accent/30 flex items-center justify-center mb-4">
              <Layers className="w-8 h-8 text-cyan-accent" />
            </div>
            <div className="text-sm font-semibold tracking-widest text-space-white uppercase mb-1">
              RAW REMOTE-SENSING RASTER
            </div>
            <div className="text-xs text-cyan-accent mb-2">
              {activeAsset.kind} · {formatBytes(activeAsset.sizeBytes)}
            </div>
            <div className="text-xs text-space-muted leading-relaxed">
              Raster parsing, band unmixing, and geo-referencing will be enabled in the ingestion engine (Phase 02).
            </div>
          </div>
        )}
      </div>

      {/* Contextual Canvas Navigation Tools (Bottom Left) */}
      <div className="absolute bottom-8 left-6 z-20 flex items-center gap-2 bg-void-1/80 backdrop-blur-md border border-panel-hairline p-1 rounded-sm text-space-muted">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          aria-label="Zoom In"
          className="p-1.5 hover:text-cyan-accent transition-colors"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          aria-label="Zoom Out"
          className="p-1.5 hover:text-cyan-accent transition-colors"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleReset}
          title="Reset View"
          aria-label="Reset View"
          className="p-1.5 hover:text-cyan-accent transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <span className="text-[10px] text-space-faint px-2 border-l border-panel-hairline">
          {Math.round(scale * 100)}%
        </span>
      </div>
    </div>
  );
};
