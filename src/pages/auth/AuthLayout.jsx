import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background relative overflow-hidden">
      {/* Left side: Image / Visuals */}
      <div className="hidden md:flex w-full md:w-1/2 relative bg-surface items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop")' }}
        >
          {/* Dark gradient overlay to blend with the dark theme */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Right side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md glass p-8 md:p-10 rounded-2xl border border-white/5 relative overflow-hidden"
        >
          {/* Subtle glow effect behind the form */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h1>
              {subtitle && <p className="text-text-muted">{subtitle}</p>}
            </div>

            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
