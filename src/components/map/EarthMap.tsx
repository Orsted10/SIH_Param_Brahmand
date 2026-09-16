"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import maplibregl, { Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { MAP_CONFIG, DEFAULT_STUDY_COORDINATE } from "@/lib/map/mapConfig";
import { formatCoordinates } from "@/lib/utils/coordinates";
import { MapErrorBoundary } from "./MapErrorBoundary";
import { Compass, Box, ArrowLeft, Plus, Minus, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface EarthMapProps {
  className?: string;
  onReturnToOrbit?: () => void;
}

export const EarthMap: React.FC<EarthMapProps> = ({ className, onReturnToOrbit }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<MapLibreMap | null>(null);
  const markerRef = useRef<Marker | null>(null);

  const {
    selectedLocation,
    setSelectedLocation,
    setMapViewport,
    setViewMode,
  } = useWorkspaceStore();

  const [is3dPitch, setIs3dPitch] = useState<boolean>(false);
  const [controlsHovered, setControlsHovered] = useState<boolean>(false);

  // Initialize MapLibre GL
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    let isMounted = true;
    const initialCenter = selectedLocation
      ? [selectedLocation.longitude, selectedLocation.latitude] as [number, number]
      : MAP_CONFIG.defaultCenter;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_CONFIG.styleUrl,
      center: initialCenter,
      zoom: selectedLocation ? 6.5 : MAP_CONFIG.defaultZoom,
      bearing: 0,
      pitch: 0,
      attributionControl: {
        compact: true,
        customAttribution: MAP_CONFIG.attribution,
      },
    });

    mapInstanceRef.current = map;

    map.on("load", () => {
      if (!isMounted) return;

      // Precision Targeting Marker
      const markerEl = document.createElement("div");
      markerEl.className = "geospatial-surface-reticle";
      markerEl.innerHTML = `
        <div class="relative flex items-center justify-center w-7 h-7 pointer-events-none">
          <div class="absolute inset-0 rounded-full border border-cyan-accent animate-ping opacity-50" style="animation-duration: 2.2s;"></div>
          <div class="absolute inset-1 rounded-full border border-cyan-accent/80"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-cyan-accent shadow-[0_0_8px_#73E6FF]"></div>
        </div>
      `;

      const marker = new maplibregl.Marker({ element: markerEl, anchor: "center" })
        .setLngLat(initialCenter)
        .addTo(map);

      markerRef.current = marker;
    });

    // Map Click: Selects exact coordinate
    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      const formattedCoord = {
        latitude: Number(lat.toFixed(6)),
        longitude: Number(lng.toFixed(6)),
        label: "STUDY REGION",
      };

      setSelectedLocation(formattedCoord);

      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      }
    });

    // Debounced Viewport Update
    let debounceTimer: NodeJS.Timeout;
    map.on("moveend", () => {
      if (!isMounted) return;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const center = map.getCenter();
        setMapViewport({
          center: [center.lng, center.lat],
          zoom: map.getZoom(),
          bearing: map.getBearing(),
          pitch: map.getPitch(),
        });
      }, 200);
    });

    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.resize();
      }
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      isMounted = false;
      clearTimeout(debounceTimer);
      resizeObserver.disconnect();
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedLocation, setSelectedLocation, setMapViewport]);

  // Sync marker when selectedLocation changes externally
  useEffect(() => {
    if (markerRef.current && selectedLocation) {
      markerRef.current.setLngLat([selectedLocation.longitude, selectedLocation.latitude]);
    }
  }, [selectedLocation]);

  const handleReturnOrbit = useCallback(() => {
    if (onReturnToOrbit) {
      onReturnToOrbit();
    } else {
      setViewMode("GLOBE");
    }
  }, [onReturnToOrbit, setViewMode]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn({ duration: 300 });
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut({ duration: 300 });
  const handleResetNorth = () => {
    mapInstanceRef.current?.resetNorthPitch({ duration: 500 });
    setIs3dPitch(false);
  };
  const handleResetIndia = () => {
    mapInstanceRef.current?.flyTo({
      center: MAP_CONFIG.defaultCenter,
      zoom: MAP_CONFIG.defaultZoom,
      bearing: 0,
      pitch: 0,
      duration: 1000,
    });
    setIs3dPitch(false);
    setSelectedLocation(DEFAULT_STUDY_COORDINATE);
  };
  const handleTogglePitch = () => {
    if (!mapInstanceRef.current) return;
    const nextPitch = is3dPitch ? 0 : 55;
    mapInstanceRef.current.easeTo({ pitch: nextPitch, duration: 500 });
    setIs3dPitch(!is3dPitch);
  };

  return (
    <MapErrorBoundary onRetry={() => window.location.reload()}>
      <div className={cn("relative w-full h-full overflow-hidden select-none", className)}>
        {/* Full-Bleed Map Canvas */}
        <div
          ref={mapContainerRef}
          className="w-full h-full"
          aria-label="MapLibre Geospatial Basemap Viewport"
        />

        {/* Delicate Dark Scientific Grade Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-void-0/25 mix-blend-multiply" />

        {/* Top Floating Return to Orbit Button */}
        <div className="absolute top-16 left-6 z-20 font-mono">
          <button
            onClick={handleReturnOrbit}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-space-muted hover:text-cyan-accent bg-void-1/85 backdrop-blur-md border border-panel-hairline hover:border-cyan-accent/50 rounded-sm transition-all focus:outline-none focus:ring-1 focus:ring-cyan-accent"
            aria-label="Return to Planetary Orbit View"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase text-[11px]">RETURN TO ORBIT</span>
          </button>
        </div>

        {/* Selected Coordinates Readout (Bottom Left) */}
        {selectedLocation && (
          <div className="absolute bottom-6 left-6 z-20 font-mono text-xs">
            <div className="flex items-center gap-2 text-[10px] text-space-faint tracking-widest uppercase mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent" />
              <span>SELECTED SURFACE POINT</span>
            </div>
            <div className="text-sm font-semibold tracking-wider text-space-white">
              {formatCoordinates(selectedLocation.latitude, selectedLocation.longitude, 4)}
            </div>
            <div className="text-[10px] text-cyan-accent/80 tracking-widest mt-0.5">
              {selectedLocation.label || "WGS84 REFERENCE"}
            </div>
          </div>
        )}

        {/* Contextual Map Controls (Fade in on edge approach) */}
        <div
          onMouseEnter={() => setControlsHovered(true)}
          onMouseLeave={() => setControlsHovered(false)}
          className={cn(
            "absolute top-20 right-6 z-20 flex flex-col gap-1 p-1 bg-void-1/85 backdrop-blur-md border border-panel-hairline rounded-sm transition-opacity duration-300 font-mono",
            controlsHovered ? "opacity-100" : "opacity-40 hover:opacity-100"
          )}
        >
          <button
            onClick={handleZoomIn}
            aria-label="Zoom In"
            title="Zoom In"
            className="p-1.5 text-space-muted hover:text-cyan-accent rounded transition-colors focus:outline-none"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            aria-label="Zoom Out"
            title="Zoom Out"
            className="p-1.5 text-space-muted hover:text-cyan-accent rounded transition-colors focus:outline-none"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <div className="w-full h-[1px] bg-panel-hairline" />
          <button
            onClick={handleResetNorth}
            aria-label="Reset North"
            title="Reset Orientation"
            className="p-1.5 text-space-muted hover:text-cyan-accent rounded transition-colors focus:outline-none"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetIndia}
            aria-label="Reset View"
            title="Reset to India"
            className="p-1.5 text-space-muted hover:text-cyan-accent rounded transition-colors focus:outline-none"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <div className="w-full h-[1px] bg-panel-hairline" />
          <button
            onClick={handleTogglePitch}
            aria-label="Toggle 3D Pitch"
            title="Toggle 3D Perspective"
            className={cn(
              "p-1.5 rounded transition-colors focus:outline-none",
              is3dPitch ? "text-cyan-accent bg-cyan-soft/30 font-bold" : "text-space-muted hover:text-cyan-accent"
            )}
          >
            <Box className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </MapErrorBoundary>
  );
};
