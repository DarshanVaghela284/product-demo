import { useMutation, useQuery } from "@tanstack/react-query";
import { addProduct, getAllProducts, uploadImage, editProduct } from "./services";
import { cacheKeys } from "./cacheKey";

export const useGetAllProducts = (currentPage: number, search: string, sort: string,
    selectedDateRange: {
        startDate: Date;
        endDate: Date;
    }

) => useQuery({
    queryFn: getAllProducts,
    queryKey: [cacheKeys.products, currentPage, search, sort, selectedDateRange.startDate, selectedDateRange.endDate]
})

export const useUploadImage = () => useMutation({
    mutationFn: uploadImage
})

export const useAddProduct = () => useMutation({
    mutationFn: addProduct,
})

export const useEditProduct = () => useMutation({
    mutationFn: editProduct,
})