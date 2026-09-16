"use client";

import React from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { PlanetaryGlobe } from "../globe/PlanetaryGlobe";
import { GlobeErrorBoundary } from "../globe/GlobeErrorBoundary";
import { EarthMap } from "../map/EarthMap";
import { ObservationViewer } from "../upload/ObservationViewer";
import { AskTheEarth } from "../composer/AskTheEarth";
import { formatCoordinates } from "@/lib/utils/coordinates";
import { SYSTEM_BRAND } from "@/lib/constants/palette";
import { Map, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const ObservationWorkspace: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    selectedLocation,
    reducedMotion,
    uploadedAssets,
  } = useWorkspaceStore();

  return (
    <main className="relative w-screen h-[100dvh] overflow-hidden bg-void-0 select-none">
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
            <GlobeErrorBoundary selectedCoordinate={selectedLocation}>
              <PlanetaryGlobe
                selectedCoordinate={selectedLocation}
                reducedMotion={reducedMotion}
                viewMode={viewMode}
              />
            </GlobeErrorBoundary>
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

          {/* 3. Negative Space Editorial Typography (Only visible in Globe View) */}
          {viewMode === "GLOBE" && (
            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-8 sm:p-12 md:p-16">
              {/* Top Editorial Headline (Directly over negative space, ZERO cards) */}
              <div className="mt-12 sm:mt-16 max-w-md select-none font-mono">
                <div className="text-[10px] text-cyan-accent tracking-widest uppercase font-semibold mb-2">
                  PLANETARY OBSERVATION METRIC · EPSG:4326
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tighter text-space-white leading-[0.9]">
                  UNDERSTAND<br />
                  <span className="font-normal text-cyan-accent">THE EARTH.</span>
                </h1>
                <p className="text-xs text-space-muted font-mono mt-4 max-w-xs leading-relaxed">
                  {SYSTEM_BRAND.heroDescription}
                </p>

                {/* Micro Monospace Coordinate Readout */}
                {selectedLocation && (
                  <div className="mt-6 flex flex-col gap-1 border-l border-cyan-accent/50 pl-3">
                    <span className="text-[9px] text-space-faint tracking-widest uppercase">
                      STUDY POINT CALIBRATION
                    </span>
                    <span className="text-xs text-space-white tracking-widest font-semibold">
                      {formatCoordinates(selectedLocation.latitude, selectedLocation.longitude, 4)}
                    </span>
                    <span className="text-[10px] text-cyan-accent/80 tracking-wider">
                      {selectedLocation.label || "INDIA DEFAULT REGION"}
                    </span>
                  </div>
                )}
              </div>

              {/* Center Right: Quick Surface Dive Trigger */}
              <div className="self-end mb-8 pointer-events-auto font-mono">
                <button
                  onClick={() => setViewMode("MAP")}
                  className="group flex items-center gap-3 px-4 py-2 bg-void-1/70 backdrop-blur-md border border-panel-hairline hover:border-cyan-accent/50 rounded-sm text-xs text-space-muted hover:text-cyan-accent transition-all focus:outline-none"
                  aria-label="Inspect surface in full-screen 2D map view"
                >
                  <Map className="w-3.5 h-3.5 text-cyan-accent" />
                  <span className="tracking-widest uppercase text-[11px]">
                    SURFACE MAP VIEW
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {uploadedAssets.length > 0 && (
                  <button
                    onClick={() => setViewMode("OBSERVATION")}
                    className="mt-2 w-full flex items-center justify-between px-4 py-1.5 bg-void-1/70 backdrop-blur-md border border-cyan-accent/30 hover:border-cyan-accent rounded-sm text-[11px] text-cyan-accent hover:bg-cyan-soft/20 transition-all"
                  >
                    <span>VIEW OBSERVATION</span>
                    <span className="text-[9px] text-space-faint">({uploadedAssets.length})</span>
                  </button>
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
