// src/components/layout/SidebarMenuItem.jsx
import React from 'react';
import PropTypes from 'prop-types';

// VULNERABILITY: 'item' prop uses PropTypes.object, which is too generic.
// 'onClick' is clearly required for interactivity but lacks .isRequired.
const SidebarMenuItem = ({ item, onClick }) => {
  return (
    <li className="sidebar-menu-item">
      <a href={item.path} onClick={onClick}>
        {item.icon && <i className={`icon-${item.icon}`}></i>}
        <span>{item.label}</span>
      </a>
    </li>
  );
};

SidebarMenuItem.propTypes = {
  item: PropTypes.object, // VULNERABILITY: Too generic, should be PropTypes.shape
  onClick: PropTypes.func, // VULNERABILITY: Missing .isRequired for a core interaction
};

// VULNERABILITY: No defaultProps for 'item' or 'onClick', if they are considered optional.
// Given the usage, 'item' especially should probably be required.

export default SidebarMenuItem;

/*
// Corrected version (for reference, not part of the violation)
import React from 'react';
import PropTypes from 'prop-types';

const SidebarMenuItem = ({ item, onClick }) => {
  // ... component logic
};

SidebarMenuItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.string, // Optional icon
  }).isRequired, // 'item' is clearly required for the menu item
  onClick: PropTypes.func.isRequired, // 'onClick' is also required
};

SidebarMenuItem.defaultProps = {
  // No default for 'item' or 'onClick' as they are required
};
*/