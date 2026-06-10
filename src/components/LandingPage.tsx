import React, { useState } from "react";
import { Sparkles, Terminal, Code2, Rocket, Play } from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onStart: (prompt: string) => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(prompt || "Hello World");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Accents */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)" }}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-3xl px-6 relative z-10 flex flex-col items-center flex-1 justify-center"
      >
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-zinc-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 opacity-50 group-hover:opacity-100 transition-opacity" />
            <Sparkles size={24} style={{ color: "var(--color-primary)" }} className="relative z-10" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-white">
            BuildStudio <span className="text-zinc-500 font-light tracking-widest uppercase text-sm">Beta</span>
          </h1>
        </div>

        <p className="text-lg text-zinc-400 mb-10 text-center max-w-xl leading-relaxed">
          The ultimate AI-powered full-stack IDE. Generate production-ready React applications with Tailwind CSS, Supabase, and real-time preview.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 max-w-2xl">
          <div className="relative group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-zinc-800 to-zinc-800 opacity-0 group-focus-within:opacity-100 transition-opacity blur mx-2 my-2" style={{ transitionDuration: '400ms' }} />
            <div className="relative flex items-center bg-[#0a0a0a] border border-zinc-800 group-focus-within:border-zinc-500 rounded-2xl p-2 transition-colors shadow-2xl">
              <div className="pl-4 pr-2 text-zinc-500 flex shrink-0">
                <Terminal size={20} />
              </div>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What do you want to build? (e.g. A minimal music player)"
                className="flex-1 bg-transparent text-white placeholder-zinc-600 px-2 py-4 focus:outline-none text-lg selection:bg-zinc-800"
                autoFocus
              />
              <button
                type="submit"
                className="ml-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center gap-2 text-white transition-all hover:scale-105 active:scale-95 shadow-lg flex-shrink-0"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <Rocket size={16} />
                Build
              </button>
            </div>
          </div>
        </form>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          <div className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-zinc-800/50 bg-[#0a0a0a]/50">
            <Code2 size={24} className="text-zinc-500" />
            <h3 className="text-sm font-bold text-zinc-300">Modern Stack</h3>
            <p className="text-xs text-zinc-500">React, TypeScript, and Tailwind CSS configuration out of the box.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-zinc-800/50 bg-[#0a0a0a]/50">
            <Sparkles size={24} className="text-zinc-500" />
            <h3 className="text-sm font-bold text-zinc-300">AI Code Engine</h3>
            <p className="text-xs text-zinc-500">Intelligent completion and full-file refactoring through natural language.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-zinc-800/50 bg-[#0a0a0a]/50">
            <Play size={24} className="text-zinc-500" />
            <h3 className="text-sm font-bold text-zinc-300">Instant Preview</h3>
            <p className="text-xs text-zinc-500">Real-time compilation and hot module replacement for immediate feedback.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
