import { ProductDTO } from "../../../types/product.types";

export interface ProductState {
    // List of all product
    products: ProductDTO[];

    // Currently selected/active product
    selectedProduct: ProductDTO | null;

    // Filtered/categorized product lists
    searchResults: ProductDTO[];
    categoryProducts: ProductDTO[];

    // Loading and error states
    loading: boolean;
    error: string | null;

    // Additional metadata
    totalProducts: number;
    lastUpdated: string | null;
}

export const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    searchResults: [],
    categoryProducts: [],
    loading: false,
    error: null,
    totalProducts: 0,
    lastUpdated: null
};
