import { Plus, Send, Sparkles, Command } from "lucide-react";
import { useState } from "react";
import { Message } from "../types";
import { cn } from "../lib/utils";

interface SidebarProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const SUGGESTIONS = [
  "Add Supabase Auth",
  "Generate a Dashboard UI",
  "Fix styling issues",
  "Implement Dark Mode",
];

export function Sidebar({ messages, onSendMessage }: SidebarProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <aside className="w-80 h-full bg-[#0f0f0f] border-r border-orange-900/30 flex flex-col shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-orange-900/20 flex flex-col gap-4 bg-zinc-950/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center font-bold text-black border border-black/20 shadow-sm"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <Command size={18} />
            </div>
            <div>
              <h1
                className="text-sm font-semibold tracking-widest uppercase"
                style={{ color: "var(--color-primary)" }}
              >
                Ollama Agent
              </h1>
              <span className="text-[10px] text-zinc-500 tracking-widest uppercase">
                Workspace
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-black/30 border border-white/5 px-2 py-1 rounded shadow-inner">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse shadow-sm"
              style={{ backgroundColor: "var(--color-primary)" }}
            ></div>
            <span
              className="text-[9px] uppercase tracking-widest font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              Godmode
            </span>
          </div>
        </div>

        {/* Model Selector Dropdown */}
        <select
          className="w-full bg-[#050505] border border-white/10 text-[11px] font-mono rounded px-2 py-2 outline-none transition-colors uppercase tracking-widest cursor-pointer hover:bg-[#0a0a0a]"
          style={{ color: "var(--color-primary)" }}
        >
          <option>🔥 llama3-lexi (Godmode)</option>
          <option>mixtral:8x7b</option>
          <option>llama3.1:8b</option>
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-3">
            <div className="w-12 h-12 rounded-full bg-dark-surface flex items-center justify-center">
              <Sparkles className="text-primary/70" size={20} />
            </div>
            <p className="text-sm">What do you want to build?</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex flex-col gap-1">
              <span
                className={cn(
                  "text-[10px] uppercase tracking-widest ml-2",
                  msg.role === "user" ? "text-gray-500" : "text-orange-500",
                )}
              >
                {msg.role === "user" ? "User" : "Assistant"}
              </span>
              <div
                className={cn(
                  "p-3 rounded-lg text-sm transition-all duration-300",
                  msg.role === "user"
                    ? "border border-white/10"
                    : "bg-zinc-800/50 border border-zinc-700/50 leading-relaxed",
                )}
                style={
                  msg.role === "user"
                    ? {
                        backgroundColor:
                          "color-mix(in srgb, var(--color-primary) 15%, transparent)",
                      }
                    : {}
                }
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-zinc-900/30">
        {/* Suggestions */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {SUGGESTIONS.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => onSendMessage(suggestion)}
              className="shrink-0 px-3 py-1.5 rounded-full bg-zinc-800/50 text-zinc-400 text-[10px] uppercase tracking-widest border border-zinc-700/50 hover:border-orange-500/50 hover:text-orange-500 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div className="relative bg-orange-600/10 border border-orange-600/40 rounded-xl flex flex-col focus-within:border-orange-500 transition-colors">
          <div className="flex px-4 pt-3 flex-wrap gap-2">
            <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-700/50 rounded-lg px-2 py-1.5">
              <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center">
                <Sparkles size={12} className="text-blue-400" />
              </div>
              <span className="text-xs text-zinc-300">
                ScreenShot Tool -202606...
              </span>
              <button className="text-zinc-500 hover:text-zinc-300 ml-1">
                <Plus size={14} className="rotate-45" />
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Refine your build..."
            className="w-full bg-transparent p-4 text-sm focus:outline-none placeholder-orange-900/60 resize-none h-20 text-gray-200"
          />

          <div className="flex justify-between items-center px-3 pb-3">
            <div className="flex gap-2 text-orange-500/70">
              <button
                title="Upload Image"
                className="p-1.5 hover:bg-orange-500/10 rounded transition-colors hover:text-orange-400"
              >
                <Plus size={16} />
              </button>
              <button
                title="Add Code"
                className="p-1.5 hover:bg-orange-500/10 rounded transition-colors hover:text-orange-400"
              >
                <Sparkles size={16} />
              </button>
            </div>

            <button
              onClick={handleSend}
              disabled={!input.trim()}
              style={{ backgroundColor: "var(--color-primary)" }}
              className="text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed uppercase"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
