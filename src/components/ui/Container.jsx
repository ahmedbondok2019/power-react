import React from 'react';

const Container = ({ children, className = "", as: Component = "div" }) => {
  return (
    <Component className={`w-full ${className}`}>
      {children}
    </Component>
  );
};

export default Container;
