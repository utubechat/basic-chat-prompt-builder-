import React, { useState, useEffect } from "react";
import { Message } from "./types";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { CodeEditor } from "./components/CodeEditor";
import { Preview } from "./components/Preview";
import { FloatingToolbar } from "./components/FloatingToolbar";
import { SettingsModal } from "./components/SettingsModal";
import { LoginModal } from "./components/LoginModal";
import { GitHubModal } from "./components/GitHubModal";
import { TemplatesModal } from "./components/TemplatesModal";
import { GalleryModal } from "./components/GalleryModal";
import { ApiTester } from "./components/ApiTester";

const INITIAL_CODE = `export default function App() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-[#121212]">Hello World</h1>
        <p className="text-gray-500 mb-8">Ready to build something amazing?</p>
        <button className="bg-[#ed3915] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#ff5c3b] transition-colors w-full">
          Get Started
        </button>
      </div>
    </div>
  );
}`;

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "split" | "code" | "preview" | "api"
  >("split");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("app-theme");
      return saved ? saved === "dark" : true;
    }
    return true;
  });

  const [accentColor, setAccentColor] = useState("#ed3915");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isGitHubOpen, setIsGitHubOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<string | null>(
    "nexusos@commandnexus.net",
  );

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I am your AI Builder. What would you like to create today?",
      timestamp: Date.now(),
    },
  ]);
  const [code, setCode] = useState(INITIAL_CODE);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("app-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("app-theme", "light");
    }
  }, [isDarkMode]);

  const handleSendMessage = (content: string) => {
    const newMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMsg]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Got it! Integrating your request and modifying the code below. Building preview...",
          timestamp: Date.now() + 1,
        },
      ]);
    }, 800);
  };

  return (
    <div
      className="flex w-full h-full bg-[#0a0a0a] text-gray-200"
      style={{ "--color-primary": accentColor } as React.CSSProperties}
    >
      <Sidebar messages={messages} onSendMessage={handleSendMessage} />

      <main className="flex-1 flex flex-col min-w-0 relative">
        <TopBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
          onSettingsClick={() => setIsSettingsOpen(true)}
          onGitHubClick={() => setIsGitHubOpen(true)}
          onTemplatesClick={() => setIsTemplatesOpen(true)}
          onGalleryClick={() => setIsGalleryOpen(true)}
          adminUser={adminUser}
          onLoginClick={() => setIsLoginOpen(true)}
          onLogout={() => setAdminUser(null)}
        />

        {/* Workspace Grid */}
        <div
          className={`flex-1 min-h-0 bg-[#050505] ${activeTab === "split" ? "grid grid-cols-2" : "flex flex-col"}`}
        >
          {(activeTab === "split" || activeTab === "code") && (
            <div
              className={`relative min-h-0 flex flex-col ${activeTab === "split" ? "border-r border-zinc-800" : "flex-1"}`}
            >
              <CodeEditor code={code} onChange={(v) => setCode(v || "")} />
            </div>
          )}

          {(activeTab === "split" || activeTab === "preview") && (
            <div
              className={`relative min-h-0 flex flex-col bg-[#111] ${activeTab === "preview" ? "flex-1" : ""}`}
            >
              <Preview />
            </div>
          )}
          {activeTab === "api" && (
            <div className="relative min-h-0 flex flex-col flex-1">
              <ApiTester />
            </div>
          )}
        </div>

        {/* Footer Info */}
        <footer className="h-8 bg-[#0a0a0a] border-t border-zinc-800 flex items-center px-4 text-[10px] text-zinc-600 font-mono shrink-0">
          <div className="flex gap-4">
            <span>UTF-8</span>
            <span>Line 1, Col 1</span>
            <span className="text-orange-700 uppercase">Main Branch</span>
          </div>
          <div className="ml-auto flex items-center">
            <span className="animate-pulse inline-block w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
            SYNCING FILES...
          </div>
        </footer>

        <FloatingToolbar />
      </main>

      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          accentColor={accentColor}
          onColorChange={setAccentColor}
        />
      )}

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onLogin={(email) => {
            setAdminUser(email);
            setIsLoginOpen(false);
          }}
        />
      )}

      {isGitHubOpen && (
        <GitHubModal
          onClose={() => setIsGitHubOpen(false)}
          onPush={(repo, branch, commitMsg) => {
            console.log(
              `Pushed to ${repo} branch ${branch} with msg: ${commitMsg}`,
            );
          }}
        />
      )}

      {isTemplatesOpen && (
        <TemplatesModal
          onClose={() => setIsTemplatesOpen(false)}
          onSelect={(newCode) => setCode(newCode)}
        />
      )}

      {isGalleryOpen && (
        <GalleryModal
          onClose={() => setIsGalleryOpen(false)}
          onDeploy={(details) => {
            console.log("Deployed to gallery:", details);
          }}
        />
      )}
    </div>
  );
}
