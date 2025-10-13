// src/components/forms/ControlledInput.jsx
import React from 'react';

// VULNERABILITY: Missing PropTypes validation for all props.
// 'value', 'onChange', 'label', 'placeholder', 'type' are not validated.
// 'placeholder' and 'type' also lack defaultProps if they are optional.
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

/*
// Corrected version (for reference, not part of the violation)
import React from 'react';
import PropTypes from 'prop-types';

const ControlledInput = ({ value, onChange, label, placeholder, type }) => {
  // ... component logic
};

ControlledInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string, // Optional
  placeholder: PropTypes.string, // Optional
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']).isRequired, // Specific type
};

ControlledInput.defaultProps = {
  label: '',
  placeholder: '',
  // type is required, so no default here
};
*/