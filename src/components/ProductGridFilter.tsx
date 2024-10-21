import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProductGridFilterProps } from '../types/products.types';

function ProductGridFilter({
  sortOption, setSortOption, productsPerPage, setProductsPerPage,
}: ProductGridFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-end text-xs">
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="p-1 focus:outline focus:outline-2 mr-2"
      >
        <option value="">{t('sort_featured')}</option>
        <option value="price-asc">{t('price_asc')}</option>
        <option value="price-desc">{t('price_desc')}</option>
      </select>

      <select
        value={productsPerPage}
        onChange={(e) => setProductsPerPage(Number(e.target.value))}
        className="p-1 focus:outline focus:outline-2"
      >
        <option value={12}>
          <span>12 </span>
          {t('per_pages')}
        </option>
        <option value={24}>
          <span>24 </span>
          {t('per_pages')}
        </option>
        <option value={36}>
          <span>36 </span>
          {t('per_pages')}
        </option>
      </select>
    </div>
  );
}

export default ProductGridFilter;
