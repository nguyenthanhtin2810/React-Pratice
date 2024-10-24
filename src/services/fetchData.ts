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
      brand: hit.brand,
    })) || [];

    const totalCount = parseInt(response.headers.get('x-total-count') || `${products.length}`, 10);

    return { products, totalCount };
  } catch (error) {
    throw new Error(`Error fetching products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

const buildFilterQueryString = (
  params: FilterProductsProps,
  excludeKeys: string[],
): string => {
  const queryParts = [
    params.nameSearch && `name_like=${params.nameSearch}`,
    !excludeKeys.includes('category') && params.category && `categories_like=${params.category}`,
    !excludeKeys.includes('brands') && params.brands && params.brands.map((value) => `brand=${value}`).join('&'),
    params.minPrice && `price_gte=${params.minPrice}`,
    params.maxPrice && `price_lte=${params.maxPrice}`,
    params.rating && `rating=${params.rating}`,
    params.freeShip && `free_shipping=${params.freeShip}`,
    params.sortBy && `_sort=${params.sortBy}&_order=${params.sortOrder || 'asc'}`,
    !excludeKeys.includes('page') && params.page && `_page=${params.page}`,
    !excludeKeys.includes('limit') && params.limit && `_limit=${params.limit}`,
  ];

  return queryParts.filter(Boolean).join('&');
};

const fetchProductsParams = async (params: FilterProductsProps): Promise<Product[]> => {
  try {
    const queryString = buildFilterQueryString(params, []);
    const { products, totalCount } = await fetchProducts(queryString);

    const excludeCategoryQueryString = buildFilterQueryString(params, ['category', 'page', 'limit']);
    const { products: excludeCategoryQueryProducts } = await fetchProducts(excludeCategoryQueryString);

    const excludeBrandsQueryString = buildFilterQueryString(params, ['brands', 'page', 'limit']);
    const { products: excludeBrandsQueryProducts } = await fetchProducts(excludeBrandsQueryString);

    params.setDisplayCategoryProducts(excludeCategoryQueryProducts);
    params.setDisplayBrandProducts(excludeBrandsQueryProducts);

    params.setTotalPages(Math.ceil(totalCount / params.limit!));
    return products;
  } catch (error) {
    throw new Error(`Error fetching products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export default fetchProductsParams;
