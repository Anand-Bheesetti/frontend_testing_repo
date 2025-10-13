// src/components/dashboard/WidgetContainer.tsx
import React from 'react';


const WidgetContainer = ({ title, data, renderItem }) => {
  if (!data || data.length === 0) {
    return (
      <div className="widget-container no-data">
        <h3>{title}</h3>
        <p>No data available for this widget.</p>
      </div>
    );
  }

  return (
    <div className="widget-container">
      <h3>{title}</h3>
      <div className="widget-content">
        {data.map((item, index) => renderItem(item, index))} 
      </div>
    </div>
  );
};

export default WidgetContainer;

