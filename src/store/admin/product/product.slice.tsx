import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../../services/admin/product.service';
import { CreateProductRequest, UpdateProductRequest } from '../../../types/product.types';
import { initialState } from './productSlice.types';

// Async Thunks
export const fetchProducts = createAsyncThunk(
    'product/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await productService.getAllProducts();
            if (Array.isArray(response)) {
                return response;
            } else {
                return rejectWithValue('Invalid data format received from API');
            }
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch product');
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'product/fetchById',
    async (productId: number, { rejectWithValue }) => {
        try {
            return await productService.getProductById(productId);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch product');
        }
    }
);

export const createProduct = createAsyncThunk(
    'product/create',
    async (
        { request, image }: { request: CreateProductRequest; image: File },
        { rejectWithValue }
    ) => {
        try {
            return await productService.createProduct(request, image);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to create product');
        }
    }
);

export const updateProduct = createAsyncThunk(
    'product/update',
    async (
        { productId, request, image }: { productId: number; request: UpdateProductRequest; image?: File },
        { rejectWithValue }
    ) => {
        try {
            return await productService.updateProduct(productId, request, image); // Pass image if available
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to update product');
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'product/delete',
    async (productId: number, { rejectWithValue }) => {
        try {
            await productService.deleteProduct(productId);
            return productId;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete product');
        }
    }
);

export const searchProducts = createAsyncThunk(
    'product/search',
    async (keyword: string, { rejectWithValue }) => {
        try {
            return await productService.searchProducts(keyword);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to search product');
        }
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    'product/fetchByCategory',
    async (categoryId: number, { rejectWithValue }) => {
        try {
            return await productService.getProductsByCategory(categoryId);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch product by category');
        }
    }
);

export const fetchProductsByPriceRange = createAsyncThunk(
    'product/fetchByPriceRange',
    async ({ minPrice, maxPrice }: { minPrice: number, maxPrice: number }, { rejectWithValue }) => {
        try {
            return await productService.getProductsByPriceRange(minPrice, maxPrice);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch product by price range');
        }
    }
);

export const fetchProductsByStock = createAsyncThunk(
    'product/fetchByStock',
    async (minStock: number, { rejectWithValue }) => {
        try {
            return await productService.getProductsByMinStock(minStock);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch product by stock');
        }
    }
);

// Slice
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetProduct: () => initialState,
        clearSearchResults: (state) => {
            state.searchResults = [];
        }
    },
    extraReducers: (builder) => {
        // Fetch all product
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.products = action.payload;
                    state.totalProducts = action.payload.length;
                    state.lastUpdated = new Date().toISOString();
                } else {
                    state.error = 'Invalid data format received from API';
                }
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch product by ID
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Create product
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
                state.totalProducts += 1;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update product
        builder
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(prod => prod.productId === action.payload.productId);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                if (state.selectedProduct?.productId === action.payload.productId) {
                    state.selectedProduct = action.payload;
                }
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete product
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(prod => prod.productId !== action.payload);
                if (state.selectedProduct?.productId === action.payload) {
                    state.selectedProduct = null;
                }
                state.totalProducts -= 1;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Search product
        builder
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.searchResults = action.payload;
                } else {
                    state.error = 'Invalid data format received from API';
                }
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch product by category
        builder
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.categoryProducts = action.payload;
                } else {
                    state.error = 'Invalid data format received from API';
                }
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch product by price range
        builder
            .addCase(fetchProductsByPriceRange.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByPriceRange.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.products = action.payload;
                } else {
                    state.error = 'Invalid data format received from API';
                }
            })
            .addCase(fetchProductsByPriceRange.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch product by stock
        builder
            .addCase(fetchProductsByStock.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByStock.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.products = action.payload;
                } else {
                    state.error = 'Invalid data format received from API';
                }
            })
            .addCase(fetchProductsByStock.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { clearSelectedProduct, clearError, resetProduct, clearSearchResults } = productSlice.actions;

export default productSlice.reducer;