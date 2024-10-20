import React from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryFilterProps } from '../types/products.types';
import Triangle from '../assets/icon/triangle.svg';

function CategoryFilter({
  products, selectedLevel1, setSelectedLevel1, selectedLevel2, setSelectedLevel2, setCategory,
}: CategoryFilterProps) {
  const { t } = useTranslation();
  const uniqueCategories: { [key: string]: string[] } = {};

  products.forEach((product) => {
    const levels = product.categories;
    const level1 = levels[0];
    const level2 = levels[1];

    if (!uniqueCategories[level1]) {
      uniqueCategories[level1] = [];
    }

    if (level2 && !uniqueCategories[level1].includes(level2)) {
      uniqueCategories[level1].push(level2);
    }
  });

  const handleLevel1Click = (level1Category: string) => {
    const isSelected = selectedLevel1 === level1Category;

    setSelectedLevel1(isSelected ? '' : level1Category);
    setCategory(isSelected ? '' : level1Category);
    if (!isSelected) {
      setSelectedLevel2('');
    }
  };

  const handleLevel2Click = (level2Category: string, level1Category: string) => {
    const isSelected = selectedLevel2 === level2Category;

    setSelectedLevel2(isSelected ? '' : level2Category);
    setCategory(isSelected ? level1Category : level2Category);
    if (!isSelected) {
      setSelectedLevel1(level1Category);
    }
  };

  const getProductCount = (category: string, level: number) => products.filter((product) => product.categories[level - 1] === category).length || 0;

  return (
    <div className="text-sm">
      <h3 className="text-xs font-semibold">{t('category')}</h3>
      <ul className="mt-3 space-y-3 max-h-80 overflow-hidden hover:overflow-y-auto">
        {Object.keys(uniqueCategories).map((level1Category) => (
          <li key={level1Category}>
            <button
              type="button"
              onClick={() => handleLevel1Click(level1Category)}
              className={`flex items-center cursor-pointer ${selectedLevel1 === level1Category ? 'font-bold' : ''}`}
            >
              <img
                src={Triangle}
                alt="Triangle icon"
                className={`transition-transform duration-200 transform mr-2 ${
                  selectedLevel1 === level1Category ? 'rotate-180' : ''
                }`}
              />
              {level1Category}
              <span className="ml-2 text-[10px] text-gray-600 bg-gray-100 px-1 rounded font-bold">
                {getProductCount(level1Category, 1)}
              </span>
            </button>
            {selectedLevel1 === level1Category && (
              <ul className="ml-3 mt-3 space-y-3">
                {uniqueCategories[level1Category].map((level2Category) => (
                  <li key={level2Category}>
                    <button
                      type="button"
                      onClick={() => handleLevel2Click(level2Category, level1Category)}
                      className={`flex items-center cursor-pointer ${selectedLevel2 === level2Category ? 'font-bold' : ''}`}
                    >
                      <img
                        src={Triangle}
                        alt="Triangle icon"
                        className={`transition-transform duration-200 transform mr-2 ${
                          selectedLevel2 === level2Category ? 'rotate-180' : ''
                        }`}
                      />
                      {level2Category}
                      <span className="ml-2 text-[10px] text-gray-600 bg-gray-100 px-1 rounded font-bold">
                        {getProductCount(level2Category, 2)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilter;
