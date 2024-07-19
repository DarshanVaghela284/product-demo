import React from "react";
import { Product } from "../types/APIresponseTypes";

interface ProductProps extends Product {
  image: string;
}

const ProductCard = ({
  product,
  setSelectedProduct,
}: {
  product: ProductProps;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}) => {
  return (
    <div className="max-w-[300px] bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        className="w-full h-48 object-cover"
        src={product.image}
        alt={product.name}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
        <p className="font-semibold">Rs. {product.price}</p>
        <button
          className="mt-4 px-10 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold text-white py-2 transition-colors"
          onClick={() => setSelectedProduct(product)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
