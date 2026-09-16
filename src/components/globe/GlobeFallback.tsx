"use client";

import React from "react";
import { TargetReticle } from "../typography/TargetReticle";
import { cn } from "@/lib/utils/cn";

interface GlobeFallbackProps {
  className?: string;
  selectedCoordinate?: { latitude: number; longitude: number } | null;
}

export const GlobeFallback: React.FC<GlobeFallbackProps> = ({
  className,
  selectedCoordinate,
}) => {
  return (
    <div
      className={cn(
        "relative w-full h-full flex flex-col items-center justify-center bg-void-0 p-6 overflow-hidden select-none",
        className
      )}
      role="region"
      aria-label="Static Planetary Visualization Fallback"
    >
      {/* Background Radial Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-cyan-soft/10 blur-3xl pointer-events-none" />

      {/* Static Vector Globe Visualization */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-cyan-accent/30 flex items-center justify-center shadow-[inset_0_0_50px_rgba(115,230,255,0.08)]">
        {/* Subtle Atmospheric Ring */}
        <div className="absolute -inset-3 rounded-full border border-cyan-accent/15 blur-[1px]" />

        {/* Latitude Lines */}
        <div className="absolute inset-x-0 top-1/4 h-[1px] bg-cyan-accent/15" />
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-cyan-accent/30" />
        <div className="absolute inset-x-0 top-3/4 h-[1px] bg-cyan-accent/15" />

        {/* Longitude Ellipses */}
        <div className="absolute inset-y-0 left-1/4 w-[1px] bg-cyan-accent/15" />
        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-cyan-accent/30" />
        <div className="absolute inset-y-0 left-3/4 w-[1px] bg-cyan-accent/15" />
        <div className="absolute inset-y-0 w-36 rounded-full border border-cyan-accent/20" />

        {/* India Target Reticle Positioned in Northern/Eastern Hemisphere */}
        <div className="absolute top-[38%] left-[64%] -translate-x-1/2 -translate-y-1/2">
          <TargetReticle
            size={28}
            label={
              selectedCoordinate
                ? `${selectedCoordinate.latitude.toFixed(2)}° N, ${selectedCoordinate.longitude.toFixed(2)}° E`
                : "INDIA STUDY REGION"
            }
          />
        </div>
      </div>

      {/* Scientific Status Badge */}
      <div className="mt-8 flex flex-col items-center gap-1 text-center font-mono">
        <span className="text-[10px] tracking-widest text-cyan-accent uppercase px-2 py-0.5 rounded bg-cyan-soft/20 border border-cyan-accent/30">
          PLANETARY VISUALIZATION · STATIC MODE
        </span>
        <p className="text-[11px] text-space-muted max-w-sm mt-1">
          Hardware WebGL acceleration unavailable or bypassed. System remains fully operational via geospatial basemap and raster workspace.
        </p>
      </div>
    </div>
  );
};
