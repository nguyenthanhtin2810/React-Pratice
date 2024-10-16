import React from 'react';
import starSolid from '../assets/icon/star-solid.svg';
import Tooltip from './Tooltip';

interface Product {
  objectID: string;
  image: string;
  name: string;
  categories: string[];
  description: string;
  price: number;
  rating: number;
}

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <ol className="grid grid-cols-4 gap-x-4 gap-y-8 p-4">
      {products.map((product) => (
        <li key={product.objectID} className="rounded-md transition-shadow duration-300 hover:shadow-xl hover:scale-105 p-4">
          <div className="group relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-10"
            />
            <button
              type="button"
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 bg-opacity-50 text-yellow-600 text-lg font-bold"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
          <p className="font-semibold uppercase mb-2 leading-4 opacity-70 text-xs">
            {product.categories[0]}
          </p>
          <h3 className="font-bold text-sm cursor-pointer hover:text-yellow-600">
            {product.name}
          </h3>
          <Tooltip text={product.description}>
            <p className="text-sm line-clamp-3">
              {product.description}
            </p>
          </Tooltip>
          <div className="text-xs mt-2 flex items-center">
            <span className="text-yellow-600">$</span>
            <strong className="ml-1 text-sm">
              {product.price}
            </strong>
            <span className="text-yellow-600 ml-2 rounded border border-yellow-600 px-1 flex items-center">
              <img
                src={starSolid}
                alt="Rating star"
                className="w-2 h-2 mr-1"
              />
              {product.rating}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default ProductList;
