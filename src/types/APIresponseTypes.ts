export interface Product {
    _id: string;
    name: string;
    image_link: string;
    image: string;
    price: number;
}

interface CommonResponse {
    code: number;
    message: string;

}

export interface GetAllProductsResponse extends CommonResponse {
    data: {
        products: Product[];
        total: number;
        current_page: number;
        totalPages: number
    };
}

export interface UploadImageResponse extends CommonResponse {
    data: {
        _id: string;
    }
}

export interface AddProductResponse extends CommonResponse {
    data: null
}