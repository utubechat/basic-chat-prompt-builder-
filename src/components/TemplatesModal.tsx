import { X, LayoutTemplate, FileCode } from "lucide-react";

const TEMPLATES = [
  {
    name: "React Landing Page",
    description: "Clean, modern landing page with a hero section and features grid.",
    code: `export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="p-6 border-b border-zinc-900 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-500">LaunchUI</h1>
        <nav className="flex gap-4">
          <a href="#" className="text-zinc-400 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-zinc-400 hover:text-white transition-colors">Pricing</a>
        </nav>
      </header>
      <main className="p-20 text-center max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
        <h2 className="text-6xl font-extrabold mb-6 tracking-tight">Build Faster.</h2>
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl">The modern landing page template for your next big idea. Start building today.</p>
        <button className="bg-orange-500 hover:bg-orange-600 text-black px-8 py-3 rounded-lg font-bold transition-colors">Get Started</button>
      </main>
    </div>
  );
}`,
  },
  {
    name: "Dashboard Layout",
    description: "Standard dashboard layout with sidebar and main content area.",
    code: `export default function App() {
  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4 flex flex-col">
        <div className="text-lg font-bold mb-8 text-orange-500 px-2 tracking-widest uppercase text-xs">Admin Dashboard</div>
        <nav className="space-y-1">
          <div className="p-2 bg-zinc-100 dark:bg-zinc-800 text-orange-500 font-medium rounded-lg cursor-pointer">Overview</div>
          <div className="p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 rounded-lg cursor-pointer transition-colors">Users</div>
          <div className="p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 rounded-lg cursor-pointer transition-colors">Settings</div>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto w-full">
        <h1 className="text-2xl font-semibold mb-6 tracking-tight">Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col">
            <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider mb-2">Total Users</div>
            <div className="text-3xl font-bold">10,245</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col">
            <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider mb-2">Revenue</div>
            <div className="text-3xl font-bold text-orange-500">$45,231</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col">
            <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider mb-2">Active Sessions</div>
            <div className="text-3xl font-bold">1,234</div>
          </div>
        </div>
      </main>
    </div>
  );
}`,
  },
  {
    name: "API Fetcher",
    description: "Component that demonstrates fetching and rendering data from an API.",
    code: `import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data.slice(0, 5));
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen font-sans">
      <h1 className="text-2xl font-bold mb-6 tracking-tight">Users API Demo</h1>
      {loading ? (
        <div className="flex items-center gap-3 text-zinc-500">
          <div className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
          Loading data...
        </div>
      ) : (
        <ul className="space-y-4">
          {data.map((user: any) => (
            <li
              key={user.id}
              className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"
            >
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-zinc-500 mb-1">{user.email}</p>
              <p className="text-xs text-orange-500 font-mono">{user.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
  },
];

interface TemplatesModalProps {
  onClose: () => void;
  onSelect: (code: string) => void;
}

export function TemplatesModal({ onClose, onSelect }: TemplatesModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200">
      <div className="bg-[#0f0f0f] border border-zinc-800 rounded-xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden m-4">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-[#0a0a0a]">
          <h2 className="text-sm font-semibold tracking-widest uppercase flex items-center gap-2 text-zinc-300">
            <LayoutTemplate
              size={16}
              style={{ color: "var(--color-primary)" }}
            />{" "}
            Starter Templates
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
          {TEMPLATES.map((template, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelect(template.code);
                onClose();
              }}
              className="text-left bg-[#050505] border border-zinc-800 hover:border-zinc-600 p-4 rounded-xl transition-all hover:bg-zinc-900/50 flex flex-col gap-2 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                  <FileCode
                    size={14}
                    className="text-zinc-400 group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">
                  {template.name}
                </h3>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed mt-2">
                {template.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
