import React, { useState } from "react";
import { X, Key, Plus, Trash2 } from "lucide-react";

interface Secret {
  key: string;
  value: string;
}

interface SecretsModalProps {
  onClose: () => void;
  secrets: Secret[];
  onSave: (secrets: Secret[]) => void;
}

export function SecretsModal({ onClose, secrets: initialSecrets, onSave }: SecretsModalProps) {
  const [secrets, setSecrets] = useState<Secret[]>(initialSecrets.length > 0 ? initialSecrets : [{ key: "SUPABASE_URL", value: "" }]);

  const updateSecret = (index: number, field: "key" | "value", val: string) => {
    const newSecrets = [...secrets];
    newSecrets[index][field] = val;
    setSecrets(newSecrets);
  };

  const addSecret = () => {
    setSecrets([...secrets, { key: "", value: "" }]);
  };

  const removeSecret = (index: number) => {
    setSecrets(secrets.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const validSecrets = secrets.filter(s => s.key.trim() !== "");
    onSave(validSecrets);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200">
      <div className="bg-[#0f0f0f] border border-zinc-800 rounded-xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden m-4">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-[#0a0a0a]">
          <h2 className="text-sm font-semibold tracking-widest uppercase flex items-center gap-2 text-zinc-300">
            <Key size={16} /> Manage Secrets
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <p className="text-xs text-zinc-500 mb-2">
            Add environment variables and API keys here. They will be available in your Next/React build process.
          </p>
          
          <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-3">
            {secrets.map((secret, i) => (
              <div key={i} className="flex gap-2 items-start">
                <input
                  type="text"
                  placeholder="KEY_NAME"
                  value={secret.key}
                  onChange={(e) => updateSecret(i, "key", e.target.value)}
                  className="w-1/3 bg-[#050505] border border-zinc-800 rounded py-2 px-3 text-xs font-mono text-zinc-300 focus:outline-none focus:border-zinc-600 uppercase"
                />
                <input
                  type="password"
                  placeholder="Value"
                  value={secret.value}
                  onChange={(e) => updateSecret(i, "value", e.target.value)}
                  className="flex-1 bg-[#050505] border border-zinc-800 rounded py-2 px-3 text-xs font-mono text-zinc-300 focus:outline-none focus:border-zinc-600"
                />
                <button
                  onClick={() => removeSecret(i)}
                  className="p-2 text-zinc-500 hover:text-red-400 transition-colors rounded hover:bg-red-400/10"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addSecret}
            className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-zinc-400 hover:text-white transition-colors mt-2"
          >
            <Plus size={12} /> Add Variable
          </button>
        </div>

        <div className="p-4 border-t border-zinc-800 bg-[#0a0a0a] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded text-xs font-bold uppercase tracking-widest text-white transition-colors"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Save Secrets
          </button>
        </div>
      </div>
    </div>
  );
}
