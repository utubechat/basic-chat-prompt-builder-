import {
  ChevronRight,
  Copy,
  Database,
  Download,
  Github,
  ListTree,
  Play,
  Settings,
  Wand2,
  Moon,
  Sun,
  User,
  Shield,
  LayoutTemplate,
  LibraryBig,
  Key,
  CreditCard,
} from "lucide-react";

export function TopBar({
  activeTab,
  onTabChange,
  isDarkMode,
  onToggleDarkMode,
  onSettingsClick,
  onGitHubClick,
  onTemplatesClick,
  onGalleryClick,
  onSecretsClick,
  onSupabaseClick,
  onPricingClick,
  isSupabaseConnected,
  adminUser,
  onLoginClick,
  onLogout,
  models,
  activeModel,
  onModelChange,
}: {
  activeTab: "split" | "code" | "preview" | "api";
  onTabChange: (tab: "split" | "code" | "preview" | "api") => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onSettingsClick: () => void;
  onGitHubClick: () => void;
  onTemplatesClick: () => void;
  onGalleryClick: () => void;
  onSecretsClick: () => void;
  onSupabaseClick: () => void;
  onPricingClick: () => void;
  isSupabaseConnected?: boolean;
  adminUser: string | null;
  onLoginClick: () => void;
  onLogout: () => void;
  models: string[];
  activeModel: string;
  onModelChange: (model: string) => void;
}) {
  return (
    <nav className="h-12 bg-[#0a0a0a] border-b border-zinc-800 flex items-center px-4 gap-6 shrink-0">
      <div className="flex gap-1 h-full">
        <button
          onClick={() => onTabChange("split")}
          style={
            activeTab === "split"
              ? {
                  color: "var(--color-primary)",
                  borderBottomColor: "var(--color-primary)",
                  backgroundColor:
                    "color-mix(in srgb, var(--color-primary) 5%, transparent)",
                }
              : {}
          }
          className={`px-4 h-full text-[11px] font-bold uppercase tracking-widest flex items-center transition-all ${activeTab === "split" ? "border-b-2" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"}`}
        >
          Split
        </button>
        <button
          onClick={() => onTabChange("code")}
          style={
            activeTab === "code"
              ? {
                  color: "var(--color-primary)",
                  borderBottomColor: "var(--color-primary)",
                  backgroundColor:
                    "color-mix(in srgb, var(--color-primary) 5%, transparent)",
                }
              : {}
          }
          className={`px-4 h-full text-[11px] font-bold uppercase tracking-widest flex items-center transition-all ${activeTab === "code" ? "border-b-2" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"}`}
        >
          Code
        </button>
        <button
          onClick={() => onTabChange("preview")}
          style={
            activeTab === "preview"
              ? {
                  color: "var(--color-primary)",
                  borderBottomColor: "var(--color-primary)",
                  backgroundColor:
                    "color-mix(in srgb, var(--color-primary) 5%, transparent)",
                }
              : {}
          }
          className={`px-4 h-full text-[11px] font-bold uppercase tracking-widest flex items-center transition-all ${activeTab === "preview" ? "border-b-2" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"}`}
        >
          Preview
        </button>
        <button
          onClick={() => onTabChange("api")}
          style={
            activeTab === "api"
              ? {
                  color: "var(--color-primary)",
                  borderBottomColor: "var(--color-primary)",
                  backgroundColor:
                    "color-mix(in srgb, var(--color-primary) 5%, transparent)",
                }
              : {}
          }
          className={`px-4 h-full text-[11px] font-bold uppercase tracking-widest flex items-center transition-all ${activeTab === "api" ? "border-b-2" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"}`}
        >
          API
        </button>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {adminUser ? (
          <div className="flex items-center gap-2 mr-2 px-3 py-1 bg-zinc-900/50 border border-zinc-800 rounded-lg">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center border shadow-sm"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-primary) 20%, transparent)",
                color: "var(--color-primary)",
                borderColor:
                  "color-mix(in srgb, var(--color-primary) 30%, transparent)",
              }}
            >
              <User size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-200 leading-none mb-0.5">
                {adminUser}
              </span>
              <span
                className="text-[8px] font-bold uppercase tracking-widest flex items-center gap-1"
                style={{ color: "var(--color-primary)" }}
              >
                <Shield size={8} /> Admin
              </span>
            </div>
            <button
              onClick={onLogout}
              className="ml-2 text-[9px] text-zinc-500 hover:text-zinc-300 uppercase tracking-widest font-bold"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="mr-2 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1"
            style={{ color: "var(--color-primary)" }}
          >
            <Shield size={12} /> Admin Login
          </button>
        )}

        <select
          value={activeModel}
          onChange={(e) => onModelChange(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] font-mono px-2 py-1 rounded outline-none focus:border-zinc-500 mr-2"
        >
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <button
          onClick={onSecretsClick}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
          title="Manage Secrets"
        >
          <Key size={14} />
        </button>

        <button
          onClick={() => {
            // Simulated download
            console.log("Downloading project as ZIP...");
            alert("Project downloaded as project.zip");
          }}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
          title="Download as ZIP"
        >
          <Download size={14} />
        </button>

        <button
          onClick={onTemplatesClick}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
          title="Starter Templates"
        >
          <LayoutTemplate size={14} />
        </button>

        <button
          onClick={onGalleryClick}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
          title="Deploy to Gallery"
        >
          <LibraryBig size={14} />
        </button>

        <button
          onClick={onPricingClick}
          className="text-zinc-500 hover:text-orange-500 transition-colors p-1"
          title="Pricing Plans"
        >
          <CreditCard size={14} />
        </button>

        <button
          onClick={onSupabaseClick}
          className={`transition-colors p-1 flex items-center gap-1 ${isSupabaseConnected ? "text-[#3ECF8E]" : "text-zinc-500 hover:text-[#3ECF8E]"}`}
          title="Connect Supabase"
        >
          <Database size={14} />
          {isSupabaseConnected && <span className="text-[10px] font-bold uppercase tracking-widest hidden md:inline">Connected</span>}
        </button>

        <button
          onClick={onGitHubClick}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
          title="GitHub Integration"
        >
          <Github size={14} />
        </button>

        <button
          onClick={onSettingsClick}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
          title="Settings"
        >
          <Settings size={14} />
        </button>

        <button
          onClick={onToggleDarkMode}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
        >
          {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <span className="text-[10px] text-zinc-500 font-mono uppercase">
          Build: Success
        </span>
        <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-1 rounded text-[11px] font-bold border border-zinc-700 uppercase">
          Deploy
        </button>
      </div>
    </nav>
  );
}
