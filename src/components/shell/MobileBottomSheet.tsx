"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface MobileBottomSheetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  title,
  children,
  className,
}) => {
  const [sheetState, setSheetState] = useState<"collapsed" | "half" | "expanded">("collapsed");

  const toggleSheet = () => {
    if (sheetState === "collapsed") setSheetState("half");
    else if (sheetState === "half") setSheetState("expanded");
    else setSheetState("collapsed");
  };

  return (
    <div
      className={cn(
        "xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-panel-strong/95 backdrop-blur-xl border-t border-cyan-accent/30 transition-transform duration-300 ease-out font-mono",
        sheetState === "collapsed" && "translate-y-[calc(100%-48px)]",
        sheetState === "half" && "translate-y-[calc(100%-45vh)]",
        sheetState === "expanded" && "translate-y-[calc(100%-85vh)]",
        className
      )}
      style={{ height: "85vh" }}
    >
      {/* Handle Header */}
      <button
        onClick={toggleSheet}
        className="w-full h-12 flex items-center justify-between px-4 bg-void-1/80 border-b border-panel-hairline focus:outline-none select-none"
        aria-label={`Toggle mobile bottom sheet (Currently ${sheetState})`}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent" />
          <span className="text-xs font-semibold tracking-wider text-space-white uppercase">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1 text-space-muted">
          <span className="text-[10px] uppercase text-space-faint">{sheetState}</span>
          {sheetState === "expanded" ? (
            <ChevronDown className="w-4 h-4 text-cyan-accent" />
          ) : (
            <ChevronUp className="w-4 h-4 text-cyan-accent" />
          )}
        </div>
      </button>

      {/* Sheet Content */}
      <div className="h-[calc(100%-48px)] overflow-y-auto p-4 pb-20">
        {children}
      </div>
    </div>
  );
};
