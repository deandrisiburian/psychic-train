import { Shield, Zap, Layout, Monitor, Lock, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "RESTful Playground",
      description: "Instantly test your endpoints with our built-in playground that supports GET and POST methods with clean JSON visualization."
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Dynamic Endpoints",
      description: "Create and update endpoints on the fly. Change responses without any downtime or code deployments."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Admin Panel",
      description: "Protect your configuration with enterprise-grade JWT authentication and secure session management."
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Traffic Insights",
      description: "Monitor every single request with status codes, methods, and timestamps to keep your API performance in check."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Rate Limiting",
      description: "Native protection against brute force and spamming with built-in rate limiting for every IP address."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized for speed. Our platform ensures minimal overhead and latency for your API responses."
    }
  ];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Everything you need for <br />
          <span className="text-blue-600">REST API Management</span>
        </h1>
        <p className="text-lg text-slate-600">
          Powerful tools designed for developers who want to move fast and maintain control over their data endpoints.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
