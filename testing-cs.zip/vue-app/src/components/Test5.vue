<template>
  <div class="product-list-container">
    <h2>Available Products</h2>
    <p>Render Cycles: {{ renderCount }}</p>

    <input
      type="text"
      placeholder="Search products..."
      v-model="searchQuery"
      class="search-input"
    />

    <div class="product-cards">
      <div v-for="product in getFilteredProducts()" :key="product.id" class="product-card">
        <h3>{{ product.name }}</h3>
        <p class="category">Category: {{ product.category }}</p>
        <p class="price">Price: ${{ product.price.toFixed(2) }}</p>
        <p class="description">{{ getTruncatedDescription(product.description) }}</p>

        <div class="card-actions">
          <button @click="() => viewDetails(product.id)">View Details</button>
          <button @click="() => addToCart(product.id, 1)">Add to Cart</button>
          <span v-if="isProductDiscounted(product.id)" class="discount-badge">
            {{ calculateDiscountPercentage(product.id) }}% Off!
          </span>
        </div>
      </div>
    </div>

    <div class="summary">
      <h4>Summary</h4>
      <p>Total products displayed: {{ getTotalProductsCount() }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
}

export default defineComponent({
  name: 'ProductCardList',
  setup() {
    const products = ref<Product[]>([
      { id: 1, name: 'Wireless Headphones', description: 'Experience immersive audio with these premium headphones. Long-lasting battery and comfortable fit.', category: 'Electronics', price: 120.00, discountPercentage: 10 },
      { id: 2, name: 'Smartwatch Series 5', description: 'Track your fitness, monitor your health, and stay connected on the go.', category: 'Electronics', price: 299.99 },
      { id: 3, name: 'Organic Coffee Beans', description: 'Ethically sourced, single-origin coffee beans. Rich aroma and smooth taste.', category: 'Food & Beverage', price: 15.50 },
      { id: 4, name: 'Ergonomic Office Chair', description: 'Designed for maximum comfort and support during long working hours. Adjustable features.', category: 'Office', price: 350.00, discountPercentage: 15 },
      { id: 5, name: 'Portable Bluetooth Speaker', description: 'Compact and powerful, take your music anywhere. Waterproof design.', category: 'Electronics', price: 75.00 },
      { id: 6, name: 'Yoga Mat Pro', description: 'Non-slip surface, extra thick for superior cushioning. Eco-friendly materials.', category: 'Fitness', price: 40.00 },
    ]);
    const searchQuery = ref('');
    const renderCount = ref(0);

    watch(
      () => ({ products: products.value, searchQuery: searchQuery.value }),
      () => {
        renderCount.value++;
      },
      { deep: true, immediate: true }
    );

    const getFilteredProducts = (): Product[] => {
      console.log('Filtering products...');
      return products.value.filter(product =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    };

    const getTruncatedDescription = (description: string): string => {
      return description.length > 80 ? description.substring(0, 77) + '...' : description;
    };

    const viewDetails = (productId: number) => {
      alert(`Viewing details for product ID: ${productId}`);
      console.log(`Navigating to product ${productId} details page.`);
    };

    const addToCart = (productId: number, quantity: number) => {
      console.log(`Added product ${productId} (x${quantity}) to cart.`);
    };

    const isProductDiscounted = (productId: number): boolean => {
      console.log(`Checking discount for product ${productId}`);
      const product = products.value.find(p => p.id === productId);
      return (product?.discountPercentage ?? 0) > 0;
    };

    const calculateDiscountPercentage = (productId: number): number => {
      console.log(`Calculating discount percentage for product ${productId}`);
      const product = products.value.find(p => p.id === productId);
      return product?.discountPercentage ?? 0;
    };

    const getTotalProductsCount = (): number => {
      console.log('Calculating total products count...');
      return products.value.length;
    };

    return {
      products,
      searchQuery,
      renderCount,
      getFilteredProducts,
      getTruncatedDescription,
      viewDetails,
      addToCart,
      isProductDiscounted,
      calculateDiscountPercentage,
      getTotalProductsCount,
    };
  },
});
</script>

<style scoped>
.product-list-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  color: #34495e;
  text-align: center;
  margin-bottom: 25px;
}

.search-input {
  width: calc(100% - 20px);
  padding: 12px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.product-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.product-card {
  background-color: #ffffff;
  border: 1px solid #e0e6ed;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-card h3 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.product-card .category {
  font-size: 0.9em;
  color: #7f8c8d;
  margin-bottom: 5px;
}

.product-card .price {
  font-size: 1.1em;
  font-weight: bold;
  color: #27ae60;
  margin-bottom: 15px;
}

.product-card .description {
  font-size: 0.95em;
  color: #5d6d7e;
  flex-grow: 1;
}

.card-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.card-actions button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 9px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.card-actions button:hover {
  background-color: #2980b9;
}

.discount-badge {
  background-color: #e74c3c;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.85em;
  margin-left: auto;
}

.summary {
  margin-top: 40px;
  text-align: center;
  padding: 20px;
  background-color: #ecf0f1;
  border-radius: 10px;
}

.summary h4 {
  color: #34495e;
  margin-bottom: 10px;
}
</style>
