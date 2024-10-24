import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchBarProps } from '../types/products.types';
import searchIcon from '../assets/icon/search.svg';
import closeIcon from '../assets/icon/close.svg';

function SearchBar({
  searchTerm, setSearchTerm, placeholder, css,
}: SearchBarProps) {
  const { t } = useTranslation();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <img
        src={searchIcon}
        alt="Search icon"
        className={`h-5 w-5 absolute text-yellow-600 ${css[0]}`}
      />

      <input
        type="text"
        className={`w-full text-sm text-black rounded-md border border-gray-300 focus:outline-none ${css[1]}`}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
      />

      {searchTerm && (
        <button
          type="button"
          onClick={() => setSearchTerm('')}
          aria-label={t('label_clearsearch')}
        >
          <img
            src={closeIcon}
            alt="Clear search icon"
            className={`h-5 w-5 text-black absolute ${css[2]}`}
          />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
