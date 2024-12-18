// State Interface
export interface ProductState {
    products: ProductDTO[];
    selectedProduct: ProductDTO | null;
    loading: boolean;
    error: string | null;
}

export const initialProductState: ProductState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null
};

// Product DTO Interface
export interface ProductDTO {
    productId?: number;
    productName: string;
    productDescription: string;
    price: number;
    stock: number;
    categoryId: number | null;
    imageUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

// API Request Interfaces
export interface CreateProductRequest {
    productName: string;
    productDescription: string;
    price: number;
    stock: number;
    categoryId: number | null;
    image?: File;
}

export interface UpdateProductRequest {
    productName: string;
    productDescription: string;
    price: number;
    stock: number;
    categoryId: number | null;
    image?: File;
}

// API Service Interface
export interface ProductService {
    getAllProducts(): Promise<ProductDTO[]>;
    getProductById(productId: number): Promise<ProductDTO>;
    createProduct(request: CreateProductRequest): Promise<ProductDTO>;
    updateProduct(productId: number, request: UpdateProductRequest): Promise<ProductDTO>;
    deleteProduct(productId: number): Promise<void>;

    searchProducts(keyword: string): Promise<ProductDTO[]>;
    getProductsByCategory(categoryId: number): Promise<ProductDTO[]>;
    getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<ProductDTO[]>;
    getProductsByStock(minStock: number): Promise<ProductDTO[]>;
}
