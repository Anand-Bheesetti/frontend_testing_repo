import React from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  weightInKg?: number;
}

interface ProductCardProps {
  product: Product;
  cardStyle: React.CSSProperties;
  onViewDetails: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, cardStyle, onViewDetails }) => {
  console.log(`ProductCard re-rendering: ${product.name}`);
  return (
    <div style={cardStyle} className="product-card">
      <h3>{product.name}</h3>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <button onClick={() => onViewDetails(product.id)}>View Details</button>
    </div>
  );
});

interface ProductListProps {
  products: Product[];
  filterCategory?: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, filterCategory }) => {
  console.log('ProductList re-rendering');

  const filteredAndProcessedProducts = products
    .filter(p => !filterCategory || p.category === filterCategory)
    .map(p => {
      const shippingCost = p.weightInKg ? p.weightInKg * 2.5 : 5;
      return { ...p, calculatedShipping: shippingCost, displayPrice: p.price + shippingCost };
    });

  const handleViewDetails = (id: string) => {
    console.log(`Viewing details for product ID: ${id}`);
  };

  return (
    <div className="product-list-container">
      <h2>Available Products</h2>
      <div className="product-grid">
        {filteredAndProcessedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            cardStyle={{ border: '1px solid #ccc', padding: '15px', margin: '10px', borderRadius: '8px', width: '250px' }}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
      <style jsx>{`
        .product-list-container { padding: 20px; text-align: center; }
        .product-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
        .product-card {
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          background-color: #fff;
        }
        .product-card button {
          background-color: #007bff; color: white; border: none;
          padding: 8px 15px; border-radius: 5px; cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ProductList;
