import { RefreshCw, ExternalLink, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

export function Preview() {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="w-full h-full flex items-center justify-center p-8 bg-[#111]">
      <div
        className={cn(
          "bg-[#0a0a0a]/50 rounded-2xl border border-orange-500/20 overflow-hidden flex flex-col shadow-2xl shadow-orange-900/10 transition-all duration-300 ease-in-out relative",
          device === "desktop"
            ? "w-full h-full max-h-full"
            : "w-[375px] h-[812px]",
        )}
      >
        <div className="p-4 border-b border-orange-500/10 flex justify-between items-center bg-[#0a0a0a]">
          <div className="flex gap-1.5 min-w-[60px]">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40 hover:bg-red-500/60 transition-colors"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40 hover:bg-yellow-500/60 transition-colors"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40 hover:bg-green-500/60 transition-colors"></div>
          </div>

          <div className="flex bg-[#0f0f0f] border border-orange-900/20 rounded-md px-3 py-1 flex-1 max-w-[240px] justify-between items-center mx-4 gap-2">
            <span className="text-[10px] text-orange-500/60 font-mono tracking-widest uppercase truncate">
              localhost:3000
            </span>
            <button className="text-orange-500/60 hover:text-orange-500 transition-colors">
              <RefreshCw size={12} />
            </button>
          </div>

          <div className="flex gap-1 justify-end min-w-[60px]">
            <button
              onClick={() => setDevice("desktop")}
              className={cn(
                "p-1.5 rounded transition-colors",
                device === "desktop"
                  ? "bg-orange-600/10 text-orange-500"
                  : "text-zinc-600 hover:text-zinc-400",
              )}
            >
              <Monitor size={14} />
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={cn(
                "p-1.5 rounded transition-colors",
                device === "mobile"
                  ? "bg-orange-600/10 text-orange-500"
                  : "text-zinc-600 hover:text-zinc-400",
              )}
            >
              <Smartphone size={14} />
            </button>
            <button className="p-1.5 rounded text-zinc-600 hover:text-zinc-400 ml-1 transition-colors">
              <ExternalLink size={14} />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[#050505] relative overflow-hidden">
          {/* Simulated Preview Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-8 h-8 border-2 border-zinc-800 border-t-orange-500 rounded-full animate-spin mx-auto" />
              <p className="text-[10px] text-zinc-500 tracking-widest uppercase font-mono">
                Building preview...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
