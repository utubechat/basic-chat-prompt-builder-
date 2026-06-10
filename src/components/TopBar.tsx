import { ChevronRight, Copy, Database, Download, Github, ListTree, Play, Settings, Wand2, Moon, Sun, User, Shield } from 'lucide-react';

export function TopBar({ 
  activeTab, 
  onTabChange,
  isDarkMode,
  onToggleDarkMode
}: { 
  activeTab: 'split' | 'code' | 'preview';
  onTabChange: (tab: 'split' | 'code' | 'preview') => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}) {
  return (
    <nav className="h-12 bg-[#0a0a0a] border-b border-zinc-800 flex items-center px-4 gap-6 shrink-0">
      <div className="flex gap-1 h-full">
        <button 
          onClick={() => onTabChange('split')} 
          className={`px-4 h-full text-[11px] font-bold uppercase tracking-widest flex items-center transition-all ${activeTab === 'split' ? 'border-b-2 border-orange-500 text-orange-400 bg-orange-500/5' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'}`}
        >
          Split
        </button>
        <button 
          onClick={() => onTabChange('code')} 
          className={`px-4 h-full text-[11px] font-bold uppercase tracking-widest flex items-center transition-all ${activeTab === 'code' ? 'border-b-2 border-orange-500 text-orange-400 bg-orange-500/5' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'}`}
        >
          Code
        </button>
        <button 
          onClick={() => onTabChange('preview')} 
          className={`px-4 h-full text-[11px] font-bold uppercase tracking-widest flex items-center transition-all ${activeTab === 'preview' ? 'border-b-2 border-orange-500 text-orange-400 bg-orange-500/5' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'}`}
        >
          Preview
        </button>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="flex items-center gap-2 mr-2 px-3 py-1 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 border border-orange-500/30">
            <User size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-200 leading-none mb-0.5">nexusos@commandnexus.net</span>
            <span className="text-[8px] text-orange-500 font-bold uppercase tracking-widest flex items-center gap-1">
              <Shield size={8} /> Admin
            </span>
          </div>
        </div>

        <button 
          onClick={onToggleDarkMode}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
        >
          {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <span className="text-[10px] text-zinc-500 font-mono uppercase">Build: Success</span>
        <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-1 rounded text-[11px] font-bold border border-zinc-700 uppercase">
          Deploy
        </button>
      </div>
    </nav>
  );
}
