"use client";

import React, { useRef, useState } from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { testMicrophonePermission } from "@/lib/browser/audio";
import { SAMPLE_PROMPTS } from "@/lib/constants/prompts";
import {
  Send,
  Mic,
  Paperclip,
  Crosshair,
  X,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const QueryComposer: React.FC = () => {
  const {
    currentQuery,
    setCurrentQuery,
    captureQuery,
    queryHistory,
    selectedLocation,
    microphoneSupported,
    setMicrophoneStatus,
    addToast,
  } = useWorkspaceStore();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [micTesting, setMicTesting] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentQuery(e.target.value);
    // Auto-grow
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQuery.trim()) return;

    captureQuery(currentQuery);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSamplePromptClick = (promptText: string) => {
    setCurrentQuery(promptText);
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
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
          message: "Voice Input Ready: Wired for Groq Whisper pipeline in Phase 02",
          type: "success",
        });
      } else if (status === "denied") {
        addToast({
          title: "Microphone Access Denied",
          message: "Browser permission was rejected or dismissed by user",
          type: "amber",
        });
      } else {
        addToast({
          title: "Microphone Unsupported",
          message: "No audio capture hardware detected in this environment",
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
    <div className="flex flex-col gap-3 font-mono">
      {/* Central Command Input Box */}
      <form
        onSubmit={handleSubmit}
        className="relative rounded-sm bg-void-1/90 border border-panel-hairline focus-within:border-cyan-accent/60 shadow-lg p-2.5 transition-all duration-150"
      >
        <textarea
          id="query-composer-textarea"
          ref={textareaRef}
          value={currentQuery}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder="Ask the Earth anything..."
          className="w-full bg-transparent text-xs text-space-white placeholder-space-faint outline-none resize-none font-mono leading-relaxed"
          aria-label="Earth Intelligence Query Input"
        />

        {/* Action Controls Toolbar */}
        <div className="flex items-center justify-between pt-2 border-t border-panel-hairline mt-1">
          {/* Context Attachments & Voice Verification */}
          <div className="flex items-center gap-1">
            {/* File Attachment Button */}
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById("file-upload-input");
                if (input) input.click();
              }}
              title="Attach raster observation (.tif, .png, .jpg)"
              aria-label="Attach raster observation"
              className="p-1.5 text-space-muted hover:text-cyan-accent hover:bg-void-2/60 rounded transition-colors"
            >
              <Paperclip className="w-3.5 h-3.5" />
            </button>

            {/* Microphone Button (Hardware Check) */}
            <button
              type="button"
              onClick={handleMicClick}
              disabled={micTesting}
              title="Verify audio input hardware for future Groq Whisper speech queries"
              aria-label="Test microphone availability"
              className={cn(
                "p-1.5 rounded transition-colors",
                microphoneSupported === "available"
                  ? "text-status-green bg-status-green/10"
                  : microphoneSupported === "denied"
                  ? "text-status-red bg-status-red/10"
                  : "text-space-muted hover:text-cyan-accent hover:bg-void-2/60"
              )}
            >
              <Mic className="w-3.5 h-3.5" />
            </button>

            {/* Target Study Point Indicator */}
            {selectedLocation && (
              <div className="hidden sm:flex items-center gap-1 text-[10px] text-space-muted px-2 py-0.5 rounded bg-void-0/60 border border-panel-hairline">
                <Crosshair className="w-3 h-3 text-cyan-accent" />
                <span className="truncate max-w-[120px]">
                  {selectedLocation.latitude.toFixed(2)}°N, {selectedLocation.longitude.toFixed(2)}°E
                </span>
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="flex items-center gap-2">
            {currentQuery && (
              <button
                type="button"
                onClick={() => setCurrentQuery("")}
                className="p-1 text-space-faint hover:text-space-white rounded"
                title="Clear query"
                aria-label="Clear query text"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="submit"
              disabled={!currentQuery.trim()}
              title="Capture scientific query into session state"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-cyan-accent",
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

      {/* Suggested Scientific Prompts */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase tracking-wider text-space-faint">
          Remote Sensing Query Templates:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SAMPLE_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSamplePromptClick(prompt)}
              className="text-[10px] px-2 py-1 rounded-sm bg-void-1/80 hover:bg-cyan-soft/20 text-space-muted hover:text-cyan-accent border border-panel-hairline hover:border-cyan-accent/40 transition-colors text-left"
            >
              &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Honest Query Capture Display (Rules 21, 60, 61) */}
      {latestQuery && (
        <div className="p-3 rounded-sm bg-void-0/90 border border-cyan-accent/30 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-cyan-accent uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-accent" />
              <span>QUERY CAPTURED IN LOCAL STATE</span>
            </span>
            <span className="text-[9px] text-space-faint flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{new Date(latestQuery.timestamp).toLocaleTimeString()}</span>
            </span>
          </div>

          <div className="text-space-white bg-void-1/80 p-2 rounded border border-panel-hairline italic">
            &ldquo;{latestQuery.queryText}&rdquo;
          </div>

          <div className="text-[10px] text-space-muted space-y-0.5 pt-1 border-t border-panel-hairline">
            <div>Attached Rasters: <span className="text-space-white">{latestQuery.selectedAssetIds.length} observations</span></div>
            <div>Study Location: <span className="text-space-white">
              {latestQuery.selectedCoordinate
                ? `${latestQuery.selectedCoordinate.latitude.toFixed(4)}° N, ${latestQuery.selectedCoordinate.longitude.toFixed(4)}° E`
                : "India (Default Study Region)"}
            </span></div>
            <div className="text-amber-status flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3 text-amber-status shrink-0" />
              <span>Engine Status: Waiting for analysis pipeline connection (Phase 02).</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
