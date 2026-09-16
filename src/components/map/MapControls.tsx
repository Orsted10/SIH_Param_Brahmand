"use client";

import React from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { Plus, Minus, Compass, Navigation, Box, Globe } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetNorth: () => void;
  onResetIndia: () => void;
  onTogglePitch: () => void;
  is3dPitch: boolean;
  className?: string;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetNorth,
  onResetIndia,
  onTogglePitch,
  is3dPitch,
  className,
}) => {
  const { toggleGlobe, globeVisible } = useWorkspaceStore();

  return (
    <div
      role="group"
      aria-label="Geospatial Map Controls"
      className={cn(
        "flex flex-col gap-1 p-1 rounded-sm bg-void-1/90 backdrop-blur-md border border-panel-hairline shadow-xl select-none font-mono",
        className
      )}
    >
      {/* Zoom In */}
      <button
        onClick={onZoomIn}
        aria-label="Zoom In Map"
        title="Zoom In"
        className="p-1.5 text-space-muted hover:text-cyan-accent hover:bg-void-2/80 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-accent"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>

      {/* Zoom Out */}
      <button
        onClick={onZoomOut}
        aria-label="Zoom Out Map"
        title="Zoom Out"
        className="p-1.5 text-space-muted hover:text-cyan-accent hover:bg-void-2/80 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-accent"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <div className="w-full h-[1px] bg-panel-hairline my-0.5" />

      {/* Reset North */}
      <button
        onClick={onResetNorth}
        aria-label="Reset Map Orientation to True North"
        title="Reset True North"
        className="p-1.5 text-space-muted hover:text-cyan-accent hover:bg-void-2/80 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-accent"
      >
        <Compass className="w-3.5 h-3.5" />
      </button>

      {/* Reset to India Center */}
      <button
        onClick={onResetIndia}
        aria-label="Reset Viewport to India Default Region"
        title="Reset to India Center"
        className="p-1.5 text-space-muted hover:text-cyan-accent hover:bg-void-2/80 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-accent"
      >
        <Navigation className="w-3.5 h-3.5 text-cyan-accent" />
      </button>

      <div className="w-full h-[1px] bg-panel-hairline my-0.5" />

      {/* 3D Pitch Toggle */}
      <button
        onClick={onTogglePitch}
        aria-label={`Toggle 3D Oblique Terrain Pitch (Currently ${is3dPitch ? "3D" : "2D"})`}
        title={`Toggle 3D Oblique Pitch (${is3dPitch ? "Active" : "Flat"})`}
        className={cn(
          "p-1.5 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-accent",
          is3dPitch
            ? "text-cyan-accent bg-cyan-soft/40 font-bold"
            : "text-space-muted hover:text-cyan-accent hover:bg-void-2/80"
        )}
      >
        <Box className="w-3.5 h-3.5" />
      </button>

      {/* Globe Switcher */}
      <button
        onClick={toggleGlobe}
        aria-label="Switch between 2D Basemap and 3D Planetary Globe"
        title={`Switch to 3D Planetary Globe (Current: ${globeVisible ? "Globe" : "Map"})`}
        className="p-1.5 text-space-muted hover:text-cyan-accent hover:bg-void-2/80 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-accent"
      >
        <Globe className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
