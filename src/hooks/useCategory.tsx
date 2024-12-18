import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
    fetchCategories,
    fetchCategoryById,
    createParentCategory,
    updateParentCategory,
    deleteParentCategory,
    searchCategories,
    fetchParentCategories,
    fetchChildCategories,
    createChildCategory,
    updateChildCategory,
    deleteChildCategory,
    clearSelectedCategory,
    clearError,
    resetCategory
} from '../store/admin/category/category.slice';
import {
    selectAllCategories,
    selectParentCategories,
    selectChildCategories,
    selectSelectedCategory,
    selectCategoryStatus,
    selectCategoryDetails,
    selectCategoryHierarchy,
    selectCategoryStats
} from '../store/admin/category/category.selectors';
import { CreateCategoryRequest, UpdateCategoryRequest } from '../types/category.types';
import { useAuth } from './useAuth';

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

export const useCategory = () => {
    const dispatch = useAppDispatch();
    const { getAccessToken, logout } = useAuth();

    // Selectors
    const categories = useAppSelector(selectAllCategories);
    const parentCategories = useAppSelector(selectParentCategories);
    const childCategories = useAppSelector(selectChildCategories);
    const selectedCategory = useAppSelector(selectSelectedCategory);
    const { loading, error } = useAppSelector(selectCategoryStatus);
    const categoryDetails = useAppSelector(selectCategoryDetails);
    const categoryHierarchy = useAppSelector(selectCategoryHierarchy);
    const categoryStats = useAppSelector(selectCategoryStats);

    // Error Handler
    const handleAuthError = useCallback(async (error: ApiError) => {
        if (error.response?.status === 401) {
            await logout();
            throw new Error('Authentication expired. Please login again.');
        }
        // Handle specific API error responses
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

    // Base Categories Actions
    const getAllCategories = useCallback(async () => {
        try {
            validateToken();
            await dispatch(fetchCategories()).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const getCategoryById = useCallback(async (categoryId: number) => {
        try {
            validateToken();
            await dispatch(fetchCategoryById(categoryId)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // Parent Category Actions
    const getParentCategories = useCallback(async () => {
        try {
            validateToken();
            await dispatch(fetchParentCategories()).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const createNewParentCategory = useCallback(async (request: CreateCategoryRequest) => {
        try {
            validateToken();
            await dispatch(createParentCategory(request)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const updateExistingParentCategory = useCallback(async (categoryId: number, request: UpdateCategoryRequest) => {
        try {
            validateToken();
            await dispatch(updateParentCategory({ categoryId, request })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const removeParentCategory = useCallback(async (categoryId: number) => {
        try {
            validateToken();
            await dispatch(deleteParentCategory(categoryId)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // Child Category Actions
    const getChildCategories = useCallback(async (parentId: number) => {
        try {
            validateToken();
            await dispatch(fetchChildCategories(parentId)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const createNewChildCategory = useCallback(async (parentId: number, request: CreateCategoryRequest) => {
        try {
            validateToken();
            await dispatch(createChildCategory({ parentId, request })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const updateExistingChildCategory = useCallback(async (
        parentId: number,
        childId: number,
        request: UpdateCategoryRequest
    ) => {
        try {
            validateToken();
            await dispatch(updateChildCategory({ parentId, childId, request })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const removeChildCategory = useCallback(async (childId: number) => {
        try {
            validateToken();
            await dispatch(deleteChildCategory(childId)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // Search Actions
    const searchCategoriesByKeyword = useCallback(async (keyword: string) => {
        try {
            validateToken();
            await dispatch(searchCategories(keyword)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // State Management Actions
    const clearSelected = useCallback(() => {
        dispatch(clearSelectedCategory());
    }, [dispatch]);

    const clearCategoryError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    const resetCategoryState = useCallback(() => {
        dispatch(resetCategory());
    }, [dispatch]);

    return {
        // State
        categories,
        parentCategories,
        childCategories,
        selectedCategory,
        loading,
        error,
        categoryDetails,
        categoryHierarchy,
        categoryStats,

        // Base Category Actions
        getAllCategories,
        getCategoryById,
        searchCategoriesByKeyword,

        // Parent Category Actions
        getParentCategories,
        createNewParentCategory,
        updateExistingParentCategory,
        removeParentCategory,

        // Child Category Actions
        getChildCategories,
        createNewChildCategory,
        updateExistingChildCategory,
        removeChildCategory,

        // State Management
        clearSelected,
        clearCategoryError,
        resetCategoryState
    };
};

// Type export for consumers of the hook
export type CategoryHookReturn = ReturnType<typeof useCategory>;

export default useCategory;