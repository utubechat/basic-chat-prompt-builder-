import { X, Globe, Check, LibraryBig } from "lucide-react";
import { useState } from "react";

interface GalleryModalProps {
  onClose: () => void;
  onDeploy: (details: {
    title: string;
    description: string;
    isPublic: boolean;
  }) => void;
}

export function GalleryModal({ onClose, onDeploy }: GalleryModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isDeploying, setIsDeploying] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setIsDeploying(true);
    // Simulate API push
    setTimeout(() => {
      setIsDeploying(false);
      setSuccess(true);
      setTimeout(() => {
        onDeploy({ title, description, isPublic });
        onClose();
      }, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200">
      <div className="bg-[#0f0f0f] border border-zinc-800 rounded-xl w-full max-w-sm shadow-2xl flex flex-col overflow-hidden m-4">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-[#0a0a0a]">
          <h2 className="text-sm font-semibold tracking-widest uppercase flex items-center gap-2 text-zinc-300">
            <LibraryBig size={16} style={{ color: "var(--color-primary)" }} />{" "}
            Deploy to Gallery
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
            <div className="flex flex-col items-center justify-center py-6 text-green-500 space-y-3 animate-in zoom-in duration-300">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <Check size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-center">
                Published to Gallery
              </span>
            </div>
          ) : (
            <>
              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1 block">
                  App Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My Awesome App"
                  autoFocus
                  required
                  className="w-full bg-[#050505] border border-zinc-800 rounded py-2 px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1 block">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What does your app do?"
                  rows={3}
                  className="w-full bg-[#050505] border border-zinc-800 rounded py-2 px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors font-mono resize-none"
                />
              </div>

              <div
                className="flex items-center gap-2 mt-2 cursor-pointer"
                onClick={() => setIsPublic(!isPublic)}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isPublic
                      ? "bg-transparent"
                      : "bg-transparent border-zinc-700"
                  }`}
                  style={
                    isPublic
                      ? {
                          backgroundColor: "var(--color-primary)",
                          borderColor: "var(--color-primary)",
                        }
                      : {}
                  }
                >
                  {isPublic && <Check size={12} className="text-black" />}
                </div>
                <span className="text-[11px] text-zinc-400 font-bold tracking-wide flex items-center gap-1">
                  <Globe size={12} /> Make Public in Gallery
                </span>
              </div>

              <button
                type="submit"
                disabled={isDeploying || !title}
                className="mt-4 text-white w-full py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                {isDeploying ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LibraryBig size={14} /> Publish App
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
