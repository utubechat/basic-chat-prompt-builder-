import { X, Github, GitBranch, GitCommit, Check, Key } from "lucide-react";
import React, { useState } from "react";
import { Octokit } from "@octokit/rest";

interface GitHubModalProps {
  onClose: () => void;
  code: string;
  githubToken?: string;
  onSaveToken: (token: string) => void;
}

export function GitHubModal({ onClose, code, githubToken, onSaveToken }: GitHubModalProps) {
  const [repo, setRepo] = useState("");
  const [branch, setBranch] = useState("main");
  const [commitMsg, setCommitMsg] = useState("Update from BuildStudio");
  const [token, setToken] = useState(githubToken || "");
  const [saveToken, setSaveToken] = useState(!githubToken);
  const [isPushing, setIsPushing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePush = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repo || !token) return;

    setIsPushing(true);
    setError(null);

    let formattedRepo = repo.trim();
    if (formattedRepo.includes("github.com/")) {
      formattedRepo = formattedRepo.split("github.com/")[1];
    }
    // Remove .git if exists
    if (formattedRepo.endsWith(".git")) {
      formattedRepo = formattedRepo.slice(0, -4);
    }

    const repoParts = formattedRepo.split("/");
    const owner = repoParts[0];
    const repoName = repoParts[1];

    if (!owner || !repoName) {
      setError("Repository must be in format username/repository");
      setIsPushing(false);
      return;
    }

    try {
      const octokit = new Octokit({ auth: token });
      
      const filesToPush = [
        {
          path: "src/App.tsx",
          content: code
        },
        {
          path: "package.json",
          content: JSON.stringify({
            name: "buildstudio-export",
            private: true,
            version: "0.0.0",
            type: "module",
            scripts: {
              dev: "vite",
              build: "tsc && vite build",
              preview: "vite preview"
            },
            dependencies: {
              react: "^18.2.0",
              "react-dom": "^18.2.0",
              "lucide-react": "^0.263.1",
              "framer-motion": "^10.16.4",
              tailwindcss: "^3.3.3"
            },
            devDependencies: {
              "@types/react": "^18.2.15",
              "@types/react-dom": "^18.2.7",
              "@vitejs/plugin-react": "^4.0.3",
              autoprefixer: "^10.4.14",
              postcss: "^8.4.27",
              vite: "^4.4.5"
            }
          }, null, 2)
        },
        {
          path: "index.html",
          content: `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>BuildStudio Export</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.tsx"></script>\n  </body>\n</html>`
        },
        {
          path: "src/main.tsx",
          content: `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App.tsx'\nimport './index.css'\n\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n)`
        },
        {
          path: "src/index.css",
          content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`
        },
        {
          path: "tailwind.config.js",
          content: `/** @type {import('tailwindcss').Config} */\nexport default {\n  content: [\n    "./index.html",\n    "./src/**/*.{js,ts,jsx,tsx}",\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}`
        },
        {
          path: "postcss.config.js",
          content: `export default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n}`
        },
        {
          path: "vite.config.ts",
          content: `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n})`
        }
      ];

      // We'll create or update each file. While tree API is better for multiple files, 
      // simple loop handles both empty repos and existing repos more gracefully without 
      // needing to resolve existing head commit tree references.
      for (const file of filesToPush) {
        let sha: string | undefined;
        try {
          const { data } = await octokit.repos.getContent({
            owner,
            repo: repoName,
            path: file.path,
            ref: branch,
          });

          if (!Array.isArray(data) && data.type === "file") {
            sha = data.sha;
          }
        } catch (err: any) {
          // 404 means file doesn't exist yet, which is fine
        }

        await octokit.repos.createOrUpdateFileContents({
          owner,
          repo: repoName,
          path: file.path,
          message: `${commitMsg} (${file.path})`,
          content: btoa(unescape(encodeURIComponent(file.content))),
          branch,
          sha,
        });
      }

      if (saveToken && token !== githubToken) {
        onSaveToken(token);
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to push to GitHub");
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200">
      <div className="bg-[#0f0f0f] border border-zinc-800 rounded-xl w-full max-w-sm shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-[#0a0a0a]">
          <h2 className="text-sm font-semibold tracking-widest uppercase flex items-center gap-2 text-zinc-300">
            <Github size={16} /> Deploy to GitHub
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
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
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs text-center">
                  {error}
                </div>
              )}
              
              {!githubToken && (
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1 block">
                    Personal Access Token
                  </label>
                  <div className="relative">
                    <div className="absolute left-2.5 top-2.5 text-zinc-500">
                      <Key size={14} />
                    </div>
                    <input
                      type="password"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                      required
                      className="w-full bg-[#050505] border border-zinc-800 rounded py-2 pl-8 pr-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors font-mono"
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="save-token" 
                      checked={saveToken} 
                      onChange={(e) => setSaveToken(e.target.checked)}
                      className="accent-orange-500"
                    />
                    <label htmlFor="save-token" className="text-xs text-zinc-400 cursor-pointer">
                      Save token to workspace secrets
                    </label>
                  </div>
                </div>
              )}

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
                <p className="text-[10px] text-zinc-500 mt-1">Repo must already exist.</p>
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
                disabled={isPushing || !repo || !token}
                className="mt-4 text-white w-full py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                {isPushing ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Github size={14} /> Push code
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
