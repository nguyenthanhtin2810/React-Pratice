import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchBar from './SearchBar';
import { BrandFilterProps } from '../types/products.types';
import highlightText from '../utils/highlightText';

function BrandFilter({
  products, brands, setBrand,
}: BrandFilterProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const uniqueBrands = Array.from(
    new Set(products.map((product) => product.brand)),
  ).filter((brand) => brand !== undefined);

  const unionBrands = Array.from(
    new Set([...uniqueBrands, ...brands]),
  );

  const filteredBrands = unionBrands.filter((brand) => brand.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleBrandClick = (clickedBrand: string) => {
    const updatedBrands = brands.includes(clickedBrand)
      ? brands.filter((b) => b !== clickedBrand)
      : [...brands, clickedBrand];

    setBrand(updatedBrands);
  };

  const getProductCount = (brand: string) => products.filter((product) => product.brand === brand).length || 0;

  return (
    <div className="text-sm space-y-3">
      <h3 className="text-xs font-semibold">{t('brand')}</h3>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder={t('brand_placeholder')}
        css={[
          'left-3 top-3',
          'px-10 py-3',
          'right-3 top-3',
        ]}
      />
      <ul className="mt-3 max-h-64 overflow-hidden hover:overflow-y-auto space-y-2 p-2">
        {filteredBrands.map((brand) => (
          <li key={brand}>
            <div className="flex items-center cursor-pointer">
              <button
                type="button"
                className={`w-4 h-4 border-2 border-gray-400 rounded flex items-center justify-center mr-2 
                  ${brands.includes(brand) ? 'bg-yellow-600' : ''}`}
                onClick={() => handleBrandClick(brand)}
              >
                {brands.includes(brand) && <div className="w-1 h-1 bg-white rounded-full" />}
              </button>
              {highlightText(brand, searchTerm)}
              <span className="ml-2 text-[10px] text-gray-600 bg-gray-100 px-1 rounded font-bold">
                {getProductCount(brand)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrandFilter;
