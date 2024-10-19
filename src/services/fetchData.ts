import { Product, FilterProductsProps } from '../types/products.types';

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

const fetchProductsParams = async (params: FilterProductsProps): Promise<Product[]> => {
  try {
    const matchNameProducts = await fetchProducts(`name_like=${params.nameSearch}`);
    const matchDescProducts = await fetchProducts(`description_like=${params.descSearch}`);

    const allSearchProducts = [...matchNameProducts, ...matchDescProducts];
    const uniqueSearchProducts = allSearchProducts.filter(
      (product, index, self) => index === self.findIndex((p) => p.objectID === product.objectID),
    );

    const matchSortProducts = await fetchProducts(`_sort=${params.sortBy}&_order=${params.sortOrder || 'asc'}`);
    const intersectProducts = matchSortProducts.filter((sortProduct) => uniqueSearchProducts.some(
      (searchProduct) => searchProduct.objectID === sortProduct.objectID,
    ));

    const offset = (params.page! - 1) * params.limit!;
    const currentProducts = intersectProducts.slice(offset, offset + params.limit!);

    params.setTotalPages(Math.ceil(intersectProducts.length / params.limit!));
    return currentProducts;
  } catch (error) {
    throw new Error(`Error fetching products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export default fetchProductsParams;
