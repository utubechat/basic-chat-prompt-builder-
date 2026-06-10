import { X, Github, GitBranch, GitCommit, Check } from "lucide-react";
import React, { useState } from "react";

interface GitHubModalProps {
  onClose: () => void;
  onPush: (repo: string, branch: string, commitMsg: string) => void;
}

export function GitHubModal({ onClose, onPush }: GitHubModalProps) {
  const [repo, setRepo] = useState("");
  const [branch, setBranch] = useState("main");
  const [commitMsg, setCommitMsg] = useState("Update from BuildStudio");
  const [isPushing, setIsPushing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repo) return;

    setIsPushing(true);
    // Simulate API push
    setTimeout(() => {
      setIsPushing(false);
      setSuccess(true);
      setTimeout(() => {
        onPush(repo, branch, commitMsg);
        onClose();
      }, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200">
      <div className="bg-[#0f0f0f] border border-zinc-800 rounded-xl w-full max-w-sm shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-[#0a0a0a]">
          <h2 className="text-sm font-semibold tracking-widest uppercase flex items-center gap-2 text-zinc-300">
            <Github size={16} style={{ color: "var(--color-primary)" }} />{" "}
            Deploy to GitHub
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handlePush} className="p-6 flex flex-col gap-4">
          {success ? (
            <div className="flex flex-col items-center justify-center py-6 text-green-500 space-y-3 animate-in zoom-in duration-300">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <Check size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">
                Successfully Pushed
              </span>
            </div>
          ) : (
            <>
              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1 block">
                  Repository
                </label>
                <div className="relative">
                  <div className="absolute left-2.5 top-2.5 text-zinc-500">
                    <Github size={14} />
                  </div>
                  <input
                    type="text"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                    placeholder="username/repository"
                    autoFocus
                    required
                    className="w-full bg-[#050505] border border-zinc-800 rounded py-2 pl-8 pr-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1 block">
                  Branch
                </label>
                <div className="relative">
                  <div className="absolute left-2.5 top-2.5 text-zinc-500">
                    <GitBranch size={14} />
                  </div>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                    className="w-full bg-[#050505] border border-zinc-800 rounded py-2 pl-8 pr-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1 block">
                  Commit Message
                </label>
                <div className="relative">
                  <div className="absolute left-2.5 top-2.5 text-zinc-500">
                    <GitCommit size={14} />
                  </div>
                  <input
                    type="text"
                    value={commitMsg}
                    onChange={(e) => setCommitMsg(e.target.value)}
                    required
                    className="w-full bg-[#050505] border border-zinc-800 rounded py-2 pl-8 pr-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPushing || !repo}
                className="mt-4 text-white w-full py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                {isPushing ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Github size={14} /> Push Commits
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
