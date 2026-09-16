"use client";

import React, { useEffect, useState } from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { formatLatitude, formatLongitude } from "@/lib/utils/coordinates";

export const ScientificCursor: React.FC = () => {
  const { hoveredCoordinate } = useWorkspaceStore();
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isTouch, setIsTouch] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handlePointerMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handlePointerMove);
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

  if (isTouch) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out select-none"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {/* Live Raycasted Coordinate Badge when hovering over Earth surface */}
      {hoveredCoordinate && (
        <div className="absolute top-4 left-4 bg-void-0/90 backdrop-blur-sm border border-cyan-accent/50 px-2 py-1 rounded-sm text-[10px] font-mono text-cyan-accent whitespace-nowrap shadow-lg flex items-center gap-2">
          <span>{formatLatitude(hoveredCoordinate.latitude, 2)}</span>
          <span className="text-space-faint">/</span>
          <span>{formatLongitude(hoveredCoordinate.longitude, 2)}</span>
        </div>
      )}
    </div>
  );
};
