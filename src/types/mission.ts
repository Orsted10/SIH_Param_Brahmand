export type WorkspaceMode =
  | "MISSION"
  | "EXPLORE"
  | "ANALYZE"
  | "COMPARE"
  | "EVIDENCE"
  | "REPORT";

export type MicrophoneStatus = "unknown" | "available" | "denied" | "unsupported";

export interface SystemCapabilities {
  webgl: boolean;
  microphone: MicrophoneStatus;
  network: boolean;
  reducedMotion: boolean;
  dpr: number;
}

export type ExecutionEventType =
  | "SESSION_STARTED"
  | "ASSET_ADDED"
  | "ASSET_REMOVED"
  | "QUERY_CAPTURED"
  | "POINT_SELECTED"
  | "MODE_CHANGED"
  | "VIEW_CHANGED"
  | "CAPABILITY_DETECTED"
  | "SESSION_RESET";

export interface ExecutionEvent {
  id: string;
  timestamp: string;
  type: ExecutionEventType;
  details: Record<string, unknown>;
}
