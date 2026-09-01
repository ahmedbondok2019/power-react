import React from 'react';

const Container = ({ children, className = "", as: Component = "div" }) => {
  return (
    <Component className={`w-full max-w-[1920px] mx-auto container-9xl ${className}`}>
      {children}
    </Component>
  );
};

export default Container;
