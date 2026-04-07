import { NavLink } from 'react-router-dom';
import { Cloud, Play, List, Info, LogIn } from 'lucide-react';
import { cn } from '../../utils/cn';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 md:hidden flex justify-around items-center h-16 pb-safe px-6 backdrop-blur-md bg-white/90 shadow-lg">
      <NavLink to="/" className={({ isActive }) => cn("flex flex-col items-center gap-1", isActive ? "text-blue-600" : "text-gray-400")}>
        <Cloud className="w-6 h-6" />
        <span className="text-[10px] font-medium">Home</span>
      </NavLink>
      <NavLink to="/playground" className={({ isActive }) => cn("flex flex-col items-center gap-1", isActive ? "text-blue-600" : "text-gray-400")}>
        <Play className="w-6 h-6" />
        <span className="text-[10px] font-medium">Test</span>
      </NavLink>
      <NavLink to="/features" className={({ isActive }) => cn("flex flex-col items-center gap-1", isActive ? "text-blue-600" : "text-gray-400")}>
        <List className="w-6 h-6" />
        <span className="text-[10px] font-medium">Features</span>
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => cn("flex flex-col items-center gap-1", isActive ? "text-blue-600" : "text-gray-400")}>
        <Info className="w-6 h-6" />
        <span className="text-[10px] font-medium">About</span>
      </NavLink>
      <NavLink to="/login" className={({ isActive }) => cn("flex flex-col items-center gap-1", isActive ? "text-blue-600" : "text-gray-400")}>
        <LogIn className="w-6 h-6" />
        <span className="text-[10px] font-medium">Login</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
