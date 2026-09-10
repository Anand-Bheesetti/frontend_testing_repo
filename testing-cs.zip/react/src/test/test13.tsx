import React from 'react';
import PropTypes from 'prop-types';


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
  item: PropTypes.object, 
  onClick: PropTypes.func, 
};



export default SidebarMenuItem;
