// src/components/forms/ControlledInput.jsx
import React from 'react';

const ControlledInput = ({ value, onChange, label, placeholder, type }) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control"
      />
    </div>
  );
};

export default ControlledInput;

