import { useState } from 'react';
import { Play, Loader2, Code2 } from 'lucide-react';

export function ApiTester() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState<number | null>(null);

  const handleSend = async () => {
    if (!url) return;
    setLoading(true);
    setResponse('');
    setStatus(null);
    setTime(null);
    
    const startTime = Date.now();
    try {
      let parsedHeaders = {};
      try {
        if (headers.trim()) parsedHeaders = JSON.parse(headers);
      } catch (e: any) {
        setResponse('Error parsing headers: ' + e.message);
        setLoading(false);
        return;
      }

      const options: RequestInit = {
        method,
        headers: parsedHeaders,
      };

      if (method !== 'GET' && method !== 'HEAD' && body.trim()) {
        options.body = body;
      }

      const res = await fetch(url, options);
      const endTime = Date.now();
      setTime(endTime - startTime);
      setStatus(res.status);
      
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      } else {
        const text = await res.text();
        setResponse(text);
      }
    } catch (e: any) {
      setResponse('Error: ' + e.message);
      setTime(Date.now() - startTime);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col font-sans">
      <div className="h-10 bg-[#0a0a0a] border-b border-zinc-800 flex items-center px-4 shrink-0 justify-between">
        <div className="flex gap-4">
           <h2 className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 text-zinc-300">
             <Code2 size={14} style={{ color: 'var(--color-primary)' }} />
             API Tester
           </h2>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Request Panel */}
        <div className="lg:w-1/2 w-full h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col p-4 gap-4 overflow-y-auto">
          <div className="flex gap-2">
            <select 
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="bg-[#0f0f0f] border border-zinc-800 rounded font-mono text-xs px-2 py-2 text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>PATCH</option>
              <option>DELETE</option>
            </select>
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/v1/users"
              className="flex-1 bg-[#0f0f0f] border border-zinc-800 rounded font-mono text-xs px-3 py-2 text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !url}
              className="px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 text-white"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
              Send
            </button>
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Headers (JSON)</label>
            <textarea
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              className="h-28 bg-[#0a0a0a] border border-zinc-800 rounded font-mono text-xs p-3 text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
            />
          </div>

          {method !== 'GET' && method !== 'HEAD' && (
             <div className="flex flex-col gap-1 flex-1">
               <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Body</label>
               <textarea
                 value={body}
                 onChange={(e) => setBody(e.target.value)}
                 className="flex-1 min-h-[100px] bg-[#0a0a0a] border border-zinc-800 rounded font-mono text-xs p-3 text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
               />
             </div>
          )}
        </div>

        {/* Response Panel */}
        <div className="lg:w-1/2 w-full h-1/2 lg:h-full flex flex-col p-4 bg-[#0a0a0a]">
           <div className="flex items-center justify-between mb-2">
             <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Response</label>
             <div className="flex gap-3 text-[10px] font-mono">
                <span className={`${status && status >= 200 && status < 300 ? 'text-green-500' : status ? 'text-red-500' : 'text-zinc-500'}`}>
                  Status: {status || '---'}
                </span>
                <span className="text-zinc-500">
                  Time: {time !== null ? `${time}ms` : '---'}
                </span>
             </div>
           </div>
           
           <div className="flex-1 border border-zinc-800 rounded bg-[#050505] overflow-auto p-3">
             <pre className="font-mono text-xs text-zinc-300 whitespace-pre-wrap break-all">
               {response ? response : (loading ? 'Loading...' : 'Awaiting request...')}
             </pre>
           </div>
        </div>
      </div>
    </div>
  );
}
