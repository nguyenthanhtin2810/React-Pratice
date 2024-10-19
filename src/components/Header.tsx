import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderProps } from '../types/products.types';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';

function Header({ searchTerm, setSearchTerm }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="flex flex-col justify-center items-center text-white min-h-[368px] header-background p-2">
      <a
        href="https://algolia.com"
        className="text-lg font-semibold mb-10"
      >
        <span>algolia</span>
      </a>
      <p className="text-4xl font-light mb-10">
        {t('slogan')}
      </p>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="absolute top-2 right-2">
        <LanguageSwitcher />
      </div>
    </header>
  );
}

export default Header;
