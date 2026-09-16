"use client";

import React, { useEffect } from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { detectWebGLSupport } from "@/lib/browser/webgl";
import { subscribeToReducedMotion, checkPrefersReducedMotion } from "@/lib/browser/motion";
import { ObservationWorkspace } from "@/components/workspace/ObservationWorkspace";
import { classifyFile, extractImageDimensions, urlManager } from "@/lib/files/fileUtils";
import { ImageryAsset } from "@/types/imagery";

export default function Home() {
  const {
    setSystemStatus,
    setWebglSupported,
    setNetworkOnline,
    setReducedMotion,
    addUploadedAsset,
    setViewMode,
  } = useWorkspaceStore();

  useEffect(() => {
    const hasWebgl = detectWebGLSupport();
    setWebglSupported(hasWebgl);

    const updateOnline = () => setNetworkOnline(navigator.onLine);
    setNetworkOnline(navigator.onLine);
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);

    const initialReduced = checkPrefersReducedMotion();
    setReducedMotion(initialReduced);
    const unsubscribeMotion = subscribeToReducedMotion(setReducedMotion);

    // Give a small delay before hiding any loader if necessary, but we are entering void directly.
    const t = setTimeout(() => {
      setSystemStatus("SYSTEM_READY");
    }, 100);

    return () => {
      clearTimeout(t);
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
    <div className="relative w-full bg-void-0 font-sans" style={{ height: "1000vh" }}>
      {/* Massive Scroll Track ^ */}
      
      {/* Fixed Container for the Experience */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden">
        <ObservationWorkspace />
      </div>

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
