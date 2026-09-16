import { create } from "zustand";
import {
  WorkspaceMode,
  MicrophoneStatus,
  ExecutionEvent,
  ExecutionEventType,
} from "@/types/mission";
import { ImageryAsset } from "@/types/imagery";
import { QueryEvent } from "@/types/analysis";
import { Coordinate, MapViewport } from "@/types/map";
import { ToastItem } from "@/types/ui";
import { DEFAULT_STUDY_COORDINATE, MAP_CONFIG } from "@/lib/map/mapConfig";
import { urlManager } from "@/lib/files/fileUtils";

interface WorkspaceState {
  // Navigation and view state
  activeMode: WorkspaceMode;
  globeVisible: boolean;
  sidebarOpen: boolean;
  theme: "dark";

  // Data & Location
  selectedLocation: Coordinate | null;
  selectedDataset: string | null;
  uploadedAssets: ImageryAsset[];

  // Query state
  currentQuery: string;
  queryHistory: QueryEvent[];

  // Map Camera Viewport
  mapViewport: MapViewport;

  // System & Browser Capabilities
  systemStatus: "INITIALIZING" | "SYSTEM_READY";
  webglSupported: boolean;
  microphoneSupported: MicrophoneStatus;
  networkOnline: boolean;
  reducedMotion: boolean;

  // Dialogs & Modals
  futureDialogMode: WorkspaceMode | null;
  diagnosticsOpen: boolean;
  commandPaletteOpen: boolean;
  capabilitiesModalOpen: boolean;
  auditViewerOpen: boolean;

  // Feedback & Audit
  toasts: ToastItem[];
  executionEvents: ExecutionEvent[];

