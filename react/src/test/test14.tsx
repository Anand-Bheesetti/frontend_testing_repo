// src/pages/ProductDetailsPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming react-router-dom

// VULNERABILITY: The 'product' prop in the `ProductDisplay` component has a generic type
// ('any') or is implicitly 'any' if not defined, due to complex, optional nested structures.
// The `handleAddToCart` function for `ProductDisplay` might also have a loose signature.

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: string[];
  stock: number;
  // This 'details' object is complex and often left as 'any'
  details: any; // VULNERABILITY: Using 'any' for a complex, nested object.
  reviews?: { author: string; rating: number; comment: string; }[]; // Optional reviews
}

interface ProductDisplayProps {
  product: ProductDetails;
  onAddToCart: (productId: string, quantity: number) => void;
  // VULNERABILITY: 'extraInfo' is optional but has no explicit type, so it's implicitly 'any'.
  // This could be for a promo message or a special discount.
  extraInfo?: any;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ product, onAddToCart, extraInfo }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  return (
    <div className="product-display">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h2>{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
      {extraInfo && <div className="product-extra-info">{extraInfo.message}</div>} {/* Accessing 'message' from 'any' */}
      <div className="product-actions">
        <select value={quantity} onChange={handleQuantityChange}>
          {[...Array(product.stock > 10 ? 10 : product.stock)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        <button onClick={() => onAddToCart(product.id, quantity)} disabled={product.stock === 0}>
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
      {product.reviews && product.reviews.length > 0 && (
        <div className="product-reviews">
          <h3>Customer Reviews</h3>
          {product.reviews.map((review, index) => (
            <div key={index} className="review-item">
              <strong>{review.author}</strong> ({review.rating}/5): {review.comment}
            </div>
          ))}
        </div>
      )}
      {/* Accessing potentially undefined properties from `product.details` */}
      {product.details.warranty && <p>Warranty: {product.details.warranty}</p>}
    </div>
  );
};

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Simulate API call to fetch product details
        const fetchedProduct: ProductDetails = {
          id: productId || 'p001',
          name: `Sample Product ${productId || 'A'}`,
          description: 'This is a detailed description of the sample product, highlighting its features and benefits.',
          price: 29.99,
          imageUrl: 'https://via.placeholder.com/150',
          categories: ['Electronics', 'Gadgets'],
          stock: 5,
          details: { // This 'details' object is where 'any' becomes a problem
            weight: '1kg',
            dimensions: '10x10x10cm',
            warranty: '1 year limited'
          },
          reviews: [
            { author: 'Alice', rating: 5, comment: 'Great product!' },
            { author: 'Bob', rating: 4, comment: 'Good value for money.' }
          ]
        };
        setProduct(fetchedProduct);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = (id: string, quantity: number) => {
    console.log(`Adding product ${id} (quantity: ${quantity}) to cart.`);
    // In a real app, dispatch to a cart context/reducer
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="product-details-page">
      <ProductDisplay product={product} onAddToCart={handleAddToCart} extraInfo={{ message: "Limited time offer!" }} />
      <style jsx>{`
        .product-details-page { padding: 20px; max-width: 800px; margin: 0 auto; }
        .product-display {
          display: flex; flex-direction: column; align-items: center;
          background-color: #fff; border: 1px solid #eee; border-radius: 8px;
          padding: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .product-image { max-width: 100%; height: auto; border-radius: 4px; margin-bottom: 20px; }
        h2 { color: #333; margin-bottom: 10px; }
        .product-description { color: #555; line-height: 1.6; margin-bottom: 15px; text-align: center; }
        .product-price { font-size: 24px; font-weight: bold; color: #e44d26; margin-bottom: 20px; }
        .product-actions { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
        .product-actions select {
          padding: 8px 12px; border: 1px solid #ccc; border-radius: 5px;
          font-size: 16px;
        }
        .product-actions button {
          background-color: #007bff; color: white; border: none;
          padding: 10px 20px; border-radius: 5px; font-size: 16px;
          cursor: pointer; transition: background-color 0.2s ease;
        }
        .product-actions button:hover:not(:disabled) { background-color: #0056b3; }
        .product-actions button:disabled { background-color: #cccccc; cursor: not-allowed; }
        .product-reviews { width: 100%; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
        .product-reviews h3 { color: #333; margin-bottom: 15px; text-align: center; }
        .review-item { background-color: #f9f9f9; border: 1px solid #eee; border-radius: 5px; padding: 15px; margin-bottom: 10px; }
        .review-item strong { color: #2c3e50; }
        .product-extra-info {
          background-color: #ffc107; color: #333; padding: 10px 15px;
          border-radius: 5px; margin-bottom: 20px; text-align: center; font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsPage;