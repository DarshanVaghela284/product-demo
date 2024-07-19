import { QueryFunctionContext } from "@tanstack/react-query";
import axiosClient from "./axiosClient";
import { apiRoutes } from "./apiRoutes";
import { AddProductResponse, GetAllProductsResponse, Product, UploadImageResponse } from '../types/APIresponseTypes';

export const uploadImage = async (payload: FormData): Promise<UploadImageResponse> => {
    const data = await axiosClient.post(apiRoutes.uploadImage, payload)
    return data.data
}

export const getAllProducts = async ({ queryKey }: QueryFunctionContext): Promise<GetAllProductsResponse> => {
    const data = await axiosClient.get(apiRoutes.getAllProducts, {
        params: {
            page: queryKey[1] || 1,
            page_size: 10,
            search: queryKey[2] || "",
            sort: queryKey[3] || "",
            startDate: queryKey[4] || new Date(),
            endDate: queryKey[5] || new Date(),
        }
    })
    return data.data

}

export const addProduct = async (Payload: Omit<Product, Product["_id"]>): Promise<GetAllProductsResponse> => {
    const data = await axiosClient.post(apiRoutes.addProduct, Payload)
    return data.data
}

export const editProduct = async ({ payload, _id }: { payload: Omit<Product, Product["_id"]>, _id: string; }): Promise<AddProductResponse> => {
    const data = await axiosClient.put(`${apiRoutes.editProduct}` + _id, payload)
    return data.data
}
