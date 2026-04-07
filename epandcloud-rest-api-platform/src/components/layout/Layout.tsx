import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
      
      {/* Footer (Desktop Only) */}
      <footer className="hidden md:block py-10 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center text-slate-400 text-sm">
             <div className="font-bold text-slate-900">EpanDCloud</div>
             <div>© 2026 EpanDCloud Platform. All rights reserved.</div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
