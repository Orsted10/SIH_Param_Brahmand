"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import maplibregl, { Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { MAP_CONFIG, DEFAULT_STUDY_COORDINATE } from "@/lib/map/mapConfig";
import { MapControls } from "./MapControls";
import { MapErrorBoundary } from "./MapErrorBoundary";

interface EarthMapProps {
  className?: string;
}

export const EarthMap: React.FC<EarthMapProps> = ({ className }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<MapLibreMap | null>(null);
  const markerRef = useRef<Marker | null>(null);

  const {
    selectedLocation,
    setSelectedLocation,
    setMapViewport,
  } = useWorkspaceStore();

  const [is3dPitch, setIs3dPitch] = useState<boolean>(false);

  // Initialize MapLibre GL
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    let isMounted = true;
    const initialCenter = MAP_CONFIG.defaultCenter;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_CONFIG.styleUrl,
      center: initialCenter,
      zoom: MAP_CONFIG.defaultZoom,
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

      // Create Custom Scientific Target Marker
      const markerEl = document.createElement("div");
      markerEl.className = "study-target-marker";
      markerEl.innerHTML = `
        <div class="relative flex items-center justify-center w-8 h-8 pointer-events-none">
          <div class="absolute inset-0 rounded-full border border-cyan-accent animate-ping opacity-60" style="animation-duration: 2s;"></div>
          <div class="absolute inset-1 rounded-full border border-cyan-accent/80"></div>
          <div class="w-2 h-2 rounded-full bg-cyan-accent shadow-[0_0_10px_#73E6FF]"></div>
        </div>
      `;

      const marker = new maplibregl.Marker({ element: markerEl, anchor: "center" })
        .setLngLat(initialCenter)
        .addTo(map);

      markerRef.current = marker;
    });

    // Handle Map Clicks to Select Study Coordinates
    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      const formattedCoord = {
        latitude: Number(lat.toFixed(6)),
        longitude: Number(lng.toFixed(6)),
        label: "SELECTED STUDY POINT",
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

    // Resize Observer to handle dynamic flex layouts
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
  }, [setSelectedLocation, setMapViewport]);

  // Sync marker when selectedLocation changes externally
  useEffect(() => {
    if (markerRef.current && selectedLocation) {
      markerRef.current.setLngLat([selectedLocation.longitude, selectedLocation.latitude]);
    }
  }, [selectedLocation]);

  // Map Control Actions
  const handleZoomIn = useCallback(() => {
    mapInstanceRef.current?.zoomIn({ duration: 300 });
  }, []);

  const handleZoomOut = useCallback(() => {
    mapInstanceRef.current?.zoomOut({ duration: 300 });
  }, []);

  const handleResetNorth = useCallback(() => {
    mapInstanceRef.current?.resetNorthPitch({ duration: 600 });
    setIs3dPitch(false);
  }, []);

  const handleResetIndia = useCallback(() => {
    mapInstanceRef.current?.flyTo({
      center: MAP_CONFIG.defaultCenter,
      zoom: MAP_CONFIG.defaultZoom,
      bearing: 0,
      pitch: 0,
      duration: 1200,
    });
    setIs3dPitch(false);
    setSelectedLocation(DEFAULT_STUDY_COORDINATE);
  }, [setSelectedLocation]);

  const handleTogglePitch = useCallback(() => {
    if (!mapInstanceRef.current) return;
    const nextPitch = is3dPitch ? 0 : 55;
    mapInstanceRef.current.easeTo({ pitch: nextPitch, duration: 600 });
    setIs3dPitch(!is3dPitch);
  }, [is3dPitch]);

  return (
    <MapErrorBoundary onRetry={() => window.location.reload()}>
      <div className={`relative w-full h-full overflow-hidden select-none ${className || ""}`}>
        {/* Map Container */}
        <div
          ref={mapContainerRef}
          className="w-full h-full"
          aria-label="MapLibre Geospatial Basemap Viewport"
        />

        {/* Dark scientific color grading overlay */}
        <div className="absolute inset-0 pointer-events-none bg-void-0/20 mix-blend-multiply" />

        {/* Map Controls Floating in Top Right */}
        <div className="absolute top-4 right-4 z-10">
          <MapControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetNorth={handleResetNorth}
            onResetIndia={handleResetIndia}
            onTogglePitch={handleTogglePitch}
            is3dPitch={is3dPitch}
          />
        </div>

        {/* Selected Coordinates Readout Badge at Bottom Left */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 z-10 font-mono text-[10px] px-2.5 py-1.5 rounded-sm bg-void-1/90 backdrop-blur-md border border-panel-hairline text-space-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent animate-pulse" />
            <span className="text-space-faint">STUDY POINT:</span>
            <span className="text-cyan-accent font-semibold">
              {selectedLocation.latitude.toFixed(4)}° N, {selectedLocation.longitude.toFixed(4)}° E
            </span>
          </div>
        )}
      </div>
    </MapErrorBoundary>
  );
};
