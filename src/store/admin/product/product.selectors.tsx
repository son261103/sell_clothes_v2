import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../index';
import { ProductState } from './productSlice.types';

// Base Selector
const selectProductState = (state: RootState): ProductState => state.product;

// Basic Selectors
export const selectAllProducts = createSelector(
    [selectProductState],
    (productState) => productState.products || []
);

export const selectSearchResults = createSelector(
    [selectProductState],
    (productState) => productState.searchResults
);

export const selectCategoryProducts = createSelector(
    [selectProductState],
    (productState) => productState.categoryProducts
);

// Specific Product Selectors
export const selectProductById = (productId: number) =>
    createSelector(
        [selectAllProducts],
        (products) => products.find((product) => product.productId === productId)
    );

export const selectProductsByCategory = (categoryId: number) =>
    createSelector(
        [selectAllProducts],
        (products) => products.filter((product) => product.categoryId === categoryId)
    );

// Selected Product Related
export const selectSelectedProduct = createSelector(
    [selectProductState],
    (productState) => productState.selectedProduct
);

// Status Selectors
export const selectProductLoading = createSelector(
    [selectProductState],
    (productState) => productState.loading
);

export const selectProductError = createSelector(
    [selectProductState],
    (productState) => productState.error
);

// Search and Filter Selectors
export const selectProductsByKeyword = (keyword: string) =>
    createSelector(
        [selectAllProducts],
        (products) =>
            products.filter((product) =>
                product.productName.toLowerCase().includes(keyword.toLowerCase()) ||
                product.productDescription.toLowerCase().includes(keyword.toLowerCase())
            )
    );

export const selectProductsByPriceRange = (minPrice: number, maxPrice: number) =>
    createSelector(
        [selectAllProducts],
        (products) =>
            products.filter((product) =>
                product.price >= minPrice && product.price <= maxPrice
            )
    );

export const selectProductsByStock = (minStock: number) =>
    createSelector(
        [selectAllProducts],
        (products) =>
            products.filter((product) => product.stock >= minStock)
    );

export const selectOutOfStockProducts = createSelector(
    [selectAllProducts],
    (products) => products.filter((product) => product.stock === 0)
);

export const selectLowStockProducts = (threshold: number = 10) =>
    createSelector(
        [selectAllProducts],
        (products) => products.filter((product) => product.stock > 0 && product.stock <= threshold)
    );

// Complex/Combined Selectors
export const selectProductStatus = createSelector(
    [selectProductLoading, selectProductError],
    (loading, error) => ({ loading, error })
);

export const selectProductDetails = createSelector(
    [selectAllProducts, selectCategoryProducts, selectProductState],
    (products, categoryProducts, state) => ({
        products,
        categoryProducts,
        totalProducts: state.totalProducts,
        lastUpdated: state.lastUpdated
    })
);

export const selectProductStats = createSelector(
    [selectAllProducts],
    (products) => ({
        totalProducts: products.length,
        totalValue: products.reduce((sum, product) => sum + (product.price * product.stock), 0),
        averagePrice: products.length
            ? (products.reduce((sum, product) => sum + product.price, 0) / products.length).toFixed(2)
            : 0,
        outOfStockCount: products.filter(product => product.stock === 0).length,
        lowStockCount: products.filter(product => product.stock > 0 && product.stock <= 10).length,
        categoriesCount: new Set(products.map(product => product.categoryId)).size
    })
);

export const selectProductsByPriceStats = createSelector(
    [selectAllProducts],
    (products) => {
        const prices = products.map(product => product.price);
        return {
            highestPrice: Math.max(...prices),
            lowestPrice: Math.min(...prices),
            averagePrice: (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)
        };
    }
);

export const selectProductsByCategoryStats = createSelector(
    [selectAllProducts],
    (products) => {
        const categoryMap = new Map<number, number>();
        products.forEach(product => {
            if (product.categoryId) {
                categoryMap.set(
                    product.categoryId,
                    (categoryMap.get(product.categoryId) || 0) + 1
                );
            }
        });
        return Array.from(categoryMap.entries()).map(([categoryId, count]) => ({
            categoryId,
            productCount: count
        }));
    }
);

export const selectProductSortedByStock = createSelector(
    [selectAllProducts],
    (products) => [...products].sort((a, b) => a.stock - b.stock)
);

export const selectProductSortedByPrice = createSelector(
    [selectAllProducts],
    (products) => [...products].sort((a, b) => a.price - b.price)
);

// Pagination Selectors
export const selectPaginatedProducts = (page: number, limit: number) =>
    createSelector(
        [selectAllProducts],
        (products) => {
            const startIndex = page * limit;
            return products.slice(startIndex, startIndex + limit);
        }
    );

// Metadata Selectors
export const selectProductMetadata = createSelector(
    [selectProductState],
    (productState) => ({
        totalProducts: productState.totalProducts,
        lastUpdated: productState.lastUpdated
    })
);