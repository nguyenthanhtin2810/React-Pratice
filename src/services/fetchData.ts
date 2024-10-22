import { Product, FilterProductsProps } from '../types/products.types';

const API_URL = process.env.REACT_APP_API_URL;

const fetchProducts = async (param?: string): Promise<{ products: Product[]; totalCount: number }> => {
  try {
    const response = await fetch(`${API_URL}/products?${param}`);
    const data = await response.json();
    const products = data.map((hit: any) => ({
      objectID: hit.objectID,
      image: hit.image,
      name: hit.name,
      categories: hit.categories,
      description: hit.description,
      price: hit.price,
      rating: hit.rating,
    })) || [];

    const totalCount = parseInt(response.headers.get('x-total-count') || `${products.length}`, 10);

    return { products, totalCount };
  } catch (error) {
    throw new Error(`Error fetching products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

const buildFilterQueryString = (
  params: FilterProductsProps,
): string => {
  const queryParts = [
    params.nameSearch && `name_like=${params.nameSearch}`,
    params.category && `categories_like=${params.category}`,
    params.brands && params.brands.map((value) => `brand=${value}`).join('&'),
    params.minPrice && `price_gte=${params.minPrice}`,
    params.maxPrice && `price_lte=${params.maxPrice}`,
    params.rating && `rating=${params.rating}`,
    params.freeShip && `free_shipping=${params.freeShip}`,
    params.sortBy && `_sort=${params.sortBy}&_order=${params.sortOrder || 'asc'}`,
    params.page && `_page=${params.page}`,
    params.limit && `_limit=${params.limit}`,
  ];

  return queryParts.filter(Boolean).join('&');
};

const fetchProductsParams = async (params: FilterProductsProps): Promise<Product[]> => {
  try {
    const queryString = buildFilterQueryString(params)
    const { products, totalCount } = await fetchProducts(queryString);

    params.setTotalPages(Math.ceil(totalCount / params.limit!));
    return products;
  } catch (error) {
    throw new Error(`Error fetching products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export default fetchProductsParams;
