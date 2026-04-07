import React from 'react';
import { NavLink } from 'react-router-dom';
import { Cloud, Play, List, Info, LogIn, LayoutDashboard } from 'lucide-react';
import { cn } from '../../utils/cn';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <NavLink to="/" className="flex items-center space-x-2">
            <Cloud className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              EpanDCloud
            </span>
          </NavLink>
          
          <div className="flex items-center space-x-8">
            <NavLink to="/playground" className={({ isActive }) => cn("flex items-center space-x-1 text-sm font-medium transition-colors", isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500")}>
              <Play className="w-4 h-4" />
              <span>Playground</span>
            </NavLink>
            <NavLink to="/features" className={({ isActive }) => cn("flex items-center space-x-1 text-sm font-medium transition-colors", isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500")}>
              <List className="w-4 h-4" />
              <span>Features</span>
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => cn("flex items-center space-x-1 text-sm font-medium transition-colors", isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500")}>
              <Info className="w-4 h-4" />
              <span>About</span>
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => cn("px-4 py-2 rounded-full text-sm font-medium transition-all", isActive ? "bg-blue-600 text-white shadow-lg" : "bg-blue-50 text-blue-600 hover:bg-blue-100")}>
              <LogIn className="w-4 h-4 inline-block mr-1" />
              <span>Login</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
