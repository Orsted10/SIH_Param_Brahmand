"use client";

import React, { useEffect, useRef, useState } from "react";
import { PlanetaryGlobe } from "../globe/PlanetaryGlobe";
import { EarthMap } from "../map/EarthMap";
import { ObservationViewer } from "../upload/ObservationViewer";
import { useScrollTimeline } from "@/lib/hooks/useScrollTimeline";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { cn } from "@/lib/utils/cn";
import { classifyFile, extractImageDimensions, urlManager } from "@/lib/files/fileUtils";
import { ImageryAsset } from "@/types/imagery";

export const ObservationWorkspace: React.FC = () => {
  const { viewMode, setViewMode, reducedMotion, addUploadedAsset } = useWorkspaceStore();
  const { getProgress } = useScrollTimeline();
  const [isDragging, setIsDragging] = useState(false);

  // Refs for direct DOM manipulation to avoid React re-renders during 60fps scrolling
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const textParamRef = useRef<HTMLDivElement>(null);
  const textBrahmandRef = useRef<HTMLDivElement>(null);
  const textEarthRef = useRef<HTMLDivElement>(null);
  const textIntelligenceRef = useRef<HTMLDivElement>(null);
  const textOpticalRef = useRef<HTMLDivElement>(null);
  const textSarRef = useRef<HTMLDivElement>(null);
  const textFusionRef = useRef<HTMLDivElement>(null);
  const textChangeRef = useRef<HTMLDivElement>(null);
  const textDataRef = useRef<HTMLDivElement>(null);

  // Cinematic Timeline Animation Loop
  useEffect(() => {
    let frameId: number;
    const update = () => {
      const p = getProgress();

      // Earth vs Map Opacity
      // Map fades in heavily after 85%
      if (globeContainerRef.current && mapContainerRef.current) {
        if (p < 0.85) {
          globeContainerRef.current.style.opacity = "1";
          globeContainerRef.current.style.pointerEvents = "auto";
          mapContainerRef.current.style.opacity = "0";
          mapContainerRef.current.style.pointerEvents = "none";
        } else {
          // Crossfade
          const mapOp = Math.min(1, (p - 0.85) * 6.66); // 0 to 1 over 15%
          globeContainerRef.current.style.opacity = (1 - mapOp).toString();
          globeContainerRef.current.style.pointerEvents = "none";
          mapContainerRef.current.style.opacity = mapOp.toString();
          mapContainerRef.current.style.pointerEvents = mapOp > 0.5 ? "auto" : "none";
        }
      }

      // Typography Opacity & Scale Choreography
      const animateText = (ref: React.RefObject<HTMLDivElement | null>, start: number, end: number, peak: number) => {
        if (!ref.current) return;
        if (p < start || p > end) {
          ref.current.style.opacity = "0";
          ref.current.style.transform = "scale(0.9)";
          return;
        }
        
        let op = 0;
        let scale = 1;
        if (p <= peak) {
          op = (p - start) / (peak - start);
          scale = 0.9 + (op * 0.1); // Scale from 0.9 to 1.0
        } else {
          op = 1.0 - ((p - peak) / (end - peak));
          scale = 1.0 + ((1.0 - op) * 0.1); // Scale from 1.0 to 1.1 as it fades out
        }
        
        ref.current.style.opacity = op.toString();
        ref.current.style.transform = `scale(${scale})`;
      };

      // Tweak these ranges to perfect the storytelling
      animateText(textParamRef, 0.02, 0.15, 0.08);
      animateText(textBrahmandRef, 0.05, 0.18, 0.11);
      
      animateText(textEarthRef, 0.20, 0.35, 0.27);
      animateText(textIntelligenceRef, 0.24, 0.39, 0.31);

      animateText(textOpticalRef, 0.45, 0.55, 0.50);
      animateText(textSarRef, 0.50, 0.60, 0.55);
      animateText(textFusionRef, 0.55, 0.65, 0.60);
      
      animateText(textChangeRef, 0.65, 0.75, 0.70);
      animateText(textDataRef, 0.75, 0.85, 0.80);

      frameId = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frameId);
  }, [getProgress]);

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

  if (viewMode === "OBSERVATION") {
    return (
      <main className="relative w-full h-full overflow-hidden bg-void-0 select-none">
        <ObservationViewer />
      </main>
    );
  }

  return (
    <main
      className="relative w-full h-full overflow-hidden bg-void-0 select-none"
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

      {/* Cinematic Typography Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
        {/* Arrival */}
        <div ref={textParamRef} className="absolute text-[8vw] md:text-[12vw] font-bold text-space-white tracking-[0.2em] uppercase opacity-0 transition-none will-change-[opacity,transform] -mt-[10vh]">
          PARAM
        </div>
        <div ref={textBrahmandRef} className="absolute text-[8vw] md:text-[12vw] font-bold text-space-white tracking-[0.2em] uppercase opacity-0 transition-none will-change-[opacity,transform] mt-[10vh]">
          BRAHMAND
        </div>

        {/* Intelligence */}
        <div ref={textEarthRef} className="absolute text-[15vw] font-bold text-space-white tracking-widest uppercase opacity-0 transition-none will-change-[opacity,transform] -mt-[5vh]">
          EARTH
        </div>
        <div ref={textIntelligenceRef} className="absolute text-[4vw] font-light text-cyan-accent tracking-[0.4em] uppercase opacity-0 transition-none will-change-[opacity,transform] mt-[15vh]">
          INTELLIGENCE
        </div>

        {/* Modalities */}
        <div ref={textOpticalRef} className="absolute text-2xl font-light text-space-white tracking-[0.5em] uppercase opacity-0 transition-none will-change-[opacity,transform] -ml-[20vw] mt-[20vh]">
          OPTICAL
        </div>
        <div ref={textSarRef} className="absolute text-5xl font-bold text-space-white tracking-[0.2em] uppercase opacity-0 transition-none will-change-[opacity,transform] ml-[20vw] mt-[10vh]">
          SAR
        </div>
        <div ref={textFusionRef} className="absolute text-[8vw] font-bold text-space-white tracking-widest uppercase opacity-0 transition-none will-change-[opacity,transform]">
          FUSION
        </div>

        {/* Temporal & Data */}
        <div ref={textChangeRef} className="absolute text-[10vw] font-bold text-red-400 tracking-[0.1em] uppercase opacity-0 transition-none will-change-[opacity,transform]">
          CHANGE
        </div>
        <div ref={textDataRef} className="absolute text-3xl font-mono text-cyan-accent tracking-[0.3em] uppercase opacity-0 transition-none will-change-[opacity,transform]">
          OBSERVATION → UNDERSTANDING
        </div>
      </div>

      {/* 3D Planetary Globe Layer */}
      <div
        ref={globeContainerRef}
        className="absolute inset-0 z-0 transition-none will-change-[opacity]"
      >
        <PlanetaryGlobe
          selectedCoordinate={null}
          reducedMotion={reducedMotion}
          viewMode={viewMode}
          scrollProgressGetter={getProgress}
        />
      </div>

      {/* 2D Geospatial Basemap Layer */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0 z-20 opacity-0 pointer-events-none transition-none will-change-[opacity]"
      >
        <EarthMap onReturnToOrbit={() => setViewMode("GLOBE")} />
      </div>
    </main>
  );
};
