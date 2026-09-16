"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { GlobeFallback } from "./GlobeFallback";

interface Props {
  children: ReactNode;
  selectedCoordinate?: { latitude: number; longitude: number } | null;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GlobeErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("PlanetaryGlobe Error Boundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <GlobeFallback selectedCoordinate={this.props.selectedCoordinate} />;
    }
    return this.props.children;
  }
}
