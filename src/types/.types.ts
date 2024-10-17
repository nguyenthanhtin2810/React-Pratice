export interface Product {
  objectID: string;
  image: string;
  name: string;
  categories: string[];
  description: string;
  price: number;
  rating: number;
} 

export interface ProductListProps {
  products: Product[];
  searchTerm: string;
}

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export interface SearchProductsProps {
  nameSearch?: string;
  descSearch?: string;
}
