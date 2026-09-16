"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";

interface LiveClockProps {
  className?: string;
  showUtc?: boolean;
}

export const LiveClock: React.FC<LiveClockProps> = ({ className, showUtc = true }) => {
  const [time, setTime] = useState<{ local: string; utc: string } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        local: now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        utc: now.toISOString().substring(11, 19) + " UTC",
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <div className={cn("font-mono text-xs text-space-faint", className)}>
        --:--:--
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center gap-2 font-mono text-xs text-space-muted tracking-tight", className)}
      title="System Reference Clock (Local Browser Time & UTC)"
    >
      <span className="text-space-white">{time.local}</span>
      {showUtc && (
        <>
          <span className="text-space-faint">/</span>
          <span className="text-space-faint">{time.utc}</span>
        </>
      )}
    </div>
  );
};
