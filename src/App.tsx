import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import fetchProductsParams from './services/fetchData';
import { Product } from './types/products.types';
import Header from './components/Header';
import Pagination from './components/Pagination';
import ProductGridFilter from './components/ProductGridFilter';
import CategoryFilter from './components/CategoryFilter';
import FilterHeader from './components/FilterHeader';
import BrandFilter from './components/BrandFilter';
import useDebounce from './utils/useDebounce';

const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    searchTerm: params.get('searchTerm'),
    sortOption: params.get('sortOption'),
    limit: Number(params.get('limit')),
    page: Number(params.get('page')),
    category: params.get('category'),
    brands: params.get('brands')?.split(','),
  };
};

const updateQueryParams = (newParams: { [key: string]: any }) => {
  const params = new URLSearchParams(window.location.search);
  Object.entries(newParams).forEach(([key, value]) => {
    if (String(value) || (Array.isArray(value) && value.length > 0)) {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }
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
  const [category, setCategory] = useState(initialParams.category || '');
  const [selectedLevel1, setSelectedLevel1] = useState<string>('');
  const [selectedLevel2, setSelectedLevel2] = useState<string>('');
  const [displayCategoryProducts, setDisplayCategoryProducts] = useState<Product[]>([]);
  const [brands, setBrand] = useState<string[]>(initialParams.brands || []);
  const [displayBrandProducts, setDisplayBrandProducts] = useState<Product[]>([]);
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
        category,
        setDisplayCategoryProducts,
        brands,
        setDisplayBrandProducts,
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
      category,
      brands,
    });
  }, [debouncedSearchTerm, sortOption, productsPerPage, category, brands, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, sortOption, productsPerPage, category, brands]);

  const resetFilters = () => {
    setSearchTerm('');
    setSortOption('');
    setProductsPerPage(12);
    setCurrentPage(1);
    setCategory('');
    setSelectedLevel1('');
    setSelectedLevel2('');
    setBrand([]);
  };

  return (
    <div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="max-w-7xl mx-auto p-4 mt-10 flex">
        <div className="w-1/5 mr-10 border-b pb-8">
          <FilterHeader resetFilters={resetFilters} />
        </div>
        <div className="w-4/5 border-b pb-8">
          <ProductGridFilter
            sortOption={sortOption}
            setSortOption={setSortOption}
            productsPerPage={productsPerPage}
            setProductsPerPage={setProductsPerPage}
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-4 flex">
        <div className="w-1/5 mr-10">
          <CategoryFilter
            products={displayCategoryProducts}
            selectedLevel1={selectedLevel1}
            setSelectedLevel1={setSelectedLevel1}
            selectedLevel2={selectedLevel2}
            setSelectedLevel2={setSelectedLevel2}
            setCategory={setCategory}
          />
          <hr className="my-8" />
          <BrandFilter
            products={displayBrandProducts}
            brands={brands}
            setBrand={setBrand}
          />
        </div>
        <div className="w-4/5">
          <ProductList
            products={products}
            searchTerm={debouncedSearchTerm}
            resetFilters={resetFilters}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
