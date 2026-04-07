import { Mail, Globe, Info, Heart, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Left Side: Content */}
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold border border-indigo-100 uppercase tracking-wider">
            <Info className="w-4 h-4" />
            <span>Project Info</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1]">
            Empowering Next-Gen <br />
            <span className="text-indigo-600">API Platforms</span>
          </h1>
          
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              EpanDCloud was built to simplify the process of creating and managing mock or production REST API endpoints. We believe that developers should spend more time building features and less time configuring backend infrastructure.
            </p>
            <p>
              Our mission is to provide a seamless, secure, and user-friendly experience for API testing and data management across the globe.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
             <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
               <Code2 className="w-5 h-5" />
               <span>Github Repo</span>
             </button>
             <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all">
               <Globe className="w-5 h-5" />
               <span>Official Site</span>
             </button>
          </div>
        </div>

        {/* Right Side: Identity/Stats */}
        <div className="flex-1 w-full max-w-md">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="p-10 rounded-[40px] bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-2xl relative overflow-hidden"
           >
              {/* Decorative circle */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              
              <div className="relative z-10 space-y-8 text-center sm:text-left">
                <div className="space-y-2">
                   <h2 className="text-3xl font-bold">EpanDCloud</h2>
                   <p className="text-blue-100 font-medium opacity-80 uppercase tracking-[0.2em] text-xs">Innovation for you</p>
                </div>

                <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
                   <div>
                     <div className="text-3xl font-black mb-1">10k+</div>
                     <div className="text-xs text-blue-100 opacity-70 uppercase font-bold tracking-wider">Endpoints Served</div>
                   </div>
                   <div>
                     <div className="text-3xl font-black mb-1">99.9%</div>
                     <div className="text-xs text-blue-100 opacity-70 uppercase font-bold tracking-wider">Uptime Rate</div>
                   </div>
                </div>

                <div className="space-y-4">
                   <p className="text-sm italic opacity-90 leading-relaxed font-light">
                     "Simplicity is the ultimate sophistication in API development."
                   </p>
                   <div className="flex items-center justify-center sm:justify-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"><Mail className="w-5 h-5 text-white" /></div>
                      <div>
                        <div className="text-sm font-bold">Contact Support</div>
                        <div className="text-xs text-blue-100 opacity-70">support@epandcloud.my.id</div>
                      </div>
                   </div>
                </div>
              </div>
           </motion.div>
        </div>
      </div>

      <div className="mt-32 text-center text-slate-400 text-sm flex items-center justify-center gap-1.5 font-medium">
         Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> by EpanDCloud Indonesia
      </div>
    </div>
  );
};

export default About;
