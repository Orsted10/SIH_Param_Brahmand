import React from "react";
import { cn } from "@/lib/utils/cn";

interface ScientificRuleProps {
  className?: string;
  indicatorPosition?: "left" | "center" | "right";
  animated?: boolean;
}

export const ScientificRule: React.FC<ScientificRuleProps> = ({
  className,
  indicatorPosition = "left",
  animated = false,
}) => {
  return (
    <div className={cn("relative w-full h-[1px] bg-panel-hairline overflow-hidden", className)}>
      <div
        className={cn(
          "absolute top-0 h-[1px] w-12 bg-cyan-accent/60",
          indicatorPosition === "left" && "left-0",
          indicatorPosition === "center" && "left-1/2 -translate-x-1/2",
          indicatorPosition === "right" && "right-0",
          animated && "animate-pulse-subtle"
        )}
      />
    </div>
  );
};
