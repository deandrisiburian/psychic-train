import React, { useState } from 'react';
import { Play, Send, Terminal, Loader2, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Playground = () => {
  const { endpoints, simulateRequest } = useApp();
  const [path, setPath] = useState('');
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ status: number; data: any } | null>(null);

  const handleSend = async () => {
    if (!path) return;
    setLoading(true);
    setResult(null);
    
    // Slight delay to simulate network
    setTimeout(async () => {
      const res = await simulateRequest(path, method);
      setResult(res);
      setLoading(false);
    }, 800);
  };

  const handleSelectEndpoint = (e: any) => {
    setPath(e.path);
    setMethod(e.method);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">API Playground</h1>
        <p className="text-slate-600">Test your endpoints instantly with EpanDCloud.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Input */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="w-full sm:w-32">
                <label className="block text-sm font-medium text-slate-700 mb-1">Method</label>
                <select 
                  value={method}
                  onChange={(e) => setMethod(e.target.value as any)}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 transition-all outline-none"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">URL Endpoint</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                    /api/
                  </div>
                  <input 
                    type="text" 
                    placeholder="test"
                    value={path.startsWith('/api/') ? path.substring(5) : path}
                    onChange={(e) => {
                        const val = e.target.value;
                        setPath(val.startsWith('/') ? val : `/api/${val}`);
                    }}
                    className="w-full h-12 pl-14 pr-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={handleSend}
                  disabled={loading || !path}
                  className="h-12 px-8 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  <span>Send</span>
                </button>
              </div>
            </div>

            <div className="mt-8">
               <div className="flex items-center space-x-2 mb-4 text-slate-800 font-semibold">
                 <Terminal className="w-5 h-5" />
                 <span>Response Output</span>
               </div>
               
               <div className="relative min-h-[300px] bg-slate-900 rounded-xl overflow-hidden font-mono p-6">
                 <AnimatePresence mode="wait">
                   {loading ? (
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-full absolute inset-0 text-slate-400"
                     >
                       <Loader2 className="w-8 h-8 animate-spin mb-2" />
                       <span>Awaiting Response...</span>
                     </motion.div>
                   ) : result ? (
                     <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm"
                     >
                       <div className="flex items-center space-x-4 mb-4 border-b border-slate-800 pb-2">
                         <span className={result.status === 200 ? 'text-green-400' : 'text-red-400'}>
                           Status: {result.status}
                         </span>
                         <span className="text-slate-500">
                           Time: {Math.floor(Math.random() * 100) + 50}ms
                         </span>
                       </div>
                       <pre className="text-slate-300 overflow-x-auto whitespace-pre-wrap">
                         {JSON.stringify(result.data, null, 2)}
                       </pre>
                     </motion.div>
                   ) : (
                     <div className="flex flex-col items-center justify-center h-full text-slate-500 italic">
                        No request sent yet.
                     </div>
                   )}
                 </AnimatePresence>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column - Endpoint List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-500" />
                Available Endpoints
              </h3>
            </div>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {endpoints.length === 0 ? (
                <p className="text-sm text-slate-500 italic">No endpoints created yet.</p>
              ) : (
                endpoints.map((ep) => (
                  <button
                    key={ep._id}
                    onClick={() => handleSelectEndpoint(ep)}
                    className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                        {ep.method}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(ep.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-700 truncate">{ep.path}</div>
                    <div className="text-[11px] text-slate-500 truncate">{ep.name}</div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
