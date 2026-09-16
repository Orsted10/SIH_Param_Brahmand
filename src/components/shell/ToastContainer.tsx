"use client";

import React from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useWorkspaceStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-16 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full font-mono"
    >
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            role="status"
            className={cn(
              "pointer-events-auto flex items-start gap-2.5 p-3 rounded-sm bg-void-1/95 border backdrop-blur-md shadow-lg transition-all duration-200 animate-in fade-in slide-in-from-bottom-2",
              toast.type === "info" && "border-cyan-accent/40 text-space-white",
              toast.type === "success" && "border-status-green/40 text-space-white",
              toast.type === "amber" && "border-status-amber/40 text-space-white",
              toast.type === "error" && "border-status-red/40 text-space-white"
            )}
          >
            {/* Icon */}
            <div className="shrink-0 mt-0.5">
              {toast.type === "info" && <Info className="w-3.5 h-3.5 text-cyan-accent" />}
              {toast.type === "success" && (
                <CheckCircle2 className="w-3.5 h-3.5 text-status-green" />
              )}
              {toast.type === "amber" && (
                <AlertTriangle className="w-3.5 h-3.5 text-status-amber" />
              )}
              {toast.type === "error" && (
                <AlertCircle className="w-3.5 h-3.5 text-status-red" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold tracking-wide truncate">
                {toast.title}
              </div>
              {toast.message && (
                <div className="text-[10px] text-space-muted mt-0.5 break-words">
                  {toast.message}
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-0.5 text-space-faint hover:text-space-white rounded"
              aria-label="Dismiss Notification"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
