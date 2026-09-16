import React from "react";
import { formatLatitude, formatLongitude } from "@/lib/utils/coordinates";
import { cn } from "@/lib/utils/cn";

interface CoordinateReadoutProps {
  latitude: number;
  longitude: number;
  precision?: number;
  label?: string;
  className?: string;
  compact?: boolean;
}

export const CoordinateReadout: React.FC<CoordinateReadoutProps> = ({
  latitude,
  longitude,
  precision = 4,
  label,
  className,
  compact = false,
}) => {
  const latStr = formatLatitude(latitude, precision);
  const lngStr = formatLongitude(longitude, precision);

  if (compact) {
    return (
      <div className={cn("font-mono text-xs text-space-white/90 tracking-tight", className)}>
        <span>{latStr}</span>
        <span className="mx-1 text-space-faint">/</span>
        <span>{lngStr}</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      {label && (
        <span className="text-[10px] uppercase font-mono tracking-widest text-space-muted">
          {label}
        </span>
      )}
      <div className="flex items-center gap-3 font-mono text-xs text-space-white bg-void-1/60 px-2 py-1 rounded border border-panel-hairline">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-cyan-accent font-semibold">LAT</span>
          <span>{latStr}</span>
        </div>
        <div className="w-[1px] h-3 bg-panel-hairline" />
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-cyan-accent font-semibold">LON</span>
          <span>{lngStr}</span>
        </div>
      </div>
    </div>
  );
};
