import React, { useState } from "react";
import { useGetAllProducts } from "../api/hooks";
import AddOrEditProduct from "./AddOrEditProduct";
import { Product } from "../types/APIresponseTypes";
import ProductCard from "./ProductCard";
import Pagination from "./common/pagination";
import Loader from "./common/Loader";
import NoProductsFoundBanner from "./NoProductFoundBanner";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  search: string;
  sort: string;
  selectedDateRange: {
    startDate: Date;
    endDate: Date;
  };
}

const ProductListing = ({
  setIsModalOpen,
  isModalOpen,
  search,
  selectedDateRange,
  sort,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data, isPending } = useGetAllProducts(
    currentPage,
    search,
    sort,
    selectedDateRange
  );

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-wrap md:gap-4 gap-3 lg:gap-8">
        {(data?.data?.products || []).map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            setSelectedProduct={setSelectedProduct}
          />
        ))}
        {data?.data?.total === 0 && <NoProductsFoundBanner />}
      </div>
      {data?.data?.total !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((data?.data?.total || 0) / 10)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
      {(isModalOpen || selectedProduct) && (
        <AddOrEditProduct product={selectedProduct} closeModal={closeModal} />
      )}
    </>
  );
};

export default ProductListing;
