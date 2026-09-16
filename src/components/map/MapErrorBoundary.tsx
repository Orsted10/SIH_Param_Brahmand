"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class MapErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("EarthMap Error Boundary caught an error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="relative w-full h-full flex flex-col items-center justify-center bg-void-0 p-6 text-center font-mono select-none"
        >
          <div className="p-3 rounded-full bg-status-red/10 border border-status-red/30 mb-3">
            <AlertTriangle className="w-6 h-6 text-status-red" />
          </div>
          <span className="text-xs font-semibold tracking-widest text-status-red uppercase">
            GEOSPATIAL MAP VIEW UNAVAILABLE
          </span>
          <p className="text-[11px] text-space-muted max-w-sm mt-1 mb-4">
            WebGL context for vector tile rendering encountered an unexpected exception or network tile timeout.
          </p>
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-panel hover:bg-panel-border border border-cyan-accent/40 text-xs text-cyan-accent transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-accent"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RETRY MAP INITIALIZATION</span>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
