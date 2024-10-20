export interface Product {
  objectID: string;
  image: string;
  name: string;
  categories: string[];
  description: string;
  price: number;
  rating: number;
  brand: string;
}

export interface ProductListProps {
  products: Product[];
  searchTerm: string;
  resetFilters: () => void;
}

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  placeholder: string;
  css: string[];
}

export interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export interface FilterProductsProps {
  nameSearch?: string;
  category?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  freeShip?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  setTotalPages: (pages: number) => void;
  setDisplayCategoryProducts: (products: Product[]) => void;
  setDisplayBrandProducts: (products: Product[]) => void;
}

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export interface ProductGridFilterProps {
  sortOption: string;
  setSortOption: (option: string) => void;
  productsPerPage: number;
  setProductsPerPage: (count: number) => void;
}

interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps {
  options: SelectOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}

export interface CategoryFilterProps {
  products: Product[];
  selectedLevel1: string;
  setSelectedLevel1: (category: string) => void;
  selectedLevel2: string;
  setSelectedLevel2: (category: string) => void;
  setCategory: (page: string) => void;
}

export interface FilterHeaderProps {
  resetFilters: () => void;
}

export interface BrandFilterProps {
  products: Product[];
  brands: string[];
  setBrand: (brands: string[]) => void;
}
