import { X, Shield, Lock, Terminal } from "lucide-react";
import { useState } from "react";

interface LoginModalProps {
  onClose: () => void;
  onLogin: (email: string) => void;
}

export function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState("nexusos@commandnexus.net");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "nexusos@commandnexus.net" && password) {
      onLogin(email);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200">
      <div className="bg-[#0f0f0f] border border-zinc-800 rounded-xl w-full max-w-sm shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-[#0a0a0a]">
          <h2 className="text-sm font-semibold tracking-widest uppercase flex items-center gap-2 text-zinc-300">
            <Shield size={16} className="text-orange-500" /> Admin Access
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleLogin} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center mb-2">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-3">
              <Terminal size={24} />
            </div>
            <h3 className="text-xs font-mono text-zinc-400">COMMAND_NEXUS</h3>
          </div>

          {error && (
            <div className="text-[10px] text-red-500 font-mono text-center uppercase tracking-widest bg-red-500/10 py-1 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#050505] border border-zinc-800 rounded p-2 text-sm text-zinc-300 focus:outline-none focus:border-orange-500 transition-colors font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full bg-[#050505] border border-zinc-800 rounded p-2 text-sm text-zinc-300 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-orange-600 hover:bg-orange-500 text-black w-full py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
          >
            <Lock size={14} /> Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
