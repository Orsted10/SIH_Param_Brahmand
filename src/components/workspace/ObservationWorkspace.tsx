"use client";

import React, { useState } from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { PlanetaryGlobe } from "../globe/PlanetaryGlobe";
import { GlobeErrorBoundary } from "../globe/GlobeErrorBoundary";
import { EarthMap } from "../map/EarthMap";
import { QueryComposer } from "../composer/QueryComposer";
import { ObservationIngest } from "../upload/ObservationIngest";
import { ContextPanel } from "./ContextPanel";
import { MobileBottomSheet } from "../shell/MobileBottomSheet";
import { SYSTEM_BRAND } from "@/lib/constants/palette";
import { Globe, Map, Sparkles, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const ObservationWorkspace: React.FC = () => {
  const {
    globeVisible,
    setGlobeVisible,
    selectedLocation,
    reducedMotion,
    sidebarOpen,
  } = useWorkspaceStore();

  const [activeTab, setActiveTab] = useState<"QUERY" | "INGEST">("QUERY");

  return (
    <main
      className={cn(
        "relative w-full h-[100dvh] pt-14 overflow-hidden bg-void-0 transition-all duration-200 flex",
        sidebarOpen ? "pl-14 sm:pl-48 lg:pl-56" : "pl-14"
      )}
    >
      {/* Central Visual & Geographic Stage */}
      <div className="relative flex-1 h-full overflow-hidden flex flex-col justify-between p-4 sm:p-6 pb-20">
        {/* Subtle Background Coordinate Grid Lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#73E6FF_1px,transparent_1px)] [background-size:32px_32px]"
          aria-hidden="true"
        />

        {/* Top Floating Hero Title & Perspective Switcher */}
        <div className="relative z-20 flex items-start justify-between gap-4 pointer-events-none">
          <div className="flex flex-col gap-1 max-w-lg select-none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent" />
              <span className="text-[10px] font-mono tracking-widest text-cyan-accent uppercase font-semibold">
                EARTH OBSERVATION COCKPIT
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-space-white">
              {SYSTEM_BRAND.heroHeading}{" "}
              <span className="text-space-muted font-normal">
                {SYSTEM_BRAND.heroSubheading}
              </span>
            </h1>
            <p className="text-xs text-space-faint font-mono">
              {SYSTEM_BRAND.slogan}
            </p>
          </div>

          {/* Perspective View Switcher (Globe vs Map) */}
          <div className="pointer-events-auto flex items-center p-1 rounded-sm bg-void-1/80 border border-panel-hairline font-mono text-xs shadow-lg">
            <button
              onClick={() => setGlobeVisible(true)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-accent",
                globeVisible
                  ? "bg-cyan-soft/40 text-cyan-accent font-semibold"
                  : "text-space-muted hover:text-space-white"
              )}
              title="3D Planetary Earth Representation"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D GLOBE</span>
            </button>

            <button
              onClick={() => setGlobeVisible(false)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-accent",
                !globeVisible
                  ? "bg-cyan-soft/40 text-cyan-accent font-semibold"
                  : "text-space-muted hover:text-space-white"
              )}
              title="2D Geospatial Vector Basemap"
            >
              <Map className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">2D MAP</span>
            </button>
          </div>
        </div>

        {/* Central Planetary Viewport Layer (Absolute Behind Foreground Consoles) */}
        <div className="absolute inset-0 z-0">
          {globeVisible ? (
            <GlobeErrorBoundary selectedCoordinate={selectedLocation}>
              <PlanetaryGlobe
                selectedCoordinate={selectedLocation}
                reducedMotion={reducedMotion}
              />
            </GlobeErrorBoundary>
          ) : (
            <EarthMap />
          )}
        </div>

        {/* Lower Workspace Dock Area: Query Composer or Ingest Console */}
        <div className="relative z-20 w-full max-w-2xl mx-auto flex flex-col gap-2 pointer-events-auto">
          {/* Tab Selector: Query Composer vs Raster Ingest */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1 bg-void-1/80 p-0.5 rounded-sm border border-panel-hairline font-mono text-xs">
              <button
                onClick={() => setActiveTab("QUERY")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-sm transition-colors",
                  activeTab === "QUERY"
                    ? "bg-cyan-soft/30 text-cyan-accent font-semibold border-b border-cyan-accent"
                    : "text-space-muted hover:text-space-white"
                )}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMMAND QUERY</span>
              </button>
              <button
                onClick={() => setActiveTab("INGEST")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-sm transition-colors",
                  activeTab === "INGEST"
                    ? "bg-cyan-soft/30 text-cyan-accent font-semibold border-b border-cyan-accent"
                    : "text-space-muted hover:text-space-white"
                )}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>LOAD OBSERVATIONS</span>
              </button>
            </div>
          </div>

          {/* Active Console View */}
          <div className="rounded-sm bg-panel/90 backdrop-blur-md border border-cyan-accent/20 p-4 shadow-2xl">
            {activeTab === "QUERY" ? <QueryComposer /> : <ObservationIngest />}
          </div>
        </div>
      </div>

      {/* Right Context & Telemetry Panel (Desktop >= 1280px) */}
      <div className="hidden xl:block w-80 2xl:w-96 h-full border-l border-panel-hairline bg-void-1/85 backdrop-blur-md overflow-y-auto z-20">
        <ContextPanel />
      </div>

      {/* Mobile Context Bottom Sheet (Tablet & Mobile < 1280px) */}
      <MobileBottomSheet title="Context & Telemetry">
        <ContextPanel />
      </MobileBottomSheet>
    </main>
  );
};
