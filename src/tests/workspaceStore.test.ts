import { describe, it, expect, beforeEach } from "vitest";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { ImageryAsset } from "@/types/imagery";

describe("Workspace Store State Machine", () => {
  beforeEach(() => {
    useWorkspaceStore.getState().resetSession();
  });

  it("initializes with default state centered on India", () => {
    const state = useWorkspaceStore.getState();
    expect(state.activeMode).toBe("MISSION");
    expect(state.selectedLocation?.latitude).toBeCloseTo(20.5937);
    expect(state.selectedLocation?.longitude).toBeCloseTo(78.9629);
    expect(state.uploadedAssets).toHaveLength(0);
    expect(state.queryHistory).toHaveLength(0);
  });

  it("adds and removes uploaded assets", () => {
    const asset: ImageryAsset = {
      id: "test-asset-1",
      name: "sample.png",
      mimeType: "image/png",
      sizeBytes: 1024,
      lastModified: Date.now(),
      kind: "OPTICAL_IMAGE",
      previewUrl: null,
      status: "READY",
      createdAt: new Date().toISOString(),
    };

    useWorkspaceStore.getState().addUploadedAsset(asset);
    expect(useWorkspaceStore.getState().uploadedAssets).toHaveLength(1);
    expect(useWorkspaceStore.getState().uploadedAssets[0].name).toBe("sample.png");

    useWorkspaceStore.getState().removeUploadedAsset("test-asset-1");
    expect(useWorkspaceStore.getState().uploadedAssets).toHaveLength(0);
  });

  it("captures query without fabricating model output", () => {
    const query = "Detect surface water change";
    useWorkspaceStore.getState().captureQuery(query);

    const state = useWorkspaceStore.getState();
    expect(state.queryHistory).toHaveLength(1);
    expect(state.queryHistory[0].queryText).toBe(query);
    expect(state.queryHistory[0].status).toBe("CAPTURED_PENDING_PIPELINE");
    expect(state.currentQuery).toBe("");
  });

  it("handles mode switches and intercepts upcoming modes", () => {
    useWorkspaceStore.getState().setActiveMode("EXPLORE");
    expect(useWorkspaceStore.getState().activeMode).toBe("EXPLORE");
    expect(useWorkspaceStore.getState().futureDialogMode).toBeNull();

    // Upcoming mode
    useWorkspaceStore.getState().setActiveMode("ANALYZE");
    expect(useWorkspaceStore.getState().futureDialogMode).toBe("ANALYZE");
  });

  it("resets session completely", () => {
    useWorkspaceStore.getState().captureQuery("Temporary query");
    expect(useWorkspaceStore.getState().queryHistory).toHaveLength(1);

    useWorkspaceStore.getState().resetSession();
    expect(useWorkspaceStore.getState().queryHistory).toHaveLength(0);
    expect(useWorkspaceStore.getState().uploadedAssets).toHaveLength(0);
    expect(useWorkspaceStore.getState().selectedLocation?.latitude).toBeCloseTo(20.5937);
  });
});
