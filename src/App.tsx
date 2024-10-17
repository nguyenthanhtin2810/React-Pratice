import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import fetchProducts from './services/fetchData';

interface Product {
  objectID: string;
  image: string;
  name: string;
  categories: string[];
  description: string;
  price: number;
  rating: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };

    loadProducts();
  }, []);

  return (
    <ProductList products={products} />
  );
}

export default App;
