import React from 'react';
import { useTranslation } from 'react-i18next';
import { FilterHeaderProps } from '../types/products.types';
import clearFilter from '../assets/icon/return.svg';

function FilterHeader({ resetFilters }: FilterHeaderProps) {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between">
      <span className="text-xl font-bold">{t('filter')}</span>
      <button
        type="button"
        onClick={resetFilters}
        className=""
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
  );
}

export default FilterHeader;
