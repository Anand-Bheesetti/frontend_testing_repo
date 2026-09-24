import React from 'react';


const Button = ({ children, onClick, style }: { children: React.ReactNode; onClick: () => void; style: any }) => {
  return (
    <button
      onClick={onClick}
      style={style} 
      className="custom-button"
    >
      {children}
    </button>
  );
};

export default Button;

