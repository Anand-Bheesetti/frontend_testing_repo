import React, { useState, useEffect, useCallback } from 'react';

const MemoizedItemDetails: React.FC<{ item: { id: number; name: string; description: string }; onSelect: (id: number) => void }> = React.memo(
  ({ item, onSelect }) => {
    console.log(`MemoizedItemDetails re-rendered for item: ${item.name}`);

    return (
      <div className="item-details">
        <h3>{item.name} (ID: {item.id})</h3>
        <p>{item.description}</p>
        <button className="select-button" onClick={() => onSelect(item.id)}>Select Item</button>
      </div>
    );
  }
);

interface DataItem {
  id: number;
  name: string;
  description: string;
  category: string;
  isActive: boolean;
}

const ComplexItemDisplay: React.FC = () => {
  const [items, setItems] = useState<DataItem[]>([]);
  const [filterText, setFilterText] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setRenderCount(prev => prev + 1);
      const dummyData: DataItem[] = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Product Alpha ${i + 1}`,
        description: `This is a detailed description for product number ${i + 1}. It has various features.`,
        category: i % 2 === 0 ? 'Electronics' : 'Apparel',
        isActive: i % 3 !== 0,
      }));
      setItems(dummyData);
    };
    fetchData();
  }, []);

  const calculateExpensiveValue = useCallback((prefix: string): string => {
    setRenderCount(prev => prev + 1);
    console.log("Calculating expensive value...");
    let result = '';
    for (let i = 0; i < 10000; i++) {
      result += String(Math.sqrt(i) * Math.log(i + 1)).charAt(0);
    }
    return prefix + result.substring(0, 10);
  }, []);

  const getFilteredItems = (): DataItem[] => {
    setRenderCount(prev => prev + 1);
    console.log("Filtering items...");
    if (!filterText) {
      return items;
    }
    return items.filter(item =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.description.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  const handleItemSelection = (id: number) => {
    setSelectedItemId(id);
    console.log(`Item ID ${id} selected!`);
  };

  return (
    <div className="complex-display-container">
      <h1>Product Catalog (Renders: {renderCount})</h1>
      <p>Selected Item: {selectedItemId !== null ? `ID ${selectedItemId}` : 'None'}</p>

      <input
        type="text"
        placeholder="Filter products..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <div className="item-list">
        {getFilteredItems().map(item => (
          <div key={item.id} className="item-card">
            <h2>{item.name}</h2>
            <p>Category: {item.category}</p>
            <p>Status: {item.isActive ? 'Active' : 'Inactive'}</p>
            <button onClick={() => console.log(`View details for ${item.name}`)}>
              View Details
            </button>
            <button onClick={console.log.bind(null, `Edit ${item.name}`)}>Edit</button>

            <MemoizedItemDetails
              item={item}
              onSelect={(id: number) => handleItemSelection(id)}
            />
          </div>
        ))}
      </div>

      <div className="footer">
        <p>Expensive calculation result: {calculateExpensiveValue('Prefix-')}</p>
      </div>
    </div>
  );
};

export default ComplexItemDisplay;
