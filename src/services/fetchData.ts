const API_URL = process.env.REACT_APP_API_URL;

interface Product {
  objectID: string;
  image: string;
  name: string;
  categories: string[];
  description: string;
  price: number;
  rating: number;
}

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products`);
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

export default fetchProducts;
