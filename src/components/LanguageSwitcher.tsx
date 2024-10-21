import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="flex justify-end space-x-2 mr-4 mt-4">
      <button
        type="button"
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-300 ${
          currentLanguage === 'vi' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => changeLanguage('vi')}
      >
        VI
      </button>
      <button
        type="button"
        className={`px-2 py-1 rounded-md text-sm font-medium transition-colors duration-300 ${
          currentLanguage === 'en' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSwitcher;
