import adminApi from "../../config/admin.api.config";
import {
    PRODUCT_API_ENDPOINTS,
    PRODUCT_ERROR_MESSAGE,
    PRODUCT_CREATION_ERROR_MESSAGE,
    PRODUCT_UPDATE_ERROR_MESSAGE,
    PRODUCT_DELETION_ERROR_MESSAGE,
    PRODUCT_SEARCH_ERROR_MESSAGE,
    PRODUCT_CATEGORY_ERROR_MESSAGE,
    PRODUCT_PRICE_RANGE_ERROR_MESSAGE,
    PRODUCT_STOCK_ERROR_MESSAGE
} from "../../constants/product.constant";
import {CreateProductRequest, ProductDTO, UpdateProductRequest} from "../../types/product.types.tsx";

class ProductService {
    async getAllProducts(): Promise<ProductDTO[]> {
        try {
            const response = await adminApi.get<ProductDTO[]>(PRODUCT_API_ENDPOINTS.GET_ALL_PRODUCTS);
            return response.data;
        } catch (err) {
            console.error(PRODUCT_ERROR_MESSAGE, err);
            throw new Error(PRODUCT_ERROR_MESSAGE);
        }
    }

    async getProductById(productId: number): Promise<ProductDTO> {
        try {
            const response = await adminApi.get<ProductDTO>(PRODUCT_API_ENDPOINTS.GET_PRODUCT_BY_ID(productId));
            return response.data;
        } catch (err) {
            console.error(PRODUCT_ERROR_MESSAGE, err);
            throw new Error(PRODUCT_ERROR_MESSAGE);
        }
    }

    async createProduct(request: CreateProductRequest, image: File): Promise<ProductDTO> {
        const formData = new FormData();
        formData.append('product', new Blob([JSON.stringify(request)], { type: 'application/json' }));
        formData.append('image', image);

        try {
            const response = await adminApi.post<ProductDTO>(PRODUCT_API_ENDPOINTS.CREATE_PRODUCT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (err) {
            console.error(PRODUCT_CREATION_ERROR_MESSAGE, err);
            throw new Error(PRODUCT_CREATION_ERROR_MESSAGE);
        }
    }

    async updateProduct(productId: number, request: UpdateProductRequest, image?: File): Promise<ProductDTO> {
        const formData = new FormData();
        formData.append('product', new Blob([JSON.stringify(request)], { type: 'application/json' }));
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await adminApi.put<ProductDTO>(PRODUCT_API_ENDPOINTS.UPDATE_PRODUCT(productId), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (err) {
            console.error(PRODUCT_UPDATE_ERROR_MESSAGE, err);
            throw new Error(PRODUCT_UPDATE_ERROR_MESSAGE);
        }
    }

    async deleteProduct(productId: number): Promise<void> {
        try {
            await adminApi.delete(PRODUCT_API_ENDPOINTS.DELETE_PRODUCT(productId));
        } catch (err) {
            console.error(PRODUCT_DELETION_ERROR_MESSAGE, err);
            throw new Error(PRODUCT_DELETION_ERROR_MESSAGE);
        }
    }

    async searchProducts(keyword: string): Promise<ProductDTO[]> {
        try {
            const response = await adminApi.get<ProductDTO[]>(PRODUCT_API_ENDPOINTS.SEARCH_PRODUCTS, {
                params: { keyword },
            });
            return response.data;
        } catch (err) {
            console.error(PRODUCT_SEARCH_ERROR_MESSAGE, err);
            throw new Error(PRODUCT_SEARCH_ERROR_MESSAGE);
        }
    }

    async getProductsByCategory(categoryId: number): Promise<ProductDTO[]> {
        try {
            const response = await adminApi.get<ProductDTO[]>(PRODUCT_API_ENDPOINTS.GET_PRODUCTS_BY_CATEGORY(categoryId));
            return response.data;
        } catch (err) {
            console.error(PRODUCT_CATEGORY_ERROR_MESSAGE, err);
            throw new Error(PRODUCT_CATEGORY_ERROR_MESSAGE);
        }
    }

    async getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<ProductDTO[]> {
        try {
            const response = await adminApi.get<ProductDTO[]>(PRODUCT_API_ENDPOINTS.GET_PRODUCTS_BY_PRICE_RANGE, {
                params: { minPrice, maxPrice },
            });
            return response.data;
        } catch (err) {
            console.error(PRODUCT_PRICE_RANGE_ERROR_MESSAGE, err);
            throw new Error(PRODUCT_PRICE_RANGE_ERROR_MESSAGE);
        }
    }

    async getProductsByMinStock(minStock: number): Promise<ProductDTO[]> {
        try {
            const response = await adminApi.get<ProductDTO[]>(PRODUCT_API_ENDPOINTS.GET_PRODUCTS_BY_STOCK, {
                params: { minStock },
            });
            return response.data;
        } catch (err) {
            console.error(PRODUCT_STOCK_ERROR_MESSAGE, err);
            throw new Error(PRODUCT_STOCK_ERROR_MESSAGE);
        }
    }
}

export const productService = new ProductService();
