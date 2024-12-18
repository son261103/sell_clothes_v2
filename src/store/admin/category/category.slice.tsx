import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoryService } from '../../../services/admin/category.service';
import { CreateCategoryRequest, UpdateCategoryRequest } from '../../../types/category.types';
import { initialState } from './categorySlice.types';

// Async Thunks
export const fetchCategories = createAsyncThunk(
    'category/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await categoryService.getAllCategories();
            // Kiểm tra nếu response không phải là mảng hợp lệ
            if (Array.isArray(response)) {
                return response;
            } else {
                return rejectWithValue('Invalid data format received from API');
            }
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch categories');
        }
    }
);

export const fetchCategoryById = createAsyncThunk(
    'category/fetchById',
    async (categoryId: number, { rejectWithValue }) => {
        try {
            return await categoryService.getCategoryById(categoryId);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch category');
        }
    }
);

export const createParentCategory = createAsyncThunk(
    'category/createParent',
    async (request: CreateCategoryRequest, { rejectWithValue }) => {
        try {
            return await categoryService.createParentCategory(request);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to create parent category');
        }
    }
);

export const updateParentCategory = createAsyncThunk(
    'category/updateParent',
    async ({ categoryId, request }: { categoryId: number, request: UpdateCategoryRequest }, { rejectWithValue }) => {
        try {
            return await categoryService.updateParentCategory(categoryId, request);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to update parent category');
        }
    }
);

export const deleteParentCategory = createAsyncThunk(
    'category/deleteParent',
    async (categoryId: number, { rejectWithValue }) => {
        try {
            await categoryService.deleteParentCategory(categoryId);
            return categoryId;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete parent category');
        }
    }
);

export const searchCategories = createAsyncThunk(
    'category/search',
    async (keyword: string, { rejectWithValue }) => {
        try {
            return await categoryService.searchCategories(keyword);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to search categories');
        }
    }
);

export const fetchParentCategories = createAsyncThunk(
    'category/fetchParents',
    async (_, { rejectWithValue }) => {
        try {
            return await categoryService.getParentCategories();
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch parent categories');
        }
    }
);

export const fetchChildCategories = createAsyncThunk(
    'category/fetchChildren',
    async (parentId: number, { rejectWithValue }) => {
        try {
            return await categoryService.getChildCategories(parentId);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch child categories');
        }
    }
);

export const createChildCategory = createAsyncThunk(
    'category/createChild',
    async ({ parentId, request }: { parentId: number; request: CreateCategoryRequest }, { rejectWithValue }) => {
        try {
            return await categoryService.createChildCategory(parentId, request);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to create child category');
        }
    }
);

export const updateChildCategory = createAsyncThunk(
    'category/updateChild',
    async (
        { parentId, childId, request }: { parentId: number; childId: number; request: UpdateCategoryRequest },
        { rejectWithValue }
    ) => {
        try {
            return await categoryService.updateChildCategory(parentId, childId, request);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to update child category');
        }
    }
);

export const deleteChildCategory = createAsyncThunk(
    'category/deleteChild',
    async (childId: number, { rejectWithValue }) => {
        try {
            await categoryService.deleteChildCategory(childId);
            return childId;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete child category');
        }
    }
);

// Slice
const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        clearSelectedCategory: (state) => {
            state.selectedCategory = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetCategory: () => initialState
    },
    extraReducers: (builder) => {
        // Fetch all categories
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                // Kiểm tra nếu data trả về là mảng
                if (Array.isArray(action.payload)) {
                    state.categories = action.payload;
                } else {
                    state.error = 'Invalid data format received from API';
                }
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch category by ID
        builder
            .addCase(fetchCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCategory = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Create parent category
        builder
            .addCase(createParentCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createParentCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload);
                state.parentCategories.push(action.payload);
            })
            .addCase(createParentCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update parent category
        builder
            .addCase(updateParentCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateParentCategory.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.categories.findIndex(cat => cat.categoryId === action.payload.categoryId);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
                const parentIndex = state.parentCategories.findIndex(cat => cat.categoryId === action.payload.categoryId);
                if (parentIndex !== -1) {
                    state.parentCategories[parentIndex] = action.payload;
                }
            })
            .addCase(updateParentCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete parent category
        builder
            .addCase(deleteParentCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteParentCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(cat => cat.categoryId !== action.payload);
                state.parentCategories = state.parentCategories.filter(cat => cat.categoryId !== action.payload);
            })
            .addCase(deleteParentCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Search categories
        builder
            .addCase(searchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchCategories.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.categories = action.payload;
                } else {
                    state.error = 'Invalid data format received from API';
                }
            })
            .addCase(searchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Parent categories
        builder
            .addCase(fetchParentCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchParentCategories.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.parentCategories = action.payload;
                } else {
                    state.error = 'Invalid data format received from API';
                }
            })
            .addCase(fetchParentCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Child categories
        builder
            .addCase(fetchChildCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChildCategories.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.childCategories = action.payload;
                } else {
                    state.error = 'Invalid data format received from API';
                }
            })
            .addCase(fetchChildCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Create child category
        builder
            .addCase(createChildCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createChildCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload);
                state.childCategories.push(action.payload);
            })
            .addCase(createChildCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update child category
        builder
            .addCase(updateChildCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateChildCategory.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.categories.findIndex(cat => cat.categoryId === action.payload.categoryId);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
                const childIndex = state.childCategories.findIndex(cat => cat.categoryId === action.payload.categoryId);
                if (childIndex !== -1) {
                    state.childCategories[childIndex] = action.payload;
                }
            })
            .addCase(updateChildCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete child category
        builder
            .addCase(deleteChildCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteChildCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(cat => cat.categoryId !== action.payload);
                state.childCategories = state.childCategories.filter(cat => cat.categoryId !== action.payload);
            })
            .addCase(deleteChildCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { clearSelectedCategory, clearError, resetCategory } = categorySlice.actions;

export default categorySlice.reducer;
