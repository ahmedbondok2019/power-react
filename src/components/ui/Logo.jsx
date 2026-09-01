import React from 'react';

const Logo = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-3 cursor-pointer ${className}`}>
      <div className="text-right flex flex-col">
        <span className="font-bold text-xl tracking-wider text-text-main leading-none">POWER</span>
        <span className="text-[10px] text-primary tracking-[0.2em] font-medium mt-1">PREPARATION</span>
      </div>
      {/* Faux Icon based on the image (building/columns) */}
      <div className="w-8 h-10 border-l-2 border-b-2 border-primary flex items-end p-1 relative">
         <div className="w-1.5 h-full bg-text-main absolute right-0 bottom-0"></div>
         <div className="w-1.5 h-[70%] bg-text-main absolute right-3 bottom-0"></div>
         <div className="w-1.5 h-[40%] bg-text-main absolute right-6 bottom-0"></div>
      </div>
    </div>
  );
};

export default Logo;
