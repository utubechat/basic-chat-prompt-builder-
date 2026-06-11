import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
import { LandingPage } from "./components/LandingPage";
import { SecretsModal } from "./components/SecretsModal";
import { SupabaseModal } from "./components/SupabaseModal";
import { PricingModal, PricingPlan } from "./components/PricingModal";

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
  const [isStarted, setIsStarted] = useState(false);
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
  const [isSecretsOpen, setIsSecretsOpen] = useState(false);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([
    {
      id: "1",
      name: "Community",
      price: "Free",
      description: "For hobbyists and learners.",
      features: ["Llama 3 8B model access", "Public galleries", "Community support"]
    },
    {
      id: "2",
      name: "Pro",
      price: "$15/mo",
      description: "For professional developers.",
      features: ["Godmode: Llama 3 Lexi & GPT-4o", "Private Supabase connections", "Unlimited projects", "Priority support"]
    }
  ]);
  const [secrets, setSecrets] = useState<{key: string, value: string}[]>([]);
  const [activeModel, setActiveModel] = useState("Default");
  const [adminUser, setAdminUser] = useState<string | null>(
    "nexusos@commandnexus.net",
  );

  // Model access logic
  const availableModels = adminUser 
    ? ["Default", "llama3-lexi", "mixtral", "gpt-4o"] 
    : ["Default", "llama3.1-8b"];

  const isSupabaseConnected = secrets.some(s => s.key === "SUPABASE_URL" && s.value.trim() !== "");

  const [messages, setMessages] = useState<Message[]>([]);
  const [code, setCode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCode = localStorage.getItem("buildstudio-code-save");
      if (savedCode) return savedCode;
    }
    return INITIAL_CODE;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("buildstudio-code-save", code);
    }, 1000);
    return () => clearTimeout(timer);
  }, [code]);

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

  const handleStart = (prompt: string) => {
    setMessages([
      {
        id: "sys_1",
        role: "assistant",
        content: `I'll help you build: "${prompt}". Setting up the workspace now...`,
        timestamp: Date.now(),
      }
    ]);
    setIsStarted(true);
  };

  if (!isStarted) {
    return (
      <div style={{ "--color-primary": accentColor } as React.CSSProperties}>
        <LandingPage onStart={handleStart} />
      </div>
    );
  }

  return (
    <div
      className="flex w-full h-screen bg-[#0a0a0a] text-gray-200 overflow-hidden"
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
          onSecretsClick={() => setIsSecretsOpen(true)}
          onSupabaseClick={() => setIsSupabaseOpen(true)}
          onPricingClick={() => setIsPricingOpen(true)}
          isSupabaseConnected={isSupabaseConnected}
          adminUser={adminUser}
          onLoginClick={() => setIsLoginOpen(true)}
          onLogout={() => setAdminUser(null)}
          models={availableModels}
          activeModel={activeModel}
          onModelChange={setActiveModel}
        />

        {/* Workspace Grid */}
        <div className="flex-1 min-h-0 bg-[#050505] flex overflow-hidden">
          <AnimatePresence initial={false}>
            {(activeTab === "split" || activeTab === "code") && (
              <motion.div
                key="code"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: activeTab === "split" ? "50%" : "100%" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`relative min-h-0 flex flex-col ${activeTab === "split" ? "border-r border-zinc-800" : ""}`}
              >
                <CodeEditor code={code} onChange={(v) => setCode(v || "")} />
              </motion.div>
            )}

            {(activeTab === "split" || activeTab === "preview") && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: activeTab === "split" ? "50%" : "100%" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative min-h-0 flex flex-col bg-[#111]"
              >
                <Preview code={code} />
              </motion.div>
            )}

            {activeTab === "api" && (
              <motion.div
                key="api"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative min-h-0 flex flex-col flex-1"
              >
                <ApiTester />
              </motion.div>
            )}
          </AnimatePresence>
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
          code={code}
          githubToken={secrets.find(s => s.key === "GITHUB_TOKEN")?.value}
          onSaveToken={(token) => {
            const newSecrets = [
              ...secrets.filter(s => s.key !== "GITHUB_TOKEN"),
              { key: "GITHUB_TOKEN", value: token }
            ];
            setSecrets(newSecrets);
          }}
        />
      )}

      {isTemplatesOpen && (
        <TemplatesModal
          onClose={() => setIsTemplatesOpen(false)}
          onSelect={(newCode) => setCode(newCode)}
        />
      )}

      {isSecretsOpen && (
        <SecretsModal
          onClose={() => setIsSecretsOpen(false)}
          secrets={secrets}
          onSave={setSecrets}
        />
      )}

      {isSupabaseOpen && (
        <SupabaseModal
          onClose={() => setIsSupabaseOpen(false)}
          onConnect={(url, key) => {
            const newSecrets = [
              ...secrets.filter(s => s.key !== "SUPABASE_URL" && s.key !== "SUPABASE_ANON_KEY"),
              { key: "SUPABASE_URL", value: url },
              { key: "SUPABASE_ANON_KEY", value: key }
            ];
            setSecrets(newSecrets);
          }}
        />
      )}

      {isPricingOpen && (
        <PricingModal
          onClose={() => setIsPricingOpen(false)}
          isAdmin={adminUser !== null}
          plans={pricingPlans}
          onUpdatePlans={setPricingPlans}
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
