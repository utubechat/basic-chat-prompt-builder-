import Editor from "@monaco-editor/react";
import React, { useRef, useState, useEffect } from "react";
import { Wand2, Undo2, Redo2, TerminalSquare, X } from "lucide-react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
}

export function CodeEditor({ code, onChange }: CodeEditorProps) {
  const editorRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [logs, setLogs] = useState<
    { type: "log" | "error" | "warn" | "info"; message: string }[]
  >([
    { type: "info", message: "BuildStudio Terminal v1.0.0. Ready." }
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isConsoleOpen]);

  const handleCommandSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && command.trim()) {
      const cmd = command.trim();
      setLogs((prev) => [...prev, { type: "log", message: `$ ${cmd}` }]);
      
      setTimeout(() => {
        if (cmd.startsWith("npm install") || cmd.startsWith("npm i")) {
          setLogs((prev) => [...prev, { type: "info", message: "Installing dependencies..." }]);
          setTimeout(() => {
            setLogs((prev) => [...prev, { type: "log", message: "added 1 package, and audited 2 packages in 1s\nfound 0 vulnerabilities" }]);
          }, 1000);
        } else if (cmd.startsWith("npm run build")) {
          setLogs((prev) => [...prev, { type: "info", message: "> build\n> vite build" }]);
          setTimeout(() => {
            setLogs((prev) => [...prev, { type: "log", message: "dist/index.html   0.45 kB\ndist/assets/index.js   120.45 kB\n✓ built in 1.2s" }]);
          }, 1500);
        } else if (cmd === "clear") {
          setLogs([]);
        } else {
          setLogs((prev) => [...prev, { type: "error", message: `command not found: ${cmd.split(" ")[0]}` }]);
        }
      }, 300);
      
      setCommand("");
    }
  };

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument").run();
    }
  };

  const handleUndo = () => {
    if (editorRef.current) {
      editorRef.current.trigger("keyboard", "undo", null);
    }
  };

  const handleRedo = () => {
    if (editorRef.current) {
      editorRef.current.trigger("keyboard", "redo", null);
    }
  };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col relative">
      <div className="h-8 bg-[#0a0a0a] border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex gap-4">
          <button className="text-[11px] font-mono text-orange-400 font-medium pt-1 pb-1">
            App.tsx
          </button>
          <button className="text-[11px] font-mono text-zinc-600 hover:text-zinc-400 pt-1 pb-1">
            index.css
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleUndo}
            title="Undo"
            className="text-zinc-500 hover:text-orange-400 transition-colors"
          >
            <Undo2 size={13} />
          </button>
          <button
            onClick={handleRedo}
            title="Redo"
            className="text-zinc-500 hover:text-orange-400 transition-colors"
          >
            <Redo2 size={13} />
          </button>
          <div className="w-[1px] h-3 bg-zinc-800 mx-1"></div>
          <button
            onClick={() => setIsConsoleOpen(!isConsoleOpen)}
            title="Toggle Terminal"
            className={`flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest transition-colors ${isConsoleOpen ? "text-orange-400" : "text-zinc-500 hover:text-orange-400"}`}
          >
            <TerminalSquare size={12} />
            Terminal
          </button>
          <button
            onClick={handleFormat}
            title="Format Code"
            className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-zinc-500 hover:text-orange-400 transition-colors"
          >
            <Wand2 size={12} />
            Format
          </button>
        </div>
      </div>
      <div className="flex-1 bg-[#050505] overflow-hidden p-2 flex flex-col relative">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          theme="vs-dark"
          value={code}
          onChange={onChange}
          onMount={(editor, monaco) => {
            editorRef.current = editor;

            monaco.languages.registerInlineCompletionsProvider("typescript", {
              provideInlineCompletions: async (model: any, position: any) => {
                const textUntilPosition = model.getValueInRange({
                  startLineNumber: 1,
                  startColumn: 1,
                  endLineNumber: position.lineNumber,
                  endColumn: position.column,
                });

                const lines = textUntilPosition.split("\n");
                const lastLine = lines[lines.length - 1].trim();

                let suggestion = "";

                // Simulated AI completions
                if (lastLine.endsWith("useState")) {
                  suggestion = "();";
                } else if (lastLine.endsWith("useEffect(")) {
                  suggestion = "() => {\n    \n  }, []);";
                } else if (lastLine.endsWith("export default function")) {
                  suggestion = " Component() {\n  return (\n    <div>\n      \n    </div>\n  );\n}";
                } else if (lastLine.endsWith("return (")) {
                  suggestion = "\n    <div>\n      \n    </div>\n  ";
                } else if (lastLine.endsWith("console.log(")) {
                  suggestion = "data);";
                } else if (lastLine.endsWith("className=")) {
                  suggestion = '"flex items-center justify-center p-4"';
                }

                if (suggestion) {
                  return {
                    items: [
                      {
                        insertText: suggestion,
                        range: new monaco.Range(
                          position.lineNumber,
                          position.column,
                          position.lineNumber,
                          position.column
                        ),
                      },
                    ],
                  };
                }

                return { items: [] };
              },
              freeInlineCompletions() {},
            });
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: "JetBrains Mono, monospace",
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            renderLineHighlight: "all",
            inlineSuggest: { enabled: true },
          }}
        />

        {/* Console Drawer */}
        {isConsoleOpen && (
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#0a0a0a] border-t border-zinc-800 flex flex-col shadow-[0_-10px_20px_rgba(0,0,0,0.5)] z-10 animate-in slide-in-from-bottom-2">
            <div className="h-6 flex items-center justify-between px-3 border-b border-zinc-800 bg-[#0f0f0f]">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                Terminal
              </span>
              <button
                onClick={() => setIsConsoleOpen(false)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                title="Close Terminal"
              >
                <X size={12} />
              </button>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 font-mono text-[11px] space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2 whitespace-pre-wrap">
                  <span
                    className={`${
                      log.type === "error"
                        ? "text-red-500"
                        : log.type === "warn"
                          ? "text-yellow-500"
                          : log.type === "info"
                            ? "text-blue-400"
                            : "text-zinc-500"
                    }`}
                  >
                    [
                    {new Date().toLocaleTimeString([], {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                    ]
                  </span>
                  <span
                    className={`${
                      log.type === "error"
                        ? "text-red-400 bg-red-500/10"
                        : log.type === "warn"
                          ? "text-yellow-400 bg-yellow-500/10"
                          : log.message.startsWith("$")
                            ? "text-orange-400 font-bold"
                            : "text-zinc-300"
                    } px-1 rounded flex-1 break-all`}
                  >
                    {log.message}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 mt-2 px-1">
                <span className="text-orange-500 font-bold">$</span>
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleCommandSubmit}
                  className="flex-1 bg-transparent outline-none text-zinc-300 caret-orange-500"
                  placeholder="Type an npm command..."
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
