import {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../store';
import {
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    fetchProductsByCategory,
    fetchProductsByPriceRange,
    fetchProductsByStock,
    clearSelectedProduct,
    clearError,
    resetProduct,
    clearSearchResults
} from '../store/admin/product/product.slice';
import {
    selectAllProducts,
    selectSearchResults,
    selectCategoryProducts,
    selectSelectedProduct,
    selectProductStatus,
    selectProductDetails,
    selectProductStats,
    selectProductsByPriceStats
} from '../store/admin/product/product.selectors';
import {CreateProductRequest, UpdateProductRequest} from '../types/product.types';
import {useAuth} from './useAuth';

// Define strict types for API errors
interface ApiErrorResponse {
    status: number;
    data: {
        message: string;
        error?: string;
        details?: Record<string, string[]>;
    };
}

interface ApiError extends Error {
    response?: ApiErrorResponse;
}

export const useProduct = () => {
    const dispatch = useAppDispatch();
    const {getAccessToken, logout} = useAuth();

    // Selectors
    const products = useAppSelector(selectAllProducts);
    const searchResults = useAppSelector(selectSearchResults);
    const categoryProducts = useAppSelector(selectCategoryProducts);
    const selectedProduct = useAppSelector(selectSelectedProduct);
    const {loading, error} = useAppSelector(selectProductStatus);
    const productDetails = useAppSelector(selectProductDetails);
    const productStats = useAppSelector(selectProductStats);
    const priceStats = useAppSelector(selectProductsByPriceStats);


    console.log('categoryProducts', categoryProducts);
    console.log('products', products);
    console.log('productStats', productStats);

    // Error Handler
    const handleAuthError = useCallback(async (error: ApiError) => {
        if (error.response?.status === 401) {
            await logout();
            throw new Error('Authentication expired. Please login again.');
        }
        if (error.response?.data) {
            throw new Error(error.response.data.message || 'An error occurred with the API request');
        }
        throw error;
    }, [logout]);

    // Token Validator
    const validateToken = useCallback((): string => {
        const token = getAccessToken();
        if (!token) {
            throw new Error('No access token available');
        }
        return token;
    }, [getAccessToken]);

    // Base Product Actions
    const getAllProducts = useCallback(async () => {
        try {
            validateToken();
            await dispatch(fetchProducts()).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const getProductById = useCallback(async (productId: number) => {
        try {
            validateToken();
            await dispatch(fetchProductById(productId)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // Product CRUD Operations
    const createNewProduct = useCallback(
        async (request: CreateProductRequest, image: File) => {
            try {
                validateToken();
                // Only pass the image if it's defined
                await dispatch(createProduct({image: image ?? undefined, request})).unwrap();
            } catch (error) {
                await handleAuthError(error as ApiError);
            }
        },
        [dispatch, validateToken, handleAuthError]
    );



    const updateExistingProduct = useCallback(
        async (productId: number, request: UpdateProductRequest, image?: File) => {
            try {
                validateToken();
                // Only pass the image if it's defined
                await dispatch(updateProduct({ productId, request, image: image ?? undefined })).unwrap();
            } catch (error) {
                await handleAuthError(error as ApiError);
            }
        },
        [dispatch, validateToken, handleAuthError]
    );


    const removeProduct = useCallback(async (productId: number) => {
        try {
            validateToken();
            await dispatch(deleteProduct(productId)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // Search and Filter Actions
    const searchProductsByKeyword = useCallback(async (keyword: string) => {
        try {
            validateToken();
            await dispatch(searchProducts(keyword)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const getProductsByCategory = useCallback(async (categoryId: number) => {
        try {
            validateToken();
            await dispatch(fetchProductsByCategory(categoryId)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const getProductsByPriceRange = useCallback(async (minPrice: number, maxPrice: number) => {
        try {
            validateToken();
            await dispatch(fetchProductsByPriceRange({minPrice, maxPrice})).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const getProductsByStock = useCallback(async (minStock: number) => {
        try {
            validateToken();
            await dispatch(fetchProductsByStock(minStock)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // State Management Actions
    const clearSelected = useCallback(() => {
        dispatch(clearSelectedProduct());
    }, [dispatch]);

    const clearProductError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    const resetProductState = useCallback(() => {
        dispatch(resetProduct());
    }, [dispatch]);

    const clearSearch = useCallback(() => {
        dispatch(clearSearchResults());
    }, [dispatch]);

    return {
        // State
        products,
        searchResults,
        categoryProducts,
        selectedProduct,
        loading,
        error,
        productDetails,
        productStats,
        priceStats,

        // Base Product Actions
        getAllProducts,
        getProductById,

        // CRUD Operations
        createNewProduct,
        updateExistingProduct,
        removeProduct,

        // Search and Filter Actions
        searchProductsByKeyword,
        getProductsByCategory,
        getProductsByPriceRange,
        getProductsByStock,

        // State Management
        clearSelected,
        clearProductError,
        resetProductState,
        clearSearch
    };
};

// Type export for consumers of the hook
export type ProductHookReturn = ReturnType<typeof useProduct>;

export default useProduct;