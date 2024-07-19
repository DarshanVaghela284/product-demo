import React, { useEffect, useRef } from "react";
import { useAddProduct, useEditProduct, useUploadImage } from "../api/hooks";
import Input from "./common/input";
import { invalidateQuery } from "../api/queryClient";
import { cacheKeys } from "../api/cacheKey";
import { Product } from "../types/APIresponseTypes";
import { toast } from "react-toastify";
import { useForm } from "../hooks/useForm";
import { validateForm } from "../utils/formvalidation";
import { FaCheckCircle } from "react-icons/fa";
import useOutsideClick from "../hooks/useOutsideClick";

interface ProductModalProps {
  product: Product | null;
  closeModal: () => void;
}

const AddOrEditProduct: React.FC<ProductModalProps> = ({
  product,
  closeModal,
}) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    }
  }, []);

  useOutsideClick(containerRef, () => {
    closeModal();
    setFormData({
      name: "",
      price: 0,
      image_link: "",
    });
  });

  const { mutate: addProduct, isPending: isAddProductPending } =
    useAddProduct();
  const { mutate: uploadImage, isPending: isUploadImagePending } =
    useUploadImage();
  const { mutate: editProduct, isPending: isEditProductPending } =
    useEditProduct();

  const {
    formData,
    errors,
    handleInputChange,
    handleInputBlur,
    setErrors,
    setFormData,
  } = useForm({ name: "", price: 0, image_link: "" });

  const handleSubmit = async () => {
    const { isValid, errors } = validateForm(formData, {
      name: "",
      price: "",
      image_link: "",
    });

    if (!isValid) {
      setErrors(errors);
      return;
    }

    if (product) {
      editProduct(
        {
          payload: {
            name: formData.name,
            price: formData.price,
            image_link: formData.image_link,
          },
          _id: product._id,
        },
        {
          onSuccess: () => {
            toast.success("Product Edited Successfully!");
            invalidateQuery([cacheKeys.products]);
            closeModal();
          },
          onError: () => {
            toast.error("Error while Editing Product!");
          },
        }
      );
    } else {
      addProduct(formData, {
        onSuccess: () => {
          toast.success("Product Added Successfully!");
          invalidateQuery([cacheKeys.products]);
          closeModal();
        },
        onError: () => {
          toast.error("Error while Adding Product!");
        },
      });
    }
  };

  const onImageChange = async (imageData: any) => {
    const uploadData = new FormData();
    uploadData.append("file_upload", imageData);

    uploadImage(uploadData, {
      onSuccess: (response) => {
        toast.success("Image Uploaded!");
        setFormData((prev) => ({ ...prev, image_link: response.data._id }));
        setErrors((pre) => ({ ...pre, image_link: "" }));
      },

      onError: () => {
        toast.error("Error while uploading Image!");
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded max-w-md w-full" ref={containerRef}>
        <h2 className="text-2xl font-bold mb-4">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <Input
            type="text"
            name="name"
            className="w-full p-2 border rounded"
            value={formData.name}
            error={errors.name}
            onBlur={handleInputBlur}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700">Price</label>
          <Input
            name="price"
            type="number"
            className="w-full p-2 border rounded"
            value={formData.price}
            error={errors.price}
            onBlur={handleInputBlur}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center relative mb-4">
          <label className="cursor-pointer bg-blue-600 font-semibold text-white py-2 px-4 rounded flex items-center">
            Upload Image
            <input
              type="file"
              className="hidden"
              onChange={(e) => onImageChange(e.target.files?.[0])}
            />
            {formData.image_link && (
              <FaCheckCircle
                className="ml-2 text-white"
                title="Image uploaded successfully"
              />
            )}
          </label>
          {errors.image_link && (
            <span className="text-red-500 text-xs absolute bottom-[-17px] left-0">
              {errors.image_link}
            </span>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="font-semibold px-6 py-2 rounded-md border border-solid mr-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            disabled={
              isAddProductPending ||
              isUploadImagePending ||
              isEditProductPending
            }
            onClick={handleSubmit}
            className="bg-blue-600 disabled:cursor-not-allowed text-white font-semibold px-7 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrEditProduct;
