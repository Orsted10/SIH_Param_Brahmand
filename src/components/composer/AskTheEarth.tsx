"use client";

import React, { useRef, useState, useEffect } from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { testMicrophonePermission } from "@/lib/browser/audio";
import { SAMPLE_PROMPTS } from "@/lib/constants/prompts";
import { Send, Mic, X, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const AskTheEarth: React.FC = () => {
  const {
    currentQuery,
    setCurrentQuery,
    captureQuery,
    queryHistory,
    isCommandOpen,
    setCommandOpen,
    selectedLocation,
    microphoneSupported,
    setMicrophoneStatus,
    addToast,
  } = useWorkspaceStore();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [micTesting, setMicTesting] = useState(false);

  useEffect(() => {
    if (isCommandOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isCommandOpen]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQuery.trim()) return;

    captureQuery(currentQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      setCommandOpen(false);
    }
  };

  const handleMicClick = async () => {
    setMicTesting(true);
    try {
      const status = await testMicrophonePermission();
      setMicrophoneStatus(status);
      if (status === "available") {
        addToast({
          title: "Microphone Verified",
          message: "Voice Hardware Ready: Wired for Groq Whisper pipeline in Phase 02",
          type: "success",
        });
      } else if (status === "denied") {
        addToast({
          title: "Microphone Access Denied",
          message: "Browser permission was rejected or dismissed",
          type: "amber",
        });
      } else {
        addToast({
          title: "Microphone Unsupported",
          message: "No audio capture hardware detected in this browser",
          type: "error",
        });
      }
    } catch {
      setMicrophoneStatus("denied");
    } finally {
      setMicTesting(false);
    }
  };

  const latestQuery = queryHistory.length > 0 ? queryHistory[0] : null;

  return (
    <div className="w-full flex flex-col items-center justify-center font-mono select-none">
      {/* Collapsed Minimalist Hairline Trigger */}
      {!isCommandOpen ? (
        <button
          onClick={() => setCommandOpen(true)}
          className="group relative flex flex-col items-center py-2 px-6 focus:outline-none"
          aria-label="Open Ask The Earth Command Console (Keyboard shortcut: Q)"
        >
          {/* Subtle Expanding Hairline on Hover */}
          <div className="w-24 group-hover:w-64 h-[1px] bg-cyan-accent/40 group-hover:bg-cyan-accent transition-all duration-300 mb-2" />
          <div className="flex items-center gap-3 text-xs tracking-widest text-space-muted group-hover:text-space-white transition-colors">
            <span>— ASK THE EARTH —</span>
            <kbd className="text-[9px] px-1.5 py-0.2 bg-void-1 text-space-faint rounded border border-panel-hairline">
              Q
            </kbd>
          </div>
        </button>
      ) : (
        /* Expanded Scientific Command Console */
        <div className="w-full max-w-2xl px-4 animate-in fade-in zoom-in-95 duration-200">
          {/* Top Hairline with Dismiss */}
          <div className="flex items-center justify-between pb-2 border-b border-panel-hairline">
            <span className="text-[10px] text-cyan-accent tracking-widest uppercase font-semibold">
              COMMAND INSTRUMENT · INTERROGATING PLANETARY PHYSICS
            </span>
            <button
              onClick={() => setCommandOpen(false)}
              className="p-1 text-space-faint hover:text-cyan-accent transition-colors"
              aria-label="Close Command Console"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Transparent Input Surface (Earth remains fully visible behind it!) */}
          <form onSubmit={handleSubmit} className="relative mt-2">
            <textarea
              id="query-composer-textarea"
              ref={textareaRef}
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              placeholder="Ask the Earth anything (e.g. 'Show flooded area in this scene', 'How did this region change?')..."
              className="w-full bg-void-1/70 backdrop-blur-md border border-cyan-accent/30 focus:border-cyan-accent p-3 text-xs text-space-white placeholder-space-faint outline-none resize-none leading-relaxed"
            />

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleMicClick}
                  disabled={micTesting}
                  title="Verify audio input hardware"
                  className={cn(
                    "p-1.5 rounded transition-colors text-xs flex items-center gap-1.5",
                    microphoneSupported === "available"
                      ? "text-status-green bg-status-green/10"
                      : "text-space-muted hover:text-cyan-accent hover:bg-void-2/60"
                  )}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">
                    {microphoneSupported === "available" ? "MIC READY" : "CHECK MIC"}
                  </span>
                </button>

                {selectedLocation && (
                  <span className="text-[10px] text-space-faint hidden md:inline">
                    TARGET: {selectedLocation.latitude.toFixed(2)}°N, {selectedLocation.longitude.toFixed(2)}°E
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCommandOpen(false)}
                  className="px-2.5 py-1 text-[11px] text-space-muted hover:text-space-white transition-colors"
                >
                  DISMISS
                </button>
                <button
                  type="submit"
                  disabled={!currentQuery.trim()}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all",
                    currentQuery.trim()
                      ? "bg-cyan-accent text-void-0 hover:bg-cyan-accent/90 shadow-[0_0_12px_rgba(115,230,255,0.3)]"
                      : "bg-void-2 text-space-faint cursor-not-allowed"
                  )}
                >
                  <span>CAPTURE QUERY</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </form>

          {/* Sample Prompts */}
          <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-panel-hairline">
            {SAMPLE_PROMPTS.slice(0, 3).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuery(prompt)}
                className="text-[10px] text-space-faint hover:text-cyan-accent transition-colors text-left"
              >
                &ldquo;{prompt}&rdquo;
              </button>
            ))}
          </div>

          {/* Captured Query Display */}
          {latestQuery && (
            <div className="mt-3 p-2.5 rounded-sm bg-void-1/80 border border-cyan-accent/30 text-xs space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-cyan-accent font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-cyan-accent" />
                  <span>QUERY CAPTURED</span>
                </span>
                <span className="text-space-faint flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(latestQuery.timestamp).toLocaleTimeString()}</span>
                </span>
              </div>
              <div className="text-space-white italic text-[11px]">
                &ldquo;{latestQuery.queryText}&rdquo;
              </div>
              <div className="text-[9px] text-amber-status flex items-center gap-1">
                <AlertCircle className="w-2.5 h-2.5 text-amber-status shrink-0" />
                <span>Waiting for sovereign analysis pipeline (Phase 02). Zero hallucinated answers.</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
