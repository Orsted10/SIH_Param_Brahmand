import React from "react";
import { cn } from "@/lib/utils/cn";

interface TargetReticleProps {
  className?: string;
  size?: number;
  pulse?: boolean;
  label?: string;
}

export const TargetReticle: React.FC<TargetReticleProps> = ({
  className,
  size = 32,
  pulse = true,
  label,
}) => {
  const half = size / 2;

  return (
    <div
      className={cn("relative flex items-center justify-center pointer-events-none select-none", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outer Pulse Ring */}
      {pulse && (
        <div
          className="absolute inset-0 rounded-full border border-cyan-accent/40 animate-ping"
          style={{ animationDuration: "2.4s" }}
        />
      )}

      {/* Static Precision Ring */}
      <div className="absolute inset-1 rounded-full border border-cyan-accent/70" />

      {/* Center Target Dot */}
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-accent shadow-[0_0_8px_#73E6FF]" />

      {/* Precision Crosshair Ticks */}
      <div
        className="absolute top-0 w-[1px] bg-cyan-accent/80"
        style={{ height: Math.max(3, half - 5) }}
      />
      <div
        className="absolute bottom-0 w-[1px] bg-cyan-accent/80"
        style={{ height: Math.max(3, half - 5) }}
      />
      <div
        className="absolute left-0 h-[1px] bg-cyan-accent/80"
        style={{ width: Math.max(3, half - 5) }}
      />
      <div
        className="absolute right-0 h-[1px] bg-cyan-accent/80"
        style={{ width: Math.max(3, half - 5) }}
      />

      {/* Optional Scientific Label */}
      {label && (
        <span className="absolute top-full mt-1.5 whitespace-nowrap font-mono text-[9px] tracking-wider text-cyan-accent/90 uppercase px-1.5 py-0.5 rounded bg-void-0/90 border border-cyan-accent/30">
          {label}
        </span>
      )}
    </div>
  );
};
