import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import { fetchSearchProducts } from './services/fetchData';
import { Product } from './types/.types';
import Header from './components/Header';
import useDebounce from './utils/useDebounce';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchSearchProducts({
        nameSearch: debouncedSearchTerm,
        descSearch: debouncedSearchTerm,
      });

      setProducts(productsData);
    };

    loadProducts();
  }, [debouncedSearchTerm]);

  return (
    <div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="max-w-7xl mx-auto p-4">
        <ProductList products={products} searchTerm={debouncedSearchTerm} />
      </div>
    </div>
  );
}

export default App;
