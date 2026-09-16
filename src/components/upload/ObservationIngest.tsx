"use client";

import React, { useRef, useState } from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import {
  classifyFile,
  extractImageDimensions,
  urlManager,
} from "@/lib/files/fileUtils";
import { ImageryAsset } from "@/types/imagery";
import { Upload, Plus, Layers } from "lucide-react";
import { AssetChip } from "./AssetChip";
import { cn } from "@/lib/utils/cn";

export const ObservationIngest: React.FC = () => {
  const {
    uploadedAssets,
    addUploadedAsset,
    removeUploadedAsset,
    selectedDataset,
  } = useWorkspaceStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = async (files: FileList | File[]) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const classification = classifyFile(file);
      const dimensions = await extractImageDimensions(file);

      let previewUrl: string | null = null;
      if (classification.isPreviewable) {
        previewUrl = urlManager.create(file);
      }

      const asset: ImageryAsset = {
        id: `ast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: file.name,
        mimeType: file.type || "application/octet-stream",
        sizeBytes: file.size,
        lastModified: file.lastModified,
        kind: classification.kind,
        status: classification.status,
        statusMessage: classification.statusMessage,
        previewUrl,
        dimensions,
        createdAt: new Date().toISOString(),
      };

      addUploadedAsset(asset);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      e.target.value = ""; // Reset file input
    }
  };

  return (
    <div className="flex flex-col gap-3 font-mono">
      {/* Hidden Native File Input */}
      <input
        id="file-upload-input"
        ref={fileInputRef}
        type="file"
        multiple
        accept=".tif,.tiff,.png,.jpg,.jpeg"
        onChange={handleFileInputChange}
        className="hidden"
        aria-label="Upload Satellite Observation"
      />

      {/* Drag & Drop Ingestion Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center p-4 rounded-sm border border-dashed transition-all duration-200 cursor-pointer select-none text-center",
          isDragging
            ? "border-cyan-accent bg-cyan-soft/20 shadow-[0_0_20px_rgba(115,230,255,0.15)]"
            : "border-panel-hairline hover:border-cyan-accent/50 bg-void-1/60 hover:bg-void-2/60"
        )}
      >
        <div className="w-8 h-8 rounded-full bg-void-0/90 border border-panel-hairline flex items-center justify-center mb-2">
          <Upload className="w-4 h-4 text-cyan-accent" />
        </div>
        <span className="text-xs font-semibold text-space-white tracking-wide">
          LOAD OBSERVATION
        </span>
        <span className="text-[10px] text-space-muted mt-0.5">
          Drag raster or click to browse local files
        </span>
        <span className="text-[9px] text-space-faint mt-1">
          Supports .tif, .tiff (GeoTIFF) · .png, .jpg, .jpeg (Optical)
        </span>
      </div>

      {/* Active Local Ingested Observations List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] uppercase tracking-wider text-space-muted">
            Ingested Observations ({uploadedAssets.length})
          </span>
          {uploadedAssets.length > 0 && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 text-[10px] text-cyan-accent hover:underline"
            >
              <Plus className="w-3 h-3" />
              <span>Add Another</span>
            </button>
          )}
        </div>

        {uploadedAssets.length === 0 ? (
          <div className="p-4 rounded-sm bg-void-1/40 border border-panel-hairline text-center text-space-faint text-[11px]">
            <div className="flex justify-center mb-1">
              <Layers className="w-5 h-5 text-space-faint" />
            </div>
            <span>NO OBSERVATION LOADED</span>
            <div className="text-[9px] text-space-faint mt-0.5">
              Insert a satellite observation or remote-sensing scene to begin.
            </div>
          </div>
        ) : (
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {uploadedAssets.map((asset) => (
              <AssetChip
                key={asset.id}
                asset={asset}
                isSelected={selectedDataset === asset.id}
                onRemove={() => removeUploadedAsset(asset.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
