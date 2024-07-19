import { ReactNode } from "react";

interface ProductModalProps {
  children: ReactNode;
}

const ProductModal = ({ children }: ProductModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded">{children}</div>
    </div>
  );
};

export default ProductModal;
