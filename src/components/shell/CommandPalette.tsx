"use client";

import React, { useState, useEffect, useRef } from "react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import {
  Search,
  Globe2,
  Map,
  Upload,
  MessageSquareCode,
  Crosshair,
  RotateCcw,
  Cpu,
  ShieldCheck,
  FileSpreadsheet,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface PaletteCommand {
  id: string;
  title: string;
  category: "Navigation" | "Observation" | "Diagnostics" | "Session";
  shortcut?: string;
  icon: React.ComponentType<{ className?: string }>;
  perform: () => void;
}

export const CommandPalette: React.FC = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setGlobeVisible,
    setActiveMode,
    setSelectedLocation,
    resetSession,
    setDiagnosticsOpen,
    setCapabilitiesModalOpen,
    setAuditViewerOpen,
  } = useWorkspaceStore();

  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: PaletteCommand[] = [
    {
      id: "view-globe",
      title: "Switch to 3D Planetary Globe View",
      category: "Navigation",
      shortcut: "G",
      icon: Globe2,
      perform: () => {
        setGlobeVisible(true);
        setActiveMode("EXPLORE");
      },
    },
    {
      id: "view-map",
      title: "Switch to 2D Geospatial Basemap View",
      category: "Navigation",
      shortcut: "M",
      icon: Map,
      perform: () => {
        setGlobeVisible(false);
        setActiveMode("EXPLORE");
      },
    },
    {
      id: "load-observation",
      title: "Load Remote Sensing Observation (.tif, .png, .jpg)",
      category: "Observation",
      shortcut: "I",
      icon: Upload,
      perform: () => {
        const input = document.getElementById("file-upload-input");
        if (input) input.click();
      },
    },
    {
      id: "ask-question",
      title: "Focus Query Composer (Natural Language Command)",
      category: "Observation",
      shortcut: "Q",
      icon: MessageSquareCode,
      perform: () => {
        const queryBox = document.getElementById("query-composer-textarea");
        if (queryBox) {
          queryBox.focus();
          queryBox.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      },
    },
    {
      id: "reset-study-point",
      title: "Center Study Region on India (Default Coordinates)",
      category: "Navigation",
      icon: Crosshair,
      perform: () => {
        setSelectedLocation({
          latitude: 20.5937,
          longitude: 78.9629,
          label: "INDIA · DEFAULT STUDY REGION",
        });
      },
    },
    {
      id: "view-audit",
      title: "Open Session Audit Log & Execution Trace",
      category: "Diagnostics",
      icon: FileSpreadsheet,
      perform: () => setAuditViewerOpen(true),
    },
    {
      id: "open-capabilities",
      title: "View Browser Runtime Capabilities & Sensor Detection",
      category: "Diagnostics",
      icon: ShieldCheck,
      perform: () => setCapabilitiesModalOpen(true),
    },
    {
      id: "open-diagnostics",
      title: "Open Developer Hardware Diagnostics Panel",
      category: "Diagnostics",
      shortcut: "Ctrl+Shift+D",
      icon: Cpu,
      perform: () => setDiagnosticsOpen(true),
    },
    {
      id: "reset-session",
      title: "Reset Session (Clear Assets, Queries, and Restore Defaults)",
      category: "Session",
      icon: RotateCcw,
      perform: () => resetSession(),
    },
  ];

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearch("");
    }
  }, [commandPaletteOpen]);

  // Global keybindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing inside an input or textarea (unless triggering Cmd+K)
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        const { diagnosticsOpen, setDiagnosticsOpen } = useWorkspaceStore.getState();
        setDiagnosticsOpen(!diagnosticsOpen);
        return;
      }

      if (!commandPaletteOpen) {
        if (!isInput) {
          if (e.key === "q" || e.key === "Q") {
            e.preventDefault();
            const queryBox = document.getElementById("query-composer-textarea");
            if (queryBox) queryBox.focus();
          } else if (e.key === "i" || e.key === "I") {
            e.preventDefault();
            const input = document.getElementById("file-upload-input");
            if (input) input.click();
          } else if (e.key === "m" || e.key === "M") {
            e.preventDefault();
            setGlobeVisible(false);
          } else if (e.key === "g" || e.key === "G") {
            e.preventDefault();
            setGlobeVisible(true);
          }
        }
        return;
      }

      // Inside Palette
      if (e.key === "Escape") {
        e.preventDefault();
        setCommandPaletteOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].perform();
          setCommandPaletteOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, filtered, selectedIndex, setCommandPaletteOpen, setGlobeVisible]);

  if (!commandPaletteOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mission Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-void-0/80 backdrop-blur-sm"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="relative w-full max-w-xl rounded-sm bg-panel-strong border border-cyan-accent/30 shadow-2xl overflow-hidden font-mono text-space-white animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-panel-hairline bg-void-1/60">
          <Search className="w-4 h-4 text-cyan-accent" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or search action (e.g. 'globe', 'ingest', 'diagnostics')..."
            className="w-full bg-transparent text-xs text-space-white placeholder-space-faint outline-none font-mono"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-void-0 text-space-muted rounded border border-panel-hairline">
            ESC to close
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-space-faint">
              No matching mission commands found.
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = cmd.icon;

              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    cmd.perform();
                    setCommandPaletteOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 rounded-sm text-left text-xs transition-colors",
                    isSelected
                      ? "bg-cyan-soft/40 text-cyan-accent border border-cyan-accent/40"
                      : "text-space-muted hover:bg-void-2/60 hover:text-space-white border border-transparent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-cyan-accent shrink-0" />
                    <span className="truncate">{cmd.title}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] uppercase text-space-faint tracking-wider">
                      {cmd.category}
                    </span>
                    {cmd.shortcut && (
                      <kbd className="px-1.5 py-0.5 text-[9px] bg-void-0/90 text-space-white rounded border border-panel-hairline font-mono">
                        {cmd.shortcut}
                      </kbd>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-3 py-1.5 border-t border-panel-hairline bg-void-0/60 text-[10px] text-space-faint">
          <span>Navigate: ↑ ↓ · Select: ↵</span>
          <span>SIH26167 · PARAM BRAHMAND</span>
        </div>
      </div>
    </div>
  );
};
