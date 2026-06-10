import { X, Palette, Shield } from "lucide-react";
import { useState } from "react";

interface SettingsModalProps {
  onClose: () => void;
  accentColor: string;
  onColorChange: (color: string) => void;
}

const COLORS = [
  { name: "Orange (Default)", value: "#ed3915" },
  { name: "Amber", value: "#fbbf24" },
  { name: "Red", value: "#ef4444" },
  { name: "Pink", value: "#ec4899" },
  { name: "Purple", value: "#a855f7" },
  { name: "Cyan", value: "#06b6d4" },
];

export function SettingsModal({
  onClose,
  accentColor,
  onColorChange,
}: SettingsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200">
      <div className="bg-[#0f0f0f] border border-zinc-800 rounded-xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-[#0a0a0a]">
          <h2 className="text-sm font-semibold tracking-widest uppercase flex items-center gap-2 text-zinc-300">
            <Palette size={16} /> Theme Settings
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-[11px] font-bold text-zinc-500 tracking-widest uppercase mb-3 text-left">
              Accent Color
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => onColorChange(color.value)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${accentColor === color.value ? "bg-zinc-800/50 border-zinc-500" : "bg-transparent border-zinc-800 hover:border-zinc-700"}`}
                >
                  <div
                    className="w-6 h-6 rounded-full shadow-inner"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={onClose}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
