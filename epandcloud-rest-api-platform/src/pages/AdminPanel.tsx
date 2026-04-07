import React, { useState } from 'react';
import { useApp, Endpoint } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import { 
  Plus, Edit2, Trash2, LayoutDashboard, Database, Activity, 
  Settings, Save, X, Search, Code, CheckCircle2, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPanel = () => {
  const { isAdmin, endpoints, logs, addEndpoint, updateEndpoint, deleteEndpoint, logout } = useApp();
  const [activeTab, setActiveTab] = useState<'endpoints' | 'logs' | 'settings'>('endpoints');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Endpoint>>({
    name: '',
    path: '/api/',
    method: 'GET',
    response: JSON.stringify({ status: "success", data: "Hello World" }, null, 2)
  });

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && isEditing !== 'new') {
      updateEndpoint(isEditing, formData);
    } else {
      addEndpoint(formData as any);
    }
    setIsEditing(null);
    setFormData({
      name: '',
      path: '/api/',
      method: 'GET',
      response: JSON.stringify({ status: "success", data: "Hello World" }, null, 2)
    });
  };

  const startEdit = (ep: Endpoint) => {
    setIsEditing(ep._id);
    setFormData(ep);
  };

  const startNew = () => {
    setIsEditing('new');
    setFormData({
      name: '',
      path: '/api/',
      method: 'GET',
      response: JSON.stringify({ status: "success", data: "Hello World" }, null, 2)
    });
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            Admin Dashboard
          </h1>
          <p className="text-slate-600">Manage your EpanDCloud instance</p>
        </div>
        <button 
          onClick={logout}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
        >
          Sign Out
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide shrink-0">
          <button 
            onClick={() => setActiveTab('endpoints')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all shrink-0 ${activeTab === 'endpoints' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100'}`}
          >
            <Database className="w-5 h-5" />
            <span>Endpoints</span>
          </button>
          <button 
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all shrink-0 ${activeTab === 'logs' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100'}`}
          >
            <Activity className="w-5 h-5" />
            <span>Traffic Logs</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all shrink-0 ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100'}`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {activeTab === 'endpoints' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-slate-800">Available Endpoints ({endpoints.length})</h2>
                {!isEditing && (
                  <button 
                    onClick={startNew}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Endpoint</span>
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white rounded-2xl border border-blue-100 p-6 shadow-xl shadow-blue-50"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-slate-900">{isEditing === 'new' ? 'Create New Endpoint' : 'Edit Endpoint'}</h3>
                      <button onClick={() => setIsEditing(null)} className="text-slate-400 hover:text-slate-600 p-1 bg-slate-50 rounded-lg"><X className="w-5 h-5" /></button>
                    </div>
                    <form onSubmit={handleSave} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Friendly Name</label>
                          <input 
                            type="text" 
                            placeholder="e.g. User Profile"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-slate-50 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Method</label>
                          <select 
                            value={formData.method}
                            onChange={(e) => setFormData({...formData, method: e.target.value as any})}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-slate-50 transition-all"
                          >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Endpoint Path</label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">/api/</div>
                          <input 
                            type="text" 
                            placeholder="users/me"
                            value={formData.path?.replace('/api/', '')}
                            onChange={(e) => setFormData({...formData, path: `/api/${e.target.value}`})}
                            className="w-full pl-14 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-slate-50 transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                           <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                             <Code className="w-4 h-4" />
                             JSON Response
                           </label>
                           <button 
                             type="button" 
                             onClick={() => {
                               try {
                                 setFormData({...formData, response: JSON.stringify(JSON.parse(formData.response || ''), null, 2)});
                               } catch (err) { alert('Invalid JSON'); }
                             }}
                             className="text-[11px] font-bold text-blue-600 hover:text-blue-700 uppercase"
                           >
                             Format JSON
                           </button>
                        </div>
                        <textarea 
                          rows={6}
                          value={formData.response}
                          onChange={(e) => setFormData({...formData, response: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-slate-900 text-blue-300 font-mono text-sm transition-all"
                          required
                        />
                      </div>
                      <div className="flex gap-4 pt-2">
                         <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all">
                           <Save className="w-5 h-5" />
                           <span>Save Changes</span>
                         </button>
                         <button type="button" onClick={() => setIsEditing(null)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                           <span>Cancel</span>
                         </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {endpoints.length === 0 ? (
                       <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                         <Database className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                         <p className="text-slate-500">No endpoints found. Start by creating one!</p>
                       </div>
                    ) : (
                      endpoints.map((ep) => (
                        <div key={ep._id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all group border-l-4 border-l-blue-500">
                          <div className="flex items-start justify-between mb-4">
                            <div className="max-w-[70%]">
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase mb-1 inline-block ${ep.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                {ep.method}
                              </span>
                              <h3 className="text-base font-bold text-slate-900 truncate">{ep.name}</h3>
                              <p className="text-xs font-mono text-slate-500 truncate mt-1">{ep.path}</p>
                            </div>
                            <div className="flex gap-1">
                              <button onClick={() => startEdit(ep)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => deleteEndpoint(ep._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-3 border-t border-slate-50">
                             <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(ep.createdAt).toLocaleDateString()}</span>
                             <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Active</span>
                          </div>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-slate-800">Traffic Monitoring</h2>
                <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">Real-time Updates</div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Method</th>
                        <th className="px-6 py-4">Endpoint</th>
                        <th className="px-6 py-4">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {logs.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic">No activity recorded yet.</td>
                        </tr>
                      ) : (
                        logs.map((log) => (
                          <tr key={log._id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${log.status === 200 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {log.status} {log.status === 200 ? 'OK' : 'ERR'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-700 text-xs">
                              {log.method}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-slate-500">
                              {log.endpoint}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-xl font-bold text-slate-800">System Settings</h2>
              <div className="bg-white rounded-2xl border border-slate-100 p-8 space-y-6">
                 <div>
                   <h3 className="font-bold text-slate-800 mb-2">Instance Name</h3>
                   <input type="text" value="EpanDCloud Indonesia" disabled className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500" />
                 </div>
                 <div>
                   <h3 className="font-bold text-slate-800 mb-2">API Security</h3>
                   <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div>
                        <div className="font-bold text-blue-900 text-sm">Rate Limiting</div>
                        <div className="text-xs text-blue-700">100 requests / 15 mins / IP</div>
                      </div>
                      <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                      </div>
                   </div>
                 </div>
                 <div className="pt-4">
                   <p className="text-xs text-slate-400 italic">Version: 1.0.0 (Stable)</p>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
