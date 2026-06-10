import { 
  MousePointer2, 
  PenLine, 
  Palette, 
  Menu, 
  Type, 
  AlignLeft, 
  Grid, 
  Undo2, 
  Redo2, 
  Check, 
  ChevronDown 
} from 'lucide-react';

export function FloatingToolbar() {
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-[#1c1c1e] border border-zinc-700/50 rounded-xl p-1.5 flex items-center gap-1 shadow-2xl shadow-black/50 z-50 animate-in slide-in-from-bottom-5">
      <div className="flex items-center gap-1 bg-[#2c2c2e] rounded-lg p-1 border border-zinc-700/30">
         <button className="p-1.5 text-zinc-400 hover:text-orange-500 rounded transition-colors">
            <PenLine size={16} />
         </button>
         <button className="p-1.5 bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 text-orange-400 rounded shadow-sm transition-colors">
            <MousePointer2 size={16} />
         </button>
      </div>
      
      <div className="w-[1px] h-5 bg-zinc-700/50 mx-1"></div>
      
      <div className="flex items-center gap-0.5">
        <button className="px-2 py-1.5 text-zinc-400 hover:text-orange-500 transition-colors flex items-center gap-1 rounded hover:bg-zinc-800">
          <Palette size={16} /> <ChevronDown size={11} className="text-zinc-500" />
        </button>
        <button className="px-2 py-1.5 text-zinc-400 hover:text-orange-500 transition-colors flex items-center gap-1 rounded hover:bg-zinc-800">
          <Menu size={16} /> <ChevronDown size={11} className="text-zinc-500" />
        </button>
        <button className="px-2 py-1.5 text-zinc-400 hover:text-orange-500 transition-colors flex items-center gap-1 rounded hover:bg-zinc-800">
          <Type size={16} /> <ChevronDown size={11} className="text-zinc-500" />
        </button>
        <button className="px-2 py-1.5 text-zinc-400 hover:text-orange-500 transition-colors flex items-center gap-1 rounded hover:bg-zinc-800">
          <span className="font-serif font-bold text-[15px] leading-none text-center min-w-[16px]">Aa</span> <ChevronDown size={11} className="text-zinc-500" />
        </button>
        <button className="px-2 py-1.5 text-zinc-400 hover:text-orange-500 transition-colors flex items-center gap-1 rounded hover:bg-zinc-800">
          <span className="font-bold underline text-[15px] leading-none text-center min-w-[16px]">A</span> <ChevronDown size={11} className="text-zinc-500" />
        </button>
        <button className="px-2 py-1.5 text-zinc-400 hover:text-orange-500 transition-colors flex items-center gap-1 rounded hover:bg-zinc-800">
          <AlignLeft size={16} /> <ChevronDown size={11} className="text-zinc-500" />
        </button>
        <button className="px-2 py-1.5 text-zinc-400 hover:text-orange-500 transition-colors flex items-center gap-1 rounded hover:bg-zinc-800">
          <Grid size={16} /> <ChevronDown size={11} className="text-zinc-500" />
        </button>
      </div>
      
      <div className="w-[1px] h-5 bg-zinc-700/50 mx-1"></div>
      
      <div className="flex items-center gap-0.5">
        <button className="p-1.5 text-zinc-400 hover:text-orange-500 rounded hover:bg-zinc-800 transition-colors">
          <Undo2 size={16} />
        </button>
        <button className="p-1.5 text-zinc-600 rounded transition-colors cursor-not-allowed">
          <Redo2 size={16} />
        </button>
      </div>
      
      <div className="w-[1px] h-5 bg-zinc-700/50 mx-1"></div>
      
      <button className="flex items-center gap-1.5 px-4 py-1.5 bg-zinc-800/80 text-zinc-500 rounded-lg text-xs font-semibold ml-1 border border-zinc-700/50 cursor-not-allowed">
        <Check size={14} /> Submit
      </button>
    </div>
  );
}
