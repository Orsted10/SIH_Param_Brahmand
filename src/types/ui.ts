export type ActiveView = "GLOBE" | "MAP";

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type: "info" | "success" | "amber" | "error";
  durationMs?: number;
}
