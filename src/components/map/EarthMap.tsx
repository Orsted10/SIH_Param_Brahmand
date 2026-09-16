"use client";

import React, { useEffect, useRef } from "react";
import maplibregl, { Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { MAP_CONFIG } from "@/lib/map/mapConfig";
import { MapErrorBoundary } from "./MapErrorBoundary";
import { cn } from "@/lib/utils/cn";

interface EarthMapProps {
  className?: string;
  onReturnToOrbit?: () => void;
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

  // UI Controls removed for Cinematic Phase 01.7

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
      </div>
    </MapErrorBoundary>
  );
};
