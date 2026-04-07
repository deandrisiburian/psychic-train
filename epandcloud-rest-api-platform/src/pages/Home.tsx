import { Link } from 'react-router-dom';
import { Cloud, Rocket, Shield, Activity, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-6">
              <Cloud className="w-4 h-4" />
              <span>Modern API Solution</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
              Empower Your <span className="text-blue-600">REST APIs</span> <br />
              with EpanDCloud
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10">
              The ultimate platform to create, manage, and test your REST API endpoints with ease. Scale your application backend instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/playground" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center space-x-2 group">
                <span>Start Playground</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all border border-slate-200">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Fast Setup</h3>
              <p className="text-slate-600">Create your endpoints in seconds without writing a single line of backend code.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Secure by Default</h3>
              <p className="text-slate-600">Robust JWT authentication and role-based access control for your administrative tasks.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Live Monitoring</h3>
              <p className="text-slate-600">Track every request coming to your endpoints with real-time logs and analytics.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
