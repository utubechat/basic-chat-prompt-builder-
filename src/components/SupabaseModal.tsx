import React, { useState } from "react";
import { X, Database, Check, Loader2 } from "lucide-react";

interface SupabaseModalProps {
  onClose: () => void;
  onConnect: (url: string, key: string) => void;
}

export function SupabaseModal({ onClose, onConnect }: SupabaseModalProps) {
  const [url, setUrl] = useState("");
  const [key, setKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !key) return;

    setIsConnecting(true);
    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false);
      setSuccess(true);
      setTimeout(() => {
        onConnect(url, key);
        onClose();
      }, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200">
      <div className="bg-[#0f0f0f] border border-zinc-800 rounded-xl w-full max-w-sm shadow-2xl flex flex-col overflow-hidden m-4">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-[#0a0a0a]">
          <h2 className="text-sm font-semibold tracking-widest uppercase flex items-center gap-2 text-zinc-300">
            <Database size={16} style={{ color: "#3ECF8E" }} /> Connect Supabase
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {success ? (
            <div className="flex flex-col items-center justify-center py-6 text-[#3ECF8E] space-y-3 animate-in zoom-in duration-300">
              <div className="w-12 h-12 rounded-full bg-[#3ECF8E]/10 flex items-center justify-center border border-[#3ECF8E]/20">
                <Check size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-center text-[#3ECF8E]">
                Connected to Supabase
              </span>
            </div>
          ) : (
            <>
              <p className="text-xs text-zinc-400 mb-2 leading-relaxed">
                Connect your Supabase project to enable Database, Auth, and Edge Functions in your application.
              </p>
              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1 block">
                  Project URL
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://xyzcompany.supabase.co"
                  autoFocus
                  required
                  className="w-full bg-[#050505] border border-zinc-800 rounded py-2 px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1 block">
                  Anon / Public Key
                </label>
                <input
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  required
                  className="w-full bg-[#050505] border border-zinc-800 rounded py-2 px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isConnecting || !url || !key}
                className="mt-4 text-black w-full py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 bg-[#3ECF8E] hover:bg-[#32B87D]"
              >
                {isConnecting ? (
                  <Loader2 size={14} className="animate-spin text-black" />
                ) : (
                  <>
                    <Database size={14} /> Connect
                  </>
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
