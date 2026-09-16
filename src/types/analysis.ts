import { WorkspaceMode } from "./mission";

export type AnalysisStatus = "CAPTURED_PENDING_PIPELINE" | "UNAVAILABLE";

export interface QueryEvent {
  queryId: string;
  queryText: string;
  timestamp: string;
  selectedAssetIds: string[];
  selectedCoordinate: {
    latitude: number;
    longitude: number;
    label?: string;
  } | null;
  mode: WorkspaceMode;
  status: AnalysisStatus;
}
