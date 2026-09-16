"use client";

import React, { useEffect, useState } from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";

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
      className="fixed top-0 left-0 pointer-events-none z-[100] transition-transform duration-75 ease-out select-none"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {/* Live Raycasted Coordinate Badge with Minimal Crosshair */}
      {hoveredCoordinate && (
        <div className="relative flex items-center justify-center">
          {/* Subtle Crosshair */}
          <svg width="24" height="24" viewBox="0 0 24 24" className="absolute -left-3 -top-3 text-space-white/50">
            <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="0.5" />
            <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="0.5" />
          </svg>
          
          <div className="absolute top-2 left-4 text-[9px] font-mono whitespace-nowrap text-space-white uppercase tracking-widest mix-blend-difference">
            <div>LAT {hoveredCoordinate.latitude.toFixed(4)}°</div>
            <div>LON {hoveredCoordinate.longitude.toFixed(4)}°</div>
          </div>
        </div>
      )}
    </div>
  );
};