  // Actions
  setActiveMode: (mode: WorkspaceMode) => void;
  setSelectedLocation: (coord: Coordinate | null) => void;
  addUploadedAsset: (asset: ImageryAsset) => void;
  removeUploadedAsset: (id: string) => void;
  setCurrentQuery: (query: string) => void;
  captureQuery: (text: string) => void;
  setMapViewport: (viewport: Partial<MapViewport>) => void;
  setGlobeVisible: (visible: boolean) => void;
  toggleGlobe: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSystemStatus: (status: "INITIALIZING" | "SYSTEM_READY") => void;
  setWebglSupported: (supported: boolean) => void;
  setMicrophoneStatus: (status: MicrophoneStatus) => void;
  setNetworkOnline: (online: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  openFutureDialog: (mode: WorkspaceMode) => void;
  closeFutureDialog: () => void;
  setDiagnosticsOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setCapabilitiesModalOpen: (open: boolean) => void;
  setAuditViewerOpen: (open: boolean) => void;
  addToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
  logExecutionEvent: (type: ExecutionEventType, details?: Record<string, unknown>) => void;
  resetSession: () => void;
}

const generateId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `evt-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  activeMode: "MISSION",
  globeVisible: true,
  sidebarOpen: true,
  theme: "dark",

  selectedLocation: DEFAULT_STUDY_COORDINATE,
  selectedDataset: null,
  uploadedAssets: [],

  currentQuery: "",
  queryHistory: [],

  mapViewport: {
    center: MAP_CONFIG.defaultCenter,
    zoom: MAP_CONFIG.defaultZoom,
    bearing: 0,
    pitch: 0,
  },

  systemStatus: "INITIALIZING",
  webglSupported: true,
  microphoneSupported: "unknown",
  networkOnline: true,
  reducedMotion: false,

  futureDialogMode: null,
  diagnosticsOpen: false,
  commandPaletteOpen: false,
  capabilitiesModalOpen: false,
  auditViewerOpen: false,

  toasts: [],
  executionEvents: [
    {
      id: generateId(),
      timestamp: new Date().toISOString(),
      type: "SESSION_STARTED",
      details: { environment: "browser", version: "0.1.0" },
    },
  ],

  setActiveMode: (mode) => {
    if (["ANALYZE", "COMPARE", "EVIDENCE", "REPORT"].includes(mode)) {
      set({ futureDialogMode: mode });
      get().logExecutionEvent("MODE_CHANGED", { requestedMode: mode, status: "FUTURE_NOTICE_OPENED" });
      return;
    }
    set({ activeMode: mode });
    get().logExecutionEvent("MODE_CHANGED", { activeMode: mode });
  },

  setSelectedLocation: (coord) => {
    set({ selectedLocation: coord });
    if (coord) {
      get().logExecutionEvent("POINT_SELECTED", {
        lat: coord.latitude,
        lng: coord.longitude,
        label: coord.label,
      });
      get().addToast({
        title: "Study Region Set",
        message: coord.label || `${coord.latitude.toFixed(4)}° N, ${coord.longitude.toFixed(4)}° E`,
        type: "info",
      });
    }
  },

  addUploadedAsset: (asset) => {
    set((state) => ({
      uploadedAssets: [asset, ...state.uploadedAssets],
      selectedDataset: asset.id,
    }));
    get().logExecutionEvent("ASSET_ADDED", {
      assetId: asset.id,
      name: asset.name,
      kind: asset.kind,
      sizeBytes: asset.sizeBytes,
    });
    get().addToast({
      title: "Observation Registered",
      message: `${asset.name} (${asset.kind})`,
      type: "success",
    });
  },

  removeUploadedAsset: (id) => {
    const asset = get().uploadedAssets.find((a) => a.id === id);
    if (asset?.previewUrl) {
      urlManager.revoke(asset.previewUrl);
    }
    set((state) => ({
      uploadedAssets: state.uploadedAssets.filter((a) => a.id !== id),
      selectedDataset: state.selectedDataset === id ? null : state.selectedDataset,
    }));
    get().logExecutionEvent("ASSET_REMOVED", { assetId: id, name: asset?.name });
    get().addToast({
      title: "Observation Removed",
      message: asset?.name,
      type: "amber",
    });
  },

  setCurrentQuery: (query) => set({ currentQuery: query }),

  captureQuery: (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const current = get();
    const event: QueryEvent = {
      queryId: generateId(),
      queryText: trimmed,
      timestamp: new Date().toISOString(),
      selectedAssetIds: current.uploadedAssets.map((a) => a.id),
      selectedCoordinate: current.selectedLocation,
      mode: current.activeMode,
      status: "CAPTURED_PENDING_PIPELINE",
    };

    set((state) => ({
      currentQuery: "",
      queryHistory: [event, ...state.queryHistory],
    }));

    get().logExecutionEvent("QUERY_CAPTURED", {
      queryId: event.queryId,
      queryLength: trimmed.length,
      attachedAssetsCount: event.selectedAssetIds.length,
      coordinate: event.selectedCoordinate,
    });

    get().addToast({
      title: "Query Captured",
      message: "Stored locally — awaiting Phase 02 analysis engine pipeline",
      type: "info",
    });
  },

  setMapViewport: (viewport) =>
    set((state) => ({
      mapViewport: { ...state.mapViewport, ...viewport },
    })),

  setGlobeVisible: (visible) => {
    set({ globeVisible: visible });
    get().logExecutionEvent("VIEW_CHANGED", { view: visible ? "GLOBE" : "MAP" });
  },

  toggleGlobe: () => {
    const next = !get().globeVisible;
    set({ globeVisible: next });
    get().logExecutionEvent("VIEW_CHANGED", { view: next ? "GLOBE" : "MAP" });
  },

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  setSystemStatus: (status) => set({ systemStatus: status }),

  setWebglSupported: (supported) => {
    set({ webglSupported: supported });
    get().logExecutionEvent("CAPABILITY_DETECTED", { capability: "webgl", supported });
  },

  setMicrophoneStatus: (status) => {
    set({ microphoneSupported: status });
    get().logExecutionEvent("CAPABILITY_DETECTED", { capability: "microphone", status });
  },

  setNetworkOnline: (online) => {
    set({ networkOnline: online });
    get().logExecutionEvent("CAPABILITY_DETECTED", { capability: "network", online });
    get().addToast({
      title: online ? "Network Reconnected" : "Operating Offline",
      message: online ? "Tile streaming available" : "Operating in local offline session",
      type: online ? "success" : "amber",
    });
  },

  setReducedMotion: (reduced) => {
    set({ reducedMotion: reduced });
    get().logExecutionEvent("CAPABILITY_DETECTED", { capability: "reducedMotion", reduced });
  },

  openFutureDialog: (mode) => set({ futureDialogMode: mode }),

  closeFutureDialog: () => set({ futureDialogMode: null }),

  setDiagnosticsOpen: (open) => set({ diagnosticsOpen: open }),

  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

  setCapabilitiesModalOpen: (open) => set({ capabilitiesModalOpen: open }),

  setAuditViewerOpen: (open) => set({ auditViewerOpen: open }),

  addToast: (toast) => {
    const id = generateId();
    const item: ToastItem = { ...toast, id };
    set((state) => ({ toasts: [...state.toasts, item] }));
    const duration = toast.durationMs || 4000;
    setTimeout(() => {
      get().removeToast(id);
    }, duration);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  logExecutionEvent: (type, details = {}) => {
    const evt: ExecutionEvent = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      type,
      details,
    };
    set((state) => ({ executionEvents: [evt, ...state.executionEvents.slice(0, 99)] }));
  },

  resetSession: () => {
    urlManager.revokeAll();
    set({
      selectedLocation: DEFAULT_STUDY_COORDINATE,
      selectedDataset: null,
      uploadedAssets: [],
      currentQuery: "",
      queryHistory: [],
      mapViewport: {
        center: MAP_CONFIG.defaultCenter,
        zoom: MAP_CONFIG.defaultZoom,
        bearing: 0,
        pitch: 0,
      },
      globeVisible: true,
      futureDialogMode: null,
    });
    get().logExecutionEvent("SESSION_RESET");
    get().addToast({
      title: "Session Reset",
      message: "Restored initial clean state (India study region)",
      type: "info",
    });
  },
}));
