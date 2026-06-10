import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import { Wand2, Undo2, Redo2, TerminalSquare, X } from "lucide-react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
}

export function CodeEditor({ code, onChange }: CodeEditorProps) {
  const editorRef = useRef<any>(null);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [logs, setLogs] = useState<
    { type: "log" | "error" | "warn" | "info"; message: string }[]
  >([{ type: "info", message: "Ready to build." }]);

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
            title="Toggle Console"
            className={`flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest transition-colors ${isConsoleOpen ? "text-orange-400" : "text-zinc-500 hover:text-orange-400"}`}
          >
            <TerminalSquare size={12} />
            Console
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
          onMount={(editor) => (editorRef.current = editor)}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: "JetBrains Mono, monospace",
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            renderLineHighlight: "all",
          }}
        />

        {/* Console Drawer */}
        {isConsoleOpen && (
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#0a0a0a] border-t border-zinc-800 flex flex-col shadow-[0_-10px_20px_rgba(0,0,0,0.5)] z-10 animate-in slide-in-from-bottom-2">
            <div className="h-6 flex items-center justify-between px-3 border-b border-zinc-800 bg-[#0f0f0f]">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                Runtime Console
              </span>
              <button
                onClick={() => setIsConsoleOpen(false)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 font-mono text-[11px] space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2">
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
                          : "text-zinc-300"
                    } px-1 rounded flex-1`}
                  >
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
