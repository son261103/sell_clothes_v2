// Constants for localStorage keys related to categories
export const CATEGORY_KEY = 'category_data';

// Error messages
export const CATEGORY_ERROR_MESSAGE = 'An error occurred while handling category data';
export const CATEGORY_CREATION_ERROR_MESSAGE = 'An error occurred while creating category';
export const CATEGORY_UPDATE_ERROR_MESSAGE = 'An error occurred while updating category';
export const CATEGORY_DELETION_ERROR_MESSAGE = 'An error occurred while deleting category';
export const CATEGORY_SEARCH_ERROR_MESSAGE = 'An error occurred while searching categories';

// API Endpoints for Category management
export const CATEGORY_API_ENDPOINTS = {
    GET_ALL_CATEGORIES: '/admin/categories',
    GET_CATEGORY_BY_ID: (id: number) => `/admin/categories/${id}`,
    GET_PARENT_CATEGORIES: '/admin/categories/parent',
    CREATE_PARENT_CATEGORY: '/admin/categories/parent',
    UPDATE_PARENT_CATEGORY: (id: number) => `/admin/categories/parent/${id}`,
    DELETE_PARENT_CATEGORY: (id: number) => `/admin/categories/parent/${id}`,
    GET_CHILD_CATEGORIES: (parentId: number) => `/admin/categories/parent/${parentId}/children`,
    CREATE_CHILD_CATEGORY: (parentId: number) => `/admin/categories/parent/${parentId}/child`,
    UPDATE_CHILD_CATEGORY: (parentId: number, childId: number) => `/admin/categories/parent/${parentId}/child/${childId}`,
    DELETE_CHILD_CATEGORY: (id: number) => `/admin/categories/child/${id}`,
    SEARCH_CATEGORIES: '/admin/categories/search',
};

