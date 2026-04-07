import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Endpoint {
  _id: string;
  name: string;
  path: string;
  method: 'GET' | 'POST';
  response: string; // JSON string
  createdAt: string;
}

export interface Log {
  _id: string;
  endpoint: string;
  method: string;
  status: number;
  timestamp: string;
}

interface AppContextType {
  endpoints: Endpoint[];
  logs: Log[];
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  addEndpoint: (endpoint: Omit<Endpoint, '_id' | 'createdAt'>) => void;
  updateEndpoint: (id: string, endpoint: Partial<Endpoint>) => void;
  deleteEndpoint: (id: string) => void;
  simulateRequest: (path: string, method: string) => Promise<{ status: number; data: any }>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [endpoints, setEndpoints] = useState<Endpoint[]>(() => {
    const saved = localStorage.getItem('epandcloud_endpoints');
    return saved ? JSON.parse(saved) : [
      {
        _id: '1',
        name: 'Test Greeting',
        path: '/api/hello',
        method: 'GET',
        response: JSON.stringify({ message: "Welcome to EpanDCloud!", status: "success" }),
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [logs, setLogs] = useState<Log[]>(() => {
    const saved = localStorage.getItem('epandcloud_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('epandcloud_auth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('epandcloud_endpoints', JSON.stringify(endpoints));
  }, [endpoints]);

  useEffect(() => {
    localStorage.setItem('epandcloud_logs', JSON.stringify(logs));
  }, [logs]);

  const login = async (username: string, password: string) => {
    // Simulate real auth with the specified credentials
    if (username === 'epandcloudnesia' && password === 'epandcloudpunyaepand') {
      setIsAdmin(true);
      localStorage.setItem('epandcloud_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('epandcloud_auth');
  };

  const addEndpoint = (endpoint: Omit<Endpoint, '_id' | 'createdAt'>) => {
    const newEndpoint: Endpoint = {
      ...endpoint,
      _id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setEndpoints([...endpoints, newEndpoint]);
  };

  const updateEndpoint = (id: string, updated: Partial<Endpoint>) => {
    setEndpoints(endpoints.map(e => e._id === id ? { ...e, ...updated } : e));
  };

  const deleteEndpoint = (id: string) => {
    setEndpoints(endpoints.filter(e => e._id !== id));
  };

  const simulateRequest = async (path: string, method: string) => {
    const endpoint = endpoints.find(e => e.path === path && e.method === method);
    
    let status = 404;
    let data = { error: "Not Found", message: `Endpoint ${method} ${path} does not exist.` };

    if (endpoint) {
      status = 200;
      try {
        data = JSON.parse(endpoint.response);
      } catch (e) {
        data = { error: "Internal Server Error", message: "Invalid JSON response stored in DB" };
        status = 500;
      }
    }

    const newLog: Log = {
      _id: Math.random().toString(36).substr(2, 9),
      endpoint: path,
      method,
      status,
      timestamp: new Date().toISOString()
    };
    setLogs([newLog, ...logs].slice(0, 50)); // Keep last 50 logs

    return { status, data };
  };

  return (
    <AppContext.Provider value={{
      endpoints,
      logs,
      isAdmin,
      login,
      logout,
      addEndpoint,
      updateEndpoint,
      deleteEndpoint,
      simulateRequest
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
