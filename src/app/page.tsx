"use client";

import React, { useEffect, useState } from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { detectWebGLSupport } from "@/lib/browser/webgl";
import { subscribeToReducedMotion, checkPrefersReducedMotion } from "@/lib/browser/motion";
import { ScientificCursor } from "@/components/typography/ScientificCursor";
import { ObservationWorkspace } from "@/components/workspace/ObservationWorkspace";
import { classifyFile, extractImageDimensions, urlManager } from "@/lib/files/fileUtils";
import { ImageryAsset } from "@/types/imagery";
import { SYSTEM_BRAND } from "@/lib/constants/palette";

export default function Home() {
  const {
    setSystemStatus,
    setWebglSupported,
    setNetworkOnline,
    setReducedMotion,
    addUploadedAsset,
    setViewMode,
  } = useWorkspaceStore();

  const [entranceComplete, setEntranceComplete] = useState<boolean>(false);

  // 1. Initialize Hardware Capabilities and Event Listeners
  useEffect(() => {
    // Detect WebGL
    const hasWebgl = detectWebGLSupport();
    setWebglSupported(hasWebgl);

    // Detect Online / Offline State
    const updateOnline = () => setNetworkOnline(navigator.onLine);
    setNetworkOnline(navigator.onLine);
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);

    // Detect Reduced Motion
    const initialReduced = checkPrefersReducedMotion();
    setReducedMotion(initialReduced);
    const unsubscribeMotion = subscribeToReducedMotion(setReducedMotion);

    // 2. Cinematic Entrance Sequence
    if (initialReduced) {
      setEntranceComplete(true);
      setSystemStatus("SYSTEM_READY");
    } else {
      const t = setTimeout(() => {
        setEntranceComplete(true);
        setSystemStatus("SYSTEM_READY");
      }, 1500);

      return () => {
        clearTimeout(t);
        window.removeEventListener("online", updateOnline);
        window.removeEventListener("offline", updateOnline);
        unsubscribeMotion();
      };
    }

    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
      unsubscribeMotion();
    };
  }, [setSystemStatus, setWebglSupported, setNetworkOnline, setReducedMotion]);

  // Handle local observation file ingestion
  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
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
    if (e.target) e.target.value = "";
  };

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-void-0 font-sans">
      {/* Cinematic One-Time Entrance Overlay */}
      {!entranceComplete && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void-0 text-space-white select-none transition-opacity duration-1000 font-mono"
        >
          <div className="flex flex-col items-center gap-2 text-center opacity-80 animate-pulse">
            <span className="text-xl md:text-2xl font-light tracking-[0.3em] text-space-white uppercase">
              {SYSTEM_BRAND.name}
            </span>
            <span className="text-xs tracking-[0.4em] text-space-muted uppercase">
              EARTH INTELLIGENCE
            </span>
          </div>
        </div>
      )}

      {/* Live Raycasting Cursor */}
      <ScientificCursor />

      {/* Main Full-Bleed Planetary Canvas (Globe, Map, Observation) */}
      <ObservationWorkspace />

      {/* Hidden Native File Input for manual selection fallback */}
      <input
        id="file-upload-input"
        type="file"
        multiple
        accept=".tif,.tiff,.png,.jpg,.jpeg"
        onChange={handleFileInputChange}
        className="hidden"
        aria-label="Upload Satellite Observation"
      />
    </div>
  );
}
