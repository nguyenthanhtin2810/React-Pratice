import { Product, SearchProductsProps } from '../types/.types';

const API_URL = process.env.REACT_APP_API_URL;

const fetchProducts = async (param?: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products?${param}`);
    const data = await response.json();
    const Products = data.map((hit: any) => ({
      objectID: hit.objectID,
      image: hit.image,
      name: hit.name,
      categories: hit.categories,
      description: hit.description,
      price: hit.price,
      rating: hit.rating,
    })) || [];

    return Products;
  } catch (error) {
    throw new Error(`Error fetching products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

const fetchSearchProducts = async (params: SearchProductsProps): Promise<Product[]> => {
  try {
    const matchNameProducts = await fetchProducts(`name_like=${params.nameSearch}`);
    const matchDescProducts = await fetchProducts(`description_like=${params.descSearch}`);
    const allProducts = [...matchNameProducts, ...matchDescProducts];

    const uniqueProducts = allProducts.filter(
      (product, index, self) => index === self.findIndex((p) => p.objectID === product.objectID),
    );

    return uniqueProducts;
  } catch (error) {
    throw new Error(`Error fetching products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export { fetchProducts, fetchSearchProducts };
