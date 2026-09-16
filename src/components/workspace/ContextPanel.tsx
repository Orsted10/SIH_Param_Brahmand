"use client";

import React from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { CoordinateReadout } from "../typography/CoordinateReadout";
import { ScientificRule } from "../typography/ScientificRule";
import { formatBytes } from "@/lib/files/fileUtils";
import {
  Layers,
  MapPin,
  Radio,
  FileSpreadsheet,
} from "lucide-react";

export const ContextPanel: React.FC = () => {
  const {
    selectedLocation,
    uploadedAssets,
    selectedDataset,
    queryHistory,
    setAuditViewerOpen,
  } = useWorkspaceStore();

  const activeAsset = uploadedAssets.find((a) => a.id === selectedDataset) || uploadedAssets[0];
  const latestQuery = queryHistory.length > 0 ? queryHistory[0] : null;

  return (
    <aside
      aria-label="Geospatial Context & Telemetry Panel"
      className="flex flex-col gap-4 p-4 font-mono text-xs select-none"
    >
      {/* 1. CURRENT OBSERVATION */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] text-space-muted uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-accent" />
            <span>Active Observation</span>
          </div>
          <span className="text-space-faint">{uploadedAssets.length} Ingested</span>
        </div>

        {activeAsset ? (
          <div className="p-3 rounded-sm bg-void-1/80 border border-panel-hairline space-y-2">
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-space-white truncate" title={activeAsset.name}>
                {activeAsset.name}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-soft/20 text-[9px] text-cyan-accent border border-cyan-accent/30 shrink-0">
                {activeAsset.kind}
              </span>
            </div>

            <div className="text-[11px] text-space-muted space-y-0.5">
              <div>Size: <span className="text-space-white">{formatBytes(activeAsset.sizeBytes)}</span></div>
              {activeAsset.dimensions && (
                <div>Dimensions: <span className="text-space-white">{activeAsset.dimensions.width} × {activeAsset.dimensions.height} px</span></div>
              )}
              <div>MIME: <span className="text-space-white">{activeAsset.mimeType}</span></div>
            </div>

            {activeAsset.previewUrl && (
              <div className="relative w-full h-28 rounded overflow-hidden border border-panel-hairline mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeAsset.previewUrl}
                  alt={activeAsset.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="p-3 rounded-sm bg-void-1/40 border border-panel-hairline text-center text-space-faint text-[11px] space-y-1">
            <span>NO OBSERVATION LOADED</span>
            <div className="text-[9px] text-space-faint">
              Local session currently awaiting satellite image or GeoTIFF raster input.
            </div>
          </div>
        )}
      </div>

      <ScientificRule />

      {/* 2. STUDY REGION */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] text-space-muted uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-accent" />
            <span>Study Region</span>
          </div>
          <span className="text-space-faint">WGS84</span>
        </div>

        {selectedLocation ? (
          <div className="p-2.5 rounded-sm bg-void-1/80 border border-panel-hairline space-y-1.5">
            <div className="text-[10px] text-cyan-accent uppercase tracking-wider font-semibold">
              {selectedLocation.label || "TARGET STUDY POINT"}
            </div>
            <CoordinateReadout
              latitude={selectedLocation.latitude}
              longitude={selectedLocation.longitude}
              precision={4}
            />
          </div>
        ) : (
          <div className="p-2.5 rounded-sm bg-void-1/40 border border-panel-hairline text-space-faint text-[11px]">
            No coordinate selected.
          </div>
        )}
      </div>

      <ScientificRule />

      {/* 3. SENSOR & INGESTION TELEMETRY (Rule 93: Honest Sensor Language) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] text-space-muted uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-accent" />
            <span>Sensor Pipeline Status</span>
          </div>
        </div>

        <div className="p-2.5 rounded-sm bg-void-1/80 border border-panel-hairline space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-space-muted">SENSOR DATA:</span>
            <span className="text-amber-status font-semibold">AWAITING INGESTION</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-space-muted">PIPELINE:</span>
            <span className="text-space-white">STANDBY (Local Session)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-space-muted">CALIBRATION:</span>
            <span className="text-space-white">WGS84 REFERENCE</span>
          </div>
        </div>
      </div>

      <ScientificRule />

      {/* 4. RECENT QUERY & AUDIT TRACE */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] text-space-muted uppercase tracking-wider">
          <span>Execution Audit Trail</span>
          <button
            onClick={() => setAuditViewerOpen(true)}
            className="flex items-center gap-1 text-[10px] text-cyan-accent hover:underline"
          >
            <FileSpreadsheet className="w-3 h-3" />
            <span>View Full Log</span>
          </button>
        </div>

        {latestQuery ? (
          <div className="p-2.5 rounded-sm bg-void-1/80 border border-panel-hairline text-[11px] space-y-1">
            <div className="text-space-faint text-[9px] uppercase">LATEST QUERY CAPTURED:</div>
            <div className="text-space-white italic truncate">&ldquo;{latestQuery.queryText}&rdquo;</div>
            <div className="text-status-green text-[9px] flex items-center gap-1">
              <span>● Status: Stored in session trace</span>
            </div>
          </div>
        ) : (
          <div className="p-2.5 rounded-sm bg-void-1/40 border border-panel-hairline text-space-faint text-[10px]">
            No queries captured in current session.
          </div>
        )}
      </div>
    </aside>
  );
};
