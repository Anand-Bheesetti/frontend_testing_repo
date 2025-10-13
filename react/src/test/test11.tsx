// src/components/dashboard/WidgetContainer.tsx
import React from 'react';

// VULNERABILITY: 'data' prop has no explicit type, making it implicitly 'any'.
// The structure of 'data' is crucial for rendering, but not validated.
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
        {data.map((item, index) => renderItem(item, index))} {/* 'item' here is also implicitly 'any' */}
      </div>
    </div>
  );
};

export default WidgetContainer;

/*
// Corrected version (for reference, not part of the violation)
interface WidgetItem {
  id: string;
  label: string;
  value: number;
}

interface WidgetContainerProps {
  title: string;
  data: WidgetItem[]; // Explicit type for array of specific items
  renderItem: (item: WidgetItem, index: number) => React.ReactNode; // Explicit type for render function
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({ title, data, renderItem }) => {
  // ... rest of the component
};
*/