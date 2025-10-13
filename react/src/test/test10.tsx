// src/components/common/Button.tsx
import React from 'react';

// VULNERABILITY: Using 'any' for props, which bypasses type checking for styling.
// This is a common shortcut that can lead to runtime errors if 'style' isn't an object.
const Button = ({ children, onClick, style }: { children: React.ReactNode; onClick: () => void; style: any }) => {
  return (
    <button
      onClick={onClick}
      style={style} // This could break if 'style' is not a CSSProperties object
      className="custom-button"
    >
      {children}
    </button>
  );
};

export default Button;

/*
// Corrected version (for reference, not part of the violation)
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties; // Correctly typed and optional
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, style, className = "" }) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`custom-button ${className}`}
    >
      {children}
    </button>
  );
};
*/