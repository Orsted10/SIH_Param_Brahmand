"use client";

import React from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { PlanetaryGlobe } from "../globe/PlanetaryGlobe";
import { EarthMap } from "../map/EarthMap";
import { ObservationViewer } from "../upload/ObservationViewer";
import { AskTheEarth } from "../composer/AskTheEarth";
import { cn } from "@/lib/utils/cn";
import { classifyFile, extractImageDimensions, urlManager } from "@/lib/files/fileUtils";
import { ImageryAsset } from "@/types/imagery";

export const ObservationWorkspace: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    selectedLocation,
    reducedMotion,
    addUploadedAsset,
  } = useWorkspaceStore();

  const [isDragging, setIsDragging] = React.useState(false);

  // Auto-transition to Map mode when a location is selected
  React.useEffect(() => {
    if (selectedLocation && viewMode === "GLOBE") {
      const timer = setTimeout(() => {
        setViewMode("MAP");
      }, 1200); // Wait for Earth to rotate/zoom before diving
      return () => clearTimeout(timer);
    }
  }, [selectedLocation, viewMode, setViewMode]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

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
    setViewMode("OBSERVATION");
  };

  return (
    <main
      className="relative w-screen h-[100dvh] overflow-hidden bg-void-0 select-none"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Global Drag Overlay */}
      <div
        className={cn(
          "absolute inset-0 z-[100] flex items-center justify-center bg-void-0/80 backdrop-blur-md transition-opacity duration-300 pointer-events-none",
          isDragging ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-2xl md:text-4xl font-light tracking-[0.3em] text-space-white uppercase font-mono">
          INSERT OBSERVATION
        </div>
      </div>
      {/* 1. Observation View Mode (Full-Bleed Imagery Canvas) */}
      {viewMode === "OBSERVATION" ? (
        <ObservationViewer />
      ) : (
        /* 2. Unified Planetary Canvas (Globe & Surface Map) */
        <div className="relative w-full h-full">
          {/* 3D Planetary Globe Layer */}
          <div
            className={cn(
              "absolute inset-0 z-0 transition-opacity duration-700 ease-in-out",
              viewMode === "GLOBE" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
          >
            <PlanetaryGlobe
              selectedCoordinate={selectedLocation}
              reducedMotion={reducedMotion}
              viewMode={viewMode}
            />
          </div>

          {/* 2D Geospatial Basemap Layer */}
          <div
            className={cn(
              "absolute inset-0 z-10 transition-opacity duration-700 ease-in-out",
              viewMode === "MAP" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
          >
            {viewMode === "MAP" && (
              <EarthMap onReturnToOrbit={() => setViewMode("GLOBE")} />
            )}
          </div>

          {/* 3. Minimal Selected Location Annotation & Query Component */}
          {viewMode === "GLOBE" && (
            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-8 sm:p-12 md:p-16">
              {/* Top Left: Minimal Clicked Coordinate Annotation */}
              <div className="mt-12 sm:mt-16 max-w-md select-none font-mono">
                {selectedLocation && (
                  <div className="flex flex-col gap-1 border-l border-space-faint pl-3 animate-in fade-in slide-in-from-left-4 duration-700">
                    <span className="text-xs text-space-white tracking-widest font-semibold uppercase">
                      LAT {selectedLocation.latitude.toFixed(4)}°
                    </span>
                    <span className="text-xs text-space-white tracking-widest font-semibold uppercase">
                      LON {selectedLocation.longitude.toFixed(4)}°
                    </span>
                    <span className="text-[10px] text-space-muted tracking-wider uppercase mt-1">
                      {selectedLocation.label || "INDIA"}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Hairline Command Axis: "ASK THE EARTH" */}
              <div className="w-full flex justify-center pointer-events-auto pb-4">
                <AskTheEarth />
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};
