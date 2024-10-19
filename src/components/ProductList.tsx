import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProductListProps } from '../types/products.types';
import Tooltip from './Tooltip';
import starSolid from '../assets/icon/star-solid.svg';
import clearFilter from '../assets/icon/return.svg';
import searchCricle from '../assets/icon/search-circle.svg';

function ProductList({ products, searchTerm, setSearchTerm }: ProductListProps) {
  const { t } = useTranslation();
  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const key = part.toLowerCase() === query.toLowerCase() ? `highlight-${index}` : `normal-${index}`;
      return part.toLowerCase() === query.toLowerCase() ? (
        <span key={key} className="bg-yellow-300">{part}</span>
      ) : (
        <span key={key}>{part}</span>
      );
    });
  };

  return (
    <div>
      {products.length > 0 ? (
        <ol className="grid grid-cols-4 gap-x-4 gap-y-8 p-4">
          {products.map((product) => (
            <li key={product.objectID} className="rounded-md transition-shadow duration-300 hover:shadow-xl hover:scale-105 p-4">
              <div className="group relative z-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain mb-10"
                />
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 bg-opacity-50 text-yellow-600 text-lg font-bold"
                >
                  {t('add_to_cart')}
                </button>
              </div>
              <p className="font-semibold uppercase mb-2 leading-4 opacity-70 text-xs">
                {product.categories[0]}
              </p>
              <h3 className="font-bold text-sm cursor-pointer hover:text-yellow-600">
                {highlightText(product.name, searchTerm)}
              </h3>
              <Tooltip text={product.description}>
                <p className="text-sm line-clamp-3">
                  {product.description}
                </p>
              </Tooltip>
              <div className="text-xs mt-2 flex items-center">
                <span className="text-yellow-600">$</span>
                <strong className="ml-1 text-sm">
                  {product.price}
                </strong>
                <span className="text-yellow-600 ml-2 rounded border border-yellow-600 px-1 flex items-center">
                  <img
                    src={starSolid}
                    alt="Rating star"
                    className="w-2 h-2 mr-1"
                  />
                  {product.rating}
                </span>
              </div>
            </li>
          ))}
        </ol>      
      ) : (
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <div className="max-w-xs space-y-4">
            <img
              src={searchCricle}
              alt="Search cricle icon"
              className="m-auto"
            />
            <p className="text-lg font-semibold">{t('cant_find')}</p>
            <p className="text-md text-gray-500">{t('try_filter')}</p>
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-gray-200 rounded transition hover:bg-yellow-400"
            >
              <div className="flex text-sm">
                <img
                  src={clearFilter}
                  alt="Clear filter icon"
                  className="mr-1"
                />
                <span>{t('clear_filter')}</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
