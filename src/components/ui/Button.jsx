import React from 'react';

const Button = ({ children, onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={`group relative px-8 py-4 bg-primary text-background font-bold text-lg rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 h-full w-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
    </button>
  );
};

export default Button;
