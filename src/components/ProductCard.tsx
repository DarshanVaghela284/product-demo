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
    <div
      key={product._id}
      className="border w-[250px] h-[380px] rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
        <p className="font-semibold">Rs. {product.price}</p>
        <button
          className="mt-4 px-10 rounded-full bg-blue-600 hover:bg-blue-700 font-semibold text-white py-2 transition-colors"
          onClick={() => setSelectedProduct(product)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
