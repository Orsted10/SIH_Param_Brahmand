"use client";

import React, { useRef, useEffect } from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";

export const AskTheEarth: React.FC = () => {
  const {
    currentQuery,
    setCurrentQuery,
    captureQuery,
    queryHistory,
    isCommandOpen,
    setCommandOpen,
  } = useWorkspaceStore();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCommandOpen]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQuery.trim()) return;
    captureQuery(currentQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      setCommandOpen(false);
      setCurrentQuery("");
    }
  };

  const latestQuery = queryHistory.length > 0 ? queryHistory[0] : null;

  return (
    <div className="w-full flex flex-col items-center justify-center font-mono select-none">
      {!isCommandOpen ? (
        <button
          onClick={() => setCommandOpen(true)}
          className="group relative flex flex-col items-center py-2 px-6 focus:outline-none"
          aria-label="Open Ask The Earth Command Console (Keyboard shortcut: Q)"
        >
          <div className="flex items-center gap-2 text-[10px] tracking-widest text-space-muted group-hover:text-space-white transition-colors">
            <span>ASK THE EARTH</span>
            <span className="opacity-40 group-hover:opacity-100 transition-opacity">
              ─────────────────────────────
            </span>
          </div>
        </button>
      ) : (
        <div className="w-full max-w-xl px-4 animate-in fade-in duration-300">
          <form onSubmit={handleSubmit} className="flex flex-col items-start w-full">
            <span className="text-[10px] tracking-widest text-space-muted uppercase mb-1">
              ASK THE EARTH
            </span>
            <input
              ref={inputRef}
              type="text"
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Show flooded area in this scene..."
              className="w-full bg-transparent border-none p-0 text-sm md:text-base text-space-white placeholder-space-faint outline-none"
            />
            
            {/* Minimal hairline underline instead of a box */}
            <div className="w-full h-[1px] bg-space-muted/30 mt-1 mb-2" />
          </form>

          {latestQuery && !currentQuery && (
            <div className="mt-4 text-[10px] tracking-widest text-space-muted flex flex-col gap-1">
              <span className="text-space-white font-semibold uppercase">QUERY CAPTURED</span>
              <span>Observation required.</span>
              <span>No inference performed.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
