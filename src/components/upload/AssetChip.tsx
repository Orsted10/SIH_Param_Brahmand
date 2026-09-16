"use client";

import React from "react";
import { ImageryAsset } from "@/types/imagery";
import { formatBytes } from "@/lib/files/fileUtils";
import { Trash2, FileImage, Layers, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface AssetChipProps {
  asset: ImageryAsset;
  isSelected?: boolean;
  onSelect?: () => void;
  onRemove: () => void;
}

export const AssetChip: React.FC<AssetChipProps> = ({
  asset,
  isSelected = false,
  onSelect,
  onRemove,
}) => {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "group relative flex items-start gap-3 p-2.5 rounded-sm bg-void-1/80 border transition-all duration-150 cursor-pointer font-mono select-none",
        isSelected
          ? "border-cyan-accent/50 bg-cyan-soft/10 shadow-[0_0_12px_rgba(115,230,255,0.06)]"
          : "border-panel-hairline hover:border-panel-border hover:bg-void-2/60"
      )}
    >
      {/* Thumbnail or Format Icon */}
      <div className="relative w-12 h-12 rounded bg-void-0/90 border border-panel-hairline overflow-hidden shrink-0 flex items-center justify-center">
        {asset.previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset.previewUrl}
            alt={asset.name}
            className="w-full h-full object-cover"
          />
        ) : asset.kind === "GEOTIFF" ? (
          <Layers className="w-5 h-5 text-cyan-accent" />
        ) : (
          <FileImage className="w-5 h-5 text-space-faint" />
        )}
      </div>

      {/* Asset Metadata */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-space-white truncate" title={asset.name}>
            {asset.name}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            title="Remove observation from local session"
            aria-label={`Remove ${asset.name}`}
            className="opacity-60 group-hover:opacity-100 p-1 text-space-faint hover:text-status-red rounded transition-colors focus:outline-none"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Specs: Size, Dimensions, Kind */}
        <div className="flex items-center gap-2 text-[10px] text-space-muted flex-wrap">
          <span className="px-1 py-0.2 rounded bg-void-0/80 border border-panel-hairline text-cyan-accent">
            {asset.kind}
          </span>
          <span>{formatBytes(asset.sizeBytes)}</span>
          {asset.dimensions && (
            <>
              <span className="text-space-faint">·</span>
              <span>{asset.dimensions.width} × {asset.dimensions.height} px</span>
            </>
          )}
        </div>

        {/* Status Message */}
        {asset.statusMessage && (
          <div className="text-[9px] text-space-faint italic truncate">
            {asset.statusMessage}
          </div>
        )}

        {/* Status Tag */}
        <div className="flex items-center gap-1 mt-0.5">
          {asset.status === "READY" && (
            <span className="inline-flex items-center gap-1 text-[9px] text-status-green">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>READY (Local Optical)</span>
            </span>
          )}
          {asset.status === "UNSUPPORTED_PREVIEW" && (
            <span className="inline-flex items-center gap-1 text-[9px] text-space-muted">
              <AlertCircle className="w-2.5 h-2.5 text-amber-status" />
              <span>RAW RASTER (Phase 02 Ingestion)</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
