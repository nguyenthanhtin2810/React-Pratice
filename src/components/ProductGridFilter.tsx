import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProductGridFilterProps } from '../types/products.types';
import Select from './Select';

function ProductGridFilter({
  sortOption, setSortOption, productsPerPage, setProductsPerPage,
}: ProductGridFilterProps) {
  const { t } = useTranslation();

  const sortOptions = [
    { label: t('sort_featured'), value: '' },
    { label: t('price_asc'), value: 'price-asc' },
    { label: t('price_desc'), value: 'price-desc' },
  ];

  const productsPerPages = [
    { label: `12 ${t('per_pages')}`, value: 12 },
    { label: `24 ${t('per_pages')}`, value: 24 },
    { label: `36 ${t('per_pages')}`, value: 36 },
  ];

  return (
    <div className="flex justify-end text-xs">
      <Select
        options={sortOptions}
        value={sortOption}
        onChange={(value) => setSortOption(String(value))}
        className="mr-2"
      />
      <Select
        options={productsPerPages}
        value={productsPerPage}
        onChange={(value) => setProductsPerPage(Number(value))}
      />
    </div>
  );
}

export default ProductGridFilter;
