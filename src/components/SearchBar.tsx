import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchBarProps } from '../types/.types';
import searchIcon from '../assets/icon/search.svg';
import closeIcon from '../assets/icon/close.svg';

function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  const { t } = useTranslation();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <img
        src={searchIcon}
        alt="Search icon"
        className="h-5 w-5 absolute left-8 top-5 text-yellow-600"
      />

      <input
        type="text"
        className="w-full text-sm text-black px-14 py-5 rounded-md border border-gray-300 focus:outline-none"
        placeholder={t('header_placeholder')}
        value={searchTerm}
        onChange={handleInputChange}
      />

      {searchTerm && (
        <button
          type="button"
          onClick={() => setSearchTerm('')}
          aria-label="Clear search"
        >
          <img
            src={closeIcon}
            alt="Clear search icon"
            className="h-5 w-5 text-black absolute right-8 top-6"
          />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
