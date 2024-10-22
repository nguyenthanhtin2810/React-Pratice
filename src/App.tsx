import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import fetchProductsParams from './services/fetchData';
import { Product } from './types/products.types';
import Header from './components/Header';
import Pagination from './components/Pagination';
import ProductGridFilter from './components/ProductGridFilter';
import useDebounce from './utils/useDebounce';

const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    searchTerm: params.get('searchTerm'),
    sortOption: params.get('sortOption'),
    limit: Number(params.get('limit')),
    page: Number(params.get('page')),
  };
};

const updateQueryParams = (newParams: { [key: string]: any }) => {
  const params = new URLSearchParams(window.location.search);
  Object.entries(newParams).forEach(([key, value]) => {
    if (value) params.set(key, value.toString());
    else params.delete(key);
  });
  window.history.replaceState({}, '', `?${params.toString()}`);
};

function App() {
  const initialParams = getQueryParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(initialParams.searchTerm || '');
  const [sortOption, setSortOption] = useState(initialParams.sortOption || '');
  const [productsPerPage, setProductsPerPage] = useState(initialParams.limit || 12);
  const [currentPage, setCurrentPage] = useState(initialParams.page || 1);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const loadProducts = async () => {
      const params: any = {
        nameSearch: debouncedSearchTerm,
        limit: productsPerPage,
        page: currentPage,
        sortBy: sortOption.split('-')[0],
        sortOrder: sortOption.split('-')[1],
        setTotalPages,
      };

      const currentProducts = await fetchProductsParams(params);
      setProducts(currentProducts);
    };

    loadProducts();

    updateQueryParams({
      searchTerm: debouncedSearchTerm,
      sortOption,
      limit: productsPerPage,
      page: currentPage,
    });
  }, [debouncedSearchTerm, sortOption, productsPerPage, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, sortOption, productsPerPage]);

  return (
    <div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="max-w-7xl mx-auto p-4 my-10">
        <ProductGridFilter
          sortOption={sortOption}
          setSortOption={setSortOption}
          productsPerPage={productsPerPage}
          setProductsPerPage={setProductsPerPage}
        />
        <ProductList
          products={products}
          searchTerm={debouncedSearchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default App;
